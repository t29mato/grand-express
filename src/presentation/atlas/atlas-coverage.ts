import { AtlasBoard, AtlasBounds } from "./atlas-types";
import { atlasBoards } from "./atlas-boards";
import { WORLD_LAND } from "./world-outline.data";
import { boundsContain, pointInPolygon } from "./geo";

/**
 * **まだ国の盤面が無い場所を数える。**地図帳のいちばんの売り。
 *
 * ## なぜ「国の盤面」に限るのか
 *
 * 最初は「どの盤面の四隅にも入らない陸地」で数えようとして、**0件になった。**
 * `world` の四隅は経度 -188〜216・緯度 75〜-56 で地球の陸地を丸ごと覆い、
 * 大陸の6枚もそれぞれの大陸を丸ごと覆っているので、当たり前だった。
 *
 * 遊ぶ人が知りたいのは「**この土地を走る盤面**があるか」なので、
 * `scale` が `country` か `closeup` の39枚だけで数える。
 * 5度格子で陸592セル中158セル(27%)が空白になる。
 *
 * ## 海を空白と言わないために
 *
 * 陸かどうかは `WORLD_LAND`(世界一周盤の陸地の輪郭38枚)の内外判定で決める。
 * **1セルにつき9点**(縦横それぞれ1/6・1/2・5/6の位置)を調べ、
 * 1点でも陸なら陸のあるセルとする。中心1点だけだと、
 * 中心がたまたま湾や海峡に落ちる海沿いのセルを取りこぼす。
 */

interface PreparedPolygon {
  readonly points: readonly (readonly [number, number])[];
  readonly minLon: number;
  readonly maxLon: number;
  readonly minLat: number;
  readonly maxLat: number;
}

const PREPARED_LAND: readonly PreparedPolygon[] = WORLD_LAND.map((points) => {
  let minLon = Infinity;
  let maxLon = -Infinity;
  let minLat = Infinity;
  let maxLat = -Infinity;
  for (const [lon, lat] of points) {
    if (lon < minLon) minLon = lon;
    if (lon > maxLon) maxLon = lon;
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
  }
  return { points, minLon, maxLon, minLat, maxLat };
});

/**
 * その一点が陸か。外接矩形で先に振るってから多角形を見る
 * (格子ぜんぶを調べると数万点になるので、素朴に全多角形を回すと遅い)。
 */
export function isLand(lon: number, lat: number): boolean {
  for (const polygon of PREPARED_LAND) {
    if (lat < polygon.minLat || lat > polygon.maxLat) continue;
    // 陸地の輪郭には180度を超える点がある(ユーラシアの東端が189.5)。
    // 多角形を畳むのではなく、調べる点をずらして当てる。
    for (const candidate of [lon, lon + 360, lon - 360]) {
      if (candidate < polygon.minLon || candidate > polygon.maxLon) continue;
      if (pointInPolygon(candidate, lat, polygon.points)) return true;
    }
  }
  return false;
}

/** 盤面が「その土地を走る盤面」として数えられるか(広い盤面と地球外を除く)。 */
function isNarrowBoard(board: AtlasBoard): boolean {
  return !board.offEarth && (board.scale === "country" || board.scale === "closeup");
}

/** セルの中を調べる位置(セルの幅・高さに対する比)。端は避ける。 */
const SAMPLE_FRACTIONS = [1 / 6, 1 / 2, 5 / 6] as const;

export interface CoverageReport {
  /** 陸のあるセルの数。 */
  readonly landCells: number;
  /** そのうち国の盤面があるセルの数。 */
  readonly coveredCells: number;
  /** 国の盤面が無いセル。 */
  readonly gaps: readonly AtlasBounds[];
}

const reportCache = new Map<number, CoverageReport>();

/**
 * 世界を `cellDegrees` 度の格子に切り、陸のあるセルごとに
 * 国の盤面があるかを調べる。同じ粗さで2度目に呼ばれたら数え直さない。
 */
export function coverageReport(cellDegrees: number): CoverageReport {
  if (!(cellDegrees > 0)) throw new Error(`cellDegrees must be positive: ${cellDegrees}`);
  const cached = reportCache.get(cellDegrees);
  if (cached) return cached;

  const narrowBoards = atlasBoards().filter(isNarrowBoard);
  const gaps: AtlasBounds[] = [];
  let landCells = 0;
  let coveredCells = 0;

  // 緯度は北(90)から南(-90)へ。最後の1段が割り切れないときは南極側で切る。
  const rows = Math.ceil(180 / cellDegrees);
  const columns = Math.ceil(360 / cellDegrees);

  for (let row = 0; row < rows; row += 1) {
    const north = 90 - row * cellDegrees;
    const south = Math.max(-90, north - cellDegrees);
    for (let column = 0; column < columns; column += 1) {
      const west = -180 + column * cellDegrees;
      const east = Math.min(180, west + cellDegrees);

      let hasLand = false;
      let covered = false;
      for (const fy of SAMPLE_FRACTIONS) {
        const lat = north - (north - south) * fy;
        for (const fx of SAMPLE_FRACTIONS) {
          const lon = west + (east - west) * fx;
          if (!isLand(lon, lat)) continue;
          hasLand = true;
          if (narrowBoards.some((board) => boundsContain(board.bounds, lon, lat))) {
            covered = true;
            break;
          }
        }
        if (covered) break;
      }

      if (!hasLand) continue;
      landCells += 1;
      if (covered) coveredCells += 1;
      else gaps.push({ lon0: west, lon1: east, lat0: north, lat1: south });
    }
  }

  const report: CoverageReport = { landCells, coveredCells, gaps };
  reportCache.set(cellDegrees, report);
  return report;
}

/**
 * **まだ国の盤面が無い陸地。**
 * `world` と大陸の盤面は地球をほぼ丸ごと覆うので、それらを数に入れると
 * 必ず0件になる。`scale` が `country` か `closeup` のものだけで判定する。
 */
export function coverageGaps(cellDegrees: number): readonly AtlasBounds[] {
  return coverageReport(cellDegrees).gaps;
}
