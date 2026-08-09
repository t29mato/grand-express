import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { COUNTRY_INDEX } from "../../../../infrastructure/content/country-index";
import { DOOM_ANIMATIONS, doomAnimationFor } from "./index";

/**
 * 盤面と厄災の絵の結線を機械的に確かめる。
 *
 * **絵が無くても遊べてしまう。** `doomAnimationFor` は無ければ `undefined` を返し、
 * `doom-modal.tsx` はそれを黙って描かない。例外も警告も出ない。
 * 実際に**茨城だけ7件ぶんの絵が1枚も無いまま出荷され**、遊んだ人から
 * 「厄災の演出が見えない」と報告が来た(他の5盤面は7件ずつ揃っていた)。
 *
 * 同じ形——「中身は書いてあるのに繋いでいない」——を、この作品では
 * BGM・都市の背景・時刻表・厄災の移動でも踏んでいる。
 * **注意して防ぐのは何度も失敗しているので、検査にする。**
 *
 * ここが赤くなる条件:
 *
 *  1. 盤面を足して、その盤面の厄災の絵を作らなかった
 *  2. 災難を1つ足して、その絵を作らなかった
 *  3. 絵のファイル名(= 登録の鍵)と `doom` の id が食い違った
 *  4. どの盤面にも属さない絵が登録簿に残っている(id を変えたときの消し忘れ)
 */
const CONTENT_DIR = join(process.cwd(), "src/infrastructure/content");
const COUNTRY_IDS = COUNTRY_INDEX.map((entry) => entry.id);

/** その盤面の災難の id 一覧(`<盤面>.content.json` の `doom`)。 */
function doomIdsOf(countryId: string): string[] {
  const raw = readFileSync(join(CONTENT_DIR, `${countryId}.content.json`), "utf8");
  const parsed = JSON.parse(raw) as { doom: Record<string, unknown> | { id: string }[] };
  return Array.isArray(parsed.doom) ? parsed.doom.map((d) => d.id) : Object.keys(parsed.doom);
}

describe("盤面と厄災の絵の結線", () => {
  it("盤面が1つ以上ある(索引そのものが壊れていないことの確認)", () => {
    expect(COUNTRY_IDS.length).toBeGreaterThan(0);
  });

  /**
   * **これが本命。** 選べる盤面の、起こりうる災難には、必ず絵があること。
   * 茨城で落ちたのはここ。
   */
  it.each(COUNTRY_IDS)("%s: すべての災難に絵が登録されている", (countryId) => {
    const missing = doomIdsOf(countryId).filter((doomId) => !doomAnimationFor(countryId, doomId));
    expect(
      missing,
      `${countryId} の災難に絵がありません: ${missing.join(", ")}\n` +
        "src/presentation/components/events/dooms/ に " +
        missing.map((id) => `${countryId}-${id}.tsx`).join(", ") +
        " を作り、登録簿に足してください",
    ).toEqual([]);
  });

  it.each(COUNTRY_IDS)("%s: 災難が1件以上ある(コンテンツ側が空でないことの確認)", (countryId) => {
    expect(doomIdsOf(countryId).length).toBeGreaterThan(0);
  });

  /**
   * 逆向きの検査。id を変えたのに古い絵を消し忘れると、
   * 誰も呼ばない絵が残り続ける(次に読む人が「使われている」と誤解する)。
   */
  it("どの盤面にも属さない絵が登録簿に残っていない", () => {
    const expected = new Set(
      COUNTRY_IDS.flatMap((countryId) => doomIdsOf(countryId).map((doomId) => `${countryId}-${doomId}`)),
    );
    const orphans = Object.keys(DOOM_ANIMATIONS).filter((key) => !expected.has(key));
    expect(orphans, `どの災難にも対応しない絵が登録されています: ${orphans.join(", ")}`).toEqual([]);
  });
});
