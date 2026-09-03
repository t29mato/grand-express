import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { LocaleProvider } from "../../i18n/locale-context";
import { LocaleSwitch } from "../hud/locale-switch";
import { BoardCompass } from "./board-compass";

/**
 * 方位磁針は押せるものではないが、盤面の隅に絵だけがあると「押せるのでは」と触られる(F-15)。
 * 名前を持ち、ホバー・長押しで「北が上」と名乗れることを固定する。
 */
describe("BoardCompass", () => {
  it("読み上げに名前があり、名札は4言語で出る", () => {
    render(
      <LocaleProvider>
        <LocaleSwitch />
        <BoardCompass />
      </LocaleProvider>,
    );
    const compass = screen.getByRole("img", { name: "Compass. North is up." });
    expect(compass).toHaveAttribute("data-tip", "North is up");
    fireEvent.click(screen.getByRole("button", { name: "JA" }));
    expect(screen.getByRole("img", { name: "方位磁針。北が上です。" })).toHaveAttribute("data-tip", "北が上");
  });
});
