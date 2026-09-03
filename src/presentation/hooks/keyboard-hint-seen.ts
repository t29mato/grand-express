"use client";

/**
 * キーボードの案内(F-18)を**一度出したこと**を覚えておく。
 *
 * `local-storage-sound-preference.ts` と同じ作法:セーブデータとは別のキーで、
 * ストレージが使えない環境(プライベートブラウジング等)ではメモリ上に持つ。
 * 案内は「知らなかった人に一度だけ」のものなので、旅を変えても保存を消しても
 * 二度目は出さない。
 */
const STORAGE_KEY = "world-express:keyboard-hint:v1";

let memoryFallback = false;

export function hasSeenKeyboardHint(): boolean {
  if (memoryFallback) return true;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "seen";
  } catch {
    return false;
  }
}

export function markKeyboardHintSeen(): void {
  memoryFallback = true;
  try {
    window.localStorage.setItem(STORAGE_KEY, "seen");
  } catch {
    // ストレージが使えない環境。同じタブのあいだだけ覚えている。
  }
}

/** テスト用。覚えを捨てて、次は初めて開いたときの振る舞いに戻す。 */
export function resetKeyboardHintSeen(): void {
  memoryFallback = false;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // 何も無ければ何もしない。
  }
}
