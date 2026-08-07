/**
 * 同じマスに複数の駒が乗ったときの並べ方。
 *
 * 駒は幅およそ20(盤面座標)で、`TOKEN.scale` を掛けた大きさで描かれる。
 * 以前は横一列に間隔17でずらしていたが、拡大後の駒の幅(20×1.35≒27)より
 * 間隔のほうが狭く、隣の駒に3割ほど隠れていた(4人が同じマスにいる開始直後は
 * 色の帯が並んでいるようにしか見えない)。
 *
 * かといって幅のぶんだけ横に広げると、4人で100近い幅になる。
 * 隣り合うマスの間隔は中央値でおよそ36しかないので、両隣のマスを覆ってしまう。
 * そこで **3人以上は2段に分けて縦にも使い**、あわせて駒を少しだけ小さくして、
 * 広がりを1マス分の近くに抑えている。
 */

/** 1人だけのときの大きさ。マスの正方形(半辺9)より少し大きい程度。 */
export const TOKEN_BASE_SCALE = 1.35;

export interface TokenPlacement {
  /** マスの中心からのずれ(盤面座標)。 */
  dx: number;
  dy: number;
  /** その駒を描く倍率。混み合うほど少しだけ小さくする。 */
  scale: number;
}

/**
 * 横に並べるときの間隔。下の倍率と組で決めている。
 * 拡大後の駒の幅(20×倍率)がこの間隔以下になるようにして、車体が重ならないようにする。
 */
const COLUMN_GAP = 22;
/** 2段に分けるときの段の間隔。駒の高さとほぼ同じ。 */
const ROW_GAP = 19;
/** 2人のときの大きさ。20×1.1=22 でちょうど間隔ぶん。 */
const PAIR_SCALE = 1.1;
/** 3人以上のときの大きさ。2段になるぶん、もう少しだけ小さくする。 */
const CROWD_SCALE = 1.05;

/**
 * `count` 人が同じマスにいるときの、駒ごとの置き場所を返す。
 * 返す順番は `session.players` の順(色の割り当てと対応する)。
 */
export function tokenPlacements(count: number): TokenPlacement[] {
  if (count <= 1) return [{ dx: 0, dy: 0, scale: TOKEN_BASE_SCALE }];

  if (count === 2) {
    return [
      { dx: -COLUMN_GAP / 2, dy: 0, scale: PAIR_SCALE },
      { dx: COLUMN_GAP / 2, dy: 0, scale: PAIR_SCALE },
    ];
  }

  // 3人以上は2段。上段に半分(端数は上段へ)、残りを下段に置き、
  // どちらの段も中央で揃える。3人なら上段2・下段1で三角形になる。
  const topCount = Math.ceil(count / 2);
  const bottomCount = count - topCount;
  const placements: TokenPlacement[] = [];
  for (let i = 0; i < count; i++) {
    const onTop = i < topCount;
    const indexInRow = onTop ? i : i - topCount;
    const rowCount = onTop ? topCount : bottomCount;
    placements.push({
      dx: (indexInRow - (rowCount - 1) / 2) * COLUMN_GAP,
      dy: (onTop ? -ROW_GAP : ROW_GAP) / 2,
      scale: CROWD_SCALE,
    });
  }
  return placements;
}
