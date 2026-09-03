"use client";

import { PlayerId } from "../../../domain/shared-kernel/ids";
import { GameSession, destinationPrize } from "../../../domain/game-session/game-session";
import { GameEngineContext } from "../../../application/game-engine-context";
import { useLocale } from "../../i18n/locale-context";
import { formatMessage } from "../../i18n/messages";
import { renderRichText } from "../../i18n/rich-text";
import { CityArt } from "../city/city-art";
import { formatMoney } from "../../i18n/money-format";
import { prefersReducedMotion } from "../../state/motion-preference";
import { SpiritBriefing } from "./spirit-briefing";
import { Modal } from "./modal";

/**
 * 目的地に到着して次の目的地が抽選された直後に表示する「次の区間」の案内
 * (legacyの `arriveDest` 後半のモーダルの移植)。
 * 新しい目的地・その紹介文・賞金と、厄災の神が誰に憑いたかを伝える。
 *
 * ## 2026-09 に変えたこと
 *
 * - **誰の手番でも出す。**CPUが目的地に着いたときは、この案内が一度も出ず、
 *   目的地が山形から小樽に入れ替わったことも、厄災の神が自分に憑いたことも
 *   画面に出ないままだった(実プレイの記録 2026-09-02)。
 *   CPUの手番では押さなくても自動で送られるので、ボタンは出さない。
 * - **目的地カードが裏返って次の町が現れる。**この遊びの最大の見せ場なので、
 *   絵をただ差し替えるのではなく、めくる動きを付ける
 *   (CSSは `src/app/styles/reveal.css`。動きを減らす設定では出さない)。
 * - **厄災の神には「なぜ」と「どうすれば離れるか」を添える**(`SpiritBriefing`)。
 *   国ごとのフレーバー文だけでは、仕組みが分からなかった。
 */
export function NextLegModal({
  context,
  session,
  firstTimeSpiritAppearance,
  spiritHolderId,
  onCpuTurn,
  arrivedBy,
  prize,
  onContinue,
}: {
  context: GameEngineContext;
  session: GameSession;
  firstTimeSpiritAppearance: boolean;
  spiritHolderId: PlayerId | null;
  /** CPUの手番で出しているか(自動で送られるのでボタンを出さない)。 */
  onCpuTurn?: boolean;
  /** 目的地に着いた人の名前。 */
  arrivedBy?: string;
  /** その到着で受け取った賞金(整形済み)。 */
  prize?: string;
  onContinue: () => void;
}) {
  const { t, tx, locale } = useLocale();
  const destination = context.getCity(session.destination);
  const destinationName = tx(destination.name);
  const nextPrize = destinationPrize(session).amount;
  const spiritHolder = session.players.find((p) => p.id === spiritHolderId);
  const spirit = context.content.spirit;
  const flip = !prefersReducedMotion();

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
    <Modal testId="next-leg-modal">
      <div className="eyebrow">{t("nextLeg")}</div>
      {/* 誰の到着で目的地が変わったのか。CPUの手番でも出るようになったので、
          名前を書かないと自分が着いたように読めてしまう。 */}
      {arrivedBy && (
        <p className="reveal-eyebrow-line">
          {t("arrivalTitle")} — <b>{arrivedBy}</b>
          {prize && <span className="money"> +{prize}</span>}
        </p>
      )}
      <h3>{t("onTo", destinationName)}</h3>
      <p>
        {tx(destination.tag)}. {renderRichText(t("firstWins", formatMoney(nextPrize, context.content.currency)))}
      </p>
      {/* めくって次の町が現れる。裏面は行き先が分からない札で、
          表に返ると新しい目的地の絵になる。 */}
      <div className={`dest-flip${flip ? " flipping" : ""}`}>
        <div className="dest-flip-inner">
          <div className="dest-flip-back" aria-hidden="true">
            <span>🚉</span>
          </div>
          <div className="dest-flip-front">
            <CityArt context={context} cityId={session.destination} />
          </div>
        </div>
      </div>
      {spiritMessage && <div className="fact">{renderRichText(spiritMessage)}</div>}
      {spiritHolder && (
        <SpiritBriefing
          context={context}
          holderName={spiritHolder.name}
          destinationName={destinationName}
          showKingWarning={session.misfortune.turnsOnCurrentHolder >= 2}
        />
      )}
      {/* **見せ場は必ず飛ばせる。**CPUの手番では放っておいても送られるが、
          読み終えた人を待たせない。文言だけ「出発」→「続ける」に変える
          (出発するのは自分ではないため)。 */}
      <div className="btnrow" style={{ marginTop: 16 }}>
        <button className="btn" onClick={onContinue}>
          {onCpuTurn ? t("continue") : t("fullSteam")}
        </button>
      </div>
    </Modal>
  );
}
