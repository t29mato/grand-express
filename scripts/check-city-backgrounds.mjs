#!/usr/bin/env node
/**
 * 都市の背景SVGに**塗り残し**が無いか実測する。
 *
 *   node scripts/check-city-backgrounds.mjs          全部見る
 *   node scripts/check-city-backgrounds.mjs japan    1国だけ
 *
 * 背景は「空の帯」と「地面の矩形」を別々に置くので、両者のyが噛み合っていないと
 * **横一文字の塗り残し**ができ、都市カードの地色がそのまま透ける。
 * 2026-08-08 の初回計測では全77背景のうち**30種・63,266px**で起きていた。
 * いちばんひどい `japan/metropolis` は地面が1枚も無く、ビルのあいだが下端まで素通しだった。
 *
 * **静的に `<rect>` を数える方法では見つからない。** 地面を `<path>` で描いている
 * シーンを塗り残しと誤判定するし、逆に図形の重なりで塞がっている箇所も分からない。
 * そこで実際にマゼンタ `#ff00ff` の台紙へ描いて、透けている画素を数える。
 *
 * 直す場所は国によって違う:
 *   india / france / world / ibaraki → scripts/countries/<国>/art.mjs の sky() の深さ
 *   japan / bolivia                 → legacy が凍結なので scripts/content-overrides/ で上書き
 */
import { chromium } from "playwright";
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const contentDir = join(__dirname, "..", "src", "infrastructure", "content");
const ALL = ["bolivia", "japan", "india", "france", "world", "ibaraki"];

const only = process.argv[2];
const countries = only ? [only] : ALL;
for (const c of countries) {
  if (!existsSync(join(contentDir, `${c}.content.json`))) {
    console.error(`知らない国です: ${c}(${ALL.join(" / ")})`);
    process.exit(2);
  }
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 500, height: 300 } });

/** SVG断片をマゼンタの台紙へ描き、透けている画素を行ごとに数える。 */
async function measure(svg) {
  return page.evaluate(async (inner) => {
    const src =
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 210" width="400" height="210">${inner}</svg>`;
    const img = new Image();
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(src);
    await img.decode();
    const cv = document.createElement("canvas");
    cv.width = 400;
    cv.height = 210;
    const ctx = cv.getContext("2d");
    ctx.fillStyle = "#ff00ff";
    ctx.fillRect(0, 0, 400, 210);
    ctx.drawImage(img, 0, 0);
    const px = ctx.getImageData(0, 0, 400, 210).data;
    let total = 0;
    const rows = [];
    for (let y = 0; y < 210; y++) {
      let n = 0;
      for (let x = 0; x < 400; x++) {
        const i = (y * 400 + x) * 4;
        // 台紙のマゼンタがそのまま残っている = そこは何も塗られていない
        if (px[i] > 200 && px[i + 1] < 60 && px[i + 2] > 200) n++;
      }
      total += n;
      if (n > 0) rows.push([y, n]);
    }
    return { total, rows };
  }, svg);
}

let bad = 0;
let totalPx = 0;
let checked = 0;
for (const country of countries) {
  const content = JSON.parse(readFileSync(join(contentDir, `${country}.content.json`), "utf8"));
  for (const [key, svg] of Object.entries(content.bg)) {
    checked++;
    const { total, rows } = await measure(svg);
    if (total === 0) continue;
    bad++;
    totalPx += total;
    const ys = rows.map(([y]) => y);
    const widest = Math.max(...rows.map(([, n]) => n));
    console.log(
      `NG ${country}/${key}: ${total}px 透けています ` +
        `(y=${ys[0]}〜${ys[ys.length - 1]} の ${rows.length}行 / 最大幅 ${widest}px)`,
    );
  }
}
await browser.close();

if (bad === 0) {
  console.log(`背景 ${checked}種、塗り残しはありません。`);
  process.exit(0);
}
console.log(`\n背景 ${checked}種のうち ${bad}種 / 合計 ${totalPx}px が透けています。`);
console.log("空を塗り下ろす深さ(sky の第3引数)を、次に来る塗りの開始yに合わせてください。");
process.exit(1);
