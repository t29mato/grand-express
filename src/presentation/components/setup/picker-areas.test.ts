import { describe, expect, it } from "vitest";
import { COUNTRY_INDEX } from "../../../infrastructure/content/country-index";
import { COUNTRY_GROUPS, SUB_BOARDS, isSubBoard } from "./country-groups";
import {
  Bounds,
  ViewBox,
  CONTAINER_ASPECT,
  MapProjection,
  WORLD_PROJECTION,
  centreOf,
  fontFor,
  fullView,
  layoutPlates,
  medianCentre,
  unionBounds,
  viewBoxFor,
} from "./picker-areas";

const boardsById = new Map(COUNTRY_INDEX.map((board) => [board.id, board]));

/** その大陸の地図に出る盤面(中に入っている盤面は親の中でしか出ない)。 */
function membersOf(key: string): string[] {
  const group = COUNTRY_GROUPS.find((g) => g.key === key)!;
  return group.countryIds.filter((id) => boardsById.has(id) && !isSubBoard(id));
}

const CONTINENTS = COUNTRY_GROUPS.map((g) => g.key)
  .filter((key) => key !== "world")
  .filter((key) => membersOf(key).length > 0);

describe("地図から盤面を選ぶ", () => {
  it("どの盤面にも、大陸か親をたどれば行き着く", () => {
    // **たどり着けない盤面は静かに増える。**大陸に足し忘れた盤面は、
    // 地図のどこにも名札が出ないまま「ある」ことになる。
    const reachable = new Set<string>(["world"]);
    for (const key of CONTINENTS) {
      for (const id of membersOf(key)) {
        reachable.add(id);
        for (const child of SUB_BOARDS[id] ?? []) reachable.add(child);
      }
    }
    const missing = COUNTRY_INDEX.map((b) => b.id).filter((id) => !reachable.has(id));
    expect(missing, "地図から選べない盤面").toEqual([]);
  });

  it("中に入っている盤面には、必ず親がいる", () => {
    for (const [parent, children] of Object.entries(SUB_BOARDS)) {
      expect(boardsById.has(parent), `${parent} が目録に無い`).toBe(true);
      for (const child of children) {
        expect(isSubBoard(child)).toBe(true);
      }
    }
  });

  it("大陸の名札は、その大陸の上に乗る", () => {
    // **四隅の真ん中で置くと、ロシアが経度180度まで伸びているせいで
    // 「ヨーロッパ」がシベリアに乗った。**中央値で置いている理由がこれ。
    const europe = membersOf("europe").map((id) => boardsById.get(id)!.bounds);
    const at = medianCentre(europe);
    expect(at.lon, "ヨーロッパの札がシベリアに乗っている").toBeLessThan(45);
    expect(at.lon).toBeGreaterThan(-15);

    // 四隅の真ん中だと、実際に東へ飛ぶことも押さえておく(直ったことの証拠)。
    expect(centreOf(unionBounds(europe)).lon).toBeGreaterThan(45);
  });

  it("どの大陸に寄っても、地図の入れ物の形は変わらない", () => {
    // 形が変わると、その下の「誰が遊ぶか」が画面の外へ出る。
    for (const key of CONTINENTS) {
      const view = viewBoxFor(
        unionBounds(membersOf(key).map((id) => boardsById.get(id)!.bounds)),
        WORLD_PROJECTION,
      );
      expect(view.w / view.h, `${key} の枠の形`).toBeCloseTo(CONTAINER_ASPECT, 3);
    }
  });

  it("どの大陸に寄っても、名札は下地の外へ出ない", () => {
    for (const key of CONTINENTS) {
      const view = viewBoxFor(
        unionBounds(membersOf(key).map((id) => boardsById.get(id)!.bounds)),
        WORLD_PROJECTION,
      );
      expect(view.x).toBeGreaterThanOrEqual(-0.001);
      expect(view.y).toBeGreaterThanOrEqual(-0.001);
      expect(view.x + view.w).toBeLessThanOrEqual(WORLD_PROJECTION.width + 0.001);
      expect(view.y + view.h).toBeLessThanOrEqual(WORLD_PROJECTION.height + 0.001);
    }
  });

  it("どの大陸でも、名札どうしが重ならない", () => {
    // **重なりは撮らないと気づかない。**以前、マレーシアの印がインドネシアの
    // 名前に乗って「donesia」しか見えていなかった。ここで数える。
    for (const key of CONTINENTS) {
      const members = membersOf(key).map((id) => boardsById.get(id)!);
      const view = viewBoxFor(unionBounds(members.map((b) => b.bounds)), WORLD_PROJECTION);
      const plates = layoutPlates(
        members.map((b) => ({ id: b.id, name: b.name, at: centreOf(b.bounds) })),
        members.map((b) => b.name.en),
        view,
        fontFor(view),
        WORLD_PROJECTION,
      );
      for (let i = 0; i < plates.length; i++) {
        for (let j = i + 1; j < plates.length; j++) {
          const a = plates[i];
          const b = plates[j];
          const overlaps =
            Math.abs(b.x - a.x) < (a.w + b.w) / 2 && Math.abs(b.y - a.y) < (a.h + b.h) / 2;
          expect(overlaps, `${key}: ${a.text} と ${b.text} が重なっている`).toBe(false);
        }
      }
      // 枠の中に収まっていること(はみ出した名札は切り取られて読めない)。
      for (const plate of plates) {
        expect(plate.x - plate.w / 2, `${key}: ${plate.text} が左にはみ出す`).toBeGreaterThanOrEqual(
          view.x - 0.001,
        );
        expect(plate.x + plate.w / 2, `${key}: ${plate.text} が右にはみ出す`).toBeLessThanOrEqual(
          view.x + view.w + 0.001,
        );
      }
    }
  });

  it("押し離しは実際に仕事をしている(検査が空振りでないことの確認)", () => {
    // **「重なりが0だった」は、検査が効いている証拠にはならない。**
    // 押し離す前は本当に重なっているのかをここで数える。
    // 実測: アジア3組・ヨーロッパ5組(アフリカとアメリカ大陸は元から0組)。
    let before = 0;
    for (const key of CONTINENTS) {
      const members = membersOf(key).map((id) => boardsById.get(id)!);
      const view = viewBoxFor(unionBounds(members.map((b) => b.bounds)), WORLD_PROJECTION);
      const font = fontFor(view);
      const raw = members.map((board) => {
        const at = centreOf(board.bounds);
        const p = {
          x: ((at.lon - WORLD_PROJECTION.lon0) / (WORLD_PROJECTION.lon1 - WORLD_PROJECTION.lon0)) * WORLD_PROJECTION.width,
          y: ((at.lat - WORLD_PROJECTION.lat0) / (WORLD_PROJECTION.lat1 - WORLD_PROJECTION.lat0)) * WORLD_PROJECTION.height,
        };
        return { ...p, w: board.name.en.length * font * 0.62 + font * 1.4, h: font * 1.9 };
      });
      for (let i = 0; i < raw.length; i++) {
        for (let j = i + 1; j < raw.length; j++) {
          const a = raw[i];
          const b = raw[j];
          if (Math.abs(b.x - a.x) < (a.w + b.w) / 2 && Math.abs(b.y - a.y) < (a.h + b.h) / 2) before++;
        }
      }
    }
    expect(before, "そのまま置いても重ならないなら、押し離しの検査は何も守っていない").toBeGreaterThan(0);
  });

  it("親の中に降りても、名札の見た目の大きさが変わらない", () => {
    // **枠の幅だけで字の大きさを決めると、日本まで寄ったところで8pxになった。**
    // 入れ物の形は固定なので、縦長の盤面は左右に余白を残して縮んで収まる。
    const onScreen = (view: ViewBox) => {
      const shown = Math.max(view.w, view.h * CONTAINER_ASPECT);
      return (fontFor(view) / shown) * 1000; // 1000px幅の画面での字の大きさ
    };
    const world = onScreen(fullView(WORLD_PROJECTION));
    for (const parent of Object.keys(SUB_BOARDS)) {
      const board = boardsById.get(parent);
      if (!board) continue;
      const [, , width, height] = board.thumbViewBox.split(" ").map(Number);
      const projection: MapProjection = { ...board.bounds, width, height };
      expect(onScreen(fullView(projection)), `${parent} の名札の大きさ`).toBeCloseTo(world, 6);
    }
  });

  it("四隅の南北が入れ替わっていない", () => {
    // `lat0` が北、`lat1` が南。逆に入ると地図の上下が反転する。
    const wrong = COUNTRY_INDEX.filter((b) => b.bounds.lat0 <= b.bounds.lat1).map((b) => b.id);
    expect(wrong, "北と南が逆").toEqual([]);
  });
});

describe("四隅をまとめる", () => {
  const a: Bounds = { lon0: 0, lon1: 10, lat0: 50, lat1: 40 };
  const b: Bounds = { lon0: 20, lon1: 30, lat0: 60, lat1: 55 };

  it("union は両方を囲む", () => {
    expect(unionBounds([a, b])).toEqual({ lon0: 0, lon1: 30, lat0: 60, lat1: 40 });
  });

  it("中央値は、外れて大きい1枚に引きずられない", () => {
    const wide: Bounds = { lon0: 20, lon1: 180, lat0: 78, lat1: 41 };
    expect(medianCentre([a, b, wide]).lon).toBe(25);
    expect(centreOf(unionBounds([a, b, wide])).lon).toBe(90);
  });
});
