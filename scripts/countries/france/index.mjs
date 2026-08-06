/**
 * フランスの国コンテンツを組み立てる。
 *
 * legacy に無い、このリポジトリで書き起こした国(インドと同じ扱い)。
 * 出力の形は抽出後のJSONと同一なので、以降の読み込み・検証・Domainへの
 * 写像は他国とまったく同じ経路を通る。
 */
import { FRANCE_BG, FRANCE_MARKS } from "./art.mjs";
import { FRANCE_CITIES, FRANCE_EDGES } from "./cities.mjs";
import {
  FRANCE_DOOM,
  FRANCE_ITEMS,
  FRANCE_META,
  FRANCE_REGIONS,
  FRANCE_SEASONS,
  FRANCE_SPIRIT,
} from "./flavour.mjs";
import {
  FRANCE_COLORS,
  FRANCE_LABELS,
  FRANCE_LAKES,
  FRANCE_LAND,
  FRANCE_PROJ,
  FRANCE_RIVERS,
  FRANCE_TERRAIN,
  renderFranceDecor,
} from "./geography.mjs";
import { FRANCE_MONEY_EVENTS } from "./money-events.mjs";
import { FRANCE_QUIZ } from "./quiz.mjs";

/** 盤面装飾は投影に依存するので、ここで一度だけ評価して文字列にする。 */
function buildDecor() {
  const p = FRANCE_PROJ;
  const px = (lon) => ((lon - p.LON0) / (p.LON1 - p.LON0)) * p.BW;
  const py = (lat) => ((lat - p.LAT0) / (p.LAT1 - p.LAT0)) * p.BH;
  return renderFranceDecor(px, py);
}

export function buildFranceContent() {
  return {
    id: FRANCE_META.id,
    name: FRANCE_META.name,
    blurb: FRANCE_META.blurb,
    cur: FRANCE_META.cur,
    start: FRANCE_META.start,
    cpuNames: FRANCE_META.cpuNames,
    proj: FRANCE_PROJ,
    regions: FRANCE_REGIONS,
    cities: FRANCE_CITIES,
    edges: FRANCE_EDGES,
    quiz: FRANCE_QUIZ,
    items: FRANCE_ITEMS,
    spirit: FRANCE_SPIRIT,
    doom: FRANCE_DOOM,
    seasons: FRANCE_SEASONS,
    moneyEvents: FRANCE_MONEY_EVENTS,
    stripe: FRANCE_META.stripe,
    marks: FRANCE_MARKS,
    bg: FRANCE_BG,
    sea: FRANCE_COLORS.sea,
    seaWave: FRANCE_COLORS.seaWave,
    landBase: FRANCE_COLORS.landBase,
    coast: FRANCE_COLORS.coast,
    land: FRANCE_LAND,
    terrain: FRANCE_TERRAIN,
    lakes: FRANCE_LAKES,
    rivers: FRANCE_RIVERS,
    labels: FRANCE_LABELS,
    decor: buildDecor(),
  };
}
