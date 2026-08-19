/**
 * ノルウェーの都市イラスト。
 *
 * `NORWAY_MARKS` は24×24の座標系に描くシンボル、`NORWAY_BG` は400×210の
 * 座標系に描く背景シーン(いずれもSVG断片の文字列)。フランス・韓国と同じく
 * 最初から文字列として持つ。動きは含めない(アニメーションはReact側で重ねる)。
 *
 * 【この盤面の芯】鉄道は北へ行くほど痩せ細り、ボードーで途切れる。
 * `railterminus` の車止めの先に何も無い構図と、`mountainstation` の
 * 木の生えない高地、`openseaport` の外洋に開いた漁港が、その空白を受け持つ。
 *
 * 色は他の盤面と揃える。空 #8fc4e8〜#cfe4f0、顔・白 #f6efe2、
 * 強調 #f5b31c/#e8443f/#5b8fe8。ノルウェーらしさは
 * **ファールー赤の板壁 #a83c30、黄土の板壁 #c8a05a、白い窓枠 #f0ece0、
 * 黒い屋根 #3f434a、草屋根 #5f8f4f、トウヒの濃緑 #2a4a36、
 * 片麻岩の灰 #5f646e、雪 #e4ecf4、フィヨルドの水 #3a6f8f** で出す。
 *
 * 鍵は `cities.mjs` の `mark` / `bg` と一対一で対応する(記号41種・背景29種)。
 *
 * **背景SVGの中央25%(x=151〜249 / y=54〜152)は都市シンボルに隠れて
 * 見えない。** 見せたい細部は左右3分の1と手前(y>170)に置く。
 * `sky()` は必ず第3引数(次に来る塗りの開始y)を渡すこと。渡し忘れると
 * 空と地面のあいだに塗り残しの帯ができる。
 * 確認は `node scripts/check-city-backgrounds.mjs --src norway`。
 */

// ---------------------------------------------------------------------------
// 背景シーンの組み立て部品
// ---------------------------------------------------------------------------

const W = 400;

/** 小数の桁を抑える(SVGを読みやすく保つため)。 */
const r1 = (v) => Math.round(v * 10) / 10;

/** 横帯。 */
function band(y, h, fill) {
  return `<rect x="0" y="${r1(y)}" width="${W}" height="${r1(h)}" fill="${fill}"/>`;
}

/**
 * 空。**第3引数に「次に来る塗りの開始y」を渡すこと。**
 * 既定の118はすぐ下に地面が来る場合の値でしかない。
 */
function sky(top, bottom, to = 118) {
  const h2 = to - 78;
  return band(0, Math.min(84, to), top) + (h2 > 0 ? band(78, h2, bottom) : "");
}

/** 地面(下端まで塗る)。 */
function ground(y, fill) {
  return `<rect x="0" y="${r1(y)}" width="${W}" height="${r1(210 - y)}" fill="${fill}"/>`;
}

/** 接地の影。敷かないと物が浮く。 */
function shade(cx, cy, rx, ry, o = ".2") {
  return `<ellipse cx="${r1(cx)}" cy="${r1(cy)}" rx="${r1(rx)}" ry="${r1(ry)}" fill="#000" opacity="${o}"/>`;
}

function sun(cx, cy, r, fill = "#f5b31c") {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>`;
}

/** 冬の低い太陽・真夜中の太陽。にじみを1枚重ねる。 */
function lowSun(cx, cy, r, core = "#f5c05a", halo = "#f5d89a") {
  return (
    `<circle cx="${cx}" cy="${cy}" r="${r1(r * 1.9)}" fill="${halo}" opacity=".35"/>` +
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${core}"/>`
  );
}

function moon(cx, cy, r) {
  return (
    `<circle cx="${cx}" cy="${cy}" r="${r1(r * 2.2)}" fill="#cfe0ea" opacity=".18"/>` +
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#e8eef4"/>` +
    `<circle cx="${r1(cx - r * 0.3)}" cy="${r1(cy - r * 0.2)}" r="${r1(r * 0.22)}" fill="#cfd8e0" opacity=".7"/>`
  );
}

/** 星。座標の配列を渡す。 */
function stars(list, fill = "#e8eef4") {
  return `<g fill="${fill}">${list
    .map(([x, y, r = 1.4]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`)
    .join("")}</g>`;
}

function clouds(cx, cy, scale = 1, fill = "#f6efe2", o = ".8") {
  const e = (dx, rx, ry) =>
    `<ellipse cx="${r1(cx + dx * scale)}" cy="${cy}" rx="${r1(rx * scale)}" ry="${r1(ry * scale)}"/>`;
  return `<g opacity="${o}" fill="${fill}">${e(0, 18, 7)}${e(-10, 11, 5.5)}${e(11, 13, 5.5)}</g>`;
}

/** 遠景のなだらかな丘。 */
function hills(y, fill, count = 4, h = 34) {
  const parts = [];
  for (let i = 0; i < count; i++) {
    const cx = 40 + (i * W) / count;
    parts.push(`<path d="M${r1(cx - 70)},${y}c20,${-h} 50,${-h} 70,0z" fill="${fill}"/>`);
  }
  return `<g opacity=".95">${parts.join("")}</g>`;
}

/**
 * 遠景の峰。`list` は `[頂点x, 頂点y, 裾の半幅]`。
 * 雪をかぶせたい峰は第4要素に true を渡す。
 */
function peaks(baseY, fill, list, snow = "#e8eef4") {
  const parts = [];
  for (const [x, top, half, hasSnow] of list) {
    parts.push(
      `<path d="M${r1(x - half)},${baseY}L${x},${top}L${r1(x + half)},${baseY}z" fill="${fill}"/>`,
    );
    if (hasSnow) {
      const w = r1(half * 0.42);
      const by = r1(top + half * 0.42);
      parts.push(
        `<path d="M${x},${top}L${r1(x + w)},${by}q${r1(-w * 0.5)},4 ${r1(-w)},0q${r1(-w * 0.5)},-4 ${r1(-w)},0z" fill="${snow}"/>`,
      );
    }
  }
  return parts.join("");
}

/** 針葉樹(トウヒ)。段になった輪郭にする。 */
function fir(x, base, h, fill = "#2a4a36") {
  const w = r1(h * 0.46);
  return (
    `<rect x="${r1(x - 1.5)}" y="${r1(base - 5)}" width="3" height="5" fill="#4a3a28"/>` +
    `<path d="M${r1(x - w / 2)},${r1(base - 3)}L${x},${r1(base - h)}L${r1(x + w / 2)},${r1(base - 3)}z" fill="${fill}"/>` +
    `<path d="M${r1(x - w / 2.5)},${r1(base - h * 0.46)}L${x},${r1(base - h * 0.94)}L${r1(x + w / 2.5)},${r1(base - h * 0.46)}z" fill="${fill}"/>`
  );
}

/** トウヒの林(帯で置く)。 */
function firRow(y, from, to, count, h, fill = "#2a4a36") {
  const parts = [];
  for (let i = 0; i < count; i++) {
    const x = r1(from + ((to - from) * i) / (count - 1));
    parts.push(fir(x, y, r1(h * (0.78 + ((i * 7) % 5) * 0.11)), fill));
  }
  return parts.join("");
}

/** 白樺。幹の黒い節を入れないと樹に見えない。 */
function birch(x, base, h) {
  const top = r1(base - h);
  return (
    `<path d="M${r1(x - 1.6)},${base}L${r1(x - 1)},${top}h2L${r1(x + 1.6)},${base}z" fill="#e4e6e0"/>` +
    `<g fill="#3a3a38"><rect x="${r1(x - 1.4)}" y="${r1(base - h * 0.72)}" width="2.8" height="1.6"/>` +
    `<rect x="${r1(x - 1.2)}" y="${r1(base - h * 0.46)}" width="2.4" height="1.4"/></g>` +
    `<g stroke="#5a5a52" stroke-width="1.1" fill="none"><path d="M${x},${r1(top + h * 0.22)}l-7,-8M${x},${r1(top + h * 0.3)}l8,-9M${x},${r1(top + h * 0.44)}l-9,-6"/></g>`
  );
}

/** 水面のさざ波。 */
function ripples(y, color = "#bfe8f4", o = ".55") {
  return `<g stroke="${color}" stroke-width="2" opacity="${o}" fill="none"><path d="M22,${y}h64M186,${y + 11}h94M104,${y + 22}h58M296,${y + 5}h74"/></g>`;
}

/** 水面の映り込み(建物の真下に縦の筋)。 */
function reflect(y, h, xs, color = "#e8eef4", o = ".22") {
  return `<g fill="${color}" opacity="${o}">${xs
    .map((x) => `<rect x="${x}" y="${y}" width="4" height="${h}"/>`)
    .join("")}</g>`;
}

/** 線路。枕木とレール。 */
function rails(y, x0 = 0, x1 = W, step = 15, sleeper = "#4a3a28", rail = "#b8bcc4") {
  const parts = [`<g fill="${sleeper}">`];
  for (let x = x0; x < x1; x += step) {
    parts.push(`<rect x="${r1(x)}" y="${r1(y - 3)}" width="9" height="7"/>`);
  }
  parts.push(
    `</g><g stroke="${rail}" stroke-width="2" fill="none"><path d="M${x0},${r1(y - 2)}H${x1}M${x0},${r1(y + 3)}H${x1}"/></g>`,
  );
  return parts.join("");
}

/** 電信柱。 */
function pole(x, base, h, fill = "#5a4630") {
  const top = r1(base - h);
  return (
    `<rect x="${r1(x - 1.5)}" y="${top}" width="3" height="${h}" fill="${fill}"/>` +
    `<rect x="${r1(x - 7)}" y="${r1(top + 4)}" width="14" height="2.2" fill="${fill}"/>` +
    `<g fill="#dfe4ea"><circle cx="${r1(x - 5)}" cy="${r1(top + 3)}" r="1.4"/><circle cx="${r1(x + 5)}" cy="${r1(top + 3)}" r="1.4"/></g>`
  );
}

/** 送電鉄塔。 */
function pylon(x, base, h, fill = "#6b7078") {
  const top = r1(base - h);
  const hw = r1(h * 0.19);
  return (
    `<path d="M${r1(x - hw)},${base}L${r1(x - hw * 0.32)},${top}h${r1(hw * 0.64)}L${r1(x + hw)},${base}h${r1(-hw * 0.42)}L${r1(x + hw * 0.24)},${r1(top + 6)}h${r1(-hw * 0.48)}L${r1(x - hw * 0.58)},${base}z" fill="${fill}"/>` +
    `<g fill="${fill}"><rect x="${r1(x - hw * 1.5)}" y="${r1(top + h * 0.22)}" width="${r1(hw * 3)}" height="2.4"/>` +
    `<rect x="${r1(x - hw * 1.15)}" y="${r1(top + h * 0.42)}" width="${r1(hw * 2.3)}" height="2.2"/></g>` +
    `<g stroke="${fill}" stroke-width="1.1" opacity=".9" fill="none"><path d="M${r1(x - hw * 0.7)},${r1(top + 6)}L${r1(x + hw * 0.7)},${r1(top + h * 0.5)}M${r1(x + hw * 0.7)},${r1(top + 6)}L${r1(x - hw * 0.7)},${r1(top + h * 0.5)}"/></g>`
  );
}

/** 街灯。夜の絵では明かりの丸も置く。 */
function lamp(x, base, h, lit = false) {
  return (
    `<rect x="${r1(x - 1.4)}" y="${r1(base - h)}" width="2.8" height="${h}" fill="#3f434a"/>` +
    `<path d="M${r1(x - 5)},${r1(base - h)}h10l-2.4,6h-5.2z" fill="#4a4f58"/>` +
    (lit
      ? `<circle cx="${x}" cy="${r1(base - h + 4)}" r="9" fill="#f5b31c" opacity=".22"/><rect x="${r1(x - 3.4)}" y="${r1(base - h + 0.6)}" width="6.8" height="5" fill="#f8dc90"/>`
      : `<rect x="${r1(x - 3.4)}" y="${r1(base - h + 0.6)}" width="6.8" height="5" fill="#cfd8e0"/>`)
  );
}

/** 人。20px前後。腕は `arm()` で別に足す。 */
function person(x, base, h, shirt, skin = "#e8c8a8") {
  const hd = r1(h * 0.19);
  const top = r1(base - h + hd * 1.7);
  return (
    `<g><rect x="${r1(x - h * 0.09)}" y="${r1(base - h * 0.4)}" width="${r1(h * 0.08)}" height="${r1(h * 0.4)}" fill="#3f3428"/>` +
    `<rect x="${r1(x + h * 0.02)}" y="${r1(base - h * 0.4)}" width="${r1(h * 0.08)}" height="${r1(h * 0.4)}" fill="#3f3428"/>` +
    `<path d="M${r1(x - h * 0.16)},${top}h${r1(h * 0.32)}l${r1(h * 0.03)},${r1(h * 0.42)}h${r1(-h * 0.38)}z" fill="${shirt}"/>` +
    `<circle cx="${x}" cy="${r1(top - hd * 0.75)}" r="${hd}" fill="${skin}"/></g>`
  );
}

/** 帽子つきの人(冬)。 */
function personCap(x, base, h, coat, cap = "#e8443f") {
  const hd = r1(h * 0.19);
  const top = r1(base - h + hd * 1.7);
  return (
    person(x, base, h, coat) +
    `<path d="M${r1(x - hd - 0.8)},${r1(top - hd * 0.9)}a${r1(hd + 0.8)},${r1(hd + 0.8)} 0 0 1 ${r1((hd + 0.8) * 2)},0z" fill="${cap}"/>` +
    `<circle cx="${x}" cy="${r1(top - hd * 2)}" r="1.8" fill="${cap}"/>`
  );
}

function arm(x, y, dx, dy, color = "#e8c8a8", w = 3) {
  return `<path d="M${x},${y}l${dx},${dy}" stroke="${color}" stroke-width="${w}" stroke-linecap="round" fill="none"/>`;
}

/** かもめ。 */
function gull(x, y, s = 1) {
  return `<path d="M${x},${y}q${r1(3.4 * s)},${r1(-3.4 * s)} ${r1(6.8 * s)},0q${r1(3.4 * s)},${r1(-3.4 * s)} ${r1(6.8 * s)},0" stroke="#3f434a" stroke-width="${r1(1.6 * s)}" fill="none" stroke-linecap="round"/>`;
}

/**
 * 木の舟。**さざ波を描いたあとに呼ぶ。**
 * 波を遮ること・舷の内側の暗がり・真下の映り込みの3つで「水の上にある」ことを出す。
 */
function boat(x, y, w, hull = "#5a4630", trim = "#f0ece0") {
  const h = r1(w * 0.26);
  return (
    `<path d="M${x},${y}h${w}l${r1(-w * 0.12)},${h}h${r1(-w * 0.76)}z" fill="${hull}"/>` +
    `<path d="M${r1(x + 2)},${r1(y + 1.6)}h${r1(w - 4)}l${r1(-w * 0.1)},${r1(h * 0.4)}h${r1(-w * 0.8)}z" fill="#2f2620" opacity=".55"/>` +
    `<rect x="${x}" y="${y}" width="${w}" height="2.4" fill="${trim}"/>` +
    `<g fill="#e8eef4" opacity=".25"><rect x="${r1(x + w * 0.2)}" y="${r1(y + h)}" width="4" height="${r1(h * 1.5)}"/>` +
    `<rect x="${r1(x + w * 0.6)}" y="${r1(y + h)}" width="4" height="${r1(h * 1.1)}"/></g>`
  );
}

/** 漁船(船室と marst 付き)。 */
function fishingBoat(x, y, w, hull = "#2f4a5f") {
  const h = r1(w * 0.24);
  return (
    boat(x, y, w, hull) +
    `<rect x="${r1(x + w * 0.52)}" y="${r1(y - h * 1.5)}" width="${r1(w * 0.3)}" height="${r1(h * 1.5)}" fill="#f0ece0"/>` +
    `<rect x="${r1(x + w * 0.56)}" y="${r1(y - h * 1.1)}" width="${r1(w * 0.22)}" height="${r1(h * 0.6)}" fill="#3f5f7a"/>` +
    `<rect x="${r1(x + w * 0.28)}" y="${r1(y - h * 3.4)}" width="2.2" height="${r1(h * 3.4)}" fill="#5a4630"/>` +
    `<path d="M${r1(x + w * 0.29)},${r1(y - h * 3.2)}L${r1(x + w * 0.72)},${r1(y - h * 1.5)}" stroke="#5a4630" stroke-width="1" fill="none"/>`
  );
}

/** 魚(干し棚・群れ)。 */
function fish(x, y, s = 1, fill = "#b8c4cc") {
  return (
    `<path d="M${r1(x - 5 * s)},${y}q${r1(5 * s)},${r1(-3.4 * s)} ${r1(10 * s)},0q${r1(-5 * s)},${r1(3.4 * s)} ${r1(-10 * s)},0z" fill="${fill}"/>` +
    `<path d="M${r1(x - 5 * s)},${y}l${r1(-3 * s)},${r1(-2.4 * s)}v${r1(4.8 * s)}z" fill="${fill}"/>` +
    `<circle cx="${r1(x + 3 * s)}" cy="${r1(y - 0.4 * s)}" r="${r1(0.8 * s)}" fill="#2f3640"/>`
  );
}

/**
 * ノルウェーの板張りの家。白い窓枠と黒い屋根で「北欧の木造」に見せる。
 */
function woodHouse(x, base, w, h, wall = "#a83c30", roof = "#3f434a", trim = "#f0ece0") {
  const top = r1(base - h);
  const cx = r1(x + w / 2);
  const ridge = r1(top - w * 0.3);
  const parts = [
    `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="${wall}"/>`,
    `<path d="M${r1(x - 3.5)},${top}L${cx},${ridge}L${r1(x + w + 3.5)},${top}z" fill="${roof}"/>`,
    `<rect x="${r1(x - 3.5)}" y="${top}" width="${r1(w + 7)}" height="2.4" fill="${trim}"/>`,
  ];
  const cols = Math.max(1, Math.round(w / 26));
  for (let i = 0; i < cols; i++) {
    const wx = r1(x + (w * (i + 0.5)) / cols - 5);
    const wy = r1(top + h * 0.24);
    parts.push(
      `<rect x="${r1(wx - 1.4)}" y="${r1(wy - 1.4)}" width="12.8" height="${r1(h * 0.42 + 2.8)}" fill="${trim}"/>`,
      `<rect x="${wx}" y="${wy}" width="10" height="${r1(h * 0.42)}" fill="#5f7f96"/>`,
      `<path d="M${r1(wx + 5)},${wy}v${r1(h * 0.42)}M${wx},${r1(wy + h * 0.21)}h10" stroke="${trim}" stroke-width="1.2" fill="none"/>`,
    );
  }
  parts.push(
    `<rect x="${r1(cx - 4.5)}" y="${r1(base - h * 0.36)}" width="9" height="${r1(h * 0.36)}" fill="#5a4630"/>`,
    `<rect x="${r1(cx - 6)}" y="${r1(base - h * 0.36 - 1.6)}" width="12" height="1.6" fill="${trim}"/>`,
  );
  return parts.join("");
}

/** 丸太組みに草屋根(または雪屋根)の家。 */
function logHouse(x, base, w, h, wall = "#6b4a30", roofTop = "#5f8f4f") {
  const top = r1(base - h);
  const cx = r1(x + w / 2);
  const ridge = r1(top - w * 0.34);
  const parts = [
    `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="${wall}"/>`,
    `<g stroke="#4f3722" stroke-width="1" opacity=".8" fill="none">` +
      `<path d="M${x},${r1(top + h * 0.26)}h${w}M${x},${r1(top + h * 0.5)}h${w}M${x},${r1(top + h * 0.74)}h${w}"/></g>`,
    `<path d="M${r1(x - 5)},${top}L${cx},${ridge}L${r1(x + w + 5)},${top}z" fill="${roofTop}"/>`,
    `<path d="M${r1(x - 5)},${top}L${cx},${ridge}L${r1(x + w + 5)},${top}z" fill="#000" opacity=".12"/>`,
    `<rect x="${r1(x - 5)}" y="${top}" width="${r1(w + 10)}" height="2.6" fill="#4f3722"/>`,
    `<rect x="${r1(x + w * 0.16)}" y="${r1(top + h * 0.3)}" width="${r1(w * 0.22)}" height="${r1(h * 0.34)}" fill="#f0ece0"/>`,
    `<rect x="${r1(x + w * 0.19)}" y="${r1(top + h * 0.33)}" width="${r1(w * 0.16)}" height="${r1(h * 0.28)}" fill="#5f7f96"/>`,
    `<rect x="${r1(x + w * 0.62)}" y="${r1(base - h * 0.44)}" width="${r1(w * 0.2)}" height="${r1(h * 0.44)}" fill="#4f3722"/>`,
  ];
  return parts.join("");
}

/** ブリッゲン風の切妻倉庫(縦板張り・荷揚げ梁つき)。 */
function warehouseGable(x, base, w, h, wall, roof = "#4a4038", trim = "#f0ece0") {
  const top = r1(base - h);
  const cx = r1(x + w / 2);
  const ridge = r1(top - w * 0.52);
  const parts = [
    `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="${wall}"/>`,
    `<path d="M${x},${top}L${cx},${ridge}L${r1(x + w)},${top}z" fill="${wall}"/>`,
    `<path d="M${r1(x - 3)},${r1(top + 2)}L${cx},${r1(ridge - 2)}L${r1(x + w + 3)},${r1(top + 2)}L${r1(x + w + 3)},${r1(top + 5)}L${cx},${r1(ridge + 1)}L${r1(x - 3)},${r1(top + 5)}z" fill="${roof}"/>`,
    `<g stroke="#000" stroke-width="1" opacity=".14" fill="none">` +
      `<path d="M${r1(x + w * 0.25)},${top}v${h}M${r1(x + w * 0.5)},${top}v${h}M${r1(x + w * 0.75)},${top}v${h}"/></g>`,
    `<rect x="${cx}" y="${r1(ridge + 2)}" width="${r1(w * 0.42)}" height="2.4" fill="#4f3722"/>`,
    `<circle cx="${r1(cx + w * 0.4)}" cy="${r1(ridge + 6)}" r="2" fill="#3f434a"/>`,
  ];
  for (let i = 0; i < 3; i++) {
    const wy = r1(top + 6 + i * (h - 16) * 0.45);
    parts.push(
      `<rect x="${r1(x + w * 0.18)}" y="${wy}" width="${r1(w * 0.26)}" height="7.4" fill="${trim}"/>`,
      `<rect x="${r1(x + w * 0.2)}" y="${r1(wy + 1.2)}" width="${r1(w * 0.22)}" height="5" fill="#4a5560"/>`,
      `<rect x="${r1(x + w * 0.58)}" y="${wy}" width="${r1(w * 0.24)}" height="7.4" fill="${trim}"/>`,
      `<rect x="${r1(x + w * 0.6)}" y="${r1(wy + 1.2)}" width="${r1(w * 0.2)}" height="5" fill="#4a5560"/>`,
    );
  }
  return parts.join("");
}

/** ケルン(ヴァルデ)。高地の道しるべ。 */
function cairn(x, base, h) {
  const parts = [];
  const rows = 5;
  for (let i = 0; i < rows; i++) {
    const rw = r1((h * 0.5) * (1 - i / (rows + 0.6)));
    const y = r1(base - (h * (i + 1)) / rows);
    parts.push(
      `<ellipse cx="${r1(x + (i % 2 ? 1.4 : -1.2))}" cy="${y}" rx="${rw}" ry="${r1(h / rows / 1.5)}" fill="${i % 2 ? "#7a7f86" : "#686d76"}"/>`,
    );
  }
  return parts.join("");
}

/** トナカイ。**角が背より高く出ていないと四つ足の獣一般に落ちる。** */
function reindeer(x, base, s = 1, coat = "#8a7258") {
  const u = (v) => r1(v * s);
  return (
    `<ellipse cx="${x}" cy="${r1(base - 12 * s)}" rx="${u(13)}" ry="${u(6.4)}" fill="${coat}"/>` +
    `<g fill="${coat}"><rect x="${r1(x - 9 * s)}" y="${r1(base - 12 * s)}" width="${u(3)}" height="${u(12)}"/>` +
    `<rect x="${r1(x - 4 * s)}" y="${r1(base - 12 * s)}" width="${u(3)}" height="${u(12)}"/>` +
    `<rect x="${r1(x + 4 * s)}" y="${r1(base - 12 * s)}" width="${u(3)}" height="${u(12)}"/>` +
    `<rect x="${r1(x + 8.4 * s)}" y="${r1(base - 12 * s)}" width="${u(3)}" height="${u(12)}"/></g>` +
    `<path d="M${r1(x + 9 * s)},${r1(base - 15 * s)}l${u(6)},${u(-11)}l${u(4)},${u(1.6)}l${u(-5)},${u(11)}z" fill="${coat}"/>` +
    `<path d="M${r1(x + 14 * s)},${r1(base - 26 * s)}l${u(9)},${u(-1.6)}l${u(0.8)},${u(4.4)}l${u(-8)},${u(2)}z" fill="#9a8266"/>` +
    `<ellipse cx="${r1(x - 12 * s)}" cy="${r1(base - 13 * s)}" rx="${u(3)}" ry="${u(2.2)}" fill="#e4e0d6"/>` +
    `<circle cx="${r1(x + 17 * s)}" cy="${r1(base - 25 * s)}" r="${u(1)}" fill="#2f2820"/>` +
    `<g stroke="#5a4630" stroke-width="${u(1.8)}" fill="none" stroke-linecap="round">` +
    `<path d="M${r1(x + 15 * s)},${r1(base - 27 * s)}L${r1(x + 12 * s)},${r1(base - 40 * s)}l${u(-6)},${u(3)}"/>` +
    `<path d="M${r1(x + 12 * s)},${r1(base - 34 * s)}l${u(-6)},${u(-2)}"/>` +
    `<path d="M${r1(x + 17 * s)},${r1(base - 27 * s)}L${r1(x + 22 * s)},${r1(base - 39 * s)}l${u(5)},${u(2)}"/>` +
    `<path d="M${r1(x + 20 * s)},${r1(base - 34 * s)}l${u(5)},${u(-1)}"/></g>`
  );
}

/** 星形要塞の平面(稜堡)。頂点数から多角形を作る。 */
function starPoints(cx, cy, R, r, n = 5) {
  const p = [];
  for (let i = 0; i < n * 2; i++) {
    const rad = i % 2 ? r : R;
    const a = (Math.PI * i) / n - Math.PI / 2;
    p.push(`${r1(cx + rad * Math.cos(a))},${r1(cy + rad * Math.sin(a))}`);
  }
  return p.join(" ");
}

/** 雪面の風紋・吹きだまりの影。 */
function drifts(y, color = "#c8d8e4", o = ".7") {
  return (
    `<g fill="${color}" opacity="${o}">` +
    `<path d="M0,${y}q40,-9 84,-2q40,7 78,0v8H0z"/>` +
    `<path d="M232,${y + 14}q46,-10 92,-2q34,4 76,-2v9H232z"/>` +
    `<path d="M14,${y + 30}q56,-8 104,1q40,4 70,-2v8H14z"/>` +
    `</g>`
  );
}

/** 岩肌の割れ目。等間隔の格子にすると煉瓦塀に見えるので、長さと角度を散らす。 */
function cracks(list, color = "#3f444d", w = 1.6) {
  return `<g stroke="${color}" stroke-width="${w}" opacity=".8" fill="none" stroke-linecap="round"><path d="${list.join("")}"/></g>`;
}

