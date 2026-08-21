/**
 * キューバ盤の都市イラスト。
 *
 * `CUBA_MARKS` は 24×24 の座標系に描くシンボル、`CUBA_BG` は 400×210 の
 * 座標系に描く背景シーン(いずれもSVG断片の文字列)。オセアニアと同じく
 * 最初から文字列として持ち、動きは含めない。
 *
 * ## この盤面の芯
 *
 * **砂糖農園主が自ら請願して引かせた鉄道。本国スペインより11年早い。**
 * 鉄道は人ではなく砂糖のために敷かれた。だから線路が出る絵では、貨車に
 * 積まれているのは**必ずサトウキビか砂糖袋**で、客車は1両も描かない。
 * 鉄道の来なかった土地(ビニャーレス・バラコア・トリニダード)では、
 * 牛車・舟・保存蒸気が「線路の不在」を語る。
 *
 * ## 描かないもの
 *
 * - 早期建設を支えた labor(奴隷・契約労働者・年季奉公)は**惨状ではなく
 *   構造で描く**。監督の見張り塔・画一的な社宅の列・工場が引いた街路。
 *   人物の苦悶は描かない。
 * - 「カリブの楽園」で埋めない。錆・赤土・空になった港・止まった工場を混ぜる。
 * - 革命のプロパガンダ図像(肖像・星章)は描かない。装甲列車は記念碑として
 *   静物で描く。
 *
 * 色はフランス・オセアニアと揃える。空 #8fc4e8〜、顔 #f6efe2、
 * 強調 #f5b31c/#e8443f/#5b8fe8。キューバらしさはキビの黄緑 #8fae4a、
 * 植民地パステル #f2d8a0/#a8cfd8/#e0a898、赤瓦 #b0623f、
 * ビニャーレスの赤土 #b06a48、カリブの浅瀬 #57c8c0 で出す。
 */

// ---------------------------------------------------------------------------
// 背景シーンの組み立て部品
// ---------------------------------------------------------------------------

const W = 400;

/** 小数の桁を抑える(SVGを読みやすく保つため)。 */
const r1 = (v) => Math.round(v * 10) / 10;

/** 横帯。 */
function band(y, h, fill) {
  return `<rect x="0" y="${y}" width="${W}" height="${h}" fill="${fill}"/>`;
}

/**
 * 空。`to` は**塗り下ろす深さ**(= 次に来る塗りの開始y)。
 * 既定の118はすぐ下に海か地面が来る場合の値で、水平線がもっと下にあるシーンで
 * そのままにすると、あいだが横一文字に透ける。
 * 確認は scratchpad の check-cuba-bg.mjs(check-city-backgrounds.mjs と同じ実測)。
 */
function sky(top, bottom, to = 118) {
  const h = Math.min(84, to);
  return band(0, h, top) + (to > h ? band(h, to - h, bottom) : "");
}

/** 地面。下端まで必ず塗る。 */
function ground(y, fill) {
  return `<rect x="0" y="${y}" width="${W}" height="${210 - y}" fill="${fill}"/>`;
}

/** 接地の影。敷かないと物が浮く。 */
function shade(cx, cy, rx, ry, o = ".2") {
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#000" opacity="${o}"/>`;
}

function sun(cx, cy, r, fill = "#f8e08a") {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>`;
}

function clouds(cx, cy, scale = 1, fill = "#f6efe2", o = ".8") {
  const e = (dx, rx, ry) =>
    `<ellipse cx="${r1(cx + dx * scale)}" cy="${cy}" rx="${r1(rx * scale)}" ry="${r1(ry * scale)}"/>`;
  return `<g opacity="${o}" fill="${fill}">${e(0, 18, 7)}${e(-10, 11, 5.5)}${e(11, 13, 5.5)}</g>`;
}

/**
 * 海。`y` から下端まで必ず塗る(地面を兼ねるので塗り残しが出ない)。
 * 遠いほど濃く、手前ほど明るいカリブの浅瀬。
 */
function sea(y, deep = "#1f6f96", mid = "#3f9ab0", near = "#57c8c0") {
  const h = 210 - y;
  return (
    `<rect x="0" y="${y}" width="${W}" height="${h}" fill="${near}"/>` +
    `<rect x="0" y="${y}" width="${W}" height="${r1(h * 0.36)}" fill="${deep}"/>` +
    `<rect x="0" y="${r1(y + h * 0.36)}" width="${W}" height="${r1(h * 0.3)}" fill="${mid}"/>`
  );
}

/** 水面のうねり。 */
function swell(y, color = "#bfe8f4", o = ".5") {
  return (
    `<g stroke="${color}" stroke-width="2" opacity="${o}" fill="none" stroke-linecap="round">` +
    `<path d="M16,${y}q9,-3 18,0M112,${r1(y + 10)}q9,-3 18,0M256,${r1(y + 4)}q9,-3 18,0` +
    `M332,${r1(y + 16)}q9,-3 18,0M56,${r1(y + 22)}q11,-4 22,0M300,${r1(y + 30)}q11,-4 22,0` +
    `M150,${r1(y + 34)}q11,-4 22,0M28,${r1(y + 44)}q13,-4 26,0M344,${r1(y + 50)}q13,-4 26,0"/></g>`
  );
}

/** 遠景の丘の連なり。 */
function hills(y, fill, count = 4) {
  const parts = [];
  for (let i = 0; i < count; i++) {
    const cx = 40 + (i * W) / count;
    parts.push(`<path d="M${cx - 70},${y}c20,-34 50,-34 70,0z" fill="${fill}"/>`);
  }
  return `<g opacity=".95">${parts.join("")}</g>`;
}

/** 険しい稜線(シエラ・マエストラ)。`y` から `y+60` まで塗り下ろす。 */
function sierra(y, h, fill, seed = 1) {
  let d = `M0,${y}`;
  for (let i = 0; i < 9; i++) {
    const up = r1(h * (0.45 + ((i * seed) % 5) / 7));
    d += `l22,${-up}l24,${r1(up * 0.72)}`;
  }
  return `<path d="${d}V${y + 60}H0z" fill="${fill}"/>`;
}

/** 海鳥。 */
function gull(x, y, s = 1, color = "#3a3a34") {
  return `<path d="M${r1(x - 7 * s)},${y}q${r1(3.5 * s)},${r1(-4.5 * s)} ${r1(7 * s)},0q${r1(3.5 * s)},${r1(-4.5 * s)} ${r1(7 * s)},0" stroke="${color}" stroke-width="${r1(1.6 * s)}" fill="none" stroke-linecap="round"/>`;
}

/** 人。20px前後。 */
function person(x, base, h, shirt, skin = "#c98f5f") {
  const hd = r1(h * 0.19);
  const top = r1(base - h + hd * 1.7);
  return (
    `<g><rect x="${r1(x - h * 0.09)}" y="${r1(base - h * 0.4)}" width="${r1(h * 0.08)}" height="${r1(h * 0.4)}" fill="#3f3428"/>` +
    `<rect x="${r1(x + h * 0.02)}" y="${r1(base - h * 0.4)}" width="${r1(h * 0.08)}" height="${r1(h * 0.4)}" fill="#3f3428"/>` +
    `<path d="M${r1(x - h * 0.16)},${top}h${r1(h * 0.32)}l${r1(h * 0.03)},${r1(h * 0.42)}h${r1(-h * 0.38)}z" fill="${shirt}"/>` +
    `<circle cx="${x}" cy="${r1(top - hd * 0.75)}" r="${hd}" fill="${skin}"/></g>`
  );
}

function arm(x, y, dx, dy, color = "#c98f5f", w = 3) {
  return `<path d="M${x},${y}l${dx},${dy}" stroke="${color}" stroke-width="${w}" stroke-linecap="round" fill="none"/>`;
}

/** 麦わら帽(グアヒーロの人物の頭に重ねる)。 */
function strawHat(x, y, s = 1) {
  return (
    `<ellipse cx="${x}" cy="${y}" rx="${r1(6.4 * s)}" ry="${r1(1.8 * s)}" fill="#d8bd7f"/>` +
    `<path d="M${r1(x - 3 * s)},${y}q${r1(3 * s)},${r1(-4.4 * s)} ${r1(6 * s)},0z" fill="#c8a95f"/>`
  );
}

/** 煙・湯気。上へ広がる楕円の重なり。 */
function plume(x, base, h, s = 1, color = "#d8d2c4", o = ".8") {
  const p = [];
  const n = 6;
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    p.push(
      `<ellipse cx="${r1(x + t * 16 * s)}" cy="${r1(base - t * h)}" rx="${r1((7 + t * 20) * s)}" ry="${r1((5 + t * 13) * s)}"/>`,
    );
  }
  return `<g fill="${color}" opacity="${o}">${p.join("")}</g>`;
}

/** 木箱。 */
function crate(x, base, w = 16, h = 12, fill = "#b08a4f") {
  return (
    `<rect x="${x}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${fill}"/>` +
    `<g stroke="#7f6234" stroke-width="1.6" fill="none"><path d="M${x},${r1(base - h)}l${w},${h}M${r1(x + w)},${r1(base - h)}l${-w},${h}"/></g>` +
    `<rect x="${x}" y="${r1(base - h)}" width="${w}" height="2.4" fill="#8a6b3a"/>`
  );
}

/** 砂糖袋の山。 */
function sackPile(x, base, cols = 3, rows = 2, s = 1, fill = "#ddcfae") {
  const p = [];
  for (let row = 0; row < rows; row++) {
    for (let i = 0; i < cols - row; i++) {
      const bx = r1(x + i * 15 * s + row * 7.5 * s);
      const by = r1(base - 4 * s - row * 8.4 * s);
      p.push(
        `<ellipse cx="${bx}" cy="${by}" rx="${r1(8 * s)}" ry="${r1(4.8 * s)}" fill="${row % 2 ? "#cfc09c" : fill}"/>`,
        `<path d="M${r1(bx - 6.4 * s)},${by}q${r1(6.4 * s)},${r1(2.6 * s)} ${r1(12.8 * s)},0" stroke="#a8996f" stroke-width="${r1(1.1 * s)}" fill="none"/>`,
      );
    }
  }
  return p.join("");
}

/** 小舟。 */
function skiff(x, y, s = 1, hull = "#3f6f9a") {
  return (
    `<path d="M${r1(x - 20 * s)},${y}q${r1(20 * s)},${r1(10 * s)} ${r1(40 * s)},0q${r1(-20 * s)},${r1(-4 * s)} ${r1(-40 * s)},0z" fill="${hull}"/>` +
    `<path d="M${r1(x - 14 * s)},${r1(y - 1 * s)}h${r1(28 * s)}v${r1(2 * s)}h${r1(-28 * s)}z" fill="#e8e0cc"/>` +
    `<rect x="${r1(x + 10 * s)}" y="${r1(y - 7 * s)}" width="${r1(6 * s)}" height="${r1(7 * s)}" fill="#4a4438"/>`
  );
}

/** ヤシ(ココヤシ)。 */
function palm(x, base, h, lean = 0, frond = "#2f7f4a", trunk = "#7a6247") {
  const topX = r1(x + lean);
  const topY = r1(base - h);
  const tw = r1(h * 0.05 + 1.2);
  const parts = [
    `<path d="M${r1(x - tw)},${base}q${r1(lean * 0.35)},${r1(-h * 0.55)} ${r1(lean + tw * 0.3)},${-h}h${r1(tw * 1.5)}q${r1(-lean * 0.3)},${r1(h * 0.5)} ${r1(-lean + tw * 1.2)},${h}z" fill="${trunk}"/>`,
  ];
  const L = r1(h * 0.52);
  const leaves = [
    [-1, -0.3],
    [-0.88, 0.2],
    [-0.46, 0.5],
    [0.46, 0.5],
    [0.88, 0.2],
    [1, -0.3],
  ];
  for (const [dx, dy] of leaves) {
    const ex = r1(topX + dx * L);
    const ey = r1(topY + dy * L * 0.8);
    const c1x = r1(topX + dx * L * 0.55);
    const c1y = r1(topY + dy * L * 0.5 - L * 0.34);
    const c2x = r1(topX + dx * L * 0.5);
    const c2y = r1(topY + dy * L * 0.5 + L * 0.14);
    parts.push(`<path d="M${topX},${topY}Q${c1x},${c1y} ${ex},${ey}Q${c2x},${c2y} ${topX},${topY}z" fill="${frond}"/>`);
  }
  parts.push(
    `<g fill="#8a6f3a"><circle cx="${r1(topX - 3)}" cy="${r1(topY + 3)}" r="2.2"/><circle cx="${r1(topX + 3)}" cy="${r1(topY + 4)}" r="2"/></g>`,
  );
  return parts.join("");
}

/**
 * 大王ヤシ(キューバの国樹)。**幹がまっすぐで白っぽい**のがココヤシとの違い。
 * 頂部に緑の葉鞘の筒があり、そこから葉が上向きに開く。
 */
function royalPalm(x, base, h, lean = 0) {
  const topX = r1(x + lean);
  const topY = r1(base - h);
  const p = [
    `<path d="M${r1(x - 2.6)},${base}q${r1(lean * 0.3)},${r1(-h * 0.5)} ${r1(lean + 1)},${-h}h3.2q${r1(-lean * 0.3)},${r1(h * 0.5)} ${r1(-lean + 2)},${h}z" fill="#cfc7b4"/>`,
    `<g stroke="#a8a08c" stroke-width="1" opacity=".7" fill="none"><path d="M${r1(x - 1.8)},${r1(base - h * 0.25)}h4.4M${r1(x - 1.4)},${r1(base - h * 0.5)}h4M${r1(x - 1 + lean * 0.6)},${r1(base - h * 0.75)}h3.6"/></g>`,
    `<rect x="${r1(topX - 1.9)}" y="${r1(topY - 7)}" width="3.8" height="9" rx="1.8" fill="#6b9a4f"/>`,
  ];
  const L = r1(h * 0.4);
  for (const [dx, dy] of [
    [-1, -0.5],
    [-0.72, -0.86],
    [-0.26, -1.05],
    [0.26, -1.05],
    [0.72, -0.86],
    [1, -0.5],
  ]) {
    const ex = r1(topX + dx * L);
    const ey = r1(topY - 6 + dy * L * 0.8);
    p.push(
      `<path d="M${topX},${r1(topY - 6)}Q${r1(topX + dx * L * 0.5)},${r1(topY - 6 + dy * L * 0.62 - 3)} ${ex},${ey}Q${r1(topX + dx * L * 0.55)},${r1(topY - 6 + dy * L * 0.62 + 2.4)} ${topX},${r1(topY - 6)}z" fill="#2f7f4a"/>`,
    );
  }
  return p.join("");
}

/** キビ畑の帯。奥の面を塗り、立ちキビの縦線と穂先の弧を重ねる。 */
function caneBand(y, h, from = 0, to = W, base = "#7f9a3f", stalk = "#8fae4a") {
  const lines = [];
  for (let x = from + 8; x < to; x += 14) lines.push(`M${r1(x)},${r1(y + h)}v${-h}`);
  const tops = [];
  for (let x = from + 12; x < to; x += 42) {
    tops.push(`M${r1(x)},${y}q3,-9 7,-13M${r1(x + 14)},${y}q-3,-8 -7,-12`);
  }
  return (
    `<rect x="${from}" y="${y}" width="${r1(to - from)}" height="${h}" fill="${base}"/>` +
    `<g stroke="${stalk}" stroke-width="2" opacity=".8" fill="none"><path d="${lines.join("")}"/></g>` +
    `<g stroke="#a8b85a" stroke-width="2.2" opacity=".9" fill="none" stroke-linecap="round"><path d="${tops.join("")}"/></g>`
  );
}

/** 手前に立つキビの株。節のある茎と反った葉。 */
function caneClump(x, base, s = 1) {
  const p = [];
  for (const [dx, lean] of [
    [-7, -4],
    [-2.4, -1],
    [2.4, 1.6],
    [7, 4.4],
  ]) {
    const bx = r1(x + dx * s);
    const tx = r1(bx + lean * s);
    const h = r1(30 * s);
    p.push(
      `<path d="M${bx},${base}q${r1(lean * 0.4 * s)},${r1(-h * 0.5)} ${r1(lean * s)},${-h}" stroke="#a8b85a" stroke-width="${r1(2.6 * s)}" fill="none" stroke-linecap="round"/>`,
      `<path d="M${tx},${r1(base - h)}q${r1(6 * s)},${r1(-7 * s)} ${r1(12 * s)},${r1(-8 * s)}M${tx},${r1(base - h)}q${r1(-6 * s)},${r1(-8 * s)} ${r1(-11 * s)},${r1(-9 * s)}M${tx},${r1(base - h)}q${r1(2 * s)},${r1(-9 * s)} ${r1(1 * s)},${r1(-14 * s)}" stroke="#8fae4a" stroke-width="${r1(1.8 * s)}" fill="none" stroke-linecap="round"/>`,
    );
  }
  p.push(
    `<g stroke="#8a9a3a" stroke-width="1" opacity=".7" fill="none"><path d="M${r1(x - 8 * s)},${r1(base - 10 * s)}h${r1(3 * s)}M${r1(x - 3 * s)},${r1(base - 16 * s)}h${r1(3 * s)}M${r1(x + 2 * s)},${r1(base - 12 * s)}h${r1(3 * s)}M${r1(x + 6 * s)},${r1(base - 19 * s)}h${r1(3 * s)}"/></g>`,
  );
  return p.join("");
}

/** 標準軌の線路。1837年の広軌(1435mm超)を太めの枕木で。 */
function track(y, from = 0, to = W, tie = "#6b5330", rail = "#8a8f92") {
  const ties = [];
  for (let x = from; x < to; x += 14) ties.push(`<rect x="${r1(x)}" y="${y}" width="8" height="8"/>`);
  return (
    `<g fill="${tie}">${ties.join("")}</g>` +
    `<rect x="${from}" y="${r1(y + 1)}" width="${r1(to - from)}" height="2.6" fill="${rail}"/>` +
    `<rect x="${from}" y="${r1(y + 5.4)}" width="${r1(to - from)}" height="2.6" fill="${rail}"/>`
  );
}

/** 製糖工場の専用線の狭軌。枕木が細かい。 */
function narrowTrack(y, from = 0, to = W, tie = "#6b5a3a", rail = "#7f8288") {
  const ties = [];
  for (let x = from; x < to; x += 11) ties.push(`<rect x="${r1(x)}" y="${y}" width="6" height="7"/>`);
  return (
    `<g fill="${tie}">${ties.join("")}</g>` +
    `<rect x="${from}" y="${r1(y + 1)}" width="${r1(to - from)}" height="2.2" fill="${rail}"/>` +
    `<rect x="${from}" y="${r1(y + 5)}" width="${r1(to - from)}" height="2.2" fill="${rail}"/>`
  );
}

/** キビを山積みにした貨車。**客は乗らない。** */
function caneWagon(x, base, s = 1) {
  const p = [
    `<rect x="${r1(x - 20 * s)}" y="${r1(base - 16 * s)}" width="${r1(40 * s)}" height="${r1(12 * s)}" fill="#6b6a5a"/>`,
    `<g stroke="#4a4a40" stroke-width="${r1(1.2 * s)}" fill="none"><path d="M${r1(x - 14 * s)},${r1(base - 16 * s)}v${r1(12 * s)}M${r1(x)},${r1(base - 16 * s)}v${r1(12 * s)}M${r1(x + 14 * s)},${r1(base - 16 * s)}v${r1(12 * s)}"/></g>`,
  ];
  for (let i = 0; i < 7; i++) {
    p.push(
      `<path d="M${r1(x - 19 * s + i * 5.6 * s)},${r1(base - 16 * s)}q${r1(3 * s)},${r1(-8 * s)} ${r1(7 * s)},${r1(-9 * s)}" stroke="#8f9a4a" stroke-width="${r1(2.6 * s)}" fill="none" stroke-linecap="round"/>`,
    );
  }
  p.push(
    `<g fill="#33302c"><circle cx="${r1(x - 12 * s)}" cy="${r1(base - 2 * s)}" r="${r1(3.4 * s)}"/><circle cx="${r1(x + 12 * s)}" cy="${r1(base - 2 * s)}" r="${r1(3.4 * s)}"/></g>`,
  );
  return p.join("");
}

/**
 * 初期の蒸気機関車(左向き)。1837年式:背の高いラッパ型煙突・
 * むき出しの動輪・小さな屋根なし運転台。
 */
