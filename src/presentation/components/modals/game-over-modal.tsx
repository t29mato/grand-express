"use client";

import { CurrencyFormat } from "../../../domain/country/country-content-pack";
import { EndGameOutcome } from "../../../application/use-cases/end-game/end-game.use-case";
import { useLocale } from "../../i18n/locale-context";
import { formatMoney } from "../../i18n/money-format";
import { Modal } from "./modal";

export function GameOverModal({
  outcome,
  currency,
  onPlayAgain,
}: {
  outcome: EndGameOutcome;
  currency: CurrencyFormat;
  onPlayAgain: () => void;
}) {
  const { t } = useLocale();
  return (
    <Modal>
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
      <div className="btnrow">
        <button className="btn" onClick={onPlayAgain}>
          {t("playAgain")}
        </button>
      </div>
    </Modal>
  );
}
