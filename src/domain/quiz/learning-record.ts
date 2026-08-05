import { QuizQuestionId } from "../shared-kernel/ids";

/**
 * その回のプレイで間違えた問題の記録。
 *
 * 本作の目的はプレイヤーの学習であり、勝敗はその動機づけにすぎない
 * (docs/40-learning-design/01-quiz-as-learning-device.md)。
 * 「何を間違えたか」は学習の中心的な関心事なので、表示の都合ではなく
 * ドメインの概念として扱う。
 *
 * 同一画面で複数人が遊ぶため、誰が間違えたかは持たず**問題単位でまとめる**
 * (誰の間違いかまで出すと角が立つ場面があるため)。
 */
export interface LearningRecord {
  /** 間違えた問題のID。出現順で、重複はしない。 */
  readonly missedQuestionIds: readonly QuizQuestionId[];
}

export const EMPTY_LEARNING_RECORD: LearningRecord = { missedQuestionIds: [] };

/** 間違えた問題を記録する(既に記録済みならそのまま返す)。 */
export function recordMiss(record: LearningRecord, questionId: QuizQuestionId): LearningRecord {
  if (record.missedQuestionIds.includes(questionId)) return record;
  return { missedQuestionIds: [...record.missedQuestionIds, questionId] };
}
