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
  /**
   * 押せる範囲。**見た目より広く取る。**
   *
   * 中間マスは半辺9の正方形、都市は半径9の丸で、盤面の拡大率を考えると
   * 画面上ではおおよそ半径6px。**数px外すと何も起きない**という報告が出た
   * (範囲外を押したときの弾き返しは効くが、押せるマスを微妙に外すと
   * その経路にすら入らないので、本当に無反応になる)。
   *
   * `haloRadius` と同じ17にしてある。**光っている範囲=押せる範囲**になるので、
   * 見た目と当たりが一致する。マス同士の間隔は seg=84〜150 なので、
   * 17まで広げても隣と取り合いにならない(いちばん詰まっている盤面で84)。
   */
  hitRadius: 17,
} as const;

/** 都市シンボルの元の一辺(盤面座標の単位)。抽出元のグリフが24×24で描かれている。 */
export const CITY_GLYPH_BASE_UNITS = 24 * SIZES.cityGlyphScale;

/**
 * 印を画面上でこれくらいの大きさにしたい(CSSピクセル)。
 *
 * **測って決めた。** 印は盤面座標で大きさが固定なので、画面上の大きさは
 * ズームで変わる。追従の眺めで実測すると
 * 茨城 30.6px / 日本 21.2px / 世界一周 14.6px(1600×1000、中央値)で、
 * 疎らな盤面では絵が読めるのに、**都市の詰まった盤面ほど小さくなっていた**
 * ——絵柄がいちばん要る場面で読めない。30px あれば鳥居と梅の木の区別がつく。
 */
export const CITY_GLYPH_TARGET_PX = 32;

/**
 * 元の大きさの何倍まで許すか。
 *
 * **上限が要る。** 画面上で一定の大きさにすると、盤面座標での大きさが
 * 3〜5倍に膨らむ。都市どうしの間隔は全体表示で実測 日本14.0px・
 * 世界一周13.9px しかなく、そこに30pxの絵を置けば印が重なって潰れる。
 */
export const CITY_GLYPH_MAX_SCALE = 1.5;

/**
 * 印を大きくしてよい引き具合(盤面幅に対する視野幅の比)。
 *
 * **全体表示では大きくしない。ここが計測で決まった一線。**
 * 大きくしてみたら、全体表示の印は 9.8→14.7px(茨城)にはなったが、
 * **絵柄はやはり判別できず**(都市どうしの間隔が13.9〜36.1pxしかないので、
 * 判別できる大きさまでは物理的に上げられない)、
 * そのくせ**全部読めていた都市名が 30→25 / 34→26 / 29→23 件に減った。**
 * 読めない絵のために、読めていた名前を捨てたことになる。
 *
 * 全体表示の仕事は「どこに何があるか」で、それは名前が担う。
 * 印の絵柄は寄って遊んでいるときに読ませる。
 * `0.5` は追従の眺め(`FOLLOW_WIDTH_RATIO` = 0.45)より少し広いところ、
 * `0.8` はほぼ全体表示。そのあいだで滑らかに戻す。
 */
const GLYPH_GROWTH_ZOOM_IN = 0.5;
const GLYPH_GROWTH_ZOOM_OUT = 0.8;

/**
 * いまの縮尺での都市シンボルの一辺(盤面座標の単位)。
 *
 * `unitsPerPx` … 盤面座標1単位あたりの画面px の逆数(= camera.w / 枠の幅px)。
 * `zoomRatio`  … 視野幅 ÷ 盤面幅。1に近いほど引いている。
 *
 * **0除算とNaNを必ずここで止める。** 盤面の縮尺は枠の実寸が測れるまで
 * 決まらず、その間 `unitsPerPx` は 0 になる。素通しすると
 * `fontSize`/`strokeWidth`/`y` にNaNが流れ、盤面が丸ごと消える
 * (実際に一度そうなった)。有限でない値・0以下は元の大きさに倒す。
 *
 * 0.5単位に丸めるのは、ズーム中に毎フレーム名札の当たり判定をやり直さないため
 * (名札の文字サイズと同じ扱い)。
 */
export function cityGlyphUnits(unitsPerPx: number, zoomRatio: number): number {
  const base = CITY_GLYPH_BASE_UNITS;
  if (!Number.isFinite(unitsPerPx) || unitsPerPx <= 0) return base;
  const ratio = Number.isFinite(zoomRatio) ? zoomRatio : GLYPH_GROWTH_ZOOM_OUT;
  // 引いているほど 0 に近づく(0 なら元の大きさのまま)。
  const gate = Math.min(
    1,
    Math.max(0, (GLYPH_GROWTH_ZOOM_OUT - ratio) / (GLYPH_GROWTH_ZOOM_OUT - GLYPH_GROWTH_ZOOM_IN)),
  );
  const allowedMax = base * (1 + (CITY_GLYPH_MAX_SCALE - 1) * gate);
  const wanted = CITY_GLYPH_TARGET_PX * unitsPerPx;
  const clamped = Math.min(Math.max(wanted, base), allowedMax);
  return Math.round(clamped * 2) / 2;
}

/** 都市マーカーが専有する矩形(中心からの相対座標)。シンボルは円の上に描かれる。 */
export function cityFootprint(glyphUnits: number): {
  left: number;
  right: number;
  top: number;
  bottom: number;
} {
  const side = Number.isFinite(glyphUnits) && glyphUnits > 0 ? glyphUnits : CITY_GLYPH_BASE_UNITS;
  return {
    left: -side / 2 - 1,
    right: side / 2 + 1,
    top: -6 - side,
    bottom: SIZES.cityRadius + 3,
  };
}

/**
 * 元の大きさでの都市マーカーの矩形。
 *
 * **中間マスの配置(`use-board-layout.ts`)はこちらを使う。**
 * マスの座標はズームと無関係に一度決まるものなので、縮尺で変わる値を
 * 混ぜてはいけない(混ぜると、ズームするたびに盤面のマスが動く)。
 */
export const CITY_FOOTPRINT = cityFootprint(CITY_GLYPH_BASE_UNITS);

/** 中間マスが専有する矩形(中心からの相対座標)。 */
export const SQUARE_FOOTPRINT = {
  left: -SIZES.squareHalf - 2,
  right: SIZES.squareHalf + 2,
  top: -SIZES.squareHalf - 2,
  bottom: SIZES.squareHalf + 2,
} as const;
