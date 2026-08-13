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
  canada: () => import("./canada.content.json").then((m) => m.default),
  ukraine: () => import("./ukraine.content.json").then((m) => m.default),
  brazil: () => import("./brazil.content.json").then((m) => m.default),
  australia: () => import("./australia.content.json").then((m) => m.default),
  solarsystem: () => import("./solarsystem.content.json").then((m) => m.default),
  hyakumeizan: () => import("./hyakumeizan.content.json").then((m) => m.default),
  venezuela: () => import("./venezuela.content.json").then((m) => m.default),
  bolivia: () => import("./bolivia.content.json").then((m) => m.default),
  japan: () => import("./japan.content.json").then((m) => m.default),
  india: () => import("./india.content.json").then((m) => m.default),
  france: () => import("./france.content.json").then((m) => m.default),
  world: () => import("./world.content.json").then((m) => m.default),
  ibaraki: () => import("./ibaraki.content.json").then((m) => m.default),
  korea: () => import("./korea.content.json").then((m) => m.default),
  turkey: () => import("./turkey.content.json").then((m) => m.default),
  germany: () => import("./germany.content.json").then((m) => m.default),
  china: () => import("./china.content.json").then((m) => m.default),
  uk: () => import("./uk.content.json").then((m) => m.default),
  italy: () => import("./italy.content.json").then((m) => m.default),
  russia: () => import("./russia.content.json").then((m) => m.default),
  usa: () => import("./usa.content.json").then((m) => m.default),
  indonesia: () => import("./indonesia.content.json").then((m) => m.default),
  morocco: () => import("./morocco.content.json").then((m) => m.default),
  ghana: () => import("./ghana.content.json").then((m) => m.default),
  bali: () => import("./bali.content.json").then((m) => m.default),
  malaysia: () => import("./malaysia.content.json").then((m) => m.default),
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
