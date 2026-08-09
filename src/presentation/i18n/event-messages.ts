import { Locale, LocalizedText } from "../../domain/shared-kernel/localized-text";

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
/**
 * 厄災の記録。
 *
 * legacy は「👹 <b>{0}</b> は厄災に見舞われた。」の1行だけで、
 * **何をされたのかも、いくら失ったのかも書かれていなかった。**
 * モーダルには災難の名前・物語・絵が出ているので、**記録の役目は後から辿ること**。
 * 物語は繰り返さず、**名前と結果だけ**を1行に収める。
 */
const DOOM_LOG = {
  en: {
    spiritStruckLog: "👹 <b>{0}</b> — <b>{1}</b>. {2}",
    spiritStruckKingLog: "👹👹 <b>{0}</b> — <b>{1}</b>. {2} The spirit is at full strength.",
    doomCost: "{0} lost.",
    doomSkipNext: "The next turn is lost.",
    doomSkipNextPaid: "The next turn and {0} are lost.",
    doomPropertyLost: "{0} of their businesses change hands.",
    doomMovedAway: "Carried far from the destination.",
    doomItemTaken: "An item is taken.",
    doomNothing: "Nothing is taken this time.",
  },
  es: {
    spiritStruckLog: "👹 <b>{0}</b> — <b>{1}</b>. {2}",
    spiritStruckKingLog: "👹👹 <b>{0}</b> — <b>{1}</b>. {2} El espíritu está en pleno poder.",
    doomCost: "Pierde {0}.",
    doomSkipNext: "Pierde el siguiente turno.",
    doomSkipNextPaid: "Pierde el siguiente turno y {0}.",
    doomPropertyLost: "{0} de sus negocios cambian de manos.",
    doomMovedAway: "Se aleja del destino.",
    doomItemTaken: "Le quitan un objeto.",
    doomNothing: "Esta vez no se lleva nada.",
  },
  fr: {
    spiritStruckLog: "👹 <b>{0}</b> — <b>{1}</b>. {2}",
    spiritStruckKingLog: "👹👹 <b>{0}</b> — <b>{1}</b>. {2} L'esprit est à pleine puissance.",
    doomCost: "Perd {0}.",
    doomSkipNext: "Perd le tour suivant.",
    doomSkipNextPaid: "Perd le tour suivant et {0}.",
    doomPropertyLost: "{0} de ses affaires changent de mains.",
    doomMovedAway: "Emporté loin de la destination.",
    doomItemTaken: "Un objet lui est pris.",
    doomNothing: "Rien ne lui est pris cette fois.",
  },
  ja: {
    spiritStruckLog: "👹 <b>{0}</b> — <b>{1}</b>。{2}",
    spiritStruckKingLog: "👹👹 <b>{0}</b> — <b>{1}</b>。{2}厄災の神は本気だ。",
    doomCost: "{0} を失った。",
    doomSkipNext: "次の手番を飛ばされる。",
    doomSkipNextPaid: "次の手番と {0} を失った。",
    doomPropertyLost: "物件を{0}件手放すことになった。",
    doomMovedAway: "目的地から遠くへ飛ばされた。",
    doomItemTaken: "持ちものを1つ取られた。",
    doomNothing: "今回は何も取られずに済んだ。",
  },
};

export const EVENT_MESSAGES: Record<Locale, Record<string, string>> = {
  en: {
    ...DOOM_LOG.en,
    eventGain: "Money gained.",
    eventLoss: "Money lost.",
  },
  es: {
    ...DOOM_LOG.es,
    eventGain: "Dinero ganado.",
    eventLoss: "Dinero perdido.",
  },
  fr: {
    ...DOOM_LOG.fr,
    eventGain: "Argent gagné.",
    eventLoss: "Argent perdu.",
  },
  ja: {
    ...DOOM_LOG.ja,
    // 元から主語が無く、誰の手番でも正しく読めていたのでそのまま。
    eventGain: "得をした。",
    eventLoss: "出費になった。",
  },
};

/**
 * 災難の結果の一言を、**4言語ぶんまとめた `LocalizedText`** にして返す。
 *
 * 旅の記録の引数は文字列・数値・`LocalizedText` しか持てない
 * (`LogArg`)。文字列に畳んでしまうと、**言語を切り替えても過去の記録だけ
 * 元の言語のまま残る**。4言語そろえて渡せば、表示時に `tx` が選び直す。
 *
 * 桁区切りや通貨記号は言語に依らないので、金額はそのまま差し込む。
 */
export function doomPhrase(key: string, ...args: (string | number)[]): LocalizedText {
  const fill = (template: string) =>
    args.reduce<string>((text, value, index) => text.split(`{${index}}`).join(String(value)), template);
  return {
    en: fill(DOOM_LOG.en[key as keyof typeof DOOM_LOG.en] ?? key),
    es: fill(DOOM_LOG.es[key as keyof typeof DOOM_LOG.es] ?? key),
    fr: fill(DOOM_LOG.fr[key as keyof typeof DOOM_LOG.fr] ?? key),
    ja: fill(DOOM_LOG.ja[key as keyof typeof DOOM_LOG.ja] ?? key),
  };
}
