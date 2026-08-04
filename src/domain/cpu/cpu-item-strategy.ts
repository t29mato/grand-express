import { Random } from "../shared-kernel/random";
import { ItemDefinition } from "../item/item";
import { CpuTuning } from "./cpu-level";

/**
 * CPUがサイコロを振る前にアイテムを自動使用するかどうかの判定
 * (現行コードの `cpuItems`)。サイコロの目を選ぶ/複数個振るアイテム
 * (choose-exact-dice/roll-fixed-dice)は対象外(移動判断は別ロジックのため)。
 */
export function decidePreRollItemUse<T extends { readonly key: string; readonly item: ItemDefinition }>(
  items: readonly T[],
  tuning: CpuTuning,
  random: Random,
): T | null {
  if (items.length === 0 || random.nextFloat() > tuning.itemUseChance) return null;

  const usable = items.filter(
    (entry) =>
      entry.item.kind === "pre" &&
      entry.item.effect.type !== "choose-exact-dice" &&
      entry.item.effect.type !== "roll-fixed-dice",
  );
  if (usable.length === 0) return null;

  return usable[random.nextInt(usable.length)];
}
