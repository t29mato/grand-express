import { CountryProjection } from "../../domain/board/board-projection";
import { CountryContentPack } from "../../domain/country/country-content-pack";
import { CountryId } from "../../domain/shared-kernel/ids";
import { AtlasBoardLand, AtlasLake, AtlasTerrainBand } from "./atlas-types";
import { atlasContentRepository } from "./content-packs";

/**
 * 盤面の海岸線と地形を読む。**町(`atlas-cities.ts`)と同じJSONの別の部分。**
 *
 * ## なぜ要るのか
 *
 * 地図帳の下敷きは世界一周盤の陸地(38枚の多角形)だけだった。地球ぜんぶを
 * 表すには足りていても、**国まで寄ると1枚の緑の面**になる。実測では、
 * 日本へ寄って見えている経度が 0.82度のとき、海岸線も地形も町も無い
 * ただの緑だけが残った。各盤面のコンテンツには実座標の海岸線・地形帯・湖・川が
 * 入っているので、寄ったらそちらへ敷き替える。
 *
 * ## 単位の落とし穴
 *
 * 湖だけは**盤面の絵のピクセルで半径が書かれている**(`lakes:[経度,緯度,rx,ry,傾き,色]`)。
 * 地図帳の座標は度なので、盤面の投影(`proj`)を使って直す。直さずに描くと
 * 琵琶湖が半径17度——本州より大きい円——になる。
 * (盤面の側でも同じ罠を踏んでいる。リリースノート v0.44 系の「消えていた湖」)
 */
export function loadBoardLand(boardId: CountryId): Promise<AtlasBoardLand> {
  return atlasContentRepository.load(boardId).then(toBoardLand);
}

function toBoardLand(pack: CountryContentPack): AtlasBoardLand {
  const { terrain, projection } = pack;
  return {
    land: terrain.landPolygons,
    terrain: terrain.terrainPolygons.map(
      ([color, polygon]): AtlasTerrainBand => ({ color, polygon }),
    ),
    lakes: terrain.lakes
      .map(([lon, lat, rx, ry, rotation, color]): AtlasLake => {
        const scale = degreesPerBoardPixel(projection);
        return {
          lon,
          lat,
          rxDeg: rx * scale.lon,
          ryDeg: ry * scale.lat,
          rotation,
          color,
        };
      })
      // 大きさを出せなかった湖(投影が壊れている盤面)は描かない。
      // 0や NaN の半径を SVG へ流すと、その盤面まるごとが黙って描かれなくなる。
      .filter((lake) => finite(lake.rxDeg) && finite(lake.ryDeg) && lake.rxDeg > 0 && lake.ryDeg > 0),
    rivers: terrain.rivers,
    colors: { land: terrain.landColor, coast: terrain.coastColor, sea: terrain.seaColor },
  };
}

/** 盤面の絵の1ピクセルが、経度・緯度の何度にあたるか。 */
function degreesPerBoardPixel(projection: CountryProjection): { lon: number; lat: number } {
  const { lon0, lon1, lat0, lat1, boardWidth, boardHeight } = projection;
  return {
    lon: boardWidth > 0 ? Math.abs(lon1 - lon0) / boardWidth : 0,
    lat: boardHeight > 0 ? Math.abs(lat0 - lat1) / boardHeight : 0,
  };
}

const finite = (n: number): boolean => Number.isFinite(n);
