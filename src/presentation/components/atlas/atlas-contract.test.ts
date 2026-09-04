import { describe, expect, it } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { ATLAS_MARK_VIEW_BOX as CONTRACT_VIEW_BOX, MARK_SIZE } from "./atlas-source";
import { ATLAS_MARK_VIEW_BOX as MODEL_VIEW_BOX, worldLabels } from "../../atlas/atlas-model";
import { liveAtlasSource } from "./atlas-live-source";
import { MIN_SPAN, minSpanForBoard } from "./atlas-projection";
import { useAtlasCamera } from "./use-atlas-camera";

/**
 * **注文書(`atlas-source.ts`)と実物(`atlas-model.ts`)のつなぎ目。**
 *
 * 型の食い違いは `atlas-live-source.ts` が受け止めてくれるが、
 * **値の食い違い(印の座標系など)と、実物のデータの形は型では捕まらない。**
 * ここで数と中身を見る。
 */
describe("地図帳の契約", () => {
  it("印の座標系は、注文書と実物で同じ", () => {
    expect(CONTRACT_VIEW_BOX).toBe(MODEL_VIEW_BOX);
    expect(CONTRACT_VIEW_BOX).toBe(`0 0 ${MARK_SIZE} ${MARK_SIZE}`);
  });

  it("実物の地名は、海か陸かを必ず持っている", () => {
    const labels = worldLabels();
    expect(labels.length).toBeGreaterThan(0);
    expect(labels.every((label) => typeof label.isWater === "boolean")).toBe(true);
    // 海の名前と陸の地形帯が両方入っている(片方だけなら振り分けが壊れている)。
    expect(labels.some((label) => label.isWater)).toBe(true);
    expect(labels.some((label) => !label.isWater)).toBe(true);
  });

  it("実物は、注文書が求める道具をぜんぶ持っている", () => {
    for (const name of [
      "atlasBoards",
      "worldLand",
      "worldColors",
      "worldLabels",
      "boardsAt",
      "coverageGaps",
      "loadAtlasCities",
      "loadBoardLand",
    ] as const) {
      expect(typeof liveAtlasSource[name]).toBe("function");
    }
  });
});

/**
 * **寄りの限界はカメラの中で効く。**投影側の関数が正しくても、
 * カメラが見ていなければ 0.25度まで寄れてしまう。
 */
describe("カメラの寄りの限界", () => {
  it("知らせた限界より内側へは寄らない", () => {
    const { result } = renderHook(() => useAtlasCamera());
    const japan = { bounds: { lon0: 127, lon1: 146.5, lat0: 45.8, lat1: 25.6 }, cityCount: 74 };
    act(() => result.current.setMinSpan(minSpanForBoard(japan)));
    for (let i = 0; i < 40; i++) act(() => result.current.zoomAt(0.7, 0.5, 0.5));
    expect(result.current.view.span).toBeCloseTo(minSpanForBoard(japan), 5);
  });

  it("限界を上げても、いま寄っている眺めを勝手に引き戻さない", () => {
    const { result } = renderHook(() => useAtlasCamera());
    act(() => result.current.setMinSpan(MIN_SPAN));
    for (let i = 0; i < 40; i++) act(() => result.current.zoomAt(0.7, 0.5, 0.5));
    expect(result.current.view.span).toBeCloseTo(MIN_SPAN, 5);

    // 県の盤面から親の国へ流れてきた、という場面。
    act(() => result.current.setMinSpan(2));
    act(() => result.current.panByPixels(10, 10));
    expect(result.current.view.span).toBeCloseTo(MIN_SPAN, 5);
    // そこからさらに寄ることはできない。
    act(() => result.current.zoomAt(0.7, 0.5, 0.5));
    expect(result.current.view.span).toBeCloseTo(MIN_SPAN, 5);
    // 引くのはいつでもできる。
    act(() => result.current.zoomAt(1.6, 0.5, 0.5));
    expect(result.current.view.span).toBeGreaterThan(MIN_SPAN);
  });
});
