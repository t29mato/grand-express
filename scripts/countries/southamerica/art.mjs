/**
 * 南アメリカ大陸の都市イラスト。
 *
 * **これは45都市のうち最初の8件ぶん(方向確認用サンプル)。**`mark`(24×24)
 * と `bg`(400×210)は `cities.mjs` の同名キーと一対一で対応する。増やすときは
 * 両方を揃えること。
 *
 * 色は他の盤面と大枠を揃えつつ、大陸ならではの土地ごとの色を立てている。
 * チチカカ湖=高原の青緑と葦の黄、アタカマ=砂の赤茶と乾いた空の白、
 * ダリエン=密林の濃緑と川の泥色、パラナ=夕暮れの橙と川面の紺、
 * フエゴ=氷河の白とビーグル水道の鉛色、デメララ=海堤の灰と運河の青、
 * パラマリボ=木造家屋の白と密林の緑、クールー=発射台の白と熱帯の空の青。
 *
 * **背景SVGの中央25%(x=151〜249 / y=54〜152)は都市シンボルに隠れて
 * 見えない。** 見せたい細部は左右3分の1と手前(y>170)に置く。
 * `sky()` は必ず第3引数(次に来る塗りの開始y)を渡すこと。
 */

const W = 400;

/** 小数の桁を抑える。 */
const r1 = (v) => Math.round(v * 10) / 10;

function band(y, h, fill) {
  return `<rect x="0" y="${y}" width="${W}" height="${h}" fill="${fill}"/>`;
}

/** 空。**第3引数に「次に来る塗りの開始y」を渡すこと。** */
function sky(top, bottom, to = 124) {
  return band(0, 92, top) + band(84, Math.max(0, to - 84), bottom);
}

function ground(y, fill) {
  return `<rect x="0" y="${y}" width="${W}" height="${210 - y}" fill="${fill}"/>`;
}

function sun(cx, cy, r, fill) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>`;
}

function clouds(cx, cy, scale = 1, fill = "#f6efe2") {
  const e = (dx, rx, ry) =>
    `<ellipse cx="${r1(cx + dx * scale)}" cy="${cy}" rx="${r1(rx * scale)}" ry="${r1(ry * scale)}"/>`;
  return `<g opacity=".8" fill="${fill}">${e(0, 18, 7)}${e(-10, 11, 5.5)}${e(11, 13, 5.5)}</g>`;
}

function hills(y, fill, count = 4) {
  const parts = [];
  for (let i = 0; i < count; i++) {
    const cx = 40 + (i * W) / count;
    parts.push(`<path d="M${cx - 74},${y}c22,-30 52,-30 74,0z" fill="${fill}"/>`);
  }
  return `<g opacity=".9">${parts.join("")}</g>`;
}

/** 山(尖った稜線+雪冠)。アンデス全般に使う。 */
function peak(cx, base, h, fill = "#8b8f98", snow = "#f2f6f8") {
  const w = r1(h * 1.3);
  return (
    `<path d="M${r1(cx - w / 2)},${base}L${r1(cx - w * 0.12)},${r1(base - h)}L${r1(cx + w * 0.1)},${r1(base - h * 0.6)}L${r1(cx + w / 2)},${base}z" fill="${fill}"/>` +
    `<path d="M${r1(cx - w * 0.12)},${r1(base - h)}L${r1(cx - w * 0.02)},${r1(base - h * 0.78)}L${r1(cx + w * 0.04)},${r1(base - h * 0.84)}z" fill="${snow}"/>`
  );
}

function ripples(y, color) {
  return `<g stroke="${color}" stroke-width="2" opacity=".7" fill="none"><path d="M22,${y}h70M170,${y + 12}h96M104,${y + 24}h64"/></g>`;
}

function gull(x, y, color = "#4a4a52") {
  return `<path d="M${r1(x - 8)},${y}q4,-6 8,0q4,-6 8,0" fill="none" stroke="${color}" stroke-width="1.4"/>`;
}

// ---------------------------------------------------------------------------
// チチカカ湖(プーノ)専用の部品
// ---------------------------------------------------------------------------

/** 葦の浮き島。基部+葦の茂み+葦小屋。 */
function reedIsland(x, base, w, hutH, huts = true) {
  const parts = [
    `<ellipse cx="${x}" cy="${base}" rx="${r1(w / 2)}" ry="8" fill="#c8b458"/>`,
    `<g stroke="#a89438" stroke-width="1.6"><path d="M${r1(x - w / 2 + 4)},${r1(base - 2)}h${r1(w - 8)}"/></g>`,
  ];
  if (huts) {
    parts.push(
      `<rect x="${r1(x - 8)}" y="${r1(base - hutH)}" width="16" height="${hutH}" fill="#d4c060"/>`,
      `<path d="M${r1(x - 10)},${r1(base - hutH)}L${x},${r1(base - hutH - 8)}L${r1(x + 10)},${r1(base - hutH)}z" fill="#a89438"/>`,
    );
  }
  return parts.join("");
}

/** トトラ葦舟。反った舳先が特徴。 */
function reedBoat(x, y, scale = 1) {
  const w = 22 * scale;
  return (
    `<path d="M${r1(x - w / 2)},${y}Q${r1(x - w * 0.1)},${r1(y + 6 * scale)} ${r1(x + w * 0.3)},${y}Q${r1(x + w * 0.55)},${r1(y - 10 * scale)} ${r1(x + w * 0.42)},${r1(y - 16 * scale)}` +
    `Q${r1(x + w * 0.3)},${r1(y - 6 * scale)} ${r1(x - w / 2)},${y}z" fill="#c8b458"/>` +
    `<g stroke="#a89438" stroke-width="${r1(1.2 * scale)}"><path d="M${r1(x - w * 0.4)},${r1(y - 1)}h${r1(w * 0.6)}"/></g>`
  );
}

/** 遠景の帆船シルエット(ヤバリ号)。船体・煙突・マスト・旗。 */
function steamship(x, base, scale = 1) {
  const w = 56 * scale;
  return (
    `<path d="M${r1(x - w / 2)},${base}L${r1(x - w / 2 + 6)},${r1(base + 10 * scale)}L${r1(x + w / 2 - 6)},${r1(base + 10 * scale)}L${r1(x + w / 2)},${base}z" fill="#3a3f46"/>` +
    `<rect x="${r1(x - w * 0.32)}" y="${r1(base - 14 * scale)}" width="${r1(w * 0.64)}" height="${r1(14 * scale)}" fill="#f2f6f8"/>` +
    `<rect x="${r1(x - 4 * scale)}" y="${r1(base - 30 * scale)}" width="${r1(8 * scale)}" height="${r1(16 * scale)}" fill="#c8443a"/>` +
    `<line x1="${r1(x + w * 0.2)}" y1="${r1(base - 14 * scale)}" x2="${r1(x + w * 0.2)}" y2="${r1(base - 34 * scale)}" stroke="#3a3f46" stroke-width="${r1(1.6 * scale)}"/>` +
    `<path d="M${r1(x + w * 0.2)},${r1(base - 34 * scale)}h${r1(10 * scale)}v${r1(6 * scale)}h-${r1(10 * scale)}z" fill="#c8102e"/>`
  );
}

// ---------------------------------------------------------------------------
// 港・砂漠(アリカ)専用の部品
// ---------------------------------------------------------------------------

function crane(x, base, h, fill) {
  return (
    `<rect x="${r1(x - 2)}" y="${r1(base - h)}" width="4" height="${h}" fill="${fill}"/>` +
    `<rect x="${r1(x - 2)}" y="${r1(base - h)}" width="${r1(h * 0.7)}" height="4" fill="${fill}"/>` +
    `<line x1="${r1(x + h * 0.58)}" y1="${r1(base - h + 2)}" x2="${r1(x + h * 0.58)}" y2="${r1(base - h * 0.5)}" stroke="${fill}" stroke-width="2"/>`
  );
}

function palm(x, base, h, fill = "#2f6b3a", trunk = "#8a6a3c") {
  return (
    `<path d="M${r1(x - 1.6)},${base}q3,${r1(-h * 0.5)} 0,${-h}q3,${r1(h * 0.5)} 3.2,${h}z" fill="${trunk}"/>` +
    `<g fill="${fill}"><path d="M${x},${r1(base - h)}c-10,-3 -15,-9 -16,-15c7,2 13,8 16,15z"/>` +
    `<path d="M${x},${r1(base - h)}c10,-3 15,-9 16,-15c-7,2 -13,8 -16,15z"/>` +
    `<path d="M${x},${r1(base - h)}c-3,-10 -1,-16 3,-20c3,5 3,14 -3,20z"/>` +
    `<path d="M${x},${r1(base - h)}c3,-9 9,-13 15,-13c-2,7 -8,12 -15,13z"/></g>`
  );
}

function railTrack(x0, y0, x1, y1, ties) {
  const parts = [`<line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y1}" stroke="#8b8f98" stroke-width="2.4"/>`];
  for (let i = 0; i <= ties; i++) {
    const f = i / ties;
    const x = r1(x0 + (x1 - x0) * f);
    const y = r1(y0 + (y1 - y0) * f);
    parts.push(`<line x1="${x - 5}" y1="${y - 1}" x2="${x + 5}" y2="${y + 1}" stroke="#6b5330" stroke-width="2"/>`);
  }
  return `<g>${parts.join("")}</g>`;
}

// ---------------------------------------------------------------------------
// ダリエン(ヤビサ)専用の部品
// ---------------------------------------------------------------------------

function jungleCanopy(x, base, r, fill) {
  return `<circle cx="${x}" cy="${r1(base - r * 0.6)}" r="${r}" fill="${fill}"/>`;
}

function stiltHouse(x, base, w, h, roof = "#a8743c", wall = "#d8c088") {
  const hw = r1(w / 2);
  return (
    `<g stroke="#6b5330" stroke-width="2.4"><line x1="${r1(x - hw + 3)}" y1="${base}" x2="${r1(x - hw + 3)}" y2="${r1(base - h * 0.4)}"/>` +
    `<line x1="${r1(x + hw - 3)}" y1="${base}" x2="${r1(x + hw - 3)}" y2="${r1(base - h * 0.4)}"/></g>` +
    `<rect x="${r1(x - hw)}" y="${r1(base - h * 0.4 - h * 0.5)}" width="${w}" height="${r1(h * 0.5)}" fill="${wall}"/>` +
    `<path d="M${r1(x - hw - 4)},${r1(base - h * 0.4 - h * 0.5)}L${x},${r1(base - h * 0.4 - h * 0.5 - h * 0.4)}L${r1(x + hw + 4)},${r1(base - h * 0.4 - h * 0.5)}z" fill="${roof}"/>`
  );
}

function dugoutCanoe(x, y, scale = 1) {
  const w = 30 * scale;
  return (
    `<path d="M${r1(x - w / 2)},${y}Q${x},${r1(y + 6 * scale)} ${r1(x + w / 2)},${y}Q${x},${r1(y - 3 * scale)} ${r1(x - w / 2)},${y}z" fill="#a8743c"/>` +
    `<circle cx="${x}" cy="${r1(y - 5 * scale)}" r="${r1(3.2 * scale)}" fill="#3a2a18"/>` +
    `<rect x="${r1(x - 1)}" y="${r1(y - 14 * scale)}" width="2" height="${r1(14 * scale)}" fill="#e8ded0"/>`
  );
}

// ---------------------------------------------------------------------------
// パラナ川(エンカルナシオン)専用の部品
// ---------------------------------------------------------------------------

function bridgePier(x, y0, y1) {
  return `<rect x="${r1(x - 3)}" y="${y0}" width="6" height="${r1(y1 - y0)}" fill="#8b8f98"/>`;
}

function ruinArch(x, base, h, fill = "#b3947a") {
  const w = r1(h * 0.6);
  return (
    `<path d="M${r1(x - w / 2)},${base}V${r1(base - h * 0.55)}Q${x},${r1(base - h)} ${r1(x + w / 2)},${r1(base - h * 0.55)}V${base}" fill="none" stroke="${fill}" stroke-width="${r1(h * 0.16)}"/>`
  );
}

function beachUmbrella(x, base, h, canopy = "#e8443f") {
  return (
    `<line x1="${x}" y1="${base}" x2="${x}" y2="${r1(base - h)}" stroke="#6b5330" stroke-width="1.6"/>` +
    `<path d="M${r1(x - 9)},${r1(base - h)}Q${x},${r1(base - h - 8)} ${r1(x + 9)},${r1(base - h)}z" fill="${canopy}"/>`
  );
}

// ---------------------------------------------------------------------------
// フエゴ島(ウスアイア)専用の部品
// ---------------------------------------------------------------------------

function snowPeak(cx, base, h) {
  return peak(cx, base, h, "#7f8896", "#ffffff");
}

function corrugatedHouse(x, base, w, h, roof, wall = "#f2f6f8") {
  const hw = r1(w / 2);
  return (
    `<rect x="${r1(x - hw)}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${wall}"/>` +
    `<path d="M${r1(x - hw - 3)},${r1(base - h)}L${x},${r1(base - h - 10)}L${r1(x + hw + 3)},${r1(base - h)}z" fill="${roof}"/>`
  );
}

function tinyTrain(x, base, scale = 1) {
  const w = 40 * scale;
  return (
    `<rect x="${r1(x - w / 2)}" y="${r1(base - 14 * scale)}" width="${r1(w * 0.55)}" height="${r1(14 * scale)}" fill="#2f6ea8"/>` +
    `<circle cx="${r1(x - w * 0.28)}" cy="${r1(base - 5 * scale)}" r="${r1(4 * scale)}" fill="#3a3f46"/>` +
    `<circle cx="${r1(x - w * 0.05)}" cy="${r1(base - 5 * scale)}" r="${r1(4 * scale)}" fill="#3a3f46"/>` +
    `<rect x="${r1(x + w * 0.05)}" y="${r1(base - 20 * scale)}" width="${r1(6 * scale)}" height="${r1(20 * scale)}" fill="#c8443a"/>` +
    `<ellipse cx="${r1(x + w * 0.08)}" cy="${r1(base - 24 * scale)}" rx="${r1(9 * scale)}" ry="${r1(5 * scale)}" fill="#dfe4e8" opacity=".8"/>`
  );
}

function penguin(x, base, scale = 1) {
  return (
    `<ellipse cx="${x}" cy="${r1(base - 5 * scale)}" rx="${r1(4 * scale)}" ry="${r1(6 * scale)}" fill="#20252b"/>` +
    `<ellipse cx="${x}" cy="${r1(base - 4 * scale)}" rx="${r1(2.4 * scale)}" ry="${r1(4 * scale)}" fill="#f2f6f8"/>`
  );
}

function lighthouse(x, base, h) {
  return (
    `<path d="M${r1(x - 5)},${base}L${r1(x - 3)},${r1(base - h)}L${r1(x + 3)},${r1(base - h)}L${r1(x + 5)},${base}z" fill="#f2f6f8"/>` +
    `<rect x="${r1(x - 5)}" y="${r1(base - h * 0.65)}" width="10" height="6" fill="#c8102e"/>` +
    `<rect x="${r1(x - 5)}" y="${r1(base - h * 0.3)}" width="10" height="6" fill="#c8102e"/>` +
    `<rect x="${r1(x - 3)}" y="${r1(base - h - 5)}" width="6" height="5" fill="#3a3f46"/>`
  );
}

