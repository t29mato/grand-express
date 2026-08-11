/**
 * 韓国の国コンテンツを組み立てる。
 *
 * legacy に無い、このリポジトリで書き起こした国(インド・フランス・世界一周・
 * 茨城と同じ扱い)。出力の形は抽出後のJSONと同一なので、以降の読み込み・
 * 検証・Domainへの写像は他国とまったく同じ経路を通る。
 */
import { KOREA_BG, KOREA_MARKS } from "./art.mjs";
import { KOREA_CITIES, KOREA_EDGES } from "./cities.mjs";
import {
  KOREA_DOOM,
  KOREA_ITEMS,
  KOREA_META,
  KOREA_REGIONS,
  KOREA_SEASONS,
  KOREA_SPIRIT,
} from "./flavour.mjs";
import {
  KOREA_COLORS,
  KOREA_LABELS,
  KOREA_LAKES,
  KOREA_LAND,
  KOREA_PROJ,
  KOREA_RIVERS,
  KOREA_TERRAIN,
  renderKoreaDecor,
} from "./geography.mjs";
import { KOREA_MONEY_EVENTS } from "./money-events.mjs";
import { KOREA_STYLES } from "./music.mjs";
import { KOREA_QUIZ } from "./quiz.mjs";

/** 盤面装飾は投影に依存するので、ここで一度だけ評価して文字列にする。 */
function buildDecor() {
  const p = KOREA_PROJ;
  const px = (lon) => ((lon - p.LON0) / (p.LON1 - p.LON0)) * p.BW;
  const py = (lat) => ((lat - p.LAT0) / (p.LAT1 - p.LAT0)) * p.BH;
  return renderKoreaDecor(px, py);
}

export function buildKoreaContent() {
  return {
    id: KOREA_META.id,
    name: KOREA_META.name,
    blurb: KOREA_META.blurb,
    cur: KOREA_META.cur,
    start: KOREA_META.start,
    cpuNames: KOREA_META.cpuNames,
    proj: KOREA_PROJ,
    regions: KOREA_REGIONS,
    cities: KOREA_CITIES,
    edges: KOREA_EDGES,
    quiz: KOREA_QUIZ,
    items: KOREA_ITEMS,
    spirit: KOREA_SPIRIT,
    doom: KOREA_DOOM,
    seasons: KOREA_SEASONS,
    moneyEvents: KOREA_MONEY_EVENTS,
    stripe: KOREA_META.stripe,
    marks: KOREA_MARKS,
    bg: KOREA_BG,
    sea: KOREA_COLORS.sea,
    seaWave: KOREA_COLORS.seaWave,
    landBase: KOREA_COLORS.landBase,
    coast: KOREA_COLORS.coast,
    land: KOREA_LAND,
    terrain: KOREA_TERRAIN,
    lakes: KOREA_LAKES,
    rivers: KOREA_RIVERS,
    labels: KOREA_LABELS,
    decor: buildDecor(),
    styles: KOREA_STYLES,
  };
}
