/**
 * legacy から抽出したコンテンツに対する、このリポジトリで新たに作成した上書き・追加分。
 *
 * `legacy/grand-express.html` はアーカイブとして凍結しているため書き換えず、
 * 抽出後にこの定義をマージする。移行(legacyの再現)が終わった後の
 * 通常のコンテンツ開発は、すべてここに足していく。
 */
import { BOLIVIA_LAND } from "./bolivia-geography.mjs";
import { JAPAN_LAND } from "./japan-geography.mjs";
import {
  JAPAN_EXTRA_CITIES,
  JAPAN_EXTRA_EDGES,
  JAPAN_PREFECTURE_CITIES,
  JAPAN_PREFECTURE_EDGES,
} from "./japan-cities.mjs";

/**
 * 盤面の拡大率。都市を増やしたぶんマスが詰まって見えるため、盤面の座標系そのものを
 * 広げて余裕を持たせる。`seg`(中間マス1個あたりの目安距離)も同じ率で広げるので、
 * **中間マスの数は変えずに、マス同士の間隔だけが広がる**。
 * マーカーの寸法は盤面座標で固定なので、相対的に小さく=すっきり見える。
 */
const BOARD_SCALE = { bolivia: 1.35, japan: 1.75 };

const OVERRIDES = {
  bolivia: {
    land: BOLIVIA_LAND,
    boardScale: BOARD_SCALE.bolivia,
  },
  japan: {
    land: JAPAN_LAND,
    boardScale: BOARD_SCALE.japan,
    extraCities: { ...JAPAN_EXTRA_CITIES, ...JAPAN_PREFECTURE_CITIES },
    extraEdges: [...JAPAN_EXTRA_EDGES, ...JAPAN_PREFECTURE_EDGES],
  },
};

/**
 * 抽出済みの国コンテンツにオーバーライドを適用する(引数を破壊的に変更する)。
 * 追加都市のIDが既存と衝突した場合や、存在しない都市を結ぶ路線を指定した場合は
 * 静かに壊れないようエラーにする。
 */
export function applyContentOverrides(countryId, content) {
  const override = OVERRIDES[countryId];
  if (!override) return content;

  if (override.land) content.land = override.land;

  // サムネイル生成時は proj を持たない部分オブジェクトで呼ばれるため、その場合は何もしない
  // (サムネイルは自前のviewBoxで描くので盤面の拡大とは無関係)。
  if (override.boardScale && content.proj) {
    const scale = override.boardScale;
    content.proj = {
      ...content.proj,
      BW: Math.round(content.proj.BW * scale),
      BH: Math.round(content.proj.BH * scale),
      seg: Math.round((content.proj.seg ?? 64) * scale),
    };
  }

  if (override.extraCities) {
    for (const [id, city] of Object.entries(override.extraCities)) {
      if (content.cities[id]) {
        throw new Error(`${countryId}: 追加都市 "${id}" は既に存在します`);
      }
      content.cities[id] = city;
    }
  }

  if (override.extraEdges) {
    for (const [a, b] of override.extraEdges) {
      for (const id of [a, b]) {
        if (!content.cities[id]) {
          throw new Error(`${countryId}: 路線が存在しない都市 "${id}" を指しています`);
        }
      }
      const duplicated = content.edges.some(
        ([x, y]) => (x === a && y === b) || (x === b && y === a),
      );
      if (duplicated) {
        throw new Error(`${countryId}: 路線 ${a}-${b} は既に存在します`);
      }
      content.edges.push([a, b]);
    }
  }

  return content;
}
