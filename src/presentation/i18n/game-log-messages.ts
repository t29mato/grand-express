import { Locale } from "../../domain/shared-kernel/localized-text";

/**
 * 旅の記録(ログ)のうち、legacy に無い出来事の文言。
 *
 * `src/i18n/messages/*.json` は `scripts/extract-legacy-content.mjs` の生成物なので
 * 直接書き足すと次の抽出で消える。`setup-messages.ts` と同じく、
 * legacy 由来でない文言はここに置き、`messages.ts` でマージする。
 */
export const GAME_LOG_MESSAGES: Record<Locale, Record<string, string>> = {
  en: {
    carriedLog: "💨 <b>{0}</b> is carried {1} squares — the wind chose the way.",
    carriedToLog: "💨 <b>{0}</b> is carried {1} squares and comes down at <b>{2}</b>.",
  },
  es: {
    carriedLog: "💨 <b>{0}</b> recorre {1} casillas: el viento eligió el rumbo.",
    carriedToLog: "💨 <b>{0}</b> recorre {1} casillas y baja en <b>{2}</b>.",
  },
  fr: {
    carriedLog: "💨 <b>{0}</b> est emporté sur {1} cases : le vent a choisi la direction.",
    carriedToLog: "💨 <b>{0}</b> est emporté sur {1} cases et se pose à <b>{2}</b>.",
  },
  ja: {
    carriedLog: "💨 <b>{0}</b> は {1} マス流された。向きを決めたのは風。",
    carriedToLog: "💨 <b>{0}</b> は {1} マス流されて <b>{2}</b> に降りた。",
  },
};
