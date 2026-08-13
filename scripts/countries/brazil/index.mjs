/**
 * ブラジルの国コンテンツを組み立てる。
 *
 * legacy に無い、このリポジトリで書き起こした国(韓国・トルコなどと同じ扱い)。
 * 出力の形は抽出後のJSONと同一なので、以降の読み込み・検証・Domainへの
 * 写像は他国とまったく同じ経路を通る。
 */
import { BRAZIL_BG, BRAZIL_MARKS } from "./art.mjs";
import { BRAZIL_CITIES, BRAZIL_EDGES } from "./cities.mjs";
import {
  BRAZIL_DOOM,
  BRAZIL_ITEMS,
  BRAZIL_META,
  BRAZIL_REGIONS,
  BRAZIL_SEASONS,
  BRAZIL_SPIRIT,
} from "./flavour.mjs";
import {
  BRAZIL_COLORS,
  BRAZIL_LABELS,
  BRAZIL_LAKES,
  BRAZIL_LAND,
  BRAZIL_PROJ,
  BRAZIL_RIVERS,
  BRAZIL_TERRAIN,
  renderBrazilDecor,
} from "./geography.mjs";
import { BRAZIL_MONEY_EVENTS } from "./money-events.mjs";
import { BRAZIL_STYLES } from "./music.mjs";
import { BRAZIL_QUIZ } from "./quiz.mjs";

/** 盤面装飾は投影に依存するので、ここで一度だけ評価して文字列にする。 */
function buildDecor() {
  const p = BRAZIL_PROJ;
  const px = (lon) => ((lon - p.LON0) / (p.LON1 - p.LON0)) * p.BW;
  const py = (lat) => ((lat - p.LAT0) / (p.LAT1 - p.LAT0)) * p.BH;
  return renderBrazilDecor(px, py);
}

export function buildBrazilContent() {
  return {
    id: BRAZIL_META.id,
    name: BRAZIL_META.name,
    blurb: BRAZIL_META.blurb,
    cur: BRAZIL_META.cur,
    start: BRAZIL_META.start,
    cpuNames: BRAZIL_META.cpuNames,
    proj: BRAZIL_PROJ,
    regions: BRAZIL_REGIONS,
    cities: BRAZIL_CITIES,
    edges: BRAZIL_EDGES,
    quiz: BRAZIL_QUIZ,
    items: BRAZIL_ITEMS,
    spirit: BRAZIL_SPIRIT,
    doom: BRAZIL_DOOM,
    seasons: BRAZIL_SEASONS,
    moneyEvents: BRAZIL_MONEY_EVENTS,
    stripe: BRAZIL_META.stripe,
    marks: BRAZIL_MARKS,
    bg: BRAZIL_BG,
    sea: BRAZIL_COLORS.sea,
    seaWave: BRAZIL_COLORS.seaWave,
    landBase: BRAZIL_COLORS.landBase,
    coast: BRAZIL_COLORS.coast,
    land: BRAZIL_LAND,
    terrain: BRAZIL_TERRAIN,
    lakes: BRAZIL_LAKES,
    rivers: BRAZIL_RIVERS,
    labels: BRAZIL_LABELS,
    decor: buildDecor(),
    styles: BRAZIL_STYLES,
  };
}
