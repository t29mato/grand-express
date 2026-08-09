#!/usr/bin/env node
/**
 * アニメーション1本を単体で描いて確認する。
 *
 * 盤面を進めて目的のマスに止まるのを待たなくても、ファイルを指定するだけで
 * 動いている絵を見られる。
 *
 *   npm run preview -- <tsxのパス> <出力png> [待ち時間ms]
 *
 * 実装の注意: 以前は JSX から `<svg>…</svg>` を正規表現で切り出していたが、
 * それだと `{list.map(...)}` で作る要素が**描かれないまま静かに消える**。
 * 紙吹雪や後光のように繰り返しで作る部分がごっそり抜けた絵を「確認済み」と
 * 誤認してしまうため、Vite で本当にコンポーネントを組み立てて描くようにした。
 *
 * もう一つ: **絵は import せず、入口ファイルへ写し取る**(`scene-entry.mjs`)。
 * 2026-08-09、ファイルを直したのに前の絵が撮れた(ディスク上は新しかった)。
 * 撮った絵を目で見て確かめる手順そのものが嘘になるので、これは静かに間違える。
 * 理由はそちらに書いてある。
 */
import { createServer } from "vite";
import react from "@vitejs/plugin-react";
import { chromium } from "playwright";
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { sceneSources } from "./scene-entry.mjs";

const [, , input, output = "preview.png", waitMs = "1800"] = process.argv;
if (!input) {
  console.error("使い方: npm run preview -- <tsxのパス> <出力png> [待ち時間ms]");
  process.exit(1);
}

// 並行して何本も撮ることがあるので、ポートも一時ファイル名も実行ごとに変える。
// 固定にすると「Port already in use」で落ちるうえ、最悪お互いの一時ファイルを
// 上書きして別の絵を撮ってしまう。
const tag = `${process.pid}-${Math.floor(Math.random() * 1e6)}`;
const port = 5200 + (process.pid % 300);
const entryPath = resolve(`.preview-entry-${tag}.tsx`);
const htmlPath = resolve(`.preview-${tag}.html`);
const componentPath = resolve(input);

// 絵の中身をこの入口ファイルへ写す。**テンプレート文字列で組み立てないこと。**
// 絵は `<style>{`...`}</style>` にバッククォートを含むので、囲みが壊れる。
const { prelude, names } = sceneSources([componentPath]);
writeFileSync(
  entryPath,
  'import { createRoot } from "react-dom/client";\n' +
    prelude +
    `\nconst Scene = ${names[0]};\n` +
    "createRoot(document.getElementById('root')).render(<Scene />);\n",
);
writeFileSync(
  htmlPath,
  `<!doctype html><html><body style="margin:0;background:#1b1330;display:grid;place-items:center">
<div id="root" style="width:820px"></div>
<script type="module" src="/${entryPath.split("/").pop()}"></script></body></html>`,
);

const server = await createServer({
  configFile: false,
  root: process.cwd(),
  plugins: [react()],
  server: { port, strictPort: false },
  logLevel: "error",
});
await server.listen();

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 860, height: 460 } });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
const base = server.resolvedUrls?.local?.[0] ?? `http://localhost:${port}/`;
const url = `${base.replace(/\/$/, "")}/${htmlPath.split("/").pop()}`;
await page.goto(url);
// **絵が出なかったら黙って撮らない。**以前は握りつぶしていたので、
// 真っ暗な画像を「確認済み」として保存できてしまった。
const drawn = await page
  .waitForSelector("#root svg", { timeout: 15_000 })
  .then(() => true)
  .catch(() => false);
await page.waitForTimeout(Number(waitMs));
mkdirSync(dirname(resolve(output)), { recursive: true });
await page.screenshot({ path: output });
await browser.close();
await server.close();
rmSync(entryPath, { force: true });
rmSync(htmlPath, { force: true });

if (!drawn) {
  console.error(`svg が出ませんでした: ${input}`);
  process.exit(1);
}
if (errors.length) {
  console.error("描画中にエラー:", errors.join("\n"));
  process.exit(1);
}
console.log(output);