export const NORWAY_BG = {
  /** オスロ。宮殿と議事堂のあいだを路面電車が抜ける。 */
  capital:
    sky("#8fc4e8", "#cfe4f0", 104) +
    clouds(64, 26) +
    clouds(300, 20, 0.8) +
    hills(104, "#3f6b52", 4, 28) +
    band(104, 16, "#4a7f9a") +
    ripples(110, "#bfe8f4", ".45") +
    // 対岸の低い街
    `<g fill="#5a6470" opacity=".85"><rect x="16" y="94" width="26" height="10"/><rect x="52" y="90" width="18" height="14"/><rect x="264" y="92" width="30" height="12"/><rect x="308" y="96" width="20" height="8"/></g>` +
    ground(120, "#8a8578") +
    // 王宮(左)
    `<rect x="4" y="72" width="98" height="48" fill="#e8d8b0"/>` +
    `<path d="M0,72h106l-10,-12H10z" fill="#b8a880"/>` +
    `<g fill="#c8b48a"><rect x="12" y="80" width="7" height="40"/><rect x="27" y="80" width="7" height="40"/><rect x="42" y="80" width="7" height="40"/><rect x="57" y="80" width="7" height="40"/><rect x="72" y="80" width="7" height="40"/><rect x="87" y="80" width="7" height="40"/></g>` +
    `<g fill="#5f7f96"><rect x="20" y="86" width="6" height="14"/><rect x="35" y="86" width="6" height="14"/><rect x="50" y="86" width="6" height="14"/><rect x="65" y="86" width="6" height="14"/><rect x="80" y="86" width="6" height="14"/></g>` +
    `<rect x="50" y="34" width="2.6" height="26" fill="#6b6250"/><path d="M52.6,35h22v13h-22z" fill="#e8443f"/><path d="M52.6,39.6h22v3.8h-22z" fill="#f0ece0"/><path d="M60,35h3.6v13H60z" fill="#f0ece0"/><path d="M61,35h1.6v13h-1.6z" fill="#2f4a8f"/>` +
    // 議事堂(右)
    `<rect x="298" y="82" width="100" height="38" fill="#d8a870"/>` +
    `<rect x="292" y="78" width="112" height="6" fill="#c09058"/>` +
    `<path d="M318,82V62a16,16 0 0 1 32,0v20z" fill="#c8a05a"/>` +
    `<path d="M318,64a16,16 0 0 1 32,0z" fill="#8a7a5f"/>` +
    `<g fill="#5f7f96"><rect x="304" y="90" width="9" height="16"/><rect x="322" y="90" width="9" height="16"/><rect x="340" y="90" width="9" height="16"/><rect x="358" y="90" width="9" height="16"/><rect x="378" y="90" width="9" height="16"/><rect x="328" y="68" width="8" height="10"/></g>` +
    // 中央の街区
    `<g fill="#c8bca8"><rect x="120" y="90" width="52" height="30"/><rect x="180" y="84" width="46" height="36"/><rect x="232" y="92" width="56" height="28"/></g>` +
    `<g fill="#4a4f58"><rect x="118" y="86" width="56" height="5"/><rect x="178" y="80" width="50" height="5"/><rect x="230" y="88" width="60" height="5"/></g>` +
    // 大通りと軌道
    band(120, 14, "#b6ad9b") +
    band(134, 76, "#5f5a52") +
    `<g stroke="#8a8578" stroke-width="2.4" fill="none"><path d="M0,166h400M0,178h400"/></g>` +
    `<g stroke="#f0ece0" stroke-width="3" stroke-dasharray="16 18" opacity=".5" fill="none"><path d="M0,200h400"/></g>` +
    // 青い路面電車(手前・見える帯)
    shade(196, 202, 62, 6, ".22") +
    `<rect x="136" y="158" width="122" height="40" rx="5" fill="#2f6fa8"/>` +
    `<rect x="136" y="184" width="122" height="8" fill="#1f4f7f"/>` +
    `<g fill="#bfe0f2"><rect x="144" y="164" width="24" height="16"/><rect x="174" y="164" width="24" height="16"/><rect x="204" y="164" width="24" height="16"/><rect x="234" y="164" width="18" height="16"/></g>` +
    `<g fill="#2f2a26"><circle cx="158" cy="198" r="6"/><circle cx="238" cy="198" r="6"/></g>` +
    `<rect x="180" y="150" width="34" height="3" fill="#4a4f58"/><path d="M197,153v5" stroke="#4a4f58" stroke-width="2"/>` +
    lamp(108, 134, 34) +
    lamp(318, 134, 34) +
    person(46, 134, 20, "#e8443f") +
    arm(46, 122, 7, 6) +
    person(66, 134, 18, "#3f5f8f") +
    person(346, 134, 19, "#f5b31c") +
    person(362, 134, 17, "#5f7f5f"),

  /** ハーマル。ガラスの覆いに包まれた大聖堂の廃墟と、鉄道博物館の転車台。 */
  ruins:
    sky("#a8cfe0", "#dce6ea", 108) +
    clouds(300, 30, 0.9) +
    clouds(70, 22, 0.7) +
    hills(108, "#5f7f62", 3, 26) +
    band(108, 18, "#5f8fa8") +
    ripples(114, "#bfe8f4", ".4") +
    ground(126, "#8fa864") +
    // ガラスの覆いの中の廃墟(左)
    `<g fill="#9a958a"><rect x="30" y="72" width="15" height="72"/><rect x="72" y="66" width="15" height="78"/><rect x="114" y="76" width="15" height="68"/><rect x="152" y="84" width="13" height="60"/></g>` +
    `<g fill="#8a857a"><path d="M30,72l7.5,-9 7.5,9z"/><path d="M72,66l7.5,-11 7.5,11z"/><path d="M114,76l7.5,-7 7.5,7z"/></g>` +
    `<g fill="#b0aa9c"><path d="M45,96c0,-13 12,-19 27,-19v9c-10,0 -18,4 -18,10z"/><path d="M87,94c0,-11 12,-16 27,-16v9c-10,0 -18,3 -18,7z"/><path d="M129,100c0,-9 10,-13 23,-13v8c-9,0 -15,2 -15,5z"/></g>` +
    `<rect x="24" y="140" width="148" height="6" fill="#7a7568"/>` +
    // ガラスの覆い
    `<path d="M18,146V60L100,26L182,60v86z" fill="#cfe4f0" opacity=".38"/>` +
    `<g stroke="#7a8590" stroke-width="2.2" fill="none"><path d="M18,146V60L100,26L182,60v86M18,60h164M100,26v120M56,43v103M144,43v103M18,92h164M18,120h164"/></g>` +
    `<path d="M18,60L100,26L182,60" stroke="#5f6a76" stroke-width="3.4" fill="none"/>` +
    // 転車台と機関車(右)
    `<ellipse cx="316" cy="146" rx="76" ry="18" fill="#7a7f76"/>` +
    `<ellipse cx="316" cy="146" rx="66" ry="14" fill="#8a8f84"/>` +
    `<g stroke="#5a5f58" stroke-width="2" fill="none"><path d="M250,146h132M270,134l92,24M270,158l92,-24"/></g>` +
    `<rect x="278" y="132" width="76" height="9" fill="#4a4f58"/>` +
    `<rect x="288" y="112" width="52" height="22" rx="3" fill="#2f4a3a"/>` +
    `<rect x="330" y="104" width="22" height="30" fill="#2f4a3a"/>` +
    `<rect x="296" y="98" width="12" height="16" fill="#3a3f47"/>` +
    `<g fill="#f5b31c"><rect x="334" y="112" width="14" height="10"/></g>` +
    `<g fill="#2f2a26"><circle cx="296" cy="140" r="7"/><circle cx="316" cy="140" r="7"/><circle cx="340" cy="140" r="5"/></g>` +
    `<g fill="#cfd8e0" opacity=".7"><ellipse cx="302" cy="90" rx="12" ry="6"/><ellipse cx="292" cy="78" rx="9" ry="5"/></g>` +
    // 手前の芝と見学者
    band(150, 24, "#7f9a55") +
    band(174, 36, "#6b8a4a") +
    `<g stroke="#5f7a42" stroke-width="2" opacity=".7" fill="none"><path d="M0,162h400M0,186h400"/></g>` +
    `<path d="M120,210l24,-58h30l-14,58z" fill="#a89f8c"/>` +
    person(206, 190, 24, "#e8443f") +
    arm(206, 176, 10, -8) +
    person(226, 186, 21, "#3f5f8f") +
    person(60, 196, 23, "#f5b31c") +
    `<g fill="#3f8f4f"><circle cx="352" cy="176" r="14"/><rect x="350" y="176" width="4" height="14" fill="#6b5330"/></g>` +
    `<g fill="#3f8f4f"><circle cx="20" cy="168" r="11"/><rect x="18.4" y="168" width="3.4" height="12" fill="#6b5330"/></g>`,

  /** イェーヴィク。岩盤をくり抜いた洞窟のアイスホッケー会場。 */
  cavern:
    `<rect x="0" y="0" width="400" height="210" fill="#242a33"/>` +
    // 岩の天井(アーチ)
    `<path d="M0,0h400v56c-52,-26 -128,-40 -200,-40S52,30 0,56z" fill="#4a505c"/>` +
    `<path d="M0,56c52,-26 128,-40 200,-40s148,14 200,40v10c-52,-24 -128,-36 -200,-36S52,42 0,66z" fill="#5a6270"/>` +
    cracks([
      "M40,12l16,34-6,20",
      "M120,4l-8,28 14,22",
      "M262,8l12,30-8,16",
      "M340,16l-14,26 10,18",
    ]) +
    // 岩壁(左右)
    `<path d="M0,40v130l64,-14V56z" fill="#3f4650"/>` +
    `<path d="M400,44v126l-62,-12V58z" fill="#39404a"/>` +
    cracks(["M18,64l14,40-6,26", "M368,70l-12,36 8,24"], "#2a3038") +
    // 吊り下げた照明
    `<g stroke="#3a4048" stroke-width="2" fill="none"><path d="M96,16v18M200,10v16M304,16v18"/></g>` +
    `<g><circle cx="96" cy="40" r="16" fill="#f5b31c" opacity=".16"/><ellipse cx="96" cy="38" rx="9" ry="4.4" fill="#f8e0a0"/>` +
    `<circle cx="200" cy="32" r="16" fill="#f5b31c" opacity=".16"/><ellipse cx="200" cy="30" rx="9" ry="4.4" fill="#f8e0a0"/>` +
    `<circle cx="304" cy="40" r="16" fill="#f5b31c" opacity=".16"/><ellipse cx="304" cy="38" rx="9" ry="4.4" fill="#f8e0a0"/></g>` +
    // 段になった観客席
    `<g fill="#8a3a34"><path d="M0,168l70,-16v-12l-70,14z"/><path d="M0,142l70,-14v-11l-70,12z"/><path d="M0,119l70,-12V96l-70,10z"/></g>` +
    `<g fill="#a8443c"><path d="M0,156l70,-15v-3l-70,13z"/><path d="M0,132l70,-13v-3l-70,11z"/></g>` +
    `<g fill="#8a3a34"><path d="M400,170l-68,-16v-12l68,14z"/><path d="M400,144l-68,-14v-11l68,12z"/><path d="M400,121l-68,-12V98l68,10z"/></g>` +
    `<g fill="#a8443c"><path d="M400,158l-68,-15v-3l68,13z"/><path d="M400,134l-68,-13v-3l68,11z"/></g>` +
    // リンク
    `<path d="M52,154h296l34,56H18z" fill="#dfeef8"/>` +
    `<path d="M52,154h296l6,10H46z" fill="#c4dcec"/>` +
    `<g stroke="#c0453c" stroke-width="2.4" opacity=".8" fill="none"><path d="M40,182h320"/></g>` +
    `<g stroke="#3f6fb8" stroke-width="2.4" opacity=".8" fill="none"><path d="M60,164h280M26,202h348"/></g>` +
    `<circle cx="200" cy="182" r="13" fill="none" stroke="#c0453c" stroke-width="2.2"/>` +
    // ドーム板(手前の囲い)
    `<rect x="0" y="150" width="52" height="8" fill="#f0ece0"/><rect x="348" y="150" width="52" height="8" fill="#f0ece0"/>` +
    `<rect x="0" y="158" width="52" height="4" fill="#c0453c"/><rect x="348" y="158" width="52" height="4" fill="#c0453c"/>` +
    // 滑る2人
    shade(84, 190, 12, 3, ".16") +
    person(84, 188, 22, "#e8443f") +
    arm(84, 176, 12, 4, "#e8c8a8", 3) +
    `<path d="M96,180l14,-4" stroke="#5a4630" stroke-width="2.4"/>` +
    shade(322, 194, 12, 3, ".16") +
    person(322, 192, 21, "#2f6fa8") +
    arm(322, 181, -12, 3) +
    `<path d="M310,184l-14,-3" stroke="#5a4630" stroke-width="2.4"/>` +
    `<circle cx="252" cy="196" r="3.4" fill="#241a10"/>`,

  /** ベルゲン。切妻の木造倉庫が並ぶ波止場。 */
  wharf:
    sky("#7fa8c4", "#c8d8e0", 96) +
    clouds(88, 26, 0.9, "#f0f2f0", ".7") +
    peaks(96, "#4a5f5a", [
      [40, 24, 62, false],
      [140, 34, 58, false],
      [268, 20, 66, false],
      [372, 40, 54, false],
    ]) +
    `<g fill="#3f5450" opacity=".9"><path d="M0,96c40,-18 84,-24 130,-22l-6,22z"/><path d="M400,96c-40,-20 -90,-24 -134,-20l8,20z"/></g>` +
    `<g fill="#e8dcc8" opacity=".65"><rect x="34" y="70" width="6" height="5"/><rect x="58" y="62" width="6" height="5"/><rect x="292" y="66" width="6" height="5"/><rect x="330" y="74" width="6" height="5"/></g>` +
    firRow(98, 12, 96, 6, 22, "#2a4a36") +
    firRow(98, 300, 392, 6, 20, "#2a4a36") +
    ground(96, "#6b7068") +
    // ブリッゲンの倉庫(左右に高い切妻、中央は低く)
    warehouseGable(4, 138, 40, 56, "#a8382e") +
    warehouseGable(48, 138, 36, 62, "#d8a03c") +
    warehouseGable(88, 138, 38, 52, "#e8e0d0") +
    warehouseGable(130, 138, 34, 58, "#7a5a3a") +
    `<g fill="#8a7a62"><rect x="168" y="106" width="62" height="32"/><path d="M164,106h70l-8,-9h-54z" fill="#4a4038"/></g>` +
    warehouseGable(238, 138, 36, 54, "#c8b48a") +
    warehouseGable(278, 138, 38, 62, "#a8382e") +
    warehouseGable(320, 138, 34, 50, "#d8a03c") +
    warehouseGable(358, 138, 38, 58, "#5f6b70") +
    // 石の埠頭
    band(138, 14, "#8a8578") +
    `<g stroke="#6b6860" stroke-width="1.6" opacity=".7" fill="none"><path d="M0,145h400M28,138v14M84,138v14M148,138v14M216,138v14M284,138v14M348,138v14"/></g>` +
    // 水
    band(152, 58, "#3a6f8f") +
    ripples(164) +
    ripples(188, "#9fd4e8", ".4") +
    reflect(152, 26, [16, 62, 100, 144, 250, 292, 330, 372]) +
    // 手前の小舟と人
    boat(158, 172, 84, "#5a4630") +
    person(184, 174, 21, "#e8443f") +
    arm(184, 162, 14, 8) +
    `<path d="M198,170l16,10" stroke="#6b5330" stroke-width="3" stroke-linecap="round"/>` +
    boat(300, 186, 62, "#3f5f7a") +
    // 埠頭の樽と魚箱
    `<g fill="#8a5f3a"><rect x="10" y="124" width="14" height="14" rx="2"/><rect x="28" y="126" width="12" height="12" rx="2"/></g>` +
    `<g stroke="#5a4028" stroke-width="1.4" fill="none"><path d="M10,129h14M10,134h14"/></g>` +
    `<g fill="#c8b48a"><rect x="352" y="126" width="20" height="12"/><rect x="374" y="128" width="18" height="10"/></g>` +
    fish(362, 124, 0.8) +
    person(46, 138, 20, "#f5b31c") +
    person(378, 138, 19, "#3f5f8f") +
    gull(240, 60, 1.2) +
    gull(300, 44, 0.9) +
    gull(90, 50, 1),

  /** スタヴァンゲル。沖の掘削基地と、記憶の中の移民船。 */
  oilrig:
    sky("#4a6b8a", "#a8c0cc", 104) +
    lowSun(66, 92, 15, "#f5b06a", "#f5c890") +
    clouds(280, 32, 1.1, "#8fa4b4", ".55") +
    band(104, 106, "#2f5a72") +
    `<g fill="#f5b06a" opacity=".3"><path d="M52,104h28l-22,106H30z"/></g>` +
    ripples(118, "#7fb0c8", ".45") +
    ripples(152, "#7fb0c8", ".4") +
    ripples(184, "#6fa0b8", ".35") +
    // 記憶の中の帆船(左・かすませる)
    `<g opacity=".55"><path d="M18,124h84l-10,15H28z" fill="#3f3428"/>` +
    `<rect x="56" y="52" width="3" height="72" fill="#5a4630"/>` +
    `<path d="M55,58v58H26c0-24 10-44 29-58z" fill="#e8e0d0"/>` +
    `<path d="M60,62v54h30c0-22 -10-40 -30-54z" fill="#dcd4c4"/>` +
    `<path d="M55,60L30,116h-6c0-22 12-44 31-56z" fill="#f0ece0"/>` +
    `<rect x="55" y="46" width="14" height="8" fill="#e8443f"/></g>` +
    // 掘削基地(右)
    `<g fill="#6b7078"><rect x="256" y="112" width="8" height="72"/><rect x="292" y="112" width="8" height="76"/><rect x="336" y="112" width="8" height="72"/><rect x="376" y="112" width="8" height="68"/></g>` +
    `<g stroke="#6b7078" stroke-width="2.4" fill="none"><path d="M260,138l36,14M296,152l40,-14M340,138l38,12M260,164l36,12M300,176l36,-12"/></g>` +
    `<rect x="244" y="96" width="152" height="18" fill="#8a8f96"/>` +
    `<rect x="244" y="92" width="152" height="5" fill="#c8a03c"/>` +
    `<g fill="#5f666e"><rect x="252" y="76" width="30" height="20"/><rect x="290" y="70" width="26" height="26"/></g>` +
    `<g fill="#f5b31c"><rect x="256" y="82" width="7" height="6"/><rect x="268" y="82" width="7" height="6"/><rect x="296" y="78" width="7" height="6"/><rect x="306" y="78" width="7" height="6"/></g>` +
    // やぐら
    `<path d="M330,96l10,-64h12l10,64h-9l-7,-52-7,52z" fill="#7a8088"/>` +
    `<g stroke="#7a8088" stroke-width="1.8" fill="none"><path d="M336,84h20M338,70h16M340,56h12M342,44h8"/></g>` +
    `<path d="M340,32h12v-6h-12z" fill="#c0453c"/>` +
    // フレア
    `<path d="M396,88l-24,-14" stroke="#6b7078" stroke-width="4" fill="none"/>` +
    `<path d="M372,74c-9,-4 -16,-12 -14,-22c8,6 16,10 18,18z" fill="#f5b31c"/>` +
    `<path d="M368,68c-5,-3 -8,-8 -7,-13c5,4 9,7 10,11z" fill="#e8443f"/>` +
    `<ellipse cx="360" cy="98" rx="16" ry="5" fill="#4a5058"/>` +
    // ヘリデッキ
    `<ellipse cx="268" cy="72" rx="22" ry="6" fill="#5f666e"/><ellipse cx="268" cy="70" rx="16" ry="4" fill="#8a8f96"/>` +
    // 手前の補給船とブイ
    shade(206, 200, 62, 6, ".18") +
    `<path d="M138,172h124l-14,22H150z" fill="#c05a2c"/>` +
    `<rect x="138" y="166" width="124" height="7" fill="#3f4a52"/>` +
    `<rect x="216" y="142" width="42" height="26" fill="#f0ece0"/>` +
    `<g fill="#3f5f7a"><rect x="222" y="148" width="12" height="9"/><rect x="240" y="148" width="12" height="9"/></g>` +
    `<rect x="234" y="126" width="3" height="16" fill="#4a4f58"/><circle cx="235.5" cy="124" r="2.6" fill="#e8443f"/>` +
    `<g fill="#e8eef4" opacity=".5"><path d="M132,186q30,8 62,4t68,-2v6H132z"/></g>` +
    `<g><rect x="346" y="164" width="4" height="14" fill="#4a4f58"/><path d="M340,178h16l-4,10h-8z" fill="#f5b31c"/><circle cx="348" cy="162" r="3.4" fill="#e8443f"/></g>` +
    gull(56, 62, 1.1) +
    gull(112, 46, 0.9),

  /** フロム。狭いフィヨルドに客船がひしめく。 */
  narrowfjord:
    band(0, 78, "#8fb8d8") +
    band(60, 60, "#cfe0ea") +
    clouds(200, 26, 0.9, "#f0f2f0", ".6") +
    // 奥のフィヨルドの霞
    `<path d="M120,120L166,44l38,-8l40,10l52,74z" fill="#8fa8bc" opacity=".8"/>` +
    `<path d="M150,120l34,-56l24,-6l30,8l38,54z" fill="#7f97ac" opacity=".85"/>` +
    // 左の岩壁
    `<path d="M0,0h96l24,34-8,40 16,46H0z" fill="#4a505c"/>` +
    `<path d="M0,0h58l20,30-6,38 12,52H0z" fill="#3f454f"/>` +
    cracks(["M22,18l16,44-8,32", "M62,10l-6,36 14,30", "M96,40l10,32-6,26"], "#2f353d") +
    `<g fill="#e4ecf4" opacity=".8"><path d="M14,8l10,18-14,6z"/><path d="M78,4l8,14-12,4z"/></g>` +
    // 左壁の滝
    `<path d="M84,42c4,26 2,52 -6,84h-9c8,-32 9,-58 6,-84z" fill="#eef4f8" opacity=".9"/>` +
    `<path d="M80,44c3,24 1,50 -5,80h-4c6,-30 8,-56 6,-80z" fill="#ffffff" opacity=".8"/>` +
    `<ellipse cx="74" cy="128" rx="16" ry="5" fill="#eef4f8" opacity=".8"/>` +
    // 右の岩壁
    `<path d="M400,0h-88l-22,40 10,42-12,42h112z" fill="#5a616e"/>` +
    `<path d="M400,0h-52l-16,36 8,42-10,46h70z" fill="#4a515e"/>` +
    cracks(["M356,20l-12,40 8,34", "M322,32l10,34-6,28", "M386,14l-8,30 10,26"], "#373d47") +
    `<g fill="#e4ecf4" opacity=".75"><path d="M340,10l10,16-14,4z"/><path d="M382,6l8,12-12,4z"/></g>` +
    // フロム鉄道の棚(左壁の中腹)
    `<path d="M0,116h84l-4,8H0z" fill="#6b7078"/>` +
    `<g fill="#2a4a36"><rect x="0" y="108" width="10" height="8"/><rect x="14" y="110" width="9" height="6"/><rect x="30" y="108" width="10" height="8"/></g>` +
    `<rect x="44" y="102" width="34" height="14" rx="2" fill="#2f6f4a"/>` +
    `<g fill="#bfe0f2"><rect x="48" y="105" width="7" height="6"/><rect x="58" y="105" width="7" height="6"/><rect x="68" y="105" width="6" height="6"/></g>` +
    // 水
    band(120, 90, "#3a6f8f") +
    ripples(134) +
    ripples(166, "#9fd4e8", ".4") +
    // 岸の集落(左)
    `<path d="M0,124h96l6,10H0z" fill="#6b7a5f"/>` +
    woodHouse(6, 132, 26, 16, "#a83c30") +
    woodHouse(40, 132, 24, 14, "#f0ece0") +
    woodHouse(70, 132, 22, 13, "#c8a05a") +
    // 大きなクルーズ船(中央右)
    shade(280, 152, 78, 7, ".2") +
    `<path d="M208,120h150l-14,26H220z" fill="#2f3a46"/>` +
    `<rect x="208" y="112" width="150" height="9" fill="#f0ece0"/>` +
    `<rect x="216" y="96" width="132" height="17" fill="#f0ece0"/>` +
    `<rect x="224" y="80" width="112" height="17" fill="#e8e4d8"/>` +
    `<rect x="236" y="66" width="82" height="15" fill="#f0ece0"/>` +
    `<g fill="#3f5f7a"><rect x="222" y="100" width="10" height="8"/><rect x="238" y="100" width="10" height="8"/><rect x="254" y="100" width="10" height="8"/><rect x="270" y="100" width="10" height="8"/><rect x="286" y="100" width="10" height="8"/><rect x="302" y="100" width="10" height="8"/><rect x="318" y="100" width="10" height="8"/><rect x="334" y="100" width="10" height="8"/><rect x="230" y="84" width="10" height="8"/><rect x="246" y="84" width="10" height="8"/><rect x="262" y="84" width="10" height="8"/><rect x="278" y="84" width="10" height="8"/><rect x="294" y="84" width="10" height="8"/><rect x="310" y="84" width="10" height="8"/></g>` +
    `<rect x="286" y="48" width="26" height="20" rx="4" fill="#c0453c"/>` +
    `<rect x="248" y="56" width="8" height="12" fill="#3f434a"/>` +
    reflect(146, 22, [216, 250, 292, 336], "#f0ece0", ".2") +
    // 小さなクルーズ船(奥)
    `<path d="M132,116h56l-6,10h-44z" fill="#2f3a46"/><rect x="136" y="106" width="48" height="10" fill="#e8e4d8"/><rect x="144" y="98" width="32" height="9" fill="#f0ece0"/><rect x="160" y="88" width="9" height="10" fill="#c0453c"/>` +
    // 手前の小舟
    boat(122, 178, 76, "#5a4630") +
    person(150, 180, 20, "#f5b31c") +
    arm(150, 168, 13, 7) +
    `<path d="M163,174l18,8" stroke="#6b5330" stroke-width="3" stroke-linecap="round"/>` +
    boat(310, 194, 54, "#8a3a34") +
    gull(112, 62, 1.1) +
    gull(268, 40, 0.9),

  /** オーレスン。焼けたあと三年で石とレンガに建て直された町並み。 */
  rebuiltfire:
    sky("#a8bcd8", "#e8c8a8", 106) +
    lowSun(340, 84, 13, "#f5c88a", "#f5d8b0") +
    clouds(80, 34, 1.1, "#e8d0c0", ".6") +
    `<g fill="#4a5a70"><path d="M0,106c30,-14 66,-18 96,-12l-4,12z"/><path d="M400,106c-36,-16 -78,-18 -112,-10l6,10z"/></g>` +
    band(106, 22, "#3f6f8a") +
    ripples(112, "#9fd4e8", ".4") +
    band(128, 8, "#8a8578") +
    // アール・ヌーヴォーの町並み
    `<rect x="0" y="76" width="72" height="58" fill="#a8c0b0"/>` +
    `<path d="M-2,76c0,-14 14,-24 36,-24s38,10 38,24z" fill="#8fa89a"/>` +
    `<g fill="#f0ece0"><path d="M8,90h16v-4a8,8 0 0 1 16,0v4h16v6H8z"/></g>` +
    `<g fill="#4a5f7a"><rect x="10" y="96" width="12" height="16"/><rect x="30" y="96" width="12" height="16"/><rect x="50" y="96" width="12" height="16"/><rect x="20" y="118" width="14" height="16"/><rect x="42" y="118" width="14" height="16"/></g>` +
    `<rect x="60" y="54" width="18" height="80" fill="#c8d8cc"/>` +
    `<path d="M56,54l13,-24 13,24z" fill="#4a4a55"/>` +
    `<circle cx="69" cy="30" r="2.4" fill="#c8a03c"/>` +
    `<rect x="76" y="70" width="66" height="64" fill="#e8d8b0"/>` +
    `<path d="M74,70c0,-12 15,-20 34,-20s34,8 34,20z" fill="#d0bc94"/>` +
    `<g stroke="#b8a47c" stroke-width="2.4" fill="none"><path d="M82,68c8,-10 44,-10 52,0M88,60c6,-6 32,-6 38,0"/></g>` +
    `<g fill="#4a5f7a"><rect x="84" y="80" width="13" height="17"/><rect x="103" y="80" width="13" height="17"/><rect x="122" y="80" width="13" height="17"/><rect x="84" y="106" width="13" height="17"/><rect x="103" y="106" width="13" height="17"/><rect x="122" y="106" width="13" height="17"/></g>` +
    `<g fill="#f0ece0"><rect x="80" y="76" width="58" height="3"/><rect x="80" y="102" width="58" height="3"/></g>` +
    `<rect x="146" y="62" width="106" height="72" fill="#f0e4cc"/>` +
    `<path d="M144,62c0,-14 24,-22 54,-22s54,8 54,22z" fill="#dcccb0"/>` +
    `<g fill="#4a5f7a"><rect x="154" y="74" width="14" height="18"/><rect x="176" y="74" width="14" height="18"/><rect x="198" y="74" width="14" height="18"/><rect x="220" y="74" width="14" height="18"/><rect x="154" y="102" width="14" height="18"/><rect x="198" y="102" width="14" height="18"/><rect x="232" y="102" width="14" height="18"/></g>` +
    `<rect x="256" y="72" width="70" height="62" fill="#d8b4b0"/>` +
    `<path d="M254,72c0,-12 16,-20 37,-20s37,8 37,20z" fill="#c09c98"/>` +
    `<g fill="#4a5f7a"><rect x="264" y="84" width="13" height="17"/><rect x="284" y="84" width="13" height="17"/><rect x="304" y="84" width="13" height="17"/><rect x="264" y="110" width="13" height="17"/><rect x="284" y="110" width="13" height="17"/><rect x="304" y="110" width="13" height="17"/></g>` +
    `<g stroke="#b09490" stroke-width="2.2" fill="none"><path d="M262,80c10,-8 46,-8 56,0"/></g>` +
    // 角の塔屋(魔女帽子)
    `<rect x="324" y="60" width="26" height="74" fill="#dcc8b8"/>` +
    `<path d="M320,60L337,20l17,40z" fill="#3f434a"/>` +
    `<circle cx="337" cy="18" r="3" fill="#c8a03c"/>` +
    `<g fill="#4a5f7a"><rect x="330" y="72" width="14" height="18"/><rect x="330" y="98" width="14" height="18"/></g>` +
    `<rect x="352" y="82" width="48" height="52" fill="#b8ccdc"/>` +
    `<path d="M350,82c0,-10 12,-18 26,-18s26,8 26,18z" fill="#9fb4c8"/>` +
    `<g fill="#4a5f7a"><rect x="358" y="94" width="13" height="16"/><rect x="378" y="94" width="13" height="16"/><rect x="368" y="116" width="14" height="18"/></g>` +
    // 運河
    band(136, 74, "#3f6f8a") +
    ripples(150) +
    ripples(180, "#9fd4e8", ".35") +
    reflect(136, 32, [14, 66, 108, 268, 332, 380], "#f0ece0", ".22") +
    // 手前の舟と埠頭
    fishingBoat(12, 168, 104, "#2f4a5f") +
    fishingBoat(288, 178, 96, "#8a3a34") +
    boat(160, 190, 80, "#5a4630") +
    person(190, 192, 20, "#f5b31c") +
    arm(190, 180, 13, 6) +
    lamp(132, 136, 26, true) +
    lamp(262, 136, 26, true) +
    gull(180, 48, 1.1) +
    gull(240, 34, 0.9),

  /** モルデ。数日だけ政府がここにあった。無線のアンテナと、燃える町の遠い明かり。 */
  exile:
    sky("#243a55", "#3f5a72", 112) +
    stars([
      [40, 20, 1.4],
      [96, 34, 1.2],
      [150, 16, 1.5],
      [214, 28, 1.2],
      [286, 14, 1.4],
      [352, 30, 1.2],
    ]) +
    moon(58, 32, 11) +
    // 遠くの燃える町(右の水平線)
    `<ellipse cx="320" cy="112" rx="96" ry="26" fill="#d86a3a" opacity=".3"/>` +
    `<ellipse cx="320" cy="114" rx="62" ry="15" fill="#e8843a" opacity=".3"/>` +
    `<g fill="#16222f"><rect x="256" y="96" width="18" height="16"/><rect x="280" y="88" width="22" height="24"/><path d="M280,88l11,-12 11,12z"/><rect x="308" y="94" width="16" height="18"/><rect x="330" y="86" width="20" height="26"/><path d="M330,86l10,-11 10,11z"/><rect x="358" y="98" width="24" height="14"/></g>` +
    `<g fill="#3a4a56" opacity=".65"><ellipse cx="292" cy="66" rx="13" ry="22"/><ellipse cx="344" cy="58" rx="11" ry="24"/></g>` +
    `<g fill="#f5b31c" opacity=".8"><rect x="286" y="100" width="4" height="6"/><rect x="336" y="98" width="4" height="6"/></g>` +
    // 海
    band(112, 98, "#1f3a4f") +
    ripples(126, "#4a7f9a", ".5") +
    ripples(154, "#3f6f8a", ".4") +
    // 巡洋艦の影
    `<path d="M262,110h122l-12,12H272z" fill="#141f2b"/>` +
    `<rect x="292" y="98" width="34" height="12" fill="#141f2b"/>` +
    `<rect x="304" y="80" width="5" height="19" fill="#141f2b"/>` +
    `<rect x="336" y="94" width="14" height="16" fill="#141f2b"/>` +
    `<g stroke="#141f2b" stroke-width="1.4" fill="none"><path d="M306,80l26,16M306,82l-30,20"/></g>` +
    // 手前の岬
    `<path d="M0,116c48,4 92,16 132,34c40,18 88,28 148,30l120,4v26H0z" fill="#22302a"/>` +
    `<path d="M0,124c44,6 84,18 122,34c38,16 84,26 140,28l138,4v20H0z" fill="#1a2622"/>` +
    // 白樺と家
    birch(16, 152, 44) +
    birch(34, 156, 52) +
    birch(126, 164, 40) +
    woodHouse(40, 158, 62, 32, "#3a3228", "#241f1c", "#8a8578") +
    `<g fill="#f5b31c"><rect x="52" y="136" width="11" height="12"/><rect x="78" y="136" width="11" height="12"/></g>` +
    `<circle cx="57" cy="142" r="14" fill="#f5b31c" opacity=".15"/>` +
    // 無線のアンテナ
    `<rect x="110" y="66" width="3.4" height="98" fill="#5a5f66"/>` +
    `<g stroke="#6b7078" stroke-width="1.2" fill="none"><path d="M111,70L68,126M113,70L154,120M111,80l-24,44M113,80l30,40"/></g>` +
    `<g fill="#e8443f"><circle cx="111.7" cy="64" r="3"/></g>` +
    `<g fill="#8a8f96"><rect x="104" y="88" width="16" height="2.4"/><rect x="106" y="102" width="12" height="2.2"/></g>` +
    // 手前のバラ園
    `<g fill="#2f4a34"><ellipse cx="188" cy="188" rx="30" ry="14"/><ellipse cx="238" cy="196" rx="28" ry="13"/><ellipse cx="292" cy="186" rx="24" ry="12"/></g>` +
    `<g fill="#c0453c"><circle cx="174" cy="182" r="3.4"/><circle cx="192" cy="178" r="3"/><circle cx="204" cy="186" r="3.4"/><circle cx="228" cy="190" r="3.2"/><circle cx="246" cy="184" r="3.4"/><circle cx="256" cy="194" r="3"/><circle cx="284" cy="180" r="3.2"/><circle cx="300" cy="188" r="3.4"/></g>` +
    `<g fill="#e8847a"><circle cx="182" cy="190" r="2.6"/><circle cx="238" cy="180" r="2.6"/><circle cx="296" cy="176" r="2.4"/></g>` +
    `<g stroke="#4a4036" stroke-width="2.6" fill="none"><path d="M150,196h124"/></g>` +
    `<g fill="#4a4036"><rect x="150" y="186" width="4" height="14"/><rect x="210" y="186" width="4" height="14"/><rect x="270" y="186" width="4" height="14"/></g>` +
    // 海を見る人
    person(140, 172, 22, "#2f3a4a") +
    arm(140, 160, 10, 6, "#c8b49a") +
    `<circle cx="152" cy="166" r="6" fill="#f5b31c" opacity=".28"/><rect x="149" y="163" width="5" height="6" fill="#f8dc90"/>`,

  /** オンダルスネス。高さ1kmの岩壁の下を線路が抜ける。 */
  trollwall:
    band(0, 46, "#8fb0cc") +
    clouds(96, 20, 0.8, "#e8eef2", ".55") +
    clouds(300, 14, 0.6, "#e8eef2", ".5") +
    // 岩壁(稜線は不規則に)
    `<path d="M0,152V38L24,22L42,32L68,10L90,24L120,4L146,20L170,8L200,26L226,12L254,32L278,22L304,38L330,26L362,42L400,30V152z" fill="#5f646e"/>` +
    `<path d="M120,152L96,44L120,26L146,42L170,30L200,46L226,32L254,50L278,40L304,54L330,44L362,58L400,48V152z" fill="#535963"/>` +
    `<path d="M254,152L232,58L254,66L278,56L304,70L330,60L362,74L400,64V152z" fill="#484e58"/>` +
    cracks([
      "M30,42l14,50-8,34 10,22",
      "M84,26l-8,42 16,40-6,38",
      "M148,30l10,54-12,36 8,28",
      "M214,24l-6,48 14,44-8,32",
      "M286,20l12,50-10,40 8,38",
      "M352,26l-8,44 12,42-6,36",
    ]) +
    cracks(["M52,70l22,14", "M110,96l-20,10", "M190,60l24,10", "M262,110l-22,8", "M330,72l20,16"], "#3f444d", 1.2) +
    // 雪の筋
    `<g fill="#e4ecf4" opacity=".85"><path d="M42,30l8,26-16,4z"/><path d="M118,24l7,22-14,4z"/><path d="M204,28l8,24-15,4z"/><path d="M296,22l8,26-16,4z"/><path d="M366,30l7,22-14,4z"/></g>` +
    `<g fill="#dfe8f0" opacity=".55"><path d="M66,70l6,34-12,2z"/><path d="M240,66l6,36-13,2z"/><path d="M320,74l6,30-12,2z"/></g>` +
    // 崖の裾(ガレ場)
    ground(148, "#6b6f66") +
    `<path d="M0,150c56,-8 104,-6 152,4c50,10 108,12 168,4l80,-6v18H0z" fill="#767a70"/>` +
    `<g fill="#565b54"><ellipse cx="46" cy="158" rx="15" ry="6"/><ellipse cx="118" cy="162" rx="12" ry="5"/><ellipse cx="304" cy="160" rx="14" ry="6"/><ellipse cx="368" cy="156" rx="11" ry="5"/></g>` +
    fir(24, 156, 24) +
    fir(60, 160, 20) +
    fir(340, 158, 22) +
    fir(378, 162, 26) +
    // 線路
    band(162, 20, "#8a8578") +
    rails(172, 0, 400, 16) +
    pole(96, 166, 30) +
    pole(300, 166, 30) +
    `<g stroke="#6b7078" stroke-width="1" fill="none"><path d="M96,140h204"/></g>` +
    // 列車(右)
    shade(324, 178, 44, 5, ".2") +
    `<rect x="266" y="146" width="118" height="28" rx="4" fill="#2f6f4a"/>` +
    `<rect x="266" y="164" width="118" height="6" fill="#1f4f34"/>` +
    `<g fill="#bfe0f2"><rect x="274" y="150" width="18" height="12"/><rect x="298" y="150" width="18" height="12"/><rect x="322" y="150" width="18" height="12"/><rect x="346" y="150" width="18" height="12"/></g>` +
    `<g fill="#2f2a26"><circle cx="286" cy="176" r="5"/><circle cx="362" cy="176" r="5"/></g>` +
    `<circle cx="268" cy="160" r="3.4" fill="#f5b31c"/>` +
    // 川(手前)
    band(182, 28, "#4a7f96") +
    `<g fill="#eef4f8" opacity=".7"><path d="M0,190q34,-6 70,2t76,0v6H0z"/><path d="M212,198q40,-8 82,0t106,-2v8H212z"/></g>` +
    `<g fill="#3f4a52"><ellipse cx="62" cy="196" rx="18" ry="8"/><ellipse cx="182" cy="204" rx="22" ry="8"/><ellipse cx="320" cy="192" rx="16" ry="7"/></g>` +
    `<g fill="#525c66"><ellipse cx="58" cy="192" rx="12" ry="5"/><ellipse cx="176" cy="200" rx="14" ry="5"/></g>` +
    // 壁の高さを示す2人
    person(140, 164, 15, "#e8443f") +
    person(154, 164, 14, "#f5b31c") +
    `<circle cx="212" cy="94" r="2.6" fill="#e8443f"/>`,

  /** トロンハイム。ゴシックの尖塔と、川に脚を突き出した倉庫。 */
  cathedral:
    sky("#8fb8d8", "#dce6ea", 112) +
    clouds(230, 28, 1) +
    clouds(50, 20, 0.7) +
    hills(104, "#4a6b4f", 3, 26) +
    firRow(106, 240, 396, 8, 18, "#35563f") +
    ground(112, "#7f8a72") +
    // ニダロス大聖堂(左)
    `<rect x="24" y="88" width="118" height="52" fill="#b8b0a0"/>` +
    `<rect x="20" y="84" width="126" height="6" fill="#a89f8c"/>` +
    `<g fill="#a89f8c"><rect x="26" y="96" width="9" height="44"/><rect x="60" y="96" width="9" height="44"/><rect x="98" y="96" width="9" height="44"/><rect x="132" y="96" width="9" height="44"/></g>` +
    `<g fill="#8a8272"><path d="M26,96l4.5,-8 4.5,8z"/><path d="M60,96l4.5,-8 4.5,8z"/><path d="M98,96l4.5,-8 4.5,8z"/><path d="M132,96l4.5,-8 4.5,8z"/></g>` +
    `<circle cx="83" cy="108" r="15" fill="#cfc7b4"/><circle cx="83" cy="108" r="12" fill="#3f5f9f"/>` +
    `<g fill="#cfc7b4"><rect x="82" y="96" width="2" height="24"/><rect x="71" y="107" width="24" height="2"/></g>` +
    `<g fill="#e8443f"><circle cx="83" cy="108" r="3.4"/></g>` +
    `<g fill="#5f7f96"><path d="M40,140v-16a6,6 0 0 1 12,0v16z"/><path d="M114,140v-16a6,6 0 0 1 12,0v16z"/></g>` +
    `<path d="M76,140v-18a7,7 0 0 1 14,0v18z" fill="#5a4630"/>` +
    // 尖塔
    `<rect x="66" y="42" width="34" height="46" fill="#b8b0a0"/>` +
    `<path d="M60,42L83,4l23,38z" fill="#4a5568"/>` +
    `<g fill="#5f7f96"><rect x="72" y="54" width="8" height="18"/><rect x="86" y="54" width="8" height="18"/></g>` +
    `<path d="M83,4V-2" stroke="#c8a03c" stroke-width="2"/><circle cx="83" cy="3" r="3" fill="#c8a03c"/>` +
    // バックランネの倉庫(右・脚が川に立つ)
    `<g fill="#5a4630"><rect x="256" y="140" width="5" height="24"/><rect x="278" y="140" width="5" height="24"/><rect x="300" y="140" width="5" height="24"/><rect x="322" y="140" width="5" height="24"/><rect x="344" y="140" width="5" height="24"/><rect x="366" y="140" width="5" height="24"/><rect x="388" y="140" width="5" height="24"/></g>` +
    `<g stroke="#5a4630" stroke-width="2" fill="none"><path d="M258,150l22,10M280,150l22,10M302,150l22,10M324,150l22,10M346,150l22,10M368,150l22,10"/></g>` +
    warehouseGable(250, 142, 34, 44, "#a8382e") +
    warehouseGable(288, 142, 32, 50, "#d8a03c") +
    warehouseGable(324, 142, 34, 42, "#6f8fa8") +
    warehouseGable(362, 142, 34, 48, "#e8e0d0") +
    // 川
    band(164, 46, "#3f6f8a") +
    ripples(176) +
    reflect(164, 22, [258, 296, 332, 372], "#f0ece0", ".2") +
    // 古い木橋(手前中央・見える帯)
    `<path d="M136,178h128v10H136z" fill="#8a5f3a"/>` +
    `<g fill="#a8382e"><rect x="140" y="146" width="12" height="34"/><rect x="248" y="146" width="12" height="34"/><rect x="134" y="140" width="24" height="7"/><rect x="242" y="140" width="24" height="7"/></g>` +
    `<path d="M134,140h24l-12,-10z" fill="#c8a05a"/><path d="M242,140h24l-12,-10z" fill="#c8a05a"/>` +
    `<g stroke="#8a5f3a" stroke-width="2.4" fill="none"><path d="M136,170h128M152,170v8M176,170v8M200,170v8M224,170v8"/></g>` +
    `<path d="M136,188l-14,16h156l-14,-16z" fill="#7a5533" opacity=".6"/>` +
    person(210, 178, 20, "#f5b31c") +
    person(228, 178, 18, "#2f6fa8") +
    // 手前左の舟と岸
    boat(20, 186, 78, "#5a4630") +
    person(48, 188, 19, "#e8443f") +
    arm(48, 177, 12, 6) +
    gull(180, 56, 1.1) +
    gull(300, 46, 0.9),

  /** シュールダール。フィヨルドの縁に置かれた滑走路と管制塔。 */
  airfield:
    sky("#8fc4e8", "#cfe4f0", 92) +
    clouds(70, 24) +
    clouds(320, 30, 1.1) +
    peaks(92, "#6b8296", [
      [50, 40, 60, true],
      [150, 30, 66, true],
      [260, 44, 58, false],
      [364, 34, 62, true],
    ]) +
    `<g fill="#4f6b62"><path d="M0,92c46,-14 96,-18 140,-12l-4,12z"/><path d="M400,92c-44,-16 -96,-18 -142,-10l6,10z"/></g>` +
    band(92, 14, "#4a7f9a") +
    ripples(96, "#bfe8f4", ".4") +
    ground(106, "#6b8a4a") +
    firRow(110, 10, 120, 7, 20, "#2a4a36") +
    firRow(110, 296, 392, 6, 18, "#2a4a36") +
    // 格納庫(左)
    `<path d="M6,142V118a58,10 0 0 1 116,0v24z" fill="#8a9098"/>` +
    `<path d="M6,142V120a58,9 0 0 1 116,0v22z" fill="#9aa0a8"/>` +
    `<g stroke="#77808a" stroke-width="1.6" fill="none"><path d="M28,113v29M52,110v32M76,110v32M100,113v29"/></g>` +
    `<rect x="30" y="122" width="68" height="20" fill="#5f666e"/>` +
    `<rect x="6" y="140" width="116" height="4" fill="#6b7078"/>` +
    // 管制塔(右)
    `<rect x="330" y="66" width="24" height="76" fill="#cfc7b4"/>` +
    `<path d="M318,64h48l-6,-14h-36z" fill="#3a4a55"/>` +
    `<path d="M320,50h44l-4,-12h-36z" fill="#4a5f6e"/>` +
    `<g fill="#7fb8d8"><path d="M322,48h40l-3,-9h-34z"/></g>` +
    `<rect x="316" y="62" width="52" height="5" fill="#a89f8c"/>` +
    `<rect x="340" y="18" width="3" height="22" fill="#6b7078"/>` +
    `<circle cx="341.5" cy="16" r="3.4" fill="#e8443f"/>` +
    `<g fill="#5f7f96"><rect x="336" y="76" width="12" height="14"/><rect x="336" y="98" width="12" height="14"/></g>` +
    `<rect x="360" y="120" width="34" height="22" fill="#b8b0a0"/><path d="M356,120h42l-6,-8h-30z" fill="#6b7078"/>` +
    // エプロンと滑走路
    band(142, 12, "#7a8a5f") +
    band(154, 40, "#4a4f55") +
    `<g fill="#8a8f96" opacity=".5"><rect x="0" y="156" width="400" height="2"/><rect x="0" y="190" width="400" height="2"/></g>` +
    `<g fill="#f0ece0" opacity=".85"><rect x="12" y="182" width="26" height="3.4"/><rect x="58" y="182" width="26" height="3.4"/><rect x="104" y="182" width="26" height="3.4"/><rect x="270" y="182" width="26" height="3.4"/><rect x="316" y="182" width="26" height="3.4"/><rect x="362" y="182" width="26" height="3.4"/></g>` +
    `<g fill="#f0ece0" opacity=".8"><rect x="6" y="160" width="4" height="14"/><rect x="14" y="160" width="4" height="14"/><rect x="22" y="160" width="4" height="14"/><rect x="382" y="160" width="4" height="14"/><rect x="390" y="160" width="4" height="14"/></g>` +
    band(194, 16, "#5f7a48") +
    `<g fill="#5b8fe8"><circle cx="40" cy="150" r="3"/><circle cx="96" cy="150" r="3"/><circle cx="152" cy="150" r="3"/><circle cx="208" cy="150" r="3"/><circle cx="264" cy="150" r="3"/><circle cx="320" cy="150" r="3"/><circle cx="376" cy="150" r="3"/></g>` +
    // 滑走路の飛行機
    shade(196, 186, 68, 6, ".2") +
    `<path d="M118,166h116l38,6-38,6H124z" fill="#f0ece0"/>` +
    `<path d="M234,166l30,-3 12,9-12,9-30,-3z" fill="#f0ece0"/>` +
    `<path d="M262,168l24,-24h12l-14,26z" fill="#c0453c"/>` +
    `<path d="M170,172l-30,20h14l38,-20z" fill="#dcd8cc"/>` +
    `<path d="M176,168l-16,-18h12l24,18z" fill="#e8e4d8"/>` +
    `<g fill="#3f5f7a"><rect x="132" y="169" width="8" height="6"/><rect x="146" y="169" width="8" height="6"/><rect x="160" y="169" width="8" height="6"/><rect x="174" y="169" width="8" height="6"/><rect x="188" y="169" width="8" height="6"/><rect x="202" y="169" width="8" height="6"/><rect x="216" y="169" width="8" height="6"/></g>` +
    `<path d="M118,170c-6,0 -10,2 -10,4s4,4 10,4z" fill="#3f434a"/>` +
    `<g fill="#2f2a26"><circle cx="150" cy="184" r="5"/><circle cx="206" cy="184" r="5"/><circle cx="124" cy="180" r="3.4"/></g>` +
    // 吹き流しと地上員
    `<rect x="40" y="112" width="2.8" height="32" fill="#4a4f58"/>` +
    `<path d="M42.8,114h26l-4,6h-22z" fill="#e8843a"/>` +
    `<path d="M42.8,120h22l-4,6h-18z" fill="#f0ece0"/>` +
    person(300, 152, 20, "#f5b31c") +
    arm(300, 140, 11, -7, "#f5b31c") +
    person(318, 152, 18, "#e8443f") +
    gull(220, 60, 1) +
    gull(268, 44, 0.8),

  /** トロムソ。オーロラの下の北極教会。鉄道はここまで一度も来ていない。 */
  arctic:
    `<rect x="0" y="0" width="400" height="210" fill="#16233d"/>` +
    band(0, 96, "#1b2b48") +
    stars([
      [30, 18, 1.4],
      [78, 40, 1.2],
      [124, 12, 1.5],
      [186, 34, 1.2],
      [244, 18, 1.4],
      [300, 44, 1.2],
      [356, 22, 1.5],
      [388, 52, 1.1],
      [58, 66, 1.1],
      [162, 62, 1.1],
    ]) +
    // オーロラ
    `<path d="M0,44c66,-30 138,-6 200,-16s136,-24 200,-8v22c-64,-14 -134,4 -200,14S66,64 0,68z" fill="#5fd0a0" opacity=".3"/>` +
    `<path d="M0,60c70,-26 142,0 204,-10s130,-22 196,-4v14c-66,-14 -132,6 -196,16S70,80 0,80z" fill="#8fe8c0" opacity=".3"/>` +
    `<path d="M0,30c72,-24 140,4 206,-8s126,-18 194,-2v10c-68,-12 -128,8 -194,18S72,52 0,50z" fill="#a88fd8" opacity=".2"/>` +
    `<g stroke="#9ff0c8" stroke-width="2" opacity=".35" fill="none"><path d="M40,36v34M92,28v40M148,44v32M262,26v38M330,34v34"/></g>` +
    // 山影
    peaks(112, "#22354f", [
      [44, 62, 58, true],
      [136, 52, 62, true],
      [318, 58, 66, true],
      [392, 68, 48, false],
    ], "#cfe0ec") +
    // 海
    band(112, 42, "#12243a") +
    `<g stroke="#2f5f7a" stroke-width="2" opacity=".6" fill="none"><path d="M14,126h70M210,138h96M110,146h64M330,130h62"/></g>` +
    `<g fill="#5fd0a0" opacity=".18"><rect x="60" y="112" width="10" height="42"/><rect x="180" y="112" width="12" height="42"/><rect x="300" y="112" width="10" height="42"/></g>` +
    // トロムソ橋(左)
    `<g fill="#2a3a52"><rect x="4" y="112" width="9" height="16"/><rect x="42" y="108" width="9" height="20"/><rect x="82" y="104" width="9" height="24"/><rect x="122" y="100" width="9" height="28"/></g>` +
    `<path d="M0,110c40,-10 90,-16 140,-18v6C90,100 40,106 0,116z" fill="#33445e"/>` +
    `<g fill="#f5b31c"><circle cx="8" cy="105" r="1.8"/><circle cx="46" cy="100" r="1.8"/><circle cx="86" cy="95" r="1.8"/><circle cx="126" cy="90" r="1.8"/></g>` +
    // 雪の岸
    ground(150, "#dfe8f2") +
    drifts(158, "#c4d6e6", ".65") +
    // 北極教会(右)
    `<path d="M262,152L318,58l56,94z" fill="#e8eef4"/>` +
    `<path d="M282,152L318,92l36,60z" fill="#cfdae6"/>` +
    `<g stroke="#a8bccc" stroke-width="1.6" fill="none"><path d="M272,152L318,74M290,152L318,110M346,152L318,110M364,152L318,74M300,152L318,124M336,152L318,124"/></g>` +
    `<path d="M294,152L318,112l24,40z" fill="#3f6f9f"/>` +
    `<g fill="#e8eef4"><rect x="316" y="112" width="4" height="40"/><rect x="302" y="128" width="32" height="4"/></g>` +
    `<path d="M318,54v-8M312,49h12" stroke="#8fa8bc" stroke-width="2.4"/>` +
    `<rect x="256" y="146" width="126" height="6" fill="#b8c8d4"/>` +
    // 岸辺の家々(左)
    woodHouse(12, 152, 40, 22, "#7a3a30", "#2a2f36", "#c8ccd0") +
    woodHouse(62, 152, 36, 20, "#5f5a52", "#2a2f36", "#c8ccd0") +
    woodHouse(108, 152, 34, 18, "#7a6a48", "#2a2f36", "#c8ccd0") +
    `<g fill="#f5b31c"><rect x="20" y="138" width="7" height="8"/><rect x="70" y="140" width="7" height="8"/><rect x="116" y="142" width="6" height="7"/></g>` +
    lamp(160, 156, 26, true) +
    // 手前でオーロラを見上げる2人
    shade(206, 190, 26, 5, ".16") +
    personCap(196, 188, 24, "#2f4a6f") +
    arm(196, 174, 9, -10, "#2f4a6f") +
    personCap(220, 190, 22, "#8a3a34", "#f5b31c") +
    `<g stroke="#b8c8d4" stroke-width="2" opacity=".7" fill="none"><path d="M60,192q60,-10 130,-4t150,-6"/></g>` +
    fir(354, 174, 26, "#1f3a2c") +
    fir(382, 180, 30, "#1f3a2c"),

  /**
   * シルケネス。鉄鉱石の索道と、岩をくり抜いた防空壕。
   * 重い題材。事実を示す構図にとどめ、装飾的にしない。
   */
  sovietliberation:
    sky("#4a5666", "#8a94a0", 114) +
    `<g fill="#3f4750"><path d="M0,100c40,-20 88,-26 132,-20l-6,20z"/><path d="M400,100c-42,-22 -96,-24 -142,-16l8,16z"/></g>` +
    `<g fill="#4a525c"><path d="M96,100c14,-16 40,-22 66,-18l-4,18z"/></g>` +
    ground(114, "#dfe6ec") +
    drifts(124, "#c0cdd8", ".6") +
    // 索道の鉄塔とバケット
    pylon(340, 152, 106, "#565c66") +
    pylon(96, 132, 68, "#5f656f") +
    `<g stroke="#3f444d" stroke-width="1.8" fill="none"><path d="M0,58L96,66l244,48L400,106M0,74L96,82l244,46L400,120"/></g>` +
    `<g fill="#4a4038"><path d="M44,62l2,8h18l2,-8z"/><path d="M172,84l2,9h20l2,-9z"/><path d="M262,100l2,9h20l2,-9z"/></g>` +
    `<g fill="#5a4a40"><rect x="44" y="70" width="22" height="15"/><rect x="172" y="93" width="24" height="16"/><rect x="262" y="109" width="24" height="16"/></g>` +
    `<g fill="#7a4235"><rect x="46" y="70" width="18" height="4"/><rect x="174" y="93" width="20" height="4"/><rect x="264" y="109" width="20" height="4"/></g>` +
    // 鉱山の建屋と鉱石の山
    `<rect x="196" y="118" width="72" height="26" fill="#5f5a52"/>` +
    `<path d="M192,118h80l-8,-8h-64z" fill="#4a4640"/>` +
    `<rect x="276" y="104" width="12" height="40" fill="#6b665e"/>` +
    `<g fill="#a8b4bc" opacity=".55"><ellipse cx="282" cy="98" rx="10" ry="6"/><ellipse cx="290" cy="84" rx="8" ry="5"/></g>` +
    `<path d="M296,144c14,-18 34,-24 54,-14l10,14z" fill="#6b4a3c"/>` +
    `<path d="M300,144c12,-12 26,-16 40,-10l8,10z" fill="#7a5344"/>` +
    // 岩をくり抜いた防空壕(左)
    `<path d="M0,150V72c30,-10 62,-8 92,8c14,8 24,26 26,46l-4,24z" fill="#5a606a"/>` +
    `<path d="M0,150V84c26,-8 54,-4 78,12c12,8 18,24 20,42l-2,12z" fill="#4d535d"/>` +
    cracks(["M22,86l14,26-8,20", "M66,96l-8,24 12,18"], "#383e47") +
    `<path d="M32,150v-30a20,20 0 0 1 40,0v30z" fill="#1c222b"/>` +
    `<path d="M28,120a24,24 0 0 1 48,0l-4,3a20,20 0 0 0 -40,0z" fill="#4a3c2c"/>` +
    `<rect x="26" y="146" width="52" height="5" fill="#4a3c2c"/>` +
    `<path d="M56,150v-26a13,13 0 0 1 26,0v26z" fill="#3f4650"/>` +
    `<g fill="#f5b31c" opacity=".55"><path d="M46,150v-22a8,8 0 0 1 16,0v22z"/></g>` +
    `<g fill="#5a4630"><rect x="24" y="150" width="60" height="4"/><rect x="30" y="154" width="48" height="4"/></g>` +
    personCap(96, 152, 22, "#3f4a56", "#5f6a76") +
    personCap(112, 154, 20, "#4a4038", "#6b6058") +
    // 手前:雪の道と、簡素な石の標
    ground(158, "#e4ebf2") +
    `<g stroke="#c0cdd8" stroke-width="3" opacity=".8" fill="none"><path d="M0,178q80,-10 160,2t240,-4"/><path d="M0,194q90,-8 176,4t224,-6"/></g>` +
    `<g fill="#c4d2de"><ellipse cx="120" cy="188" rx="7" ry="3.4"/><ellipse cx="140" cy="196" rx="7" ry="3.4"/><ellipse cx="160" cy="188" rx="7" ry="3.4"/><ellipse cx="180" cy="196" rx="7" ry="3.4"/></g>` +
    shade(112, 200, 26, 5, ".14") +
    `<path d="M98,198V170a15,15 0 0 1 30,0v28z" fill="#77808a"/>` +
    `<path d="M98,198V170a15,15 0 0 1 15,-15v43z" fill="#8a939c"/>` +
    `<rect x="90" y="196" width="46" height="8" fill="#6b7078"/>` +
    `<circle cx="113" cy="198" r="10" fill="none" stroke="#3f6b3f" stroke-width="3.6"/>` +
    `<g fill="#3f6b3f"><circle cx="105" cy="191" r="2.8"/><circle cx="121" cy="192" r="2.6"/></g>` +
    birch(354, 176, 40) +
    birch(376, 182, 46) +
    birch(332, 170, 32),

  /** カラショーク。トナカイと、木を組んだ議事堂。 */
  sami:
    sky("#8fb0cc", "#e8d0b0", 112) +
    lowSun(64, 92, 16, "#f5c05a", "#f5d89a") +
    clouds(300, 30, 1, "#e8d8c8", ".55") +
    hills(100, "#6b7a72", 3, 24) +
    `<g fill="#e4ecf4" opacity=".85"><path d="M18,100c14,-12 34,-14 50,-6l6,6z"/><path d="M226,100c16,-12 38,-14 54,-4l4,4z"/></g>` +
    ground(112, "#e4ecf2") +
    `<g fill="#c8d6e2" opacity=".7"><path d="M0,126q60,-10 120,0t150,-4 130,2v14H0z"/></g>` +
    `<g fill="#9a8a6a"><path d="M0,124c20,-4 34,-2 44,6l-44,4z"/><path d="M300,120c26,-6 52,-2 74,10l-74,6z"/><path d="M140,132c24,-6 46,-2 62,8l-62,4z"/></g>` +
    // 低木のカバ
    `<g stroke="#6b5a48" stroke-width="1.6" fill="none"><path d="M112,132l-4,-12 6,-6M112,132l6,-10 8,4M300,140l-5,-14 7,-5M300,140l7,-11 9,3M40,146l-5,-13 7,-5M40,146l6,-10 8,3"/></g>` +
    // ラヴヴ(左)
    `<path d="M14,150L54,74l40,76z" fill="#8a7a5f"/>` +
    `<path d="M26,150L54,96l28,54z" fill="#7a6a52"/>` +
    `<g stroke="#5a4630" stroke-width="2" fill="none"><path d="M50,74l-8,-12M58,74l10,-12M54,74v-14"/></g>` +
    `<path d="M42,150v-22a12,12 0 0 1 24,0v22z" fill="#3a3228"/>` +
    `<g fill="#f5b31c" opacity=".8"><path d="M48,150v-14a6,6 0 0 1 12,0v14z"/></g>` +
    `<g fill="#cfd4d8" opacity=".6"><ellipse cx="56" cy="60" rx="9" ry="5"/><ellipse cx="62" cy="46" rx="7" ry="4"/></g>` +
    `<g fill="#5a4630"><rect x="82" y="142" width="24" height="4"/><rect x="84" y="146" width="4" height="8"/><rect x="100" y="146" width="4" height="8"/></g>` +
    // サーミ議事堂(右)
    `<path d="M268,152L318,58l50,94z" fill="#b08048"/>` +
    `<g stroke="#8a6236" stroke-width="1.6" fill="none"><path d="M286,152L318,92M298,152L318,114M338,152L318,114M350,152L318,92M278,152L318,74M358,152L318,74"/></g>` +
    `<path d="M310,58h16l-8,-14z" fill="#6b4a30"/>` +
    `<path d="M300,152v-26a18,18 0 0 1 36,0v26z" fill="#4a3c2c"/>` +
    `<g fill="#f5b31c"><path d="M308,152v-18a10,10 0 0 1 20,0v18z"/></g>` +
    `<rect x="358" y="118" width="42" height="34" fill="#6b5a44"/>` +
    `<path d="M354,118h48l-6,-9h-36z" fill="#4a3c2c"/>` +
    `<g fill="#f5b31c"><rect x="364" y="126" width="12" height="14"/><rect x="382" y="126" width="12" height="14"/></g>` +
    `<rect x="262" y="150" width="140" height="5" fill="#8a8578"/>` +
    // トナカイ
    shade(96, 196, 30, 6, ".14") +
    reindeer(90, 194, 1.05) +
    shade(212, 190, 28, 6, ".14") +
    reindeer(206, 188, 0.95, "#7a6450") +
    shade(320, 200, 26, 5, ".14") +
    reindeer(314, 198, 0.85, "#947c60") +
    // 群れを見る人(ガクティ)
    person(160, 172, 24, "#2f5fa8") +
    `<g fill="#e8443f"><rect x="155" y="158" width="10" height="3.4"/><rect x="155" y="166" width="10" height="2.6"/></g>` +
    `<path d="M154,150h12l-6,-9z" fill="#2f5fa8"/><circle cx="160" cy="140" r="2.4" fill="#f5b31c"/>` +
    arm(160, 160, 12, 6, "#2f5fa8") +
    `<path d="M172,166l14,-22" stroke="#6b5330" stroke-width="2.4" stroke-linecap="round"/>` +
    // 橇の跡
    `<g stroke="#c0cfdc" stroke-width="2.6" opacity=".8" fill="none"><path d="M0,204q100,-14 200,-2t200,-8"/><path d="M0,196q96,-12 192,0t208,-6"/></g>`,

  /** マンダル。丸い花崗岩の磯と、赤白の灯台。 */
  lighthouse:
    sky("#a8c8dc", "#f0d0a8", 104) +
    lowSun(336, 92, 15, "#f5b06a", "#f5c890") +
    clouds(96, 32, 1.1, "#f0dcc8", ".6") +
    `<g fill="#5f6f70"><path d="M40,104c18,-8 42,-8 60,0z"/><path d="M132,104c14,-7 34,-7 48,0z"/><path d="M236,104c16,-8 38,-8 54,0z"/></g>` +
    band(104, 66, "#3f7f9a") +
    `<g fill="#f5b06a" opacity=".28"><path d="M320,104h34l-30,44h-32z"/></g>` +
    ripples(114, "#bfe8f4", ".45") +
    ripples(136, "#9fd4e8", ".35") +
    // 白い木造家並み(左)
    `<path d="M0,148c34,-6 70,-8 104,-4l6,10H0z" fill="#a89f8c"/>` +
    woodHouse(4, 146, 42, 30, "#f0ece0", "#8a3a34") +
    woodHouse(52, 146, 38, 26, "#f0ece0", "#3f434a") +
    woodHouse(96, 148, 34, 24, "#e8e0d0", "#8a3a34") +
    `<path d="M126,148V128a10,10 0 0 1 20,0v20z" fill="#8a3a34"/>` +
    `<path d="M122,128h28l-14,-11z" fill="#3f434a"/>` +
    `<g fill="#5a4630"><rect x="130" y="148" width="26" height="4"/><rect x="140" y="152" width="24" height="4"/><rect x="150" y="156" width="22" height="4"/></g>` +
    // 灯台(右)
    `<path d="M290,152c16,-14 44,-18 68,-8l22,8z" fill="#a89f8c"/>` +
    `<path d="M306,148L312,66h20l6,82z" fill="#f0ece0"/>` +
    `<g fill="#c0453c"><path d="M310,84h24l1,14h-26z"/><path d="M307,112h30l1,14h-32z"/></g>` +
    `<rect x="304" y="62" width="36" height="6" fill="#4a4f58"/>` +
    `<rect x="308" y="46" width="28" height="17" fill="#f5b31c"/>` +
    `<g stroke="#4a4f58" stroke-width="1.6" fill="none"><path d="M316,46v17M328,46v17"/></g>` +
    `<path d="M304,46h44l-22,-14z" fill="#3f434a"/>` +
    `<circle cx="326" cy="30" r="2.6" fill="#c8a03c"/>` +
    `<path d="M338,48L400,34v30z" fill="#f5b31c" opacity=".3"/>` +
    woodHouse(348, 152, 46, 26, "#f0ece0", "#8a3a34") +
    // 手前の丸い花崗岩(なめらかに重ねる)
    `<path d="M0,210V158c46,-16 104,-16 152,-2c50,14 108,16 162,4l86,-14v64z" fill="#b0a898"/>` +
    `<path d="M0,210V176c52,-14 108,-12 156,2c48,14 102,14 160,2l84,-12v42z" fill="#9a9284"/>` +
    `<path d="M0,210v-14c56,-10 116,-6 168,6c44,10 96,10 148,2l84,-10v16z" fill="#8a8276"/>` +
    `<g stroke="#8a8276" stroke-width="2" opacity=".6" fill="none"><path d="M18,166q44,-8 88,0M226,164q54,-8 108,-2M60,190q60,-8 118,2"/></g>` +
    `<ellipse cx="80" cy="200" rx="26" ry="7" fill="#4a7f96"/>` +
    `<ellipse cx="80" cy="199" rx="18" ry="4" fill="#7fb8d0"/>` +
    // 磯に座る2人
    shade(216, 194, 26, 5, ".14") +
    person(206, 190, 22, "#e8443f") +
    arm(206, 178, -10, 8) +
    person(230, 192, 21, "#f5b31c") +
    arm(230, 181, 10, 7) +
    boat(140, 152, 56, "#f0ece0", "#2f5f7a") +
    gull(258, 62, 1.2) +
    gull(178, 48, 0.9) +
    gull(60, 70, 1),

  /** トンスベルグ。ドラッカルの舳先と、丘の上の塔。 */
  vikingtown:
    sky("#8fc4e8", "#dce6ea", 98) +
    clouds(268, 26, 1) +
    clouds(64, 20, 0.7) +
    hills(98, "#4f7a52", 3, 26) +
    // スロッツフィエルの丘と塔(右)
    `<path d="M262,140c14,-32 44,-48 78,-48s56,16 60,44l-6,10z" fill="#6b8a52"/>` +
    `<path d="M300,96V70h32v26z" fill="#a8a094"/>` +
    `<path d="M296,70h40l-20,-20z" fill="#8a3a34"/>` +
    `<g fill="#8a8272"><rect x="298" y="66" width="8" height="6"/><rect x="312" y="66" width="8" height="6"/><rect x="326" y="66" width="8" height="6"/></g>` +
    `<g fill="#4a5560"><rect x="308" y="78" width="7" height="10"/><rect x="320" y="78" width="7" height="10"/></g>` +
    `<rect x="314" y="34" width="2.4" height="18" fill="#6b6250"/><path d="M316.4,35h16v9h-16z" fill="#e8443f"/>` +
    firRow(112, 250, 300, 4, 18, "#2a4a36") +
    band(98, 42, "#4a8fa8") +
    ripples(108, "#bfe8f4", ".45") +
    ground(140, "#8a9a5f") +
    // 塚と長屋
    `<path d="M212,140c8,-18 24,-26 40,-26s30,8 38,26z" fill="#7f9a55"/>` +
    `<g stroke="#6b8547" stroke-width="1.6" opacity=".8" fill="none"><path d="M222,134q30,-10 58,-2"/></g>` +
    logHouse(288, 140, 74, 26, "#5f4630", "#5f8f4f") +
    `<g fill="#cfd4d8" opacity=".55"><ellipse cx="320" cy="104" rx="9" ry="5"/><ellipse cx="326" cy="94" rx="7" ry="4"/></g>` +
    // ヴァイキング船(左・舳先を端に置く)
    shade(120, 176, 90, 8, ".2") +
    `<path d="M18,152h190l-16,22H34z" fill="#5a3f28"/>` +
    `<g stroke="#4a3320" stroke-width="1.6" opacity=".8" fill="none"><path d="M24,160h164M28,166h156"/></g>` +
    `<path d="M20,154C10,132 12,106 30,84c8,6 9,14 5,21c-10,20 -11,34 -5,49z" fill="#4a3320"/>` +
    `<path d="M30,84c6,-8 16,-9 23,-2l-11,5 8,5-17,6z" fill="#6b4a30"/>` +
    `<circle cx="40" cy="85" r="1.8" fill="#f5b31c"/>` +
    `<path d="M204,154c8,-14 8,-30 0,-44c-5,4 -6,10 -3,15c5,10 5,19 -1,27z" fill="#4a3320"/>` +
    `<g><circle cx="52" cy="152" r="10" fill="#c0453c"/><circle cx="76" cy="152" r="10" fill="#f0ece0"/><circle cx="100" cy="152" r="10" fill="#2f5f9f"/><circle cx="124" cy="152" r="10" fill="#f5b31c"/><circle cx="148" cy="152" r="10" fill="#c0453c"/><circle cx="172" cy="152" r="10" fill="#f0ece0"/><circle cx="196" cy="152" r="9" fill="#2f5f9f"/></g>` +
    `<g fill="#8a8578"><circle cx="52" cy="152" r="3"/><circle cx="76" cy="152" r="3"/><circle cx="100" cy="152" r="3"/><circle cx="124" cy="152" r="3"/><circle cx="148" cy="152" r="3"/><circle cx="172" cy="152" r="3"/><circle cx="196" cy="152" r="2.6"/></g>` +
    `<rect x="112" y="96" width="4" height="56" fill="#5a4630"/>` +
    `<path d="M116,100h64v34h-64z" fill="#e0d8c4"/>` +
    `<g fill="#c0453c"><rect x="116" y="106" width="64" height="6"/><rect x="116" y="120" width="64" height="6"/></g>` +
    `<g stroke="#5a4630" stroke-width="1.4" fill="none"><path d="M114,98l-46,54M114,98l72,54"/></g>` +
    // 手前の浜と桟橋
    band(174, 36, "#c8b48a") +
    `<g stroke="#b0a078" stroke-width="2" opacity=".7" fill="none"><path d="M0,184h400M0,198h400"/></g>` +
    `<g fill="#8a5f3a"><rect x="238" y="176" width="120" height="7"/><rect x="248" y="183" width="5" height="16"/><rect x="290" y="183" width="5" height="16"/><rect x="336" y="183" width="5" height="16"/></g>` +
    `<g fill="#8a5f3a"><rect x="216" y="186" width="16" height="16" rx="2"/><rect x="196" y="190" width="14" height="12" rx="2"/></g>` +
    person(268, 176, 24, "#7a5a3a") +
    arm(268, 162, 12, 8, "#c8a880") +
    person(300, 176, 22, "#4a6b8a") +
    person(60, 194, 22, "#8a3a34") +
    boat(310, 190, 62, "#5a4630") +
    gull(212, 56, 1.1) +
    gull(150, 44, 0.9),

  /** コングスヴィンゲル/フレドリクスタ。星形の土塁と堀、その中に人が住む町。 */
  fortresstown:
    sky("#8fc4e8", "#cfe4f0", 104) +
    clouds(90, 26) +
    clouds(310, 22, 0.9) +
    hills(96, "#5f7f5a", 3, 26) +
    firRow(100, 8, 110, 7, 20, "#2a4a36") +
    firRow(100, 296, 394, 6, 18, "#2a4a36") +
    ground(104, "#7f9a55") +
    // 城壁の中の町(土塁の背後)
    woodHouse(24, 118, 40, 24, "#e8e0d0", "#3f434a") +
    woodHouse(72, 116, 36, 22, "#c8a05a", "#8a3a34") +
    woodHouse(118, 118, 34, 20, "#f0ece0", "#3f434a") +
    woodHouse(252, 118, 38, 22, "#a83c30", "#3f434a") +
    woodHouse(298, 116, 36, 24, "#f0ece0", "#8a3a34") +
    woodHouse(344, 118, 38, 21, "#c8a05a", "#3f434a") +
    `<rect x="196" y="86" width="16" height="34" fill="#e8e0d0"/><path d="M192,86l12,-16 12,16z" fill="#3f434a"/><rect x="200" y="94" width="8" height="9" fill="#5f7f96"/>` +
    // 星形の土塁(左右に稜堡の角)
    `<path d="M0,152V132l38,-16 34,14 26,-8 30,12h172l30,-12 26,8 34,-14 10,4v24z" fill="#7f9a55"/>` +
    `<path d="M0,152V140l38,-14 34,12 26,-7 30,10h172l30,-10 26,7 34,-12 10,3v11z" fill="#6b8a4a"/>` +
    `<path d="M0,132l38,-16 34,14 26,-8 30,12v6l-30,-10 -26,8 -34,-13 -38,15z" fill="#b0a894"/>` +
    `<path d="M400,132l-10,-4 -34,14 -26,-8 -30,12v6l30,-10 26,8 34,-13 10,4z" fill="#b0a894"/>` +
    // 大砲と歩哨小屋
    `<g><path d="M26,116l30,-8 2,6 -30,8z" fill="#3a3f47"/><circle cx="28" cy="120" r="5" fill="#5a4630"/><circle cx="46" cy="118" r="4" fill="#5a4630"/></g>` +
    `<g><path d="M338,114l30,8 -2,6 -30,-8z" fill="#3a3f47"/><circle cx="368" cy="126" r="5" fill="#5a4630"/><circle cx="350" cy="122" r="4" fill="#5a4630"/></g>` +
    `<path d="M78,116V98a8,8 0 0 1 16,0v18z" fill="#f0ece0"/>` +
    `<path d="M74,98h24l-12,-10z" fill="#c0453c"/>` +
    `<g fill="#c0453c"><rect x="78" y="104" width="16" height="4"/></g>` +
    `<rect x="304" y="76" width="2.6" height="40" fill="#8a8578"/><path d="M306.6,77h24v14h-24z" fill="#e8443f"/><path d="M306.6,82h24v4h-24z" fill="#f0ece0"/><path d="M316,77h4v14h-4z" fill="#f0ece0"/><path d="M317,77h2v14h-2z" fill="#2f4a8f"/>` +
    // 堀
    band(152, 34, "#4a6f7a") +
    ripples(160, "#8fc4d0", ".4") +
    reflect(152, 16, [40, 96, 300, 358], "#dfe8ee", ".2") +
    `<g fill="#3f8f4f"><ellipse cx="60" cy="176" rx="12" ry="4"/><ellipse cx="120" cy="182" rx="10" ry="3.4"/><ellipse cx="286" cy="178" rx="11" ry="4"/></g>` +
    // 跳ね橋
    `<g fill="#7a5533"><rect x="182" y="150" width="42" height="6"/><rect x="186" y="156" width="5" height="26"/><rect x="214" y="156" width="5" height="26"/></g>` +
    // 手前の土手と人
    ground(186, "#6b8a4a") +
    `<g stroke="#5f7a42" stroke-width="2" opacity=".7" fill="none"><path d="M0,196h400M0,206h400"/></g>` +
    `<path d="M148,210l14,-24h84l14,24z" fill="#a89f8c"/>` +
    person(186, 202, 22, "#e8443f") +
    arm(186, 190, 10, 7) +
    person(208, 204, 20, "#2f6fa8") +
    `<g fill="#5a4630"><rect x="326" y="188" width="46" height="4"/><rect x="330" y="192" width="4" height="12"/><rect x="364" y="192" width="4" height="12"/></g>` +
    `<g fill="#3f8f4f"><circle cx="36" cy="182" r="18"/><rect x="33" y="182" width="6" height="20" fill="#6b5330"/></g>` +
    `<g fill="#357a45"><circle cx="378" cy="180" r="15"/><rect x="375.5" y="180" width="5" height="18" fill="#6b5330"/></g>`,

  /** ドンボース/ドランメン。山あいの分岐駅。手前で線路が二股に分かれる。 */
  railjunction:
    sky("#8fb8d8", "#dce6ea", 112) +
    clouds(120, 24, 0.9) +
    clouds(320, 20, 0.8) +
    peaks(94, "#7a8a96", [
      [42, 34, 60, true],
      [148, 24, 64, true],
      [268, 38, 58, true],
      [372, 28, 62, true],
    ]) +
    `<g fill="#4f6b52"><path d="M0,94c46,-16 100,-20 150,-12l-6,12z"/><path d="M400,94c-46,-18 -104,-20 -156,-10l8,10z"/></g>` +
    firRow(112, 4, 132, 8, 24, "#2a4a36") +
    firRow(112, 268, 396, 8, 22, "#2a4a36") +
    ground(112, "#7f8a6a") +
    `<g fill="#dfe8ee" opacity=".8"><path d="M0,124q30,-8 62,-2t56,0v8H0z"/><path d="M300,120q34,-8 66,0t34,-2v8H300z"/></g>` +
    // 信号所(左)
    `<rect x="8" y="94" width="72" height="52" fill="#c8a05a"/>` +
    `<path d="M2,94h84l-8,-12H10z" fill="#8a3a34"/>` +
    `<rect x="2" y="92" width="84" height="4" fill="#f0ece0"/>` +
    `<rect x="4" y="114" width="80" height="4" fill="#f0ece0"/>` +
    `<g fill="#f0ece0"><rect x="12" y="98" width="26" height="16"/><rect x="46" y="98" width="26" height="16"/><rect x="12" y="122" width="20" height="18"/><rect x="42" y="122" width="20" height="18"/></g>` +
    `<g fill="#4a5f7a"><rect x="14" y="100" width="22" height="12"/><rect x="48" y="100" width="22" height="12"/><rect x="14" y="124" width="16" height="14"/><rect x="44" y="124" width="16" height="14"/></g>` +
    `<g fill="#5a4630"><path d="M80,146l14,-28h8l-14,28z"/><rect x="84" y="118" width="18" height="3.4"/></g>` +
    `<rect x="52" y="70" width="7" height="14" fill="#7a6a58"/>` +
    `<g fill="#cfd4d8" opacity=".6"><ellipse cx="56" cy="64" rx="8" ry="4.4"/><ellipse cx="62" cy="54" rx="6" ry="3.4"/></g>` +
    // 駅舎(右)
    `<rect x="298" y="100" width="98" height="46" fill="#9a4a3a"/>` +
    `<path d="M292,100h110l-10,-13H302z" fill="#3f434a"/>` +
    `<rect x="292" y="98" width="110" height="4" fill="#f0ece0"/>` +
    `<g fill="#f0ece0"><rect x="306" y="108" width="22" height="18"/><rect x="338" y="108" width="22" height="18"/><rect x="370" y="108" width="22" height="18"/></g>` +
    `<g fill="#4a5f7a"><rect x="308" y="110" width="18" height="14"/><rect x="340" y="110" width="18" height="14"/><rect x="372" y="110" width="18" height="14"/></g>` +
    `<rect x="330" y="130" width="16" height="16" fill="#5a4630"/>` +
    `<path d="M272,140h130v6H272z" fill="#6b6058"/>` +
    `<g fill="#4a4f58"><rect x="278" y="146" width="4" height="14"/><rect x="330" y="146" width="4" height="14"/><rect x="386" y="146" width="4" height="14"/></g>` +
    `<circle cx="290" cy="112" r="8" fill="#f0ece0"/><circle cx="290" cy="112" r="6" fill="#e8e4d8"/>` +
    `<g stroke="#3a3f47" stroke-width="1.4" fill="none"><path d="M290,112v-4M290,112l3,2"/></g>` +
    // ホームと道床
    band(146, 8, "#b8b0a0") +
    ground(154, "#9a9488") +
    `<g fill="#8a8478" opacity=".7"><circle cx="30" cy="168" r="2"/><circle cx="88" cy="180" r="2.4"/><circle cx="150" cy="196" r="2"/><circle cx="250" cy="172" r="2.2"/><circle cx="330" cy="192" r="2"/><circle cx="372" cy="164" r="2.4"/></g>` +
    // 本線と、手前で分かれる支線
    rails(176, 0, 400, 16) +
    `<g fill="#4a3a28"><path d="M18,152l8,-2 2,7 -8,2z"/><path d="M46,154l8,-2 2,7 -8,2z"/><path d="M74,157l8,-2 2,7 -8,2z"/><path d="M102,160l8,-2 2,7 -8,2z"/><path d="M130,163l9,-2 2,7 -9,2z"/><path d="M158,166l9,-2 2,7 -9,2z"/></g>` +
    `<g stroke="#b8bcc4" stroke-width="2" fill="none"><path d="M204,174L18,150M206,179L20,157"/></g>` +
    `<path d="M196,172l22,3v4l-22,-3z" fill="#c8ccd4"/>` +
    `<g fill="#c0453c"><rect x="222" y="160" width="6" height="20"/><rect x="216" y="156" width="18" height="6"/></g>` +
    // 腕木信号機
    `<rect x="258" y="112" width="4" height="64" fill="#3f434a"/>` +
    `<path d="M262,118h26l-4,7h-22z" fill="#c0453c"/>` +
    `<rect x="260" y="118" width="4" height="7" fill="#f0ece0"/>` +
    `<circle cx="260" cy="132" r="4" fill="#3f8f4f"/>` +
    pole(120, 154, 34) +
    pole(346, 154, 34) +
    `<g stroke="#6b7078" stroke-width="1" fill="none"><path d="M120,124h226"/></g>` +
    // 出発する機関車(左)
    shade(66, 186, 56, 6, ".2") +
    `<rect x="0" y="140" width="120" height="34" rx="4" fill="#2f4a3a"/>` +
    `<rect x="0" y="164" width="120" height="7" fill="#1f3a2a"/>` +
    `<rect x="88" y="124" width="30" height="18" fill="#2f4a3a"/>` +
    `<g fill="#c0453c"><rect x="0" y="156" width="120" height="4"/></g>` +
    `<g fill="#bfe0f2"><rect x="10" y="146" width="16" height="12"/><rect x="34" y="146" width="16" height="12"/><rect x="58" y="146" width="16" height="12"/><rect x="94" y="128" width="18" height="11"/></g>` +
    `<g fill="#2f2a26"><circle cx="24" cy="176" r="6"/><circle cx="62" cy="176" r="6"/><circle cx="100" cy="176" r="6"/></g>` +
    `<circle cx="118" cy="160" r="3.4" fill="#f5b31c"/>` +
    // 灯りを提げた鉄道員
    person(240, 196, 24, "#3f4a56") +
    arm(240, 182, 11, 8, "#c8a880") +
    `<rect x="250" y="188" width="2" height="7" fill="#3f434a"/><circle cx="251" cy="197" r="5" fill="#f5b31c" opacity=".85"/>`,

  /** ヒョーネフォス/オッダ/モーシューエン。滝の力で回る工場町。 */
  hydrofactory:
    sky("#8a9fb0", "#c8d0d4", 140) +
    clouds(300, 24, 1, "#c8ccc8", ".5") +
    // 左の岩山
    `<path d="M0,152V30l30,-14 26,20 34,-12 30,26 26,-10 22,26 20,-8 14,26v68z" fill="#5a6068"/>` +
    `<path d="M0,152V44l28,-12 24,18 30,-10 26,24 22,-8 20,24 18,-6 14,24v54z" fill="#4f555d"/>` +
    cracks(["M30,44l14,44-8,28", "M84,40l-8,38 14,32", "M136,60l10,36-8,26"], "#3a4048") +
    `<g fill="#e4ecf4" opacity=".8"><path d="M26,22l8,18-16,4z"/><path d="M92,20l7,16-14,4z"/></g>` +
    // 滝
    `<path d="M40,58c5,30 3,58 -6,90H20c9,-32 12,-60 8,-90z" fill="#eef4f8" opacity=".92"/>` +
    `<path d="M36,60c4,28 2,54 -5,84h-5c7,-30 9,-56 6,-84z" fill="#ffffff" opacity=".8"/>` +
    `<ellipse cx="30" cy="150" rx="20" ry="6" fill="#eef4f8" opacity=".85"/>` +
    // 導水管
    `<g fill="#8a9098"><path d="M92,52l20,-4l62,104l-18,6z"/><path d="M116,48l20,-4l62,104l-18,6z"/></g>` +
    `<g fill="#6b7078"><path d="M104,74l20,-4l3,5 -20,4z"/><path d="M120,102l20,-4l3,5 -20,4z"/><path d="M136,130l20,-4l3,5 -20,4z"/><path d="M128,70l20,-4l3,5 -20,4z"/><path d="M144,98l20,-4l3,5 -20,4z"/><path d="M160,126l20,-4l3,5 -20,4z"/></g>` +
    `<g fill="#5f5a52"><rect x="106" y="84" width="26" height="8"/><rect x="126" y="118" width="26" height="8"/></g>` +
    ground(140, "#6b6f68") +
    // 工場棟(右)
    `<rect x="234" y="106" width="166" height="44" fill="#8a8578"/>` +
    `<path d="M234,106l16,-14 16,14 16,-14 16,14 16,-14 16,14 16,-14 16,14 16,-14 16,14z" fill="#6b6860"/>` +
    `<g fill="#4a5560"><rect x="240" y="94" width="14" height="10"/><rect x="272" y="94" width="14" height="10"/><rect x="304" y="94" width="14" height="10"/><rect x="336" y="94" width="14" height="10"/><rect x="368" y="94" width="14" height="10"/></g>` +
    `<g fill="#6b6058"><rect x="244" y="118" width="20" height="14"/><rect x="276" y="118" width="20" height="14"/><rect x="340" y="118" width="20" height="14"/><rect x="372" y="118" width="20" height="14"/></g>` +
    `<path d="M300,150v-26h32v26z" fill="#2f2a26"/>` +
    `<path d="M304,150v-20h24v20z" fill="#f5b31c"/>` +
    `<path d="M308,150v-14h16v14z" fill="#e8443f"/>` +
    `<rect x="256" y="26" width="20" height="82" fill="#a89f8c"/>` +
    `<rect x="252" y="22" width="28" height="7" fill="#8a8072"/>` +
    `<g fill="#c0453c"><rect x="256" y="44" width="20" height="7"/><rect x="256" y="64" width="20" height="7"/></g>` +
    `<g fill="#c8ccc8" opacity=".6"><ellipse cx="270" cy="16" rx="16" ry="8"/><ellipse cx="292" cy="6" rx="20" ry="9"/><ellipse cx="242" cy="6" rx="13" ry="6"/></g>` +
    // 送電鉄塔
    pylon(202, 140, 88) +
    pylon(376, 106, 54, "#7a8088") +
    `<g stroke="#5f656d" stroke-width="1.4" fill="none"><path d="M186,72L370,66M218,72L392,66M186,88L370,80M218,88L392,80"/></g>` +
    // 工場の庭
    `<g fill="#5f5a52"><rect x="196" y="132" width="26" height="18" rx="2"/><rect x="226" y="136" width="20" height="14" rx="2"/></g>` +
    `<g fill="#7a4235"><ellipse cx="176" cy="146" rx="26" ry="7"/><ellipse cx="172" cy="142" rx="18" ry="5"/></g>` +
    // 水面と埠頭
    ground(150, "#7a7f78") +
    `<g stroke="#5f6560" stroke-width="1.6" opacity=".7" fill="none"><path d="M0,158h400M60,150v22M180,150v22M300,150v22"/></g>` +
    band(172, 38, "#3f6470") +
    `<g fill="#eef4f8" opacity=".55"><path d="M0,180q34,-8 68,-2t72,-2v8H0z"/></g>` +
    ripples(184, "#7fa8b8", ".4") +
    fishingBoat(272, 184, 110, "#3a3f47") +
    `<g fill="#5f5a52"><rect x="14" y="182" width="16" height="20" rx="2"/><rect x="34" y="188" width="14" height="16" rx="2"/></g>` +
    `<g stroke="#3f3a34" stroke-width="1.4" fill="none"><path d="M14,188h16M14,196h16"/></g>` +
    person(212, 168, 22, "#f5b31c") +
    arm(212, 155, 11, 7, "#f5b31c") +
    person(232, 170, 20, "#e8443f") +
    lamp(112, 172, 30, true),

  /** コングスベルグ/サンネス。ひとつの産物に賭けた小さな町。坑口と窯。 */
  crafttown:
    sky("#a8bcd0", "#e8c898", 112) +
    lowSun(320, 88, 14, "#f5c07a", "#f5d6a8") +
    clouds(86, 28, 1, "#e0d0c0", ".55") +
    hills(100, "#4a6b4a", 3, 26) +
    firRow(106, 150, 264, 7, 20, "#35563f") +
    ground(112, "#8a8064") +
    // 坑口と巻き上げ櫓(左)
    `<path d="M0,150V70c26,-10 56,-6 80,14c12,10 18,28 20,50l-4,16z" fill="#6b6f76"/>` +
    `<path d="M0,150V82c22,-8 48,-2 68,16c10,10 14,26 16,44l-2,8z" fill="#5f636a"/>` +
    cracks(["M20,86l12,28-6,20", "M58,98l-8,24 10,18"], "#494d55") +
    `<path d="M26,150v-26a17,17 0 0 1 34,0v26z" fill="#241f1c"/>` +
    `<path d="M22,124a21,21 0 0 1 42,0l-4,3a17,17 0 0 0 -34,0z" fill="#4a3c2c"/>` +
    `<g fill="#4a3c2c"><rect x="20" y="146" width="48" height="5"/><rect x="18" y="120" width="6" height="30"/><rect x="62" y="120" width="6" height="30"/></g>` +
    `<path d="M76,150L86,88h10l10,62h-9l-6,-46 -6,46z" fill="#6b5330"/>` +
    `<g stroke="#6b5330" stroke-width="2.4" fill="none"><path d="M82,124h18M84,110h14"/></g>` +
    `<circle cx="91" cy="86" r="6" fill="#4a4f58"/><circle cx="91" cy="86" r="2.6" fill="#8a8f96"/>` +
    `<path d="M91,90v20" stroke="#4a4f58" stroke-width="1.6"/>` +
    `<path d="M108,150c14,-16 34,-22 56,-14l14,14z" fill="#6b6058"/>` +
    // 町並み
    woodHouse(116, 148, 40, 26, "#c8a05a", "#3f434a") +
    woodHouse(164, 146, 38, 28, "#f0ece0", "#8a3a34") +
    woodHouse(212, 148, 36, 24, "#a83c30", "#3f434a") +
    woodHouse(256, 146, 34, 26, "#e8e0d0", "#3f434a") +
    // 窯と工房(右)
    `<rect x="300" y="112" width="96" height="38" fill="#a89f8c"/>` +
    `<path d="M294,112h108l-10,-12h-88z" fill="#6b5f52"/>` +
    `<g fill="#f5b31c"><rect x="308" y="122" width="18" height="16"/><rect x="336" y="122" width="18" height="16"/></g>` +
    `<circle cx="308" cy="122" r="16" fill="#f5b31c" opacity=".14"/>` +
    `<path d="M356,150V128a22,16 0 0 1 44,0v22z" fill="#a8543c"/>` +
    `<g stroke="#8a4230" stroke-width="1.6" opacity=".8" fill="none"><path d="M358,134h42M357,142h43"/></g>` +
    `<path d="M366,150v-14a11,8 0 0 1 22,0v14z" fill="#2f2620"/>` +
    `<path d="M370,150v-10a7,5 0 0 1 14,0v10z" fill="#f5b31c"/>` +
    `<rect x="372" y="86" width="14" height="42" fill="#8a8072"/>` +
    `<rect x="369" y="82" width="20" height="6" fill="#6b6058"/>` +
    `<g fill="#cfd4d8" opacity=".55"><ellipse cx="382" cy="74" rx="12" ry="6"/><ellipse cx="392" cy="60" rx="10" ry="5"/></g>` +
    // 水車
    `<circle cx="284" cy="134" r="17" fill="none" stroke="#5a4630" stroke-width="4"/>` +
    `<g stroke="#5a4630" stroke-width="2.4" fill="none"><path d="M284,117v34M267,134h34M272,122l24,24M296,122l-24,24"/></g>` +
    `<path d="M266,124h-16v6h16z" fill="#4a7f96"/>` +
    // 街路
    band(150, 22, "#9a9080") +
    ground(172, "#8a8072") +
    `<g stroke="#77705f" stroke-width="1.8" opacity=".7" fill="none"><path d="M0,182h400M0,198h400M40,172v38M120,172v38M280,172v38M360,172v38"/></g>` +
    // 手前:金床で打つ職人と、積んだ壺・樽
    shade(216, 200, 30, 6, ".2") +
    `<path d="M196,198v-10h40v10z" fill="#4a4f58"/>` +
    `<path d="M204,188l-4,-8h32l-4,8z" fill="#5f666e"/>` +
    person(216, 188, 26, "#7a5a3a") +
    arm(216, 172, 14, -10, "#c8a880") +
    `<rect x="228" y="158" width="14" height="5" rx="2" fill="#3a3f47"/>` +
    `<g fill="#f5b31c" opacity=".8"><circle cx="238" cy="184" r="2.4"/><circle cx="246" cy="178" r="2"/><circle cx="232" cy="176" r="1.8"/></g>` +
    `<g fill="#8a5f3a"><rect x="46" y="176" width="22" height="24" rx="3"/><rect x="72" y="182" width="18" height="18" rx="3"/></g>` +
    `<g stroke="#5a4028" stroke-width="1.6" fill="none"><path d="M46,183h22M46,192h22"/></g>` +
    `<g fill="#cfe0e8"><path d="M316,200c-3,-8 -2,-16 3,-20l-1,-5h10l-1,5c5,4 6,12 3,20z"/><path d="M340,200c-2,-6 -1,-12 2,-15l-1,-4h8l-1,4c3,3 4,9 2,15z"/></g>` +
    `<g fill="#2f6fa8"><rect x="316" y="188" width="16" height="3"/><rect x="341" y="192" width="10" height="2.4"/></g>` +
    lamp(150, 172, 28, true) +
    person(126, 176, 20, "#2f6fa8"),

  /** ハウゲスン/エーゲルスン/スヴォルヴェル。外洋に開いた漁港。 */
  openseaport:
    sky("#8fa8c0", "#cfd8dc", 98) +
    clouds(140, 26, 1, "#e8ecec", ".6") +
    clouds(330, 20, 0.8, "#e8ecec", ".55") +
    peaks(98, "#4a5260", [
      [30, 30, 46, true],
      [96, 18, 52, true],
      [166, 34, 44, false],
      [332, 26, 56, true],
      [392, 40, 42, false],
    ]) +
    band(98, 36, "#3a6f8f") +
    `<g fill="#e8eef4" opacity=".5"><rect x="24" y="108" width="18" height="3"/><rect x="70" y="118" width="22" height="3"/><rect x="128" y="110" width="16" height="3"/><rect x="196" y="122" width="24" height="3"/><rect x="262" y="112" width="18" height="3"/><rect x="320" y="124" width="22" height="3"/></g>` +
    ripples(112, "#9fd4e8", ".4") +
    // 防波堤と灯標
    `<path d="M250,132h150v10H262z" fill="#7a7f86"/>` +
    `<path d="M250,132l-12,10h24z" fill="#6b7078"/>` +
    `<g fill="#c0453c"><rect x="246" y="112" width="9" height="20"/></g>` +
    `<rect x="243" y="106" width="15" height="7" fill="#f0ece0"/>` +
    `<circle cx="250.5" cy="103" r="3" fill="#f5b31c"/>` +
    // 岸壁
    band(134, 16, "#8a8578") +
    `<g stroke="#6b6860" stroke-width="1.6" opacity=".7" fill="none"><path d="M0,142h400M40,134v16M110,134v16M190,134v16M270,134v16M350,134v16"/></g>` +
    // 干し棚(左)
    `<g stroke="#6b5330" stroke-width="3.4" fill="none"><path d="M6,134L22,74M40,134L22,74M52,134L68,74M86,134L68,74M98,134L112,78M130,134L112,78"/></g>` +
    `<g fill="#5a4630"><rect x="6" y="80" width="120" height="4"/><rect x="6" y="98" width="120" height="4"/></g>` +
    `<g fill="#b8a88c">` +
    `<path d="M14,84q5,10 0,20q-5,-10 0,-20z"/><path d="M28,84q5,10 0,20q-5,-10 0,-20z"/><path d="M42,84q5,10 0,20q-5,-10 0,-20z"/><path d="M56,84q5,10 0,20q-5,-10 0,-20z"/><path d="M70,84q5,10 0,20q-5,-10 0,-20z"/><path d="M84,84q5,10 0,20q-5,-10 0,-20z"/><path d="M98,84q5,10 0,20q-5,-10 0,-20z"/><path d="M112,84q5,10 0,20q-5,-10 0,-20z"/>` +
    `<path d="M20,102q5,10 0,20q-5,-10 0,-20z"/><path d="M36,102q5,10 0,20q-5,-10 0,-20z"/><path d="M52,102q5,10 0,20q-5,-10 0,-20z"/><path d="M68,102q5,10 0,20q-5,-10 0,-20z"/><path d="M84,102q5,10 0,20q-5,-10 0,-20z"/><path d="M100,102q5,10 0,20q-5,-10 0,-20z"/><path d="M116,102q5,10 0,20q-5,-10 0,-20z"/></g>` +
    // 赤いロルブー(右・水に脚を出す)
    `<g fill="#5a4630"><rect x="306" y="140" width="5" height="18"/><rect x="330" y="140" width="5" height="18"/><rect x="356" y="140" width="5" height="18"/><rect x="382" y="140" width="5" height="18"/></g>` +
    woodHouse(300, 140, 44, 30, "#a8382e", "#3f434a") +
    woodHouse(352, 140, 44, 26, "#a8382e", "#3f434a") +
    // 漁船
    fishingBoat(126, 128, 118, "#2f4a5f") +
    fishingBoat(258, 130, 74, "#f0ece0") +
    // 手前の岸壁
    ground(150, "#7f7a70") +
    `<g stroke="#6b665e" stroke-width="1.8" opacity=".65" fill="none"><path d="M0,166h400M0,186h400M60,150v60M170,150v60M290,150v60"/></g>` +
    // 網の山・木箱・ブイ
    `<g fill="#3f7f5f"><ellipse cx="52" cy="184" rx="42" ry="20"/><ellipse cx="44" cy="176" rx="30" ry="13"/></g>` +
    `<g stroke="#2f6f4f" stroke-width="1.4" opacity=".8" fill="none"><path d="M16,176q36,-8 70,4M14,188q40,-8 78,6M22,196q34,-6 64,4"/></g>` +
    `<g fill="#e8843a"><circle cx="24" cy="164" r="7"/><circle cx="82" cy="168" r="6"/></g>` +
    `<g fill="#c8b48a"><rect x="316" y="170" width="34" height="20"/><rect x="352" y="176" width="30" height="18"/><rect x="326" y="190" width="34" height="18"/></g>` +
    `<g stroke="#a8926a" stroke-width="1.6" fill="none"><path d="M316,178h34M352,183h30M326,198h34"/></g>` +
    fish(334, 166, 1) +
    fish(352, 170, 0.8) +
    // 網を引く漁師
    shade(206, 200, 26, 5, ".18") +
    person(198, 196, 26, "#f5b31c") +
    arm(198, 180, 14, -8, "#f5b31c") +
    `<path d="M212,172q16,4 26,18" stroke="#3f7f5f" stroke-width="2.4" fill="none"/>` +
    `<path d="M212,172q22,10 26,30" stroke="#3f7f5f" stroke-width="2" fill="none"/>` +
    person(232, 200, 23, "#8a3a34") +
    `<g fill="#5f666e"><rect x="146" y="176" width="9" height="26" rx="2"/></g>` +
    gull(150, 48, 1.2) +
    gull(216, 34, 1) +
    gull(276, 56, 0.9) +
    gull(66, 42, 1),

  /**
   * ヴォス/ボードー。**線路はここで終わる。**車止めの先には何も無い。
   * この盤面の芯を受け持つ絵。
   */
  railterminus:
    sky("#8fb0cc", "#dce6ea", 96) +
    clouds(78, 22, 0.9, "#e8eef2", ".65") +
    clouds(300, 18, 0.7, "#e8eef2", ".55") +
    peaks(96, "#7f909c", [
      [30, 40, 54, true],
      [116, 30, 58, true],
      [206, 44, 50, true],
    ]) +
    `<g fill="#a8b6c0" opacity=".7"><path d="M240,96c30,-14 66,-18 100,-12l60,12z"/></g>` +
    band(90, 12, "#c0ccd4") +
    ground(102, "#8a9080") +
    `<g fill="#dfe8ee" opacity=".75"><path d="M0,118q40,-10 84,-2t76,-2v10H0z"/><path d="M244,124q46,-10 88,0t68,-4v12H244z"/></g>` +
    firRow(108, 6, 78, 5, 20, "#2a4a36") +
    // 駅舎(左)
    `<rect x="0" y="98" width="118" height="48" fill="#c8a05a"/>` +
    `<path d="M-4,98h126l-10,-14H6z" fill="#3f434a"/>` +
    `<rect x="-4" y="96" width="126" height="4" fill="#f0ece0"/>` +
    `<g fill="#f0ece0"><rect x="8" y="106" width="24" height="18"/><rect x="42" y="106" width="24" height="18"/><rect x="76" y="106" width="24" height="18"/></g>` +
    `<g fill="#4a5f7a"><rect x="10" y="108" width="20" height="14"/><rect x="44" y="108" width="20" height="14"/><rect x="78" y="108" width="20" height="14"/></g>` +
    `<rect x="34" y="128" width="18" height="18" fill="#5a4630"/>` +
    `<circle cx="86" cy="134" r="9" fill="#f0ece0"/><circle cx="86" cy="134" r="7" fill="#e8e4d8"/>` +
    `<g stroke="#3a3f47" stroke-width="1.4" fill="none"><path d="M86,134v-5M86,134l4,2"/></g>` +
    `<path d="M0,146h140v7H0z" fill="#b8b0a0"/>` +
    `<g fill="#4a4f58"><rect x="126" y="153" width="4" height="12"/></g>` +
    lamp(110, 146, 30) +
    person(58, 152, 22, "#e8443f") +
    person(76, 152, 20, "#2f6fa8") +
    `<g fill="#8a5f3a"><rect x="94" y="136" width="18" height="10" rx="2"/></g>` +
    // 道床と線路(左から来て、途中で終わる)
    `<path d="M0,158h240l-6,52H0z" fill="#9a9488"/>` +
    `<g fill="#8a8478" opacity=".8"><circle cx="26" cy="172" r="2.2"/><circle cx="84" cy="192" r="2.4"/><circle cx="150" cy="176" r="2"/><circle cx="196" cy="200" r="2.2"/></g>` +
    rails(194, 0, 214, 16) +
    // 車止め。**影の楕円(y=169)より下に置く。**ここが隠れると盤面の芯が消える
    shade(202, 208, 36, 6, ".22") +
    `<g fill="#4a4f58"><rect x="180" y="182" width="9" height="26"/><rect x="212" y="182" width="9" height="26"/></g>` +
    `<rect x="170" y="172" width="62" height="12" fill="#c0453c"/>` +
    `<g fill="#f0ece0"><rect x="181" y="172" width="11" height="12"/><rect x="204" y="172" width="11" height="12"/></g>` +
    `<g fill="#3a3f47"><circle cx="183" cy="191" r="6.4"/><circle cx="219" cy="191" r="6.4"/></g>` +
    `<g fill="#8a8f96"><circle cx="183" cy="191" r="2.6"/><circle cx="219" cy="191" r="2.6"/></g>` +
    // 車止めの先:何も無い原野
    `<path d="M238,158c42,-6 88,-6 126,2l36,4v46H232z" fill="#8a9080"/>` +
    `<g fill="#7a8072"><path d="M248,180q34,-10 70,-2t82,-2v12H248z"/></g>` +
    `<g fill="#6b7566"><ellipse cx="286" cy="172" rx="14" ry="5"/><ellipse cx="344" cy="182" rx="16" ry="6"/><ellipse cx="386" cy="168" rx="12" ry="4"/></g>` +
    `<g stroke="#6b6558" stroke-width="1.6" fill="none"><path d="M262,166l-3,-9 5,-4M262,166l5,-8 6,3M320,192l-4,-10 6,-4M320,192l6,-9 7,3"/></g>` +
    `<g fill="#dfe8ee" opacity=".8"><path d="M300,204q44,-12 100,-4v10H300z"/></g>` +
    // 終わってしまう電信柱の列
    pole(40, 158, 34) +
    pole(112, 158, 32) +
    pole(178, 158, 30) +
    pole(244, 160, 28) +
    `<g stroke="#6b7078" stroke-width="1" fill="none"><path d="M40,128h204M40,132h204"/></g>` +
    `<g stroke="#6b7078" stroke-width="1" opacity=".5" fill="none"><path d="M244,132l14,10"/></g>` +
    // 北を見る保線員と、低い柵
    person(318, 200, 24, "#3f4a56") +
    arm(318, 186, 12, 6, "#c8a880") +
    `<g fill="#6b5330"><rect x="352" y="182" width="4" height="20"/><rect x="382" y="184" width="4" height="20"/><rect x="350" y="188" width="40" height="3"/><rect x="350" y="196" width="40" height="3"/></g>` +
    gull(266, 52, 1) +
    gull(340, 40, 0.8),

  /** ミルダル/ガイロ。木の生えない高地の駅と、線路を覆う防雪の廊下。 */
  mountainstation:
    sky("#7fa8cc", "#cfe0ea", 104) +
    clouds(240, 22, 0.9, "#eef2f4", ".6") +
    `<g fill="#c8d6e2"><path d="M0,88c40,-16 88,-22 138,-16c46,6 96,4 148,-6l114,-16v38z"/></g>` +
    `<g fill="#dfe8f0"><path d="M0,96c44,-14 94,-18 142,-12c44,6 92,4 142,-6l116,-14v32z"/></g>` +
    `<g fill="#7a7a68"><ellipse cx="42" cy="90" rx="22" ry="7"/><ellipse cx="150" cy="84" rx="26" ry="7"/><ellipse cx="300" cy="80" rx="24" ry="6"/></g>` +
    ground(104, "#e2e8ee") +
    `<g fill="#8a8878" opacity=".8"><path d="M0,124q40,-12 82,-4t70,-6 84,4 92,-8 72,2v14H0z"/></g>` +
    `<g fill="#dfe8f0"><path d="M0,132q48,-10 96,0t100,-6 104,6 100,-6v16H0z"/></g>` +
    `<g fill="#6b6f60"><ellipse cx="30" cy="128" rx="14" ry="5"/><ellipse cx="120" cy="134" rx="12" ry="4"/><ellipse cx="272" cy="130" rx="15" ry="5"/><ellipse cx="358" cy="126" rx="12" ry="4"/></g>` +
    // 赤い小さな駅舎(左)
    woodHouse(10, 146, 76, 34, "#a83c30", "#3f434a") +
    `<path d="M4,146h96v6H4z" fill="#b8b0a0"/>` +
    `<g fill="#4a4f58"><rect x="92" y="152" width="4" height="12"/></g>` +
    lamp(92, 146, 26) +
    person(56, 152, 21, "#2f4a6f") +
    `<g fill="#8a5f3a"><rect x="66" y="138" width="16" height="9" rx="2"/></g>` +
    // 防雪の廊下(右へ延び、線路を飲み込む)
    `<path d="M124,152V126l142,-16 134,-6v48z" fill="#7a5f42"/>` +
    `<path d="M120,126L266,108l134,-6v9L266,117L124,134z" fill="#5f4832"/>` +
    `<g stroke="#5f4832" stroke-width="2" opacity=".85" fill="none"><path d="M150,152v-25M180,152v-28M210,152v-31M240,152v-34M270,152v-36M300,152v-38M330,152v-39M360,152v-40M390,152v-41"/></g>` +
    `<g stroke="#6b5238" stroke-width="1.6" opacity=".7" fill="none"><path d="M126,140L400,120M126,146L400,128"/></g>` +
    `<path d="M124,152V128l30,-4v28z" fill="#2f2820"/>` +
    // 線路
    band(152, 20, "#8a8578") +
    rails(166, 0, 400, 16) +
    pole(66, 152, 32) +
    pole(112, 152, 30) +
    `<g stroke="#6b7078" stroke-width="1" fill="none"><path d="M66,124h46"/></g>` +
    `<g fill="#dfe8f0"><path d="M60,152q8,-10 16,0z"/><path d="M106,152q8,-10 16,0z"/></g>` +
    // 手前:風紋の雪原とケルン
    ground(172, "#e8eef4") +
    `<g stroke="#c4d4e2" stroke-width="3" opacity=".85" fill="none"><path d="M0,182q80,-12 160,0t240,-6"/><path d="M0,196q90,-10 180,2t220,-8"/><path d="M0,208q100,-10 200,0t200,-6"/></g>` +
    shade(216, 198, 22, 5, ".16") +
    cairn(216, 196, 34) +
    `<g fill="#7a7f86"><ellipse cx="42" cy="192" rx="18" ry="7"/><ellipse cx="352" cy="200" rx="20" ry="8"/></g>` +
    `<g fill="#8a8f96"><ellipse cx="38" cy="188" rx="12" ry="5"/><ellipse cx="346" cy="196" rx="13" ry="5"/></g>` +
    // スキーの2人
    personCap(308, 192, 23, "#e8443f") +
    arm(308, 178, 11, 8, "#e8443f") +
    `<path d="M319,186v-24" stroke="#5a4630" stroke-width="2"/>` +
    `<path d="M292,192h34" stroke="#f5b31c" stroke-width="3" stroke-linecap="round"/>` +
    personCap(336, 198, 21, "#2f6fa8", "#f5b31c") +
    `<path d="M322,198h30" stroke="#2f6fa8" stroke-width="3" stroke-linecap="round"/>`,

  /** スタインシェル/ナムソス/フォウスケ。川沿いの農地と赤い納屋。 */
  ruralvalley:
    sky("#8fc4e8", "#dce6ea", 112) +
    clouds(96, 26) +
    clouds(310, 22, 0.9) +
    peaks(92, "#7f96a0", [
      [46, 34, 58, true],
      [156, 26, 62, true],
      [268, 38, 54, false],
      [370, 30, 58, true],
    ]) +
    `<g fill="#3f6b4a"><path d="M0,92c46,-14 100,-18 152,-10l-8,10z"/><path d="M400,92c-46,-16 -102,-18 -156,-8l8,8z"/></g>` +
    firRow(112, 4, 130, 9, 26, "#2a4a36") +
    firRow(112, 262, 396, 9, 24, "#2a4a36") +
    band(112, 18, "#4a8fa8") +
    ripples(118, "#bfe8f4", ".45") +
    ground(130, "#7f9a4f") +
    // 農場(左)
    woodHouse(4, 152, 66, 36, "#a83c30", "#3f434a") +
    `<path d="M70,152v-18h24v18z" fill="#8a3a34"/><path d="M66,134h32l-16,-11z" fill="#3f434a"/>` +
    woodHouse(100, 152, 44, 26, "#f0ece0", "#3f434a") +
    `<path d="M0,152h150l-6,8H0z" fill="#6b7a4a"/>` +
    `<path d="M62,152l22,-12h14v12z" fill="#6b5330"/>` +
    // 白い教会(右)
    `<rect x="316" y="120" width="46" height="30" fill="#f0ece0"/>` +
    `<path d="M310,120h58l-29,-14z" fill="#3f434a"/>` +
    `<rect x="330" y="86" width="18" height="34" fill="#f0ece0"/>` +
    `<path d="M326,86L339,58l13,28z" fill="#3f434a"/>` +
    `<path d="M339,58v-7M336,54h6" stroke="#3f434a" stroke-width="2"/>` +
    `<g fill="#5f7f96"><rect x="324" y="128" width="9" height="14"/><rect x="344" y="128" width="9" height="14"/><rect x="334" y="96" width="9" height="12"/></g>` +
    `<path d="M300,150c14,-10 40,-14 68,-10l32,10z" fill="#6b8a4a"/>` +
    // 畑の畝
    band(150, 12, "#8fa855") +
    band(162, 12, "#a8b45f") +
    band(174, 14, "#c8b46a") +
    `<g stroke="#7f9448" stroke-width="1.6" opacity=".7" fill="none"><path d="M0,156h400M0,168h400"/></g>` +
    `<g stroke="#a89050" stroke-width="1.6" opacity=".7" fill="none"><path d="M0,180h400M0,186h400"/></g>` +
    ground(188, "#6b8a4a") +
    // ヘシャ(干し草の柵)
    `<g fill="#6b5330"><rect x="4" y="150" width="4" height="30"/><rect x="44" y="150" width="4" height="30"/><rect x="84" y="150" width="4" height="30"/><rect x="124" y="150" width="4" height="30"/></g>` +
    `<g fill="#d8b45a"><path d="M4,154h124v7H4z"/><path d="M4,164h124v7H4z"/></g>` +
    `<g stroke="#b8933c" stroke-width="1.2" opacity=".8" fill="none"><path d="M12,154v7M28,154v7M60,154v7M76,154v7M100,154v7M116,154v7M20,164v7M52,164v7M92,164v7M120,164v7"/></g>` +
    `<g fill="#6b5330"><rect x="266" y="152" width="4" height="30"/><rect x="310" y="152" width="4" height="30"/><rect x="356" y="152" width="4" height="30"/><rect x="396" y="152" width="4" height="30"/></g>` +
    `<g fill="#d8b45a"><path d="M266,156h134v7H266z"/><path d="M266,166h134v7H266z"/></g>` +
    `<g stroke="#b8933c" stroke-width="1.2" opacity=".8" fill="none"><path d="M280,156v7M296,156v7M330,156v7M346,156v7M374,156v7M288,166v7M320,166v7M366,166v7"/></g>` +
    // 手前中央のヘシャと家畜
    `<g fill="#6b5330"><rect x="168" y="164" width="5" height="34"/><rect x="212" y="164" width="5" height="34"/><rect x="248" y="164" width="5" height="34"/></g>` +
    `<g fill="#d8b45a"><path d="M168,170h85v9h-85z"/><path d="M168,182h85v9h-85z"/></g>` +
    `<g stroke="#b8933c" stroke-width="1.4" opacity=".8" fill="none"><path d="M182,170v9M196,170v9M228,170v9M240,170v9M176,182v9M204,182v9M234,182v9"/></g>` +
    // 牛
    shade(70, 200, 26, 5, ".16") +
    `<ellipse cx="64" cy="190" rx="24" ry="11" fill="#f0ece0"/>` +
    `<g fill="#3a3228"><ellipse cx="52" cy="186" rx="9" ry="6"/><ellipse cx="76" cy="194" rx="7" ry="5"/></g>` +
    `<g fill="#f0ece0"><rect x="46" y="190" width="6" height="12"/><rect x="58" y="190" width="6" height="12"/><rect x="72" y="190" width="6" height="12"/><rect x="82" y="190" width="6" height="12"/></g>` +
    `<path d="M86,186l14,-6 5,7 -13,7z" fill="#f0ece0"/>` +
    `<g fill="#3a3228"><circle cx="98" cy="182" r="1.6"/></g>` +
    `<g stroke="#c8b48a" stroke-width="2" fill="none"><path d="M96,176l4,-6M102,178l6,-4"/></g>` +
    // 農夫
    person(318, 200, 24, "#2f5f8f") +
    arm(318, 186, 12, 8, "#c8a880") +
    `<path d="M330,192l16,-18" stroke="#6b5330" stroke-width="2.6" stroke-linecap="round"/>` +
    `<path d="M344,174l10,4" stroke="#8a8f96" stroke-width="3" stroke-linecap="round"/>` +
    pole(160, 152, 34) +
    pole(292, 152, 32),

  /** リレハンメル/レーヴァンゲル/レーロス。移築・保存された木造の町並み。冬。 */
  woodentown:
    sky("#a8bcd0", "#e4dcd0", 108) +
    clouds(120, 26, 1, "#e8e4dc", ".55") +
    hills(96, "#5f6b64", 3, 24) +
    `<g fill="#dfe8f0" opacity=".8"><path d="M20,96c16,-12 40,-14 58,-6l6,6z"/><path d="M250,96c18,-12 44,-14 62,-4l4,4z"/></g>` +
    firRow(104, 150, 254, 7, 22, "#2a3f30") +
    ground(108, "#e6ecf2") +
    `<g fill="#cfdae6" opacity=".7"><path d="M0,132q60,-12 122,-2t152,-6 126,4v18H0z"/></g>` +
    // 左の家並み
    logHouse(0, 150, 62, 40, "#6b4630") +
    logHouse(66, 150, 54, 34, "#7a4a34") +
    logHouse(122, 150, 46, 30, "#5f4a38") +
    `<g fill="#e8eef4"><path d="M-6,110h74l-6,-5H0z"/><path d="M60,116h66l-5,-5H65z"/><path d="M116,122h58l-5,-5h-48z"/></g>` +
    `<g fill="#f5b31c"><rect x="14" y="122" width="11" height="12"/><rect x="80" y="128" width="10" height="11"/><rect x="132" y="132" width="9" height="10"/></g>` +
    `<g fill="#8a8072"><rect x="34" y="96" width="9" height="16"/><rect x="94" y="102" width="8" height="15"/></g>` +
    `<g fill="#cfd4d8" opacity=".55"><ellipse cx="38" cy="88" rx="9" ry="5"/><ellipse cx="44" cy="74" rx="7" ry="4"/><ellipse cx="98" cy="94" rx="8" ry="4.4"/><ellipse cx="104" cy="82" rx="6" ry="3.4"/></g>` +
    // 右の家並み
    logHouse(252, 150, 56, 36, "#b8863c") +
    logHouse(312, 150, 50, 32, "#6b6054") +
    logHouse(364, 150, 44, 28, "#7a4a34") +
    `<g fill="#e8eef4"><path d="M246,114h68l-5,-5h-58z"/><path d="M306,120h62l-5,-5h-52z"/><path d="M358,126h54l-5,-5h-44z"/></g>` +
    `<g fill="#f5b31c"><rect x="264" y="126" width="11" height="12"/><rect x="324" y="132" width="10" height="11"/><rect x="374" y="136" width="9" height="10"/></g>` +
    `<g fill="#8a8072"><rect x="280" y="100" width="9" height="16"/><rect x="336" y="106" width="8" height="15"/></g>` +
    `<g fill="#cfd4d8" opacity=".55"><ellipse cx="284" cy="92" rx="9" ry="5"/><ellipse cx="290" cy="78" rx="7" ry="4"/><ellipse cx="340" cy="98" rx="8" ry="4.4"/></g>` +
    // 中央の柵と薪
    `<g fill="#5a4630"><rect x="172" y="130" width="4" height="22"/><rect x="200" y="130" width="4" height="22"/><rect x="228" y="130" width="4" height="22"/><rect x="170" y="134" width="64" height="3.4"/><rect x="170" y="144" width="64" height="3.4"/></g>` +
    // 雪の街路
    ground(150, "#dfe6ee") +
    `<g stroke="#c0cfdc" stroke-width="3.4" opacity=".9" fill="none"><path d="M0,172q90,-12 180,0t220,-8"/><path d="M0,186q100,-12 200,2t200,-10"/></g>` +
    `<g fill="#c8d6e2"><ellipse cx="98" cy="196" rx="30" ry="8"/><ellipse cx="300" cy="200" rx="26" ry="7"/></g>` +
    // 橇を引く馬(手前中央)
    shade(210, 202, 56, 6, ".2") +
    `<g fill="#8a5f3a"><rect x="176" y="176" width="80" height="8" rx="2"/><rect x="180" y="184" width="5" height="14"/><rect x="246" y="184" width="5" height="14"/></g>` +
    `<g fill="#7a5533"><rect x="182" y="164" width="68" height="7" rx="2"/><rect x="186" y="158" width="60" height="6" rx="2"/><rect x="190" y="152" width="52" height="6" rx="2"/></g>` +
    `<g stroke="#5a4028" stroke-width="1.6" fill="none"><path d="M182,167h68M186,161h60"/></g>` +
    `<path d="M176,180q-14,4 -26,12" stroke="#5a4630" stroke-width="2.4" fill="none"/>` +
    `<ellipse cx="126" cy="176" rx="24" ry="11" fill="#5f4632"/>` +
    `<g fill="#5f4632"><rect x="110" y="176" width="6" height="16"/><rect x="120" y="176" width="6" height="16"/><rect x="134" y="176" width="6" height="16"/><rect x="144" y="176" width="6" height="16"/></g>` +
    `<path d="M104,172l-12,-12 8,-5 14,13z" fill="#5f4632"/>` +
    `<path d="M92,160l-8,-4 2,-5 9,4z" fill="#6b4f38"/>` +
    `<g fill="#241f1c"><circle cx="94" cy="159" r="1.6"/></g>` +
    `<path d="M108,166l6,-10" stroke="#3a2f24" stroke-width="2.4"/>` +
    // 人と薪の山
    personCap(52, 196, 24, "#2f4a6f") +
    personCap(72, 198, 22, "#8a3a34", "#f5b31c") +
    `<g fill="#6b5330"><rect x="326" y="176" width="58" height="24"/></g>` +
    `<g fill="#8a6b42"><circle cx="332" cy="182" r="4"/><circle cx="344" cy="182" r="4"/><circle cx="356" cy="182" r="4"/><circle cx="368" cy="182" r="4"/><circle cx="380" cy="182" r="4"/><circle cx="338" cy="192" r="4"/><circle cx="350" cy="192" r="4"/><circle cx="362" cy="192" r="4"/><circle cx="374" cy="192" r="4"/></g>` +
    `<path d="M320,172h70l-6,-6h-58z" fill="#e8eef4"/>` +
    lamp(160, 156, 32, true) +
    lamp(292, 158, 30, true),

  /**
   * ハルデン/モー・イ・ラーナ/ナルヴィク。占領期の記憶にあてた場面。
   * **重い題材。**残酷な場面は描かず、雪の中の線路・標石・記念碑という構造だけで示す。
   */
  wwiimemorial:
    sky("#5f6f80", "#b0bcc4", 118) +
    clouds(210, 28, 1.2, "#98a4ac", ".5") +
    `<g fill="#40505c"><path d="M0,96c50,-20 108,-26 160,-16l-8,16z"/><path d="M400,96c-48,-22 -106,-24 -158,-14l8,14z"/></g>` +
    firRow(120, 0, 132, 9, 34, "#22322a") +
    firRow(118, 244, 400, 10, 30, "#22322a") +
    `<g fill="#2a3a30"><path d="M96,118c14,-10 34,-12 52,-6l6,6z"/></g>` +
    ground(118, "#dfe6ec") +
    drifts(128, "#c4d2de", ".6") +
    // 雪の中の線路(森から出て手前へ)
    `<path d="M108,124c22,10 40,26 56,46c18,22 42,36 76,40h-64c-32,-8 -54,-24 -70,-44c-14,-18 -28,-30 -46,-36z" fill="#c8d4de"/>` +
    `<g fill="#4a4038" opacity=".9"><path d="M112,128l12,-4 4,8 -12,4z"/><path d="M126,140l12,-4 5,8 -13,4z"/><path d="M142,152l13,-4 5,9 -13,4z"/><path d="M160,164l13,-4 6,9 -14,4z"/><path d="M180,176l14,-4 6,9 -14,4z"/><path d="M204,186l14,-3 5,9 -14,3z"/><path d="M230,194l15,-3 4,10 -15,3z"/></g>` +
    `<g stroke="#8a8f96" stroke-width="2.2" fill="none"><path d="M112,128c26,12 48,32 66,52c16,18 38,30 66,34M120,124c26,12 50,32 68,52c16,18 38,30 66,34"/></g>` +
    // 左:雪の中に並ぶ標石
    `<g fill="#8a939c"><path d="M14,166v-22a9,9 0 0 1 18,0v22z"/><path d="M46,170v-19a8,8 0 0 1 16,0v19z"/><path d="M74,173v-17a7,7 0 0 1 14,0v17z"/><path d="M98,176v-15a6,6 0 0 1 12,0v15z"/></g>` +
    `<g fill="#77808a"><path d="M23,166v-31a9,9 0 0 0 -9,9v22z"/><path d="M54,170v-27a8,8 0 0 0 -8,8v19z"/><path d="M81,173v-24a7,7 0 0 0 -7,7v17z"/></g>` +
    `<g fill="#eef2f6"><path d="M14,146a9,9 0 0 1 18,0z"/><path d="M46,153a8,8 0 0 1 16,0z"/><path d="M74,158a7,7 0 0 1 14,0z"/><path d="M98,163a6,6 0 0 1 12,0z"/></g>` +
    `<g fill="#c0cdd8"><ellipse cx="23" cy="167" rx="14" ry="4"/><ellipse cx="54" cy="171" rx="12" ry="3.4"/><ellipse cx="81" cy="174" rx="10" ry="3"/><ellipse cx="104" cy="177" rx="9" ry="3"/></g>` +
    // 右:記念碑
    shade(330, 192, 40, 6, ".16") +
    `<rect x="290" y="180" width="80" height="10" fill="#6b7078"/>` +
    `<rect x="298" y="172" width="64" height="9" fill="#77808a"/>` +
    `<path d="M310,172V108a20,20 0 0 1 40,0v64z" fill="#8a939c"/>` +
    `<path d="M310,172V108a20,20 0 0 1 20,-20v84z" fill="#9aa3ac"/>` +
    `<path d="M310,110a20,20 0 0 1 40,0l-4,2a16,16 0 0 0 -32,0z" fill="#eef2f6"/>` +
    `<g stroke="#6b7078" stroke-width="2" fill="none"><path d="M330,124v30M318,136h24"/></g>` +
    `<circle cx="330" cy="176" r="15" fill="none" stroke="#2f5f3f" stroke-width="4.4"/>` +
    `<g fill="#2f5f3f"><circle cx="318" cy="168" r="3.4"/><circle cx="342" cy="169" r="3"/><circle cx="330" cy="162" r="3.2"/></g>` +
    `<g fill="#8a3a34"><circle cx="330" cy="161" r="2.2"/></g>` +
    // 静かに立つ2人
    personCap(276, 190, 24, "#3a4450", "#4a5560") +
    personCap(258, 192, 22, "#4a4038", "#5a5048") +
    // 手前:雪の上に置かれた小さな花束
    ground(196, "#e8eef4") +
    `<g stroke="#c0cdd8" stroke-width="2.6" opacity=".8" fill="none"><path d="M0,202q100,-8 200,2t200,-6"/></g>` +
    `<g><path d="M186,190l24,-6 4,8 -24,6z" fill="#2f5f3f"/>` +
    `<circle cx="208" cy="184" r="3.4" fill="#8a3a34"/><circle cx="216" cy="186" r="3" fill="#8a3a34"/><circle cx="212" cy="179" r="2.8" fill="#a8443c"/></g>` +
    `<g fill="#3a4450"><path d="M62,84q4,-4 8,0M96,72q4,-4 8,0M148,64q4,-4 8,0"/></g>` +
    gull(64, 84, 0.9) +
    gull(140, 68, 0.8),

  /**
   * ハンメルフェスト/ホニングスヴォーグ/アルタ。焦土作戦のあと建て直された町。
   * **同じ理由で同じ姿になった。**似た形の家が並ぶこと自体が語る内容。
   */
  scorchedearth:
    sky("#7f94a8", "#e0c8a8", 108) +
    lowSun(58, 92, 13, "#f5b06a", "#f5c890") +
    clouds(300, 26, 1, "#c8bcb0", ".5") +
    `<g fill="#6b7480"><path d="M0,100c44,-22 96,-28 148,-18l-8,18z"/><path d="M400,100c-44,-24 -100,-26 -152,-14l10,14z"/></g>` +
    `<g fill="#dfe8f0" opacity=".8"><path d="M28,96c14,-12 36,-14 52,-6l6,6z"/><path d="M282,96c16,-12 40,-14 56,-4l4,4z"/></g>` +
    band(108, 22, "#3f6478") +
    ripples(114, "#7fa8bc", ".4") +
    band(130, 10, "#8a8578") +
    `<g fill="#5a4630"><rect x="30" y="140" width="4" height="12"/><rect x="90" y="140" width="4" height="12"/><rect x="300" y="140" width="4" height="12"/><rect x="360" y="140" width="4" height="12"/></g>` +
    // 建て直された家:同じ幅・同じ屋根・同じ窓割りが並ぶ
    woodHouse(0, 140, 48, 32, "#c8bca8", "#5f646c", "#eef2f6") +
    woodHouse(52, 140, 48, 32, "#a8b0b4", "#5f646c", "#eef2f6") +
    woodHouse(104, 140, 48, 32, "#b8a898", "#5f646c", "#eef2f6") +
    woodHouse(156, 140, 48, 32, "#9aa8ac", "#5f646c", "#eef2f6") +
    woodHouse(208, 140, 48, 32, "#c8bca8", "#5f646c", "#eef2f6") +
    woodHouse(260, 140, 48, 32, "#a8b0b4", "#5f646c", "#eef2f6") +
    woodHouse(312, 140, 48, 32, "#b8a898", "#5f646c", "#eef2f6") +
    // 一軒だけ残った古い木造の教会(右端)
    `<rect x="366" y="118" width="34" height="22" fill="#5f4a38"/>` +
    `<path d="M362,118h42l-21,-12z" fill="#3a3228"/>` +
    `<rect x="376" y="88" width="14" height="30" fill="#5f4a38"/>` +
    `<path d="M372,88L383,64l11,24z" fill="#3a3228"/>` +
    `<path d="M383,64v-8M379,60h8" stroke="#3a3228" stroke-width="2"/>` +
    `<g fill="#4a5560"><rect x="372" y="124" width="8" height="12"/><rect x="388" y="124" width="8" height="12"/><rect x="379" y="96" width="8" height="10"/></g>` +
    // 雪の街路
    ground(140, "#dfe6ec") +
    drifts(152, "#c4d2de", ".55") +
    // 焼け残った基礎と、一本だけ立つ煙突(左手前)
    `<g stroke="#8a939c" stroke-width="3" fill="none"><path d="M4,196h64v-20H4z"/><path d="M18,176v20M44,176v20"/></g>` +
    `<g stroke="#8a939c" stroke-width="2.6" fill="none"><path d="M84,206h50v-16H84z"/></g>` +
    `<g fill="#c4d2de"><rect x="4" y="192" width="64" height="4"/><rect x="84" y="202" width="50" height="4"/></g>` +
    `<rect x="30" y="146" width="16" height="32" fill="#7a6f66"/>` +
    `<rect x="27" y="142" width="22" height="6" fill="#6b6058"/>` +
    `<g fill="#8a8078"><rect x="30" y="156" width="16" height="3"/><rect x="30" y="166" width="16" height="3"/></g>` +
    // 手前:雪の道を歩く人と、荷車
    `<g stroke="#c0cdd8" stroke-width="3" opacity=".85" fill="none"><path d="M0,182q100,-10 200,2t200,-8"/><path d="M0,200q110,-10 210,2t190,-8"/></g>` +
    personCap(216, 196, 24, "#3a4450", "#8a3a34") +
    arm(216, 182, 11, 7, "#3a4450") +
    personCap(238, 198, 21, "#5f5348", "#4a5560") +
    `<g fill="#6b5330"><rect x="298" y="176" width="56" height="16" rx="2"/><rect x="292" y="184" width="10" height="4"/></g>` +
    `<g fill="#3a3228"><circle cx="310" cy="194" r="6"/><circle cx="344" cy="194" r="6"/></g>` +
    `<g fill="#c8b48a"><rect x="304" y="166" width="20" height="12"/><rect x="328" y="168" width="20" height="10"/></g>` +
    lamp(160, 148, 30, true) +
    lamp(276, 148, 30, true) +
    gull(190, 62, 1) +
    gull(246, 46, 0.8),

  /** クリスチャンサン/アーレンダル。碁盤目の白い町と、停泊する帆船隊。 */
  southport:
    sky("#8fc4e8", "#e8e4d0", 100) +
    sun(72, 34, 17, "#f5d06a") +
    clouds(250, 26, 1) +
    clouds(340, 20, 0.8) +
    `<g fill="#6b7f6a"><path d="M0,100c26,-10 56,-12 82,-6l6,6z"/><path d="M180,100c18,-8 42,-8 60,-2l4,2z"/><path d="M330,100c20,-9 46,-9 66,-2l4,2z"/></g>` +
    band(100, 26, "#3f8fa8") +
    ripples(108, "#bfe8f4", ".45") +
    // 対岸:碁盤目の白い町
    band(122, 26, "#8a9a6a") +
    woodHouse(0, 128, 40, 24, "#f0ece0", "#4a4a52") +
    woodHouse(46, 126, 38, 26, "#f0ece0", "#8a3a34") +
    woodHouse(90, 128, 36, 22, "#e8e4d8", "#4a4a52") +
    woodHouse(132, 126, 38, 26, "#f0ece0", "#4a4a52") +
    woodHouse(176, 128, 36, 22, "#f0ece0", "#8a3a34") +
    woodHouse(218, 126, 38, 26, "#e8e4d8", "#4a4a52") +
    woodHouse(262, 128, 36, 22, "#f0ece0", "#4a4a52") +
    `<g fill="#a89f8c"><rect x="40" y="112" width="7" height="16"/><rect x="126" y="112" width="7" height="16"/><rect x="212" y="112" width="7" height="16"/><rect x="298" y="112" width="7" height="16"/></g>` +
    `<g fill="#a89f8c"><rect x="0" y="118" width="306" height="5"/></g>` +
    `<rect x="150" y="96" width="16" height="30" fill="#f0ece0"/><path d="M146,96L158,72l12,24z" fill="#4a4a52"/><path d="M158,72v-6" stroke="#4a4a52" stroke-width="2"/>` +
    // 帆船隊(右)
    `<path d="M266,132h124l-14,16H278z" fill="#3a2f24"/>` +
    `<rect x="266" y="126" width="124" height="7" fill="#c8a05a"/>` +
    `<g fill="#5a4630"><rect x="292" y="44" width="4" height="84"/><rect x="328" y="34" width="4" height="94"/><rect x="364" y="50" width="4" height="78"/></g>` +
    `<g fill="#f0ece0"><path d="M296,52h30v22h-30z"/><path d="M296,80h30v20h-30z"/><path d="M332,42h30v24h-30z"/><path d="M332,72h30v22h-30z"/><path d="M368,58h26v20h-26z"/></g>` +
    `<g fill="#e0dccc"><path d="M262,60h28v20h-28z"/><path d="M262,86h28v18h-28z"/></g>` +
    `<g stroke="#5a4630" stroke-width="1.2" fill="none"><path d="M294,44l-32,84M294,44l40,84M330,34l-38,94M330,34l42,94M366,50l-34,78M366,50l32,78"/></g>` +
    `<g fill="#e8443f"><rect x="294" y="36" width="14" height="8"/><rect x="330" y="26" width="14" height="8"/></g>` +
    `<path d="M228,120h44l-6,8h-32z" fill="#3a2f24"/><rect x="242" y="94" width="3" height="26" fill="#5a4630"/><path d="M246,98h18v18h-18z" fill="#e8e4d8"/>` +
    // 手前の埠頭
    ground(148, "#a89f8c") +
    `<g stroke="#8a8072" stroke-width="1.8" opacity=".7" fill="none"><path d="M0,164h400M0,184h400M0,204h400M70,148v62M180,148v62M300,148v62"/></g>` +
    `<g fill="#8a5f3a"><rect x="14" y="164" width="26" height="30" rx="3"/><rect x="44" y="172" width="22" height="24" rx="3"/><rect x="24" y="194" width="24" height="16" rx="3"/></g>` +
    `<g stroke="#5a4028" stroke-width="1.6" fill="none"><path d="M14,172h26M14,186h26M44,178h22M44,190h22"/></g>` +
    `<g fill="#c8b48a"><rect x="330" y="176" width="34" height="22"/><rect x="360" y="182" width="30" height="18"/></g>` +
    `<g stroke="#a8926a" stroke-width="1.6" fill="none"><path d="M330,186h34M360,190h30"/></g>` +
    `<g><ellipse cx="290" cy="180" rx="18" ry="6" fill="none" stroke="#8a7a5f" stroke-width="3.4"/><ellipse cx="290" cy="180" rx="10" ry="3.4" fill="none" stroke="#8a7a5f" stroke-width="3"/></g>` +
    boat(84, 178, 78, "#f0ece0", "#2f5f7a") +
    // 木箱を運ぶ2人
    shade(212, 202, 28, 5, ".18") +
    person(200, 198, 26, "#e8443f") +
    arm(200, 182, 13, 4) +
    person(232, 198, 24, "#2f6fa8") +
    arm(232, 184, -12, 2) +
    `<rect x="206" y="176" width="24" height="14" fill="#8a5f3a"/><rect x="206" y="181" width="24" height="3" fill="#5a4028"/>` +
    lamp(146, 150, 30) +
    gull(196, 58, 1.1) +
    gull(120, 44, 0.9) +
    gull(300, 66, 0.8),

  /** グリムスタ/シーエン。夕暮れの小さな町。二階の窓に灯りと机。 */
  ibsentown:
    sky("#5f7a96", "#e8b884", 104) +
    lowSun(348, 96, 12, "#f5a85a", "#f5c088") +
    stars([
      [40, 14, 1.2],
      [110, 24, 1],
      [196, 12, 1.2],
    ]) +
    clouds(120, 34, 1.2, "#d8a878", ".5") +
    hills(104, "#3f4a52", 3, 24) +
    band(104, 16, "#3a5a6e") +
    `<g fill="#f5a85a" opacity=".3"><path d="M336,104h26l-20,16h-24z"/></g>` +
    ripples(110, "#6b95ac", ".4") +
    ground(120, "#6b6458") +
    `<path d="M0,152h400v58H0z" fill="#5f5850"/>` +
    // 左:薬屋(灯った店先)と住居
    woodHouse(0, 152, 62, 42, "#e8e4d8", "#3a3a42", "#c8c4b8") +
    `<rect x="8" y="132" width="46" height="20" fill="#f5b31c"/>` +
    `<g fill="#3a3228"><rect x="8" y="132" width="46" height="3"/><rect x="28" y="135" width="3" height="17"/></g>` +
    `<circle cx="31" cy="142" r="26" fill="#f5b31c" opacity=".16"/>` +
    `<g fill="#5a4630"><rect x="60" y="118" width="3" height="12"/><path d="M63,119h16v10H63z" fill="#8a3a34"/></g>` +
    `<circle cx="71" cy="124" r="3.4" fill="#f5b31c"/>` +
    woodHouse(72, 152, 58, 48, "#dcd8cc", "#3a3a42", "#b8b4a8") +
    // 二階の窓:机に向かう人影(ろうそく)
    `<rect x="82" y="114" width="24" height="20" fill="#f8dc90"/>` +
    `<g fill="#3a3228"><rect x="82" y="114" width="24" height="2.4"/><rect x="93" y="116" width="2.4" height="18"/><rect x="82" y="132" width="24" height="2.4"/></g>` +
    `<g fill="#4a4036"><rect x="84" y="128" width="20" height="3"/><ellipse cx="90" cy="124" rx="4" ry="5"/><path d="M86,128v-4h8v4z"/></g>` +
    `<rect x="101" y="122" width="2" height="6" fill="#e8e4d8"/><circle cx="102" cy="120" r="2" fill="#f5b31c"/>` +
    `<circle cx="94" cy="124" r="24" fill="#f5b31c" opacity=".14"/>` +
    // 中央〜右
    woodHouse(140, 152, 56, 40, "#e8e4d8", "#3a3a42", "#b8b4a8") +
    woodHouse(202, 152, 52, 36, "#d0ccc0", "#3a3a42", "#b8b4a8") +
    woodHouse(262, 152, 58, 44, "#e8e4d8", "#3a3a42", "#b8b4a8") +
    woodHouse(326, 152, 54, 38, "#d8d4c8", "#3a3a42", "#b8b4a8") +
    `<g fill="#f5b31c"><rect x="216" y="132" width="12" height="14"/><rect x="278" y="128" width="12" height="14"/><rect x="340" y="132" width="12" height="14"/></g>` +
    // 教会の尖塔(奥)
    `<rect x="290" y="72" width="16" height="36" fill="#c8c4b8"/>` +
    `<path d="M286,72L298,42l12,30z" fill="#3a3a42"/>` +
    `<path d="M298,42v-7" stroke="#3a3a42" stroke-width="2"/>` +
    `<g fill="#5f6b76"><rect x="294" y="84" width="8" height="10"/></g>` +
    // 石畳の道
    `<g stroke="#4a4640" stroke-width="1.8" opacity=".8" fill="none"><path d="M0,166q60,-6 120,0t140,0 140,-4M0,180q70,-6 140,2t160,-2 100,0M0,196q80,-6 160,2t160,-4 80,0"/></g>` +
    `<g stroke="#4a4640" stroke-width="1.6" opacity=".55" fill="none"><path d="M40,158v52M110,158v52M190,158v52M270,158v52M340,158v52"/></g>` +
    // 手前:提灯を持って歩く人
    shade(210, 202, 20, 4, ".2") +
    person(206, 198, 26, "#3a3f4a") +
    arm(206, 182, 12, 7, "#c8a880") +
    `<rect x="217" y="188" width="2" height="7" fill="#3a3228"/>` +
    `<circle cx="218" cy="198" r="6" fill="#f5b31c" opacity=".85"/>` +
    `<circle cx="218" cy="198" r="17" fill="#f5b31c" opacity=".14"/>` +
    lamp(164, 156, 34, true) +
    lamp(310, 156, 34, true) +
    `<g fill="#8a5f3a"><rect x="60" y="184" width="20" height="24" rx="3"/></g>` +
    `<g stroke="#5a4028" stroke-width="1.6" fill="none"><path d="M60,192h20M60,202h20"/></g>` +
    `<g fill="#3a3228"><ellipse cx="352" cy="200" rx="11" ry="5"/><path d="M342,198l-4,-5 5,-2 5,4z"/><path d="M362,198l7,-8 2,4 -5,7z"/><rect x="345" y="200" width="3" height="7"/><rect x="356" y="200" width="3" height="7"/></g>` +
    `<circle cx="340" cy="192" r="1.2" fill="#f5b31c"/>`,
};

