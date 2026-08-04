import { CountryId } from "../../domain/shared-kernel/ids";
import { CountryContentPack } from "../../domain/country/country-content-pack";

/** 国コンテンツ(都市・アイテム・クイズ・季節・厄災)を読み込むポート。 */
export interface CountryContentRepository {
  load(countryId: CountryId): CountryContentPack;
  listAvailableCountries(): readonly CountryId[];
}
