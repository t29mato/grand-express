import { describe, expect, it } from "vitest";
import { CityId, PlayerId, NodeId, PropertyIndex, PropertyRef, RegionId } from "../shared-kernel/ids";
import { Money } from "../shared-kernel/money";
import { City } from "../board/city";
import { sameForAllLocales } from "../shared-kernel/localized-text";
import { createPlayer, acquireProperty, upgradeProperty } from "../player/player";
import {
  PropertyEconomyContext,
  incomeAtLevel,
  investedAmount,
  monopolyCount,
  netWorth,
  sellValueOf,
  totalIncome,
  upgradeCost,
} from "./property-income-service";

// docs/90-migration/00-characterization-samples.md の数値をそのまま使う。
describe("upgradeCost/incomeAtLevel/investedAmount/sellValueOf (cost=300, inc=40)", () => {
  it.each([
    [1, 210],
    [2, 420],
    [3, 630],
    [4, 840],
  ])("upgradeCost(300, %i) === %i", (level, expected) => {
    expect(upgradeCost(300, level)).toBe(expected);
  });

  it.each([
    [1, 40],
    [2, 62],
    [3, 84],
    [4, 106],
    [5, 128],
  ])("incomeAtLevel(40, %i) === %i", (level, expected) => {
    expect(incomeAtLevel(40, level)).toBe(expected);
  });

  it.each([
    [1, 300],
    [2, 510],
    [3, 930],
    [4, 1560],
    [5, 2400],
  ])("investedAmount(300, %i) === %i", (level, expected) => {
    expect(investedAmount(300, level)).toBe(expected);
  });

  it.each([
    [1, 200],
    [2, 330],
    [3, 600],
    [4, 1010],
    [5, 1560],
  ])("sellValueOf(300, %i) === %i", (level, expected) => {
    expect(sellValueOf(300, level)).toBe(expected);
  });
});

function city(id: string, regionId: string, props: Array<[number, number]>): City {
  return {
    id: CityId(id),
    name: sameForAllLocales(id),
    regionId: RegionId(regionId),
    longitude: 0,
    latitude: 0,
    tag: sameForAllLocales(""),
    fact: sameForAllLocales(""),
    properties: props.map(([cost, income]) => ({ name: sameForAllLocales("p"), cost, income })),
  };
}

function contextWithCities(cities: City[], regionModifiers: Record<string, number> = {}): PropertyEconomyContext {
  const byId = new Map(cities.map((c) => [c.id, c]));
  return {
    getCity: (id) => {
      const c = byId.get(id);
      if (!c) throw new Error(`unknown city ${id}`);
      return c;
    },
    regionIncomeModifier: (region) => regionModifiers[region] ?? 1,
  };
}

describe("totalIncome / monopolyCount / netWorth", () => {
  it("都市の一部だけ所有している場合は独占ボーナスなし", () => {
    const cityA = city("a", "region-a", [
      [300, 40],
      [300, 40],
      [300, 30],
    ]);
    let player = createPlayer({ id: PlayerId("p"), name: "p", isCpu: false, startingCash: Money.of(1000), startingNode: NodeId("a") });
    player = acquireProperty(player, PropertyRef.of(CityId("a"), PropertyIndex(0)), Money.of(300));
    player = upgradeProperty(player, PropertyRef.of(CityId("a"), PropertyIndex(0)), Money.of(210), 2);
    player = acquireProperty(player, PropertyRef.of(CityId("a"), PropertyIndex(1)), Money.of(300));

    const context = contextWithCities([cityA]);
    // incomeAtLevel(40,2)=62, incomeAtLevel(40,1)=40 -> 合計102、独占なしなので2倍されない
    expect(totalIncome(player, context).amount).toBe(102);
    expect(monopolyCount(player, context)).toBe(0);
  });

  it("都市の全物件を所有すると収入が2倍になる(独占ボーナス)", () => {
    const cityA = city("a", "region-a", [
      [300, 40],
      [300, 40],
      [300, 30],
    ]);
    let player = createPlayer({ id: PlayerId("p"), name: "p", isCpu: false, startingCash: Money.of(1000), startingNode: NodeId("a") });
    player = acquireProperty(player, PropertyRef.of(CityId("a"), PropertyIndex(0)), Money.of(300));
    player = upgradeProperty(player, PropertyRef.of(CityId("a"), PropertyIndex(0)), Money.of(210), 2);
    player = acquireProperty(player, PropertyRef.of(CityId("a"), PropertyIndex(1)), Money.of(300));
    player = acquireProperty(player, PropertyRef.of(CityId("a"), PropertyIndex(2)), Money.of(300));

    const context = contextWithCities([cityA]);
    // (62+40+30)*2 = 264
    expect(totalIncome(player, context).amount).toBe(264);
    expect(monopolyCount(player, context)).toBe(1);
  });

  it("季節による地方収入補正が反映される", () => {
    const cityA = city("a", "region-a", [
      [300, 40],
      [300, 40],
      [300, 30],
    ]);
    let player = createPlayer({ id: PlayerId("p"), name: "p", isCpu: false, startingCash: Money.of(1000), startingNode: NodeId("a") });
    player = acquireProperty(player, PropertyRef.of(CityId("a"), PropertyIndex(0)), Money.of(300));
    player = acquireProperty(player, PropertyRef.of(CityId("a"), PropertyIndex(1)), Money.of(300));
    player = acquireProperty(player, PropertyRef.of(CityId("a"), PropertyIndex(2)), Money.of(300));

    const context = contextWithCities([cityA], { "region-a": 1.2 });
    // (40+40+30)*2*1.2 = 264
    expect(totalIncome(player, context).amount).toBe(264);
  });

  it("総資産は現金+投資評価額の合計", () => {
    const cityA = city("a", "region-a", [[300, 40]]);
    let player = createPlayer({ id: PlayerId("p"), name: "p", isCpu: false, startingCash: Money.of(1000), startingNode: NodeId("a") });
    player = acquireProperty(player, PropertyRef.of(CityId("a"), PropertyIndex(0)), Money.of(300));
    player = upgradeProperty(player, PropertyRef.of(CityId("a"), PropertyIndex(0)), Money.of(210), 2);
    player = upgradeProperty(player, PropertyRef.of(CityId("a"), PropertyIndex(0)), Money.of(420), 3);

    const context = contextWithCities([cityA]);
    // cash=1000-300-210-420=70, investedAmount(300,3)=930 -> 70+930=1000
    expect(netWorth(player, context).amount).toBe(1000);
  });
});
