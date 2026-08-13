/**
 * ベネズエラの国コンテンツを組み立てる。
 *
 * legacy に無い、このリポジトリで書き起こした国(韓国・トルコ・ドイツ・
 * 中国と同じ扱い)。出力の形は抽出後のJSONと同一なので、以降の読み込み・
 * 検証・Domainへの写像は他国とまったく同じ経路を通る。
 */
import { VENEZUELA_BG, VENEZUELA_MARKS } from "./art.mjs";
import { VENEZUELA_CITIES, VENEZUELA_EDGES } from "./cities.mjs";
import {
  VENEZUELA_DOOM,
  VENEZUELA_ITEMS,
  VENEZUELA_META,
  VENEZUELA_REGIONS,
  VENEZUELA_SEASONS,
  VENEZUELA_SPIRIT,
} from "./flavour.mjs";
import {
  VENEZUELA_COLORS,
  VENEZUELA_LABELS,
  VENEZUELA_LAKES,
  VENEZUELA_LAND,
  VENEZUELA_PROJ,
  VENEZUELA_RIVERS,
  VENEZUELA_TERRAIN,
  renderVenezuelaDecor,
} from "./geography.mjs";
import { VENEZUELA_MONEY_EVENTS } from "./money-events.mjs";
import { VENEZUELA_STYLES } from "./music.mjs";
import { VENEZUELA_QUIZ } from "./quiz.mjs";

/** 盤面装飾は投影に依存するので、ここで一度だけ評価して文字列にする。 */
function buildDecor() {
  const p = VENEZUELA_PROJ;
  const px = (lon) => ((lon - p.LON0) / (p.LON1 - p.LON0)) * p.BW;
  const py = (lat) => ((lat - p.LAT0) / (p.LAT1 - p.LAT0)) * p.BH;
  return renderVenezuelaDecor(px, py);
}

export function buildVenezuelaContent() {
  return {
    id: VENEZUELA_META.id,
    name: VENEZUELA_META.name,
    blurb: VENEZUELA_META.blurb,
    cur: VENEZUELA_META.cur,
    start: VENEZUELA_META.start,
    cpuNames: VENEZUELA_META.cpuNames,
    proj: VENEZUELA_PROJ,
    regions: VENEZUELA_REGIONS,
    cities: VENEZUELA_CITIES,
    edges: VENEZUELA_EDGES,
    quiz: VENEZUELA_QUIZ,
    items: VENEZUELA_ITEMS,
    spirit: VENEZUELA_SPIRIT,
    doom: VENEZUELA_DOOM,
    seasons: VENEZUELA_SEASONS,
    moneyEvents: VENEZUELA_MONEY_EVENTS,
    stripe: VENEZUELA_META.stripe,
    marks: VENEZUELA_MARKS,
    bg: VENEZUELA_BG,
    sea: VENEZUELA_COLORS.sea,
    seaWave: VENEZUELA_COLORS.seaWave,
    landBase: VENEZUELA_COLORS.landBase,
    coast: VENEZUELA_COLORS.coast,
    land: VENEZUELA_LAND,
    terrain: VENEZUELA_TERRAIN,
    lakes: VENEZUELA_LAKES,
    rivers: VENEZUELA_RIVERS,
    labels: VENEZUELA_LABELS,
    decor: buildDecor(),
    styles: VENEZUELA_STYLES,
  };
}
