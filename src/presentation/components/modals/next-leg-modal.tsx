"use client";

import { PlayerId } from "../../../domain/shared-kernel/ids";
import { GameSession, destinationPrize } from "../../../domain/game-session/game-session";
import { GameEngineContext } from "../../../application/game-engine-context";
import { useLocale } from "../../i18n/locale-context";
import { formatMessage } from "../../i18n/messages";
import { renderRichText } from "../../i18n/rich-text";
import { Modal } from "./modal";

/**
 * 目的地に到着して次の目的地が抽選された直後に表示する「次の区間」の案内
 * (legacyの `arriveDest` 後半のモーダルの移植)。
 * 新しい目的地・その紹介文・賞金と、厄災の神が誰に憑いたかを伝える。
 *
 * legacyにあった都市の手描きイラスト(`cityArt()`)は移植していない
 * (docs/90-migration/05-visual-comparison.md 参照)。
 */
export function NextLegModal({
  context,
  session,
  firstTimeSpiritAppearance,
  spiritHolderId,
  onContinue,
}: {
  context: GameEngineContext;
  session: GameSession;
  firstTimeSpiritAppearance: boolean;
  spiritHolderId: PlayerId | null;
  onContinue: () => void;
}) {
  const { t, tx, locale } = useLocale();
  const destination = context.getCity(session.destination);
  const destinationName = tx(destination.name);
  const prize = destinationPrize(session).amount;
  const spiritHolder = session.players.find((p) => p.id === spiritHolderId);
  const spirit = context.content.spirit;

  // 厄災の神の紹介文はコンテンツ側(国ごと)の文言で、`{0}`(プレイヤー名)と
  // `{1}`(目的地名)の位置引数を含む。UI文言と同じ formatMessage で埋め込む。
  const spiritMessage = spiritHolder
    ? formatMessage(
        (firstTimeSpiritAppearance ? spirit.arriveTemplate : spirit.movesTemplate)[locale],
        spiritHolder.name,
        destinationName,
      )
    : null;

  return (
    <Modal>
      <div className="eyebrow">{t("nextLeg")}</div>
      <h3>{t("onTo", destinationName)}</h3>
      <p>
        {tx(destination.tag)}. {renderRichText(t("firstWins", prize))}
      </p>
      {spiritMessage && <div className="fact">{renderRichText(spiritMessage)}</div>}
      <div className="btnrow" style={{ marginTop: 16 }}>
        <button className="btn" onClick={onContinue}>
          {t("fullSteam")}
        </button>
      </div>
    </Modal>
  );
}
