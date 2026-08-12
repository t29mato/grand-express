/**
 * アメリカ合衆国の都市イラスト。
 *
 * `USA_MARKS` は24×24の座標系に描くシンボル、`USA_BG` は400×210の座標系に
 * 描く背景シーン(いずれもSVG断片の文字列)。動きは含めない(アニメーションは
 * React側で重ねる)。
 *
 * 色は他の盤面と揃える。空 #8fc4e8〜#20364a、地面の緑 #2f4a33、
 * 顔・白 #f6efe2、強調 #f5b31c(金)/#e8443f(赤)/#5b8fe8(青)。
 * アメリカらしさは **赤煉瓦 #a5432c・鋼灰色 #7f8896・穀物色 #c9a877・
 * ネオン紫 #b34fd6・砂漠の赤茶 #c8834a** で出す。
 *
 * 鍵は `cities.mjs` の `mark` / `bg` と一対一で対応する(同じキー名)。
 * 増やすときは両方を揃えること。
 *
 * **背景SVGの中央25%(x=151〜249 / y=54〜152)は都市シンボルに隠れて
 * 見えない。** 見せたい細部は左右3分の1と手前(y>170)に置く。
 * `sky()` は必ず第3引数(次に来る塗りの開始y)を渡すこと。
 */

// ---------------------------------------------------------------------------
// 背景シーンの組み立て部品(汎用)
// ---------------------------------------------------------------------------

const W = 400;
const r1 = (v) => Math.round(v * 10) / 10;

function band(y, h, fill) {
  return `<rect x="0" y="${y}" width="${W}" height="${h}" fill="${fill}"/>`;
}

/** 空。**第3引数に「次に来る塗りの開始y」を渡すこと。** */
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

/** 鋭いギザギザの山並み(ロッキー・シエラネバダなど)。 */
function mountainRange(y, fill, count = 5, snow = null) {
  const parts = [];
  for (let i = 0; i < count; i++) {
    const cx = (i * W) / (count - 1);
    const h = 40 + (i % 3) * 14;
    parts.push(`<path d="M${cx - 44},${y}L${cx},${y - h}L${cx + 44},${y}z" fill="${fill}"/>`);
    if (snow) {
      parts.push(`<path d="M${cx - 14},${y - h + 18}L${cx},${y - h}L${cx + 14},${y - h + 18}z" fill="${snow}"/>`);
    }
  }
  return `<g>${parts.join("")}</g>`;
}

function gull(x, y, scale = 1) {
  const w = 8 * scale;
  return `<path d="M${r1(x - w)},${y}q${r1(w / 2)},-6 ${w},0q${r1(w / 2)},-6 ${w},0" fill="none" stroke="#4a4a52" stroke-width="1.4"/>`;
}

function ripples(y, color = "#bfe8f4") {
  return `<g stroke="${color}" stroke-width="2" opacity=".7" fill="none"><path d="M26,${y}h74M176,${y + 12}h92M108,${y + 24}h62"/></g>`;
}

function crane(x, base, h, fill = "#7f8896") {
  return (
    `<rect x="${r1(x - 2)}" y="${r1(base - h)}" width="4" height="${h}" fill="${fill}"/>` +
    `<rect x="${r1(x - 2)}" y="${r1(base - h)}" width="${r1(h * 0.72)}" height="4" fill="${fill}"/>` +
    `<line x1="${r1(x + h * 0.6)}" y1="${r1(base - h + 2)}" x2="${r1(x + h * 0.6)}" y2="${r1(base - h * 0.55)}" stroke="${fill}" stroke-width="2"/>`
  );
}

function roundTree(x, base, r, crown = "#4f8f4f", trunk = "#5a4630") {
  const th = r1(r * 1.1);
  return (
    `<rect x="${r1(x - r * 0.16)}" y="${r1(base - th - r * 0.3)}" width="${r1(r * 0.32)}" height="${r1(th + r * 0.3)}" fill="${trunk}"/>` +
    `<circle cx="${x}" cy="${r1(base - th - r * 0.5)}" r="${r}" fill="${crown}"/>`
  );
}

/** 針葉樹。ロッキー・北西部で使う。 */
function pine(x, base, h, fill = "#2f5f3f") {
  return (
    `<rect x="${r1(x - 1.6)}" y="${r1(base - 6)}" width="3.2" height="6" fill="#5a4630"/>` +
    `<path d="M${x},${r1(base - h)}l${r1(h * 0.32)},${r1(h * 0.42)}h-${r1(h * 0.16)}l${r1(h * 0.2)},${r1(h * 0.3)}h-${r1(h * 0.12)}l${r1(h * 0.22)},${r1(h * 0.28)}h-${r1(h * 1.32)}l${r1(h * 0.22)},-${r1(h * 0.28)}h-${r1(h * 0.12)}l${r1(h * 0.2)},-${r1(h * 0.3)}h-${r1(h * 0.16)}z" fill="${fill}"/>`
  );
}

/** 窓の格子。ビルの密度づくりに使う(ループでタグ数を稼ぐ)。 */
function windowGrid(x, y, cols, rows, gapX, gapY, size, fill = "#f5c95c") {
  const parts = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      parts.push(`<rect x="${r1(x + c * gapX)}" y="${r1(y + r * gapY)}" width="${size}" height="${size}" fill="${fill}"/>`);
    }
  }
  return `<g opacity=".85">${parts.join("")}</g>`;
}

function skyscraper(x, base, w, h, fill, winCols, winRows, winFill = "#f5c95c") {
  const bw = r1(w);
  return (
    `<rect x="${r1(x - bw / 2)}" y="${r1(base - h)}" width="${bw}" height="${h}" fill="${fill}" stroke="#20364a" stroke-width="1.4"/>` +
    windowGrid(r1(x - bw / 2 + bw * 0.14), r1(base - h + h * 0.08), winCols, winRows, r1((bw * 0.72) / (winCols - 1 || 1)), r1((h * 0.82) / (winRows - 1 || 1)), r1(bw * 0.1), winFill)
  );
}

/** レンガの町並み(何棟も並べる)。 */
function houseRow(positions, roof = "#a5432c", wall = "#e8dcc0") {
  return positions
    .map(([x, base, w, h]) => {
      const hw = r1(w / 2);
      return (
        `<rect x="${r1(x - hw)}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${wall}"/>` +
        `<path d="M${r1(x - hw - 4)},${r1(base - h)}h${r1(w + 8)}l-${r1(hw + 4)},-${r1(h * 0.42)}z" fill="${roof}"/>` +
        `<rect x="${r1(x - hw * 0.3)}" y="${r1(base - h * 0.5)}" width="${r1(hw * 0.5)}" height="${r1(h * 0.35)}" fill="#3f5f7f" opacity=".7"/>`
      );
    })
    .join("");
}

function columnRow(x, base, count, gap, h, fill = "#e8e0cc") {
  const parts = [`<rect x="${r1(x - gap * 0.5)}" y="${r1(base - h - 5)}" width="${r1(gap * count + gap)}" height="6" fill="${fill}"/>`];
  for (let i = 0; i < count; i++) {
    const cx = r1(x + i * gap);
    parts.push(
      `<rect x="${r1(cx - 3.4)}" y="${r1(base - h)}" width="6.8" height="${h}" fill="${fill}"/>`,
      `<rect x="${r1(cx - 4.2)}" y="${r1(base - h - 4)}" width="8.4" height="4" fill="${fill}"/>`,
    );
  }
  return `<g stroke="#c8b898" stroke-width="1">${parts.join("")}</g>`;
}

function archRow(x, y, count, w, h, fill, opacity = 1) {
  const parts = [];
  for (let i = 0; i < count; i++) {
    const cx = r1(x + i * w);
    parts.push(
      `<path d="M${cx},${r1(y + h)}v-${r1(h * 0.55)}a${r1(w * 0.42)},${r1(w * 0.42)} 0 0 1 ${r1(w * 0.84)},0v${r1(h * 0.55)}z" fill="none" stroke="${fill}" stroke-width="3"/>`,
    );
  }
  return `<g opacity="${opacity}">${parts.join("")}</g>`;
}

/** 麦畑・トウモロコシ畑の畝(平行線をループで並べる)。 */
function fieldRows(y, h, count, color = "#c9a877") {
  const parts = [];
  for (let i = 0; i < count; i++) {
    parts.push(`<path d="M0,${y + i * (h / count)}h${W}" stroke="${color}" stroke-width="2.4" opacity="${0.4 + (i % 3) * 0.15}"/>`);
  }
  return `<g fill="none">${parts.join("")}</g>`;
}

