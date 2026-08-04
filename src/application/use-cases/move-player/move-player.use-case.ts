import { NodeId, PlayerId } from "../../../domain/shared-kernel/ids";
import { moveTo } from "../../../domain/player/player";
import { GameSession, currentPlayer, replacePlayer } from "../../../domain/game-session/game-session";
import { passTo } from "../../../domain/misfortune/misfortune-spirit";
import { GameEngineContext } from "../../game-engine-context";

export interface SpiritPassEvent {
  readonly type: "spirit-passed";
  readonly fromPlayerId: PlayerId;
  readonly toPlayerId: PlayerId;
  readonly atNode: NodeId;
}

export interface MovePlayerResult {
  readonly session: GameSession;
  readonly finalNode: NodeId;
  readonly spiritPassEvents: readonly SpiritPassEvent[];
}

/** 到達可能なマスと、そこに至る経路の一覧(UIでの選択肢表示用)。 */
export function reachableNodesFor(
  context: GameEngineContext,
  session: GameSession,
  playerId: PlayerId,
  steps: number,
): ReadonlyMap<NodeId, readonly NodeId[]> {
  const player = session.players.find((p) => p.id === playerId);
  if (!player) throw new Error(`Unknown player: ${playerId}`);
  return context.pathfinding.reachableNodes(player.location, steps);
}

/**
 * 選ばれた経路に沿ってプレイヤーを1マスずつ移動させる(現行コードの `playTurn` の
 * 移動ループ)。途中で他プレイヤーが乗っているマスを通過すると、厄災の神が
 * すれ違いで移る(`tryPassSpirit`)。
 */
export function movePlayerAlongPath(
  session: GameSession,
  playerId: PlayerId,
  path: readonly NodeId[],
): MovePlayerResult {
  let current = session;
  const spiritPassEvents: SpiritPassEvent[] = [];

  for (const node of path) {
    const mover = current.players.find((p) => p.id === playerId)!;
    current = replacePlayer(current, moveTo(mover, node));

    const spiritHolderIsMover = current.misfortune.holderId === playerId && current.misfortune.level > 0;
    if (spiritHolderIsMover) {
      const other = current.players.find((p) => p.id !== playerId && p.location === node);
      if (other) {
        current = {
          ...current,
          misfortune: passTo(current.misfortune, other.id, current.players.length),
        };
        spiritPassEvents.push({ type: "spirit-passed", fromPlayerId: playerId, toPlayerId: other.id, atNode: node });
      }
    }
  }

  const finalNode = path.length ? path[path.length - 1] : currentPlayer(current).location;
  return { session: current, finalNode, spiritPassEvents };
}
