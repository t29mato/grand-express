import { CityId, PlayerId, PropertyIndex, PropertyRef, cityIdToNodeId } from "../../../domain/shared-kernel/ids";
import { Random } from "../../../domain/shared-kernel/random";
import { CPU_TUNING, CpuTuning } from "../../../domain/cpu/cpu-level";
import { chooseMoveTarget } from "../../../domain/cpu/cpu-move-strategy";
import { planCityVisit } from "../../../domain/cpu/cpu-city-strategy";
import { decidePreRollItemUse } from "../../../domain/cpu/cpu-item-strategy";
import { isCityNode } from "../../../domain/board/node";
import { ownsProperty } from "../../../domain/player/player";
import { GameSession, replacePlayer } from "../../../domain/game-session/game-session";
import { GameEngineContext } from "../../game-engine-context";
import { rollOneDie } from "../roll-dice/roll-dice.use-case";
import { reachableNodesFor, movePlayerAlongPath, SpiritPassEvent } from "../move-player/move-player.use-case";
import { settleSpiritAfterTurn } from "../move-player/settle-spirit-after-turn.use-case";
import { applyItemUse, UseItemEffectResult } from "../use-item/use-item.use-case";
import { resolveMisfortuneStrike, MisfortuneStrikeResult } from "../resolve-misfortune-strike/resolve-misfortune-strike.use-case";
import { answerQuiz, AnswerQuizOutcome } from "../answer-quiz/answer-quiz.use-case";
import { landOnMoneySquare, MoneySquareOutcome } from "../land-on-square/money-square.use-case";
import { landOnCardSquare, CardSquareOutcome } from "../land-on-square/card-square.use-case";
import { arriveAtDestination, ArriveDestinationOutcome } from "../land-on-square/arrive-destination.use-case";
import { buyProperty, investInProperty } from "../property-transactions/property-transactions.use-case";
import { stallStockFor, buyStallItem } from "../visit-stall/visit-stall.use-case";

export type LandingOutcome =
  | { readonly type: "quiz"; readonly outcome: AnswerQuizOutcome }
  | { readonly type: "money"; readonly outcome: MoneySquareOutcome }
  | { readonly type: "card"; readonly outcome: CardSquareOutcome }
  | { readonly type: "destination"; readonly outcome: ArriveDestinationOutcome }
  | { readonly type: "city"; readonly purchases: readonly PropertyIndex[]; readonly upgrades: readonly PropertyIndex[] };

export interface CpuTurnResult {
  readonly session: GameSession;
  readonly skippedTurn: boolean;
  readonly strike?: MisfortuneStrikeResult;
  readonly preRollItem?: UseItemEffectResult;
  readonly steps?: number;
  readonly spiritPassEvents: readonly SpiritPassEvent[];
  readonly landing?: LandingOutcome;
  readonly extraTurn: boolean;
}

/**
 * CPUの1手番をまるごと実行する(現行コードの `playTurn` のCPU分岐一式)。
 *
 * 簡略化: クイズの出題は `content.quiz` から毎回一様ランダムに選ぶ(現行コードは
 * 山札を使い切るまで重複させない `quizBag` を持つが、山札の状態をGameSessionの
 * 外に持たせる設計上のトレードオフとして、ここでは単純化している)。
 */
