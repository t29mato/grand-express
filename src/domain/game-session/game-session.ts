import { CityId, CountryId, GameSessionId, RegionId } from "../shared-kernel/ids";
import { Money } from "../shared-kernel/money";
import { Player } from "../player/player";
import { INITIAL_MISFORTUNE_STATE, MisfortuneSpiritState } from "../misfortune/misfortune-spirit";
import { EMPTY_LEARNING_RECORD, LearningRecord } from "../quiz/learning-record";

export type GameSessionStatus = "in-progress" | "finished";

/**
 * ゲームセッション集約。現行コードのグローバル変数(`players`, `turnIdx`,
 * `month`, `dest`, `spiritHolder` 等)を1つの不変オブジェクトにまとめたもの
 * (docs/10-architecture/02-domain-model-ddd.md 2.1節)。
 */
export interface GameSession {
  readonly id: GameSessionId;
  readonly countryId: CountryId;
  readonly month: number;
  readonly maxMonths: number;
  readonly activePlayerIndex: number;
  readonly players: readonly Player[];
  readonly destination: CityId;
  readonly misfortune: MisfortuneSpiritState;
  readonly status: GameSessionStatus;
  readonly regionIncomeModifiers: ReadonlyMap<RegionId, number>;
  /** この回のプレイで間違えた問題(終了時のおさらいに使う)。 */
  readonly learningRecord: LearningRecord;
}

export function createGameSession(params: {
  id: GameSessionId;
  countryId: CountryId;
  maxMonths: number;
  players: readonly Player[];
  destination: CityId;
}): GameSession {
  return {
    id: params.id,
    countryId: params.countryId,
    month: 0,
    maxMonths: params.maxMonths,
    activePlayerIndex: 0,
    players: params.players,
    destination: params.destination,
    misfortune: INITIAL_MISFORTUNE_STATE,
    status: "in-progress",
    regionIncomeModifiers: new Map(),
    learningRecord: EMPTY_LEARNING_RECORD,
  };
}

export function currentPlayer(session: GameSession): Player {
  return session.players[session.activePlayerIndex];
}

export function replacePlayer(session: GameSession, updated: Player): GameSession {
  return {
    ...session,
    players: session.players.map((p) => (p.id === updated.id ? updated : p)),
  };
}

export function replacePlayers(session: GameSession, players: readonly Player[]): GameSession {
  return { ...session, players };
}

/** 手番を次のプレイヤーへ進める。1周したら新しい月が始まったことを合わせて返す。 */
export function advanceTurn(session: GameSession): { session: GameSession; newMonthStarted: boolean } {
  const nextIndex = (session.activePlayerIndex + 1) % session.players.length;
  const wrapped = nextIndex === 0;
  return {
    session: {
      ...session,
      activePlayerIndex: nextIndex,
      month: wrapped ? session.month + 1 : session.month,
    },
    newMonthStarted: wrapped,
  };
}

export function isOver(session: GameSession): boolean {
  return session.status === "finished" || session.month >= session.maxMonths;
}

export function finish(session: GameSession): GameSession {
  return { ...session, status: "finished" };
}

/** 目的地到着時の賞金(月が進むほど増える。現行コードの `destBonus`)。 */
export function destinationPrize(session: GameSession): Money {
  return Money.of(700 + 70 * session.month);
}

export function setDestination(session: GameSession, destination: CityId): GameSession {
  return { ...session, destination };
}

export function setRegionIncomeModifiers(
  session: GameSession,
  modifiers: ReadonlyMap<RegionId, number>,
): GameSession {
  return { ...session, regionIncomeModifiers: modifiers };
}

export function setMisfortune(session: GameSession, misfortune: MisfortuneSpiritState): GameSession {
  return { ...session, misfortune };
}

/** 0=4月始まりの月インデックス(現行コードの `month%12`)。 */
export function seasonIndex(session: GameSession): number {
  return session.month % 12;
}

export function currentYear(session: GameSession): number {
  return Math.floor(session.month / 12) + 1;
}

/** 四半期(3ヶ月)ごとの収入発生タイミングかどうか(現行コードの `month%3===0`)。 */
export function isQuarterlyIncomeMonth(session: GameSession): boolean {
  return session.month % 3 === 0;
}
