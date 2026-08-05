"use client";

import { CurrencyFormat } from "../../../domain/country/country-content-pack";
import { EndGameOutcome } from "../../../application/use-cases/end-game/end-game.use-case";
import { useLocale } from "../../i18n/locale-context";
import { GameEngineContext } from "../../../application/game-engine-context";
import { formatMoney } from "../../i18n/money-format";
import { Modal } from "./modal";

export function GameOverModal({
  outcome,
  currency,
  context,
  onPlayAgain,
}: {
  outcome: EndGameOutcome;
  currency: CurrencyFormat;
  context: GameEngineContext;
  onPlayAgain: () => void;
}) {
  const { t, tx } = useLocale();
  // 記録されているのはIDだけなので、コンテンツから問題文を引き直す。
  const missed = outcome.session.learningRecord.missedQuestionIds
    .map((id) => context.content.quiz.find((q) => q.id === id))
    .filter((q): q is NonNullable<typeof q> => q !== undefined);
  return (
    <Modal testId="game-over-modal">
      <div className="eyebrow">{t("endOfLine", outcome.session.maxMonths)}</div>
      <h3>{t("wins", outcome.winner.player.name)}</h3>
      <p>{t("finalWorth")}</p>
      <div className="plist">
        {outcome.ranking.map((r, i) => (
          <div className="prop" key={r.player.id}>
            <div className="info">
              <div className="nm">
                {i === 0 && <span className="crown">👑 </span>}
                {r.player.name}
              </div>
              <div className="sub">{t("townsHeld", r.propertyCount, r.monopolyCount)}</div>
            </div>
            <span className="pcash">{formatMoney(r.netWorth, currency)}</span>
          </div>
        ))}
      </div>
      {/* 今回のおさらい。間違えた問題だけを、正解と解説つきで並べる。
          誰が間違えたかは出さず問題単位でまとめる(同一画面で複数人が遊ぶため)。 */}
      <div className="eyebrow" style={{ marginTop: 18 }}>
        {t("reviewTitle")}
      </div>
      {missed.length === 0 ? (
        <p style={{ color: "var(--salt-dim)", marginTop: 6 }}>{t("reviewEmpty")}</p>
      ) : (
        <div className="review-list">
          {missed.map((question) => (
            <div className="review-item" key={question.id}>
              <div className="q">{tx(question.question)}</div>
              <div className="a">{tx(question.options[question.correctOptionIndex])}</div>
              <div className="f">{tx(question.fact)}</div>
            </div>
          ))}
        </div>
      )}

      <div className="btnrow">
        <button className="btn" onClick={onPlayAgain}>
          {t("playAgain")}
        </button>
      </div>
    </Modal>
  );
}
