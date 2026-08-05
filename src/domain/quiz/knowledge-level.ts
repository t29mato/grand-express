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
 */
export type KnowledgeLevel = "newcomer" | "familiar" | "local";

export interface KnowledgeTuning {
  /** 提示する選択肢の数。実際の選択肢数を超える場合は全件提示する。 */
  readonly visibleOptionCount: number;
  /** 正解時の賞金倍率。 */
  readonly winMultiplier: number;
  /** 不正解時の損失倍率。 */
  readonly loseMultiplier: number;
}

/**
 * 囲碁の置き石と同じ考え方で、詳しい人ほど取り分を減らし外したときの責任を重くする。
 * 既定は `familiar` で、何も触らなければ従来と同じ挙動になる。
 */
export const KNOWLEDGE_TUNING: Readonly<Record<KnowledgeLevel, KnowledgeTuning>> = {
  newcomer: { visibleOptionCount: 2, winMultiplier: 1.5, loseMultiplier: 0.5 },
  familiar: { visibleOptionCount: 3, winMultiplier: 1.0, loseMultiplier: 1.0 },
  local: { visibleOptionCount: 3, winMultiplier: 0.75, loseMultiplier: 1.5 },
};

export const DEFAULT_KNOWLEDGE_LEVEL: KnowledgeLevel = "familiar";

export const KNOWLEDGE_LEVELS: readonly KnowledgeLevel[] = ["newcomer", "familiar", "local"];

/** 未知の値・未指定は既定値に丸める(古いセーブデータの読み込み用)。 */
export function toKnowledgeLevel(value: unknown): KnowledgeLevel {
  return KNOWLEDGE_LEVELS.includes(value as KnowledgeLevel) ? (value as KnowledgeLevel) : DEFAULT_KNOWLEDGE_LEVEL;
}
