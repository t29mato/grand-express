/**
 * 中国の国コンテンツを組み立てる。
 *
 * legacy に無い、このリポジトリで書き起こした国(韓国・インド・フランス・
 * 世界一周・茨城と同じ扱い)。出力の形は抽出後のJSONと同一なので、以降の
 * 読み込み・検証・Domainへの写像は他国とまったく同じ経路を通る。
 *
 * この盤面は取りまとめ側が抽出パイプラインへ登録する(REGISTER.md参照)。
 * ここでは共有ファイルには一切触れていない。
 */
import { CHINA_BG, CHINA_MARKS } from "./art.mjs";
import { CHINA_CITIES, CHINA_EDGES } from "./cities.mjs";
import {
  CHINA_DOOM,
  CHINA_ITEMS,
  CHINA_META,
  CHINA_REGIONS,
  CHINA_SEASONS,
  CHINA_SPIRIT,
} from "./flavour.mjs";
import {
  CHINA_COLORS,
  CHINA_LABELS,
  CHINA_LAKES,
  CHINA_LAND,
  CHINA_PROJ,
  CHINA_RIVERS,
  CHINA_TERRAIN,
  renderChinaDecor,
} from "./geography.mjs";
import { CHINA_MONEY_EVENTS } from "./money-events.mjs";
import { CHINA_STYLES } from "./music.mjs";
import { CHINA_QUIZ } from "./quiz.mjs";

/** 盤面装飾は投影に依存するので、ここで一度だけ評価して文字列にする。 */
function buildDecor() {
  const p = CHINA_PROJ;
  const px = (lon) => ((lon - p.LON0) / (p.LON1 - p.LON0)) * p.BW;
  const py = (lat) => ((lat - p.LAT0) / (p.LAT1 - p.LAT0)) * p.BH;
  return renderChinaDecor(px, py);
}

export function buildChinaContent() {
  return {
    id: CHINA_META.id,
    name: CHINA_META.name,
    blurb: CHINA_META.blurb,
    cur: CHINA_META.cur,
    start: CHINA_META.start,
    cpuNames: CHINA_META.cpuNames,
    proj: CHINA_PROJ,
    regions: CHINA_REGIONS,
    cities: CHINA_CITIES,
    edges: CHINA_EDGES,
    quiz: CHINA_QUIZ,
    items: CHINA_ITEMS,
    spirit: CHINA_SPIRIT,
    doom: CHINA_DOOM,
    seasons: CHINA_SEASONS,
    moneyEvents: CHINA_MONEY_EVENTS,
    stripe: CHINA_META.stripe,
    marks: CHINA_MARKS,
    bg: CHINA_BG,
    sea: CHINA_COLORS.sea,
    seaWave: CHINA_COLORS.seaWave,
    landBase: CHINA_COLORS.landBase,
    coast: CHINA_COLORS.coast,
    land: CHINA_LAND,
    terrain: CHINA_TERRAIN,
    lakes: CHINA_LAKES,
    rivers: CHINA_RIVERS,
    labels: CHINA_LABELS,
    decor: buildDecor(),
    styles: CHINA_STYLES,
  };
}
