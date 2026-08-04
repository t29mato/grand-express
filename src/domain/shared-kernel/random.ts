/**
 * 乱数のポート。Domain/Applicationは実装(crypto/Math.random/固定シード)を知らない。
 * テストでは決定的なフェイク実装に差し替える(docs/20-testing/01-testing-strategy-tdd.md)。
 */
export interface Random {
  /** 0以上n未満の整数(現行コードの `rnd(n)=Math.floor(Math.random()*n)`)。 */
  nextInt(n: number): number;
  /** 0以上1未満の浮動小数(現行コードの `Math.random()` 直接利用箇所用)。 */
  nextFloat(): number;
}
