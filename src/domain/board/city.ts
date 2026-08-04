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
}

/** 都市間を結ぶ路線。 */
export type Edge = readonly [CityId, CityId];