function steamLoco(x, base, s = 1, body = "#3f4a42") {
  return (
    `<g>` +
    // 排障器
    `<path d="M${r1(x - 34 * s)},${base}l${r1(8 * s)},${r1(-10 * s)}v${r1(10 * s)}z" fill="#8a4a30"/>` +
    // ボイラー
    `<rect x="${r1(x - 28 * s)}" y="${r1(base - 22 * s)}" width="${r1(30 * s)}" height="${r1(11 * s)}" rx="${r1(4 * s)}" fill="${body}"/>` +
    `<rect x="${r1(x - 28 * s)}" y="${r1(base - 22 * s)}" width="${r1(6 * s)}" height="${r1(11 * s)}" rx="${r1(2 * s)}" fill="#2b332d"/>` +
    // ラッパ型煙突
    `<path d="M${r1(x - 25 * s)},${r1(base - 22 * s)}v${r1(-12 * s)}l${r1(-3 * s)},${r1(-6 * s)}h${r1(11 * s)}l${r1(-3 * s)},${r1(6 * s)}v${r1(12 * s)}z" fill="#2b2b28"/>` +
    // 蒸気ドーム(真鍮)
    `<path d="M${r1(x - 12 * s)},${r1(base - 22 * s)}q${r1(4 * s)},${r1(-7 * s)} ${r1(8 * s)},0z" fill="#c8a13f"/>` +
    // 運転台(屋根なし)
    `<rect x="${r1(x + 2 * s)}" y="${r1(base - 26 * s)}" width="${r1(3 * s)}" height="${r1(15 * s)}" fill="#7a5c30"/>` +
    `<rect x="${r1(x + 5 * s)}" y="${r1(base - 18 * s)}" width="${r1(13 * s)}" height="${r1(7 * s)}" fill="#7a5c30"/>` +
    // 台枠
    `<rect x="${r1(x - 30 * s)}" y="${r1(base - 11 * s)}" width="${r1(48 * s)}" height="${r1(3.4 * s)}" fill="#33302c"/>` +
    // 動輪(後ろが大きい)
    `<g fill="#33302c"><circle cx="${r1(x + 8 * s)}" cy="${r1(base - 6 * s)}" r="${r1(6.4 * s)}"/><circle cx="${r1(x - 12 * s)}" cy="${r1(base - 4 * s)}" r="${r1(4 * s)}"/><circle cx="${r1(x - 24 * s)}" cy="${r1(base - 4 * s)}" r="${r1(4 * s)}"/></g>` +
    `<g fill="#8a8f92"><circle cx="${r1(x + 8 * s)}" cy="${r1(base - 6 * s)}" r="${r1(2 * s)}"/><circle cx="${r1(x - 12 * s)}" cy="${r1(base - 4 * s)}" r="${r1(1.3 * s)}"/><circle cx="${r1(x - 24 * s)}" cy="${r1(base - 4 * s)}" r="${r1(1.3 * s)}"/></g>` +
    `<path d="M${r1(x - 24 * s)},${r1(base - 4 * s)}h${r1(32 * s)}" stroke="#8a8f92" stroke-width="${r1(1.6 * s)}" fill="none"/>` +
    `</g>`
  );
}

/**
 * 植民地様式の家(平屋根・鎧戸)。パステルの壁と対比の鎧戸で
 * キューバの町並みの基本形。
 */
function colHouse(x, top, w, base, wall = "#f2d8a0", shutter = "#3f6b5f") {
  const h = base - top;
  const p = [
    `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="${wall}"/>`,
    `<rect x="${r1(x - 2)}" y="${top}" width="${r1(w + 4)}" height="4" fill="#b0623f"/>`,
    `<rect x="${r1(x - 2)}" y="${r1(top + 4)}" width="${r1(w + 4)}" height="1.6" fill="#8a4a30"/>`,
  ];
  const cols = Math.max(1, Math.floor(w / 20));
  for (let i = 0; i < cols; i++) {
    const wx = r1(x + 5 + (i * (w - 12)) / Math.max(1, cols));
    p.push(
      `<rect x="${wx}" y="${r1(top + h * 0.24)}" width="9" height="${r1(h * 0.42)}" fill="${shutter}"/>`,
      `<path d="M${wx},${r1(top + h * 0.24)}h9" stroke="#f6efe2" stroke-width="1.6" fill="none"/>`,
    );
  }
  p.push(`<rect x="${r1(x + w / 2 - 5)}" y="${r1(base - h * 0.4)}" width="10" height="${r1(h * 0.4)}" fill="#6b4a2f"/>`);
  return p.join("");
}

/** 連続アーチの柱廊(ポルタル)。ハバナ・広場の下屋。 */
function arcadeRow(x, y, n, aw = 20, ah = 26, fill = "#e8dcc0", inner = "#8a7f6a") {
  const p = [`<rect x="${x}" y="${y}" width="${r1(n * aw)}" height="${ah}" fill="${fill}"/>`];
  for (let i = 0; i < n; i++) {
    const ax = r1(x + i * aw + 3);
    p.push(
      `<path d="M${ax},${r1(y + ah)}v${r1(-ah * 0.5)}a${r1(aw / 2 - 3)},${r1(aw / 2 - 3)} 0 0 1 ${aw - 6},0v${r1(ah * 0.5)}z" fill="${inner}"/>`,
    );
  }
  return p.join("");
}

/** 鐘楼つきの教会。 */
function bellTower(x, base, w, h) {
  const tw = r1(w * 0.36);
  return (
    `<rect x="${x}" y="${r1(base - h * 0.52)}" width="${w}" height="${r1(h * 0.52)}" fill="#efe4cc"/>` +
    `<path d="M${r1(x - 4)},${r1(base - h * 0.52)}h${r1(w + 8)}l-8,-10h${r1(-w + 8)}z" fill="#b0623f"/>` +
    `<rect x="${r1(x + w * 0.08)}" y="${r1(base - h)}" width="${tw}" height="${h}" fill="#f2ead8"/>` +
    `<path d="M${r1(x + w * 0.08 + tw / 2 - 5.4)},${r1(base - h + 6)}a5.4,5.4 0 0 1 10.8,0v8h-10.8z" fill="#6b5a48"/>` +
    `<path d="M${r1(x + w * 0.08 + tw / 2)},${r1(base - h + 8)}a3,3 0 0 1 3,3v2h-6v-2a3,3 0 0 1 3,-3z" fill="#c8a13f"/>` +
    `<path d="M${r1(x + w * 0.08 - 3)},${r1(base - h)}L${r1(x + w * 0.08 + tw / 2)},${r1(base - h - 15)}L${r1(x + w * 0.08 + tw + 3)},${r1(base - h)}z" fill="#b0623f"/>` +
    `<path d="M${r1(x + w * 0.08 + tw / 2)},${r1(base - h - 22)}v8M${r1(x + w * 0.08 + tw / 2 - 3)},${r1(base - h - 18.6)}h6" stroke="#7f8890" stroke-width="1.7" fill="none"/>` +
    `<g fill="#5f7f96"><rect x="${r1(x + w * 0.56)}" y="${r1(base - h * 0.4)}" width="8" height="11" rx="4"/><rect x="${r1(x + w * 0.76)}" y="${r1(base - h * 0.4)}" width="8" height="11" rx="4"/></g>` +
    `<rect x="${r1(x + w * 0.32)}" y="${r1(base - h * 0.32)}" width="11" height="${r1(h * 0.32)}" fill="#6b4a2f"/>`
  );
}

/** 街灯(錬鉄)。 */
function lamppost(x, base, h = 34) {
  return (
    `<path d="M${r1(x - 1.4)},${base}v${-h}h2.8v${h}z" fill="#3a3f3a"/>` +
    `<path d="M${x},${r1(base - h)}q6,-2 8,-8" stroke="#3a3f3a" stroke-width="2" fill="none"/>` +
    `<rect x="${r1(x + 5.6)}" y="${r1(base - h - 13)}" width="5" height="6.4" fill="#f2d8a0"/>` +
    `<path d="M${r1(x + 4.6)},${r1(base - h - 13)}h7l-1.4,-3h-4.2z" fill="#3a3f3a"/>`
  );
}

/** ベンチ。 */
function benchSeat(x, base, w = 26, fill = "#4f7f6a") {
  return (
    `<rect x="${x}" y="${r1(base - 10)}" width="${w}" height="2.6" fill="${fill}"/>` +
    `<rect x="${x}" y="${r1(base - 16)}" width="${w}" height="2.4" fill="${fill}"/>` +
    `<g fill="#3a3f3a"><rect x="${r1(x + 2)}" y="${r1(base - 10)}" width="2.2" height="10"/><rect x="${r1(x + w - 4.2)}" y="${r1(base - 10)}" width="2.2" height="10"/></g>`
  );
}

/** 牧場の柵。横木2段と杭。 */
function fenceRail(x0, x1, y, fill = "#7a5c3a") {
  const posts = [];
  for (let x = x0; x <= x1; x += 26) posts.push(`<rect x="${r1(x)}" y="${r1(y - 4)}" width="3.4" height="18"/>`);
  return (
    `<g fill="${fill}">${posts.join("")}</g>` +
    `<rect x="${x0}" y="${y}" width="${r1(x1 - x0)}" height="2.6" fill="${fill}"/>` +
    `<rect x="${x0}" y="${r1(y + 7)}" width="${r1(x1 - x0)}" height="2.6" fill="${fill}"/>`
  );
}

/** 牛(クリオーリョ牛)。 */
function cow(x, base, s = 1, hide = "#c2a06f") {
  return (
    `<g><ellipse cx="${x}" cy="${r1(base - 10 * s)}" rx="${r1(13 * s)}" ry="${r1(7 * s)}" fill="${hide}"/>` +
    `<g fill="${hide}"><rect x="${r1(x - 10 * s)}" y="${r1(base - 8 * s)}" width="${r1(3 * s)}" height="${r1(8 * s)}"/><rect x="${r1(x - 4 * s)}" y="${r1(base - 8 * s)}" width="${r1(3 * s)}" height="${r1(8 * s)}"/><rect x="${r1(x + 3 * s)}" y="${r1(base - 8 * s)}" width="${r1(3 * s)}" height="${r1(8 * s)}"/><rect x="${r1(x + 8 * s)}" y="${r1(base - 8 * s)}" width="${r1(3 * s)}" height="${r1(8 * s)}"/></g>` +
    `<circle cx="${r1(x + 14 * s)}" cy="${r1(base - 15 * s)}" r="${r1(4.4 * s)}" fill="${hide}"/>` +
    `<path d="M${r1(x + 11 * s)},${r1(base - 18 * s)}q-2,-3 -1,-5M${r1(x + 17 * s)},${r1(base - 18 * s)}q2,-3 1,-5" stroke="#8a7350" stroke-width="${r1(1.6 * s)}" fill="none"/>` +
    `<ellipse cx="${r1(x - 4 * s)}" cy="${r1(base - 12 * s)}" rx="${r1(4.4 * s)}" ry="${r1(3 * s)}" fill="#a8875a" opacity=".8"/>` +
    `<path d="M${r1(x - 13 * s)},${r1(base - 12 * s)}q${r1(-3 * s)},${r1(2 * s)} ${r1(-2 * s)},${r1(6 * s)}" stroke="${hide}" stroke-width="${r1(1.8 * s)}" fill="none"/></g>`
  );
}

/** シラサギ(牛の傍らに立つ)。 */
function egret(x, base, s = 1) {
  return (
    `<g><path d="M${x},${base}v${r1(-7 * s)}M${r1(x + 2.4 * s)},${base}v${r1(-7 * s)}" stroke="#8a8f8a" stroke-width="${r1(1.1 * s)}" fill="none"/>` +
    `<ellipse cx="${r1(x + 1 * s)}" cy="${r1(base - 10 * s)}" rx="${r1(4.4 * s)}" ry="${r1(3 * s)}" fill="#f2f2ea"/>` +
    `<path d="M${r1(x + 4 * s)},${r1(base - 12 * s)}q${r1(3 * s)},${r1(-2 * s)} ${r1(3 * s)},${r1(-6 * s)}" stroke="#f2f2ea" stroke-width="${r1(2 * s)}" fill="none"/>` +
    `<circle cx="${r1(x + 7 * s)}" cy="${r1(base - 18 * s)}" r="${r1(1.8 * s)}" fill="#f2f2ea"/>` +
    `<path d="M${r1(x + 8.6 * s)},${r1(base - 18 * s)}l${r1(3.4 * s)},${r1(0.8 * s)}" stroke="#c8a13f" stroke-width="${r1(1.2 * s)}" fill="none"/></g>`
  );
}

/** 牛車。鉄道以前(と、鉄道の来なかった谷)の輸送。 */
function oxCart(x, base, s = 1, load = true) {
  const p = [
    // 荷台と大きな車輪
    `<rect x="${r1(x - 4 * s)}" y="${r1(base - 17 * s)}" width="${r1(34 * s)}" height="${r1(7 * s)}" fill="#8a6b43"/>`,
    `<circle cx="${r1(x + 12 * s)}" cy="${r1(base - 8 * s)}" r="${r1(8 * s)}" fill="none" stroke="#6b4a2f" stroke-width="${r1(2.6 * s)}"/>`,
    `<path d="M${r1(x + 12 * s)},${r1(base - 16 * s)}v${r1(16 * s)}M${r1(x + 4 * s)},${r1(base - 8 * s)}h${r1(16 * s)}" stroke="#6b4a2f" stroke-width="${r1(1.6 * s)}" fill="none"/>`,
    // 轅と軛
    `<path d="M${r1(x - 4 * s)},${r1(base - 14 * s)}l${r1(-20 * s)},${r1(2 * s)}" stroke="#8a6b43" stroke-width="${r1(2.2 * s)}" fill="none"/>`,
    `<rect x="${r1(x - 34 * s)}" y="${r1(base - 16 * s)}" width="${r1(13 * s)}" height="${r1(2.6 * s)}" rx="${r1(1.2 * s)}" fill="#6b4a2f"/>`,
    // 牛2頭
    `<ellipse cx="${r1(x - 28 * s)}" cy="${r1(base - 9 * s)}" rx="${r1(10 * s)}" ry="${r1(6 * s)}" fill="#b08a5f"/>`,
    `<g fill="#b08a5f"><rect x="${r1(x - 34 * s)}" y="${r1(base - 7 * s)}" width="${r1(2.6 * s)}" height="${r1(7 * s)}"/><rect x="${r1(x - 28 * s)}" y="${r1(base - 7 * s)}" width="${r1(2.6 * s)}" height="${r1(7 * s)}"/><rect x="${r1(x - 22 * s)}" y="${r1(base - 7 * s)}" width="${r1(2.6 * s)}" height="${r1(7 * s)}"/></g>`,
    `<circle cx="${r1(x - 37 * s)}" cy="${r1(base - 13 * s)}" r="${r1(3.6 * s)}" fill="#b08a5f"/>`,
    `<path d="M${r1(x - 39 * s)},${r1(base - 16 * s)}q-2,-2.6 -1,-5M${r1(x - 35 * s)},${r1(base - 16 * s)}q2,-2.6 1,-5" stroke="#8a6b43" stroke-width="${r1(1.4 * s)}" fill="none"/>`,
  ];
  if (load) {
    for (let i = 0; i < 5; i++) {
      p.push(
        `<path d="M${r1(x - 2 * s + i * 7 * s)},${r1(base - 17 * s)}q${r1(3 * s)},${r1(-7 * s)} ${r1(7 * s)},${r1(-8 * s)}" stroke="#8f9a4a" stroke-width="${r1(2.4 * s)}" fill="none" stroke-linecap="round"/>`,
      );
    }
  }
  return p.join("");
}

/** タバコの乾燥小屋(セカデロ)。棟が高く、屋根が地面近くまで下りる茅葺き。 */
function secadero(x, base, w, h) {
  const hw = r1(w / 2);
  return (
    `<path d="M${r1(x - hw)},${base}L${x},${r1(base - h)}L${r1(x + hw)},${base}z" fill="#a8894a"/>` +
    `<path d="M${r1(x - hw * 0.62)},${base}L${x},${r1(base - h * 0.94)}L${r1(x + hw * 0.62)},${base}z" fill="#96793e" opacity=".7"/>` +
    `<g stroke="#7f6636" stroke-width="1.3" opacity=".7" fill="none"><path d="M${r1(x - hw * 0.55)},${r1(base - h * 0.28)}L${x},${r1(base - h * 0.84)}M${r1(x + hw * 0.55)},${r1(base - h * 0.28)}L${x},${r1(base - h * 0.84)}"/></g>` +
    `<path d="M${r1(x - 7)},${base}v${r1(-h * 0.4)}h14v${r1(h * 0.4)}z" fill="#4a3a26"/>` +
    // 開口から見える、吊るされた葉の列
    `<g stroke="#a8763f" stroke-width="2.2" fill="none"><path d="M${r1(x - 4)},${r1(base - h * 0.36)}v7M${x},${r1(base - h * 0.38)}v8M${r1(x + 4)},${r1(base - h * 0.36)}v7"/></g>` +
    `<path d="M${x},${r1(base - h)}v-6" stroke="#7f6636" stroke-width="2" fill="none"/>`
  );
}

/** モゴテ(石灰岩の岩山)。丸い頂と急な壁、頂上の緑。 */
function mogoteShape(x, base, w, h, rock = "#b8ae9a", dark = "#9a9282") {
  const hw = r1(w / 2);
  return (
    `<path d="M${r1(x - hw)},${base}q${r1(-2)},${r1(-h * 0.72)} ${r1(hw * 0.34)},${r1(-h * 0.92)}q${r1(hw * 0.3)},${r1(-h * 0.14)} ${r1(hw * 0.66)},${r1(-h * 0.08)}q${r1(hw * 0.5)},${r1(0.04 * h)} ${r1(hw * 0.7)},${r1(h * 0.24)}q${r1(hw * 0.36)},${r1(h * 0.34)} ${r1(hw * 0.3)},${r1(h * 0.76)}z" fill="${rock}"/>` +
    `<path d="M${r1(x + hw * 0.28)},${r1(base - h * 0.96)}q${r1(hw * 0.44)},${r1(0.1 * h)} ${r1(hw * 0.6)},${r1(h * 0.28)}q${r1(hw * 0.36)},${r1(h * 0.34)} ${r1(hw * 0.12)},${r1(h * 0.68)}h${r1(-hw * 0.5)}z" fill="${dark}"/>` +
    `<g fill="#5f8f52"><ellipse cx="${r1(x - hw * 0.2)}" cy="${r1(base - h * 0.94)}" rx="${r1(hw * 0.5)}" ry="${r1(h * 0.1)}"/><ellipse cx="${r1(x + hw * 0.3)}" cy="${r1(base - h * 0.88)}" rx="${r1(hw * 0.4)}" ry="${r1(h * 0.09)}"/></g>` +
    `<g stroke="#6b9a5f" stroke-width="1.8" opacity=".7" fill="none"><path d="M${r1(x - hw * 0.4)},${r1(base - h * 0.82)}q${r1(-3)},${r1(h * 0.2)} ${r1(-2)},${r1(h * 0.4)}M${r1(x + hw * 0.1)},${r1(base - h * 0.8)}q${r1(3)},${r1(h * 0.24)} ${r1(2)},${r1(h * 0.44)}"/></g>`
  );
}

/** ボイオ(ヤシ葺きの農家)。 */
function bohio(x, base, w, h) {
  const cx = r1(x + w / 2);
  return (
    `<rect x="${x}" y="${r1(base - h * 0.5)}" width="${w}" height="${r1(h * 0.5)}" fill="#c8b48a"/>` +
    `<g stroke="#a8946a" stroke-width="1.2" opacity=".7" fill="none"><path d="M${r1(x + w * 0.25)},${r1(base - h * 0.5)}v${r1(h * 0.5)}M${r1(x + w * 0.55)},${r1(base - h * 0.5)}v${r1(h * 0.5)}M${r1(x + w * 0.8)},${r1(base - h * 0.5)}v${r1(h * 0.5)}"/></g>` +
    `<path d="M${r1(x - 5)},${r1(base - h * 0.5)}L${cx},${r1(base - h)}L${r1(x + w + 5)},${r1(base - h * 0.5)}z" fill="#a8894a"/>` +
    `<path d="M${r1(x - 1)},${r1(base - h * 0.52)}L${cx},${r1(base - h * 0.94)}L${r1(x + w + 1)},${r1(base - h * 0.52)}" stroke="#8a7040" stroke-width="1.4" fill="none"/>` +
    `<rect x="${r1(cx - 4.4)}" y="${r1(base - h * 0.38)}" width="8.8" height="${r1(h * 0.38)}" fill="#5a4630"/>`
  );
}

/** 松(イスラ・デ・ピノスの名の由来)。 */
function pineTree(x, base, h, fill = "#3f6b4a") {
  return (
    `<rect x="${r1(x - 1.6)}" y="${r1(base - h * 0.3)}" width="3.2" height="${r1(h * 0.3)}" fill="#6b4a2f"/>` +
    `<path d="M${r1(x - h * 0.3)},${r1(base - h * 0.26)}L${x},${r1(base - h * 0.62)}L${r1(x + h * 0.3)},${r1(base - h * 0.26)}z" fill="${fill}"/>` +
    `<path d="M${r1(x - h * 0.24)},${r1(base - h * 0.5)}L${x},${r1(base - h * 0.82)}L${r1(x + h * 0.24)},${r1(base - h * 0.5)}z" fill="${fill}"/>` +
    `<path d="M${r1(x - h * 0.17)},${r1(base - h * 0.72)}L${x},${r1(base - h)}L${r1(x + h * 0.17)},${r1(base - h * 0.72)}z" fill="${fill}"/>`
  );
}

/** 腕木式信号機。 */
function semaphorePost(x, base, h, up = true) {
  return (
    `<rect x="${r1(x - 2)}" y="${r1(base - h)}" width="4" height="${h}" fill="#8a8f8a"/>` +
    `<rect x="${r1(x - 2)}" y="${r1(base - h)}" width="4" height="4" fill="#b8bdb8"/>` +
    (up
      ? `<path d="M${x},${r1(base - h + 8)}l14,-11v5l-14,11z" fill="#c8452f"/><path d="M${r1(x + 9)},${r1(base - h + 1)}l5,-4v5l-4,3z" fill="#f2ead8"/>`
      : `<rect x="${x}" y="${r1(base - h + 8)}" width="15" height="5" fill="#c8452f"/><rect x="${r1(x + 11)}" y="${r1(base - h + 8)}" width="4" height="5" fill="#f2ead8"/>`) +
    `<path d="M${x},${r1(base - h + 12)}v${r1(h - 16)}" stroke="#5f645f" stroke-width="1.2" fill="none"/>`
  );
}

