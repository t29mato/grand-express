import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { SIZES } from "./board-metrics";

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
