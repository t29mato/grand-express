import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { DOOM_ANIMATIONS, doomAnimationFor } from "./index";

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
    const missing = FILES.map((f) => f.replace(".tsx", "")).filter((id) => !registered.has(id));
    expect(missing, "index.ts に登録されていない絵").toEqual([]);
  });
});
