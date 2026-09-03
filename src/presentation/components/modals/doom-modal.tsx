"use client";

import { createElement } from "react";
import { DoomFlavor, DoomOutcome } from "../../../domain/misfortune/doom-effect";
import { GameEngineContext } from "../../../application/game-engine-context";
import { useLocale } from "../../i18n/locale-context";
import { renderRichText } from "../../i18n/rich-text";
import { doomAnimationFor } from "../events/dooms";
import { DoomEffectLine } from "./doom-effect-line";
import { Modal } from "./modal";

/**
 * 厄災の神に取り憑かれた人に降りかかる災難。
 *
 * これまでは記録に1行流れるだけで、何が起きたのか見えなかった。
 * 何が起きたのかを絵と文章で見せる(子どもも遊ぶので、破壊や痛みそのものは
 * 描かず「慌てている様子」で伝える方針。docs/50-authoring/04-doom-animation-guide.md)。
 *
 * ## 2026-09 に足したもの
 *
 * - **効果を定型で書く**(`DoomEffectLine`)。物語だけでは、いくら失ったのか・
 *   何を失ったのかが分からず、サイドバーの数字の点滅から推測するしかなかった。
 * - **逃げ道を1行添える。**「どうすれば離れるか」を知らないまま3手番連続で
 *   殴られると、理不尽なだけで終わる。
 * - **CPUの手番でも出す。**厄災の神が誰に憑いていて何をしたのかは盤面の読みに
 *   直に効くのに、CPUに落ちた災難は記録を読まないと分からなかった。
 *   本人以外の手番では短い自動送りのカードにする(`reveal-class.ts`)。
 */
export function DoomModal({
  context,
  playerName,
  countryId,
  flavor,
  outcome,
  spiritEmoji,
  wasKing,
  onCpuTurn,
  onClose,
}: {
  context: GameEngineContext;
  playerName: string;
  countryId: string;
  flavor: DoomFlavor;
  /** 実際に何をされたか(金額・失った物件・取られた持ちもの)。 */
  outcome: DoomOutcome;
  spiritEmoji: string;
  /** 強化形(打撃が倍)になっているか。 */
  wasKing: boolean;
  /** CPUの手番の災難か。自動で送られるので、押させる文言は出さない。 */
  onCpuTurn?: boolean;
  onClose: () => void;
}) {
  const { t, tx } = useLocale();
  const scene = doomAnimationFor(countryId, flavor.id);

  return (
    <Modal testId="doom-modal">
      {scene && <div className="event-anim">{createElement(scene)}</div>}
      <div className="quiz-head" style={{ marginTop: 12 }}>
        <span className="quiz-stake">
          {spiritEmoji} {playerName}
        </span>
      </div>
      <h3>{tx(flavor.name)}</h3>
      <p>{tx(flavor.narrative)}</p>
      <DoomEffectLine context={context} outcome={outcome} />
      {/* 逃げ道の一言。カード1枚で「なぜ」と「どうすれば」が閉じるようにする。 */}
      <p className="reveal-hint">{renderRichText(t("spiritEscape"))}</p>
      {/* CPUの手番でも押して飛ばせる(放っておいても自動で送られる)。 */}
      <div className="btnrow" style={{ marginTop: 16 }}>
        <button className={wasKing && !onCpuTurn ? "btn" : "btn ghost"} onClick={onClose}>
          {t("continue")}
        </button>
      </div>
    </Modal>
  );
}
