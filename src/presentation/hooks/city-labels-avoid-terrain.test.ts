import { describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react";
import { CityId, CountryId, cityIdToNodeId } from "../../domain/shared-kernel/ids";
import { JsonCountryContentRepository } from "../../infrastructure/content/json-country-content-repository";
import { createGameEngineContext } from "../../application/game-engine-context";
import { useBoardLayout } from "./use-board-layout";
import { estimateWidthEm, labelRect, terrainLabelRects, useCityLabels } from "./use-city-labels";

/**
 * 町の名札が、地図の書き込み(山脈や海の名前)に重ならないこと。
 *
 * 2026-09-02 の実プレイで、**「高山」の名札が「日本アルプス」の文字に重なって
 * どちらも読めなかった。** 名札の置き場所はマーカーと他の名札しか避けていなかった。
 * 日本の盤面で、どの町を目的地にしても重なりが無いことを測る
 * (目的地の名札は他と重なってでも出す作りなので、目的地だけは除く)。
 */
describe("町の名札が地図の書き込みを避ける", () => {
  const FONT_UNITS = 30;

  it("japan: 名札が地形の地名と重ならない(日本語)", async () => {
    const pack = await new JsonCountryContentRepository().load(CountryId("japan"));
    const context = createGameEngineContext(pack);
    const positions = renderHook(() => useBoardLayout(context)).result.current;
    const terrain = terrainLabelRects(context, "ja");
    expect(terrain.length).toBeGreaterThan(0);

    const overlapping: string[] = [];
    for (const city of pack.cities) {
      const placed = renderHook(() =>
        useCityLabels({ context, positions, fontUnits: FONT_UNITS, locale: "ja", destination: CityId(city.id) }),
      ).result.current;
      for (const [labelled, placement] of placed) {
        if (labelled === city.id) continue;
        const at = positions.get(cityIdToNodeId(labelled))!;
        const name = pack.cities.find((c) => c.id === labelled)!.name.ja;
        const rect = labelRect(at, placement, estimateWidthEm(name) * FONT_UNITS, FONT_UNITS);
        const hit = terrain.some((o) => rect.x0 < o.x1 && o.x0 < rect.x1 && rect.y0 < o.y1 && o.y0 < rect.y1);
        if (hit) overlapping.push(labelled);
      }
    }
    expect([...new Set(overlapping)]).toEqual([]);
  });
});
