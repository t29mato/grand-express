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
 */
import { createServer } from "vite";
import react from "@vitejs/plugin-react";
import { chromium } from "playwright";
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";

const [, , input, output = "preview.png", waitMs = "1800"] = process.argv;
if (!input) {
  console.error("使い方: npm run preview -- <tsxのパス> <出力png> [待ち時間ms]");
  process.exit(1);
}

const entryPath = resolve(".preview-entry.tsx");
const htmlPath = resolve(".preview.html");
const componentPath = resolve(input);

// 名前付きエクスポートを1つだけ持つ約束なので、最初の関数を描く。
writeFileSync(
  entryPath,
  `import { createRoot } from "react-dom/client";
import * as mod from ${JSON.stringify(componentPath)};
const Scene = Object.values(mod).find((v) => typeof v === "function");
createRoot(document.getElementById("root")).render(<Scene />);
`,
);
writeFileSync(
  htmlPath,
  `<!doctype html><html><body style="margin:0;background:#1b1330;display:grid;place-items:center">
<div id="root" style="width:820px"></div>
<script type="module" src="/.preview-entry.tsx"></script></body></html>`,
);

const server = await createServer({
  configFile: false,
  root: process.cwd(),
  plugins: [react()],
  server: { port: 5199, strictPort: true },
  logLevel: "error",
});
await server.listen();

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 860, height: 460 } });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
await page.goto("http://localhost:5199/.preview.html");
await page.waitForSelector("#root svg", { timeout: 15_000 }).catch(() => {});
await page.waitForTimeout(Number(waitMs));
mkdirSync(dirname(resolve(output)), { recursive: true });
await page.screenshot({ path: output });
await browser.close();
await server.close();
rmSync(entryPath, { force: true });
rmSync(htmlPath, { force: true });

if (errors.length) {
  console.error("描画中にエラー:", errors.join("\n"));
  process.exit(1);
}
console.log(output);
