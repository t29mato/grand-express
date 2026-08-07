"use client";

import { GameSession, currentPlayer } from "../../../domain/game-session/game-session";
import { useLocale } from "../../i18n/locale-context";

export function DiceButton({
  session,
  disabled,
  cpuTurnPlayerName,
  rolling,
  steps,
  onRoll,
}: {
  session: GameSession;
  disabled: boolean;
  /** CPUが手番を進めている場合、そのプレイヤー名。人間の手番なら undefined。 */
  cpuTurnPlayerName?: string;
  /**
   * サイコロが転がっている最中かどうか。
   * **この間は出目を出さない。**転がっている絵の横に答えが書いてあると、
   * 止まるのを待つ理由が無くなってしまう。
   */
  rolling?: boolean;
  /**
   * 行き先を選んでいる最中の出目。サイコロが止まってから渡される。
   * 演出が消えたあとも「何マス進むのか」が分かるように出しておく
   * (盤面のハイライトだけでは、何マスぶんだったか思い出せない)。
   */
  steps?: number;
  onRoll: () => void;
}) {
  const { t } = useLocale();
  const player = currentPlayer(session);

  const handleClick = () => {
    if (disabled || rolling) return;
    onRoll();
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
              : rolling
                ? t("rollingHint")
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
