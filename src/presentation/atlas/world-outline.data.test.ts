import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { WORLD_COLORS, WORLD_LABELS, WORLD_LAND } from "./world-outline.data";
import { CITY_COUNTS } from "./city-counts.data";
import { COUNTRY_INDEX } from "../../infrastructure/content/country-index";

/**
 * 写したデータが元とずれていないかを見る検査。
 *
 * `world-outline.data.ts` と `city-counts.data.ts` は、
 * `infrastructure/content/*.content.json`(合わせて約10MB)から
 * 必要な部分だけを写したもの。**写しは黙ってずれる**ので、
 * ここで元と突き合わせる。落ちたら写し直すこと。
 */

const CONTENT_DIR = join(process.cwd(), "src", "infrastructure", "content");

function readContent(id: string): Record<string, unknown> {
  return JSON.parse(readFileSync(join(CONTENT_DIR, `${id}.content.json`), "utf8"));
}

describe("世界地図の下敷き", () => {
  const world = readContent("world");

  it("陸地の輪郭が world.content.json と一致する", () => {
    expect(WORLD_LAND).toEqual(world.land);
  });

  it("配色が world.content.json と一致する", () => {
    expect(WORLD_COLORS).toEqual({
      sea: world.sea,
      land: world.landBase,
      coast: world.coast,
    });
  });

  it("地名が world.content.json と一致する", () => {
    const expected = (world.labels as [number, number, unknown, number][]).map(
      ([lon, lat, text, water]) => ({ lon, lat, text, isWater: water === 1 }),
    );
    expect(WORLD_LABELS).toEqual(expected);
  });

  it("多角形38枚・地名19件(うち海10件)", () => {
    expect(WORLD_LAND).toHaveLength(38);
    expect(WORLD_LABELS).toHaveLength(19);
    expect(WORLD_LABELS.filter((label) => label.isWater)).toHaveLength(10);
  });
});

describe("町の数", () => {
  it("盤面ごとの数が実際のコンテンツと一致する", () => {
    const actual: Record<string, number> = {};
    for (const entry of COUNTRY_INDEX) {
      const content = readContent(entry.id) as { cities: Record<string, unknown> };
      actual[entry.id] = Object.keys(content.cities).length;
    }
    expect(CITY_COUNTS).toEqual(actual);
  });

  it("合計2,218件", () => {
    expect(Object.values(CITY_COUNTS).reduce((sum, n) => sum + n, 0)).toBe(2218);
  });
});
