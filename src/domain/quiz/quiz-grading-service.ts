import { Money } from "../shared-kernel/money";
import { QuizQuestion, quizReward } from "./quiz-question";
import { DEFAULT_KNOWLEDGE_LEVEL, KNOWLEDGE_TUNING, KnowledgeLevel } from "./knowledge-level";

export interface QuizGradeResult {
  readonly correct: boolean;
  /** 正解なら獲得額、不正解なら現行コードの `Math.min(cash, lose)` を適用する前の減点額。 */
  readonly amount: Money;
}

/**
 * 現行コードの `quizStop` 内の正誤判定ロジックに、プレイヤーの知識レベルによる
 * 増減額の補正を加えたもの(docs/40-learning-design/02-player-knowledge-level.md)。
 * 補正はクイズの金額にのみ効き、正誤判定そのものは変えない。
 */
export function gradeAnswer(
  question: QuizQuestion,
  chosenOptionIndex: number,
  knowledgeLevel: KnowledgeLevel = DEFAULT_KNOWLEDGE_LEVEL,
): QuizGradeResult {
  const reward = quizReward(question.difficulty);
  const tuning = KNOWLEDGE_TUNING[knowledgeLevel];
  const correct = chosenOptionIndex === question.correctOptionIndex;
  const base = correct ? reward.winAmount : reward.loseAmount;
  const multiplier = correct ? tuning.winMultiplier : tuning.loseMultiplier;
  // Money.of が四捨五入するため、端数処理は値オブジェクト側で担保される。
  return { correct, amount: Money.of(base * multiplier) };
}

