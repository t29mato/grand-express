import { z } from "zod";
import countryIndexRaw from "./country-index.json";
import { LocalizedTextSchema } from "./raw-content-schema";

/**
 * セットアップ画面の国選択カード用の軽量インデックス(約9KB)。
 * フルコンテンツ(各国約215KB)を読み込まずに一覧表示するための最適化
 * (docs/90-migration/03-as-built-status.md のバンドルサイズに関する既知課題への対応)。
 *
 * 地図サムネイル(`thumbSvg`)は legacy の `countryThumb()` と同じ描画結果を
 * 抽出時に生成した静的なSVG断片。地形データ(land/terrain)自体を読み込まずに
 * 描画できるよう、文字列としてこのインデックスに含めている。
 */
const CountryIndexSchema = z.array(
  z.object({
    id: z.string(),
    name: LocalizedTextSchema,
    blurb: LocalizedTextSchema,
    currency: z.object({ prefix: z.string(), suffix: z.string(), multiplier: z.number() }),
    thumbViewBox: z.string(),
    thumbSvg: z.string(),
    /**
     * 盤面が世界のどこにあたるか(投影の四隅の真ん中)。
     * トップ画面の世界地図に印を打つのに使う。
     *
     * **ここに書き足すのを忘れると、zodが黙って落とす。**生成物には入っているのに
     * 画面には出てこない、という形で気づくことになる(実際そうなった)。
     */
    centre: z.object({ lon: z.number(), lat: z.number() }),
    /**
     * 都市の点を打たない地図。**世界一周の盤面だけが持つ。**
     * トップ画面で世界地図から盤面を選ぶときの下地に使う。
     */
    mapSvg: z.string().optional(),
  }),
);

export type CountryIndexEntry = z.infer<typeof CountryIndexSchema>[number];

export const COUNTRY_INDEX: readonly CountryIndexEntry[] = CountryIndexSchema.parse(countryIndexRaw);
