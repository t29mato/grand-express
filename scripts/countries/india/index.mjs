/**
 * インドの国コンテンツを組み立てる。
 *
 * ボリビア・日本は legacy/grand-express.html から機械的に抽出しているが、
 * インドは legacy に存在しないため、このリポジトリで一から書き起こしている。
 * 出力の形は抽出後のJSON(`src/infrastructure/content/raw-content-schema.ts`)と
 * 同一なので、以降の読み込み・検証・Domainへの写像は他国とまったく同じ経路を通る。
 */
import { INDIA_MARKS, INDIA_BG } from "./art.mjs";
import { INDIA_CITIES, INDIA_EDGES } from "./cities.mjs";
import {
  INDIA_DOOM,
  INDIA_ITEMS,
  INDIA_META,
  INDIA_REGIONS,
  INDIA_SEASONS,
  INDIA_SPIRIT,
} from "./flavour.mjs";
import {
  INDIA_COLORS,
  INDIA_LABELS,
  INDIA_LAKES,
  INDIA_LAND,
  INDIA_PROJ,
  INDIA_RIVERS,
  INDIA_TERRAIN,
  renderIndiaDecor,
} from "./geography.mjs";
import { INDIA_QUIZ } from "./quiz.mjs";
import { INDIA_MONEY_EVENTS } from "./money-events.mjs";

/** 盤面装飾は投影に依存するので、ここで一度だけ評価して文字列にする。 */
function buildDecor() {
  const p = INDIA_PROJ;
  const px = (lon) => ((lon - p.LON0) / (p.LON1 - p.LON0)) * p.BW;
  const py = (lat) => ((lat - p.LAT0) / (p.LAT1 - p.LAT0)) * p.BH;
  return renderIndiaDecor(px, py);
}

/** 都市データはIDを持たない形(他国の抽出結果と同じ)で組み立てる。 */
export function buildIndiaContent() {
  return {
    id: INDIA_META.id,
    name: INDIA_META.name,
    blurb: INDIA_META.blurb,
    cur: INDIA_META.cur,
    start: INDIA_META.start,
    cpuNames: INDIA_META.cpuNames,
    proj: INDIA_PROJ,
    regions: INDIA_REGIONS,
    cities: INDIA_CITIES,
    edges: INDIA_EDGES,
    quiz: INDIA_QUIZ,
    items: INDIA_ITEMS,
    spirit: INDIA_SPIRIT,
    doom: INDIA_DOOM,
    seasons: INDIA_SEASONS,
    moneyEvents: INDIA_MONEY_EVENTS,
    stripe: INDIA_META.stripe,
    marks: INDIA_MARKS,
    bg: INDIA_BG,
    sea: INDIA_COLORS.sea,
    seaWave: INDIA_COLORS.seaWave,
    landBase: INDIA_COLORS.landBase,
    coast: INDIA_COLORS.coast,
    land: INDIA_LAND,
    terrain: INDIA_TERRAIN,
    lakes: INDIA_LAKES,
    rivers: INDIA_RIVERS,
    labels: INDIA_LABELS,
    decor: buildDecor(),
  };
}
