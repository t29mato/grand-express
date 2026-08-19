/**
 * ベトナムの都市イラスト。
 *
 * `VIETNAM_MARKS` は 24×24 の座標系に描くシンボル(盤面上では直径19pxほど)、
 * `VIETNAM_BG` は 400×210 の座標系に描く都市カードの背景シーン。
 * いずれもSVG断片の文字列で、動きは含めない。
 *
 * 盤面の芯は「統一鉄道は統一より先に敷かれ、分断で切られ、二十か月で再びつながった」。
 * **時間の流れが盤面の南北になる**ので、背景には北から南までどこにでも
 * 単線の線路が通っている(`railTrack`)。
 *
 * 戦争の図像は `flagriver`(ベンハイ川の分断線)と `palacegate`(突き破られた鉄門)の
 * 2枚だけに留める。残る23枚は**いま人が暮らして列車が走っている町**として描く。
 *
 * 色: 空 #8fc4e8〜、紅河・メコンの濁り #9a8a58、稲 #6faa4a、密林 #2d6338、
 * チャム煉瓦 #a85a42、フランス統治期の黄土 #e0b45c、玄武岩土壌 #a8543a、
 * 旗の赤 #da251d / 星の黄 #ffcd00。
 */

// ---------------------------------------------------------------------------
// 部品(背景シーン用)
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
 * 既定の118はすぐ下に地面が来る場合の値。ここを間違えると横一文字に透ける。
 * 確認は `node scripts/check-city-backgrounds.mjs --src vietnam`。
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

/** 円錐笠。**使いすぎると絵葉書になる**ので、農作業の場面だけに載せる。 */
function conicalHat(x, y, w = 9) {
  return `<path d="M${r1(x - w)},${y}q${w},${r1(-w * 1.15)} ${r1(w * 2)},0z" fill="#e6cf9a"/><path d="M${r1(x - w)},${y}h${r1(w * 2)}" stroke="#c2a86e" stroke-width="1.2" fill="none"/>`;
}

function sun(cx, cy, r, fill = "#f5b31c") {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>`;
}

function clouds(cx, cy, scale = 1, fill = "#f6efe2") {
  const e = (dx, rx, ry) =>
    `<ellipse cx="${r1(cx + dx * scale)}" cy="${cy}" rx="${r1(rx * scale)}" ry="${r1(ry * scale)}"/>`;
  return `<g opacity=".8" fill="${fill}">${e(0, 18, 7)}${e(-10, 11, 5.5)}${e(11, 13, 5.5)}</g>`;
}

/** 靄の帯(熱帯の湿気。層をひとつ増やすだけで奥行きが出る)。 */
function haze(y, h, fill = "#e4eef0", o = ".55") {
  return `<rect x="0" y="${y}" width="${W}" height="${h}" fill="${fill}" opacity="${o}"/>`;
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

/** 水面のさざ波。**舟はこれより後に描く**(波を遮ることで水の上に載る)。 */
function ripples(y, color = "#cfe4ea", o = ".6") {
  return `<g stroke="${color}" stroke-width="2" opacity="${o}" fill="none"><path d="M22,${y}h64M196,${y + 13}h84M104,${y + 26}h60M292,${y + 6}h84"/></g>`;
}

/** 二次ベジエ上の点(羽状の葉を作るのに使う)。 */
function qpt(x0, y0, cx, cy, x1, y1, t) {
  const u = 1 - t;
  return [u * u * x0 + 2 * u * t * cx + t * t * x1, u * u * y0 + 2 * u * t * cy + t * t * y1];
}

/**
 * 椰子の葉1枚。**羽の切れ込みが無いとバナナの葉に見える**ので、
 * 中肋に沿って小葉を並べる。
 */
function frond(x, y, dirX, len, droop, fill = "#2f7a44") {
  const cx = x + dirX * len * 0.55;
  const cy = y - len * 0.34;
  const tx = x + dirX * len;
  const ty = y + droop;
  const parts = [
    `<path d="M${x},${y}Q${r1(cx)},${r1(cy)} ${r1(tx)},${r1(ty)}" stroke="${fill}" stroke-width="2.2" fill="none" stroke-linecap="round"/>`,
  ];
  const leaf = [];
  for (let i = 1; i <= 7; i++) {
    const t = i / 8;
    const [px, py] = qpt(x, y, cx, cy, tx, ty, t);
    const s = (1 - Math.abs(t - 0.45)) * len * 0.3;
    leaf.push(`M${r1(px)},${r1(py)}l${r1(dirX * s * 0.35)},${r1(-s)}`, `M${r1(px)},${r1(py)}l${r1(dirX * s * 0.5)},${r1(s * 0.9)}`);
  }
  parts.push(
    `<path d="${leaf.join("")}" stroke="${fill}" stroke-width="2" stroke-linecap="round" fill="none"/>`,
  );
  return `<g>${parts.join("")}</g>`;
}

/** 椰子。細く反った幹に羽状の葉。 */
function palm(x, base, h, fill = "#2f7a44", nuts = false) {
  const top = r1(base - h);
  const lean = r1(h * 0.12);
  const parts = [
    `<path d="M${r1(x - 3)},${base}q${r1(lean * 0.5)},${r1(-h * 0.6)} ${r1(lean + 2)},${r1(-h)}h4q${r1(-lean * 0.6)},${r1(h * 0.45)} ${r1(-lean * 0.2)},${h}z" fill="#7a5f38"/>`,
  ];
  const rings = [];
  for (let i = 1; i <= 5; i++) rings.push(`M${r1(x - 3 + lean * (i / 6))},${r1(base - (h * i) / 6)}h5`);
  parts.push(`<path d="${rings.join("")}" stroke="#5f4728" stroke-width="1.2" opacity=".7" fill="none"/>`);
  const cx2 = r1(x + lean);
  parts.push(
    frond(cx2, top, -1, r1(h * 0.5), r1(h * 0.22), fill),
    frond(cx2, top, 1, r1(h * 0.52), r1(h * 0.2), fill),
    frond(cx2, top, -1, r1(h * 0.4), r1(h * 0.4), fill),
    frond(cx2, top, 1, r1(h * 0.38), r1(h * 0.42), fill),
    frond(cx2, r1(top - 2), -0.35, r1(h * 0.4), r1(-h * 0.12), fill),
    frond(cx2, r1(top - 2), 0.35, r1(h * 0.42), r1(-h * 0.14), fill),
  );
  if (nuts) {
    parts.push(
      `<g fill="#8a6f3c"><circle cx="${r1(cx2 - 4)}" cy="${r1(top + 4)}" r="3"/><circle cx="${r1(cx2 + 4)}" cy="${r1(top + 5)}" r="3"/><circle cx="${cx2}" cy="${r1(top + 8)}" r="2.8"/></g>`,
    );
  }
  return parts.join("");
}

/** バナナ(大きな葉が裂けている)。手前の額縁に使う。 */
function bananaPlant(x, base, h, fill = "#3f8f4a") {
  const parts = [`<rect x="${r1(x - 2.4)}" y="${r1(base - h * 0.5)}" width="4.8" height="${r1(h * 0.5)}" fill="#6f8a44"/>`];
  const set = [
    [-1, 0.95, -0.35],
    [1, 0.98, -0.3],
    [-1, 0.7, 0.18],
    [1, 0.72, 0.22],
    [-0.3, 0.6, -0.6],
  ];
  for (const [dx, sc, dy] of set) {
    const ex = r1(x + dx * h * 0.52 * sc);
    const ey = r1(base - h * 0.5 - h * 0.34 * sc - dy * h * 0.3);
    parts.push(
      `<path d="M${x},${r1(base - h * 0.5)}Q${r1((x + ex) / 2)},${r1(ey - h * 0.2)} ${ex},${ey}q${r1(-dx * h * 0.12)},${r1(h * 0.16)} ${r1(-(ex - x))},${r1(base - h * 0.5 - ey + 2)}z" fill="${fill}"/>`,
      `<path d="M${x},${r1(base - h * 0.5)}Q${r1((x + ex) / 2)},${r1(ey - h * 0.2)} ${ex},${ey}" stroke="#2f6b38" stroke-width="1.2" fill="none"/>`,
    );
  }
  return parts.join("");
}

/** 松(ダラットの高原)。 */
function pine(x, base, h, fill = "#2f6b45") {
  const w = r1(h * 0.46);
  return (
    `<rect x="${r1(x - 1.8)}" y="${r1(base - h * 0.34)}" width="3.6" height="${r1(h * 0.34)}" fill="#6b5330"/>` +
    `<path d="M${r1(x - w / 2)},${r1(base - h * 0.3)}L${x},${r1(base - h)}L${r1(x + w / 2)},${r1(base - h * 0.3)}z" fill="${fill}"/>` +
    `<path d="M${r1(x - w / 2.4)},${r1(base - h * 0.52)}L${x},${r1(base - h * 0.92)}L${r1(x + w / 2.4)},${r1(base - h * 0.52)}z" fill="${fill}"/>` +
    `<path d="M${r1(x - w / 3)},${r1(base - h * 0.72)}L${x},${r1(base - h * 0.98)}L${r1(x + w / 3)},${r1(base - h * 0.72)}z" fill="${fill}" opacity=".85"/>`
  );
}

/** 火炎樹(ホウオウボク)。深紅の平たい樹冠。 */
function flameTree(x, base, r) {
  return (
    // 幹と枝。枝を樹冠まで伸ばさないと、小さいときに「傘」に見える
    `<g stroke="#5f4728" stroke-width="${r1(Math.max(2.4, r * 0.26))}" fill="none" stroke-linecap="round">` +
    `<path d="M${x},${base}V${r1(base - r * 1.4)}"/>` +
    `<path d="M${x},${r1(base - r * 1.05)}l${r1(-r * 0.72)},${r1(-r * 0.55)}"/>` +
    `<path d="M${x},${r1(base - r * 1.3)}l${r1(r * 0.74)},${r1(-r * 0.5)}"/>` +
    `</g>` +
    `<g fill="#c9302c"><ellipse cx="${x}" cy="${r1(base - r * 2)}" rx="${r}" ry="${r1(r * 0.5)}"/><ellipse cx="${r1(x - r * 0.6)}" cy="${r1(base - r * 1.7)}" rx="${r1(r * 0.55)}" ry="${r1(r * 0.34)}"/><ellipse cx="${r1(x + r * 0.62)}" cy="${r1(base - r * 1.72)}" rx="${r1(r * 0.55)}" ry="${r1(r * 0.34)}"/></g>` +
    `<g fill="#e8553f" opacity=".9"><ellipse cx="${r1(x - r * 0.3)}" cy="${r1(base - r * 2.2)}" rx="${r1(r * 0.4)}" ry="${r1(r * 0.22)}"/><ellipse cx="${r1(x + r * 0.4)}" cy="${r1(base - r * 2.14)}" rx="${r1(r * 0.34)}" ry="${r1(r * 0.2)}"/></g>` +
    `<g fill="#f5b31c"><circle cx="${r1(x - r * 0.75)}" cy="${r1(base - r * 1.9)}" r="1.6"/><circle cx="${r1(x + r * 0.5)}" cy="${r1(base - r * 2.3)}" r="1.6"/></g>`
  );
}

/** 単線の線路。盤面の芯なので、どの町にも通っている。 */
function railTrack(y, from = 0, to = W, tie = "#6b5330") {
  const ties = [];
  for (let x = from + 4; x < to; x += 14) ties.push(`<rect x="${r1(x)}" y="${r1(y - 3)}" width="8" height="7" fill="${tie}"/>`);
  return (
    `<rect x="${from}" y="${r1(y - 6)}" width="${to - from}" height="14" fill="#9a9080"/>` +
    `<g>${ties.join("")}</g>` +
    `<g stroke="#5a5750" stroke-width="1.8" fill="none"><path d="M${from},${r1(y - 2.6)}H${to}M${from},${r1(y + 2.6)}H${to}"/></g>`
  );
}

/** 木造の川船(サンパン)。**さざ波を描いたあとに呼ぶ。** */
function sampan(x, y, s = 1, hull = "#8a5f34", roof = null) {
  const w = r1(26 * s);
  const parts = [
    `<path d="M${r1(x - w)},${y}q${r1(w * 0.2)},${r1(9 * s)} ${w},${r1(9 * s)}q${r1(w * 0.8)},0 ${w},${r1(-9 * s)}z" fill="${hull}"/>`,
    `<path d="M${r1(x - w)},${y}h${r1(w * 2)}v${r1(2.4 * s)}h${r1(-w * 2)}z" fill="#b08a52"/>`,
    `<path d="M${r1(x - w * 0.72)},${r1(y + 2.4 * s)}q${r1(w * 0.72)},${r1(4 * s)} ${r1(w * 1.44)},0z" fill="#5a3c20" opacity=".7"/>`,
    `<path d="M${r1(x - w * 0.6)},${r1(y + 11 * s)}h${r1(w * 1.2)}" stroke="#f0f6f8" stroke-width="${r1(1.6 * s)}" opacity=".45" fill="none"/>`,
  ];
  if (roof) {
    parts.push(
      `<path d="M${r1(x - w * 0.5)},${y}q${r1(w * 0.5)},${r1(-8 * s)} ${r1(w)},0z" fill="${roof}"/>`,
      `<path d="M${r1(x - w * 0.5)},${y}h${r1(w)}" stroke="#4a4436" stroke-width="1.2" fill="none"/>`,
    );
  }
  return parts.join("");
}

/** バイク(ベトナムの日常。人が乗ると町が生きる)。 */
function motorbike(x, base, s = 1, shirt = "#e8443f") {
  const u = (v) => r1(v * s);
  return (
    `<g><circle cx="${r1(x - 9 * s)}" cy="${r1(base - 4 * s)}" r="${u(4.2)}" fill="#33302a"/><circle cx="${r1(x + 9 * s)}" cy="${r1(base - 4 * s)}" r="${u(4.2)}" fill="#33302a"/>` +
    `<circle cx="${r1(x - 9 * s)}" cy="${r1(base - 4 * s)}" r="${u(1.6)}" fill="#8a8578"/><circle cx="${r1(x + 9 * s)}" cy="${r1(base - 4 * s)}" r="${u(1.6)}" fill="#8a8578"/></g>` +
    `<path d="M${r1(x - 9 * s)},${r1(base - 4 * s)}l${u(5)},${u(-4)}h${u(9)}l${u(3)},${u(4)}" stroke="#4f6b8a" stroke-width="${u(2.6)}" fill="none" stroke-linecap="round"/>` +
    `<path d="M${r1(x + 7 * s)},${r1(base - 9 * s)}l${u(3)},${u(-4)}" stroke="#4a4436" stroke-width="${u(1.6)}" fill="none"/>` +
    `<path d="M${r1(x - 3 * s)},${r1(base - 9 * s)}l${u(-1)},${u(-8)}h${u(6)}l${u(1)},${u(8)}z" fill="${shirt}"/>` +
    `<circle cx="${r1(x + 0.5 * s)}" cy="${r1(base - 20 * s)}" r="${u(3.2)}" fill="#e0b48a"/>` +
    `<path d="M${r1(x - 2.8 * s)},${r1(base - 21 * s)}q${u(3.3)},${u(-4.4)} ${u(6.6)},0z" fill="#3f4a56"/>`
  );
}

/** 自転車。 */
function bicycle(x, base, s = 1, frame = "#4a4436") {
  const u = (v) => r1(v * s);
  return (
    `<g stroke="#33302a" stroke-width="${u(1.6)}" fill="none"><circle cx="${r1(x - 8 * s)}" cy="${r1(base - 5 * s)}" r="${u(5)}"/><circle cx="${r1(x + 8 * s)}" cy="${r1(base - 5 * s)}" r="${u(5)}"/></g>` +
    `<path d="M${r1(x - 8 * s)},${r1(base - 5 * s)}l${u(5)},${u(-7)}h${u(7)}l${u(4)},${u(7)}m${u(-4)},${u(-7)}l${u(-6)},${u(7)}" stroke="${frame}" stroke-width="${u(1.8)}" fill="none"/>` +
    `<path d="M${r1(x + 6 * s)},${r1(base - 12 * s)}h${u(5)}" stroke="${frame}" stroke-width="${u(1.6)}" fill="none"/>`
  );
}

/** 反り屋根(瓦)。端が跳ね上がる。 */
function tiledRoof(x, y, w, h, fill = "#a2503c", edge = "#7f3a2c") {
  const c = r1(w * 0.5);
  return (
    `<path d="M${r1(x - w * 0.12)},${y}q${r1(c * 0.55)},${-h} ${c},${-h}h${r1(w * 0.04)}q${r1(c * 0.45)},0 ${c},${h}z" fill="${fill}"/>` +
    `<path d="M${r1(x - w * 0.12)},${y}q${r1(-6)},${-4} ${r1(-10)},${-5}q${6},${4} ${6},${5}z" fill="${edge}"/>` +
    `<path d="M${r1(x + w * 1.12)},${y}q${6},${-4} ${10},${-5}q${-6},${4} ${-6},${5}z" fill="${edge}"/>` +
    `<rect x="${r1(x - w * 0.12)}" y="${y}" width="${r1(w * 1.24)}" height="2.6" fill="${edge}"/>`
  );
}

/**
 * 間口の狭い商家(チューブハウス)。ベトナムの町並みの骨格。
 * 幅を6〜16pxに絞り、階ごとに窓とバルコニーを入れる。
 */
function tubeHouse(x, top, w, base, wall, roof = "#a2503c") {
  const parts = [
    `<rect x="${x}" y="${top}" width="${w}" height="${base - top}" fill="${wall}"/>`,
    `<rect x="${r1(x - 2)}" y="${top}" width="${r1(w + 4)}" height="3.4" fill="${roof}"/>`,
    `<rect x="${r1(x - 3)}" y="${r1(top - 3.4)}" width="${r1(w + 6)}" height="3.4" fill="${roof}"/>`,
  ];
  let fy = top + 10;
  let i = 0;
  while (fy < base - 16) {
    parts.push(
      `<rect x="${r1(x + w * 0.18)}" y="${fy}" width="${r1(w * 0.64)}" height="9" fill="${i % 2 ? "#4f6b7a" : "#3f5f70"}"/>`,
      `<rect x="${r1(x + 1)}" y="${r1(fy + 10)}" width="${r1(w - 2)}" height="2.4" fill="#c9bda4"/>`,
    );
    fy += 15;
    i++;
  }
  parts.push(
    `<rect x="${x}" y="${base - 14}" width="${w}" height="14" fill="#c9a86e"/>`,
    `<rect x="${r1(x + w * 0.2)}" y="${base - 12}" width="${r1(w * 0.6)}" height="12" fill="#5a4630"/>`,
  );
  return parts.join("");
}

/** 集合住宅の1棟(規則正しい窓)。 */
function blockSlab(x, top, w, base, wall = "#d8cdb2") {
  const parts = [`<rect x="${x}" y="${top}" width="${w}" height="${base - top}" fill="${wall}"/>`];
  const cols = Math.max(3, Math.round(w / 17));
  const wins = [];
  const rails = [];
  for (let ry = top + 8; ry < base - 12; ry += 16) {
    for (let i = 0; i < cols; i++) {
      const wx = r1(x + 5 + (i * (w - 15)) / (cols - 1));
      wins.push(`<rect x="${wx}" y="${ry}" width="10" height="9" fill="#5f7284"/>`);
    }
    rails.push(`M${r1(x + 1)},${r1(ry + 11)}h${r1(w - 2)}`);
  }
  parts.push(`<g>${wins.join("")}</g>`);
  parts.push(`<path d="${rails.join("")}" stroke="#b0a488" stroke-width="2.4" fill="none"/>`);
  parts.push(`<rect x="${r1(x - 3)}" y="${r1(top - 4)}" width="${r1(w + 6)}" height="4" fill="#9a9080"/>`);
  return parts.join("");
}

/** フランス統治期の黄土色の建物(鎧戸つき)。 */
function colonialHouse(x, top, w, base, wall = "#e0b45c") {
  const h = base - top;
  const parts = [
    `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="${wall}"/>`,
    `<rect x="${r1(x - 4)}" y="${r1(top - 5)}" width="${r1(w + 8)}" height="6" fill="#a2503c"/>`,
    `<path d="M${r1(x - 4)},${r1(top - 5)}h${r1(w + 8)}l${-6},${-7}h${r1(-(w - 4))}z" fill="#8f4634"/>`,
    `<rect x="${x}" y="${r1(top + h * 0.5)}" width="${w}" height="3" fill="#f2ddb0"/>`,
  ];
  const cols = Math.max(2, Math.round(w / 26));
  const win = [];
  for (let k = 0; k < 2; k++) {
    const wy = r1(top + 7 + k * h * 0.5);
    for (let i = 0; i < cols; i++) {
      const wx = r1(x + 6 + (i * (w - 22)) / Math.max(1, cols - 1));
      win.push(
        `<rect x="${wx}" y="${wy}" width="11" height="14" fill="#f2ddb0"/>`,
        `<rect x="${r1(wx + 0.8)}" y="${r1(wy + 1)}" width="4.4" height="12" fill="#3f6b5a"/>`,
        `<rect x="${r1(wx + 5.8)}" y="${r1(wy + 1)}" width="4.4" height="12" fill="#4f7f68"/>`,
      );
    }
  }
  parts.push(`<g>${win.join("")}</g>`);
  return parts.join("");
}

/** 石灰岩の塔(ハロン・ニンビン)。縦の溝を不規則に入れる。 */
function karst(x, base, h, w, fill = "#7f8a80", lit = "#9aa79a") {
  const hw = r1(w / 2);
  const parts = [
    `<path d="M${r1(x - hw)},${base}q${r1(hw * 0.2)},${r1(-h * 0.62)} ${r1(hw * 0.62)},${r1(-h * 0.86)}q${r1(hw * 0.34)},${r1(-h * 0.16)} ${r1(hw * 0.72)},${r1(h * 0.02)}q${r1(hw * 0.5)},${r1(h * 0.24)} ${r1(hw * 0.66)},${r1(h * 0.98)}z" fill="${fill}"/>`,
    `<path d="M${r1(x - hw * 0.38)},${r1(base - h * 0.86)}q${r1(hw * 0.34)},${r1(-h * 0.16)} ${r1(hw * 0.72)},${r1(h * 0.02)}q${r1(-hw * 0.3)},${r1(h * 0.3)} ${r1(-hw * 0.5)},${r1(h * 0.82)}h${r1(-hw * 0.3)}z" fill="${lit}"/>`,
  ];
  const grooves = [];
  const seed = [0.18, 0.42, 0.63, 0.81];
  for (let i = 0; i < seed.length; i++) {
    const gx = r1(x - hw + w * seed[i]);
    const gh = r1(h * (0.3 + 0.22 * ((i * 7) % 3)));
    grooves.push(`M${gx},${r1(base - 2)}v${-gh}`);
  }
  parts.push(`<path d="${grooves.join("")}" stroke="#5f6b62" stroke-width="1.6" opacity=".55" fill="none"/>`);
  parts.push(
    `<g fill="#3f7a48" opacity=".85"><ellipse cx="${r1(x - hw * 0.4)}" cy="${r1(base - h * 0.52)}" rx="${r1(w * 0.16)}" ry="${r1(h * 0.07)}"/><ellipse cx="${r1(x + hw * 0.45)}" cy="${r1(base - h * 0.3)}" rx="${r1(w * 0.18)}" ry="${r1(h * 0.06)}"/><ellipse cx="${x}" cy="${r1(base - h * 0.88)}" rx="${r1(w * 0.14)}" ry="${r1(h * 0.05)}"/></g>`,
  );
  return parts.join("");
}

/** 段々になった水田(畦が光る)。 */
function terraces(topY, botY, rows, fill = "#6faa4a", edge = "#c9bda4") {
  const parts = [];
  for (let i = 0; i < rows; i++) {
    const t = i / rows;
    const y = r1(topY + (botY - topY) * t);
    const hgt = r1((botY - topY) / rows + 2);
    const amp = r1(6 + 10 * t);
    parts.push(
      `<path d="M0,${y}q100,${-amp} 200,${r1(-amp * 0.3)}t200,${r1(amp * 0.5)}v${hgt}H0z" fill="${i % 2 ? fill : "#5f9a42"}"/>`,
      `<path d="M0,${y}q100,${-amp} 200,${r1(-amp * 0.3)}t200,${r1(amp * 0.5)}" stroke="${edge}" stroke-width="1.6" opacity=".8" fill="none"/>`,
    );
  }
  return parts.join("");
}

/** 提灯(ホイアン)。 */
function lantern(x, y, h, c = "#e8443f") {
  return (
    `<path d="M${x},${r1(y - 3)}v3" stroke="#5a4630" stroke-width="1.2" fill="none"/>` +
    `<ellipse cx="${x}" cy="${r1(y + h / 2)}" rx="${r1(h * 0.36)}" ry="${r1(h / 2)}" fill="${c}"/>` +
    `<rect x="${r1(x - h * 0.2)}" y="${y}" width="${r1(h * 0.4)}" height="2" fill="#c9a86e"/>` +
    `<rect x="${r1(x - h * 0.2)}" y="${r1(y + h - 2)}" width="${r1(h * 0.4)}" height="2" fill="#c9a86e"/>` +
    `<path d="M${x},${r1(y + h)}v${r1(h * 0.28)}" stroke="#f5b31c" stroke-width="1.4" fill="none"/>`
  );
}

/** 煙突(工場)。 */
function chimney(x, base, h, w = 9, fill = "#a85a42") {
  const bands = [];
  for (let i = 1; i <= 3; i++) bands.push(`<rect x="${r1(x - w / 2 - 1)}" y="${r1(base - (h * i) / 4)}" width="${r1(w + 2)}" height="2.4" fill="#8a4634"/>`);
  return (
    `<path d="M${r1(x - w / 2 - 1.6)},${base}L${r1(x - w / 2 + 1)},${r1(base - h)}h${r1(w - 2)}l${r1(w / 2 + 0.6)},${h}z" fill="${fill}"/>` +
    `<rect x="${r1(x - w / 2 + 0.4)}" y="${r1(base - h - 2.4)}" width="${r1(w - 0.8)}" height="2.8" fill="#7f3a2c"/>` +
    `<g>${bands.join("")}</g>`
  );
}

