import { GameSessionSnapshot } from "../dto/game-session-snapshot";

/**
 * 進行中のゲームセッションを1件だけ保存するポート(現行コードの
 * `localStorage` 保存 + Base64共有コードに相当。ADR-0005)。
 */
export interface GameRepository {
  save(snapshot: GameSessionSnapshot): void;
  load(): GameSessionSnapshot | null;
  clear(): void;
}
