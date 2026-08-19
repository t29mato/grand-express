/**
 * 国コンテンツJSON内の `styles`(地方ごとの音楽データ)の型と動的読み込み。
 * ボリビア・日本はlegacyの `BOLIVIA.styles`/`JAPAN.styles` をそのまま抽出したもの
 * (docs/90-migration/00-characterization-samples.md 等と同様、
 * scripts/extract-legacy-content.mjs で機械的に抽出済み)。
 * インド・フランス・世界一周はlegacyに無いので、このリポジトリで
 * `scripts/countries/{india,france,world}/music.mjs` に書き起こしている。
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

/**
 * 盤面ごとの音楽データの読み込み口。
 *
 * **盤面を足したら、ここにも足すこと。** 動的importのパスは束ね器(bundler)が
 * 静的に解決する必要があるため、この表だけは手で書く。
 *
 * ただし**書き忘れても何も起こらない** — 例外も警告も出ず、その盤面だけ
 * 音楽が鳴らないまま出荷される(フランス・インド・茨城で3回起きた)。
 * そこで `country-music-styles.test.ts` が
 * **`country-index.json` に載っている盤面すべてがここにあるか**を突き合わせている。
 * 足し忘れるとテストが赤くなる。
 */
const STYLE_LOADERS: Readonly<Record<string, () => Promise<unknown>>> = {
  canada: () => import("../content/canada.content.json").then((m) => (m.default as { styles: unknown }).styles),
  ukraine: () => import("../content/ukraine.content.json").then((m) => (m.default as { styles: unknown }).styles),
  brazil: () => import("../content/brazil.content.json").then((m) => (m.default as { styles: unknown }).styles),
  australia: () => import("../content/australia.content.json").then((m) => (m.default as { styles: unknown }).styles),
  solarsystem: () => import("../content/solarsystem.content.json").then((m) => (m.default as { styles: unknown }).styles),
  hyakumeizan: () => import("../content/hyakumeizan.content.json").then((m) => (m.default as { styles: unknown }).styles),
  europe: () => import("../content/europe.content.json").then((m) => (m.default as { styles: unknown }).styles),
  northamerica: () => import("../content/northamerica.content.json").then((m) => (m.default as { styles: unknown }).styles),
  southamerica: () => import("../content/southamerica.content.json").then((m) => (m.default as { styles: unknown }).styles),
  asia: () => import("../content/asia.content.json").then((m) => (m.default as { styles: unknown }).styles),
  mexico: () => import("../content/mexico.content.json").then((m) => (m.default as { styles: unknown }).styles),
  africa: () => import("../content/africa.content.json").then((m) => (m.default as { styles: unknown }).styles),
  egypt: () => import("../content/egypt.content.json").then((m) => (m.default as { styles: unknown }).styles),
  peru: () => import("../content/peru.content.json").then((m) => (m.default as { styles: unknown }).styles),
  switzerland: () => import("../content/switzerland.content.json").then((m) => (m.default as { styles: unknown }).styles),
  vietnam: () => import("../content/vietnam.content.json").then((m) => (m.default as { styles: unknown }).styles),
  newzealand: () => import("../content/newzealand.content.json").then((m) => (m.default as { styles: unknown }).styles),
  spain: () => import("../content/spain.content.json").then((m) => (m.default as { styles: unknown }).styles),
  venezuela: () => import("../content/venezuela.content.json").then((m) => (m.default as { styles: unknown }).styles),
  bolivia: () => import("../content/bolivia.content.json").then((m) => (m.default as { styles: unknown }).styles),
  japan: () => import("../content/japan.content.json").then((m) => (m.default as { styles: unknown }).styles),
  india: () => import("../content/india.content.json").then((m) => (m.default as { styles: unknown }).styles),
  france: () => import("../content/france.content.json").then((m) => (m.default as { styles: unknown }).styles),
  world: () => import("../content/world.content.json").then((m) => (m.default as { styles: unknown }).styles),
  ibaraki: () => import("../content/ibaraki.content.json").then((m) => (m.default as { styles: unknown }).styles),
  korea: () => import("../content/korea.content.json").then((m) => (m.default as { styles: unknown }).styles),
  turkey: () =>
    import("../content/turkey.content.json").then((m) => (m.default as { styles: unknown }).styles),
  germany: () =>
    import("../content/germany.content.json").then((m) => (m.default as { styles: unknown }).styles),
  china: () =>
    import("../content/china.content.json").then((m) => (m.default as { styles: unknown }).styles),
  uk: () =>
    import("../content/uk.content.json").then((m) => (m.default as { styles: unknown }).styles),
  italy: () =>
    import("../content/italy.content.json").then((m) => (m.default as { styles: unknown }).styles),
  russia: () =>
    import("../content/russia.content.json").then((m) => (m.default as { styles: unknown }).styles),
  usa: () =>
    import("../content/usa.content.json").then((m) => (m.default as { styles: unknown }).styles),
  indonesia: () =>
    import("../content/indonesia.content.json").then((m) => (m.default as { styles: unknown }).styles),
  morocco: () =>
    import("../content/morocco.content.json").then((m) => (m.default as { styles: unknown }).styles),
  ghana: () =>
    import("../content/ghana.content.json").then((m) => (m.default as { styles: unknown }).styles),
  bali: () =>
    import("../content/bali.content.json").then((m) => (m.default as { styles: unknown }).styles),
  malaysia: () =>
    import("../content/malaysia.content.json").then((m) => (m.default as { styles: unknown }).styles),
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
