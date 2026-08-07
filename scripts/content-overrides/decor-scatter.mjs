/**
 * 盤面装飾を「陸の上だけ」に置くための小道具。
 *
 * legacy の装飾は、木やサボテンを**地図の矩形いっぱいに散らして、陸でクリップして
 * 残ったものだけ見せる**という作りだった(`legacy/grand-express.html` の
 * `decor:(el,g,PX,PY)=>...`)。海に落ちたぶんは静かに消えるので、
 * 「何本置いたか」と「何本見えるか」がまったく違う。実測では日本は44本撒いて
 * 見えていたのは5本、ボリビアのサボテンは26本撒いて8本だった。
 *
 * そこで、**同じ散らしかたのまま候補を多めに作り、陸に乗ったものだけを必要数とる**。
 * 見た目(ばらけかた)は legacy のままで、置いた数と見える数が一致する。
 */

function pointInPolygon(x, y, poly) {
  let hit = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

function distanceToPolygon(x, y, poly) {
  let best = Infinity;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [x1, y1] = poly[j];
    const [x2, y2] = poly[i];
    const dx = x2 - x1;
    const dy = y2 - y1;
    const t = dx || dy ? Math.max(0, Math.min(1, ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy))) : 0;
    best = Math.min(best, Math.hypot(x - (x1 + t * dx), y - (y1 + t * dy)));
  }
  return best;
}

/**
 * 陸の上か。`inset` を指定すると、岸からそのぶん内側にあることまで求める
 * (岸ぎりぎりに置くと、クリップで半分に切られた木が並ぶため)。
 */
export function makeOnLand(landPolygons, px, py, inset = 0) {
  const projected = landPolygons.map((poly) => poly.map(([lo, la]) => [px(lo), py(la)]));
  return (lo, la) => {
    const x = px(lo);
    const y = py(la);
    for (const poly of projected) {
      if (!pointInPolygon(x, y, poly)) continue;
      if (inset <= 0 || distanceToPolygon(x, y, poly) >= inset) return true;
    }
    return false;
  };
}

/**
 * `next(i)` が返す候補のうち陸に乗ったものを、最大 `want` 個ひろう。
 * 候補は `tries` 回まで作る。**乱数は使わない**(抽出結果が毎回同じである必要がある)。
 */
export function scatterOnLand(want, tries, next, onLand) {
  const kept = [];
  for (let i = 0; i < tries && kept.length < want; i++) {
    const candidate = next(i);
    if (!candidate) continue;
    if (!onLand(candidate.lo, candidate.la)) continue;
    kept.push(candidate);
  }
  return kept;
}
