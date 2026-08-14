/**
 * アジア大陸の国コンテンツを組み立てる。
 *
 * legacy に無い、このリポジトリで書き起こした大陸盤面(世界一周・韓国・
 * トルコ・イタリア・ドイツ・イギリス・中国と同じ扱い)。出力の形は
 * 抽出後のJSONと同一なので、以降の読み込み・検証・Domainへの写像は
 * 他国とまったく同じ経路を通る。
 */
import { ASIA_BG, ASIA_MARKS } from "./art.mjs";
import { ASIA_CITIES, ASIA_EDGES } from "./cities.mjs";
import {
  ASIA_DOOM,
  ASIA_ITEMS,
  ASIA_META,
  ASIA_REGIONS,
  ASIA_SEASONS,
  ASIA_SPIRIT,
} from "./flavour.mjs";
import {
  ASIA_COLORS,
  ASIA_LABELS,
  ASIA_LAKES,
  ASIA_LAND,
  ASIA_PROJ,
  ASIA_RIVERS,
  ASIA_TERRAIN,
  renderAsiaDecor,
} from "./geography.mjs";
import { ASIA_MONEY_EVENTS } from "./money-events.mjs";
import { ASIA_STYLES } from "./music.mjs";
import { ASIA_QUIZ } from "./quiz.mjs";

/** 盤面装飾は投影に依存するので、ここで一度だけ評価して文字列にする。 */
function buildDecor() {
  const p = ASIA_PROJ;
  const px = (lon) => ((lon - p.LON0) / (p.LON1 - p.LON0)) * p.BW;
  const py = (lat) => ((lat - p.LAT0) / (p.LAT1 - p.LAT0)) * p.BH;
  return renderAsiaDecor(px, py);
}

export function buildAsiaContent() {
  return {
    id: ASIA_META.id,
    name: ASIA_META.name,
    blurb: ASIA_META.blurb,
    cur: ASIA_META.cur,
    start: ASIA_META.start,
    cpuNames: ASIA_META.cpuNames,
    proj: ASIA_PROJ,
    regions: ASIA_REGIONS,
    cities: ASIA_CITIES,
    edges: ASIA_EDGES,
    quiz: ASIA_QUIZ,
    items: ASIA_ITEMS,
    spirit: ASIA_SPIRIT,
    doom: ASIA_DOOM,
    seasons: ASIA_SEASONS,
    moneyEvents: ASIA_MONEY_EVENTS,
    stripe: ASIA_META.stripe,
    marks: ASIA_MARKS,
    bg: ASIA_BG,
    sea: ASIA_COLORS.sea,
    seaWave: ASIA_COLORS.seaWave,
    landBase: ASIA_COLORS.landBase,
    coast: ASIA_COLORS.coast,
    land: ASIA_LAND,
    terrain: ASIA_TERRAIN,
    lakes: ASIA_LAKES,
    rivers: ASIA_RIVERS,
    labels: ASIA_LABELS,
    decor: buildDecor(),
    styles: ASIA_STYLES,
  };
}
