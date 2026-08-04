import { CityId, RegionId } from "../shared-kernel/ids";

/** 都市に存在する1つの物件(ビジネス)のマスターデータ。 */
export interface PropertyDefinition {
  readonly name: string;
  readonly cost: number;
  readonly income: number;
}

export interface City {
  readonly id: CityId;
  readonly name: string;
  readonly regionId: RegionId;
  readonly longitude: number;
  readonly latitude: number;
  readonly properties: readonly PropertyDefinition[];
}

/** 都市間を結ぶ路線。 */
export type Edge = readonly [CityId, CityId];
