import { ItemKey, NodeId, PlayerId, PropertyRef } from "../shared-kernel/ids";
import { LocalizedText } from "../shared-kernel/localized-text";
import { Money } from "../shared-kernel/money";
import { Random } from "../shared-kernel/random";
import { Player, moveTo, payUpTo, removeItemAt, removeRandomProperty } from "../player/player";

/**
 * 「厄災の神」が引き起こす7種類の災難。両国パックとも全く同じ7種類・同じ数値
 * (king=trueで大厄災モード)で、フレーバーテキストだけが国ごとに異なる
 * (legacy/grand-express.html の BOLIVIA.doom / JAPAN.doom を参照)。
 */
export type DoomEffectId =
  | "fine"
  | "percentLoss"
  | "skipTurn"
  | "loseProperties"
  | "payOthers"
  | "teleport"
  | "steal";

/** フレーバーテキスト(国ごとに異なる)。効果ロジック自体は7種で共通。 */
export interface DoomFlavor {
  readonly effectId: DoomEffectId;
  readonly name: LocalizedText;
  readonly narrative: LocalizedText;
}

export type DoomOutcome =
  | { readonly effectId: "fine"; readonly amountPaid: number }
  | { readonly effectId: "percentLoss"; readonly amountLost: number }
  | { readonly effectId: "skipTurn"; readonly alsoPaid: number | null }
  | { readonly effectId: "loseProperties"; readonly lostRefs: readonly PropertyRef[]; readonly fallbackPaid: number | null }
  | { readonly effectId: "payOthers"; readonly totalPaid: number }
  | { readonly effectId: "teleport"; readonly toNode: NodeId }
  | { readonly effectId: "steal"; readonly lostItem: ItemKey | null; readonly lostCash: number };

export interface DoomEffectContext {
  readonly random: Random;
  readonly king: boolean;
  readonly allPlayers: readonly Player[];
  readonly afflictedPlayerId: PlayerId;
  /** 目的地から遠い順にノードを`poolSize`件返す(現行コードの `doomTeleport` 用)。 */
  readonly farthestNodesFromDestination: (poolSize: number) => readonly NodeId[];
}

export interface DoomEffectResult {
  readonly outcome: DoomOutcome;
  readonly updatedPlayers: readonly Player[];
}

export type DoomStrategy = (context: DoomEffectContext) => DoomEffectResult;

function findAfflicted(context: DoomEffectContext): Player {
  const player = context.allPlayers.find((p) => p.id === context.afflictedPlayerId);
  if (!player) throw new Error(`Unknown afflicted player: ${context.afflictedPlayerId}`);
  return player;
}

function replacePlayer(players: readonly Player[], updated: Player): Player[] {
  return players.map((p) => (p.id === updated.id ? updated : p));
}

/** 現行コード `run:(p,k)=>{const v=Math.min(p.cash,(k?420:150)+rnd(k?420:160));...}` */
export const fineDoom: DoomStrategy = (context) => {
  const player = findAfflicted(context);
  const base = context.king ? 420 : 150;
  const range = context.king ? 420 : 160;
  const requested = Money.of(base + context.random.nextInt(range));
  const { player: updated, paid } = payUpTo(player, requested);
  return {
    outcome: { effectId: "fine", amountPaid: paid.amount },
    updatedPlayers: replacePlayer(context.allPlayers, updated),
  };
};

/** 現行コード `run:(p,k)=>{const v=Math.round(p.cash*(k?0.32:0.14));...}` */
export const percentLossDoom: DoomStrategy = (context) => {
  const player = findAfflicted(context);
  const rate = context.king ? 0.32 : 0.14;
  const amount = Money.of(Math.round(player.cash.amount * rate));
  const updated = { ...player, cash: player.cash.subtract(amount) };
  return {
    outcome: { effectId: "percentLoss", amountLost: amount.amount },
    updatedPlayers: replacePlayer(context.allPlayers, updated),
  };
};

