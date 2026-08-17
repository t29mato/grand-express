import { CityId, NodeId } from "../shared-kernel/ids";
import { CountryProjection, projectedDistance, segmentCount } from "./board-projection";
import { BoardGraph } from "./board-graph";
import { City, Edge } from "./city";
import { h32 } from "./deterministic-hash";
import { BoardNode } from "./node";


function connect(
  adjacency: Map<NodeId, NodeId[]>,
  a: NodeId,
  b: NodeId,
): void {
  adjacency.get(a)!.push(b);
  adjacency.get(b)!.push(a);
}

/**
 * 都市と路線(edges)から盤面グラフを構築する(現行コードの `buildGraph` を移植)。
 *
 * 各路線には、投影後の距離に応じて0〜9個の中間マスが決定的に挿入される
 * (どのマスがquiz/blue/red/cardになるかは `h32` ハッシュで決まるため、
 * 同じ国データからは常に同じ盤面が生成される)。
 *
 * **0個のときは都市どうしが直接つながる。** 近すぎる町にマスを挟むと、
 * マスの間隔が路線の長さの半分まで潰れるため(`segmentCount` を参照)。
 */
/**
 * 出発地の周りで、出来事マスを**静かなマスに倒す割合**(距離ごと)。
 *
 * ## なぜ要るか
 *
 * 遊ぶ人から「序盤に強制イベントが固まりすぎて走り出せない」という報せがあった。
 * **測ったら、序盤の密度は盤面全体と同じだった**(出発地から10歩以内で
 * 止まるマスが60.6%、盤面全体も57〜70%)。**固まってはいない。**
 *
 * ではなぜそう感じるのか。序盤は
 *
 * - **町が密**(止まるマスの約半分が町。出発地は路線が集まる場所なので当然)
 * - **どの町も初めて**なので、町の画面を最後まで読む
 * - 持ち物も資金の勢いも無く、出来事を受け止める余裕がない
 *
 * つまり**同じ密度でも序盤がいちばん重い。**そこで、出発地の周りだけ
 * 出来事を薄くして、走り出す間を作る。**町には触らない**——町で物件を買うのが
 * この遊びの本体で、そこを削ると遊びが痩せる。
 *
 * 距離で薄める度合いを変えるのは、**出発地の周りを永久の死角にしないため。**
 * 一律に消すと、そこへ戻ってきたときに何も起きない土地が残り続ける。
 */
const QUIET_BIAS_BY_DISTANCE: readonly { readonly within: number; readonly quietPercent: number }[] = [
  { within: 4, quietPercent: 85 },
  { within: 8, quietPercent: 70 },
  { within: 12, quietPercent: 60 },
];

/**
 * 薄くしてよいのは、その盤面の中間マスの**この割合まで。**
 *
 * 距離だけで決めると、**小さい盤面では盤面全体が薄くなる。**実測で、
 * 茨城は「止まるマス」が盤面全体で58%→40%まで落ちた。12歩が小さい盤面の
 * ほとんどを覆うためで、これは「序盤を薄くする」ではなく「全部薄くする」になる。
 */
const MAX_QUIETENED_SHARE = 0.3;

/**
 * 薄くしたあとも、出発地の近くに**最低これだけは出来事を残す。**
 *
 * 割合だけで倒すと、小さい盤面では**丸ごと無音になる。**実測で、トルコは
 * 10歩以内の出来事が9個→**0個**になった。この遊びはクイズで土地を覚えるものなので、
 * 序盤にクイズが1問も無いのは薄めすぎである。**遠いほうから戻す**
 * (出発直後は静かなまま、少し走ると出来事が現れる)。
 */
const MIN_EVENTS_NEAR_START = 4;

/** 文字列から決まった値を作る(マスのidを種にするため)。 */
function hashNodeId(id: string): number {
  let acc = 0;
  for (let i = 0; i < id.length; i++) acc = Math.imul(acc, 31) + id.charCodeAt(i);
  return h32(acc >>> 0);
}

