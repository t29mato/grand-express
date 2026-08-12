/**
 * ドイツの都市イラスト。
 *
 * `GERMANY_MARKS` は24×24の座標系に描くシンボル、`GERMANY_BG` は400×210の
 * 座標系に描く背景シーン(いずれもSVG断片の文字列)。韓国・フランス・茨城と
 * 同じく最初から文字列として持つ。動きは含めない(アニメーションはReact側で重ねる)。
 *
 * 色は他の盤面と揃える。空 #8fc4e8〜#cfe4f0、顔・白 #f6efe2、
 * 強調 #f5b31c/#e8443f/#5b8fe8。ドイツらしさは
 * **木組み(ファハヴェルク)の濃茶 #4a3826・漆喰の白 #f2ead8・赤煉瓦 #8a3a2a・
 * 玉ねぎ屋根の濃紺 #2a4a5a・国旗の黒赤金・アルプスの花崗岩 #8b8f98** で出す。
 *
 * 鍵は `cities.mjs` の `mark` / `bg` と一対一で対応する(26種・25種)。
 * 増やすときは両方を揃えること。
 *
 * **背景SVGの中央25%(x=151〜249 / y=54〜152)は都市シンボルに隠れて
 * 見えない。** 見せたい細部は左右3分の1と手前(y>170)に置く。
 * `sky()` は必ず第3引数(次に来る塗りの開始y)を渡すこと。渡し忘れると
 * 空と地面のあいだに塗り残しの帯ができる(ibaraki・korea両方で実際に起きた)。
 *
 * 密度の目安は1背景あたり40要素(韓国27・茨城30・フランス98)。
 * `windowGrid` `halftimberHouse` `crowdDots` のように、1回の呼び出しで
 * 複数の図形を返す部品を多用して密度を稼いでいる。
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
 * 既定では y=124 までしか塗らないので、地面が y=128 から始まるシーンでは
 * あいだの4行が塗り残しになる。
 */
