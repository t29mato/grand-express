import { Locale } from "../../domain/shared-kernel/localized-text";

/**
 * フィードバック画面のUI文言。
 *
 * `src/i18n/messages/*.json` は抽出の生成物なので直接足すと次の抽出で消える。
 * legacy 由来でない文言はここに置き、`messages.ts` で重ねる
 * (`setup-messages.ts` と同じ扱い)。
 *
 * **フランス語はここだけ vous のままにしてある。** 盤面の文言は tu で揃えた
 * (legacy の `fr.json` が tu 20件・vous 1件、既定名も「Toi」なので、
 * この作品の遊びの声は tu)。ただしこの画面は**遊びの中の声ではなく、
 * 作り手から使う人への問い合わせ窓口**なので、敬体のほうが自然になる。
 * 混ざっているのではなく、宛先が違うので分けている。
 */

export const FEEDBACK_MESSAGES: Record<Locale, Record<string, string>> = {
  en: {
    feedbackLink: "Send feedback",
    feedbackTitle: "Tell us what you think",
    feedbackLead:
      "Found something broken, or thought of something the game should do? Write it here. It becomes a public ticket you can check on later.",
    feedbackKind: "What is this about?",
    feedbackKindBug: "Something is broken",
    feedbackKindIdea: "An idea",
    feedbackKindContent: "A fact looks wrong",
    feedbackKindOther: "Something else",
    feedbackSummary: "In one line",
    feedbackSummaryHint: "e.g. The train marker disappears on the Kyushu route",
    feedbackDetail: "Tell us more",
    feedbackDetailHint:
      "What did you do, what did you expect, and what happened instead? If it is about a particular town or question, name it.",
    feedbackBoard: "Which board were you on?",
    feedbackBoardNone: "Not about a board",
    feedbackSend: "Send",
    feedbackSending: "Sending…",
    feedbackThanks: "Thank you — it is filed.",
    feedbackKeepUrl:
      "Keep this link. It is public, so you can come back any time to see what happened to it.",
    feedbackOpenIssue: "Open the ticket",
    feedbackAnother: "Send another",
    feedbackFailed: "It could not be sent. Please try again in a moment.",
    feedbackTooMany: "That is a lot of messages at once. Please wait a minute and try again.",
    feedbackUnavailable:
      "The feedback box is not set up yet. Sorry — please come back a little later.",
    feedbackBack: "Back to the game",
  },
  es: {
    feedbackLink: "Enviar comentarios",
    feedbackTitle: "Cuéntanos qué te parece",
    feedbackLead:
      "¿Algo no funciona, o se te ocurre algo que el juego debería hacer? Escríbelo aquí. Se convierte en un ticket público que podrás consultar después.",
    feedbackKind: "¿De qué se trata?",
    feedbackKindBug: "Algo no funciona",
    feedbackKindIdea: "Una idea",
    feedbackKindContent: "Un dato parece incorrecto",
    feedbackKindOther: "Otra cosa",
    feedbackSummary: "En una línea",
    feedbackSummaryHint: "p. ej. El tren desaparece en la ruta de Kyushu",
    feedbackDetail: "Cuéntanos más",
    feedbackDetailHint:
      "¿Qué hiciste, qué esperabas y qué pasó? Si es sobre una ciudad o pregunta concreta, dinos cuál.",
    feedbackBoard: "¿En qué tablero estabas?",
    feedbackBoardNone: "No es sobre un tablero",
    feedbackSend: "Enviar",
    feedbackSending: "Enviando…",
    feedbackThanks: "Gracias, ya está registrado.",
    feedbackKeepUrl:
      "Guarda este enlace. Es público, así que puedes volver cuando quieras para ver en qué quedó.",
    feedbackOpenIssue: "Abrir el ticket",
    feedbackAnother: "Enviar otro",
    feedbackFailed: "No se pudo enviar. Inténtalo de nuevo en un momento.",
    feedbackTooMany: "Son muchos mensajes seguidos. Espera un minuto e inténtalo otra vez.",
    feedbackUnavailable: "El buzón aún no está configurado. Vuelve un poco más tarde.",
    feedbackBack: "Volver al juego",
  },
  fr: {
    feedbackLink: "Envoyer un retour",
    feedbackTitle: "Dites-nous ce que vous en pensez",
    feedbackLead:
      "Quelque chose ne marche pas, ou une idée pour le jeu ? Écrivez-la ici. Elle devient un ticket public que vous pourrez consulter plus tard.",
    feedbackKind: "De quoi s'agit-il ?",
    feedbackKindBug: "Quelque chose ne marche pas",
    feedbackKindIdea: "Une idée",
    feedbackKindContent: "Un fait semble faux",
    feedbackKindOther: "Autre chose",
    feedbackSummary: "En une ligne",
    feedbackSummaryHint: "ex. Le train disparaît sur la ligne de Kyushu",
    feedbackDetail: "Dites-nous en plus",
    feedbackDetailHint:
      "Qu'avez-vous fait, qu'attendiez-vous, et que s'est-il passé ? Si cela concerne une ville ou une question précise, nommez-la.",
    feedbackBoard: "Sur quel plateau étiez-vous ?",
    feedbackBoardNone: "Pas lié à un plateau",
    feedbackSend: "Envoyer",
    feedbackSending: "Envoi…",
    feedbackThanks: "Merci, c'est enregistré.",
    feedbackKeepUrl:
      "Gardez ce lien. Il est public : revenez quand vous voulez voir ce qu'il est devenu.",
    feedbackOpenIssue: "Ouvrir le ticket",
    feedbackAnother: "En envoyer un autre",
    feedbackFailed: "L'envoi a échoué. Réessayez dans un instant.",
    feedbackTooMany: "Cela fait beaucoup de messages d'un coup. Attendez une minute.",
    feedbackUnavailable: "La boîte à retours n'est pas encore en place. Revenez un peu plus tard.",
    feedbackBack: "Retour au jeu",
  },
  ja: {
    feedbackLink: "ご意見を送る",
    feedbackTitle: "気づいたことを教えてください",
    feedbackLead:
      "うまく動かないところ、こうだったらいいのに、と思ったことを書いてください。公開のチケットになるので、あとから様子を見に来られます。",
    feedbackKind: "どんな話ですか",
    feedbackKindBug: "うまく動かない",
    feedbackKindIdea: "こうしてほしい",
    feedbackKindContent: "内容が間違っている気がする",
    feedbackKindOther: "その他",
    feedbackSummary: "ひとことで言うと",
    feedbackSummaryHint: "例: 九州の路線で駒が消える",
    feedbackDetail: "くわしく",
    feedbackDetailHint:
      "何をしたら、どうなると思っていて、実際はどうなったかを書いてください。特定の町やクイズの話なら、その名前も。",
    feedbackBoard: "どの盤面で遊んでいましたか",
    feedbackBoardNone: "盤面の話ではない",
    feedbackSend: "送る",
    feedbackSending: "送っています…",
    feedbackThanks: "ありがとうございます。受け付けました。",
    feedbackKeepUrl:
      "このリンクを控えておいてください。公開されているので、いつでも見に来て、その後どうなったかを確かめられます。",
    feedbackOpenIssue: "チケットを開く",
    feedbackAnother: "もう1件送る",
    feedbackFailed: "送れませんでした。少し時間をおいて、もう一度お試しください。",
    feedbackTooMany: "短いあいだに送りすぎています。1分ほど待ってからお試しください。",
    feedbackUnavailable: "ご意見の受け付けはまだ準備中です。もう少しあとでお試しください。",
    feedbackBack: "ゲームに戻る",
  },
};
