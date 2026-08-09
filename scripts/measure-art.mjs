#!/usr/bin/env node
/**
 * 動く絵の「濃さ」を測る。図形の数と、動きの本数を出す。
 *
 *   node scripts/measure-art.mjs src/presentation/components/events/dooms/*.tsx
 *   node scripts/measure-art.mjs src/presentation/components/events/animations/*.tsx
 *
 * ## 正規表現で数えてはいけない
 *
 * JSX から `<rect` を数えると、**`{list.map(...)}` で作る図形が丸ごと抜ける。**
 * 紙吹雪や後光のように繰り返しで作った部分が0個として数えられ、
 * 「薄い」と誤診する。`preview-animation.mjs` が撮影で踏んだのと同じ穴なので、
 * ここでも Vite で本当に組み立てて **DOM を数える**。
 *
 * ## 出た数字をどう読むか
 *
 * **種類ごとに水準がちがう。**別の種類の物差しを持ってこないこと。
 * 2026-08-09 の実測(中央値):
 *
 * | 都市の背景 | 出来事の動く絵 | 厄災の動く絵 |
 * |---|---|---|
 * | 91〜148 | 48(最小13) | 30〜72 |
 *
 * 都市の背景の「60未満は薄い」を動く絵に当てると、
 * `02-animation-guide.md` が見本に挙げている絵(17個)まで薄判定になる。
 *
 * **そして数が足りていても薄いことがある。**茨城の厄災7枚は、数より
 * 「7枚とも同じ人・同じポーズ」「中景の無い平らな背景」のほうが効いていた。
 * それは数字ではなく `contact-sheet.mjs` で**並べて**分かった。
 * この道具は当たりを付けるためのもので、**判定ではない。**
 */
import { createServer } from "vite";
import react from "@vitejs/plugin-react";
import { chromium } from "playwright";
import { writeFileSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const files = process.argv.slice(2).filter((a) => a.endsWith(".tsx"));
if (!files.length) {
  console.error("使い方: node scripts/measure-art.mjs <tsxのパス...>");
  process.exit(1);
}

// 並行して走ることがあるので、ポートも一時ファイル名も実行ごとに変える。
const tag = `${process.pid}-${Math.floor(Math.random() * 1e6)}`;
const entryPath = resolve(`.measure-entry-${tag}.tsx`);
const htmlPath = resolve(`.measure-${tag}.html`);
const paths = files.map((f) => resolve(f));

writeFileSync(
  entryPath,
  `import { createRoot } from "react-dom/client";
${paths.map((p, i) => `import * as m${i} from ${JSON.stringify(p)};`).join("\n")}
const mods = [${paths.map((_, i) => `m${i}`).join(", ")}];
const names = ${JSON.stringify(files.map((f) => f.split("/").pop().replace(".tsx", "")))};
createRoot(document.getElementById("root")).render(
  <>{mods.map((m, i) => {
    const C = Object.values(m).find((v) => typeof v === "function");
    return <div key={i} data-id={names[i]} style={{ width: 400 }}>{C ? <C /> : null}</div>;
  })}</>
);
`,
);
writeFileSync(
  htmlPath,
  `<!doctype html><html><body><div id="root"></div>
<script type="module" src="/${entryPath.split("/").pop()}"></script></body></html>`,
);

const server = await createServer({
  configFile: false,
  root: process.cwd(),
  plugins: [react()],
  server: { port: 5600 + (process.pid % 300), strictPort: false },
  logLevel: "error",
});
await server.listen();

const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
await page.goto(`http://localhost:${server.config.server.port}/${htmlPath.split("/").pop()}`);
await page.waitForSelector("#root [data-id] svg", { timeout: 30_000 }).catch(() => {});
await page.waitForTimeout(1000);

const rows = await page.evaluate(() => {
  const SHAPES = new Set(["rect", "circle", "ellipse", "line", "path", "polygon", "polyline", "use", "image", "text"]);
  // `<defs>` の中は下絵で、そのままでは描かれない。分けて数える。
  const HIDDEN = new Set(["defs", "clipPath", "mask", "symbol", "pattern"]);
  return [...document.querySelectorAll("#root [data-id]")].map((box) => {
    const svg = box.querySelector("svg");
    if (!svg) return { id: box.dataset.id, shapes: -1 };
    let shapes = 0;
    let hidden = 0;
    for (const el of svg.querySelectorAll("*")) {
      if (!SHAPES.has(el.tagName)) continue;
      let inDefs = false;
      for (let p = el.parentElement; p && p !== svg; p = p.parentElement) {
        if (HIDDEN.has(p.tagName)) {
          inDefs = true;
          break;
        }
      }
      if (inDefs) hidden++;
      else shapes++;
    }
    const css = [...svg.querySelectorAll("style")].map((s) => s.textContent).join("\n");
    return {
      id: box.dataset.id,
      shapes,
      hidden,
      colors: new Set(svg.outerHTML.match(/#[0-9a-fA-F]{6}/g) ?? []).size,
      moves: (css.match(/@keyframes/g) ?? []).length,
      reduced: /prefers-reduced-motion/.test(css),
    };
  });
});

await browser.close();
await server.close();
rmSync(entryPath, { force: true });
rmSync(htmlPath, { force: true });
if (errors.length) console.error("描画中にエラー:", errors.join("\n"));

const median = (a) => {
  const s = [...a].sort((x, y) => x - y);
  return s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2;
};
console.log("図形  色  動き  名前");
for (const r of [...rows].sort((a, b) => a.shapes - b.shapes)) {
  if (r.shapes < 0) {
    console.log(`  --            ${r.id}  ← svg が出ませんでした`);
    continue;
  }
  const warn = r.reduced ? "" : "  ← prefers-reduced-motion が無い";
  console.log(
    `${String(r.shapes).padStart(4)}${String(r.colors).padStart(4)}${String(r.moves).padStart(6)}  ${r.id}${warn}`,
  );
}
const ok = rows.filter((r) => r.shapes >= 0).map((r) => r.shapes);
if (ok.length > 1) {
  console.log(`\n${ok.length}枚: 中央値${median(ok)} 最小${Math.min(...ok)} 最大${Math.max(...ok)}`);
}
const noReduce = rows.filter((r) => r.shapes >= 0 && !r.reduced);
if (noReduce.length) console.error(`prefers-reduced-motion が無い: ${noReduce.map((r) => r.id).join(" ")}`);
process.exit(rows.some((r) => r.shapes < 0) || noReduce.length || errors.length ? 1 : 0);
