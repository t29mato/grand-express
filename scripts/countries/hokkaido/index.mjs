/**
 * 北海道盤面コンテンツを組み立てる。
 *
 * 「日本」の中の地方盤(茨城・日本百名山と同じ扱い)。仕組みはフランス・
 * 世界一周と同一で、出力の形も抽出後のJSON
 * (`src/infrastructure/content/raw-content-schema.ts`)と同じなので、
 * 以降の読み込み・検証・Domainへの写像は同じ経路を通る。
 *
 * この盤面ならではの点は2つ。
 *
 *   - **地方は北海道が実際に使う4区分**(道央・道南・道北・道東)。
 *     季節は行事や実際の産業(酪農・漁・観光)で地方差を付けてある
 *     (「道央がまるごと不況の年」のような書き方はしていない)。
 *   - **厄災の神は創作の存在。** 幻の踏切番(廃線の踏切で今も遮断機を
 *     下ろし続ける幽霊)は、この盤面の芯(石炭のために敷かれた鉄道が
 *     人口で閉じられていく)をそのまま擬人化したもので、特定の民族や
 *     信仰を借りていない(詳しくは `flavour.mjs` 冒頭のコメント)。
 */
import { HOKKAIDO_BG, HOKKAIDO_MARKS } from "./art.mjs";
import { HOKKAIDO_CITIES, HOKKAIDO_EDGES } from "./cities.mjs";
import {
  HOKKAIDO_DOOM,
  HOKKAIDO_ITEMS,
  HOKKAIDO_META,
  HOKKAIDO_REGIONS,
  HOKKAIDO_SEASONS,
  HOKKAIDO_SPIRIT,
} from "./flavour.mjs";
import {
  HOKKAIDO_COLORS,
  HOKKAIDO_LABELS,
  HOKKAIDO_LAKES,
  HOKKAIDO_LAND,
  HOKKAIDO_PROJ,
  HOKKAIDO_RIVERS,
  HOKKAIDO_TERRAIN,
  renderHokkaidoDecor,
} from "./geography.mjs";
import { HOKKAIDO_MONEY_EVENTS } from "./money-events.mjs";
import { HOKKAIDO_STYLES } from "./music.mjs";
import { HOKKAIDO_QUIZ } from "./quiz.mjs";

/** 盤面装飾は投影に依存するので、ここで一度だけ評価して文字列にする。 */
function buildDecor() {
  const p = HOKKAIDO_PROJ;
  const px = (lon) => ((lon - p.LON0) / (p.LON1 - p.LON0)) * p.BW;
  const py = (lat) => ((lat - p.LAT0) / (p.LAT1 - p.LAT0)) * p.BH;
  return renderHokkaidoDecor(px, py);
}

export function buildHokkaidoContent() {
  return {
    id: HOKKAIDO_META.id,
    name: HOKKAIDO_META.name,
    blurb: HOKKAIDO_META.blurb,
    cur: HOKKAIDO_META.cur,
    start: HOKKAIDO_META.start,
    cpuNames: HOKKAIDO_META.cpuNames,
    proj: HOKKAIDO_PROJ,
    regions: HOKKAIDO_REGIONS,
    cities: HOKKAIDO_CITIES,
    edges: HOKKAIDO_EDGES,
    quiz: HOKKAIDO_QUIZ,
    items: HOKKAIDO_ITEMS,
    spirit: HOKKAIDO_SPIRIT,
    doom: HOKKAIDO_DOOM,
    seasons: HOKKAIDO_SEASONS,
    moneyEvents: HOKKAIDO_MONEY_EVENTS,
    stripe: HOKKAIDO_META.stripe,
    marks: HOKKAIDO_MARKS,
    bg: HOKKAIDO_BG,
    sea: HOKKAIDO_COLORS.sea,
    seaWave: HOKKAIDO_COLORS.seaWave,
    landBase: HOKKAIDO_COLORS.landBase,
    coast: HOKKAIDO_COLORS.coast,
    land: HOKKAIDO_LAND,
    terrain: HOKKAIDO_TERRAIN,
    lakes: HOKKAIDO_LAKES,
    rivers: HOKKAIDO_RIVERS,
    labels: HOKKAIDO_LABELS,
    decor: buildDecor(),
    styles: HOKKAIDO_STYLES,
  };
}
