import { KnowledgeLevel } from "../quiz/knowledge-level";

/**
 * 「はじめて」の人の最初の1年だけ、厄災の連続を抑える救済。
 *
 * ## なぜ要るか
 *
 * 実プレイの記録(2026-09-02、日本盤面)で、厄災の神が憑いた人が
 * **3手番連続**で「ぼったくり −¥2,000,000」「運転見合わせ(1回休み)」
 * 「火事(唯一の物件を失う)」を受けた。仕組みを知らない人にとっては
 * 理由も逃げ道も分からないまま、ただ持ち物と手番を取り上げられ続ける。
 *
 * **知らないうちに3連続で殴られると、遊ぶのをやめる。**
 * 仕組みを覚える猶予として、最初の1年だけ連続を2回で止める。
 *
 * ## かける相手を絞る理由
 *
 * - **`newcomer`(この国は初めて)を選んだ人だけ。**「すこし知っている」以上を
 *   選んだ人は、自分で難度を引き受けている。知識レベルはセットアップで
 *   毎回選ぶ値(docs/40-learning-design/02-player-knowledge-level.md)。
 * - **最初の1年(月0〜11)だけ。**2年目からは同じルールで戦う。
 * - **CPUにはかけない。**手加減はCPUの強さ(`CpuLevel`)で表す軸なので、
 *   ここで二重にかけると強さの設定が意味を失う。
 *
 * ## 「連続」の数えかた
 *
 * 厄災の神の `turnsOnCurrentHolder` をそのまま使う。この値は
 * 「いまの相手に憑いたまま迎えた手番の数」で、神が別の人へ移った瞬間に0へ戻る
 * (`misfortune-spirit.ts` の `settleAfterTurn` / `passTo` / `attachToFarthestPlayer`)。
 * **新しく数える場所を作らない**ので、セーブデータの形も変わらない。
 */
export const FIRST_YEAR_MONTHS = 12;

/** 最初の1年に、続けて受けさせる災難の上限。 */
export const FIRST_YEAR_DOOM_LIMIT = 2;

export interface DoomReliefInput {
  /** その人の知識レベル。 */
  readonly knowledgeLevel: KnowledgeLevel;
  readonly isCpu: boolean;
  /** 0始まりの経過月。 */
  readonly month: number;
  /** いまの相手に憑いたまま、これまでに迎えた手番の数。 */
  readonly turnsOnCurrentHolder: number;
}

/**
 * この手番の災難を見送るか。
 * `true` なら厄災は発動せず、居座りの数えも進めない(大厄災への格上げも起きない)。
 */
export function shouldSpareFromDoom(input: DoomReliefInput): boolean {
  if (input.isCpu) return false;
  if (input.knowledgeLevel !== "newcomer") return false;
  if (input.month >= FIRST_YEAR_MONTHS) return false;
  return input.turnsOnCurrentHolder >= FIRST_YEAR_DOOM_LIMIT;
}
