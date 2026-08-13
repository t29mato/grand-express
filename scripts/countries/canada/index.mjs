/**
 * カナダの国コンテンツを組み立てる。
 *
 * legacy に無い、このリポジトリで書き起こした国(韓国・インド・フランス・
 * 世界一周・茨城と同じ扱い)。出力の形は抽出後のJSONと同一なので、以降の読み込み・
 * 検証・Domainへの写像は他国とまったく同じ経路を通る。
 */
import { CANADA_BG, CANADA_MARKS } from "./art.mjs";
import { CANADA_CITIES, CANADA_EDGES } from "./cities.mjs";
import {
  CANADA_DOOM,
  CANADA_ITEMS,
  CANADA_META,
  CANADA_REGIONS,
  CANADA_SEASONS,
  CANADA_SPIRIT,
} from "./flavour.mjs";
import {
  CANADA_COLORS,
  CANADA_LABELS,
  CANADA_LAKES,
  CANADA_LAND,
  CANADA_PROJ,
  CANADA_RIVERS,
  CANADA_TERRAIN,
  renderCanadaDecor,
} from "./geography.mjs";
import { CANADA_MONEY_EVENTS } from "./money-events.mjs";
import { CANADA_STYLES } from "./music.mjs";
import { CANADA_QUIZ } from "./quiz.mjs";

/** 盤面装飾は投影に依存するので、ここで一度だけ評価して文字列にする。 */
function buildDecor() {
  const p = CANADA_PROJ;
  const px = (lon) => ((lon - p.LON0) / (p.LON1 - p.LON0)) * p.BW;
  const py = (lat) => ((lat - p.LAT0) / (p.LAT1 - p.LAT0)) * p.BH;
  return renderCanadaDecor(px, py);
}

export function buildCanadaContent() {
  return {
    id: CANADA_META.id,
    name: CANADA_META.name,
    blurb: CANADA_META.blurb,
    cur: CANADA_META.cur,
    start: CANADA_META.start,
    cpuNames: CANADA_META.cpuNames,
    proj: CANADA_PROJ,
    regions: CANADA_REGIONS,
    cities: CANADA_CITIES,
    edges: CANADA_EDGES,
    quiz: CANADA_QUIZ,
    items: CANADA_ITEMS,
    spirit: CANADA_SPIRIT,
    doom: CANADA_DOOM,
    seasons: CANADA_SEASONS,
    moneyEvents: CANADA_MONEY_EVENTS,
    stripe: CANADA_META.stripe,
    marks: CANADA_MARKS,
    bg: CANADA_BG,
    sea: CANADA_COLORS.sea,
    seaWave: CANADA_COLORS.seaWave,
    landBase: CANADA_COLORS.landBase,
    coast: CANADA_COLORS.coast,
    land: CANADA_LAND,
    terrain: CANADA_TERRAIN,
    lakes: CANADA_LAKES,
    rivers: CANADA_RIVERS,
    labels: CANADA_LABELS,
    decor: buildDecor(),
    styles: CANADA_STYLES,
  };
}
