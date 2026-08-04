import { GameSession } from "../../../domain/game-session/game-session";
import { GameRepository } from "../../ports/game-repository";
import { fromSnapshot, toSnapshot } from "../../dto/game-session-snapshot";

/** 進行中のゲームを保存する(現行コードの `saveGame`)。 */
export function saveGame(repository: GameRepository, session: GameSession): void {
  if (session.status === "finished") return;
  repository.save(toSnapshot(session));
}

/** 保存されたゲームがあれば読み込む(現行コードの `readSave`)。 */
export function loadGame(repository: GameRepository): GameSession | null {
  const snapshot = repository.load();
  return snapshot ? fromSnapshot(snapshot) : null;
}

export function clearSavedGame(repository: GameRepository): void {
  repository.clear();
}
