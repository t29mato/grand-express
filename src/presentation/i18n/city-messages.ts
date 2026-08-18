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
 *
 * `seeTownAgain` は、2回目以降に畳んだ町の絵と紹介を開き直すためのもの。
 * **畳んでも捨てないための逃げ道**で、1回目に読み飛ばした人が後から読める。
 */
export const CITY_MESSAGES: Record<Locale, Record<string, string>> = {
  en: {
    yourCash: "You have",
    seeTownAgain: "Been here before — see the town again",
    afterBuying: "{0} left",
    shortBy: "{0} short",
  },
  es: {
    yourCash: "Tienes",
    seeTownAgain: "Ya estuviste aquí — ver el pueblo otra vez",
    afterBuying: "quedan {0}",
    shortBy: "faltan {0}",
  },
  fr: {
    yourCash: "Vous avez",
    seeTownAgain: "Déjà venu — revoir la ville",
    afterBuying: "il reste {0}",
    shortBy: "il manque {0}",
  },
  ja: {
    yourCash: "手持ち",
    seeTownAgain: "来たことがある町 — もう一度見る",
    afterBuying: "残り {0}",
    shortBy: "あと {0}",
  },
};
