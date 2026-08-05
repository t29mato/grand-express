import { describe, expect, it } from "vitest";
import { formatMoney } from "./money-format";

describe("formatMoney", () => {
  const bolivia = { prefix: "Bs ", suffix: "", multiplier: 1 };
  const japan = { prefix: "¥", suffix: "", multiplier: 100 };

  it("接頭辞を付けて3桁区切りで表示する", () => {
    expect(formatMoney(1200, bolivia)).toBe("Bs 1,200");
  });

  it("倍率を掛けてから表示する(日本円は100倍)", () => {
    expect(formatMoney(1200, japan)).toBe("¥120,000");
  });

  it("接尾辞がある通貨にも対応する", () => {
    expect(formatMoney(50, { prefix: "", suffix: " pts", multiplier: 1 })).toBe("50 pts");
  });

  it("端数は四捨五入する", () => {
    expect(formatMoney(10.4, bolivia)).toBe("Bs 10");
    expect(formatMoney(10.5, bolivia)).toBe("Bs 11");
  });

  it("負の値もそのまま整形する", () => {
    expect(formatMoney(-320, bolivia)).toBe("Bs -320");
  });
});
