/**
 * ニュージーランドの国コンテンツを組み立てる。
 *
 * legacy に無い、このリポジトリで書き起こした国(韓国・オーストラリア・
 * インドと同じ扱い)。出力の形は抽出後のJSONと同一なので、以降の読み込み・
 * 検証・Domainへの写像は他国とまったく同じ経路を通る。
 *
 * `art.mjs`(mark/bg のSVG)は別担当(board-artist)が描くため、ここでは
 * import するだけで自分では書かない。
 */
import { NEWZEALAND_BG, NEWZEALAND_MARKS } from "./art.mjs";
import { NEWZEALAND_CITIES, NEWZEALAND_EDGES } from "./cities.mjs";
import {
  NEWZEALAND_DOOM,
  NEWZEALAND_ITEMS,
  NEWZEALAND_META,
  NEWZEALAND_REGIONS,
  NEWZEALAND_SEASONS,
  NEWZEALAND_SPIRIT,
} from "./flavour.mjs";
import {
  NEWZEALAND_COLORS,
  NEWZEALAND_LABELS,
  NEWZEALAND_LAKES,
  NEWZEALAND_LAND,
  NEWZEALAND_PROJ,
  NEWZEALAND_RIVERS,
  NEWZEALAND_TERRAIN,
  renderNewZealandDecor,
} from "./geography.mjs";
import { NEWZEALAND_MONEY_EVENTS } from "./money-events.mjs";
import { NEWZEALAND_STYLES } from "./music.mjs";
import { NEWZEALAND_QUIZ } from "./quiz.mjs";

/** 盤面装飾は投影に依存するので、ここで一度だけ評価して文字列にする。 */
function buildDecor() {
  const p = NEWZEALAND_PROJ;
  const px = (lon) => ((lon - p.LON0) / (p.LON1 - p.LON0)) * p.BW;
  const py = (lat) => ((lat - p.LAT0) / (p.LAT1 - p.LAT0)) * p.BH;
  return renderNewZealandDecor(px, py);
}

export function buildNewZealandContent() {
  return {
    id: NEWZEALAND_META.id,
    name: NEWZEALAND_META.name,
    blurb: NEWZEALAND_META.blurb,
    cur: NEWZEALAND_META.cur,
    start: NEWZEALAND_META.start,
    cpuNames: NEWZEALAND_META.cpuNames,
    proj: NEWZEALAND_PROJ,
    regions: NEWZEALAND_REGIONS,
    cities: NEWZEALAND_CITIES,
    edges: NEWZEALAND_EDGES,
    quiz: NEWZEALAND_QUIZ,
    items: NEWZEALAND_ITEMS,
    spirit: NEWZEALAND_SPIRIT,
    doom: NEWZEALAND_DOOM,
    seasons: NEWZEALAND_SEASONS,
    moneyEvents: NEWZEALAND_MONEY_EVENTS,
    stripe: NEWZEALAND_META.stripe,
    marks: NEWZEALAND_MARKS,
    bg: NEWZEALAND_BG,
    sea: NEWZEALAND_COLORS.sea,
    seaWave: NEWZEALAND_COLORS.seaWave,
    landBase: NEWZEALAND_COLORS.landBase,
    coast: NEWZEALAND_COLORS.coast,
    land: NEWZEALAND_LAND,
    terrain: NEWZEALAND_TERRAIN,
    lakes: NEWZEALAND_LAKES,
    rivers: NEWZEALAND_RIVERS,
    labels: NEWZEALAND_LABELS,
    decor: buildDecor(),
    styles: NEWZEALAND_STYLES,
  };
}
