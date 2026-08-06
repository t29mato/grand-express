import { describe, expect, it } from "vitest";
import { octilinearDirection, octilinearRoutePoint } from "./octilinear-route";

/**
 * 路線が「縦・横・45度」以外の角度で引かれないことを確かめる。
 *
 * この性質が崩れると盤面が乱れて見える(それを直すために入れた仕組みなので、
 * 気づかず戻ってしまわないよう押さえておく)。
 */
describe("縦・横・45度だけの経路", () => {
  /** 端点の組み合わせ。向き・長短・軸に揃った場合を混ぜる。 */
  const pairs = [
    [
      { x: 0, y: 0 },
      { x: 300, y: 100 },
    ],
    [
      { x: 0, y: 0 },
      { x: 100, y: 300 },
    ],
    [
      { x: 200, y: 400 },
      { x: 50, y: 90 },
    ],
    [
      { x: 400, y: 100 },
      { x: 100, y: 400 },
    ],
    [
      { x: 0, y: 0 },
      { x: 250, y: 0 },
    ], // 真横
    [
      { x: 0, y: 0 },
      { x: 0, y: 250 },
    ], // 真縦
    [
      { x: 0, y: 0 },
      { x: 180, y: 180 },
    ], // ちょうど45度
  ] as const;

  const angleOf = (dx: number, dy: number) => (Math.atan2(dy, dx) * 180) / Math.PI;
  /** 0/45/90/135/180/… のいずれかに一致するか。 */
  const isOctilinear = (dx: number, dy: number) => {
    if (Math.hypot(dx, dy) < 1e-9) return true;
    const mod = Math.abs(((angleOf(dx, dy) % 45) + 45) % 45);
    return mod < 1e-6 || Math.abs(mod - 45) < 1e-6;
  };

  it.each([false, true])("斜めの脚を先にする=%s: 折れ点をまたぐ1区間を除き45度の倍数", (diagonalFirst) => {
    // 経路は「軸に沿った脚」と「45度の脚」の2本なので、その境をまたぐ区間だけは
    // 両方の向きが混ざった弦になる(盤面ではこれが曲がり角として見える)。
    // それ以外の区間が45度の倍数から外れていたら、経路の作りが壊れている。
    for (const [a, b] of pairs) {
      const steps = 40;
      const offAngle: number[] = [];
      for (let i = 0; i < steps; i++) {
        const p1 = octilinearRoutePoint(a, b, i / steps, diagonalFirst);
        const p2 = octilinearRoutePoint(a, b, (i + 1) / steps, diagonalFirst);
        if (!isOctilinear(p2.x - p1.x, p2.y - p1.y)) offAngle.push(i);
      }
      expect(
        offAngle.length,
        `(${a.x},${a.y})→(${b.x},${b.y}): 45度から外れた区間 ${JSON.stringify(offAngle)}`,
      ).toBeLessThanOrEqual(1);
    }
  });

  it.each([false, true])("斜めの脚を先にする=%s: 両端は必ず都市に一致する", (diagonalFirst) => {
    for (const [a, b] of pairs) {
      expect(octilinearRoutePoint(a, b, 0, diagonalFirst)).toEqual({ x: a.x, y: a.y });
      const end = octilinearRoutePoint(a, b, 1, diagonalFirst);
      expect(end.x).toBeCloseTo(b.x, 6);
      expect(end.y).toBeCloseTo(b.y, 6);
    }
  });

  it("中間マスが等間隔に並ぶ(短い脚に詰まらない)", () => {
    const a = { x: 0, y: 0 };
    const b = { x: 400, y: 60 };
    const steps = 24;
    const gaps: number[] = [];
    for (let i = 0; i < steps; i++) {
      const p1 = octilinearRoutePoint(a, b, i / steps, false);
      const p2 = octilinearRoutePoint(a, b, (i + 1) / steps, false);
      gaps.push(Math.hypot(p2.x - p1.x, p2.y - p1.y));
    }
    // 折れ点をまたぐ区間だけは、2本の脚に分かれるぶんわずかに短くなる。
    const min = Math.min(...gaps);
    const max = Math.max(...gaps);
    expect(max - min).toBeLessThan(max * 0.35);
  });

  it("進む向きは、折れ点の前後で変わる", () => {
    // ずらす向きを「その場の脚」に直角にとるための性質。
    const a = { x: 0, y: 0 };
    const b = { x: 400, y: 100 };
    const before = octilinearDirection(a, b, 0.1, false);
    const after = octilinearDirection(a, b, 0.95, false);
    expect(before).not.toEqual(after);
    for (const d of [before, after]) {
      expect(Math.hypot(d.x, d.y)).toBeCloseTo(1, 6);
      expect(isOctilinear(d.x, d.y)).toBe(true);
    }
  });

  it("同じ地点どうしでも壊れない", () => {
    const a = { x: 120, y: 80 };
    expect(octilinearRoutePoint(a, a, 0.5, false)).toEqual({ x: 120, y: 80 });
  });
});