/** 港のガントリークレーン。 */
function portCrane(x, base, h, fill = "#f5b31c") {
  return (
    `<g stroke="${fill}" stroke-width="4" fill="none"><path d="M${r1(x - 16)},${base}v${r1(-h * 0.6)}M${r1(x + 16)},${base}v${r1(-h * 0.6)}"/></g>` +
    `<path d="M${r1(x - 22)},${r1(base - h * 0.6)}h44v8h-44z" fill="${fill}"/>` +
    `<path d="M${r1(x - 20)},${r1(base - h * 0.6)}v${r1(-h * 0.4)}h10v${r1(h * 0.4)}z" fill="${fill}"/>` +
    `<path d="M${r1(x - 34)},${r1(base - h * 0.94)}h${r1(66)}v5h${r1(-66)}z" fill="#c98a2c"/>` +
    `<path d="M${r1(x + 20)},${r1(base - h * 0.89)}v10h4v-10z" fill="#4a4436"/>` +
    `<rect x="${r1(x - 30)}" y="${r1(base - h * 0.55)}" width="10" height="9" fill="#3f5f70"/>`
  );
}

/** 蓮(池の手前に置くと熱帯の水辺になる)。 */
function lotus(x, y, s = 1) {
  return (
    `<ellipse cx="${x}" cy="${y}" rx="${r1(9 * s)}" ry="${r1(3 * s)}" fill="#3f7a48"/>` +
    `<ellipse cx="${r1(x + 12 * s)}" cy="${r1(y + 4 * s)}" rx="${r1(7 * s)}" ry="${r1(2.4 * s)}" fill="#4f8f52"/>` +
    `<path d="M${r1(x + 2 * s)},${r1(y - 3 * s)}v${r1(-6 * s)}" stroke="#4f8f52" stroke-width="${r1(1.4 * s)}" fill="none"/>` +
    `<g fill="#e8a0b4"><ellipse cx="${r1(x + 2 * s)}" cy="${r1(y - 11 * s)}" rx="${r1(2.4 * s)}" ry="${r1(4 * s)}"/><ellipse cx="${r1(x - 1.4 * s)}" cy="${r1(y - 9.6 * s)}" rx="${r1(2 * s)}" ry="${r1(3.4 * s)}" transform="rotate(-24 ${r1(x - 1.4 * s)} ${r1(y - 9.6 * s)})"/><ellipse cx="${r1(x + 5.4 * s)}" cy="${r1(y - 9.6 * s)}" rx="${r1(2 * s)}" ry="${r1(3.4 * s)}" transform="rotate(24 ${r1(x + 5.4 * s)} ${r1(y - 9.6 * s)})"/></g>`
  );
}

/** 高床式の家(中部高原・デルタ)。 */
function stiltHouse(x, base, w, h, roof = "#8a7a4a", wall = "#a8763c") {
  const legs = [];
  for (let i = 0; i <= 3; i++) legs.push(`<rect x="${r1(x + (i * (w - 4)) / 3)}" y="${r1(base - h * 0.32)}" width="3.4" height="${r1(h * 0.32)}" fill="#6b5330"/>`);
  return (
    `<g>${legs.join("")}</g>` +
    `<rect x="${x}" y="${r1(base - h * 0.8)}" width="${w}" height="${r1(h * 0.48)}" fill="${wall}"/>` +
    `<path d="M${r1(x - 5)},${r1(base - h * 0.8)}h${r1(w + 10)}l${r1(-w / 2 - 5)},${r1(-h * 0.36)}z" fill="${roof}"/>` +
    `<path d="M${r1(x - 5)},${r1(base - h * 0.8)}h${r1(w + 10)}" stroke="#6b5f38" stroke-width="1.6" fill="none"/>` +
    `<rect x="${r1(x + w * 0.4)}" y="${r1(base - h * 0.62)}" width="${r1(w * 0.2)}" height="${r1(h * 0.3)}" fill="#5a4630"/>` +
    `<path d="M${r1(x + w * 0.44)},${r1(base - h * 0.32)}l${r1(-w * 0.16)},${r1(h * 0.32)}" stroke="#6b5330" stroke-width="2.4" fill="none"/>`
  );
}

/** チャムの煉瓦塔。細身で、層が上へ縮む。 */
function chamTowerShape(x, base, h, w, fill = "#a85a42", lit = "#c2725a") {
  const parts = [
    `<rect x="${r1(x - w / 2)}" y="${r1(base - h * 0.62)}" width="${w}" height="${r1(h * 0.62)}" fill="${fill}"/>`,
    `<rect x="${r1(x - w / 2)}" y="${r1(base - h * 0.62)}" width="${r1(w * 0.34)}" height="${r1(h * 0.62)}" fill="${lit}"/>`,
    `<rect x="${r1(x - w * 0.6)}" y="${r1(base - h * 0.66)}" width="${r1(w * 1.2)}" height="${r1(h * 0.06)}" fill="#8a4634"/>`,
  ];
  for (let i = 0; i < 3; i++) {
    const sw = r1(w * (0.78 - i * 0.19));
    const sy = r1(base - h * (0.66 + i * 0.1));
    parts.push(`<rect x="${r1(x - sw / 2)}" y="${r1(sy - h * 0.1)}" width="${sw}" height="${r1(h * 0.1)}" fill="${i % 2 ? lit : fill}"/>`);
  }
  parts.push(
    `<path d="M${r1(x - w * 0.13)},${r1(base - h * 0.96)}h${r1(w * 0.26)}l${r1(-w * 0.13)},${r1(-h * 0.08)}z" fill="#8a4634"/>`,
    `<path d="M${r1(x - w * 0.16)},${r1(base)}v${r1(-h * 0.3)}q${r1(w * 0.16)},${r1(-h * 0.08)} ${r1(w * 0.32)},0v${r1(h * 0.3)}z" fill="#5f3428"/>`,
    `<g fill="#8a4634" opacity=".8"><rect x="${r1(x - w * 0.45)}" y="${r1(base - h * 0.5)}" width="${r1(w * 0.1)}" height="${r1(h * 0.24)}"/><rect x="${r1(x + w * 0.35)}" y="${r1(base - h * 0.5)}" width="${r1(w * 0.1)}" height="${r1(h * 0.24)}"/></g>`,
  );
  return parts.join("");
}

/** 旗竿(赤地に黄星)。 */
function flagOnPole(x, base, h, dir = 1) {
  return (
    `<rect x="${r1(x - 1.4)}" y="${r1(base - h)}" width="2.8" height="${h}" fill="#cfc7b4"/>` +
    `<circle cx="${x}" cy="${r1(base - h - 2)}" r="2.2" fill="#f5b31c"/>` +
    `<path d="M${x},${r1(base - h + 2)}h${r1(dir * 26)}v17h${r1(-dir * 26)}z" fill="#da251d"/>` +
    `<path d="M${r1(x + dir * 13)},${r1(base - h + 5.4)}l1.5,4.4h4.6l-3.7,2.8l1.4,4.4l-3.8,-2.7l-3.8,2.7l1.4,-4.4l-3.7,-2.8h4.6z" fill="#ffcd00"/>`
  );
}

/** 石を積んだ城壁(タインホア・フエ)。 */
function rampart(x, y, w, h, fill = "#9aa094", dark = "#7f8578") {
  const joints = [];
  const rows = Math.max(2, Math.round(h / 9));
  for (let r = 1; r < rows; r++) joints.push(`M${x},${r1(y + (h * r) / rows)}h${w}`);
  for (let c = 1; c * 22 < w; c++) joints.push(`M${r1(x + c * 22)},${y}v${h}`);
  return (
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"/>` +
    `<rect x="${x}" y="${y}" width="${w}" height="3" fill="#b0b4a6"/>` +
    `<path d="${joints.join("")}" stroke="${dark}" stroke-width="1.4" opacity=".7" fill="none"/>`
  );
}

/** 屋根つき市場・作業小屋(トタン)。 */
function shedRoof(x, y, w, h, roof = "#7f8a94", post = "#6b5330") {
  return (
    `<path d="M${r1(x - 5)},${y}h${r1(w + 10)}l${-8},${-h}h${r1(-(w - 6))}z" fill="${roof}"/>` +
    `<rect x="${r1(x - 5)}" y="${y}" width="${r1(w + 10)}" height="2.6" fill="#5f6b74"/>` +
    `<g fill="${post}"><rect x="${x}" y="${y}" width="3.4" height="20"/><rect x="${r1(x + w - 3.4)}" y="${y}" width="3.4" height="20"/></g>`
  );
}

/** 山の稜線(手前と奥で色を変えて層にする)。 */
function ridge(y, fill, pts) {
  const d = pts.map(([x, dy], i) => `${i ? "L" : "M"}${x},${r1(y + dy)}`).join("");
  return `<path d="${d}L400,210H0z" fill="${fill}"/>`;
}

// ---------------------------------------------------------------------------
// 背景シーン(400×210)
// ---------------------------------------------------------------------------

