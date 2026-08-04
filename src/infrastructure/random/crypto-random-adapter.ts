import { Random } from "../../domain/shared-kernel/random";

/**
 * 本番用の乱数アダプタ。`crypto.getRandomValues` が使えればそれを、
 * 使えない環境(古いブラウザ等)では `Math.random()` にフォールバックする。
 */
export class CryptoRandomAdapter implements Random {
  nextFloat(): number {
    if (typeof crypto !== "undefined" && crypto.getRandomValues) {
      const buffer = new Uint32Array(1);
      crypto.getRandomValues(buffer);
      return buffer[0] / (0xffffffff + 1);
    }
    return Math.random();
  }

  nextInt(n: number): number {
    return Math.floor(this.nextFloat() * n);
  }
}
