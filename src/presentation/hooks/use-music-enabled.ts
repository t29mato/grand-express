"use client";

import { useEffect, useSyncExternalStore } from "react";
import {
  DEFAULT_MUSIC_ENABLED,
  applyStoredMusicPreference,
  isMusicEnabled,
  setMusicEnabled,
  subscribeMusicEnabled,
} from "../state/music-preference";

/**
 * BGMを鳴らすかどうかの設定を読み書きする。
 *
 * サーバー描画の時点では localStorage を読めないので、いったん既定値(鳴らす)で描き、
 * ブラウザに渡ってから本当の値へ差し替える(`useSyncExternalStore` の第3引数)。
 * ここを揃えずに直接読むと、前回音を切っていた人だけハイドレーションがずれる。
 */
export function useMusicEnabled(): readonly [boolean, (enabled: boolean) => void] {
  const enabled = useSyncExternalStore(subscribeMusicEnabled, isMusicEnabled, () => DEFAULT_MUSIC_ENABLED);

  // 覚えてある設定を音のエンジンへ渡す。最初の操作で音楽が始まるより前に済ませたいので、
  // 描画のたびではなくマウント時に一度だけ。
  useEffect(() => {
    applyStoredMusicPreference();
  }, []);

  return [enabled, setMusicEnabled] as const;
}
