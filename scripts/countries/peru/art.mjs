/**
 * ペルーの都市イラスト。
 *
 * `PERU_MARKS` は24×24の座標系に描くシンボル、`PERU_BG` は400×210の
 * 座標系に描く背景シーン(いずれもSVG断片の文字列)。フランス・エジプトと同じく
 * 最初から文字列として持つ。動きは含めない。
 *
 * この盤面の芯は「**鉄道は、人の体より先に山を登ってしまった**」こと。
 * 中央鉄道は標高4,700m台のトンネルを抜ける。人を運ぶために敷かれたのではなく、
 * 鉱石を港へ下ろすために敷かれた。**絵では「高さ」と「その代償」を両方見せる。**
 * 高さ: 薄い空気の濃い青、雪の稜線、九十九折りの線路、段々畑。
 * 代償: 削られた山、製錬所の煙、水の溜まった採掘の穴。
 *
 * **マチュピチュとインカの遺跡で埋めない。**文章の担当が意図的に避けている。
 * `inkawall`(クスコ)・`livingtown`(オリャンタイタンボ)・`oracle`(チャビン)・
 * `ransomroom`(カハマルカ)・`cloudfortress`(クエラップ)は
 * `cities.mjs` にある鍵なのでその町にだけ描き、**他の41枚に石積みを持ち込まない。**
 *
 * 色: 高地の空 #4f8fd0〜#a8cfe4(薄い空気ほど濃い青)、リマの霧 #b8bcc0、
 * 岩 #8a7a6a、雪 #f2f6f8、イチュ(高原の藁色の草)#b5a267、
 * 段々畑 #5f9f43、砂漠 #d8bb87、太平洋 #2f6f8a、
 * アマゾンの川 #8a7a52(泥の色。青くしない)、密林 #2f7a3f、
 * 植民地の白漆喰 #f4efe2 と瓦 #b8613c、インカの石 #8f8880、
 * 織物の色 #c8102e / #e8b21c / #1f6fb0 / #3f9f7f。
 *
 * 鍵は `cities.mjs` の `mark` / `bg` と一対一で対応する。
 *
 * **背景SVGの中央25%(x=151〜249 / y=54〜152)は都市シンボルに隠れて
 * 見えない。** 見せたい細部は左右3分の1と手前(y>170)に置く。
 * `sky()` の第3引数には**必ず地面の開始yと同じ値**を渡すこと。
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
 * 高地ほど上を濃い青にすると、薄い空気の感じが出る。
 */
function sky(top = "#4f8fd0", bottom = "#bfdcea", to = 124) {
  return band(0, 92, top) + band(84, Math.max(0, to - 84), bottom);
}

function ground(y, fill) {
  return `<rect x="0" y="${r1(y)}" width="${W}" height="${r1(210 - y)}" fill="${fill}"/>`;
}

function sun(cx, cy, r, fill = "#f7d98a") {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" opacity=".85"/>`;
}

/** リマの霧(ガルーア)。高地の霞にも使う。 */
function haze(cx, cy, rx, ry, fill = "#d8dcdc") {
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" opacity=".5"/>`;
}

function clouds(cx, cy, scale = 1, fill = "#f4f8fa") {
  const e = (dx, rx, ry) =>
    `<ellipse cx="${r1(cx + dx * scale)}" cy="${cy}" rx="${r1(rx * scale)}" ry="${r1(ry * scale)}"/>`;
  return `<g opacity=".85" fill="${fill}">${e(0, 18, 7)}${e(-11, 11, 5.5)}${e(12, 13, 5.5)}</g>`;
}

/** 遠景のなだらかな稜線。`base` は地面の開始yに合わせる。 */
function ridge(y, amp, fill, base, seed = 0) {
  const pts = [];
  for (let i = 0; i <= 8; i++) {
    pts.push(`${r1((i * W) / 8)},${r1(y + Math.sin((i + seed) * 1.7) * amp)}`);
  }
  return `<path d="M0,${r1(base)}L${pts.join("L")}L400,${r1(base)}z" fill="${fill}"/>`;
}

/** アンデスの峰。稜線が鋭く、上に雪が載る。この盤面の背骨。 */
function peak(cx, base, h, fill = "#8a7a6a", snow = "#f2f6f8") {
  const w = r1(h * 1.15);
  const top = r1(base - h);
  return (
    `<path d="M${r1(cx - w / 2)},${base}L${r1(cx - w * 0.08)},${top}L${r1(cx + w * 0.14)},${r1(base - h * 0.68)}L${r1(cx + w / 2)},${base}z" fill="${fill}"/>` +
    `<path d="M${r1(cx - w * 0.08)},${top}L${r1(cx - w * 0.2)},${r1(base - h * 0.72)}q${r1(w * 0.07)},${r1(h * 0.06)} ${r1(w * 0.12)},${r1(-h * 0.03)}q${r1(w * 0.06)},${r1(-h * 0.05)} ${r1(w * 0.11)},${r1(h * 0.02)}L${r1(cx + w * 0.14)},${r1(base - h * 0.68)}L${r1(cx + w * 0.05)},${r1(base - h * 0.82)}z" fill="${snow}"/>`
  );
}

/** 段々畑(アンデネス)。斜面を階段状に切る。 */
function terraces(
  x,
  y,
  w,
  steps = 5,
  stepH = 9,
  fill = "#5f9f43",
  edge = "#7f6a4a",
) {
  const p = [];
  for (let i = 0; i < steps; i++) {
    const inset = r1((w * 0.09 * i) / 1);
    p.push(
      `<rect x="${r1(x + inset)}" y="${r1(y + i * stepH)}" width="${r1(w - inset * 2)}" height="${r1(stepH)}" fill="${i % 2 ? fill : "#4f8b38"}"/>`,
      `<rect x="${r1(x + inset)}" y="${r1(y + i * stepH)}" width="${r1(w - inset * 2)}" height="2.4" fill="${edge}"/>`,
    );
  }
  return p.join("");
}

/** イチュ(高原の藁色の草)。空きがちな高原の絵に敷く。 */
function ichu(x, base, r = 7, fill = "#b5a267") {
  return (
    `<g stroke="${fill}" stroke-width="1.8" stroke-linecap="round" fill="none">` +
    `<path d="M${x},${base}l${r1(-r * 0.8)},${r1(-r)}M${x},${base}v${r1(-r * 1.3)}M${x},${base}l${r1(r * 0.8)},${r1(-r)}M${x},${base}l${r1(-r * 0.4)},${r1(-r * 1.2)}M${x},${base}l${r1(r * 0.4)},${r1(-r * 1.2)}"/>` +
    `</g>`
  );
}

function ichuField(y, n = 7, gap = 56, r = 8) {
  const p = [];
  for (let i = 0; i < n; i++)
    p.push(ichu(r1(10 + i * gap), r1(y + (i % 3) * 5), r));
  return p.join("");
}

/** トタン屋根の土壁の家。山の斜面にへばりつく。 */
function adobeHouse(x, base, w, h, wall = "#c08f5c", roof = "#8f9298") {
  return (
    `<rect x="${r1(x)}" y="${r1(base - h)}" width="${r1(w)}" height="${r1(h)}" fill="${wall}"/>` +
    `<path d="M${r1(x - 3)},${r1(base - h)}h${r1(w + 6)}l${r1(-w * 0.12)},-6h${r1(-w * 0.76)}z" fill="${roof}"/>` +
    `<rect x="${r1(x + w * 0.18)}" y="${r1(base - h * 0.62)}" width="${r1(w * 0.2)}" height="${r1(h * 0.28)}" fill="#5d4a34"/>` +
    `<rect x="${r1(x + w * 0.58)}" y="${r1(base - h * 0.6)}" width="${r1(w * 0.24)}" height="${r1(h * 0.6)}" fill="#5d4a34"/>`
  );
}

/** 植民地様式の家。白漆喰に瓦、木のバルコニー。 */
function tileHouse(x, base, w, h, wall = "#f4efe2", roof = "#b8613c") {
  return (
    `<rect x="${r1(x)}" y="${r1(base - h)}" width="${r1(w)}" height="${r1(h)}" fill="${wall}"/>` +
    `<path d="M${r1(x - 5)},${r1(base - h)}h${r1(w + 10)}l${r1(-w * 0.1)},-8h${r1(-w * 0.8)}z" fill="${roof}"/>` +
    `<rect x="${r1(x + w * 0.16)}" y="${r1(base - h * 0.72)}" width="${r1(w * 0.24)}" height="${r1(h * 0.3)}" fill="#5d4a34"/>` +
    `<rect x="${r1(x + w * 0.58)}" y="${r1(base - h * 0.72)}" width="${r1(w * 0.24)}" height="${r1(h * 0.3)}" fill="#5d4a34"/>` +
    `<rect x="${r1(x + w * 0.36)}" y="${r1(base - h * 0.4)}" width="${r1(w * 0.26)}" height="${r1(h * 0.4)}" fill="#8a6a46"/>`
  );
}

/** 植民地広場のアーケード。 */
function arcade(x, base, w, h, n = 5, wall = "#f4efe2") {
  const bw = r1(w / n);
  const p = [
    `<rect x="${r1(x)}" y="${r1(base - h)}" width="${r1(w)}" height="${r1(h)}" fill="${wall}"/>`,
  ];
  for (let i = 0; i < n; i++) {
    const cx = r1(x + bw * i + bw / 2);
    p.push(
      `<path d="M${r1(cx - bw * 0.3)},${base}v${r1(-h * 0.38)}a${r1(bw * 0.3)},${r1(bw * 0.3)} 0 0 1 ${r1(bw * 0.6)},0V${base}z" fill="#5d4a34"/>`,
    );
  }
  p.push(
    `<path d="M${r1(x - 5)},${r1(base - h)}h${r1(w + 10)}l-6,-8h${r1(-w + 2)}z" fill="#b8613c"/>`,
  );
  return p.join("");
}

/** 教会の鐘塔。 */
function churchTower(x, base, h, wall = "#f4efe2") {
  const w = r1(h * 0.3);
  return (
    `<rect x="${r1(x - w / 2)}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${wall}"/>` +
    `<path d="M${r1(x - w * 0.66)},${r1(base - h)}h${r1(w * 1.32)}l${r1(-w * 0.16)},-7h${r1(-w)}z" fill="#b8613c"/>` +
    `<path d="M${r1(x - w * 0.5)},${r1(base - h - 7)}h${r1(w)}l${r1(-w / 2)},-12z" fill="#b8613c"/>` +
    `<path d="M${r1(x - w * 0.22)},${r1(base - h * 0.72)}v${r1(-h * 0.14)}a${r1(w * 0.22)},${r1(w * 0.22)} 0 0 1 ${r1(w * 0.44)},0v${r1(h * 0.14)}z" fill="#5d4a34"/>` +
    `<rect x="${r1(x - 1)}" y="${r1(base - h - 25)}" width="2" height="6" fill="#c8a020"/>`
  );
}

/** 煙突。製錬所・工場。 */
function stack(x, base, h, w = 8, fill = "#b0a89a") {
  return (
    `<path d="M${r1(x - w / 2 - 1)},${base}L${r1(x - w / 2 + 1)},${r1(base - h)}h${r1(w - 2)}L${r1(x + w / 2 + 1)},${base}z" fill="${fill}"/>` +
    `<rect x="${r1(x - w / 2 + 0.6)}" y="${r1(base - h)}" width="${r1(w - 1.2)}" height="4" fill="#8a5040"/>`
  );
}

function smoke(x, y, s = 1, fill = "#cfc8bc") {
  return (
    `<g fill="${fill}" opacity=".5">` +
    `<ellipse cx="${x}" cy="${y}" rx="${r1(10 * s)}" ry="${r1(6 * s)}"/>` +
    `<ellipse cx="${r1(x + 10 * s)}" cy="${r1(y - 9 * s)}" rx="${r1(13 * s)}" ry="${r1(8 * s)}"/>` +
    `<ellipse cx="${r1(x + 25 * s)}" cy="${r1(y - 17 * s)}" rx="${r1(16 * s)}" ry="${r1(10 * s)}"/>` +
    `</g>`
  );
}

/** 露天掘りの段。同心の輪で穴の深さを出す。 */
function openPit(cx, cy, rings = 4, rx = 90, ry = 26, fill = "#9a8a72") {
  const p = [];
  for (let i = 0; i < rings; i++) {
    const k = 1 - i * 0.22;
    p.push(
      `<ellipse cx="${cx}" cy="${r1(cy + i * 8)}" rx="${r1(rx * k)}" ry="${r1(ry * k)}" fill="${i % 2 ? fill : "#5f5342"}"/>`,
    );
  }
  return p.join("");
}

/** 線路。 */
function railTrack(y, x = 0, w = W, tie = "#6b5a44", rail = "#5a5a60") {
  const p = [];
  for (let i = x; i < x + w; i += 15)
    p.push(`<rect x="${r1(i)}" y="${r1(y - 3)}" width="7" height="9"/>`);
  return (
    `<g fill="${tie}" opacity=".85">${p.join("")}</g>` +
    `<g stroke="${rail}" stroke-width="2" fill="none"><path d="M${x},${r1(y - 2)}h${w}M${x},${r1(y + 4)}h${w}"/></g>`
  );
}

/** 九十九折りの線路。**この盤面の芯そのもの。**斜面を折り返しながら登る。 */
function switchback(x, y, w, h, legs = 4, color = "#5a5a60") {
  const p = [];
  const lh = r1(h / legs);
  for (let i = 0; i < legs; i++) {
    const y0 = r1(y + i * lh);
    p.push(
      i % 2
        ? `M${r1(x + w)},${y0}L${x},${r1(y0 + lh)}`
        : `M${x},${y0}L${r1(x + w)},${r1(y0 + lh)}`,
    );
  }
  return `<g stroke="${color}" stroke-width="2.6" fill="none" stroke-linecap="round" opacity=".9"><path d="${p.join("")}"/></g>`;
}

/** 水面。 */
function ripples(y, color = "#9fd8e4") {
  return (
    `<g stroke="${color}" stroke-width="2" opacity=".5" fill="none">` +
    `<path d="M16,${y}h66M148,${r1(y + 11)}h92M56,${r1(y + 22)}h70M274,${r1(y + 6)}h86M300,${r1(y + 20)}h62"/>` +
    `</g>`
  );
}

/** トトラ(チチカカ湖の葦)。 */
function totora(x, base, h, fill = "#b5a267") {
  return (
    `<g stroke="${fill}" stroke-width="2.4" stroke-linecap="round" fill="none">` +
    `<path d="M${x},${base}q-3,${r1(-h * 0.6)} -1,${r1(-h)}M${r1(x + 6)},${base}q2,${r1(-h * 0.6)} 5,${r1(-h * 0.9)}M${r1(x - 6)},${base}q-2,${r1(-h * 0.5)} -6,${r1(-h * 0.8)}"/>` +
    `</g>` +
    `<g fill="#8a7a4a"><ellipse cx="${r1(x - 1)}" cy="${r1(base - h)}" rx="2" ry="4"/><ellipse cx="${r1(x + 11)}" cy="${r1(base - h * 0.9)}" rx="1.8" ry="3.4"/></g>`
  );
}

/** アルパカ。高原の絵に置く。 */
function alpaca(x, base, s = 1, fill = "#e2d8c4") {
  return (
    `<g fill="${fill}">` +
    `<ellipse cx="${x}" cy="${r1(base - 13 * s)}" rx="${r1(13 * s)}" ry="${r1(8 * s)}"/>` +
    `<rect x="${r1(x - 9 * s)}" y="${r1(base - 8 * s)}" width="${r1(3 * s)}" height="${r1(8 * s)}"/>` +
    `<rect x="${r1(x - 2 * s)}" y="${r1(base - 8 * s)}" width="${r1(3 * s)}" height="${r1(8 * s)}"/>` +
    `<rect x="${r1(x + 6 * s)}" y="${r1(base - 8 * s)}" width="${r1(3 * s)}" height="${r1(8 * s)}"/>` +
    // **首は短く立てる。**長く寝かせると別の生きものに見える(恐竜になる)
    `<path d="M${r1(x + 4 * s)},${r1(base - 17 * s)}q${r1(1 * s)},${r1(-8 * s)} ${r1(6 * s)},${r1(-11 * s)}l${r1(5 * s)},${r1(3 * s)}q${r1(-4 * s)},${r1(3 * s)},${r1(-4.5 * s)},${r1(10 * s)}z"/>` +
    `<ellipse cx="${r1(x + 13 * s)}" cy="${r1(base - 30 * s)}" rx="${r1(5 * s)}" ry="${r1(3.6 * s)}"/>` +
    `<ellipse cx="${r1(x + 17 * s)}" cy="${r1(base - 29 * s)}" rx="${r1(2.6 * s)}" ry="${r1(2.2 * s)}"/>` +
    // 耳。アルパカはここが目印なので大きめに立てる
    `<path d="M${r1(x + 10 * s)},${r1(base - 32 * s)}l${r1(-0.6 * s)},${r1(-6 * s)}l${r1(3 * s)},${r1(4.6 * s)}z"/>` +
    `<path d="M${r1(x + 14.6 * s)},${r1(base - 32 * s)}l${r1(1.4 * s)},${r1(-6 * s)}l${r1(1.4 * s)},${r1(4.6 * s)}z"/>` +
    `</g>` +
    `<circle cx="${r1(x + 15 * s)}" cy="${r1(base - 30 * s)}" r="${r1(0.9 * s)}" fill="#3a2a1a"/>` +
    `<path d="M${r1(x + 18.6 * s)},${r1(base - 29 * s)}h${r1(1.4 * s)}" stroke="#8a7a62" stroke-width="${r1(0.9 * s)}" fill="none"/>`
  );
}

/** ユーカリ。アンデスの谷にどこでも生えている。 */
function eucalyptus(x, base, h, fill = "#4f7a4a") {
  return (
    `<rect x="${r1(x - 1.6)}" y="${r1(base - h)}" width="3.2" height="${h}" fill="#9a8a72"/>` +
    `<ellipse cx="${x}" cy="${r1(base - h * 0.86)}" rx="${r1(h * 0.19)}" ry="${r1(h * 0.3)}" fill="${fill}"/>` +
    `<ellipse cx="${r1(x - h * 0.13)}" cy="${r1(base - h * 0.62)}" rx="${r1(h * 0.13)}" ry="${r1(h * 0.19)}" fill="${fill}"/>` +
    `<ellipse cx="${r1(x + h * 0.13)}" cy="${r1(base - h * 0.66)}" rx="${r1(h * 0.12)}" ry="${r1(h * 0.18)}" fill="${fill}"/>`
  );
}

/** 柱サボテン。乾いた谷に立つ。 */
function cactus(x, base, h, fill = "#4f7a4a") {
  const w = r1(h * 0.2);
  return (
    `<rect x="${r1(x - w / 2)}" y="${r1(base - h)}" width="${w}" height="${h}" rx="${r1(w / 2)}" fill="${fill}"/>` +
    `<path d="M${r1(x - w / 2)},${r1(base - h * 0.55)}h${r1(-w * 0.9)}v${r1(-h * 0.28)}" fill="none" stroke="${fill}" stroke-width="${w}" stroke-linecap="round"/>` +
    `<path d="M${r1(x + w / 2)},${r1(base - h * 0.68)}h${r1(w * 0.8)}v${r1(-h * 0.2)}" fill="none" stroke="${fill}" stroke-width="${w}" stroke-linecap="round"/>`
  );
}

/** 熱帯林の木。 */
function jungleTree(x, base, h, fill = "#2f7a3f") {
  return (
    `<rect x="${r1(x - 2)}" y="${r1(base - h)}" width="4" height="${h}" fill="#6b5330"/>` +
    `<ellipse cx="${x}" cy="${r1(base - h)}" rx="${r1(h * 0.38)}" ry="${r1(h * 0.2)}" fill="${fill}"/>` +
    `<ellipse cx="${r1(x - h * 0.22)}" cy="${r1(base - h * 0.86)}" rx="${r1(h * 0.24)}" ry="${r1(h * 0.14)}" fill="#3f9f4f"/>` +
    `<ellipse cx="${r1(x + h * 0.22)}" cy="${r1(base - h * 0.88)}" rx="${r1(h * 0.22)}" ry="${r1(h * 0.13)}" fill="#3f9f4f"/>`
  );
}

