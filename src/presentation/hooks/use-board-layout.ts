import { useMemo } from "react";
import { NodeId } from "../../domain/shared-kernel/ids";
import { isCityNode } from "../../domain/board/node";
import { CountryProjection, projectPoint } from "../../domain/board/board-projection";
import { octilinearCorner, octilinearRoutePoint } from "./octilinear-route";
import { GameEngineContext } from "../../application/game-engine-context";
import { CITY_FOOTPRINT, SQUARE_FOOTPRINT } from "../components/board/board-metrics";

export interface NodePosition {
  readonly x: number;
  readonly y: number;
}

/**
 * 盤面ノードのSVG座標を計算する(Presentation層の責務。ADR-0003)。
 *
 * 都市は経度緯度から投影する。中間マスは**縦・横・45度の3方向だけを使う経路**
 * (`octilinear-route.ts`)の上に並べる。路線の線は隣り合うノードを直線で結んで
 * 描かれるので、**マスが経路から外れると線もその角度で描かれてしまう。**
 *
 * 以前はここで3つのことをしていて、そのどれもが角度を崩していた。
 * 日本の盤面で実際に描かれた線分249本を測ったところ、0/45/90度に乗っていたのは
 * **5.6%** しかなかった。内訳:
 *
 *   1. **折れ点をまたぐ線** — 中間マスは経路の上にあっても、折れ点が
 *      マスとマスのあいだに来ると、そこを結ぶ線が角を斜めに突っ切る。
 *      辺97本ぶん、線分の約4割がこれだった。いちばん効いていた原因。
 *   2. **垂直方向のずらし(jitter)** — ずれ幅がマスごとに変わるため、
 *      同じ脚に乗るはずのマスが互い違いになり、直線が波打っていた。
 *   3. **重なりの押し離し** — 経路に関係なくマスを動かすので、当然ずれる。
 *
 * いまはこうしている。
 *
 *   - 線は**マスとは切り離して、経路そのものを折れ点ごと描く**(`railPolylines`)。
 *     これで1が消える。マスがどこに居ても線は折れない
 *   - マスの位置は経路上の割合 `t` ひとつで持ち、動かすのも `t` だけ。
 *     座標への変換は経路が受け持つので、どれだけ動かしても経路から外れない
 *   - 押し離しは都市の位置を整えるためだけに使う
 */
export function useBoardLayout(context: GameEngineContext): ReadonlyMap<NodeId, NodePosition> {
  return useMemo(() => computeBoardLayout(context), [context]);
}

/**
 * 配置の中身。Reactに依存しないので、盤面を描かずに配置だけを測れる
 * (飾りに乗っているマスを数えるなど)。
 */
