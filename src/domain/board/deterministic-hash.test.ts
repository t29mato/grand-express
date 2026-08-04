import { describe, expect, it } from "vitest";
import { h32 } from "./deterministic-hash";

describe("h32", () => {
  it("同じ入力に対して常に同じ値を返す(決定的)", () => {
    expect(h32(12345)).toBe(h32(12345));
    expect(h32(0)).toBe(h32(0));
  });

  it("異なる入力に対しては(基本的に)異なる値を返す", () => {
    expect(h32(1)).not.toBe(h32(2));
  });

  it("常に非負の32bit整数を返す", () => {
    for (const seed of [0, 1, -1, 999999, -999999]) {
      const value = h32(seed);
      expect(Number.isInteger(value)).toBe(true);
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(2 ** 32);
    }
  });
});
