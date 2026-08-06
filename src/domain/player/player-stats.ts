/**
 * 旅のあいだに貯まる記録。
 *
 * ゲーム終了時の表彰(クイズ王・旅の達人など)に使う。
 * **あとから計算できないものだけ**を持つ——物件の数や地方の偏りは
 * `portfolio` から出せるので、ここには入れない。
 */
export interface PlayerStats {
  /** クイズに答えた回数と、そのうち正解した回数。 */
  readonly quizAnswered: number;
  readonly quizCorrect: number;
  /** 目的地に着いた回数。 */
  readonly destinationsReached: number;
  /** 厄災の神を背負ったまま迎えた手番の数。 */
  readonly misfortuneTurns: number;
  /** 進んだマスの総数。 */
  readonly squaresMoved: number;
}

export const EMPTY_STATS: PlayerStats = {
  quizAnswered: 0,
  quizCorrect: 0,
  destinationsReached: 0,
  misfortuneTurns: 0,
  squaresMoved: 0,
};

/** 指定した項目を増やした新しい記録を返す。 */
export function countUp(
  stats: PlayerStats,
  field: keyof PlayerStats,
  by = 1,
): PlayerStats {
  return { ...stats, [field]: stats[field] + by };
}
