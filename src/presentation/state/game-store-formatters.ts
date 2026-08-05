import { Random } from "../../domain/shared-kernel/random";
import { resolveMisfortuneStrike } from "../../application/use-cases/resolve-misfortune-strike/resolve-misfortune-strike.use-case";
import { cpuTakeTurn } from "../../application/use-cases/cpu-take-turn/cpu-take-turn.use-case";

/** クイズの選択肢の表示順をシャッフルする(元のインデックスの並びを返す)。 */
export function shuffledIndexes(length: number, random: Pick<Random, "nextInt">): number[] {
  const indexes = Array.from({ length }, (_, i) => i);
  for (let i = indexes.length - 1; i > 0; i--) {
    const j = random.nextInt(i + 1);
    [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
  }
  return indexes;
}

export function describeStrike(playerName: string, result: ReturnType<typeof resolveMisfortuneStrike>["result"]): string {
  switch (result.type) {
    case "rested":
      return `The spirit rests this turn.`;
    case "warded":
      return `${playerName} wards off the misfortune!`;
    case "pleased":
      return `${playerName} pleases the spirit and gains ${result.amount}!`;
    case "struck":
      return `${playerName} is struck by misfortune (${result.outcome.effectId}).`;
    default:
      return "";
  }
}

export function describeCpuTurn(playerName: string, result: ReturnType<typeof cpuTakeTurn>): string {
  if (result.skippedTurn) return `${playerName} is stuck and loses the turn.`;
  if (!result.landing) return `${playerName} rolls ${result.steps ?? "?"} and moves.`;
  switch (result.landing.type) {
    case "quiz":
      return `${playerName} answers a quiz (${result.landing.outcome.correct ? "correct" : "wrong"}).`;
    case "money":
      return `${playerName} lands on a ${result.landing.outcome.gained ? "blue" : "red"} square.`;
    case "card":
      return `${playerName} lands on a card square.`;
    case "destination":
      return `${playerName} reaches the destination! +${result.landing.outcome.prize}`;
    case "city":
      return `${playerName} visits a town.`;
    default:
      return `${playerName} takes a turn.`;
  }
}
