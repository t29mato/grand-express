/**
 * アルゼンチンの国コンテンツを組み立てる。
 *
 * legacy に無い、このリポジトリで書き起こした国(韓国・インド・フランス・
 * ペルー・オセアニアと同じ扱い)。出力の形は抽出後のJSONと同一なので、以降の
 * 読み込み・検証・Domainへの写像は他国とまったく同じ経路を通る。
 *
 * `art.mjs`(marks/bg)はまだ無い。絵の担当が `cities.mjs` 凍結後に作成する。
 */
import { COLOMBIA_BG, COLOMBIA_MARKS } from "./art.mjs";
import { COLOMBIA_CITIES, COLOMBIA_EDGES } from "./cities.mjs";
import {
  COLOMBIA_DOOM,
  COLOMBIA_ITEMS,
  COLOMBIA_META,
  COLOMBIA_REGIONS,
  COLOMBIA_SEASONS,
  COLOMBIA_SPIRIT,
} from "./flavour.mjs";
import {
  COLOMBIA_COLORS,
  COLOMBIA_LABELS,
  COLOMBIA_LAKES,
  COLOMBIA_LAND,
  COLOMBIA_PROJ,
  COLOMBIA_RIVERS,
  COLOMBIA_TERRAIN,
  renderColombiaDecor,
} from "./geography.mjs";
import { COLOMBIA_MONEY_EVENTS } from "./money-events.mjs";
import { COLOMBIA_STYLES } from "./music.mjs";
import { COLOMBIA_QUIZ } from "./quiz.mjs";

/** 盤面装飾は投影に依存するので、ここで一度だけ評価して文字列にする。 */
function buildDecor() {
  const p = COLOMBIA_PROJ;
  const px = (lon) => ((lon - p.LON0) / (p.LON1 - p.LON0)) * p.BW;
  const py = (lat) => ((lat - p.LAT0) / (p.LAT1 - p.LAT0)) * p.BH;
  return renderColombiaDecor(px, py);
}

export function buildColombiaContent() {
  return {
    id: COLOMBIA_META.id,
    name: COLOMBIA_META.name,
    blurb: COLOMBIA_META.blurb,
    cur: COLOMBIA_META.cur,
    start: COLOMBIA_META.start,
    cpuNames: COLOMBIA_META.cpuNames,
    proj: COLOMBIA_PROJ,
    regions: COLOMBIA_REGIONS,
    cities: COLOMBIA_CITIES,
    edges: COLOMBIA_EDGES,
    quiz: COLOMBIA_QUIZ,
    items: COLOMBIA_ITEMS,
    spirit: COLOMBIA_SPIRIT,
    doom: COLOMBIA_DOOM,
    seasons: COLOMBIA_SEASONS,
    moneyEvents: COLOMBIA_MONEY_EVENTS,
    stripe: COLOMBIA_META.stripe,
    marks: COLOMBIA_MARKS,
    bg: COLOMBIA_BG,
    sea: COLOMBIA_COLORS.sea,
    seaWave: COLOMBIA_COLORS.seaWave,
    landBase: COLOMBIA_COLORS.landBase,
    coast: COLOMBIA_COLORS.coast,
    land: COLOMBIA_LAND,
    terrain: COLOMBIA_TERRAIN,
    lakes: COLOMBIA_LAKES,
    rivers: COLOMBIA_RIVERS,
    labels: COLOMBIA_LABELS,
    decor: buildDecor(),
    styles: COLOMBIA_STYLES,
  };
}
