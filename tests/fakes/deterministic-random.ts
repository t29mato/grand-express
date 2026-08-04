import { Random } from "../../src/domain/shared-kernel/random";

/** テスト用の決定的な乱数フェイク。整数列/浮動小数列を順番に返す。 */
export class DeterministicRandom implements Random {
  private intIndex = 0;
  private floatIndex = 0;

  constructor(
    private readonly ints: readonly number[] = [0],
    private readonly floats: readonly number[] = [0],
  ) {}

  nextInt(n: number): number {
    const raw = this.ints[this.intIndex % this.ints.length];
    this.intIndex++;
    return raw % Math.max(1, n);
  }

  nextFloat(): number {
    const value = this.floats[this.floatIndex % this.floats.length];
    this.floatIndex++;
    return value;
  }
}

/** 常に同じ値を返すだけの単純なフェイク。 */
export class FixedRandom implements Random {
  constructor(private readonly intValue = 0, private readonly floatValue = 0) {}
  nextInt(): number {
    return this.intValue;
  }
  nextFloat(): number {
    return this.floatValue;
  }
}