function sky(top = "#8fc4e8", bottom = "#cfe4f0", to = 124) {
  return band(0, 92, top) + band(84, Math.max(0, to - 84), bottom);
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

/** 遠景のなだらかな丘。 */
function hills(y, fill, count = 4) {
  const parts = [];
  for (let i = 0; i < count; i++) {
    const cx = 40 + (i * W) / count;
    parts.push(`<path d="M${cx - 74},${y}c22,-30 52,-30 74,0z" fill="${fill}"/>`);
  }
  return `<g opacity=".9">${parts.join("")}</g>`;
}

/** かもめ。 */
function gull(x, y, scale = 1) {
  const w = 8 * scale;
  return `<path d="M${r1(x - w)},${y}q${r1(w / 2)},-6 ${w},0q${r1(w / 2)},-6 ${w},0" fill="none" stroke="#4a4a52" stroke-width="1.4"/>`;
}

/** 起重機(港のクレーン)。 */
function crane(x, base, h, fill = "#e8443f") {
  return (
    `<rect x="${r1(x - 2)}" y="${r1(base - h)}" width="4" height="${h}" fill="${fill}"/>` +
    `<rect x="${r1(x - 2)}" y="${r1(base - h)}" width="${r1(h * 0.72)}" height="4" fill="${fill}"/>` +
    `<line x1="${r1(x + h * 0.6)}" y1="${r1(base - h + 2)}" x2="${r1(x + h * 0.6)}" y2="${r1(base - h * 0.55)}" stroke="${fill}" stroke-width="2"/>`
  );
}

/** 針葉樹(シュヴァルツヴァルト・ハルツ)。 */
function pine(x, base, h, fill = "#2f5f3f") {
  const w = r1(h * 0.6);
  return (
    `<rect x="${r1(x - 2)}" y="${r1(base - 8)}" width="4" height="8" fill="#5a4630"/>` +
    `<path d="M${r1(x - w / 2)},${r1(base - h * 0.32)}L${x},${r1(base - h * 0.62)}L${r1(x + w / 2)},${r1(base - h * 0.32)}z" fill="${fill}"/>` +
    `<path d="M${r1(x - w * 0.42)},${r1(base - h * 0.6)}L${x},${r1(base - h * 0.86)}L${r1(x + w * 0.42)},${r1(base - h * 0.6)}z" fill="${fill}"/>` +
    `<path d="M${r1(x - w * 0.3)},${r1(base - h * 0.84)}L${x},${r1(base - h)}L${r1(x + w * 0.3)},${r1(base - h * 0.84)}z" fill="${fill}"/>`
  );
}

/** 丸い樹冠の広葉樹。 */
function roundTree(x, base, r, crown = "#3f8f4f", trunk = "#6b5330") {
  const th = r1(r * 1.1);
  return (
    `<rect x="${r1(x - r * 0.16)}" y="${r1(base - th - r * 0.3)}" width="${r1(r * 0.32)}" height="${r1(th + r * 0.3)}" fill="${trunk}"/>` +
    `<circle cx="${x}" cy="${r1(base - th - r * 0.5)}" r="${r}" fill="${crown}"/>`
  );
}

/** 波の反射線・水面。 */
function ripples(y, color = "#bfe8f4") {
  return `<g stroke="${color}" stroke-width="2" opacity=".7" fill="none"><path d="M26,${y}h74M176,${y + 12}h92M108,${y + 24}h62"/></g>`;
}

/**
 * 木組みの家(ファハヴェルク)。壁・切妻屋根・枠の梁・筋交い・窓2つで
 * 1回の呼び出しから9要素前後を生む、この盤面の視覚の核。
 */
function halftimberHouse(x, base, w, h, wall = "#f2ead8", frame = "#4a3826", roof = "#7a3a2a") {
  const hw = r1(w / 2);
  return (
    `<rect x="${r1(x - hw)}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${wall}"/>` +
    `<path d="M${r1(x - hw - 6)},${r1(base - h)}L${x},${r1(base - h - h * 0.55)}L${r1(x + hw + 6)},${r1(base - h)}z" fill="${roof}"/>` +
    `<rect x="${r1(x - hw)}" y="${r1(base - h)}" width="${w}" height="${h}" fill="none" stroke="${frame}" stroke-width="2.4"/>` +
    `<line x1="${r1(x - hw / 3)}" y1="${r1(base - h)}" x2="${r1(x - hw / 3)}" y2="${base}" stroke="${frame}" stroke-width="2"/>` +
    `<line x1="${r1(x + hw / 3)}" y1="${r1(base - h)}" x2="${r1(x + hw / 3)}" y2="${base}" stroke="${frame}" stroke-width="2"/>` +
    `<line x1="${r1(x - hw)}" y1="${base}" x2="${r1(x - hw / 3)}" y2="${r1(base - h * 0.5)}" stroke="${frame}" stroke-width="2"/>` +
    `<line x1="${r1(x + hw)}" y1="${base}" x2="${r1(x + hw / 3)}" y2="${r1(base - h * 0.5)}" stroke="${frame}" stroke-width="2"/>` +
    `<rect x="${r1(x - hw / 3 - 5)}" y="${r1(base - h * 0.65)}" width="8" height="10" fill="#2f5f6f"/>` +
    `<rect x="${r1(x + hw / 3 - 3)}" y="${r1(base - h * 0.65)}" width="8" height="10" fill="#2f5f6f"/>`
  );
}

/** ゴシックの双塔(ケルン大聖堂ふう)。 */
function gothicTwinSpire(x, base, w, h, fill = "#8a8a8a") {
  const hw = r1(w / 2);
  return (
    `<rect x="${r1(x - hw - 4)}" y="${r1(base - h * 0.7)}" width="14" height="${r1(h * 0.7)}" fill="${fill}"/>` +
    `<rect x="${r1(x + hw - 10)}" y="${r1(base - h * 0.7)}" width="14" height="${r1(h * 0.7)}" fill="${fill}"/>` +
    `<path d="M${r1(x - hw - 4)},${r1(base - h * 0.7)}L${r1(x - hw + 3)},${r1(base - h)}L${r1(x - hw + 10)},${r1(base - h * 0.7)}z" fill="${fill}"/>` +
    `<path d="M${r1(x + hw - 10)},${r1(base - h * 0.7)}L${r1(x + hw - 3)},${r1(base - h)}L${r1(x + hw + 4)},${r1(base - h * 0.7)}z" fill="${fill}"/>` +
    `<rect x="${r1(x - hw + 10)}" y="${r1(base - h * 0.42)}" width="${r1(w - 20)}" height="${r1(h * 0.42)}" fill="${fill}"/>` +
    `<circle cx="${x}" cy="${r1(base - h * 0.3)}" r="6" fill="#2f5f6f"/>` +
    `<rect x="${r1(x - hw + 1)}" y="${r1(base - h * 0.55)}" width="3" height="14" fill="#2f5f6f"/>` +
    `<rect x="${r1(x + hw - 7)}" y="${r1(base - h * 0.55)}" width="3" height="14" fill="#2f5f6f"/>`
  );
}

/** 玉ねぎ屋根の塔(バイエルンの教会)。 */
function onionTower(x, base, w, h, roof = "#2a4a5a", wall = "#e8dcc0") {
  const hw = r1(w / 2);
  return (
    `<rect x="${r1(x - hw)}" y="${r1(base - h * 0.55)}" width="${w}" height="${r1(h * 0.55)}" fill="${wall}"/>` +
    `<path d="M${r1(x - hw - 2)},${r1(base - h * 0.55)}C${r1(x - hw - 2)},${r1(base - h * 0.8)} ${r1(x - hw * 0.6)},${r1(base - h * 0.78)} ${r1(x - hw * 0.5)},${r1(base - h * 0.92)}C${r1(x - hw * 0.4)},${r1(base - h)} ${x},${r1(base - h)} ${x},${r1(base - h * 1.02)}C${x},${r1(base - h)} ${r1(x + hw * 0.4)},${r1(base - h)} ${r1(x + hw * 0.5)},${r1(base - h * 0.92)}C${r1(x + hw * 0.6)},${r1(base - h * 0.78)} ${r1(x + hw + 2)},${r1(base - h * 0.8)} ${r1(x + hw + 2)},${r1(base - h * 0.55)}z" fill="${roof}"/>` +
    `<circle cx="${x}" cy="${r1(base - h * 1.06)}" r="3" fill="#f4c430"/>` +
    `<line x1="${x}" y1="${r1(base - h * 1.1)}" x2="${x}" y2="${r1(base - h * 1.18)}" stroke="#f4c430" stroke-width="2"/>` +
    `<line x1="${r1(x - 3)}" y1="${r1(base - h * 1.14)}" x2="${r1(x + 3)}" y2="${r1(base - h * 1.14)}" stroke="#f4c430" stroke-width="2"/>` +
    `<rect x="${r1(x - 4)}" y="${r1(base - h * 0.35)}" width="8" height="12" fill="#2f5f6f"/>`
  );
}

/** 煉瓦の門塔(ハンザ都市。ホルステン門・シュトラールズントの門ふう)。 */
function brickGate(x, base, w, h, fill = "#8a3a2a") {
  const hw = r1(w / 2);
  const towerW = r1(w * 0.32);
  return (
    `<rect x="${r1(x - hw)}" y="${r1(base - h * 0.85)}" width="${towerW}" height="${r1(h * 0.85)}" fill="${fill}"/>` +
    `<rect x="${r1(x + hw - towerW)}" y="${r1(base - h * 0.85)}" width="${towerW}" height="${r1(h * 0.85)}" fill="${fill}"/>` +
    `<path d="M${r1(x - hw - 3)},${r1(base - h * 0.85)}L${r1(x - hw + towerW / 2)},${r1(base - h)}L${r1(x - hw + towerW + 3)},${r1(base - h * 0.85)}z" fill="#4a4a52"/>` +
    `<path d="M${r1(x + hw - towerW - 3)},${r1(base - h * 0.85)}L${r1(x + hw - towerW / 2)},${r1(base - h)}L${r1(x + hw + 3)},${r1(base - h * 0.85)}z" fill="#4a4a52"/>` +
    `<rect x="${r1(x - hw + towerW)}" y="${r1(base - h * 0.42)}" width="${r1(w - 2 * towerW)}" height="${r1(h * 0.42)}" rx="${r1((w - 2 * towerW) / 2)}" fill="${fill}"/>` +
    `<circle cx="${r1(x - hw + towerW / 2)}" cy="${r1(base - h * 0.5)}" r="4" fill="#2f2015"/>` +
    `<circle cx="${r1(x + hw - towerW / 2)}" cy="${r1(base - h * 0.5)}" r="4" fill="#2f2015"/>`
  );
}

/** 城の丸塔(円錐屋根・小旗つき)。 */
function roundTurret(x, base, w, h, wall = "#9a9488", roof = "#5a3a2a") {
  const r = r1(w / 2);
  return (
    `<rect x="${r1(x - r)}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${wall}"/>` +
    `<path d="M${r1(x - r - 3)},${r1(base - h)}L${x},${r1(base - h - h * 0.5)}L${r1(x + r + 3)},${r1(base - h)}z" fill="${roof}"/>` +
    `<line x1="${x}" y1="${r1(base - h - h * 0.5)}" x2="${x}" y2="${r1(base - h - h * 0.65)}" stroke="#4a4a52" stroke-width="1.5"/>` +
    `<path d="M${x},${r1(base - h - h * 0.65)}l8,3l-8,3z" fill="#d21f3c"/>` +
    `<rect x="${r1(x - 3)}" y="${r1(base - h * 0.4)}" width="6" height="10" fill="#2f2015"/>`
  );
}

/** ローマ時代の石門(ポルタ・ニグラふう)。黒ずんだ石塊に2つの入口。 */
function romanGate(x, base, w, h, fill = "#5a5a52") {
  const hw = r1(w / 2);
  const parts = [
    `<rect x="${r1(x - hw)}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${fill}"/>`,
    `<rect x="${r1(x - hw * 0.55)}" y="${r1(base - h * 0.5)}" width="${r1(hw * 0.4)}" height="${r1(h * 0.5)}" rx="10" fill="#2f2a26"/>`,
    `<rect x="${r1(x + hw * 0.15)}" y="${r1(base - h * 0.5)}" width="${r1(hw * 0.4)}" height="${r1(h * 0.5)}" rx="10" fill="#2f2a26"/>`,
  ];
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 3; col++) {
      parts.push(
        `<rect x="${r1(x - hw + 6 + col * (w - 12) / 2.4)}" y="${r1(base - h * 0.9 + row * h * 0.18)}" width="8" height="10" fill="#2f2a26"/>`,
      );
    }
  }
  return parts.join("");
}

