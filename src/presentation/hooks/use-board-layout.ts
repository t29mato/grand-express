import { useMemo } from "react";
import { NodeId } from "../../domain/shared-kernel/ids";
import { isCityNode } from "../../domain/board/node";
import { CountryProjection, projectPoint } from "../../domain/board/board-projection";
import { octilinearDirection, octilinearRoutePoint } from "./octilinear-route";
import { GameEngineContext } from "../../application/game-engine-context";

export interface NodePosition {
  readonly x: number;
  readonly y: number;
}

/**
 * 盤面ノードのSVG座標を計算する(Presentation層の責務。ADR-0003)。
 *
 * 都市は経度緯度から投影する。路線上の中間マスは、**縦・横・45度の3方向だけを使う経路**
 * (`octilinear-route.ts`)の上に等間隔で並べたうえで、現行コードと同じ規則で
 * 路線に垂直な向きへずらす(jitter)。路線の線は隣り合うノードを結んで描かれるので、
 * マスをこの経路に乗せるだけで線も同じ形になる。
 *
 * このずれは見た目の変化だけでなく、**同じ都市から似た方向へ延びる路線の中間マスが
 * 重なるのを防ぐ**役割がある(路線番号 `ei` に依存してずれ幅が変わるため、
 * 平行に近い路線同士が離れる)。当初は簡略化して直線配置にしていたが、
 * 都市を増やしたことでマスの重なりが目立つようになったため復元した。
 */
export function useBoardLayout(context: GameEngineContext): ReadonlyMap<NodeId, NodePosition> {
  return useMemo(() => {
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
      const t = k / (n + 1);
      // 現行コードの `((ei*7+k*13)%5-2)*5`。ずれ幅の単位は盤面の縮尺に追従させるため、
      // 固定値ではなく中間マスの目安距離(seg)から導く(legacyのseg=48で約4.8)。
      const jitterUnit = (projection.segmentLength ?? 64) / 10;
      const jitter = (((edgeIndex * 7 + k * 13) % 5) - 2) * jitterUnit;
      // 45度の脚を先にするかは路線ごとに交互に変える(根元での重なりを避ける)。
      const diagonalFirst = edgeIndex % 2 === 1;
      const at = octilinearRoutePoint(a, b, t, diagonalFirst);
      // ずらす向きは全体の向きではなく、その場の脚に直角にとる。
      const heading = octilinearDirection(a, b, t, diagonalFirst);
      positions.set(id, {
        x: at.x + -heading.y * jitter,
        y: at.y + heading.x * jitter,
      });
    }
    return relaxOverlaps(positions, context, projection);
  }, [context]);
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
    if (drift <= CITY_DRIFT_LIMIT) {
      xs[i] = nx;
      ys[i] = ny;
      return;
    }
    const k = CITY_DRIFT_LIMIT / drift;
    xs[i] = anchorX[i] + dx * k;
    ys[i] = anchorY[i] + dy * k;
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
