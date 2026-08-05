"use client";

import { useState } from "react";
import { GameSession, currentPlayer } from "../../../domain/game-session/game-session";
import { useLocale } from "../../i18n/locale-context";

export function DiceButton({
  session,
  disabled,
  cpuTurnPlayerName,
  onRoll,
}: {
  session: GameSession;
  disabled: boolean;
  /** CPUが手番を進めている場合、そのプレイヤー名。人間の手番なら undefined。 */
  cpuTurnPlayerName?: string;
  onRoll: () => void;
}) {
  const { t } = useLocale();
  const player = currentPlayer(session);
  const [rolling, setRolling] = useState(false);

  const handleClick = () => {
    if (disabled || rolling) return;
    setRolling(true);
    onRoll();
    setTimeout(() => setRolling(false), 350);
  };

  return (
    <div className="card">
      <div className="turn-row">
        <button id="die" className={rolling || cpuTurnPlayerName ? "rolling" : ""} disabled={disabled} onClick={handleClick}>
          🎲
        </button>
        <div>
          <div className="turn-name">{t("turnOf", cpuTurnPlayerName ?? player.name)}</div>
          <div className="turn-hint">
            {cpuTurnPlayerName ? t("cpuTurnBadge", cpuTurnPlayerName) : player.isCpu ? t("thinking") : t("rollHint")}
          </div>
        </div>
      </div>
    </div>
  );
}
