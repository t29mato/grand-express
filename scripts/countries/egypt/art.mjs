/**
 * エジプトの都市イラスト。
 *
 * `EGYPT_MARKS` は24×24の座標系に描くシンボル、`EGYPT_BG` は400×210の
 * 座標系に描く背景シーン(いずれもSVG断片の文字列)。フランス・韓国と同じく
 * 最初から文字列として持つ。動きは含めない。
 *
 * この盤面の芯は「国土の95%が無人の砂漠で、人も鉄道もナイル本流とデルタという
 * 5%足らずに押し込まれている」こと。**絵でもそれを守る。**
 * ナイル沿い・デルタの背景は緑と建物で詰め、砂漠の背景はわざと空きを大きく取る。
 * 盤面を眺めたときに、詰まっている帯と空いている帯が見分けられるようにする。
 *
 * **ピラミッドとファラオは1枚も描かない。**この盤面はいま人が暮らしている
 * エジプトを描く。古代の図像は文章の担当が意図的に0件にしている。
 *
 * 色: 空 #9fc8e4〜砂埃の地平 #ecdfc4、ナイル #3f7f9f、地中海 #2f8fb8、
 * 砂 #dcc08e/#c0a274、石灰岩 #cbab78、耕地の緑 #5f9f43/#79b354、
 * 椰子 #3d7a38、日干し煉瓦 #dcbc90、赤煉瓦(未完成の家)#b0694a、
 * 漆喰 #f4efe2、ヌビアの塗り分け #2f7fbe/#f0b429/#d1503c/#3f9f7f。
 *
 * 鍵は `cities.mjs` の `mark` / `bg` と一対一で対応する。
 *
 * **背景SVGの中央25%(x=151〜249 / y=54〜152)は都市シンボルに隠れて
 * 見えない。** 見せたい細部は左右3分の1と手前(y>170)に置く。
 * `sky()` の第3引数には**必ず地面の開始yと同じ値**を渡すこと。ずれると
 * 空と地面のあいだに横一文字の塗り残しができる。
 */

// ---------------------------------------------------------------------------
// 背景シーンの組み立て部品
// ---------------------------------------------------------------------------

const W = 400;

/** 小数の桁を抑える(SVGを読みやすく保つため)。 */
const r1 = (v) => Math.round(v * 10) / 10;

function band(y, h, fill) {
  return `<rect x="0" y="${r1(y)}" width="${W}" height="${r1(h)}" fill="${fill}"/>`;
}

/**
 * 空。**第3引数に地面の開始yと同じ値を渡すこと。**
 * エジプトの空は水平線側が砂埃で白茶けるので、下側を暖色に寄せてある。
 */
function sky(top = "#9fc8e4", bottom = "#ecdfc4", to = 124) {
  return band(0, 92, top) + band(84, Math.max(0, to - 84), bottom);
}

function ground(y, fill) {
  return `<rect x="0" y="${r1(y)}" width="${W}" height="${r1(210 - y)}" fill="${fill}"/>`;
}

function sun(cx, cy, r, fill = "#f7d98a") {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" opacity=".85"/>`;
}

/** 砂埃のかすみ。エジプトの遠景はたいてい霞んでいる。 */
function haze(cx, cy, rx, ry, fill = "#e8dcc0") {
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" opacity=".45"/>`;
}

/** 高いところに薄く伸びる筋雲。 */
function cirrus(x, y, w) {
  return (
    `<g stroke="#f6efe2" stroke-width="3" stroke-linecap="round" opacity=".5" fill="none">` +
    `<path d="M${x},${y}h${w}"/>` +
    `<path d="M${r1(x + 12)},${r1(y + 8)}h${r1(w * 0.6)}"/>` +
    `</g>`
  );
}

/** 遠景のなだらかな稜線。`base` は地面の開始yに合わせる。 */
function ridge(y, amp, fill, base, seed = 0) {
  const pts = [];
  for (let i = 0; i <= 8; i++) {
    pts.push(`${r1((i * W) / 8)},${r1(y + Math.sin((i + seed) * 1.7) * amp)}`);
  }
  return `<path d="M0,${r1(base)}L${pts.join("L")}L400,${r1(base)}z" fill="${fill}"/>`;
}

/** ナツメヤシ。この盤面でいちばん多く出る木。 */
function palm(x, base, h, frond = "#3d7a38", trunk = "#8a6a46") {
  const t = r1(2 + h * 0.05);
  const top = r1(base - h);
  const sw = r1(1.6 + h * 0.05);
  const L = r1(h * 0.52);
  const arc = (dx, dy, qx, qy) =>
    `<path d="M${x},${top}q${qx},${qy} ${dx},${dy}"/>`;
  return (
    `<path d="M${r1(x - t)},${base}L${r1(x - t * 0.4)},${top}h${r1(t * 0.8)}L${r1(x + t)},${base}z" fill="${trunk}"/>` +
    `<g stroke="${frond}" stroke-width="${sw}" stroke-linecap="round" fill="none">` +
    arc(r1(-L), r1(h * 0.2), r1(-L * 0.55), r1(-h * 0.18)) +
    arc(r1(L), r1(h * 0.2), r1(L * 0.55), r1(-h * 0.18)) +
    arc(r1(-L * 0.75), r1(h * 0.36), r1(-L * 0.62), r1(h * 0.02)) +
    arc(r1(L * 0.75), r1(h * 0.36), r1(L * 0.62), r1(h * 0.02)) +
    arc(r1(-L * 0.4), r1(-h * 0.16), r1(-L * 0.34), r1(-h * 0.18)) +
    arc(r1(L * 0.4), r1(-h * 0.16), r1(L * 0.34), r1(-h * 0.18)) +
    `</g>` +
    `<circle cx="${x}" cy="${r1(top + h * 0.06)}" r="${r1(1 + h * 0.035)}" fill="#c8933c"/>`
  );
}

/** ファルーカ(三角帆の川船)。 */
function felucca(x, waterY, s = 1) {
  const hw = r1(15 * s);
  const mast = r1(42 * s);
  return (
    `<path d="M${r1(x - hw)},${r1(waterY - 2)}q${hw},${r1(8 * s)} ${r1(hw * 2)},0z" fill="#5a4a38"/>` +
    `<rect x="${r1(x - 1)}" y="${r1(waterY - mast)}" width="2" height="${mast}" fill="#6b5330"/>` +
    `<path d="M${x},${r1(waterY - mast)}L${r1(x + 20 * s)},${r1(waterY - 3)}L${x},${r1(waterY - 3)}z" fill="#f4efe2"/>` +
    `<path d="M${x},${r1(waterY - mast * 0.9)}L${r1(x - 13 * s)},${r1(waterY - 3)}L${x},${r1(waterY - 3)}z" fill="#e2dac6"/>`
  );
}

/** 白鷺。デルタの田と水路にいくらでもいる。 */
function egret(x, y, s = 1) {
  const w = r1(7 * s);
  return `<path d="M${r1(x - w)},${y}q${r1(w / 2)},${r1(-5 * s)} ${w},0q${r1(w / 2)},${r1(-5 * s)} ${w},0" fill="none" stroke="#f4efe2" stroke-width="${r1(1.6 * s)}"/>`;
}

/** 水面。 */
function ripples(y, color = "#8fd0dc") {
  return (
    `<g stroke="${color}" stroke-width="2" opacity=".55" fill="none">` +
    `<path d="M16,${y}h68M148,${r1(y + 11)}h94M56,${r1(y + 22)}h72M276,${r1(y + 6)}h88M300,${r1(y + 20)}h64"/>` +
    `</g>`
  );
}

/**
 * 赤煉瓦の集合住宅。上階に鉄筋を突き出したまま建て増していく、
 * いまのエジプトでいちばん見慣れた輪郭。
 */
function brickBlock(x, base, w, h, floors = 4, wall = "#b0694a") {
  const fh = r1(h / floors);
  const cols = Math.max(2, Math.round(w / 15));
  const gap = r1(w / cols);
  const win = [];
  for (let f = 0; f < floors; f++) {
    for (let c = 0; c < cols; c++) {
      win.push(
        `<rect x="${r1(x + gap * c + gap * 0.28)}" y="${r1(base - h + fh * f + fh * 0.26)}" width="${r1(gap * 0.44)}" height="${r1(fh * 0.44)}"/>`,
      );
    }
  }
  const rebar = [];
  for (let i = 0; i < 4; i++) {
    rebar.push(
      `<rect x="${r1(x + 4 + (i * (w - 10)) / 3)}" y="${r1(base - h - 7)}" width="2" height="7"/>`,
    );
  }
  return (
    `<rect x="${r1(x)}" y="${r1(base - h)}" width="${r1(w)}" height="${r1(h)}" fill="${wall}"/>` +
    `<g fill="#33291f" opacity=".7">${win.join("")}</g>` +
    `<g fill="#8f5238">${rebar.join("")}</g>` +
    `<g stroke="#9a5b3f" stroke-width="1" opacity=".65" fill="none"><path d="M${r1(x)},${r1(base - h + fh)}h${r1(w)}M${r1(x)},${r1(base - h + fh * 2)}h${r1(w)}"/></g>`
  );
}

/** 陸屋根の日干し煉瓦の家。 */
function flatHouse(x, base, w, h, wall = "#dcbc90", roof = "#c2a072") {
  return (
    `<rect x="${r1(x)}" y="${r1(base - h)}" width="${r1(w)}" height="${r1(h)}" fill="${wall}"/>` +
    `<rect x="${r1(x - 3)}" y="${r1(base - h - 4)}" width="${r1(w + 6)}" height="5" fill="${roof}"/>` +
    `<rect x="${r1(x + w * 0.16)}" y="${r1(base - h * 0.66)}" width="${r1(w * 0.2)}" height="${r1(h * 0.28)}" fill="#5d4a34"/>` +
    `<rect x="${r1(x + w * 0.6)}" y="${r1(base - h * 0.66)}" width="${r1(w * 0.2)}" height="${r1(h * 0.28)}" fill="#5d4a34"/>` +
    `<path d="M${r1(x + w * 0.42)},${base}v${r1(-h * 0.42)}a${r1(w * 0.08)},${r1(w * 0.08)} 0 0 1 ${r1(w * 0.16)},0V${base}z" fill="#7a5f42"/>`
  );
}

/** 屋上の衛星アンテナ。エジプトの街並みの手触りはここに出る。 */
function dishes(x, y, n = 3, gap = 11) {
  const p = [];
  for (let i = 0; i < n; i++) {
    const cx = r1(x + i * gap);
    p.push(`<path d="M${r1(cx - 3.4)},${y}a3.4,3.4 0 0 1 6.8,0z"/>`);
  }
  return `<g fill="#e2ddd0" opacity=".95">${p.join("")}</g>`;
}

/** 屋上の黒い貯水タンク。 */
function waterTanks(x, y, n = 2, gap = 13) {
  const p = [];
  for (let i = 0; i < n; i++) {
    p.push(
      `<rect x="${r1(x + i * gap)}" y="${r1(y - 7)}" width="8" height="7" rx="2"/>`,
    );
  }
  return `<g fill="#3a3a3e">${p.join("")}</g>`;
}

/** 物干しの洗濯物。 */
function laundry(x1, y1, x2, y2) {
  const p = [];
  const n = 5;
  for (let i = 1; i <= n; i++) {
    const t = i / (n + 1);
    p.push(
      `<rect x="${r1(x1 + (x2 - x1) * t - 3)}" y="${r1(y1 + (y2 - y1) * t)}" width="6" height="${r1(8 + (i % 3) * 3)}"/>`,
    );
  }
  return (
    `<path d="M${x1},${y1}L${x2},${y2}" stroke="#8a8478" stroke-width="1" fill="none"/>` +
    `<g fill="#eae2d0" opacity=".9">${p.join("")}</g>`
  );
}

/** ドーム。 */
function dome(cx, base, r, fill = "#cfc2a8") {
  return (
    `<path d="M${r1(cx - r)},${base}a${r},${r1(r * 1.05)} 0 0 1 ${r1(r * 2)},0z" fill="${fill}"/>` +
    `<path d="M${cx},${r1(base - r * 1.05)}v-6" stroke="#c8a020" stroke-width="2"/>` +
    `<circle cx="${cx}" cy="${r1(base - r * 1.05 - 7)}" r="2.4" fill="#c8a020"/>`
  );
}

/** ミナレット(鉛筆形)。 */
function minaret(x, base, h, fill = "#e0d5bc") {
  const w = r1(2 + h * 0.1);
  return (
    `<rect x="${r1(x - w / 2)}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${fill}"/>` +
    `<rect x="${r1(x - w)}" y="${r1(base - h * 0.6)}" width="${r1(w * 2)}" height="3" fill="#b6a684"/>` +
    `<rect x="${r1(x - w * 0.85)}" y="${r1(base - h * 0.84)}" width="${r1(w * 1.7)}" height="3" fill="#b6a684"/>` +
    `<path d="M${r1(x - w * 0.7)},${r1(base - h)}h${r1(w * 1.4)}l${r1(-w * 0.7)},-10z" fill="#cbbc9c"/>` +
    `<circle cx="${x}" cy="${r1(base - h - 12)}" r="2" fill="#c8a020"/>`
  );
}

/** 煙突。 */
function chimney(x, base, h, w = 8, fill = "#c9c0b0") {
  return (
    `<path d="M${r1(x - w / 2 - 1)},${base}L${r1(x - w / 2 + 1)},${r1(base - h)}h${r1(w - 2)}L${r1(x + w / 2 + 1)},${base}z" fill="${fill}"/>` +
    `<rect x="${r1(x - w / 2 + 0.6)}" y="${r1(base - h)}" width="${r1(w - 1.2)}" height="4" fill="#a8412f"/>`
  );
}

/** 煙。 */
function smoke(x, y, s = 1, fill = "#d8d2c6") {
  return (
    `<g fill="${fill}" opacity=".5">` +
    `<ellipse cx="${x}" cy="${y}" rx="${r1(10 * s)}" ry="${r1(6 * s)}"/>` +
    `<ellipse cx="${r1(x + 10 * s)}" cy="${r1(y - 9 * s)}" rx="${r1(13 * s)}" ry="${r1(8 * s)}"/>` +
    `<ellipse cx="${r1(x + 25 * s)}" cy="${r1(y - 17 * s)}" rx="${r1(16 * s)}" ry="${r1(10 * s)}"/>` +
    `</g>`
  );
}

/** 鋸屋根(紡績工場・織布工場)。 */
function sawtooth(x, y, w, h, n, roof = "#8a8f96", glass = "#a8c8d8") {
  const bw = r1(w / n);
  const p = [];
  for (let i = 0; i < n; i++) {
    const bx = r1(x + i * bw);
    p.push(
      `<path d="M${bx},${y}v${r1(-h)}l${bw},${r1(h * 0.55)}z" fill="${roof}"/>`,
    );
    p.push(
      `<path d="M${r1(bx + 1.5)},${r1(y - h + 2)}v${r1(h * 0.46)}l${r1(bw * 0.5)},${r1(-h * 0.24)}z" fill="${glass}" opacity=".85"/>`,
    );
  }
  return p.join("");
}

/** 線路。 */
function railTrack(y, x = 0, w = W, tie = "#8a6a4a", rail = "#5a5a60") {
  const p = [];
  for (let i = x; i < x + w; i += 15)
    p.push(`<rect x="${r1(i)}" y="${r1(y - 3)}" width="7" height="9"/>`);
  return (
    `<g fill="${tie}" opacity=".85">${p.join("")}</g>` +
    `<g stroke="${rail}" stroke-width="2" fill="none"><path d="M${x},${r1(y - 2)}h${w}M${x},${r1(y + 4)}h${w}"/></g>`
  );
}

/** 畝・条。田や綿畑の横線。 */
function fieldRows(x, y, w, rows, gap, color, sw = 3) {
  const p = [];
  for (let i = 0; i < rows; i++)
    p.push(`<path d="M${r1(x)},${r1(y + i * gap)}h${r1(w)}"/>`);
  return `<g stroke="${color}" stroke-width="${sw}" opacity=".8" fill="none">${p.join("")}</g>`;
}

/** サトウキビの株。 */
function cane(x, base, h, fill = "#6ba84a") {
  const p = [];
  for (let i = -2; i <= 2; i++) {
    p.push(
      `<path d="M${r1(x + i * 3)},${base}q${r1(i * 2)},${r1(-h * 0.6)} ${r1(i * 4)},${r1(-h)}"/>`,
    );
  }
  return `<g stroke="${fill}" stroke-width="2.4" stroke-linecap="round" fill="none">${p.join("")}</g>`;
}

/** 砂丘。 */
function dune(cx, base, w, h, fill = "#dcc08e") {
  return `<path d="M${r1(cx - w / 2)},${base}q${r1(w * 0.28)},${r1(-h)} ${r1(w * 0.6)},${r1(-h * 0.72)}q${r1(w * 0.3)},${r1(h * 0.2)} ${r1(w * 0.4)},${r1(h * 0.72)}z" fill="${fill}"/>`;
}

/** 風紋。砂漠の背景が空きすぎて安く見えないように敷く。 */
function windRipples(y, color = "#c8a97c") {
  return (
    `<g stroke="${color}" stroke-width="1.6" opacity=".5" fill="none" stroke-linecap="round">` +
    `<path d="M10,${y}q22,-5 44,0M70,${r1(y + 9)}q26,-5 52,0M0,${r1(y + 19)}q24,-6 48,0M250,${r1(y + 4)}q26,-5 52,0M310,${r1(y + 15)}q24,-5 48,0M280,${r1(y + 26)}q28,-6 56,0"/>` +
    `</g>`
  );
}

