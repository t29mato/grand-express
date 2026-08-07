import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { DiceStage } from "./dice-stage";

/**
 * サイコロ演出は「振った目」と「進むマス数」が食い違って見えないことが要点。
 * 新幹線(2個)・のぞみ(3個)のようなアイテムでは合計が7以上になるため、
 * 1個のサイコロに丸めて 1〜6 で見せると「目より多く進んでいる」ように見えてしまう。
 */
describe("DiceStage", () => {
  beforeEach(() => {
    // 動きを減らす設定で描画し、演出を待たずに結果表示まで進める。
    vi.stubGlobal("matchMedia", (query: string) => ({
      matches: query.includes("prefers-reduced-motion"),
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    }));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("サイコロ1個なら出目をそのまま出す", () => {
    const { container } = render(<DiceStage values={[4]} onDone={() => {}} />);
    expect(container.querySelectorAll(".die3d").length).toBe(1);
    expect(container.querySelector(".die-result")?.textContent).toBe("4");
  });

  it("複数個ならその個数だけ描き、合計を出す", () => {
    const { container } = render(<DiceStage values={[5, 6]} onDone={() => {}} />);
    expect(container.querySelectorAll(".die3d").length).toBe(2);
    // 合計11。1個に丸めて「6」と出すと、11マス進むのと食い違って見える。
    expect(container.querySelector(".die-result")?.textContent).toBe("5 + 6 = 11");
  });

  it("3個振ったときも合計が読める", () => {
    const { container } = render(<DiceStage values={[6, 6, 6]} onDone={() => {}} />);
    expect(container.querySelectorAll(".die3d").length).toBe(3);
    expect(container.querySelector(".die-result")?.textContent).toBe("6 + 6 + 6 = 18");
  });

  it("動きを減らす設定なら、転がる演出を待たずに終了を通知する", async () => {
    vi.useFakeTimers();
    const onDone = vi.fn();
    render(<DiceStage values={[3]} onDone={onDone} />);
    expect(onDone).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(600);
    expect(onDone).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  /**
   * 出目を画面の他の場所(進むマス数・行けるマスのハイライト)に出してよいのは、
   * サイコロが着地してから。転がっている最中に合図を出すと、
   * 演出を見ている間にもう答えが分かってしまう。
   */
  it("着地して出目を見せるのと同時に、公開の合図を出す", () => {
    const onReveal = vi.fn();
    const { container } = render(<DiceStage values={[4]} onReveal={onReveal} onDone={() => {}} />);
    // 動きを減らす設定なので、転がりを飛ばして即座に着地している。
    expect(container.querySelector(".die-result")?.textContent).toBe("4");
    expect(onReveal).toHaveBeenCalledTimes(1);
  });

  it("転がっている間は公開の合図を出さない", () => {
    // 動きを減らさない、通常の演出で描画する。
    vi.stubGlobal("matchMedia", () => ({
      matches: false,
      media: "",
      addEventListener: () => {},
      removeEventListener: () => {},
    }));
    const onReveal = vi.fn();
    const { container } = render(<DiceStage values={[4]} onReveal={onReveal} onDone={() => {}} />);
    expect(onReveal).not.toHaveBeenCalled();
    expect(container.querySelector(".die-result")?.textContent).toBe("");
  });

  it("演出は盤面のクリックを妨げない", () => {
    const { container } = render(<DiceStage values={[2]} onDone={() => {}} />);
    // aria-hidden かつ pointer-events:none(CSS)で、下のマスを選べる状態を保つ。
    expect(container.querySelector(".dice-stage")?.getAttribute("aria-hidden")).toBe("true");
    expect(screen.queryByRole("button")).toBeNull();
  });
});
