#!/usr/bin/env node
/**
 * 動く絵を**並べて1枚に**撮る。
 *
 *   node scripts/contact-sheet.mjs /tmp/a.png src/presentation/components/events/dooms/ibaraki-*.tsx
 *   node scripts/contact-sheet.mjs /tmp/b.png before.tsx after.tsx     # 描き直しの前後
 *
 * ## なぜ1枚ずつではなく並べるのか
 *
 * 2026-08-09、茨城の厄災7枚が薄いかどうかを要素数の表で議論していたが、
 * **表では決着しなかった。**並べて撮ったら一目で分かった——
 * **7枚とも同じ人で、同じ腕の上げかたをしていた。**
 * 1枚ずつ見ているあいだは誰も気づかない。数字にも出ない。
 *
 * 台紙はマゼンタ。**塗り残しがあればそこだけ蛍光ピンクになる**ので、
 * 並べたついでに抜けも見つかる(`check-city-backgrounds.mjs` と同じ手)。
 *
 * 撮ったら**必ず開いて目で見ること。**撮っただけでは確認したことにならない。
 */
import { createServer } from "vite";
import react from "@vitejs/plugin-react";
import { chromium } from "playwright";
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { sceneSources } from "./scene-entry.mjs";

const [output, ...files] = process.argv.slice(2);
if (!output || !files.length) {
  console.error("使い方: node scripts/contact-sheet.mjs <出力png> <tsxのパス...>");
  process.exit(1);
}

const cols = files.length > 1 ? 2 : 1;
const tag = `${process.pid}-${Math.floor(Math.random() * 1e6)}`;
const entryPath = resolve(`.sheet-entry-${tag}.tsx`);
const htmlPath = resolve(`.sheet-${tag}.html`);
const paths = files.map((f) => resolve(f));

// 絵の中身をこの入口ファイルへ写す(`scene-entry.mjs` に理由)。
// **テンプレート文字列で組み立てないこと。**絵はバッククォートを含む。
const { prelude, names } = sceneSources(paths);
writeFileSync(
  entryPath,
  'import { createRoot } from "react-dom/client";\n' +
    prelude +
    `\nconst scenes = [${names.join(", ")}];\n` +
    "createRoot(document.getElementById('root')).render(\n" +
    `  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(${cols}, 400px)', gap: 8 }}>\n` +
    "    {scenes.map((C, i) => (\n" +
    "      <div key={i} style={{ width: 400, outline: '1px solid #fff' }}>{C ? <C /> : null}</div>\n" +
    "    ))}\n" +
    "  </div>\n" +
    ");\n",
);
writeFileSync(
  htmlPath,
  `<!doctype html><html><body style="margin:0;background:#ff00ff">
<div id="root"></div><script type="module" src="/${entryPath.split("/").pop()}"></script></body></html>`,
);

const server = await createServer({
  configFile: false,
  root: process.cwd(),
  plugins: [react()],
  server: { port: 5900 + (process.pid % 90), strictPort: false },
  logLevel: "error",
});
await server.listen();

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: cols * 410 + 20, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
// **`server.config.server.port` は設定値で、実際に開いた番号ではない。**
// 誰かが先にその番号を使っていると Vite は次を取るので、設定値を見に行くと
// **他人のサーバを撮ってしまう。**開いた URL を使う。
const base = server.resolvedUrls?.local?.[0] ?? `http://localhost:${server.config.server.port}/`;
await page.goto(`${base.replace(/\/$/, "")}/${htmlPath.split("/").pop()}`);
await page.waitForSelector("#root svg", { timeout: 30_000 }).catch(() => {});
// 動きの途中を撮る。0秒だと、動く部分が消えている絵になることがある。
await page.waitForTimeout(1500);
mkdirSync(dirname(resolve(output)), { recursive: true });
await page.screenshot({ path: output, fullPage: true });
await browser.close();
await server.close();
rmSync(entryPath, { force: true });
rmSync(htmlPath, { force: true });

if (errors.length) {
  console.error("描画中にエラー:", errors.join("\n"));
  process.exit(1);
}
console.log(output);
