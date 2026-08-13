/**
 * 南アメリカ大陸のコンテンツを組み立てる。
 *
 * legacy に無い、このリポジトリで書き起こした大陸(韓国・インド・フランス・
 * 世界一周・茨城と同じ扱い)。出力の形は抽出後のJSONと同一なので、以降の
 * 読み込み・検証・Domainへの写像は他国とまったく同じ経路を通る。
 */
import { SOUTHAMERICA_BG, SOUTHAMERICA_MARKS } from "./art.mjs";
import { SOUTHAMERICA_CITIES, SOUTHAMERICA_EDGES } from "./cities.mjs";
import {
  SOUTHAMERICA_DOOM,
  SOUTHAMERICA_ITEMS,
  SOUTHAMERICA_META,
  SOUTHAMERICA_REGIONS,
  SOUTHAMERICA_SEASONS,
  SOUTHAMERICA_SPIRIT,
} from "./flavour.mjs";
import {
  SOUTHAMERICA_COLORS,
  SOUTHAMERICA_LABELS,
  SOUTHAMERICA_LAKES,
  SOUTHAMERICA_LAND,
  SOUTHAMERICA_PROJ,
  SOUTHAMERICA_RIVERS,
  SOUTHAMERICA_TERRAIN,
  renderSouthAmericaDecor,
} from "./geography.mjs";
import { SOUTHAMERICA_MONEY_EVENTS } from "./money-events.mjs";
import { SOUTHAMERICA_STYLES } from "./music.mjs";
import { SOUTHAMERICA_QUIZ } from "./quiz.mjs";

/** 盤面装飾は投影に依存するので、ここで一度だけ評価して文字列にする。 */
function buildDecor() {
  const p = SOUTHAMERICA_PROJ;
  const px = (lon) => ((lon - p.LON0) / (p.LON1 - p.LON0)) * p.BW;
  const py = (lat) => ((lat - p.LAT0) / (p.LAT1 - p.LAT0)) * p.BH;
  return renderSouthAmericaDecor(px, py);
}

export function buildSouthAmericaContent() {
  return {
    id: SOUTHAMERICA_META.id,
    name: SOUTHAMERICA_META.name,
    blurb: SOUTHAMERICA_META.blurb,
    cur: SOUTHAMERICA_META.cur,
    start: SOUTHAMERICA_META.start,
    cpuNames: SOUTHAMERICA_META.cpuNames,
    proj: SOUTHAMERICA_PROJ,
    regions: SOUTHAMERICA_REGIONS,
    cities: SOUTHAMERICA_CITIES,
    edges: SOUTHAMERICA_EDGES,
    quiz: SOUTHAMERICA_QUIZ,
    items: SOUTHAMERICA_ITEMS,
    spirit: SOUTHAMERICA_SPIRIT,
    doom: SOUTHAMERICA_DOOM,
    seasons: SOUTHAMERICA_SEASONS,
    moneyEvents: SOUTHAMERICA_MONEY_EVENTS,
    stripe: SOUTHAMERICA_META.stripe,
    marks: SOUTHAMERICA_MARKS,
    bg: SOUTHAMERICA_BG,
    sea: SOUTHAMERICA_COLORS.sea,
    seaWave: SOUTHAMERICA_COLORS.seaWave,
    landBase: SOUTHAMERICA_COLORS.landBase,
    coast: SOUTHAMERICA_COLORS.coast,
    land: SOUTHAMERICA_LAND,
    terrain: SOUTHAMERICA_TERRAIN,
    lakes: SOUTHAMERICA_LAKES,
    rivers: SOUTHAMERICA_RIVERS,
    labels: SOUTHAMERICA_LABELS,
    decor: buildDecor(),
    styles: SOUTHAMERICA_STYLES,
  };
}
