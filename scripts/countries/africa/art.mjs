/**
 * アフリカ大陸盤面の都市イラスト。
 *
 * `AFRICA_MARKS` は24×24の座標系に描くシンボル、`AFRICA_BG` は400×210の
 * 座標系に描く背景シーン(いずれもSVG断片の文字列)。韓国・フランスと同じく
 * 最初から文字列として持つ。動きは含めない。
 *
 * **この盤面は「アフリカ」をひとつの色調でまとめない。**33か国60都市が
 * まったく違う土地に立っているので、地域ごとにパレットを分ける:
 *
 * - 大西洋岸(atlanticport ほか): 湿った灰青の空 #9fc2d4、深い海 #276b8c、
 *   倉庫のパステル壁とトタンの錆 #c96f4a
 * - サハラ・サヘル(sahara / caravan ほか): 杏色の空 #f0cf9a、砂 #e5c084〜#c28844
 * - スワヒリ海岸(swahilicoast / dhow ほか): 明るい水色の空 #8fd0dc、
 *   ラグーンの青緑 #2fa3b0、サンゴ石の白 #f2ead8、彫刻扉の黒褐 #4a3520
 * - (以降のシーンで追加予定)コンゴ盆地の緑、銅ベルトの赤土、ナイルの岸、
 *   マグレブの白と青、南部高原の乾いた金色
 *
 * 全盤面共通の色は揃える: 顔・白 #f6efe2、強調 #f5b31c/#e8443f/#5b8fe8。
 *
 * 鍵は `cities.mjs` の `mark` / `bg` と一対一で対応する。
 *
 * **背景SVGの中央25%(x=151〜249 / y=54〜152)は都市シンボルに隠れて
 * 見えない。**見せたい細部は左右3分の1と手前(y>170)に置く。
 * `sky()` は必ず第3引数(次に来る塗りの開始y)を渡すこと。渡し忘れると
 * 空と地面のあいだに塗り残しの帯ができる。
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
 * 既定では y=124 までしか塗らないので、地面が下から始まるシーンでは
 * あいだが塗り残しになる。
 */
function sky(top, bottom, to = 124) {
  return band(0, 92, top) + band(84, Math.max(0, to - 84), bottom);
}

function ground(y, fill) {
  return `<rect x="0" y="${y}" width="${W}" height="${210 - y}" fill="${fill}"/>`;
}

function sun(cx, cy, r, fill = "#f5b31c") {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>`;
}

function clouds(cx, cy, scale = 1, fill = "#f6efe2") {
  const e = (dx, rx, ry) =>
    `<ellipse cx="${r1(cx + dx * scale)}" cy="${cy}" rx="${r1(rx * scale)}" ry="${r1(ry * scale)}"/>`;
  return `<g opacity=".8" fill="${fill}">${e(0, 18, 7)}${e(-10, 11, 5.5)}${e(11, 13, 5.5)}</g>`;
}

/** かもめ。 */
function gull(x, y, scale = 1) {
  const w = 8 * scale;
  return `<path d="M${r1(x - w)},${y}q${r1(w / 2)},-6 ${w},0q${r1(w / 2)},-6 ${w},0" fill="none" stroke="#4a4a52" stroke-width="1.4"/>`;
}

/** 波の反射線・水面。 */
function ripples(y, color = "#bfe8f4") {
  return `<g stroke="${color}" stroke-width="2" opacity=".7" fill="none"><path d="M26,${y}h74M176,${y + 12}h92M108,${y + 24}h62"/></g>`;
}

/** ココヤシ。幹をしならせ、放射状の葉を持つ。 */
function palm(x, base, h, lean = 6, frond = "#3f8f5a") {
  const top = r1(base - h);
  const tx = r1(x + lean);
  const fronds = [];
  for (const [dx, dy] of [[-16, -2], [-11, -9], [-3, -12], [6, -10], [14, -5], [16, 2]]) {
    fronds.push(
      `<path d="M${tx},${top}q${r1(dx * 0.5)},${r1(dy * 1.4)} ${dx},${dy}q${r1(-dx * 0.2)},${r1(-dy * 0.1 + 4)} ${r1(-dx * 0.3)},${r1(-dy * 0.2 + 5)}" fill="${frond}"/>`,
    );
  }
  return (
    `<path d="M${r1(x - 2)},${base}q${r1(lean * 0.4)},${r1(-h * 0.6)} ${lean},${-h}h4q${r1(-lean * 0.5)},${r1(h * 0.5)} ${r1(-lean + 3)},${h}z" fill="#8a6a42"/>` +
    `<g>${fronds.join("")}</g>` +
    `<circle cx="${tx}" cy="${r1(top + 2)}" r="2.6" fill="#6b4a26"/>`
  );
}

/** 港の起重機(ジブクレーン)。 */
function crane(x, base, h, fill = "#c96f4a") {
  return (
    `<path d="M${r1(x - 6)},${base}L${r1(x - 1)},${r1(base - h)}h2L${r1(x + 6)},${base}z" fill="${fill}"/>` +
    `<rect x="${r1(x - 3)}" y="${r1(base - h - 4)}" width="${r1(h * 0.78)}" height="5" fill="${fill}"/>` +
    `<rect x="${r1(x - h * 0.26)}" y="${r1(base - h - 4)}" width="${r1(h * 0.26)}" height="5" fill="${fill}"/>` +
    `<line x1="${r1(x + h * 0.66)}" y1="${r1(base - h)}" x2="${r1(x + h * 0.66)}" y2="${r1(base - h * 0.5)}" stroke="#5a4a3a" stroke-width="1.6"/>` +
    `<rect x="${r1(x + h * 0.66 - 5)}" y="${r1(base - h * 0.5)}" width="10" height="7" fill="#5a4a3a"/>`
  );
}

/** 切妻屋根の波板倉庫。壁と屋根の色を変えられる。 */
function warehouse(x, base, w, h, wall, roof) {
  const hw = r1(w / 2);
  return (
    `<rect x="${r1(x - hw)}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${wall}"/>` +
    `<path d="M${r1(x - hw - 4)},${r1(base - h)}h${w + 8}l-${r1(hw + 4)},-${r1(h * 0.42)}z" fill="${roof}"/>` +
    `<g stroke="${roof}" stroke-width="1.2" opacity=".35">` +
    `<path d="M${r1(x - hw + 5)},${r1(base - h)}v${h}M${r1(x - hw + 11)},${r1(base - h)}v${h}M${r1(x + hw - 5)},${r1(base - h)}v${h}M${r1(x + hw - 11)},${r1(base - h)}v${h}"/></g>` +
    `<rect x="${r1(x - w * 0.18)}" y="${r1(base - h * 0.62)}" width="${r1(w * 0.36)}" height="${r1(h * 0.62)}" fill="#5a4a3a"/>` +
    `<rect x="${r1(x - w * 0.18)}" y="${r1(base - h * 0.62)}" width="${r1(w * 0.36)}" height="4" fill="#3a3028"/>`
  );
}

/** 麻袋の山。落花生・カカオ・コーヒーの積み出しに共通で使う。 */
function sackPile(x, base) {
  const s = (dx, dy, rot = 0) =>
    `<g transform="translate(${r1(x + dx)},${r1(base + dy)}) rotate(${rot})">` +
    `<rect x="-11" y="-16" width="22" height="16" rx="6" fill="#c9a877"/>` +
    `<path d="M-11,-11h22" stroke="#a8875a" stroke-width="1.4"/>` +
    `<path d="M-4,-16q4,-4 8,0" fill="none" stroke="#8a6a42" stroke-width="2"/></g>`;
  return s(-14, 0, -4) + s(12, 0, 3) + s(-1, -13, 0);
}

/** 係船柱とロープ。埠頭の手前に置く。 */
function bollard(x, y) {
  return (
    `<path d="M${r1(x - 30)},${r1(y + 8)}q18,10 30,-2" fill="none" stroke="#8a6a42" stroke-width="2.4"/>` +
    `<rect x="${r1(x - 5)}" y="${r1(y - 8)}" width="10" height="12" rx="2" fill="#3a3f46"/>` +
    `<ellipse cx="${x}" cy="${r1(y - 8)}" rx="6" ry="3" fill="#545a62"/>`
  );
}

/** 貨物船。船体・船橋・積み荷のコンテナ。 */
function cargoShip(x, y, w, hull = "#b04a3a") {
  const hw = r1(w / 2);
  return (
    `<path d="M${r1(x - hw)},${y}h${w}l-8,14h${r1(-w + 16)}z" fill="${hull}"/>` +
    `<path d="M${r1(x - hw)},${y}h${w}v4h${-w}z" fill="#7a3226"/>` +
    `<rect x="${r1(x + hw - 26)}" y="${r1(y - 18)}" width="18" height="18" fill="#f6efe2"/>` +
    `<rect x="${r1(x + hw - 22)}" y="${r1(y - 14)}" width="10" height="5" fill="#20364a"/>` +
    `<rect x="${r1(x + hw - 20)}" y="${r1(y - 26)}" width="4" height="8" fill="#3a3f46"/>` +
    `<g><rect x="${r1(x - hw + 8)}" y="${r1(y - 9)}" width="16" height="9" fill="#e8a13a"/>` +
    `<rect x="${r1(x - hw + 26)}" y="${r1(y - 9)}" width="16" height="9" fill="#5b8fe8"/>` +
    `<rect x="${r1(x - hw + 16)}" y="${r1(y - 17)}" width="16" height="8" fill="#5f8f5a"/></g>`
  );
}

/**
 * 横向きの線路(側面から見た近景用)。バラスト帯・枕木・レール1本。
 * `tieW`/`gap` で軌間の広い狭いを見せ分けられる(portrail で使う)。
 */
function track(y, x0 = 0, x1 = W, tieW = 9, gap = 17, rail = "#4a4640", tie = "#6b5a44") {
  const ties = [];
  for (let x = x0 + 4; x < x1 - 8; x += gap) {
    ties.push(`<rect x="${x}" y="${y}" width="${tieW}" height="6" fill="${tie}"/>`);
  }
  return (
    `<rect x="${x0}" y="${r1(y - 3)}" width="${x1 - x0}" height="14" fill="#8a8074" opacity=".5"/>` +
    `<g>${ties.join("")}</g>` +
    `<rect x="${x0}" y="${r1(y - 1)}" width="${x1 - x0}" height="3.4" fill="${rail}"/>`
  );
}

/** 車止め(バッファストップ)。線路の終端に置く。 */
function bufferStop(x, y, dir = 1) {
  return (
    `<path d="M${x},${r1(y + 5)}l${r1(10 * dir)},-14" stroke="#8a4a3a" stroke-width="4" fill="none"/>` +
    `<rect x="${r1(x + (dir > 0 ? 6 : -10))}" y="${r1(y - 12)}" width="4" height="10" fill="#8a4a3a"/>` +
    `<rect x="${r1(x + (dir > 0 ? 4 : -8))}" y="${r1(y - 14)}" width="8" height="4" fill="#e8443f"/>`
  );
}

/** 有蓋貨車。 */
function boxcar(x, y, w, h, fill, roof = "#3a3028") {
  return (
    `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"/>` +
    `<rect x="${x}" y="${y}" width="${w}" height="3" fill="${roof}"/>` +
    `<rect x="${r1(x + w / 2 - 4)}" y="${r1(y + 4)}" width="8" height="${r1(h - 4)}" fill="${roof}" opacity=".55"/>` +
    `<circle cx="${r1(x + w * 0.22)}" cy="${r1(y + h + 4)}" r="4" fill="#2e2a26"/>` +
    `<circle cx="${r1(x + w * 0.78)}" cy="${r1(y + h + 4)}" r="4" fill="#2e2a26"/></g>`
  );
}

/** 腕木式信号機。 */
function semaphore(x, base, h) {
  return (
    `<rect x="${r1(x - 1.5)}" y="${r1(base - h)}" width="3" height="${h}" fill="#8a8478"/>` +
    `<rect x="${r1(x - 1)}" y="${r1(base - h)}" width="16" height="5" fill="#e8443f"/>` +
    `<rect x="${r1(x + 10)}" y="${r1(base - h)}" width="4" height="5" fill="#f6efe2"/>`
  );
}

/** 信号扱い所(操車場の塔)。 */
function signalBox(x, base, h) {
  return (
    `<g fill="#8a8478"><rect x="${r1(x - 3)}" y="${r1(base - h)}" width="6" height="${h}"/><rect x="${r1(x + 15)}" y="${r1(base - h)}" width="6" height="${h}"/></g>` +
    `<rect x="${r1(x - 10)}" y="${r1(base - h - 26)}" width="38" height="26" fill="#c9b088"/>` +
    `<rect x="${r1(x - 6)}" y="${r1(base - h - 21)}" width="30" height="11" fill="#20364a"/>` +
    `<path d="M${r1(x - 14)},${r1(base - h - 26)}h46l-6,-9h-34z" fill="#8a4a3a"/>`
  );
}

