import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { LocaleProvider } from "../../i18n/locale-context";
import { CountryId } from "../../../domain/shared-kernel/ids";
import { SavedGameSummary } from "../../state/game-store-types";
import { LocaleSwitch } from "../hud/locale-switch";
import { DiscardConfirm, SETTLE_MS } from "./discard-confirm";

const saved: SavedGameSummary = {
  countryId: CountryId("bolivia"),
  month: 1,
  maxMonths: 12,
  players: [
    { name: "タロウ", isCpu: false, cash: 1200 },
    { name: "CPU 1", isCpu: true, cash: 800 },
  ],
};

function renderOverwrite(onConfirm = vi.fn(), onCancel = vi.fn()) {
  render(
    <LocaleProvider>
      <LocaleSwitch />
      <DiscardConfirm saved={saved} intent="overwrite" onConfirm={onConfirm} onCancel={onCancel} />
    </LocaleProvider>,
  );
  return { onConfirm, onCancel };
}

/** 開いた直後の「連打よけ」の間を飛ばす。 */
const settle = () => act(() => void vi.advanceTimersByTime(SETTLE_MS + 10));

/**
 * 「旅に出る」で途中の旅が消える前の確認。**作りは「削除」の確認と同じで、文言だけ違う。**
 * 「削除」側の振る舞い(既定は残す・連打よけ・Escape)は `saved-game-card.test.tsx` が
 * 押さえているので、ここでは文言の切り替えと、確認するまで始めないことを見る。
 */
describe("DiscardConfirm の intent=overwrite", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("「新しい旅を始めますか」と聞き、消えるもの(Year 1・May)を見せる", () => {
    renderOverwrite();
    const dialog = screen.getByRole("alertdialog");
    expect(dialog).toHaveTextContent("Start a new journey?");
    expect(dialog).toHaveTextContent("Bolivia");
    expect(dialog).toHaveTextContent("Year 1 · May");
    expect(dialog).toHaveTextContent("cannot be brought back");
    expect(screen.getByTestId("overwrite-confirm")).toBeInTheDocument();
    // 「削除」の確認と取り違えない(E2Eは `discard-confirm` で削除側を引いている)。
    expect(screen.queryByTestId("discard-confirm")).toBeNull();
  });

  it("開いた直後のフォーカスは「途中の旅を残す」に載り、押すと始めない", () => {
    const { onConfirm, onCancel } = renderOverwrite();
    const keep = screen.getByRole("button", { name: "Keep the saved journey" });
    expect(keep).toHaveFocus();
    fireEvent.click(keep);
    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it("「それでも始める」は、開いた直後の一打は落とし、少し待てば通る", () => {
    const { onConfirm } = renderOverwrite();
    const go = screen.getByRole("button", { name: "Start anyway" });
    fireEvent.click(go);
    expect(onConfirm).not.toHaveBeenCalled();
    settle();
    fireEvent.click(go);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it.each([
    ["ES", "¿Empezar un nuevo viaje?", "Conservar el viaje guardado", "Empezar igualmente"],
    ["FR", "Commencer un nouveau voyage ?", "Garder le voyage enregistré", "Commencer quand même"],
    ["JA", "新しい旅を始めますか?", "途中の旅を残す", "消して始める"],
  ])("%s でも読める", (language, title, keep, go) => {
    renderOverwrite();
    fireEvent.click(screen.getByRole("button", { name: language }));
    expect(screen.getByRole("alertdialog")).toHaveTextContent(title);
    expect(screen.getByRole("button", { name: keep })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: go })).toBeInTheDocument();
  });
});
