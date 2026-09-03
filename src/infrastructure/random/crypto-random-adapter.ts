import { Random } from "../../domain/shared-kernel/random";
import { recordDraw } from "./dice-log";

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
    const value = Math.floor(this.nextFloat() * n);
    // 開発用の出目ログ。合図(`?dicelog=1` など)が無いときは何もしない。
    recordDraw(n, value);
    return value;
  }
}
