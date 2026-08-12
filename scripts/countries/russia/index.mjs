/**
 * ロシアの国コンテンツを組み立てる。
 *
 * legacy に無い、このリポジトリで書き起こした国(インド・フランス・世界一周・
 * 茨城・韓国・イタリアと同じ扱い)。出力の形は抽出後のJSONと同一なので、以降の読み込み・
 * 検証・Domainへの写像は他国とまったく同じ経路を通る。
 */
import { RUSSIA_BG, RUSSIA_MARKS } from "./art.mjs";
import { RUSSIA_CITIES, RUSSIA_EDGES } from "./cities.mjs";
import {
  RUSSIA_DOOM,
  RUSSIA_ITEMS,
  RUSSIA_META,
  RUSSIA_REGIONS,
  RUSSIA_SEASONS,
  RUSSIA_SPIRIT,
} from "./flavour.mjs";
import {
  RUSSIA_COLORS,
  RUSSIA_LABELS,
  RUSSIA_LAKES,
  RUSSIA_LAND,
  RUSSIA_PROJ,
  RUSSIA_RIVERS,
  RUSSIA_TERRAIN,
  renderRussiaDecor,
} from "./geography.mjs";
import { RUSSIA_MONEY_EVENTS } from "./money-events.mjs";
import { RUSSIA_STYLES } from "./music.mjs";
import { RUSSIA_QUIZ } from "./quiz.mjs";

/** 盤面装飾は投影に依存するので、ここで一度だけ評価して文字列にする。 */
function buildDecor() {
  const p = RUSSIA_PROJ;
  const px = (lon) => ((lon - p.LON0) / (p.LON1 - p.LON0)) * p.BW;
  const py = (lat) => ((lat - p.LAT0) / (p.LAT1 - p.LAT0)) * p.BH;
  return renderRussiaDecor(px, py);
}

export function buildRussiaContent() {
  return {
    id: RUSSIA_META.id,
    name: RUSSIA_META.name,
    blurb: RUSSIA_META.blurb,
    cur: RUSSIA_META.cur,
    start: RUSSIA_META.start,
    cpuNames: RUSSIA_META.cpuNames,
    proj: RUSSIA_PROJ,
    regions: RUSSIA_REGIONS,
    cities: RUSSIA_CITIES,
    edges: RUSSIA_EDGES,
    quiz: RUSSIA_QUIZ,
    items: RUSSIA_ITEMS,
    spirit: RUSSIA_SPIRIT,
    doom: RUSSIA_DOOM,
    seasons: RUSSIA_SEASONS,
    moneyEvents: RUSSIA_MONEY_EVENTS,
    stripe: RUSSIA_META.stripe,
    marks: RUSSIA_MARKS,
    bg: RUSSIA_BG,
    sea: RUSSIA_COLORS.sea,
    seaWave: RUSSIA_COLORS.seaWave,
    landBase: RUSSIA_COLORS.landBase,
    coast: RUSSIA_COLORS.coast,
    land: RUSSIA_LAND,
    terrain: RUSSIA_TERRAIN,
    lakes: RUSSIA_LAKES,
    rivers: RUSSIA_RIVERS,
    labels: RUSSIA_LABELS,
    decor: buildDecor(),
    styles: RUSSIA_STYLES,
  };
}
