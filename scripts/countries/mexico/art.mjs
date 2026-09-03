/**
 * メキシコの都市イラスト。
 *
 * `MEXICO_MARKS` は24×24の座標系に描くシンボル、`MEXICO_BG` は400×210の
 * 座標系に描く背景シーン(いずれもSVG断片の文字列)。韓国・フランスと同じく
 * 最初から文字列として持つ。動きは含めない(アニメーションはReact側で重ねる)。
 *
 * 鍵の一覧と「どんな景色か」は `ART-KEYS.md`。`cities.mjs` の `mark` / `bg` と
 * 一対一で対応する。
 *
 * 色は他の盤面と揃える。空 #8fc4e8〜#cfe4f0、顔・白 #f6efe2、
 * 強調 #f5b31c/#e8443f/#5b8fe8。メキシコらしさは**土地ごとに色調を変えて**出す:
 *   乾いた高原   … 土の #c9a877、玄武岩の #b08a5f(テオティワカン)
 *   ユカタン     … 石灰岩の #ded0a8、セノーテの水 #2fb8c8、密林の #2f6b3f
 *   グアナフアト … 色壁の家並み #e8443f/#f4c430/#5b8fe8/#3f8f4f/#c86a8a
 * 18種の背景が同じ色調にならないよう、シーンごとに地色から変える。
 *
 * **背景SVGの中央25%(x=151〜249 / y=54〜152)は都市シンボルに隠れて見えない。**
 * 見せたい細部は左右3分の1と手前(y>170)に置く。中央には繰り返し
 * (参道の基壇・密林の幹・家並み)だけを置く。
 *
 * `sky()` は必ず第3引数(次に来る塗りの開始y)を渡すこと。渡し忘れると
 * 空と地面のあいだに塗り残しの帯ができる(過去に全77背景中11種で発生)。
 * 実測: `node <scratchpad>/measure-mexico-bg.mjs` か、取り込み後に
 * `node scripts/check-city-backgrounds.mjs mexico`。
 */

// ---------------------------------------------------------------------------
// 背景シーンの組み立て部品
// ---------------------------------------------------------------------------

const W = 400;

/** 小数の桁を抑える(SVGを読みやすく保つため)。 */
const r1 = (v) => Math.round(v * 10) / 10;

function band(y, h, fill) {
  return `<rect x="0" y="${y}" width="${W}" height="${h}" fill="${fill}"/>`;
}

/**
 * 空。**第3引数に「次に来る塗りの開始y」を渡すこと。**
 * 既定では y=118 までしか塗らないので、地面がもっと下から始まるシーンで
 * そのままにすると、あいだが横一文字に透ける。
 */
function sky(top = "#8fc4e8", bottom = "#cfe4f0", to = 118) {
  // `to` が境界の80以下なら2色目の見える余地が無い。高さ0の <rect> を出さない。
  return band(0, 88, top) + (to > 80 ? band(80, to - 80, bottom) : "");
}

function ground(y, fill) {
  return `<rect x="0" y="${y}" width="${W}" height="${210 - y}" fill="${fill}"/>`;
}

function sun(cx, cy, r, fill = "#f5b31c") {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>`;
}

function clouds(cx, cy, scale = 1) {
  const e = (dx, rx, ry) =>
    `<ellipse cx="${r1(cx + dx * scale)}" cy="${cy}" rx="${r1(rx * scale)}" ry="${r1(ry * scale)}"/>`;
  return `<g opacity=".8" fill="#f6efe2">${e(0, 18, 7)}${e(-10, 11, 5.5)}${e(11, 13, 5.5)}</g>`;
}

/** 遠くの山なみ(全幅)。`base` に接地するので塗り残しは作らない。 */
function ridge(base, peaks, fill, opacity = 1) {
  const pts = peaks.map(([x, y]) => `L${x},${y}`).join("");
  return `<path d="M0,${base}${pts}L${W},${base}z" fill="${fill}" opacity="${opacity}"/>`;
}

/** 小鳥(遠景)。 */
function bird(x, y, scale = 1, color = "#4a4a52") {
  const w = 8 * scale;
  return `<path d="M${r1(x - w)},${y}q${r1(w / 2)},-6 ${w},0q${r1(w / 2)},-6 ${w},0" fill="none" stroke="${color}" stroke-width="1.4"/>`;
}

/** 草むら。乾いた高原にも密林の床にも使う。 */
function grassTuft(x, y, color = "#a8925f") {
  return `<path d="M${x},${y}l-3,-7M${x},${y}l0,-8M${x},${y}l3,-6" stroke="${color}" stroke-width="1.6" fill="none" stroke-linecap="round"/>`;
}

/**
 * 段状の基壇・ピラミッド(タルー・タブレロの簡略形)。
 * メソアメリカ建築の核なので部品にする。各層は裾広がりの台形で、
 * 層の上端に暗い横帯(タブレロの影)、正面に幅広の階段を持つ。
 */
function steppedPyramid(cx, base, w, h, tiers = 4, fill = "#b08a5f", shade = "#8a6a48", stair = "#9a7850") {
  const parts = [];
  const step = h / tiers;
  const shrink = 0.78 / tiers;
  for (let i = 0; i < tiers; i++) {
    const w0 = w * (1 - i * shrink);
    const w1 = w * (1 - (i + 1) * shrink);
    const y0 = r1(base - step * i);
    const y1 = r1(base - step * (i + 1));
    parts.push(
      `<path d="M${r1(cx - w0 / 2)},${y0}L${r1(cx - w1 / 2)},${y1}L${r1(cx + w1 / 2)},${y1}L${r1(cx + w0 / 2)},${y0}z" fill="${fill}"/>`,
    );
    parts.push(`<rect x="${r1(cx - w1 / 2)}" y="${y1}" width="${r1(w1)}" height="2.4" fill="${shade}"/>`);
  }
  // 正面の大階段
  const sw = w * 0.15;
  parts.push(
    `<path d="M${r1(cx - sw)},${base}L${r1(cx - sw * 0.4)},${r1(base - h)}L${r1(cx + sw * 0.4)},${r1(base - h)}L${r1(cx + sw)},${base}z" fill="${stair}"/>`,
  );
  const treads = [];
  for (let i = 1; i < tiers * 2; i++) {
    const y = r1(base - (h / (tiers * 2)) * i);
    const tw = r1(sw * (1 - (i / (tiers * 2)) * 0.6));
    treads.push(`<path d="M${r1(cx - tw)},${y}h${r1(tw * 2)}"/>`);
  }
  parts.push(`<g stroke="${shade}" stroke-width="1.2" opacity=".7">${treads.join("")}</g>`);
  return parts.join("");
}

/** 低い基壇(参道の脇に並ぶもの)。 */
function platform(cx, base, w, h, fill = "#b08a5f", shade = "#8a6a48") {
  return (
    `<path d="M${r1(cx - w / 2)},${base}L${r1(cx - w * 0.38)},${r1(base - h)}L${r1(cx + w * 0.38)},${r1(base - h)}L${r1(cx + w / 2)},${base}z" fill="${fill}"/>` +
    `<rect x="${r1(cx - w * 0.38)}" y="${r1(base - h)}" width="${r1(w * 0.76)}" height="1.8" fill="${shade}"/>`
  );
}

/** ウチワサボテン(ノパル)。 */
function nopal(x, base, s = 1) {
  const e = (dx, dy, rx, ry, rot) =>
    `<ellipse cx="${r1(x + dx * s)}" cy="${r1(base + dy * s)}" rx="${r1(rx * s)}" ry="${r1(ry * s)}" transform="rotate(${rot} ${r1(x + dx * s)} ${r1(base + dy * s)})"/>`;
  return (
    `<g fill="#3f8f4f" stroke="#2f6b3f" stroke-width="1">` +
    e(0, -8, 6, 9, 0) +
    e(-7, -15, 4.5, 6.5, -28) +
    e(7, -16, 4.5, 6.5, 24) +
    `</g>`
  );
}

/** アガベ(竜舌蘭)。青みがかった剣状の葉が放射状に開く。 */
function agavePlant(x, base, s = 1, fill = "#5f8fa0") {
  const leaf = (dx, dy, tip) =>
    `<path d="M${x},${base}Q${r1(x + dx * 0.5 * s)},${r1(base + dy * 0.7 * s)} ${r1(x + dx * s)},${r1(base + dy * s)}L${r1(x + tip * s)},${r1(base - 1 * s)}z"/>`;
  return (
    `<g fill="${fill}">` +
    leaf(-14, -8, -4) +
    leaf(-8, -15, -2) +
    leaf(0, -17, 2) +
    leaf(8, -15, 4) +
    leaf(14, -8, 5) +
    `</g><path d="M${x},${r1(base - 4 * s)}l0,${r1(-6 * s)}" stroke="#4a7a88" stroke-width="${r1(2 * s)}"/>`
  );
}

/** 丸い樹冠の木。 */
function roundTree(x, base, r, crown = "#3f8f4f", trunk = "#6b5330") {
  const th = r1(r * 1.1);
  return (
    `<rect x="${r1(x - r * 0.16)}" y="${r1(base - th - r * 0.3)}" width="${r1(r * 0.32)}" height="${r1(th + r * 0.3)}" fill="${trunk}"/>` +
    `<circle cx="${x}" cy="${r1(base - th - r * 0.5)}" r="${r}" fill="${crown}"/>`
  );
}

/** 密林の木。幹が高く、樹冠が重なる。 */
function jungleTree(x, base, h, crown = "#2f6b3f", crown2 = "#3f8f4f") {
  return (
    `<rect x="${r1(x - 2.5)}" y="${r1(base - h * 0.55)}" width="5" height="${r1(h * 0.55)}" fill="#5a4630"/>` +
    `<circle cx="${r1(x - h * 0.16)}" cy="${r1(base - h * 0.6)}" r="${r1(h * 0.24)}" fill="${crown}"/>` +
    `<circle cx="${r1(x + h * 0.14)}" cy="${r1(base - h * 0.64)}" r="${r1(h * 0.22)}" fill="${crown2}"/>` +
    `<circle cx="${x}" cy="${r1(base - h * 0.8)}" r="${r1(h * 0.26)}" fill="${crown}"/>`
  );
}

/** セイバ(カポック)の大樹。根元が板根で広がる。 */
function ceiba(x, base, h) {
  return (
    `<path d="M${r1(x - 5)},${r1(base - h * 0.6)}L${r1(x - 14)},${base}L${r1(x + 14)},${base}L${r1(x + 5)},${r1(base - h * 0.6)}z" fill="#7a6248"/>` +
    `<path d="M${r1(x - 10)},${base}L${r1(x - 22)},${base}L${r1(x - 8)},${r1(base - h * 0.28)}z" fill="#6b5540"/>` +
    `<path d="M${r1(x + 10)},${base}L${r1(x + 22)},${base}L${r1(x + 8)},${r1(base - h * 0.28)}z" fill="#6b5540"/>` +
    `<ellipse cx="${x}" cy="${r1(base - h * 0.78)}" rx="${r1(h * 0.42)}" ry="${r1(h * 0.2)}" fill="#2f6b3f"/>` +
    `<ellipse cx="${r1(x - h * 0.2)}" cy="${r1(base - h * 0.68)}" rx="${r1(h * 0.26)}" ry="${r1(h * 0.14)}" fill="#3f8f4f"/>` +
    `<ellipse cx="${r1(x + h * 0.22)}" cy="${r1(base - h * 0.7)}" rx="${r1(h * 0.24)}" ry="${r1(h * 0.13)}" fill="#3f8f4f"/>`
  );
}

/** 上端から垂れるツタ。 */
function vine(x, len, color = "#3f8f4f") {
  const leaves = [];
  for (let i = 1; i <= 3; i++) {
    leaves.push(`<circle cx="${r1(x + (i % 2 ? 3 : -3))}" cy="${r1((len / 3) * i)}" r="2.6" fill="${color}"/>`);
  }
  return `<path d="M${x},0q4,${r1(len * 0.5)} 0,${len}" stroke="#2f6b3f" stroke-width="2" fill="none"/>${leaves.join("")}`;
}

/** 色壁の家(グアナフアトの斜面の家並み)。 */
function casita(x, y, w, h, wall, roof = "#8a5a3a") {
  return (
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${wall}"/>` +
    `<rect x="${r1(x - 1)}" y="${r1(y - 3)}" width="${r1(w + 2)}" height="3" fill="${roof}"/>` +
    `<rect x="${r1(x + w / 2 - 1.5)}" y="${r1(y + h * 0.3)}" width="3" height="4" fill="#3a2a1a" opacity=".7"/>`
  );
}

/** 小さな人。何をしているかは腕を足して出す。 */
function tinyPerson(x, base, h, shirt, skin = "#c98a5f") {
  const hd = r1(h * 0.2);
  const top = r1(base - h + hd * 1.7);
  return (
    `<g><rect x="${r1(x - h * 0.1)}" y="${r1(base - h * 0.38)}" width="${r1(h * 0.09)}" height="${r1(h * 0.38)}" fill="#3f3428"/>` +
    `<rect x="${r1(x + h * 0.02)}" y="${r1(base - h * 0.38)}" width="${r1(h * 0.09)}" height="${r1(h * 0.38)}" fill="#3f3428"/>` +
    `<path d="M${r1(x - h * 0.16)},${top}h${r1(h * 0.32)}l${r1(h * 0.03)},${r1(h * 0.42)}h${r1(-h * 0.38)}z" fill="${shirt}"/>` +
    `<circle cx="${x}" cy="${r1(top - hd * 0.75)}" r="${hd}" fill="${skin}"/></g>`
  );
}

/** パペルピカド(切り紙の万国旗)。祭りの通りに渡す。 */
function papelPicado(x0, y0, x1, y1, colors = ["#e8443f", "#f4c430", "#5b8fe8", "#3f8f4f", "#c86a8a"]) {
  const n = 6;
  const flags = [];
  for (let i = 0; i < n; i++) {
    const t = (i + 0.5) / n;
    const x = r1(x0 + (x1 - x0) * t);
    const y = r1(y0 + (y1 - y0) * t + Math.sin(t * Math.PI) * 6);
    flags.push(`<path d="M${r1(x - 4)},${y}h8l-4,7z" fill="${colors[i % colors.length]}"/>`);
  }
  return (
    `<path d="M${x0},${y0}Q${r1((x0 + x1) / 2)},${r1((y0 + y1) / 2 + 8)} ${x1},${y1}" stroke="#4a4436" stroke-width="1.2" fill="none"/>` +
    flags.join("")
  );
}

/** 波の反射線・水面。 */
function ripples(y, color = "#bfe8f4") {
  return `<g stroke="${color}" stroke-width="2" opacity=".7" fill="none"><path d="M26,${y}h74M176,${y + 12}h92M108,${y + 24}h62"/></g>`;
}

/** 起重機(港のクレーン)。 */
function crane(x, base, h, fill = "#e8443f") {
  return (
    `<rect x="${r1(x - 2)}" y="${r1(base - h)}" width="4" height="${h}" fill="${fill}"/>` +
    `<rect x="${r1(x - 2)}" y="${r1(base - h)}" width="${r1(h * 0.72)}" height="4" fill="${fill}"/>` +
    `<line x1="${r1(x + h * 0.6)}" y1="${r1(base - h + 2)}" x2="${r1(x + h * 0.6)}" y2="${r1(base - h * 0.55)}" stroke="${fill}" stroke-width="2"/>`
  );
}

/** 椰子。幹がしなり、葉が放射状に開く。 */
function palm(x, base, h, lean = 6) {
  const tx = r1(x + lean);
  const ty = r1(base - h);
  const frond = (dx, dy) =>
    `<path d="M${tx},${ty}q${r1(dx * 0.55)},${r1(dy * 0.3 - 6)} ${dx},${dy}" stroke="#2f8f4f" stroke-width="3.4" fill="none" stroke-linecap="round"/>`;
  return (
    `<path d="M${x},${base}q${r1(lean * 0.4)},${r1(-h * 0.55)} ${lean},${-h}" stroke="#8a6a44" stroke-width="4.5" fill="none"/>` +
    frond(-16, 2) + frond(-11, -7) + frond(0, -10) + frond(11, -7) + frond(16, 2) +
    `<circle cx="${tx}" cy="${r1(ty + 2)}" r="2.6" fill="#6b4a2a"/>`
  );
}

/** 貨車(有蓋車)。 */
function boxcar(x, y, w, color = "#8a5a3a") {
  return (
    `<rect x="${x}" y="${y}" width="${w}" height="16" fill="${color}"/>` +
    `<rect x="${r1(x + w / 2 - 4)}" y="${r1(y + 3)}" width="8" height="10" fill="#3a2a1a" opacity=".6"/>` +
    `<circle cx="${r1(x + 7)}" cy="${r1(y + 18)}" r="3" fill="#2a2a2a"/>` +
    `<circle cx="${r1(x + w - 7)}" cy="${r1(y + 18)}" r="3" fill="#2a2a2a"/>`
  );
}

