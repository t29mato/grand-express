import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { TravelLog } from "./side-panel";
import { LocaleProvider } from "../../i18n/locale-context";

describe("TravelLog", () => {
  it("ログエントリを新しい順に表示する", () => {
    render(
      <LocaleProvider>
        <TravelLog
          log={[
            { id: 2, key: "second", args: [], tone: "good" },
            { id: 1, key: "first", args: [], tone: "neutral" },
          ]}
        />
      </LocaleProvider>,
    );
    const items = screen.getAllByText(/first|second/);
    expect(items[0]).toHaveTextContent("second");
    expect(items[1]).toHaveTextContent("first");
  });

  it("ログが空でも見出しは表示される", () => {
    render(
      <LocaleProvider>
        <TravelLog log={[]} />
      </LocaleProvider>,
    );
    expect(screen.getByText("Travel log")).toBeInTheDocument();
  });
});
