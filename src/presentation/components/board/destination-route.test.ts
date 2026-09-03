import { describe, expect, it } from "vitest";
import { NodeId } from "../../../domain/shared-kernel/ids";
import { BoardGraph } from "../../../domain/board/board-graph";
import { PathfindingService } from "../../../domain/board/pathfinding-service";
import { routePolylines, shortestPath } from "./destination-route";

/**
 *   a — b — c — d
 *   |           |
 *   e ——————————
 *
 * a→d は a-e-d の2歩が最短(a-b-c-d は3歩)。
 */
function graph(): BoardGraph {
  const adjacency = new Map<NodeId, readonly NodeId[]>([
    [NodeId("a"), [NodeId("b"), NodeId("e")]],
    [NodeId("b"), [NodeId("a"), NodeId("c")]],
    [NodeId("c"), [NodeId("b"), NodeId("d")]],
    [NodeId("d"), [NodeId("c"), NodeId("e")]],
    [NodeId("e"), [NodeId("a"), NodeId("d")]],
    [NodeId("island"), []],
  ]);
  return { nodes: new Map(), adjacency };
}

describe("shortestPath", () => {
  it("いちばん短い道のりを、出発点を含めて返す", () => {
    expect(shortestPath(graph(), NodeId("a"), NodeId("d"))).toEqual(["a", "e", "d"]);
    expect(shortestPath(graph(), NodeId("b"), NodeId("d"))).toEqual(["b", "c", "d"]);
  });

  it("同じ場所なら自分だけ、届かなければ null", () => {
    expect(shortestPath(graph(), NodeId("a"), NodeId("a"))).toEqual(["a"]);
    expect(shortestPath(graph(), NodeId("a"), NodeId("island"))).toBeNull();
  });

  it("長さは PathfindingService.distance と一致する(「残り◯マス」と経路の点線が食い違わない)", () => {
    const g = graph();
    const service = new PathfindingService(g);
    for (const from of ["a", "b", "c", "d", "e"]) {
      for (const to of ["a", "b", "c", "d", "e"]) {
        const path = shortestPath(g, NodeId(from), NodeId(to))!;
        expect(path.length - 1, `${from}→${to}`).toBe(service.distance(NodeId(from), NodeId(to)));
      }
    }
  });
});

describe("routePolylines", () => {
  it("座標の無いマスは飛ばし、日付変更線で飛ぶところは線を切る", () => {
    const positions = new Map<NodeId, { x: number; y: number }>([
      [NodeId("a"), { x: 0, y: 0 }],
      [NodeId("b"), { x: 50, y: 0 }],
      // c は座標が無い
      [NodeId("d"), { x: 3000, y: 0 }],
      [NodeId("e"), { x: 3050, y: 0 }],
    ]);
    const lines = routePolylines([NodeId("a"), NodeId("b"), NodeId("c"), NodeId("d"), NodeId("e")], positions);
    expect(lines).toEqual([
      [
        { x: 0, y: 0 },
        { x: 50, y: 0 },
      ],
      [
        { x: 3000, y: 0 },
        { x: 3050, y: 0 },
      ],
    ]);
  });

  it("点が1つしか残らない線は出さない", () => {
    const positions = new Map<NodeId, { x: number; y: number }>([[NodeId("a"), { x: 0, y: 0 }]]);
    expect(routePolylines([NodeId("a"), NodeId("b")], positions)).toEqual([]);
  });
});
