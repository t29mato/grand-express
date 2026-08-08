import { Locale } from "../../domain/shared-kernel/localized-text";

/**
 * 青マス・赤マスの出来事まわりのUI文言。
 *
 * `src/i18n/messages/*.json` は `scripts/extract-legacy-content.mjs` の生成物なので
 * 直接書き足すと次の抽出で消える。legacy 由来の文言を差し替えたいときも、
 * ここに同じキーで置いて `messages.ts` で重ねる。
 *
 * ## なぜ `eventGain` / `eventLoss` を上書きするか
 *
 * legacy の文はこうだった:
 *
 *   en "You come out ahead." / "It costs you."
 *   es "Sales ganando."      / "Te cuesta dinero."
 *   fr "Tu t'en sors gagnant."/ "Cela te coûte."
 *   ja 「得をした。」        / 「出費になった。」
 *
 * **この行はCPUの手番でもそのまま出る。** モーダルの見出しには「CPU 1」と
 * 出ているのに、結果の行が「あなたが得をした +Bs 200」と読めてしまい、
 * 自分の所持金が増えたと誤解される(本番で3回捕まった)。
 *
 * **日本語だけは元から主語が無く、誰の手番でも正しく読めていた。**
 * 英語・西語・仏語を日本語に合わせて、**人称を含まない言い方**に変える。
 * これで見出しの名前だけが「誰の話か」を決める。
 *
 * 本文(出来事の物語)は別の話で、107件中74件が英語で二人称のまま残っている。
 * そちらは文章そのものの書き直しになるので、この上書きでは直らない。
 *
 * ## `assetsTitle` について(いまは未使用)
 *
 * `{0}'s businesses` / `Les affaires de {0}` が4言語にあるが `src/` から
 * 参照されていない。**つなぐと "You's businesses" になる。**`turnOf` と同じ穴。
 * ここで別名に上書きしても、使う人がいないうちは死んだ文言が増えるだけなので
 * 置いていない。**直す場所は呼び出し側**で、`turnOf` が
 * `dice-button.tsx` でやっているのと同じく「既定名のときは文ごと差し替える」。
 * 消すには生成元(legacy と抽出スクリプト)を触る必要がある。
 */
export const EVENT_MESSAGES: Record<Locale, Record<string, string>> = {
  en: {
    eventGain: "Money gained.",
    eventLoss: "Money lost.",
  },
  es: {
    eventGain: "Dinero ganado.",
    eventLoss: "Dinero perdido.",
  },
  fr: {
    eventGain: "Argent gagné.",
    eventLoss: "Argent perdu.",
  },
  ja: {
    // 元から主語が無く、誰の手番でも正しく読めていたのでそのまま。
    eventGain: "得をした。",
    eventLoss: "出費になった。",
  },
};
