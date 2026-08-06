import {
  CityId,
  CountryId,
  GameSessionId,
  ItemKey,
  NodeId,
  PlayerId,
  PropertyRef,
  QuizQuestionId,
  RegionId,
} from "../../domain/shared-kernel/ids";
import { Money } from "../../domain/shared-kernel/money";
import { CpuLevel } from "../../domain/cpu/cpu-level";
import { KnowledgeLevel, toKnowledgeLevel } from "../../domain/quiz/knowledge-level";
import { EMPTY_LEARNING_RECORD } from "../../domain/quiz/learning-record";
import { Player, PropertyLevel } from "../../domain/player/player";
import { GameSession } from "../../domain/game-session/game-session";
import { MisfortuneSpiritState } from "../../domain/misfortune/misfortune-spirit";
import { EMPTY_STATS, PlayerStats } from "../../domain/player/player-stats";

/**
 * `GameSession` はMap等の非JSONネイティブな値を含むため、そのままlocalStorageへ
 * 保存できない。永続化用のプレーンなDTOへ変換する(ADR-0005)。
 */
export interface PlayerSnapshot {
  readonly id: string;
  readonly name: string;
  readonly isCpu: boolean;
  readonly cpuLevel?: CpuLevel;
  /** v1のセーブデータには存在しないため、読み込み時は既定値に丸める。 */
  readonly knowledgeLevel?: KnowledgeLevel;
  readonly cash: number;
  readonly location: string;
  readonly portfolio: Record<string, PropertyLevel>;
  readonly inventory: readonly string[];
  readonly skipNextTurn: boolean;
  readonly hasExtraTurn: boolean;
  /** 表彰用の記録。これ以前のセーブデータには無いので、読み込み時は空にする。 */
  readonly stats?: PlayerStats;
}

export interface GameSessionSnapshot {
  readonly schemaVersion: 1;
  readonly id: string;
  readonly countryId: string;
  readonly month: number;
  readonly maxMonths: number;
  readonly activePlayerIndex: number;
  readonly players: readonly PlayerSnapshot[];
  readonly destination: string;
  readonly misfortune: {
    readonly holderId: string | null;
    readonly level: 0 | 1 | 2;
    readonly turnsOnCurrentHolder: number;
    readonly resting: boolean;
    readonly stuckTurnsRemaining: number;
  };
  readonly status: "in-progress" | "finished";
  readonly regionIncomeModifiers: Record<string, number>;
  /** v1のセーブデータには存在しないため、読み込み時は空として扱う。 */
  readonly missedQuestionIds?: readonly string[];
}

function playerToSnapshot(player: Player): PlayerSnapshot {
  return {
    id: player.id,
    name: player.name,
    isCpu: player.isCpu,
    cpuLevel: player.cpuLevel,
    knowledgeLevel: player.knowledgeLevel,
    cash: player.cash.amount,
    location: player.location,
    portfolio: Object.fromEntries(player.portfolio),
    inventory: player.inventory,
    skipNextTurn: player.skipNextTurn,
    hasExtraTurn: player.hasExtraTurn,
    stats: player.stats,
  };
}

function playerFromSnapshot(snapshot: PlayerSnapshot): Player {
  return {
    id: PlayerId(snapshot.id),
    name: snapshot.name,
    isCpu: snapshot.isCpu,
    cpuLevel: snapshot.cpuLevel,
    // v1のセーブデータには knowledgeLevel が無いので既定値(familiar)に丸める。
    knowledgeLevel: toKnowledgeLevel(snapshot.knowledgeLevel),
    cash: Money.of(snapshot.cash),
    location: NodeId(snapshot.location),
    portfolio: new Map(
      Object.entries(snapshot.portfolio).map(([ref, level]) => [ref as PropertyRef, level]),
    ),
    inventory: snapshot.inventory.map((k) => ItemKey(k)),
    skipNextTurn: snapshot.skipNextTurn,
    hasExtraTurn: snapshot.hasExtraTurn,
    // 古いセーブデータには記録が無い。空から数え直す。
    stats: snapshot.stats ?? EMPTY_STATS,
  };
}

function misfortuneToSnapshot(state: MisfortuneSpiritState): GameSessionSnapshot["misfortune"] {
  return { ...state, holderId: state.holderId };
}

export function toSnapshot(session: GameSession): GameSessionSnapshot {
  return {
    schemaVersion: 1,
    id: session.id,
    countryId: session.countryId,
    month: session.month,
    maxMonths: session.maxMonths,
    activePlayerIndex: session.activePlayerIndex,
    players: session.players.map(playerToSnapshot),
    destination: session.destination,
    misfortune: misfortuneToSnapshot(session.misfortune),
    status: session.status,
    regionIncomeModifiers: Object.fromEntries(session.regionIncomeModifiers),
    missedQuestionIds: session.learningRecord.missedQuestionIds,
  };
}

export function fromSnapshot(snapshot: GameSessionSnapshot): GameSession {
  return {
    id: GameSessionId(snapshot.id),
    countryId: CountryId(snapshot.countryId),
    month: snapshot.month,
    maxMonths: snapshot.maxMonths,
    activePlayerIndex: snapshot.activePlayerIndex,
    players: snapshot.players.map(playerFromSnapshot),
    destination: CityId(snapshot.destination),
    misfortune: {
      holderId: snapshot.misfortune.holderId ? PlayerId(snapshot.misfortune.holderId) : null,
      level: snapshot.misfortune.level,
      turnsOnCurrentHolder: snapshot.misfortune.turnsOnCurrentHolder,
      resting: snapshot.misfortune.resting,
      stuckTurnsRemaining: snapshot.misfortune.stuckTurnsRemaining,
    },
    status: snapshot.status,
    regionIncomeModifiers: new Map(
      Object.entries(snapshot.regionIncomeModifiers).map(([k, v]) => [RegionId(k), v]),
    ),
    // v1のセーブデータには学習記録が無いので、空として読み込む。
    learningRecord: snapshot.missedQuestionIds
      ? { missedQuestionIds: snapshot.missedQuestionIds.map((id) => QuizQuestionId(id)) }
      : EMPTY_LEARNING_RECORD,
  };
}
