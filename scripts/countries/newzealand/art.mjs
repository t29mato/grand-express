/**
 * ニュージーランドの都市イラスト。
 *
 * `NEWZEALAND_MARKS` は 24×24 の座標系に描くシンボル、`NEWZEALAND_BG` は
 * 400×210 の座標系に描く背景シーン(いずれもSVG断片の文字列)。フランスと
 * 同じく最初から文字列として持ち、動きは含めない。
 *
 * 背景は20種と少なめの設計(harbourhills を9都市が共有)なので、
 * フランス(`scripts/countries/france/art.mjs`)を物差しに**1枚を5層で濃く**描く:
 * 空の階調 / 遠景 / 中景 / 近景 / 最前景。
 *
 * 色はフランス・インドと揃える。空 #8fc4e8〜、地面 #2f4a33/#c9a877、
 * 顔 #f6efe2、強調 #f5b31c/#e8443f/#5b8fe8。ニュージーランドらしさは
 * 原生林の #2d5f45、牧草の #5a9a4f、地熱の #6ec4bc と硫黄の #e8d27f、
 * ポフツカワの深紅 #c22f38、フィヨルドの岩 #4a5a60 で出す。
 * マオリの意匠(ワレヌイの彫刻など)は特定の部族の写しにならないよう、
 * 一般的なコル(渦巻)の抽象にとどめる。
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
 * 地面がもっと下から始まるシーンでそのままにすると、横一文字に透ける。
 * 確認は scratchpad の実測スクリプト(check-city-backgrounds.mjs と同じ
 * マゼンタ台紙方式)で行う。
 */
function sky(top, bottom, to = 118) {
  return band(0, 84, top) + band(78, to - 78, bottom);
}

/** 地面。 */
function ground(y, fill) {
  return `<rect x="0" y="${y}" width="${W}" height="${210 - y}" fill="${fill}"/>`;
}

/** 接地の影。敷かないと物が浮く。 */
function shade(cx, cy, rx, ry, o = ".2") {
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#000" opacity="${o}"/>`;
}

function sun(cx, cy, r, fill = "#f5b31c") {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>`;
}

function clouds(cx, cy, scale = 1) {
  const e = (dx, rx, ry) =>
    `<ellipse cx="${r1(cx + dx * scale)}" cy="${cy}" rx="${r1(rx * scale)}" ry="${r1(ry * scale)}"/>`;
  return `<g opacity=".8" fill="#f6efe2">${e(0, 18, 7)}${e(-10, 11, 5.5)}${e(11, 13, 5.5)}</g>`;
}

/** 長く尾を引く白い雲(アオテアロア=「長く白い雲のたなびく地」)。 */
function longCloud(cx, cy, w, o = ".85") {
  return (
    `<g fill="#f6efe2" opacity="${o}">` +
    `<ellipse cx="${cx}" cy="${cy}" rx="${w}" ry="5"/>` +
    `<ellipse cx="${r1(cx - w * 0.55)}" cy="${r1(cy + 3)}" rx="${r1(w * 0.5)}" ry="3.4"/>` +
    `<ellipse cx="${r1(cx + w * 0.45)}" cy="${r1(cy - 3)}" rx="${r1(w * 0.4)}" ry="3.6"/>` +
    `</g>`
  );
}

/** 人。20px前後。腕は `arm()` で別に足して、何をしているかを出す。 */
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

/** 羊(牧草地の主役。頭数で語る)。 */
function sheep(x, y, s = 1) {
  const e = (dx, dy, rx, ry) =>
    `<ellipse cx="${r1(x + dx * s)}" cy="${r1(y + dy * s)}" rx="${r1(rx * s)}" ry="${r1(ry * s)}"/>`;
  return (
    `<g fill="#f6efe2">${e(0, 0, 11, 7)}${e(-7, -4, 5, 4)}${e(5, -5, 5, 4)}</g>` +
    `<g fill="#4a4436">${e(11, -3, 4, 3.4)}<rect x="${r1(x - 6 * s)}" y="${r1(y + 5 * s)}" width="${r1(2.2 * s)}" height="${r1(6 * s)}"/><rect x="${r1(x + 4 * s)}" y="${r1(y + 5 * s)}" width="${r1(2.2 * s)}" height="${r1(6 * s)}"/></g>`
  );
}

/** 飛ぶカモメ(2つの弧)。 */
function gullFly(x, y, s = 1, color = "#4a4436") {
  return `<path d="M${r1(x - 6 * s)},${y}q${r1(3 * s)},${r1(-4 * s)} ${r1(6 * s)},0q${r1(3 * s)},${r1(-4 * s)} ${r1(6 * s)},0" stroke="${color}" stroke-width="${r1(1.6 * s)}" fill="none"/>`;
}

/** 立っているアカハシカモメ。赤い嘴と脚。 */
function gullStand(x, y, flip = 1) {
  return (
    `<g transform="translate(${x},${y}) scale(${flip},1)">` +
    `<g stroke="#c2453c" stroke-width="1.2" fill="none"><path d="M-1,6v3M2,6v3"/></g>` +
    `<ellipse cx="0" cy="2" rx="6" ry="4" fill="#f6efe2"/>` +
    `<path d="M-5,0q4,-3 9,-1l-2,4q-4,1 -7,-3z" fill="#c9d2d8"/>` +
    `<circle cx="6" cy="-2" r="2.8" fill="#f6efe2"/>` +
    `<path d="M8.4,-2.4l3,1l-3,1z" fill="#c2453c"/>` +
    `<circle cx="6.6" cy="-3" r=".7" fill="#3a3630"/></g>`
  );
}

/** ニカウ椰子ではなくティー・コウカ(キャベツツリー)。細い幹に剣状の葉の束。 */
function cabbageTree(x, base, h, crown = "#4f7f46") {
  const top = r1(base - h);
  const t = (cx, cy, s) =>
    `<g stroke="${crown}" stroke-width="${r1(2.2 * s)}" stroke-linecap="round" fill="none"><path d="M${cx},${cy}l${r1(-9 * s)},${r1(-6 * s)}M${cx},${cy}l${r1(-4 * s)},${r1(-10 * s)}M${cx},${cy}l${r1(2 * s)},${r1(-11 * s)}M${cx},${cy}l${r1(8 * s)},${r1(-8 * s)}M${cx},${cy}l${r1(10 * s)},${r1(-2 * s)}M${cx},${cy}l${r1(-10 * s)},${r1(1 * s)}"/></g>`;
  return (
    `<path d="M${r1(x - 1.4)},${base}L${r1(x - 0.7)},${top}h1.4L${r1(x + 1.4)},${base}z" fill="#6b5330"/>` +
    t(x, top, h / 34) +
    t(r1(x - h * 0.14), r1(top + h * 0.16), h / 46)
  );
}

/** ポンガ(シダの木)。幹の上から羽状の葉が放射する。 */
function treeFern(x, base, h, frond = "#2d5f45", trunk = "#4a3c2c") {
  const top = r1(base - h);
  const s = h / 30;
  const f = (dx, dy, qx, qy) =>
    `<path d="M${x},${top}q${r1(dx * s)},${r1(dy * s)} ${r1(qx * s)},${r1(qy * s)}"/>`;
  return (
    `<rect x="${r1(x - 1.6 * s)}" y="${top}" width="${r1(3.2 * s)}" height="${h}" fill="${trunk}"/>` +
    `<g stroke="${frond}" stroke-width="${r1(2.6 * s)}" stroke-linecap="round" fill="none">` +
    f(-8, -6, -17, 2) +
    f(-6, -8, -12, -6) +
    f(-2, -9, -5, -12) +
    f(2, -9, 5, -12) +
    f(6, -8, 12, -6) +
    f(8, -6, 17, 2) +
    `</g>` +
    `<circle cx="${x}" cy="${r1(top - 1.5 * s)}" r="${r1(2.2 * s)}" fill="${frond}"/>`
  );
}

/** ハラケケ(ニュージーランドの亜麻)。長い剣状の葉の扇と、高く伸びる花茎。 */
function flax(x, base, s = 1, leaf = "#3f6b45") {
  const p = (dx, dy, qx, qy) =>
    `<path d="M${x},${base}q${r1(dx * s)},${r1(dy * s)} ${r1(qx * s)},${r1(qy * s)}"/>`;
  return (
    `<g stroke="${leaf}" stroke-width="${r1(2.6 * s)}" stroke-linecap="round" fill="none">` +
    p(-4, -14, -12, -20) +
    p(-2, -16, -6, -26) +
    p(0, -18, 1, -28) +
    p(2, -16, 8, -24) +
    p(4, -12, 14, -17) +
    `</g>` +
    `<path d="M${r1(x + 2 * s)},${base}q${r1(4 * s)},${r1(-22 * s)} ${r1(3 * s)},${r1(-34 * s)}" stroke="#8a5a2c" stroke-width="${r1(1.6 * s)}" fill="none"/>` +
    `<g fill="#a8452f"><ellipse cx="${r1(x + 4.6 * s)}" cy="${r1(base - 31 * s)}" rx="${r1(1.6 * s)}" ry="${r1(3.4 * s)}"/><ellipse cx="${r1(x + 5.4 * s)}" cy="${r1(base - 25 * s)}" rx="${r1(1.4 * s)}" ry="${r1(3 * s)}"/></g>`
  );
}

/** 板張りの家(ヴィラ)。遠景の丘に点在させる用の小さいもの。 */
function villa(x, y, w, roof = "#b04a3a") {
  const h = r1(w * 0.62);
  return (
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#f2ede0"/>` +
    `<path d="M${r1(x - 1.5)},${y}h${r1(w + 3)}L${r1(x + w / 2)},${r1(y - w * 0.38)}z" fill="${roof}"/>` +
    `<rect x="${r1(x + w * 0.36)}" y="${r1(y + h * 0.35)}" width="${r1(w * 0.24)}" height="${r1(h * 0.65)}" fill="#4a5568"/>`
  );
}

/** 立ちのぼる湯気。下ほど濃く、上ほど広がって薄れる。 */
function steam(x, base, h, s = 1) {
  const e = (dy, rx, ry, o) =>
    `<ellipse cx="${r1(x + (dy % 2 ? 3 : -3) * s)}" cy="${r1(base - h * dy * 0.25)}" rx="${r1(rx * s)}" ry="${r1(ry * s)}" opacity="${o}"/>`;
  return (
    `<g fill="#f6f4ee">` +
    e(1, 9, 7, ".8") +
    e(2, 12, 9, ".65") +
    e(3, 15, 10, ".5") +
    e(4, 19, 11, ".32") +
    `</g>`
  );
}

/** 樅・ビーチ(南島の防雪林・亜高山)。段になった輪郭。 */
function fir(x, base, h, fill = "#2f5f3f") {
  const w = r1(h * 0.52);
  return (
    `<rect x="${r1(x - 1.6)}" y="${r1(base - 5)}" width="3.2" height="5" fill="#5a4630"/>` +
    `<path d="M${r1(x - w / 2)},${r1(base - 3)}L${x},${r1(base - h)}L${r1(x + w / 2)},${r1(base - 3)}z" fill="${fill}"/>` +
    `<path d="M${r1(x - w / 2.6)},${r1(base - h * 0.42)}L${x},${r1(base - h * 0.9)}L${r1(x + w / 2.6)},${r1(base - h * 0.42)}z" fill="${fill}"/>`
  );
}

/** ポプラ(牧場の防風林)。細長い樹冠。 */
function poplar(x, base, h, crown = "#4f8f46") {
  const b = r1(h * 0.16);
  return (
    `<rect x="${r1(x - 1)}" y="${r1(base - h * 0.2)}" width="2" height="${r1(h * 0.2)}" fill="#5a4630"/>` +
    `<path d="M${x},${r1(base - h)}c${b},${r1(h * 0.25)} ${b},${r1(h * 0.6)} 0,${r1(h * 0.82)}c${-b},${r1(-h * 0.22)} ${-b},${r1(-h * 0.57)} 0,${r1(-h * 0.82)}z" fill="${crown}"/>`
  );
}

/** 柳(川辺)。垂れ下がる枝。 */
function willow(x, base, r) {
  const top = r1(base - r * 1.9);
  const strand = (dx, len) =>
    `<path d="M${r1(x + dx)},${r1(top + r * 0.3)}q${r1(dx * 0.3)},${r1(len * 0.55)} ${r1(dx * 0.15)},${len}" stroke="#5f9450" stroke-width="2.2" fill="none"/>`;
  return (
    `<rect x="${r1(x - r * 0.14)}" y="${r1(base - r)}" width="${r1(r * 0.28)}" height="${r1(r)}" fill="#6b5330"/>` +
    `<circle cx="${x}" cy="${top}" r="${r}" fill="#6fae5a"/>` +
    strand(-r * 0.9, r * 1.5) +
    strand(-r * 0.45, r * 1.7) +
    strand(0.1 * r, r * 1.8) +
    strand(r * 0.55, r * 1.6) +
    strand(r * 0.95, r * 1.3)
  );
}

/** タソック(赤茶の草の株)。放射する細い葉。 */
function tussock(x, base, s = 1, color = "#c2a054") {
  return (
    `<g stroke="${color}" stroke-width="${r1(1.6 * s)}" stroke-linecap="round" fill="none">` +
    `<path d="M${x},${base}l${r1(-7 * s)},${r1(-9 * s)}M${x},${base}l${r1(-3 * s)},${r1(-12 * s)}M${x},${base}l${r1(1 * s)},${r1(-13 * s)}M${x},${base}l${r1(5 * s)},${r1(-11 * s)}M${x},${base}l${r1(8 * s)},${r1(-7 * s)}"/></g>`
  );
}

/** 有刺鉄線の柵。牧場の記号。 */
function fence(x0, x1, y, n = 6) {
  const posts = [];
  for (let i = 0; i < n; i++) {
    const x = r1(x0 + (i * (x1 - x0)) / (n - 1));
    posts.push(`<rect x="${r1(x - 1.4)}" y="${r1(y - 13)}" width="2.8" height="13" fill="#6b5330"/>`);
  }
  return (
    posts.join("") +
    `<g stroke="#8a8062" stroke-width="1.2" fill="none"><path d="M${x0},${r1(y - 10)}H${x1}M${x0},${r1(y - 5)}H${x1}"/></g>`
  );
}

/** 刈り込んだ生垣。上端が波打つ帯。 */
function hedgeBand(y, h = 10, fill = "#2f6b3a") {
  let d = `M0,${y}`;
  for (let i = 0; i < 15; i++) d += `q14,-${h} 28,0`;
  return `<path d="${d}v${h + 6}H0z" fill="${fill}"/>`;
}

/** カモ(公園の池)。 */
function duck(x, y, body = "#6b5330") {
  return (
    `<g><ellipse cx="${x}" cy="${y}" rx="6" ry="3.4" fill="${body}"/>` +
    `<circle cx="${r1(x + 5)}" cy="${r1(y - 4)}" r="2.6" fill="#2f5f3f"/>` +
    `<path d="M${r1(x + 7.2)},${r1(y - 4.4)}l3,1l-3,1z" fill="#f5b31c"/></g>`
  );
}

/** 白サギ(コトゥク)。水辺に立つ白い鳥。 */
function heron(x, y) {
  return (
    `<g><path d="M${x},${y}v-9" stroke="#3a3630" stroke-width="1.2" fill="none"/>` +
    `<ellipse cx="${x}" cy="${r1(y - 12)}" rx="5.5" ry="3.4" fill="#f6efe2"/>` +
    `<path d="M${r1(x + 3)},${r1(y - 14)}q4,-2 5,-7" stroke="#f6efe2" stroke-width="2.4" fill="none"/>` +
    `<circle cx="${r1(x + 8.6)}" cy="${r1(y - 21)}" r="2.2" fill="#f6efe2"/>` +
    `<path d="M${r1(x + 10.6)},${r1(y - 21.4)}l4,1l-4,1z" fill="#f5b31c"/></g>`
  );
}

// ---------------------------------------------------------------------------
// 背景シーン(400×210)
// ---------------------------------------------------------------------------

