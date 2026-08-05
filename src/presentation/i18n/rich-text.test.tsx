import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { renderRichText } from "./rich-text";

describe("renderRichText", () => {
  it("プレーンテキストはそのまま表示する", () => {
    const { container } = render(<>{renderRichText("hello world")}</>);
    expect(container.textContent).toBe("hello world");
    expect(container.querySelector("b")).toBeNull();
  });

  it("<b>...</b> を <b> 要素に変換する", () => {
    const { container } = render(<>{renderRichText("Race to <b>La Paz</b> now")}</>);
    expect(container.textContent).toBe("Race to La Paz now");
    expect(container.querySelector("b")?.textContent).toBe("La Paz");
  });

  it("<span class='money'>...</span> を money クラスの span に変換する", () => {
    const { container } = render(<>{renderRichText("Starts with <span class='money'>1200</span>.")}</>);
    expect(container.textContent).toBe("Starts with 1200.");
    expect(container.querySelector("span.money")?.textContent).toBe("1200");
  });

  it("複数のタグが混在していても全て変換する", () => {
    const { container } = render(
      <>{renderRichText("Every traveler starts with <span class='money'>1200</span>. Race to <b>La Paz</b>.")}</>,
    );
    expect(container.querySelectorAll("b")).toHaveLength(1);
    expect(container.querySelectorAll("span.money")).toHaveLength(1);
    expect(container.textContent).toBe("Every traveler starts with 1200. Race to La Paz.");
  });
});
