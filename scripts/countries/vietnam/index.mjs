/**
 * ベトナムの国コンテンツを組み立てる。
 *
 * legacy に無い、このリポジトリで書き起こした国(インド・フランス・世界一周・
 * 茨城・韓国と同じ扱い)。出力の形は抽出後のJSONと同一なので、以降の読み込み・
 * 検証・Domainへの写像は他国とまったく同じ経路を通る。
 */
import { VIETNAM_BG, VIETNAM_MARKS } from "./art.mjs";
import { VIETNAM_CITIES, VIETNAM_EDGES } from "./cities.mjs";
import {
  VIETNAM_DOOM,
  VIETNAM_ITEMS,
  VIETNAM_META,
  VIETNAM_REGIONS,
  VIETNAM_SEASONS,
  VIETNAM_SPIRIT,
} from "./flavour.mjs";
import {
  VIETNAM_COLORS,
  VIETNAM_LABELS,
  VIETNAM_LAKES,
  VIETNAM_LAND,
  VIETNAM_PROJ,
  VIETNAM_RIVERS,
  VIETNAM_TERRAIN,
  renderVietnamDecor,
} from "./geography.mjs";
import { VIETNAM_MONEY_EVENTS } from "./money-events.mjs";
import { VIETNAM_STYLES } from "./music.mjs";
import { VIETNAM_QUIZ } from "./quiz.mjs";

/** 盤面装飾は投影に依存するので、ここで一度だけ評価して文字列にする。 */
function buildDecor() {
  const p = VIETNAM_PROJ;
  const px = (lon) => ((lon - p.LON0) / (p.LON1 - p.LON0)) * p.BW;
  const py = (lat) => ((lat - p.LAT0) / (p.LAT1 - p.LAT0)) * p.BH;
  return renderVietnamDecor(px, py);
}

export function buildVietnamContent() {
  return {
    id: VIETNAM_META.id,
    name: VIETNAM_META.name,
    blurb: VIETNAM_META.blurb,
    cur: VIETNAM_META.cur,
    start: VIETNAM_META.start,
    cpuNames: VIETNAM_META.cpuNames,
    proj: VIETNAM_PROJ,
    regions: VIETNAM_REGIONS,
    cities: VIETNAM_CITIES,
    edges: VIETNAM_EDGES,
    quiz: VIETNAM_QUIZ,
    items: VIETNAM_ITEMS,
    spirit: VIETNAM_SPIRIT,
    doom: VIETNAM_DOOM,
    seasons: VIETNAM_SEASONS,
    moneyEvents: VIETNAM_MONEY_EVENTS,
    stripe: VIETNAM_META.stripe,
    marks: VIETNAM_MARKS,
    bg: VIETNAM_BG,
    sea: VIETNAM_COLORS.sea,
    seaWave: VIETNAM_COLORS.seaWave,
    landBase: VIETNAM_COLORS.landBase,
    coast: VIETNAM_COLORS.coast,
    land: VIETNAM_LAND,
    terrain: VIETNAM_TERRAIN,
    lakes: VIETNAM_LAKES,
    rivers: VIETNAM_RIVERS,
    labels: VIETNAM_LABELS,
    decor: buildDecor(),
    styles: VIETNAM_STYLES,
  };
}
