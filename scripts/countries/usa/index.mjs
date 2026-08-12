/**
 * アメリカ合衆国の国コンテンツを組み立てる。
 *
 * legacy に無い、このリポジトリで書き起こした国(インド・フランス・世界一周・
 * 茨城・韓国・イタリアと同じ扱い)。出力の形は抽出後のJSONと同一なので、以降の読み込み・
 * 検証・Domainへの写像は他国とまったく同じ経路を通る。
 */
import { USA_BG, USA_MARKS } from "./art.mjs";
import { USA_CITIES, USA_EDGES } from "./cities.mjs";
import {
  USA_DOOM,
  USA_ITEMS,
  USA_META,
  USA_REGIONS,
  USA_SEASONS,
  USA_SPIRIT,
} from "./flavour.mjs";
import {
  USA_COLORS,
  USA_LABELS,
  USA_LAKES,
  USA_LAND,
  USA_PROJ,
  USA_RIVERS,
  USA_TERRAIN,
  renderUsaDecor,
} from "./geography.mjs";
import { USA_MONEY_EVENTS } from "./money-events.mjs";
import { USA_STYLES } from "./music.mjs";
import { USA_QUIZ } from "./quiz.mjs";

/** 盤面装飾は投影に依存するので、ここで一度だけ評価して文字列にする。 */
function buildDecor() {
  const p = USA_PROJ;
  const px = (lon) => ((lon - p.LON0) / (p.LON1 - p.LON0)) * p.BW;
  const py = (lat) => ((lat - p.LAT0) / (p.LAT1 - p.LAT0)) * p.BH;
  return renderUsaDecor(px, py);
}

export function buildUsaContent() {
  return {
    id: USA_META.id,
    name: USA_META.name,
    blurb: USA_META.blurb,
    cur: USA_META.cur,
    start: USA_META.start,
    cpuNames: USA_META.cpuNames,
    proj: USA_PROJ,
    regions: USA_REGIONS,
    cities: USA_CITIES,
    edges: USA_EDGES,
    quiz: USA_QUIZ,
    items: USA_ITEMS,
    spirit: USA_SPIRIT,
    doom: USA_DOOM,
    seasons: USA_SEASONS,
    moneyEvents: USA_MONEY_EVENTS,
    stripe: USA_META.stripe,
    marks: USA_MARKS,
    bg: USA_BG,
    sea: USA_COLORS.sea,
    seaWave: USA_COLORS.seaWave,
    landBase: USA_COLORS.landBase,
    coast: USA_COLORS.coast,
    land: USA_LAND,
    terrain: USA_TERRAIN,
    lakes: USA_LAKES,
    rivers: USA_RIVERS,
    labels: USA_LABELS,
    decor: buildDecor(),
    styles: USA_STYLES,
  };
}
