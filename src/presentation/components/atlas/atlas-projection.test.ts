import { describe, expect, it } from "vitest";
import {
  LAT_MID,
  MAX_SPAN,
  MIN_SPAN,
  WORLD_VIEW,
  bandOf,
  boundsCentre,
  boundsRects,
  clampSpan,
  clampView,
  degreesPerPixel,
  labelFits,
  minSpanForBoard,
  normalizeLon,
  normalizePolygon,
  polygonPath,
  polylinePath,
  replacedWorldPolygons,
  routeSegments,
  showsCityNames,
  showsRoutes,
  spanForBounds,
  viewBounds,
  viewBoxOf,
} from "./atlas-projection";

/**
 * **`tsc` が通ることは、地図が映る証拠にならない。**
 * ここで見るのは主に「数でない値を外に出さないこと」。0除算と空配列から出る
 * NaN は、画面には**何も描かれないという形でしか現れない**ので、
 * 目で見ても気づけない(`use-camera.ts` が一度これでやられている)。
 */

describe("数でない値を外に出さない", () => {
  const rubbish = [NaN, Infinity, -Infinity];

  it("枠が測れていない(幅も高さも0)ときでも viewBox は数だけ", () => {
    const box = viewBoxOf(WORLD_VIEW, 0);
    expect(box).not.toMatch(/NaN|Infinity/);
    expect(box.split(" ").every((n) => Number.isFinite(Number(n)))).toBe(true);
  });

  it.each(rubbish)("中心が %s でも viewBox は数だけ", (bad) => {
    const box = viewBoxOf({ lon: bad, lat: bad, span: bad }, bad);
    expect(box).not.toMatch(/NaN|Infinity/);
  });

  it("寄り引きの幅は必ず MIN_SPAN 〜 MAX_SPAN に収まる", () => {
    expect(clampSpan(NaN)).toBe(MAX_SPAN);
    expect(clampSpan(0)).toBe(MIN_SPAN);
    expect(clampSpan(-5)).toBe(MIN_SPAN);
    expect(clampSpan(99999)).toBe(MAX_SPAN);
  });

  it("空の多角形からは空の d が出る(`<path d=\"\">` は何も描かない)", () => {
    expect(polygonPath([])).toBe("");
    expect(polygonPath([[0, 0]])).toBe("");
    expect(polygonPath([[NaN, NaN], [1, 1], [2, 2]])).toBe("");
  });

  it("四隅が数でない盤面は、長方形を1枚も返さない", () => {
    expect(boundsRects({ lon0: NaN, lon1: 10, lat0: 5, lat1: 0 })).toEqual([]);
    expect(boundsCentre({ lon0: NaN, lon1: 10, lat0: 5, lat1: 0 })).toEqual({ lon: 0, lat: 0 });
    expect(spanForBounds({ lon0: NaN, lon1: 10, lat0: 5, lat1: 0 }, 1.5)).toBe(MAX_SPAN);
  });

  it("枠の幅が0でも、1点あたりの度数は有限", () => {
    expect(Number.isFinite(degreesPerPixel(WORLD_VIEW, 0))).toBe(true);
    expect(Number.isFinite(degreesPerPixel(WORLD_VIEW, NaN))).toBe(true);
  });
});

describe("眺めを地図の中に収める", () => {
  it("引ききったら経度は0、緯度は中身の真ん中(端に貼りつかない)", () => {
    expect(clampView({ lon: 170, lat: 80, span: MAX_SPAN }, 1.6)).toEqual({
      lon: 0,
      lat: LAT_MID,
      span: MAX_SPAN,
    });
  });

  it("寄っているときは、見えている範囲が地図からはみ出さない", () => {
    const view = clampView({ lon: 179, lat: 0, span: 20 }, 1.6);
    const bounds = viewBounds(view, 1.6);
    expect(bounds.lon1).toBeLessThanOrEqual(180.001);
  });

  it("引ききった眺めの高さは、必ず幅より小さくならない比で出る", () => {
    const bounds = viewBounds(clampView(WORLD_VIEW, 1.6), 1.6);
    expect(bounds.lon1 - bounds.lon0).toBeCloseTo(360, 5);
  });
});

