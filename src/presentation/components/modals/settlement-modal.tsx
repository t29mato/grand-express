"use client";

import { GameSession } from "../../../domain/game-session/game-session";
import { QuarterlySettlementRow } from "../../../application/use-cases/advance-turn/advance-turn.use-case";
import { GameEngineContext } from "../../../application/game-engine-context";
import { useLocale } from "../../i18n/locale-context";
import { formatMoney } from "../../i18n/money-format";
import { playerColor } from "../player-colors";
import { Modal } from "./modal";

/**
 * 四半期の決算。**全員ぶんを1枚で見せる。**
 *
 * ## なぜ足したか
 *
 * CPUの所持金が ¥12,000,000 → ¥15,000,000、¥12,800,000 → ¥15,400,000 と
 * 増えたのに、その場では何の説明も出なかった(実プレイの記録 2026-09-02)。
 * 正体は3ヶ月ごとの物件収入で、旅の記録には1人1行ずつ流れていたが、
 * 遊んでいる最中にサイドバーの下まで目は行かない。
 *
 * **並べると見せ場になる。**誰が伸びていて、自分がどれだけ離されているのかが
 * 1枚で分かる。物件を買う理由もここで初めて腑に落ちる。
 *
 * 収入の中身は `property-income-service.ts`:
 * 物件ごとの収入にレベル補正、その町を独占していれば2倍、地方の季節補正。
 */
export function SettlementModal({
  context,
  session,
  rows,
  month,
  onClose,
}: {
  context: GameEngineContext;
  session: GameSession;
  rows: readonly QuarterlySettlementRow[];
  /** 0始まりの経過月。 */
  month: number;
  onClose: () => void;
}) {
  const { t, monthName } = useLocale();
  const currency = context.content.currency;
  const best = Math.max(0, ...rows.map((r) => r.amount));

  return (
    <Modal testId="settlement-modal">
      <div className="eyebrow">{monthName(month)}</div>
      <h3>{t("settlementTitle")}</h3>
      <p>{t("settlementSub")}</p>
      <div className="settlement-rows">
        {rows.map((row) => {
          const index = session.players.findIndex((p) => p.id === row.playerId);
          const player = session.players[index];
          if (!player) return null;
          return (
            <div key={row.playerId} className={`settlement-row${row.amount > 0 && row.amount === best ? " top" : ""}`}>
              <span className="pdot" style={{ background: playerColor(index) }} />
              <span className="settlement-name">
                {player.name}
                {player.isCpu && <span className="cpu-tag">CPU</span>}
                <span className="settlement-sub">
                  {row.properties === 0
                    ? t("settlementNone")
                    : t("settlementProps", row.properties)}
                  {row.monopolies > 0 && ` · ${t("settlementMonopoly", row.monopolies)}`}
                </span>
              </span>
              <span className={row.amount > 0 ? "money" : "money muted"}>
                {row.amount > 0 ? `+${formatMoney(row.amount, currency)}` : formatMoney(0, currency)}
              </span>
            </div>
          );
        })}
      </div>
      <div className="btnrow" style={{ marginTop: 16 }}>
        <button className="btn" onClick={onClose}>
          {t("continue")}
        </button>
      </div>
    </Modal>
  );
}
