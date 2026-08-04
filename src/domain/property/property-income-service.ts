import { Money } from "../shared-kernel/money";
import { CityId, PropertyRef, RegionId } from "../shared-kernel/ids";
import { City } from "../board/city";
import { Player, PropertyLevel } from "../player/player";

/**
 * 物件の経済計算を担うドメインサービス。
 * 現行コードの `upCost`, `incAt`, `investedIn`, `sellValue`, `playerIncome`,
 * `monopolyCount`, `netWorth` をそのまま移植する
 * (数値は docs/90-migration/00-characterization-samples.md で仕様化済み)。
 */
export interface PropertyEconomyContext {
  getCity(cityId: CityId): City;
  /** その地方の季節による収入補正(デフォルト1)。 */
  regionIncomeModifier(regionId: RegionId): number;
}

/** レベル `level` から `level+1` への投資コスト。 */
export function upgradeCost(propertyCost: number, level: number): number {
  return Math.round((propertyCost * 0.7 * level) / 10) * 10;
}

/** レベル `level` における収入。 */
export function incomeAtLevel(propertyIncome: number, level: number): number {
  return Math.round(propertyIncome * (1 + 0.55 * (level - 1)));
}

/** レベル1から`level`まで積み上げた投資総額(購入コスト込み)。 */
export function investedAmount(propertyCost: number, level: number): number {
  let total = propertyCost;
  for (let l = 1; l < level; l++) total += upgradeCost(propertyCost, l);
  return total;
}

/** 売却額(投資総額の65%を10単位に丸め)。 */
export function sellValueOf(propertyCost: number, level: number): number {
  return Math.round((investedAmount(propertyCost, level) * 0.65) / 10) * 10;
}

function propertyDefinition(context: PropertyEconomyContext, ref: PropertyRef) {
  const { cityId, index } = PropertyRef.parse(ref);
  const city = context.getCity(cityId);
  const property = city.properties[index];
  if (!property) {
    throw new Error(`Unknown property: ${ref}`);
  }
  return { city, property };
}

/**
 * プレイヤーの四半期収入。都市ごとに集計し、その都市の全物件を保有していれば
 * 2倍(独占ボーナス)、さらに地方の季節補正を掛ける。
 */
export function totalIncome(player: Player, context: PropertyEconomyContext): Money {
  const incomeByCity = new Map<CityId, number[]>();
  for (const [ref, level] of player.portfolio) {
    const { city, property } = propertyDefinition(context, ref);
    const list = incomeByCity.get(city.id) ?? [];
    list.push(incomeAtLevel(property.income, level));
    incomeByCity.set(city.id, list);
  }

  let total = 0;
  for (const [cityId, incomes] of incomeByCity) {
    const city = context.getCity(cityId);
    let cityTotal = incomes.reduce((sum, v) => sum + v, 0);
    if (incomes.length === city.properties.length) {
      cityTotal *= 2;
    }
    total += cityTotal * context.regionIncomeModifier(city.regionId);
  }
  return Money.of(Math.round(total));
}

/** プレイヤーが独占している都市の数。 */
export function monopolyCount(player: Player, context: PropertyEconomyContext): number {
  const ownedByCity = new Map<CityId, number>();
  for (const ref of player.portfolio.keys()) {
    const { cityId } = PropertyRef.parse(ref);
    ownedByCity.set(cityId, (ownedByCity.get(cityId) ?? 0) + 1);
  }
  let count = 0;
  for (const [cityId, owned] of ownedByCity) {
    if (owned === context.getCity(cityId).properties.length) count++;
  }
  return count;
}

/** 総資産(現金+所有物件の投資評価額)。 */
export function netWorth(player: Player, context: PropertyEconomyContext): Money {
  let propertiesValue = 0;
  for (const [ref, level] of player.portfolio) {
    const { property } = propertyDefinition(context, ref);
    propertiesValue += investedAmount(property.cost, level);
  }
  return player.cash.add(Money.of(propertiesValue));
}

export function propertyCount(player: Player): number {
  return player.portfolio.size;
}

export function nextLevel(level: PropertyLevel): PropertyLevel | null {
  return level >= 5 ? null : ((level + 1) as PropertyLevel);
}
