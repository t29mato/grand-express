import { CountryContentRepository } from "../../application/ports/country-content-repository";
import { CountryId } from "../../domain/shared-kernel/ids";
import { CountryContentPack } from "../../domain/country/country-content-pack";
import { RawCountryContentSchema } from "./raw-content-schema";
import { mapRawContentToCountryPack } from "./country-content-mapper";
import boliviaRaw from "./bolivia.content.json";
import japanRaw from "./japan.content.json";

const SOURCES: Readonly<Record<string, unknown>> = {
  bolivia: boliviaRaw,
  japan: japanRaw,
};

/**
 * `infrastructure/content/*.content.json` を読み込み、zodで検証したうえで
 * Domain型(CountryContentPack)にマッピングするアダプタ(ADR-0007)。
 */
export class JsonCountryContentRepository implements CountryContentRepository {
  private readonly cache = new Map<string, CountryContentPack>();

  load(countryId: CountryId): CountryContentPack {
    const cached = this.cache.get(countryId);
    if (cached) return cached;

    const source = SOURCES[countryId];
    if (!source) {
      throw new Error(`Unknown country content: ${countryId}`);
    }
    const parsed = RawCountryContentSchema.parse(source);
    const pack = mapRawContentToCountryPack(parsed);
    this.cache.set(countryId, pack);
    return pack;
  }

  listAvailableCountries(): readonly CountryId[] {
    return Object.keys(SOURCES).map((id) => CountryId(id));
  }
}