export function computeBoardLayout(context: GameEngineContext): ReadonlyMap<NodeId, NodePosition> {
  const { projection } = context.content;
  const projectX = (lon: number) => projectPoint(lon, projection.lat0, projection).x;
  const projectY = (lat: number) => projectPoint(projection.lon0, lat, projection).y;

  const cityPositions = new Map<string, NodePosition>();
  for (const city of context.content.cities) {
    cityPositions.set(city.id, { x: projectX(city.longitude), y: projectY(city.latitude) });
  }

  // 同じ路線(e{edgeIndex}_*)に属する中間マスの総数を数え、t=k/(n+1)で線形補間する。
  const siblingCounts = new Map<string, number>();
  for (const id of context.graph.nodes.keys()) {
    const match = /^e(\d+)_(\d+)$/.exec(id);
    if (!match) continue;
    const prefix = `e${match[1]}_`;
    siblingCounts.set(prefix, (siblingCounts.get(prefix) ?? 0) + 1);
  }

  const positions = new Map<NodeId, NodePosition>();
  for (const [id, node] of context.graph.nodes) {
    if (isCityNode(node)) {
      positions.set(id, cityPositions.get(node.cityId)!);
      continue;
    }
    const match = /^e(\d+)_(\d+)$/.exec(id);
    const [cityAId, cityBId] = node.between;
    const a = cityPositions.get(cityAId)!;
    const b = cityPositions.get(cityBId)!;
    if (!match) {
      positions.set(id, { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
      continue;
    }
    const edgeIndex = Number(match[1]);
    const k = Number(match[2]);
    const n = siblingCounts.get(`e${match[1]}_`) ?? 1;
    const diagonalFirst = edgeIndex % 2 === 1;
    positions.set(id, octilinearRoutePoint(a, b, k / (n + 1), diagonalFirst));
  }

  // 押し離しは都市の位置を整えるために回す。中間マスもここで動くが、
  // このあと経路の上へ置き直すので、結果には残らない。
  const relaxed = relaxOverlaps(positions, context, projection);
  const { placed, routes } = placeSquaresOnRoute(relaxed, context, siblingCounts);
  return slideSquaresAlongRoute(placed, routes, projection, collectObstacles(context, placed));
}

/** 盤面座標の矩形 `[x, y, 幅, 高さ]`。 */
type Obstacle = readonly [x: number, y: number, width: number, height: number];

/**
 * マスに踏ませたくないもの。
 *
 * 2種類あって、**どちらもマスどうしの押し離しでは避けられていなかった**。
 *
 *   1. **地図の飾り**(山・木・鳥居)。`decorSvg` はSVG文字列で位置が読めないため、
 *      抽出時に取り出した `decorBoxes` を使う。
 *   2. **都市シンボル**(奈良の鹿など)。シンボルは円の**上**に描かれるので
 *      (`CITY_FOOTPRINT.top` は -30)、都市の中心から半径で離すやり方だと
 *      頭の上を素通りしていた。実際、日本ではマス19個がシンボルに乗っていて、
 *      「京都と奈良のあいだの青マスが鹿を隠している」のはこれ。
 */
function collectObstacles(context: GameEngineContext, placed: ReadonlyMap<NodeId, NodePosition>): Obstacle[] {
  const obstacles: Obstacle[] = [...context.content.terrain.decorBoxes];
  for (const [id, node] of context.graph.nodes) {
    if (!isCityNode(node)) continue;
    const at = placed.get(id);
    if (!at) continue;
    obstacles.push([
      at.x + CITY_FOOTPRINT.left,
      at.y + CITY_FOOTPRINT.top,
      CITY_FOOTPRINT.right - CITY_FOOTPRINT.left,
      CITY_FOOTPRINT.bottom - CITY_FOOTPRINT.top,
    ]);
  }
  return obstacles;
}

/** 中間マスが経路のどこに居るか。動かすのは `t` だけ。 */
interface RouteSlot {
  readonly a: NodePosition;
  readonly b: NodePosition;
  readonly diagonalFirst: boolean;
  /** 経路上の位置(0=a、1=b)。 */
  readonly t: number;
}

/**
 * 中間マスを、動いたあとの都市から引き直した経路の上に置き直す。
 *
 * **経路上の位置は「割合 t」ひとつで表す。** t から座標への変換は
 * `octilinearRoutePoint` が折れ点も含めて面倒を見てくれるので、
 * ここが t を動かしているかぎりマスは必ず経路の上に乗る。
 *
 * 折れ点にマスを固定する方式も試したが、路線がもともと真っ直ぐだったり
 * ほぼ真っ直ぐだったりすると**折れ点が都市とほぼ同じ場所に来て、
 * 都市のマーカーの下にマスが隠れた**(日本で32か所)。
 * 線のほうを折れ点を通して描けば固定は要らない(`railPolylines`)。
 */
function placeSquaresOnRoute(
  positions: ReadonlyMap<NodeId, NodePosition>,
  context: GameEngineContext,
  siblingCounts: ReadonlyMap<string, number>,
): { placed: Map<NodeId, NodePosition>; routes: Map<NodeId, RouteSlot> } {
  const placed = new Map<NodeId, NodePosition>(positions);
  const routes = new Map<NodeId, RouteSlot>();

  for (const [id, node] of context.graph.nodes) {
    if (isCityNode(node)) continue;
    const match = /^e(\d+)_(\d+)$/.exec(id);
    if (!match) continue;

    const edgeIndex = Number(match[1]);
    const k = Number(match[2]);
    const n = siblingCounts.get(`e${edgeIndex}_`) ?? 1;
    const [cityAId, cityBId] = node.between;
    const a = positions.get(NodeId(cityAId));
    const b = positions.get(NodeId(cityBId));
    if (!a || !b) continue;

    const diagonalFirst = edgeIndex % 2 === 1;
    const t = k / (n + 1);
    routes.set(id, { a, b, diagonalFirst, t });
    placed.set(id, octilinearRoutePoint(a, b, t, diagonalFirst));
  }
  return { placed, routes };
}

/**
 * 重なったマーカーを、**経路の上を滑らせて**離す。
 *
 * 都市に何本もの路線が集まるところでは、最初のマスが都市のマーカーに
 * 重なる(大阪や京都で実際にそうなっていた)。かといって自由に押し離すと
 * 経路から外れ、線がまた斜めになる。
 *
 * 動かすのは割合 t だけにする。座標への変換は経路が受け持つので、
 * どれだけ滑らせても線の角度は 0/45/90 のまま保たれる。
 * 都市は動かさない(地理を表しているため)。
 *
 * 地図の飾りと都市シンボル(`obstacles`)も避ける。ただし**マスは経路の上しか
 * 動けないので、避けきれないことがある**。無理に外へ出すと線が斜めになるので、
 * そのときは乗ったままにする。
 */
function slideSquaresAlongRoute(
  placed: Map<NodeId, NodePosition>,
  routes: ReadonlyMap<NodeId, RouteSlot>,
  projection: CountryProjection,
  obstacles: readonly Obstacle[],
): ReadonlyMap<NodeId, NodePosition> {
  const minSeparation = (projection.segmentLength ?? 64) * 0.55;

  const ids = [...placed.keys()];
  const pos = ids.map((id) => ({ ...placed.get(id)! }));
  const slots = ids.map((id) => routes.get(id));

  for (let pass = 0; pass < 80; pass++) {
    let moved = false;
    for (let i = 0; i < ids.length; i++) {
      const slot = slots[i];
      if (!slot) continue; // 都市は動かさない

      // 経路の向き。押し離しはこの向きの成分だけが効く。
      const ahead = octilinearRoutePoint(slot.a, slot.b, Math.min(1, slot.t + 0.02), slot.diagonalFirst);
      const behind = octilinearRoutePoint(slot.a, slot.b, Math.max(0, slot.t - 0.02), slot.diagonalFirst);
      const hx = ahead.x - behind.x;
      const hy = ahead.y - behind.y;
      const headingLength = Math.hypot(hx, hy);
      if (headingLength < 0.001) continue;

      let pushX = 0;
      let pushY = 0;
      for (let j = 0; j < ids.length; j++) {
        if (i === j) continue;
        const dx = pos[i].x - pos[j].x;
        const dy = pos[i].y - pos[j].y;
        const d = Math.hypot(dx, dy);
        if (d >= minSeparation) continue;
        const overlap = minSeparation - d;
        if (d < 0.001) {
          // 完全に重なっていると向きが決まらない。経路の先へ逃がす。
          pushX += slot.b.x - slot.a.x;
          pushY += slot.b.y - slot.a.y;
        } else {
          pushX += (dx / d) * overlap;
          pushY += (dy / d) * overlap;
        }
      }

      if (pushX === 0 && pushY === 0) continue;

      // 経路に沿った成分だけを取り出し、割合 t の変化に直す。
      const along = (pushX * hx + pushY * hy) / headingLength;

      // 経路の全長で割って t の増分にする。端は都市なので、都市の手前で止める。
      const routeLength = routeLengthOf(slot);
      if (routeLength < 0.001) continue;
      const margin = Math.min(0.45, minSeparation / routeLength);
      const nextT = Math.min(1 - margin, Math.max(margin, slot.t + (along * 0.4) / routeLength));
      if (Math.abs(nextT - slot.t) < 0.0005) continue;
      slots[i] = { ...slot, t: nextT };
      pos[i] = octilinearRoutePoint(slot.a, slot.b, nextT, slot.diagonalFirst);
      moved = true;
    }
    if (!moved) break;
  }

  slideOffObstacles(pos, slots, obstacles, minSeparation);

  const result = new Map(placed);
  ids.forEach((id, i) => result.set(id, pos[i]));
  return result;
}

/** マスの当たり判定(中心が矩形の中にあるか)。矩形をマスの半分ぶん膨らませて判定する。 */
function squareHitsBox(at: NodePosition, box: Obstacle): boolean {
  return (
    at.x > box[0] - SQUARE_FOOTPRINT.right &&
    at.x < box[0] + box[2] + SQUARE_FOOTPRINT.right &&
    at.y > box[1] - SQUARE_FOOTPRINT.bottom &&
    at.y < box[1] + box[3] + SQUARE_FOOTPRINT.bottom
  );
}

/**
 * 飾りや都市シンボルに乗ってしまったマスを、**経路の上を1次元で探して**
 * いちばん近い空きへずらす。マスどうしの押し離しが落ち着いたあとに一度だけ行う。
 *
 * 押し離しと同じ「力を足し合わせる」やり方では動かせなかった。理由は2つあって、
 * どちらも実測で分かった。
 *
 *   - **力が打ち消し合う。** ボリビアの森のように飾りが密集していると、
 *     ある木から逃げる向きと隣の木から逃げる向きが逆になり、和がほぼ0になる。
 *   - **マスどうしの押し離しに埋もれる。** あちらは半径46pxの円を離す強い力で、
 *     飾りから出るぶんの押しはその中に紛れてしまう。
 *
 * 探索なら「どこなら空いているか」を直接聞けるので、この2つとも起きない。
 * **見つからなければ動かさない。** 経路から外すと線が斜めになるため
 * (0/45/90度だけで描く約束。このファイル冒頭を参照)。
 */
function slideOffObstacles(
  pos: NodePosition[],
  slots: (RouteSlot | undefined)[],
  obstacles: readonly Obstacle[],
  minSeparation: number,
): void {
  const STEP_PX = 2;

  for (let i = 0; i < slots.length; i++) {
    const slot = slots[i];
    if (!slot) continue;
    if (!obstacles.some((box) => squareHitsBox(pos[i], box))) continue;

    const routeLength = routeLengthOf(slot);
    if (routeLength < 0.001) continue;
    // 探索の範囲は押し離しのときより広く取る。あちらの「都市の中心から半径46px」は
    // 都市マーカーを隠さないための代用で、ここでは都市の枠そのものを障害物として
    // 見ているので要らない。実測では、この制限だけに阻まれていたマスが6個あった。
    const margin = Math.min(0.45, (SQUARE_FOOTPRINT.right + CITY_FOOTPRINT.right) / routeLength);
    const stepT = STEP_PX / routeLength;
    const steps = Math.ceil((1 - 2 * margin) / stepT);
    // この経路に関係のある飾りだけに絞る(全部見ると盤面ぜんぶで数百万回になる)。
    const nearby = obstacles.filter((box) => boxNearRoute(box, slot));

    let fallback: NodePosition | null = null;
    let fallbackT = slot.t;
    let best: NodePosition | null = null;
    let bestT = slot.t;

    for (let k = 1; k <= steps && !best; k++) {
      for (const direction of [1, -1]) {
        const t = Math.min(1 - margin, Math.max(margin, slot.t + direction * k * stepT));
        if (Math.abs(t - slot.t) < 1e-9) continue;
        const at = octilinearRoutePoint(slot.a, slot.b, t, slot.diagonalFirst);
        if (nearby.some((box) => squareHitsBox(at, box))) continue;
        if (!fallback) {
          fallback = at;
          fallbackT = t;
        }
        // ほかのマーカーに寄りすぎる位置は避ける。空きが無ければ fallback を使う。
        const crowded = pos.some((other, j) => j !== i && Math.hypot(at.x - other.x, at.y - other.y) < minSeparation * 0.8);
        if (!crowded) {
          best = at;
          bestT = t;
          break;
        }
      }
    }

    const chosen = best ?? fallback;
    if (!chosen) continue; // 経路上に空きが無い。線を曲げるより、乗ったままにする
    slots[i] = { ...slot, t: best ? bestT : fallbackT };
    pos[i] = chosen;
  }
}

/** 経路の外接矩形の近くにある飾りだけを拾う。 */
function boxNearRoute(box: Obstacle, slot: RouteSlot): boolean {
  const corner = octilinearCorner(slot.a, slot.b, slot.diagonalFirst);
  const pad = SQUARE_FOOTPRINT.right + 1;
  const minX = Math.min(slot.a.x, slot.b.x, corner.x) - pad;
  const maxX = Math.max(slot.a.x, slot.b.x, corner.x) + pad;
  const minY = Math.min(slot.a.y, slot.b.y, corner.y) - pad;
  const maxY = Math.max(slot.a.y, slot.b.y, corner.y) + pad;
  return box[0] <= maxX && box[0] + box[2] >= minX && box[1] <= maxY && box[1] + box[3] >= minY;
}

function routeLengthOf(slot: RouteSlot): number {
  const corner = octilinearCorner(slot.a, slot.b, slot.diagonalFirst);
  return (
    Math.hypot(corner.x - slot.a.x, corner.y - slot.a.y) +
    Math.hypot(slot.b.x - corner.x, slot.b.y - corner.y)
  );
}

/**
 * 路線を描くための折れ線。**折れ点を必ず通す。**
 *
 * 線を「隣り合うマスを直線で結ぶ」だけにすると、折れ点がマスとマスのあいだに
 * 来たときにそこを斜めに突っ切ってしまう。マスの位置とは切り離して、
 * 経路そのものを描くのが正しい。
 */
export function railPolylines(
  context: GameEngineContext,
  positions: ReadonlyMap<NodeId, NodePosition>,
): { points: readonly NodePosition[]; kind: "rail" | "sea"; between: readonly [string, string] }[] {
  const byEdge = new Map<number, { ids: NodeId[]; between: readonly [string, string]; kind: "rail" | "sea" }>();
  for (const [id, node] of context.graph.nodes) {
    if (isCityNode(node)) continue;
    const match = /^e(\d+)_(\d+)$/.exec(id);
    if (!match) continue;
    const edgeIndex = Number(match[1]);
    const entry = byEdge.get(edgeIndex);
    const kind = "edgeKind" in node && node.edgeKind === "sea" ? "sea" : "rail";
    if (entry) entry.ids.push(id);
    else byEdge.set(edgeIndex, { ids: [id], between: node.between, kind });
  }

  const lines: { points: readonly NodePosition[]; kind: "rail" | "sea"; between: readonly [string, string] }[] = [];
  for (const [edgeIndex, { ids, between, kind }] of byEdge) {
    const a = positions.get(NodeId(between[0]));
    const b = positions.get(NodeId(between[1]));
    if (!a || !b) continue;
    const corner = octilinearCorner(a, b, edgeIndex % 2 === 1);
    const ordered = [...ids].sort(
      (x, y) => Number(/_(\d+)$/.exec(x)![1]) - Number(/_(\d+)$/.exec(y)![1]),
    );
    const squares = ordered.map((id) => positions.get(id)!).filter(Boolean);

    // 折れ点は、1本目の脚に乗っているマスの直後に入れる。
    // 「線分 a–corner の上にあるか」は、a までの距離と corner までの距離の和が
    // a–corner の長さと一致するかで判定する(遠回りなら和のほうが大きくなる)。
    const leg1Length = Math.hypot(corner.x - a.x, corner.y - a.y);
    const onFirstLeg = (p: NodePosition) =>
      Math.hypot(p.x - a.x, p.y - a.y) + Math.hypot(p.x - corner.x, p.y - corner.y) <=
      leg1Length + 0.01;
    const first: NodePosition[] = [];
    const second: NodePosition[] = [];
    for (const p of squares) (onFirstLeg(p) ? first : second).push(p);

    lines.push({ points: [a, ...first, corner, ...second, b], kind, between });
  }
  return lines;
}

/**
 * マーカー同士が重ならないよう、最小間隔を保つ位置に緩めていく。
 *
 * 都市の座標は経度緯度そのままなので、京都・大阪・奈良のように実際に近い都市は
 * 盤面上でもマーカーの大きさより近くなり、駒やマスが団子になって何が何だか
 * 分からなくなる。そこで**近すぎる組を互いに押し離す**処理を数十回まわす。
 *
 * 都市は地理を保ちたいので動きにくくし(重み小)、中間マスは自由に動かす。
 * 路線は隣り合うノードの位置を結んで描くので、押し離しても線は繋がったままになる。
 */
function relaxOverlaps(
  positions: Map<NodeId, NodePosition>,
  context: GameEngineContext,
  projection: CountryProjection,
): Map<NodeId, NodePosition> {
  // 最小間隔は中間マスの目安距離に比例させる(盤面の縮尺が変わっても破綻しないよう)。
  const minSeparation = (projection.segmentLength ?? 64) * 0.55;
  const iterations = 90;
  /** 都市は動かしにくく、中間マスは動かしやすくする重み。 */
  const CITY_MOBILITY = 0.25;
  const SQUARE_MOBILITY = 1;

  /**
   * 都市が本来の位置から離れてよい上限(盤面座標)。
   *
   * 押し離しを無制限にすると、岸沿いの町が海側へ押し出されて「海に浮いた町」に
   * 見えてしまう。海岸線は縁取りで少し外へ広げてあるので(terrain-layer.tsx の
   * COAST_BUFFER)、その範囲に収まるだけしか動かさなければ陸から出ない。
   * 中間マスには上限をかけない——湾を横切る路線の上など、海の上にあってよい。
   */
  const CITY_DRIFT_LIMIT = minSeparation * 0.34;

  /**
   * その点が陸の上にあるか。都市を押し離すときに、海へ出さないために使う。
   * 判定は「海に浮いている都市」のテストと同じ考え方(多角形の内側か、縁に近いか)。
   */
  const landPolygons = context.content.terrain.landPolygons.map((poly) =>
    poly.map(([lo, la]) => {
      const at = projectPoint(lo, la, projection);
      return [at.x, at.y] as const;
    }),
  );
  const isOnLand = (x: number, y: number): boolean => {
    for (const poly of landPolygons) {
      let hit = false;
      for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        const [xi, yi] = poly[i];
        const [xj, yj] = poly[j];
        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit;
      }
      if (hit) return true;
    }
    return false;
  };

  const ids = [...positions.keys()];
  const xs = new Float64Array(ids.length);
  const ys = new Float64Array(ids.length);
  const mobility = new Float64Array(ids.length);
  // 都市の本来の位置(ここからの距離を上限で抑える)。
  const anchorX = new Float64Array(ids.length);
  const anchorY = new Float64Array(ids.length);
  const isCity = new Uint8Array(ids.length);
  ids.forEach((id, i) => {
    const at = positions.get(id)!;
    xs[i] = at.x;
    ys[i] = at.y;
    anchorX[i] = at.x;
    anchorY[i] = at.y;
    const node = context.graph.nodes.get(id);
    isCity[i] = node !== undefined && isCityNode(node) ? 1 : 0;
    mobility[i] = isCity[i] ? CITY_MOBILITY : SQUARE_MOBILITY;
  });

  /** 都市なら、本来の位置から上限を超えないところまで引き戻して動かす。 */
  const move = (i: number, nx: number, ny: number) => {
    if (!isCity[i]) {
      xs[i] = nx;
      ys[i] = ny;
      return;
    }
    const dx = nx - anchorX[i];
    const dy = ny - anchorY[i];
    const drift = Math.hypot(dx, dy);
    // 距離の上限に加えて、**陸から出ないこと**も条件にする。
    //
    // 上限だけで抑えていたときは、盤面が詰まっている国で全都市が上限いっぱい
    // (世界一周では28px=約3度)まで押され、15都市が海へ出ていた。
    // 都市の座標を内陸へ寄せて直そうとすると、混み具合が変わって押される向きも
    // 変わり、別の都市が出る(実測で15件→16件に増えた)。もぐら叩きになる。
    //
    // 押し離しは見やすさのための処理なので、**陸を出るくらいなら重なったままの
    // ほうがよい。** 出るなら、出ない範囲まで戻して置く。
    const limited = drift > CITY_DRIFT_LIMIT ? CITY_DRIFT_LIMIT / drift : 1;
    let px = anchorX[i] + dx * limited;
    let py = anchorY[i] + dy * limited;
    if (!isOnLand(px, py)) {
      // 元の位置と押された位置のあいだで、陸に残れるいちばん遠い点を探す。
      let lo = 0;
      let hi = limited;
      for (let step = 0; step < 8; step++) {
        const mid = (lo + hi) / 2;
        if (isOnLand(anchorX[i] + dx * mid, anchorY[i] + dy * mid)) lo = mid;
        else hi = mid;
      }
      px = anchorX[i] + dx * lo;
      py = anchorY[i] + dy * lo;
    }
    xs[i] = px;
    ys[i] = py;
  };

  const cell = minSeparation;
  for (let pass = 0; pass < iterations; pass++) {
    // 近い組だけを見るために、毎回グリッドに振り分ける(総当たりだと重い)。
    const buckets = new Map<string, number[]>();
    for (let i = 0; i < ids.length; i++) {
      const key = `${Math.floor(xs[i] / cell)},${Math.floor(ys[i] / cell)}`;
      const bucket = buckets.get(key);
      if (bucket) bucket.push(i);
      else buckets.set(key, [i]);
    }

    let moved = false;
    for (let i = 0; i < ids.length; i++) {
      const cx = Math.floor(xs[i] / cell);
      const cy = Math.floor(ys[i] / cell);
      for (let gx = cx - 1; gx <= cx + 1; gx++) {
        for (let gy = cy - 1; gy <= cy + 1; gy++) {
          for (const j of buckets.get(`${gx},${gy}`) ?? []) {
            if (j <= i) continue;
            let dx = xs[j] - xs[i];
            let dy = ys[j] - ys[i];
            let distance = Math.hypot(dx, dy);
            if (distance >= minSeparation) continue;
            if (distance < 1e-6) {
              // 完全に重なっている場合は、添字から決まる向きへずらす(毎回同じ結果になるように)。
              dx = Math.cos(i * 2.399963);
              dy = Math.sin(i * 2.399963);
              distance = 1;
            }
            const push = (minSeparation - distance) / distance;
            const total = mobility[i] + mobility[j];
            if (total === 0) continue;
            const si = (push * mobility[i]) / total;
            const sj = (push * mobility[j]) / total;
            move(i, xs[i] - dx * si, ys[i] - dy * si);
            move(j, xs[j] + dx * sj, ys[j] + dy * sj);
            moved = true;
          }
        }
      }
    }
    if (!moved) break; // これ以上重なりが無ければ早めに切り上げる
  }

  const relaxed = new Map<NodeId, NodePosition>();
  ids.forEach((id, i) => relaxed.set(id, { x: xs[i], y: ys[i] }));
  return relaxed;
}
