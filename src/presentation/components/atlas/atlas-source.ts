import type { CityId, CountryId } from "../../../domain/shared-kernel/ids";
import type { LocalizedText } from "../../../domain/shared-kernel/localized-text";

/**
 * 地図帳が要る**データの形**。中身は `src/presentation/atlas/atlas-model.ts`
 * (データ層の担当)が用意する。
 *
 * ## なぜ画面側にも同じ型を書いているのか
 *
 * ここに書いてあるのは**注文書**である。実物(`atlas-model.ts`)を直接
 * 全コンポーネントから読むと、
 *
 * - データ層がまだ無い時間帯に画面が1行も書けない、
 * - 検査のたびに 2,218件の本物のコンテンツを読むことになる、
 *
 * の2つが起きる。画面側は**この注文書だけ**を見て組み、実物との接続は
 * `atlas-live-source.ts` の1ファイルに閉じ込めてある。注文と実物が
 * 食い違ったら、その1ファイルが型で落ちる(画面のあちこちではなく)。
 */

/** 盤面が世界のどこにあたるか。`lat0` が北、`lat1` が南(緯度は上が大きい)。 */
export interface AtlasBounds {
  readonly lon0: number;
  readonly lon1: number;
  readonly lat0: number;
  readonly lat1: number;
}

export interface AtlasBoard {
  readonly id: CountryId;
  readonly name: LocalizedText;
  readonly blurb: LocalizedText;
  readonly bounds: AtlasBounds;
  /** 中に入っている盤面の親(茨城県 → japan)。無ければ `null`。 */
  readonly parentId: CountryId | null;
  readonly scale: "world" | "continent" | "country" | "closeup";
  /** 太陽系のように地球の上に置けない盤面。世界地図には出さない。 */
  readonly offEarth: boolean;
  readonly cityCount: number;
}

export interface AtlasCity {
  readonly id: CityId;
  readonly boardId: CountryId;
  readonly name: LocalizedText;
  readonly tag: LocalizedText;
  readonly fact: LocalizedText;
  readonly lon: number;
  readonly lat: number;
  /** そのまま `dangerouslySetInnerHTML` に入れられるSVG断片。 */
  readonly markSvg: string;
  readonly sceneKey: string | null;
}

export interface AtlasColors {
  readonly sea: string;
  readonly land: string;
  readonly coast: string;
}

export interface AtlasLabel {
  readonly lon: number;
  readonly lat: number;
  readonly text: LocalizedText;
  /**
   * 海の名前か(偽ならサハラ・ヒマラヤなどの陸の地形帯)。
   *
   * **必ず入っている。**以前ここだけ省略可(`isWater?`)にしていたが、実物
   * (`atlas-types.ts` の `AtlasLabel`)は必ず持っており、画面も
   * 「水色の字か、陸の字か」の振り分けに毎回使っている。注文書のほうが
   * 甘いと、差し替えの検査データが `isWater` を持たなくても型で気づけない。
   */
  readonly isWater: boolean;
}

/**
 * 町の印のSVG断片が描かれている座標系。断片は `viewBox` を持たない生の図形なので、
 * `<svg viewBox={ATLAS_MARK_VIEW_BOX}>` で包むか、`MARK_SIZE` で割って縮める。
 * **データ層の `ATLAS_MARK_VIEW_BOX` と同じ値**(`atlas-contract.test.ts` が見張る)。
 */
export const ATLAS_MARK_VIEW_BOX = "0 0 24 24";
export const MARK_SIZE = 24;

/** 経度緯度の多角形(または折れ線)。1件が陸のひとかたまり、川ひとすじ。 */
export type AtlasPolygon = readonly (readonly [number, number])[];

/** 陸の上の色帯(砂漠・雪国・高地など)。陸で切り抜いて描く。 */
export interface AtlasTerrainBand {
  readonly color: string;
  readonly polygon: AtlasPolygon;
}

/** 湖。楕円ひとつぶん。半径は**度**(データ層が盤面のピクセルから直してくれている)。 */
export interface AtlasLake {
  readonly lon: number;
  readonly lat: number;
  readonly rxDeg: number;
  readonly ryDeg: number;
  readonly rotation: number;
  readonly color: string;
}

/**
 * その盤面の海岸線と地形。**町と同じく、寄ったときだけ読む。**
 *
 * 世界地図の下敷き(`worldLand`)は地球ぜんぶを38枚で表した粗いもので、
 * 日本ひとつが5枚62点しかない。国まで寄ると**ただの緑の面**になるので、
 * 寄ったらこちらへ敷き替える(`atlas-map.tsx` の「寄ったら盤面の地形へ」)。
 */
export interface AtlasBoardLand {
  readonly land: readonly AtlasPolygon[];
  readonly terrain: readonly AtlasTerrainBand[];
  readonly lakes: readonly AtlasLake[];
  readonly rivers: readonly AtlasPolygon[];
  readonly colors: { readonly land: string; readonly coast: string; readonly sea: string };
}

export interface AtlasSource {
  atlasBoards(): readonly AtlasBoard[];
  worldLand(): readonly AtlasPolygon[];
  worldColors(): AtlasColors;
  worldLabels(): readonly AtlasLabel[];
  boardsAt(lon: number, lat: number): readonly AtlasBoard[];
  coverageGaps(cellDegrees: number): readonly AtlasBounds[];
  loadAtlasCities(boardId: CountryId): Promise<readonly AtlasCity[]>;
  /** その盤面の海岸線と地形。町と同じく、寄ったときだけ読む。同じ盤面は2度読まない。 */
  loadBoardLand(boardId: CountryId): Promise<AtlasBoardLand>;
}

/**
 * 世界地図の塗り分けに使う盤面かどうか。
 *
 * **`world` と6つの大陸盤面は地球の陸をほぼ丸ごと覆う。**この8件も一緒に
 * 塗ると地図ぜんぶが「盤面あり」になり、**まだ無い場所が消える。**
 * 遊ぶ人が知りたいのは「その国の盤面があるか」なので、塗るのは
 * 国と、その中の盤面だけにする(取りまとめ側の計測では、この39件で数えると
 * 陸地の26%——5度格子で591セル中157セル——に盤面が無い)。
 * 広い盤面は一覧の側で「この範囲をまとめて遊ぶ盤面」として別に出す。
 */
export function isCoverageBoard(board: AtlasBoard): boolean {
  return !board.offEarth && (board.scale === "country" || board.scale === "closeup");
}

/** 地図には置けない盤面(太陽系など)。 */
export function isOffMapBoard(board: AtlasBoard): boolean {
  return board.offEarth;
}

/** 地球の上にあるが、塗り分けには使わない広い盤面(世界一周・大陸)。 */
export function isWideBoard(board: AtlasBoard): boolean {
  return !board.offEarth && (board.scale === "world" || board.scale === "continent");
}

/**
 * 地球の陸をまるごと覆う盤面(世界一周)。
 * **地図には枠も名前も出さない。**枠は画面の縁と重なり、名前は
 * 「地球のどこか」にしか置けないので、どちらも意味を持たない。一覧には出る。
 */
export function isWholeEarthBoard(board: AtlasBoard): boolean {
  return !board.offEarth && board.scale === "world";
}