// ---------------------------------------------------------------------------
// ジョージタウン(デメララ)専用の部品
// ---------------------------------------------------------------------------

/** 海堤の水門。四角い塔+水路のゲート。 */
function sluiceGate(x, base, h) {
  return (
    `<rect x="${r1(x - 8)}" y="${r1(base - h)}" width="16" height="${h}" fill="#8b8f98"/>` +
    `<rect x="${r1(x - 2)}" y="${r1(base - h * 0.6)}" width="4" height="${r1(h * 0.6)}" fill="#3a3f46"/>` +
    `<rect x="${r1(x - 10)}" y="${r1(base - h - 5)}" width="20" height="5" fill="#5a5f52"/>`
  );
}

/** ギアナ沿岸の木造コロニアル家屋(白壁、切妻屋根、高床)。 */
function colonialCottage(x, base, w, h, roof = "#2f6ea8") {
  const hw = r1(w / 2);
  return (
    `<g stroke="#c8bda0" stroke-width="2"><line x1="${r1(x - hw + 3)}" y1="${base}" x2="${r1(x - hw + 3)}" y2="${r1(base - h * 0.3)}"/>` +
    `<line x1="${r1(x + hw - 3)}" y1="${base}" x2="${r1(x + hw - 3)}" y2="${r1(base - h * 0.3)}"/></g>` +
    `<rect x="${r1(x - hw)}" y="${r1(base - h * 0.3 - h * 0.5)}" width="${w}" height="${r1(h * 0.5)}" fill="#f6efe2"/>` +
    `<path d="M${r1(x - hw - 3)},${r1(base - h * 0.3 - h * 0.5)}L${x},${r1(base - h * 0.3 - h * 0.5 - h * 0.4)}L${r1(x + hw + 3)},${r1(base - h * 0.3 - h * 0.5)}z" fill="${roof}"/>`
  );
}

/** スタブルック市場ふうの鉄骨の塔。時計面つき。 */
function marketClockTower(x, base, h) {
  return (
    `<rect x="${r1(x - 3)}" y="${r1(base - h)}" width="6" height="${h}" fill="#8a6a4c"/>` +
    `<rect x="${r1(x - 9)}" y="${r1(base - h - 16)}" width="18" height="16" fill="#8a6a4c"/>` +
    `<circle cx="${x}" cy="${r1(base - h - 8)}" r="5" fill="#f2f6f8"/>` +
    `<path d="M${r1(x - 12)},${r1(base - h - 16)}h24l-6,-8h-12z" fill="#c8443a"/>`
  );
}

// ---------------------------------------------------------------------------
// パラマリボ専用の部品
// ---------------------------------------------------------------------------

/** モスク。ドームと尖塔。 */
function mosque(x, base, h) {
  return (
    `<rect x="${r1(x - 12)}" y="${r1(base - h * 0.5)}" width="24" height="${r1(h * 0.5)}" fill="#e2ddc8"/>` +
    `<circle cx="${x}" cy="${r1(base - h * 0.5)}" r="12" fill="#3f8f6a"/>` +
    `<rect x="${r1(x + 14)}" y="${r1(base - h)}" width="4" height="${h}" fill="#e2ddc8"/>` +
    `<path d="M${r1(x + 12)},${r1(base - h)}L${r1(x + 16)},${r1(base - h - 8)}L${r1(x + 20)},${r1(base - h)}z" fill="#3f8f6a"/>`
  );
}

/** シナゴーグ。切妻屋根+ダビデの星。 */
function synagogue(x, base, h) {
  return (
    `<rect x="${r1(x - 12)}" y="${r1(base - h * 0.55)}" width="24" height="${r1(h * 0.55)}" fill="#f2f6f8"/>` +
    `<path d="M${r1(x - 14)},${r1(base - h * 0.55)}L${x},${r1(base - h)}L${r1(x + 14)},${r1(base - h * 0.55)}z" fill="#8a6a4c"/>` +
    `<path d="M${x - 5},${r1(base - h * 0.75)}l5,-8l5,8zM${x - 5},${r1(base - h * 0.65)}l5,8l5,-8z" fill="none" stroke="#c8a838" stroke-width="1.4"/>`
  );
}

/** 草に呑まれた廃線。まっすぐ延びて途中で消える。 */
function overgrownRail(x0, y, x1) {
  return (
    `<line x1="${x0}" y1="${y}" x2="${x1}" y2="${y}" stroke="#8b8f98" stroke-width="2" stroke-dasharray="6 4" opacity=".7"/>` +
    `<g fill="#3f8f4f" opacity=".8"><circle cx="${r1((x0 + x1) / 2)}" cy="${y - 2}" r="3"/><circle cx="${r1((x0 + x1) / 2 + 14)}" cy="${y + 1}" r="2.4"/></g>`
  );
}

// ---------------------------------------------------------------------------
// クールー(宇宙基地)専用の部品
// ---------------------------------------------------------------------------

/** 発射台のロケットとガントリー。 */
function rocketOnPad(x, base, h) {
  const w = r1(h * 0.16);
  return (
    // ガントリー塔
    `<rect x="${r1(x + w * 1.6)}" y="${r1(base - h * 1.05)}" width="4" height="${r1(h * 1.05)}" fill="#8b8f98"/>` +
    `<g stroke="#8b8f98" stroke-width="1.6"><line x1="${r1(x + w * 1.6)}" y1="${r1(base - h * 0.3)}" x2="${r1(x + w * 1.6 + 14)}" y2="${r1(base - h * 0.3)}"/>` +
    `<line x1="${r1(x + w * 1.6)}" y1="${r1(base - h * 0.7)}" x2="${r1(x + w * 1.6 + 14)}" y2="${r1(base - h * 0.7)}"/></g>` +
    // ロケット本体
    `<rect x="${r1(x - w / 2)}" y="${r1(base - h * 0.9)}" width="${w}" height="${r1(h * 0.9)}" fill="#f2f6f8"/>` +
    `<path d="M${r1(x - w / 2)},${r1(base - h * 0.9)}L${x},${r1(base - h)}L${r1(x + w / 2)},${r1(base - h * 0.9)}z" fill="#c8443a"/>` +
    `<rect x="${r1(x - w / 2)}" y="${r1(base - h * 0.5)}" width="${w}" height="6" fill="#2f6ea8"/>` +
    // 発射台の土台
    `<rect x="${r1(x - w * 1.4)}" y="${base}" width="${r1(w * 2.8)}" height="6" fill="#5a5f52"/>`
  );
}

/** 組立棟(白い大きな建物)。 */
function assemblyBuilding(x, base, w, h) {
  return (
    `<rect x="${r1(x - w / 2)}" y="${r1(base - h)}" width="${w}" height="${h}" fill="#e2e8ea"/>` +
    `<g fill="#8b8f98" opacity=".6"><rect x="${r1(x - w / 2 + 6)}" y="${r1(base - h + 8)}" width="10" height="${r1(h - 16)}"/></g>`
  );
}

// ---------------------------------------------------------------------------
// アンデス高地・太平洋岸(バッチ1・14都市)専用の部品
// ---------------------------------------------------------------------------

/** 天然の石橋(ルミチャカ)。峡谷にかかるアーチ。 */
function stoneArchBridge(x, base, w, h) {
  const hw = r1(w / 2);
  return (
    `<path d="M${r1(x - hw)},${base}Q${x},${r1(base - h)} ${r1(x + hw)},${base}" fill="none" stroke="#8b8f98" stroke-width="${r1(h * 0.28)}"/>` +
    `<rect x="${r1(x - hw - 4)}" y="${r1(base - 4)}" width="8" height="10" fill="#7a7a72"/>` +
    `<rect x="${r1(x + hw - 4)}" y="${r1(base - 4)}" width="8" height="10" fill="#7a7a72"/>`
  );
}

/** ジグザグに折れる崖の鉄路(悪魔の鼻・中央鉄道)。 */
function switchbackTrack(x, base, w, h, legs = 3) {
  const parts = [];
  let cx = x, cy = base;
  const legW = w / legs, legH = h / legs;
  for (let i = 0; i < legs; i++) {
    const nx = i % 2 === 0 ? cx + legW : cx - legW;
    const ny = cy - legH;
    parts.push(`<line x1="${r1(cx)}" y1="${r1(cy)}" x2="${r1(nx)}" y2="${r1(ny)}" stroke="#8b8f98" stroke-width="3"/>`);
    parts.push(`<g stroke="#6b5330" stroke-width="1.6">${
      Array.from({ length: 4 }, (_, k) => {
        const f = (k + 1) / 5;
        const px2 = r1(cx + (nx - cx) * f), py2 = r1(cy + (ny - cy) * f);
        return `<line x1="${px2 - 3}" y1="${py2}" x2="${px2 + 3}" y2="${py2}"/>`;
      }).join("")
    }</g>`);
    cx = nx; cy = ny;
  }
  return parts.join("");
}

/** 糸杉の植木細工(アーチ・動物)。トゥルカン専用。 */
function topiaryShape(x, base, h, kind) {
  if (kind === "arch") {
    return `<path d="M${r1(x - 10)},${base}V${r1(base - h * 0.5)}Q${x},${r1(base - h)} ${r1(x + 10)},${r1(base - h * 0.5)}V${base}z" fill="#2f6b3a"/>` +
      `<path d="M${r1(x - 5)},${base}V${r1(base - h * 0.4)}Q${x},${r1(base - h * 0.7)} ${r1(x + 5)},${r1(base - h * 0.4)}V${base}z" fill="#a8c4b0"/>`;
  }
  return `<ellipse cx="${x}" cy="${r1(base - h * 0.6)}" rx="${r1(h * 0.3)}" ry="${r1(h * 0.4)}" fill="#2f6b3a"/>` +
    `<ellipse cx="${x}" cy="${r1(base - h)}" rx="${r1(h * 0.18)}" ry="${r1(h * 0.14)}" fill="#2f6b3a"/>`;
}

/** 露店の屋台(市場・両替)。国境の町で使い回す。 */
function marketStall(x, base, w, canopy) {
  const hw = r1(w / 2);
  return (
    `<rect x="${r1(x - hw)}" y="${r1(base - 14)}" width="${w}" height="10" fill="#c8bda0"/>` +
    `<path d="M${r1(x - hw - 3)},${r1(base - 14)}h${r1(w + 6)}v-6h-${r1(w + 6)}z" fill="${canopy}"/>` +
    `<line x1="${r1(x - hw + 2)}" y1="${base}" x2="${r1(x - hw + 2)}" y2="${r1(base - 14)}" stroke="#6b5330" stroke-width="2"/>` +
    `<line x1="${r1(x + hw - 2)}" y1="${base}" x2="${r1(x + hw - 2)}" y2="${r1(base - 14)}" stroke="#6b5330" stroke-width="2"/>`
  );
}

/** リャマ。クスコ専用。 */
function llama(x, base, scale = 1) {
  return (
    `<rect x="${r1(x - 2 * scale)}" y="${r1(base - 16 * scale)}" width="${r1(4 * scale)}" height="${r1(16 * scale)}" fill="#c8a878"/>` +
    `<ellipse cx="${x}" cy="${r1(base - 14 * scale)}" rx="${r1(6 * scale)}" ry="${r1(5 * scale)}" fill="#e0c898"/>` +
    `<rect x="${r1(x + 3 * scale)}" y="${r1(base - 24 * scale)}" width="${r1(2.4 * scale)}" height="${r1(12 * scale)}" fill="#e0c898"/>` +
    `<ellipse cx="${r1(x + 4 * scale)}" cy="${r1(base - 25 * scale)}" rx="${r1(2.4 * scale)}" ry="${r1(3 * scale)}" fill="#e0c898"/>`
  );
}

/** インカの石積み段々畑の壁。クスコ専用。 */
function incaTerraceWall(x, base, w, tiers = 3) {
  const parts = [];
  for (let i = 0; i < tiers; i++) {
    const y = r1(base - i * 8);
    parts.push(`<rect x="${r1(x - w / 2)}" y="${r1(y - 6)}" width="${w}" height="6" fill="#9a9488"/>`);
    parts.push(`<g stroke="#7a7468" stroke-width="1"><line x1="${r1(x - w / 2 + w * 0.3)}" y1="${r1(y - 6)}" x2="${r1(x - w / 2 + w * 0.3)}" y2="${y}"/><line x1="${r1(x - w / 2 + w * 0.6)}" y1="${r1(y - 6)}" x2="${r1(x - w / 2 + w * 0.6)}" y2="${y}"/></g>`);
  }
  return parts.join("");
}

/** 信号所・小さな駅舎。ビアチャ・チャラーニャ専用。 */
function signalBox(x, base, w, h, fill = "#8a6a4c") {
  return (
    `<rect x="${r1(x - w / 2)}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${fill}"/>` +
    `<rect x="${r1(x - w / 2 + 2)}" y="${r1(base - h + 3)}" width="${r1(w - 4)}" height="${r1(h * 0.4)}" fill="#dfe4e8"/>`
  );
}

/** バナナの房。グアヤキル専用。 */
function bananaBunch(x, base, scale = 1) {
  return `<path d="M${x},${base}q${r1(-8 * scale)},${r1(-4 * scale)} ${r1(-4 * scale)},${r1(-16 * scale)}q${r1(10 * scale)},${r1(-2 * scale)} ${r1(10 * scale)},${r1(14 * scale)}z" fill="#e8d048"/>`;
}

/** 銅精鉱を積んだ貨車。アントファガスタ専用。 */
function oreWagon(x, base, w, h) {
  return (
    `<rect x="${r1(x - w / 2)}" y="${r1(base - h)}" width="${w}" height="${h}" fill="#8b5a3c"/>` +
    `<circle cx="${r1(x - w / 2 + 6)}" cy="${base}" r="4" fill="#3a3f46"/>` +
    `<circle cx="${r1(x + w / 2 - 6)}" cy="${base}" r="4" fill="#3a3f46"/>` +
    `<rect x="${r1(x - w / 2 + 2)}" y="${r1(base - h - 2)}" width="${r1(w - 4)}" height="4" fill="#c8a878"/>`
  );
}

/** バルパライソふうの色とりどりの丘の家。 */
function hillHouse(x, base, w, h, wall) {
  return (
    `<rect x="${r1(x - w / 2)}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${wall}"/>` +
    `<rect x="${r1(x - w / 2 - 2)}" y="${r1(base - h - 3)}" width="${r1(w + 4)}" height="4" fill="#3a3f46"/>`
  );
}

/** フニクラ(ケーブルカー)の車体と斜めの軌道。 */
function funicular(x0, y0, x1, y1) {
  return (
    `<line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y1}" stroke="#8b8f98" stroke-width="2"/>` +
    `<rect x="${r1((x0 + x1) / 2 - 6)}" y="${r1((y0 + y1) / 2 - 8)}" width="12" height="10" fill="#c8443a" transform="rotate(${r1(Math.atan2(y1 - y0, x1 - x0) * 180 / Math.PI)} ${r1((x0 + x1) / 2)} ${r1((y0 + y1) / 2)})"/>`
  );
}

