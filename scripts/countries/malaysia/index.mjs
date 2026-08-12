/**
 * マレーシアの国コンテンツを組み立てる。
 *
 * legacy に無い、このリポジトリで書き起こした国(インド・フランス・世界一周・
 * 茨城・韓国・トルコ・イタリアと同じ扱い)。出力の形は抽出後のJSONと同一なので、
 * 以降の読み込み・検証・Domainへの写像は他国とまったく同じ経路を通る。
 */
import { MALAYSIA_BG, MALAYSIA_MARKS } from "./art.mjs";
import { MALAYSIA_CITIES, MALAYSIA_EDGES } from "./cities.mjs";
import {
  MALAYSIA_DOOM,
  MALAYSIA_ITEMS,
  MALAYSIA_META,
  MALAYSIA_REGIONS,
  MALAYSIA_SEASONS,
  MALAYSIA_SPIRIT,
} from "./flavour.mjs";
import {
  MALAYSIA_COLORS,
  MALAYSIA_LABELS,
  MALAYSIA_LAKES,
  MALAYSIA_LAND,
  MALAYSIA_PROJ,
  MALAYSIA_RIVERS,
  MALAYSIA_TERRAIN,
  renderMalaysiaDecor,
} from "./geography.mjs";
import { MALAYSIA_MONEY_EVENTS } from "./money-events.mjs";
import { MALAYSIA_STYLES } from "./music.mjs";
import { MALAYSIA_QUIZ } from "./quiz.mjs";

/** 盤面装飾は投影に依存するので、ここで一度だけ評価して文字列にする。 */
function buildDecor() {
  const p = MALAYSIA_PROJ;
  const px = (lon) => ((lon - p.LON0) / (p.LON1 - p.LON0)) * p.BW;
  const py = (lat) => ((lat - p.LAT0) / (p.LAT1 - p.LAT0)) * p.BH;
  return renderMalaysiaDecor(px, py);
}

export function buildMalaysiaContent() {
  return {
    id: MALAYSIA_META.id,
    name: MALAYSIA_META.name,
    blurb: MALAYSIA_META.blurb,
    cur: MALAYSIA_META.cur,
    start: MALAYSIA_META.start,
    cpuNames: MALAYSIA_META.cpuNames,
    proj: MALAYSIA_PROJ,
    regions: MALAYSIA_REGIONS,
    cities: MALAYSIA_CITIES,
    edges: MALAYSIA_EDGES,
    quiz: MALAYSIA_QUIZ,
    items: MALAYSIA_ITEMS,
    spirit: MALAYSIA_SPIRIT,
    doom: MALAYSIA_DOOM,
    seasons: MALAYSIA_SEASONS,
    moneyEvents: MALAYSIA_MONEY_EVENTS,
    stripe: MALAYSIA_META.stripe,
    marks: MALAYSIA_MARKS,
    bg: MALAYSIA_BG,
    sea: MALAYSIA_COLORS.sea,
    seaWave: MALAYSIA_COLORS.seaWave,
    landBase: MALAYSIA_COLORS.landBase,
    coast: MALAYSIA_COLORS.coast,
    land: MALAYSIA_LAND,
    terrain: MALAYSIA_TERRAIN,
    lakes: MALAYSIA_LAKES,
    rivers: MALAYSIA_RIVERS,
    labels: MALAYSIA_LABELS,
    decor: buildDecor(),
    styles: MALAYSIA_STYLES,
  };
}
