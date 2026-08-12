/**
 * イギリスの都市イラスト。
 *
 * `UK_MARKS` は24×24の座標系に描くシンボル、`UK_BG` は400×210の座標系に
 * 描く背景シーン(いずれもSVG断片の文字列)。フランス・韓国と同じく
 * 最初から文字列として持つ。動きは含めない(アニメーションはReact側で重ねる)。
 *
 * 色は他の盤面と揃える。空 #8fc4e8〜#cfe4f0、顔・白 #f6efe2、
 * 強調 #f5b31c/#e8443f/#5b8fe8。イギリスらしさは
 * **バスの赤 #c8383f・郵便箱の赤 #b0303a・石灰岩の白灰 #d8d2c0・
 * 石造りの灰色 #8a8478・スレート屋根の濃灰 #4a4f56・芝の緑 #6f9a52・
 * ヒースの紫 #8a6a94** で出す。
 *
 * 鍵は `cities.mjs` の `mark` / `bg` と一対一で対応する。
 * 増やすときは両方を揃えること。
 *
 * **背景SVGの中央25%(x=151〜249 / y=54〜152)は都市シンボルに隠れて
 * 見えない。** 見せたい細部は左右3分の1と手前(y>170)に置く。
 * `sky()` は必ず第3引数(次に来る塗りの開始y)を渡すこと。渡し忘れると
 * 空と地面のあいだに塗り残しの帯ができる(ibaraki・korea両方で実際に起きた)。
 *
 * 密度の目安: 背景1枚あたり平均40要素(韓国27・フランス98の間を狙う)。
 * `<rect|circle|ellipse|line|path|polygon|polyline|g` の開始タグ数で数える。
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
  return `<g opacity=".85" fill="#f6efe2">${e(0, 18, 7)}${e(-10, 11, 5.5)}${e(11, 13, 5.5)}</g>`;
}

/** 灰色がかった雨雲(イギリスらしい曇天用)。 */
function raincloud(cx, cy, scale = 1) {
  const e = (dx, rx, ry) =>
    `<ellipse cx="${r1(cx + dx * scale)}" cy="${cy}" rx="${r1(rx * scale)}" ry="${r1(ry * scale)}"/>`;
  return `<g opacity=".9" fill="#9aa0a8">${e(0, 20, 8)}${e(-11, 13, 6)}${e(12, 14, 6)}</g>`;
}

/** 斜めの雨脚。 */
function rain(x0, y0, count, gap, len = 10, color = "#8fb0c8") {
  const parts = [];
  for (let i = 0; i < count; i++) {
    const x = x0 + i * gap;
    parts.push(`<line x1="${x}" y1="${y0}" x2="${r1(x - 4)}" y2="${y0 + len}" stroke="${color}" stroke-width="1.4" opacity=".55"/>`);
  }
  return `<g>${parts.join("")}</g>`;
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

/** 波の反射線・水面。 */
function ripples(y, color = "#bfe8f4") {
  return `<g stroke="${color}" stroke-width="2" opacity=".7" fill="none"><path d="M26,${y}h74M176,${y + 12}h92M108,${y + 24}h62"/></g>`;
}

/** かもめ。 */
function gull(x, y, scale = 1) {
  const w = 8 * scale;
  return `<path d="M${r1(x - w)},${y}q${r1(w / 2)},-6 ${w},0q${r1(w / 2)},-6 ${w},0" fill="none" stroke="#4a4a52" stroke-width="1.4"/>`;
}

/** 羊(牧草地の点景。イギリスの田園らしさの核)。 */
function sheep(x, y, scale = 1) {
  const s = 5 * scale;
  return (
    `<ellipse cx="${x}" cy="${y}" rx="${r1(s)}" ry="${r1(s * 0.7)}" fill="#f2f0e8"/>` +
    `<circle cx="${r1(x - s * 0.9)}" cy="${r1(y - s * 0.1)}" r="${r1(s * 0.4)}" fill="#4a4436"/>` +
    `<g fill="#4a4436"><rect x="${r1(x - s * 0.5)}" y="${r1(y + s * 0.5)}" width="2" height="3"/><rect x="${r1(x + s * 0.2)}" y="${r1(y + s * 0.5)}" width="2" height="3"/></g>`
  );
}

function flock(cx, cy, count, spread) {
  const parts = [];
  for (let i = 0; i < count; i++) {
    const x = cx + (((i * 37) % spread) - spread / 2);
    const y = cy + ((i * 17) % 8);
    parts.push(sheep(r1(x), r1(y), 0.8 + (i % 3) * 0.15));
  }
  return parts.join("");
}

/** 生垣(なだらかな緑の帯)。 */
function hedgerow(x, y, w, fill = "#5f7f4a") {
  return `<path d="M${x},${y + 6}q${r1(w / 4)},-10 ${r1(w / 2)},0t${r1(w / 2)},0" fill="none" stroke="${fill}" stroke-width="7" opacity=".85"/>`;
}

/** 石垣(コッツウォルズ・ヨークシャー流の乾式石積み)。 */
function drystoneWall(x, y, w, fill = "#9a9488") {
  const parts = [`<rect x="${x}" y="${y}" width="${w}" height="6" fill="${fill}"/>`];
  const n = Math.round(w / 14);
  for (let i = 0; i < n; i++) {
    parts.push(`<line x1="${r1(x + i * 14)}" y1="${y}" x2="${r1(x + i * 14)}" y2="${y + 6}" stroke="#7a7468" stroke-width="1"/>`);
  }
  return `<g>${parts.join("")}</g>`;
}

/** ジョージ王朝様式の連棟(バース・ブライトンの三日月形街区)。窓を個別に描く。 */
function georgianTerrace(x0, base, houseW, h, count, fill = "#e8dcc0") {
  const parts = [];
  for (let i = 0; i < count; i++) {
    const x = x0 + i * houseW;
    parts.push(
      `<rect x="${x}" y="${r1(base - h)}" width="${houseW - 2}" height="${h}" fill="${fill}"/>`,
      `<rect x="${x}" y="${r1(base - h)}" width="${houseW - 2}" height="4" fill="#c8bda0"/>`,
    );
    // 各階の窓(3階建てに見立てる)
    for (let f = 0; f < 3; f++) {
      const wy = r1(base - h + 10 + f * (h - 16) / 2.4);
      parts.push(`<rect x="${r1(x + houseW * 0.28)}" y="${wy}" width="${r1(houseW * 0.44)}" height="${r1(h * 0.14)}" fill="#4a5560"/>`);
    }
    // ジョージアンの扉(黒か色付き)
    parts.push(`<rect x="${r1(x + houseW * 0.35)}" y="${r1(base - h * 0.24)}" width="${r1(houseW * 0.3)}" height="${r1(h * 0.24)}" fill="${i % 2 ? "#8a2a2a" : "#1a2a3a"}"/>`);
  }
  return `<g>${parts.join("")}</g>`;
}

/** テューダー様式の木骨造り(ストラトフォード・チェスター)。 */
function tudorHouse(x, base, w, h, fill = "#f2ead6") {
  const hw = r1(w / 2);
  return (
    `<rect x="${r1(x - hw)}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${fill}"/>` +
    `<g stroke="#4a3620" stroke-width="2.4"><path d="M${r1(x - hw)},${r1(base - h * 0.5)}h${w}M${x},${r1(base - h)}v${h}M${r1(x - hw)},${r1(base - h)}L${x},${r1(base - h * 0.5)}L${r1(x - hw)},${base}M${r1(x + hw)},${r1(base - h)}L${x},${r1(base - h * 0.5)}L${r1(x + hw)},${base}"/></g>` +
    `<path d="M${r1(x - hw - 5)},${r1(base - h)}h${w + 10}l-6,-14h${-(w - 2)}z" fill="#4a3620"/>` +
    `<rect x="${r1(x - hw * 0.35)}" y="${r1(base - h * 0.28)}" width="${r1(hw * 0.7)}" height="${r1(h * 0.28)}" fill="#2f2418"/>`
  );
}

/** 城の塔(狭間胸壁つき)。カーディフ・カーナーヴォン・コンウィ・エディンバラ。 */
function castleTower(x, base, w, h, fill = "#9a9488") {
  const hw = r1(w / 2);
  const parts = [
    `<rect x="${r1(x - hw)}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${fill}"/>`,
  ];
  const merlons = 4;
  for (let i = 0; i < merlons; i++) {
    if (i % 2 === 0) continue;
    parts.push(`<rect x="${r1(x - hw + (i * w) / merlons)}" y="${r1(base - h - 6)}" width="${r1(w / merlons)}" height="8" fill="${fill}"/>`);
  }
  parts.push(`<rect x="${r1(x - 3)}" y="${r1(base - h * 0.4)}" width="6" height="10" fill="#2a2a30"/>`);
  return `<g>${parts.join("")}</g>`;
}

/** 城壁(2本の塔を結ぶ、狭間つきの壁)。 */
function castleWall(x0, x1, base, h, fill = "#8a8478") {
  const parts = [`<rect x="${x0}" y="${r1(base - h)}" width="${r1(x1 - x0)}" height="${h}" fill="${fill}"/>`];
  const n = Math.round((x1 - x0) / 16);
  for (let i = 0; i < n; i++) {
    if (i % 2 === 0) continue;
    parts.push(`<rect x="${r1(x0 + i * 16)}" y="${r1(base - h - 5)}" width="10" height="7" fill="${fill}"/>`);
  }
  return `<g>${parts.join("")}</g>`;
}

/** 大聖堂の尖塔・双塔。 */
function cathedralTower(x, base, w, h, fill = "#c8c2b0") {
  const hw = r1(w / 2);
  return (
    `<rect x="${r1(x - hw)}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${fill}"/>` +
    `<path d="M${r1(x - hw - 2)},${r1(base - h)}L${x},${r1(base - h - 20)}L${r1(x + hw + 2)},${r1(base - h)}z" fill="#8a8478"/>` +
    `<rect x="${r1(x - hw * 0.3)}" y="${r1(base - h * 0.6)}" width="${r1(hw * 0.6)}" height="${r1(h * 0.4)}" fill="#4a5560"/>`
  );
}

/** 赤レンガの連棟住宅(工業都市の労働者街)。 */
function terracedRow(x0, base, houseW, h, count, brick = "#9a5a4a") {
  const parts = [];
  for (let i = 0; i < count; i++) {
    const x = x0 + i * houseW;
    parts.push(
      `<rect x="${x}" y="${r1(base - h)}" width="${houseW - 2}" height="${h}" fill="${brick}"/>`,
      `<path d="M${x},${r1(base - h)}h${houseW - 2}l0,-8h${-(houseW - 2)}z" fill="#3a3540"/>`,
      `<rect x="${r1(x + houseW * 0.15)}" y="${r1(base - h * 0.55)}" width="${r1(houseW * 0.3)}" height="${r1(h * 0.28)}" fill="#dfe8ee"/>`,
      `<rect x="${r1(x + houseW * 0.55)}" y="${r1(base - h * 0.55)}" width="${r1(houseW * 0.3)}" height="${r1(h * 0.28)}" fill="#dfe8ee"/>`,
    );
  }
  return `<g>${parts.join("")}</g>`;
}

/** 工場の煙突と煙。 */
function millChimney(x, base, h, fill = "#7a6a5a") {
  return (
    `<rect x="${r1(x - 5)}" y="${r1(base - h)}" width="10" height="${h}" fill="${fill}"/>` +
    `<rect x="${r1(x - 6)}" y="${r1(base - h - 4)}" width="12" height="5" fill="#5a4a3a"/>` +
    `<path d="M${x},${r1(base - h - 4)}c4,-8 -6,-14 0,-22" fill="none" stroke="#c8ccc4" stroke-width="4" opacity=".6"/>`
  );
}

/** 赤い電話ボックス(小道具。多くの場面で使い回す)。 */
function phoneBox(x, base, h = 16) {
  const w = r1(h * 0.42);
  return (
    `<rect x="${r1(x - w / 2)}" y="${r1(base - h)}" width="${w}" height="${h}" fill="#b0303a"/>` +
    `<rect x="${r1(x - w / 2 + 1.5)}" y="${r1(base - h + 3)}" width="${r1(w - 3)}" height="${r1(h * 0.55)}" fill="#cfe4f0" opacity=".8"/>` +
    `<rect x="${r1(x - w / 2 - 1)}" y="${r1(base - h - 2)}" width="${r1(w + 2)}" height="3" fill="#8a1a24"/>`
  );
}

/** 赤い郵便箱(小道具)。 */
function postBox(x, base, h = 10) {
  const w = r1(h * 0.8);
  return (
    `<rect x="${r1(x - w / 2)}" y="${r1(base - h)}" width="${w}" height="${h}" rx="2" fill="#b0303a"/>` +
    `<ellipse cx="${x}" cy="${r1(base - h)}" rx="${r1(w / 2)}" ry="2" fill="#8a1a24"/>` +
    `<rect x="${r1(x - w * 0.3)}" y="${r1(base - h * 0.6)}" width="${r1(w * 0.6)}" height="1.5" fill="#2a2a30"/>`
  );
}

/** 2階建ての赤バス(小さくシルエットで)。 */
function doubleDecker(x, base, w = 36) {
  const h = r1(w * 0.5);
  return (
    `<rect x="${x}" y="${r1(base - h)}" width="${w}" height="${h}" rx="2" fill="#b0303a"/>` +
    `<rect x="${r1(x + 2)}" y="${r1(base - h + 3)}" width="${r1(w - 4)}" height="${r1(h * 0.42)}" fill="#cfe4f0" opacity=".7"/>` +
    `<g fill="#2a2a30"><circle cx="${r1(x + w * 0.22)}" cy="${base}" r="3.4"/><circle cx="${r1(x + w * 0.78)}" cy="${base}" r="3.4"/></g>`
  );
}

/** 蒸気機関車(横から見たシルエット、小さく)。 */
function steamTrain(x, base, scale = 1) {
  const w = 60 * scale;
  const h = 20 * scale;
  return (
    `<rect x="${x}" y="${r1(base - h)}" width="${r1(w * 0.6)}" height="${h}" fill="#2a2a30"/>` +
    `<circle cx="${r1(x + w * 0.18)}" cy="${r1(base - h * 0.15)}" r="${r1(h * 0.28)}" fill="#4a4a52"/>` +
    `<rect x="${r1(x + w * 0.5)}" y="${r1(base - h * 1.3)}" width="${r1(w * 0.14)}" height="${r1(h * 0.5)}" fill="#2a2a30"/>` +
    `<path d="M${r1(x + w * 0.55)},${r1(base - h * 1.3)}c4,-8 -6,-14 0,-22" fill="none" stroke="#c8ccc4" stroke-width="3" opacity=".6"/>` +
    `<g fill="#8a8478"><circle cx="${r1(x + w * 0.15)}" cy="${base}" r="4"/><circle cx="${r1(x + w * 0.4)}" cy="${base}" r="4"/></g>`
  );
}

/** 桟橋(海上に杭で立つイギリスの海辺の桟橋)。 */
function pier(x0, base, w, h) {
  const parts = [
    `<rect x="${x0}" y="${r1(base - h)}" width="${w}" height="6" fill="#6b5330"/>`,
  ];
  const n = Math.round(w / 18);
  for (let i = 0; i <= n; i++) {
    parts.push(`<rect x="${r1(x0 + i * 18 - 1.5)}" y="${r1(base - h + 6)}" width="3" height="${r1(h)}" fill="#5a4526"/>`);
  }
  return `<g>${parts.join("")}</g>`;
}

/** ブンティング(祭りの三角旗飾り)。細かい要素を安く積み増せる。 */
function bunting(x0, y0, x1, y1, count, colors = ["#c8383f", "#f5b31c", "#5b8fe8", "#f6efe2"]) {
  const parts = [`<path d="M${x0},${y0}L${x1},${y1}" stroke="#4a4a52" stroke-width="1" fill="none"/>`];
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const x = r1(x0 + (x1 - x0) * t);
    const y = r1(y0 + (y1 - y0) * t);
    parts.push(`<path d="M${x - 4},${y}L${x + 4},${y}L${x},${y + 7}z" fill="${colors[i % colors.length]}"/>`);
  }
  return `<g>${parts.join("")}</g>`;
}