/** サボテン(サグアロ)。 */
function saguaro(x, base, h, fill = "#3f7a4a") {
  const armY = r1(base - h * 0.55);
  return (
    `<path d="M${x},${base}v-${h}" stroke="${fill}" stroke-width="9" stroke-linecap="round"/>` +
    `<path d="M${r1(x - 9)},${armY}v-${r1(h * 0.28)}q0,-6 6,-6h3" fill="none" stroke="${fill}" stroke-width="7" stroke-linecap="round"/>` +
    `<path d="M${r1(x + 9)},${r1(armY + 8)}v-${r1(h * 0.2)}q0,-6 -6,-6h-3" fill="none" stroke="${fill}" stroke-width="7" stroke-linecap="round"/>`
  );
}

/** メサ・ビュート(平頂の岩山)を並べる。 */
function mesas(y, fill = "#c8834a", darker = "#a5622f") {
  return (
    `<path d="M10,${y + 40}L30,${y}h40l16,40z" fill="${fill}"/>` +
    `<rect x="30" y="${y}" width="40" height="8" fill="${darker}"/>` +
    `<path d="M300,${y + 40}L322,${y - 10}h26l18,50z" fill="${fill}" opacity=".9"/>` +
    `<rect x="322" y="${y - 10}" width="26" height="7" fill="${darker}" opacity=".9"/>`
  );
}

/** 気球。アルバカーキの気球祭で使う。 */
function balloon(x, y, r, color) {
  return (
    `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r1(r * 1.2)}" fill="${color}" stroke="#20364a" stroke-width="1.2"/>` +
    `<path d="M${r1(x - r * 0.5)},${r1(y + r * 1.1)}L${r1(x - r * 0.2)},${r1(y + r * 1.5)}M${r1(x + r * 0.5)},${r1(y + r * 1.1)}L${r1(x + r * 0.2)},${r1(y + r * 1.5)}" stroke="#5a4630" stroke-width="1"/>` +
    `<rect x="${r1(x - r * 0.22)}" y="${r1(y + r * 1.5)}" width="${r1(r * 0.44)}" height="${r1(r * 0.3)}" fill="#a5432c"/>`
  );
}

/** ネオンの帯(文字は使わず、色帯と枠だけで表す)。 */
function neonStrip(x, y, w, h, glow) {
  return (
    `<rect x="${r1(x)}" y="${r1(y)}" width="${w}" height="${h}" fill="none" stroke="${glow}" stroke-width="2.4" rx="3"/>` +
    `<rect x="${r1(x + 4)}" y="${r1(y + 4)}" width="${r1(w - 8)}" height="${r1(h - 8)}" fill="${glow}" opacity=".35" rx="2"/>`
  );
}

/** 鉄橋のトラス構造。 */
function trussBridge(x, y, w, h, fill = "#7f8896") {
  const parts = [`<rect x="${x}" y="${r1(y + h - 5)}" width="${w}" height="5" fill="${fill}"/>`];
  const n = Math.round(w / 26);
  for (let i = 0; i < n; i++) {
    const cx = r1(x + i * (w / n));
    parts.push(`<path d="M${cx},${r1(y + h)}L${r1(cx + w / n / 2)},${y}L${r1(cx + w / n)},${r1(y + h)}" fill="none" stroke="${fill}" stroke-width="2.2"/>`);
  }
  return `<g>${parts.join("")}</g>`;
}

/**
 * 粒状の質感(砂利・草むら・星・水面のきらめき・雪片など)。
 * `count` 個の小さな丸をループで撒く。決定論的な擬似分散(乱数は使わない)。
 * 背景の密度づくりに使う汎用部品。
 */
function speckle(y, h, count, color, r = 1.6, opacity = 0.6) {
  const parts = [];
  for (let i = 0; i < count; i++) {
    const x = r1((i * 53 + 17) % W);
    const yy = r1(y + ((i * 31 + i * i * 7) % Math.max(1, h)));
    parts.push(`<circle cx="${x}" cy="${yy}" r="${r}" fill="${color}"/>`);
  }
  return `<g opacity="${opacity}">${parts.join("")}</g>`;
}

/** 横並びの短い線の質感(木の板・れんが目地・畝の追加段)。 */
function lineTexture(y, h, count, color, w = 30, strokeWidth = 1.6, opacity = 0.6) {
  const parts = [];
  for (let i = 0; i < count; i++) {
    const x = r1((i * 41 + 6) % (W - w));
    const yy = r1(y + ((i * 23) % Math.max(1, h)));
    parts.push(`<line x1="${x}" y1="${yy}" x2="${r1(x + w)}" y2="${yy}" stroke="${color}" stroke-width="${strokeWidth}"/>`);
  }
  return `<g opacity="${opacity}">${parts.join("")}</g>`;
}

// ---------------------------------------------------------------------------
// 背景(35種)
// ---------------------------------------------------------------------------

