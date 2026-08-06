"use client";

import { createElement } from "react";
import { DoomFlavor } from "../../../domain/misfortune/doom-effect";
import { useLocale } from "../../i18n/locale-context";
import { doomAnimationFor } from "../events/dooms";
import { Modal } from "./modal";

/**
 * 厄災の神に取り憑かれた人に降りかかる災難。
 *
 * これまでは記録に1行流れるだけで、何が起きたのか見えなかった。
 * 何が起きたのかを絵と文章で見せる(子どもも遊ぶので、破壊や痛みそのものは
 * 描かず「慌てている様子」で伝える方針。docs/50-authoring/04-doom-animation-guide.md)。
 */
export function DoomModal({
  playerName,
  countryId,
  flavor,
  spiritEmoji,
  wasKing,
  onClose,
}: {
  playerName: string;
  countryId: string;
  flavor: DoomFlavor;
  spiritEmoji: string;
  /** 強化形(打撃が倍)になっているか。 */
  wasKing: boolean;
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
      <div className="btnrow" style={{ marginTop: 16 }}>
        <button className={wasKing ? "btn" : "btn ghost"} onClick={onClose}>
          {t("continue")}
        </button>
      </div>
    </Modal>
  );
}