describe("日付変更線をまたぐ盤面", () => {
  // `oceania` は経度 132〜233。素朴に描くと右へ100度ぶん飛び出す。
  it("2枚に割れて、どちらも -180〜180 に収まる", () => {
    const rects = boundsRects({ lon0: 132, lon1: 233, lat0: -8, lat1: -48 });
    expect(rects).toHaveLength(2);
    for (const r of rects) {
      expect(r.x).toBeGreaterThanOrEqual(-180);
      expect(r.x + r.w).toBeLessThanOrEqual(180.001);
    }
    // 幅の合計は元の101度ぶん。
    expect(rects[0].w + rects[1].w).toBeCloseTo(101, 5);
  });

  it("360度より広い盤面(世界一周)は、世界ぜんぶ1枚になる", () => {
    expect(boundsRects({ lon0: -188, lon1: 216, lat0: 75, lat1: -56 })).toEqual([
      { x: -180, y: -75, w: 360, h: 131 },
    ]);
  });

  it("経度は -180〜180 へ畳まれる", () => {
    expect(normalizeLon(200)).toBeCloseTo(-160, 5);
    expect(normalizeLon(-200)).toBeCloseTo(160, 5);
    expect(normalizeLon(NaN)).toBe(0);
  });

  // 下敷きの世界地図は経度 -188〜216 で描かれていて、変更線の向こうがはみ出している。
  it("変更線の向こうにはみ出した陸は、正しい側へ360度ずれる", () => {
    const shifted = normalizePolygon([
      [186, 68],
      [200, 68],
      [200, 60],
    ]);
    expect(shifted.map(([lon]) => lon)).toEqual([-174, -160, -160]);
  });
});

describe("引き具合の段", () => {
  it("見えている経度で段が決まる", () => {
    expect(bandOf(360)).toBe("world");
    expect(bandOf(101)).toBe("world");
    expect(bandOf(100)).toBe("region");
    expect(bandOf(25)).toBe("region");
    expect(bandOf(24)).toBe("country");
    expect(bandOf(15)).toBe("country");
    expect(bandOf(14)).toBe("town");
    expect(bandOf(0.3)).toBe("town");
  });

  it("段が決まらない値でも world に落ちる(空の地図を出さない)", () => {
    expect(bandOf(NaN)).toBe("world");
  });

  it("町の名前は9度から", () => {
    expect(showsCityNames(9)).toBe(true);
    expect(showsCityNames(9.1)).toBe(false);
  });
});

describe("盤面の名前を出すかどうか", () => {
  const japan = { lon0: 128, lon1: 146, lat0: 46, lat1: 30 };
  const ibaraki = { lon0: 140, lon1: 141, lat0: 37, lat1: 35.7 };

  it("世界の眺めでは、日本のような盤面は小さすぎて名前を出さない", () => {
    expect(labelFits(japan, { lon: 0, lat: 10, span: 360 }, 1.6)).toBe(false);
  });

  it("地域まで寄れば日本の名前は出るが、茨城県はまだ出ない", () => {
    const view = { lon: 138, lat: 38, span: 40 };
    expect(labelFits(japan, view, 1.6)).toBe(true);
    expect(labelFits(ibaraki, view, 1.6)).toBe(false);
  });

  // 町まで寄ったら、画面に収まりきらない盤面の名前は「何も無い野原の真ん中」に浮く。
  it("町まで寄ったら、画面に収まる盤面だけ名前を出す", () => {
    const view = { lon: 140.5, lat: 36.3, span: 3 };
    expect(labelFits(japan, view, 1.6)).toBe(false);
    expect(labelFits(ibaraki, view, 1.6)).toBe(true);
  });
});

/**
 * **寄りの限界。**「見えている経度 0.82度で中身が0要素」という実測から、
 * 中身の細かさで止めるようにした。数はこの表(`minSpanForBoard` の但し書き)。
 */
