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
 *
 * ## 物件行のラベル(F-16)
 *
 * 「¥12,000,000 ・ +¥2,480,000/qtr ・ 残り ¥3,400,000」と数字が3つ並ぶと、
 * 初見でどれが値段でどれが収入か迷う。**数字には必ずラベルを付ける。**
 * 「/qtr」は日本語UIでも英語のまま残っていたので、言語ごとの言い方にする
 * (ja は「四半期」より「3ヶ月ごと」のほうが子どもにも伝わる)。
 *
 * ## 買った直後と売却の2段階(F-08)
 *
 * 買った瞬間に隣へ「売却」が出ると、誤タップで即 35% の損になる。
 * 買った直後の行にはのぼり(`justBought`)を立て、売却は
 * 「押す → 本当に売る?」の2段にする。
 */
export const CITY_MESSAGES: Record<Locale, Record<string, string>> = {
  en: {
    yourCash: "You have",
    seeTownAgain: "Been here before — see the town again",
    afterBuying: "{0} left",
    shortBy: "{0} short",
    priceLabel: "Price",
    incomeLabel: "Income / quarter",
    ownerLabel: "Owned by {0}",
    justBought: "Yours!",
    peekCaption: "Look at the map — the town has taken your colour.",
    sellConfirmAsk: "Really sell?",
    sellConfirmNote: "You get {0} back — less than you paid.",
    sellYes: "Sell it",
    sellNo: "Keep it",
  },
  es: {
    yourCash: "Tienes",
    seeTownAgain: "Ya estuviste aquí — ver el pueblo otra vez",
    afterBuying: "quedan {0}",
    shortBy: "faltan {0}",
    priceLabel: "Precio",
    incomeLabel: "Renta / trimestre",
    ownerLabel: "De {0}",
    justBought: "¡Tuyo!",
    peekCaption: "Mira el mapa — el pueblo ya lleva tu color.",
    sellConfirmAsk: "¿Vender de verdad?",
    sellConfirmNote: "Recibes {0} — menos de lo que pagaste.",
    sellYes: "Vender",
    sellNo: "Conservar",
  },
  fr: {
    yourCash: "Vous avez",
    seeTownAgain: "Déjà venu — revoir la ville",
    afterBuying: "il reste {0}",
    shortBy: "il manque {0}",
    priceLabel: "Prix",
    incomeLabel: "Revenu / trimestre",
    ownerLabel: "À {0}",
    justBought: "À toi !",
    peekCaption: "Regarde la carte — la ville est à ta couleur.",
    sellConfirmAsk: "Vraiment vendre ?",
    sellConfirmNote: "Tu récupères {0} — moins que ce que tu as payé.",
    sellYes: "Vendre",
    sellNo: "Garder",
  },
  ja: {
    yourCash: "手持ち",
    seeTownAgain: "来たことがある町 — もう一度見る",
    afterBuying: "残り {0}",
    shortBy: "あと {0}",
    priceLabel: "価格",
    incomeLabel: "収入 / 3ヶ月ごと",
    ownerLabel: "{0} の物件",
    justBought: "買いました!",
    peekCaption: "地図を見て — 町があなたの色になりました",
    sellConfirmAsk: "本当に売る?",
    sellConfirmNote: "戻ってくるのは {0}。払った額より少なくなります。",
    sellYes: "売る",
    sellNo: "やめる",
  },
};
