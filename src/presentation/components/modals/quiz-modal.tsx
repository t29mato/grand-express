"use client";

import { QuizQuestion, quizReward } from "../../../domain/quiz/quiz-question";
import { CurrencyFormat } from "../../../domain/country/country-content-pack";
import { useLocale } from "../../i18n/locale-context";
import { formatMoney } from "../../i18n/money-format";
import { DifficultyBadge } from "./difficulty-badge";
import { Modal } from "./modal";

export function QuizModal({
  question,
  currency,
  optionOrder,
  onAnswer,
}: {
  question: QuizQuestion;
  currency: CurrencyFormat;
  optionOrder: readonly number[];
  onAnswer: (optionIndex: number) => void;
}) {
  const { tx, t } = useLocale();
  const reward = quizReward(question.difficulty);

  return (
    <Modal testId="quiz-modal">
      <div className="quiz-head">
        <DifficultyBadge difficulty={question.difficulty} />
        <span className="quiz-stake">
          +{formatMoney(reward.winAmount, currency)} / −{formatMoney(reward.loseAmount, currency)}
        </span>
      </div>
      <h3>{tx(question.question)}</h3>
      <div className="btnrow" style={{ flexDirection: "column" }}>
        {optionOrder.map((index) => (
          <button key={index} className="btn opt" onClick={() => onAnswer(index)}>
            {tx(question.options[index])}
          </button>
        ))}
      </div>
      {/* 知識レベルで選択肢を絞っている場合に、そのことが分かるようにしておく。 */}
      {optionOrder.length < question.options.length && <p className="quiz-hint">{t("optionsReduced")}</p>}
    </Modal>
  );
}
