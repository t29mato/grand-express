import { CityId, CountryId, GameSessionId, ItemKey, NodeId, PlayerId, PropertyRef, RegionId } from "../../domain/shared-kernel/ids";
import { Money } from "../../domain/shared-kernel/money";
import { CpuLevel } from "../../domain/cpu/cpu-level";
import { Player, PropertyLevel } from "../../domain/player/player";
import { GameSession } from "../../domain/game-session/game-session";
import { MisfortuneSpiritState } from "../../domain/misfortune/misfortune-spirit";

/**
 * `GameSession` はMap等の非JSONネイティブな値を含むため、そのままlocalStorageへ
 * 保存できない。永続化用のプレーンなDTOへ変換する(ADR-0005)。
 */
export interface PlayerSnapshot {
  readonly id: string;
  readonly name: string;
  readonly isCpu: boolean;
  readonly cpuLevel?: CpuLevel;
  readonly cash: number;
  readonly location: string;
  readonly portfolio: Record<string, PropertyLevel>;
  readonly inventory: readonly string[];
  readonly skipNextTurn: boolean;
  readonly hasExtraTurn: boolean;
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
}

function playerToSnapshot(player: Player): PlayerSnapshot {
  return {
    id: player.id,
    name: player.name,
    isCpu: player.isCpu,
    cpuLevel: player.cpuLevel,
    cash: player.cash.amount,
    location: player.location,
    portfolio: Object.fromEntries(player.portfolio),
    inventory: player.inventory,
    skipNextTurn: player.skipNextTurn,
    hasExtraTurn: player.hasExtraTurn,
  };
}

function playerFromSnapshot(snapshot: PlayerSnapshot): Player {
  return {
    id: PlayerId(snapshot.id),
    name: snapshot.name,
    isCpu: snapshot.isCpu,
    cpuLevel: snapshot.cpuLevel,
    cash: Money.of(snapshot.cash),
    location: NodeId(snapshot.location),
    portfolio: new Map(
      Object.entries(snapshot.portfolio).map(([ref, level]) => [ref as PropertyRef, level]),
    ),
    inventory: snapshot.inventory.map((k) => ItemKey(k)),
    skipNextTurn: snapshot.skipNextTurn,
    hasExtraTurn: snapshot.hasExtraTurn,
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
  };
}