/** 羊。プンタアレナス専用。 */
function sheep(x, base, scale = 1) {
  return (
    `<ellipse cx="${x}" cy="${r1(base - 5 * scale)}" rx="${r1(6 * scale)}" ry="${r1(4.4 * scale)}" fill="#f2f6f8"/>` +
    `<circle cx="${r1(x + 6 * scale)}" cy="${r1(base - 6 * scale)}" r="${r1(2.6 * scale)}" fill="#3a3f46"/>` +
    `<g stroke="#3a3f46" stroke-width="1.4"><line x1="${r1(x - 3 * scale)}" y1="${base}" x2="${r1(x - 3 * scale)}" y2="${r1(base - 2 * scale)}"/><line x1="${r1(x + 3 * scale)}" y1="${base}" x2="${r1(x + 3 * scale)}" y2="${r1(base - 2 * scale)}"/></g>`
  );
}

/** マラジョ島の水牛。ベレン専用(2026-08-14追加)。 */
function waterBuffalo(x, base, scale = 1) {
  return (
    `<ellipse cx="${x}" cy="${r1(base - 6 * scale)}" rx="${r1(9 * scale)}" ry="${r1(5 * scale)}" fill="#3a3f46"/>` +
    `<circle cx="${r1(x + 8 * scale)}" cy="${r1(base - 8 * scale)}" r="${r1(3.4 * scale)}" fill="#2a2e34"/>` +
    `<path d="M${r1(x + 6 * scale)},${r1(base - 11 * scale)}q${r1(-3 * scale)},${r1(-4 * scale)} 0,${r1(-6 * scale)}M${r1(x + 10 * scale)},${r1(base - 11 * scale)}q${r1(3 * scale)},${r1(-4 * scale)} 0,${r1(-6 * scale)}" fill="none" stroke="#c8bda0" stroke-width="${r1(1.4 * scale)}"/>` +
    `<g stroke="#2a2e34" stroke-width="${r1(1.6 * scale)}"><line x1="${r1(x - 5 * scale)}" y1="${base}" x2="${r1(x - 5 * scale)}" y2="${r1(base - 2 * scale)}"/><line x1="${r1(x + 3 * scale)}" y1="${base}" x2="${r1(x + 3 * scale)}" y2="${r1(base - 2 * scale)}"/></g>`
  );
}

/** 石炭の山と補給埠頭。プンタアレナス専用。 */
function coalPile(x, base, w, h) {
  return `<path d="M${r1(x - w / 2)},${base}Q${x},${r1(base - h)} ${r1(x + w / 2)},${base}z" fill="#2a2a2e"/>`;
}

// ---------------------------------------------------------------------------
// コロンビア・ベネズエラ・ギアナ3国・川の国境(バッチ2・9都市)専用の部品
// ---------------------------------------------------------------------------

/** 索道(ケーブルウェイ)。斜めの線+吊り下げ搬器。ボゴタ・メデジン専用。 */
function cableway(x0, y0, x1, y1, cars = 3) {
  const parts = [`<line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y1}" stroke="#5a5f52" stroke-width="1.6"/>`];
  for (let i = 1; i <= cars; i++) {
    const f = i / (cars + 1);
    const cx = r1(x0 + (x1 - x0) * f), cy = r1(y0 + (y1 - y0) * f);
    parts.push(`<rect x="${cx - 4}" y="${cy}" width="8" height="6" fill="#2f6ea8"/><line x1="${cx}" y1="${cy - 4}" x2="${cx}" y2="${cy}" stroke="#5a5f52" stroke-width="1"/>`);
  }
  return parts.join("");
}

/** バス専用道路と赤いバス。ボゴタ専用。 */
function busway(x, base, w) {
  return (
    `<rect x="${r1(x - w / 2)}" y="${r1(base - 6)}" width="${w}" height="6" fill="#5a5f52"/>` +
    `<rect x="${r1(x - 20)}" y="${r1(base - 16)}" width="34" height="10" fill="#e8443f"/>` +
    `<g fill="#dfe4e8"><rect x="${r1(x - 17)}" y="${r1(base - 14)}" width="6" height="5"/><rect x="${r1(x - 8)}" y="${r1(base - 14)}" width="6" height="5"/></g>`
  );
}

/** 米田の畝(緑の帯)。ニウニッケリー専用。 */
function ricePaddy(x, y, w, rows = 3) {
  const parts = [];
  for (let i = 0; i < rows; i++) parts.push(`<line x1="${x}" y1="${r1(y + i * 5)}" x2="${r1(x + w)}" y2="${r1(y + i * 5)}"/>`);
  return `<g stroke="#7fae6a" stroke-width="2.4" opacity=".8">${parts.join("")}</g>`;
}

/** 石造りの流刑地の建物。バーの入った窓。サンローラン専用。 */
function prisonBlock(x, base, w, h) {
  const hw = r1(w / 2);
  const parts = [`<rect x="${r1(x - hw)}" y="${r1(base - h)}" width="${w}" height="${h}" fill="#9a9488"/>`];
  for (let i = 0; i < 4; i++) {
    const wx = r1(x - hw + 6 + i * (w - 12) / 3);
    parts.push(`<rect x="${wx}" y="${r1(base - h + 6)}" width="6" height="8" fill="#2a2a2e"/>`);
    parts.push(`<g stroke="#5a5f52" stroke-width=".8"><line x1="${wx + 2}" y1="${r1(base - h + 6)}" x2="${wx + 2}" y2="${r1(base - h + 14)}"/><line x1="${wx + 4}" y1="${r1(base - h + 6)}" x2="${wx + 4}" y2="${r1(base - h + 14)}"/></g>`);
  }
  return parts.join("");
}

/** マルーンの高床の小屋(ブラジル南米北部の熱帯共通)。 */
function maroonHut(x, base, w, h) {
  const hw = r1(w / 2);
  return (
    `<g stroke="#6b5330" stroke-width="2"><line x1="${r1(x - hw + 2)}" y1="${base}" x2="${r1(x - hw + 2)}" y2="${r1(base - h * 0.35)}"/><line x1="${r1(x + hw - 2)}" y1="${base}" x2="${r1(x + hw - 2)}" y2="${r1(base - h * 0.35)}"/></g>` +
    `<rect x="${r1(x - hw)}" y="${r1(base - h * 0.35 - h * 0.4)}" width="${w}" height="${r1(h * 0.4)}" fill="#c8a878"/>` +
    `<path d="M${r1(x - hw - 3)},${r1(base - h * 0.35 - h * 0.4)}L${x},${r1(base - h)}L${r1(x + hw + 3)},${r1(base - h * 0.35 - h * 0.4)}z" fill="#8a6a3c"/>`
  );
}

/** ゲート付きの街並みの家(企業城下町の格子)。リンデン専用。 */
function gridHouse(x, base, w, h, roof) {
  return (
    `<rect x="${r1(x - w / 2)}" y="${r1(base - h)}" width="${w}" height="${h}" fill="#e2ddc8"/>` +
    `<rect x="${r1(x - w / 2 - 2)}" y="${r1(base - h - 3)}" width="${r1(w + 4)}" height="4" fill="${roof}"/>`
  );
}

/** 波紋の水路(アマゾン支流の合流)。 */
function riverMeeting(y, colorA, colorB) {
  return (
    `<rect x="0" y="${y}" width="200" height="${210 - y}" fill="${colorA}"/>` +
    `<rect x="200" y="${y}" width="200" height="${210 - y}" fill="${colorB}"/>`
  );
}

// ---------------------------------------------------------------------------
// ラプラタ水系・パンパ・パタゴニア(バッチ3・9都市)専用の部品
// ---------------------------------------------------------------------------

/** 小さな国旗。タバチンガの三国境専用。 */
function flagPole(x, base, h, fill) {
  return (
    `<rect x="${r1(x - 1)}" y="${r1(base - h)}" width="2" height="${h}" fill="#8a8478"/>` +
    `<rect x="${x}" y="${r1(base - h)}" width="12" height="8" fill="${fill}"/>`
  );
}

/** 駐屯地の門。タバチンガ専用。 */
function garrisonGate(x, base, w, h) {
  const hw = r1(w / 2);
  return (
    `<rect x="${r1(x - hw)}" y="${r1(base - h)}" width="6" height="${h}" fill="#5f7f4a"/>` +
    `<rect x="${r1(x + hw - 6)}" y="${r1(base - h)}" width="6" height="${h}" fill="#5f7f4a"/>` +
    `<rect x="${r1(x - hw)}" y="${r1(base - h - 6)}" width="${w}" height="6" fill="#3f6f3a"/>`
  );
}

/** 大きな駅舎(ブエノスアイレスの扇形鉄道網の起点)。 */
function grandStation(x, base, w, h) {
  const hw = r1(w / 2);
  return (
    `<rect x="${r1(x - hw)}" y="${r1(base - h)}" width="${w}" height="${h}" fill="#c8a878"/>` +
    `<rect x="${r1(x - hw)}" y="${r1(base - h)}" width="${w}" height="6" fill="#8a6a3c"/>` +
    `<g fill="#dfe4e8" opacity=".8"><rect x="${r1(x - hw + 8)}" y="${r1(base - h + 12)}" width="10" height="${r1(h - 20)}"/><rect x="${r1(x - 5)}" y="${r1(base - h + 12)}" width="10" height="${r1(h - 20)}"/><rect x="${r1(x + hw - 18)}" y="${r1(base - h + 12)}" width="10" height="${r1(h - 20)}"/></g>` +
    `<circle cx="${x}" cy="${r1(base - h - 4)}" r="5" fill="#f2f6f8"/>`
  );
}

/** 移民ホテルの受入棟。ブエノスアイレス専用。 */
function immigrantHall(x, base, w, h) {
  return (
    `<rect x="${r1(x - w / 2)}" y="${r1(base - h)}" width="${w}" height="${h}" fill="#e2ddc8"/>` +
    `<g fill="#8b8f98" opacity=".7">${
      Array.from({ length: 4 }, (_, i) => `<rect x="${r1(x - w / 2 + 6 + i * (w - 12) / 4)}" y="${r1(base - h + 6)}" width="6" height="${r1(h - 12)}"/>`).join("")
    }</g>`
  );
}

/** ブドウ畑の畝(アセキア水路沿い)。メンドーサ専用。 */
function vineRow(x, y, count, gap) {
  const parts = [];
  for (let i = 0; i < count; i++) parts.push(`<circle cx="${r1(x + i * gap)}" cy="${y}" r="3.4" fill="#5f8a4a"/>`);
  return `<g>${parts.join("")}</g>`;
}

/** アセキア(開渠水路)。メンドーサ専用。 */
function acequiaChannel(x0, y, x1) {
  return `<line x1="${x0}" y1="${y}" x2="${x1}" y2="${y}" stroke="#5f8fae" stroke-width="3"/>`;
}

/** 石造りのコロニア旧市街の家。低い切妻屋根。 */
function portugueseCottage(x, base, w, h) {
  return (
    `<rect x="${r1(x - w / 2)}" y="${r1(base - h)}" width="${w}" height="${h}" fill="#f2f6f8"/>` +
    `<path d="M${r1(x - w / 2 - 2)},${r1(base - h)}h${r1(w + 4)}v-5h-${r1(w + 4)}z" fill="#c8443a"/>`
  );
}

/** 免税店の店先。リベラ専用。 */
function dutyFreeShop(x, base, w, h, sign) {
  return (
    `<rect x="${r1(x - w / 2)}" y="${r1(base - h)}" width="${w}" height="${h}" fill="#e2e8ea"/>` +
    `<rect x="${r1(x - w / 2)}" y="${r1(base - h)}" width="${w}" height="5" fill="${sign}"/>` +
    `<rect x="${r1(x - w / 2 + 3)}" y="${r1(base - h + 8)}" width="${r1(w - 6)}" height="${r1(h - 12)}" fill="#8fc4e8" opacity=".6"/>`
  );
}

/** 食肉工場の棟と煙突。フライベントス専用。 */
function canneryHall(x, base, w, h) {
  return (
    `<rect x="${r1(x - w / 2)}" y="${r1(base - h)}" width="${w}" height="${h}" fill="#8a8478"/>` +
    `<rect x="${r1(x - w / 2 + 4)}" y="${r1(base - h - 30)}" width="8" height="30" fill="#6b5330"/>` +
    `<circle cx="${r1(x - w / 2 + 8)}" cy="${r1(base - h - 34)}" r="6" fill="#c8bda0" opacity=".6"/>`
  );
}

// ---------------------------------------------------------------------------
// パラグアイ・ブラジル南部国境(バッチ4・5都市)専用の部品
// ---------------------------------------------------------------------------

/** 帆船ふうの遠征船。アスンシオン専用。 */
function expeditionShip(x, base, scale = 1) {
  return (
    `<path d="M${r1(x - 14 * scale)},${base}L${r1(x - 10 * scale)},${r1(base + 8 * scale)}L${r1(x + 14 * scale)},${r1(base + 8 * scale)}L${r1(x + 10 * scale)},${base}z" fill="#8a6a3c"/>` +
    `<line x1="${x}" y1="${base}" x2="${x}" y2="${r1(base - 22 * scale)}" stroke="#6b5330" stroke-width="${r1(1.6 * scale)}"/>` +
    `<path d="M${x},${r1(base - 20 * scale)}L${x},${r1(base - 2 * scale)}L${r1(x + 12 * scale)},${r1(base - 6 * scale)}z" fill="#e2ddc8"/>`
  );
}

/** サコレイロス(袋を担ぐ商人)。シウダーデルエステ専用。 */
function bagTrader(x, base, scale = 1) {
  return (
    `<circle cx="${x}" cy="${r1(base - 14 * scale)}" r="${r1(3 * scale)}" fill="#e2ddc8"/>` +
    `<rect x="${r1(x - 2.6 * scale)}" y="${r1(base - 11 * scale)}" width="${r1(5.2 * scale)}" height="${r1(9 * scale)}" fill="#2f6ea8"/>` +
    `<circle cx="${r1(x + 5 * scale)}" cy="${r1(base - 8 * scale)}" r="${r1(4 * scale)}" fill="#c8bda0"/>`
  );
}

/** ダムの壁と放流。フォスドイグアス専用。 */
function damWall(x, base, w, h) {
  return (
    `<rect x="${r1(x - w / 2)}" y="${r1(base - h)}" width="${w}" height="${h}" fill="#c8bda0"/>` +
    `<g fill="#3a3f46" opacity=".5">${
      Array.from({ length: 5 }, (_, i) => `<rect x="${r1(x - w / 2 + 10 + i * (w - 20) / 4)}" y="${r1(base - h + 6)}" width="6" height="${r1(h - 12)}"/>`).join("")
    }</g>`
  );
}

/** 落水の白い筋。フォスドイグアス専用(イグアスの滝)。 */
function waterfallStreak(x, base, h) {
  return `<rect x="${r1(x - 3)}" y="${r1(base - h)}" width="6" height="${h}" fill="#e8f4f8" opacity=".85"/>`;
}

/** 二層橋(上に鉄道、下に道路)。ウルグアイアナ専用。 */
function twoDeckBridgeSpan(x0, y0, x1, y1) {
  return (
    `<line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y1}" stroke="#8b8f98" stroke-width="6"/>` +
    `<line x1="${x0}" y1="${y0 + 10}" x2="${x1}" y2="${y1 + 10}" stroke="#5a5f52" stroke-width="4"/>`
  );
}

// ---------------------------------------------------------------------------
// 背景シーン(8種、サンプル分)。鍵は cities.mjs の `bg` と対応。
// ---------------------------------------------------------------------------

