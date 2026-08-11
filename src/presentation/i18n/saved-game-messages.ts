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
 * ただしこの4つはいずれも二人称を含まないので、活用の揺れは起きない。
 */
export const SAVED_GAME_MESSAGES: Record<Locale, Record<string, string>> = {
  en: {
    discardConfirmTitle: "Delete this saved journey?",
    discardConfirmWarn: "Once deleted, this journey cannot be brought back.",
    discardConfirmKeep: "Keep it",
    discardConfirmDelete: "Delete it",
  },
  es: {
    discardConfirmTitle: "¿Eliminar este viaje guardado?",
    discardConfirmWarn: "Una vez eliminado, este viaje no se puede recuperar.",
    discardConfirmKeep: "Conservarlo",
    discardConfirmDelete: "Eliminarlo",
  },
  fr: {
    discardConfirmTitle: "Supprimer ce voyage enregistré ?",
    discardConfirmWarn: "Une fois supprimé, ce voyage ne peut plus être récupéré.",
    discardConfirmKeep: "Le garder",
    discardConfirmDelete: "Le supprimer",
  },
  ja: {
    discardConfirmTitle: "この旅を消しますか?",
    discardConfirmWarn: "一度消すと、元に戻せません。",
    discardConfirmKeep: "消さずに置いておく",
    discardConfirmDelete: "消す",
  },
};
