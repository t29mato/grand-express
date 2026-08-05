import { QuizQuestionId } from "../shared-kernel/ids";
import { LocalizedText } from "../shared-kernel/localized-text";

/**
 * 問題そのものの難易度(1〜10)。
 *
 * legacy は盤面のマスの側に賞金を3段階(low/mid/high)で持たせていたが、
 * それは**マスの属性であって問題の属性ではない**ため、「高額の問題」マスで
 * 誰でも知っている問題が出ることがあった。難易度を問題側に持たせることで、
 * プレイヤーの知識レベルに応じた出題ができるようになる
 * (docs/40-learning-design/01-quiz-as-learning-device.md 2-5)。
 */
export type QuizDifficulty = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export const MIN_QUIZ_DIFFICULTY = 1;
export const MAX_QUIZ_DIFFICULTY = 10;

export interface QuizQuestion {
  /** 間違えた問題を記録・復元するための識別子。 */
  readonly id: QuizQuestionId;
  readonly difficulty: QuizDifficulty;
  readonly question: LocalizedText;
  readonly options: readonly LocalizedText[];
  readonly correctOptionIndex: number;
  readonly fact: LocalizedText;
}

export interface QuizReward {
  readonly winAmount: number;
  readonly loseAmount: number;
}

/**
 * 難易度に応じた増減額。難しい問題ほど当てたときの見返りも外したときの痛手も大きい。
 * legacy の3段階(100/30・190/65・320/140)を、Lv1〜Lv10 の連続した階段に置き換えた
 * (Lv1 が legacy の low、Lv8 前後が high に相当する)。
 */
export function quizReward(difficulty: QuizDifficulty): QuizReward {
  return {
    winAmount: 100 + (difficulty - 1) * 30,
    loseAmount: 30 + (difficulty - 1) * 13,
  };
}
