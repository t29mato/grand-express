/**
 * ボリビアの盤面装飾。legacy の `BOLIVIA.decor` を置き換える。
 *
 * 日本と同じく、legacy の装飾は上書き後の投影(盤面1.35倍)とずれていた。
 * 順序は `scripts/extract-legacy-content.mjs` 側で直したが、そのうえで測ると
 *
 *   - アンデスの山26個 … 23個が国内(そのまま使う)
 *   - アマゾンの木66本 … 43本が国内
 *   - チャコのサボテン26本 … **8本しか国内に乗らない**
 *
 * だった。木もサボテンも矩形いっぱいに撒いてクリップ任せの作りで、
 * とくにサボテンの範囲(東経-63.6〜-57.6)は国境の外へ大きくはみ出している。
 * 山はそのまま、木とサボテンは**国内に乗ったものだけ**を採る。
 */
import { BOLIVIA_LAND } from "./bolivia-geography.mjs";
import { makeOnLand, scatterOnLand } from "./decor-scatter.mjs";

/** アンデス。legacy と同じく西端を北西から南東へ下る一本の連なりにする。 */
const RANGE_COUNT = 26;
/** アマゾンの森とチャコの藪。legacy と同じ散らしかたで、国内のぶんだけ採る。 */
const TREE_COUNT = 44;
const CACTUS_COUNT = 20;

export function renderBoliviaDecor(px, py) {
  const parts = [];
  const onLand = makeOnLand(BOLIVIA_LAND, px, py, 10);

  for (let i = 0; i < RANGE_COUNT; i++) {
    const t = i / (RANGE_COUNT - 1);
    const lo = -69.2 + t * 3.4 + ((i % 3) - 1) * 0.22;
    const la = -15.2 - t * 7.2 + (i % 2 ? 0.25 : -0.2);
    if (!onLand(lo, la)) continue;
    const x = px(lo);
    const y = py(la);
    const s = 13 + ((i * 7) % 9);
    parts.push(
      `<polygon points="${x - s * 1.5},${y + s * 0.7} ${x},${y - s} ${x + s * 1.5},${y + s * 0.7}" fill="#9c7f52"/>`,
      `<polygon points="${x - s * 0.5},${y - s * 0.32} ${x},${y - s} ${x + s * 0.5},${y - s * 0.32}` +
        ` ${x + s * 0.18},${y - s * 0.5} ${x},${y - s * 0.72} ${x - s * 0.18},${y - s * 0.5}" fill="#f6efe2"/>`,
    );
  }

  const trees = scatterOnLand(
    TREE_COUNT,
    400,
    (i) => {
      const lo = -69.0 + ((i * 37) % 90) / 9.0;
      const la = -9.9 - ((i * 53) % 62) / 9.0;
      return la < -16.4 ? null : { lo, la, i };
    },
    onLand,
  );
  for (const { lo, la, i } of trees) {
    parts.push(
      `<circle cx="${px(lo)}" cy="${py(la)}" r="${6 + ((i * 11) % 5)}"` +
        ` fill="${i % 3 ? "#27573a" : "#357a45"}" opacity=".85"/>`,
    );
  }

  const cactus = scatterOnLand(
    CACTUS_COUNT,
    400,
    (i) => ({ lo: -63.6 + ((i * 29) % 54) / 9.0, la: -18.6 - ((i * 37) % 38) / 9.0, i }),
    onLand,
  );
  for (const { lo, la } of cactus) {
    const x = px(lo);
    const y = py(la);
    parts.push(
      `<path d="M${x},${y + 9} v-13 M${x},${y + 1} l-6,-5 M${x},${y + 3} l6,-6"` +
        ` stroke="#6f7a3a" stroke-width="3.4" fill="none" stroke-linecap="round"/>`,
    );
  }

  return parts.join("");
}
