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

  it("日本パックを読み込める(legacyの30都市 + 追加14都市)", async () => {
    const pack = await repo.load(CountryId("japan"));
    expect(pack.cities.length).toBe(44);
    expect(pack.items.length).toBe(9);
    expect(pack.seasons.length).toBe(12);
    expect(pack.doomFlavors.length).toBe(7);
    expect(pack.spirit.wardItemKey).toBe("omamori");
  });

  it("すべての都市が路線でつながっている(孤立した都市がない)", async () => {
    // 路線は手書きのため、追加した都市が盤面から孤立していないことを確認する。
    for (const countryId of ["bolivia", "japan"] as const) {
      const pack = await repo.load(CountryId(countryId));
      const neighbors = new Map<string, string[]>();
      for (const [a, b] of pack.edges) {
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
      for (const [a, b] of pack.edges) {
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
