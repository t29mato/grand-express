import { Random } from "../../../domain/shared-kernel/random";

/** サイコロを1個振る(現行コードの `rollDice` の値決定部分。演出は含まない)。 */
export function rollOneDie(random: Random): number {
  return 1 + random.nextInt(6);
}

/** 複数個のサイコロを振り合計する(アイテム効果 `roll-fixed-dice` 用)。 */
export function rollDice(random: Random, diceCount: number): { rolls: readonly number[]; total: number } {
  const rolls = Array.from({ length: diceCount }, () => rollOneDie(random));
  return { rolls, total: rolls.reduce((sum, v) => sum + v, 0) };
}
