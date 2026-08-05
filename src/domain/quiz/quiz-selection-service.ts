import { Random } from "../shared-kernel/random";
import { KnowledgeLevel } from "./knowledge-level";
import { MAX_QUIZ_DIFFICULTY, MIN_QUIZ_DIFFICULTY, QuizDifficulty, QuizQuestion } from "./quiz-question";

/**
 * 知識レベルごとの、出題される難易度の「狙い」。
 * 中心から離れるほど出にくくなるが、**確率が0になる難易度は無い**
 * (くわしい人にもたまに易しい問題が出るし、その逆もある)。
 */
const TARGET: Readonly<Record<KnowledgeLevel, { centre: number; spread: number }>> = {
  newcomer: { centre: 3, spread: 2 },
  familiar: { centre: 5.5, spread: 2 },
  local: { centre: 8, spread: 2 },
};

/**
 * 各難易度が選ばれる重み(正規分布の形)。テストや確率の確認に使えるよう公開する。
 * 返り値の添字0が難易度1に対応する。
 */
export function difficultyWeights(knowledgeLevel: KnowledgeLevel): number[] {
  const { centre, spread } = TARGET[knowledgeLevel];
  const weights: number[] = [];
  for (let level = MIN_QUIZ_DIFFICULTY; level <= MAX_QUIZ_DIFFICULTY; level++) {
    weights.push(Math.exp(-((level - centre) ** 2) / (2 * spread ** 2)));
  }
  return weights;
}

/** 知識レベルに応じて出題する難易度を1つ抽選する。 */
export function rollDifficulty(knowledgeLevel: KnowledgeLevel, random: Random): QuizDifficulty {
  const weights = difficultyWeights(knowledgeLevel);
  const total = weights.reduce((sum, w) => sum + w, 0);
  // nextFloat() は 0以上1未満。重みの累積で1つ選ぶ。
  let threshold = random.nextFloat() * total;
  for (let i = 0; i < weights.length; i++) {
    threshold -= weights[i];
    if (threshold < 0) return (i + MIN_QUIZ_DIFFICULTY) as QuizDifficulty;
  }
  return MAX_QUIZ_DIFFICULTY;
}

/**
 * 出題の山札。使い切るまで同じ問題を出さないことに加え、
 * **狙った難易度にいちばん近い問題**を選ぶ(現行コードの `quizBag` を拡張したもの)。
 *
 * 人間とCPUで1つを共有する。袋を分けると重複が戻るため。
 */
export class QuizSelector {
  private remaining: QuizQuestion[] = [];

  constructor(
    private readonly allQuestions: readonly QuizQuestion[],
    private readonly random: Random,
  ) {}

  /** 残りの中から、目標難易度に最も近い問題を1問引く。 */
  draw(target: QuizDifficulty): QuizQuestion {
    if (this.allQuestions.length === 0) throw new Error("No quiz questions available");
    if (this.remaining.length === 0) this.remaining = [...this.allQuestions];

    let best = Number.POSITIVE_INFINITY;
    const candidates: number[] = [];
    this.remaining.forEach((question, index) => {
      const distance = Math.abs(question.difficulty - target);
      if (distance < best) {
        best = distance;
        candidates.length = 0;
      }
      if (distance === best) candidates.push(index);
    });

    // 同じ難易度の問題が複数あるときは、そのなかから無作為に選ぶ
    // (同点をいつも先頭から取ると出題順が固定されてしまう)。
    const chosen = candidates[this.random.nextInt(candidates.length)];
    return this.remaining.splice(chosen, 1)[0];
  }
}
