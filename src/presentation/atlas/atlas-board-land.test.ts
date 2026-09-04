import { describe, expect, it } from "vitest";
import { CountryId } from "../../domain/shared-kernel/ids";
import { loadBoardLand } from "./atlas-board-land";
import { atlasBoard } from "./atlas-boards";
import { worldLand } from "./atlas-world-map";
import { boundsContain } from "./geo";

/**
 * 盤面の海岸線。**「寄ると緑一色の野原になる」を直すためのデータ。**
 * ここで見るのは、下敷きとして使える形になっているか——
 * 経度緯度で来ているか、枠の中に収まっているか、湖の大きさが度に直っているか。
 */
describe("盤面の海岸線と地形を読む", () => {
  /**
   * **盤面の枠より外へ少しはみ出す。**目録(`country-index.json`)の四隅は
   * 盤面の投影(`proj`)より狭く切ってあり、日本なら先島諸島(経度125付近)が
   * 枠の外に描かれている(260点中18点、最大3.4度)。
   * 地図帳は枠で切らずに描く——実在する島を、枠の都合で消さない。
   */
  it("日本の海岸線は19枚あり、ほとんどの点は盤面の枠の中にある", async () => {
    const land = await loadBoardLand(CountryId("japan"));
    const bounds = atlasBoard(CountryId("japan"))!.bounds;
    expect(land.land).toHaveLength(19);
    const points = land.land.flat();
    const inside = points.filter(([lon, lat]) => boundsContain(bounds, lon, lat));
    expect(inside.length).toBeGreaterThan(points.length * 0.9);
    // 座標として壊れていないこと(NaN や度でない値を地図へ流さない)。
    for (const [lon, lat] of points) {
      expect(Number.isFinite(lon) && Math.abs(lon) <= 360).toBe(true);
      expect(Number.isFinite(lat) && Math.abs(lat) <= 90).toBe(true);
    }
  });

  /**
   * これが目的そのもの。**世界の粗い輪郭では日本は5枚62点しかない。**
   * 寄ったときに海岸線として読めるだけの細かさがあることを数で押さえる。
   */
  it("世界の粗い輪郭より、はるかに細かい", async () => {
    const bounds = atlasBoard(CountryId("japan"))!.bounds;
    const coarse = worldLand()
      .filter((polygon) => polygon.every(([lon, lat]) => boundsContain(bounds, lon, lat)))
      .reduce((sum, polygon) => sum + polygon.length, 0);
    const fine = (await loadBoardLand(CountryId("japan"))).land.reduce(
      (sum, polygon) => sum + polygon.length,
      0,
    );
    expect(coarse).toBeLessThan(100);
    expect(fine).toBeGreaterThan(coarse * 3);
  });

  it("地形帯・湖・川と、その盤面の色がそろっている", async () => {
    const land = await loadBoardLand(CountryId("japan"));
    expect(land.terrain.length).toBeGreaterThan(0);
    expect(land.terrain[0].color).toMatch(/^#[0-9a-f]{3,8}$/i);
    expect(land.terrain[0].polygon.length).toBeGreaterThan(2);
    expect(land.rivers.length).toBeGreaterThan(0);
    expect(land.rivers[0].length).toBeGreaterThan(1);
    expect(land.colors.sea).toMatch(/^#/);
    expect(land.colors.land).toMatch(/^#/);
    expect(land.colors.coast).toMatch(/^#/);
  });

  /**
   * **湖の半径は盤面の絵のピクセルで書かれている。**度だと思って使うと
   * 琵琶湖が半径17度(本州より大きい円)になる。
   * 盤面の投影で直したあとの大きさを見る。
   */
  it("湖の大きさは度に直っていて、盤面の中に収まる", async () => {
    const land = await loadBoardLand(CountryId("japan"));
    expect(land.lakes.length).toBeGreaterThan(0);
    for (const lake of land.lakes) {
      expect(lake.rxDeg).toBeGreaterThan(0);
      expect(lake.rxDeg).toBeLessThan(1);
      expect(lake.ryDeg).toBeGreaterThan(0);
      expect(lake.ryDeg).toBeLessThan(1);
      expect(boundsContain(atlasBoard(CountryId("japan"))!.bounds, lake.lon, lake.lat)).toBe(true);
    }
  });

  /**
   * **飾り(山・鳥居・森)は、遊びの盤面と同じSVG断片。**
   * 座標が盤面のピクセルのままなので、地図へ写す transform が付いてくる。
   * 付いていないと、飾りが経度0度あたり——ギニア湾の沖に積み上がる。
   */
  it("飾りのSVGと、地図へ写す transform がそろっている", async () => {
    const land = await loadBoardLand(CountryId("japan"));
    expect(land.decor).not.toBeNull();
    expect(land.decor!.svg.length).toBeGreaterThan(1000);
    expect(land.decor!.transform).toMatch(/^translate\(-?[\d.]+ -?[\d.]+\) scale\(-?[\d.]+ -?[\d.]+\)$/);
    expect(land.decor!.transform).not.toMatch(/NaN|Infinity/);
  });

  /**
   * transform を実際に当てて、盤面の四隅が地図の四隅へ落ちることを見る。
   * **縦は符号が逆**(緯度は上が大きく、地図の平面は下が大きい)。
   */
  it("盤面の左上のピクセルは、盤面の北西の角へ落ちる", async () => {
    const land = await loadBoardLand(CountryId("japan"));
    const [, tx, ty, sx, sy] = land
      .decor!.transform.match(/translate\((-?[\d.]+) (-?[\d.]+)\) scale\((-?[\d.]+) (-?[\d.]+)\)/)!
      .map(Number);
    // 左上(0,0)は北西の角。日本の投影は lon0=123.4 / lat0=45.8。
    expect(tx).toBeCloseTo(123.4, 1);
    expect(ty).toBeCloseTo(-45.8, 1);
    // 東へ行くほど経度が増え、南へ行くほど平面のyが増える(どちらも正)。
    expect(sx).toBeGreaterThan(0);
    expect(sy).toBeGreaterThan(0);
    // 盤面の右下(BW,BH)は南東の角(lon1=146.5 / lat1=23.8)。
    expect(tx + sx * 2384).toBeCloseTo(146.5, 1);
    expect(ty + sy * 2669).toBeCloseTo(-23.8, 1);
  });

  it("県の盤面(茨城)も同じ形で読める", async () => {
    const land = await loadBoardLand(CountryId("ibaraki"));
    expect(land.land.length).toBeGreaterThan(0);
    expect(land.terrain.length).toBeGreaterThan(0);
    expect(land.decor).not.toBeNull();
  });

  it("同じ盤面を2度読んでも同じ結果が返る", async () => {
    const first = await loadBoardLand(CountryId("bali"));
    const second = await loadBoardLand(CountryId("bali"));
    expect(second).toEqual(first);
  });

  it("知らない盤面は読めない", async () => {
    await expect(loadBoardLand(CountryId("atlantis"))).rejects.toThrow();
  });
});
