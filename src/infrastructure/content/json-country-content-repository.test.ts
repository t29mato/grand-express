import { describe, expect, it } from "vitest";
import { CountryId } from "../../domain/shared-kernel/ids";
import { JsonCountryContentRepository } from "./json-country-content-repository";

describe("JsonCountryContentRepository", () => {
  const repo = new JsonCountryContentRepository();

  it("ボリビアパックを読み込める(都市30・アイテム9・季節12・厄災7)", () => {
    const pack = repo.load(CountryId("bolivia"));
    expect(pack.cities.length).toBe(30);
    expect(pack.items.length).toBe(9);
    expect(pack.seasons.length).toBe(12);
    expect(pack.doomFlavors.length).toBe(7);
    expect(pack.quiz.length).toBeGreaterThan(0);
    expect(pack.startCityId).toBe("lapaz");
    expect(pack.spirit.wardItemKey).toBe("coca");
  });

  it("日本パックを読み込める", () => {
    const pack = repo.load(CountryId("japan"));
    expect(pack.cities.length).toBe(30);
    expect(pack.items.length).toBe(9);
    expect(pack.seasons.length).toBe(12);
    expect(pack.doomFlavors.length).toBe(7);
    expect(pack.spirit.wardItemKey).toBe("omamori");
  });

  it("edgesが参照する都市IDはすべて実在する(参照整合性)", () => {
    for (const countryId of ["bolivia", "japan"] as const) {
      const pack = repo.load(CountryId(countryId));
      const cityIds = new Set(pack.cities.map((c) => c.id));
      for (const [a, b] of pack.edges) {
        expect(cityIds.has(a)).toBe(true);
        expect(cityIds.has(b)).toBe(true);
      }
    }
  });

  it("すべてのクイズに4言語の選択肢と正解インデックスがある", () => {
    const pack = repo.load(CountryId("bolivia"));
    for (const q of pack.quiz) {
      expect(q.correctOptionIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctOptionIndex).toBeLessThan(q.options.length);
      for (const opt of q.options) {
        expect(opt.en.length).toBeGreaterThan(0);
        expect(opt.ja.length).toBeGreaterThan(0);
      }
    }
  });

  it("未知の国を要求するとエラーになる", () => {
    expect(() => repo.load(CountryId("atlantis"))).toThrow();
  });

  it("同じ国は2回目以降キャッシュされた同一オブジェクトを返す", () => {
    const first = repo.load(CountryId("bolivia"));
    const second = repo.load(CountryId("bolivia"));
    expect(first).toBe(second);
  });
});
