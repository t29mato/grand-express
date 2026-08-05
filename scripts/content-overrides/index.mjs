/**
 * legacy から抽出したコンテンツに対する、このリポジトリで新たに作成した上書き・追加分。
 *
 * `legacy/grand-express.html` はアーカイブとして凍結しているため書き換えず、
 * 抽出後にこの定義をマージする。移行(legacyの再現)が終わった後の
 * 通常のコンテンツ開発は、すべてここに足していく。
 */
import { JAPAN_LAND } from "./japan-geography.mjs";
import { JAPAN_EXTRA_CITIES, JAPAN_EXTRA_EDGES } from "./japan-cities.mjs";

const OVERRIDES = {
  japan: {
    land: JAPAN_LAND,
    extraCities: JAPAN_EXTRA_CITIES,
    extraEdges: JAPAN_EXTRA_EDGES,
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
