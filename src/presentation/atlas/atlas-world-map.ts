import { AtlasLabel } from "./atlas-types";
import { WORLD_COLORS, WORLD_LABELS, WORLD_LAND } from "./world-outline.data";

/**
 * 世界地図の下敷き。世界一周の盤面が持っている地形をそのまま使う。
 * 座標は投影前の経度・緯度なので、寄り引きは描く側の変換だけで済む。
 */

/** 陸地の輪郭(38枚)。経度には180度を超える値が入る(変更線をまたぐ大陸)。 */
export function worldLand(): readonly (readonly (readonly [number, number])[])[] {
  return WORLD_LAND;
}

export function worldColors(): { readonly sea: string; readonly land: string; readonly coast: string } {
  return WORLD_COLORS;
}

/**
 * 地名。海洋名(北太平洋・地中海など10件)と陸の地形帯
 * (サハラ・ヒマラヤなど9件)が混ざっている。`isWater` で分けられる。
 */
export function worldLabels(): readonly AtlasLabel[] {
  return WORLD_LABELS;
}
