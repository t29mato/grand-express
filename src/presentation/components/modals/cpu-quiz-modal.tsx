"use client";

import { QuizQuestion } from "../../../domain/quiz/quiz-question";
import { useLocale } from "../../i18n/locale-context";
import { renderRichText } from "../../i18n/rich-text";
import { DifficultyBadge } from "./difficulty-badge";
import { Modal } from "./modal";

/**
 * CPUが答えたクイズの結果。
 *
 * **問題文・CPUの回答・解説は出さない。** 同じ問題は自分の手番にも回ってくるので、
 * ここで中身を見せてしまうと答えを先に知ることになり、クイズが学習装置として
 * 働かなくなる(docs/40-learning-design/01-quiz-as-learning-device.md)。
 * 手番で何が起きたかは分かる必要があるので、難易度・正誤・増減額だけを見せる。
 */
export function CpuQuizModal({
  playerName,
  question,
  correct,
  amount,
  onClose,
}: {
  playerName: string;
  /** 難易度の表示にのみ使う(問題文は表示しない)。 */
  question: QuizQuestion;
  correct: boolean;
  amount: string;
  onClose: () => void;
}) {
  const { t } = useLocale();

  return (
    <Modal testId="cpu-quiz-modal">
      <div className="quiz-head">
        <DifficultyBadge difficulty={question.difficulty} />
        <span className="quiz-stake">{playerName} (CPU)</span>
      </div>
      <h3 className="cpu-quiz-verdict">
        {renderRichText(t(correct ? "cpuQuizCorrect" : "cpuQuizWrong", playerName))}
      </h3>
      <p>
        <span className={correct ? "money" : "money neg"}>
          {correct ? t("correctPlus", amount) : t("wrongMinus", amount)}
        </span>
      </p>
      <div className="fact muted">{t("cpuQuizHidden")}</div>
      <div className="btnrow" style={{ marginTop: 16 }}>
        <button className="btn ghost" onClick={onClose}>
          {t("continue")}
        </button>
      </div>
    </Modal>
  );
}
