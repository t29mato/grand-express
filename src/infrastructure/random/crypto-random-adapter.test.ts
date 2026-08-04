import { describe, expect, it } from "vitest";
import { CryptoRandomAdapter } from "./crypto-random-adapter";

describe("CryptoRandomAdapter", () => {
  it("nextFloatは0以上1未満を返す", () => {
    const random = new CryptoRandomAdapter();
    for (let i = 0; i < 50; i++) {
      const v = random.nextFloat();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });

  it("nextIntは0以上n未満の整数を返す", () => {
    const random = new CryptoRandomAdapter();
    for (let i = 0; i < 50; i++) {
      const v = random.nextInt(6);
      expect(Number.isInteger(v)).toBe(true);
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(6);
    }
  });
});
