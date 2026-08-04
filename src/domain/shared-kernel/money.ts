/**
 * 金額を表す値オブジェクト。
 *
 * 現行コード(legacy/grand-express.html)では現金は生の number で扱われており、
 * 「支払える分だけ支払う」(`Math.min(p.cash, amount)`)というルールがあちこちに
 * 散在していた(doomPayOthers, doomSteal など)。この値オブジェクトに集約する。
 */
export class Money {
  private constructor(private readonly value: number) {}

  static of(amount: number): Money {
    if (!Number.isFinite(amount)) {
      throw new Error(`Money amount must be a finite number, got: ${amount}`);
    }
    return new Money(Math.round(amount));
  }

  static zero(): Money {
    return new Money(0);
  }

  get amount(): number {
    return this.value;
  }

  add(other: Money): Money {
    return Money.of(this.value + other.value);
  }

  subtract(other: Money): Money {
    return Money.of(this.value - other.value);
  }

  multiply(factor: number): Money {
    return Money.of(this.value * factor);
  }

  /**
   * 現行コードの `Math.min(cash, amount)` パターンに相当する、上限付きの支払い。
   * 残高が足りない場合は「払えるだけ払う」。
   */
  payUpTo(requested: Money): { paid: Money; remaining: Money } {
    const paidAmount = Math.min(this.value, requested.amount);
    const paid = Money.of(paidAmount);
    return { paid, remaining: this.subtract(paid) };
  }

  isNegative(): boolean {
    return this.value < 0;
  }

  isGreaterThanOrEqualTo(other: Money): boolean {
    return this.value >= other.value;
  }

  isLessThan(other: Money): boolean {
    return this.value < other.value;
  }

  equals(other: Money): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return String(this.value);
  }
}
