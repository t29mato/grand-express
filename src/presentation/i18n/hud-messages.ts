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
 *
 * **フランス語は tu で書く。** legacy 由来の `fr.json` が tu 中心(tu 13件・vous 1件)で、
 * 既定名も「Toi」。あとから足した文言を vous にすると同じ画面で混ざる。
 */
export const HUD_MESSAGES: Record<Locale, Record<string, string>> = {
  en: {
    yourTurn: "Your turn",
    exactDiceTitle: "Name your number",
    itemNeedsMisfortune: "Only when the spirit is on you",
    itemAlreadyExtraTurn: "You already have an extra turn",
    itemNoOneToPassTo: "No one to pass it to",
    exactDiceHint: "Choose how far to go, then tap where to stop.",
    rollingHint: "The die is rolling…",
    // `overview` は説明文で <b> タグを含むため、ボタンの脇に出す短い名前を別に持つ。
    overviewLabel: "Whole map",
    overviewBack: "Back to the usual view",
    // 暦の帯(`calendar-strip.tsx`)。残り月数は今月を含めて数える。最後の月は数ではなく言葉で。
    calendarMonthsLeft: "{0} months left",
    calendarLastMonth: "Last month",
    calendarEnding: "The journey ends soon",
    // 読み上げ用の一文。「5月、残り8ヶ月」の形。
    calendarLabel: "{0}, {1}",
    // 絵だけのボタンの名札(F-15)。`toggleState` は「音楽: ON」のように、名前と今の状態を並べる。
    // ON/OFF は4言語で共通にする(es/fr で形容詞にすると性の一致で崩れる)。
    stateOn: "ON",
    stateOff: "OFF",
    toggleState: "{0}: {1}",
    languageLabel: "Language",
    rollDie: "Roll the die",
    // キーボードの案内(F-18)。初回の手番に一度だけ小さく出す。
    keyHintTitle: "Keyboard works too",
    keyHintRoll: "roll / next",
    keyHintChoose: "pick a square",
    keyHintConfirm: "confirm",
  },
  es: {
    yourTurn: "Tu turno",
    exactDiceTitle: "Di tu número",
    itemNeedsMisfortune: "Solo si llevas el espíritu",
    itemAlreadyExtraTurn: "Ya tienes un turno extra",
    itemNoOneToPassTo: "No hay a quién pasárselo",
    exactDiceHint: "Elige cuánto avanzar y luego toca dónde parar.",
    rollingHint: "El dado está rodando…",
    overviewLabel: "Mapa completo",
    overviewBack: "Volver a la vista normal",
    calendarMonthsLeft: "Quedan {0} meses",
    calendarLastMonth: "Último mes",
    calendarEnding: "El viaje termina pronto",
    calendarLabel: "{0}, {1}",
    stateOn: "ON",
    stateOff: "OFF",
    toggleState: "{0}: {1}",
    languageLabel: "Idioma",
    rollDie: "Tirar el dado",
    keyHintTitle: "También con el teclado",
    keyHintRoll: "tirar / seguir",
    keyHintChoose: "elegir casilla",
    keyHintConfirm: "confirmar",
  },
  fr: {
    yourTurn: "À toi de jouer",
    exactDiceTitle: "Annonce ton chiffre",
    itemNeedsMisfortune: "Seulement si tu portes l'esprit",
    itemAlreadyExtraTurn: "Tu as déjà un tour en plus",
    itemNoOneToPassTo: "Personne à qui le refiler",
    exactDiceHint: "Choisis la distance, puis touche la case où t'arrêter.",
    rollingHint: "Le dé roule…",
    overviewLabel: "Carte entière",
    overviewBack: "Revenir à la vue normale",
    calendarMonthsLeft: "Encore {0} mois",
    calendarLastMonth: "Dernier mois",
    calendarEnding: "Le voyage touche à sa fin",
    calendarLabel: "{0}, {1}",
    stateOn: "ON",
    stateOff: "OFF",
    toggleState: "{0} : {1}",
    languageLabel: "Langue",
    rollDie: "Lancer le dé",
    keyHintTitle: "Le clavier marche aussi",
    keyHintRoll: "lancer / suivant",
    keyHintChoose: "choisir la case",
    keyHintConfirm: "valider",
  },
  ja: {
    yourTurn: "あなたの番",
    exactDiceTitle: "出目を決める",
    itemNeedsMisfortune: "厄災を背負っているときだけ",
    itemAlreadyExtraTurn: "すでにもう1回ぶんある",
    itemNoOneToPassTo: "押し付ける相手がいない",
    exactDiceHint: "何マス進むかを選んでから、止まる場所を選びます。",
    rollingHint: "サイコロが転がっています…",
    overviewLabel: "全体表示",
    overviewBack: "元の表示に戻す",
    calendarMonthsLeft: "残り{0}ヶ月",
    calendarLastMonth: "最後の月",
    calendarEnding: "旅の終わりが近い",
    calendarLabel: "{0}、{1}",
    stateOn: "ON",
    stateOff: "OFF",
    toggleState: "{0} {1}",
    languageLabel: "言語",
    rollDie: "サイコロを振る",
    keyHintTitle: "キーボードでも遊べます",
    keyHintRoll: "振る／次へ",
    keyHintChoose: "行き先を選ぶ",
    keyHintConfirm: "決定",
  },
};