/** 桟橋。杭と板。 */
function jetty(x0, x1, deckY, waterY, deck = "#8a7454") {
  const p = [`<rect x="${x0}" y="${deckY}" width="${r1(x1 - x0)}" height="5" fill="${deck}"/>`];
  p.push(`<rect x="${x0}" y="${r1(deckY + 5)}" width="${r1(x1 - x0)}" height="2" fill="#5f4c33"/>`);
  for (let x = x0 + 6; x < x1; x += 22) {
    p.push(`<rect x="${r1(x)}" y="${r1(deckY + 5)}" width="4" height="${r1(waterY - deckY + 6)}" fill="#5f4c33"/>`);
  }
  return p.join("");
}

/** 積み込みクレーン(桟橋の柱上デリック)。 */
function derrick(x, base, s = 1) {
  return (
    `<g stroke="#5f5a4a" stroke-width="${r1(2.4 * s)}" fill="none">` +
    `<path d="M${x},${base}v${r1(-34 * s)}M${x},${r1(base - 30 * s)}l${r1(22 * s)},${r1(10 * s)}M${x},${r1(base - 34 * s)}l${r1(19 * s)},${r1(13 * s)}"/></g>` +
    `<path d="M${r1(x + 22 * s)},${r1(base - 20 * s)}v${r1(10 * s)}" stroke="#3a3f3a" stroke-width="${r1(1.3 * s)}" fill="none"/>` +
    `<path d="M${r1(x + 19.6 * s)},${r1(base - 10 * s)}h${r1(4.8 * s)}l${r1(-2.4 * s)},${r1(4 * s)}z" fill="#c8a13f"/>`
  );
}

/** 貨物蒸気船。 */
function steamer(x, y, s = 1, hull = "#4a4438", house = "#e0dccc") {
  return (
    `<path d="M${r1(x - 46 * s)},${r1(y - 10 * s)}h${r1(92 * s)}l${r1(-7 * s)},${r1(10 * s)}h${r1(-78 * s)}z" fill="${hull}"/>` +
    `<rect x="${r1(x - 46 * s)}" y="${r1(y - 13 * s)}" width="${r1(92 * s)}" height="${r1(3.4 * s)}" fill="#8a4a30"/>` +
    `<rect x="${r1(x - 14 * s)}" y="${r1(y - 24 * s)}" width="${r1(30 * s)}" height="${r1(11 * s)}" fill="${house}"/>` +
    `<g fill="#3f4a56"><rect x="${r1(x - 10 * s)}" y="${r1(y - 21 * s)}" width="${r1(4 * s)}" height="${r1(4 * s)}"/><rect x="${r1(x - 2 * s)}" y="${r1(y - 21 * s)}" width="${r1(4 * s)}" height="${r1(4 * s)}"/><rect x="${r1(x + 6 * s)}" y="${r1(y - 21 * s)}" width="${r1(4 * s)}" height="${r1(4 * s)}"/></g>` +
    `<rect x="${r1(x - 4 * s)}" y="${r1(y - 36 * s)}" width="${r1(8 * s)}" height="${r1(12 * s)}" fill="#c8452f"/>` +
    `<rect x="${r1(x - 4 * s)}" y="${r1(y - 36 * s)}" width="${r1(8 * s)}" height="${r1(3 * s)}" fill="#2f2f2f"/>` +
    `<path d="M${r1(x - 40 * s)},${r1(y - 13 * s)}v${r1(-14 * s)}l${r1(30 * s)},${r1(8 * s)}" stroke="#5f5a4a" stroke-width="${r1(1.8 * s)}" fill="none"/>`
  );
}

/** タバコの株。中心から大きな楕円の葉。 */
function tobaccoPlant(x, base, s = 1, leaf = "#4f8f52") {
  const p = [];
  for (const [dx, dy, rot] of [
    [-8, -4, -38],
    [8, -4, 38],
    [-6, -9, -16],
    [6, -9, 16],
    [0, -12, 0],
  ]) {
    p.push(
      `<ellipse cx="${r1(x + dx * s)}" cy="${r1(base + dy * s)}" rx="${r1(7.4 * s)}" ry="${r1(3.4 * s)}" fill="${leaf}" transform="rotate(${rot} ${r1(x + dx * s)} ${r1(base + dy * s)})"/>`,
    );
  }
  p.push(`<path d="M${x},${base}v${r1(-10 * s)}" stroke="#3f7040" stroke-width="${r1(1.6 * s)}" fill="none"/>`);
  return p.join("");
}

/** 野の花の株。 */
function flowerTuft(x, base, color = "#f5b31c", s = 1) {
  const p = [];
  for (const [dx, hh] of [
    [-5, 9],
    [-1, 12],
    [3, 8],
    [6, 11],
  ]) {
    p.push(
      `<path d="M${r1(x + dx * s)},${base}q${r1(dx * 0.2)},${r1(-hh * 0.6 * s)} 0,${r1(-hh * s)}" stroke="#5f8f4a" stroke-width="${r1(1.4 * s)}" fill="none"/>`,
      `<circle cx="${r1(x + dx * s)}" cy="${r1(base - hh * s)}" r="${r1(2.2 * s)}" fill="${color}"/>`,
    );
  }
  return p.join("");
}

/** 干してある漁網。杭に掛けた網の菱形。 */
function netOnPoles(x, base, w, h) {
  const mesh = [];
  for (let i = 0; i <= w; i += 8) mesh.push(`M${r1(x + i)},${r1(base - h)}l${r1(Math.min(h, w - i))},${r1(Math.min(h, w - i))}`);
  for (let i = 0; i <= w; i += 8) mesh.push(`M${r1(x + i)},${r1(base - h)}l${r1(-Math.min(h, i))},${r1(Math.min(h, i))}`);
  return (
    `<g fill="#7a5c3a"><rect x="${x}" y="${r1(base - h - 6)}" width="3" height="${r1(h + 6)}"/><rect x="${r1(x + w)}" y="${r1(base - h - 6)}" width="3" height="${r1(h + 6)}"/></g>` +
    `<path d="M${x},${r1(base - h)}h${w}" stroke="#5f4c33" stroke-width="2" fill="none"/>` +
    `<g stroke="#c2b494" stroke-width="0.9" opacity=".8" fill="none"><path d="${mesh.join("")}"/></g>`
  );
}

/** 停まった古い米国車(1950年代型)。キューバの路上の名物。 */
function oldCar(x, base, s = 1, body = "#57a8b8") {
  return (
    `<path d="M${r1(x - 22 * s)},${r1(base - 8 * s)}q${r1(2 * s)},${r1(-6 * s)} ${r1(10 * s)},${r1(-6 * s)}l${r1(4 * s)},${r1(-5 * s)}h${r1(16 * s)}l${r1(4 * s)},${r1(5 * s)}q${r1(8 * s)},0 ${r1(10 * s)},${r1(6 * s)}l${r1(-2 * s)},${r1(4 * s)}h${r1(-40 * s)}z" fill="${body}"/>` +
    `<path d="M${r1(x - 7 * s)},${r1(base - 13.4 * s)}l${r1(3 * s)},${r1(-3.8 * s)}h${r1(9 * s)}l${r1(3 * s)},${r1(3.8 * s)}z" fill="#cfe4f0"/>` +
    `<g fill="#33302c"><circle cx="${r1(x - 11 * s)}" cy="${r1(base - 3 * s)}" r="${r1(3.8 * s)}"/><circle cx="${r1(x + 12 * s)}" cy="${r1(base - 3 * s)}" r="${r1(3.8 * s)}"/></g>` +
    `<g fill="#e8e0cc"><circle cx="${r1(x - 11 * s)}" cy="${r1(base - 3 * s)}" r="${r1(1.5 * s)}"/><circle cx="${r1(x + 12 * s)}" cy="${r1(base - 3 * s)}" r="${r1(1.5 * s)}"/></g>` +
    `<rect x="${r1(x - 23 * s)}" y="${r1(base - 7 * s)}" width="${r1(3 * s)}" height="${r1(2.4 * s)}" fill="#f2d8a0"/>`
  );
}

// ---------------------------------------------------------------------------
// 背景シーン(400×210)
//
// **中央 x=151〜249 / y=54〜152 はシンボルに、(200,155)の楕円は影に隠れる。**
// 見せたいものは左右3分の1と y>170 に置く。
// ---------------------------------------------------------------------------

