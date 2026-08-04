import { describe, expect, it } from "vitest";
import { CityId, NodeId, RegionId } from "../shared-kernel/ids";
import { sameForAllLocales } from "../shared-kernel/localized-text";
import { Random } from "../shared-kernel/random";
import { PathfindingService } from "../board/pathfinding-service";
import { BoardGraph } from "../board/board-graph";
import { City } from "../board/city";
import { CPU_TUNING } from "./cpu-level";
import { chooseMoveTarget } from "./cpu-move-strategy";

class ZeroRandom implements Random {
  nextFloat(): number {
    return 0;
  }
  nextInt(): number {
    return 0;
  }
}

function linearGraph(): BoardGraph {
  const ids = ["a", "b", "c"].map((s) => NodeId(s));
  const adjacency = new Map<NodeId, NodeId[]>();
  ids.forEach((id) => adjacency.set(id, []));
  for (let i = 0; i < ids.length - 1; i++) {
    adjacency.get(ids[i])!.push(ids[i + 1]);
    adjacency.get(ids[i + 1])!.push(ids[i]);
  }
  const nodes = new Map(
    ids.map((id) => [id, { id, type: "city", cityId: id, regionId: RegionId("r") }] as const),
  );
  return { nodes: nodes as never, adjacency };
}

function city(id: string, cost: number): City {
  return {
    id: CityId(id),
    name: sameForAllLocales(id),
    regionId: RegionId("r"),
    longitude: 0,
    latitude: 0,
    tag: sameForAllLocales(""),
    fact: sameForAllLocales(""),
    properties: [{ name: sameForAllLocales("p"), cost, income: 10 }],
  };
}

describe("chooseMoveTarget", () => {
  it("目的地に近いマスほど高スコアで選ばれる", () => {
    const graph = linearGraph();
    const pathfinding = new PathfindingService(graph);
    const reach = new Map([
      [NodeId("b"), [NodeId("b")]],
      [NodeId("a"), [NodeId("a")]],
    ]);
    const path = chooseMoveTarget(
      reach,
      CPU_TUNING.normal,
      {
        destination: NodeId("c"),
        pathfinding,
        getNode: (id) => graph.nodes.get(id)!,
        getCity: (id) => city(id, 9999),
        isPropertyOwned: () => true,
        ownedCountInCity: () => 0,
        cash: 0,
      },
      new ZeroRandom(),
    );
    expect(path).toEqual([NodeId("b")]);
  });

  it("目的地そのものに到達できる場合は強く優遇される", () => {
    const graph = linearGraph();
    const pathfinding = new PathfindingService(graph);
    const reach = new Map([
      [NodeId("a"), [NodeId("a")]],
      [NodeId("c"), [NodeId("b"), NodeId("c")]],
    ]);
    const path = chooseMoveTarget(
      reach,
      CPU_TUNING.normal,
      {
        destination: NodeId("c"),
        pathfinding,
        getNode: (id) => graph.nodes.get(id)!,
        getCity: (id) => city(id, 9999),
        isPropertyOwned: () => true,
        ownedCountInCity: () => 0,
        cash: 0,
      },
      new ZeroRandom(),
    );
    expect(path).toEqual([NodeId("b"), NodeId("c")]);
  });

  it("買える未所有の物件がある都市は優遇される", () => {
    const graph = linearGraph();
    const pathfinding = new PathfindingService(graph);
    const reach = new Map([
      [NodeId("a"), [NodeId("a")]],
      [NodeId("b"), [NodeId("b")]],
    ]);
    const path = chooseMoveTarget(
      reach,
      CPU_TUNING.normal,
      {
        destination: NodeId("z"), // どちらも同距離(到達不能=999)にしてプロパティ加点だけで差をつける
        pathfinding,
        getNode: (id) => graph.nodes.get(id)!,
        getCity: (id) => city(id, id === "b" ? 100 : 100),
        isPropertyOwned: (cityId, i) => cityId === "a" && i === 0, // aは所有済み、bは未所有
        ownedCountInCity: () => 0,
        cash: 1000,
      },
      new ZeroRandom(),
    );
    expect(path).toEqual([NodeId("b")]);
  });
});
