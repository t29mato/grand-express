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

  /**
   * 止まったときの姿勢が、出目によって変わらないこと。
   *
   * 傾きを**面の角度に足し込んで**いたせいで、面2(rotateX 90度)と
   * 面5(-90度)だけが 74〜81度・-99〜-106度になり、**サイコロが横倒しで
   * 止まっていた。**正しい面が斜めを向き、隣の面のほうが大きく見えるため、
   * 出目そのものを読み違える。
   *
   * 傾きは視点側(面の角度より外側)に置くので、**変換の最後の
   * rotateX/rotateY は FACE_ROT そのもの**でなければならない。
   */
  it.each([
    [1, 0, 0],
    [2, 90, 0],
    [3, 0, -90],
    [4, 0, 90],
    [5, -90, 0],
    [6, 0, 180],
  ])("出目%iは、傾きに関係なく面の角度がそのまま出る", (value, faceX, faceY) => {
    const { container } = render(<DiceStage values={[value]} onDone={() => {}} />);
    const transform = (container.querySelector(".die3d") as HTMLElement).style.transform;
    // 末尾の rotateX/rotateY の組が、その面を正面に向ける角度ちょうどであること。
    const pairs = [...transform.matchAll(/rotateX\((-?[\d.]+)deg\) rotateY\((-?[\d.]+)deg\)/g)];
    const last = pairs[pairs.length - 1];
    expect(last, `rotateX/rotateY が見つからない: ${transform}`).toBeTruthy();
    expect(Number(last[1]), `出目${value}のrotateX`).toBe(faceX);
    expect(Number(last[2]), `出目${value}のrotateY`).toBe(faceY);
  });

  it("止まりぎわの傾きは、どの出目でも同じ小ささに収まる", () => {
    // 面の角度に足し込むと、面2と面5だけ極端な角度になる。視点側から当てていれば
    // 傾きの大きさは出目によらない。
    for (let v = 1; v <= 6; v++) {
      const { container } = render(<DiceStage values={[v]} onDone={() => {}} />);
      const transform = (container.querySelector(".die3d") as HTMLElement).style.transform;
      const first = /rotateX\((-?[\d.]+)deg\) rotateY\((-?[\d.]+)deg\)/.exec(transform)!;
      expect(Math.abs(Number(first[1])), `出目${v}の傾きX`).toBeLessThanOrEqual(20);
      expect(Math.abs(Number(first[2])), `出目${v}の傾きY`).toBeLessThanOrEqual(20);
    }
  });

  it("演出は盤面のクリックを妨げない", () => {
    const { container } = render(<DiceStage values={[2]} onDone={() => {}} />);
    // aria-hidden かつ pointer-events:none(CSS)で、下のマスを選べる状態を保つ。
    expect(container.querySelector(".dice-stage")?.getAttribute("aria-hidden")).toBe("true");
    expect(screen.queryByRole("button")).toBeNull();
  });
});
