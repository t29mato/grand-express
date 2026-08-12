/**
 * イギリスの国コンテンツを組み立てる。
 *
 * legacy に無い、このリポジトリで書き起こした国(韓国・インド・フランス・
 * 世界一周・茨城と同じ扱い)。出力の形は抽出後のJSONと同一なので、以降の読み込み・
 * 検証・Domainへの写像は他国とまったく同じ経路を通る。
 */
import { UK_BG, UK_MARKS } from "./art.mjs";
import { UK_CITIES, UK_EDGES } from "./cities.mjs";
import {
  UK_DOOM,
  UK_ITEMS,
  UK_META,
  UK_REGIONS,
  UK_SEASONS,
  UK_SPIRIT,
} from "./flavour.mjs";
import {
  UK_COLORS,
  UK_LABELS,
  UK_LAKES,
  UK_LAND,
  UK_PROJ,
  UK_RIVERS,
  UK_TERRAIN,
  renderUkDecor,
} from "./geography.mjs";
import { UK_MONEY_EVENTS } from "./money-events.mjs";
import { UK_STYLES } from "./music.mjs";
import { UK_QUIZ } from "./quiz.mjs";

/** 盤面装飾は投影に依存するので、ここで一度だけ評価して文字列にする。 */
function buildDecor() {
  const p = UK_PROJ;
  const px = (lon) => ((lon - p.LON0) / (p.LON1 - p.LON0)) * p.BW;
  const py = (lat) => ((lat - p.LAT0) / (p.LAT1 - p.LAT0)) * p.BH;
  return renderUkDecor(px, py);
}

export function buildUkContent() {
  return {
    id: UK_META.id,
    name: UK_META.name,
    blurb: UK_META.blurb,
    cur: UK_META.cur,
    start: UK_META.start,
    cpuNames: UK_META.cpuNames,
    proj: UK_PROJ,
    regions: UK_REGIONS,
    cities: UK_CITIES,
    edges: UK_EDGES,
    quiz: UK_QUIZ,
    items: UK_ITEMS,
    spirit: UK_SPIRIT,
    doom: UK_DOOM,
    seasons: UK_SEASONS,
    moneyEvents: UK_MONEY_EVENTS,
    stripe: UK_META.stripe,
    marks: UK_MARKS,
    bg: UK_BG,
    sea: UK_COLORS.sea,
    seaWave: UK_COLORS.seaWave,
    landBase: UK_COLORS.landBase,
    coast: UK_COLORS.coast,
    land: UK_LAND,
    terrain: UK_TERRAIN,
    lakes: UK_LAKES,
    rivers: UK_RIVERS,
    labels: UK_LABELS,
    decor: buildDecor(),
    styles: UK_STYLES,
  };
}
