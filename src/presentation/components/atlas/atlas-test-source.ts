import { CityId, CountryId } from "../../../domain/shared-kernel/ids";
import { sameForAllLocales } from "../../../domain/shared-kernel/localized-text";
import { AtlasBoard, AtlasBoardLand, AtlasCity, AtlasLink, AtlasSource } from "./atlas-source";

/**
 * 検査用の、小さな地図帳。
 *
 * 本物(`atlas-model.ts`)は47枚・2,218件を読むので、画面の検査に使うと
 * 遅いうえに**コンテンツを直すたびに画面の検査が落ちる。**
 * ここには形の違うものを1枚ずつ置いてある——
 * 国・その中の盤面・大陸・地球ぜんぶ・地図の外・日付変更線をまたぐもの。
 */

function board(
  id: string,
  name: string,
  bounds: { lon0: number; lon1: number; lat0: number; lat1: number },
  scale: AtlasBoard["scale"],
  extra: Partial<AtlasBoard> = {},
): AtlasBoard {
  return {
    id: CountryId(id),
    name: sameForAllLocales(name),
    blurb: sameForAllLocales(`${name} の一言`),
    bounds,
    parentId: null,
    scale,
    offEarth: false,
    cityCount: 3,
    ...extra,
  };
}

export const TEST_BOARDS: readonly AtlasBoard[] = [
  board("japan", "Japan", { lon0: 128, lon1: 146, lat0: 46, lat1: 30 }, "country"),
  board("ibaraki", "Ibaraki", { lon0: 140, lon1: 141, lat0: 37, lat1: 35.7 }, "closeup", {
    parentId: CountryId("japan"),
    cityCount: 1,
  }),
  board("france", "France", { lon0: -5, lon1: 9, lat0: 51, lat1: 42 }, "country"),
  board("asia", "Asia", { lon0: 60, lon1: 150, lat0: 55, lat1: -10 }, "continent"),
  // 日付変更線をまたぐ盤面。素朴に描くと画面の外へ飛ぶ。
  board("oceania", "Oceania", { lon0: 132, lon1: 233, lat0: -8, lat1: -48 }, "continent"),
  board("world", "Around the World", { lon0: -188, lon1: 216, lat0: 75, lat1: -56 }, "world"),
  board("solarsystem", "The Solar System", { lon0: 0, lon1: 0, lat0: 0, lat1: 0 }, "world", {
    offEarth: true,
  }),
];

export const TEST_CITIES: Record<string, readonly AtlasCity[]> = {
  japan: [
    {
      id: CityId("tokyo"),
      boardId: CountryId("japan"),
      name: sameForAllLocales("Tokyo"),
      tag: sameForAllLocales("The capital"),
      fact: sameForAllLocales("Tokyo grew from a fishing village called Edo."),
      lon: 139.7,
      lat: 35.7,
      markSvg: '<circle cx="12" cy="12" r="8" fill="#f5b31c"/>',
      sceneKey: "metropolis",
    },
    {
      id: CityId("kyoto"),
      boardId: CountryId("japan"),
      name: sameForAllLocales("Kyoto"),
      tag: sameForAllLocales("A thousand years of capital"),
      fact: sameForAllLocales("Kyoto keeps 1,600 Buddhist temples."),
      lon: 135.8,
      lat: 35,
      // 印の無い町。点だけ打って、地図から消えないようにする。
      markSvg: "",
      sceneKey: null,
    },
  ],
  // 地球の上に無い盤面。**「町」は惑星で、経度緯度は地図の意味を持たない。**
  solarsystem: [
    {
      id: CityId("saturn"),
      boardId: CountryId("solarsystem"),
      name: sameForAllLocales("Saturn"),
      tag: sameForAllLocales("The ringed one"),
      fact: sameForAllLocales("Saturn would float in a bath big enough."),
      lon: 160.15,
      lat: 7.96,
      markSvg: '<circle cx="12" cy="12" r="7" fill="#d8c07a"/>',
      sceneKey: null,
    },
    {
      id: CityId("uranus"),
      boardId: CountryId("solarsystem"),
      name: sameForAllLocales("Uranus"),
      tag: sameForAllLocales("The tilted one"),
      fact: sameForAllLocales("Uranus rolls around the Sun on its side."),
      lon: 187.46,
      lat: 5.97,
      markSvg: '<circle cx="12" cy="12" r="6" fill="#7fd8e8"/>',
      sceneKey: null,
    },
  ],
  ibaraki: [
    {
      id: CityId("mito"),
      boardId: CountryId("ibaraki"),
      name: sameForAllLocales("Mito"),
      tag: sameForAllLocales("Plum blossoms"),
      fact: sameForAllLocales("Kairakuen opens to everyone, as its name says."),
      lon: 140.47,
      lat: 36.37,
      markSvg: '<rect x="6" y="6" width="12" height="12" fill="#37b3a4"/>',
      sceneKey: null,
    },
  ],
};

