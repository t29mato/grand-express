/**
 * ウクライナの国コンテンツを組み立てる。
 *
 * legacy に無い、このリポジトリで書き起こした国(韓国・インド・フランス・
 * 世界一周・茨城と同じ扱い)。出力の形は抽出後のJSONと同一なので、以降の
 * 読み込み・検証・Domainへの写像は他国とまったく同じ経路を通る。
 */
import { UKRAINE_BG, UKRAINE_MARKS } from "./art.mjs";
import { UKRAINE_CITIES, UKRAINE_EDGES } from "./cities.mjs";
import {
  UKRAINE_DOOM,
  UKRAINE_ITEMS,
  UKRAINE_META,
  UKRAINE_REGIONS,
  UKRAINE_SEASONS,
  UKRAINE_SPIRIT,
} from "./flavour.mjs";
import {
  UKRAINE_COLORS,
  UKRAINE_LABELS,
  UKRAINE_LAKES,
  UKRAINE_LAND,
  UKRAINE_PROJ,
  UKRAINE_RIVERS,
  UKRAINE_TERRAIN,
  renderUkraineDecor,
} from "./geography.mjs";
import { UKRAINE_MONEY_EVENTS } from "./money-events.mjs";
import { UKRAINE_STYLES } from "./music.mjs";
import { UKRAINE_QUIZ } from "./quiz.mjs";

/** 盤面装飾は投影に依存するので、ここで一度だけ評価して文字列にする。 */
function buildDecor() {
  const p = UKRAINE_PROJ;
  const px = (lon) => ((lon - p.LON0) / (p.LON1 - p.LON0)) * p.BW;
  const py = (lat) => ((lat - p.LAT0) / (p.LAT1 - p.LAT0)) * p.BH;
  return renderUkraineDecor(px, py);
}

export function buildUkraineContent() {
  return {
    id: UKRAINE_META.id,
    name: UKRAINE_META.name,
    blurb: UKRAINE_META.blurb,
    cur: UKRAINE_META.cur,
    start: UKRAINE_META.start,
    cpuNames: UKRAINE_META.cpuNames,
    proj: UKRAINE_PROJ,
    regions: UKRAINE_REGIONS,
    cities: UKRAINE_CITIES,
    edges: UKRAINE_EDGES,
    quiz: UKRAINE_QUIZ,
    items: UKRAINE_ITEMS,
    spirit: UKRAINE_SPIRIT,
    doom: UKRAINE_DOOM,
    seasons: UKRAINE_SEASONS,
    moneyEvents: UKRAINE_MONEY_EVENTS,
    stripe: UKRAINE_META.stripe,
    marks: UKRAINE_MARKS,
    bg: UKRAINE_BG,
    sea: UKRAINE_COLORS.sea,
    seaWave: UKRAINE_COLORS.seaWave,
    landBase: UKRAINE_COLORS.landBase,
    coast: UKRAINE_COLORS.coast,
    land: UKRAINE_LAND,
    terrain: UKRAINE_TERRAIN,
    lakes: UKRAINE_LAKES,
    rivers: UKRAINE_RIVERS,
    labels: UKRAINE_LABELS,
    decor: buildDecor(),
    styles: UKRAINE_STYLES,
  };
}
