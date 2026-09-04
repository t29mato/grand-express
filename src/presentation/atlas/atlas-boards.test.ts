import { describe, expect, it } from "vitest";
import { atlasBoard, atlasBoards, boardsAt } from "./atlas-boards";
import { SUB_BOARDS } from "../components/setup/country-groups";
import { CountryId } from "../../domain/shared-kernel/ids";
import { boundsArea } from "./geo";

describe("盤面の一覧", () => {
  it("47枚ある", () => {
    expect(atlasBoards()).toHaveLength(47);
  });

  it("町の数の合計が2,218件と一致する", () => {
    const total = atlasBoards().reduce((sum, board) => sum + board.cityCount, 0);
    expect(total).toBe(2218);
  });

  it("町の数が0の盤面は無い", () => {
    expect(atlasBoards().filter((board) => board.cityCount === 0)).toEqual([]);
  });

  it("引き具合の内訳が実測どおり(全球2・大陸6・国34・寄り5)", () => {
    const count = (scale: string) => atlasBoards().filter((board) => board.scale === scale).length;
    expect({
      world: count("world"),
      continent: count("continent"),
      country: count("country"),
      closeup: count("closeup"),
    }).toEqual({ world: 2, continent: 6, country: 34, closeup: 5 });
  });

  it("地球の上に無い盤面は太陽系だけ", () => {
    expect(atlasBoards().filter((board) => board.offEarth).map((board) => board.id)).toEqual([
      "solarsystem",
    ]);
  });
});

describe("親子関係", () => {
  it("茨城県の親は日本、バリ島の親はインドネシア", () => {
    expect(atlasBoard(CountryId("ibaraki"))?.parentId).toBe("japan");
    expect(atlasBoard(CountryId("bali"))?.parentId).toBe("indonesia");
  });

  it("日本には親がいない", () => {
    expect(atlasBoard(CountryId("japan"))?.parentId).toBeNull();
  });

  /**
   * 選択画面(`country-groups.ts`)の `SUB_BOARDS` と食い違ったら落とす。
   * 地図帳は画面に依存したくないので同じ事実を写して持っているが、
   * **写したものは黙ってずれる。**盤面を足すときは両方に書くこと。
   */
  it("選択画面の SUB_BOARDS と一致する", () => {
    const fromGroups = new Map<string, string>();
    for (const [parent, children] of Object.entries(SUB_BOARDS)) {
      for (const child of children) fromGroups.set(child, parent);
    }
    const fromAtlas = new Map<string, string>();
    for (const board of atlasBoards()) {
      if (board.parentId) fromAtlas.set(board.id, board.parentId);
    }
    expect(Object.fromEntries(fromAtlas)).toEqual(Object.fromEntries(fromGroups));
  });

  it("親は必ず実在する盤面", () => {
    const ids = new Set(atlasBoards().map((board) => board.id as string));
    for (const board of atlasBoards()) {
      if (board.parentId) expect(ids.has(board.parentId)).toBe(true);
    }
  });
});

describe("その一点を含む盤面", () => {
  it("水戸(茨城県)では狭い順に5枚返る", () => {
    expect(boardsAt(140.47, 36.37).map((board) => board.id)).toEqual([
      "ibaraki",
      "hyakumeizan",
      "japan",
      "asia",
      "world",
    ]);
  });

  it("返る順は必ず狭いほうから", () => {
    const areas = boardsAt(140.47, 36.37).map((board) => boundsArea(board.bounds));
    expect(areas).toEqual([...areas].sort((a, b) => a - b));
  });

  it("南太平洋のまんなかは世界一周だけ", () => {
    expect(boardsAt(-120, -30).map((board) => board.id)).toEqual(["world"]);
  });

  it("タヒチ(変更線の向こう)ではオセアニアが返る", () => {
    expect(boardsAt(-149.6, -17.5).map((board) => board.id)).toEqual(["oceania", "world"]);
  });

  it("太陽系はどこを指しても返らない", () => {
    for (const [lon, lat] of [
      [0, 0],
      [139.7, 35.7],
      [-70, -15],
      [30, 30],
    ]) {
      expect(boardsAt(lon, lat).map((board) => board.id)).not.toContain("solarsystem");
    }
  });

  it("南極(どの盤面の枠にも無い)では何も返らない", () => {
    expect(boardsAt(0, -80)).toEqual([]);
  });
});
