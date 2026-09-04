import { describe, expect, it } from "vitest";
import { AtlasBounds } from "./atlas-types";
import { coverageGaps, coverageReport, isLand } from "./atlas-coverage";

/** その点が空白のセルに入っているか。 */
function inGap(gaps: readonly AtlasBounds[], lon: number, lat: number): boolean {
  return gaps.some((b) => lon >= b.lon0 && lon < b.lon1 && lat <= b.lat0 && lat > b.lat1);
}

describe("陸地の判定", () => {
  it.each([
    ["東京", 139.7, 35.7],
    ["パリ", 2.35, 48.86],
    ["ラパス", -68.15, -16.5],
    ["キンシャサ", 15.3, -4.3],
    ["リヤド", 46.7, 24.7],
  ])("%s は陸", (_name, lon, lat) => {
    expect(isLand(lon, lat)).toBe(true);
  });

  it.each([
    ["北太平洋のまんなか", -150, 30],
    ["南大西洋", -20, -30],
    ["インド洋", 75, -25],
    ["南極海", 0, -60],
  ])("%s は海", (_name, lon, lat) => {
    expect(isLand(lon, lat)).toBe(false);
  });

  it("変更線をまたぐ陸(チュクチ半島)も陸と分かる", () => {
    // 陸地の輪郭では経度189.5まで伸びている部分。-175度として調べても当たること。
    expect(isLand(-175, 66)).toBe(true);
  });
});

describe("まだ国の盤面が無い場所", () => {
  it("空白のセルは必ず陸を含む(海を「作っていない」と言わない)", () => {
    const oceanCells = coverageGaps(5).filter((b) => {
      for (const fy of [1 / 6, 1 / 2, 5 / 6]) {
        for (const fx of [1 / 6, 1 / 2, 5 / 6]) {
          if (isLand(b.lon0 + (b.lon1 - b.lon0) * fx, b.lat0 - (b.lat0 - b.lat1) * fy)) return false;
        }
      }
      return true;
    });
    expect(oceanCells).toEqual([]);
  });

  it.each([
    ["東京(japan)", 139.7, 35.7],
    ["パリ(france)", 2.35, 48.86],
    ["ラパス(bolivia)", -68.15, -16.5],
    ["カイロ(egypt)", 31.24, 30.04],
    ["ヨハネスブルグ(southafrica)", 28.05, -26.2],
    ["バリ島(bali)", 115.2, -8.4],
  ])("盤面のある %s は空白と言わない", (_name, lon, lat) => {
    expect(inGap(coverageGaps(5), lon, lat)).toBe(false);
  });

  it.each([
    ["リヤド(中東)", 46.7, 24.7],
    ["ナイロビ(東アフリカ)", 36.82, -1.29],
    ["ヌーク(グリーンランド)", -51.7, 64.18],
    ["ンジャメナ(サヘル)", 15.05, 12.11],
  ])("国の盤面が無い %s は空白として出る", (_name, lon, lat) => {
    expect(inGap(coverageGaps(5), lon, lat)).toBe(true);
  });

  /**
   * **世界一周と大陸の盤面を数に入れると、必ず0件になる。**
   * この検査は「うっかり広い盤面を数に入れた」ことに気づくためのもの。
   */
  it("全部が覆われている、という結果にはならない", () => {
    const report = coverageReport(5);
    expect(report.gaps.length).toBeGreaterThan(0);
    expect(report.coveredCells).toBeGreaterThan(0);
    expect(report.landCells).toBe(report.coveredCells + report.gaps.length);
  });

  /**
   * 実測値(2026-09、盤面47枚)。**盤面を足したらここが動く。**
   * 動いたら数字を書き換えること。大きく増えたら、広い盤面を数に入れてしまった疑い。
   */
  it("5度格子の実測: 陸745セル・盤面あり545・空白200(27%)", () => {
    const report = coverageReport(5);
    expect({
      land: report.landCells,
      covered: report.coveredCells,
      gaps: report.gaps.length,
    }).toEqual({ land: 745, covered: 545, gaps: 200 });
  });

  it("格子を細かくすると空白の割合はほぼ変わらない", () => {
    const coarse = coverageReport(10);
    const fine = coverageReport(2.5);
    const ratio = (r: { landCells: number; gaps: readonly unknown[] }) => r.gaps.length / r.landCells;
    expect(Math.abs(ratio(coarse) - ratio(fine))).toBeLessThan(0.05);
  });

  it("セルは格子の枠そのもの(北が lat0、南が lat1)", () => {
    for (const cell of coverageGaps(10)) {
      expect(cell.lat0).toBeGreaterThan(cell.lat1);
      expect(cell.lon1).toBeGreaterThan(cell.lon0);
      expect(cell.lon0).toBeGreaterThanOrEqual(-180);
      expect(cell.lon1).toBeLessThanOrEqual(180);
    }
  });

  it("同じ粗さで2度呼んでも数え直さない", () => {
    expect(coverageGaps(10)).toBe(coverageGaps(10));
  });

  it("0度以下の格子は受け付けない", () => {
    expect(() => coverageGaps(0)).toThrow();
    expect(() => coverageGaps(-5)).toThrow();
  });
});
