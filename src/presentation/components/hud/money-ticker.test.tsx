import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { CurrencyFormat } from "../../../domain/country/country-content-pack";
import { BIG_CHANGE, MoneyTicker } from "./money-ticker";

/** ボリビアと同じ形(内部値100 → Bs 10,000)。 */
const CURRENCY: CurrencyFormat = { prefix: "Bs ", suffix: "", multiplier: 100 };

function ticker(container: HTMLElement) {
  return container.querySelector(".money-ticker") as HTMLElement;
}

describe("MoneyTicker", () => {
  it("読み上げには、転がっている途中ではなく確定した金額を渡す", () => {
    const { rerender, container } = render(<MoneyTicker amount={1200} currency={CURRENCY} />);
    rerender(<MoneyTicker amount={1200 + BIG_CHANGE} currency={CURRENCY} />);
    // 見えている数字は転がっている途中でも、読み上げ用は最終値。
    expect(container.querySelector(".sr-only")?.textContent).toBe("Bs 170,000");
  });

  it("増えた額が符号付きで出る", () => {
    const { rerender, container } = render(<MoneyTicker amount={1200} currency={CURRENCY} />);
    rerender(<MoneyTicker amount={1460} currency={CURRENCY} />);
    const delta = container.querySelector(".money-delta");
    expect(delta?.textContent).toBe("+Bs 26,000");
    expect(delta?.className).toContain("up");
  });

  it("減った額はマイナス符号で出る", () => {
    const { rerender, container } = render(<MoneyTicker amount={1200} currency={CURRENCY} />);
    rerender(<MoneyTicker amount={1170} currency={CURRENCY} />);
    const delta = container.querySelector(".money-delta");
    expect(delta?.textContent).toBe("−Bs 3,000");
    expect(delta?.className).toContain("down");
  });

  it("日常の増減ではコインは弾けない", () => {
    // 青赤マスの最大が320。ここは演出を足さない側に入る。
    const { rerender, container } = render(<MoneyTicker amount={1200} currency={CURRENCY} emphatic />);
    rerender(<MoneyTicker amount={1200 + 320} currency={CURRENCY} emphatic />);
    expect(container.querySelector(".coin-burst")).toBeNull();
    expect(container.querySelector(".money-delta")?.className).not.toContain("big");
  });

  it("大きく増えたときだけコインが弾ける", () => {
    const { rerender, container } = render(<MoneyTicker amount={1200} currency={CURRENCY} emphatic />);
    rerender(<MoneyTicker amount={1200 + 700} currency={CURRENCY} emphatic />);
    expect(container.querySelectorAll(".coin-burst .coin").length).toBeGreaterThan(0);
  });

  it("他人(CPU)の大きな増減では、コインを出さない", () => {
    const { rerender, container } = render(<MoneyTicker amount={1200} currency={CURRENCY} />);
    rerender(<MoneyTicker amount={1200 + 700} currency={CURRENCY} />);
    expect(container.querySelector(".coin-burst")).toBeNull();
    // 数字と額そのものは出る(誰がいくら動いたかは分かる)。
    expect(container.querySelector(".money-delta")?.textContent).toBe("+Bs 70,000");
  });

  it("大きく減ったときは揺れる", () => {
    const { rerender, container } = render(<MoneyTicker amount={3000} currency={CURRENCY} emphatic />);
    rerender(<MoneyTicker amount={3000 - 900} currency={CURRENCY} emphatic />);
    expect(ticker(container).className).toContain("shake");
  });

  it("最初の描画では動かない(所持金が0から増えたように見せない)", () => {
    const { container } = render(<MoneyTicker amount={1200} currency={CURRENCY} emphatic />);
    expect(screen.getByText("Bs 120,000", { selector: "[aria-hidden='true']" })).toBeInTheDocument();
    expect(container.querySelector(".money-delta")).toBeNull();
    expect(container.querySelector(".coin-burst")).toBeNull();
  });
});
