import { City } from "./city";

/**
 * 国コンテンツごとの地理投影パラメータ。現行コードの `G.proj` に相当。
 * 中間マス(quiz/blue/red/card)の生成数は、都市間の投影後距離に基づいて決まる
 * ため、盤面トポロジーを決定するドメイン知識として扱う
 * (見た目の座標そのものはPresentation層が別途計算する。ADR-0003参照)。
 */
export interface CountryProjection {
  readonly boardWidth: number;
  readonly boardHeight: number;
  readonly lon0: number;
  readonly lon1: number;
  readonly lat0: number;
  readonly lat1: number;
  /** 中間マス1個あたりの目安距離(px相当)。省略時は64。 */
  readonly segmentLength?: number;
}

function projectX(longitude: number, projection: CountryProjection): number {
  const { lon0, lon1, boardWidth } = projection;
  return ((longitude - lon0) / (lon1 - lon0)) * boardWidth;
}

function projectY(latitude: number, projection: CountryProjection): number {
  const { lat0, lat1, boardHeight } = projection;
  return ((latitude - lat0) / (lat1 - lat0)) * boardHeight;
}

/** 2都市間の投影後ユークリッド距離。 */
export function projectedDistance(
  a: City,
  b: City,
  projection: CountryProjection,
): number {
  const ax = projectX(a.longitude, projection);
  const ay = projectY(a.latitude, projection);
  const bx = projectX(b.longitude, projection);
  const by = projectY(b.latitude, projection);
  return Math.hypot(bx - ax, by - ay);
}

/** 1つの路線に生成する中間マスの数(1〜5個)。現行コードの `n` に相当。 */
export function segmentCount(
  distance: number,
  projection: CountryProjection,
): number {
  const segmentLength = projection.segmentLength ?? 64;
  return Math.max(1, Math.min(5, Math.round(distance / segmentLength)));
}
