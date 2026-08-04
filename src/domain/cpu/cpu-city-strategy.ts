import { ItemKey, PropertyIndex } from "../shared-kernel/ids";
import { Random } from "../shared-kernel/random";
import { City } from "../board/city";
import { upgradeCost } from "../property/property-income-service";
import { MAX_INVENTORY_SIZE, MAX_PROPERTY_LEVEL, PropertyLevel } from "../player/player";
import { CpuTuning } from "./cpu-level";

export interface CpuCityVisitInput {
  readonly city: City;
  readonly cash: number;
  readonly inventorySize: number;
  readonly ownedLevels: ReadonlyMap<PropertyIndex, PropertyLevel>;
  readonly isOwnedByOther: (index: PropertyIndex) => boolean;
  readonly shopStock: readonly { readonly key: ItemKey; readonly price: number }[];
}

export interface CpuCityVisitPlan {
  readonly purchases: readonly PropertyIndex[];
  readonly upgrades: readonly { readonly index: PropertyIndex; readonly toLevel: PropertyLevel }[];
  readonly itemPurchase: ItemKey | null;
}

/**
 * CPUが町に停まった際の購入・増資・買い物の意思決定(現行コードの `cityStop` 内、
 * `p.cpu` 分岐を移植)。現金の推移を追いながら判定するため、決定した順に
 * 適用されることを前提とする。
 */
export function planCityVisit(
  input: CpuCityVisitInput,
  tuning: CpuTuning,
  random: Random,
): CpuCityVisitPlan {
  let cash = input.cash;
  const purchases: PropertyIndex[] = [];
  const upgrades: { index: PropertyIndex; toLevel: PropertyLevel }[] = [];
  const ownedLevels = new Map(input.ownedLevels);

  input.city.properties.forEach((property, i) => {
    const index = PropertyIndex(i);
    if (!input.isOwnedByOther(index) && !ownedLevels.has(index) && cash - property.cost > tuning.keepCash) {
      cash -= property.cost;
      ownedLevels.set(index, 1);
      purchases.push(index);
    }
  });

  input.city.properties.forEach((property, i) => {
    const index = PropertyIndex(i);
    const level = ownedLevels.get(index);
    if (level && level < MAX_PROPERTY_LEVEL && random.nextFloat() < tuning.investAggressiveness) {
      const cost = upgradeCost(property.cost, level);
      if (cash - cost > tuning.keepCash) {
        cash -= cost;
        const toLevel = (level + 1) as PropertyLevel;
        ownedLevels.set(index, toLevel);
        upgrades.push({ index, toLevel });
      }
    }
  });

  let itemPurchase: ItemKey | null = null;
  const firstStock = input.shopStock[0];
  if (
    firstStock &&
    input.inventorySize < MAX_INVENTORY_SIZE &&
    cash - firstStock.price > tuning.keepCash + 400 &&
    random.nextFloat() < tuning.itemUseChance * 0.8
  ) {
    itemPurchase = firstStock.key;
  }

  return { purchases, upgrades, itemPurchase };
}
