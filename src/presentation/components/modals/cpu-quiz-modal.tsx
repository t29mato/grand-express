"use client";

import { QuizQuestion, QuizTier } from "../../../domain/quiz/quiz-question";
import { useLocale } from "../../i18n/locale-context";
import { renderRichText } from "../../i18n/rich-text";
import { Modal } from "./modal";

const TIER_LABEL: Record<QuizTier, string> = { low: "quizLow", mid: "quizMid", high: "quizHigh" };

/**
 * CPUが答えたクイズ(legacyの `autoModal` によるCPU用クイズモーダルの移植)。
 * どの問題に何と答えて当たったのか外れたのかを、人間の手番と同じ情報量で見せる。
 */
export function CpuQuizModal({
  playerName,
  question,
  tier,
  chosenOptionIndex,
  correct,
  amount,
  onClose,
}: {
  playerName: string;
  question: QuizQuestion;
  tier: QuizTier;
  chosenOptionIndex: number;
  correct: boolean;
  amount: string;
  onClose: () => void;
}) {
  const { t, tx } = useLocale();
  const chosen = question.options[chosenOptionIndex];

  return (
    <Modal testId="cpu-quiz-modal">
      <div className="eyebrow">
        {t(TIER_LABEL[tier])} · {playerName} (CPU)
      </div>
      <h3>{tx(question.question)}</h3>
      <p>
        {renderRichText(t("cpuAnswers", playerName, tx(chosen)))}
        <span className={correct ? "money" : "money neg"}>
          {correct ? t("correctPlus", amount) : t("wrongMinus", amount)}
        </span>
      </p>
      <div className="fact">
        <b>{t("didYouKnow")}</b> {tx(question.fact)}
      </div>
      <div className="btnrow" style={{ marginTop: 16 }}>
        <button className="btn ghost" onClick={onClose}>
          {t("continue")}
        </button>
      </div>
    </Modal>
  );
}
