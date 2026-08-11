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

/**
 * 経緯度を盤面座標へ落とす。
 * 盤面の描画・配置・テストで同じ式を使うため、ここだけに置く。
 */
export function projectPoint(
  longitude: number,
  latitude: number,
  projection: CountryProjection,
): { readonly x: number; readonly y: number } {
  return { x: projectX(longitude, projection), y: projectY(latitude, projection) };
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

/**
 * 1つの路線に生成する中間マスの数(0〜9個)。
 *
 * **近すぎる町は直結する(0個)。** マスの間隔は `distance/(n+1)` で決まるので、
 * どんなに短い路線にも必ず1個置く作りだと、間隔が路線の長さの半分まで潰れる。
 * 実測では日本で 8.6px(横浜—鎌倉)まで詰まり、いちばん広い路線の 128.6px とは
 * **14.9倍**の開きがあった。「サイコロは1なのに2マス分進めている」という報告は
 * ここから来ている——同じ「1マス」が、路線によって別の長さで描かれてしまう。
 *
 * 0個を許すと、最短の路線でも間隔が距離そのものになるので下限が外れる。
 * 上限を5から9へ広げたのは、長い路線側も同じ理由で間延びしていたため。
 * 描画後の隣接マス間距離(最大/最小)の実測:
 *
 *   india 7.2倍 → 3.3倍 / world 6.7倍 → 3.7倍 / france 11.6倍 → 9.2倍
 *   日本では、間隔が34px未満に潰れた組が 34 → 7 に減る
 *
 * **中間マスの総数はほとんど変わらない**(日本 151→139、インド 159→156、
 * フランス 160→157)ので、盤面の長さ=遊びの長さはほぼそのまま保たれる。
 * 茨城は直結になる路線が無く、まったく変わらない。
 */
export function segmentCount(
  distance: number,
  projection: CountryProjection,
): number {
  const segmentLength = projection.segmentLength ?? 64;
  // 目安距離の3/4より近い町は、マスを挟まずに直接つなぐ。
  if (distance < segmentLength * 0.75) return 0;
  return Math.max(1, Math.min(9, Math.round(distance / segmentLength)));
}
