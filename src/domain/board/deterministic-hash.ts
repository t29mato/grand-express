/**
 * 決定的な32bit疑似乱数ハッシュ(現行コードの `h32` をそのまま移植)。
 *
 * 盤面の中間マス種別(quiz/blue/red/card)を、同じ国データからは常に同じ配置で
 * 生成するために使う。乱数ではなく「入力に対して決定的」であることが重要
 * (docs/90-migration/00-characterization-samples.md 9章 参照)。
 */
export function h32(seed: number): number {
  let x = seed;
  x = (x ^ 61) ^ (x >>> 16);
  x = x + (x << 3);
  x = x ^ (x >>> 4);
  x = Math.imul(x, 0x27d4eb2d);
  x = x ^ (x >>> 15);
  return x >>> 0;
}
