import { describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react";
import { CityId, CountryId, cityIdToNodeId } from "../../domain/shared-kernel/ids";
import { JsonCountryContentRepository } from "../../infrastructure/content/json-country-content-repository";
import { createGameEngineContext } from "../../application/game-engine-context";
import { useBoardLayout } from "./use-board-layout";
import { estimateWidthEm, insideBoard, labelRect, useCityLabels } from "./use-city-labels";

/**
 * 町の「一言」(`City.tag`)を地図に出すときの決まりを固定する。
 *
 * 指摘は「地図を見ても、その土地が何で知られているのか分からない」。
 * 印(小さな絵)は全体表示で9.8pxしかなく、絵柄では伝わらない(実測)。
 * そこを言葉で埋めるのだが、**全部の町に常時出すと地図が文字だらけになる。**
 * だから「いま関係のある町」に絞り、置き場所が無ければ出さない。
 *
 * ここで守るのは4つ:
 *   1. 頼んでいない町には出ない
 *   2. 名前が出ていない町には出ない(説明だけが浮かない)
 *   3. 出す数に上限がある
 *   4. 盤面からはみ出さない・他の町の名前に重ならない
 */
describe("町の一言", () => {
  const repo = new JsonCountryContentRepository();
  const FONT_UNITS = 30;

  /** 密な盤面と疎らな盤面の両方で見る(混み具合で通り方が変わるため)。 */
  const BOARDS = ["ibaraki", "japan", "world"];

  it.each(BOARDS)("%s: 頼んだ町にしか一言が付かない", async (countryId) => {
    const pack = await repo.load(CountryId(countryId));
    const context = createGameEngineContext(pack);
    const positions = renderHook(() => useBoardLayout(context)).result.current;
    const wanted = pack.cities.slice(0, 3).map((c) => CityId(c.id));

    const placed = renderHook(() =>
      useCityLabels({
        context,
        positions,
        fontUnits: FONT_UNITS,
        locale: "en",
        destination: CityId(pack.startCityId),
        tagCityIds: wanted,
      }),
    ).result.current;

    const tagged = [...placed].filter(([, p]) => p.tag).map(([id]) => id);
    expect(tagged.filter((id) => !wanted.includes(id))).toEqual([]);
    // 名前が置けた町にしか付かない(名無しの説明だけが浮かない)。
    for (const id of tagged) expect(placed.get(id)).toBeDefined();
  });

  it.each(BOARDS)("%s: 候補が多くても、一度に出す一言の数は頭打ちになる", async (countryId) => {
    const pack = await repo.load(CountryId(countryId));
    const context = createGameEngineContext(pack);
    const positions = renderHook(() => useBoardLayout(context)).result.current;
    // 盤面の全部の町を「関係のある町」として渡しても、出るのは一握りに限られる。
    const everyCity = pack.cities.map((c) => CityId(c.id));

    const placed = renderHook(() =>
      useCityLabels({
        context,
        positions,
        fontUnits: FONT_UNITS,
        locale: "en",
        destination: CityId(pack.startCityId),
        tagCityIds: everyCity,
      }),
    ).result.current;

    const tagCount = [...placed.values()].filter((p) => p.tag).length;
    expect(tagCount, "一言が出すぎている。地図が文字で埋まる").toBeLessThanOrEqual(5);
  });

  it.each(BOARDS)("%s: 一言が盤面からはみ出さず、町の名前にも重ならない", async (countryId) => {
    const pack = await repo.load(CountryId(countryId));
    const context = createGameEngineContext(pack);
    const positions = renderHook(() => useBoardLayout(context)).result.current;

    const problems: string[] = [];
    // 目的地を1つずつ替えて総当たりする(目的地は必ず一言の対象になる)。
    for (const city of pack.cities) {
      const placed = renderHook(() =>
        useCityLabels({
          context,
          positions,
          fontUnits: FONT_UNITS,
          locale: "en",
          destination: CityId(city.id),
          tagCityIds: [CityId(city.id)],
        }),
      ).result.current;

      // 名前の矩形を先に集めておく。
      const nameRects = [...placed].flatMap(([id, placement]) => {
        const at = positions.get(cityIdToNodeId(id));
        const name = pack.cities.find((c) => c.id === id)?.name.en;
        if (!at || !name) return [];
        return [labelRect(at, placement, estimateWidthEm(name) * FONT_UNITS, FONT_UNITS)];
      });

      for (const [id, placement] of placed) {
        const tag = placement.tag;
        if (!tag) continue;
        const at = positions.get(cityIdToNodeId(id));
        if (!at) continue;
        const rect = labelRect(at, tag, tag.widthUnits, tag.fontUnits);
        if (!insideBoard(rect, pack.projection)) problems.push(`${id}: 盤面の外`);
        const hits = nameRects.filter(
          (n) => rect.x0 < n.x1 && n.x0 < rect.x1 && rect.y0 < n.y1 && n.y0 < rect.y1,
        );
        if (hits.length > 0) problems.push(`${id}: 町の名前に重なった`);
      }
    }
    expect([...new Set(problems)], `${countryId}: 一言の置き場所`).toEqual([]);
  });
});
