"use client";

import { loadMusicEnabled, saveMusicEnabled } from "../../infrastructure/persistence/local-storage-sound-preference";
import { soundAdapter } from "./game-store-dependencies";

/**
 * 「BGMを鳴らすか」の設定を、画面をまたいで1つ持つための小さなストア。
 *
 * ゲームストア(zustand)に混ぜていないのは、これが**旅の状態ではなく人の好み**で、
 * セーブ・ロード・「はじめから」のどれとも一緒に動いてほしくないため。
 * トップ画面とゲーム画面の両方にボタンが出るので、両方が同じ値を見られる必要がある。
 */

/** サーバー描画時とストレージが無いときの既定値。 */
export const DEFAULT_MUSIC_ENABLED = true;

let cached: boolean | null = null;
const listeners = new Set<() => void>();

/** いまの設定。初回だけ localStorage から読む(サーバーでは呼ばれない)。 */
export function isMusicEnabled(): boolean {
  if (cached === null) cached = loadMusicEnabled();
  return cached;
}

export function setMusicEnabled(enabled: boolean): void {
  cached = enabled;
  saveMusicEnabled(enabled);
  soundAdapter.setMusicEnabled(enabled);
  for (const listener of listeners) listener();
}

/**
 * 覚えてある設定を音のエンジンへ反映する。ボタンが画面に出た時点で一度呼ぶ。
 *
 * 音楽は最初の操作をきっかけに鳴り出すので、**それより前に**エンジンへ伝えておかないと、
 * 前回切ったはずの音が一瞬鳴ってしまう。
 */
export function applyStoredMusicPreference(): void {
  soundAdapter.setMusicEnabled(isMusicEnabled());
}

export function subscribeMusicEnabled(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** テスト用に読み直しを強制する(次に読むとき localStorage から取り直す)。 */
export function resetMusicPreferenceCache(): void {
  cached = null;
}
