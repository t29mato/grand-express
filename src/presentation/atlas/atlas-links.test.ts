import { describe, expect, it } from "vitest";
import { CountryId } from "../../domain/shared-kernel/ids";
import { loadAtlasCities } from "./atlas-cities";
import { loadAtlasLinks } from "./atlas-links";

/**
 * 町と町をつなぐ線。**地図帳に「つながり」を出すためのデータ。**
 *
 * ここで見るのは、線として引ける形になっているか——両端の座標が解けているか、
 * 線路と航路が分かれているか、町の一覧と食い違っていないか。
 * 見た目(太さ・重なり)は撮って見る。
 */
describe("盤面の線路と航路を読む", () => {
  it("日本は97本あり、うち14本が航路", async () => {
    const links = await loadAtlasLinks(CountryId("japan"));
    expect(links).toHaveLength(97);
    expect(links.filter((link) => link.kind === "sea")).toHaveLength(14);
  });

  it("茨城県は線路だけ(航路が1本も無い)", async () => {
    const links = await loadAtlasLinks(CountryId("ibaraki"));
    expect(links.length).toBeGreaterThan(0);
    expect(links.every((link) => link.kind === "rail")).toBe(true);
  });

  it("オセアニアはほとんどが航路", async () => {
    const links = await loadAtlasLinks(CountryId("oceania"));
    expect(links.filter((link) => link.kind === "sea").length).toBeGreaterThan(
      links.filter((link) => link.kind === "rail").length * 5,
    );
  });

  /**
   * **両端の座標は、その盤面の町の座標そのもの。**
   * ここがずれると、線の端が町の印から外れて浮く。
   */
  it("両端の座標は、同じ盤面の町の座標と一致する", async () => {
    const [links, cities] = await Promise.all([
      loadAtlasLinks(CountryId("japan")),
      loadAtlasCities(CountryId("japan")),
    ]);
    const byId = new Map(cities.map((city) => [city.id, city]));
    for (const link of links) {
      const a = byId.get(link.from);
      const b = byId.get(link.to);
      expect(a).toBeDefined();
      expect(b).toBeDefined();
      expect([link.lonA, link.latA]).toEqual([a!.lon, a!.lat]);
      expect([link.lonB, link.latB]).toEqual([b!.lon, b!.lat]);
    }
  });

  /** SVGへ NaN を流すと、その線どころか**まとまり全体**が黙って消える。 */
  it("座標が数でない線は1本も無い", async () => {
    for (const id of ["japan", "oceania", "world", "ibaraki"]) {
      const links = await loadAtlasLinks(CountryId(id));
      for (const link of links) {
        expect([link.lonA, link.latA, link.lonB, link.latB].every(Number.isFinite)).toBe(true);
      }
    }
  });

  /**
   * オセアニアの町は経度が畳まれていない(アピアは188.2)。
   * **データ層は畳まない**——畳むのも変更線で切るのも描く側の仕事なので、
   * ここで丸めてしまうと切りようが無くなる。
   */
  it("変更線の向こうの町の経度は、畳まずにそのまま来る", async () => {
    const links = await loadAtlasLinks(CountryId("oceania"));
    const beyond = links.filter((link) => link.lonA > 180 || link.lonB > 180);
    expect(beyond.length).toBeGreaterThan(0);
  });

  it("同じ盤面を2度読んでも同じ結果が返る", async () => {
    const first = await loadAtlasLinks(CountryId("bali"));
    const second = await loadAtlasLinks(CountryId("bali"));
    expect(second).toEqual(first);
  });

  it("知らない盤面は読めない", async () => {
    await expect(loadAtlasLinks(CountryId("atlantis"))).rejects.toThrow();
  });
});
