/**
 * 開発用の「出目ログ」。
 *
 * 実プレイで「最初の3手番が全部2だった」という報告があった。9回ぶんの出目
 * (2,2,2,4,6,5,休み,4)は統計的にはありふれた並びだが、**その場で確かめる術が無かった**
 * のが本当の困りごとだった。あとから数えられるように、乱数の引きをここに残す。
 *
 * 決めごと:
 * - **既定では何もしない。**遊んでいる人の邪魔をしないため、記録は明示的に入れたときだけ。
 *   入れ方は次のどちらか(どちらもブラウザ側だけの話で、旅の記録には一切混ざらない)。
 *     - URL に `?dicelog=1` を付けて開く
 *     - コンソールで `localStorage.setItem("world-express:dice-log", "on")` してから読み込む
 * - 記録は**メモリ上の輪バッファだけ**。保存もしないし送信もしない。
 *   タブを閉じれば消える(旅の記録=セーブデータとは別物)。
 * - 読み方は開発者コンソールから。`__diceLog.histogram()` で面ごとの回数、
 *   `__diceLog.text()` で並びがそのまま出る。
 *
 * 記録するのは**乱数ポートの引きそのもの**(`nextInt(n)` の n と結果)。
 * サイコロは `rollDice` が `1 + random.nextInt(6)` を引くので、`n === 6` の行が出目にあたる
 * (クイズの選択肢がちょうど6個、といった別の引きが紛れることはあるが、
 * 開発者が眺めるためのものなのでそれで足りる)。
 */

/** 記録を入れる合図。URL の `?dicelog=1` と、この localStorage のキーを見る。 */
const STORAGE_KEY = "world-express:dice-log";
const QUERY_KEY = "dicelog";

/** ブラウザのコンソールから触るための名前(`window.__diceLog`)。 */
const GLOBAL_KEY = "__diceLog";

/** 残しておく件数。長い試遊でも数えられて、かつメモリを気にしなくてよい程度。 */
const CAPACITY = 2000;

/** 乱数の引き1回ぶん。 */
export type DiceLogEntry = {
  /** 何面ぶんの引きだったか(`nextInt(n)` の n)。サイコロなら 6。 */
  readonly sides: number;
  /** 引いた結果。サイコロの出目は 1 起点なので `value + 1` が出目。 */
  readonly value: number;
  /** ページを開いてからの経過ミリ秒。 */
  readonly at: number;
};

let entries: DiceLogEntry[] = [];
/** `null` は「まだ調べていない」。合図の判定はページごとに一度だけ行う。 */
let enabled: boolean | null = null;

function readFlag(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (new URLSearchParams(window.location.search).get(QUERY_KEY) === "1") return true;
    return window.localStorage.getItem(STORAGE_KEY) === "on";
  } catch {
    // プライベートモードなどで localStorage が読めない環境では、単に記録しない。
    return false;
  }
}

/** 面ごとの回数。サイコロ(6面)の引きだけを 1〜6 に直して数える。 */
function histogram(sides = 6): Record<number, number> {
  const counts: Record<number, number> = {};
  for (let face = 1; face <= sides; face++) counts[face] = 0;
  for (const entry of entries) {
    if (entry.sides !== sides) continue;
    counts[entry.value + 1] += 1;
  }
  return counts;
}

/** サイコロの引きを出目(1〜6)の並びとして取り出す。 */
function faces(sides = 6): number[] {
  return entries.filter((entry) => entry.sides === sides).map((entry) => entry.value + 1);
}

/** コンソールに貼れる形。`2,2,2,4,6,5,4` のように出る。 */
function text(sides = 6): string {
  return faces(sides).join(",");
}

/** 記録を消す。試したい場面の直前で呼ぶ。 */
function clear(): void {
  entries = [];
}

/**
 * 乱数の引きを1回ぶん記録する。**合図が無ければ即座に戻る。**
 * 乱数アダプタから呼ばれる(`crypto-random-adapter.ts`)。
 */
export function recordDraw(sides: number, value: number): void {
  if (enabled === null) {
    enabled = readFlag();
    if (enabled && typeof window !== "undefined") {
      // コンソールから読むための入口。ここでしか生やさないので、
      // 合図を入れていない普通の遊びでは `window` に何も足さない。
      (window as unknown as Record<string, unknown>)[GLOBAL_KEY] = {
        entries: () => [...entries],
        faces,
        histogram,
        text,
        clear,
      };
    }
  }
  if (!enabled) return;
  entries.push({ sides, value, at: Math.round(performance.now()) });
  if (entries.length > CAPACITY) entries.splice(0, entries.length - CAPACITY);
}

/**
 * テストから使う入口。合図(URL・localStorage)を経由せずに記録を入り切りする。
 * 本番の遊びからは呼ばれない。
 */
export const diceLogForTest = {
  enable(): void {
    enabled = true;
    clear();
  },
  disable(): void {
    enabled = false;
    clear();
  },
  reset(): void {
    enabled = null;
    clear();
  },
  entries: (): readonly DiceLogEntry[] => entries,
  faces,
  histogram,
  text,
};
