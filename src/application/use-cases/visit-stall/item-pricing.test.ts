import { describe, expect, it } from "vitest";
import { CountryId } from "../../../domain/shared-kernel/ids";
import { JsonCountryContentRepository } from "../../../infrastructure/content/json-country-content-repository";
import { isSoldAtStall, itemPrice } from "../../../domain/item/item-pricing";
import { quizReward, MAX_QUIZ_DIFFICULTY } from "../../../domain/quiz/quiz-question";
import { ALL_COUNTRY_IDS } from "../../../infrastructure/content/all-country-ids";

/**
 * 屋台に「買うだけで確実に得をするアイテム」を並べない。選択が選択でなくなるため。
 *
 * 移動アイテムのうち1つ(気球・飛行機など)は、**進む向きが選べない**。
 * 遠くまで行けるが目的地から遠ざかることもあるので、
 * 距離も向きも自分で決められるアイテムより安くなければ、誰も選ばない。
 */
describe("アイテムの値付け", () => {
  const repo = new JsonCountryContentRepository();
  const countries = ALL_COUNTRY_IDS;

  it.each(countries)("%s: 向きの選べない移動アイテムは、思い通りに動けるアイテムより安い", async (countryId) => {
    const pack = await repo.load(CountryId(countryId));
    const carried = pack.items.find((i) => i.effect.type === "carried-far");
    expect(carried, `${countryId}: 向きの選べない移動アイテムが無い`).toBeDefined();

    // 距離か向きを自分で決められる移動アイテム(サイコロを選ぶ/複数個振る)。
    const controllable = pack.items.filter(
      (i) => i.effect.type === "choose-exact-dice" || i.effect.type === "roll-fixed-dice",
    );
    expect(controllable.length, `${countryId}: 比べる相手の移動アイテムが無い`).toBeGreaterThan(0);

    for (const item of controllable) {
      expect(
        itemPrice(carried!).amount,
        `${countryId}: ${carried!.key} が ${item.key} より安くない`,
      ).toBeLessThan(itemPrice(item).amount);
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
