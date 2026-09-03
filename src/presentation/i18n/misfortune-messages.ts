"use client";

import { Locale } from "../../domain/shared-kernel/localized-text";

/**
 * 「変化はすべて目撃させる」ために足した文言。
 *
 * 厄災の神の説明・災難の効果・四半期の決算・独占・車窓の一言など、
 * **なぜそうなったのかを画面で言うための言葉**をここにまとめている。
 * `src/i18n/messages/*.json` は抽出の生成物なので直接書き足さず、
 * `game-log-messages.ts` などと同じく `messages.ts` で重ねる。
 *
 * ## 書きかたの約束
 *
 * - **人称を含めない。**同じ文がCPUの手番でも出るため。
 *   「あなたが失った」と書くと、CPUの災難を自分のことだと読んでしまう
 *   (`event-messages.ts` の `eventGain` で一度やった失敗)。
 *   誰の話かは見出しの名前だけが決める。
 * - **仕組みは推測で書かない。**下の文はすべてコードの実装に対応している。
 *   - 憑く先 … `arrive-destination.use-case.ts` → `attachToFarthestPlayer`
 *     / `settle-spirit-after-turn.use-case.ts` → `settleAfterTurn`
 *     (どちらも「目的地からいちばん遠い人」)
 *   - すれ違いで移る … `move-player.use-case.ts` → `passTo`
 *   - 供物 … `resolve-misfortune-strike.use-case.ts` の `wardItemKey` 分岐(消費する)
 *   - 大厄災 … `misfortune-spirit.ts` の `recordStrike`(同じ相手に4手番)
 *   - 賞金の増えかた … `game-session.ts` の `DESTINATION_PRIZE_PER_MONTH`
 *   - 四半期収入 … `advance-turn.use-case.ts`(`month % 3 === 0` に物件収入)
 * - フランス語は既存に合わせて **tu** で書く。
 */
