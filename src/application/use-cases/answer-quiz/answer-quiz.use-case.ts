import { PlayerId } from "../../../domain/shared-kernel/ids";
import { Money } from "../../../domain/shared-kernel/money";
import { QuizQuestion, QuizTier } from "../../../domain/quiz/quiz-question";
import { gradeAnswer } from "../../../domain/quiz/quiz-grading-service";
import { payUpTo, receiveCash } from "../../../domain/player/player";
import { GameSession, replacePlayer } from "../../../domain/game-session/game-session";

export interface AnswerQuizOutcome {
  readonly session: GameSession;
  readonly correct: boolean;
  /** 実際に増減した額(不正解時、残高不足なら払える分だけ)。 */
  readonly amount: Money;
}

/** クイズマスでの正誤判定と増減額の適用(現行コードの `quizStop`)。 */
export function answerQuiz(
  session: GameSession,
  playerId: PlayerId,
  question: QuizQuestion,
  tier: QuizTier,
  chosenOptionIndex: number,
): AnswerQuizOutcome {
  const player = session.players.find((p) => p.id === playerId);
  if (!player) throw new Error(`Unknown player: ${playerId}`);

  const grade = gradeAnswer(question, tier, chosenOptionIndex);
  if (grade.correct) {
    const updated = receiveCash(player, grade.amount);
    return { session: replacePlayer(session, updated), correct: true, amount: grade.amount };
  }
  const { player: updated, paid } = payUpTo(player, grade.amount);
  return { session: replacePlayer(session, updated), correct: false, amount: paid };
}
