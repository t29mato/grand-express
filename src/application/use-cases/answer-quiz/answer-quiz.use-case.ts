import { ItemKey, PlayerId } from "../../../domain/shared-kernel/ids";
import { Money } from "../../../domain/shared-kernel/money";
import { Random } from "../../../domain/shared-kernel/random";
import { QUIZ_TIER_REWARDS, QuizQuestion, QuizTier } from "../../../domain/quiz/quiz-question";
import { gradeAnswer } from "../../../domain/quiz/quiz-grading-service";
import { addItem, canAddItem, payUpTo, receiveCash, removeItemAt } from "../../../domain/player/player";
import { GameSession, replacePlayer } from "../../../domain/game-session/game-session";
import { GameEngineContext } from "../../game-engine-context";

export interface AnswerQuizOutcome {
  readonly session: GameSession;
  readonly correct: boolean;
  /** 実際に増減した額(不正解時、残高不足なら払える分だけ)。 */
  readonly amount: Money;
  /** お守り(pacha/daruma)により不正解が正解に変わった場合true。 */
  readonly savedByCharm: boolean;
  /** 正解のボーナスとして追加で獲得したアイテム(あれば)。 */
  readonly bonusItem: ItemKey | null;
}

/** 正解時に追加でアイテムを得られる確率(現行コードの `quizStop`)。CPUは0.3、人間は0.32。 */
const BONUS_ITEM_CHANCE = { cpu: 0.3, human: 0.32 };

/** クイズマスでの正誤判定と増減額の適用(現行コードの `quizStop`)。 */
export function answerQuiz(
  context: GameEngineContext,
  session: GameSession,
  playerId: PlayerId,
  question: QuizQuestion,
  tier: QuizTier,
  chosenOptionIndex: number,
  random: Random,
): AnswerQuizOutcome {
  const player = session.players.find((p) => p.id === playerId);
  if (!player) throw new Error(`Unknown player: ${playerId}`);

  const grade = gradeAnswer(question, tier, chosenOptionIndex);

  // お守り(pacha/daruma)による自動セーブは人間プレイヤーのみ(現行コードのCPU分岐にはこの判定がない)。
  let correct = grade.correct;
  let savedByCharm = false;
  let currentPlayer = player;
  if (!correct && !player.isCpu) {
    const charmIndex = player.inventory.findIndex((key) => {
      const item = context.content.items.find((i) => i.key === key);
      return item?.effect.type === "quiz-save";
    });
    if (charmIndex >= 0) {
      currentPlayer = removeItemAt(currentPlayer, charmIndex);
      correct = true;
      savedByCharm = true;
    }
  }

  let amount: Money;
  if (correct) {
    // お守りでセーブされた場合も、正解と同じ賞金がもらえる(現行コードの `ok?st.win:-st.lose`)。
    amount = savedByCharm ? Money.of(QUIZ_TIER_REWARDS[tier].winAmount) : grade.amount;
    currentPlayer = receiveCash(currentPlayer, amount);
  } else {
    const paid = payUpTo(currentPlayer, grade.amount);
    currentPlayer = paid.player;
    amount = paid.paid;
  }

  let bonusItem: ItemKey | null = null;
  if (correct && !savedByCharm) {
    const chance = player.isCpu ? BONUS_ITEM_CHANCE.cpu : BONUS_ITEM_CHANCE.human;
    if (random.nextFloat() < chance && canAddItem(currentPlayer)) {
      const allKeys = context.content.items.map((i) => i.key);
      bonusItem = allKeys[random.nextInt(allKeys.length)];
      currentPlayer = addItem(currentPlayer, bonusItem);
    }
  }

  return {
    session: replacePlayer(session, currentPlayer),
    correct,
    amount,
    savedByCharm,
    bonusItem,
  };
}
