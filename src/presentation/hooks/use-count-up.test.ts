import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { countUpDuration, useCountUp } from "./use-count-up";

/**
 * 時間の決め方は、実際の金額の幅に合わせてある:
 *   クイズ不正解 30〜80 / クイズ正解 100〜220 / 青赤マス 120〜320 / 到着賞金 700〜3150
 */
describe("countUpDuration", () => {
  it("小銭は速く、大金はゆっくり", () => {
    expect(countUpDuration(30)).toBeLessThan(countUpDuration(240));
    expect(countUpDuration(240)).toBeLessThan(countUpDuration(700));
    expect(countUpDuration(700)).toBeLessThan(countUpDuration(3150));
  });

  it("待たされすぎない範囲に収まる", () => {
    expect(countUpDuration(30)).toBeGreaterThanOrEqual(260);
    // いちばん大きな賞金でも1.4秒を超えない。
    expect(countUpDuration(3150)).toBeLessThanOrEqual(1400);
    expect(countUpDuration(999999)).toBeLessThanOrEqual(1400);
  });

  it("増減が同じ大きさなら、増えるときも減るときも同じ時間", () => {
    expect(countUpDuration(-700)).toBe(countUpDuration(700));
  });

  it("変わっていなければ0", () => {
    expect(countUpDuration(0)).toBe(0);
  });
});

/**
 * 時計とフレームを自前で刻む。
 *
 * 実時間で待つ書き方にしたら、並行して他のテストが走っているときに
 * requestAnimationFrame が間引かれて時間切れになった(2回落ちた)。
 * 演出の見た目ではなく「最後に正しい値へ着く」ことを見たいので、時間は自分で進める。
 */
describe("useCountUp", () => {
  let now = 0;
  let frames: FrameRequestCallback[] = [];

  beforeEach(() => {
    now = 0;
    frames = [];
    vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => frames.push(cb));
    vi.stubGlobal("cancelAnimationFrame", () => {});
    vi.spyOn(performance, "now").mockImplementation(() => now);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  /** `ms` だけ時計を進めて、たまっているフレームを1回流す。 */
  function tick(ms: number) {
    now += ms;
    const pending = frames;
    frames = [];
    act(() => {
      for (const frame of pending) frame(now);
    });
  }

  it("最初は転がさず、渡された値をそのまま出す", () => {
    const { result } = renderHook(() => useCountUp(1200));
    expect(result.current.display).toBe(1200);
    expect(result.current.delta).toBe(0);
    expect(result.current.running).toBe(false);
  });

  it("値が変わると転がり始め、最後は新しい値で止まる", () => {
    const { result, rerender } = renderHook((value: number) => useCountUp(value), { initialProps: 1200 });
    rerender(1900);

    expect(result.current.delta).toBe(700);
    expect(result.current.running).toBe(true);
    expect(result.current.display).toBe(1200);

    // 途中では、始点と終点のあいだにいる。
    tick(200);
    expect(result.current.display).toBeGreaterThan(1200);
    expect(result.current.display).toBeLessThan(1900);

    tick(countUpDuration(700));
    expect(result.current.running).toBe(false);
    expect(result.current.display).toBe(1900);
  });

  it("転がっている途中にまた変わっても、最後は最新の値で止まる", () => {
    const { result, rerender } = renderHook((value: number) => useCountUp(value), { initialProps: 1200 });
    rerender(1900);
    tick(120);
    const midway = result.current.display;
    expect(midway).toBeGreaterThan(1200);

    rerender(1500);
    // 前の目標(1900)へ飛ばずに、いま出ている値から続ける。
    expect(result.current.display).toBeCloseTo(midway, 5);

    tick(2000);
    expect(result.current.running).toBe(false);
    expect(result.current.display).toBe(1500);
  });

  it("動きを減らす設定なら、転がさずその場で新しい値になる", () => {
    vi.stubGlobal("matchMedia", () => ({ matches: true }));
    const { result, rerender } = renderHook((value: number) => useCountUp(value), { initialProps: 1200 });
    rerender(1900);

    expect(result.current.display).toBe(1900);
    expect(result.current.running).toBe(false);
    // 増減の額そのものは残す(色と札の向きを決めるのに要る)。
    expect(result.current.delta).toBe(700);
  });
});
