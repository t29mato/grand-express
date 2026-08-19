/**
 * 九州地方の盤面コンテンツを組み立てる。
 *
 * 日本盤・茨城県・百名山と同じく国ではなく地方の盤面だが、仕組みは同じで、
 * 出力の形も抽出後のJSON(`src/infrastructure/content/raw-content-schema.ts`)と
 * 同一なので、以降の読み込み・検証・Domainへの写像は同じ経路を通る。
 *
 * `art.mjs`(`KYUSHU_MARKS` / `KYUSHU_BG`)と厄災の絵
 * (`src/presentation/components/events/dooms/kyushu-*.tsx`)は別担当が作成する。
 * 参照する鍵の一覧は `ART-KEYS.md` を参照。
 */
import { KYUSHU_BG, KYUSHU_MARKS } from "./art.mjs";
import { KYUSHU_CITIES, KYUSHU_EDGES } from "./cities.mjs";
import {
  KYUSHU_DOOM,
  KYUSHU_ITEMS,
  KYUSHU_META,
  KYUSHU_REGIONS,
  KYUSHU_SEASONS,
  KYUSHU_SPIRIT,
} from "./flavour.mjs";
import {
  KYUSHU_COLORS,
  KYUSHU_LABELS,
  KYUSHU_LAKES,
  KYUSHU_LAND,
  KYUSHU_PROJ,
  KYUSHU_RIVERS,
  KYUSHU_TERRAIN,
  renderKyushuDecor,
} from "./geography.mjs";
import { KYUSHU_MONEY_EVENTS } from "./money-events.mjs";
import { KYUSHU_STYLES } from "./music.mjs";
import { KYUSHU_QUIZ } from "./quiz.mjs";

/** 盤面装飾は投影に依存するので、ここで一度だけ評価して文字列にする。 */
function buildDecor() {
  const p = KYUSHU_PROJ;
  const px = (lon) => ((lon - p.LON0) / (p.LON1 - p.LON0)) * p.BW;
  const py = (lat) => ((lat - p.LAT0) / (p.LAT1 - p.LAT0)) * p.BH;
  return renderKyushuDecor(px, py);
}

export function buildKyushuContent() {
  return {
    id: KYUSHU_META.id,
    name: KYUSHU_META.name,
    blurb: KYUSHU_META.blurb,
    cur: KYUSHU_META.cur,
    start: KYUSHU_META.start,
    cpuNames: KYUSHU_META.cpuNames,
    proj: KYUSHU_PROJ,
    regions: KYUSHU_REGIONS,
    cities: KYUSHU_CITIES,
    edges: KYUSHU_EDGES,
    quiz: KYUSHU_QUIZ,
    items: KYUSHU_ITEMS,
    spirit: KYUSHU_SPIRIT,
    doom: KYUSHU_DOOM,
    seasons: KYUSHU_SEASONS,
    moneyEvents: KYUSHU_MONEY_EVENTS,
    stripe: KYUSHU_META.stripe,
    marks: KYUSHU_MARKS,
    bg: KYUSHU_BG,
    sea: KYUSHU_COLORS.sea,
    seaWave: KYUSHU_COLORS.seaWave,
    landBase: KYUSHU_COLORS.landBase,
    coast: KYUSHU_COLORS.coast,
    land: KYUSHU_LAND,
    terrain: KYUSHU_TERRAIN,
    lakes: KYUSHU_LAKES,
    rivers: KYUSHU_RIVERS,
    labels: KYUSHU_LABELS,
    decor: buildDecor(),
    styles: KYUSHU_STYLES,
  };
}
