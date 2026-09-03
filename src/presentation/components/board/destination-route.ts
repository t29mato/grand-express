import { NodeId } from "../../../domain/shared-kernel/ids";
import { BoardGraph, neighborsOf } from "../../../domain/board/board-graph";
import { NodePosition } from "../../hooks/use-board-layout";

/**
 * 現在地から目的地への最短経路(通るマスの並び)。
 *
 * `PathfindingService.distance` は**距離しか返さない**(残りマス数の表示には
 * それで足りる)。盤面に経路そのものを描くには通るマスが要るので、
 * 同じ幅優先探索を親を覚える形で持つ。重みなしの最短経路なので、
 * 距離は `distance` と必ず一致する。
 *
 * 返すのは `from` を含み `to` で終わる並び。`from === to` なら `[from]`。
 * 届かなければ null。
 */
export function shortestPath(graph: BoardGraph, from: NodeId, to: NodeId): readonly NodeId[] | null {
  if (from === to) return [from];
  const parent = new Map<NodeId, NodeId | null>([[from, null]]);
  const queue: NodeId[] = [from];
  let head = 0;
  while (head < queue.length) {
    const current = queue[head++];
    for (const neighbor of neighborsOf(graph, current)) {
      if (parent.has(neighbor)) continue;
      parent.set(neighbor, current);
      if (neighbor === to) {
        const path: NodeId[] = [];
        for (let at: NodeId | null = to; at !== null; at = parent.get(at) ?? null) path.push(at);
        return path.reverse();
      }
      queue.push(neighbor);
    }
  }
  return null;
}

/**
 * 隣り合うマスの座標が、これ以上離れていたら線で結ばない(盤面座標)。
 *
 * 世界一周の盤面では日付変更線をまたぐ1歩で座標が3000ほど飛ぶ。そこを結ぶと
 * 経路の点線が地図を横断してしまう(駒の瞬間移動と同じ理由。`train-token.tsx`)。
 */
const SEAM_JUMP = 400;

/**
 * 経路を、盤面に描ける折れ線(複数本)にする。
 * 位置の無いマスは飛ばし、日付変更線で飛ぶところで線を切る。
 */
export function routePolylines(
  path: readonly NodeId[],
  positions: ReadonlyMap<NodeId, NodePosition>,
): readonly (readonly NodePosition[])[] {
  const lines: NodePosition[][] = [];
  let current: NodePosition[] = [];
  for (const id of path) {
    const p = positions.get(id);
    if (!p) continue;
    const last = current[current.length - 1];
    if (last && Math.hypot(p.x - last.x, p.y - last.y) > SEAM_JUMP) {
      if (current.length >= 2) lines.push(current);
      current = [];
    }
    current.push(p);
  }
  if (current.length >= 2) lines.push(current);
  return lines;
}
