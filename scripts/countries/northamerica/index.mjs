/**
 * 北アメリカ大陸の国コンテンツを組み立てる。
 *
 * legacy に無い、このリポジトリで書き起こした大陸の盤面(韓国・インド・
 * フランス・世界一周・茨城と同じ扱い)。出力の形は抽出後のJSONと同一なので、
 * 以降の読み込み・検証・Domainへの写像は他国とまったく同じ経路を通る。
 */
import { NORTHAMERICA_BG, NORTHAMERICA_MARKS } from "./art.mjs";
import { NORTHAMERICA_CITIES, NORTHAMERICA_EDGES } from "./cities.mjs";
import {
  NORTHAMERICA_DOOM,
  NORTHAMERICA_ITEMS,
  NORTHAMERICA_META,
  NORTHAMERICA_REGIONS,
  NORTHAMERICA_SEASONS,
  NORTHAMERICA_SPIRIT,
} from "./flavour.mjs";
import {
  NORTHAMERICA_COLORS,
  NORTHAMERICA_LABELS,
  NORTHAMERICA_LAKES,
  NORTHAMERICA_LAND,
  NORTHAMERICA_PROJ,
  NORTHAMERICA_RIVERS,
  NORTHAMERICA_TERRAIN,
  renderNorthAmericaDecor,
} from "./geography.mjs";
import { NORTHAMERICA_MONEY_EVENTS } from "./money-events.mjs";
import { NORTHAMERICA_STYLES } from "./music.mjs";
import { NORTHAMERICA_QUIZ } from "./quiz.mjs";

/** 盤面装飾は投影に依存するので、ここで一度だけ評価して文字列にする。 */
function buildDecor() {
  const p = NORTHAMERICA_PROJ;
  const px = (lon) => ((lon - p.LON0) / (p.LON1 - p.LON0)) * p.BW;
  const py = (lat) => ((lat - p.LAT0) / (p.LAT1 - p.LAT0)) * p.BH;
  return renderNorthAmericaDecor(px, py);
}

export function buildNorthAmericaContent() {
  return {
    id: NORTHAMERICA_META.id,
    name: NORTHAMERICA_META.name,
    blurb: NORTHAMERICA_META.blurb,
    cur: NORTHAMERICA_META.cur,
    start: NORTHAMERICA_META.start,
    cpuNames: NORTHAMERICA_META.cpuNames,
    proj: NORTHAMERICA_PROJ,
    regions: NORTHAMERICA_REGIONS,
    cities: NORTHAMERICA_CITIES,
    edges: NORTHAMERICA_EDGES,
    quiz: NORTHAMERICA_QUIZ,
    items: NORTHAMERICA_ITEMS,
    spirit: NORTHAMERICA_SPIRIT,
    doom: NORTHAMERICA_DOOM,
    seasons: NORTHAMERICA_SEASONS,
    moneyEvents: NORTHAMERICA_MONEY_EVENTS,
    stripe: NORTHAMERICA_META.stripe,
    marks: NORTHAMERICA_MARKS,
    bg: NORTHAMERICA_BG,
    sea: NORTHAMERICA_COLORS.sea,
    seaWave: NORTHAMERICA_COLORS.seaWave,
    landBase: NORTHAMERICA_COLORS.landBase,
    coast: NORTHAMERICA_COLORS.coast,
    land: NORTHAMERICA_LAND,
    terrain: NORTHAMERICA_TERRAIN,
    lakes: NORTHAMERICA_LAKES,
    rivers: NORTHAMERICA_RIVERS,
    labels: NORTHAMERICA_LABELS,
    decor: buildDecor(),
    styles: NORTHAMERICA_STYLES,
  };
}
