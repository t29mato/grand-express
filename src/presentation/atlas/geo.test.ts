import { describe, expect, it } from "vitest";
import { boundsArea, boundsContain, boundsLonSpan, normalizeLongitude } from "./geo";

describe("経度の畳み込み", () => {
  it.each([
    [0, 0],
    [180, -180],
    [-180, -180],
    [200, -160],
    [233, -127],
    [-188, 172],
    [216, -144],
  ])("%s度 → %s度", (input, expected) => {
    expect(normalizeLongitude(input)).toBeCloseTo(expected, 6);
  });
});

describe("枠の判定(日付変更線)", () => {
  /** オセアニア盤。132度から東へ101度ぶん、変更線をまたいで西経127度まで。 */
  const oceania = { lon0: 132, lon1: 233, lat0: 17, lat1: -27 };

  it("またいだ先の島も中に入る", () => {
    // フィジー(178E)、サモア(-172 = 188)、タヒチ(-149 = 211)。
    expect(boundsContain(oceania, 178, -18)).toBe(true);
    expect(boundsContain(oceania, -172, -13.8)).toBe(true);
    expect(boundsContain(oceania, -149.6, -17.5)).toBe(true);
  });

  it("枠の外(南アジア・南米)は入らない", () => {
    expect(boundsContain(oceania, 100, 0)).toBe(false);
    expect(boundsContain(oceania, -70, -15)).toBe(false);
  });

  it("素朴な lon0<=lon<=lon1 なら誤るところで正しく答える", () => {
    // 178 も -149 も「132以上233以下」の素朴な比較では -149 が外れる。
    expect(-149 >= oceania.lon0 && -149 <= oceania.lon1).toBe(false);
    expect(boundsContain(oceania, -149, -17)).toBe(true);
  });

  it("緯度が外れれば経度が合っていても外", () => {
    expect(boundsContain(oceania, 150, -40)).toBe(false);
  });

  it("360度を超える枠(世界一周)はすべての経度を含む", () => {
    const world = { lon0: -188, lon1: 216, lat0: 75, lat1: -56 };
    expect(boundsLonSpan(world)).toBe(360);
    for (const lon of [-180, -90, 0, 90, 179.9]) {
      expect(boundsContain(world, lon, 0)).toBe(true);
    }
    // 緯度は丸ごとではない。南極は世界一周盤の枠にも入らない。
    expect(boundsContain(world, 0, -80)).toBe(false);
  });

  it("lat0が北・lat1が南の向きでも、逆向きでも同じに答える", () => {
    const japan = { lon0: 127, lon1: 146.5, lat0: 45.8, lat1: 25.6 };
    const flipped = { ...japan, lat0: 25.6, lat1: 45.8 };
    expect(boundsContain(japan, 139.7, 35.7)).toBe(true);
    expect(boundsContain(flipped, 139.7, 35.7)).toBe(true);
  });
});

describe("枠の広さ", () => {
  it("変更線をまたぐ枠でも負にならない", () => {
    expect(boundsLonSpan({ lon0: 170, lon1: -170, lat0: 10, lat1: 0 })).toBeCloseTo(20, 6);
  });

  it("茨城県は日本より狭い", () => {
    const ibaraki = { lon0: 139.55, lon1: 140.9, lat0: 36.95, lat1: 35.7 };
    const japan = { lon0: 127, lon1: 146.5, lat0: 45.8, lat1: 25.6 };
    expect(boundsArea(ibaraki)).toBeLessThan(boundsArea(japan));
  });
});
