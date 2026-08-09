import { describe, expect, it } from "vitest";
import { MESSAGES_BY_LOCALE } from "./messages";
import { TRAVEL_LOG_MESSAGES } from "./travel-log-messages";

/**
 * プレイヤー名を差し込む文言の文法を、機械的に確かめる。
 *
 * **名前を主語にして動詞を活用させると壊れる。**
 * 既定名が代名詞(You / Tú / Toi)なので三人称の活用と噛み合わず、
 * 「You answers wrong」「Tú falla」「Toi se trompe」になっていた。
 * `turnOf` の "You's turn" と同じ原因の、毎ターン出る版。
 *
 * さらに西語・仏語は**形容詞が男性形の決め打ち**だった
 * ("está atascado" / "est bloqué")。「マリア」で遊ぶと文法として誤り。
 * これは**既定名では出ない**ので、実機を見ても見つからない。
 *
 * 直しかたは「名前 — 出来事」の体言止め。ここでは、
 * **名前のすぐあとに語が続いていないこと**を検査する。
 */

/**
 * どの `{n}` が**プレイヤー名**かを明示する。
 *
 * 名前でない穴(マス数・町名・物件名・絵文字)の直後に語が続くのは正しい。
 * 「`{1}` squares」は数のあとの単位であって、活用ではない。
 * ここを機械で当てようとすると誤検知だらけになるので、**手で書き出す。**
 * 文言を足したら、この表にも足すこと(下の検査が抜けを知らせる)。
 */
const NAME_SLOTS: Readonly<Record<string, readonly number[]>> = {
  quizNoLog: [0],
  quizOkLog: [0],
  arriveDestLog: [0],
  usedItemLog: [0],
  passLog: [1, 2],
  stuck: [0],
  spiritBlockedLog: [0],
  gained: [0],
  rolls: [0],
  cardLog: [0],
  cardEmptyLog: [0],
  extraTurn: [0],
  boughtLog: [0],
  investCpuLog: [0],
  boughtItemLog: [0],
  sellLog: [0],
  cpuPassesTown: [0],
  quarterly: [0],
  noItemsP: [0],
  wins: [0],
  arrivesFirst: [0],
  arriveLog: [0],
  investLog: [0],
  monoLog: [0],
  lost: [0],
  passBody: [0, 1],
  spiritFollows: [1],
  twoDice: [2],
};

const NAME_KEYS = Object.keys(TRAVEL_LOG_MESSAGES.en);

/** その穴の直後に語が続いていたら、名前に係る動詞・形容詞になっている。 */
function conjugatesAfterName(template: string, slot: number): boolean {
  return new RegExp(`\\{${slot}\\}(</b>)?\\s+(?![+\\-−<(「])[A-Za-zÀ-ÿ]`).test(template);
}

describe("プレイヤー名が入る文言の文法", () => {
  it("上書きしている鍵が1つ以上ある(検査そのものが空回りしていないことの確認)", () => {
    expect(NAME_KEYS.length).toBeGreaterThan(10);
  });

  /** 表への書き忘れがあると、その鍵は素通りしてしまう。 */
  it("どの鍵も、名前の位置が表に書かれている", () => {
    const missing = NAME_KEYS.filter((key) => !(key in NAME_SLOTS));
    expect(missing, `NAME_SLOTS に位置を書いてください: ${missing.join(", ")}`).toEqual([]);
  });

  it.each(["en", "es", "fr", "ja"] as const)("%s: 名前のすぐあとに活用する語を置いていない", (locale) => {
    const messages = MESSAGES_BY_LOCALE[locale] as unknown as Record<string, string>;
    const broken = NAME_KEYS.filter((key) =>
      (NAME_SLOTS[key] ?? []).some((slot) => conjugatesAfterName(messages[key] ?? "", slot)),
    );
    expect(
      broken,
      `${locale}: 名前のあとに語が続いています(既定名 You/Tú/Toi で文法が壊れます): ` +
        broken.map((key) => `${key} = ${messages[key]}`).join(" / "),
    ).toEqual([]);
  });

  /**
   * 上書きは4言語そろっていないと、抜けた言語だけ legacy の壊れた文が残る。
   */
  it("上書きが4言語そろっている", () => {
    for (const locale of ["es", "fr", "ja"] as const) {
      expect(Object.keys(TRAVEL_LOG_MESSAGES[locale]).sort(), `${locale} の鍵が英語とそろっていません`).toEqual(
        NAME_KEYS.slice().sort(),
      );
    }
  });

  /**
   * 西語・仏語の性の一致。名前の性は決められないので、
   * **名前に係る形容詞を置かない**(名詞句の中で完結させる)。
   */
  it.each(["es", "fr"] as const)("%s: 名前に係る男性形の形容詞が残っていない", (locale) => {
    const gendered = locale === "es" ? /\b(atascado|el más|primero|ganador)\b/ : /\b(bloqué|le plus loin|premier)\b/;
    const broken = NAME_KEYS.filter((key) => gendered.test(TRAVEL_LOG_MESSAGES[locale][key] ?? ""));
    expect(
      broken,
      `${locale}: 名前の性に依存する語が残っています(「マリア」で遊ぶと誤りになります): ${broken.join(", ")}`,
    ).toEqual([]);
  });
});
