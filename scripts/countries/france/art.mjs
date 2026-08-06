/**
 * フランスの都市イラスト。
 *
 * `marks` は 24×24 の座標系に描くシンボル、`bg` は 400×210 の座標系に描く
 * 背景シーン(いずれもSVG断片の文字列)。インドと同じく最初から文字列として
 * 持つ。動きは含めない(アニメーションはReact側で重ねる)。
 *
 * 色はインドと揃える。空 #8fc4e8〜、地面 #2f4a33/#c9a877、顔 #f6efe2、
 * 強調 #f5b31c/#e8443f/#5b8fe8。フランスらしさは石灰岩の #dfd8c8、
 * スレート屋根の #4a5568、葡萄の #6b4a7a、ラベンダーの #8a7ab8 で出す。
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

/** 空(グラデーション代わりに2枚重ねる)。 */
function sky(top, bottom) {
  return band(0, 84, top) + band(78, 40, bottom);
}

function sun(cx, cy, r, fill = "#f5b31c") {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>`;
}

function clouds(cx, cy, scale = 1) {
  const e = (dx, rx, ry) =>
    `<ellipse cx="${r1(cx + dx * scale)}" cy="${cy}" rx="${r1(rx * scale)}" ry="${r1(ry * scale)}"/>`;
  return `<g opacity=".8" fill="#f6efe2">${e(0, 18, 7)}${e(-10, 11, 5.5)}${e(11, 13, 5.5)}</g>`;
}

/** 地面。 */
function ground(y, fill) {
  return `<rect x="0" y="${y}" width="${W}" height="${210 - y}" fill="${fill}"/>`;
}

/** 遠景の丘の連なり。 */
function hills(y, fill, count = 4) {
  const parts = [];
  for (let i = 0; i < count; i++) {
    const cx = 40 + (i * W) / count;
    parts.push(`<path d="M${cx - 70},${y}c20,-34 50,-34 70,0z" fill="${fill}"/>`);
  }
  return `<g opacity=".9">${parts.join("")}</g>`;
}

/** 水面の反射線。 */
function ripples(y, color = "#bfe8f4") {
  return `<g stroke="${color}" stroke-width="2" opacity=".7" fill="none"><path d="M30,${y}h70M180,${y + 12}h90M110,${y + 24}h64"/></g>`;
}

/** 丸い樹冠の木(プラタナス・りんご・並木)。 */
function roundTree(x, base, r, crown = "#3f8f4f", trunk = "#6b5330") {
  const th = r1(r * 1.2);
  return (
    `<rect x="${r1(x - r * 0.16)}" y="${r1(base - th - r * 0.3)}" width="${r1(r * 0.32)}" height="${r1(th + r * 0.3)}" fill="${trunk}"/>` +
    `<circle cx="${x}" cy="${r1(base - th - r * 0.55)}" r="${r}" fill="${crown}"/>`
  );
}

/** 糸杉(プロヴァンス)。 */
function cypress(x, base, h) {
  const b = r1(h * 0.13);
  return `<path d="M${x},${r1(base - h)}c${b},${r1(h * 0.3)} ${b},${r1(h * 0.7)} 0,${h}c${-b},${r1(-h * 0.3)} ${-b},${r1(-h * 0.7)} 0,${-h}z" fill="#2f5f3f"/>`;
}

/** 樅(アルプス・ピレネー)。段になった輪郭にする。 */
function fir(x, base, h, fill = "#2f5f3f") {
  const w = r1(h * 0.52);
  return (
    `<rect x="${r1(x - 1.6)}" y="${r1(base - 5)}" width="3.2" height="5" fill="#5a4630"/>` +
    `<path d="M${r1(x - w / 2)},${r1(base - 3)}L${x},${r1(base - h)}L${r1(x + w / 2)},${r1(base - 3)}z" fill="${fill}"/>` +
    `<path d="M${r1(x - w / 2.6)},${r1(base - h * 0.42)}L${x},${r1(base - h * 0.9)}L${r1(x + w / 2.6)},${r1(base - h * 0.42)}z" fill="${fill}"/>`
  );
}

/** 雪冠(峰の頂に載せる、裾が波打つ白)。 */
function snowCap(ax, ay, lx, rx, by) {
  const half = r1((lx - rx) / 2);
  const q = r1((lx - rx) / 4);
  return `<path d="M${ax},${ay}L${rx},${by}q${q},-6 ${half},0q${q},6 ${half},0z" fill="#f8fbfd"/>`;
}

/** オスマン様式の街区(石の壁・スレートのマンサール屋根・鉄の手すり)。 */
function haussmann(x, top, w) {
  const base = 152;
  const parts = [
    `<rect x="${x}" y="${top}" width="${w}" height="${base - top}" fill="#dfd8c8"/>`,
    `<path d="M${x - 4},${top}h${w + 8}l-8,-16h${-(w - 8)}z" fill="#4a5568"/>`,
    `<rect x="${x - 4}" y="${top}" width="${w + 8}" height="3" fill="#3a4453"/>`,
    `<rect x="${x - 5}" y="${top - 17}" width="${w + 10}" height="2" fill="#3a4453"/>`,
  ];
  const cols = Math.max(2, Math.floor((w - 8) / 20));
  for (let ry = top + 9; ry <= base - 30; ry += 18) {
    for (let i = 0; i < cols; i++) {
      const wx = r1(x + 7 + (i * (w - 23)) / (cols - 1));
      parts.push(`<rect x="${wx}" y="${ry}" width="9" height="12" fill="#7f97ad"/>`);
    }
    parts.push(`<rect x="${x + 2}" y="${ry + 13}" width="${w - 4}" height="2" fill="#3a4453" opacity=".75"/>`);
  }
  // 一階の店舗
  parts.push(
    `<rect x="${x}" y="${base - 16}" width="${w}" height="16" fill="#c9c0ac"/>`,
    `<rect x="${x + 4}" y="${base - 12}" width="${w - 8}" height="12" fill="#5f6b52"/>`,
  );
  return parts.join("");
}

/** 木組みの家(コルマール・ルーアン)。 */
function timberHouse(x, top, w, base, wall, roof) {
  const h = base - top;
  const cx = r1(x + w / 2);
  const beam = r1(top + h * 0.46);
  const parts = [
    `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="${wall}"/>`,
    `<path d="M${x - 7},${top}L${cx},${r1(top - h * 0.42)}L${x + w + 7},${top}z" fill="${roof}"/>`,
    `<rect x="${x - 7}" y="${top}" width="${w + 14}" height="4" fill="#5a4630"/>`,
    `<g fill="#6b4a30"><rect x="${x + 2}" y="${top}" width="4" height="${h}"/><rect x="${r1(cx - 2)}" y="${top}" width="4" height="${h}"/><rect x="${x + w - 6}" y="${top}" width="4" height="${h}"/><rect x="${x}" y="${beam}" width="${w}" height="4"/></g>`,
    `<g stroke="#6b4a30" stroke-width="3.4" fill="none"><path d="M${x + 4},${beam}L${cx},${top + 6}M${x + w - 4},${beam}L${cx},${top + 6}"/></g>`,
    `<rect x="${r1(cx - 4)}" y="${r1(top - h * 0.24)}" width="8" height="9" fill="#5f7f96"/>`,
  ];
  const wy = r1(beam + 12);
  for (const wx of [r1(x + w * 0.27 - 5), r1(x + w * 0.73 - 5)]) {
    parts.push(
      `<g fill="#c2453c"><rect x="${r1(wx - 4.5)}" y="${wy}" width="4.5" height="14"/><rect x="${r1(wx + 10)}" y="${wy}" width="4.5" height="14"/></g>`,
      `<rect x="${wx}" y="${wy}" width="10" height="14" fill="#5f7f96"/>`,
      `<rect x="${r1(wx - 5)}" y="${r1(wy + 14)}" width="20" height="3" fill="#6b4a30"/>`,
      `<g fill="#e8443f"><circle cx="${wx}" cy="${r1(wy + 14)}" r="2"/><circle cx="${r1(wx + 5)}" cy="${r1(wy + 15)}" r="2.2"/><circle cx="${r1(wx + 10)}" cy="${r1(wy + 14)}" r="2"/></g>`,
    );
  }
  return parts.join("");
}

/** 葡萄の畝(支柱・針金・垣根仕立ての樹冠)。 */
function vineRow(y, count, r, grapes = false) {
  const cy = r1(y - r - 2);
  const hw = r1(r * 2.2);
  const parts = [`<path d="M4,${cy}h392" stroke="#8a8578" stroke-width="1.4" fill="none"/>`];
  for (let i = 0; i < count; i++) {
    const x = r1(14 + (i * 372) / (count - 1));
    parts.push(
      `<rect x="${r1(x - 1.2)}" y="${r1(cy - r * 0.2)}" width="2.4" height="${r1(y - cy + r * 0.2)}" fill="#6b5330"/>`,
      `<path d="M${r1(x - hw)},${cy}c0,${r1(-r * 1.4)} ${r1(hw * 2)},${r1(-r * 1.4)} ${r1(hw * 2)},0c${r1(-hw * 0.4)},${r1(r * 0.55)} ${r1(-hw * 1.6)},${r1(r * 0.55)} ${r1(-hw * 2)},0z" fill="#4f8f3f"/>`,
    );
    if (grapes && i % 2 === 0) {
      const g = r1(r * 0.32);
      const gy = r1(cy + r * 0.55);
      parts.push(
        `<g fill="#6b4a7a"><circle cx="${r1(x - g)}" cy="${gy}" r="${g}"/><circle cx="${r1(x + g)}" cy="${gy}" r="${g}"/><circle cx="${x}" cy="${r1(gy + g * 1.5)}" r="${g}"/></g>`,
      );
    }
  }
  return parts.join("");
}

/** 段畑の擁壁(石の目地と影をつけて段差を見せる)。 */
function terraceWall(y, h) {
  const step = Math.round(h * 2.4);
  const joints = [];
  for (let x = step / 2; x < W; x += step) joints.push(`M${r1(x)},${y}v${h - 2}`);
  return (
    `<rect x="0" y="${y}" width="${W}" height="${h}" fill="#cfc7b4"/>` +
    `<rect x="0" y="${y}" width="${W}" height="1.6" fill="#e0dbcd"/>` +
    `<rect x="0" y="${y + h - 2}" width="${W}" height="2" fill="#a2977f"/>` +
    `<g stroke="#b8ae98" stroke-width="1.4" fill="none"><path d="${joints.join("")}"/></g>`
  );
}

/** 生垣(ボカージュ)。上端がこぶになった濃い緑の帯。 */
function hedge(y, h = 10, fill = "#2f6b3a") {
  let d = `M0,${y}`;
  for (let i = 0; i < 15; i++) d += `q14,-${h} 28,0`;
  return `<path d="${d}v${h + 6}H0z" fill="${fill}"/>`;
}

/** りんごの木(ノルマンディ)。 */
function appleTree(x, base, r) {
  return (
    `<rect x="${x - 3}" y="${r1(base - r - 6)}" width="6" height="${r1(r + 6)}" fill="#6b5330"/>` +
    `<circle cx="${x}" cy="${r1(base - r * 1.9)}" r="${r}" fill="#3f8f4f"/>` +
    `<g fill="#e8443f"><circle cx="${r1(x - r * 0.45)}" cy="${r1(base - r * 2.2)}" r="2.4"/><circle cx="${r1(x + r * 0.5)}" cy="${r1(base - r * 1.8)}" r="2.4"/><circle cx="${x}" cy="${r1(base - r * 2.6)}" r="2.4"/><circle cx="${r1(x - r * 0.5)}" cy="${r1(base - r * 1.4)}" r="2.2"/></g>`
  );
}

/** 羊(ピレネーの牧草地)。 */
function sheep(x, y, s = 1) {
  const e = (dx, dy, rx, ry) =>
    `<ellipse cx="${r1(x + dx * s)}" cy="${r1(y + dy * s)}" rx="${r1(rx * s)}" ry="${r1(ry * s)}"/>`;
  return (
    `<g fill="#f6efe2">${e(0, 0, 11, 7)}${e(-7, -4, 5, 4)}${e(5, -5, 5, 4)}</g>` +
    `<g fill="#4a4436">${e(11, -3, 4, 3.4)}<rect x="${r1(x - 6 * s)}" y="${r1(y + 5 * s)}" width="${r1(2.2 * s)}" height="${r1(6 * s)}"/><rect x="${r1(x + 4 * s)}" y="${r1(y + 5 * s)}" width="${r1(2.2 * s)}" height="${r1(6 * s)}"/></g>`
  );
}

/** 縞のパラソル(リヴィエラ)。扇形を交互に塗る。 */
function parasol(x, base, c) {
  const cy = base - 30;
  const pts = [];
  for (let k = 0; k <= 6; k++) {
    const a = Math.PI + (k * Math.PI) / 6;
    pts.push([r1(x + 26 * Math.cos(a)), r1(cy + 16 * Math.sin(a))]);
  }
  const secs = [];
  for (let k = 0; k < 6; k++) {
    secs.push(
      `<path d="M${x},${cy}L${pts[k][0]},${pts[k][1]}A26,16 0 0 1 ${pts[k + 1][0]},${pts[k + 1][1]}z" fill="${k % 2 ? "#f6efe2" : c}"/>`,
    );
  }
  return `<rect x="${x - 1}" y="${cy}" width="2" height="30" fill="#8a8578"/>` + secs.join("");
}

