import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { EVENT_ANIMATIONS } from "./index";

/**
 * 出来事の絵が仕様どおりかを機械的に確かめる。
 *
 * 絵は複数人で並行して作るため、目視だけでは抜けに気づけない。
 * 仕様は docs/50-authoring/02-animation-guide.md。
 */
const DIR = join(process.cwd(), "src/presentation/components/events/animations");
const FILES = readdirSync(DIR).filter((f) => f.endsWith(".tsx"));

describe("出来事の絵", () => {
  it("1本以上ある", () => {
    expect(FILES.length).toBeGreaterThan(0);
  });

  it.each(FILES)("%s: 仕様を守っている", (file) => {
    const source = readFileSync(join(DIR, file), "utf8");

    // 盤面の他の絵と同じ座標系でないと、モーダルの中で大きさが揃わない。
    expect(source, "viewBox が 0 0 400 210 でない").toContain('viewBox="0 0 400 210"');

    // 動きに弱い人のために、必ず止められること。
    expect(source, "prefers-reduced-motion の指定が無い").toContain("prefers-reduced-motion");

    // 説明文は別に表示されるので、絵の中に文字は描かない(翻訳できないため)。
    expect(source, "<text> を使っている").not.toMatch(/<text[\s>]/);

    // モーダルが開いているあいだ流れ続ける。
    expect(source, "無限ループでない").toMatch(/animation:[^;]*infinite/);

    // 読み上げ対象にしない(意味は説明文が持つ)。
    expect(source, "aria-hidden が無い").toContain("aria-hidden");

    // 外部リソースを読むと、オフラインやCSPで壊れる。
    expect(source, "外部URLを参照している").not.toMatch(/https?:\/\//);
  });
});

describe("出来事の絵の登録", () => {
  it("ファイルはすべて登録されている", () => {
    // 登録漏れは、静かに汎用の絵にフォールバックして気づけない。
    const registered = new Set(Object.keys(EVENT_ANIMATIONS));
    // bear-attack.tsx は shiretoko-bear の絵(ファイル名と出来事IDが唯一違う)。
    const expected = FILES.map((f) => f.replace(".tsx", "")).map((id) =>
      id === "bear-attack" ? "shiretoko-bear" : id,
    );
    const missing = expected.filter((id) => !registered.has(id));
    expect(missing, "index.ts に登録されていない絵").toEqual([]);
  });
});
