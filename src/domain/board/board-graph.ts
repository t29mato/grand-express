import { NodeId } from "../shared-kernel/ids";
import { BoardNode } from "./node";

/**
 * 盤面グラフ。都市+路線上の中間マスをノードとする無向グラフ。
 * 座標(SVG描画用)はPresentation層の責務であり、ここには持たせない
 * (docs/10-architecture/04-adr/0003-rendering-strategy.md)。
 */
export interface BoardGraph {
  readonly nodes: ReadonlyMap<NodeId, BoardNode>;
  readonly adjacency: ReadonlyMap<NodeId, readonly NodeId[]>;
}

export function neighborsOf(graph: BoardGraph, nodeId: NodeId): readonly NodeId[] {
  return graph.adjacency.get(nodeId) ?? [];
}
