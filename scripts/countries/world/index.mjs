/**
 * 世界一周の盤面を組み立てる。
 *
 * 「国」ではなく世界規模だが、仕組みは他国とまったく同じ。
 * 地方は大陸、大陸間の移動はすべて航路にしている(空路は足していない。
 * 理由は docs/50-authoring/06-world-map-spec.md)。
 */
import { WORLD_BG, WORLD_MARKS } from "./art.mjs";
import { WORLD_CITIES, WORLD_EDGES } from "./cities.mjs";
import {
  WORLD_DOOM,
  WORLD_ITEMS,
  WORLD_META,
  WORLD_REGIONS,
  WORLD_SEASONS,
  WORLD_SPIRIT,
} from "./flavour.mjs";
import {
  WORLD_COLORS,
  WORLD_LABELS,
  WORLD_LAKES,
  WORLD_LAND,
  WORLD_PROJ,
  WORLD_RIVERS,
  WORLD_TERRAIN,
  renderWorldDecor,
} from "./geography.mjs";
import { WORLD_MONEY_EVENTS } from "./money-events.mjs";
import { WORLD_QUIZ } from "./quiz.mjs";

/** 盤面装飾は投影に依存するので、ここで一度だけ評価して文字列にする。 */
function buildDecor() {
  const p = WORLD_PROJ;
  const px = (lon) => ((lon - p.LON0) / (p.LON1 - p.LON0)) * p.BW;
  const py = (lat) => ((lat - p.LAT0) / (p.LAT1 - p.LAT0)) * p.BH;
  return renderWorldDecor(px, py);
}

export function buildWorldContent() {
  return {
    id: WORLD_META.id,
    name: WORLD_META.name,
    blurb: WORLD_META.blurb,
    cur: WORLD_META.cur,
    start: WORLD_META.start,
    cpuNames: WORLD_META.cpuNames,
    proj: WORLD_PROJ,
    regions: WORLD_REGIONS,
    cities: WORLD_CITIES,
    edges: WORLD_EDGES,
    quiz: WORLD_QUIZ,
    items: WORLD_ITEMS,
    spirit: WORLD_SPIRIT,
    doom: WORLD_DOOM,
    seasons: WORLD_SEASONS,
    moneyEvents: WORLD_MONEY_EVENTS,
    stripe: WORLD_META.stripe,
    marks: WORLD_MARKS,
    bg: WORLD_BG,
    sea: WORLD_COLORS.sea,
    seaWave: WORLD_COLORS.seaWave,
    landBase: WORLD_COLORS.landBase,
    coast: WORLD_COLORS.coast,
    land: WORLD_LAND,
    terrain: WORLD_TERRAIN,
    lakes: WORLD_LAKES,
    rivers: WORLD_RIVERS,
    labels: WORLD_LABELS,
    decor: buildDecor(),
  };
}
