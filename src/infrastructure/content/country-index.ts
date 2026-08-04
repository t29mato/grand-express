import { z } from "zod";
import countryIndexRaw from "./country-index.json";
import { LocalizedTextSchema } from "./raw-content-schema";

/**
 * セットアップ画面の国選択カード用の軽量インデックス(約1KB)。
 * フルコンテンツ(各国約185KB)を読み込まずに一覧表示するための最適化
 * (docs/90-migration/03-as-built-status.md のバンドルサイズに関する既知課題への対応)。
 */
const CountryIndexSchema = z.array(
  z.object({
    id: z.string(),
    name: LocalizedTextSchema,
    blurb: LocalizedTextSchema,
  }),
);

export type CountryIndexEntry = z.infer<typeof CountryIndexSchema>[number];

export const COUNTRY_INDEX: readonly CountryIndexEntry[] = CountryIndexSchema.parse(countryIndexRaw);