const SOUTHAMERICA_BASE_BG = {
  /**
   * チチカカ湖。プーノ専用。遠景のアンデス、湖面、葦の浮き島、ヤバリ号、
   * トトラ舟。中央の隠れ帯には湖面の反射だけを置く(失っても軽い)。
   */
  titicaca:
    sky("#7fb0d8", "#cfe4ea", 108) +
    clouds(70, 26, 1) +
    peak(50, 108, 46, "#8b8f98") +
    peak(340, 108, 40, "#9a9ea6") +
    ground(108, "#c8b458") +
    // 湖面
    `<rect x="0" y="140" width="400" height="70" fill="#2f6f9a"/>` +
    ripples(156, "#bfe4f0") +
    ripples(196, "#8fc4d8") +
    // 対岸のなだらかな丘(隠れ帯にかかってよい繰り返し)
    hills(112, "#8a7a5c", 5) +
    // ヤバリ号(左、係留)
    steamship(76, 150, 1) +
    // 葦の浮き島(右)
    reedIsland(300, 172, 70, 20) +
    reedIsland(360, 190, 46, 14, false) +
    // トトラ舟(手前)
    reedBoat(40, 196, 1.1) +
    reedBoat(140, 202, 0.9) +
    // 岸辺の葦(左右の端)
    `<g stroke="#a89438" stroke-width="2"><path d="M8,208v-20M14,208v-26M20,208v-18"/></g>` +
    `<g stroke="#a89438" stroke-width="2"><path d="M388,208v-22M394,208v-16M380,208v-28"/></g>` +
    gull(120, 40) +
    gull(280, 54) +
    sun(360, 34, 16, "#f5d060"),

  /**
   * アタカマ・太平洋岸。アリカ専用。モロ岬、砂漠、ヤシ並木、港のクレーン、
   * アンデスへ向かう鉄路。
   */
  atacamacoast:
    sky("#bcdcea", "#eef2e2", 112) +
    sun(46, 32, 20, "#f5d060") +
    // 遠景アンデス(内陸側、右)
    peak(320, 112, 34, "#a8886a") +
    peak(360, 112, 28, "#b89878") +
    ground(112, "#d8b878") +
    // モロ岬(左の断崖)
    `<path d="M0,112L0,150L60,150L88,112z" fill="#b3946a"/>` +
    `<path d="M0,112L0,150L60,150L88,112z" fill="#00000018"/>` +
    // 砂丘の筋
    `<g stroke="#c2a06a" stroke-width="2" opacity=".7"><path d="M100,150q20,-8 40,0M180,158q20,-8 40,0"/></g>` +
    // 海
    `<rect x="0" y="164" width="400" height="46" fill="#1f6f96"/>` +
    ripples(178, "#bfe8f4") +
    ripples(198, "#8fc4d8") +
    // 桟橋・港クレーン(中央〜右手前)
    `<rect x="230" y="164" width="100" height="6" fill="#8b8f98"/>` +
    crane(250, 164, 30, "#e8443f") +
    crane(300, 164, 24, "#e8443f") +
    // 鉄路(左手前から内陸のアンデスへ)
    railTrack(20, 200, 340, 118, 6) +
    // ヤシ並木(手前)
    palm(30, 208, 26) +
    palm(60, 210, 22) +
    palm(370, 206, 24) +
    // 税関ふうの低い建物
    `<g fill="#e8ded0"><rect x="130" y="182" width="34" height="20"/><rect x="260" y="188" width="26" height="14"/></g>` +
    gull(160, 44) +
    gull(200, 60) +
    gull(90, 70),

  /**
   * ダリエン地峡。ヤビサ専用。密林、川、丸木舟、高床の家、
   * ハイウェイが途切れる標識。
   */
  darien:
    sky("#a8c4b0", "#dfe8d0", 96) +
    // 密林の遠景(尾根)
    hills(96, "#2f6b3a", 4) +
    ground(96, "#3f7f4a") +
    // 密林の樹冠(背後、隠れ帯にかかってよい)
    jungleCanopy(60, 108, 30, "#2f6b3a") +
    jungleCanopy(140, 104, 26, "#3f8f4f") +
    jungleCanopy(220, 108, 32, "#2f6b3a") +
    jungleCanopy(300, 104, 28, "#3f8f4f") +
    jungleCanopy(370, 110, 24, "#2f6b3a") +
    // 川(泥色だが青みを足して水面と分かるようにする)
    `<rect x="0" y="150" width="400" height="60" fill="#4f6f6a"/>` +
    `<g stroke="#7fa89a" stroke-width="2" opacity=".7"><path d="M20,164h60M180,172h90M300,182h70"/></g>` +
    // 高床の家(左)
    stiltHouse(70, 150, 46, 34) +
    stiltHouse(30, 150, 34, 26) +
    // ハイウェイ最後の一区画+標識(右手前)
    `<rect x="280" y="188" width="90" height="16" fill="#7a7468"/>` +
    `<g stroke="#e8ded0" stroke-width="2" stroke-dasharray="8 6"><line x1="280" y1="196" x2="370" y2="196"/></g>` +
    `<rect x="356" y="160" width="4" height="30" fill="#6b5330"/>` +
    `<rect x="344" y="150" width="28" height="14" fill="#e8443f"/>` +
    // 丸木舟(手前。隠れ帯x151-249を避けて配置)
    dugoutCanoe(140, 198, 1.1) +
    dugoutCanoe(262, 202, 0.9) +
    // 手前の大葉・シダ
    `<g fill="#2f6b3a" opacity=".85"><path d="M10,210c0,-18 14,-24 20,-24c-2,10 -10,20 -20,24z"/><path d="M390,210c0,-16 -12,-22 -18,-22c2,9 9,18 18,22z"/></g>` +
    `<g fill="#3f8f4f" opacity=".8"><path d="M100,210c-2,-12 4,-18 10,-20c1,7 -3,15 -10,20z"/><path d="M260,210c2,-10 -3,-16 -9,-18c-1,6 3,13 9,18z"/></g>` +
    // 極彩色の鳥
    `<g fill="#e8443f"><circle cx="330" cy="90" r="4"/></g>` +
    `<g fill="#f5b31c"><circle cx="345" cy="96" r="3"/></g>`,

  /**
   * パラナ川。エンカルナシオン専用。夕暮れの川面、国際橋、廃墟の輪郭、
   * コスタネーラのビーチパラソル。
   */
  parana:
    sky("#e8a860", "#f5d8a0", 118) +
    sun(340, 40, 22, "#f5b31c") +
    hills(118, "#8a6a4c", 4) +
    ground(118, "#b3946a") +
    // 対岸のトリニダー廃墟の輪郭(遠景。隠れ帯を避けて左に置く)
    ruinArch(66, 130, 26) +
    ruinArch(96, 130, 20) +
    `<rect x="46" y="118" width="70" height="10" fill="#b3947a" opacity=".6"/>` +
    // 川面
    `<rect x="0" y="152" width="400" height="58" fill="#2f5f8a"/>` +
    ripples(166, "#e8c890") +
    ripples(190, "#5f8fae") +
    // 国際橋(左から右へ)
    `<rect x="0" y="148" width="400" height="5" fill="#8b8f98"/>` +
    bridgePier(60, 153, 190) +
    bridgePier(200, 153, 195) +
    bridgePier(340, 153, 190) +
    // フェリー(手前)
    `<path d="M40,198L40,188L100,188L110,198z" fill="#e8ded0"/><rect x="55" y="180" width="30" height="10" fill="#2f6ea8"/>` +
    // コスタネーラのパラソル(手前右)
    beachUmbrella(300, 208, 20) +
    beachUmbrella(330, 210, 18, "#f5b31c") +
    beachUmbrella(360, 208, 20, "#2f6ea8") +
    // ヤシ
    palm(20, 210, 24) +
    palm(380, 210, 22) +
    gull(120, 50) +
    gull(260, 60),

  /**
   * フエゴ島。ウスアイア専用。氷河の山並み、ビーグル水道、世界の果ての
   * 鉄道、色とりどりの波板屋根、灯台、ペンギン。
   */
  fuegochannel:
    sky("#a8c0d0", "#dde8ec", 110) +
    snowPeak(70, 110, 44) +
    snowPeak(150, 110, 36) +
    snowPeak(330, 110, 40) +
    ground(110, "#7f8f78") +
    // 水道
    `<rect x="0" y="158" width="400" height="52" fill="#33566e"/>` +
    ripples(172, "#bcd6e0") +
    ripples(196, "#5f7f96") +
    // 波板屋根の家並み(左)
    corrugatedHouse(50, 158, 30, 22, "#c8443a") +
    corrugatedHouse(84, 158, 24, 18, "#2f6ea8") +
    corrugatedHouse(112, 158, 26, 20, "#f5b31c") +
    corrugatedHouse(30, 158, 20, 16, "#3f8f4f") +
    // 世界の果ての鉄道(手前中央〜右)
    railTrack(180, 206, 340, 206, 8) +
    tinyTrain(260, 206, 1) +
    // 灯台(右手前)
    lighthouse(370, 208, 26) +
    // 港の船
    `<path d="M180,196L180,188L230,188L238,196z" fill="#e8ded0"/><rect x="195" y="178" width="20" height="10" fill="#3a3f46"/>` +
    // ペンギン(手前左、氷の岩場の上に置いて水面と見分けやすくする)
    `<ellipse cx="34" cy="204" rx="30" ry="9" fill="#e2e8ea"/>` +
    penguin(24, 204, 1.2) +
    penguin(38, 204, 1) +
    penguin(48, 202, 0.9) +
    gull(60, 40) +
    gull(200, 30) +
    gull(300, 46),

  /**
   * デメララ。ジョージタウン専用。海面下の町を守る海堤と水門、
   * 木造コロニアル家屋、スタブルック市場の時計塔、サトウキビ畑。
   */
  demerara:
    sky("#8fc4e8", "#cfe4f0", 108) +
    clouds(70, 24, 1) +
    // 背後のサトウキビ畑(遠景の帯)
    `<g fill="#9aa85c" opacity=".85"><rect x="0" y="96" width="400" height="12"/></g>` +
    `<g stroke="#7f8f4a" stroke-width="1.4"><path d="M20,108v-10M40,108v-10M60,108v-10M320,108v-10M340,108v-10M360,108v-10"/></g>` +
    ground(108, "#8fae63") +
    // 木造コロニアル家屋(左)
    colonialCottage(50, 150, 34, 30, "#2f6ea8") +
    colonialCottage(90, 152, 26, 24, "#c8443a") +
    // スタブルック市場の時計塔(右)
    marketClockTower(330, 150, 40) +
    // 運河
    `<rect x="0" y="164" width="400" height="46" fill="#3f7f9a"/>` +
    ripples(178, "#bfe8f4") +
    // 海堤(手前、全幅)
    `<rect x="0" y="196" width="400" height="14" fill="#7a7468"/>` +
    sluiceGate(200, 196, 26) +
    sluiceGate(360, 196, 20) +
    // ヤシ
    palm(20, 210, 24) +
    palm(380, 208, 22) +
    gull(150, 40) +
    gull(250, 56) +
    sun(370, 30, 16, "#f5d060"),

  /**
   * パラマリボ。モスクとシナゴーグが並ぶ通り、木造コロニアル家屋、
   * 草に呑まれたラワ鉄道、スリナム川のフェリー。
   */
  paramaribo:
    sky("#8fc4e8", "#cfe4f0", 104) +
    hills(102, "#2f6b3a", 4) +
    ground(104, "#8fae63") +
    // モスクとシナゴーグ(隣り合わせ、隠れ帯の左右に分けて置く)
    mosque(70, 150, 40) +
    synagogue(130, 150, 34) +
    // 共有の駐車場(手前)
    `<rect x="40" y="176" width="120" height="10" fill="#8a8478"/>` +
    `<g stroke="#f2f6f8" stroke-width="1.6"><line x1="60" y1="181" x2="60" y2="186"/><line x1="90" y1="181" x2="90" y2="186"/><line x1="120" y1="181" x2="120" y2="186"/></g>` +
    // 木造コロニアル家屋(右)
    colonialCottage(300, 150, 30, 28, "#3f8f6a") +
    colonialCottage(340, 152, 24, 22, "#c8a838") +
    // 草に呑まれたラワ鉄道(背後で途切れる)
    overgrownRail(200, 130, 320) +
    // スリナム川
    `<rect x="0" y="176" width="400" height="34" fill="#2f6f8a"/>` +
    ripples(188, "#bfe8f4") +
    // フェリー(手前)
    `<path d="M220,206L220,196L270,196L278,206z" fill="#e8ded0"/><rect x="235" y="188" width="20" height="10" fill="#2f6ea8"/>` +
    palm(20, 210, 24) +
    palm(380, 210, 22) +
    gull(180, 40) +
    gull(240, 56),

  /**
   * クールー宇宙基地。ロケットとガントリー、組立棟、周りを囲む密林。
   */
  spaceport:
    sky("#7fb0e0", "#cfe4f0", 100) +
    clouds(320, 26, 1) +
    // 密林の背景(発射場を囲む)
    hills(98, "#2f6b3a", 5) +
    ground(100, "#8fae63") +
    // 組立棟(左)
    assemblyBuilding(60, 150, 60, 46) +
    // 発射台のロケット(右寄り)
    rocketOnPad(260, 150, 90) +
    // 発射場のコンクリート敷地(手前)
    `<rect x="0" y="150" width="400" height="60" fill="#9a9488"/>` +
    `<g stroke="#7a7468" stroke-width="1.6"><line x1="0" y1="170" x2="400" y2="170"/><line x1="0" y1="190" x2="400" y2="190"/></g>` +
    // 管制塔(手前左)
    `<rect x="20" y="176" width="18" height="30" fill="#e2e8ea"/><rect x="16" y="172" width="26" height="6" fill="#3a3f46"/>` +
    // 燃料タンク(手前右)
    `<ellipse cx="360" cy="200" rx="14" ry="8" fill="#e2e8ea"/><rect x="346" y="188" width="28" height="14" fill="#e2e8ea"/>` +
    palm(390, 208, 20) +
    gull(120, 40) +
    gull(60, 56),

  /** ルミチャカ。イパレス専用。峡谷の天然石橋、旧鉄道駅。 */
  rumichaca:
    sky("#8fc4e8", "#cfe4f0", 100) +
    clouds(80, 26, 0.9) +
    peak(60, 100, 40) +
    peak(340, 100, 34) +
    hills(102, "#6f8a52", 4) +
    ground(100, "#8fae63") +
    `<rect x="0" y="150" width="400" height="60" fill="#6b7a4a"/>` +
    ripples(168, "#8fbfae") +
    stoneArchBridge(200, 190, 140, 60) +
    `<g stroke="#c8bda0" stroke-width="6"><line x1="130" y1="182" x2="270" y2="182"/></g>` +
    signalBox(60, 190, 30, 22, "#8a6a4c") +
    railTrack(20, 200, 90, 190, 3) +
    `<rect x="330" y="176" width="4" height="22" fill="#6b5330"/><rect x="318" y="166" width="28" height="12" fill="#e8443f"/>` +
    `<g fill="#3f8f4f" opacity=".85"><circle cx="30" cy="206" r="7"/><circle cx="380" cy="204" r="8"/></g>` +
    gull(140, 44) +
    gull(260, 60) +
    gull(100, 30) +
    sun(370, 32, 16, "#f5d060"),

  /** 悪魔の鼻。アラウシ専用。崖のスイッチバック、労働者慰霊碑。 */
  narizdeldiablo:
    sky("#8fc4e8", "#cfe4f0", 96) +
    hills(94, "#5f7f4a", 4) +
    ground(96, "#6f8a52") +
    `<path d="M120,96L400,96L400,210L260,210z" fill="#8b8f98"/>` +
    `<path d="M120,96L400,96L400,140L200,140z" fill="#7a7a72" opacity=".5"/>` +
    switchbackTrack(340, 200, 160, 90, 4) +
    `<rect x="24" y="150" width="4" height="40" fill="#6b5330"/><rect x="14" y="150" width="24" height="4" fill="#5a5f52"/>` +
    `<circle cx="40" cy="130" r="8" fill="#e8443f" opacity=".8"/>` +
    palm(60, 208, 22) +
    gull(80, 40) +
    gull(180, 30) +
    sun(50, 30, 16, "#f5d060"),

  /** トゥルカンの植木細工墓地。 */
  tulcancemetery:
    sky("#8fc4e8", "#cfe4f0", 104) +
    clouds(200, 24, 0.8) +
    hills(102, "#6f8a52", 4) +
    ground(104, "#8fae63") +
    topiaryShape(50, 176, 46, "arch") +
    topiaryShape(90, 176, 34, "animal") +
    topiaryShape(120, 178, 30, "animal") +
    topiaryShape(280, 178, 30, "animal") +
    topiaryShape(310, 176, 34, "animal") +
    topiaryShape(350, 176, 40, "arch") +
    `<g fill="#e2e8ea"><rect x="60" y="180" width="8" height="14"/><rect x="76" y="182" width="8" height="12"/><rect x="300" y="180" width="8" height="14"/><rect x="330" y="184" width="7" height="10"/></g>` +
    marketStall(190, 200, 40, "#e8443f") +
    marketStall(240, 202, 34, "#2f6ea8") +
    `<g stroke="#7a7468" stroke-width="1.6"><path d="M4,206h392"/></g>` +
    gull(150, 40) +
    gull(220, 56) +
    gull(70, 30) +
    sun(370, 30, 16, "#f5d060"),

  /** ワキジャス国境の橋の市場。 */
  huaquillasborder:
    sky("#8fc4e8", "#dfe4d0", 106) +
    hills(104, "#8a9a4a", 3) +
    ground(106, "#b3946a") +
    `<rect x="0" y="150" width="400" height="60" fill="#5a7a6e"/>` +
    ripples(164, "#bfe8f4") +
    `<rect x="0" y="146" width="400" height="6" fill="#8b8f98"/>` +
    bridgePier(140, 152, 195) +
    bridgePier(260, 152, 195) +
    marketStall(60, 200, 34, "#e8443f") +
    marketStall(100, 202, 30, "#f5b31c") +
    marketStall(320, 200, 34, "#2f6ea8") +
    marketStall(360, 202, 30, "#3f8f4f") +
    `<rect x="30" y="150" width="4" height="26" fill="#6b5330"/><rect x="18" y="140" width="28" height="12" fill="#f5d060"/>` +
    `<rect x="366" y="150" width="4" height="26" fill="#6b5330"/><rect x="354" y="140" width="28" height="12" fill="#e8443f"/>` +
    gull(160, 40) +
    gull(220, 30),

  /** ペルー中央鉄道。リマ専用。海面の港から山頂へ登るスイッチバック。 */
  centralrailway:
    sky("#7fb0e0", "#cfe4f0", 92) +
    peak(320, 92, 60, "#8b8f98") +
    peak(370, 92, 44, "#9a9ea6") +
    ground(92, "#c2a06a") +
    switchbackTrack(300, 176, 90, 74, 4) +
    `<rect x="0" y="176" width="400" height="34" fill="#1f6f96"/>` +
    ripples(190, "#bfe8f4") +
    crane(60, 176, 30, "#e8443f") +
    `<rect x="20" y="176" width="60" height="6" fill="#8b8f98"/>` +
    palm(30, 210, 22) +
    gull(150, 40) +
    gull(90, 56) +
    sun(40, 28, 16, "#f5d060"),

  /** クスコ高地。カパック・ニャン、段々畑、リャマ。 */
  cuscohighlands:
    sky("#8fc4e8", "#cfe4f0", 102) +
    peak(60, 98, 40) +
    peak(340, 98, 36) +
    hills(100, "#8a7a5c", 4) +
    ground(102, "#9aa85c") +
    incaTerraceWall(260, 176, 120, 3) +
    `<g stroke="#8b8f98" stroke-width="3" opacity=".8"><path d="M40,206C120,190 200,190 280,180"/></g>` +
    `<rect x="34" y="200" width="10" height="3" fill="#6b5330"/>` +
    llama(70, 206, 1.1) +
    llama(96, 208, 0.9) +
    gull(160, 40) +
    gull(250, 30) +
    sun(370, 30, 16, "#f5d060"),

  /** タクナ広場。1855年の国際鉄道ホーム、条約記念碑。 */
  tacnaplaza:
    sky("#8fc4e8", "#cfe4f0", 108) +
    hills(106, "#c2a06a", 3) +
    ground(108, "#d8c088") +
    `<rect x="0" y="180" width="400" height="4" fill="#8b8f98"/>` +
    railTrack(20, 190, 380, 190, 8) +
    signalBox(60, 182, 40, 26, "#a8743c") +
    `<circle cx="300" cy="176" r="20" fill="#5f7f4a"/><rect x="296" y="176" width="8" height="24" fill="#8b8f98"/>` +
    palm(340, 208, 22) +
    palm(20, 208, 20) +
    gull(160, 40) +
    gull(220, 56) +
    sun(370, 30, 16, "#f5d060"),

  /** ビジャソン駅。乾いた谷の歩道橋、アルゼンチン建設の駅舎。 */
  villazonstation:
    sky("#8fc4e8", "#dfe4d0", 106) +
    clouds(120, 22, 0.8) +
    hills(104, "#c2a06a", 3) +
    ground(106, "#c2a06a") +
    `<path d="M150,106L180,150L220,150L250,106z" fill="#a8886a" opacity=".7"/>` +
    stoneArchBridge(200, 150, 60, 20) +
    signalBox(70, 150, 46, 30, "#c8443a") +
    `<rect x="76" y="154" width="14" height="10" fill="#dfe4e8" opacity=".6"/>` +
    railTrack(20, 190, 150, 150, 4) +
    marketStall(300, 200, 34, "#f5b31c") +
    marketStall(340, 202, 30, "#3f8f4f") +
    `<g stroke="#8a8478" stroke-width="2" opacity=".6"><path d="M280,206h100"/></g>` +
    gull(160, 40) +
    gull(240, 56) +
    gull(90, 30) +
    sun(40, 30, 16, "#f5d060"),

  /** ビアチャの三路線分岐。信号所、転車台。 */
  viachayard:
    sky("#8fc4e8", "#cfe4f0", 100) +
    peak(60, 100, 34) +
    peak(340, 100, 30) +
    ground(100, "#9aa85c") +
    railTrack(0, 180, 400, 130, 6) +
    railTrack(0, 200, 400, 160, 6) +
    railTrack(0, 210, 400, 190, 4) +
    signalBox(200, 200, 30, 24, "#8a6a4c") +
    `<circle cx="120" cy="204" r="16" fill="#8b8f98" opacity=".8"/><circle cx="120" cy="204" r="4" fill="#3a3f46"/>` +
    gull(160, 40) +
    gull(260, 56) +
    sun(370, 30, 16, "#f5d060"),

  /** チャラーニャ駅。静かな国境税関、閉じた窓口。 */
  charanastation:
    sky("#a8c0d0", "#dde8ec", 104) +
    clouds(340, 26, 0.8) +
    peak(70, 104, 38) +
    peak(140, 104, 26) +
    peak(330, 104, 34) +
    ground(104, "#c2a06a") +
    signalBox(200, 176, 60, 34, "#8a6a4c") +
    `<rect x="196" y="176" width="10" height="18" fill="#dfe4e8" opacity=".6"/>` +
    `<rect x="228" y="176" width="10" height="18" fill="#dfe4e8" opacity=".6"/>` +
    railTrack(20, 200, 380, 200, 8) +
    `<rect x="180" y="150" width="40" height="6" fill="#5a5f52"/>` +
    `<rect x="60" y="192" width="18" height="14" fill="#8a8478"/>` +
    `<rect x="320" y="194" width="16" height="12" fill="#8a8478"/>` +
    `<g stroke="#c2a06a" stroke-width="2" opacity=".6"><path d="M40,150q16,-6 32,0M280,150q16,-6 32,0"/></g>` +
    gull(120, 40) +
    gull(280, 56) +
    sun(360, 30, 14, "#f5d060"),

  /** グアヤキル港。バナナの積出、マレコンの遊歩道。 */
  guayaquilport:
    sky("#8fc4e8", "#cfe4f0", 108) +
    clouds(90, 26, 1) +
    hills(106, "#3f8f4f", 3) +
    ground(108, "#8fae63") +
    `<rect x="0" y="160" width="400" height="50" fill="#1f6f96"/>` +
    ripples(174, "#bfe8f4") +
    crane(70, 160, 34, "#e8443f") +
    crane(120, 160, 28, "#e8443f") +
    `<rect x="40" y="160" width="100" height="6" fill="#8b8f98"/>` +
    bananaBunch(280, 200, 1.2) +
    bananaBunch(300, 202, 1) +
    bananaBunch(320, 200, 1.1) +
    `<rect x="270" y="200" width="70" height="8" fill="#c8bda0"/>` +
    palm(360, 208, 22) +
    palm(20, 210, 20) +
    gull(180, 40) +
    gull(240, 56),

  /** アントファガスタ港。銅精鉱の貨車、砂漠の海岸。 */
  antofagastaport:
    sky("#bcdcea", "#eef2e2", 110) +
    sun(40, 30, 18, "#f5d060") +
    hills(108, "#b3946a", 3) +
    ground(110, "#c2a06a") +
    railTrack(20, 176, 300, 176, 8) +
    oreWagon(80, 176, 34, 16) +
    oreWagon(120, 176, 34, 16) +
    oreWagon(160, 176, 34, 16) +
    `<rect x="0" y="182" width="400" height="28" fill="#1f6f96"/>` +
    ripples(196, "#bfe8f4") +
    crane(340, 182, 30, "#e8443f") +
    gull(180, 40) +
    gull(260, 56),

  /** バルパライソの丘。色とりどりの家並み、フニクラ、トンネルの坑口。 */
  valparaisohills:
    sky("#8fc4e8", "#cfe4f0", 96) +
    clouds(340, 24, 1) +
    hills(94, "#8a9a4a", 4) +
    ground(96, "#8a9a4a") +
    hillHouse(50, 150, 24, 26, "#e8443f") +
    hillHouse(78, 148, 22, 24, "#f5b31c") +
    hillHouse(104, 150, 20, 22, "#2f6ea8") +
    hillHouse(126, 152, 18, 20, "#3f8f4f") +
    hillHouse(320, 148, 22, 24, "#3f8f4f") +
    hillHouse(346, 150, 20, 22, "#e8443f") +
    hillHouse(368, 152, 18, 20, "#f5b31c") +
    funicular(40, 176, 90, 130) +
    `<path d="M170,150a30,20 0 0 1 60,0z" fill="#5a5f52"/><rect x="164" y="150" width="72" height="10" fill="#3a3f46"/>` +
    `<rect x="0" y="180" width="400" height="30" fill="#1f6f96"/>` +
    ripples(192, "#bfe8f4") +
    crane(230, 180, 20, "#e8443f") +
    gull(160, 40) +
    gull(220, 56) +
    gull(280, 30),

  /** マゼラン海峡。プンタアレナス専用。石炭補給、羊牧場。 */
  magellanstrait:
    sky("#a8c0d0", "#dde8ec", 104) +
    peak(340, 104, 30) +
    ground(104, "#8a9a7a") +
    `<rect x="0" y="150" width="400" height="60" fill="#33566e"/>` +
    ripples(164, "#bcd6e0") +
    ripples(190, "#5f7f96") +
    steamship(80, 150, 0.9) +
    coalPile(140, 150, 40, 20) +
    sheep(280, 208, 1.1) +
    sheep(296, 208, 0.9) +
    sheep(312, 210, 1) +
    `<rect x="250" y="188" width="60" height="14" fill="#c8bda0" opacity=".7"/>` +
    gull(120, 40) +
    gull(220, 30),

  /** ボゴタのサバンナ。索道でコーヒーを運ぶ山、トランスミレニオのバス路線。 */
  bogotasavanna:
    sky("#8fc4e8", "#cfe4f0", 96) +
    clouds(80, 24, 1) +
    peak(50, 96, 40) +
    peak(350, 96, 36) +
    hills(98, "#6f8a52", 4) +
    ground(96, "#8fae63") +
    cableway(40, 110, 320, 60, 3) +
    `<path d="M20,150Q40,116 80,110Q140,104 180,120" fill="none" stroke="#5a5f52" stroke-width="1.2" opacity=".6"/>` +
    marketClockTower(70, 176, 36) +
    busway(240, 200, 260) +
    `<g fill="#e2ddc8"><rect x="300" y="160" width="20" height="30"/><rect x="330" y="150" width="24" height="40"/><rect x="360" y="164" width="18" height="26"/></g>` +
    `<g fill="#bfe0f0" opacity=".6"><rect x="304" y="166" width="4" height="4"/><rect x="335" y="158" width="4" height="4"/><rect x="335" y="170" width="4" height="4"/></g>` +
    gull(160, 40) +
    gull(220, 56),

  /** メデジンの丘。メトロカブレのゴンドラが登る、色とりどりの家。 */
  medellin:
    sky("#8fc4e8", "#cfe4f0", 92) +
    clouds(340, 22, 0.9) +
    hills(90, "#3f8f4f", 4) +
    ground(92, "#6f8a52") +
    hillHouse(40, 150, 20, 22, "#e8443f") +
    hillHouse(62, 146, 18, 20, "#f5b31c") +
    hillHouse(82, 150, 18, 22, "#2f6ea8") +
    hillHouse(102, 144, 20, 24, "#3f8f4f") +
    hillHouse(320, 148, 20, 22, "#e8443f") +
    hillHouse(342, 144, 18, 24, "#f5b31c") +
    hillHouse(362, 150, 18, 20, "#2f6ea8") +
    cableway(20, 200, 340, 90, 4) +
    `<g fill="#8a8478" opacity=".8"><path d="M40,210C120,196 220,196 300,210"/></g>` +
    gull(160, 40) +
    gull(240, 56) +
    sun(370, 28, 16, "#f5d060"),

  /** サンアントニオ・デル・タチラの国境橋。歩いて渡る人々、廃線。 */
  tachiraborder:
    sky("#8fc4e8", "#cfe4f0", 100) +
    peak(60, 100, 36) +
    peak(340, 100, 32) +
    ground(100, "#8fae63") +
    `<rect x="0" y="150" width="400" height="60" fill="#3f7f8a"/>` +
    ripples(164, "#bfe8f4") +
    `<rect x="0" y="146" width="400" height="6" fill="#8b8f98"/>` +
    bridgePier(130, 152, 195) +
    bridgePier(270, 152, 195) +
    `<g fill="#e2ddc8"><circle cx="150" cy="140" r="4"/><circle cx="165" cy="142" r="4"/><circle cx="235" cy="140" r="4"/><circle cx="250" cy="142" r="4"/></g>` +
    `<g stroke="#3a3f46" stroke-width="1.6"><line x1="150" y1="144" x2="150" y2="150"/><line x1="165" y1="146" x2="165" y2="150"/><line x1="235" y1="144" x2="235" y2="150"/><line x1="250" y1="146" x2="250" y2="150"/></g>` +
    overgrownRail(20, 190, 120) +
    marketStall(340, 200, 30, "#e8443f") +
    palm(30, 208, 22) +
    gull(160, 40) +
    gull(220, 56),

  /** リンデンの鉱山町。ボーキサイト鉄道、企業城下町の格子街路。 */
  lindenmine:
    sky("#8fc4e8", "#cfe4f0", 100) +
    hills(98, "#3f8f4f", 4) +
    ground(100, "#8fae63") +
    gridHouse(40, 176, 30, 26, "#e8443f") +
    gridHouse(76, 176, 26, 22, "#2f6ea8") +
    gridHouse(320, 176, 28, 24, "#f5b31c") +
    gridHouse(356, 176, 24, 20, "#3f8f4f") +
    railTrack(20, 190, 300, 190, 8) +
    oreWagon(140, 190, 30, 14) +
    oreWagon(180, 190, 30, 14) +
    `<rect x="0" y="196" width="400" height="14" fill="#5a7a6e"/>` +
    ripples(202, "#8fbfae") +
    gull(160, 40) +
    gull(240, 56) +
    sun(370, 28, 16, "#f5d060"),

  /** ニウニッケリーのポルダー。稲田、コランティン川のフェリー。 */
  corantijn:
    sky("#8fc4e8", "#cfe4f0", 106) +
    clouds(90, 22, 0.8) +
    hills(104, "#8fae63", 3) +
    ground(106, "#9aa85c") +
    ricePaddy(20, 156, 90, 3) +
    ricePaddy(280, 158, 100, 3) +
    ricePaddy(20, 172, 90, 2) +
    ricePaddy(280, 174, 100, 2) +
    `<rect x="0" y="182" width="400" height="28" fill="#3f7f8a"/>` +
    ripples(194, "#bfe8f4") +
    ripples(204, "#8fbfd4") +
    `<path d="M170,200L170,190L230,190L238,200z" fill="#e8ded0"/><rect x="185" y="182" width="20" height="10" fill="#2f6ea8"/>` +
    `<rect x="0" y="178" width="20" height="6" fill="#8a8478"/><rect x="380" y="178" width="20" height="6" fill="#8a8478"/>` +
    `<g fill="#e2ddc8"><rect x="40" y="160" width="16" height="14"/><rect x="340" y="162" width="16" height="14"/></g>` +
    gull(160, 40) +
    gull(240, 56) +
    gull(100, 30) +
    sun(370, 28, 16, "#f5d060"),

  /** マロニ川。石造りの流刑地の建物、密林、マルーンの高床の小屋。 */
  maroniriver:
    sky("#a8c4b0", "#dfe8d0", 98) +
    hills(96, "#2f6b3a", 4) +
    ground(98, "#3f7f4a") +
    jungleCanopy(70, 108, 26, "#2f6b3a") +
    jungleCanopy(330, 108, 28, "#3f8f4f") +
    prisonBlock(60, 176, 70, 40) +
    `<rect x="30" y="176" width="8" height="30" fill="#5a5f52"/><rect x="20" y="170" width="28" height="8" fill="#3a3f46"/>` +
    `<rect x="0" y="192" width="400" height="18" fill="#4f6f6a"/>` +
    `<g stroke="#7fa89a" stroke-width="2" opacity=".7"><path d="M60,200h60M220,204h90"/></g>` +
    maroonHut(300, 190, 40, 30) +
    maroonHut(340, 192, 30, 24) +
    dugoutCanoe(180, 200, 1) +
    gull(150, 40) +
    gull(250, 56),

  /** レティシア。国境の無いアマゾン河岸の街並み。 */
  leticiaamazon:
    sky("#8fc4e8", "#cfe4f0", 96) +
    clouds(200, 22, 0.8) +
    hills(94, "#2f6b3a", 4) +
    ground(96, "#3f7f4a") +
    jungleCanopy(30, 108, 22, "#2f6b3a") +
    jungleCanopy(340, 106, 26, "#3f8f4f") +
    jungleCanopy(370, 108, 20, "#2f6b3a") +
    `<rect x="0" y="150" width="400" height="60" fill="#5a7a6e"/>` +
    `<g stroke="#7fa89a" stroke-width="2" opacity=".7"><path d="M20,164h60M300,172h90"/></g>` +
    `<rect x="30" y="150" width="340" height="8" fill="#c8bda0"/>` +
    marketStall(60, 150, 30, "#e8443f") +
    marketStall(100, 150, 26, "#f5b31c") +
    marketStall(300, 150, 30, "#2f6ea8") +
    marketStall(340, 150, 26, "#3f8f4f") +
    `<path d="M180,198L180,188L230,188L238,198z" fill="#e8ded0"/><rect x="195" y="180" width="20" height="10" fill="#3a3f46"/>` +
    dugoutCanoe(120, 202, 1) +
    `<g fill="#e8443f"><circle cx="360" cy="90" r="3.4"/></g><g fill="#f5b31c"><circle cx="374" cy="96" r="2.6"/></g>` +
    gull(160, 40) +
    gull(240, 56),

  /** カシキアレ運河。オリノコとアマゾンをつなぐ、密林の中の合流点。 */
  casiquiare:
    sky("#a8c4b0", "#dfe8d0", 96) +
    clouds(200, 22, 0.8) +
    hills(94, "#2f6b3a", 4) +
    ground(96, "#3f7f4a") +
    jungleCanopy(60, 108, 28, "#2f6b3a") +
    jungleCanopy(90, 104, 20, "#3f8f4f") +
    jungleCanopy(310, 104, 22, "#2f6b3a") +
    jungleCanopy(340, 106, 26, "#3f8f4f") +
    riverMeeting(150, "#3f7f9a", "#4f6f4a") +
    `<g stroke="#8fbfd4" stroke-width="2" opacity=".7"><path d="M20,168h60M40,180h40"/></g>` +
    `<g stroke="#7fae6a" stroke-width="2" opacity=".7"><path d="M300,178h80M320,192h50"/></g>` +
    maroonHut(200, 190, 30, 24) +
    dugoutCanoe(150, 200, 0.9) +
    dugoutCanoe(250, 202, 1) +
    `<g fill="#2f6b3a" opacity=".85"><path d="M8,210c0,-16 12,-22 18,-22c-2,9 -9,18 -18,22z"/><path d="M392,210c0,-14 -10,-19 -16,-19c2,8 8,15 16,19z"/></g>` +
    gull(150, 40) +
    gull(260, 56),

  /** パンタナール。コルンバ専用。湿地、艀、軌間の変わる操車場。 */
  pantanalriver:
    sky("#8fc4e8", "#cfe4f0", 100) +
    clouds(70, 22, 0.8) +
    hills(98, "#8a9a4a", 4) +
    ground(100, "#9aa85c") +
    railTrack(20, 176, 200, 176, 6) +
    signalBox(220, 176, 34, 24, "#8a6a4c") +
    `<rect x="0" y="182" width="400" height="28" fill="#4f6f6a"/>` +
    ripples(194, "#8fbfae") +
    ripples(202, "#5f8f8a") +
    `<path d="M260,204L260,192L320,192L330,204z" fill="#c8bda0"/><rect x="270" y="196" width="4" height="16" fill="#6b5330"/><rect x="278" y="196" width="4" height="16" fill="#6b5330"/>` +
    `<g fill="#3f8f4f" opacity=".8"><ellipse cx="60" cy="206" rx="14" ry="5"/><ellipse cx="360" cy="204" rx="16" ry="5"/><ellipse cx="120" cy="208" rx="10" ry="4"/></g>` +
    `<g fill="#e2ddc8"><rect x="30" y="160" width="14" height="16"/></g>` +
    gull(160, 40) +
    gull(240, 56) +
    gull(320, 34),

  /** タバチンガの川岸。三か国の旗、ジャングル歩兵駐屯地。 */
  tabatingariver:
    sky("#8fc4e8", "#cfe4f0", 100) +
    clouds(200, 24, 0.9) +
    hills(98, "#3f8f4f", 4) +
    jungleCanopy(20, 108, 20, "#2f6b3a") +
    ground(100, "#8fae63") +
    garrisonGate(70, 176, 50, 30) +
    `<rect x="56" y="178" width="6" height="12" fill="#3a3f46" opacity=".6"/><rect x="78" y="178" width="6" height="12" fill="#3a3f46" opacity=".6"/>` +
    flagPole(30, 176, 26, "#3f8f4f") +
    flagPole(190, 176, 24, "#2f6ea8") +
    flagPole(350, 176, 26, "#e8443f") +
    `<rect x="0" y="182" width="400" height="28" fill="#3f7f9a"/>` +
    ripples(194, "#bfe8f4") +
    ripples(202, "#8fbfd4") +
    `<ellipse cx="230" cy="200" rx="20" ry="6" fill="#c8bda0"/>` +
    dugoutCanoe(280, 202, 0.8) +
    jungleCanopy(370, 108, 22, "#2f6b3a") +
    jungleCanopy(390, 106, 18, "#3f8f4f") +
    gull(160, 40) +
    gull(260, 56) +
    gull(120, 30),

  /** プエルトスアレスの操車場。軌間変更の積み替えクレーン。 */
  suarezyard:
    sky("#bcdcea", "#eef2e2", 104) +
    sun(40, 30, 16, "#f5d060") +
    hills(102, "#9aa85c", 3) +
    ground(104, "#c2a06a") +
    railTrack(20, 176, 200, 176, 6) +
    railTrack(210, 176, 380, 176, 6) +
    `<rect x="190" y="150" width="6" height="30" fill="#8b8f98"/><rect x="180" y="148" width="26" height="6" fill="#5a5f52"/>` +
    `<line x1="193" y1="150" x2="193" y2="176" stroke="#3a3f46" stroke-width="2"/>` +
    signalBox(70, 176, 30, 22, "#8a6a4c") +
    `<g fill="#8a6a4c" opacity=".8"><path d="M300,150q10,-16 40,0q10,-14 30,0"/></g>` +
    gull(160, 40) +
    gull(240, 56),

  /** ブエノスアイレスの港。扇形鉄道網の起点、移民ホテル。 */
  buenosairesport:
    sky("#8fc4e8", "#cfe4f0", 94) +
    clouds(90, 24, 1) +
    hills(92, "#6f8a52", 4) +
    ground(94, "#8fae63") +
    grandStation(70, 176, 90, 60) +
    immigrantHall(320, 176, 70, 50) +
    railTrack(20, 206, 380, 176, 5) +
    railTrack(20, 200, 380, 182, 5) +
    `<rect x="0" y="196" width="400" height="14" fill="#3f7f9a"/>` +
    ripples(202, "#bfe8f4") +
    steamship(370, 196, 0.7) +
    gull(160, 40) +
    gull(240, 56),

  /** メンドーサの砂漠。アセキア水路、マルベックのブドウ畑。 */
  mendozadesert:
    sky("#bcdcea", "#eef2e2", 106) +
    sun(360, 30, 18, "#f5d060") +
    peak(60, 106, 40) +
    peak(340, 106, 36) +
    ground(106, "#d8c088") +
    vineRow(30, 176, 6, 12) +
    vineRow(280, 178, 8, 12) +
    acequiaChannel(0, 200, 400) +
    `<g fill="#3f8f4f" opacity=".85"><path d="M180,206c0,-16 12,-22 18,-22c-2,9 -9,18 -18,22z"/><path d="M220,206c0,-14 -10,-19 -16,-19c2,8 8,15 16,19z"/></g>` +
    palm(150, 208, 20) +
    palm(250, 208, 20) +
    gull(160, 40) +
    gull(240, 56),

  /** ラキアカ駅。ベルグラノ線メーターゲージの終点、市の日。 */
  laquiacastation:
    sky("#a8c0d0", "#dde8ec", 106) +
    peak(60, 106, 36) +
    peak(340, 106, 32) +
    ground(106, "#c2a06a") +
    signalBox(200, 178, 50, 30, "#8a6a4c") +
    railTrack(20, 200, 380, 200, 8) +
    marketStall(80, 202, 34, "#e8443f") +
    marketStall(120, 204, 30, "#f5b31c") +
    marketStall(300, 202, 34, "#2f6ea8") +
    marketStall(340, 204, 30, "#3f8f4f") +
    gull(160, 40) +
    gull(240, 56),

  /** モンテビデオ港。深水港、対岸ブエノスアイレスとの張り合い。 */
  montevideoport:
    sky("#8fc4e8", "#cfe4f0", 96) +
    clouds(320, 24, 1) +
    hills(94, "#6f8a52", 4) +
    ground(96, "#8fae63") +
    colonialCottage(60, 150, 34, 30, "#2f6ea8") +
    marketClockTower(110, 150, 34) +
    `<rect x="0" y="176" width="400" height="34" fill="#1f6f96"/>` +
    ripples(190, "#bfe8f4") +
    crane(310, 176, 30, "#e8443f") +
    crane(350, 176, 26, "#e8443f") +
    steamship(260, 176, 0.7) +
    gull(160, 40) +
    gull(240, 56),

  /** コロニア・デル・サクラメントの旧市街。ポルトガル風の低い家、フェリー埠頭。 */
  coloniaquarter:
    sky("#e8a860", "#f5d8a0", 100) +
    sun(340, 34, 18, "#f5b31c") +
    hills(98, "#8a6a4c", 4) +
    ground(100, "#b3946a") +
    portugueseCottage(50, 150, 26, 24) +
    portugueseCottage(80, 150, 22, 22) +
    portugueseCottage(106, 152, 20, 20) +
    portugueseCottage(320, 150, 24, 22) +
    portugueseCottage(348, 152, 20, 20) +
    ruinArch(200, 150, 24) +
    `<g stroke="#c8bda0" stroke-width="2" opacity=".7"><path d="M20,176L80,150M120,176L180,150M230,176L280,152M300,176L340,154"/></g>` +
    `<rect x="0" y="176" width="400" height="34" fill="#2f6f8a"/>` +
    ripples(190, "#e8c890") +
    ripples(200, "#c8a870") +
    `<path d="M160,204L160,192L220,192L228,204z" fill="#e2e8ea"/><rect x="180" y="184" width="20" height="10" fill="#2f6ea8"/>` +
    `<g fill="#8a8478"><rect x="30" y="176" width="6" height="12"/><rect x="368" y="176" width="6" height="12"/></g>` +
    gull(160, 40) +
    gull(240, 56) +
    gull(90, 30),

  /** リベラの見えない国境通り。免税店の並び。 */
  riverastreet:
    sky("#8fc4e8", "#cfe4f0", 106) +
    clouds(90, 22, 0.8) +
    hills(104, "#8fae63", 3) +
    ground(106, "#9aa85c") +
    `<rect x="0" y="176" width="400" height="10" fill="#8a8478"/>` +
    `<g stroke="#f2f6f8" stroke-width="1.4" stroke-dasharray="6 4" opacity=".7"><line x1="0" y1="181" x2="400" y2="181"/></g>` +
    dutyFreeShop(60, 176, 40, 30, "#e8443f") +
    dutyFreeShop(104, 176, 34, 26, "#f5b31c") +
    dutyFreeShop(140, 178, 24, 20, "#3f8f4f") +
    dutyFreeShop(260, 178, 24, 20, "#8b8f98") +
    dutyFreeShop(300, 176, 36, 28, "#2f6ea8") +
    dutyFreeShop(344, 176, 32, 24, "#3f8f4f") +
    `<g stroke="#f2f6f8" stroke-width="1.6" stroke-dasharray="4 3"><line x1="200" y1="186" x2="200" y2="210"/></g>` +
    `<g fill="#e2ddc8" opacity=".7"><rect x="190" y="196" width="4" height="14"/><rect x="206" y="196" width="4" height="14"/></g>` +
    gull(160, 40) +
    gull(240, 56) +
    gull(320, 30) +
    sun(370, 30, 16, "#f5d060"),

  /** フライベントスの食肉工場。コンビーフの棟、対岸への橋。 */
  fraybentosplant:
    sky("#8fc4e8", "#cfe4f0", 96) +
    clouds(200, 24, 0.9) +
    hills(94, "#6f8a52", 4) +
    ground(96, "#8fae63") +
    canneryHall(80, 176, 90, 50) +
    `<g fill="#8b8f98" opacity=".7"><rect x="46" y="186" width="8" height="20"/><rect x="60" y="186" width="8" height="20"/><rect x="90" y="186" width="8" height="20"/><rect x="104" y="186" width="8" height="20"/></g>` +
    `<rect x="30" y="196" width="380" height="4" fill="#c8bda0"/>` +
    `<rect x="0" y="196" width="400" height="14" fill="#3f7f9a"/>` +
    ripples(202, "#bfe8f4") +
    ripples(206, "#5f9fae") +
    `<rect x="0" y="188" width="400" height="6" fill="#8b8f98"/>` +
    bridgePier(220, 194, 208) +
    bridgePier(320, 194, 208) +
    `<rect x="270" y="176" width="30" height="10" fill="#e8443f" opacity=".85"/>` +
    `<g fill="#3f8f4f" opacity=".8"><ellipse cx="360" cy="206" rx="14" ry="4"/><ellipse cx="20" cy="204" rx="12" ry="4"/></g>` +
    gull(160, 40) +
    gull(240, 56) +
    gull(340, 30),

  /** アスンシオン港。「都市の母」の遠征船、最初の鉄道の遺構。 */
  asuncionport:
    sky("#8fc4e8", "#cfe4f0", 96) +
    clouds(90, 24, 1) +
    hills(94, "#6f8a52", 4) +
    ground(96, "#8fae63") +
    marketClockTower(70, 176, 40) +
    `<rect x="30" y="176" width="90" height="6" fill="#c8bda0"/>` +
    signalBox(260, 190, 34, 20, "#8a6a4c") +
    `<line x1="230" y1="200" x2="380" y2="200" stroke="#8b8f98" stroke-width="1.6" stroke-dasharray="3 3" opacity=".6"/>` +
    `<rect x="0" y="196" width="400" height="14" fill="#2f6f8a"/>` +
    ripples(202, "#bfe8f4") +
    expeditionShip(340, 196, 0.9) +
    expeditionShip(300, 200, 0.6) +
    gull(160, 40) +
    gull(240, 56) +
    sun(370, 30, 16, "#f5d060"),

  /** シウダーデルエステ。友好橋のサコレイロス、電化製品バザール。 */
  ciudaddeleste:
    sky("#8fc4e8", "#cfe4f0", 100) +
    hills(98, "#8fae63", 4) +
    ground(100, "#9aa85c") +
    `<rect x="0" y="146" width="400" height="6" fill="#8b8f98"/>` +
    `<rect x="0" y="152" width="400" height="46" fill="#5a7a6e"/>` +
    ripples(166, "#8fbfae") +
    bridgePier(130, 152, 195) +
    bridgePier(270, 152, 195) +
    bagTrader(150, 176, 1) +
    bagTrader(170, 178, 0.9) +
    bagTrader(230, 176, 1) +
    bagTrader(250, 178, 0.9) +
    dutyFreeShop(50, 200, 34, 26, "#e8443f") +
    dutyFreeShop(90, 202, 30, 22, "#f5b31c") +
    dutyFreeShop(310, 200, 32, 24, "#2f6ea8") +
    dutyFreeShop(350, 202, 28, 20, "#3f8f4f") +
    gull(160, 40) +
    gull(240, 56),

  /** コンセプシオン川岸。ケブラチョ・タンニンの蒸気船、未完成の鉄道路盤。 */
  concepcionriver:
    sky("#8fc4e8", "#cfe4f0", 100) +
    clouds(300, 24, 0.9) +
    hills(98, "#8a9a4a", 4) +
    ground(100, "#9aa85c") +
    `<g stroke="#8a8478" stroke-width="6" opacity=".6"><path d="M20,176L120,176"/></g>` +
    `<g fill="#8a6a3c" opacity=".8"><rect x="40" y="168" width="4" height="10"/><rect x="50" y="166" width="4" height="12"/><rect x="60" y="170" width="4" height="8"/></g>` +
    `<rect x="0" y="182" width="400" height="28" fill="#3f7f6a"/>` +
    ripples(194, "#8fbfae") +
    ripples(202, "#5f9f8a") +
    steamship(300, 182, 0.9) +
    `<g fill="#8a6a3c" opacity=".8"><rect x="330" y="176" width="30" height="6"/></g>` +
    `<g fill="#9aa85c" opacity=".85"><path d="M10,210c0,-16 12,-22 18,-22c-2,9 -9,18 -18,22z"/></g>` +
    `<rect x="0" y="160" width="16" height="14" fill="#e2ddc8" opacity=".7"/>` +
    gull(160, 40) +
    gull(240, 56) +
    gull(90, 30) +
    sun(40, 30, 16, "#f5d060"),

  /** イタイプダムとイグアスの滝。フォスドイグアス専用。 */
  itaipufalls:
    sky("#8fc4e8", "#cfe4f0", 92) +
    clouds(80, 24, 1) +
    hills(90, "#3f8f4f", 4) +
    ground(92, "#6f8a52") +
    damWall(90, 176, 130, 60) +
    `<rect x="0" y="176" width="30" height="34" fill="#4f6f9a"/>` +
    waterfallStreak(320, 176, 40) +
    waterfallStreak(332, 176, 44) +
    waterfallStreak(344, 176, 38) +
    `<ellipse cx="332" cy="200" rx="30" ry="8" fill="#e8f4f8" opacity=".7"/>` +
    `<rect x="0" y="196" width="400" height="14" fill="#2f6f8a"/>` +
    ripples(202, "#bfe8f4") +
    flagPole(260, 176, 22, "#3f8f4f") +
    flagPole(280, 176, 20, "#2f6ea8") +
    flagPole(300, 176, 24, "#e8443f") +
    gull(160, 40) +
    gull(240, 56),

  /** ウルグアイアナの二層橋。鉄道と道路、軌間変更の積み替え小屋。 */
  uruguaianabridge:
    sky("#8fc4e8", "#cfe4f0", 100) +
    clouds(200, 22, 0.8) +
    hills(98, "#8fae63", 4) +
    ground(100, "#9aa85c") +
    twoDeckBridgeSpan(20, 150, 380, 150) +
    bridgePier(140, 156, 196) +
    bridgePier(280, 156, 196) +
    `<rect x="0" y="196" width="400" height="14" fill="#3f7f9a"/>` +
    ripples(202, "#bfe8f4") +
    ripples(206, "#5f9fae") +
    signalBox(60, 190, 30, 20, "#8a6a4c") +
    signalBox(340, 190, 30, 20, "#8a6a4c") +
    `<rect x="66" y="184" width="18" height="8" fill="#e2ddc8" opacity=".7"/>` +
    `<rect x="346" y="184" width="18" height="8" fill="#e2ddc8" opacity=".7"/>` +
    `<g fill="#3f8f4f" opacity=".8"><ellipse cx="20" cy="206" rx="12" ry="4"/><ellipse cx="380" cy="204" rx="10" ry="4"/></g>` +
    gull(160, 40) +
    gull(240, 56) +
    gull(320, 30) +
    sun(370, 30, 16, "#f5d060"),

  /** アマゾン河口。ベレンが面するパラー水路と、対岸に見えるマラジョ島。2026-08-14追加。 */
  amazonmouth:
    sky("#8fc4e8", "#cfe4f0", 98) +
    clouds(120, 20, 0.9) +
    hills(96, "#3f8f4f", 4) +
    jungleCanopy(30, 108, 24, "#2f6b3a") +
    jungleCanopy(60, 104, 18, "#3f8f4f") +
    jungleCanopy(370, 106, 22, "#2f6b3a") +
    jungleCanopy(390, 104, 16, "#3f8f4f") +
    ground(98, "#8fae63") +
    riverMeeting(150, "#3f7f9a", "#2f5f7a") +
    ripples(164, "#8fbfd4") +
    ripples(180, "#5f8fae") +
    ripples(196, "#4f7f9a") +
    stiltHouse(58, 176, 26, 30) +
    stiltHouse(90, 178, 22, 26) +
    steamship(120, 168, 0.75) +
    dugoutCanoe(300, 190, 0.9) +
    waterBuffalo(340, 200, 1) +
    waterBuffalo(362, 202, 0.8) +
    `<g fill="#3f8f4f" opacity=".8"><ellipse cx="40" cy="206" rx="14" ry="5"/><ellipse cx="320" cy="206" rx="12" ry="4"/></g>` +
    gull(160, 38) +
    gull(240, 50) +
    gull(120, 30) +
    gull(280, 44),
};

