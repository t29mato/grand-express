import { Locale } from "../../domain/shared-kernel/localized-text";

/**
 * 手番まわりのHUDに足したUI文言。
 *
 * `src/i18n/messages/*.json` は `scripts/extract-legacy-content.mjs` の生成物なので
 * 直接書き足すと次の抽出で消える。`setup-messages.ts` と同じく、
 * legacy 由来でない文言はここに置き、`messages.ts` でマージする。
 *
 * `rollingHint` はサイコロが転がっている間だけ出す。
 * ここに出目やマス数を書いてしまうと、止まるのを待つ意味が無くなる。
 *
 * `yourTurn` は自分の番のときだけ使う。legacy の `turnOf`(「{0} の番」)に
 * 既定名を流し込むと、英語で "You's turn" になってしまうため
 * (所有格が二人称と噛み合わない)。名前を差し替える作りでは直せないので、
 * 自分の番だけ文ごと分ける。フランス語の「Vous êtes Paris」と同じ種類の失敗。
 */
export const HUD_MESSAGES: Record<Locale, Record<string, string>> = {
  en: {
    yourTurn: "Your turn",
    rollingHint: "The die is rolling…",
    // `overview` は説明文で <b> タグを含むため、ボタンの脇に出す短い名前を別に持つ。
    overviewLabel: "Whole map",
    overviewBack: "Back to the usual view",
  },
  es: {
    yourTurn: "Tu turno",
    rollingHint: "El dado está rodando…",
    overviewLabel: "Mapa completo",
    overviewBack: "Volver a la vista normal",
  },
  fr: {
    yourTurn: "À vous de jouer",
    rollingHint: "Le dé roule…",
    overviewLabel: "Carte entière",
    overviewBack: "Revenir à la vue normale",
  },
  ja: {
    yourTurn: "あなたの番",
    rollingHint: "サイコロが転がっています…",
    overviewLabel: "全体表示",
    overviewBack: "元の表示に戻す",
  },
};