/** 窓の格子。1回の呼び出しで rows×cols 個の窓を生む(高層ビルなどの密度稼ぎ)。 */
function windowGrid(x, y, w, h, rows, cols, color = "#bfe0f0", opacity = 0.7) {
  const parts = [];
  const cw = w / cols;
  const ch = h / rows;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      parts.push(
        `<rect x="${r1(x + col * cw + cw * 0.15)}" y="${r1(y + row * ch + ch * 0.15)}" width="${r1(cw * 0.7)}" height="${r1(ch * 0.7)}" fill="${color}" opacity="${opacity}"/>`,
      );
    }
  }
  return parts.join("");
}

/** 市場・祭りの人だかり(小さな頭の点)。 */
function crowdDots(cx, cy, count, spread, color = "#4a3826") {
  const parts = [];
  for (let i = 0; i < count; i++) {
    const x = cx + Math.sin(i * 2.4) * spread;
    const y = cy + Math.cos(i * 1.7) * spread * 0.25;
    parts.push(`<circle cx="${r1(x)}" cy="${r1(y)}" r="3" fill="${color}"/>`);
  }
  return parts.join("");
}

/** 市場・祭りの三角テント。 */
function marketTent(x, base, w, h, fill) {
  const hw = r1(w / 2);
  return (
    `<path d="M${r1(x - hw)},${base}L${x},${r1(base - h)}L${r1(x + hw)},${base}z" fill="${fill}"/>` +
    `<rect x="${r1(x - hw)}" y="${r1(base - 4)}" width="${w}" height="4" fill="#4a3826"/>`
  );
}

/** 葡萄畑・段々畑の畝(横並びの丸い茂み)。 */
function shrubRow(x, y, count, gap, r, color) {
  const parts = [];
  for (let i = 0; i < count; i++) {
    parts.push(`<circle cx="${r1(x + i * gap)}" cy="${y}" r="${r}" fill="${color}"/>`);
  }
  return `<g opacity=".9">${parts.join("")}</g>`;
}

/** 花崗岩の山(アルプス)。 */
function graniteMountain(cx, base, h, fill = "#8b8f98") {
  const w = r1(h * 1.3);
  return (
    `<path d="M${r1(cx - w / 2)},${base}L${r1(cx - w * 0.12)},${r1(base - h)}L${r1(cx + w * 0.1)},${r1(base - h * 0.62)}L${r1(cx + w / 2)},${base}z" fill="${fill}"/>` +
    `<path d="M${r1(cx - w * 0.12)},${r1(base - h)}L${r1(cx - w * 0.02)},${r1(base - h * 0.8)}L${r1(cx + w * 0.04)},${r1(base - h * 0.86)}z" fill="#f2f6f8"/>`
  );
}

/** 白亜の断崖(リューゲン)。 */
function chalkCliff(x, base, w, h, fill = "#eae4d4") {
  return (
    `<path d="M${r1(x)},${base}L${r1(x)},${r1(base - h * 0.3)}L${r1(x + w * 0.3)},${r1(base - h * 0.7)}L${r1(x + w * 0.55)},${r1(base - h * 0.55)}L${r1(x + w * 0.8)},${r1(base - h)}L${r1(x + w)},${r1(base - h * 0.85)}L${r1(x + w)},${base}z" fill="${fill}"/>` +
    `<path d="M${r1(x + w * 0.3)},${r1(base - h * 0.7)}L${r1(x + w * 0.36)},${r1(base - h * 0.6)}L${r1(x + w * 0.24)},${r1(base - h * 0.58)}z" fill="#d8d0bc" opacity=".7"/>`
  );
}

/** 砂丘の草(ズュルト)。細い葉を数本まとめて描く。 */
function duneGrass(x, base, h) {
  const parts = [];
  for (let i = -2; i <= 2; i++) {
    parts.push(
      `<path d="M${r1(x + i * 2)},${base}q${i > 0 ? 3 : -3},-${r1(h * 0.6)} ${i}, -${h}" fill="none" stroke="#a8a860" stroke-width="1.4"/>`,
    );
  }
  return parts.join("");
}

/** 川舟・貨物はしけ。 */
function riverBarge(x, base, w, fill = "#6b5330") {
  const hw = r1(w / 2);
  return (
    `<path d="M${r1(x - hw)},${r1(base - 8)}L${r1(x - hw + 6)},${base}L${r1(x + hw - 6)},${base}L${r1(x + hw)},${r1(base - 8)}z" fill="${fill}"/>` +
    `<rect x="${r1(x - hw * 0.3)}" y="${r1(base - 16)}" width="${r1(hw * 0.6)}" height="8" fill="#4a3826"/>`
  );
}

/** ブドウ畑の畝(斜面に沿った横線)。 */
function vineyardRows(x, y, w, rows, color = "#7a9a4a") {
  const parts = [];
  for (let i = 0; i < rows; i++) {
    parts.push(`<path d="M${x},${r1(y + i * 6)}h${w}"/>`);
  }
  return `<g stroke="${color}" stroke-width="2.6" opacity=".85">${parts.join("")}</g>`;
}

// ---------------------------------------------------------------------------
// 都市シンボル(24×24)。26種。
// ---------------------------------------------------------------------------

