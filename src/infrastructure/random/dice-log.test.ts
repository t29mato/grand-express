import { afterEach, describe, expect, it } from "vitest";
import { CryptoRandomAdapter } from "./crypto-random-adapter";
import { diceLogForTest } from "./dice-log";

/**
 * 出目ログは**開発用**なので、合図を入れたときだけ記録し、
 * 普通に遊んでいるときは何も残さない(旅の記録にも混ざらない)。
 */
describe("出目ログ", () => {
  afterEach(() => {
    diceLogForTest.reset();
  });

  it("合図が無ければ何も残さない", () => {
    diceLogForTest.disable();
    const random = new CryptoRandomAdapter();
    for (let i = 0; i < 20; i++) random.nextInt(6);
    expect(diceLogForTest.entries()).toEqual([]);
  });

  it("合図を入れると、引いた面数と結果が順に残る", () => {
    diceLogForTest.enable();
    const random = new CryptoRandomAdapter();
    const rolled = Array.from({ length: 30 }, () => 1 + random.nextInt(6));

    expect(diceLogForTest.faces()).toEqual(rolled);
    expect(diceLogForTest.entries()).toHaveLength(30);
    expect(diceLogForTest.entries().every((entry) => entry.sides === 6)).toBe(true);
    expect(diceLogForTest.text()).toBe(rolled.join(","));
  });

  it("面ごとの回数が数えられる", () => {
    diceLogForTest.enable();
    const random = new CryptoRandomAdapter();
    const rolled = Array.from({ length: 60 }, () => 1 + random.nextInt(6));

    const histogram = diceLogForTest.histogram();
    expect(Object.keys(histogram).map(Number).sort((a, b) => a - b)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(Object.values(histogram).reduce((sum, n) => sum + n, 0)).toBe(60);
    for (let face = 1; face <= 6; face++) {
      expect(histogram[face]).toBe(rolled.filter((roll) => roll === face).length);
    }
  });

  it("サイコロ以外の引き(6面でないもの)は出目として数えない", () => {
    diceLogForTest.enable();
    const random = new CryptoRandomAdapter();
    random.nextInt(6);
    random.nextInt(4);
    random.nextInt(6);

    expect(diceLogForTest.entries()).toHaveLength(3);
    expect(diceLogForTest.faces()).toHaveLength(2);
    expect(diceLogForTest.faces(4)).toHaveLength(1);
  });
});
