/**
 * legacy から抽出したコンテンツに対する、このリポジトリで新たに作成した上書き・追加分。
 *
 * `legacy/grand-express.html` はアーカイブとして凍結しているため書き換えず、
 * 抽出後にこの定義をマージする。移行(legacyの再現)が終わった後の
 * 通常のコンテンツ開発は、すべてここに足していく。
 */
import { BOLIVIA_LAND } from "./bolivia-geography.mjs";
import { QUIZ_DIFFICULTY } from "./quiz-difficulty.mjs";
import { JAPAN_LAND } from "./japan-geography.mjs";
import { JAPAN_ISLAND_CITIES, JAPAN_ISLAND_EDGES } from "./japan-islands.mjs";
import { JAPAN_HOKKAIDO_CITIES, JAPAN_HOKKAIDO_EDGES } from "./japan-hokkaido.mjs";
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

/**
 * 投影の経緯度範囲の上書き。
 * 日本は legacy が西端を東経127度(沖縄本島)までしか取っていなかったため、
 * 先島諸島(宮古島・石垣島)が盤面の外に落ちてしまう。西へ広げるとともに、
 * 1度あたりの距離が変わらないよう横幅も同じ比率で広げる
 * (広げないと日本列島全体が横に潰れてしまう)。
 */
const PROJ_BOUNDS = {
  japan: { LON0: 123.4 },
};

const OVERRIDES = {
  bolivia: {
    land: BOLIVIA_LAND,
    boardScale: BOARD_SCALE.bolivia,
    quizDifficulty: QUIZ_DIFFICULTY.bolivia,
  },
  japan: {
    land: JAPAN_LAND,
    boardScale: BOARD_SCALE.japan,
    projBounds: PROJ_BOUNDS.japan,
    extraCities: { ...JAPAN_EXTRA_CITIES, ...JAPAN_PREFECTURE_CITIES, ...JAPAN_ISLAND_CITIES, ...JAPAN_HOKKAIDO_CITIES },
    extraEdges: [...JAPAN_EXTRA_EDGES, ...JAPAN_PREFECTURE_EDGES, ...JAPAN_ISLAND_EDGES, ...JAPAN_HOKKAIDO_EDGES],
    quizDifficulty: QUIZ_DIFFICULTY.japan,
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
  if (content.proj) {
    let proj = content.proj;

    if (override.projBounds) {
      const { LON0 = proj.LON0, LON1 = proj.LON1 } = override.projBounds;
      // 経度1度あたりのピクセル数を保つ(横に潰れないようにする)。
      const pxPerLon = proj.BW / (proj.LON1 - proj.LON0);
      proj = { ...proj, LON0, LON1, BW: Math.round(pxPerLon * (LON1 - LON0)) };
    }

    if (override.boardScale) {
      const scale = override.boardScale;
      proj = {
        ...proj,
        BW: Math.round(proj.BW * scale),
        BH: Math.round(proj.BH * scale),
        seg: Math.round((proj.seg ?? 64) * scale),
      };
    }

    content.proj = proj;
  }

  // サムネイル生成時は quiz を持たない部分オブジェクトで呼ばれるため読み飛ばす。
  if (override.quizDifficulty && content.quiz) {
    const levels = override.quizDifficulty;
    if (levels.length !== content.quiz.length) {
      throw new Error(
        `${countryId}: クイズの難易度が ${levels.length} 件ですが、問題は ${content.quiz.length} 件あります` +
          "(問題を増減したら scripts/content-overrides/quiz-difficulty.mjs も更新してください)",
      );
    }
    content.quiz = content.quiz.map((q, i) => {
      const level = levels[i];
      if (!Number.isInteger(level) || level < 1 || level > 10) {
        throw new Error(`${countryId}: 問題 ${i} の難易度 ${level} が範囲外です(1〜10)`);
      }
      return { ...q, difficulty: level };
    });
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
    for (const [a, b, kind] of override.extraEdges) {
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
      // 3要素目に "sea" を指定すると航路になる(省略時は陸路)。
      content.edges.push(kind ? [a, b, kind] : [a, b]);
    }
  }

  return content;
}
