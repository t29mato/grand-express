import { describe, expect, it } from "vitest";
import { CountryId } from "../../../../domain/shared-kernel/ids";
import { JsonCountryContentRepository } from "../../../../infrastructure/content/json-country-content-repository";
import { EVENT_ANIMATIONS } from "./index";

/**
 * すべての出来事に専用の絵があることを確かめる。
 *
 * 絵が無くても汎用の絵にフォールバックするので**壊れない**が、
 * その代わり足し忘れに気づけない。出来事を増やしたらここで落ちる。
 */
describe("出来事と絵の対応", () => {
  const repo = new JsonCountryContentRepository();

  it.each(["bolivia", "japan", "india"] as const)("%s: すべての出来事に絵がある", async (countryId) => {
    const pack = await repo.load(CountryId(countryId));
    const withoutArt = pack.moneyEvents.filter((event) => !EVENT_ANIMATIONS[event.id]).map((e) => e.id);
    expect(withoutArt, `${countryId}: 絵が無い出来事`).toEqual([]);
  });
});
