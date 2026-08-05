import { Money } from "../shared-kernel/money";
import { ItemKey, NodeId, PlayerId, PropertyRef } from "../shared-kernel/ids";
import { CpuLevel } from "../cpu/cpu-level";
import { DEFAULT_KNOWLEDGE_LEVEL, KnowledgeLevel } from "../quiz/knowledge-level";

export const MAX_INVENTORY_SIZE = 5;
export const MAX_PROPERTY_LEVEL = 5;

/** 物件のレベル(1〜5)。現行コードの `MAXLV=5` に相当。 */
export type PropertyLevel = 1 | 2 | 3 | 4 | 5;

export interface Player {
  readonly id: PlayerId;
  readonly name: string;
  readonly isCpu: boolean;
  readonly cpuLevel?: CpuLevel;
  /**
   * 対象国への知識レベル。クイズの選択肢数と増減額の補正にのみ使う
   * (docs/40-learning-design/02-player-knowledge-level.md)。
   */
  readonly knowledgeLevel: KnowledgeLevel;
  readonly cash: Money;
  readonly location: NodeId;
  readonly portfolio: ReadonlyMap<PropertyRef, PropertyLevel>;
  readonly inventory: readonly ItemKey[];
  readonly skipNextTurn: boolean;
  readonly hasExtraTurn: boolean;
}

export function createPlayer(params: {
  id: PlayerId;
  name: string;
  isCpu: boolean;
  cpuLevel?: CpuLevel;
  knowledgeLevel?: KnowledgeLevel;
  startingCash: Money;
  startingNode: NodeId;
}): Player {
  return {
    id: params.id,
    name: params.name,
    isCpu: params.isCpu,
    cpuLevel: params.cpuLevel,
    knowledgeLevel: params.knowledgeLevel ?? DEFAULT_KNOWLEDGE_LEVEL,
    cash: params.startingCash,
    location: params.startingNode,
    portfolio: new Map(),
    inventory: [],
    skipNextTurn: false,
    hasExtraTurn: false,
  };
}

export function moveTo(player: Player, node: NodeId): Player {
  return { ...player, location: node };
}

export function receiveCash(player: Player, amount: Money): Player {
  return { ...player, cash: player.cash.add(amount) };
}

/** 現行コードの `Math.min(p.cash, amount)` パターン。払えるだけ払う。 */
export function payUpTo(
  player: Player,
  amount: Money,
): { player: Player; paid: Money } {
  const { paid, remaining } = player.cash.payUpTo(amount);
  return { player: { ...player, cash: remaining }, paid };
}

export function canAddItem(player: Player): boolean {
  return player.inventory.length < MAX_INVENTORY_SIZE;
}

export function addItem(player: Player, item: ItemKey): Player {
  if (!canAddItem(player)) return player;
  return { ...player, inventory: [...player.inventory, item] };
}

export function removeItemAt(player: Player, index: number): Player {
  const inventory = [...player.inventory];
  inventory.splice(index, 1);
  return { ...player, inventory };
}

export function hasItem(player: Player, item: ItemKey): boolean {
  return player.inventory.includes(item);
}

export function acquireProperty(
  player: Player,
  ref: PropertyRef,
  cost: Money,
): Player {
  const portfolio = new Map(player.portfolio);
  portfolio.set(ref, 1);
  return { ...player, cash: player.cash.subtract(cost), portfolio };
}

export function upgradeProperty(
  player: Player,
  ref: PropertyRef,
  cost: Money,
  newLevel: PropertyLevel,
): Player {
  const portfolio = new Map(player.portfolio);
  portfolio.set(ref, newLevel);
  return { ...player, cash: player.cash.subtract(cost), portfolio };
}

export function sellProperty(
  player: Player,
  ref: PropertyRef,
  proceeds: Money,
): Player {
  const portfolio = new Map(player.portfolio);
  portfolio.delete(ref);
  return { ...player, cash: player.cash.add(proceeds), portfolio };
}

export function removeRandomProperty(
  player: Player,
  ref: PropertyRef,
): Player {
  const portfolio = new Map(player.portfolio);
  portfolio.delete(ref);
  return { ...player, portfolio };
}

export function ownsProperty(player: Player, ref: PropertyRef): boolean {
  return player.portfolio.has(ref);
}
