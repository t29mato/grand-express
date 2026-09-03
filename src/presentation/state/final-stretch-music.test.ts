import { describe, expect, it } from "vitest";
import { FINAL_STRETCH_MONTHS } from "../../domain/game-session/final-stretch";
import { ENDING_THRESHOLD_MONTHS } from "../components/hud/calendar-strip";

/**
 * **暦の色と音楽は、同じ月数で変わらなければならない。**
 *
 * 帯が赤くなったのに曲がそのまま(あるいはその逆)だと、遊ぶ人には
 * 「何かがおかしい」としか映らない。定数は2つの層に分かれて置いてあるので
 * (暦は presentation、終盤の判定は domain)、ここで突き合わせる。
 */
describe("終盤の合図", () => {
  it("暦の帯の色が変わる月数と、音楽が変わる月数が同じ", () => {
    expect(FINAL_STRETCH_MONTHS).toBe(ENDING_THRESHOLD_MONTHS);
  });
});
