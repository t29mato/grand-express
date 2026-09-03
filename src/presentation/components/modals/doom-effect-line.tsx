"use client";

import { PropertyRef } from "../../../domain/shared-kernel/ids";
import { DoomOutcome } from "../../../domain/misfortune/doom-effect";
import { GameEngineContext } from "../../../application/game-engine-context";
import { useLocale } from "../../i18n/locale-context";
import { formatMoney } from "../../i18n/money-format";
import { renderRichText } from "../../i18n/rich-text";

/**
 * 災難が**実際に何をしたか**の1行。
 *
 * ## なぜ足したか
 *
 * これまで災難のカードには名前と物語しか出ていなかった。
 * 「ぼったくり」と書いてあっても**いくら取られたのかは書かれていない**ので、
 * サイドバーの数字が点滅したのを見て推測するしかなかった
 * (実プレイの記録 2026-09-02。3手番連続で受けて、金額が最後まで分からなかった)。
 *
 * 効果の値は `doom-effect.ts` が `DoomOutcome` として返しているのに、
 * 画面までは `DoomFlavor` しか運んでいなかった。型を広げてここで書き出す。
 *
 * ## 決まった形で書く
 *
 * 「−¥2,000,000」「今回は動けない」「築地の仲卸を失った」のように、
 * **毎回同じ形**にする。災難ごとに文章が違うと、何を読めばいいのか分からない。
 */
export function DoomEffectLine({
  context,
  outcome,
}: {
  context: GameEngineContext;
  outcome: DoomOutcome;
}) {
  const { t, tx } = useLocale();
  const money = (amount: number) => formatMoney(amount, context.content.currency);

  /** 失った物件の名前を並べる(「築地の仲卸」)。 */
  const propertyNames = (refs: readonly PropertyRef[]) =>
    refs
      .map((ref) => {
        const { cityId, index } = PropertyRef.parse(ref);
        return tx(context.getCity(cityId).properties[index]?.name);
      })
      .filter(Boolean)
      .join(" / ");

  // 効果の種類を**網羅**する。足したときにここを書き忘れると `never` で止まる。
  const text = ((): string => {
    switch (outcome.effectId) {
      case "fine":
        return t("doomEffectMoney", money(outcome.amountPaid));
      case "percentLoss":
        return t("doomEffectMoney", money(outcome.amountLost));
      case "payOthers":
        return t("doomEffectMoney", money(outcome.totalPaid));
      case "skipTurn":
        return outcome.alsoPaid === null
          ? t("doomEffectSkip")
          : t("doomEffectSkipPaid", money(outcome.alsoPaid));
      case "loseProperties":
        if (outcome.lostRefs.length > 0) return t("doomEffectLost", propertyNames(outcome.lostRefs));
        return outcome.fallbackPaid === null
          ? t("doomEffectNothing")
          : t("doomEffectMoney", money(outcome.fallbackPaid));
      case "teleport":
        return t("doomEffectMoved");
      case "steal": {
        if (outcome.lostItem) {
          const item = context.content.items.find((i) => i.key === outcome.lostItem);
          return t("doomEffectItem", item ? `${item.emoji} ${tx(item.name)}` : String(outcome.lostItem));
        }
        return outcome.lostCash > 0 ? t("doomEffectMoney", money(outcome.lostCash)) : t("doomEffectNothing");
      }
      default: {
        const unreachable: never = outcome;
        return String(unreachable);
      }
    }
  })();

  return (
    <p className="reveal-effect">
      <span className="reveal-effect-label">{t("doomEffectLabel")}</span>
      <span className="reveal-effect-value">{renderRichText(text)}</span>
    </p>
  );
}