export const CUBA_BG = {
  /**
   * 首都の港(ハバナ)。1都市だけが使うので、いちばん濃く描く。
   * 左に柱廊の街並み、右に湾口の灯台(エル・モロ)。手前はマレコンの護岸。
   */
  capitalport:
    sky("#8fc4e8", "#d4e8f0", 96) +
    sun(52, 28, 14) +
    clouds(150, 30, 0.9) +
    clouds(330, 22, 0.7) +
    sea(96, "#1f6f96", "#3f9ab0", "#57b8c8") +
    swell(112) +
    // 右:湾口の岬と灯台
    `<path d="M268,110h132v-16q-70,-8 -124,4z" fill="#8a8468"/>` +
    `<path d="M300,96q34,-6 100,-6v8q-56,-2 -100,2z" fill="#6f7f5f"/>` +
    `<rect x="352" y="52" width="14" height="46" fill="#e8dcc0"/>` +
    `<rect x="352" y="52" width="14" height="6" fill="#8a4a30"/>` +
    `<rect x="349" y="44" width="20" height="9" fill="#5f6b70"/>` +
    `<circle cx="359" cy="48" r="3.2" fill="#f5b31c"/>` +
    `<rect x="344" y="86" width="12" height="12" fill="#c2b494"/>` +
    // 湾内の蒸気船
    steamer(310, 140, 0.85) +
    gull(292, 60, 1) +
    gull(316, 50, 0.8) +
    // 左:柱廊つきの街並み
    `<rect x="0" y="66" width="132" height="70" fill="#e0a898"/>` +
    `<rect x="0" y="66" width="132" height="5" fill="#b0623f"/>` +
    `<rect x="0" y="84" width="132" height="3" fill="#c88a78"/>` +
    `<g fill="#3f6b5f"><rect x="8" y="92" width="10" height="16"/><rect x="26" y="92" width="10" height="16"/><rect x="44" y="92" width="10" height="16"/><rect x="62" y="92" width="10" height="16"/><rect x="80" y="92" width="10" height="16"/><rect x="98" y="92" width="10" height="16"/><rect x="116" y="92" width="10" height="16"/></g>` +
    `<g stroke="#f6efe2" stroke-width="1.4" fill="none"><path d="M8,92h10M26,92h10M44,92h10M62,92h10M80,92h10M98,92h10M116,92h10"/></g>` +
    arcadeRow(0, 112, 6, 22, 24, "#e8dcc0", "#8a7f6a") +
    `<rect x="132" y="80" width="36" height="56" fill="#a8cfd8"/>` +
    `<rect x="130" y="80" width="40" height="5" fill="#5f7f8a"/>` +
    `<g fill="#3f5f6a"><rect x="138" y="92" width="9" height="14"/><rect x="152" y="92" width="9" height="14"/><rect x="138" y="114" width="9" height="14"/><rect x="152" y="114" width="9" height="14"/></g>` +
    // 手前:マレコンの護岸と歩道
    ground(150, "#9aa4a8") +
    `<rect x="0" y="150" width="400" height="7" fill="#b8bdc0"/>` +
    `<rect x="0" y="176" width="400" height="6" fill="#8a9498"/>` +
    ground(182, "#a8946a") +
    // 護岸を越える波しぶき
    `<g fill="#e8f4f6" opacity=".85"><ellipse cx="330" cy="148" rx="11" ry="6"/><ellipse cx="342" cy="140" rx="7" ry="5"/><circle cx="336" cy="132" r="3.4"/></g>` +
    // 歩道の人と犬
    person(64, 176, 21, "#e8443f") +
    arm(62, 162, 9, 5) +
    person(96, 176, 20, "#5b8fe8") +
    strawHat(96, 158.9) +
    // 停まった古い車
    shade(272, 178, 26, 4, ".18") +
    oldCar(272, 178, 1.05, "#c8756a") +
    shade(130, 202, 30, 5, ".16") +
    oldCar(130, 202, 1.15, "#57a8b8") +
    lamppost(28, 176, 30) +
    lamppost(388, 176, 30) +
    // 手前の敷石
    `<g stroke="#8a7f62" stroke-width="1.2" opacity=".5" fill="none"><path d="M0,192h400M60,182l-8,28M180,182l-4,28M310,182l6,28"/></g>`,

  /**
   * 小さな町の広場(ベフカル・サン・アントニオ・デ・ロス・バニョス)。
   * 教会と柱廊の家、広場の木陰とベンチ。鉄道はこの町では「駅前」でしかない。
   */
  smalltownplaza:
    sky("#a4d0e8", "#e0ecf0", 104) +
    sun(348, 26, 12) +
    clouds(80, 32, 0.8) +
    clouds(250, 24, 0.6, "#f6efe2", ".6") +
    ground(104, "#c9b98f") +
    // 右:教会
    bellTower(296, 140, 68, 74) +
    // 左:柱廊の家並み
    colHouse(0, 78, 62, 132, "#f2d8a0", "#3f6b5f") +
    colHouse(62, 86, 54, 132, "#a8cfd8", "#8a4a30") +
    arcadeRow(116, 106, 2, 18, 26, "#e0a898", "#8a6b5a") +
    // 広場の床
    ground(148, "#d4c49a") +
    `<g stroke="#b8a87f" stroke-width="1.3" opacity=".6" fill="none"><path d="M0,162h400M0,180h400M0,198h400M56,148l-12,62M148,148l-6,62M256,148l6,62M348,148l12,62"/></g>` +
    // 木陰とベンチ
    `<rect x="52" y="128" width="5" height="26" fill="#6b4a2f"/>` +
    `<g fill="#4f8f52"><ellipse cx="54" cy="118" rx="26" ry="14"/><ellipse cx="38" cy="124" rx="14" ry="9"/><ellipse cx="72" cy="123" rx="13" ry="8"/></g>` +
    shade(54, 156, 26, 4, ".14") +
    benchSeat(34, 172) +
    benchSeat(74, 168) +
    royalPalm(382, 150, 62) +
    shade(382, 151, 10, 2.6, ".16") +
    // 井戸(泉)
    `<ellipse cx="118" cy="186" rx="21" ry="7" fill="#8a9498"/>` +
    `<ellipse cx="118" cy="183" rx="21" ry="7" fill="#b8bdc0"/>` +
    `<ellipse cx="118" cy="183" rx="13" ry="4.4" fill="#57a8c0"/>` +
    `<path d="M118,178q3,-5 0,-9" stroke="#bfe8f4" stroke-width="2" fill="none"/>` +
    // 人々
    person(320, 196, 22, "#f5b31c") +
    person(340, 194, 21, "#e8443f") +
    arm(338, 182, -8, 5) +
    person(160, 190, 20, "#5b8fe8") +
    strawHat(160, 173) +
    // 鶏
    `<g fill="#8a4a30"><ellipse cx="216" cy="192" rx="4.4" ry="3"/><circle cx="220.4" cy="188.4" r="1.8"/></g>` +
    `<path d="M221.8,188l2.4,0.6" stroke="#c8a13f" stroke-width="1.1" fill="none"/>` +
    `<path d="M213,194.6l-1.6,2.6M216.6,194.8l0,2.6" stroke="#6b4a2f" stroke-width="1" fill="none"/>`,

  /**
   * 砂糖の平野(グイネス・アルテミサ)。「キューバの庭」。
   * 平らな畑を、農園主が請願して引かせた線路がまっすぐ横切る。
   */
  sugarplain:
    sky("#9fcce4", "#e4ecd8", 100) +
    sun(60, 30, 13) +
    clouds(180, 26, 0.7) +
    clouds(330, 34, 0.9) +
    ground(100, "#8faa52") +
    // 地平線際の遠いキビと工場の煙突
    caneBand(100, 16, 0, 400, "#7f9a3f", "#8fae4a") +
    `<rect x="330" y="64" width="9" height="38" fill="#8a7f70"/>` +
    `<rect x="330" y="62" width="9" height="4" fill="#6b6256"/>` +
    plume(335, 62, 20, 0.7, "#d8d2c4", ".7") +
    `<rect x="304" y="86" width="34" height="16" fill="#9a9284"/>` +
    `<rect x="302" y="84" width="38" height="4" fill="#7f776a"/>` +
    // 大王ヤシの並び(平野の目印)
    royalPalm(28, 112, 46) +
    royalPalm(66, 110, 38) +
    royalPalm(120, 111, 42, 2) +
    shade(28, 113, 8, 2.2, ".14") +
    shade(66, 111, 7, 2, ".14") +
    // 中景のキビ畑
    caneBand(118, 26, 0, 400, "#87a244", "#95b250") +
    ground(144, "#a08a56") +
    // 手前を横切る1837年式の線路と機関車
    `<path d="M0,144h400v8H0z" fill="#8f7a4c"/>` +
    track(160, 0, 400) +
    steamLoco(84, 158, 1.05) +
    plume(56, 128, 24, 0.9, "#e8e4da", ".85") +
    caneWagon(150, 158, 1.05) +
    caneWagon(216, 158, 1.05) +
    caneWagon(282, 158, 1.05) +
    shade(84, 160, 26, 3.6, ".18") +
    shade(216, 160, 22, 3.2, ".16") +
    // 手前の刈り跡とキビの株
    ground(172, "#96803f") +
    `<g stroke="#7f6a34" stroke-width="1.6" opacity=".7" fill="none"><path d="M0,182q100,4 200,0q100,-4 200,0M0,196q100,4 200,0q100,-4 200,0"/></g>` +
    caneClump(30, 208, 1.2) +
    caneClump(370, 206, 1.1) +
    caneClump(330, 210, 0.9) +
    person(250, 200, 22, "#e8443f") +
    arm(248, 187, 10, 4) +
    egret(140, 200, 1),

  /**
   * タバコの谷(ピナル・デル・リオ・コンソラシオン・デル・スル)。
   * ビエルタ・アバホのベガ。乾燥小屋と、小さな家族の畑。線路は描かない
   * (この州には19世紀の末まで鉄道が来なかった)。
   */
  tobaccovalley:
    sky("#a8cce0", "#e8ecd4", 98) +
    clouds(96, 26, 0.8) +
    clouds(300, 34, 0.7) +
    hills(98, "#6f8f62", 3) +
    hills(101, "#5a7a50", 4) +
    ground(98, "#7f9a58") +
    // 中景:タバコ畑の畝
    `<rect x="0" y="122" width="400" height="30" fill="#6f9a4f"/>` +
    `<g stroke="#5f8a44" stroke-width="2.4" opacity=".85" fill="none"><path d="M0,128h400M0,136h400M0,144h400"/></g>` +
    `<g stroke="#87ae5f" stroke-width="1.6" opacity=".8" fill="none"><path d="M0,132h400M0,140h400M0,148h400"/></g>` +
    // 左:乾燥小屋(セカデロ)
    secadero(64, 122, 92, 58) +
    shade(64, 123, 42, 5, ".16") +
    // 右:ボイオと大王ヤシ
    bohio(300, 120, 52, 42) +
    royalPalm(376, 118, 52, -2) +
    shade(326, 121, 26, 4, ".14") +
    // 手前:赤土とタバコの株
    ground(152, "#a86a48") +
    `<g stroke="#8a5238" stroke-width="1.8" opacity=".7" fill="none"><path d="M0,166q100,5 200,0q100,-5 200,0M0,184q100,5 200,0q100,-5 200,0M0,200q100,5 200,0q100,-5 200,0"/></g>` +
    tobaccoPlant(36, 196, 1.3) +
    tobaccoPlant(88, 204, 1.5) +
    tobaccoPlant(140, 198, 1.2) +
    tobaccoPlant(260, 198, 1.3) +
    tobaccoPlant(318, 206, 1.5) +
    tobaccoPlant(372, 196, 1.25) +
    person(196, 200, 22, "#5b8fe8") +
    strawHat(196, 181.3) +
    arm(194, 188, -9, 6) +
    // 摘んだ葉のかご
    `<path d="M222,200h16l-2.6,-9h-10.8z" fill="#b08a4f"/>` +
    `<g stroke="#8a6b3a" stroke-width="1" fill="none"><path d="M223.4,195.6h13.2M224.8,191h10.4"/></g>` +
    `<g fill="#4f8f52"><ellipse cx="230" cy="189.4" rx="6" ry="2.2"/><ellipse cx="226" cy="187.8" rx="4.4" ry="1.8"/></g>`,

  /**
   * カルスト谷(ビニャーレス)。モゴテに挟まれた赤土の谷。
   * 機械も線路も来ないまま、牛と鋤で耕され続ける。
   */
  karstvalley:
    sky("#a8d0e0", "#e4ecda", 102) +
    sun(196, 24, 11, "#f8e8a8") +
    clouds(60, 34, 0.8) +
    clouds(300, 28, 0.7) +
    ground(102, "#8faa5f") +
    // 左右のモゴテ(中央はシンボルに譲る)
    mogoteShape(58, 128, 104, 92) +
    mogoteShape(340, 124, 116, 82) +
    mogoteShape(130, 112, 52, 40, "#c2b8a4", "#a89e8c") +
    shade(58, 129, 48, 5, ".14") +
    shade(340, 125, 52, 5, ".14") +
    // 谷底の緑
    `<path d="M0,128q100,-8 200,0q100,8 200,-4v18H0z" fill="#7f9a4f"/>` +
    // 手前:赤土の畝と牛耕
    ground(142, "#b06a48") +
    `<g stroke="#94512f" stroke-width="2.2" opacity=".75" fill="none"><path d="M0,158q100,6 200,0q100,-6 200,0M0,174q100,6 200,0q100,-6 200,0M0,190q100,6 200,0q100,-6 200,0M0,204q100,6 200,0q100,-6 200,0"/></g>` +
    // 牛2頭と鋤(左手前)
    oxCart(96, 196, 1.1, false) +
    person(126, 200, 23, "#f5b31c") +
    strawHat(126, 180.3) +
    arm(124, 187, -12, 6) +
    shade(80, 198, 40, 5, ".16") +
    // 右:タバコの株と小屋
    tobaccoPlant(300, 200, 1.4) +
    tobaccoPlant(352, 208, 1.5) +
    secadero(380, 176, 52, 40) +
    // 洞窟の口(左のモゴテの裾)
    `<path d="M20,128q8,-16 20,-16q11,0 17,16z" fill="#4a4038"/>` +
    `<path d="M26,128q6,-10 14,-10q8,0 12,10z" fill="#33302c"/>` +
    gull(240, 52, 0.9) +
    gull(262, 44, 0.8),

  /**
   * 砂糖の積出港(マタンサス・カルデナス・シエンフエゴス・サグア・
   * アンティージャ・ヌエビタス)。**6都市が共有するので、首都に次いで濃く。**
   * 倉庫と桟橋、袋の山、港へ下りる専用線。
   */
  sugarport:
    sky("#93c6e4", "#d8e8ec", 92) +
    clouds(70, 26, 0.8) +
    clouds(230, 20, 0.6) +
    sea(92, "#1f6f96", "#3f9ab0", "#5ab8c4") +
    swell(112) +
    // 沖の蒸気船
    steamer(322, 132, 1) +
    gull(288, 56, 1) +
    gull(310, 66, 0.85) +
    // 左:倉庫の列(丸屋根)
    `<rect x="0" y="76" width="56" height="58" fill="#c2a06f"/>` +
    `<path d="M-4,76h64l-8,-12H4z" fill="#8a4a30"/>` +
    `<rect x="6" y="96" width="14" height="38" fill="#6b4a2f"/>` +
    `<rect x="30" y="96" width="12" height="14" fill="#5f7f96"/>` +
    `<rect x="56" y="84" width="52" height="50" fill="#b09262"/>` +
    `<path d="M52,84h60l-7,-11H59z" fill="#96552f"/>` +
    `<rect x="66" y="100" width="13" height="34" fill="#5f4526"/>` +
    `<rect x="88" y="100" width="11" height="12" fill="#5f7f96"/>` +
    `<rect x="108" y="90" width="44" height="44" fill="#c2a06f"/>` +
    `<path d="M104,90h52l-6,-10h-40z" fill="#8a4a30"/>` +
    `<rect x="118" y="104" width="12" height="30" fill="#6b4a2f"/>` +
    // 岸壁
    ground(134, "#9a8a68") +
    `<rect x="0" y="134" width="400" height="6" fill="#b0a37c"/>` +
    `<path d="M0,140h400v4H0z" fill="#7f7050"/>` +
    // 桟橋(右へ突き出す)
    jetty(252, 400, 148, 176) +
    derrick(286, 148, 1.1) +
    sackPile(320, 150, 3, 2, 0.9) +
    // 専用線が岸壁を走る
    narrowTrack(160, 0, 252) +
    caneWagon(58, 160, 1) +
    `<rect x="108" y="146" width="34" height="14" fill="#6b6a5a"/>` +
    sackPile(110, 160, 2, 1, 0.85) +
    shade(58, 162, 22, 3.2, ".18") +
    // 手前の袋の山と人
    ground(176, "#8f7f5c") +
    sackPile(20, 206, 4, 3, 1.3) +
    sackPile(348, 208, 3, 2, 1.25) +
    person(150, 202, 23, "#e8443f") +
    arm(148, 188, 11, -3) +
    person(178, 204, 22, "#5b8fe8") +
    strawHat(178, 185.3) +
    `<path d="M158,186l16,4" stroke="#ddcfae" stroke-width="5" stroke-linecap="round" fill="none"/>` +
    `<g stroke="#7f7050" stroke-width="1.2" opacity=".5" fill="none"><path d="M0,190h400M0,202h400"/></g>`,

  /**
   * 漁港(バタバノー・カイバリエン)。海綿と小魚の港。
   * 浅いターコイズの湾と、干した網、係留の小舟。
   */
  fishingport:
    sky("#9fd0e4", "#e0f0f0", 94) +
    sun(340, 30, 13) +
    clouds(120, 28, 0.8) +
    sea(94, "#2f8fa0", "#4ab0b8", "#6bd0cc") +
    swell(116, "#d8f4f0") +
    // 遠い低いキー(島)
    `<path d="M8,94q30,-7 62,-3q30,4 52,3v6q-60,2 -114,0z" fill="#6f9a72"/>` +
    `<path d="M300,96q34,-6 100,-4v6q-56,0 -100,2z" fill="#7fa87c"/>` +
    // 桟橋と小屋
    jetty(24, 190, 132, 158, "#96805c") +
    `<rect x="34" y="106" width="34" height="26" fill="#e0d4b4"/>` +
    `<path d="M30,106h42l-6,-10H36z" fill="#4f7f6a"/>` +
    `<rect x="44" y="116" width="10" height="16" fill="#5a4630"/>` +
    // 係留の漁船
    skiff(236, 146, 1.2, "#c8756a") +
    skiff(300, 158, 1.35, "#3f6f9a") +
    skiff(120, 170, 1.2, "#4f8f6a") +
    `<path d="M300,151v-26" stroke="#4a4438" stroke-width="2.2" fill="none"/>` +
    `<path d="M300,127l16,20" stroke="#8a8f8a" stroke-width="1.2" fill="none"/>` +
    gull(180, 66, 1) +
    gull(206, 56, 0.85) +
    gull(352, 74, 0.9) +
    // 手前の浜
    `<path d="M0,168q80,-8 180,-2q120,8 220,-4v48H0z" fill="#e4d4a8"/>` +
    `<path d="M0,168q80,-8 180,-2q120,8 220,-4v6q-100,8 -220,4q-100,-6 -180,2z" fill="#f0e4bc" opacity=".8"/>` +
    // 干した網と海綿のかご
    netOnPoles(40, 206, 60, 26) +
    `<path d="M270,206h20l-3,-11h-14z" fill="#b08a4f"/>` +
    `<g fill="#d8b84a"><circle cx="276" cy="192" r="3.6"/><circle cx="283" cy="190" r="3"/><circle cx="280" cy="196" r="2.6"/></g>` +
    `<path d="M310,208h22l-3,-12h-16z" fill="#a87f46"/>` +
    `<g fill="#c8a86a"><circle cx="317" cy="192" r="3.4"/><circle cx="325" cy="193" r="2.8"/></g>` +
    person(356, 204, 22, "#e8443f") +
    arm(354, 191, -10, 6) +
    strawHat(356, 185.3) +
    // 引き上げた海綿を掛けた綱
    `<path d="M124,180q40,10 80,2" stroke="#7a5c3a" stroke-width="1.6" fill="none"/>` +
    `<g fill="#d8b84a"><circle cx="150" cy="186" r="3.2"/><circle cx="172" cy="187" r="2.8"/><circle cx="192" cy="184" r="3"/></g>`,

  /**
   * 島の町(ヌエバ・ヘロナ)。松の島。本土と結ぶのは船だけ。
   * 柑橘の木箱が桟橋に並ぶ。
   */
  islandtown:
    sky("#9cc8e0", "#dcecec", 96) +
    clouds(90, 30, 0.8) +
    clouds(280, 24, 0.7) +
    sea(96, "#2f7f9a", "#4aa8b4", "#68c8c4") +
    swell(118) +
    // 対岸(本土)はうっすら遠く
    `<path d="M330,96q40,-4 70,-3v5q-40,0 -70,2z" fill="#8fa89a" opacity=".8"/>` +
    // 連絡船(市場へ全部を運ぶ)
    steamer(316, 148, 0.9, "#4a4438", "#e8e0cc") +
    gull(276, 62, 1) +
    gull(300, 54, 0.8) +
    // 左:松の丘(イスラ・デ・ピノス)
    `<path d="M0,96q60,-26 120,-10q40,10 60,10v14H0z" fill="#5f8062"/>` +
    pineTree(26, 100, 44) +
    pineTree(58, 96, 52) +
    pineTree(92, 100, 40) +
    pineTree(122, 103, 32) +
    // 町並み(小さく低い)
    `<rect x="4" y="112" width="30" height="22" fill="#e0d4b4"/>` +
    `<path d="M0,112h38l-5,-8H5z" fill="#b0623f"/>` +
    `<rect x="40" y="116" width="26" height="18" fill="#a8cfd8"/>` +
    `<path d="M36,116h34l-5,-7H41z" fill="#8a4a30"/>` +
    `<rect x="12" y="120" width="8" height="14" fill="#5a4630"/>` +
    // 岸と桟橋
    ground(134, "#c2ab7f") +
    jetty(60, 260, 146, 172, "#8a7454") +
    // 桟橋の柑橘箱
    crate(80, 146, 18, 13) +
    crate(102, 146, 16, 12, "#a8823f") +
    `<g fill="#f2c86a"><circle cx="85" cy="129.6" r="2.6"/><circle cx="92" cy="128.6" r="2.4"/><circle cx="88" cy="124.6" r="2.2"/></g>` +
    sackPile(126, 146, 2, 1, 0.8) +
    person(238, 146, 21, "#f5b31c") +
    arm(236, 133, 9, 4) +
    // 手前の浜と狭軌の名残
    ground(172, "#d8c496") +
    narrowTrack(184, 24, 400, "#7a6a4a", "#8a8f8a") +
    `<rect x="298" y="170" width="34" height="14" fill="#6b6a5a"/>` +
    `<g fill="#f2c86a"><circle cx="306" cy="167" r="3"/><circle cx="314" cy="165.6" r="3.2"/><circle cx="322" cy="167" r="2.8"/><circle cx="310" cy="161.8" r="2.6"/></g>` +
    shade(315, 185, 20, 3, ".16") +
    crate(356, 202, 20, 15) +
    crate(380, 202, 16, 12, "#a8823f") +
    `<g fill="#f2c86a"><circle cx="364" cy="184" r="3"/><circle cx="372" cy="182.6" r="2.8"/></g>` +
    person(40, 204, 23, "#5b8fe8") +
    strawHat(40, 184.6),

  /**
   * 石畳の旧市街(トリニダード・レメディオス・サンクティ・スピリトゥス・ヒバラ)。
   * 砂糖景気が去って、そのまま残った町。線路は無い。
   */
  cobbletown:
    sky("#a8d0e4", "#e8e8d8", 108) +
    sun(64, 30, 12) +
    clouds(180, 24, 0.6) +
    clouds(320, 32, 0.8) +
    ground(108, "#b8a888") +
    // 遠くの鐘楼(通りの奥)
    `<rect x="252" y="58" width="26" height="56" fill="#f2e4c0"/>` +
    `<rect x="250" y="56" width="30" height="5" fill="#c8a13f"/>` +
    `<path d="M254,70a9,9 0 0 1 22,0v8h-22z" fill="#6b5a48" opacity=".9"/>` +
    `<path d="M250,52h30l-15,-14z" fill="#b0623f"/>` +
    // 左の家並み(通りに面す)
    colHouse(0, 74, 68, 148, "#f2d8a0", "#3f6b5f") +
    colHouse(68, 84, 56, 148, "#e0a898", "#4f6b8a") +
    colHouse(124, 92, 42, 148, "#a8cfd8", "#8a4a30") +
    // 右の家並み
    colHouse(296, 84, 58, 148, "#cfe0c0", "#8a4a30") +
    colHouse(354, 76, 46, 148, "#f2d8a0", "#4f6b8a") +
    // 屋根の連なり(瓦の筋)
    `<g stroke="#8a4a30" stroke-width="1.2" opacity=".6" fill="none"><path d="M2,76h64M70,86h52M298,86h54M356,78h42"/></g>` +
    // 石畳
    ground(148, "#a89a84") +
    `<g stroke="#8a7c66" stroke-width="1.4" opacity=".7" fill="none"><path d="M0,158q100,4 200,0q100,-4 200,0M0,170q100,5 200,0q100,-5 200,0M0,184q100,5 200,0q100,-5 200,0M0,198q100,6 200,0q100,-6 200,0"/></g>` +
    `<g fill="#998b74" opacity=".8"><ellipse cx="46" cy="164" rx="7" ry="2.6"/><ellipse cx="102" cy="178" rx="8" ry="3"/><ellipse cx="164" cy="192" rx="9" ry="3.2"/><ellipse cx="252" cy="176" rx="8" ry="3"/><ellipse cx="330" cy="190" rx="9" ry="3"/><ellipse cx="378" cy="166" rx="7" ry="2.6"/></g>` +
    // 雨樋と街灯
    lamppost(140, 168, 30) +
    lamppost(288, 172, 32) +
    // 馬(荷馬)と人
    `<g><ellipse cx="66" cy="186" rx="15" ry="8" fill="#8a6b43"/><g fill="#8a6b43"><rect x="54" y="188" width="3.4" height="12"/><rect x="62" y="188" width="3.4" height="12"/><rect x="72" y="188" width="3.4" height="12"/><rect x="78" y="188" width="3.4" height="12"/></g><path d="M80,180q6,-4 7,-11" stroke="#8a6b43" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="88" cy="167" r="4" fill="#8a6b43"/><path d="M52,182q-4,3 -3,8" stroke="#6b4a2f" stroke-width="2" fill="none"/></g>` +
    `<rect x="94" y="178" width="26" height="12" fill="#b08a4f"/>` +
    `<g fill="#33302c"><circle cx="100" cy="192" r="4"/><circle cx="114" cy="192" r="4"/></g>` +
    person(348, 200, 23, "#e8443f") +
    person(370, 198, 22, "#f5b31c") +
    arm(366, 186, -9, 5),

  /**
   * 鉄道分岐の町(サンタクララ・シエゴ・デ・アビラ・モロン・フロリダ・
   * コロン・ウニオン・デ・レイエス)。**6都市が共有する。**
   * 目的地というより交差点。分岐器・信号・待つ貨車。
   */
  railjunctiontown:
    sky("#9cc8dc", "#e0e4d0", 106) +
    clouds(100, 30, 0.8) +
    clouds(310, 24, 0.7) +
    ground(106, "#b0a06f") +
    // 遠景:給水塔と町
    `<rect x="60" y="70" width="22" height="18" fill="#8a4a30"/>` +
    `<path d="M58,88h26v3H58z" fill="#6b3722"/>` +
    `<g fill="#6b5330"><rect x="62" y="91" width="4" height="15"/><rect x="76" y="91" width="4" height="15"/></g>` +
    `<rect x="4" y="86" width="40" height="20" fill="#d8c8a8"/>` +
    `<path d="M0,86h48l-6,-9H6z" fill="#96552f"/>` +
    `<rect x="100" y="90" width="34" height="16" fill="#c2b494"/>` +
    `<path d="M96,90h42l-5,-8h-32z" fill="#8a4a30"/>` +
    // 右:駅舎とホーム
    `<rect x="282" y="76" width="96" height="46" fill="#e8d8b0"/>` +
    `<path d="M276,76h108l-9,-13h-90z" fill="#b0623f"/>` +
    `<g fill="#4f6b8a"><rect x="292" y="88" width="12" height="18"/><rect x="314" y="88" width="12" height="18"/><rect x="336" y="88" width="12" height="18"/><rect x="358" y="88" width="12" height="18"/></g>` +
    `<rect x="276" y="122" width="124" height="8" fill="#b8a882"/>` +
    `<rect x="276" y="130" width="124" height="3" fill="#8f7f5c"/>` +
    // 腕木信号と転轍てこ
    semaphorePost(262, 122, 58, true) +
    semaphorePost(28, 132, 46, false) +
    // 本線と分岐(手前で2本に開く)
    ground(133, "#a08a56") +
    track(140, 0, 400) +
    `<path d="M0,168q120,-14 250,-22q80,-5 150,-4" stroke="#6b5330" stroke-width="9" fill="none" opacity=".9"/>` +
    `<path d="M0,166q120,-14 250,-22q80,-5 150,-4" stroke="#8a8f92" stroke-width="2.2" fill="none"/>` +
    `<path d="M0,171q120,-14 252,-22q78,-5 148,-4" stroke="#8a8f92" stroke-width="2.2" fill="none"/>` +
    track(178, 0, 400) +
    // 待つ貨車(キビ)と有蓋車
    caneWagon(330, 140, 0.95) +
    `<rect x="42" y="122" width="42" height="18" fill="#8a5a3a"/>` +
    `<path d="M42,122h42v3H42z" fill="#6b422a"/>` +
    `<g fill="#33302c"><circle cx="52" cy="141" r="3.4"/><circle cx="74" cy="141" r="3.4"/></g>` +
    `<rect x="58" y="127" width="9" height="10" fill="#4f3a26"/>` +
    // 手前の砂利と作業員
    ground(190, "#96864f") +
    `<g fill="#8a7a48" opacity=".8"><ellipse cx="60" cy="198" rx="10" ry="3"/><ellipse cx="150" cy="204" rx="12" ry="3.4"/><ellipse cx="290" cy="200" rx="11" ry="3"/><ellipse cx="360" cy="206" rx="10" ry="3"/></g>` +
    person(114, 206, 23, "#e8443f") +
    arm(112, 193, 11, 3) +
    `<path d="M123,196l10,-3" stroke="#6b5330" stroke-width="2.4" fill="none"/>` +
    person(228, 204, 22, "#f5b31c") +
    strawHat(228, 185.3) +
    // 転轍機の重り
    `<circle cx="250" cy="196" r="5" fill="#c8452f"/>` +
    `<rect x="248.6" y="196" width="2.8" height="12" fill="#5f645f"/>`,

  /**
   * 州都(カマグエイ・サンティアゴ・デ・クーバ・オルギン)。
   * 大聖堂と柱廊、うしろに山。広場に人が多い。
   */
  provincialcapital:
    sky("#98c4e0", "#dce8e4", 100) +
    sun(344, 26, 12) +
    clouds(80, 30, 0.8) +
    sierra(100, 30, "#7590a0", 2) +
    sierra(112, 22, "#5f7a8a", 3) +
    ground(122, "#c2b490") +
    // 左:大聖堂
    bellTower(10, 138, 84, 92) +
    // 右:柱廊と市場
    arcadeRow(268, 106, 4, 24, 30, "#e8d8b0", "#8a7f6a") +
    `<rect x="268" y="96" width="96" height="10" fill="#c2a06f"/>` +
    `<rect x="266" y="94" width="100" height="4" fill="#96552f"/>` +
    colHouse(364, 84, 36, 136, "#e0a898", "#3f6b5f") +
    `<rect x="268" y="60" width="60" height="36" fill="#cfe0c0"/>` +
    `<rect x="266" y="58" width="64" height="5" fill="#6f8a5f"/>` +
    `<g fill="#4f6b8a"><rect x="276" y="68" width="10" height="16"/><rect x="294" y="68" width="10" height="16"/><rect x="312" y="68" width="10" height="16"/></g>` +
    // 広場
    ground(150, "#d0c096") +
    `<g stroke="#b0a078" stroke-width="1.3" opacity=".6" fill="none"><path d="M0,162h400M0,178h400M0,194h400M80,150l-16,60M200,150l0,60M320,150l16,60"/></g>` +
    // 大王ヤシと記念柱
    royalPalm(118, 150, 56, 2) +
    shade(118, 151, 9, 2.4, ".14") +
    `<rect x="248" y="118" width="7" height="34" fill="#b8b2a4"/>` +
    `<rect x="245" y="150" width="13" height="5" fill="#9a9284"/>` +
    `<circle cx="251.5" cy="114" r="5" fill="#c8a13f"/>` +
    // 広場の人々
    person(60, 200, 24, "#e8443f") +
    person(84, 198, 23, "#5b8fe8") +
    arm(82, 185, -9, 5) +
    person(160, 204, 24, "#f5b31c") +
    strawHat(160, 183.6) +
    person(300, 200, 23, "#4f8f6a") +
    person(330, 202, 24, "#e0a898") +
    arm(328, 189, 10, 4) +
    // 荷車と鳩
    `<rect x="360" y="188" width="26" height="10" fill="#b08a4f"/>` +
    `<g fill="#33302c"><circle cx="366" cy="200" r="3.6"/><circle cx="380" cy="200" r="3.6"/></g>` +
    `<g fill="#8a8f92"><ellipse cx="216" cy="196" rx="3.4" ry="2.2"/><ellipse cx="230" cy="200" rx="3.2" ry="2"/><circle cx="219" cy="193.4" r="1.4"/><circle cx="233" cy="197.6" r="1.3"/></g>`,

  /**
   * 企業城下町(チャパラ・ハティボニコ)。町全体が一つの製糖工場に仕える。
   * 巨大な工場と、会社が引いた画一的な社宅の列。**構造で語る。**
   */
  companymilltown:
    sky("#a4c4cc", "#ded4b8", 104) +
    clouds(260, 26, 0.7, "#efe8d4", ".6") +
    hills(104, "#7f8f62", 3) +
    ground(104, "#c2ab72") +
    // 左:セントラル(製糖工場)
    `<rect x="0" y="46" width="110" height="68" fill="#9a9284"/>` +
    `<rect x="0" y="46" width="110" height="5" fill="#7f776a"/>` +
    `<g fill="#5f7f96"><rect x="10" y="60" width="12" height="15"/><rect x="30" y="60" width="12" height="15"/><rect x="50" y="60" width="12" height="15"/><rect x="70" y="60" width="12" height="15"/><rect x="90" y="60" width="12" height="15"/></g>` +
    `<g fill="#4f4a42"><rect x="10" y="84" width="12" height="15"/><rect x="30" y="84" width="12" height="15"/><rect x="70" y="84" width="12" height="15"/></g>` +
    `<rect x="16" y="16" width="12" height="30" fill="#8a7f70"/>` +
    `<rect x="16" y="14" width="12" height="4" fill="#6b6256"/>` +
    `<rect x="66" y="8" width="14" height="38" fill="#8a7f70"/>` +
    `<rect x="66" y="6" width="14" height="4" fill="#6b6256"/>` +
    plume(73, 8, 22, 0.9, "#d8d2c4", ".8") +
    plume(22, 16, 14, 0.6, "#c8c2b4", ".7") +
    `<path d="M110,70l26,10v34h-26z" fill="#8a8274"/>` +
    // 右:同じ形の社宅が並ぶ(会社が引いた計画)
    `<g>${[262, 306, 350].map((x) => `<rect x="${x}" y="94" width="34" height="24" fill="#d8c8a8"/><path d="M${x - 4},94h42l-6,-10h-30z" fill="#96552f"/><rect x="${x + 13}" y="102" width="8" height="16" fill="#5a4630"/><rect x="${x + 4}" y="100" width="7" height="8" fill="#4f6b8a"/>`).join("")}</g>` +
    `<g>${[284, 328, 372].map((x) => `<rect x="${x}" y="122" width="34" height="24" fill="#cfc0a0"/><path d="M${x - 4},122h42l-6,-10h-30z" fill="#8a4a30"/><rect x="${x + 13}" y="130" width="8" height="16" fill="#5a4630"/>`).join("")}</g>` +
    // うしろのキビ畑
    caneBand(118, 22, 0, 262, "#7f9a3f", "#8fae4a") +
    // 手前:専用線がキビを運び込む
    ground(146, "#b09a68") +
    narrowTrack(160, 0, 400) +
    caneWagon(52, 160, 1) +
    caneWagon(118, 160, 1) +
    caneWagon(184, 160, 1) +
    shade(52, 162, 22, 3.4, ".18") +
    shade(118, 162, 22, 3.4, ".18") +
    // 会社の売店と計量所
    ground(176, "#a08a56") +
    `<rect x="298" y="168" width="52" height="30" fill="#c2b494"/>` +
    `<path d="M292,168h64l-8,-12h-48z" fill="#8a4a30"/>` +
    `<rect x="316" y="180" width="14" height="18" fill="#5a4630"/>` +
    sackPile(360, 202, 2, 2, 1) +
    person(266, 204, 23, "#5b8fe8") +
    strawHat(266, 184.6) +
    person(240, 206, 22, "#e8443f") +
    arm(238, 193, -10, 5) +
    `<g stroke="#8a7a48" stroke-width="1.4" opacity=".6" fill="none"><path d="M0,190h280M0,202h250"/></g>` +
    caneClump(24, 208, 1.1),

  /**
   * 牧畜の町(プラセタス・ラス・トゥナス・バヤモ)。
   * サバナと牛、柵、シラサギ。キビではなく牛が貨車に乗る土地。
   */
  cattletown:
    sky("#a8d0dc", "#ecf0d8", 102) +
    sun(70, 28, 13) +
    clouds(190, 26, 0.7) +
    clouds(330, 32, 0.8) +
    ground(102, "#8faa5f") +
    // 地平線の木立と風車
    `<g fill="#5f8a52"><ellipse cx="40" cy="102" rx="26" ry="8"/><ellipse cx="120" cy="104" rx="20" ry="6"/><ellipse cx="330" cy="102" rx="30" ry="8"/></g>` +
    `<path d="M368,104V72" stroke="#8a8f8a" stroke-width="2.4" fill="none"/>` +
    `<g stroke="#8a8f8a" stroke-width="1.6" fill="none"><path d="M368,72l8,-6M368,72l8,6M368,72l-8,-6M368,72l-8,6"/></g>` +
    `<circle cx="368" cy="72" r="2" fill="#5f645f"/>` +
    // 中景の草地と大王ヤシ
    `<path d="M0,110q100,-6 200,0q100,6 200,-2v16H0z" fill="#9fba6a"/>` +
    royalPalm(94, 124, 48, -2) +
    royalPalm(320, 120, 40, 2) +
    shade(94, 125, 8, 2.2, ".14") +
    // 放牧の牛たち
    cow(50, 138, 1) +
    cow(140, 142, 0.9, "#a8875a") +
    cow(298, 138, 0.95, "#d8c8a8") +
    egret(66, 138, 0.9) +
    egret(316, 136, 0.85) +
    // 柵と手前の牧草
    ground(146, "#a0b86a") +
    fenceRail(0, 400, 168) +
    `<g stroke="#87a24f" stroke-width="1.8" opacity=".7" fill="none"><path d="M20,196q4,-8 2,-14M60,204q4,-8 2,-14M150,198q4,-8 2,-13M250,204q4,-9 2,-15M330,198q4,-8 2,-13M382,206q4,-8 2,-14"/></g>` +
    // 牧童(騎乗)
    `<g><ellipse cx="212" cy="188" rx="16" ry="8" fill="#6b4a2f"/><g fill="#6b4a2f"><rect x="200" y="190" width="3.6" height="14"/><rect x="208" y="190" width="3.6" height="14"/><rect x="218" y="190" width="3.6" height="14"/><rect x="224" y="190" width="3.6" height="14"/></g><path d="M226,182q7,-4 8,-12" stroke="#6b4a2f" stroke-width="4.4" fill="none" stroke-linecap="round"/><circle cx="236" cy="168" r="4.4" fill="#6b4a2f"/><path d="M198,184q-5,3 -4,9" stroke="#4f3a26" stroke-width="2" fill="none"/></g>` +
    person(210, 180, 20, "#e8443f") +
    strawHat(210, 163.9) +
    arm(212, 170, 11, 2) +
    // 水飲み場
    `<rect x="330" y="192" width="44" height="10" fill="#8a8f8a"/>` +
    `<rect x="332" y="194" width="40" height="5" fill="#57a8c0"/>` +
    cow(356, 194, 1.05, "#b08a5f") +
    egret(112, 200, 1) +
    flowerTuft(46, 206, "#f5b31c", 1.1) +
    flowerTuft(288, 208, "#e8443f", 1),

  /**
   * 孤立した入り江(バラコア)。三方を山に囲まれ、1965年まで道が無かった。
   * 卓状のエル・ユンケと、船だけが出入りする浜。
   */
  isolatedcove:
    sky("#8fb8cc", "#d0e0dc", 88) +
    clouds(60, 24, 0.8, "#e8e8dc", ".9") +
    clouds(200, 18, 0.6, "#e8e8dc", ".7") +
    // 卓状の山(エル・ユンケ)
    `<path d="M22,88h86l-10,-26H34z" fill="#5f7a6a"/>` +
    `<path d="M22,88h86v4H22z" fill="#4f6a5a"/>` +
    `<path d="M34,62h64v-4H36z" fill="#6f8a78"/>` +
    // 取り囲む山なみ(左右から海へ落ちる)
    sierra(88, 34, "#4f7058", 2) +
    sierra(102, 26, "#3f5f4c", 3) +
    sea(118, "#1f6f8a", "#3f96a4", "#57bcba") +
    swell(136, "#cfeee8") +
    // 入り江の小さな町(浜に張り付く)
    `<path d="M0,150q60,-10 120,-4q60,6 100,2v62H0z" fill="#d8c496"/>` +
    `<rect x="18" y="130" width="28" height="20" fill="#e0d4b4"/>` +
    `<path d="M14,130h36l-5,-8H19z" fill="#b0623f"/>` +
    `<rect x="52" y="134" width="24" height="17" fill="#a8cfd8"/>` +
    `<path d="M48,134h32l-5,-7H53z" fill="#8a4a30"/>` +
    `<rect x="82" y="132" width="26" height="19" fill="#e0a898"/>` +
    `<path d="M78,132h34l-5,-8H83z" fill="#96552f"/>` +
    `<rect x="26" y="138" width="8" height="12" fill="#5a4630"/>` +
    `<rect x="90" y="140" width="8" height="11" fill="#5a4630"/>` +
    palm(126, 152, 34, -4) +
    palm(12, 150, 30, 3) +
    // 船だけが出入りする
    skiff(322, 152, 1.3, "#c8756a") +
    skiff(272, 138, 1, "#3f6f9a") +
    gull(300, 70, 0.9) +
    gull(330, 60, 0.8) +
    // 山を越えられなかった道(切れて終わる)
    `<path d="M0,120q30,4 52,0" stroke="#b8a882" stroke-width="2.6" opacity=".7" fill="none" stroke-dasharray="8 11"/>` +
    // 手前の浜:カカオとココナッツ
    `<path d="M0,178q90,-8 200,-2q110,6 200,-4v38H0z" fill="#e4d4a8"/>` +
    `<g fill="#8a5a30"><ellipse cx="60" cy="196" rx="7" ry="4.4" transform="rotate(-18 60 196)"/><ellipse cx="76" cy="200" rx="6.4" ry="4" transform="rotate(14 76 200)"/><ellipse cx="52" cy="204" rx="6" ry="3.8" transform="rotate(8 52 204)"/></g>` +
    `<g stroke="#6b4222" stroke-width="1" opacity=".8" fill="none"><path d="M55,193l10,5M71,197l10,5M47,202l10,4"/></g>` +
    `<g fill="#7a6247"><circle cx="330" cy="196" r="4.4"/><circle cx="342" cy="200" r="4"/><circle cx="322" cy="204" r="3.6"/></g>` +
    person(226, 204, 23, "#f5b31c") +
    arm(224, 191, -10, 5) +
    `<path d="M214,196h-16l2.6,-10h10.8z" fill="#b08a4f"/>`,

  /**
   * 山あいの町(グアンタナモ)。乾いた谷と山なみ。
   * 西の砂糖路線ほどの貨物は、ここには一度も流れなかった。
   */
  mountaintown:
    sky("#a4c8d8", "#e8e4cc", 98) +
    sun(60, 26, 12) +
    clouds(220, 22, 0.6) +
    sierra(98, 36, "#7a8f7f", 1) +
    sierra(112, 26, "#62796a", 3) +
    ground(124, "#b8a878") +
    // 谷の段々の家並み(斜面に張り付く)
    `<rect x="6" y="106" width="30" height="20" fill="#e0d4b4"/>` +
    `<path d="M2,106h38l-5,-8H7z" fill="#96552f"/>` +
    `<rect x="42" y="112" width="26" height="16" fill="#cfe0c0"/>` +
    `<path d="M38,112h34l-5,-7H43z" fill="#8a4a30"/>` +
    `<rect x="74" y="108" width="28" height="19" fill="#e0a898"/>` +
    `<path d="M70,108h36l-5,-8H75z" fill="#b0623f"/>` +
    `<rect x="14" y="112" width="8" height="14" fill="#5a4630"/>` +
    `<rect x="82" y="114" width="8" height="13" fill="#5a4630"/>` +
    // 右:小さな駅と単線(貨物は少ない)
    `<rect x="308" y="102" width="62" height="26" fill="#d8c8a8"/>` +
    `<path d="M302,102h74l-7,-11h-60z" fill="#8a4a30"/>` +
    `<g fill="#4f6b8a"><rect x="318" y="110" width="10" height="14"/><rect x="336" y="110" width="10" height="14"/><rect x="354" y="110" width="10" height="14"/></g>` +
    `<rect x="302" y="128" width="86" height="6" fill="#b8a882"/>` +
    // 乾いた畑とサボテン
    `<g stroke="#a08a56" stroke-width="2" opacity=".7" fill="none"><path d="M0,140h400M0,150h400"/></g>` +
    track(140, 240, 400, "#7a6a4a") +
    // 手前:乾いた道と山羊
    ground(156, "#c2a878") +
    `<path d="M0,168q120,10 240,4q90,-4 160,2v36H0z" fill="#cfb287"/>` +
    `<g stroke="#a8895f" stroke-width="1.4" opacity=".6" fill="none"><path d="M0,182h400M0,196h400"/></g>` +
    // 竜舌蘭とサボテン
    `<g fill="#6f9a5f"><path d="M30,204q-8,-2 -12,-10q8,0 12,6q4,-8 12,-9q-4,9 -12,13z"/><path d="M30,204q0,-12 0,-16" stroke="#5f8a4f" stroke-width="2.4"/></g>` +
    `<path d="M356,178v-24q0,-5 5,-5t5,5v4M356,166h-7q-5,0 -5,-5v-6" stroke="#5f8f52" stroke-width="5" fill="none" stroke-linecap="round"/>` +
    // 山羊2頭
    `<g fill="#d8c8a8"><ellipse cx="150" cy="192" rx="10" ry="5.4"/><circle cx="159" cy="186" r="3.2"/><rect x="144" y="194" width="2.6" height="8"/><rect x="153" y="194" width="2.6" height="8"/></g>` +
    `<path d="M158,183q2,-3 1,-5" stroke="#a8946a" stroke-width="1.4" fill="none"/>` +
    `<g fill="#b8a078"><ellipse cx="188" cy="198" rx="9" ry="5"/><circle cx="196" cy="192.6" r="3"/><rect x="183" y="200" width="2.4" height="7"/><rect x="191" y="200" width="2.4" height="7"/></g>` +
    person(276, 204, 23, "#5b8fe8") +
    strawHat(276, 184.6) +
    arm(274, 191, -10, 4) +
    person(84, 206, 22, "#e8443f") +
    gull(140, 60, 0.9),

  /**
   * 海岸通りとヤシ(マンサニージョ)。線路の敷けない沼地の分まで
   * 港が働いた町。海沿いの遊歩道と傾いだヤシ。
   */
  coastalpalms:
    sky("#98cce0", "#e8f0e8", 92) +
    sun(76, 30, 14, "#f8dc7a") +
    clouds(200, 24, 0.7) +
    clouds(340, 30, 0.8) +
    sea(92, "#2f8298", "#4aa8ac", "#68c8bc") +
    swell(112, "#d8f4ec") +
    // 河口の砂州(ぬかるみ。線路が敷けなかった地形)
    `<path d="M0,100q60,-6 110,-2q40,4 60,2v8q-90,4 -170,0z" fill="#8fa87f"/>` +
    `<g stroke="#6f8a62" stroke-width="1.6" opacity=".7" fill="none"><path d="M14,104q6,-4 12,0M52,102q6,-4 12,0M96,104q6,-4 12,0"/></g>` +
    // 沖の帆船と艀
    `<path d="M300,128q16,7 34,0q-16,-4 -34,0z" fill="#8a6b43"/>` +
    `<path d="M316,126v-22M316,106l14,14h-14" stroke="#e8e0cc" stroke-width="2" fill="none"/>` +
    `<path d="M316,106l14,14h-14z" fill="#efe8d0"/>` +
    skiff(360, 148, 1.1, "#c8756a") +
    gull(260, 60, 1) +
    gull(286, 50, 0.85) +
    // 遊歩道(マレコン)
    ground(150, "#c2b490") +
    `<rect x="0" y="150" width="400" height="6" fill="#d8ccA4"/>` +
    `<rect x="0" y="172" width="400" height="5" fill="#a89a74"/>` +
    // 手すり
    `<g fill="#8a9498"><rect x="0" y="132" width="400" height="3"/><rect x="12" y="135" width="3" height="15"/><rect x="62" y="135" width="3" height="15"/><rect x="112" y="135" width="3" height="15"/><rect x="162" y="135" width="3" height="15"/><rect x="212" y="135" width="3" height="15"/><rect x="262" y="135" width="3" height="15"/><rect x="312" y="135" width="3" height="15"/><rect x="362" y="135" width="3" height="15"/></g>` +
    // 傾いだヤシの並び
    palm(40, 172, 52, -8) +
    palm(112, 170, 44, 6) +
    palm(300, 172, 50, -7) +
    palm(372, 170, 42, 5) +
    shade(40, 173, 10, 2.6, ".15") +
    shade(300, 173, 10, 2.6, ".15") +
    ground(177, "#cfb287") +
    // ベンチと人々
    benchSeat(150, 200, 30, "#4f7f6a") +
    benchSeat(240, 202, 30, "#4f7f6a") +
    person(140, 204, 23, "#e8443f") +
    person(212, 206, 24, "#f5b31c") +
    strawHat(212, 185.6) +
    arm(214, 194, 11, 3) +
    person(330, 204, 23, "#5b8fe8") +
    arm(328, 191, -10, 5) +
    // 楽の音(ギターを持つ人)
    `<ellipse cx="352" cy="196" rx="5.4" ry="3.6" fill="#c8a13f" transform="rotate(-24 352 196)"/>` +
    `<path d="M355,193l7,-6" stroke="#8a6b3a" stroke-width="1.8" fill="none"/>` +
    lamppost(80, 200, 32) +
    lamppost(388, 202, 32),

  /**
   * 鉱山の町(エル・コブレ・モア)。銅と、砂糖に代わったニッケル。
   * 赤いラテライトの段丘とコンベア、精錬の煙。
   */
  miningtown:
    sky("#a4b8c0", "#d8ccb4", 96) +
    clouds(120, 24, 0.7, "#e4ded0", ".7") +
    sierra(96, 28, "#7a8578", 2) +
    ground(108, "#a8764f") +
    // 精錬プラント(左)
    `<rect x="8" y="58" width="74" height="50" fill="#8f8a7c"/>` +
    `<rect x="8" y="58" width="74" height="5" fill="#6f6a5e"/>` +
    `<g fill="#5f7f96"><rect x="16" y="70" width="11" height="13"/><rect x="34" y="70" width="11" height="13"/><rect x="52" y="70" width="11" height="13"/></g>` +
    `<g fill="#4f4a42"><rect x="16" y="90" width="11" height="13"/><rect x="52" y="90" width="11" height="13"/></g>` +
    `<rect x="20" y="28" width="11" height="30" fill="#7f7a6c"/>` +
    `<rect x="20" y="26" width="11" height="4" fill="#5f5a50"/>` +
    `<rect x="56" y="20" width="12" height="38" fill="#7f7a6c"/>` +
    `<rect x="56" y="18" width="12" height="4" fill="#5f5a50"/>` +
    plume(62, 20, 20, 0.8, "#cfc7b8", ".8") +
    // 赤土の段丘(右)
    `<path d="M252,108h148v-20q-40,-8 -76,-2q-40,6 -72,10z" fill="#96562f"/>` +
    `<g stroke="#7a4224" stroke-width="2" opacity=".8" fill="none"><path d="M262,100q60,-8 138,-6M270,92q50,-6 130,-6"/></g>` +
    // 傾斜コンベア(段丘から工場側へ)
    `<path d="M370,84L150,128" stroke="#5f5a50" stroke-width="4" fill="none"/>` +
    `<path d="M370,88L152,132" stroke="#4a4640" stroke-width="2.4" fill="none"/>` +
    `<g fill="#5f5a50"><rect x="200" y="120" width="4" height="22"/><rect x="260" y="108" width="4" height="30"/><rect x="320" y="96" width="4" height="38"/></g>` +
    `<g fill="#33302c"><circle cx="180" cy="124" r="2.2"/><circle cx="240" cy="112" r="2.2"/><circle cx="300" cy="100" r="2.2"/><circle cx="352" cy="90" r="2.2"/></g>` +
    // 鉱山の入り口(坑口)
    `<path d="M330,142q7,-16 18,-16q11,0 16,16z" fill="#4a4038"/>` +
    `<path d="M335,142q5,-10 13,-10q8,0 11,10z" fill="#2b2824"/>` +
    `<g stroke="#7a5c3a" stroke-width="3" fill="none"><path d="M331,142v-13M363,142v-13M330,129h34"/></g>` +
    ground(142, "#b06a3f") +
    // 鉱石の山と貨車
    `<g fill="#8a4a26"><path d="M40,168l16,-16l17,16z"/><path d="M70,168l13,-12l14,12z"/></g>` +
    `<g fill="#a85a30"><path d="M46,168l10,-9l11,9z"/></g>` +
    narrowTrack(176, 0, 400, "#6b5340", "#8a8f8a") +
    `<rect x="130" y="158" width="38" height="16" fill="#6b6a5a"/>` +
    `<path d="M134,158l8,-7l9,7z" fill="#96562f"/>` +
    `<path d="M148,158l7,-6l8,6z" fill="#8a4a26"/>` +
    `<g fill="#33302c"><circle cx="140" cy="176" r="3.4"/><circle cx="158" cy="176" r="3.4"/></g>` +
    `<rect x="230" y="160" width="36" height="14" fill="#6b6a5a"/>` +
    `<path d="M234,160l8,-6l9,6z" fill="#96562f"/>` +
    `<g fill="#33302c"><circle cx="240" cy="176" r="3.2"/><circle cx="257" cy="176" r="3.2"/></g>` +
    // 手前:赤土と作業員
    ground(188, "#9a5a34") +
    person(310, 206, 23, "#f5b31c") +
    arm(308, 193, 10, 4) +
    person(60, 208, 23, "#5b8fe8") +
    arm(58, 195, -10, 5) +
    `<g stroke="#7a4224" stroke-width="1.6" opacity=".6" fill="none"><path d="M0,196h400M0,206h400"/></g>`,
};

