import { describe, expect, it } from "vitest";
import { CountryId, NodeId } from "../../domain/shared-kernel/ids";
import { buildBoardGraph } from "../../domain/board/board-graph-builder";
import { PathfindingService } from "../../domain/board/pathfinding-service";
import { JsonCountryContentRepository } from "./json-country-content-repository";
import { ALL_COUNTRY_IDS } from "./all-country-ids";

/**
 * 「サイコロの目より多く進めてしまう」ことがないことを、**実際の3か国の盤面**で確かめる。
 *
 * 単体テストの小さなグラフでは、行き止まり・環状路・都市の連結度のばらつきといった
 * 実データ特有の形が再現できない。ここでは本番と同じ盤面グラフを組み立てて、
 * 選択肢として提示されるマスがすべて「ちょうどその歩数で行ける場所」であることを見る。
 */
describe("盤面の移動不変条件", () => {
  const repo = new JsonCountryContentRepository();
  const countries = ALL_COUNTRY_IDS;

  it.each(countries)("%s: 選べるマスは必ずサイコロの目ちょうどで行ける場所", async (countryId) => {
    const pack = await repo.load(CountryId(countryId));
    const graph = buildBoardGraph(pack.cities, pack.edges, pack.projection);
    const pathfinding = new PathfindingService(graph);
    const allNodes = [...graph.nodes.keys()];

    // 全ノード×全出目は数が多すぎるので、盤面全体に散らばるよう等間隔で抜き取る。
    const stride = Math.max(1, Math.floor(allNodes.length / 40));
    const samples = allNodes.filter((_, i) => i % stride === 0);

    for (const from of samples) {
      for (let steps = 1; steps <= 6; steps++) {
        const reachable = pathfinding.reachableNodes(from, steps);
        for (const [node, path] of reachable) {
          // 経路の長さ = 進んだマス数。これがサイコロの目と一致していなければ、
          // 「目より多く(あるいは少なく)進める」ことになる。
          expect(path.length, `${countryId}: ${from} → ${node} (出目${steps})`).toBe(steps);
          expect(path[path.length - 1]).toBe(node);

          // 経路の各ステップが実際につながっていること。
          let previous = from;
          for (const next of path) {
            expect(
              graph.adjacency.get(previous)?.includes(next),
              `${countryId}: ${previous} → ${next} は路線でつながっていない`,
            ).toBe(true);
            previous = next;
          }

          // 最短距離が出目を超えることはあり得ない(超えていたら瞬間移動している)。
          expect(pathfinding.distance(from, node)).toBeLessThanOrEqual(steps);
        }
      }
    }
  });

  it.each(countries)("%s: すべての都市が投影の範囲に収まっている", async (countryId) => {
    // 範囲外の都市は盤面の外に描かれ、静かに見えなくなる(エラーにもならない)。
    // 都市を足すときに気づけるよう、ここで押さえておく。
    const pack = await repo.load(CountryId(countryId));
    const { lon0, lon1, lat0, lat1 } = pack.projection;
    const [lonMin, lonMax] = [Math.min(lon0, lon1), Math.max(lon0, lon1)];
    const [latMin, latMax] = [Math.min(lat0, lat1), Math.max(lat0, lat1)];

    const outside = pack.cities
      .filter(
        (c) =>
          c.longitude < lonMin || c.longitude > lonMax || c.latitude < latMin || c.latitude > latMax,
      )
      .map((c) => `${c.id}(${c.longitude}, ${c.latitude})`);
    expect(outside, `${countryId}: 投影の外にある都市`).toEqual([]);
  });

  it.each(countries)("%s: どのマスからも必ずどこかへ動ける(行き止まりで詰まない)", async (countryId) => {
    const pack = await repo.load(CountryId(countryId));
    const graph = buildBoardGraph(pack.cities, pack.edges, pack.projection);
    const pathfinding = new PathfindingService(graph);

    for (const node of graph.nodes.keys()) {
      expect(graph.adjacency.get(node)?.length ?? 0, `${countryId}: ${node} に路線がない`).toBeGreaterThan(0);
      // 行き止まり(隣接1本)でも、来た道を戻れるので必ず候補が出る。
      expect(pathfinding.reachableNodes(node, 6).size, `${countryId}: ${node} から動けない`).toBeGreaterThan(0);
    }
  });

  it.each(countries)("%s: 盤面が2つ以上に分かれていない", async (countryId) => {
    // 目的地はどの都市からも選ばれうるので、盤面が分かれていると
    // **たどり着けない目的地**が出る。手番が終わらなくなるが、
    // 「遠いだけ」との区別がつかず気づきにくい。
    //
    // 島を航路でつなぎ忘れるのが典型で、世界一周の盤面のように
    // 海をまたぐ辺が多いほど起きやすい。ここで機械的に押さえる。
    const pack = await repo.load(CountryId(countryId));
    const graph = buildBoardGraph(pack.cities, pack.edges, pack.projection);

    const start = [...graph.nodes.keys()][0];
    const seen = new Set([start]);
    const queue = [start];
    while (queue.length > 0) {
      for (const next of graph.adjacency.get(queue.shift()!) ?? []) {
        if (!seen.has(next)) {
          seen.add(next);
          queue.push(next);
        }
      }
    }

    // 落ちたときに「どの都市が浮いているか」が分かるよう、都市名で報告する。
    const stranded = pack.cities.filter((c) => !seen.has(NodeId(c.id))).map((c) => c.id);
    expect(stranded, `${countryId}: 本体から切り離された都市`).toEqual([]);
    expect(seen.size, `${countryId}: 到達できないマスがある`).toBe(graph.nodes.size);
  });
});
