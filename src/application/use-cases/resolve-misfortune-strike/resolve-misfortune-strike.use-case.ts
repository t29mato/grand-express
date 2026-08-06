import { PlayerId } from "../../../domain/shared-kernel/ids";
import { Random } from "../../../domain/shared-kernel/random";
import { Money } from "../../../domain/shared-kernel/money";
import { receiveCash, recordStat, removeItemAt } from "../../../domain/player/player";
import { GameSession, replacePlayer } from "../../../domain/game-session/game-session";
import { DOOM_STRATEGIES, DoomFlavor, DoomOutcome } from "../../../domain/misfortune/doom-effect";
import { consumeRestIfAny, isKing, recordStrike } from "../../../domain/misfortune/misfortune-spirit";
import { GameEngineContext } from "../../game-engine-context";

export type MisfortuneStrikeResult =
  | { readonly type: "not-afflicted" }
  | { readonly type: "rested" }
  | { readonly type: "warded"; readonly wasKing: boolean }
  | { readonly type: "pleased"; readonly amount: number }
  | { readonly type: "struck"; readonly flavor: DoomFlavor; readonly outcome: DoomOutcome; readonly wasKing: boolean };

export interface MisfortuneStrikeOutcome {
  readonly session: GameSession;
  readonly result: MisfortuneStrikeResult;
}

const PLEASED_CHANCE = 0.08;
const PLEASED_BASE = 200;
const PLEASED_RANGE = 300;

/**
 * 手番のはじめに厄災の神が発動するかどうかを判定・実行する
 * (現行コードの `spiritStrike`)。
 */
export function resolveMisfortuneStrike(
  context: GameEngineContext,
  session: GameSession,
  playerId: PlayerId,
  random: Random,
): MisfortuneStrikeOutcome {
  if (session.misfortune.level === 0 || session.misfortune.holderId !== playerId) {
    return { session, result: { type: "not-afflicted" } };
  }

  // 表彰(いちばん厄災を背負った人)のために、憑かれたまま迎えた手番を数える。
  // 休んでいたり跳ね返したりしても「背負っていた」ことに変わりはないので、
  // 実際に被害を受けたかどうかとは分けてここで数える。
  {
    const holder = session.players.find((p) => p.id === playerId);
    if (holder) session = replacePlayer(session, recordStat(holder, "misfortuneTurns"));
  }

  const { state: afterRest, wasResting } = consumeRestIfAny(session.misfortune);
  if (wasResting) {
    return { session: { ...session, misfortune: afterRest }, result: { type: "rested" } };
  }

  const misfortuneAfterStrike = recordStrike(session.misfortune);
  const king = isKing(misfortuneAfterStrike);
  let current = { ...session, misfortune: misfortuneAfterStrike };

  const player = current.players.find((p) => p.id === playerId)!;
  const wardIndex = player.inventory.indexOf(context.content.spirit.wardItemKey);
  if (wardIndex >= 0) {
    current = replacePlayer(current, removeItemAt(player, wardIndex));
    return { session: current, result: { type: "warded", wasKing: king } };
  }

  if (random.nextFloat() < PLEASED_CHANCE) {
    const gift = Money.of(PLEASED_BASE + random.nextInt(PLEASED_RANGE));
    current = replacePlayer(current, receiveCash(player, gift));
    return { session: current, result: { type: "pleased", amount: gift.amount } };
  }

  const flavorIndex = random.nextInt(context.content.doomFlavors.length);
  const flavor = context.content.doomFlavors[flavorIndex];
  const strategy = DOOM_STRATEGIES[flavor.effectId];
  const { outcome, updatedPlayers } = strategy({
    random,
    king,
    allPlayers: current.players,
    afflictedPlayerId: playerId,
    farthestNodesFromDestination: (poolSize) => farthestNodesFromDestination(context, current, poolSize),
  });
  current = { ...current, players: updatedPlayers };

  return { session: current, result: { type: "struck", flavor, outcome, wasKing: king } };
}

function farthestNodesFromDestination(
  context: GameEngineContext,
  session: GameSession,
  poolSize: number,
) {
  const allNodeIds = [...context.graph.nodes.keys()];
  return allNodeIds
    .sort((a, b) => context.distanceToCity(b, session.destination) - context.distanceToCity(a, session.destination))
    .slice(0, poolSize);
}
