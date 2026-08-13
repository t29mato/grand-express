/**
 * オーストラリアの国コンテンツを組み立てる。
 *
 * legacy に無い、このリポジトリで書き起こした国(韓国・中国と同じ扱い)。
 * 出力の形は抽出後のJSONと同一なので、以降の読み込み・検証・Domainへの
 * 写像は他国とまったく同じ経路を通る。
 */
import { AUSTRALIA_BG, AUSTRALIA_MARKS } from "./art.mjs";
import { AUSTRALIA_CITIES, AUSTRALIA_EDGES } from "./cities.mjs";
import {
  AUSTRALIA_DOOM,
  AUSTRALIA_ITEMS,
  AUSTRALIA_META,
  AUSTRALIA_REGIONS,
  AUSTRALIA_SEASONS,
  AUSTRALIA_SPIRIT,
} from "./flavour.mjs";
import {
  AUSTRALIA_COLORS,
  AUSTRALIA_LABELS,
  AUSTRALIA_LAKES,
  AUSTRALIA_LAND,
  AUSTRALIA_PROJ,
  AUSTRALIA_RIVERS,
  AUSTRALIA_TERRAIN,
  renderAustraliaDecor,
} from "./geography.mjs";
import { AUSTRALIA_MONEY_EVENTS } from "./money-events.mjs";
import { AUSTRALIA_STYLES } from "./music.mjs";
import { AUSTRALIA_QUIZ } from "./quiz.mjs";

/** 盤面装飾は投影に依存するので、ここで一度だけ評価して文字列にする。 */
function buildDecor() {
  const p = AUSTRALIA_PROJ;
  const px = (lon) => ((lon - p.LON0) / (p.LON1 - p.LON0)) * p.BW;
  const py = (lat) => ((lat - p.LAT0) / (p.LAT1 - p.LAT0)) * p.BH;
  return renderAustraliaDecor(px, py);
}

export function buildAustraliaContent() {
  return {
    id: AUSTRALIA_META.id,
    name: AUSTRALIA_META.name,
    blurb: AUSTRALIA_META.blurb,
    cur: AUSTRALIA_META.cur,
    start: AUSTRALIA_META.start,
    cpuNames: AUSTRALIA_META.cpuNames,
    proj: AUSTRALIA_PROJ,
    regions: AUSTRALIA_REGIONS,
    cities: AUSTRALIA_CITIES,
    edges: AUSTRALIA_EDGES,
    quiz: AUSTRALIA_QUIZ,
    items: AUSTRALIA_ITEMS,
    spirit: AUSTRALIA_SPIRIT,
    doom: AUSTRALIA_DOOM,
    seasons: AUSTRALIA_SEASONS,
    moneyEvents: AUSTRALIA_MONEY_EVENTS,
    stripe: AUSTRALIA_META.stripe,
    marks: AUSTRALIA_MARKS,
    bg: AUSTRALIA_BG,
    sea: AUSTRALIA_COLORS.sea,
    seaWave: AUSTRALIA_COLORS.seaWave,
    landBase: AUSTRALIA_COLORS.landBase,
    coast: AUSTRALIA_COLORS.coast,
    land: AUSTRALIA_LAND,
    terrain: AUSTRALIA_TERRAIN,
    lakes: AUSTRALIA_LAKES,
    rivers: AUSTRALIA_RIVERS,
    labels: AUSTRALIA_LABELS,
    decor: buildDecor(),
    styles: AUSTRALIA_STYLES,
  };
}
