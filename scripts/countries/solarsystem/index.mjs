/**
 * 太陽系の国コンテンツを組み立てる。
 *
 * legacy に無い、このリポジトリで書き起こした盤面(韓国・中国・インド・
 * フランス・世界一周・茨城と同じ扱い)。出力の形は抽出後のJSONと同一なので、
 * 以降の読み込み・検証・Domainへの写像は他国とまったく同じ経路を通る。
 *
 * 「都市」は40天体、「地方」は7つの距離帯(太陽・地球型惑星・小惑星帯・
 * 巨大惑星・冥王星以遠・太陽系の縁・探査機)。詳しくは geography.mjs /
 * cities.mjs の冒頭コメントを参照。
 *
 * この盤面は取りまとめ側が抽出パイプラインへ登録する(REGISTER.md参照)。
 * ここでは共有ファイルには一切触れていない。
 */
import { SOLARSYSTEM_BG, SOLARSYSTEM_MARKS } from "./art.mjs";
import { SOLARSYSTEM_CITIES, SOLARSYSTEM_EDGES } from "./cities.mjs";
import {
  SOLARSYSTEM_DOOM,
  SOLARSYSTEM_ITEMS,
  SOLARSYSTEM_META,
  SOLARSYSTEM_REGIONS,
  SOLARSYSTEM_SEASONS,
  SOLARSYSTEM_SPIRIT,
} from "./flavour.mjs";
import {
  SOLARSYSTEM_COLORS,
  SOLARSYSTEM_LABELS,
  SOLARSYSTEM_LAKES,
  SOLARSYSTEM_LAND,
  SOLARSYSTEM_PROJ,
  SOLARSYSTEM_RIVERS,
  SOLARSYSTEM_TERRAIN,
  renderSolarsystemDecor,
} from "./geography.mjs";
import { SOLARSYSTEM_MONEY_EVENTS } from "./money-events.mjs";
import { SOLARSYSTEM_STYLES } from "./music.mjs";
import { SOLARSYSTEM_QUIZ } from "./quiz.mjs";

/** 盤面装飾は投影に依存するので、ここで一度だけ評価して文字列にする。 */
function buildDecor() {
  const p = SOLARSYSTEM_PROJ;
  const px = (lon) => ((lon - p.LON0) / (p.LON1 - p.LON0)) * p.BW;
  const py = (lat) => ((lat - p.LAT0) / (p.LAT1 - p.LAT0)) * p.BH;
  return renderSolarsystemDecor(px, py);
}

export function buildSolarsystemContent() {
  return {
    id: SOLARSYSTEM_META.id,
    name: SOLARSYSTEM_META.name,
    blurb: SOLARSYSTEM_META.blurb,
    cur: SOLARSYSTEM_META.cur,
    start: SOLARSYSTEM_META.start,
    cpuNames: SOLARSYSTEM_META.cpuNames,
    proj: SOLARSYSTEM_PROJ,
    regions: SOLARSYSTEM_REGIONS,
    cities: SOLARSYSTEM_CITIES,
    edges: SOLARSYSTEM_EDGES,
    quiz: SOLARSYSTEM_QUIZ,
    items: SOLARSYSTEM_ITEMS,
    spirit: SOLARSYSTEM_SPIRIT,
    doom: SOLARSYSTEM_DOOM,
    seasons: SOLARSYSTEM_SEASONS,
    moneyEvents: SOLARSYSTEM_MONEY_EVENTS,
    stripe: SOLARSYSTEM_META.stripe,
    marks: SOLARSYSTEM_MARKS,
    bg: SOLARSYSTEM_BG,
    sea: SOLARSYSTEM_COLORS.sea,
    seaWave: SOLARSYSTEM_COLORS.seaWave,
    landBase: SOLARSYSTEM_COLORS.landBase,
    coast: SOLARSYSTEM_COLORS.coast,
    land: SOLARSYSTEM_LAND,
    terrain: SOLARSYSTEM_TERRAIN,
    lakes: SOLARSYSTEM_LAKES,
    rivers: SOLARSYSTEM_RIVERS,
    labels: SOLARSYSTEM_LABELS,
    decor: buildDecor(),
    styles: SOLARSYSTEM_STYLES,
  };
}
