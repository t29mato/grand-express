/**
 * 盤面上のマーカー寸法(盤面座標の単位)。
 * `board-view.tsx`(描画)と `use-city-labels.ts`(ラベルの衝突判定)の
 * 両方から参照するため、単一の定義をここに置く。
 */
export const SIZES = {
  cityRadius: 9,
  cityInnerRadius: 3.4,
  cityShadowRx: 15,
  cityShadowRy: 5.5,
  /** 都市シンボル(marks)の拡大率。元のグリフは24×24。 */
  cityGlyphScale: 1.0,
  destRingRadius: 21,
  /** 中間マスの正方形の半辺。 */
  squareHalf: 9,
  haloRadius: 17,
} as const;

/** 都市マーカーが専有する矩形(中心からの相対座標)。シンボルは円の上に描かれる。 */
export const CITY_FOOTPRINT = {
  left: -(24 * SIZES.cityGlyphScale) / 2 - 1,
  right: (24 * SIZES.cityGlyphScale) / 2 + 1,
  top: -6 - 24 * SIZES.cityGlyphScale,
  bottom: SIZES.cityRadius + 3,
} as const;

/** 中間マスが専有する矩形(中心からの相対座標)。 */
export const SQUARE_FOOTPRINT = {
  left: -SIZES.squareHalf - 2,
  right: SIZES.squareHalf + 2,
  top: -SIZES.squareHalf - 2,
  bottom: SIZES.squareHalf + 2,
} as const;