// ---------------------------------------------------------------------------
// 都市シンボル(24×24)
//
// 盤面上では直径19pxほどの点になる。輪郭を優先し、主役は1つに絞る。
// ---------------------------------------------------------------------------

export const CUBA_MARKS = {
  /** 蒸気機関車の車庫(ハバナ)。**1837年式のラッパ煙突。** */
  steamdepot:
    '<rect x="0.8" y="21.2" width="22.4" height="1.4" fill="#b8a882"/>' +
    '<g fill="#6b5330"><rect x="1.4" y="20" width="3.4" height="1.6"/><rect x="7" y="20" width="3.4" height="1.6"/><rect x="12.6" y="20" width="3.4" height="1.6"/><rect x="18.2" y="20" width="3.4" height="1.6"/></g>' +
    '<g fill="#8a8f92"><rect x="0.8" y="19.2" width="22.4" height="1"/><rect x="0.8" y="21.6" width="22.4" height="1"/></g>' +
    '<path d="M2,10.4l3,-3.4v3.4z" fill="#8a4a30"/>' +
    '<rect x="4" y="10" width="12.4" height="5.4" rx="2" fill="#3f4a42"/>' +
    '<path d="M5.6,10V5.6l-1.6,-3h6l-1.6,3V10z" fill="#2b2b28"/>' +
    '<path d="M12.4,10q1.6,-3 3.2,0z" fill="#c8a13f"/>' +
    '<rect x="16.4" y="7.4" width="1.6" height="8" fill="#7a5c30"/>' +
    '<rect x="18" y="11" width="5" height="4.4" fill="#7a5c30"/>' +
    '<rect x="2.6" y="15" width="20" height="1.6" fill="#33302c"/>' +
    '<g fill="#33302c"><circle cx="18.4" cy="18" r="2.9"/><circle cx="11" cy="18.6" r="2.1"/><circle cx="5.8" cy="18.6" r="2.1"/></g>' +
    '<g fill="#8a8f92"><circle cx="18.4" cy="18" r="1"/><circle cx="11" cy="18.6" r="0.7"/><circle cx="5.8" cy="18.6" r="0.7"/></g>' +
    '<g fill="#e8e4da" opacity=".9"><circle cx="6.4" cy="2" r="1.6"/><circle cx="9.4" cy="1.2" r="1.2"/></g>',

  /** 最初の終着駅(ベフカル)。**線路が車止めで終わる。** */
  firstterminus:
    '<rect x="0" y="21.2" width="24" height="2.8" fill="#b8a882"/>' +
    '<g fill="#6b5330"><rect x="0.8" y="19.8" width="2.8" height="1.8"/><rect x="5.2" y="19.8" width="2.8" height="1.8"/><rect x="9.6" y="19.8" width="2.8" height="1.8"/><rect x="14" y="19.8" width="2.8" height="1.8"/></g>' +
    '<g fill="#8a8f92"><rect x="0" y="18.8" width="17" height="1.2"/><rect x="0" y="20.8" width="17" height="1.2"/></g>' +
    '<path d="M17.4,22L22,13.2l1.6,0.9L19.2,22z" fill="#7a5c30"/>' +
    '<rect x="20.8" y="15.4" width="1.8" height="6.6" fill="#8a6b43"/>' +
    '<rect x="16.2" y="16.2" width="3.4" height="5" rx="0.7" fill="#c8452f"/>' +
    '<circle cx="17.9" cy="18.7" r="1" fill="#8a2a1f"/>' +
    '<rect x="0.8" y="14.6" width="12.6" height="2.6" fill="#c2b494"/>' +
    '<rect x="0.8" y="17.2" width="12.6" height="1" fill="#8a7f62"/>' +
    '<rect x="2.4" y="7.4" width="8.4" height="7.2" fill="#e8dcc0"/>' +
    '<path d="M1.4,7.4h10.4l-1.4,-2.6H2.8z" fill="#8a4a30"/>' +
    '<rect x="5.4" y="9.4" width="2.4" height="5.2" fill="#5a4630"/>' +
    '<g fill="#e8e4da" opacity=".85"><circle cx="16" cy="4.4" r="1.7"/><circle cx="19" cy="3" r="1.3"/><circle cx="21.6" cy="2.2" r="1"/></g>',

  /** サトウキビ畑(グイネス)。**節のある茎と反った葉。** */
  canefield:
    '<rect x="0.8" y="21" width="22.4" height="2" fill="#8f7a4c"/>' +
    '<g stroke="#a8b85a" stroke-width="2.4" stroke-linecap="round" fill="none"><path d="M5,21.4q-0.6,-9 0.6,-16M11.6,21.4q0,-9.4 0,-17M18.2,21.4q0.6,-9 -0.6,-16"/></g>' +
    '<g stroke="#8a9a3a" stroke-width="1" opacity=".9" fill="none"><path d="M4.4,15h2.4M4.8,9.4h2.4M10.4,14h2.4M10.4,7.6h2.4M17,15h2.4M16.6,9.4h2.4"/></g>' +
    '<g stroke="#8fae4a" stroke-width="1.8" stroke-linecap="round" fill="none"><path d="M5.6,5.4q3,-3.4 6.4,-4M5.6,5.4q-3,-3 -5,-3.4M11.6,4.4q3.4,-2.6 6.6,-2.6M11.6,4.4q-3.4,-2.6 -6.6,-2.6M17.6,5.4q3,-3 5.4,-3.4M17.6,5.4q-2.6,-3.4 -6,-4"/></g>',

  /** ビエルタ・アバホの葉(ピナル・デル・リオ)。**世界一の葉巻タバコ。** */
  tobaccoleaf:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#a86a48"/>' +
    '<path d="M4,20.6Q2,12 7.4,6Q12,1 19.6,2.4Q22,10.4 17,16.6Q12,22.4 4,20.6z" fill="#4f8f52"/>' +
    '<path d="M4,20.6Q2,12 7.4,6Q12,1 19.6,2.4L4,20.6z" fill="#5f9f5f"/>' +
    '<path d="M4.6,20L19,3.2" stroke="#3f7040" stroke-width="1.4" fill="none"/>' +
    '<g stroke="#3f7040" stroke-width="0.9" opacity=".9" fill="none"><path d="M8.2,15.8L6,10.4M11.2,12.4L9.6,6.6M14.4,8.8L13.6,4M8.2,15.8l5.6,2.4M11.2,12.4l6,1.6M14.4,8.8l5,0.8"/></g>',

  /** モゴテ(ビニャーレス)。**赤土の谷に立つ石灰岩の丸い岩山。** */
  mogote:
    '<rect x="0.8" y="19.6" width="22.4" height="4.4" fill="#b06a48"/>' +
    '<g stroke="#94512f" stroke-width="1" opacity=".8" fill="none"><path d="M1.6,21.6h20.8M2.4,23h19.2"/></g>' +
    '<path d="M4.4,19.6q-1,-9.4 2.6,-13.6q2.6,-3 5.4,-3q3,0 5.4,3.4q3,4.4 2.2,13.2z" fill="#b8ae9a"/>' +
    '<path d="M14.6,4.6q2.6,3.2 3.2,7.4q0.6,4 0.2,7.6h-4z" fill="#9a9282"/>' +
    '<g fill="#5f8f52"><ellipse cx="9.4" cy="4.4" rx="4.4" ry="1.8"/><ellipse cx="14" cy="5.6" rx="3.4" ry="1.5"/><ellipse cx="6.6" cy="6.4" rx="2.6" ry="1.2"/></g>' +
    '<g stroke="#6b9a5f" stroke-width="1.3" opacity=".85" fill="none"><path d="M6.6,8q-0.8,3 -0.6,6M10.4,7.4q0.4,3.4 0.2,6.6M13.6,8.4q0.8,3 0.8,6"/></g>',

  /** ダンソンの舞踏場(マタンサス)。**開いた扇。** */
  danzonhall:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#8a6b5a"/>' +
    '<path d="M12,20L2.6,7.4Q7,2.4 12,2.4Q17,2.4 21.4,7.4z" fill="#e8443f"/>' +
    '<path d="M12,20L5.4,4.8Q8.6,2.4 12,2.4Q15.4,2.4 18.6,4.8z" fill="#f2d8a0"/>' +
    '<path d="M12,20L9,3q1.4,-0.6 3,-0.6q1.6,0 3,0.6z" fill="#e8443f"/>' +
    '<g stroke="#8a5a30" stroke-width="0.9" opacity=".85" fill="none"><path d="M12,20L2.6,7.4M12,20L5.4,4.8M12,20L9,3M12,20L15,3M12,20L18.6,4.8M12,20L21.4,7.4"/></g>' +
    '<circle cx="12" cy="20" r="1.7" fill="#c8a13f"/>' +
    '<g fill="#c8a13f" opacity=".9"><circle cx="7.4" cy="8.4" r="0.8"/><circle cx="12" cy="6.6" r="0.8"/><circle cx="16.6" cy="8.4" r="0.8"/></g>',

  /** 海綿の舟(バタバノー)。**山積みの海綿と引っかけ棒。** */
  spongeboat:
    '<rect x="0" y="17.6" width="24" height="6.4" fill="#4ab0b8"/>' +
    '<path d="M0,17.6q6,-1.2 12,0q6,1.2 12,-0.6v2H0z" fill="#68c8c4"/>' +
    '<path d="M2.4,16.4h19.2q-1.6,4.4 -6,4.4H8.4q-4.4,0 -6,-4.4z" fill="#8a5a3a"/>' +
    '<path d="M2.4,16.4h19.2v1.4H2.8z" fill="#6b422a"/>' +
    '<g fill="#d8b84a"><circle cx="8" cy="13.6" r="2.6"/><circle cx="12.6" cy="12.4" r="3"/><circle cx="17" cy="14" r="2.4"/><circle cx="10.4" cy="9.6" r="2.2"/><circle cx="14.8" cy="9" r="1.9"/></g>' +
    '<g fill="#b89434" opacity=".7"><circle cx="8.6" cy="13.2" r="0.7"/><circle cx="13" cy="12" r="0.8"/><circle cx="11" cy="9.4" r="0.6"/><circle cx="17.2" cy="13.6" r="0.6"/></g>' +
    '<path d="M19,15.4L23,3.4" stroke="#7a5c30" stroke-width="1.4" fill="none"/>' +
    '<path d="M23,3.4q-2.4,-1 -3,1.2" stroke="#7a5c30" stroke-width="1.2" fill="none"/>',

  /** 砂糖とタバコの混作(アルテミサ)。**畑が対角で割れる。** */
  mixedcrop:
    '<path d="M1.2,1.2h21.6L1.2,22.8z" fill="#9ab84f"/>' +
    '<path d="M22.8,1.2v21.6H1.2z" fill="#2f6b40"/>' +
    '<path d="M22.2,1.8L1.8,22.2" stroke="#7a5c30" stroke-width="1.8" fill="none"/>' +
    '<g stroke="#e0e89a" stroke-width="1.9" stroke-linecap="round" fill="none"><path d="M4.6,13.4V4.4M8.8,9.4V2.4"/></g>' +
    '<g stroke="#c2d072" stroke-width="1.5" stroke-linecap="round" fill="none"><path d="M4.6,4.4q1.8,-2 3.8,-2.4M4.6,4.4q-1.8,-1.6 -3.4,-1.8M8.8,2.4q2,-1 3.6,-0.8M8.8,2.4q-2,-1 -3.8,-0.8"/></g>' +
    '<g stroke="#8a9a3a" stroke-width="0.9" fill="none"><path d="M4,10h1.4M8.2,6.4h1.4"/></g>' +
    '<path d="M11.4,20.6Q10.6,15 14,11.4Q17,8.4 21.4,9.2Q22.4,14.4 19.2,18Q16,21.6 11.4,20.6z" fill="#7fae5f"/>' +
    '<path d="M11.8,20.2L20.8,9.8" stroke="#4f8040" stroke-width="1.1" fill="none"/>' +
    '<g stroke="#4f8040" stroke-width="0.8" opacity=".9" fill="none"><path d="M14.2,17.4l-1.2,-3M16.4,14.8l-0.8,-3.2M18.4,12.4l-0.4,-2.6M14.2,17.4l3.4,1.4M16.4,14.8l3.6,1M18.4,12.4l3,0.6"/></g>',

  /** 硫黄泉(サン・アントニオ・デ・ロス・バニョス)。**湯気の立つ湯。** */
  sulphurspring:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#8a8f7a"/>' +
    '<ellipse cx="12" cy="18" rx="10" ry="4.6" fill="#c2b494"/>' +
    '<ellipse cx="12" cy="17" rx="10" ry="4.6" fill="#d8cca8"/>' +
    '<ellipse cx="12" cy="17" rx="7.4" ry="3.2" fill="#7fc8c0"/>' +
    '<ellipse cx="10.4" cy="16.4" rx="3.4" ry="1.3" fill="#a8e0d8" opacity=".8"/>' +
    '<path d="M12,17.6q-0.6,1.6 0,2.6" stroke="#d8c86a" stroke-width="1.2" opacity=".9" fill="none"/>' +
    '<g stroke="#e8e4da" stroke-width="1.7" stroke-linecap="round" opacity=".95" fill="none"><path d="M7,12q-1.6,-2.4 0,-4.6q1.6,-2 0,-4M12,11q-1.6,-2.4 0,-4.6q1.6,-2 0,-4.4M17,12q-1.6,-2.4 0,-4.6q1.6,-2 0,-4"/></g>' +
    '<g fill="#a89e84"><ellipse cx="3" cy="19.4" rx="1.8" ry="1.1"/><ellipse cx="21" cy="19.6" rx="1.8" ry="1.1"/><ellipse cx="6" cy="21" rx="1.6" ry="1"/></g>',

  /** グレープフルーツの木箱(ヌエバ・ヘロナ)。**砂糖ではなく柑橘。** */
  grapefruitcrate:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#b8a882"/>' +
    '<path d="M2.6,22.4V10h18.8v12.4z" fill="#b08a4f"/>' +
    '<g stroke="#7f6234" stroke-width="1.2" fill="none"><path d="M2.6,14.4h18.8M2.6,18.4h18.8M7,10v12.4M12,10v12.4M17,10v12.4"/></g>' +
    '<rect x="2.6" y="10" width="18.8" height="1.8" fill="#8a6b3a"/>' +
    '<g fill="#f2c86a"><circle cx="6" cy="7.6" r="3"/><circle cx="12" cy="6.6" r="3.4"/><circle cx="18" cy="7.6" r="3"/><circle cx="9" cy="3.6" r="2.7"/><circle cx="15" cy="3.2" r="2.8"/></g>' +
    '<g fill="#e8a878" opacity=".85"><path d="M4,6.4a3,3 0 0 1 3,-1.8M10,5a3.4,3.4 0 0 1 3.4,-2M16,6.4a3,3 0 0 1 3,-1.8"/></g>' +
    '<path d="M13.6,1.6q1.6,-1 2.8,-0.2" stroke="#4f8f52" stroke-width="1.2" fill="none"/>',

  /** 束ねた葉たばこ(コンソラシオン・デル・スル)。**掛けて干す。** */
  tobaccobundle:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#8a7350"/>' +
    '<rect x="1" y="2.4" width="22" height="2" rx="0.9" fill="#7a5c30"/>' +
    '<g fill="#a8763f"><path d="M6,4.4q-2.6,7 -1.4,13.6q1.6,-1.4 2.4,-4q0.8,2.6 2,3.4q1.2,-6.4 -0.6,-13z"/><path d="M17.8,4.4q2.6,7 1.4,13.6q-1.6,-1.4 -2.4,-4q-0.8,2.6 -2,3.4q-1.2,-6.4 0.6,-13z"/></g>' +
    '<path d="M11.8,4.4q-3,8 -1.6,15.6q1.8,-1.6 2.6,-4.4q0.8,2.8 2.2,3.8q1.4,-7.2 -0.8,-15z" fill="#c8862f"/>' +
    '<g stroke="#8a5a20" stroke-width="0.9" opacity=".85" fill="none"><path d="M12.6,5.4q-1.6,6.6 -0.8,12M6.6,5.4q-1.4,5.6 -0.8,10.4M17.2,5.4q1.4,5.6 0.8,10.4"/></g>' +
    '<g stroke="#e0c88f" stroke-width="1.1" fill="none"><path d="M10.6,5.6h3.4M5,5.6h2.8M16.2,5.6h2.8"/></g>',

  /** 砂糖倉庫(カルデナス)。**袋を積んで船を待つ。** */
  sugarwarehouse:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#b8a882"/>' +
    '<rect x="2" y="9.4" width="20" height="13" fill="#c2a06f"/>' +
    '<path d="M0.8,9.4h22.4L19.4,3H4.6z" fill="#8a4a30"/>' +
    '<path d="M2.4,8.2h19.2L18.8,4H5.2z" fill="#a85a3a"/>' +
    '<path d="M8.4,22.4v-9a3.6,3.6 0 0 1 7.2,0v9z" fill="#5f4526"/>' +
    '<g fill="#ddcfae"><ellipse cx="4.6" cy="20.4" rx="2.6" ry="1.7"/><ellipse cx="4.6" cy="17.4" rx="2.4" ry="1.6"/><ellipse cx="19.4" cy="20.4" rx="2.6" ry="1.7"/><ellipse cx="19.6" cy="17.6" rx="2.2" ry="1.5"/></g>' +
    '<g stroke="#a8996f" stroke-width="0.8" fill="none"><path d="M2.6,20.4h4M17.4,20.4h4.2"/></g>' +
    '<rect x="10.6" y="5" width="2.8" height="2.6" fill="#5f7f96"/>',

  /** マナカ・イスナガの見張り塔(トリニダード)。**塔そのものが仕組み。** */
  watchtower:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#9aa84f"/>' +
    '<g stroke="#8f9a4a" stroke-width="1.4" stroke-linecap="round" fill="none"><path d="M2.4,22.2q1,-3.4 3,-4.6M21.6,22.2q-1,-3.4 -3,-4.6M4.6,22.4q1.6,-2.6 3.4,-3.4"/></g>' +
    '<path d="M8.4,22.4L9.8,2.6h4.4l1.4,19.8z" fill="#e8dcc0"/>' +
    '<path d="M12,22.4V2.6h2.2l1.4,19.8z" fill="#cfc0a0"/>' +
    '<g stroke="#a89468" stroke-width="0.9" fill="none"><path d="M8.9,17.4h6.2M9.2,12.6h5.6M9.5,8.2h5M9.8,4.6h4.4"/></g>' +
    '<g fill="#6b5a48"><path d="M10.9,20.4a1.1,1.5 0 0 1 2.2,0v2h-2.2z"/><path d="M11,15a1,1.3 0 0 1 2,0v1.6h-2z"/><path d="M11.1,10.2a0.9,1.2 0 0 1 1.8,0v1.4h-1.8z"/><path d="M11.2,5.8a0.8,1 0 0 1 1.6,0v1.2h-1.6z"/></g>' +
    '<path d="M9.2,2.6h5.6l-0.6,-2h-4.4z" fill="#b0623f"/>' +
    '<path d="M11.4,1.4a0.6,0.8 0 0 1 1.2,0v0.9h-1.2z" fill="#c8a13f"/>',

  /** フランス人の碁盤目(シエンフエゴス)。**最初から引かれた計画。** */
  frenchgrid:
    '<rect x="0.8" y="0.8" width="22.4" height="22.4" rx="1" fill="#cabc9f"/>' +
    '<rect x="0.8" y="19.8" width="22.4" height="3.4" fill="#3f9ab0"/>' +
    '<g fill="#b0623f"><rect x="2.6" y="2.6" width="5" height="4.4"/><rect x="9.6" y="2.6" width="5" height="4.4"/><rect x="16.6" y="2.6" width="5" height="4.4"/><rect x="2.6" y="9" width="5" height="4.4"/><rect x="16.6" y="9" width="5" height="4.4"/><rect x="2.6" y="15.4" width="5" height="3.4"/><rect x="9.6" y="15.4" width="5" height="3.4"/><rect x="16.6" y="15.4" width="5" height="3.4"/></g>' +
    '<g fill="#c8756a"><rect x="2.6" y="2.6" width="5" height="1.3"/><rect x="9.6" y="2.6" width="5" height="1.3"/><rect x="16.6" y="2.6" width="5" height="1.3"/><rect x="2.6" y="9" width="5" height="1.3"/><rect x="16.6" y="9" width="5" height="1.3"/></g>' +
    '<rect x="9.6" y="9" width="5" height="4.4" fill="#7fae5f"/>' +
    '<circle cx="12.1" cy="11.2" r="1" fill="#e8dcc0"/>' +
    '<g fill="#efe8d0" opacity=".9"><path d="M6,20.6q2,1.6 4,0q-2,-0.8 -4,0z"/><path d="M14,21q1.8,1.4 3.6,0q-1.8,-0.8 -3.6,0z"/></g>',

  /** 脱線した装甲列車(サンタクララ)。**記念碑として静物で。** */
  armoredtrain:
    '<rect x="0.8" y="21.2" width="22.4" height="1.4" fill="#b8a882"/>' +
    '<g fill="#6b5330"><rect x="1.4" y="20" width="3.4" height="1.6"/><rect x="7" y="20" width="3.4" height="1.6"/><rect x="12.6" y="20" width="3.4" height="1.6"/></g>' +
    '<g fill="#8a8f92"><rect x="0.8" y="19.2" width="16" height="1"/><rect x="0.8" y="21.6" width="16" height="1"/></g>' +
    '<path d="M16.8,19.6q3.4,-1 5.6,-3.8" stroke="#8a8f92" stroke-width="1.2" fill="none"/>' +
    '<g transform="rotate(-14 12 12)"><rect x="4" y="7.4" width="16.4" height="9" rx="1" fill="#6b6f74"/><rect x="4" y="7.4" width="16.4" height="2" fill="#565a60"/><g fill="#3a3f44"><rect x="6.6" y="10.6" width="3" height="2.4"/><rect x="11" y="10.6" width="3" height="2.4"/><rect x="15.4" y="10.6" width="3" height="2.4"/></g><g fill="#8a9096"><circle cx="5.6" cy="8.6" r="0.5"/><circle cx="9.4" cy="8.6" r="0.5"/><circle cx="13.2" cy="8.6" r="0.5"/><circle cx="17" cy="8.6" r="0.5"/><circle cx="19" cy="8.6" r="0.5"/></g><g fill="#33302c"><circle cx="8" cy="17.6" r="2"/><circle cx="16.4" cy="17.6" r="2"/></g></g>',

  /** パランダスの花火やぐら(レメディオス)。**対抗戦の夜。** */
  parrandatower:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#6b5f52"/>' +
    '<g stroke="#8a6b43" stroke-width="1.6" fill="none"><path d="M6.4,22.4L8,8.4h6L15.6,22.4M6.8,18.6h8.4M7.4,14h7.2M7.8,10.4h6.4"/></g>' +
    '<g stroke="#7a5c30" stroke-width="1" opacity=".85" fill="none"><path d="M7,18.4l7.6,-4.2M15,18.4l-7.4,-4.2M7.6,13.8l6.6,-3.4M14.4,13.8l-6.4,-3.4"/></g>' +
    '<rect x="7.4" y="7.4" width="7.2" height="1.6" fill="#8a6b43"/>' +
    '<g stroke="#f5b31c" stroke-width="1.3" stroke-linecap="round" fill="none"><path d="M11,5.4L8,1.6M11,5.4L11,0.8M11,5.4l3.4,-3.8M11,5.4L6,4M11,5.4l5.4,-1"/></g>' +
    '<g fill="#e8443f"><circle cx="7.4" cy="1" r="0.9"/><circle cx="14.9" cy="1.1" r="0.9"/><circle cx="5.4" cy="3.6" r="0.8"/></g>' +
    '<g fill="#f2d8a0"><circle cx="11" cy="0.8" r="0.8"/><circle cx="16.9" cy="4.2" r="0.8"/></g>',

  /** ヤヤボ川の石橋(サンクティ・スピリトゥス)。**いまも現役。** */
  stonebridge:
    '<rect x="0" y="18.4" width="24" height="5.6" fill="#3f9ab0"/>' +
    '<path d="M0,18.4q6,-1.2 12,0q6,1.2 12,-0.6v1.8H0z" fill="#57c8c0" opacity=".7"/>' +
    '<path d="M0,10.4h24v3H0z" fill="#c2a877"/>' +
    '<path d="M0,8.6h24v2H0z" fill="#d8bd8f"/>' +
    '<path d="M0,13.4h24v9H0z" fill="#b0946a"/>' +
    '<path d="M2.4,22.4v-5.4a4,4.6 0 0 1 8,0v5.4z" fill="#3f9ab0"/>' +
    '<path d="M13.6,22.4v-5.4a4,4.6 0 0 1 8,0v5.4z" fill="#3f9ab0"/>' +
    '<g stroke="#8a6f4a" stroke-width="0.9" opacity=".9" fill="none"><path d="M2.4,17h8M13.6,17h8M6,13.6v3M17.6,13.6v3M11.6,13.6v8.8M0.8,13.6v8.8M23.2,13.6v8.8"/></g>' +
    '<g stroke="#8a6f4a" stroke-width="0.8" opacity=".8" fill="none"><path d="M2,9.4v1.8M6,9.4v1.8M10,9.4v1.8M14,9.4v1.8M18,9.4v1.8M22,9.4v1.8"/></g>',

  /** ティナホン(カマグエイ)。**雨水を蓄えた大甕。** */
  tinajon:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#c2ab86"/>' +
    '<path d="M6.4,3.4h11.2l-1,2.4q4,3.4 4,8q0,5.4 -4.6,7.4q-1.6,1.2 -4,1.2q-2.4,0 -4,-1.2q-4.6,-2 -4.6,-7.4q0,-4.6 4,-8z" fill="#b0623f"/>' +
    '<path d="M14.4,3.4h3.2l-1,2.4q4,3.4 4,8q0,5.4 -4.6,7.4q-1.2,0.9 -2.8,1.1q2.6,-2.6 2.6,-8.5q0,-6 -1.4,-10.4z" fill="#8a4a30"/>' +
    '<path d="M5.6,2h12.8v1.6H5.6z" fill="#c8756a"/>' +
    '<path d="M5.6,2h12.8v0.7H5.6z" fill="#d8907f"/>' +
    '<path d="M6.2,9.4q-1.4,4.4 0.6,8" stroke="#c8756a" stroke-width="1.1" opacity=".8" fill="none"/>' +
    '<ellipse cx="12" cy="22.2" rx="6" ry="1" fill="#8a6b4a" opacity=".6"/>',

  /** ラ・トロチャの砦(シエゴ・デ・アビラ)。**戦争のための線。** */
  trochafort:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#a89a6f"/>' +
    '<path d="M6.4,22.4V6.4h11.2v16z" fill="#c2b494"/>' +
    '<path d="M13.6,22.4V6.4h4v16z" fill="#a89468"/>' +
    '<path d="M5.6,6.4V3.4h2.6v1.6h2.2V3.4h3.2v1.6h2.2V3.4h2.6v3z" fill="#a89468"/>' +
    '<g fill="#5f5442"><rect x="9" y="9" width="1.6" height="3.4"/><rect x="13.4" y="9" width="1.6" height="3.4"/><path d="M10.4,22.4v-4.4a1.7,2 0 0 1 3.4,0v4.4z"/></g>' +
    '<g stroke="#8a8f8a" stroke-width="1" fill="none"><path d="M0.8,17.4L6.4,16M17.6,16L23.2,17.4M0.8,20.4L6.4,19.4M17.6,19.4l5.6,1"/></g>' +
    '<g stroke="#5f645f" stroke-width="0.9" fill="none"><path d="M2.6,16.2l1,2M4.6,15.8l1,2M19.2,15.8l-1,2M21.2,16.2l-1,2"/></g>' +
    '<g fill="#5f645f"><rect x="1.2" y="15.6" width="1.2" height="6.8"/><rect x="21.6" y="15.6" width="1.2" height="6.8"/></g>',

  /** 雄鶏の時計(モロン)。**言い伝えの鶏が台座に立つ。** */
  roosterclock:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#b8a882"/>' +
    '<path d="M8,22.4V13h8v9.4z" fill="#9a9284"/>' +
    '<path d="M7,13h10v1.8H7z" fill="#b8b2a4"/>' +
    '<circle cx="12" cy="18.4" r="2.9" fill="#f2ead8"/>' +
    '<circle cx="12" cy="18.4" r="2.9" fill="none" stroke="#6b6256" stroke-width="0.8"/>' +
    '<path d="M12,18.4l0,-1.9M12,18.4l1.4,0.8" stroke="#33302c" stroke-width="0.7" fill="none"/>' +
    '<path d="M10.4,12.4q-0.6,-4.4 3,-5.4q-1,-1.2 -0.2,-2.6q1.4,0.2 2,1.6q2.6,-0.2 3.8,1.8q-1.4,0.6 -2.6,0.4q0.6,2.6 -1.4,4.2z" fill="#a8763f"/>' +
    '<path d="M10.4,12.4q-3.4,-0.6 -4.6,-3.6q2.4,-1 4.4,0.6q0.6,-1.6 2.2,-2.2q-1.2,2.4 -0.6,5.2z" fill="#8a5a30"/>' +
    '<path d="M14.2,4.4q0.4,-1.4 1.4,-1.8q0.4,1 -0.2,2z" fill="#c8452f"/>' +
    '<path d="M16.8,6.2l1.8,0.4" stroke="#c8a13f" stroke-width="0.9" fill="none"/>' +
    '<circle cx="15.4" cy="5.6" r="0.5" fill="#33302c"/>',

  /** 会社の製糖工場(チャパラ)。**工場と同じ形の社宅。** */
  companymill:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#b8a882"/>' +
    '<rect x="1.4" y="9.4" width="11.6" height="13" fill="#9a9284"/>' +
    '<rect x="1.4" y="9.4" width="11.6" height="1.8" fill="#7f776a"/>' +
    '<g fill="#5f7f96"><rect x="3" y="12.4" width="2.6" height="3"/><rect x="7" y="12.4" width="2.6" height="3"/><rect x="3" y="17.4" width="2.6" height="3"/><rect x="7" y="17.4" width="2.6" height="3"/></g>' +
    '<rect x="3.4" y="2.4" width="2.8" height="7" fill="#8a7f70"/>' +
    '<rect x="3.4" y="1.8" width="2.8" height="1.2" fill="#6b6256"/>' +
    '<g fill="#e8e4da" opacity=".9"><circle cx="7.4" cy="1.6" r="1.3"/><circle cx="9.8" cy="0.9" r="1"/></g>' +
    '<g><rect x="14.6" y="16.4" width="4" height="6" fill="#d8c8a8"/><path d="M14,16.4h5.2l-0.8,-2h-3.6z" fill="#96552f"/><rect x="16" y="18.4" width="1.4" height="4" fill="#5a4630"/></g>' +
    '<g><rect x="19.4" y="16.4" width="4" height="6" fill="#d8c8a8"/><path d="M18.8,16.4h5.2l-0.8,-2h-3.6z" fill="#96552f"/><rect x="20.8" y="18.4" width="1.4" height="4" fill="#5a4630"/></g>' +
    '<g><rect x="14.6" y="9.4" width="4" height="4.4" fill="#d8c8a8"/><path d="M14,9.4h5.2l-0.8,-1.8h-3.6z" fill="#96552f"/></g>' +
    '<g><rect x="19.4" y="9.4" width="4" height="4.4" fill="#d8c8a8"/><path d="M18.8,9.4h5.2l-0.8,-1.8h-3.6z" fill="#96552f"/></g>',

  /** 挽き続ける工場(ハティボニコ)。**煙が出ていることが主役。** */
  stillrunningmill:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#9aa84f"/>' +
    '<rect x="6.4" y="12.4" width="15" height="10" fill="#a89a8c"/>' +
    '<rect x="6.4" y="12.4" width="15" height="2" fill="#8a7f72"/>' +
    '<g fill="#f5b31c"><rect x="8.4" y="16" width="2.8" height="3.4"/><rect x="12.8" y="16" width="2.8" height="3.4"/><rect x="17.2" y="16" width="2.8" height="3.4"/></g>' +
    '<rect x="2.4" y="4.4" width="3.4" height="18" fill="#8a7f70"/>' +
    '<rect x="2.4" y="3.6" width="3.4" height="1.4" fill="#6b6256"/>' +
    '<g fill="#e8e4da"><circle cx="6.4" cy="3" r="1.9"/><circle cx="9.6" cy="1.9" r="1.5"/><circle cx="12.6" cy="1.4" r="1.2"/><circle cx="15.2" cy="1.2" r="0.9"/></g>' +
    '<g stroke="#8f9a4a" stroke-width="1.8" stroke-linecap="round" fill="none"><path d="M22.4,22q-3.4,-1.4 -5,-4.4M23.2,19.6q-2.6,-1.6 -3.6,-4"/></g>' +
    '<path d="M6.4,14.6l-4,1.6" stroke="#6b6a5a" stroke-width="1.2" fill="none"/>',

  /** 鋳鉄の市場(サグア・ラ・グランデ)。**砂糖の富が鉄になった。** */
  ironmarket:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#b8a882"/>' +
    '<path d="M1.4,8.4h21.2v-2.6H1.4z" fill="#3f6b5f"/>' +
    '<path d="M2.6,5.8h18.8L12,1.4z" fill="#4f7f6a"/>' +
    '<g fill="#3f6b5f"><rect x="2.6" y="8.4" width="1.8" height="14"/><rect x="8.4" y="8.4" width="1.8" height="14"/><rect x="13.8" y="8.4" width="1.8" height="14"/><rect x="19.6" y="8.4" width="1.8" height="14"/></g>' +
    '<g stroke="#57a08a" stroke-width="1" opacity=".95" fill="none"><path d="M4.4,8.4q2,3.4 4,0M10.2,8.4q1.8,3.4 3.6,0M15.6,8.4q2,3.4 4,0"/></g>' +
    '<g stroke="#57a08a" stroke-width="0.8" opacity=".8" fill="none"><path d="M3.5,12h1.6M3.5,15h1.6M9.3,12h1.6M14.7,12h1.6M20.5,12h1.6M20.5,15h1.6"/></g>' +
    '<g fill="#c8a13f"><circle cx="12" cy="3.6" r="0.7"/></g>' +
    '<g fill="#b08a4f"><rect x="5.4" y="18.4" width="3" height="4"/><rect x="16.4" y="18.4" width="3" height="4"/></g>' +
    '<g fill="#e8443f"><circle cx="6.4" cy="17.6" r="0.9"/><circle cx="17.4" cy="17.6" r="0.9"/></g>',

  /** 築堤(ペドラプレン)の入り口(カイバリエン)。**海の上をまっすぐ島へ。** */
  causewaygate:
    '<rect x="0" y="0" width="24" height="8.4" fill="#bfe0ee"/>' +
    '<rect x="0" y="8.4" width="24" height="15.6" fill="#3f9ab0"/>' +
    '<rect x="0" y="8.4" width="24" height="4" fill="#2f7f9a"/>' +
    '<path d="M18.4,8.6q2.6,-1.4 4.4,-1.2v1.6q-2.2,0 -4.4,0.8z" fill="#6f9a72"/>' +
    '<path d="M9.4,24L13.4,8.4h1.8L20,24z" fill="#cfc7b0"/>' +
    '<path d="M14.6,24L14.3,8.4h0.9L20,24z" fill="#b8ae94"/>' +
    '<g fill="#8a8068"><circle cx="10.6" cy="21.4" r="0.9"/><circle cx="12" cy="16.4" r="0.8"/><circle cx="13.2" cy="12" r="0.7"/><circle cx="18.6" cy="21.4" r="0.9"/><circle cx="17" cy="16.4" r="0.8"/><circle cx="15.6" cy="12" r="0.7"/></g>' +
    '<g fill="#efe8d0" opacity=".9"><path d="M3,12.4q1.8,1.4 3.6,0q-1.8,-0.8 -3.6,0z"/><path d="M4.4,18q2,1.6 4,0q-2,-0.8 -4,0z"/><path d="M19.6,14.4q1.6,1.2 3.2,0q-1.6,-0.7 -3.2,0z"/></g>' +
    '<path d="M0.8,10.6q3.4,-1.4 6.4,-1" stroke="#efe8d0" stroke-width="0.9" opacity=".7" fill="none"/>',

  /** 野の花の平原(フロリダ)。**町の名は花にちなむ。** */
  wildflowerplain:
    '<rect x="0" y="16.4" width="24" height="7.6" fill="#8faa5f"/>' +
    '<rect x="0" y="0" width="24" height="16.4" fill="#cfe4f0"/>' +
    '<path d="M0,16.4q6,-1.4 12,0q6,1.4 12,-0.6v2H0z" fill="#9fba6a"/>' +
    '<g stroke="#5f8f4a" stroke-width="1.3" fill="none"><path d="M4,22.4q-0.4,-4 0.6,-7.4M9.4,23q-0.4,-4.4 0.4,-8M14.6,22.4q-0.2,-4 0.6,-7.6M19.6,23q-0.4,-4 0.4,-7.4"/></g>' +
    '<g fill="#f5b31c"><circle cx="4.8" cy="14" r="2"/><circle cx="15.4" cy="13.8" r="2"/></g>' +
    '<g fill="#e8443f"><circle cx="10" cy="13.6" r="1.9"/><circle cx="20.2" cy="14.4" r="1.9"/></g>' +
    '<g fill="#f2ead8"><circle cx="4.8" cy="14" r="0.8"/><circle cx="10" cy="13.6" r="0.8"/><circle cx="15.4" cy="13.8" r="0.8"/><circle cx="20.2" cy="14.4" r="0.8"/></g>' +
    '<g fill="#e0a8c8"><circle cx="7.4" cy="18.4" r="1.4"/><circle cx="17.6" cy="18.8" r="1.4"/></g>' +
    '<path d="M12,5.4q1.6,-1.6 3.2,0q-1.6,1.6 -3.2,0z" fill="#f2d8a0"/>' +
    '<path d="M12,5.4q-1.6,-1.6 -3.2,0q1.6,1.6 3.2,0z" fill="#e8b04f"/>',

  /** 信号扱い所(コロン)。**何十もの専用線がここで合流した。** */
  signalhouse:
    '<rect x="0.8" y="21.2" width="22.4" height="1.4" fill="#b8a882"/>' +
    '<g fill="#6b5330"><rect x="1.4" y="20" width="3.4" height="1.6"/><rect x="7" y="20" width="3.4" height="1.6"/><rect x="12.6" y="20" width="3.4" height="1.6"/><rect x="18.2" y="20" width="3.4" height="1.6"/></g>' +
    '<g fill="#8a8f92"><rect x="0.8" y="19.2" width="22.4" height="1"/><rect x="0.8" y="21.6" width="22.4" height="1"/></g>' +
    '<rect x="9.4" y="12.4" width="11" height="6.8" fill="#a86a48"/>' +
    '<rect x="9.4" y="6.4" width="11" height="6" fill="#e8dcc0"/>' +
    '<g fill="#5f7f96"><rect x="10.6" y="7.6" width="2.6" height="3.4"/><rect x="14" y="7.6" width="2.6" height="3.4"/><rect x="17.4" y="7.6" width="2.6" height="3.4"/></g>' +
    '<path d="M8.4,6.4h13l-1,-2.2h-11z" fill="#8a4a30"/>' +
    '<path d="M11.4,19.2l-3,-6.4" stroke="#6b5330" stroke-width="1.1" fill="none"/>' +
    '<rect x="3.4" y="2.4" width="1.6" height="16.8" fill="#8a8f8a"/>' +
    '<path d="M4.2,4l5.6,-2.4v2.2L4.2,6.2z" fill="#c8452f"/>' +
    '<path d="M7.6,2.6l2.2,-1v2.2l-2.2,0.9z" fill="#f2ead8"/>',

  /** 給水塔(ウニオン・デ・レイエス)。**蒸気の止まり木。** */
  watertower:
    '<rect x="0.8" y="21.2" width="22.4" height="1.4" fill="#b8a882"/>' +
    '<g fill="#6b5330"><rect x="1.4" y="20" width="3.4" height="1.6"/><rect x="7" y="20" width="3.4" height="1.6"/><rect x="12.6" y="20" width="3.4" height="1.6"/><rect x="18.2" y="20" width="3.4" height="1.6"/></g>' +
    '<g fill="#8a8f92"><rect x="0.8" y="19.2" width="22.4" height="1"/><rect x="0.8" y="21.6" width="22.4" height="1"/></g>' +
    '<g fill="#6b5330"><rect x="7.4" y="10.4" width="2" height="9.4"/><rect x="14.6" y="10.4" width="2" height="9.4"/><path d="M7.4,18.6l9.2,-6.4M16.6,18.6L7.4,12.2" stroke="#5a4630" stroke-width="1.1"/></g>' +
    '<path d="M5.6,3.4h12.8v7.4H5.6z" fill="#8a4a30"/>' +
    '<path d="M5.6,3.4h12.8v1.6H5.6z" fill="#a85a3a"/>' +
    '<ellipse cx="12" cy="3.4" rx="6.4" ry="1.2" fill="#6b3722"/>' +
    '<g stroke="#5f3320" stroke-width="0.9" opacity=".8" fill="none"><path d="M5.6,6.4h12.8M5.6,8.8h12.8"/></g>' +
    '<path d="M18.4,6.4q3,0.4 3,3.4v4.4" stroke="#5f645f" stroke-width="1.6" fill="none"/>' +
    '<path d="M20.4,14.2h2v2.4l-1,1l-1,-1z" fill="#5f645f"/>' +
    '<path d="M21.4,17.8q-0.6,1.6 0,2.8" stroke="#57a8c0" stroke-width="1.3" fill="none"/>',

  /** 家畜の囲い(プラセタス)。**柵の向こうの牛。** */
  cattlepen:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#9aa84f"/>' +
    '<ellipse cx="13.4" cy="12.4" rx="7.4" ry="4.6" fill="#c2a06f"/>' +
    '<g fill="#c2a06f"><rect x="8" y="14.4" width="1.8" height="6"/><rect x="12" y="14.4" width="1.8" height="6"/><rect x="16.4" y="14.4" width="1.8" height="6"/></g>' +
    '<ellipse cx="11" cy="11" rx="2.6" ry="1.8" fill="#a8875a" opacity=".85"/>' +
    '<circle cx="20.6" cy="9.4" r="2.6" fill="#c2a06f"/>' +
    '<path d="M19,7.2q-1.4,-1.6 -0.8,-3.2M22.2,7.2q1.4,-1.6 0.8,-3.2" stroke="#8a7350" stroke-width="1.2" fill="none"/>' +
    '<circle cx="21.4" cy="9" r="0.5" fill="#33302c"/>' +
    '<g fill="#7a5c3a"><rect x="1.6" y="13.4" width="1.8" height="9"/><rect x="10.4" y="13.4" width="1.8" height="9"/><rect x="19.2" y="13.4" width="1.8" height="9"/></g>' +
    '<g fill="#8a6b43"><rect x="0.8" y="15" width="22.4" height="1.8"/><rect x="0.8" y="19" width="22.4" height="1.8"/></g>',

  /** ソンの街角(サンティアゴ・デ・クーバ)。**トレスとマラカス。** */
  soncorner:
    '<path d="M0.8,0.8h11.2v21.6H0.8z" fill="#e0a898"/>' +
    '<path d="M12,0.8h11.2v21.6H12z" fill="#c88a78"/>' +
    '<rect x="0.8" y="20.8" width="22.4" height="3.2" fill="#a89a84"/>' +
    '<rect x="2.6" y="3.4" width="4.4" height="6" fill="#3f6b5f"/>' +
    '<path d="M2.6,3.4h4.4" stroke="#f6efe2" stroke-width="1.2" fill="none"/>' +
    '<g transform="rotate(18 8.4 16)"><ellipse cx="8.4" cy="16.4" rx="3.8" ry="4.6" fill="#c8a13f"/><ellipse cx="8.4" cy="12.6" rx="2.6" ry="2.4" fill="#c8a13f"/><circle cx="8.4" cy="15" r="1.4" fill="#5a4630"/><rect x="7.8" y="2.4" width="1.2" height="11" fill="#8a6b3a"/><rect x="7.2" y="2.4" width="2.4" height="1.8" fill="#5a4630"/><g stroke="#f2ead8" stroke-width="0.5" opacity=".9" fill="none"><path d="M7.6,4v11M8.4,4v11.4M9.2,4v11"/></g></g>' +
    '<g transform="rotate(-22 18 18)"><ellipse cx="18" cy="16.4" rx="2.4" ry="2.8" fill="#e8443f"/><rect x="17.4" y="18.6" width="1.2" height="3.6" fill="#8a6b3a"/></g>' +
    '<g transform="rotate(14 21 17)"><ellipse cx="21" cy="15.4" rx="2" ry="2.4" fill="#f5b31c"/><rect x="20.5" y="17.4" width="1" height="3.2" fill="#8a6b3a"/></g>',

  /** カカオの露店(バラコア)。**ココナッツとカカオの町。** */
  cacaostall:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#b8a882"/>' +
    '<g fill="#7a5c30"><rect x="2.6" y="8.4" width="1.6" height="14"/><rect x="19.8" y="8.4" width="1.6" height="14"/></g>' +
    '<path d="M1.4,8.4h21.2l-1.6,-4.4H3z" fill="#e8443f"/>' +
    '<g fill="#f2d8a0"><path d="M4.6,4h3.2l0.6,4.4H4.4z"/><path d="M11,4h3.2l0.2,4.4h-3.6z"/><path d="M17.4,4h3l1,4.4h-3.4z"/></g>' +
    '<rect x="2.6" y="14.4" width="18.8" height="2" fill="#8a6b43"/>' +
    '<g transform="rotate(-24 6.8 12.4)"><ellipse cx="6.8" cy="12.4" rx="2" ry="3.2" fill="#c8862f"/><path d="M6.8,9.4v6" stroke="#a86a20" stroke-width="0.7" fill="none"/></g>' +
    '<g transform="rotate(14 12 12.6)"><ellipse cx="12" cy="12.6" rx="1.9" ry="3" fill="#8a4a30"/><path d="M12,9.8v5.6" stroke="#6b3722" stroke-width="0.7" fill="none"/></g>' +
    '<g transform="rotate(-10 17 12.4)"><ellipse cx="17" cy="12.4" rx="1.9" ry="3" fill="#c8452f"/><path d="M17,9.6v5.6" stroke="#a83220" stroke-width="0.7" fill="none"/></g>' +
    '<g fill="#7a6247"><circle cx="6" cy="19.6" r="2.2"/><circle cx="11" cy="20.2" r="2"/><circle cx="15.8" cy="19.8" r="2.1"/></g>' +
    '<g stroke="#5f4c33" stroke-width="0.7" opacity=".8" fill="none"><path d="M5,18.6l2,2M10,19.2l2,2M14.8,18.8l2,2"/></g>',

  /** マリンブラ(グアンタナモ)。**チャンギーの低音の木箱。** */
  marimbula:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#8a7350"/>' +
    '<rect x="3.4" y="3.4" width="17.2" height="19" rx="1.2" fill="#a8763f"/>' +
    '<rect x="3.4" y="3.4" width="17.2" height="19" rx="1.2" fill="none" stroke="#7a5220" stroke-width="1"/>' +
    '<path d="M5,4.6h14v1.6H5z" fill="#6b5330"/>' +
    '<g fill="#b8b2a4"><rect x="6.4" y="6.2" width="2.2" height="7.4" rx="0.9"/><rect x="9.5" y="6.2" width="2.2" height="9.4" rx="0.9"/><rect x="12.6" y="6.2" width="2.2" height="8.4" rx="0.9"/><rect x="15.7" y="6.2" width="2.2" height="6.6" rx="0.9"/></g>' +
    '<g fill="#8a8578"><rect x="6.4" y="6.2" width="2.2" height="1.4" rx="0.6"/><rect x="9.5" y="6.2" width="2.2" height="1.4" rx="0.6"/><rect x="12.6" y="6.2" width="2.2" height="1.4" rx="0.6"/><rect x="15.7" y="6.2" width="2.2" height="1.4" rx="0.6"/></g>' +
    '<circle cx="12" cy="18.4" r="2.6" fill="#4a3418"/>' +
    '<g fill="#5a4630"><circle cx="5" cy="5.4" r="0.5"/><circle cx="19" cy="5.4" r="0.5"/></g>',

  /** 公園のベンチ(オルギン)。**広場の連なる「パルケスの町」。** */
  parkbench:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#c9b98f"/>' +
    '<rect x="2.4" y="15.6" width="3.2" height="9" fill="#6b4a2f"/>' +
    '<g fill="#4f8f52"><ellipse cx="4.4" cy="9.4" rx="6.4" ry="4.4"/><ellipse cx="1.4" cy="12.4" rx="4" ry="3"/><ellipse cx="8.4" cy="12.6" rx="4.4" ry="3"/></g>' +
    '<g fill="#3f7f46"><ellipse cx="2.4" cy="8" rx="2.6" ry="1.8"/><ellipse cx="7.4" cy="8.4" rx="2.4" ry="1.6"/></g>' +
    '<g fill="#4f7f6a"><rect x="9.4" y="13.6" width="13" height="1.8" rx="0.8"/><rect x="9.4" y="10.4" width="13" height="1.8" rx="0.8"/><rect x="9.4" y="17" width="13" height="1.9" rx="0.8"/></g>' +
    '<g fill="#3a3f3a"><path d="M10.4,17v5.4h-1.8v-5.6zM23.2,17v5.4h-1.8v-5.6z" transform="translate(0.4 0)"/><rect x="10.2" y="8.8" width="1.4" height="8.4"/><rect x="20.8" y="8.8" width="1.4" height="8.4"/></g>' +
    '<g fill="#8a8f92"><ellipse cx="15" cy="21.8" rx="1.6" ry="1"/><circle cx="16.4" cy="20.8" r="0.7"/></g>',

  /** ロータリーの彫刻(ラス・トゥナス)。**「彫刻の町」。** */
  roundaboutsculpture:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#a89a84"/>' +
    '<ellipse cx="12" cy="18.4" rx="11" ry="4.6" fill="#8a9498"/>' +
    '<ellipse cx="12" cy="18" rx="11" ry="4.6" fill="#9aa4a8"/>' +
    '<ellipse cx="12" cy="18" rx="6.4" ry="2.6" fill="#7fae5f"/>' +
    '<g stroke="#f2ead8" stroke-width="0.8" opacity=".8" fill="none" stroke-dasharray="2 2.4"><ellipse cx="12" cy="18" rx="8.8" ry="3.6"/></g>' +
    '<rect x="9.4" y="15.4" width="5.2" height="2" fill="#b8b2a4"/>' +
    '<path d="M12,15.4q-4.4,-2.6 -2.6,-7q1,-2.6 3.4,-3.4q-1.6,2.4 -0.6,4.4q2.6,-1 3.4,-3.6q1.4,3.4 -0.6,6.4q-1.4,2.2 -3,3.2z" fill="#e8dcc0"/>' +
    '<path d="M12,15.4q-2.6,-2 -2.4,-5.4" stroke="#b8ae94" stroke-width="0.9" fill="none"/>' +
    '<circle cx="12.4" cy="2.6" r="1.3" fill="#c8a13f"/>',

  /** 建て直した広場(バヤモ)。**自ら焼いた町の、その後の壁。** */
  rebuiltplaza:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#b8a882"/>' +
    '<rect x="2.4" y="8.4" width="19.2" height="14" fill="#f2d8a0"/>' +
    '<path d="M1.4,8.4h21.2l-1.8,-3.4H3.2z" fill="#b0623f"/>' +
    '<g fill="#3f6b5f"><rect x="4.6" y="11" width="3.4" height="5.4"/><rect x="10.3" y="11" width="3.4" height="5.4"/><rect x="16" y="11" width="3.4" height="5.4"/></g>' +
    '<g stroke="#f6efe2" stroke-width="1" fill="none"><path d="M4.6,11h3.4M10.3,11h3.4M16,11h3.4"/></g>' +
    '<g fill="#3a3a36"><path d="M2.4,22.4v-3.4l3,0.6l2.6,-1l3,1l3,-0.8l2.8,1l3.4,-0.8l1.4,0.6v2.8z"/></g>' +
    '<g fill="#5f5f56"><rect x="4.4" y="20.4" width="2.6" height="2" rx="0.6"/><rect x="9.4" y="20.6" width="2.8" height="1.8" rx="0.6"/><rect x="15.4" y="20.4" width="2.6" height="2" rx="0.6"/></g>' +
    '<path d="M12,5v-2.6M10.6,3.6h2.8" stroke="#8a4a30" stroke-width="1" fill="none"/>',

  /** グロリエタ(マンサニージョ)。**ムーア風の楽団台。** */
  glorieta:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#c9b98f"/>' +
    '<rect x="3.4" y="19.4" width="17.2" height="3" fill="#b8b2a4"/>' +
    '<rect x="4.4" y="18.4" width="15.2" height="1.4" fill="#cfc7b4"/>' +
    '<g fill="#e8dcc0"><rect x="5.4" y="10.4" width="1.6" height="8"/><rect x="9.4" y="10.4" width="1.6" height="8"/><rect x="13" y="10.4" width="1.6" height="8"/><rect x="17" y="10.4" width="1.6" height="8"/></g>' +
    '<g stroke="#c8452f" stroke-width="1.2" fill="none"><path d="M6.2,12.4a2.6,2.8 0 0 1 4,0M10.2,12.4a2.6,2.8 0 0 1 4,0M14.6,12.4a2.6,2.8 0 0 1 4,0"/></g>' +
    '<path d="M3.4,10.4h17.2v-1.6H3.4z" fill="#c8452f"/>' +
    '<path d="M4.4,8.8Q12,1.4 19.6,8.8z" fill="#c8452f"/>' +
    '<g stroke="#f2ead8" stroke-width="0.9" opacity=".9" fill="none"><path d="M7,8.6Q12,3.4 17,8.6M9.6,8.8Q12,5.4 14.4,8.8"/></g>' +
    '<path d="M12,3.4V1.6" stroke="#c8a13f" stroke-width="1.2" fill="none"/>' +
    '<circle cx="12" cy="1.4" r="0.8" fill="#c8a13f"/>',

  /** 深水港(アンティージャ)。**大きな船のための、いまは静かな桟橋。** */
  deepwaterport:
    '<rect x="0" y="0" width="24" height="7.4" fill="#bfe0ee"/>' +
    '<rect x="0" y="7.4" width="24" height="16.6" fill="#1f6f96"/>' +
    '<rect x="0" y="7.4" width="24" height="5" fill="#175a7f"/>' +
    '<path d="M1.4,9.4h14.8l-2,4.4H3z" fill="#8a4a30"/>' +
    '<rect x="1.4" y="7.8" width="14.8" height="1.6" fill="#5f3320"/>' +
    '<rect x="6.4" y="3.4" width="4.4" height="4.4" fill="#e0dccc"/>' +
    '<rect x="7.6" y="0.8" width="2" height="2.6" fill="#c8452f"/>' +
    '<rect x="7.6" y="0.8" width="2" height="0.9" fill="#2f2f2f"/>' +
    '<g fill="#3f4a56"><rect x="7.2" y="4.4" width="1.2" height="1.3"/><rect x="9" y="4.4" width="1.2" height="1.3"/></g>' +
    '<path d="M2.4,7.8V4.4l4,1.4" stroke="#5f5a4a" stroke-width="0.9" fill="none"/>' +
    '<g fill="#8a7454"><rect x="17.6" y="10.4" width="6.4" height="2.2"/><rect x="18.4" y="12.6" width="1.4" height="11.4"/><rect x="21.6" y="12.6" width="1.4" height="11.4"/></g>' +
    '<g stroke="#efe8d0" stroke-width="0.9" opacity=".8" fill="none"><path d="M2,17.4q2,1.6 4,0M8.4,20q2,1.6 4,0M13.4,16.4q1.8,1.4 3.6,0"/></g>',

  /** 貨物桟橋(ヌエビタス)。**いまも働き続ける港。** */
  cargopier:
    '<rect x="0" y="0" width="24" height="9.4" fill="#bfe0ee"/>' +
    '<rect x="0" y="9.4" width="24" height="14.6" fill="#2f7f9a"/>' +
    '<rect x="0.8" y="16.4" width="22.4" height="3" fill="#8a7454"/>' +
    '<g fill="#5f4c33"><rect x="3.4" y="19.4" width="1.8" height="4.6"/><rect x="11" y="19.4" width="1.8" height="4.6"/><rect x="18.6" y="19.4" width="1.8" height="4.6"/></g>' +
    '<rect x="2.6" y="4.4" width="1.8" height="12" fill="#5f5a4a"/>' +
    '<path d="M3.5,5.4L14.4,8.4" stroke="#5f5a4a" stroke-width="1.6" fill="none"/>' +
    '<path d="M3.5,10.4L10.4,7.4" stroke="#4a4438" stroke-width="0.9" fill="none"/>' +
    '<path d="M14.4,8.4v4.4" stroke="#3a3f3a" stroke-width="0.9" fill="none"/>' +
    '<path d="M12.6,12.8h3.6v3.6h-3.6z" fill="#b08a4f"/>' +
    '<path d="M12.6,12.8l3.6,3.6M16.2,12.8l-3.6,3.6" stroke="#7f6234" stroke-width="0.8" fill="none"/>' +
    '<g fill="#ddcfae"><ellipse cx="20" cy="15" rx="2.4" ry="1.5"/><ellipse cx="20.2" cy="12.6" rx="2.1" ry="1.3"/></g>' +
    '<g fill="#e8e0cc" opacity=".9"><path d="M6.4,2.6q1.6,-2 3.4,0q-1.8,1 -3.4,0z"/></g>',

  /** 「貧者のハバナ」(ヒバラ)。**素通りされて残った海辺の柱廊。** */
  poormanshavana:
    '<rect x="0" y="19.4" width="24" height="4.6" fill="#3f9ab0"/>' +
    '<path d="M0,19.4q6,-1.2 12,0q6,1.2 12,-0.6v1.8H0z" fill="#57c8c0" opacity=".8"/>' +
    '<rect x="2.4" y="6.4" width="19.2" height="13" fill="#e8d0a8"/>' +
    '<path d="M1.4,6.4h21.2l-1.4,-2.8H2.8z" fill="#b8a171"/>' +
    '<path d="M4.4,3.6h15.2l-1,-2H5.4z" fill="#a89468"/>' +
    '<g fill="#c9b083"><rect x="4.4" y="8.4" width="2.2" height="11"/><rect x="9.2" y="8.4" width="2.2" height="11"/><rect x="14" y="8.4" width="2.2" height="11"/><rect x="18.6" y="8.4" width="2.2" height="11"/></g>' +
    '<g fill="#8a7f6a"><path d="M6.6,19.4v-8a2.2,2.4 0 0 1 2.6,0v8z" opacity=".5"/><path d="M11.4,19.4v-8a2.2,2.4 0 0 1 2.6,0v8z" opacity=".5"/><path d="M16.2,19.4v-8a2.2,2.4 0 0 1 2.4,0v8z" opacity=".5"/></g>' +
    '<g fill="#b09a6f" opacity=".9"><path d="M3.4,7.4q2.4,1.4 1,3.4q2,0.6 1,2.4l-2,-0.6z"/><path d="M20.6,8q-2,1.6 -0.6,3.4q-1.8,0.8 -0.6,2.4l1.6,-0.4z"/></g>' +
    '<path d="M12,1.6v-1M11,1.2h2" stroke="#8a7f6a" stroke-width="0.8" fill="none"/>',

  /** 銅山の坑口(エル・コブレ)。**アメリカ最古級の、いまも続く鉱山。** */
  coppershaft:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#8a5a34"/>' +
    '<path d="M1.4,22.4q0,-13 5,-17.4q3,-2.6 5.6,-2.6q2.6,0 5.6,2.6q5,4.4 5,17.4z" fill="#a8763f"/>' +
    '<path d="M17,4.4q5.6,5 5.6,18h-5z" fill="#8a5a30"/>' +
    '<g stroke="#4f9a8a" stroke-width="1.6" opacity=".85" fill="none"><path d="M5,10.4q-1,4.4 -0.6,8.4M18.4,9.4q1.2,4.4 1,9"/></g>' +
    '<path d="M7.4,22.4v-8.4q0,-5.4 4.6,-5.4q4.6,0 4.6,5.4v8.4z" fill="#3a2f26"/>' +
    '<path d="M8.8,22.4v-7.6q0,-4.4 3.2,-4.4q3.2,0 3.2,4.4v7.6z" fill="#211a14"/>' +
    '<g stroke="#8a6b43" stroke-width="1.6" fill="none"><path d="M7.6,22.4V12.4M16.4,22.4V12.4M7,12.8h10"/></g>' +
    '<g fill="#8a8f92"><rect x="10" y="21" width="4" height="0.9"/><rect x="10" y="22.4" width="4" height="0.9"/></g>' +
    '<g fill="#c87f3f"><circle cx="4.4" cy="21" r="1.3"/><circle cx="19.6" cy="21.4" r="1.2"/><circle cx="6.4" cy="19.6" r="0.9"/></g>',

  /** 鉱石のコンベア(モア)。**砂糖に代わった輸出の主役。** */
  oreconveyor:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#96562f"/>' +
    '<path d="M17,2.4h5.4v9h-5.4z" fill="#8f8a7c"/>' +
    '<path d="M17,2.4h5.4v2h-5.4z" fill="#6f6a5e"/>' +
    '<path d="M18.4,11.4l1.2,3h1l1.2,-3z" fill="#5f5a50"/>' +
    '<path d="M1.4,20.4L17.6,5.4" stroke="#5f5a50" stroke-width="2.2" fill="none"/>' +
    '<path d="M2.2,22L18.4,7" stroke="#4a4640" stroke-width="1.3" fill="none"/>' +
    '<g fill="#33302c"><circle cx="5" cy="18.4" r="1"/><circle cx="9.4" cy="14.4" r="1"/><circle cx="13.8" cy="10.4" r="1"/></g>' +
    '<g fill="#5f5a50"><rect x="6.4" y="18" width="1.4" height="4.4"/><rect x="12.4" y="12.6" width="1.4" height="9.8"/></g>' +
    '<g fill="#a85a30"><path d="M2.6,22.4l3,-3l3.4,3z"/><path d="M8.4,22.4l2.4,-2.4l2.8,2.4z"/></g>' +
    '<g fill="#c87f3f"><circle cx="4.4" cy="16.6" r="0.8"/><circle cx="8.8" cy="12.6" r="0.8"/><circle cx="13.2" cy="8.8" r="0.8"/></g>' +
    '<circle cx="19.6" cy="16.4" r="1.9" fill="#a85a30"/>',
};

