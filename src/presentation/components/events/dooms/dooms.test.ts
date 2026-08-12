import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { DOOM_ANIMATIONS, doomAnimationFor } from "./index";
import { ALL_COUNTRY_IDS } from "../../../../infrastructure/content/all-country-ids";

/**
 * 厄災の絵が仕様どおりかを機械的に確かめる。
 * 仕様は docs/50-authoring/02-animation-guide.md と 04-doom-animation-guide.md。
 */
const DIR = join(process.cwd(), "src/presentation/components/events/dooms");
const FILES = readdirSync(DIR).filter((f) => f.endsWith(".tsx"));

/** 各国の災難ID(season-and-doom-rules.ts の対応表と揃える)。 */
const DOOM_IDS: Readonly<Record<string, readonly string[]>> = {
  japan: ["typhoon", "quake", "delay", "fire", "bottakuri", "maigo", "suri"],
  bolivia: ["offering", "collapse", "bloqueo", "landslide", "tranca", "soroche", "theft"],
  india: ["monsoonflood", "drought", "bandh", "cyclone", "tollgate", "wrongtrain", "chori"],
};

describe("厄災の絵", () => {
  it.each(FILES)("%s: 仕様を守っている", (file) => {
    const source = readFileSync(join(DIR, file), "utf8");
    expect(source, "viewBox が 0 0 400 210 でない").toContain('viewBox="0 0 400 210"');
    expect(source, "prefers-reduced-motion の指定が無い").toContain("prefers-reduced-motion");
    expect(source, "<text> を使っている").not.toMatch(/<text[\s>]/);
    expect(source, "無限ループでない").toMatch(/animation:[^;]*infinite/);
    expect(source, "aria-hidden が無い").toContain("aria-hidden");
    expect(source, "外部URLを参照している").not.toMatch(/https?:\/\//);
  });

  it("3か国×7種がすべて揃っている", () => {
    const missing: string[] = [];
    for (const [country, ids] of Object.entries(DOOM_IDS)) {
      for (const id of ids) if (!doomAnimationFor(country, id)) missing.push(`${country}-${id}`);
    }
    expect(missing, "絵が無い災難").toEqual([]);
  });

  it("ファイルはすべて登録されている", () => {
    const registered = new Set(Object.keys(DOOM_ANIMATIONS));
    // **まだ焼かれていない盤面の絵は数えない。**盤面は複数人で並行して書いていて、
    // 絵を置くのは書いた人・`index.ts` に登録するのは取りまとめ側、という分担に
    // している(同じファイルを同時に編集すると壊れるため)。
    // 焼かれた時点で登録漏れがあれば、ここで落ちる。**遅れて落ちるのではなく、
    // 落ちるべき時に落ちる。**
    const baked = new Set(ALL_COUNTRY_IDS);
    const missing = FILES.map((f) => f.replace(".tsx", ""))
      .filter((id) => baked.has(id.split("-")[0]))
      .filter((id) => !registered.has(id));
    expect(missing, "index.ts に登録されていない絵").toEqual([]);
  });
});
