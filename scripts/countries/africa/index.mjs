/**
 * アフリカ大陸の国コンテンツを組み立てる。
 *
 * legacy に無い、このリポジトリで書き起こした大陸盤面(世界一周・韓国・
 * トルコ・イタリア・ドイツ・イギリス・中国・アジアと同じ扱い)。出力の形は
 * 抽出後のJSONと同一なので、以降の読み込み・検証・Domainへの写像は
 * 他国とまったく同じ経路を通る。
 */
import { AFRICA_BG, AFRICA_MARKS } from "./art.mjs";
import { AFRICA_CITIES, AFRICA_EDGES } from "./cities.mjs";
import {
  AFRICA_DOOM,
  AFRICA_ITEMS,
  AFRICA_META,
  AFRICA_REGIONS,
  AFRICA_SEASONS,
  AFRICA_SPIRIT,
} from "./flavour.mjs";
import {
  AFRICA_COLORS,
  AFRICA_LABELS,
  AFRICA_LAKES,
  AFRICA_LAND,
  AFRICA_PROJ,
  AFRICA_RIVERS,
  AFRICA_TERRAIN,
  renderAfricaDecor,
} from "./geography.mjs";
import { AFRICA_MONEY_EVENTS } from "./money-events.mjs";
import { AFRICA_STYLES } from "./music.mjs";
import { AFRICA_QUIZ } from "./quiz.mjs";

/** 盤面装飾は投影に依存するので、ここで一度だけ評価して文字列にする。 */
function buildDecor() {
  const p = AFRICA_PROJ;
  const px = (lon) => ((lon - p.LON0) / (p.LON1 - p.LON0)) * p.BW;
  const py = (lat) => ((lat - p.LAT0) / (p.LAT1 - p.LAT0)) * p.BH;
  return renderAfricaDecor(px, py);
}

export function buildAfricaContent() {
  return {
    id: AFRICA_META.id,
    name: AFRICA_META.name,
    blurb: AFRICA_META.blurb,
    cur: AFRICA_META.cur,
    start: AFRICA_META.start,
    cpuNames: AFRICA_META.cpuNames,
    proj: AFRICA_PROJ,
    regions: AFRICA_REGIONS,
    cities: AFRICA_CITIES,
    edges: AFRICA_EDGES,
    quiz: AFRICA_QUIZ,
    items: AFRICA_ITEMS,
    spirit: AFRICA_SPIRIT,
    doom: AFRICA_DOOM,
    seasons: AFRICA_SEASONS,
    moneyEvents: AFRICA_MONEY_EVENTS,
    stripe: AFRICA_META.stripe,
    marks: AFRICA_MARKS,
    bg: AFRICA_BG,
    sea: AFRICA_COLORS.sea,
    seaWave: AFRICA_COLORS.seaWave,
    landBase: AFRICA_COLORS.landBase,
    coast: AFRICA_COLORS.coast,
    land: AFRICA_LAND,
    terrain: AFRICA_TERRAIN,
    lakes: AFRICA_LAKES,
    rivers: AFRICA_RIVERS,
    labels: AFRICA_LABELS,
    decor: buildDecor(),
    styles: AFRICA_STYLES,
  };
}