export const MISFORTUNE_MESSAGES: Record<Locale, Record<string, string>> = {
  en: {
    // 厄災の神が憑いた瞬間の説明
    spiritAttachTitle: "The spirit has latched on",
    spiritWhyLabel: "Why this traveller",
    spiritWhy: "<b>{0}</b> is the farthest from <b>{1}</b>. The spirit always goes to whoever is farthest from the destination.",
    spiritEscapeLabel: "How to shake it off",
    spiritEscape: "At the end of every turn it moves to whoever is farthest right then — get ahead of someone and it leaves.",
    spiritEscapePass: "Landing on a square where another traveller stands hands it straight over.",
    spiritWard: "Carrying <b>{0}</b> buys off one disaster — the offering is used up.",
    spiritKingWarn: "Four turns on the same traveller and it doubles its strength.",
    // 災難の効果
    doomEffectLabel: "What it costs",
    doomEffectMoney: "−{0}",
    doomEffectSkip: "No move this turn.",
    doomEffectSkipPaid: "No move this turn, and −{0}.",
    doomEffectLost: "<b>{0}</b> lost.",
    doomEffectItem: "<b>{0}</b> taken.",
    doomEffectMoved: "Carried far away from the destination.",
    doomEffectNothing: "Nothing taken this time.",
    spiritSparedLog: "😌 <b>{0}</b> — the spirit lets this one pass (first year on a first trip).",
    // 四半期の決算
    settlementTitle: "Quarterly settlement",
    settlementSub: "Every three months, every business pays out.",
    settlementProps: "{0} businesses",
    settlementNone: "no businesses yet",
    settlementMonopoly: "👑{0} · double income",
    // 独占
    monopolyTitle: "Every business in town!",
    monopolyBody: "<b>{0}</b> now owns every business in <b>{1}</b>. Income from this town doubles.",
    // 目的地
    arrivalTitle: "Destination reached",
    bonusGrowth: "+{0} for every month that passes",
    bonusGrew: "+{0} (one month passed)",
    // 車窓の一言
    windowBetween: "Rolling through {0} — between {1} and {2}.",
    windowRegion: "Rolling through {0}.",
    // サイドバー
    cpuHolding: "Held by {0}",
  },
  es: {
    spiritAttachTitle: "El espíritu se ha pegado",
    spiritWhyLabel: "Por qué a este viajero",
    spiritWhy: "<b>{0}</b> es quien está más lejos de <b>{1}</b>. El espíritu siempre va a quien esté más lejos del destino.",
    spiritEscapeLabel: "Cómo quitárselo",
    spiritEscape: "Al final de cada turno pasa a quien esté más lejos en ese momento: adelanta a alguien y se va.",
    spiritEscapePass: "Caer en una casilla donde hay otro viajero se lo pasa directamente.",
    spiritWard: "Llevar <b>{0}</b> paga una desgracia — la ofrenda se gasta.",
    spiritKingWarn: "Cuatro turnos con el mismo viajero y dobla su fuerza.",
    doomEffectLabel: "Lo que cuesta",
    doomEffectMoney: "−{0}",
    doomEffectSkip: "Sin movimiento este turno.",
    doomEffectSkipPaid: "Sin movimiento este turno, y −{0}.",
    doomEffectLost: "Se pierde <b>{0}</b>.",
    doomEffectItem: "Se llevan <b>{0}</b>.",
    doomEffectMoved: "Arrastrado lejos del destino.",
    doomEffectNothing: "Esta vez no se pierde nada.",
    spiritSparedLog: "😌 <b>{0}</b> — el espíritu lo deja pasar (primer año del primer viaje).",
    settlementTitle: "Balance trimestral",
    settlementSub: "Cada tres meses, todos los negocios rinden.",
    settlementProps: "{0} negocios",
    settlementNone: "aún sin negocios",
    settlementMonopoly: "👑{0} · ingreso doble",
    monopolyTitle: "¡Todo el pueblo!",
    monopolyBody: "<b>{0}</b> ya posee todos los negocios de <b>{1}</b>. El ingreso de este pueblo se dobla.",
    arrivalTitle: "Destino alcanzado",
    bonusGrowth: "+{0} por cada mes que pasa",
    bonusGrew: "+{0} (ha pasado un mes)",
    windowBetween: "Cruzando {0} — entre {1} y {2}.",
    windowRegion: "Cruzando {0}.",
    cpuHolding: "En manos de {0}",
  },
  fr: {
    spiritAttachTitle: "L'esprit s'est accroché",
    spiritWhyLabel: "Pourquoi ce voyageur",
    spiritWhy: "<b>{0}</b> est le plus loin de <b>{1}</b>. L'esprit va toujours vers celui qui est le plus loin de la destination.",
    spiritEscapeLabel: "Comment t'en débarrasser",
    spiritEscape: "À la fin de chaque tour il passe à celui qui est alors le plus loin — dépasse quelqu'un et il s'en va.",
    spiritEscapePass: "Arriver sur une case occupée par un autre voyageur le lui refile aussitôt.",
    spiritWard: "Porter <b>{0}</b> rachète une catastrophe — l'offrande est consommée.",
    spiritKingWarn: "Quatre tours sur le même voyageur et sa force double.",
    doomEffectLabel: "Ce que ça coûte",
    doomEffectMoney: "−{0}",
    doomEffectSkip: "Pas de déplacement ce tour-ci.",
    doomEffectSkipPaid: "Pas de déplacement ce tour-ci, et −{0}.",
    doomEffectLost: "<b>{0}</b> perdu.",
    doomEffectItem: "<b>{0}</b> emporté.",
    doomEffectMoved: "Emporté loin de la destination.",
    doomEffectNothing: "Rien de perdu cette fois.",
    spiritSparedLog: "😌 <b>{0}</b> — l'esprit laisse passer (première année d'un premier voyage).",
    settlementTitle: "Bilan trimestriel",
    settlementSub: "Tous les trois mois, chaque affaire rapporte.",
    settlementProps: "{0} affaires",
    settlementNone: "pas encore d'affaires",
    settlementMonopoly: "👑{0} · revenu doublé",
    monopolyTitle: "Toute la ville !",
    monopolyBody: "<b>{0}</b> possède désormais toutes les affaires de <b>{1}</b>. Le revenu de cette ville double.",
    arrivalTitle: "Destination atteinte",
    bonusGrowth: "+{0} pour chaque mois qui passe",
    bonusGrew: "+{0} (un mois écoulé)",
    windowBetween: "On traverse {0} — entre {1} et {2}.",
    windowRegion: "On traverse {0}.",
    cpuHolding: "Aux mains de {0}",
  },
  ja: {
    spiritAttachTitle: "厄災の神が憑いた",
    spiritWhyLabel: "なぜこの人に",
    spiritWhy: "<b>{1}</b> からいちばん遠いのが <b>{0}</b> だから。厄災の神は、いつも目的地からいちばん遠い人のところへ行く。",
    spiritEscapeLabel: "どうすれば離れるか",
    spiritEscape: "手番の終わりごとに、そのときいちばん遠い人へ移る。誰かより先に進めば離れる。",
    spiritEscapePass: "ほかの旅人がいるマスに入ると、そのまま相手に移る。",
    spiritWard: "<b>{0}</b> を持っていれば、災難を1回だけ肩代わりしてくれる(供物は無くなる)。",
    spiritKingWarn: "同じ人に4手番居座ると、打撃が倍になる。",
    doomEffectLabel: "効果",
    doomEffectMoney: "−{0}",
    doomEffectSkip: "今回は動けない。",
    doomEffectSkipPaid: "今回は動けない。そのうえ −{0}。",
    doomEffectLost: "<b>{0}</b> を失った。",
    doomEffectItem: "<b>{0}</b> を取られた。",
    doomEffectMoved: "目的地から遠くへ飛ばされた。",
    doomEffectNothing: "今回は何も取られずに済んだ。",
    spiritSparedLog: "😌 <b>{0}</b> — 厄災の神は今回は見逃した(はじめての旅の1年目のあいだ)。",
    settlementTitle: "四半期の決算",
    settlementSub: "3ヶ月ごとに、持っている物件が収入を生む。",
    settlementProps: "物件 {0}件",
    settlementNone: "まだ物件なし",
    settlementMonopoly: "👑{0} · 収入2倍",
    monopolyTitle: "町をひとりじめ!",
    monopolyBody: "<b>{0}</b> が <b>{1}</b> の物件をすべてそろえた。この町の収入は2倍になる。",
    arrivalTitle: "目的地に到着",
    bonusGrowth: "1ヶ月経つごとに +{0}",
    bonusGrew: "+{0}(1ヶ月経過)",
    windowBetween: "{0} を行く。{1} と {2} のあいだ。",
    windowRegion: "{0} を行く。",
    cpuHolding: "{0} の持ちもの",
  },
};
