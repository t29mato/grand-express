/**
 * スイスの国コンテンツを組み立てる。
 *
 * 出力の形は抽出後のJSONと同一なので、以降の読み込み・検証・Domainへの
 * 写像は他国とまったく同じ経路を通る(韓国・インド・フランスと同じ扱い)。
 *
 * `art.mjs`(`SWITZERLAND_BG` / `SWITZERLAND_MARKS`)は絵の担当が別途作る。
 * 鍵の一覧は `ART-KEYS.md` を参照。
 */
import { SWITZERLAND_BG, SWITZERLAND_MARKS } from "./art.mjs";
import { SWITZERLAND_CITIES, SWITZERLAND_EDGES } from "./cities.mjs";
import {
  SWITZERLAND_DOOM,
  SWITZERLAND_ITEMS,
  SWITZERLAND_META,
  SWITZERLAND_REGIONS,
  SWITZERLAND_SEASONS,
  SWITZERLAND_SPIRIT,
} from "./flavour.mjs";
import {
  SWITZERLAND_COLORS,
  SWITZERLAND_LABELS,
  SWITZERLAND_LAKES,
  SWITZERLAND_LAND,
  SWITZERLAND_PROJ,
  SWITZERLAND_RIVERS,
  SWITZERLAND_TERRAIN,
  renderSwitzerlandDecor,
} from "./geography.mjs";
import { SWITZERLAND_MONEY_EVENTS } from "./money-events.mjs";
import { SWITZERLAND_STYLES } from "./music.mjs";
import { SWITZERLAND_QUIZ } from "./quiz.mjs";

/** 盤面装飾は投影に依存するので、ここで一度だけ評価して文字列にする。 */
function buildDecor() {
  const p = SWITZERLAND_PROJ;
  const px = (lon) => ((lon - p.LON0) / (p.LON1 - p.LON0)) * p.BW;
  const py = (lat) => ((lat - p.LAT0) / (p.LAT1 - p.LAT0)) * p.BH;
  return renderSwitzerlandDecor(px, py);
}

export function buildSwitzerlandContent() {
  return {
    id: SWITZERLAND_META.id,
    name: SWITZERLAND_META.name,
    blurb: SWITZERLAND_META.blurb,
    cur: SWITZERLAND_META.cur,
    start: SWITZERLAND_META.start,
    cpuNames: SWITZERLAND_META.cpuNames,
    proj: SWITZERLAND_PROJ,
    regions: SWITZERLAND_REGIONS,
    cities: SWITZERLAND_CITIES,
    edges: SWITZERLAND_EDGES,
    quiz: SWITZERLAND_QUIZ,
    items: SWITZERLAND_ITEMS,
    spirit: SWITZERLAND_SPIRIT,
    doom: SWITZERLAND_DOOM,
    seasons: SWITZERLAND_SEASONS,
    moneyEvents: SWITZERLAND_MONEY_EVENTS,
    stripe: SWITZERLAND_META.stripe,
    marks: SWITZERLAND_MARKS,
    bg: SWITZERLAND_BG,
    sea: SWITZERLAND_COLORS.sea,
    seaWave: SWITZERLAND_COLORS.seaWave,
    landBase: SWITZERLAND_COLORS.landBase,
    coast: SWITZERLAND_COLORS.coast,
    land: SWITZERLAND_LAND,
    terrain: SWITZERLAND_TERRAIN,
    lakes: SWITZERLAND_LAKES,
    rivers: SWITZERLAND_RIVERS,
    labels: SWITZERLAND_LABELS,
    decor: buildDecor(),
    styles: SWITZERLAND_STYLES,
  };
}
