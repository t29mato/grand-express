import { CountryProjection } from "../../domain/board/board-projection";
import { CountryContentPack } from "../../domain/country/country-content-pack";
import { CountryId } from "../../domain/shared-kernel/ids";
import { AtlasBoardDecor, AtlasBoardLand, AtlasLake, AtlasTerrainBand } from "./atlas-types";
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
 *
 * ## 飾り(山・鳥居・森)も同じ口から返す
 *
 * 遊びの盤面と地図帳を並べて数えると、日本の全体表示で `<path>` が
 * **盤面553本に対して地図帳117本**しかなかった。差の大半が `decor` である。
 * これも湖と同じくピクセル座標だが、**中身はSVGの文字列**なので数として
 * 直せない。写しが線形であることを使って、`<g transform>` 1つに畳む。
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
    decor: toDecor(terrain.decorSvg, projection),
    colors: { land: terrain.landColor, coast: terrain.coastColor, sea: terrain.seaColor },
  };
}

/**
 * 飾りのSVG断片に、盤面のピクセルから地図帳の平面(x=経度, y=-緯度)への
 * 写しを付ける。
 *
 * 盤面は `viewBox="0 0 BW BH"` で、左上が (lon0, lat0)、右下が (lon1, lat1)。
 * つまり
 *
 *   x = lon0 + px * (lon1 - lon0) / BW
 *   y = -( lat0 + py * (lat1 - lat0) / BH )
 *
 * という**1次式**なので、`translate` と `scale` ひとつずつで書ける。
 * 緯度は上が大きく、地図帳の平面は下が大きいので、**縦の倍率は符号が逆**になる
 * (`lat0 > lat1` なので `-(lat1-lat0)/BH` は正の数)。
 *
 * 倍率が出せない盤面(投影が壊れている)は飾りを出さない。transform に NaN を
 * 入れると、**その `<g>` の中身がまるごと黙って消える。**
 */
function toDecor(svg: string, projection: CountryProjection): AtlasBoardDecor | null {
  if (!svg) return null;
  const { lon0, lon1, lat0, lat1, boardWidth, boardHeight } = projection;
  if (!(boardWidth > 0) || !(boardHeight > 0)) return null;
  const sx = (lon1 - lon0) / boardWidth;
  const sy = -(lat1 - lat0) / boardHeight;
  if (![lon0, lat0, sx, sy].every(finite) || sx === 0 || sy === 0) return null;
  return {
    svg,
    transform: `translate(${lon0} ${-lat0}) scale(${sx} ${sy})`,
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
