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

      // 毎回クイズだと重いので、青マス・赤マスを挟んで息をつげるようにする。
      // ただし学ぶことが目的なので、半分はクイズのままにしておく。
      //
      // カードマス(星)は廃止した。アイテムは屋台とクイズの褒美で十分手に入り、
      // マスの種類が4つあると盤面の見分けが付きにくかった。
      // その4分の1ぶんは青マス・赤マスへ回している。
      const roll = h32(edgeIndex * 97 + k) % 20;
      let node: BoardNode;
      if (roll < 10) {
        node = { id: nodeId, type: "quiz", between, regionId, edgeKind };
      } else if (roll < 16) {
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