describe("どこまで寄れるか", () => {
  const japan = { bounds: { lon0: 127, lon1: 146.5, lat0: 45.8, lat1: 25.6 }, cityCount: 74 };
  const ibaraki = { bounds: { lon0: 139.55, lon1: 140.9, lat0: 36.95, lat1: 35.7 }, cityCount: 36 };
  const kyushu = { bounds: { lon0: 128.7, lon1: 132, lat0: 34.2, lat1: 30.4 }, cityCount: 40 };
  const usa = { bounds: { lon0: -125, lon1: -67, lat0: 49, lat1: 25 }, cityCount: 48 };

  it("町がまばらな盤面ほど手前で止まる(日本は上限の2.5度)", () => {
    expect(minSpanForBoard(japan)).toBe(2.5);
    expect(minSpanForBoard(usa)).toBe(2.5);
  });

  it("町が詰まっている盤面では、その間隔に合わせて深くまで寄れる", () => {
    expect(minSpanForBoard(ibaraki)).toBeCloseTo(0.3, 1);
    expect(minSpanForBoard(kyushu)).toBeCloseTo(0.78, 1);
    // 広さだけで決めていたころ、九州は0.28度まで寄れて何も無い畑で止まった。
    expect(minSpanForBoard(kyushu)).toBeGreaterThan(3.3 / 12);
  });

  it("盤面が無いところ(大洋・まだ盤面の無い陸)は3度で止める", () => {
    expect(minSpanForBoard(null)).toBe(3);
    expect(minSpanForBoard({ ...japan, cityCount: 0 })).toBe(3);
  });

  it.each([NaN, Infinity])("四隅が %s でも、数でない限界を返さない", (bad) => {
    const value = minSpanForBoard({
      bounds: { lon0: bad, lon1: bad, lat0: bad, lat1: bad },
      cityCount: 10,
    });
    expect(Number.isFinite(value)).toBe(true);
  });
});

/**
 * 寄ったときに敷き替える下敷き。**盤面の四隅の中を丸ごと塗り替えてはいけない**
 * ——日本の四隅には朝鮮半島と中国沿岸が入っている。
 */
describe("盤面が描き直す、粗い多角形", () => {
  const japan = { lon0: 128, lon1: 146, lat0: 46, lat1: 30 };
  const inside: readonly (readonly [number, number])[] = [
    [131, 44],
    [144, 44],
    [144, 31],
  ];
  const continent: readonly (readonly [number, number])[] = [
    [100, 60],
    [150, 60],
    [150, 20],
  ];

  it("枠に丸ごと収まるかたまりだけを置き換える", () => {
    const replaced = replacedWorldPolygons([inside, continent], japan);
    expect([...replaced]).toEqual([0]);
  });

  it("大陸と地続きの盤面(枠にまたがるかたまりだけ)では1枚も置き換えない", () => {
    const france = { lon0: -5.2, lon1: 9.6, lat0: 51.2, lat1: 41.3 };
    expect([...replacedWorldPolygons([continent], france)]).toEqual([]);
  });

  it("点が足りない多角形は数に入れない", () => {
    expect([...replacedWorldPolygons([[[140, 40]]], japan)]).toEqual([]);
  });
});

describe("川の線", () => {
  it("閉じない(閉じると河口と源流が結ばれて輪になる)", () => {
    const d = polylinePath([
      [139, 36.9],
      [139.5, 36.1],
      [139.8, 35.8],
    ]);
    expect(d.startsWith("M")).toBe(true);
    expect(d.endsWith("Z")).toBe(false);
    expect(d).not.toMatch(/NaN/);
  });

  it("点が1つしかない川は描かない", () => {
    expect(polylinePath([[139, 36.9]])).toBe("");
    expect(polylinePath([])).toBe("");
  });
});