export function cpuTakeTurn(
  context: GameEngineContext,
  session: GameSession,
  playerId: PlayerId,
  random: Random,
): CpuTurnResult {
  let current = session;
  const spiritPassEvents: SpiritPassEvent[] = [];

  let strike: MisfortuneStrikeResult | undefined;
  if (current.misfortune.level > 0 && current.misfortune.holderId === playerId) {
    const strikeOutcome = resolveMisfortuneStrike(context, current, playerId, random);
    current = strikeOutcome.session;
    strike = strikeOutcome.result;
  }

  const playerAfterStrike = findPlayer(current, playerId);
  if (playerAfterStrike.skipNextTurn) {
    current = replacePlayer(current, { ...playerAfterStrike, skipNextTurn: false });
    return { session: current, skippedTurn: true, strike, spiritPassEvents, extraTurn: false };
  }

  const tuning = CPU_TUNING[playerAfterStrike.cpuLevel ?? "normal"];

  // 1. サイコロを振る前のアイテム自動使用。
  const usableItems = playerAfterStrike.inventory
    .map((key, index) => ({ index, key, item: context.content.items.find((i) => i.key === key)! }))
    .filter((entry) => entry.item);
  const picked = decidePreRollItemUse(usableItems, tuning, random);
  let preRollItem: UseItemEffectResult | undefined;
  if (picked) {
    const used = applyItemUse(context, current, playerId, picked.index, random);
    current = used.session;
    preRollItem = used.result;
  }

  // 2. サイコロを振る(移動系アイテムはCPUの自動使用対象外のため、常に通常通り振る)。
  const steps = rollOneDie(random);

  // 3. 移動先の選択。
  const player = findPlayer(current, playerId);
  const reach = reachableNodesFor(context, current, playerId, steps);
  const path = chooseMoveTarget(
    reach,
    tuning,
    {
      destination: cityIdToNodeId(current.destination),
      pathfinding: context.pathfinding,
      getNode: (id) => context.getNode(id),
      getCity: (id) => context.getCity(CityId(id)),
      isPropertyOwned: (cityId, index) => {
        const ref = PropertyRef.of(CityId(cityId), index);
        return current.players.some((p) => ownsProperty(p, ref));
      },
      ownedCountInCity: (cityId) =>
        [...player.portfolio.keys()].filter((ref) => PropertyRef.parse(ref).cityId === CityId(cityId)).length,
      cash: player.cash.amount,
    },
    random,
  );

  const moveResult = movePlayerAlongPath(current, playerId, path);
  current = moveResult.session;
  spiritPassEvents.push(...moveResult.spiritPassEvents);

  // 4. 着地したマスの解決。
  const landedNode = context.getNode(moveResult.finalNode);
  let landing: LandingOutcome | undefined;

  if (isCityNode(landedNode) && landedNode.cityId === current.destination) {
    const outcome = arriveAtDestination(context, current, playerId, random);
    current = outcome.session;
    current = performCpuCityVisit(context, current, playerId, landedNode.cityId, tuning, random);
    landing = { type: "destination", outcome };
  } else if (landedNode.type === "quiz") {
    const question = context.content.quiz[random.nextInt(context.content.quiz.length)];
    const outcome = answerQuiz(context, current, playerId, question, landedNode.tier, random.nextInt(question.options.length), random);
    current = outcome.session;
    landing = { type: "quiz", outcome };
  } else if (landedNode.type === "blue" || landedNode.type === "red") {
    const outcome = landOnMoneySquare(current, playerId, landedNode.type === "blue", random);
    current = outcome.session;
    landing = { type: "money", outcome };
  } else if (landedNode.type === "card") {
    const outcome = landOnCardSquare(context, current, playerId, random);
    current = outcome.session;
    landing = { type: "card", outcome };
  } else if (isCityNode(landedNode)) {
    const before = current;
    current = performCpuCityVisit(context, current, playerId, landedNode.cityId, tuning, random);
    landing = { type: "city", purchases: diffPurchases(before, current, playerId), upgrades: [] };
  }

  const extraTurn = findPlayer(current, playerId).hasExtraTurn;
  if (extraTurn) {
    current = replacePlayer(current, { ...findPlayer(current, playerId), hasExtraTurn: false });
  }
  if (!extraTurn) {
    current = settleSpiritAfterTurn(context, current);
  }

  return { session: current, skippedTurn: false, strike, preRollItem, steps, spiritPassEvents, landing, extraTurn };
}

function findPlayer(session: GameSession, playerId: PlayerId) {
  const player = session.players.find((p) => p.id === playerId);
  if (!player) throw new Error(`Unknown player: ${playerId}`);
  return player;
}

function diffPurchases(before: GameSession, after: GameSession, playerId: PlayerId): readonly PropertyIndex[] {
  const beforeRefs = new Set(findPlayer(before, playerId).portfolio.keys());
  const afterPlayer = findPlayer(after, playerId);
  return [...afterPlayer.portfolio.keys()]
    .filter((ref) => !beforeRefs.has(ref))
    .map((ref) => PropertyRef.parse(ref).index);
}

/** 町での購入・増資・買い物(現行コードの `cityStop` のCPU分岐)。 */
function performCpuCityVisit(
  context: GameEngineContext,
  session: GameSession,
  playerId: PlayerId,
  cityId: CityId,
  tuning: CpuTuning,
  random: Random,
): GameSession {
  const city = context.getCity(cityId);
  const player = findPlayer(session, playerId);
  const ownedLevels = new Map(
    [...player.portfolio.entries()]
      .filter(([ref]) => PropertyRef.parse(ref).cityId === cityId)
      .map(([ref, level]) => [PropertyRef.parse(ref).index, level] as const),
  );
  const stock = stallStockFor(context, cityId, session.month).map((key) => ({
    key,
    price: context.content.items.find((i) => i.key === key)!.price,
  }));

  const plan = planCityVisit(
    {
      city,
      cash: player.cash.amount,
      inventorySize: player.inventory.length,
      ownedLevels,
      isOwnedByOther: (index) => {
        const ref = PropertyRef.of(cityId, index);
        return session.players.some((p) => p.id !== playerId && ownsProperty(p, ref));
      },
      shopStock: stock,
    },
    tuning,
    random,
  );

  let current = session;
  for (const index of plan.purchases) {
    const result = buyProperty(context, current, playerId, cityId, index);
    if (result.ok) current = result.value.session;
  }
  for (const { index } of plan.upgrades) {
    const ref = PropertyRef.of(cityId, index);
    const result = investInProperty(context, current, playerId, ref);
    if (result.ok) current = result.value.session;
  }
  if (plan.itemPurchase) {
    const result = buyStallItem(context, current, playerId, cityId, plan.itemPurchase);
    if (result.ok) current = result.value;
  }
  return current;
}
