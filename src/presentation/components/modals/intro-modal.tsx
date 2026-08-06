"use client";

import { GameSession, currentPlayer, destinationPrize } from "../../../domain/game-session/game-session";
import { isCityNode } from "../../../domain/board/node";
import { GameEngineContext } from "../../../application/game-engine-context";
import { useLocale } from "../../i18n/locale-context";
import { renderRichText } from "../../i18n/rich-text";
import { formatMoney } from "../../i18n/money-format";
import { Modal } from "./modal";
import { DepartureScene } from "../events/departure-scene";

/**
 * ゲーム開始時に一度だけ表示する「出発ストーリー」モーダル
 * (legacyの `startGame()` 内の `modalOnce(...)` の移植)。
 * 開始資金・最初の目的地・賞金・遊び方のヒントを出す。
 *
 * legacy は出発都市のイラストも一緒に出していたが、絵に動きを入れてからは
 * **1つのモーダルに動くものを2つ置かない**方針にしたため、汽車が出ていく絵だけにした。
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
    <Modal testId="intro-modal">
      {/* 絵は1つだけにする。ここは出発の場面なので、汽車が出ていく絵を採る
          (町の絵も並べると動くものが2つになり、どちらを見ればよいか分からない)。
          到着ではお祝いの絵、ふつうに止まった町では町の絵、と city-modal も
          同じ考え方で1つに絞ってある。出発地の名前は見出しに出るので文字で足りる。 */}
      <div className="event-anim">
        <DepartureScene />
      </div>
      <div className="eyebrow">{t("allAboard")}</div>
      <h3>{t("departure", startCityName)}</h3>
      <p>{renderRichText(t("startBody", formatMoney(player.cash.amount, context.content.currency), tx(destination.name), formatMoney(prize, context.content.currency)))}</p>
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
