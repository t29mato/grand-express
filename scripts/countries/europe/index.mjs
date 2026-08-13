/**
 * ヨーロッパの国コンテンツを組み立てる。
 *
 * legacy に無い、このリポジトリで書き起こした国(インド・フランス・世界一周・
 * 茨城・韓国と同じ扱い)。出力の形は抽出後のJSONと同一なので、以降の読み込み・
 * 検証・Domainへの写像は他国とまったく同じ経路を通る。
 *
 * **大陸ぜんぶを1枚に収めた盤面。**国境をまたぐ話(オリエント急行・
 * 軌間の変わる国境・鉄のカーテン・橋やトンネルで渡る海峡)を軸にしている。
 */
import { EUROPE_BG, EUROPE_MARKS } from "./art.mjs";
import { EUROPE_CITIES, EUROPE_EDGES } from "./cities.mjs";
import {
  EUROPE_DOOM,
  EUROPE_ITEMS,
  EUROPE_META,
  EUROPE_REGIONS,
  EUROPE_SEASONS,
  EUROPE_SPIRIT,
} from "./flavour.mjs";
import {
  EUROPE_COLORS,
  EUROPE_LABELS,
  EUROPE_LAKES,
  EUROPE_LAND,
  EUROPE_PROJ,
  EUROPE_RIVERS,
  EUROPE_TERRAIN,
  renderEuropeDecor,
} from "./geography.mjs";
import { EUROPE_MONEY_EVENTS } from "./money-events.mjs";
import { EUROPE_STYLES } from "./music.mjs";
import { EUROPE_QUIZ } from "./quiz.mjs";

/** 盤面装飾は投影に依存するので、ここで一度だけ評価して文字列にする。 */
function buildDecor() {
  const p = EUROPE_PROJ;
  const px = (lon) => ((lon - p.LON0) / (p.LON1 - p.LON0)) * p.BW;
  const py = (lat) => ((lat - p.LAT0) / (p.LAT1 - p.LAT0)) * p.BH;
  return renderEuropeDecor(px, py);
}

export function buildEuropeContent() {
  return {
    id: EUROPE_META.id,
    name: EUROPE_META.name,
    blurb: EUROPE_META.blurb,
    cur: EUROPE_META.cur,
    start: EUROPE_META.start,
    cpuNames: EUROPE_META.cpuNames,
    proj: EUROPE_PROJ,
    regions: EUROPE_REGIONS,
    cities: EUROPE_CITIES,
    edges: EUROPE_EDGES,
    quiz: EUROPE_QUIZ,
    items: EUROPE_ITEMS,
    spirit: EUROPE_SPIRIT,
    doom: EUROPE_DOOM,
    seasons: EUROPE_SEASONS,
    moneyEvents: EUROPE_MONEY_EVENTS,
    stripe: EUROPE_META.stripe,
    marks: EUROPE_MARKS,
    bg: EUROPE_BG,
    sea: EUROPE_COLORS.sea,
    seaWave: EUROPE_COLORS.seaWave,
    landBase: EUROPE_COLORS.landBase,
    coast: EUROPE_COLORS.coast,
    land: EUROPE_LAND,
    terrain: EUROPE_TERRAIN,
    lakes: EUROPE_LAKES,
    rivers: EUROPE_RIVERS,
    labels: EUROPE_LABELS,
    decor: buildDecor(),
    styles: EUROPE_STYLES,
  };
}
