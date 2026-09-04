import { AtlasBounds } from "./atlas-types";

/**
 * 経度・緯度まわりの素朴な計算。**描画にも状態にも依存しない。**
 *
 * ## 日付変更線をどう扱うか
 *
 * 盤面の四隅(`country-index.json` の `bounds`)は投影の枠であって、
 * 経度が -180〜180 に収まっている保証が無い。実際、
 *
 * - `world` … `lon0:-188` 〜 `lon1:216`(404度ぶん。地球一周より広い)
 * - `oceania` … `lon0:132` 〜 `lon1:233`(233は西経127度のこと)
 * - `russia` … `lon1:180`(ちょうど境目)
 *
 * `lon0 <= lon && lon <= lon1` と素直に書くと、オセアニアはフィジーもタヒチも
 * 「範囲外」になる。そこで **枠の左端からの差を360度で割った余り**で見る。
 * `(lon - lon0) mod 360 <= (lon1 - lon0)` なら中、という形にすれば、
 * 変更線をまたごうが、枠が360度を超えていようが同じ式で済む。
 *
 * 陸地の多角形(`world-outline.data.ts`)にも180度を超える点がある
 * (ユーラシアの東端が189.5まで伸びている)。こちらは畳まずに、
 * **調べる点のほうを `lon-360` / `lon` / `lon+360` の3通り**で当てる。
 */

/** 経度を -180 以上 180 未満に畳む。 */
export function normalizeLongitude(lon: number): number {
  return ((((lon + 180) % 360) + 360) % 360) - 180;
}

/** 枠の経度方向の広さ(0〜360度)。地球一周を超える枠は360度に丸める。 */
export function boundsLonSpan(bounds: AtlasBounds): number {
  const span = bounds.lon1 - bounds.lon0;
  if (span >= 360) return 360;
  return span < 0 ? span + 360 : span;
}

/** 枠の緯度方向の広さ。`lat0` が北・`lat1` が南だが、念のため両方向を許す。 */
export function boundsLatSpan(bounds: AtlasBounds): number {
  return Math.abs(bounds.lat0 - bounds.lat1);
}

/** 枠のおおよその広さ。**狭い順に並べる**ためだけに使う相対値。 */
export function boundsArea(bounds: AtlasBounds): number {
  return boundsLonSpan(bounds) * boundsLatSpan(bounds);
}

/** その一点が枠の中か。日付変更線をまたぐ枠でも正しく判定する。 */
export function boundsContain(bounds: AtlasBounds, lon: number, lat: number): boolean {
  const north = Math.max(bounds.lat0, bounds.lat1);
  const south = Math.min(bounds.lat0, bounds.lat1);
  if (lat > north || lat < south) return false;

  const span = boundsLonSpan(bounds);
  if (span >= 360) return true;
  const offset = (((lon - bounds.lon0) % 360) + 360) % 360;
  return offset <= span;
}

/**
 * 多角形の内外判定(交差数)。境界そのものはどちらに転んでもよい
 * (格子の当たり判定に使うので、1点の取りこぼしは結果を変えない)。
 */
export function pointInPolygon(
  lon: number,
  lat: number,
  polygon: readonly (readonly [number, number])[],
): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

/**
 * その一点が多角形群のどれかの中か。
 * 変更線をまたぐ多角形のため、調べる点を ±360度ずらした3通りで当てる。
 */
export function pointInPolygons(
  lon: number,
  lat: number,
  polygons: readonly (readonly (readonly [number, number])[])[],
): boolean {
  for (const polygon of polygons) {
    if (
      pointInPolygon(lon, lat, polygon) ||
      pointInPolygon(lon + 360, lat, polygon) ||
      pointInPolygon(lon - 360, lat, polygon)
    ) {
      return true;
    }
  }
  return false;
}
