/**
 * モロッコの国コンテンツを組み立てる。
 *
 * legacy に無い、このリポジトリで書き起こした国(インド・フランス・世界一周・
 * 茨城・韓国・イタリアと同じ扱い)。出力の形は抽出後のJSONと同一なので、以降の読み込み・
 * 検証・Domainへの写像は他国とまったく同じ経路を通る。
 */
import { MOROCCO_BG, MOROCCO_MARKS } from "./art.mjs";
import { MOROCCO_CITIES, MOROCCO_EDGES } from "./cities.mjs";
import {
  MOROCCO_DOOM,
  MOROCCO_ITEMS,
  MOROCCO_META,
  MOROCCO_REGIONS,
  MOROCCO_SEASONS,
  MOROCCO_SPIRIT,
} from "./flavour.mjs";
import {
  MOROCCO_COLORS,
  MOROCCO_LABELS,
  MOROCCO_LAKES,
  MOROCCO_LAND,
  MOROCCO_PROJ,
  MOROCCO_RIVERS,
  MOROCCO_TERRAIN,
  renderMoroccoDecor,
} from "./geography.mjs";
import { MOROCCO_MONEY_EVENTS } from "./money-events.mjs";
import { MOROCCO_STYLES } from "./music.mjs";
import { MOROCCO_QUIZ } from "./quiz.mjs";

/** 盤面装飾は投影に依存するので、ここで一度だけ評価して文字列にする。 */
function buildDecor() {
  const p = MOROCCO_PROJ;
  const px = (lon) => ((lon - p.LON0) / (p.LON1 - p.LON0)) * p.BW;
  const py = (lat) => ((lat - p.LAT0) / (p.LAT1 - p.LAT0)) * p.BH;
  return renderMoroccoDecor(px, py);
}

export function buildMoroccoContent() {
  return {
    id: MOROCCO_META.id,
    name: MOROCCO_META.name,
    blurb: MOROCCO_META.blurb,
    cur: MOROCCO_META.cur,
    start: MOROCCO_META.start,
    cpuNames: MOROCCO_META.cpuNames,
    proj: MOROCCO_PROJ,
    regions: MOROCCO_REGIONS,
    cities: MOROCCO_CITIES,
    edges: MOROCCO_EDGES,
    quiz: MOROCCO_QUIZ,
    items: MOROCCO_ITEMS,
    spirit: MOROCCO_SPIRIT,
    doom: MOROCCO_DOOM,
    seasons: MOROCCO_SEASONS,
    moneyEvents: MOROCCO_MONEY_EVENTS,
    stripe: MOROCCO_META.stripe,
    marks: MOROCCO_MARKS,
    bg: MOROCCO_BG,
    sea: MOROCCO_COLORS.sea,
    seaWave: MOROCCO_COLORS.seaWave,
    landBase: MOROCCO_COLORS.landBase,
    coast: MOROCCO_COLORS.coast,
    land: MOROCCO_LAND,
    terrain: MOROCCO_TERRAIN,
    lakes: MOROCCO_LAKES,
    rivers: MOROCCO_RIVERS,
    labels: MOROCCO_LABELS,
    decor: buildDecor(),
    styles: MOROCCO_STYLES,
  };
}