/** 現行コード `run:(p,k)=>{p.skip=true; if(k){...pay 300}}` */
export const skipTurnDoom: DoomStrategy = (context) => {
  const player = findAfflicted(context);
  let updated: Player = { ...player, skipNextTurn: true };
  let alsoPaid: number | null = null;
  if (context.king) {
    const { player: paidPlayer, paid } = payUpTo(updated, Money.of(300));
    updated = paidPlayer;
    alsoPaid = paid.amount;
  }
  return {
    outcome: { effectId: "skipTurn", alsoPaid },
    updatedPlayers: replacePlayer(context.allPlayers, updated),
  };
};

/** 現行コード `doomLoseProps(p, lose)` (landslide/fire: king?2:1件) */
export const losePropertiesDoom: DoomStrategy = (context) => {
  const player = findAfflicted(context);
  const loseCount = context.king ? 2 : 1;
  const refs = [...player.portfolio.keys()];
  const lostRefs: PropertyRef[] = [];
  let updated = player;
  for (let i = 0; i < loseCount && refs.length; i++) {
    const idx = context.random.nextInt(refs.length);
    const [ref] = refs.splice(idx, 1);
    lostRefs.push(ref);
    updated = removeRandomProperty(updated, ref);
  }
  let fallbackPaid: number | null = null;
  if (lostRefs.length === 0) {
    const { player: paidPlayer, paid } = payUpTo(updated, Money.of(200));
    updated = paidPlayer;
    fallbackPaid = paid.amount;
  }
  return {
    outcome: { effectId: "loseProperties", lostRefs, fallbackPaid },
    updatedPlayers: replacePlayer(context.allPlayers, updated),
  };
};

/** 現行コード `doomPayOthers(p, each)` (tranca/bottakuri: king?260:100を各プレイヤーへ) */
export const payOthersDoom: DoomStrategy = (context) => {
  const player = findAfflicted(context);
  const each = Money.of(context.king ? 260 : 100);
  let payer = player;
  let totalPaid = 0;
  const others = new Map<PlayerId, Player>();
  for (const other of context.allPlayers) {
    if (other.id === player.id) continue;
    const { player: updatedPayer, paid } = payUpTo(payer, each);
    payer = updatedPayer;
    totalPaid += paid.amount;
    others.set(other.id, { ...other, cash: other.cash.add(paid) });
  }
  const updatedPlayers = context.allPlayers.map((p) => {
    if (p.id === player.id) return payer;
    return others.get(p.id) ?? p;
  });
  return { outcome: { effectId: "payOthers", totalPaid }, updatedPlayers };
};

/** 現行コード `doomTeleport(p, pool)` (soroche/maigo: king?4:18件の候補から抽選) */
export const teleportDoom: DoomStrategy = (context) => {
  const player = findAfflicted(context);
  const poolSize = context.king ? 4 : 18;
  const pool = context.farthestNodesFromDestination(poolSize);
  const toNode = pool[context.random.nextInt(pool.length)];
  const updated = moveTo(player, toNode);
  return {
    outcome: { effectId: "teleport", toNode },
    updatedPlayers: replacePlayer(context.allPlayers, updated),
  };
};

/** 現行コード `doomSteal(p, cash)` (theft/suri: アイテムがあればアイテムを、なければ現金を奪う) */
export const stealDoom: DoomStrategy = (context) => {
  const player = findAfflicted(context);
  if (player.inventory.length > 0) {
    const idx = context.random.nextInt(player.inventory.length);
    const lostItem = player.inventory[idx];
    const updated = removeItemAt(player, idx);
    return {
      outcome: { effectId: "steal", lostItem, lostCash: 0 },
      updatedPlayers: replacePlayer(context.allPlayers, updated),
    };
  }
  const amount = Money.of(context.king ? 380 : 170);
  const { player: updated, paid } = payUpTo(player, amount);
  return {
    outcome: { effectId: "steal", lostItem: null, lostCash: paid.amount },
    updatedPlayers: replacePlayer(context.allPlayers, updated),
  };
};

export const DOOM_STRATEGIES: Readonly<Record<DoomEffectId, DoomStrategy>> = {
  fine: fineDoom,
  percentLoss: percentLossDoom,
  skipTurn: skipTurnDoom,
  loseProperties: losePropertiesDoom,
  payOthers: payOthersDoom,
  teleport: teleportDoom,
  steal: stealDoom,
};