/** ヒースの茂み(スコットランド高地の紫)。 */
function heatherClump(x, y, r = 6, fill = "#8a6a94") {
  return `<g opacity=".85" fill="${fill}"><circle cx="${x}" cy="${y}" r="${r}"/><circle cx="${r1(x - r * 0.7)}" cy="${r1(y + r * 0.3)}" r="${r1(r * 0.7)}"/><circle cx="${r1(x + r * 0.7)}" cy="${r1(y + r * 0.3)}" r="${r1(r * 0.7)}"/></g>`;
}

/** 花崗岩の山。稜線が鋭く白っぽい岩肌。 */
function graniteMountain(cx, base, h, fill = "#8b8f98") {
  const w = r1(h * 1.3);
  return (
    `<path d="M${r1(cx - w / 2)},${base}L${r1(cx - w * 0.12)},${r1(base - h)}L${r1(cx + w * 0.1)},${r1(base - h * 0.62)}L${r1(cx + w / 2)},${base}z" fill="${fill}"/>` +
    `<path d="M${r1(cx - w * 0.12)},${r1(base - h)}L${r1(cx - w * 0.02)},${r1(base - h * 0.8)}L${r1(cx + w * 0.04)},${r1(base - h * 0.86)}z" fill="#f2f6f8"/>`
  );
}

/** 六角形の玄武岩柱(ジャイアンツ・コーズウェイ専用)。 */
function basaltColumn(x, base, h, w = 8, fill = "#5a5f5c") {
  return (
    `<rect x="${r1(x - w / 2)}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${fill}"/>` +
    `<path d="M${r1(x - w / 2)},${r1(base - h)}L${x},${r1(base - h - 4)}L${r1(x + w / 2)},${r1(base - h)}z" fill="#6f7470"/>`
  );
}

// ---------------------------------------------------------------------------
// 背景シーン(22種)。鍵は cities.mjs の `bg` と対応。
// ---------------------------------------------------------------------------