/** 給水塔。乾燥地の鉄道の目印。 */
function waterTower(x, base, h) {
  return (
    `<g stroke="#6b5a44" stroke-width="3.4" fill="none"><path d="M${r1(x - 10)},${base}L${r1(x - 6)},${r1(base - h * 0.55)}M${r1(x + 10)},${base}L${r1(x + 6)},${r1(base - h * 0.55)}M${r1(x - 8)},${r1(base - h * 0.2)}h16"/></g>` +
    `<path d="M${r1(x - 13)},${r1(base - h * 0.55)}h26v-${r1(h * 0.38)}h-26z" fill="#c9a877"/>` +
    `<path d="M${r1(x - 15)},${r1(base - h * 0.93)}h30l-15,-${r1(h * 0.12)}z" fill="#8a6a42"/>` +
    `<path d="M${r1(x + 13)},${r1(base - h * 0.72)}q10,2 10,12" stroke="#8a6a42" stroke-width="3" fill="none"/>`
  );
}

/** 平頂のアカシア。サバンナの象徴。 */
function acacia(x, base, s = 1) {
  return (
    `<g stroke="#6b4a2e" stroke-width="${r1(3 * s)}" fill="none">` +
    `<path d="M${x},${base}q${r1(-2 * s)},${r1(-14 * s)} ${r1(-8 * s)},${r1(-22 * s)}M${x},${base}q${r1(2 * s)},${r1(-14 * s)} ${r1(9 * s)},${r1(-21 * s)}M${x},${base}v${r1(-16 * s)}"/></g>` +
    `<path d="M${r1(x - 24 * s)},${r1(base - 22 * s)}q${r1(24 * s)},${r1(-14 * s)} ${r1(48 * s)},0q${r1(-6 * s)},${r1(7 * s)} ${r1(-14 * s)},${r1(7 * s)}h${r1(-20 * s)}q${r1(-8 * s)},0 ${r1(-14 * s)},${r1(-7 * s)}z" fill="#5f7f3a"/>`
  );
}

/** ウチワサボテン。マグレブ・エリトリア高原の縁どり。 */
function pricklyPear(x, base, s = 1) {
  const pad = (dx, dy, rx, ry, rot) =>
    `<ellipse cx="${r1(x + dx * s)}" cy="${r1(base + dy * s)}" rx="${r1(rx * s)}" ry="${r1(ry * s)}" transform="rotate(${rot} ${r1(x + dx * s)} ${r1(base + dy * s)})" fill="#4f8f4a"/>`;
  return (
    pad(0, -8, 6, 9, 0) + pad(-7, -16, 5, 7, -30) + pad(7, -17, 5, 7, 25) +
    `<circle cx="${r1(x - 9)}" cy="${r1(base - 22 * s)}" r="${r1(2.4 * s)}" fill="#c8384f"/>` +
    `<circle cx="${r1(x + 9)}" cy="${r1(base - 23 * s)}" r="${r1(2.4 * s)}" fill="#e8944a"/>`
  );
}

/** 遠景のなだらかな丘。 */
function hills(y, fill, count = 4) {
  const parts = [];
  for (let i = 0; i < count; i++) {
    const cx = 40 + (i * W) / count;
    parts.push(`<path d="M${cx - 74},${y}c22,-30 52,-30 74,0z" fill="${fill}"/>`);
  }
  return `<g opacity=".9">${parts.join("")}</g>`;
}

/** 高層ビル(窓の格子つき)。 */
function towerBlock(x, base, w, h, fill, win = "#f5b31c", lit = true) {
  const wins = [];
  if (lit) {
    for (let yy = base - h + 7; yy < base - 8; yy += 11) {
      for (let xx = x + 4; xx < x + w - 5; xx += 9) {
        if ((xx * 7 + yy * 13) % 3 !== 0) wins.push(`<rect x="${xx}" y="${r1(yy)}" width="4" height="5"/>`);
      }
    }
  }
  return (
    `<rect x="${x}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${fill}"/>` +
    `<g fill="${win}" opacity=".8">${wins.join("")}</g>`
  );
}

/** 旗ざお。実在の国旗は使わず、ゲームの強調色の三角旗を揚げる。 */
function flagpole(x, base, h, c = "#f5b31c") {
  return (
    `<rect x="${r1(x - 1.5)}" y="${r1(base - h)}" width="3" height="${h}" fill="#8a8478"/>` +
    `<path d="M${r1(x + 1.5)},${r1(base - h)}l22,5l-22,5z" fill="${c}"/>`
  );
}

/** ジャカランダ。紫の花冠の街路樹。 */
function jacaranda(x, base, r) {
  return (
    `<rect x="${r1(x - 2.5)}" y="${r1(base - r * 1.5)}" width="5" height="${r1(r * 1.5)}" fill="#6b5330"/>` +
    `<circle cx="${x}" cy="${r1(base - r * 1.8)}" r="${r}" fill="#9a7ac8"/>` +
    `<circle cx="${r1(x - r * 0.6)}" cy="${r1(base - r * 1.5)}" r="${r1(r * 0.6)}" fill="#8a6ab8"/>` +
    `<circle cx="${r1(x + r * 0.6)}" cy="${r1(base - r * 1.5)}" r="${r1(r * 0.6)}" fill="#aa8ad8"/>` +
    `<g fill="#9a7ac8" opacity=".7"><circle cx="${r1(x - r * 0.7)}" cy="${r1(base - 2)}" r="2"/><circle cx="${r1(x + r * 0.5)}" cy="${r1(base - 1)}" r="2"/><circle cx="${r1(x + r * 1.1)}" cy="${r1(base - 3)}" r="2"/></g>`
  );
}

/** 丸木舟(ピローグ)。立って漕ぐ人影つきにもできる。 */
function pirogue(x, y, s = 1, paddler = false) {
  let out = `<path d="M${r1(x - 20 * s)},${y}q${r1(20 * s)},${r1(7 * s)} ${r1(40 * s)},0l${r1(-4 * s)},${r1(-4 * s)}q${r1(-16 * s)},${r1(4 * s)} ${r1(-32 * s)},0z" fill="#5a4632"/>`;
  if (paddler) {
    out +=
      `<circle cx="${r1(x + 8 * s)}" cy="${r1(y - 14 * s)}" r="${r1(3.2 * s)}" fill="#3a2a1e"/>` +
      `<path d="M${r1(x + 8 * s)},${r1(y - 11 * s)}q${r1(-2 * s)},${r1(6 * s)} ${r1(-1 * s)},${r1(10 * s)}" stroke="#3a2a1e" stroke-width="${r1(3 * s)}" fill="none"/>` +
      `<path d="M${r1(x + 10 * s)},${r1(y - 9 * s)}l${r1(8 * s)},${r1(10 * s)}" stroke="#8a6a42" stroke-width="${r1(1.8 * s)}" fill="none"/>`;
  }
  return out;
}

/** ホテイアオイ(浮き草)のかたまり。コンゴ川の水面に浮く。 */
function hyacinth(x, y, s = 1) {
  return (
    `<g fill="#4f8f4a"><ellipse cx="${x}" cy="${y}" rx="${r1(9 * s)}" ry="${r1(3 * s)}"/><ellipse cx="${r1(x + 8 * s)}" cy="${r1(y + 2)}" rx="${r1(6 * s)}" ry="${r1(2.4 * s)}"/></g>` +
    `<circle cx="${r1(x + 2 * s)}" cy="${r1(y - 3 * s)}" r="${r1(1.8 * s)}" fill="#9a7ac8"/>`
  );
}

/** ヤシ科のナツメヤシ(果房つき)。 */
function datePalm(x, base, h, lean = 4) {
  return (
    palm(x, base, h, lean, "#4f8f3a") +
    `<circle cx="${r1(x + lean - 4)}" cy="${r1(base - h + 6)}" r="3" fill="#c87a3a"/>` +
    `<circle cx="${r1(x + lean + 5)}" cy="${r1(base - h + 7)}" r="3" fill="#c87a3a"/>`
  );
}

/** 金網フェンスの列(奥へ小さく)。国境用。 */
function borderFence(pts) {
  const posts = pts
    .map(([x, y, h]) => `<rect x="${r1(x - 1.2)}" y="${r1(y - h)}" width="2.4" height="${h}" fill="#6b7068"/>`)
    .join("");
  const [fx, fy, fh] = pts[0];
  const [lx, ly, lh] = pts[pts.length - 1];
  return (
    posts +
    `<g stroke="#8a8f88" stroke-width="1.4" fill="none">` +
    `<path d="M${fx},${r1(fy - fh)}L${lx},${r1(ly - lh)}"/>` +
    `<path d="M${fx},${r1(fy - fh * 0.62)}L${lx},${r1(ly - lh * 0.62)}"/>` +
    `<path d="M${fx},${r1(fy - fh * 0.28)}L${lx},${r1(ly - lh * 0.28)}"/></g>` +
    `<path d="M${fx},${r1(fy - fh - 3)}L${lx},${r1(ly - lh - 2)}" stroke="#5a5f52" stroke-width="1.2" stroke-dasharray="3 3" fill="none"/>`
  );
}

/** 赤白の遮断棒。 */
function barrier(x, y, len, angle = 0) {
  const seg = [];
  for (let i = 0; i < len; i += 12) {
    seg.push(`<rect x="${r1(x + i)}" y="${r1(y - 3)}" width="6" height="6" fill="#e8443f"/>`);
  }
  return (
    `<g transform="rotate(${angle} ${x} ${y})">` +
    `<rect x="${x}" y="${r1(y - 3)}" width="${len}" height="6" rx="3" fill="#f6efe2"/>${seg.join("")}</g>` +
    `<rect x="${r1(x - 4)}" y="${r1(y - 6)}" width="8" height="26" fill="#5a5f52"/>`
  );
}

/** サンゴ石造りの家。白い壁・平屋根の胸壁・彫刻扉。スワヒリ海岸用。 */
function coralHouse(x, base, w, h, wall = "#f2ead8", door = true) {
  const hw = r1(w / 2);
  const parts = [
    `<rect x="${r1(x - hw)}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${wall}"/>`,
    // 胸壁(パラペット)の刻み
    `<g fill="${wall}"><rect x="${r1(x - hw - 2)}" y="${r1(base - h - 5)}" width="${w + 4}" height="5"/></g>`,
    `<g fill="#d8ccb0"><rect x="${r1(x - hw + 3)}" y="${r1(base - h - 5)}" width="4" height="3"/><rect x="${r1(x - 2)}" y="${r1(base - h - 5)}" width="4" height="3"/><rect x="${r1(x + hw - 7)}" y="${r1(base - h - 5)}" width="4" height="3"/></g>`,
    // 鎧戸つきの窓
    `<rect x="${r1(x - hw + w * 0.16)}" y="${r1(base - h * 0.72)}" width="${r1(w * 0.18)}" height="${r1(h * 0.3)}" fill="#4a6b52"/>`,
    `<rect x="${r1(x + hw - w * 0.34)}" y="${r1(base - h * 0.72)}" width="${r1(w * 0.18)}" height="${r1(h * 0.3)}" fill="#4a6b52"/>`,
  ];
  if (door) {
    // ザンジバル扉: 尖頭アーチ・黒褐色・真鍮鋲
    parts.push(
      `<path d="M${r1(x - w * 0.13)},${base}v-${r1(h * 0.5)}q${r1(w * 0.13)},-${r1(h * 0.16)} ${r1(w * 0.26)},0v${r1(h * 0.5)}z" fill="#4a3520"/>`,
      `<path d="M${x},${base}v-${r1(h * 0.58)}" stroke="#2e2014" stroke-width="1.2"/>`,
      `<g fill="#f5b31c"><circle cx="${r1(x - w * 0.06)}" cy="${r1(base - h * 0.4)}" r="1.1"/><circle cx="${r1(x + w * 0.06)}" cy="${r1(base - h * 0.4)}" r="1.1"/><circle cx="${r1(x - w * 0.06)}" cy="${r1(base - h * 0.24)}" r="1.1"/><circle cx="${r1(x + w * 0.06)}" cy="${r1(base - h * 0.24)}" r="1.1"/></g>`,
    );
  }
  return parts.join("");
}

/** ダウ船。三日月型の船体と三角帆(ラティーンセイル)。 */
function dhow(x, y, scale = 1, sail = "#f6efe2") {
  const s = (v) => r1(v * scale);
  return (
    `<g>` +
    `<path d="M${r1(x - 26 * scale)},${y}q${s(26)},${s(10)} ${s(52)},0l${s(6)},-${s(6)}q-${s(32)},${s(6)} -${s(62)},0z" fill="#6b4a2e"/>` +
    `<line x1="${r1(x - 4 * scale)}" y1="${y}" x2="${r1(x + 8 * scale)}" y2="${r1(y - 40 * scale)}" stroke="#4a3520" stroke-width="${r1(2.2 * scale)}"/>` +
    `<path d="M${r1(x + 8 * scale)},${r1(y - 40 * scale)}L${r1(x - 22 * scale)},${r1(y - 8 * scale)}L${r1(x + 12 * scale)},${r1(y - 4 * scale)}z" fill="${sail}"/>` +
    `</g>`
  );
}

