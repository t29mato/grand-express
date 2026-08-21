/**
 * アルゼンチンの国コンテンツを組み立てる。
 *
 * legacy に無い、このリポジトリで書き起こした国(韓国・インド・フランス・
 * ペルー・オセアニアと同じ扱い)。出力の形は抽出後のJSONと同一なので、以降の
 * 読み込み・検証・Domainへの写像は他国とまったく同じ経路を通る。
 *
 * `art.mjs`(marks/bg)はまだ無い。絵の担当が `cities.mjs` 凍結後に作成する。
 */
import { CUBA_BG, CUBA_MARKS } from "./art.mjs";
import { CUBA_CITIES, CUBA_EDGES } from "./cities.mjs";
import {
  CUBA_DOOM,
  CUBA_ITEMS,
  CUBA_META,
  CUBA_REGIONS,
  CUBA_SEASONS,
  CUBA_SPIRIT,
} from "./flavour.mjs";
import {
  CUBA_COLORS,
  CUBA_LABELS,
  CUBA_LAND,
  CUBA_PROJ,
  CUBA_TERRAIN,
  renderCubaDecor,
} from "./geography.mjs";
import { CUBA_MONEY_EVENTS } from "./money-events.mjs";
import { CUBA_STYLES } from "./music.mjs";
import { CUBA_QUIZ } from "./quiz.mjs";

/** 盤面装飾は投影に依存するので、ここで一度だけ評価して文字列にする。 */
function buildDecor() {
  const p = CUBA_PROJ;
  const px = (lon) => ((lon - p.LON0) / (p.LON1 - p.LON0)) * p.BW;
  const py = (lat) => ((lat - p.LAT0) / (p.LAT1 - p.LAT0)) * p.BH;
  return renderCubaDecor(px, py);
}

export function buildCubaContent() {
  return {
    id: CUBA_META.id,
    name: CUBA_META.name,
    blurb: CUBA_META.blurb,
    cur: CUBA_META.cur,
    start: CUBA_META.start,
    cpuNames: CUBA_META.cpuNames,
    proj: CUBA_PROJ,
    regions: CUBA_REGIONS,
    cities: CUBA_CITIES,
    edges: CUBA_EDGES,
    quiz: CUBA_QUIZ,
    items: CUBA_ITEMS,
    spirit: CUBA_SPIRIT,
    doom: CUBA_DOOM,
    seasons: CUBA_SEASONS,
    moneyEvents: CUBA_MONEY_EVENTS,
    stripe: CUBA_META.stripe,
    marks: CUBA_MARKS,
    bg: CUBA_BG,
    sea: CUBA_COLORS.sea,
    seaWave: CUBA_COLORS.seaWave,
    landBase: CUBA_COLORS.landBase,
    coast: CUBA_COLORS.coast,
    land: CUBA_LAND,
    terrain: CUBA_TERRAIN,
    lakes: [],
    rivers: [],
    labels: CUBA_LABELS,
    decor: buildDecor(),
    styles: CUBA_STYLES,
  };
}