export const NEWZEALAND_BG = {
  /**
   * 港を囲む急な緑の丘。9都市(オークランド・ウェリントン・ネルソンなど)が
   * 共有する主力の1枚。急斜面に板張りの家がへばりつき、湾には白い帆、
   * 手前の遊歩道にはハラケケとカモメとポフツカワ。
   */
  harbourhills:
    sky("#8fc4e8", "#d8ecf6", 96) +
    sun(52, 30, 13) +
    `<circle cx="52" cy="30" r="19" fill="#fdf0c8" opacity=".2"/>` +
    longCloud(210, 34, 60) +
    longCloud(330, 52, 34, ".7") +
    clouds(120, 56, 0.8) +
    // ── 遠景: 湾の向こうの霞んだ岬と、水平線の帆
    `<path d="M96,96c26,-14 60,-16 92,-6l8,6z" fill="#7fa8b8"/>` +
    `<path d="M232,96c20,-10 44,-10 62,0z" fill="#8fb4c0"/>` +
    // ── 海。y=96〜160
    band(96, 24, "#3f7fa8") +
    band(118, 22, "#4f8fb4") +
    band(138, 22, "#5b9fc0") +
    `<g stroke="#bfe0f0" stroke-width="2" opacity=".6" fill="none"><path d="M18,104h44M300,102h56M60,120h50M250,124h60M20,142h56M320,146h50"/></g>` +
    `<g fill="#f6efe2"><path d="M118,96v-8l4,8z"/><path d="M154,95v-6l3,6z"/></g>` +
    // ── 左の岬: 低い緑の丘と小さな白い灯台
    `<path d="M0,72c30,2 52,14 62,34l6,14H0z" fill="#4f7f46"/>` +
    `<path d="M0,72c30,2 52,14 62,34l-16,-2C36,88 20,80 0,78z" fill="#5a9a4f"/>` +
    `<path d="M42,86l2,-12h6l2,12z" fill="#f2ede0"/>` +
    `<rect x="44.4" y="70" width="5.2" height="2.6" fill="#3a4453"/>` +
    `<rect x="45.6" y="66.6" width="2.8" height="3.4" fill="#f5b31c"/>` +
    // ── 右の丘: 急斜面に家々。ジグザグの道
    `<path d="M400,30c-44,10 -78,42 -92,84l-6,30h98z" fill="#4f7f46"/>` +
    `<path d="M400,30c-44,10 -78,42 -92,84l14,-4c12,-36 42,-64 78,-72z" fill="#5a9a4f"/>` +
    `<g fill="#2d5f45" opacity=".85"><ellipse cx="392" cy="52" rx="10" ry="6"/><ellipse cx="352" cy="94" rx="12" ry="7"/><ellipse cx="390" cy="118" rx="14" ry="8"/><ellipse cx="330" cy="130" rx="10" ry="6"/></g>` +
    `<path d="M398,44c-18,8 -30,20 -38,34c12,-2 20,2 24,10c-14,2 -24,10 -28,22c12,0 20,6 22,14" stroke="#c9b088" stroke-width="3" opacity=".7" fill="none"/>` +
    villa(370, 60, 11, "#4a5568") +
    villa(346, 76, 10) +
    villa(376, 84, 12, "#3f6b4f") +
    villa(332, 102, 11, "#4a5568") +
    villa(360, 106, 10) +
    villa(384, 128, 12) +
    villa(340, 138, 11, "#3f6b4f") +
    villa(368, 142, 10, "#4a5568") +
    // ── 中景: 木の桟橋。倉庫・クレーン・漁船・クレイポット
    `<g fill="#6b5330"><rect x="4" y="140" width="4" height="22"/><rect x="34" y="140" width="4" height="22"/><rect x="64" y="140" width="4" height="22"/><rect x="94" y="140" width="4" height="22"/><rect x="124" y="140" width="4" height="22"/><rect x="148" y="140" width="4" height="20"/></g>` +
    `<rect x="0" y="132" width="158" height="10" fill="#a8763c"/>` +
    `<rect x="0" y="132" width="158" height="2.4" fill="#c08a4a"/>` +
    `<rect x="10" y="106" width="44" height="26" fill="#8a4438"/>` +
    `<path d="M6,106h52l-6,-10H12z" fill="#5f5a52"/>` +
    `<g stroke="#6b342c" stroke-width="1.4" opacity=".8" fill="none"><path d="M10,114h44M10,122h44"/></g>` +
    `<rect x="26" y="118" width="12" height="14" fill="#4a5568"/>` +
    `<g stroke="#5f5a52" stroke-width="3" fill="none"><path d="M78,132V102h22"/><path d="M100,102v8"/></g>` +
    `<rect x="96" y="110" width="8" height="7" fill="#c9773c"/>` +
    `<g fill="#8a6a3c"><rect x="112" y="124" width="12" height="8"/><rect x="114" y="116" width="12" height="8"/></g>` +
    `<g stroke="#5f4a28" stroke-width="1" opacity=".8" fill="none"><path d="M112,128h12M114,120h12"/></g>` +
    // 漁船(桟橋の先)
    `<path d="M130,150c8,4 30,4 38,0l-4,8h-30z" fill="#3f5f6a"/>` +
    `<rect x="138" y="138" width="14" height="12" fill="#f2ede0"/>` +
    `<rect x="141" y="141" width="5" height="4" fill="#4a5568"/>` +
    `<rect x="155" y="128" width="2" height="22" fill="#5a4630"/>` +
    // ヨット(湾内)
    `<path d="M262,138c8,-3 26,-3 34,0c-5,5 -29,5 -34,0z" fill="#f6efe2"/>` +
    `<path d="M280,136V110l13,26z" fill="#f2ede0"/>` +
    `<path d="M278,136V114l-10,22z" fill="#e8443f"/>` +
    `<path d="M304,120c6,-2 18,-2 24,0c-4,4 -20,4 -24,0z" fill="#f6efe2"/>` +
    `<path d="M316,118V100l9,18z" fill="#5b8fe8"/>` +
    gullFly(190, 52, 1.1) +
    gullFly(258, 68, 0.9) +
    gullFly(96, 44, 1) +
    // ── 近景: 石の護岸と遊歩道
    band(156, 10, "#8a8578") +
    `<g stroke="#6f6b62" stroke-width="1.2" opacity=".7" fill="none"><path d="M0,161h400M24,156v10M70,156v10M120,156v10M170,156v10M226,156v10M280,156v10M336,156v10M382,156v10"/></g>` +
    ground(166, "#c9b088") +
    `<g stroke="#b09a72" stroke-width="1.6" opacity=".7" fill="none"><path d="M0,182h400M0,198h400"/></g>` +
    // 係船柱とロープ
    `<g fill="#3a4453"><path d="M56,178v-10q4,-3 8,0v10z"/><path d="M126,182v-10q4,-3 8,0v10z"/></g>` +
    `<path d="M64,170c20,8 42,8 62,0" stroke="#8a8062" stroke-width="2" fill="none"/>` +
    // ── 最前景: ポフツカワ・ハラケケ・カモメ・散歩の人
    `<path d="M380,210V166l-6,-14" stroke="#4a3c2c" stroke-width="7" fill="none"/>` +
    `<path d="M374,168l-12,-8M380,178l14,-10" stroke="#4a3c2c" stroke-width="4" fill="none"/>` +
    `<g fill="#2d5f45"><ellipse cx="356" cy="152" rx="26" ry="12"/><ellipse cx="390" cy="144" rx="22" ry="11"/><ellipse cx="376" cy="162" rx="18" ry="9"/></g>` +
    `<g fill="#c22f38"><circle cx="344" cy="150" r="2.6"/><circle cx="360" cy="146" r="2.6"/><circle cx="386" cy="140" r="2.6"/><circle cx="374" cy="156" r="2.4"/><circle cx="396" cy="150" r="2.4"/><circle cx="352" cy="158" r="2.2"/></g>` +
    flax(28, 208, 1.3) +
    flax(96, 206, 1) +
    gullStand(214, 190) +
    gullStand(238, 198, -1) +
    shade(160, 200, 11, 3, ".16") +
    person(159, 200, 21, "#e8443f") +
    arm(159, 188, 11, 6) +
    shade(302, 196, 11, 3, ".16") +
    person(301, 196, 20, "#5b8fe8") +
    arm(301, 185, -9, 6) +
    `<g fill="#8a6a3c"><ellipse cx="322" cy="194" rx="7" ry="4"/><circle cx="329" cy="191" r="2.6"/><rect x="317" y="196" width="2" height="5"/><rect x="325" y="196" width="2" height="5"/></g>` +
    `<path d="M310,190l7,2" stroke="#6b5330" stroke-width="1.2" fill="none"/>`,

  /**
   * ロトルアの地熱地帯。白い湯気・乳白色の池・オレンジ縁の池・泥の池・
   * 立ち枯れの木。木道の上から二人が眺める。
   */
  steamfield:
    sky("#c2d4d2", "#e6eee9", 100) +
    `<circle cx="330" cy="34" r="14" fill="#f2ead8" opacity=".85"/>` +
    `<circle cx="330" cy="34" r="21" fill="#f2ead8" opacity=".25"/>` +
    // ── 遠景: 霞んだ原生林の稜線(2枚重ね)
    `<path d="M0,100L28,84l30,10l36,-14l34,12l40,-10l38,10l34,-12l40,10l36,-8l42,10l42,-8v16z" fill="#7a9384" opacity=".5"/>` +
    `<path d="M0,100L40,92l44,6l52,-8l48,8l58,-6l60,8l50,-6l48,6v10z" fill="#5f7f6a" opacity=".7"/>` +
    ground(100, "#d8cfc0") +
    // 稜線ぎわの遠い湯気
    steam(56, 100, 40, 0.9) +
    steam(246, 100, 36, 0.8) +
    steam(342, 100, 44, 1) +
    // ── 中景: 乳白色の池(左)。白い縁とシリカの段
    `<ellipse cx="88" cy="136" rx="76" ry="17" fill="#f0f2ec"/>` +
    `<ellipse cx="88" cy="135" rx="66" ry="13" fill="#9fd8d0"/>` +
    `<ellipse cx="84" cy="134" rx="42" ry="8" fill="#6ec4bc"/>` +
    `<path d="M22,142c14,10 34,14 60,15c-30,3 -54,-2 -66,-10z" fill="#e8e4da"/>` +
    `<path d="M150,140c-8,8 -24,12 -44,13c22,3 40,0 50,-8z" fill="#e8e4da"/>` +
    `<g stroke="#c9bfa8" stroke-width="1.6" opacity=".8" fill="none"><path d="M20,152q60,14 128,8M36,162q52,10 96,6"/></g>` +
    `<path d="M28,128q30,-8 66,-4" stroke="#e8d27f" stroke-width="3" opacity=".8" fill="none"/>` +
    steam(66, 128, 52, 1.2) +
    steam(112, 130, 42, 1) +
    // ── 中景: オレンジ縁の池(右。シャンパンプール風)
    `<ellipse cx="320" cy="150" rx="52" ry="13" fill="#d8883c"/>` +
    `<ellipse cx="320" cy="149" rx="43" ry="10" fill="#a8c8a0"/>` +
    `<ellipse cx="316" cy="148" rx="26" ry="6" fill="#c2ddb8"/>` +
    `<g fill="#f2e6c8" opacity=".8"><circle cx="298" cy="150" r="1.4"/><circle cx="330" cy="147" r="1.2"/><circle cx="314" cy="152" r="1.2"/></g>` +
    steam(330, 144, 46, 1.1) +
    // ── 立ち枯れの木(硫黄に焼かれた白い幹)
    `<g stroke="#9a948a" stroke-width="3" stroke-linecap="round" fill="none"><path d="M140,148V110M140,120l-10,-10M140,128l9,-8"/></g>` +
    `<g stroke="#8a847a" stroke-width="2.6" stroke-linecap="round" fill="none"><path d="M258,140V106M258,116l-8,-9M258,124l8,-7"/></g>` +
    `<g stroke="#a8a298" stroke-width="2.2" stroke-linecap="round" fill="none"><path d="M28,120V96M28,104l-7,-7M28,110l6,-6"/></g>` +
    // 地面の割れ目と硫黄の染み
    `<g stroke="#b8ab8e" stroke-width="1.6" opacity=".8" fill="none"><path d="M168,150l16,6l-4,8M232,158l-14,8M196,176l18,4"/></g>` +
    `<g fill="#e8d27f" opacity=".75"><ellipse cx="180" cy="162" rx="12" ry="4"/><ellipse cx="246" cy="170" rx="9" ry="3.4"/><ellipse cx="160" cy="178" rx="8" ry="3"/></g>` +
    // ── 近景: 泥の池(ぼこぼこ湧く)
    `<ellipse cx="212" cy="190" rx="40" ry="10" fill="#6b5a4c"/>` +
    `<ellipse cx="212" cy="189" rx="33" ry="7.4" fill="#7a685a"/>` +
    `<g fill="#8a7866"><circle cx="200" cy="188" r="3.4"/><circle cx="222" cy="190" r="2.8"/><circle cx="212" cy="185" r="2.2"/></g>` +
    `<g stroke="#5f5044" stroke-width="1.2" opacity=".8" fill="none"><ellipse cx="200" cy="188" rx="6.5" ry="2.4"/><ellipse cx="222" cy="190" rx="5.5" ry="2"/></g>` +
    steam(206, 184, 30, 0.8) +
    // マヌカの茂み
    `<g fill="#4f6b52"><ellipse cx="30" cy="176" rx="14" ry="7"/><ellipse cx="48" cy="182" rx="10" ry="5"/><ellipse cx="378" cy="178" rx="14" ry="7"/><ellipse cx="356" cy="184" rx="10" ry="5"/></g>` +
    `<g fill="#f6efe2" opacity=".8"><circle cx="24" cy="173" r="1.2"/><circle cx="38" cy="176" r="1.2"/><circle cx="374" cy="175" r="1.2"/><circle cx="384" cy="180" r="1.2"/></g>` +
    // ── 最前景: 木道と見物の二人
    `<g fill="#5f4a28"><rect x="8" y="196" width="4" height="14"/><rect x="90" y="196" width="4" height="14"/><rect x="180" y="198" width="4" height="12"/><rect x="286" y="196" width="4" height="14"/><rect x="368" y="196" width="4" height="14"/></g>` +
    band(194, 11, "#a8763c") +
    `<rect x="0" y="194" width="400" height="2.2" fill="#c08a4a"/>` +
    `<g stroke="#8a5f2c" stroke-width="1.2" opacity=".8" fill="none"><path d="M20,194v11M52,194v11M84,194v11M116,194v11M148,194v11M180,194v11M212,194v11M244,194v11M276,194v11M308,194v11M340,194v11M372,194v11"/></g>` +
    `<path d="M0,183h400" stroke="#6b5330" stroke-width="2.6" fill="none"/>` +
    `<g fill="#6b5330"><rect x="30" y="183" width="3" height="11"/><rect x="130" y="183" width="3" height="11"/><rect x="252" y="183" width="3" height="11"/><rect x="352" y="183" width="3" height="11"/></g>` +
    person(70, 194, 21, "#e8443f") +
    arm(70, 182, 12, -6) +
    person(322, 194, 20, "#5b8fe8") +
    arm(322, 183, -8, -4, "#e0b48a", 2.6) +
    `<rect x="308" y="176" width="7" height="5" rx="1" fill="#3a3630"/>`,

  /**
   * ミルフォード・サウンド。切り立った岩壁が垂直に水面へ落ち、
   * 一筋の滝とたれこめる雲。小さな遊覧船が岩壁の高さを語る。
   */
  fiordwall:
    sky("#b8c8d0", "#cdd9dd", 150) +
    // ── 遠景: 谷の奥は明るく霞む(雨上がりの逆光)
    `<rect x="140" y="0" width="130" height="150" fill="#d8e2e4"/>` +
    `<path d="M152,150V92l26,-8l26,6l24,-8l24,10v58z" fill="#8a99a0"/>` +
    `<path d="M152,150v-34l100,-8v42z" fill="#7a8a92"/>` +
    // ── 中景: 左右の岩壁。ほぼ垂直に水面へ落ちる
    `<path d="M0,0h140l10,56l-8,48l10,46H0z" fill="#4a5a60"/>` +
    `<path d="M98,0l32,56l-8,48l10,46h-38l-8,-54l14,-44l-16,-52z" fill="#3f4e54"/>` +
    `<g stroke="#3a474c" stroke-width="2" opacity=".6" fill="none"><path d="M40,64v34M58,96v40M120,70v30M132,116v28"/></g>` +
    `<path d="M400,0h-146l-8,58l8,46l-8,46h154z" fill="#435158"/>` +
    `<path d="M304,0l-28,58l14,46l-10,46h42l-6,-50l12,-46l-10,-54z" fill="#38454c"/>` +
    `<g stroke="#333f45" stroke-width="2" opacity=".6" fill="none"><path d="M352,60v38M370,108v34M282,74v30M264,120v24"/></g>` +
    // 岩壁にへばりつく緑(垂直の森)
    `<g fill="#2d5f45" opacity=".85"><path d="M0,150l0,-58c14,10 24,26 30,44l6,14z"/><ellipse cx="58" cy="132" rx="16" ry="10"/><ellipse cx="96" cy="144" rx="20" ry="10"/><ellipse cx="140" cy="140" rx="12" ry="8"/></g>` +
    `<g fill="#2d5f45" opacity=".85"><path d="M400,150v-52c-14,8 -24,22 -30,38l-6,14z"/><ellipse cx="336" cy="138" rx="18" ry="10"/><ellipse cx="296" cy="146" rx="14" ry="8"/><ellipse cx="262" cy="142" rx="10" ry="6"/></g>` +
    `<g fill="#3f7f5a" opacity=".7"><ellipse cx="76" cy="140" rx="8" ry="5"/><ellipse cx="122" cy="148" rx="8" ry="5"/><ellipse cx="316" cy="144" rx="9" ry="5"/></g>` +
    // 水ぎわのポンガ(シダの木)のシルエット
    treeFern(28, 152, 15, "#1f4a36", "#16281f") +
    treeFern(52, 154, 12, "#1f4a36", "#16281f") +
    treeFern(368, 152, 14, "#1f4a36", "#16281f") +
    // ── 右壁のもう一筋の細い滝
    `<ellipse cx="331" cy="86" rx="8" ry="4" fill="#e8f2f4" opacity=".55"/>` +
    `<path d="M330,86q-2,26 1,38q2,14 -2,24" stroke="#e8f2f4" stroke-width="2.4" opacity=".65" fill="none"/>` +
    `<ellipse cx="329" cy="150" rx="10" ry="4" fill="#e8f2f4" opacity=".55"/>` +
    // ── 滝(左壁)。雲の下から二筋になって落ち、水面で霧になる
    `<ellipse cx="104" cy="66" rx="12" ry="5" fill="#e8f2f4" opacity=".7"/>` +
    `<path d="M104,66q4,32 0,50q-4,20 2,34" stroke="#e8f2f4" stroke-width="4" opacity=".9" fill="none"/>` +
    `<path d="M110,70q2,30 -1,46q-2,18 3,32" stroke="#e8f2f4" stroke-width="2" opacity=".7" fill="none"/>` +
    `<ellipse cx="106" cy="152" rx="16" ry="6" fill="#e8f2f4" opacity=".7"/>` +
    // ── たれこめる雲(岩壁の頭を隠す)
    `<g fill="#e8ecee" opacity=".92"><ellipse cx="40" cy="38" rx="80" ry="20"/><ellipse cx="150" cy="28" rx="80" ry="18"/><ellipse cx="205" cy="8" rx="100" ry="16"/><ellipse cx="266" cy="36" rx="76" ry="19"/><ellipse cx="368" cy="30" rx="70" ry="20"/></g>` +
    `<g fill="#d8dee2" opacity=".8"><ellipse cx="96" cy="52" rx="60" ry="12"/><ellipse cx="300" cy="54" rx="64" ry="12"/><ellipse cx="200" cy="46" rx="48" ry="10"/></g>` +
    `<g fill="#e8ecee" opacity=".55"><ellipse cx="60" cy="84" rx="40" ry="8"/><ellipse cx="344" cy="90" rx="38" ry="8"/></g>` +
    // ── 水面。タンニンで暗い緑。谷の奥だけ空を映して明るい
    ground(150, "#2e4a52") +
    band(178, 32, "#243c44") +
    `<rect x="156" y="150" width="96" height="9" fill="#9fc0c4" opacity=".5"/>` +
    `<g stroke="#7aa0a8" stroke-width="1.8" opacity=".55" fill="none"><path d="M20,162h52M120,158h44M300,164h58M60,182h48M230,186h64M150,200h56M330,200h44"/></g>` +
    `<g stroke="#54747c" stroke-width="1.4" opacity=".5" fill="none"><path d="M96,170h30M256,172h40M28,192h34M370,186h24M196,166h28"/></g>` +
    // 岩壁と滝の映り込み
    `<g opacity=".25"><path d="M104,152q-3,16 1,28" stroke="#e8f2f4" stroke-width="3" fill="none"/><rect x="20" y="152" width="30" height="26" fill="#1c3038"/><rect x="330" y="152" width="34" height="24" fill="#1c3038"/></g>` +
    // 水面の霧
    `<g fill="#cfdadd" opacity=".5"><ellipse cx="80" cy="152" rx="60" ry="6"/><ellipse cx="310" cy="154" rx="66" ry="6"/><ellipse cx="200" cy="150" rx="50" ry="5"/></g>` +
    // ── 最前景: 小さな遊覧船(岩壁の巨大さを出す)
    `<path d="M66,182c8,3 34,3 42,0l-5,7H72z" fill="#c2453c"/>` +
    `<rect x="76" y="174" width="20" height="8" rx="1.5" fill="#f2ede0"/>` +
    `<g fill="#3a4453"><rect x="79" y="176" width="4" height="3.4"/><rect x="86" y="176" width="4" height="3.4"/></g>` +
    `<rect x="92" y="168" width="2" height="8" fill="#3a4453"/>` +
    `<path d="M108,186q14,3 26,1" stroke="#7aa0a8" stroke-width="2" opacity=".7" fill="none"/>` +
    `<path d="M64,188q-12,3 -22,1" stroke="#7aa0a8" stroke-width="2" opacity=".7" fill="none"/>` +
    // 海鳥(奥の岩壁と重ねると目玉に見えるので、左の水路の上に置く)
    gullFly(122, 100, 0.9, "#e8ecee") +
    gullFly(140, 112, 0.8, "#e8ecee"),

  /**
   * なだらかな緑の牧草地。5都市(マタマタ・ヘイスティングスなど)が共有。
   * 丸い丘・ポプラの防風林・生垣・羊の群れ・農場の家と郵便受け。
   */
  pastoralhills:
    sky("#8fc4e8", "#dceff6", 100) +
    sun(340, 30, 13) +
    longCloud(150, 36, 56) +
    clouds(60, 58, 0.8) +
    // ── 遠景: 青みがかった丘
    `<path d="M0,100c40,-22 84,-24 130,-10l30,10z" fill="#7fa88a"/>` +
    `<path d="M210,100c46,-18 100,-18 140,-4l50,4z" fill="#8fb494"/>` +
    ground(100, "#5a9a4f") +
    // ── 中景: 丸い丘の重なりと、遠い羊の点々
    `<path d="M0,132c50,-26 110,-28 170,-8c-60,-4 -120,0 -170,14z" fill="#6fae5a"/>` +
    `<path d="M230,128c50,-20 110,-20 170,-2v10c-56,-10 -114,-12 -170,-8z" fill="#6fae5a"/>` +
    `<g fill="#f6efe2"><ellipse cx="252" cy="118" rx="3.4" ry="2"/><ellipse cx="270" cy="122" rx="3.4" ry="2"/><ellipse cx="290" cy="117" rx="3.4" ry="2"/><ellipse cx="310" cy="123" rx="3.4" ry="2"/><ellipse cx="332" cy="119" rx="3.4" ry="2"/></g>` +
    // ポプラの防風林
    poplar(196, 120, 34) +
    poplar(210, 121, 38) +
    poplar(224, 120, 34) +
    poplar(238, 122, 36) +
    // 農場の家と物置・給水タンク
    `<rect x="46" y="106" width="46" height="22" fill="#f2ede0"/>` +
    `<path d="M42,106h54l-8,-12H50z" fill="#c2453c"/>` +
    `<rect x="56" y="114" width="9" height="14" fill="#4a5568"/>` +
    `<rect x="74" y="112" width="10" height="8" fill="#7f97ad"/>` +
    `<rect x="100" y="112" width="26" height="16" fill="#8a4438"/>` +
    `<path d="M97,112h32l-5,-8h-22z" fill="#5f5a52"/>` +
    `<g><rect x="134" y="110" width="12" height="14" rx="1" fill="#8a9aa4"/><ellipse cx="140" cy="110" rx="6" ry="2" fill="#aebcc4"/></g>` +
    // 生垣と柵
    hedgeBand(148, 8, "#2f6b3a") +
    fence(0, 400, 174, 11) +
    // ── 近景: 砂利道が門へ
    `<path d="M236,210q8,-24 26,-34q14,-8 34,-6l2,10q-18,0 -30,8q-14,10 -18,24z" fill="#c9b088"/>` +
    `<g stroke="#b09a72" stroke-width="1.4" opacity=".7" fill="none"><path d="M254,198q10,-14 26,-20M262,210q8,-18 24,-26"/></g>` +
    // 門(木のゲート)と郵便受け
    `<g stroke="#6b5330" stroke-width="2.6" fill="none"><path d="M282,174v-22M318,174v-22M282,156h36M282,164h36M282,172h36M282,172l36,-16"/></g>` +
    `<g><rect x="336" y="158" width="3" height="16" fill="#6b5330"/><rect x="331" y="150" width="14" height="9" rx="2.5" fill="#e8443f"/><rect x="331" y="153" width="14" height="2" fill="#b03028"/></g>` +
    // ── 最前景: 羊たちと牧場主
    sheep(60, 190, 1.2) +
    sheep(110, 198, 1.35) +
    sheep(158, 188, 1.1) +
    sheep(360, 196, 1.3) +
    shade(310, 200, 11, 3, ".16") +
    person(309, 200, 21, "#4f6b52") +
    arm(309, 188, 10, -4) +
    `<g fill="#3a3630"><ellipse cx="336" cy="198" rx="7" ry="4"/><circle cx="343" cy="194" r="2.8"/><path d="M329,196l-5,-3" stroke="#3a3630" stroke-width="2"/><rect x="331" y="200" width="2" height="5"/><rect x="339" y="200" width="2" height="5"/></g>` +
    tussock(20, 208, 1.1, "#7fae5a") +
    tussock(206, 206, 1, "#7fae5a") +
    tussock(392, 206, 1.1, "#7fae5a"),

  /**
   * 濃い原生林と静かな水面。4都市(ワイトモ・ホキティカなど)が共有。
   * 層になった樹冠に低い雲がかかり、鏡のような水に白サギが立つ。
   */
  nativebush:
    sky("#c8d8dc", "#e8f0ee", 158) +
    // ── 遠景: 樹冠の稜線が3枚重なる
    `<path d="M0,96l24,-8l20,6l26,-10l24,8l28,-8l24,6l30,-10l26,8l28,-6l24,6l30,-8l26,8l24,-6l24,6l22,-6l20,8v6z" fill="#7fa88a" opacity=".55"/>` +
    `<path d="M0,110q20,-12 42,-8q18,-10 40,-4q22,-12 44,-4q18,-8 40,-2q24,-10 46,-2q20,-8 42,0q22,-8 44,0q20,-6 42,2q16,-4 30,2l30,6v10H0z" fill="#4f7f5a" opacity=".8"/>` +
    `<path d="M0,132q24,-14 48,-8q20,-12 46,-6q24,-10 48,-2q22,-10 46,-2q24,-8 48,0q22,-8 46,2q22,-6 44,4q20,-4 44,6l30,6v78H0z" fill="#2d5f45"/>` +
    // 低くたれこめる雲の帯
    `<g fill="#e8f0ee" opacity=".7"><ellipse cx="80" cy="98" rx="70" ry="6"/><ellipse cx="250" cy="106" rx="84" ry="7"/><ellipse cx="368" cy="94" rx="52" ry="5"/></g>` +
    // ── 中景: 樹冠から突き出るラタの枯木と、キャベツツリー
    `<g stroke="#9a948a" stroke-width="2.6" stroke-linecap="round" fill="none"><path d="M92,128V104M92,112l-8,-8M92,116l7,-6"/></g>` +
    cabbageTree(320, 148, 40) +
    cabbageTree(348, 150, 30) +
    // 手前の大きなポンガ
    treeFern(36, 158, 26, "#5a9a5f", "#4a3c2c") +
    treeFern(84, 162, 32, "#4f8f54", "#4a3c2c") +
    treeFern(360, 164, 28, "#5a9a5f", "#4a3c2c") +
    `<g fill="#1f4a36"><ellipse cx="140" cy="150" rx="30" ry="12"/><ellipse cx="230" cy="152" rx="40" ry="12"/><ellipse cx="300" cy="150" rx="26" ry="10"/></g>` +
    // ── 水面。タンニンで琥珀がかった鏡
    ground(158, "#22423c") +
    band(196, 14, "#1b352f") +
    // 岸の映り込み
    `<g fill="#1a3a30" opacity=".6"><rect x="18" y="158" width="40" height="20"/><rect x="70" y="158" width="34" height="26"/><rect x="306" y="158" width="52" height="22"/></g>` +
    `<g stroke="#4f8f7a" stroke-width="1.6" opacity=".5" fill="none"><path d="M40,168h44M150,164h50M260,170h56M100,184h44M200,192h60M330,186h40"/></g>` +
    // 倒木と白サギ
    `<path d="M228,176q34,-4 62,4l-2,5q-30,-7 -60,-3z" fill="#4a3c2c"/>` +
    `<path d="M286,178l10,-8" stroke="#4a3c2c" stroke-width="3" fill="none"/>` +
    heron(252, 178) +
    // 手前の岩とハラケケ
    `<g fill="#3a4a42"><ellipse cx="30" cy="204" rx="20" ry="8"/><ellipse cx="66" cy="208" rx="14" ry="6"/></g>` +
    flax(112, 210, 1.2, "#2f5f45") +
    flax(386, 208, 1.1, "#2f5f45") +
    // 水面の霧
    `<g fill="#cfdadd" opacity=".25"><ellipse cx="150" cy="162" rx="70" ry="4"/><ellipse cx="310" cy="168" rx="60" ry="3.5"/></g>`,

  /**
   * 川沿いの公園と並木。3都市(ハミルトン・ワンガヌイ・クライストチャーチ)が
   * 共有。柳が川に垂れ、平底舟が滑り、芝生にあずまやとカモ。
   */
  gardenriver:
    sky("#8fc4e8", "#d8ecf6", 96) +
    sun(58, 28, 12) +
    clouds(200, 40, 0.9) +
    clouds(330, 56, 0.7) +
    // ── 遠景: 町並み(教会の尖塔と時計台)
    `<g fill="#b0a894"><rect x="20" y="78" width="30" height="18"/><rect x="60" y="82" width="26" height="14"/><rect x="256" y="80" width="30" height="16"/><rect x="296" y="76" width="24" height="20"/><rect x="342" y="82" width="30" height="14"/></g>` +
    `<g fill="#8a8578"><path d="M18,78h34l-6,-8H24z"/><path d="M254,80h34l-6,-8h-22z"/><path d="M294,76h28l-5,-7h-18z"/></g>` +
    `<rect x="104" y="58" width="12" height="38" fill="#c9c0ac"/>` +
    `<path d="M102,58h16l-8,-14z" fill="#4a5568"/>` +
    `<rect x="107" y="66" width="6" height="8" fill="#5f7f96"/>` +
    // ── 公園の芝生
    ground(96, "#5a9a4f") +
    `<g stroke="#4f8f46" stroke-width="2" opacity=".6" fill="none"><path d="M0,116q100,-8 200,0t200,0M0,134q100,-8 200,0t200,0"/></g>` +
    // 並木(丸い樹冠)と花壇
    `<g><rect x="152" y="112" width="3" height="12" fill="#6b5330"/><circle cx="153.5" cy="106" r="9" fill="#3f8f4f"/></g>` +
    `<g><rect x="186" y="110" width="3" height="12" fill="#6b5330"/><circle cx="187.5" cy="104" r="10" fill="#4f9f58"/></g>` +
    `<g><rect x="222" y="112" width="3" height="12" fill="#6b5330"/><circle cx="223.5" cy="106" r="9" fill="#3f8f4f"/></g>` +
    `<g fill="#8a5a2c" opacity=".9"><ellipse cx="60" cy="126" rx="26" ry="5"/><ellipse cx="350" cy="122" rx="24" ry="5"/></g>` +
    `<g fill="#e8443f"><circle cx="48" cy="123" r="1.8"/><circle cx="62" cy="125" r="1.8"/><circle cx="74" cy="122" r="1.8"/></g>` +
    `<g fill="#f5b31c"><circle cx="55" cy="126" r="1.8"/><circle cx="68" cy="123" r="1.8"/><circle cx="342" cy="121" r="1.8"/><circle cx="356" cy="124" r="1.8"/></g>` +
    `<g fill="#8a7ab8"><circle cx="348" cy="119" r="1.8"/><circle cx="362" cy="121" r="1.8"/></g>` +
    // あずまや(バンドロタンダ)
    `<g><path d="M18,104h44l-22,-14z" fill="#4a5568"/><rect x="20" y="104" width="40" height="3" fill="#8a8578"/><g fill="#dfd8c8"><rect x="24" y="107" width="3" height="18"/><rect x="38" y="107" width="3" height="18"/><rect x="53" y="107" width="3" height="18"/></g><rect x="20" y="125" width="40" height="4" fill="#b0a894"/></g>` +
    // ── 川。柳が右岸に垂れる
    band(140, 30, "#4f8fb4") +
    `<g stroke="#bfe0f0" stroke-width="2" opacity=".6" fill="none"><path d="M20,148h50M150,152h44M300,146h56M90,162h48M240,164h52"/></g>` +
    willow(330, 148, 17) +
    // 平底舟(プント)と船頭
    `<path d="M96,158c12,4 40,4 52,0l-7,7h-38z" fill="#8a5a2c"/>` +
    `<path d="M96,158c12,4 40,4 52,0" stroke="#6b4423" stroke-width="1.6" fill="none"/>` +
    person(118, 158, 15, "#f2ede0") +
    arm(118, 150, 11, -3, "#e0b48a", 2.4) +
    `<path d="M130,142v20" stroke="#8a6a3c" stroke-width="2" fill="none"/>` +
    duck(196, 158) +
    duck(226, 166, "#4f6b52") +
    // ── 最前景: 遊歩道とベンチ
    ground(170, "#5a9a4f") +
    band(182, 12, "#c9b088") +
    `<g stroke="#b09a72" stroke-width="1.4" opacity=".7" fill="none"><path d="M0,188h400M60,182v12M150,182v12M240,182v12M330,182v12"/></g>` +
    // 街灯2本
    `<g><rect x="86" y="150" width="2.6" height="32" fill="#3a4453"/><circle cx="87.3" cy="147" r="4" fill="#f5d06a"/><path d="M83,182h9" stroke="#3a4453" stroke-width="2"/></g>` +
    `<g><rect x="288" y="150" width="2.6" height="32" fill="#3a4453"/><circle cx="289.3" cy="147" r="4" fill="#f5d06a"/><path d="M285,182h9" stroke="#3a4453" stroke-width="2"/></g>` +
    // ベンチで読書する人・芝生でピクニック
    `<g><rect x="150" y="198" width="30" height="3" fill="#8a5a2c"/><g fill="#6b4423"><rect x="152" y="201" width="3" height="7"/><rect x="174" y="201" width="3" height="7"/></g><rect x="150" y="190" width="30" height="3" fill="#8a5a2c"/></g>` +
    person(166, 198, 18, "#5b8fe8") +
    `<rect x="170" y="186" width="7" height="5" fill="#f6efe2"/>` +
    `<g><ellipse cx="52" cy="200" rx="16" ry="5" fill="#e8443f" opacity=".85"/><circle cx="46" cy="197" r="2.6" fill="#f6efe2"/><circle cx="58" cy="198" r="2.6" fill="#f5b31c"/></g>` +
    duck(320, 200, "#6b5330") +
    flax(390, 208, 1),

  /**
   * 岩棚や断崖が海に迫る険しい海岸。3都市(ファカタネ・ニュープリマス・
   * カイコウラ)が共有。隆起した地層の棚・昆布・オットセイ・沖に湯気の島。
   */
  rockycoast:
    sky("#9cc4dc", "#dce8f0", 92) +
    clouds(96, 34, 0.9) +
    longCloud(280, 24, 44, ".7") +
    // ── 遠景: 湯気を上げる沖の島と、雪の山並み
    `<path d="M30,92l16,-12l18,12z" fill="#6f8a92"/>` +
    steam(46, 78, 26, 0.7) +
    `<path d="M270,92l24,-22l18,10l22,-16l26,14l20,-8l20,10v12z" fill="#8a94a8"/>` +
    `<path d="M294,70l7,8l-4,-1l-3,3l-3,-3l-4,1zM360,68l6,8l-3.4,-1l-2.6,3l-2.6,-3l-3.4,1z" fill="#f0f4f6"/>` +
    // ── 海
    band(92, 26, "#3f7fa8") +
    band(116, 24, "#4f8fb4") +
    `<g stroke="#e8f2f6" stroke-width="2.2" opacity=".8" fill="none"><path d="M20,102q10,3 22,0M60,112q12,4 26,0M130,106q10,3 22,0M180,118q12,4 24,0M250,108q10,3 22,0"/></g>` +
    `<g stroke="#bfe0f0" stroke-width="1.8" opacity=".6" fill="none"><path d="M90,98h40M210,96h44M300,116h50"/></g>` +
    // ── 中景: 隆起した地層の棚(水平の縞と白い隆起線)
    `<path d="M400,74l-96,10l-40,20l-24,20l-14,16l174,0z" fill="#5f6a62"/>` +
    `<g stroke="#4a5248" stroke-width="2" opacity=".8" fill="none"><path d="M296,94l104,-8M270,110l130,-10M252,126l148,-10"/></g>` +
    `<path d="M262,120l138,-11" stroke="#e8e4da" stroke-width="2.6" opacity=".9" fill="none"/>` +
    // ── 近景: 手前の岩棚と潮だまり
    ground(140, "#6f6a5e") +
    `<g stroke="#57534a" stroke-width="2" opacity=".8" fill="none"><path d="M0,152h400M0,168h256M0,186h400"/></g>` +
    `<path d="M0,160h236" stroke="#e8e4da" stroke-width="2.4" opacity=".8" fill="none"/>` +
    // 棚の縁で砕けるしぶき
    `<g fill="#e8f2f6" opacity=".9"><circle cx="232" cy="136" r="3.6"/><circle cx="239" cy="131" r="2.6"/><circle cx="225" cy="130" r="2.2"/><circle cx="124" cy="137" r="3.2"/><circle cx="131" cy="132" r="2.4"/><circle cx="117" cy="132" r="2"/></g>` +
    `<g stroke="#e8f2f6" stroke-width="1.6" opacity=".7" fill="none"><path d="M232,129v-6M239,127v-5M124,130v-6M131,128v-4"/></g>` +
    // オットセイ2頭(棚の上でひなたぼっこ)
    `<g fill="#5a4630"><path d="M290,148q10,-8 22,-2q6,3 4,6q-16,4 -26,-4z"/><circle cx="314" cy="148" r="3.4"/></g>` +
    `<g fill="#6b5844"><path d="M346,166q8,-6 18,-2q5,2 3,5q-13,3 -21,-3z"/><circle cx="366" cy="166" r="3"/></g>` +
    // 潮だまりとヒトデ・昆布
    `<g><ellipse cx="70" cy="178" rx="34" ry="8" fill="#4f8fa8"/><ellipse cx="62" cy="176" rx="14" ry="3.4" fill="#7fb8cc"/></g>` +
    `<g><ellipse cx="190" cy="200" rx="28" ry="7" fill="#4f8fa8"/><ellipse cx="184" cy="198" rx="12" ry="3" fill="#7fb8cc"/></g>` +
    `<path d="M96,180l3,-6l3,6l6,1l-5,4l2,6l-6,-3l-6,3l2,-6l-5,-4z" fill="#e08a3c"/>` +
    `<g stroke="#3f5a3c" stroke-width="3" stroke-linecap="round" fill="none"><path d="M130,192q8,-12 4,-24M140,194q6,-10 12,-18M118,196q2,-12 -4,-20"/></g>` +
    `<g fill="#4a4436"><ellipse cx="280" cy="176" rx="16" ry="6"/><ellipse cx="330" cy="196" rx="20" ry="7"/></g>` +
    gullStand(244, 172) +
    gullFly(180, 60, 1) +
    gullFly(220, 74, 0.85) +
    // ミヤコドリ(黒い体に赤い嘴)
    `<g><ellipse cx="152" cy="172" rx="5.5" ry="3.4" fill="#2a2622"/><circle cx="157" cy="168" r="2.4" fill="#2a2622"/><path d="M159.2,167.4l4,0.8l-4,1z" fill="#e8443f"/><g stroke="#c2604a" stroke-width="1.1" fill="none"><path d="M150,175v3M154,175v3"/></g></g>` +
    // 岩に張り付くカサガイと海藻の縁
    `<g fill="#c9c0ac"><ellipse cx="220" cy="182" rx="2.6" ry="1.4"/><ellipse cx="230" cy="190" rx="2.2" ry="1.2"/><ellipse cx="210" cy="194" rx="2.4" ry="1.3"/></g>` +
    `<g stroke="#3f5a3c" stroke-width="2.6" stroke-linecap="round" fill="none"><path d="M262,196q6,-10 2,-20M272,198q5,-8 10,-14M362,186q6,-10 2,-18M372,188q5,-8 10,-13"/></g>` +
    `<path d="M120,168l3,-5l3,5l5,1l-4,3l1.6,5l-5.6,-2.6l-5.6,2.6l1.6,-5l-4,-3z" fill="#c26a4a"/>` +
    // 磯を歩く人(長靴とバケツ)
    shade(38, 202, 11, 3, ".16") +
    person(37, 202, 20, "#f5b31c") +
    arm(37, 190, 10, 6) +
    `<path d="M47,197q4,0 5,4q-5,2 -7,-1z" fill="#4a5568"/>`,

  /**
   * 広い高原とその奥にそびえる雪山。タウポ・ナショナルパークが共有。
   * タソックの草原・軽石の白い土・単独の火山円錐から細い噴気。
   */
  volcanicplateau:
    sky("#8fc4e8", "#d0e8f2", 108) +
    longCloud(120, 30, 52) +
    clouds(330, 48, 0.8) +
    // ── 遠景: 左になだらかな山塊(ルアペフ)、右に単独の円錐(ナウルホエ)
    `<path d="M0,108L40,66l24,14l22,-22l26,20l20,-10l28,26l10,14z" fill="#8a94a8"/>` +
    `<path d="M86,58l10,12l-5,-2l-5,5l-5,-5l-5,2zM40,66l8,10l-4,-1.5l-4,4l-4,-4l-4,1.5z" fill="#f0f4f6"/>` +
    `<path d="M242,108l62,-74l62,74z" fill="#6f7a8c"/>` +
    `<path d="M304,34l20,24l-8,-3l-6,7l-6,-7l-8,3z" fill="#f0f4f6"/>` +
    `<path d="M304,34q2,-10 6,-14q2,8 -2,14z" fill="#dfe8ea" opacity=".8"/>` +
    `<path d="M242,108l20,-24l14,10l12,-14l16,12z" fill="#5f6a7c" opacity=".6"/>` +
    // ── 高原の地面(軽石の白っぽい土)
    ground(108, "#c2b394") +
    band(140, 26, "#b8a888") +
    band(164, 46, "#a89878") +
    // 左奥に湖(タウポ)。山塊は湖の向こうに立つ
    `<path d="M0,108h164q-10,7 -30,8l-134,4z" fill="#5b9fc0"/>` +
    `<g stroke="#bfe0f0" stroke-width="1.4" opacity=".7" fill="none"><path d="M14,111h40M76,113h44"/></g>` +
    // ── 中景: タソックの帯と溶岩の岩
    `<g fill="#c9b877" opacity=".8"><ellipse cx="60" cy="126" rx="40" ry="5"/><ellipse cx="180" cy="132" rx="52" ry="5"/><ellipse cx="320" cy="128" rx="44" ry="5"/></g>` +
    tussock(40, 136, 0.8) +
    tussock(96, 132, 0.7) +
    tussock(150, 138, 0.8) +
    tussock(230, 134, 0.7) +
    tussock(300, 138, 0.8) +
    tussock(360, 134, 0.7) +
    `<g fill="#5a5a52"><ellipse cx="120" cy="150" rx="12" ry="5"/><ellipse cx="260" cy="156" rx="10" ry="4.4"/></g>` +
    // 砂利道が奥へ
    `<path d="M180,210q4,-40 18,-70l8,2q-12,30 -14,68z" fill="#d8c9a8"/>` +
    `<g stroke="#b8a888" stroke-width="1.6" opacity=".7" fill="none"><path d="M188,200q4,-30 12,-52M198,206q2,-30 10,-56"/></g>` +
    // 低木(モノアオ)の茂み
    `<g fill="#6b7f52"><ellipse cx="40" cy="168" rx="16" ry="6"/><ellipse cx="90" cy="180" rx="12" ry="5"/><ellipse cx="300" cy="172" rx="16" ry="6"/><ellipse cx="352" cy="184" rx="12" ry="5"/></g>` +
    `<g fill="#8a9a62" opacity=".8"><ellipse cx="34" cy="165" rx="6" ry="2.6"/><ellipse cx="296" cy="169" rx="6" ry="2.6"/></g>` +
    // ── 最前景: 大きなタソックと火山岩、道標
    tussock(30, 202, 1.6) +
    tussock(70, 208, 1.4) +
    tussock(126, 200, 1.5) +
    tussock(250, 204, 1.4) +
    tussock(330, 200, 1.6) +
    tussock(384, 208, 1.4) +
    `<g fill="#4a4a44"><ellipse cx="160" cy="196" rx="16" ry="7"/><ellipse cx="152" cy="192" rx="8" ry="4"/></g>` +
    `<g><rect x="288" y="176" width="3.4" height="26" fill="#8a6a3c"/><path d="M291,178h22l5,4l-5,4h-22z" fill="#f5b31c"/></g>` +
    // 上空を回るカレアレア(ニュージーランドハヤブサ)
    `<path d="M60,64c7,-4 12,-5 15,-1c3,-4 8,-3 15,1c-7,-1 -12,1 -15,3c-3,-2 -8,-4 -15,-3z" fill="#5a5248" opacity=".9"/>` +
    `<g fill="#8a8578"><ellipse cx="330" cy="160" rx="9" ry="4"/><ellipse cx="80" cy="150" rx="8" ry="3.4"/></g>` +
    sheep(258, 188, 0.9) +
    // 道を行くトランパー(背負子)
    shade(214, 194, 10, 3, ".16") +
    person(213, 194, 20, "#c9773c") +
    `<rect x="206" y="176" width="7" height="12" rx="2" fill="#8a4438"/>` +
    arm(213, 183, -8, 7),

  /**
   * 雪山の谷を縫うジグザグの線路。ラウリム・アーサーズ・パスが共有。
   * 折り返す線路・トンネル・高架橋を渡る小さな赤い列車・樅の防雪林。
   */
  alpinevalley:
    sky("#a8c8dc", "#e0ecf2", 126) +
    clouds(80, 36, 0.9) +
    longCloud(300, 28, 40, ".75") +
    // ── 遠景: 雪の峰
    `<path d="M0,124L44,58l30,28l38,-44l44,52l34,-30l46,44l40,-24l52,40l36,-20l36,26V210H0z" fill="#8a94a8"/>` +
    `<path d="M112,42l12,16l-6,-2l-6,6l-6,-6l-6,2zM44,58l9,12l-4.5,-2l-4.5,5l-4.5,-5l-4.5,2zM236,84l9,11l-4.5,-1.5l-4.5,4.5l-4.5,-4.5l-4.5,1.5zM330,100l8,10l-4,-1.5l-4,4l-4,-4l-4,1.5z" fill="#f0f4f6"/>` +
    // ── 中景: 森の斜面。ジグザグに折り返す線路
    `<path d="M0,210V128l70,-24l90,18l80,-14l90,20l70,-12V210z" fill="#3a6b4a"/>` +
    `<path d="M0,150l90,-16l100,14l96,-16l114,16v14l-114,-12l-96,14l-100,-12l-90,14z" fill="#2d5f45"/>` +
    // 上の線(左上へ)とトンネル
    `<path d="M0,132L150,120l96,-8l80,6" stroke="#5a5248" stroke-width="4" fill="none"/>` +
    `<g stroke="#8a8578" stroke-width="1.2" opacity=".8" fill="none"><path d="M20,133l1,-4M60,130l1,-4M100,127l1,-4M140,124l1,-4M180,121l1,-4M220,118l1,-4M260,116l1,-4M300,116l1,-4"/></g>` +
    `<path d="M326,110q10,-2 16,4q-2,8 -12,8q-8,-2 -4,-12z" fill="#4a4436"/>` +
    `<path d="M330,116q4,-4 8,0q0,5 -4,5q-4,0 -4,-5z" fill="#1c1a16"/>` +
    // 折り返して下の線(右下へ)。雪の斜面を横切る
    ground(158, "#eef3f6") +
    `<g fill="#d4e2ea"><ellipse cx="80" cy="180" rx="56" ry="8"/><ellipse cx="300" cy="192" rx="64" ry="9"/></g>` +
    `<path d="M0,168l120,6l140,10l140,4" stroke="#5a5248" stroke-width="5" fill="none"/>` +
    `<g stroke="#8a8578" stroke-width="1.4" opacity=".8" fill="none"><path d="M24,171v-5M64,173v-5M104,175v-5M144,177v-5M184,179v-5M224,182v-5M264,184v-5M304,186v-5M344,187v-5M384,188v-5"/></g>` +
    // 高架橋(谷を渡る)と赤い列車
    `<path d="M148,210v-32M186,210v-30M224,210v-28" stroke="#5f6a72" stroke-width="5" fill="none"/>` +
    `<path d="M136,180h104" stroke="#5f6a72" stroke-width="3" fill="none"/>` +
    `<g><rect x="60" y="160" width="30" height="13" rx="2" fill="#c2453c"/><rect x="64" y="163" width="7" height="5" fill="#e8ecee"/><rect x="76" y="163" width="7" height="5" fill="#e8ecee"/><rect x="93" y="162" width="26" height="11" rx="1.5" fill="#8a4438"/><rect x="122" y="162" width="26" height="11" rx="1.5" fill="#8a4438"/><g fill="#2a2622"><circle cx="68" cy="174" r="2.6"/><circle cx="82" cy="174" r="2.6"/><circle cx="100" cy="174" r="2.4"/><circle cx="112" cy="174" r="2.4"/><circle cx="129" cy="174" r="2.4"/><circle cx="141" cy="174" r="2.4"/></g></g>` +
    `<g fill="#e8ecee" opacity=".85"><ellipse cx="64" cy="154" rx="4.4" ry="3"/><ellipse cx="57" cy="148" rx="6" ry="3.8"/><ellipse cx="48" cy="141" rx="7.5" ry="4.6"/></g>` +
    // ジグザグの中段(森のあいだに見え隠れする)
    `<path d="M400,148l-70,-9" stroke="#5a5248" stroke-width="3.4" fill="none"/>` +
    `<g stroke="#8a8578" stroke-width="1.2" opacity=".8" fill="none"><path d="M348,146v-4M372,149v-4M394,152v-4"/></g>` +
    // ── 最前景: 樅の防雪林と雪の吹きだまり
    fir(268, 206, 34) +
    fir(292, 210, 28) +
    fir(316, 204, 38) +
    fir(342, 208, 30) +
    fir(368, 204, 36) +
    fir(392, 208, 28) +
    fir(16, 206, 30) +
    fir(38, 210, 24) +
    `<g fill="#f8fbfd"><ellipse cx="120" cy="206" rx="46" ry="7"/><ellipse cx="230" cy="208" rx="40" ry="6"/></g>` +
    // 雪に立つスノーポールの列と、待避小屋
    `<g stroke="#c9773c" stroke-width="2" fill="none"><path d="M20,168v-8M100,172v-8M180,176v-8M260,180v-8M340,184v-8"/></g>` +
    `<g><rect x="352" y="146" width="26" height="16" fill="#5a4630"/><path d="M348,146h34l-17,-10z" fill="#3a4453"/><rect x="358" y="152" width="7" height="10" fill="#2a2622"/><rect x="370" y="140" width="4" height="7" fill="#4a4436"/><g fill="#e8ecee" opacity=".7"><ellipse cx="373" cy="136" rx="3.4" ry="2.2"/><ellipse cx="376" cy="131" rx="4" ry="2.6"/></g></g>` +
    // 雪の中のケア(緑の高山オウム)
    `<g><ellipse cx="196" cy="199" rx="7" ry="4.4" fill="#4f6b3f"/><circle cx="203" cy="195" r="3" fill="#4f6b3f"/><path d="M205.6,193.6q3,0.4 3,3l-3,-0.6z" fill="#5a5248"/><path d="M190,197q-4,-2 -5,-5" stroke="#c2453c" stroke-width="1.6" fill="none"/><g stroke="#3a3630" stroke-width="1.2" fill="none"><path d="M193,203v3M199,203v3"/></g></g>`,

  /**
   * ワイタンギ。海を望む芝生に旗竿と門。彫刻の意匠は特定の部族の写しを避け、
   * コル(渦巻)の抽象にとどめる。
   */
  treatylawn:
    sky("#8fc4e8", "#d8ecf6", 96) +
    sun(60, 26, 12) +
    longCloud(240, 30, 46) +
    clouds(340, 52, 0.8) +
    // ── 遠景: 島の散らばる湾(ベイ・オブ・アイランズ)
    band(96, 22, "#4f8fb4") +
    `<g fill="#5f8f7a"><path d="M60,96l14,-8l16,8z"/><path d="M150,96l10,-6l12,6z"/><path d="M300,96l16,-9l18,9z"/></g>` +
    `<g stroke="#bfe0f0" stroke-width="1.8" opacity=".6" fill="none"><path d="M30,104h44M120,108h50M240,102h48M330,110h44"/></g>` +
    `<path d="M196,110c10,-4 26,-4 36,0c-6,4 -30,4 -36,0z" fill="#f6efe2"/>` +
    `<path d="M214,108V92l11,16z" fill="#f2ede0"/>` +
    // ── 芝生
    ground(118, "#5a9a4f") +
    `<g stroke="#4f8f46" stroke-width="2" opacity=".6" fill="none"><path d="M0,142q100,-8 200,0t200,0M0,166q100,-8 200,0t200,0"/></g>` +
    // 条約の家(白いコロニアル様式)
    `<rect x="30" y="96" width="52" height="24" fill="#f6efe2"/>` +
    `<path d="M26,96h60l-8,-12H34z" fill="#8a8578"/>` +
    `<g fill="#dfd8c8"><rect x="30" y="112" width="52" height="3"/><rect x="34" y="108" width="4" height="12"/><rect x="74" y="108" width="4" height="12"/></g>` +
    `<g fill="#5f7f96"><rect x="40" y="102" width="8" height="10"/><rect x="64" y="102" width="8" height="10"/></g>` +
    `<rect x="53" y="102" width="7" height="18" fill="#4a5568"/>` +
    // 長いカヌー小屋(海辺)
    `<path d="M266,118v-8q30,-6 60,0v8z" fill="#8a6a3c"/>` +
    `<path d="M260,110h72l-36,-12z" fill="#5f5a52"/>` +
    // ── 中景: 旗竿(3本マストのように帆桁を持つ)
    `<rect x="296" y="52" width="3" height="102" fill="#f2ede0"/>` +
    `<g stroke="#dfd8c8" stroke-width="2" fill="none"><path d="M279,72h37M283,94h29"/></g>` +
    `<g stroke="#8a8578" stroke-width="1" opacity=".7" fill="none"><path d="M279,72l18,80M316,72l-18,80M283,94l14,58M312,94l-14,58"/></g>` +
    `<circle cx="297.5" cy="49" r="2.6" fill="#c2453c"/>` +
    shade(297, 156, 16, 3.4, ".14") +
    // 門(ワハロア)。渦巻の抽象
    `<g><rect x="96" y="112" width="7" height="48" fill="#8a4438"/><rect x="152" y="112" width="7" height="48" fill="#8a4438"/><path d="M90,116h75l-5,-12H95z" fill="#a8523c"/><path d="M118,104l9,-10l9,10z" fill="#a8523c"/>` +
    `<g stroke="#5f2f28" stroke-width="1.8" fill="none"><path d="M99,120a3.4,3.4 0 1 1 2,6M99,134a3.4,3.4 0 1 1 2,6M155,120a3.4,3.4 0 1 1 2,6M155,134a3.4,3.4 0 1 1 2,6M112,110a3,3 0 1 1 2,5M136,110a3,3 0 1 1 2,5"/></g></g>` +
    // ── 最前景: 見学の人たちとティー・コウカ
    cabbageTree(370, 190, 52) +
    `<g stroke="#4f8f46" stroke-width="2.4" opacity=".7" fill="none"><path d="M0,190q60,8 120,4M280,196q60,-6 120,-2"/></g>` +
    shade(140, 196, 11, 3, ".16") +
    person(139, 196, 21, "#5b8fe8") +
    arm(139, 184, 10, -5) +
    shade(180, 200, 11, 3, ".16") +
    person(179, 200, 20, "#e8443f") +
    arm(179, 189, -8, 5) +
    shade(250, 192, 10, 3, ".16") +
    person(249, 192, 18, "#f5b31c") +
    flax(16, 208, 1.2),

  /**
   * ギズボーンの岬。朝焼けの光、水平線から昇る太陽、断崖と彫刻の標。
   * 地球でいち早く朝を迎える土地。
   */
  sunrisecape:
    band(0, 46, "#6b5a8c") +
    band(40, 34, "#b06a6a") +
    band(68, 30, "#e08a5c") +
    band(92, 22, "#f5b31c") +
    // 帯状の朝焼け雲
    `<g fill="#8a5a7a" opacity=".75"><ellipse cx="90" cy="34" rx="70" ry="5"/><ellipse cx="300" cy="24" rx="60" ry="4.4"/></g>` +
    `<g fill="#e8746a" opacity=".8"><ellipse cx="200" cy="56" rx="86" ry="4.4"/><ellipse cx="60" cy="70" rx="48" ry="3.4"/><ellipse cx="330" cy="66" rx="54" ry="3.6"/></g>` +
    // 昇る太陽(半分だけ)
    `<path d="M96,112a26,26 0 0 1 52,0z" fill="#f5d06a"/>` +
    `<path d="M96,112a26,26 0 0 1 52,0z" fill="#f5b31c" opacity=".6"/>` +
    // ── 海。光の道
    band(110, 46, "#8a5a6a") +
    band(112, 20, "#a86a6a" ) +
    `<g stroke="#f5d06a" stroke-width="2.6" opacity=".8" fill="none"><path d="M112,116h22M106,124h32M100,132h44M108,142h30M104,150h38"/></g>` +
    `<g stroke="#e8a08a" stroke-width="1.6" opacity=".6" fill="none"><path d="M220,120h56M300,114h58M240,140h50M330,132h44"/></g>` +
    // ── 中景: 岬の断崖(右)
    `<path d="M400,44l-56,10l-36,24l-24,32l-14,32l-6,14h136z" fill="#4a3c44"/>` +
    `<path d="M400,44l-56,10l-36,24l14,2l38,-20l40,-8z" fill="#5f4a52"/>` +
    `<g stroke="#3a2f36" stroke-width="2" opacity=".8" fill="none"><path d="M330,92l-16,30M356,74l-14,34M382,60l-12,36"/></g>` +
    // 岬の上の小さな灯台
    `<path d="M368,56l2,-10h5l2,10z" fill="#f2ede0"/>` +
    `<rect x="369.6" y="42.6" width="5.8" height="3.4" fill="#3a4453"/>` +
    `<rect x="370.8" y="39.6" width="3.4" height="3" fill="#f5d06a"/>` +
    // ── 手前の海面と磯
    band(156, 54, "#6b4a5c") +
    `<g stroke="#f5d06a" stroke-width="2" opacity=".55" fill="none"><path d="M96,162h48M90,172h58M100,184h44M94,196h52"/></g>` +
    `<g stroke="#c98a8a" stroke-width="1.6" opacity=".5" fill="none"><path d="M220,166h56M300,176h60M240,192h52"/></g>` +
    // ── 最前景: 手前の丘とポウ(彫刻の標)。渦巻の抽象
    `<path d="M0,124l60,10l60,26l40,50H0z" fill="#33283a"/>` +
    `<path d="M0,124l60,10l30,13l-24,2l-36,-13l-30,-4z" fill="#463850"/>` +
    `<g><rect x="52" y="94" width="9" height="52" fill="#3a2f36"/><path d="M49,94h15l-7.5,-5z" fill="#3a2f36"/><g stroke="#c9885c" stroke-width="1.8" fill="none"><path d="M55,100a3.4,3.4 0 1 1 3,5M55,114a3.4,3.4 0 1 1 3,5M55,128a3.4,3.4 0 1 1 3,5"/></g></g>` +
    flax(110, 176, 1.2, "#2a2130") +
    flax(150, 196, 1.4, "#2a2130") +
    tussock(24, 176, 1.2, "#5f4a5c") +
    tussock(190, 208, 1.4, "#5f4a5c") +
    cabbageTree(226, 206, 44, "#2a2130") +
    // 朝の鳥
    gullFly(180, 44, 1, "#3a2f36") +
    gullFly(216, 58, 0.85, "#3a2f36") +
    gullFly(150, 70, 0.7, "#3a2f36"),

  /**
   * ネイピア。パステル色のアールデコの看板建築とノーフォーク松の通り、
   * クラシックカー。1931年の地震のあとに一斉に建て直された町。
   */
  artdecotown:
    sky("#8fc4e8", "#d8ecf6", 152) +
    sun(38, 26, 11) +
    clouds(210, 32, 0.8) +
    // ── 建物の列(段状のパラペット・チェブロン・日輪)
    // 1棟目(桃色)
    `<rect x="6" y="76" width="74" height="76" fill="#e8b4a0"/>` +
    `<path d="M2,76h82v-8h-26v-8h-30v8H2z" fill="#d89a84"/>` +
    `<g fill="#f2d0c0"><rect x="14" y="88" width="12" height="18"/><rect x="32" y="88" width="12" height="18"/><rect x="50" y="88" width="12" height="18"/><rect x="14" y="116" width="12" height="18"/><rect x="50" y="116" width="12" height="18"/></g>` +
    `<path d="M32,116h12l-6,10z" fill="#c2453c"/>` +
    `<g stroke="#c98a74" stroke-width="1.6" fill="none"><path d="M10,142h66M10,146h66"/></g>` +
    // 2棟目(水色。日輪の破風)
    `<rect x="86" y="68" width="70" height="84" fill="#a8ccd4"/>` +
    `<path d="M82,68h78l-8,-10H90z" fill="#8ab4bc"/>` +
    `<g stroke="#7fa8b0" stroke-width="2" fill="none"><path d="M121,84v-12M121,84l-10,-8M121,84l10,-8M121,84l-14,-2M121,84l14,-2"/></g>` +
    `<g fill="#e8f2f4"><rect x="94" y="94" width="14" height="20"/><rect x="134" y="94" width="14" height="20"/><rect x="94" y="122" width="14" height="20"/><rect x="134" y="122" width="14" height="20"/></g>` +
    `<rect x="114" y="122" width="14" height="30" fill="#4a6b74"/>` +
    // 3棟目(クリーム色。段状の塔)
    `<rect x="162" y="58" width="60" height="94" fill="#f2e0b4"/>` +
    `<path d="M158,58h68v-8h-18v-8h-32v8h-18z" fill="#e0c894"/>` +
    `<g fill="#c9a86a"><rect x="168" y="66" width="48" height="3"/><rect x="168" y="74" width="48" height="3"/></g>` +
    `<g fill="#8a7444"><path d="M172,90h10v16l-5,-4l-5,4zM192,90h10v16l-5,-4l-5,4zM172,116h10v16l-5,-4l-5,4zM192,116h10v16l-5,-4l-5,4z"/></g>` +
    `<rect x="208" y="90" width="8" height="42" fill="#e8d4a4"/>` +
    // 4棟目(薄緑。チェブロン)
    `<rect x="228" y="72" width="66" height="80" fill="#b4d4b4"/>` +
    `<path d="M224,72h74l-6,-10h-62z" fill="#94bc94"/>` +
    `<g stroke="#6b9a6b" stroke-width="2.4" fill="none"><path d="M234,82l8,6l8,-6l8,6l8,-6l8,6l8,-6M234,90l8,6l8,-6l8,6l8,-6l8,6l8,-6"/></g>` +
    `<g fill="#e0f0e0"><rect x="236" y="104" width="13" height="18"/><rect x="258" y="104" width="13" height="18"/><rect x="280" y="104" width="8" height="18"/></g>` +
    `<rect x="252" y="128" width="18" height="24" fill="#4f7050"/>` +
    `<path d="M236,128h12v24h-12z" fill="#e0f0e0"/>` +
    // 5棟目(藤色)
    `<rect x="300" y="80" width="94" height="72" fill="#c4b4d4"/>` +
    `<path d="M296,80h100v-8h-34v-6h-30v6h-36z" fill="#a894bc"/>` +
    `<g fill="#e8e0f0"><rect x="308" y="92" width="14" height="20"/><rect x="332" y="92" width="14" height="20"/><rect x="356" y="92" width="14" height="20"/><rect x="308" y="120" width="14" height="20"/><rect x="356" y="120" width="14" height="20"/></g>` +
    `<g stroke="#8a74a0" stroke-width="1.8" fill="none"><path d="M332,124a7,7 0 0 1 14,0M332,131a7,7 0 0 0 14,0"/></g>` +
    // 日除けの縞
    `<g fill="#e8443f"><path d="M12,110h48l-4,-8H16z"/></g>` +
    `<g fill="#f6efe2"><rect x="18" y="102" width="6" height="8"/><rect x="32" y="102" width="6" height="8"/><rect x="46" y="102" width="6" height="8"/></g>` +
    // ── 通り
    band(152, 12, "#c9c0ac") +
    band(164, 46, "#5f5a52") +
    `<g stroke="#f6efe2" stroke-width="3" stroke-dasharray="16 14" opacity=".7" fill="none"><path d="M0,188h400"/></g>` +
    // ノーフォーク松(段になった枝)
    `<g><rect x="88" y="150" width="4" height="18" fill="#5a4630"/><g fill="#2f5f3f"><path d="M70,152h40l-20,-8z"/><path d="M74,142h32l-16,-8z"/><path d="M78,132h24l-12,-8z"/><path d="M82,122h16l-8,-8z"/></g></g>` +
    `<g><rect x="330" y="148" width="4" height="18" fill="#5a4630"/><g fill="#2f5f3f"><path d="M312,150h40l-20,-8z"/><path d="M316,140h32l-16,-8z"/><path d="M320,130h24l-12,-8z"/><path d="M324,120h16l-8,-8z"/></g></g>` +
    // ── 最前景: クラシックカーと散歩の人々
    shade(206, 200, 34, 5, ".2") +
    `<g><path d="M172,196v-10q2,-8 12,-8h10l8,-10h26l8,10h6q10,0 12,8v10z" fill="#7a9ab0"/>` +
    `<path d="M204,178l6,-8h20l6,8z" fill="#4a6b80"/>` +
    `<rect x="206" y="170.5" width="22" height="7" rx="1" fill="#cfe4f0"/>` +
    `<g fill="#2a2622"><circle cx="188" cy="196" r="7"/><circle cx="238" cy="196" r="7"/></g>` +
    `<g fill="#8a8578"><circle cx="188" cy="196" r="3"/><circle cx="238" cy="196" r="3"/></g>` +
    `<rect x="168" y="188" width="8" height="4" rx="2" fill="#f5d06a"/></g>` +
    shade(64, 202, 11, 3, ".16") +
    person(63, 202, 21, "#c26a8a") +
    arm(63, 190, 10, 4) +
    `<path d="M69,186q4,-3 8,0l-4,3z" fill="#c26a8a"/>` +
    shade(316, 204, 11, 3, ".16") +
    person(315, 204, 21, "#4a6b80") +
    arm(315, 192, -9, 5) +
    `<path d="M306,197h-6q-2,4 2,6q4,0 4,-6z" fill="#8a5a2c"/>` +
    gullFly(290, 40, 0.9),

  /**
   * 網目状の川と砂利の平野。ブレナム・アシュバートンが共有。
   * 編み込みのような流路・雪の山並み・防風林・川原の千鳥。
   */
  braidedplain:
    sky("#9cc8e0", "#dcecf4", 100) +
    longCloud(140, 28, 50) +
    clouds(320, 44, 0.8) +
    // ── 遠景: 雪の山並み
    `<path d="M0,100L36,64l28,20l34,-30l38,28l30,-18l40,26l36,-14l40,20l32,-10l40,16l28,-8l18,6v10z" fill="#8a94a8"/>` +
    `<path d="M98,54l10,13l-5,-2l-5,5l-5,-5l-5,2zM36,64l8,10l-4,-1.5l-4,4l-4,-4l-4,1.5zM206,76l8,10l-4,-1.5l-4,4l-4,-4l-4,1.5zM314,88l7,9l-3.5,-1.5l-3.5,4l-3.5,-4l-3.5,1.5z" fill="#f0f4f6"/>` +
    // ── 平野と防風林
    ground(100, "#b8ab90") +
    `<g fill="#4f7f46"><rect x="0" y="104" width="120" height="5" rx="2.5"/><rect x="250" y="102" width="150" height="5" rx="2.5"/></g>` +
    poplar(130, 110, 22) +
    poplar(140, 110, 26) +
    poplar(150, 110, 22) +
    // ── 中景: 編み込む流路(ターコイズの筋が分かれては合わさる)
    band(118, 60, "#c9bda0") +
    `<g fill="#5fb4c9"><path d="M0,124q60,8 120,2t120,6q80,8 160,-2v7q-80,10 -160,2t-120,-6q-60,6 -120,-2z"/><path d="M0,148q80,-10 150,0t130,2q60,-2 120,-8v7q-60,6 -120,8t-130,-2q-70,-10 -150,0z"/><path d="M40,136q60,-2 110,4q-50,4 -110,-4z"/><path d="M240,160q60,-6 110,0q-50,6 -110,0z"/></g>` +
    `<g stroke="#a8dce8" stroke-width="1.4" opacity=".8" fill="none"><path d="M20,127h50M170,132h44M300,128h50M60,150h46M230,152h40M330,158h40"/></g>` +
    // 砂利の中州
    `<g fill="#d8cdb0"><ellipse cx="90" cy="140" rx="34" ry="5"/><ellipse cx="240" cy="142" rx="40" ry="6"/><ellipse cx="350" cy="146" rx="28" ry="5"/></g>` +
    `<g fill="#b8ab90"><ellipse cx="92" cy="139" rx="18" ry="2.6"/><ellipse cx="244" cy="141" rx="20" ry="3"/></g>` +
    // ── 近景: 川原
    ground(178, "#c9bda0") +
    `<g fill="#b09a72"><ellipse cx="40" cy="190" rx="6" ry="3"/><ellipse cx="90" cy="200" rx="7" ry="3.4"/><ellipse cx="150" cy="192" rx="5" ry="2.6"/><ellipse cx="230" cy="202" rx="7" ry="3.4"/><ellipse cx="300" cy="192" rx="6" ry="3"/><ellipse cx="360" cy="204" rx="7" ry="3"/></g>` +
    `<g fill="#a89878"><ellipse cx="66" cy="196" rx="4.4" ry="2.2"/><ellipse cx="196" cy="196" rx="5" ry="2.4"/><ellipse cx="330" cy="198" rx="4.4" ry="2.2"/></g>` +
    // 流木と草
    `<path d="M110,206q22,-6 42,-2l-2,4q-20,-3 -38,2z" fill="#8a7458"/>` +
    tussock(20, 208, 1.3) +
    tussock(260, 208, 1.2) +
    tussock(390, 206, 1.3) +
    // 川原の鳥(黒い頭の小さなアジサシ)と飛ぶ姿
    `<g><ellipse cx="310" cy="184" rx="5.5" ry="3.4" fill="#c9d2d8"/><circle cx="315" cy="180" r="2.6" fill="#2a2622"/><path d="M317.4,179.6l3,.8l-3,1z" fill="#f5b31c"/><g stroke="#5f5a52" stroke-width="1" fill="none"><path d="M308,187v3M312,187v3"/></g></g>` +
    gullFly(70, 60, 0.9, "#5f5a52") +
    gullFly(110, 74, 0.75, "#5f5a52") +
    // 中州の砂利の粒と、置き去りの流木
    `<g fill="#c9bda0"><ellipse cx="80" cy="139" rx="3" ry="1.2"/><ellipse cx="100" cy="141" rx="2.6" ry="1.1"/><ellipse cx="232" cy="141" rx="3" ry="1.2"/><ellipse cx="252" cy="143" rx="2.6" ry="1.1"/><ellipse cx="348" cy="146" rx="2.6" ry="1.1"/></g>` +
    `<path d="M226,146q10,-3 20,-1l-1,2.4q-9,-1.6 -18,0.6z" fill="#8a7458"/>` +
    // 遠い防風林をもう一列
    `<g fill="#4f7f46" opacity=".8"><rect x="160" y="106" width="70" height="4" rx="2"/></g>` +
    poplar(352, 108, 18) +
    poplar(362, 108, 21) +
    poplar(372, 108, 18),

  /**
   * セントラル・オタゴの乾いた金色の丘。片岩の岩塔・石造りの採掘小屋の廃墟・
   * 秋のポプラ・水路の跡。ゴールドラッシュの置き土産。
   */
  goldhills:
    sky("#a8cce0", "#e8e4d0", 104) +
    sun(348, 30, 13) +
    longCloud(120, 26, 40, ".7") +
    // ── 遠景: 乾いた丘の重なり
    `<path d="M0,104c60,-26 130,-28 200,-12l40,12z" fill="#b09a6a"/>` +
    `<path d="M180,104c70,-20 150,-18 220,-2v2z" fill="#c2a878"/>` +
    ground(104, "#c9a860") +
    band(148, 62, "#b8955a") +
    // 丘の肌の起伏
    `<g stroke="#a8874c" stroke-width="2" opacity=".6" fill="none"><path d="M0,124q100,-10 200,0t200,0M0,140q100,-8 200,0t200,0"/></g>` +
    // ── 中景: 片岩の岩塔(トア)
    `<g fill="#7f7462"><path d="M60,118l4,-26q4,-8 12,-8t12,8l4,26z"/><path d="M300,124l3,-20q3,-7 10,-7t10,7l3,20z"/></g>` +
    `<g stroke="#5f5648" stroke-width="1.6" opacity=".8" fill="none"><path d="M62,102h28M64,110h26M302,110h24M304,117h22"/></g>` +
    // 秋の金色のポプラ
    poplar(154, 128, 40, "#e0a83c") +
    poplar(170, 130, 48, "#f5b31c") +
    poplar(186, 128, 42, "#d89a2c") +
    // 石造りの採掘小屋の廃墟(屋根が抜け、切妻だけ残る)
    `<rect x="236" y="108" width="52" height="28" fill="#b8ab90"/>` +
    `<path d="M236,108l0,-14l12,14z" fill="#b8ab90"/>` +
    `<path d="M288,108l0,-14l-12,14z" fill="#b8ab90"/>` +
    `<g stroke="#9a8c70" stroke-width="1.4" opacity=".8" fill="none"><path d="M236,116h52M236,124h52M248,108v28M266,108v28"/></g>` +
    `<rect x="256" y="120" width="10" height="16" fill="#5f5040"/>` +
    `<rect x="240" y="112" width="8" height="8" fill="#5f5040"/>` +
    // 選鉱の跡(色の抜けた尾鉱の山と古い水路)
    `<g fill="#d8cdb0"><ellipse cx="330" cy="150" rx="26" ry="7"/><ellipse cx="368" cy="158" rx="20" ry="6"/></g>` +
    `<path d="M0,158q80,-8 160,-2t160,8" stroke="#8a7458" stroke-width="4" opacity=".7" fill="none"/>` +
    `<path d="M0,156q80,-8 160,-2t160,8" stroke="#5fb4c9" stroke-width="1.8" opacity=".7" fill="none"/>` +
    // ── 最前景: タイムの茂み・岩・古いトロッコの車輪
    `<g fill="#8a7ab8" opacity=".8"><ellipse cx="48" cy="182" rx="16" ry="6"/><ellipse cx="86" cy="192" rx="12" ry="5"/><ellipse cx="320" cy="186" rx="14" ry="5.5"/></g>` +
    `<g fill="#6b5f9c" opacity=".7"><ellipse cx="44" cy="180" rx="6" ry="2.6"/><ellipse cx="316" cy="184" rx="6" ry="2.4"/></g>` +
    `<g fill="#7f7462"><ellipse cx="150" cy="200" rx="18" ry="7"/><ellipse cx="140" cy="196" rx="9" ry="4"/></g>` +
    `<g><circle cx="250" cy="196" r="9" fill="none" stroke="#8a5a3c" stroke-width="3"/><path d="M250,188v16M242,196h16" stroke="#8a5a3c" stroke-width="2.4"/></g>` +
    `<path d="M226,204q20,-4 44,0" stroke="#8a7458" stroke-width="2.6" fill="none"/>` +
    tussock(30, 206, 1.4) +
    tussock(110, 208, 1.2) +
    tussock(206, 206, 1.3) +
    tussock(370, 202, 1.4) +
    sheep(354, 178, 0.9),

  /**
   * アカロア。火山の縁に囲まれた丸くおだやかな入り江。
   * 縁の丘から見下ろす小さな町と帆と、牧場の柵。
   */
  craterharbour:
    sky("#8fc4e8", "#d8ecf6", 92) +
    sun(330, 28, 12) +
    longCloud(120, 34, 44, ".8") +
    // ── 遠景: 入り江の向こう側の縁(なだらかな火山の壁)
    `<path d="M0,92c40,-18 90,-22 140,-14c60,8 120,8 170,-2c40,-8 70,-6 90,2v20H0z" fill="#5f8f5a"/>` +
    `<path d="M0,92c40,-18 90,-22 140,-14l-30,10c-40,-4 -78,-2 -110,10z" fill="#6fa868"/>` +
    `<g fill="#4f7f46" opacity=".8"><ellipse cx="250" cy="86" rx="26" ry="6"/><ellipse cx="330" cy="84" rx="22" ry="5"/></g>` +
    // ── 入り江(丸くおだやか)
    `<path d="M0,98q200,-14 400,0v74q-200,20 -400,0z" fill="#4f9fb4"/>` +
    `<g stroke="#bfe8f0" stroke-width="1.8" opacity=".6" fill="none"><path d="M40,112h48M150,106h44M280,110h50M90,130h44M220,134h52M330,128h40"/></g>` +
    // 対岸の小さな町(浜に沿う点々の家)
    villa(120, 96, 9) +
    villa(136, 98, 8, "#4a5568") +
    villa(150, 96, 9, "#3f6b4f") +
    villa(166, 98, 8) +
    `<rect x="182" y="90" width="4" height="10" fill="#f2ede0"/>` +
    `<path d="M180,90h8l-4,-7z" fill="#8a5568"/>` +
    // 湾内の帆とカヤック
    `<path d="M232,124c7,-3 21,-3 28,0c-4,4 -24,4 -28,0z" fill="#f6efe2"/>` +
    `<path d="M246,122V102l11,20z" fill="#f2ede0"/>` +
    `<path d="M300,138c6,-2 16,-2 22,0c-3,3 -19,3 -22,0z" fill="#e8443f"/>` +
    `<path d="M296,135l30,1" stroke="#8a6a3c" stroke-width="1.6" fill="none"/>` +
    `<path d="M64,140c6,-2 16,-2 22,0c-3,3 -19,3 -22,0z" fill="#f5b31c"/>` +
    // ── 中景: 手前へ回り込む縁の丘
    `<path d="M0,150c60,-8 130,-4 190,8c70,14 150,16 210,8V210H0z" fill="#5a9a4f"/>` +
    `<path d="M0,150c60,-8 130,-4 190,8l-36,4c-52,-10 -106,-12 -154,-4z" fill="#6fae5a"/>` +
    hedgeBand(196, 7, "#3f7f46") +
    fence(0, 400, 188, 9) +
    // ── 最前景: 縁に立つ人と羊・ハラケケ
    sheep(80, 196, 1.1) +
    sheep(130, 204, 1.2) +
    sheep(320, 198, 1.15) +
    shade(240, 202, 11, 3, ".16") +
    person(239, 202, 21, "#5b8fe8") +
    arm(239, 190, 11, -5) +
    flax(370, 208, 1.3) +
    tussock(30, 208, 1.1, "#7fae5a") +
    gullFly(180, 60, 0.9) +
    gullFly(220, 48, 0.8),

  /**
   * グレイマウス。川の河口の木材・石炭の積出港。クレーン・石炭の貨車・
   * 材木の山・防波堤に砕ける波。雨がちの西海岸の灰色の空。
   */
  coalport:
    sky("#a8b8c0", "#d0dade", 96) +
    `<g fill="#8fa0a8" opacity=".8"><ellipse cx="90" cy="36" rx="66" ry="10"/><ellipse cx="270" cy="28" rx="76" ry="11"/><ellipse cx="380" cy="44" rx="46" ry="8"/></g>` +
    // ── 遠景: 緑の丘(雨に濡れて濃い)
    `<path d="M0,96c50,-20 110,-24 170,-12l40,12z" fill="#3f6b4a"/>` +
    `<path d="M180,96c60,-16 130,-16 220,-4v4z" fill="#4f7f5a"/>` +
    `<g fill="#2d5f45" opacity=".8"><ellipse cx="60" cy="86" rx="22" ry="6"/><ellipse cx="290" cy="88" rx="26" ry="6"/></g>` +
    // ── 川(灰色がかった水)と防波堤
    band(96, 40, "#6b8a96") +
    `<g stroke="#a8c4cc" stroke-width="1.8" opacity=".6" fill="none"><path d="M30,106h44M150,102h50M300,110h48M90,122h44M240,126h52"/></g>` +
    // 防波堤(右)と砕ける波
    `<path d="M280,120h120v-6h-120z" fill="#5f5a52"/>` +
    `<g stroke="#4a4640" stroke-width="1" opacity=".7" fill="none"><path d="M292,114v6M316,114v6M340,114v6M364,114v6M388,114v6"/></g>` +
    `<g fill="#e8f2f6" opacity=".9"><circle cx="292" cy="110" r="3.4"/><circle cx="298" cy="106" r="2.4"/><circle cx="286" cy="105" r="2"/><circle cx="340" cy="109" r="3"/><circle cx="346" cy="105" r="2.2"/><circle cx="334" cy="104" r="1.8"/></g>` +
    `<g stroke="#e8f2f6" stroke-width="1.6" opacity=".7" fill="none"><path d="M292,104v-6M298,101v-5M340,103v-6M346,100v-4"/></g>` +
    // ── 中景: 埠頭。クレーン・石炭の貨車・材木の山
    ground(136, "#8a8578") +
    band(136, 5, "#9a948a") +
    // ガントリークレーン
    `<g stroke="#4a5568" stroke-width="3.4" fill="none"><path d="M60,136V88h64M124,136V88"/><path d="M60,100h64"/></g>` +
    `<path d="M88,100v14" stroke="#4a5568" stroke-width="2" fill="none"/>` +
    `<rect x="80" y="114" width="16" height="10" fill="#c9773c"/>` +
    // 石炭の貨車列
    `<g><rect x="150" y="118" width="30" height="14" rx="2" fill="#5a5248"/><path d="M152,118q13,-7 26,0z" fill="#2a2622"/><g fill="#2a2622"><circle cx="158" cy="133" r="3"/><circle cx="172" cy="133" r="3"/></g></g>` +
    `<g><rect x="184" y="118" width="30" height="14" rx="2" fill="#5a5248"/><path d="M186,118q13,-7 26,0z" fill="#2a2622"/><g fill="#2a2622"><circle cx="192" cy="133" r="3"/><circle cx="206" cy="133" r="3"/></g></g>` +
    `<g><rect x="218" y="118" width="30" height="14" rx="2" fill="#6b5844"/><path d="M220,118q13,-7 26,0z" fill="#2a2622"/><g fill="#2a2622"><circle cx="226" cy="133" r="3"/><circle cx="240" cy="133" r="3"/></g></g>` +
    // 材木の山(丸太の断面)
    `<g fill="#c9a86a"><circle cx="272" cy="130" r="6"/><circle cx="284" cy="130" r="6"/><circle cx="296" cy="130" r="6"/><circle cx="278" cy="121" r="6"/><circle cx="290" cy="121" r="6"/><circle cx="284" cy="112" r="6"/></g>` +
    `<g fill="#a8874c"><circle cx="272" cy="130" r="2.6"/><circle cx="284" cy="130" r="2.6"/><circle cx="296" cy="130" r="2.6"/><circle cx="278" cy="121" r="2.6"/><circle cx="290" cy="121" r="2.6"/><circle cx="284" cy="112" r="2.6"/></g>` +
    // タグボート
    `<path d="M330,146c8,4 28,4 36,0l-4,7h-28z" fill="#c2453c"/>` +
    `<rect x="338" y="136" width="14" height="10" fill="#f2ede0"/>` +
    `<rect x="344" y="128" width="4" height="8" fill="#3a4453"/>` +
    `<path d="M348,126q4,-4 3,-8" stroke="#8fa0a8" stroke-width="2.6" opacity=".8" fill="none"/>` +
    // ── 近景: 手前の岸壁
    ground(158, "#6f6a5e") +
    `<g stroke="#57534a" stroke-width="1.4" opacity=".7" fill="none"><path d="M0,164h400M0,176h400M40,158v52M120,158v52M200,158v52M280,158v52M360,158v52"/></g>` +
    // レール(貨車を引き込む)
    `<g stroke="#4a4436" stroke-width="2.4" fill="none"><path d="M0,188h400M0,196h400"/></g>` +
    `<g stroke="#5f5040" stroke-width="1.6" opacity=".8" fill="none"><path d="M12,186v12M44,186v12M76,186v12M108,186v12M140,186v12M172,186v12M204,186v12M236,186v12M268,186v12M300,186v12M332,186v12M364,186v12M396,186v12"/></g>` +
    // 石炭のこぼれと作業の人
    `<g fill="#2a2622"><ellipse cx="130" cy="204" rx="10" ry="3.4"/><circle cx="122" cy="201" r="2"/><circle cx="138" cy="202" r="2.2"/></g>` +
    shade(230, 204, 11, 3, ".2") +
    person(229, 204, 21, "#e8443f") +
    arm(229, 192, 11, 4) +
    `<path d="M240,196l8,-2" stroke="#8a6a3c" stroke-width="2" fill="none"/>` +
    shade(58, 206, 11, 3, ".2") +
    person(57, 206, 20, "#f5b31c") +
    arm(57, 195, -9, 5) +
    gullFly(200, 60, 1, "#5f6a72") +
    gullFly(240, 48, 0.8, "#5f6a72"),

  /**
   * フランツ・ジョセフ。谷にせり出す舌状の青白い氷河。クレバスの筋・
   * 末端から流れ出す灰色の川・切り立った緑の谷壁・モレーンを歩く二人。
   */
  glaciervalley:
    sky("#b0ccd8", "#dfe8ec", 186) +
    `<g fill="#e8ecee" opacity=".8"><ellipse cx="110" cy="34" rx="70" ry="12"/><ellipse cx="300" cy="26" rx="66" ry="11"/></g>` +
    // ── 遠景: 雪の源頭(氷河の上流)
    `<path d="M100,100L150,56l40,20l44,-28l46,32l30,-14l40,24l30,-10v20z" fill="#c9d8e0"/>` +
    `<path d="M150,56l40,20l-24,6zM234,48l46,32l-30,4z" fill="#f0f4f6"/>` +
    // ── 中景: 左右の切り立った緑の谷壁
    `<path d="M0,0h96l28,60l-16,52l20,98H0z" fill="#3f6b4a"/>` +
    `<path d="M60,0l36,60l-16,52l16,98H58L44,110l24,-50l-20,-60z" fill="#2d5f45"/>` +
    `<g stroke="#254f3a" stroke-width="2" opacity=".7" fill="none"><path d="M30,60v40M52,110v44M90,70v34M104,126v40"/></g>` +
    `<path d="M400,0h-92l-24,64l14,50l-18,96h120z" fill="#3f6b4a"/>` +
    `<path d="M340,0l-30,64l14,50l-14,96h36l-10,-92l18,-54l-14,-64z" fill="#2d5f45"/>` +
    `<g stroke="#254f3a" stroke-width="2" opacity=".7" fill="none"><path d="M352,66v42M368,118v40M300,80v36"/></g>` +
    // 壁の白い滝すじ
    `<path d="M74,84q3,22 -2,40" stroke="#e8f2f4" stroke-width="2.4" opacity=".7" fill="none"/>` +
    `<path d="M330,90q-3,24 2,44" stroke="#e8f2f4" stroke-width="2.4" opacity=".7" fill="none"/>` +
    // ── 氷河の舌(青白い氷。クレバスの筋)
    `<path d="M124,100q76,-16 152,0l14,30q-8,26 -4,46l-172,0q6,-22 -2,-46z" fill="#dfeef4"/>` +
    `<path d="M124,100q76,-16 152,0l4,9q-80,-12 -160,0z" fill="#f0f8fa"/>` +
    `<g stroke="#8fc4dc" stroke-width="2.6" opacity=".8" fill="none"><path d="M140,118q60,-8 122,0M132,136q68,-10 140,0M128,154q72,-10 148,0"/></g>` +
    `<g stroke="#6fa8c4" stroke-width="2" opacity=".7" fill="none"><path d="M160,108v14M200,104v16M240,106v14M180,128v16M220,126v16M260,130v14M170,148v14M210,146v16M250,150v14"/></g>` +
    // 末端の氷壁(青が濃い)
    `<path d="M114,176q86,-14 172,0l-6,10q-80,-10 -160,0z" fill="#9fd0e4"/>` +
    `<g stroke="#5f94b4" stroke-width="2.4" opacity=".8" fill="none"><path d="M140,178v8M180,174v10M220,174v10M260,177v9"/></g>` +
    // ── 最前景: 氷河から流れ出す灰色の川とモレーン
    ground(186, "#a8a89e") +
    `<path d="M150,186q50,8 100,0q40,-6 76,2l0,22H128q4,-14 22,-24z" fill="#8fa8b0"/>` +
    `<g stroke="#c4d4d8" stroke-width="1.6" opacity=".7" fill="none"><path d="M170,194h44M250,196h48M200,204h52"/></g>` +
    `<g fill="#7f7a6e"><ellipse cx="40" cy="198" rx="16" ry="6"/><ellipse cx="80" cy="206" rx="12" ry="5"/><ellipse cx="350" cy="200" rx="14" ry="5.5"/><ellipse cx="386" cy="206" rx="10" ry="4.4"/></g>` +
    `<g fill="#8a8578"><ellipse cx="60" cy="192" rx="7" ry="3.4"/><ellipse cx="368" cy="192" rx="7" ry="3"/></g>` +
    // モレーンを歩く二人(ロープで繋がる)
    shade(96, 200, 10, 3, ".18") +
    person(95, 200, 19, "#e8443f") +
    arm(95, 189, 8, 5) +
    shade(122, 194, 10, 3, ".18") +
    person(121, 194, 18, "#5b8fe8") +
    arm(121, 184, -7, 4) +
    `<path d="M103,194q8,-2 12,-2" stroke="#8a6a3c" stroke-width="1.4" fill="none"/>` +
    // ケア(氷河の上を滑空)
    `<path d="M296,60c8,-4 14,-5 17,-1c3,-4 9,-3 17,1c-8,-1 -14,1 -17,3c-3,-2 -9,-4 -17,-3z" fill="#4f6b3f"/>`,

  /**
   * クイーンズタウン・ワナカ。尖った山々に囲まれたターコイズの湖。
   * 白い蒸気船・湖畔の町・桟橋・金色のポプラ。
   */
  lakebasin:
    sky("#8fc4e8", "#d8ecf6", 96) +
    sun(56, 26, 12) +
    longCloud(230, 30, 44) +
    // ── 遠景: ギザギザの山脈(リマーカブルズ風)
    `<path d="M0,96L30,64l22,18l26,-34l30,26l24,-16l34,30l30,-40l36,34l26,-18l34,26l24,-12l40,22l24,-10l20,10v10z" fill="#6b7a94"/>` +
    `<path d="M78,48l11,14l-5.5,-2l-5.5,5l-5.5,-5l-5.5,2zM196,48l12,15l-6,-2l-6,5.5l-6,-5.5l-6,2zM30,64l8,10l-4,-1.5l-4,4l-4,-4l-4,1.5zM268,60l9,11l-4.5,-1.5l-4.5,4.5l-4.5,-4.5l-4.5,1.5z" fill="#f0f4f6"/>` +
    `<g fill="#5a6a84" opacity=".7"><path d="M108,74L138,58l-12,22zM290,78l24,-14l-8,20z"/></g>` +
    // ── ターコイズの湖
    band(96, 62, "#4fb4c9") +
    `<g stroke="#bfe8f0" stroke-width="2" opacity=".6" fill="none"><path d="M20,108h50M140,104h44M290,106h52M70,126h48M210,130h56M330,140h46"/></g>` +
    // 山の映り込み
    `<g fill="#5a6a84" opacity=".2"><path d="M40,96l20,20l18,-20zM200,96l22,24l20,-24zM320,96l18,18l16,-18z"/></g>` +
    // 蒸気船(白い船体・赤い煙突)
    `<path d="M64,132c10,4 44,4 54,0l-6,9H70z" fill="#f2ede0"/>` +
    `<rect x="74" y="120" width="34" height="12" rx="1.5" fill="#f6efe2"/>` +
    `<g fill="#4a5568"><rect x="78" y="123" width="5" height="4"/><rect x="87" y="123" width="5" height="4"/><rect x="96" y="123" width="5" height="4"/></g>` +
    `<rect x="98" y="110" width="6" height="12" fill="#c2453c"/>` +
    `<rect x="98" y="108" width="6" height="3" fill="#2a2622"/>` +
    `<path d="M104,104q8,-6 16,-4" stroke="#e8ecee" stroke-width="3.4" opacity=".8" fill="none"/>` +
    `<path d="M58,138q-10,2 -18,0" stroke="#bfe8f0" stroke-width="2" opacity=".7" fill="none"/>` +
    // ヨット
    `<path d="M300,124c7,-3 21,-3 28,0c-4,4 -24,4 -28,0z" fill="#f6efe2"/>` +
    `<path d="M314,122V102l12,20z" fill="#f2ede0"/>` +
    `<path d="M312,122V106l-9,16z" fill="#e8443f"/>` +
    // ── 中景: 湖畔の町(右)と桟橋
    `<path d="M258,158c40,-10 100,-10 142,-2V210H258z" fill="#5a9a4f"/>` +
    villa(280, 138, 12) +
    villa(300, 134, 11, "#4a5568") +
    villa(318, 138, 12, "#3f6b4f") +
    villa(338, 133, 11) +
    villa(358, 138, 12, "#4a5568") +
    villa(378, 135, 10) +
    poplar(272, 156, 30, "#f5b31c") +
    poplar(332, 154, 34, "#e0a83c") +
    poplar(390, 156, 30, "#f5b31c") +
    // 桟橋
    `<rect x="150" y="140" width="64" height="7" fill="#a8763c"/>` +
    `<g fill="#6b5330"><rect x="154" y="147" width="3.4" height="12"/><rect x="178" y="147" width="3.4" height="12"/><rect x="204" y="147" width="3.4" height="12"/></g>` +
    person(196, 140, 15, "#e8443f") +
    // ── 最前景: 石の浜
    ground(158, "#c9b088") +
    `<path d="M0,158q80,10 160,4l-30,48H0z" fill="#b8a070"/>` +
    `<g fill="#a8905c"><ellipse cx="40" cy="180" rx="7" ry="3.4"/><ellipse cx="90" cy="192" rx="8" ry="3.6"/><ellipse cx="140" cy="182" rx="6" ry="3"/><ellipse cx="60" cy="202" rx="7" ry="3"/><ellipse cx="120" cy="204" rx="8" ry="3.4"/></g>` +
    `<g fill="#8a7448"><ellipse cx="70" cy="188" rx="4.4" ry="2"/><ellipse cx="110" cy="196" rx="5" ry="2.2"/></g>` +
    // 浜で石投げをする人と犬
    shade(220, 196, 11, 3, ".16") +
    person(219, 196, 21, "#4f6b52") +
    arm(219, 184, 12, -6) +
    `<circle cx="238" cy="172" r="2" fill="#8a8578"/>` +
    `<g fill="#6b5330"><ellipse cx="256" cy="196" rx="7" ry="4"/><circle cx="263" cy="192" r="2.6"/><rect x="251" y="198" width="2" height="5"/><rect x="259" y="198" width="2" height="5"/></g>` +
    tussock(20, 206, 1.2) +
    flax(376, 208, 1.2) +
    gullFly(160, 56, 0.9) +
    gullFly(196, 44, 0.8),

  /**
   * ダニーデン。世界でも指折りの急な通り。石造りの建物が坂に段々に並び、
   * 上るほど息が切れる。
   */
  steephistoric:
    sky("#9cc4dc", "#dce8f0", 108) +
    clouds(80, 32, 0.9) +
    longCloud(300, 26, 40, ".7") +
    // ── 遠景: 港と対岸の丘(坂の上から見える)
    band(108, 16, "#4f8fb4") +
    `<path d="M0,108c50,-12 110,-14 170,-6l30,6z" fill="#5f8f5a"/>` +
    `<g stroke="#bfe0f0" stroke-width="1.6" opacity=".6" fill="none"><path d="M240,112h44M320,116h48"/></g>` +
    // ── 急坂の面(右上がりの台形)
    `<path d="M0,124h400v86H0z" fill="#6fa868"/>` +
    // 坂道(左下から右上へ)
    `<path d="M0,206L400,118v22L0,210z" fill="#8a8578"/>` +
    `<path d="M0,206L400,118" stroke="#6f6b62" stroke-width="2" fill="none"/>` +
    `<g stroke="#f6efe2" stroke-width="2.4" stroke-dasharray="12 12" opacity=".7" fill="none"><path d="M0,208L400,129"/></g>` +
    // ── 坂に沿って段々に建つ石造りの家(奥から手前へ)
    // 奥(上)の家
    `<rect x="330" y="96" width="42" height="34" fill="#b8ab90"/>` +
    `<path d="M326,96h50l-10,-14h-30z" fill="#4a5568"/>` +
    `<g fill="#5f7f96"><rect x="336" y="104" width="9" height="12"/><rect x="356" y="104" width="9" height="12"/></g>` +
    `<g stroke="#9a8c70" stroke-width="1.2" opacity=".8" fill="none"><path d="M330,112h42M330,122h42"/></g>` +
    // 中の家(白い出窓のヴィラ)
    `<rect x="226" y="122" width="52" height="40" fill="#f2ede0"/>` +
    `<path d="M222,122h60l-12,-16h-36z" fill="#c2453c"/>` +
    `<g fill="#4a5568"><rect x="234" y="132" width="11" height="14"/><rect x="258" y="132" width="11" height="14"/></g>` +
    `<rect x="246" y="146" width="11" height="16" fill="#5a4630"/>` +
    `<g stroke="#d8d0c0" stroke-width="1.4" fill="none"><path d="M226,150h52"/></g>` +
    // 手前の家(石造り2階建て)
    `<rect x="96" y="142" width="66" height="54" fill="#b8ab90"/>` +
    `<path d="M92,142h74l-14,-20h-46z" fill="#4a5568"/>` +
    `<rect x="90" y="140" width="78" height="4" fill="#9a8c70"/>` +
    `<g fill="#5f7f96"><rect x="104" y="152" width="12" height="16"/><rect x="130" y="152" width="12" height="16"/><rect x="104" y="176" width="12" height="16"/></g>` +
    `<rect x="130" y="176" width="14" height="20" fill="#5a4630"/>` +
    `<g stroke="#9a8c70" stroke-width="1.4" opacity=".8" fill="none"><path d="M96,160h66M96,172h66M96,184h66"/></g>` +
    `<rect x="148" y="126" width="8" height="16" fill="#8a4438"/>` +
    // 石垣と生垣(坂に沿う)
    `<path d="M0,196L226,148l0,8L0,204z" fill="#9a8c70"/>` +
    `<g stroke="#7f7462" stroke-width="1" opacity=".7" fill="none"><path d="M20,198l0,-6M60,190l0,-6M100,181l0,-6M140,173l0,-6M180,164l0,-6M210,158l0,-6"/></g>` +
    `<path d="M280,140L400,114l0,10L280,148z" fill="#3f7f46"/>` +
    // ── 最前景: 坂を上る人・見上げる人・郵便受け
    shade(64, 200, 11, 3, ".18") +
    `<g transform="rotate(-8 64 198)">${person(64, 198, 21, "#e8443f")}</g>` +
    arm(62, 186, -9, 7) +
    shade(190, 173, 10, 3, ".18") +
    `<g transform="rotate(-8 190 172)">${person(190, 172, 19, "#5b8fe8")}</g>` +
    arm(189, 162, 8, -6) +
    `<g><rect x="24" y="186" width="3" height="14" fill="#6b5330"/><rect x="19" y="179" width="13" height="8" rx="2" fill="#c2453c"/></g>` +
    gullFly(150, 60, 0.9) +
    gullFly(190, 48, 0.75),

  /**
   * オアマル。白い石灰岩の倉庫が並ぶ平坦な港の通り。円柱と三角破風、
   * ペニーファージング自転車、通りの端にブルーペンギンの巣箱。
   */
  whitestoneport:
    sky("#9cc8e0", "#e0ecf2", 152) +
    sun(342, 28, 12) +
    clouds(100, 34, 0.9) +
    // ── 倉庫の列(白い石灰岩。三角破風と円柱)
    // 1棟目: 破風と4本柱
    `<rect x="10" y="86" width="88" height="66" fill="#eae4d4"/>` +
    `<path d="M4,86h100l-50,-22z" fill="#dfd8c8"/>` +
    `<path d="M12,82h84l-42,-18z" fill="#eae4d4"/>` +
    `<g fill="#dfd8c8"><rect x="18" y="94" width="9" height="58"/><rect x="38" y="94" width="9" height="58"/><rect x="60" y="94" width="9" height="58"/><rect x="80" y="94" width="9" height="58"/></g>` +
    `<g fill="#c9c0ac"><rect x="16" y="90" width="13" height="4"/><rect x="36" y="90" width="13" height="4"/><rect x="58" y="90" width="13" height="4"/><rect x="78" y="90" width="13" height="4"/></g>` +
    `<rect x="46" y="120" width="16" height="32" fill="#5f5040"/>` +
    // 2棟目: アーチ窓の倉庫
    `<rect x="108" y="94" width="86" height="58" fill="#e4ddc8"/>` +
    `<rect x="104" y="88" width="94" height="8" fill="#cfc7b4"/>` +
    `<g fill="#8a8578"><path d="M118,152v-26a8,8 0 0 1 16,0v26zM146,152v-26a8,8 0 0 1 16,0v26zM174,152v-26a7,7 0 0 1 14,0v26z"/></g>` +
    `<g fill="#5f7f96"><path d="M121,152v-24a5,5 0 0 1 10,0v24zM149,152v-24a5,5 0 0 1 10,0v24z"/></g>` +
    `<g stroke="#c9c0ac" stroke-width="1.4" opacity=".8" fill="none"><path d="M108,104h86M108,116h86"/></g>` +
    // 3棟目: 時計のある破風
    `<rect x="204" y="84" width="84" height="68" fill="#eae4d4"/>` +
    `<path d="M198,84h96l-8,-12h-80z" fill="#dfd8c8"/>` +
    `<circle cx="246" cy="98" r="8" fill="#f6efe2" stroke="#8a8578" stroke-width="1.6"/>` +
    `<path d="M246,98V93M246,98l4,2" stroke="#4a4436" stroke-width="1.4" fill="none"/>` +
    `<g fill="#5f7f96"><rect x="214" y="114" width="12" height="16"/><rect x="240" y="114" width="12" height="16"/><rect x="266" y="114" width="12" height="16"/></g>` +
    `<rect x="238" y="134" width="16" height="18" fill="#5f5040"/>` +
    `<g stroke="#c9c0ac" stroke-width="1.4" opacity=".8" fill="none"><path d="M204,110h84M204,134h84"/></g>` +
    // 4棟目: 小さめの倉庫と樽
    `<rect x="298" y="98" width="96" height="54" fill="#e4ddc8"/>` +
    `<path d="M294,98h104l-10,-12h-84z" fill="#cfc7b4"/>` +
    `<g fill="#8a8578"><rect x="308" y="110" width="11" height="14"/><rect x="332" y="110" width="11" height="14"/><rect x="360" y="110" width="11" height="14"/></g>` +
    `<rect x="330" y="130" width="18" height="22" fill="#5f5040"/>` +
    `<g fill="#8a5a2c"><path d="M306,138q5,-4 10,0v14h-10z"/><path d="M318,140q5,-4 10,0v12h-10z"/></g>` +
    `<g stroke="#6b4423" stroke-width="1" opacity=".8" fill="none"><path d="M306,144h10M318,146h10"/></g>` +
    // ── 通り(平坦。石畳)
    band(152, 58, "#b0a894") +
    `<g stroke="#9a9280" stroke-width="1.6" opacity=".7" fill="none"><path d="M0,166h400M0,182h400M0,198h400"/></g>` +
    `<g stroke="#9a9280" stroke-width="1.6" opacity=".5" fill="none"><path d="M50,158v52M130,158v52M210,158v52M290,158v52M370,158v52"/></g>` +
    // ガス灯
    `<g><rect x="152" y="120" width="2.6" height="40" fill="#3a4453"/><path d="M149,120h9l-1.6,-8h-5.8z" fill="#3a4453"/><rect x="151" y="113" width="5" height="6" fill="#f5d06a"/></g>` +
    `<g><rect x="382" y="124" width="2.6" height="36" fill="#3a4453"/><path d="M379,124h9l-1.6,-8h-5.8z" fill="#3a4453"/><rect x="381" y="117" width="5" height="6" fill="#f5d06a"/></g>` +
    // ── 最前景: ペニーファージングに乗る人
    shade(96, 202, 26, 4, ".18") +
    `<g><circle cx="86" cy="188" r="16" fill="none" stroke="#3a3630" stroke-width="2.6"/><circle cx="86" cy="188" r="2.6" fill="#3a3630"/><g stroke="#3a3630" stroke-width="1" opacity=".8" fill="none"><path d="M86,172v32M70,188h32M75,177l22,22M97,177l-22,22"/></g><circle cx="116" cy="198" r="7" fill="none" stroke="#3a3630" stroke-width="2.2"/><path d="M86,188l24,0l6,10" stroke="#3a3630" stroke-width="2" fill="none"/><path d="M84,172q-4,-2 -6,2" stroke="#3a3630" stroke-width="2" fill="none"/></g>` +
    person(88, 172, 17, "#4a6b80") +
    // 通りを歩く人
    shade(268, 204, 11, 3, ".16") +
    person(267, 204, 21, "#c26a8a") +
    arm(267, 192, 10, 4) +
    // ブルーペンギンの巣箱と、覗くペンギン
    `<g><rect x="342" y="188" width="22" height="14" fill="#8a6a3c"/><path d="M339,188h28l-14,-9z" fill="#6b5330"/><circle cx="353" cy="195" r="4" fill="#3a3630"/></g>` +
    `<g><ellipse cx="326" cy="200" rx="4.4" ry="5.5" fill="#3f5a80"/><ellipse cx="326" cy="201.6" rx="2.8" ry="3.6" fill="#f6efe2"/><circle cx="326" cy="193" r="2.8" fill="#3f5a80"/><path d="M328.4,192.6l2.6,.8l-2.6,.8z" fill="#8a8578"/></g>` +
    gullFly(240, 56, 0.9) +
    gullFly(280, 44, 0.75),
};

