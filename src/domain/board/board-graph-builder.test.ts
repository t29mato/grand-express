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
    labelPosition: "bottom" as const,
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
    const graph = buildBoardGraph(cities, [{ from: CityId("lapaz"), to: CityId("sucre"), kind: "rail" as const }], projection);

    expect(graph.nodes.get(NodeId("lapaz"))).toMatchObject({ type: "city", cityId: "lapaz" });
    expect(graph.nodes.get(NodeId("sucre"))).toMatchObject({ type: "city", cityId: "sucre" });
  });

  it("同じ入力からは常に同じ盤面(中間マスの種類・個数)が生成される(決定的)", () => {
    const cities = [city("lapaz", -68, -16), city("sucre", -65, -19)];
    const graphA = buildBoardGraph(cities, [{ from: CityId("lapaz"), to: CityId("sucre"), kind: "rail" as const }], projection);
    const graphB = buildBoardGraph(cities, [{ from: CityId("lapaz"), to: CityId("sucre"), kind: "rail" as const }], projection);

    expect([...graphA.nodes.entries()]).toEqual([...graphB.nodes.entries()]);
  });

  it("2都市を路線でつなぐと、中間マスを介して互いに到達可能になる", () => {
    const cities = [city("lapaz", -68, -16), city("sucre", -65, -19)];
    const graph = buildBoardGraph(cities, [{ from: CityId("lapaz"), to: CityId("sucre"), kind: "rail" as const }], projection);

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
      buildBoardGraph(cities, [{ from: CityId("lapaz"), to: CityId("unknown"), kind: "rail" as const }], projection),
    ).toThrow();
  });

  /**
   * **止まっても何も起きないマスが、中間マスのおよそ半分ある。**
   *
   * 以前は中間マスの100%が何かを起こしていた(全30盤面の実測で
   * quiz 54.2% / blue 26.5% / red 19.4%、合計3466マス)。つまり止まれば必ず
   * モーダルが開き、閉じるまで盤面が見えなかった。「停止マスが多すぎて
   * テンポが悪い」という指摘を受けて `quiet` を入れている。
   *
   * **配分が戻ったら気づけるようにしておく。**ここが崩れると、直したはずの
   * テンポが黙って元に戻る。幅を持たせてあるのは h32 が完全な一様分布では
   * ないため(実測 54.2%)。
   */
  it("中間マスのおよそ半分は、止まっても何も起きない", () => {
    const cities = [city("lapaz", -68.15, -16.5), city("sucre", -65.26, -19.05)];
    // 1本では標本が少なすぎるので、同じ2都市を結ぶ路線を並べて数を稼ぐ。
    // 種別は「路線の添字とマスの位置」で決まるので、これで配分を測れる。
    const edges = Array.from({ length: 60 }, () => ({
      from: CityId("lapaz"),
      to: CityId("sucre"),
      kind: "rail" as const,
    }));
    const graph = buildBoardGraph(cities, edges, projection);

    const counts: Record<string, number> = {};
    for (const node of graph.nodes.values()) counts[node.type] = (counts[node.type] ?? 0) + 1;
    const intermediate =
      (counts.quiet ?? 0) + (counts.quiz ?? 0) + (counts.blue ?? 0) + (counts.red ?? 0);

    expect(intermediate).toBeGreaterThan(0);
    const quietShare = (counts.quiet ?? 0) / intermediate;
    expect(quietShare).toBeGreaterThan(0.4);
    expect(quietShare).toBeLessThan(0.65);
    // クイズは残っている。減らしはしたが、無くしてはいない。
    expect(counts.quiz ?? 0).toBeGreaterThan(0);
  });
});