export const GERMANY_MARKS = {
  capital:
    `<rect x="4" y="14" width="16" height="8" fill="#8b8f98"/>` +
    `<path d="M6,14a6,5 0 0 1 12,0z" fill="#bfe0f0" opacity=".85"/>` +
    `<rect x="11" y="4" width="2" height="7" fill="#d21f3c"/>`,
  cathedral: gothicTwinSpire(12, 22, 15, 18, "#8a8a8a"),
  dome:
    `<rect x="6" y="16" width="12" height="6" fill="#e8dcc0"/>` +
    `<path d="M5,16a7,6 0 0 1 14,0z" fill="#2a4a5a"/>` +
    `<circle cx="12" cy="9" r="1.6" fill="#f4c430"/>`,
  onion: onionTower(12, 22, 9, 15, "#2a4a5a", "#e8dcc0"),
  castle:
    `<rect x="5" y="12" width="14" height="10" fill="#9a9488"/>` +
    `<path d="M5,12v-4h3v2h2v-2h2v2h2v-2h2v2h2v-2h3v4z" fill="#9a9488"/>` +
    `<rect x="10" y="15" width="4" height="7" fill="#2f2015"/>`,
  fairytale:
    `<rect x="7" y="13" width="10" height="9" fill="#e8dcc0"/>` +
    `<path d="M6,13L11,4L13,8L16,3L18,13z" fill="#3a5a3a"/>` +
    `<rect x="10" y="16" width="4" height="6" fill="#2f2015"/>`,
  halftimber: halftimberHouse(12, 22, 15, 13, "#f2ead8", "#4a3826", "#7a3a2a"),
  bridge:
    `<rect x="2" y="18" width="20" height="3" fill="#8a8478"/>` +
    `<path d="M6,18a6,7 0 0 1 12,0z" fill="none" stroke="#8a8478" stroke-width="2.2"/>` +
    `<rect x="3" y="16" width="2" height="5" fill="#8a8478"/>` +
    `<rect x="19" y="16" width="2" height="5" fill="#8a8478"/>`,
  port:
    `<rect x="3" y="20" width="2" height="-10" fill="#e8443f"/>` +
    `<rect x="3" y="10" width="10" height="2" fill="#e8443f"/>` +
    `<line x1="11" y1="10" x2="11" y2="15" stroke="#e8443f" stroke-width="1.6"/>` +
    `<path d="M14,18l6,0l-2,4l-4,0z" fill="#5b8fe8"/>`,
  gatehouse: brickGate(12, 22, 15, 12, "#8a3a2a"),
  statue:
    `<rect x="8" y="18" width="8" height="4" fill="#8b8f98"/>` +
    `<circle cx="12" cy="12" r="3" fill="#7a8068"/>` +
    `<rect x="10" y="14" width="4" height="4" fill="#7a8068"/>`,
  skyline:
    `<rect x="3" y="10" width="4" height="12" fill="#7f8896"/>` +
    `<rect x="9" y="4" width="5" height="18" fill="#7f8896"/>` +
    `<rect x="16" y="12" width="4" height="10" fill="#7f8896"/>` +
    windowGrid(9, 6, 5, 14, 4, 1, "#bfe0f0", 0.8),
  industry:
    `<rect x="5" y="14" width="14" height="8" fill="#7a7468"/>` +
    `<rect x="8" y="4" width="3" height="12" fill="#5a5450"/>` +
    `<ellipse cx="9.5" cy="4" rx="3" ry="1.6" fill="#c8c4bc" opacity=".8"/>`,
  music:
    `<circle cx="8" cy="18" r="3" fill="#2f2015"/>` +
    `<rect x="10.5" y="5" width="1.6" height="13" fill="#2f2015"/>` +
    `<path d="M10.5,5c4,-1 6,1 6,4c-3,-1.5 -5,0 -6,1z" fill="#2f2015"/>`,
  confluence:
    `<path d="M2,8q6,4 10,9" fill="none" stroke="#3f7fae" stroke-width="2.4"/>` +
    `<path d="M22,8q-6,4 -10,9" fill="none" stroke="#5b8fe8" stroke-width="2.4"/>` +
    `<rect x="10.5" y="17" width="3" height="6" fill="#8b8f98"/>`,
  roman: romanGate(12, 22, 15, 13, "#5a5a52"),
  press:
    `<rect x="6" y="16" width="12" height="3" fill="#4a3826"/>` +
    `<rect x="9" y="6" width="6" height="10" fill="#6b5330"/>` +
    `<rect x="7" y="4" width="10" height="2.4" fill="#2f2015"/>`,
  car:
    `<path d="M4,17L6,12L17,12L20,17z" fill="#5b8fe8"/>` +
    `<rect x="3" y="16" width="18" height="4" rx="1.5" fill="#4a7bd0"/>` +
    `<circle cx="7.5" cy="20" r="2.2" fill="#241a10"/>` +
    `<circle cx="16.5" cy="20" r="2.2" fill="#241a10"/>`,
  spa:
    `<path d="M4,15a8,5 0 0 0 16,0z" fill="#3f8fc4"/>` +
    `<path d="M6,15h12v3a2,2 0 0 1 -2,2h-8a2,2 0 0 1 -2,-2z" fill="#bfe8f4"/>` +
    `<path d="M8,10c0,-3 2,-3 2,-6M13,10c0,-3 2,-3 2,-6" fill="none" stroke="#dbe6e0" stroke-width="1.4"/>`,
  lake:
    `<ellipse cx="12" cy="17" rx="10" ry="5" fill="#3f8fc4"/>` +
    `<path d="M6,10l4,-4l3,3l4,-4l3,4" fill="none" stroke="#4a4a52" stroke-width="1.4"/>` +
    `<path d="M15,13l4,-3l0,5z" fill="#f6efe2"/>`,
  vineyard: shrubRow(5, 18, 4, 5, 2.6, "#7a9a4a") + `<path d="M2,21h20" stroke="#8a7a5c" stroke-width="1.4"/>`,
  fountain:
    `<rect x="3" y="17" width="18" height="4" rx="1" fill="#8b8f98"/>` +
    `<rect x="11" y="6" width="2" height="11" fill="#8b8f98"/>` +
    `<path d="M12,6c-3,3 -3,6 0,9M12,6c3,3 3,6 0,9" fill="none" stroke="#bfe8f4" stroke-width="1.4"/>`,
  peak:
    `<path d="M2,20L9,6L13,13L16,9L22,20z" fill="#8b8f98"/>` +
    `<path d="M9,6L11,10L7,10z" fill="#f2f6f8"/>` +
    `<circle cx="18" cy="14" r="1.6" fill="#4a4a52"/>`,
  quill:
    `<path d="M18,3C10,7 6,15 4,21c3,-4 8,-6 14,-14c1,-1.5 1.5,-3 0,-4z" fill="#e8dcc0" stroke="#4a3826" stroke-width="1"/>` +
    `<line x1="5" y1="20" x2="9" y2="16" stroke="#4a3826" stroke-width="1.4"/>`,
  cliff: chalkCliff(2, 22, 20, 16, "#eae4d4"),
  thatch:
    `<rect x="6" y="15" width="12" height="7" fill="#e8dcc0"/>` +
    `<path d="M4,15L12,5L20,15z" fill="#a8944a"/>` +
    `<path d="M5,14L12,6.5L19,14" fill="none" stroke="#8a7838" stroke-width="1"/>`,
};

// ---------------------------------------------------------------------------
// 背景シーン(25種)。鍵は cities.mjs の `bg` と対応。
// ---------------------------------------------------------------------------

