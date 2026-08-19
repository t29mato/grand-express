/**
 * ノルウェーの国コンテンツを組み立てる。
 *
 * legacy に無い、このリポジトリで書き起こした国(インド・フランス・韓国と
 * 同じ扱い)。出力の形は抽出後のJSONと同一なので、以降の読み込み・検証・
 * Domainへの写像は他国とまったく同じ経路を通る。
 *
 * `art.mjs`(NORWAY_BG / NORWAY_MARKS)は絵の担当が別途作成する。
 * 鍵の一覧と説明は `ART-KEYS.md` を参照。
 */
import { NORWAY_BG, NORWAY_MARKS } from "./art.mjs";
import { NORWAY_CITIES, NORWAY_EDGES } from "./cities.mjs";
import {
  NORWAY_DOOM,
  NORWAY_ITEMS,
  NORWAY_META,
  NORWAY_REGIONS,
  NORWAY_SEASONS,
  NORWAY_SPIRIT,
} from "./flavour.mjs";
import {
  NORWAY_COLORS,
  NORWAY_LABELS,
  NORWAY_LAKES,
  NORWAY_LAND,
  NORWAY_PROJ,
  NORWAY_RIVERS,
  NORWAY_TERRAIN,
  renderNorwayDecor,
} from "./geography.mjs";
import { NORWAY_MONEY_EVENTS } from "./money-events.mjs";
import { NORWAY_STYLES } from "./music.mjs";
import { NORWAY_QUIZ } from "./quiz.mjs";

/** 盤面装飾は投影に依存するので、ここで一度だけ評価して文字列にする。 */
function buildDecor() {
  const p = NORWAY_PROJ;
  const px = (lon) => ((lon - p.LON0) / (p.LON1 - p.LON0)) * p.BW;
  const py = (lat) => ((lat - p.LAT0) / (p.LAT1 - p.LAT0)) * p.BH;
  return renderNorwayDecor(px, py);
}

export function buildNorwayContent() {
  return {
    id: NORWAY_META.id,
    name: NORWAY_META.name,
    blurb: NORWAY_META.blurb,
    cur: NORWAY_META.cur,
    start: NORWAY_META.start,
    cpuNames: NORWAY_META.cpuNames,
    proj: NORWAY_PROJ,
    regions: NORWAY_REGIONS,
    cities: NORWAY_CITIES,
    edges: NORWAY_EDGES,
    quiz: NORWAY_QUIZ,
    items: NORWAY_ITEMS,
    spirit: NORWAY_SPIRIT,
    doom: NORWAY_DOOM,
    seasons: NORWAY_SEASONS,
    moneyEvents: NORWAY_MONEY_EVENTS,
    stripe: NORWAY_META.stripe,
    marks: NORWAY_MARKS,
    bg: NORWAY_BG,
    sea: NORWAY_COLORS.sea,
    seaWave: NORWAY_COLORS.seaWave,
    landBase: NORWAY_COLORS.landBase,
    coast: NORWAY_COLORS.coast,
    land: NORWAY_LAND,
    terrain: NORWAY_TERRAIN,
    lakes: NORWAY_LAKES,
    rivers: NORWAY_RIVERS,
    labels: NORWAY_LABELS,
    decor: buildDecor(),
    styles: NORWAY_STYLES,
  };
}