/** アマゾンの二階建て木造船。 */
function riverBoat(x, waterY, s = 1, hull = "#c9503c") {
  const w = r1(78 * s);
  return (
    `<path d="M${x},${r1(waterY - 4)}h${w}q${r1(-6 * s)},${r1(10 * s)} ${r1(-16 * s)},${r1(10 * s)}h${r1(-w + 26 * s)}q${r1(-8 * s)},${r1(-2 * s)} ${r1(-10 * s)},${r1(-10 * s)}z" fill="${hull}"/>` +
    `<rect x="${r1(x + 4 * s)}" y="${r1(waterY - 16 * s)}" width="${r1(w - 10 * s)}" height="${r1(12 * s)}" fill="#efe7d4"/>` +
    `<rect x="${r1(x + 6 * s)}" y="${r1(waterY - 28 * s)}" width="${r1(w - 16 * s)}" height="${r1(12 * s)}" fill="#e2d8c2"/>` +
    `<path d="M${r1(x + 2 * s)},${r1(waterY - 28 * s)}h${r1(w - 8 * s)}v${r1(-4 * s)}h${r1(-w + 8 * s)}z" fill="#5f8f6a"/>` +
    `<g fill="#4f6a78">` +
    `<rect x="${r1(x + 10 * s)}" y="${r1(waterY - 13 * s)}" width="${r1(9 * s)}" height="${r1(6 * s)}"/>` +
    `<rect x="${r1(x + 26 * s)}" y="${r1(waterY - 13 * s)}" width="${r1(9 * s)}" height="${r1(6 * s)}"/>` +
    `<rect x="${r1(x + 42 * s)}" y="${r1(waterY - 13 * s)}" width="${r1(9 * s)}" height="${r1(6 * s)}"/>` +
    `</g>`
  );
}

/** 高床の家。川港と熱帯林に。 */
function stiltHouse(x, base, w, h, wall = "#c9a878", roof = "#8a8f96") {
  return (
    `<g fill="#8a6a46"><rect x="${r1(x + 3)}" y="${r1(base - 14)}" width="4" height="14"/><rect x="${r1(x + w - 7)}" y="${r1(base - 14)}" width="4" height="14"/></g>` +
    `<rect x="${r1(x)}" y="${r1(base - 14 - h)}" width="${r1(w)}" height="${r1(h)}" fill="${wall}"/>` +
    `<path d="M${r1(x - 4)},${r1(base - 14 - h)}h${r1(w + 8)}l${r1(-w * 0.14)},-8h${r1(-w * 0.72)}z" fill="${roof}"/>` +
    `<rect x="${r1(x + w * 0.36)}" y="${r1(base - 14 - h * 0.72)}" width="${r1(w * 0.28)}" height="${r1(h * 0.72)}" fill="#5d4a34"/>`
  );
}

/** 漁船。 */
function fishingBoat(x, waterY, s = 1, hull = "#2f6f9a") {
  return (
    `<path d="M${r1(x - 22 * s)},${waterY}h${r1(44 * s)}l${r1(-6 * s)},${r1(8 * s)}h${r1(-32 * s)}z" fill="${hull}"/>` +
    `<rect x="${r1(x - 8 * s)}" y="${r1(waterY - 10 * s)}" width="${r1(16 * s)}" height="${r1(10 * s)}" fill="#efe7d4"/>` +
    `<rect x="${r1(x - 1 * s)}" y="${r1(waterY - 26 * s)}" width="${r1(2 * s)}" height="${r1(16 * s)}" fill="#8a6a46"/>`
  );
}

/** かもめ。 */
function gull(x, y, s = 1) {
  const w = r1(7 * s);
  return `<path d="M${r1(x - w)},${y}q${r1(w / 2)},${r1(-5 * s)} ${w},0q${r1(w / 2)},${r1(-5 * s)} ${w},0" fill="none" stroke="#f4f0e6" stroke-width="${r1(1.6 * s)}"/>`;
}

/** 砂丘。 */
function dune(cx, base, w, h, fill = "#d8bb87") {
  return `<path d="M${r1(cx - w / 2)},${base}q${r1(w * 0.28)},${r1(-h)} ${r1(w * 0.6)},${r1(-h * 0.72)}q${r1(w * 0.3)},${r1(h * 0.2)} ${r1(w * 0.4)},${r1(h * 0.72)}z" fill="${fill}"/>`;
}

/** 風紋。乾いた海岸の絵が空きすぎて安く見えないように敷く。 */
function windRipples(y, color = "#c2a273") {
  return (
    `<g stroke="${color}" stroke-width="1.6" opacity=".5" fill="none" stroke-linecap="round">` +
    `<path d="M10,${y}q22,-5 44,0M70,${r1(y + 9)}q26,-5 52,0M0,${r1(y + 19)}q24,-6 48,0M250,${r1(y + 4)}q26,-5 52,0M310,${r1(y + 15)}q24,-5 48,0"/>` +
    `</g>`
  );
}

/** 日干し煉瓦の壁の浮彫(波・魚・鳥)。チャン・チャンふう。 */
function adobeFrieze(x, y, w, h, fill = "#c8a878") {
  const p = [];
  const n = Math.max(3, Math.round(w / 26));
  const s = r1(w / n);
  for (let i = 0; i < n; i++) {
    p.push(
      `M${r1(x + i * s)},${r1(y + h)}q${r1(s * 0.25)},${r1(-h)} ${r1(s * 0.5)},0q${r1(s * 0.25)},${r1(h)} ${r1(s * 0.5)},0`,
    );
  }
  return `<path d="${p.join("")}" fill="none" stroke="${fill}" stroke-width="3"/>`;
}

/** 段状の土の塚(カラル・ランバイェケ)。 */
function stepMound(cx, base, w, h, fill = "#c9a878", steps = 3) {
  const p = [];
  for (let i = 0; i < steps; i++) {
    const k = 1 - i * 0.26;
    p.push(
      `<rect x="${r1(cx - (w * k) / 2)}" y="${r1(base - (h / steps) * (i + 1))}" width="${r1(w * k)}" height="${r1(h / steps)}" fill="${i % 2 ? fill : "#bd9a68"}"/>`,
    );
  }
  return p.join("");
}

/** インカの石組み。目地が詰まった多角形の石。 */
function inkaStones(x, y, w, h, fill = "#8f8880", joint = "#6f6960") {
  const p = [
    `<rect x="${r1(x)}" y="${r1(y)}" width="${r1(w)}" height="${r1(h)}" fill="${fill}"/>`,
  ];
  const rows = Math.max(2, Math.round(h / 13));
  for (let r = 0; r < rows; r++) {
    const ry = r1(y + (h / rows) * (r + 1));
    p.push(
      `<path d="M${r1(x)},${ry}h${r1(w)}" stroke="${joint}" stroke-width="1.6" fill="none"/>`,
    );
    const cols = 3 + (r % 2);
    for (let c = 1; c < cols; c++) {
      const cx = r1(x + (w / cols) * c + (r % 2 ? 5 : -5));
      p.push(
        `<path d="M${cx},${r1(ry - h / rows)}v${r1(h / rows)}" stroke="${joint}" stroke-width="1.6" fill="none"/>`,
      );
    }
  }
  return p.join("");
}

// ---------------------------------------------------------------------------
// 背景シーン(24種)。鍵は cities.mjs の `bg` と対応。
//
// 同じ背景を分け合う町があるが、記号46種が全部ちがうので同じ絵にはならない。
// ---------------------------------------------------------------------------

