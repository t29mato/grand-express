import { CityId, ItemKey, PlayerId, PropertyIndex, PropertyRef, cityIdToNodeId } from "../../../domain/shared-kernel/ids";
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
import { QuizDifficulty, QuizQuestion } from "../../../domain/quiz/quiz-question";
import { rollDifficulty } from "../../../domain/quiz/quiz-selection-service";
import { KnowledgeLevel } from "../../../domain/quiz/knowledge-level";
import { landOnMoneySquare, MoneySquareOutcome } from "../land-on-square/money-square.use-case";
import { landOnCardSquare, CardSquareOutcome } from "../land-on-square/card-square.use-case";
import { arriveAtDestination, ArriveDestinationOutcome } from "../land-on-square/arrive-destination.use-case";
import { buyProperty, investInProperty } from "../property-transactions/property-transactions.use-case";
import { stallStockFor, buyStallItem } from "../visit-stall/visit-stall.use-case";

/** 町での買い物の内訳(到着マス・通常の町の両方で使う)。 */
export interface CityVisitSummary {
  readonly cityId: CityId;
  readonly purchases: readonly PropertyIndex[];
  readonly upgrades: readonly PropertyIndex[];
  readonly boughtItem: ItemKey | null;
}

export type LandingOutcome =
  | {
      readonly type: "quiz";
      readonly outcome: AnswerQuizOutcome;
      /** 出題された問題と、CPUが選んだ選択肢(プレイヤーに見せるため)。 */
      readonly question: QuizQuestion;
      readonly difficulty: QuizDifficulty;
      readonly chosenOptionIndex: number;
    }
  | { readonly type: "money"; readonly outcome: MoneySquareOutcome }
  | { readonly type: "card"; readonly outcome: CardSquareOutcome }
  | { readonly type: "destination"; readonly outcome: ArriveDestinationOutcome; readonly visit: CityVisitSummary }
  | { readonly type: "city"; readonly visit: CityVisitSummary };

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
 * クイズの出題は `drawQuestion` で外から渡す(人間の手番と同じ山札を共有し、
 * 同じ問題が続けて出ないようにするため)。省略時は一様ランダムに選ぶ。
 */
/**
 * クイズの出題元。人間の手番と同じ山札から引けるよう、問題の選び方を外から渡す。
 * 引数は抽選された難易度で、実装側はそれに近い問題を返す。
 * 省略時は一様ランダムに選ぶ。
 */
export type DrawQuizQuestion = (difficulty: QuizDifficulty) => QuizQuestion;

/**
 * CPUの強さを、出題難易度を決めるための知識レベルとして読み替える。
 * gentle は「その国に不慣れ」、merciless は「よく知っている」に相当する。
 */
const CPU_KNOWLEDGE: Readonly<Record<string, KnowledgeLevel>> = {
  gentle: "newcomer",
  normal: "familiar",
  merciless: "local",
};

export function cpuTakeTurn(
  context: GameEngineContext,
  session: GameSession,
  playerId: PlayerId,
  random: Random,
  drawQuestion?: DrawQuizQuestion,
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
    const beforeVisit = current;
    current = performCpuCityVisit(context, current, playerId, landedNode.cityId, tuning, random);
    landing = {
      type: "destination",
      outcome,
      visit: summariseVisit(beforeVisit, current, playerId, landedNode.cityId),
    };
  } else if (landedNode.type === "quiz") {
    const knowledge = CPU_KNOWLEDGE[playerAfterStrike.cpuLevel ?? "normal"] ?? "familiar";
    const difficulty = rollDifficulty(knowledge, random);
    const question = drawQuestion
      ? drawQuestion(difficulty)
      : context.content.quiz[random.nextInt(context.content.quiz.length)];
    const chosenOptionIndex = random.nextInt(question.options.length);
    const outcome = answerQuiz(context, current, playerId, question, chosenOptionIndex, random);
    current = outcome.session;
    landing = { type: "quiz", outcome, question, difficulty: question.difficulty, chosenOptionIndex };
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
    landing = { type: "city", visit: summariseVisit(before, current, playerId, landedNode.cityId) };
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

/**
 * 町での買い物の前後差分をとる(何を買い、どれに投資し、どのアイテムを買ったか)。
 * CPUの手番を人間と同じようにプレイヤーへ見せるために必要な情報。
 */
function summariseVisit(
  before: GameSession,
  after: GameSession,
  playerId: PlayerId,
  cityId: CityId,
): CityVisitSummary {
  const beforePlayer = findPlayer(before, playerId);
  const afterPlayer = findPlayer(after, playerId);
  const inCity = (ref: PropertyRef) => PropertyRef.parse(ref).cityId === cityId;

  const purchases: PropertyIndex[] = [];
  const upgrades: PropertyIndex[] = [];
  for (const [ref, level] of afterPlayer.portfolio.entries()) {
    if (!inCity(ref)) continue;
    const previous = beforePlayer.portfolio.get(ref);
    if (previous === undefined) purchases.push(PropertyRef.parse(ref).index);
    else if (level > previous) upgrades.push(PropertyRef.parse(ref).index);
  }

  const beforeItems = [...beforePlayer.inventory];
  const boughtItem =
    afterPlayer.inventory.find((key) => {
      const at = beforeItems.indexOf(key);
      if (at === -1) return true;
      beforeItems.splice(at, 1);
      return false;
    }) ?? null;

  return { cityId, purchases, upgrades, boughtItem };
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
