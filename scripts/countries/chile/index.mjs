/**
 * アルゼンチンの国コンテンツを組み立てる。
 *
 * legacy に無い、このリポジトリで書き起こした国(韓国・インド・フランス・
 * ペルー・オセアニアと同じ扱い)。出力の形は抽出後のJSONと同一なので、以降の
 * 読み込み・検証・Domainへの写像は他国とまったく同じ経路を通る。
 *
 * `art.mjs`(marks/bg)はまだ無い。絵の担当が `cities.mjs` 凍結後に作成する。
 */
import { CHILE_BG, CHILE_MARKS } from "./art.mjs";
import { CHILE_CITIES, CHILE_EDGES } from "./cities.mjs";
import {
  CHILE_DOOM,
  CHILE_ITEMS,
  CHILE_META,
  CHILE_REGIONS,
  CHILE_SEASONS,
  CHILE_SPIRIT,
} from "./flavour.mjs";
import {
  CHILE_COLORS,
  CHILE_LABELS,
  CHILE_LAKES,
  CHILE_LAND,
  CHILE_PROJ,
  CHILE_RIVERS,
  CHILE_TERRAIN,
  renderChileDecor,
} from "./geography.mjs";
import { CHILE_MONEY_EVENTS } from "./money-events.mjs";
import { CHILE_STYLES } from "./music.mjs";
import { CHILE_QUIZ } from "./quiz.mjs";

/** 盤面装飾は投影に依存するので、ここで一度だけ評価して文字列にする。 */
function buildDecor() {
  const p = CHILE_PROJ;
  const px = (lon) => ((lon - p.LON0) / (p.LON1 - p.LON0)) * p.BW;
  const py = (lat) => ((lat - p.LAT0) / (p.LAT1 - p.LAT0)) * p.BH;
  return renderChileDecor(px, py);
}

export function buildChileContent() {
  return {
    id: CHILE_META.id,
    name: CHILE_META.name,
    blurb: CHILE_META.blurb,
    cur: CHILE_META.cur,
    start: CHILE_META.start,
    cpuNames: CHILE_META.cpuNames,
    proj: CHILE_PROJ,
    regions: CHILE_REGIONS,
    cities: CHILE_CITIES,
    edges: CHILE_EDGES,
    quiz: CHILE_QUIZ,
    items: CHILE_ITEMS,
    spirit: CHILE_SPIRIT,
    doom: CHILE_DOOM,
    seasons: CHILE_SEASONS,
    moneyEvents: CHILE_MONEY_EVENTS,
    stripe: CHILE_META.stripe,
    marks: CHILE_MARKS,
    bg: CHILE_BG,
    sea: CHILE_COLORS.sea,
    seaWave: CHILE_COLORS.seaWave,
    landBase: CHILE_COLORS.landBase,
    coast: CHILE_COLORS.coast,
    land: CHILE_LAND,
    terrain: CHILE_TERRAIN,
    lakes: CHILE_LAKES,
    rivers: CHILE_RIVERS,
    labels: CHILE_LABELS,
    decor: buildDecor(),
    styles: CHILE_STYLES,
  };
}