/** 砂丘。ふくらみと風下側の影。 */
function dune(cx, base, w, h, fill, shadow) {
  const hw = r1(w / 2);
  return (
    `<path d="M${r1(cx - hw)},${base}q${r1(hw * 0.7)},-${h} ${hw},-${h}q${r1(hw * 0.5)},0 ${hw},${h}z" fill="${fill}"/>` +
    (shadow
      ? `<path d="M${cx},${r1(base - h)}q${r1(hw * 0.5)},0 ${hw},${h}h-${r1(hw * 0.66)}z" fill="${shadow}" opacity=".55"/>`
      : "")
  );
}

/** 風紋。砂の手前に置く細い弧。 */
function sandRipples(y, color) {
  return `<g stroke="${color}" stroke-width="1.8" opacity=".6" fill="none"><path d="M14,${y}q20,-5 40,0M96,${y + 9}q24,-5 48,0M300,${y + 4}q22,-5 44,0M190,${y + 16}q26,-5 52,0M340,${y + 18}q20,-5 40,0M40,${y + 20}q22,-5 44,0"/></g>`;
}

/** 乾いた灌木(サバンナ・砂漠の縁)。 */
function dryShrub(x, base, s = 1, color = "#8a7a4a") {
  return (
    `<g stroke="${color}" stroke-width="${r1(1.8 * s)}" fill="none">` +
    `<path d="M${x},${base}q-${r1(3 * s)},-${r1(8 * s)} -${r1(8 * s)},-${r1(11 * s)}M${x},${base}q0,-${r1(10 * s)} ${r1(1 * s)},-${r1(14 * s)}M${x},${base}q${r1(4 * s)},-${r1(7 * s)} ${r1(9 * s)},-${r1(9 * s)}"/></g>`
  );
}

/**
 * 地平線へ収束する単線とその上の貨物列車。サハラ用。
 * 手前(x0,y0)から消失点(vx,vy)へ、レール2本と間隔の詰まる枕木を引く。
 */
function desertTrackWithTrain(x0, y0, vx, vy) {
  const parts = [];
  const gaugeNear = 44;
  const lerp = (a, b, t) => a + (b - a) * t;
  // 枕木: 奥へ行くほど間隔と長さを詰める
  let t = 0;
  while (t < 0.93) {
    const x = r1(lerp(x0, vx, t));
    const y = r1(lerp(y0, vy, t));
    const hw = r1((gaugeNear / 2 + 5) * (1 - t) + 1.2);
    parts.push(`<path d="M${r1(x - hw)},${y}h${r1(hw * 2)}" stroke="#6b5a44" stroke-width="${r1(4 * (1 - t) + 0.8)}"/>`);
    t += 0.035 + t * 0.09;
  }
  // レール2本
  const hwNear = gaugeNear / 2;
  parts.push(
    `<path d="M${r1(x0 - hwNear)},${y0}L${r1(vx - 1.4)},${vy}" stroke="#4a4640" stroke-width="2.6"/>`,
    `<path d="M${r1(x0 + hwNear)},${y0}L${r1(vx + 1.4)},${vy}" stroke="#4a4640" stroke-width="2.6"/>`,
  );
  // 消失点近くの貨物列車(先頭が奥)。後ろの車両ほど手前に大きく
  for (let i = 0; i < 9; i++) {
    const tt = 0.92 - i * 0.028;
    const x = r1(lerp(x0, vx, tt));
    const y = r1(lerp(y0, vy, tt));
    const s = (1 - tt) * 2.6 + 0.5;
    const cw = r1(7.5 * s);
    const ch = r1(5.2 * s);
    // 先頭(いちばん奥)が機関車。後続は貨車の色を交互に
    const fill = i === 0 ? "#8a4a3a" : i % 2 ? "#7a6a52" : "#5a5f66";
    parts.push(`<rect x="${r1(x - cw / 2)}" y="${r1(y - ch - 2)}" width="${cw}" height="${ch}" fill="${fill}"/>`);
  }
  // 先頭の排気(かすかな煙)
  parts.push(`<g fill="#d8c8a8" opacity=".7"><ellipse cx="${r1(vx - 4)}" cy="${r1(vy - 12)}" rx="7" ry="3"/><ellipse cx="${r1(vx - 14)}" cy="${r1(vy - 17)}" rx="9" ry="3.6"/></g>`);
  return `<g>${parts.join("")}</g>`;
}

/** 電信柱の列(砂漠の線路沿い)。奥ほど小さく。 */
function telegraphPoles(list) {
  return list
    .map(
      ([x, base, h]) =>
        `<g stroke="#6b5a44" stroke-width="${r1(h * 0.06)}" fill="none"><path d="M${x},${base}v-${h}M${r1(x - h * 0.18)},${r1(base - h * 0.88)}h${r1(h * 0.36)}"/></g>`,
    )
    .join("");
}

// ---------------------------------------------------------------------------
// 背景シーン。鍵は cities.mjs の `bg` と対応(17種、まず3種の見本)。
// ---------------------------------------------------------------------------

