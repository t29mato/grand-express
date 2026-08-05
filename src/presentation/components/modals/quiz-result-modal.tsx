"use client";

import { ItemKey } from "../../../domain/shared-kernel/ids";
import { QuizQuestion } from "../../../domain/quiz/quiz-question";
import { GameEngineContext } from "../../../application/game-engine-context";
import { useLocale } from "../../i18n/locale-context";
import { renderRichText } from "../../i18n/rich-text";
import { DifficultyBadge } from "./difficulty-badge";
import { Modal } from "./modal";

/**
 * 回答後に必ず挟む結果モーダル。
 *
 * このゲームの目的はプレイヤーの学習であり、**フィードバックのない出題は学習に
 * ならない**(思い出そうとする → 正誤と理由を知る、の2つが揃って初めて定着する)。
 * そのため正解・自分の選択・増減額・解説を必ず見せる
 * (docs/40-learning-design/01-quiz-as-learning-device.md 案1)。
 *
 * 知識レベルによるハンデは金額にのみ効き、**学習機会は削らない**ので、
 * この画面は全レベル共通で同じ情報を出す。
 */
export function QuizResultModal({
  context,
  question,
  chosenOptionIndex,
  correct,
  amount,
  savedByCharm,
  bonusItem,
  onClose,
}: {
  context: GameEngineContext;
  question: QuizQuestion;
  chosenOptionIndex: number;
  correct: boolean;
  amount: string;
  savedByCharm: boolean;
  bonusItem: ItemKey | null;
  onClose: () => void;
}) {
  const { t, tx } = useLocale();
  const chosen = question.options[chosenOptionIndex];
  const answer = question.options[question.correctOptionIndex];
  const bonus = bonusItem ? context.content.items.find((i) => i.key === bonusItem) : undefined;

  return (
    <Modal testId="quiz-result-modal">
      <div className="quiz-head">
        <DifficultyBadge difficulty={question.difficulty} />
      </div>
      <h3>{tx(question.question)}</h3>

      <p className={correct ? "quiz-verdict correct" : "quiz-verdict wrong"}>
        {correct ? `⭕ ${t("correctPlus", amount)}` : `❌ ${t("wrongMinus", amount)}`}
      </p>

      {/* 不正解のときこそ「何が正解だったか」が要るので、必ず両方見せる。 */}
      <p>{renderRichText(t("yourAnswer", tx(chosen)))}</p>
      {!correct && <p className="quiz-answer">{renderRichText(t("correctAnswerWas", tx(answer)))}</p>}

      {savedByCharm && <p className="fact">{t("charmSaved")}</p>}
      {bonus && (
        <p className="cpu-invested">
          {bonus.emoji} {tx(bonus.name)}
        </p>
      )}

      <div className="fact">
        <b>{t("didYouKnow")}</b> {tx(question.fact)}
      </div>

      <div className="btnrow" style={{ marginTop: 16 }}>
        <button className="btn" onClick={onClose}>
          {t("continue")}
        </button>
      </div>
    </Modal>
  );
}
