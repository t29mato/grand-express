import { Locale } from "../../domain/shared-kernel/localized-text";

/**
 * 見せ場(目的地への到達・旅の終わり)の文言。
 *
 * `src/i18n/messages/*.json` は抽出の生成物なので直接書き足さず、
 * `city-messages.ts` などと同じく `messages.ts` で重ねる。
 *
 * ## 書きかたの約束
 *
 * - **人称を含めない。**到達の画面はCPUが着いたときにも出る。
 *   「あなたが到着」と書くと、CPUの到着を自分のことだと読んでしまう
 *   (`hud/board-status.tsx` の冒頭に同じ失敗の記録がある)。
 *   誰の話かは、文の前に置く色の丸と名前だけが決める。
 *   `fanfareArrivedIn` は「{町}に到着!」の形で、主語を持たない。
 * - 順位の画面も同じ。「あなたの勝ち」ではなく、名前を大きく出す。
 * - フランス語は既存に合わせて **tu** で書く。
 *
 * ## 引き方
 *
 * `messages.ts` で重ねたあとは `t("fanfareFirst")` で引ける。
 * ただし見せ場の部品は `arrivalText()` で**この表を直接**引く。
 * 登録が済んでいなくても文言が鍵名のまま画面に出ることがなく、
 * `messages.ts` → この表 → `locale-context` の循環も作らない。
 */
export const ARRIVAL_MESSAGES: Record<Locale, Record<string, string>> = {
  en: {
    // 目的地への到達
    fanfareArrivedIn: "Arrived in {0}!",
    fanfareFirst: "First to arrive!",
    fanfarePrizeLabel: "Prize",
    fanfareTap: "Tap anywhere to continue",
    // 旅の終わり
    finaleLead: "{0} months on the rails — the journey is complete.",
    finaleWinner: "Winner",
    finaleRankings: "Final standings",
    finaleCash: "Cash {0}",
    finaleProperty: "Businesses {0}",
    finaleNoProperty: "No businesses",
    finaleMonopolies: "Whole towns: {0}",
    finaleStats: "{0} destinations · {1} quiz answers right",
    // 表彰式
    awardsFinish: "Every award has been handed out.",
  },
  es: {
    fanfareArrivedIn: "¡Llegada a {0}!",
    fanfareFirst: "¡Primero en llegar!",
    fanfarePrizeLabel: "Premio",
    fanfareTap: "Toca en cualquier lugar para continuar",
    finaleLead: "{0} meses sobre los rieles — el viaje ha terminado.",
    finaleWinner: "Ganador",
    finaleRankings: "Clasificación final",
    finaleCash: "Efectivo {0}",
    finaleProperty: "Negocios {0}",
    finaleNoProperty: "Sin negocios",
    finaleMonopolies: "Pueblos enteros: {0}",
    finaleStats: "{0} destinos · {1} aciertos en el quiz",
    awardsFinish: "Todos los premios han sido entregados.",
  },
  fr: {
    fanfareArrivedIn: "Arrivée à {0} !",
    fanfareFirst: "Premier sur place !",
    fanfarePrizeLabel: "Prime",
    fanfareTap: "Touche n'importe où pour continuer",
    finaleLead: "{0} mois sur les rails — le voyage est terminé.",
    finaleWinner: "Vainqueur",
    finaleRankings: "Classement final",
    finaleCash: "Liquide {0}",
    finaleProperty: "Commerces {0}",
    finaleNoProperty: "Aucun commerce",
    finaleMonopolies: "Villes entières : {0}",
    finaleStats: "{0} destinations · {1} bonnes réponses au quiz",
    awardsFinish: "Tous les prix ont été remis.",
  },
  ja: {
    fanfareArrivedIn: "{0}に到着!",
    fanfareFirst: "一番乗り!",
    fanfarePrizeLabel: "賞金",
    fanfareTap: "どこかをタップして続ける",
    finaleLead: "{0}ヶ月を走りきりました。",
    finaleWinner: "優勝",
    finaleRankings: "最終順位",
    finaleCash: "現金 {0}",
    finaleProperty: "物件 {0}",
    finaleNoProperty: "物件なし",
    finaleMonopolies: "独占した町: {0}",
    finaleStats: "目的地 {0}回 · クイズ正解 {1}問",
    awardsFinish: "すべての賞を渡しました。",
  },
};

/** `{0}`, `{1}` … を埋める(`messages.ts` の `formatMessage` と同じ規則。循環を避けて写している)。 */
export function arrivalText(locale: Locale, key: string, ...args: (string | number)[]): string {
  let result = ARRIVAL_MESSAGES[locale][key] ?? key;
  args.forEach((value, index) => {
    result = result.split(`{${index}}`).join(String(value));
  });
  return result;
}
