/**
 * 茨城県の盤面コンテンツを組み立てる。
 *
 * 他の5枚と違って**国ではなく県**の盤面だが、仕組みはまったく同じで、
 * 出力の形も抽出後のJSON(`src/infrastructure/content/raw-content-schema.ts`)と
 * 同一なので、以降の読み込み・検証・Domainへの写像は同じ経路を通る。
 *
 * 県の盤面ならではの約束が2つある。どちらも中身のファイル側に書いてあるが、
 * 手を入れるときに効いてくるので、ここにも要点だけ残す。
 *
 *   - **季節は行事で差をつける。** 県の中では地方どうしの経済がほとんど変わらないので、
 *     国の盤面のような「県北がまるごと不況の年」は書けない(嘘になる)。
 *     梅・桃・あやめ・海開き・花火・紅葉・干し芋・氷瀑のように、
 *     その月にその場所で実際に起きることで差をつける(`flavour.mjs`)。
 *   - **クイズと都市カードで題材を重ねない。** 同じ話を二度読ませないため、
 *     都市カードが扱う題材はクイズ側で避けてある(`quiz.mjs` の冒頭に一覧)。
 */
import { IBARAKI_BG, IBARAKI_MARKS } from "./art.mjs";
import { IBARAKI_CITIES, IBARAKI_EDGES } from "./cities.mjs";
import {
  IBARAKI_DOOM,
  IBARAKI_ITEMS,
  IBARAKI_META,
  IBARAKI_REGIONS,
  IBARAKI_SEASONS,
  IBARAKI_SPIRIT,
} from "./flavour.mjs";
import {
  IBARAKI_COLORS,
  IBARAKI_LABELS,
  IBARAKI_LAKES,
  IBARAKI_LAND,
  IBARAKI_PROJ,
  IBARAKI_RIVERS,
  IBARAKI_TERRAIN,
  renderIbarakiDecor,
} from "./geography.mjs";
import { IBARAKI_MONEY_EVENTS } from "./money-events.mjs";
import { IBARAKI_STYLES } from "./music.mjs";
import { IBARAKI_QUIZ } from "./quiz.mjs";

/** 盤面装飾は投影に依存するので、ここで一度だけ評価して文字列にする。 */
function buildDecor() {
  const p = IBARAKI_PROJ;
  const px = (lon) => ((lon - p.LON0) / (p.LON1 - p.LON0)) * p.BW;
  const py = (lat) => ((lat - p.LAT0) / (p.LAT1 - p.LAT0)) * p.BH;
  return renderIbarakiDecor(px, py);
}

export function buildIbarakiContent() {
  return {
    id: IBARAKI_META.id,
    name: IBARAKI_META.name,
    blurb: IBARAKI_META.blurb,
    cur: IBARAKI_META.cur,
    start: IBARAKI_META.start,
    cpuNames: IBARAKI_META.cpuNames,
    proj: IBARAKI_PROJ,
    regions: IBARAKI_REGIONS,
    cities: IBARAKI_CITIES,
    edges: IBARAKI_EDGES,
    quiz: IBARAKI_QUIZ,
    items: IBARAKI_ITEMS,
    spirit: IBARAKI_SPIRIT,
    doom: IBARAKI_DOOM,
    seasons: IBARAKI_SEASONS,
    moneyEvents: IBARAKI_MONEY_EVENTS,
    stripe: IBARAKI_META.stripe,
    marks: IBARAKI_MARKS,
    bg: IBARAKI_BG,
    sea: IBARAKI_COLORS.sea,
    seaWave: IBARAKI_COLORS.seaWave,
    landBase: IBARAKI_COLORS.landBase,
    coast: IBARAKI_COLORS.coast,
    land: IBARAKI_LAND,
    terrain: IBARAKI_TERRAIN,
    lakes: IBARAKI_LAKES,
    rivers: IBARAKI_RIVERS,
    labels: IBARAKI_LABELS,
    decor: buildDecor(),
    styles: IBARAKI_STYLES,
  };
}
