import { CityId, NodeId } from "../shared-kernel/ids";
import { CountryProjection, projectedDistance, segmentCount } from "./board-projection";
import { BoardGraph } from "./board-graph";
import { City, Edge } from "./city";
import { h32 } from "./deterministic-hash";
import { BoardNode } from "./node";


function connect(
  adjacency: Map<NodeId, NodeId[]>,
  a: NodeId,
  b: NodeId,
): void {
  adjacency.get(a)!.push(b);
  adjacency.get(b)!.push(a);
}

/**
 * 都市と路線(edges)から盤面グラフを構築する(現行コードの `buildGraph` を移植)。
 *
 * 各路線には、投影後の距離に応じて0〜9個の中間マスが決定的に挿入される
 * (どのマスがquiz/blue/red/cardになるかは `h32` ハッシュで決まるため、
 * 同じ国データからは常に同じ盤面が生成される)。
 *
 * **0個のときは都市どうしが直接つながる。** 近すぎる町にマスを挟むと、
 * マスの間隔が路線の長さの半分まで潰れるため(`segmentCount` を参照)。
 */
export function buildBoardGraph(
  cities: readonly City[],
  edges: readonly Edge[],
  projection: CountryProjection,
): BoardGraph {
  const cityById = new Map(cities.map((c) => [c.id, c]));
  const nodes = new Map<NodeId, BoardNode>();
  const adjacency = new Map<NodeId, NodeId[]>();

  for (const city of cities) {
    const nodeId = NodeId(city.id);
    nodes.set(nodeId, { id: nodeId, type: "city", cityId: city.id, regionId: city.regionId });
    adjacency.set(nodeId, []);
  }

  edges.forEach((edge, edgeIndex) => {
    const { from: aId, to: bId } = edge;
    const a = cityById.get(aId);
    const b = cityById.get(bId);
    if (!a || !b) {
      throw new Error(
        `edges[${edgeIndex}] references an unknown city: ${aId} / ${bId}`,
      );
    }
    const distance = projectedDistance(a, b, projection);
    const n = segmentCount(distance, projection);

    const chain: NodeId[] = [NodeId(a.id)];
    for (let k = 1; k <= n; k++) {
      const t = k / (n + 1);
      const nodeId = NodeId(`e${edgeIndex}_${k}`);
      const regionId = t < 0.5 ? a.regionId : b.regionId;
      const between = [a.id, b.id] as const;
      const edgeKind = edge.kind;

      // マスの配分。**半分は何も起きない `quiet` にしてある。**
      //
      // 以前は quiz 50% / blue 30% / red 20% で、**中間マスの100%が何かを起こしていた。**
      // 止まれば必ずモーダルが開き、閉じるまで盤面が見えない。
      // 「停止マスが多すぎてテンポが悪い」という指摘はここを指している。
      //
      // カードマス(星)は廃止した。アイテムは屋台とクイズの褒美で十分手に入り、
      // マスの種類が4つあると盤面の見分けが付きにくかった。
      //
      // **クイズの割合は落とすが、出題の総数はさほど減らない。**盤面1枚の
      // マスは数百あり、1ゲームで踏むのはその一部でしかないため。
      const roll = h32(edgeIndex * 97 + k) % 20;
      let node: BoardNode;
      if (roll < 10) {
        node = { id: nodeId, type: "quiet", between, regionId, edgeKind };
      } else if (roll < 15) {
        node = { id: nodeId, type: "quiz", between, regionId, edgeKind };
      } else if (roll < 18) {
        node = { id: nodeId, type: "blue", between, regionId, edgeKind };
      } else {
        node = { id: nodeId, type: "red", between, regionId, edgeKind };
      }

      nodes.set(nodeId, node);
      adjacency.set(nodeId, []);
      chain.push(nodeId);
    }
    chain.push(NodeId(b.id));

    for (let i = 0; i < chain.length - 1; i++) {
      connect(adjacency, chain[i], chain[i + 1]);
    }
  });

  return { nodes, adjacency };
}

export function citiesToIds(cities: readonly City[]): readonly CityId[] {
  return cities.map((c) => c.id);
}
