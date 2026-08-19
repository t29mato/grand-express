/**
 * メキシコの国コンテンツを組み立てる。
 *
 * legacy に無い、このリポジトリで書き起こした国(韓国・インド・フランス・
 * 世界一周・茨城と同じ扱い)。出力の形は抽出後のJSONと同一なので、以降の
 * 読み込み・検証・Domainへの写像は他国とまったく同じ経路を通る。
 *
 * **`art.mjs`(`MEXICO_BG` / `MEXICO_MARKS`)は絵の専任担当が書く。**
 * それまでこのファイルは import 解決に失敗する(構文は正しい)。
 * `scripts/countries/mexico/ART-KEYS.md` に必要なキー一覧を渡してある。
 */
import { MEXICO_BG, MEXICO_MARKS } from "./art.mjs";
import { MEXICO_CITIES, MEXICO_EDGES } from "./cities.mjs";
import {
  MEXICO_DOOM,
  MEXICO_ITEMS,
  MEXICO_META,
  MEXICO_REGIONS,
  MEXICO_SEASONS,
  MEXICO_SPIRIT,
} from "./flavour.mjs";
import {
  MEXICO_COLORS,
  MEXICO_LABELS,
  MEXICO_LAKES,
  MEXICO_LAND,
  MEXICO_PROJ,
  MEXICO_RIVERS,
  MEXICO_TERRAIN,
  renderMexicoDecor,
} from "./geography.mjs";
import { MEXICO_MONEY_EVENTS } from "./money-events.mjs";
import { MEXICO_STYLES } from "./music.mjs";
import { MEXICO_QUIZ } from "./quiz.mjs";

/** 盤面装飾は投影に依存するので、ここで一度だけ評価して文字列にする。 */
function buildDecor() {
  const p = MEXICO_PROJ;
  const px = (lon) => ((lon - p.LON0) / (p.LON1 - p.LON0)) * p.BW;
  const py = (lat) => ((lat - p.LAT0) / (p.LAT1 - p.LAT0)) * p.BH;
  return renderMexicoDecor(px, py);
}

export function buildMexicoContent() {
  return {
    id: MEXICO_META.id,
    name: MEXICO_META.name,
    blurb: MEXICO_META.blurb,
    cur: MEXICO_META.cur,
    start: MEXICO_META.start,
    cpuNames: MEXICO_META.cpuNames,
    proj: MEXICO_PROJ,
    regions: MEXICO_REGIONS,
    cities: MEXICO_CITIES,
    edges: MEXICO_EDGES,
    quiz: MEXICO_QUIZ,
    items: MEXICO_ITEMS,
    spirit: MEXICO_SPIRIT,
    doom: MEXICO_DOOM,
    seasons: MEXICO_SEASONS,
    moneyEvents: MEXICO_MONEY_EVENTS,
    stripe: MEXICO_META.stripe,
    marks: MEXICO_MARKS,
    bg: MEXICO_BG,
    sea: MEXICO_COLORS.sea,
    seaWave: MEXICO_COLORS.seaWave,
    landBase: MEXICO_COLORS.landBase,
    coast: MEXICO_COLORS.coast,
    land: MEXICO_LAND,
    terrain: MEXICO_TERRAIN,
    lakes: MEXICO_LAKES,
    rivers: MEXICO_RIVERS,
    labels: MEXICO_LABELS,
    decor: buildDecor(),
    styles: MEXICO_STYLES,
  };
}
