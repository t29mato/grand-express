import { CityId, NodeId } from "../shared-kernel/ids";
import { CountryProjection, projectedDistance, segmentCount } from "./board-projection";
import { BoardGraph } from "./board-graph";
import { City, Edge } from "./city";
import { h32 } from "./deterministic-hash";
import { BoardNode, QuizTier } from "./node";

const QUIZ_TIERS: readonly QuizTier[] = ["low", "mid", "high"];

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
 * 各路線には、投影後の距離に応じて1〜5個の中間マスが決定的に挿入される
 * (どのマスがquiz/blue/red/cardになるかは `h32` ハッシュで決まるため、
 * 同じ国データからは常に同じ盤面が生成される)。
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

  edges.forEach(([aId, bId], edgeIndex) => {
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

      const roll = h32(edgeIndex * 97 + k) % 20;
      let node: BoardNode;
      if (roll < 10) {
        const tier = QUIZ_TIERS[h32(edgeIndex * 211 + k * 7) % 3];
        node = { id: nodeId, type: "quiz", tier, between, regionId };
      } else if (roll < 14) {
        node = { id: nodeId, type: "blue", between, regionId };
      } else if (roll < 17) {
        node = { id: nodeId, type: "red", between, regionId };
      } else {
        node = { id: nodeId, type: "card", between, regionId };
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
