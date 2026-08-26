/**
 * itch.io のカバー画像(630×500)を作る。
 *
 * **絵を手で描かない。**世界盤(`world.content.json`)の海岸線・航路・都市を
 * そのまま使って組む。盤面の色もその中の `sea` / `landBase` / `coast` /
 * `stripe` を読む。こうしておけば、盤面の見た目が変われば表紙も追随する。
 *
 * 文字は**タイトルと一言キャッチだけ。**itch.io の一覧では 315×250 まで
 * 縮むので、小さい文字を入れても読めない(入れると汚れにしかならない)。
 *
 *   node scripts/make-itchio-cover.mjs
 *   → docs/screenshots/itchio/cover-630x500.svg と .png
 */
import { readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

const W = 630;
const H = 500;
const OUT = "docs/screenshots/itchio/cover-630x500";

const board = JSON.parse(readFileSync("src/infrastructure/content/world.content.json", "utf8"));
const { LON0, LON1, LAT0, LAT1, BW, BH } = board.proj;

/** 盤面の座標系(BW×BH)へ落とす。ゲーム内と同じ式。 */
const px = (lon) => ((lon - LON0) / (LON1 - LON0)) * BW;
const py = (lat) => ((LAT0 - lat) / (LAT0 - LAT1)) * BH;

/**
 * 世界盤は横に長い(3703×1210、比 3.06)。カバーは 630×500(比 1.26)なので、
 * **どちらかを捨てるしかない。**縦に合わせて切ると経度が狭まり「世界を回る」
 * 感じが消えるので、**横を全部見せて帯にする。**空いた上側に題を置く。
 */
const BLEED = 1.11; // 左右を少しはみ出させて、切れ端が見えないようにする
const scale = (W * BLEED) / BW;
const mapW = BW * scale;
const mapH = BH * scale;
const mapX = (W - mapW) / 2;
const mapY = 236 - mapH / 2 + 96; // 帯の中心を下寄りに

const X = (lon) => mapX + px(lon) * scale;
const Y = (lat) => mapY + py(lat) * scale;

const round = (n) => Math.round(n * 10) / 10;

/** 陸のかたち。経度またぎで横断する破片は捨てる(端で長い線を引いてしまうため)。 */
const landPaths = board.land
  .map((ring) => {
    const pts = ring.map(([lon, lat]) => [X(lon), Y(lat)]);
    const spanX = Math.max(...pts.map((p) => p[0])) - Math.min(...pts.map((p) => p[0]));
    if (spanX > W * 0.95) return null;
    const d = `M${pts.map(([x, y]) => `${round(x)},${round(y)}`).join("L")}Z`;
    return `<path d="${d}"/>`;
  })
  .filter(Boolean);

/** 航路と鉄路。海路は破線、陸路は実線にして、盤面の見分け方をそのまま持ち込む。 */
const cities = board.cities;
const edges = board.edges
  .map(([a, b, kind]) => {
    const ca = cities[a];
    const cb = cities[b];
    if (!ca || !cb) return null;
    const x1 = X(ca.lo);
    const y1 = Y(ca.la);
    const x2 = X(cb.lo);
    const y2 = Y(cb.la);
    if (Math.abs(x1 - x2) > W * 0.6) return null; // 経度またぎ
    const dash = kind === "sea" ? ' stroke-dasharray="4 3"' : "";
    return `<line x1="${round(x1)}" y1="${round(y1)}" x2="${round(x2)}" y2="${round(y2)}"${dash}/>`;
  })
  .filter(Boolean);

const dots = Object.values(cities)
  .map((c) => `<circle cx="${round(X(c.lo))}" cy="${round(Y(c.la))}" r="3.1"/>`)
  .join("");

const [, c1, c2, c3, c4] = board.stripe;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0a1e33"/>
      <stop offset="0.52" stop-color="${board.sea}"/>
      <stop offset="1" stop-color="#0d2740"/>
    </linearGradient>
    <linearGradient id="rule" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${c1}" stop-opacity="0"/>
      <stop offset="0.2" stop-color="${c1}"/>
      <stop offset="0.5" stop-color="${c3}"/>
      <stop offset="0.8" stop-color="${c2}"/>
      <stop offset="1" stop-color="${c2}" stop-opacity="0"/>
    </linearGradient>
    <filter id="lift" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="2" stdDeviation="5" flood-color="#04121f" flood-opacity="0.75"/>
    </filter>
    <!--
      盤面の北の縁(緯度${LAT0}度)で陸が水平にすっぱり切れる。そのままだと
      切り損ねたように見えるので、上の40pxほどを背景へ溶かして奥行きにする。
    -->
    <linearGradient id="fade" gradientUnits="userSpaceOnUse"
      x1="0" y1="${round(mapY)}" x2="0" y2="${round(mapY + 46)}">
      <stop offset="0" stop-color="#000"/>
      <stop offset="1" stop-color="#fff"/>
    </linearGradient>
    <mask id="topfade">
      <rect width="${W}" height="${H}" fill="url(#fade)"/>
    </mask>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#sky)"/>

  <g mask="url(#topfade)">
    <g fill="${board.landBase}" stroke="${board.coast}" stroke-width="1.1" stroke-linejoin="round">
      ${landPaths.join("\n      ")}
    </g>
    <g stroke="${c4}" stroke-width="1.6" stroke-opacity="0.92" stroke-linecap="round" fill="none">
      ${edges.join("\n      ")}
    </g>
    <g fill="${c1}" stroke="#2b3a1e" stroke-width="1.1">${dots}</g>
  </g>

  <g text-anchor="middle" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" filter="url(#lift)">
    <text x="${W / 2}" y="132" font-size="72" font-weight="700" letter-spacing="2" fill="#fdfbf4">World Express</text>
    <text x="${W / 2}" y="180" font-size="25" font-weight="500" letter-spacing="0.4" fill="${c4}">Roll dice across real railway maps</text>
  </g>
  <rect x="${W / 2 - 190}" y="150" width="380" height="2" fill="url(#rule)"/>
</svg>
`;

writeFileSync(`${OUT}.svg`, svg);
execFileSync("rsvg-convert", ["-w", String(W), "-h", String(H), "-o", `${OUT}.png`, `${OUT}.svg`]);
console.log(`陸 ${landPaths.length}片 / 路線 ${edges.length}本 / 都市 ${Object.keys(cities).length}個`);
console.log(`→ ${OUT}.png`);
