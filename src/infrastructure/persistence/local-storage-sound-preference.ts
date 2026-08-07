const STORAGE_KEY = "grand-express:music:v1";

/**
 * BGMを鳴らすかどうかのプレイヤー設定を `localStorage` に覚えておく。
 *
 * セーブデータ(`LocalStorageGameRepository`)とは別のキーにする。
 * 音を切ったことは特定の旅ではなくその人の好みなので、
 * 「はじめから」でも保存を消しても残ってほしい。
 *
 * ストレージが使えない環境(プライベートブラウジング等)ではメモリ上に持つ。
 * その場合タブを閉じると忘れるが、同じタブで遊んでいるあいだは効く。
 */
let memoryFallback: boolean | null = null;

/** 既定は「鳴らす」。曲があること自体に気づかないまま遊ばれるのを避けるため。 */
const DEFAULT_ENABLED = true;

export function loadMusicEnabled(): boolean {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === "on") return true;
    if (raw === "off") return false;
    // ストレージは読めたが、まだ選ばれていない(あるいは消された)。
    return DEFAULT_ENABLED;
  } catch {
    // ストレージが使えない環境。同じタブで選んだぶんだけ覚えている。
    return memoryFallback ?? DEFAULT_ENABLED;
  }
}

export function saveMusicEnabled(enabled: boolean): void {
  memoryFallback = enabled;
  try {
    window.localStorage.setItem(STORAGE_KEY, enabled ? "on" : "off");
  } catch {
    // ストレージが使えない環境。メモリ上には残す。
  }
}
