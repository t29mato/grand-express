/**
 * スペインの国コンテンツを組み立てる。
 *
 * legacy に無い、このリポジトリで書き起こした国(インド・フランス・世界一周・
 * 茨城・韓国と同じ扱い)。出力の形は抽出後のJSONと同一なので、以降の読み込み・
 * 検証・Domainへの写像は他国とまったく同じ経路を通る。
 *
 * `art.mjs`(SPAIN_BG / SPAIN_MARKS)は絵の担当が別途書く。
 */
import { SPAIN_BG, SPAIN_MARKS } from "./art.mjs";
import { SPAIN_CITIES, SPAIN_EDGES } from "./cities.mjs";
import {
  SPAIN_DOOM,
  SPAIN_ITEMS,
  SPAIN_META,
  SPAIN_REGIONS,
  SPAIN_SEASONS,
  SPAIN_SPIRIT,
} from "./flavour.mjs";
import {
  SPAIN_COLORS,
  SPAIN_LABELS,
  SPAIN_LAKES,
  SPAIN_LAND,
  SPAIN_PROJ,
  SPAIN_RIVERS,
  SPAIN_TERRAIN,
  renderSpainDecor,
} from "./geography.mjs";
import { SPAIN_MONEY_EVENTS } from "./money-events.mjs";
import { SPAIN_STYLES } from "./music.mjs";
import { SPAIN_QUIZ } from "./quiz.mjs";

/** 盤面装飾は投影に依存するので、ここで一度だけ評価して文字列にする。 */
function buildDecor() {
  const p = SPAIN_PROJ;
  const px = (lon) => ((lon - p.LON0) / (p.LON1 - p.LON0)) * p.BW;
  const py = (lat) => ((lat - p.LAT0) / (p.LAT1 - p.LAT0)) * p.BH;
  return renderSpainDecor(px, py);
}

export function buildSpainContent() {
  return {
    id: SPAIN_META.id,
    name: SPAIN_META.name,
    blurb: SPAIN_META.blurb,
    cur: SPAIN_META.cur,
    start: SPAIN_META.start,
    cpuNames: SPAIN_META.cpuNames,
    proj: SPAIN_PROJ,
    regions: SPAIN_REGIONS,
    cities: SPAIN_CITIES,
    edges: SPAIN_EDGES,
    quiz: SPAIN_QUIZ,
    items: SPAIN_ITEMS,
    spirit: SPAIN_SPIRIT,
    doom: SPAIN_DOOM,
    seasons: SPAIN_SEASONS,
    moneyEvents: SPAIN_MONEY_EVENTS,
    stripe: SPAIN_META.stripe,
    marks: SPAIN_MARKS,
    bg: SPAIN_BG,
    sea: SPAIN_COLORS.sea,
    seaWave: SPAIN_COLORS.seaWave,
    landBase: SPAIN_COLORS.landBase,
    coast: SPAIN_COLORS.coast,
    land: SPAIN_LAND,
    terrain: SPAIN_TERRAIN,
    lakes: SPAIN_LAKES,
    rivers: SPAIN_RIVERS,
    labels: SPAIN_LABELS,
    decor: buildDecor(),
    styles: SPAIN_STYLES,
  };
}
