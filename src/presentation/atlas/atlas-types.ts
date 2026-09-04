import { CityId, CountryId } from "../../domain/shared-kernel/ids";
import { LocalizedText } from "../../domain/shared-kernel/localized-text";

/**
 * 地図帳(Atlas)が扱う型。**実装を持たない。**
 *
 * 型と実装を別ファイルに分けているのは、入口の `atlas-model.ts` が
 * すべてを再輸出する形にすると、実装から入口を参照した瞬間に循環参照になり
 * `npm run depcruise` の `no-circular` で落ちるため。
 */

/**
 * 盤面が世界のどこにあたるか(四隅)。`country-index.json` の `bounds` と同じ形で、
 * **`lat0` が北、`lat1` が南**(緯度は上が大きい)。
 *
 * 経度は **180度を超える値が入りうる**(`world` は -188〜216、`oceania` は 132〜233)。
 * そのまま大小比較すると壊れるので、判定は必ず `geo.ts` の関数を通すこと。
 */
export interface AtlasBounds {
  readonly lon0: number;
  readonly lon1: number;
  readonly lat0: number;
  readonly lat1: number;
}

/**
 * 盤面の引き具合。
 *
 * - `world` … 地球ぜんぶ、または地球の外(世界一周・太陽系)
 * - `continent` … 大陸ひとつ(アジア・アフリカなど6枚)
 * - `country` … 国ひとつ
 * - `closeup` … 国の中の県・地方・島(茨城県・北海道・九州・日本百名山・バリ島)
 *
 * **`coverageGaps` はここを見て「広い盤面」を除く。**世界一周と大陸の盤面は
 * 地球の陸地をほぼ丸ごと覆うので、数に入れると空白が必ず0件になる。
 */
export type AtlasScale = "world" | "continent" | "country" | "closeup";

export interface AtlasBoard {
  readonly id: CountryId;
  readonly name: LocalizedText;
  readonly blurb: LocalizedText;
  readonly bounds: AtlasBounds;
  /** 親の盤面(茨城県 → japan)。無ければ null。 */
  readonly parentId: CountryId | null;
  readonly scale: AtlasScale;
  /** 地球上に無い盤面(太陽系)。世界地図には置かない。 */
  readonly offEarth: boolean;
  readonly cityCount: number;
}

export interface AtlasLabel {
  readonly lon: number;
  readonly lat: number;
  readonly text: LocalizedText;
  /** 海の名前か(偽ならサハラ・ヒマラヤなどの陸の地形帯)。 */
  readonly isWater: boolean;
}

export interface AtlasCity {
  readonly id: CityId;
  readonly boardId: CountryId;
  readonly name: LocalizedText;
  readonly tag: LocalizedText;
  readonly fact: LocalizedText;
  readonly lon: number;
  readonly lat: number;
  /** 印のSVG断片(そのまま dangerouslySetInnerHTML に入れられる形)。 */
  readonly markSvg: string;
  /** 都市の絵(背景シーン)のキー。無ければ null。 */
  readonly sceneKey: string | null;
}

/**
 * 印のSVG断片が描かれている座標系。断片は `viewBox` を持たない生の図形なので、
 * `<svg viewBox={ATLAS_MARK_VIEW_BOX}>` で包んで使う。
 */
export const ATLAS_MARK_VIEW_BOX = "0 0 24 24";

/** 経度・緯度の多角形(または折れ線)。1件が陸のひとかたまり、川ひとすじ。 */
export type AtlasPolygon = readonly (readonly [number, number])[];

/** 陸の上の色帯(砂漠・雪国・高地など)。陸で切り抜いて描く。 */
export interface AtlasTerrainBand {
  readonly color: string;
  readonly polygon: AtlasPolygon;
}

/**
 * 湖。**楕円ひとつ**として持っている(元のコンテンツがそう書かれている)。
 *
 * 元データの半径は**盤面の絵のピクセル**なので、地図帳の座標(度)へ
 * 直してから渡す。直さずに使うと、日本の湖は半径17度——本州より大きい円になる。
 */
export interface AtlasLake {
  readonly lon: number;
  readonly lat: number;
  /** 東西の半径(度)。 */
  readonly rxDeg: number;
  /** 南北の半径(度)。 */
  readonly ryDeg: number;
  /** 傾き(度)。盤面の絵の縦横比で付けられた角度なので、地図では目安。 */
  readonly rotation: number;
  readonly color: string;
}

/**
 * その盤面の海岸線と地形。**町と同じく、寄ったときだけ読む。**
 *
 * 世界地図の下敷き(`worldLand`)は地球ぜんぶを38枚の多角形で表した粗いもので、
 * 日本ひとつが5枚しかない。国まで寄るとただの緑の面になってしまうので、
 * その盤面が自分で持っている実座標の海岸線に敷き替える。
 */
export interface AtlasBoardLand {
  readonly land: readonly AtlasPolygon[];
  readonly terrain: readonly AtlasTerrainBand[];
  readonly lakes: readonly AtlasLake[];
  readonly rivers: readonly AtlasPolygon[];
  readonly colors: { readonly land: string; readonly coast: string; readonly sea: string };
}
