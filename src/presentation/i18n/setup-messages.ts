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
 *
 * `defaultPlayerName` はプレイヤー名の初期値。名前は手番表示やログにそのまま出るため、
 * 英語のままだと「Youの番」のように一語だけ英語が残ってしまう。
 * フランス語・スペイン語の他の文言が親しい言い方(tu / tú)で揃っているので、
 * ここも「Toi」「Tú」を選んでいる。
 * `defaultCpuName` の「CPU」は4言語とも訳さない。すぐ隣にある人/CPU/なし の
 * 切り替えボタンが4言語とも「CPU」表記なので、そちらと揃える。
 */
export const SETUP_MESSAGES: Record<Locale, Record<string, string>> = {
  en: {
    whoPlays: "Who is riding?",
    rulesGroup: "House rules",
    addTraveller: "Add a traveller",
    travellerSlot: "Traveller {0}",
    defaultPlayerName: "You",
    defaultCpuName: "CPU {0}",
  },
  es: {
    whoPlays: "¿Quién viaja?",
    rulesGroup: "Reglas",
    addTraveller: "Añadir viajero",
    travellerSlot: "Viajero {0}",
    defaultPlayerName: "Tú",
    defaultCpuName: "CPU {0}",
  },
  fr: {
    whoPlays: "Qui monte à bord ?",
    rulesGroup: "Règles",
    addTraveller: "Ajouter un voyageur",
    travellerSlot: "Voyageur {0}",
    defaultPlayerName: "Toi",
    defaultCpuName: "CPU {0}",
  },
  ja: {
    whoPlays: "だれが乗る?",
    rulesGroup: "ルール",
    addTraveller: "旅の仲間を足す",
    travellerSlot: "{0}人目",
    defaultPlayerName: "あなた",
    defaultCpuName: "CPU {0}",
  },
};