export const USA_BG = {
  /** ニューヨークの高層ビル群と川、橋。北東部の顔。 */
  skyline:
    sky("#8fc4e8", "#cfe4f0", 150) +
    hills(128, "#8fae63", 3) +
    ground(150, "#2f4a33") +
    band(150, 6, "#1e4266") +
    skyscraper(50, 150, 34, 90, "#7f8896", 3, 6) +
    skyscraper(320, 150, 40, 108, "#8a92a0", 3, 7) +
    skyscraper(360, 150, 30, 74, "#6f7a88", 2, 5) +
    skyscraper(20, 150, 26, 60, "#6f7a88", 2, 4) +
    trussBridge(150, 150, 90, 18) +
    ripples(198, "#3a6a8a") +
    gull(40, 60) + gull(340, 45, 1.2) +
    clouds(200, 30, 1.1),

  /** フレンチクォーター(既存)。 */
  frenchquarter:
    sky("#8fc4e8", "#cfe4f0", 150) +
    ground(150, "#2f4a33") +
    houseRow([[40, 190, 60, 60], [340, 190, 60, 56]], "#a5432c", "#e8dcc0") +
    archRow(150, 150, 4, 40, 36, "#e8dcc0") +
    band(186, 24, "#3a2f22") +
    speckle(190, 16, 14, "#20364a", 1.4, 0.5) +
    `<g stroke="#3a2f22" stroke-width="1"><line x1="42" y1="150" x2="42" y2="185"/><line x1="342" y1="150" x2="342" y2="185"/></g>` +
    windowGrid(46, 158, 3, 2, 8, 10, 4, "#f5c95c") +
    windowGrid(346, 158, 3, 2, 8, 10, 4, "#f5c95c") +
    clouds(200, 30, 1),

  /** シカゴの湖岸(既存)。 */
  lakefront:
    sky("#8fc4e8", "#cfe4f0", 150) +
    band(150, 34, "#2a5478") +
    ground(184, "#2f4a33") +
    skyscraper(330, 150, 34, 100, "#7f8896", 3, 6) +
    skyscraper(30, 150, 30, 70, "#8a92a0", 2, 5) +
    ripples(166, "#bfe8f4") +
    gull(60, 50) + gull(200, 40, 1.1) + gull(300, 55, 0.9),

  /** ブラックヒルズ(既存)。 */
  blackhills:
    sky("#8fc4e8", "#cfe4f0", 150) +
    mountainRange(130, "#5f7f4a", 5) +
    ground(150, "#8fae63") +
    pine(60, 190, 46) + pine(90, 195, 40) + pine(320, 192, 44) + pine(350, 188, 50) +
    pine(30, 195, 30) + pine(375, 200, 26) + pine(110, 200, 24) +
    speckle(155, 30, 16, "#7a9a5f", 1.6, 0.5) +
    clouds(120, 30, 1),

  /** モニュメントバレー(既存)。 */
  desert:
    sky("#f5c98a", "#f0d9a8", 150) +
    ground(150, "#c8834a") +
    mesas(80) +
    `<path d="M180,150L210,60h20l30,90z" fill="#b5713a"/>` +
    speckle(150, 40, 18, "#a5622f", 1.4, 0.55) +
    `<g stroke="#4a4a52" stroke-width="1.2" opacity=".7"><path d="M60,40q6,-4 12,0M250,50q6,-4 12,0"/></g>` +
    speckle(60, 20, 10, "#4a4a52", 1, 0.5) +
    saguaro(370, 205, 24) +
    sun(340, 40, 20, "#f5b31c"),

  /** 大西洋岸の帆船港(ボストン・ボルチモア・ポートランドメイン)。 */
  harbor:
    sky("#8fc4e8", "#cfe4f0", 128) +
    band(128, 26, "#2a5478") +
    ground(154, "#3a2f22") +
    houseRow([[50, 194, 44, 46], [90, 194, 38, 40], [330, 194, 44, 48], [360, 190, 30, 40]], "#a5432c", "#e8dcc0") +
    `<g stroke="#3a2f22" stroke-width="2.4"><line x1="200" y1="200" x2="200" y2="120"/><line x1="230" y1="200" x2="228" y2="130"/></g>` +
    `<path d="M200,120q40,-4 0,20z" fill="#e8dcc0"/><path d="M228,130q34,-2 0,18z" fill="#f6efe2"/>` +
    ripples(170, "#bfe8f4") + ripples(184, "#bfe8f4") +
    windowGrid(56, 172, 3, 2, 10, 10, 4, "#3f5f7f") +
    windowGrid(336, 168, 3, 2, 10, 10, 4, "#3f5f7f") +
    speckle(172, 20, 12, "#f6efe2", 1.2, 0.4) +
    gull(70, 50) + gull(280, 40, 1.1) + gull(150, 34, 0.9),

  /** 独立記念館まわりの植民地時代のレンガ街並み(フィラデルフィア)。 */
  colonial:
    sky("#8fc4e8", "#cfe4f0", 150) +
    ground(150, "#2f4a33") +
    houseRow([[40, 190, 40, 44], [80, 190, 36, 38], [320, 190, 40, 42], [360, 190, 34, 40]], "#a5432c", "#e8dcc0") +
    `<rect x="160" y="120" width="80" height="70" fill="#e8dcc0" stroke="#20364a" stroke-width="1.6"/>` +
    `<path d="M160,120q40,-30 80,0z" fill="#a5432c"/>` +
    `<rect x="192" y="90" width="16" height="30" fill="#e8dcc0"/>` +
    `<rect x="196" y="70" width="8" height="20" fill="#f5b31c"/>` +
    windowGrid(166, 130, 5, 3, 10, 12, 5, "#3f5f7f") +
    lineTexture(186, 4, 10, "#a5432c", 24, 1.2, 0.5) +
    clouds(300, 30, 1),

  /** ナショナル・モール(ワシントンD.C.)。 */
  mall:
    sky("#8fc4e8", "#cfe4f0", 160) +
    ground(160, "#8fae63") +
    band(160, 14, "#bfe8f4") +
    `<path d="M180,150v-90h6v90z" fill="#f6efe2"/><path d="M178,60l9,-10l9,10z" fill="#f6efe2"/>` +
    `<path d="M60,150a30,10 0 0 1 60,0z" fill="#e8e0cc"/>` +
    `<path d="M280,150a30,10 0 0 1 60,0z" fill="#e8e0cc"/>` +
    columnRow(50, 150, 4, 12, 30, "#e8e0cc") +
    roundTree(340, 190, 16) + roundTree(20, 190, 14) + roundTree(70, 195, 12) + roundTree(370, 200, 10) +
    ripples(164, "#e8f4f0") +
    speckle(150, 8, 10, "#f6efe2", 1.2, 0.5) +
    clouds(240, 30, 1),

  /** ピッツバーグの三川合流と鉄橋(ピッツバーグ)。 */
  rivers:
    sky("#8fc4e8", "#cfe4f0", 150) +
    ground(150, "#5f7f4a") +
    band(150, 40, "#2a5478") +
    ground(190, "#3a2f22") +
    trussBridge(20, 150, 120, 20) +
    trussBridge(260, 150, 120, 20) +
    skyscraper(190, 150, 26, 60, "#8a92a0", 2, 4) +
    `<path d="M40,190v-40h6v40z" fill="#c9b878"/><path d="M36,150h14l-7,-14z" fill="#7f8896"/>` +
    windowGrid(194, 156, 3, 2, 6, 8, 3, "#f5c95c") +
    speckle(160, 20, 12, "#f6efe2", 1.2, 0.4) +
    ripples(170, "#bfe8f4") + ripples(180, "#e8f4f0"),

  /** 五大湖の穀物エレベーターと港(バッファロー・クリーブランド・ミルウォーキー)。 */
  greatlakes:
    sky("#8fc4e8", "#cfe4f0", 140) +
    band(140, 40, "#2a5478") +
    ground(180, "#3a2f22") +
    `<g fill="#c9a877" stroke="#20364a" stroke-width="1.4"><rect x="40" y="110" width="18" height="70"/><rect x="60" y="100" width="18" height="80"/><rect x="80" y="115" width="18" height="65"/></g>` +
    `<g fill="#c9a877" stroke="#20364a" stroke-width="1.4"><rect x="310" y="105" width="18" height="75"/><rect x="330" y="118" width="18" height="62"/></g>` +
    crane(280, 180, 50) +
    `<g fill="#3a2f22" opacity=".8"><rect x="44" y="118" width="8" height="6"/><rect x="64" y="108" width="8" height="6"/><rect x="316" y="112" width="8" height="6"/></g>` +
    speckle(146, 10, 12, "#f6efe2", 1.2, 0.4) +
    lineTexture(114, 60, 8, "#5a4630", 12, 1.4, 0.5) +
    ripples(156, "#bfe8f4") +
    gull(150, 50) + gull(250, 40, 1.1) + gull(190, 60, 0.8),

  /** ミュージック・ロウのネオンとギター看板(ナッシュビル・メンフィス)。 */
  musicrow:
    sky("#5f4a7a", "#8a6fae", 150) +
    ground(150, "#241a30") +
    houseRow([[60, 190, 46, 44], [340, 190, 46, 44]], "#3a2f4a", "#5a4a6a") +
    neonStrip(150, 100, 100, 30, "#f5b31c") +
    neonStrip(160, 138, 80, 18, "#e8443f") +
    `<path d="M200,180v-40M190,150l10,-10l10,10" fill="none" stroke="#f6efe2" stroke-width="2.4"/>` +
    neonStrip(30, 130, 60, 22, "#5b8fe8") +
    neonStrip(310, 120, 70, 24, "#e8443f") +
    speckle(30, 60, 16, "#f6efe2", 1, 0.5) +
    sun(40, 40, 16, "#f5b31c"),

  /** サンベルトのスカイラインとパイン(アトランタ)。 */
  sunbeltskyline:
    sky("#8fc4e8", "#cfe4f0", 160) +
    ground(160, "#5f7f4a") +
    skyscraper(60, 160, 30, 80, "#8a92a0", 2, 5) +
    skyscraper(330, 160, 36, 96, "#7f8896", 3, 6) +
    skyscraper(20, 160, 22, 56, "#6f7a88", 2, 4) +
    pine(370, 200, 34) + pine(10, 200, 30) +
    clouds(200, 30, 1),

  /** モスをまとったオークとパステルの家並み(チャールストン・サバンナ)。 */
  spanishmoss:
    sky("#8fc4e8", "#cfe4f0", 160) +
    ground(160, "#5f7f4a") +
    houseRow([[70, 194, 40, 42], [330, 194, 40, 42]], "#7fb3d6", "#f6efe2") +
    `<path d="M180,90c-30,0 -34,20 -30,40c-14,-4 -18,20 4,26c-8,20 30,24 46,10c20,10 40,-10 24,-24c20,-6 10,-30 -6,-30c4,-16 -18,-24 -38,-22z" fill="#5f7f4a"/>` +
    `<g stroke="#a8a888" stroke-width="1.2" opacity=".7"><path d="M160,110q-4,10 0,20M190,105q4,12 -2,22M210,112q6,8 0,18"/></g>` +
    windowGrid(58, 176, 3, 2, 10, 10, 4, "#3f5f7f") +
    windowGrid(318, 176, 3, 2, 10, 10, 4, "#3f5f7f") +
    speckle(196, 10, 14, "#e8dcc0", 1.3, 0.5) +
    `<rect x="0" y="188" width="400" height="6" fill="#c9b878"/>`,

  /** アール・デコとパステルの海岸通り(マイアミ・タンパ)。 */
  tropicdeco:
    sky("#f5c98a", "#f6efe2", 128) +
    band(128, 24, "#2a5478") +
    ground(152, "#e8dcc0") +
    houseRow([[60, 190, 44, 40], [110, 190, 36, 34], [300, 190, 40, 38], [350, 190, 34, 32]], "#7fb3e0", "#f6efe2") +
    roundTree(20, 200, 12, "#4f8f4f") + roundTree(200, 200, 14, "#4f8f4f") + roundTree(380, 200, 12, "#4f8f4f") +
    windowGrid(66, 172, 3, 2, 10, 8, 4, "#3f5f7f") +
    `<g fill="#e8443f" opacity=".8"><path d="M120,178a14,7 0 0 1 28,0z"/><path d="M340,178a14,7 0 0 1 28,0z"/></g>` +
    speckle(172, 16, 12, "#f5b31c", 1.2, 0.4) +
    ripples(170, "#bfe8f4") +
    sun(340, 40, 18, "#f5b31c"),

  /** ミッションコントロールとロケット(ヒューストン)。 */
  spacecenter:
    sky("#20364a", "#3a5a78", 160) +
    ground(160, "#5f7f4a") +
    `<rect x="60" y="120" width="90" height="40" fill="#e8e0cc" stroke="#20364a" stroke-width="1.6"/>` +
    windowGrid(66, 126, 8, 3, 10, 10, 6, "#5b8fe8") +
    `<path d="M300,180v-80h14v80z" fill="#e8e0cc"/><path d="M300,100l7,-24l7,24z" fill="#e8443f"/>` +
    `<path d="M296,180l4,-14h14l4,14z" fill="#7f8896"/>` +
    sun(350, 40, 14, "#f5b31c") +
    clouds(200, 40, 1),

  /** リバーウォークとミッション(サンアントニオ)。 */
  riverwalk:
    sky("#8fc4e8", "#cfe4f0", 150) +
    ground(150, "#5f7f4a") +
    band(178, 32, "#2a5478") +
    houseRow([[70, 178, 40, 40], [330, 178, 40, 40]], "#c8834a", "#e8dcc0") +
    `<rect x="170" y="110" width="60" height="68" fill="#e8dcc0" stroke="#20364a" stroke-width="1.6"/>` +
    `<path d="M190,110a10,10 0 0 1 20,0z" fill="#c8834a"/>` +
    `<path d="M110,196c60,-8 120,-8 180,0" fill="none" stroke="#f6efe2" stroke-width="3" opacity=".6"/>` +
    speckle(158, 12, 14, "#f5b31c", 1, 0.6) +
    windowGrid(178, 116, 4, 3, 10, 12, 5, "#3f5f7f") +
    ripples(196, "#bfe8f4") + ripples(186, "#e8f4f0"),

  /** 自動車工場の組立ライン(デトロイト)。 */
  motorcity:
    sky("#c8ccc4", "#d4d8d0", 160) +
    ground(160, "#3a2f22") +
    `<g fill="#7f8896" stroke="#20364a" stroke-width="1.4"><rect x="50" y="100" width="16" height="60"/><rect x="90" y="90" width="16" height="70"/><rect x="310" y="95" width="16" height="65"/></g>` +
    `<g stroke="#4a4a52" stroke-width="3"><path d="M140,180h140"/></g>` +
    `<rect x="160" y="164" width="40" height="16" rx="3" fill="#5b8fe8" stroke="#20364a" stroke-width="1.6"/>` +
    `<circle cx="170" cy="184" r="6" fill="#241a10"/><circle cx="192" cy="184" r="6" fill="#241a10"/>` +
    `<rect x="230" y="168" width="34" height="12" rx="3" fill="#e8443f" opacity=".85" stroke="#20364a" stroke-width="1.4"/>` +
    windowGrid(54, 106, 3, 5, 10, 10, 4, "#f5c95c") +
    windowGrid(94, 96, 3, 6, 10, 10, 4, "#f5c95c") +
    speckle(60, 20, 10, "#c8ccc4", 1.6, 0.5) +
    `<g stroke="#4a4a52" stroke-width="1.4"><line x1="8" y1="160" x2="8" y2="180"/><line x1="392" y1="160" x2="392" y2="180"/></g>`,

  /** セントアンソニー滝と製粉所、スカイウェイ(ミネアポリス)。 */
  millcity:
    sky("#8fc4e8", "#cfe4f0", 150) +
    ground(150, "#5f7f4a") +
    band(150, 14, "#bfe8f4") +
    `<path d="M170,150v-40h60v40z" fill="#8fa8b0" opacity=".7"/>` +
    `<g fill="#c9a877" stroke="#20364a" stroke-width="1.4"><rect x="40" y="110" width="18" height="70"/><rect x="60" y="100" width="18" height="80"/></g>` +
    `<g fill="#c9a877" stroke="#20364a" stroke-width="1.4"><rect x="320" y="112" width="18" height="68"/></g>` +
    skyscraper(230, 150, 26, 58, "#8a92a0", 2, 4) +
    `<line x1="180" y1="120" x2="260" y2="118" stroke="#7f8896" stroke-width="3"/>` +
    windowGrid(234, 156, 3, 3, 8, 10, 4, "#f5c95c") +
    `<g fill="#5a4630" opacity=".8"><rect x="44" y="112" width="10" height="4"/><rect x="64" y="102" width="10" height="4"/><rect x="324" y="114" width="10" height="4"/></g>` +
    speckle(170, 12, 12, "#f6efe2", 1.2, 0.5) +
    ripples(166, "#bfe8f4") + ripples(176, "#e8f4f0"),

  /** ゲートウェイ・アーチと川(セントルイス)。 */
  archriver:
    sky("#8fc4e8", "#cfe4f0", 160) +
    ground(160, "#5f7f4a") +
    band(180, 30, "#2a5478") +
    `<path d="M200,180v-90a54,80 0 0 1 -108,0" fill="none" stroke="#c8834a" stroke-width="9"/>` +
    `<path d="M200,180v-90a54,80 0 0 0 108,0" fill="none" stroke="#c8834a" stroke-width="9"/>` +
    `<rect x="30" y="150" width="40" height="30" fill="#8a92a0" opacity=".8"/>` +
    `<path d="M300,180v-24h30v24z" fill="#e8dcc0"/><path d="M300,156q15,-12 30,0z" fill="#7f8896"/>` +
    windowGrid(304, 162, 3, 2, 8, 9, 3, "#3f5f7f") +
    windowGrid(36, 156, 2, 3, 10, 8, 4, "#f5c95c") +
    speckle(160, 14, 12, "#f6efe2", 1.2, 0.5) +
    ripples(196, "#bfe8f4") + ripples(206, "#e8f4f0"),

  /** レンガ舗装のスピードウェイ(インディアナポリス)。 */
  speedway:
    sky("#8fc4e8", "#cfe4f0", 150) +
    ground(150, "#5f7f4a") +
    band(160, 40, "#8a8478") +
    `<g stroke="#a5432c" stroke-width="2" opacity=".6"><path d="M0,180h400M0,186h400M0,192h400"/></g>` +
    `<rect x="0" y="150" width="400" height="10" fill="#e8443f"/>` +
    `<g fill="#f6efe2"><rect x="20" y="150" width="14" height="10"/><rect x="48" y="150" width="14" height="10"/><rect x="330" y="150" width="14" height="10"/><rect x="358" y="150" width="14" height="10"/></g>` +
    `<rect x="330" y="120" width="50" height="30" fill="#e8e0cc" stroke="#20364a" stroke-width="1.4"/>` +
    windowGrid(334, 124, 5, 2, 8, 10, 4, "#3f5f7f") +
    lineTexture(126, 20, 12, "#f6efe2", 20, 3, 0.7) +
    speckle(126, 20, 16, "#f5b31c", 1.2, 0.5) +
    `<g stroke="#e8443f" stroke-width="2"><line x1="0" y1="146" x2="400" y2="146"/></g>`,

  /** マイルハイの州議事堂とロッキー山脈(デンバー)。 */
  milehigh:
    sky("#8fc4e8", "#cfe4f0", 150) +
    mountainRange(130, "#8b8f98", 5, "#f2f6f8") +
    ground(150, "#5f7f4a") +
    `<rect x="180" y="110" width="40" height="40" fill="#e8e0cc" stroke="#20364a" stroke-width="1.6"/>` +
    `<path d="M180,110a20,18 0 0 1 40,0z" fill="#f5b31c"/>` +
    skyscraper(60, 150, 26, 56, "#8a92a0", 2, 4) +
    skyscraper(330, 150, 24, 50, "#7f8896", 2, 3) +
    speckle(60, 20, 12, "#f2f6f8", 1.4, 0.4) +
    lineTexture(150, 4, 8, "#5a4630", 24, 1.4, 0.5),

  /** 山あいの牧場町(コディ・ボーズマン)。 */
  westernranch:
    sky("#8fc4e8", "#cfe4f0", 150) +
    mountainRange(130, "#7f8896", 5, "#f2f6f8") +
    ground(150, "#c9a877") +
    `<rect x="40" y="150" width="60" height="34" fill="#a5432c" stroke="#3a2f22" stroke-width="1.6"/>` +
    `<path d="M40,150l30,-20l30,20z" fill="#7f8896"/>` +
    `<g stroke="#5a4630" stroke-width="2.6"><path d="M180,196h160M180,180h160M180,164h160"/><path d="M180,164v32M220,164v32M260,164v32M300,164v32M340,164v32"/></g>` +
    pine(360, 200, 30) + pine(20, 205, 24) + pine(140, 208, 20) +
    speckle(150, 20, 12, "#e8dcc0", 1.4, 0.5) +
    `<g fill="#f6efe2"><ellipse cx="60" cy="112" rx="6" ry="4"/><ellipse cx="150" cy="98" rx="8" ry="5"/></g>`,

  /** 大平原の穀物エレベーターと鉄路(オマハ・ウィチタ・ビスマーク)。 */
  prairie:
    sky("#8fc4e8", "#cfe4f0", 150) +
    ground(150, "#c9a877") +
    fieldRows(160, 40, 6, "#a8944a") +
    `<g fill="#e8dcc0" stroke="#20364a" stroke-width="1.4"><rect x="300" y="90" width="24" height="90"/><rect x="326" y="100" width="20" height="80"/></g>` +
    `<line x1="0" y1="196" x2="400" y2="196" stroke="#4a4a52" stroke-width="3"/>` +
    `<g stroke="#5a4630" stroke-width="2"><line x1="20" y1="196" x2="20" y2="202"/><line x1="60" y1="196" x2="60" y2="202"/><line x1="100" y1="196" x2="100" y2="202"/></g>` +
    `<g fill="#5a4630" opacity=".8"><rect x="304" y="96" width="8" height="4"/><rect x="330" y="106" width="8" height="4"/></g>` +
    speckle(162, 30, 16, "#a8944a", 1.6, 0.5) +
    `<g fill="#4a4a52" opacity=".6"><path d="M60,40l6,-4l6,4M180,30l6,-4l6,4M270,44l6,-4l6,4"/></g>` +
    clouds(120, 30, 1),

  /** グランドキャニオンの地層。 */
  canyon:
    sky("#f5c98a", "#f0d9a8", 110) +
    band(110, 14, "#c8834a") +
    band(124, 14, "#b5713a") +
    band(138, 14, "#a5622f") +
    band(152, 20, "#8a4f28") +
    ground(172, "#c8834a") +
    `<path d="M0,172q80,-30 140,-6q80,26 140,-4q80,-24 120,4v38h-400z" fill="#e8dcc0" opacity=".5"/>` +
    `<path d="M160,172v30" stroke="#5b8fe8" stroke-width="3" opacity=".7"/>` +
    speckle(112, 60, 18, "#8a4f28", 1.4, 0.5) +
    lineTexture(126, 40, 10, "#e8dcc0", 26, 1.4, 0.5) +
    saguaro(40, 208, 26) +
    `<g fill="#4a4a52" opacity=".6"><path d="M300,50l8,-5l8,5"/></g>`,

  /** ホホカム水路とヤシ、砂漠の摩天楼(フェニックス)。 */
  canalcity:
    sky("#f5c98a", "#f6efe2", 160) +
    ground(160, "#c8834a") +
    band(178, 8, "#5b8fe8") +
    skyscraper(80, 160, 26, 60, "#8a92a0", 2, 4) +
    skyscraper(320, 160, 30, 74, "#7f8896", 3, 5) +
    `<path d="M40,200v-30" stroke="#5a4630" stroke-width="4"/><path d="M40,170q-10,-6 -16,-2M40,170q10,-6 16,-2M40,176q-10,-4 -14,2M40,176q10,-4 14,2" fill="none" stroke="#4f8f4f" stroke-width="3"/>` +
    saguaro(200, 200, 40) +
    sun(360, 40, 16, "#f5b31c"),

  /** サグアロの砂漠とミッション(ツーソン)。 */
  saguaro:
    sky("#f5c98a", "#f0d9a8", 160) +
    mountainRange(140, "#c8834a", 4) +
    ground(160, "#c8a06a") +
    saguaro(60, 200, 44) + saguaro(340, 200, 38) + saguaro(20, 205, 30) +
    `<rect x="170" y="150" width="60" height="50" fill="#f6efe2" stroke="#20364a" stroke-width="1.6"/>` +
    `<path d="M190,150a10,10 0 0 1 20,0z" fill="#c8834a"/>` +
    saguaro(100, 205, 30) + saguaro(300, 208, 26) +
    speckle(170, 30, 16, "#a5622f", 1.4, 0.5) +
    clouds(80, 30, 0.8) +
    sun(350, 40, 14, "#f5b31c"),

  /** アドベ様式の建物とポルタルの市場(サンタフェ・アルバカーキ)。 */
  adobe:
    sky("#f5c98a", "#f0d9a8", 160) +
    ground(160, "#c8a06a") +
    houseRow([[60, 196, 46, 40], [330, 196, 46, 40]], "#c8834a", "#c8a06a") +
    columnRow(140, 190, 5, 24, 26, "#e8dcc0") +
    `<g stroke="#5a4630" stroke-width="2"><line x1="60" y1="166" x2="60" y2="172"/><line x1="330" y1="166" x2="330" y2="172"/></g>` +
    windowGrid(52, 202, 4, 1, 10, 6, 5, "#3f5f7f") +
    windowGrid(322, 202, 4, 1, 10, 6, 5, "#3f5f7f") +
    `<g fill="#e8443f"><circle cx="120" cy="180" r="2.4"/><circle cx="126" cy="186" r="2.4"/><circle cx="132" cy="180" r="2.4"/><circle cx="270" cy="182" r="2.4"/><circle cx="276" cy="188" r="2.4"/></g>` +
    speckle(170, 20, 12, "#a5622f", 1.2, 0.5) +
    balloon(90, 55, 12, "#e8443f") +
    balloon(230, 40, 10, "#5b8fe8") +
    balloon(310, 65, 9, "#f5b31c") +
    sun(360, 40, 14, "#f5b31c"),

  /** ネオンの砂漠の夜(ラスベガス)。 */
  neon:
    sky("#20364a", "#3a2f4a", 160) +
    ground(160, "#241a30") +
    neonStrip(40, 90, 70, 60, "#e8443f") +
    neonStrip(150, 70, 90, 90, "#f5b31c") +
    neonStrip(280, 100, 80, 50, "#5b8fe8") +
    skyscraper(340, 160, 30, 70, "#3a2f4a", 3, 6, "#f5c95c") +
    `<circle cx="60" cy="30" r="14" fill="#f6efe2" opacity=".8"/>` +
    speckle(20, 40, 14, "#f6efe2", 1, 0.6) +
    windowGrid(50, 130, 3, 3, 10, 12, 4, "#e8443f"),

  /** グレートソルト湖とテンプル・スクエア(ソルトレイクシティ)。 */
  saltflat:
    sky("#8fc4e8", "#cfe4f0", 150) +
    mountainRange(130, "#8b8f98", 5, "#f2f6f8") +
    ground(150, "#8fa8b0") +
    `<rect x="170" y="120" width="20" height="30" fill="#e8e0cc" stroke="#20364a" stroke-width="1.4"/>` +
    `<path d="M180,120l-4,-14h8z" fill="#f5b31c"/>` +
    `<rect x="200" y="128" width="18" height="22" fill="#e8e0cc" stroke="#20364a" stroke-width="1.4"/>` +
    band(180, 20, "#bfd8dc") +
    lineTexture(184, 14, 14, "#e8f4f0", 20, 1.6, 0.6) +
    windowGrid(174, 122, 3, 3, 6, 8, 3, "#5b8fe8") +
    speckle(60, 20, 10, "#f6efe2", 1.4, 0.4) +
    ripples(190, "#e8f4f0") + ripples(200, "#bfd8dc"),

  /** パイク・プレイス市場とスペース・ニードル(シアトル)。 */
  pikeplace:
    sky("#8fc4e8", "#cfe4f0", 130) +
    band(130, 24, "#2a5478") +
    ground(154, "#3a2f22") +
    `<path d="M280,154v-90h6v90z" fill="#e8e0cc"/><ellipse cx="283" cy="60" rx="20" ry="6" fill="#7f8896"/><path d="M270,60l13,-16l13,16z" fill="#8a92a0"/>` +
    houseRow([[60, 194, 44, 40], [110, 194, 34, 34]], "#a5432c", "#e8dcc0") +
    `<rect x="30" y="170" width="30" height="14" fill="#e8443f" opacity=".85"/>` +
    lineTexture(172, 8, 6, "#f6efe2", 30, 3, 0.6) +
    windowGrid(64, 172, 3, 2, 8, 8, 3, "#f5c95c") +
    speckle(180, 10, 12, "#c8ccc4", 1.3, 0.5) +
    ripples(170, "#bfe8f4") +
    gull(200, 40) + gull(340, 55, 1.1) + gull(120, 34, 0.8),

  /** 橋の多いローズシティ(ポートランド・オレゴン)。 */
  bridgetown:
    sky("#8fc4e8", "#cfe4f0", 128) +
    band(128, 26, "#2a5478") +
    ground(154, "#5f7f4a") +
    trussBridge(60, 128, 280, 20) +
    skyscraper(340, 154, 24, 56, "#8a92a0", 2, 4) +
    `<g fill="#e8443f"><circle cx="40" cy="190" r="10"/><circle cx="70" cy="190" r="10"/><circle cx="100" cy="190" r="10"/></g>` +
    `<g fill="#f6efe2"><circle cx="40" cy="190" r="4"/><circle cx="70" cy="190" r="4"/><circle cx="100" cy="190" r="4"/></g>` +
    windowGrid(346, 160, 3, 3, 8, 10, 3, "#f5c95c") +
    speckle(170, 14, 10, "#f6efe2", 1.2, 0.4) +
    ripples(166, "#bfe8f4") + ripples(176, "#e8f4f0"),

  /** ゴールデンゲートとケーブルカー(サンフランシスコ)。 */
  goldengate:
    sky("#8fc4e8", "#d8dce0", 150) +
    hills(150, "#8fae63", 3) +
    band(150, 30, "#2a5478") +
    ground(180, "#2f4a33") +
    `<path d="M120,150v-70h6v70zM280,150v-70h6v70z" fill="#e8443f"/>` +
    `<path d="M123,80c50,-16 100,-16 154,0" fill="none" stroke="#e8443f" stroke-width="4"/>` +
    `<path d="M123,100c50,-10 100,-10 154,0" fill="none" stroke="#e8443f" stroke-width="3"/>` +
    houseRow([[40, 194, 26, 30], [70, 194, 26, 34], [340, 194, 26, 30]], "#7fb3e0", "#f6efe2") +
    `<g stroke="#e8443f" stroke-width="1"><line x1="123" y1="82" x2="123" y2="150"/><line x1="129" y1="84" x2="129" y2="150"/><line x1="271" y1="82" x2="271" y2="150"/><line x1="265" y1="84" x2="265" y2="150"/></g>` +
    speckle(90, 20, 12, "#f6efe2", 1.2, 0.35) +
    ripples(170, "#bfe8f4") + ripples(180, "#e8f4f0"),

  /** ゴールドラッシュ時代の木道(サクラメント)。 */
  goldrush:
    sky("#f5c98a", "#f0d9a8", 150) +
    ground(150, "#5f7f4a") +
    houseRow([[70, 190, 44, 40], [330, 190, 44, 40]], "#a5432c", "#e8dcc0") +
    `<rect x="0" y="188" width="400" height="8" fill="#c9a877"/>` +
    `<g stroke="#5a4630" stroke-width="2"><line x1="20" y1="188" x2="20" y2="196"/><line x1="60" y1="188" x2="60" y2="196"/><line x1="340" y1="188" x2="340" y2="196"/><line x1="380" y1="188" x2="380" y2="196"/></g>` +
    `<circle cx="200" cy="170" r="4" fill="#f5b31c"/><circle cx="212" cy="176" r="3" fill="#f5b31c"/>` +
    lineTexture(154, 30, 12, "#5a4630", 20, 1.2, 0.4) +
    windowGrid(80, 160, 3, 2, 8, 10, 4, "#3f5f7f") +
    speckle(186, 6, 10, "#f5b31c", 1, 0.5),

  /** ハリウッドの丘とヤシ(ロサンゼルス)。 */
  hollywood:
    sky("#f5c98a", "#f6efe2", 160) +
    hills(140, "#8fae63", 3) +
    ground(160, "#c8a06a") +
    `<g fill="#e8e0cc"><rect x="160" y="90" width="10" height="20"/><rect x="174" y="90" width="10" height="20"/><rect x="188" y="90" width="10" height="20"/><rect x="202" y="90" width="10" height="20"/><rect x="216" y="90" width="10" height="20"/></g>` +
    `<path d="M30,200v-40" stroke="#5a4630" stroke-width="4"/><path d="M30,170q-12,-8 -18,-2M30,170q12,-8 18,-2M30,178q-12,-6 -16,2M30,178q12,-6 16,2" fill="none" stroke="#4f8f4f" stroke-width="3"/>` +
    `<path d="M360,200v-46" stroke="#5a4630" stroke-width="4"/><path d="M360,166q-12,-8 -18,-2M360,166q12,-8 18,-2" fill="none" stroke="#4f8f4f" stroke-width="3"/>` +
    `<path d="M90,205v-36" stroke="#5a4630" stroke-width="3.4"/><path d="M90,175q-10,-7 -15,-2M90,175q10,-7 15,-2" fill="none" stroke="#4f8f4f" stroke-width="2.6"/>` +
    speckle(196, 8, 14, "#f5b31c", 1, 0.5) +
    windowGrid(250, 150, 4, 3, 8, 8, 3, "#f5c95c") +
    sun(340, 40, 16, "#f5b31c"),

  /** 軍艦とミッション(サンディエゴ)。 */
  harborcruiser:
    sky("#8fc4e8", "#cfe4f0", 128) +
    band(128, 30, "#2a5478") +
    ground(158, "#c8a06a") +
    `<path d="M60,150h100l-10,16h-84z" fill="#7f8896" stroke="#20364a" stroke-width="1.4"/>` +
    `<rect x="90" y="130" width="20" height="20" fill="#8a92a0"/>` +
    `<rect x="260" y="150" width="60" height="46" fill="#f6efe2" stroke="#20364a" stroke-width="1.6"/>` +
    `<path d="M278,150a12,12 0 0 1 24,0z" fill="#c8834a"/>` +
    `<g fill="#f6efe2" opacity=".8"><circle cx="75" cy="140" r="2.4"/><circle cx="90" cy="140" r="2.4"/><circle cx="105" cy="140" r="2.4"/></g>` +
    windowGrid(266, 158, 3, 2, 8, 8, 3, "#3f5f7f") +
    speckle(160, 10, 10, "#5b8fe8", 1.2, 0.4) +
    lineTexture(172, 10, 8, "#8fa8b0", 20, 1.6, 0.5) +
    ripples(170, "#bfe8f4") + ripples(184, "#bfe8f4") + gull(200, 40) + gull(340, 55, 1.1) + gull(30, 40, 0.9),

  /** ぶどう畑とワイントレイン(ナパ)。 */
  vineyard:
    sky("#8fc4e8", "#cfe4f0", 160) +
    hills(140, "#7fae5a", 3) +
    ground(160, "#8fae63") +
    fieldRows(166, 30, 8, "#5a4630") +
    roundTree(40, 200, 12, "#4f8f4f") + roundTree(360, 200, 14, "#4f8f4f") +
    `<rect x="150" y="180" width="100" height="14" rx="2" fill="#a5432c" stroke="#20364a" stroke-width="1.4"/>` +
    `<circle cx="164" cy="196" r="5" fill="#241a10"/><circle cx="196" cy="196" r="5" fill="#241a10"/><circle cx="228" cy="196" r="5" fill="#241a10"/>` +
    speckle(170, 20, 16, "#5b8fe8", 1.3, 0.55) +
    fieldRows(170, 20, 4, "#5a4630") +
    roundTree(200, 200, 10, "#4f8f4f") +
    sun(340, 40, 14, "#f5b31c"),
};

