import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

/**
 * 盤面の絵は**文字列で組み立てたSVG**なので、属性名はSVGの綴り
 * (`stroke-width`)でなければならない。JSXの書き癖で `strokeWidth` と書いても、
 * **JavaScriptとしては有効な文字列なので、どこもエラーを出さない。**
 * ブラウザが知らない属性として黙って捨てるだけで、線の太さが既定値になる。
 *
 * マレーシア盤面で3箇所見つかった。`node -e` での読み込みでも
 * `buildMalaysiaContent()` でも捕まらず、**マゼンタ台紙に載せて目視して**
 * 初めて分かったもの。目で見て回るのは19盤面では続かないので、ここで測る。
 */
const COUNTRIES_DIR = join(process.cwd(), "scripts", "countries");

/** SVGには存在しない、JSX側の綴り。文字列のSVGに出てきたら誤記。 */
const JSX_ONLY = [
  "strokeWidth",
  "strokeLinecap",
  "strokeLinejoin",
  "strokeDasharray",
  "strokeOpacity",
  "fillOpacity",
  "fillRule",
  "clipPath",
  "textAnchor",
  "fontSize",
  "fontWeight",
  "fontFamily",
  "stopColor",
  "stopOpacity",
  "transformOrigin",
];

describe("文字列で組み立てるSVGの属性名", () => {
  const boards = readdirSync(COUNTRIES_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  it.each(boards)("%s: JSXの綴りが混ざっていない", (board) => {
    const found: string[] = [];
    for (const file of readdirSync(join(COUNTRIES_DIR, board))) {
      if (!file.endsWith(".mjs")) continue;
      const source = readFileSync(join(COUNTRIES_DIR, board, file), "utf8");
      for (const name of JSX_ONLY) {
        // 属性として書かれているものだけを見る(関数の引数名は正しい使い方)。
        if (new RegExp(`${name}\\s*=\\s*["'\`]`).test(source)) {
          found.push(`${file}: ${name}=`);
        }
      }
    }
    expect(found, `${board}: SVGの綴りは stroke-width のようにハイフンで書きます`).toEqual([]);
  });
});
