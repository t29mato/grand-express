import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BoardLegend } from "./board-legend";
import { LocaleProvider } from "../../i18n/locale-context";

const BOLIVIANO = { prefix: "Bs ", suffix: "", multiplier: 1 };

function renderLegend() {
  render(
    <LocaleProvider>
      <BoardLegend currency={BOLIVIANO} />
    </LocaleProvider>,
  );
}

describe("BoardLegend", () => {
  // 以前は「Blue square」「Red square」と色を言い換えているだけで、
  // 止まると何が起きるのかはゲーム中のどこにも書いていなかった。
  it("青マス・赤マスは色の名前ではなく起きることを説明する", () => {
    renderLegend();
    expect(screen.getByText(/Blue · good news, you gain/)).toBeInTheDocument();
    expect(screen.getByText(/Red · trouble, you pay/)).toBeInTheDocument();
  });

  it("クイズマスは何のマスかと、正解したときの増額を示す", () => {
    renderLegend();
    expect(screen.getByText(/Quiz · \+Bs 100〜Bs 370 if right/)).toBeInTheDocument();
  });

  // 狭い画面では凡例をたたむため、開くボタンが要る(CSSで出し分ける)。
  it("たたみボタンで開閉できる", () => {
    renderLegend();
    const toggle = screen.getByRole("button", { name: /What the squares do/ });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });
});
