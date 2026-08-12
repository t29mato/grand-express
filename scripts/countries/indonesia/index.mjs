/**
 * インドネシアの国コンテンツを組み立てる。
 *
 * legacy に無い、このリポジトリで書き起こした国(インド・フランス・世界一周・
 * 茨城・韓国・イタリアと同じ扱い)。出力の形は抽出後のJSONと同一なので、以降の
 * 読み込み・検証・Domainへの写像は他国とまったく同じ経路を通る。
 */
import { INDONESIA_BG, INDONESIA_MARKS } from "./art.mjs";
import { INDONESIA_CITIES, INDONESIA_EDGES } from "./cities.mjs";
import {
  INDONESIA_DOOM,
  INDONESIA_ITEMS,
  INDONESIA_META,
  INDONESIA_REGIONS,
  INDONESIA_SEASONS,
  INDONESIA_SPIRIT,
} from "./flavour.mjs";
import {
  INDONESIA_COLORS,
  INDONESIA_LABELS,
  INDONESIA_LAKES,
  INDONESIA_LAND,
  INDONESIA_PROJ,
  INDONESIA_RIVERS,
  INDONESIA_TERRAIN,
  renderIndonesiaDecor,
} from "./geography.mjs";
import { INDONESIA_MONEY_EVENTS } from "./money-events.mjs";
import { INDONESIA_STYLES } from "./music.mjs";
import { INDONESIA_QUIZ } from "./quiz.mjs";

/** 盤面装飾は投影に依存するので、ここで一度だけ評価して文字列にする。 */
function buildDecor() {
  const p = INDONESIA_PROJ;
  const px = (lon) => ((lon - p.LON0) / (p.LON1 - p.LON0)) * p.BW;
  const py = (lat) => ((lat - p.LAT0) / (p.LAT1 - p.LAT0)) * p.BH;
  return renderIndonesiaDecor(px, py);
}

export function buildIndonesiaContent() {
  return {
    id: INDONESIA_META.id,
    name: INDONESIA_META.name,
    blurb: INDONESIA_META.blurb,
    cur: INDONESIA_META.cur,
    start: INDONESIA_META.start,
    cpuNames: INDONESIA_META.cpuNames,
    proj: INDONESIA_PROJ,
    regions: INDONESIA_REGIONS,
    cities: INDONESIA_CITIES,
    edges: INDONESIA_EDGES,
    quiz: INDONESIA_QUIZ,
    items: INDONESIA_ITEMS,
    spirit: INDONESIA_SPIRIT,
    doom: INDONESIA_DOOM,
    seasons: INDONESIA_SEASONS,
    moneyEvents: INDONESIA_MONEY_EVENTS,
    stripe: INDONESIA_META.stripe,
    marks: INDONESIA_MARKS,
    bg: INDONESIA_BG,
    sea: INDONESIA_COLORS.sea,
    seaWave: INDONESIA_COLORS.seaWave,
    landBase: INDONESIA_COLORS.landBase,
    coast: INDONESIA_COLORS.coast,
    land: INDONESIA_LAND,
    terrain: INDONESIA_TERRAIN,
    lakes: INDONESIA_LAKES,
    rivers: INDONESIA_RIVERS,
    labels: INDONESIA_LABELS,
    decor: buildDecor(),
    styles: INDONESIA_STYLES,
  };
}
