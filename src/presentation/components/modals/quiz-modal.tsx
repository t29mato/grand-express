"use client";

import { QuizQuestion, QuizTier, QUIZ_TIER_REWARDS } from "../../../domain/quiz/quiz-question";
import { useLocale } from "../../i18n/locale-context";
import { Modal } from "./modal";

export function QuizModal({
  question,
  tier,
  optionOrder,
  onAnswer,
}: {
  question: QuizQuestion;
  tier: QuizTier;
  optionOrder: readonly number[];
  onAnswer: (optionIndex: number) => void;
}) {
  const { tx, t } = useLocale();
  const reward = QUIZ_TIER_REWARDS[tier];

  return (
    <Modal>
      <div className="eyebrow">{t("quizTier", tier, reward.winAmount, reward.loseAmount)}</div>
      <h3>{tx(question.question)}</h3>
      <div className="btnrow" style={{ flexDirection: "column" }}>
        {optionOrder.map((index) => (
          <button key={index} className="btn opt" onClick={() => onAnswer(index)}>
            {tx(question.options[index])}
          </button>
        ))}
      </div>
    </Modal>
  );
}
