import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { CountryId } from "../../../../domain/shared-kernel/ids";
import { JsonCountryContentRepository } from "../../../../infrastructure/content/json-country-content-repository";
import { CITY_SCENE_OVERLAYS, citySceneOverlayFor } from "./index";

/**
 * 都市イラストに重ねる動きが仕様どおりかを確かめる。
 * 仕様は docs/50-authoring/05-city-scene-guide.md。
 */
const DIR = join(process.cwd(), "src/presentation/components/city/scenes");
const FILES = readdirSync(DIR).filter((f) => f.endsWith(".tsx"));

describe("都市イラストの動き", () => {
  it.each(FILES)("%s: 仕様を守っている", (file) => {
    const source = readFileSync(join(DIR, file), "utf8");
    expect(source, "viewBox が 0 0 400 210 でない").toContain('viewBox="0 0 400 210"');
    expect(source, "prefers-reduced-motion の指定が無い").toContain("prefers-reduced-motion");
    expect(source, "<text> を使っている").not.toMatch(/<text[\s>]/);
    expect(source, "無限ループでない").toMatch(/animation:[^;]*infinite/);
    expect(source, "aria-hidden が無い").toContain("aria-hidden");
    expect(source, "外部URLを参照している").not.toMatch(/https?:\/\//);

    // 重ねる層なので、背景を塗りつぶしてはいけない(下の絵が隠れる)。
    expect(source, "画面全体を塗りつぶしている(下の絵が隠れる)").not.toMatch(
      /<rect[^>]*width="400"[^>]*height="210"/,
    );
  });

  it.each(["bolivia", "japan", "india"] as const)("%s: すべての背景に動きがある", async (countryId) => {
    // 1つでも欠けるとその背景の都市だけ静止したままになる(静かに欠ける)。
    const pack = await new JsonCountryContentRepository().load(CountryId(countryId));
    const missing = Object.keys(pack.artScenes).filter((key) => !citySceneOverlayFor(countryId, key));
    expect(missing, `${countryId}: 動きが無い背景`).toEqual([]);
  });

  it("ファイルはすべて登録されている", () => {
    const registered = new Set(Object.keys(CITY_SCENE_OVERLAYS));
    const missing = FILES.map((f) => f.replace(".tsx", "")).filter((id) => !registered.has(id));
    expect(missing, "index.ts に登録されていない").toEqual([]);
  });
});
