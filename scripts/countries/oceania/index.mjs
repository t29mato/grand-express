import { OCEANIA_BG, OCEANIA_MARKS } from "./art.mjs";
import { OCEANIA_CITIES, OCEANIA_EDGES } from "./cities.mjs";
import {
  OCEANIA_DOOM,
  OCEANIA_ITEMS,
  OCEANIA_META,
  OCEANIA_REGIONS,
  OCEANIA_SEASONS,
  OCEANIA_SPIRIT,
} from "./flavour.mjs";
import {
  OCEANIA_COLORS,
  OCEANIA_LABELS,
  OCEANIA_LAKES,
  OCEANIA_LAND,
  OCEANIA_PROJ,
  OCEANIA_RIVERS,
  OCEANIA_TERRAIN,
  renderOceaniaDecor,
} from "./geography.mjs";
import { OCEANIA_MONEY_EVENTS } from "./money-events.mjs";
import { OCEANIA_STYLES } from "./music.mjs";
import { OCEANIA_QUIZ } from "./quiz.mjs";

export function buildOceaniaContent() {
  return {
    id: OCEANIA_META.id,
    name: OCEANIA_META.name,
    blurb: OCEANIA_META.blurb,
    cur: OCEANIA_META.cur,
    start: OCEANIA_META.start,
    cpuNames: OCEANIA_META.cpuNames,
    proj: OCEANIA_PROJ,
    regions: OCEANIA_REGIONS,
    cities: OCEANIA_CITIES,
    edges: OCEANIA_EDGES,
    quiz: OCEANIA_QUIZ,
    items: OCEANIA_ITEMS,
    spirit: OCEANIA_SPIRIT,
    doom: OCEANIA_DOOM,
    seasons: OCEANIA_SEASONS,
    moneyEvents: OCEANIA_MONEY_EVENTS,
    stripe: OCEANIA_META.stripe,
    marks: OCEANIA_MARKS,
    bg: OCEANIA_BG,
    sea: OCEANIA_COLORS.sea,
    seaWave: OCEANIA_COLORS.seaWave,
    landBase: OCEANIA_COLORS.landBase,
    coast: OCEANIA_COLORS.coast,
    land: OCEANIA_LAND,
    terrain: OCEANIA_TERRAIN,
    lakes: OCEANIA_LAKES,
    rivers: OCEANIA_RIVERS,
    labels: OCEANIA_LABELS,
    // 他の盤面は投影の px/py を渡して装飾を描くが、**この大陸には装飾を置いていない。**
    // 島が51点に対して海が広く、余白に何か描くと、島そのものより目立ってしまう。
    // `renderOceaniaDecor` は引数を取らず空文字を返す。
    decor: renderOceaniaDecor(),
    styles: OCEANIA_STYLES,
  };
}
