import { describe, expect, it } from "vitest";
import { CountryId } from "../../domain/shared-kernel/ids";
import { JsonCountryContentRepository } from "./json-country-content-repository";
import { ALL_COUNTRY_IDS } from "./all-country-ids";

/**
 * **厄災のidは、盤面をまたいで重複してはいけない。**
 *
 * 効果は `DOOM_EFFECT_ID_BY_LEGACY_ID[doom.id]` で引かれる
 * (`country-content-mapper.ts`)。**盤面の名前は鍵に入っていない。**
 * だから2つの盤面が同じidを使うと、**あとから書いたほうの効果に
 * 両方が上書きされる。**
 *
 * 2026-08-19、エジプト盤が `railbuckle`(猛暑で反った線路の修理費 → `fine`)
 * を足したとき、アジア盤が同じidを別の効果
 * (徐行と積み荷の傷み → `percentLoss`)で既に使っていた。
 *
 * このときは対応表がオブジェクトリテラルだったので **TypeScript が
 * 重複プロパティとして弾いた**(TS1117)。**運が良かっただけである。**
 * 片方の行を足し忘れていれば、型検査は通り、
 * **エジプトの厄災がアジアの効果で発動する**状態のまま出荷されていた。
 * 遊んでいても気づけない(「修理費を取られるはずが、所持金の割合を失う」)。
 *
 * 絵のほうは `"egypt-railbuckle"` のように盤面名が付いているので衝突しない。
 * **効果の対応表だけが素の id を使っている。**そこを見る。
 */
describe("厄災のidの一意性", () => {
  const repo = new JsonCountryContentRepository();

  /**
   * **全盤面を読む。**盤面が35枚・合計24MBになり、`npm run check` が
   * 90ファイルを並べて走らせる中では既定の60秒に収まらない回が出た。
   * 単体なら数秒で終わるので、遅いのは読み込みではなく順番待ちである。
   */
  it("盤面をまたいで同じ厄災idを使っていない", async () => {
    const owners = new Map<string, string[]>();
    for (const id of ALL_COUNTRY_IDS) {
      const pack = await repo.load(CountryId(id));
      for (const doom of pack.doomFlavors) {
        owners.set(doom.id, [...(owners.get(doom.id) ?? []), id]);
      }
    }
    const shared = [...owners.entries()]
      .filter(([, boards]) => boards.length > 1)
      .map(([doomId, boards]) => `${doomId}: ${boards.join(" / ")}`);

    expect(
      shared,
      "同じidの厄災を2つの盤面が使っています。効果はidだけで引かれるので、" +
        "片方の効果がもう片方を上書きします。**あとから足したほうの名前を変えてください。**",
    ).toEqual([]);
  }, 180_000);
});
