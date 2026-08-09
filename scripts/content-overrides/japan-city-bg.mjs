/**
 * 日本の都市の背景の描き直し。
 *
 * legacy の背景は1枚あたり平均36要素で、空・遠景・地面の3層しかない。
 * 同じ背景を最大9都市が共用しているので、その9都市がまったく同じ絵になる。
 * フランス(平均98要素)と同じ密度まで持ち上げる。
 * 手本は `scripts/countries/france/art.mjs` の `alps`。
 *
 * `legacy/grand-express.html` は凍結しているので、ここで `override.bg` として差し替える。
 *
 * ⚠ **中央 x=151〜249 / y=54〜152 は都市のシンボルに隠れる**
 *   (`city-art.tsx` が s=4.1 / gy=152 で描くため)。影の楕円も (200,155) rx=53 に載る。
 *   細部は左右3分の1と、y>170 の手前に置くこと。
 *
 * ⚠ **空は「次に来る塗りの開始y」まで塗り下ろす。**噛み合っていないと横一文字に透ける。
 *   `node scripts/check-city-backgrounds.mjs` で必ず実測すること。
 *
 * 詳しくは docs/50-authoring/12-city-background-guide.md。
 */

const W = 400;

/** 小数の桁を抑える(SVGを読みやすく保つため)。 */
const r1 = (v) => Math.round(v * 10) / 10;

function band(y, h, fill) {
  return `<rect x="0" y="${y}" width="${W}" height="${h}" fill="${fill}"/>`;
}

function ground(y, fill) {
  return `<rect x="0" y="${y}" width="${W}" height="${210 - y}" fill="${fill}"/>`;
}

/** 空を3枚重ねて階調にする。`to` は塗り下ろす深さ(= 次に来る塗りの開始y)。 */
function sky(to, top, mid, low) {
  return (
    band(0, r1(to * 0.5), top) +
    band(r1(to * 0.44), r1(to * 0.34), mid) +
    band(r1(to * 0.72), r1(to * 0.28 + 2), low)
  );
}

/** 接地の影。物の下に敷かないと浮く。 */
function shade(cx, cy, rx, ry, o = ".2") {
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#000" opacity="${o}"/>`;
}

/** 人。20px前後。腕は別に描いて作業の内容を出す。 */
function person(x, base, h, shirt, skin = "#e0b48a") {
  const hd = r1(h * 0.19);
  const top = r1(base - h + hd * 1.7);
  return (
    `<g><rect x="${r1(x - h * 0.09)}" y="${r1(base - h * 0.4)}" width="${r1(h * 0.08)}" height="${r1(h * 0.4)}" fill="#3f3428"/>` +
    `<rect x="${r1(x + h * 0.02)}" y="${r1(base - h * 0.4)}" width="${r1(h * 0.08)}" height="${r1(h * 0.4)}" fill="#3f3428"/>` +
    `<path d="M${r1(x - h * 0.16)},${top}h${r1(h * 0.32)}l${r1(h * 0.03)},${r1(h * 0.42)}h${r1(-h * 0.38)}z" fill="${shirt}"/>` +
    `<circle cx="${x}" cy="${r1(top - hd * 0.75)}" r="${hd}" fill="${skin}"/></g>`
  );
}

function arm(x, y, dx, dy, color = "#e0b48a", w = 3) {
  return `<path d="M${x},${y}l${dx},${dy}" stroke="${color}" stroke-width="${w}" stroke-linecap="round" fill="none"/>`;
}

/**
 * 黒松。日本の海岸の絵はこれが要る(白砂青松)。
 * 丸い樹冠にすると洋風の並木になってしまうので、**平たい葉の塊を段に重ねる**。
 * 幹は海風で傾いた形にする。
 */
function pine(x, base, h, lean = 0, dark = false) {
  const a = dark ? "#27503a" : "#316642";
  const b = dark ? "#1d3f2d" : "#25523a";
  const parts = [
    // 幹。細く、上へ行くほど絞る
    `<path d="M${r1(x - 2.4)},${base}q${r1(lean * 0.3)},${r1(-h * 0.5)} ${r1(lean + 0.3)},${r1(-h * 0.94)}h3.4q${r1(-lean * 0.42)},${r1(h * 0.46)} ${r1(-lean * 0.04 + 1.6)},${r1(h * 0.94)}z" fill="#5f4628"/>`,
  ];
  /**
   * 葉の塊。**きれいな楕円を等間隔に積むと、串に刺したパンケーキに見える。**
   * 実際そうなった。輪郭を崩し、上下を重ね、左右へ振り分け、枝でつなぐ。
   */
  const pads = [
    [0.52, -0.19, 0.32, 0.105, b],
    [0.66, 0.16, 0.27, 0.095, a],
    [0.79, -0.13, 0.23, 0.082, b],
    [0.9, 0.1, 0.17, 0.068, a],
    [0.99, -0.02, 0.11, 0.052, b],
  ];
  for (const [t, off, rxf, ryf, fill] of pads) {
    const cx = r1(x + lean * t + h * off);
    const cy = r1(base - h * t);
    const rx = h * rxf;
    const ry = h * ryf;
    // 枝(幹から塊へ)。これが無いと塊が宙に浮く
    parts.push(
      `<path d="M${r1(x + lean * t)},${cy}L${cx},${r1(cy + ry * 0.3)}" stroke="#5f4628" stroke-width="1.8" stroke-linecap="round" fill="none"/>`,
    );
    parts.push(
      `<path d="M${r1(cx - rx)},${cy}` +
        `Q${r1(cx - rx * 0.62)},${r1(cy - ry * 1.9)} ${r1(cx - rx * 0.08)},${r1(cy - ry * 1.05)}` +
        `Q${r1(cx + rx * 0.44)},${r1(cy - ry * 2)} ${r1(cx + rx * 0.86)},${r1(cy - ry * 0.45)}` +
        `Q${r1(cx + rx * 1.06)},${r1(cy + ry * 0.62)} ${r1(cx + rx * 0.38)},${r1(cy + ry * 1)}` +
        `Q${r1(cx - rx * 0.42)},${r1(cy + ry * 1.35)} ${r1(cx - rx)},${cy}z" fill="${fill}"/>`,
    );
  }
  return parts.join("");
}

/** 杉。日本の山肌はこれが並ぶ。細くまっすぐ、先が尖る。 */
function cedar(x, base, h, fill = "#2f5f3f") {
  const w = r1(h * 0.3);
  return (
    `<rect x="${r1(x - 1.2)}" y="${r1(base - 4)}" width="2.4" height="4" fill="#5a4630"/>` +
    `<path d="M${r1(x - w / 2)},${r1(base - 2)}L${x},${r1(base - h)}L${r1(x + w / 2)},${r1(base - 2)}z" fill="${fill}"/>`
  );
}

/** 瓦屋根の農家。妻壁・下見板・格子窓まで入れる。 */
function farmhouse(x, base, w, h, roof = "#4a5568", wall = "#efe8d8") {
  const top = r1(base - h);
  const cx = r1(x + w / 2);
  const eave = r1(h * 0.52);
  return (
    `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="${wall}"/>` +
    `<path d="M${r1(x - 8)},${top}L${cx},${r1(top - eave)}L${r1(x + w + 8)},${top}z" fill="${roof}"/>` +
    `<path d="M${r1(x - 8)},${top}h${r1(w + 16)}v3h${r1(-w - 16)}z" fill="#3a4453"/>` +
    `<g stroke="#3a4453" stroke-width="1" opacity=".5" fill="none"><path d="M${cx},${r1(top - eave)}L${r1(x - 4)},${r1(top - 1)}M${cx},${r1(top - eave)}L${r1(x + w + 4)},${r1(top - 1)}"/></g>` +
    `<rect x="${x}" y="${r1(base - h * 0.34)}" width="${w}" height="${r1(h * 0.34)}" fill="#8a6a44"/>` +
    `<g stroke="#6b5330" stroke-width="1" opacity=".7" fill="none"><path d="M${x},${r1(base - h * 0.22)}h${w}M${x},${r1(base - h * 0.1)}h${w}"/></g>` +
    `<g fill="#f5d38a"><rect x="${r1(x + w * 0.16)}" y="${r1(top + h * 0.2)}" width="${r1(w * 0.24)}" height="${r1(h * 0.26)}"/><rect x="${r1(x + w * 0.6)}" y="${r1(top + h * 0.2)}" width="${r1(w * 0.24)}" height="${r1(h * 0.26)}"/></g>` +
    `<g stroke="#8a6a44" stroke-width="1"><path d="M${r1(x + w * 0.28)},${r1(top + h * 0.2)}v${r1(h * 0.26)}M${r1(x + w * 0.72)},${r1(top + h * 0.2)}v${r1(h * 0.26)}"/></g>`
  );
}

/** 入道雲。南の島の空はこれがあるだけで南になる。 */
function cumulonimbus(x, base, s = 1) {
  const p = (v) => r1(v * s);
  return (
    `<g fill="#f8fbfd"><path d="M${x - p(46)},${base}q${-p(6)},${-p(20)} ${p(10)},${-p(26)}` +
    `q${-p(2)},${-p(22)} ${p(22)},${-p(24)}q${p(8)},${-p(18)} ${p(28)},${-p(10)}` +
    `q${p(20)},${-p(6)} ${p(24)},${p(16)}q${p(20)},${p(2)} ${p(16)},${p(22)}` +
    `q${p(12)},${p(8)} ${p(4)},${p(22)}z"/></g>` +
    `<g fill="#dfe8ee" opacity=".7"><path d="M${x - p(46)},${base}q${-p(6)},${-p(20)} ${p(10)},${-p(26)}q${p(4)},${p(14)} ${p(18)},${p(26)}z"/>` +
    `<path d="M${x + p(20)},${base}q${p(8)},${-p(14)} ${p(4)},${p(0)}z"/></g>`
  );
}

/** 赤瓦の家(沖縄)。石垣とシーサーまで入れて初めて沖縄になる。 */
function ryukyuHouse(x, base, w) {
  const h = r1(w * 0.34);
  const top = r1(base - h);
  const cx = r1(x + w / 2);
  return (
    `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="#f0e6d2"/>` +
    `<path d="M${r1(x - 10)},${top}L${cx},${r1(top - w * 0.22)}L${r1(x + w + 10)},${top}z" fill="#c2523a"/>` +
    `<g stroke="#a8412c" stroke-width="1.2" opacity=".8" fill="none">${[0.25, 0.5, 0.75]
      .map((t) => `<path d="M${cx},${r1(top - w * 0.22)}L${r1(x - 10 + (w + 20) * t)},${top}"/>`)
      .join("")}</g>` +
    `<path d="M${r1(x - 10)},${top}h${r1(w + 20)}v3h${r1(-w - 20)}z" fill="#a8412c"/>` +
    // シーサー(棟の上に一対)
    `<g fill="#d8a05c">${[-0.16, 0.16]
      .map((o) => {
        const sx = r1(cx + w * o);
        const sy = r1(top - w * 0.22 + Math.abs(o) * w * 0.44);
        return `<path d="M${sx - 3},${sy}q0,-6 3.4,-6q3.4,0 3.4,6z"/><circle cx="${sx + 0.4}" cy="${r1(sy - 7)}" r="2.6"/>`;
      })
      .join("")}</g>` +
    // 石垣(琉球石灰岩の積み)
    `<rect x="${r1(x - 12)}" y="${r1(base - 12)}" width="${r1(w + 24)}" height="12" fill="#d8cfb8"/>` +
    `<g stroke="#b8ad94" stroke-width="1" opacity=".8" fill="none">${[0, 1, 2, 3, 4]
      .map((i) => `<path d="M${r1(x - 12 + (w + 24) * (i / 5))},${r1(base - 12)}v12"/>`)
      .join("")}<path d="M${r1(x - 12)},${r1(base - 6)}h${r1(w + 24)}"/></g>` +
    `<g fill="#6b5330"><rect x="${r1(cx - w * 0.14)}" y="${r1(top + h * 0.34)}" width="${r1(w * 0.28)}" height="${r1(h * 0.66)}"/></g>`
  );
}

/** ガジュマル。垂れる気根がこの木の決め手。 */
function banyan(x, base, h) {
  const parts = [
    `<path d="M${r1(x - 4)},${base}q${r1(-1)},${r1(-h * 0.5)} ${r1(2)},${r1(-h * 0.78)}h7q${r1(3)},${r1(h * 0.3)} ${r1(2)},${r1(h * 0.78)}z" fill="#6b5a3c"/>`,
  ];
  for (const [dx, dy] of [[-16, 0.62], [-8, 0.7], [9, 0.66], [17, 0.58], [24, 0.5]]) {
    parts.push(
      `<path d="M${r1(x + dx)},${r1(base - h * dy)}v${r1(h * dy - 2)}" stroke="#7a684a" stroke-width="1.6" stroke-linecap="round" fill="none"/>`,
    );
  }
  parts.push(
    `<g fill="#2f7d3f"><ellipse cx="${r1(x - 16)}" cy="${r1(base - h * 0.7)}" rx="20" ry="12"/>` +
      `<ellipse cx="${r1(x + 14)}" cy="${r1(base - h * 0.74)}" rx="22" ry="13"/>` +
      `<ellipse cx="${x}" cy="${r1(base - h * 0.88)}" rx="24" ry="14"/></g>`,
    `<g fill="#3f9350" opacity=".8"><ellipse cx="${r1(x - 12)}" cy="${r1(base - h * 0.82)}" rx="12" ry="7"/><ellipse cx="${r1(x + 16)}" cy="${r1(base - h * 0.68)}" rx="10" ry="6"/></g>`,
  );
  return parts.join("");
}

/** 屋根に雪の載った三角屋根の家。北国の街並みはこれを並べる。 */
function snowHouse(x, base, w, h, wall = "#c9bda4", roof = "#8a5a4a") {
  const top = r1(base - h);
  const cx = r1(x + w / 2);
  const eave = r1(h * 0.6);
  // 壁を #e6dfcd にしたら、雪の地面(#e8eef4)と明度が近すぎて家が消えた。
  // 雪景色は背景がいちばん明るいので、**建物は思い切って落とす**。
  return (
    `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="${wall}"/>` +
    `<rect x="${x}" y="${top}" width="${w}" height="3" fill="#a8997e" opacity=".6"/>` +
    `<path d="M${r1(x - 6)},${top}L${cx},${r1(top - eave)}L${r1(x + w + 6)},${top}z" fill="${roof}"/>` +
    // 屋根に積もった雪(軒から少し垂れる)
    `<path d="M${r1(x - 7)},${r1(top + 1)}L${cx},${r1(top - eave)}L${r1(x + w + 7)},${r1(top + 1)}q${-6},${4} ${-14},${1}q${-10},${3} ${-18},${-1}q${-12},${3} ${-22},0q${-10},${3} ${-18},0q${-8},${2} ${-14},0z" fill="#f8fbfd"/>` +
    `<g fill="#f5d38a"><rect x="${r1(x + w * 0.16)}" y="${r1(top + h * 0.28)}" width="${r1(w * 0.26)}" height="${r1(h * 0.34)}"/><rect x="${r1(x + w * 0.58)}" y="${r1(top + h * 0.28)}" width="${r1(w * 0.26)}" height="${r1(h * 0.34)}"/></g>` +
    `<rect x="${x}" y="${r1(base - 4)}" width="${w}" height="4" fill="#c9c0ac"/>`
  );
}