/**
 * **町と町を結ぶ線。地図を横断させないことがいちばんの決めごと。**
 *
 * 変更線をまたぐ線は全47盤面で4本しかないが、その4本が出るのは
 * オセアニア・世界一周という**いちばん見せたい盤面**である。
 */
describe("線路と航路の線分", () => {
  it("ふつうの線は1本のまま。両端はその町の座標", () => {
    const [only, ...rest] = routeSegments(139.7, 35.7, 135.8, 35);
    expect(rest).toEqual([]);
    // 経度は畳んで通す(360で割った余りを取るので、ごく小さい誤差が乗る)。
    // 町の印も同じ `normalizeLon` を通っているので、端と印はぴったり重なる。
    expect(only.x1).toBeCloseTo(139.7, 10);
    expect(only.x2).toBeCloseTo(135.8, 10);
    expect(only.y1).toBe(-35.7);
    expect(only.y2).toBe(-35);
  });

  /**
   * オセアニアのフナフティ(179.2)—アピア(188.2)。畳んで素朴に結ぶと
   * 179.2 → -171.8 の、**地図を丸ごと横断する線**になる。
   */
  it("変更線をまたぐ線は、端で2本に切れる", () => {
    const segments = routeSegments(179.1962, -8.5211, 188.2333, -13.8333);
    expect(segments).toHaveLength(2);
    // 東の端まで引いて切り、西の端から引き直す。
    expect(segments[0].x2).toBe(180);
    expect(segments[1].x1).toBe(-180);
    // 切れ目の高さは揃っている(揃っていないと段違いに折れて見える)。
    expect(segments[0].y2).toBeCloseTo(segments[1].y1, 10);
    // 相手の町は畳んだ位置(-171.8)に来る——町の印もそこに立つ。
    expect(segments[1].x2).toBeCloseTo(-171.7667, 3);
  });

  it("西向きにまたぐ線も、同じように端で切れる", () => {
    const segments = routeSegments(-178, 10, 176, 12);
    expect(segments).toHaveLength(2);
    expect(segments[0].x2).toBe(-180);
    expect(segments[1].x1).toBe(180);
  });

  /** **これが直したかったこと。**どの線分も、地図の幅の半分より長くならない。 */
  it("どの線分も地図を横断しない", () => {
    const crossing: [number, number, number, number][] = [
      [179.1962, -8.5211, 188.2333, -13.8333],
      [188.7583, -9.3806, 179.1962, -8.5211],
      [178.44, -18.14, -149.57, -17.54],
      [160.15, 7.95, 187.46, 5.97],
    ];
    for (const [lonA, latA, lonB, latB] of crossing) {
      for (const segment of routeSegments(lonA, latA, lonB, latB)) {
        expect(Math.abs(segment.x2 - segment.x1)).toBeLessThan(180);
        expect(Math.abs(segment.x1)).toBeLessThanOrEqual(180);
        expect(Math.abs(segment.x2)).toBeLessThanOrEqual(180);
      }
    }
  });

  it("素直に長い線(パース—ケープタウンの97度)は切らない", () => {
    expect(routeSegments(115.86, -31.95, 18.42, -33.92)).toHaveLength(1);
  });

  it("座標が数でなければ、線を1本も返さない", () => {
    expect(routeSegments(NaN, 35, 139, 36)).toEqual([]);
    expect(routeSegments(139, 35, 139, Infinity)).toEqual([]);
  });
});

describe("線を出す引き具合", () => {
  it("町の印と同じ段(〜14度)から出す", () => {
    expect(showsRoutes(9)).toBe(true);
    expect(showsRoutes(14)).toBe(true);
    expect(showsRoutes(14.1)).toBe(false);
    expect(showsRoutes(24)).toBe(false);
    expect(showsRoutes(MAX_SPAN)).toBe(false);
  });

  it("町の印が出る段と、線が出る段はぴったり同じ", () => {
    for (const span of [0.5, 3, 9, 13.9, 14, 14.1, 20, 40, 200, 360]) {
      expect(showsRoutes(span)).toBe(bandOf(span) === "town");
    }
  });
});
