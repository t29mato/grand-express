import { CountryId } from "../../domain/shared-kernel/ids";
import { CountryContentPack } from "../../domain/country/country-content-pack";

/**
 * 国コンテンツ(都市・アイテム・クイズ・季節・厄災)を読み込むポート。
 *
 * `load` は非同期(Promise)にしている。ブラウザ実装(`JsonCountryContentRepository`)は
 * 各国のコンテンツJSON(約185KB)を動的import(コード分割)で必要な時にだけ読み込むため
 * (docs/90-migration/03-as-built-status.md のバンドルサイズに関する既知課題への対応)。
 */
export interface CountryContentRepository {
  load(countryId: CountryId): Promise<CountryContentPack>;
  listAvailableCountries(): readonly CountryId[];
}
