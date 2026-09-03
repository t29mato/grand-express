import { describe, expect, it } from "vitest";
import { COUNTRY_INDEX } from "../../../infrastructure/content/country-index";
import { SUB_BOARDS, subBoardsOf } from "./country-groups";
import { AreaSource, centreOf, fontFor, fullView, layoutPlates } from "./picker-areas";

/**
 * 寄った先(日本の中・インドネシアの中)の、番号の印どうしが重ならないこと。
 *
 * 名前を書いた札のころは「日本百名山」「日本」「茨城県」が重なり合って、
 * どれが押せるのか迷った(2026-09-02 のプレイ)。番号の印は小さいので押し離せる。
 * **画面を撮って目で見る代わりの、数の上での確かめ。**この機械ではブラウザが
 * 立ち上がらなかった(共有ライブラリ不足)ので、少なくとも重なりだけはここで押さえる。
 *
 * 親を足したり中の盤面を足したりしたら、ここも一緒に走る(`SUB_BOARDS` から回す)。
 */
describe("寄った先の番号の印", () => {
  const available = new Set(COUNTRY_INDEX.map((entry) => entry.id));
  const byId = new Map(COUNTRY_INDEX.map((entry) => [entry.id, entry]));

  it.each(Object.keys(SUB_BOARDS))("%s の中の印は重ならず、枠の中に収まる", (parentId) => {
    const parent = byId.get(parentId)!;
    const [, , width, height] = parent.thumbViewBox.split(" ").map(Number);
    const projection = { ...parent.bounds, width, height };
    const members = [parent, ...subBoardsOf(parentId, available).map((id) => byId.get(id)!)];
    const sources: AreaSource[] = members.map((board) => ({
      id: board.id,
      name: board.name,
      at: centreOf(board.bounds),
    }));
    const view = fullView(projection);
    const font = fontFor(view);
    const plates = layoutPlates(sources, sources.map((_, index) => String(index + 1)), view, font, projection);

    for (let i = 0; i < plates.length; i++) {
      const a = plates[i];
      expect(a.x - a.w / 2).toBeGreaterThanOrEqual(view.x);
      expect(a.x + a.w / 2).toBeLessThanOrEqual(view.x + view.w);
      expect(a.y - a.h / 2).toBeGreaterThanOrEqual(view.y);
      expect(a.y + a.h / 2).toBeLessThanOrEqual(view.y + view.h);
      for (let j = i + 1; j < plates.length; j++) {
        const b = plates[j];
        const overlapX = (a.w + b.w) / 2 - Math.abs(b.x - a.x);
        const overlapY = (a.h + b.h) / 2 - Math.abs(b.y - a.y);
        expect(
          overlapX <= 0 || overlapY <= 0,
          `${a.id} と ${b.id} の印が重なっている(x:${overlapX.toFixed(0)} y:${overlapY.toFixed(0)})`,
        ).toBe(true);
      }
    }
  });
});
