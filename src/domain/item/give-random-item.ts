import { ItemKey } from "../shared-kernel/ids";
import { Random } from "../shared-kernel/random";
import { Player, addItem, canAddItem } from "../player/player";

/**
 * ランダムなアイテムを1つ渡す(現行コードの `giveItem`)。所持数が上限なら
 * 何も起きない(`null`を返す)。
 */
export function giveRandomItem(
  player: Player,
  allItemKeys: readonly ItemKey[],
  random: Random,
): { player: Player; itemKey: ItemKey | null } {
  if (!canAddItem(player) || allItemKeys.length === 0) {
    return { player, itemKey: null };
  }
  const itemKey = allItemKeys[random.nextInt(allItemKeys.length)];
  return { player: addItem(player, itemKey), itemKey };
}
