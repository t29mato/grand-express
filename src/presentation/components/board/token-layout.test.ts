import { describe, expect, it } from "vitest";
import { TOKEN_BASE_SCALE, tokenPlacements } from "./token-layout";

/** 駒の素の幅(盤面座標)。`train-token.tsx` の車体は -10〜+10。 */
const TOKEN_WIDTH = 20;

/** 並べたときに広がる幅(いちばん左の駒の左端から、いちばん右の駒の右端まで)。 */
function spread(count: number) {
  const placements = tokenPlacements(count);
  const left = Math.min(...placements.map((p) => p.dx - (TOKEN_WIDTH * p.scale) / 2));
  const right = Math.max(...placements.map((p) => p.dx + (TOKEN_WIDTH * p.scale) / 2));
  return right - left;
}

describe("tokenPlacements", () => {
  it("1人ならずらさず、大きさもそのまま", () => {
    expect(tokenPlacements(1)).toEqual([{ dx: 0, dy: 0, scale: TOKEN_BASE_SCALE }]);
  });

  it("人数ぶんの置き場所を返す", () => {
    for (const count of [1, 2, 3, 4]) {
      expect(tokenPlacements(count)).toHaveLength(count);
    }
  });

  it("マスの中心を軸に左右対称に並ぶ(駒の重心が中心からずれない)", () => {
    for (const count of [2, 3, 4]) {
      const placements = tokenPlacements(count);
      const sum = placements.reduce((acc, p) => acc + p.dx, 0);
      expect(sum).toBeCloseTo(0, 6);
    }
  });

  it("3人以上は2段になり、縦にも散る", () => {
    for (const count of [3, 4]) {
      const rows = new Set(tokenPlacements(count).map((p) => p.dy));
      expect(rows.size).toBe(2);
    }
    // 2人までは1段のまま。
    expect(new Set(tokenPlacements(2).map((p) => p.dy)).size).toBe(1);
  });

  it("同じ段の駒どうしが重ならない(隣の駒に隠れて色が分からなくなるのを防ぐ)", () => {
    for (const count of [2, 3, 4]) {
      const byRow = new Map<number, { dx: number; scale: number }[]>();
      for (const p of tokenPlacements(count)) {
        byRow.set(p.dy, [...(byRow.get(p.dy) ?? []), { dx: p.dx, scale: p.scale }]);
      }
      for (const row of byRow.values()) {
        const sorted = [...row].sort((a, b) => a.dx - b.dx);
        for (let i = 1; i < sorted.length; i++) {
          const gap = sorted[i].dx - sorted[i - 1].dx;
          const halves = (TOKEN_WIDTH * sorted[i].scale) / 2 + (TOKEN_WIDTH * sorted[i - 1].scale) / 2;
          // 間隔が「隣り合う駒の半幅の和」以上なら、車体は重ならない。
          expect(gap).toBeGreaterThanOrEqual(halves);
        }
      }
    }
  });

  it("4人でも広がりが隣のマスまで届かない(隣り合うマスの間隔は中央値でおよそ36)", () => {
    expect(spread(4)).toBeLessThan(46);
    expect(spread(2)).toBeLessThan(46);
  });
});
