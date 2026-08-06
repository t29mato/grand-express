import { describe, expect, it } from "vitest";
import { CountryId } from "../../../domain/shared-kernel/ids";
import { Money } from "../../../domain/shared-kernel/money";
import { JsonCountryContentRepository } from "../../../infrastructure/content/json-country-content-repository";
import { isSoldAtStall, itemPrice } from "../../../domain/item/item-pricing";
import { quizReward, MAX_QUIZ_DIFFICULTY } from "../../../domain/quiz/quiz-question";

/**
 * 屋台に「買うだけで確実に得をするアイテム」を並べない。
 *
 * 選択が選択でなくなるため。特に目的地へ飛ぶアイテムは、賞金が
 * `700 + 70×月` で育つので、固定価格だと終盤ほど確定利益が大きくなる。
 */
describe("アイテムの値付け", () => {
  const repo = new JsonCountryContentRepository();
  const countries = ["bolivia", "japan", "india"] as const;

  it.each(countries)("%s: 目的地へ飛ぶアイテムは、いつ買っても賞金より高い", async (countryId) => {
    const pack = await repo.load(CountryId(countryId));
    const teleport = pack.items.find((i) => i.effect.type === "teleport-to-destination");
    expect(teleport, `${countryId}: 瞬間移動アイテムが無い`).toBeDefined();

    // 3年ぶん(36ヶ月)のどの時点でも、賞金目当てに買うと損になること。
    for (let month = 0; month < 36; month++) {
      const prize = Money.of(700 + 70 * month);
      expect(
        itemPrice(teleport!, prize).amount,
        `${countryId}: ${month}ヶ月目に買うと確定で儲かってしまう`,
      ).toBeGreaterThan(prize.amount);
    }
  });

  it.each(countries)("%s: 現金がそのまま手に入るアイテムは屋台に並ばない", async (countryId) => {
    const pack = await repo.load(CountryId(countryId));
    const onSale = pack.items.filter(isSoldAtStall);
    expect(onSale.some((i) => i.effect.type === "gain-cash")).toBe(false);
    // 屋台が空になってしまわないこと。
    expect(onSale.length).toBeGreaterThanOrEqual(6);
  });

  it.each(countries)("%s: クイズを助けるアイテムは、その効果の上限より安い", async (countryId) => {
    // 「外したときの損失を肩代わりする」だけなので、価値の上限は最大の損失額。
    const pack = await repo.load(CountryId(countryId));
    const ceiling = quizReward(MAX_QUIZ_DIFFICULTY).loseAmount;
    for (const item of pack.items.filter((i) => i.effect.type === "quiz-save")) {
      expect(item.price, `${countryId}: ${item.key} が効果の上限(${ceiling})より高い`).toBeLessThan(
        ceiling,
      );
    }
  });
});
