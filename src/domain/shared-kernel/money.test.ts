import { describe, expect, it } from "vitest";
import { Money } from "./money";

describe("Money", () => {
  it("四則演算の基本(加算・減算・倍率)を行える", () => {
    const a = Money.of(1000);
    const b = Money.of(300);
    expect(a.add(b).amount).toBe(1300);
    expect(a.subtract(b).amount).toBe(700);
    expect(a.multiply(2).amount).toBe(2000);
  });

  it("小数は四捨五入される", () => {
    expect(Money.of(19.5).amount).toBe(20);
    expect(Money.of(19.4).amount).toBe(19);
  });

  it("残高不足時は payUpTo で払える分だけ支払う(doomPayOthers/doomSteal相当)", () => {
    const cash = Money.of(150);
    const { paid, remaining } = cash.payUpTo(Money.of(500));
    expect(paid.amount).toBe(150);
    expect(remaining.amount).toBe(0);
  });

  it("残高が十分な場合は要求額をそのまま支払う", () => {
    const cash = Money.of(1000);
    const { paid, remaining } = cash.payUpTo(Money.of(300));
    expect(paid.amount).toBe(300);
    expect(remaining.amount).toBe(700);
  });

  it("比較・等価判定ができる", () => {
    expect(Money.of(100).isLessThan(Money.of(200))).toBe(true);
    expect(Money.of(200).isGreaterThanOrEqualTo(Money.of(200))).toBe(true);
    expect(Money.of(50).equals(Money.of(50))).toBe(true);
    expect(Money.of(-1).isNegative()).toBe(true);
  });

  it("NaN/Infinity は拒否する", () => {
    expect(() => Money.of(Number.NaN)).toThrow();
    expect(() => Money.of(Number.POSITIVE_INFINITY)).toThrow();
  });
});
