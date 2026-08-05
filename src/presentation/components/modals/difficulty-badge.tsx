"use client";

import { MAX_QUIZ_DIFFICULTY, QuizDifficulty } from "../../../domain/quiz/quiz-question";
import { useLocale } from "../../i18n/locale-context";

/**
 * 問題の難易度(1〜10)の表示。
 *
 * 出題される難易度はプレイヤーが選んだ知識レベルに応じて抽選されるため、
 * 「いま自分は何段階目の問題に挑んでいるのか」が分かるように必ず添える
 * (docs/40-learning-design/01-quiz-as-learning-device.md)。
 */
export function DifficultyBadge({ difficulty }: { difficulty: QuizDifficulty }) {
  const { t } = useLocale();
  return (
    <span className={`difficulty difficulty-${difficultyBand(difficulty)}`}>
      <span className="difficulty-label">{t("difficulty")}</span>
      <span className="difficulty-value">
        {difficulty}
        <span className="difficulty-max"> / {MAX_QUIZ_DIFFICULTY}</span>
      </span>
      <span className="difficulty-dots" aria-hidden="true">
        {Array.from({ length: MAX_QUIZ_DIFFICULTY }, (_, i) => (
          <i key={i} className={i < difficulty ? "on" : ""} />
        ))}
      </span>
    </span>
  );
}

/** 色分けのための帯(易しい/ふつう/難しい)。 */
function difficultyBand(difficulty: QuizDifficulty): "easy" | "mid" | "hard" {
  if (difficulty <= 3) return "easy";
  if (difficulty <= 7) return "mid";
  return "hard";
}
