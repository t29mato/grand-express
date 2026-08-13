/**
 * 日本百名山の盤面コンテンツを組み立てる。
 *
 * legacy に無い、このリポジトリで書き起こした盤面(韓国・カナダなどと
 * 同じ扱い)。出力の形は抽出後のJSONと同一なので、以降の読み込み・
 * 検証・Domainへの写像は他の国とまったく同じ経路を通る。
 *
 * 「国」ではなく深田久弥『日本百名山』の100座を「都市」として置く盤面。
 */
import { HYAKUMEIZAN_BG, HYAKUMEIZAN_MARKS } from "./art.mjs";
import { HYAKUMEIZAN_CITIES, HYAKUMEIZAN_EDGES } from "./cities.mjs";
import {
  HYAKUMEIZAN_DOOM,
  HYAKUMEIZAN_ITEMS,
  HYAKUMEIZAN_META,
  HYAKUMEIZAN_REGIONS,
  HYAKUMEIZAN_SEASONS,
  HYAKUMEIZAN_SPIRIT,
} from "./flavour.mjs";
import {
  HYAKUMEIZAN_COLORS,
  HYAKUMEIZAN_LABELS,
  HYAKUMEIZAN_LAKES,
  HYAKUMEIZAN_LAND,
  HYAKUMEIZAN_PROJ,
  HYAKUMEIZAN_TERRAIN,
  renderHyakumeizanDecor,
} from "./geography.mjs";
import { HYAKUMEIZAN_MONEY_EVENTS } from "./money-events.mjs";
import { HYAKUMEIZAN_STYLES } from "./music.mjs";
import { HYAKUMEIZAN_QUIZ } from "./quiz.mjs";

/** 盤面装飾は投影に依存するので、ここで一度だけ評価して文字列にする。 */
function buildDecor() {
  const p = HYAKUMEIZAN_PROJ;
  const px = (lon) => ((lon - p.LON0) / (p.LON1 - p.LON0)) * p.BW;
  const py = (lat) => ((lat - p.LAT0) / (p.LAT1 - p.LAT0)) * p.BH;
  return renderHyakumeizanDecor(px, py);
}

export function buildHyakumeizanContent() {
  return {
    id: HYAKUMEIZAN_META.id,
    name: HYAKUMEIZAN_META.name,
    blurb: HYAKUMEIZAN_META.blurb,
    cur: HYAKUMEIZAN_META.cur,
    start: HYAKUMEIZAN_META.start,
    cpuNames: HYAKUMEIZAN_META.cpuNames,
    proj: HYAKUMEIZAN_PROJ,
    regions: HYAKUMEIZAN_REGIONS,
    cities: HYAKUMEIZAN_CITIES,
    edges: HYAKUMEIZAN_EDGES,
    quiz: HYAKUMEIZAN_QUIZ,
    items: HYAKUMEIZAN_ITEMS,
    spirit: HYAKUMEIZAN_SPIRIT,
    doom: HYAKUMEIZAN_DOOM,
    seasons: HYAKUMEIZAN_SEASONS,
    moneyEvents: HYAKUMEIZAN_MONEY_EVENTS,
    stripe: HYAKUMEIZAN_META.stripe,
    marks: HYAKUMEIZAN_MARKS,
    bg: HYAKUMEIZAN_BG,
    sea: HYAKUMEIZAN_COLORS.sea,
    seaWave: HYAKUMEIZAN_COLORS.seaWave,
    landBase: HYAKUMEIZAN_COLORS.landBase,
    coast: HYAKUMEIZAN_COLORS.coast,
    land: HYAKUMEIZAN_LAND,
    terrain: HYAKUMEIZAN_TERRAIN,
    lakes: HYAKUMEIZAN_LAKES,
    rivers: [],
    labels: HYAKUMEIZAN_LABELS,
    decor: buildDecor(),
    styles: HYAKUMEIZAN_STYLES,
  };
}
