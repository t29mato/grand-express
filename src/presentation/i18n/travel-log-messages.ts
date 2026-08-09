import { Locale } from "../../domain/shared-kernel/localized-text";

/**
 * 旅の記録の文言。**legacy の同じ鍵を上書きする。**
 *
 * ## 何が壊れていたか
 *
 * 記録の行は「名前を主語にして動詞を活用させる」書き方だった。
 *
 *   en "❓ <b>{0}</b> answers wrong (−{1})."
 *   es "❓ <b>{0}</b> falla (−{1})."
 *   fr "❓ <b>{0}</b> se trompe (−{1})."
 *
 * ところが**既定のプレイヤー名は代名詞**(You / Tú / Toi)なので、
 * 三人称の活用と噛み合わない。
 *
 *   ❌ You answers wrong   ❌ Tú falla   ❌ Toi se trompe
 *
 * `turnOf` の "You's turn" と同じ原因の、毎ターン出る版。
 * **日本語だけ壊れていない**のは、「<b>{0}</b> がクイズ不正解」のように
 * **助詞で名前を切り離し、活用させていない**から。
 *
 * ## 直しかた
 *
 * **日本語に合わせて、名前を文から切り離す。**
 * `名前 — 出来事` の形にし、出来事のほうは動詞を活用させない
 * **体言止め(名詞句)**で書く。記録は文章ではなく控えなので、この形が自然。
 *
 *   ✅ "❓ <b>{0}</b> — wrong answer (−{1})."
 *   ✅ "❓ <b>{0}</b> — respuesta incorrecta (−{1})."
 *   ✅ "❓ <b>{0}</b> — mauvaise réponse (−{1})."
 *
 * **CPUの行も同じ文にする。**文を2通り持つと、片方だけ直す事故が起きる。
 * 記録として読めば三人称でも一人称でも同じに読める。
 *
 * ## 性の一致も同時に消える
 *
 * 西語 "está atascado" / 仏語 "est bloqué" は**男性形に決め打ち**だった。
 * 「マリア」で遊ぶと文法として誤り。名詞句にすると、一致するのは
 * 文の中の名詞(turno / tour)になるので、名前の性に依存しなくなる。
 */
