"use client";

import { useState } from "react";
import { GameSession, currentPlayer } from "../../../domain/game-session/game-session";
import { useLocale } from "../../i18n/locale-context";

export function DiceButton({
  session,
  disabled,
  cpuTurnPlayerName,
  steps,
  onRoll,
}: {
  session: GameSession;
  disabled: boolean;
  /** CPUが手番を進めている場合、そのプレイヤー名。人間の手番なら undefined。 */
  cpuTurnPlayerName?: string;
  /**
   * 行き先を選んでいる最中の出目。
   * サイコロの演出が消えたあとも「何マス進むのか」が分かるように出しておく
   * (盤面のハイライトだけでは、何マスぶんだったか思い出せない)。
   */
  steps?: number;
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
        <button
          id="die"
          className={`${rolling || cpuTurnPlayerName ? "rolling" : ""}${steps !== undefined ? " showing-steps" : ""}`}
          disabled={disabled}
          onClick={handleClick}
        >
          {steps !== undefined ? steps : "🎲"}
        </button>
        <div>
          <div className="turn-name">{t("turnOf", cpuTurnPlayerName ?? player.name)}</div>
          <div className="turn-hint">
            {cpuTurnPlayerName
              ? t("cpuTurnBadge", cpuTurnPlayerName)
              : steps !== undefined
                ? t("chooseSquareHint", String(steps))
                : player.isCpu
                  ? t("thinking")
                  : t("rollHint")}
          </div>
        </div>
      </div>
    </div>
  );
}