// ---------------------------------------------------------------------------
// シンボル(24×24)— 41種。盤面上では直径19px程度になるため、
// 輪郭優先・主役1つ。マオリの意匠はコル(渦巻)の抽象にとどめる。
// ---------------------------------------------------------------------------

export const NEWZEALAND_MARKS = {
  /** 針のように尖った展望タワー(オークランド)。 */
  landmarktower:
    '<rect x="0" y="22.4" width="24" height="1.6" fill="#4a4436"/>' +
    '<path d="M10,22.4L10.8,13h2.4l0.8,9.4z" fill="#8a94a8"/>' +
    '<path d="M8.2,13l1,-2.6h5.6l1,2.6z" fill="#5f6a7c"/>' +
    '<ellipse cx="12" cy="10.4" rx="4.6" ry="2.2" fill="#8a94a8"/>' +
    '<ellipse cx="12" cy="9" rx="3.4" ry="1.6" fill="#aeb8c4"/>' +
    '<path d="M11.4,7.6L11.7,1h0.6l0.3,6.6z" fill="#5f6a7c"/>' +
    '<circle cx="12" cy="1" r="0.9" fill="#e8443f"/>',

  /** ワレヌイの妻飾り(ワイタンギ)。渦巻は一般的なコルの抽象。 */
  wharenui:
    '<rect x="0" y="22.4" width="24" height="1.6" fill="#4a4436"/>' +
    '<path d="M2.6,22.4V11h18.8v11.4z" fill="#8a4438"/>' +
    '<path d="M1,12.2L12,3.4L23,12.2l-1.6,1.8L12,6.6L2.6,14z" fill="#a8523c"/>' +
    '<rect x="11.2" y="1.6" width="1.6" height="8" fill="#a8523c"/>' +
    '<circle cx="12" cy="1.8" r="1.4" fill="#c9885c"/>' +
    '<g stroke="#5f2f28" stroke-width="1.3" fill="none"><path d="M5.4,15a2.6,2.6 0 1 1 1.8,4.4M16.6,15a2.6,2.6 0 1 0 -1.8,4.4M9.4,12.4a2,2 0 1 1 1.4,3.4M14.6,12.4a2,2 0 1 0 -1.4,3.4"/></g>' +
    '<rect x="10.4" y="16.4" width="3.2" height="6" fill="#5f2f28"/>',

  /** 切妻屋根の石造倉庫(ケリケリ)。 */
  heritage:
    '<rect x="0" y="22.4" width="24" height="1.6" fill="#4a4436"/>' +
    '<path d="M3,22.4V9.6h18v12.8z" fill="#b8ab90"/>' +
    '<path d="M1.6,10.4L12,2.6L22.4,10.4l-1.2,1.6L12,5.4L2.8,12z" fill="#5f5a52"/>' +
    '<g stroke="#9a8c70" stroke-width="1" opacity=".9" fill="none"><path d="M3,14h18M3,18h18M9,9.6v12.8M15,9.6v12.8"/></g>' +
    '<rect x="10.6" y="16.6" width="2.8" height="5.8" fill="#5f5040"/>' +
    '<g fill="#5f5040"><rect x="5.4" y="11.6" width="2.4" height="2.8"/><rect x="16.2" y="11.6" width="2.4" height="2.8"/></g>',

  /** 川が大きく曲がる橋のたもと(ハミルトン)。 */
  rivercity:
    '<rect x="0" y="0" width="24" height="24" fill="#5a9a4f"/>' +
    '<path d="M0,4q10,2 12,7t12,7v4q-12,-2 -14,-7T0,8z" fill="#4f8fb4"/>' +
    '<g stroke="#bfe0f0" stroke-width="0.9" opacity=".8" fill="none"><path d="M2,7q6,1.5 8,4M12,14q6,3 10,3.6"/></g>' +
    '<rect x="4" y="10.6" width="14" height="2" fill="#8a8578"/>' +
    '<g fill="#6f6b62"><rect x="6" y="12.6" width="1.6" height="4"/><rect x="14" y="12.6" width="1.6" height="5.6"/></g>' +
    '<rect x="4" y="9.8" width="14" height="1" fill="#a8a296"/>',

  /** 丸いホビットの扉(マタマタ)。 */
  hobbitdoor:
    '<rect x="0" y="21" width="24" height="3" fill="#3f7f46"/>' +
    '<path d="M0,21q3,-14 12,-14t12,14z" fill="#5a9a4f"/>' +
    '<circle cx="12" cy="15.4" r="6.8" fill="#8a6a3c"/>' +
    '<circle cx="12" cy="15.4" r="5.6" fill="#4f8f3f"/>' +
    '<g stroke="#3a6b30" stroke-width="1" fill="none"><path d="M12,9.8v11.2M6.8,13l10.4,4.8M6.8,17.8l10.4,-4.8"/></g>' +
    '<circle cx="12" cy="15.4" r="1.2" fill="#f5b31c"/>' +
    '<g fill="#e8443f"><circle cx="4" cy="19.4" r="0.9"/><circle cx="20.4" cy="19" r="0.9"/></g>',

  /** キウイフルーツの断面(タウランガ)。 */
  kiwifruit:
    '<circle cx="12" cy="12" r="10.4" fill="#8a6a3c"/>' +
    '<circle cx="12" cy="12" r="9" fill="#7fae3f"/>' +
    '<circle cx="12" cy="12" r="3.6" fill="#e8e8c8"/>' +
    '<g fill="#2a2622"><circle cx="12" cy="6.6" r="0.75"/><circle cx="15.9" cy="8.1" r="0.75"/><circle cx="17.4" cy="12" r="0.75"/><circle cx="15.9" cy="15.9" r="0.75"/><circle cx="12" cy="17.4" r="0.75"/><circle cx="8.1" cy="15.9" r="0.75"/><circle cx="6.6" cy="12" r="0.75"/><circle cx="8.1" cy="8.1" r="0.75"/></g>',

  /** 航海カヌー(ワカ)の舳先(ファカタネ・ギズボーン)。 */
  waka:
    '<rect x="0" y="20.4" width="24" height="3.6" fill="#3f7fa8"/>' +
    '<path d="M1,17.6q10,3.4 18,0l3,-2l-2,5.4q-9,2.6 -18,0z" fill="#5a3c28"/>' +
    '<path d="M19,16.4L21.4,4q1.6,4 0.8,8z" fill="#5a3c28"/>' +
    '<g stroke="#c9885c" stroke-width="1.2" fill="none"><path d="M19.6,7a2,2 0 1 1 1.4,3.4M18.6,12a1.6,1.6 0 1 1 1.2,2.8"/></g>' +
    '<g stroke="#c9885c" stroke-width="1" opacity=".9" fill="none"><path d="M3.4,18.6q8,2.4 14,0.4"/></g>' +
    '<g stroke="#bfe0f0" stroke-width="1" opacity=".8" fill="none"><path d="M2,22h6M14,22.4h6"/></g>',

  /** 噴き上がる間欠泉(ロトルア)。 */
  geyser:
    '<rect x="0" y="21" width="24" height="3" fill="#d8cfc0"/>' +
    '<ellipse cx="12" cy="21" rx="7" ry="1.8" fill="#9fd8d0"/>' +
    '<path d="M10.4,20L11,7h2l0.6,13z" fill="#bfe8f0"/>' +
    '<path d="M11.5,7L12,2.4l0.5,4.6z" fill="#e8f6f8"/>' +
    '<g fill="#f6f4ee"><circle cx="7.6" cy="6.4" r="2.8"/><circle cx="16.4" cy="6.4" r="2.8"/><circle cx="12" cy="3.4" r="3"/><circle cx="5" cy="10" r="2.2"/><circle cx="19" cy="10" r="2.2"/></g>' +
    '<g stroke="#bfe8f0" stroke-width="1" opacity=".9" fill="none"><path d="M6,17q3,1.6 6,0M12,18.4q3,1.2 5.6,-0.4"/></g>',

  /** 跳ねるマス(タウポ)。 */
  troutleap:
    '<rect x="0" y="20.4" width="24" height="3.6" fill="#4f8fb4"/>' +
    '<g fill="#e8f2f6"><circle cx="5.6" cy="19.6" r="1.4"/><circle cx="9.4" cy="18.6" r="1"/><circle cx="18.6" cy="19.4" r="1.2"/></g>' +
    '<path d="M3.4,15q2.6,-8 9,-9.6q6.4,-1.6 9,2.4q-3.4,0.4 -5,2.4l-1.6,-1l0.2,2.6q-4.6,3 -8.4,4.6q-1.8,0.6 -3.2,-1.4z" fill="#7f9a6b"/>' +
    '<path d="M21.4,7.8l2,-3l-0.6,4.4l-2.8,0.6z" fill="#7f9a6b"/>' +
    '<path d="M4.6,14q3,-6 8.6,-8" stroke="#e8a08a" stroke-width="1.6" fill="none"/>' +
    '<g fill="#3a4436"><circle cx="7.4" cy="12.4" r="0.7"/><circle cx="10.4" cy="9.6" r="0.7"/><circle cx="14.4" cy="7.6" r="0.7"/></g>' +
    '<circle cx="17.8" cy="7" r="0.8" fill="#2a2622"/>',

  /** 円を描いて折り返す線路(ラウリム)。 */
  spiral:
    '<rect x="0" y="0" width="24" height="24" fill="#5a9a4f"/>' +
    '<circle cx="12" cy="11" r="7" fill="none" stroke="#5a5248" stroke-width="2.6"/>' +
    '<g stroke="#d8d0c0" stroke-width="0.9" opacity=".9" fill="none"><path d="M12,2.8v2.4M12,16.8v2.4M4.8,10h2.4M16.8,10h2.4M6.9,5.9l1.7,1.7M15.4,14.4l1.7,1.7M17.1,5.9l-1.7,1.7M8.6,14.4l-1.7,1.7"/></g>' +
    '<path d="M2,22.6q5,-2.6 8,-6" stroke="#5a5248" stroke-width="2.6" fill="none"/>' +
    '<path d="M14,17.4q4,3 8,4" stroke="#5a5248" stroke-width="2.6" fill="none"/>' +
    '<rect x="9" y="15.2" width="6" height="3.4" rx="0.8" fill="#4a4436"/>',

  /** 雪を頂いた火山円錐(ナショナルパーク)。 */
  volcano:
    '<rect x="0" y="21" width="24" height="3" fill="#c9b877"/>' +
    '<path d="M1,21L12,2.6L23,21z" fill="#6f7a8c"/>' +
    '<path d="M12,2.6L17,11l-2.6,-1l-2.4,2.2L9.6,10L7,11z" fill="#f0f4f6"/>' +
    '<path d="M12,2.6q1.6,-1.6 3,-2q-0.4,1.6 -1.8,2.6z" fill="#dfe8ea"/>' +
    '<path d="M14,13l3.4,8h-2.6l-3,-6.6z" fill="#5a6478" opacity=".8"/>',

  /** アールデコの段模様(ネイピア)。 */
  chevron:
    '<rect x="1.6" y="1.6" width="20.8" height="20.8" rx="1.5" fill="#f2e0b4"/>' +
    '<path d="M12,4.4l7.6,7.6h-4l-3.6,-3.6l-3.6,3.6h-4z" fill="#4a9a9a"/>' +
    '<path d="M12,9.6l6,6h-3.4l-2.6,-2.6l-2.6,2.6H6z" fill="#c26a8a"/>' +
    '<g stroke="#e0a83c" stroke-width="1.4" fill="none"><path d="M4,18.6h16M4,21h16"/></g>' +
    '<g fill="#4a9a9a"><rect x="3.4" y="3.4" width="2.4" height="12"/><rect x="18.2" y="3.4" width="2.4" height="12"/></g>',

  /** 蛇行する川と彫刻の標(ワンガヌイ)。渦巻は一般的なコルの抽象。 */
  riverbend:
    '<rect x="0" y="0" width="24" height="24" fill="#5a9a4f"/>' +
    '<path d="M0,2q9,1 10,6t-4,7q-4,2 -2,5t7,4H0z" fill="#4f8fb4" transform="rotate(180 12 12)"/>' +
    '<path d="M24,22q-9,-1 -10,-6t4,-7q4,-2 2,-5t-7,-4h11z" fill="#4f8fb4"/>' +
    '<g stroke="#bfe0f0" stroke-width="0.9" opacity=".8" fill="none"><path d="M18,4q2.4,1.4 2.6,3M16,14q-1.6,2.4 -0.6,4.6"/></g>' +
    '<rect x="4.6" y="8" width="3" height="12" fill="#8a4438"/>' +
    '<path d="M3.6,8h5l-2.5,-2.6z" fill="#8a4438"/>' +
    '<g stroke="#c9885c" stroke-width="1.1" fill="none"><path d="M5.4,10a1.8,1.8 0 1 1 1.3,3M5.4,15a1.8,1.8 0 1 1 1.3,3"/></g>',

  /** 羊毛刈りのハサミ(マスタートン)。 */
  shears:
    '<rect x="0" y="20.4" width="24" height="3.6" fill="#8a6a3c"/>' +
    '<g fill="#f6efe2"><circle cx="5.4" cy="18" r="3.4"/><circle cx="9.4" cy="16.6" r="3"/><circle cx="3.4" cy="15.4" r="2.6"/><circle cx="7.4" cy="14" r="2.4"/></g>' +
    '<path d="M9.4,13.4L20,2.6q1.6,-0.8 1.2,1L14,13.6q-2.4,1.6 -4.6,-0.2z" fill="#aeb8c4"/>' +
    '<path d="M11,15.6L22.6,6.4q1.6,-0.6 1,1.2L15.4,16.6q-2.6,1.2 -4.4,-1z" fill="#8a94a8"/>' +
    '<path d="M10,14.6q-2.6,2 -4.4,4.4q2.6,-0.6 5.4,-3z" fill="#5f6a72"/>',

  /** ケーブルに吊られたゴンドラ(ウェリントン・クイーンズタウン)。 */
  cablecar:
    '<path d="M0,20L24,9" stroke="#5a6a7a" stroke-width="1.2" fill="none"/>' +
    '<path d="M0,24L24,15.4v8.6z" fill="#4f7f46"/>' +
    '<path d="M11,14.6l1.4,-1.4" stroke="#5a6a7a" stroke-width="1.4" fill="none"/>' +
    '<rect x="6.6" y="14" width="10" height="8" rx="1.6" fill="#e8443f"/>' +
    '<rect x="8.2" y="16" width="6.8" height="3.4" fill="#cfe4f0"/>' +
    '<path d="M12.4,13.4a1.6,1.6 0 1 1 0.1,-0.1z" fill="none" stroke="#5a6a7a" stroke-width="1.2"/>',

  /** 貨車が船に乗り込む(ピクトン)。 */
  railwagon:
    '<rect x="0" y="20.4" width="24" height="3.6" fill="#3f7fa8"/>' +
    '<path d="M13,21.4V8.4l10,3.4v9.6z" fill="#f2ede0"/>' +
    '<path d="M13,13.6l10,2.4v1.6l-10,-2.2z" fill="#3a4453"/>' +
    '<g fill="#4a5568"><circle cx="15.6" cy="10.8" r="0.9"/><circle cx="18.6" cy="11.8" r="0.9"/><circle cx="21.2" cy="12.6" r="0.9"/></g>' +
    '<path d="M0,18.6l13,-3.4" stroke="#5a5248" stroke-width="2" fill="none"/>' +
    '<g><rect x="2.6" y="10.4" width="9" height="5.4" rx="0.8" fill="#8a4438" transform="rotate(-14 7 13)"/><g fill="#2a2622"><circle cx="4.6" cy="16.6" r="1.5"/><circle cx="9.6" cy="15.4" r="1.5"/></g></g>',

  /** ブドウの葉と房(ブレナム)。白ワイン用の緑がかった房。 */
  vine:
    '<path d="M12.6,7.4c3.2,-4.4 7,-5 9.6,-2.4c-2,4.4 -6,5.6 -9.6,2.4z" fill="#4f8f3f"/>' +
    '<path d="M11.6,9.2V5.8c0,-1.6 0.8,-2.6 2.4,-3.2" stroke="#6b5330" stroke-width="1.4" fill="none"/>' +
    '<g fill="#b8c95f"><circle cx="5.4" cy="11" r="2.6"/><circle cx="10.2" cy="11" r="2.6"/><circle cx="15" cy="11" r="2.6"/><circle cx="7.8" cy="15.2" r="2.6"/><circle cx="12.6" cy="15.2" r="2.6"/><circle cx="17.2" cy="14.6" r="2.4"/><circle cx="10.2" cy="19.2" r="2.5"/><circle cx="15" cy="19" r="2.4"/><circle cx="12.6" cy="22.4" r="1.6"/></g>' +
    '<g fill="#d8e08a"><circle cx="4.6" cy="10" r="0.9"/><circle cx="9.4" cy="10" r="0.9"/><circle cx="7" cy="14.2" r="0.9"/><circle cx="9.6" cy="18.2" r="0.9"/></g>',

  /** 日時計(ネルソン)。国の中心を名乗る町の、光を集める記号。 */
  sunclock:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#8a8578"/>' +
    '<path d="M9.4,21.4l0.8,-4h3.6l0.8,4z" fill="#b0a894"/>' +
    '<ellipse cx="12" cy="15.6" rx="9" ry="3.6" fill="#dfd8c8"/>' +
    '<ellipse cx="12" cy="15" rx="9" ry="3.6" fill="#f2ede0"/>' +
    '<g stroke="#8a8578" stroke-width="0.9" fill="none"><path d="M12,15L5,13.4M12,15L12,11.6M12,15l7,-1.6M12,15l-4.6,1.8M12,15l4.6,1.8"/></g>' +
    '<path d="M12,15L12,7l4,5.4z" fill="#4a5568"/>' +
    '<g stroke="#f5b31c" stroke-width="1.3" stroke-linecap="round" fill="none"><path d="M3.4,4.6l2.2,2.2M12,1.6v3M20.6,4.6l-2.2,2.2"/></g>' +
    '<circle cx="12" cy="15" r="1" fill="#8a8578"/>',

  /** 段差になって迫り上がった岩棚(カイコウラ)。 */
  uplift:
    '<rect x="0" y="20.4" width="24" height="3.6" fill="#3f7fa8"/>' +
    '<path d="M0,20.6V10l10,-1v11.6z" fill="#6f6a5e"/>' +
    '<path d="M10,20.6V4.6L24,3v17.6z" fill="#7f7a6e"/>' +
    '<path d="M0,10l10,-1M10,4.6L24,3" stroke="#e8e4da" stroke-width="1.8" fill="none"/>' +
    '<g stroke="#57534a" stroke-width="1" opacity=".9" fill="none"><path d="M0,14.6l10,-1M0,18l10,-0.8M10,9.6l14,-1.4M10,14.6l14,-1.2M10,18.6l14,-1"/></g>' +
    '<path d="M10,4.6v16" stroke="#4a4640" stroke-width="1.2" fill="none"/>' +
    '<g fill="#e8f2f6"><circle cx="3.4" cy="20" r="1.2"/><circle cx="20" cy="19.6" r="1.2"/></g>',

  /** 磨かれた緑の石、ポウナムの雫形(ホキティカ)。 */
  pounamu:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#b8ab90"/>' +
    '<path d="M12,1.6q7.4,7.4 7.4,13.4a7.4,7.4 0 0 1 -14.8,0q0,-6 7.4,-13.4z" fill="#2f7f5a"/>' +
    '<path d="M12,4.6q5.4,6 5.4,10.4a5.4,5.4 0 0 1 -5,5.4q3,-7 -0.4,-15.8z" fill="#3f9f6e" opacity=".9"/>' +
    '<path d="M8.4,10q-1.6,3 -1.4,5.4" stroke="#7fd0a8" stroke-width="1.3" opacity=".8" fill="none"/>' +
    '<circle cx="12" cy="4.4" r="1.1" fill="#f2ede0"/>',

  /** 舌状に垂れる青白い氷(フランツ・ジョセフ)。 */
  glacier:
    '<path d="M0,0h7l4,10l-2,8l3,6H0z" fill="#2d5f45"/>' +
    '<path d="M24,0h-7l-4,10l3,8l-2,6h10z" fill="#2d5f45"/>' +
    '<path d="M7,0h10l-1.6,8q-0.6,5 1,10l1.6,6H6l1.8,-6q1.6,-5 1,-10z" fill="#dfeef4"/>' +
    '<path d="M7,0h10l-0.8,4q-4.2,-1.2 -8.4,0z" fill="#f0f8fa"/>' +
    '<g stroke="#8fc4dc" stroke-width="1.3" opacity=".9" fill="none"><path d="M8.4,8q3.6,-1 7.2,0M8,13q4,-1.2 8,0M7.4,18q4.6,-1.2 9.2,0"/></g>' +
    '<g stroke="#6fa8c4" stroke-width="1" opacity=".8" fill="none"><path d="M10,9v3M14,9v3M12,14v3"/></g>' +
    '<rect x="0" y="22" width="24" height="2" fill="#8fa8b0"/>',

  /** ずんぐりした体で長い嘴のキーウィ(ハースト)。 */
  nativebird:
    '<rect x="0" y="20.4" width="24" height="3.6" fill="#3a4a36"/>' +
    '<path d="M4.4,13.6q0,-7 7,-7q6.6,0 7.4,6q0.4,4.6 -3.4,6.4q-5,2 -8.6,-0.6q-2.4,-1.8 -2.4,-4.8z" fill="#6b5844"/>' +
    '<path d="M6,11.4q2.6,4.4 8,5.4q-4.6,1.6 -7.6,-0.8q-1.6,-1.6 -0.4,-4.6z" fill="#5a4936"/>' +
    '<circle cx="16.6" cy="7.6" r="2.8" fill="#6b5844"/>' +
    '<path d="M18.8,6.8l4.6,3.4l-0.6,0.9l-4.6,-2.6z" fill="#c9885c"/>' +
    '<circle cx="17.2" cy="6.8" r="0.8" fill="#2a2622"/>' +
    '<g stroke="#c9885c" stroke-width="1.4" fill="none"><path d="M9.4,19.4v3M13.4,19.4v3M8.4,22.4h2M12.4,22.4h2"/></g>',

  /** 水面に立つ一本の柳(ワナカ)。 */
  lonetree:
    '<rect x="0" y="16.4" width="24" height="7.6" fill="#4fb4c9"/>' +
    '<g stroke="#bfe8f0" stroke-width="1" opacity=".8" fill="none"><path d="M2,19h5M16.6,20.4h5M6,22h4"/></g>' +
    '<path d="M11,17.4L11.4,10h1.6l0.4,7.4q-1.2,0.6 -2.4,0z" fill="#5a4630"/>' +
    '<circle cx="12" cy="7.4" r="6" fill="#6fae5a"/>' +
    '<g stroke="#5f9450" stroke-width="1.3" fill="none"><path d="M7,9q-0.6,3.4 0.4,6M12,12.4q0,2.6 0.2,4.4M17,9q0.6,3.4 -0.4,6"/></g>' +
    '<ellipse cx="12" cy="18.4" rx="5" ry="1" fill="#3a8a9c" opacity=".8"/>',

  /** 交差したつるはしと選鉱ざる(クロムウェル)。 */
  mining:
    '<rect x="0" y="21" width="24" height="3" fill="#b8955a"/>' +
    '<path d="M4,4l14,12.6l-1.4,1.6L2.6,5.6z" fill="#8a6a3c"/>' +
    '<path d="M1.6,7.4Q1,2.6 5.4,1q4.6,1.6 5.4,5.4l-1.6,0.6q-1.6,-2.6 -4,-3.4q-1.6,1.6 -2,4.4z" fill="#7f7a6e"/>' +
    '<ellipse cx="16.4" cy="18.4" rx="6.6" ry="3.4" fill="#8a8578"/>' +
    '<ellipse cx="16.4" cy="17.6" rx="6.6" ry="3.2" fill="#a8a296"/>' +
    '<ellipse cx="16.4" cy="18" rx="4.4" ry="2" fill="#6f6a5e"/>' +
    '<g fill="#f5b31c"><circle cx="15" cy="17.6" r="0.9"/><circle cx="17.6" cy="18.2" r="0.9"/><circle cx="16.2" cy="19" r="0.8"/></g>',

  /** 大きく翼を広げた海鳥(ダニーデン)。 */
  seabird:
    '<rect x="0" y="19.4" width="24" height="4.6" fill="#3f7fa8"/>' +
    '<g stroke="#bfe0f0" stroke-width="1" opacity=".8" fill="none"><path d="M2,21.4h6M15,22h6"/></g>' +
    '<path d="M1,8.4q6,-4.4 10.4,-1.6l1.2,1l1.2,-1q4.4,-2.8 10.4,1.6q-6,-0.6 -9.4,1.6l-2.2,1.6l-2.2,-1.6Q7,7.8 1,8.4z" fill="#f6efe2"/>' +
    '<path d="M1,8.4q4,-3 7.6,-2.6l-3.4,3q-2,-0.4 -4.2,-0.4zM23,8.4q-4,-3 -7.6,-2.6l3.4,3q2,-0.4 4.2,-0.4z" fill="#4a4436"/>' +
    '<circle cx="12.6" cy="9.4" r="1.9" fill="#f6efe2"/>' +
    '<path d="M14.4,9.2l2.6,0.6l-2.6,0.9z" fill="#e8a08a"/>' +
    '<path d="M11.6,13.6q0.8,1.6 0.4,3" stroke="#f6efe2" stroke-width="1.6" fill="none"/>',

  /** 流線型のクラシックオートバイ(ティマルー・インヴァーカーギル)。 */
  speedmachine:
    '<rect x="0" y="20.4" width="24" height="3.6" fill="#c9b088"/>' +
    '<g stroke="#a8905c" stroke-width="1" opacity=".8" fill="none"><path d="M1,22.4h8M14,22.6h9"/></g>' +
    '<g fill="#2a2622"><circle cx="5.6" cy="17.4" r="3.2"/><circle cx="18.4" cy="17.4" r="3.2"/></g>' +
    '<g fill="#a8a296"><circle cx="5.6" cy="17.4" r="1.4"/><circle cx="18.4" cy="17.4" r="1.4"/></g>' +
    '<path d="M0.6,14.4q1.6,-3 6,-3.2l11,-0.4q4,0.4 5.6,2.6q0.6,1.4 -1,1.8q-10.4,2.2 -20.6,0.6q-1.4,-0.4 -1,-1.4z" fill="#e8443f"/>' +
    '<path d="M18,10.8l3.4,-3.4l1,4.4q-2.2,-1 -4.4,-1z" fill="#c2302c"/>' +
    '<circle cx="9.4" cy="9.8" r="1.8" fill="#f5b31c"/>' +
    '<path d="M7.2,10.6q2.2,-2.6 4.6,0l-0.6,1.6h-3.4z" fill="#5a5248"/>' +
    '<path d="M12,11.2q3,-1.6 5.4,-0.6" stroke="#8a2a24" stroke-width="1.2" fill="none"/>' +
    '<g stroke="#8a8578" stroke-width="1" opacity=".8" fill="none"><path d="M0.4,17.4h1.6M22,17.4h1.6"/></g>',

  /** 開いた牡蠣の殻(ブラフ)。 */
  oyster:
    '<rect x="0" y="21" width="24" height="3" fill="#3f7fa8"/>' +
    '<path d="M2.6,14q9.4,-4.6 18.8,0l-2,-9.4q-7.4,-3.4 -14.8,0z" fill="#8a8578"/>' +
    '<g stroke="#6f6b62" stroke-width="1" opacity=".9" fill="none"><path d="M4.4,9.4q7.6,-3 15.2,0M3.4,12q8.6,-3.6 17.2,0"/></g>' +
    '<path d="M2.6,14.6q9.4,-4 18.8,0q-2,6.4 -9.4,6.4t-9.4,-6.4z" fill="#c9c0ac"/>' +
    '<ellipse cx="12" cy="16.4" rx="6.6" ry="2.6" fill="#e8e0cc"/>' +
    '<circle cx="12" cy="16" r="1.6" fill="#f6f2e6"/>',

  /** 飛べない鳥タカヘ(テ・アナウ)。 */
  takahe:
    '<rect x="0" y="20.4" width="24" height="3.6" fill="#4f6b52"/>' +
    '<path d="M4.4,13q0,-7.4 7.6,-7.4q7,0 7.6,6.4q0.4,4.4 -2.6,6.4h-8.4Q4.4,17 4.4,13z" fill="#2f5f8a"/>' +
    '<path d="M6,14.6q3.4,3.4 8.4,3.6l-4.6,0.4q-3.4,-1 -3.8,-4z" fill="#3f7f5a"/>' +
    '<path d="M11,10.4q3,3.4 7.4,3.6q0.6,-3 -1.6,-5.4z" fill="#3f7f5a"/>' +
    '<circle cx="17" cy="7.4" r="3" fill="#2f5f8a"/>' +
    '<path d="M19.4,6.4q3,0.6 3.2,3.4q-2.6,0.4 -4.4,-1.6z" fill="#c2453c"/>' +
    '<circle cx="17.8" cy="6.6" r="0.8" fill="#2a2622"/>' +
    '<g stroke="#c2453c" stroke-width="1.6" fill="none"><path d="M9.4,19.4v3M13.6,19.4v3"/></g>',

  /** 切り立った岩壁と一筋の滝(ミルフォード・サウンド)。 */
  fiordcliff:
    '<rect x="0" y="19.4" width="24" height="4.6" fill="#2e4a52"/>' +
    '<path d="M0,0h10l3,7l-2.4,7l2.4,5.6H0z" fill="#4a5a60"/>' +
    '<path d="M6,0l4,7l-2.4,7l2.4,5.6H6L3.4,13l2,-7z" fill="#3f4e54"/>' +
    '<path d="M24,0h-8l-2,8l2,11.6h8z" fill="#435158"/>' +
    '<path d="M15.4,5.4q1,7 -0.6,14" stroke="#e8f2f4" stroke-width="1.8" opacity=".95" fill="none"/>' +
    '<ellipse cx="14.6" cy="20" rx="2.6" ry="1" fill="#e8f2f4" opacity=".8"/>' +
    '<g fill="#2d5f45"><ellipse cx="4" cy="18" rx="3.4" ry="1.8"/><ellipse cx="20.6" cy="17.4" rx="3" ry="1.6"/></g>' +
    '<g stroke="#7aa0a8" stroke-width="0.9" opacity=".8" fill="none"><path d="M2,21.6h5M15,22h5"/></g>',

  /** 金色の玉ねぎドームと色タイルの塔(ファンガレイ)。 */
  mosaictower:
    '<rect x="0" y="22.4" width="24" height="1.6" fill="#4a4436"/>' +
    '<rect x="7.4" y="10.4" width="9.2" height="12" fill="#e8e0d0"/>' +
    '<g><rect x="7.4" y="12" width="2.2" height="2.2" fill="#e8443f"/><rect x="9.6" y="14.2" width="2.2" height="2.2" fill="#5b8fe8"/><rect x="11.8" y="12" width="2.2" height="2.2" fill="#f5b31c"/><rect x="14" y="14.2" width="2.2" height="2.2" fill="#4a9a9a"/><rect x="7.4" y="16.4" width="2.2" height="2.2" fill="#c26a8a"/><rect x="14" y="18.6" width="2.2" height="2.2" fill="#7fae3f"/><rect x="9.6" y="18.6" width="2.2" height="2.2" fill="#e0a83c"/></g>' +
    '<rect x="6.4" y="9" width="11.2" height="1.6" fill="#8a8578"/>' +
    '<path d="M7.4,9q4.6,-1.6 9.2,0l-1,-2.6q-3.6,-1.2 -7.2,0z" fill="#c9c0ac"/>' +
    '<path d="M12,0.6q4.6,2.6 3.4,5.4q-1,2 -3.4,2t-3.4,-2Q7.4,3.2 12,0.6z" fill="#f5b31c"/>' +
    '<path d="M12,0.6q2.6,2.6 1.6,5.6" stroke="#e0a015" stroke-width="1" fill="none"/>' +
    '<circle cx="12" cy="0.8" r="0.8" fill="#e0a015"/>',

  /** 洞窟の天井に光る青緑の点々(ワイトモ)。 */
  cave:
    '<rect x="0" y="0" width="24" height="24" fill="#141c2a"/>' +
    '<path d="M0,0h24v5q-6,4 -12,4T0,5z" fill="#20304a"/>' +
    '<path d="M0,24V10q4,4 7,9.4zM24,24V11q-4,3.6 -6.6,8.6z" fill="#20304a"/>' +
    '<g stroke="#3f5a72" stroke-width="0.7" opacity=".9" fill="none"><path d="M5,6.4v4M9,8v5M13,8.4v4.4M17,7.4v5M20.6,6v3.4"/></g>' +
    '<g fill="#7ff0c8"><circle cx="5" cy="10.8" r="1.1"/><circle cx="9" cy="13.4" r="1.3"/><circle cx="13" cy="13.2" r="1.2"/><circle cx="17" cy="12.8" r="1.3"/><circle cx="20.6" cy="9.8" r="1.1"/><circle cx="7" cy="17.4" r="0.85"/><circle cx="15" cy="18" r="0.85"/><circle cx="11" cy="20.4" r="0.75"/></g>' +
    '<g fill="#b8f8e0" opacity=".6"><circle cx="9" cy="13.4" r="2.4"/><circle cx="17" cy="12.8" r="2.2"/></g>',

  /** 麦の穂とセンターピボット散水機(パーマストン・ノース・アシュバートン)。 */
  cropland:
    '<rect x="0" y="0" width="24" height="24" fill="#7fae3f"/>' +
    '<rect x="0" y="17" width="24" height="7" fill="#c9a860"/>' +
    '<path d="M5,17V8" stroke="#c9a860" stroke-width="1.4" fill="none"/>' +
    '<g fill="#e0c894"><ellipse cx="3.4" cy="9.4" rx="1.4" ry="2.2" transform="rotate(-28 3.4 9.4)"/><ellipse cx="6.6" cy="9.4" rx="1.4" ry="2.2" transform="rotate(28 6.6 9.4)"/><ellipse cx="3" cy="12.6" rx="1.4" ry="2.2" transform="rotate(-28 3 12.6)"/><ellipse cx="7" cy="12.6" rx="1.4" ry="2.2" transform="rotate(28 7 12.6)"/><ellipse cx="5" cy="6.6" rx="1.3" ry="2.2"/></g>' +
    '<path d="M10.4,13.4L23,10.4" stroke="#8a94a8" stroke-width="1.8" fill="none"/>' +
    '<g stroke="#5f6a72" stroke-width="1.2" fill="none"><path d="M12.6,13l0.8,4M17.6,11.8l0.8,4M22.2,10.6l0.8,4"/></g>' +
    '<g fill="#5f6a72"><circle cx="13.8" cy="17.6" r="1.2"/><circle cx="18.8" cy="16.4" r="1.2"/><circle cx="23.2" cy="15.2" r="1.2"/></g>' +
    '<circle cx="10" cy="13.6" r="1.6" fill="#5a5248"/>' +
    '<g stroke="#bfe8f0" stroke-width="1" opacity=".9" fill="none"><path d="M12,11.6q-0.8,1.6 -0.4,2.8M16.8,10.4q-0.8,1.6 -0.4,2.8M21.6,9.2q-0.8,1.6 -0.4,2.8"/></g>',
};