const PERU_BASE_BG = {
  /**
   * 鉱山の町。ラ・オロヤ / セロ・デ・パスコ / ワンカベリカ。
   * 削られた山肌、製錬所の煙、斜面にへばりつくトタン屋根、鉱石を積む側線。
   * **芯の「代償」の側。**
   */
  miningtown:
    sky("#6f9ec0", "#c4c0b4", 138) +
    smoke(250, 56, 1.3) +
    smoke(60, 44, 0.9) +
    ridge(112, 6, "#7f7264", 138, 2) +
    ground(138, "#8a7a66") +
    // 削られた段(左)。山を段に切って掘り下げている
    `<path d="M0,138V104h84v10H0z" fill="#9a8a72"/>` +
    `<path d="M0,116h104v10H0z" fill="#8a7a62"/>` +
    `<path d="M0,128h124v10H0z" fill="#7f7058"/>` +
    `<g stroke="#6a5c48" stroke-width="1.6" opacity=".5" fill="none"><path d="M0,110h90M0,122h108M0,134h124"/></g>` +
    // 掘り下げた穴。**地面の上に置く。**空に置くと煙に見える
    openPit(70, 176, 4, 76, 17, "#75664f") +
    // 製錬所(右)
    `<rect x="286" y="98" width="82" height="40" fill="#9aa0a8"/>` +
    `<g fill="#41474e" opacity=".8"><rect x="294" y="110" width="14" height="18"/><rect x="316" y="110" width="14" height="18"/><rect x="338" y="110" width="14" height="18"/></g>` +
    stack(272, 138, 84, 14) +
    stack(376, 138, 60, 10) +
    // 斜面の家
    adobeHouse(14, 138, 34, 22) +
    adobeHouse(52, 132, 28, 18, "#b8845a") +
    adobeHouse(88, 138, 30, 20) +
    // 鉱石を積む側線
    railTrack(160, 0, 400) +
    `<g fill="#5f5346"><rect x="30" y="140" width="44" height="18" rx="2"/><rect x="82" y="140" width="44" height="18" rx="2"/></g>` +
    `<g fill="#8a7a5a"><path d="M30,140q22,-10 44,0z"/><path d="M82,140q22,-10 44,0z"/></g>` +
    `<g fill="#3a3a3e"><circle cx="42" cy="160" r="4"/><circle cx="64" cy="160" r="4"/><circle cx="94" cy="160" r="4"/><circle cx="116" cy="160" r="4"/></g>` +
    // 手前のずり山
    `<path d="M280,210q40,-32 118,-24v24z" fill="#9a8a72"/>` +
    `<g fill="#8a7a62" opacity=".8"><circle cx="316" cy="196" r="5"/><circle cx="346" cy="190" r="4"/><circle cx="372" cy="196" r="4.4"/></g>` +
    ichu(20, 200, 8) +
    ichu(160, 204, 7),

  /**
   * アンデス高地の植民地広場。カハマルカ / アヤクーチョ / ハウハ。
   * アーケードと鐘塔、石畳、背に乾いた山。
   */
  andeanplaza:
    sky("#4f8fd0", "#c4dcea", 128) +
    clouds(320, 30, 1) +
    peak(60, 128, 56, "#9a8a72") +
    peak(330, 128, 44, "#a08f76") +
    ridge(118, 5, "#8f9a6a", 128, 4) +
    ground(128, "#a89a7c") +
    // 左: アーケード
    arcade(6, 150, 122, 40, 5) +
    `<g fill="#5c7080"><rect x="18" y="118" width="14" height="14"/><rect x="46" y="118" width="14" height="14"/><rect x="74" y="118" width="14" height="14"/><rect x="102" y="118" width="14" height="14"/></g>` +
    // 右: 教会
    churchTower(300, 150, 62) +
    tileHouse(322, 150, 66, 40) +
    tileHouse(258, 150, 34, 30) +
    // 広場の石畳と噴水
    band(150, 60, "#b8ab90") +
    `<g stroke="#a2957c" stroke-width="2" opacity=".7" fill="none"><path d="M0,164h400M0,180h400M0,196h400M60,150v60M160,150v60M260,150v60M360,150v60"/></g>` +
    `<circle cx="200" cy="188" r="17" fill="#8a8f96"/>` +
    `<circle cx="200" cy="188" r="11" fill="#5f9fb8"/>` +
    `<rect x="197" y="168" width="6" height="14" fill="#8a8f96"/>` +
    `<circle cx="200" cy="166" r="5" fill="#8a8f96"/>` +
    // 織物を広げた露店(手前・左右)
    `<g fill="#c8102e"><rect x="14" y="176" width="46" height="8"/></g>` +
    `<g fill="#e8b21c"><rect x="14" y="184" width="46" height="6"/></g>` +
    `<g fill="#1f6fb0"><rect x="14" y="190" width="46" height="6"/></g>` +
    `<g fill="#3f9f7f"><rect x="340" y="182" width="48" height="7"/></g>` +
    `<g fill="#c8102e"><rect x="340" y="189" width="48" height="6"/></g>` +
    // 露店を出している人と、買いに来た人
    `<g fill="#1f6fb0"><path d="M76,182v-14a5,5 0 0 1 10,0v14z"/></g>` +
    `<circle cx="81" cy="163" r="5.4" fill="#7a5a3c"/>` +
    `<path d="M74,158h14l-7,-5z" fill="#e8b21c"/>` +
    `<g fill="#3f9f7f"><path d="M320,186v-13a4.6,4.6 0 0 1 9.2,0v13z"/></g>` +
    `<circle cx="324.6" cy="168" r="5" fill="#6d5238" />` +
    `<path d="M318,163h13l-6.5,-5z" fill="#c8102e"/>` +
    // 広場の木と、ベンチ
    `<circle cx="140" cy="164" r="14" fill="#4f7a4a"/>` +
    `<rect x="137" y="164" width="6" height="14" fill="#8a7a62"/>` +
    `<circle cx="262" cy="166" r="12" fill="#4f7a4a"/>` +
    `<rect x="259" y="166" width="5" height="12" fill="#8a7a62"/>` +
    `<g fill="#8a6a46"><rect x="112" y="184" width="34" height="4"/><rect x="114" y="188" width="4" height="8"/><rect x="140" y="188" width="4" height="8"/></g>` +
    // アーケードの旗と、教会の脇の階段
    `<g fill="#c8102e"><rect x="10" y="102" width="2.4" height="14"/></g>` +
    `<path d="M12.4,103h12v5h-12z" fill="#c8102e"/>` +
    `<g fill="#b8ab90"><rect x="286" y="146" width="24" height="4"/><rect x="290" y="142" width="20" height="4"/><rect x="294" y="138" width="16" height="4"/></g>`,

  /**
   * クスコ。インカの石組みの上に植民地の階が載っている、この町だけの重なり。
   * 屋根瓦が斜面を段になって下る。
   */
  andeancapital:
    sky("#4f8fd0", "#c4dcea", 120) +
    clouds(70, 26, 0.9) +
    ridge(108, 6, "#8f9a6a", 120, 6) +
    ground(120, "#a89a7c") +
    // 斜面に段になって下る瓦屋根
    `<g fill="#b8613c"><path d="M0,120h400v10H0z"/></g>` +
    `<g fill="#f4efe2"><rect x="0" y="130" width="52" height="22"/><rect x="56" y="130" width="44" height="18"/><rect x="104" y="130" width="40" height="20"/><rect x="262" y="130" width="46" height="20"/><rect x="312" y="130" width="42" height="18"/><rect x="358" y="130" width="42" height="22"/></g>` +
    `<g fill="#a8543a"><rect x="0" y="126" width="52" height="5"/><rect x="56" y="126" width="44" height="5"/><rect x="104" y="126" width="40" height="5"/><rect x="262" y="126" width="46" height="5"/><rect x="312" y="126" width="42" height="5"/><rect x="358" y="126" width="42" height="5"/></g>` +
    `<g fill="#5c7080"><rect x="12" y="136" width="11" height="12"/><rect x="30" y="136" width="11" height="12"/><rect x="66" y="135" width="10" height="10"/><rect x="272" y="136" width="11" height="12"/><rect x="322" y="135" width="10" height="10"/><rect x="370" y="136" width="11" height="12"/></g>` +
    // 教会(塔だけ左右に出す)
    churchTower(118, 130, 56) +
    churchTower(288, 130, 50) +
    // **インカの石組みの土台。**手前の全幅に置く
    inkaStones(0, 152, 400, 34) +
    // 台形の戸口
    `<path d="M46,186v-22l5,-5h14l5,5v22z" fill="#4a4640"/>` +
    `<path d="M328,186v-20l4,-4h13l4,4v20z" fill="#4a4640"/>` +
    // 石畳の路地
    band(186, 24, "#9a9084") +
    `<g stroke="#8a8074" stroke-width="2" opacity=".7" fill="none"><path d="M0,194h400M0,202h400M50,186v24M150,186v24M250,186v24M350,186v24"/></g>` +
    // 石組みの角(有名な多角形の石を1つだけ大きく)
    `<path d="M96,152l14,-0l6,10l-4,12l-16,2l-6,-12z" fill="#9f9890"/>` +
    `<path d="M96,152l14,-0l6,10l-4,12l-16,2l-6,-12z" fill="none" stroke="#5f5a52" stroke-width="1.8"/>` +
    // 石畳を歩く人と、荷を負ったリャマ
    `<g fill="#c8102e"><path d="M158,200v-14a5,5 0 0 1 10,0v14z"/></g>` +
    `<circle cx="163" cy="181" r="5.4" fill="#7a5a3c"/>` +
    `<path d="M156,176h14l-7,-5z" fill="#e8b21c"/>` +
    alpaca(300, 206, 0.8, "#c9b8a0") +
    `<g fill="#1f6fb0"><rect x="292" y="190" width="12" height="6"/></g>` +
    // 屋根の上の小さな十字と土鈴(クスコの家によく載っている)
    `<g fill="#8a7a62"><rect x="24" y="120" width="2" height="7"/><rect x="21" y="122" width="8" height="2"/><rect x="330" y="120" width="2" height="7"/><rect x="327" y="122" width="8" height="2"/></g>` +
    // 壁ぎわの陰と、街灯
    `<g fill="#8a8074" opacity=".5"><rect x="0" y="186" width="400" height="4"/></g>` +
    `<g fill="#5f5a52"><rect x="212" y="160" width="2.6" height="26"/></g>` +
    `<circle cx="213" cy="157" r="3.4" fill="#e8d8a8"/>`,

  /**
   * 聖なる谷。オリャンタイタンボ / マラス。
   * 両岸の斜面を階段に切った段々畑と、石で組んだ水路。
   */
  sacredvalley:
    sky("#4f8fd0", "#cfe4ea", 116) +
    clouds(300, 26, 1) +
    peak(70, 116, 58, "#8a7a6a") +
    peak(340, 116, 50, "#94836f") +
    ground(116, "#7f9a5a") +
    // 左右の段々畑
    terraces(0, 118, 130, 6, 11) +
    terraces(272, 122, 128, 5, 12) +
    // 谷底の川と水路
    band(190, 20, "#5f9fb8") +
    `<g stroke="#a8dce4" stroke-width="2" opacity=".55" fill="none"><path d="M20,198h80M250,202h110"/></g>` +
    `<rect x="0" y="182" width="400" height="8" fill="#8f8880"/>` +
    `<g stroke="#6f6960" stroke-width="1.4" opacity=".7" fill="none"><path d="M0,186h400M40,182v8M110,182v8M180,182v8M250,182v8M320,182v8"/></g>` +
    // 段の縁に立つ人
    `<g fill="#c8102e"><path d="M150,180v-11a4,4 0 0 1 8,0v11z"/></g>` +
    `<circle cx="154" cy="164" r="4.4" fill="#7a5a3c"/>` +
    `<path d="M148,160h12l-6,-4z" fill="#e8b21c"/>` +
    ichu(210, 180, 8) +
    ichu(236, 182, 7) +
    eucalyptus(30, 180, 34) +
    eucalyptus(372, 182, 30) +
    // 段の上の畑の作物(段ごとに色を変える)
    `<g fill="#7fbe5a"><circle cx="20" cy="126" r="4"/><circle cx="42" cy="126" r="4"/><circle cx="64" cy="126" r="4"/><circle cx="86" cy="126" r="4"/></g>` +
    `<g fill="#e8b21c"><circle cx="30" cy="148" r="3.4"/><circle cx="54" cy="148" r="3.4"/><circle cx="78" cy="148" r="3.4"/></g>` +
    `<g fill="#7fbe5a"><circle cx="300" cy="130" r="4"/><circle cx="324" cy="130" r="4"/><circle cx="348" cy="130" r="4"/><circle cx="372" cy="130" r="4"/></g>` +
    // 石を積んだ倉(コルカ)
    `<g fill="#a89a7c"><rect x="118" y="132" width="18" height="16"/><rect x="142" y="136" width="16" height="12"/></g>` +
    `<g fill="#8f8880"><path d="M116,132h22l-11,-8zM140,136h20l-10,-7z"/></g>` +
    // 川に架かる石の橋
    `<path d="M150,190h100v6H150z" fill="#8f8880"/>` +
    `<path d="M150,196q50,14 100,0v-2q-50,12 -100,0z" fill="#7f7a72"/>` +
    // 荷を背負ったリャマの列
    alpaca(96, 178, 0.7, "#c9b8a0") +
    alpaca(128, 180, 0.6) +
    `<g fill="#c8102e"><rect x="88" y="166" width="10" height="5"/><rect x="122" y="170" width="9" height="4"/></g>` +
    // 水路を流れる水
    `<g stroke="#a8dce4" stroke-width="1.6" opacity=".8" fill="none"><path d="M20,184h60M150,184h70M290,184h80"/></g>` +
    ichu(340, 176, 7),

  /**
   * アンデスの川沿いの谷。ワンカヨ / ワヌコ / アバンカイ。
   * 継ぎはぎの畑、ユーカリ、土壁の家、谷を行く一本の道と線路。
   */
  andeanvalley:
    sky("#4f8fd0", "#cfe0e4", 122) +
    clouds(90, 28, 1) +
    peak(300, 122, 52, "#93826e") +
    // **九十九折りで斜面を登る線路。**この盤面の芯そのもの。
    // 峰の**斜面の上**に載せること。空に浮かせると、ただの落書きに見える
    switchback(282, 96, 34, 20, 3, "#3f3a34") +
    ridge(112, 6, "#7f8f5a", 122, 1) +
    ground(122, "#8fa85f") +
    // 継ぎはぎの畑
    `<g fill="#a8bd6a"><rect x="0" y="126" width="86" height="18"/><rect x="118" y="130" width="70" height="16"/><rect x="286" y="126" width="114" height="18"/></g>` +
    `<g fill="#6f9a44"><rect x="0" y="144" width="120" height="16"/><rect x="252" y="144" width="148" height="14"/></g>` +
    `<g stroke="#5f8b38" stroke-width="2" opacity=".65" fill="none"><path d="M0,134h84M120,138h66M290,134h108M0,152h116M256,150h142"/></g>` +
    // 土壁の家
    adobeHouse(16, 160, 40, 26, "#c08f5c", "#8f9298") +
    adobeHouse(66, 158, 30, 22, "#b8845a") +
    adobeHouse(322, 160, 44, 28) +
    // 谷の道と線路
    railTrack(172, 0, 400) +
    band(184, 26, "#a89a7c") +
    `<g stroke="#96896c" stroke-width="3" stroke-dasharray="16 14" opacity=".6" fill="none"><path d="M0,198h400"/></g>` +
    eucalyptus(120, 172, 44) +
    eucalyptus(146, 174, 34) +
    eucalyptus(272, 172, 40) +
    eucalyptus(296, 176, 30) +
    ichu(200, 180, 8),

  /**
   * 火山を背にした南部の乾いた谷。アレキパ / モケグア。
   * 白い石(シジャール)の建物、円錐の火山、灌漑された細い緑の帯。
   */
  andeanvolcanovalley:
    sky("#4f8fd0", "#dcd4bc", 130) +
    // 円錐の火山(左右に置いて中央を空ける)
    `<path d="M18,130L86,44l68,86z" fill="#8a7a6a"/>` +
    `<path d="M74,58h24l-12,-14z" fill="#f2f6f8"/>` +
    `<path d="M62,72q12,6 24,0q12,-6 24,0l-6,10q-18,-6 -36,0z" fill="#f2f6f8" opacity=".9"/>` +
    `<path d="M286,130L336,66l52,64z" fill="#94836f"/>` +
    `<path d="M326,80h20l-10,-14z" fill="#f2f6f8"/>` +
    ground(130, "#c2ab84") +
    // 灌漑された緑の帯(乾いた土地の中の細い線)
    band(150, 18, "#5f9f43") +
    `<g stroke="#4f8b38" stroke-width="2.4" opacity=".7" fill="none"><path d="M0,156h400M0,164h400"/></g>` +
    // 白いシジャールの建物(左右)
    `<rect x="0" y="132" width="118" height="30" fill="#f0ece0"/>` +
    `<g fill="#e0dccc"><path d="M0,132h118v-6H0z"/></g>` +
    `<g fill="#5c7080"><path d="M14,162v-14a8,8 0 0 1 16,0v14zM42,162v-14a8,8 0 0 1 16,0v14zM70,162v-14a8,8 0 0 1 16,0v14z"/></g>` +
    `<rect x="296" y="130" width="104" height="34" fill="#f0ece0"/>` +
    `<g fill="#5c7080"><path d="M310,164v-16a9,9 0 0 1 18,0v16zM342,164v-16a9,9 0 0 1 18,0v16z"/></g>` +
    `<path d="M292,130h112l-10,-10h-92z" fill="#e0dccc"/>` +
    // 乾いた手前とサボテン
    band(168, 42, "#c9ab7c") +
    windRipples(180, "#b8975f") +
    cactus(34, 200, 44) +
    cactus(58, 204, 30) +
    cactus(356, 202, 38) +
    `<g fill="#8a7a62" opacity=".7"><circle cx="150" cy="196" r="6"/><circle cx="240" cy="202" r="5"/></g>` +
    // 白い石の教会(左)。この谷の建物はどれも火山の石で建っている
    `<rect x="8" y="104" width="46" height="28" fill="#f0ece0"/>` +
    `<path d="M4,104h54l-8,-10h-38z" fill="#e0dccc"/>` +
    `<g fill="#e8e2d0"><rect x="10" y="86" width="12" height="20"/><rect x="40" y="86" width="12" height="20"/></g>` +
    `<g fill="#dcd6c4"><path d="M8,86h16l-8,-9zM38,86h16l-8,-9z"/></g>` +
    `<g fill="#5c7080"><path d="M24,132v-16a7,7 0 0 1 14,0v16z"/><rect x="13" y="92" width="6" height="8"/><rect x="43" y="92" width="6" height="8"/></g>` +
    // 段になった畑(右)。乾いた斜面に水を引いた分だけ緑になる
    terraces(300, 132, 100, 3, 7, "#5f9f43") +
    `<g stroke="#4f8b38" stroke-width="1.6" opacity=".7" fill="none"><path d="M306,136h88M310,143h80"/></g>` +
    // 灌漑の水路と落ち口
    `<rect x="0" y="146" width="400" height="5" fill="#5f9fb8"/>` +
    `<g stroke="#a8dce4" stroke-width="1.4" opacity=".6" fill="none"><path d="M20,148h70M250,148h90"/></g>` +
    `<path d="M118,151v10h6v-10z" fill="#5f9fb8"/>` +
    // 火山の裾に散る岩と、乾いた低木
    `<g fill="#a08f76" opacity=".8"><ellipse cx="176" cy="140" rx="18" ry="6"/><ellipse cx="230" cy="136" rx="14" ry="5"/></g>` +
    `<g stroke="#8a9a5a" stroke-width="2" fill="none" stroke-linecap="round"><path d="M96,200v-8M96,194l-5,-5M96,194l5,-5M270,204v-7M270,199l-5,-4M270,199l5,-4"/></g>`,

  /**
   * コルディジェラ・ブランカ。ワラス / ユンガイ。
   * 雪の峰が壁のように立ち、その下に町。**高さがそのまま危うさでもある土地。**
   */
  cordillera:
    sky("#3f86cc", "#c4dcea", 132) +
    clouds(60, 24, 0.9) +
    // 雪の峰の壁
    `<path d="M0,132L44,52L82,96L128,34L176,92L222,44L268,98L318,50L364,94L400,62v70z" fill="#8f97a4"/>` +
    `<path d="M44,52L28,74q10,4 18,-2q8,-6 16,0L44,52zM128,34L108,62q12,6 22,-2q10,-6 20,2L128,34zM222,44L202,72q12,6 22,-2q10,-6 20,2L222,44zM318,50L300,76q12,6 22,-2q10,-6 20,2L318,50z" fill="#f2f6f8"/>` +
    ground(132, "#8f9a6a") +
    // 氷河湖(左)
    `<path d="M0,140q46,-12 92,-2q22,6 12,18q-52,10 -104,2z" fill="#5fb0c4"/>` +
    `<g stroke="#bfe8f0" stroke-width="2" opacity=".6" fill="none"><path d="M14,148h44"/></g>` +
    `<path d="M0,156q54,8 106,0v6H0z" fill="#9a8a72"/>` +
    // 町(右)
    ground(162, "#a8a880") +
    adobeHouse(280, 178, 34, 22, "#d8b483", "#b8613c") +
    adobeHouse(320, 174, 30, 20, "#c9a878", "#b8613c") +
    adobeHouse(356, 178, 36, 24, "#d8b483", "#b8613c") +
    churchTower(258, 178, 44) +
    // 手前の草地と岩
    `<g fill="#8a7a62"><ellipse cx="60" cy="196" rx="26" ry="10"/><ellipse cx="112" cy="202" rx="18" ry="7"/></g>` +
    ichu(150, 194, 9) +
    ichu(182, 200, 8) +
    ichu(220, 196, 8) +
    alpaca(30, 206, 0.8) +
    // 湖を堰き止めている氷堆石(モレーン)と、放流の水路
    `<path d="M0,158q54,8 106,0v-6q-52,10 -106,0z" fill="#8a8078"/>` +
    `<g fill="#7f756c"><circle cx="24" cy="157" r="4"/><circle cx="56" cy="159" r="3.4"/><circle cx="88" cy="157" r="4.4"/></g>` +
    `<path d="M104,158q10,14 14,32" stroke="#5fb0c4" stroke-width="4" fill="none"/>` +
    `<path d="M118,190q6,10 6,20" stroke="#5fb0c4" stroke-width="3" fill="none"/>` +
    // 町の続きと、谷を渡る橋
    adobeHouse(238, 176, 26, 18, "#d8b483", "#b8613c") +
    adobeHouse(200, 178, 24, 16, "#c9a878", "#b8613c") +
    `<rect x="140" y="176" width="56" height="5" fill="#8a8478"/>` +
    `<g fill="#8a8478"><rect x="150" y="181" width="4" height="12"/><rect x="182" y="181" width="4" height="12"/></g>` +
    // 手前の岩と、氷河から溶けた水の筋
    `<g fill="#9a9084"><ellipse cx="270" cy="200" rx="20" ry="8"/><ellipse cx="308" cy="206" rx="14" ry="6"/></g>` +
    `<g stroke="#a8c8d4" stroke-width="2" opacity=".6" fill="none"><path d="M330,162q6,16 4,34M350,164q4,14 3,30"/></g>` +
    // 高山の草と、羊飼いの犬ほどの小さな影
    ichu(60, 186, 8) +
    ichu(96, 190, 7) +
    ichu(356, 198, 8) +
    `<g fill="#6f6152"><ellipse cx="86" cy="202" rx="7" ry="4"/><rect x="81" y="204" width="2" height="5"/><rect x="89" y="204" width="2" height="5"/></g>`,

  /**
   * チャビン・デ・ワンタル。先インカの石造神殿。
   * 平たい石の基壇と沈んだ円形広場、壁に嵌まった石の頭。
   */
  ancienttemple:
    sky("#4f8fd0", "#c8dce4", 124) +
    clouds(330, 26, 0.9) +
    peak(60, 124, 54, "#8a7a6a") +
    ridge(114, 5, "#7f8f5a", 124, 3) +
    ground(124, "#9aa87a") +
    // 石の基壇(左に階段状に)
    `<g fill="#8f8880"><rect x="0" y="130" width="150" height="16"/><rect x="12" y="146" width="138" height="16"/><rect x="24" y="162" width="126" height="16"/></g>` +
    `<g stroke="#6f6960" stroke-width="1.4" opacity=".8" fill="none"><path d="M0,138h150M12,154h138M24,170h126M40,130v48M80,130v48M120,130v48"/></g>` +
    // 回廊の入口(暗い口)
    `<path d="M56,178v-20a12,12 0 0 1 24,0v20z" fill="#2f2c28"/>` +
    // 壁に嵌まった石の頭
    `<circle cx="112" cy="140" r="9" fill="#a29a90"/>` +
    `<circle cx="112" cy="140" r="9" stroke="#6f6960" stroke-width="1.4" fill="none"/>` +
    `<g fill="#6f6960"><circle cx="109" cy="138" r="1.8"/><circle cx="115" cy="138" r="1.8"/><path d="M108,144h8v2h-8z"/></g>` +
    // 沈んだ円形広場(右)
    `<ellipse cx="320" cy="172" rx="72" ry="26" fill="#8f8880"/>` +
    `<ellipse cx="320" cy="174" rx="58" ry="20" fill="#a89a7c"/>` +
    `<ellipse cx="320" cy="176" rx="44" ry="14" fill="#8f8880"/>` +
    `<ellipse cx="320" cy="178" rx="30" ry="9" fill="#9a9084"/>` +
    `<g stroke="#6f6960" stroke-width="1.4" fill="none"><path d="M320,146v52M248,172h144"/></g>` +
    // 手前の草と石
    band(196, 14, "#8fa85f") +
    ichu(30, 204, 8) +
    ichu(180, 206, 7) +
    `<ellipse cx="240" cy="204" rx="16" ry="6" fill="#8a8078"/>` +
    // 基壇に上る石段
    `<g fill="#9a9490"><rect x="96" y="174" width="46" height="4"/><rect x="102" y="170" width="40" height="4"/><rect x="108" y="166" width="34" height="4"/><rect x="114" y="162" width="28" height="4"/><rect x="120" y="158" width="22" height="4"/></g>` +
    `<g stroke="#6f6960" stroke-width="1" opacity=".7" fill="none"><path d="M96,174h46M102,170h40M108,166h34M114,162h28"/></g>` +
    // もう2つの石の頭(高さを変えて壁に嵌める)
    `<circle cx="30" cy="136" r="7" fill="#a29a90"/>` +
    `<circle cx="30" cy="136" r="7" stroke="#6f6960" stroke-width="1.2" fill="none"/>` +
    `<g fill="#6f6960"><circle cx="27.6" cy="134.6" r="1.4"/><circle cx="32.4" cy="134.6" r="1.4"/><path d="M27,139h6v1.6h-6z"/></g>` +
    `<circle cx="72" cy="152" r="6" fill="#a29a90"/>` +
    `<circle cx="72" cy="152" r="6" stroke="#6f6960" stroke-width="1.2" fill="none"/>` +
    // 立石(広場の中心)
    `<path d="M316,166V138l5,-4l5,4v28z" fill="#7f7a72"/>` +
    `<g stroke="#5f5a52" stroke-width="1" opacity=".8" fill="none"><path d="M316,148h10M316,156h10"/></g>` +
    // 神殿へ続く水路と、草を食むリャマ
    `<g stroke="#5f9fb8" stroke-width="3" opacity=".7" fill="none"><path d="M0,192h150"/></g>` +
    alpaca(216, 200, 0.7, "#c9b8a0") +
    ichu(266, 202, 7) +
    ichu(120, 200, 8),

  /**
   * 雲霧林の尾根。チャチャポヤス。
   * 霧に浮かぶ丸い石壁と、垂れ下がる着生植物。
   */
  cloudforest:
    sky("#8fa8b8", "#dfe4e0", 118) +
    haze(120, 96, 150, 26, "#e6ecea") +
    haze(310, 110, 130, 22, "#e0e8e4") +
    ridge(106, 7, "#4f7a52", 118, 5) +
    ground(118, "#3f6f42") +
    // 尾根の丸い石壁(左右)
    `<path d="M0,150q10,-34 46,-34q36,0 46,34z" fill="#8f8880"/>` +
    `<g stroke="#6f6960" stroke-width="1.4" opacity=".8" fill="none"><path d="M4,132h84M2,142h88M14,120h58"/></g>` +
    `<path d="M300,152q12,-38 52,-38q40,0 48,38z" fill="#8f8880"/>` +
    `<g stroke="#6f6960" stroke-width="1.4" opacity=".8" fill="none"><path d="M304,134h94M302,144h98"/></g>` +
    // 細い入口(この要塞の特徴)
    `<path d="M46,150v-22a7,7 0 0 1 14,0v22z" fill="#2f3230"/>` +
    haze(200, 148, 200, 16, "#e6ecea") +
    // 手前の雲霧林
    band(160, 50, "#2f5f3a") +
    jungleTree(28, 186, 44, "#3f7a44") +
    jungleTree(70, 192, 36, "#4f8a4a") +
    jungleTree(330, 188, 42, "#3f7a44") +
    jungleTree(372, 194, 34, "#4f8a4a") +
    // 着生植物(垂れ下がる)
    `<g stroke="#7fae5a" stroke-width="2.4" fill="none" stroke-linecap="round"><path d="M110,160v18M124,160v26M138,160v14M262,160v22M276,160v14M290,160v20"/></g>` +
    `<g fill="#c8506a"><circle cx="124" cy="188" r="3.4"/><circle cx="276" cy="176" r="3"/></g>` +
    haze(200, 200, 220, 14, "#dfe8e4") +
    // 尾根に続く石壁の列(奥にもう2つ)
    `<path d="M108,146q8,-22 30,-22q22,0 28,22z" fill="#9a938a"/>` +
    `<g stroke="#7a746c" stroke-width="1.2" opacity=".7" fill="none"><path d="M112,134h52M110,140h56"/></g>` +
    `<path d="M232,148q8,-20 28,-20q20,0 26,20z" fill="#9a938a"/>` +
    `<g stroke="#7a746c" stroke-width="1.2" opacity=".7" fill="none"><path d="M236,138h48"/></g>` +
    // 壁を上る石段
    `<g fill="#a29a90"><rect x="88" y="146" width="20" height="3.4"/><rect x="92" y="141" width="18" height="3.4"/><rect x="96" y="136" width="16" height="3.4"/></g>` +
    // 尾根を這う道
    `<g stroke="#a89a7c" stroke-width="3" opacity=".6" fill="none"><path d="M0,158q80,-12 170,-4q90,8 230,-6"/></g>` +
    // 蘭とブロメリア(手前)
    `<g fill="#e8b21c"><circle cx="52" cy="176" r="3"/><circle cx="308" cy="180" r="2.6"/></g>` +
    `<g stroke="#5f9f4a" stroke-width="2" fill="none" stroke-linecap="round"><path d="M52,180v8M308,184v6M170,182v10M186,180v12M202,184v8"/></g>` +
    `<g fill="#c8506a"><circle cx="186" cy="178" r="3"/></g>` +
    // 霧を抜ける鳥
    gull(150, 68, 0.8) +
    gull(250, 80, 0.7) +
    haze(80, 168, 90, 10, "#e6ecea"),

  /**
   * 道路の無い渓谷の町。マチュピチュ・プエブロ。
   * 切り立った両壁のあいだに川と線路だけが通る。**車の通れる道は描かない。**
   */
  gorgetown:
    sky("#4f8fd0", "#c8dce4", 60) +
    // 迫る両壁
    `<path d="M0,60h96q18,40 6,150H0z" fill="#4f6f4a"/>` +
    `<path d="M0,60h72q14,34 4,150H0z" fill="#3f5f3c"/>` +
    `<path d="M400,60h-104q-20,44 -8,150h112z" fill="#4f6f4a"/>` +
    `<path d="M400,60h-80q-16,38 -6,150h86z" fill="#3f5f3c"/>` +
    ground(60, "#7f9a6a") +
    // 谷底
    `<path d="M76,210q22,-118 34,-150h180q14,36 34,150z" fill="#8f9a72"/>` +
    // 川
    `<path d="M150,210q8,-70 14,-100h72q8,32 16,100z" fill="#6f9ab0"/>` +
    `<g stroke="#bfe0e8" stroke-width="2" opacity=".6" fill="none"><path d="M168,150h28M162,178h44"/></g>` +
    // 線路(左壁沿いにだけ通る)
    `<path d="M108,210q10,-72 18,-104" stroke="#5a5a60" stroke-width="4" fill="none"/>` +
    `<g fill="#6b5a44"><rect x="112" y="186" width="14" height="5" rx="1"/><rect x="116" y="166" width="13" height="5" rx="1"/><rect x="119" y="146" width="12" height="5" rx="1"/><rect x="122" y="128" width="11" height="5" rx="1"/></g>` +
    // 川沿いの家(右手前)
    `<g fill="#d8b483"><rect x="256" y="176" width="34" height="24"/><rect x="294" y="182" width="28" height="18"/></g>` +
    `<g fill="#b8613c"><path d="M252,176h42l-5,-8h-32zM290,182h36l-5,-7h-26z"/></g>` +
    `<g fill="#5c7080"><rect x="264" y="184" width="9" height="10"/><rect x="302" y="188" width="8" height="8"/></g>` +
    // 崖のシダ
    `<g stroke="#5f9f4a" stroke-width="2.4" fill="none" stroke-linecap="round"><path d="M36,120q10,-8 8,-20M46,140q12,-8 10,-20M28,164q10,-8 8,-18M356,126q-10,-8 -8,-20M346,148q-12,-8 -10,-20"/></g>` +
    jungleTree(60, 206, 34, "#3f7a44") +
    jungleTree(348, 208, 30, "#3f7a44") +
    // 線路を来る列車。**この町へ入る唯一の乗り物。**
    `<g fill="#1f6fb0"><rect x="106" y="140" width="26" height="16" rx="3"/></g>` +
    `<rect x="106" y="140" width="26" height="4" fill="#e8b21c"/>` +
    `<g fill="#cfe4f0"><rect x="110" y="146" width="7" height="6"/><rect x="120" y="146" width="7" height="6"/></g>` +
    `<circle cx="119" cy="158" r="2.6" fill="#3a3a3e"/>` +
    // 白く砕ける流れ
    `<g fill="#e8f2f4" opacity=".8"><ellipse cx="176" cy="160" rx="12" ry="4"/><ellipse cx="190" cy="184" rx="14" ry="5"/><ellipse cx="180" cy="204" rx="16" ry="5"/></g>` +
    // 川に架かる細い吊り橋
    `<path d="M138,168q62,10 124,-2" fill="none" stroke="#8a6a46" stroke-width="2.4"/>` +
    `<path d="M138,176q62,10 124,-2" fill="none" stroke="#8a6a46" stroke-width="3.4"/>` +
    `<g stroke="#8a6a46" stroke-width="1.2" fill="none"><path d="M162,171v6M186,174v6M210,174v6M234,172v6"/></g>` +
    // 崖に張りつく家(左)と、階段
    `<g fill="#d8b483"><rect x="86" y="150" width="26" height="18"/></g>` +
    `<path d="M82,150h34l-4,-7h-26z" fill="#b8613c"/>` +
    `<rect x="94" y="156" width="8" height="12" fill="#5c7080"/>` +
    `<g fill="#a89a7c"><rect x="270" y="200" width="30" height="4"/><rect x="276" y="194" width="26" height="4"/><rect x="282" y="188" width="22" height="4"/></g>` +
    // 崖に垂れる蔓と鳥
    `<g stroke="#5f9f4a" stroke-width="1.8" fill="none" stroke-linecap="round"><path d="M20,80v22M44,74v18M366,86v20M384,78v16"/></g>` +
    gull(200, 74, 0.7),

  /**
   * チチカカ湖畔。プーノ / デサグアデロ。
   * 濃い青の湖、トトラの茂み、葦の島、対岸の低い丘。
   */
  titicaca:
    sky("#3f86cc", "#c4dcea", 108) +
    clouds(80, 26, 1) +
    clouds(320, 24, 0.9) +
    ridge(98, 5, "#9a8f6a", 108, 7) +
    ground(108, "#2f7fae") +
    band(108, 10, "#3f92c0") +
    ripples(130) +
    // 葦の島(左)
    `<ellipse cx="60" cy="164" rx="60" ry="16" fill="#c9b479"/>` +
    `<ellipse cx="60" cy="160" rx="48" ry="11" fill="#d8c48a"/>` +
    `<path d="M34,158v-14a12,10 0 0 1 24,0v14z" fill="#b5a267"/>` +
    `<path d="M30,144h32l-16,-10z" fill="#a89258"/>` +
    `<path d="M74,160v-10a9,8 0 0 1 18,0v10z" fill="#b5a267"/>` +
    // 岸辺(手前)
    band(186, 24, "#a89a7c") +
    `<path d="M0,186q100,-10 200,-2q100,8 200,-4v6H0z" fill="#b8ab90"/>` +
    // トトラの茂み(左右)
    totora(18, 190, 34) +
    totora(44, 194, 28) +
    totora(340, 190, 32) +
    totora(370, 194, 26) +
    // 葦舟と小舟
    `<path d="M250,176q26,-8 52,0q-6,10 -26,10q-20,0 -26,-10z" fill="#c9b479"/>` +
    `<path d="M250,176q10,-6 4,-14M302,176q-10,-6 -4,-14" stroke="#b5a267" stroke-width="4" fill="none"/>` +
    fishingBoat(120, 178, 0.7, "#c8102e") +
    gull(90, 46, 1) +
    gull(300, 56, 0.9) +
    // 岸の町(右)。教会と桟橋
    `<g fill="#c9a878"><rect x="316" y="140" width="30" height="20"/><rect x="352" y="146" width="26" height="14"/></g>` +
    `<g fill="#b8613c"><path d="M312,140h38l-5,-7h-28zM348,146h34l-5,-6h-24z"/></g>` +
    churchTower(300, 160, 40) +
    `<rect x="252" y="168" width="70" height="5" fill="#8a6a46"/>` +
    `<g fill="#8a6a46"><rect x="258" y="173" width="4" height="14"/><rect x="304" y="173" width="4" height="14"/></g>` +
    // 葦の島の上の小屋と、もう1艘の葦舟
    `<path d="M40,150v-8a7,6 0 0 1 14,0v8z" fill="#c2ac6e"/>` +
    `<path d="M36,142h22l-11,-8z" fill="#a89258"/>` +
    `<path d="M130,158q20,-6 40,0q-5,8 -20,8q-15,0 -20,-8z" fill="#c9b479"/>` +
    `<path d="M130,158q8,-5 3,-11M170,158q-8,-5 -3,-11" stroke="#b5a267" stroke-width="3" fill="none"/>` +
    // 湖に立つ漁の柵と、水鳥
    `<g fill="#8a6a46"><rect x="196" y="150" width="3" height="18"/><rect x="216" y="146" width="3" height="22"/><rect x="236" y="152" width="3" height="16"/></g>` +
    `<g stroke="#a89258" stroke-width="1.2" opacity=".8" fill="none"><path d="M196,154h43M196,160h43"/></g>` +
    `<g fill="#f0f6f4"><ellipse cx="330" cy="182" rx="7" ry="4"/><path d="M334,179q5,-2 7,2l-7,1z"/></g>` +
    // 手前の織物を広げた敷物
    `<g fill="#c8102e"><rect x="150" y="192" width="54" height="7"/></g>` +
    `<g fill="#e8b21c"><rect x="150" y="199" width="54" height="6"/></g>` +
    `<g fill="#1f6fb0"><rect x="150" y="205" width="54" height="5"/></g>` +
    ichu(240, 200, 8),

  /**
   * 高原の鉄道の町。フリアカ / シクアニ。
   * 平らな高原に線路が通り、煉瓦と鉄板の建物が並ぶ。遠くに雪の稜線。
   */
  altiplanotown:
    sky("#3f86cc", "#cfdce0", 118) +
    clouds(300, 28, 1) +
    `<path d="M0,118L52,86L96,110L150,80L206,108L260,84L318,112L366,88L400,110v8z" fill="#9aa0aa"/>` +
    `<path d="M52,86l-12,14q8,4 14,-2q6,-4 12,2zM150,80l-14,16q10,4 16,-2q6,-4 12,2zM260,84l-12,14q8,4 14,-2q6,-4 12,2zM366,88l-10,12q8,4 12,-2z" fill="#f2f6f8"/>` +
    ground(118, "#b5a267") +
    ichuField(132, 7, 56, 8) +
    // 建物(左右)
    `<g fill="#b06a4a"><rect x="0" y="128" width="46" height="30"/><rect x="50" y="134" width="36" height="24"/><rect x="316" y="126" width="44" height="32"/><rect x="364" y="132" width="36" height="26"/></g>` +
    `<g fill="#8f9298"><path d="M-2,128h50l-5,-6H3zM48,134h40l-4,-5H52zM314,126h48l-5,-6h-38zM362,132h40l-4,-5h-32z"/></g>` +
    `<g fill="#41474e" opacity=".75"><rect x="8" y="136" width="10" height="11"/><rect x="24" y="136" width="10" height="11"/><rect x="326" y="134" width="10" height="11"/><rect x="344" y="134" width="10" height="11"/></g>` +
    // 3本の線路
    railTrack(166, 0, 400) +
    railTrack(186, 0, 400) +
    `<g stroke="#5a5a60" stroke-width="2" fill="none"><path d="M120,166L220,186M300,166L200,186"/></g>` +
    // 露店の日よけ(手前)
    `<path d="M0,178h96l-6,-12H6z" fill="#c8102e"/>` +
    `<g fill="#8a6a46"><rect x="6" y="178" width="4" height="16"/><rect x="86" y="178" width="4" height="16"/></g>` +
    `<rect x="18" y="182" width="26" height="9" fill="#e8b21c"/>` +
    `<rect x="50" y="184" width="26" height="7" fill="#1f6fb0"/>` +
    `<path d="M304,180h96l-6,-12h-84z" fill="#3f9f7f"/>` +
    `<g fill="#8a6a46"><rect x="310" y="180" width="4" height="15"/><rect x="390" y="180" width="4" height="15"/></g>` +
    ichu(160, 202, 8) +
    ichu(250, 206, 7),

  /**
   * 高原の牧場。アヤビリ。
   * 石を積んだ囲いとアルパカ・羊、凍てついた草、遠くの雪。
   */
  altiplanoranch:
    sky("#3f86cc", "#d4dce0", 114) +
    clouds(100, 24, 1) +
    `<path d="M0,114L60,88L120,110L190,84L260,108L330,86L400,108v6z" fill="#9aa0aa"/>` +
    `<path d="M60,88l-12,12q8,4 12,-2q5,-3 10,2zM190,84l-12,14q8,4 13,-2q5,-3 10,2zM330,86l-10,12q7,4 11,-2z" fill="#f2f6f8"/>` +
    ground(114, "#b5a267") +
    band(140, 70, "#c2b077") +
    ichuField(128, 7, 56, 9) +
    ichuField(160, 6, 66, 10) +
    // 石を積んだ囲い
    `<path d="M0,168h130v10H0z" fill="#8f8880"/>` +
    `<g fill="#a29a90"><rect x="6" y="162" width="16" height="6"/><rect x="34" y="162" width="16" height="6"/><rect x="62" y="162" width="16" height="6"/><rect x="90" y="162" width="16" height="6"/><rect x="114" y="162" width="14" height="6"/></g>` +
    `<path d="M300,172h100v10H300z" fill="#8f8880"/>` +
    `<g fill="#a29a90"><rect x="306" y="166" width="16" height="6"/><rect x="334" y="166" width="16" height="6"/><rect x="362" y="166" width="16" height="6"/></g>` +
    // アルパカと羊
    alpaca(46, 200, 1.1) +
    alpaca(104, 206, 0.9, "#c9b8a0") +
    `<g fill="#efe8dc"><ellipse cx="330" cy="196" rx="14" ry="9"/><rect x="322" y="202" width="3" height="7"/><rect x="336" y="202" width="3" height="7"/></g>` +
    `<ellipse cx="344" cy="190" rx="5" ry="4" fill="#5f5346"/>` +
    `<g fill="#efe8dc"><ellipse cx="366" cy="202" rx="11" ry="7"/><rect x="360" y="206" width="3" height="5"/><rect x="371" y="206" width="3" height="5"/></g>` +
    `<ellipse cx="376" cy="197" rx="4" ry="3" fill="#5f5346"/>` +
    adobeHouse(150, 168, 34, 22, "#c08f5c", "#8f9298"),

  /**
   * アマゾンの川港。イキトス / プカルパ / ユリマグアス。
   * **川は泥の色。青くしない。**二階建ての木造船、高床の家、背に密林。
   */
  riverport:
    sky("#8fc4e8", "#dfe4d4", 112) +
    clouds(70, 26, 1) +
    clouds(320, 30, 1.1) +
    // 密林の帯
    band(100, 12, "#2f6f3a") +
    ground(112, "#3f7a42") +
    jungleTree(24, 112, 46) +
    jungleTree(62, 110, 38) +
    jungleTree(330, 112, 44) +
    jungleTree(372, 110, 36) +
    // 泥の川
    band(126, 84, "#8a7a52") +
    band(126, 8, "#9a8a5e") +
    `<g stroke="#a89868" stroke-width="2" opacity=".55" fill="none"><path d="M20,146h74M240,158h110M60,190h84M280,196h100"/></g>` +
    // 高床の家(左)
    stiltHouse(10, 152, 54, 26) +
    stiltHouse(70, 156, 42, 22, "#b8945e") +
    // 桟橋と二階建ての船(右)
    `<rect x="256" y="150" width="132" height="6" fill="#8a6a46"/>` +
    `<g fill="#8a6a46"><rect x="262" y="156" width="5" height="18"/><rect x="316" y="156" width="5" height="18"/><rect x="376" y="156" width="5" height="18"/></g>` +
    riverBoat(272, 190, 1.05) +
    // 小舟(手前左)
    `<path d="M20,196h64l-8,8H30z" fill="#c9503c"/>` +
    `<path d="M46,190l6,6h-12z" fill="#8a6a46"/>` +
    `<g fill="#3f4a52"><rect x="34" y="182" width="6" height="12" rx="2"/><circle cx="37" cy="179" r="3.4"/></g>` +
    gull(120, 60, 0.9) +
    gull(150, 48, 0.8),

  /**
   * 採掘で削られた熱帯林。プエルト・マルドナード。
   * 水の溜まった穴が並び、森の縁が後退している。**荒れた姿はここにだけ置く。**
   */
  goldjungle:
    sky("#8fc4e8", "#e4e0cc", 108) +
    haze(200, 92, 200, 20, "#e8e2cc") +
    // 残った森(奥の帯)
    band(96, 12, "#2f6f3a") +
    ground(108, "#3f7a42") +
    jungleTree(20, 108, 40) +
    jungleTree(56, 106, 32) +
    jungleTree(352, 108, 38) +
    jungleTree(386, 106, 30) +
    // 削られた地面
    `<path d="M0,124q90,-14 200,-6q110,8 200,-6v98H0z" fill="#c9b48e"/>` +
    `<path d="M0,140q100,-10 200,-2q100,8 200,-8v80H0z" fill="#d8c49e"/>` +
    // 水の溜まった穴(左右に)
    `<ellipse cx="58" cy="168" rx="52" ry="18" fill="#9a8a62"/>` +
    `<ellipse cx="58" cy="170" rx="40" ry="12" fill="#6f9a8a"/>` +
    `<ellipse cx="330" cy="176" rx="60" ry="20" fill="#9a8a62"/>` +
    `<ellipse cx="330" cy="178" rx="46" ry="13" fill="#6f9a8a"/>` +
    `<ellipse cx="196" cy="200" rx="56" ry="14" fill="#9a8a62"/>` +
    `<ellipse cx="196" cy="201" rx="42" ry="9" fill="#7fa898"/>` +
    // 切り株
    `<g fill="#8a6a46"><rect x="128" y="150" width="10" height="14" rx="2"/><rect x="270" y="146" width="9" height="13" rx="2"/><rect x="106" y="188" width="11" height="15" rx="2"/></g>` +
    `<g fill="#a8845c"><ellipse cx="133" cy="150" rx="6" ry="2.4"/><ellipse cx="274.5" cy="146" rx="5.4" ry="2.2"/><ellipse cx="111.5" cy="188" rx="6.4" ry="2.6"/></g>` +
    // 掘った土の山と、砂利を洗う樋
    `<path d="M140,196q26,-22 54,0z" fill="#b8a074"/>` +
    `<path d="M228,164l52,-12l3,9l-52,12z" fill="#8f9298"/>` +
    `<g stroke="#6f7278" stroke-width="1.6" fill="none"><path d="M240,164l2,7M258,160l2,7M276,156l2,7"/></g>` +
    // 小さな穴がいくつも続く
    `<ellipse cx="128" cy="132" rx="26" ry="8" fill="#9a8a62"/>` +
    `<ellipse cx="128" cy="133" rx="19" ry="5" fill="#6f9a8a"/>` +
    `<ellipse cx="256" cy="140" rx="30" ry="9" fill="#9a8a62"/>` +
    `<ellipse cx="256" cy="141" rx="22" ry="6" fill="#6f9a8a"/>` +
    // 掘り上げた土の畝
    `<g fill="#c2a878"><path d="M30,158q22,-16 46,0zM212,164q20,-14 42,0zM300,152q18,-12 38,0z"/></g>` +
    // ホースとポンプ
    `<g fill="#3f4a52"><rect x="292" y="186" width="20" height="12" rx="2"/></g>` +
    `<path d="M292,192q-30,6 -60,-4" fill="none" stroke="#5f5a52" stroke-width="3"/>` +
    `<path d="M312,190q22,-4 34,-10" fill="none" stroke="#5f5a52" stroke-width="3"/>` +
    // 残った森から飛び立つ鳥
    gull(80, 60, 1) +
    gull(112, 74, 0.8) +
    gull(300, 66, 0.9) +
    // 積んだ袋と、水面に映る空
    `<g fill="#c9b48e"><rect x="58" y="192" width="22" height="14" rx="4"/><rect x="82" y="196" width="20" height="10" rx="4"/></g>` +
    `<g fill="#8fbcae" opacity=".6"><ellipse cx="46" cy="166" rx="14" ry="3.4"/><ellipse cx="318" cy="174" rx="16" ry="4"/></g>`,

  /**
   * 開拓前線のコーヒー・カカオ農地。タラポト / サティポ。
   * 森を切り開いた斜面に畝が並び、乾燥棚に豆が広げてある。
   */
  junglefrontier:
    sky("#8fc4e8", "#dfe4cc", 110) +
    clouds(300, 28, 1) +
    // 奥の森の稜線
    ridge(100, 6, "#2f6f3a", 110, 4) +
    ground(110, "#4f8a44") +
    jungleTree(18, 116, 40) +
    jungleTree(52, 112, 32) +
    jungleTree(360, 116, 38) +
    jungleTree(390, 112, 30) +
    // 切り開いた斜面の畝
    `<path d="M0,126h400v40H0z" fill="#6f9a44"/>` +
    `<g stroke="#4f7a30" stroke-width="3" opacity=".7" fill="none"><path d="M0,132h400M0,142h400M0,152h400M0,162h400"/></g>` +
    // 森と農地の境目(**開拓前線そのもの**)
    `<path d="M0,126q40,-8 80,0q40,8 80,0q40,-8 80,0q40,8 80,0q40,-8 80,0v6H0z" fill="#3f7a42"/>` +
    // 乾燥棚(手前左)
    band(166, 44, "#a89a6c") +
    `<rect x="6" y="176" width="120" height="8" fill="#8a6a46"/>` +
    `<g fill="#8a6a46"><rect x="12" y="184" width="5" height="18"/><rect x="114" y="184" width="5" height="18"/></g>` +
    `<g fill="#6b4a2a"><circle cx="24" cy="174" r="3"/><circle cx="36" cy="173" r="3"/><circle cx="48" cy="174" r="3"/><circle cx="60" cy="173" r="3"/><circle cx="72" cy="174" r="3"/><circle cx="84" cy="173" r="3"/><circle cx="96" cy="174" r="3"/><circle cx="108" cy="173" r="3"/></g>` +
    // カカオの木と実(手前右)
    `<rect x="336" y="166" width="6" height="38" fill="#6b5330"/>` +
    `<ellipse cx="339" cy="164" rx="26" ry="14" fill="#2f7a3f"/>` +
    `<g fill="#e8901c"><ellipse cx="328" cy="180" rx="5" ry="9"/><ellipse cx="350" cy="186" rx="5" ry="9"/></g>` +
    `<g fill="#c8641c"><ellipse cx="340" cy="176" rx="4.4" ry="8"/></g>` +
    // 積んだ麻袋
    `<g fill="#c9b48e"><rect x="230" y="182" width="26" height="20" rx="4"/><rect x="260" y="186" width="24" height="16" rx="4"/></g>` +
    // 焼き払った跡(前線が森を押している証拠)
    `<g fill="#7f6a52" opacity=".8"><ellipse cx="196" cy="130" rx="34" ry="7"/></g>` +
    `<g fill="#5f5346"><rect x="180" y="120" width="4" height="10"/><rect x="200" y="118" width="4" height="12"/><rect x="216" y="122" width="4" height="8"/></g>` +
    // コーヒーの木の列(中景)
    `<g fill="#4f8b38"><circle cx="30" cy="150" r="7"/><circle cx="58" cy="152" r="7"/><circle cx="86" cy="150" r="7"/><circle cx="300" cy="152" r="7"/><circle cx="328" cy="150" r="7"/></g>` +
    `<g fill="#c8102e"><circle cx="27" cy="148" r="1.8"/><circle cx="55" cy="150" r="1.8"/><circle cx="83" cy="148" r="1.8"/><circle cx="297" cy="150" r="1.8"/><circle cx="325" cy="148" r="1.8"/></g>` +
    `<g fill="#6b5330"><rect x="29" y="156" width="2.4" height="6"/><rect x="57" y="158" width="2.4" height="6"/><rect x="85" y="156" width="2.4" height="6"/></g>` +
    // 農具と一輪車
    `<g stroke="#8a6a46" stroke-width="2.4" fill="none"><path d="M150,204v-20"/></g>` +
    `<path d="M144,184h12l-6,-8z" fill="#8f949c"/>` +
    `<g fill="#c8102e"><path d="M176,196h30l-4,10h-22z"/></g>` +
    `<circle cx="180" cy="208" r="4" fill="#3a3a3e"/>` +
    // 森から出てくる鳥
    gull(120, 52, 0.9) +
    gull(266, 44, 0.8),

  /**
   * マングローブの海岸。トゥンベス。
   * 支柱根の並ぶ水路と、エビの養殖池。砂漠の海岸との境目でもある。
   */
  mangrovecoast:
    sky("#8fc4e8", "#e0e4d4", 104) +
    clouds(80, 26, 1) +
    gull(310, 46, 1) +
    gull(340, 58, 0.8) +
    ground(104, "#5f8f5a") +
    // 奥のマングローブの帯
    band(96, 14, "#2f6f4a") +
    `<g fill="#3f8a5a"><ellipse cx="40" cy="102" rx="42" ry="16"/><ellipse cx="130" cy="100" rx="46" ry="15"/><ellipse cx="300" cy="102" rx="44" ry="16"/><ellipse cx="380" cy="100" rx="34" ry="14"/></g>` +
    // 水路
    band(120, 40, "#5f8f8a") +
    `<g stroke="#8fbcb4" stroke-width="2" opacity=".55" fill="none"><path d="M20,132h70M270,142h110"/></g>` +
    // 支柱根(左右)
    `<g stroke="#6b5330" stroke-width="3" fill="none" stroke-linecap="round">` +
    `<path d="M22,120v40M22,140l-14,20M22,140l14,20M52,118v42M52,142l-13,18M52,142l13,18M84,122v38M84,144l-12,16M84,144l12,16"/>` +
    `<path d="M320,124v36M320,144l-13,16M320,144l13,16M352,120v40M352,142l-14,18M352,142l14,18M384,124v36M384,146l-12,14"/>` +
    `</g>` +
    `<g fill="#3f8a5a"><ellipse cx="22" cy="118" rx="20" ry="9"/><ellipse cx="52" cy="116" rx="22" ry="10"/><ellipse cx="84" cy="120" rx="18" ry="8"/><ellipse cx="320" cy="122" rx="19" ry="9"/><ellipse cx="352" cy="118" rx="21" ry="10"/><ellipse cx="384" cy="122" rx="17" ry="8"/></g>` +
    // 手前: エビの養殖池
    band(160, 50, "#c9b48e") +
    `<rect x="0" y="168" width="400" height="34" fill="#6f9aa8"/>` +
    `<rect x="0" y="164" width="400" height="5" fill="#a89a72"/>` +
    `<rect x="0" y="200" width="400" height="6" fill="#a89a72"/>` +
    `<g stroke="#8f9a72" stroke-width="4" fill="none"><path d="M130,164v42M270,164v42"/></g>` +
    `<g stroke="#9fd0d8" stroke-width="2" opacity=".5" fill="none"><path d="M20,180h80M290,186h90"/></g>` +
    `<g fill="#e8845c"><path d="M40,192q8,-6 16,0q-2,5 -8,5q-6,0 -8,-5z"/><path d="M330,178q7,-5 14,0q-2,4 -7,4q-5,0 -7,-4z"/></g>` +
    // 水路を行く細長い舟
    `<path d="M150,142h58l-8,7h-42z" fill="#8a6a46"/>` +
    `<g fill="#3f4a52"><rect x="166" y="132" width="6" height="10" rx="2"/><circle cx="169" cy="129" r="3.4"/></g>` +
    `<path d="M172,134l14,-8" stroke="#6b5330" stroke-width="2" fill="none"/>` +
    // もう一列の支柱根(中景)
    `<g stroke="#6b5330" stroke-width="2.4" fill="none" stroke-linecap="round">` +
    `<path d="M140,118v22M140,132l-10,14M140,132l10,14M188,116v24M188,132l-11,14M188,132l11,14M240,120v20M240,134l-10,12M240,134l10,12"/>` +
    `</g>` +
    `<g fill="#4f9f6a"><ellipse cx="140" cy="116" rx="17" ry="8"/><ellipse cx="188" cy="114" rx="18" ry="8"/><ellipse cx="240" cy="118" rx="16" ry="7"/></g>` +
    // 池の水門と、養殖池の見回りの小屋
    `<g fill="#8a6a46"><rect x="196" y="160" width="8" height="46"/></g>` +
    `<rect x="188" y="156" width="24" height="6" fill="#a89a72"/>` +
    `<rect x="20" y="150" width="30" height="14" fill="#c9b48e"/>` +
    `<path d="M16,150h38l-5,-7h-28z" fill="#8f9298"/>` +
    // 鷺と蟹
    `<g fill="#f0f6f4"><ellipse cx="290" cy="178" rx="7" ry="4.4"/><path d="M294,175q5,-2 7,2l-7,1z"/><rect x="288" y="182" width="1.6" height="7"/><rect x="292" y="182" width="1.6" height="7"/></g>` +
    `<path d="M300,173l5,-3" stroke="#e8b21c" stroke-width="1.6" fill="none"/>` +
    `<g fill="#c9503c"><ellipse cx="86" cy="196" rx="5" ry="3.4"/><path d="M81,194l-4,-3M91,194l4,-3M82,199l-4,3M90,199l4,3" stroke="#c9503c" stroke-width="1.4" fill="none"/></g>` +
    gull(150, 42, 0.9),

  /**
   * 乾いた海岸の町。ピウラ / プエルト・チカマ / タクナ。
   * 砂丘と、灌漑された細い緑の帯、太平洋。
   */
  desertcoast:
    sky("#8fc4e8", "#efe0c0", 112) +
    sun(64, 36, 19) +
    haze(240, 104, 180, 18, "#e8dcc0") +
    ground(112, "#d8bb87") +
    // 太平洋(奥)
    band(112, 28, "#2f6f8a") +
    `<path d="M0,140q60,-9 120,-2q70,9 140,-2q70,-8 140,2v8H0z" fill="#5fa0b4"/>` +
    `<g stroke="#a8d8e0" stroke-width="2" opacity=".55" fill="none"><path d="M20,124h84M220,130h110"/></g>` +
    // 砂浜
    band(148, 12, "#efe2c4") +
    ground(160, "#d8bb87") +
    // 灌漑された緑の帯(乾いた土地に一本だけ)
    band(166, 14, "#5f9f43") +
    `<g stroke="#4f8b38" stroke-width="2.4" opacity=".7" fill="none"><path d="M0,172h400"/></g>` +
    // 砂丘(左右)
    dune(70, 160, 170, 26, "#cfae76") +
    dune(330, 158, 150, 20, "#cfae76") +
    windRipples(186, "#c2a273") +
    // 町(左)と道
    adobeHouse(10, 200, 40, 24, "#e0c090", "#b8613c") +
    adobeHouse(56, 196, 32, 20, "#d8b483", "#b8613c") +
    band(200, 10, "#a89a7c") +
    `<g stroke="#efe2c4" stroke-width="2.6" stroke-dasharray="14 12" opacity=".6" fill="none"><path d="M0,205h400"/></g>` +
    cactus(300, 200, 30) +
    gull(120, 48, 1) +
    gull(300, 60, 0.9) +
    // 岬(右奥)と、そこへ寄せる波
    `<path d="M330,148q34,-16 70,-8v12z" fill="#c2a273"/>` +
    `<g fill="#efe2c4" opacity=".8"><ellipse cx="336" cy="150" rx="14" ry="4"/></g>` +
    // 町の続き。電柱が一本道に沿って並ぶ
    adobeHouse(96, 200, 28, 18, "#e0c090", "#b8613c") +
    adobeHouse(130, 198, 24, 16, "#d8b483", "#b8613c") +
    `<g fill="#8a7a62"><rect x="188" y="176" width="3" height="26"/><rect x="252" y="176" width="3" height="26"/><rect x="316" y="176" width="3" height="26"/></g>` +
    `<g fill="#8a7a62"><rect x="182" y="176" width="15" height="2.6"/><rect x="246" y="176" width="15" height="2.6"/><rect x="310" y="176" width="15" height="2.6"/></g>` +
    `<g stroke="#8a7a62" stroke-width="1" opacity=".8" fill="none"><path d="M189,179q32,5 64,0q32,-5 64,0"/></g>` +
    // 浜に引き上げた舟と、積んだ木箱
    `<path d="M32,158h44l-6,7H38z" fill="#c8102e"/>` +
    `<path d="M54,151l4,7h-8z" fill="#8a6a46"/>` +
    `<g fill="#a07a4c"><rect x="352" y="192" width="18" height="12"/><rect x="372" y="196" width="16" height="8"/></g>` +
    `<g fill="#5f9f43"><circle cx="220" cy="166" r="4"/><circle cx="238" cy="167" r="3.4"/><circle cx="256" cy="166" r="4"/></g>`,

  /**
   * 砂漠の中の日干し煉瓦の遺跡。トルヒージョ / ランバイェケ / カラル。
   * 段状の塚と、波・魚の浮彫のある壁。**インカではなく、それより古い土の建築。**
   */
  adoberuins:
    sky("#8fc4e8", "#efe0c0", 118) +
    sun(330, 38, 20) +
    haze(160, 110, 190, 16, "#e8dcc0") +
    ridge(108, 5, "#c2a273", 118, 6) +
    ground(118, "#d8bb87") +
    // 段状の塚(右)
    stepMound(320, 168, 150, 50) +
    `<g stroke="#a8875a" stroke-width="1.6" opacity=".6" fill="none"><path d="M250,152h140M262,135h116M274,118h92"/></g>` +
    `<path d="M320,168v-46" stroke="#b09060" stroke-width="8" fill="none"/>` +
    // 日干し煉瓦の壁(左)
    `<rect x="0" y="128" width="150" height="52" fill="#cfae7a"/>` +
    `<rect x="0" y="124" width="150" height="6" fill="#dcbc8c"/>` +
    adobeFrieze(6, 136, 138, 12) +
    adobeFrieze(6, 156, 138, 12, "#b8975f") +
    `<g stroke="#b8975f" stroke-width="1.4" opacity=".6" fill="none"><path d="M0,150h150M0,170h150"/></g>` +
    // 崩れた壁の切れ目
    `<path d="M150,180v-52l16,10v42z" fill="#bd9a68"/>` +
    // 手前の砂と土器の破片
    band(180, 30, "#d8bb87") +
    windRipples(188, "#c2a273") +
    `<g fill="#b07a4a"><path d="M40,200q10,-8 20,0q-4,6 -10,6q-6,0 -10,-6z"/><path d="M96,204q7,-5 14,0q-3,4 -7,4q-4,0 -7,-4z"/></g>` +
    `<ellipse cx="200" cy="202" rx="18" ry="6" fill="#8a7a62" opacity=".8"/>` +
    // 塚に上る土のスロープ
    `<path d="M258,168l-46,0l58,-40h12z" fill="#b8975f"/>` +
    `<g stroke="#a8875a" stroke-width="1.2" opacity=".7" fill="none"><path d="M226,160l52,-36M238,152l48,-32M250,144l44,-30"/></g>` +
    // 塚の頂の部屋
    `<rect x="304" y="106" width="32" height="14" fill="#d4b488"/>` +
    `<rect x="308" y="110" width="9" height="10" fill="#8a7452"/>` +
    // 壁の壁龕(かべのくぼみ)
    `<g fill="#b8975f"><rect x="14" y="140" width="12" height="16"/><rect x="46" y="140" width="12" height="16"/><rect x="78" y="140" width="12" height="16"/><rect x="110" y="140" width="12" height="16"/></g>` +
    `<g fill="#a8875a"><path d="M14,140h12l-6,-5zM46,140h12l-6,-5zM78,140h12l-6,-5zM110,140h12l-6,-5z"/></g>` +
    // 崩れかけた第2の壁と、その影
    `<path d="M178,180v-34h44v34z" fill="#c9a878"/>` +
    `<path d="M178,146h44l-8,-6h-28z" fill="#d4b488"/>` +
    `<g stroke="#b8975f" stroke-width="1.4" opacity=".7" fill="none"><path d="M178,158h44M178,170h44M200,146v34"/></g>` +
    `<path d="M222,180l14,-6v6z" fill="#bd9a68"/>` +
    // 積んだ日干し煉瓦と、掘り出した土器
    `<g fill="#c9a878"><rect x="130" y="190" width="14" height="6"/><rect x="132" y="196" width="14" height="6"/><rect x="128" y="202" width="14" height="6"/></g>` +
    `<g fill="#b07a4a"><path d="M256,206q9,-7 18,0q-4,5 -9,5q-5,0 -9,-5z"/></g>` +
    `<g fill="#a8875a" opacity=".7"><ellipse cx="70" cy="196" rx="20" ry="5"/><ellipse cx="330" cy="200" rx="26" ry="6"/></g>`,

  /**
   * 漁で生きる海岸の町。ワンチャコ / チンボテ。
   * 冷たい海と漁船、砂に立てた舟、かもめ。
   */
  fishingtown:
    sky("#a8bcc8", "#dfe0d4", 106) +
    haze(200, 88, 210, 20, "#dfe4e0") +
    gull(60, 40, 1.1) +
    gull(96, 54, 0.9) +
    gull(310, 42, 1) +
    gull(344, 56, 0.8) +
    ground(106, "#2f6f8a") +
    // 海
    band(106, 62, "#2f6f8a") +
    band(106, 8, "#3f83a0") +
    `<g stroke="#a8d8e0" stroke-width="2" opacity=".5" fill="none"><path d="M14,124h80M240,132h120M60,150h90"/></g>` +
    // 波打ち際
    `<path d="M0,168q56,-10 112,-2q60,9 120,-2q60,-9 168,2v10H0z" fill="#dfe8e4"/>` +
    ground(176, "#c9b48e") +
    // 漁船(左右)
    fishingBoat(60, 152, 1, "#c8102e") +
    fishingBoat(316, 158, 0.9, "#1f6fb0") +
    fishingBoat(360, 148, 0.7, "#3f9f7f") +
    // 砂に立てた舟と網
    `<path d="M28,204q-2,-30 8,-40q10,10 8,40z" fill="#c9b479"/>` +
    `<g stroke="#a89258" stroke-width="1.4" fill="none"><path d="M32,196h8M31,186h10M33,176h6"/></g>` +
    `<path d="M56,204q-2,-26 7,-35q9,9 7,35z" fill="#d8c48a"/>` +
    `<g fill="#8a6a46"><rect x="330" y="184" width="4" height="22"/><rect x="380" y="184" width="4" height="22"/></g>` +
    `<path d="M332,188h50v14h-50z" fill="none" stroke="#c9b48e" stroke-width="1.4"/>` +
    `<g stroke="#c9b48e" stroke-width="1" opacity=".8" fill="none"><path d="M332,194h50M344,188v14M358,188v14M370,188v14"/></g>` +
    `<g fill="#8f9aa0"><ellipse cx="150" cy="198" rx="12" ry="4"/><ellipse cx="178" cy="203" rx="9" ry="3.4"/></g>` +
    // 桟橋
    `<rect x="86" y="164" width="128" height="6" fill="#8a6a46"/>` +
    `<g fill="#8a6a46"><rect x="94" y="170" width="5" height="16"/><rect x="140" y="170" width="5" height="16"/><rect x="186" y="170" width="5" height="16"/></g>` +
    `<g fill="#6b5330"><rect x="86" y="160" width="128" height="3"/></g>` +
    // 沖の漁船団(小さく並べる)
    `<g fill="#c8102e"><path d="M180,132h20l-3,4h-14z"/></g>` +
    `<g fill="#1f6fb0"><path d="M212,128h18l-3,4h-12z"/></g>` +
    `<g fill="#efe7d4"><rect x="186" y="126" width="7" height="6"/><rect x="217" y="122" width="6" height="6"/></g>` +
    // 浜の木箱と、干した魚
    `<g fill="#a07a4c"><rect x="216" y="186" width="24" height="14"/><rect x="244" y="190" width="20" height="10"/><rect x="220" y="176" width="20" height="10"/></g>` +
    `<g stroke="#8a6a46" stroke-width="1.2" opacity=".7" fill="none"><path d="M216,193h24M244,195h20"/></g>` +
    `<g fill="#8a6a46"><rect x="272" y="176" width="3" height="26"/><rect x="308" y="176" width="3" height="26"/></g>` +
    `<path d="M273,180h36" stroke="#c9b48e" stroke-width="1.4" fill="none"/>` +
    `<g fill="#b8c4c8"><path d="M278,180l5,7l-5,3zM290,180l5,7l-5,3zM302,180l5,7l-5,3z"/></g>` +
    // ペリカン(この海岸のかもめより大きい鳥)
    `<g fill="#e8e2d4"><ellipse cx="120" cy="184" rx="11" ry="6"/><path d="M128,180q8,-2 10,3l-10,3z" fill="#e8b21c"/></g>` +
    `<g fill="#8a8478"><rect x="116" y="189" width="2" height="6"/><rect x="122" y="189" width="2" height="6"/></g>` +
    // 小屋
    `<rect x="336" y="180" width="34" height="18" fill="#c9b48e"/>` +
    `<path d="M332,180h42l-6,-8h-30z" fill="#8f9298"/>`,

  /**
   * 霧に覆われた首都。リマ。
   * **半年ほど日が差さない。**植民地のバルコニーと高層ビルが灰色に溶け、
   * 崖の下に太平洋。
   */
  capitalcity:
    sky("#b8bcc0", "#d8dcdc", 126) +
    haze(120, 60, 170, 30, "#cfd4d4") +
    haze(300, 74, 150, 26, "#c8cdd0") +
    // 霧に溶ける高層ビル(右)
    `<g fill="#98a0a8" opacity=".8"><rect x="286" y="52" width="26" height="74"/><rect x="318" y="38" width="30" height="88"/><rect x="354" y="64" width="24" height="62"/></g>` +
    `<g fill="#c8d0d4" opacity=".45"><rect x="292" y="60" width="6" height="6"/><rect x="302" y="60" width="6" height="6"/><rect x="324" y="48" width="6" height="6"/><rect x="336" y="48" width="6" height="6"/><rect x="324" y="66" width="6" height="6"/><rect x="360" y="74" width="6" height="6"/></g>` +
    haze(330, 92, 120, 22, "#cfd4d4") +
    ground(126, "#9a9a94") +
    // 植民地の建物と木のバルコニー(左)
    `<rect x="0" y="96" width="138" height="60" fill="#e8e2d4"/>` +
    `<path d="M-4,96h146l-10,-9H6z" fill="#a8746a"/>` +
    `<g fill="#6b5330"><rect x="10" y="104" width="34" height="26" rx="2"/><rect x="58" y="104" width="34" height="26" rx="2"/><rect x="106" y="104" width="30" height="26" rx="2"/></g>` +
    `<g fill="#8a6a46"><rect x="10" y="130" width="34" height="5"/><rect x="58" y="130" width="34" height="5"/><rect x="106" y="130" width="30" height="5"/></g>` +
    `<g fill="#4f5a62" opacity=".7"><rect x="16" y="110" width="9" height="14"/><rect x="30" y="110" width="9" height="14"/><rect x="64" y="110" width="9" height="14"/><rect x="78" y="110" width="9" height="14"/><rect x="112" y="110" width="9" height="14"/></g>` +
    `<g fill="#5c6a72"><path d="M20,156v-16a9,9 0 0 1 18,0v16zM66,156v-16a9,9 0 0 1 18,0v16z"/></g>` +
    // 崖と太平洋(手前)
    `<path d="M0,166h400v10H0z" fill="#8f8a80"/>` +
    `<path d="M0,176h400v20H0z" fill="#7f7a70"/>` +
    `<g stroke="#6f6a60" stroke-width="1.6" opacity=".7" fill="none"><path d="M40,176v20M110,176v20M200,176v20M290,176v20M360,176v20"/></g>` +
    band(196, 14, "#4f7f94") +
    `<g stroke="#a8c8d4" stroke-width="2" opacity=".5" fill="none"><path d="M20,202h90M250,206h120"/></g>` +
    gull(180, 52, 0.9) +
    gull(214, 66, 0.8) +
    // 霧に沈むもう一列の建物と、街路樹
    `<g fill="#c8ccc8" opacity=".8"><rect x="146" y="112" width="46" height="42"/><rect x="200" y="118" width="40" height="36"/><rect x="248" y="108" width="36" height="46"/></g>` +
    `<g fill="#aeb4b0" opacity=".7"><rect x="154" y="120" width="10" height="10"/><rect x="172" y="120" width="10" height="10"/><rect x="208" y="126" width="10" height="10"/><rect x="256" y="118" width="10" height="10"/></g>` +
    haze(200, 130, 130, 18, "#d4d8d8") +
    // 大聖堂の塔(左寄り)
    `<g fill="#e0d8c8"><rect x="104" y="70" width="16" height="28"/></g>` +
    `<path d="M102,70h20l-10,-10z" fill="#a8746a"/>` +
    `<rect x="108" y="78" width="7" height="9" fill="#5c6a72"/>` +
    // 通りと、止まっている車
    band(156, 10, "#8a8a84") +
    `<g stroke="#c8ccc8" stroke-width="2" stroke-dasharray="12 10" opacity=".6" fill="none"><path d="M0,161h400"/></g>` +
    `<g fill="#8a5f5a"><rect x="26" y="146" width="30" height="10" rx="3"/><rect x="34" y="140" width="16" height="7" rx="2"/></g>` +
    `<g fill="#2f3238"><circle cx="34" cy="156" r="3.4"/><circle cx="50" cy="156" r="3.4"/></g>` +
    `<g fill="#5f6a72"><rect x="300" y="148" width="26" height="9" rx="3"/></g>` +
    `<g fill="#2f3238"><circle cx="307" cy="157" r="3"/><circle cx="320" cy="157" r="3"/></g>` +
    // 霧に濡れた歩道の街灯
    `<g fill="#7f8a88"><rect x="150" y="140" width="2.6" height="26"/><rect x="266" y="140" width="2.6" height="26"/></g>` +
    `<g fill="#e8e2c8" opacity=".8"><circle cx="151" cy="138" r="3.4"/><circle cx="267" cy="138" r="3.4"/></g>` +
    // 崖の上のヤシ
    `<g stroke="#6f7a68" stroke-width="3" fill="none" stroke-linecap="round"><path d="M356,166V148"/></g>` +
    `<g stroke="#5f7a5a" stroke-width="2.4" fill="none" stroke-linecap="round"><path d="M356,148q-9,-2 -11,3M356,148q9,-2 11,3M356,148q-5,-8 -12,-8M356,148q5,-8 12,-8"/></g>`,

  /**
   * 要塞のある港。カヤオ。
   * 稜堡のある石の要塞と、その先の埠頭・起重機。
   */
  historicport:
    sky("#a8bcc8", "#dfe0d0", 120) +
    haze(220, 96, 180, 20, "#dfe4e0") +
    gull(90, 44, 1) +
    gull(126, 58, 0.8) +
    ground(120, "#2f6f8a") +
    band(120, 90, "#2f6f8a") +
    band(120, 8, "#3f83a0") +
    ripples(140, "#a8d8e0") +
    // 要塞(左)
    `<path d="M0,168V128h34l10,-12h48l10,12h34v40z" fill="#b8ab90"/>` +
    `<g fill="#a2957c"><rect x="0" y="118" width="14" height="10"/><rect x="24" y="118" width="14" height="10"/><rect x="104" y="118" width="14" height="10"/><rect x="128" y="118" width="8" height="10"/></g>` +
    `<g stroke="#9a8d74" stroke-width="1.6" opacity=".7" fill="none"><path d="M0,140h136M0,154h136M40,128v40M96,128v40"/></g>` +
    `<path d="M56,168v-18a10,10 0 0 1 20,0v18z" fill="#5d4a34"/>` +
    // 大砲
    `<g fill="#4a4a52"><rect x="12" y="106" width="26" height="7" rx="3"/><circle cx="12" cy="112" r="5"/></g>` +
    // 埠頭と起重機(右)
    `<rect x="252" y="150" width="148" height="8" fill="#8a8478"/>` +
    `<g fill="#8a8478"><rect x="262" y="158" width="6" height="20"/><rect x="330" y="158" width="6" height="20"/><rect x="390" y="158" width="6" height="20"/></g>` +
    `<g fill="#c8102e"><rect x="296" y="86" width="5" height="64"/><rect x="340" y="86" width="5" height="64"/><rect x="284" y="80" width="72" height="7"/></g>` +
    `<line x1="310" y1="87" x2="310" y2="120" stroke="#4a4a52" stroke-width="1.6"/>` +
    `<rect x="302" y="120" width="16" height="10" fill="#4a4a52"/>` +
    // 貨物船
    `<path d="M232,186h150v10q-8,8 -20,8H244z" fill="#1f4f7a"/>` +
    `<rect x="232" y="178" width="150" height="9" fill="#c8102e"/>` +
    `<g fill="#e8b21c"><rect x="244" y="166" width="24" height="11"/></g>` +
    `<g fill="#3f9f7f"><rect x="272" y="166" width="24" height="11"/></g>` +
    `<rect x="344" y="152" width="30" height="26" fill="#efe7d4"/>` +
    `<g fill="#5c7080"><rect x="349" y="158" width="8" height="7"/><rect x="362" y="158" width="8" height="7"/></g>` +
    // 倉庫と積んだコンテナ(埠頭の上)
    `<rect x="150" y="118" width="76" height="32" fill="#b8bcb4"/>` +
    `<path d="M146,118h84l-8,-10h-68z" fill="#9aa0a0"/>` +
    `<g fill="#41474e" opacity=".8"><rect x="158" y="128" width="13" height="16"/><rect x="178" y="128" width="13" height="16"/><rect x="198" y="128" width="13" height="16"/></g>` +
    `<g fill="#c8102e"><rect x="234" y="132" width="26" height="9"/></g>` +
    `<g fill="#1f6fb0"><rect x="234" y="141" width="26" height="9"/></g>` +
    `<g fill="#e8b21c"><rect x="262" y="141" width="26" height="9"/></g>` +
    `<g fill="#3f9f7f"><rect x="262" y="132" width="26" height="9"/></g>` +
    // もう一基の起重機
    `<g fill="#c8102e"><rect x="368" y="100" width="4" height="50"/><rect x="360" y="96" width="40" height="6"/></g>` +
    `<line x1="380" y1="102" x2="380" y2="128" stroke="#4a4a52" stroke-width="1.4"/>` +
    // 要塞の脇の小舟と、係留の杭
    `<path d="M150,182h44l-6,7h-32z" fill="#3f9f7f"/>` +
    `<rect x="168" y="174" width="12" height="8" fill="#efe7d4"/>` +
    `<g fill="#8a8478"><rect x="140" y="160" width="5" height="16"/><rect x="206" y="162" width="5" height="16"/></g>` +
    // 要塞の旗
    `<rect x="66" y="88" width="2.6" height="30" fill="#8a8f96"/>` +
    `<path d="M68.6,90h18v5h-18zM68.6,95h18v5h-18z" fill="#c8102e"/>` +
    `<path d="M68.6,95h18v5h-18z" fill="#f0ece0"/>` +
    gull(160, 40, 0.9) +
    gull(196, 54, 0.8) +
    gull(260, 44, 0.7),

  /**
   * 産業を抱えた砂漠の港町。タララ / ピスコ / イロ。
   * 乾いた岬に工場と桟橋、その先に太平洋。
   */
  desertport:
    sky("#8fc4e8", "#e8dcc0", 116) +
    sun(70, 34, 18) +
    smoke(300, 70, 1.1) +
    ridge(106, 5, "#c2a273", 116, 3) +
    ground(116, "#cfae76") +
    // 工場(右)
    `<rect x="284" y="112" width="98" height="34" fill="#a8a49a"/>` +
    `<g fill="#41474e" opacity=".8"><rect x="292" y="122" width="14" height="16"/><rect x="314" y="122" width="14" height="16"/><rect x="336" y="122" width="14" height="16"/></g>` +
    stack(284, 112, 66, 12) +
    `<g fill="#c9c2b4"><rect x="356" y="118" width="16" height="28" rx="4"/><rect x="376" y="124" width="14" height="22" rx="4"/></g>` +
    // 貯蔵タンク(左)
    `<g fill="#d8d2c4"><ellipse cx="46" cy="126" rx="34" ry="7"/><rect x="12" y="126" width="68" height="22"/></g>` +
    `<g stroke="#b8b2a4" stroke-width="1.6" fill="none"><path d="M12,134h68M12,141h68"/></g>` +
    `<g fill="#d8d2c4"><ellipse cx="106" cy="132" rx="22" ry="5"/><rect x="84" y="132" width="44" height="16"/></g>` +
    // 配管
    `<g stroke="#a8a49a" stroke-width="4" fill="none"><path d="M80,144h204"/></g>` +
    `<g fill="#a8a49a"><rect x="130" y="144" width="5" height="10"/><rect x="220" y="144" width="5" height="10"/></g>` +
    // 海と桟橋
    band(154, 56, "#2f6f8a") +
    `<rect x="0" y="148" width="400" height="8" fill="#b8a888"/>` +
    `<rect x="140" y="160" width="180" height="7" fill="#8a6a46"/>` +
    `<g fill="#8a6a46"><rect x="150" y="167" width="5" height="20"/><rect x="220" y="167" width="5" height="20"/><rect x="308" y="167" width="5" height="20"/></g>` +
    ripples(178, "#a8d8e0") +
    fishingBoat(66, 186, 0.9, "#c8102e") +
    gull(180, 50, 1) +
    gull(210, 64, 0.8) +
    windRipples(196, "#b8975f") +
    // 桟橋の先の積み出し設備と、待つ貨物船
    `<rect x="286" y="140" width="46" height="20" fill="#a8a49a"/>` +
    `<path d="M282,140h54l-8,-9h-38z" fill="#8f9298"/>` +
    `<path d="M320,160l30,10" stroke="#8f9298" stroke-width="5" fill="none"/>` +
    `<path d="M226,182h108l-8,12h-92z" fill="#1f4f7a"/>` +
    `<rect x="226" y="174" width="108" height="9" fill="#c8102e"/>` +
    `<rect x="300" y="156" width="24" height="18" fill="#efe7d4"/>` +
    `<g fill="#5c7080"><rect x="304" y="160" width="6" height="6"/><rect x="314" y="160" width="6" height="6"/></g>` +
    // タンクの脇を走るトラック
    `<g fill="#e8b21c"><rect x="140" y="128" width="34" height="14" rx="2"/><rect x="174" y="132" width="16" height="10" rx="2"/></g>` +
    `<g fill="#3a3a3e"><circle cx="150" cy="143" r="4"/><circle cx="182" cy="143" r="4"/></g>` +
    // 乾いた岬の低木と、金網
    `<g stroke="#8a9a5a" stroke-width="2" fill="none" stroke-linecap="round"><path d="M36,136v-8M36,130l-5,-5M36,130l5,-5M240,132v-7M240,127l-4,-4M240,127l4,-4"/></g>` +
    `<g stroke="#a8a49a" stroke-width="1.4" opacity=".7" fill="none"><path d="M0,124h130M0,130h130M20,118v14M60,118v14M100,118v14"/></g>` +
    `<g fill="#b8975f" opacity=".7"><ellipse cx="150" cy="200" rx="24" ry="6"/></g>`,

  /**
   * 南部海岸の乾いた平地。パラカス / ナスカ。
   * 起伏の少ない砂礫の台地、風、遠くに細い海。**この盤面でいちばん空きが大きい。**
   */
  desertsouth:
    sky("#8fc4e8", "#efe4c8", 100) +
    sun(320, 34, 20) +
    ground(100, "#dcc08e") +
    // 遠くの細い海
    band(100, 10, "#3f7f9a") +
    band(110, 6, "#e8dcc0") +
    // 台地の段
    `<path d="M0,132q100,-14 200,-6q100,8 200,-8v14H0z" fill="#d0b380"/>` +
    ground(140, "#d8bb87") +
    dune(90, 168, 190, 24, "#cfae76") +
    dune(330, 164, 160, 18, "#cfae76") +
    windRipples(150, "#c2a273") +
    windRipples(184, "#c2a273") +
    // 乾いた谷の筋
    `<g stroke="#c2a273" stroke-width="3" opacity=".55" fill="none"><path d="M0,196q60,-10 120,-2q60,8 120,-4q60,-10 160,2"/></g>` +
    // 干からびた低木と骨のような枝
    `<g stroke="#a8946a" stroke-width="2" fill="none" stroke-linecap="round"><path d="M40,200v-12M40,192l-7,-7M40,194l8,-8M338,204v-10M338,198l-6,-6M338,198l7,-6"/></g>` +
    // 風に飛ぶ砂
    `<g stroke="#e8d4a8" stroke-width="2" opacity=".6" fill="none" stroke-linecap="round"><path d="M60,120q20,-5 40,0M280,126q22,-5 44,0M140,158q18,-4 36,0"/></g>` +
    // 石を並べた印(地上絵ではなく、道端の石積み)
    `<g fill="#b8975f"><ellipse cx="368" cy="196" rx="12" ry="4"/><ellipse cx="368" cy="190" rx="8" ry="3"/><ellipse cx="368" cy="185" rx="5" ry="2.4"/></g>` +
    // 海に落ちる崖(左)。パラカスの半島はここで海と切れる
    `<path d="M0,110h72q6,18 2,34H0z" fill="#c2a273"/>` +
    `<path d="M0,120h66q4,14 1,24H0z" fill="#b8975f"/>` +
    `<g stroke="#a8875a" stroke-width="1.4" opacity=".6" fill="none"><path d="M0,128h64M0,136h60M0,116h68"/></g>` +
    `<path d="M0,144h70l-6,6H0z" fill="#e8dcc0"/>` +
    // 漁師の小屋と、干した網
    `<rect x="18" y="158" width="36" height="18" fill="#c9b48e"/>` +
    `<path d="M14,158h44l-6,-8H20z" fill="#8f9298"/>` +
    `<rect x="30" y="164" width="10" height="12" fill="#6b5330"/>` +
    `<g fill="#8a6a46"><rect x="66" y="156" width="3" height="20"/><rect x="98" y="156" width="3" height="20"/></g>` +
    `<path d="M68,160h30v12H68z" fill="none" stroke="#c9b48e" stroke-width="1.2"/>` +
    `<g stroke="#c9b48e" stroke-width="0.9" opacity=".8" fill="none"><path d="M68,166h30M78,160v12M88,160v12"/></g>` +
    // 轍と、風で寄せられた砂の縁
    `<g stroke="#c2a273" stroke-width="2.4" opacity=".5" fill="none"><path d="M120,210q30,-24 78,-30q50,-6 90,-14"/><path d="M132,210q30,-24 78,-30q50,-6 90,-14"/></g>` +
    `<g fill="#c9ab7c"><ellipse cx="250" cy="176" rx="30" ry="6"/><ellipse cx="150" cy="192" rx="24" ry="5"/></g>` +
    // 海鳥(パラカスの沖は鳥の島で知られる)
    gull(90, 60, 1) +
    gull(126, 74, 0.8) +
    gull(60, 84, 0.7) +
    `<g fill="#8a7a62" opacity=".75"><circle cx="212" cy="204" r="4"/><circle cx="288" cy="200" r="3.4"/><circle cx="196" cy="188" r="3"/></g>`,
};

