const STORAGE_KEY = "grand-express:players:v1";

/**
 * 前の旅の**顔ぶれ**(名前と、その枠を誰が使うか)を `localStorage` に覚えておく。
 *
 * 同じ人たちで続けて遊ぶのに、毎回名前を入れ直させていた。
 * セーブデータ(`LocalStorageGameRepository`)とは別の鍵にする。
 * これは特定の旅ではなく**その卓の顔ぶれ**なので、
 * 「はじめから」でも保存を消しても残ってほしい。
 *
 * ## 覚えるもの / 覚えないもの
 *
 * 境目は「**その卓に属するもの**か、**その旅に属するもの**か」。
 *
 * | | | なぜ |
 * |---|---|---|
 * | 名前 | 覚える | 同じ人たちで続けて遊ぶのに毎回入れ直させていた |
 * | 枠の使いかた(人間/CPU/なし) | 覚える | 実質「何人で、誰が人間か」。名前だけ戻しても、枠がCPUなら名前は画面に出ない |
 * | 知識レベル | **覚えない** | 「**この盤面を**どれくらい知っているか」なので国ごとの設定。国は毎回選び直すので、前の国のものを持ち越すのは誤り |
 * | 国・月数・CPUの強さ | **覚えない** | その旅ごとに選びたいもの |
 *
 * ストレージが使えない環境(プライベートブラウジング等)ではメモリ上に持つ。
 * その場合タブを閉じると忘れるが、同じタブで遊んでいるあいだは効く。
 */

/** 覚える枠1つぶん。**知識レベルと国は覚えない**(理由は `loadPlayerSetup`)。 */
export interface RememberedSlot {
  /**
   * 自分で付けた名前。`null` は「既定名を使う」。
   *
   * **既定名は文字列にせず null のまま覚える。** 「あなた」を保存してしまうと、
   * 次に別の言語で開いたときに前の言語の既定名が残り、
   * 言語に追随しなくなる(v0.16.2 で入れた挙動が壊れる)。
   */
  readonly name: string | null;
  readonly mode: "human" | "cpu" | "off";
}

/** 長すぎる名前を保存し続けないための上限。画面の入力欄と同じ考え方。 */
const MAX_NAME_LENGTH = 24;
/** 枠は最大4つ。これを超えるものは壊れたデータとみなす。 */
const MAX_SLOTS = 4;

let memoryFallback: readonly RememberedSlot[] | null = null;

function isValidSlot(value: unknown): value is RememberedSlot {
  if (typeof value !== "object" || value === null) return false;
  const slot = value as { name?: unknown; mode?: unknown };
  const nameOk = slot.name === null || (typeof slot.name === "string" && slot.name.length <= MAX_NAME_LENGTH);
  const modeOk = slot.mode === "human" || slot.mode === "cpu" || slot.mode === "off";
  return nameOk && modeOk;
}

/**
 * 覚えてある顔ぶれ。何も無い・壊れている場合は `null`(呼び出し側が既定を使う)。
 *
 * **知識レベルは覚えない。** あれは「この盤面をどれくらい知っているか」で、
 * 国ごとに違う。国は毎回選び直すものなので、前の国の設定を持ち越すのは誤り。
 * **国・月数・CPUの強さも覚えない。** 毎回選びたい設定なので。
 */
export function loadPlayerSetup(): readonly RememberedSlot[] | null {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    // ストレージが使えない環境。同じタブで始めたぶんだけ覚えている。
    return memoryFallback;
  }
  if (!raw) return memoryFallback;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0 || parsed.length > MAX_SLOTS) return null;
    if (!parsed.every(isValidSlot)) return null;
    return parsed as readonly RememberedSlot[];
  } catch {
    // 壊れたJSONが入っていても落とさない(手で書き換えられることがある)。
    return null;
  }
}

/**
 * 顔ぶれを覚える。**全員が既定名なら覚えない**(消す)。
 * 「あなた/CPU 1」だけを保存しても意味がなく、次に開いたときに
 * 言語へ追随しなくなる副作用のほうが大きい。
 */
export function savePlayerSetup(slots: readonly RememberedSlot[]): void {
  const hasCustomName = slots.some((slot) => slot.name !== null && slot.name.trim() !== "");
  if (!hasCustomName) {
    clearPlayerSetup();
    return;
  }
  const trimmed = slots.slice(0, MAX_SLOTS).map((slot) => ({
    name: slot.name === null ? null : slot.name.trim().slice(0, MAX_NAME_LENGTH) || null,
    mode: slot.mode,
  }));
  memoryFallback = trimmed;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    // ストレージが使えない環境。メモリ上には残す。
  }
}

export function clearPlayerSetup(): void {
  memoryFallback = null;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // no-op
  }
}