export const SOUTHAMERICA_BG = { ...SOUTHAMERICA_BASE_BG };

// ---------------------------------------------------------------------------
// 都市シンボル(8種、サンプル分)。鍵は cities.mjs の `mark` と対応。24×24。
// ---------------------------------------------------------------------------

export const SOUTHAMERICA_MARKS = {
  /** トトラ葦舟。プーノ専用。 */
  reedboat:
    `<path d="M2,17Q9,22 14,17Q19,10 16,6Q13,13 2,17z" fill="#c8b458"/>` +
    `<path d="M3,17h13" stroke="#a89438" stroke-width="1.4" fill="none"/>` +
    `<rect x="16" y="12" width="1.6" height="6" fill="#a89438"/>`,

  /** 砂漠と鉄路。アリカ専用。 */
  desertrail:
    `<path d="M2,20L2,12L9,4z" fill="#b3946a"/>` +
    `<line x1="3" y1="21" x2="21" y2="9" stroke="#8b8f98" stroke-width="1.6"/>` +
    `<g stroke="#6b5330" stroke-width="1.4"><line x1="6" y1="18.5" x2="9" y2="17" /><line x1="10.5" y1="16" x2="13.5" y2="14.5"/><line x1="15" y1="13.5" x2="18" y2="12"/></g>`,

  /** 密林とハイウェイの終わり。ヤビサ専用。 */
  junglehighway:
    `<circle cx="7" cy="9" r="6" fill="#2f6b3a"/>` +
    `<rect x="2" y="18" width="20" height="4" fill="#7a7468"/>` +
    `<g stroke="#e8ded0" stroke-width="1.4" stroke-dasharray="3 2"><line x1="2" y1="20" x2="22" y2="20"/></g>` +
    `<rect x="19" y="10" width="2" height="8" fill="#6b5330"/><rect x="15" y="6" width="8" height="5" fill="#e8443f"/>`,

  /** 川渡しの橋。エンカルナシオン専用。 */
  riverferry:
    `<rect x="0" y="15" width="24" height="3" fill="#8b8f98"/>` +
    `<rect x="6" y="18" width="2" height="4" fill="#8b8f98"/><rect x="16" y="18" width="2" height="4" fill="#8b8f98"/>` +
    `<path d="M4,22L4,17L14,17L16,22z" fill="#e8ded0"/><rect x="7" y="12" width="6" height="4" fill="#2f6ea8"/>`,

  /** 世界の果ての鉄道。ウスアイア専用。 */
  endworldtrain:
    `<rect x="2" y="12" width="12" height="7" fill="#2f6ea8"/>` +
    `<circle cx="5" cy="19" r="2" fill="#3a3f46"/><circle cx="11" cy="19" r="2" fill="#3a3f46"/>` +
    `<rect x="14" y="7" width="3" height="12" fill="#c8443a"/>` +
    `<ellipse cx="15" cy="5" rx="4" ry="2.4" fill="#dfe4e8" opacity=".85"/>`,

  /** 海堤の水門。ジョージタウン専用。 */
  seawall:
    `<rect x="1" y="16" width="22" height="5" fill="#7a7468"/>` +
    `<rect x="9" y="6" width="6" height="15" fill="#8b8f98"/>` +
    `<rect x="10" y="12" width="4" height="9" fill="#3a3f46"/>` +
    `<rect x="6" y="4" width="12" height="3" fill="#5a5f52"/>`,

  /** モスクとシナゴーグ。パラマリボ専用。 */
  indenturerail:
    `<circle cx="7" cy="14" r="6" fill="#3f8f6a"/><rect x="2" y="14" width="10" height="6" fill="#e2ddc8"/>` +
    `<path d="M16,20L19,13L22,20z" fill="#f2f6f8"/>` +
    `<path d="M17.5,10l1.5,-2.4l1.5,2.4z" fill="#c8a838"/>`,

  /** 発射台のロケット。クールー専用。 */
  rocket:
    `<rect x="10" y="6" width="4" height="13" fill="#f2f6f8"/>` +
    `<path d="M10,6L12,2L14,6z" fill="#c8443a"/>` +
    `<rect x="10" y="12" width="4" height="3" fill="#2f6ea8"/>` +
    `<rect x="18" y="4" width="2" height="16" fill="#8b8f98"/>` +
    `<rect x="4" y="19" width="16" height="2.4" fill="#5a5f52"/>`,

  /** 天然の石橋。イパレス専用。 */
  stonebridge:
    `<path d="M2,20Q12,6 22,20" fill="none" stroke="#8b8f98" stroke-width="5"/>` +
    `<rect x="1" y="18" width="4" height="5" fill="#7a7a72"/><rect x="19" y="18" width="4" height="5" fill="#7a7a72"/>`,

  /** 崖のスイッチバック。アラウシ専用。 */
  cliffzigzag:
    `<path d="M2,22L2,12L12,12z" fill="#8b8f98"/>` +
    `<path d="M2,20L10,20L10,14L18,14L18,7" fill="none" stroke="#6b5330" stroke-width="1.6"/>`,

  /** 植木細工の墓地。トゥルカン専用。 */
  topiaryhedge:
    `<path d="M4,22V12Q12,4 20,12V22z" fill="#2f6b3a"/>` +
    `<path d="M8,22V14Q12,9 16,14V22z" fill="#a8c4b0"/>`,

  /** 橋の市場。ワキジャス専用。 */
  peacebridge:
    `<rect x="1" y="14" width="22" height="3" fill="#8b8f98"/>` +
    `<rect x="5" y="17" width="2" height="5" fill="#8b8f98"/><rect x="17" y="17" width="2" height="5" fill="#8b8f98"/>` +
    `<path d="M9,13h6v-5h-6z" fill="#e8443f"/>`,

  /** 山頂へのスイッチバック。リマ専用。 */
  summitswitchback:
    `<path d="M2,20L2,10L10,10z" fill="#8b8f98"/>` +
    `<path d="M2,18L8,18L8,12L16,12L16,5" fill="none" stroke="#6b5330" stroke-width="1.6"/>` +
    `<circle cx="19" cy="4" r="2.6" fill="#f2f6f8"/>`,

  /** インカ道の標石。クスコ専用。 */
  incaroad:
    `<rect x="10" y="4" width="4" height="16" fill="#9a9488"/>` +
    `<path d="M2,20h20v2h-20z" fill="#7a7468"/>` +
    `<path d="M6,20L18,20L15,10L9,10z" fill="#8b8f98"/>`,

  /** 最古級の国際鉄道。タクナ専用。 */
  oldestrail:
    `<line x1="2" y1="21" x2="22" y2="21" stroke="#8b8f98" stroke-width="2"/>` +
    `<g stroke="#6b5330" stroke-width="1.4"><line x1="5" y1="19.5" x2="5" y2="22.5"/><line x1="10" y1="19.5" x2="10" y2="22.5"/><line x1="15" y1="19.5" x2="15" y2="22.5"/><line x1="20" y1="19.5" x2="20" y2="22.5"/></g>` +
    `<rect x="4" y="10" width="10" height="8" fill="#a8743c"/>`,

  /** 乾いた谷の歩道橋。ビジャソン専用。 */
  gullybridge:
    `<path d="M2,20Q12,10 22,20" fill="none" stroke="#c8bda0" stroke-width="4"/>` +
    `<path d="M6,22L10,14L14,14L18,22z" fill="#c2a06a" opacity=".7"/>`,

  /** 三路線の分岐。ビアチャ専用。 */
  triplejunction:
    `<g stroke="#8b8f98" stroke-width="1.6"><line x1="2" y1="20" x2="22" y2="8"/><line x1="2" y1="20" x2="22" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></g>` +
    `<circle cx="4" cy="19" r="2.4" fill="#8a6a4c"/>`,

  /** 静かな国境税関。チャラーニャ専用。 */
  quietcustoms:
    `<rect x="4" y="10" width="16" height="10" fill="#8a6a4c"/>` +
    `<rect x="7" y="13" width="10" height="5" fill="#dfe4e8" opacity=".6"/>` +
    `<line x1="2" y1="20" x2="22" y2="20" stroke="#8b8f98" stroke-width="1.6"/>`,

  /** バナナの積出港。グアヤキル専用。 */
  bananadock:
    `<path d="M6,20q-4,-2 -2,-8q5,-1 5,7z" fill="#e8d048"/>` +
    `<rect x="14" y="6" width="2" height="14" fill="#8b8f98"/><rect x="14" y="6" width="7" height="2" fill="#8b8f98"/>` +
    `<line x1="19" y1="8" x2="19" y2="14" stroke="#3a3f46" stroke-width="1.4"/>`,

  /** 銅精鉱の貨車。アントファガスタ専用。 */
  nitraterail:
    `<rect x="3" y="10" width="16" height="7" fill="#8b5a3c"/>` +
    `<circle cx="7" cy="19" r="2.4" fill="#3a3f46"/><circle cx="15" cy="19" r="2.4" fill="#3a3f46"/>` +
    `<rect x="4" y="8" width="14" height="2" fill="#c8a878"/>`,

  /** フニクラとトンネルの坑口。バルパライソ専用。 */
  summittunnel:
    `<path d="M4,20a8,6 0 0 1 16,0z" fill="#5a5f52"/><rect x="2" y="20" width="20" height="2" fill="#3a3f46"/>` +
    `<line x1="6" y1="18" x2="17" y2="7" stroke="#8b8f98" stroke-width="1.6"/>` +
    `<rect x="9.5" y="10.5" width="5" height="4" fill="#c8443a" transform="rotate(-45 12 12)"/>`,

  /** 石炭補給と羊。プンタアレナス専用。 */
  coalingport:
    `<path d="M2,20L2,12L18,12L18,20z" fill="#3a3f46"/>` +
    `<rect x="16" y="6" width="2" height="8" fill="#8b8f98"/>` +
    `<ellipse cx="20" cy="19" rx="3" ry="2.2" fill="#f2f6f8"/>`,

  /** コーヒーを運ぶ索道。ボゴタ専用。 */
  hillcable:
    `<line x1="2" y1="18" x2="22" y2="6" stroke="#5a5f52" stroke-width="1.4"/>` +
    `<rect x="8" y="13" width="6" height="4" fill="#2f6ea8"/><rect x="15" y="9" width="6" height="4" fill="#2f6ea8"/>` +
    `<path d="M2,22h20v-2h-20z" fill="#6f8a52"/>`,

  /** メトロカブレのゴンドラ。メデジン専用。 */
  cablecar:
    `<path d="M2,22C2,10 22,10 22,22z" fill="#3f8f4f"/>` +
    `<line x1="4" y1="18" x2="19" y2="8" stroke="#5a5f52" stroke-width="1.2"/>` +
    `<rect x="10" y="11" width="6" height="4" fill="#2f6ea8"/>`,

  /** 国境橋を渡る人々。サンアントニオ・デル・タチラ専用。 */
  borderbridge:
    `<rect x="1" y="15" width="22" height="3" fill="#8b8f98"/>` +
    `<rect x="6" y="18" width="2" height="4" fill="#8b8f98"/><rect x="16" y="18" width="2" height="4" fill="#8b8f98"/>` +
    `<circle cx="9" cy="12" r="2.4" fill="#e2ddc8"/><line x1="9" y1="14" x2="9" y2="15" stroke="#3a3f46" stroke-width="1.6"/>` +
    `<circle cx="15" cy="11" r="2.4" fill="#e2ddc8"/><line x1="15" y1="13" x2="15" y2="15" stroke="#3a3f46" stroke-width="1.6"/>`,

  /** ボーキサイト鉄道。リンデン専用。 */
  bauxiterail:
    `<rect x="2" y="10" width="14" height="6" fill="#8b5a3c"/>` +
    `<circle cx="6" cy="17" r="2" fill="#3a3f46"/><circle cx="14" cy="17" r="2" fill="#3a3f46"/>` +
    `<line x1="16" y1="13" x2="22" y2="13" stroke="#8b8f98" stroke-width="1.6"/>`,

  /** 稲田とフェリー。ニウニッケリー専用。 */
  riceferry:
    `<g stroke="#7fae6a" stroke-width="1.6"><line x1="2" y1="6" x2="10" y2="6"/><line x1="2" y1="9" x2="10" y2="9"/></g>` +
    `<path d="M4,20L4,15L18,15L20,20z" fill="#e8ded0"/><rect x="9" y="10" width="8" height="5" fill="#2f6ea8"/>`,

  /** 石造りの流刑地。サンローラン・デュ・マロニ専用。 */
  bagnestone:
    `<rect x="3" y="10" width="18" height="10" fill="#9a9488"/>` +
    `<g fill="#2a2a2e"><rect x="6" y="13" width="3" height="4"/><rect x="11" y="13" width="3" height="4"/><rect x="16" y="13" width="3" height="4"/></g>`,

  /** 国境の無い通り。レティシア専用。 */
  borderlessriver:
    `<rect x="2" y="16" width="20" height="3" fill="#c8bda0"/>` +
    `<path d="M6,16L4,10h6l-2,6z" fill="#e8443f"/><path d="M14,16L12,11h6l-2,5z" fill="#2f6ea8"/>`,

  /** オリノコとアマゾンをつなぐ運河。サンカルロス・デ・リオネグロ専用。 */
  twinoceanriver:
    `<rect x="0" y="14" width="11" height="8" fill="#3f7f9a"/><rect x="11" y="14" width="13" height="8" fill="#4f6f4a"/>` +
    `<path d="M2,14Q12,6 22,14" fill="none" stroke="#2f6b3a" stroke-width="2"/>`,

  /** 軌間の変わる操車場。コルンバ専用。 */
  gaugebreak:
    `<rect x="2" y="12" width="12" height="6" fill="#8b5a3c"/>` +
    `<line x1="2" y1="19" x2="14" y2="19" stroke="#8b8f98" stroke-width="1.6"/>` +
    `<line x1="16" y1="19" x2="22" y2="19" stroke="#8b8f98" stroke-width="2.4"/>`,

  /** 三国境の川岸展望。タバチンガ専用。 */
  triborderview:
    `<rect x="10" y="8" width="2" height="10" fill="#8a8478"/><rect x="11" y="8" width="8" height="6" fill="#3f8f4f"/>` +
    `<rect x="2" y="10" width="2" height="8" fill="#8a8478"/><rect x="3" y="10" width="6" height="5" fill="#2f6ea8"/>` +
    `<rect x="1" y="19" width="22" height="3" fill="#3f7f9a"/>`,

  /** 軌間変更の積み替えクレーン。プエルトスアレス専用。 */
  gaugecrane:
    `<rect x="10" y="6" width="4" height="14" fill="#8b8f98"/><rect x="4" y="5" width="16" height="3" fill="#5a5f52"/>` +
    `<line x1="12" y1="8" x2="12" y2="16" stroke="#3a3f46" stroke-width="1.6"/>` +
    `<line x1="2" y1="21" x2="22" y2="21" stroke="#8b8f98" stroke-width="1.6"/>`,

  /** 扇形鉄道網の起点駅。ブエノスアイレス専用。 */
  fanrailway:
    `<rect x="4" y="10" width="16" height="10" fill="#c8a878"/><circle cx="12" cy="7" r="3" fill="#f2f6f8"/>` +
    `<g stroke="#8b8f98" stroke-width="1.2"><line x1="12" y1="20" x2="2" y2="24"/><line x1="12" y1="20" x2="12" y2="24"/><line x1="12" y1="20" x2="22" y2="24"/></g>`,

  /** アセキア水路とブドウ畑。メンドーサ専用。 */
  acequiavine:
    `<line x1="2" y1="20" x2="22" y2="20" stroke="#5f8fae" stroke-width="2.4"/>` +
    `<g fill="#5f8a4a"><circle cx="6" cy="14" r="3"/><circle cx="12" cy="13" r="3"/><circle cx="18" cy="14" r="3"/></g>`,

  /** ベルグラノ線の終点。ラキアカ専用。 */
  narrowgaugeend:
    `<line x1="2" y1="20" x2="22" y2="20" stroke="#8b8f98" stroke-width="2"/>` +
    `<g stroke="#6b5330" stroke-width="1.4"><line x1="5" y1="19" x2="5" y2="22"/><line x1="10" y1="19" x2="10" y2="22"/><line x1="15" y1="19" x2="15" y2="22"/></g>` +
    `<rect x="15" y="9" width="7" height="10" fill="#8a6a4c"/>`,

  /** 深水港と対岸との張り合い。モンテビデオ専用。 */
  bufferharbor:
    `<path d="M2,20L2,10L18,10L18,20z" fill="#e2ddc8"/><rect x="8" y="4" width="4" height="6" fill="#3a3f46"/>` +
    `<line x1="2" y1="21" x2="22" y2="21" stroke="#1f6f96" stroke-width="3"/>`,

  /** ポルトガル風の密貿易街区。コロニア・デル・サクラメント専用。 */
  smugglerquarter:
    `<rect x="3" y="12" width="10" height="9" fill="#f2f6f8"/><path d="M2,12h12v-4h-12z" fill="#c8443a"/>` +
    `<rect x="15" y="14" width="8" height="7" fill="#e2ddc8"/>`,

  /** 見えない国境の免税店。リベラ専用。 */
  invisibleborder:
    `<rect x="2" y="10" width="9" height="11" fill="#e8443f"/><rect x="13" y="10" width="9" height="11" fill="#2f6ea8"/>` +
    `<line x1="12" y1="8" x2="12" y2="22" stroke="#f2f6f8" stroke-width="1.6" stroke-dasharray="2 2"/>`,

  /** コンビーフ工場の煙突。フライベントス専用。 */
  cannedbeef:
    `<rect x="2" y="12" width="16" height="9" fill="#8a8478"/>` +
    `<rect x="4" y="4" width="4" height="10" fill="#6b5330"/><circle cx="6" cy="3" r="2.6" fill="#c8bda0" opacity=".7"/>`,

  /** 「都市の母」の遠征船。アスンシオン専用。 */
  motherexpedition:
    `<path d="M2,18L5,22L19,22L17,18z" fill="#8a6a3c"/>` +
    `<line x1="12" y1="18" x2="12" y2="4" stroke="#6b5330" stroke-width="1.4"/>` +
    `<path d="M12,5L12,15L20,11z" fill="#e2ddc8"/>`,

  /** 友好橋の袋商人。シウダーデルエステ専用。 */
  friendshipbridge:
    `<rect x="1" y="15" width="22" height="3" fill="#8b8f98"/>` +
    `<rect x="6" y="18" width="2" height="4" fill="#8b8f98"/><rect x="16" y="18" width="2" height="4" fill="#8b8f98"/>` +
    `<circle cx="12" cy="9" r="2.6" fill="#e2ddc8"/><circle cx="16" cy="12" r="4" fill="#c8bda0"/>`,

  /** ケブラチョ・タンニンの蒸気船。コンセプシオン専用。 */
  tanninsteamer:
    `<path d="M2,18L2,12L14,12L14,18z" fill="#3a3f46"/>` +
    `<rect x="11" y="5" width="3" height="10" fill="#c8443a"/>` +
    `<line x1="1" y1="21" x2="23" y2="21" stroke="#3f7f9a" stroke-width="2.4"/>`,

  /** イタイプダムと折半の電力。フォスドイグアス専用。 */
  sharedmegadam:
    `<rect x="2" y="6" width="20" height="12" fill="#c8bda0"/>` +
    `<g fill="#3a3f46" opacity=".6"><rect x="6" y="9" width="3" height="9"/><rect x="12" y="9" width="3" height="9"/><rect x="18" y="9" width="3" height="9"/></g>` +
    `<line x1="1" y1="21" x2="23" y2="21" stroke="#2f6f8a" stroke-width="2.4"/>`,

  /** 二層橋。ウルグアイアナ専用。 */
  twodeckbridge:
    `<line x1="2" y1="10" x2="22" y2="10" stroke="#8b8f98" stroke-width="3"/>` +
    `<line x1="2" y1="15" x2="22" y2="15" stroke="#5a5f52" stroke-width="2"/>` +
    `<line x1="6" y1="10" x2="6" y2="20" stroke="#3a3f46" stroke-width="1.4"/><line x1="18" y1="10" x2="18" y2="20" stroke="#3a3f46" stroke-width="1.4"/>`,

  /** アマゾン河口。マラジョ島が水路を二つに分ける。ベレン専用(2026-08-14追加)。 */
  riverexit:
    `<rect x="0" y="6" width="9" height="16" fill="#3f7f9a"/>` +
    `<path d="M9,6L9,22L15,22L13,6z" fill="#2f6b3a"/>` +
    `<rect x="13" y="6" width="6" height="16" fill="#2f5f7a"/>` +
    `<rect x="19" y="6" width="5" height="16" fill="#16324f"/>`,
};