export const VIETNAM_BG = {
  /**
   * ハノイ。**1902年のトラス橋を架け替えず、傷んだ桁を継ぎ足して渡り続けている。**
   * 継ぎ足した新しい桁を左右で色違いにして、そこを見せる(中央は駒に隠れる)。
   */
  bridge:
    sky("#a8c8dc", "#f0e2c8", 96) +
    sun(66, 40, 15, "#f8d98a") +
    `<circle cx="66" cy="40" r="23" fill="#fbeec4" opacity=".28"/>` +
    clouds(300, 30, 1.1, "#f2e8d8") +
    // 対岸の町(小さく、低く)
    band(96, 12, "#8f9a96") +
    `<g fill="#77837f">${[8, 30, 52, 78, 104, 128, 300, 322, 344, 368].map((x, i) => `<rect x="${x}" y="${r1(96 - 6 - (i % 3) * 5)}" width="16" height="${r1(6 + (i % 3) * 5)}"/>`).join("")}</g>` +
    `<g fill="#5f6b66">${[20, 92, 336].map((x) => `<rect x="${x}" y="76" width="4" height="20"/>`).join("")}</g>` +
    // 紅河
    band(108, 62, "#9a8a58") +
    band(108, 14, "#a89a68") +
    ripples(120, "#c4b688", ".55") +
    // 橋脚
    `<g fill="#6f6a5e">${[26, 96, 166, 236, 306, 376].map((x) => `<path d="M${x - 7},170l3,-52h8l3,52z"/>`).join("")}</g>` +
    // 桁とトラス(菱形の格子)
    `<rect x="0" y="112" width="400" height="8" fill="#4f5a5f"/>` +
    `<rect x="0" y="120" width="400" height="4" fill="#3f4a4f"/>` +
    (() => {
      const parts = [];
      for (let s = 0; s < 6; s++) {
        const x0 = s * 70 - 4;
        const top = s % 2 ? 82 : 74;
        const col = s === 1 ? "#8a9aa0" : s === 4 ? "#7f6f5a" : "#5f6b70";
        const lat = [];
        for (let i = 0; i < 5; i++) {
          const a = r1(x0 + (i * 70) / 5);
          const b = r1(x0 + ((i + 1) * 70) / 5);
          lat.push(`M${a},112L${b},${top}M${b},112L${a},${top}`);
        }
        parts.push(
          `<path d="M${x0},112L${r1(x0 + 18)},${top}h${r1(34)}L${r1(x0 + 70)},112z" fill="none" stroke="${col}" stroke-width="3.4"/>`,
          `<path d="${lat.join("")}" stroke="${col}" stroke-width="1.8" opacity=".85" fill="none"/>`,
        );
      }
      return parts.join("");
    })() +
    // 継ぎ足した新しい桁(左右3分の1に置く)
    `<g fill="#b0846a"><rect x="72" y="104" width="42" height="8"/><rect x="292" y="104" width="46" height="8"/></g>` +
    `<g fill="#8a5f48"><rect x="72" y="104" width="42" height="2.4"/><rect x="292" y="104" width="46" height="2.4"/></g>` +
    // 中央を走る列車(左3分の1で見せる)
    `<rect x="18" y="96" width="34" height="16" rx="2.6" fill="#3f6b5a"/>` +
    `<rect x="56" y="98" width="30" height="14" rx="2" fill="#c9a04c"/>` +
    `<rect x="90" y="98" width="30" height="14" rx="2" fill="#c9a04c"/>` +
    `<g fill="#cfe4f0">${[22, 34, 60, 72, 94, 106].map((x) => `<rect x="${x}" y="101" width="8" height="6"/>`).join("")}</g>` +
    // 脇の狭い車線を行くバイクと歩く人(右3分の1)
    motorbike(300, 112, 0.62, "#5b8fe8") +
    motorbike(330, 112, 0.62, "#f5b31c") +
    motorbike(356, 112, 0.62, "#e8443f") +
    person(378, 112, 13, "#f2ede0") +
    // 手前の岸(y>170 の中央は隠れない)
    ground(170, "#8a7a52") +
    `<path d="M0,176q80,-8 160,2q90,12 240,-6v38H0z" fill="#7a6c48"/>` +
    `<g fill="#4f8f3f" opacity=".9"><ellipse cx="60" cy="192" rx="46" ry="8"/><ellipse cx="330" cy="200" rx="60" ry="9"/></g>` +
    bananaPlant(28, 206, 46) +
    bananaPlant(372, 210, 40) +
    // 岸に舫った小舟と、荷を積む人
    sampan(196, 180, 0.8, "#8a5f34") +
    shade(228, 200, 12, 3.4, ".18") +
    person(228, 200, 21, "#e8443f") +
    arm(228, 188, -13, 2) +
    `<g fill="#8a7a4a"><rect x="238" y="192" width="18" height="9" rx="2"/><rect x="238" y="192" width="18" height="2.6"/></g>`,

  /** ハイフォン。港のクレーンと貨物船、火炎樹の並木。 */
  riverport:
    sky("#8fc4e8", "#dce8ee", 92) +
    clouds(94, 28, 1) +
    clouds(320, 22, 0.8) +
    // 対岸の工場と倉庫
    band(92, 10, "#8a9490") +
    `<g fill="#6f7b78">${[10, 46, 84, 300, 340, 372].map((x, i) => `<rect x="${x}" y="${r1(92 - 10 - (i % 2) * 6)}" width="26" height="${r1(10 + (i % 2) * 6)}"/>`).join("")}</g>` +
    // 水
    band(102, 34, "#4f7f8a") +
    band(120, 16, "#5f909a") +
    ripples(108, "#a8d0d8", ".5") +
    // 貨物船(左右へ振る)
    `<path d="M6,118h96l-8,16H14z" fill="#3f4a56"/>` +
    `<path d="M6,118h96v-4H6z" fill="#c2453c"/>` +
    `<rect x="70" y="100" width="24" height="18" fill="#e8e2d4"/>` +
    `<g fill="#3f5f70"><rect x="74" y="104" width="5" height="5"/><rect x="82" y="104" width="5" height="5"/></g>` +
    `<g fill="#f5b31c"><rect x="14" y="108" width="14" height="8"/><rect x="30" y="108" width="14" height="8"/></g>` +
    `<g fill="#5b8fe8"><rect x="46" y="108" width="14" height="8"/><rect x="14" y="100" width="14" height="8"/></g>` +
    `<path d="M300,124h84l-6,12h-72z" fill="#4a5568"/>` +
    `<rect x="356" y="110" width="18" height="14" fill="#e8e2d4"/>` +
    // 岸壁とクレーン(左右3分の1)
    ground(136, "#a89e8c") +
    band(136, 6, "#8f8778") +
    portCrane(66, 136, 76) +
    portCrane(336, 136, 68) +
    `<g fill="#8a8578" opacity=".8"><rect x="118" y="120" width="34" height="16"/><rect x="252" y="122" width="30" height="14"/></g>` +
    // 貨物の箱
    `<g fill="#c2453c"><rect x="120" y="126" width="26" height="10"/></g>` +
    `<g fill="#4f8f6f"><rect x="256" y="128" width="24" height="8"/></g>` +
    // 統治期の並木道
    band(152, 14, "#8f8778") +
    railTrack(150) +
    band(160, 50, "#5f5a52") +
    `<g stroke="#e8e2d4" stroke-width="3" stroke-dasharray="16 18" opacity=".55" fill="none"><path d="M0,186h400"/></g>` +
    flameTree(42, 168, 15) +
    flameTree(112, 172, 13) +
    flameTree(292, 170, 14) +
    flameTree(366, 166, 16) +
    `<g fill="#c9302c" opacity=".85"><circle cx="60" cy="196" r="2.4"/><circle cx="98" cy="204" r="2.2"/><circle cx="308" cy="198" r="2.4"/><circle cx="352" cy="192" r="2.2"/></g>` +
    // 手前(y>170 の中央)にシクロと運転手
    shade(200, 200, 24, 4, ".18") +
    `<g stroke="#33302a" stroke-width="2" fill="none"><circle cx="182" cy="194" r="7"/><circle cx="214" cy="192" r="8"/></g>` +
    `<path d="M176,188h20v-8h-20z" fill="#3f6b8a"/>` +
    `<path d="M176,180q10,-8 20,0z" fill="#e8e2d4"/>` +
    `<path d="M196,186l14,-6" stroke="#4a4436" stroke-width="2.4" fill="none"/>` +
    person(216, 192, 20, "#f5b31c") +
    motorbike(266, 200, 0.9, "#e8443f") +
    motorbike(76, 206, 0.85, "#5b8fe8"),

  /** ナムディン・タイグエン・ビエンホア。赤煉瓦の工場と煙突。夕方の光。 */
  factoryzone:
    sky("#e8a86a", "#f2d4a8", 120) +
    sun(340, 46, 18, "#f8c86a") +
    `<circle cx="340" cy="46" r="28" fill="#fbe6b0" opacity=".3"/>` +
    haze(76, 26, "#f6dcb8", ".5") +
    // 遠くの丘
    hills(96, "#8a7a68", 3) +
    // 煙突と煙(左右3分の1)
    chimney(44, 152, 118, 12) +
    chimney(78, 152, 92, 10) +
    chimney(330, 152, 104, 11) +
    `<g fill="#d8ccc0" opacity=".55"><ellipse cx="46" cy="28" rx="20" ry="8"/><ellipse cx="70" cy="18" rx="14" ry="6"/><ellipse cx="332" cy="40" rx="18" ry="7"/></g>` +
    // 鋸屋根の工場棟
    ground(120, "#8f8778") +
    `<rect x="0" y="106" width="152" height="46" fill="#a85a42"/>` +
    `<rect x="248" y="110" width="152" height="42" fill="#9a5240"/>` +
    (() => {
      const saw = [];
      for (let x = 0; x < 152; x += 24) saw.push(`<path d="M${x},106l12,-14h12v14z" fill="#8a4634"/><path d="M${x + 12},92h12v14h-12z" fill="#5f7f96"/>`);
      for (let x = 248; x < 400; x += 24) saw.push(`<path d="M${x},110l12,-13h12v13z" fill="#7f3a2c"/><path d="M${x + 12},97h12v13h-12z" fill="#4f6b7a"/>`);
      return saw.join("");
    })() +
    `<g fill="#f5b31c">${[8, 32, 56, 80, 104, 128, 256, 280, 304, 328, 352, 376].map((x) => `<rect x="${x}" y="122" width="14" height="12"/>`).join("")}</g>` +
    `<g fill="#7f3a2c">${[8, 32, 56, 80, 104, 128, 256, 280, 304, 328, 352, 376].map((x) => `<rect x="${x - 2}" y="119" width="18" height="3"/>`).join("")}</g>` +
    // 中景の給水塔と架線柱
    `<rect x="182" y="96" width="26" height="14" rx="3" fill="#8a8578"/>` +
    `<g fill="#6f6a5e"><rect x="190" y="110" width="4" height="26"/><rect x="198" y="110" width="4" height="26"/></g>` +
    `<g fill="#5f6b62"><rect x="228" y="88" width="4" height="52"/><rect x="220" y="88" width="20" height="3.4"/></g>` +
    // 引き込み線
    band(152, 12, "#7f7768") +
    railTrack(166) +
    `<rect x="200" y="140" width="60" height="20" rx="2" fill="#4f6b5a"/>` +
    `<g fill="#33302a"><circle cx="212" cy="162" r="4"/><circle cx="248" cy="162" r="4"/></g>` +
    `<g fill="#8a7a4a"><rect x="204" y="132" width="22" height="9"/><rect x="230" y="132" width="22" height="9"/></g>` +
    // 手前(y>170 の中央)に交代の工員
    ground(176, "#6f6858") +
    `<path d="M0,182q90,-6 180,2q100,10 220,-8v34H0z" fill="#5f5a4c"/>` +
    shade(190, 204, 12, 3.4, ".2") +
    person(190, 204, 22, "#5b8fe8") +
    arm(190, 191, 12, 6) +
    shade(214, 202, 11, 3, ".2") +
    person(214, 202, 20, "#e8e2d4") +
    bicycle(252, 202, 0.9) +
    person(252, 200, 20, "#4f8f6f") +
    `<g fill="#c9bda4" opacity=".7"><ellipse cx="60" cy="196" rx="42" ry="7"/><ellipse cx="340" cy="204" rx="50" ry="8"/></g>`,

  /** ニンビン・ハロン・カオバン。石灰岩の塔が水と田に立つ。 */
  karstbay:
    sky("#9cc8e0", "#e0eef0", 128) +
    clouds(140, 26, 1) +
    // 奥の塔(靄でかすませる)
    `<g opacity=".45">${karst(120, 96, 52, 30, "#9aa8a4", "#adb9b2") + karst(196, 96, 40, 24, "#9aa8a4", "#adb9b2") + karst(268, 96, 58, 32, "#9aa8a4", "#adb9b2")}</g>` +
    haze(80, 20, "#eaf2f2", ".7") +
    // 中景の塔(左右3分の1を主役に)
    karst(46, 128, 92, 46) +
    karst(96, 128, 62, 34) +
    karst(336, 130, 100, 50) +
    karst(288, 130, 58, 32) +
    karst(196, 122, 44, 26, "#8a948c", "#a2ac9e") +
    // 水面
    band(128, 36, "#5f9aa8") +
    band(150, 14, "#74aab4") +
    `<g opacity=".28" fill="#3f5f5a">${[46, 96, 196, 288, 336].map((x) => `<ellipse cx="${x}" cy="${134}" rx="22" ry="8"/>`).join("")}</g>` +
    ripples(136, "#bfe0e4", ".55") +
    // 田の畦(ニンビンは水田のなかに塔が立つ)
    ground(164, "#6faa4a") +
    `<path d="M0,170q100,-8 200,0t200,-2v42H0z" fill="#5f9a42"/>` +
    `<g stroke="#c9bda4" stroke-width="2" opacity=".8" fill="none"><path d="M0,178q100,-8 200,0t200,-2M0,196q100,-8 200,0t200,-2"/></g>` +
    `<g stroke="#4f8f3f" stroke-width="1.4" opacity=".7" fill="none"><path d="M20,186v8M52,190v8M84,184v8M300,188v8M340,184v8M372,190v8"/></g>` +
    // 手前(y>170 の中央)に、櫂を足で漕ぐ舟
    ripples(184, "#8fbfa8", ".3") +
    sampan(198, 186, 0.92, "#8a5f34") +
    person(190, 186, 20, "#e8443f") +
    arm(190, 174, 14, -6) +
    conicalHat(190, 168, 8) +
    `<path d="M204,180l24,-14" stroke="#8a6f3c" stroke-width="2.4" fill="none"/>` +
    // 岸の鴨と、飛ぶ鳥
    `<g fill="#f6efe2"><ellipse cx="74" cy="198" rx="7" ry="3.6"/><path d="M79,196c-0.8,-4 1,-5.8 2.8,-5.2c1.4,0.5 1.4,2 0,2.5l-1.2,0.5l0.4,2.6z"/></g>` +
    `<g fill="#f6efe2"><ellipse cx="330" cy="204" rx="7" ry="3.6"/><path d="M335,202c-0.8,-4 1,-5.8 2.8,-5.2c1.4,0.5 1.4,2 0,2.5l-1.2,0.5l0.4,2.6z"/></g>` +
    `<g stroke="#4a4436" stroke-width="1.8" fill="none"><path d="M56,50q5,-5 10,0q5,-5 10,0M330,38q4,-4 8,0q4,-4 8,0"/></g>`,

  /** ハイズオン・イエンバイ・ミトー。川沿いの小さな町。筏と木造船。 */
  riverline:
    sky("#8fc4e8", "#e4ecdc", 96) +
    clouds(66, 26, 0.9) +
    hills(96, "#6f8a5c", 4) +
    // 対岸の家並み(低く、横に長く)
    band(96, 18, "#7f9a6a") +
    `<g>${[6, 40, 74, 268, 306, 344, 376].map((x, i) => tubeHouse(x, r1(84 + (i % 3) * 4), 22, 114, i % 2 ? "#e8dcc0" : "#dcd0b0", "#a2503c")).join("")}</g>` +
    `<g fill="#4f8f3f" opacity=".9"><ellipse cx="130" cy="108" rx="34" ry="10"/><ellipse cx="200" cy="110" rx="40" ry="11"/><ellipse cx="242" cy="106" rx="28" ry="9"/></g>` +
    // 護岸と川
    band(114, 6, "#a89e8c") +
    band(120, 54, "#9a8a58") +
    band(120, 12, "#a89a68") +
    ripples(130, "#c4b688", ".5") +
    // 筏(丸太を並べる)
    `<g fill="#a8763c">${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<rect x="${r1(24 + i * 13)}" y="140" width="12" height="26" rx="5"/>`).join("")}</g>` +
    `<g fill="#7f5a2c">${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<ellipse cx="${r1(30 + i * 13)}" cy="140" rx="6" ry="2.6"/>`).join("")}</g>` +
    `<path d="M22,150h108" stroke="#5f4728" stroke-width="2.6" fill="none"/>` +
    person(74, 140, 20, "#4f8f6f") +
    arm(74, 128, 16, -10) +
    `<path d="M90,118l-8,26" stroke="#8a6f3c" stroke-width="2.4" fill="none"/>` +
    // 舟(波のあとに描く)
    sampan(306, 146, 1, "#8a5f34", "#4f8f6f") +
    sampan(250, 160, 0.7, "#7a5230") +
    // 手前の岸
    ground(174, "#8a7a52") +
    `<path d="M0,180q110,-8 200,2q100,11 200,-8v36H0z" fill="#7a6c48"/>` +
    `<g fill="#4f8f3f" opacity=".85"><ellipse cx="46" cy="196" rx="48" ry="8"/><ellipse cx="352" cy="200" rx="52" ry="8"/></g>` +
    bananaPlant(22, 208, 44) +
    palm(374, 206, 56) +
    // y>170 の中央: 荷を運ぶ二人と天秤棒
    shade(196, 200, 13, 3.6, ".18") +
    person(196, 200, 22, "#e8443f") +
    arm(196, 187, 10, -3) +
    `<path d="M182,182h34" stroke="#8a6f3c" stroke-width="2.6" fill="none"/>` +
    `<g fill="#c9a86e"><path d="M178,183q6,10 12,0z"/><path d="M208,183q6,10 12,0z"/></g>` +
    conicalHat(196, 182, 8) +
    person(232, 204, 20, "#5b8fe8"),

  /** フーリー。貯水池の上に建つ真新しい仏教建築。 */
  reservoirshrine:
    sky("#a0cbe4", "#f0e4d0", 112) +
    sun(330, 36, 16, "#f8d98a") +
    clouds(96, 28, 1) +
    // 奥の山と、その手前の靄
    ridge(84, "#8a94a0", [
      [0, 26],
      [60, -6],
      [130, 18],
      [200, -2],
      [280, 20],
      [340, 2],
      [400, 22],
    ]) +
    haze(80, 18, "#eae4d8", ".6") +
    ridge(104, "#6f8a6a", [
      [0, 10],
      [80, -8],
      [170, 6],
      [260, -6],
      [400, 12],
    ]) +
    // 真新しい大伽藍(左に本堂・右に多層塔。中央は駒に隠れるので低く)
    `<rect x="8" y="98" width="120" height="34" fill="#e0cfae"/>` +
    tiledRoof(8, 98, 120, 22, "#c9a04c", "#a8813c") +
    `<rect x="4" y="94" width="128" height="5" fill="#a8813c"/>` +
    `<g fill="#8a5f34"><rect x="20" y="108" width="14" height="24"/><rect x="46" y="108" width="14" height="24"/><rect x="74" y="108" width="14" height="24"/><rect x="102" y="108" width="14" height="24"/></g>` +
    `<g fill="#c9302c"><rect x="16" y="104" width="106" height="4"/></g>` +
    (() => {
      const tiers = [];
      for (let i = 0; i < 6; i++) {
        const w = r1(40 - i * 4.6);
        const y = r1(126 - i * 15);
        tiers.push(
          `<rect x="${r1(344 - w / 2)}" y="${r1(y - 13)}" width="${w}" height="13" fill="#e0cfae"/>`,
          tiledRoof(r1(344 - w / 2), r1(y - 13), w, 7, "#c9a04c", "#a8813c"),
          `<rect x="${r1(344 - w / 2 + w * 0.32)}" y="${r1(y - 10)}" width="${r1(w * 0.36)}" height="8" fill="#7f5a2c"/>`,
        );
      }
      tiers.push(`<rect x="342" y="26" width="4" height="12" fill="#c9a04c"/><circle cx="344" cy="24" r="3.4" fill="#f5b31c"/>`);
      return tiers.join("");
    })() +
    // 中景の回廊(繰り返しなので中央が隠れても惜しくない)
    `<rect x="136" y="118" width="200" height="16" fill="#e0cfae"/>` +
    tiledRoof(136, 118, 200, 12, "#c9a04c", "#a8813c") +
    `<g fill="#8a5f34">${[144, 168, 192, 216, 240, 264, 288, 312].map((x) => `<rect x="${x}" y="122" width="7" height="12"/>`).join("")}</g>` +
    // 貯水池
    band(134, 42, "#5f92a4") +
    `<g opacity=".3" fill="#e0cfae"><rect x="8" y="134" width="120" height="26"/><rect x="326" y="134" width="36" height="30"/><rect x="136" y="134" width="200" height="16"/></g>` +
    ripples(144, "#bfe0ea", ".55") +
    // 手前の石段と蓮(y>170 の中央)
    ground(176, "#b8ae98") +
    `<g fill="#c9c0ac"><rect x="0" y="176" width="400" height="8"/><rect x="0" y="190" width="400" height="8"/></g>` +
    `<g stroke="#9a9080" stroke-width="1.6" opacity=".8" fill="none"><path d="M0,184h400M0,198h400M70,176v34M200,176v34M320,176v34"/></g>` +
    lotus(150, 172, 1) +
    lotus(238, 176, 1.1) +
    lotus(48, 170, 0.9) +
    shade(196, 200, 12, 3.4, ".18") +
    person(196, 200, 22, "#c9a04c") +
    arm(196, 188, 6, 8) +
    `<g stroke="#8a8578" stroke-width="1.6" fill="none"><path d="M204,196v-8M207,196v-8M210,196v-8"/></g>` +
    `<g fill="#f5b31c"><circle cx="204" cy="187" r="1.4"/><circle cx="207" cy="187" r="1.4"/><circle cx="210" cy="187" r="1.4"/></g>` +
    `<g fill="#a8763c"><rect x="316" y="188" width="26" height="12" rx="2"/><rect x="316" y="186" width="26" height="3"/></g>` +
    person(346, 200, 20, "#e8443f"),

  /** ラオカイ・ランソン。国境の検問所と山。 */
  borderpost:
    sky("#8fc4e8", "#dfe8e0", 112) +
    clouds(320, 24, 0.9) +
    // 国境の向こうの山(高く、青く)
    ridge(88, "#8290a0", [
      [0, 22],
      [50, -12],
      [110, 14],
      [170, -18],
      [240, 10],
      [310, -14],
      [400, 18],
    ]) +
    haze(84, 22, "#e4ecec", ".6") +
    ridge(112, "#5f7a62", [
      [0, 14],
      [70, -8],
      [150, 10],
      [230, -6],
      [320, 12],
      [400, 2],
    ]) +
    `<g fill="#3f6b48" opacity=".8"><ellipse cx="60" cy="120" rx="46" ry="12"/><ellipse cx="290" cy="122" rx="52" ry="12"/></g>` +
    // 検問所の建物(左)と、税関の棟(右)
    ground(140, "#a89e8c") +
    `<rect x="6" y="104" width="92" height="40" fill="#e8dcc0"/>` +
    tiledRoof(6, 104, 92, 16) +
    `<rect x="2" y="100" width="100" height="5" fill="#7f3a2c"/>` +
    `<g fill="#4f6b7a"><rect x="14" y="112" width="14" height="14"/><rect x="36" y="112" width="14" height="14"/><rect x="58" y="112" width="14" height="14"/><rect x="80" y="112" width="12" height="14"/></g>` +
    `<rect x="34" y="130" width="18" height="14" fill="#5a4630"/>` +
    flagOnPole(112, 104, 44, 1) +
    `<rect x="302" y="112" width="94" height="32" fill="#dcd0b0"/>` +
    tiledRoof(302, 112, 94, 13) +
    `<g fill="#4f6b7a"><rect x="310" y="120" width="12" height="12"/><rect x="330" y="120" width="12" height="12"/><rect x="350" y="120" width="12" height="12"/><rect x="370" y="120" width="12" height="12"/></g>` +
    // 門(繰り返しの柱で中央をまたぐ)
    `<g fill="#c9c0ac"><rect x="128" y="96" width="14" height="48"/><rect x="258" y="96" width="14" height="48"/></g>` +
    `<rect x="120" y="84" width="160" height="14" fill="#c2453c"/>` +
    `<rect x="120" y="82" width="160" height="4" fill="#8f3a2c"/>` +
    `<g fill="#f5b31c"><circle cx="140" cy="91" r="3.4"/><circle cx="200" cy="91" r="3.4"/><circle cx="260" cy="91" r="3.4"/></g>` +
    // 線路と道路が並んで越える
    railTrack(152) +
    band(160, 26, "#5f5a52") +
    `<g stroke="#e8e2d4" stroke-width="3" stroke-dasharray="14 16" opacity=".5" fill="none"><path d="M0,174h400"/></g>` +
    // 遮断機(左右3分の1)
    `<g><rect x="86" y="150" width="4" height="24" fill="#8a8578"/><rect x="88" y="152" width="70" height="5" fill="#e8e2d4"/><g fill="#c2453c"><rect x="98" y="152" width="14" height="5"/><rect x="126" y="152" width="14" height="5"/></g></g>` +
    // 手前(y>170 の中央)に待つトラックと係官
    ground(186, "#6f6858") +
    shade(200, 200, 34, 5, ".2") +
    `<rect x="164" y="176" width="44" height="22" rx="2" fill="#4f8f6f"/>` +
    `<path d="M208,176h26l10,12v10h-36z" fill="#3f6b5a"/>` +
    `<rect x="214" y="180" width="16" height="9" fill="#a8d0d8"/>` +
    `<g fill="#33302a"><circle cx="180" cy="200" r="6"/><circle cx="230" cy="200" r="6"/></g>` +
    `<g fill="#8a8578"><circle cx="180" cy="200" r="2.2"/><circle cx="230" cy="200" r="2.2"/></g>` +
    shade(268, 204, 11, 3, ".2") +
    person(268, 204, 22, "#4f6b8a") +
    arm(268, 191, 12, -4) +
    person(64, 202, 20, "#e8443f") +
    `<g fill="#8a7a4a"><rect x="76" y="192" width="20" height="12" rx="2"/></g>`,

  /** ディエンビエンフー・ホアビン。険しい谷。道が乏しい。 */
  northwesthighland:
    sky("#a0c4d8", "#e8eee4", 78 + 22) +
    clouds(280, 26, 1) +
    // 何重もの稜線(奥から手前へ濃く)
    ridge(100, "#8a95a4", [
      [0, 4],
      [60, -26],
      [130, -6],
      [190, -30],
      [260, -8],
      [330, -28],
      [400, -4],
    ]) +
    haze(88, 22, "#e8eef0", ".62") +
    ridge(120, "#6f8290", [
      [0, 4],
      [70, -22],
      [150, 2],
      [220, -20],
      [300, 0],
      [400, -16],
    ]) +
    ridge(140, "#4f7059", [
      [0, 6],
      [80, -18],
      [160, 4],
      [250, -16],
      [340, 2],
      [400, -10],
    ]) +
    `<g fill="#3f6348" opacity=".9"><ellipse cx="40" cy="140" rx="46" ry="12"/><ellipse cx="150" cy="146" rx="40" ry="11"/><ellipse cx="300" cy="140" rx="50" ry="12"/></g>` +
    // 谷底の川
    `<path d="M120,210q40,-40 90,-58q40,-14 60,-34l16,6q-24,24 -62,40q-46,20 -76,46z" fill="#7fa8b0" opacity=".95"/>` +
    // 段々畑
    terraces(146, 186, 5) +
    // 細い山道(つづら折り)
    `<path d="M0,178q40,-14 78,-4q40,10 74,-8q34,-18 74,-6" stroke="#c9bda4" stroke-width="4" fill="none" opacity=".9"/>` +
    `<path d="M0,178q40,-14 78,-4q40,10 74,-8q34,-18 74,-6" stroke="#a89e8c" stroke-width="1.4" fill="none"/>` +
    // 高床の家(左)と物干し
    stiltHouse(28, 174, 52, 46) +
    stiltHouse(306, 182, 46, 40, "#7f6f42", "#9a6f38") +
    `<g stroke="#8a8578" stroke-width="1.2" fill="none"><path d="M84,158h26"/></g>` +
    `<g fill="#5b8fe8"><rect x="88" y="158" width="7" height="10"/></g>` +
    `<g fill="#e8443f"><rect x="99" y="158" width="7" height="9"/></g>` +
    // 手前(y>170 の中央)に、荷を積んだ自転車を押す人
    ground(190, "#5f7a46") +
    `<path d="M0,196q100,-8 200,2q100,10 200,-6v20H0z" fill="#4f6b3c"/>` +
    shade(200, 204, 26, 4, ".2") +
    bicycle(196, 202, 1.15) +
    `<g fill="#8a7a4a"><rect x="184" y="180" width="26" height="14" rx="2"/><rect x="188" y="172" width="20" height="10" rx="2"/></g>` +
    `<path d="M182,186h30" stroke="#5f4728" stroke-width="1.6" fill="none"/>` +
    person(222, 204, 22, "#e8443f") +
    arm(222, 191, -14, 2) +
    // 手前の笹と岩
    `<g stroke="#3f6b48" stroke-width="2" stroke-linecap="round" fill="none"><path d="M18,210v-14M26,210v-18M34,210v-13M368,210v-16M378,210v-12"/></g>` +
    `<path d="M330,210q10,-16 26,-14q14,2 18,14z" fill="#6f6a5e"/>`,

  /** タインホア・フエ。石と煉瓦の重厚な城壁・宮門。 */
  citadel:
    sky("#9cc4dc", "#e4dcc8", 92) +
    clouds(80, 26, 1) +
    sun(58, 40, 14, "#f8d98a") +
    // 城内の樹と遠い旗楼
    band(92, 22, "#8a9a7a") +
    `<g fill="#4f7f4a" opacity=".9"><ellipse cx="40" cy="98" rx="40" ry="12"/><ellipse cx="120" cy="100" rx="36" ry="11"/><ellipse cx="300" cy="98" rx="44" ry="12"/><ellipse cx="370" cy="102" rx="32" ry="10"/></g>` +
    // 旗楼(左3分の1)
    `<g fill="#8f9488"><rect x="36" y="88" width="56" height="12"/><rect x="44" y="76" width="40" height="12"/><rect x="52" y="64" width="24" height="12"/></g>` +
    flagOnPole(64, 64, 46, 1) +
    // 城壁
    rampart(0, 114, 400, 38) +
    `<g fill="#9aa094">${[6, 34, 62, 90, 118, 146, 174, 202, 230, 258, 286, 314, 342, 370].map((x) => `<rect x="${x}" y="108" width="18" height="7"/>`).join("")}</g>` +
    // 楼門(右3分の1に主役を寄せる)
    `<rect x="268" y="96" width="112" height="56" fill="#8f6a4a"/>` +
    `<rect x="268" y="96" width="112" height="6" fill="#a8815c"/>` +
    tiledRoof(268, 96, 112, 22) +
    `<rect x="264" y="92" width="120" height="6" fill="#7f3a2c"/>` +
    `<rect x="288" y="66" width="72" height="26" fill="#c9302c"/>` +
    tiledRoof(288, 66, 72, 16) +
    `<g fill="#f5b31c"><rect x="296" y="74" width="12" height="12"/><rect x="318" y="74" width="12" height="12"/><rect x="340" y="74" width="12" height="12"/></g>` +
    `<path d="M304,152v-26a20,20 0 0 1 40,0v26z" fill="#3f2f20"/>` +
    `<path d="M300,152v-28a24,24 0 0 1 48,0v28h-4v-26a20,20 0 0 0 -40,0v26z" fill="#a8815c"/>` +
    `<g fill="#3f2f20"><path d="M276,152v-18a10,10 0 0 1 20,0v18z"/><path d="M352,152v-18a10,10 0 0 1 20,0v18z"/></g>` +
    // 濠
    band(152, 30, "#4f8090") +
    `<g opacity=".28" fill="#8f6a4a"><rect x="268" y="152" width="112" height="22"/></g>` +
    ripples(160, "#a8d0d8", ".5") +
    lotus(120, 168, 1.1) +
    lotus(200, 176, 1.2) +
    lotus(56, 172, 0.95) +
    // 手前の岸(y>170 の中央)
    ground(182, "#7f8a5f") +
    `<path d="M0,188q100,-8 200,2q100,10 200,-6v26H0z" fill="#6f7f4c"/>` +
    `<g stroke="#8a9a52" stroke-width="1.8" stroke-linecap="round" fill="none"><path d="M24,206v-12M32,206v-9M368,204v-12M376,204v-8"/></g>` +
    shade(196, 202, 12, 3.4, ".18") +
    person(196, 202, 22, "#e8e2d4") +
    arm(196, 190, 13, 4) +
    `<path d="M209,193l16,-3" stroke="#8a6f3c" stroke-width="2" fill="none"/>` +
    person(232, 206, 20, "#5b8fe8") +
    bicycle(92, 202, 0.95),

  /** ヴィン。規則正しい窓の集合住宅群。 */
  blockcity:
    sky("#8fc4e8", "#e0e8ee", 96) +
    clouds(64, 26, 0.9) +
    clouds(330, 22, 0.8) +
    // 奥の棟(小さく)
    band(96, 14, "#b8b0a0") +
    ground(110, "#c6bda8") +
    blockSlab(0, 74, 74, 110, "#c8bfa8") +
    blockSlab(330, 78, 70, 110, "#c8bfa8") +
    // 主役の棟(左右へ振り分け、中央は低い共同棟)
    blockSlab(8, 92, 116, 156, "#dcd2b8") +
    blockSlab(280, 88, 118, 156, "#d8cdb2") +
    `<rect x="136" y="122" width="128" height="34" fill="#cfc4a8"/>` +
    `<g fill="#5f7284">${[144, 168, 192, 216, 240].map((x) => `<rect x="${x}" y="130" width="14" height="11"/>`).join("")}</g>` +
    `<rect x="132" y="118" width="136" height="5" fill="#a89e8c"/>` +
    // 洗濯物(暮らしの気配)
    `<g stroke="#8a8578" stroke-width="1" fill="none"><path d="M18,116h100M290,112h96"/></g>` +
    `<g fill="#e8443f"><rect x="26" y="116" width="8" height="12"/><rect x="300" y="112" width="8" height="12"/></g>` +
    `<g fill="#5b8fe8"><rect x="42" y="116" width="9" height="14"/><rect x="322" y="112" width="9" height="13"/></g>` +
    `<g fill="#f5b31c"><rect x="60" y="116" width="8" height="11"/><rect x="344" y="112" width="8" height="12"/></g>` +
    `<g fill="#f6efe2"><rect x="78" y="116" width="10" height="13"/><rect x="362" y="112" width="10" height="12"/></g>` +
    // 街路樹と歩道
    ground(156, "#a89e8c") +
    `<g fill="#4f8f4a"><ellipse cx="128" cy="146" rx="18" ry="12"/><ellipse cx="272" cy="144" rx="18" ry="12"/></g>` +
    `<g fill="#6b5330"><rect x="126" y="146" width="4" height="12"/><rect x="270" y="144" width="4" height="14"/></g>` +
    band(162, 32, "#5f5a52") +
    `<g stroke="#e8e2d4" stroke-width="3" stroke-dasharray="16 18" opacity=".5" fill="none"><path d="M0,178h400"/></g>` +
    // 手前(y>170 の中央)に茶屋(低い椅子)とバイクの列
    ground(194, "#8f8778") +
    shade(200, 206, 30, 5, ".18") +
    `<g fill="#4f8f6f"><rect x="176" y="184" width="42" height="4" rx="2"/><rect x="180" y="188" width="4" height="10"/><rect x="210" y="188" width="4" height="10"/></g>` +
    `<g fill="#c9a04c"><rect x="186" y="180" width="10" height="5" rx="2"/><rect x="200" y="180" width="10" height="5" rx="2"/></g>` +
    person(232, 202, 22, "#e8443f") +
    arm(232, 190, -12, -3) +
    person(164, 200, 20, "#5b8fe8") +
    motorbike(60, 204, 1, "#f5b31c") +
    motorbike(110, 200, 0.9, "#e8443f") +
    motorbike(316, 204, 1, "#4f8f6f") +
    motorbike(362, 198, 0.85, "#5b8fe8"),

  /** ハティン・トゥイホア・ファンティエット・カマウ。漁船の並ぶ浜。 */
  coastalfishing:
    sky("#8fc4e8", "#f0dcc0", 82) +
    sun(60, 34, 15, "#f8d98a") +
    clouds(230, 26, 1) +
    // 岬と沖の島
    `<path d="M0,86q46,-16 92,-2l10,10H0z" fill="#5f7a62"/>` +
    `<path d="M340,88q22,-10 44,-2l16,10h-60z" fill="#6f8a6a"/>` +
    // 海
    band(82, 44, "#2a7a95") +
    band(104, 34, "#3f9ab0") +
    ripples(92, "#a8d8e0", ".5") +
    // 沖の漁船(左右に振る)
    `<path d="M36,110h44l-6,10H42z" fill="#3f5f6a"/>` +
    `<rect x="52" y="100" width="14" height="10" fill="#e8e2d4"/>` +
    `<path d="M312,104h40l-6,9h-28z" fill="#4a5568"/>` +
    `<rect x="326" y="96" width="12" height="8" fill="#e8e2d4"/>` +
    // 波打ちぎわ
    `<path d="M0,124q60,8 120,0t130,4q80,4 150,-6v12H0z" fill="#7fc4cc"/>` +
    `<path d="M0,132q60,6 120,-1t130,4q80,4 150,-5v8H0z" fill="#e0f0f2"/>` +
    // 砂浜と、青い木造漁船
    ground(138, "#e0cca0") +
    `<path d="M0,150q90,-8 180,0q100,9 220,-6v66H0z" fill="#d4bd8a"/>` +
    `<g>${[
      [34, 152, 1],
      [104, 158, 0.9],
      [300, 154, 1.05],
      [366, 162, 0.85],
    ]
      .map(([x, y, s]) => sampan(x, y, s, "#2f6b8a", "#c9302c"))
      .join("")}</g>` +
    `<g stroke="#5f4728" stroke-width="2" fill="none"><path d="M34,152v-16M300,154v-18M104,158v-12"/></g>` +
    `<g fill="#f5b31c"><path d="M34,136h16v8h-16z"/><path d="M300,136h16v8h-16z"/></g>` +
    // 干し網の櫓
    `<g stroke="#8a6f3c" stroke-width="2.6" fill="none"><path d="M140,176v-24M180,176v-24M140,152h40"/></g>` +
    `<path d="M140,152h40v22h-40z" fill="none" stroke="#c9bda4" stroke-width="1" stroke-dasharray="3 3"/>` +
    // 手前(y>170 の中央)に、丸い籠舟(タンチャイ)と網を繕う人
    shade(232, 200, 26, 5, ".18") +
    `<ellipse cx="232" cy="192" rx="28" ry="15" fill="#a8763c"/>` +
    `<ellipse cx="232" cy="190" rx="24" ry="12" fill="#c9a86e"/>` +
    `<g stroke="#8a6f3c" stroke-width="1.2" fill="none"><ellipse cx="232" cy="190" rx="17" ry="8.4"/><ellipse cx="232" cy="190" rx="10" ry="5"/><path d="M232,178v24M208,190h48"/></g>` +
    shade(186, 202, 12, 3.4, ".18") +
    person(186, 202, 22, "#e8e2d4") +
    arm(186, 190, -14, 4) +
    `<path d="M150,196q22,-8 38,-2" stroke="#c9bda4" stroke-width="1.4" fill="none"/>` +
    `<path d="M148,198q20,-6 36,0" stroke="#c9bda4" stroke-width="1.4" fill="none"/>` +
    conicalHat(186, 184, 8) +
    palm(376, 200, 62) +
    `<g fill="#f0e6d2"><ellipse cx="70" cy="196" rx="5" ry="3"/><ellipse cx="84" cy="202" rx="4" ry="2.4"/><ellipse cx="330" cy="204" rx="4.4" ry="2.6"/></g>`,

  /** ドンホイ。巨大な洞窟の内部。天井の穴から光とジャングルが差す。 */
  bigcave:
    // 洞内の暗がりを地色にして、そこへ光を落とす
    band(0, 118, "#3a3730") +
    band(0, 40, "#2e2b26") +
    ground(118, "#4a453c") +
    // 天井の穴(左寄せ。中央は駒に隠れる)
    `<path d="M64,0h150q-8,26 -34,36q-30,12 -66,2Q76,28 64,0z" fill="#b7d8ea"/>` +
    `<path d="M64,0h150q-8,26 -34,36q-30,12 -66,2Q76,28 64,0z" fill="#dff0f6" opacity=".5"/>` +
    // 穴のふちに垂れるジャングル
    `<g fill="#3f7a48">${[74, 96, 118, 142, 166, 190].map((x, i) => `<ellipse cx="${x}" cy="${r1(6 + (i % 3) * 5)}" rx="16" ry="${r1(9 + (i % 2) * 4)}"/>`).join("")}</g>` +
    `<g stroke="#4f8f52" stroke-width="2" stroke-linecap="round" fill="none"><path d="M86,14v22M112,18v30M140,16v26M168,20v34M196,14v20"/></g>` +
    `<g fill="#5faa5a" opacity=".9"><circle cx="86" cy="38" r="4"/><circle cx="112" cy="50" r="4.4"/><circle cx="140" cy="44" r="3.6"/><circle cx="168" cy="56" r="4.2"/></g>` +
    // 光の柱
    `<path d="M78,10L52,178h176L196,10z" fill="#e8f2ea" opacity=".16"/>` +
    `<path d="M104,10L92,178h84L166,10z" fill="#f2f8f0" opacity=".18"/>` +
    // 鍾乳石(天井から)
    `<g fill="#5f5850">${[0, 18, 232, 254, 276, 300, 326, 352, 378].map((x, i) => `<path d="M${x},0h18l-9,${r1(26 + (i % 4) * 12)}z"/>`).join("")}</g>` +
    `<g fill="#6f6558">${[210, 240, 268, 298, 330, 366].map((x, i) => `<path d="M${x},0h12l-6,${r1(16 + (i % 3) * 10)}z"/>`).join("")}</g>` +
    // 洞窟の壁(左右の額縁。隅だけにする)
    `<path d="M0,0h44q-6,60 4,118q8,48 -4,92H0z" fill="#2e2b26"/>` +
    `<path d="M400,0h-52q10,58 0,116q-10,50 2,94h50z" fill="#332f2a"/>` +
    `<g stroke="#48443c" stroke-width="2" opacity=".8" fill="none"><path d="M14,30q10,26 4,52M28,96q8,30 0,58M366,40q-8,28 -2,54M382,110q6,28 -2,54"/></g>` +
    // 石筍(床から)
    `<g fill="#6f6558">${[
      [42, 34],
      [70, 22],
      [286, 40],
      [318, 26],
      [348, 32],
    ]
      .map(([x, h]) => `<path d="M${x - 7},152l7,${-h}l7,${h}z"/>`)
      .join("")}</g>` +
    // 洞内の川(光が当たる)
    `<path d="M0,168q90,-16 190,-4q110,14 210,-6v52H0z" fill="#2f5f6a"/>` +
    `<path d="M92,168q40,-6 84,0q-40,10 -84,0z" fill="#8fc4cc" opacity=".55"/>` +
    ripples(180, "#5f9aa8", ".45") +
    // 手前(y>170 の中央)に、頭灯を点けた小さな人。**洞窟の大きさが伝わる**
    `<path d="M0,190q110,-10 200,0q100,11 200,-6v26H0z" fill="#3f3a33"/>` +
    shade(200, 202, 10, 3, ".3") +
    person(200, 202, 18, "#f5b31c") +
    arm(200, 192, 11, -5) +
    `<circle cx="200" cy="188" r="3.6" fill="#e8e2d4"/>` +
    `<path d="M203,186l30,-8v14z" fill="#fbeec4" opacity=".45"/>` +
    person(176, 206, 17, "#e8443f") +
    `<g fill="#5f5850"><path d="M240,210q10,-20 26,-18q16,2 20,18z"/><path d="M30,210q8,-14 20,-12q12,2 14,12z"/></g>`,

  /**
   * ドンハー。**ベンハイ川。1954〜75年の分断線そのもの。**
   * 両岸に旗竿が立ち、橋は半分ずつ違う色に塗られていた。
   * 戦争の道具は描かず、**いま自転車が渡っている**ところを見せる。
   */
  flagriver:
    sky("#8fc4e8", "#f2e4c8", 92) +
    sun(200, 44, 17, "#f8d98a") +
    `<circle cx="200" cy="44" r="26" fill="#fbeec4" opacity=".25"/>` +
    clouds(88, 26, 1) +
    clouds(316, 22, 0.85) +
    // 両岸の低い町(左右3分の1)
    band(92, 16, "#8a9a72") +
    `<g>${[4, 30, 56, 316, 344, 372].map((x, i) => tubeHouse(x, r1(80 + (i % 2) * 6), 20, 108, i % 2 ? "#e8dcc0" : "#dcd0b0")).join("")}</g>` +
    `<g fill="#4f8f4a" opacity=".9"><ellipse cx="96" cy="102" rx="34" ry="10"/><ellipse cx="290" cy="104" rx="36" ry="10"/></g>` +
    // 旗竿(左右で向かい合う)
    flagOnPole(84, 108, 66, 1) +
    flagOnPole(320, 108, 66, -1) +
    // 川
    band(108, 56, "#6f9aa8") +
    band(108, 14, "#7fa8b4") +
    ripples(120, "#bfe0e8", ".5") +
    // 橋(左半分と右半分で色が違う)
    `<rect x="0" y="118" width="200" height="7" fill="#c9c0ac"/>` +
    `<rect x="200" y="118" width="200" height="7" fill="#7f96a8"/>` +
    `<rect x="0" y="125" width="400" height="3" fill="#5f6b70"/>` +
    (() => {
      const rails = [];
      for (let x = 6; x < 400; x += 16) rails.push(`<rect x="${x}" y="108" width="3" height="10" fill="${x < 200 ? "#dfd8c8" : "#8fa4b4"}"/>`);
      return `<g>${rails.join("")}</g><rect x="0" y="106" width="200" height="3.4" fill="#dfd8c8"/><rect x="200" y="106" width="200" height="3.4" fill="#8fa4b4"/>`;
    })() +
    `<g fill="#6f6a5e">${[36, 116, 196, 276, 356].map((x) => `<path d="M${x - 6},164l2,-36h8l2,36z"/>`).join("")}</g>` +
    // 川の真ん中に立つ標柱(境の跡)
    `<rect x="198" y="96" width="4" height="22" fill="#8a8578"/>` +
    `<rect x="192" y="92" width="16" height="6" fill="#c9bda4"/>` +
    // 橋を渡る自転車とバイク(左右3分の1へ)
    bicycle(104, 118, 0.75) +
    person(104, 116, 15, "#e8443f") +
    motorbike(292, 118, 0.62, "#5b8fe8") +
    person(58, 118, 14, "#f5b31c") +
    // 手前の岸(y>170 の中央)
    ground(164, "#8a8f5a") +
    `<path d="M0,172q100,-8 200,2q100,10 200,-8v44H0z" fill="#77803f"/>` +
    `<g stroke="#9aa452" stroke-width="1.8" stroke-linecap="round" fill="none"><path d="M14,204v-14M22,204v-10M34,206v-13M360,202v-14M372,204v-10M382,200v-12"/></g>` +
    // 川面に近い舟着き場と、荷を積む親子
    sampan(88, 174, 0.8, "#8a5f34") +
    shade(200, 200, 14, 4, ".18") +
    person(200, 200, 23, "#e8e2d4") +
    arm(200, 187, 13, 5) +
    person(220, 202, 15, "#5b8fe8") +
    `<g fill="#8a7a4a"><rect x="234" y="190" width="22" height="12" rx="2"/><rect x="234" y="188" width="22" height="3"/></g>` +
    `<g fill="#c9302c"><circle cx="240" cy="186" r="2.6"/><circle cx="248" cy="185" r="2.6"/></g>`,

  /** ダナン。雲の峠。急勾配とトンネル、海を見下ろす。 */
  cloudpass:
    sky("#8fc4e8", "#e4eef0", 74 + 24) +
    clouds(300, 28, 1.1) +
    // 雲がかかる稜線(峠の名の由来)。**海より先に置く**(あとに置くと海を塗りつぶす)
    ridge(96, "#7f8f9c", [
      [0, 6],
      [50, -28],
      [110, -6],
      [170, -22],
      [232, 2],
      [280, -14],
      [400, 6],
    ]) +
    haze(70, 22, "#eef4f6", ".72") +
    // 山塊。**奥の稜線の色が下端まで残らないように、ここで一度塗りつぶす**
    ground(120, "#4f6b52") +
    // 眼下の海(右側)
    `<path d="M232,98h168v54H232z" fill="#2f8aa4"/>` +
    `<path d="M232,124h168v28H232z" fill="#46a2b6"/>` +
    `<g stroke="#a8d8e0" stroke-width="2" opacity=".5" fill="none"><path d="M258,110h50M330,118h56M270,138h44M340,142h50"/></g>` +
    `<path d="M334,132h34l-5,8h-24z" fill="#3f5f6a"/>` +
    // 岬
    `<path d="M232,98q40,-16 80,-8l14,10z" fill="#5f7a62"/>` +
    // 海より下の斜面(右下)
    `<path d="M400,210V148q-72,2 -124,28Q232,198 216,210z" fill="#4f6b52"/>` +
    `<path d="M400,210V172q-52,2 -92,16q-30,10 -44,22z" fill="#3f5a44"/>` +
    // 山肌(手前)
    `<path d="M0,84q60,10 108,44q46,32 74,82H0z" fill="#4f6b52"/>` +
    `<path d="M0,120q52,10 92,44q36,30 52,46H0z" fill="#3f5a44"/>` +
    `<path d="M156,210q-24,-52 -70,-84Q42,96 0,86v16q46,12 84,44q40,34 58,64z" fill="#5f7f5c"/>` +
    // 手前の斜面(ここを欠くと奥の稜線の色が下端まで残る)
    `<path d="M0,210V138q72,16 132,48q42,22 74,24z" fill="#4f6b52"/>` +
    `<path d="M0,210V170q56,8 104,26q28,10 52,14z" fill="#3f5a44"/>` +
    // うねる線路とトンネル坑口(左3分の1)
    `<path d="M0,146q46,4 78,26q30,20 44,38" stroke="#8a8578" stroke-width="11" fill="none"/>` +
    `<path d="M0,146q46,4 78,26q30,20 44,38" stroke="#6f6a5e" stroke-width="2" fill="none"/>` +
    (() => {
      const ties = [];
      for (let i = 0; i <= 12; i++) {
        const t = i / 12;
        const [px, py] = qpt(0, 146, 78, 172, 122, 210, t);
        ties.push(`<rect x="${r1(px - 5)}" y="${r1(py - 3)}" width="10" height="5" fill="#6b5330" transform="rotate(${r1(24 + t * 16)} ${r1(px)} ${r1(py)})"/>`);
      }
      return `<g>${ties.join("")}</g>`;
    })() +
    `<path d="M22,152v-18a16,16 0 0 1 32,0v18z" fill="#3a3730"/>` +
    `<path d="M18,152v-20a20,20 0 0 1 40,0v20h-4v-18a16,16 0 0 0 -32,0v18z" fill="#a89e8c"/>` +
    `<rect x="14" y="126" width="48" height="5" fill="#8f8778"/>` +
    // トンネルから出てくる列車
    `<rect x="54" y="130" width="30" height="20" rx="3" fill="#3f6b5a"/>` +
    `<rect x="58" y="134" width="9" height="7" fill="#cfe4f0"/>` +
    `<rect x="70" y="134" width="9" height="7" fill="#cfe4f0"/>` +
    `<circle cx="60" cy="150" r="3.4" fill="#33302a"/><circle cx="78" cy="150" r="3.4" fill="#33302a"/>` +
    // 山側の斜面の茶畑・草
    `<g fill="#6f9a52" opacity=".85"><ellipse cx="150" cy="150" rx="34" ry="10"/><ellipse cx="196" cy="168" rx="30" ry="9"/></g>` +
    // 手前(y>170 の中央)にこちらへ来る線路と信号
    `<path d="M120,210L176,152h18l-40,58z" fill="#8a8578"/>` +
    `<g fill="#6b5330">${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${r1(158 - i * 9)}" y="${r1(160 + i * 9)}" width="${r1(22 + i * 3)}" height="5" transform="rotate(-34 ${r1(169 - i * 9)} ${r1(162 + i * 9)})"/>`).join("")}</g>` +
    `<g stroke="#5a5750" stroke-width="2" fill="none"><path d="M176,152L128,210M190,152L150,210"/></g>` +
    `<g><rect x="228" y="156" width="4" height="46" fill="#6f6a5e"/><rect x="222" y="152" width="16" height="12" rx="3" fill="#3a3730"/><circle cx="230" cy="158" r="3.4" fill="#4fd07a"/></g>` +
    `<path d="M300,210q14,-34 44,-42q26,-8 56,4v38z" fill="#3f5a44"/>` +
    `<g stroke="#5f8f52" stroke-width="2.4" stroke-linecap="round" fill="none"><path d="M330,210v-16M342,210v-20M356,210v-14"/></g>`,

  /** ホイアン。間口の狭い古い商家と提灯。夕方。 */
  oldquarter:
    sky("#e8a86a", "#f6d8a8", 88) +
    sun(48, 40, 16, "#f8c86a") +
    haze(70, 22, "#f6dcb8", ".45") +
    // 奥の屋根の連なり
    band(88, 14, "#8a6a52") +
    `<g fill="#7f5240">${[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360].map((x, i) => `<path d="M${x},88l${r1(16 + (i % 3) * 2)},-${r1(9 + (i % 2) * 4)}l16,${r1(9 + (i % 2) * 4)}z"/>`).join("")}</g>` +
    // 商家の列(狭い間口を並べる。中央が隠れても繰り返しなので惜しくない)
    ground(102, "#c9a86e") +
    `<g>${[
      [0, 90, 26, "#e8c46a"],
      [28, 82, 22, "#dcb45c"],
      [52, 94, 24, "#efd9a0"],
      [78, 86, 20, "#e0a85c"],
      [100, 92, 26, "#e8c46a"],
      [128, 84, 22, "#d8b06a"],
      [152, 96, 24, "#efd9a0"],
      [178, 88, 20, "#e0a85c"],
      [200, 90, 26, "#e8c46a"],
      [228, 82, 22, "#dcb45c"],
      [252, 94, 24, "#efd9a0"],
      [278, 86, 22, "#e0a85c"],
      [302, 92, 26, "#e8c46a"],
      [330, 84, 22, "#d8b06a"],
      [354, 94, 24, "#efd9a0"],
      [380, 88, 20, "#e0a85c"],
    ]
      .map(([x, top, w, wall]) => tubeHouse(x, top, w, 156, wall))
      .join("")}</g>` +
    // 軒に吊るした提灯の列(左右へ多く)
    `<g stroke="#5a4630" stroke-width="1" fill="none"><path d="M0,120h400"/></g>` +
    `<g>${[
      [10, "#e8443f"],
      [34, "#f5b31c"],
      [58, "#c9302c"],
      [82, "#f5b31c"],
      [106, "#e8443f"],
      [286, "#f5b31c"],
      [310, "#e8443f"],
      [334, "#c9302c"],
      [358, "#f5b31c"],
      [382, "#e8443f"],
    ]
      .map(([x, c]) => lantern(x, 122, 16, c))
      .join("")}</g>` +
    // 石畳の通り
    band(156, 12, "#b8ae98") +
    ground(168, "#a89e8c") +
    `<g stroke="#8f8778" stroke-width="2" opacity=".7" fill="none"><path d="M0,178h400M0,192h400M0,206h400M52,168v42M148,168v42M252,168v42M348,168v42"/></g>` +
    // 手前(y>170 の中央)に低い提灯・屋台と歩く人
    `<g>${[
      [150, "#e8443f"],
      [176, "#f5b31c"],
      [224, "#c9302c"],
      [250, "#f5b31c"],
    ]
      .map(([x, c]) => lantern(x, 168, 22, c))
      .join("")}</g>` +
    shade(200, 204, 14, 4, ".18") +
    person(200, 204, 23, "#e8e2d4") +
    arm(200, 191, -13, 6) +
    person(178, 206, 20, "#5b8fe8") +
    `<g fill="#8a5f34"><rect x="292" y="188" width="46" height="6" rx="2"/><rect x="296" y="194" width="4" height="12"/><rect x="330" y="194" width="4" height="12"/></g>` +
    `<g fill="#c9302c"><circle cx="302" cy="184" r="3.6"/><circle cx="312" cy="183" r="3.6"/><circle cx="322" cy="184" r="3.6"/></g>` +
    person(356, 204, 21, "#f5b31c") +
    bicycle(52, 202, 0.95),

  /** クアンガイ。甕棺の発掘現場。 */
  digsite:
    sky("#9cc8e0", "#ecdcbc", 94) +
    sun(336, 38, 15, "#f8d98a") +
    clouds(90, 24, 0.9) +
    hills(94, "#8a9a6a", 3) +
    // 遠くの砂丘と防風林
    band(94, 16, "#c9b48a") +
    `<g fill="#4f7f4a" opacity=".9"><ellipse cx="46" cy="100" rx="40" ry="10"/><ellipse cx="150" cy="102" rx="34" ry="9"/><ellipse cx="330" cy="100" rx="44" ry="10"/></g>` +
    // 掘り出した地層
    ground(110, "#c9a86e") +
    band(110, 16, "#d8b878") +
    band(126, 20, "#bf9a62") +
    band(146, 24, "#a8824c") +
    `<g stroke="#8f6c3c" stroke-width="1.4" opacity=".6" fill="none"><path d="M0,126h400M0,146h400M0,168h400"/></g>` +
    // 発掘の区画(縄と杭。繰り返しなので中央が隠れてよい)
    `<g fill="#c9bda4">${[24, 92, 160, 228, 296, 364].map((x) => `<rect x="${x}" y="112" width="3.4" height="20"/>`).join("")}</g>` +
    `<g stroke="#e8e2d4" stroke-width="1.4" fill="none"><path d="M24,116h348M24,126h348M24,112v20M92,112v20M160,112v20M228,112v20M296,112v20M364,112v20"/></g>` +
    // 掘り出された甕(左右3分の1)
    `<g>${[
      [40, 156, 1],
      [78, 162, 0.8],
      [318, 158, 0.95],
      [356, 164, 0.75],
    ]
      .map(([x, y, s]) => {
        const w = r1(17 * s);
        const h = r1(24 * s);
        return (
          `<path d="M${r1(x - w)},${r1(y - h * 0.55)}q0,${r1(h * 0.62)} ${w},${r1(h * 0.62)}q${w},0 ${w},${r1(-h * 0.62)}q0,${r1(-h * 0.5)} ${r1(-w * 0.62)},${r1(-h * 0.5)}h${r1(-w * 0.76)}q${r1(-w * 0.62)},0 ${r1(-w * 0.62)},${r1(h * 0.5)}z" fill="#a8763c"/>` +
          `<path d="M${r1(x - w * 0.6)},${r1(y - h * 0.96)}h${r1(w * 1.2)}v${r1(h * 0.16)}h${r1(-w * 1.2)}z" fill="#8f6a2c"/>` +
          `<g stroke="#7f5a2c" stroke-width="1.2" opacity=".8" fill="none"><path d="M${r1(x - w * 0.8)},${r1(y - h * 0.3)}h${r1(w * 1.6)}M${r1(x - w * 0.7)},${r1(y - h * 0.05)}h${r1(w * 1.4)}"/></g>` +
          `<path d="M${r1(x - w * 0.2)},${r1(y - h * 0.55)}q${r1(-w * 0.3)},${r1(h * 0.4)} ${r1(w * 0.1)},${r1(h * 0.6)}" stroke="#5f4728" stroke-width="1.4" fill="none"/>`
        );
      })
      .join("")}</g>` +
    // 篩と道具の台
    `<g><rect x="120" y="136" width="4" height="24" fill="#8a6f3c"/><rect x="152" y="136" width="4" height="24" fill="#8a6f3c"/><rect x="114" y="130" width="48" height="7" fill="#a8763c"/><rect x="116" y="132" width="44" height="4" fill="#c9bda4"/></g>` +
    // 手前(y>175 の中央)に、掘り出した甕の口と刷毛を持つ人
    ground(172, "#b08a52") +
    `<path d="M0,180q100,-8 200,2q100,10 200,-8v36H0z" fill="#9a7644"/>` +
    `<path d="M150,210q0,-30 34,-30q34,0 34,30z" fill="#7f5f34"/>` +
    `<path d="M156,210q0,-24 28,-24q28,0 28,24z" fill="#a8763c"/>` +
    `<path d="M162,196q10,-6 44,0" stroke="#8f6a2c" stroke-width="2" fill="none"/>` +
    `<g stroke="#7f5a2c" stroke-width="1.4" opacity=".8" fill="none"><path d="M158,204h52"/></g>` +
    shade(240, 204, 12, 3.4, ".2") +
    person(240, 204, 22, "#e8e2d4") +
    arm(240, 192, -16, 6) +
    `<path d="M224,198l-8,3" stroke="#8a6f3c" stroke-width="2.4" fill="none"/>` +
    `<g fill="#c9bda4"><rect x="72" y="196" width="20" height="10" rx="2"/></g>` +
    `<g stroke="#8a6f3c" stroke-width="2" fill="none"><path d="M100,206l14,-16"/></g>` +
    `<path d="M112,190h10v6h-10z" fill="#8a8578"/>`,

  /** クイニョン・ファンラン。赤煉瓦のチャム塔。**いまも供物が上がる。** */
  chamtower:
    sky("#8fc4e8", "#f2dcb8", 120) +
    sun(66, 36, 16, "#f8c86a") +
    clouds(280, 24, 0.95) +
    hills(96, "#7f8a5a", 4) +
    // 塔の建つ丘
    `<path d="M0,120q60,-30 130,-26q80,4 140,-6q70,-12 130,10v112H0z" fill="#a88a52"/>` +
    `<path d="M0,132q60,-24 130,-20q80,4 140,-4q70,-10 130,8" stroke="#8f6f3c" stroke-width="2" fill="none"/>` +
    // 塔(左右3分の1に大、中央は小さめ)
    chamTowerShape(56, 128, 88, 40) +
    chamTowerShape(340, 130, 76, 34) +
    chamTowerShape(200, 124, 54, 24, "#9a5240", "#b06850") +
    // 供物の台と旗
    `<g stroke="#8a8578" stroke-width="2.4" fill="none"><path d="M110,128v-26M292,132v-24"/></g>` +
    `<g fill="#c9302c"><path d="M110,102h22v14h-22z"/><path d="M292,108h20v13h-20z"/></g>` +
    `<g fill="#f5b31c"><path d="M110,116h22v6h-22z"/><path d="M292,121h20v5h-20z"/></g>` +
    // 田
    ground(150, "#6faa4a") +
    `<path d="M0,158q100,-8 200,0t200,-2v54H0z" fill="#5f9a42"/>` +
    `<g stroke="#c9bda4" stroke-width="2" opacity=".8" fill="none"><path d="M0,166q100,-8 200,0t200,-2M0,184q100,-8 200,0t200,-2"/></g>` +
    `<g stroke="#4f8f3f" stroke-width="1.4" opacity=".7" fill="none"><path d="M24,176v8M56,180v8M88,174v8M312,178v8M348,174v8"/></g>` +
    // 牛(大きさが伝わる)
    `<g><ellipse cx="72" cy="196" rx="15" ry="8" fill="#c9b48a"/><path d="M84,192q8,-2 10,-8q2,6 -2,10z" fill="#c9b48a"/><g fill="#8a7a52"><rect x="62" y="202" width="3.4" height="8"/><rect x="78" y="202" width="3.4" height="8"/></g><path d="M92,184q4,-4 8,-2q-3,3 -4,6z" fill="#a89070"/></g>` +
    // 手前(y>170 の中央)に、線香を上げる供物の盆
    shade(200, 202, 22, 4, ".18") +
    `<g fill="#a8763c"><rect x="172" y="192" width="56" height="8" rx="2"/><rect x="176" y="200" width="5" height="10"/><rect x="220" y="200" width="5" height="10"/></g>` +
    `<g fill="#c9302c"><ellipse cx="184" cy="188" rx="7" ry="4.4"/><ellipse cx="200" cy="187" rx="7" ry="4.4"/></g>` +
    `<g fill="#f5b31c"><ellipse cx="216" cy="188" rx="7" ry="4.4"/></g>` +
    `<g stroke="#8a8578" stroke-width="1.4" fill="none"><path d="M196,192v-16M200,192v-18M204,192v-16"/></g>` +
    `<g fill="#f5b31c"><circle cx="196" cy="175" r="1.5"/><circle cx="200" cy="173" r="1.5"/><circle cx="204" cy="175" r="1.5"/></g>` +
    person(250, 206, 22, "#e8443f") +
    arm(250, 194, -14, -2),

  /** ニャチャン・ダラット。涼しい高地の別荘地。松と霧。 */
  hillstation:
    sky("#a8cfe0", "#e8eee8", 86) +
    // 霧の帯(いちばん明るいのは霧なので、建物は暗めに落とす)
    ridge(86, "#8fa0a8", [
      [0, 16],
      [70, -12],
      [150, 8],
      [230, -14],
      [320, 6],
      [400, -8],
    ]) +
    haze(76, 26, "#eef2f0", ".7") +
    ridge(112, "#5f7f6a", [
      [0, 8],
      [90, -12],
      [180, 4],
      [270, -12],
      [400, 6],
    ]) +
    haze(104, 14, "#e4ecea", ".5") +
    // 松林
    `<g>${[16, 40, 62, 344, 368, 390].map((x, i) => pine(x, 132, r1(40 + (i % 3) * 12), "#3f6b4f")).join("")}</g>` +
    // 別荘(壁は霧より2段暗く)
    `<rect x="76" y="106" width="72" height="34" fill="#c2b49a"/>` +
    `<path d="M70,106h84l-42,-22z" fill="#8a5f4a"/>` +
    `<rect x="70" y="106" width="84" height="4" fill="#6f4a38"/>` +
    `<g fill="#4f6b6a"><rect x="84" y="114" width="12" height="12"/><rect x="104" y="114" width="12" height="12"/><rect x="124" y="114" width="12" height="12"/></g>` +
    `<rect x="100" y="128" width="16" height="12" fill="#5a4630"/>` +
    `<rect x="140" y="92" width="8" height="16" fill="#8a8578"/>` +
    // 統治期の別荘(壁は霧より2段暗く。明るいままだと霧に溶ける)
    colonialHouse(252, 104, 66, 146, "#c9a45c") +
    // 湖
    band(140, 26, "#5f8a96") +
    `<g opacity=".25" fill="#c2b49a"><rect x="76" y="140" width="72" height="20"/><rect x="252" y="140" width="66" height="18"/></g>` +
    ripples(146, "#a8cdd6", ".5") +
    // 高原の花壇と芝
    ground(166, "#6f9a5c") +
    `<path d="M0,174q100,-8 200,2q100,10 200,-8v42H0z" fill="#5f8a4c"/>` +
    `<g fill="#c9302c"><circle cx="40" cy="188" r="3"/><circle cx="52" cy="192" r="3"/><circle cx="64" cy="186" r="3"/></g>` +
    `<g fill="#f5b31c"><circle cx="46" cy="196" r="3"/><circle cx="58" cy="200" r="3"/></g>` +
    `<g fill="#e8a0b4"><circle cx="336" cy="190" r="3"/><circle cx="348" cy="194" r="3"/><circle cx="360" cy="188" r="3"/><circle cx="344" cy="200" r="3"/></g>` +
    // 手前(y>170 の中央)に、温室と花を運ぶ人
    `<g fill="#c9d8dc" opacity=".8"><path d="M150,206v-20q26,-12 52,0v20z"/></g>` +
    `<g stroke="#8a8578" stroke-width="1.6" fill="none"><path d="M150,206v-20q26,-12 52,0v20M163,182v24M176,178v28M189,182v24"/></g>` +
    `<g fill="#e8443f"><circle cx="160" cy="198" r="2.4"/><circle cx="180" cy="196" r="2.4"/><circle cx="196" cy="198" r="2.4"/></g>` +
    shade(232, 204, 12, 3.4, ".18") +
    person(232, 204, 22, "#5b8fe8") +
    arm(232, 192, 12, 4) +
    `<g fill="#a8763c"><rect x="244" y="192" width="22" height="10" rx="2"/></g>` +
    `<g fill="#f5b31c"><circle cx="250" cy="190" r="2.6"/><circle cx="258" cy="189" r="2.6"/></g>` +
    pine(90, 208, 44, "#2f6b45") +
    pine(316, 210, 38, "#2f6b45"),

  /** ブオンマトゥオット・プレイク・コントゥム。赤い土の高原。コーヒーと高床の家。 */
  highlandfarm:
    sky("#8fc4e8", "#eae4cc", 100) +
    sun(322, 38, 16, "#f8d98a") +
    clouds(92, 26, 1) +
    hills(96, "#6f8a5c", 4) +
    // 玄武岩の赤い土
    ground(100, "#a8543a") +
    band(100, 14, "#b8604a") +
    `<path d="M0,124q100,-10 200,0t200,-4v90H0z" fill="#9a4c34"/>` +
    // 畝(手前へ広がる)
    (() => {
      const rows = [];
      for (let i = 0; i < 9; i++) {
        const f = (i - 4) / 4;
        const xt = r1(200 + f * 70);
        const xb = r1(200 + f * 340);
        rows.push(
          `<path d="M${r1(xt - 3)},126L${r1(xt + 3)},126L${r1(xb + 20)},210L${r1(xb - 20)},210z" fill="#8f4632"/>`,
        );
      }
      return rows.join("");
    })() +
    // コーヒーの木(左右3分の1に大きく)
    (() => {
      const bush = (x, base, r, cherry) => {
        const parts = [
          `<rect x="${r1(x - 2)}" y="${r1(base - r * 1.1)}" width="4" height="${r1(r * 1.1)}" fill="#5f4728"/>`,
          `<ellipse cx="${x}" cy="${r1(base - r * 1.5)}" rx="${r}" ry="${r1(r * 0.78)}" fill="#2f6b3f"/>`,
          `<ellipse cx="${r1(x - r * 0.5)}" cy="${r1(base - r * 1.1)}" rx="${r1(r * 0.6)}" ry="${r1(r * 0.42)}" fill="#3f7f4a"/>`,
          `<ellipse cx="${r1(x + r * 0.52)}" cy="${r1(base - r * 1.15)}" rx="${r1(r * 0.6)}" ry="${r1(r * 0.42)}" fill="#3f7f4a"/>`,
        ];
        if (cherry) {
          parts.push(
            `<g fill="#c9302c"><circle cx="${r1(x - r * 0.5)}" cy="${r1(base - r * 1.6)}" r="2.4"/><circle cx="${r1(x + r * 0.3)}" cy="${r1(base - r * 1.85)}" r="2.4"/><circle cx="${r1(x + r * 0.62)}" cy="${r1(base - r * 1.3)}" r="2.2"/><circle cx="${r1(x - r * 0.2)}" cy="${r1(base - r * 1.2)}" r="2.2"/></g>`,
          );
        }
        return parts.join("");
      };
      return (
        bush(30, 200, 26, true) +
        bush(84, 186, 20, true) +
        bush(132, 168, 15, false) +
        bush(360, 202, 27, true) +
        bush(312, 184, 20, true) +
        bush(268, 166, 14, false)
      );
    })() +
    // ロン(集会所)の高い屋根 — 中部高原の顔。左寄せ
    `<g><rect x="150" y="120" width="44" height="24" fill="#a8763c"/>` +
    `<path d="M146,120h52L172,58z" fill="#8a7a4a"/>` +
    `<path d="M154,120h36L172,68z" fill="#a09062"/>` +
    `<g stroke="#6b5f38" stroke-width="1.4" opacity=".8" fill="none"><path d="M158,112h28M162,100h20M166,88h12"/></g>` +
    `<g fill="#6b5330"><rect x="152" y="144" width="4" height="12"/><rect x="188" y="144" width="4" height="12"/></g>` +
    `<path d="M168,144v12h8v-12z" fill="#5a4630"/></g>` +
    stiltHouse(228, 158, 48, 40) +
    // 豆を干す台(y>170 の中央は隠れない)
    shade(200, 202, 46, 5, ".16") +
    `<g fill="#c9bda4"><rect x="152" y="180" width="96" height="18" rx="2"/></g>` +
    `<rect x="152" y="180" width="96" height="4" fill="#a89e8c"/>` +
    `<g fill="#7f5a2c">${[158, 168, 178, 188, 198, 208, 218, 228, 238].map((x, i) => `<ellipse cx="${x}" cy="${r1(188 + (i % 3) * 3)}" rx="4" ry="2.6"/>`).join("")}</g>` +
    `<g fill="#5f4728">${[162, 182, 202, 222, 240].map((x) => `<ellipse cx="${x}" cy="194" rx="3.4" ry="2.2"/>`).join("")}</g>` +
    `<g fill="#8a6f3c"><rect x="156" y="198" width="4" height="12"/><rect x="240" y="198" width="4" height="12"/></g>` +
    shade(262, 206, 12, 3.4, ".2") +
    person(262, 206, 23, "#e8443f") +
    arm(262, 193, -18, 4) +
    `<path d="M244,197l-6,4" stroke="#8a6f3c" stroke-width="2.4" fill="none"/>` +
    conicalHat(262, 188, 8),

  /**
   * ホーチミン市。宮殿の正面と鉄門、うしろに現代のスカイライン。
   * **突き破られた鉄門は、この盤面で戦争を描く2枚のうちの1枚。**
   * 兵器は描かず、門扉が外れて傾いていることだけで示す。
   */
  palacegate:
    sky("#8fc4e8", "#e8eaee", 88) +
    clouds(70, 24, 0.9) +
    // 現代のスカイライン(奥)
    `<g fill="#9aa4b0"><rect x="0" y="42" width="26" height="46"/><rect x="30" y="60" width="20" height="28"/><rect x="330" y="30" width="24" height="58"/><rect x="358" y="52" width="20" height="36"/><rect x="382" y="66" width="18" height="22"/></g>` +
    `<path d="M296,88V44q0,-16 10,-22q10,6 10,22v44z" fill="#8f99a6"/>` +
    `<rect x="304" y="12" width="4" height="12" fill="#8f99a6"/>` +
    `<g fill="#c2cdd6" opacity=".8">${[4, 34, 334, 362, 386].map((x, i) => `<rect x="${x}" y="${r1(50 + (i % 3) * 8)}" width="12" height="30"/>`).join("")}</g>` +
    band(88, 12, "#7f8a72") +
    `<g fill="#3f7f4a" opacity=".9"><ellipse cx="60" cy="94" rx="46" ry="14"/><ellipse cx="150" cy="96" rx="40" ry="13"/><ellipse cx="252" cy="94" rx="42" ry="13"/><ellipse cx="352" cy="98" rx="38" ry="12"/></g>` +
    // 宮殿(横に長く。中央が隠れるので庇の列で埋める)
    ground(100, "#8a9a72") +
    `<rect x="72" y="94" width="256" height="46" fill="#e8e2d4"/>` +
    `<rect x="72" y="90" width="256" height="6" fill="#cfc7b4"/>` +
    `<rect x="66" y="86" width="268" height="5" fill="#b8b0a0"/>` +
    // 縦の庇(繰り返し)
    `<g fill="#cfc7b4">${[80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300].map((x) => `<rect x="${x}" y="96" width="7" height="44"/>`).join("")}</g>` +
    `<g fill="#5f7284">${[87, 107, 127, 147, 167, 187, 207, 227, 247, 267, 287, 307].map((x) => `<rect x="${x}" y="100" width="13" height="16"/>`).join("")}</g>` +
    `<g fill="#4f6b7a">${[87, 107, 127, 147, 167, 187, 207, 227, 247, 267, 287, 307].map((x) => `<rect x="${x}" y="120" width="13" height="16"/>`).join("")}</g>` +
    `<rect x="160" y="76" width="80" height="14" fill="#e8e2d4"/>` +
    `<rect x="156" y="72" width="88" height="5" fill="#cfc7b4"/>` +
    // 芝生と車寄せ
    ground(140, "#6f9a52") +
    `<path d="M0,150q100,-8 200,2q100,10 200,-6v64H0z" fill="#5f8a46"/>` +
    `<path d="M96,150q104,-16 208,0l24,26H72z" fill="#b8ae98"/>` +
    // 鉄柵(左右へ長く)と、外れて傾いた門扉(中央やや左、y>160 で見える)
    `<g stroke="#4a5460" stroke-width="2.6" fill="none">${[8, 20, 32, 44, 56, 68, 80, 92, 300, 312, 324, 336, 348, 360, 372, 384]
      .map((x) => `<path d="M${x},174v-28"/>`)
      .join("")}</g>` +
    `<g fill="#4a5460"><rect x="4" y="146" width="94" height="4"/><rect x="4" y="168" width="94" height="4"/><rect x="296" y="146" width="100" height="4"/><rect x="296" y="168" width="100" height="4"/></g>` +
    `<g fill="#3a4453"><rect x="98" y="140" width="9" height="40"/><rect x="288" y="140" width="9" height="40"/></g>` +
    // 外れた門扉(倒れて地面に載る。影で接地させる)
    shade(160, 190, 44, 6, ".22") +
    `<g transform="rotate(-16 160 180)"><rect x="116" y="174" width="90" height="5" fill="#3a4453"/><rect x="116" y="192" width="90" height="5" fill="#3a4453"/><g stroke="#4a5460" stroke-width="2.6" fill="none">${[122, 134, 146, 158, 170, 182, 194]
      .map((x) => `<path d="M${x},174v22"/>`)
      .join("")}</g></g>` +
    // 手前(y>170 の中央)に、見学に来た人と自転車
    ground(184, "#a89e8c") +
    `<g stroke="#8f8778" stroke-width="1.6" opacity=".7" fill="none"><path d="M0,194h400M0,206h400"/></g>` +
    shade(236, 204, 12, 3.4, ".2") +
    person(236, 204, 23, "#e8443f") +
    arm(236, 191, 14, -6) +
    person(258, 206, 18, "#f5b31c") +
    person(60, 202, 21, "#5b8fe8") +
    motorbike(340, 204, 0.95, "#e8e2d4"),

  /** ヴンタウ。沖合の掘削リグと精製施設。 */
  oilport:
    sky("#7fb0d8", "#f0d8b0", 84) +
    sun(72, 34, 15, "#f8c86a") +
    clouds(240, 26, 1) +
    // 岸の精製施設(左3分の1)
    band(84, 14, "#8a9490") +
    `<g fill="#b8b0a0"><rect x="0" y="66" width="26" height="32" rx="4"/><rect x="30" y="74" width="22" height="24" rx="4"/><rect x="56" y="70" width="24" height="28" rx="4"/></g>` +
    `<g stroke="#8f8778" stroke-width="1.6" fill="none"><path d="M0,80h80M0,88h80"/></g>` +
    `<g fill="#8f99a6"><rect x="86" y="52" width="5" height="46"/><rect x="96" y="60" width="5" height="38"/></g>` +
    `<path d="M84,52h9l-4.5,-10z" fill="#c2453c"/>` +
    // 海
    band(98, 50, "#2a6b8f") +
    band(120, 28, "#3a83a4") +
    ripples(106, "#a8d0e0", ".45") +
    // 掘削リグ(右3分の1に主役)
    `<g fill="#c9a04c"><path d="M300,148l6,-52h4l6,52zM366,148l-6,-52h-4l-6,52z"/></g>` +
    `<g stroke="#c9a04c" stroke-width="2.4" fill="none"><path d="M306,110h54M304,124h58M302,136h62"/></g>` +
    `<rect x="288" y="80" width="92" height="18" fill="#8a8578"/>` +
    `<rect x="288" y="76" width="92" height="5" fill="#6f6a5e"/>` +
    `<g fill="#c2453c"><rect x="294" y="62" width="30" height="14"/></g>` +
    `<g fill="#e8e2d4"><rect x="330" y="60" width="26" height="16"/></g>` +
    `<g fill="#4f6b7a"><rect x="334" y="64" width="7" height="6"/><rect x="345" y="64" width="7" height="6"/></g>` +
    // 掘削やぐら
    `<g stroke="#8a8578" stroke-width="2.6" fill="none"><path d="M348,60L340,20M368,60L376,20M344,44h28M346,32h24"/></g>` +
    `<rect x="354" y="16" width="8" height="6" fill="#8a8578"/>` +
    // ヘリポート(円とH)
    `<ellipse cx="304" cy="60" rx="18" ry="6" fill="#5f6b70"/>` +
    `<ellipse cx="304" cy="59" rx="15" ry="4.6" fill="#8a8578"/>` +
    `<g stroke="#e8e2d4" stroke-width="1.6" fill="none"><path d="M300,57v5M308,57v5M300,59.5h8"/></g>` +
    // フレア(炎)
    `<g><rect x="264" y="70" width="4" height="28" fill="#8a8578"/><path d="M266,70q-8,-10 -2,-18q1,7 5,4q4,7 -3,14z" fill="#f5b31c"/><path d="M266,70q-4,-6 -1,-11q1,4 3,2q2,4 -2,9z" fill="#e8553f"/></g>` +
    // 補給船と、パイプの桟橋(手前 y>170 の中央)
    ground(148, "#2f6f8a") +
    band(148, 20, "#3a83a4") +
    ripples(160, "#a8d0e0", ".4") +
    `<g fill="#8a8578"><rect x="0" y="152" width="150" height="6"/>${[10, 40, 70, 100, 130].map((x) => `<rect x="${x}" y="158" width="5" height="26"/>`).join("")}</g>` +
    `<g stroke="#c9a04c" stroke-width="3.4" fill="none"><path d="M0,148h146"/></g>` +
    `<path d="M0,168q90,10 190,-2q110,-12 210,4v40H0z" fill="#256084"/>` +
    // 補給船(波のあとに描く)
    shade(210, 200, 52, 6, ".2") +
    `<path d="M148,182h124l-14,20H160z" fill="#3f4a56"/>` +
    `<path d="M148,182h124v-5H148z" fill="#c2453c"/>` +
    `<rect x="234" y="160" width="34" height="22" fill="#e8e2d4"/>` +
    `<g fill="#4f6b7a"><rect x="239" y="165" width="8" height="7"/><rect x="252" y="165" width="8" height="7"/></g>` +
    `<rect x="248" y="146" width="4" height="14" fill="#8a8578"/>` +
    `<g fill="#f5b31c"><rect x="160" y="172" width="18" height="10"/><rect x="182" y="172" width="18" height="10"/><rect x="204" y="172" width="18" height="10"/></g>` +
    person(288, 196, 20, "#f5b31c") +
    `<path d="M300,182h4v14h-4z" fill="#8a8578"/>` +
    `<g stroke="#4a4436" stroke-width="1.8" fill="none"><path d="M42,52q4,-4 8,0q4,-4 8,0M110,40q4,-4 8,0q4,-4 8,0"/></g>`,

  /** タイニン・チャウドック。大規模な寺院・聖堂の複合建築。 */
  templecomplex:
    sky("#8fc4e8", "#f0e2c8", 104) +
    sun(340, 40, 16, "#f8d98a") +
    clouds(80, 26, 1) +
    hills(96, "#7f9a62", 3) +
    ground(104, "#a8b478") +
    // 本殿(横に長く。中央は列柱で埋める)
    `<rect x="96" y="102" width="208" height="42" fill="#f2e2c0"/>` +
    tiledRoof(96, 102, 208, 20, "#3f8fb0", "#2f6f90") +
    `<rect x="90" y="98" width="220" height="6" fill="#c9a04c"/>` +
    `<g fill="#c9a86e">${[104, 128, 152, 176, 200, 224, 248, 272, 292].map((x) => `<rect x="${x}" y="108" width="8" height="36"/>`).join("")}</g>` +
    `<g fill="#4f6b7a">${[114, 138, 162, 186, 210, 234, 258, 282].map((x) => `<rect x="${x}" y="112" width="12" height="18"/>`).join("")}</g>` +
    // 両端の塔(左右3分の1に主役)
    `<g><rect x="26" y="86" width="52" height="58" fill="#f2e2c0"/>` +
    tiledRoof(26, 86, 52, 16, "#3f8fb0", "#2f6f90") +
    `<rect x="34" y="60" width="36" height="28" fill="#e8d4a8"/>` +
    tiledRoof(34, 60, 36, 13, "#c9302c", "#8f2420") +
    `<rect x="44" y="38" width="16" height="24" fill="#f2e2c0"/>` +
    tiledRoof(44, 38, 16, 10, "#3f8fb0", "#2f6f90") +
    `<circle cx="52" cy="30" r="6" fill="#f5b31c"/>` +
    `<g fill="#4f6b7a"><rect x="38" y="96" width="12" height="16"/><rect x="56" y="96" width="12" height="16"/><rect x="46" y="68" width="12" height="14"/></g>` +
    `<rect x="40" y="120" width="24" height="24" fill="#8a5f34"/></g>` +
    `<g><rect x="322" y="90" width="52" height="54" fill="#f2e2c0"/>` +
    tiledRoof(322, 90, 52, 16, "#3f8fb0", "#2f6f90") +
    `<rect x="330" y="66" width="36" height="26" fill="#e8d4a8"/>` +
    tiledRoof(330, 66, 36, 12, "#c9302c", "#8f2420") +
    `<rect x="340" y="46" width="16" height="22" fill="#f2e2c0"/>` +
    `<circle cx="348" cy="40" r="5.4" fill="#f5b31c"/>` +
    `<g fill="#4f6b7a"><rect x="334" y="98" width="12" height="16"/><rect x="352" y="98" width="12" height="16"/></g>` +
    `<rect x="336" y="120" width="24" height="24" fill="#8a5f34"/></g>` +
    // 幟
    `<g stroke="#8a8578" stroke-width="2.2" fill="none"><path d="M88,144v-40M312,144v-40"/></g>` +
    `<g fill="#c9302c"><path d="M88,104h18v22H88z"/><path d="M312,104h-18v22h18z"/></g>` +
    `<g fill="#f5b31c"><path d="M88,126h18v8H88z"/><path d="M312,126h-18v8h18z"/></g>` +
    // 参道と石段
    ground(144, "#c9c0ac") +
    `<g fill="#b8ae98"><rect x="0" y="152" width="400" height="8"/><rect x="0" y="166" width="400" height="8"/><rect x="0" y="180" width="400" height="8"/></g>` +
    `<g stroke="#9a9080" stroke-width="1.4" opacity=".7" fill="none"><path d="M0,160h400M0,174h400M0,188h400M60,144v66M200,144v66M330,144v66"/></g>` +
    // 手前(y>170 の中央)に参拝の列と香炉
    `<g fill="#8a5f34"><path d="M180,208v-14q0,-8 20,-8t20,8v14z"/></g>` +
    `<path d="M176,194h48v5h-48z" fill="#a8763c"/>` +
    `<g stroke="#8a8578" stroke-width="1.4" fill="none"><path d="M192,188v-12M200,188v-15M208,188v-12"/></g>` +
    `<g fill="#f5b31c"><circle cx="192" cy="175" r="1.6"/><circle cx="200" cy="172" r="1.6"/><circle cx="208" cy="175" r="1.6"/></g>` +
    shade(248, 204, 12, 3.4, ".18") +
    person(248, 204, 22, "#f2ede0") +
    arm(248, 192, -8, 8) +
    person(270, 206, 20, "#c9302c") +
    person(148, 202, 21, "#5b8fe8") +
    arm(148, 190, 10, 6) +
    palm(16, 208, 62) +
    palm(388, 206, 56),

  /** ベンチェー。ヤシの木立と川辺の作業場。 */
  coconutfarm:
    sky("#8fc4e8", "#e4eed8", 88) +
    clouds(300, 24, 0.9) +
    // 奥のヤシ林(帯にして層を作る)
    band(88, 24, "#4f7f4a") +
    `<g fill="#3f6b40" opacity=".9">${[10, 46, 84, 120, 158, 196, 234, 272, 310, 348, 384].map((x, i) => `<ellipse cx="${x}" cy="${r1(90 + (i % 3) * 4)}" rx="20" ry="10"/>`).join("")}</g>` +
    `<g>${[36, 96, 300, 366].map((x, i) => palm(x, 118, r1(52 + (i % 2) * 10), "#2f7a44", true)).join("")}</g>` +
    // 運河
    ground(112, "#8a9a62") +
    band(118, 40, "#7f9a6a") +
    band(122, 34, "#6f8f78") +
    `<path d="M0,122h400v36H0z" fill="#5f8f7a"/>` +
    ripples(130, "#a8c8b8", ".5") +
    // 川辺の作業場(左3分の1)
    shedRoof(8, 118, 96, 20) +
    `<rect x="8" y="138" width="96" height="20" fill="#a8763c" opacity=".55"/>` +
    `<g fill="#8a6f3c"><rect x="12" y="138" width="4" height="20"/><rect x="96" y="138" width="4" height="20"/></g>` +
    // 積んだヤシの実
    `<g fill="#7f5f2c">${[
      [24, 148],
      [36, 148],
      [48, 148],
      [30, 140],
      [42, 140],
      [36, 132],
    ]
      .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6.4"/>`)
      .join("")}</g>` +
    `<g fill="#a8763c">${[
      [24, 148],
      [36, 148],
      [48, 148],
      [30, 140],
      [42, 140],
      [36, 132],
    ]
      .map(([x, y]) => `<circle cx="${r1(x - 2)}" cy="${r1(y - 2)}" r="3"/>`)
      .join("")}</g>` +
    person(78, 156, 21, "#e8443f") +
    arm(78, 144, -14, 4) +
    // ヤシを満載した舟(波のあとに描く)
    sampan(300, 146, 1.05, "#8a5f34") +
    `<g fill="#7f5f2c"><circle cx="288" cy="140" r="5.4"/><circle cx="300" cy="140" r="5.4"/><circle cx="312" cy="140" r="5.4"/><circle cx="294" cy="133" r="5.4"/><circle cx="306" cy="133" r="5.4"/></g>` +
    person(330, 146, 19, "#f5b31c") +
    arm(330, 135, 12, -8) +
    `<path d="M342,124l-8,26" stroke="#8a6f3c" stroke-width="2.4" fill="none"/>` +
    // 手前の岸(y>175 の中央に割ったヤシと鉈)
    ground(158, "#7f9a52") +
    `<path d="M0,166q100,-8 200,2q100,10 200,-8v50H0z" fill="#6f8a44"/>` +
    `<g fill="#c9bda4"><rect x="150" y="190" width="100" height="8" rx="2"/></g>` +
    `<g fill="#7f5f2c"><circle cx="170" cy="182" r="9"/><circle cx="190" cy="184" r="8"/></g>` +
    `<g fill="#f2ede0"><path d="M212,190a10,10 0 0 1 20,0z"/><path d="M234,190a9,9 0 0 1 18,0z"/></g>` +
    `<g fill="#a8763c"><path d="M212,190a10,10 0 0 1 20,0" fill="none" stroke="#a8763c" stroke-width="2.4"/></g>` +
    `<g><path d="M254,186l18,-8" stroke="#8a8578" stroke-width="3.4" fill="none"/><path d="M270,180l10,-4" stroke="#5a4630" stroke-width="4" fill="none"/></g>` +
    shade(292, 200, 12, 3.4, ".18") +
    person(292, 200, 22, "#5b8fe8") +
    arm(292, 188, -14, 2) +
    bananaPlant(24, 210, 46) +
    palm(376, 208, 60, "#2f7a44", true),

  /** カントー・ラックザー。水上市場。木造船がひしめく。 */
  deltamarket:
    sky("#a0c8dc", "#f2e0c0", 82) +
    sun(64, 32, 16, "#f8c86a") +
    `<circle cx="64" cy="32" r="24" fill="#fbeec4" opacity=".26"/>` +
    clouds(280, 24, 0.9) +
    // 対岸の高床の家並み
    band(82, 22, "#7f8f66") +
    `<g>${[0, 44, 88, 264, 310, 356].map((x, i) => stiltHouse(x, r1(102 + (i % 2) * 2), 38, 34, i % 2 ? "#8a7a4a" : "#7f6f42", "#c9a86e")).join("")}</g>` +
    `<g fill="#3f7f4a" opacity=".9"><ellipse cx="140" cy="94" rx="34" ry="11"/><ellipse cx="200" cy="96" rx="38" ry="12"/><ellipse cx="242" cy="92" rx="30" ry="10"/></g>` +
    // 川
    band(104, 80, "#9a8a58") +
    band(104, 18, "#a89a68") +
    ripples(116, "#c4b688", ".45") +
    // 舟がひしめく(波のあとに描く。左右へ密に)
    `<g>${[
      [30, 132, 0.95, "#8a5f34", "#4f8f6f"],
      [92, 126, 0.8, "#7a5230", null],
      [140, 140, 0.7, "#8a5f34", "#c9302c"],
      [262, 138, 0.75, "#7a5230", null],
      [316, 128, 0.9, "#8a5f34", "#5b8fe8"],
      [372, 142, 0.8, "#7a5230", "#f5b31c"],
    ]
      .map(([x, y, s, hull, roof]) => sampan(x, y, s, hull, roof))
      .join("")}</g>` +
    // 竿に吊るした見本(市場の目印。左右に立てる)
    `<g stroke="#8a6f3c" stroke-width="2.6" fill="none"><path d="M40,128v-40M330,124v-44"/></g>` +
    `<g fill="#4f8f3f"><ellipse cx="40" cy="92" rx="6" ry="9"/></g>` +
    `<g fill="#e8553f"><circle cx="40" cy="104" r="5.4"/></g>` +
    `<g fill="#f5b31c"><ellipse cx="330" cy="86" rx="6.4" ry="8"/><circle cx="330" cy="100" r="5"/></g>` +
    // 積んだ果物
    `<g fill="#c9302c"><circle cx="24" cy="126" r="3.4"/><circle cx="34" cy="125" r="3.4"/><circle cx="44" cy="126" r="3.4"/></g>` +
    `<g fill="#4f8f3f"><circle cx="308" cy="122" r="3.6"/><circle cx="318" cy="121" r="3.6"/><circle cx="328" cy="122" r="3.6"/></g>` +
    person(30, 126, 18, "#e8e2d4") +
    person(316, 122, 18, "#c9302c") +
    // 手前(y>170 の中央)を横切る舟
    `<path d="M0,172q100,-10 200,2q100,12 200,-6v42H0z" fill="#8a7a48"/>` +
    ripples(182, "#b0a068", ".4") +
    shade(200, 202, 46, 6, ".18") +
    sampan(200, 188, 1.7, "#8a5f34", "#4f8f6f") +
    person(168, 190, 22, "#f5b31c") +
    arm(168, 178, 16, -10) +
    `<path d="M184,164l-10,32" stroke="#8a6f3c" stroke-width="2.6" fill="none"/>` +
    conicalHat(168, 172, 8) +
    `<g fill="#c9302c"><circle cx="214" cy="182" r="4.4"/><circle cx="226" cy="181" r="4.4"/></g>` +
    `<g fill="#4f8f3f"><circle cx="238" cy="182" r="4.4"/></g>`,

  /** フーコック。リゾートの浜とマリーナ。 */
  resortisland:
    sky("#7fc0e0", "#f2e0c0", 78 + 12) +
    sun(320, 34, 17, "#f8d98a") +
    `<circle cx="320" cy="34" r="26" fill="#fbeec4" opacity=".26"/>` +
    clouds(96, 26, 1) +
    // 沖の島影
    `<path d="M0,90q40,-18 84,-6l14,6z" fill="#6f8a7a"/>` +
    `<path d="M348,90q22,-12 44,-4l8,4z" fill="#7f9a88"/>` +
    // 透ける海(3段)
    band(90, 18, "#1f7f9a") +
    band(104, 16, "#2fa8b8") +
    band(118, 30, "#5fc8cc") +
    ripples(96, "#a8e0e4", ".5") +
    // マリーナの桟橋とヨット(右3分の1)
    `<g fill="#a8763c"><rect x="272" y="112" width="128" height="5"/>${[280, 306, 332, 358, 384].map((x) => `<rect x="${x}" y="117" width="4" height="16"/>`).join("")}</g>` +
    `<path d="M286,112c9,-4 30,-4 38,0c-5,6 -33,6 -38,0z" fill="#f2ede0"/>` +
    `<path d="M306,110V84l14,26z" fill="#f6efe2"/>` +
    `<path d="M304,110V88l-11,22z" fill="#5b8fe8"/>` +
    `<path d="M344,112c8,-3 26,-3 34,0c-4,5 -30,5 -34,0z" fill="#f2ede0"/>` +
    `<path d="M360,110V90l12,20z" fill="#e8443f"/>` +
    // 波打ちぎわ
    `<path d="M0,134q60,8 120,0t130,4q80,4 150,-6v10H0z" fill="#8fd8dc"/>` +
    `<path d="M0,142q60,6 120,-1t130,4q80,4 150,-5v8H0z" fill="#eaf6f4"/>` +
    // 白い砂
    ground(148, "#f0e2c0") +
    `<path d="M0,160q90,-8 180,0q100,9 220,-6v56H0z" fill="#e4d2a8"/>` +
    // 椰子は隅だけ(額縁が主役を飲まないように)
    palm(22, 176, 74, "#2f7a44", true) +
    palm(62, 168, 54, "#357f48", true) +
    palm(382, 178, 70, "#2f7a44", true) +
    // 寝椅子とパラソル(左右3分の1)
    `<g><path d="M96,168v-2h34l4,10h-40z" fill="#f2ede0"/><rect x="98" y="176" width="4" height="8" fill="#c9bda4"/><rect x="128" y="176" width="4" height="8" fill="#c9bda4"/></g>` +
    `<g><rect x="112" y="140" width="2.6" height="30" fill="#8a8578"/><path d="M88,144q25,-16 50,0z" fill="#e8443f"/><path d="M96,142q17,-10 34,0z" fill="#f2ede0"/></g>` +
    `<g><rect x="300" y="146" width="2.6" height="28" fill="#8a8578"/><path d="M278,150q23,-15 46,0z" fill="#f5b31c"/></g>` +
    // 手前(y>175 の中央)に、浜に上げた籠舟と貝
    shade(200, 200, 30, 6, ".16") +
    `<ellipse cx="200" cy="192" rx="34" ry="17" fill="#a8763c"/>` +
    `<ellipse cx="200" cy="189" rx="29" ry="13.4" fill="#c9a86e"/>` +
    `<g stroke="#8a6f3c" stroke-width="1.2" fill="none"><ellipse cx="200" cy="189" rx="21" ry="9.6"/><ellipse cx="200" cy="189" rx="12" ry="5.6"/><path d="M200,176v26M171,189h58"/></g>` +
    `<path d="M232,186l24,-10" stroke="#8a6f3c" stroke-width="2.6" fill="none"/>` +
    `<g fill="#f6efe2"><path d="M144,202q6,-8 12,0z"/><path d="M158,206q5,-7 10,0z"/><path d="M262,200q6,-8 12,0z"/></g>` +
    `<g stroke="#c9a86e" stroke-width="1" fill="none"><path d="M144,202q6,-8 12,0M262,200q6,-8 12,0"/></g>` +
    person(288, 202, 21, "#5b8fe8") +
    arm(288, 190, 12, 6) +
    `<g stroke="#4a4436" stroke-width="1.8" fill="none"><path d="M150,58q5,-5 10,0q5,-5 10,0M236,44q4,-4 8,0q4,-4 8,0"/></g>`,
};

// ---------------------------------------------------------------------------
// シンボル(24×24)
// ---------------------------------------------------------------------------

export const VIETNAM_MARKS = {
  /** ハノイ。単線のトラス橋(桁の細かい格子)。 */
  trussbridge:
    '<rect x="0" y="19.6" width="24" height="4.4" fill="#7f8f9c"/>' +
    '<path d="M0,17.4h24v2.4H0z" fill="#8a7a4a"/>' +
    '<g fill="#5f6b70"><rect x="2.6" y="13.4" width="2.6" height="6"/><rect x="18.8" y="13.4" width="2.6" height="6"/></g>' +
    '<path d="M0,13.6h24v2.6H0z" fill="#3f4a4f"/>' +
    '<path d="M1,13.6L5.6,5.4h12.8L23,13.6z" fill="none" stroke="#4f5a5f" stroke-width="2"/>' +
    '<path d="M5.6,5.4h12.8v1.8H5.6z" fill="#4f5a5f"/>' +
    '<g stroke="#66727a" stroke-width="1.2" fill="none"><path d="M1,13.6L7,5.6M7,13.6L1,7.2M7,13.6L12,5.4M12,13.6L7,5.4M12,13.6L17,5.4M17,13.6L12,5.4M17,13.6L23,7.2M23,13.6L17,5.6"/></g>' +
    '<g fill="#b0846a"><rect x="6.6" y="11.4" width="5.4" height="2.2"/></g>',

  /** ハイフォン。ホウオウボク(火炎樹)の深紅の花房。 */
  flameflower:
    '<path d="M12,24V13" stroke="#5f4728" stroke-width="2.6" stroke-linecap="round" fill="none"/>' +
    '<g stroke="#3f7a48" stroke-width="1.6" fill="none"><path d="M12,18L5,15M12,20.4L19,17.6"/></g>' +
    '<g fill="#2f6b3f"><ellipse cx="4.2" cy="14.6" rx="3.4" ry="1.5"/><ellipse cx="19.8" cy="17.2" rx="3.4" ry="1.5"/></g>' +
    '<g fill="#8f2420"><ellipse cx="12" cy="8.2" rx="10.4" ry="5.4"/></g>' +
    '<g fill="#c9302c"><circle cx="6" cy="7.6" r="3.6"/><circle cx="12" cy="5.4" r="4.2"/><circle cx="18" cy="7.8" r="3.6"/><circle cx="9" cy="11" r="3.2"/><circle cx="15.4" cy="11" r="3.2"/></g>' +
    '<g fill="#e8553f"><circle cx="9.6" cy="5.6" r="1.8"/><circle cx="15.4" cy="6.4" r="1.6"/><circle cx="6.4" cy="10.2" r="1.4"/></g>' +
    '<g fill="#f5b31c"><circle cx="12" cy="8.4" r="1.6"/><circle cx="6.2" cy="6.6" r="1"/><circle cx="18" cy="9" r="1"/></g>',

  /** ナムディン。紡績工場の煙突。 */
  millchimney:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#7f7768"/>' +
    '<path d="M12.6,21.4h10.4v-7l-5.2,-3.4l-5.2,3.4z" fill="#8a4634"/>' +
    '<g fill="#f5b31c"><rect x="14.6" y="16" width="3" height="4"/><rect x="19.4" y="16" width="3" height="4"/></g>' +
    '<path d="M2.2,21.4L4,3.6h5.2l1.8,17.8z" fill="#a85a42"/>' +
    '<path d="M2.2,21.4L4,3.6h2.4l-1,17.8z" fill="#c2725a"/>' +
    '<rect x="3.4" y="2.2" width="6.4" height="2" fill="#7f3a2c"/>' +
    '<g fill="#7f3a2c"><rect x="3.1" y="8" width="7" height="1.4"/><rect x="2.7" y="14" width="7.8" height="1.4"/></g>' +
    '<g fill="#e8e2d4" opacity=".85"><ellipse cx="9" cy="1.4" rx="4" ry="1.6"/><ellipse cx="14.6" cy="3" rx="3" ry="1.3"/></g>',

  /** ニンビン。尖った石灰岩の塔が並ぶ。 */
  karsttower:
    '<rect x="0" y="19.4" width="24" height="4.6" fill="#4f8f9c"/>' +
    '<g stroke="#a8d8e0" stroke-width="1" opacity=".7" fill="none"><path d="M1,21.4h7M14,22.6h8"/></g>' +
    '<path d="M13,19.4L18.4,7.8q0.8,-1.6 1.8,0L23.6,19.4z" fill="#5f6b62"/>' +
    '<path d="M0.6,19.4L5.6,3.4q0.8,-2.4 2.2,0L13,19.4z" fill="#7f8a80"/>' +
    '<path d="M0.6,19.4L5.6,3.4q0.8,-2.4 2.2,0L8.4,6z" fill="#9aa79a"/>' +
    '<g stroke="#5f6b62" stroke-width="1" opacity=".7" fill="none"><path d="M4.4,19v-6M8.4,19v-8M11,19v-4"/></g>' +
    '<g fill="#3f7a48"><ellipse cx="4" cy="12.4" rx="2.2" ry="1.1"/><ellipse cx="9.6" cy="16" rx="2.4" ry="1.1"/><ellipse cx="19.4" cy="14.4" rx="2.2" ry="1"/></g>' +
    '<g fill="#000" opacity=".18"><ellipse cx="7" cy="19.8" rx="6" ry="1.2"/><ellipse cx="18.4" cy="19.8" rx="5" ry="1"/></g>',

  /** ハイズオン。川底から突き出た杭の列。 */
  riverstake:
    '<rect x="0" y="14" width="24" height="10" fill="#6f8f9a"/>' +
    '<rect x="0" y="14" width="24" height="2.6" fill="#8fb0b8"/>' +
    '<g fill="#5f4728"><path d="M2,20L2.6,7.4l1.4,-2l1.2,2L6.4,20z"/><path d="M8.6,20L9.2,4.6l1.5,-2.4l1.3,2.4L12.8,20z"/><path d="M15,20l0.6,-9.4l1.3,-1.8l1.1,1.8L18.6,20z"/><path d="M20.4,20l0.5,-12.6l1.2,-1.8l1,1.8L23.6,20z"/></g>' +
    '<g fill="#8a6f3c"><path d="M2.6,7.4l1.4,-2l0.6,1.2L3.2,12z"/><path d="M9.2,4.6l1.5,-2.4l0.7,1.4L9.9,10z"/><path d="M15.6,10.6l1.3,-1.8l0.6,1.2l-1.4,4z"/><path d="M20.9,7.4l1.2,-1.8l0.6,1.2L21.4,12z"/></g>' +
    '<g stroke="#a8d0d8" stroke-width="1.2" opacity=".8" fill="none"><path d="M0,17.6h24M0,21.4h24"/></g>' +
    '<g fill="#3f5f68" opacity=".5"><rect x="2.4" y="16" width="4" height="4"/><rect x="9" y="16" width="4" height="4"/><rect x="15.2" y="16" width="3.4" height="4"/></g>',

  /** フーリー。貯水池に浮かぶような仏塔。 */
  reservoirpagoda:
    '<rect x="0" y="17.4" width="24" height="6.6" fill="#5f92a4"/>' +
    '<g opacity=".35" fill="#e0cfae"><rect x="8" y="17.4" width="8" height="5"/></g>' +
    '<g stroke="#bfe0ea" stroke-width="1" opacity=".8" fill="none"><path d="M1,20h5M17,21.6h6"/></g>' +
    '<rect x="4.6" y="15.2" width="14.8" height="2.4" fill="#a8813c"/>' +
    '<g fill="#e0cfae"><rect x="6.6" y="11.6" width="10.8" height="3.8"/><rect x="7.8" y="7.6" width="8.4" height="3.4"/><rect x="9" y="4" width="6" height="3"/></g>' +
    '<g fill="#c9a04c"><path d="M5,11.6h14l-2,-2.4H7z"/><path d="M6.4,7.6h11.2l-1.8,-2.2H8.2z"/><path d="M7.8,4h8.4l-1.4,-2H9.2z"/></g>' +
    '<g fill="#7f5a2c"><rect x="10.4" y="12.4" width="3.2" height="3"/><rect x="10.8" y="8.4" width="2.4" height="2.6"/></g>' +
    '<rect x="11.4" y="0.4" width="1.2" height="1.8" fill="#c9a04c"/>' +
    '<circle cx="12" cy="0.6" r="1.4" fill="#f5b31c"/>',

  /** ラオカイ。国境の鉄道橋(欄干越しに山)。 */
  bordercrossing:
    '<rect x="0" y="0" width="24" height="17.4" fill="#cfe4f0"/>' +
    '<path d="M0,11.4L5.6,2.4l4.4,5.4L15,1.2l4.6,6.2L24,4.4v7z" fill="#4f6b7a"/>' +
    '<path d="M15,1.2l2.8,3.8l-1.3,-0.5l-1.1,0.9l-1,-0.9l-1.1,0.5z" fill="#eef3f6"/>' +
    '<rect x="0" y="17.4" width="24" height="6.6" fill="#3f7f95"/>' +
    '<g stroke="#a8d8e0" stroke-width="1" opacity=".8" fill="none"><path d="M0,20h7M15,22h9"/></g>' +
    '<g fill="#3a4453"><rect x="3.6" y="14.6" width="3" height="9"/><rect x="17.4" y="14.6" width="3" height="9"/></g>' +
    '<rect x="0" y="11.4" width="24" height="3.4" fill="#2e3843"/>' +
    '<rect x="0" y="9.8" width="24" height="1.8" fill="#8a8578"/>' +
    '<g stroke="#c9c0ac" stroke-width="1.4" fill="none"><path d="M1.4,9.8V6M6,9.8V6M18,9.8V6M22.6,9.8V6M0,6h24"/></g>' +
    '<rect x="10.2" y="3.4" width="3.6" height="6.4" fill="#da251d"/>' +
    '<rect x="10.2" y="3.4" width="3.6" height="1.8" fill="#ffcd00"/>' +
    '<rect x="10.2" y="7" width="3.6" height="1.4" fill="#f2ede0"/>',

  /** イエンバイ。川に浮かぶ木材の筏。 */
  rivertimber:
    '<rect x="0" y="0" width="24" height="24" fill="#4f8090"/>' +
    '<rect x="0" y="0" width="24" height="8" fill="#a8cfe0"/>' +
    '<rect x="0" y="6.2" width="24" height="2.6" fill="#5f8a4c"/>' +
    '<g stroke="#a8d0d8" stroke-width="1" opacity=".8" fill="none"><path d="M0,21.4h7M15,22.6h9"/></g>' +
    '<g fill="#c2914c"><rect x="0.6" y="10.4" width="4" height="9" rx="1.8"/><rect x="5.4" y="10.4" width="4" height="9" rx="1.8"/><rect x="10.2" y="10.4" width="4" height="9" rx="1.8"/><rect x="15" y="10.4" width="4" height="9" rx="1.8"/><rect x="19.8" y="10.4" width="3.6" height="9" rx="1.8"/></g>' +
    '<g fill="#8a6f3c"><ellipse cx="2.6" cy="10.4" rx="2" ry="1"/><ellipse cx="7.4" cy="10.4" rx="2" ry="1"/><ellipse cx="12.2" cy="10.4" rx="2" ry="1"/><ellipse cx="17" cy="10.4" rx="2" ry="1"/><ellipse cx="21.6" cy="10.4" rx="1.8" ry="0.9"/></g>' +
    '<g fill="#5f4728"><circle cx="2.6" cy="10.4" r="0.8"/><circle cx="12.2" cy="10.4" r="0.8"/><circle cx="21.6" cy="10.4" r="0.8"/></g>' +
    '<g stroke="#5f4728" stroke-width="1.5" fill="none"><path d="M0,14.4h24M0,18.2h24"/></g>' +
    '<rect x="0.6" y="19.4" width="22.8" height="1.6" fill="#3f2f1c" opacity=".45"/>' +
    '<rect x="17.4" y="2.2" width="1.4" height="8.2" fill="#8a6f3c"/>' +
    '<path d="M18.8,2.6h4.6v3.4h-4.6z" fill="#c9302c"/>',

  /** タイグエン。高炉のシルエット。 */
  blastfurnace:
    '<rect x="0" y="21" width="24" height="3" fill="#5f5a4c"/>' +
    '<path d="M0,21L3.4,9.6h3.2L9,21z" fill="#6f6a5e"/>' +
    '<path d="M8.4,21V10.4q0,-2.6 3,-3.4V4.4h5.4v2.6q3,0.8 3,3.4V21z" fill="#4f5a5f"/>' +
    '<path d="M8.4,21V10.4q0,-2.6 3,-3.4V4.4h1.8v16.6z" fill="#68757a"/>' +
    '<rect x="10.4" y="2.4" width="7.6" height="2.4" fill="#3f4a4f"/>' +
    '<rect x="13.4" y="0.4" width="1.8" height="2.2" fill="#3f4a4f"/>' +
    '<path d="M9.6,21v-4.4h8.4V21z" fill="#f5b31c"/>' +
    '<path d="M11.2,21v-3h5.2v3z" fill="#e8553f"/>' +
    '<path d="M19.8,12.4L23.6,6.6" stroke="#8a8578" stroke-width="2" fill="none"/>' +
    '<path d="M21.4,9.8l2.2,-3.2l0.4,2.4z" fill="#8a8578"/>' +
    '<g fill="#3f4a4f"><rect x="20.6" y="12.4" width="3.4" height="8.6"/></g>' +
    '<g fill="#d8ccc0" opacity=".7"><ellipse cx="14.4" cy="0.8" rx="3.4" ry="1"/></g>',

  /** ランソン。中国風の楼門(友誼関)。 */
  friendshipgate:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#8f8778"/>' +
    '<rect x="1.6" y="12.4" width="20.8" height="9" fill="#c9c0ac"/>' +
    '<rect x="1.6" y="12.4" width="20.8" height="1.6" fill="#a89e8c"/>' +
    '<path d="M8.4,21.4v-4.6a3.6,3.6 0 0 1 7.2,0v4.6z" fill="#3f2f20"/>' +
    '<path d="M7.6,21.4v-5a4.4,4.4 0 0 1 8.8,0v5h-1.2v-4.6a3.6,3.6 0 0 0 -7.2,0v4.6z" fill="#e8dcc0"/>' +
    '<rect x="4.4" y="7.4" width="15.2" height="4.6" fill="#c2453c"/>' +
    '<g fill="#f5b31c"><rect x="6.4" y="8.6" width="2.6" height="2.6"/><rect x="10.7" y="8.6" width="2.6" height="2.6"/><rect x="15" y="8.6" width="2.6" height="2.6"/></g>' +
    '<path d="M0.8,12.4q4,-4.6 11.2,-4.6t11.2,4.6z" fill="#8f4634"/>' +
    '<path d="M0.8,12.4q4,-4.6 11.2,-4.6t11.2,4.6" stroke="#5f2a20" stroke-width="1" fill="none"/>' +
    '<path d="M2.6,7.4q3.4,-3.6 9.4,-3.6t9.4,3.6z" fill="#a2503c"/>' +
    '<path d="M2.6,7.4q3.4,-3.6 9.4,-3.6t9.4,3.6" stroke="#7f3a2c" stroke-width="1" fill="none"/>' +
    '<path d="M2.6,7.4q-1.4,-1 -2.4,-2q1.6,0.4 2.8,1.2z" fill="#7f3a2c"/>' +
    '<path d="M21.4,7.4q1.4,-1 2.4,-2q-1.6,0.4 -2.8,1.2z" fill="#7f3a2c"/>' +
    '<rect x="10.8" y="1.4" width="2.4" height="2.6" fill="#f5b31c"/>',

  /** ハロン。石炭トロッコと桟橋。 */
  coaltram:
    '<rect x="0" y="19.6" width="24" height="4.4" fill="#4f7f8a"/>' +
    '<g fill="#6b5330"><rect x="1.6" y="15.6" width="20.8" height="2.4"/><rect x="3" y="18" width="2.2" height="6"/><rect x="18.8" y="18" width="2.2" height="6"/><rect x="10.8" y="18" width="2.2" height="6"/></g>' +
    '<g stroke="#5a5750" stroke-width="1" fill="none"><path d="M1.6,14.6h20.8"/></g>' +
    '<path d="M4.6,14.6L6,7.4h12L19.4,14.6z" fill="#5f6b70"/>' +
    '<path d="M4.6,14.6L6,7.4h3l-1,7.2z" fill="#7f8a92"/>' +
    '<path d="M6.2,7.4h11.6v-1.4H6.2z" fill="#3f4a4f"/>' +
    '<g fill="#2b2a28"><path d="M6.6,6q1.6,-2.4 3.4,-1.2q1.4,-2.2 3.4,-0.8q1.6,-1.8 3,0.6l1,1.4z"/></g>' +
    '<g fill="#45443f"><circle cx="9.4" cy="4.8" r="1"/><circle cx="14.4" cy="4.6" r="0.9"/></g>' +
    '<g fill="#33302a"><circle cx="8.2" cy="16.6" r="2.4"/><circle cx="15.8" cy="16.6" r="2.4"/></g>' +
    '<g fill="#8a8578"><circle cx="8.2" cy="16.6" r="0.9"/><circle cx="15.8" cy="16.6" r="0.9"/></g>',

  /** ディエンビエンフー。分解した大砲を積んだ補強自転車。 */
  bicyclehaul:
    '<rect x="0" y="21.6" width="24" height="2.4" fill="#8f6a4a"/>' +
    '<g stroke="#33302a" stroke-width="1.8" fill="none"><circle cx="5" cy="17.6" r="4.2"/><circle cx="18.4" cy="17.6" r="4.2"/></g>' +
    '<path d="M5,17.6L8,12h6l4.4,5.6M8,12l3.4,5.6" stroke="#4a4436" stroke-width="1.6" fill="none"/>' +
    '<path d="M14,12l-2.6,-3.4" stroke="#4a4436" stroke-width="1.6" fill="none"/>' +
    '<path d="M11,8.6h5.6" stroke="#5a4630" stroke-width="1.8" stroke-linecap="round" fill="none"/>' +
    '<path d="M2,15.4h5" stroke="#5a4630" stroke-width="1.6" stroke-linecap="round" fill="none"/>' +
    '<rect x="4.2" y="4.6" width="14.2" height="5" rx="2.4" fill="#4f5a4a"/>' +
    '<rect x="4.2" y="4.6" width="14.2" height="1.8" rx="0.9" fill="#68755f"/>' +
    '<g fill="#3a3f36"><circle cx="5.6" cy="7.1" r="1.6"/><circle cx="17" cy="7.1" r="1.6"/></g>' +
    '<g stroke="#8a6f3c" stroke-width="1.2" fill="none"><path d="M7.6,3.8v6.6M15.4,3.8v6.6"/></g>' +
    '<path d="M18.4,10.2L21,13.6" stroke="#4a4436" stroke-width="1.4" fill="none"/>',

  /** カオバン。洞窟の入り口(石灰岩)。 */
  karstcave:
    '<rect x="0" y="20.4" width="24" height="3.6" fill="#6f8a52"/>' +
    '<path d="M0,20.4V6q4,-4.6 12,-4.6T24,6v14.4z" fill="#7f8a80"/>' +
    '<path d="M0,20.4V6q4,-4.6 12,-4.6l-2,19z" fill="#9aa79a"/>' +
    '<g stroke="#5f6b62" stroke-width="1.2" opacity=".7" fill="none"><path d="M4.4,20v-6.4M18,20v-8M14.4,8.6l2.6,-3"/></g>' +
    '<path d="M6.4,20.4v-6.6a5.6,5.6 0 0 1 11.2,0v6.6z" fill="#2e2b26"/>' +
    '<path d="M7.8,20.4v-5.6a4.2,4.2 0 0 1 8.4,0v5.6z" fill="#1e1c1a"/>' +
    '<g fill="#5f5850"><path d="M8.6,13.8l1,3.6l1,-3.6zM13.4,13.2l0.9,3l0.9,-3z"/></g>' +
    '<g fill="#5f5850"><path d="M9.6,20.4l1,-3l1,3zM14,20.4l0.9,-2.4l0.9,2.4z"/></g>' +
    '<g fill="#3f7a48"><ellipse cx="3.6" cy="7.4" rx="3" ry="1.5"/><ellipse cx="20.4" cy="9" rx="2.8" ry="1.4"/><ellipse cx="11.6" cy="3.6" rx="3.4" ry="1.5"/></g>' +
    '<g stroke="#4f8f52" stroke-width="1.2" stroke-linecap="round" fill="none"><path d="M2.4,20.4v-2.4M21.4,20.4v-2"/></g>',

  /** ホアビン。ダムの放水路。 */
  damvalley:
    '<rect x="0" y="0" width="24" height="8.6" fill="#7f8f9c"/>' +
    '<path d="M0,8.6L5,2.6L9.4,6.6L14,1.6L19,6L24,3.2V8.6z" fill="#5f7a62"/>' +
    '<rect x="0" y="6.6" width="24" height="4" fill="#4f8090"/>' +
    '<path d="M0,10.4h24l-2.4,11H2.4z" fill="#b8b0a0"/>' +
    '<path d="M0,10.4h24v1.8H0z" fill="#d0c8b6"/>' +
    '<g fill="#9a9080"><path d="M2.6,19.4h18.8l-0.4,2H3z"/></g>' +
    '<path d="M8.6,12.2h6.8l1.4,9.2H7.2z" fill="#3f4a4f"/>' +
    '<path d="M9.4,12.2h5.2l1,9.2H8.4z" fill="#e8f2f6"/>' +
    '<path d="M9.9,12.2h1.4l-0.6,9.2h-1.6zM13,12.2h1.4l0.8,9.2h-1.6z" fill="#bfe0f0"/>' +
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#5f9aa8"/>' +
    '<g fill="#e8f2f6" opacity=".85"><ellipse cx="12" cy="21.6" rx="6" ry="2"/><ellipse cx="5" cy="22.6" rx="3.4" ry="1.2"/><ellipse cx="19" cy="22.6" rx="3.4" ry="1.2"/></g>' +
    '<g fill="#6f6a5e"><rect x="1" y="8.4" width="2.6" height="2.4"/><rect x="20.4" y="8.4" width="2.6" height="2.4"/></g>',

  /** タインホア。巨石を積んだ城門。 */
  stonecitadel:
    '<rect x="0" y="21" width="24" height="3" fill="#7f8a5f"/>' +
    '<rect x="0" y="6.4" width="24" height="14.6" fill="#9aa094"/>' +
    '<rect x="0" y="6.4" width="24" height="1.8" fill="#b6bcae"/>' +
    '<g stroke="#6f7568" stroke-width="1.2" fill="none"><path d="M0,11.6h24M0,16.4h24M4.4,8.2v3.4M12,8.2v3.4M19.6,8.2v3.4M2,11.6v4.8M8.4,11.6v4.8M15.6,11.6v4.8M21.4,11.6v4.8M5.4,16.4v4.6M18,16.4v4.6"/></g>' +
    '<path d="M8,21v-6.4a4,4 0 0 1 8,0V21z" fill="#2e2b26"/>' +
    '<path d="M6.6,21v-7a5.4,5.4 0 0 1 10.8,0v7h-1.4v-6.4a4,4 0 0 0 -8,0V21z" fill="#c2c8ba"/>' +
    '<g stroke="#7f8578" stroke-width="1" fill="none"><path d="M7.6,11.4L12,8.8l4.4,2.6"/></g>' +
    '<g fill="#b6bcae"><rect x="0.6" y="3.6" width="4.4" height="2.8"/><rect x="9.8" y="3.6" width="4.4" height="2.8"/><rect x="19" y="3.6" width="4.4" height="2.8"/></g>' +
    '<g fill="#8a9a52"><path d="M1,21v-2.4l1,2.4zM22.4,21l0.6,-2.2l0.4,2.2z"/></g>',

  /** ヴィン。東側風の集合住宅(規則正しい窓)。 */
  blockhousing:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#8f8778"/>' +
    '<rect x="1.4" y="3.4" width="21.2" height="18" fill="#dcd2b8"/>' +
    '<rect x="0.6" y="2" width="22.8" height="1.8" fill="#a89e8c"/>' +
    '<g fill="#4f6b7a"><rect x="3.4" y="5.4" width="3.4" height="2.8"/><rect x="8.4" y="5.4" width="3.4" height="2.8"/><rect x="13.4" y="5.4" width="3.4" height="2.8"/><rect x="18.4" y="5.4" width="3.4" height="2.8"/><rect x="3.4" y="10.4" width="3.4" height="2.8"/><rect x="8.4" y="10.4" width="3.4" height="2.8"/><rect x="13.4" y="10.4" width="3.4" height="2.8"/><rect x="18.4" y="10.4" width="3.4" height="2.8"/><rect x="3.4" y="15.4" width="3.4" height="2.8"/><rect x="13.4" y="15.4" width="3.4" height="2.8"/><rect x="18.4" y="15.4" width="3.4" height="2.8"/></g>' +
    '<g fill="#b0a488"><rect x="1.4" y="8.8" width="21.2" height="1.4"/><rect x="1.4" y="13.8" width="21.2" height="1.4"/><rect x="1.4" y="18.8" width="21.2" height="1.4"/></g>' +
    '<rect x="8.4" y="16.6" width="3.4" height="4.8" fill="#5a4630"/>' +
    '<g fill="#e8443f"><rect x="4.4" y="9" width="2" height="2.6"/></g>' +
    '<g fill="#5b8fe8"><rect x="19" y="9" width="2.2" height="2.8"/></g>' +
    '<g fill="#f5b31c"><rect x="14" y="14" width="2" height="2.4"/></g>',

  /** ハティン。開いた詩集と筆。 */
  poetverse:
    '<path d="M1,20.4h22v2.6H1z" fill="#8a5f34"/>' +
    '<path d="M12,7.6q-4.6,-2.6 -10.4,-1.6v13.6q5.8,-1 10.4,1.6z" fill="#f2ede0"/>' +
    '<path d="M12,7.6q4.6,-2.6 10.4,-1.6v13.6q-5.8,-1 -10.4,1.6z" fill="#e4ddcb"/>' +
    '<path d="M12,7.6q-4.6,-2.6 -10.4,-1.6v13.6q5.8,-1 10.4,1.6z" fill="none" stroke="#a8763c" stroke-width="1"/>' +
    '<path d="M12,7.6q4.6,-2.6 10.4,-1.6v13.6q-5.8,-1 -10.4,1.6" fill="none" stroke="#a8763c" stroke-width="1"/>' +
    '<rect x="11.4" y="7" width="1.2" height="14" fill="#a8763c"/>' +
    '<g stroke="#5f6b70" stroke-width="0.9" opacity=".8" fill="none"><path d="M3.4,9.4h6M3.4,12h6.4M3.4,14.6h5.4M3.4,17.2h6M14.4,9.4h6M14,12h6.4M14.6,14.6h5.4M14.4,17.2h6"/></g>' +
    '<path d="M17.6,17.4L22.4,4.6" stroke="#5a4630" stroke-width="2" stroke-linecap="round" fill="none"/>' +
    '<path d="M22.2,5L23.6,1.4l-2.8,2.2z" fill="#c9a04c"/>' +
    '<path d="M17.8,17.6l-1.6,3.6l3.2,-2z" fill="#2e2b26"/>',

  /** ドンホイ。巨大な洞窟の断面(天井から光が差す)。 */
  megacave:
    '<rect x="0" y="0" width="24" height="24" fill="#2b2823"/>' +
    '<path d="M5,0h14q-1.6,4.6 -7,4.6T5,0z" fill="#cfe8f2"/>' +
    '<g fill="#4f9a52"><ellipse cx="6.6" cy="1.2" rx="2.6" ry="1.4"/><ellipse cx="12" cy="2" rx="3" ry="1.6"/><ellipse cx="17.4" cy="1" rx="2.4" ry="1.3"/></g>' +
    '<path d="M6.6,3.4L2.6,19.4h18.8L17.4,3.4z" fill="#e8f2ea" opacity=".38"/>' +
    '<path d="M9,3.6L6.6,19.4h10.8L15,3.6z" fill="#f6faf4" opacity=".5"/>' +
    '<path d="M0,0h5.4q-1,3.4 -2.4,7.4T0,15z" fill="#15130f"/>' +
    '<path d="M24,0h-5.4q1,3.4 2.4,7.4T24,15z" fill="#15130f"/>' +
    '<g fill="#15130f"><path d="M0,0h4.4l-2.2,7.4zM19.4,0h4.6l-2,8z"/></g>' +
    '<rect x="0" y="19.4" width="24" height="4.6" fill="#2f6f7f"/>' +
    '<path d="M5.4,19.4q6.6,-1.4 13.2,0q-6.6,2.4 -13.2,0z" fill="#a8dce4"/>' +
    '<g fill="#15130f"><path d="M0.6,19.4l2.2,-5.4l2.2,5.4zM19,19.4l2.2,-4.6l2.2,4.6z"/></g>' +
    '<rect x="11" y="15.2" width="2.2" height="4.2" fill="#f5b31c"/>' +
    '<circle cx="12.1" cy="13.6" r="1.8" fill="#f2ede0"/>',

  /** ドンハー。川ごしに向き合う高い旗竿。 */
  flagpole:
    '<rect x="0" y="0" width="24" height="16.4" fill="#a8cfe0"/>' +
    '<rect x="0" y="16.4" width="24" height="7.6" fill="#6f9aa8"/>' +
    '<g stroke="#bfe0e8" stroke-width="1" opacity=".8" fill="none"><path d="M0,19h8M14,21.4h10"/></g>' +
    '<path d="M0,14.4h9v2H0zM15,14.4h9v2h-9z" fill="#7f8a5f"/>' +
    '<path d="M0,16.4h9v1.6H0zM15,16.4h9v1.6h-9z" fill="#6f7a4c"/>' +
    '<rect x="3.4" y="2" width="1.4" height="12.4" fill="#cfc7b4"/>' +
    '<circle cx="4.1" cy="1.4" r="1.1" fill="#f5b31c"/>' +
    '<path d="M4.8,2.6h6.6v4.8H4.8z" fill="#da251d"/>' +
    '<path d="M8.1,3.6l0.6,1.7h1.8l-1.4,1.1l0.5,1.7l-1.5,-1.1l-1.5,1.1l0.5,-1.7l-1.4,-1.1h1.8z" fill="#ffcd00"/>' +
    '<rect x="19.2" y="4" width="1.4" height="10.4" fill="#cfc7b4"/>' +
    '<circle cx="19.9" cy="3.4" r="1.1" fill="#f5b31c"/>' +
    '<path d="M19.2,4.6h-6.2v4.4h6.2z" fill="#da251d"/>' +
    '<path d="M16.1,5.4l0.55,1.6h1.7l-1.35,1l0.5,1.6l-1.4,-1l-1.4,1l0.5,-1.6l-1.35,-1h1.7z" fill="#ffcd00"/>' +
    '<rect x="0" y="14" width="24" height="1" fill="#8a9a62" opacity=".7"/>',

  /** フエ。反り屋根の楼門(午門)。 */
  imperialgate:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#7f8a5f"/>' +
    '<rect x="0.6" y="13" width="22.8" height="8.4" fill="#8f6a4a"/>' +
    '<rect x="0.6" y="13" width="22.8" height="1.6" fill="#a8815c"/>' +
    '<g fill="#2e2b26"><path d="M9.6,21.4v-4.4a2.4,2.4 0 0 1 4.8,0v4.4z"/><path d="M3.4,21.4v-3a1.8,1.8 0 0 1 3.6,0v3z"/><path d="M17,21.4v-3a1.8,1.8 0 0 1 3.6,0v3z"/></g>' +
    '<path d="M9,21.4v-4.6a3,3 0 0 1 6,0v4.6h-0.6v-4.4a2.4,2.4 0 0 0 -4.8,0v4.4z" fill="#c9a04c"/>' +
    '<path d="M0,13q4.4,-4.4 12,-4.4T24,13z" fill="#a2503c"/>' +
    '<path d="M0,13q4.4,-4.4 12,-4.4T24,13" stroke="#7f3a2c" stroke-width="1" fill="none"/>' +
    '<path d="M0,13q-0.6,-1.4 -0.4,-2.6q1.2,0.8 2,2z" fill="#7f3a2c"/>' +
    '<path d="M24,13q0.6,-1.4 0.4,-2.6q-1.2,0.8 -2,2z" fill="#7f3a2c"/>' +
    '<rect x="5.6" y="4.6" width="12.8" height="4.4" fill="#c9302c"/>' +
    '<g fill="#f5b31c"><rect x="7.4" y="5.6" width="2.4" height="2.4"/><rect x="10.8" y="5.6" width="2.4" height="2.4"/><rect x="14.2" y="5.6" width="2.4" height="2.4"/></g>' +
    '<path d="M3.8,4.6q3.2,-3.2 8.2,-3.2t8.2,3.2z" fill="#a2503c"/>' +
    '<path d="M3.8,4.6q3.2,-3.2 8.2,-3.2t8.2,3.2" stroke="#7f3a2c" stroke-width="0.9" fill="none"/>',

  /** ダナン。山腹をうねる線路とトンネル坑口。 */
  mountainpass:
    '<rect x="0" y="0" width="24" height="8" fill="#cfe4f0"/>' +
    '<path d="M0,8L4.6,2.6L8.4,6L14,0.8L18.6,5.4L24,2V8z" fill="#7f95a4"/>' +
    '<path d="M14,0.8l2.6,3.6l-1.2,-0.5l-1,0.8l-0.9,-0.8l-1,0.5z" fill="#eef3f6"/>' +
    '<path d="M0,24V5.6q8,2.4 13,9.4Q21,22 21.6,24z" fill="#3f6b4a"/>' +
    '<path d="M24,24V14.4q-4,1.4 -6.6,4.4Q14.9,22 14.6,24z" fill="#2f5238"/>' +
    '<path d="M0,12.4q7,0.6 11.4,5.2Q15,21.4 16,24" stroke="#efe4cc" stroke-width="4" fill="none"/>' +
    '<g stroke="#6b5330" stroke-width="1.4" fill="none"><path d="M1.4,11v2.8M5,11.6v3M8.4,13.4l-1.2,2.8M11,16l-2.2,2.2M13.4,19.4l-2.6,1.6M15,22.4l-2.8,1.2"/></g>' +
    '<path d="M14.4,14.6V9.4a4.9,4.9 0 0 1 9.8,0v5.2z" fill="#f2ede0"/>' +
    '<path d="M15.8,14.6v-4.2a3.6,3.6 0 0 1 7.2,0v4.2z" fill="#15130f"/>' +
    '<rect x="16.8" y="11.2" width="5" height="3.4" fill="#c9302c"/>' +
    '<g fill="#cfe4f0"><rect x="17.8" y="12" width="1.4" height="1.6"/><rect x="20" y="12" width="1.4" height="1.6"/></g>',

  /** ホイアン。間口の狭い木造商家の並び。 */
  shophouse:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#a89e8c"/>' +
    '<g><rect x="0.4" y="7.6" width="6.4" height="13.8" fill="#e8c46a"/><rect x="7.4" y="5.6" width="6.4" height="15.8" fill="#efd9a0"/><rect x="14.4" y="8.4" width="5" height="13" fill="#e0a85c"/><rect x="20" y="6.6" width="3.6" height="14.8" fill="#dcb45c"/></g>' +
    '<g fill="#a2503c"><path d="M-0.4,7.6h8l-1,-2.4H0.6z"/><path d="M6.6,5.6h8l-1,-2.4H7.6z"/><path d="M13.6,8.4h6.6l-0.9,-2.2h-4.8z"/><path d="M19.2,6.6h5.2l-0.8,-2h-3.6z"/></g>' +
    '<g fill="#7f3a2c"><rect x="-0.4" y="7.6" width="8" height="1"/><rect x="6.6" y="5.6" width="8" height="1"/><rect x="13.6" y="8.4" width="6.6" height="1"/><rect x="19.2" y="6.6" width="5.2" height="1"/></g>' +
    '<g fill="#4f6b7a"><rect x="1.8" y="10.4" width="3.6" height="3.4"/><rect x="8.8" y="8.4" width="3.6" height="3.4"/><rect x="15.4" y="11" width="3" height="3.2"/><rect x="20.8" y="9.4" width="2.2" height="3"/></g>' +
    '<g fill="#5a4630"><rect x="1.6" y="15.6" width="4" height="5.8"/><rect x="8.6" y="14" width="4" height="7.4"/><rect x="15.2" y="16.4" width="3.4" height="5"/><rect x="20.6" y="15" width="2.6" height="6.4"/></g>' +
    '<g fill="#c9a86e"><rect x="0.4" y="14.4" width="6.4" height="1.2"/><rect x="7.4" y="12.8" width="6.4" height="1.2"/><rect x="14.4" y="15.2" width="5" height="1.2"/></g>' +
    '<g fill="#e8443f"><ellipse cx="6.8" cy="10" rx="1.2" ry="1.8"/></g>' +
    '<g fill="#f5b31c"><ellipse cx="14" cy="11.4" rx="1.2" ry="1.8"/></g>',

  /** クアンガイ。大きな土製の甕棺。 */
  burialjar:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#a8824c"/>' +
    '<ellipse cx="12" cy="21.4" rx="9" ry="2" fill="#8f6a2c" opacity=".5"/>' +
    '<path d="M5.6,10.4q-2.4,4 -1.2,7.4q1.2,3.6 7.6,3.6t7.6,-3.6q1.2,-3.4 -1.2,-7.4z" fill="#a8763c"/>' +
    '<path d="M5.6,10.4q-2.4,4 -1.2,7.4q0.6,1.8 2.6,2.8q-2,-5 1.4,-10.2z" fill="#c2914c"/>' +
    '<path d="M5.6,10.4h12.8l1,-2.6H4.6z" fill="#8f6a2c"/>' +
    '<path d="M7,7.8h10l-0.8,-2.4H7.8z" fill="#a8763c"/>' +
    '<path d="M6.2,5.4h11.6q0.6,-2.4 -5.8,-2.4T6.2,5.4z" fill="#7f5a2c"/>' +
    '<g stroke="#7f5a2c" stroke-width="1.2" opacity=".9" fill="none"><path d="M4.6,14.6q7.4,2 14.8,0M5,18q7,2 14,0"/></g>' +
    '<g fill="#5f4728" opacity=".85"><circle cx="9" cy="12.6" r="1"/><circle cx="12" cy="11.8" r="1"/><circle cx="15" cy="12.6" r="1"/></g>' +
    '<path d="M13.6,16q-2.6,3 -0.4,5.4" stroke="#5f4728" stroke-width="1.2" fill="none"/>',

  /** クイニョン。細身のチャム煉瓦塔(田んぼに点在)。 */
  chamtower:
    '<rect x="0" y="19.6" width="24" height="4.4" fill="#5f9a42"/>' +
    '<g stroke="#c9bda4" stroke-width="1" opacity=".8" fill="none"><path d="M0,21.6h24"/></g>' +
    '<path d="M18.6,19.6V11h4.6v8.6z" fill="#8f4634"/>' +
    '<path d="M18.6,11h4.6l-0.8,-1.6h-3z" fill="#a85a42"/>' +
    '<path d="M6,19.6V5.4h9V19.6z" fill="#a85a42"/>' +
    '<path d="M6,19.6V5.4h3v14.2z" fill="#c2725a"/>' +
    '<g fill="#8f4634"><rect x="5.2" y="4.6" width="10.6" height="1.4"/><rect x="6.4" y="3" width="8.2" height="1.6"/><rect x="7.4" y="1.6" width="6.2" height="1.4"/></g>' +
    '<path d="M9.4,1.6h2.2l-1.1,-1.4z" fill="#7f3a2c"/>' +
    '<path d="M8.8,19.6v-4.8q0,-1.4 1.8,-1.4t1.8,1.4v4.8z" fill="#4f2f24"/>' +
    '<g fill="#8f4634" opacity=".9"><rect x="6.6" y="8" width="1.4" height="3.6"/><rect x="13" y="8" width="1.4" height="3.6"/></g>' +
    '<g fill="#c9302c"><rect x="16.4" y="12" width="1" height="7.6"/><path d="M16.4,12h3.4v2.6h-3.4z"/></g>' +
    '<g stroke="#4f8f3f" stroke-width="1.2" stroke-linecap="round" fill="none"><path d="M1.4,23.4v-2.4M3.4,23.4v-1.8M21.6,23.4v-2"/></g>',

  /** トゥイホア。六角柱の玄武岩が積み重なる。 */
  basaltcolumn:
    '<rect x="0" y="18.6" width="24" height="5.4" fill="#3f8fa8"/>' +
    '<g stroke="#a8d8e0" stroke-width="1" opacity=".7" fill="none"><path d="M0,20.6h7M13,22.4h11"/></g>' +
    '<g fill="#4a4f52">' +
    '<path d="M1,18.6V8.6l2.6,-1.5l2.6,1.5v10z"/>' +
    '<path d="M6.2,18.6V5.4l2.6,-1.5l2.6,1.5v13.2z"/>' +
    '<path d="M11.4,18.6V7l2.6,-1.5L16.6,7v11.6z"/>' +
    '<path d="M16.6,18.6V10l2.6,-1.5l2.6,1.5v8.6z"/>' +
    '</g>' +
    '<g fill="#6b7276">' +
    '<path d="M1,8.6l2.6,-1.5l2.6,1.5l-2.6,1.5z"/>' +
    '<path d="M6.2,5.4L8.8,3.9l2.6,1.5l-2.6,1.5z"/>' +
    '<path d="M11.4,7L14,5.5L16.6,7L14,8.5z"/>' +
    '<path d="M16.6,10l2.6,-1.5l2.6,1.5l-2.6,1.5z"/>' +
    '</g>' +
    '<g fill="#5c6266"><path d="M3.6,10.1v8.5H1V8.6zM8.8,6.9v11.7H6.2V5.4zM14,8.5v10.1h-2.6V7zM19.2,11.5v7.1h-2.6V10z"/></g>' +
    '<g stroke="#2f3335" stroke-width="0.9" fill="none"><path d="M1,18.6V8.6M6.2,18.6V5.4M11.4,18.6V7M16.6,18.6V10M21.8,18.6V10"/></g>' +
    '<g fill="#e8f2f6" opacity=".8"><ellipse cx="9" cy="19" rx="4" ry="1.2"/><ellipse cx="19" cy="19.2" rx="3.4" ry="1"/></g>',

  /** ニャチャン。丘の上の西洋風の墓。 */
  scientisttomb:
    '<path d="M0,24V17q6,-3.6 12,-3.6T24,17v7z" fill="#6f9a5c"/>' +
    '<path d="M0,24v-4q6,-3 12,-3t12,3v4z" fill="#5f8a4c"/>' +
    '<ellipse cx="12" cy="17.6" rx="9" ry="1.8" fill="#000" opacity=".16"/>' +
    '<rect x="3.4" y="15.4" width="17.2" height="2.6" fill="#c2c8ba"/>' +
    '<rect x="4.6" y="12.8" width="14.8" height="2.6" fill="#e8e6dc"/>' +
    '<rect x="5.8" y="9.6" width="12.4" height="3.4" fill="#f2f0e6"/>' +
    '<g stroke="#c2c8ba" stroke-width="0.9" fill="none"><path d="M5.8,11.2h12.4"/></g>' +
    '<rect x="9.4" y="3.6" width="5.2" height="6.2" fill="#e8e6dc"/>' +
    '<path d="M8.8,3.6h6.4l-3.2,-2.4z" fill="#b0b4a6"/>' +
    '<g fill="#8a9088"><rect x="10.4" y="5.4" width="3.2" height="3.2"/></g>' +
    '<g fill="#c9302c"><ellipse cx="6.4" cy="19.4" rx="2.4" ry="1.2"/></g>' +
    '<g fill="#f5b31c"><ellipse cx="18" cy="20.4" rx="2.2" ry="1.1"/></g>' +
    '<path d="M21,17.4V13l1.4,-3.4L23.8,13v4.4z" fill="#2f6b45"/>' +
    '<path d="M1.4,18V14L2.6,11l1.2,3v4z" fill="#2f6b45"/>',

  /** ファンラン。布をまとわされたチャムの守護神像。 */
  kateoffering:
    '<rect x="0" y="21" width="24" height="3" fill="#a8824c"/>' +
    '<path d="M3.4,21V18h17.2v3z" fill="#8f6a2c"/>' +
    '<path d="M4.6,18v-2h14.8v2z" fill="#a8763c"/>' +
    '<path d="M7,16V9.4q0,-3 5,-3t5,3V16z" fill="#8f4634"/>' +
    '<path d="M7,16V9.4q0,-3 5,-3v9.6z" fill="#a85a42"/>' +
    '<path d="M5.8,16h12.4l1,2H4.8z" fill="#c9302c"/>' +
    '<path d="M4.8,18h14.4v1.6H4.8z" fill="#f5b31c"/>' +
    '<path d="M5.8,16q2.4,-1.6 6.2,-1.6T18.2,16z" fill="#e8553f"/>' +
    '<circle cx="12" cy="5.6" r="3.6" fill="#c2725a"/>' +
    '<path d="M8.4,5.6a3.6,3.6 0 0 1 7.2,0z" fill="#a85a42"/>' +
    '<path d="M8.8,3.2q3.2,-2.6 6.4,0q-0.4,-3 -3.2,-3T8.8,3.2z" fill="#c9a04c"/>' +
    '<g fill="#2e2b26"><circle cx="10.6" cy="5.6" r="0.8"/><circle cx="13.4" cy="5.6" r="0.8"/></g>' +
    '<path d="M10.6,7.4q1.4,1 2.8,0" stroke="#7f3a2c" stroke-width="0.9" fill="none"/>' +
    '<g stroke="#8a8578" stroke-width="0.9" fill="none"><path d="M20.4,18v-4M22,18v-4.6"/></g>' +
    '<g fill="#f5b31c"><circle cx="20.4" cy="13.4" r="1"/><circle cx="22" cy="12.8" r="1"/></g>',

  /** ファンティエット。魚醤の木樽の列。 */
  fishsauce:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#9a9080"/>' +
    '<g fill="#5f4728"><path d="M14.6,21.4l-0.8,-8.4q2.6,-1 5.2,0l-0.8,8.4z"/></g>' +
    '<path d="M14.6,21.4l-0.8,-8.4q1.2,-0.5 2.6,-0.6v9z" fill="#7f5f34"/>' +
    '<g stroke="#3f2f1c" stroke-width="1" fill="none"><path d="M13.9,15.4q2.6,-0.9 5.2,0M14.2,18.6q2.4,-0.8 4.6,0"/></g>' +
    '<g fill="#8a5f34"><path d="M1.4,21.4L0.2,7q4.4,-2 8.8,0L7.8,21.4z"/></g>' +
    '<path d="M1.4,21.4L0.2,7q1.8,-0.8 3.8,-1v15.4z" fill="#a8763c"/>' +
    '<g stroke="#4f3a20" stroke-width="1.2" fill="none"><path d="M0.5,10.4q4,-1.6 8,0M0.9,14.8q3.6,-1.4 7.2,0M1.2,18.8q3.2,-1.2 6.4,0"/></g>' +
    '<path d="M0.2,7q4.4,-2 8.8,0q-4.4,1.8 -8.8,0z" fill="#c9a04c"/>' +
    '<ellipse cx="4.6" cy="7" rx="3.4" ry="1.2" fill="#8f6a2c"/>' +
    '<path d="M9.6,21.4L8.8,11q2.8,-1.2 5.6,0l-0.8,10.4z" fill="#6f4f28"/>' +
    '<g stroke="#3f2f1c" stroke-width="1" fill="none"><path d="M9,14q2.8,-1 5.2,0M9.3,18q2.4,-0.9 4.6,0"/></g>' +
    '<path d="M18.6,13.4h4.4v3h-4.4z" fill="#c9a04c"/>' +
    '<path d="M19.6,16.4l1.4,4.6l1.4,-4.6z" fill="#a8763c"/>',

  /** ダラット。ラックレールの登山鉄道車両。 */
  cograilway:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#8f8778"/>' +
    '<g fill="#6b5330"><rect x="0" y="19.6" width="24" height="2"/></g>' +
    '<g stroke="#5a5750" stroke-width="1.4" fill="none"><path d="M0,19h24"/></g>' +
    '<g fill="#5f6b70"><rect x="9.4" y="17" width="5.2" height="2.4"/></g>' +
    '<g fill="#8a8578">' +
    '<rect x="8.4" y="17.4" width="1.4" height="1.8"/><rect x="10.4" y="17.4" width="1.4" height="1.8"/>' +
    '<rect x="12.4" y="17.4" width="1.4" height="1.8"/><rect x="14.4" y="17.4" width="1.4" height="1.8"/>' +
    '<rect x="6.4" y="17.4" width="1.4" height="1.8"/><rect x="16.4" y="17.4" width="1.4" height="1.8"/>' +
    '</g>' +
    '<path d="M2.4,17.4V6.4q0,-2 3,-2h13.2q3,0 3,2v11z" fill="#c9302c"/>' +
    '<path d="M2.4,17.4V6.4q0,-2 3,-2h2.4v13z" fill="#e8553f"/>' +
    '<rect x="1.6" y="3.4" width="20.8" height="2" rx="0.9" fill="#f2ede0"/>' +
    '<g fill="#a8d0e0"><rect x="4" y="7.4" width="4" height="4.4"/><rect x="10" y="7.4" width="4" height="4.4"/><rect x="16" y="7.4" width="4" height="4.4"/></g>' +
    '<g fill="#8f2420"><rect x="2.4" y="13.4" width="19.2" height="1.6"/></g>' +
    '<g fill="#33302a"><circle cx="6.4" cy="16.6" r="2.4"/><circle cx="17.6" cy="16.6" r="2.4"/></g>' +
    '<g fill="#c9bda4"><circle cx="6.4" cy="16.6" r="0.9"/><circle cx="17.6" cy="16.6" r="0.9"/></g>' +
    '<rect x="10.8" y="1" width="2.4" height="2.6" fill="#5f6b70"/>',

  /** ブオンマトゥオット。赤く熟したコーヒーの実の房。 */
  coffeecherry:
    '<path d="M13.4,24V4.6" stroke="#5f4728" stroke-width="2.4" stroke-linecap="round" fill="none"/>' +
    '<g fill="#2f6b3f"><path d="M13.4,8q-5.6,-3.4 -9.6,-0.6q3.4,4.6 9.6,0.6z"/><path d="M13.4,14q5.6,-3.4 9.6,-0.6q-3.4,4.6 -9.6,0.6z"/><path d="M13.4,19.6q-5,-3 -8.6,-0.6q3,4.2 8.6,0.6z"/></g>' +
    '<g stroke="#4f8f52" stroke-width="0.9" fill="none"><path d="M13.4,8q-4.4,-1.6 -9.6,-0.6M13.4,14q4.4,-1.6 9.6,-0.6M13.4,19.6q-4,-1.4 -8.6,-0.6"/></g>' +
    '<g fill="#8f2420"><circle cx="9.6" cy="10.6" r="3.4"/><circle cx="16.4" cy="10.4" r="3.2"/><circle cx="10.4" cy="16.6" r="3.4"/><circle cx="17" cy="17" r="3"/><circle cx="13.4" cy="4.6" r="3"/></g>' +
    '<g fill="#c9302c"><circle cx="9" cy="10" r="2.4"/><circle cx="16" cy="9.8" r="2.2"/><circle cx="9.8" cy="16" r="2.4"/><circle cx="16.6" cy="16.5" r="2.1"/><circle cx="13" cy="4.2" r="2.1"/></g>' +
    '<g fill="#e8553f"><circle cx="8.2" cy="9.2" r="0.9"/><circle cx="15.2" cy="9" r="0.8"/><circle cx="9" cy="15.2" r="0.9"/></g>',

  /** プレイク。並んだ銅鑼(円形の金属板)と撥。 */
  gongensemble:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#8f6a4a"/>' +
    '<g stroke="#5a4630" stroke-width="1.4" fill="none"><path d="M1,4.4h22"/></g>' +
    '<g fill="#5a4630"><rect x="0.6" y="3" width="1.8" height="18.4"/><rect x="21.6" y="3" width="1.8" height="18.4"/></g>' +
    '<g stroke="#7f5a2c" stroke-width="1" fill="none"><path d="M5.6,4.4v3M12,4.4v2.4M18.4,4.4v3.4"/></g>' +
    '<circle cx="5.6" cy="12.4" r="5" fill="#8f6a2c"/>' +
    '<circle cx="5.6" cy="12.4" r="4" fill="#c9a04c"/>' +
    '<circle cx="5.6" cy="12.4" r="1.8" fill="#e0bd6a"/>' +
    '<circle cx="5.6" cy="12.4" r="0.8" fill="#8f6a2c"/>' +
    '<circle cx="12" cy="13.6" r="6" fill="#7f5a2c"/>' +
    '<circle cx="12" cy="13.6" r="4.9" fill="#d8b05c"/>' +
    '<circle cx="12" cy="13.6" r="2.2" fill="#efd18a"/>' +
    '<circle cx="12" cy="13.6" r="1" fill="#8f6a2c"/>' +
    '<circle cx="18.4" cy="12.8" r="4.4" fill="#8f6a2c"/>' +
    '<circle cx="18.4" cy="12.8" r="3.5" fill="#c9a04c"/>' +
    '<circle cx="18.4" cy="12.8" r="1.5" fill="#e0bd6a"/>' +
    '<path d="M14.6,20.4l6.4,-3.6" stroke="#5a4630" stroke-width="1.8" stroke-linecap="round" fill="none"/>' +
    '<circle cx="14.2" cy="20.6" r="2" fill="#c2453c"/>',

  /** コントゥム。高床式の木造家屋(急勾配の茅葺き屋根)。 */
  stilthouse:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#8f6a4a"/>' +
    '<g fill="#5f4728"><rect x="3.4" y="15.4" width="2" height="6.4"/><rect x="8.4" y="15.4" width="2" height="6.4"/><rect x="13.4" y="15.4" width="2" height="6.4"/><rect x="18.4" y="15.4" width="2" height="6.4"/></g>' +
    '<rect x="2.4" y="11" width="19.2" height="4.8" fill="#a8763c"/>' +
    '<rect x="2.4" y="11" width="19.2" height="1.2" fill="#c2914c"/>' +
    '<g fill="#5a4630"><rect x="10.4" y="12" width="3.4" height="3.8"/></g>' +
    '<path d="M0.6,11.4h22.8L12,0.6z" fill="#8a7a4a"/>' +
    '<path d="M4,11.4h16L12,3.4z" fill="#a09062"/>' +
    '<g stroke="#6b5f38" stroke-width="1" opacity=".9" fill="none"><path d="M3,9.4h18M4.8,7h14.4M6.6,4.6h10.8"/></g>' +
    '<path d="M0.6,11.4h22.8v1.2H0.6z" fill="#6b5f38"/>' +
    '<g stroke="#6b5f38" stroke-width="1.4" fill="none"><path d="M10.6,0.8l1.4,-0.6M13.4,0.8L12,0.2"/></g>' +
    '<path d="M10.4,15.8l-3,6" stroke="#5f4728" stroke-width="1.8" fill="none"/>' +
    '<g stroke="#5f4728" stroke-width="1" fill="none"><path d="M9.4,17.4l-2,0.6M8.6,19l-2,0.6"/></g>',

  /** ホーチミン市。突き破られた鉄門。 */
  palacegate:
    '<rect x="0" y="0" width="24" height="19.4" fill="#e2e8ea"/>' +
    '<rect x="0" y="19.4" width="24" height="4.6" fill="#b8ae98"/>' +
    '<g fill="#c2c8cc"><rect x="2" y="4" width="7.4" height="15.4"/><rect x="14.6" y="6.4" width="7.4" height="13"/></g>' +
    '<g fill="#96a0a8"><rect x="3.4" y="6" width="4.2" height="2.4"/><rect x="3.4" y="10.4" width="4.2" height="2.4"/><rect x="16" y="8.4" width="4.2" height="2.4"/><rect x="16" y="12.4" width="4.2" height="2.4"/></g>' +
    '<g fill="#2b323a"><rect x="0" y="7.4" width="2.6" height="12"/><rect x="21.4" y="7.4" width="2.6" height="12"/></g>' +
    '<ellipse cx="12" cy="19.6" rx="10.4" ry="2" fill="#000" opacity=".25"/>' +
    '<g transform="rotate(-24 12 14)">' +
    '<rect x="3" y="8.6" width="18" height="2.4" fill="#2b323a"/>' +
    '<rect x="3" y="17.2" width="18" height="2.4" fill="#2b323a"/>' +
    '<g stroke="#2b323a" stroke-width="2" fill="none"><path d="M5,8.6v11M8,8.6v11M11,8.6v11M14,8.6v11M17,8.6v11M20,8.6v11"/></g>' +
    '</g>',

  /** ビエンホア。工業団地の門(バーとフェンス)。 */
  factoryzone:
    '<rect x="0" y="0" width="24" height="19.6" fill="#e2e8ea"/>' +
    '<rect x="0" y="19.6" width="24" height="4.4" fill="#8f8778"/>' +
    '<g fill="#b6bfc4"><rect x="0" y="6.4" width="6.4" height="6"/><rect x="15" y="5" width="9" height="7.4"/></g>' +
    '<g fill="#9aa4aa"><rect x="7.6" y="2.4" width="2.2" height="10"/><rect x="17" y="1.6" width="1.8" height="3.4"/></g>' +
    '<rect x="0" y="12.4" width="24" height="1.6" fill="#a89e8c"/>' +
    '<g stroke="#6f7b82" stroke-width="1.2" fill="none"><path d="M13,19.6v-5.6M16,19.6v-5.6M19,19.6v-5.6M22,19.6v-5.6M12,15.6h12M12,18h12"/></g>' +
    '<g fill="#5f6b70"><rect x="11.2" y="13" width="1.8" height="6.6"/><rect x="22.6" y="13" width="1.4" height="6.6"/></g>' +
    '<rect x="1.4" y="9.4" width="4.2" height="10.2" fill="#3f4a4f"/>' +
    '<rect x="0.4" y="7.2" width="6.2" height="2.4" fill="#3f4a4f"/>' +
    '<circle cx="3.5" cy="8.4" r="0.9" fill="#f5b31c"/>' +
    '<rect x="5.6" y="14.4" width="16.6" height="3.4" fill="#f2ede0"/>' +
    '<g fill="#c9302c"><rect x="8.4" y="14.4" width="3.4" height="3.4"/><rect x="15.2" y="14.4" width="3.4" height="3.4"/><rect x="21.2" y="14.4" width="1" height="3.4"/></g>' +
    '<g fill="#a89e8c"><rect x="5.6" y="14.4" width="16.6" height="0.9"/><rect x="5.6" y="16.9" width="16.6" height="0.9"/></g>',

  /** ヴンタウ。洋上の掘削リグ。 */
  oilrig:
    '<rect x="0" y="0" width="24" height="14.4" fill="#cfe4f0"/>' +
    '<rect x="0" y="14.4" width="24" height="9.6" fill="#1f5f80"/>' +
    '<rect x="0" y="14.4" width="24" height="2" fill="#2f7f9c"/>' +
    '<g stroke="#8fc4d8" stroke-width="1" opacity=".8" fill="none"><path d="M0,18h7M14,21h10"/></g>' +
    '<g fill="#2b323a"><path d="M3,22.4L4.6,8.4h2L5,22.4zM21,22.4L19.4,8.4h-2L19,22.4z"/></g>' +
    '<g stroke="#2b323a" stroke-width="1.4" fill="none"><path d="M4.4,11.6h15.2M3.8,15.6h16.4M4.8,9.4h14.4"/></g>' +
    '<rect x="1.4" y="5.6" width="21.2" height="3" fill="#3f4a4f"/>' +
    '<rect x="1.4" y="4.6" width="21.2" height="1.4" fill="#7f8b92"/>' +
    '<path d="M10.4,0.6l4.6,4h-9.2z" fill="#2b323a"/>' +
    '<g stroke="#2b323a" stroke-width="1.4" fill="none"><path d="M9.2,2.6h2.4M8.2,4h4.4"/></g>' +
    '<rect x="16" y="1.4" width="5.4" height="3.2" fill="#f2ede0"/>' +
    '<g fill="#3f5f70"><rect x="16.8" y="2.2" width="1.6" height="1.4"/><rect x="19.2" y="2.2" width="1.6" height="1.4"/></g>' +
    '<rect x="2.6" y="2.6" width="1.4" height="2.2" fill="#5f6b70"/>' +
    '<path d="M3.3,2.8c-2.2,-1.2 -1.6,-2.6 0,-2.8c-0.4,1 0.4,0.9 0.8,0.4c0.8,1 0.6,1.9 -0.8,2.4z" fill="#f5b31c"/>',

  /** タイニン。三角形に囲まれた大きな目(カオダイの神眼)。 */
  divineeye:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#c9a86e"/>' +
    '<path d="M12,0.6L23.4,21.4H0.6z" fill="#f5b31c"/>' +
    '<path d="M12,3.6L20.6,19.4H3.4z" fill="#3f5f9f"/>' +
    '<path d="M12,3.6L20.6,19.4h-4L12,6z" fill="#33518a"/>' +
    '<g><path d="M4.4,13.4q7.6,-6.4 15.2,0q-7.6,6.4 -15.2,0z" fill="#f2ede0"/></g>' +
    '<circle cx="12" cy="13.4" r="4" fill="#5b8fe8"/>' +
    '<circle cx="12" cy="13.4" r="2" fill="#1e2b3a"/>' +
    '<circle cx="10.8" cy="12.2" r="0.9" fill="#f2ede0"/>' +
    '<path d="M4.4,13.4q7.6,-6.4 15.2,0" stroke="#2e2b26" stroke-width="1.2" fill="none"/>' +
    '<path d="M4.4,13.4q7.6,6.4 15.2,0" stroke="#2e2b26" stroke-width="1.2" fill="none"/>' +
    '<g stroke="#c9302c" stroke-width="1.2" stroke-linecap="round" fill="none"><path d="M3.4,10.6L1.6,9M20.6,10.6l1.8,-1.6M12,7.4V5.6"/></g>',

  /** ミトー。まっすぐな消えた鉄道敷地と木造船。 */
  deltaboat:
    '<rect x="0" y="0" width="24" height="10.4" fill="#cfe4f0"/>' +
    '<rect x="0" y="6.6" width="24" height="3.8" fill="#5f8a4c"/>' +
    '<g fill="#6f9a52"><ellipse cx="4" cy="6.6" rx="4" ry="2"/><ellipse cx="19" cy="6.4" rx="4.4" ry="2.2"/><ellipse cx="11.6" cy="6.8" rx="3" ry="1.6"/></g>' +
    '<rect x="0" y="8.2" width="24" height="2.2" fill="#e0d6bc"/>' +
    '<g stroke="#a08d68" stroke-width="0.8" fill="none"><path d="M0,8.2h24M0,10.4h24"/></g>' +
    '<rect x="0" y="10.4" width="24" height="13.6" fill="#7f7040"/>' +
    '<rect x="0" y="10.4" width="24" height="2" fill="#98884e"/>' +
    '<g stroke="#b8a468" stroke-width="1" opacity=".8" fill="none"><path d="M0,14h7M16,15h8"/></g>' +
    '<rect x="15.4" y="9.4" width="1.4" height="7" fill="#5f4728"/>' +
    '<path d="M16.8,9.8h4.6l-1.7,1.9l1.7,1.9h-4.6z" fill="#c9302c"/>' +
    '<path d="M7.6,16.4q4.4,-3.8 8.8,0z" fill="#3f8f6f"/>' +
    '<path d="M0.6,16.4q1.4,5.6 11.4,5.6t11.4,-5.6z" fill="#4f3218"/>' +
    '<path d="M0.6,16.4h22.8v2.2H0.6z" fill="#d8b476"/>' +
    '<path d="M3.4,18.6q8.6,2.4 17.2,0q-1.6,1.8 -8.6,1.8t-8.6,-1.8z" fill="#2e2114"/>' +
    '<path d="M4,22.2q8,1.6 16,0" stroke="#f0f6f8" stroke-width="1" opacity=".45" fill="none"/>',

  /** ベンチェー。ヤシの実とキャンディーの包み。 */
  coconutcandy:
    '<rect x="0" y="20.4" width="24" height="3.6" fill="#a8763c"/>' +
    '<rect x="0" y="20.4" width="24" height="1.2" fill="#c2914c"/>' +
    '<circle cx="7" cy="13.4" r="7" fill="#5f4728"/>' +
    '<circle cx="7" cy="13.4" r="5.6" fill="#8a6f3c"/>' +
    '<path d="M7,7.8a5.6,5.6 0 0 1 0,11.2q-3,-5.6 0,-11.2z" fill="#a8824c"/>' +
    '<path d="M3.6,9.4q3.4,3 0,8" stroke="#5f4728" stroke-width="1" fill="none"/>' +
    '<g fill="#f2ede0"><path d="M10.4,11.4a4.6,4.6 0 0 1 6.4,-1.4l-3,4.6z"/></g>' +
    '<g fill="#5f4728"><circle cx="5.4" cy="9.6" r="0.9"/><circle cx="8.4" cy="9" r="0.9"/></g>' +
    '<g><path d="M12.6,20.4l1.4,-5.4h7.4l1.4,5.4z" fill="#f2ede0"/>' +
    '<path d="M12.6,20.4l1.4,-5.4h2.6l-1.2,5.4z" fill="#ffffff"/>' +
    '<path d="M14,15l-2.6,-2.4l3.6,0.8zM21.4,15l2.6,-2.4l-3.6,0.8z" fill="#e0d8c6"/>' +
    '<g fill="#c9302c"><rect x="15" y="16.4" width="5.6" height="2.4" rx="1"/></g>' +
    '<g stroke="#a8763c" stroke-width="0.9" fill="none"><path d="M14.4,19.4h6.6"/></g></g>' +
    '<path d="M17.6,15.4v-2.6" stroke="#4f8f3f" stroke-width="1.4" fill="none"/>' +
    '<path d="M17.6,13.4q2.4,-2.4 4.6,-1q-1.6,3 -4.6,1z" fill="#4f8f3f"/>',

  /** カントー。高い竿に吊るした果物の見本。 */
  hangingsample:
    '<rect x="0" y="17.4" width="24" height="6.6" fill="#9a8a58"/>' +
    '<rect x="0" y="17.4" width="24" height="1.8" fill="#a89a68"/>' +
    '<g stroke="#c4b688" stroke-width="1" opacity=".8" fill="none"><path d="M0,21h8M15,22.4h9"/></g>' +
    '<path d="M2.4,18.4q1.4,3.6 9.6,3.6t9.6,-3.6z" fill="#8a5f34"/>' +
    '<path d="M2.4,18.4h19.2v1.4H2.4z" fill="#b08a52"/>' +
    '<path d="M11,18.4V2.4h1.8v16z" fill="#8a6f3c"/>' +
    '<path d="M11,2.4h1.8v3H11z" fill="#5f4728"/>' +
    '<g stroke="#5f4728" stroke-width="1" fill="none"><path d="M11.9,5.4L7.6,7.4M11.9,7.4l4.6,1.4M11.9,10.4L8.4,12"/></g>' +
    '<g><ellipse cx="7" cy="9.6" rx="3.4" ry="4.4" fill="#3f7a48"/><path d="M7,5.4q-1.4,-1.4 -0.4,-2.2q1,0.8 0.4,2.2z" fill="#4f8f3f"/><g stroke="#2f6b3f" stroke-width="0.8" fill="none"><path d="M5.4,6.6L8.6,12.6M4.4,9.4h5.2"/></g></g>' +
    '<g><circle cx="17.4" cy="11" r="3.6" fill="#c9302c"/><path d="M17.4,7.4q1,-1.6 2.4,-1.2q-0.4,1.8 -2.4,1.2z" fill="#4f8f3f"/><g fill="#e8553f"><circle cx="16.2" cy="9.8" r="1.2"/></g></g>' +
    '<g><ellipse cx="8.4" cy="14.6" rx="3" ry="2.2" fill="#f5b31c"/><path d="M8.4,12.4v-1.4" stroke="#5f4728" stroke-width="0.9" fill="none"/></g>' +
    '<path d="M4.4,21.4q7.6,1.6 15.2,0" stroke="#f0f6f8" stroke-width="1" opacity=".45" fill="none"/>',

  /** チャウドック。高床家屋の下の生け簀。 */
  cagefish:
    '<rect x="0" y="0" width="24" height="12.4" fill="#cfe4f0"/>' +
    '<path d="M0.6,5h18.8L10,0.4z" fill="#6b5f38"/>' +
    '<rect x="2.6" y="5" width="14.8" height="5" fill="#a8763c"/>' +
    '<rect x="7.6" y="6" width="3.4" height="4" fill="#4f3a20"/>' +
    '<g fill="#3f5f70"><rect x="4" y="6.2" width="2.4" height="2.2"/><rect x="13" y="6.2" width="2.4" height="2.2"/></g>' +
    '<g fill="#5f4728"><rect x="3" y="10" width="1.8" height="3.4"/><rect x="9.4" y="10" width="1.8" height="3.4"/><rect x="16" y="10" width="1.8" height="3.4"/></g>' +
    '<rect x="0" y="12.4" width="24" height="11.6" fill="#3f7f8a"/>' +
    '<rect x="0" y="12.4" width="24" height="1.6" fill="#5f9aa8"/>' +
    '<rect x="2" y="13.4" width="20" height="9.6" fill="#2f6b6a"/>' +
    '<rect x="2" y="13.4" width="20" height="2" fill="#8a6f3c"/>' +
    '<g stroke="#12302f" stroke-width="1.2" fill="none"><path d="M2,13.4v9.6M22,13.4v9.6M2,23h20M6.4,15.4v7.6M11.4,15.4v7.6M16.4,15.4v7.6M2,18.4h20"/></g>' +
    '<g fill="#f2ede0"><path d="M3.6,20.4q2.4,-2 4.8,0q-2.4,2 -4.8,0z"/><path d="M13,17.2q2.2,-1.8 4.4,0q-2.2,1.8 -4.4,0z"/></g>' +
    '<g fill="#c9bda4"><path d="M8.4,20.4l1.8,-1.2v2.4z"/><path d="M17.4,17.2l1.6,-1.1v2.2z"/></g>' +
    '<g fill="#2e2b26"><circle cx="4.8" cy="20.2" r="0.6"/><circle cx="14.2" cy="17" r="0.6"/></g>',

  /** カマウ。マングローブの根と蜂の巣。 */
  mangrovehoney:
    '<rect x="0" y="17.4" width="24" height="6.6" fill="#6f8a62"/>' +
    '<rect x="0" y="17.4" width="24" height="1.6" fill="#84a074"/>' +
    '<g stroke="#5f7a52" stroke-width="1" opacity=".8" fill="none"><path d="M0,21h9M14,22.4h10"/></g>' +
    '<path d="M8.4,19.4V6.4h2.6v13z" fill="#5f4728"/>' +
    '<g stroke="#5f4728" stroke-width="1.8" fill="none" stroke-linecap="round">' +
    '<path d="M9,11.4L4,19.4M10.4,11.4L15.4,19.4M9,14L5.6,19.4M10.4,14.6l3.6,4.8M9.6,9.4L2.6,19.4M10,9.8l7.4,9.6"/></g>' +
    '<g stroke="#6f5330" stroke-width="1.2" fill="none"><path d="M20.4,19.4V13"/></g>' +
    '<g fill="#2f6b3f"><ellipse cx="8" cy="5" rx="6" ry="3"/><ellipse cx="15" cy="6.4" rx="5" ry="2.6"/><ellipse cx="3.4" cy="7.4" rx="3.6" ry="2"/></g>' +
    '<g fill="#4f8f52"><ellipse cx="7" cy="3.6" rx="3.6" ry="1.8"/><ellipse cx="14.4" cy="5.2" rx="3" ry="1.5"/></g>' +
    '<path d="M17,7.4h6.4l-1,7.4q-2.2,1.4 -4.4,0z" fill="#c9a04c"/>' +
    '<path d="M17,7.4h6.4l-0.4,2.6h-5.6z" fill="#8f6a2c"/>' +
    '<g fill="#a8813c"><circle cx="18.6" cy="11" r="1"/><circle cx="21.2" cy="11" r="1"/><circle cx="19.9" cy="13" r="1"/></g>' +
    '<g fill="#f5b31c"><ellipse cx="14.4" cy="10.4" rx="1.4" ry="1"/><ellipse cx="16" cy="13.4" rx="1.2" ry="0.9"/></g>' +
    '<g stroke="#2e2b26" stroke-width="0.7" fill="none"><path d="M13.4,10.4h2M15.2,13.4h1.6"/></g>',

  /** ラックザー。埋め立て地とクレーン。 */
  reclaimedshore:
    '<rect x="0" y="0" width="24" height="13" fill="#cfe4f0"/>' +
    '<rect x="0" y="13" width="9" height="11" fill="#2f6f8f"/>' +
    '<g stroke="#8fc4d8" stroke-width="1" opacity=".8" fill="none"><path d="M0,16h6M0,20h7"/></g>' +
    '<rect x="8" y="13" width="16" height="11" fill="#d8c088"/>' +
    '<rect x="8" y="13" width="16" height="2.4" fill="#8a8578"/>' +
    '<rect x="6.8" y="13" width="2.2" height="11" fill="#5f6b70"/>' +
    '<g stroke="#b09860" stroke-width="1" opacity=".9" fill="none"><path d="M9.4,18.4h14.6M9.4,21.4h14.6"/></g>' +
    '<rect x="2.4" y="2.4" width="19.2" height="2.8" fill="#f5b31c"/>' +
    '<rect x="2.4" y="2.4" width="19.2" height="1" fill="#2b323a"/>' +
    '<rect x="12.2" y="5.2" width="3.2" height="9.6" fill="#f5b31c"/>' +
    '<rect x="12.2" y="5.2" width="1" height="9.6" fill="#c98a2c"/>' +
    '<rect x="11.8" y="0.4" width="4" height="2.2" fill="#f5b31c"/>' +
    '<path d="M5.6,3.4v6.2" stroke="#2b323a" stroke-width="1.2" fill="none"/>' +
    '<rect x="3.4" y="9.4" width="4.6" height="3.6" fill="#c9302c"/>' +
    '<rect x="16" y="8" width="3.6" height="3.6" fill="#3f4a4f"/>',

  /** フーコック。原産地保護シールの付いた瓶。 */
  pdobottle:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#c9a86e"/>' +
    '<ellipse cx="12" cy="21.4" rx="7.4" ry="1.6" fill="#000" opacity=".16"/>' +
    '<path d="M9.6,7.4V3.6h4.8v3.8q0,1.4 2.2,3.4t2.2,4.2v6.4H5.2v-6.4q0,-2.2 2.2,-4.2t2.2,-3.4z" fill="#7f5a2c"/>' +
    '<path d="M9.6,7.4V3.6h1.8v4q0,1.6 -2,3.6t-2,4.2v6h-2.2v-6.4q0,-2.2 2.2,-4.2t2.2,-3.4z" fill="#a8763c"/>' +
    '<path d="M5.2,17.4h13.6v4H5.2z" fill="#5f4728"/>' +
    '<rect x="9.2" y="1" width="5.6" height="2.8" rx="0.8" fill="#c2453c"/>' +
    '<rect x="9.2" y="1" width="5.6" height="1" rx="0.5" fill="#e8553f"/>' +
    '<path d="M6.4,12.4h11.2v5.4H6.4z" fill="#f2ede0"/>' +
    '<path d="M6.4,12.4h11.2v1.2H6.4z" fill="#c9302c"/>' +
    '<g stroke="#8a8578" stroke-width="0.8" fill="none"><path d="M7.6,15.4h6M7.6,16.8h4.6"/></g>' +
    '<circle cx="16.4" cy="16" r="3.6" fill="#f5b31c"/>' +
    '<circle cx="16.4" cy="16" r="2.6" fill="#3f5f9f"/>' +
    '<path d="M15.2,16l1,1.2l2.2,-2.6" stroke="#f2ede0" stroke-width="1.2" fill="none" stroke-linecap="round"/>' +
    '<g fill="#f5b31c"><path d="M16.4,12l0.9,1.2h-1.8zM16.4,20l0.9,-1.2h-1.8z"/></g>',
};
