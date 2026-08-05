import { ItemKey, PlayerId } from "../../../domain/shared-kernel/ids";
import { Money } from "../../../domain/shared-kernel/money";
import { Random } from "../../../domain/shared-kernel/random";
import { QuizQuestion } from "../../../domain/quiz/quiz-question";
import { gradeAnswer } from "../../../domain/quiz/quiz-grading-service";
import { recordMiss } from "../../../domain/quiz/learning-record";
import { payUpTo, receiveCash, removeItemAt } from "../../../domain/player/player";
import { giveRandomItem } from "../../../domain/item/give-random-item";
import { GameSession, replacePlayer } from "../../../domain/game-session/game-session";
import { GameEngineContext } from "../../game-engine-context";

export interface AnswerQuizOutcome {
  readonly session: GameSession;
  readonly correct: boolean;
  /** 実際に増減した額(不正解時、残高不足なら払える分だけ)。 */
  readonly amount: Money;
  /** お守り(pacha/daruma)が損失を肩代わりした場合true(正誤自体は変わらない)。 */
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
  chosenOptionIndex: number,
  random: Random,
): AnswerQuizOutcome {
  const player = session.players.find((p) => p.id === playerId);
  if (!player) throw new Error(`Unknown player: ${playerId}`);

  const grade = gradeAnswer(question, chosenOptionIndex, player.knowledgeLevel);
  const correct = grade.correct;

  /*
   * お守り(pacha/daruma)は人間プレイヤーのみ発動する
   * (現行コードのCPU分岐にはこの判定がない)。
   *
   * 【legacyからの意図的な仕様変更】legacyは不正解を無条件に「正解」へ変換し
   * 賞金も満額与えていたが、それではプレイヤーが自分の間違いに気づかないまま
   * 先に進んでしまい、学習の信号が消えてしまう。
   * 本作の目的は学習なので、**正誤の判定は変えず、損失だけを肩代わりする**挙動に
   * 変更した(docs/40-learning-design/01-quiz-as-learning-device.md 案4)。
   */
  let savedByCharm = false;
  let currentPlayer = player;
  if (!correct && !player.isCpu) {
    const charmIndex = player.inventory.findIndex((key) => {
      const item = context.content.items.find((i) => i.key === key);
      return item?.effect.type === "quiz-save";
    });
    if (charmIndex >= 0) {
      currentPlayer = removeItemAt(currentPlayer, charmIndex);
      savedByCharm = true;
    }
  }

  let amount: Money;
  if (correct) {
    amount = grade.amount;
    currentPlayer = receiveCash(currentPlayer, amount);
  } else if (savedByCharm) {
    // お守りが損失を防いだので増減なし。正解にはしない。
    amount = Money.of(0);
  } else {
    const paid = payUpTo(currentPlayer, grade.amount);
    currentPlayer = paid.player;
    amount = paid.paid;
  }

  let bonusItem: ItemKey | null = null;
  if (correct) {
    const chance = player.isCpu ? BONUS_ITEM_CHANCE.cpu : BONUS_ITEM_CHANCE.human;
    if (random.nextFloat() < chance) {
      const allKeys = context.content.items.map((i) => i.key);
      const given = giveRandomItem(currentPlayer, allKeys, random);
      currentPlayer = given.player;
      bonusItem = given.itemKey;
    }
  }

  // 間違えた問題は、終了時のおさらいのために記録する。
  const updated = replacePlayer(session, currentPlayer);
  const withRecord: GameSession = correct
    ? updated
    : { ...updated, learningRecord: recordMiss(updated.learningRecord, question.id) };

  return { session: withRecord, correct, amount, savedByCharm, bonusItem };
}
