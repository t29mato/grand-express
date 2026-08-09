import { Locale } from "../../domain/shared-kernel/localized-text";

/**
 * 町のモーダルで、買うときの判断に要る文言。
 *
 * `src/i18n/messages/*.json` は抽出の生成物なので直接書き足さない。
 * legacy 由来でない文言はここに置き、`messages.ts` で重ねる
 * (`setup-messages.ts` と同じ作法)。
 *
 * 「30万の物件」と言われても、手元が20万なのか100万なのかが分からないと
 * 決められない。**手持ちと、買ったあとの残り、足りない額**の3つを出す。
 */
export const CITY_MESSAGES: Record<Locale, Record<string, string>> = {
  en: {
    yourCash: "You have",
    afterBuying: "{0} left",
    shortBy: "{0} short",
  },
  es: {
    yourCash: "Tienes",
    afterBuying: "quedan {0}",
    shortBy: "faltan {0}",
  },
  fr: {
    yourCash: "Vous avez",
    afterBuying: "il reste {0}",
    shortBy: "il manque {0}",
  },
  ja: {
    yourCash: "手持ち",
    afterBuying: "残り {0}",
    shortBy: "あと {0}",
  },
};
