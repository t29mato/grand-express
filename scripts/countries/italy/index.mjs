/**
 * イタリアの国コンテンツを組み立てる。
 *
 * legacy に無い、このリポジトリで書き起こした国(インド・フランス・世界一周・
 * 茨城・韓国と同じ扱い)。出力の形は抽出後のJSONと同一なので、以降の読み込み・
 * 検証・Domainへの写像は他国とまったく同じ経路を通る。
 */
import { ITALY_BG, ITALY_MARKS } from "./art.mjs";
import { ITALY_CITIES, ITALY_EDGES } from "./cities.mjs";
import {
  ITALY_DOOM,
  ITALY_ITEMS,
  ITALY_META,
  ITALY_REGIONS,
  ITALY_SEASONS,
  ITALY_SPIRIT,
} from "./flavour.mjs";
import {
  ITALY_COLORS,
  ITALY_LABELS,
  ITALY_LAKES,
  ITALY_LAND,
  ITALY_PROJ,
  ITALY_RIVERS,
  ITALY_TERRAIN,
  renderItalyDecor,
} from "./geography.mjs";
import { ITALY_MONEY_EVENTS } from "./money-events.mjs";
import { ITALY_STYLES } from "./music.mjs";
import { ITALY_QUIZ } from "./quiz.mjs";

/** 盤面装飾は投影に依存するので、ここで一度だけ評価して文字列にする。 */
function buildDecor() {
  const p = ITALY_PROJ;
  const px = (lon) => ((lon - p.LON0) / (p.LON1 - p.LON0)) * p.BW;
  const py = (lat) => ((lat - p.LAT0) / (p.LAT1 - p.LAT0)) * p.BH;
  return renderItalyDecor(px, py);
}

export function buildItalyContent() {
  return {
    id: ITALY_META.id,
    name: ITALY_META.name,
    blurb: ITALY_META.blurb,
    cur: ITALY_META.cur,
    start: ITALY_META.start,
    cpuNames: ITALY_META.cpuNames,
    proj: ITALY_PROJ,
    regions: ITALY_REGIONS,
    cities: ITALY_CITIES,
    edges: ITALY_EDGES,
    quiz: ITALY_QUIZ,
    items: ITALY_ITEMS,
    spirit: ITALY_SPIRIT,
    doom: ITALY_DOOM,
    seasons: ITALY_SEASONS,
    moneyEvents: ITALY_MONEY_EVENTS,
    stripe: ITALY_META.stripe,
    marks: ITALY_MARKS,
    bg: ITALY_BG,
    sea: ITALY_COLORS.sea,
    seaWave: ITALY_COLORS.seaWave,
    landBase: ITALY_COLORS.landBase,
    coast: ITALY_COLORS.coast,
    land: ITALY_LAND,
    terrain: ITALY_TERRAIN,
    lakes: ITALY_LAKES,
    rivers: ITALY_RIVERS,
    labels: ITALY_LABELS,
    decor: buildDecor(),
    styles: ITALY_STYLES,
  };
}
