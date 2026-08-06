import { CityId, CountryId, ItemKey, MoneyEventId, QuizQuestionId, RegionId } from "../../domain/shared-kernel/ids";
import { City, Edge } from "../../domain/board/city";
import { CountryProjection } from "../../domain/board/board-projection";
import { ItemDefinition, ItemEffect } from "../../domain/item/item";
import { QuizQuestion } from "../../domain/quiz/quiz-question";
import { MoneyEvent } from "../../domain/board/money-event";
import { SeasonDefinition } from "../../domain/season/season-effect";
import { CountryContentPack } from "../../domain/country/country-content-pack";
import { RawCountryContent } from "./raw-content-schema";
import { DOOM_EFFECT_ID_BY_LEGACY_ID, SEASON_EFFECTS_BY_COUNTRY } from "./season-and-doom-rules";
import { ITEM_EFFECT_BY_LEGACY_KEY } from "./item-effect-rules";

function mapProjection(raw: RawCountryContent["proj"]): CountryProjection {
  return {
    boardWidth: raw.BW,
    boardHeight: raw.BH,
    lon0: raw.LON0,
    lon1: raw.LON1,
    lat0: raw.LAT0,
    lat1: raw.LAT1,
    segmentLength: raw.seg,
  };
}

function mapCities(raw: RawCountryContent): City[] {
  return Object.entries(raw.cities).map(([id, city]) => ({
    id: CityId(id),
    name: city.n,
    regionId: RegionId(city.reg),
    longitude: city.lo,
    latitude: city.la,
    tag: city.tag,
    fact: city.fact,
    properties: city.props.map((p) => ({ name: p.n, cost: p.cost, income: p.inc })),
    artSceneKey: city.bg,
    artGlyphKey: city.mark,
    labelPosition: city.lp === "l" ? "left" : city.lp === "r" ? "right" : "bottom",
  }));
}

function mapEdges(raw: RawCountryContent): Edge[] {
  return raw.edges.map(([a, b, kind]) => ({
    from: CityId(a),
    to: CityId(b),
    // 3要素目が無い路線は陸路とみなす(legacy由来のデータはすべて陸路)。
    kind: kind ?? "rail",
  }));
}

function itemEffectFor(key: string): ItemEffect {
  const effect = ITEM_EFFECT_BY_LEGACY_KEY[key];
  if (!effect) {
    throw new Error(
      `No ItemEffect mapping for item key "${key}". Add it to src/infrastructure/content/item-effect-rules.ts`,
    );
  }
  return effect;
}

function mapItems(raw: RawCountryContent): ItemDefinition[] {
  return Object.entries(raw.items).map(([key, item]) => ({
    key: ItemKey(key),
    kind: item.kind,
    price: item.price,
    effect: itemEffectFor(key),
    emoji: item.e,
    name: item.n,
    description: item.d,
    fact: item.f,
  }));
}

function mapQuiz(raw: RawCountryContent): QuizQuestion[] {
  // IDはコンテンツ内での並び順から与える。間違えた問題をセーブデータに
  // 記録するため、問題文そのものではなく短い安定した識別子が必要になる。
  return raw.quiz.map((q, index) => ({
    id: QuizQuestionId(`q${index}`),
    difficulty: q.difficulty as QuizQuestion["difficulty"],
    question: q.q,
    options: q.o,
    correctOptionIndex: q.a,
    fact: q.f,
  }));
}

function mapMoneyEvents(raw: RawCountryContent): MoneyEvent[] {
  return raw.moneyEvents.map((event) => ({
    id: MoneyEventId(event.id),
    kind: event.kind,
    regionIds: event.regs.map(RegionId),
    monthIndices: event.months ?? [],
    emoji: event.e,
    title: event.n,
    narrative: event.t,
    amount: event.amount,
  }));
}

function mapSeasons(raw: RawCountryContent): SeasonDefinition[] {
  const effectsByMonth = SEASON_EFFECTS_BY_COUNTRY[raw.id];
  if (!effectsByMonth) {
    throw new Error(`No season effect rules for country "${raw.id}"`);
  }
  return raw.seasons.map((season, monthIndex) => ({
    monthIndex,
    emoji: season.e,
    name: season.n,
    narrative: season.t,
    fact: season.f,
    effects: effectsByMonth[monthIndex] ?? [],
  }));
}

function mapDoomFlavors(raw: RawCountryContent) {
  return raw.doom.map((doom) => {
    const effectId = DOOM_EFFECT_ID_BY_LEGACY_ID[doom.id];
    if (!effectId) {
      throw new Error(
        `No DoomEffectId mapping for doom id "${doom.id}". Add it to src/infrastructure/content/season-and-doom-rules.ts`,
      );
    }
    return { id: doom.id, effectId, name: doom.n, narrative: doom.t };
  });
}

export function mapRawContentToCountryPack(raw: RawCountryContent): CountryContentPack {
  return {
    id: CountryId(raw.id),
    name: raw.name,
    blurb: raw.blurb,
    currency: { prefix: raw.cur.pre, suffix: raw.cur.post, multiplier: raw.cur.mul },
    startCityId: CityId(raw.start),
    cpuNames: raw.cpuNames,
    projection: mapProjection(raw.proj),
    regions: new Map(Object.entries(raw.regions).map(([code, name]) => [RegionId(code), name])),
    cities: mapCities(raw),
    edges: mapEdges(raw),
    items: mapItems(raw),
    quiz: mapQuiz(raw),
    seasons: mapSeasons(raw),
    moneyEvents: mapMoneyEvents(raw),
    doomFlavors: mapDoomFlavors(raw),
    spirit: {
      emoji: raw.spirit.e,
      name: raw.spirit.n,
      bigName: raw.spirit.big,
      wardItemKey: ItemKey(raw.spirit.ward),
      arriveTemplate: raw.spirit.arrive,
      movesTemplate: raw.spirit.moves,
      wakeTemplate: raw.spirit.wake,
      wakeFactTemplate: raw.spirit.wakeFact,
      pleasedTemplate: raw.spirit.pleased,
      wardBodyTemplate: raw.spirit.wardBody,
    },
    stripeColors: raw.stripe,
    artScenes: raw.bg,
    artGlyphs: raw.marks,
    terrain: {
      seaColor: raw.sea,
      seaWaveColor: raw.seaWave,
      landColor: raw.landBase,
      coastColor: raw.coast,
      landPolygons: raw.land,
      terrainPolygons: raw.terrain,
      lakes: raw.lakes,
      rivers: raw.rivers,
      labels: raw.labels.map(([lo, la, text, water]) => [lo, la, text, water !== 0] as const),
      decorSvg: raw.decor,
    },
  };
}
