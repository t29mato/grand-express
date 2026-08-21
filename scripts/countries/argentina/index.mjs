/**
 * アルゼンチンの国コンテンツを組み立てる。
 *
 * legacy に無い、このリポジトリで書き起こした国(韓国・インド・フランス・
 * ペルー・オセアニアと同じ扱い)。出力の形は抽出後のJSONと同一なので、以降の
 * 読み込み・検証・Domainへの写像は他国とまったく同じ経路を通る。
 *
 * `art.mjs`(marks/bg)はまだ無い。絵の担当が `cities.mjs` 凍結後に作成する。
 */
import { ARGENTINA_BG, ARGENTINA_MARKS } from "./art.mjs";
import { ARGENTINA_CITIES, ARGENTINA_EDGES } from "./cities.mjs";
import {
  ARGENTINA_DOOM,
  ARGENTINA_ITEMS,
  ARGENTINA_META,
  ARGENTINA_REGIONS,
  ARGENTINA_SEASONS,
  ARGENTINA_SPIRIT,
} from "./flavour.mjs";
import {
  ARGENTINA_COLORS,
  ARGENTINA_LABELS,
  ARGENTINA_LAKES,
  ARGENTINA_LAND,
  ARGENTINA_PROJ,
  ARGENTINA_RIVERS,
  ARGENTINA_TERRAIN,
  renderArgentinaDecor,
} from "./geography.mjs";
import { ARGENTINA_MONEY_EVENTS } from "./money-events.mjs";
import { ARGENTINA_STYLES } from "./music.mjs";
import { ARGENTINA_QUIZ } from "./quiz.mjs";

/** 盤面装飾は投影に依存するので、ここで一度だけ評価して文字列にする。 */
function buildDecor() {
  const p = ARGENTINA_PROJ;
  const px = (lon) => ((lon - p.LON0) / (p.LON1 - p.LON0)) * p.BW;
  const py = (lat) => ((lat - p.LAT0) / (p.LAT1 - p.LAT0)) * p.BH;
  return renderArgentinaDecor(px, py);
}

export function buildArgentinaContent() {
  return {
    id: ARGENTINA_META.id,
    name: ARGENTINA_META.name,
    blurb: ARGENTINA_META.blurb,
    cur: ARGENTINA_META.cur,
    start: ARGENTINA_META.start,
    cpuNames: ARGENTINA_META.cpuNames,
    proj: ARGENTINA_PROJ,
    regions: ARGENTINA_REGIONS,
    cities: ARGENTINA_CITIES,
    edges: ARGENTINA_EDGES,
    quiz: ARGENTINA_QUIZ,
    items: ARGENTINA_ITEMS,
    spirit: ARGENTINA_SPIRIT,
    doom: ARGENTINA_DOOM,
    seasons: ARGENTINA_SEASONS,
    moneyEvents: ARGENTINA_MONEY_EVENTS,
    stripe: ARGENTINA_META.stripe,
    marks: ARGENTINA_MARKS,
    bg: ARGENTINA_BG,
    sea: ARGENTINA_COLORS.sea,
    seaWave: ARGENTINA_COLORS.seaWave,
    landBase: ARGENTINA_COLORS.landBase,
    coast: ARGENTINA_COLORS.coast,
    land: ARGENTINA_LAND,
    terrain: ARGENTINA_TERRAIN,
    lakes: ARGENTINA_LAKES,
    rivers: ARGENTINA_RIVERS,
    labels: ARGENTINA_LABELS,
    decor: buildDecor(),
    styles: ARGENTINA_STYLES,
  };
}
