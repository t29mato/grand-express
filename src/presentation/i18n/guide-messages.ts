import { Locale } from "../../domain/shared-kernel/localized-text";

/**
 * 「はじめて」の人に、最初の数手番だけ出す1行ガイドの文言
 * (`components/hud/first-turns-guide.tsx`)。
 *
 * `src/i18n/messages/*.json` は `scripts/extract-legacy-content.mjs` の生成物なので
 * 直接書き足すと次の抽出で消える。`setup-messages.ts` と同じく、
 * legacy 由来でない文言はここに置き、`messages.ts` でマージする。
 *
 * ## 書きかた
 *
 * - **1行に1つのことだけ書く。**出発モーダルの120字のヒント文が読まれずに
 *   終わっていたのは、5つのことが一度に書いてあったから。
 * - **その場でできることを書く。**「サイコロを押す」「光っているマスを選ぶ」。
 * - **数字の意味を言う。**候補のマスに出る「残り◯」は、それが何なのかを
 *   一度言わないと、ただの数字にしか見えない。
 * - 物件の収入は**3ヶ月ごと**(`isQuarterlyIncomeMonth` は `month % 3 === 0`)。
 *   「毎年」ではない。
 */
export const GUIDE_MESSAGES: Record<Locale, Record<string, string>> = {
  en: {
    guideRoll: "Tap the dice to set off.",
    guideChooseSquare: "Pick one of the glowing squares — the smaller its number, the closer you land to your destination.",
    guideBuyProperty: "Buy a property here and it pays you every three months.",
    guideHide: "Hide tips",
  },
  es: {
    guideRoll: "Toca el dado para salir.",
    guideChooseSquare: "Elige una de las casillas iluminadas: cuanto menor sea su número, más cerca caerás del destino.",
    guideBuyProperty: "Compra una propiedad aquí y te pagará cada tres meses.",
    guideHide: "Ocultar consejos",
  },
  fr: {
    guideRoll: "Appuie sur le dé pour partir.",
    guideChooseSquare: "Choisis une des cases qui brillent : plus son nombre est petit, plus tu atterris près de la destination.",
    guideBuyProperty: "Achète une propriété ici : elle te rapporte tous les trois mois.",
    guideHide: "Masquer les conseils",
  },
  ja: {
    guideRoll: "サイコロを押して出発しよう。",
    guideChooseSquare: "光っているマスから選ぼう。数字が小さいほど、目的地の近くに降りられる。",
    guideBuyProperty: "ここで物件を買うと、3ヶ月ごとに収入が入ります。",
    guideHide: "ヒントを消す",
  },
};
