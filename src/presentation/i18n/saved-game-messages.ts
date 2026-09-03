import { Locale } from "../../domain/shared-kernel/localized-text";

/**
 * 保存された旅を**消す前の確認**に使う文言。
 *
 * `src/i18n/messages/*.json` は抽出の生成物なので直接書き足さない。
 * `setup-messages.ts` と同じく、ここに置いて `messages.ts` で重ねる。
 *
 * ## なぜこの文言なのか
 *
 * 「削除」を押した瞬間に12ヶ月分の旅が消えていた。押し間違い1回で、
 * 遊んだ時間がそのまま無くなる。**取り返しがつかないことを、押す前に言う。**
 *
 * - 見出しは**疑問形**にする。「削除の確認」のような名詞だと、
 *   すでに決まったことの通知に見えて、そのまま押される。
 * - `discardConfirmWarn` は「元に戻せない」を必ず含める。何が起きるかではなく、
 *   **やり直せないこと**が、この確認を挟む理由そのもの。
 * - ボタンは動詞で書く。「はい/いいえ」だと、見出しを読み直さないと
 *   どちらが消すのか分からない。
 * - `discardConfirmKeep` は**残すほうを既定**にするため、
 *   「やめる」ではなく「消さずに置いておく」と読める言い方を選んでいる。
 *   既存の `cancel`(Not now / やめる)は「後でやる」に読めて、
 *   ここでは意味がずれる。
 *
 * フランス語・スペイン語は他のUIと揃えて親しい言い方(tu / tú)。
 * ただしいずれも二人称を含まないので、活用の揺れは起きない。
 *
 * ## `overwriteConfirm*` — 「旅に出る」で途中の旅が消える前の確認
 *
 * 「削除」には確認を付けたが、**「旅に出る」を押しても同じものが消える**
 * (新しい旅は始めた瞬間に保存され、前の旅を上書きする)。2026-09-02 のプレイで、
 * Year1・May まで進めた旅が確認なしに消えた。こちらにも同じ形の確認を挟む。
 *
 * - 見出しは「削除しますか」ではなく**「新しい旅を始めますか」**。押した人が
 *   やろうとしたのは「始める」であって「消す」ではないので、その言葉で問い直す。
 * - 残すほうのボタンに**何を残すのか**(途中の旅)を書く。「やめる」だけだと、
 *   新しい旅をやめるのか、消すのをやめるのかが読めない。
 * - 進むほうは、消えることを含めて言う(ja「消して始める」)。
 */
export const SAVED_GAME_MESSAGES: Record<Locale, Record<string, string>> = {
  en: {
    discardConfirmTitle: "Delete this saved journey?",
    discardConfirmWarn: "Once deleted, this journey cannot be brought back.",
    discardConfirmKeep: "Keep it",
    discardConfirmDelete: "Delete it",
    overwriteConfirmTitle: "Start a new journey?",
    overwriteConfirmWarn: "The saved journey will be lost and cannot be brought back.",
    overwriteConfirmKeep: "Keep the saved journey",
    overwriteConfirmGo: "Start anyway",
  },
  es: {
    discardConfirmTitle: "¿Eliminar este viaje guardado?",
    discardConfirmWarn: "Una vez eliminado, este viaje no se puede recuperar.",
    discardConfirmKeep: "Conservarlo",
    discardConfirmDelete: "Eliminarlo",
    overwriteConfirmTitle: "¿Empezar un nuevo viaje?",
    overwriteConfirmWarn: "El viaje guardado se perderá y no se podrá recuperar.",
    overwriteConfirmKeep: "Conservar el viaje guardado",
    overwriteConfirmGo: "Empezar igualmente",
  },
  fr: {
    discardConfirmTitle: "Supprimer ce voyage enregistré ?",
    discardConfirmWarn: "Une fois supprimé, ce voyage ne peut plus être récupéré.",
    discardConfirmKeep: "Le garder",
    discardConfirmDelete: "Le supprimer",
    overwriteConfirmTitle: "Commencer un nouveau voyage ?",
    overwriteConfirmWarn: "Le voyage enregistré sera perdu et ne pourra plus être récupéré.",
    overwriteConfirmKeep: "Garder le voyage enregistré",
    overwriteConfirmGo: "Commencer quand même",
  },
  ja: {
    discardConfirmTitle: "この旅を消しますか?",
    discardConfirmWarn: "一度消すと、元に戻せません。",
    discardConfirmKeep: "消さずに置いておく",
    discardConfirmDelete: "消す",
    overwriteConfirmTitle: "新しい旅を始めますか?",
    overwriteConfirmWarn: "途中の旅は消えて、元に戻せません。",
    overwriteConfirmKeep: "途中の旅を残す",
    overwriteConfirmGo: "消して始める",
  },
};