export const PERU_BG = { ...PERU_BASE_BG };

// ---------------------------------------------------------------------------
// 都市シンボル(46種)。鍵は cities.mjs の `mark` と対応。24×24の座標系。
//
// 盤面では直径19pxほどの点にしかならない。**主役を1つに絞り、輪郭で見分ける。**
// 背景を分け合う町どうしは、ここで必ず別の輪郭になるようにしてある。
// ---------------------------------------------------------------------------

export const PERU_MARKS = {
  /** 製錬所の煙突と、そこで分かれる線路。ラ・オロヤ専用。 */
  smelter:
    `<rect x="2" y="13" width="11" height="9" fill="#9aa0a8"/>` +
    `<rect x="14" y="3" width="5" height="19" fill="#b0a89a"/>` +
    `<rect x="14" y="3" width="5" height="2.4" fill="#8a5040"/>` +
    `<path d="M16.5,2c0,-2 3.5,-2 3.5,-4" fill="none" stroke="#cfc8bc" stroke-width="1.6"/>` +
    `<g fill="#41474e" opacity=".8"><rect x="4" y="15" width="3" height="4"/><rect x="9" y="15" width="3" height="4"/></g>` +
    `<path d="M12,24L12,20M12,20L4,24M12,20L20,24" stroke="#5a5a60" stroke-width="1.4" fill="none"/>` +
    `<rect x="0" y="22" width="24" height="2" fill="#8a7a66"/>`,

  /** 町のすぐそばまで迫る露天掘りの段。セロ・デ・パスコ専用。 */
  openpit:
    `<rect x="0" y="8" width="24" height="16" fill="#a89a7c"/>` +
    `<ellipse cx="13" cy="15" rx="11" ry="7" fill="#9a8a72"/>` +
    `<ellipse cx="13" cy="17" rx="8" ry="5" fill="#8a7a62"/>` +
    `<ellipse cx="13" cy="19" rx="5" ry="3" fill="#6f6152"/>` +
    `<g stroke="#7a6c58" stroke-width="1" opacity=".8" fill="none"><ellipse cx="13" cy="15" rx="11" ry="7"/><ellipse cx="13" cy="17" rx="8" ry="5"/></g>` +
    `<g fill="#c08f5c"><rect x="0" y="4" width="7" height="5"/><rect x="8" y="2" width="6" height="7"/></g>` +
    `<g fill="#8f9298"><path d="M-1,4h9l-2,-2H1zM7,2h8l-2,-2H9z"/></g>`,

  /** 石壁の一室と、身代金の高さに引かれた線。カハマルカ専用。 */
  ransomroom:
    `<rect x="1" y="2" width="22" height="21" fill="#6f6960"/>` +
    `<path d="M1,2l5,4v13l-5,4z" fill="#8f8880"/>` +
    `<path d="M23,2l-5,4v13l5,4z" fill="#8f8880"/>` +
    `<path d="M6,19h12l5,4H1z" fill="#7f7a72"/>` +
    `<g stroke="#5a544c" stroke-width="1.2" opacity=".9" fill="none"><path d="M6,10h12M6,15h12M11,6v13M15,6v13"/></g>` +
    `<rect x="6" y="7.4" width="12" height="3" fill="#e8b21c"/>` +
    `<g stroke="#c8901c" stroke-width="1" fill="none"><path d="M6,7.4h12"/></g>` +
    `<path d="M1,2h22" stroke="#a29a90" stroke-width="2" fill="none"/>`,

  /** 白い石(シジャール)の壁と、背後の火山。アレキパ専用。 */
  sillarwall:
    `<path d="M2,10L9,2l7,8z" fill="#8a7a6a"/>` +
    `<path d="M6.5,5.4h5L9,2z" fill="#f2f6f8"/>` +
    `<rect x="0" y="10" width="24" height="12" fill="#f0ece0"/>` +
    `<g fill="#5c7080"><path d="M3,22v-7a3.2,3.2 0 0 1 6.4,0v7zM14,22v-7a3.2,3.2 0 0 1 6.4,0v7z"/></g>` +
    `<rect x="0" y="10" width="24" height="2.4" fill="#e0dccc"/>` +
    `<g stroke="#dcd6c4" stroke-width="1" fill="none"><path d="M0,16h24M12,12v10"/></g>` +
    `<rect x="0" y="22" width="24" height="2" fill="#c2ab84"/>`,

  /** モルタルを使わない石組み。クスコ専用。 */
  inkawall:
    `<rect x="1" y="4" width="22" height="18" fill="#9a938a"/>` +
    // **有名な多角形の石を1つだけ明るくして、目地を濃くする。**
    // 目地が薄いと19pxでただの灰色の板になる
    `<path d="M9,10l4,-3h6l1,4v6l-6,1l-5,-2z" fill="#b6ada2"/>` +
    `<g stroke="#4f4a44" stroke-width="2" fill="none" stroke-linejoin="round">` +
    `<path d="M1,10h8l4,-3h6l1,4h4M1,16h6l2,2h11l1,-2h2M9,4v6M7,18v4M19,7v4M20,11v11M13,4v3"/>` +
    `</g>` +
    `<path d="M9,10l4,-3h6l1,4v6l-6,1l-5,-2z" fill="none" stroke="#4f4a44" stroke-width="2" stroke-linejoin="round"/>` +
    `<rect x="0" y="22" width="24" height="2" fill="#8a8074"/>`,

  /** 台形の戸口と、脇を走る水路。オリャンタイタンボ専用。 */
  livingtown:
    `<rect x="1" y="1" width="22" height="16" fill="#9a938a"/>` +
    `<g stroke="#5f5a52" stroke-width="1.4" fill="none"><path d="M1,6h22M1,11h22M8,1v5M16,6v5M5,11v6"/></g>` +
    // **台形の戸口。**下が広く上が狭い。これがこの町の目印
    `<path d="M6.6,17L9,4h6l2.4,13z" fill="#2f2c28"/>` +
    `<path d="M8.6,4h6.8l-0.6,-2.4H9.2z" fill="#7f7a72"/>` +
    // 戸口の前を流れる石組みの水路
    `<rect x="0" y="17" width="24" height="3" fill="#7f7a72"/>` +
    `<rect x="0" y="20" width="24" height="4" fill="#5f9fb8"/>` +
    `<g stroke="#a8dce4" stroke-width="1.2" opacity=".8" fill="none"><path d="M2,22h6M11,22h4M18,22h5"/></g>` +
    `<g stroke="#6f6960" stroke-width="1" fill="none"><path d="M4,17v3M12,17v3M20,17v3"/></g>`,

  /** 階段状に並ぶ塩田の池。マラス専用。 */
  saltterraces:
    `<rect x="0" y="0" width="24" height="24" fill="#a89a7c"/>` +
    // **斜面を下る階段。**平らな格子にすると窓枠に見える
    `<g fill="#f4f2ea">` +
    `<path d="M0,5h13l-2,4H0z"/>` +
    `<path d="M2,10h15l-2,4H1z"/>` +
    `<path d="M4,15h17l-2,4H3z"/>` +
    `<path d="M6,20h18l-2,4H5z"/>` +
    `</g>` +
    `<g fill="#dcd6c4">` +
    `<path d="M0,5h13l-0.6,1.4H0z"/><path d="M2,10h15l-0.6,1.4H1.8z"/><path d="M4,15h17l-0.6,1.4H3.8z"/><path d="M6,20h18l-0.6,1.4H5.8z"/>` +
    `</g>` +
    `<g stroke="#8f8266" stroke-width="1.2" fill="none"><path d="M0,9h11M1,14h14M3,19h16M6,4l1,20M13,4.4l1,19.6"/></g>` +
    `<path d="M0,0h24v5H0z" fill="#b8ab90"/>` +
    `<path d="M14,2q4,-2 8,0" stroke="#9a8d74" stroke-width="1.4" fill="none"/>`,

  /** 小さな気動車と市場の日よけ。ワンカヨ専用。 */
  trenmacho:
    `<rect x="3" y="7" width="18" height="12" rx="2.4" fill="#e8b21c"/>` +
    `<rect x="3" y="7" width="18" height="3.4" fill="#c8102e"/>` +
    `<g fill="#cfe4f0"><rect x="5.5" y="12" width="5" height="4.4"/><rect x="13.5" y="12" width="5" height="4.4"/></g>` +
    `<g fill="#3a3a3e"><circle cx="8" cy="20" r="2.4"/><circle cx="16" cy="20" r="2.4"/></g>` +
    `<circle cx="12" cy="9" r="1.2" fill="#f7e2a0"/>` +
    `<rect x="0" y="22.4" width="24" height="1.6" fill="#6b5a44"/>`,

  /** 山肌に開いた坑口と、水銀の滴。ワンカベリカ専用。 */
  mercurymine:
    `<path d="M0,22V9l7,-6l9,5l8,-3v17z" fill="#8a7a6a"/>` +
    `<g stroke="#6f6152" stroke-width="1.2" opacity=".7" fill="none"><path d="M0,14h24M0,18h24"/></g>` +
    `<path d="M7,22v-6a4,4 0 0 1 8,0v6z" fill="#2f2c28"/>` +
    `<g fill="#6b5330"><rect x="5.6" y="14" width="2" height="8"/><rect x="14.4" y="14" width="2" height="8"/><rect x="5" y="12.6" width="12" height="2"/></g>` +
    `<ellipse cx="19" cy="20" rx="3.6" ry="2.4" fill="#c8ccd4"/>` +
    `<ellipse cx="18" cy="19.4" rx="1.2" ry="0.8" fill="#eef2f6"/>`,

  /** 彩色木箱の祭壇(レタブロ)。アヤクーチョ専用。 */
  retablo:
    `<path d="M4,20V8a8,7 0 0 1 16,0v12z" fill="#c8102e"/>` +
    `<path d="M6,20V9a6,5.4 0 0 1 12,0v11z" fill="#f0ece0"/>` +
    `<path d="M2,20l2,-11v11zM22,20l-2,-11v11z" fill="#e8b21c"/>` +
    `<g fill="#1f6fb0"><circle cx="9.4" cy="12" r="2"/><circle cx="14.6" cy="12" r="2"/></g>` +
    `<g fill="#3f9f7f"><rect x="8" y="15" width="3" height="5"/><rect x="13" y="15" width="3" height="5"/></g>` +
    `<rect x="1" y="20" width="22" height="2.6" fill="#8a6a46"/>` +
    `<circle cx="12" cy="6" r="1.6" fill="#e8b21c"/>`,

  /** 交差する両腕の浮彫(コトシュ)。ワヌコ専用。 */
  crossedhands:
    `<rect x="2" y="3" width="20" height="19" rx="1.4" fill="#c9b48e"/>` +
    `<rect x="4" y="5" width="16" height="15" fill="#b8a179"/>` +
    `<path d="M4,10q6,4 16,7" stroke="#8a7452" stroke-width="3.4" fill="none" stroke-linecap="round"/>` +
    `<path d="M20,10q-6,4 -16,7" stroke="#9a8462" stroke-width="3.4" fill="none" stroke-linecap="round"/>` +
    `<g fill="#8a7452"><circle cx="19" cy="17.4" r="2.2"/></g>` +
    `<g fill="#9a8462"><circle cx="5" cy="17.4" r="2.2"/></g>` +
    `<rect x="0" y="22" width="24" height="2" fill="#a89a7c"/>`,

  /** 山上の氷河湖と、下に伸びる排水路。ワラス専用。 */
  glaciallake:
    `<path d="M0,12L7,3l6,7l5,-5l6,7v3H0z" fill="#8f97a4"/>` +
    `<path d="M7,3L3.6,7.4q2,1.6 3.4,0q1.4,-1.4 3,0zM18,5l-2.6,3.6q1.6,1.4 2.6,0q1,-1.2 2.4,0z" fill="#f2f6f8"/>` +
    `<ellipse cx="12" cy="15" rx="11" ry="4.6" fill="#5fb0c4"/>` +
    `<ellipse cx="12" cy="14.4" rx="8" ry="3" fill="#7fc8d8"/>` +
    `<path d="M1,17q10,4 22,0v2H1z" fill="#9a8a72"/>` +
    `<path d="M12,19v5" stroke="#5fb0c4" stroke-width="2.6" fill="none"/>` +
    `<rect x="0" y="21" width="24" height="3" fill="#8f9a6a"/>`,

  /** 埋もれた町の上に立つ十字架と、旧広場の椰子。ユンガイ専用。 */
  buriedtown:
    `<path d="M0,16q40,-16 24,0v8H0z" fill="#a89a7c"/>` +
    `<path d="M0,18q12,-6 24,-1v7H0z" fill="#b8ab90"/>` +
    `<rect x="10.6" y="3" width="2.8" height="15" fill="#f0ece0"/>` +
    `<rect x="6" y="7" width="12" height="2.6" fill="#f0ece0"/>` +
    `<g stroke="#4f7a4a" stroke-width="1.8" fill="none" stroke-linecap="round">` +
    `<path d="M4,18v-6M4,12q-3,-1 -4,1M4,12q3,-1 4,1M20,18v-5M20,13q-3,-1 -3.6,1M20,13q3,-1 3.6,1"/>` +
    `</g>` +
    `<g fill="#9a8a72" opacity=".8"><rect x="15" y="15" width="4" height="3"/></g>`,

  /** 石の回廊の入口。チャビン・デ・ワンタル専用。 */
  oracle:
    `<rect x="0" y="4" width="24" height="18" fill="#8f8880"/>` +
    `<g stroke="#6f6960" stroke-width="1.3" fill="none"><path d="M0,10h24M0,16h24M8,4v6M16,10v6M5,16v6"/></g>` +
    `<path d="M9,22v-9a3.4,3.4 0 0 1 6.8,0v9z" fill="#211f1c"/>` +
    `<circle cx="4.4" cy="7" r="3" fill="#a29a90"/>` +
    `<g fill="#5f5a52"><circle cx="3.2" cy="6.4" r="0.9"/><circle cx="5.6" cy="6.4" r="0.9"/><path d="M2.8,8.4h3.2v1h-3.2z"/></g>` +
    `<rect x="0" y="22" width="24" height="2" fill="#9aa87a"/>`,

  /** 植民地広場の木のバルコニー。ハウハ専用。 */
  firstcapital:
    `<rect x="1" y="4" width="22" height="18" fill="#f0ece0"/>` +
    `<path d="M0,4h24l-3,-4H3z" fill="#b8613c"/>` +
    `<rect x="3" y="8" width="18" height="8" rx="1.4" fill="#6b5330"/>` +
    `<g fill="#4f5a62" opacity=".8"><rect x="5.4" y="10" width="4" height="5"/><rect x="14.6" y="10" width="4" height="5"/></g>` +
    `<rect x="3" y="16" width="18" height="2.4" fill="#8a6a46"/>` +
    `<path d="M9,22v-3.4h6V22z" fill="#5d4a34"/>` +
    `<rect x="0" y="22" width="24" height="2" fill="#b8ab90"/>`,

  /** 深い峡谷の縁。アバンカイ専用。 */
  canyonview:
    `<path d="M0,6h9v18H0z" fill="#8a7a6a"/>` +
    `<path d="M24,4h-9v20h9z" fill="#7f7058"/>` +
    `<g stroke="#6f6152" stroke-width="1.2" opacity=".7" fill="none"><path d="M0,11h9M0,17h9M15,9h9M15,15h9"/></g>` +
    `<path d="M9,6q2,10 1.4,18h3.2Q13,14 15,4z" fill="#a89a7c"/>` +
    `<path d="M10.6,24q0.6,-6 0.4,-10h2q-0.2,4 0.4,10z" fill="#5f9fb8"/>` +
    `<g fill="#5f8f4a"><ellipse cx="4" cy="5" rx="5" ry="2.4"/><ellipse cx="20" cy="3.4" rx="5" ry="2.4"/></g>`,

  /** 雲霧林の尾根に立つ丸い石壁。チャチャポヤス専用。 */
  cloudfortress:
    `<path d="M1,22q3,-16 11,-16q8,0 11,16z" fill="#8f8880"/>` +
    `<g stroke="#6f6960" stroke-width="1.2" opacity=".85" fill="none"><path d="M3,12h18M2,17h20M12,6v16"/></g>` +
    `<path d="M9,22v-8a3,3 0 0 1 6,0v8z" fill="#2f3230"/>` +
    `<g fill="#dfe8e4" opacity=".75"><ellipse cx="5" cy="19" rx="8" ry="3"/><ellipse cx="20" cy="20.4" rx="7" ry="2.6"/></g>` +
    `<g fill="#3f7a44"><ellipse cx="3" cy="8" rx="4" ry="2.4"/><ellipse cx="21" cy="9" rx="4" ry="2.4"/></g>`,

  /** 渓谷の壁沿いの線路。道路は描かない。マチュピチュ・プエブロ専用。 */
  railonly:
    `<path d="M0,0h9q4,10 1,24H0z" fill="#2f4a30"/>` +
    `<path d="M24,0h-8q-5,10 -2,24h10z" fill="#3a5a3a"/>` +
    `<path d="M9,24q3,-14 4,-24h2q3,10 4,24z" fill="#a89a7c"/>` +
    `<path d="M12,24q1,-9 1.4,-15h1.4q0.6,6 1.6,15z" fill="#6f9ab0"/>` +
    // 線路。**この町へ入る道はこれだけ。**明るくして必ず見えるようにする
    `<path d="M9.4,24q1.8,-13 3.2,-21" stroke="#c9b48e" stroke-width="3" fill="none"/>` +
    `<path d="M9.4,24q1.8,-13 3.2,-21" stroke="#4f4f56" stroke-width="1.2" fill="none"/>` +
    `<g fill="#8a6a46"><rect x="8.6" y="20" width="5.4" height="1.8" rx="0.8"/><rect x="9.4" y="15" width="5" height="1.8" rx="0.8"/><rect x="10.2" y="10" width="4.6" height="1.8" rx="0.8"/><rect x="11" y="5" width="4.2" height="1.8" rx="0.8"/></g>` +
    `<g fill="#5f9f4a"><ellipse cx="3" cy="6" rx="4" ry="2.4"/><ellipse cx="21" cy="9" rx="4" ry="2.4"/><ellipse cx="2" cy="16" rx="3.4" ry="2"/></g>`,

  /** 銅山の段と、その下の灌漑された果樹園。モケグア専用。 */
  coppervalley:
    `<path d="M0,4h24v7H0z" fill="#a08464"/>` +
    `<path d="M2,7h20v4H2z" fill="#8a6a4a"/>` +
    `<path d="M5,10h14v3H5z" fill="#75563c"/>` +
    `<g stroke="#c9784a" stroke-width="1.2" opacity=".8" fill="none"><path d="M0,6h24M2,9h20"/></g>` +
    `<rect x="0" y="13" width="24" height="4" fill="#5f9f43"/>` +
    `<g fill="#3f7a3a"><circle cx="4" cy="19" r="3.4"/><circle cx="12" cy="20" r="3.4"/><circle cx="20" cy="19" r="3.4"/></g>` +
    `<g fill="#6b5330"><rect x="3.2" y="21" width="1.6" height="3"/><rect x="11.2" y="22" width="1.6" height="2"/><rect x="19.2" y="21" width="1.6" height="3"/></g>`,

  /** 湖畔に係留された小さな鉄の蒸気船。プーノ専用。 */
  ironship:
    `<rect x="0" y="16" width="24" height="8" fill="#2f7fae"/>` +
    `<path d="M2,12h20l-2.4,6H4.4z" fill="#3f4a56"/>` +
    `<rect x="4" y="7" width="14" height="5" fill="#efe7d4"/>` +
    `<g fill="#4f5a62"><rect x="5.6" y="8.4" width="3" height="2.4"/><rect x="10" y="8.4" width="3" height="2.4"/><rect x="14.4" y="8.4" width="2.6" height="2.4"/></g>` +
    `<rect x="10.4" y="1" width="3.6" height="6" fill="#c8102e"/>` +
    `<rect x="10.4" y="1" width="3.6" height="1.6" fill="#2a2a2a"/>` +
    `<path d="M12,0.4c0,-2 3,-2 3,-3.4" fill="none" stroke="#cfc8bc" stroke-width="1.4"/>` +
    `<g stroke="#9fd8e4" stroke-width="1" opacity=".7" fill="none"><path d="M1,21h7M16,22h7"/></g>`,

  /** 3方向に分かれる線路。フリアカ専用。 */
  railjunction:
    `<rect x="0" y="0" width="24" height="24" fill="#b5a267"/>` +
    `<g stroke="#6b5a44" stroke-width="1.6" opacity=".9" fill="none">` +
    `<path d="M2,3h4M8,3h4M14,3h4M20,3h3M1,10h4M7,11h4M13,12h4M19,13h4M1,17h4M7,18h4M13,19h4M19,20h3"/>` +
    `</g>` +
    `<g stroke="#4f4f56" stroke-width="2" fill="none">` +
    `<path d="M0,6h24M0,13q12,-4 24,-6M0,20q12,-6 24,-9"/>` +
    `</g>` +
    `<circle cx="12" cy="10" r="2.6" fill="#c8102e"/>` +
    `<rect x="10.8" y="10" width="2.4" height="9" fill="#4f4f56"/>`,

  /** 凍らせたじゃがいもを地面に広げた畑。シクアニ専用。 */
  chuno:
    `<rect x="0" y="10" width="24" height="14" fill="#c2b077"/>` +
    `<rect x="0" y="4" width="24" height="6" fill="#dfe4e0"/>` +
    `<g fill="#8f8880"><ellipse cx="4" cy="14" rx="3" ry="2.2"/><ellipse cx="11" cy="13.4" rx="3.2" ry="2.4"/><ellipse cx="18" cy="14" rx="3" ry="2.2"/><ellipse cx="7" cy="18.4" rx="3.2" ry="2.4"/><ellipse cx="15" cy="18" rx="3" ry="2.2"/><ellipse cx="21" cy="19" rx="2.6" ry="2"/></g>` +
    `<g fill="#6f6960" opacity=".7"><ellipse cx="4" cy="14" rx="1.2" ry="0.8"/><ellipse cx="11" cy="13.4" rx="1.2" ry="0.8"/><ellipse cx="7" cy="18.4" rx="1.2" ry="0.8"/></g>` +
    `<g stroke="#f0f6f8" stroke-width="1.2" opacity=".9" fill="none"><path d="M1,22h5M9,23h6M18,22h5"/></g>`,

  /** 国境の橋と、その上の露店。デサグアデロ専用。 */
  bordermarket:
    `<rect x="0" y="15" width="24" height="9" fill="#5f9fb8"/>` +
    `<rect x="0" y="12" width="24" height="4" fill="#a89a7c"/>` +
    `<g fill="#8a8478"><rect x="4" y="16" width="3" height="8"/><rect x="17" y="16" width="3" height="8"/></g>` +
    `<path d="M0,8h11l-2.4,4H0z" fill="#c8102e"/>` +
    `<path d="M24,6h-11l2.4,6H24z" fill="#3f9f7f"/>` +
    `<g fill="#8a6a46"><rect x="2" y="12" width="1.6" height="4"/><rect x="9" y="12" width="1.6" height="4"/><rect x="15" y="12" width="1.6" height="4"/><rect x="21" y="12" width="1.6" height="4"/></g>` +
    `<g fill="#e8b21c"><rect x="3" y="9" width="5" height="2.4"/></g>` +
    `<g fill="#1f6fb0"><rect x="16" y="8" width="5" height="2.4"/></g>`,

  /** 高原のチーズとアルパカ。アヤビリ専用。 */
  cheeseland:
    `<rect x="0" y="18" width="24" height="6" fill="#b5a267"/>` +
    `<path d="M1,18v-7a5,3 0 0 1 10,0v7z" fill="#f0dc8c"/>` +
    `<path d="M1,11a5,3 0 0 1 10,0z" fill="#f7e9a8"/>` +
    `<g fill="#dfc86a"><circle cx="4" cy="14" r="1.2"/><circle cx="8" cy="16" r="1"/><circle cx="6.4" cy="12.4" r="0.9"/></g>` +
    // アルパカは**正面の顔**にする。横向きの全身は19pxで別の生きものに見える
    `<path d="M13.6,18v-5a4.4,4.4 0 0 1 8.8,0v5z" fill="#e2d8c4"/>` +
    `<ellipse cx="18" cy="11" rx="4.6" ry="4.2" fill="#e2d8c4"/>` +
    `<path d="M13.6,10.4q4.4,-4.4 8.8,0q-4.4,-1.8 -8.8,0z" fill="#f2ecdc"/>` +
    `<path d="M15,8.4l-1,-5.4l3.2,3.8z" fill="#e2d8c4"/>` +
    `<path d="M21,8.4l1.4,-5.4l1.4,4z" fill="#e2d8c4"/>` +
    `<g fill="#3a2a1a"><circle cx="16.2" cy="11" r="0.9"/><circle cx="19.8" cy="11" r="0.9"/></g>` +
    `<ellipse cx="18" cy="14.4" rx="2" ry="1.4" fill="#cfc4ac"/>` +
    `<path d="M17.2,14.2h1.6" stroke="#8a7a62" stroke-width="0.8" fill="none"/>`,

  /** タイル張りの邸宅とヤシ。イキトス専用。 */
  rivermansion:
    `<rect x="6" y="5" width="18" height="17" fill="#3f9f9a"/>` +
    `<g fill="#f0ece0" opacity=".9"><rect x="8" y="7" width="3.4" height="3.4"/><rect x="14" y="7" width="3.4" height="3.4"/><rect x="20" y="7" width="3.4" height="3.4"/><rect x="11" y="12" width="3.4" height="3.4"/><rect x="17" y="12" width="3.4" height="3.4"/></g>` +
    `<path d="M4,5h21l-3,-4H7z" fill="#c9503c"/>` +
    `<path d="M13,22v-6a3,3 0 0 1 6,0v6z" fill="#6b5330"/>` +
    `<g stroke="#8a6a46" stroke-width="3" fill="none" stroke-linecap="round"><path d="M3,22V11"/></g>` +
    `<g stroke="#2f7a3f" stroke-width="2" fill="none" stroke-linecap="round"><path d="M3,11q-4,-1 -3,-4M3,11q4,-1 3,-4M3,11q-2,-4 -6,-4M3,11q2,-4 6,-4"/></g>` +
    `<rect x="0" y="22" width="24" height="2" fill="#8a7a52"/>`,

  /** 道路が尽きて川に接する地点。プカルパ専用。 */
  roadsend:
    `<rect x="0" y="14" width="24" height="10" fill="#8a7a52"/>` +
    `<g stroke="#a89868" stroke-width="1" opacity=".6" fill="none"><path d="M2,18h8M14,21h8"/></g>` +
    `<path d="M0,2h14q2,6 0,12H0z" fill="#5f5a52"/>` +
    `<g stroke="#f0ece0" stroke-width="1.8" stroke-dasharray="3 3" opacity=".8" fill="none"><path d="M0,8h13"/></g>` +
    `<path d="M14,2q3,6 0,12l-2,-1q2,-5 0,-10z" fill="#c9b48e"/>` +
    `<g fill="#c8102e"><rect x="15" y="4" width="2" height="8"/><path d="M13,4h6v3h-6z"/></g>` +
    `<path d="M2,20h12l-1.6,3H4z" fill="#c9503c"/>`,

  /** 二階建ての木造船が着く桟橋。ユリマグアス専用。 */
  riverdock:
    `<rect x="0" y="16" width="24" height="8" fill="#8a7a52"/>` +
    `<rect x="0" y="13" width="24" height="3" fill="#8a6a46"/>` +
    `<g fill="#6b5330"><rect x="3" y="16" width="2" height="8"/><rect x="19" y="16" width="2" height="8"/></g>` +
    `<path d="M4,18h17l-2.4,4H6z" fill="#c9503c"/>` +
    `<rect x="5" y="13" width="15" height="5" fill="#efe7d4"/>` +
    `<rect x="6" y="8" width="13" height="5" fill="#e2d8c2"/>` +
    `<path d="M4,8h16v-2.4H4z" fill="#5f8f6a"/>` +
    `<g fill="#4f6a78"><rect x="7" y="14.4" width="2.6" height="2.6"/><rect x="11.4" y="14.4" width="2.6" height="2.6"/><rect x="15.8" y="14.4" width="2.6" height="2.6"/></g>`,

  /** 水を張った採掘の穴と、残った木。プエルト・マルドナード専用。 */
  goldpit:
    `<rect x="0" y="8" width="24" height="16" fill="#d8c49e"/>` +
    `<rect x="0" y="4" width="24" height="5" fill="#3f7a42"/>` +
    `<ellipse cx="11" cy="16" rx="10" ry="6" fill="#9a8a62"/>` +
    `<ellipse cx="11" cy="16.6" rx="7.4" ry="4.2" fill="#6f9a8a"/>` +
    `<ellipse cx="10" cy="15" rx="2.6" ry="1.2" fill="#8fbcae" opacity=".7"/>` +
    `<g fill="#8a6a46"><rect x="19" y="10" width="3" height="8" rx="1"/></g>` +
    `<ellipse cx="20.5" cy="10" rx="2.4" ry="1" fill="#a8845c"/>` +
    `<path d="M2,22q6,-5 12,0z" fill="#b8a074"/>`,

  /** コーヒーとカカオの乾燥棚。タラポト専用。 */
  coffeecacao:
    `<rect x="0" y="16" width="24" height="8" fill="#8a9a5a"/>` +
    `<rect x="1" y="11" width="22" height="4" fill="#8a6a46"/>` +
    `<g fill="#6b5330"><rect x="3" y="15" width="2" height="8"/><rect x="19" y="15" width="2" height="8"/></g>` +
    `<g fill="#5f3f22"><circle cx="4.4" cy="9.6" r="1.8"/><circle cx="9" cy="9.6" r="1.8"/><circle cx="13.6" cy="9.6" r="1.8"/><circle cx="18.2" cy="9.6" r="1.8"/><circle cx="6.7" cy="6.6" r="1.6"/><circle cx="11.3" cy="6.6" r="1.6"/><circle cx="15.9" cy="6.6" r="1.6"/></g>` +
    `<g stroke="#8a5a2c" stroke-width="0.9" fill="none"><path d="M4.4,7.8v3.6M9,7.8v3.6M13.6,7.8v3.6M18.2,7.8v3.6"/></g>` +
    `<ellipse cx="20" cy="20" rx="3" ry="5" fill="#e8901c"/>` +
    `<g stroke="#c8641c" stroke-width="0.9" fill="none"><path d="M20,15.4v9.2M17.6,17h4.8"/></g>`,

  /** 開拓されたコーヒー畑と、森の境目。サティポ専用。 */
  coffeefrontier:
    `<rect x="0" y="0" width="24" height="24" fill="#8fae5a"/>` +
    `<path d="M0,0h24v9q-6,3 -12,0q-6,-3 -12,0z" fill="#2f6f3a"/>` +
    `<g fill="#3f8a44"><ellipse cx="4" cy="8" rx="5" ry="3"/><ellipse cx="13" cy="7" rx="5.4" ry="3"/><ellipse cx="21" cy="8.4" rx="4.6" ry="2.8"/></g>` +
    `<g fill="#4f8b38"><circle cx="4" cy="14" r="3"/><circle cx="12" cy="14.6" r="3"/><circle cx="20" cy="14" r="3"/><circle cx="8" cy="20" r="3"/><circle cx="16" cy="20.4" r="3"/></g>` +
    `<g fill="#c8102e"><circle cx="3" cy="13" r="1.1"/><circle cx="11" cy="13.6" r="1.1"/><circle cx="19" cy="13" r="1.1"/><circle cx="7" cy="19" r="1.1"/><circle cx="15" cy="19.4" r="1.1"/></g>` +
    `<g stroke="#8a6a46" stroke-width="1.4" fill="none"><path d="M0,11h24"/></g>`,

  /** マングローブの支柱根とエビ。トゥンベス専用。 */
  mangrove:
    `<rect x="0" y="14" width="24" height="10" fill="#5f8f8a"/>` +
    `<ellipse cx="12" cy="7" rx="12" ry="6" fill="#3f8a5a"/>` +
    `<ellipse cx="5" cy="6" rx="5" ry="3.4" fill="#4f9f6a"/>` +
    `<ellipse cx="19" cy="6.4" rx="5" ry="3.4" fill="#4f9f6a"/>` +
    `<g stroke="#6b5330" stroke-width="2" fill="none" stroke-linecap="round">` +
    `<path d="M6,12v6M6,15l-4,5M6,15l4,5M17,12v6M17,15l-4,5M17,15l4,5M11.5,12v4"/>` +
    `</g>` +
    `<g fill="#e8845c"><path d="M9,21.6q4,-3 8,0q-1.4,2.4 -4,2.4q-2.6,0 -4,-2.4z"/></g>` +
    `<g stroke="#9fc8c4" stroke-width="1" opacity=".7" fill="none"><path d="M1,17h5M19,18h4"/></g>`,

  /** 海沿いの油井の櫓。タララ専用。 */
  oilderrick:
    `<rect x="0" y="17" width="24" height="7" fill="#2f6f8a"/>` +
    `<rect x="0" y="14" width="24" height="4" fill="#cfae76"/>` +
    `<g stroke="#5f5a52" stroke-width="1.8" fill="none">` +
    `<path d="M5,17L9.6,2M19,17L14.4,2M9.6,2h4.8"/>` +
    `<path d="M6.6,12h10.8M7.8,8h8.4M8.7,5h6.6"/>` +
    `</g>` +
    `<rect x="10.6" y="0" width="2.8" height="3" fill="#c8102e"/>` +
    `<path d="M11,17v-6h2v6z" fill="#3a3a3e"/>` +
    `<g stroke="#9fd0dc" stroke-width="1" opacity=".7" fill="none"><path d="M1,21h6M17,22h6"/></g>`,

  /** 砂丘と、その脇の灌漑された緑の帯。ピウラ専用。 */
  desertdunes:
    `<rect x="0" y="0" width="24" height="24" fill="#e8dcc0"/>` +
    `<path d="M0,14q6,-8 13,-5q7,3 11,-1v9H0z" fill="#d8bb87"/>` +
    `<path d="M0,18q7,-6 14,-3q6,2 10,-1v3H0z" fill="#cfae76"/>` +
    `<rect x="0" y="20" width="24" height="4" fill="#5f9f43"/>` +
    `<g stroke="#4f8b38" stroke-width="1.2" opacity=".8" fill="none"><path d="M0,22h24"/></g>` +
    `<g stroke="#c2a273" stroke-width="1.2" opacity=".7" fill="none" stroke-linecap="round"><path d="M2,11q5,-2 10,0M12,16q5,-2 10,0"/></g>` +
    `<circle cx="19" cy="5" r="3.4" fill="#f7d05a"/>`,

  /** 黄金の副葬品と、ピラミッド状の墓。ランバイェケ専用。 */
  royaltomb:
    `<path d="M0,24l6,-11h12l6,11z" fill="#c9a878"/>` +
    `<path d="M3,19h18M6,13.6h12" stroke="#b0895c" stroke-width="1.4" fill="none"/>` +
    `<path d="M6,11q6,-9 12,0q-2,4 -6,4q-4,0 -6,-4z" fill="#e8b21c"/>` +
    `<g fill="#c8901c"><circle cx="9.4" cy="8.4" r="1.4"/><circle cx="14.6" cy="8.4" r="1.4"/></g>` +
    `<path d="M9,12.4h6v1.4H9z" fill="#c8901c"/>` +
    `<path d="M4,7l2,3M20,7l-2,3" stroke="#e8b21c" stroke-width="2" fill="none" stroke-linecap="round"/>` +
    `<g fill="#3f9f9a"><circle cx="5" cy="5.4" r="1.4"/><circle cx="19" cy="5.4" r="1.4"/></g>`,

  /** 長く割れる左ブレイクの波。プエルト・チカマ専用。 */
  surfwave:
    `<rect x="0" y="0" width="24" height="24" fill="#bfe0ea"/>` +
    `<path d="M0,20h24v4H0z" fill="#e8dcc0"/>` +
    `<path d="M24,7q-9,-2 -15,4q-6,6 -9,9h6q4,-7 9,-9q5,-2 9,-1z" fill="#2f6f9a"/>` +
    `<path d="M24,11q-7,-1 -12,4q-5,4 -7,5h4q3,-4 7,-6q4,-2 8,-1z" fill="#4f92b8"/>` +
    `<path d="M24,7q-9,-2 -15,4l3,1q6,-4 12,-2z" fill="#f0f8fa"/>` +
    `<g fill="#f0f8fa" opacity=".85"><ellipse cx="8" cy="18" rx="6" ry="2"/><ellipse cx="17" cy="19.4" rx="5" ry="1.6"/></g>` +
    `<path d="M15,12l4,2l-1,1.6l-4,-2z" fill="#c8102e"/>`,

  /** 波・魚の浮彫のある日干し煉瓦の壁。トルヒージョ専用。 */
  adobecity:
    `<rect x="0" y="4" width="24" height="20" fill="#cfae7a"/>` +
    `<rect x="0" y="2" width="24" height="3" fill="#dcbc8c"/>` +
    `<path d="M1,10q2.5,-5 5,0q2.5,5 5,0q2.5,-5 5,0q2.5,5 5,0" fill="none" stroke="#a8875a" stroke-width="2.2"/>` +
    `<g fill="#a8875a"><path d="M3,15q3,-3 6,0q-3,3 -6,0zM9,15l3,-2v4z"/><path d="M14,15q3,-3 6,0q-3,3 -6,0zM20,15l3,-2v4z"/></g>` +
    `<g stroke="#b8975f" stroke-width="1.4" opacity=".8" fill="none"><path d="M0,19h24"/></g>` +
    `<path d="M8,24v-4h8v4z" fill="#a8875a"/>`,

  /** 葦舟(カバジート・デ・トトラ)。ワンチャコ専用。 */
  reedboat:
    `<rect x="0" y="18" width="24" height="6" fill="#c9b48e"/>` +
    `<path d="M8,24q-3,-14 4,-22q7,8 4,22z" fill="#c9b479"/>` +
    `<path d="M9.6,24q-2.4,-12 2.4,-18q4.8,6 2.4,18z" fill="#d8c48a"/>` +
    `<g stroke="#a89258" stroke-width="1" fill="none"><path d="M9,20h6M9.4,16h5.2M10,12h4M10.6,8h2.8"/></g>` +
    `<path d="M20,24q-2,-9 2,-14" stroke="#8a6a46" stroke-width="1.8" fill="none"/>` +
    `<g fill="#8a7a62" opacity=".7"><ellipse cx="4" cy="22" rx="4" ry="1.4"/></g>`,

  /** 漁船団とフィッシュミール工場。チンボテ専用。 */
  fishmeal:
    `<rect x="0" y="15" width="24" height="9" fill="#2f6f8a"/>` +
    `<rect x="0" y="6" width="14" height="9" fill="#9aa0a8"/>` +
    `<path d="M0,6h14V3.6L7,2L0,3.6z" fill="#8a9098"/>` +
    `<rect x="15" y="1" width="3.4" height="14" fill="#b0a89a"/>` +
    `<rect x="15" y="1" width="3.4" height="2" fill="#8a5040"/>` +
    `<path d="M16.7,0c0,-2 3.3,-2 3.3,-3.4" fill="none" stroke="#cfc8bc" stroke-width="1.4"/>` +
    `<g fill="#41474e" opacity=".8"><rect x="2" y="9" width="3.4" height="4"/><rect x="8" y="9" width="3.4" height="4"/></g>` +
    `<path d="M2,17h11l-1.6,4H4z" fill="#c8102e"/>` +
    `<path d="M15,19h8l-1,3h-6z" fill="#1f6fb0"/>` +
    `<g fill="#cfe4f0"><path d="M4,22.6q2.4,-2 4.8,0q-2.4,2 -4.8,0zM8.8,22.6l2,-1.4v2.8z"/></g>`,

  /** 段状の土の塚。カラル専用。 */
  pyramidmound:
    `<rect x="0" y="0" width="24" height="24" fill="#e8dcc0"/>` +
    `<path d="M1,24l3.4,-6h15.2l3.4,6z" fill="#bd9a68"/>` +
    `<path d="M4.4,18l3,-6h9.2l3,6z" fill="#c9a878"/>` +
    `<path d="M7.4,12l2.6,-5h4l2.6,5z" fill="#d4b488"/>` +
    `<g stroke="#a8875a" stroke-width="1" opacity=".7" fill="none"><path d="M4.4,18h15.2M7.4,12h9.2"/></g>` +
    `<path d="M10.6,24v-6h2.8v6z" fill="#a8875a"/>` +
    `<path d="M11,7V4" stroke="#8a7452" stroke-width="1.4" fill="none"/>` +
    `<g stroke="#c2a273" stroke-width="1.2" opacity=".6" fill="none"><path d="M0,21q4,-2 8,0M16,22q4,-2 8,0"/></g>`,

  /** 霧に沈む植民地のバルコニー。リマ専用。 */
  greycity:
    `<rect x="0" y="0" width="24" height="24" fill="#d0d4d4"/>` +
    `<rect x="0" y="6" width="24" height="18" fill="#e8e2d4"/>` +
    `<path d="M0,6h24l-3,-4H3z" fill="#a8746a"/>` +
    `<rect x="3" y="9" width="18" height="9" rx="1.6" fill="#6b5330"/>` +
    `<g fill="#4f5a62" opacity=".85"><rect x="5.4" y="11" width="4.4" height="5.4"/><rect x="14.2" y="11" width="4.4" height="5.4"/></g>` +
    `<g stroke="#8a6a46" stroke-width="1" fill="none"><path d="M12,9v9M3,13.4h18"/></g>` +
    `<rect x="3" y="18" width="18" height="2" fill="#8a6a46"/>` +
    `<g fill="#d8dcdc" opacity=".65"><ellipse cx="6" cy="4" rx="10" ry="3"/><ellipse cx="19" cy="8" rx="8" ry="2.6"/><ellipse cx="12" cy="22" rx="12" ry="3"/></g>`,

  /** 稜堡のある海沿いの要塞。カヤオ専用。 */
  fortress:
    `<rect x="0" y="18" width="24" height="6" fill="#2f6f8a"/>` +
    `<path d="M0,18V9h5l3,-4h8l3,4h5v9z" fill="#b8ab90"/>` +
    `<g fill="#a2957c"><rect x="0" y="6" width="4" height="3.4"/><rect x="6" y="6" width="4" height="3.4"/><rect x="14" y="6" width="4" height="3.4"/><rect x="20" y="6" width="4" height="3.4"/></g>` +
    `<g stroke="#9a8d74" stroke-width="1.2" opacity=".8" fill="none"><path d="M0,12h24M0,15h24"/></g>` +
    `<path d="M9.6,18v-4a2.4,2.4 0 0 1 4.8,0v4z" fill="#5d4a34"/>` +
    `<g fill="#4a4a52"><rect x="2" y="2" width="8" height="2.6" rx="1.3"/><circle cx="2" cy="3.4" r="2"/></g>` +
    `<g stroke="#9fd0dc" stroke-width="1" opacity=".6" fill="none"><path d="M2,21h6M16,22h6"/></g>`,

  /** 蒸留酒の樽と銅の蒸留器。ピスコ専用。 */
  brandybarrel:
    `<rect x="0" y="19" width="24" height="5" fill="#c9b48e"/>` +
    `<path d="M2,19V9q0,-3 5,-3t5,3v10z" fill="#a06c40"/>` +
    `<g fill="#8a5a30"><rect x="1.6" y="11" width="10.8" height="1.8"/><rect x="1.6" y="15.4" width="10.8" height="1.8"/></g>` +
    `<ellipse cx="7" cy="9" rx="5" ry="1.8" fill="#b87c4a"/>` +
    `<path d="M14,19v-6a4,4 0 0 1 8,0v6z" fill="#c9784a"/>` +
    `<path d="M14,13a4,3.4 0 0 1 8,0z" fill="#e08f5a"/>` +
    `<path d="M18,9.6V6q0,-2 3,-2" fill="none" stroke="#c9784a" stroke-width="2"/>` +
    `<circle cx="18" cy="16" r="1.4" fill="#8a5a30"/>`,

  /** 織物に包まれたミイラの包み。パラカス専用。 */
  mummybundle:
    `<rect x="0" y="19" width="24" height="5" fill="#dcc08e"/>` +
    `<path d="M6,19V11q0,-8 6,-8t6,8v8z" fill="#c9b48e"/>` +
    `<g fill="#c8102e"><rect x="6.4" y="9" width="11.2" height="2.4"/></g>` +
    `<g fill="#e8b21c"><rect x="6" y="13" width="12" height="2.4"/></g>` +
    `<g fill="#1f6fb0"><rect x="6" y="16.4" width="12" height="2.4"/></g>` +
    `<path d="M8.6,7q3.4,-3 6.8,0" fill="none" stroke="#3f9f7f" stroke-width="2"/>` +
    `<g stroke="#a89258" stroke-width="1" opacity=".8" fill="none"><path d="M12,3v16"/></g>` +
    `<g stroke="#c2a273" stroke-width="1.2" opacity=".7" fill="none" stroke-linecap="round"><path d="M0,22q4,-2 8,0M18,23q3,-2 6,0"/></g>`,

  /** 螺旋状の縦穴(プキオ)への入口。ナスカ専用。 */
  aqueduct:
    `<rect x="0" y="0" width="24" height="24" fill="#dcc08e"/>` +
    `<ellipse cx="12" cy="13" rx="11" ry="9" fill="#c2a273"/>` +
    `<path d="M12,4a9,7.4 0 1 1 -8.6,6.4a7,5.6 0 1 0 6.6,-4.6" fill="none" stroke="#8f7a52" stroke-width="3"/>` +
    `<path d="M10,7.8a5,4 0 1 1 -4.6,3.4" fill="none" stroke="#a08a5e" stroke-width="2.6"/>` +
    `<circle cx="12" cy="13.6" r="3" fill="#5f8f9a"/>` +
    `<circle cx="12" cy="13.6" r="1.4" fill="#7fb0bc"/>` +
    `<g stroke="#b8975f" stroke-width="1.2" opacity=".7" fill="none" stroke-linecap="round"><path d="M0,3q5,-2 10,0M16,22q4,-2 8,0"/></g>`,

  /** 埠頭と製錬所の煙突。イロ専用。 */
  coppersmelter:
    `<rect x="0" y="16" width="24" height="8" fill="#2f6f8a"/>` +
    `<rect x="0" y="13" width="24" height="4" fill="#8a8478"/>` +
    `<g fill="#8a8478"><rect x="4" y="17" width="2.4" height="7"/><rect x="17" y="17" width="2.4" height="7"/></g>` +
    `<rect x="2" y="4" width="10" height="9" fill="#a8a49a"/>` +
    `<rect x="14" y="1" width="4" height="12" fill="#b0a89a"/>` +
    `<rect x="14" y="1" width="4" height="2.2" fill="#8a5040"/>` +
    `<path d="M16,0c0,-2 3.6,-2 3.6,-3.6" fill="none" stroke="#cfc8bc" stroke-width="1.6"/>` +
    `<g fill="#c9784a"><rect x="4" y="8" width="6" height="2"/><rect x="4" y="10.6" width="6" height="2"/></g>` +
    `<g fill="#e08f5a"><rect x="19" y="8" width="4" height="5"/></g>`,

  /** 国境のオベリスクと広場。タクナ専用。 */
  reunionflag:
    `<rect x="0" y="19" width="24" height="5" fill="#b8ab90"/>` +
    `<path d="M9.6,19L11,4h2l1.4,15z" fill="#e8e2d4"/>` +
    `<path d="M11,4h2l-1,-3z" fill="#d8d2c4"/>` +
    `<rect x="7.6" y="19" width="8.8" height="2.4" fill="#c9bfa2"/>` +
    `<rect x="19" y="3" width="1.8" height="17" fill="#8a8f96"/>` +
    `<path d="M20.8,4h4q-1.6,2 0,4h-4z" fill="#c8102e"/>` +
    `<path d="M20.8,8h4q-1.6,2 0,4h-4z" fill="#f0ece0"/>` +
    `<g fill="#5f8f4a"><circle cx="3" cy="16" r="3"/><rect x="2.4" y="16" width="1.2" height="3"/></g>` +
    `<g stroke="#a2957c" stroke-width="1" opacity=".7" fill="none"><path d="M0,22h24"/></g>`,
};