/** 笠松(海岸松)。細い幹の上に平たい樹冠。 */
function parasolPine(x, base, h) {
  const top = r1(base - h);
  return (
    `<path d="M${x - 4},${base}L${x},${top}h5L${x + 4},${base}z" fill="#6b5330"/>` +
    `<g fill="#3f7f4a"><ellipse cx="${r1(x + 2)}" cy="${r1(top - 4)}" rx="26" ry="9"/><ellipse cx="${r1(x - 14)}" cy="${r1(top + 2)}" rx="14" ry="7"/><ellipse cx="${r1(x + 18)}" cy="${r1(top + 2)}" rx="14" ry="7"/></g>`
  );
}

/** ラベンダーの畝(奥の一点に収束する帯)。 */
function lavenderRows(topY, count) {
  const parts = [];
  for (let i = 0; i < count; i++) {
    const f = (i - (count - 1) / 2) / ((count - 1) / 2);
    const xt = r1(200 + f * 58);
    const xb = r1(200 + f * 330);
    parts.push(
      `<path d="M${r1(xt - 4)},${topY}L${r1(xt + 4)},${topY}L${r1(xb + 26)},210L${r1(xb - 26)},210z" fill="#8a7ab8"/>`,
      `<path d="M${r1(xt + 1.5)},${topY}L${r1(xt + 4)},${topY}L${r1(xb + 26)},210L${r1(xb + 14)},210z" fill="#6f5f9c" opacity=".65"/>`,
    );
  }
  return parts.join("");
}

// ---------------------------------------------------------------------------
// 背景シーン(400×210)
// ---------------------------------------------------------------------------

