import { GameStoreState, LogArg, LogEntry } from "./game-store-types";

let nextLogId = 1;

export function newLogId(): number {
  return nextLogId++;
}

/** ログ1行を組み立てる(表示時に翻訳するため、キーと引数のまま保持する)。 */
export function logEntry(
  key: string,
  args: readonly LogArg[] = [],
  tone: LogEntry["tone"] = "neutral",
): LogEntry {
  return { id: newLogId(), key, args, tone };
}

export function pushLog(
  state: GameStoreState,
  key: string,
  args: readonly LogArg[] = [],
  tone: LogEntry["tone"] = "neutral",
): LogEntry[] {
  return [logEntry(key, args, tone), ...state.log].slice(0, 60);
}