/** 鉱山の巻き上げ櫓(A形の脚+滑車)。 */
function headframe(x, base, h, fill = "#6b5544") {
  return (
    `<path d="M${r1(x - h * 0.3)},${base}L${x},${r1(base - h)}L${r1(x + h * 0.3)},${base}" stroke="${fill}" stroke-width="4" fill="none"/>` +
    `<path d="M${r1(x - h * 0.18)},${r1(base - h * 0.4)}h${r1(h * 0.36)}M${r1(x - h * 0.11)},${r1(base - h * 0.66)}h${r1(h * 0.22)}" stroke="${fill}" stroke-width="2.4"/>` +
    `<circle cx="${x}" cy="${r1(base - h)}" r="${r1(h * 0.12)}" fill="none" stroke="${fill}" stroke-width="2.4"/>` +
    `<line x1="${x}" y1="${r1(base - h)}" x2="${x}" y2="${base}" stroke="#4a4a52" stroke-width="1.6"/>`
  );
}

/** モミ(オヤメル)。松より細く、層が詰む。 */
function fir(x, base, h, fill = "#2f5f3f") {
  const w = r1(h * 0.44);
  const layer = (i, n) => {
    const y0 = r1(base - (h * (0.2 + (0.8 * i) / n)));
    const lw = r1(w * (1 - i / (n + 1)));
    return `<path d="M${r1(x - lw / 2)},${y0}L${x},${r1(y0 - h / n)}L${r1(x + lw / 2)},${y0}z" fill="${fill}"/>`;
  };
  return (
    `<rect x="${r1(x - 1.6)}" y="${r1(base - h * 0.2)}" width="3.2" height="${r1(h * 0.2)}" fill="#5a4630"/>` +
    layer(0, 4) + layer(1, 4) + layer(2, 4) + layer(3, 4)
  );
}

/** カルドン(柱サボテン)。 */
function cardon(x, base, h, fill = "#4f8a4f") {
  return (
    `<g fill="${fill}">` +
    `<rect x="${r1(x - 3.5)}" y="${r1(base - h)}" width="7" height="${h}" rx="3.5"/>` +
    `<path d="M${r1(x - 3.5)},${r1(base - h * 0.5)}h-6v${r1(-h * 0.28)}a3,3 0 0 1 6,0z"/>` +
    `<path d="M${r1(x + 3.5)},${r1(base - h * 0.42)}h6v${r1(-h * 0.2)}a3,3 0 0 1 -6,0z"/>` +
    `</g>` +
    `<g stroke="#3a6b3a" stroke-width="1"><path d="M${x},${r1(base - h + 4)}v${r1(h - 8)}"/></g>`
  );
}

/** アドベの家。平屋根に梁(ビガ)の木口が並ぶ。 */
function adobeHouse(x, base, w, h, wall = "#c08a5a") {
  const vigas = [];
  for (let i = 1; i <= Math.floor(w / 10); i++) {
    vigas.push(`<circle cx="${r1(x + i * 10 - 4)}" cy="${r1(base - h + 4)}" r="1.4"/>`);
  }
  return (
    `<rect x="${x}" y="${r1(base - h)}" width="${w}" height="${h}" rx="2" fill="${wall}"/>` +
    `<rect x="${r1(x - 2)}" y="${r1(base - h - 3)}" width="${r1(w + 4)}" height="4" rx="2" fill="#a8744a"/>` +
    `<g fill="#6b4a2a">${vigas.join("")}</g>` +
    `<rect x="${r1(x + w * 0.4)}" y="${r1(base - h * 0.55)}" width="${r1(w * 0.16)}" height="${r1(h * 0.55)}" fill="#5a3a22"/>`
  );
}

/** 蝶(モナルカ)。橙の2枚羽。 */
function butterflyDot(x, y, s = 1, spread = 5) {
  return (
    `<g fill="#e8862f"><path d="M${x},${y}l${r1(-spread * s)},${r1(-3 * s)}l${r1(1 * s)},${r1(5 * s)}z"/>` +
    `<path d="M${x},${y}l${r1(spread * s)},${r1(-3 * s)}l${r1(-1 * s)},${r1(5 * s)}z"/></g>`
  );
}

/** アーケード(ポルターレス)。アーチの列。 */
function arcade(x, base, n, aw, ah, wall = "#f0e4d0", inside = "#8a7a68") {
  const arches = [];
  for (let i = 0; i < n; i++) {
    const ax = r1(x + i * aw + aw / 2);
    arches.push(
      `<path d="M${r1(ax - aw * 0.32)},${base}v${r1(-ah * 0.55)}a${r1(aw * 0.32)},${r1(aw * 0.32)} 0 0 1 ${r1(aw * 0.64)},0v${r1(ah * 0.55)}z" fill="${inside}"/>`,
    );
  }
  return (
    `<rect x="${x}" y="${r1(base - ah)}" width="${r1(n * aw)}" height="${ah}" fill="${wall}"/>` +
    `<rect x="${r1(x - 2)}" y="${r1(base - ah - 5)}" width="${r1(n * aw + 4)}" height="6" fill="#c8836a"/>` +
    arches.join("")
  );
}

// ---------------------------------------------------------------------------
// 背景シーン。鍵は cities.mjs の `bg` と対応(全18種)。
// ---------------------------------------------------------------------------

