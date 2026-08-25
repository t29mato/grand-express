/**
 * プレイヤーごとの「対象国への知識レベル」。
 *
 * 同一画面で国際色豊かなメンバーが遊ぶ想定のため、対象国の出身者と初見の
 * プレイヤーでは前提知識が極端に違う。そのままではクイズが勝敗を決めてしまい、
 * 初見のプレイヤーは当てずっぽうで答えるだけになって学習にもならない
 * (docs/40-learning-design/02-player-knowledge-level.md)。
 *
 * 知識レベルは(プレイヤー × 対象国)で決まる値なので、プロフィールとして
 * 永続化せず、ゲーム開始時のセットアップで毎回選ぶ。
 * 補正はクイズにのみ適用し、物件収入や到着賞金には影響させない。
 *
 * ## 選択肢の数は、どのレベルでも同じ
 *
 * **2026-08-25まで、`newcomer` だけ選択肢を3つから2つに減らしていた。**
 * これはやめた。**「ただの運試しになってつまらない」**(オーナー)。
 * 2択は当てずっぽうで5割当たるので、当てた人は何も学ばず、
 * 外した人は理不尽さだけが残る。**易しくしたつもりが、賭けにしていた。**
 *
 * かわりに**問題そのものを易しくする。**知識レベルは
 * `quiz-selection-service.ts` の出題難易度の中心で表す。
 * 有名な事実や大きなヒントの付いた問題が、易しいレベルほど出やすくなる
 * (仕組みは前からあり、2択と併用していた)。
 *
 * ## 4段階にした
 *
 * 「すこし」と「くわしい」のあいだが空きすぎていた。
 * 中心が 5.5 → 8 と飛ぶので、その間の人がどちらを選んでも合わない。
 */
export type KnowledgeLevel = "newcomer" | "familiar" | "knowledgeable" | "local";

export interface KnowledgeTuning {
  /** 正解時の賞金倍率。 */
  readonly winMultiplier: number;
  /** 不正解時の損失倍率。 */
  readonly loseMultiplier: number;
}

/**
 * 囲碁の置き石と同じ考え方で、詳しい人ほど取り分を減らし外したときの責任を重くする。
 *
 * **既定は `familiar` で、そこが中立(1.0/1.0)。**何も触らなければ従来と同じ。
 * 両端(newcomer と local)の値も従来のまま変えていない。
 * 新しく足した `knowledgeable` を、その間に置いた。
 */
export const KNOWLEDGE_TUNING: Readonly<Record<KnowledgeLevel, KnowledgeTuning>> = {
  newcomer: { winMultiplier: 1.5, loseMultiplier: 0.5 },
  familiar: { winMultiplier: 1.0, loseMultiplier: 1.0 },
  knowledgeable: { winMultiplier: 0.85, loseMultiplier: 1.25 },
  local: { winMultiplier: 0.75, loseMultiplier: 1.5 },
};

export const DEFAULT_KNOWLEDGE_LEVEL: KnowledgeLevel = "familiar";

export const KNOWLEDGE_LEVELS: readonly KnowledgeLevel[] = [
  "newcomer",
  "familiar",
  "knowledgeable",
  "local",
];

/** 未知の値・未指定は既定値に丸める(古いセーブデータの読み込み用)。 */
export function toKnowledgeLevel(value: unknown): KnowledgeLevel {
  return KNOWLEDGE_LEVELS.includes(value as KnowledgeLevel) ? (value as KnowledgeLevel) : DEFAULT_KNOWLEDGE_LEVEL;
}
