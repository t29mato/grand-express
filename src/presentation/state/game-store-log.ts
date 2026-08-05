import { GameStoreState, LogEntry } from "./game-store-types";

let nextLogId = 1;

export function newLogId(): number {
  return nextLogId++;
}

export function pushLog(state: GameStoreState, text: string, tone: LogEntry["tone"] = "neutral"): LogEntry[] {
  return [{ id: newLogId(), text, tone }, ...state.log].slice(0, 60);
}
