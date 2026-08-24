import { beforeAll, describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react";
import { CityId, CountryId, NodeId, cityIdToNodeId } from "../../domain/shared-kernel/ids";
import { JsonCountryContentRepository } from "../../infrastructure/content/json-country-content-repository";
import { GameEngineContext, createGameEngineContext } from "../../application/game-engine-context";
import { NodePosition, railPolylines, useBoardLayout } from "./use-board-layout";

/**
 * 日付変更線をまたぐ路線。
 *
 * 2026-08-11、**日本からアメリカへ太平洋を渡れなかった。**行くには
 * ヨーロッパ・大西洋まわりで地球を反対に回るしかない。
 *
 * 世界一周の盤面は経度 -188〜216 で切ってあるので、太平洋は左右の端に
 * 分かれている(スバ x=3358 / パペーテ x=352)。素直に線で結ぶと3009pxの線が
 * 盤面を横切り、南アメリカとアフリカを串刺しにする(実測)。
 * そこでこの路線だけ、**盤面の端で切って両側から描く。**
 */
describe("日付変更線をまたぐ航路(世界一周)", () => {
  let context: GameEngineContext;
  let positions: ReadonlyMap<NodeId, NodePosition>;
  let boardWidth: number;

  beforeAll(async () => {
    const pack = await new JsonCountryContentRepository().load(CountryId("world"));
    context = createGameEngineContext(pack);
    boardWidth = pack.projection.boardWidth;
    positions = renderHook(() => useBoardLayout(context)).result.current;
    /**
     * **世界一周盤を丸ごと読んで配置まで通すので重い。**
     *
     * 単体なら8.5秒で終わるが、`npm run check` は90ファイルを並べて走らせるので、
     * 既定の10秒(hookTimeout)を越えて落ちた回がある。**遅いのは読み込みではなく
     * 順番待ち**で、盤面が重くなったこととは関係がない。
     *
     * 持ち時間の宣言は**ここ1箇所だけ**にする。`vi.setConfig` と併記すると
     * こちらが勝ち、書いたほうの数字が黙って無視される
     * (setup-screen.test.tsx で実際にそうなっていた)。
     */
  }, 120_000);

  const isSeam = (between: readonly string[]) =>
    between.includes("suva") && between.includes("papeete");

  it("太平洋を渡る航路がある", () => {
    const linked = context.content.edges.some((e) => isSeam([e.from, e.to]));
    expect(linked, "スバ—パペーテが無いと、太平洋を渡る道がひとつも無い").toBe(true);
  });

  it("線は2本に分かれ、どちらも盤面の端に届く", () => {
    const pieces = railPolylines(context, positions).filter((l) => isSeam(l.between));
    expect(pieces).toHaveLength(2);

    const [east, west] = pieces[0].points[0].x > pieces[1].points[0].x ? pieces : [pieces[1], pieces[0]];
    // 右へ出ていく線は右端まで、左から来る線は左端まで引く。
    // 端の手前で止めると、**海の途中で線が切れて壊れて見える。**
    expect(Math.max(...east.points.map((p) => p.x))).toBeCloseTo(boardWidth, 0);
    expect(Math.min(...west.points.map((p) => p.x))).toBeCloseTo(0, 0);
  });

  it("盤面を横切る線にならない", () => {
    for (const line of railPolylines(context, positions)) {
      const xs = line.points.map((p) => p.x);
      const width = Math.max(...xs) - Math.min(...xs);
      // 一本で盤面の半分を越える線は、地図をまたいで引かれてしまっている。
      expect(width, `${line.between.join("—")} が盤面を横切っている`).toBeLessThan(boardWidth / 2);
    }
  });

  it("切れた線には行き先が付く", () => {
    const pieces = railPolylines(context, positions).filter((l) => isSeam(l.between));
    expect(pieces.map((l) => l.continues?.to).sort()).toEqual(["papeete", "suva"]);
    // 行き先は**盤面の端に当たっている点**に付ける。向きから決めると、
    // 左側の線(端 → パペーテの順に点が並ぶ)で反対の端に付いてしまう。
    for (const piece of pieces) {
      const at = piece.continues!.at;
      expect(Math.min(at.x, boardWidth - at.x)).toBeCloseTo(0, 0);
    }
  });

  it("マスは両側に置かれる(片側だけに寄らない)", () => {
    const edgeIndex = context.content.edges.findIndex((e) => isSeam([e.from, e.to]));
    const xs: number[] = [];
    for (const id of context.graph.nodes.keys()) {
      if (!new RegExp(`^e${edgeIndex}_`).test(id)) continue;
      xs.push(positions.get(id)!.x);
    }
    expect(xs.length).toBeGreaterThan(1);
    expect(xs.some((x) => x > boardWidth / 2)).toBe(true);
    expect(xs.some((x) => x < boardWidth / 2)).toBe(true);
  });

  it("東京からアメリカへ、地球を反対に回らずに行ける", () => {
    const steps = (from: string, to: string) => {
      const start = cityIdToNodeId(CityId(from));
      const goal = cityIdToNodeId(CityId(to));
      const seen = new Map<string, number>([[start, 0]]);
      const queue: NodeId[] = [start];
      while (queue.length > 0) {
        const at = queue.shift()!;
        if (at === goal) return seen.get(at)!;
        for (const next of context.graph.adjacency.get(at) ?? []) {
          if (seen.has(next)) continue;
          seen.set(next, seen.get(at)! + 1);
          queue.push(next);
        }
      }
      return Infinity;
    };
    // 大西洋まわり(ロンドン経由)は40歩を超える。太平洋を渡れば30歩を切る。
    expect(steps("tokyo", "sanfrancisco")).toBeLessThan(30);
    expect(steps("tokyo", "sanfrancisco")).toBeLessThan(steps("tokyo", "newyork"));
  });
});
