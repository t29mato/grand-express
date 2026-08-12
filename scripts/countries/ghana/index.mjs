/**
 * ガーナの国コンテンツを組み立てる。
 *
 * legacy に無い、このリポジトリで書き起こした国(インド・フランス・世界一周・
 * 茨城・韓国・イタリアと同じ扱い)。出力の形は抽出後のJSONと同一なので、以降の読み込み・
 * 検証・Domainへの写像は他国とまったく同じ経路を通る。
 */
import { GHANA_BG, GHANA_MARKS } from "./art.mjs";
import { GHANA_CITIES, GHANA_EDGES } from "./cities.mjs";
import {
  GHANA_DOOM,
  GHANA_ITEMS,
  GHANA_META,
  GHANA_REGIONS,
  GHANA_SEASONS,
  GHANA_SPIRIT,
} from "./flavour.mjs";
import {
  GHANA_COLORS,
  GHANA_LABELS,
  GHANA_LAKES,
  GHANA_LAND,
  GHANA_PROJ,
  GHANA_RIVERS,
  GHANA_TERRAIN,
  renderGhanaDecor,
} from "./geography.mjs";
import { GHANA_MONEY_EVENTS } from "./money-events.mjs";
import { GHANA_STYLES } from "./music.mjs";
import { GHANA_QUIZ } from "./quiz.mjs";

/** 盤面装飾は投影に依存するので、ここで一度だけ評価して文字列にする。 */
function buildDecor() {
  const p = GHANA_PROJ;
  const px = (lon) => ((lon - p.LON0) / (p.LON1 - p.LON0)) * p.BW;
  const py = (lat) => ((lat - p.LAT0) / (p.LAT1 - p.LAT0)) * p.BH;
  return renderGhanaDecor(px, py);
}

export function buildGhanaContent() {
  return {
    id: GHANA_META.id,
    name: GHANA_META.name,
    blurb: GHANA_META.blurb,
    cur: GHANA_META.cur,
    start: GHANA_META.start,
    cpuNames: GHANA_META.cpuNames,
    proj: GHANA_PROJ,
    regions: GHANA_REGIONS,
    cities: GHANA_CITIES,
    edges: GHANA_EDGES,
    quiz: GHANA_QUIZ,
    items: GHANA_ITEMS,
    spirit: GHANA_SPIRIT,
    doom: GHANA_DOOM,
    seasons: GHANA_SEASONS,
    moneyEvents: GHANA_MONEY_EVENTS,
    stripe: GHANA_META.stripe,
    marks: GHANA_MARKS,
    bg: GHANA_BG,
    sea: GHANA_COLORS.sea,
    seaWave: GHANA_COLORS.seaWave,
    landBase: GHANA_COLORS.landBase,
    coast: GHANA_COLORS.coast,
    land: GHANA_LAND,
    terrain: GHANA_TERRAIN,
    lakes: GHANA_LAKES,
    rivers: GHANA_RIVERS,
    labels: GHANA_LABELS,
    decor: buildDecor(),
    styles: GHANA_STYLES,
  };
}
