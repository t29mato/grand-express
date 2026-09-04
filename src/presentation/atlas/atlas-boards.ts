import { COUNTRY_INDEX } from "../../infrastructure/content/country-index";
import { CountryId } from "../../domain/shared-kernel/ids";
import { AtlasBoard, AtlasScale } from "./atlas-types";
import { CITY_COUNTS } from "./city-counts.data";
import { boundsArea, boundsContain } from "./geo";

/**
 * 盤面47枚を、地図の上に置ける形で並べ直したもの。
 *
 * 素の `country-index.json` は名前・四隅・サムネイルしか持っていない。
 * 地図帳はそこに **親子関係**(茨城県は日本の中)と **引き具合**(県なのか大陸なのか)、
 * それに **地球の上に無いかどうか**(太陽系)を足して使う。
 * どれも地理の事実で、四隅の重なりからは出せないので手で書く
 * (`country-groups.ts` に同じ趣旨の表がある。あちらは選択画面用、
 *  こちらは地図用。**両者がずれたら `atlas-boards.test.ts` が落ちる。**)
 */

/**
 * 中に入っている盤面 → 親。
 *
 * `presentation/components/setup/country-groups.ts` の `SUB_BOARDS` と同じ内容を
 * 逆引きの形で持っている。**画面(components)に依存したくない**のでここに写し、
 * 写し間違いは検査で見つける。
 */
const PARENT_BY_ID: Readonly<Record<string, string>> = {
  ibaraki: "japan",
  hyakumeizan: "japan",
  hokkaido: "japan",
  kyushu: "japan",
  bali: "indonesia",
};

/**
 * 引き具合。ここに無いものは `country`。
 *
 * **`world` と大陸6枚を "country" にしてはいけない。**この8枚は地球の陸地を
 * ほぼ丸ごと覆うので、`coverageGaps` がこれらを数に入れると空白が0件になり、
 * 「まだ作っていない場所」が何も見えなくなる(実測: 5度格子で陸592セル中、
 * 広い盤面込みなら空白0セル、除けば158セル)。
 */
const SCALE_BY_ID: Readonly<Record<string, AtlasScale>> = {
  world: "world",
  // 太陽系は地球の上に無い。引き具合としては「全球」に置いておくが、
  // 地図に関わる関数(boardsAt / coverageGaps)からは offEarth で外れる。
  solarsystem: "world",
  africa: "continent",
  asia: "continent",
  europe: "continent",
  northamerica: "continent",
  southamerica: "continent",
  oceania: "continent",
  ibaraki: "closeup",
  hokkaido: "closeup",
  kyushu: "closeup",
  hyakumeizan: "closeup",
  bali: "closeup",
};

/** 地球の上に無い盤面。世界地図には置かない。 */
const OFF_EARTH_IDS: ReadonlySet<string> = new Set(["solarsystem"]);

const BOARDS: readonly AtlasBoard[] = COUNTRY_INDEX.map((entry) => ({
  id: CountryId(entry.id),
  name: entry.name,
  blurb: entry.blurb,
  bounds: entry.bounds,
  parentId: PARENT_BY_ID[entry.id] ? CountryId(PARENT_BY_ID[entry.id]) : null,
  scale: SCALE_BY_ID[entry.id] ?? "country",
  offEarth: OFF_EARTH_IDS.has(entry.id),
  cityCount: CITY_COUNTS[entry.id] ?? 0,
}));

/** 盤面47枚。並びは `country-index.json` の順(= 抽出順)。 */
export function atlasBoards(): readonly AtlasBoard[] {
  return BOARDS;
}

export function atlasBoard(id: CountryId): AtlasBoard | null {
  return BOARDS.find((board) => board.id === id) ?? null;
}

/**
 * その一点を含む盤面を、**狭いものから順に**返す。
 *
 * 例: 水戸(140.47, 36.37)なら
 * 茨城県 → 日本百名山 → 日本 → アジア → 世界一周 の5枚。
 * (百名山は北海道から九州まで四隅が伸びているので、日本より狭い枠として先に来る)
 *
 * 地球の上に無い盤面(太陽系)は返さない。
 */
export function boardsAt(lon: number, lat: number): readonly AtlasBoard[] {
  return BOARDS.filter((board) => !board.offEarth && boundsContain(board.bounds, lon, lat)).sort(
    (a, b) => {
      const diff = boundsArea(a.bounds) - boundsArea(b.bounds);
      // 同じ広さの盤面が並んだときに順番が揺れないよう、idで決める。
      return diff !== 0 ? diff : a.id.localeCompare(b.id);
    },
  );
}
