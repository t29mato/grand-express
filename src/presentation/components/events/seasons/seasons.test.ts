import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { SEASON_ANIMATIONS, seasonAnimationFor } from "./index";

/**
 * 季節の絵が仕様どおりかを機械的に確かめる。
 * 仕様は docs/50-authoring/02-animation-guide.md と 03-season-animation-guide.md。
 */
const DIR = join(process.cwd(), "src/presentation/components/events/seasons");
const FILES = readdirSync(DIR).filter((f) => f.endsWith(".tsx"));

describe("季節の絵", () => {
  it.each(FILES)("%s: 仕様を守っている", (file) => {
    const source = readFileSync(join(DIR, file), "utf8");
    expect(source, "viewBox が 0 0 400 210 でない").toContain('viewBox="0 0 400 210"');
    expect(source, "prefers-reduced-motion の指定が無い").toContain("prefers-reduced-motion");
    expect(source, "<text> を使っている").not.toMatch(/<text[\s>]/);
    expect(source, "無限ループでない").toMatch(/animation:[^;]*infinite/);
    expect(source, "aria-hidden が無い").toContain("aria-hidden");
    expect(source, "外部URLを参照している").not.toMatch(/https?:\/\//);
  });

  it("3か国×12ヶ月がすべて揃っている", () => {
    // 1つでも欠けると、その月だけ絵が出ずに文章だけになる(静かに欠けるので気づけない)。
    const missing: string[] = [];
    for (const country of ["japan", "bolivia", "india"]) {
      for (let month = 0; month < 12; month++) {
        if (!seasonAnimationFor(country, month)) missing.push(`${country}-${month}`);
      }
    }
    expect(missing, "絵が無い月").toEqual([]);
  });

  it("ファイルはすべて登録されている", () => {
    const registered = new Set(Object.keys(SEASON_ANIMATIONS));
    const missing = FILES.map((f) => f.replace(".tsx", "")).filter((id) => !registered.has(id));
    expect(missing, "index.ts に登録されていない絵").toEqual([]);
  });
});
