/**
 * ドイツの国コンテンツを組み立てる。
 *
 * legacy に無い、このリポジトリで書き起こした国(インド・フランス・世界一周・
 * 茨城・韓国と同じ扱い)。出力の形は抽出後のJSONと同一なので、以降の読み込み・
 * 検証・Domainへの写像は他国とまったく同じ経路を通る。
 */
import { GERMANY_BG, GERMANY_MARKS } from "./art.mjs";
import { GERMANY_CITIES, GERMANY_EDGES } from "./cities.mjs";
import {
  GERMANY_DOOM,
  GERMANY_ITEMS,
  GERMANY_META,
  GERMANY_REGIONS,
  GERMANY_SEASONS,
  GERMANY_SPIRIT,
} from "./flavour.mjs";
import {
  GERMANY_COLORS,
  GERMANY_LABELS,
  GERMANY_LAKES,
  GERMANY_LAND,
  GERMANY_PROJ,
  GERMANY_RIVERS,
  GERMANY_TERRAIN,
  renderGermanyDecor,
} from "./geography.mjs";
import { GERMANY_MONEY_EVENTS } from "./money-events.mjs";
import { GERMANY_STYLES } from "./music.mjs";
import { GERMANY_QUIZ } from "./quiz.mjs";

/** 盤面装飾は投影に依存するので、ここで一度だけ評価して文字列にする。 */
function buildDecor() {
  const p = GERMANY_PROJ;
  const px = (lon) => ((lon - p.LON0) / (p.LON1 - p.LON0)) * p.BW;
  const py = (lat) => ((lat - p.LAT0) / (p.LAT1 - p.LAT0)) * p.BH;
  return renderGermanyDecor(px, py);
}

export function buildGermanyContent() {
  return {
    id: GERMANY_META.id,
    name: GERMANY_META.name,
    blurb: GERMANY_META.blurb,
    cur: GERMANY_META.cur,
    start: GERMANY_META.start,
    cpuNames: GERMANY_META.cpuNames,
    proj: GERMANY_PROJ,
    regions: GERMANY_REGIONS,
    cities: GERMANY_CITIES,
    edges: GERMANY_EDGES,
    quiz: GERMANY_QUIZ,
    items: GERMANY_ITEMS,
    spirit: GERMANY_SPIRIT,
    doom: GERMANY_DOOM,
    seasons: GERMANY_SEASONS,
    moneyEvents: GERMANY_MONEY_EVENTS,
    stripe: GERMANY_META.stripe,
    marks: GERMANY_MARKS,
    bg: GERMANY_BG,
    sea: GERMANY_COLORS.sea,
    seaWave: GERMANY_COLORS.seaWave,
    landBase: GERMANY_COLORS.landBase,
    coast: GERMANY_COLORS.coast,
    land: GERMANY_LAND,
    terrain: GERMANY_TERRAIN,
    lakes: GERMANY_LAKES,
    rivers: GERMANY_RIVERS,
    labels: GERMANY_LABELS,
    decor: buildDecor(),
    styles: GERMANY_STYLES,
  };
}