export function buildBoardGraph(
  cities: readonly City[],
  edges: readonly Edge[],
  projection: CountryProjection,
  /**
   * 出発地。渡すと**その周りの出来事マスを薄くする。**
   * 渡さなければ何もしない(既存の呼び出しと単体テストのため)。
   */
  startCityId?: CityId,
): BoardGraph {
  const cityById = new Map(cities.map((c) => [c.id, c]));
  const nodes = new Map<NodeId, BoardNode>();
  const adjacency = new Map<NodeId, NodeId[]>();

  for (const city of cities) {
    const nodeId = NodeId(city.id);
    nodes.set(nodeId, { id: nodeId, type: "city", cityId: city.id, regionId: city.regionId });
    adjacency.set(nodeId, []);
  }

  edges.forEach((edge, edgeIndex) => {
    const { from: aId, to: bId } = edge;
    const a = cityById.get(aId);
    const b = cityById.get(bId);
    if (!a || !b) {
      throw new Error(
        `edges[${edgeIndex}] references an unknown city: ${aId} / ${bId}`,
      );
    }
    const distance = projectedDistance(a, b, projection);
    const n = segmentCount(distance, projection);

    const chain: NodeId[] = [NodeId(a.id)];
    for (let k = 1; k <= n; k++) {
      const t = k / (n + 1);
      const nodeId = NodeId(`e${edgeIndex}_${k}`);
      const regionId = t < 0.5 ? a.regionId : b.regionId;
      const between = [a.id, b.id] as const;
      const edgeKind = edge.kind;

      // マスの配分。**半分は何も起きない `quiet` にしてある。**
      //
      // 以前は quiz 50% / blue 30% / red 20% で、**中間マスの100%が何かを起こしていた。**
      // 止まれば必ずモーダルが開き、閉じるまで盤面が見えない。
      // 「停止マスが多すぎてテンポが悪い」という指摘はここを指している。
      //
      // カードマス(星)は廃止した。アイテムは屋台とクイズの褒美で十分手に入り、
      // マスの種類が4つあると盤面の見分けが付きにくかった。
      //
      // **クイズの割合は落とすが、出題の総数はさほど減らない。**盤面1枚の
      // マスは数百あり、1ゲームで踏むのはその一部でしかないため。
      const roll = h32(edgeIndex * 97 + k) % 20;
      let node: BoardNode;
      if (roll < 10) {
        node = { id: nodeId, type: "quiet", between, regionId, edgeKind };
      } else if (roll < 15) {
        node = { id: nodeId, type: "quiz", between, regionId, edgeKind };
      } else if (roll < 18) {
        node = { id: nodeId, type: "blue", between, regionId, edgeKind };
      } else {
        node = { id: nodeId, type: "red", between, regionId, edgeKind };
      }

      nodes.set(nodeId, node);
      adjacency.set(nodeId, []);
      chain.push(nodeId);
    }
    chain.push(NodeId(b.id));

    for (let i = 0; i < chain.length - 1; i++) {
      connect(adjacency, chain[i], chain[i + 1]);
    }
  });

  if (startCityId) quietenAroundStart(nodes, adjacency, startCityId);

  return { nodes, adjacency };
}

/**
 * 出発地の周りの出来事マスを、距離に応じて静かなマスに倒す。
 *
 * **倒す向きにしか動かさない。**静かなマスを出来事に変えることはないので、
 * この処理で中断が増えることはない。
 */
function quietenAroundStart(
  nodes: Map<NodeId, BoardNode>,
  adjacency: Map<NodeId, NodeId[]>,
  startCityId: CityId,
): void {
  const start = NodeId(startCityId);
  if (!nodes.has(start)) return;

  const distance = new Map<NodeId, number>([[start, 0]]);
  const queue: NodeId[] = [start];
  const furthest = QUIET_BIAS_BY_DISTANCE[QUIET_BIAS_BY_DISTANCE.length - 1].within;
  while (queue.length > 0) {
    const current = queue.shift()!;
    const step = distance.get(current)!;
    if (step >= furthest) continue;
    for (const next of adjacency.get(current) ?? []) {
      if (distance.has(next)) continue;
      distance.set(next, step + 1);
      queue.push(next);
    }
  }

  const isIntermediate = (node: BoardNode | undefined): boolean =>
    node !== undefined && node.type !== "city";
  const budget = Math.floor([...nodes.values()].filter(isIntermediate).length * MAX_QUIETENED_SHARE);
  if (budget <= 0) return;

  /*
   * **出発地に近い順に並べる。**同じ距離のマスは id 順にして、並びが実行ごとに
   * 変わらないようにする(同じ内容からは常に同じ盤面になる必要がある)。
   */
  const candidates = [...distance.entries()]
    .filter(([nodeId, step]) => step > 0 && isIntermediate(nodes.get(nodeId)))
    .sort((a, b) => a[1] - b[1] || String(a[0]).localeCompare(String(b[0])));

  let spent = 0;
  let eventsLeft = 0;
  const quietened: { readonly id: NodeId; readonly was: BoardNode }[] = [];
  for (const [nodeId, step] of candidates) {
    if (spent >= budget) break;
    const node = nodes.get(nodeId);
    // 町はそのまま。物件を買う場所を静かにしても意味がない。
    if (!node || node.type === "city") continue;
    // **予算は「実際に変えた数」だけ数える。**もともと静かなマスでも減らしていたころ、
    // 出発地の周りが元から静かな盤面(茨城など)は予算を使い切るだけで
    // ほとんど変わらなかった(実測 28→23個。ほかの盤面は半分以下になっていた)。
    if (node.type === "quiet") continue;
    const band = QUIET_BIAS_BY_DISTANCE.find((b) => step <= b.within);
    if (!band || hashNodeId(`quiet:${nodeId}`) % 100 >= band.quietPercent) {
      eventsLeft++;
      continue;
    }
    spent++;
    quietened.push({ id: nodeId, was: node });
    nodes.set(nodeId, { ...node, type: "quiet" });
  }

  // 無音になりすぎたら、**遠いほうから**戻す(出発直後は静かなままにしたいので)。
  for (let i = quietened.length - 1; i >= 0 && eventsLeft < MIN_EVENTS_NEAR_START; i--) {
    nodes.set(quietened[i].id, quietened[i].was);
    eventsLeft++;
  }
}

export function citiesToIds(cities: readonly City[]): readonly CityId[] {
  return cities.map((c) => c.id);
}
