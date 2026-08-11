import { describe, expect, it } from "vitest";
import { CountryId, NodeId } from "../../domain/shared-kernel/ids";
import { buildBoardGraph } from "../../domain/board/board-graph-builder";
import { isCityNode } from "../../domain/board/node";
import { eventsFor } from "../../domain/board/money-event";
import { JsonCountryContentRepository } from "../../infrastructure/content/json-country-content-repository";
import { projectPoint } from "../../domain/board/board-projection";
import { GameEngineContext, createGameEngineContext } from "../../application/game-engine-context";
import { renderHook } from "@testing-library/react";
import { NodePosition, railPolylines, useBoardLayout } from "./use-board-layout";

/**
 * 盤面の見た目に直結する2つの性質を、実データで押さえる。
 *
 * 1. 町が海に浮いて見えないこと。マーカーの重なりをほぐす処理が都市を
 *    大きく動かすと、岸沿いの町が海側へ押し出されてしまう。
 * 2. 都市どうしのマーカーが重ならないこと。1のために動きを止めすぎると、
 *    今度は近い町が団子になる。
 *
 * **投影しただけの座標ではなく、実際に描かれる座標で見る。**
 *
 * 以前はここで `projectPoint` の結果だけを見ていた。都市の元の座標は5盤面とも
 * 陸の上にあるので、この検査は常に0件で通っていた。ところが押し離し
 * (`relaxOverlaps`)が都市を最大 `CITY_DRIFT_LIMIT` まで動かすため、
 * **描かれる位置では28都市が海へ出ていた**(リマ27px・リスボン26px など)。
 * 「E2Eで見ている」と書いてあったが、そんなE2Eは無かった。
 *
 * 通る検査が安心を作ってしまうのがいちばん悪い。フックを実際に回して、
 * 出てきた座標で判定する。
 */
