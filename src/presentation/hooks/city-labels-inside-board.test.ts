import { describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react";
import { CityId, CountryId, cityIdToNodeId } from "../../domain/shared-kernel/ids";
import { JsonCountryContentRepository } from "../../infrastructure/content/json-country-content-repository";
import { ALL_COUNTRY_IDS } from "../../infrastructure/content/all-country-ids";
import { createGameEngineContext } from "../../application/game-engine-context";
import { useBoardLayout } from "./use-board-layout";
import { estimateWidthEm, insideBoard, labelRect, useCityLabels } from "./use-city-labels";

/**
 * 町の名札が盤面の外へはみ出していないか。
 *
 * 2026-08-12、**カシュガルが「ashgar」、チェシメが「eşme」としか出ていなかった。**
 * 盤面の外に描かれた名札は、そこで切り取られて見えない。
 * **撮って初めて気づいた。それまでのどの検査にも出なかった。**
 *
 * 置き場所を選ぶ側で「はみ出す候補を弾く」ようにしたが、**目的地だけは
 * 例外扱いで素通りしていた**(行き先を見失わないよう、どこにも置けなくても
 * 必ず出す作りのため)。ロストフ・ナ・ドヌが目的地になったとき
 * 「stov-on-Don」と切れているのを、また撮って見つけた。
 *
 * 盤面が19枚に増える。**目で見て回るのは続かないので、ここで測る。**
 */
describe("町の名札が盤面に収まっている", () => {
  const repo = new JsonCountryContentRepository();

  /** 画面上の文字の大きさ。盤面をどれだけ縮めて見せても一定になるよう決まる値。 */
  const FONT_UNITS = 30;

  it.each(ALL_COUNTRY_IDS)("%s: どの町を目的地にしても、はみ出す名札が無い", async (countryId) => {
    const pack = await repo.load(CountryId(countryId));
    const context = createGameEngineContext(pack);
    const positions = renderHook(() => useBoardLayout(context)).result.current;

    const overflowing: string[] = [];
    for (const city of pack.cities) {
      const placed = renderHook(() =>
        useCityLabels({
          context,
          positions,
          fontUnits: FONT_UNITS,
          locale: "en",
          destination: CityId(city.id),
        }),
      ).result.current;

      for (const [labelled, placement] of placed) {
        const at = positions.get(cityIdToNodeId(labelled));
        if (!at) continue;
        const name = pack.cities.find((c) => c.id === labelled)!.name.en;
        const rect = labelRect(at, placement, estimateWidthEm(name) * FONT_UNITS, FONT_UNITS);
        if (!insideBoard(rect, pack.projection)) {
          overflowing.push(`${labelled}(目的地=${city.id})`);
        }
      }
    }
    // 同じ町が何度も挙がるので、名前だけにまとめて読みやすくする。
    const unique = [...new Set(overflowing.map((x) => x.split("(")[0]))];
    expect(unique, `${countryId}: 盤面からはみ出す名札`).toEqual([]);
  });
});