export const TRAVEL_LOG_MESSAGES: Record<Locale, Record<string, string>> = {
  en: {
    quizNoLog: "❓ <b>{0}</b> — wrong answer (−{1}).",
    quizOkLog: "❓ <b>{0}</b> — correct (+{1}).",
    arriveDestLog: "🎯 <b>{0}</b> — destination reached! <span style='color:var(--gold)'>+{1}</span>",
    usedItemLog: "✨ <b>{0}</b> — item used: {1} <b>{2}</b>.",
    passLog: "{0} <b>{1}</b> — spirit passed to <b>{2}</b>!",
    stuck: "⛔ <b>{0}</b> — turn lost.",
    spiritBlockedLog: "🧿 <b>{0}</b> — misfortune warded off!",
    gained: "<b>{0}</b> — a gift from the spirit: <span class='money'>+{1}</span>.",
    rolls: "<b>{0}</b> — move: <b>{1}</b>.",
    cardLog: "🟡 <b>{0}</b> — item found: {1} {2}.",
    cardEmptyLog: "🟡 <b>{0}</b> — nothing found.",
    extraTurn: "🎽 <b>{0}</b> — another turn!",
    boughtLog: "🏪 <b>{0}</b> — purchase: <b>{1}</b> in {2} (−{3}).",
    investCpuLog: "📈 <b>{0}</b> — investment in <b>{1}</b>.",
    boughtItemLog: "🛍 <b>{0}</b> — purchase: {1} <b>{2}</b>.",
    sellLog: "💸 <b>{0}</b> — sale: <b>{1}</b> (+{2}).",
    cpuPassesTown: "<b>{0}</b> — through the town, no purchase.",
    quarterly: "<b>{0}</b> — quarterly income <span style='color:var(--green)'>+{1}</span>.",
    noItemsP: "{0} — no items.",
    wins: "🏆 {0} — victory!",
    arrivesFirst: "<b>{0}</b> — first arrival, prize collected.",
    arriveLog: "🎯 <b>{0}</b> — first to reach <b>{1}</b>! <span style='color:var(--gold)'>+{2}</span>",
    investLog: "📈 <b>{0}</b> — investment in <b>{1}</b> → Lv{2} (−{3}).",
    monoLog: "👑 <b>{0}</b> — <b>{1}</b> fully owned; income doubled!",
    lost: "<b>{0}</b> — <span class='money neg'>−{1}</span>.",
    passBody: "A brush past on the platform — <b>{0}</b>, <b>{1}</b> — and {2} steps across without a word.",
    spiritFollows: "{0} moves to <b>{1}</b>, now the farthest from the destination.",
    twoDice: "Two dice: <b>{0}</b> and <b>{1}</b> — <b>{2}</b>, move: <b>{3}</b>.",
  },
  es: {
    quizNoLog: "❓ <b>{0}</b> — respuesta incorrecta (−{1}).",
    quizOkLog: "❓ <b>{0}</b> — respuesta correcta (+{1}).",
    arriveDestLog: "🎯 <b>{0}</b> — ¡destino alcanzado! <span style='color:var(--gold)'>+{1}</span>",
    // 「objeto」が男性名詞なので「usado」で固定できる。道具名の性に引きずられない。
    usedItemLog: "✨ <b>{0}</b> — objeto usado: {1} <b>{2}</b>.",
    passLog: "{0} <b>{1}</b> — ¡espíritu pasado a <b>{2}</b>!",
    // 旧: "está atascado y pierde el turno"(男性形の決め打ちだった)
    stuck: "⛔ <b>{0}</b> — turno perdido.",
    spiritBlockedLog: "🧿 <b>{0}</b> — ¡desgracia conjurada!",
    gained: "<b>{0}</b> — regalo del espíritu: <span class='money'>+{1}</span>.",
    rolls: "<b>{0}</b> — avance: <b>{1}</b>.",
    cardLog: "🟡 <b>{0}</b> — objeto encontrado: {1} {2}.",
    cardEmptyLog: "🟡 <b>{0}</b> — nada.",
    extraTurn: "🎽 <b>{0}</b> — ¡otro turno!",
    boughtLog: "🏪 <b>{0}</b> — compra: <b>{1}</b> en {2} (−{3}).",
    investCpuLog: "📈 <b>{0}</b> — inversión en <b>{1}</b>.",
    boughtItemLog: "🛍 <b>{0}</b> — compra: {1} <b>{2}</b>.",
    sellLog: "💸 <b>{0}</b> — venta: <b>{1}</b> (+{2}).",
    cpuPassesTown: "<b>{0}</b> — pasa por el pueblo, sin compras.",
    quarterly: "<b>{0}</b> — renta trimestral <span style='color:var(--green)'>+{1}</span>.",
    noItemsP: "{0} — sin objetos.",
    // 旧: "¡{0} gana!" は性の一致が無いので無事だったが、"ganador/ganadora" を
    // 使うと壊れる。名詞の「victoria」なら名前の性に依存しない。
    wins: "🏆 {0} — ¡victoria!",
    arrivesFirst: "<b>{0}</b> — primera llegada, premio cobrado.",
    arriveLog: "🎯 <b>{0}</b> — ¡llegada a <b>{1}</b> en cabeza! <span style='color:var(--gold)'>+{2}</span>",
    investLog: "📈 <b>{0}</b> — inversión en <b>{1}</b> → Nv{2} (−{3}).",
    monoLog: "👑 <b>{0}</b> — posesión completa de <b>{1}</b>; ¡renta duplicada!",
    lost: "<b>{0}</b> — <span class='money neg'>−{1}</span>.",
    passBody: "Un roce en el andén — <b>{0}</b>, <b>{1}</b> — y {2} cambia de compañía sin decir palabra.",
    // 旧: "ahora el más lejano"(男性形の決め打ち)
    spiritFollows: "{0} pasa a <b>{1}</b>, ahora a mayor distancia del destino.",
    twoDice: "Dos dados: <b>{0}</b> y <b>{1}</b> — <b>{2}</b>, avance: <b>{3}</b>.",
  },
  fr: {
    quizNoLog: "❓ <b>{0}</b> — mauvaise réponse (−{1}).",
    quizOkLog: "❓ <b>{0}</b> — bonne réponse (+{1}).",
    arriveDestLog: "🎯 <b>{0}</b> — destination atteinte ! <span style='color:var(--gold)'>+{1}</span>",
    usedItemLog: "✨ <b>{0}</b> — objet utilisé : {1} <b>{2}</b>.",
    passLog: "{0} <b>{1}</b> — esprit refilé à <b>{2}</b> !",
    // 旧: "est bloqué et perd son tour"(男性形の決め打ちだった)
    stuck: "⛔ <b>{0}</b> — tour perdu.",
    spiritBlockedLog: "🧿 <b>{0}</b> — malheur conjuré !",
    gained: "<b>{0}</b> — cadeau de l'esprit : <span class='money'>+{1}</span>.",
    rolls: "<b>{0}</b> — avance : <b>{1}</b>.",
    cardLog: "🟡 <b>{0}</b> — objet trouvé : {1} {2}.",
    cardEmptyLog: "🟡 <b>{0}</b> — rien.",
    extraTurn: "🎽 <b>{0}</b> — encore un tour !",
    boughtLog: "🏪 <b>{0}</b> — achat : <b>{1}</b> à {2} (−{3}).",
    investCpuLog: "📈 <b>{0}</b> — investissement dans <b>{1}</b>.",
    boughtItemLog: "🛍 <b>{0}</b> — achat : {1} <b>{2}</b>.",
    sellLog: "💸 <b>{0}</b> — vente : <b>{1}</b> (+{2}).",
    cpuPassesTown: "<b>{0}</b> — traversée de la ville, sans achat.",
    quarterly: "<b>{0}</b> — revenu trimestriel <span style='color:var(--green)'>+{1}</span>.",
    noItemsP: "{0} — aucun objet.",
    wins: "🏆 {0} — victoire !",
    arrivesFirst: "<b>{0}</b> — première arrivée, prime encaissée.",
    arriveLog: "🎯 <b>{0}</b> — arrivée à <b>{1}</b> en tête ! <span style='color:var(--gold)'>+{2}</span>",
    investLog: "📈 <b>{0}</b> — investissement dans <b>{1}</b> → Niv{2} (−{3}).",
    monoLog: "👑 <b>{0}</b> — possession complète de <b>{1}</b> ; revenu doublé !",
    lost: "<b>{0}</b> — <span class='money neg'>−{1}</span>.",
    passBody: "Un frôlement sur le quai — <b>{0}</b>, <b>{1}</b> — et {2} change de compagnon sans un mot.",
    // 旧: "désormais le plus loin"(男性形の決め打ち)
    spiritFollows: "{0} passe à <b>{1}</b>, désormais à la plus grande distance du but.",
    twoDice: "Deux dés : <b>{0}</b> et <b>{1}</b> — <b>{2}</b>, avance : <b>{3}</b>.",
  },
  ja: {
    // 日本語は元から壊れていないが、他と行の形をそろえる。
    quizNoLog: "❓ <b>{0}</b> — クイズ不正解 (−{1})。",
    quizOkLog: "❓ <b>{0}</b> — クイズ正解 (+{1})。",
    arriveDestLog: "🎯 <b>{0}</b> — 目的地に到着! <span style='color:var(--gold)'>+{1}</span>",
    usedItemLog: "✨ <b>{0}</b> — {1} <b>{2}</b> を使用。",
    passLog: "{0} <b>{1}</b> — <b>{2}</b> に厄災の神をなすりつけた!",
    stuck: "⛔ <b>{0}</b> — 足止めで1回休み。",
    spiritBlockedLog: "🧿 <b>{0}</b> — 厄災を跳ね返した!",
    gained: "<b>{0}</b> — 厄災の神からの授かりもの <span class='money'>+{1}</span>。",
    rolls: "<b>{0}</b> — <b>{1}</b> マス。",
    cardLog: "🟡 <b>{0}</b> — {1} {2} を入手。",
    cardEmptyLog: "🟡 <b>{0}</b> — 何もなし。",
    extraTurn: "🎽 <b>{0}</b> — もう1回!",
    boughtLog: "🏪 <b>{0}</b> — {2} の <b>{1}</b> を購入 (−{3})。",
    investCpuLog: "📈 <b>{0}</b> — <b>{1}</b> に投資。",
    boughtItemLog: "🛍 <b>{0}</b> — {1} <b>{2}</b> を購入。",
    sellLog: "💸 <b>{0}</b> — <b>{1}</b> を売却 (+{2})。",
    cpuPassesTown: "<b>{0}</b> — 町を素通り。",
    quarterly: "<b>{0}</b> — 四半期収入 <span style='color:var(--green)'>+{1}</span>。",
    noItemsP: "{0} — アイテムなし。",
    wins: "🏆 {0} — 勝利!",
    arrivesFirst: "<b>{0}</b> — 一番乗り、賞金を獲得。",
    arriveLog: "🎯 <b>{0}</b> — <b>{1}</b> に一番乗り! <span style='color:var(--gold)'>+{2}</span>",
    investLog: "📈 <b>{0}</b> — <b>{1}</b> に投資 → Lv{2} (−{3})。",
    monoLog: "👑 <b>{0}</b> — <b>{1}</b> を独占。収入が倍に!",
    lost: "<b>{0}</b> — <span class='money neg'>−{1}</span>。",
    passBody: "ホームでのすれ違い — <b>{0}</b> と <b>{1}</b>。そして {2} は黙って乗り換えた。",
    spiritFollows: "{0} は <b>{1}</b> へ移った。いま目的地からいちばん遠い。",
    twoDice: "サイコロ2個: <b>{0}</b> と <b>{1}</b> — <b>{2}</b> は <b>{3}</b> マス。",
  },
};
