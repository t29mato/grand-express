"use client";

import { GameSession, currentPlayer, destinationPrize } from "../../../domain/game-session/game-session";
import { isCityNode } from "../../../domain/board/node";
import { GameEngineContext } from "../../../application/game-engine-context";
import { useLocale } from "../../i18n/locale-context";
import { renderRichText } from "../../i18n/rich-text";
import { Modal } from "./modal";

/**
 * ゲーム開始時に一度だけ表示する「出発ストーリー」モーダル
 * (legacyの `startGame()` 内の `modalOnce(...)` の移植)。
 * legacyにあった都市の手描きイラスト(`cityArt()`)は移植しておらず、
 * テキスト情報(開始資金・最初の目的地・賞金・遊び方のヒント)のみを再現している
 * (docs/90-migration/05-visual-comparison.md 参照)。
 */
export function IntroModal({
  context,
  session,
  onDepart,
}: {
  context: GameEngineContext;
  session: GameSession;
  onDepart: () => void;
}) {
  const { t, tx } = useLocale();
  const player = currentPlayer(session);
  const startNode = context.getNode(player.location);
  const startCityName = isCityNode(startNode) ? tx(context.getCity(startNode.cityId).name) : "";
  const destination = context.getCity(session.destination);
  const prize = destinationPrize(session).amount;

  return (
    <Modal>
      <div className="eyebrow">{t("allAboard")}</div>
      <h3>{t("departure", startCityName)}</h3>
      <p>{renderRichText(t("startBody", player.cash.amount, tx(destination.name), prize))}</p>
      <div className="fact">
        <b>{t("tipTitle")}</b> {renderRichText(t("startTip", session.maxMonths))}
      </div>
      <div className="btnrow" style={{ marginTop: 16 }}>
        <button className="btn" onClick={onDepart}>
          {t("depart")}
        </button>
      </div>
    </Modal>
  );
}