const MEXICO_BASE_BG = {
  /**
   * 開けた平原の遺跡。テオティワカン。乾季の高原の土色に、
   * 左に太陽のピラミッド級の大基壇、右に月のピラミッド風の中基壇。
   * 参道と脇の小基壇は中央(隠れる帯)に置く(繰り返しなので失っても軽い)。
   */
  ruins:
    sky("#a8cce0", "#e8dcc0", 118) +
    sun(52, 38, 16, "#f5d060") +
    clouds(130, 30, 1) +
    clouds(250, 22, 0.8) +
    bird(300, 44, 1) +
    bird(330, 56, 0.8) +
    bird(360, 40, 0.7) +
    // 遠くの山影(乾いた青紫)
    ridge(118, [[60, 88], [130, 112], [200, 92], [270, 110], [330, 86], [400, 108]], "#9a8ba0") +
    ridge(118, [[80, 102], [180, 116], [300, 100], [400, 114]], "#b0a08c", 0.9) +
    ground(118, "#c9a877") +
    // 死者の大通り(中央を貫く。上半分は隠れてよい)
    `<path d="M186,118L214,118L262,210L138,210z" fill="#d8b98a"/>` +
    `<g stroke="#b89860" stroke-width="1.4" opacity=".8"><path d="M186,118L138,210M214,118L262,210"/></g>` +
    // 参道脇の小基壇(繰り返し。中央の帯に置く)
    platform(166, 138, 26, 8) +
    platform(236, 138, 26, 8) +
    platform(158, 158, 34, 10) +
    platform(244, 158, 34, 10) +
    // 太陽のピラミッド(左)
    steppedPyramid(78, 176, 132, 92, 4) +
    // 月のピラミッド(右)と広場の基壇
    steppedPyramid(330, 152, 88, 60, 3) +
    platform(286, 158, 30, 10) +
    platform(376, 160, 30, 10) +
    // 手前: 赤い壁画の残る低い壁(右)
    `<rect x="300" y="180" width="88" height="18" fill="#b08a5f"/>` +
    `<rect x="300" y="180" width="88" height="3" fill="#8a6a48"/>` +
    `<rect x="306" y="186" width="76" height="7" fill="#a83232"/>` +
    `<path d="M310,189q6,-4 12,0t12,0t12,0t12,0t12,0" stroke="#e8c890" stroke-width="1.6" fill="none"/>` +
    // 手前: 植生と歩く人
    nopal(30, 206, 1.2) +
    nopal(120, 202, 0.9) +
    agavePlant(390, 206, 1.1) +
    grassTuft(60, 200) +
    grassTuft(150, 206) +
    grassTuft(268, 202) +
    grassTuft(350, 208) +
    tinyPerson(182, 200, 18, "#e8443f") +
    tinyPerson(224, 206, 20, "#5b8fe8") +
    // 手前左: 崩れた石積みと黒曜石のかけら
    `<g fill="#a88a5f" stroke="#8a6a48" stroke-width="1"><rect x="140" y="196" width="12" height="7"/><rect x="126" y="200" width="12" height="7"/><rect x="148" y="204" width="12" height="6"/></g>` +
    `<g fill="#2a3038"><path d="M282,204l4,-5l3,5z"/><path d="M292,207l3,-4l3,4z"/></g>`,

  /**
   * セノーテ。チチェン・イッツァ。密林に囲まれた石灰岩の穴と澄んだ水。
   * 穴は前・左に置き、中央の帯には密林の幹(繰り返し)だけを置く。
   */
  cenote:
    // ユカタンの湿った空。上ほど青く、地平線ちかくは白く霞む
    sky("#9cc8e4", "#e6efee", 96) +
    band(52, 26, "#c4dce4") +
    sun(52, 30, 13, "#f8f0d8") +
    clouds(330, 26, 0.9) +
    clouds(140, 40, 0.7) +
    clouds(238, 26, 0.55) +
    // 最遠景の林冠(霞んだ薄緑)と、その手前の濃い列。2列で奥行きを出す
    ridge(96, [[40, 62], [100, 76], [160, 60], [220, 74], [290, 60], [350, 74], [400, 64]], "#7fa682", 0.85) +
    ridge(96, [[30, 74], [70, 84], [120, 70], [170, 82], [230, 72], [280, 84], [330, 70], [400, 80]], "#2f6b3f") +
    // 林冠の上に覗くエル・カスティージョの頂(右奥)
    `<path d="M356,72L366,54L376,54L386,72z" fill="#c8b890"/>` +
    `<rect x="364" y="58" width="14" height="8" fill="#b0a078"/>` +
    `<rect x="368" y="60" width="6" height="6" fill="#6b5b44"/>` +
    ground(96, "#8fae63") +
    // 中景の密林(中央の帯は繰り返しの幹と樹冠)。左右にも回して林で囲む
    jungleTree(34, 142, 58) +
    jungleTree(74, 146, 64) +
    jungleTree(150, 150, 68) +
    jungleTree(200, 148, 76) +
    jungleTree(248, 152, 64) +
    jungleTree(288, 148, 70) +
    jungleTree(310, 154, 56) +
    // 石灰岩の開けた床(手前)
    `<path d="M0,144Q100,132 200,142Q300,152 400,140L400,210L0,210z" fill="#ded0a8"/>` +
    // 右: セイバの大樹と、水辺へ降りる石段
    ceiba(348, 190, 100) +
    `<g fill="#c8b890" stroke="#a89870" stroke-width="1"><rect x="258" y="160" width="26" height="6"/><rect x="240" y="168" width="26" height="6"/><rect x="222" y="176" width="26" height="6"/><rect x="204" y="184" width="26" height="6"/></g>` +
    // セノーテ(前・左)。縁の盛り上がり → 岩壁 → 水面
    `<ellipse cx="110" cy="184" rx="80" ry="25" fill="#c8b890"/>` +
    `<ellipse cx="110" cy="184" rx="68" ry="20" fill="#6b5b44"/>` +
    `<ellipse cx="110" cy="186" rx="54" ry="15" fill="#2fb8c8"/>` +
    `<ellipse cx="96" cy="184" rx="20" ry="6" fill="#7fe0e8" opacity=".7"/>` +
    `<path d="M70,192q14,4 30,2" stroke="#1f8fa8" stroke-width="2" fill="none" opacity=".8"/>` +
    // 縁に立つ木と、その根が縁を越えて水面へ垂れ下がる
    roundTree(34, 168, 12, "#3f8f4f") +
    `<g stroke="#7a6248" stroke-width="2.6" fill="none" stroke-linecap="round">` +
    `<path d="M36,168q14,2 24,8q6,4 8,12"/>` +
    `<path d="M40,170q10,6 12,16"/>` +
    `<path d="M156,164q8,6 6,16"/>` +
    `</g>` +
    `<g stroke="#7a6248" stroke-width="1.4" fill="none"><path d="M64,182l4,3M52,180l3,4M160,174l4,2"/></g>` +
    // 穴の上を回るツバメ
    bird(96, 152, 0.8, "#2a3440") +
    bird(126, 146, 0.7, "#2a3440") +
    bird(76, 142, 0.6, "#2a3440") +
    // 手前の植生・上端のツタ
    vine(14, 40) +
    vine(388, 34) +
    `<g fill="#e8443f"><circle cx="236" cy="196" r="2.4"/><circle cx="244" cy="200" r="2"/><circle cx="228" cy="201" r="2"/></g>` +
    `<circle cx="236" cy="202" r="7" fill="#3f8f4f" opacity=".85"/>` +
    // 縁の石灰岩の岩(ごつごつ)
    `<g fill="#c8b890" stroke="#a89870" stroke-width="1"><path d="M22,196l6,-8l8,2l3,8z"/><path d="M178,192l5,-6l7,3l2,6z"/><path d="M196,199l4,-5l6,2l2,5z"/></g>` +
    // 石灰岩の露頭(手前・右。カルストの段になった岩棚)
    `<g fill="#ded0a8" stroke="#b0a078" stroke-width="1.2">` +
    `<path d="M262,210l6,-14l18,-4l16,6l12,-3l14,8l4,7z"/>` +
    `<path d="M270,206l8,-8l14,-2l10,6"/>` +
    `<path d="M300,208l8,-9l12,4"/>` +
    `</g>` +
    `<g stroke="#b0a078" stroke-width="1" opacity=".8"><path d="M284,199v8M312,202v6M328,205v4"/></g>` +
    // 露頭の上で日を浴びるイグアナ
    `<g><path d="M282,205q10,-7 22,-2q8,3 14,1q-4,5 -12,4q-14,3 -24,-3z" fill="#5f7a3a"/>` +
    `<path d="M282,205q-6,2 -10,0" stroke="#5f7a3a" stroke-width="3" fill="none" stroke-linecap="round"/>` +
    `<circle cx="315" cy="202" r="1.2" fill="#241a10"/>` +
    `<path d="M292,201l3,-3M300,200l3,-3" stroke="#4a6b2f" stroke-width="1.4"/></g>` +
    grassTuft(190, 206, "#7a8a4f") +
    grassTuft(300, 208, "#7a8a4f") +
    grassTuft(266, 204, "#7a8a4f") +
    grassTuft(388, 202, "#7a8a4f"),

  /**
   * 渓谷の底の色壁の町。グアナフアト。両斜面を色とりどりの家が埋め、
   * 谷底の通りに地下トンネルの坑口とパペルピカド。中央の帯は家並みの繰り返し。
   */
  ravine:
    sky("#8fc4e8", "#f4d8a0", 92) +
    clouds(206, 28, 0.9) +
    bird(180, 40, 0.8) +
    bird(232, 32, 0.7) +
    ground(92, "#a87a54") +
    // 谷の両肩(稜線まで斜面が立ち上がる。中央に空の鞍部を残す)
    ridge(92, [[60, 46], [130, 72], [186, 92], [400, 92]], "#96684a") +
    ridge(92, [[0, 92], [216, 92], [272, 72], [340, 46], [400, 56]], "#b08458") +
    // 斜面の陰影(左が夕陽の影)
    `<path d="M0,92L150,92L60,210L0,210z" fill="#96684a"/>` +
    `<path d="M400,92L260,92L340,210L400,210z" fill="#b08458"/>` +
    // 稜線ちかくの家並み(小さく)
    casita(28, 62, 20, 13, "#c86a8a") +
    casita(52, 70, 20, 13, "#f6efe2") +
    casita(8, 80, 22, 13, "#f4c430") +
    casita(80, 84, 20, 13, "#5b8fe8") +
    casita(300, 78, 20, 13, "#3f8f4f") +
    casita(326, 66, 20, 13, "#f4c430") +
    casita(352, 58, 22, 13, "#e8443f") +
    casita(376, 70, 20, 13, "#f6efe2") +
    // 左斜面の家並み(上から下へ)
    casita(6, 100, 26, 16, "#e8443f") +
    casita(38, 106, 24, 15, "#f4c430") +
    casita(122, 104, 24, 15, "#e88a3f") +
    casita(130, 128, 24, 15, "#f4c430") +
    casita(138, 152, 24, 15, "#5b8fe8") +
    casita(258, 104, 24, 15, "#c86a8a") +
    casita(266, 128, 24, 15, "#e8443f") +
    casita(274, 152, 24, 15, "#f6efe2") +
    casita(10, 124, 28, 17, "#5b8fe8") +
    casita(44, 130, 24, 15, "#f6efe2") +
    casita(20, 150, 26, 16, "#3f8f4f") +
    casita(52, 154, 26, 16, "#c86a8a") +
    casita(30, 176, 28, 17, "#e88a3f") +
    // 中央の家並み(隠れる帯。繰り返しなので失っても軽い)
    casita(160, 100, 24, 15, "#c86a8a") +
    casita(190, 96, 26, 16, "#3f8f4f") +
    casita(222, 102, 24, 15, "#f4c430") +
    casita(168, 122, 26, 16, "#5b8fe8") +
    casita(200, 120, 24, 15, "#e8443f") +
    casita(230, 124, 26, 16, "#f6efe2") +
    casita(178, 144, 26, 16, "#e88a3f") +
    casita(210, 142, 26, 16, "#f4c430") +
    // 右斜面の家並み
    casita(300, 100, 26, 16, "#f4c430") +
    casita(332, 106, 26, 16, "#e8443f") +
    casita(364, 100, 28, 17, "#3f8f4f") +
    casita(310, 126, 26, 16, "#f6efe2") +
    casita(344, 130, 26, 16, "#5b8fe8") +
    casita(320, 152, 26, 16, "#c86a8a") +
    // 大聖堂(左斜面の中腹。黄色い壁に赤いドーム)
    `<rect x="84" y="118" width="40" height="34" fill="#f4c430"/>` +
    `<rect x="88" y="100" width="10" height="20" fill="#f4c430"/>` +
    `<rect x="87" y="96" width="12" height="5" fill="#c8383f"/>` +
    `<path d="M100,118a12,10 0 0 1 24,0z" fill="#c8383f"/>` +
    `<circle cx="112" cy="104" r="2.2" fill="#f5b31c"/>` +
    `<path d="M98,128a6,7 0 0 1 12,0v8h-12z" fill="#8a5a3a"/>` +
    // 谷底の石畳の通り
    `<path d="M0,192h400v18H0z" fill="#8a7a68"/>` +
    `<g fill="#7a6a58"><circle cx="30" cy="200" r="1.6"/><circle cx="80" cy="204" r="1.6"/><circle cx="140" cy="199" r="1.6"/><circle cx="200" cy="205" r="1.6"/><circle cx="255" cy="200" r="1.6"/><circle cx="310" cy="204" r="1.6"/></g>` +
    // 地下トンネルの坑口(右手前)
    `<path d="M330,210L330,168q30,-22 60,0L390,210z" fill="#6b5b50"/>` +
    `<path d="M338,210L338,174q22,-16 44,0L382,210z" fill="#241a10"/>` +
    `<circle cx="360" cy="180" r="3" fill="#f5b31c" opacity=".9"/>` +
    // 路地の石段(中央手前、通りへ降りてくる)
    `<g fill="#9a8a74" stroke="#7a6a58" stroke-width="1"><rect x="188" y="160" width="26" height="7"/><rect x="190" y="168" width="26" height="7"/><rect x="192" y="176" width="26" height="7"/><rect x="194" y="184" width="26" height="7"/></g>` +
    // パペルピカドと、流しの楽士たち(左手前)
    papelPicado(4, 148, 130, 142) +
    tinyPerson(40, 208, 22, "#2a2a3a") +
    `<path d="M44,198l8,-4" stroke="#8a5a3a" stroke-width="3" stroke-linecap="round"/>` +
    `<circle cx="53" cy="193" r="2.6" fill="#8a5a3a"/>` +
    tinyPerson(66, 209, 21, "#e8443f") +
    tinyPerson(96, 208, 20, "#5b8fe8") +
    // 窓辺の鉢花
    `<g fill="#e8443f"><circle cx="24" cy="172" r="2"/><circle cx="29" cy="171" r="2"/></g>` +
    `<rect x="22" y="174" width="10" height="4" fill="#8a5a3a"/>`,

  /**
   * 密林に呑まれた神殿。パレンケ。湿った緑にコケむした石、霧の帯。
   * 神殿は左、セイバは右。中央の帯は密林の幹(繰り返し)。
   */
  jungleruins:
    sky("#a4c4bc", "#dce8dc", 88) +
    ridge(88, [[50, 64], [110, 78], [180, 60], [250, 76], [320, 62], [400, 74]], "#6b9478", 0.9) +
    ground(88, "#3f6b3c") +
    // 霧(帯ではなく、ちぎれた綿状に)
    `<g fill="#dce8dc" opacity=".3"><ellipse cx="70" cy="98" rx="52" ry="7"/><ellipse cx="230" cy="106" rx="60" ry="6"/><ellipse cx="350" cy="96" rx="44" ry="6"/><ellipse cx="150" cy="130" rx="48" ry="5"/></g>` +
    // 中景の密林(中央の帯は繰り返し)
    jungleTree(160, 152, 66, "#2f5f38", "#3f7a44") +
    jungleTree(205, 150, 74, "#2f5f38", "#3f7a44") +
    jungleTree(250, 154, 62, "#2f5f38", "#3f7a44") +
    // 神殿(左)。基壇の上に石の祠と屋根飾り
    steppedPyramid(85, 172, 118, 70, 4, "#8a9478", "#6b7a5f", "#7a8a6b") +
    `<rect x="66" y="86" width="38" height="17" fill="#98a488"/>` +
    `<path d="M62,86h46l-9,-11h-28z" fill="#7a8a6b"/>` +
    `<rect x="74" y="68" width="22" height="8" fill="#8a9478" opacity=".9"/>` +
    `<g fill="#3a4a34"><rect x="72" y="92" width="7" height="11"/><rect x="82" y="92" width="7" height="11"/><rect x="92" y="92" width="7" height="11"/></g>` +
    // コケ
    `<g fill="#4f8a4f" opacity=".7"><circle cx="46" cy="150" r="5"/><circle cx="120" cy="132" r="4"/><circle cx="70" cy="112" r="3.5"/><circle cx="104" cy="163" r="4.5"/></g>` +
    // セイバの大樹(右)と垂れるツタ
    ceiba(342, 196, 104) +
    vine(310, 52) +
    vine(378, 44) +
    vine(16, 36) +
    // オオハシ(右の樹冠の縁)
    `<g><ellipse cx="384" cy="118" rx="6" ry="4.5" fill="#241a10"/><path d="M389,116q8,-1 9,3q-6,2 -9,0z" fill="#f5b31c"/><circle cx="386" cy="116" r="1" fill="#f6efe2"/></g>` +
    // 湿った石段(手前・左中)と、倒れた彫刻石
    `<g fill="#8a9478" stroke="#6b7a5f" stroke-width="1"><rect x="96" y="182" width="34" height="7"/><rect x="102" y="190" width="34" height="7"/><rect x="108" y="198" width="34" height="7"/></g>` +
    `<g fill="#4f8a4f" opacity=".6"><circle cx="104" cy="186" r="2.4"/><circle cx="120" cy="196" r="2.2"/></g>` +
    `<g><rect x="288" y="192" width="40" height="14" rx="2" fill="#98a488" transform="rotate(-7 308 199)"/>` +
    `<g stroke="#6b7a5f" stroke-width="1.4" fill="none"><circle cx="300" cy="198" r="3"/><path d="M310,194q5,4 0,8M318,195v6"/></g></g>` +
    // 立石(石碑)と赤い花
    `<g><rect x="252" y="176" width="10" height="26" rx="2" fill="#8a9478"/>` +
    `<g stroke="#6b7a5f" stroke-width="1.2" fill="none"><path d="M255,182h4M255,188q4,2 4,6"/></g></g>` +
    `<g fill="#e8443f"><circle cx="196" cy="200" r="2.2"/><circle cx="203" cy="204" r="2"/><circle cx="190" cy="205" r="2"/></g>` +
    `<circle cx="196" cy="206" r="6" fill="#4f8a4f" opacity=".8"/>` +
    // 樹冠からぶら下がるホエザル(左の木)
    `<g><path d="M262,104q6,10 0,18" stroke="#3a2a24" stroke-width="2.4" fill="none"/>` +
    `<ellipse cx="262" cy="128" rx="5" ry="7" fill="#3a2a24"/>` +
    `<circle cx="262" cy="118" r="3.6" fill="#3a2a24"/><circle cx="261" cy="118" r="1" fill="#e8c890"/>` +
    `<path d="M258,132l-3,5M266,132l3,5" stroke="#3a2a24" stroke-width="2"/></g>` +
    // シダ
    grassTuft(150, 208, "#4f8a4f") +
    grassTuft(230, 205, "#4f8a4f") +
    grassTuft(272, 209, "#4f8a4f") +
    grassTuft(330, 207, "#4f8a4f") +
    grassTuft(60, 205, "#4f8a4f") +
    grassTuft(20, 200, "#4f8a4f"),

  /**
   * 山頂を均した台地の町。モンテ・アルバン。乾いた土色の広場と低い基壇、
   * 手前に段々畑、遠くに盆地を囲む山なみ。
   */
  mountainvalley:
    sky("#9cc0dc", "#ecd8b0", 100) +
    sun(348, 36, 15, "#f5d060") +
    clouds(110, 32, 0.9) +
    bird(250, 40, 0.8) +
    ridge(100, [[70, 64], [150, 84], [240, 60], [330, 82], [400, 70]], "#8a7a9a") +
    ridge(100, [[50, 84], [140, 96], [260, 82], [360, 94], [400, 88]], "#a89a8a", 0.9) +
    ground(100, "#c0a070") +
    // 広場の低い基壇(中央の帯は繰り返し)
    platform(170, 136, 30, 9, "#b09468", "#8a7050") +
    platform(232, 136, 30, 9, "#b09468", "#8a7050") +
    platform(200, 152, 40, 10, "#b09468", "#8a7050") +
    // 大基壇(左右)
    steppedPyramid(72, 158, 104, 52, 3, "#b09468", "#8a7050", "#a08458") +
    steppedPyramid(334, 156, 92, 46, 3, "#b09468", "#8a7050", "#a08458") +
    // 広場の立石と低木
    `<rect x="270" y="128" width="7" height="18" rx="1.5" fill="#a09070"/>` +
    roundTree(148, 146, 8, "#7a9a54") +
    roundTree(258, 150, 7, "#7a9a54") +
    // 段々畑(手前の斜面)
    `<path d="M0,168Q100,160 200,166Q300,172 400,164L400,210L0,210z" fill="#a8bd6a"/>` +
    `<path d="M0,182Q120,174 240,180Q330,184 400,178" stroke="#8a9a54" stroke-width="2.4" fill="none"/>` +
    `<path d="M0,196Q140,190 280,194Q350,196 400,192" stroke="#8a9a54" stroke-width="2.4" fill="none"/>` +
    `<path d="M0,206Q160,202 320,206" stroke="#8a9a54" stroke-width="2.4" fill="none"/>` +
    // ダンサンテスの石板(手前の畑の縁。段々畑より後に描いて隠されないようにする)
    `<g><rect x="118" y="172" width="16" height="24" rx="2" fill="#9a9088"/>` +
    `<path d="M122,178q4,-3 7,0q2,3 -1,5q4,2 2,6q-3,3 -6,1" stroke="#6b6058" stroke-width="1.4" fill="none"/></g>` +
    `<g><rect x="142" y="176" width="14" height="20" rx="2" fill="#a29890"/>` +
    `<path d="M145,182q3,-3 6,0q-2,4 1,7" stroke="#6b6058" stroke-width="1.3" fill="none"/></g>` +
    // 畑の作物と木
    `<g fill="#7fa060"><circle cx="40" cy="176" r="3"/><circle cx="58" cy="175" r="3"/><circle cx="76" cy="177" r="3"/><circle cx="94" cy="176" r="3"/><circle cx="330" cy="172" r="3"/><circle cx="348" cy="171" r="3"/><circle cx="366" cy="173" r="3"/></g>` +
    `<g fill="#e8862f"><circle cx="34" cy="190" r="2.6"/><circle cx="48" cy="189" r="2.6"/><circle cx="62" cy="191" r="2.6"/><circle cx="76" cy="190" r="2.6"/></g>` +
    agavePlant(300, 200, 1.2) +
    agavePlant(376, 206, 1) +
    roundTree(20, 200, 12, "#5f8a4a") +
    tinyPerson(140, 208, 18, "#e8443f") +
    tinyPerson(260, 204, 17, "#f4c430"),

  /**
   * 急斜面の鉱山町。サカテカス。カンテラ(薔薇色の石)の町並みが斜面を
   * 這い上がり、左に巻き上げ櫓と坑口、谷を渡るロープウェイ。
   */
  silvertown:
    sky("#a0c4e0", "#e8d0c0", 84) +
    clouds(90, 30, 0.9) +
    // 右へ登る斜面
    `<path d="M0,84L140,66L280,44L400,30L400,84z" fill="#b08878"/>` +
    ground(84, "#a87868") +
    // ロープウェイ(谷を渡る)
    `<line x1="30" y1="48" x2="386" y2="118" stroke="#4a4a52" stroke-width="1.6"/>` +
    `<g fill="#e8443f"><rect x="104" y="62" width="12" height="9" rx="2"/><rect x="336" y="106" width="12" height="9" rx="2"/></g>` +
    `<g stroke="#4a4a52" stroke-width="1.2"><path d="M110,62v-4M342,106v-4"/></g>` +
    // 巻き上げ櫓と鉱山の建屋(左)
    headframe(56, 84, 46) +
    `<rect x="20" y="86" width="52" height="26" fill="#8a6a5a"/>` +
    `<rect x="26" y="92" width="10" height="8" fill="#4a3a30"/>` +
    `<rect x="48" y="92" width="10" height="8" fill="#4a3a30"/>` +
    // 上手の家並み(稜線ちかく、小さく)
    casita(296, 52, 20, 12, "#e0c0b0") +
    casita(322, 44, 20, 12, "#f6efe2") +
    casita(350, 38, 22, 12, "#d8a890") +
    casita(376, 46, 18, 11, "#c88a7a") +
    casita(250, 66, 20, 12, "#e0c0b0") +
    casita(276, 58, 20, 12, "#d8a890") +
    // 中腹の教会(カンテラ色の塔とドーム)
    `<rect x="300" y="96" width="34" height="30" fill="#c88a7a"/>` +
    `<rect x="306" y="76" width="10" height="22" fill="#c88a7a"/>` +
    `<path d="M305,76h12l-6,-8z" fill="#a86a5a"/>` +
    `<path d="M318,96a9,8 0 0 1 18,0z" fill="#a86a5a"/>` +
    `<rect x="308" y="106" width="7" height="10" fill="#5a3a30"/>` +
    // 町並み(中腹〜谷底)
    casita(150, 96, 24, 15, "#e0c0b0") +
    casita(180, 104, 24, 15, "#f6efe2") +
    casita(212, 98, 24, 15, "#d8a890") +
    casita(240, 110, 24, 15, "#e0c0b0") +
    casita(160, 122, 26, 16, "#c88a7a") +
    casita(192, 128, 26, 16, "#e0c0b0") +
    casita(226, 132, 26, 16, "#f6efe2") +
    casita(96, 116, 26, 16, "#d8a890") +
    casita(64, 130, 26, 16, "#e0c0b0") +
    casita(120, 140, 26, 16, "#f6efe2") +
    casita(340, 130, 28, 17, "#e0c0b0") +
    casita(372, 142, 26, 16, "#d8a890") +
    // 坑口(左手前)。木枠のアーチ
    `<path d="M14,206L14,176q18,-16 36,0L50,206z" fill="#5a4638"/>` +
    `<path d="M20,206L20,180q12,-10 24,0L44,206z" fill="#241a10"/>` +
    `<rect x="10" y="172" width="44" height="5" fill="#6b5544"/>` +
    // トロッコの線路と、銀袋を運ぶロバ(手前)
    `<g stroke="#6b6058" stroke-width="1.6"><path d="M14,204h84M14,208h84"/></g>` +
    `<g><ellipse cx="150" cy="196" rx="13" ry="7" fill="#9a8a80"/>` +
    `<rect x="138" y="196" width="3" height="10" fill="#9a8a80"/><rect x="158" y="196" width="3" height="10" fill="#9a8a80"/>` +
    `<path d="M162,192q6,-2 7,-7" stroke="#9a8a80" stroke-width="3.4" fill="none"/>` +
    `<circle cx="170" cy="184" r="4" fill="#9a8a80"/>` +
    `<path d="M168,180l-1,-4M172,180l1,-4" stroke="#9a8a80" stroke-width="1.6"/>` +
    `<rect x="142" y="186" width="8" height="7" rx="1.4" fill="#e8e0d0"/>` +
    `<rect x="152" y="186" width="8" height="7" rx="1.4" fill="#e8e0d0"/></g>` +
    tinyPerson(186, 207, 20, "#5b8fe8") +
    grassTuft(230, 206, "#8a8468") +
    grassTuft(300, 208, "#8a8468"),

  /**
   * 石畳の広場と大聖堂。モレリア。カンテラ・ロサの双塔、
   * ポルターレスのアーケード、風船売りと散歩の人々。
   */
  colonialplaza:
    sky("#8fc4e8", "#cfe4f0", 118) +
    clouds(210, 30, 1) +
    bird(160, 46, 0.8) +
    ground(118, "#c0a494") +
    // 大聖堂(左)。双塔+ドーム
    `<rect x="24" y="76" width="106" height="42" fill="#d8a88a"/>` +
    `<rect x="30" y="30" width="22" height="50" fill="#d8a88a"/>` +
    `<rect x="102" y="30" width="22" height="50" fill="#d8a88a"/>` +
    `<path d="M28,30h26l-13,-14z" fill="#7a9a8a"/>` +
    `<path d="M100,30h26l-13,-14z" fill="#7a9a8a"/>` +
    `<g fill="#8a6a58"><rect x="36" y="38" width="10" height="14" rx="4"/><rect x="108" y="38" width="10" height="14" rx="4"/></g>` +
    `<path d="M62,76a15,13 0 0 1 30,0z" fill="#7a9a8a"/>` +
    `<circle cx="77" cy="94" r="6" fill="#8a6a58"/>` +
    `<path d="M68,118v-16a9,9 0 0 1 18,0v16z" fill="#8a6a58"/>` +
    `<g stroke="#b08a6f" stroke-width="1.4"><path d="M24,86h106M24,108h106"/></g>` +
    // アーケード(右)
    arcade(266, 170, 4, 33, 52) +
    `<g fill="#c8836a"><rect x="272" y="122" width="12" height="9"/><rect x="304" y="122" width="12" height="9"/><rect x="336" y="122" width="12" height="9"/><rect x="368" y="122" width="12" height="9"/></g>` +
    // 広場の石畳の目地
    `<g stroke="#a88a7c" stroke-width="1.2" opacity=".7"><path d="M0,140h400M0,166h400M0,192h400"/></g>` +
    // 噴水(中央手前。水盤と水柱)
    `<g><ellipse cx="200" cy="194" rx="26" ry="8" fill="#8a7a6c"/>` +
    `<ellipse cx="200" cy="192" rx="20" ry="6" fill="#5b8fe8"/>` +
    `<rect x="197" y="178" width="6" height="12" fill="#8a7a6c"/>` +
    `<path d="M200,178q-6,-8 -2,-12M200,178q6,-8 2,-12" stroke="#bfe8f4" stroke-width="2" fill="none"/></g>` +
    // 街灯(ファロル)
    `<g><rect x="160" y="176" width="2.6" height="26" fill="#3a3a42"/><rect x="156" y="170" width="10" height="8" rx="2" fill="#f5b31c"/><path d="M155,170h12" stroke="#3a3a42" stroke-width="2"/></g>` +
    `<g><rect x="244" y="178" width="2.6" height="24" fill="#3a3a42"/><rect x="240" y="172" width="10" height="8" rx="2" fill="#f5b31c"/><path d="M239,172h12" stroke="#3a3a42" stroke-width="2"/></g>` +
    // 花壇
    `<g fill="#c8384f"><circle cx="106" cy="188" r="3"/><circle cx="114" cy="186" r="3"/><circle cx="122" cy="189" r="3"/></g>` +
    `<rect x="100" y="190" width="30" height="4" fill="#8a7a6c"/>` +
    // 刈り込んだ月桂樹の並木(手前の帯)
    roundTree(178, 210, 13, "#3f7a44") +
    roundTree(224, 212, 13, "#3f7a44") +
    // エロテ(焼きトウモロコシ)の屋台
    `<g><rect x="300" y="188" width="26" height="14" fill="#f6efe2"/>` +
    `<circle cx="305" cy="204" r="3.4" fill="#4a4a52"/><circle cx="321" cy="204" r="3.4" fill="#4a4a52"/>` +
    `<path d="M298,188a15,8 0 0 1 30,0z" fill="#e8443f"/>` +
    `<rect x="306" y="180" width="3" height="8" fill="#8a6a44"/>` +
    `<g fill="#f4c430"><ellipse cx="306" cy="192" rx="2" ry="3.4"/><ellipse cx="312" cy="192" rx="2" ry="3.4"/><ellipse cx="318" cy="192" rx="2" ry="3.4"/></g></g>` +
    // キオスコ(音楽堂。手前・左)
    `<g><path d="M40,182a22,10 0 0 1 44,0z" fill="#3f6b4f"/>` +
    `<rect x="44" y="182" width="3" height="22" fill="#4a4a52"/><rect x="60" y="182" width="3" height="22" fill="#4a4a52"/><rect x="76" y="182" width="3" height="22" fill="#4a4a52"/>` +
    `<rect x="40" y="204" width="44" height="4" fill="#8a7a6c"/></g>` +
    // 風船売り(右手前)
    `<g><g stroke="#8a7a6c" stroke-width="1"><path d="M352,176l4,14M360,172l0,18M368,178l-4,12"/></g>` +
    `<circle cx="352" cy="172" r="5" fill="#e8443f"/><circle cx="360" cy="166" r="5" fill="#f4c430"/><circle cx="368" cy="173" r="5" fill="#5b8fe8"/>` +
    tinyPerson(363, 208, 20, "#f6efe2") +
    `</g>` +
    // 散歩の人々と鳩
    tinyPerson(130, 206, 21, "#e8443f") +
    tinyPerson(148, 209, 19, "#5b8fe8") +
    tinyPerson(250, 207, 20, "#f4c430") +
    `<g fill="#8a8a92"><ellipse cx="200" cy="200" rx="3.4" ry="2.4"/><ellipse cx="212" cy="204" rx="3" ry="2.2"/></g>`,

  /**
   * 高原の畑と、遠くの雪をかぶった火山。プエブラ。
   * ポポカテペトルの円錐は右、畑と農家は手前。
   */
  volcanicvalley:
    sky("#a8d0ec", "#f0e4c8", 150) +
    clouds(80, 34, 1) +
    bird(140, 60, 0.8) +
    // 遠い山なみと、双子の火山
    ridge(150, [[60, 122], [150, 134], [250, 120], [340, 132], [400, 124]], "#9a8ba0", 0.9) +
    `<path d="M14,150L64,98L118,150z" fill="#8a7a84"/>` +
    `<path d="M52,110L64,98L76,110L70,116L58,116z" fill="#f2f6f8"/>` +
    `<path d="M238,150L318,46L396,150z" fill="#7a6a72"/>` +
    `<path d="M301,68L318,46L336,68L328,76L310,74z" fill="#f2f6f8"/>` +
    `<g fill="#c8ccc4" opacity=".8"><ellipse cx="326" cy="36" rx="10" ry="5"/><ellipse cx="338" cy="30" rx="7" ry="4"/></g>` +
    ground(150, "#a8bd6a") +
    // 畑(トウモロコシの列と、色の違う区画)
    `<path d="M0,168h180l-10,42H0z" fill="#8fae63"/>` +
    `<path d="M230,164h170v46H250z" fill="#c8b478"/>` +
    `<g stroke="#6b8a4a" stroke-width="1.8"><path d="M14,176v10M34,176v10M54,176v10M74,176v10M94,176v10M114,176v10M134,176v10"/></g>` +
    `<g stroke="#6b8a4a" stroke-width="1.8"><path d="M20,192v12M44,192v12M68,192v12M92,192v12M116,192v12"/></g>` +
    `<g stroke="#a89050" stroke-width="2" opacity=".8"><path d="M260,176h130M266,190h128M272,204h124"/></g>` +
    // 農家(左)と村の教会
    `<rect x="30" y="152" width="40" height="18" fill="#f6efe2"/>` +
    `<path d="M25,152h50l-8,-11h-34z" fill="#c8383f"/>` +
    `<rect x="44" y="158" width="9" height="12" fill="#6b4a2a"/>` +
    `<g><rect x="96" y="150" width="26" height="16" fill="#e8dcc0"/>` +
    `<rect x="102" y="136" width="9" height="16" fill="#e8dcc0"/>` +
    `<path d="M101,136h11l-5.5,-7z" fill="#c8383f"/>` +
    `<path d="M106.5,126v5M104,128.5h5" stroke="#8a7a68" stroke-width="1.4"/></g>` +
    // 柵と羊
    `<g stroke="#8a6a44" stroke-width="2"><path d="M150,160v10M170,158v10M190,160v10M150,162h40"/></g>` +
    `<g><ellipse cx="206" cy="164" rx="7" ry="4.6" fill="#e8e0d0"/><circle cx="212" cy="161" r="2.6" fill="#4a4038"/><path d="M202,168v4M209,168v4" stroke="#4a4038" stroke-width="1.4"/></g>` +
    `<g><ellipse cx="224" cy="167" rx="6" ry="4" fill="#e8e0d0"/><circle cx="229" cy="164" r="2.4" fill="#4a4038"/><path d="M221,171v3M227,171v3" stroke="#4a4038" stroke-width="1.4"/></g>` +
    // センパスチル(マリーゴールド)の帯
    `<g fill="#e8862f"><circle cx="196" cy="186" r="3"/><circle cx="208" cy="188" r="3"/><circle cx="220" cy="186" r="3"/><circle cx="232" cy="188" r="3"/><circle cx="244" cy="186" r="3"/></g>` +
    agavePlant(210, 206, 1.3) +
    agavePlant(238, 210, 1.1) +
    // 農夫とロバ(右手前)
    tinyPerson(320, 204, 20, "#f6efe2") +
    `<ellipse cx="320" cy="185" rx="11" ry="4" fill="#e8dcc0" opacity=".5"/>` +
    `<path d="M312,196l-6,-4" stroke="#8a6a44" stroke-width="2"/>` +
    tinyPerson(354, 208, 19, "#e8443f") +
    grassTuft(160, 206, "#7fa060") +
    grassTuft(288, 208, "#a89050") +
    bird(310, 66, 0.7),

  /**
   * 乾いた平原の国境。フェンスが斜めに横切り、左に検問所、右に倉庫群。
   * 白茶けた砂の色で、暑さを出す。
   */
  desertborder:
    sky("#b8d4e0", "#f0dcb0", 110) +
    sun(368, 38, 20, "#f8e8c0") +
    // 熱の霞
    `<g stroke="#f0dcb0" stroke-width="2" opacity=".5" fill="none"><path d="M40,96q10,-3 20,0t20,0M240,90q10,-3 20,0t20,0"/></g>` +
    // 台地状の丘(メサ)
    ridge(110, [[50, 88], [92, 88], [102, 98], [170, 98], [200, 82], [246, 82], [258, 98], [400, 98]], "#c09878") +
    ground(110, "#d8bc8a") +
    // 国境フェンス(左奥から右手前へ)
    `<g stroke="#a05a3a" stroke-width="2"><path d="M30,132L390,164M30,158L390,190"/></g>` +
    `<g stroke="#a05a3a" stroke-width="2.6">` +
    `<path d="M30,132v26M55,134.3v26M80,136.5v26M105,138.8v26M130,141v26M155,143.3v26M180,145.5v26M205,147.8v26M230,150v26M255,152.3v26M280,154.5v26M305,156.8v26M330,159v26M355,161.3v26M380,163.5v26"/>` +
    `</g>` +
    // 検問所(左)。ゲートの腕木
    `<rect x="34" y="112" width="34" height="24" fill="#f6efe2"/>` +
    `<rect x="30" y="108" width="42" height="6" fill="#c8383f"/>` +
    `<rect x="42" y="120" width="10" height="8" fill="#20364a"/>` +
    `<rect x="72" y="116" width="4" height="22" fill="#6b6058"/>` +
    `<path d="M76,118l30,-4" stroke="#e8443f" stroke-width="4"/>` +
    `<path d="M76,118l30,-4" stroke="#f6efe2" stroke-width="4" stroke-dasharray="6 6"/>` +
    // 道路(検問所を抜ける)
    `<path d="M40,210L52,138h20L96,210z" fill="#a89a84"/>` +
    `<path d="M68,206L64,144" stroke="#f6efe2" stroke-width="2" stroke-dasharray="7 7" opacity=".8"/>` +
    // 倉庫群(右)
    `<rect x="286" y="128" width="58" height="30" fill="#b0a898"/>` +
    `<path d="M282,128h66l-8,-10h-50z" fill="#8a8274"/>` +
    `<rect x="350" y="134" width="44" height="26" fill="#c0b4a4"/>` +
    `<path d="M347,134h50l-7,-9h-36z" fill="#9a9284"/>` +
    `<g stroke="#8a8274" stroke-width="1.4"><path d="M294,132v24M306,132v24M318,132v24M330,132v24M358,138v20M370,138v20M382,138v20"/></g>` +
    // トレーラー(手前の道)
    `<g><rect x="196" y="188" width="52" height="18" rx="2" fill="#e8e0d0"/>` +
    `<rect x="246" y="192" width="18" height="14" fill="#c8383f"/>` +
    `<circle cx="208" cy="208" r="4" fill="#2a2a2a"/><circle cx="234" cy="208" r="4" fill="#2a2a2a"/><circle cx="256" cy="208" r="4" fill="#2a2a2a"/>` +
    `<rect x="248" y="195" width="7" height="6" fill="#20364a"/></g>` +
    // 送電線の柱(平原を渡る)
    `<g stroke="#8a7a68" stroke-width="2"><path d="M140,124v-22M140,104h-8M140,108h8M250,128v-20M250,110h-7M250,114h7"/></g>` +
    `<path d="M132,105q55,6 111,6" stroke="#8a7a68" stroke-width="1" fill="none" opacity=".8"/>` +
    // 給水タンクと標識
    `<g><ellipse cx="118" cy="122" rx="12" ry="7" fill="#b0a898"/><g stroke="#8a8274" stroke-width="2"><path d="M110,128v12M126,128v12"/></g></g>` +
    `<g><rect x="152" y="180" width="3" height="20" fill="#8a8274"/><rect x="142" y="172" width="24" height="10" rx="1.6" fill="#3f7a4f"/><rect x="146" y="175" width="16" height="2" fill="#f6efe2"/><rect x="146" y="179" width="10" height="1.6" fill="#f6efe2"/></g>` +
    // フェンスの柱にとまるノスリと、転がるタンブルウィード
    `<g><ellipse cx="330" cy="154" rx="4.4" ry="5.4" fill="#4a4038"/><circle cx="330" cy="147" r="2.8" fill="#4a4038"/><path d="M332,147q4,0 5,2q-3,1 -5,0z" fill="#c8863f"/></g>` +
    `<g stroke="#b09a6a" stroke-width="1.4" fill="none"><circle cx="196" cy="200" r="7"/><path d="M191,196l10,8M201,196l-10,8M196,193v14"/></g>` +
    // 乾いた植生
    cardon(20, 206, 32) +
    cardon(160, 202, 22, "#5f8a5f") +
    nopal(316, 208, 1) +
    grassTuft(120, 204, "#b09a6a") +
    grassTuft(300, 200, "#b09a6a") +
    grassTuft(376, 206, "#b09a6a") +
    grassTuft(56, 200, "#b09a6a") +
    bird(150, 60, 0.8) +
    bird(180, 50, 0.7),

  /**
   * 深い峡谷と、その底を流れる川。スミデロ峡谷(チアパ・デ・コルソ)。
   * 石灰岩の高い壁に緑が張りつき、川面を観光のランチャ(渡し船)が行く。
   * 「クリスマスツリー」と呼ばれるコケの滝を左壁に置く。
   */
  canyon:
    sky("#a4c8e4", "#dce8dc", 60) +
    bird(120, 30, 0.9) +
    bird(156, 22, 0.7) +
    ground(60, "#8a9078") +
    // 谷底へ落ちる石灰岩の壁(左右から中央の谷へ)。緑がかった灰色の段
    `<path d="M0,60L150,60L120,110L0,116z" fill="#a0a888"/>` +
    `<path d="M0,116L120,110L102,158L0,164z" fill="#8a9478"/>` +
    `<path d="M0,164L102,158L88,210L0,210z" fill="#a8b090"/>` +
    `<path d="M400,60L250,60L280,110L400,116z" fill="#a0a888"/>` +
    `<path d="M400,116L280,110L296,158L400,164z" fill="#8a9478"/>` +
    `<path d="M400,164L296,158L310,210L400,210z" fill="#a8b090"/>` +
    // 崖の地層(左右の岩壁に横縞)
    `<g stroke="#6b7a5f" stroke-width="1.8" opacity=".7"><path d="M0,84h140M0,140h110M0,186h96M400,84h-140M400,140h-110M400,186h-96"/></g>` +
    `<g stroke="#c8ccb4" stroke-width="1.4" opacity=".6"><path d="M0,102h132M0,164h102M400,102h-132M400,164h-102"/></g>` +
    // 谷(中央)。奥は影の壁
    `<path d="M120,60h160L310,210H88z" fill="#5f6b52"/>` +
    `<path d="M150,60h100L270,210H128z" fill="#4a5540"/>` +
    // 谷壁の中の岩棚
    `<g stroke="#6b7a5f" stroke-width="1.6" opacity=".8"><path d="M126,100l24,4M260,104l-24,4"/></g>` +
    // 「クリスマスツリー」のコケの滝(左壁)。上から下へ広がる緑の棚と水すじ
    `<g><path d="M138,80q-2,30 -2,60q0,30 4,56" stroke="#7fb8d8" stroke-width="4" fill="none" opacity=".85"/>` +
    `<g fill="#4f8a4f"><ellipse cx="137" cy="96" rx="9" ry="4"/><ellipse cx="136" cy="116" rx="12" ry="5"/><ellipse cx="135" cy="138" rx="15" ry="6"/><ellipse cx="136" cy="162" rx="18" ry="7"/><ellipse cx="138" cy="186" rx="21" ry="8"/></g>` +
    `<g fill="#6faa5f"><ellipse cx="134" cy="106" rx="7" ry="3"/><ellipse cx="133" cy="128" rx="9" ry="3.6"/><ellipse cx="133" cy="150" rx="11" ry="4.4"/><ellipse cx="134" cy="174" rx="13" ry="5"/></g></g>` +
    // 川(谷底いっぱいに)
    `<path d="M150,210L166,120h68L250,210z" fill="#3f7fae"/>` +
    `<path d="M162,150L240,150" stroke="#356f9a" stroke-width="2" opacity=".7"/>` +
    `<g stroke="#7fb8d8" stroke-width="1.8" opacity=".8"><path d="M178,178q10,-3 20,0M190,196q12,-3 24,0M172,160q8,-2 16,0"/></g>` +
    // 観光のランチャ(手前の川面)。緑の日除けに観光客の列
    `<g><path d="M168,196c12,-5 44,-5 56,0l-6,8h-44z" fill="#f6efe2"/>` +
    `<rect x="174" y="182" width="44" height="4" rx="2" fill="#3f8f4f"/>` +
    `<g stroke="#3f8f4f" stroke-width="1.6"><path d="M178,186v6M214,186v6"/></g>` +
    `<g fill="#c98a5f"><circle cx="182" cy="192" r="2.6"/><circle cx="190" cy="192" r="2.6"/><circle cx="198" cy="192" r="2.6"/><circle cx="206" cy="192" r="2.6"/></g>` +
    `<path d="M224,198q6,-4 4,-10" stroke="#7fb8d8" stroke-width="2" fill="none"/></g>` +
    // 岩棚の木と茂み(緑の壁)
    fir(36, 70, 24, "#3f6b3f") +
    fir(74, 66, 20, "#3f6b3f") +
    fir(330, 68, 22, "#3f6b3f") +
    fir(366, 74, 26, "#3f6b3f") +
    roundTree(20, 132, 9, "#4f8a4f") +
    roundTree(388, 134, 9, "#4f8a4f") +
    `<g fill="#5f8a4a"><circle cx="58" cy="126" r="4"/><circle cx="342" cy="128" r="4"/><circle cx="30" cy="180" r="4.4"/><circle cx="374" cy="184" r="4.4"/><circle cx="98" cy="170" r="4"/><circle cx="304" cy="172" r="4"/></g>` +
    // 川辺のシラサギ(右手前の岩)
    `<g><path d="M330,196l6,-8l8,2l3,8z" fill="#c8ccb4" stroke="#a8ac94" stroke-width="1"/>` +
    `<path d="M340,188L340,176" stroke="#e8e0d0" stroke-width="2.2"/>` +
    `<circle cx="340" cy="173" r="3" fill="#e8e0d0"/>` +
    `<path d="M343,172q4,0 5,2q-3,1 -5,0z" fill="#e8a03f"/></g>`,

  /**
   * 操車場と機関庫。アグアスカリエンテス。赤煉瓦の扇形庫と給水塔、
   * 貨車の列、手前に何本も並ぶ線路。
   */
  railyard:
    sky("#9cc0d8", "#e0d8c8", 118) +
    `<g opacity=".5" fill="#c8ccc4"><ellipse cx="60" cy="46" rx="24" ry="10"/><ellipse cx="90" cy="36" rx="16" ry="7"/></g>` +
    ground(118, "#9a9484") +
    // 機関庫(左)。赤煉瓦、アーチの大扉
    `<rect x="8" y="76" width="150" height="66" fill="#9a4a3a"/>` +
    `<path d="M4,76h158l-10,-14H14z" fill="#6b3a2e"/>` +
    `<g fill="#c8b8a8"><rect x="20" y="84" width="12" height="8"/><rect x="44" y="84" width="12" height="8"/><rect x="68" y="84" width="12" height="8"/><rect x="92" y="84" width="12" height="8"/><rect x="116" y="84" width="12" height="8"/><rect x="140" y="84" width="12" height="8"/></g>` +
    `<g fill="#3a2a24"><path d="M18,142v-30a14,14 0 0 1 28,0v30z"/><path d="M62,142v-30a14,14 0 0 1 28,0v30z"/><path d="M106,142v-30a14,14 0 0 1 28,0v30z"/></g>` +
    // 庫内の機関車の鼻先(2番の扉)
    `<circle cx="76" cy="126" r="10" fill="#2a2a2a"/>` +
    `<circle cx="76" cy="126" r="4" fill="#4a4a52"/>` +
    `<rect x="66" y="136" width="20" height="6" fill="#2a2a2a"/>` +
    // 煙突(左奥)
    `<rect x="34" y="46" width="10" height="30" fill="#7a3a2e"/>` +
    // 給水塔(右)
    `<g><rect x="344" y="88" width="34" height="26" rx="4" fill="#8a7a68"/>` +
    `<path d="M342,88h38l-6,-8h-26z" fill="#6b5e50"/>` +
    `<g stroke="#6b5e50" stroke-width="2"><path d="M350,114v30M372,114v30"/></g>` +
    `<path d="M352,102q-8,4 -8,12" stroke="#4a4a52" stroke-width="2.4" fill="none"/></g>` +
    // 貨車の列(中〜右。中央の帯は繰り返し)
    boxcar(160, 126, 44, "#8a5a3a") +
    boxcar(208, 126, 44, "#7a4a5a") +
    boxcar(256, 126, 44, "#5f6b52") +
    boxcar(304, 126, 40, "#8a5a3a") +
    // 線路(手前に2本)
    `<g fill="#6b5e50"><rect x="0" y="160" width="400" height="4"/><rect x="0" y="186" width="400" height="4"/></g>` +
    `<g fill="#4a4038"><rect x="8" y="158" width="6" height="8"/><rect x="48" y="158" width="6" height="8"/><rect x="88" y="158" width="6" height="8"/><rect x="128" y="158" width="6" height="8"/><rect x="168" y="158" width="6" height="8"/><rect x="208" y="158" width="6" height="8"/><rect x="248" y="158" width="6" height="8"/><rect x="288" y="158" width="6" height="8"/><rect x="328" y="158" width="6" height="8"/><rect x="368" y="158" width="6" height="8"/></g>` +
    `<g stroke="#b0a494" stroke-width="2"><path d="M0,159h400M0,165h400"/></g>` +
    `<g fill="#4a4038"><rect x="28" y="184" width="6" height="8"/><rect x="68" y="184" width="6" height="8"/><rect x="108" y="184" width="6" height="8"/><rect x="148" y="184" width="6" height="8"/><rect x="188" y="184" width="6" height="8"/><rect x="228" y="184" width="6" height="8"/><rect x="268" y="184" width="6" height="8"/><rect x="308" y="184" width="6" height="8"/><rect x="348" y="184" width="6" height="8"/><rect x="388" y="184" width="6" height="8"/></g>` +
    `<g stroke="#b0a494" stroke-width="2"><path d="M0,185h400M0,191h400"/></g>` +
    // 煙突の煙と電信柱
    `<g opacity=".55" fill="#c8ccc4"><ellipse cx="46" cy="40" rx="9" ry="4.4"/><ellipse cx="58" cy="33" rx="6" ry="3.4"/></g>` +
    `<g stroke="#6b5e50" stroke-width="2"><path d="M196,150v-34M196,118h-9M196,123h9M320,152v-32M320,122h-8M320,127h8"/></g>` +
    `<path d="M187,119q66,4 125,4" stroke="#6b5e50" stroke-width="1" fill="none" opacity=".8"/>` +
    // 石炭の山
    `<g fill="#2a2a2e"><path d="M180,210l9,-12l10,5l8,-7l11,14z"/><circle cx="190" cy="203" r="2"/><circle cx="205" cy="205" r="2"/></g>` +
    // 信号機と、荷車を押す作業員(手前)
    `<g><rect x="230" y="196" width="3" height="14" fill="#4a4a52"/><circle cx="231.5" cy="194" r="3.4" fill="#e8443f"/></g>` +
    tinyPerson(300, 209, 20, "#2f6ea8") +
    `<path d="M306,200l10,2" stroke="#c98a5f" stroke-width="2.4"/>` +
    `<rect x="314" y="198" width="16" height="8" fill="#8a6a44"/>` +
    `<circle cx="318" cy="208" r="3" fill="#2a2a2a"/><circle cx="327" cy="208" r="3" fill="#2a2a2a"/>` +
    `<g fill="#6b5e50"><rect x="60" y="200" width="8" height="10" rx="2"/><rect x="70" y="202" width="8" height="8" rx="2"/></g>`,

  /**
   * 太平洋岸の港。マンサニーヨ。クレーンとコンテナ、漁船、
   * マレコン(海岸通り)の椰子並木。
   */
  pacificport:
    sky("#8fc4e8", "#f4d8b0", 100) +
    sun(52, 44, 17, "#f5b31c") +
    bird(240, 40, 0.9) +
    bird(270, 52, 0.7) +
    // 岬(右の水平線)と灯台
    `<path d="M300,100L344,80L400,90L400,100z" fill="#4a6b52"/>` +
    `<g><rect x="338" y="64" width="7" height="18" fill="#f6efe2"/><rect x="337" y="60" width="9" height="5" fill="#c8383f"/><circle cx="341.5" cy="62" r="1.6" fill="#f5b31c"/></g>` +
    `<rect x="0" y="100" width="400" height="70" fill="#2f6ea8"/>` +
    ripples(120) +
    ripples(146, "#7fb8d8") +
    // 沖の貨物船(左)。喫水を水平線に沈める
    `<g><rect x="60" y="94" width="64" height="12" rx="2" fill="#c8383f"/>` +
    `<rect x="70" y="86" width="30" height="9" fill="#f6efe2"/>` +
    `<g fill="#5b8fe8"><rect x="102" y="88" width="8" height="6"/><rect x="112" y="88" width="8" height="6"/></g></g>` +
    // 埠頭とクレーン(左)。岸壁は手前の道まで続く
    `<path d="M0,120h150v50H0z" fill="#8a8478"/>` +
    `<g stroke="#7a7468" stroke-width="1.4" opacity=".8"><path d="M0,134h150M0,152h150"/></g>` +
    crane(30, 120, 52) +
    crane(74, 120, 40) +
    // コンテナの山(岸壁の上)
    `<g><rect x="10" y="150" width="26" height="10" fill="#e8443f"/><rect x="38" y="150" width="26" height="10" fill="#5b8fe8"/><rect x="10" y="140" width="26" height="10" fill="#f4c430"/><rect x="38" y="140" width="26" height="10" fill="#3f8f4f"/><rect x="66" y="150" width="26" height="10" fill="#e88a3f"/></g>` +
    // ブイ(右の水面)
    `<g><path d="M368,148l4,-8l4,8z" fill="#e8443f"/><circle cx="372" cy="139" r="1.6" fill="#f5b31c"/></g>` +
    // 漁船(右の水面)
    `<g><path d="M266,158c8,-4 26,-4 34,0l-4,7h-26z" fill="#f6efe2"/>` +
    `<rect x="280" y="144" width="3" height="14" fill="#8a6a44"/>` +
    `<path d="M283,146l12,8" stroke="#e8443f" stroke-width="2"/></g>` +
    `<g><path d="M318,166c7,-3 21,-3 28,0l-3,6h-22z" fill="#5b8fe8"/>` +
    `<rect x="329" y="154" width="3" height="12" fill="#8a6a44"/></g>` +
    // マレコン(手前)
    ground(170, "#c8a878") +
    `<path d="M0,170h400v6H0z" fill="#b09468"/>` +
    palm(140, 210, 42, -7) +
    palm(238, 212, 46, 8) +
    palm(330, 210, 44, -6) +
    palm(384, 212, 38, 6) +
    // ボラード(係船柱)とペリカン(左手前)
    `<rect x="36" y="184" width="10" height="14" rx="3" fill="#4a4a52"/>` +
    `<g><ellipse cx="41" cy="178" rx="7" ry="5" fill="#8a7a68"/>` +
    `<circle cx="47" cy="172" r="3.4" fill="#e8e0d0"/>` +
    `<path d="M50,172q9,1 10,4q-6,2 -10,0z" fill="#e8a03f"/></g>` +
    tinyPerson(84, 208, 20, "#e8443f") +
    tinyPerson(196, 209, 19, "#f6efe2") +
    grassTuft(292, 206, "#a89050"),

  /**
   * メキシコ湾岸の港。ベラクルス。緑がかった湾、旧税関風の白い建物と
   * 時計塔、荷揚げ場のコーヒー袋。
   */
  gulfport:
    sky("#9cc4dc", "#e8e0c8", 96) +
    clouds(60, 34, 1) +
    bird(180, 40, 0.9) +
    bird(210, 30, 0.7) +
    bird(150, 52, 0.6) +
    // 沖の要塞(サン・フアン・デ・ウルア風)
    `<g fill="#b0a078"><rect x="24" y="82" width="60" height="14"/><rect x="30" y="74" width="12" height="10"/><rect x="66" y="74" width="12" height="10"/></g>` +
    `<rect x="0" y="96" width="400" height="66" fill="#2f8a84"/>` +
    ripples(112, "#7fd0c8") +
    ripples(138, "#5fb0a8") +
    // 貨物船(左)
    `<g><rect x="52" y="112" width="76" height="16" rx="2" fill="#2a3a4a"/>` +
    `<rect x="52" y="112" width="76" height="5" fill="#c8383f"/>` +
    `<rect x="66" y="100" width="34" height="13" fill="#f6efe2"/>` +
    `<rect x="104" y="102" width="8" height="11" fill="#e8a03f"/></g>` +
    // 旧税関(右)。アーケードと時計塔
    arcade(282, 160, 3, 36, 44) +
    `<rect x="254" y="94" width="24" height="66" fill="#f0e4d0"/>` +
    `<path d="M251,94h30l-15,-14z" fill="#c8836a"/>` +
    `<circle cx="266" cy="112" r="7" fill="#f6efe2" stroke="#8a7a68" stroke-width="1.6"/>` +
    `<path d="M266,112l0,-4M266,112l3,2" stroke="#4a4a52" stroke-width="1.3"/>` +
    // 岸壁(手前)
    ground(162, "#b0a088") +
    `<path d="M0,162h400v6H0z" fill="#98876f"/>` +
    // ボラードと係船ロープ
    `<g fill="#4a4a52"><rect x="30" y="172" width="9" height="12" rx="3"/><rect x="130" y="176" width="9" height="12" rx="3"/></g>` +
    `<path d="M39,176q46,14 91,4" stroke="#8a7a5f" stroke-width="2.4" fill="none"/>` +
    // コーヒー袋の山と手押し車(左手前)
    `<g fill="#c8a870" stroke="#a8885f" stroke-width="1"><path d="M52,200a9,7 0 0 1 18,0l-2,6h-14z"/><path d="M70,202a9,7 0 0 1 18,0l-2,5h-14z"/><path d="M61,192a9,7 0 0 1 18,0l-2,6h-14z"/></g>` +
    `<g><rect x="104" y="196" width="22" height="4" fill="#8a5a3a"/><circle cx="112" cy="204" r="4" fill="#2a2a2a"/><path d="M126,198l10,-6" stroke="#8a5a3a" stroke-width="2.4"/></g>` +
    // 荷役のクレーン(岸壁の際)。フックに木箱を吊る
    crane(140, 162, 44, "#8a7a5f") +
    `<rect x="160" y="140" width="13" height="11" fill="#a8885f"/>` +
    `<g stroke="#6b5e50" stroke-width="1"><path d="M160,140l6,-4l7,4"/></g>` +
    // マレコンの椰子
    palm(238, 210, 40, 6) +
    palm(388, 208, 36, -6) +
    // ダンソンを踊るふたり(右手前)
    `<g>` +
    tinyPerson(306, 206, 21, "#f6efe2") +
    tinyPerson(322, 207, 20, "#c8383f") +
    `<path d="M310,193l8,-2" stroke="#c98a5f" stroke-width="2.2"/>` +
    `<path d="M318,194l-4,-3" stroke="#c98a5f" stroke-width="2.2"/>` +
    `</g>` +
    tinyPerson(150, 209, 21, "#f6efe2") +
    tinyPerson(230, 208, 20, "#5b8fe8") +
    // 手前の鳥(岸壁のカモメ)
    `<g><circle cx="330" cy="196" r="4" fill="#e8e0d0"/><path d="M334,195q5,0 6,2q-4,1 -6,0z" fill="#e8a03f"/><path d="M328,200v4M332,200v4" stroke="#e8a03f" stroke-width="1.4"/></g>` +
    `<g><circle cx="356" cy="200" r="3.4" fill="#e8e0d0"/><path d="M359,199q4,0 5,2q-3,1 -5,0z" fill="#e8a03f"/></g>`,

  /**
   * カリブ海のリゾート。カンクン。ターコイズの海が沖から浅瀬へ
   * 3段に明るくなり、白い砂浜にパラソル、右にホテル群、左に桟橋。
   */
  beachresort:
    sky("#7fc8ec", "#d8f0f4", 92) +
    sun(30, 30, 14, "#f5d060") +
    clouds(120, 34, 0.9) +
    bird(70, 56, 0.8) +
    // 海(沖から浅瀬へ3段)
    band(92, 22, "#2098c0") +
    band(112, 24, "#40c0d8") +
    band(134, 18, "#7fe0e0") +
    ripples(104, "#7fd8ec") +
    ripples(126, "#b8f0f0") +
    // ヨット(左沖)
    `<g><path d="M104,88l0,-16l10,14z" fill="#f6efe2"/><path d="M100,90h18l-3,4h-12z" fill="#e8443f"/></g>` +
    // 白い砂浜
    ground(150, "#f2e8d0") +
    `<path d="M0,150Q100,144 200,150Q300,156 400,148L400,158Q300,164 200,158Q100,152 0,158z" fill="#fdf6e4"/>` +
    // ホテル群(右)
    `<g fill="#f6efe2"><rect x="298" y="56" width="26" height="94"/><rect x="330" y="42" width="30" height="108"/><rect x="366" y="66" width="26" height="84"/></g>` +
    `<g fill="#7fc8dc"><rect x="302" y="64" width="18" height="3"/><rect x="302" y="76" width="18" height="3"/><rect x="302" y="88" width="18" height="3"/><rect x="335" y="50" width="20" height="3"/><rect x="335" y="62" width="20" height="3"/><rect x="335" y="74" width="20" height="3"/><rect x="335" y="86" width="20" height="3"/><rect x="370" y="74" width="18" height="3"/><rect x="370" y="86" width="18" height="3"/></g>` +
    // 桟橋(左)と先端のパラパ(椰子葺きの東屋)
    `<path d="M0,166L128,118L142,124L18,176z" fill="#c8a878"/>` +
    `<g stroke="#a8885f" stroke-width="2.4"><path d="M36,164v14M66,152v14M96,140v14M124,128v12"/></g>` +
    `<path d="M118,118a16,9 0 0 1 32,0z" fill="#c8b06a"/>` +
    `<rect x="132" y="118" width="3" height="10" fill="#8a6a44"/>` +
    // パラソルと寝椅子(浜)
    `<g><path d="M52,186a19,9 0 0 1 38,0z" fill="#e8443f"/><rect x="69" y="186" width="3" height="24" fill="#8a6a44"/></g>` +
    `<g><path d="M186,192a17,8 0 0 1 34,0z" fill="#f4c430"/><rect x="201" y="192" width="3" height="20" fill="#8a6a44"/></g>` +
    `<g><path d="M312,186a16,8 0 0 1 32,0z" fill="#5b8fe8"/><rect x="326" y="186" width="3" height="22" fill="#8a6a44"/></g>` +
    `<g fill="#f6efe2"><path d="M100,198h26l6,-8l4,3l-6,8h-2z"/><path d="M240,200h26l6,-8l4,3l-6,8h-2z"/></g>` +
    // 泳ぐ人と浮き輪、ビーチボール
    `<g><circle cx="236" cy="142" r="4" fill="#c98a5f"/><path d="M240,144q6,2 10,0" stroke="#c98a5f" stroke-width="2.6" fill="none"/></g>` +
    `<circle cx="262" cy="144" r="6" fill="none" stroke="#e8443f" stroke-width="3"/>` +
    `<g><circle cx="160" cy="200" r="6" fill="#f6efe2"/><path d="M160,194a6,6 0 0 1 0,12" fill="#e8443f"/><path d="M154,198q6,-3 12,0" stroke="#5b8fe8" stroke-width="2" fill="none"/></g>` +
    // もう1艘のヨット(遠く)
    `<g><path d="M56,96l0,-11l7,10z" fill="#f6efe2"/><path d="M53,98h13l-2,3h-9z" fill="#5b8fe8"/></g>` +
    // ビーチタオルと砂の城
    `<rect x="130" y="192" width="22" height="9" rx="1.6" fill="#c86a8a" transform="rotate(-6 141 196)"/>` +
    `<rect x="222" y="196" width="22" height="9" rx="1.6" fill="#3f8f4f" transform="rotate(5 233 200)"/>` +
    `<g fill="#e0cc9a"><rect x="352" y="196" width="18" height="10"/><rect x="355" y="189" width="5" height="8"/><rect x="364" y="189" width="5" height="8"/><path d="M355,189l2.5,-4l2.5,4z"/><path d="M364,189l2.5,-4l2.5,4z"/></g>` +
    `<path d="M360,183l4,-2" stroke="#e8443f" stroke-width="1.6"/>` +
    // パラソルの下で寝そべる人
    `<g><path d="M56,204h16" stroke="#c98a5f" stroke-width="4" stroke-linecap="round"/><circle cx="76" cy="203" r="3.6" fill="#c98a5f"/><rect x="58" y="200" width="10" height="4" fill="#5b8fe8"/></g>` +
    tinyPerson(292, 208, 19, "#e8862f"),

  /**
   * 湖上の村。パツクアロ湖。小島に白壁の家が積み上がり、
   * 蝶の網を構える漁師の小舟が浮かぶ。霞んだ朝の色。
   */
  lakevillage:
    sky("#a8c8d8", "#e8e0d0", 96) +
    sun(56, 34, 13, "#f8f0d8") +
    ridge(96, [[60, 74], [140, 88], [230, 70], [320, 86], [400, 76]], "#7a9488", 0.9) +
    `<rect x="0" y="96" width="400" height="78" fill="#6a9ab8"/>` +
    ripples(112, "#9ec4d8") +
    ripples(140, "#9ec4d8") +
    // 小島(右)。斜面に白い家、頂に石像
    `<path d="M290,174Q300,120 345,108Q390,120 400,174z" fill="#7a8a5a"/>` +
    // 頂の記念像(白っぽい石。腕を高く挙げる)
    `<path d="M340,112L338,80h13l-2,32z" fill="#c8c0b4"/>` +
    `<circle cx="344.5" cy="75" r="4.4" fill="#c8c0b4"/>` +
    `<path d="M350,82l6,-11" stroke="#c8c0b4" stroke-width="4" stroke-linecap="round"/>` +
    casita(306, 132, 22, 13, "#f6efe2", "#c8383f") +
    casita(332, 124, 22, 13, "#f6efe2", "#c8383f") +
    casita(358, 134, 22, 13, "#f6efe2", "#c8383f") +
    casita(318, 150, 24, 14, "#f6efe2", "#c8383f") +
    casita(348, 154, 24, 14, "#f6efe2", "#c8383f") +
    // 島の礼拝堂(鐘楼つき)
    `<g><rect x="368" y="118" width="16" height="12" fill="#f6efe2"/>` +
    `<rect x="372" y="108" width="8" height="12" fill="#f6efe2"/>` +
    `<path d="M371,108h10l-5,-6z" fill="#c8383f"/>` +
    `<circle cx="376" cy="113" r="1.8" fill="#4a4038"/></g>` +
    // カモの列(水面)
    `<g fill="#5a4a3a"><ellipse cx="210" cy="150" rx="4" ry="2.6"/><circle cx="213" cy="147" r="1.8"/><ellipse cx="226" cy="154" rx="3.6" ry="2.4"/><circle cx="229" cy="151" r="1.6"/><ellipse cx="240" cy="150" rx="3.4" ry="2.2"/><circle cx="243" cy="147" r="1.6"/></g>` +
    ripples(126, "#9ec4d8") +
    // 蝶の網の漁師の小舟(左と中)
    `<g><path d="M40,152c10,-4 34,-4 44,0l-5,7h-34z" fill="#8a5a3a"/>` +
    tinyPerson(56, 152, 20, "#f6efe2") +
    `<path d="M62,140l14,-10" stroke="#8a6a44" stroke-width="2"/>` +
    `<path d="M76,130a11,13 0 1 1 0.1,0z" fill="none" stroke="#d8d0bc" stroke-width="1.6"/>` +
    `<path d="M76,130a11,13 0 1 1 0.1,0" fill="#e8e0d0" opacity=".25"/></g>` +
    `<g><path d="M130,166c8,-3 26,-3 34,0l-4,6h-26z" fill="#6b4a2a"/>` +
    tinyPerson(143, 166, 17, "#e8443f") +
    `<path d="M148,156l11,-8" stroke="#8a6a44" stroke-width="1.8"/>` +
    `<path d="M159,148a9,11 0 1 1 0.1,0z" fill="none" stroke="#d8d0bc" stroke-width="1.4"/></g>` +
    // 岸(手前)。葦とサギと村はずれの家
    ground(174, "#a8a078") +
    `<path d="M0,174Q100,168 200,174Q300,180 400,172L400,210L0,210z" fill="#8a9a6a"/>` +
    casita(8, 196, 30, 18, "#f6efe2", "#c8383f") +
    casita(44, 200, 24, 15, "#e8e0d0", "#c8383f") +
    `<g stroke="#5f7a4a" stroke-width="2" stroke-linecap="round"><path d="M96,208L98,186M104,209L104,188M112,208L110,190"/></g>` +
    `<g fill="#6b4a2a"><ellipse cx="98" cy="185" rx="2.4" ry="4.4"/><ellipse cx="104" cy="187" rx="2.2" ry="4"/></g>` +
    `<g><path d="M282,200L282,186" stroke="#e8e0d0" stroke-width="2.4"/><circle cx="282" cy="182" r="3.6" fill="#e8e0d0"/><path d="M285,181q5,0 6,2q-4,1 -6,0z" fill="#e8a03f"/></g>` +
    `<g stroke="#5f7a4a" stroke-width="2" stroke-linecap="round"><path d="M330,209L332,190M340,210L340,192"/></g>` +
    grassTuft(220, 206, "#7a8a5a") +
    grassTuft(376, 204, "#7a8a5a"),

  /**
   * オヤメルモミの森と越冬する蝶。ミチョアカン。暗い針葉樹の枝が
   * 橙色の蝶のかたまりでたわみ、空中を無数の蝶が舞う。
   */
  monarchforest:
    sky("#c8d8e0", "#eef2f4", 70) +
    ground(70, "#35503a") +
    // 木漏れ日
    `<path d="M120,70L96,210L150,210L158,70z" fill="#f5e8b8" opacity=".18"/>` +
    // 奥のモミ(暗い層)
    fir(30, 190, 110, "#2a4530") +
    fir(105, 195, 130, "#2a4530") +
    fir(190, 190, 115, "#2a4530") +
    fir(265, 195, 125, "#2a4530") +
    fir(345, 190, 120, "#2a4530") +
    // 手前のモミ(明るい層)と、枝をたわめる蝶のかたまり
    fir(66, 210, 150, "#3f6b4a") +
    fir(310, 210, 155, "#3f6b4a") +
    `<g fill="#d87a2a"><ellipse cx="56" cy="120" rx="12" ry="7"/><ellipse cx="80" cy="96" rx="10" ry="6"/><ellipse cx="62" cy="150" rx="13" ry="8"/><ellipse cx="298" cy="112" rx="12" ry="7"/><ellipse cx="326" cy="140" rx="13" ry="8"/><ellipse cx="308" cy="86" rx="9" ry="6"/></g>` +
    `<g fill="#a85a1f"><circle cx="52" cy="119" r="1.6"/><circle cx="61" cy="122" r="1.6"/><circle cx="78" cy="95" r="1.4"/><circle cx="60" cy="149" r="1.6"/><circle cx="68" cy="152" r="1.6"/><circle cx="296" cy="111" r="1.6"/><circle cx="304" cy="114" r="1.6"/><circle cx="324" cy="139" r="1.6"/><circle cx="332" cy="142" r="1.6"/></g>` +
    // 舞う蝶(空中)
    butterflyDot(130, 90, 1) +
    butterflyDot(150, 120, 0.8) +
    butterflyDot(180, 76, 0.9) +
    butterflyDot(226, 100, 0.8) +
    butterflyDot(250, 130, 1) +
    butterflyDot(276, 70, 0.8) +
    butterflyDot(120, 150, 0.9) +
    butterflyDot(206, 152, 0.7) +
    butterflyDot(360, 96, 0.9) +
    butterflyDot(380, 130, 0.8) +
    // forest floor
    `<rect x="0" y="188" width="400" height="22" fill="#5f5a3a"/>` +
    `<g fill="#8a7a4f"><ellipse cx="60" cy="196" rx="8" ry="2.4"/><ellipse cx="200" cy="200" rx="10" ry="2.6"/><ellipse cx="330" cy="197" rx="8" ry="2.4"/></g>` +
    butterflyDot(150, 196, 0.8) +
    butterflyDot(246, 202, 0.7) +
    // 見上げる観察者(左手前)
    tinyPerson(140, 210, 22, "#c8383f") +
    `<path d="M146,196l8,-6" stroke="#c98a5f" stroke-width="2.4"/> `,

  /**
   * 青いアガベの畑と蒸留所。テキーラ。赤茶の土に竜舌蘭の列が続き、
   * 右に瓦屋根の蒸留所と煙突。ヒマドール(収穫人)が株を割る。
   */
  agaveland:
    sky("#9cc8e0", "#f0e0c0", 110) +
    sun(348, 34, 14, "#f5d060") +
    clouds(100, 30, 0.9) +
    ridge(110, [[130, 84], [210, 110], [300, 88], [400, 104]], "#8a7a6a", 0.9) +
    ground(110, "#b89058") +
    // 畝(奥から手前へ)
    `<g stroke="#8a6a44" stroke-width="2" opacity=".7"><path d="M0,146Q200,140 400,146M0,172Q200,166 400,172M0,200Q200,194 400,200"/></g>` +
    // アガベの列(中央の帯は繰り返しの株)
    agavePlant(24, 146, 0.8) + agavePlant(64, 145, 0.8) + agavePlant(104, 146, 0.8) +
    agavePlant(144, 145, 0.8) + agavePlant(184, 146, 0.8) + agavePlant(224, 145, 0.8) +
    agavePlant(300, 146, 0.8) + agavePlant(340, 145, 0.8) + agavePlant(380, 146, 0.8) +
    agavePlant(44, 172, 1.1) + agavePlant(100, 171, 1.1) + agavePlant(156, 172, 1.1) +
    agavePlant(212, 171, 1.1) + agavePlant(330, 172, 1.1) + agavePlant(386, 171, 1.1) +
    agavePlant(24, 202, 1.5) + agavePlant(90, 201, 1.5) + agavePlant(160, 203, 1.5) +
    agavePlant(356, 202, 1.5) +
    // 蒸留所(右)
    `<rect x="256" y="118" width="74" height="34" fill="#c87a4a"/>` +
    `<path d="M251,118h84l-9,-12h-66z" fill="#a85f38"/>` +
    `<g fill="#6b4a2a"><rect x="266" y="130" width="10" height="22"/><rect x="300" y="128" width="12" height="10"/></g>` +
    `<rect x="318" y="70" width="11" height="48" fill="#8a4a3a"/>` +
    `<g opacity=".6" fill="#c8ccc4"><ellipse cx="330" cy="62" rx="10" ry="5"/><ellipse cx="340" cy="54" rx="7" ry="4"/></g>` +
    `<path d="M240,152a12,10 0 0 1 24,0z" fill="#a8885f"/>` +
    // ヒマドールと収穫したピニャ(左手前)
    tinyPerson(258, 196, 22, "#f6efe2") +
    `<ellipse cx="258" cy="177" rx="10" ry="3.4" fill="#e8dcc0" opacity=".6"/>` +
    `<path d="M263,184l9,8" stroke="#8a6a44" stroke-width="2.4"/>` +
    `<path d="M270,192h6" stroke="#9aa0a8" stroke-width="3.4"/>` +
    `<g fill="#d8b878" stroke="#b09050" stroke-width="1"><circle cx="288" cy="200" r="6"/><circle cx="300" cy="204" r="6"/><circle cx="292" cy="208" r="6"/></g>` +
    grassTuft(230, 206, "#a89050") +
    bird(180, 50, 0.8),

  /**
   * 乾いた高原のアドベの家並み。北部高原。日干しれんがの壁に
   * 唐辛子の紐(リストラ)が下がり、柱サボテンが立つ。
   */
  adobehighland:
    sky("#a8ccdc", "#f0d8b0", 112) +
    sun(60, 36, 17, "#f5d060") +
    clouds(300, 26, 0.8) +
    bird(230, 44, 0.8) +
    ridge(112, [[90, 86], [190, 104], [300, 82], [400, 100]], "#b09068", 0.95) +
    ground(112, "#c89868") +
    // 遠くの小さなアドベ(中央の帯は繰り返し)
    adobeHouse(168, 148, 28, 16, "#b8804f") +
    adobeHouse(206, 146, 26, 15, "#c08a5a") +
    adobeHouse(240, 150, 26, 15, "#b8804f") +
    // 主役のアドベ(左と右)
    adobeHouse(24, 192, 62, 36) +
    adobeHouse(92, 184, 44, 26, "#b8804f") +
    adobeHouse(298, 190, 56, 32, "#b8804f") +
    adobeHouse(360, 182, 36, 24) +
    // リストラ(唐辛子の紐)
    `<g><path d="M40,160v16" stroke="#8a5a3a" stroke-width="1.4"/>` +
    `<g fill="#c8383f"><ellipse cx="40" cy="164" rx="2.6" ry="4"/><ellipse cx="38" cy="170" rx="2.6" ry="4"/><ellipse cx="42" cy="174" rx="2.6" ry="4"/></g></g>` +
    `<g><path d="M330,162v14" stroke="#8a5a3a" stroke-width="1.4"/>` +
    `<g fill="#c8383f"><ellipse cx="330" cy="166" rx="2.4" ry="3.6"/><ellipse cx="328" cy="171" rx="2.4" ry="3.6"/><ellipse cx="332" cy="175" rx="2.4" ry="3.6"/></g></g>` +
    // 土の竈(オルノ)
    `<path d="M258,206a13,13 0 0 1 26,0z" fill="#c08a5a"/>` +
    `<path d="M266,206a6,7 0 0 1 10,0z" fill="#3a2a1a"/>` +
    // サボテンと乾いた茂み
    cardon(150, 208, 36) +
    cardon(228, 204, 26, "#5f8a5f") +
    nopal(388, 210, 1.1) +
    grassTuft(120, 206, "#b09a6a") +
    grassTuft(288, 208, "#b09a6a") +
    grassTuft(200, 209, "#b09a6a") +
    // 水瓶を運ぶ人とヤギ(手前)
    tinyPerson(196, 194, 20, "#c86a8a") +
    `<ellipse cx="196" cy="176" rx="4.4" ry="5.4" fill="#a8744a"/>` +
    `<g><ellipse cx="256" cy="188" rx="9" ry="5.4" fill="#e8e0d0"/>` +
    `<rect x="249" y="190" width="2.4" height="7" fill="#e8e0d0"/><rect x="261" y="190" width="2.4" height="7" fill="#e8e0d0"/>` +
    `<circle cx="266" cy="184" r="3.4" fill="#e8e0d0"/>` +
    `<path d="M264,181q-1,-4 -4,-5M268,181q1,-4 4,-5" stroke="#8a7a68" stroke-width="1.4" fill="none"/></g>`,
};

