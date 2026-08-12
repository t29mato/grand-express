/**
 * トルコの国コンテンツを組み立てる。
 *
 * legacy に無い、このリポジトリで書き起こした国(インド・フランス・世界一周・
 * 茨城・韓国と同じ扱い)。出力の形は抽出後のJSONと同一なので、以降の読み込み・
 * 検証・Domainへの写像は他国とまったく同じ経路を通る。
 */
import { TURKEY_BG, TURKEY_MARKS } from "./art.mjs";
import { TURKEY_CITIES, TURKEY_EDGES } from "./cities.mjs";
import {
  TURKEY_DOOM,
  TURKEY_ITEMS,
  TURKEY_META,
  TURKEY_REGIONS,
  TURKEY_SEASONS,
  TURKEY_SPIRIT,
} from "./flavour.mjs";
import {
  TURKEY_COLORS,
  TURKEY_LABELS,
  TURKEY_LAKES,
  TURKEY_LAND,
  TURKEY_PROJ,
  TURKEY_RIVERS,
  TURKEY_TERRAIN,
  renderTurkeyDecor,
} from "./geography.mjs";
import { TURKEY_MONEY_EVENTS } from "./money-events.mjs";
import { TURKEY_STYLES } from "./music.mjs";
import { TURKEY_QUIZ } from "./quiz.mjs";

/** 盤面装飾は投影に依存するので、ここで一度だけ評価して文字列にする。 */
function buildDecor() {
  const p = TURKEY_PROJ;
  const px = (lon) => ((lon - p.LON0) / (p.LON1 - p.LON0)) * p.BW;
  const py = (lat) => ((lat - p.LAT0) / (p.LAT1 - p.LAT0)) * p.BH;
  return renderTurkeyDecor(px, py);
}

export function buildTurkeyContent() {
  return {
    id: TURKEY_META.id,
    name: TURKEY_META.name,
    blurb: TURKEY_META.blurb,
    cur: TURKEY_META.cur,
    start: TURKEY_META.start,
    cpuNames: TURKEY_META.cpuNames,
    proj: TURKEY_PROJ,
    regions: TURKEY_REGIONS,
    cities: TURKEY_CITIES,
    edges: TURKEY_EDGES,
    quiz: TURKEY_QUIZ,
    items: TURKEY_ITEMS,
    spirit: TURKEY_SPIRIT,
    doom: TURKEY_DOOM,
    seasons: TURKEY_SEASONS,
    moneyEvents: TURKEY_MONEY_EVENTS,
    stripe: TURKEY_META.stripe,
    marks: TURKEY_MARKS,
    bg: TURKEY_BG,
    sea: TURKEY_COLORS.sea,
    seaWave: TURKEY_COLORS.seaWave,
    landBase: TURKEY_COLORS.landBase,
    coast: TURKEY_COLORS.coast,
    land: TURKEY_LAND,
    terrain: TURKEY_TERRAIN,
    lakes: TURKEY_LAKES,
    rivers: TURKEY_RIVERS,
    labels: TURKEY_LABELS,
    decor: buildDecor(),
    styles: TURKEY_STYLES,
  };
}