// ---------------------------------------------------------------------------
// 都市シンボル(40種、24×24)
// ---------------------------------------------------------------------------

export const USA_MARKS = {
  /** 高層ビルのシルエット。ニューヨーク・シカゴ・アトランタで使う。 */
  skyline:
    `<rect x="3" y="10" width="5" height="12" fill="#7f8896"/>` +
    `<rect x="9" y="4" width="6" height="18" fill="#8a92a0"/>` +
    `<rect x="16" y="8" width="5" height="14" fill="#6f7a88"/>` +
    `<g fill="#f5c95c"><rect x="10" y="7" width="1.4" height="1.4"/><rect x="13" y="7" width="1.4" height="1.4"/><rect x="10" y="11" width="1.4" height="1.4"/><rect x="13" y="11" width="1.4" height="1.4"/></g>`,

  /** ジャズのトランペット。ニューオーリンズ専用。 */
  music:
    `<path d="M3,16c4,-4 8,-4 10,-2l7,-2v4l-7,1c1,2 0,4 -3,4c-4,0 -8,-2 -7,-5z" fill="#f5b31c" stroke="#20364a" stroke-width="1"/>` +
    `<circle cx="6" cy="17" r="1.4" fill="#20364a"/>`,

  /** 大統領の顔が並ぶ丘。ラピッドシティ専用。 */
  monument:
    `<path d="M2,20c2,-14 5,-16 10,-16c5,0 8,2 10,16z" fill="#8b8f98"/>` +
    `<circle cx="8" cy="12" r="2.4" fill="#c8ccc4"/><circle cx="16" cy="10" r="2.6" fill="#c8ccc4"/>`,

  /** ビュート(平頂の岩山)。モニュメントバレー専用。 */
  butte:
    `<path d="M2,22L6,6h4l2,4h2l2,-4h4l4,16z" fill="#c8834a"/>` +
    `<rect x="6" y="6" width="4" height="2" fill="#a5622f"/><rect x="14" y="6" width="4" height="2" fill="#a5622f"/>`,

  /** 錨と帆船のマスト。ボストン専用。 */
  harbor:
    `<path d="M12,4v14" stroke="#20364a" stroke-width="1.4"/><path d="M8,20a4,4 0 0 0 8,0" fill="none" stroke="#20364a" stroke-width="1.4"/>` +
    `<circle cx="12" cy="6" r="1.6" fill="#20364a"/>` +
    `<path d="M12,8h8l-8,7z" fill="#f6efe2" stroke="#20364a" stroke-width=".8"/>`,

  /** 自由の鐘(ひび入り)。フィラデルフィア専用。 */
  libertybell:
    `<path d="M8,16c0,-8 2,-10 4,-10c2,0 4,2 4,10z" fill="#c9a877" stroke="#5a4630" stroke-width="1"/>` +
    `<rect x="6" y="16" width="12" height="3" fill="#a5432c"/>` +
    `<path d="M12,6l1,6" stroke="#5a4630" stroke-width=".8"/>`,

  /** 連邦議事堂のドーム。ワシントンD.C.専用。 */
  dome:
    `<rect x="6" y="16" width="12" height="6" fill="#e8e0cc"/>` +
    `<path d="M4,16a8,7 0 0 1 16,0z" fill="#f6efe2"/>` +
    `<rect x="11" y="2" width="2" height="4" fill="#e8e0cc"/>`,

  /** 灯台。ポートランド(メイン)専用。 */
  lighthouse:
    `<path d="M9,22V9l3,-6l3,6v13z" fill="#f6efe2" stroke="#20364a" stroke-width="1"/>` +
    `<rect x="8" y="8" width="8" height="2" fill="#e8443f"/>` +
    `<circle cx="12" cy="6" r="2" fill="#f5b31c"/>`,

  /** 鉄橋のトラス。ピッツバーグ専用。 */
  bridge:
    `<path d="M2,18h20" stroke="#7f8896" stroke-width="2"/>` +
    `<path d="M4,18L9,8L14,18M10,18L15,8L20,18" fill="none" stroke="#7f8896" stroke-width="1.4"/>`,

  /** 穀物エレベーター。バッファロー専用。 */
  grainelevator:
    `<rect x="6" y="6" width="5" height="16" fill="#c9a877" stroke="#5a4630" stroke-width=".8"/>` +
    `<rect x="12" y="9" width="5" height="13" fill="#e8dcc0" stroke="#5a4630" stroke-width=".8"/>` +
    `<rect x="4" y="4" width="14" height="2" fill="#5a4630"/>`,

  /** 星形の要塞。ボルチモア専用。 */
  fort:
    `<path d="M12,4l3,5l6,-1l-3,6l4,4l-6,1l-1,6l-3,-5l-3,5l-1,-6l-6,-1l4,-4l-3,-6l6,1z" fill="#8fae63" stroke="#5a4630" stroke-width=".8"/>`,

  /** ギター。ナッシュビル・メンフィス・クリーブランドで使う。 */
  guitar:
    `<circle cx="9" cy="16" r="6" fill="#a5432c" stroke="#20364a" stroke-width="1"/>` +
    `<circle cx="9" cy="16" r="2" fill="#5a4630"/>` +
    `<rect x="13" y="4" width="3" height="12" fill="#5a4630"/>` +
    `<g stroke="#e8dcc0" stroke-width=".6"><line x1="14" y1="5" x2="14" y2="15"/><line x1="15.5" y1="5" x2="15.5" y2="15"/></g>`,

  /** 連棟のレンガ家。チャールストン専用。 */
  rowhouse:
    `<g stroke="#20364a" stroke-width=".8"><rect x="2" y="10" width="6" height="12" fill="#f0c9d8"/><rect x="9" y="8" width="6" height="14" fill="#f6efe2"/><rect x="16" y="11" width="6" height="11" fill="#c9e0d8"/></g>` +
    `<path d="M2,10l3,-4l3,4M9,8l3,-4l3,4M16,11l3,-4l3,4" fill="#a5432c"/>`,

  /** モスをまとったオーク。サバンナ専用。 */
  oaktree:
    `<rect x="10" y="14" width="4" height="8" fill="#5a4630"/>` +
    `<circle cx="12" cy="10" r="8" fill="#5f7f4a"/>` +
    `<path d="M6,14q-2,4 0,7M18,14q2,4 0,7" fill="none" stroke="#a8a888" stroke-width="1"/>`,

  /** アール・デコの正面。マイアミ専用。 */
  artdeco:
    `<rect x="6" y="8" width="12" height="14" fill="#7fb3e0" stroke="#20364a" stroke-width="1"/>` +
    `<path d="M6,8a6,5 0 0 1 12,0z" fill="#f5b31c"/>` +
    `<g stroke="#f6efe2" stroke-width="1"><line x1="9" y1="10" x2="9" y2="22"/><line x1="15" y1="10" x2="15" y2="22"/></g>`,

  /** 葉巻。タンパ専用。 */
  cigar:
    `<path d="M3,16c6,-6 12,-6 18,-8v3c-6,2 -12,2 -18,8z" fill="#a5622f" stroke="#5a4630" stroke-width=".8"/>` +
    `<path d="M4,15c1,-1 2,-1 3,-2" stroke="#e8dcc0" stroke-width="1.4"/>`,

  /** ロケット。ヒューストン専用。 */
  rocket:
    `<path d="M12,2c3,4 3,10 3,14h-6c0,-4 0,-10 3,-14z" fill="#e8e0cc" stroke="#20364a" stroke-width=".8"/>` +
    `<path d="M9,16l-3,5h3zM15,16l3,5h-3z" fill="#e8443f"/>` +
    `<circle cx="12" cy="9" r="1.6" fill="#5b8fe8"/>`,

  /** スペイン伝道所の正面。サンアントニオ・ツーソン・サンディエゴで使う。 */
  mission:
    `<rect x="6" y="12" width="12" height="10" fill="#f6efe2" stroke="#20364a" stroke-width="1"/>` +
    `<path d="M9,12a3,3 0 0 1 6,0z" fill="#c8834a"/>` +
    `<rect x="3" y="14" width="2" height="8" fill="#c8834a"/><rect x="19" y="14" width="2" height="8" fill="#c8834a"/>`,

  /** 歯車。デトロイト専用。 */
  gear:
    `<circle cx="12" cy="12" r="6" fill="none" stroke="#7f8896" stroke-width="2.4"/>` +
    `<g stroke="#7f8896" stroke-width="2.4"><line x1="12" y1="3" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="21"/><line x1="3" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="21" y2="12"/></g>`,

  /** 製粉所の水車。ミネアポリス専用。 */
  mill:
    `<circle cx="12" cy="12" r="7" fill="none" stroke="#c9a877" stroke-width="1.6"/>` +
    `<g stroke="#c9a877" stroke-width="1.6"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/><line x1="7" y1="7" x2="17" y2="17"/><line x1="17" y1="7" x2="7" y2="17"/></g>`,

  /** ゲートウェイ・アーチ。セントルイス専用。 */
  arch:
    `<path d="M6,22V14a6,10 0 0 1 12,0v8" fill="none" stroke="#c8834a" stroke-width="2.6"/>`,

  /** ビール樽。ミルウォーキー専用。 */
  brewery:
    `<path d="M7,6h10l1,4c1,3 1,5 0,8l-1,4h-10l-1,-4c-1,-3 -1,-5 0,-8z" fill="#c9a877" stroke="#5a4630" stroke-width="1"/>` +
    `<path d="M6,10h12M6,16h12" stroke="#5a4630" stroke-width="1"/>`,

  /** チェッカーフラッグ。インディアナポリス専用。 */
  racetrack:
    `<rect x="6" y="3" width="1.6" height="19" fill="#5a4630"/>` +
    `<g fill="#20364a"><rect x="7.6" y="3" width="3" height="3"/><rect x="13.6" y="3" width="3" height="3"/><rect x="10.6" y="6" width="3" height="3"/><rect x="16.6" y="6" width="3" height="3"/><rect x="7.6" y="9" width="3" height="3"/><rect x="13.6" y="9" width="3" height="3"/></g>`,

  /** 山の稜線。デンバー専用。 */
  mountain:
    `<path d="M2,20L9,8l4,6l3,-4l6,10z" fill="#8b8f98"/>` +
    `<path d="M9,8l-2.4,4l2.4,1.2l2.4,-1.2z" fill="#f2f6f8"/>`,

  /** カウボーイハット。コディ専用。 */
  cowboyhat:
    `<ellipse cx="12" cy="17" rx="10" ry="2.6" fill="#a5622f" stroke="#5a4630" stroke-width=".8"/>` +
    `<path d="M7,17c0,-6 3,-9 5,-9c2,0 5,3 5,9z" fill="#c8834a" stroke="#5a4630" stroke-width=".8"/>`,

  /** 恐竜の化石。ボーズマン専用。 */
  fossil:
    `<path d="M3,18c4,2 14,2 18,0" fill="none" stroke="#c9a877" stroke-width="1.6"/>` +
    `<circle cx="6" cy="8" r="3" fill="#e8dcc0" stroke="#5a4630" stroke-width=".8"/>` +
    `<path d="M8,10l10,6" stroke="#e8dcc0" stroke-width="2.6"/>`,

  /** 鉄道の動輪。オマハ専用。 */
  railroad:
    `<circle cx="12" cy="12" r="8" fill="none" stroke="#7f8896" stroke-width="2"/>` +
    `<circle cx="12" cy="12" r="2" fill="#7f8896"/>` +
    `<line x1="12" y1="12" x2="18" y2="8" stroke="#7f8896" stroke-width="1.6"/>`,

  /** 複葉機。ウィチタ専用。 */
  biplane:
    `<path d="M2,12h20" stroke="#e8e0cc" stroke-width="2.6"/>` +
    `<path d="M2,9h20" stroke="#e8e0cc" stroke-width="1.6" opacity=".8"/>` +
    `<path d="M12,6v12" stroke="#5a4630" stroke-width="1.2"/>` +
    `<path d="M18,12l4,-3v6z" fill="#e8443f"/>`,

  /** 州議事堂の塔。ビスマーク専用。 */
  capitoltower:
    `<rect x="9" y="6" width="6" height="16" fill="#e8e0cc" stroke="#5a4630" stroke-width=".8"/>` +
    `<path d="M9,6l3,-4l3,4z" fill="#c9a877"/>` +
    `<rect x="10.5" y="10" width="3" height="3" fill="#5b8fe8"/>`,

  /** 渓谷の断層。グランドキャニオン専用。 */
  canyon:
    `<path d="M2,20c4,-8 6,-14 10,-16c4,2 6,8 10,16z" fill="#c8834a"/>` +
    `<path d="M2,20c4,-6 6,-11 10,-13c4,2 6,7 10,13z" fill="#a5622f"/>`,

  /** サボテン。フェニックス専用。 */
  cactus:
    `<path d="M12,22V6" stroke="#3f7a4a" stroke-width="4" stroke-linecap="round"/>` +
    `<path d="M8,16v-5q0,-3 3,-3h1" fill="none" stroke="#3f7a4a" stroke-width="3" stroke-linecap="round"/>` +
    `<path d="M16,18v-4q0,-3 -3,-3h-1" fill="none" stroke="#3f7a4a" stroke-width="3" stroke-linecap="round"/>`,

  /** アドベの丸い壁。サンタフェ専用。 */
  adobe:
    `<path d="M4,22V12c0,-5 4,-8 8,-8c4,0 8,3 8,8v10z" fill="#c8834a" stroke="#5a4630" stroke-width="1"/>` +
    `<rect x="10" y="14" width="4" height="8" fill="#5a4630"/>`,

  /** 熱気球。アルバカーキ専用。 */
  balloon:
    `<ellipse cx="12" cy="10" rx="7" ry="8" fill="#e8443f" stroke="#20364a" stroke-width="1"/>` +
    `<path d="M8,16l2,4h4l2,-4" fill="none" stroke="#5a4630" stroke-width="1"/>` +
    `<rect x="10" y="20" width="4" height="2" fill="#a5432c"/>`,

  /** ネオンの矢印。ラスベガス専用。 */
  neon:
    `<path d="M4,16l8,-10l8,10" fill="none" stroke="#e8443f" stroke-width="2.4"/>` +
    `<circle cx="12" cy="6" r="2" fill="#f5b31c"/><circle cx="6" cy="14" r="1.6" fill="#5b8fe8"/><circle cx="18" cy="14" r="1.6" fill="#5b8fe8"/>`,

  /** 神殿の尖塔。ソルトレイクシティ専用。 */
  temple:
    `<rect x="8" y="12" width="8" height="10" fill="#e8e0cc" stroke="#5a4630" stroke-width=".8"/>` +
    `<path d="M9,12V6h6v6z" fill="#f6efe2"/>` +
    `<path d="M12,6V2" stroke="#f5b31c" stroke-width="1.4"/>`,

  /** スペース・ニードル。シアトル専用。 */
  needle:
    `<path d="M12,2v14" stroke="#7f8896" stroke-width="1.6"/>` +
    `<path d="M6,16h12l-2,4h-8z" fill="#e8443f" stroke="#20364a" stroke-width=".8"/>` +
    `<path d="M9,22h6" stroke="#5a4630" stroke-width="1.6"/>`,

  /** バラの花。ポートランド(オレゴン)専用。 */
  rose:
    `<circle cx="12" cy="9" r="5" fill="#e8443f" stroke="#20364a" stroke-width=".8"/>` +
    `<circle cx="12" cy="9" r="2.2" fill="#f5b31c"/>` +
    `<path d="M12,14v8" stroke="#4f8f4f" stroke-width="1.6"/>`,

  /** ケーブルカー。サンフランシスコ専用。 */
  cablecar:
    `<rect x="4" y="10" width="16" height="9" rx="1" fill="#a5432c" stroke="#20364a" stroke-width="1"/>` +
    `<rect x="6" y="12" width="4" height="4" fill="#bfe8f4"/><rect x="14" y="12" width="4" height="4" fill="#bfe8f4"/>` +
    `<circle cx="8" cy="20" r="1.8" fill="#20364a"/><circle cx="16" cy="20" r="1.8" fill="#20364a"/>`,

  /** ハリウッドの丘の看板。ロサンゼルス専用。 */
  hollywoodsign:
    `<path d="M2,20L6,10l3,10M11,20l3,-10h4l-3,10M19,20l3,-10" fill="none" stroke="#f6efe2" stroke-width="1.8"/>`,

  /** ぶどうの房。ナパ専用。 */
  vineyard:
    `<path d="M12,4v4" stroke="#4f8f4f" stroke-width="1.4"/>` +
    `<g fill="#5b8fe8" stroke="#20364a" stroke-width=".4"><circle cx="10" cy="10" r="2"/><circle cx="14" cy="10" r="2"/><circle cx="8" cy="14" r="2"/><circle cx="12" cy="14" r="2"/><circle cx="16" cy="14" r="2"/><circle cx="10" cy="18" r="2"/><circle cx="14" cy="18" r="2"/></g>`,

  /** 途切れた鉄橋(海に流されたフラグラーの鉄道)。キーウェスト専用。 */
  railbridge:
    `<rect x="2" y="16" width="9" height="3" fill="#8a92a0"/>` +
    `<rect x="13" y="16" width="9" height="3" fill="#8a92a0"/>` +
    `<g stroke="#7f8896" stroke-width="1.4"><line x1="4" y1="19" x2="4" y2="22"/><line x1="9" y1="19" x2="9" y2="22"/><line x1="15" y1="19" x2="15" y2="22"/><line x1="20" y1="19" x2="20" y2="22"/></g>` +
    `<path d="M11,16l-1,3M13,16l1,3" stroke="#5a4630" stroke-width="1.2"/>`,
};