const AFRICA_BASE_BG = {
  /**
   * 大西洋岸の波止場。14都市が使う最多キーなので、特定の一港に寄せず
   * 「倉庫群・起重機・麻袋・埠頭の引き込み線」という共通要素で描く。
   * 湿った灰青の空と深い海で、サハラ・スワヒリ海岸と色調を分ける。
   */
  atlanticport:
    sky("#9fc2d4", "#dfe9e4", 118) +
    clouds(60, 32, 1.1) +
    clouds(330, 24, 0.85) +
    gull(96, 56) +
    gull(122, 46, 0.8) +
    gull(302, 62, 0.9) +
    // 海と防波堤
    band(118, 34, "#276b8c") +
    band(118, 5, "#5f9ab4") +
    `<rect x="0" y="128" width="92" height="5" fill="#5a5f58"/>` +
    ripples(134, "#7fb8cc") +
    // 貨物船(右の沖)
    cargoShip(330, 132, 96) +
    // 埠頭のコンクリート
    band(148, 62, "#a39a8b") +
    band(148, 6, "#8a8478") +
    // 倉庫群(左)。壁の色を棟ごとに変える
    warehouse(36, 148, 64, 42, "#e8d8b0", "#c96f4a") +
    warehouse(100, 148, 52, 34, "#7fa8a0", "#8a6a42") +
    // 起重機(中央寄りは隠れてもよい繰り返し)
    crane(150, 148, 56) +
    crane(196, 148, 44, "#a85a3a") +
    // 埠頭の引き込み線(全幅)と無蓋貨車
    track(178) +
    `<g><rect x="288" y="158" width="58" height="18" fill="#5a5f66"/>` +
    `<rect x="292" y="150" width="20" height="8" rx="3" fill="#c9a877"/>` +
    `<rect x="316" y="150" width="20" height="8" rx="3" fill="#c9a877"/>` +
    `<circle cx="300" cy="178" r="4.6" fill="#2e2a26"/><circle cx="334" cy="178" r="4.6" fill="#2e2a26"/></g>` +
    // 手前: 麻袋の山と係船柱・ロープ
    sackPile(52, 206) +
    bollard(376, 198) +
    `<rect x="120" y="192" width="26" height="14" rx="2" fill="#5b8fe8"/>` +
    `<rect x="150" y="196" width="22" height="10" rx="2" fill="#e8443f"/>`,

  /**
   * サハラ。砂丘のあいだを単線が地平線へ収束し、その果てに長い貨物列車が
   * 消えていく。杏色の空と三段階の砂の色。列車と線路そのものが主役。
   */
  sahara:
    sky("#f0cf96", "#f8ecd0", 130) +
    sun(64, 44, 20, "#faf0d2") +
    `<circle cx="64" cy="44" r="27" fill="#faf0d2" opacity=".35"/>` +
    // 遠景の砂丘の稜線
    `<path d="M0,128q60,-16 120,-6q80,12 160,-4q60,-10 120,4v14H0z" fill="#e5c084"/>` +
    ground(128, "#d9ab66") +
    // 中景の砂丘(風下の影つき)
    dune(60, 158, 150, 34, "#cf9a54", "#b8813e") +
    dune(330, 152, 170, 30, "#cf9a54", "#b8813e") +
    dune(196, 146, 110, 18, "#d4a35c", "#bf8a46") +
    // 単線と、地平線に消える貨物列車・電信柱
    desertTrackWithTrain(96, 210, 318, 131) +
    telegraphPoles([
      [352, 196, 42],
      [338, 172, 28],
      [330, 154, 18],
      [325, 142, 11],
    ]) +
    // 手前: 風紋・灌木・砂に半ば埋もれた予備レール
    sandRipples(178, "#b8813e") +
    dryShrub(30, 196, 1.4) +
    dryShrub(262, 202, 1.1) +
    `<path d="M10,206q30,-4 60,-1" stroke="#4a4640" stroke-width="3" fill="none" opacity=".7"/>` +
    `<path d="M22,203q10,-8 6,-14" stroke="#c28844" stroke-width="5" fill="none"/>`,

  /**
   * スワヒリ海岸。サンゴ石の白い家並みと彫刻扉、ラグーンに浮かぶダウ船。
   * ザンジバル・モンバサ。明るい水色とターコイズで大西洋岸と色調を分ける。
   */
  swahilicoast:
    sky("#8fd0dc", "#eaf6ee", 108) +
    sun(348, 36, 15, "#faf0d2") +
    clouds(120, 34, 0.9) +
    gull(280, 52, 0.9) +
    gull(258, 42, 0.7) +
    // ラグーン(浜の下まで塗り込んで、波打ち際の隙間を作らない)
    band(108, 80, "#2fa3b0") +
    band(108, 6, "#7fc8d0") +
    ripples(126, "#9fdce4") +
    `<g stroke="#9fdce4" stroke-width="2" opacity=".6" fill="none"><path d="M290,148h56M40,152h48"/></g>` +
    // 沖の小さなダウ船と手前のダウ船(右)
    dhow(268, 122, 0.45) +
    dhow(330, 152, 1.1) +
    // サンゴ石の家並み(左)。手前の一軒に大きなザンジバル扉
    coralHouse(120, 168, 52, 52, "#ece2cc", false) +
    coralHouse(30, 170, 60, 62, "#f2ead8", false) +
    coralHouse(74, 172, 44, 44, "#e4d8bc", false) +
    // 木の出窓バルコニー(ストーンタウン風)
    `<g><rect x="8" y="126" width="26" height="16" fill="#8a6a42"/><g stroke="#6b4a2e" stroke-width="1.4"><path d="M12,126v16M18,126v16M24,126v16M30,126v16"/></g><rect x="6" y="124" width="30" height="3" fill="#6b4a2e"/></g>` +
    // 浜(手前)
    `<path d="M0,168q100,-6 200,4q110,10 200,-2v40H0z" fill="#ecd8a6"/>` +
    // 主役の彫刻扉(左手前、単体で大きく)
    `<g><rect x="34" y="158" width="34" height="46" fill="#f2ead8"/>` +
    `<path d="M42,204v-30q9,-10 18,0v30z" fill="#4a3520"/>` +
    `<path d="M51,204v-36" stroke="#2e2014" stroke-width="1.6"/>` +
    `<path d="M40,172q11,-13 22,0" fill="none" stroke="#8a6a42" stroke-width="3"/>` +
    `<g fill="#f5b31c"><circle cx="46.5" cy="182" r="1.5"/><circle cx="55.5" cy="182" r="1.5"/><circle cx="46.5" cy="192" r="1.5"/><circle cx="55.5" cy="192" r="1.5"/></g></g>` +
    // ヤシと浜の小物
    palm(378, 210, 64, -8) +
    palm(108, 196, 40, 6) +
    `<g fill="#c9a877"><path d="M240,196a10,7 0 0 1 20,0z"/><path d="M266,199a8,6 0 0 1 16,0z"/></g>` +
    `<path d="M244,190q6,-5 12,0" stroke="#8a6a42" stroke-width="1.6" fill="none"/>` +
    `<g fill="#7a8a8a" opacity=".8"><ellipse cx="180" cy="200" rx="9" ry="4"/><ellipse cx="196" cy="205" rx="6" ry="3"/></g>`,

  /**
   * ダルエスサラーム専用。夜明けの港で、軌間の違う2本の線路が
   * 互いに届かないまま車止めで終わる。上が広軌(TAZARA)、下が狭軌。
   */
  portrail:
    sky("#e8b09a", "#f6ddc6", 112) +
    sun(320, 72, 14) +
    `<circle cx="320" cy="72" r="20" fill="#f5b31c" opacity=".3"/>` +
    clouds(90, 34, 1, "#f8e4d4") +
    gull(140, 52, 0.9) +
    gull(118, 42, 0.7) +
    // 海と沖の貨物船・対岸のクレーン群
    band(112, 26, "#4a7f9a") +
    band(112, 4, "#c8a890") +
    ripples(122, "#7fa8b8") +
    cargoShip(70, 124, 70) +
    crane(356, 138, 52, "#6b5a52") +
    crane(388, 138, 40, "#6b5a52") +
    // 操車場
    ground(138, "#b8a488") +
    // 上: 広軌(枕木が広い)。車止めで途切れる
    track(166, 0, 246, 12, 15) +
    bufferStop(250, 168) +
    boxcar(40, 144, 64, 20, "#8a4a3a") +
    // 下: 狭軌(枕木が狭い)。反対向きの車止め
    track(192, 150, 400, 7, 13) +
    bufferStop(148, 194, -1) +
    boxcar(300, 170, 56, 20, "#5a6a72") +
    // 積み替えのトラック(中央、隠れてもよい)
    `<g><rect x="176" y="152" width="20" height="14" rx="2" fill="#3f6b52"/>` +
    `<rect x="196" y="148" width="36" height="18" fill="#8a8478"/>` +
    `<rect x="200" y="140" width="12" height="8" fill="#c9a877"/><rect x="214" y="140" width="12" height="8" fill="#5b8fe8"/>` +
    `<circle cx="184" cy="168" r="4.6" fill="#2e2a26"/><circle cx="222" cy="168" r="4.6" fill="#2e2a26"/></g>` +
    // 手前の荷
    sackPile(40, 208) +
    `<rect x="330" y="196" width="12" height="14" rx="2" fill="#4a4642"/>` +
    `<rect x="346" y="198" width="12" height="12" rx="2" fill="#8a4a3a"/>`,

  /**
   * 内陸の操車場。信号扱い所・腕木信号・貨車の列・枕木の山。
   * トロロ・カピリンポシ・ンドラ・ブラワヨ・フランシスタウン。
   */
  railjunction:
    sky("#a8ccd8", "#e6ecd8", 128) +
    clouds(70, 30, 1) +
    clouds(330, 24, 0.8) +
    hills(126, "#9a8a62", 4) +
    ground(128, "#c4a878") +
    // 奥の線路と貨車の列(左)
    track(146, 0, 400, 7, 14) +
    boxcar(14, 128, 44, 16, "#5f7f5a") +
    boxcar(62, 128, 44, 16, "#8a4a3a") +
    boxcar(110, 128, 44, 16, "#5a6a72") +
    signalBox(330, 146, 26) +
    // 分岐器: 中の線から奥の線へ逸れていく
    `<g stroke="#4a4640" stroke-width="3" fill="none"><path d="M150,171C110,168 76,152 28,148"/><path d="M166,171C126,170 92,158 44,150"/></g>` +
    // 中の線路とタンク車
    track(172, 0, 400) +
    `<g><rect x="286" y="164" width="60" height="6" fill="#5a5f66"/>` +
    `<rect x="288" y="150" width="56" height="16" rx="8" fill="#c9b088"/>` +
    `<rect x="310" y="144" width="12" height="6" fill="#8a8478"/>` +
    `<circle cx="298" cy="172" r="4.6" fill="#2e2a26"/><circle cx="334" cy="172" r="4.6" fill="#2e2a26"/></g>` +
    semaphore(56, 168, 36) +
    semaphore(262, 166, 30) +
    // 手前の線路と保線の道具
    track(198, 0, 400, 10, 16) +
    `<g fill="#6b5a44"><rect x="322" y="200" width="52" height="5"/><rect x="326" y="195" width="44" height="5"/><rect x="330" y="190" width="36" height="5"/></g>` +
    `<g><rect x="60" y="188" width="30" height="6" fill="#8a6a42"/><circle cx="66" cy="196" r="4" fill="#2e2a26"/><circle cx="84" cy="196" r="4" fill="#2e2a26"/><path d="M74,188l10,-12" stroke="#5a4a3a" stroke-width="2.6" fill="none"/></g>` +
    `<g fill="#5a5f52"><rect x="120" y="196" width="9" height="12" rx="1"/><rect x="132" y="198" width="9" height="10" rx="1"/></g>` +
    `<ellipse cx="230" cy="130" rx="40" ry="6" fill="#d8c8a8" opacity=".5"/>`,

  /**
   * 乾いた海岸を走る電化高架線。ジブチ・ディレダワ。白茶けた空、
   * 玄武岩の黒い石、下には朽ちた旧メーターゲージ線が残る。
   */
  desertport:
    sky("#e6e6d2", "#f6f2e2", 118) +
    sun(60, 42, 16, "#faf6e0") +
    `<circle cx="60" cy="42" r="23" fill="#faf6e0" opacity=".4"/>` +
    gull(300, 52, 0.8) +
    band(118, 22, "#2f7a8a") +
    band(118, 4, "#9ac0b8") +
    ripples(126, "#5f9a9a") +
    cargoShip(344, 130, 58) +
    ground(140, "#d8c8a0") +
    // 電化高架線(全幅)。架線と架線柱、白い電車
    `<g fill="#a8a090"><rect x="12" y="107" width="8" height="44"/><rect x="88" y="107" width="8" height="44"/><rect x="164" y="107" width="8" height="44"/><rect x="240" y="107" width="8" height="44"/><rect x="316" y="107" width="8" height="44"/><rect x="382" y="107" width="8" height="42"/></g>` +
    `<rect x="0" y="100" width="400" height="8" fill="#b8b0a0"/>` +
    `<rect x="0" y="100" width="400" height="2.4" fill="#8a8478"/>` +
    `<g stroke="#6b7068" stroke-width="1.6" fill="none"><path d="M40,100V72h10M210,100V72h10M370,100V72h10M0,78q100,6 210,0q100,-6 190,2"/></g>` +
    `<g><rect x="16" y="84" width="128" height="16" rx="4" fill="#f6efe2"/>` +
    `<rect x="16" y="93" width="128" height="4" fill="#3f8f5a"/>` +
    `<path d="M144,84q10,4 10,16h-10z" fill="#e8443f"/>` +
    `<g fill="#20364a"><rect x="24" y="87" width="10" height="5"/><rect x="40" y="87" width="10" height="5"/><rect x="56" y="87" width="10" height="5"/><rect x="72" y="87" width="10" height="5"/><rect x="88" y="87" width="10" height="5"/></g>` +
    `<path d="M52,84l8,-7l8,7" stroke="#5a5f66" stroke-width="2" fill="none"/></g>` +
    // 朽ちた旧線(手前)と玄武岩・給水塔
    `<g fill="#4a4642"><ellipse cx="60" cy="148" rx="10" ry="4"/><ellipse cx="130" cy="152" rx="7" ry="3"/><ellipse cx="250" cy="150" rx="9" ry="3.6"/><ellipse cx="300" cy="146" rx="6" ry="2.6"/></g>` +
    track(182, 0, 190, 8, 15, "#8a5a3a", "#5a4a3a") +
    `<ellipse cx="192" cy="184" rx="26" ry="6" fill="#d8c8a0"/>` +
    waterTower(352, 200, 56) +
    dryShrub(240, 200, 1.2, "#8a7a4a") +
    dryShrub(96, 206, 1),

  /**
   * 銅ベルト。露天掘りの段丘・精錬所の煙・鉱石列車。
   * ヨハネスブルグ・ルブンバシ・コルウェジ。赤茶けた土とマラカイトの緑。
   */
  copperbelt:
    sky("#cfc0a8", "#e8dcc4", 104) +
    `<g fill="#b8b0a0" opacity=".6"><ellipse cx="330" cy="44" rx="30" ry="9"/><ellipse cx="296" cy="34" rx="22" ry="7"/><ellipse cx="262" cy="28" rx="16" ry="5"/></g>` +
    ground(104, "#a8542f") +
    // 露天掘りの段丘(左)。下るほど暗く
    `<path d="M0,118q120,-18 250,0v210H0z" fill="#b86038"/>` +
    `<path d="M0,140q110,-16 218,0l-10,18q-100,-14 -208,0z" fill="#96422a"/>` +
    `<path d="M0,176q100,-14 192,0l-8,16q-90,-12 -184,0z" fill="#7f3722"/>` +
    `<path d="M0,206q80,-10 160,0v4H0z" fill="#6b2e1c"/>` +
    `<g stroke="#c87a4a" stroke-width="1.4" opacity=".6" fill="none"><path d="M8,128q110,-16 232,0M8,164q100,-14 200,0M8,196q86,-11 172,0"/></g>` +
    // 段の上の運搬トラック(小さく)
    `<g><rect x="94" y="152" width="18" height="8" fill="#f5b31c"/><rect x="108" y="148" width="8" height="7" fill="#f5b31c"/><circle cx="99" cy="161" r="3" fill="#2e2a26"/><circle cx="110" cy="161" r="3" fill="#2e2a26"/></g>` +
    // 精錬所(右)。小屋・煙突・注がれる鉱滓の赤い光
    `<rect x="286" y="122" width="104" height="40" fill="#8a7a6a"/>` +
    `<path d="M286,122l18,-10l8,10l18,-10l8,10l18,-10l8,10l18,-10l8,10z" fill="#6b5f52"/>` +
    `<rect x="344" y="52" width="16" height="70" fill="#7a6a5a"/>` +
    `<rect x="344" y="58" width="16" height="6" fill="#e8443f"/>` +
    `<g fill="#c8bcac" opacity=".8"><ellipse cx="352" cy="42" rx="12" ry="6"/><ellipse cx="364" cy="30" rx="16" ry="7"/><ellipse cx="382" cy="20" rx="20" ry="8"/></g>` +
    `<path d="M300,162l-14,26h10l10,-26z" fill="#f5b31c"/>` +
    `<path d="M296,188q-8,8 -2,14q10,2 14,-6z" fill="#e8443f"/>` +
    `<circle cx="300" cy="190" r="3" fill="#f5b31c"/>` +
    // 送電鉄塔(遠景)
    `<g stroke="#6b5f52" stroke-width="1.6" fill="none"><path d="M262,104V76M256,80h12M258,88h8M262,76l-6,28M262,76l6,28"/></g>` +
    // 鉱石列車(手前)。マラカイト色の鉱石を積む
    track(196, 0, 400, 10, 16) +
    `<g><rect x="28" y="176" width="34" height="18" rx="2" fill="#5a5f66"/>` +
    `<rect x="30" y="170" width="14" height="8" fill="#3a3f46"/>` +
    `<circle cx="36" cy="198" r="4.4" fill="#2e2a26"/><circle cx="54" cy="198" r="4.4" fill="#2e2a26"/></g>` +
    `<g>` +
    `<rect x="70" y="180" width="42" height="14" fill="#6b5f52"/><path d="M74,180q17,-9 34,0z" fill="#4fae8a"/>` +
    `<circle cx="78" cy="198" r="4.4" fill="#2e2a26"/><circle cx="104" cy="198" r="4.4" fill="#2e2a26"/>` +
    `<rect x="118" y="180" width="42" height="14" fill="#6b5f52"/><path d="M122,180q17,-9 34,0z" fill="#4fae8a"/>` +
    `<circle cx="126" cy="198" r="4.4" fill="#2e2a26"/><circle cx="152" cy="198" r="4.4" fill="#2e2a26"/>` +
    `<rect x="166" y="180" width="42" height="14" fill="#6b5f52"/><path d="M170,180q17,-9 34,0z" fill="#4fae8a"/>` +
    `<circle cx="174" cy="198" r="4.4" fill="#2e2a26"/><circle cx="200" cy="198" r="4.4" fill="#2e2a26"/>` +
    `</g>`,

  /**
   * ナイルの岸。ナツメヤシ・ファルーカの白帆・対岸の神殿とオベリスク。
   * カイロ・アレクサンドリア・アスワン。
   */
  nilebank:
    sky("#a8d4e4", "#eaf4e4", 118) +
    clouds(140, 30, 0.9) +
    gull(250, 46, 0.8) +
    // 対岸の砂色の岸と神殿
    band(118, 14, "#e0c288") +
    `<g fill="#d8b070"><path d="M312,132v-24l7,-4h12l7,4v24z"/><path d="M344,132v-20l6,-3h10l6,3v20z"/></g>` +
    `<g fill="#a8875a"><rect x="322" y="118" width="8" height="14"/><rect x="352" y="120" width="7" height="12"/></g>` +
    `<path d="M298,132v-30l4,-8l4,8v30z" fill="#d8b070"/>` +
    `<g fill="#4f8f3a" opacity=".8"><ellipse cx="380" cy="124" rx="10" ry="5"/><ellipse cx="288" cy="126" rx="8" ry="4"/></g>` +
    // 川とファルーカ
    band(132, 40, "#3f7fae") +
    ripples(142, "#9fc8dc") +
    ripples(158, "#9fc8dc") +
    dhow(84, 158, 0.85, "#f6efe2") +
    dhow(126, 144, 0.5, "#f6efe2") +
    // 手前の緑の岸
    band(172, 5, "#8a7a4a") +
    ground(176, "#7a9a4a") +
    `<g stroke="#5f8a3a" stroke-width="2" opacity=".7" fill="none"><path d="M130,188h84M120,198h104M140,206h70"/></g>` +
    datePalm(30, 210, 66, -6) +
    datePalm(370, 206, 58, 6) +
    datePalm(332, 198, 42, -5) +
    // はねつるべ(シャドゥーフ)と水がめ
    `<g><rect x="272" y="172" width="4" height="26" fill="#6b5330"/>` +
    `<path d="M256,178L302,166" stroke="#8a6a42" stroke-width="3" fill="none"/>` +
    `<circle cx="302" cy="166" r="4.4" fill="#7a6a4a"/>` +
    `<path d="M258,178v10" stroke="#8a6a42" stroke-width="1.6" fill="none"/>` +
    `<path d="M253,188h10l-2,7h-6z" fill="#b86038"/></g>` +
    `<g fill="#b86038"><path d="M192,194q-5,10 0,14h12q5,-4 0,-14q-3,-5 -12,0z"/><path d="M212,198q-4,8 0,11h10q4,-3 0,-11q-3,-4 -10,0z"/></g>` +
    `<g stroke="#4f8f3a" stroke-width="2" fill="none"><path d="M66,192q-2,-12 -6,-16M70,192q0,-14 2,-18M76,192q3,-10 8,-14"/></g>`,

  /**
   * マグレブの旧市街。白い漆喰の屋根の重なり・青い扉と鎧戸・
   * 角形ミナレット・馬蹄形アーチ。チュニス・アルジェ。
   */
  oldtown:
    sky("#5f9fd4", "#c8e0ec", 96) +
    clouds(300, 24, 0.8) +
    `<rect x="300" y="96" width="100" height="12" fill="#3f7fae"/>` +
    `<path d="M310,102h30M352,105h26" stroke="#9fc8dc" stroke-width="1.6" opacity=".8"/>` +
    ground(96, "#e8e0d0") +
    // 奥の屋根の重なり(白のトーン違い)と白いドーム
    `<g><rect x="0" y="96" width="72" height="30" fill="#f2ead8"/><rect x="76" y="102" width="66" height="26" fill="#e4dcc8"/><rect x="146" y="98" width="72" height="30" fill="#ece4d2"/><rect x="222" y="104" width="72" height="26" fill="#f2ead8"/></g>` +
    `<path d="M96,102a12,10 0 0 1 24,0z" fill="#f6f2e6"/>` +
    `<path d="M250,104a10,9 0 0 1 20,0z" fill="#f6f2e6"/>` +
    // 角形ミナレット(左)
    `<rect x="42" y="42" width="20" height="90" fill="#f2ead8"/>` +
    `<rect x="40" y="38" width="24" height="6" fill="#d8ccb0"/>` +
    `<path d="M44,38h16l-8,-12z" fill="#3f8f5a"/>` +
    `<g fill="#2f6ea8"><rect x="48" y="52" width="8" height="12"/><rect x="48" y="76" width="8" height="12"/><rect x="48" y="100" width="8" height="12"/></g>` +
    // 中程の家並み(青い鎧戸)
    `<g><rect x="0" y="126" width="90" height="48" fill="#f2ead8"/><rect x="94" y="132" width="76" height="44" fill="#ece4d2"/><rect x="252" y="128" width="80" height="48" fill="#f2ead8"/></g>` +
    `<g fill="#2f6ea8"><rect x="14" y="136" width="12" height="16"/><rect x="44" y="136" width="12" height="16"/><rect x="106" y="142" width="12" height="16"/><rect x="140" y="142" width="12" height="16"/><rect x="266" y="138" width="12" height="16"/><rect x="298" y="138" width="12" height="16"/></g>` +
    // 洗濯物のロープ
    `<path d="M170,138q42,8 82,-2" stroke="#8a8478" stroke-width="1.2" fill="none"/>` +
    `<g><rect x="188" y="140" width="9" height="12" fill="#5b8fe8"/><rect x="206" y="142" width="9" height="12" fill="#f5b31c"/><rect x="226" y="140" width="9" height="12" fill="#e8443f"/></g>` +
    // ブーゲンビリア
    `<g fill="#c8386a"><circle cx="96" cy="152" r="9"/><circle cx="106" cy="146" r="7"/><circle cx="88" cy="144" r="6"/><circle cx="102" cy="160" r="6"/></g>` +
    `<g fill="#e06a92"><circle cx="92" cy="148" r="2.4"/><circle cx="102" cy="152" r="2.4"/></g>` +
    // 路地の石段(中央、隠れてもよい)
    `<g fill="#b8b0a0"><rect x="182" y="176" width="52" height="8"/><rect x="186" y="184" width="48" height="8"/><rect x="182" y="192" width="52" height="8"/><rect x="186" y="200" width="48" height="10"/></g>` +
    `<rect x="172" y="170" width="8" height="40" fill="#e4dcc8"/><rect x="238" y="170" width="8" height="40" fill="#e4dcc8"/>` +
    // 手前の壁と馬蹄形アーチの門(右)・タイル帯
    `<rect x="292" y="146" width="108" height="64" fill="#ece4d2"/>` +
    `<path d="M316,210v-34a18,20 0 1 1 36,0v34z" fill="#4a3a2e"/>` +
    `<path d="M318,176a16,18 0 1 1 32,0" fill="none" stroke="#2f6ea8" stroke-width="4"/>` +
    `<g fill="#2f6ea8"><path d="M296,196l7,7l-7,7zM310,196l7,7l-7,7l0,-0zM366,196l7,7l-7,7zM380,196l7,7l-7,7z"/></g>` +
    // 鉢植え
    `<g><path d="M282,200h14l-2,10h-10z" fill="#b86038"/><circle cx="289" cy="196" r="6" fill="#4f8f4a"/></g>` +
    `<g><path d="M136,196h12l-2,9h-8z" fill="#b86038"/><circle cx="142" cy="192" r="5" fill="#4f8f4a"/></g>` +
    // 昼の砂色の路面
    band(204, 6, "#d8ccb0"),

  /**
   * サバンナ。赤土の道・金色の草原・平頂アカシア・キリンと遠くの群れ。
   * ナイロビ・ヴォイ。
   */
  savannah:
    sky("#9fcce0", "#e8f0dc", 112) +
    clouds(90, 32, 1.1) +
    clouds(300, 26, 0.9) +
    hills(110, "#8a9a8a", 3) +
    ground(112, "#d9b86a") +
    // 遠くの群れ(ヌー)と土ぼこり
    `<ellipse cx="296" cy="128" rx="48" ry="5" fill="#c8ab74" opacity=".8"/>` +
    `<g fill="#5a4a3a"><ellipse cx="266" cy="126" rx="4" ry="2.6"/><ellipse cx="276" cy="128" rx="4" ry="2.6"/><ellipse cx="287" cy="125" rx="4" ry="2.6"/><ellipse cx="297" cy="128" rx="4" ry="2.6"/><ellipse cx="308" cy="126" rx="4" ry="2.6"/><ellipse cx="318" cy="128" rx="4" ry="2.6"/><ellipse cx="328" cy="125" rx="4" ry="2.6"/></g>` +
    // 赤土の道(手前から地平線へ)
    `<path d="M0,210h70C170,178 250,150 322,130l-16,-3C230,146 120,178 0,198z" fill="#b86a3a"/>` +
    `<path d="M40,200q60,-16 120,-36" stroke="#a85a30" stroke-width="2" opacity=".6" fill="none"/>` +
    // アカシア(左に大、右に中、奥に小)
    acacia(64, 152, 1.5) +
    acacia(336, 146, 0.95) +
    acacia(212, 126, 0.5) +
    // キリンの親子(右)
    `<g fill="#b8813e"><path d="M290,162q1,-26 12,-34l3,4l-7,10l2,20z"/><ellipse cx="292" cy="164" rx="12" ry="7"/><path d="M284,170v14M290,171v14M296,170v14M301,168v13"/><path d="M301,130l5,-3l3,3l-3,3z"/></g>` +
    `<g stroke="#b8813e" stroke-width="2.6"><path d="M284,170v14M291,171v14M297,170v14M302,167v13"/></g>` +
    `<g fill="#8a5a2e"><circle cx="290" cy="160" r="1.8"/><circle cx="295" cy="165" r="1.8"/><circle cx="297" cy="141" r="1.4"/><circle cx="299" cy="150" r="1.6"/></g>` +
    `<g fill="#b8813e"><path d="M316,172q1,-14 7,-19l2,3l-4,6l1,11z"/><ellipse cx="317" cy="174" rx="7" ry="4.4"/></g>` +
    `<g stroke="#b8813e" stroke-width="2"><path d="M313,177v9M317,178v9M321,177v9"/></g>` +
    // シロサギ(キリンの脇の白い点)
    `<g fill="#f6efe2"><ellipse cx="276" cy="180" rx="4" ry="2.6"/><path d="M279,178q3,-4 5,-4"/></g>` +
    // アリ塚(左)
    `<path d="M24,196q4,-22 12,-26q8,4 12,26z" fill="#a85a32"/>` +
    // 草むらとホロホロチョウ
    dryShrub(140, 200, 1.3, "#b8973f") +
    dryShrub(360, 196, 1.2, "#b8973f") +
    dryShrub(240, 206, 1, "#b8973f") +
    `<g fill="#3a3f46"><ellipse cx="104" cy="200" rx="4.4" ry="3.2"/><ellipse cx="116" cy="203" rx="4" ry="3"/><circle cx="107" cy="195" r="1.6"/><circle cx="119" cy="199" r="1.5"/></g>`,

  /**
   * 高地の峠。段々畑・峡谷を渡る石造高架橋・ウチワサボテン。
   * アスマラ・コンスタンティーヌ。
   */
  highlandpass:
    sky("#9fc8dc", "#e6eee8", 100) +
    clouds(320, 26, 0.9) +
    clouds(60, 22, 0.7) +
    hills(100, "#6b8a52", 3) +
    ground(100, "#8fae63") +
    // 峡谷の両壁
    `<path d="M0,210V122L36,96l52,8l30,26l-8,80z" fill="#8a7a62"/>` +
    `<path d="M400,210V112l-38,-20l-58,12l-16,32l10,74z" fill="#9a8a6e"/>` +
    `<g stroke="#6b5f4a" stroke-width="1.4" opacity=".6" fill="none"><path d="M8,140q50,-16 96,-4M6,168q46,-14 94,-6M336,128q34,-8 58,-2M330,160q40,-10 64,-4"/></g>` +
    // 谷底の細い川
    `<path d="M196,210q-4,-30 12,-52q-8,26 0,52z" fill="#4f9ab4"/>` +
    // 石造の高架橋と赤いレールカー
    `<g fill="#c9b088"><rect x="104" y="118" width="196" height="7"/><rect x="126" y="125" width="10" height="44"/><rect x="190" y="125" width="10" height="56"/><rect x="254" y="125" width="10" height="42"/></g>` +
    `<g stroke="#c9b088" stroke-width="5" fill="none"><path d="M112,152a24,26 0 0 1 42,0M168,164a26,32 0 0 1 46,0M226,158a22,26 0 0 1 40,0"/></g>` +
    `<g><rect x="108" y="106" width="40" height="12" rx="3" fill="#c8384f"/><rect x="112" y="109" width="8" height="5" fill="#f6efe2"/><rect x="124" y="109" width="8" height="5" fill="#f6efe2"/><rect x="136" y="109" width="8" height="5" fill="#f6efe2"/></g>` +
    // 段々畑(左右の手前)
    `<g><path d="M0,210v-44q40,-8 76,4l-4,40z" fill="#7a9a4a"/><path d="M0,186q38,-8 72,2" stroke="#5f7f3a" stroke-width="2" fill="none"/><path d="M0,200q34,-7 68,2" stroke="#5f7f3a" stroke-width="2" fill="none"/></g>` +
    `<g><path d="M400,210v-52q-44,-8 -84,6l6,46z" fill="#a8bd6a"/><path d="M400,178q-42,-8 -80,4" stroke="#7f9a4a" stroke-width="2" fill="none"/><path d="M400,194q-38,-7 -74,4" stroke="#7f9a4a" stroke-width="2" fill="none"/></g>` +
    pricklyPear(30, 206, 1.1) +
    pricklyPear(362, 204, 1.3) +
    `<g fill="#55704a"><ellipse cx="46" cy="172" rx="5" ry="9"/><ellipse cx="356" cy="166" rx="5" ry="9"/></g>`,

  /**
   * 広い川の渡し。対岸に向かい合う二つの町、フェリーとピローグ、
   * ホテイアオイ。キゴマ・キンシャサ・ブラザヴィル。
   */
  rivercrossing:
    sky("#c8d0b0", "#eef0dc", 92) +
    `<circle cx="80" cy="36" r="14" fill="#f6f2e0" opacity=".8"/>` +
    // 対岸の町(向こうの都)
    band(92, 16, "#8a8a72") +
    `<g fill="#7a7a64"><rect x="28" y="80" width="18" height="12"/><rect x="52" y="74" width="14" height="18"/><rect x="90" y="82" width="22" height="10"/><rect x="128" y="76" width="12" height="16"/><rect x="286" y="78" width="16" height="14"/><rect x="308" y="72" width="12" height="20"/><rect x="348" y="82" width="20" height="10"/></g>` +
    `<g stroke="#7a7a64" stroke-width="2" fill="none"><path d="M74,92v-24M76,68h6M370,92v-18"/></g>` +
    `<g fill="#5f7f4a" opacity=".8"><ellipse cx="160" cy="88" rx="10" ry="6"/><ellipse cx="336" cy="88" rx="9" ry="5"/><ellipse cx="12" cy="86" rx="8" ry="6"/></g>` +
    // 大河
    band(108, 72, "#6b8a5f") +
    `<g stroke="#8aa06b" stroke-width="2.4" opacity=".7" fill="none"><path d="M20,124h90M180,132h110M60,148h80M240,158h120M100,168h90"/></g>` +
    `<g stroke="#55704a" stroke-width="2" opacity=".6" fill="none"><path d="M150,118h70M300,140h70M30,160h50"/></g>` +
    // フェリー(左)。艀にコンテナと日よけ
    `<g><path d="M56,148h64l-6,12H60z" fill="#8a4a3a"/>` +
    `<rect x="62" y="138" width="24" height="10" fill="#f6efe2"/>` +
    `<rect x="90" y="140" width="13" height="8" fill="#e8a13a"/><rect x="105" y="140" width="12" height="8" fill="#5b8fe8"/>` +
    `<rect x="70" y="128" width="3" height="10" fill="#5a5f52"/>` +
    `<path d="M56,152q-8,4 -14,2M120,152q8,4 14,2" stroke="#8aa06b" stroke-width="2" fill="none"/></g>` +
    // ピローグ(立って漕ぐ)
    pirogue(300, 134, 0.7, true) +
    pirogue(342, 164, 1.1, true) +
    pirogue(126, 172, 0.9) +
    // ホテイアオイ
    hyacinth(40, 152) +
    hyacinth(196, 176, 1.2) +
    hyacinth(262, 150, 0.8) +
    hyacinth(356, 190, 1) +
    // 手前の泥の岸
    ground(180, "#7a6a4a") +
    `<path d="M0,180q60,8 120,2q80,-6 160,4q60,6 120,-2v26H0z" fill="#8a7a56"/>` +
    `<g stroke="#4f8f3a" stroke-width="2.2" fill="none"><path d="M20,196q-3,-14 -8,-18M26,196q0,-16 3,-20M34,196q4,-12 9,-16"/></g>` +
    pirogue(70, 200, 1) +
    // 魚の干し棚
    `<g><rect x="330" y="186" width="3" height="18" fill="#6b5330"/><rect x="366" y="186" width="3" height="18" fill="#6b5330"/><path d="M331,190h37" stroke="#8a6a42" stroke-width="1.6"/><g fill="#c9a877"><path d="M338,191q3,6 0,10q-3,-4 0,-10z"/><path d="M348,191q3,6 0,10q-3,-4 0,-10z"/><path d="M358,191q3,6 0,10q-3,-4 0,-10z"/></g></g>` +
    sackPile(220, 208),

  /**
   * 首都の官庁街。列柱と緑のドーム・広場・ジャカランダ・噴水。
   * カンパラ・キガリ・ハラレ・ケープタウン・アディスアベバ・ヤウンデ。
   */
  capitalcity:
    sky("#a8ccdc", "#e6ecda", 118) +
    clouds(280, 30, 1) +
    clouds(60, 24, 0.8) +
    // 芝生と生け垣
    band(118, 32, "#8fae63") +
    `<g fill="#5f8a4a"><rect x="160" y="142" width="34" height="8" rx="4"/><rect x="200" y="142" width="34" height="8" rx="4"/><rect x="240" y="142" width="34" height="8" rx="4"/></g>` +
    // 官庁(左)。列柱・ペディメント・緑のドーム
    `<rect x="20" y="82" width="132" height="36" fill="#f0e8d8"/>` +
    `<g fill="#d8ccb4"><rect x="30" y="88" width="7" height="30"/><rect x="50" y="88" width="7" height="30"/><rect x="70" y="88" width="7" height="30"/><rect x="90" y="88" width="7" height="30"/><rect x="110" y="88" width="7" height="30"/><rect x="130" y="88" width="7" height="30"/></g>` +
    `<path d="M14,82h144l-72,-16z" fill="#e0d4be"/>` +
    `<path d="M66,66a20,16 0 0 1 40,0z" fill="#3f8f5a"/>` +
    `<rect x="84" y="46" width="4" height="8" fill="#3f8f5a"/>` +
    `<rect x="16" y="118" width="140" height="6" fill="#d8ccb4"/>` +
    flagpole(140, 118, 54, "#f5b31c") +
    // 広場
    ground(150, "#c8bda0") +
    `<g stroke="#b0a488" stroke-width="1.6" opacity=".8" fill="none"><path d="M0,162h400M0,178h400M0,196h400M60,150L30,210M200,150v60M340,150l30,60"/></g>` +
    // ジャカランダと落ちた花
    jacaranda(266, 150, 15) +
    jacaranda(122, 152, 12) +
    `<g fill="#9a7ac8" opacity=".7"><circle cx="248" cy="162" r="1.8"/><circle cx="282" cy="158" r="1.8"/><circle cx="296" cy="166" r="1.8"/><circle cx="108" cy="162" r="1.8"/><circle cx="136" cy="160" r="1.8"/></g>` +
    // 噴水(右)
    `<g><ellipse cx="330" cy="184" rx="26" ry="8" fill="#9ab0b8"/><ellipse cx="330" cy="182" rx="20" ry="5.6" fill="#5b8fe8"/><rect x="327" y="164" width="6" height="16" fill="#9ab0b8"/><g fill="#bfe0f0"><circle cx="330" cy="160" r="2.4"/><circle cx="323" cy="166" r="1.6"/><circle cx="337" cy="166" r="1.6"/></g></g>` +
    // 街灯と記念碑
    `<g stroke="#5a5f52" stroke-width="2.6" fill="none"><path d="M56,150v-26M56,124q-8,0 -8,6M56,124q8,0 8,6"/></g>` +
    `<g fill="#f5b31c"><circle cx="48" cy="132" r="2.6"/><circle cx="64" cy="132" r="2.6"/></g>` +
    `<g><rect x="368" y="140" width="16" height="10" fill="#8a8478"/><rect x="371" y="112" width="10" height="28" fill="#9a9488"/><path d="M371,112h10l-5,-10z" fill="#9a9488"/></g>` +
    // ミニバスタクシーとハト
    `<g><rect x="28" y="184" width="58" height="20" rx="4" fill="#f5b31c"/><rect x="28" y="192" width="58" height="4" fill="#20364a"/><g fill="#8fd0dc"><rect x="34" y="187" width="10" height="6"/><rect x="48" y="187" width="10" height="6"/><rect x="62" y="187" width="10" height="6"/></g><circle cx="42" cy="206" r="4.6" fill="#2e2a26"/><circle cx="72" cy="206" r="4.6" fill="#2e2a26"/></g>` +
    `<g fill="#8a8f98"><ellipse cx="230" cy="200" rx="3.4" ry="2.4"/><ellipse cx="242" cy="204" rx="3.2" ry="2.2"/><circle cx="233" cy="197" r="1.3"/><circle cx="245" cy="201" r="1.2"/></g>`,

  /**
   * 滝と峡谷。白い水煙・虹・玄武岩の壁・鉄橋を渡る小さな列車。
   * リヴィングストン専用。
   */
  fallsgorge:
    sky("#b8d8e0", "#ecf6f2", 88) +
    // 滝上の台地と川面
    band(88, 12, "#5f8a4a") +
    `<g fill="#5f8a4a"><ellipse cx="60" cy="88" rx="18" ry="5"/><ellipse cx="330" cy="88" rx="16" ry="5"/><ellipse cx="200" cy="87" rx="14" ry="4"/></g>` +
    `<rect x="40" y="93" width="320" height="7" fill="#4f9ab4"/>` +
    ground(100, "#4a4238") +
    // 滝の白い幕
    `<rect x="40" y="100" width="320" height="58" fill="#dceef4"/>` +
    `<g fill="#b8dce8"><rect x="60" y="100" width="12" height="58"/><rect x="102" y="100" width="10" height="58"/><rect x="150" y="100" width="12" height="58"/><rect x="196" y="100" width="10" height="58"/><rect x="244" y="100" width="12" height="58"/><rect x="292" y="100" width="10" height="58"/><rect x="334" y="100" width="10" height="58"/></g>` +
    `<g fill="#f4fafc"><rect x="82" y="100" width="8" height="58"/><rect x="128" y="100" width="8" height="58"/><rect x="176" y="100" width="8" height="58"/><rect x="224" y="100" width="8" height="58"/><rect x="272" y="100" width="8" height="58"/><rect x="316" y="100" width="8" height="58"/></g>` +
    `<g fill="#f4fafc"><ellipse cx="70" cy="100" rx="14" ry="4"/><ellipse cx="140" cy="99" rx="16" ry="4"/><ellipse cx="216" cy="100" rx="15" ry="4"/><ellipse cx="292" cy="99" rx="15" ry="4"/><ellipse cx="348" cy="100" rx="12" ry="4"/></g>` +
    // 峡谷の壁(左右)
    `<path d="M0,210V96l40,4v58l-8,52z" fill="#3a352c"/>` +
    `<path d="M400,210V96l-40,4v58l10,52z" fill="#3a352c"/>` +
    `<g stroke="#57503f" stroke-width="1.6" opacity=".7" fill="none"><path d="M6,120l28,3M4,150l26,3M8,180l22,2M394,124l-26,3M396,156l-24,2M392,184l-20,2"/></g>` +
    // 立ちのぼる水煙
    `<g fill="#f4fafc" opacity=".75"><ellipse cx="120" cy="164" rx="42" ry="12"/><ellipse cx="250" cy="170" rx="52" ry="13"/><ellipse cx="180" cy="152" rx="34" ry="10"/><ellipse cx="330" cy="160" rx="30" ry="10"/></g>` +
    // 虹(滝の左に小さく)
    `<g fill="none" stroke-width="2.6" opacity=".55"><path d="M52,166a48,48 0 0 1 96,0" stroke="#e8443f"/><path d="M57,166a43,43 0 0 1 86,0" stroke="#f5b31c"/><path d="M62,166a38,38 0 0 1 76,0" stroke="#5b8fe8"/></g>` +
    // 峡谷を渡る鉄橋(上路アーチ)と列車(右手前)
    `<g>` +
    `<path d="M254,172L400,166" stroke="#3a3f46" stroke-width="4" fill="none"/>` +
    `<path d="M254,172Q326,208 400,166" stroke="#3a3f46" stroke-width="3.4" fill="none"/>` +
    `<g stroke="#3a3f46" stroke-width="1.6" fill="none"><path d="M286,171v13M318,170v18M350,169v14M380,168v6"/></g>` +
    `<g><rect x="288" y="160" width="24" height="10" rx="2" fill="#8a4a3a"/><rect x="316" y="159" width="22" height="10" rx="2" fill="#5a6a72"/><rect x="342" y="158" width="22" height="10" rx="2" fill="#5f7f5a"/></g></g>` +
    // 谷底の水
    `<path d="M0,196q100,10 200,4q100,-6 200,4v6H0z" fill="#2f5f6f"/>` +
    `<g stroke="#f4fafc" stroke-width="1.8" opacity=".6" fill="none"><path d="M60,202h50M240,204h60"/></g>` +
    // 手前の熱帯の茂み(左)
    `<g fill="#2f5f3f"><path d="M0,210v-56q16,2 22,16q8,-10 20,-6q10,4 10,18q12,0 14,12l2,16z"/><path d="M40,168q8,-14 22,-16q-6,14 -22,16z"/></g>`,

  /**
   * 高層ビルと高架の新型鉄道。ハルマッタンの夕暮れ、黄色いミニバス。
   * ラゴス・イバダン。
   */
  metroskyline:
    sky("#f0b060", "#f8d8a8", 160) +
    `<circle cx="330" cy="58" r="18" fill="#e8944a"/>` +
    `<circle cx="330" cy="58" r="26" fill="#e8944a" opacity=".3"/>` +
    gull(96, 44, 0.8) +
    gull(120, 36, 0.6) +
    // 遠景のビル群(かすむ)
    `<g fill="#c09078" opacity=".8"><rect x="70" y="82" width="24" height="78"/><rect x="120" y="96" width="20" height="64"/><rect x="196" y="78" width="26" height="82"/><rect x="252" y="94" width="20" height="66"/><rect x="366" y="90" width="22" height="70"/></g>` +
    // 近景のビル(窓が点る)と建設クレーン
    towerBlock(16, 160, 34, 96, "#6b5f66") +
    towerBlock(56, 160, 30, 122, "#7a6a72") +
    towerBlock(292, 160, 36, 84, "#6b5f66") +
    towerBlock(336, 160, 30, 104, "#7a6a72") +
    `<g stroke="#4a4642" stroke-width="2" fill="none"><path d="M71,38v-16M71,22h34M99,22v8M65,22l-8,10"/></g>` +
    // ビルの壁の広告板
    `<g><rect x="294" y="98" width="32" height="20" fill="#f6efe2"/><rect x="298" y="102" width="10" height="12" fill="#e8443f"/><rect x="312" y="102" width="10" height="6" fill="#3f8f5a"/><rect x="312" y="110" width="10" height="4" fill="#5b8fe8"/></g>` +
    // 高架鉄道(全幅)と青い新型電車
    `<g fill="#9a9088"><rect x="34" y="143" width="9" height="17"/><rect x="118" y="143" width="9" height="17"/><rect x="202" y="143" width="9" height="17"/><rect x="286" y="143" width="9" height="17"/><rect x="366" y="143" width="9" height="17"/></g>` +
    `<rect x="0" y="136" width="400" height="8" fill="#a8a098"/>` +
    `<rect x="0" y="134" width="400" height="3" fill="#8a8478"/>` +
    `<g><rect x="252" y="118" width="132" height="17" rx="5" fill="#2f6ea8"/>` +
    `<path d="M252,118q-9,5 -9,17h9z" fill="#2f6ea8"/>` +
    `<rect x="258" y="122" width="120" height="6" fill="#cfe4f0"/>` +
    `<rect x="252" y="130" width="132" height="2.6" fill="#f5b31c"/></g>` +
    // 街路
    ground(160, "#8a8078") +
    `<g stroke="#f5b31c" stroke-width="3" stroke-dasharray="14 12" opacity=".7" fill="none"><path d="M0,182h400"/></g>` +
    // 黄色いミニバス(ダンフォ)2台と緑のバス
    `<g><rect x="40" y="188" width="52" height="18" rx="3" fill="#f5b31c"/><rect x="40" y="194" width="52" height="3.4" fill="#20364a"/><g fill="#8fd0dc"><rect x="46" y="190" width="9" height="5"/><rect x="59" y="190" width="9" height="5"/><rect x="72" y="190" width="9" height="5"/></g><circle cx="52" cy="206" r="4.4" fill="#2e2a26"/><circle cx="80" cy="206" r="4.4" fill="#2e2a26"/></g>` +
    `<g><rect x="118" y="166" width="44" height="15" rx="3" fill="#f5b31c"/><rect x="118" y="171" width="44" height="3" fill="#20364a"/><g fill="#8fd0dc"><rect x="123" y="168" width="8" height="4.4"/><rect x="134" y="168" width="8" height="4.4"/><rect x="145" y="168" width="8" height="4.4"/></g><circle cx="128" cy="181" r="3.8" fill="#2e2a26"/><circle cx="152" cy="181" r="3.8" fill="#2e2a26"/></g>` +
    `<g><rect x="322" y="186" width="58" height="19" rx="3" fill="#3f8f5a"/><g fill="#8fd0dc"><rect x="328" y="189" width="10" height="6"/><rect x="342" y="189" width="10" height="6"/><rect x="356" y="189" width="10" height="6"/></g><circle cx="336" cy="205" r="4.4" fill="#2e2a26"/><circle cx="366" cy="205" r="4.4" fill="#2e2a26"/></g>` +
    // 市場のパラソル(中央手前、隠れ帯の下なので見える)
    `<g><path d="M196,192a15,8 0 0 1 30,0z" fill="#e8443f"/><rect x="210" y="192" width="2.6" height="14" fill="#6b5330"/><rect x="196" y="198" width="12" height="8" fill="#c9a877"/><rect x="216" y="200" width="12" height="7" fill="#5f8f5a"/></g>`,

  /**
   * 港と旧市街の丘。防波堤の灯台・色とりどりの漁船・魚の木箱。
   * デュルバン・ベイラ・ナカラ・ブランタイア・スファックス。
   */
  harborcity:
    sky("#a4c8d8", "#e8eee2", 130) +
    clouds(120, 30, 1) +
    gull(60, 60, 0.9) +
    gull(86, 50, 0.7) +
    // 旧市街の丘(右)
    `<path d="M232,130Q300,58 400,50V130z" fill="#b8a882"/>` +
    `<g fill="#e8dcc4"><rect x="258" y="108" width="18" height="14"/><rect x="282" y="96" width="20" height="16"/><rect x="308" y="86" width="18" height="14"/><rect x="334" y="76" width="20" height="16"/><rect x="362" y="70" width="18" height="14"/><rect x="300" y="112" width="22" height="14"/><rect x="338" y="100" width="20" height="16"/><rect x="370" y="92" width="20" height="14"/></g>` +
    `<g fill="#b86a4a"><path d="M256,108h22l-11,-7zM280,96h24l-12,-8zM306,86h22l-11,-7zM332,76h24l-12,-8zM360,70h22l-11,-7zM298,112h26l-13,-8zM336,100h24l-12,-8zM368,92h24l-12,-8z"/></g>` +
    // 丘の上の塔(白い塔に青緑のドーム)
    `<rect x="348" y="42" width="12" height="28" fill="#f2ead8"/>` +
    `<path d="M346,42a8,7 0 0 1 16,0z" fill="#3f8f8a"/>` +
    // 海
    band(130, 38, "#3f7fae") +
    ripples(142, "#9fc8dc") +
    // 防波堤と小さな灯台(左)
    `<rect x="0" y="132" width="120" height="7" fill="#8a8478"/>` +
    `<g><rect x="98" y="108" width="10" height="24" fill="#f6efe2"/><rect x="98" y="108" width="10" height="6" fill="#e8443f"/><circle cx="103" cy="105" r="3" fill="#f5b31c"/></g>` +
    // 漁船の列と白いフェリー
    `<g><path d="M36,156h34l-5,8H42z" fill="#2f6ea8"/><rect x="48" y="146" width="4" height="10" fill="#6b5330"/></g>` +
    `<g><path d="M84,158h30l-5,7H90z" fill="#c8384f"/><rect x="95" y="148" width="4" height="10" fill="#6b5330"/></g>` +
    `<g><path d="M126,155h30l-5,8h-21z" fill="#3f8f5a"/><rect x="137" y="146" width="4" height="9" fill="#6b5330"/></g>` +
    `<g><path d="M282,160h76l-8,10h-62z" fill="#f6efe2"/><rect x="292" y="150" width="52" height="10" fill="#f6efe2"/><rect x="292" y="154" width="52" height="3" fill="#2f6ea8"/><g fill="#20364a"><rect x="298" y="150" width="7" height="4"/><rect x="310" y="150" width="7" height="4"/><rect x="322" y="150" width="7" height="4"/><rect x="334" y="150" width="7" height="4"/></g></g>` +
    // 石の岸壁
    ground(168, "#b8ae98") +
    band(168, 5, "#9a9080") +
    // 手前: 網の山・魚の木箱・ロープ・係船柱
    `<g stroke="#8a6a42" stroke-width="1.6" fill="none"><path d="M46,196q10,-10 24,-8q12,2 16,10M50,200q12,-8 32,-4M58,192q8,-6 20,-4"/></g>` +
    `<g><rect x="128" y="190" width="30" height="13" fill="#c9a877"/><rect x="132" y="184" width="30" height="13" fill="#b8935f"/><g fill="#7a8a8a"><path d="M136,188q4,5 10,5q-6,2 -10,-5z"/><path d="M148,187q4,5 10,5q-6,2 -10,-5z"/></g></g>` +
    `<circle cx="330" cy="196" r="8" fill="none" stroke="#8a6a42" stroke-width="3.4"/>` +
    bollard(374, 192) +
    // 木箱の上のかもめ
    `<g><ellipse cx="146" cy="180" rx="5" ry="3.4" fill="#f6efe2"/><circle cx="151" cy="177" r="2" fill="#f6efe2"/><path d="M153,177l3,1l-3,1z" fill="#f5b31c"/><path d="M143,183v2M148,183v2" stroke="#e8944a" stroke-width="1.2"/></g>`,

  /**
   * 国境。錆びた線路が金網の柵の手前で途切れ、遮断棒と検問小屋が立つ。
   * 柵の向こうも同じ乾いた土地が続く。ヴィクトリアフォールズ・ンジャメナ・オラン。
   */
  borderline:
    sky("#b8c4c4", "#e2e6de", 118) +
    `<g fill="#cfd6d0" opacity=".8"><ellipse cx="90" cy="40" rx="34" ry="6"/><ellipse cx="300" cy="56" rx="28" ry="5"/></g>` +
    ground(118, "#c0b080") +
    // 柵の向こう側(同じ土地・遠い給水塔と木)
    waterTower(348, 136, 28) +
    acacia(330, 128, 0.45) +
    dryShrub(370, 158, 1, "#8a8a5a") +
    dryShrub(316, 148, 0.8, "#8a8a5a") +
    // 錆びた線路。雑草に埋もれ、車止めと砂に沈む端
    track(178, 0, 240, 10, 16, "#8a5a3a", "#5a4a3a") +
    bufferStop(244, 180) +
    `<ellipse cx="238" cy="184" rx="24" ry="6" fill="#c0b080"/>` +
    `<g stroke="#7a8a4a" stroke-width="2" fill="none"><path d="M60,182q-2,-8 -5,-11M66,182q1,-9 3,-12M110,184q-2,-8 -5,-10M170,184q2,-8 5,-10M206,186q-2,-7 -4,-9"/></g>` +
    // 終端標識(赤い円板)
    `<g><rect x="256" y="152" width="3.4" height="26" fill="#6b7068"/><circle cx="258" cy="148" r="8" fill="#e8443f"/><circle cx="258" cy="148" r="8" fill="none" stroke="#f6efe2" stroke-width="2"/></g>` +
    // 国境の金網(奥から手前へ)
    borderFence([
      [266, 126, 22],
      [275, 147, 32],
      [284, 168, 42],
      [293, 189, 52],
      [302, 210, 62],
    ]) +
    // 遮断棒と検問小屋(右)
    barrier(306, 158, 66) +
    `<g><rect x="336" y="152" width="48" height="38" fill="#b8ae98"/>` +
    `<path d="M332,152h56l-7,-10h-42z" fill="#8a8478"/>` +
    `<g stroke="#7a7468" stroke-width="1.2" opacity=".6"><path d="M338,142.5l4,9.5M346,142.5l4,9.5M354,142.5l4,9.5M362,142.5l4,9.5M370,142.5l4,9.5"/></g>` +
    `<rect x="344" y="162" width="12" height="12" fill="#20364a"/>` +
    `<rect x="364" y="162" width="12" height="28" fill="#6b5f52"/></g>` +
    // 手前: 古枕木の山・傾いた標識・灌木
    `<g fill="#5a4a3a"><rect x="34" y="198" width="48" height="5"/><rect x="38" y="193" width="40" height="5"/><rect x="42" y="188" width="32" height="5"/></g>` +
    `<g transform="rotate(-8 130 196)"><rect x="128" y="178" width="3" height="20" fill="#6b7068"/><rect x="118" y="170" width="23" height="10" fill="#c9b088"/><path d="M121,173h17M121,177h12" stroke="#6b5f52" stroke-width="1.6"/></g>` +
    dryShrub(20, 206, 1.2, "#8a8a5a") +
    dryShrub(196, 206, 1, "#8a8a5a"),
};

