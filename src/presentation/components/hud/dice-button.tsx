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
  /**
   * 名前を付けずに始めた人の番か。自分で名前を付けたなら "Alex's turn" は正しい英語なので、
   * 崩れるのは既定名("You" /「あなた」)のときだけ。そこだけ文ごと差し替える。
   */
  const unnamed = !cpuTurnPlayerName && !player.isCpu && player.name === t("defaultPlayerName");

  const handleClick = () => {
    if (disabled || rolling) return;
    onRoll();
  };

  return (
    /* `turn-card` は、縦積みのときにこの一群だけを盤面の上へ出すための目印。
       他の `.card` と区別が付かないと、順番を入れ替えられない(globals.css 参照)。 */
    <div className="card turn-card">
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
          {/* 名前を付けずに始めた人の番だけ、文ごと差し替える。legacy の `turnOf` は
              「{0} の番」という所有格の型なので、英語で既定名 "You" を入れると
              "You's turn" になる。名前の部分を差し替える作りでは、所有格の要る言語で
              必ず崩れる。自分で名前を付けた人には、その名前で呼ぶ。 */}
          <div className="turn-name">
            {unnamed ? t("yourTurn") : t("turnOf", cpuTurnPlayerName ?? player.name)}
          </div>
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
