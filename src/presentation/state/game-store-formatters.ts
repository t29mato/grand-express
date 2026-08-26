import { Random } from "../../domain/shared-kernel/random";
import { LocalizedText } from "../../domain/shared-kernel/localized-text";
import { QuizQuestion } from "../../domain/quiz/quiz-question";
import { KnowledgeLevel } from "../../domain/quiz/knowledge-level";
import { CurrencyFormat } from "../../domain/country/country-content-pack";
import { DoomOutcome } from "../../domain/misfortune/doom-effect";
import { resolveMisfortuneStrike } from "../../application/use-cases/resolve-misfortune-strike/resolve-misfortune-strike.use-case";
import { CityVisitSummary, cpuTakeTurn } from "../../application/use-cases/cpu-take-turn/cpu-take-turn.use-case";
import { GameEngineContext } from "../../application/game-engine-context";
import { formatMoney } from "../i18n/money-format";
import { doomPhrase } from "../i18n/event-messages";
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
  // **選択肢はどのレベルでも全部見せる。**
  // 2026-08-25まで newcomer だけ2つに減らしていたが、やめた
  // (2択は当てずっぽうで5割当たり、当てた人は何も学ばない)。
  // 易しさは問題そのもので付ける(`quiz-selection-service.ts`)。
  // 並びだけは毎回混ぜる——正解の位置が固定されると、そこを覚えられてしまう。
  return shuffledIndexes(question.options.length, random);
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
      // 記録に**何をされたか**まで残す。モーダルには災難の名前・物語・絵が出るが、
      // 閉じたあと辿れるのは記録だけで、そこに「厄災に見舞われた」としか
      // 書かれていなかった(いくら失ったのかも分からなかった)。
      // 物語は繰り返さず、名前と結果だけを1行にする。
      return logEntry(
        result.wasKing ? "spiritStruckKingLog" : "spiritStruckLog",
        [playerName, result.flavor.name, describeDoomOutcome(result.outcome, currency)],
        "bad",
      );
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
    // 押し付けられた相手は**名前**で出す。ここが `String(pass.toPlayerId)` だった頃は
    // 「CPU 1 が p2 に厄災の神をなすりつけた」と内部IDが表に出ていた。
    const toName = result.session.players.find((p) => p.id === pass.toPlayerId)?.name ?? String(pass.toPlayerId);
    entries.push(logEntry("passLog", [context.content.spirit.emoji, playerName, toName], "bad"));
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
        return [
          logEntry(
            landing.outcome.gained ? "blueLog" : "redLog",
            [playerName, money(landing.outcome.amount.amount)],
            landing.outcome.gained ? "good" : "bad",
          ),
        ];
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

/**
 * 災難で何を失ったかの一言。金額があるものは金額を出す。
 *
 * 効果の種類を**網羅**する。新しい災難を足したときに、
 * ここを書き足し忘れると型で止まる(`never` に代入できない)。
 */
function describeDoomOutcome(outcome: DoomOutcome, currency: CurrencyFormat): LocalizedText {
  const money = (amount: number) => formatMoney(amount, currency);
  switch (outcome.effectId) {
    case "fine":
      return doomPhrase("doomCost", money(outcome.amountPaid));
    case "percentLoss":
      return doomPhrase("doomCost", money(outcome.amountLost));
    case "payOthers":
      return doomPhrase("doomCost", money(outcome.totalPaid));
    case "skipTurn":
      return outcome.alsoPaid === null
        ? doomPhrase("doomSkipNext")
        : doomPhrase("doomSkipNextPaid", money(outcome.alsoPaid));
    case "loseProperties":
      if (outcome.lostRefs.length > 0) return doomPhrase("doomPropertyLost", outcome.lostRefs.length);
      return outcome.fallbackPaid === null ? doomPhrase("doomNothing") : doomPhrase("doomCost", money(outcome.fallbackPaid));
    case "teleport":
      return doomPhrase("doomMovedAway");
    case "steal": {
      if (outcome.lostItem) return doomPhrase("doomItemTaken");
      return outcome.lostCash > 0 ? doomPhrase("doomCost", money(outcome.lostCash)) : doomPhrase("doomNothing");
    }
    default: {
      // 分岐を足し忘れるとここで型が合わなくなる(行番号つきでビルドが落ちる)。
      const unreachable: never = outcome;
      return unreachable;
    }
  }
}

