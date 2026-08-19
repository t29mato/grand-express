/**
 * 南アフリカの国コンテンツを組み立てる。
 *
 * legacy に無い、このリポジトリで書き起こした国(韓国・インド・フランス・
 * 世界一周・茨城と同じ扱い)。出力の形は抽出後のJSONと同一なので、以降の
 * 読み込み・検証・Domainへの写像は他国とまったく同じ経路を通る。
 *
 * `art.mjs`(`SOUTHAFRICA_MARKS` / `SOUTHAFRICA_BG`)は絵の専任が別途作る。
 * それまではこのファイルは import に失敗する(想定どおり)。
 */
import { SOUTHAFRICA_BG, SOUTHAFRICA_MARKS } from "./art.mjs";
import { SOUTHAFRICA_CITIES, SOUTHAFRICA_EDGES } from "./cities.mjs";
import {
  SOUTHAFRICA_DOOM,
  SOUTHAFRICA_ITEMS,
  SOUTHAFRICA_META,
  SOUTHAFRICA_REGIONS,
  SOUTHAFRICA_SEASONS,
  SOUTHAFRICA_SPIRIT,
} from "./flavour.mjs";
import {
  SOUTHAFRICA_COLORS,
  SOUTHAFRICA_LABELS,
  SOUTHAFRICA_LAKES,
  SOUTHAFRICA_LAND,
  SOUTHAFRICA_PROJ,
  SOUTHAFRICA_RIVERS,
  SOUTHAFRICA_TERRAIN,
  renderSouthafricaDecor,
} from "./geography.mjs";
import { SOUTHAFRICA_MONEY_EVENTS } from "./money-events.mjs";
import { SOUTHAFRICA_STYLES } from "./music.mjs";
import { SOUTHAFRICA_QUIZ } from "./quiz.mjs";

/** 盤面装飾は投影に依存するので、ここで一度だけ評価して文字列にする。 */
function buildDecor() {
  const p = SOUTHAFRICA_PROJ;
  const px = (lon) => ((lon - p.LON0) / (p.LON1 - p.LON0)) * p.BW;
  const py = (lat) => ((lat - p.LAT0) / (p.LAT1 - p.LAT0)) * p.BH;
  return renderSouthafricaDecor(px, py);
}

export function buildSouthafricaContent() {
  return {
    id: SOUTHAFRICA_META.id,
    name: SOUTHAFRICA_META.name,
    blurb: SOUTHAFRICA_META.blurb,
    cur: SOUTHAFRICA_META.cur,
    start: SOUTHAFRICA_META.start,
    cpuNames: SOUTHAFRICA_META.cpuNames,
    proj: SOUTHAFRICA_PROJ,
    regions: SOUTHAFRICA_REGIONS,
    cities: SOUTHAFRICA_CITIES,
    edges: SOUTHAFRICA_EDGES,
    quiz: SOUTHAFRICA_QUIZ,
    items: SOUTHAFRICA_ITEMS,
    spirit: SOUTHAFRICA_SPIRIT,
    doom: SOUTHAFRICA_DOOM,
    seasons: SOUTHAFRICA_SEASONS,
    moneyEvents: SOUTHAFRICA_MONEY_EVENTS,
    stripe: SOUTHAFRICA_META.stripe,
    marks: SOUTHAFRICA_MARKS,
    bg: SOUTHAFRICA_BG,
    sea: SOUTHAFRICA_COLORS.sea,
    seaWave: SOUTHAFRICA_COLORS.seaWave,
    landBase: SOUTHAFRICA_COLORS.landBase,
    coast: SOUTHAFRICA_COLORS.coast,
    land: SOUTHAFRICA_LAND,
    terrain: SOUTHAFRICA_TERRAIN,
    lakes: SOUTHAFRICA_LAKES,
    rivers: SOUTHAFRICA_RIVERS,
    labels: SOUTHAFRICA_LABELS,
    decor: buildDecor(),
    styles: SOUTHAFRICA_STYLES,
  };
}