export const FRANCE_BG = {
  /** パリ。石造りの街区が同じ高さで並び、その先に鉄塔。 */
  capital:
    sky("#8fc4e8", "#cfe4f0") +
    band(116, 40, "#cfe4f0") +
    clouds(72, 30) +
    clouds(232, 22, 0.8) +
    // 鉄塔
    `<g fill="#8a7f66">` +
    `<path d="M298,30h4l2,26h-8z"/>` +
    `<path d="M293,60h14l6,42h-26z"/>` +
    `<path d="M282,107h9l-5,45h-13c2,-18 5,-33 9,-45z"/>` +
    `<path d="M318,107h-9l5,45h13c-2,-18 -5,-33 -9,-45z"/>` +
    `</g>` +
    `<g fill="#6b6250"><rect x="291" y="56" width="18" height="4"/><rect x="282" y="102" width="36" height="5"/><circle cx="300" cy="27" r="2.4"/></g>` +
    `<g stroke="#6b6250" stroke-width="1.2" opacity=".7" fill="none"><path d="M294,66h12M292,80h16M290,94h20M285,118h30M283,132h34"/></g>` +
    // オスマン様式の街区
    haussmann(0, 96, 90) +
    haussmann(94, 88, 76) +
    haussmann(174, 100, 74) +
    haussmann(344, 104, 60) +
    // カフェの日除け
    `<path d="M8,136h52l-4,-10H12z" fill="#e8443f"/>` +
    `<g fill="#f6efe2"><rect x="14" y="126" width="6" height="10"/><rect x="28" y="126" width="6" height="10"/><rect x="42" y="126" width="6" height="10"/></g>` +
    // 大通り
    band(152, 16, "#b6ad9b") +
    band(168, 42, "#5f5a52") +
    `<g stroke="#f6efe2" stroke-width="3" stroke-dasharray="18 16" opacity=".7" fill="none"><path d="M0,189h400"/></g>` +
    roundTree(40, 168, 13) +
    roundTree(150, 168, 13) +
    roundTree(240, 168, 13) +
    roundTree(352, 168, 13),

  /** 木組みの家が並ぶ旧市街。壁の色を家ごとに変える。 */
  oldtown:
    sky("#a8cfe0", "#dce6ea") +
    band(116, 42, "#dce6ea") +
    clouds(320, 26, 0.9) +
    ground(156, "#9a9082") +
    timberHouse(6, 96, 62, 156, "#f2ece0", "#b04a3a") +
    timberHouse(74, 84, 58, 156, "#e4a89a", "#8a5568") +
    timberHouse(138, 92, 66, 156, "#e8d8a8", "#b04a3a") +
    timberHouse(210, 80, 58, 156, "#a8c4b0", "#4a5568") +
    timberHouse(274, 98, 54, 156, "#f2ece0", "#8a5568") +
    timberHouse(334, 88, 60, 156, "#e0c8a0", "#b04a3a") +
    // 石畳
    `<g stroke="#8a8072" stroke-width="2" opacity=".7" fill="none"><path d="M0,166h400M0,180h400M0,194h400M0,208h400"/></g>` +
    `<g stroke="#8a8072" stroke-width="2" opacity=".5" fill="none"><path d="M30,160v50M110,160v50M190,160v50M270,160v50M350,160v50"/></g>` +
    // 看板
    `<g><rect x="196" y="140" width="3" height="16" fill="#4a4436"/><path d="M170,138h28v12h-28z" fill="#f5b31c"/><circle cx="184" cy="144" r="3.4" fill="#8a5a2c"/></g>`,

  /** 段になった葡萄畑と石造りの醸造所。 */
  vineyard:
    sky("#a8cfe0", "#e4ebd6") +
    sun(322, 34, 16, "#f5d06a") +
    clouds(96, 28) +
    hills(100, "#7f9464", 3) +
    // 段ごとに土の色を変えて、段差が見えるようにする
    ground(100, "#c9ab7c") +
    band(120, 34, "#bfa070") +
    band(154, 36, "#b3946a") +
    band(190, 20, "#a88a5e") +
    // 醸造所と鳩小屋
    `<rect x="252" y="64" width="96" height="36" fill="#dfd8c8"/>` +
    `<path d="M246,64h108l-12,-16h-84z" fill="#c2603c"/>` +
    `<g stroke="#a84f30" stroke-width="1.4" opacity=".8" fill="none"><path d="M252,58h96M256,52h88"/></g>` +
    `<path d="M290,100V86a10,10 0 0 1 20,0v14z" fill="#5a4630"/>` +
    `<g fill="#7f97ad"><rect x="264" y="76" width="12" height="14"/><rect x="322" y="76" width="12" height="14"/></g>` +
    `<rect x="358" y="66" width="26" height="34" fill="#cfc7b4"/>` +
    `<path d="M354,66h34l-17,-14z" fill="#4a5568"/>` +
    `<rect x="366" y="74" width="10" height="10" fill="#5a4630"/>` +
    // 段になった畑(手前ほど大きく)
    vineRow(112, 13, 5) +
    terraceWall(112, 8) +
    vineRow(144, 11, 6.5) +
    terraceWall(144, 10) +
    vineRow(178, 9, 8, true) +
    terraceWall(178, 12) +
    vineRow(210, 7, 9, true) +
    // 手前の房
    `<path d="M40,166c8,-9 18,-9 24,-3c-6,9 -16,10 -24,3z" fill="#4f8f3f"/>` +
    `<path d="M38,168v8" stroke="#6b5330" stroke-width="2.4" fill="none"/>` +
    `<g fill="#6b4a7a"><circle cx="28" cy="180" r="6"/><circle cx="40" cy="180" r="6"/><circle cx="52" cy="180" r="6"/><circle cx="34" cy="190" r="6"/><circle cx="46" cy="190" r="6"/><circle cx="40" cy="200" r="6"/></g>` +
    `<g fill="#8a5f9a"><circle cx="26" cy="178" r="2"/><circle cx="38" cy="178" r="2"/><circle cx="32" cy="188" r="2"/></g>`,

  /** ロワールの城と堀。円塔にスレートの尖り屋根。 */
  chateau:
    sky("#8fc4e8", "#cfe4f0") +
    clouds(72, 28) +
    clouds(324, 34, 1.1) +
    band(116, 20, "#cfe4f0") +
    hills(134, "#3f6b3a", 5) +
    ground(134, "#6f9f52") +
    // 円塔(左右)
    `<g fill="#eae4d6"><rect x="113" y="66" width="30" height="92"/><rect x="259" y="66" width="30" height="92"/></g>` +
    `<g fill="#4a5568"><path d="M109,66L128,26L147,66z"/><path d="M255,66L274,26L293,66z"/></g>` +
    `<g fill="#f5b31c"><rect x="127" y="16" width="2" height="10"/><rect x="273" y="16" width="2" height="10"/></g>` +
    `<g fill="#e8443f"><path d="M129,16h11l-3.4,3.4L140,23h-11z"/><path d="M275,16h11l-3.4,3.4L286,23h-11z"/></g>` +
    // 本館
    `<rect x="140" y="78" width="122" height="80" fill="#eae4d6"/>` +
    `<path d="M134,78h134l-11,-13H145z" fill="#4a5568"/>` +
    `<rect x="182" y="52" width="38" height="26" fill="#eae4d6"/>` +
    `<path d="M176,52h50L201,28z" fill="#4a5568"/>` +
    // ドーマー窓
    `<g fill="#4a5568"><path d="M152,78v-9l7,-6l7,6v9z"/><path d="M236,78v-9l7,-6l7,6v9z"/></g>` +
    `<g fill="#7f97ad"><rect x="156" y="70" width="6" height="8"/><rect x="240" y="70" width="6" height="8"/><rect x="194" y="58" width="14" height="16"/><rect x="150" y="92" width="14" height="24"/><rect x="180" y="92" width="14" height="24"/><rect x="210" y="92" width="14" height="24"/><rect x="240" y="92" width="14" height="24"/><rect x="120" y="90" width="10" height="18"/><rect x="266" y="90" width="10" height="18"/></g>` +
    `<rect x="140" y="122" width="122" height="4" fill="#cfc7b4"/>` +
    // 堀
    band(158, 30, "#4f7f9f") +
    `<g opacity=".3" fill="#eae4d6"><rect x="140" y="158" width="122" height="24"/><rect x="113" y="158" width="30" height="20"/><rect x="259" y="158" width="30" height="20"/></g>` +
    ripples(166, "#bfe0f0") +
    ground(188, "#5f9450") +
    // 橋
    `<rect x="184" y="156" width="34" height="32" fill="#cfc7b4"/>` +
    `<rect x="184" y="156" width="34" height="4" fill="#b8ae98"/>` +
    `<g fill="#b8ae98"><rect x="186" y="160" width="3" height="28"/><rect x="213" y="160" width="3" height="28"/></g>` +
    // 白鳥
    `<g fill="#f6efe2"><ellipse cx="66" cy="176" rx="9" ry="4.5"/><path d="M72,173c-1,-5 1.4,-7.4 3.6,-6.6c1.8,0.6 1.8,2.6 0,3.2l-1.6,0.6l0.6,3.4z"/></g>` +
    `<path d="M76.6,166.6l2.6,1l-2.6,1z" fill="#f5b31c"/>`,

  /** 雪の峰と山小屋。 */
  alps:
    sky("#7fb0d8", "#cfe0ea") +
    band(116, 44, "#cfe0ea") +
    // 遠い峰
    `<path d="M0,150L50,66L80,106L124,48L172,120L216,76L272,138L324,104L400,154V210H0z" fill="#8a94a8"/>` +
    snowCap(50, 66, 42, 60, 80) +
    snowCap(124, 48, 112, 135, 64) +
    snowCap(216, 76, 202, 229, 90) +
    snowCap(324, 104, 306, 342, 116) +
    // 索道
    `<path d="M0,54L400,88" stroke="#5a6a7a" stroke-width="1.4" fill="none"/>` +
    `<rect x="150" y="67" width="2" height="6" fill="#5a6a7a"/>` +
    `<rect x="139" y="73" width="24" height="15" rx="3" fill="#e8443f"/>` +
    `<rect x="144" y="77" width="14" height="7" fill="#cfe4f0"/>` +
    // 手前の稜線と森
    `<path d="M0,170L60,132L120,160L190,126L250,162L320,134L400,168V210H0z" fill="#5f6b7a"/>` +
    fir(20, 176, 30) +
    fir(48, 180, 24) +
    fir(76, 174, 34) +
    fir(104, 180, 26) +
    fir(360, 178, 32) +
    fir(386, 182, 26) +
    // 雪原
    ground(176, "#eef3f6") +
    `<g fill="#d4e2ea"><ellipse cx="90" cy="196" rx="60" ry="9"/><ellipse cx="300" cy="204" rx="70" ry="8"/></g>` +
    // 山小屋
    `<rect x="248" y="132" width="72" height="44" fill="#8a5a2c"/>` +
    `<g stroke="#6b4423" stroke-width="1.6" opacity=".8" fill="none"><path d="M248,140h72M248,148h72M248,164h72M248,172h72"/></g>` +
    `<path d="M234,134L284,110L334,134z" fill="#4a5568"/>` +
    `<path d="M243,131L284,110L325,131z" fill="#f8fbfd"/>` +
    `<g fill="#6b4423"><rect x="242" y="150" width="84" height="4"/><rect x="242" y="142" width="84" height="3"/><rect x="248" y="145" width="3" height="5"/><rect x="264" y="145" width="3" height="5"/><rect x="280" y="145" width="3" height="5"/><rect x="296" y="145" width="3" height="5"/><rect x="312" y="145" width="3" height="5"/></g>` +
    `<g fill="#f5b31c"><rect x="258" y="156" width="14" height="12"/><rect x="296" y="156" width="14" height="12"/></g>` +
    `<g fill="#c2453c"><rect x="253" y="156" width="4" height="12"/><rect x="273" y="156" width="4" height="12"/><rect x="291" y="156" width="4" height="12"/><rect x="311" y="156" width="4" height="12"/></g>` +
    fir(196, 184, 40) +
    fir(160, 190, 30),

  /** 岩肌の峰と牧草地。 */
  pyrenees:
    sky("#9cc4dc", "#dce8e0") +
    clouds(300, 30, 1.1) +
    band(116, 40, "#dce8e0") +
    // 岩の峰
    `<path d="M0,138L44,74L86,112L136,60L186,116L232,86L286,126L340,92L400,140V210H0z" fill="#8a8272"/>` +
    `<g fill="#6f6a5e" opacity=".65"><path d="M44,74L86,112L60,116zM136,60L186,116L150,112zM232,86L286,126L248,120zM340,92L400,140L354,132z"/></g>` +
    `<g fill="#f0f4f6" opacity=".85"><path d="M136,60l7,10l-4,-1l-3,4l-3,-4l-4,1zM44,74l6,9l-3.4,-1l-2.6,3.4l-2.6,-3.4l-3.4,1zM340,92l6,9l-3.4,-1l-2.6,3.4l-2.6,-3.4l-3.4,1z"/></g>` +
    `<g stroke="#e8eef2" stroke-width="2.4" opacity=".6" fill="none"><path d="M136,72l-10,26M44,86l-8,20M340,104l9,18"/></g>` +
    // 緑の稜線と牧草地
    `<path d="M0,150c60,-22 120,-6 200,-14s140,10 200,20v54H0z" fill="#4f7f46"/>` +
    ground(158, "#6f9f52") +
    `<g stroke="#5a8a42" stroke-width="2" opacity=".6" fill="none"><path d="M0,172q100,-10 200,0t200,0M0,192q100,-10 200,0t200,0"/></g>` +
    `<g fill="#f5b31c"><circle cx="46" cy="182" r="2.2"/><circle cx="118" cy="196" r="2.2"/><circle cx="204" cy="176" r="2.2"/><circle cx="286" cy="200" r="2.2"/><circle cx="356" cy="184" r="2.2"/></g>` +
    // 石積みの山小屋
    `<rect x="64" y="140" width="60" height="30" fill="#b8ae98"/>` +
    `<g stroke="#9a907c" stroke-width="1.4" opacity=".8" fill="none"><path d="M64,148h60M64,156h60M64,164h60M84,140v30M104,140v30"/></g>` +
    `<path d="M56,140h76L94,120z" fill="#5a6470"/>` +
    `<path d="M86,170v-14h16v14z" fill="#5a4630"/>` +
    `<rect x="112" y="112" width="8" height="12" fill="#8a8272"/>` +
    // 羊
    sheep(196, 180, 1) +
    sheep(244, 192, 1.15) +
    sheep(304, 174, 0.85) +
    sheep(348, 196, 1.2) +
    // 猛禽
    `<path d="M282,46c9,-5 16,-6 20,-1c4,-5 11,-4 20,1c-9,-1 -16,2 -20,4c-4,-2 -11,-5 -20,-4z" fill="#4a4436" opacity=".85"/>`,

  /** 大西洋岸の砂丘と灯台。 */
  atlantic:
    sky("#8fc4e8", "#dce8f0") +
    sun(330, 34, 15) +
    clouds(150, 28, 1.1) +
    // 海
    band(100, 44, "#3f7fa8") +
    `<g stroke="#bfe0f0" stroke-width="2.4" opacity=".8" fill="none"><path d="M20,112h50M120,122h60M250,110h70M56,132h56M300,128h60M180,136h64"/></g>` +
    `<path d="M0,140c40,6 80,-2 130,4s90,6 150,0s90,-6 120,-2v8H0z" fill="#e8f2f6"/>` +
    // 砂浜
    ground(144, "#e2cf9e") +
    // 砂丘のうしろの海岸松
    parasolPine(316, 150, 40) +
    parasolPine(366, 152, 34) +
    // 砂丘
    `<path d="M170,152c40,-30 110,-38 230,-16v74H170z" fill="#d8bf86"/>` +
    `<path d="M170,152c40,-30 110,-38 230,-16" stroke="#e8d8a8" stroke-width="3" fill="none"/>` +
    `<g stroke="#8a9a52" stroke-width="1.8" fill="none"><path d="M212,150c-4,-8 -6,-12 -5,-16M212,150c0,-9 1,-13 4,-17M212,150c3,-7 6,-10 10,-12M268,142c-4,-8 -6,-12 -5,-16M268,142c0,-9 1,-13 4,-17M268,142c3,-7 6,-10 10,-12M330,138c-4,-8 -6,-12 -5,-16M330,138c0,-9 1,-13 4,-17"/></g>` +
    // 灯台
    `<path d="M48,154c8,-9 38,-9 48,0l5,12H43z" fill="#8a8578"/>` +
    `<path d="M60,154L64,52h16l4,102z" fill="#f2ede0"/>` +
    `<g fill="#e8443f"><rect x="63.4" y="74" width="17.2" height="10"/><rect x="62.4" y="104" width="19.2" height="10"/><rect x="61.2" y="134" width="21.6" height="10"/></g>` +
    `<rect x="58" y="46" width="28" height="6" rx="1.5" fill="#3a4453"/>` +
    `<rect x="65" y="32" width="14" height="14" fill="#f5d06a"/>` +
    `<path d="M63,32h18l-9,-9z" fill="#3a4453"/>` +
    `<rect x="71" y="19" width="2" height="5" fill="#3a4453"/>` +
    `<g fill="#f5d06a" opacity=".4"><path d="M65,34L14,26v18z"/><path d="M79,34l50,-8v18z"/></g>` +
    // 小舟と海鳥
    `<path d="M228,126c10,-4 34,-4 44,0c-6,6 -38,6 -44,0z" fill="#3f5f6a"/>` +
    `<path d="M252,124V102l16,22z" fill="#f6efe2"/>` +
    `<g stroke="#4a4436" stroke-width="1.8" fill="none"><path d="M132,62q5,-5 10,0q5,-5 10,0M186,44q4,-4 8,0q4,-4 8,0"/></g>`,

  /** 地中海の入江。パラソルと笠松。 */
  riviera:
    sky("#8fc4e8", "#cfe4f0") +
    sun(322, 32, 16) +
    clouds(120, 26, 0.9) +
    // 岬
    `<path d="M0,104c46,-24 100,-18 142,6v4H0z" fill="#b07a5a"/>` +
    `<path d="M0,104c46,-24 100,-18 142,6l-30,-2c-34,-16 -74,-20 -112,-4z" fill="#c98a68"/>` +
    // 海
    band(108, 54, "#2fa8b8") +
    `<g stroke="#a8e0e0" stroke-width="2.2" opacity=".75" fill="none"><path d="M30,120h60M180,132h70M280,118h80M100,146h70M300,148h70"/></g>` +
    band(150, 12, "#5fc8cc") +
    // 岩の入江
    `<path d="M0,164c22,-32 50,-42 76,-36c-12,14 -20,26 -22,42z" fill="#c2603c"/>` +
    `<path d="M0,164c22,-32 50,-42 76,-36c-14,2 -30,10 -42,22c-12,12 -20,16 -34,14z" fill="#a84f30"/>` +
    // 砂浜
    ground(162, "#e8d6b0") +
    // 笠松(砂の上に立たせる)
    parasolPine(76, 176, 84) +
    parasolPine(350, 182, 70) +
    // パラソルと寝椅子
    parasol(150, 194, "#e8443f") +
    parasol(232, 202, "#5b8fe8") +
    parasol(300, 186, "#f5b31c") +
    `<g fill="#f6efe2"><rect x="118" y="192" width="34" height="6" rx="3"/><rect x="200" y="200" width="34" height="6" rx="3"/></g>` +
    // ヨット
    `<path d="M188,146c10,-4 34,-4 44,0c-6,6 -38,6 -44,0z" fill="#f6efe2"/>` +
    `<path d="M210,144V116l16,28z" fill="#f2ede0"/>` +
    `<path d="M208,144V120l-13,24z" fill="#5b8fe8"/>` +
    `<path d="M282,130c7,-3 24,-3 31,0c-4,4 -27,4 -31,0z" fill="#f6efe2"/>` +
    `<path d="M298,128V108l11,20z" fill="#e8443f"/>`,

  /** ゴシックの大聖堂とばら窓。 */
  cathedral:
    sky("#a8cfe0", "#dce4ea") +
    clouds(58, 30) +
    clouds(336, 24, 0.9) +
    band(116, 54, "#dce4ea") +
    ground(168, "#a89e8c") +
    `<g stroke="#948a78" stroke-width="1.6" opacity=".7" fill="none"><path d="M0,180h400M0,194h400M0,208h400M60,172v40M160,172v40M240,172v40M340,172v40"/></g>` +
    // 塔と身廊
    `<g fill="#dfd8c8"><rect x="94" y="34" width="46" height="134"/><rect x="260" y="34" width="46" height="134"/><rect x="140" y="58" width="120" height="110"/></g>` +
    `<g fill="#cfc7b4"><rect x="136" y="58" width="8" height="110"/><rect x="256" y="58" width="8" height="110"/><rect x="90" y="30" width="54" height="6"/><rect x="256" y="30" width="54" height="6"/></g>` +
    // 小尖塔
    `<g fill="#cfc7b4"><path d="M90,30l4,-14l4,14zM136,30l4,-14l4,14zM256,30l4,-14l4,14zM302,30l4,-14l4,14z"/></g>` +
    // 破風と十字架
    `<path d="M160,58h80l-40,-24z" fill="#dfd8c8"/>` +
    `<g fill="#8a8578"><rect x="198.5" y="20" width="3" height="14"/><rect x="194" y="24" width="12" height="3"/></g>` +
    // 塔の細長い窓
    `<g fill="#5a5142"><path d="M104,120V72q0,-10 8,-14q8,4 8,14v48zM278,120V72q0,-10 8,-14q8,4 8,14v48z"/></g>` +
    `<g fill="#5f7f96"><path d="M108,116V74q0,-7 4,-10q4,3 4,10v42zM282,116V74q0,-7 4,-10q4,3 4,10v42z"/></g>` +
    // ばら窓
    `<circle cx="200" cy="90" r="28" fill="#cfc7b4"/>` +
    `<circle cx="200" cy="90" r="24" fill="#3f5f9f"/>` +
    `<g><circle cx="217" cy="90" r="5" fill="#e8443f"/><circle cx="208.5" cy="104.7" r="5" fill="#f5b31c"/><circle cx="191.5" cy="104.7" r="5" fill="#5b8fe8"/><circle cx="183" cy="90" r="5" fill="#e8443f"/><circle cx="191.5" cy="75.3" r="5" fill="#f5b31c"/><circle cx="208.5" cy="75.3" r="5" fill="#5b8fe8"/></g>` +
    `<g fill="#dfd8c8"><g><rect x="198.6" y="66" width="2.8" height="48"/><rect x="176" y="88.6" width="48" height="2.8"/></g><g transform="rotate(30 200 90)"><rect x="198.6" y="66" width="2.8" height="48"/><rect x="176" y="88.6" width="48" height="2.8"/></g><g transform="rotate(60 200 90)"><rect x="198.6" y="66" width="2.8" height="48"/><rect x="176" y="88.6" width="48" height="2.8"/></g></g>` +
    `<circle cx="200" cy="90" r="6.5" fill="#e8443f"/><circle cx="200" cy="90" r="2.8" fill="#f5b31c"/>` +
    // 塔の下部の小アーチの列
    `<g fill="#b8ae98">` +
    [98, 112, 126, 264, 278, 292].map(
      (x) => `<path d="M${x},146V134q0,-7 6,-9q6,2 6,9v12z"/>`,
    ).join("") +
    `</g>` +
    `<g fill="#8a8072">` +
    [100, 114, 128, 266, 280, 294].map(
      (x) => `<path d="M${x},146V135q0,-5 4,-6.4q4,1.4 4,6.4v11z"/>`,
    ).join("") +
    `</g>` +
    // 扉口(尖頭アーチ)
    `<path d="M146,168V134q0,-18 15,-22q15,4 15,22v34z" fill="#4a4436"/>` +
    `<path d="M178,168V128q0,-22 22,-27q22,5 22,27v40z" fill="#4a4436"/>` +
    `<path d="M224,168V134q0,-18 15,-22q15,4 15,22v34z" fill="#4a4436"/>` +
    `<path d="M186,168V132q0,-17 14,-21q14,4 14,21v36z" fill="#2f2a20"/>` +
    // 鳩と街灯
    `<g fill="#5f6b78"><ellipse cx="70" cy="192" rx="5" ry="3.4"/><circle cx="75" cy="188" r="2.4"/><ellipse cx="96" cy="200" rx="5" ry="3.4"/><circle cx="101" cy="196" r="2.4"/><ellipse cx="330" cy="196" rx="5" ry="3.4"/><circle cx="335" cy="192" r="2.4"/></g>` +
    `<g fill="#3a4453"><rect x="356" y="120" width="4" height="60"/><rect x="348" y="176" width="20" height="5" rx="2"/></g>` +
    `<path d="M350,120h16l-8,-12z" fill="#f5b31c"/>`,

  /** ノルマンディの生垣とりんご園、牛。 */
  bocage:
    sky("#9ccbe8", "#d8e8e0") +
    clouds(84, 30, 1.2) +
    clouds(304, 24) +
    hills(106, "#4f7f46", 4) +
    ground(106, "#7fa855") +
    // 畑と生垣
    `<rect x="0" y="128" width="400" height="24" fill="#8fb85c"/>` +
    hedge(120, 8) +
    // 奥の木組みの納屋(生垣の上に建てる)
    `<rect x="34" y="96" width="56" height="26" fill="#f2ece0"/>` +
    `<path d="M28,96h68L62,78z" fill="#7a5a48"/>` +
    `<g fill="#6b4a30"><rect x="36" y="96" width="3" height="26"/><rect x="60" y="96" width="3" height="26"/><rect x="85" y="96" width="3" height="26"/><rect x="34" y="108" width="56" height="3"/></g>` +
    `<path d="M56,122v-11h12v11z" fill="#5a4630"/>` +
    `<rect x="0" y="158" width="400" height="26" fill="#6f9f52"/>` +
    hedge(150, 11) +
    ground(186, "#7fa855") +
    hedge(182, 13) +
    // りんご園
    appleTree(150, 150, 16) +
    appleTree(196, 154, 13) +
    appleTree(238, 148, 15) +
    appleTree(348, 152, 14) +
    // ノルマンディ牛
    `<rect x="196" y="158" width="76" height="34" rx="9" fill="#f6efe2"/>` +
    `<g fill="#8a5a2c"><ellipse cx="216" cy="170" rx="13" ry="10"/><ellipse cx="252" cy="180" rx="11" ry="9"/></g>` +
    `<g fill="#f6efe2"><rect x="202" y="188" width="9" height="16"/><rect x="220" y="188" width="9" height="16"/><rect x="242" y="188" width="9" height="16"/><rect x="258" y="188" width="9" height="16"/></g>` +
    `<g fill="#4a4436"><rect x="202" y="199" width="9" height="5"/><rect x="220" y="199" width="9" height="5"/><rect x="242" y="199" width="9" height="5"/><rect x="258" y="199" width="9" height="5"/></g>` +
    `<path d="M270,164h20c5,0 8,4 8,9v10c0,4 -3,7 -8,7h-20z" fill="#f6efe2"/>` +
    `<ellipse cx="282" cy="174" rx="7" ry="6" fill="#8a5a2c"/>` +
    `<circle cx="282" cy="174" r="2.4" fill="#3a3428"/>` +
    `<ellipse cx="296" cy="186" rx="5" ry="4" fill="#e8a8a0"/>` +
    `<g fill="#cfc7b4"><path d="M272,164l-3,-8l7,5zM290,163l2,-8l4,7z"/></g>` +
    `<path d="M196,162c-6,-2 -9,2 -7,8c1,4 4,5 6,3z" fill="#f6efe2"/>`,

  /** 運河と石橋、平底船。プラタナスの並木が両岸に続く。 */
  canal:
    sky("#9ccbe8", "#d8e8e0") +
    clouds(70, 26) +
    clouds(320, 22, 0.9) +
    hills(104, "#4f7f46", 5) +
    ground(104, "#7fa855") +
    // 水路(奥へすぼまる)
    `<path d="M170,104L230,104L360,210L40,210z" fill="#4f7f8f"/>` +
    `<path d="M170,104L154,104L18,210L40,210z" fill="#c9a877"/>` +
    `<path d="M230,104L246,104L382,210L360,210z" fill="#c9a877"/>` +
    `<g stroke="#8fc0cc" stroke-width="2.4" opacity=".55" fill="none"><path d="M160,132h80M140,158h120M112,190h176"/></g>` +
    // 石橋
    `<path d="M148,142V110h152v32h-32q-44,-36 -88,0z" fill="#dfd8c8"/>` +
    `<rect x="144" y="102" width="160" height="9" fill="#cfc7b4"/>` +
    `<g fill="#b8ae98"><rect x="146" y="104" width="4" height="5"/><rect x="164" y="104" width="4" height="5"/><rect x="182" y="104" width="4" height="5"/><rect x="200" y="104" width="4" height="5"/><rect x="218" y="104" width="4" height="5"/><rect x="236" y="104" width="4" height="5"/><rect x="254" y="104" width="4" height="5"/><rect x="272" y="104" width="4" height="5"/><rect x="290" y="104" width="4" height="5"/></g>` +
    `<g stroke="#c2b9a4" stroke-width="1.4" opacity=".9" fill="none"><path d="M160,142v-30M290,142v-30"/></g>` +
    // 平底船
    `<path d="M122,172h158c4,10 -6,22 -18,22H136c-10,0 -18,-12 -14,-22z" fill="#3f5f5a"/>` +
    `<rect x="122" y="172" width="158" height="5" fill="#e8443f"/>` +
    `<rect x="226" y="150" width="46" height="22" rx="3" fill="#f2ede0"/>` +
    `<rect x="222" y="145" width="54" height="6" rx="2" fill="#2f5f4a"/>` +
    `<g fill="#5b8fe8"><rect x="234" y="156" width="11" height="10"/><rect x="253" y="156" width="11" height="10"/></g>` +
    `<path d="M136,172c8,-13 44,-15 66,-3z" fill="#8a8578"/>` +
    `<g stroke="#6f6a5e" stroke-width="1.4" opacity=".8" fill="none"><path d="M158,161v11M180,161v11"/></g>` +
    // 屋根の上の鉢植え(平底船の暮らし)
    `<g fill="#5f6b52"><rect x="230" y="139" width="8" height="6"/><rect x="260" y="139" width="8" height="6"/></g>` +
    `<g fill="#e8443f"><circle cx="234" cy="136" r="3.4"/><circle cx="264" cy="136" r="3.4"/></g>` +
    // 並木
    roundTree(272, 128, 8) +
    roundTree(134, 128, 8) +
    roundTree(302, 154, 13) +
    roundTree(104, 154, 13) +
    roundTree(338, 182, 19) +
    roundTree(66, 182, 19) +
    roundTree(370, 208, 26) +
    roundTree(28, 208, 26),

  /** プロヴァンスのラベンダー畑と糸杉。 */
  lavender:
    sky("#8fc4e8", "#dfe0ee") +
    sun(316, 34, 16, "#f5d06a") +
    clouds(84, 28) +
    // 石灰岩の山
    `<path d="M0,114L64,60L128,102L196,72L268,114z" fill="#8a94a8"/>` +
    snowCap(64, 60, 50, 82, 72) +
    `<path d="M240,114c40,-18 90,-22 160,-6v6z" fill="#9aa2b0"/>` +
    // 乾いた土と畑の縁
    ground(112, "#c9a877") +
    `<rect x="0" y="112" width="400" height="6" fill="#cfc7b4"/>` +
    // 石造りの家(マス)
    `<rect x="290" y="80" width="76" height="32" fill="#dfd8c8"/>` +
    `<path d="M284,80h88l-10,-14h-68z" fill="#c2603c"/>` +
    `<g stroke="#a84f30" stroke-width="1.4" opacity=".8" fill="none"><path d="M290,76h76M294,71h68"/></g>` +
    `<g fill="#5f7f96"><rect x="300" y="88" width="11" height="14"/><rect x="342" y="88" width="11" height="14"/></g>` +
    `<g fill="#6b8f5a"><rect x="295" y="88" width="4.5" height="14"/><rect x="311" y="88" width="4.5" height="14"/><rect x="337" y="88" width="4.5" height="14"/><rect x="353" y="88" width="4.5" height="14"/></g>` +
    `<path d="M320,112V96h14v16z" fill="#5a4630"/>` +
    cypress(378, 114, 58) +
    cypress(40, 118, 54) +
    cypress(58, 118, 70) +
    cypress(74, 118, 46) +
    // 畝
    lavenderRows(118, 9) +
    `<g fill="#6f5f9c" opacity=".55"><ellipse cx="80" cy="196" rx="20" ry="7"/><ellipse cx="200" cy="200" rx="22" ry="7"/><ellipse cx="322" cy="194" rx="20" ry="7"/></g>` +
    `<g fill="#a294cc"><ellipse cx="146" cy="150" rx="10" ry="4"/><ellipse cx="254" cy="152" rx="10" ry="4"/><ellipse cx="200" cy="140" rx="8" ry="3.4"/></g>`,
};

