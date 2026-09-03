import { describe, expect, it } from "vitest";
import { CryptoRandomAdapter } from "./crypto-random-adapter";

/**
 * **サイコロが偏っていないかを1万回で測る。**
 *
 * 実プレイで「最初の3手番が全部2だった」という報告があった。3回続けて同じ目が出る確率は
 * 36分の1で、遊んでいれば普通に起きる並びだが、**「偏っていない」と言い切れる根拠が
 * 手元に無かった**。そこでここで測る。
 *
 * 乱数そのものは `crypto.getRandomValues` なので毎回ちがう。落ちる確率が無視できるだけの
 * 幅を取ってあり(下の χ² の閾値の説明を参照)、たまたま落ちることは実質起きない。
 */

const ROLLS = 10_000;
const SIDES = 6;

/** 出目1回ぶん。`rollDice`(application層)と同じ引き方をする。 */
const rollOnce = (random: CryptoRandomAdapter) => 1 + random.nextInt(SIDES);

function rollMany(count: number): number[] {
  const random = new CryptoRandomAdapter();
  return Array.from({ length: count }, () => rollOnce(random));
}

function countByFace(rolls: readonly number[]): number[] {
  const counts = new Array<number>(SIDES).fill(0);
  for (const roll of rolls) counts[roll - 1] += 1;
  return counts;
}

describe("サイコロの出目の分布(1万回)", () => {
  const rolls = rollMany(ROLLS);
  const counts = countByFace(rolls);
  const expected = ROLLS / SIDES;

  it("1〜6以外は出ない", () => {
    expect(rolls.every((roll) => Number.isInteger(roll) && roll >= 1 && roll <= SIDES)).toBe(true);
    expect(counts.reduce((sum, n) => sum + n, 0)).toBe(ROLLS);
  });

  it("6つの面がどれも出る", () => {
    expect(counts.filter((n) => n === 0)).toEqual([]);
  });

  it("χ²が一様分布の想定に収まる", () => {
    // 自由度5のχ²。一様なら期待値5、**落ちる側に倒れるのは1万回に1回未満**になるよう
    // 31(p≒1e-5)を閾値にする。偏った実装(例: `nextInt` が5を返さない)なら
    // χ²は2000を超えるので、緩めても検出力は落ちない。
    const chiSquare = counts.reduce((sum, n) => sum + (n - expected) ** 2 / expected, 0);
    expect(chiSquare, `面ごとの回数: ${counts.join(", ")}`).toBeLessThan(31);
  });

  it("どの面も期待値の±15%に収まる", () => {
    // 期待値1666.7、標準偏差37.3。±15%(250)は6σ以上あるので、
    // 一様なら落ちないが、1面だけ2倍出るような偏りは必ず捕まえる。
    const outliers = counts.filter((n) => Math.abs(n - expected) > expected * 0.15);
    expect(outliers, `面ごとの回数: ${counts.join(", ")}`).toEqual([]);
  });

  it("平均が3.5前後になる", () => {
    const mean = rolls.reduce((sum, roll) => sum + roll, 0) / ROLLS;
    expect(mean).toBeGreaterThan(3.4);
    expect(mean).toBeLessThan(3.6);
  });

  it("同じ目が3回続くのは36回に1回くらい起きる(報告された並びは異常ではない)", () => {
    // 「最初の3手番が全部2」への答え。1万回振れば3連は期待値278回ある。
    // ここが0なら、逆に**同じ目を避ける仕掛けが紛れている**ことになる。
    let triples = 0;
    for (let i = 2; i < rolls.length; i++) {
      if (rolls[i] === rolls[i - 1] && rolls[i] === rolls[i - 2]) triples += 1;
    }
    expect(triples, `3連の回数: ${triples}(期待値 ${((ROLLS - 2) / 36).toFixed(0)})`).toBeGreaterThan(150);
    expect(triples).toBeLessThan(430);
  });

  it("直前の目が次の目に影響しない", () => {
    // 「2の次はまた2が出やすい」といった偏りが無いか。直前の目ごとに次の目を数え、
    // 6×6の各マスが期待値(1万/36≒278)から大きく外れていないことを見る。
    const pairs = Array.from({ length: SIDES }, () => new Array<number>(SIDES).fill(0));
    for (let i = 1; i < rolls.length; i++) pairs[rolls[i - 1] - 1][rolls[i] - 1] += 1;
    const cellExpected = (ROLLS - 1) / (SIDES * SIDES);
    const chiSquare = pairs
      .flat()
      .reduce((sum, n) => sum + (n - cellExpected) ** 2 / cellExpected, 0);
    // 自由度30。p≒1e-5 のときおよそ 78。
    expect(chiSquare).toBeLessThan(78);
  });

  it("nextFloatは0以上1未満に収まり、上下に寄らない", () => {
    const random = new CryptoRandomAdapter();
    const buckets = new Array<number>(10).fill(0);
    for (let i = 0; i < ROLLS; i++) {
      const value = random.nextFloat();
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
      buckets[Math.floor(value * 10)] += 1;
    }
    const bucketExpected = ROLLS / 10;
    const outliers = buckets.filter((n) => Math.abs(n - bucketExpected) > bucketExpected * 0.2);
    expect(outliers, `10分割の回数: ${buckets.join(", ")}`).toEqual([]);
  });
});
