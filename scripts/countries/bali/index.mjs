/**
 * バリの盤面コンテンツを組み立てる。
 *
 * legacy に無い、このリポジトリで書き起こした盤面(茨城・韓国・イタリアと
 * 同じ扱い)。**県ではなく島ひとつ**の盤面だが、仕組みは茨城とまったく同じで、
 * 出力の形も抽出後のJSON(`src/infrastructure/content/raw-content-schema.ts`)と
 * 同一なので、以降の読み込み・検証・Domainへの写像は同じ経路を通る。
 *
 * 季節は地方まるごとの好不況ではなく行事で差をつける(`flavour.mjs` 冒頭参照)。
 */
import { BALI_BG, BALI_MARKS } from "./art.mjs";
import { BALI_CITIES, BALI_EDGES } from "./cities.mjs";
import {
  BALI_DOOM,
  BALI_ITEMS,
  BALI_META,
  BALI_REGIONS,
  BALI_SEASONS,
  BALI_SPIRIT,
} from "./flavour.mjs";
import {
  BALI_COLORS,
  BALI_LABELS,
  BALI_LAKES,
  BALI_LAND,
  BALI_PROJ,
  BALI_RIVERS,
  BALI_TERRAIN,
  renderBaliDecor,
} from "./geography.mjs";
import { BALI_MONEY_EVENTS } from "./money-events.mjs";
import { BALI_STYLES } from "./music.mjs";
import { BALI_QUIZ } from "./quiz.mjs";

/** 盤面装飾は投影に依存するので、ここで一度だけ評価して文字列にする。 */
function buildDecor() {
  const p = BALI_PROJ;
  const px = (lon) => ((lon - p.LON0) / (p.LON1 - p.LON0)) * p.BW;
  const py = (lat) => ((lat - p.LAT0) / (p.LAT1 - p.LAT0)) * p.BH;
  return renderBaliDecor(px, py);
}

export function buildBaliContent() {
  return {
    id: BALI_META.id,
    name: BALI_META.name,
    blurb: BALI_META.blurb,
    cur: BALI_META.cur,
    start: BALI_META.start,
    cpuNames: BALI_META.cpuNames,
    proj: BALI_PROJ,
    regions: BALI_REGIONS,
    cities: BALI_CITIES,
    edges: BALI_EDGES,
    quiz: BALI_QUIZ,
    items: BALI_ITEMS,
    spirit: BALI_SPIRIT,
    doom: BALI_DOOM,
    seasons: BALI_SEASONS,
    moneyEvents: BALI_MONEY_EVENTS,
    stripe: BALI_META.stripe,
    marks: BALI_MARKS,
    bg: BALI_BG,
    sea: BALI_COLORS.sea,
    seaWave: BALI_COLORS.seaWave,
    landBase: BALI_COLORS.landBase,
    coast: BALI_COLORS.coast,
    land: BALI_LAND,
    terrain: BALI_TERRAIN,
    lakes: BALI_LAKES,
    rivers: BALI_RIVERS,
    labels: BALI_LABELS,
    decor: buildDecor(),
    styles: BALI_STYLES,
  };
}
