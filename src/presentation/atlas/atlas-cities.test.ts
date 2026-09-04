import { describe, expect, it } from "vitest";
import { CityId, CountryId } from "../../domain/shared-kernel/ids";
import { loadAtlasCities, loadAtlasCity } from "./atlas-cities";
import { atlasBoard } from "./atlas-boards";
import { boundsContain } from "./geo";

describe("盤面の町を読む", () => {
  it("茨城県の町を読むと36件そろう", async () => {
    const cities = await loadAtlasCities(CountryId("ibaraki"));
    expect(cities).toHaveLength(atlasBoard(CountryId("ibaraki"))!.cityCount);
  });

  it("町には座標・名前・一言・解説・印の絵がそろっている", async () => {
    const cities = await loadAtlasCities(CountryId("ibaraki"));
    const mito = cities.find((city) => city.name.ja.includes("水戸"));
    expect(mito).toBeDefined();
    expect(mito!.boardId).toBe("ibaraki");
    expect(mito!.lon).toBeGreaterThan(139);
    expect(mito!.lat).toBeGreaterThan(35);
    expect(mito!.name.en.length).toBeGreaterThan(0);
    expect(mito!.tag.ja.length).toBeGreaterThan(0);
    expect(mito!.fact.ja.length).toBeGreaterThan(0);
    expect(mito!.markSvg).toContain("<");
    expect(mito!.sceneKey).not.toBeNull();
  });

  it("全部の町に印の絵がある(空の印を描かせない)", async () => {
    const cities = await loadAtlasCities(CountryId("ibaraki"));
    expect(cities.filter((city) => city.markSvg === "")).toEqual([]);
  });

  it("町は盤面の枠の中にある", async () => {
    const board = atlasBoard(CountryId("bali"))!;
    const cities = await loadAtlasCities(CountryId("bali"));
    const outside = cities.filter((city) => !boundsContain(board.bounds, city.lon, city.lat));
    expect(outside.map((city) => city.name.en)).toEqual([]);
  });

  it("変更線をまたぐ盤面(オセアニア)の町も枠の中に収まる", async () => {
    const board = atlasBoard(CountryId("oceania"))!;
    const cities = await loadAtlasCities(CountryId("oceania"));
    const outside = cities.filter((city) => !boundsContain(board.bounds, city.lon, city.lat));
    expect(outside.map((city) => `${city.name.en} (${city.lon},${city.lat})`)).toEqual([]);
  });

  it("同じ盤面を2度読んでも同じ結果が返る", async () => {
    const first = await loadAtlasCities(CountryId("ibaraki"));
    const second = await loadAtlasCities(CountryId("ibaraki"));
    expect(second).toEqual(first);
  });

  it("町ひとつを名指しで引ける", async () => {
    const cities = await loadAtlasCities(CountryId("ibaraki"));
    const found = await loadAtlasCity(CountryId("ibaraki"), cities[0].id);
    expect(found).toEqual(cities[0]);
  });

  it("知らない町はnull", async () => {
    expect(await loadAtlasCity(CountryId("ibaraki"), CityId("nowhere"))).toBeNull();
  });

  it("知らない盤面は読めない", async () => {
    await expect(loadAtlasCities(CountryId("atlantis"))).rejects.toThrow();
  });
});