// ---------------------------------------------------------------------------
// シンボル(24×24)
// ---------------------------------------------------------------------------

export const FRANCE_MARKS = {
  /** 鉄塔(パリ)。 */
  eiffel:
    '<path d="M11,2h2l1,5.4h-4z" fill="#8a7f66"/>' +
    '<path d="M9.6,8.8h4.8l1.3,5.6h-7.4z" fill="#8a7f66"/>' +
    '<path d="M6.2,16.2h3.4l-1.5,6.6H3.2c0.5,-2.6 1.5,-4.8 3,-6.6z" fill="#8a7f66"/>' +
    '<path d="M17.8,16.2h-3.4l1.5,6.6h4.9c-0.5,-2.6 -1.5,-4.8 -3,-6.6z" fill="#8a7f66"/>' +
    '<g fill="#6b6250"><rect x="8.8" y="7.4" width="6.4" height="1.4"/><rect x="5.6" y="14.4" width="12.8" height="1.8"/><circle cx="12" cy="1.4" r="1.2"/></g>' +
    '<rect x="1" y="22.8" width="22" height="1.2" fill="#4a4436"/>',

  /** 城の塔(ロワール)。石の円塔にスレートの尖り屋根。 */
  chateau_tour:
    '<path d="M6.6,23V9.4h10.8V23z" fill="#eae4d6"/>' +
    '<path d="M12,0.6L19.8,9.4H4.2z" fill="#4a5568"/>' +
    '<rect x="5.6" y="8.2" width="12.8" height="2" fill="#cfc7b4"/>' +
    '<rect x="6.6" y="16.6" width="10.8" height="1.6" fill="#cfc7b4"/>' +
    '<path d="M9,23v-4a3,3 0 0 1 6,0v4z" fill="#5a4630"/>' +
    '<g fill="#5f7f96"><rect x="7.8" y="11.6" width="2.6" height="3.8"/><rect x="13.6" y="11.6" width="2.6" height="3.8"/></g>' +
    '<g><rect x="18.2" y="1.2" width="1" height="8" fill="#8a7f66"/><path d="M19.2,1.6h4.2L21.8,3.4l1.6,1.8h-4.2z" fill="#e8443f"/></g>',

  /**
   * ばら窓(ゴシックの大聖堂)。
   *
   * 円盤だけだと、大聖堂以外の背景(牧草地・浜辺・運河)では宙に浮いて見える。
   * 石の壁・控壁・土台を足して「大聖堂の正面が一枚立っている」形にし、
   * 下端(y=24)が影の楕円に載るようにしてある。円盤の意匠は元のまま。
   */
  cathedral_rose:
    // 土台(影の楕円に載る一番下)
    '<rect x="0.8" y="21.2" width="22.4" height="2.8" fill="#bdb49c"/>' +
    // 両脇の控壁
    '<g fill="#d5cdb9"><rect x="1.6" y="8.6" width="2.8" height="12.6"/><rect x="19.6" y="8.6" width="2.8" height="12.6"/></g>' +
    '<g fill="#c2b9a2"><path d="M1.6,8.6L3,5.4L4.4,8.6z"/><path d="M19.6,8.6L21,5.4L22.4,8.6z"/></g>' +
    // 壁と切妻
    '<rect x="4" y="5" width="16" height="16.2" fill="#eae4d6"/>' +
    '<path d="M4,5L12,0.6L20,5z" fill="#cfc7b4"/>' +
    '<rect x="3.4" y="4.4" width="17.2" height="1.4" fill="#dfd8c8"/>' +
    // 扉
    '<path d="M9.8,21.2v-1.6a2.2,2.2 0 0 1 4.4,0v1.6z" fill="#5a4630"/>' +
    '<rect x="9.8" y="19.4" width="4.4" height="1.8" fill="#5a4630"/>' +
    // ばら窓
    '<circle cx="12" cy="11" r="6.2" fill="#cfc7b4"/>' +
    '<circle cx="12" cy="11" r="5.3" fill="#3f5f9f"/>' +
    '<g><circle cx="15.5" cy="11" r="1.2" fill="#e8443f"/><circle cx="13.75" cy="14.03" r="1.2" fill="#f5b31c"/><circle cx="10.25" cy="14.03" r="1.2" fill="#5b8fe8"/><circle cx="8.5" cy="11" r="1.2" fill="#e8443f"/><circle cx="10.25" cy="7.97" r="1.2" fill="#f5b31c"/><circle cx="13.75" cy="7.97" r="1.2" fill="#5b8fe8"/></g>' +
    '<g fill="#dfd8c8" stroke="none"><g><rect x="11.65" y="5.7" width="0.7" height="10.6"/><rect x="6.7" y="10.65" width="10.6" height="0.7"/></g>' +
    '<g transform="rotate(30 12 11)"><rect x="11.65" y="5.7" width="0.7" height="10.6"/><rect x="6.7" y="10.65" width="10.6" height="0.7"/></g>' +
    '<g transform="rotate(60 12 11)"><rect x="11.65" y="5.7" width="0.7" height="10.6"/><rect x="6.7" y="10.65" width="10.6" height="0.7"/></g></g>' +
    '<circle cx="12" cy="11" r="1.6" fill="#e8443f"/><circle cx="12" cy="11" r="0.7" fill="#f5b31c"/>',

  /** 葡萄の房。 */
  vine:
    '<path d="M13,7.6c3.4,-4.6 7.4,-5.2 10,-2.6c-2,4.6 -6.2,6 -10,2.6z" fill="#4f8f3f"/>' +
    '<path d="M12,9.6V6c0,-1.6 0.8,-2.6 2.4,-3.2" stroke="#6b5330" stroke-width="1.4" fill="none"/>' +
    '<g fill="#6b4a7a"><circle cx="5.6" cy="11.4" r="2.6"/><circle cx="10.4" cy="11.4" r="2.6"/><circle cx="15.2" cy="11.4" r="2.6"/><circle cx="8" cy="15.6" r="2.6"/><circle cx="12.8" cy="15.6" r="2.6"/><circle cx="17.6" cy="15" r="2.4"/><circle cx="10.4" cy="19.6" r="2.5"/><circle cx="15.2" cy="19.4" r="2.4"/></g>' +
    '<g fill="#9a76ab"><circle cx="4.8" cy="10.4" r="0.9"/><circle cx="9.6" cy="10.4" r="0.9"/><circle cx="7.2" cy="14.6" r="0.9"/><circle cx="9.6" cy="18.6" r="0.9"/></g>',

  /**
   * バゲット。
   *
   * 斜め45度の一本だと、橋や運河の背景では宙を飛んでいるように見える。
   * 横に寝かせて籠と台に載せ、下端(y=24)を水平にしてある。
   */
  baguette:
    // 台と脚
    '<g fill="#8f6a2c"><rect x="4.4" y="22.2" width="2.6" height="1.8"/><rect x="17" y="22.2" width="2.6" height="1.8"/></g>' +
    '<rect x="0.4" y="20.4" width="23.2" height="2" rx="0.5" fill="#a8763c"/>' +
    // 下の一本(いちばん長い)。両端をすぼめて細長くする。
    '<path d="M1,18c0.6,-1.25 2.2,-2.1 4,-2.3h14c1.8,0.2 3.4,1.05 4,2.3c-0.6,1.25 -2.2,2.1 -4,2.3H5c-1.8,-0.2 -3.4,-1.05 -4,-2.3z" fill="#d8a05c"/>' +
    '<path d="M5.4,15.85c0.9,-0.1 1.9,-0.15 2.9,-0.15h7.4c1,0 2,0.05 2.9,0.15z" fill="#e8c088" stroke="none"/>' +
    '<g stroke="#a8763c" stroke-width="1" stroke-linecap="round" fill="none"><path d="M5.8,16.9l1.3,2M10,16.9l1.3,2M14.2,16.9l1.3,2M18.4,16.9l1.3,2"/></g>' +
    // 中の一本
    '<path d="M2.6,13.6c0.6,-1.2 2.1,-2 3.8,-2.2h11.2c1.7,0.2 3.2,1 3.8,2.2c-0.6,1.2 -2.1,2 -3.8,2.2H6.4c-1.7,-0.2 -3.2,-1 -3.8,-2.2z" fill="#cf9450"/>' +
    '<g stroke="#a8763c" stroke-width="0.95" stroke-linecap="round" fill="none"><path d="M7.2,12.6l1.2,1.9M11,12.6l1.2,1.9M14.8,12.6l1.2,1.9"/></g>' +
    // 上の一本(いちばん短い)
    '<path d="M4.2,9.2c0.6,-1.15 2,-1.95 3.6,-2.15h8.4c1.6,0.2 3,1 3.6,2.15c-0.6,1.15 -2,1.95 -3.6,2.15H7.8c-1.6,-0.2 -3,-1 -3.6,-2.15z" fill="#d8a05c"/>' +
    '<path d="M8,7.25c0.8,-0.1 1.7,-0.15 2.6,-0.15h2.8c0.9,0 1.8,0.05 2.6,0.15z" fill="#e8c088" stroke="none"/>' +
    '<g stroke="#a8763c" stroke-width="0.9" stroke-linecap="round" fill="none"><path d="M8.4,8.3l1.1,1.8M11.8,8.3l1.1,1.8M15.2,8.3l1.1,1.8"/></g>',

  /** チーズ(切り分けた楔と気泡)。 */
  cheese:
    '<rect x="0.6" y="20.4" width="22.8" height="2.6" fill="#a8813c"/>' +
    '<path d="M1.6,20.4V18.8L19,8.4v12z" fill="#f2c04c"/>' +
    '<path d="M19,8.4c1.4,-0.9 3.4,0 3.4,2v10H19z" fill="#e0a015"/>' +
    '<g fill="#dca82c"><circle cx="8.6" cy="16.6" r="1.7"/><circle cx="14.4" cy="14" r="1.3"/><circle cx="15.4" cy="18.2" r="1.1"/></g>',

  /** 灯台(大西洋岸の紅白帯)。 */
  lighthouse_fr:
    '<path d="M0,20.6h24V24H0z" fill="#3f7fa8"/>' +
    '<path d="M4.6,20.6c1.8,-2.6 13,-2.6 14.8,0z" fill="#6b6250"/>' +
    '<path d="M8,20.6L9.4,7h5.2L16,20.6z" fill="#f2ede0"/>' +
    '<g fill="#e8443f"><path d="M9.15,11h5.7l0.22,2.2H8.93z"/><path d="M8.62,16.2h6.76l0.2,2.2H8.42z"/></g>' +
    '<rect x="7.4" y="5.4" width="9.2" height="2" rx="0.6" fill="#3a4453"/>' +
    '<rect x="9.4" y="1.8" width="5.2" height="3.6" fill="#f5b31c"/>' +
    '<path d="M9.2,1.8L12,0.2l2.8,1.6z" fill="#3a4453"/>' +
    '<g fill="#f5b31c" opacity=".4"><path d="M9.2,3.6L1,1.6v4z"/><path d="M14.8,3.6L23,1.6v4z"/></g>',

  /** 雪をかぶった峰(アルプス・ピレネー)。 */
  alpine_peak:
    '<rect x="0" y="21" width="24" height="3" fill="#eef3f6"/>' +
    '<path d="M1,21L9,6l5,8l3,-4l6,11z" fill="#6b7f8a"/>' +
    '<path d="M9,6L12.1,10.9l-1.4,-0.5l-1.2,0.9l-1.3,-1l-1.1,0.8z" fill="#f8fbfd"/>' +
    '<path d="M17,10L18.6,12.9l-1.1,-0.5l-0.9,0.6l-0.9,-0.7l-0.9,0.6z" fill="#f8fbfd"/>' +
    '<path d="M14,14L9,21h10z" fill="#5a6b76" opacity=".6"/>' +
    '<path d="M3.4,21l2.2,-5.4L7.8,21z" fill="#2f5f3f"/>',

  /** 凱旋門。 */
  arch:
    '<rect x="0" y="22" width="24" height="2" fill="#8a8578"/>' +
    '<path d="M8,22V12a4,4 0 0 1 8,0v10z" fill="#4a3a24"/>' +
    '<path d="M2,22V6h20v16h-6V12a4,4 0 0 0 -8,0v10z" fill="#dfd8c8"/>' +
    '<rect x="1" y="3.4" width="22" height="3" fill="#cfc7b4"/>' +
    '<rect x="0.6" y="1.6" width="22.8" height="2" fill="#eae4d6"/>' +
    '<g fill="#c9c0ac"><rect x="3.4" y="9" width="3.4" height="9"/><rect x="17.2" y="9" width="3.4" height="9"/></g>' +
    '<g><rect x="10.4" y="9" width="1.1" height="7" fill="#5b8fe8"/><rect x="11.5" y="9" width="1.1" height="7" fill="#f6efe2"/><rect x="12.6" y="9" width="1.1" height="7" fill="#e8443f"/></g>',

  /** ラベンダーの穂。 */
  lavender_sprig:
    '<path d="M12,23V12" stroke="#5f8f4a" stroke-width="1.8" stroke-linecap="round" fill="none"/>' +
    '<path d="M12,19c-3.2,0.2 -5.4,-1.4 -6,-3.6c3.2,-0.6 5.4,0.6 6,3.6z" fill="#6b8f5a"/>' +
    '<path d="M12,21.4c3.2,0.2 5.4,-1.4 6,-3.6c-3.2,-0.6 -5.4,0.6 -6,3.6z" fill="#6b8f5a"/>' +
    '<g fill="#8a7ab8"><ellipse cx="12" cy="1.8" rx="1.4" ry="1.7"/><ellipse cx="10.3" cy="4" rx="1.5" ry="1.8"/><ellipse cx="13.7" cy="4" rx="1.5" ry="1.8"/><ellipse cx="12" cy="6" rx="1.6" ry="1.9"/><ellipse cx="10.2" cy="8.2" rx="1.6" ry="1.9"/><ellipse cx="13.8" cy="8.2" rx="1.6" ry="1.9"/><ellipse cx="12" cy="10.2" rx="1.6" ry="1.9"/><ellipse cx="10.4" cy="12.4" rx="1.5" ry="1.8"/><ellipse cx="13.6" cy="12.4" rx="1.5" ry="1.8"/></g>' +
    '<g fill="#6f5f9c"><ellipse cx="10.3" cy="4" rx="0.7" ry="0.9"/><ellipse cx="12" cy="6" rx="0.7" ry="0.9"/><ellipse cx="13.8" cy="8.2" rx="0.7" ry="0.9"/><ellipse cx="10.4" cy="12.4" rx="0.7" ry="0.9"/></g>',

  /** ヨット(三色の帆)。 */
  sailboat_fr:
    '<path d="M0,20.6h24V24H0z" fill="#3f8fb0"/>' +
    '<path d="M1.6,17.4h20.8c-1.4,3.4 -4.6,4.8 -10.4,4.8S3,20.8 1.6,17.4z" fill="#f6efe2"/>' +
    '<path d="M1.6,17.4h20.8l-1,2.4H2.6z" fill="#e8443f"/>' +
    '<rect x="11.3" y="2.6" width="1.4" height="14.8" fill="#5a4630"/>' +
    '<path d="M10.6,17V4.6L4.4,17z" fill="#5b8fe8"/>' +
    '<path d="M13.4,17V3.4L20.4,17z" fill="#f2ede0"/>' +
    '<path d="M13.4,13.6h5.25L20.4,17h-7z" fill="#e8443f"/>',

  /** 立石(ブルターニュのメンヒル)。 */
  menhir:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#5f9450"/>' +
    '<path d="M18.4,22L19,12c0.2,-2 3.2,-2 3.4,0L23,22z" fill="#6f6a5e"/>' +
    '<path d="M7.4,22.4L8.6,7.6c0.3,-3.2 5,-3.4 5.6,-0.2L16.6,22.4z" fill="#8a8578"/>' +
    '<g fill="#6f6a5e" opacity=".55"><path d="M9.4,11.6h4.2v1.4H9.4zM10,16.4h4.4v1.2H10z"/></g>' +
    '<g fill="#8a9a52" opacity=".8"><circle cx="10.4" cy="9.6" r="1.2"/><circle cx="13.4" cy="14.8" r="1"/></g>' +
    '<g stroke="#4f8f3f" stroke-width="1.2" stroke-linecap="round" fill="none"><path d="M4,21.4v-2.6M6,21.4v-3.4M18,21.4v-2.4"/></g>',
};
