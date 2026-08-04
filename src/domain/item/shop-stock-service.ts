import { ItemKey } from "../shared-kernel/ids";

/**
 * その町の屋台で今日売られているアイテム3種を決める(現行コードの `shopStock`)。
 * 都市名と月から決定的に導く(乱数は使わない=毎月同じ町を訪れれば同じ品揃え)。
 */
export function shopStock(cityId: string, month: number, allItemKeys: readonly ItemKey[]): readonly ItemKey[] {
  let hash = 0;
  for (const ch of cityId) hash = (hash * 31 + ch.charCodeAt(0)) % 9973;

  const picked: ItemKey[] = [];
  for (let i = 0; i < 3; i++) {
    picked.push(allItemKeys[(hash + month * 2 + i * 3) % allItemKeys.length]);
  }
  return [...new Set(picked)];
}
