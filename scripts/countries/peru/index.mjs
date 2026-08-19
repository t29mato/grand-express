/**
 * ペルーの国コンテンツを組み立てる。
 *
 * legacy に無い、このリポジトリで書き起こした国(韓国・インド・フランス・
 * 世界一周・茨城と同じ扱い)。出力の形は抽出後のJSONと同一なので、以降の
 * 読み込み・検証・Domainへの写像は他国とまったく同じ経路を通る。
 *
 * `art.mjs`(marks/bg)はまだ無い。絵の担当が `cities.mjs` 凍結後に作成する。
 */
import { PERU_BG, PERU_MARKS } from "./art.mjs";
import { PERU_CITIES, PERU_EDGES } from "./cities.mjs";
import {
  PERU_DOOM,
  PERU_ITEMS,
  PERU_META,
  PERU_REGIONS,
  PERU_SEASONS,
  PERU_SPIRIT,
} from "./flavour.mjs";
import {
  PERU_COLORS,
  PERU_LABELS,
  PERU_LAKES,
  PERU_LAND,
  PERU_PROJ,
  PERU_RIVERS,
  PERU_TERRAIN,
  renderPeruDecor,
} from "./geography.mjs";
import { PERU_MONEY_EVENTS } from "./money-events.mjs";
import { PERU_STYLES } from "./music.mjs";
import { PERU_QUIZ } from "./quiz.mjs";

/** 盤面装飾は投影に依存するので、ここで一度だけ評価して文字列にする。 */
function buildDecor() {
  const p = PERU_PROJ;
  const px = (lon) => ((lon - p.LON0) / (p.LON1 - p.LON0)) * p.BW;
  const py = (lat) => ((lat - p.LAT0) / (p.LAT1 - p.LAT0)) * p.BH;
  return renderPeruDecor(px, py);
}

export function buildPeruContent() {
  return {
    id: PERU_META.id,
    name: PERU_META.name,
    blurb: PERU_META.blurb,
    cur: PERU_META.cur,
    start: PERU_META.start,
    cpuNames: PERU_META.cpuNames,
    proj: PERU_PROJ,
    regions: PERU_REGIONS,
    cities: PERU_CITIES,
    edges: PERU_EDGES,
    quiz: PERU_QUIZ,
    items: PERU_ITEMS,
    spirit: PERU_SPIRIT,
    doom: PERU_DOOM,
    seasons: PERU_SEASONS,
    moneyEvents: PERU_MONEY_EVENTS,
    stripe: PERU_META.stripe,
    marks: PERU_MARKS,
    bg: PERU_BG,
    sea: PERU_COLORS.sea,
    seaWave: PERU_COLORS.seaWave,
    landBase: PERU_COLORS.landBase,
    coast: PERU_COLORS.coast,
    land: PERU_LAND,
    terrain: PERU_TERRAIN,
    lakes: PERU_LAKES,
    rivers: PERU_RIVERS,
    labels: PERU_LABELS,
    decor: buildDecor(),
    styles: PERU_STYLES,
  };
}
