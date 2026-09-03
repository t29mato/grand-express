"use client";

import { CurrencyFormat } from "../../../domain/country/country-content-pack";
import { EndGameOutcome, PlayerResult } from "../../../application/use-cases/end-game/end-game.use-case";
import { economyContextFor } from "../../../application/economy-context";
import { monopolisedCities } from "../../../domain/property/property-income-service";
import { useState } from "react";
import { useLocale } from "../../i18n/locale-context";
import { arrivalText } from "../../i18n/arrival-messages";
import { AwardCeremony } from "./award-ceremony";
import { GameEngineContext } from "../../../application/game-engine-context";
import { formatMoney } from "../../i18n/money-format";
import { prefersReducedMotion } from "../../state/motion-preference";
import { playerColor } from "../player-colors";
import { Modal } from "./modal";

/**
 * 旅の終わり。表彰式(`AwardCeremony`)をめくり終えたあとに出る、最終順位。
 *
 * ## 2026-09 に変えたこと
 *
 * 12ヶ月を走りきったのに、出るのは「🏆 X の勝利!」の一行と、
 * 名前と総資産が並ぶだけの一覧だった(色も順位の数字も無く、
 * 物件が何件かは出ても**どの町を独占したのか**は出なかった)。
 *
 * - **1位を札にして大きく出す。**名前・色・総資産・物件と独占の数。
 *   紙吹雪は表彰式と同じもの(`.award-confetti`)を使い回す。
 * - 順位の一覧には**順位の数字と駒の色**を付け、**現金と物件の内訳**、
 *   **独占した町の名前**、目的地に着いた回数とクイズの正解数を添える。
 *   「なぜこの人が勝ったのか」を、この一画面で読めるようにするため。
 * - **人称を書かない。**「あなたの勝ち」ではなく名前を大きく出す
 *   (同じ画面で複数人が遊ぶので、勝った人が読んでいるとは限らない)。
 *
 * 音は状態側(`game-store-turn-flow.ts`)と表彰式が鳴らす。ここでは鳴らさない。
 */
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
  const { t, tx, locale } = useLocale();
  const ta = (key: string, ...args: (string | number)[]) => arrivalText(locale, key, ...args);
  // 表彰をすべてめくり終えるまで順位を出さない(先に見えると勝負が分かってしまう)。
  const [ceremonyDone, setCeremonyDone] = useState(outcome.awards.length === 0);
  // 記録されているのはIDだけなので、コンテンツから問題文を引き直す。
  const missed = outcome.session.learningRecord.missedQuestionIds
    .map((id) => context.content.quiz.find((q) => q.id === id))
    .filter((q): q is NonNullable<typeof q> => q !== undefined);
  if (!ceremonyDone) {
    return (
      <Modal testId="award-ceremony-modal">
        <AwardCeremony
          awards={outcome.awards}
          session={outcome.session}
          context={context}
          onFinish={() => setCeremonyDone(true)}
        />
      </Modal>
    );
  }

  const economy = economyContextFor(context, outcome.session);
  const still = prefersReducedMotion();
  const money = (amount: number) => formatMoney(amount, currency);
  /** 駒の色は「何人目か」で決まる(順位ではない)。 */
  const colorOf = (result: PlayerResult) =>
    playerColor(outcome.session.players.findIndex((p) => p.id === result.player.id));
  /** 独占した町の名前。順位の一覧で「どの町か」まで言うため。 */
  const townsOf = (result: PlayerResult) =>
    monopolisedCities(result.player, economy).map((id) => tx(context.getCity(id).name));

  const winner = outcome.winner;

  return (
    <Modal testId="game-over-modal">
      <div className="eyebrow">{t("endOfLine", outcome.session.maxMonths)}</div>
      <p style={{ color: "var(--salt-dim)" }}>{ta("finaleLead", outcome.session.maxMonths)}</p>

      {/* 1位の札。名前を大きく、色を添えて。 */}
      <div className="finale-winner">
        {!still && (
          <div className="award-confetti" aria-hidden="true">
            {Array.from({ length: 20 }, (_, i) => (
              <span key={i} style={{ ["--i" as string]: i }} />
            ))}
          </div>
        )}
        <div className="finale-winner-label">{ta("finaleWinner")}</div>
        <h3 className="finale-winner-name">
          <span className="finale-dot" style={{ background: colorOf(winner) }} aria-hidden="true" />
          <span>
            <span className="crown" aria-hidden="true">
              👑{" "}
            </span>
            {winner.player.name}
          </span>
        </h3>
        <div className="finale-winner-worth money">{money(winner.netWorth)}</div>
        <div className="finale-winner-sub">{t("townsHeld", winner.propertyCount, winner.monopolyCount)}</div>
      </div>

      <div className="eyebrow">{ta("finaleRankings")}</div>
      <p style={{ color: "var(--salt-dim)", fontSize: "0.85rem" }}>{t("finalWorth")}</p>
      <div className="finale-rows">
        {outcome.ranking.map((r, i) => {
          const cash = r.player.cash.amount;
          const propertyValue = r.netWorth - cash;
          const towns = townsOf(r);
          return (
            <div className={`finale-row${i === 0 ? " top" : ""}`} key={r.player.id} data-testid="finale-row">
              <span className="finale-rank">{i + 1}</span>
              <span className="finale-dot" style={{ background: colorOf(r) }} aria-hidden="true" />
              <span className="finale-name">{r.player.name}</span>
              <span className="finale-worth">{money(r.netWorth)}</span>
              <div className="finale-sub">
                {/* 内訳。物件が無い人には「物件なし」と言う(0を見せるより伝わる)。 */}
                {ta("finaleCash", money(cash))} ·{" "}
                {r.propertyCount > 0 ? ta("finaleProperty", money(propertyValue)) : ta("finaleNoProperty")}
                {r.propertyCount > 0 && (
                  <>
                    <br />
                    {t("townsHeld", r.propertyCount, r.monopolyCount)}
                    {towns.length > 0 && (
                      <>
                        {" "}
                        <span className="finale-towns">{ta("finaleMonopolies", towns.join(" · "))}</span>
                      </>
                    )}
                  </>
                )}
                <br />
                {ta("finaleStats", r.player.stats.destinationsReached, r.player.stats.quizCorrect)}
              </div>
            </div>
          );
        })}
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