/** 電柱と電線。北国の街の空はこれで埋まっている。 */
function powerPole(x, base, h) {
  return (
    `<rect x="${r1(x - 1.6)}" y="${r1(base - h)}" width="3.2" height="${h}" fill="#6b6558"/>` +
    `<g stroke="#6b6558" stroke-width="1.6" fill="none"><path d="M${r1(x - 8)},${r1(base - h + 6)}h16M${r1(x - 6)},${r1(base - h + 12)}h12"/></g>`
  );
}

/** 赤レンガ倉庫。函館・小樽・横浜に共通する、開港の港の顔。 */
function brickWarehouse(x, base, w, h) {
  const top = r1(base - h);
  return (
    `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="#a8523c"/>` +
    `<path d="M${r1(x - 4)},${top}h${r1(w + 8)}l${-6},${r1(-h * 0.26)}h${r1(-w + 4)}z" fill="#5f6b52"/>` +
    `<rect x="${r1(x - 4)}" y="${top}" width="${r1(w + 8)}" height="3" fill="#4a5442"/>` +
    `<g stroke="#8f4230" stroke-width="1" opacity=".7" fill="none">${[0.25, 0.5, 0.75]
      .map((t) => `<path d="M${x},${r1(top + h * t)}h${w}"/>`)
      .join("")}</g>` +
    `<g fill="#d8cfb8">${[0.12, 0.34, 0.56, 0.78]
      .map((t) => `<rect x="${r1(x + w * t)}" y="${r1(top + h * 0.2)}" width="${r1(w * 0.11)}" height="${r1(h * 0.26)}" rx="${r1(w * 0.055)}"/>`)
      .join("")}</g>` +
    `<g fill="#4f4436">${[0.12, 0.34, 0.56, 0.78]
      .map((t) => `<rect x="${r1(x + w * t)}" y="${r1(base - h * 0.34)}" width="${r1(w * 0.11)}" height="${r1(h * 0.34)}"/>`)
      .join("")}</g>`
  );
}

/**
 * 水に浮かぶ舟。
 *
 * **平たい輪郭だけでは「水の上の物」か「水に空いた穴」かが決まらない。**
 * 決めているのは輪郭ではなく前後関係なので、3つ重ねる。
 *
 * 1. **さざ波を遮る** — 波より後に描く。波が隠れていれば水面より手前にある
 * 2. **内側に暗い三日月** — へこんだ容器だと分かる
 * 3. **真下に映り込みの筋** — 映り込むものは水の上にある
 *
 * 呼ぶ順に注意。**さざ波を描いたあとに呼ぶこと。**
 * (`scripts/countries/india/art.mjs` にも同じものがある。国ごとに部品を持つ方針)
 */
function boat(x, y, w, hull = "#6b4a2c", rim = "#c99a5c", trim = "#a8814c") {
  const h = r1(w * 0.18);
  return (
    `<g fill="${hull}" opacity=".2"><path d="M${r1(x - w * 0.36)},${r1(y + h + 1)}q${r1(w * 0.36)},${r1(h * 2.2)} ${r1(w * 0.72)},0z"/></g>` +
    `<path d="M${r1(x - w / 2)},${y}c${r1(w * 0.24)},${r1(-h * 0.7)} ${r1(w * 0.76)},${r1(-h * 0.7)} ${w},0c${r1(-w * 0.15)},${r1(h * 1.05)} ${r1(-w * 0.85)},${r1(h * 1.05)} ${-w},0z" fill="${hull}"/>` +
    `<path d="M${r1(x - w * 0.455)},${r1(y - 0.6)}c${r1(w * 0.22)},${r1(-h * 0.5)} ${r1(w * 0.69)},${r1(-h * 0.5)} ${r1(w * 0.91)},0c${r1(-w * 0.16)},${r1(h * 0.5)} ${r1(-w * 0.75)},${r1(h * 0.5)} ${r1(-w * 0.91)},0z" fill="${trim}"/>` +
    `<path d="M${r1(x - w * 0.42)},${r1(y - 1.4)}c${r1(w * 0.2)},${r1(-h * 0.34)} ${r1(w * 0.64)},${r1(-h * 0.34)} ${r1(w * 0.84)},0" stroke="#4a3323" stroke-width="1.2" fill="none" opacity=".55"/>` +
    `<path d="M${r1(x - w / 2)},${y}c${r1(w * 0.24)},${r1(-h * 0.7)} ${r1(w * 0.76)},${r1(-h * 0.7)} ${w},0" stroke="${rim}" stroke-width="2" fill="none"/>`
  );
}

/** 石灯籠。参道と城下町に置くと日本になる。 */
function stoneLantern(x, base, h) {
  const w = r1(h * 0.42);
  return (
    `<rect x="${r1(x - w * 0.34)}" y="${r1(base - h * 0.36)}" width="${r1(w * 0.68)}" height="${r1(h * 0.36)}" fill="#9a968c"/>` +
    `<rect x="${r1(x - w * 0.5)}" y="${r1(base - h * 0.44)}" width="${w}" height="${r1(h * 0.1)}" fill="#8a8880"/>` +
    `<rect x="${r1(x - w * 0.44)}" y="${r1(base - h * 0.72)}" width="${r1(w * 0.88)}" height="${r1(h * 0.28)}" fill="#b0aca0"/>` +
    `<rect x="${r1(x - w * 0.2)}" y="${r1(base - h * 0.66)}" width="${r1(w * 0.4)}" height="${r1(h * 0.16)}" fill="#4f4b42"/>` +
    `<path d="M${r1(x - w * 0.66)},${r1(base - h * 0.72)}h${r1(w * 1.32)}l${r1(-w * 0.24)},${r1(-h * 0.16)}h${r1(-w * 0.84)}z" fill="#8a8880"/>` +
    `<circle cx="${x}" cy="${r1(base - h * 0.94)}" r="${r1(w * 0.14)}" fill="#8a8880"/>`
  );
}

/** 朱の鳥居。 */
function torii(x, base, w, h, fill = "#c2453c") {
  return (
    `<g fill="${fill}"><rect x="${r1(x - w / 2)}" y="${r1(base - h)}" width="${r1(w * 0.09)}" height="${h}"/>` +
    `<rect x="${r1(x + w / 2 - w * 0.09)}" y="${r1(base - h)}" width="${r1(w * 0.09)}" height="${h}"/>` +
    `<rect x="${r1(x - w / 2 - w * 0.09)}" y="${r1(base - h)}" width="${r1(w * 1.18)}" height="${r1(h * 0.11)}"/>` +
    `<rect x="${r1(x - w / 2)}" y="${r1(base - h * 0.78)}" width="${w}" height="${r1(h * 0.08)}"/></g>` +
    `<rect x="${r1(x - w / 2 - w * 0.12)}" y="${r1(base - h - h * 0.06)}" width="${r1(w * 1.24)}" height="${r1(h * 0.06)}" fill="#8f2f28"/>`
  );
}

/** 蔵造りの町家(川越)。黒い漆喰と重い瓦。 */
function machiya(x, base, w, h, wall = "#efe8d8", roof = "#4a5568") {
  const top = r1(base - h);
  return (
    `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="${wall}"/>` +
    `<path d="M${r1(x - 6)},${top}h${r1(w + 12)}l${-5},${r1(-h * 0.24)}h${r1(-w - 2)}z" fill="${roof}"/>` +
    `<rect x="${r1(x - 6)}" y="${top}" width="${r1(w + 12)}" height="3" fill="#3a4453"/>` +
    `<rect x="${x}" y="${r1(top + h * 0.46)}" width="${w}" height="3" fill="#5f6b78"/>` +
    `<g fill="#6b5330"><rect x="${r1(x + w * 0.12)}" y="${r1(top + h * 0.56)}" width="${r1(w * 0.3)}" height="${r1(h * 0.44)}"/></g>` +
    `<g fill="#c9a877"><rect x="${r1(x + w * 0.52)}" y="${r1(top + h * 0.56)}" width="${r1(w * 0.34)}" height="${r1(h * 0.3)}"/></g>` +
    `<g stroke="#8a6a44" stroke-width="1" opacity=".7" fill="none"><path d="M${r1(x + w * 0.62)},${r1(top + h * 0.56)}v${r1(h * 0.3)}M${r1(x + w * 0.72)},${r1(top + h * 0.56)}v${r1(h * 0.3)}"/></g>` +
    `<rect x="${r1(x + w * 0.1)}" y="${r1(top + h * 0.2)}" width="${r1(w * 0.2)}" height="${r1(h * 0.18)}" fill="#5f6b78"/>`
  );
}

/** ケヤキ。杜の都の並木。丸くならないよう、上へ広がる箒形にする。 */
function keyaki(x, base, h, fill = "#3f8f4f") {
  const w = r1(h * 0.62);
  return (
    `<path d="M${r1(x - 3)},${base}q${1},${r1(-h * 0.4)} ${-1},${r1(-h * 0.56)}h8q${-2},${r1(h * 0.16)} ${-1},${r1(h * 0.56)}z" fill="#6b5330"/>` +
    `<g stroke="#6b5330" stroke-width="1.8" fill="none" stroke-linecap="round"><path d="M${x},${r1(base - h * 0.5)}l${r1(-w * 0.3)},${r1(-h * 0.22)}M${x},${r1(base - h * 0.5)}l${r1(w * 0.3)},${r1(-h * 0.2)}"/></g>` +
    `<g fill="${fill}"><ellipse cx="${r1(x - w * 0.26)}" cy="${r1(base - h * 0.76)}" rx="${r1(w * 0.38)}" ry="${r1(h * 0.15)}"/>` +
    `<ellipse cx="${r1(x + w * 0.28)}" cy="${r1(base - h * 0.78)}" rx="${r1(w * 0.36)}" ry="${r1(h * 0.14)}"/>` +
    `<ellipse cx="${x}" cy="${r1(base - h * 0.9)}" rx="${r1(w * 0.42)}" ry="${r1(h * 0.16)}"/></g>`
  );
}

/** 屋台(福岡)。赤い提灯と暖簾。 */
function yatai(x, base, w) {
  const h = r1(w * 0.34);
  return (
    `<rect x="${x}" y="${r1(base - h)}" width="${w}" height="${h}" fill="#8a6a44"/>` +
    `<path d="M${r1(x - 6)},${r1(base - h)}h${r1(w + 12)}l${-6},${-8}h${r1(w - 12 < 0 ? 0 : -w)}z" fill="#c2453c"/>` +
    `<rect x="${r1(x - 6)}" y="${r1(base - h - 8)}" width="${r1(w + 12)}" height="4" fill="#8f2f28"/>` +
    `<g fill="#f0e6d2"><rect x="${r1(x + 4)}" y="${r1(base - h + 4)}" width="${r1(w - 8)}" height="${r1(h * 0.44)}"/></g>` +
    `<g fill="#e8443f">${[0.2, 0.5, 0.8]
      .map((t) => `<ellipse cx="${r1(x + w * t)}" cy="${r1(base - h - 14)}" rx="4.6" ry="6"/>`)
      .join("")}</g>` +
    `<g fill="#f5b31c">${[0.2, 0.5, 0.8].map((t) => `<rect x="${r1(x + w * t - 4.6)}" y="${r1(base - h - 15)}" width="9.2" height="2"/>`).join("")}</g>` +
    `<g fill="#3f3428"><circle cx="${r1(x + w * 0.2)}" cy="${base}" r="3"/><circle cx="${r1(x + w * 0.8)}" cy="${base}" r="3"/></g>`
  );
}

/** かもめ。港の絵には要る。 */
function gull(x, y, s = 1) {
  return `<path d="M${r1(x - 6 * s)},${y}q${r1(3 * s)},${r1(-4.4 * s)} ${r1(6 * s)},0q${r1(3 * s)},${r1(-4.4 * s)} ${r1(6 * s)},0" stroke="#4f5548" stroke-width="${r1(1.6 * s)}" stroke-linecap="round" fill="none"/>`;
}

// ---------------------------------------------------------------------------

