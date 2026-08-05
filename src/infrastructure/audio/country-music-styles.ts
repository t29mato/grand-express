/**
 * 国コンテンツJSON内の `styles`(地方ごとの音楽データ)の型と動的読み込み。
 * legacyの `BOLIVIA.styles`/`JAPAN.styles` をそのまま抽出したもの
 * (docs/90-migration/00-characterization-samples.md 等と同様、
 * scripts/extract-legacy-content.mjs で機械的に抽出済み)。
 *
 * 音楽データはゲームルールに一切関与しないため、Domain層の
 * `CountryContentPack` には含めず、Infrastructure層(音声アダプタ)専用の
 * 読み込み経路として分離している(ADR-0003と同じ考え方: 表示/演出の関心事は
 * Domainに漏らさない)。
 */

/** `[beat, freq, durationInSteps]` */
export type MelodyNote = readonly [number, number, number];

export interface ChordDefinition {
  readonly b: number;
  readonly n: readonly [number, number, number];
}

export interface RegionStyle {
  readonly bpm: number;
  readonly lead: "flute" | "pluck";
  /** 8小節分のコード進行。 */
  readonly ch: readonly ChordDefinition[];
  /** 8小節分のメロディ。各小節は複数の音符を持つ。 */
  readonly mel: readonly (readonly MelodyNote[])[];
  /** ストラム(伴奏)を鳴らすステップ番号。 */
  readonly strum: readonly number[];
  /** ドラムを鳴らすステップ番号と音量 `[step, volume]`。 */
  readonly drum: readonly (readonly [number, number])[];
  readonly shake: number;
}

export type CountryStyles = Readonly<Record<string, RegionStyle>>;

const STYLE_LOADERS: Readonly<Record<string, () => Promise<unknown>>> = {
  bolivia: () => import("../content/bolivia.content.json").then((m) => (m.default as { styles: unknown }).styles),
  japan: () => import("../content/japan.content.json").then((m) => (m.default as { styles: unknown }).styles),
};

/**
 * 指定した国の音楽データを読み込む。国コンテンツ本体
 * (`JsonCountryContentRepository`)と同じJSONファイルを動的importするため、
 * webpack/turbopackのモジュールキャッシュにより二重取得は発生しない。
 */
export async function loadCountryStyles(countryId: string): Promise<CountryStyles | null> {
  const loader = STYLE_LOADERS[countryId];
  if (!loader) return null;
  return (await loader()) as CountryStyles;
}
