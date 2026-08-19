/**
 * エジプトの国コンテンツを組み立てる。
 *
 * legacy に無い、このリポジトリで書き起こした国(韓国・インド・フランス・
 * 世界一周・茨城・アフリカと同じ扱い)。出力の形は抽出後のJSONと同一なので、
 * 以降の読み込み・検証・Domainへの写像は他国とまったく同じ経路を通る。
 *
 * `art.mjs` は絵の担当が別途作成する(このファイルはそれを import するだけ)。
 */
import { EGYPT_BG, EGYPT_MARKS } from "./art.mjs";
import { EGYPT_CITIES, EGYPT_EDGES } from "./cities.mjs";
import {
  EGYPT_DOOM,
  EGYPT_ITEMS,
  EGYPT_META,
  EGYPT_REGIONS,
  EGYPT_SEASONS,
  EGYPT_SPIRIT,
} from "./flavour.mjs";
import {
  EGYPT_COLORS,
  EGYPT_LABELS,
  EGYPT_LAKES,
  EGYPT_LAND,
  EGYPT_PROJ,
  EGYPT_RIVERS,
  EGYPT_TERRAIN,
  renderEgyptDecor,
} from "./geography.mjs";
import { EGYPT_MONEY_EVENTS } from "./money-events.mjs";
import { EGYPT_STYLES } from "./music.mjs";
import { EGYPT_QUIZ } from "./quiz.mjs";

/** 盤面装飾は投影に依存するので、ここで一度だけ評価して文字列にする。 */
function buildDecor() {
  const p = EGYPT_PROJ;
  const px = (lon) => ((lon - p.LON0) / (p.LON1 - p.LON0)) * p.BW;
  const py = (lat) => ((p.LAT0 - lat) / (p.LAT0 - p.LAT1)) * p.BH;
  return renderEgyptDecor(px, py);
}

export function buildEgyptContent() {
  return {
    id: EGYPT_META.id,
    name: EGYPT_META.name,
    blurb: EGYPT_META.blurb,
    cur: EGYPT_META.cur,
    start: EGYPT_META.start,
    cpuNames: EGYPT_META.cpuNames,
    proj: EGYPT_PROJ,
    regions: EGYPT_REGIONS,
    cities: EGYPT_CITIES,
    edges: EGYPT_EDGES,
    quiz: EGYPT_QUIZ,
    items: EGYPT_ITEMS,
    spirit: EGYPT_SPIRIT,
    doom: EGYPT_DOOM,
    seasons: EGYPT_SEASONS,
    moneyEvents: EGYPT_MONEY_EVENTS,
    stripe: EGYPT_META.stripe,
    marks: EGYPT_MARKS,
    bg: EGYPT_BG,
    sea: EGYPT_COLORS.sea,
    seaWave: EGYPT_COLORS.seaWave,
    landBase: EGYPT_COLORS.landBase,
    coast: EGYPT_COLORS.coast,
    land: EGYPT_LAND,
    terrain: EGYPT_TERRAIN,
    lakes: EGYPT_LAKES,
    rivers: EGYPT_RIVERS,
    labels: EGYPT_LABELS,
    decor: buildDecor(),
    styles: EGYPT_STYLES,
  };
}