export const AFRICA_BG = { ...AFRICA_BASE_BG };

// ---------------------------------------------------------------------------
// 都市シンボル(18種)。鍵は cities.mjs の `mark` と対応。24×24の座標系。
// 盤面上では直径19px程度の点になるので、輪郭を優先し主役を1つに絞る。
// ---------------------------------------------------------------------------

export const AFRICA_MARKS = {
  /** 軌間の断絶。幅の違う2本の線路が赤い破線を挟んで並ぶ。 */
  gauge:
    `<g stroke="#4a4640" stroke-width="1.8"><path d="M4,3v18M11,3v18"/></g>` +
    `<g stroke="#8a5a3a" stroke-width="1.6"><path d="M3,6h9M3,10.5h9M3,15h9M3,19.5h9"/></g>` +
    `<g stroke="#4a4640" stroke-width="1.8"><path d="M16.5,3v18M21,3v18"/></g>` +
    `<g stroke="#8a5a3a" stroke-width="1.6"><path d="M16,6h6M16,10.5h6M16,15h6M16,19.5h6"/></g>` +
    `<path d="M13.7,2v20" stroke="#e8443f" stroke-width="1.6" stroke-dasharray="3 2.4"/>`,

  /** 分岐器。一本の線が二方向へ分かれ、脇に信号灯。 */
  junction:
    `<path d="M12,22V13" stroke="#4a4640" stroke-width="2.6"/>` +
    `<path d="M12,13Q12,8 6,4" stroke="#4a4640" stroke-width="2.6" fill="none"/>` +
    `<path d="M12,13Q12,8 18,4" stroke="#4a4640" stroke-width="2.6" fill="none"/>` +
    `<g stroke="#8a5a3a" stroke-width="1.6"><path d="M9,20h6M9,16.5h6M8,11.5l5,-2M16,11.5l-5,-2"/></g>` +
    `<rect x="19" y="12" width="1.6" height="9" fill="#6b7068"/>` +
    `<circle cx="19.8" cy="10.5" r="2.4" fill="#3f8f5a"/>`,

  /** 電化。架線柱と、そこから受ける稲妻。 */
  electric:
    `<rect x="4" y="4" width="2.2" height="17" fill="#6b7068"/>` +
    `<path d="M6,6.5h8" stroke="#6b7068" stroke-width="1.8"/>` +
    `<path d="M13.6,6.5v2.6" stroke="#6b7068" stroke-width="1.6"/>` +
    `<path d="M16.5,4l-5.4,8.6h3.6l-3.2,7.6l8,-9.8h-3.8l4,-6.4z" fill="#f5b31c" stroke="#c98a14" stroke-width=".8"/>`,

  /** 精錬。煙突と、鉱滓を注ぐるつぼの赤い光。 */
  smelter:
    `<rect x="4" y="4" width="4.4" height="13" fill="#7a6a5a"/>` +
    `<rect x="4" y="5.6" width="4.4" height="2" fill="#e8443f"/>` +
    `<g fill="#c8bcac" opacity=".9"><circle cx="7" cy="2.6" r="1.8"/><circle cx="10.4" cy="1.8" r="1.4"/></g>` +
    `<path d="M11,9h9.6l-1.8,8h-6z" fill="#8a7a6a"/>` +
    `<path d="M14,17l-2.6,4" stroke="#e8443f" stroke-width="2.6"/>` +
    `<ellipse cx="10.6" cy="21.6" rx="4" ry="1.6" fill="#f5b31c"/>`,

  /** 採掘。坑口の支保工とつるはし。 */
  mine:
    `<path d="M4,21V10l8,-6l8,6v11h-3v-9.4l-5,-3.6l-5,3.6V21z" fill="#8a6a42"/>` +
    `<path d="M7,21v-9.4l5,-3.6l5,3.6V21z" fill="#3a2f26"/>` +
    `<path d="M8,20L17.4,8.6" stroke="#c9a877" stroke-width="2"/>` +
    `<path d="M13.6,5.6q5.2,1 7.2,6" stroke="#8a8f98" stroke-width="2.4" fill="none"/>`,

  /** 落花生。くびれた殻と網目。 */
  peanut:
    `<g transform="rotate(-28 12 12)">` +
    `<path d="M12,2.4c3,0 4.9,2 4.7,4.7c-.2,1.8 -1.5,2.7 -1.5,4.3c0,1.8 1.7,2.7 1.7,5c0,3.2 -2.3,5.2 -4.9,5.2c-2.6,0 -4.9,-2 -4.9,-5.2c0,-2.3 1.7,-3.2 1.7,-5c0,-1.6 -1.3,-2.5 -1.5,-4.3C7.1,4.4 9,2.4 12,2.4z" fill="#d8b070" stroke="#b8935f" stroke-width="1.1"/>` +
    `<g stroke="#b8935f" stroke-width=".9" opacity=".9"><path d="M9.2,6h5.6M8.8,10.2h6.4M8.8,13.8h6.4M9.2,18h5.6"/></g>` +
    `</g>` +
    `<circle cx="20.4" cy="19.4" r="2.4" fill="#c9a877"/>`,

  /** 港。起重機と青い船体。 */
  port:
    `<rect x="10" y="3" width="2.2" height="14" fill="#c96f4a"/>` +
    `<rect x="10" y="3" width="9.4" height="2.2" fill="#c96f4a"/>` +
    `<path d="M17.6,5.2v3.6" stroke="#5a4a3a" stroke-width="1.6"/>` +
    `<rect x="15.6" y="8.8" width="4" height="3" fill="#5a4a3a"/>` +
    `<g><rect x="4" y="14.6" width="5" height="3.4" fill="#e8a13a"/><rect x="9.4" y="14.6" width="5" height="3.4" fill="#5b8fe8"/></g>` +
    `<path d="M2,18h20l-3,4H5z" fill="#276b8c"/>`,

  /** ピラミッドとナツメヤシ。 */
  pyramid:
    `<path d="M14,19l4.6,-8l4.4,8z" fill="#c09858"/>` +
    `<path d="M2,19L11,5l9,14z" fill="#d8b070"/>` +
    `<path d="M11,5l3.4,14H20z" fill="#c09858"/>` +
    `<rect x="1" y="19" width="22" height="1.8" fill="#e0c288"/>` +
    `<g stroke="#3f8f3a" stroke-width="1.6" fill="none"><path d="M4,19q-2,-4 -3,-5M4,19q0,-5 1,-6M4,19q2,-4 3.4,-4.6"/></g>`,

  /** メディナ。鋸壁と馬蹄形アーチの門。 */
  medina:
    `<rect x="3" y="8" width="18" height="13" fill="#f2ead8"/>` +
    `<g fill="#f2ead8"><rect x="3" y="5" width="3.4" height="3"/><rect x="10.3" y="5" width="3.4" height="3"/><rect x="17.6" y="5" width="3.4" height="3"/></g>` +
    `<path d="M8,21v-5.4a4,4.6 0 1 1 8,0V21z" fill="#2f6ea8"/>` +
    `<g fill="#2f6ea8"><path d="M4.5,10l1.6,1.6l-1.6,1.6l-1.6,-1.6zM19.5,10l1.6,1.6l-1.6,1.6l-1.6,-1.6z"/></g>`,

  /** ダウ船。三角帆と三日月型の船体。 */
  dhow:
    `<path d="M13.6,2.6L5,15h8.6z" fill="#f6efe2"/>` +
    `<path d="M13.6,2.6V16" stroke="#4a3520" stroke-width="1.6"/>` +
    `<path d="M4,17q8,4.6 16,0l2.2,-2.8q-10.2,4 -20.4,0z" fill="#6b4a2e"/>` +
    `<path d="M2.6,21.4q4.2,-3 8.4,0t8.4,0" stroke="#2fa3b0" stroke-width="1.8" fill="none"/>`,

  /** アカシアとキリン。 */
  wildlife:
    `<g stroke="#6b4a2e" stroke-width="1.6" fill="none"><path d="M7,20q0,-6 -2.4,-9M7,20q1,-7 3,-9"/></g>` +
    `<path d="M1,11.4q6.4,-5.4 13,0q-2,3 -6.4,3q-4.4,0 -6.6,-3z" fill="#5f7f3a"/>` +
    `<ellipse cx="17.4" cy="17" rx="4" ry="2.6" fill="#b8813e"/>` +
    `<path d="M19.4,15.4L21.4,7" stroke="#b8813e" stroke-width="2.2"/>` +
    `<path d="M21.4,7l2.4,-1" stroke="#b8813e" stroke-width="1.8"/>` +
    `<g stroke="#b8813e" stroke-width="1.8"><path d="M15,19v3.4M17.4,19.4v3M19.8,19v3.4"/></g>` +
    `<g fill="#8a5a2e"><circle cx="16.4" cy="16.4" r=".9"/><circle cx="18.6" cy="17.6" r=".9"/><circle cx="20.6" cy="11" r=".8"/></g>`,

  /** 石造高架橋。 */
  viaduct:
    `<rect x="2" y="8" width="20" height="3.2" fill="#c9b088"/>` +
    `<g fill="#b89c74"><rect x="3" y="11.2" width="3.2" height="9.8"/><rect x="10.4" y="11.2" width="3.2" height="9.8"/><rect x="17.8" y="11.2" width="3.2" height="9.8"/></g>` +
    `<g stroke="#c9b088" stroke-width="2.6" fill="none"><path d="M6.6,20.6q1.8,-7 3.6,0M14,20.6q1.8,-7 3.6,0"/></g>` +
    `<path d="M1,21h22" stroke="#8a7a62" stroke-width="1.8"/>`,

  /** ダムの壁と放水。 */
  dam:
    `<rect x="2.6" y="4" width="18.8" height="5" fill="#3f7fae"/>` +
    `<path d="M4.6,9h14.8l3,12H1.6z" fill="#9a9488"/>` +
    `<g stroke="#7a7468" stroke-width="1.2"><path d="M7.4,9l-2,12M16.6,9l2,12"/></g>` +
    `<g stroke="#e8f4fa" stroke-width="2.4"><path d="M10,9v12M14,9v12"/></g>` +
    `<g fill="#e8f4fa"><circle cx="10" cy="21.4" r="1.8"/><circle cx="14" cy="21.4" r="1.8"/></g>`,

  /** 川船と桟橋。 */
  riverport:
    `<rect x="1.6" y="16" width="20.8" height="5.4" fill="#6b8a5f"/>` +
    `<path d="M3,18.4h7M14,20h7" stroke="#8aa06b" stroke-width="1.2"/>` +
    `<path d="M4.6,16h12.4l-2,3.4H6.6z" fill="#8a4a3a"/>` +
    `<rect x="7" y="10.6" width="7.4" height="4.4" fill="#f6efe2"/>` +
    `<rect x="8" y="7.6" width="1.6" height="3" fill="#5a5f52"/>` +
    `<rect x="18.6" y="11" width="2" height="8" fill="#6b5330"/>` +
    `<rect x="16.6" y="9.6" width="6" height="2" fill="#8a6a42"/>`,

  /** ラクダの隊列と砂丘。 */
  caravan:
    `<circle cx="20" cy="5" r="2.6" fill="#f5b31c"/>` +
    `<path d="M1,21q6,-8 12,-2.6q5,4.2 10,.6V22H1z" fill="#d8b070"/>` +
    `<g fill="#8a6a42"><ellipse cx="11" cy="13.6" rx="5" ry="3"/><path d="M7,11.6q1.8,-3.6 3.6,0z"/><path d="M11.4,11.6q1.8,-3.6 3.6,0z"/><path d="M15.4,13q2.4,-1 2.8,-4.4l1.6,.4l-1,1.6l.6,.6l-1.6,2.6z"/></g>` +
    `<g stroke="#8a6a42" stroke-width="1.6"><path d="M7.6,16v4M10,16.4v4M12.4,16.4v4M14.6,16v4"/></g>`,

  /** 議事堂。列柱・緑のドーム・旗。 */
  capital:
    `<rect x="19.8" y="4" width="1.2" height="8" fill="#8a8478"/>` +
    `<path d="M21,4l3,1.2l-3,1.2z" fill="#f5b31c"/>` +
    `<path d="M8.4,8.6a3.6,3.2 0 0 1 7.2,0z" fill="#3f8f5a"/>` +
    `<path d="M3,12.6h18l-9,-4.4z" fill="#e0d4be"/>` +
    `<rect x="4" y="12.6" width="16" height="6.6" fill="#f0e8d8"/>` +
    `<g fill="#c9bda4"><rect x="6" y="13.6" width="1.8" height="5.6"/><rect x="9.4" y="13.6" width="1.8" height="5.6"/><rect x="12.8" y="13.6" width="1.8" height="5.6"/><rect x="16.2" y="13.6" width="1.8" height="5.6"/></g>` +
    `<rect x="2.6" y="19.2" width="18.8" height="2" fill="#d8ccb4"/>`,

  /** 滝と虹。 */
  falls:
    `<rect x="2.6" y="5" width="18.8" height="3.4" fill="#4f9ab4"/>` +
    `<rect x="5" y="8.4" width="14" height="10" fill="#dceef4"/>` +
    `<g fill="#f4fafc"><rect x="7" y="8.4" width="2.4" height="10"/><rect x="13" y="8.4" width="2.4" height="10"/><rect x="17.6" y="8.4" width="1.6" height="10"/></g>` +
    `<g fill="#3a352c"><rect x="2.6" y="8.4" width="2.4" height="13"/><rect x="19" y="8.4" width="2.4" height="13"/></g>` +
    `<ellipse cx="12" cy="20" rx="7.6" ry="2.4" fill="#f4fafc"/>` +
    `<path d="M7,18.6a5,5 0 0 1 10,0" stroke="#f5b31c" stroke-width="1.6" fill="none" opacity=".85"/>`,

  /** 国境。金網と赤白の遮断棒、途切れる線路。 */
  border:
    `<g stroke="#6b7068" stroke-width="1.5"><path d="M4,7v11M10,7v11M16,7v11M22,7v11"/></g>` +
    `<g stroke="#8a8f88" stroke-width="1.1"><path d="M3,10h20M3,14h20"/></g>` +
    `<path d="M2,21h11" stroke="#8a5a3a" stroke-width="2.2"/>` +
    `<g stroke="#5a4a3a" stroke-width="1.4"><path d="M4,19.6v2.8M8,19.6v2.8M12,19.6v2.8"/></g>` +
    `<g transform="rotate(-16 3.4 17)">` +
    `<rect x="3.4" y="15.6" width="18" height="2.8" rx="1.4" fill="#f6efe2"/>` +
    `<g fill="#e8443f"><rect x="6" y="15.6" width="3.2" height="2.8"/><rect x="12.4" y="15.6" width="3.2" height="2.8"/><rect x="18.8" y="15.6" width="2.6" height="2.8"/></g></g>` +
    `<rect x="2" y="16" width="2.4" height="6.6" fill="#5a5f52"/>`,
};
