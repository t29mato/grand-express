import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NodeId } from "../../../domain/shared-kernel/ids";
import { useGameStore } from "../../state/game-store";
import { DiceStage, STOW_MS } from "./dice-stage";

/**
 * 通常の(動きを減らさない)演出で、着地と終了の合図が本当に届くか。
 *
 * 2026-09-02 の実プレイで、**出目が確定したあともサイコロが盤面の中央に残り続けた**
 * (9手番で消えたのは、ウィンドウをリサイズした直後の1回だけ)。
 * `dice-stage.test.tsx` は動きを減らす設定でしか終了を確かめておらず、
 * requestAnimationFrame で回る本来の経路は一度も試験されていなかった。
 *
 * 計測して分かったこと: ループ自体は終端まで走る(jsdom でも実機の Chromium でも
 * 終了の合図は届いた)。ただし**着地も終了も rAF が配達されることに依存していて**、
 * タブが隠れている・窓が遮られているあいだ rAF は止まる。リサイズで消えたのは、
 * 窓が前面に出て rAF が再開したから。ここでは rAF が来る場合と来ない場合の両方を回す。
 */
describe("DiceStage の通常演出の寿命", () => {
  const stubMotion = (reduce: boolean) =>
    vi.stubGlobal("matchMedia", (query: string) => ({
      matches: reduce && query.includes("prefers-reduced-motion"),
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    }));

  beforeEach(() => {
    stubMotion(false);
    vi.useFakeTimers({
      toFake: ["setTimeout", "clearTimeout", "requestAnimationFrame", "cancelAnimationFrame", "performance"],
    });
    // 行き先を選んでいる場面ではない(CPUの手番などと同じ扱い)。
    useGameStore.setState({ ui: { kind: "cpu-turn", playerName: "CPU" }, walk: null });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("転がり終わったら、着地の合図 → 収納 → 終了の合図 と順に届く", () => {
    const onReveal = vi.fn();
    const onDone = vi.fn();
    const { container } = render(<DiceStage values={[5]} onReveal={onReveal} onDone={onDone} />);

    // 転がっている最中(1.6秒の途中)は、どちらもまだ来ない。
    act(() => vi.advanceTimersByTime(800));
    expect(onReveal).not.toHaveBeenCalled();
    expect(onDone).not.toHaveBeenCalled();

    // 着地(1.6秒×0.84≒1.34秒)を過ぎると出目が見える。
    act(() => vi.advanceTimersByTime(800));
    expect(onReveal).toHaveBeenCalledTimes(1);

    // 余韻(0.7秒)のあとで収納が始まる。盆がバッジへ向かって縮む。
    act(() => vi.advanceTimersByTime(750));
    expect(container.querySelector(".dice-tray")?.className).toBe("dice-tray stowing");
    expect(onDone).not.toHaveBeenCalled();

    // 収納が終わったら終了。ここが来ないと、サイコロが盤面を覆い続ける。
    act(() => vi.advanceTimersByTime(STOW_MS + 20));
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  it("rAF が一度も来なくても(隠れたタブ)、番人が着地と終了を起こす", () => {
    // 隠れたタブの Chrome と同じ: 予約はできるが、フレームは永遠に来ない。
    vi.stubGlobal("requestAnimationFrame", () => 1);
    vi.stubGlobal("cancelAnimationFrame", () => {});
    const onReveal = vi.fn();
    const onDone = vi.fn();
    render(<DiceStage values={[3]} onReveal={onReveal} onDone={onDone} />);

    act(() => vi.advanceTimersByTime(1600));
    expect(onReveal).not.toHaveBeenCalled();

    // 転がりの尺 + 猶予 で番人が着地を代行する。
    act(() => vi.advanceTimersByTime(500));
    expect(onReveal).toHaveBeenCalledTimes(1);

    act(() => vi.advanceTimersByTime(700 + STOW_MS + 50));
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  it("行き先を選んでいるあいだは消さず、選び終えた(駒が歩き出した)ら収納する", () => {
    const onDone = vi.fn();
    const onReveal = () => {
      // 着地の合図で、ストアは「行き先を選んでいる」に移る(game-store の revealPendingRoll と同じ)。
      useGameStore.setState({ ui: { kind: "choosing-square", steps: 4, reachable: new Map() } });
    };
    const { container } = render(<DiceStage values={[4]} onReveal={onReveal} onDone={onDone} />);

    act(() => vi.advanceTimersByTime(1700));
    // 退避はするが、消えない。
    act(() => vi.advanceTimersByTime(400));
    expect(container.querySelector(".dice-tray")?.className).toBe("dice-tray aside");
    act(() => vi.advanceTimersByTime(10000));
    expect(onDone).not.toHaveBeenCalled();

    // 選び終えて駒が歩き出す。
    act(() => {
      useGameStore.setState({ walk: { playerId: "p1" as never, nodeId: NodeId("tokyo"), emoji: null } });
    });
    expect(container.querySelector(".dice-tray")?.className).toBe("dice-tray stowing");
    act(() => vi.advanceTimersByTime(STOW_MS + 20));
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  it("動きを減らす設定でも、選び終えたらすぐ終了する(演出は省く)", () => {
    stubMotion(true);
    const onDone = vi.fn();
    useGameStore.setState({ ui: { kind: "choosing-square", steps: 2, reachable: new Map() }, walk: null });
    const { container } = render(<DiceStage values={[2]} onDone={onDone} />);
    act(() => vi.advanceTimersByTime(3000));
    expect(onDone).not.toHaveBeenCalled();
    // 退避もしない(動かさない)。
    expect(container.querySelector(".dice-tray")?.className).toBe("dice-tray");

    act(() => {
      useGameStore.setState({ ui: { kind: "idle" } });
    });
    expect(onDone).toHaveBeenCalledTimes(1);
  });
});
