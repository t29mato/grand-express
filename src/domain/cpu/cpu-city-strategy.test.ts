import { describe, expect, it } from "vitest";
import { CityId, ItemKey, PropertyIndex, RegionId } from "../shared-kernel/ids";
import { sameForAllLocales } from "../shared-kernel/localized-text";
import { Random } from "../shared-kernel/random";
import { City } from "../board/city";
import { CPU_TUNING } from "./cpu-level";
import { planCityVisit } from "./cpu-city-strategy";

class SeqRandom implements Random {
  private i = 0;
  constructor(private readonly floats: number[]) {}
  nextFloat(): number {
    const v = this.floats[this.i % this.floats.length];
    this.i++;
    return v;
  }
  nextInt(n: number): number {
    return Math.floor(this.nextFloat() * n);
  }
}

function city(): City {
  return {
    id: CityId("a"),
    name: sameForAllLocales("a"),
    regionId: RegionId("r"),
    longitude: 0,
    latitude: 0,
    tag: sameForAllLocales(""),
    fact: sameForAllLocales(""),
    artSceneKey: "scene",
    artGlyphKey: "glyph",
    labelPosition: "bottom" as const,
    properties: [
      { name: sameForAllLocales("p0"), cost: 300, income: 40 },
      { name: sameForAllLocales("p1"), cost: 300, income: 40 },
    ],
  };
}

describe("planCityVisit", () => {
  it("keepCashを上回る現金があれば未所有の物件を購入する(normal難易度)", () => {
    const plan = planCityVisit(
      {
        city: city(),
        cash: 2000,
        inventorySize: 0,
        ownedLevels: new Map(),
        isOwnedByOther: () => false,
        shopStock: [],
      },
      CPU_TUNING.normal,
      new SeqRandom([0.99]), // investAggressiveness(0.35)より大きいので増資はしない
    );
    expect(plan.purchases).toEqual([PropertyIndex(0), PropertyIndex(1)]);
  });

  it("他プレイヤーが所有している物件は買わない", () => {
    const plan = planCityVisit(
      {
        city: city(),
        cash: 2000,
        inventorySize: 0,
        ownedLevels: new Map(),
        isOwnedByOther: (i) => i === 0,
        shopStock: [],
      },
      CPU_TUNING.normal,
      new SeqRandom([0.99]),
    );
    expect(plan.purchases).toEqual([PropertyIndex(1)]);
  });

  it("keepCashを割り込む場合は購入しない", () => {
    const plan = planCityVisit(
      {
        city: city(),
        cash: 300, // 300-300=0 <= keepCash(280) なので買えない
        inventorySize: 0,
        ownedLevels: new Map(),
        isOwnedByOther: () => false,
        shopStock: [],
      },
      CPU_TUNING.normal,
      new SeqRandom([0.99]),
    );
    expect(plan.purchases).toEqual([]);
  });

  it("所持アイテムが上限未満で資金に余裕があれば屋台のアイテムを買うことがある", () => {
    const plan = planCityVisit(
      {
        city: city(),
        cash: 5000,
        inventorySize: 0,
        ownedLevels: new Map(),
        isOwnedByOther: () => true, // 物件購入は発生させない
        shopStock: [{ key: ItemKey("ekeko"), price: 400 }],
      },
      CPU_TUNING.merciless, // itemUseChance=0.8 -> 判定値0.8*0.8=0.64
      new SeqRandom([0.5]), // 0.5 < 0.64
    );
    expect(plan.itemPurchase).toBe("ekeko");
  });
});