/** 砂漠の低木。 */
function scrub(x, base, r, fill = "#8a9a5a") {
  return (
    `<circle cx="${x}" cy="${r1(base - r * 0.6)}" r="${r}" fill="${fill}" opacity=".9"/>` +
    `<circle cx="${r1(x - r * 0.8)}" cy="${r1(base - r * 0.3)}" r="${r1(r * 0.66)}" fill="${fill}" opacity=".8"/>`
  );
}

/** 送電鉄塔。アスワンの電気は上エジプトじゅうへ送られる。 */
function pylon(x, base, h, fill = "#8a8f96") {
  const w = r1(h * 0.3);
  return (
    `<g stroke="${fill}" stroke-width="1.6" fill="none">` +
    `<path d="M${r1(x - w / 2)},${base}L${r1(x - w * 0.16)},${r1(base - h)}M${r1(x + w / 2)},${base}L${r1(x + w * 0.16)},${r1(base - h)}"/>` +
    `<path d="M${r1(x - w * 0.42)},${r1(base - h * 0.3)}h${r1(w * 0.84)}M${r1(x - w * 0.3)},${r1(base - h * 0.6)}h${r1(w * 0.6)}"/>` +
    `<path d="M${r1(x - w * 0.8)},${r1(base - h * 0.82)}h${r1(w * 1.6)}M${r1(x - w * 0.6)},${r1(base - h * 0.98)}h${r1(w * 1.2)}"/>` +
    `</g>`
  );
}

/** 港のガントリークレーン。 */
function gantry(x, base, h, fill = "#d1503c") {
  return (
    `<g fill="${fill}">` +
    `<rect x="${r1(x - 2)}" y="${r1(base - h)}" width="4" height="${h}"/>` +
    `<rect x="${r1(x + h * 0.42)}" y="${r1(base - h)}" width="4" height="${h}"/>` +
    `<rect x="${r1(x - 14)}" y="${r1(base - h - 5)}" width="${r1(h * 0.95)}" height="5"/>` +
    `</g>` +
    `<line x1="${r1(x - 8)}" y1="${r1(base - h)}" x2="${r1(x - 8)}" y2="${r1(base - h * 0.55)}" stroke="#4a4a52" stroke-width="1.4"/>` +
    `<rect x="${r1(x - 13)}" y="${r1(base - h * 0.55)}" width="10" height="7" fill="#4a4a52"/>`
  );
}

/** 積み上げたコンテナ。 */
function containers(x, base, cols, rows) {
  const cw = 22;
  const ch = 9;
  const colors = ["#d1503c", "#2f7fbe", "#e8b21c", "#3f9f7f", "#b0684a"];
  const p = [];
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      p.push(
        `<rect x="${r1(x + c * (cw + 2))}" y="${r1(base - (r + 1) * ch)}" width="${cw}" height="${r1(ch - 1)}" fill="${colors[(c + r) % colors.length]}"/>`,
      );
    }
  }
  return p.join("");
}

/** ヌビアの家。丸屋根と原色の塗り分け、幾何学の帯。 */
function nubianHouse(x, base, w, h, wall = "#2f7fbe", trim = "#f0b429") {
  const zig = [];
  const n = Math.max(3, Math.round(w / 12));
  const s = r1(w / n);
  for (let i = 0; i < n; i++)
    zig.push(
      `M${r1(x + i * s)},${r1(base - h * 0.52)}l${r1(s / 2)},-6l${r1(s / 2)},6z`,
    );
  return (
    `<rect x="${r1(x)}" y="${r1(base - h)}" width="${r1(w)}" height="${r1(h)}" fill="${wall}"/>` +
    `<path d="M${r1(x)},${r1(base - h)}a${r1(w / 2)},${r1(w * 0.38)} 0 0 1 ${r1(w)},0z" fill="${trim}"/>` +
    `<path d="${zig.join("")}" fill="#f4efe2"/>` +
    `<rect x="${r1(x)}" y="${r1(base - h * 0.52)}" width="${r1(w)}" height="3" fill="#d1503c"/>` +
    `<path d="M${r1(x + w * 0.38)},${base}v${r1(-h * 0.34)}a${r1(w * 0.12)},${r1(w * 0.12)} 0 0 1 ${r1(w * 0.24)},0V${base}z" fill="#f4efe2"/>` +
    `<circle cx="${r1(x + w * 0.16)}" cy="${r1(base - h * 0.28)}" r="3" fill="#3f9f7f"/>` +
    `<circle cx="${r1(x + w * 0.84)}" cy="${r1(base - h * 0.28)}" r="3" fill="#d1503c"/>`
  );
}

/** 石灰岩の崖の縞。 */
function strata(y, h, x = 0, w = W, color = "#a8875a") {
  const p = [];
  for (let i = 0; i < 4; i++)
    p.push(`<path d="M${x},${r1(y + (i * h) / 4)}h${w}"/>`);
  return `<g stroke="${color}" stroke-width="1.6" opacity=".4" fill="none">${p.join("")}</g>`;
}

// ---------------------------------------------------------------------------
// 背景シーン(27種)。鍵は cities.mjs の `bg` と対応。
//
// ナイル沿いとデルタの背景は緑と建物で詰め、砂漠の背景はわざと空きを残す。
// ---------------------------------------------------------------------------

