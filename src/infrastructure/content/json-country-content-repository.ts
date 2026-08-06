import { CountryContentRepository } from "../../application/ports/country-content-repository";
import { CountryId } from "../../domain/shared-kernel/ids";
import { CountryContentPack } from "../../domain/country/country-content-pack";
import { RawCountryContentSchema } from "./raw-content-schema";
import { mapRawContentToCountryPack } from "./country-content-mapper";

/**
 * 各国コンテンツJSONへの動的import。webpack/turbopackはこれを別チャンクとして
 * 切り出すため、選択されていない国のデータ(約185KB)はクライアントバンドルに
 * 含まれない(docs/90-migration/03-as-built-status.md 参照)。
 */
const LOADERS: Readonly<Record<string, () => Promise<unknown>>> = {
  bolivia: () => import("./bolivia.content.json").then((m) => m.default),
  japan: () => import("./japan.content.json").then((m) => m.default),
  india: () => import("./india.content.json").then((m) => m.default),
};

/**
 * `infrastructure/content/*.content.json` を読み込み、zodで検証したうえで
 * Domain型(CountryContentPack)にマッピングするアダプタ(ADR-0007)。
 */
export class JsonCountryContentRepository implements CountryContentRepository {
  private readonly cache = new Map<string, CountryContentPack>();
  private readonly pending = new Map<string, Promise<CountryContentPack>>();

  async load(countryId: CountryId): Promise<CountryContentPack> {
    const cached = this.cache.get(countryId);
    if (cached) return cached;

    const inFlight = this.pending.get(countryId);
    if (inFlight) return inFlight;

    const loader = LOADERS[countryId];
    if (!loader) {
      throw new Error(`Unknown country content: ${countryId}`);
    }

    const promise = loader().then((source) => {
      const parsed = RawCountryContentSchema.parse(source);
      const pack = mapRawContentToCountryPack(parsed);
      this.cache.set(countryId, pack);
      this.pending.delete(countryId);
      return pack;
    });
    this.pending.set(countryId, promise);
    return promise;
  }

  listAvailableCountries(): readonly CountryId[] {
    return Object.keys(LOADERS).map((id) => CountryId(id));
  }
}