const UK_BASE_BG = {
  /**
   * 首都。ロンドン専用。時計塔とテムズ川を中心に、赤バス・電話ボックス・
   * 郵便箱・観覧車を配して盤面の顔にする。
   */
  capital:
    sky("#8fc4e8", "#cfe4f0", 118) +
    clouds(300, 26, 1.1) +
    clouds(70, 40, 0.8) +
    ground(118, "#8a8478") +
    // テムズ川
    `<rect x="0" y="150" width="400" height="60" fill="#4a6f8f"/>` +
    ripples(164, "#bfe8f4") +
    // 橋(手前)
    `<rect x="0" y="146" width="400" height="6" fill="#6b6558"/>` +
    `<g stroke="#4a4f56" stroke-width="1.6"><line x1="40" y1="152" x2="40" y2="146"/><line x1="90" y1="152" x2="90" y2="146"/><line x1="310" y1="152" x2="310" y2="146"/><line x1="360" y1="152" x2="360" y2="146"/></g>` +
    // 時計塔(左)
    `<rect x="52" y="60" width="26" height="86" fill="#c8c2b0"/>` +
    `<path d="M48,60h34l-3,-14h-28z" fill="#7f8388"/>` +
    `<circle cx="65" cy="80" r="9" fill="#f6efe2" stroke="#4a4f56" stroke-width="1.4"/>` +
    `<line x1="65" y1="80" x2="65" y2="74" stroke="#2a2a30" stroke-width="1.6"/>` +
    `<line x1="65" y1="80" x2="70" y2="82" stroke="#2a2a30" stroke-width="1.6"/>` +
    // 国会議事堂の棟(左、時計塔の隣)
    `<rect x="10" y="112" width="40" height="34" fill="#9a9488"/>` +
    `<g fill="#4a5560"><rect x="15" y="118" width="4" height="10"/><rect x="23" y="118" width="4" height="10"/><rect x="31" y="118" width="4" height="10"/><rect x="39" y="118" width="4" height="10"/></g>` +
    // 観覧車(右)
    `<circle cx="330" cy="90" r="34" fill="none" stroke="#8a8478" stroke-width="2.4"/>` +
    `<g stroke="#9a9488" stroke-width="1"><line x1="330" y1="56" x2="330" y2="124"/><line x1="296" y1="90" x2="364" y2="90"/><line x1="306" y1="66" x2="354" y2="114"/><line x1="306" y1="114" x2="354" y2="66"/></g>` +
    `<g fill="#4a5560"><rect x="326" y="52" width="8" height="6"/><rect x="326" y="122" width="8" height="6"/><rect x="296" y="86" width="8" height="6"/><rect x="356" y="86" width="8" height="6"/></g>` +
    // 高層ビル群(右奥)
    `<g fill="#7f8896"><rect x="360" y="70" width="20" height="48"/><rect x="382" y="55" width="16" height="63"/></g>` +
    // 街路(手前、バスと小道具)
    ground(200, "#6b6558") +
    doubleDecker(60, 208) +
    doubleDecker(240, 208, 30) +
    phoneBox(180, 208) +
    postBox(330, 206) +
    gull(120, 44, 1) +
    gull(200, 34, 0.8) +
    gull(20, 60, 1),

  /**
   * 大聖堂の町。カンタベリー・ダラム・セント・デイヴィッズ。
   * 尖塔と市場町の家並み、生垣と木立。
   */
  cathedral:
    sky("#8fc4e8", "#cfe4f0", 128) +
    clouds(60, 24, 1) +
    hills(126, "#8fae7a") +
    ground(128, "#7f9f5f") +
    // 川(手前)
    `<rect x="0" y="176" width="400" height="34" fill="#4a7f9f"/>` +
    ripples(190, "#bfe8f4") +
    // 大聖堂本体(左)
    `<rect x="50" y="100" width="70" height="60" fill="#c8c2b0"/>` +
    cathedralTower(50, 160, 20, 60) +
    cathedralTower(120, 160, 20, 60) +
    `<rect x="80" y="130" width="20" height="30" fill="#d8d2c0"/>` +
    `<path d="M80,130h20l-10,-16z" fill="#7f8388"/>` +
    // 市場町の家並み(右)
    georgianTerrace(200, 172, 26, 34, 6, "#e8dcc0") +
    // 手前の木立と生垣
    hedgerow(20, 172, 60, "#5f7f4a") +
    hedgerow(340, 172, 50, "#5f7f4a") +
    `<circle cx="30" cy="164" r="14" fill="#3f7f4a"/><rect x="28" y="176" width="4" height="10" fill="#5a4526"/>` +
    `<circle cx="370" cy="160" r="12" fill="#3f7f4a"/><rect x="368" y="170" width="4" height="10" fill="#5a4526"/>` +
    bunting(140, 168, 200, 168, 6),

  /**
   * 現代の市街。コヴェントリー・レスター。再建された尖塔と近代建築。
   */
  citycentre:
    sky("#a8b8c0", "#dfe4e0", 140) +
    raincloud(80, 30, 1) +
    raincloud(300, 22, 0.8) +
    ground(140, "#8a8478") +
    // 近代ビル群
    `<g fill="#8f96a0"><rect x="30" y="60" width="34" height="80"/><rect x="70" y="40" width="30" height="100"/><rect x="290" y="55" width="30" height="85"/><rect x="326" y="80" width="26" height="60"/></g>` +
    `<g fill="#c8e0f0" opacity=".6"><rect x="36" y="70" width="4" height="4"/><rect x="46" y="70" width="4" height="4"/><rect x="36" y="82" width="4" height="4"/><rect x="76" y="48" width="4" height="4"/><rect x="86" y="48" width="4" height="4"/><rect x="76" y="62" width="4" height="4"/><rect x="296" y="64" width="4" height="4"/><rect x="332" y="88" width="4" height="4"/></g>` +
    // 再建された大聖堂の尖塔(中景右寄り、旧廃墟のアーチを添える)
    cathedralTower(230, 140, 16, 48) +
    `<path d="M204,140h20v-24l-10,8l-10,-8z" fill="none" stroke="#9a9488" stroke-width="2"/>` +
    // 歩行者専用の商店街(手前)
    ground(178, "#9a9484") +
    georgianTerrace(10, 178, 24, 26, 5, "#dfe0d8") +
    doubleDecker(300, 206) +
    phoneBox(260, 206) +
    rain(40, 20, 8, 42, 12) +
    rain(220, 10, 6, 40, 10),

  /**
   * 白い断崖。ドーヴァー専用。海峡と城、灯台。
   */
  cliffs:
    sky("#8fc4e8", "#cfe4f0", 96) +
    clouds(90, 26, 1) +
    sun(350, 40, 20) +
    // 海峡(フランス側の岸をうっすら)
    `<rect x="0" y="96" width="400" height="60" fill="#3f7fae"/>` +
    ripples(112, "#bfe8f4") +
    `<path d="M0,100q200,-6 400,2v4q-200,-6 -400,2z" fill="#7f9fae" opacity=".4"/>` +
    // 白亜の断崖(全幅)
    `<path d="M0,210V150q40,-40 90,-30t90,10t90,-14t130,20V210z" fill="#e8e2d0"/>` +
    `<path d="M0,164q40,-38 90,-28t90,10t90,-13t130,19" fill="none" stroke="#d0cab8" stroke-width="3"/>` +
    // ドーヴァー城(崖の上)
    castleTower(70, 150, 14, 28) +
    castleWall(80, 130, 150, 16) +
    castleTower(130, 150, 14, 24) +
    // 灯台(右手前の崖)
    `<rect x="330" y="118" width="10" height="32" fill="#e8e2d0"/>` +
    `<g fill="#c8383f"><rect x="330" y="118" width="10" height="6"/><rect x="330" y="130" width="10" height="6"/></g>` +
    `<rect x="328" y="112" width="14" height="6" fill="#4a4f56"/>` +
    // フェリー
    `<rect x="150" y="176" width="60" height="16" rx="2" fill="#f6efe2"/>` +
    `<rect x="160" y="166" width="40" height="10" fill="#5b8fe8"/>` +
    // ユーロトンネルの入口(海岸線の切れ目)
    `<rect x="250" y="196" width="16" height="10" fill="#3a3a40"/>` +
    // 崖の上の芝と小道具
    `<g fill="#7f9f5f"><ellipse cx="30" cy="149" rx="6" ry="2.4"/><ellipse cx="180" cy="149" rx="6" ry="2.4"/><ellipse cx="300" cy="149" rx="6" ry="2.4"/></g>` +
    `<circle cx="90" cy="146" r="1.6" fill="#f6efe2"/><circle cx="96" cy="147" r="1.6" fill="#f6efe2"/><circle cx="220" cy="146" r="1.6" fill="#f6efe2"/>` +
    // 沖のヨット
    `<path d="M370,150l0,-14l10,14z" fill="#f6efe2"/><line x1="370" y1="150" x2="370" y2="136" stroke="#4a4a52" stroke-width="1"/>` +
    gull(120, 50, 1) +
    gull(200, 40, 0.8) +
    gull(280, 60, 1) +
    gull(60, 70, 0.7) +
    gull(340, 46, 0.9),

  /**
   * 海辺。ブライトン・カウズ。桟橋とデッキチェア、ジョージ王朝の海岸通り。
   */
  seaside:
    sky("#8fc4e8", "#cfe4f0", 108) +
    sun(340, 42, 22) +
    clouds(80, 28, 1) +
    `<rect x="0" y="108" width="400" height="62" fill="#1e6ea0"/>` +
    ripples(124, "#bfe8f4") +
    `<path d="M0,148c60,-8 120,4 200,-2c80,-6 140,4 200,-2v64H0z" fill="#c8c2ac"/>` +
    // 桟橋
    pier(200, 176, 160, 26) +
    `<rect x="352" y="140" width="30" height="22" fill="#e8dcc0"/>` +
    `<path d="M350,140h34l-4,-8h-26z" fill="#c8383f"/>` +
    // 海辺の遊歩道(ジョージ王朝様式)
    georgianTerrace(10, 148, 24, 24, 6, "#e8dcc0") +
    // デッキチェアとパラソル
    `<g><path d="M40,172a18,9 0 0 1 36,0z" fill="#c8383f"/><rect x="57" y="172" width="3" height="26" fill="#6b5330"/></g>` +
    `<g><path d="M110,176a14,7 0 0 1 28,0z" fill="#f5b31c"/><rect x="123" y="176" width="3" height="22" fill="#6b5330"/></g>` +
    `<g fill="#f6efe2" stroke="#c8383f" stroke-width="1.5"><rect x="150" y="182" width="14" height="10"/><line x1="150" y1="185" x2="164" y2="185"/><line x1="150" y1="188" x2="164" y2="188"/></g>` +
    // アイスクリームの屋台
    `<rect x="20" y="186" width="14" height="12" fill="#5b8fe8"/><path d="M18,186h18l-2,-6h-14z" fill="#f6efe2"/>` +
    gull(250, 40, 1) +
    gull(290, 55, 0.8) +
    gull(310, 30, 1),

  /**
   * 大学の街。オックスフォード・ケンブリッジ。尖塔とカレッジの中庭、
   * 川辺のパント遊び、自転車。
   */
  university:
    sky("#8fc4e8", "#cfe4f0", 118) +
    clouds(320, 26, 1) +
    ground(118, "#8a8478") +
    // カレッジの尖塔群(奥)
    `<g fill="#c8c2b0"><rect x="40" y="70" width="18" height="48"/><rect x="90" y="55" width="16" height="63"/><rect x="300" y="66" width="18" height="52"/></g>` +
    `<g fill="#8a8478"><path d="M40,70h18l-9,-16z"/><path d="M90,55h16l-8,-14z"/><path d="M300,66h18l-9,-15z"/></g>` +
    // カレッジの塀(中景)
    `<rect x="0" y="118" width="400" height="20" fill="#c8bda0"/>` +
    `<g fill="#b0a488"><rect x="20" y="118" width="10" height="20"/><rect x="140" y="118" width="10" height="20"/><rect x="260" y="118" width="10" height="20"/><rect x="360" y="118" width="10" height="20"/></g>` +
    // 中庭の芝生
    ground(138, "#7f9f5f") +
    // カム川/アイシス川(手前)
    `<rect x="0" y="168" width="400" height="42" fill="#4a7f9f"/>` +
    ripples(182, "#bfe8f4") +
    ripples(198, "#bfe8f4") +
    // パント(平底舟)
    `<rect x="90" y="182" width="46" height="9" rx="1" fill="#6b5330"/>` +
    `<circle cx="105" cy="176" r="3.4" fill="#f6efe2"/><rect x="103" y="179" width="4" height="6" fill="#2a2a30"/>` +
    `<line x1="130" y1="200" x2="118" y2="160" stroke="#5a4526" stroke-width="1.6"/>` +
    `<rect x="250" y="186" width="40" height="8" rx="1" fill="#6b5330"/>` +
    // 自転車(オックスブリッジの定番)
    `<g stroke="#2a2a30" stroke-width="1.6" fill="none"><circle cx="30" cy="150" r="8"/><circle cx="52" cy="150" r="8"/><path d="M30,150l12,-14h10l-4,14M42,136l6,14"/></g>` +
    `<circle cx="200" cy="130" r="10" fill="#f2f0e8" opacity=".8"/>` +
    `<g fill="#c8bda0"><rect x="260" y="150" width="70" height="18"/></g>` +
    `<g fill="#4a5560"><rect x="270" y="155" width="8" height="8"/><rect x="285" y="155" width="8" height="8"/><rect x="300" y="155" width="8" height="8"/><rect x="315" y="155" width="8" height="8"/></g>` +
    gull(340, 40, 1) +
    gull(360, 55, 0.7) +
    gull(370, 30, 0.9),

  /**
   * ジョージ王朝様式の温泉町。バース・バクストン。三日月形の街区と
   * 蒸気の立つ浴場。
   */
  georgian:
    sky("#8fc4e8", "#cfe4f0", 116) +
    clouds(80, 24, 1) +
    hills(114, "#8fae7a") +
    ground(116, "#7f9f5f") +
    // 三日月形のクレセント(奥、弧を描く連棟)
    `<path d="M20,140Q200,70 380,140" fill="none" stroke="#c8bda0" stroke-width="30"/>` +
    `<g fill="#4a5560"><rect x="40" y="126" width="5" height="7"/><rect x="60" y="118" width="5" height="7"/><rect x="90" y="108" width="5" height="7"/><rect x="130" y="98" width="5" height="7"/><rect x="180" y="92" width="5" height="7"/><rect x="230" y="94" width="5" height="7"/><rect x="270" y="102" width="5" height="7"/><rect x="310" y="114" width="5" height="7"/><rect x="340" y="124" width="5" height="7"/></g>` +
    // 手前の温泉施設(浴場のドーム)
    `<rect x="150" y="150" width="100" height="40" fill="#e8dcc0"/>` +
    `<path d="M170,150a30,20 0 0 1 60,0z" fill="#c8bda0"/>` +
    georgianTerrace(10, 190, 24, 20, 5, "#dfd4b8") +
    georgianTerrace(280, 190, 24, 20, 4, "#dfd4b8") +
    // 湯気
    `<g opacity=".6" fill="#f6efe2"><ellipse cx="190" cy="140" rx="10" ry="5"/><ellipse cx="210" cy="132" rx="8" ry="4"/><ellipse cx="200" cy="124" rx="6" ry="3"/></g>` +
    bunting(60, 150, 150, 130, 5),

  /**
   * 港町。ブリストル・リヴァプール・ベルファスト。起重機と倉庫、
   * 吊り橋のシルエット。
   */
  harbour:
    sky("#8fc4e8", "#cfe4f0", 118) +
    clouds(300, 26, 1) +
    ground(118, "#8a8478") +
    gull(60, 44, 1) +
    gull(100, 56, 0.8) +
    // 吊り橋(奥、渓谷にかかる)
    `<path d="M20,100Q90,50 160,100" fill="none" stroke="#4a4f56" stroke-width="2.4"/>` +
    `<g stroke="#6b6558" stroke-width="1"><line x1="35" y1="100" x2="35" y2="92"/><line x1="55" y1="100" x2="55" y2="76"/><line x1="90" y1="100" x2="90" y2="58"/><line x1="125" y1="100" x2="125" y2="76"/><line x1="145" y1="100" x2="145" y2="92"/></g>` +
    `<rect x="18" y="60" width="6" height="42" fill="#4a4f56"/><rect x="156" y="60" width="6" height="42" fill="#4a4f56"/>` +
    // 波止場の倉庫群
    `<g fill="#9a5a4a"><rect x="200" y="80" width="50" height="40" /><rect x="256" y="70" width="40" height="50"/></g>` +
    `<g fill="#3a3540"><path d="M200,80h50l0,-6h-50z"/><path d="M256,70h40l0,-6h-40z"/></g>` +
    // 埠頭(手前)
    `<rect x="0" y="120" width="400" height="10" fill="#8a8478"/>` +
    // 起重機
    `<rect x="40" y="120" width="4" height="-60" fill="#c8383f"/>` +
    `<rect x="30" y="60" width="30" height="4" fill="#c8383f"/>` +
    `<line x1="56" y1="63" x2="56" y2="90" stroke="#c8383f" stroke-width="2"/>` +
    `<rect x="330" y="120" width="4" height="-52" fill="#c8383f"/>` +
    `<rect x="322" y="68" width="26" height="4" fill="#c8383f"/>` +
    // 海と船
    `<rect x="0" y="130" width="400" height="80" fill="#2f6ea8"/>` +
    ripples(146, "#7fa8c4") +
    `<rect x="180" y="150" width="90" height="20" rx="2" fill="#e8443f"/>` +
    `<rect x="190" y="138" width="70" height="14" fill="#f6efe2"/>` +
    `<g fill="#5b8fe8"><rect x="198" y="141" width="10" height="8"/><rect x="214" y="141" width="10" height="8"/><rect x="230" y="141" width="10" height="8"/></g>` +
    `<rect x="60" y="172" width="50" height="14" rx="2" fill="#4a5560"/>` +
    gull(140, 50, 1) +
    gull(220, 60, 0.7) +
    postBox(20, 130) +
    `<g fill="#c8ccc4" opacity=".5"><ellipse cx="60" cy="52" rx="18" ry="7"/><ellipse cx="336" cy="46" rx="16" ry="6"/></g>`,

  /**
   * ストーンヘンジのある平原。ソールズベリー専用。環状列石と羊、
   * 古墳、遠くに大聖堂の尖塔。
   */
  stonehenge:
    sky("#8fc4e8", "#cfe4f0", 130) +
    clouds(70, 26, 1) +
    clouds(320, 22, 0.8) +
    hills(128, "#8fae63", 5) +
    ground(130, "#a8bd6a") +
    // 遠くのソールズベリー大聖堂(尖塔、イギリス最高)
    cathedralTower(350, 128, 8, 30) +
    // 古墳(丸い塚)
    `<path d="M40,190a16,7 0 0 1 32,0z" fill="#8fae63" stroke="#5f8a4a" stroke-width="1"/>` +
    `<path d="M320,196a10,5 0 0 1 20,0z" fill="#8fae63" stroke="#5f8a4a" stroke-width="1"/>` +
    // 環状列石(中央、大きく)
    `<g fill="#9a9488">` +
    `<rect x="150" y="150" width="10" height="40"/><rect x="175" y="145" width="10" height="45"/><rect x="200" y="142" width="10" height="48"/><rect x="225" y="145" width="10" height="45"/><rect x="250" y="150" width="10" height="40"/>` +
    `</g>` +
    `<g fill="#8a8478"><rect x="148" y="146" width="14" height="6"/><rect x="173" y="141" width="14" height="6"/><rect x="198" y="138" width="14" height="6"/><rect x="223" y="141" width="14" height="6"/><rect x="248" y="146" width="14" height="6"/></g>` +
    // 後方の石(奥まった立石)
    `<g fill="#8a8478"><rect x="165" y="160" width="8" height="30"/><rect x="235" y="160" width="8" height="30"/></g>` +
    flock(90, 186, 5, 40) +
    flock(300, 190, 4, 36),

  /**
   * 工業都市。バーミンガム・マンチェスター・リーズ。赤レンガの紡績工場と
   * 運河、鉄道の高架橋。
   */
  millcity:
    sky("#a8b0a8", "#dfe0d8", 110) +
    raincloud(80, 26, 1) +
    raincloud(280, 20, 0.8) +
    ground(110, "#8a8478") +
    // 高架橋(奥)
    `<g fill="#6b6558"><rect x="0" y="90" width="400" height="8"/><rect x="20" y="98" width="10" height="14"/><rect x="90" y="98" width="10" height="14"/><rect x="160" y="98" width="10" height="14"/><rect x="230" y="98" width="10" height="14"/><rect x="300" y="98" width="10" height="14"/><rect x="370" y="98" width="10" height="14"/></g>` +
    steamTrain(120, 98, 0.7) +
    // 工場の煙突群
    millChimney(60, 150, 70) +
    millChimney(340, 150, 60) +
    `<rect x="80" y="100" width="140" height="50" fill="#8a5a4a"/>` +
    `<g fill="#dfe8ee"><rect x="90" y="112" width="10" height="10"/><rect x="108" y="112" width="10" height="10"/><rect x="126" y="112" width="10" height="10"/><rect x="144" y="112" width="10" height="10"/><rect x="162" y="112" width="10" height="10"/><rect x="180" y="112" width="10" height="10"/><rect x="198" y="112" width="10" height="10"/></g>` +
    // 運河(手前)
    `<rect x="0" y="150" width="400" height="60" fill="#3f6f7f"/>` +
    ripples(164, "#7fa8c4") +
    // 曳舟道の連棟住宅
    terracedRow(0, 150, 34, 26, 6, "#9a5a4a") +
    terracedRow(250, 150, 30, 24, 5, "#8a5040") +
    `<rect x="180" y="176" width="60" height="10" rx="2" fill="#3f7a5a"/>` +
    `<rect x="190" y="166" width="10" height="12" fill="#f2ead6"/>`,

  /**
   * テューダー様式の町並み。ストラトフォード・アポン・エイヴォン専用。
   * 木骨造りの家並みとエイヴォン川、白鳥、劇場。
   */
  tudor:
    sky("#8fc4e8", "#cfe4f0", 130) +
    clouds(70, 26, 1) +
    hills(128, "#8fae7a") +
    ground(130, "#7f9f5f") +
    // 木骨造りの家並み(奥)
    tudorHouse(50, 168, 44, 38) +
    tudorHouse(100, 170, 38, 34) +
    tudorHouse(320, 168, 46, 38) +
    tudorHouse(365, 172, 34, 30) +
    // 劇場(左手前、エイヴォン河畔)
    `<rect x="150" y="150" width="80" height="30" fill="#9a5a4a"/>` +
    `<path d="M150,150h80l-6,-10h-68z" fill="#3a3540"/>` +
    `<rect x="180" y="160" width="20" height="20" fill="#dfe8ee"/>` +
    // エイヴォン川(手前)
    `<rect x="0" y="180" width="400" height="30" fill="#4a7f9f"/>` +
    ripples(192, "#bfe8f4") +
    // 白鳥
    `<path d="M40,192q-6,-8 2,-12q6,2 2,8" fill="#f6efe2"/><ellipse cx="42" cy="196" rx="8" ry="4" fill="#f6efe2"/>` +
    `<path d="M280,196q-6,-8 2,-12q6,2 2,8" fill="#f6efe2"/><ellipse cx="282" cy="200" rx="8" ry="4" fill="#f6efe2"/>` +
    // 柳の木
    `<path d="M20,168q0,-30 20,-34q-14,10 -10,34z" fill="#7fae63"/>` +
    `<path d="M340,164q0,-26 18,-30q-12,9 -9,30z" fill="#7fae63"/>` +
    bunting(110, 152, 150, 152, 4),

  /**
   * シャーウッドの森。ノッティンガム専用。古樹と鹿、岩山の城、
   * 弓を構える人影。
   */
  sherwood:
    sky("#8fc4e8", "#cfe4f0", 108) +
    clouds(310, 24, 1) +
    hills(106, "#5f7f4a") +
    ground(108, "#6f8a52") +
    // 岩山の城(奥、崖の上)
    `<path d="M280,150L300,90L340,150z" fill="#8a8478"/>` +
    castleTower(310, 96, 14, 26) +
    // 古樹(メイジャー・オーク見立て、幹が太く節くれ立つ)
    `<path d="M60,200Q54,150 70,120Q80,140 78,170Q90,150 100,130" fill="none" stroke="#5a4526" stroke-width="10" stroke-linecap="round"/>` +
    `<circle cx="70" cy="110" r="38" fill="#3f6b3a"/>` +
    `<circle cx="45" cy="128" r="20" fill="#3f6b3a"/>` +
    `<circle cx="98" cy="122" r="22" fill="#3f6b3a"/>` +
    // 鹿
    `<g fill="#8a6a4a"><ellipse cx="200" cy="188" rx="10" ry="6"/><rect x="196" y="192" width="2.4" height="8"/><rect x="204" y="192" width="2.4" height="8"/></g>` +
    `<path d="M192,180q-3,-6 -1,-9M192,180q1,-6 4,-8" stroke="#5a4526" stroke-width="1" fill="none"/>` +
    `<g fill="#7a5a3a"><ellipse cx="230" cy="196" rx="8" ry="5"/><rect x="227" y="199" width="2" height="6"/><rect x="233" y="199" width="2" height="6"/></g>` +
    // 弓を構える人影(緑の服)
    `<circle cx="140" cy="172" r="4" fill="#3f6b3a"/><rect x="138.5" y="176" width="3" height="12" fill="#2f5f2a"/>` +
    `<path d="M148,166q6,10 0,22" fill="none" stroke="#6b5330" stroke-width="1.4"/>` +
    // 落ち葉と下草
    `<g fill="#7a9a52" opacity=".8"><circle cx="160" cy="200" r="3"/><circle cx="250" cy="204" r="3"/><circle cx="300" cy="200" r="3"/><circle cx="30" cy="204" r="3"/></g>` +
    `<circle cx="340" cy="130" r="16" fill="#3f6b3a"/><rect x="337" y="140" width="4" height="12" fill="#5a4526"/>` +
    `<circle cx="20" cy="150" r="14" fill="#3f6b3a"/><rect x="17" y="160" width="4" height="10" fill="#5a4526"/>`,

  /**
   * 城壁の町。ヨーク・チェスター・デリー。城壁の見張り塔と門、
   * 大聖堂の尖塔、細い商店街。
   */
  walledtown:
    sky("#8fc4e8", "#cfe4f0", 118) +
    clouds(60, 24, 1) +
    ground(118, "#8a8478") +
    // 大聖堂の尖塔(奥)
    cathedralTower(200, 118, 18, 44) +
    `<rect x="180" y="98" width="40" height="20" fill="#c8c2b0"/>` +
    // 城壁(全幅、見張り塔つき)
    castleWall(0, 140, 150, 18) +
    castleTower(0, 150, 20, 30) +
    castleTower(140, 150, 20, 30) +
    castleWall(160, 260, 150, 18) +
    castleTower(260, 150, 20, 30) +
    castleWall(280, 400, 150, 18) +
    castleTower(400, 150, 18, 28) +
    // 門(中央)
    `<rect x="190" y="122" width="20" height="28" fill="#2a2a30"/>` +
    // 城壁内の細い商店街(手前)
    ground(168, "#9a9484") +
    georgianTerrace(20, 200, 20, 30, 6, "#e8dcc0") +
    georgianTerrace(220, 200, 20, 30, 8, "#dfd4b8") +
    `<path d="M0,168h400" stroke="#7a7468" stroke-width="1"/>`,

  /**
   * 川に橋の架かる町。ニューカッスル専用。異なる意匠の橋が連なるタイン川。
   */
  riverbridges:
    sky("#8fc4e8", "#cfe4f0", 108) +
    clouds(60, 24, 1) +
    ground(108, "#8a8478") +
    // 丘の斜面の家並み(両岸)
    terracedRow(0, 108, 24, 30, 8, "#9a5a4a") +
    terracedRow(300, 100, 22, 38, 5, "#8a5040") +
    // タイン川(手前、複数の橋)
    `<rect x="0" y="138" width="400" height="72" fill="#4a7f9f"/>` +
    ripples(156, "#bfe8f4") +
    ripples(180, "#bfe8f4") +
    // アーチ橋(1928年風の大アーチ)
    `<path d="M40,150Q200,70 360,150" fill="none" stroke="#4a5560" stroke-width="4"/>` +
    `<path d="M40,150Q200,90 360,150" fill="none" stroke="#3a4550" stroke-width="2"/>` +
    `<rect x="30" y="150" width="10" height="20" fill="#4a5560"/><rect x="360" y="150" width="10" height="20" fill="#4a5560"/>` +
    // 旋回橋(手前、低い)
    `<rect x="150" y="164" width="100" height="6" fill="#6b6558"/>` +
    `<rect x="195" y="150" width="10" height="20" fill="#6b6558"/>` +
    // ミレニアム・ブリッジ(まぶたのように傾いた歩道橋)
    `<path d="M260,168Q300,140 340,168" fill="none" stroke="#9a9ea4" stroke-width="2.4"/>` +
    `<path d="M260,168Q300,190 340,168" fill="none" stroke="#7f8388" stroke-width="1.6"/>`,

  /**
   * 湖水地方。ウィンダミア専用。湖と蒸気船、丘陵、石垣と農家。
   */
  lakedistrict:
    sky("#8fc4e8", "#cfe4f0", 100) +
    clouds(70, 26, 1) +
    hills(98, "#7a9a72") +
    // 丘の羊
    flock(60, 92, 4, 30) +
    flock(310, 88, 3, 24) +
    ground(100, "#7a9a72") +
    drystoneWall(20, 100, 100) +
    drystoneWall(260, 100, 120) +
    // 湖(手前)
    `<rect x="0" y="140" width="400" height="70" fill="#3f8fc4"/>` +
    ripples(156, "#bfe8f4") +
    ripples(178, "#bfe8f4") +
    // 蒸気船
    `<rect x="150" y="164" width="70" height="16" rx="2" fill="#f6efe2"/>` +
    `<rect x="165" y="152" width="10" height="14" fill="#c8383f"/>` +
    `<path d="M170,152c2,-6 -3,-9 0,-14" fill="none" stroke="#c8ccc4" stroke-width="1.6" opacity=".7"/>` +
    // 石造りの農家(手前)
    `<rect x="30" y="176" width="46" height="26" fill="#9a9488"/>` +
    `<path d="M24,176h58l-8,-14h-42z" fill="#4a4f56"/>` +
    `<rect x="45" y="188" width="12" height="14" fill="#2a2a30"/>` +
    `<rect x="320" y="182" width="40" height="20" fill="#9a9488"/>` +
    `<path d="M315,182h50l-7,-12h-36z" fill="#4a4f56"/>` +
    drystoneWall(90, 202, 200),

  /**
   * 城のある町。カーディフ・カーナーヴォン・コンウィ・エディンバラ。
   * 岩山の上の城と、それを見上げる町並み、掲げられた旗。
   */
  castletown:
    // 岩山は中央のみ(x=120〜280)なので、空は町並みの土台(y=150)まで
    // 塗る(渡し忘れると岩山の左右で空と地面のあいだが透ける)。
    sky("#8fc4e8", "#cfe4f0", 150) +
    clouds(300, 26, 1) +
    gull(60, 40, 1) +
    gull(340, 50, 0.8) +
    hills(150, "#8fae7a", 6) +
    // 岩山(城の台座)
    `<path d="M120,150L160,60L240,60L280,150z" fill="#7f8478"/>` +
    `<path d="M140,150L165,90L235,90L260,150z" fill="#6f746a"/>` +
    // 城本体
    castleTower(140, 90, 22, 40) +
    castleWall(160, 240, 90, 22) +
    castleTower(240, 90, 22, 44) +
    castleTower(190, 90, 18, 52) +
    // 旗
    `<rect x="190" y="30" width="2" height="12" fill="#4a4f56"/><path d="M192,30h16l-6,5l6,5h-16z" fill="#c8383f"/>` +
    ground(150, "#8a8478") +
    // 町並み(城の下)
    georgianTerrace(20, 190, 24, 34, 6, "#e8dcc0") +
    georgianTerrace(280, 190, 24, 30, 5, "#dfd4b8") +
    // 手前の通り
    ground(196, "#9a9484") +
    doubleDecker(160, 206) +
    phoneBox(230, 206) +
    bunting(30, 188, 260, 176, 8),

  /**
   * 港の集落。スウォンジー・ポートリー・ホーリーヘッド・スタランレア。
   * 色とりどりの家並みと漁船、断崖。
   */
  coasttown:
    sky("#8fc4e8", "#cfe4f0", 110) +
    clouds(80, 24, 1) +
    // 崖(右手)
    `<path d="M340,150V90q30,-6 40,20V150z" fill="#9a9488"/>` +
    ground(110, "#7f9f5f") +
    // 彩色された家並み(港沿い)
    `<g>` +
    `<rect x="30" y="140" width="30" height="34" fill="#e8443f"/><path d="M28,140h34l-5,-10h-24z" fill="#4a4f56"/>` +
    `<rect x="62" y="146" width="28" height="28" fill="#5b8fe8"/><path d="M60,146h32l-5,-9h-22z" fill="#4a4f56"/>` +
    `<rect x="92" y="138" width="30" height="36" fill="#f5b31c"/><path d="M90,138h34l-5,-10h-24z" fill="#4a4f56"/>` +
    `<rect x="124" y="148" width="26" height="26" fill="#f6efe2"/><path d="M122,148h30l-4,-9h-22z" fill="#4a4f56"/>` +
    `<rect x="152" y="142" width="28" height="32" fill="#7fae5a"/><path d="M150,142h32l-5,-9h-22z" fill="#4a4f56"/>` +
    `</g>` +
    `<g fill="#4a5560" opacity=".8"><rect x="38" y="150" width="6" height="6"/><rect x="70" y="154" width="6" height="6"/><rect x="100" y="148" width="6" height="6"/><rect x="132" y="156" width="6" height="6"/><rect x="160" y="150" width="6" height="6"/></g>` +
    // 港(手前)
    `<rect x="0" y="176" width="400" height="34" fill="#2f6ea8"/>` +
    ripples(190, "#7fa8c4") +
    // 漁船
    `<path d="M200,192c0,-4 40,-4 40,0l-4,8h-32z" fill="#e8dcc0"/><rect x="216" y="176" width="3" height="16" fill="#4a3620"/>` +
    `<path d="M260,196c0,-3 26,-3 26,0l-3,6h-20z" fill="#c8383f"/>` +
    // 岸壁
    `<rect x="0" y="170" width="200" height="8" fill="#8a8478"/>` +
    gull(220, 46, 1) +
    gull(250, 34, 0.8) +
    gull(300, 56, 0.7) +
    // 係留のロープと浮き
    `<g fill="#f5b31c"><circle cx="180" cy="188" r="3"/><circle cx="290" cy="184" r="3"/><circle cx="330" cy="190" r="3"/></g>` +
    `<line x1="216" y1="192" x2="200" y2="176" stroke="#5a4526" stroke-width="1"/>` +
    // 崖の草
    `<g fill="#7f9f5f"><ellipse cx="360" cy="88" rx="8" ry="3"/><ellipse cx="380" cy="100" rx="6" ry="2.4"/></g>` +
    clouds(200, 22, 0.8),

  /**
   * ハイランド。フォート・ウィリアム・インヴァネス・マーン。峰と湖、
   * ヒースの紫、ハイランド牛。
   */
  highland:
    sky("#8fc4e8", "#cfe4f0", 130) +
    clouds(310, 24, 1) +
    graniteMountain(80, 128, 100, "#7f8478") +
    graniteMountain(180, 136, 76, "#8b8f88") +
    graniteMountain(320, 130, 88, "#7f8478") +
    ground(130, "#8a9a6a") +
    // ヒースの群落
    heatherClump(40, 148, 8) +
    heatherClump(60, 156, 6) +
    heatherClump(340, 150, 8) +
    heatherClump(300, 160, 6) +
    heatherClump(120, 160, 5) +
    // ロッホ(手前)
    `<path d="M100,160c20,20 -10,40 4,50h140c14,-10 -16,-30 4,-50z" fill="#3f6f8f"/>` +
    ripples(184, "#7fa8c4") +
    // 石橋
    `<path d="M170,170q30,-14 60,0" fill="none" stroke="#8a8478" stroke-width="5"/>` +
    // ハイランド牛(手前)
    `<g><ellipse cx="60" cy="196" rx="14" ry="8" fill="#a86a3a"/><rect x="56" y="192" width="6" height="6" fill="#8a5a2a"/>` +
    `<path d="M52,190q-4,-4 -6,-2M68,190q4,-4 6,-2" stroke="#4a3620" stroke-width="1.6" fill="none"/>` +
    `<g fill="#4a3620"><rect x="52" y="202" width="2.4" height="6"/><rect x="58" y="202" width="2.4" height="6"/><rect x="64" y="202" width="2.4" height="6"/></g></g>` +
    // 鹿(遠景)
    `<g fill="#8a6a4a" opacity=".9"><ellipse cx="330" cy="180" rx="7" ry="4"/><rect x="327" y="183" width="1.8" height="6"/><rect x="333" y="183" width="1.8" height="6"/></g>`,

  /**
   * 造船の町。グラスゴー専用。クライド川の起重機と建造中の船体、
   * テネメント(石造集合住宅)。
   */
  shipyard:
    sky("#a8b0a8", "#dfe4e0", 108) +
    raincloud(90, 24, 1) +
    ground(108, "#8a8478") +
    // テネメント(石造集合住宅、丘の斜面)
    `<g fill="#9a9488"><rect x="20" y="70" width="34" height="38"/><rect x="56" y="60" width="30" height="48"/><rect x="320" y="66" width="32" height="42"/></g>` +
    `<g fill="#4a5560"><rect x="28" y="80" width="6" height="8"/><rect x="40" y="80" width="6" height="8"/><rect x="64" y="70" width="6" height="8"/><rect x="76" y="70" width="6" height="8"/><rect x="328" y="76" width="6" height="8"/><rect x="340" y="76" width="6" height="8"/></g>` +
    // クライド川(手前)
    `<rect x="0" y="140" width="400" height="70" fill="#4a7f9f"/>` +
    ripples(154, "#7fa8c4") +
    // 建造中の船体
    `<path d="M140,150q60,-20 140,0l-10,20h-120z" fill="#4a5560"/>` +
    `<g stroke="#2a2a30" stroke-width="1"><line x1="160" y1="150" x2="160" y2="168"/><line x1="200" y1="148" x2="200" y2="170"/><line x1="240" y1="150" x2="240" y2="168"/></g>` +
    // 起重機(大型、造船所の象徴)
    `<rect x="60" y="60" width="4" height="90" fill="#c8383f"/>` +
    `<rect x="30" y="60" width="60" height="4" fill="#c8383f"/>` +
    `<line x1="34" y1="64" x2="34" y2="100" stroke="#c8383f" stroke-width="2"/>` +
    `<rect x="330" y="70" width="4" height="80" fill="#c8383f"/>` +
    `<rect x="310" y="70" width="50" height="4" fill="#c8383f"/>` +
    `<line x1="314" y1="74" x2="314" y2="106" stroke="#c8383f" stroke-width="2"/>` +
    // 埠頭
    `<rect x="0" y="150" width="400" height="8" fill="#6b6558"/>` +
    // 作業員の姿(小さく)
    `<g fill="#f6efe2"><circle cx="150" cy="146" r="2.4"/><rect x="148.5" y="149" width="3" height="7"/></g>` +
    `<g fill="#f6efe2"><circle cx="230" cy="146" r="2.4"/><rect x="228.5" y="149" width="3" height="7"/></g>` +
    // リベットの点(船体、工業らしさを足す)
    `<g fill="#2a2a30" opacity=".6"><circle cx="170" cy="156" r=".8"/><circle cx="180" cy="158" r=".8"/><circle cx="210" cy="156" r=".8"/><circle cx="220" cy="158" r=".8"/></g>` +
    gull(30, 40, 1) +
    gull(370, 50, 0.8),

  /**
   * 花崗岩の町。アバディーン専用。灰色の建物と雲母のきらめき、
   * 港と沖の石油プラットフォーム補給船。
   */
  granitecity:
    sky("#8fc4e8", "#cfe4f0", 118) +
    sun(340, 40, 20) +
    clouds(80, 24, 1) +
    ground(118, "#9a9ea4") +
    // 花崗岩の建物群(雲母のきらめきを点で表す)
    `<g fill="#9a9ea4"><rect x="30" y="70" width="34" height="48"/><rect x="70" y="55" width="30" height="63"/><rect x="290" y="66" width="30" height="52"/><rect x="326" y="80" width="26" height="38"/></g>` +
    `<g fill="#c8ccd0" opacity=".8"><circle cx="40" cy="86" r=".8"/><circle cx="52" cy="94" r=".8"/><circle cx="80" cy="68" r=".8"/><circle cx="90" cy="80" r=".8"/><circle cx="300" cy="82" r=".8"/><circle cx="336" cy="92" r=".8"/></g>` +
    `<g fill="#7f8388"><path d="M30,70h34l-4,-8h-26z"/><path d="M70,55h30l-4,-8h-22z"/></g>` +
    // 港(手前)
    `<rect x="0" y="150" width="400" height="60" fill="#2f6ea8"/>` +
    ripples(166, "#7fa8c4") +
    // 補給船
    `<rect x="150" y="170" width="80" height="18" rx="2" fill="#f6efe2"/>` +
    `<rect x="200" y="156" width="16" height="16" fill="#e8443f"/>` +
    // 石油プラットフォーム(遠景)
    `<g stroke="#4a5560" stroke-width="1.6"><line x1="330" y1="180" x2="330" y2="150"/><line x1="345" y1="180" x2="345" y2="150"/><line x1="330" y1="150" x2="345" y2="150"/></g>` +
    `<rect x="325" y="144" width="26" height="8" fill="#8a8478"/>` +
    // 埠頭の小道具
    `<rect x="0" y="150" width="400" height="6" fill="#8a8478"/>` +
    postBox(140, 150) +
    `<g fill="#4a5560" opacity=".7"><rect x="40" y="98" width="4" height="4"/><rect x="46" y="98" width="4" height="4"/><rect x="52" y="98" width="4" height="4"/></g>` +
    gull(120, 40, 1) +
    gull(250, 50, 0.8) +
    gull(200, 34, 0.7),

  /**
   * リンクス・ゴルフの町。セント・アンドリューズ専用。砂丘のコースと旗、
   * クラブハウス、崩れた大聖堂。
   */
  linksgolf:
    sky("#8fc4e8", "#cfe4f0", 110) +
    clouds(80, 26, 1) +
    // 海(奥)
    `<rect x="0" y="80" width="400" height="40" fill="#3f8fc4"/>` +
    ripples(96, "#bfe8f4") +
    // 崩れた大聖堂(廃墟)
    `<g fill="#9a9488" opacity=".9"><rect x="330" y="70" width="8" height="50"/><rect x="352" y="80" width="8" height="40"/></g>` +
    `<path d="M330,70L338,58L346,70" fill="none" stroke="#8a8478" stroke-width="2"/>` +
    ground(120, "#b3c26a") +
    // 砂丘とバンカー
    `<ellipse cx="90" cy="150" rx="30" ry="8" fill="#e8dcc0"/>` +
    `<ellipse cx="260" cy="160" rx="24" ry="7" fill="#e8dcc0"/>` +
    hills(118, "#c8bd7a", 5) +
    // フェアウェイ(帯)
    `<path d="M0,150q200,-20 400,0v10q-200,-20 -400,0z" fill="#6f9a52"/>` +
    // グリーンと旗
    `<ellipse cx="200" cy="176" rx="26" ry="10" fill="#5f9a4a"/>` +
    `<line x1="200" y1="176" x2="200" y2="150" stroke="#6b6558" stroke-width="1.2"/>` +
    `<path d="M200,150h14l-14,7z" fill="#c8383f"/>` +
    // クラブハウス
    `<rect x="20" y="176" width="50" height="22" fill="#e8dcc0"/>` +
    `<path d="M16,176h58l-6,-10h-46z" fill="#4a4f56"/>` +
    // ゴルファーとキャディ
    `<circle cx="120" cy="190" r="3.4" fill="#f6efe2"/><rect x="118.5" y="193" width="3" height="10" fill="#4a5560"/>` +
    `<line x1="123" y1="196" x2="130" y2="200" stroke="#6b6558" stroke-width="1"/>` +
    // もう一つの旗とバンカーの縁取り
    `<line x1="320" y1="176" x2="320" y2="156" stroke="#6b6558" stroke-width="1.2"/>` +
    `<path d="M320,156h12l-12,6z" fill="#5b8fe8"/>` +
    `<ellipse cx="320" cy="176" rx="20" ry="8" fill="#5f9a4a"/>` +
    `<g stroke="#c8bd7a" stroke-width="1" fill="none" opacity=".7"><ellipse cx="90" cy="150" rx="32" ry="9"/><ellipse cx="260" cy="160" rx="26" ry="8"/></g>` +
    gull(360, 40, 0.9) +
    gull(30, 50, 0.8),

  /**
   * ジャイアンツ・コーズウェイ。ブッシュミルズ専用。六角形の玄武岩柱と
   * 崖、蒸留所の建物。
   */
  causeway:
    sky("#9fb8c8", "#dfe6e0", 96) +
    raincloud(80, 24, 1) +
    raincloud(300, 20, 0.8) +
    // 崖(奥)
    `<path d="M0,140V90q60,-20 120,0t120,0t120,0t40,10V140z" fill="#5f6a5a"/>` +
    ground(140, "#5f6a5a") +
    // 六角形の玄武岩柱(密集、コーズウェイの核)
    basaltColumn(60, 190, 30, 9) +
    basaltColumn(72, 190, 36, 9) +
    basaltColumn(84, 190, 26, 9) +
    basaltColumn(96, 190, 40, 9) +
    basaltColumn(108, 190, 30, 9) +
    basaltColumn(120, 190, 22, 9) +
    basaltColumn(132, 190, 34, 9) +
    basaltColumn(144, 190, 28, 9) +
    basaltColumn(156, 190, 38, 9) +
    basaltColumn(168, 190, 24, 9) +
    // 海
    `<rect x="0" y="190" width="400" height="20" fill="#2f6ea8"/>` +
    ripples(198, "#7fa8c4") +
    // 蒸留所の建物(右)
    `<rect x="280" y="150" width="60" height="40" fill="#e8dcc0"/>` +
    `<path d="M276,150h68l-8,-12h-52z" fill="#4a4f56"/>` +
    `<rect x="300" y="130" width="10" height="20" fill="#8a5a4a"/>` +
    `<path d="M300,130c2,-6 -3,-10 0,-16" fill="none" stroke="#c8ccc4" stroke-width="1.6" opacity=".7"/>` +
    `<g fill="#4a5560"><rect x="290" y="164" width="8" height="10"/><rect x="308" y="164" width="8" height="10"/><rect x="322" y="164" width="8" height="10"/></g>`,
};

