"use client";

import { EndGameOutcome } from "../../../application/use-cases/end-game/end-game.use-case";
import { useLocale } from "../../i18n/locale-context";
import { Modal } from "./modal";

export function GameOverModal({ outcome, onPlayAgain }: { outcome: EndGameOutcome; onPlayAgain: () => void }) {
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
            <span className="pcash">{r.netWorth}</span>
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
