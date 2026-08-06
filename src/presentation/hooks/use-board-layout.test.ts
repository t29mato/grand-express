import { describe, expect, it } from "vitest";
import { CountryId } from "../../domain/shared-kernel/ids";
import { buildBoardGraph } from "../../domain/board/board-graph-builder";
import { isCityNode } from "../../domain/board/node";
import { eventsFor } from "../../domain/board/money-event";
import { JsonCountryContentRepository } from "../../infrastructure/content/json-country-content-repository";
import { projectPoint } from "../../domain/board/board-projection";

/**
 * 盤面の見た目に直結する2つの性質を、実データで押さえる。
 *
 * 1. 町が海に浮いて見えないこと。マーカーの重なりをほぐす処理が都市を
 *    大きく動かすと、岸沿いの町が海側へ押し出されてしまう。
 * 2. 都市どうしのマーカーが重ならないこと。1のために動きを止めすぎると、
 *    今度は近い町が団子になる。
 *
 * ここでは配置処理そのものではなく**その入力条件**(都市が陸の上にあり、
 * 動かす上限が縁取りの内側に収まること)を確かめる。配置処理はReactフックで
 * DOMに依存するため、描画位置の実測はE2E側に置いている。
 */
describe("盤面配置の前提", () => {
  const repo = new JsonCountryContentRepository();
  const countries = ["bolivia", "japan", "india", "france", "world"] as const;

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

    const afloat = pack.cities
      .filter((city) => {
        const at = projectPoint(city.longitude, city.latitude, projection);
        return !landPx.some(
          (poly) =>
            pointInPolygon(at.x, at.y, poly) || distanceToPolygon(at.x, at.y, poly) <= COAST_BUFFER,
        );
      })
      .map((c) => c.id);
    expect(afloat, `${countryId}: 海に浮いている都市`).toEqual([]);
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

  it.each(countries)("%s: 中間マスは4種類そろっている", async (countryId) => {
    const pack = await repo.load(CountryId(countryId));
    const graph = buildBoardGraph(pack.cities, pack.edges, pack.projection);
    const kinds = new Set<string>();
    for (const node of graph.nodes.values()) if (!isCityNode(node)) kinds.add(node.type);
    expect([...kinds].sort()).toEqual(["blue", "card", "quiz", "red"]);
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
});
