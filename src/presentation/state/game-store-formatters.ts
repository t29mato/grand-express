import { Random } from "../../domain/shared-kernel/random";
import { QuizQuestion } from "../../domain/quiz/quiz-question";
import { KNOWLEDGE_TUNING, KnowledgeLevel } from "../../domain/quiz/knowledge-level";
import { CurrencyFormat } from "../../domain/country/country-content-pack";
import { resolveMisfortuneStrike } from "../../application/use-cases/resolve-misfortune-strike/resolve-misfortune-strike.use-case";
import { CityVisitSummary, cpuTakeTurn } from "../../application/use-cases/cpu-take-turn/cpu-take-turn.use-case";
import { GameEngineContext } from "../../application/game-engine-context";
import { formatMoney } from "../i18n/money-format";
import { LogEntry } from "./game-store-types";
import { logEntry } from "./game-store-log";

/** クイズの選択肢の表示順をシャッフルする(元のインデックスの並びを返す)。 */
export function shuffledIndexes(length: number, random: Pick<Random, "nextInt">): number[] {
  const indexes = Array.from({ length }, (_, i) => i);
  for (let i = indexes.length - 1; i > 0; i--) {
    const j = random.nextInt(i + 1);
    [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
  }
  return indexes;
}

/**
 * 知識レベルに応じて提示する選択肢を絞る(初級は誤答を1つ伏せて2択にする)。
 * **伏せるのは必ず誤答**で、正解を伏せてはならない
 * (docs/40-learning-design/02-player-knowledge-level.md 4-2)。
 */
export function visibleOptionOrder(
  question: QuizQuestion,
  knowledgeLevel: KnowledgeLevel,
  random: Pick<Random, "nextInt">,
): number[] {
  const total = question.options.length;
  const limit = Math.min(KNOWLEDGE_TUNING[knowledgeLevel].visibleOptionCount, total);
  const wrong = shuffledIndexes(total, random).filter((i) => i !== question.correctOptionIndex);
  const kept = [question.correctOptionIndex, ...wrong.slice(0, Math.max(0, limit - 1))];
  // 正解が先頭に固定されないよう、最後にもう一度並びを混ぜる。
  const order = shuffledIndexes(kept.length, random).map((i) => kept[i]);
  return order;
}

/** 厄災の神の発動結果を表すログ。 */
export function describeStrike(
  playerName: string,
  result: ReturnType<typeof resolveMisfortuneStrike>["result"],
  currency: CurrencyFormat,
): LogEntry {
  switch (result.type) {
    case "rested":
      return logEntry("spiritRests", [], "neutral");
    case "warded":
      return logEntry("spiritBlockedLog", [playerName], "good");
    case "pleased":
      return logEntry("gained", [playerName, formatMoney(result.amount, currency)], "good");
    case "struck":
      return logEntry("spiritStruckLog", [playerName], "bad");
    default:
      return logEntry("", [], "neutral");
  }
}

/**
 * CPUの1手番でおきたことを、プレイヤーが追える粒度のログ行に分解する。
 * legacyはCPUの手番でも人間と同じログを出していたため、ここでも
 * 「サイコロの目 → 着地したマスの結果 → 町での売買」を個別の行として出す。
 */
export function describeCpuTurn(
  context: GameEngineContext,
  playerName: string,
  result: ReturnType<typeof cpuTakeTurn>,
): LogEntry[] {
  const currency = context.content.currency;
  const money = (amount: number) => formatMoney(amount, currency);
  const entries: LogEntry[] = [];

  if (result.strike) {
    entries.push(describeStrike(playerName, result.strike, currency));
  }
  if (result.skippedTurn) {
    entries.push(logEntry("stuck", [playerName], "bad"));
    return entries;
  }
  if (result.steps !== undefined) {
    entries.push(logEntry("rolls", [playerName, result.steps], "neutral"));
  }
  for (const pass of result.spiritPassEvents) {
    const to = context.content.spirit;
    entries.push(logEntry("passLog", [to.emoji, playerName, String(pass.toPlayerId)], "bad"));
  }

  const landing = result.landing;
  if (landing) {
    switch (landing.type) {
      case "quiz":
        entries.push(
          landing.outcome.correct
            ? logEntry("quizOkLog", [playerName, money(landing.outcome.amount.amount)], "good")
            : logEntry("quizNoLog", [playerName, money(landing.outcome.amount.amount)], "bad"),
        );
        break;
      case "money":
        entries.push(
          landing.outcome.gained
            ? logEntry("blueLog", [playerName, money(landing.outcome.amount)], "good")
            : logEntry("redLog", [playerName, money(landing.outcome.amount)], "bad"),
        );
        break;
      case "card": {
        const item = landing.outcome.itemKey
          ? context.content.items.find((i) => i.key === landing.outcome.itemKey)
          : undefined;
        entries.push(
          item
            ? logEntry("cardLog", [playerName, item.emoji, item.name], "gold")
            : logEntry("cardEmptyLog", [playerName], "neutral"),
        );
        break;
      }
      case "destination":
        // 到着処理の内部で目的地が次の街へ差し替わるため、賞金だけを伝える。
        entries.push(logEntry("arriveDestLog", [playerName, money(landing.outcome.prize)], "gold"));
        entries.push(...describeVisit(context, playerName, landing.visit));
        break;
      case "city":
        entries.push(...describeVisit(context, playerName, landing.visit));
        break;
    }
  }

  if (result.extraTurn) entries.push(logEntry("extraTurn", [playerName], "gold"));
  return entries;
}

/** 町での買い物(購入・投資・アイテム)をログ行にする。 */
function describeVisit(
  context: GameEngineContext,
  playerName: string,
  visit: CityVisitSummary,
): LogEntry[] {
  const currency = context.content.currency;
  const city = context.getCity(visit.cityId);
  const entries: LogEntry[] = [];
  for (const index of visit.purchases) {
    const property = city.properties[index];
    if (property) {
      entries.push(
        logEntry("boughtLog", [playerName, property.name, city.name, formatMoney(property.cost, currency)], "gold"),
      );
    }
  }
  for (const index of visit.upgrades) {
    const property = city.properties[index];
    if (property) entries.push(logEntry("investCpuLog", [playerName, property.name], "gold"));
  }
  if (visit.boughtItem) {
    const item = context.content.items.find((i) => i.key === visit.boughtItem);
    if (item) entries.push(logEntry("boughtItemLog", [playerName, item.emoji, item.name], "gold"));
  }
  if (visit.purchases.length === 0 && visit.upgrades.length === 0 && !visit.boughtItem) {
    entries.push(logEntry("cpuPassesTown", [playerName], "neutral"));
  }
  return entries;
}
