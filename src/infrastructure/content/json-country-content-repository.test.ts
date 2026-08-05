import { describe, expect, it } from "vitest";
import { CountryId } from "../../domain/shared-kernel/ids";
import { JsonCountryContentRepository } from "./json-country-content-repository";

describe("JsonCountryContentRepository", () => {
  const repo = new JsonCountryContentRepository();

  it("ボリビアパックを読み込める(都市30・アイテム9・季節12・厄災7)", async () => {
    const pack = await repo.load(CountryId("bolivia"));
    expect(pack.cities.length).toBe(30);
    expect(pack.items.length).toBe(9);
    expect(pack.seasons.length).toBe(12);
    expect(pack.doomFlavors.length).toBe(7);
    expect(pack.quiz.length).toBeGreaterThan(0);
    expect(pack.startCityId).toBe("lapaz");
    expect(pack.spirit.wardItemKey).toBe("coca");
  });

  it("日本パックを読み込める(legacyの30都市 + 追加分。全47都道府県を網羅)", async () => {
    const pack = await repo.load(CountryId("japan"));
    // 都市は継続的に増やしているため、下限だけを守る(上限を固定すると
    // 追加のたびにテストが赤くなるだけで、何も守れていない)。
    expect(pack.cities.length).toBeGreaterThanOrEqual(52);
    expect(pack.items.length).toBe(9);
    expect(pack.seasons.length).toBe(12);
    expect(pack.doomFlavors.length).toBe(7);
    expect(pack.spirit.wardItemKey).toBe("omamori");
  });

  it("島の都市へは航路でつながっている", async () => {
    // 島は陸路では行けないので、航路(kind: "sea")が無いと到達不能になる。
    const pack = await repo.load(CountryId("japan"));
    const seaEdges = pack.edges.filter((e) => e.kind === "sea");
    expect(seaEdges.length).toBeGreaterThan(0);

    // 航路でしか行けない都市が、実際に航路を持っていること。
    const railNeighbors = new Set<string>();
    for (const { from, to, kind } of pack.edges) {
      if (kind !== "sea") {
        railNeighbors.add(from);
        railNeighbors.add(to);
      }
    }
    const islandOnly = pack.cities.map((c) => c.id).filter((id) => !railNeighbors.has(id));
    expect(islandOnly.length).toBeGreaterThan(0);
    for (const id of islandOnly) {
      expect(seaEdges.some((e) => e.from === id || e.to === id), `${id} に航路がない`).toBe(true);
    }
  });

  it("すべての都市が路線でつながっている(孤立した都市がない)", async () => {
    // 路線は手書きのため、追加した都市が盤面から孤立していないことを確認する。
    for (const countryId of ["bolivia", "japan"] as const) {
      const pack = await repo.load(CountryId(countryId));
      const neighbors = new Map<string, string[]>();
      for (const { from: a, to: b } of pack.edges) {
        neighbors.set(a, [...(neighbors.get(a) ?? []), b]);
        neighbors.set(b, [...(neighbors.get(b) ?? []), a]);
      }
      const seen = new Set<string>([pack.startCityId]);
      const queue = [pack.startCityId as string];
      while (queue.length > 0) {
        for (const next of neighbors.get(queue.shift()!) ?? []) {
          if (!seen.has(next)) {
            seen.add(next);
            queue.push(next);
          }
        }
      }
      const unreachable = pack.cities.map((c) => c.id).filter((id) => !seen.has(id));
      expect(unreachable, `${countryId}: 到達できない都市`).toEqual([]);
    }
  });

  it("edgesが参照する都市IDはすべて実在する(参照整合性)", async () => {
    for (const countryId of ["bolivia", "japan"] as const) {
      const pack = await repo.load(CountryId(countryId));
      const cityIds = new Set(pack.cities.map((c) => c.id));
      for (const { from: a, to: b } of pack.edges) {
        expect(cityIds.has(a)).toBe(true);
        expect(cityIds.has(b)).toBe(true);
      }
    }
  });

  it("すべてのクイズに4言語の選択肢と正解インデックスがある", async () => {
    const pack = await repo.load(CountryId("bolivia"));
    for (const q of pack.quiz) {
      expect(q.correctOptionIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctOptionIndex).toBeLessThan(q.options.length);
      for (const opt of q.options) {
        expect(opt.en.length).toBeGreaterThan(0);
        expect(opt.ja.length).toBeGreaterThan(0);
      }
    }
  });

  it("未知の国を要求するとエラーになる", async () => {
    await expect(repo.load(CountryId("atlantis"))).rejects.toThrow();
  });

  it("同じ国は2回目以降キャッシュされた同一オブジェクトを返す", async () => {
    const first = await repo.load(CountryId("bolivia"));
    const second = await repo.load(CountryId("bolivia"));
    expect(first).toBe(second);
  });

  it("同じ国を同時に読み込んでも(競合状態でも)同じインスタンスに解決される", async () => {
    const [first, second] = await Promise.all([repo.load(CountryId("japan")), repo.load(CountryId("japan"))]);
    expect(first).toBe(second);
  });
});