export const MEXICO_BG = { ...MEXICO_BASE_BG };

// ---------------------------------------------------------------------------
// 都市シンボル(18種)。鍵は cities.mjs の `mark` と対応。24×24の座標系。
// 盤面上では直径19px程度になるため、形は1つの主役+1つの添え物までに抑える。
// ---------------------------------------------------------------------------

export const MEXICO_MARKS = {
  /** 段状ピラミッド。テオティワカンなど。 */
  pyramid:
    `<path d="M2,21v-3h4v-5h4v-5h4v5h4v5h4v3z" fill="#b08a5f"/>` +
    `<rect x="10.5" y="8" width="3" height="13" fill="#8a6a48"/>` +
    `<path d="M2,21h20" stroke="#8a6a48" stroke-width="1.4"/>`,

  /** 階段状神殿と、階段を降りる羽毛の蛇の影。チチェン・イッツァ。 */
  castillo:
    `<path d="M3,21v-2.5h3v-3.5h3v-3.5h3v3.5h3v3.5h3v2.5z" fill="#c8b890"/>` +
    `<rect x="9.5" y="6" width="5" height="5.5" fill="#b0a078"/>` +
    `<rect x="10.8" y="7.6" width="2.4" height="3.9" fill="#6b5b44"/>` +
    `<path d="M6,11q2,1.6 0,3.4q-2,1.8 0,3.6q1,1 0,2" stroke="#3f8f4f" stroke-width="2" fill="none"/>` +
    `<path d="M6,20l-2.6,1.4l0.6,-2.6z" fill="#3f8f4f"/>`,

  /** 刻まれた石像の顔(ダンサンテス)。モンテ・アルバン。 */
  danzantes:
    `<rect x="6" y="3" width="12" height="18" rx="2.5" fill="#9a9088"/>` +
    `<g stroke="#4a4038" stroke-width="1.5" fill="none">` +
    `<path d="M9,9q2,-2 4,0"/>` +
    `<path d="M9.5,13q1.6,-1.4 3.2,0"/>` +
    `<path d="M9,16.5q3,2.4 6,0"/>` +
    `<path d="M14.5,8q2,1 2,3.4"/>` +
    `</g>`,

  /** 坑口とトロッコ。グアナフアト・サカテカス。 */
  silvermine:
    `<path d="M3,17v-6q9,-9 18,0v6z" fill="#6b5544"/>` +
    `<path d="M6,17v-4.5q6,-6 12,0v4.5z" fill="#241a10"/>` +
    `<rect x="7" y="16" width="10" height="5" fill="#8a5a3a"/>` +
    `<g fill="#c8c0b4"><circle cx="10" cy="16" r="1.6"/><circle cx="14" cy="15.6" r="1.6"/></g>` +
    `<circle cx="9" cy="22" r="1.6" fill="#2a2a2a"/><circle cx="15" cy="22" r="1.6" fill="#2a2a2a"/>`,

  /** 機関車の正面。アグアスカリエンテス。 */
  railworks:
    `<rect x="6" y="4" width="12" height="13" rx="2" fill="#2f5f3f"/>` +
    `<circle cx="12" cy="10" r="3.6" fill="#2a2a2a"/>` +
    `<circle cx="12" cy="10" r="1.4" fill="#c8c0b4"/>` +
    `<rect x="9" y="2.5" width="6" height="2.5" fill="#2a2a2a"/>` +
    `<path d="M5,21l7,-4l7,4z" fill="#8a3a2e"/>` +
    `<circle cx="12" cy="5.6" r="1" fill="#f5b31c"/>`,

  /** 教会の双塔とドーム。コロニアルの町。 */
  cathedral:
    `<rect x="6" y="12" width="12" height="9" fill="#d8a88a"/>` +
    `<rect x="3.5" y="7" width="4.5" height="14" fill="#d8a88a"/>` +
    `<rect x="16" y="7" width="4.5" height="14" fill="#d8a88a"/>` +
    `<path d="M3,7h5.5l-2.75,-3.5z" fill="#7a9a8a"/>` +
    `<path d="M15.5,7h5.5l-2.75,-3.5z" fill="#7a9a8a"/>` +
    `<path d="M8.5,12a3.5,3.2 0 0 1 7,0z" fill="#7a9a8a"/>` +
    `<path d="M10.5,21v-4a1.5,1.5 0 0 1 3,0v4z" fill="#8a6a58"/>`,

  /** 雪をかぶった円錐形の火山。ポポカテペトル。 */
  volcano:
    `<path d="M2,21L12,4L22,21z" fill="#7a6a72"/>` +
    `<path d="M9.4,8.4L12,4L14.6,8.4L13.2,10L10.8,10z" fill="#f2f6f8"/>` +
    `<ellipse cx="15" cy="2.6" rx="3" ry="1.5" fill="#c8ccc4" opacity=".9"/>`,

  /** フェンスと監視塔。国境の町。 */
  borderfence:
    `<rect x="14" y="4" width="7" height="5" fill="#6b7060"/>` +
    `<rect x="16" y="5.2" width="3" height="2.6" fill="#20364a"/>` +
    `<rect x="16.8" y="9" width="1.6" height="8" fill="#6b7060"/>` +
    `<g stroke="#a05a3a" stroke-width="1.6"><path d="M3,12h18M3,19h18"/></g>` +
    `<g stroke="#a05a3a" stroke-width="1.8"><path d="M4,10v11M8,10v11M12,10v11M16,17v4M20,17v4"/></g>`,

  /** 峡谷を渡る鉄橋。バランカス・デル・コブレ。 */
  canyonbridge:
    `<path d="M2,4v17h4V4z" fill="#c07848"/>` +
    `<path d="M22,4v17h-4V4z" fill="#c07848"/>` +
    `<rect x="5" y="10" width="14" height="2.4" fill="#4a3a30"/>` +
    `<g stroke="#4a3a30" stroke-width="1.4"><path d="M9,12.4v8M15,12.4v8M9,14l6,5M15,14l-6,5"/></g>`,

  /** 起重機と船。港町。 */
  port:
    `<rect x="10" y="4" width="2" height="14" fill="#e8443f"/>` +
    `<rect x="10" y="4" width="9" height="2" fill="#e8443f"/>` +
    `<line x1="17" y1="6" x2="17" y2="10" stroke="#e8443f" stroke-width="1.4"/>` +
    `<rect x="14.6" y="10" width="4.8" height="3.6" fill="#f5b31c"/>` +
    `<path d="M2,18h20l-3,4H5z" fill="#2f6ea8"/>`,

  /** 椰子とビーチパラソル。リゾート。 */
  beachpalm:
    `<path d="M6,21q1,-8 3,-13" stroke="#8a6a44" stroke-width="2" fill="none"/>` +
    `<g stroke="#2f8f4f" stroke-width="2" fill="none" stroke-linecap="round">` +
    `<path d="M9,8q-4,-2 -6,1M9,8q-1,-4 2,-6M9,8q4,-2 6,1"/>` +
    `</g>` +
    `<path d="M13,15a5.5,4 0 0 1 11,0z" fill="#e8443f"/>` +
    `<rect x="18" y="15" width="1.6" height="6" fill="#8a6a44"/>`,

  /** 葦舟に乗る人影(蝶の網)。パツクアロ湖。 */
  lakecanoe:
    `<path d="M3,17c4,-2 14,-2 18,0l-2.5,3.5h-13z" fill="#8a5a3a"/>` +
    `<rect x="8.5" y="9" width="3.6" height="6" fill="#c8383f"/>` +
    `<circle cx="10.3" cy="7" r="2.2" fill="#c98a5f"/>` +
    `<path d="M13,11l4,-3" stroke="#8a6a44" stroke-width="1.4"/>` +
    `<circle cx="18.6" cy="6" r="3" fill="none" stroke="#d8d0bc" stroke-width="1.4"/>`,

  /** 羽ばたく蝶(モナルカ)。 */
  butterfly:
    `<g fill="#e8862f" stroke="#a85a1f" stroke-width="1">` +
    `<path d="M11,12q-7,-8 -9,-3q-1,4 8,5z"/>` +
    `<path d="M13,12q7,-8 9,-3q1,4 -8,5z"/>` +
    `<path d="M11,13q-6,6 -4,8q2,1.6 5,-6z"/>` +
    `<path d="M13,13q6,6 4,8q-2,1.6 -5,-6z"/>` +
    `</g>` +
    `<path d="M12,9v10" stroke="#2a1a10" stroke-width="1.8"/>` +
    `<path d="M12,9l-2.4,-3M12,9l2.4,-3" stroke="#2a1a10" stroke-width="1"/>`,

  /** アガベの株。テキーラ。 */
  agave:
    `<g fill="#5f8fa0">` +
    `<path d="M12,21L4,10l3,-1z"/>` +
    `<path d="M12,21L8,5l3,0z"/>` +
    `<path d="M12,21L12,3l2,2z"/>` +
    `<path d="M12,21L16,5l2,2z"/>` +
    `<path d="M12,21L20,10l1,3z"/>` +
    `</g>` +
    `<path d="M12,21L2,16l1,-2z" fill="#4a7a88"/>` +
    `<path d="M12,21L22,16l-1,-2z" fill="#4a7a88"/>`,

  /** 柱サボテン。北部高原。 */
  cactus:
    `<rect x="10" y="4" width="4.5" height="17" rx="2.2" fill="#4f8a4f"/>` +
    `<path d="M10,13h-4v-5a2,2 0 0 1 4,0z" fill="#4f8a4f"/>` +
    `<path d="M14.5,15h4v-4a2,2 0 0 1 -4,0z" fill="#4f8a4f"/>` +
    `<g stroke="#3a6b3a" stroke-width="1"><path d="M12.2,5v15M8,9v3M16.5,12v2"/></g>`,

  /** 壁画の一部(筆を持つ手と色面)。 */
  mural:
    `<rect x="3" y="4" width="18" height="14" rx="1.5" fill="#e8dcc0"/>` +
    `<rect x="5" y="6" width="7" height="6" fill="#e8443f"/>` +
    `<rect x="13" y="6" width="6" height="4" fill="#f5b31c"/>` +
    `<rect x="13" y="11" width="6" height="5" fill="#5b8fe8"/>` +
    `<rect x="5" y="13" width="7" height="3" fill="#3f8f4f"/>` +
    `<path d="M15,21l4,-5" stroke="#8a5a3a" stroke-width="1.8"/>` +
    `<path d="M19,16l1.6,-2l1,1.6z" fill="#2a2a2a"/>`,

  /** ソンブレロと弦楽器。マリアッチ。 */
  mariachi:
    `<ellipse cx="12" cy="8" rx="10" ry="3" fill="#d8b060"/>` +
    `<path d="M8,7.6a4,4.4 0 0 1 8,0q0,1.4 -4,1.4t-4,-1.4z" fill="#c8a050"/>` +
    `<path d="M4,8q8,3 16,0" stroke="#c8383f" stroke-width="1.2" fill="none"/>` +
    `<circle cx="10" cy="18" r="4" fill="#a8744a"/>` +
    `<circle cx="10" cy="18" r="1.4" fill="#4a3a22"/>` +
    `<rect x="13" y="12.6" width="7.5" height="2" rx="1" fill="#6b4a2a" transform="rotate(-38 13 14)"/>`,

  /** ジャガーの横顔(マヤ/オルメカのモチーフ)。 */
  jaguar:
    `<path d="M4,16q0,-8 8,-8q6,0 8,4l1.6,3q0.4,1.4 -1.6,1.4h-4l-2,3h-6q-4,0 -4,-3.4z" fill="#e0a83f"/>` +
    `<path d="M6.5,10l0.8,-4l3.4,2.6z" fill="#e0a83f"/>` +
    `<path d="M7.6,8.4l0.4,-1.6l1.4,1.1z" fill="#2a1a10"/>` +
    `<path d="M16,12q3.5,0.6 4.4,3l-3,0.4z" fill="#f6efe2"/>` +
    `<circle cx="10.5" cy="12.6" r="1.6" fill="#2a1a10"/>` +
    `<path d="M19.6,13.4l1.2,2" stroke="#2a1a10" stroke-width="1.1"/>` +
    `<path d="M15.8,16.4l0.6,2.6M17.6,16.4l0.9,2.2" stroke="#f6efe2" stroke-width="1.3"/>` +
    `<g fill="#8a6220"><circle cx="7" cy="15.5" r="1.1"/><circle cx="11" cy="17.5" r="1.1"/><circle cx="14" cy="13.6" r="1.1"/><circle cx="12.6" cy="10.4" r="1.1"/><circle cx="8.6" cy="18.6" r="1"/></g>`,

  /** 連なるアーチの水道橋。ケレタロ。 */
  aqueduct:
    `<rect x="2" y="6" width="20" height="4" fill="#c88a7a"/>` +
    `<g fill="#c88a7a"><rect x="3" y="10" width="3.4" height="11"/><rect x="10.3" y="10" width="3.4" height="11"/><rect x="17.6" y="10" width="3.4" height="11"/></g>` +
    `<path d="M6.4,14.5a3.4,3.6 0 0 1 3.9,0M13.7,14.5a3.4,3.6 0 0 1 3.9,0" stroke="#c88a7a" stroke-width="2.6" fill="none"/>` +
    `<path d="M2,21h20" stroke="#a86a5a" stroke-width="1.4"/>`,

  /** 石の輪(球技場のゴール)。エル・タヒン。 */
  ballcourt:
    `<rect x="3" y="3" width="6" height="18" fill="#9a9088"/>` +
    `<rect x="9" y="10" width="2.4" height="2.4" fill="#8a8478"/>` +
    `<circle cx="16" cy="11" r="5.4" fill="none" stroke="#8a8478" stroke-width="3.2"/>` +
    `<circle cx="16" cy="19.6" r="2" fill="#4a4038"/>`,

  /** 海に面した崖の上の遺跡。トゥルム。 */
  beachruins:
    `<path d="M3,18h18v-6H3z" fill="#c8a878"/>` +
    `<rect x="8.5" y="5" width="8" height="7" fill="#ded0a8"/>` +
    `<path d="M7,5h11l-1.6,-2.8H8.6z" fill="#c8b890"/>` +
    `<rect x="11.2" y="7.4" width="3" height="4.6" fill="#6b5b44"/>` +
    `<path d="M2,20.5q5,-3 10,0t10,0" stroke="#40c0d8" stroke-width="2.2" fill="none"/>`,

  /** 山を渡るロープウェイのゴンドラ。サカテカス。 */
  cablecar:
    `<line x1="2" y1="7" x2="22" y2="15" stroke="#4a4a52" stroke-width="1.6"/>` +
    `<line x1="12" y1="11" x2="12" y2="14" stroke="#4a4a52" stroke-width="1.4"/>` +
    `<rect x="7.5" y="14" width="9" height="7" rx="1.6" fill="#e8443f"/>` +
    `<rect x="9.5" y="16" width="5" height="3" fill="#f6efe2"/>`,

  /** 蝋燭と煙。カテマコ。 */
  candle:
    `<ellipse cx="12" cy="21" rx="6.5" ry="1.8" fill="#c8a050"/>` +
    `<rect x="9" y="10" width="6" height="11" rx="1.4" fill="#f6efe2"/>` +
    `<path d="M12,3.6c-2.4,3 -2.4,5 0,6.4c2.4,-1.4 2.4,-3.4 0,-6.4z" fill="#f5b31c"/>` +
    `<path d="M12,6c-1,1.4 -1,2.4 0,3.2c1,-0.8 1,-1.8 0,-3.2z" fill="#e8443f"/>` +
    `<path d="M15.5,4q3,-1.4 2,-4" stroke="#c8ccc4" stroke-width="1.4" fill="none"/>`,

  /** 死者の日のマリーゴールド(センパスチル)。パツクアロ。 */
  cempasuchil:
    `<path d="M12,13v8" stroke="#3f8f4f" stroke-width="2"/>` +
    `<path d="M12,18q-4,-1.6 -5.5,1.4q4,1.6 5.5,-1.4z" fill="#3f8f4f"/>` +
    `<path d="M12,16q4,-1.6 5.5,1.4q-4,1.6 -5.5,-1.4z" fill="#3f8f4f"/>` +
    `<g fill="#e8862f"><circle cx="12" cy="3.6" r="2.6"/><circle cx="15.8" cy="5.2" r="2.6"/><circle cx="17.4" cy="9" r="2.6"/><circle cx="15.8" cy="12.8" r="2.6"/><circle cx="12" cy="14.4" r="2.6"/><circle cx="8.2" cy="12.8" r="2.6"/><circle cx="6.6" cy="9" r="2.6"/><circle cx="8.2" cy="5.2" r="2.6"/></g>` +
    `<circle cx="12" cy="9" r="3.4" fill="#f4a43f"/>` +
    `<circle cx="12" cy="9" r="1.4" fill="#c85f1f"/>`,

  /** 草に覆われた基壇の上の教会。チョルーラ。 */
  churchpyramid:
    `<path d="M2,21q10,-17 20,0z" fill="#8fae63"/>` +
    `<rect x="8.5" y="8" width="7" height="7" fill="#f4c430"/>` +
    `<rect x="7.6" y="4" width="2.6" height="5" fill="#f4c430"/>` +
    `<rect x="13.8" y="4" width="2.6" height="5" fill="#f4c430"/>` +
    `<path d="M7.2,4h3.4l-1.7,-2.4z" fill="#c8383f"/>` +
    `<path d="M13.4,4h3.4l-1.7,-2.4z" fill="#c8383f"/>` +
    `<rect x="10.8" y="11" width="2.4" height="4" fill="#8a6a44"/>`,

  /** 崖から飛び込む人影。アカプルコ。 */
  cliffdiver:
    `<path d="M2,21V3h6l-1.6,5l2.6,4.6l-2.6,4.4l1.6,4z" fill="#8a7a68"/>` +
    `<path d="M12.5,4.6q6,2 6.4,8.4" stroke="#c98a5f" stroke-width="3" fill="none"/>` +
    `<path d="M12.5,4.6l-2.6,-2M12.5,4.6l0.8,-3.2" stroke="#c98a5f" stroke-width="2.2" stroke-linecap="round"/>` +
    `<circle cx="18.6" cy="14.6" r="2.1" fill="#c98a5f"/>` +
    `<path d="M18.6,16.6l-2.4,3.2M18.6,16.6l2.4,3" stroke="#c98a5f" stroke-width="2" stroke-linecap="round"/>` +
    `<path d="M13.5,21.6q4,-2.4 8,0" stroke="#40c0d8" stroke-width="2" fill="none"/>`,

  /** コーヒーの実がついた枝。ハラパ。 */
  coffee:
    `<path d="M4,19q9,-3 16,-11" stroke="#6b4a2a" stroke-width="2" fill="none"/>` +
    `<ellipse cx="8" cy="12.5" rx="4" ry="2.2" fill="#3f8f4f" transform="rotate(-32 8 12.5)"/>` +
    `<ellipse cx="16.5" cy="6.5" rx="3.6" ry="2" fill="#2f6b3f" transform="rotate(-40 16.5 6.5)"/>` +
    `<g fill="#c8383f"><circle cx="8" cy="17.4" r="2.2"/><circle cx="11.5" cy="15.6" r="2.2"/><circle cx="14.6" cy="13.2" r="2.2"/></g>` +
    `<circle cx="17.4" cy="10.6" r="2" fill="#e8862f"/>`,

  /** 綿花の実。トレオン。 */
  cottonboll:
    `<path d="M12,21v-6" stroke="#6b4a2a" stroke-width="2"/>` +
    `<path d="M8,14l4,3.4l4,-3.4l-1.6,-3h-4.8z" fill="#8a5a3a"/>` +
    `<g fill="#f6efe2" stroke="#d8d0bc" stroke-width="1"><circle cx="8.6" cy="8.6" r="3.4"/><circle cx="15.4" cy="8.6" r="3.4"/><circle cx="12" cy="5.4" r="3.6"/><circle cx="12" cy="10.4" r="3"/></g>`,

  /** 鰐。チアパ・デ・コルソ。 */
  crocodile:
    `<path d="M2,18q-1.6,-3 1.6,-4.4" stroke="#4f8a4f" stroke-width="2.4" fill="none"/>` +
    `<path d="M3,16q2,-3.4 7,-3.4h6q4,0 6.4,2.4l-1.8,1.8l-2.6,-1l-2.2,1.6h-8q-3.4,0 -4.8,-1.4z" fill="#4f8a4f"/>` +
    `<g fill="#3a6b3a"><path d="M7,12.8l1.2,-2.2l1.2,2.2z"/><path d="M10.4,12.6l1.2,-2.2l1.2,2.2z"/><path d="M13.8,12.8l1.2,-2.2l1.2,2.2z"/></g>` +
    `<circle cx="16.2" cy="12.4" r="1" fill="#241a10"/>` +
    `<path d="M18.6,15.4l1,1M20.4,14.8l0.8,1" stroke="#f6efe2" stroke-width="1.1"/>` +
    `<path d="M6,19.5v2M10,19.5v2M14,19.5v2" stroke="#4f8a4f" stroke-width="2"/>`,

  /** 一本足で立つフラミンゴ。セレストゥン。 */
  flamingo:
    `<path d="M4,21.4h16" stroke="#3f8fc4" stroke-width="1.8"/>` +
    `<path d="M11,15.5v5.5M11,17.5l2.6,-1.4" stroke="#e8879a" stroke-width="1.8"/>` +
    `<ellipse cx="10.5" cy="12" rx="5.5" ry="4.2" fill="#e8879a"/>` +
    `<path d="M14.5,9.5q4.5,-1 4.5,-5q0,-2.2 -2,-2.4" stroke="#e8879a" stroke-width="2.6" fill="none"/>` +
    `<circle cx="16.6" cy="2.2" r="1.8" fill="#e8879a"/>` +
    `<path d="M15.2,2.6q-2.6,0.6 -2.8,2.2l2.6,0.4z" fill="#2a1a10"/>` +
    `<path d="M7.5,12q3,-1.4 6,0" stroke="#d46a8e" stroke-width="1.6" fill="none"/>`,

  /** 城壁と稜堡。カンペチェ。 */
  fortwall:
    `<path d="M2,21v-9h2.4v-2.6h3v2.6h3.2v-2.6h3v2.6h3.2v-2.6h3v2.6H22v9z" fill="#b0a078"/>` +
    `<path d="M10,21v-4.4a2,2.2 0 0 1 4,0V21z" fill="#6b5b44"/>` +
    `<path d="M2,15h20" stroke="#98876f" stroke-width="1.3"/>`,

  /** 幾何学模様の石組み(グレカ)。ミトラ。 */
  fretwork:
    `<rect x="2" y="6" width="20" height="12" fill="#b09468"/>` +
    `<path d="M2,7h20M2,17h20" stroke="#5a4326" stroke-width="1.6"/>` +
    `<path d="M5,15v-5h5v2.4H7.4V15z" fill="#5a4326"/>` +
    `<path d="M19,9v5h-5v-2.4h2.6V9z" fill="#5a4326"/>`,

  /** 溶鉱炉。モンテレイ。 */
  furnace:
    `<path d="M9,21v-9l-1.6,-3l2,-6h5.2l2,6L15,12v9z" fill="#5a5f66"/>` +
    `<path d="M3,21L9.6,5" stroke="#5a5f66" stroke-width="2.2"/>` +
    `<path d="M15,13.4h4V21" stroke="#5a5f66" stroke-width="2.4" fill="none"/>` +
    `<path d="M10,21q2,-4.4 4,0z" fill="#f5b31c"/>` +
    `<circle cx="12" cy="19.6" r="1.2" fill="#e8443f"/>`,

  /** 小型ギター(ハラナ)。トラコタルパン。 */
  jarana:
    `<g transform="rotate(-28 12 12)">` +
    `<circle cx="12" cy="16.5" r="4.6" fill="#a8744a"/>` +
    `<circle cx="12" cy="10.8" r="3.5" fill="#a8744a"/>` +
    `<circle cx="12" cy="14.6" r="1.7" fill="#4a3a22"/>` +
    `<rect x="11" y="1.6" width="2" height="8" fill="#6b4a2a"/>` +
    `<rect x="10.4" y="1" width="3.2" height="2.2" fill="#4a3a22"/>` +
    `<path d="M12,3.4v14" stroke="#e8dcc0" stroke-width="0.9"/>` +
    `</g>`,

  /** 銀の指輪と坑口。タスコ。 */
  jewelrymine:
    `<circle cx="12" cy="8.6" r="5" fill="none" stroke="#c8ccd4" stroke-width="2.8"/>` +
    `<path d="M9.6,2.6l2.4,-2.2l2.4,2.2l-2.4,2.2z" fill="#7fd0e8"/>` +
    `<path d="M6,21.4v-3.6q6,-5 12,0v3.6z" fill="#5a4638"/>` +
    `<path d="M9,21.4v-2.4q3,-2.6 6,0v2.4z" fill="#241a10"/>`,

  /** トウモロコシの穂軸と石臼(メタテ)。テワカン。 */
  nixtamal:
    `<path d="M3,17.6l16,-4l1.4,3.4l-16,4z" fill="#8b8f98"/>` +
    `<rect x="4" y="20" width="2.6" height="2.6" fill="#6b7078"/>` +
    `<rect x="16.6" y="16.6" width="2.6" height="2.6" fill="#6b7078"/>` +
    `<ellipse cx="10.5" cy="7" rx="6" ry="3" fill="#f4c430" transform="rotate(-18 10.5 7)"/>` +
    `<g fill="#d8a818"><circle cx="7" cy="8" r="0.8"/><circle cx="10" cy="7.2" r="0.8"/><circle cx="13" cy="6.2" r="0.8"/><circle cx="9" cy="6" r="0.8"/><circle cx="12" cy="8" r="0.8"/></g>` +
    `<path d="M15.6,5.4q3.4,-1.6 5,0q-2.6,1.8 -5,0z" fill="#3f8f4f"/>`,

  /** 尾羽の長い鳥(ケツァール)。サン・クリストバル・デ・ラス・カサス。 */
  quetzal:
    `<path d="M9.5,13q-2.4,4.4 -5.5,7.6" stroke="#2f8f5f" stroke-width="2.2" fill="none"/>` +
    `<path d="M12,13.6q-0.6,4.4 -2,8" stroke="#3fae6f" stroke-width="2.2" fill="none"/>` +
    `<ellipse cx="11.5" cy="9" rx="4.6" ry="5.4" fill="#3f8f4f"/>` +
    `<path d="M7.6,10.4a4.6,4.4 0 0 0 7.8,0l-0.4,-2.4h-7z" fill="#e8443f"/>` +
    `<circle cx="12.5" cy="4.8" r="3" fill="#3f8f4f"/>` +
    `<circle cx="13.6" cy="4.4" r="0.9" fill="#241a10"/>` +
    `<path d="M15.4,5l3,1l-3,1z" fill="#f4c430"/>` +
    `<path d="M10.5,2.6q1.4,-1.4 3,-0.6" stroke="#2f8f5f" stroke-width="1.6" fill="none"/>`,

  /** 澄んだ水と丸い岩(ストロマトライト)。バカラール・クアトロシエネガス。 */
  reef:
    `<rect x="2" y="9" width="20" height="11" rx="2" fill="#40c0d8"/>` +
    `<path d="M2,9.5q5,-3 10,0t10,0" stroke="#7fe0e0" stroke-width="2" fill="none"/>` +
    `<path d="M4,20a4,4.4 0 0 1 8,0z" fill="#b09468"/>` +
    `<path d="M12,20a4.6,5 0 0 1 9.2,0z" fill="#c8a878"/>` +
    `<path d="M8.6,20a3,3.4 0 0 1 6,0z" fill="#a8885f"/>` +
    `<path d="M2,20h20" stroke="#98876f" stroke-width="1.4"/>`,

  /** 縞模様の毛布(サラーペ)。サルティージョ。 */
  sarape:
    `<rect x="5" y="2.6" width="14" height="17.4" rx="1.4" fill="#c8383f"/>` +
    `<rect x="5" y="5.6" width="14" height="2" fill="#f4c430"/>` +
    `<rect x="5" y="8.4" width="14" height="1.6" fill="#f6efe2"/>` +
    `<rect x="5" y="14.6" width="14" height="1.6" fill="#3f8f4f"/>` +
    `<rect x="5" y="17" width="14" height="1.8" fill="#e88a3f"/>` +
    `<path d="M12,9.6l3,3l-3,3l-3,-3z" fill="#2f6ea8"/>` +
    `<path d="M6.4,20v1.8M9.2,20v1.8M12,20v1.8M14.8,20v1.8M17.6,20v1.8" stroke="#c8383f" stroke-width="1.2"/>`,

  /** 陶器の紋様タイル(タラベラ)。プエブラ。 */
  talavera:
    `<rect x="3.4" y="3.4" width="17.2" height="17.2" rx="1.6" fill="#f6efe2" stroke="#2f6ea8" stroke-width="1.8"/>` +
    `<g fill="#2f6ea8"><path d="M12,6q2.6,2.2 0,4.4q-2.6,-2.2 0,-4.4z"/><path d="M12,13.6q2.6,2.2 0,4.4q-2.6,-2.2 0,-4.4z"/><path d="M6,12q2.2,-2.6 4.4,0q-2.2,2.6 -4.4,0z"/><path d="M13.6,12q2.2,-2.6 4.4,0q-2.2,2.6 -4.4,0z"/></g>` +
    `<circle cx="12" cy="12" r="2" fill="#f4c430"/>` +
    `<g fill="#5b8fe8"><circle cx="6.2" cy="6.2" r="1"/><circle cx="17.8" cy="6.2" r="1"/><circle cx="6.2" cy="17.8" r="1"/><circle cx="17.8" cy="17.8" r="1"/></g>`,

  /** 柱の上で回る「空飛ぶ男」(ボラドーレス)。パパントラ。 */
  voladores:
    `<rect x="11.2" y="4" width="1.6" height="17" fill="#8a6a44"/>` +
    `<rect x="9" y="2.6" width="6" height="2" fill="#8a6a44"/>` +
    `<path d="M12,4q-7.5,1.6 -9,8.4" stroke="#6b5e50" stroke-width="1.3" fill="none"/>` +
    `<path d="M12,4q7.5,1.6 9,8.4" stroke="#6b5e50" stroke-width="1.3" fill="none"/>` +
    `<path d="M3,12.4l1.6,-3.4" stroke="#c8383f" stroke-width="2.4" stroke-linecap="round"/>` +
    `<circle cx="3" cy="14" r="1.8" fill="#c98a5f"/>` +
    `<path d="M21,12.4l-1.6,-3.4" stroke="#2f6ea8" stroke-width="2.4" stroke-linecap="round"/>` +
    `<circle cx="21" cy="14" r="1.8" fill="#c98a5f"/>`,

  /** 犬の土偶(ショロ)。コリマ。 */
  xolo:
    `<ellipse cx="11" cy="14.6" rx="7.2" ry="5" fill="#c8763f"/>` +
    `<circle cx="18" cy="9.6" r="3.4" fill="#c8763f"/>` +
    `<path d="M16.4,7l-0.6,-3.4l2.6,2z" fill="#c8763f"/>` +
    `<path d="M19.6,7l1.6,-3l0.8,3.4z" fill="#c8763f"/>` +
    `<circle cx="18.6" cy="9.2" r="0.9" fill="#241a10"/>` +
    `<path d="M5.4,17.6v3M9,18.6v2.6M13,18.6v2.6M16,17.6v3" stroke="#c8763f" stroke-width="2.2"/>` +
    `<path d="M4.4,12.6q-3,-0.4 -2,-3.4" stroke="#c8763f" stroke-width="2.2" fill="none"/>`,
};
