import { describe, expect, it } from "vitest";
import { ItemKey } from "../shared-kernel/ids";
import { shopStock } from "./shop-stock-service";

const keys = ["a", "b", "c", "d", "e", "f"].map((k) => ItemKey(k));

describe("shopStock", () => {
  it("同じ都市・同じ月なら常に同じ品揃えになる(決定的)", () => {
    expect(shopStock("lapaz", 3, keys)).toEqual(shopStock("lapaz", 3, keys));
  });

  it("月が変わると品揃えが変わりうる", () => {
    const a = shopStock("lapaz", 0, keys);
    const b = shopStock("lapaz", 1, keys);
    expect(a).not.toEqual(b);
  });

  it("重複は除去される(最大3件)", () => {
    const result = shopStock("lapaz", 0, keys);
    expect(new Set(result).size).toBe(result.length);
    expect(result.length).toBeLessThanOrEqual(3);
  });
});
