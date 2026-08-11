/**
 * 旅人ごとの色。
 *
 * 駒(`board-view.tsx`)と旅人一覧(`side-panel.tsx`)で同じ並びを使っている。
 * **どこで見ても同じ人が同じ色**でないと、色は名前の代わりにならない。
 * 3か所目(`board-status.tsx`)を足すにあたって、ここを正とした。
 *
 * まだ `board-view.tsx` と `side-panel.tsx` は各自の中に同じ配列を持っている。
 * どちらも別の担当が触っている最中なので、まとめるのは手が空いてから。
 * **色を足す/変えるときは3か所とも直すこと。**
 *
 * 色だけで人を見分けさせない。使う側では必ず名前を添える
 * (色の見え方は人によって違う)。
 */
export const PLAYER_COLORS = ["#e8447a", "#f5b31c", "#37b3a4", "#7bc86c"] as const;

/** 何人目かから色を引く。人数が色数を超えても一周して返す。 */
export function playerColor(index: number): string {
  return PLAYER_COLORS[index % PLAYER_COLORS.length];
}
