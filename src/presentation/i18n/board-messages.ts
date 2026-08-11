import { Locale } from "../../domain/shared-kernel/localized-text";

/**
 * 盤面をキーボード・読み上げから扱うための文言。
 *
 * `src/i18n/messages/*.json` は `scripts/extract-legacy-content.mjs` の生成物なので
 * 直接書き足すと次の抽出で消える。`sound-messages.ts` と同じく、
 * legacy 由来でない文言はここに置き、`messages.ts` でマージする。
 *
 * 読み上げは目で追い直せない。**一度で分かる短さ**を優先し、
 * 候補1つにつき「向き・何のマスか・目的地までの残り」の3つだけを言う。
 *
 * **フランス語は tu で書く。** legacy から来た `fr.json` が tu 13件・vous 1件で、
 * プレイヤーの既定名も「Toi」。この作品の声は tu なので、あとから足した文言が
 * vous だと同じ画面に両方が並ぶ(実際に「À vous de jouer」と
 * 「Appuie sur le dé」が並んでいた)。
 *
 * ## 二人称を使うものと、使わないもの
 *
 * `atCity` / `atBetween` / `arrived*` は**手番の人が誰であっても出る**。
 * CPUの手番でも同じ枠に出ているので、二人称で書くと
 * 「You are at Potosí」がCPUの位置を指してしまう(ユーザーからの指摘)。
 * ここは場所だけを言い、**誰の話かは色と名前の札で外に出す**
 * (旅の記録の「名前 — 出来事」と同じ形。`whoAt` がその区切り)。
 * 日本語は元から「いまいるのは{0}」で人を含んでおらず、これを他の3言語の手本にした。
 *
 * 逆に `candidate*` / `candidatesGroup` は**自分が行き先を選ぶときにしか出ない**
 * (候補が出るのは人間の手番だけ)。こちらは二人称のままでよい。
 */
export const BOARD_MESSAGES: Record<Locale, Record<string, string>> = {
  en: {
    boardLabel: "Game board",
    dirN: "north",
    dirNE: "north-east",
    dirE: "east",
    dirSE: "south-east",
    dirS: "south",
    dirSW: "south-west",
    dirW: "west",
    dirNW: "north-west",
    sqQuiz: "quiz",
    sqBlue: "blue",
    sqRed: "red",
    remainingTo: "{0} is {1} squares away",
    candidateSquare: "{0}, a {1} square. {2}",
    candidateCity: "{0}, {1}. {2}",
    candidateDest: "{0}, {1}. This is your destination.",
    candidatesGroup: "Move {0} squares. {1} places you can reach.",
    whoAt: "{0} — {1}",
    atCity: "At {0}. {1}.",
    atBetween: "Between {0} and {1}. {2}.",
    arrivedAtCity: "Moved to {0}.",
    arrivedBetween: "Moved to a square between {0} and {1}.",
    candidateOnLine: ". On the {0}–{1} line.",
  },
  es: {
    boardLabel: "Tablero de juego",
    dirN: "al norte",
    dirNE: "al noreste",
    dirE: "al este",
    dirSE: "al sureste",
    dirS: "al sur",
    dirSW: "al suroeste",
    dirW: "al oeste",
    dirNW: "al noroeste",
    sqQuiz: "de preguntas",
    sqBlue: "azul",
    sqRed: "roja",
    remainingTo: "{0} está a {1} casillas",
    candidateSquare: "{0}, casilla {1}. {2}",
    candidateCity: "{0}, {1}. {2}",
    candidateDest: "{0}, {1}. Es tu destino.",
    candidatesGroup: "Avanzas {0} casillas. {1} lugares a los que puedes llegar.",
    whoAt: "{0} — {1}",
    atCity: "En {0}. {1}.",
    atBetween: "Entre {0} y {1}. {2}.",
    arrivedAtCity: "Se mueve a {0}.",
    arrivedBetween: "Se mueve a una casilla entre {0} y {1}.",
    candidateOnLine: ". En la línea {0}–{1}.",
  },
  fr: {
    boardLabel: "Plateau de jeu",
    dirN: "au nord",
    dirNE: "au nord-est",
    dirE: "à l'est",
    dirSE: "au sud-est",
    dirS: "au sud",
    dirSW: "au sud-ouest",
    dirW: "à l'ouest",
    dirNW: "au nord-ouest",
    sqQuiz: "quiz",
    sqBlue: "bleue",
    sqRed: "rouge",
    remainingTo: "{0} est à {1} cases",
    candidateSquare: "{0}, case {1}. {2}",
    candidateCity: "{0}, {1}. {2}",
    candidateDest: "{0}, {1}. C'est ta destination.",
    candidatesGroup: "Tu avances de {0} cases. {1} endroits accessibles.",
    whoAt: "{0} — {1}",
    atCity: "À {0}. {1}.",
    atBetween: "Entre {0} et {1}. {2}.",
    arrivedAtCity: "Déplacement vers {0}.",
    arrivedBetween: "Déplacement vers une case entre {0} et {1}.",
    candidateOnLine: ". Sur la ligne {0}–{1}.",
  },
  ja: {
    boardLabel: "ゲーム盤",
    dirN: "北へ",
    dirNE: "北東へ",
    dirE: "東へ",
    dirSE: "南東へ",
    dirS: "南へ",
    dirSW: "南西へ",
    dirW: "西へ",
    dirNW: "北西へ",
    sqQuiz: "クイズ",
    sqBlue: "青",
    sqRed: "赤",
    remainingTo: "{0}まで残り{1}マス",
    candidateSquare: "{0}、{1}のマス。{2}",
    candidateCity: "{0}、{1}。{2}",
    candidateDest: "{0}、{1}。目的地です。",
    candidatesGroup: "{0}マス進みます。行ける場所は{1}か所。",
    whoAt: "{0} — {1}",
    atCity: "いまいるのは{0}。{1}。",
    atBetween: "いまいるのは{0}と{1}のあいだ。{2}。",
    arrivedAtCity: "{0}に移動しました。",
    arrivedBetween: "{0}と{1}のあいだのマスに移動しました。",
    candidateOnLine: "。{0}〜{1}の線。",
  },
};
