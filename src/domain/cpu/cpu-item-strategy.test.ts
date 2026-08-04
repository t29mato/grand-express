import { describe, expect, it } from "vitest";
import { Random } from "../shared-kernel/random";
import { ItemDefinition } from "../item/item";
import { CPU_TUNING } from "./cpu-level";
import { decidePreRollItemUse } from "./cpu-item-strategy";

class FixedRandom implements Random {
  constructor(private readonly floatValue: number, private readonly intValue = 0) {}
  nextFloat(): number {
    return this.floatValue;
  }
  nextInt(): number {
    return this.intValue;
  }
}

function entry(key: string, item: Partial<ItemDefinition>) {
  return {
    key,
    item: { key, kind: "pre", price: 100, effect: { type: "gain-cash", amount: 380 }, ...item } as ItemDefinition,
  };
}

describe("decidePreRollItemUse", () => {
  it("アイテムが無ければ何も使わない", () => {
    expect(decidePreRollItemUse([], CPU_TUNING.normal, new FixedRandom(0))).toBeNull();
  });

  it("確率判定に外れた場合は何も使わない", () => {
    const items = [entry("singani", {})];
    expect(decidePreRollItemUse(items, CPU_TUNING.normal, new FixedRandom(0.99))).toBeNull();
  });

  it("サイコロを選ぶ/複数個振るアイテムは自動使用の対象外", () => {
    const items = [entry("pass", { effect: { type: "choose-exact-dice" } })];
    expect(decidePreRollItemUse(items, CPU_TUNING.normal, new FixedRandom(0))).toBeNull();
  });

  it("passiveなアイテムは対象外", () => {
    const items = [entry("coca", { kind: "passive", effect: { type: "none" } })];
    expect(decidePreRollItemUse(items, CPU_TUNING.normal, new FixedRandom(0))).toBeNull();
  });

  it("条件を満たせば使用可能なアイテムの中から1つ選ぶ", () => {
    const items = [entry("singani", {}), entry("zebra", { effect: { type: "extra-turn" } })];
    const picked = decidePreRollItemUse(items, CPU_TUNING.normal, new FixedRandom(0, 1));
    expect(picked?.key).toBe("zebra");
  });
});
