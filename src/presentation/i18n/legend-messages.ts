import { Locale } from "../../domain/shared-kernel/localized-text";

/**
 * 盤面の凡例の文言。
 *
 * `src/i18n/messages/*.json` は `scripts/extract-legacy-content.mjs` の生成物なので
 * 直接書き足すと次の抽出で消える。`setup-messages.ts` と同じく、
 * legacy 由来でない文言はここに置き、`messages.ts` でマージする。
 *
 * legacy の凡例は「青マス」「赤マス」と**色の名前を言い換えているだけ**で、
 * 止まると何が起きるのかはどこにも書いていなかった。初めて遊ぶ人は
 * 赤マスに止まって所持金が減るまで、赤が危ないことを知らない。
 * 色の名前ではなく**起きること**を書く。
 *
 * `legendQuiz` の {0} には正解時の増額(難易度による幅)が入る。不正解でも
 * 減るが、そこまで書くと狭い画面で2行になるため「正解で」とだけ添えている。
 */
export const LEGEND_MESSAGES: Record<Locale, Record<string, string>> = {
  en: {
    legendTitle: "What the squares do",
    legendQuiz: "Quiz · {0} if right",
    legendBlue: "Blue · good news, you gain",
    legendRed: "Red · trouble, you pay",
  },
  es: {
    legendTitle: "Qué hace cada casilla",
    legendQuiz: "Quiz · {0} si aciertas",
    legendBlue: "Azul · algo bueno, ganas",
    legendRed: "Roja · algo malo, pagas",
  },
  fr: {
    legendTitle: "Ce que font les cases",
    legendQuiz: "Quiz · {0} si juste",
    legendBlue: "Bleue · bonne nouvelle, tu gagnes",
    legendRed: "Rouge · ennui, tu paies",
  },
  ja: {
    legendTitle: "マスの意味",
    legendQuiz: "クイズ・正解で{0}",
    legendBlue: "青・良いことが起きてお金が増える",
    legendRed: "赤・悪いことが起きてお金が減る",
  },
};
