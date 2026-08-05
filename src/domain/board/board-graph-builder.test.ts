import { describe, expect, it } from "vitest";
import { CityId, NodeId, RegionId } from "../shared-kernel/ids";
import { sameForAllLocales } from "../shared-kernel/localized-text";
import { buildBoardGraph } from "./board-graph-builder";
import { City } from "./city";
import { CountryProjection } from "./board-projection";

function city(
  id: string,
  lon: number,
  lat: number,
  region = "region-a",
): City {
  return {
    id: CityId(id),
    name: sameForAllLocales(id),
    regionId: RegionId(region),
    longitude: lon,
    latitude: lat,
    tag: sameForAllLocales(""),
    fact: sameForAllLocales(""),
    artSceneKey: "scene",
    artGlyphKey: "glyph",
    properties: [],
  };
}

const projection: CountryProjection = {
  boardWidth: 1200,
  boardHeight: 1400,
  lon0: -70,
  lon1: -57,
  lat0: -9,
  lat1: -23,
  segmentLength: 64,
};

describe("buildBoardGraph", () => {
  it("都市をcityノードとしてグラフに含める", () => {
    const cities = [city("lapaz", -68, -16), city("sucre", -65, -19)];
    const graph = buildBoardGraph(cities, [[CityId("lapaz"), CityId("sucre")]], projection);

    expect(graph.nodes.get(NodeId("lapaz"))).toMatchObject({ type: "city", cityId: "lapaz" });
    expect(graph.nodes.get(NodeId("sucre"))).toMatchObject({ type: "city", cityId: "sucre" });
  });

  it("同じ入力からは常に同じ盤面(中間マスの種類・個数)が生成される(決定的)", () => {
    const cities = [city("lapaz", -68, -16), city("sucre", -65, -19)];
    const graphA = buildBoardGraph(cities, [[CityId("lapaz"), CityId("sucre")]], projection);
    const graphB = buildBoardGraph(cities, [[CityId("lapaz"), CityId("sucre")]], projection);

    expect([...graphA.nodes.entries()]).toEqual([...graphB.nodes.entries()]);
  });

  it("2都市を路線でつなぐと、中間マスを介して互いに到達可能になる", () => {
    const cities = [city("lapaz", -68, -16), city("sucre", -65, -19)];
    const graph = buildBoardGraph(cities, [[CityId("lapaz"), CityId("sucre")]], projection);

    const lapazNeighbors = graph.adjacency.get(NodeId("lapaz")) ?? [];
    expect(lapazNeighbors.length).toBeGreaterThan(0);
    // 中間マスを辿ればsucreにたどり着けること
    let current = lapazNeighbors[0];
    const visited = new Set<string>([NodeId("lapaz")]);
    while (current !== NodeId("sucre")) {
      visited.add(current);
      const next = (graph.adjacency.get(current) ?? []).find((n) => !visited.has(n));
      expect(next).toBeDefined();
      current = next!;
    }
    expect(current).toBe(NodeId("sucre"));
  });

  it("存在しない都市を参照するedgeはエラーになる(データ整合性ガード)", () => {
    const cities = [city("lapaz", -68, -16)];
    expect(() =>
      buildBoardGraph(cities, [[CityId("lapaz"), CityId("unknown")]], projection),
    ).toThrow();
  });
});
