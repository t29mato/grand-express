import { describe, expect, it } from "vitest";
import { QuizQuestionId } from "../shared-kernel/ids";
import { sameForAllLocales } from "../shared-kernel/localized-text";
import { KnowledgeLevel } from "./knowledge-level";
import { QuizDifficulty, QuizQuestion } from "./quiz-question";
import { QuizSelector, difficultyWeights, rollDifficulty } from "./quiz-selection-service";

function question(difficulty: QuizDifficulty, id = `q${difficulty}`): QuizQuestion {
  return {
    id: QuizQuestionId(id),
    difficulty,
    question: sameForAllLocales(`question ${id}`),
    options: ["a", "b", "c"].map(sameForAllLocales),
    correctOptionIndex: 0,
    fact: sameForAllLocales("fact"),
  };
}

/** 決定的な擬似乱数(mulberry32)。 */
function seededRandom(seed: number) {
  let state = seed + 0x6d2b79f5;
  const next = () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  return { nextInt: (max: number) => Math.floor(next() * max), nextFloat: next };
}

describe("difficultyWeights", () => {
  it("知識レベルごとに山の位置がずれる(初級は易しい側、上級は難しい側)", () => {
    const peak = (level: KnowledgeLevel) => {
      const weights = difficultyWeights(level);
      return weights.indexOf(Math.max(...weights)) + 1;
    };
    expect(peak("newcomer")).toBeLessThan(peak("familiar"));
    expect(peak("familiar")).toBeLessThan(peak("local"));
    expect(peak("newcomer")).toBeLessThanOrEqual(4);
    expect(peak("local")).toBeGreaterThanOrEqual(7);
  });

  it("どの難易度も確率が0にはならない", () => {
    for (const level of ["newcomer", "familiar", "local"] as const) {
      for (const weight of difficultyWeights(level)) {
        expect(weight).toBeGreaterThan(0);
      }
    }
  });

  it("上級では難しい問題が易しい問題より圧倒的に出やすい", () => {
    // 「知識度が高くても難易度1が出る確率は0ではないが、7〜8の方が圧倒的に多い」
    const weights = difficultyWeights("local");
    const easy = weights[0]; // 難易度1
    const hard = weights[6] + weights[7]; // 難易度7・8
    expect(easy).toBeGreaterThan(0);
    expect(hard / easy).toBeGreaterThan(100);
  });
});

describe("rollDifficulty", () => {
  it("1〜10の範囲に収まる", () => {
    for (let seed = 0; seed < 200; seed++) {
      const level = rollDifficulty("familiar", seededRandom(seed));
      expect(level).toBeGreaterThanOrEqual(1);
      expect(level).toBeLessThanOrEqual(10);
    }
  });

  it("実際の抽選でも上級ほど難しい問題に寄る", () => {
    const average = (level: KnowledgeLevel) => {
      let total = 0;
      const trials = 800;
      for (let seed = 0; seed < trials; seed++) total += rollDifficulty(level, seededRandom(seed));
      return total / trials;
    };
    expect(average("newcomer")).toBeLessThan(average("familiar"));
    expect(average("familiar")).toBeLessThan(average("local"));
  });
});

describe("QuizSelector", () => {
  const pool = [question(1), question(3), question(5), question(8), question(10)];

  it("狙った難易度にいちばん近い問題を出す", () => {
    const selector = new QuizSelector(pool, seededRandom(1));
    expect(selector.draw(9).difficulty).toBe(8); // 9は無いので8か10、近いのは8
    expect(selector.draw(1).difficulty).toBe(1);
  });

  it("使い切るまで同じ問題を出さない", () => {
    const selector = new QuizSelector(pool, seededRandom(2));
    const drawn = pool.map(() => selector.draw(5).id);
    expect(new Set(drawn).size).toBe(pool.length);
  });

  it("使い切ったら山を作り直す", () => {
    const selector = new QuizSelector(pool, seededRandom(3));
    pool.forEach(() => selector.draw(5));
    expect(() => selector.draw(5)).not.toThrow();
  });

  it("問題が1つもなければエラーになる", () => {
    const selector = new QuizSelector([], seededRandom(4));
    expect(() => selector.draw(5)).toThrow();
  });
});