// ---------------------------------------------------------------------------
// 記号(24×24)。**盤面では直径19pxほどの点にしかならない。**
// 輪郭を優先し、主役を1つに絞る。同系色の面を隣り合わせない
// (雪・空・海が多い盤面なので、白と淡い青が接すると縮小時に輪郭が消える)。
// 呼び出し側が g に stroke="#241a10" stroke-width=".7" を掛けるので、
// 図形はそれ前提で分けて置く。
// ---------------------------------------------------------------------------

export const NORWAY_MARKS = {
  /** オスロ。列柱の宮殿と国旗。 */
  capital:
    '<rect x="1.4" y="21" width="21.2" height="3" fill="#7a7468"/>' +
    '<rect x="3" y="10.4" width="18" height="10.6" fill="#e8d8b0"/>' +
    '<path d="M1.6,10.4L12,4.2L22.4,10.4z" fill="#b8a066"/>' +
    '<g fill="#c8b48a"><rect x="4.6" y="12.4" width="2.2" height="8.6"/><rect x="8.4" y="12.4" width="2.2" height="8.6"/><rect x="13.4" y="12.4" width="2.2" height="8.6"/><rect x="17.2" y="12.4" width="2.2" height="8.6"/></g>' +
    '<rect x="10.6" y="15.6" width="2.8" height="5.4" fill="#5a4630"/>' +
    '<rect x="11.2" y="0.6" width="1" height="4" fill="#6b6250"/>' +
    '<path d="M12.2,0.8h6.4v4.4h-6.4z" fill="#c0453c"/>' +
    '<path d="M12.2,2.4h6.4v1.4h-6.4z" fill="#f0ece0"/>' +
    '<path d="M14.6,0.8h1.6v4.4h-1.6z" fill="#f0ece0"/>',

  /** ハーマル。屋根の無い石壁の廃墟。 */
  ruins:
    '<rect x="3.6" y="6.8" width="16.8" height="14.6" fill="#39434f"/>' +
    '<g fill="#c0b8a6"><rect x="1.4" y="5.4" width="3.8" height="16"/><rect x="10.1" y="3.2" width="3.8" height="18.2"/><rect x="18.8" y="7" width="3.8" height="14.4"/></g>' +
    '<path d="M5.2,13.6c0,-4.2 2.6,-6.6 4.9,-6.8v2.4c-1.4,0.2 -2.6,2 -2.6,4.4z" fill="#dcd4c2"/>' +
    '<path d="M18.8,14c0,-4.2 -2.6,-6.6 -4.9,-6.8v2.4c1.4,0.2 2.6,2 2.6,4.4z" fill="#dcd4c2"/>' +
    '<g fill="#9a9284"><path d="M1.4,5.4L2.6,2.6L4.6,5.4z"/><path d="M18.8,7L20.2,4L22.6,7z"/><path d="M10.1,3.2L11.6,0.8L13.9,3.2z"/></g>' +
    '<rect x="0.6" y="21.4" width="22.8" height="2.6" fill="#8a8072"/>',

  /** リレハンメル。聖火の器に五輪。 */
  olympic:
    '<rect x="6.4" y="21.4" width="11.2" height="2.6" fill="#7a7468"/>' +
    '<path d="M10.2,21.4l0.8,-8h2l0.8,8z" fill="#8a8578"/>' +
    '<path d="M6.6,9.2h10.8l-1.2,4.6H7.8z" fill="#c8a03c"/>' +
    '<path d="M12,0.4c3.6,3.8 5.4,6.6 5.4,9a5.4,5.4 0 0 1 -10.8,0c0,-2.4 1.8,-5.2 5.4,-9z" fill="#f5b31c"/>' +
    '<path d="M12,4.6c2,2.6 3,4.4 3,5.8a3,3 0 0 1 -6,0c0,-1.4 1,-3.2 3,-5.8z" fill="#e8443f"/>' +
    '<g fill="none" stroke="#3a3f47" stroke-width="0.8"><circle cx="8.6" cy="10.4" r="1.1"/><circle cx="12" cy="10.4" r="1.1"/><circle cx="15.4" cy="10.4" r="1.1"/><circle cx="10.3" cy="12.2" r="1.1"/><circle cx="13.7" cy="12.2" r="1.1"/></g>',

  /** 分岐するレール(ドンボース・ドランメン・ミルダル・フォウスケ)。 */
  junction:
    '<rect x="1.4" y="2.2" width="21.2" height="21.8" rx="1.6" fill="#7f7a70"/>' +
    '<g fill="#4a3c2c"><rect x="3.6" y="20.4" width="16.8" height="1.9"/><rect x="4.4" y="16.4" width="15.2" height="1.9"/><rect x="5.8" y="12.6" width="12.4" height="1.9"/></g>' +
    '<g fill="#4a3c2c" transform="rotate(-26 8.6 8)"><rect x="1.6" y="8" width="10.4" height="1.7"/><rect x="2.4" y="4" width="10.4" height="1.7"/></g>' +
    '<g fill="#4a3c2c" transform="rotate(26 15.4 8)"><rect x="12" y="8" width="10.4" height="1.7"/><rect x="11.2" y="4" width="10.4" height="1.7"/></g>' +
    '<g stroke="#e0e6ec" stroke-width="1.4" fill="none" stroke-linecap="round">' +
    '<path d="M9.2,23.4V13.4L4.2,3"/><path d="M14.8,23.4V13.4L19.8,3"/>' +
    '<path d="M9.2,13.4L11.6,3"/><path d="M14.8,13.4L12.4,3"/></g>',

  /** イェーヴィク。岩をくり抜いたアーチと、その奥の氷。 */
  cavern:
    '<path d="M0.8,24V6.6C0.8,3.2 5.8,0.8 12,0.8s11.2,2.4 11.2,5.8V24z" fill="#5f646e"/>' +
    '<g stroke="#464b55" stroke-width="1.2" fill="none" stroke-linecap="round"><path d="M3.4,7l3.4,6 -1.6,5"/><path d="M20.6,8l-3,5.6 1.4,4.4"/></g>' +
    '<path d="M5.6,24v-8.4a6.4,6.4 0 0 1 12.8,0V24z" fill="#1c222b"/>' +
    '<path d="M7.4,24v-7a4.6,4.6 0 0 1 9.2,0V24z" fill="#2f3a48"/>' +
    '<rect x="6.6" y="20.4" width="10.8" height="3.6" fill="#dfeef8"/>' +
    '<rect x="6.6" y="21.8" width="10.8" height="0.8" fill="#3f6fb8"/>' +
    '<circle cx="12" cy="12.6" r="1.5" fill="#f5b31c"/>' +
    '<path d="M12,10.6V8.4" stroke="#3a4048" stroke-width="1"/>',

  /** 星形要塞の平面(コングスヴィンゲル・フレドリクスタ・ハルデン)。 */
  fortress:
    `<polygon points="${starPoints(12, 12.6, 11.4, 6.6, 5)}" fill="#3f6f7f"/>` +
    `<polygon points="${starPoints(12, 12.6, 9.2, 5.4, 5)}" fill="#7f9a55"/>` +
    `<polygon points="${starPoints(12, 12.6, 6.4, 4, 5)}" fill="#b0a894"/>` +
    '<g fill="#8a3a34"><rect x="9.6" y="11" width="4.8" height="4"/></g>' +
    '<path d="M9.2,11L12,8.6L14.8,11z" fill="#4a4f58"/>' +
    '<rect x="16.4" y="4.4" width="0.9" height="5.4" fill="#6b6250"/>' +
    '<path d="M17.3,4.6h4.4v3h-4.4z" fill="#c0453c"/>',

  /** ヒョーネフォス。街なかに落ちる滝。 */
  waterfall:
    '<path d="M0.6,24V3l8,0.6 1.2,12.4 -1.2,8z" fill="#5f646e"/>' +
    '<path d="M23.4,24V4.4l-7.8,0.4 -1,11 1,8.2z" fill="#4f555f"/>' +
    '<g stroke="#41464f" stroke-width="1.1" fill="none"><path d="M3.4,5l2.4,7 -1.4,5"/><path d="M20.4,6.6l-2,6 1.2,5"/></g>' +
    '<path d="M8.8,3.6h6.4l1.4,15.4H7.4z" fill="#eef4f8"/>' +
    '<g fill="#c8dfec"><path d="M9.8,4h1.4l0.7,14.4h-1.6z"/><path d="M13.4,4h1.2l1,14.4h-1.5z"/></g>' +
    '<ellipse cx="12" cy="19.6" rx="8.4" ry="3.2" fill="#7fb8d0"/>' +
    '<ellipse cx="12" cy="18.8" rx="5.8" ry="2" fill="#f4fafc"/>' +
    '<rect x="0.6" y="21.4" width="22.8" height="2.6" fill="#3f6f8a"/>' +
    '<rect x="1.4" y="1" width="5.4" height="3" fill="#a83c30"/>' +
    '<path d="M0.6,1h7l-3.5,-2.4z" fill="#3f434a"/>',

  /** コングスベルグ。銀貨と刻印器。 */
  mint:
    '<rect x="9.4" y="0.6" width="5.2" height="5.4" fill="#6b6250"/>' +
    '<rect x="7.8" y="5.6" width="8.4" height="2.2" fill="#4a4436"/>' +
    '<ellipse cx="12" cy="21.8" rx="8.4" ry="2.2" fill="#7a7468"/>' +
    '<circle cx="12" cy="15" r="7.8" fill="#f5b31c"/>' +
    '<circle cx="12" cy="15" r="6" fill="#d8a03c"/>' +
    '<path d="M12,10.2l1.6,3.2 3.5,0.5 -2.5,2.4 0.6,3.5 -3.2,-1.7 -3.2,1.7 0.6,-3.5 -2.5,-2.4 3.5,-0.5z" fill="#f8e0a0"/>' +
    '<g fill="#c08a2c"><rect x="4.4" y="18.8" width="15.2" height="1.2"/></g>',

  /** ベルゲン。切妻の木造倉庫が並ぶ波止場。 */
  wharf:
    '<rect x="0.6" y="19" width="22.8" height="2.6" fill="#8a8578"/>' +
    '<rect x="0.6" y="21.6" width="22.8" height="2.4" fill="#3a6f8f"/>' +
    '<g><rect x="1.4" y="9.4" width="6.4" height="9.6" fill="#a8382e"/><path d="M0.6,9.4L4.6,3.4L8.6,9.4z" fill="#4a4038"/></g>' +
    '<g><rect x="8.8" y="7.6" width="6.4" height="11.4" fill="#d8a03c"/><path d="M8,7.6L12,1.4L16,7.6z" fill="#4a4038"/></g>' +
    '<g><rect x="16.2" y="10.4" width="6.4" height="8.6" fill="#e8e0d0"/><path d="M15.4,10.4L19.4,4.6L23.4,10.4z" fill="#4a4038"/></g>' +
    '<g fill="#4a5560"><rect x="3" y="12" width="3.2" height="3.4"/><rect x="10.4" y="10.4" width="3.2" height="3.4"/><rect x="17.8" y="13" width="3.2" height="3.4"/></g>' +
    '<g fill="#f0ece0"><rect x="2.6" y="16" width="4" height="3"/><rect x="10" y="14.6" width="4" height="4.4"/><rect x="17.4" y="16.6" width="4" height="2.4"/></g>',

  /** スタヴァンゲル。夕日を背にした移民船。 */
  emigration:
    '<circle cx="12" cy="11" r="10.4" fill="#f5c07a"/>' +
    '<path d="M1.6,18.4h20.8l-2.6,3.8H4.2z" fill="#2f2820"/>' +
    '<rect x="11.2" y="2.2" width="1.4" height="16.4" fill="#3a3228"/>' +
    '<path d="M11,4.4v12.4H3.6c0,-5.4 2.6,-9.6 7.4,-12.4z" fill="#f0ece0"/>' +
    '<path d="M13,6v10.8h6.6c0,-4.6 -2.2,-8.2 -6.6,-10.8z" fill="#e0d8c4"/>' +
    '<path d="M11,4.8L4.2,16.8H2c0,-5 3.4,-9.6 9,-12z" fill="#2f2820"/>' +
    '<path d="M12.6,1.6h4.6v2.6h-4.6z" fill="#c0453c"/>' +
    '<g stroke="#2f5f7a" stroke-width="1.2" fill="none" stroke-linecap="round"><path d="M1,22.8h5M8.4,23.4h6.4M17.6,22.6h5.4"/></g>',

  /** ハウゲスン。ニシンの群れ。 */
  herring:
    '<rect x="0.6" y="0.6" width="22.8" height="22.8" rx="3" fill="#8fc4dc"/>' +
    '<g stroke="#5f9fc0" stroke-width="1.4" opacity=".8" fill="none"><path d="M1.6,4h9M15,3h7.4M1.6,21.4h8M14,22.4h8.4"/></g>' +
    '<g fill="#eef4f8"><path d="M2.6,9.4q6.6,-4.4 13.2,0q-6.6,4.4 -13.2,0z"/><path d="M2.6,9.4l-2,-3.4v6.8z"/></g>' +
    '<path d="M2.6,9.4q6.6,-4.4 13.2,0q-4.4,-1 -13.2,0z" fill="#2f4a6f"/>' +
    '<circle cx="12.4" cy="8.6" r="1.1" fill="#1c222b"/>' +
    '<g fill="#eef4f8"><path d="M8.4,17.6q6.6,-4.4 13.2,0q-6.6,4.4 -13.2,0z"/><path d="M8.4,17.6l-2,-3.4v6.8z"/></g>' +
    '<path d="M8.4,17.6q6.6,-4.4 13.2,0q-4.4,-1 -13.2,0z" fill="#2f4a6f"/>' +
    '<circle cx="18.2" cy="16.8" r="1.1" fill="#1c222b"/>',

  /** ヴォス。円筒形の瓶。 */
  waterbottle:
    '<ellipse cx="12" cy="22.8" rx="9" ry="1.4" fill="#6b6f68"/>' +
    '<rect x="4.6" y="6.4" width="14.8" height="16.6" rx="1.4" fill="#9fc4dc"/>' +
    '<rect x="8" y="2.2" width="8" height="4.4" fill="#7fabc8"/>' +
    '<rect x="6.8" y="0.4" width="10.4" height="2.4" rx="0.6" fill="#3f4a58"/>' +
    '<rect x="4.6" y="11.6" width="14.8" height="6.4" fill="#eef6fa"/>' +
    '<g fill="#1f4f8f"><rect x="4.6" y="11.6" width="14.8" height="1.8"/><rect x="4.6" y="16.2" width="14.8" height="1.8"/></g>' +
    '<rect x="6.6" y="8" width="2.4" height="13" fill="#f4fafc" opacity=".85"/>' +
    '<rect x="16.4" y="8" width="1.4" height="13" fill="#5f8fac" opacity=".7"/>',

  /** フロム。大きな客船。 */
  cruiseship:
    '<rect x="0.6" y="20" width="22.8" height="4" fill="#2f6f8f"/>' +
    '<g stroke="#7fc0d8" stroke-width="1.2" fill="none"><path d="M1.4,22.4h6M10,23h5.4M18,22.2h5"/></g>' +
    '<path d="M0.8,14.6h22.4l-3.4,6H4.2z" fill="#2f3a46"/>' +
    '<rect x="0.8" y="12.4" width="22.4" height="2.4" fill="#f0ece0"/>' +
    '<rect x="2.4" y="8.6" width="19.2" height="3.8" fill="#f0ece0"/>' +
    '<rect x="4.4" y="5" width="14" height="3.6" fill="#e8e4d8"/>' +
    '<g fill="#3f5f7a"><rect x="3.4" y="9.6" width="2.2" height="2"/><rect x="7" y="9.6" width="2.2" height="2"/><rect x="10.6" y="9.6" width="2.2" height="2"/><rect x="14.2" y="9.6" width="2.2" height="2"/><rect x="17.8" y="9.6" width="2.2" height="2"/><rect x="5.6" y="6" width="2.2" height="2"/><rect x="9.2" y="6" width="2.2" height="2"/><rect x="12.8" y="6" width="2.2" height="2"/></g>' +
    '<rect x="13.4" y="0.8" width="4.6" height="4.2" rx="1" fill="#c0453c"/>' +
    '<rect x="6.8" y="1.8" width="1.6" height="3.2" fill="#3f434a"/>',

  /** ガイロ。交差したスキー板とストック。 */
  ski:
    '<g transform="rotate(-16 12 12)"><path d="M8.2,22.6V3.4c0,-1.6 0.6,-2.6 1.6,-2.6s1.6,1 1.6,2.6v19.2z" fill="#c0453c"/><rect x="8.2" y="12" width="3.2" height="2.4" fill="#3a3f47"/></g>' +
    '<g transform="rotate(16 12 12)"><path d="M12.6,22.6V3.4c0,-1.6 0.6,-2.6 1.6,-2.6s1.6,1 1.6,2.6v19.2z" fill="#f5b31c"/><rect x="12.6" y="12" width="3.2" height="2.4" fill="#3a3f47"/></g>' +
    '<g stroke="#4a4f58" stroke-width="1.4" fill="none" stroke-linecap="round"><path d="M3.4,4.4L6.6,22"/><path d="M20.6,4.4L17.4,22"/></g>' +
    '<g fill="#8a8f96"><ellipse cx="6.4" cy="19.6" rx="2.4" ry="1"/><ellipse cx="17.6" cy="19.6" rx="2.4" ry="1"/></g>' +
    '<g fill="#5a4630"><rect x="2.4" y="3" width="2.6" height="2.4" rx="1"/><rect x="19" y="3" width="2.6" height="2.4" rx="1"/></g>',

  /** オッダ/モーシューエン。煙突と炉。 */
  smelter:
    '<rect x="0.6" y="21.6" width="22.8" height="2.4" fill="#6b6f68"/>' +
    '<rect x="1.6" y="12" width="13.4" height="9.6" fill="#7a7f86"/>' +
    '<path d="M0.8,12h15l-1.4,-3.2H2.2z" fill="#5f646e"/>' +
    '<rect x="16.4" y="1.6" width="4.8" height="20" fill="#a89f8c"/>' +
    '<rect x="15.8" y="1" width="6" height="1.8" fill="#8a8072"/>' +
    '<rect x="16.4" y="6.4" width="4.8" height="1.8" fill="#c0453c"/>' +
    '<rect x="4.4" y="15.4" width="7" height="6.2" fill="#f5b31c"/>' +
    '<rect x="5.8" y="17" width="4.2" height="4.6" fill="#e8443f"/>' +
    '<g fill="#cfd4d8"><ellipse cx="19" cy="1.2" rx="3.4" ry="1.2"/><ellipse cx="22" cy="4.4" rx="2" ry="1"/></g>',

  /** オーレスン。曲線の破風と塔屋。 */
  artnouveau:
    '<rect x="0.6" y="21.6" width="22.8" height="2.4" fill="#8a8578"/>' +
    '<rect x="1.2" y="11.4" width="11.6" height="10.2" fill="#e8d8b0"/>' +
    '<path d="M0.6,11.4c0,-4 2.8,-6.6 6.4,-6.6s6.4,2.6 6.4,6.6z" fill="#c8ac80"/>' +
    '<g stroke="#a89060" stroke-width="0.9" fill="none"><path d="M2.4,10.6c1.2,-2.6 7.4,-2.6 8.6,0"/></g>' +
    '<g fill="#4a5f7a"><rect x="2.8" y="13" width="3.2" height="4"/><rect x="8" y="13" width="3.2" height="4"/><rect x="5.2" y="18.4" width="3.6" height="3.2"/></g>' +
    '<rect x="14" y="9" width="8.8" height="12.6" fill="#dcc4b0"/>' +
    '<path d="M13.2,9L18.4,0.8L23.4,9z" fill="#4a4a55"/>' +
    '<circle cx="18.4" cy="0.9" r="1" fill="#c8a03c"/>' +
    '<g fill="#4a5f7a"><rect x="15.4" y="11.4" width="2.8" height="3.6"/><rect x="19" y="11.4" width="2.8" height="3.6"/><path d="M16.8,21.6v-3.4a1.8,1.8 0 0 1 3.6,0v3.4z"/></g>',

  /** モルデ。無線機と王冠。 */
  exile:
    '<rect x="2.4" y="12" width="14.6" height="11.4" rx="1.2" fill="#6b4a30"/>' +
    '<rect x="1.6" y="21.6" width="16.2" height="2.4" fill="#4a3220"/>' +
    '<rect x="4" y="14" width="5.4" height="5.4" fill="#3a3228"/>' +
    '<g stroke="#5f4a34" stroke-width="0.7" fill="none"><path d="M4,15.4h5.4M4,16.8h5.4M4,18.2h5.4"/></g>' +
    '<circle cx="13.6" cy="16.6" r="2.4" fill="#e8d8b0"/>' +
    '<path d="M13.6,16.6l1.6,-1.6" stroke="#3a3228" stroke-width="1"/>' +
    '<rect x="18.6" y="4.6" width="1.2" height="18.8" fill="#8a8f96"/>' +
    '<path d="M19.2,4.8L22.6,1.4" stroke="#8a8f96" stroke-width="1"/>' +
    '<path d="M2.6,11.8L3.6,5.4l2.4,2.8 2.4,-3.8 2.4,3.8 2.4,-2.8 1,6.4z" fill="#f5b31c"/>' +
    '<g fill="#c0453c"><circle cx="6" cy="9.6" r="0.9"/><circle cx="10.8" cy="9.6" r="0.9"/></g>',

  /** オンダルスネス。垂直な岩壁。右の空と、小さな登攀者で高さを出す。 */
  cliff:
    '<rect x="0.6" y="0.6" width="22.8" height="23.4" fill="#a8c8e0"/>' +
    '<path d="M0.6,24V4.6L4,1.4l4,3.4 4.4,-2.6 4,3.2V24z" fill="#4a505c"/>' +
    '<path d="M8.4,24V5.2l4,-2.6 4,3.2V24z" fill="#3f444f"/>' +
    '<g stroke="#2e333c" stroke-width="1.4" fill="none" stroke-linecap="round"><path d="M3.4,3.4l1.4,10 -1,8.4"/><path d="M10.6,3.4l-1,10.6 1.8,9.6"/><path d="M14.4,7l1.2,8"/><path d="M6.4,13l-3.4,2.4"/></g>' +
    '<g fill="#e4ecf4"><path d="M4,1.4l2.4,4.6 -4.4,0.6z"/><path d="M12.4,2.6l1.8,4 -3.6,0.4z"/></g>' +
    '<path d="M0.6,20l16.4,-2.4V24H0.6z" fill="#2e333c"/>' +
    '<circle cx="6.6" cy="12" r="1.6" fill="#e8443f"/>' +
    '<path d="M6.6,13.6v3.4" stroke="#e8443f" stroke-width="1.2"/>' +
    '<path d="M17,24V8l6.4,-3.4V24z" fill="#6b7078"/>' +
    '<g stroke="#545a64" stroke-width="1.2" fill="none"><path d="M20,8.6v14"/></g>',

  /** トロンハイム。ゴシックの尖塔とばら窓。 */
  cathedral:
    '<rect x="0.8" y="21.4" width="22.4" height="2.6" fill="#a89f8c"/>' +
    '<g fill="#c0b8a6"><rect x="1.6" y="9.6" width="3" height="11.8"/><rect x="19.4" y="9.6" width="3" height="11.8"/></g>' +
    '<g fill="#a89f8c"><path d="M1.6,9.6L3.1,6.4L4.6,9.6z"/><path d="M19.4,9.6L20.9,6.4L22.4,9.6z"/></g>' +
    '<rect x="4.4" y="10.6" width="15.2" height="10.8" fill="#e0d8c6"/>' +
    '<rect x="8.4" y="4" width="7.2" height="6.8" fill="#d0c8b4"/>' +
    '<path d="M6.8,4L12,0.4L17.2,4z" fill="#3f4a58"/>' +
    '<circle cx="12" cy="0.9" r="0.9" fill="#c8a03c"/>' +
    '<circle cx="12" cy="13.6" r="3.6" fill="#cfc7b4"/>' +
    '<circle cx="12" cy="13.6" r="2.8" fill="#3f5f9f"/>' +
    '<g fill="#cfc7b4"><rect x="11.6" y="10.8" width="0.8" height="5.6"/><rect x="9.2" y="13.2" width="5.6" height="0.8"/></g>' +
    '<circle cx="12" cy="13.6" r="0.9" fill="#e8443f"/>' +
    '<path d="M9.8,21.4v-2.6a2.2,2.2 0 0 1 4.4,0v2.6z" fill="#5a4630"/>' +
    '<g fill="#5f7f96"><path d="M5.6,17.4v-2a1.6,1.6 0 0 1 3.2,0v2z"/><path d="M15.2,17.4v-2a1.6,1.6 0 0 1 3.2,0v2z"/></g>',

  /** スタインシェル。麦の束と畝。 */
  farmland:
    '<path d="M0.8,24c2.6,-4.4 6.4,-6.4 11.2,-6.4S20.6,19.6 23.2,24z" fill="#8a6f3c"/>' +
    '<g stroke="#6b5330" stroke-width="1" fill="none"><path d="M2.6,22.6c2,-2.4 4.8,-3.6 8.4,-3.8"/><path d="M13,18.8c3.6,0.4 6.6,1.8 8.4,3.6"/><path d="M6,24c1.4,-2 3.4,-3 6,-3.2"/></g>' +
    '<path d="M12,4.4c3.2,3.4 4.8,8.4 4.4,13.2H7.6C7.2,12.8 8.8,7.8 12,4.4z" fill="#e0b854"/>' +
    '<g fill="#e0b854"><path d="M12,0.6l1.8,4.6h-3.6z"/><path d="M7.4,2.6l3,4.2 -3.4,1.4z"/><path d="M16.6,2.6l-3,4.2 3.4,1.4z"/><path d="M4.8,6.4l3.6,3 -2.6,2.4z"/><path d="M19.2,6.4l-3.6,3 2.6,2.4z"/></g>' +
    '<g stroke="#a8802c" stroke-width="1" fill="none"><path d="M12,2.6V17M8.4,4.6L8.4,17M15.6,4.6L15.6,17M6,7.4L7,15M18,7.4L17,15"/></g>' +
    '<rect x="6.4" y="11.4" width="11.2" height="2.8" rx="1.2" fill="#7a5f30"/>',

  /** レーヴァンゲル。草屋根の木造家屋が並ぶ。 */
  woodtown:
    '<rect x="0.6" y="21.4" width="22.8" height="2.6" fill="#8a8578"/>' +
    '<g><rect x="1" y="14" width="7" height="7.4" fill="#7a4a34"/><path d="M0.4,14L4.5,9.4L8.6,14z" fill="#5f8f4f"/><rect x="3.2" y="16.4" width="2.6" height="5" fill="#4f3722"/></g>' +
    '<g><rect x="8.6" y="11.2" width="7.4" height="10.2" fill="#6b4630"/><path d="M8,11.2L12.3,6L16.6,11.2z" fill="#5f8f4f"/><rect x="10.2" y="13.6" width="2.8" height="3" fill="#f0ece0"/><rect x="13.4" y="16.4" width="2.6" height="5" fill="#4f3722"/></g>' +
    '<g><rect x="16.4" y="15" width="6.8" height="6.4" fill="#8a5a3c"/><path d="M15.8,15L19.8,10.6L23.8,15z" fill="#5f8f4f"/><rect x="18.4" y="17" width="2.6" height="4.4" fill="#4f3722"/></g>' +
    '<g stroke="#4f3722" stroke-width="0.6" opacity=".8" fill="none"><path d="M1,17h7M8.6,15h7.4M8.6,18.4h7.4M16.4,18h6.8"/></g>',

  /** シュールダール。管制塔と滑走路。 */
  airfield:
    '<rect x="0.6" y="17" width="22.8" height="7" fill="#4a4f55"/>' +
    '<g fill="#f0ece0"><rect x="1.4" y="20" width="4" height="1.4"/><rect x="8" y="20" width="4" height="1.4"/><rect x="14.6" y="20" width="4" height="1.4"/></g>' +
    '<rect x="0.6" y="14.6" width="22.8" height="2.4" fill="#6b8a4a"/>' +
    '<rect x="8.8" y="6.6" width="6.4" height="8" fill="#cfc7b4"/>' +
    '<path d="M6.6,6.4h10.8l-1.6,-3.4H8.2z" fill="#3a4a55"/>' +
    '<path d="M7.4,3h9.2l-1.2,-2.4H8.6z" fill="#5f7f96"/>' +
    '<rect x="10.4" y="8.6" width="3.2" height="4" fill="#4a5f7a"/>' +
    '<rect x="11.6" y="-0.4" width="0.9" height="3.4" fill="#6b7078"/>' +
    '<circle cx="12" cy="0.6" r="1.2" fill="#e8443f"/>' +
    '<g fill="#8a9098"><path d="M0.6,10.4h6.4v4.2H0.6z"/><path d="M0.6,10.4c0,-1.8 3,-2.6 6.4,-2.6v2.6z"/></g>' +
    '<g fill="#5b8fe8"><circle cx="3" cy="15.8" r="0.9"/><circle cx="12" cy="15.8" r="0.9"/><circle cx="21" cy="15.8" r="0.9"/></g>' +
    '<path d="M17.4,14.6h5.8l-1.4,-3.6h-3z" fill="#e8843a"/>',

  /** レーロス。坑口とトロッコ。 */
  miningtown:
    '<path d="M0.6,24V6.6C4.6,4 10.6,4.4 15,8.4c2.6,2.4 4,7 4.4,12.4l-0.4,3.2z" fill="#6b6f76"/>' +
    '<g stroke="#4d525a" stroke-width="1.1" fill="none"><path d="M3.6,8.6l2.4,5.4 -1.4,4"/><path d="M11.6,9.6l-1.6,4.6 2.2,3.4"/></g>' +
    '<path d="M4.6,20.4v-4.6a4.6,4.6 0 0 1 9.2,0v4.6z" fill="#241f1c"/>' +
    '<path d="M3.4,15.8a5.8,5.8 0 0 1 11.6,0l-1.2,0.9a4.6,4.6 0 0 0 -9.2,0z" fill="#4a3c2c"/>' +
    '<g fill="#4a3c2c"><rect x="2.6" y="19.6" width="13.4" height="1.4"/><rect x="2.2" y="15" width="1.8" height="6"/><rect x="14.6" y="15" width="1.8" height="6"/></g>' +
    '<rect x="0.6" y="21" width="22.8" height="3" fill="#8a8072"/>' +
    '<g stroke="#c8ccd4" stroke-width="1" fill="none"><path d="M4,22.4h19.4"/></g>' +
    '<path d="M15.6,20.6h7.6l-1,-5h-5.6z" fill="#5f666e"/>' +
    '<path d="M16.8,15.6h5.2l-0.4,-1.6h-4.4z" fill="#7a4235"/>' +
    '<g fill="#3a3f47"><circle cx="17.4" cy="21.4" r="1.4"/><circle cx="21.4" cy="21.4" r="1.4"/></g>',

  /** ナムソス。跳ねる鮭。 */
  salmon:
    '<rect x="0.6" y="18.6" width="22.8" height="5.4" fill="#2f6f8f"/>' +
    '<g stroke="#7fc0d8" stroke-width="1.2" fill="none"><path d="M1.4,21h6M11,22.4h5.4M18.6,20.6h4.6"/></g>' +
    '<path d="M2.6,17.4c2.6,-8.4 8.4,-13.4 17.2,-14.6c-2,7.4 -6.6,12.6 -13.4,15.8z" fill="#c9dae2"/>' +
    '<path d="M4.2,15.6c2.6,-6.6 7.6,-10.8 14.4,-12.4c-1.6,5.6 -5.2,9.6 -10.4,12.2z" fill="#e8a898"/>' +
    '<path d="M2.6,17.4c-1.4,0.6 -2.6,2 -2,4.4c2,-0.4 3.4,-1.6 4,-3z" fill="#8fa8bc"/>' +
    '<path d="M19.8,2.8c1.6,-0.6 3,-0.4 3.6,1.2c-1.4,1 -2.8,1.2 -4,0.6z" fill="#8fa8bc"/>' +
    '<path d="M10.4,10.6l4.6,-3.4 1.4,2.4 -4.6,3.4z" fill="#8fa8bc"/>' +
    '<circle cx="18.4" cy="5.4" r="1" fill="#2f3640"/>' +
    '<g fill="#8fa8bc"><circle cx="14" cy="4.6" r="0.7"/><circle cx="11" cy="7.4" r="0.7"/><circle cx="8.4" cy="11" r="0.7"/></g>',

  /**
   * モー・イ・ラーナ。捕虜が敷いた線路の切通しと鉄条網。
   * **重い題材。**人も暴力も描かず、構造だけを示す。色も抑える。
   */
  laborcamp:
    '<rect x="0.6" y="0.6" width="22.8" height="23.4" fill="#aab6c0"/>' +
    '<path d="M0.6,24V13.4h22.8V24z" fill="#dfe6ec"/>' +
    '<path d="M0.6,13.4h22.8l-3.4,-4.4H4z" fill="#5f646e"/>' +
    '<path d="M0.6,9h4.6l-1.2,4.4H0.6z" fill="#41464f"/>' +
    '<path d="M23.4,9h-4.6l1.2,4.4h3.4z" fill="#41464f"/>' +
    '<g fill="#4a4038"><path d="M6.6,24l2.6,-10.6h2L8.8,24z"/><path d="M17.4,24l-2.6,-10.6h-2L15.2,24z"/></g>' +
    '<g stroke="#7a8088" stroke-width="1.1" fill="none"><path d="M9,15.4h6M8.2,19h7.6M7.4,22.6h9.2"/></g>' +
    '<g fill="#3f3428"><rect x="2" y="0.8" width="2.6" height="12.6"/><rect x="19.4" y="0.8" width="2.6" height="12.6"/></g>' +
    '<g stroke="#3a3f47" stroke-width="1.5" fill="none"><path d="M0.6,3.8h22.8M0.6,8.2h22.8"/></g>' +
    '<g stroke="#3a3f47" stroke-width="1.3" fill="none"><path d="M8,1.8v4M6.2,3.8h3.6M15.4,1.8v4M13.6,3.8h3.6M11.6,6.2v4M9.8,8.2h3.6"/></g>',

  /** ボードー。車止め。この先に線路は無い。 */
  railend:
    '<rect x="0.6" y="17.6" width="22.8" height="6.4" fill="#8a8072"/>' +
    '<g fill="#4a3a28"><rect x="2.4" y="18.6" width="19.2" height="1.8"/><rect x="2.4" y="21.6" width="19.2" height="1.8"/></g>' +
    '<g stroke="#c8ccd4" stroke-width="1.6" fill="none"><path d="M7.4,24V10.4M16.6,24V10.4"/></g>' +
    '<g fill="#4a4436"><rect x="6.4" y="11" width="2.6" height="8"/><rect x="15" y="11" width="2.6" height="8"/></g>' +
    '<rect x="4.6" y="8.6" width="14.8" height="3.4" fill="#c0453c"/>' +
    '<g fill="#f0ece0"><rect x="7.4" y="8.6" width="2.6" height="3.4"/><rect x="14" y="8.6" width="2.6" height="3.4"/></g>' +
    '<g fill="#3a3f47"><circle cx="8.4" cy="7" r="2"/><circle cx="15.6" cy="7" r="2"/></g>' +
    '<g fill="#8a8f96"><circle cx="8.4" cy="7" r="0.9"/><circle cx="15.6" cy="7" r="0.9"/></g>' +
    '<path d="M4.6,8.6h14.8v-1.6H4.6z" fill="#8a8072"/>',

  /** スヴォルヴェル。木の棚に吊るした干し魚。 */
  stockfish:
    '<rect x="0.6" y="21.6" width="22.8" height="2.4" fill="#8a8072"/>' +
    '<g stroke="#6b5330" stroke-width="1.8" fill="none"><path d="M2.6,21.6L7,3.4M11.4,21.6L7,3.4M12.6,21.6L17,3.4M21.4,21.6L17,3.4"/></g>' +
    '<g fill="#5a4630"><rect x="1.4" y="6.4" width="21.2" height="1.5"/><rect x="1.4" y="13.4" width="21.2" height="1.5"/></g>' +
    '<g fill="#c0b090">' +
    '<path d="M3.6,7.9q1.6,3 0,6q-1.6,-3 0,-6z"/><path d="M7.4,7.9q1.6,3 0,6q-1.6,-3 0,-6z"/><path d="M11.2,7.9q1.6,3 0,6q-1.6,-3 0,-6z"/><path d="M15,7.9q1.6,3 0,6q-1.6,-3 0,-6z"/><path d="M18.8,7.9q1.6,3 0,6q-1.6,-3 0,-6z"/>' +
    '<path d="M5.4,14.9q1.6,3.2 0,6.4q-1.6,-3.2 0,-6.4z"/><path d="M9.4,14.9q1.6,3.2 0,6.4q-1.6,-3.2 0,-6.4z"/><path d="M13.4,14.9q1.6,3.2 0,6.4q-1.6,-3.2 0,-6.4z"/><path d="M17.4,14.9q1.6,3.2 0,6.4q-1.6,-3.2 0,-6.4z"/></g>' +
    '<g fill="#8a7f68"><circle cx="3.6" cy="8.6" r="0.7"/><circle cx="11.2" cy="8.6" r="0.7"/><circle cx="18.8" cy="8.6" r="0.7"/><circle cx="9.4" cy="15.8" r="0.7"/><circle cx="17.4" cy="15.8" r="0.7"/></g>',

  /** トロムソ。オーロラと、三角に尖った教会。 */
  arctic:
    '<path d="M0.6,24c3.2,-2.8 7.2,-4.2 11.4,-4.2S20.2,21.2 23.4,24z" fill="#dfe8f2"/>' +
    '<g fill="none" stroke-linecap="round"><path d="M1,7.4C3.6,2.2 7,0.2 10.4,0.8" stroke="#5fd0a0" stroke-width="2.2" opacity=".85"/>' +
    '<path d="M23,6.4C20.6,2 17.4,0.4 14.2,1" stroke="#8fe8c0" stroke-width="1.7" opacity=".75"/>' +
    '<path d="M2.6,11.4C4.4,7.4 6.6,5.6 8.8,5.4" stroke="#a88fd8" stroke-width="1.4" opacity=".6"/></g>' +
    '<path d="M12,3.4L20.6,21.4H3.4z" fill="#eef4f8"/>' +
    '<g stroke="#a8bccc" stroke-width="0.9" fill="none"><path d="M12,3.4V21.4M6.6,21.4L12,10M17.4,21.4L12,10M8.8,21.4L12,14.6M15.2,21.4L12,14.6"/></g>' +
    '<path d="M12,11.4L17.4,21.4H6.6z" fill="#3f6f9f"/>' +
    '<g fill="#eef4f8"><rect x="11.5" y="12" width="1" height="9.4"/><rect x="8.4" y="15.4" width="7.2" height="1"/></g>' +
    '<path d="M12,3.4V1M10.4,1.8h3.2" stroke="#4a5568" stroke-width="1.1"/>' +
    '<rect x="1.6" y="21" width="20.8" height="1.4" fill="#b8c8d4"/>',

  /**
   * ナルヴィク。1940年の海戦。**重い題材。**
   * 傾いた沈船と、岸の十字の標だけを置き、炎や人は描かない。
   */
  battle:
    '<rect x="0.6" y="12.4" width="22.8" height="11.6" fill="#2f5570"/>' +
    '<g stroke="#4a7f9a" stroke-width="1.1" opacity=".8" fill="none"><path d="M1.4,15h6M12,17.6h6.4M2.4,20.4h7M14,21.6h8"/></g>' +
    '<g transform="rotate(-26 10 16)">' +
    '<path d="M2.4,13.6h13.6l-1.6,4.4H4z" fill="#3a3f47"/>' +
    '<rect x="2.4" y="11.8" width="13.6" height="2" fill="#5f666e"/>' +
    '<rect x="8.4" y="3" width="1.4" height="8.8" fill="#4a4f58"/>' +
    '<path d="M4.6,5.4h8.6v1.4H4.6z" fill="#4a4f58"/>' +
    '</g>' +
    '<path d="M0.6,20.6c3.4,-1.4 6.4,-1.4 8.6,0z" fill="#1f3f56"/>' +
    '<path d="M16.4,22.4c1.6,-4.4 4.6,-6.4 7,-6.4v8z" fill="#6b6f68"/>' +
    '<g fill="#c0b8a6"><rect x="19" y="8.4" width="2.2" height="12"/><rect x="16.8" y="10.6" width="6.6" height="2.2"/></g>' +
    '<path d="M19,8.4l1.1,-1.8 1.1,1.8z" fill="#a89f8c"/>',

  /** アルタ。岩に刻まれた図像。 */
  rockart:
    '<path d="M0.8,24V6.4C0.8,3.2 5.8,0.8 12,0.8s11.2,2.4 11.2,5.6V24z" fill="#8a857a"/>' +
    '<g stroke="#77725f" stroke-width="0.8" opacity=".8" fill="none"><path d="M2.4,8.4c5.4,-1.6 13.4,-1.2 19.2,0.8"/><path d="M1.4,16.6c6.4,-1.4 14.6,-1 21.2,1"/><path d="M8.4,1.6l1,5.4"/></g>' +
    '<g fill="#a8483a">' +
    '<path d="M2.6,10.6h10.4v3.6H2.6z"/><rect x="3" y="13.8" width="1.8" height="5"/><rect x="6.4" y="13.8" width="1.8" height="5"/><rect x="9.4" y="13.8" width="1.8" height="5"/><rect x="12" y="13.8" width="1.8" height="5"/>' +
    '<path d="M12.6,11l3.6,-3.4 2,1.6 -3.4,3.6z"/></g>' +
    '<g stroke="#a8483a" stroke-width="1.6" fill="none" stroke-linecap="round"><path d="M16.4,7.6L15.4,2.4l-3.4,1.6"/><path d="M16.4,7.6L20.4,3.4l2.6,1.4"/></g>' +
    '<g fill="#a8483a"><path d="M4,21.8c2.6,-2.6 10.6,-2.6 13.2,0c-2.6,1.8 -10.6,1.8 -13.2,0z"/>' +
    '<rect x="6.4" y="17.6" width="1.4" height="4"/><rect x="10.2" y="17" width="1.4" height="4.6"/><rect x="14" y="17.6" width="1.4" height="4"/>' +
    '<circle cx="7.1" cy="16.6" r="1.2"/><circle cx="10.9" cy="16" r="1.2"/><circle cx="14.7" cy="16.6" r="1.2"/></g>',

  /**
   * ハンメルフェスト。焼け跡に一本だけ立つ電灯柱。
   * **重い題材。**残ったのは基礎の輪郭と灯りひとつ、という事実だけを示す。
   */
  totaldestruction:
    '<rect x="0.6" y="0.6" width="22.8" height="16.4" fill="#5f6b78"/>' +
    '<rect x="0.6" y="17" width="22.8" height="7" fill="#e4ecf4"/>' +
    '<g stroke="#8fa0ae" stroke-width="1.4" fill="none"><rect x="1.4" y="18.6" width="8" height="4.2"/><rect x="14" y="19.8" width="8.4" height="3"/></g>' +
    '<g fill="#c4d2de"><rect x="1.4" y="21.6" width="8" height="1.2"/><rect x="14" y="21.8" width="8.4" height="1"/></g>' +
    '<rect x="9.4" y="3.4" width="3.4" height="15.4" fill="#2e333c"/>' +
    '<path d="M11,3.6h6.6" stroke="#2e333c" stroke-width="2.4"/>' +
    '<path d="M14.6,4.6h6.4l-1.6,5h-3.2z" fill="#f8e0a0"/>' +
    '<circle cx="17.8" cy="8" r="5.4" fill="#f5b31c" opacity=".3"/>' +
    '<g fill="#7a8894"><path d="M3.6,18.6l1.8,-2.4 1.6,2.4z"/><path d="M18,19.8l1.4,-2 1.4,2z"/></g>',

  /** ホニングスヴォーグ。ぽつんと残る木造教会。 */
  survivingchurch:
    '<path d="M0.6,24c3,-1.8 6.8,-2.6 11.4,-2.6S20.4,22.2 23.4,24z" fill="#e4ecf4"/>' +
    '<rect x="6.4" y="11.4" width="11.2" height="10.6" fill="#f0ece0"/>' +
    '<path d="M5,11.4L12,5.4L19,11.4z" fill="#4a4a52"/>' +
    '<rect x="10.2" y="2.8" width="3.6" height="8.6" fill="#f0ece0"/>' +
    '<path d="M9.2,2.8L12,0.4L14.8,2.8z" fill="#4a4a52"/>' +
    '<path d="M12,0.4v-1.6M10.8,-0.8h2.4" stroke="#4a4a52" stroke-width="1"/>' +
    '<g fill="#4a5f7a"><path d="M8,18.4v-2.6a1.8,1.8 0 0 1 3.6,0v2.6z"/><path d="M13.4,18.4v-2.6a1.8,1.8 0 0 1 3.6,0v2.6z"/><rect x="11" y="6.4" width="2" height="2.6"/></g>' +
    '<path d="M10.2,22v-2.6a1.8,1.8 0 0 1 3.6,0V22z" fill="#5a4630"/>' +
    '<g stroke="#d8d2c4" stroke-width="0.6" fill="none"><path d="M6.4,14h11.2M6.4,17h11.2M6.4,20h11.2"/></g>',

  /** シルケネス。鉱石の索道とゴンドラ。 */
  orebridge:
    '<rect x="0.6" y="20.4" width="22.8" height="3.6" fill="#dfe6ec"/>' +
    '<path d="M2.6,20.4L5.4,2.6h3.2l2.8,17.8h-2.4L7,7.4l-2,13z" fill="#6b7078"/>' +
    '<g stroke="#6b7078" stroke-width="1" fill="none"><path d="M4.4,14.4h5.2M5,10h4M5.6,6.4h2.8"/></g>' +
    '<g stroke="#4a4f58" stroke-width="1" fill="none"><path d="M0.6,4.4L23.4,8.4M0.6,7.6L23.4,11.6"/></g>' +
    '<path d="M16.4,10l0.6,2.6" stroke="#4a4f58" stroke-width="1.1"/>' +
    '<path d="M13.4,12.4h7.4l-1.2,6.4h-5z" fill="#5a4a40"/>' +
    '<path d="M14,13h6.2l-0.4,1.8h-5.4z" fill="#8a4a3a"/>' +
    '<g fill="#7a4235"><circle cx="15.8" cy="13.4" r="0.9"/><circle cx="18.4" cy="13.2" r="0.9"/></g>' +
    '<path d="M13.4,12.4l3.4,-2.2 3.6,2.2z" fill="#4a4038"/>',

  /** カラショーク。角が背より高く出たトナカイ。 */
  sami:
    '<path d="M0.6,24c3.4,-2 7.4,-3 11.4,-3s8,1 11.4,3z" fill="#e4ecf4"/>' +
    '<path d="M16.4,22.4L20.4,9.4L23.6,22.4z" fill="#8a7a5f"/>' +
    '<path d="M18.4,22.4L20.4,13.6L22,22.4z" fill="#7a6a52"/>' +
    '<g stroke="#5a4630" stroke-width="0.8" fill="none"><path d="M20.4,9.4l-1.4,-2M20.4,9.4l1.6,-2"/></g>' +
    '<ellipse cx="9" cy="14.4" rx="7.4" ry="3.8" fill="#8a7258"/>' +
    '<g fill="#8a7258"><rect x="3.6" y="14.4" width="1.8" height="7.4"/><rect x="6.8" y="14.4" width="1.8" height="7.4"/><rect x="10.8" y="14.4" width="1.8" height="7.4"/><rect x="13.6" y="14.4" width="1.8" height="7.4"/></g>' +
    '<path d="M14.4,12.6l3.2,-6.4 2.2,1 -2.6,6.4z" fill="#8a7258"/>' +
    '<path d="M16.6,6.6l4.6,-1.4 0.6,2.4 -4.4,1.4z" fill="#9a8266"/>' +
    '<ellipse cx="2.4" cy="13.8" rx="1.8" ry="1.4" fill="#e4e0d6"/>' +
    '<circle cx="20" cy="6.4" r="0.7" fill="#2f2820"/>' +
    '<g stroke="#5a4630" stroke-width="1.2" fill="none" stroke-linecap="round">' +
    '<path d="M17.6,5.4L16,0.8l-3,1.6"/><path d="M16.6,3l-2.8,-0.6"/>' +
    '<path d="M19.4,5.2L21.6,1l2.2,1"/><path d="M20.6,2.8l2.4,-0.4"/></g>',

  /** クリスチャンサン。直交する街路の町割り。 */
  gridtown:
    '<rect x="0.6" y="0.6" width="22.8" height="23.4" fill="#8a8578"/>' +
    '<g fill="#e0d8c4"><rect x="1.6" y="1.6" width="5.6" height="5"/><rect x="9.2" y="1.6" width="5.6" height="5"/><rect x="16.8" y="1.6" width="5.6" height="5"/>' +
    '<rect x="1.6" y="8.6" width="5.6" height="5"/><rect x="9.2" y="8.6" width="5.6" height="5"/><rect x="16.8" y="8.6" width="5.6" height="5"/>' +
    '<rect x="1.6" y="15.6" width="5.6" height="4.4"/><rect x="9.2" y="15.6" width="5.6" height="4.4"/><rect x="16.8" y="15.6" width="5.6" height="4.4"/></g>' +
    '<g fill="#a8382e"><rect x="1.6" y="1.6" width="5.6" height="1.6"/><rect x="16.8" y="8.6" width="5.6" height="1.6"/><rect x="9.2" y="15.6" width="5.6" height="1.6"/></g>' +
    '<g fill="#4a4a52"><rect x="9.2" y="1.6" width="5.6" height="1.6"/><rect x="1.6" y="8.6" width="5.6" height="1.6"/><rect x="16.8" y="1.6" width="5.6" height="1.6"/><rect x="9.2" y="8.6" width="5.6" height="1.6"/><rect x="1.6" y="15.6" width="5.6" height="1.6"/><rect x="16.8" y="15.6" width="5.6" height="1.6"/></g>' +
    '<rect x="0.6" y="20.4" width="22.8" height="3.6" fill="#3f7f9a"/>' +
    '<path d="M8.4,21h7l-1,2h-5z" fill="#3a2f24"/><rect x="11.4" y="18.4" width="0.9" height="2.6" fill="#5a4630"/>',

  /** アーレンダル。停泊する帆船隊。 */
  shipping:
    '<rect x="0.6" y="17.4" width="22.8" height="6.6" fill="#3f7f9a"/>' +
    '<g stroke="#9fd4e8" stroke-width="1" fill="none"><path d="M1.4,20h5M9,21.4h5M17,19.6h5.4"/></g>' +
    '<g><path d="M9.6,17.6h11.6l-1.8,3.2H11z" fill="#3a2f24"/>' +
    '<rect x="12.6" y="2.6" width="1.2" height="15" fill="#5a4630"/><rect x="18" y="6.4" width="1" height="11.2" fill="#5a4630"/>' +
    '<path d="M14,4h5v5.4h-5z" fill="#f0ece0"/><path d="M14,10.6h5v5.4h-5z" fill="#e8e4d8"/>' +
    '<path d="M19.4,7.8h3.4v4h-3.4z" fill="#f0ece0"/><path d="M19.4,12.8h3.4v3.6h-3.4z" fill="#e8e4d8"/>' +
    '<path d="M13.2,2.6h3.4v1.6h-3.4z" fill="#c0453c"/></g>' +
    '<g><path d="M0.8,16.4h9.4l-1.4,2.6H2z" fill="#3a2f24"/>' +
    '<rect x="4.4" y="6.4" width="1" height="10" fill="#5a4630"/>' +
    '<path d="M5.6,7.8h4v3.6h-4z" fill="#f0ece0"/><path d="M5.6,12.4h4v3.4h-4z" fill="#e0d8c4"/>' +
    '<path d="M4.4,7.8L1.2,15.8H0.6c0,-3.6 1.4,-6.4 3.8,-8z" fill="#f0ece0"/></g>' +
    '<g><path d="M2.6,13.4h5.6l-0.8,1.6H3.4z" fill="#4a4038"/><rect x="5" y="8.4" width="0.7" height="5" fill="#5a4630"/><path d="M5.7,9h2.6v3.4h-2.6z" fill="#e8e4d8"/></g>',

  /** グリムスタ/シーエン。羽根ペンとインク壺、そして仮面。 */
  playwright:
    '<path d="M3.4,24l-0.8,-6.4h8L9.8,24z" fill="#2f3a48"/>' +
    '<rect x="1.8" y="15.6" width="9.6" height="2.4" rx="0.8" fill="#3f4a58"/>' +
    '<path d="M4.4,17.6h4.4v-1.6h-4.4z" fill="#1c222b"/>' +
    '<path d="M7.4,16.6C9.4,9.6 14,4 21.4,0.6c0.8,7 -3,13.4 -10,17.4z" fill="#f0ece0"/>' +
    '<path d="M9.6,15.2C11.4,9.8 15,5.4 20.6,2.4c0.4,5.4 -3,10.4 -8.4,13.4z" fill="#dcd8cc"/>' +
    '<g stroke="#b8b4a8" stroke-width="0.6" fill="none"><path d="M11,14.4l6,-9M13,15l6.4,-8M9.8,12.4l6.4,-8.6"/></g>' +
    '<path d="M7.4,16.6l-2,2.6 2.6,-0.8z" fill="#3a3228"/>' +
    '<path d="M14.6,24c-2,-3 -1.6,-7.4 1.2,-9c2.6,-1.6 5.8,-0.4 6.8,2c1,2.6 -0.4,5.8 -2.6,7z" fill="#e8d8b0"/>' +
    '<g fill="#3a3228"><ellipse cx="17" cy="17.6" rx="1.4" ry="1"/><ellipse cx="20.6" cy="17.2" rx="1.4" ry="1"/><path d="M16.4,21c1.8,1.4 3.8,1.2 5.2,-0.4c-1.8,-0.2 -3.6,0 -5.2,0.4z"/></g>',

  /** マンダル。赤白の灯台。 */
  lighthouse:
    '<path d="M0.6,24c3,-3.4 6.8,-5 11.4,-5s8.4,1.6 11.4,5z" fill="#8a8578"/>' +
    '<path d="M8.4,20.4L9.6,5.6h4.8l1.2,14.8z" fill="#f0ece0"/>' +
    '<g fill="#c0453c"><path d="M9.2,9h5.6l0.2,3h-6z"/><path d="M8.8,15h6.4l0.2,3H8.6z"/></g>' +
    '<rect x="7.8" y="4" width="8.4" height="1.8" fill="#4a4f58"/>' +
    '<rect x="9.4" y="0.8" width="5.2" height="3.4" fill="#f5b31c"/>' +
    '<g stroke="#4a4f58" stroke-width="0.9" fill="none"><path d="M11.2,0.8v3.4M12.8,0.8v3.4"/></g>' +
    '<path d="M8.6,0.8h6.8L12,-1.4z" fill="#3f434a"/>' +
    '<path d="M15,1.4L23.4,-0.6v6z" fill="#f5b31c" opacity=".4"/>' +
    '<path d="M17.4,20.4v-3.4a2.8,2.8 0 0 1 5.6,0v3.4z" fill="#e8e4d8"/>' +
    '<path d="M16.8,17.2a3.4,3.4 0 0 1 6.8,0z" fill="#8a3a34"/>' +
    '<rect x="0.6" y="21.8" width="22.8" height="2.2" fill="#3f7f9a"/>',

  /** エーゲルスン。缶詰の缶。 */
  cannery:
    '<ellipse cx="12" cy="22" rx="8.4" ry="2" fill="#7a7468"/>' +
    '<path d="M4.4,8.8v11.6a7.6,2.8 0 0 0 15.2,0V8.8z" fill="#b0b6c0"/>' +
    '<path d="M4.4,12.2v5.4a7.6,2.8 0 0 0 15.2,0v-5.4a7.6,2.8 0 0 1 -15.2,0z" fill="#c0453c"/>' +
    '<g fill="#f0ece0"><rect x="4.4" y="13.4" width="15.2" height="1"/><rect x="4.4" y="16" width="15.2" height="1"/></g>' +
    '<ellipse cx="12" cy="8.8" rx="7.6" ry="2.8" fill="#cfd6de"/>' +
    '<ellipse cx="12" cy="8.8" rx="5.4" ry="1.8" fill="#7f8a96"/>' +
    '<path d="M4.6,7.6C6.6,3.4 15,2.4 19.6,5.6l-1.4,1.8C14.4,5 7.8,5.6 6,8z" fill="#dfe4ea"/>' +
    '<path d="M19.6,5.6l2.6,-2.6 1.2,1.4 -2.4,3z" fill="#cfd6de"/>' +
    fish(12, 8.6, 0.42, "#8a94a0"),

  /** サンネス。青い模様の陶器。 */
  ceramics:
    '<ellipse cx="12" cy="23" rx="9.4" ry="1.4" fill="#6b6f68"/>' +
    '<ellipse cx="19" cy="15.4" rx="4.4" ry="7.4" fill="#d8d0bc"/>' +
    '<ellipse cx="19" cy="15.4" rx="2.8" ry="5.4" fill="#f0ece0"/>' +
    '<path d="M19,10.6a1.6,1.6 0 0 1 0,9.6a1.6,1.6 0 0 1 0,-9.6z" fill="#1f4f8f"/>' +
    '<path d="M4.6,22.6c-2.4,-6 -1.8,-12 1.2,-15.6L5.4,3.4h9.4l-0.4,3.6c3,3.6 3.6,9.6 1.2,15.6z" fill="#dfe8ee"/>' +
    '<path d="M5,3.4h9.8V1.4H5z" fill="#b8c4cc"/>' +
    '<path d="M14.8,9.6c3,0.6 3.6,5 0.4,7l-1,-2.2c1.4,-1 1.2,-2.8 -0.6,-3.2z" fill="#cfd8e0"/>' +
    '<g fill="#1f4f8f"><rect x="4" y="10.4" width="12.2" height="2"/><rect x="3.6" y="18.4" width="13" height="1.8"/>' +
    '<circle cx="6.6" cy="15" r="1.6"/><circle cx="10.2" cy="14.4" r="1.6"/><circle cx="13.6" cy="15" r="1.6"/></g>',

  /** トンスベルグ。ドラッカルの舳先と盾。 */
  vikingtown:
    '<rect x="0.6" y="21" width="22.8" height="3" fill="#2f6f8f"/>' +
    '<g stroke="#7fc0d8" stroke-width="1" fill="none"><path d="M1.4,22.6h6M14,23h8"/></g>' +
    '<path d="M1.6,15.4h21.8c-1.6,4 -5.4,6 -10.4,6S3.2,19.4 1.6,15.4z" fill="#6b4a30"/>' +
    '<g stroke="#4f3722" stroke-width="0.7" fill="none"><path d="M2.6,17.4h19.4M4.4,19.4h16"/></g>' +
    '<path d="M2.4,16.2C0.6,11 1.4,5.4 5,1c1.4,1 1.6,2.6 1,4c-2.2,4 -2.6,8 -1.4,11.2z" fill="#4f3722"/>' +
    '<path d="M5,1c1.4,-1.6 3.4,-1.6 4.6,-0.2L7.4,2l1.6,1L5.4,4.4z" fill="#7a5a3a"/>' +
    '<circle cx="6.6" cy="1.8" r="0.7" fill="#f5b31c"/>' +
    '<g><circle cx="5.4" cy="15.2" r="2.6" fill="#c0453c"/><circle cx="10.6" cy="15.2" r="2.6" fill="#f0ece0"/><circle cx="15.8" cy="15.2" r="2.6" fill="#2f5f9f"/><circle cx="21" cy="15.2" r="2.4" fill="#f5b31c"/></g>' +
    '<g fill="#8a8578"><circle cx="5.4" cy="15.2" r="0.8"/><circle cx="10.6" cy="15.2" r="0.8"/><circle cx="15.8" cy="15.2" r="0.8"/><circle cx="21" cy="15.2" r="0.8"/></g>' +
    '<rect x="12.4" y="3.4" width="1.2" height="11.4" fill="#5a4630"/>' +
    '<path d="M13.6,4.4h8.4v7.4h-8.4z" fill="#e0d8c4"/>' +
    '<g fill="#c0453c"><rect x="13.6" y="5.8" width="8.4" height="1.4"/><rect x="13.6" y="8.8" width="8.4" height="1.4"/></g>',
};
