import { Locale } from "../../domain/shared-kernel/localized-text";

/**
 * セットアップ画面のために足したUI文言。
 *
 * `src/i18n/messages/*.json` は `scripts/extract-legacy-content.mjs` の生成物なので
 * 直接書き足すと次の抽出で消える。legacy 由来でない文言はここに置き、
 * `messages.ts` で読み込み時にマージする。
 *
 * フランス語・スペイン語は英語より長くなりがちなので、
 * 見出しに使うものは意味を保ったまま短めの言い回しを選んでいる。
 */
export const SETUP_MESSAGES: Record<Locale, Record<string, string>> = {
  en: {
    whoPlays: "Who is riding?",
    rulesGroup: "House rules",
    addTraveller: "Add a traveller",
    travellerSlot: "Traveller {0}",
  },
  es: {
    whoPlays: "¿Quién viaja?",
    rulesGroup: "Reglas",
    addTraveller: "Añadir viajero",
    travellerSlot: "Viajero {0}",
  },
  fr: {
    whoPlays: "Qui monte à bord ?",
    rulesGroup: "Règles",
    addTraveller: "Ajouter un voyageur",
    travellerSlot: "Voyageur {0}",
  },
  ja: {
    whoPlays: "だれが乗る?",
    rulesGroup: "ルール",
    addTraveller: "旅の仲間を足す",
    travellerSlot: "{0}人目",
  },
};
