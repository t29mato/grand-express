import { GameSessionSnapshot } from "../../application/dto/game-session-snapshot";
import { InvalidSaveDataError, parseSaveData } from "./save-schema";

/**
 * セーブデータをコピー&ペーストで共有できるコードに変換する
 * (現行コードの `encode`/`decode`。ADR-0005)。
 */
export const SaveCodeCodec = {
  encode(snapshot: GameSessionSnapshot): string {
    const json = JSON.stringify(snapshot);
    return btoa(unescape(encodeURIComponent(json)));
  },

  decode(code: string): GameSessionSnapshot {
    let json: string;
    try {
      json = decodeURIComponent(escape(atob(code.trim())));
    } catch (cause) {
      throw new InvalidSaveDataError(cause);
    }
    let raw: unknown;
    try {
      raw = JSON.parse(json);
    } catch (cause) {
      throw new InvalidSaveDataError(cause);
    }
    return parseSaveData(raw);
  },
};
