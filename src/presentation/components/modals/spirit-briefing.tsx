"use client";

import { GameEngineContext } from "../../../application/game-engine-context";
import { useLocale } from "../../i18n/locale-context";
import { renderRichText } from "../../i18n/rich-text";

/**
 * 厄災の神の**なぜ**と**どうすれば離れるか**を2行で書く札。
 *
 * ## なぜ足したか
 *
 * 👹 が名前の横に付くだけで、説明がどこにも無かった。
 * 「最下位の人に移る」(v0.23.0)「供物で払える」(v0.24.0)といった仕組みは
 * 更新情報を読まないと分からず、遊んでいる最中には辿り着けない
 * (実プレイの記録 2026-09-02)。
 *
 * ## 書いてあることは、すべて実装どおり
 *
 * - 憑く先 …「目的地からいちばん遠い人」。
 *   新しい目的地が決まった瞬間は `arrive-destination.use-case.ts` の
 *   `findFarthestPlayer` → `attachToFarthestPlayer`。
 *   手番の終わりごとの移動は `settle-spirit-after-turn.use-case.ts` の
 *   `findFarthestPlayer` → `settleAfterTurn`。**どちらも同じ「最も遠い人」。**
 * - すれ違い … `move-player.use-case.ts` が、憑かれている人が
 *   他の旅人と同じマスに入った時点で `passTo` する。
 * - 供物 … `resolve-misfortune-strike.use-case.ts` が、持ちものに
 *   `content.spirit.wardItemKey` があれば**それを1つ消して**災難を打ち消す。
 * - 大厄災 … `misfortune-spirit.ts` の `recordStrike` が、同じ相手に4手番で
 *   `level` を2に上げる(打撃が倍になる)。
 */
export function SpiritBriefing({
  context,
  holderName,
  destinationName,
  /** 大厄災への格上げの注意も出すか(すでに何度か受けている人向け)。 */
  showKingWarning = false,
}: {
  context: GameEngineContext;
  holderName: string;
  destinationName: string;
  showKingWarning?: boolean;
}) {
  const { t, tx } = useLocale();
  const spirit = context.content.spirit;
  const wardItem = context.content.items.find((i) => i.key === spirit.wardItemKey);
  const wardLabel = wardItem ? `${wardItem.emoji} ${tx(wardItem.name)}` : "";

  return (
    <div className="spirit-briefing">
      <div className="spirit-briefing-head">
        <span className="spirit-briefing-mark" aria-hidden="true">
          {spirit.emoji}
        </span>
        <span>{t("spiritAttachTitle")}</span>
      </div>
      <dl className="spirit-briefing-list">
        <dt>{t("spiritWhyLabel")}</dt>
        <dd>{renderRichText(t("spiritWhy", holderName, destinationName))}</dd>
        <dt>{t("spiritEscapeLabel")}</dt>
        <dd>
          {renderRichText(t("spiritEscape"))}
          <br />
          {renderRichText(t("spiritEscapePass"))}
          {wardLabel && (
            <>
              <br />
              {renderRichText(t("spiritWard", wardLabel))}
            </>
          )}
          {showKingWarning && (
            <>
              <br />
              {renderRichText(t("spiritKingWarn"))}
            </>
          )}
        </dd>
      </dl>
    </div>
  );
}