const GERMANY_BASE_BG = {
  /**
   * 首都。ベルリン専用。ガラスドームの議事堂を左、シュプレー川と現代的な
   * 高層ビルの稜線を右に置く。中央の隠れ帯には橋(繰り返しなので失っても軽い)。
   */
  capital:
    sky("#8fc4e8", "#cfe4f0", 128) +
    clouds(300, 30, 1.1) +
    hills(126, "#8fae7a") +
    ground(128, "#7f9f5f") +
    band(168, 42, "#3f7fae") +
    ripples(184, "#bfe8f4") +
    `<g fill="#8b8f98"><rect x="170" y="150" width="6" height="60"/><rect x="200" y="150" width="6" height="60"/><rect x="230" y="150" width="6" height="60"/></g>` +
    `<rect x="40" y="140" width="70" height="30" fill="#9a9488"/>` +
    `<path d="M56,140a19,15 0 0 1 38,0z" fill="#bfe8f4" opacity=".85"/>` +
    `<rect x="72" y="118" width="2" height="10" fill="#8b8f98"/>` +
    windowGrid(45, 148, 60, 18, 3, 6, "#e8443f", 0.55) +
    `<g fill="#7f8896"><rect x="300" y="60" width="22" height="68"/><rect x="326" y="40" width="26" height="88"/><rect x="356" y="72" width="20" height="56"/></g>` +
    windowGrid(302, 66, 18, 60, 8, 2, "#bfe0f0", 0.6) +
    windowGrid(328, 46, 22, 80, 10, 2, "#bfe0f0", 0.6) +
    windowGrid(358, 78, 16, 48, 6, 2, "#bfe0f0", 0.6) +
    roundTree(24, 200, 15, "#3f8f4f") +
    roundTree(380, 202, 14, "#3f8f4f"),

  /**
   * ゴシックの大聖堂。ケルン・アーヘン。石畳の広場と旧市街の家並み。
   */
  cathedral:
    sky("#8fc4e8", "#cfe4f0", 118) +
    clouds(90, 28, 1) +
    ground(118, "#8a8478") +
    gothicTwinSpire(90, 178, 60, 78, "#8a8a8a") +
    `<rect x="0" y="176" width="400" height="34" fill="#9a9488"/>` +
    `<g stroke="#7a7468" stroke-width="1.2" opacity=".6"><path d="M0,186h400M0,196h400"/></g>` +
    halftimberHouse(230, 178, 40, 32, "#f2ead8", "#4a3826", "#7a3a2a") +
    halftimberHouse(280, 180, 34, 28, "#e8dcc0", "#4a3826", "#8a3a2a") +
    halftimberHouse(330, 178, 38, 30, "#f2ead8", "#4a3826", "#7a3a2a") +
    crowdDots(150, 198, 8, 30, "#4a3826") +
    gull(60, 44, 1) +
    gull(340, 50, 0.9),

  /**
   * 木組みの町並み。ローテンブルク・ゲルリッツ。石畳の広場を家並みが囲む。
   */
  halftimber:
    sky("#8fc4e8", "#cfe4f0", 130) +
    clouds(320, 26, 1) +
    hills(128, "#8fae7a") +
    ground(130, "#8a8478") +
    halftimberHouse(50, 190, 46, 40, "#f2ead8", "#4a3826", "#7a3a2a") +
    halftimberHouse(105, 192, 38, 34, "#e8dcc0", "#4a3826", "#8a3a2a") +
    halftimberHouse(320, 188, 44, 42, "#f2ead8", "#4a3826", "#6b3020") +
    halftimberHouse(365, 194, 32, 30, "#e8dcc0", "#4a3826", "#7a3a2a") +
    `<rect x="0" y="180" width="400" height="6" fill="#9a9488"/>` +
    roundTree(300, 205, 13, "#c8783a") +
    crowdDots(200, 200, 6, 24, "#4a3826"),

  /**
   * 童話ふうの城。フュッセン専用。アルプスと湖を背に、細い尖塔の城。
   */
  fairytale:
    sky("#a8c8e0", "#e8f0f4", 130) +
    clouds(80, 30, 1) +
    graniteMountain(90, 128, 70, "#9a9ea4") +
    graniteMountain(320, 132, 60, "#8b8f98") +
    hills(130, "#4f7f5a") +
    ground(130, "#3f6b4a") +
    `<rect x="0" y="172" width="400" height="38" fill="#3f7fae"/>` +
    ripples(186, "#bfe8f4") +
    `<rect x="8" y="150" width="30" height="24" fill="#e8dcc0"/>` +
    `<path d="M4,150L15,116L20,128L26,110L34,150z" fill="#4a5548"/>` +
    `<rect x="12" y="160" width="6" height="14" fill="#2f2015"/>` +
    pine(340, 200, 30, "#2f5f3f") +
    pine(365, 204, 26, "#2f5f3f") +
    pine(24, 202, 24, "#2f5f3f"),

  /**
   * 港町。ハンブルク・キール・ロストック・フレンスブルク・フーズム。
   */
  port:
    sky("#8fc4e8", "#cfe4f0", 118) +
    clouds(310, 28, 1) +
    ground(118, "#9a9484") +
    gull(60, 50, 1) +
    gull(90, 62, 0.8) +
    gull(320, 44, 1) +
    gull(200, 38, 0.7) +
    gull(370, 56, 0.9) +
    band(150, 60, "#2a5478") +
    ripples(168, "#bfe8f4") +
    ripples(178, "#9fd0e8") +
    crane(50, 150, 60) +
    crane(90, 150, 44) +
    `<rect x="0" y="140" width="400" height="12" fill="#8a8478"/>` +
    `<g fill="#8a6a3a"><rect x="20" y="128" width="14" height="12"/><rect x="36" y="130" width="14" height="10"/><rect x="20" y="116" width="14" height="12"/></g>` +
    `<circle cx="70" cy="134" r="6" fill="none" stroke="#6b5330" stroke-width="2"/>` +
    `<rect x="290" y="152" width="90" height="20" rx="3" fill="#e8443f"/>` +
    `<rect x="300" y="140" width="70" height="14" fill="#f6efe2"/>` +
    windowGrid(304, 143, 66, 8, 1, 6, "#5b8fe8", 0.9) +
    `<g fill="#d21f3c"><rect x="292" y="154" width="16" height="10"/><rect x="310" y="154" width="16" height="10"/><rect x="328" y="154" width="16" height="10"/></g>` +
    riverBarge(150, 176, 40, "#6b5330") +
    riverBarge(230, 190, 26, "#4a3826"),

  /**
   * ハンザの町。ブレーメン・リューベック・シュトラールズント。
   * 煉瓦の門塔と切妻屋根の家並み。
   */
  hanseatic:
    sky("#8fc4e8", "#cfe4f0", 128) +
    clouds(70, 28, 1) +
    ground(128, "#8a8478") +
    brickGate(70, 190, 60, 46, "#8a3a2a") +
    halftimberHouse(180, 188, 30, 30, "#e8dcc0", "#4a3826", "#7a3a2a") +
    `<rect x="220" y="150" width="26" height="40" fill="#a8503a"/>` +
    `<path d="M218,150L233,124L248,150z" fill="#6b3020"/>` +
    `<rect x="260" y="146" width="24" height="44" fill="#8a3a2a"/>` +
    `<path d="M258,146L272,118L286,146z" fill="#5a2818"/>` +
    windowGrid(224, 156, 18, 24, 3, 1, "#2f5f6f", 0.85) +
    windowGrid(264, 152, 16, 34, 4, 1, "#2f5f6f", 0.85) +
    band(190, 20, "#3f7fae") +
    ripples(198, "#bfe8f4") +
    gull(340, 40, 1) +
    crowdDots(340, 200, 5, 20, "#4a3826"),

  /**
   * 砂丘の島。ズュルト専用。葦葺き屋根の家と砂丘の草。
   */
  dune:
    sky("#a8c8e0", "#e8f0f4", 140) +
    clouds(90, 26, 1) +
    band(140, 30, "#c8b878") +
    ground(170, "#d8c888") +
    `<rect x="330" y="150" width="40" height="24" fill="#e8dcc0"/>` +
    `<path d="M326,150L350,128L374,150z" fill="#a8944a"/>` +
    duneGrass(40, 195, 26) + duneGrass(60, 198, 22) + duneGrass(80, 194, 28) +
    duneGrass(120, 200, 20) + duneGrass(300, 196, 24) + duneGrass(280, 202, 20) +
    `<path d="M0,168c40,-6 80,4 140,-4c60,-8 100,4 140,-4v46H0z" fill="#e0d4a8"/>` +
    band(206, 4, "#3f7fae") +
    gull(200, 40, 1) +
    gull(230, 50, 0.8),

  /**
   * 現代の高層ビル群。フランクフルト・デュッセルドルフ。マイン川ぞい。
   */
  skyline:
    sky("#8fc4e8", "#cfe4f0", 112) +
    clouds(90, 26, 1) +
    ground(112, "#9a9484") +
    `<g fill="#7f8896"><rect x="30" y="70" width="24" height="42"/><rect x="60" y="50" width="28" height="62"/><rect x="270" y="40" width="30" height="72"/><rect x="304" y="60" width="24" height="52"/><rect x="332" y="30" width="26" height="82"/></g>` +
    windowGrid(32, 74, 20, 36, 6, 2, "#bfe0f0", 0.65) +
    windowGrid(62, 54, 24, 56, 8, 2, "#bfe0f0", 0.65) +
    windowGrid(272, 44, 26, 66, 9, 2, "#f5b31c", 0.5) +
    windowGrid(306, 64, 20, 46, 6, 2, "#bfe0f0", 0.65) +
    windowGrid(334, 34, 22, 76, 10, 2, "#bfe0f0", 0.65) +
    band(148, 62, "#2a5478") +
    ripples(164, "#bfe8f4") +
    riverBarge(190, 186, 34, "#4a3826") +
    `<rect x="0" y="140" width="400" height="8" fill="#8a8478"/>`,

  /**
   * 工業都市。ドルトムント専用。旧製鉄所と煙突。
   */
  industrial:
    sky("#9fb0b8", "#dbe6e0", 116) +
    clouds(320, 24, 0.9) +
    ground(116, "#8a8478") +
    `<rect x="30" y="130" width="60" height="50" fill="#7a7468"/>` +
    `<rect x="45" y="60" width="10" height="70" fill="#5a5450"/>` +
    `<rect x="65" y="80" width="9" height="50" fill="#5a5450"/>` +
    `<ellipse cx="50" cy="60" rx="9" ry="3" fill="#c8c4bc" opacity=".7"/>` +
    `<ellipse cx="69.5" cy="80" rx="7" ry="2.6" fill="#c8c4bc" opacity=".6"/>` +
    `<rect x="280" y="150" width="90" height="30" fill="#6b5f52"/>` +
    windowGrid(284, 154, 82, 22, 2, 8, "#f5b31c", 0.5) +
    `<g fill="#8a8478"><rect x="0" y="176" width="400" height="8"/></g>` +
    crowdDots(180, 200, 5, 22, "#2f2a26"),

  /**
   * 川沿いの町。ボン・コブレンツ・マインツ・レーゲンスブルク・エアフルト。
   */
  riverside:
    sky("#8fc4e8", "#cfe4f0", 130) +
    clouds(300, 26, 1) +
    hills(128, "#8fae7a") +
    ground(130, "#8fae63") +
    halftimberHouse(50, 178, 34, 30, "#f2ead8", "#4a3826", "#7a3a2a") +
    halftimberHouse(95, 180, 30, 26, "#e8dcc0", "#4a3826", "#8a3a2a") +
    `<rect x="330" y="150" width="20" height="30" fill="#9a9488"/>` +
    `<path d="M328,150L340,132L352,150z" fill="#5a3a2a"/>` +
    band(182, 28, "#3f7fae") +
    ripples(192, "#bfe8f4") +
    riverBarge(220, 196, 36, "#6b5330") +
    `<path d="M0,182c60,-6 120,4 200,-2c80,-6 140,4 200,-2" fill="none" stroke="#8a8478" stroke-width="4"/>` +
    roundTree(20, 200, 12, "#3f8f4f"),

  /**
   * ローマ時代の町。トリーア専用。黒ずんだ石門と葡萄畑。
   */
  roman:
    sky("#8fc4e8", "#cfe4f0", 122) +
    clouds(300, 26, 1) +
    hills(120, "#7a9a4a") +
    ground(122, "#8a8478") +
    romanGate(90, 190, 60, 52, "#5a5a52") +
    `<rect x="0" y="180" width="400" height="30" fill="#9a9488"/>` +
    vineyardRows(230, 150, 150, 8, "#7a9a4a") +
    shrubRow(240, 152, 8, 16, 3, "#8ab05a") +
    shrubRow(240, 164, 8, 16, 3, "#8ab05a") +
    riverBarge(340, 200, 30, "#4a3826") +
    band(198, 12, "#3f7fae"),

  /**
   * 城のある町。ハイデルベルク・ニュルンベルク・アイゼナハ。丘の上の城。
   */
  castle:
    sky("#8fc4e8", "#cfe4f0", 150) +
    clouds(80, 28, 1) +
    hills(138, "#5f7f4a", 3) +
    `<path d="M0,150c60,-40 120,-50 180,-30c60,20 140,10 220,-20v110H0z" fill="#6f8a52"/>` +
    roundTurret(95, 122, 26, 34, "#9a9488", "#5a3a2a") +
    `<rect x="71" y="118" width="60" height="20" fill="#8a8478"/>` +
    roundTurret(140, 130, 20, 26, "#9a9488", "#5a3a2a") +
    ground(150, "#8fae63") +
    halftimberHouse(300, 190, 34, 28, "#f2ead8", "#4a3826", "#7a3a2a") +
    halftimberHouse(345, 194, 30, 24, "#e8dcc0", "#4a3826", "#8a3a2a") +
    band(196, 14, "#3f7fae") +
    pine(30, 200, 26, "#2f5f3f") +
    pine(55, 204, 22, "#2f5f3f"),

  /**
   * 温泉町。バーデンバーデン専用。湯気の立つ浴場とカジノ。
   */
  spa:
    sky("#8fc4e8", "#cfe4f0", 128) +
    clouds(320, 26, 1) +
    hills(126, "#5f7f4a") +
    ground(128, "#8fae63") +
    `<rect x="30" y="150" width="70" height="34" fill="#e8dcc0"/>` +
    `<path d="M26,150h78l-8,-14h-62z" fill="#8a3a2a"/>` +
    `<g fill="#f6efe2" opacity=".7"><ellipse cx="50" cy="140" rx="6" ry="10"/><ellipse cx="65" cy="136" rx="5" ry="9"/><ellipse cx="80" cy="142" rx="6" ry="9"/></g>` +
    `<rect x="300" y="146" width="70" height="38" fill="#f2ead8"/>` +
    `<path d="M296,146h78l-10,-16h-58z" fill="#5a3a2a"/>` +
    windowGrid(306, 152, 58, 24, 2, 5, "#2f5f6f", 0.7) +
    `<g><path d="M180,182a20,10 0 0 1 40,0z" fill="#e8443f"/><rect x="198" y="182" width="3" height="24" fill="#6b5330"/></g>` +
    roundTree(150, 200, 12, "#3f8f4f"),

  /**
   * 王宮と庭園。カールスルーエ・カッセル・ポツダム。放射状の並木か段々庭園。
   */
  palace:
    sky("#8fc4e8", "#cfe4f0", 122) +
    clouds(90, 28, 1) +
    hills(120, "#8fae7a") +
    ground(122, "#7fae63") +
    `<rect x="40" y="150" width="60" height="30" fill="#e8dcc0"/>` +
    `<path d="M36,150h68l-6,-12h-56z" fill="#5a3a2a"/>` +
    `<rect x="66" y="130" width="8" height="20" fill="#e8dcc0"/>` +
    `<path d="M62,130a8,7 0 0 1 16,0z" fill="#2a4a5a"/>` +
    `<circle cx="70" cy="121" r="1.6" fill="#f4c430"/>` +
    windowGrid(44, 156, 52, 18, 2, 6, "#2f5f6f", 0.7) +
    `<g stroke="#7a9a4a" stroke-width="3" opacity=".8"><path d="M150,180L400,140M150,190L400,158M150,200L400,176"/></g>` +
    shrubRow(230, 168, 6, 22, 5, "#c8384f") +
    shrubRow(230, 182, 6, 22, 5, "#e8a0b0") +
    shrubRow(150, 196, 5, 20, 4, "#8ab05a") +
    `<path d="M0,182a30,8 0 0 0 60,0z" fill="#3f8fc4"/>` +
    `<circle cx="30" cy="182" r="2" fill="#f6efe2"/>` +
    roundTree(370, 200, 12, "#3f8f4f") +
    roundTree(20, 202, 10, "#3f8f4f") +
    gull(200, 40, 0.8),

  /**
   * シュヴァルツヴァルトの町。フライブルク専用。針葉樹の森と小さな水路。
   */
  blackforest:
    sky("#8fc4e8", "#cfe4f0", 120) +
    clouds(80, 26, 1) +
    graniteMountain(340, 118, 50, "#5f7f4a") +
    hills(118, "#3f6b4a") +
    ground(120, "#6f8a52") +
    pine(40, 190, 34, "#2f5f3f") +
    pine(65, 194, 30, "#2f5f3f") +
    pine(320, 188, 32, "#2f5f3f") +
    gothicTwinSpire(180, 200, 36, 42, "#9a9a9a") +
    `<path d="M40,190h60" stroke="#7fa8c4" stroke-width="4"/>` +
    `<path d="M40,196h60" stroke="#7fa8c4" stroke-width="3" opacity=".7"/>` +
    crowdDots(140, 204, 5, 18, "#4a3826"),

  /**
   * 湖畔の町。コンスタンツ専用。ボーデン湖と帆船。
   */
  lakeside:
    sky("#8fc4e8", "#cfe4f0", 110) +
    clouds(70, 26, 1) +
    graniteMountain(340, 108, 40, "#8b8f98") +
    graniteMountain(300, 112, 26, "#9a9ea4") +
    band(110, 70, "#3f8fc4") +
    ripples(126, "#bfe8f4") +
    ripples(150, "#bfe8f4") +
    ripples(138, "#9fd0e8") +
    `<path d="M60,170l6,-30l6,30z" fill="#f6efe2"/>` +
    `<path d="M56,178c6,-4 16,-4 22,0l-3,4h-16z" fill="#6b5330"/>` +
    `<path d="M230,166l5,-24l5,24z" fill="#f6efe2"/>` +
    `<path d="M226,172c5,-3 13,-3 18,0l-2,3h-14z" fill="#6b5330"/>` +
    `<path d="M18,178l4,-18l4,18z" fill="#e8dcc0"/>` +
    `<path d="M15,182c4,-3 11,-3 15,0l-2,3h-11z" fill="#6b5330"/>` +
    ground(180, "#8fae63") +
    gothicTwinSpire(330, 200, 26, 30, "#9a9a9a") +
    `<rect x="0" y="196" width="60" height="6" fill="#9a9488"/>` +
    `<g fill="#8b8f98"><rect x="10" y="196" width="4" height="10"/><rect x="40" y="196" width="4" height="10"/></g>` +
    gull(150, 40, 1) +
    gull(190, 34, 0.8) +
    gull(90, 46, 0.7),

  /**
   * バイエルンの首都風景。ミュンヘン専用。玉ねぎ屋根とビール庭園。
   */
  bavarian:
    sky("#8fc4e8", "#cfe4f0", 122) +
    clouds(300, 28, 1) +
    hills(120, "#8fae7a") +
    ground(122, "#8fae63") +
    onionTower(110, 190, 30, 46, "#2a4a5a", "#e8dcc0") +
    onionTower(148, 192, 24, 38, "#2a4a5a", "#e8dcc0") +
    `<g fill="#3f8f4f"><ellipse cx="280" cy="188" rx="26" ry="10"/><rect x="266" y="188" width="4" height="16"/><rect x="290" y="188" width="4" height="16"/></g>` +
    `<g fill="#e8dcc0"><rect x="270" y="196" width="20" height="4"/></g>` +
    marketTent(330, 200, 40, 24, "#f4c430") +
    crowdDots(300, 202, 8, 26, "#4a3826") +
    roundTree(30, 200, 14, "#3f8f4f"),

  /**
   * 葡萄畑の丘。ヴュルツブルク専用。段々畑とレジデンツ宮殿。
   */
  vineyard:
    sky("#8fc4e8", "#cfe4f0", 120) +
    clouds(90, 26, 1) +
    ground(120, "#8fae63") +
    vineyardRows(20, 140, 140, 9, "#7a9a4a") +
    vineyardRows(240, 150, 140, 8, "#7a9a4a") +
    `<rect x="150" y="170" width="90" height="34" fill="#e8dcc0"/>` +
    `<path d="M146,170h98l-10,-16h-78z" fill="#5a3a2a"/>` +
    windowGrid(156, 176, 78, 22, 2, 7, "#2f5f6f", 0.7) +
    band(200, 10, "#3f7fae") +
    shrubRow(30, 200, 5, 18, 4, "#8ab05a") +
    shrubRow(260, 202, 5, 18, 4, "#8ab05a"),

  /**
   * アルプスの山あい。ガルミッシュ専用。ロープウェイと雪山。
   */
  alpine:
    sky("#a8c8e0", "#e8f0f4", 148) +
    sun(40, 36, 16, "#f6efe2") +
    graniteMountain(120, 148, 90, "#8b8f98") +
    graniteMountain(300, 152, 70, "#9a9ea4") +
    `<path d="M74,110L120,58L166,110z" fill="#f2f6f8"/>` +
    ground(148, "#f2f6f8") +
    `<g stroke="#4a4a52" stroke-width="1.6"><path d="M40,160L340,80"/></g>` +
    `<g fill="#e8443f"><rect x="90" y="146" width="10" height="6" rx="1"/><rect x="190" y="122" width="10" height="6" rx="1"/><rect x="290" y="98" width="10" height="6" rx="1"/></g>` +
    `<g stroke="#4a4a52" stroke-width="1" opacity=".7"><path d="M95,150v-4M195,126v-4M295,102v-4"/></g>` +
    halftimberHouse(50, 202, 26, 20, "#f2ead8", "#4a3826", "#7a3a2a") +
    halftimberHouse(85, 204, 22, 18, "#e8dcc0", "#4a3826", "#8a3a2a") +
    pine(30, 194, 30, "#2f5f3f") +
    pine(370, 198, 26, "#2f5f3f") +
    pine(350, 202, 20, "#2f5f3f") +
    `<g><circle cx="150" cy="130" r="4" fill="#f6efe2"/><path d="M150,134v10M146,144h8" stroke="#e8443f" stroke-width="2"/></g>` +
    `<g><circle cx="230" cy="105" r="3.6" fill="#f6efe2"/><path d="M230,109v9M226,118h8" stroke="#5b8fe8" stroke-width="2"/></g>` +
    `<g fill="#f6efe2" opacity=".8"><circle cx="60" cy="170" r="2"/><circle cx="72" cy="176" r="2"/><circle cx="280" cy="172" r="2"/><circle cx="292" cy="178" r="2"/></g>`,

  /**
   * 文学の町。ヴァイマル専用。劇場と像。
   */
  literary:
    sky("#8fc4e8", "#cfe4f0", 128) +
    clouds(300, 26, 1) +
    hills(126, "#8fae7a") +
    ground(128, "#8fae63") +
    `<rect x="60" y="150" width="90" height="34" fill="#e8dcc0"/>` +
    `<path d="M54,150h102l-14,-18h-74z" fill="#8a3a2a"/>` +
    `<g fill="#9a9488"><rect x="70" y="164" width="6" height="20"/><rect x="84" y="164" width="6" height="20"/><rect x="98" y="164" width="6" height="20"/><rect x="112" y="164" width="6" height="20"/><rect x="126" y="164" width="6" height="20"/></g>` +
    windowGrid(64, 154, 82, 10, 1, 5, "#2f5f6f", 0.7) +
    `<rect x="240" y="186" width="16" height="4" fill="#8b8f98"/>` +
    `<circle cx="245" cy="178" r="3.4" fill="#7a8068"/>` +
    `<circle cx="252" cy="180" r="3.4" fill="#7a8068"/>` +
    `<rect x="243" y="182" width="4" height="4" fill="#7a8068"/>` +
    `<rect x="250" y="182" width="4" height="4" fill="#7a8068"/>` +
    halftimberHouse(320, 196, 26, 22, "#f2ead8", "#4a3826", "#7a3a2a") +
    halftimberHouse(30, 200, 24, 20, "#e8dcc0", "#4a3826", "#8a3a2a") +
    roundTree(200, 202, 12, "#3f8f4f") +
    crowdDots(180, 202, 5, 20, "#4a3826") +
    crowdDots(100, 200, 4, 16, "#5a4636"),

  /**
   * 木組みの旧市街(世界遺産)。クヴェードリンブルク専用。
   */
  medieval:
    sky("#8fc4e8", "#cfe4f0", 128) +
    clouds(300, 24, 1) +
    ground(128, "#8a8478") +
    halftimberHouse(50, 190, 34, 32, "#f2ead8", "#4a3826", "#7a3a2a") +
    halftimberHouse(90, 194, 28, 26, "#e8dcc0", "#4a3826", "#8a3a2a") +
    halftimberHouse(340, 188, 32, 32, "#f2ead8", "#4a3826", "#6b3020") +
    `<rect x="150" y="150" width="14" height="34" fill="#9a9488"/>` +
    `<path d="M146,150L157,124L168,150z" fill="#5a3a2a"/>` +
    `<rect x="0" y="182" width="400" height="4" fill="#9a9488"/>` +
    crowdDots(230, 200, 6, 26, "#4a3826"),

  /**
   * バロックの都。ドレスデン専用。丸屋根とエルベ川の眺め。
   */
  baroque:
    sky("#8fc4e8", "#cfe4f0", 122) +
    clouds(90, 26, 1) +
    clouds(340, 20, 0.8) +
    ground(122, "#8a8478") +
    `<rect x="130" y="160" width="60" height="30" fill="#e8dcc0"/>` +
    `<path d="M126,160a34,26 0 0 1 68,0z" fill="#a8a08c"/>` +
    `<circle cx="160" cy="118" r="3" fill="#f4c430"/>` +
    windowGrid(134, 164, 52, 20, 2, 5, "#2f5f6f", 0.65) +
    `<rect x="30" y="170" width="30" height="24" fill="#f2ead8"/>` +
    `<path d="M26,170h38l-6,-10h-26z" fill="#8a3a2a"/>` +
    windowGrid(34, 174, 22, 16, 2, 3, "#2f5f6f", 0.7) +
    `<rect x="330" y="168" width="30" height="26" fill="#e8dcc0"/>` +
    `<path d="M326,168h38l-6,-10h-26z" fill="#5a3a2a"/>` +
    windowGrid(334, 172, 22, 18, 2, 3, "#2f5f6f", 0.7) +
    `<rect x="70" y="182" width="14" height="18" fill="#e8dcc0"/>` +
    `<path d="M67,182h20l-4,-8h-12z" fill="#7a3a2a"/>` +
    band(200, 10, "#3f7fae") +
    ripples(204, "#9fd0e8") +
    riverBarge(250, 205, 26, "#4a3826") +
    roundTree(300, 200, 12, "#3f8f4f") +
    gull(200, 40, 0.9),

  /**
   * 中規模都市。ハノーファー・アウクスブルク・ゲッティンゲン・ライプツィヒ。
   * 旧市庁舎ふうの建物と現代的なオフィス、路面電車。
   */
  metro:
    sky("#8fc4e8", "#cfe4f0", 118) +
    clouds(300, 26, 1) +
    ground(118, "#8a8478") +
    `<rect x="40" y="150" width="60" height="30" fill="#e8dcc0"/>` +
    `<path d="M36,150h68l-8,-12h-52z" fill="#5a3a2a"/>` +
    `<rect x="64" y="128" width="10" height="22" fill="#e8dcc0"/>` +
    `<path d="M62,128a8,7 0 0 1 14,0z" fill="#2a4a5a"/>` +
    windowGrid(46, 156, 46, 18, 2, 6, "#2f5f6f", 0.7) +
    `<g fill="#7f8896"><rect x="290" y="90" width="24" height="60"/><rect x="320" y="70" width="26" height="80"/></g>` +
    windowGrid(292, 94, 20, 52, 7, 2, "#bfe0f0", 0.65) +
    windowGrid(322, 74, 22, 72, 9, 2, "#bfe0f0", 0.65) +
    `<rect x="0" y="180" width="400" height="6" fill="#9a9488"/>` +
    `<rect x="170" y="176" width="46" height="14" rx="2" fill="#d21f3c"/>` +
    windowGrid(174, 178, 38, 6, 1, 4, "#f6efe2", 0.9) +
    `<line x1="0" y1="186" x2="400" y2="186" stroke="#5a5450" stroke-width="1.4"/>` +
    crowdDots(240, 200, 6, 24, "#4a3826"),

  /**
   * 盆地の町。シュトゥットガルト専用。丘のブドウ畑に囲まれた工業都市。
   */
  valley:
    sky("#8fc4e8", "#cfe4f0", 116) +
    clouds(80, 26, 1) +
    hills(114, "#8fae7a", 3) +
    vineyardRows(10, 132, 110, 7, "#7a9a4a") +
    vineyardRows(280, 128, 110, 7, "#7a9a4a") +
    ground(116, "#8fae63") +
    `<rect x="150" y="160" width="80" height="26" fill="#8a8478"/>` +
    windowGrid(154, 164, 72, 18, 2, 8, "#f5b31c", 0.55) +
    `<rect x="180" y="140" width="8" height="22" fill="#5a5450"/>` +
    `<circle cx="184" cy="140" r="6" fill="#5b8fe8"/>` +
    `<path d="M0,186h400" stroke="#9a9488" stroke-width="6"/>` +
    `<path d="M60,190l4,-8h6l4,8z" fill="#5b8fe8"/>` +
    `<path d="M330,192l4,-8h6l4,8z" fill="#e8443f"/>` +
    shrubRow(30, 200, 4, 16, 3, "#8ab05a") +
    shrubRow(320, 202, 4, 16, 3, "#8ab05a"),

  /**
   * 白亜の断崖。リューゲン専用。海と絵になる断崖。
   */
  cliff:
    sky("#a8c8e0", "#e8f0f4", 100) +
    sun(330, 44, 18, "#f6efe2") +
    clouds(70, 30, 0.9) +
    band(100, 60, "#1e6ea0") +
    ripples(114, "#bfe8f4") +
    ripples(128, "#9fd0e8") +
    chalkCliff(60, 190, 130, 90, "#eae4d4") +
    chalkCliff(220, 195, 160, 80, "#eae4d4") +
    pine(120, 178, 24, "#2f5f3f") +
    pine(280, 182, 22, "#2f5f3f") +
    pine(140, 176, 18, "#2f5f3f") +
    ground(160, "#3f6b4a") +
    duneGrass(30, 195, 14) +
    duneGrass(370, 198, 14) +
    `<path d="M340,198l14,-4l-2,6z" fill="#4a3826"/>` +
    gull(90, 60, 1) +
    gull(200, 50, 0.9) +
    gull(320, 70, 0.8) +
    gull(250, 40, 0.7) +
    gull(40, 42, 0.8),
};

export const GERMANY_BG = GERMANY_BASE_BG;
