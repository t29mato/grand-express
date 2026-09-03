import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import {
  CITY_GLYPH_BASE_UNITS,
  CITY_GLYPH_MAX_SCALE,
  SIZES,
  cityFootprint,
  cityGlyphUnits,
} from "./board-metrics";

/**
 * ユーザーからの報告:「マスを微妙に外すと**何も起きない**」。
 *
 * 当たりが**2つに分かれていて、あいだが空洞**だった。
 *
 * - 中心の図形(中間マスは半辺 `squareHalf`、都市は半径 `cityRadius`。どちらも9)
 * - 行けるマスの光輪(`haloRadius` = 17)。ただし `.halo` は **`fill: none`** なので、
 *   **線の太さ5の輪の上しか当たらない**
 *
 * つまり**半径9〜14あたりが無反応**だった。範囲外を押したときの弾き返しは
 * その経路に入らないので、本当に何も起きない(音も揺れも出ない)。
 *
 * 透明な円で埋めてある。ここでは**その円が消えていないこと**と、
 * **光輪と同じ広さがあること**を見る(光っている範囲=押せる範囲)。
 *
 * 画面pxで測るE2Eも書いたが、**盤面の拡大率が位置で変わるため回ごとに落ちた**
 * (実測13〜16pxで揺れた)。気まぐれなテストは無いより悪いので、
 * ここでは寸法と、それが実際に描かれていることの2点だけを固定する。
 */
describe("マスの当たり", () => {
  it("押せる範囲は、光っている範囲と同じ広さがある", () => {
    expect(SIZES.hitRadius).toBeGreaterThanOrEqual(SIZES.haloRadius);
  });

  it("中心の図形より広い", () => {
    expect(SIZES.hitRadius).toBeGreaterThan(SIZES.squareHalf);
    expect(SIZES.hitRadius).toBeGreaterThan(SIZES.cityRadius);
  });

  it("光輪は fill:none なので、当たりを担えない(だから透明な円が要る)", () => {
    const css = readFileSync("src/app/globals.css", "utf8");
    const halo = css.slice(css.indexOf(".halo {"));
    expect(halo.slice(0, halo.indexOf("}"))).toContain("fill: none");
  });

  it("当たり用の透明な円が、盤面に描かれている", () => {
    const view = readFileSync("src/presentation/components/board/board-view.tsx", "utf8");
    expect(view, "当たり用の円が消えている。マスを少し外すと無反応に戻る").toContain(
      'r={SIZES.hitRadius} fill="transparent"',
    );
  });
});

/**
 * 都市の印(その土地を表す小さな絵)の大きさ。
 *
 * 「地図を見ても、その土地が何で知られているのか分からない」という指摘を受けて、
 * 寄っているあいだは画面上で一定の大きさに近づけるようにした。実測は
 * 追従の眺めで 茨城 30.6px / 日本 21.2px / 世界一周 14.6px(1600×1000)——
 * **都市が詰まった盤面ほど小さく**、絵柄がいちばん要る場面で読めなかった。
 *
 * ただし**引いたときには大きくしない。** 全体表示で試したら、印は
 * 9.8→14.7px にしかならず(都市どうしの間隔が13.9〜36.1pxしかないので
 * それ以上は上げられない)絵柄はやはり判別できないのに、
 * **全部読めていた都市名が30→25件に減った。**読めない絵のために
 * 読めていた名前を捨てることになる。だから引いたら元の大きさへ戻す。
 */
describe("都市の印の大きさ", () => {
  /** 全体表示に近い引き具合(視野幅が盤面幅とほぼ同じ)。 */
  const WHOLE = 1;
  /** 遊んでいるときの引き具合(`FOLLOW_WIDTH_RATIO` = 0.45)。 */
  const FOLLOW = 0.45;

  it("全体表示では元の大きさのまま(都市名の置き場所を奪わない)", () => {
    for (const unitsPerPx of [0.5, 1, 2.3, 3.2, 3.7]) {
      expect(cityGlyphUnits(unitsPerPx, WHOLE)).toBe(CITY_GLYPH_BASE_UNITS);
    }
  });

  it("寄っているあいだは大きくなるが、元の1.5倍を超えない", () => {
    // 世界一周の追従の実測値(unitsPerPx ≒ 1.64)。上限に当たる。
    expect(cityGlyphUnits(1.64, FOLLOW)).toBe(CITY_GLYPH_BASE_UNITS * CITY_GLYPH_MAX_SCALE);
    for (const unitsPerPx of [0.3, 0.75, 1.06, 1.64, 5]) {
      const units = cityGlyphUnits(unitsPerPx, FOLLOW);
      expect(units).toBeGreaterThanOrEqual(CITY_GLYPH_BASE_UNITS);
      expect(units).toBeLessThanOrEqual(CITY_GLYPH_BASE_UNITS * CITY_GLYPH_MAX_SCALE);
    }
  });

  // **型が通ることは動く証拠にならない。** 盤面の縮尺は枠の実寸が測れるまで
  // 決まらず、その数フレームは 0 や Infinity が流れてくる。素通しすると
  // y・font-size・stroke-width が NaN になり、盤面が海だけになる(実際に起きた)。
  it("縮尺がまだ決まっていなくても、NaN を作らない", () => {
    for (const bad of [0, -1, NaN, Infinity, -Infinity]) {
      expect(Number.isFinite(cityGlyphUnits(bad, FOLLOW))).toBe(true);
      expect(cityGlyphUnits(bad, FOLLOW)).toBeGreaterThan(0);
    }
    for (const bad of [NaN, Infinity, -Infinity]) {
      expect(Number.isFinite(cityGlyphUnits(1.06, bad))).toBe(true);
    }
    const box = cityFootprint(NaN);
    for (const v of Object.values(box)) expect(Number.isFinite(v)).toBe(true);
  });

  it("印の矩形は、印の実寸に合わせて広がる(名札が絵の上に乗らないように)", () => {
    const small = cityFootprint(CITY_GLYPH_BASE_UNITS);
    const large = cityFootprint(CITY_GLYPH_BASE_UNITS * 1.5);
    expect(large.top).toBeLessThan(small.top);
    expect(large.right).toBeGreaterThan(small.right);
  });
});
