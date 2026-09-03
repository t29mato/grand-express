import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

/**
 * 盤面・都市の絵は**文字列のSVG**なので、`x="11,2"` のように小数点をカンマと
 * 打ち間違えても、JavaScriptとしては有効な文字列で、焼くところも素通りする。
 * ブラウザだけが気づいて、描くたびにコンソールへ
 * `<rect> attribute x: Expected length, "11,2"` を吐き続ける。
 *
 * legacy の `kanto` と `torii_wood` に1つずつ入っていて、**本番のコンソールに出ていた**。
 * 幅も高さも0の残骸だったので見た目には出ず、遊んでいる側からは分からない。
 * 焼くとき(`scripts/extract-legacy-content.mjs` の `stripNoOpRects`)に落としたが、
 * 同じ書き間違いが新しい盤面で入っても気づけないので、ここで生成物を測る。
 */
const CONTENT_DIR = join(process.cwd(), "src", "infrastructure", "content");

/** 長さ・座標を書く属性。数値(と単位)以外が入っていたらブラウザに弾かれる。 */
const NUMERIC_ATTRS = new Set([
  "x",
  "y",
  "cx",
  "cy",
  "r",
  "rx",
  "ry",
  "width",
  "height",
  "x1",
  "y1",
  "x2",
  "y2",
  "dx",
  "dy",
  "stroke-width",
  "stroke-dashoffset",
  "offset",
  "opacity",
  "font-size",
]);

/** SVGが受け付ける長さの書き方(`12` `-.5` `1e-3` `100%` `16px`)。 */
const LENGTH = /^-?(\d+\.?\d*|\.\d+)(e-?\d+)?(px|%)?$/i;

/** JSONのどこに入っていても拾えるよう、文字列の葉を全部たどる。 */
function collectSvgStrings(value: unknown, path: string, out: Array<[string, string]>): void {
  if (typeof value === "string") {
    if (value.includes("<")) out.push([path, value]);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, i) => collectSvgStrings(item, `${path}[${i}]`, out));
    return;
  }
  if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) collectSvgStrings(item, `${path}.${key}`, out);
  }
}

describe("焼き上がったコンテンツのSVG属性", () => {
  const files = readdirSync(CONTENT_DIR)
    .filter((name) => name.endsWith(".json"))
    .sort();

  it("測る対象の生成物がある", () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it.each(files)("%s: 長さの属性が数値になっている", (file) => {
    const strings: Array<[string, string]> = [];
    collectSvgStrings(JSON.parse(readFileSync(join(CONTENT_DIR, file), "utf8")), file, strings);

    const broken: string[] = [];
    for (const [path, svg] of strings) {
      for (const [, name, value] of svg.matchAll(/([a-zA-Z-]+)="([^"]*)"/g)) {
        if (!NUMERIC_ATTRS.has(name)) continue;
        if (value.trim() === "" || LENGTH.test(value.trim())) continue;
        broken.push(`${path}: ${name}="${value}"`);
      }
    }
    expect(broken, `${file}: 長さの属性は "11.2" のように数値で書きます(カンマは小数点の打ち間違い)`).toEqual([]);
  });

  it.each(files)("%s: 何も描かない rect(幅も高さも0)が残っていない", (file) => {
    const strings: Array<[string, string]> = [];
    collectSvgStrings(JSON.parse(readFileSync(join(CONTENT_DIR, file), "utf8")), file, strings);

    const noOp: string[] = [];
    for (const [path, svg] of strings) {
      for (const [tag] of svg.matchAll(/<rect\b[^>]*>/g)) {
        const size = (name: string) => {
          const found = new RegExp(`\\s${name}="([^"]*)"`).exec(tag);
          return found ? Number.parseFloat(found[1]) : NaN;
        };
        if (size("width") === 0 && size("height") === 0) noOp.push(`${path}: ${tag}`);
      }
    }
    expect(noOp, `${file}: 焼くときに落とすはず(extract-legacy-content.mjs の stripNoOpRects)`).toEqual([]);
  });
});