export const JAPAN_RICH_BG = {
  /**
   * 南西諸島・小笠原の島。**7都市が共用。**
   * (那覇・宮崎・八丈島・父島・奄美大島・宮古島・石垣島)
   *
   * 元は42要素で、空と青い海と砂浜、等間隔のヤシが数本。
   *
   * 層: 入道雲の空 / 隆起珊瑚の島影 / **礁池と外洋で色を分けた海** / 礁縁の白波 /
   * 白砂 / 赤瓦の家とシーサーと石垣 / ガジュマル / サバニ / 貝を拾う人。
   */
  subtropic:
    sky(108, "#3f9fd8", "#7fc8e8", "#cfeaf2") +
    `<circle cx="322" cy="30" r="17" fill="#f5b31c"/>` +
    `<circle cx="322" cy="30" r="24" fill="#fdf0c0" opacity=".18"/>` +
    cumulonimbus(120, 100, 1) +
    cumulonimbus(288, 104, 0.62) +
    // 隆起珊瑚の島影
    `<path d="M0,108V94q22,-9 44,-4q24,5 36,12z" fill="#5f8a6a"/>` +
    `<path d="M400,108V98q-26,-8 -48,-2q-20,5 -30,10z" fill="#5f8a6a"/>` +
    `<g fill="#4f7a5a" opacity=".7"><ellipse cx="30" cy="98" rx="12" ry="5"/><ellipse cx="366" cy="102" rx="10" ry="4"/></g>` +
    // ── 海。外洋の紺 → 礁縁 → 礁池のエメラルド
    // 外洋の帯は**礁池の帯が始まる 128 まで**敷く。
    // 122 で切ったら、白波の帯がうねって上がるぶん(4行・233px)が透けた。
    // 波や泡を波打たせるときは、その振れ幅ぶん下まで敷いておく。
    band(108, 20, "#1f6f9c") +
    `<path d="M0,122q40,-5 84,0q46,5 92,-2q48,-7 96,1q42,7 128,-3v8H0z" fill="#f2fbfd" opacity=".85"/>` +
    band(128, 16, "#2fb8c4") +
    band(142, 12, "#5fd8d8") +
    `<g stroke="#bff2f4" stroke-width="2" opacity=".55" fill="none"><path d="M18,114h48M262,116h58M40,132h52M186,134h56M300,136h72M22,148h56M240,150h68"/></g>` +
    // 珊瑚の斑
    `<g fill="#2f9fa8" opacity=".5"><ellipse cx="96" cy="140" rx="22" ry="6"/><ellipse cx="286" cy="146" rx="26" ry="6"/></g>` +
    // ── 白砂
    ground(152, "#f4ead0") +
    `<path d="M0,154q40,-5 84,0q46,6 92,-2q48,-7 96,1q42,7 128,-3v8H0z" fill="#ffffff" opacity=".7"/>` +
    `<path d="M0,168q56,-6 108,2q56,8 110,-2q54,-8 112,3q36,6 70,-1v10H0z" fill="#e8dcbc"/>` +
    `<g fill="#dfd0ac"><ellipse cx="92" cy="196" rx="74" ry="9"/><ellipse cx="326" cy="204" rx="78" ry="9"/></g>` +
    // ── 赤瓦の家(左)とガジュマル(右)
    ryukyuHouse(24, 152, 76) +
    banyan(348, 172, 58) +
    `<g fill="#2f7d3f"><path d="M300,168q-8,-14 2,-22q6,10 8,22z"/><path d="M310,168q2,-16 12,-20q0,12 -4,20z"/></g>` +
    // ハイビスカスとソテツ
    `<g fill="#2f7d3f"><path d="M120,172q-10,-8 -8,-16q8,4 12,16z"/><path d="M128,172q4,-12 14,-14q-1,10 -8,14z"/></g>` +
    `<g fill="#e8443f"><circle cx="115" cy="158" r="4"/><circle cx="141" cy="160" r="3.4"/></g>` +
    `<g fill="#f5b31c"><circle cx="115" cy="158" r="1.6"/><circle cx="141" cy="160" r="1.4"/></g>` +
    // ── サバニ(木の舟)。**y>170 の中央は隠れない**
    shade(200, 199, 34, 5, ".16") +
    `<path d="M164,192c18,-7 54,-7 72,0c-11,10 -61,10 -72,0z" fill="#6b4a2c"/>` +
    `<path d="M167,192c16,-5 50,-5 66,0c-10,5 -56,5 -66,0z" fill="#b08a52"/>` +
    `<path d="M164,192c18,-7 54,-7 72,0" stroke="#d8b06a" stroke-width="2" fill="none"/>` +
    `<path d="M200,192v-18" stroke="#4a3a24" stroke-width="2" fill="none"/>` +
    `<path d="M202,176l12,16h-12z" fill="#f0e6d2"/>` +
    // 舟を押す人と、貝を拾う人
    shade(148, 196, 11, 3, ".18") +
    person(146, 196, 21, "#5b8fe8") +
    arm(146, 183, 12, 3) +
    shade(272, 202, 11, 3, ".18") +
    person(270, 202, 19, "#e8443f") +
    arm(270, 191, 8, 8) +
    `<g fill="#f0e6d2"><ellipse cx="282" cy="203" rx="4" ry="2.4"/><ellipse cx="292" cy="206" rx="3.4" ry="2"/></g>` +
    // 波打ち際の泡と、砂の草
    `<g stroke="#4f8a4a" stroke-width="1.8" fill="none" stroke-linecap="round"><path d="M28,208v-10M35,209v-8M42,207v-11M368,207v-9M375,209v-8"/></g>`,

  /**
   * 雪国の街。**6都市が共用。**(札幌・青森・秋田・旭川・ニセコ・網走)
   *
   * 元は35要素で、空と山と四角い建物。**雪国なのに積もった雪が描かれていなかった。**
   *
   * 層: 冬の低い空 / 雪の峰 / 三角屋根の家並み(屋根に雪・煙突の煙)/ 電柱と電線 /
   * 除雪した雪の壁 / ナナカマドの赤い実 / 雪かきする人 / 雪灯籠。
   *
   * 降る雪は動きの層が描くので、ここは**積もった雪**を描く。
   */
  snowcity:
    sky(126, "#7f9ec4", "#a8c2dc", "#dce6ee") +
    `<circle cx="316" cy="34" r="15" fill="#fdf6dc"/>` +
    `<circle cx="316" cy="34" r="23" fill="#fdf6dc" opacity=".16"/>` +
    `<g fill="#eef2f6" opacity=".75"><ellipse cx="96" cy="26" rx="34" ry="5"/><ellipse cx="68" cy="33" rx="21" ry="3.6"/><ellipse cx="216" cy="20" rx="26" ry="4"/></g>` +
    // ── 雪の峰
    `<path d="M0,118L46,62L84,90L128,54L176,94L222,66L268,96L316,58L358,88L400,68V140H0z" fill="#b8c4d4"/>` +
    `<path d="M46,62l16,20q-8,5 -16,0q-8,5 -16,0zM128,54l17,22q-8,5 -17,0q-8,5 -17,0zM316,58l16,20q-8,5 -16,0q-8,5 -16,0z" fill="#f8fbfd"/>` +
    `<path d="M0,132L48,104L102,124L156,100L212,128L268,104L322,126L400,102V150H0z" fill="#dfe8f0"/>` +
    // 針葉樹(雪をかぶる)
    `<g>${[[20, 138, 26], [44, 141, 20], [70, 136, 24], [332, 138, 24], [356, 142, 19], [382, 136, 26]]
      .map(([x, b, h]) => cedar(x, b, h, "#3f5f4a"))
      .join("")}</g>` +
    `<g fill="#f8fbfd" opacity=".9">${[[20, 138, 26], [44, 141, 20], [70, 136, 24], [332, 138, 24], [356, 142, 19], [382, 136, 26]]
      .map(([x, b, h]) => `<path d="M${r1(x - h * 0.11)},${r1(b - h * 0.62)}L${x},${r1(b - h)}L${r1(x + h * 0.11)},${r1(b - h * 0.62)}z"/>`)
      .join("")}</g>` +
    // ── 街並み。屋根に雪、煙突から煙
    ground(140, "#e8eef4") +
    snowHouse(16, 148, 62, 30) +
    snowHouse(84, 148, 46, 24, "#b0a88f", "#5f6b78") +
    snowHouse(286, 148, 52, 26, "#c9bda4", "#8a5a4a") +
    snowHouse(344, 148, 44, 22, "#b0a88f", "#5f6b78") +
    `<g fill="#6b6558"><rect x="58" y="112" width="7" height="10"/><rect x="316" y="116" width="7" height="9"/></g>` +
    `<g fill="#eef2f6" opacity=".75"><ellipse cx="62" cy="104" rx="7" ry="4"/><ellipse cx="68" cy="96" rx="5.4" ry="3"/><ellipse cx="320" cy="108" rx="6" ry="3.4"/></g>` +
    // 赤レンガの倉庫(札幌・小樽)。
    // x=140 に建てたら **87%がシンボルに隠れていた**(`--hidden` が拾った)。左へ寄せる
    `<rect x="128" y="118" width="52" height="30" fill="#a8523c"/>` +
    `<path d="M124,118h60l-6,-9h-48z" fill="#5f6b78"/>` +
    `<path d="M122,119h64l-4,-6h-56z" fill="#f8fbfd"/>` +
    `<g fill="#d8cfb8"><rect x="134" y="126" width="8" height="10" rx="4"/><rect x="148" y="126" width="8" height="10" rx="4"/><rect x="162" y="126" width="8" height="10" rx="4"/></g>` +
    // ── 電柱と電線(北国の空はこれで区切られる)
    powerPole(112, 148, 46) +
    powerPole(268, 148, 42) +
    `<g stroke="#6b6558" stroke-width="1" fill="none"><path d="M112,108q78,10 156,4M112,114q78,10 156,4"/></g>` +
    // ── 除雪した雪の壁(北国の道はこれで挟まれる)
    `<path d="M0,150q46,-12 96,-4q40,6 60,0v20H0z" fill="#f8fbfd"/>` +
    `<path d="M400,150q-46,-12 -96,-4q-40,6 -60,0v20h156z" fill="#f8fbfd"/>` +
    `<g fill="#dfe8f0"><path d="M0,164q48,-8 96,-2q42,5 60,2v6H0z"/><path d="M400,164q-48,-8 -96,-2q-42,5 -60,2v6h156z"/></g>` +
    // 道(圧雪)
    `<path d="M0,170h400v40H0z" fill="#e2eaf2"/>` +
    `<g stroke="#cbd8e4" stroke-width="2.6" opacity=".8" fill="none"><path d="M0,182q100,6 200,0t200,-4M0,196q100,6 200,0t200,-4"/></g>` +
    // ── ナナカマドの赤い実(雪の中で目を引く)
    `<path d="M100,176v-22" stroke="#5f5448" stroke-width="3" stroke-linecap="round" fill="none"/>` +
    `<path d="M100,162l-9,-8M100,168l8,-7" stroke="#5f5448" stroke-width="1.8" stroke-linecap="round" fill="none"/>` +
    `<g fill="#e8443f"><circle cx="92" cy="152" r="3.4"/><circle cx="106" cy="156" r="3"/><circle cx="99" cy="146" r="3.2"/></g>` +
    `<g fill="#f8fbfd" opacity=".9"><ellipse cx="99" cy="143" rx="7" ry="2.6"/></g>` +
    // ── 雪灯籠と、雪かきする人。**y>170 の中央は隠れない**
    `<g fill="#f8fbfd"><path d="M186,196q0,-14 14,-14t14,14z"/></g>` +
    `<path d="M192,190a8,8 0 0 1 16,0v6h-16z" fill="#f5b31c"/>` +
    `<circle cx="200" cy="190" r="4" fill="#fdf0c0"/>` +
    shade(200, 198, 22, 4, ".1") +
    shade(252, 200, 11, 3, ".12") +
    person(250, 200, 22, "#e8443f") +
    arm(250, 186, 13, 6) +
    `<path d="M263,192l12,6" stroke="#8a6a44" stroke-width="2" stroke-linecap="round" fill="none"/>` +
    `<path d="M274,196h14v6h-14z" fill="#8fa8bc"/>` +
    shade(146, 202, 11, 3, ".12") +
    person(144, 202, 20, "#5b8fe8") +
    `<ellipse cx="144" cy="186" rx="9" ry="3" fill="#e8443f"/>`,

  /**
   * 開港の港町。**6都市が共用。**(函館・横浜・長崎・釧路・小樽・室蘭)
   *
   * 元は20要素で、空と海と赤い箱がひとつ。**港なのに船もクレーンも人もいなかった。**
   *
   * 層: 夕空 / 岬と灯台 / 港内と外洋で色を分けた海 / 貨物船とタグボート /
   * 赤レンガ倉庫と洋館と教会の尖塔 / 荷役のクレーン / 岸壁と係船柱 / 釣り人とかもめ。
   */
  port:
    // **手前を水にする。**
    // いちど岸壁を手前に置いたが、動きの層(`japan-port.tsx`)は
    // y=126〜196 に波と小舟を描いていて、**岸壁の上に舟が乗ってしまった。**
    // 重ねる層は元の絵に合わせて作られているので、背景を描き直すときは
    // **層が水だと思っている場所を水のまま残す**。港は水越しに見る構図にした。
    sky(70, "#5f8fc4", "#93b8dc", "#e0d4c8") +
    `<circle cx="62" cy="30" r="15" fill="#f5b31c"/>` +
    `<circle cx="62" cy="30" r="22" fill="#fdf0c0" opacity=".2"/>` +
    `<g fill="#f4e4d0" opacity=".55"><ellipse cx="250" cy="20" rx="32" ry="4.2"/><ellipse cx="224" cy="27" rx="20" ry="3.2"/></g>` +
    gull(150, 40, 1.1) + gull(186, 28, 0.9) + gull(118, 50, 0.8) +
    // ── 岬と灯台(左)
    `<path d="M0,70V44q22,-11 46,-5q24,6 36,15q12,7 20,16z" fill="#5f7a6a"/>` +
    `<rect x="26" y="26" width="10" height="22" fill="#f6efe2"/>` +
    `<g fill="#e8443f"><rect x="26" y="31" width="10" height="5"/><rect x="26" y="42" width="10" height="5"/></g>` +
    `<path d="M24,26h14l-3,-6h-8z" fill="#4a5568"/>` +
    // ── 対岸の町(水の向こう側)
    `<path d="M0,70h400v50H0z" fill="#7f8a7a"/>` +
    `<path d="M0,70q60,-6 124,2q66,9 134,-3q58,-10 142,3v10H0z" fill="#8f9a86"/>` +
    brickWarehouse(8, 120, 76, 42) +
    brickWarehouse(90, 120, 38, 30) +
    // 荷役のクレーン。塔は左(シンボルの外)に立て、腕だけを中央へ伸ばす
    `<g stroke="#f5b31c" stroke-width="3.4" fill="none" stroke-linecap="round"><path d="M136,120v-40M128,120l8,-40M144,120l-8,-40"/></g>` +
    `<path d="M136,80h52l-5,7h-47z" fill="#f5b31c"/>` +
    `<path d="M136,80l-24,8" stroke="#f5b31c" stroke-width="2.6" fill="none"/>` +
    `<path d="M180,87v14" stroke="#5f5b52" stroke-width="1.4" fill="none"/>` +
    `<rect x="173" y="101" width="15" height="10" fill="#e8443f"/>` +
    // 積んだコンテナ(繰り返しなので、中央が隠れても惜しくない)
    `<g><rect x="150" y="108" width="28" height="12" fill="#3f7f6a"/><rect x="150" y="97" width="28" height="10" fill="#5b8fe8"/><rect x="182" y="108" width="26" height="12" fill="#e8443f"/><rect x="212" y="108" width="26" height="12" fill="#f5b31c"/></g>` +
    `<g stroke="#2f2a20" stroke-width="1" opacity=".35" fill="none"><path d="M156,108v12M164,108v12M171,108v12M156,97v10M164,97v10M171,97v10M188,108v12M196,108v12M218,108v12M226,108v12"/></g>` +
    // 洋館と教会の尖塔(長崎・函館の外国人居留地)
    `<rect x="268" y="86" width="58" height="34" fill="#f0e6d2"/>` +
    `<path d="M264,86h66l-8,-11h-50z" fill="#5f6b78"/>` +
    `<g fill="#7f97ad"><rect x="276" y="94" width="10" height="13" rx="5"/><rect x="291" y="94" width="10" height="13" rx="5"/><rect x="306" y="94" width="10" height="13" rx="5"/></g>` +
    `<g fill="#e8443f" opacity=".8"><rect x="270" y="110" width="54" height="3"/></g>` +
    `<rect x="344" y="76" width="22" height="44" fill="#e6dcc4"/>` +
    `<path d="M340,76h30l-15,-15z" fill="#5f6b78"/>` +
    `<rect x="353" y="48" width="4" height="12" fill="#8a8578"/>` +
    `<path d="M351,54h8v-3h-8z" fill="#8a8578"/>` +
    `<rect x="350" y="86" width="10" height="14" rx="5" fill="#7f97ad"/>` +
    `<rect x="372" y="98" width="24" height="22" fill="#c9bda0"/>` +
    `<path d="M368,98h32l-6,-8h-20z" fill="#8a5a4a"/>` +
    // ── 岸壁の縁
    `<rect x="0" y="118" width="400" height="6" fill="#9a968c"/>` +
    `<rect x="0" y="122" width="400" height="3" fill="#6f6b62"/>` +
    `<g fill="#5f5b52">${[30, 96, 166, 236, 300, 368].map((x) => `<rect x="${x}" y="113" width="8" height="6" rx="3"/>`).join("")}</g>` +
    // ── 港内の水(ここから下はすべて水。動きの層が波と小舟を描く)
    ground(125, "#356e99") +
    band(125, 22, "#2f6690") +
    band(147, 26, "#3a78a4") +
    band(173, 37, "#4586b0") +
    `<g stroke="#bfe0f0" stroke-width="2" opacity=".4" fill="none"><path d="M22,134h50M300,138h58M46,154h44M320,158h58M28,176h56M290,182h64M60,200h48M300,204h56"/></g>` +
    // 建物の映り込み
    `<g fill="#a8523c" opacity=".2"><rect x="8" y="125" width="76" height="22"/><rect x="90" y="125" width="38" height="16"/></g>` +
    `<g fill="#f0e6d2" opacity=".16"><rect x="268" y="125" width="58" height="20"/><rect x="344" y="125" width="22" height="24"/></g>` +
    // ── 貨物船(右)とタグボート(左)
    shade(300, 152, 46, 5, ".14") +
    `<path d="M252,142h96l-9,10h-78z" fill="#4a5566"/>` +
    `<rect x="252" y="138" width="96" height="4" fill="#8a4436"/>` +
    `<rect x="288" y="126" width="12" height="12" fill="#f0e6d2"/>` +
    `<rect x="304" y="130" width="7" height="8" fill="#e8443f"/>` +
    `<g fill="#3f7f6a"><rect x="258" y="130" width="16" height="8"/></g>` +
    `<path d="M96,160c10,-5 34,-5 44,0c-7,7 -37,7 -44,0z" fill="#2f3a48"/>` +
    `<path d="M99,160c9,-4 30,-4 38,0c-6,4 -32,4 -38,0z" fill="#e8443f"/>` +
    `<rect x="112" y="147" width="13" height="10" fill="#f0e6d2"/>` +
    `<rect x="116" y="139" width="4" height="8" fill="#e8443f"/>` +
    // ── 桟橋(左手前)。人はここに立たせる
    `<g stroke="#6b5330" stroke-width="4" fill="none" stroke-linecap="round"><path d="M20,206v-26M52,206v-26M84,206v-26M116,206v-26"/></g>` +
    `<rect x="0" y="172" width="134" height="8" fill="#8a6a44"/>` +
    `<rect x="0" y="170" width="134" height="3" fill="#a8813c"/>` +
    `<g stroke="#6b5330" stroke-width="1" opacity=".6" fill="none">${[16, 40, 64, 88, 112].map((x) => `<path d="M${x},172v8"/>`).join("")}</g>` +
    shade(46, 170, 11, 3, ".2") +
    person(44, 170, 22, "#5b8fe8") +
    arm(44, 156, 13, -6) +
    `<path d="M58,149l24,8" stroke="#8a8578" stroke-width="1.2" fill="none"/>` +
    shade(96, 170, 10, 2.8, ".2") +
    person(94, 170, 19, "#e8443f") +
    `<g fill="#a8813c"><rect x="108" y="162" width="20" height="9"/><rect x="112" y="155" width="13" height="7"/></g>` +
    // ── 手前の小舟。**y>170 の中央は隠れない**
    boat(216, 196, 58, "#5f4227", "#d8b06a") +
    person(200, 194, 17, "#f0e6d2") +
    arm(200, 184, 14, -5) +
    `<path d="M216,180l-2,14" stroke="#8a6a44" stroke-width="1.8" stroke-linecap="round" fill="none"/>` +
    `<g fill="#f6efe2"><ellipse cx="330" cy="196" rx="8" ry="3.6"/><circle cx="336" cy="191" r="3"/></g>` +
    `<path d="M339,190l4,-1" stroke="#f5b31c" stroke-width="1.4" stroke-linecap="round" fill="none"/>` +
    // ブイ
    `<g fill="#e8443f"><circle cx="272" cy="176" r="5"/></g>` +
    `<rect x="270.6" y="166" width="3" height="6" fill="#3f3428"/>`,

  /**
   * 杜の都・緑の多い地方都市。**5都市が共用。**(仙台・広島・福岡・岡山・水戸)
   *
   * 元は46要素。ビルが数本と丸い植え込みだけ。
   *
   * 層: 空 / 遠い山 / ビル街(左右)/ **ケヤキの並木道** / 川と橋 / 屋台と人 / 手前の植え込み。
   *
   * ⚠ 動きの層(`japan-citygreen.tsx`)が **x=44 / 158 / 266 の y=0〜80 に
   *   七夕の吹き流し**を垂らす。そこは空けておく。
   */
  citygreen:
    // 空は遠景の稜線がいちばん下がる位置(y=126)まで塗り下ろす
    sky(126, "#6aa8dc", "#9ccbe8", "#d4e6ec") +
    `<circle cx="330" cy="26" r="14" fill="#f5b31c"/>` +
    `<g fill="#f6efe2" opacity=".55"><ellipse cx="96" cy="88" rx="34" ry="4.4"/><ellipse cx="212" cy="92" rx="26" ry="3.6"/></g>` +
    // 遠い山
    `<path d="M0,110L42,80L86,102L134,76L184,104L232,82L282,104L330,78L378,100L400,88V126H0z" fill="#8fa4b0"/>` +
    `<path d="M0,120L54,98L110,116L166,96L222,118L278,98L334,116L400,98V140H0z" fill="#6f8a76"/>` +
    // ── ビル街。**吹き流しの下がる x は低めにして、絵がぶつからないようにする**
    `<g fill="#8f9aa8"><rect x="4" y="82" width="26" height="58"/><rect x="66" y="94" width="22" height="46"/><rect x="196" y="88" width="26" height="52"/><rect x="298" y="80" width="28" height="60"/><rect x="358" y="96" width="24" height="44"/></g>` +
    `<g fill="#7a8593"><rect x="4" y="82" width="26" height="4"/><rect x="196" y="88" width="26" height="4"/><rect x="298" y="80" width="28" height="4"/></g>` +
    `<g fill="#cfe0ea" opacity=".8">${[[10, 90], [20, 90], [10, 104], [20, 104], [10, 118], [20, 118], [72, 102], [72, 116], [202, 96], [212, 96], [202, 110], [212, 110], [304, 88], [316, 88], [304, 102], [316, 102], [304, 118], [316, 118], [364, 104], [374, 104]]
      .map(([x, y]) => `<rect x="${x}" y="${y}" width="8" height="9"/>`)
      .join("")}</g>` +
    // ── 地面と並木道
    ground(140, "#7fa464") +
    `<path d="M0,152h400v22H0z" fill="#8a8578"/>` +
    `<g stroke="#e8dcc0" stroke-width="2.4" stroke-dasharray="14 12" opacity=".7" fill="none"><path d="M0,163h400"/></g>` +
    `<path d="M0,174h400v36H0z" fill="#6f9e5c"/>` +
    // ケヤキの並木。大きさをばらす
    keyaki(36, 152, 54) +
    keyaki(96, 152, 44, "#4f9f5c") +
    keyaki(150, 152, 38) +
    keyaki(258, 152, 42, "#4f9f5c") +
    keyaki(316, 152, 52) +
    keyaki(376, 152, 40, "#4f9f5c") +
    // ── 川と橋(左)
    `<path d="M0,140h56v-6H0z" fill="#5f9ec4"/>` +
    // ── 屋台と人。**y>170 の中央は隠れない**
    yatai(168, 196, 64) +
    shade(200, 197, 38, 5, ".14") +
    shade(156, 198, 11, 3, ".16") +
    person(154, 198, 21, "#5b8fe8") +
    arm(154, 185, 11, 4) +
    shade(244, 200, 11, 3, ".16") +
    person(242, 200, 20, "#e8443f") +
    arm(242, 188, -11, 4) +
    shade(64, 200, 11, 3, ".16") +
    person(62, 200, 22, "#f0e6d2") +
    arm(62, 186, 12, 5) +
    shade(340, 202, 11, 3, ".16") +
    person(338, 202, 19, "#f5b31c") +
    // 自転車
    `<g stroke="#3f3428" stroke-width="1.6" fill="none"><circle cx="94" cy="200" r="6"/><circle cx="116" cy="200" r="6"/><path d="M94,200l10,-9h8l4,9M104,191v-5h6"/></g>` +
    // 手前の植え込みと梅
    `<g fill="#4f8544"><ellipse cx="24" cy="206" rx="26" ry="9"/><ellipse cx="376" cy="204" rx="24" ry="9"/></g>` +
    `<path d="M288,196v-20" stroke="#5a4630" stroke-width="3" stroke-linecap="round" fill="none"/>` +
    `<path d="M288,182l-9,-7M288,188l8,-6" stroke="#5a4630" stroke-width="1.8" stroke-linecap="round" fill="none"/>` +
    `<g fill="#f0a0bc"><circle cx="280" cy="172" r="4"/><circle cx="296" cy="176" r="3.4"/><circle cx="288" cy="167" r="3.6"/></g>`,

  /**
   * 杉木立の聖地。**5都市が共用。**(日光・高野山・対馬・屋久島・知床)
   *
   * 元は27要素。丸い樹冠が並んで、針葉樹の三角が数本。
   *
   * 層: 木漏れ日の空 / 杉の巨木(左右の柱)/ 参道の石段 / 朱の鳥居 / 石灯籠 /
   * 苔むした岩 / 参拝者 / 手前のシダ。
   *
   * ⚠ 動きの層(`japan-forest.tsx`)が **y=94〜102 から下へ光の帯**を落とし、
   *   y=176 / 198 に朝靄を流す。樹冠の天井をその高さに保ち、下は開けておく。
   */
  forest:
    sky(60, "#4f7fa8", "#7fa8c4", "#b8cfd4") +
    `<g fill="#e8f0ee" opacity=".4"><ellipse cx="200" cy="26" rx="60" ry="8"/></g>` +
    // ── 杉の樹冠(天井)。y=95 あたりで閉じる
    `<path d="M0,0h400v96q-50,10 -100,-2q-52,-12 -104,2q-50,12 -98,-2q-48,-12 -98,4z" fill="#25503a"/>` +
    `<g fill="#2f6042">${[30, 92, 156, 220, 284, 348]
      .map((x, i) => `<ellipse cx="${x}" cy="${86 + (i % 3) * 5}" rx="42" ry="20"/>`)
      .join("")}</g>` +
    // 森の中(樹冠の下)。ここを敷かないと、幹と幹のあいだが素通しになる。
    // 実測で 49行・最大242px 透けていた。**動きの層はここへ光の帯を落とす**ので、
    // 暗く敷いておくほうが光も効く。
    band(92, 60, "#33452f") +
    // 杉の巨木(縦の柱として左右に太く)
    `<g fill="#4f4030">${[[14, 30], [58, 20], [330, 22], [376, 32]]
      .map(([x, w]) => `<path d="M${x},210V70q${r1(w * 0.2)},-4 ${w},0v140z"/>`)
      .join("")}</g>` +
    `<g fill="#5f4c38" opacity=".7">${[[14, 30], [58, 20], [330, 22], [376, 32]]
      .map(([x, w]) => `<rect x="${r1(x + w * 0.62)}" y="70" width="${r1(w * 0.34)}" height="140"/>`)
      .join("")}</g>` +
    `<g stroke="#3f3226" stroke-width="1.2" opacity=".5" fill="none">${[14, 58, 330, 376]
      .map((x) => `<path d="M${x + 6},76v130M${x + 12},80v126"/>`)
      .join("")}</g>` +
    // 中景の杉(細く、奥に)。本数を増やすと森の奥行きが出る
    `<g fill="#3a3226">${[100, 128, 262, 296]
      .map((x) => `<rect x="${x}" y="96" width="11" height="82"/>`)
      .join("")}</g>` +
    `<g fill="#463b2c">${[86, 114, 144, 250, 280, 312]
      .map((x) => `<rect x="${x}" y="98" width="7" height="70"/>`)
      .join("")}</g>` +
    `<g fill="#2f2a20" opacity=".5">${[94, 122, 152, 244, 274, 306]
      .map((x) => `<rect x="${x}" y="100" width="5" height="62"/>`)
      .join("")}</g>` +
    // 木漏れ日の斑(地面の明るいところ)。動きの層の光の帯と噛み合う
    `<g fill="#7f9a5c" opacity=".35"><ellipse cx="70" cy="184" rx="34" ry="8"/><ellipse cx="320" cy="196" rx="38" ry="9"/><ellipse cx="200" cy="204" rx="30" ry="7"/></g>` +
    // ── 参道の石段
    ground(150, "#4f6b48") +
    `<path d="M120,210h160l-22,-62h-116z" fill="#9a968c"/>` +
    `<g fill="#8a8880"><path d="M126,192h148v7H126z"/><path d="M132,176h136v6H132z"/><path d="M138,162h124v6H138z"/><path d="M143,150h114v5H143z"/></g>` +
    `<g stroke="#b0aca0" stroke-width="1.2" opacity=".6" fill="none"><path d="M126,192h148M132,176h136M138,162h124"/></g>` +
    // ── 朱の鳥居(石段の上。中央は隠れるが、脚が左右に出る)
    torii(200, 150, 96, 46) +
    // ── 石灯籠(参道の左右)
    stoneLantern(104, 186, 34) +
    stoneLantern(298, 190, 32) +
    shade(104, 187, 13, 3.4, ".2") +
    shade(298, 191, 12, 3.2, ".2") +
    // ── 苔むした岩とシダ
    `<g fill="#5f6b4c"><ellipse cx="72" cy="196" rx="30" ry="12"/><ellipse cx="336" cy="200" rx="28" ry="11"/></g>` +
    `<g fill="#6f8a52"><ellipse cx="66" cy="190" rx="18" ry="6"/><ellipse cx="330" cy="194" rx="16" ry="6"/></g>` +
    `<g stroke="#4f8544" stroke-width="2" fill="none" stroke-linecap="round"><path d="M90,208v-12M97,209v-10M104,207v-13M300,208v-11M307,206v-13M314,209v-9"/></g>` +
    // ── 手水舎(参道の脇)と吊り提灯
    `<g stroke="#6b5330" stroke-width="3" fill="none"><path d="M44,196v-22M88,196v-22"/></g>` +
    `<path d="M36,174h60l-30,-13z" fill="#5f4a34"/>` +
    `<rect x="36" y="174" width="60" height="3" fill="#4a3a28"/>` +
    `<rect x="50" y="186" width="32" height="9" fill="#7f8a72"/>` +
    `<rect x="52" y="184" width="28" height="3" fill="#9aa48c"/>` +
    shade(66, 197, 24, 4, ".2") +
    `<g fill="#f0e6d2"><ellipse cx="352" cy="150" rx="7" ry="9"/></g>` +
    `<g fill="#c2453c"><rect x="345" y="148" width="14" height="3"/><rect x="345" y="154" width="14" height="3"/></g>` +
    `<path d="M352,141v-6" stroke="#4a3a28" stroke-width="1.6" fill="none"/>` +
    // ── 参拝者(石段を上る)
    shade(170, 194, 11, 3, ".2") +
    person(168, 194, 21, "#f0e6d2") +
    shade(232, 186, 10, 2.8, ".2") +
    person(230, 186, 19, "#e8443f") +
    arm(230, 175, 9, -6),

  /**
   * 海辺の門前町。**4都市が共用。**(鎌倉・伊勢・千葉・徳島)
   *
   * 元は25要素。海と砂と、四角い家が並ぶだけ。
   *
   * 層: 空 / 岬 / 海 / 瓦屋根の町家の並び / 参道の松と灯籠 / 浜 / 人力車 / 人。
   *
   * ⚠ 動きの層(`japan-coasttown.tsx`)が **x=290〜350 の y=118〜140 に波頭**を立てる。
   *   そこは海のまま残す。
   */
  coasttown:
    sky(98, "#6aa8dc", "#9ccbe8", "#dbe8ea") +
    `<circle cx="66" cy="28" r="15" fill="#f5b31c"/>` +
    `<g fill="#f6efe2" opacity=".6"><ellipse cx="230" cy="22" rx="32" ry="4.4"/><ellipse cx="204" cy="29" rx="20" ry="3.2"/></g>` +
    // 岬(左)
    `<path d="M0,98V78q22,-10 44,-4q24,6 34,14q10,5 18,10z" fill="#5f7a5c"/>` +
    `<g fill="#4f6a4c" opacity=".7"><ellipse cx="30" cy="84" rx="12" ry="5"/></g>` +
    // ── 海。**右側の y=118〜140 は波頭が立つので空けておく**
    band(98, 18, "#2a6b95") +
    band(114, 16, "#3585ab") +
    band(128, 16, "#4f9ec2") +
    `<g stroke="#cfeaf6" stroke-width="2" opacity=".5" fill="none"><path d="M16,106h52M92,104h34M244,108h40M40,118h44M164,120h48M22,132h58M120,134h44M232,136h40"/></g>` +
    // 沖の小舟(左寄り。右は波頭の場所)
    `<path d="M96,124c9,-4 30,-4 38,0c-6,6 -32,6 -38,0z" fill="#7a5a34"/>` +
    `<path d="M116,124v-14l11,14z" fill="#f0e6d2"/>` +
    // ── 浜と町
    ground(142, "#e0c9a0") +
    `<path d="M0,144q40,-5 82,0q46,6 90,-2q48,-7 96,1q42,7 132,-3v8H0z" fill="#f2ede0" opacity=".8"/>` +
    `<path d="M0,158h400v52H0z" fill="#cdb083"/>` +
    // 瓦屋根の町家の並び(参道沿い)
    machiya(6, 158, 44, 30) +
    machiya(58, 158, 38, 26, "#e6dfcd", "#5f6b78") +
    machiya(292, 158, 42, 28) +
    machiya(344, 158, 40, 24, "#e6dfcd", "#5f6b78") +
    // 参道
    `<path d="M132,210h136l-16,-52h-104z" fill="#d8c9a4"/>` +
    `<g stroke="#c2b090" stroke-width="1.4" opacity=".7" fill="none"><path d="M124,196h152M128,180h144M132,166h136"/></g>` +
    // 松と灯籠
    pine(112, 172, 40, 4, true) +
    pine(288, 176, 36, -4) +
    stoneLantern(122, 196, 30) +
    stoneLantern(280, 200, 28) +
    shade(122, 197, 12, 3.2, ".18") +
    shade(280, 201, 11, 3, ".18") +
    // ── 人力車と人。**y>170 の中央は隠れない**
    `<g stroke="#3f3428" stroke-width="1.8" fill="none"><circle cx="186" cy="198" r="8"/><circle cx="216" cy="198" r="8"/></g>` +
    `<path d="M180,192h42l-4,-14h-34z" fill="#3f3428"/>` +
    `<path d="M180,178q10,-12 22,-10q-4,6 -4,10z" fill="#2f2a20"/>` +
    `<path d="M222,190l16,-8" stroke="#8a6a44" stroke-width="2" stroke-linecap="round" fill="none"/>` +
    shade(244, 202, 11, 3, ".18") +
    person(242, 202, 21, "#f0e6d2") +
    arm(242, 189, -10, -6) +
    shade(158, 204, 11, 3, ".18") +
    person(156, 204, 20, "#e8443f") +
    `<g stroke="#4f7a4a" stroke-width="1.8" fill="none" stroke-linecap="round"><path d="M28,206v-10M35,207v-8M366,205v-11M373,207v-8"/></g>`,

  /**
   * 城下町。**4都市が共用。**(姫路・松江・川越・彦根)
   *
   * 元は22要素。天守がひとつと、等間隔の家が5軒。
   * **天守は中央でシンボルに隠れていた**(しかも都市シンボル自体が城なので二重)。
   *
   * 層: 空 / 城山 / **石垣と堀を横に長く** / 天守は右に寄せる / 蔵造りの町家(左)/
   * 桜 / 堀の舟 / 人。
   *
   * ⚠ 動きの層(`japan-castletown.tsx`)が **(190,34) と (60,62) に薄雲**、
   *   **(150,66) に白鷺**を置く。その帯は空のまま残す。
   */
  castletown:
    // 稜線が x=0 で y=110 まで下がるので、そこより下まで塗る
    sky(130, "#6aa8dc", "#9ccbe8", "#d8e6ea") +
    `<circle cx="336" cy="24" r="14" fill="#f5b31c"/>` +
    // 城山(遠景)。**y=26〜70 は雲と白鷺の帯なので、稜線は低く保つ**
    `<path d="M0,110L48,84L104,104L156,82L212,106L266,84L320,104L400,86V130H0z" fill="#7f9a86"/>` +
    `<path d="M0,122L60,100L120,118L180,98L240,120L300,100L360,118L400,106V140H0z" fill="#5f8a68"/>` +
    // ── 天守(右に寄せる。中央はシンボルの城と重なるため)
    `<g fill="#f2ede0"><path d="M300,140V112h56v28z"/><path d="M306,112V96h44v16z"/><path d="M312,96V84h32v12z"/></g>` +
    `<g fill="#3f4a58"><path d="M294,112h68l-8,-7h-52z"/><path d="M300,96h56l-6,-6h-44z"/><path d="M306,84h44l-6,-6h-32z"/><path d="M316,78h24l-12,-9z"/></g>` +
    `<g fill="#f5b31c"><path d="M324,70h8l-4,-5z"/></g>` +
    `<g fill="#5f6b78"><rect x="310" y="118" width="8" height="9"/><rect x="324" y="118" width="8" height="9"/><rect x="338" y="118" width="8" height="9"/><rect x="316" y="100" width="7" height="7"/><rect x="332" y="100" width="7" height="7"/></g>` +
    // ── 石垣(横に長く。中央が隠れても惜しくない繰り返し)
    ground(140, "#8fa46a") +
    `<path d="M104,166h296v-26q-36,-8 -78,-8h-140q-46,0 -78,10z" fill="#9a968c"/>` +
    `<g stroke="#8a8880" stroke-width="1.2" opacity=".7" fill="none">${[146, 154, 162]
      .map((y) => `<path d="M104,${y}h296"/>`)
      .join("")}${[130, 160, 190, 220, 250, 280, 310, 340, 370].map((x) => `<path d="M${x},140v26"/>`).join("")}</g>` +
    // ── 堀(手前)と舟
    `<path d="M0,176h400v22H0z" fill="#5f9ec4"/>` +
    `<path d="M0,172h400v6H0z" fill="#8a8880"/>` +
    `<g stroke="#bfe8f4" stroke-width="2" opacity=".55" fill="none"><path d="M24,184h50M300,188h58M140,190h44"/></g>` +
    `<g fill="#f2ede0" opacity=".22"><path d="M300,178h56v14h-56z"/></g>` +
    boat(214, 192, 52, "#5f4227", "#d8b06a") +
    person(200, 190, 16, "#5b8fe8") +
    arm(200, 181, 12, -6) +
    // ── 蔵造りの町家(左)
    machiya(6, 166, 44, 32, "#3f3a34", "#2f2a24") +
    machiya(58, 166, 38, 27, "#efe8d8") +
    // ── 桜
    `<path d="M120,166v-24" stroke="#5a4630" stroke-width="3.4" stroke-linecap="round" fill="none"/>` +
    `<path d="M120,150l-11,-8M120,156l10,-7" stroke="#5a4630" stroke-width="2" stroke-linecap="round" fill="none"/>` +
    `<g fill="#f0b8cc"><ellipse cx="110" cy="138" rx="16" ry="9"/><ellipse cx="132" cy="142" rx="14" ry="8"/><ellipse cx="121" cy="130" rx="15" ry="8"/></g>` +
    `<path d="M270,166v-20" stroke="#5a4630" stroke-width="3" stroke-linecap="round" fill="none"/>` +
    `<g fill="#f0b8cc"><ellipse cx="262" cy="142" rx="13" ry="7"/><ellipse cx="280" cy="145" rx="12" ry="7"/><ellipse cx="271" cy="136" rx="13" ry="7"/></g>` +
    // ── 人(石垣の上の道)
    shade(150, 172, 10, 2.8, ".18") +
    person(148, 172, 19, "#e8443f") +
    shade(340, 172, 10, 2.8, ".18") +
    person(338, 172, 20, "#f0e6d2") +
    // 手前の草
    `<g fill="#6f9e5c"><ellipse cx="28" cy="206" rx="30" ry="9"/><ellipse cx="368" cy="204" rx="28" ry="9"/></g>`,

  /**
   * 生きた火山のふもと。**4都市が共用。**(熊本・別府・鹿児島・登別)
   *
   * 元は13要素で、**日本でいちばん薄い背景**だった。三角がふたつと帯だけ。
   *
   * 層: 空 / 火山(火口)/ 裾野の溶岩台地 / 湯けむりの街 / 湯だまりと湯の花 /
   * 野と集落 / 人。
   *
   * ⚠ 動きの層(`japan-volcano.tsx`)が **(110,32) を火口として噴煙を上げる。**
   *   山頂は必ずここに置くこと。y=120 前後には陽炎も流れる。
   */
  volcano:
    sky(126, "#e0925a", "#f0b87a", "#f6d8ae") +
    `<circle cx="322" cy="44" r="18" fill="#f2803c"/>` +
    `<circle cx="322" cy="44" r="26" fill="#f8d8a8" opacity=".2"/>` +
    `<g fill="#f8dcb0" opacity=".45"><ellipse cx="230" cy="24" rx="34" ry="4.4"/><ellipse cx="256" cy="31" rx="20" ry="3.2"/></g>` +
    // ── 火山。**火口は (110,32)**(動きの層がここから噴煙を上げる)
    `<path d="M8,130L96,34h28l86,96z" fill="#6f5f56"/>` +
    `<path d="M96,34h28l52,58q-26,6 -48,-6q-24,10 -50,2z" fill="#8a7568"/>` +
    `<path d="M96,34h28l14,16q-14,6 -28,0z" fill="#5f4f46"/>` +
    // 溶岩の筋
    `<g stroke="#5f4f46" stroke-width="2" opacity=".6" fill="none"><path d="M104,48l-22,44M118,50l16,38M96,60l-30,50M132,66l24,40"/></g>` +
    // 右の古い火山
    `<path d="M196,130L276,62L356,130z" fill="#7f6f62"/>` +
    `<path d="M276,62l30,26q-16,6 -32,-2q-14,6 -28,0z" fill="#9a8778"/>` +
    // ── 裾野
    ground(126, "#8a9a5a") +
    `<path d="M0,142q70,-12 138,2q66,13 132,-4q54,-13 130,4v66H0z" fill="#7a8f4e"/>` +
    `<g fill="#6b8044"><ellipse cx="80" cy="168" rx="70" ry="9"/><ellipse cx="322" cy="176" rx="74" ry="9"/></g>` +
    // ── 湯けむりの街(別府・登別)。湯気は動きの層が出す
    `<g fill="#e6dfcd"><rect x="18" y="150" width="34" height="20"/><rect x="58" y="156" width="26" height="14"/><rect x="366" y="156" width="26" height="14"/></g>` +
    `<g fill="#8a5a4a"><path d="M14,150h42l-6,-8h-30z"/><path d="M54,156h34l-5,-7h-24z"/><path d="M362,156h34l-5,-7h-24z"/></g>` +
    `<g fill="#6b5330"><rect x="30" y="158" width="10" height="12"/><rect x="374" y="160" width="10" height="10"/></g>` +
    // 湯だまりと湯の花(白い縁)
    `<g fill="#d8cfc0"><ellipse cx="66" cy="192" rx="42" ry="12"/><ellipse cx="322" cy="200" rx="42" ry="11"/></g>` +
    `<g fill="#a8c4c0"><ellipse cx="66" cy="191" rx="34" ry="8"/><ellipse cx="322" cy="199" rx="34" ry="7"/></g>` +
    `<g fill="#c9dcd8" opacity=".7"><ellipse cx="56" cy="189" rx="12" ry="3"/><ellipse cx="312" cy="197" rx="11" ry="3"/></g>` +
    // 湯を引く樋(湯畑の木樋)
    `<g fill="#8a6a44"><rect x="110" y="182" width="60" height="5"/><rect x="112" y="187" width="4" height="10"/><rect x="162" y="187" width="4" height="10"/></g>` +
    `<path d="M170,184h22" stroke="#8a6a44" stroke-width="4" stroke-linecap="round" fill="none"/>` +
    `<g fill="#c9a877"><rect x="112" y="180" width="56" height="3"/></g>` +
    // ── 地獄谷の岩肌(硫黄で黄ばんだ赤茶の露岩)
    `<path d="M0,150q28,-14 58,-6q26,7 40,18l-12,14H0z" fill="#8a6a56"/>` +
    `<path d="M0,158q24,-10 48,-4q22,6 32,14l-8,8H0z" fill="#a08070"/>` +
    `<path d="M400,156q-30,-14 -62,-6q-28,7 -42,18l14,14h90z" fill="#8a6a56"/>` +
    `<g fill="#d8c46a" opacity=".65"><ellipse cx="36" cy="160" rx="20" ry="5"/><ellipse cx="352" cy="166" rx="22" ry="5"/></g>` +
    // ── 旅館の並び(木造3階。湯の街の顔)
    // x=222 に置いたらシンボル(x=151〜249)に食われ、右端しか見えなかった。右へ寄せる
    `<g fill="#e6dfcd"><rect x="292" y="136" width="56" height="34"/></g>` +
    `<path d="M286,136h68l-7,-9h-54z" fill="#5f6b78"/>` +
    `<rect x="286" y="136" width="68" height="3" fill="#4a5568"/>` +
    `<g fill="#8a6a44"><rect x="292" y="147" width="56" height="2.4"/><rect x="292" y="158" width="56" height="2.4"/></g>` +
    `<g fill="#f5d38a">${[296, 310, 324, 338].map((x) => `<rect x="${x}" y="${139}" width="9" height="6"/>`).join("")}</g>` +
    `<g fill="#f5d38a">${[296, 310, 324, 338].map((x) => `<rect x="${x}" y="${150}" width="9" height="6"/>`).join("")}</g>` +
    `<g fill="#6b5330"><rect x="312" y="160" width="16" height="10"/></g>` +
    `<g fill="#e8443f"><ellipse cx="300" cy="132" rx="4.4" ry="5.6"/><ellipse cx="340" cy="132" rx="4.4" ry="5.6"/></g>` +
    shade(320, 171, 36, 4, ".14") +
    // 湯の川(白く濁った流れ)
    `<path d="M96,186q40,10 96,4q52,-6 100,6v8q-52,-10 -104,-4q-56,6 -92,-6z" fill="#c9dcd8" opacity=".75"/>` +
    // ── 人。**y>170 の中央は隠れない**
    shade(206, 200, 11, 3, ".18") +
    person(204, 200, 21, "#e8443f") +
    arm(204, 187, 12, 4) +
    shade(232, 202, 10, 2.8, ".18") +
    person(230, 202, 19, "#f0e6d2") +
    shade(126, 196, 11, 3, ".18") +
    person(124, 196, 20, "#5b8fe8") +
    // 手前の草
    `<g stroke="#5f7a3c" stroke-width="1.8" fill="none" stroke-linecap="round"><path d="M20,208v-11M27,209v-9M34,207v-12M362,207v-10M369,209v-8"/></g>`,

  /**
   * 富士を望む土地。**3都市が共用。**(箱根・静岡・甲府)
   *
   * 元は20要素。三角の富士と草地だけ。
   *
   * 層: 空 / **富士(左寄せ)** / 山腹の茶畑 / 温泉の湯だまり / ぶどう棚 / 人。
   *
   * ⚠ 動きの層(`japan-fujiview.tsx`)が **(47,180)(105,186)(281,184)(341,178)
   *   から湯気**を上げ、y=94 と y=112 に山腹の霞を流す。
   *   湯気の足元には湯だまりを置き、山腹はその高さに保つ。
   * ⚠ **富士の山頂は左へ寄せる。**中央に置くと稜線の上半分がシンボルに隠れる。
   */
  fujiview:
    // 空は地面の開始(y=140)まで塗る。132 では山と山のあいだが6行透けた
    sky(142, "#5f9fd8", "#93c6e6", "#dbe8ea") +
    `<circle cx="330" cy="30" r="15" fill="#f5b31c"/>` +
    `<g fill="#f6efe2" opacity=".5"><ellipse cx="290" cy="52" rx="30" ry="4.2"/><ellipse cx="264" cy="58" rx="19" ry="3.2"/></g>` +
    // ── 富士。山頂を x=136 に置き、裾を大きく広げる
    `<path d="M6,140L118,42h36L266,140z" fill="#8f9ec4"/>` +
    `<path d="M118,42h36l30,26q-24,8 -46,-2q-22,10 -46,2z" fill="#f8fbfd"/>` +
    `<path d="M118,42h36l12,10q-16,6 -30,0z" fill="#e8eef4"/>` +
    `<g stroke="#7f8db4" stroke-width="1.6" opacity=".5" fill="none"><path d="M112,66l-30,54M148,70l26,48M100,88l-38,46M164,92l34,40"/></g>` +
    // 手前の低い山(右)
    `<path d="M232,140L304,84L380,140z" fill="#7f9a86"/>` +
    `<path d="M304,84l22,18q-12,5 -24,-2q-10,5 -20,0z" fill="#dfe8f0"/>` +
    // ── 山腹の茶畑(静岡)
    ground(140, "#7fa464") +
    `<path d="M0,150q70,-10 138,2q66,12 132,-4q54,-12 130,4v58H0z" fill="#6f9e5c"/>` +
    `<g stroke="#5d8a54" stroke-width="2.6" opacity=".6" fill="none"><path d="M-6,158q104,-10 206,0t206,-2M-6,172q104,-10 206,0t206,-2M-6,186q104,-10 206,0t206,-2"/></g>` +
    `<g fill="#4f8544">${[24, 62, 100, 300, 338, 376]
      .map((x, i) => `<ellipse cx="${x}" cy="${164 + (i % 2) * 6}" rx="14" ry="6"/>`)
      .join("")}</g>` +
    // ── 湯だまり。**動きの層が湯気を上げる位置に置く**
    `<g fill="#c9c0ac"><ellipse cx="47" cy="182" rx="20" ry="7"/><ellipse cx="105" cy="188" rx="22" ry="7"/><ellipse cx="281" cy="186" rx="21" ry="7"/><ellipse cx="341" cy="180" rx="18" ry="6"/></g>` +
    `<g fill="#8fb8c4"><ellipse cx="47" cy="181" rx="14" ry="4.4"/><ellipse cx="105" cy="187" rx="16" ry="4.6"/><ellipse cx="281" cy="185" rx="15" ry="4.4"/><ellipse cx="341" cy="179" rx="12" ry="4"/></g>` +
    `<g fill="#6b6558"><path d="M28,182l-8,-5l10,-2zM126,188l9,-5l-2,7zM300,186l9,-4l-1,6z"/></g>` +
    // ── 湯宿と湯屋(温泉郷)。湯だまりのそばに建てる
    `<g fill="#e6dfcd"><rect x="20" y="150" width="52" height="24"/></g>` +
    `<path d="M14,150h64l-7,-10h-50z" fill="#8a5a4a"/>` +
    `<rect x="14" y="150" width="64" height="3" fill="#6f463a"/>` +
    `<g fill="#f5d38a"><rect x="26" y="156" width="10" height="7"/><rect x="42" y="156" width="10" height="7"/><rect x="58" y="156" width="10" height="7"/></g>` +
    `<g fill="#6b5330"><rect x="38" y="164" width="14" height="10"/></g>` +
    `<g fill="#e8443f"><ellipse cx="22" cy="146" rx="4" ry="5.2"/><ellipse cx="70" cy="146" rx="4" ry="5.2"/></g>` +
    shade(46, 175, 30, 4, ".14") +
    `<g fill="#e6dfcd"><rect x="316" y="152" width="42" height="20"/></g>` +
    `<path d="M310,152h54l-6,-9h-42z" fill="#8a5a4a"/>` +
    `<g fill="#f5d38a"><rect x="322" y="157" width="9" height="6"/><rect x="342" y="157" width="9" height="6"/></g>` +
    shade(337, 173, 24, 4, ".14") +
    // 湯を引く木樋と、湯だまりを囲う柵
    `<g stroke="#8a6a44" stroke-width="2.6" fill="none" stroke-linecap="round"><path d="M72,172h26M304,174h-26"/></g>` +
    `<g stroke="#6b5330" stroke-width="2" fill="none" stroke-linecap="round"><path d="M22,190v-8M34,192v-8M60,192v-8M72,190v-8M262,192v-8M300,190v-8M322,188v-8"/></g>` +
    `<g stroke="#6b5330" stroke-width="1.6" fill="none"><path d="M22,184h50M262,186h60"/></g>` +
    // 松(温泉郷の庭木)。x=152 / 232 に置いたら**シンボルの後ろで丸ごと消えた**ので、
    // 湯宿の脇(左右)へ寄せた
    pine(108, 176, 34, 4, true) +
    pine(296, 172, 30, -4) +
    // ── ぶどう棚(甲府)
    `<g stroke="#6b5330" stroke-width="3" fill="none" stroke-linecap="round"><path d="M168,198v-22M232,198v-22"/></g>` +
    `<rect x="160" y="174" width="80" height="4" fill="#8a6a44"/>` +
    `<g fill="#3f7a44"><ellipse cx="178" cy="180" rx="14" ry="6"/><ellipse cx="204" cy="182" rx="15" ry="6"/><ellipse cx="228" cy="179" rx="13" ry="6"/></g>` +
    `<g fill="#6b4a7a">${[176, 196, 216, 232].map((x, i) => `<ellipse cx="${x}" cy="${188 + (i % 2) * 3}" rx="4.4" ry="6"/>`).join("")}</g>` +
    // ── 人
    shade(148, 200, 11, 3, ".18") +
    person(146, 200, 21, "#e8443f") +
    arm(146, 187, 12, -5) +
    shade(256, 202, 10, 2.8, ".18") +
    person(254, 202, 19, "#5b8fe8") +
    shade(72, 200, 10, 2.8, ".18") +
    person(70, 200, 20, "#f0e6d2") +
    `<ellipse cx="70" cy="184" rx="9" ry="3" fill="#d8c078"/>`,

  /**
   * 山岳の城下。**3都市が共用。**(松本・富山・高山)
   *
   * 元は21要素。三角の山と帯だけ。
   *
   * 層: 空 / **雪の稜線** / 中景の山 / 木造3階の町家(高山)/ 用水と橋 / 匠の店 / 人。
   *
   * ⚠ 動きの層(`japan-alps.tsx`)が **(120,26) と (60,34) から雪煙**を流し、
   *   その上を鷹が旋回する。**峰はその高さに置く。**
   */
  alps:
    sky(126, "#4f8fc8", "#8fbcda", "#d4e4ea") +
    `<circle cx="336" cy="30" r="14" fill="#fdf6dc"/>` +
    `<g fill="#f4fafd" opacity=".5"><ellipse cx="238" cy="24" rx="30" ry="4.2"/><ellipse cx="264" cy="30" rx="18" ry="3"/></g>` +
    // ── 雪の稜線。**(120,26) と (60,34) を峰にする**(雪煙がここから出る)
    `<path d="M0,120L34,52L60,34L92,62L120,26L152,66L196,40L240,74L286,44L330,78L372,50L400,72V140H0z" fill="#8f9db4"/>` +
    `<path d="M60,34l18,24q-9,5 -18,0q-9,5 -18,0zM120,26l20,26q-10,5 -20,0q-10,5 -20,0zM196,40l18,24q-9,5 -18,0q-9,5 -18,0zM286,44l17,23q-8,5 -17,0q-8,5 -17,0zM372,50l16,22q-8,5 -16,0q-8,5 -16,0z" fill="#f8fbfd"/>` +
    // 中景の山(杉の生えた低い尾根)
    `<path d="M0,134L48,104L104,124L156,102L212,128L268,104L322,126L400,104V150H0z" fill="#5f7a5c"/>` +
    `<g>${[18, 40, 66, 90, 306, 332, 358, 384].map((x, i) => cedar(x, 138 + (i % 2) * 4, 20 + (i % 3) * 5, "#2f5f3f")).join("")}</g>` +
    // ── 谷底の町(高山の木造3階)
    ground(140, "#7fa464") +
    `<path d="M0,158h400v52H0z" fill="#a8967c"/>` +
    `<g fill="#5f4a34"><rect x="6" y="112" width="52" height="46"/><rect x="66" y="120" width="42" height="38"/><rect x="292" y="116" width="48" height="42"/><rect x="348" y="124" width="42" height="34"/></g>` +
    `<g fill="#3f3226"><path d="M0,112h64l-6,-9h-52z"/><path d="M60,120h54l-6,-8h-42z"/><path d="M286,116h60l-6,-9h-48z"/><path d="M342,124h54l-6,-8h-42z"/></g>` +
    `<g fill="#c9a877">${[[12, 120], [26, 120], [40, 120], [12, 134], [26, 134], [40, 134], [72, 128], [86, 128], [72, 142], [86, 142], [298, 124], [312, 124], [326, 124], [298, 138], [312, 138], [326, 138], [354, 132], [368, 132], [354, 146], [368, 146]]
      .map(([x, y]) => `<rect x="${x}" y="${y}" width="10" height="9"/>`)
      .join("")}</g>` +
    `<g stroke="#3f3226" stroke-width="1" opacity=".6" fill="none">${[[12, 120], [26, 120], [40, 120], [72, 128], [86, 128], [298, 124], [312, 124], [326, 124], [354, 132], [368, 132]]
      .map(([x, y]) => `<path d="M${x + 5},${y}v9"/>`)
      .join("")}</g>` +
    // ── 用水と石橋(高山の町を流れる)
    `<path d="M0,168h400v14H0z" fill="#5f9ec4"/>` +
    `<g fill="#8a8880"><rect x="0" y="164" width="400" height="4"/><rect x="0" y="182" width="400" height="4"/></g>` +
    `<g stroke="#bfe8f4" stroke-width="1.6" opacity=".6" fill="none"><path d="M24,174h50M300,176h58"/></g>` +
    `<path d="M170,164h60v22h-60z" fill="#9a968c"/>` +
    `<path d="M166,162h68v4h-68z" fill="#b0aca0"/>` +
    // ── 匠の店(高山は木工の町)
    `<g fill="#8a6a44"><rect x="252" y="186" width="52" height="4"/><rect x="256" y="190" width="4" height="12"/><rect x="296" y="190" width="4" height="12"/></g>` +
    `<path d="M246,186h64l-7,-10h-50z" fill="#c2453c"/>` +
    `<g fill="#c9a877"><rect x="260" y="178" width="10" height="8"/><rect x="274" y="178" width="10" height="8"/><rect x="288" y="178" width="10" height="8"/></g>` +
    // ── 人
    shade(196, 200, 11, 3, ".18") +
    person(194, 200, 21, "#e8443f") +
    arm(194, 187, 12, 4) +
    shade(120, 198, 10, 2.8, ".18") +
    person(118, 198, 19, "#5b8fe8") +
    shade(330, 202, 10, 2.8, ".18") +
    person(328, 202, 20, "#f0e6d2") +
    `<g fill="#6f9e5c"><ellipse cx="26" cy="204" rx="28" ry="8"/><ellipse cx="374" cy="206" rx="26" ry="8"/></g>`,

  /**
   * 島の丘の温泉町。**3都市が共用。**(松山・高知・伊豆大島)
   *
   * 元は19要素。丘と帯だけ。
   *
   * 層: 空 / 入江の海 / 丘の段々 / 温泉の湯宿 / 木立 / 椿 / 石段 / 人。
   *
   * ⚠ 動きの層(`japan-islandhill.tsx`)が **(104,140)(200,146)(292,138)
   *   から湯気**を上げる。その足元に湯宿と木立を置く。
   */
  islandhill:
    sky(112, "#5f9fd8", "#93c6e6", "#dbe8ea") +
    `<circle cx="60" cy="30" r="15" fill="#f5b31c"/>` +
    `<g fill="#f6efe2" opacity=".55"><ellipse cx="250" cy="24" rx="32" ry="4.4"/><ellipse cx="224" cy="31" rx="20" ry="3.2"/></g>` +
    // 遠い島影
    `<path d="M296,112q16,-22 38,-26q26,-5 44,10q14,9 22,16z" fill="#7f96a8"/>` +
    // ── 入江の海
    band(112, 14, "#2a6b95") +
    band(124, 12, "#3585ab") +
    `<g stroke="#cfeaf6" stroke-width="2" opacity=".5" fill="none"><path d="M18,118h48M262,120h58M46,130h52M300,132h64"/></g>` +
    // ── 丘の段々(蜜柑と椿の段畑)
    // 段畑の上端を波打たせたぶん(y=136〜137)が透けたので、海の帯を下まで敷く
    band(136, 16, "#3585ab") +
    `<path d="M0,136q60,-12 124,-2q66,10 134,-4q58,-12 142,4v76H0z" fill="#6f9e5c"/>` +
    ground(150, "#5f8a4c") +
    `<path d="M0,164q70,-10 138,2q66,12 132,-4q54,-12 130,4v46H0z" fill="#4f7a44"/>` +
    `<g stroke="#3f6b3a" stroke-width="2.4" opacity=".55" fill="none"><path d="M-6,152q104,-10 206,0t206,-2M-6,180q104,-10 206,0t206,-2M-6,196q104,-10 206,0t206,-2"/></g>` +
    // ── 湯宿。**動きの層が湯気を上げる位置に建てる**
    `<g fill="#e6dfcd"><rect x="82" y="140" width="46" height="22"/><rect x="272" y="138" width="42" height="20"/></g>` +
    `<g fill="#8a5a4a"><path d="M76,140h58l-7,-9h-44z"/><path d="M266,138h54l-6,-9h-42z"/></g>` +
    `<g fill="#6b5330"><rect x="98" y="150" width="14" height="12"/><rect x="286" y="148" width="12" height="10"/></g>` +
    `<g fill="#f5d38a"><rect x="86" y="145" width="9" height="6"/><rect x="116" y="145" width="9" height="6"/><rect x="276" y="143" width="9" height="6"/><rect x="302" y="143" width="9" height="6"/></g>` +
    `<g fill="#e8443f"><ellipse cx="88" cy="136" rx="4" ry="5.2"/><ellipse cx="122" cy="136" rx="4" ry="5.2"/></g>` +
    shade(105, 163, 28, 4, ".14") +
    shade(293, 159, 24, 4, ".14") +
    // 湯気の3本目(200,146)の足元 — 岩の湯だまり
    `<g fill="#9a968c"><ellipse cx="200" cy="150" rx="22" ry="7"/></g>` +
    `<g fill="#8fb8c4"><ellipse cx="200" cy="149" rx="15" ry="4.4"/></g>` +
    // ── 木立と椿
    `<g>${[[36, 158, 26], [58, 162, 20], [346, 160, 24], [370, 164, 19]]
      .map(([x, b, h]) => `<rect x="${x - 2.6}" y="${b - h * 0.6}" width="5.2" height="${h * 0.6}" fill="#5a4630"/><ellipse cx="${x}" cy="${b - h * 0.78}" rx="${h * 0.5}" ry="${h * 0.42}" fill="#2f6b3a"/>`)
      .join("")}</g>` +
    `<g fill="#e8443f"><circle cx="30" cy="150" r="3.4"/><circle cx="44" cy="154" r="3"/><circle cx="352" cy="152" r="3.2"/><circle cx="366" cy="156" r="2.8"/></g>` +
    `<g fill="#f5b31c"><circle cx="30" cy="150" r="1.3"/><circle cx="352" cy="152" r="1.2"/></g>` +
    // ── 蜜柑の段畑(実つき)と、灯籠
    `<g fill="#3f7a3c">${[[24, 172], [52, 176], [80, 174], [318, 174], [346, 178], [374, 172]]
      .map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="13" ry="7"/>`)
      .join("")}</g>` +
    `<g fill="#f0913c">${[[20, 170], [30, 174], [56, 178], [76, 172], [316, 172], [344, 180], [372, 170]]
      .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.8"/>`)
      .join("")}</g>` +
    stoneLantern(132, 190, 26) +
    stoneLantern(268, 194, 24) +
    shade(132, 191, 10, 2.8, ".18") +
    shade(268, 195, 10, 2.8, ".18") +
    // 入江の小舟
    boat(60, 130, 34, "#5f4227", "#c99a5c") +
    `<path d="M60,128v-11" stroke="#4a3a24" stroke-width="1.6" fill="none"/>` +
    `<path d="M62,118l8,10h-8z" fill="#f0e6d2"/>` +
    // 湯宿の温泉マーク(暖簾)
    `<g fill="#c2453c"><rect x="86" y="162" width="38" height="8"/></g>` +
    `<g fill="#f0e6d2"><circle cx="105" cy="166" r="2.6"/></g>` +
    // ── 石段(丘を下る)
    `<path d="M150,210h100l-14,-38h-72z" fill="#a8a496"/>` +
    `<g fill="#94907f"><path d="M158,196h84v6h-84z"/><path d="M152,182h96v6h-96z"/><path d="M146,172h108v5H146z"/></g>` +
    // ── 人
    shade(172, 202, 11, 3, ".18") +
    person(170, 202, 21, "#e8443f") +
    shade(228, 198, 10, 2.8, ".18") +
    person(226, 198, 19, "#5b8fe8") +
    arm(226, 187, 10, -6) +
    `<g fill="#d8c078"><ellipse cx="170" cy="186" rx="9" ry="3"/></g>`,

  /**
   * 古都。**2都市が共用。**(京都・奈良)
   *
   * 元は39要素。塔と、等間隔の家が5軒。
   *
   * 層: 空 / 東山の稜線 / **町家の通り**(格子・犬矢来・石畳)/ 五重塔(右)/
   * 紅葉 / 鹿 / 人。
   *
   * ⚠ 動きの層(`japan-oldcapital.tsx`)が **x=38/118/198/278/358 の
   *   y=160 に暖簾**を下げる。**そこに軒と入口を作る。**間隔80pxは固定。
   */
  oldcapital:
    sky(116, "#7fb0d8", "#a8cbe0", "#e0dcc8") +
    `<circle cx="330" cy="28" r="14" fill="#f5b31c"/>` +
    `<g fill="#f6efe2" opacity=".5"><ellipse cx="240" cy="22" rx="30" ry="4.2"/></g>` +
    // ── 東山の稜線
    `<path d="M0,104L46,74L96,96L146,72L200,98L252,74L306,96L358,72L400,90V130H0z" fill="#7f9a76"/>` +
    `<path d="M0,116L54,94L112,110L170,90L228,112L286,92L344,110L400,94V140H0z" fill="#5f8a5c"/>` +
    // 五重塔(右へ寄せる。中央のシンボルが塔なので重ねない)
    `<g fill="#c2453c"><rect x="330" y="96" width="34" height="8"/><rect x="334" y="82" width="26" height="7"/><rect x="338" y="70" width="18" height="6"/></g>` +
    `<g fill="#4a4038"><path d="M322,96h50l-8,-7h-34zM328,82h42l-7,-6h-28zM332,70h34l-6,-6h-22z"/></g>` +
    `<rect x="345" y="56" width="3" height="10" fill="#f5b31c"/>` +
    `<rect x="330" y="104" width="34" height="12" fill="#8a6a44"/>` +
    // ── 町家の通り。**軒は y=158。暖簾の下がる x=38/118/198/278/358 に入口**
    ground(116, "#8a9a72") +
    `<path d="M0,132h400v78H0z" fill="#c9bda0"/>` +
    `<g fill="#e6dcc4">${[0, 80, 160, 240, 320]
      .map((x) => `<rect x="${x + 2}" y="128" width="76" height="30"/>`)
      .join("")}</g>` +
    `<g fill="#4a4038">${[0, 80, 160, 240, 320]
      .map((x) => `<path d="M${x - 4},128h88l-8,-13h-72z"/>`)
      .join("")}</g>` +
    `<g fill="#3a322a">${[0, 80, 160, 240, 320].map((x) => `<rect x="${x - 4}" y="128" width="88" height="3"/>`).join("")}</g>` +
    // 二階の格子窓
    `<g fill="#6b5330">${[0, 80, 160, 240, 320]
      .map((x) => `<rect x="${x + 14}" y="136" width="52" height="14"/>`)
      .join("")}</g>` +
    `<g stroke="#c9a877" stroke-width="1" opacity=".8" fill="none">${[0, 80, 160, 240, 320]
      .map((x) => [8, 16, 24, 32, 40, 48].map((d) => `<path d="M${x + 14 + d},136v14"/>`).join(""))
      .join("")}</g>` +
    // **軒(y=158)。暖簾はここに下がる**
    `<g fill="#4a4038">${[0, 80, 160, 240, 320].map((x) => `<rect x="${x - 4}" y="155" width="88" height="4"/>`).join("")}</g>` +
    `<g fill="#8a6a44">${[0, 80, 160, 240, 320].map((x) => `<rect x="${x + 2}" y="158" width="76" height="4"/>`).join("")}</g>` +
    // 一階の入口(暖簾の真下)と格子
    `<g fill="#3f3226">${[38, 118, 198, 278, 358]
      .map((x) => `<rect x="${x - 4}" y="162" width="22" height="24"/>`)
      .join("")}</g>` +
    `<g fill="#5f4a34">${[0, 80, 160, 240, 320]
      .map((x) => `<rect x="${x + 2}" y="162" width="28" height="24"/><rect x="${x + 56}" y="162" width="22" height="24"/>`)
      .join("")}</g>` +
    `<g stroke="#8a6a44" stroke-width="1" opacity=".7" fill="none">${[0, 80, 160, 240, 320]
      .map((x) => [4, 10, 16, 22].map((d) => `<path d="M${x + 2 + d},162v24"/>`).join(""))
      .join("")}</g>` +
    // 犬矢来(軒下の竹の囲い)
    `<g fill="#a8813c" opacity=".9">${[0, 80, 160, 240, 320]
      .map((x) => `<path d="M${x + 2},186q14,-8 28,0v6h-28z"/>`)
      .join("")}</g>` +
    // ── 石畳の通り
    `<path d="M0,190h400v20H0z" fill="#9a968c"/>` +
    `<g stroke="#8a8880" stroke-width="1.2" opacity=".7" fill="none">${[0, 1, 2]
      .map((r) => `<path d="M0,${194 + r * 6}h400"/>`)
      .join("")}${[20, 60, 100, 140, 180, 220, 260, 300, 340, 380].map((x) => `<path d="M${x},190v20"/>`).join("")}</g>` +
    // ── 紅葉と鹿
    `<path d="M300,190v-20" stroke="#5a4630" stroke-width="3" stroke-linecap="round" fill="none"/>` +
    `<g fill="#d8613c"><ellipse cx="292" cy="168" rx="14" ry="8"/><ellipse cx="310" cy="171" rx="12" ry="7"/><ellipse cx="301" cy="162" rx="13" ry="7"/></g>` +
    // 鹿(奈良)。脚・胴・首・角を分けて置く
    shade(96, 202, 18, 3.6, ".18") +
    `<g stroke="#8a6a44" stroke-width="2.4" stroke-linecap="round" fill="none"><path d="M86,202v-9M94,202v-8M104,202v-8M110,202v-9"/></g>` +
    `<path d="M82,194q0,-9 9,-9h18q9,0 9,9v2H82z" fill="#c9a877"/>` +
    `<path d="M110,187q6,-2 8,-9l4,1q-1,8 -6,11z" fill="#c9a877"/>` +
    `<path d="M116,178q4,-2 6,1l2,3q-3,2 -7,1z" fill="#c9a877"/>` +
    `<path d="M117,177l-2,-6l4,4M121,176l3,-6l0,5" stroke="#8a6a44" stroke-width="1.4" stroke-linecap="round" fill="none"/>` +
    `<g fill="#f0e6d2"><circle cx="88" cy="190" r="1.6"/><circle cx="98" cy="188" r="1.6"/></g>` +
    // ── 人
    shade(196, 204, 11, 3, ".18") +
    person(194, 204, 21, "#c2453c") +
    shade(236, 202, 10, 2.8, ".18") +
    person(234, 202, 19, "#5b8fe8") +
    arm(234, 191, 10, 5),

  /**
   * 日本海側・島の海辺の町。**9都市が共用する、日本で最多の背景。**
   * (金沢・鳥取・高松・萩・佐渡・隠岐・五島・種子島・稚内)
   *
   * 元は22要素で、空・海・砂と、等間隔に並んだ同じ低木が5つだけだった。
   *
   * 層: 空(3階調)/ 遠くの島影 / 沖と手前で色を分けた海 / 磯と波しぶき /
   * 漁港の堤防と赤灯台 / 砂丘の起伏 / 風で傾いた黒松 / 網を繕う漁師と干し網 /
   * 最前景の砂の稜線とハマヒルガオ。
   */
  seaside:
    sky(98, "#6aa8dc", "#9ccbe8", "#dbe8ea") +
    `<circle cx="330" cy="30" r="15" fill="#f5b31c"/>` +
    `<g fill="#f6efe2"><ellipse cx="96" cy="24" rx="30" ry="5.4" opacity=".8"/><ellipse cx="74" cy="31" rx="19" ry="3.6" opacity=".62"/><ellipse cx="196" cy="18" rx="24" ry="4.2" opacity=".55"/><ellipse cx="268" cy="44" rx="28" ry="4" opacity=".45"/></g>` +
    // とんび。海辺の町にはたいてい鳶がいる
    `<g stroke="#5f5240" stroke-width="1.6" fill="none" stroke-linecap="round"><path d="M136,44q5,-5 10,0q5,-5 10,0M172,32q4,-4 8,0q4,-4 8,0"/></g>` +
    // ── 遠景の島影(大小2つ。水平線に厚みが出る)
    `<path d="M248,98q14,-20 34,-24q24,-5 42,8q16,10 24,16z" fill="#7f96a8"/>` +
    `<path d="M262,98q12,-14 28,-17q18,-3 32,7z" fill="#6b8496" opacity=".7"/>` +
    `<path d="M40,98q10,-11 26,-13q18,-2 30,13z" fill="#8fa4b4" opacity=".85"/>` +
    // ── 海(沖は濃く、岸へ向かって明るく)
    band(98, 20, "#2a6b95") +
    band(116, 18, "#3585ab") +
    band(132, 20, "#4f9ec2") +
    `<g stroke="#cfeaf6" stroke-width="2" opacity=".5" fill="none"><path d="M14,106h58M96,103h38M254,107h60M338,104h50M52,116h48M164,118h56M286,120h74M22,128h62M120,131h46M240,129h56M344,133h46M70,141h54M280,144h74"/></g>` +
    `<g stroke="#8fcae0" stroke-width="2.4" opacity=".45" fill="none"><path d="M0,113q38,-5 76,0t76,0M232,124q40,-5 80,0t80,0"/></g>` +
    // ── 磯(岩礁と波しぶき)。海と砂だけだと絵が平らになる
    `<path d="M256,152q9,-18 24,-16q9,1 14,9q11,-7 20,2q9,8 13,18z" fill="#6b6a62"/>` +
    `<path d="M265,152q7,-12 18,-11q9,1 13,7q9,-4 16,3z" fill="#8a8880"/>` +
    `<g fill="#f2fafd" opacity=".85"><ellipse cx="252" cy="147" rx="11" ry="4"/><ellipse cx="322" cy="151" rx="9" ry="3.4"/></g>` +
    // ── 漁港の堤防と赤灯台
    `<path d="M0,148h122v6H0z" fill="#9a968c"/>` +
    `<path d="M0,154h116v8H0z" fill="#7f7b72"/>` +
    `<g fill="#8a8880"><rect x="98" y="140" width="14" height="9"/><rect x="76" y="143" width="12" height="6"/></g>` +
    `<rect x="34" y="106" width="13" height="42" fill="#f6efe2"/>` +
    `<g fill="#e8443f"><rect x="34" y="114" width="13" height="7"/><rect x="34" y="128" width="13" height="7"/><rect x="34" y="141" width="13" height="7"/></g>` +
    `<path d="M31,106h19l-3,-7h-13z" fill="#4a5568"/>` +
    `<rect x="37" y="96" width="7" height="5" fill="#f5b31c"/>` +
    // 係留した漁船
    shade(146, 152, 22, 4, ".16") +
    `<path d="M126,150c10,-5 34,-5 44,0c-7,6 -37,6 -44,0z" fill="#f0e6d2"/>` +
    `<rect x="140" y="136" width="12" height="10" fill="#e8443f"/>` +
    `<path d="M148,136v-10" stroke="#4a3a24" stroke-width="2" fill="none"/>` +
    // ── 砂浜(濡れた砂 → 乾いた砂 → 砂丘の起伏)
    ground(152, "#e0c9a0") +
    `<path d="M0,154q40,-5 82,0q46,6 90,-2q48,-8 96,1q42,8 132,-3v8H0z" fill="#f2ede0" opacity=".8"/>` +
    `<path d="M0,166q56,-6 108,2q56,8 110,-2q54,-9 112,3q36,7 70,-1v10H0z" fill="#cdb083"/>` +
    `<g fill="#c2a476"><ellipse cx="86" cy="196" rx="76" ry="10"/><ellipse cx="322" cy="204" rx="82" ry="10"/></g>` +
    // ── 黒松の防砂林。**右にまとめる。**
    // 左右6本に散らしたら灯台も磯も松に埋もれた(アラビア海の椰子と同じ失敗)。
    // 左は漁港、右は松林、中央はシンボル、と役割で分ける。大きさと傾きはばらす。
    pine(330, 168, 44, -5) +
    pine(364, 172, 56, -8, true) +
    pine(392, 166, 38, -4) +
    // ── 干し網の櫓。**シンボルの真下(y>170)は空いているので、ここを使う**
    `<g stroke="#6b5330" stroke-width="3" fill="none" stroke-linecap="round"><path d="M150,200v-28M214,200v-28M148,172h68"/></g>` +
    // 網は塗りを薄くして格子を見せる。opacity .6 の塗りだと緑の板に見えた
    `<path d="M150,174h64v20q-32,7 -64,0z" fill="#5f8a72" opacity=".26"/>` +
    `<g stroke="#3f6a54" stroke-width="1" opacity=".85" fill="none"><path d="M158,174v21M166,174v22M174,174v22M182,174v23M190,174v22M198,174v22M206,174v21M150,180h64M150,186h64M150,192h63"/></g>` +
    // ── 網を繕う漁師
    shade(72, 196, 20, 4) +
    person(64, 196, 22, "#5b8fe8") +
    arm(64, 182, 13, 4) +
    person(86, 193, 20, "#e8443f") +
    shade(90, 193, 15, 3.4) +
    arm(86, 181, -11, 3) +
    `<path d="M74,186q6,4 3,10" stroke="#8a8578" stroke-width="1.4" fill="none"/>` +
    // 浜に上げた木箱と浮き玉
    `<g fill="#a8813c"><rect x="252" y="184" width="26" height="12"/><rect x="257" y="176" width="18" height="8"/></g>` +
    `<g stroke="#7a5a34" stroke-width="1.2" fill="none"><path d="M252,190h26M257,180h18"/></g>` +
    `<g fill="#4f9ec2"><circle cx="288" cy="194" r="6"/><circle cx="299" cy="198" r="4.6"/></g>` +
    // ── 最前景: 砂丘の稜線とハマヒルガオ
    `<path d="M0,210v-16q60,-12 128,-2q64,9 130,-4q56,-11 142,2v20z" fill="#d6bd92"/>` +
    `<g stroke="#4f7a4a" stroke-width="2" fill="none" stroke-linecap="round"><path d="M22,208v-10M30,209v-8M38,207v-11M354,209v-9M362,207v-11M370,208v-8"/></g>` +
    `<g fill="#e8a0c0"><circle cx="30" cy="197" r="3"/><circle cx="362" cy="196" r="2.6"/></g>`,

  /**
   * 山あいの盆地の町。**7都市が共用。**(盛岡・会津若松・山形・草津・福井・富良野・北見)
   *
   * 元は15要素で、緑の三角が2つと、等間隔の曲線が5本だけだった。日本でいちばん薄い絵。
   *
   * 層: 空(3階調)/ 残雪の奥羽の峰 / 杉山 / 谷底の集落(茅葺きの農家と白壁の蔵)/
   * 川と橋 / 段の色を変えた畑 / 稲架掛けと農作業 / 最前景の畝と柿の木。
   */
  valley2:
    // 空は**遠景の稜線がいちばん下がる位置**まで塗り下ろす。
    // 74 にしたら、x=0 で稜線が y=104 まで下がっているぶんが横一文字に透けた。
    // 見えている空の高さではなく、後ろに回り込む深さで決める。
    sky(120, "#6aa8dc", "#9ccbe8", "#d4e4ea") +
    `<circle cx="326" cy="26" r="15" fill="#f5b31c"/>` +
    `<g fill="#f6efe2"><ellipse cx="84" cy="22" rx="28" ry="5" opacity=".8"/><ellipse cx="62" cy="28" rx="17" ry="3.4" opacity=".6"/><ellipse cx="236" cy="16" rx="22" ry="4" opacity=".5"/></g>` +
    // ── 遠景: 残雪の峰(奥羽山脈)。中央はシンボルに隠れるので左右に高い峰を置く
    `<path d="M0,104L42,50L74,78L118,44L162,86L214,58L268,92L318,52L360,80L400,60V120H0z" fill="#8f9db4"/>` +
    `<path d="M42,50l16,20q-8,5 -16,0q-8,5 -16,0zM118,44l17,22q-9,5 -17,0q-8,5 -17,0zM318,52l16,20q-8,5 -16,0q-8,5 -16,0z" fill="#f4f8fb"/>` +
    `<path d="M0,116L36,84L78,104L120,80L166,108L212,88L262,112L310,86L354,106L400,88V140H0z" fill="#6f8a76"/>` +
    // ── 中景: 杉山。稜線に沿って生やすと日本の山になる
    `<path d="M0,132L48,104L104,124L150,106L206,128L258,110L312,126L360,104L400,120V150H0z" fill="#4f7a54"/>` +
    `<g>${[[16, 134, 20], [34, 137, 15], [58, 124, 22], [78, 130, 17], [104, 136, 19], [126, 126, 21], [274, 128, 20], [296, 134, 16], [318, 128, 22], [342, 122, 18], [364, 128, 21], [386, 132, 16]]
      .map(([x, b, h]) => cedar(x, b, h, "#2f5f3f"))
      .join("")}</g>` +
    // ── 谷底(集落が乗る面)。
    // 高さ14(=152まで)だと、川がうねって上へ出る所と畑の始まり(160)のあいだが
    // 透けた。川や畑を波打たせるときは、その振れ幅ぶん下まで敷いておく。
    band(138, 22, "#7fa464") +
    // 白壁の蔵と茅葺きの農家。人の暮らしがここに集まる
    shade(96, 140, 40, 5, ".16") +
    farmhouse(64, 140, 58, 26) +
    farmhouse(126, 140, 34, 18, "#5a6678", "#e6dfcd") +
    `<rect x="300" y="120" width="40" height="20" fill="#f4f0e4"/>` +
    `<path d="M294,120h52l-26,-13z" fill="#3a4453"/>` +
    `<rect x="294" y="120" width="52" height="3" fill="#2f3644"/>` +
    `<rect x="312" y="128" width="12" height="12" fill="#5a4630"/>` +
    shade(320, 141, 26, 4, ".16") +
    // 軽トラ(山の集落にはたいてい一台いる)。
    // x=212 に置いたらシンボル(x=151〜249)の後ろで白い切れ端しか見えなかった
    `<g fill="#f0e6d2"><rect x="256" y="128" width="15" height="11" rx="2"/><rect x="270" y="131" width="19" height="8"/></g>` +
    `<rect x="259" y="130" width="9" height="6" fill="#8fb8d0"/>` +
    `<g fill="#3f3428"><circle cx="264" cy="140" r="3"/><circle cx="284" cy="140" r="3"/></g>` +
    // ── 川と石橋
    `<path d="M0,152q60,6 120,-2q64,-9 128,3q60,10 152,1v10q-92,9 -152,-1q-64,-11 -128,-2q-60,8 -120,2z" fill="#5f9ec4"/>` +
    `<g stroke="#bfe8f4" stroke-width="1.6" opacity=".6" fill="none"><path d="M24,156h44M300,157h56"/></g>` +
    `<path d="M76,158q14,-12 28,0v5q-14,-9 -28,0z" fill="#9a968c"/>` +
    `<rect x="74" y="150" width="32" height="3" fill="#8a8578"/>` +
    // ── 段の色を変えた畑。同じ緑で全部塗ると畝が平board になる
    ground(160, "#7fae6a") +
    `<path d="M0,160q100,-6 200,2t200,-2v14q-100,8 -200,0t-200,2z" fill="#8fbe72"/>` +
    `<path d="M0,176q100,-6 200,2t200,-2v16q-100,8 -200,0t-200,2z" fill="#c2a86a"/>` +
    `<path d="M0,194q100,-6 200,2t200,-2v16H0z" fill="#6f9e5c"/>` +
    `<g stroke="#5d8a54" stroke-width="1.6" opacity=".65" fill="none"><path d="M-6,168q104,-8 206,0t206,-2M-6,184q104,-8 206,0t206,-2M-6,202q104,-8 206,0t206,-2"/></g>` +
    // 畝の苗
    `<g fill="#4f7a4a">${[16, 44, 72, 100, 128, 272, 300, 328, 356, 384]
      .map((x) => `<path d="M${x},172v-7M${x - 3},172v-5M${x + 3},172v-5" stroke="#4f7a4a" stroke-width="1.4" fill="none"/>`)
      .join("")}</g>` +
    // ── 稲架掛け(はさがけ)。刈った稲を横木に掛けて干す。
    // 細い縦棒を等間隔に並べたら**柵**に見えたので、束を太く・重ねて垂らす。
    `<g stroke="#8a6a44" stroke-width="3" fill="none" stroke-linecap="round"><path d="M290,198v-24M358,198v-24"/></g>` +
    `<g fill="#d8c078">${[296, 308, 320, 332, 344, 354]
      .map((x, i) => `<path d="M${x - 8},176q8,-4 16,0q3,12 -1,20q-7,3 -14,0q-4,-9 -1,-20z" opacity="${i % 2 ? ".92" : "1"}"/>`)
      .join("")}</g>` +
    `<g stroke="#b89a52" stroke-width="1" opacity=".7" fill="none">${[296, 308, 320, 332, 344, 354]
      .map((x) => `<path d="M${x - 4},180v13M${x + 2},180v13"/>`)
      .join("")}</g>` +
    `<path d="M288,176h72" stroke="#8a6a44" stroke-width="2.6" stroke-linecap="round" fill="none"/>` +
    // ── 農作業の2人
    shade(112, 192, 16, 3.6) +
    person(108, 192, 21, "#5b8fe8") +
    arm(108, 179, 10, 6) +
    `<path d="M118,185l6,7" stroke="#8a6a44" stroke-width="2" stroke-linecap="round" fill="none"/>` +
    person(132, 195, 19, "#e8443f") +
    shade(136, 195, 14, 3.2) +
    `<ellipse cx="132" cy="178" rx="7" ry="2.6" fill="#d8c078"/>` +
    // ── 最前景: 手前の畝と柿の木(実がなると日本の秋になる)
    `<path d="M0,210v-12q60,-8 128,0q64,7 130,-2q56,-8 142,2v12z" fill="#5f8a52"/>` +
    `<path d="M376,206v-34" stroke="#5a4630" stroke-width="4" fill="none" stroke-linecap="round"/>` +
    `<path d="M376,182l-11,-9M376,188l10,-8" stroke="#5a4630" stroke-width="2.4" fill="none" stroke-linecap="round"/>` +
    `<g fill="#3f7a44"><ellipse cx="366" cy="170" rx="14" ry="10"/><ellipse cx="386" cy="176" rx="12" ry="9"/><ellipse cx="376" cy="163" rx="13" ry="9"/></g>` +
    `<g fill="#e8843c"><circle cx="364" cy="176" r="3.4"/><circle cx="384" cy="182" r="3"/><circle cx="374" cy="170" r="2.8"/></g>`,
};