export const UK_BG = UK_BASE_BG;

// ---------------------------------------------------------------------------
// 都市シンボル(21種)。鍵は cities.mjs の `mark` と対応。24×24の座標系。
// ---------------------------------------------------------------------------

export const UK_MARKS = {
  /** 国会議事堂の時計塔。ロンドン専用。 */
  capital:
    `<rect x="9" y="3" width="6" height="17" fill="#c8c2b0"/>` +
    `<path d="M8,3h8l-1,-4h-6z" fill="#4a4f56"/>` +
    `<circle cx="12" cy="8" r="2.4" fill="#f6efe2" stroke="#4a4f56" stroke-width=".8"/>` +
    `<rect x="5" y="20" width="14" height="2" fill="#6b6558"/>`,

  /** 大聖堂の尖塔。カンタベリー・ダラム・セント・デイヴィッズ・コヴェントリー・レスター。 */
  cathedral:
    `<rect x="7" y="12" width="10" height="9" fill="#c8c2b0"/>` +
    `<path d="M7,12L12,3L17,12z" fill="#8a8478"/>` +
    `<rect x="10.5" y="15" width="3" height="6" fill="#4a5560"/>`,

  /** 白い断崖。ドーヴァー専用。 */
  cliffs:
    `<path d="M2,21V13l6,-7l6,5l6,-4v14z" fill="#e8e2d0"/>` +
    `<path d="M2,21V13l6,-7l6,5l6,-4v3l-6,3l-6,-4l-6,6z" fill="#d8d2c0"/>` +
    `<rect x="0" y="19" width="24" height="2" fill="#3f7fae"/>`,

  /** 海に突き出た桟橋。ブライトン専用。 */
  pier:
    `<rect x="2" y="9" width="20" height="3" fill="#6b5330"/>` +
    `<g fill="#5a4526"><rect x="3" y="12" width="2" height="8"/><rect x="10" y="12" width="2" height="8"/><rect x="17" y="12" width="2" height="8"/></g>` +
    `<path d="M0,20h24" stroke="#3f8fc4" stroke-width="2"/>`,

  /** 尖塔とカレッジの中庭。オックスフォード・ケンブリッジ。 */
  university:
    `<rect x="4" y="13" width="16" height="8" fill="#e8dcc0"/>` +
    `<path d="M9,13L9,4L12,7L15,4L15,13z" fill="#c8bda0"/>` +
    `<rect x="10.5" y="16" width="3" height="5" fill="#4a3620"/>`,

  /** 弧を描くジョージ王朝様式の街並み。バース・バクストン。 */
  georgian:
    `<path d="M2,20Q12,10 22,20" fill="none" stroke="#e8dcc0" stroke-width="6"/>` +
    `<g fill="#4a5560"><rect x="4" y="15" width="2" height="3"/><rect x="9" y="10" width="2" height="3"/><rect x="13" y="10" width="2" height="3"/><rect x="18" y="15" width="2" height="3"/></g>`,

  /** 川に架かる橋。ブリストル・ニューカッスル。 */
  bridge:
    `<path d="M2,15Q12,3 22,15" fill="none" stroke="#8a8478" stroke-width="2.4"/>` +
    `<rect x="1" y="15" width="22" height="2" fill="#6b6558"/>` +
    `<g stroke="#6b6558" stroke-width="1.4"><line x1="6" y1="16" x2="6" y2="11"/><line x1="12" y1="16" x2="12" y2="5"/><line x1="18" y1="16" x2="18" y2="11"/></g>`,

  /** 環状に立つ巨石。ソールズベリー専用。 */
  stonehenge:
    `<g fill="#9a9488"><rect x="3" y="10" width="3" height="11"/><rect x="9" y="8" width="3" height="13"/><rect x="15" y="9" width="3" height="12"/><rect x="20" y="11" width="2" height="10"/></g>` +
    `<rect x="8" y="6" width="9" height="2.4" fill="#8a8478"/>`,

  /** 紡績工場の煙突。バーミンガム・マンチェスター・リーズ。 */
  mill:
    `<rect x="5" y="10" width="6" height="11" fill="#7a6a5a"/>` +
    `<rect x="13" y="4" width="4" height="17" fill="#6b5a4a"/>` +
    `<path d="M15,4c4,-3 -4,-6 0,-11" fill="none" stroke="#c8ccc4" stroke-width="1.6" opacity=".8"/>`,

  /** 木骨造りの家。ストラトフォード・アポン・エイヴォン専用。 */
  tudor:
    `<rect x="4" y="9" width="16" height="12" fill="#f2ead6"/>` +
    `<g stroke="#4a3620" stroke-width="1.6"><path d="M4,15h16M12,9v12M4,9L12,15L4,21M20,9L12,15L20,21"/></g>` +
    `<path d="M2,9h20l-3,-6h-14z" fill="#4a3620"/>`,

  /** 弓を構える緑の人影。ノッティンガム専用。 */
  outlaw:
    `<circle cx="12" cy="6" r="2.6" fill="#3f6b3a"/>` +
    `<rect x="10.5" y="8" width="3" height="8" fill="#2f5f2a"/>` +
    `<path d="M17,4Q21,10 17,17" fill="none" stroke="#6b5330" stroke-width="1.4"/>` +
    `<line x1="17" y1="4" x2="9" y2="10" stroke="#4a3620" stroke-width="1"/>`,

  /** 波止場と起重機。リヴァプール・ベルファスト・グラスゴー。 */
  docks:
    `<rect x="10" y="4" width="2" height="14" fill="#b0303a"/>` +
    `<rect x="10" y="4" width="9" height="2" fill="#b0303a"/>` +
    `<path d="M2,18h20l-3,4H5z" fill="#4a5560"/>`,

  /** 双塔の大聖堂。ヨーク専用。 */
  minster:
    `<rect x="4" y="12" width="6" height="9" fill="#c8c2b0"/>` +
    `<rect x="14" y="12" width="6" height="9" fill="#c8c2b0"/>` +
    `<rect x="9" y="15" width="6" height="6" fill="#d8d2c0"/>` +
    `<g fill="#8a8478"><rect x="4" y="9" width="6" height="3"/><rect x="14" y="9" width="6" height="3"/></g>`,

  /** 城壁の見張り塔。チェスター・デリー。 */
  romanwall:
    `<rect x="2" y="14" width="20" height="7" fill="#9a9488"/>` +
    `<g fill="#8a8478"><rect x="2" y="11" width="4" height="4"/><rect x="10" y="11" width="4" height="4"/><rect x="18" y="11" width="4" height="4"/></g>`,

  /** 湖面と峰。ウィンダミア専用。 */
  lake:
    `<rect x="2" y="14" width="20" height="7" fill="#3f8fc4"/>` +
    `<path d="M2,14L8,6L12,11L16,5L22,14z" fill="#7a9a72"/>` +
    `<path d="M4,18q4,-2 8,0t8,0" fill="none" stroke="#bfe8f4" stroke-width="1.2"/>`,

  /** 塔と城壁。カーディフ・カーナーヴォン・コンウィ・エディンバラ。 */
  castle:
    `<rect x="3" y="12" width="18" height="9" fill="#9a9488"/>` +
    `<g fill="#8a8478"><rect x="3" y="8" width="4" height="5"/><rect x="10" y="6" width="4" height="7"/><rect x="17" y="8" width="4" height="5"/></g>` +
    `<rect x="10" y="16" width="4" height="5" fill="#2a2a30"/>`,

  /** 波と帆船。スウォンジー・ポートリー・カウズ・ホーリーヘッド・スタランレア。 */
  coast:
    `<path d="M2,10q5,-4 10,0t10,0" fill="none" stroke="#3f8fc4" stroke-width="1.8"/>` +
    `<path d="M2,15q5,-4 10,0t10,0" fill="none" stroke="#5b8fe8" stroke-width="1.8"/>` +
    `<path d="M2,20h20" stroke="#e8dcc0" stroke-width="4"/>`,

  /** 二つ並んだ峰。フォート・ウィリアム・マーン・インヴァネス。 */
  mountain:
    `<path d="M2,20L9,7L14,14L17,9L22,20z" fill="#7f8478"/>` +
    `<path d="M9,7L11,11L7,12z" fill="#f2f6f8"/>` +
    `<path d="M17,9L18.5,12L15.5,12.5z" fill="#f2f6f8"/>`,

  /** 灰色の花崗岩の建物。アバディーン専用。 */
  granite:
    `<rect x="4" y="9" width="16" height="12" fill="#9a9ea4"/>` +
    `<g fill="#c8ccd0" opacity=".7"><circle cx="7" cy="13" r=".6"/><circle cx="12" cy="16" r=".6"/><circle cx="17" cy="12" r=".6"/><circle cx="9" cy="19" r=".6"/></g>` +
    `<path d="M4,9h16l-2,-5h-12z" fill="#7f8388"/>`,

  /** 旗の立つグリーン。セント・アンドリューズ専用。 */
  golf:
    `<path d="M2,21a10,4 0 0 1 20,0z" fill="#6f9a52"/>` +
    `<line x1="16" y1="21" x2="16" y2="4" stroke="#6b6558" stroke-width="1.2"/>` +
    `<path d="M16,4h6l-6,4z" fill="#c8383f"/>`,

  /** 六角形の石柱。ブッシュミルズ専用。 */
  causeway:
    `<g fill="#5a5f5c"><rect x="2" y="12" width="4" height="9"/><rect x="7" y="9" width="4" height="12"/><rect x="12" y="13" width="4" height="8"/><rect x="17" y="10" width="4" height="11"/></g>` +
    `<path d="M2,21h20" stroke="#3f8fc4" stroke-width="2"/>`,
};
