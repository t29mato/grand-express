import { QuizQuestionId } from "../shared-kernel/ids";
import { LocalizedText } from "../shared-kernel/localized-text";

/** クイズの難易度ティア。マスの色ではなく問題そのものの難度を表す。 */
export type QuizTier = "low" | "mid" | "high";

export interface QuizQuestion {
  /** 間違えた問題を記録・復元するための識別子。 */
  readonly id: QuizQuestionId;
  readonly question: LocalizedText;
  readonly options: readonly LocalizedText[];
  readonly correctOptionIndex: number;
  readonly fact: LocalizedText;
}

/** ティアごとの正解/不正解時の増減額(現行コードの `TIER` テーブル)。 */
export interface QuizTierReward {
  readonly winAmount: number;
  readonly loseAmount: number;
}

export const QUIZ_TIER_REWARDS: Readonly<Record<QuizTier, QuizTierReward>> = {
  low: { winAmount: 100, loseAmount: 30 },
  mid: { winAmount: 190, loseAmount: 65 },
  high: { winAmount: 320, loseAmount: 140 },
};
