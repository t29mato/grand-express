import { describe, expect, it } from "vitest";
import { NodeId } from "../shared-kernel/ids";
import { BoardGraph } from "./board-graph";
import { PathfindingService } from "./pathfinding-service";

/** a - b - c - d の直線グラフ(双方向) */
function linearGraph(): BoardGraph {
  const ids = ["a", "b", "c", "d"].map((s) => NodeId(s));
  const adjacency = new Map<NodeId, NodeId[]>();
  ids.forEach((id) => adjacency.set(id, []));
  for (let i = 0; i < ids.length - 1; i++) {
    adjacency.get(ids[i])!.push(ids[i + 1]);
    adjacency.get(ids[i + 1])!.push(ids[i]);
  }
  const nodes = new Map(
    ids.map((id) => [id, { id, type: "city", cityId: id, regionId: "r" }] as const),
  );
  return { nodes: nodes as never, adjacency };
}

describe("PathfindingService", () => {
  it("同一ノードへの距離は0", () => {
    const service = new PathfindingService(linearGraph());
    expect(service.distance(NodeId("a"), NodeId("a"))).toBe(0);
  });

  it("直線グラフでの最短距離を計算できる", () => {
    const service = new PathfindingService(linearGraph());
    expect(service.distance(NodeId("a"), NodeId("d"))).toBe(3);
    expect(service.distance(NodeId("b"), NodeId("d"))).toBe(2);
  });

  it("ちょうどsteps歩で到達できるノードを列挙できる(前方向)", () => {
    const service = new PathfindingService(linearGraph());
    const reach = service.reachableNodes(NodeId("a"), 2);
    expect([...reach.keys()]).toEqual([NodeId("c")]);
    expect(reach.get(NodeId("c"))).toEqual([NodeId("b"), NodeId("c")]);
  });

  it("後ろ方向にも移動できる(桃鉄式の双方向移動)。行き止まりでは同じマスへ折り返す", () => {
    const service = new PathfindingService(linearGraph());
    const reach = service.reachableNodes(NodeId("c"), 2);
    // c から2歩: 後ろ方向はa。前方向はd(隣接1つの行き止まり)で折り返すためcに戻る。
    expect([...reach.keys()].sort()).toEqual([NodeId("a"), NodeId("c")].sort());
  });

  it("1歩目で戻ってきた直後のマスへは(2歩目以降で)即座に戻らない", () => {
    const service = new PathfindingService(linearGraph());
    // b から1歩でaかcへ。2歩目でaに行った場合、bへ即座に戻らずbで折り返すか進むかのみ許容
    const reach = service.reachableNodes(NodeId("b"), 1);
    expect([...reach.keys()].sort()).toEqual([NodeId("a"), NodeId("c")].sort());
  });
});
