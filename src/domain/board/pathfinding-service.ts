import { NodeId } from "../shared-kernel/ids";
import { BoardGraph, neighborsOf } from "./board-graph";

/**
 * 盤面グラフ上の経路探索を担うドメインサービス(現行コードの `bfsDist`, `reachable` を移植)。
 */
export class PathfindingService {
  constructor(private readonly graph: BoardGraph) {}

  /** 2ノード間の最短ホップ数(重みなしBFS)。到達不能な場合は 999 を返す。 */
  distance(from: NodeId, to: NodeId): number {
    if (from === to) return 0;
    const seen = new Map<NodeId, number>([[from, 0]]);
    const queue: NodeId[] = [from];
    while (queue.length) {
      const current = queue.shift()!;
      for (const neighbor of neighborsOf(this.graph, current)) {
        if (!seen.has(neighbor)) {
          const dist = seen.get(current)! + 1;
          seen.set(neighbor, dist);
          if (neighbor === to) return dist;
          queue.push(neighbor);
        }
      }
    }
    return 999;
  }

  /**
   * `from` からちょうど `steps` マス移動して到達できるノードと、そこに至る経路の一覧。
   * 路線は双方向に移動できる(前にも後ろにも進める)。同じマスへの直接の後戻り
   * (1歩前のマスへ即座に戻ること)は行わない — 現行コードの `reachable` と同じ挙動。
   */
  reachableNodes(from: NodeId, steps: number): ReadonlyMap<NodeId, readonly NodeId[]> {
    type Frontier = { node: NodeId; prev: NodeId | null; path: NodeId[] };
    let current: Frontier[] = [{ node: from, prev: null, path: [] }];

    for (let s = 0; s < steps; s++) {
      const seenEdges = new Set<string>();
      const next: Frontier[] = [];
      for (const state of current) {
        const allNeighbors = neighborsOf(this.graph, state.node);
        const options =
          s === 0
            ? allNeighbors
            : allNeighbors.filter((n) => n !== state.prev);
        const candidates = options.length ? options : allNeighbors;
        for (const neighbor of candidates) {
          const edgeKey = `${neighbor}|${state.node}`;
          if (seenEdges.has(edgeKey)) continue;
          seenEdges.add(edgeKey);
          next.push({ node: neighbor, prev: state.node, path: [...state.path, neighbor] });
        }
      }
      current = next;
      if (!current.length) break;
    }

    const out = new Map<NodeId, readonly NodeId[]>();
    for (const state of current) {
      if (!out.has(state.node)) out.set(state.node, state.path);
    }
    return out;
  }
}
