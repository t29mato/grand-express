import { Locale } from "../../domain/shared-kernel/localized-text";

/**
 * 持ちもの欄のUI文言。
 *
 * `src/i18n/messages/*.json` は `scripts/extract-legacy-content.mjs` の生成物なので
 * 直接書き足すと次の抽出で消える。`setup-messages.ts` と同じく、
 * legacy 由来でない文言はここに置き、`messages.ts` でマージする。
 *
 * `useItem` は札そのものが押せることを示す短い言葉。
 * `itemAuto` は「押しても何も起きないが、無駄なアイテムではない」ことを伝える
 * (お守りの類は条件が揃うと勝手に効くので、押せないのは壊れているせいではない)。
 */
export const ITEM_MESSAGES: Record<Locale, Record<string, string>> = {
  en: {
    useItem: "Use",
    itemAuto: "Automatic",
  },
  es: {
    useItem: "Usar",
    itemAuto: "Automático",
  },
  fr: {
    useItem: "Utiliser",
    itemAuto: "Auto",
  },
  ja: {
    useItem: "使う",
    itemAuto: "自動",
  },
};
