import { GameRepository } from "../../application/ports/game-repository";
import { GameSessionSnapshot } from "../../application/dto/game-session-snapshot";
import { parseSaveData } from "./save-schema";

const STORAGE_KEY = "grand-express:save:v1";

/**
 * `localStorage` を使った `GameRepository` の実装(ADR-0005)。
 * ブラウザがストレージを許可しない場合(プライベートモード等)は、
 * メモリ上のフォールバックに保存する(現行コードの `memSave` と同じ考え方)。
 */
export class LocalStorageGameRepository implements GameRepository {
  private memoryFallback: string | null = null;

  save(snapshot: GameSessionSnapshot): void {
    const serialized = JSON.stringify(snapshot);
    this.memoryFallback = serialized;
    try {
      window.localStorage.setItem(STORAGE_KEY, serialized);
    } catch {
      // ストレージが使えない環境(プライベートブラウジング等)。メモリ上には残す。
    }
  }

  load(): GameSessionSnapshot | null {
    const raw = this.readRaw();
    if (!raw) return null;
    try {
      return parseSaveData(JSON.parse(raw));
    } catch {
      return null;
    }
  }

  clear(): void {
    this.memoryFallback = null;
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // no-op
    }
  }

  private readRaw(): string | null {
    try {
      const fromStorage = window.localStorage.getItem(STORAGE_KEY);
      if (fromStorage) return fromStorage;
    } catch {
      // ストレージが使えない環境。
    }
    return this.memoryFallback;
  }
}