describe("盤面配置の前提", () => {
  const repo = new JsonCountryContentRepository();
  const countries = ["bolivia", "japan", "india", "france", "world", "ibaraki"] as const;

  /**
   * 配置は国ごとに一度だけ計算して使い回す。
   *
   * 2026-08-11、このファイルが**全体実行のときだけ落ちるようになっていた。**
   * 落ちる国は毎回違い、内容は「5秒でタイムアウト」。中身が壊れたのではなく、
   * 計算が間に合っていなかった。実測で `computeBoardLayout` は
   * 世界一周が530ms、日本199ms、ボリビア140ms。テストごとに計算し直していたので、
   * 他のテストと並んでCPUを取り合うと5秒を越えることがあった。
   *
   * たまに落ちる検査は、**落ちても「また例のやつか」で流されるようになる**ので、
   * 遅さのほうを直す。
   */
  const layoutCache = new Map<string, { context: GameEngineContext; positions: ReadonlyMap<NodeId, NodePosition> }>();
  async function layoutOf(countryId: string) {
    const cached = layoutCache.get(countryId);
    if (cached) return cached;
    const context = createGameEngineContext(await repo.load(CountryId(countryId)));
    const { result } = renderHook(() => useBoardLayout(context));
    const entry = { context, positions: result.current };
    layoutCache.set(countryId, entry);
    return entry;
  }

  function pointInPolygon(x: number, y: number, poly: readonly (readonly [number, number])[]) {
    let hit = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const [xi, yi] = poly[i];
      const [xj, yj] = poly[j];
      if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit;
    }
    return hit;
  }

  function distanceToPolygon(x: number, y: number, poly: readonly (readonly [number, number])[]) {
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

  it.each(countries)("%s: すべての都市が陸の上にある", async (countryId) => {
    // かつては陸を一律に外へ広げて描いていたが、関門海峡(幅1.3)や瀬戸内海が
    // 埋まって本州・四国・九州が地続きになってしまったのでやめた。
    // いまは海岸線そのものを都市に合わせて描いてある。
    const COAST_BUFFER = 0;
    const pack = await repo.load(CountryId(countryId));
    const projection = pack.projection;
    const landPx = pack.terrain.landPolygons.map((poly) =>
      poly.map(([lo, la]) => {
        const at = projectPoint(lo, la, projection);
        return [at.x, at.y] as const;
      }),
    );

    // 実際に描かれる位置(押し離しを通したあと)で判定する。
    const { positions } = await layoutOf(countryId);

    const onLand = (x: number, y: number) =>
      landPx.some(
        (poly) => pointInPolygon(x, y, poly) || distanceToPolygon(x, y, poly) <= COAST_BUFFER,
      );

    const afloat = pack.cities
      .filter((city) => {
        const at = positions.get(NodeId(city.id));
        if (!at) return false;
        return !onLand(at.x, at.y);
      })
      .map((c) => c.id);
    expect(afloat, `${countryId}: 描画位置で海に浮いている都市`).toEqual([]);
  });

  it.each(countries)("%s: 都市どうしが近すぎない(配置で押し離せる範囲に収まる)", async (countryId) => {
    // 押し離しの上限(CITY_DRIFT_LIMIT)は片側ぶんなので、2都市で最大その2倍離れる。
    // 元から離れすぎて近い都市は、いくら押しても重なったままになる。
    const pack = await repo.load(CountryId(countryId));
    const seg = pack.projection.segmentLength ?? 64;
    const driftLimit = seg * 0.55 * 0.34;
    const markerDiameter = 19;

    const projected = pack.cities.map((c) => ({ id: c.id, at: projectPoint(c.longitude, c.latitude, pack.projection) }));
    const tooClose: string[] = [];
    for (let i = 0; i < projected.length; i++) {
      for (let j = i + 1; j < projected.length; j++) {
        const d = Math.hypot(
          projected[i].at.x - projected[j].at.x,
          projected[i].at.y - projected[j].at.y,
        );
        if (d + driftLimit * 2 < markerDiameter) {
          tooClose.push(`${projected[i].id}-${projected[j].id}(${d.toFixed(0)})`);
        }
      }
    }
    expect(tooClose, `${countryId}: 押し離しても重なる都市の組`).toEqual([]);
  });

  it.each(countries)("%s: 湖が画面に出る大きさで、陸の上にある", async (countryId) => {
    // 湖は **2つの理由で静かに消える。**
    //
    //   1. 半径の単位を間違える。terrain-layer は rx をピクセルとして渡すのに、
    //      インドとフランスは度のつもりで書かれていて 1px 未満になっていた
    //      (インド5件・フランス3件が、誰にも気づかれず消えていた)
    //   2. 中心が陸の外にある。湖は陸地でクリップして描かれるので、
    //      海側にあると半径が正しくても出ない
    //
    // どちらもエラーにならない。半径だけ直して「直った」と言うと1のほうしか
    // 塞げないので、両方をここで見る。
    const pack = await repo.load(CountryId(countryId));
    const { projection } = pack;
    const landPx = pack.terrain.landPolygons.map((poly) =>
      poly.map(([lo, la]) => {
        const at = projectPoint(lo, la, projection);
        return [at.x, at.y] as const;
      }),
    );

    const tooSmall: string[] = [];
    const offLand: string[] = [];
    pack.terrain.lakes.forEach(([lo, la, rx, ry], i) => {
      if (rx < 2 || ry < 2) tooSmall.push(`lakes[${i}] ${rx}×${ry}px`);
      const at = projectPoint(lo, la, projection);
      const onLand = landPx.some(
        (poly) =>
          pointInPolygon(at.x, at.y, poly) || distanceToPolygon(at.x, at.y, poly) <= 0,
      );
      if (!onLand) offLand.push(`lakes[${i}] (${lo}, ${la})`);
    });

    expect(tooSmall, `${countryId}: 小さすぎて見えない湖(半径は度ではなくpxで書く)`).toEqual([]);
    expect(offLand, `${countryId}: 陸の外にあってクリップで消える湖`).toEqual([]);
  });

  it.each(countries)("%s: 中間マスは3種類そろっている", async (countryId) => {
    const pack = await repo.load(CountryId(countryId));
    const graph = buildBoardGraph(pack.cities, pack.edges, pack.projection);
    const kinds = new Set<string>();
    for (const node of graph.nodes.values()) if (!isCityNode(node)) kinds.add(node.type);
    // カードマス(★)は廃止した。マスの種類が4つあると見分けが付きにくく、
    // アイテムは屋台とクイズの褒美で十分手に入るため。
    expect([...kinds].sort()).toEqual(["blue", "quiz", "red"]);
  });

  it.each(countries)("%s: どの地方・どの月でも青マス・赤マスの出来事を引ける", async (countryId) => {
    // 出来事が1つも無い組み合わせがあると、そのマスに止まった時点で手番が止まる。
    const pack = await repo.load(CountryId(countryId));
    for (const regionId of pack.regions.keys()) {
      for (let month = 0; month < 12; month++) {
        for (const kind of ["gain", "loss"] as const) {
          expect(
            eventsFor(pack.moneyEvents, kind, regionId, month).length,
            `${countryId}/${regionId}/${month}月/${kind}`,
          ).toBeGreaterThan(0);
        }
      }
    }
  });

  it("日本の北国は、冬に減る出来事のほうが多くなる", async () => {
    // 雪の事故や雪下ろしが冬にだけ起こるようにした結果、季節で偏りが出る。
    // 「冬の日本海側は赤が増える」を数で確かめる。
    const pack = await repo.load(CountryId("japan"));
    const north = [...pack.regions.keys()].find((r) => r === "nor")!;
    const count = (kind: "gain" | "loss", month: number) =>
      eventsFor(pack.moneyEvents, kind, north, month).length;

    const winter = 9; // 1月
    const summer = 3; // 7月
    expect(count("loss", winter)).toBeGreaterThan(count("gain", winter));
    // 夏は偏らない(冬だけの現象であることを示す)。
    expect(count("loss", summer)).toBeLessThanOrEqual(count("gain", summer));
  });

  it.each(countries)("%s: 出来事のIDが重複していない", async (countryId) => {
    const pack = await repo.load(CountryId(countryId));
    const ids = pack.moneyEvents.map((e) => e.id);
    expect(new Set(ids).size, `${countryId}: 出来事IDの重複`).toBe(ids.length);
  });

  it.each(countries)("%s: すべての路線に線が引かれている", async (countryId) => {
    // 線を中間マスから割り出す作りにすると、**マスが1つも無い路線の線が丸ごと消える。**
    // いまは `segmentCount` が必ず1以上を返すので直結の路線は無いが、
    // かつて短い路線を直結にしたときは日本で20本、世界一周で36本が該当した。
    // 消えても他のテストは通ってしまう(グラフは繋がったままなので移動もできる)。
    // 盤面を見て初めて分かる壊れかたなので、ここで数を突き合わせる。
    const pack = await repo.load(CountryId(countryId));
    const { context, positions } = await layoutOf(countryId);
    const lines = railPolylines(context, positions);

    expect(lines.length, `${countryId}: 描かれた線の数が路線の数と合わない`).toBe(pack.edges.length);
    // 航路(島へ渡る線)は見た目が違うので、種類も取り違えていないことを見る。
    const seaCount = pack.edges.filter((e) => e.kind === "sea").length;
    expect(lines.filter((l) => l.kind === "sea").length, `${countryId}: 航路の数`).toBe(seaCount);
  });
});
