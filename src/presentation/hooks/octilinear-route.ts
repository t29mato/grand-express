export interface RoutePoint {
  readonly x: number;
  readonly y: number;
}

/**
 * 路線を「縦・横・45度」の3方向だけで引く(地下鉄路線図と同じ描き方)。
 *
 * 2都市を素直に直線で結ぶと、都市から何本も路線が出る場所で角度がばらばらになり、
 * 盤面が乱れて見える。かといって縦横だけに丸めると、別々の路線が同じ軸に乗って
 * 1本に見えてしまううえ、紀伊半島や能登のような張り出しが線に埋もれて、
 * **地図としての位置関係が読めなくなる**。
 * 45度まで許すと、乱れは取れて地図は地図のまま残る。
 *
 * 経路は「軸に沿った脚」と「45度の脚」の2本でできている。どちらを先にするかは
 * 路線ごとに交互に変える。同じ都市から出る路線が揃って同じ向きに出ると、
 * 根元で重なって見えるため。
 */
export function octilinearRoutePoint(
  a: RoutePoint,
  b: RoutePoint,
  /** 経路上の位置(0=a、1=b)。 */
  t: number,
  /** 45度の脚を先にするか。路線ごとに交互に切り替えて、根元の重なりを避ける。 */
  diagonalFirst: boolean,
): RoutePoint {
  const corner = octilinearCorner(a, b, diagonalFirst);
  const leg1 = Math.hypot(corner.x - a.x, corner.y - a.y);
  const leg2 = Math.hypot(b.x - corner.x, b.y - corner.y);
  const total = leg1 + leg2;
  if (total === 0) return { x: a.x, y: a.y };

  // 中間マスが等間隔に並ぶよう、折れ点までの「距離の比」でtを割り振る
  // (脚の本数で半分ずつにすると、短い脚にマスが詰まってしまう)。
  const split = leg1 / total;
  if (t <= split) {
    const u = split === 0 ? 0 : t / split;
    return { x: a.x + (corner.x - a.x) * u, y: a.y + (corner.y - a.y) * u };
  }
  const u = split === 1 ? 0 : (t - split) / (1 - split);
  return { x: corner.x + (b.x - corner.x) * u, y: corner.y + (b.y - corner.y) * u };
}

/** 軸に沿った脚と45度の脚が切り替わる点。 */
function octilinearCorner(a: RoutePoint, b: RoutePoint, diagonalFirst: boolean): RoutePoint {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  // 45度の脚は、縦横の移動量のうち小さいほうと同じ長さになる。
  const diagonal = Math.min(Math.abs(dx), Math.abs(dy));
  const sx = Math.sign(dx);
  const sy = Math.sign(dy);
  // 余りが出るのは移動量の大きい軸のほう。そちらが軸に沿った脚になる。
  const horizontalIsLonger = Math.abs(dx) >= Math.abs(dy);

  if (diagonalFirst) {
    return horizontalIsLonger
      ? { x: a.x + sx * diagonal, y: b.y }
      : { x: b.x, y: a.y + sy * diagonal };
  }
  return horizontalIsLonger
    ? { x: b.x - sx * diagonal, y: a.y }
    : { x: a.x, y: b.y - sy * diagonal };
}

/**
 * その位置での進行方向(単位ベクトル)。
 * 中間マスを路線と直角にずらすのに使う。折れ点をまたぐと向きが変わるため、
 * 全体の向き(a→b)ではなく**その場の脚の向き**を返す。
 */
export function octilinearDirection(
  a: RoutePoint,
  b: RoutePoint,
  t: number,
  diagonalFirst: boolean,
): RoutePoint {
  const step = 0.01;
  const before = octilinearRoutePoint(a, b, Math.max(0, t - step), diagonalFirst);
  const after = octilinearRoutePoint(a, b, Math.min(1, t + step), diagonalFirst);
  const dx = after.x - before.x;
  const dy = after.y - before.y;
  const length = Math.hypot(dx, dy);
  return length === 0 ? { x: 1, y: 0 } : { x: dx / length, y: dy / length };
}