const EGYPT_BASE_BG = {
  /**
   * カイロ。国じゅうの線路が絞られる一点。左にラムセス駅のアーチ屋根、
   * 右に無許可地区の赤煉瓦とミナレット、手前にナイルのコルニッシュ。
   */
  metrohub:
    sky("#9fc8e4", "#e6d9bd", 140) +
    haze(200, 118, 220, 26) +
    cirrus(30, 26, 90) +
    // 右: 無許可地区の斜面とミナレット
    ridge(120, 6, "#c7b596", 140, 1) +
    ground(140, "#bfae90") +
    brickBlock(268, 140, 40, 78, 5) +
    brickBlock(310, 140, 34, 62, 4, "#a96144") +
    brickBlock(346, 140, 42, 88, 6) +
    dishes(272, 60, 3) +
    waterTanks(348, 52, 3) +
    laundry(310, 96, 344, 104) +
    minaret(258, 140, 74) +
    dome(238, 140, 15, "#d4c7ac") +
    // 左: ラムセス駅の車庫屋根
    `<path d="M8,140V96a62,44 0 0 1 124,0v44z" fill="#cfc4ac"/>` +
    `<path d="M16,140V98a54,38 0 0 1 108,0v42z" fill="#48545f"/>` +
    `<g stroke="#8b96a2" stroke-width="1.6" opacity=".7" fill="none"><path d="M70,140V60M40,138V78M100,138V78M24,132h92"/></g>` +
    `<rect x="4" y="90" width="132" height="7" fill="#b6a888"/>` +
    // 機関車の顔
    `<rect x="54" y="104" width="32" height="36" rx="4" fill="#c93f34"/>` +
    `<rect x="54" y="104" width="32" height="8" fill="#f4efe2"/>` +
    `<rect x="60" y="115" width="20" height="10" rx="2" fill="#cfe4f0"/>` +
    `<circle cx="60" cy="132" r="3.4" fill="#f7d98a"/>` +
    `<circle cx="80" cy="132" r="3.4" fill="#f7d98a"/>` +
    railTrack(150, 0, 250) +
    // 手前: ナイルとファルーカ
    band(168, 12, "#c4b394") +
    `<g fill="#8f8068"><rect x="0" y="166" width="400" height="4"/><rect x="20" y="158" width="4" height="10"/><rect x="60" y="158" width="4" height="10"/><rect x="100" y="158" width="4" height="10"/><rect x="300" y="158" width="4" height="10"/><rect x="340" y="158" width="4" height="10"/><rect x="380" y="158" width="4" height="10"/></g>` +
    band(180, 30, "#3f7f9f") +
    ripples(188) +
    felucca(52, 196, 0.62) +
    felucca(342, 200, 0.5) +
    palm(14, 176, 46) +
    palm(388, 178, 40),

  /**
   * ギザ。世俗の大学と、そのすぐ隣の古い動物園。
   * 左に講堂のドーム、右に人工湖に架かるヴィクトリア朝の鉄橋。
   */
  citycampus:
    sky("#9fc8e4", "#e6ecd8", 136) +
    cirrus(280, 24, 80) +
    ridge(118, 5, "#a8bd8a", 136, 3) +
    ground(136, "#84a85c") +
    // 左: 講堂
    `<rect x="18" y="94" width="112" height="46" fill="#e4dcc4"/>` +
    `<rect x="14" y="90" width="120" height="6" fill="#cfc2a4"/>` +
    dome(74, 90, 30, "#b8613c") +
    `<g fill="#cfc2a4"><rect x="24" y="100" width="8" height="40"/><rect x="42" y="100" width="8" height="40"/><rect x="60" y="100" width="8" height="40"/><rect x="78" y="100" width="8" height="40"/><rect x="96" y="100" width="8" height="40"/><rect x="114" y="100" width="8" height="40"/></g>` +
    `<g fill="#5c6a74" opacity=".8"><rect x="34" y="104" width="7" height="22"/><rect x="52" y="104" width="7" height="22"/><rect x="70" y="104" width="7" height="22"/><rect x="88" y="104" width="7" height="22"/><rect x="106" y="104" width="7" height="22"/></g>` +
    `<rect x="12" y="140" width="124" height="5" fill="#bfb298"/>` +
    // 右: 動物園の人工湖と鉄橋
    `<path d="M256,178q56,-22 144,-8v40H256z" fill="#4f92ae"/>` +
    `<g stroke="#9fd8e0" stroke-width="2" opacity=".6" fill="none"><path d="M280,190h50M320,200h60"/></g>` +
    `<rect x="262" y="150" width="132" height="6" fill="#4d6a52"/>` +
    `<path d="M262,150q66,-34 132,0" fill="none" stroke="#4d6a52" stroke-width="4"/>` +
    `<g stroke="#5d7a62" stroke-width="2" fill="none"><path d="M286,150V138M312,150V128M340,150V128M366,150V138"/></g>` +
    `<g fill="#5d7a62"><rect x="262" y="156" width="6" height="24"/><rect x="388" y="156" width="6" height="20"/></g>` +
    // 木立と芝生
    `<circle cx="196" cy="150" r="20" fill="#3f8f4a"/>` +
    palm(158, 172, 52) +
    palm(238, 176, 44) +
    palm(340, 148, 40) +
    `<circle cx="30" cy="176" r="20" fill="#4d9a4a"/>` +
    `<rect x="28" y="176" width="5" height="22" fill="#6b5330"/>` +
    `<circle cx="70" cy="186" r="16" fill="#3f8f4a"/>` +
    `<rect x="68" y="186" width="4" height="18" fill="#6b5330"/>` +
    fieldRows(0, 196, 400, 2, 9, "#6ba84a", 4),

  /**
   * 工業の町。ヘルワン・カフル・エル=ダッワール・ナグ・ハマーディ。
   * 煙突と工場棟、貨物側線。緑は工場のあいだにわずかに残る。
   */
  industrialtown:
    sky("#aabbc0", "#ded4c0", 142) +
    haze(120, 60, 120, 34, "#cfc8bc") +
    smoke(300, 66, 1.2) +
    smoke(70, 52, 0.9) +
    ridge(124, 5, "#a89e8c", 142, 2) +
    ground(142, "#a89880") +
    // 左: 工場棟と高炉
    `<rect x="10" y="104" width="92" height="38" fill="#9aa0a8"/>` +
    sawtooth(10, 104, 92, 20, 4) +
    `<g fill="#41474e" opacity=".8"><rect x="18" y="116" width="14" height="16"/><rect x="42" y="116" width="14" height="16"/><rect x="66" y="116" width="14" height="16"/></g>` +
    `<rect x="104" y="82" width="26" height="60" fill="#7f8896"/>` +
    `<rect x="98" y="76" width="38" height="9" fill="#6b7280"/>` +
    chimney(72, 104, 62, 12) +
    chimney(306, 142, 88, 14) +
    chimney(334, 142, 66, 11) +
    // 右: 冷却塔と倉庫
    `<path d="M264,142l6,-46h26l6,46z" fill="#c4bcae"/>` +
    `<rect x="266" y="94" width="34" height="5" fill="#a89e8c"/>` +
    `<rect x="352" y="110" width="44" height="32" fill="#a8ada8"/>` +
    `<path d="M348,110h52l-8,-10h-36z" fill="#8a8f8a"/>` +
    // 貨物側線
    railTrack(160, 0, 400) +
    railTrack(178, 0, 400) +
    `<g fill="#7a5a44"><rect x="34" y="140" width="46" height="18" rx="2"/><rect x="88" y="140" width="46" height="18" rx="2"/></g>` +
    `<g fill="#3a3a3e"><circle cx="46" cy="160" r="4"/><circle cx="70" cy="160" r="4"/><circle cx="100" cy="160" r="4"/><circle cx="124" cy="160" r="4"/></g>` +
    // 手前のわずかな緑と塀
    `<rect x="0" y="190" width="400" height="4" fill="#8a8478"/>` +
    palm(20, 200, 44) +
    palm(378, 202, 38) +
    scrub(120, 200, 9) +
    scrub(276, 202, 8),

  /**
   * シュブラ・エル=ヘイマ。地球でも指折りの過密。
   * 建物で埋め、空を最小にする。**この盤面でいちばん詰まった絵。**
   */
  denseindustrial:
    sky("#a8b8c0", "#d8cdb8", 150) +
    haze(200, 52, 200, 26, "#cfc8bc") +
    ground(150, "#8f8778") +
    brickBlock(0, 150, 38, 106, 7) +
    brickBlock(40, 150, 34, 88, 6, "#a96144") +
    brickBlock(76, 150, 40, 118, 8) +
    brickBlock(118, 150, 32, 96, 6, "#a96144") +
    brickBlock(252, 150, 36, 112, 7) +
    brickBlock(290, 150, 40, 92, 6, "#a96144") +
    brickBlock(332, 150, 30, 120, 8) +
    brickBlock(364, 150, 36, 84, 5, "#a96144") +
    dishes(6, 40, 3, 10) +
    dishes(82, 28, 3, 12) +
    dishes(258, 34, 2, 12) +
    dishes(338, 26, 2, 11) +
    waterTanks(44, 60, 2) +
    waterTanks(294, 56, 2) +
    laundry(4, 82, 36, 92) +
    laundry(296, 76, 328, 88) +
    // 路地の底(手前)。金属工房の火花と茶店
    band(150, 6, "#6f6a60") +
    band(178, 32, "#7a7264") +
    `<g stroke="#5f5a52" stroke-width="2" opacity=".6" fill="none"><path d="M0,186h400M0,198h400"/></g>` +
    `<rect x="10" y="156" width="52" height="24" fill="#8a8f96"/>` +
    `<path d="M6,156h60l-6,-10h-48z" fill="#6b7280"/>` +
    `<rect x="22" y="162" width="28" height="14" fill="#3a3a3e"/>` +
    `<g fill="#f5b31c"><circle cx="36" cy="169" r="3.4"/><circle cx="28" cy="164" r="1.6"/><circle cx="45" cy="165" r="1.4"/><circle cx="42" cy="175" r="1.6"/></g>` +
    `<rect x="330" y="156" width="56" height="24" fill="#b8613c"/>` +
    `<path d="M324,156h68v-6h-68z" fill="#e8b21c"/>` +
    `<g fill="#4a4436"><rect x="336" y="170" width="8" height="10"/><rect x="352" y="170" width="8" height="10"/><rect x="368" y="170" width="8" height="10"/></g>` +
    // 路地の奥。建物に挟まれて日の差さない帯(駒に隠れる位置なので軽く)
    `<g fill="#3a352e" opacity=".35"><path d="M152,150h96l-10,60h-76z"/></g>`,

  /**
   * 新行政首都。砂漠に建てた新しい都市。**わざと空きを大きく取る。**
   * 右にガラスの塔、左からモノレールの桁が伸びてくる。
   */
  desertcapital:
    sky("#8fc0e0", "#efe2c4", 144) +
    sun(56, 40, 20) +
    haze(240, 130, 190, 22) +
    ground(144, "#e0c48f") +
    dune(90, 152, 200, 22, "#d6b980") +
    dune(330, 150, 160, 16, "#d6b980") +
    // 右: ガラスの塔と建設クレーン
    `<g fill="#8fb8cc"><path d="M300,144V52l22,-8v100z"/><path d="M330,144V70l18,-6v80z"/><path d="M354,144V88l16,-5v61z"/></g>` +
    `<g fill="#cfe4f0" opacity=".5"><rect x="304" y="60" width="14" height="4"/><rect x="304" y="72" width="14" height="4"/><rect x="304" y="84" width="14" height="4"/><rect x="334" y="80" width="10" height="4"/><rect x="334" y="92" width="10" height="4"/><rect x="358" y="98" width="8" height="4"/></g>` +
    `<g stroke="#c93f34" stroke-width="3" fill="none"><path d="M378,144V44M378,44h-30M378,52l-16,10"/></g>` +
    // モノレールの桁と無人の車両
    `<g fill="#cfc7b4"><rect x="0" y="100" width="400" height="9"/><rect x="30" y="109" width="12" height="35"/><rect x="120" y="109" width="12" height="35"/><rect x="230" y="109" width="12" height="35"/><rect x="330" y="109" width="12" height="35"/></g>` +
    `<rect x="16" y="76" width="112" height="26" rx="12" fill="#f4efe2"/>` +
    `<rect x="16" y="88" width="112" height="5" fill="#2f7fbe"/>` +
    `<g fill="#5c7a8a"><rect x="24" y="80" width="18" height="8" rx="2"/><rect x="48" y="80" width="18" height="8" rx="2"/><rect x="72" y="80" width="18" height="8" rx="2"/><rect x="96" y="80" width="18" height="8" rx="2"/></g>` +
    `<path d="M16,89a12,13 0 0 1 0,-13z" fill="#dcd4c4"/>` +
    windRipples(172) +
    // 手前: 舗装したばかりの広い道と、まだ何も無い区画
    `<g stroke="#c8a97c" stroke-width="2" opacity=".55" fill="none"><path d="M40,204h60M300,196h70"/></g>` +
    scrub(24, 190, 7, "#9aa46a") +
    scrub(368, 200, 6, "#9aa46a"),

  /**
   * デルタの耕地。タンタ・カフル・エル=シェイフ・バンハー。
   * 地平線まで緑が続き、用水路と椰子と白鷺で埋める。**いちばん緑の濃い絵。**
   */
  deltafields:
    sky("#9fc8e4", "#e0e8cc", 120) +
    cirrus(250, 22, 96) +
    egret(64, 44, 1.1) +
    egret(96, 58, 0.9) +
    egret(310, 38, 1) +
    // 遠くの村
    `<g fill="#cfbb98"><rect x="18" y="104" width="26" height="16"/><rect x="48" y="108" width="20" height="12"/><rect x="300" y="106" width="24" height="14"/><rect x="330" y="110" width="18" height="10"/></g>` +
    minaret(80, 120, 40) +
    minaret(356, 120, 32) +
    ground(120, "#79b354") +
    fieldRows(0, 128, 400, 3, 8, "#5f9f43", 4) +
    // 用水路(手前)
    band(150, 16, "#4a8438") +
    band(166, 20, "#4f92ae") +
    `<g stroke="#9fd8e0" stroke-width="2" opacity=".55" fill="none"><path d="M20,174h84M240,178h120"/></g>` +
    band(186, 24, "#6ba84a") +
    fieldRows(0, 192, 400, 3, 7, "#4a8438", 4) +
    // 椰子と水牛の草
    palm(26, 158, 60) +
    palm(58, 152, 46) +
    palm(300, 156, 52) +
    palm(340, 150, 66) +
    palm(378, 158, 42) +
    `<g fill="#3f7f3a"><path d="M120,150q-6,-16 2,-24q6,10 4,24z"/><path d="M132,150q0,-18 10,-24q0,14 -4,24z"/></g>` +
    `<circle cx="176" cy="176" r="5" fill="#f4efe2"/>` +
    `<path d="M176,176q10,-2 14,4h-14z" fill="#f4efe2"/>` +
    scrub(210, 198, 8, "#4a8438") +
    scrub(268, 200, 7, "#4a8438"),

  /**
   * ナイル本流の町。マンスーラ・ミト・ガムル・ゼフタ・ソハーグ・ケナ・ギルガ。
   * 左岸に建て増し中の家並みとミナレット、川に渡し船、右手に椰子と耕地。
   */
  rivertown:
    sky("#9fc8e4", "#e6dcc0", 132) +
    cirrus(60, 24, 80) +
    ridge(116, 5, "#c4b596", 132, 4) +
    ground(132, "#b8a888") +
    // 左岸の町
    brickBlock(4, 132, 34, 66, 4) +
    brickBlock(40, 132, 30, 52, 3, "#a96144") +
    flatHouse(74, 132, 34, 34) +
    dishes(8, 74, 2, 11) +
    waterTanks(44, 82, 2) +
    minaret(120, 132, 60) +
    dome(140, 132, 13, "#d4c7ac") +
    // 右岸の耕地
    fieldRows(258, 118, 142, 2, 8, "#5f9f43", 5) +
    `<rect x="258" y="112" width="142" height="20" fill="#79b354"/>` +
    palm(272, 132, 50) +
    palm(302, 132, 40) +
    palm(336, 130, 58) +
    palm(372, 132, 44) +
    // 川と渡し船
    band(144, 66, "#3f7f9f") +
    ripples(156) +
    `<rect x="0" y="138" width="400" height="8" fill="#a89880"/>` +
    `<g fill="#8f8068"><rect x="30" y="146" width="5" height="12"/><rect x="70" y="146" width="5" height="12"/><rect x="330" y="146" width="5" height="12"/></g>` +
    felucca(52, 190, 0.8) +
    felucca(330, 200, 0.62) +
    // 渡し場の桟橋と待つ人影
    `<rect x="96" y="176" width="60" height="6" fill="#8a6a46"/>` +
    `<g fill="#8a6a46"><rect x="100" y="182" width="4" height="16"/><rect x="130" y="182" width="4" height="16"/><rect x="150" y="182" width="4" height="16"/></g>` +
    `<g fill="#3f4a52"><rect x="106" y="164" width="6" height="12" rx="2"/><circle cx="109" cy="161" r="3"/><rect x="118" y="166" width="6" height="10" rx="2"/><circle cx="121" cy="163" r="3"/></g>` +
    egret(370, 160, 0.9),

  /**
   * 鉄道の分岐点。ザガジグ。線路が扇に開き、信号所と腕木信号が立つ。
   */
  railjunction:
    sky("#9fc8e4", "#e6dcc0", 134) +
    cirrus(290, 28, 74) +
    ridge(120, 4, "#c2b294", 134, 5) +
    ground(134, "#b6a68a") +
    // 町並み(奥)
    `<g fill="#cfbb98"><rect x="10" y="106" width="30" height="28"/><rect x="44" y="112" width="24" height="22"/><rect x="286" y="104" width="28" height="30"/><rect x="318" y="110" width="22" height="24"/><rect x="344" y="100" width="30" height="34"/></g>` +
    `<g fill="#5c6a74" opacity=".7"><rect x="16" y="112" width="7" height="9"/><rect x="28" y="112" width="7" height="9"/><rect x="292" y="110" width="7" height="9"/><rect x="350" y="106" width="7" height="9"/></g>` +
    minaret(78, 134, 48) +
    palm(268, 134, 44) +
    palm(392, 134, 38) +
    // 扇に開く線路
    railTrack(152, 0, 400) +
    railTrack(176, 0, 400) +
    railTrack(200, 0, 400) +
    `<g stroke="#5a5a60" stroke-width="2" fill="none"><path d="M150,150L230,174M150,174L230,198M250,150L170,174"/></g>` +
    // 信号所
    `<rect x="16" y="112" width="46" height="34" fill="#c9a878"/>` +
    `<rect x="12" y="108" width="54" height="6" fill="#8a6a46"/>` +
    `<g fill="#cfe4f0"><rect x="22" y="118" width="12" height="12"/><rect x="42" y="118" width="12" height="12"/></g>` +
    `<rect x="16" y="146" width="46" height="4" fill="#8a6a46"/>` +
    // 腕木信号
    `<rect x="330" y="112" width="5" height="52" fill="#4a4a52"/>` +
    `<path d="M335,118h26l-6,6h-20z" fill="#c93f34"/>` +
    `<circle cx="333" cy="134" r="4" fill="#3f9f5f"/>` +
    // 手前の砂利と転轍てこ
    `<g fill="#9a9080" opacity=".8"><circle cx="40" cy="206" r="3"/><circle cx="88" cy="200" r="2.4"/><circle cx="140" cy="208" r="2.6"/><circle cx="300" cy="204" r="3"/><circle cx="360" cy="208" r="2.4"/></g>` +
    `<path d="M104,196v-14l12,-4" fill="none" stroke="#4a4a52" stroke-width="3"/>`,

  /**
   * 農産加工の町。ダマンフール(テンサイ)・ミニヤ(サトウキビ)・エドフ(サトウキビ)。
   * 奥に精製工場、手前に刈り取った作物と計量所、脇に運河。
   */
  agroindustry:
    sky("#9fc8e4", "#e6dcbc", 130) +
    smoke(250, 62, 1) +
    ridge(114, 5, "#a8b884", 130, 2) +
    ground(130, "#8fae5a") +
    // 奥: 精製工場
    `<rect x="252" y="90" width="96" height="40" fill="#b6bcb8"/>` +
    sawtooth(252, 90, 96, 16, 4, "#8a8f96") +
    `<g fill="#41474e" opacity=".75"><rect x="262" y="102" width="14" height="18"/><rect x="286" y="102" width="14" height="18"/><rect x="310" y="102" width="14" height="18"/></g>` +
    chimney(240, 130, 76, 13) +
    `<g fill="#cfc7b4"><rect x="352" y="86" width="18" height="44" rx="4"/><rect x="374" y="94" width="16" height="36" rx="4"/></g>` +
    // 運河(中景)
    band(138, 16, "#4f92ae") +
    `<g stroke="#9fd8e0" stroke-width="2" opacity=".5" fill="none"><path d="M30,146h70M270,148h100"/></g>` +
    band(154, 56, "#7fae52") +
    // 手前: 作物の畝と積んだ収穫物
    cane(30, 190, 46) +
    cane(58, 194, 38) +
    cane(352, 192, 44) +
    cane(380, 196, 34) +
    fieldRows(90, 166, 220, 3, 8, "#5f9f43", 4) +
    // 計量所と荷車
    `<rect x="16" y="150" width="56" height="24" fill="#c9a878"/>` +
    `<path d="M12,150h64l-8,-12h-48z" fill="#8a6a46"/>` +
    `<rect x="28" y="158" width="16" height="16" fill="#5d4a34"/>` +
    `<rect x="96" y="182" width="60" height="16" rx="2" fill="#8a6a46"/>` +
    `<path d="M96,182q30,-20 60,0z" fill="#6ba84a"/>` +
    `<circle cx="110" cy="200" r="7" fill="#5d4a34"/>` +
    `<circle cx="146" cy="200" r="7" fill="#5d4a34"/>` +
    palm(200, 158, 40) +
    palm(324, 156, 46) +
    egret(120, 120, 0.9),

  /**
   * 紡績工場の構内。エル・マハッラ・エル・クブラ。
   * 巨大な鋸屋根の工場と塀、正門、そこへ向かう人の列。
   */
  millcompound:
    sky("#a8bcc4", "#ddd2ba", 146) +
    haze(200, 70, 190, 28, "#cfc8bc") +
    smoke(60, 60, 1.1) +
    ground(146, "#a09684") +
    // 工場棟(左右に大きく)
    `<rect x="0" y="102" width="150" height="44" fill="#a8aeb4"/>` +
    sawtooth(0, 102, 150, 22, 6) +
    `<g fill="#41474e" opacity=".8"><rect x="10" y="116" width="16" height="20"/><rect x="36" y="116" width="16" height="20"/><rect x="62" y="116" width="16" height="20"/><rect x="88" y="116" width="16" height="20"/><rect x="114" y="116" width="16" height="20"/></g>` +
    `<rect x="256" y="108" width="144" height="38" fill="#a8aeb4"/>` +
    sawtooth(256, 108, 144, 20, 5) +
    `<g fill="#41474e" opacity=".8"><rect x="266" y="120" width="16" height="18"/><rect x="292" y="120" width="16" height="18"/><rect x="318" y="120" width="16" height="18"/><rect x="344" y="120" width="16" height="18"/><rect x="370" y="120" width="16" height="18"/></g>` +
    chimney(40, 102, 74, 14) +
    chimney(300, 108, 58, 11) +
    // 塀と正門
    band(160, 26, "#b8a184") +
    `<g stroke="#9a8468" stroke-width="1.6" opacity=".6" fill="none"><path d="M0,168h400M0,178h400M40,160v26M120,160v26M280,160v26M360,160v26"/></g>` +
    `<g fill="#7f6a52"><rect x="150" y="150" width="8" height="36"/><rect x="242" y="150" width="8" height="36"/></g>` +
    `<path d="M150,152h100v-8H150z" fill="#c93f34"/>` +
    // 手前: 交代の列と自転車
    band(186, 24, "#8f8878") +
    `<g fill="#3f4a52"><rect x="26" y="188" width="7" height="16" rx="3"/><circle cx="29.5" cy="184" r="4"/><rect x="46" y="190" width="7" height="14" rx="3"/><circle cx="49.5" cy="186" r="4"/><rect x="66" y="188" width="7" height="16" rx="3"/><circle cx="69.5" cy="184" r="4"/></g>` +
    `<g fill="#4a5f6a"><rect x="336" y="190" width="7" height="14" rx="3"/><circle cx="339.5" cy="186" r="4"/><rect x="356" y="188" width="7" height="16" rx="3"/><circle cx="359.5" cy="184" r="4"/></g>` +
    `<g stroke="#3a3a3e" stroke-width="2" fill="none"><circle cx="106" cy="198" r="8"/><circle cx="130" cy="198" r="8"/><path d="M106,198l10,-12h12l6,12M118,186v-6h8"/></g>`,

  /**
   * デルタの港。ダミエッタ。コンテナ埠頭と浚渫船、手前に家具の材木。
   */
  deltaport:
    sky("#9fc8e4", "#dfe4d4", 126) +
    cirrus(40, 22, 88) +
    egret(300, 40, 1) +
    egret(332, 54, 0.8) +
    ground(126, "#a89880") +
    // 岸壁とクレーン
    gantry(40, 126, 70) +
    gantry(112, 126, 62) +
    gantry(320, 126, 66) +
    containers(0, 126, 3, 3) +
    containers(280, 126, 4, 2) +
    // 海
    band(140, 70, "#3f7f9f") +
    `<rect x="0" y="126" width="400" height="14" fill="#8f8878"/>` +
    ripples(154) +
    // 貨物船(右)
    `<path d="M250,180h140v14q-8,8 -20,8H262z" fill="#1f4f7a"/>` +
    `<rect x="250" y="172" width="140" height="9" fill="#c93f34"/>` +
    containers(258, 172, 4, 2) +
    `<rect x="356" y="146" width="30" height="26" fill="#f4efe2"/>` +
    `<g fill="#5c7a8a"><rect x="360" y="152" width="8" height="7"/><rect x="372" y="152" width="8" height="7"/></g>` +
    `<rect x="366" y="134" width="6" height="12" fill="#e8b21c"/>` +
    // 浚渫船(左)。デルタを作った同じ泥を掻き続ける
    `<path d="M20,182h70v10q-6,6 -14,6H28z" fill="#3f6a52"/>` +
    `<rect x="30" y="170" width="24" height="12" fill="#e8b21c"/>` +
    `<path d="M60,172l34,22" stroke="#8a8f96" stroke-width="4" fill="none"/>` +
    `<path d="M92,190l10,10h-14z" fill="#7f8896"/>` +
    `<g fill="#8a6a4a" opacity=".7"><ellipse cx="104" cy="204" rx="18" ry="5"/></g>` +
    // 手前: 家具工房の材木
    `<g fill="#b58a5a"><rect x="140" y="192" width="80" height="7"/><rect x="146" y="199" width="80" height="7"/><rect x="140" y="185" width="66" height="7"/></g>` +
    `<g stroke="#8a6a46" stroke-width="1.4" opacity=".7" fill="none"><path d="M140,195.5h80M146,202.5h80"/></g>`,

  /**
   * 河口。ロゼッタ。ナイルが地中海に出る所。砂州と漁船と網、
   * 右手に石碑のレプリカ台。
   */
  rivermouth:
    sky("#9fc8e4", "#e4e2cc", 118) +
    cirrus(210, 20, 100) +
    egret(50, 36, 1.1) +
    egret(84, 50, 0.9) +
    egret(340, 42, 1) +
    ground(118, "#3f8fb0") +
    // 海と川の境目、砂州
    band(118, 34, "#2f8fb8") +
    `<g stroke="#9fd8e0" stroke-width="2" opacity=".5" fill="none"><path d="M0,128h120M180,136h140M40,144h90"/></g>` +
    `<path d="M0,152q90,-14 200,-4q110,6 200,-6v22H0z" fill="#e0cba0"/>` +
    band(174, 36, "#4f92ae") +
    ripples(184) +
    // 漁船
    `<path d="M18,168h64l-8,10H26z" fill="#2f6a8a"/>` +
    `<rect x="44" y="150" width="3" height="18" fill="#6b5330"/>` +
    `<path d="M47,150l16,18H47z" fill="#f4efe2"/>` +
    `<path d="M300,170h72l-10,10h-52z" fill="#3f7f6a"/>` +
    `<rect x="330" y="152" width="3" height="18" fill="#6b5330"/>` +
    `<path d="M333,152l14,18h-14z" fill="#e2dac6"/>` +
    // 網を干す杭
    `<g fill="#8a6a46"><rect x="120" y="150" width="4" height="26"/><rect x="164" y="150" width="4" height="26"/></g>` +
    `<path d="M122,152h44v20h-44z" fill="none" stroke="#c9b98a" stroke-width="1.2"/>` +
    `<g stroke="#c9b98a" stroke-width="1" opacity=".8" fill="none"><path d="M122,158h44M122,164h44M134,152v20M146,152v20M156,152v20"/></g>` +
    // 右: 石碑のレプリカ台
    `<rect x="352" y="140" width="30" height="8" fill="#bfb298"/>` +
    `<path d="M356,140V116l6,-6h14v30z" fill="#3f4a4a"/>` +
    `<g stroke="#9fb0ac" stroke-width="1" opacity=".9" fill="none"><path d="M359,116h14M359,120h12M359,126h14M359,130h11M359,135h13"/></g>` +
    // 手前の魚市場の日よけ
    `<path d="M0,190h96l-6,-12H6z" fill="#c93f34"/>` +
    `<g fill="#8a6a46"><rect x="8" y="190" width="4" height="16"/><rect x="84" y="190" width="4" height="16"/></g>` +
    `<g fill="#c8d8dc"><ellipse cx="30" cy="196" rx="9" ry="3.4"/><ellipse cx="52" cy="199" rx="9" ry="3.4"/><ellipse cx="72" cy="196" rx="8" ry="3"/></g>` +
    `<g fill="#8fa0a8" opacity=".8"><ellipse cx="30" cy="196" rx="4" ry="1.4"/><ellipse cx="52" cy="199" rx="4" ry="1.4"/></g>` +
    // 魚を運ぶ木箱と、値をつける人
    `<g fill="#b58a5a"><rect x="96" y="192" width="26" height="12" rx="1"/><rect x="126" y="196" width="24" height="10" rx="1"/><rect x="100" y="182" width="24" height="10" rx="1"/></g>` +
    `<g stroke="#8a6a46" stroke-width="1.2" opacity=".7" fill="none"><path d="M96,198h26M126,201h24M100,187h24"/></g>` +
    `<g fill="#3f4a52"><rect x="160" y="188" width="7" height="16" rx="3"/><circle cx="163.5" cy="184" r="4"/><rect x="176" y="190" width="7" height="14" rx="3"/><circle cx="179.5" cy="186" r="4"/></g>` +
    // 左岸の家並みとミナレット(河口の町)
    `<g fill="#cfbb98"><rect x="0" y="96" width="28" height="22"/><rect x="32" y="102" width="22" height="16"/><rect x="58" y="98" width="24" height="20"/></g>` +
    `<g fill="#5c6a74" opacity=".7"><rect x="6" y="102" width="7" height="9"/><rect x="18" y="102" width="7" height="9"/><rect x="64" y="104" width="7" height="9"/></g>` +
    minaret(96, 118, 40) +
    palm(230, 152, 46) +
    palm(268, 156, 38) +
    palm(390, 156, 44),

  /**
   * 川が二つに分かれる堰。アル・カナーティル。
   * 左右に分かれる水路と、そのあいだの中州の庭園。
   */
  nileforkbarrage:
    sky("#9fc8e4", "#e2e6cc", 124) +
    cirrus(80, 22, 84) +
    ridge(112, 4, "#a8bd8a", 124, 6) +
    ground(124, "#4f92ae") +
    // 中州の庭園(中央〜手前)
    `<path d="M120,124h160v86H120z" fill="#6ba84a"/>` +
    `<path d="M120,124q-30,26 -34,86h34zM280,124q30,26 34,86h-34z" fill="#7fae52"/>` +
    // 左右の水路
    ripples(150, "#9fd8e0") +
    `<g stroke="#9fd8e0" stroke-width="2" opacity=".5" fill="none"><path d="M320,168h70M20,178h74M330,196h60"/></g>` +
    // 堰(横一文字のアーチ列)
    `<rect x="0" y="112" width="400" height="12" fill="#cfc2a4"/>` +
    `<rect x="0" y="106" width="400" height="7" fill="#bfb298"/>` +
    `<g fill="#a89880"><rect x="6" y="124" width="12" height="22"/><rect x="40" y="124" width="12" height="22"/><rect x="74" y="124" width="12" height="22"/><rect x="314" y="124" width="12" height="22"/><rect x="348" y="124" width="12" height="22"/><rect x="382" y="124" width="12" height="22"/></g>` +
    `<g fill="#5d4a34" opacity=".85"><rect x="18" y="126" width="22" height="18"/><rect x="52" y="126" width="22" height="18"/><rect x="326" y="126" width="22" height="18"/><rect x="360" y="126" width="22" height="18"/></g>` +
    // 堰の上の塔門(左右に置いて中央を空ける)
    `<rect x="24" y="72" width="24" height="34" fill="#e0d5bc"/>` +
    `<path d="M20,72h32l-16,-14z" fill="#b8613c"/>` +
    `<rect x="30" y="82" width="12" height="14" fill="#5c6a74"/>` +
    `<rect x="352" y="72" width="24" height="34" fill="#e0d5bc"/>` +
    `<path d="M348,72h32l-16,-14z" fill="#b8613c"/>` +
    `<rect x="358" y="82" width="12" height="14" fill="#5c6a74"/>` +
    // 庭園のあずまやと木立(手前)
    `<circle cx="140" cy="168" r="18" fill="#3f8f4a"/>` +
    `<rect x="137" y="168" width="6" height="22" fill="#6b5330"/>` +
    `<circle cx="264" cy="174" r="16" fill="#4d9a4a"/>` +
    `<rect x="261" y="174" width="5" height="20" fill="#6b5330"/>` +
    palm(178, 200, 62) +
    palm(224, 204, 50) +
    `<path d="M162,204h76l-10,-16h-56z" fill="#c93f34"/>` +
    `<g fill="#e0d5bc"><rect x="166" y="204" width="5" height="6"/><rect x="228" y="204" width="5" height="6"/></g>` +
    `<g stroke="#4a8438" stroke-width="3" opacity=".7" fill="none"><path d="M120,196h180"/></g>`,

  /**
   * 川を渡る可動橋。カフル・エル=ザヤート・エスナ。
   * 桁が横に回って川を開けている。待つ船が下にいる。
   */
  rivercrossing:
    sky("#9fc8e4", "#e2dcc2", 128) +
    cirrus(300, 26, 70) +
    ridge(116, 4, "#bfb896", 128, 7) +
    ground(128, "#a8a084") +
    // 両岸の町と畑
    `<g fill="#cfbb98"><rect x="0" y="102" width="28" height="26"/><rect x="32" y="108" width="22" height="20"/><rect x="352" y="104" width="26" height="24"/><rect x="380" y="110" width="20" height="18"/></g>` +
    minaret(66, 128, 44) +
    palm(96, 128, 40) +
    palm(336, 128, 46) +
    fieldRows(280, 116, 120, 2, 7, "#5f9f43", 5) +
    // 川
    band(140, 70, "#3f7f9f") +
    `<rect x="0" y="128" width="400" height="12" fill="#8f8878"/>` +
    ripples(158) +
    // 回転した桁(斜めに開いている)
    `<circle cx="200" cy="150" r="14" fill="#8a8f96"/>` +
    `<circle cx="200" cy="150" r="6" fill="#5c6a74"/>` +
    `<path d="M64,124L336,166l-4,14L60,138z" fill="#c93f34"/>` +
    `<g stroke="#f0e6d2" stroke-width="1.6" opacity=".85" fill="none"><path d="M74,126l16,14M110,132l16,14M146,138l16,14M238,154l16,14M274,160l16,14M310,166l14,12"/></g>` +
    `<g fill="#a89880"><rect x="46" y="122" width="18" height="26"/><rect x="332" y="164" width="18" height="24"/></g>` +
    // 待っている船
    `<path d="M26,182h72l-10,12H36z" fill="#2f6a8a"/>` +
    `<rect x="40" y="166" width="42" height="16" fill="#f4efe2"/>` +
    `<g fill="#5c7a8a"><rect x="46" y="170" width="8" height="7"/><rect x="58" y="170" width="8" height="7"/><rect x="70" y="170" width="8" height="7"/></g>` +
    felucca(320, 202, 0.62) +
    `<g stroke="#5a5a60" stroke-width="2" fill="none"><path d="M0,132h46M350,174h50"/></g>`,

  /**
   * スエズ。砂の中に水路が一本通り、砂丘の上を船が行くように見える。
   */
  canalcity:
    sky("#8fc0e0", "#efe2c4", 132) +
    sun(52, 38, 18) +
    haze(230, 122, 190, 20) +
    ground(132, "#dcc08e") +
    // 水路(中景の細い帯)
    band(126, 6, "#c8a97c") +
    band(132, 26, "#2f7fa8") +
    `<g stroke="#8fd0dc" stroke-width="2" opacity=".5" fill="none"><path d="M20,142h90M280,148h110"/></g>` +
    band(158, 8, "#c8a97c") +
    // 巨大な船。砂の上を行くように見える
    `<path d="M232,150h164v10q-10,10 -26,10H248z" fill="#1f4f7a"/>` +
    `<rect x="232" y="142" width="164" height="9" fill="#c93f34"/>` +
    containers(240, 142, 5, 3) +
    `<rect x="356" y="102" width="34" height="30" fill="#f4efe2"/>` +
    `<g fill="#5c7a8a"><rect x="360" y="108" width="9" height="7"/><rect x="374" y="108" width="9" height="7"/><rect x="360" y="119" width="9" height="7"/></g>` +
    `<rect x="368" y="86" width="8" height="16" fill="#e8b21c"/>` +
    smoke(372, 78, 0.7) +
    // 左: 水路案内人の詰所と旗
    `<rect x="26" y="94" width="52" height="38" fill="#e4dcc4"/>` +
    `<path d="M22,94h60l-8,-12H30z" fill="#b8613c"/>` +
    `<g fill="#5c6a74"><rect x="34" y="102" width="12" height="14"/><rect x="58" y="102" width="12" height="14"/></g>` +
    `<rect x="30" y="120" width="16" height="12" fill="#5d4a34"/>` +
    `<rect x="88" y="64" width="3" height="68" fill="#8a8f96"/>` +
    `<path d="M91,66h26v6H91zM91,72h26v6H91zM91,78h26v6H91z" fill="#f4efe2"/>` +
    `<path d="M91,66h26v6H91z" fill="#c93f34"/>` +
    `<path d="M91,78h26v6H91z" fill="#2a2a2a"/>` +
    // 手前: 砂と乾いた道
    dune(80, 190, 190, 20, "#d6b980") +
    windRipples(180) +
    scrub(140, 202, 8) +
    palm(20, 200, 46) +
    palm(300, 204, 40),

  /**
   * イスマイリア。運河会社が設計した庭園都市。並木の大通りとヴェランダの家。
   * 右手前に、運河を掘った労働者の慰霊の広場。
   */
  canalgarden:
    sky("#9fc8e4", "#e4ecd4", 134) +
    cirrus(320, 24, 66) +
    ridge(120, 4, "#a8bd8a", 134, 8) +
    ground(134, "#8fae63") +
    // 左: ヴェランダのある家
    `<rect x="12" y="88" width="106" height="46" fill="#f0e8d4"/>` +
    `<path d="M6,88h118l-14,-18H20z" fill="#b8613c"/>` +
    `<g fill="#5c7a8a"><rect x="22" y="96" width="14" height="16"/><rect x="46" y="96" width="14" height="16"/><rect x="70" y="96" width="14" height="16"/><rect x="94" y="96" width="14" height="16"/></g>` +
    `<rect x="8" y="116" width="114" height="5" fill="#d6cbb0"/>` +
    `<g fill="#d6cbb0"><rect x="16" y="121" width="5" height="13"/><rect x="40" y="121" width="5" height="13"/><rect x="64" y="121" width="5" height="13"/><rect x="88" y="121" width="5" height="13"/><rect x="112" y="121" width="5" height="13"/></g>` +
    `<g stroke="#3f9f7f" stroke-width="2" opacity=".7" fill="none"><path d="M18,134v-13M42,134v-13M90,134v-13"/></g>` +
    // 並木の大通り
    band(150, 22, "#c9bfa2") +
    band(172, 38, "#7fae52") +
    `<g stroke="#f0e8d4" stroke-width="3" stroke-dasharray="16 14" opacity=".7" fill="none"><path d="M0,160h400"/></g>` +
    `<circle cx="46" cy="150" r="18" fill="#3f8f4a"/>` +
    `<rect x="43" y="150" width="6" height="14" fill="#6b5330"/>` +
    `<circle cx="120" cy="146" r="20" fill="#4d9a4a"/>` +
    `<rect x="117" y="146" width="6" height="16" fill="#6b5330"/>` +
    `<circle cx="286" cy="148" r="19" fill="#3f8f4a"/>` +
    `<rect x="283" y="148" width="6" height="15" fill="#6b5330"/>` +
    `<circle cx="360" cy="144" r="21" fill="#4d9a4a"/>` +
    `<rect x="357" y="144" width="6" height="18" fill="#6b5330"/>` +
    // 右手前: 慰霊の広場。無名の労働者ぶんの、名前の無い石
    `<rect x="264" y="182" width="126" height="6" fill="#cfc7b4"/>` +
    `<g fill="#e0d8c4"><rect x="272" y="168" width="9" height="14"/><rect x="292" y="164" width="9" height="18"/><rect x="312" y="168" width="9" height="14"/><rect x="332" y="162" width="9" height="20"/><rect x="352" y="168" width="9" height="14"/><rect x="372" y="166" width="9" height="16"/></g>` +
    `<g fill="#c93f34"><circle cx="296" cy="190" r="3"/><circle cx="336" cy="192" r="3"/></g>` +
    palm(20, 196, 50) +
    palm(190, 190, 44) +
    `<g stroke="#5f9f43" stroke-width="3" opacity=".7" fill="none"><path d="M0,200h240"/></g>`,

  /**
   * ポートサイド。木の張り出しヴェランダが続く商店街と、免税品の看板。
   */
  dutyfreeport:
    sky("#9fc8e4", "#e2dcc4", 150) +
    haze(200, 60, 200, 24) +
    egret(60, 34, 1) +
    egret(330, 46, 0.9) +
    ground(150, "#a8a08c") +
    // 木造ヴェランダの建物(左右)
    `<g fill="#f0e8d4"><rect x="0" y="56" width="132" height="94"/><rect x="266" y="48" width="134" height="102"/></g>` +
    `<g fill="#8a6a46"><rect x="0" y="80" width="140" height="9"/><rect x="0" y="108" width="140" height="9"/><rect x="258" y="74" width="142" height="9"/><rect x="258" y="104" width="142" height="9"/></g>` +
    `<g fill="#3f6a7a" opacity=".85"><rect x="10" y="60" width="16" height="18"/><rect x="36" y="60" width="16" height="18"/><rect x="62" y="60" width="16" height="18"/><rect x="88" y="60" width="16" height="18"/><rect x="10" y="90" width="16" height="16"/><rect x="36" y="90" width="16" height="16"/><rect x="62" y="90" width="16" height="16"/><rect x="88" y="90" width="16" height="16"/><rect x="276" y="54" width="16" height="18"/><rect x="302" y="54" width="16" height="18"/><rect x="328" y="54" width="16" height="18"/><rect x="354" y="54" width="16" height="18"/><rect x="276" y="86" width="16" height="16"/><rect x="302" y="86" width="16" height="16"/><rect x="328" y="86" width="16" height="16"/><rect x="354" y="86" width="16" height="16"/></g>` +
    `<g stroke="#a8845c" stroke-width="1.6" opacity=".8" fill="none"><path d="M0,74h140M258,68h142M0,102h140M258,98h142"/></g>` +
    // 灯台(左)
    `<rect x="112" y="18" width="18" height="38" fill="#f4efe2"/>` +
    `<g fill="#c93f34"><rect x="112" y="26" width="18" height="6"/><rect x="112" y="40" width="18" height="6"/></g>` +
    `<rect x="108" y="12" width="26" height="7" fill="#4a5568"/>` +
    `<circle cx="121" cy="8" r="4" fill="#f7d98a"/>` +
    // 商店の日よけと陳列
    `<path d="M0,132h134l-6,-14H6z" fill="#c93f34"/>` +
    `<path d="M266,128h134l6,-14H272z" fill="#2f7fbe"/>` +
    `<g fill="#e8b21c"><rect x="14" y="132" width="26" height="14" rx="2"/><rect x="300" y="128" width="26" height="14" rx="2"/></g>` +
    // テレビと冷蔵庫(手前・左右)
    `<rect x="52" y="152" width="46" height="34" rx="3" fill="#4a5568"/>` +
    `<rect x="58" y="158" width="34" height="22" fill="#8fd0dc"/>` +
    `<rect x="66" y="186" width="18" height="5" fill="#3a3a3e"/>` +
    `<rect x="312" y="146" width="34" height="56" rx="4" fill="#f0ece0"/>` +
    `<rect x="312" y="170" width="34" height="3" fill="#c8c0ac"/>` +
    `<rect x="340" y="156" width="4" height="12" rx="2" fill="#8a8f96"/>` +
    `<rect x="340" y="178" width="4" height="12" rx="2" fill="#8a8f96"/>` +
    // 舗道
    // 陳列台に積んだ箱と、買いに来た人の列
    `<g fill="#b58a5a"><rect x="104" y="176" width="26" height="12" rx="1"/><rect x="104" y="164" width="26" height="12" rx="1"/><rect x="134" y="172" width="24" height="16" rx="1"/></g>` +
    `<g fill="#e8b21c" opacity=".9"><rect x="110" y="168" width="14" height="4"/><rect x="110" y="180" width="14" height="4"/><rect x="140" y="178" width="12" height="4"/></g>` +
    `<g fill="#3f4a52"><rect x="176" y="172" width="8" height="18" rx="3"/><circle cx="180" cy="167" r="4.4"/><rect x="194" y="174" width="8" height="16" rx="3"/><circle cx="198" cy="169" r="4.4"/></g>` +
    `<g fill="#4a5f6a"><rect x="212" y="172" width="8" height="18" rx="3"/><circle cx="216" cy="167" r="4.4"/><rect x="230" y="176" width="8" height="14" rx="3"/><circle cx="234" cy="171" r="4.4"/></g>` +
    `<g fill="#6a5a4a"><rect x="248" y="178" width="18" height="12" rx="2"/><rect x="252" y="172" width="10" height="6" rx="2"/></g>` +
    band(196, 14, "#8f8878") +
    `<g stroke="#787060" stroke-width="2" opacity=".6" fill="none"><path d="M0,202h400M60,196v14M180,196v14M300,196v14"/></g>`,

  /**
   * カンタラ。「橋」という名の渡り。可動橋と車を積む渡し船。
   */
  canalcrossing:
    sky("#8fc0e0", "#efe2c4", 126) +
    sun(340, 36, 17) +
    haze(160, 118, 180, 18) +
    ground(126, "#dcc08e") +
    // 水路
    band(150, 40, "#2f7fa8") +
    `<g stroke="#8fd0dc" stroke-width="2" opacity=".5" fill="none"><path d="M20,164h80M270,172h110"/></g>` +
    band(190, 20, "#d6b980") +
    // 可動橋(左に旋回)
    `<g fill="#a89880"><rect x="30" y="126" width="20" height="30"/><rect x="356" y="126" width="20" height="30"/></g>` +
    `<path d="M40,110h116v10H40z" fill="#7f8896"/>` +
    `<g stroke="#7f8896" stroke-width="2" fill="none"><path d="M44,110l14,-14l14,14M72,110l14,-14l14,14M100,110l14,-14l14,14M128,110l14,-14l14,14"/></g>` +
    `<rect x="36" y="96" width="10" height="30" fill="#c93f34"/>` +
    `<rect x="150" y="96" width="10" height="30" fill="#c93f34"/>` +
    // 渡し船と乗せた車
    `<path d="M262,168h108l-12,14H274z" fill="#5c6a74"/>` +
    `<rect x="278" y="152" width="40" height="16" rx="3" fill="#e8b21c"/>` +
    `<rect x="284" y="146" width="18" height="8" rx="2" fill="#e8b21c"/>` +
    `<g fill="#3a3a3e"><circle cx="288" cy="168" r="4"/><circle cx="310" cy="168" r="4"/></g>` +
    `<rect x="326" y="156" width="32" height="12" rx="2" fill="#3f9f7f"/>` +
    `<g fill="#3a3a3e"><circle cx="334" cy="168" r="3.4"/><circle cx="350" cy="168" r="3.4"/></g>` +
    // 東岸(シナイ側)の記念の柱。10月の渡河を覚える
    `<rect x="378" y="104" width="10" height="22" fill="#e0d5bc"/>` +
    `<path d="M374,104h18l-9,-16z" fill="#c8a020"/>` +
    // 手前の砂と、渡しを待つ列
    windRipples(190) +
    `<g fill="#3f4a52"><rect x="60" y="186" width="7" height="15" rx="3"/><circle cx="63.5" cy="182" r="4"/><rect x="80" y="188" width="7" height="13" rx="3"/><circle cx="83.5" cy="184" r="4"/></g>` +
    `<rect x="100" y="184" width="40" height="16" rx="3" fill="#c93f34"/>` +
    `<g fill="#3a3a3e"><circle cx="110" cy="200" r="5"/><circle cx="132" cy="200" r="5"/></g>` +
    scrub(200, 200, 8) +
    palm(24, 196, 42),

  /**
   * アレクサンドリア。海に沿って走るアフリカ最古の路面電車と、
   * 沈みつつある海岸。左に二階建て電車、右に防波堤。
   */
  cornicheport:
    sky("#9fc8e4", "#dfe6dc", 122) +
    cirrus(150, 20, 110) +
    egret(70, 34, 1.1) +
    egret(300, 30, 1) +
    egret(330, 46, 0.8) +
    ground(122, "#2f8fb8") +
    // 海
    band(122, 42, "#2f8fb8") +
    `<g stroke="#9fd8e0" stroke-width="2" opacity=".55" fill="none"><path d="M0,132h130M180,142h150M250,154h140M20,152h90"/></g>` +
    // 防波堤(右)と波しぶき
    `<path d="M280,164h120v10H280z" fill="#a89e8c"/>` +
    `<g fill="#8f8878"><rect x="286" y="154" width="16" height="12" rx="3"/><rect x="308" y="150" width="18" height="16" rx="3"/><rect x="334" y="154" width="16" height="12" rx="3"/><rect x="358" y="148" width="18" height="18" rx="3"/><rect x="382" y="154" width="16" height="12" rx="3"/></g>` +
    `<g fill="#f0f6f6" opacity=".75"><ellipse cx="300" cy="146" rx="16" ry="9"/><ellipse cx="316" cy="138" rx="12" ry="8"/><ellipse cx="364" cy="142" rx="14" ry="8"/></g>` +
    // 海岸通りの欄干と道路
    band(164, 7, "#cfc7b4") +
    `<g fill="#cfc7b4"><rect x="0" y="158" width="400" height="4"/><rect x="14" y="150" width="5" height="10"/><rect x="54" y="150" width="5" height="10"/><rect x="94" y="150" width="5" height="10"/><rect x="134" y="150" width="5" height="10"/><rect x="174" y="150" width="5" height="10"/><rect x="214" y="150" width="5" height="10"/></g>` +
    band(171, 39, "#7f7a70") +
    `<g stroke="#f0e8d4" stroke-width="3" stroke-dasharray="18 16" opacity=".55" fill="none"><path d="M0,204h400"/></g>` +
    railTrack(190, 0, 400, "#6a6458", "#c8c2b4") +
    // 二階建ての路面電車(左)
    `<rect x="18" y="132" width="120" height="52" rx="6" fill="#2f6fb0"/>` +
    `<rect x="18" y="156" width="120" height="6" fill="#f4efe2"/>` +
    `<g fill="#cfe4f0"><rect x="26" y="138" width="20" height="14"/><rect x="52" y="138" width="20" height="14"/><rect x="78" y="138" width="20" height="14"/><rect x="104" y="138" width="20" height="14"/><rect x="26" y="164" width="20" height="14"/><rect x="52" y="164" width="20" height="14"/><rect x="78" y="164" width="20" height="14"/><rect x="104" y="164" width="20" height="14"/></g>` +
    `<g fill="#3a3a3e"><circle cx="42" cy="186" r="6"/><circle cx="114" cy="186" r="6"/></g>` +
    `<path d="M78,132V108h60" fill="none" stroke="#4a4a52" stroke-width="2"/>` +
    `<path d="M0,106h400" stroke="#4a4a52" stroke-width="1.4" fill="none"/>` +
    // 沈んだ旧市街を示す、水中の柱の頭
    `<g fill="#7f8f88" opacity=".55"><rect x="204" y="150" width="7" height="14"/><rect x="222" y="154" width="7" height="10"/><rect x="240" y="148" width="7" height="16"/></g>`,

  /**
   * 西の地中海岸。エル・ダバア・マルサ・マトルーフ・エル・アラメイン。
   * 道と線路が一本ずつ通るだけ。**建物は少なく、空きを大きく取る。**
   */
  desertcoast:
    sky("#8fc0e0", "#efe6cc", 116) +
    sun(66, 34, 19) +
    cirrus(240, 22, 88) +
    ground(116, "#e6cfa0") +
    // 海(奥)
    band(116, 34, "#2f8fb8") +
    `<path d="M0,150q60,-10 120,-2q70,10 140,-2q70,-8 140,2v10H0z" fill="#7fd0dc"/>` +
    `<g stroke="#c8ecf0" stroke-width="2" opacity=".6" fill="none"><path d="M20,132h90M200,138h120M60,146h70"/></g>` +
    // 白い砂浜
    band(160, 14, "#f2e6c8") +
    ground(174, "#e0c48f") +
    // 一本の海岸道路と、その脇の線路
    band(178, 12, "#8f8878") +
    `<g stroke="#f0e8d4" stroke-width="3" stroke-dasharray="20 18" opacity=".6" fill="none"><path d="M0,184h400"/></g>` +
    railTrack(200, 0, 400) +
    // 左: 漁師小屋と舟(ごく小さく)
    `<rect x="20" y="140" width="34" height="18" fill="#e8dfc8"/>` +
    `<path d="M16,140h42l-8,-10H24z" fill="#8a6a46"/>` +
    `<path d="M64,152h40l-6,7H70z" fill="#2f6a8a"/>` +
    // 右: 低い岬と灯標
    `<path d="M300,160q40,-16 100,-8v8z" fill="#cfb384"/>` +
    `<rect x="352" y="126" width="6" height="28" fill="#f4efe2"/>` +
    `<rect x="352" y="134" width="6" height="5" fill="#c93f34"/>` +
    `<circle cx="355" cy="122" r="3.4" fill="#f7d98a"/>` +
    // 空きを持たせたまま、砂の表情だけ足す
    dune(150, 176, 180, 12, "#d6b980") +
    windRipples(190, "#cfae7c") +
    scrub(36, 176, 7) +
    scrub(268, 174, 6) +
    scrub(372, 178, 7),

  /**
   * 石灰岩の丘とセメント。ベニ・スエフ。
   * 段になった採石場、キルンとサイロ、粉塵。下に運河。
   */
  quarrytown:
    sky("#b0bcbc", "#e0d6bc", 138) +
    haze(180, 74, 200, 30, "#d8cfbc") +
    smoke(300, 74, 0.9, "#ddd6c6") +
    ground(138, "#c0a274") +
    // 採石場の段(左)
    `<path d="M0,138V96h74v10H0z" fill="#cbab78"/>` +
    `<path d="M0,110h96v12H0z" fill="#c0a06e"/>` +
    `<path d="M0,124h120v14H0z" fill="#b59463"/>` +
    strata(96, 40, 0, 130) +
    `<g fill="#8f7148"><rect x="18" y="112" width="12" height="10"/><rect x="52" y="126" width="14" height="12"/><rect x="86" y="126" width="10" height="12"/></g>` +
    // 崖の上の縁
    `<path d="M0,96h96l14,-10h60l16,10h214v-8H0z" fill="#d8bd8e"/>` +
    // セメント工場(右)
    `<g fill="#cfc7b4"><rect x="300" y="82" width="22" height="56" rx="4"/><rect x="326" y="90" width="20" height="48" rx="4"/><rect x="350" y="86" width="22" height="52" rx="4"/></g>` +
    `<g fill="#b0a894"><rect x="298" y="78" width="26" height="6"/><rect x="324" y="86" width="24" height="6"/><rect x="348" y="82" width="26" height="6"/></g>` +
    `<path d="M250,132l58,-20l5,14l-58,20z" fill="#8a8f96"/>` +
    `<g stroke="#6b7280" stroke-width="1.6" fill="none"><path d="M262,128l4,12M282,121l4,12M300,115l4,12"/></g>` +
    chimney(376, 138, 62, 11) +
    // 運河(手前)
    band(160, 22, "#4f92ae") +
    `<g stroke="#9fd8e0" stroke-width="2" opacity=".5" fill="none"><path d="M30,170h80M260,174h110"/></g>` +
    band(182, 28, "#a89880") +
    // ダンプと石の山
    `<rect x="60" y="182" width="52" height="18" rx="2" fill="#e8b21c"/>` +
    `<path d="M60,182q26,-14 52,0z" fill="#bfb298"/>` +
    `<g fill="#3a3a3e"><circle cx="72" cy="202" r="7"/><circle cx="102" cy="202" r="7"/></g>` +
    `<g fill="#c8b494"><ellipse cx="330" cy="200" rx="46" ry="14"/><ellipse cx="288" cy="204" rx="28" ry="9"/></g>` +
    `<g fill="#b8a480" opacity=".7"><circle cx="318" cy="194" r="4"/><circle cx="342" cy="197" r="3.4"/><circle cx="296" cy="200" r="3"/></g>` +
    palm(196, 160, 40),

  /**
   * ファイユームの窪地。川ではなく運河が養う土地。
   * 右手に塩気を増して縮む湖、左に水車と耕地。
   */
  oasisfields:
    sky("#9fc8e4", "#e6e6c8", 124) +
    cirrus(120, 22, 80) +
    egret(280, 40, 1) +
    ridge(112, 5, "#c4b48e", 124, 9) +
    ground(124, "#8fae5a") +
    // 右: 縮んでいく湖と塩の縁
    `<path d="M250,150q50,-16 150,-10v70H250z" fill="#5f9fb8"/>` +
    `<path d="M250,150q50,-16 150,-10v6q-100,-4 -150,12z" fill="#efe8d8"/>` +
    `<g stroke="#a8dce4" stroke-width="2" opacity=".55" fill="none"><path d="M290,170h70M320,186h70"/></g>` +
    `<path d="M262,178h58l-8,8h-42z" fill="#2f6a8a"/>` +
    `<rect x="284" y="164" width="3" height="14" fill="#6b5330"/>` +
    `<path d="M287,164l12,14h-12z" fill="#f4efe2"/>` +
    // 左: サキーヤ(水車)
    `<circle cx="70" cy="150" r="34" fill="none" stroke="#8a6a46" stroke-width="5"/>` +
    `<g stroke="#8a6a46" stroke-width="2.6" fill="none"><path d="M70,116v68M36,150h68M46,126l48,48M94,126l-48,48"/></g>` +
    `<g fill="#b58a5a"><rect x="62" y="112" width="16" height="8"/><rect x="96" y="142" width="8" height="16"/><rect x="62" y="180" width="16" height="8"/><rect x="36" y="142" width="8" height="16"/></g>` +
    `<circle cx="70" cy="150" r="5" fill="#5d4a34"/>` +
    `<rect x="0" y="176" width="140" height="14" fill="#4f92ae"/>` +
    `<g stroke="#9fd8e0" stroke-width="2" opacity=".5" fill="none"><path d="M10,183h60"/></g>` +
    // 耕地と椰子
    fieldRows(0, 136, 240, 3, 8, "#5f9f43", 4) +
    band(190, 20, "#79b354") +
    fieldRows(0, 196, 250, 2, 8, "#4a8438", 4) +
    palm(150, 176, 54) +
    palm(184, 182, 44) +
    palm(226, 174, 60) +
    // 軽便鉄道の名残
    railTrack(168, 140, 120, "#8a6a4a", "#7a7a80") +
    `<rect x="188" y="152" width="34" height="14" rx="2" fill="#7a5a44"/>` +
    `<g fill="#3a3a3e"><circle cx="196" cy="167" r="3.4"/><circle cx="214" cy="167" r="3.4"/></g>`,

  /**
   * アシュートの堰。川幅いっぱいに並ぶ水門と、その先の水路。
   * 背に石灰岩の丘。
   */
  nilebarrage:
    sky("#9fc8e4", "#e6dcbc", 126) +
    haze(200, 108, 200, 20) +
    cirrus(50, 22, 76) +
    `<path d="M0,126V88l60,-14l70,10l60,-16l90,14l60,-8l60,12v40z" fill="#cbab78"/>` +
    strata(90, 34) +
    ground(126, "#3f7f9f") +
    // 上流側の水面
    band(126, 22, "#4f92ae") +
    `<g stroke="#9fd8e0" stroke-width="2" opacity=".5" fill="none"><path d="M20,134h80M280,138h100"/></g>` +
    // 堰の本体。水門が横一列に並ぶ
    `<rect x="0" y="148" width="400" height="10" fill="#cfc2a4"/>` +
    `<rect x="0" y="142" width="400" height="7" fill="#bfb298"/>` +
    `<g fill="#a89880"><rect x="0" y="158" width="14" height="26"/><rect x="34" y="158" width="14" height="26"/><rect x="68" y="158" width="14" height="26"/><rect x="102" y="158" width="14" height="26"/><rect x="284" y="158" width="14" height="26"/><rect x="318" y="158" width="14" height="26"/><rect x="352" y="158" width="14" height="26"/><rect x="386" y="158" width="14" height="26"/></g>` +
    `<g fill="#5d4a34"><rect x="14" y="158" width="20" height="18"/><rect x="48" y="158" width="20" height="18"/><rect x="82" y="158" width="20" height="18"/><rect x="298" y="158" width="20" height="18"/><rect x="332" y="158" width="20" height="18"/><rect x="366" y="158" width="20" height="18"/></g>` +
    `<g stroke="#8a8f96" stroke-width="2" fill="none"><path d="M24,148v-10M58,148v-10M92,148v-10M308,148v-10M342,148v-10M376,148v-10"/></g>` +
    // 落ちる水
    band(184, 26, "#3f7f9f") +
    `<g fill="#dff0f4" opacity=".7"><rect x="16" y="176" width="18" height="14"/><rect x="50" y="176" width="18" height="14"/><rect x="84" y="176" width="18" height="14"/><rect x="300" y="176" width="18" height="14"/><rect x="334" y="176" width="18" height="14"/><rect x="368" y="176" width="18" height="14"/></g>` +
    `<g fill="#f0f8fa" opacity=".55"><ellipse cx="25" cy="192" rx="14" ry="6"/><ellipse cx="93" cy="192" rx="14" ry="6"/><ellipse cx="343" cy="192" rx="14" ry="6"/></g>` +
    // 操作所(左)と鳩
    `<rect x="16" y="112" width="44" height="30" fill="#e4dcc4"/>` +
    `<path d="M12,112h52l-8,-12H20z" fill="#b8613c"/>` +
    `<g fill="#5c6a74"><rect x="24" y="120" width="11" height="13"/><rect x="42" y="120" width="11" height="13"/></g>` +
    egret(120, 108, 0.9) +
    palm(360, 126, 44) +
    palm(388, 126, 34),

  /**
   * ルクソール西岸。石灰岩の丘の裾に、代わりに建てられた新しい家並み。
   * 古代の建物は描かない。渡し場と緑の縁だけ。
   */
  westbank:
    sky("#9fc8e4", "#eee0bc", 130) +
    sun(320, 36, 18) +
    haze(120, 116, 170, 20) +
    `<path d="M0,130V78l52,-20l46,22l54,-30l60,26l58,-16l70,22l60,-10v58z" fill="#d0ae7a"/>` +
    `<path d="M0,130V104l60,-14l60,16l70,-12l80,16l70,-10l60,12v18z" fill="#c09a66"/>` +
    strata(84, 40, 0, 400, "#9c7c4e") +
    ground(130, "#c9ab7c") +
    // 新しい集落。同じ形の家が格子に並ぶ
    `<g fill="#ece2cc"><rect x="10" y="140" width="34" height="24"/><rect x="50" y="140" width="34" height="24"/><rect x="90" y="140" width="34" height="24"/><rect x="286" y="140" width="34" height="24"/><rect x="326" y="140" width="34" height="24"/><rect x="366" y="140" width="30" height="24"/></g>` +
    `<g fill="#c8b494"><rect x="8" y="136" width="38" height="5"/><rect x="48" y="136" width="38" height="5"/><rect x="88" y="136" width="38" height="5"/><rect x="284" y="136" width="38" height="5"/><rect x="324" y="136" width="38" height="5"/><rect x="364" y="136" width="34" height="5"/></g>` +
    `<g fill="#6b5c46"><rect x="22" y="152" width="10" height="12"/><rect x="62" y="152" width="10" height="12"/><rect x="102" y="152" width="10" height="12"/><rect x="298" y="152" width="10" height="12"/><rect x="338" y="152" width="10" height="12"/><rect x="376" y="152" width="10" height="12"/></g>` +
    `<g fill="#3a3a3e"><rect x="14" y="130" width="7" height="6" rx="2"/><rect x="54" y="130" width="7" height="6" rx="2"/><rect x="330" y="130" width="7" height="6" rx="2"/></g>` +
    band(164, 6, "#a89880") +
    // 緑の縁(ナイルの届く所だけ)
    band(170, 14, "#79b354") +
    fieldRows(0, 174, 400, 2, 7, "#4a8438", 4) +
    palm(30, 172, 50) +
    palm(70, 168, 40) +
    palm(340, 170, 46) +
    palm(376, 166, 36) +
    // 渡し場
    band(184, 26, "#3f7f9f") +
    ripples(190) +
    `<rect x="120" y="180" width="70" height="6" fill="#8a6a46"/>` +
    `<g fill="#8a6a46"><rect x="124" y="186" width="4" height="14"/><rect x="182" y="186" width="4" height="14"/></g>` +
    `<path d="M210,192h74l-10,12h-56z" fill="#2f6a8a"/>` +
    `<rect x="226" y="182" width="42" height="10" fill="#f4efe2"/>`,

  /**
   * コム・オンボの移住村。ダムに沈んだ故郷の色を塗り継いだ家が、
   * 見慣れない格子の道に並ぶ。
   */
  nubianvillage:
    sky("#9fc8e4", "#eee0bc", 132) +
    sun(60, 36, 17) +
    ridge(118, 5, "#d0b384", 132, 3) +
    ground(132, "#d6b980") +
    // 家並み(左右)
    nubianHouse(6, 176, 62, 44, "#2f7fbe", "#f0b429") +
    nubianHouse(74, 172, 54, 38, "#3f9f7f", "#f4efe2") +
    nubianHouse(276, 174, 58, 42, "#e8b21c", "#d1503c") +
    nubianHouse(340, 178, 56, 40, "#d1503c", "#2f7fbe") +
    // 奥の列(小さく)
    `<g fill="#7fa8cc"><rect x="130" y="118" width="26" height="14"/><rect x="164" y="118" width="26" height="14"/><rect x="240" y="118" width="26" height="14"/></g>` +
    `<g fill="#e8c46a"><path d="M130,118a13,10 0 0 1 26,0z"/><path d="M164,118a13,10 0 0 1 26,0z"/><path d="M240,118a13,10 0 0 1 26,0z"/></g>` +
    // 格子の道
    band(176, 10, "#c9a97c") +
    band(186, 24, "#d6b980") +
    `<g stroke="#c09a66" stroke-width="2" opacity=".7" fill="none"><path d="M0,186h400M60,176v34M200,176v34M330,176v34"/></g>` +
    // 手前の椰子と土器の水甕
    palm(160, 200, 56) +
    palm(214, 204, 46) +
    `<path d="M114,206v-8a8,9 0 0 1 16,0v8z" fill="#c98a5a"/>` +
    `<rect x="118" y="188" width="8" height="4" rx="2" fill="#b07a4a"/>` +
    `<path d="M244,206v-7a7,8 0 0 1 14,0v7z" fill="#b07a4a"/>` +
    // 塗り分けの見本になる小さな壁(手前・右)
    `<rect x="356" y="192" width="44" height="18" fill="#f4efe2"/>` +
    `<path d="M356,196l7.3,-6l7.3,6l7.4,-6l7.3,6l7.3,-6l7.4,6z" fill="#2f7fbe"/>` +
    `<g fill="#d1503c"><circle cx="366" cy="204" r="3.4"/><circle cx="382" cy="204" r="3.4"/></g>`,

  /**
   * アスワン。花崗岩の巨石が転がる川岸と、色を塗った家、
   * 遠くに送電鉄塔。ダムの電気が北へ流れていく。
   */
  nubianshore:
    sky("#9fc8e4", "#eee0bc", 122) +
    sun(340, 34, 18) +
    ridge(108, 6, "#e0c48f", 122, 5) +
    ground(122, "#dcc08e") +
    // 岸の家と椰子
    nubianHouse(10, 152, 56, 40, "#2f7fbe", "#f0b429") +
    nubianHouse(74, 156, 46, 34, "#f0b429", "#d1503c") +
    palm(132, 158, 54) +
    palm(292, 154, 48) +
    nubianHouse(320, 154, 54, 38, "#3f9f7f", "#f4efe2") +
    // 送電鉄塔(遠く)
    pylon(212, 122, 54) +
    pylon(258, 122, 42) +
    `<g stroke="#8a8f96" stroke-width="1" opacity=".7" fill="none"><path d="M198,88L246,98M226,88L272,102"/></g>` +
    // 川
    band(158, 52, "#3f7f9f") +
    `<rect x="0" y="152" width="400" height="8" fill="#c8a97c"/>` +
    ripples(168) +
    // 花崗岩の巨石(手前・左右)
    `<g fill="#8f7a72"><ellipse cx="34" cy="188" rx="34" ry="22"/><ellipse cx="76" cy="198" rx="24" ry="14"/><ellipse cx="366" cy="184" rx="30" ry="20"/><ellipse cx="330" cy="198" rx="20" ry="12"/></g>` +
    `<g fill="#a89288" opacity=".8"><ellipse cx="26" cy="180" rx="16" ry="9"/><ellipse cx="360" cy="176" rx="13" ry="7"/></g>` +
    felucca(180, 194, 0.8) +
    felucca(258, 204, 0.6) +
    egret(110, 140, 1),

  /**
   * ダラウの家畜市。四十日の道の終点。
   * 囲いとラクダ、脇を通る線路。**砂漠側なので空きを大きく取る。**
   */
  desertmarket:
    sky("#8fc0e0", "#efe2c4", 128) +
    sun(70, 36, 19) +
    haze(240, 118, 190, 20) +
    ground(128, "#e0c48f") +
    dune(300, 140, 210, 26, "#d6b980") +
    windRipples(140, "#cfae7c") +
    // 日よけと囲い
    `<path d="M6,146h130l-8,-14H14z" fill="#c9b98a"/>` +
    `<g fill="#8a6a46"><rect x="10" y="146" width="5" height="30"/><rect x="128" y="146" width="5" height="30"/></g>` +
    `<g stroke="#8a6a46" stroke-width="2.6" fill="none"><path d="M0,168h400M0,180h400"/></g>` +
    `<g fill="#8a6a46"><rect x="40" y="160" width="4" height="28"/><rect x="150" y="160" width="4" height="28"/><rect x="270" y="160" width="4" height="28"/><rect x="380" y="160" width="4" height="28"/></g>` +
    // ラクダ(左右)
    `<g fill="#b58a5a"><rect x="34" y="180" width="4" height="18"/><rect x="46" y="180" width="4" height="18"/><rect x="66" y="180" width="4" height="18"/><rect x="78" y="180" width="4" height="18"/></g>` +
    `<ellipse cx="58" cy="176" rx="26" ry="13" fill="#b58a5a"/>` +
    `<path d="M42,170q16,-22 32,0z" fill="#b58a5a"/>` +
    `<path d="M80,180q10,-8 8,-28l9,1q2,24 -8,31z" fill="#b58a5a"/>` +
    `<ellipse cx="92" cy="150" rx="9" ry="6" fill="#b58a5a"/>` +
    `<circle cx="95" cy="148" r="1.8" fill="#3a2a1a"/>` +
    `<g fill="#a8794a"><rect x="316" y="182" width="4" height="16"/><rect x="326" y="182" width="4" height="16"/><rect x="342" y="182" width="4" height="16"/><rect x="352" y="182" width="4" height="16"/></g>` +
    `<ellipse cx="336" cy="178" rx="22" ry="11" fill="#a8794a"/>` +
    `<path d="M322,173q14,-18 28,0z" fill="#a8794a"/>` +
    `<path d="M354,182q9,-7 7,-24l8,1q2,20 -7,27z" fill="#a8794a"/>` +
    `<ellipse cx="364" cy="158" rx="8" ry="5" fill="#a8794a"/>` +
    // 線路(市の脇をただ通り過ぎる)
    railTrack(200, 0, 400) +
    scrub(200, 196, 8) +
    scrub(126, 200, 7) +
    palm(16, 200, 40),
};

