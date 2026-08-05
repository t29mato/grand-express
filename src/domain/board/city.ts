import { CityId, RegionId } from "../shared-kernel/ids";
import { LocalizedText } from "../shared-kernel/localized-text";

/** 都市に存在する1つの物件(ビジネス)のマスターデータ。 */
export interface PropertyDefinition {
  readonly name: LocalizedText;
  readonly cost: number;
  readonly income: number;
}

export interface City {
  readonly id: CityId;
  readonly name: LocalizedText;
  readonly regionId: RegionId;
  readonly longitude: number;
  readonly latitude: number;
  readonly tag: LocalizedText;
  readonly fact: LocalizedText;
  readonly properties: readonly PropertyDefinition[];
  /** 都市イラストの背景シーンのキー(現行コードの `city.bg`)。 */
  readonly artSceneKey: string;
  /** 都市イラストのシンボルのキー(現行コードの `city.mark`)。 */
  readonly artGlyphKey: string;
  /** 盤面上の都市名ラベルの位置(現行コードの `city.lp`)。 */
  readonly labelPosition: "left" | "right" | "bottom";
}

/** 都市間を結ぶ路線。 */
/**
 * 路線の種類。
 * - `rail` … 陸路。枕木のある線路として描く
 * - `sea`  … 航路。島と本土、島同士を結ぶ。線の見た目が異なるだけで、
 *            進み方(中間マスに止まる)は陸路と同じ
 */
export type EdgeKind = "rail" | "sea";

export interface Edge {
  readonly from: CityId;
  readonly to: CityId;
  readonly kind: EdgeKind;
}
