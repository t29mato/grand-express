/**
 * アニメーション1本を単体で描いて確認する。
 *
 * 盤面を進めて目的のマスに止まるのを待たなくても、ファイルを指定するだけで
 * 動いている絵を見られる。
 *
 *   npm run preview -- <tsxのパス> <出力png> [待ち時間ms]
 *
 * JSXから <svg>…</svg> を切り出してHTMLの属性名に直しているだけなので、
 * 仕様どおり自己完結したSVGであれば、そのまま描ける。
 */
import { chromium } from "playwright";
import { readFileSync } from "node:fs";
const file = process.argv[2];
const src = readFileSync(file, "utf8");
// JSXから <svg>…</svg> を取り出し、属性名をHTMLに直す
let svg = src.slice(src.indexOf("<svg"), src.lastIndexOf("</svg>") + 6);
svg = svg
  .replace(/\{`/g, "").replace(/`\}/g, "")
  .replace(/className=/g, "class=")
  .replace(/strokeWidth=/g, "stroke-width=").replace(/strokeLinejoin=/g, "stroke-linejoin=")
  .replace(/strokeLinecap=/g, "stroke-linecap=").replace(/strokeDasharray=/g, "stroke-dasharray=")
  .replace(/fillOpacity=/g, "fill-opacity=").replace(/strokeOpacity=/g, "stroke-opacity=")
  .replace(/clipPath=/g, "clip-path=").replace(/transformOrigin=/g, "transform-origin=")
  .replace(/textAnchor=/g, "text-anchor=").replace(/fontSize=/g, "font-size=")
  .replace(/\{(-?[\d.]+)\}/g, '"$1"');
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 800, height: 420 } });
await p.setContent(`<body style="margin:0;background:#1b1330;display:grid;place-items:center">
  <div style="width:760px">${svg}</div></body>`);
await p.waitForTimeout(Number(process.argv[4] ?? 1800));
await p.screenshot({ path: process.argv[3] });
await b.close();
console.log(process.argv[3]);