export const EGYPT_BG = { ...EGYPT_BASE_BG };

// ---------------------------------------------------------------------------
// 都市シンボル(39種)。鍵は cities.mjs の `mark` と対応。24×24の座標系。
//
// 盤面では直径19pxほどの点にしかならない。**主役を1つに絞り、輪郭で見分ける。**
// ---------------------------------------------------------------------------

export const EGYPT_MARKS = {
  /** アーチ屋根の駅と、扇に開く線路。カイロ専用。 */
  railhub:
    `<path d="M2,20V12a10,8.5 0 0 1 20,0v8z" fill="#cfc4ac"/>` +
    `<path d="M4.5,20V12.6a7.5,6.4 0 0 1 15,0V20z" fill="#48545f"/>` +
    `<rect x="8.5" y="11" width="7" height="9" rx="1.4" fill="#c93f34"/>` +
    `<rect x="9.6" y="13" width="4.8" height="3.4" fill="#cfe4f0"/>` +
    `<rect x="1" y="20" width="22" height="1.8" fill="#8a6a4a"/>` +
    `<path d="M5,24l3,-2.2M12,24v-2.2M19,24l-3,-2.2" stroke="#5a5a60" stroke-width="1.3" fill="none"/>`,

  /** ドームの講堂と列柱。ギザ専用。 */
  campus:
    `<rect x="3" y="13" width="18" height="8" fill="#e4dcc4"/>` +
    `<path d="M5,13a7,6 0 0 1 14,0z" fill="#b8613c"/>` +
    `<rect x="11.2" y="3" width="1.6" height="4" fill="#c8a020"/>` +
    `<g fill="#cfc2a4"><rect x="4.5" y="14" width="2.4" height="7"/><rect x="9" y="14" width="2.4" height="7"/><rect x="13.5" y="14" width="2.4" height="7"/><rect x="18" y="14" width="2.4" height="7"/></g>` +
    `<rect x="2" y="21" width="20" height="2" fill="#b6a684"/>`,

  /** 圧延機。赤熱した鋼がロールのあいだを通る。ヘルワン専用。 */
  steelworks:
    `<rect x="1" y="10.6" width="22" height="3.4" rx="1.4" fill="#f5842a"/>` +
    `<rect x="1" y="9.6" width="22" height="5.4" fill="#ffd76a" opacity=".35"/>` +
    `<circle cx="8.5" cy="6.6" r="4.6" fill="#7f8896"/>` +
    `<circle cx="8.5" cy="17.8" r="4.6" fill="#7f8896"/>` +
    `<circle cx="8.5" cy="6.6" r="1.6" fill="#4a5058"/>` +
    `<circle cx="8.5" cy="17.8" r="1.6" fill="#4a5058"/>` +
    `<rect x="2" y="22" width="20" height="2" fill="#4a4a52"/>`,

  /** 積み上がった集合住宅と衛星アンテナ。シュブラ・エル=ヘイマ専用。 */
  tenement:
    `<rect x="2" y="8" width="8.5" height="14" fill="#b0694a"/>` +
    `<rect x="11.5" y="4" width="9" height="18" fill="#a15a3e"/>` +
    `<g fill="#33291f" opacity=".75"><rect x="3.5" y="10" width="2.4" height="3"/><rect x="7" y="10" width="2.4" height="3"/><rect x="3.5" y="15" width="2.4" height="3"/><rect x="7" y="15" width="2.4" height="3"/><rect x="13" y="6.5" width="2.4" height="3"/><rect x="16.6" y="6.5" width="2.4" height="3"/><rect x="13" y="11.5" width="2.4" height="3"/><rect x="16.6" y="11.5" width="2.4" height="3"/><rect x="13" y="16.5" width="2.4" height="3"/><rect x="16.6" y="16.5" width="2.4" height="3"/></g>` +
    `<path d="M3,8a2.6,2.6 0 0 1 5.2,0zM13,4a2.6,2.6 0 0 1 5.2,0z" fill="#e2ddd0"/>` +
    `<path d="M10.5,9l1,-3" stroke="#8a8478" stroke-width="1" fill="none"/>` +
    `<rect x="1" y="22" width="22" height="2" fill="#7a7264"/>`,

  /** モノレールの桁と車両、ガラスの塔。新行政首都専用。 */
  newcapital:
    `<path d="M15,22V6l6.5,-3.4V22z" fill="#8fb8cc"/>` +
    `<g fill="#cfe4f0" opacity=".55"><rect x="16.6" y="8" width="3.4" height="2"/><rect x="16.6" y="12" width="3.4" height="2"/></g>` +
    `<rect x="0" y="14" width="24" height="2.6" fill="#cfc7b4"/>` +
    `<rect x="5" y="16.6" width="3" height="5.4" fill="#cfc7b4"/>` +
    `<rect x="0.6" y="6.6" width="13.6" height="7.4" rx="3.6" fill="#f4efe2"/>` +
    `<rect x="0.6" y="11.6" width="13.6" height="2.4" fill="#2f7fbe"/>` +
    `<rect x="2.4" y="8.2" width="10.6" height="3" rx="1.2" fill="#3f5a6a"/>` +
    `<path d="M0.6,10.2a3.6,3.6 0 0 1 2,-3.2v3.2z" fill="#c8c0b0"/>` +
    `<rect x="0" y="22" width="24" height="2" fill="#dcc08e"/>`,

  /** 聖者祭の天幕と旗。タンタ専用。 */
  festival:
    `<path d="M12,3L1,19h22z" fill="#e8dfc8"/>` +
    `<path d="M12,3l-3.6,16h3.6zM12,3l3.6,16h-3.6z" fill="#c93f34"/>` +
    `<path d="M6.5,10L2.6,19h2.4zM17.5,10l3.9,9h-2.4z" fill="#3f8f6a"/>` +
    `<path d="M10,19v-4a2,2 0 0 1 4,0v4z" fill="#5d4a34"/>` +
    `<rect x="1" y="19" width="22" height="2" fill="#b6a684"/>` +
    `<rect x="11.4" y="0" width="1.2" height="4" fill="#8a8f96"/>` +
    `<path d="M12.6,0.4a2.6,2.6 0 1 0 0,3.4a2,2 0 1 1 0,-3.4z" fill="#3f8f6a"/>`,

  /** 胸壁のある方形の塔。マンスーラ専用。 */
  fortress:
    `<rect x="4.5" y="8" width="15" height="14" fill="#c4a97e"/>` +
    `<g fill="#b59463"><rect x="4.5" y="5" width="3.4" height="3"/><rect x="10.3" y="5" width="3.4" height="3"/><rect x="16.1" y="5" width="3.4" height="3"/></g>` +
    `<path d="M9.6,22v-5.4a2.4,2.4 0 0 1 4.8,0V22z" fill="#5d4a34"/>` +
    `<rect x="7" y="10" width="1.8" height="4.4" fill="#5d4a34"/>` +
    `<rect x="15.4" y="10" width="1.8" height="4.4" fill="#5d4a34"/>` +
    `<rect x="2.5" y="22" width="19" height="2" fill="#a89880"/>`,

  /** 台座の上の立像。ザガジグ専用。 */
  monument:
    `<rect x="7.5" y="16" width="9" height="6" fill="#c4bca4"/>` +
    `<rect x="5.5" y="22" width="13" height="2" fill="#a89c82"/>` +
    `<path d="M9.4,16l1.1,-7.4a1.7,1.7 0 0 1 3,0L14.6,16z" fill="#7f6a3a"/>` +
    `<circle cx="12" cy="5.4" r="2.6" fill="#7f6a3a"/>` +
    `<path d="M13.6,10.4L18,6" stroke="#7f6a3a" stroke-width="2" stroke-linecap="round" fill="none"/>` +
    `<rect x="9" y="18" width="6" height="1.6" fill="#a89c82"/>`,

  /** 鋸屋根の工場と煙突。ダマンフール・カフル・エル=ダッワール。 */
  factory:
    `<rect x="1.5" y="13" width="14" height="9" fill="#b8b0a0"/>` +
    `<path d="M1.5,13V9.6l4.6,2.4zM6.1,13V9.6l4.6,2.4zM10.7,13V9.6l4.8,2.4z" fill="#8a8f96"/>` +
    `<g fill="#41474e" opacity=".8"><rect x="3.4" y="15.5" width="3" height="4"/><rect x="8" y="15.5" width="3" height="4"/><rect x="12.6" y="15.5" width="2.4" height="4"/></g>` +
    `<rect x="17" y="4" width="3.6" height="18" fill="#c9c0b0"/>` +
    `<rect x="17" y="4" width="3.6" height="2.2" fill="#a8412f"/>` +
    `<path d="M18.8,3c0,-2 3.2,-2 3.2,-3" fill="none" stroke="#d0cabe" stroke-width="1.6"/>` +
    `<rect x="0" y="22" width="24" height="2" fill="#8f8878"/>`,

  /** 糸を巻いたボビン。エル・マハッラ・エル・クブラ専用。 */
  textilemill:
    `<rect x="9" y="4" width="6" height="16" fill="#e8dfc8"/>` +
    `<rect x="7" y="7" width="10" height="10" fill="#2f7fbe"/>` +
    `<g stroke="#5aa0d8" stroke-width="1" opacity=".8" fill="none"><path d="M7,9h10M7,12h10M7,15h10"/></g>` +
    `<rect x="5.5" y="2.6" width="13" height="3" rx="1" fill="#8a6a46"/>` +
    `<rect x="5.5" y="19" width="13" height="3" rx="1" fill="#8a6a46"/>` +
    `<path d="M17,12q6,-2 5,-9" fill="none" stroke="#2f7fbe" stroke-width="1.4" stroke-linecap="round"/>`,

  /** 象嵌の椅子。ダミエッタ専用。 */
  carpentry:
    `<rect x="6" y="2.6" width="12" height="9.4" rx="1.4" fill="#8a5a34"/>` +
    `<g fill="#f0e6cc"><path d="M9.4,5.6l1.6,1.8l-1.6,1.8L7.8,7.4z"/><path d="M14.6,5.6l1.6,1.8l-1.6,1.8L13,7.4z"/></g>` +
    `<rect x="6" y="10.4" width="12" height="1.6" fill="#6f4626"/>` +
    `<rect x="3.4" y="13" width="17.2" height="3" rx="1" fill="#a06c40"/>` +
    `<rect x="4.6" y="16" width="2.8" height="7" fill="#8a5a34"/>` +
    `<rect x="16.6" y="16" width="2.8" height="7" fill="#8a5a34"/>` +
    `<rect x="6.6" y="12" width="2.2" height="1.4" fill="#6f4626"/>` +
    `<rect x="15.2" y="12" width="2.2" height="1.4" fill="#6f4626"/>` +
    `<rect x="2.6" y="23" width="18.8" height="1" fill="#a89880"/>`,

  /** 水を張った田と苗。カフル・エル=シェイフ専用。 */
  paddyfield:
    `<rect x="1.5" y="11" width="21" height="9.4" fill="#7fb0c4"/>` +
    `<g stroke="#cfe8ee" stroke-width="1" opacity=".8" fill="none"><path d="M3,14h7M13,17h8"/></g>` +
    `<g stroke="#4a8438" stroke-width="1.5" stroke-linecap="round" fill="none"><path d="M4,20V13M4,20l-2.4,-4M4,20l2.4,-4M10,20v-8M10,20l-2.4,-4.4M10,20l2.4,-4.4M16,20v-7M16,20l-2.4,-4M16,20l2.4,-4M21,20v-7"/></g>` +
    `<rect x="1.5" y="20.4" width="21" height="2.4" fill="#8a6a46"/>` +
    `<rect x="0" y="8.6" width="24" height="2.4" fill="#8a6a46"/>`,

  /** 貯蓄銀行の帳簿と硬貨。ミト・ガムル専用。 */
  bank:
    `<rect x="3" y="6.4" width="15" height="12" rx="1.4" fill="#2f6a58"/>` +
    `<rect x="3" y="6.4" width="3.4" height="12" fill="#245244"/>` +
    `<g fill="#f0e6cc"><rect x="8" y="9" width="8" height="1.5"/><rect x="8" y="12" width="8" height="1.5"/><rect x="8" y="15" width="5" height="1.5"/></g>` +
    `<circle cx="17.4" cy="17.4" r="5" fill="#e8b21c"/>` +
    `<circle cx="17.4" cy="17.4" r="2.8" fill="none" stroke="#b8860c" stroke-width="1.2"/>` +
    `<rect x="1.5" y="21.6" width="21" height="2" fill="#a89880"/>`,

  /**
   * 三種の文字が刻まれた石板。ロゼッタ専用。
   * **割れた角が輪郭の目印**なので、上辺を大きく斜めに欠けさせている。
   */
  stone:
    `<path d="M4.6,21.4V11L12.6,2.6l7,2.2l-0.6,4.4l1.4,1.4V21.4z" fill="#55605c"/>` +
    `<path d="M4.6,11L12.6,2.6l1,4.4L6.6,11z" fill="#3d4744"/>` +
    `<path d="M19,4.8l0.6,4.4l-3.4,-2z" fill="#3d4744"/>` +
    `<g stroke="#e2e6dc" stroke-width="1" opacity=".85" fill="none"><path d="M9,9.6h9M7.4,12h11.4"/></g>` +
    `<g stroke="#e2e6dc" stroke-width="1" opacity=".7" fill="none"><path d="M6.4,14.6h12M6.4,16.6h9.6M6.4,18.6h12"/></g>` +
    `<rect x="2.6" y="21.4" width="19" height="2.6" fill="#bfb298"/>`,

  /** 枝についたマンゴー。バンハー専用。 */
  orchard:
    `<path d="M12.4,8q6,-4.6 9.6,-5.4q0.6,4.6 -6,7.4z" fill="#3f7f3a"/>` +
    `<path d="M12,8.6V12" stroke="#6b5330" stroke-width="1.6" fill="none"/>` +
    `<ellipse cx="10.8" cy="16.6" rx="7.2" ry="6.2" fill="#f0a52a"/>` +
    `<path d="M5.4,13.6a7.2,6.2 0 0 0 -1,4.6q3,-4.4 8.6,-5.6a7.2,6.2 0 0 0 -7.6,1z" fill="#d1503c"/>` +
    `<ellipse cx="8" cy="13.6" rx="2" ry="1.2" fill="#f7d98a" opacity=".8"/>` +
    `<circle cx="19.4" cy="17.6" r="3.4" fill="#e8b21c"/>`,

  /** アーチが並ぶ低い堰。アル・カナーティル・アシュート。 */
  barrage:
    `<rect x="1" y="12" width="22" height="10" fill="#3f7f9f"/>` +
    `<rect x="1" y="8.6" width="22" height="3.6" fill="#cfc2a4"/>` +
    `<rect x="1" y="6" width="22" height="2.8" fill="#bfb298"/>` +
    `<g fill="#a89880"><rect x="1" y="12" width="3" height="8"/><rect x="8" y="12" width="3" height="8"/><rect x="15" y="12" width="3" height="8"/><rect x="20" y="12" width="3" height="8"/></g>` +
    `<g fill="#5d4a34"><rect x="4" y="12.4" width="4" height="5.6"/><rect x="11" y="12.4" width="4" height="5.6"/><rect x="18" y="12.4" width="2" height="5.6"/></g>` +
    `<g fill="#dff0f4" opacity=".8"><rect x="4" y="18" width="4" height="3"/><rect x="11" y="18" width="4" height="3"/></g>` +
    `<rect x="1" y="21" width="22" height="3" fill="#3f7f9f"/>`,

  /** 横に回って開いた可動橋。カフル・エル=ザヤート専用。 */
  bridge:
    `<rect x="0" y="16" width="24" height="8" fill="#3f7f9f"/>` +
    `<g fill="#bfb298"><rect x="0" y="13" width="4.4" height="4"/><rect x="19.6" y="13" width="4.4" height="4"/></g>` +
    `<path d="M2.6,6.4L21.4,12.6l-1,3.2L1.6,9.6z" fill="#c93f34"/>` +
    `<g stroke="#f0e6d2" stroke-width="1" opacity=".9" fill="none"><path d="M4,7.6l3.4,4.4M9,9.2l3.4,4.4M14,10.8l3.4,4.4"/></g>` +
    `<circle cx="12" cy="15.6" r="3.4" fill="#8a8f96"/>` +
    `<circle cx="12" cy="15.6" r="1.4" fill="#5c6a74"/>` +
    `<g stroke="#8fd0dc" stroke-width="1" opacity=".7" fill="none"><path d="M2,20h6M15,21h7"/></g>`,

  /** 掲げた三色の旗。ゼフタ専用。 */
  flag:
    `<rect x="4.6" y="2" width="2.2" height="21" fill="#8a8f96"/>` +
    `<path d="M6.8,3.4h13.4q-3,2.6 0,5.2H6.8z" fill="#c93f34"/>` +
    `<path d="M6.8,8.6h13.4q-3,2.6 0,5.2H6.8z" fill="#f4efe2"/>` +
    `<path d="M6.8,13.8h13.4q-3,2.6 0,5.2H6.8z" fill="#2a2a2a"/>` +
    `<circle cx="5.7" cy="1.8" r="1.8" fill="#c8a020"/>` +
    `<rect x="1.5" y="22.4" width="21" height="1.6" fill="#a89880"/>`,

  /** 砂のあいだの水路を行く船。スエズ専用。 */
  canal:
    `<rect x="0" y="14" width="24" height="10" fill="#dcc08e"/>` +
    `<rect x="0" y="16.4" width="24" height="4" fill="#2f7fa8"/>` +
    `<path d="M2,16.4h18l-2.4,4.4H4.4z" fill="#1f4f7a"/>` +
    `<rect x="2" y="13.4" width="18" height="3" fill="#c93f34"/>` +
    `<g fill="#e8b21c"><rect x="4" y="9.6" width="5" height="3.4"/></g>` +
    `<g fill="#3f9f7f"><rect x="10" y="9.6" width="5" height="3.4"/></g>` +
    `<rect x="16" y="6.4" width="5.4" height="7" fill="#f4efe2"/>` +
    `<rect x="18.4" y="2.6" width="2" height="4" fill="#e8b21c"/>` +
    `<g stroke="#c8a97c" stroke-width="1.2" opacity=".6" fill="none"><path d="M2,22.6q5,-1.6 10,0M14,21.4q4,-1.4 8,0"/></g>`,

  /** 並木とヴェランダの家。イスマイリア専用。 */
  gardencity:
    `<rect x="11" y="11" width="12" height="10" fill="#f0e8d4"/>` +
    `<path d="M9.6,11h14.4l-6,-5.4h-4z" fill="#b8613c"/>` +
    `<g fill="#5c7a8a"><rect x="13" y="13.4" width="3.4" height="4.4"/><rect x="18.4" y="13.4" width="3.4" height="4.4"/></g>` +
    `<rect x="10.4" y="18" width="13.6" height="1.6" fill="#d6cbb0"/>` +
    `<circle cx="6.4" cy="9.6" r="5.6" fill="#3f8f4a"/>` +
    `<circle cx="4" cy="13.4" r="3.4" fill="#4d9a4a"/>` +
    `<rect x="5.6" y="13" width="2" height="8" fill="#6b5330"/>` +
    `<rect x="0" y="21" width="24" height="3" fill="#6ba84a"/>`,

  /** 日よけの下のテレビ。ポートサイド専用。 */
  shop:
    `<path d="M1.6,7.4h20.8v4.2H1.6z" fill="#c93f34"/>` +
    `<g fill="#f4efe2"><rect x="4.6" y="7.4" width="3" height="4.2"/><rect x="10.6" y="7.4" width="3" height="4.2"/><rect x="16.6" y="7.4" width="3" height="4.2"/></g>` +
    `<rect x="3" y="11.6" width="18" height="10.4" fill="#e8dfc8"/>` +
    `<rect x="5.4" y="13.4" width="9.6" height="7.4" rx="1" fill="#4a5568"/>` +
    `<rect x="6.6" y="14.6" width="7.2" height="5" fill="#8fd0dc"/>` +
    `<rect x="8.6" y="20.8" width="3.4" height="1.6" fill="#3a3a3e"/>` +
    `<circle cx="18.4" cy="16.4" r="2.8" fill="#e8b21c"/>` +
    `<rect x="1.6" y="22" width="20.8" height="2" fill="#8f8878"/>`,

  /** 車を積む渡し船。エル・カンタラ専用。 */
  crossing:
    `<rect x="0" y="13.4" width="24" height="10.6" fill="#3f7f9f"/>` +
    `<g fill="#dcc08e"><rect x="0" y="11" width="4.4" height="3.4"/><rect x="19.6" y="11" width="4.4" height="3.4"/></g>` +
    `<path d="M2.6,15h18.8l-2.4,4.6H5z" fill="#5c6a74"/>` +
    `<rect x="6.6" y="9.4" width="10.6" height="5.6" rx="1.4" fill="#e8b21c"/>` +
    `<rect x="8" y="5.6" width="5" height="4" rx="1.2" fill="#e8b21c"/>` +
    `<rect x="8.8" y="6.4" width="3.4" height="2.4" fill="#cfe4f0"/>` +
    `<g fill="#3a3a3e"><circle cx="9" cy="15" r="1.8"/><circle cx="15" cy="15" r="1.8"/></g>` +
    `<g stroke="#8fd0dc" stroke-width="1" opacity=".7" fill="none"><path d="M2,21.6h6M16,22.4h6"/></g>`,

  /** 二階建ての路面電車。アレクサンドリア専用。 */
  tram:
    `<rect x="3" y="6.4" width="18" height="13.6" rx="2.4" fill="#2f6fb0"/>` +
    `<g fill="#cfe4f0"><rect x="4.8" y="8.4" width="4.4" height="3.6"/><rect x="10" y="8.4" width="4.4" height="3.6"/><rect x="15.2" y="8.4" width="4" height="3.6"/><rect x="4.8" y="14.4" width="4.4" height="3.6"/><rect x="10" y="14.4" width="4.4" height="3.6"/><rect x="15.2" y="14.4" width="4" height="3.6"/></g>` +
    `<rect x="3" y="12.4" width="18" height="1.8" fill="#f4efe2"/>` +
    `<g fill="#3a3a3e"><circle cx="8" cy="20.4" r="2.2"/><circle cx="16" cy="20.4" r="2.2"/></g>` +
    `<path d="M12,6.4V2.6h8" fill="none" stroke="#4a4a52" stroke-width="1.2"/>` +
    `<rect x="0" y="22.4" width="24" height="1.6" fill="#6a6458"/>`,

  /** 砂の中で終わる線路と車止め。マルサ・マトルーフ専用。 */
  railhead:
    `<rect x="0" y="16" width="24" height="8" fill="#dcc08e"/>` +
    `<g stroke="#5a5a60" stroke-width="1.8" fill="none"><path d="M2.6,24L9.4,13.6M21.4,24L14.6,13.6"/></g>` +
    `<g fill="#8a6a4a" opacity=".85"><rect x="7.4" y="15" width="9.2" height="1.8"/><rect x="5.6" y="18.4" width="12.8" height="2"/><rect x="3.6" y="21.8" width="16.8" height="2.2"/></g>` +
    `<rect x="6.6" y="8.6" width="10.8" height="3.4" fill="#c93f34"/>` +
    `<g fill="#8a8f96"><rect x="7.4" y="11.6" width="2" height="3.4"/><rect x="14.6" y="11.6" width="2" height="3.4"/></g>` +
    `<path d="M9,8.6V6h6v2.6z" fill="#e8b21c"/>` +
    `<g stroke="#c8a97c" stroke-width="1" opacity=".6" fill="none"><path d="M0,20q4,-1.4 8,0"/></g>`,

  /** 砂に並ぶ墓石。エル・アラメイン専用。 */
  warcemetery:
    `<rect x="0" y="15.4" width="24" height="8.6" fill="#dcc08e"/>` +
    `<g fill="#f0ece0"><path d="M3,20.4v-6.6a2.2,2.2 0 0 1 4.4,0v6.6z"/><path d="M9.8,20.4v-8a2.2,2.2 0 0 1 4.4,0v8z"/><path d="M16.6,20.4v-6.6a2.2,2.2 0 0 1 4.4,0v6.6z"/></g>` +
    `<g stroke="#c8c0ac" stroke-width="1" fill="none"><path d="M4,17.4h2.4M10.8,16h2.4M17.6,17.4h2.4"/></g>` +
    `<rect x="1.5" y="20.4" width="21" height="2" fill="#c0a274"/>` +
    `<circle cx="12" cy="22.4" r="1.6" fill="#c93f34"/>` +
    `<g stroke="#c8a97c" stroke-width="1" opacity=".55" fill="none"><path d="M0,18q4,-1.4 8,0M16,18.6q4,-1.4 8,0"/></g>`,

  /** サイロと回転窯。ベニ・スエフ専用。 */
  cementplant:
    `<g fill="#cfc7b4"><rect x="1.6" y="5.6" width="6.4" height="16.4" rx="1.4"/><rect x="9" y="8" width="5.4" height="14" rx="1.4"/></g>` +
    `<g fill="#b0a894"><rect x="1" y="4.4" width="7.6" height="2"/><rect x="8.4" y="6.8" width="6.6" height="2"/></g>` +
    `<path d="M8,17.6l14.4,-5.2l1.6,4.4l-14.4,5.2z" fill="#8a8f96"/>` +
    `<g stroke="#6b7280" stroke-width="1.2" fill="none"><path d="M12,16.2l1.6,4.4M16.4,14.6l1.6,4.4M20.8,13l1.6,4.4"/></g>` +
    `<ellipse cx="5" cy="2.6" rx="4.6" ry="2.2" fill="#d8d2c6" opacity=".65"/>` +
    `<rect x="0" y="22" width="24" height="2" fill="#a89880"/>`,

  /** 高い煙突と煉瓦の製糖所。ミニヤ専用。 */
  sugarmill:
    `<rect x="1.6" y="12" width="12.4" height="10" fill="#b58a5a"/>` +
    `<g stroke="#9a7248" stroke-width="1" opacity=".7" fill="none"><path d="M1.6,15h12.4M1.6,18h12.4"/></g>` +
    `<rect x="4" y="16" width="3.4" height="6" fill="#5d4a34"/>` +
    `<path d="M1.6,12h12.4l-2.4,-3.4H4z" fill="#8a6a46"/>` +
    `<rect x="16.4" y="2.6" width="4.4" height="19.4" fill="#c9c0b0"/>` +
    `<rect x="16.4" y="2.6" width="4.4" height="2.4" fill="#a8412f"/>` +
    `<path d="M18.6,1.6c0,-2 3.4,-2 3.4,-3.6" fill="none" stroke="#d0cabe" stroke-width="1.6"/>` +
    `<rect x="0" y="22" width="24" height="2" fill="#8f8878"/>`,

  /** 塩気を増して縮む湖と、その水を汲む水車。ファイユーム専用。 */
  lake:
    `<rect x="0" y="15" width="24" height="9" fill="#5f9fb8"/>` +
    `<rect x="0" y="13.4" width="24" height="1.8" fill="#efe8d8"/>` +
    `<circle cx="12" cy="12" r="8.4" fill="none" stroke="#8a6a46" stroke-width="2.2"/>` +
    `<g stroke="#8a6a46" stroke-width="1.3" fill="none"><path d="M12,3.6v16.8M3.6,12h16.8M6.1,6.1l11.8,11.8M17.9,6.1L6.1,17.9"/></g>` +
    `<g fill="#b58a5a"><rect x="10" y="2.2" width="4" height="3"/><rect x="18.8" y="10" width="3" height="4"/><rect x="10" y="18.8" width="4" height="3"/><rect x="2.2" y="10" width="3" height="4"/></g>` +
    `<circle cx="12" cy="12" r="1.8" fill="#5d4a34"/>` +
    `<g stroke="#a8dce4" stroke-width="1" opacity=".7" fill="none"><path d="M1,19h6M16,21h7"/></g>`,

  /** 送金で一階ずつ建てていく家。上に鉄筋が残る。ソハーグ専用。 */
  migrant:
    `<rect x="4" y="14" width="16" height="8" fill="#dcbc90"/>` +
    `<g fill="#5d4a34"><rect x="6.4" y="16.4" width="3.4" height="5.6"/><rect x="14.4" y="16.4" width="3.4" height="4"/></g>` +
    `<rect x="4" y="8" width="16" height="6" fill="#b0694a"/>` +
    `<g stroke="#9a5b3f" stroke-width="0.9" opacity=".8" fill="none"><path d="M4,10h16M4,12h16M8,8v6M13,8v6M17,8v6"/></g>` +
    `<g fill="#8a8f96"><rect x="5" y="3.6" width="1.6" height="4.4"/><rect x="9.6" y="2.6" width="1.6" height="5.4"/><rect x="14.2" y="3.6" width="1.6" height="4.4"/><rect x="18" y="3" width="1.6" height="5"/></g>` +
    `<rect x="2.4" y="22" width="19.2" height="2" fill="#a89880"/>`,

  /** 素焼きの水甕。しみ出た水で冷える。ケナ専用。 */
  pottery:
    `<path d="M9.6,5h4.8v2.4c4.4,1.4 6.6,5 6.6,8.6a9,7.6 0 0 1 -18,0c0,-3.6 2.2,-7.2 6.6,-8.6z" fill="#c98a5a"/>` +
    `<rect x="8.6" y="3" width="6.8" height="2.6" rx="1.2" fill="#b07a4a"/>` +
    `<path d="M7,14q1.4,-4.4 4,-6" fill="none" stroke="#e0b48a" stroke-width="1.8" stroke-linecap="round"/>` +
    `<path d="M3.4,17q8.6,2.6 17.2,0" fill="none" stroke="#a86e40" stroke-width="1" opacity=".7"/>` +
    `<path d="M21.6,18.4q-1.6,2.2 0,3.4q1.6,-1.2 0,-3.4z" fill="#7fc4dc"/>` +
    `<ellipse cx="12" cy="23" rx="7" ry="1.4" fill="#a89880" opacity=".7"/>`,

  /** 傾けた取鍋から流れる溶けたアルミ。ナグ・ハマーディ専用。 */
  smelter:
    `<path d="M3,5.6l12.4,-3.2l2.6,9L5.6,14.6z" fill="#6a707a"/>` +
    `<path d="M3,5.6l12.4,-3.2l0.6,2L3.6,7.6z" fill="#8a909a"/>` +
    `<path d="M17.6,11.6q1.6,5 0.6,9" fill="none" stroke="#e8ecf2" stroke-width="2.8" stroke-linecap="round"/>` +
    `<ellipse cx="18" cy="20.4" rx="5.4" ry="2.4" fill="#ffd76a"/>` +
    `<rect x="12.4" y="20" width="11" height="3.4" rx="1" fill="#4a5058"/>` +
    `<g fill="#f5a02a"><circle cx="14.4" cy="17.4" r="1.2"/><circle cx="21.4" cy="16" r="1"/><circle cx="16" cy="13.4" r="0.9"/></g>` +
    `<path d="M2,7l-1.6,-2.4" stroke="#6a707a" stroke-width="2" fill="none"/>`,

  /** 川に食われていく旧市街。残った古いモスク。ギルガ専用。 */
  oldtown:
    `<rect x="0" y="11" width="24" height="13" fill="#3f7f9f"/>` +
    `<path d="M4,24v-4h4v-4h4v-5h12v13z" fill="#a8865a"/>` +
    `<path d="M12,11h12v2H12zM8,16h4v2H8zM4,20h4v2H4z" fill="#d4b788"/>` +
    `<path d="M12.6,11V6.4a3.2,3.2 0 0 1 6.4,0V11z" fill="#f0ece0"/>` +
    `<path d="M12.6,6.6a3.2,2.8 0 0 1 6.4,0z" fill="#c8bca0"/>` +
    `<rect x="14.4" y="7.6" width="2.8" height="3.4" fill="#7a6a52"/>` +
    `<rect x="20.2" y="1.4" width="3.4" height="9.6" fill="#f0ece0"/>` +
    `<rect x="19.4" y="5.6" width="5" height="1.4" fill="#b6a684"/>` +
    `<path d="M20.4,1.4h3l-1.5,-1.4z" fill="#c8bca0"/>` +
    `<g fill="#8a6a44"><rect x="1" y="20.4" width="2.6" height="2.2"/><rect x="4.6" y="17" width="2.2" height="2"/><rect x="9" y="13.4" width="2.2" height="2"/></g>` +
    `<g stroke="#8fd0dc" stroke-width="1" opacity=".7" fill="none"><path d="M0,15h7M0,22.4h3"/></g>`,

  /** 消えた古い集落と、代わりに建った新しい家。ルクソール専用。 */
  relocation:
    `<path d="M1.4,20.6v-6.4l4.8,-4l4.8,4v6.4z" fill="none" stroke="#a89c82" stroke-width="1.3" stroke-dasharray="2.2 2"/>` +
    `<rect x="13.4" y="12.6" width="9.4" height="8" fill="#ece2cc"/>` +
    `<path d="M12,12.6h12.2l-5.6,-4.4z" fill="#b8613c"/>` +
    `<rect x="16.6" y="15.6" width="3" height="5" fill="#6b5c46"/>` +
    `<path d="M6,23.4h8.4" stroke="#4a5568" stroke-width="1.8" fill="none"/>` +
    `<path d="M13.4,21.4l3.4,2l-3.4,2z" fill="#4a5568"/>` +
    `<rect x="0" y="20.6" width="24" height="1.6" fill="#c0a274"/>`,

  /** 刈り入れの季節だけ現れる、サトウキビと軽便線路。エドフ専用。 */
  canefield:
    `<g stroke="#6ba84a" stroke-width="2.2" stroke-linecap="round" fill="none"><path d="M3.4,18.6q-1,-8 0.6,-16M8,18.6q-0.6,-9 1.4,-15M13.4,18.6q0.6,-8 -0.6,-15M18.6,18.6q1.4,-8 0,-14.6"/></g>` +
    `<g stroke="#8ac468" stroke-width="1.2" fill="none"><path d="M4,9.6l-3,-2M4,13.6l-2.6,2M9.2,7l3.4,-2M9,12l3,2M13,9l-3.4,-2M18.6,10.6l3.4,-2"/></g>` +
    `<g fill="#4a8438"><circle cx="4" cy="2.6" r="1.4"/><circle cx="9.4" cy="3.6" r="1.4"/><circle cx="12.8" cy="3.6" r="1.4"/><circle cx="18.6" cy="4" r="1.4"/></g>` +
    `<g fill="#8a6a4a"><rect x="1" y="18.6" width="4" height="1.8"/><rect x="7" y="18.6" width="4" height="1.8"/><rect x="13" y="18.6" width="4" height="1.8"/><rect x="19" y="18.6" width="4" height="1.8"/></g>` +
    `<g stroke="#5a5a60" stroke-width="1.4" fill="none"><path d="M0,19h24M0,21.4h24"/></g>`,

  /** 沈んだ故郷の色を塗り継いだ丸屋根の家。コム・オンボ専用。 */
  paintedhouse:
    `<rect x="3.6" y="10.6" width="16.8" height="11.4" fill="#2f7fbe"/>` +
    `<path d="M3.6,10.6a8.4,6.6 0 0 1 16.8,0z" fill="#f0b429"/>` +
    `<path d="M3.6,14.6l4.2,-3.4l4.2,3.4l4.2,-3.4l4.2,3.4z" fill="#f4efe2"/>` +
    `<rect x="3.6" y="14.6" width="16.8" height="1.6" fill="#d1503c"/>` +
    `<path d="M9.6,22v-4.4a2.4,2.4 0 0 1 4.8,0V22z" fill="#f4efe2"/>` +
    `<circle cx="6.4" cy="19" r="1.6" fill="#3f9f7f"/>` +
    `<circle cx="17.6" cy="19" r="1.6" fill="#d1503c"/>` +
    `<rect x="1.6" y="22" width="20.8" height="2" fill="#d6b980"/>`,

  /** 水位の違う二面を仕切る閘門。エスナ専用。 */
  lock:
    `<rect x="0" y="22" width="24" height="2" fill="#bfb298"/>` +
    `<rect x="0" y="8" width="10.4" height="14" fill="#4f92ae"/>` +
    `<rect x="0" y="8" width="10.4" height="1.6" fill="#bfe4ec"/>` +
    `<rect x="13.6" y="15" width="10.4" height="7" fill="#2a5e78"/>` +
    `<rect x="13.6" y="15" width="10.4" height="1.4" fill="#7fb4c8"/>` +
    `<g stroke="#8fd0dc" stroke-width="1" opacity=".6" fill="none"><path d="M1.4,12h6M15.4,19h6"/></g>` +
    `<rect x="10" y="3.6" width="4" height="18.4" fill="#4a3826"/>` +
    `<g fill="#7f6244"><rect x="9.4" y="5.6" width="5.2" height="1.6"/><rect x="9.4" y="11" width="5.2" height="1.6"/><rect x="9.4" y="16.4" width="5.2" height="1.6"/></g>` +
    `<path d="M1.4,8h7.6l-1.6,3.4H3z" fill="#f4efe2"/>` +
    `<rect x="4.4" y="2" width="1.4" height="6" fill="#6b5330"/>` +
    `<path d="M5.8,2.4l3.4,5.6H5.8z" fill="#e2dac6"/>`,

  /** ダムの堤体と、送り出される電気。アスワン専用。 */
  dam:
    `<rect x="0" y="9.6" width="7.6" height="12.4" fill="#3f7f9f"/>` +
    `<path d="M2.6,22L8.4,6.6h7.2L21.4,22z" fill="#c8ab7c"/>` +
    `<g fill="#b08f5e" opacity=".8"><circle cx="9" cy="14" r="1.6"/><circle cx="14.6" cy="17" r="1.8"/><circle cx="12" cy="20" r="1.4"/><circle cx="17" cy="12.6" r="1.2"/></g>` +
    `<rect x="7.6" y="6.6" width="8.8" height="2" fill="#bfb298"/>` +
    `<rect x="18" y="18.6" width="6" height="3.4" fill="#3f7f9f"/>` +
    `<g stroke="#8a8f96" stroke-width="1.2" fill="none"><path d="M12,6.6V1.6M9.6,3.4h4.8M10.4,1.6h3.2"/></g>` +
    `<g stroke="#8fd0dc" stroke-width="1" opacity=".7" fill="none"><path d="M0.6,12.4h6"/></g>` +
    `<rect x="0" y="22" width="24" height="2" fill="#dcc08e"/>`,

  /** ヒトコブラクダ。ダラウ専用。 */
  camelmarket:
    `<g fill="#a8794a"><rect x="5.4" y="15" width="2.2" height="7.4"/><rect x="9.4" y="15" width="2.2" height="7.4"/><rect x="14" y="15" width="2.2" height="7.4"/><rect x="17.2" y="15" width="2.2" height="7.4"/></g>` +
    `<ellipse cx="12.2" cy="13.6" rx="8" ry="4.6" fill="#b58a5a"/>` +
    `<path d="M7.6,11.6q4.6,-7.4 9.2,0z" fill="#b58a5a"/>` +
    `<path d="M18.4,15q3,-2 2.2,-8.4l2.6,0.4q0.6,7.4 -2.2,9.6z" fill="#b58a5a"/>` +
    `<ellipse cx="22.2" cy="5.6" rx="1.8" ry="1.4" fill="#b58a5a"/>` +
    `<circle cx="22.6" cy="5.2" r="0.7" fill="#3a2a1a"/>` +
    `<path d="M4.4,12q-2.2,1.4 -1.6,4.4" fill="none" stroke="#a8794a" stroke-width="1.4" stroke-linecap="round"/>` +
    `<rect x="0" y="22.4" width="24" height="1.6" fill="#dcc08e"/>`,

  /** 原子炉の格納容器。エル・ダバア専用。 */
  nuclearplant:
    `<rect x="6" y="10.4" width="11" height="10.6" fill="#dfdcd2"/>` +
    `<path d="M6,10.4a5.5,5.2 0 0 1 11,0z" fill="#c8c4b8"/>` +
    `<rect x="17" y="14" width="7" height="7" fill="#b0aca0"/>` +
    `<g fill="#8a8f96"><rect x="18.4" y="15.6" width="4.4" height="1.6"/><rect x="18.4" y="18.2" width="4.4" height="1.6"/></g>` +
    // まだ稼働していない。**建設中の姿**として建設クレーンを立てる
    // (この炉は海水冷却なので冷却塔は無い)
    `<rect x="2.4" y="4.6" width="2.4" height="16.4" fill="#e8a01c"/>` +
    `<rect x="0.6" y="2.6" width="10.4" height="2.2" fill="#e8a01c"/>` +
    `<rect x="0.6" y="1.6" width="2.4" height="3.2" fill="#c07a10"/>` +
    `<path d="M9.4,4.8v3.4" stroke="#7a6a52" stroke-width="0.9" fill="none"/>` +
    `<rect x="8.2" y="8.2" width="2.6" height="1.8" fill="#8a8f96"/>` +
    `<circle cx="11.5" cy="14.6" r="1.6" fill="#2f7fbe"/>` +
    `<ellipse cx="11.5" cy="14.6" rx="4.6" ry="1.8" fill="none" stroke="#2f7fbe" stroke-width="1" transform="rotate(35 11.5 14.6)"/>` +
    `<ellipse cx="11.5" cy="14.6" rx="4.6" ry="1.8" fill="none" stroke="#2f7fbe" stroke-width="1" transform="rotate(-35 11.5 14.6)"/>` +
    `<rect x="0" y="21" width="24" height="3" fill="#e0c48f"/>`,
};