/**
 * 町と町をつなぐ線。**線路と航路を1本ずつ**と、**日付変更線をまたぐ航路**。
 * またぐ1本は、素朴に結ぶと地図を横断してしまう形にしてある
 * (179.2度のフナフティと、188.2度=西経171.8度のアピア)。
 */
export const TEST_LINKS: Record<string, readonly AtlasLink[]> = {
  japan: [
    {
      from: CityId("tokyo"),
      to: CityId("kyoto"),
      kind: "rail",
      lonA: 139.7,
      latA: 35.7,
      lonB: 135.8,
      latB: 35,
    },
    {
      from: CityId("kyoto"),
      to: CityId("tokyo"),
      kind: "sea",
      lonA: 135.8,
      latA: 35,
      lonB: 139.7,
      latB: 35.7,
    },
  ],
  solarsystem: [
    {
      from: CityId("saturn"),
      to: CityId("uranus"),
      kind: "sea",
      lonA: 160.15,
      latA: 7.96,
      lonB: 187.46,
      latB: 5.97,
    },
  ],
  oceania: [
    {
      from: CityId("funafuti"),
      to: CityId("apia"),
      kind: "sea",
      lonA: 179.2,
      latA: -8.5,
      lonB: 188.2,
      latB: -13.8,
    },
  ],
};

/**
 * 盤面の細かい海岸線。**世界の粗い輪郭(上の `worldLand`)より内側**に取ってある。
 * 粗いほうは 125〜148度の四角ひとつ、こちらは島が2つ。寄ったときに
 * 「粗い四角が消えて、細かい島が出る」ことを検査で見分けられる形にしている。
 */
export const TEST_BOARD_LAND: AtlasBoardLand = {
  land: [
    [
      [130, 44],
      [143, 44],
      [143, 32],
      [130, 32],
    ],
    [
      [134, 31],
      [137, 31],
      [137, 29],
      [134, 29],
    ],
  ],
  terrain: [
    {
      color: "#e8f0f4",
      polygon: [
        [131, 43],
        [140, 43],
        [140, 40],
        [131, 40],
      ],
    },
  ],
  lakes: [{ lon: 136, lat: 35.2, rxDeg: 0.4, ryDeg: 0.25, rotation: 0, color: "#3f8fc4" }],
  rivers: [
    [
      [138, 38],
      [139, 36.4],
      [140, 35.8],
    ],
  ],
  // 飾り(山・鳥居)。盤面のピクセル座標で描かれた断片と、その写し。
  decor: { svg: '<path d="M10 10 L20 20 L0 20 Z" fill="#6b5a3a"/>', transform: "translate(130 -44) scale(0.01 0.01)" },
  colors: { sea: "#16263f", land: "#7aa85a", coast: "#2b4a2a" },
};

/** すぐ答える差し替え先。読み込みの見せかたを試すときは `delayed` を使う。 */
export function testAtlasSource(overrides: Partial<AtlasSource> = {}): AtlasSource {
  return {
    atlasBoards: () => TEST_BOARDS,
    worldLand: () => [
      // 盤面の枠(japan は 128〜146)からはみ出すかたまり。**大陸のつもり。**
      // 盤面へ寄っても消えない側(消すと、日本へ寄った拍子に隣の国が消える)。
      [
        [125, 46],
        [148, 46],
        [148, 28],
        [125, 28],
      ],
      // 枠に丸ごと収まるかたまり。**盤面の細かい海岸線が描き直す側。**
      [
        [131, 44],
        [144, 44],
        [144, 31],
        [131, 31],
      ],
      // 変更線の向こう側にはみ出したかたまり(チュコト半島に相当)。
      [
        [186, 68],
        [200, 68],
        [200, 60],
        [186, 60],
      ],
    ],
    worldColors: () => ({ sea: "#16324f", land: "#83a55c", coast: "#2f4a2a" }),
    worldLabels: () => [
      { lon: -148, lat: 26, text: sameForAllLocales("NORTH PACIFIC"), isWater: true },
      { lon: 20, lat: 22, text: sameForAllLocales("SAHARA"), isWater: false },
    ],
    boardsAt: (lon, lat) =>
      TEST_BOARDS.filter(
        (b) =>
          !b.offEarth &&
          lon >= Math.min(b.bounds.lon0, b.bounds.lon1) &&
          lon <= Math.max(b.bounds.lon0, b.bounds.lon1) &&
          lat <= b.bounds.lat0 &&
          lat >= b.bounds.lat1,
      ).sort(
        (a, b) =>
          Math.abs(a.bounds.lon1 - a.bounds.lon0) - Math.abs(b.bounds.lon1 - b.bounds.lon0),
      ),
    coverageGaps: () => [
      { lon0: 0, lon1: 5, lat0: 25, lat1: 20 },
      { lon0: 5, lon1: 10, lat0: 25, lat1: 20 },
    ],
    loadAtlasCities: (boardId) => Promise.resolve(TEST_CITIES[boardId as string] ?? []),
    loadAtlasLinks: (boardId) => Promise.resolve(TEST_LINKS[boardId as string] ?? []),
    loadBoardLand: () => Promise.resolve(TEST_BOARD_LAND),
    ...overrides,
  };
}
