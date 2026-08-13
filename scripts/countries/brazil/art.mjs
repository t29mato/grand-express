/**
 * ブラジルの都市イラスト。
 *
 * `BRAZIL_MARKS` は24×24の座標系に描くシンボル、`BRAZIL_BG` は400×210の
 * 座標系に描く背景シーン(いずれもSVG断片の文字列)。韓国・イタリアと同じく
 * 最初から文字列として持つ。動きは含めない(アニメーションはReact側で重ねる)。
 *
 * 色は他の盤面と揃える。空 #8fc4e8〜#cfe4f0、顔・白 #f6efe2、
 * 強調 #f5b31c/#e8443f/#5b8fe8。ブラジルらしさは
 * **アマゾンの濃緑 #1f6b3a・土漠の赤茶 #a8624a・南国の陽光 #f4c430・
 * 大西洋の青緑 #1a5f7f・コロニアルの白漆喰と青いアズレージョ #2f6ea8** で出す。
 *
 * 鍵は `cities.mjs` の `mark` / `bg` と一対一で対応する(bg26種・mark28種)。
 * 増やすときは cities.mjs 側と両方を揃えること。
 *
 * **背景SVGの中央25%(x=151〜249 / y=54〜152)は都市シンボルに隠れて
 * 見えない。** 見せたい細部は左右3分の1と手前(y>170)に置く。
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

/** 花崗岩の峰(シュガーローフ・セーラ・ド・マールふう)。 */
function graniteMountain(cx, base, h, fill = "#8b9088") {
  const w = r1(h * 1.1);
  return (
    `<path d="M${r1(cx - w / 2)},${base}Q${r1(cx - w * 0.3)},${r1(base - h * 0.5)} ${r1(cx - w * 0.06)},${r1(base - h * 0.62)}Q${cx},${r1(base - h)} ${r1(cx + w * 0.1)},${r1(base - h * 0.8)}Q${r1(cx + w * 0.32)},${r1(base - h * 0.4)} ${r1(cx + w / 2)},${base}z" fill="${fill}"/>` +
    `<path d="M${r1(cx - w * 0.06)},${r1(base - h * 0.62)}Q${cx},${r1(base - h)} ${r1(cx + w * 0.1)},${r1(base - h * 0.8)}L${r1(cx + w * 0.02)},${r1(base - h * 0.72)}z" fill="#f2f6f8" opacity=".7"/>`
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

/** かもめ。 */
function gull(x, y, scale = 1) {
  const w = 8 * scale;
  return `<path d="M${r1(x - w)},${y}q${r1(w / 2)},-6 ${w},0q${r1(w / 2)},-6 ${w},0" fill="none" stroke="#4a4a52" stroke-width="1.4"/>`;
}

/** 丸い樹冠の広葉樹。 */
function roundTree(x, base, r, crown = "#2f8a4a", trunk = "#6b5330") {
  const th = r1(r * 1.1);
  return (
    `<rect x="${r1(x - r * 0.16)}" y="${r1(base - th - r * 0.3)}" width="${r1(r * 0.32)}" height="${r1(th + r * 0.3)}" fill="${trunk}"/>` +
    `<circle cx="${x}" cy="${r1(base - th - r * 0.5)}" r="${r}" fill="${crown}"/>`
  );
}

/** ヤシの木(海岸沿い)。 */
function palm(x, base, h) {
  const fronds = [-16, -10, 0, 10, 16];
  const parts = [`<path d="M${x},${base}q${r1(h * -0.18)},${r1(-h * 0.5)} ${r1(h * -0.05)},${r1(-h)}" fill="none" stroke="#6b5330" stroke-width="3"/>`];
  const tipX = r1(x - h * 0.05);
  const tipY = r1(base - h);
  for (const a of fronds) {
    parts.push(`<path d="M${tipX},${tipY}q${a},-6 ${a * 1.6},4" fill="none" stroke="#2f8a4a" stroke-width="3" stroke-linecap="round"/>`);
  }
  return parts.join("");
}

/** アラウカリア(南部特有のブラジルマツ)。傘状の樹冠が特徴。 */
function araucaria(x, base, h) {
  const w = r1(h * 0.62);
  return (
    `<rect x="${r1(x - 2)}" y="${r1(base - h)}" width="4" height="${h}" fill="#5a4630"/>` +
    `<ellipse cx="${x}" cy="${r1(base - h * 0.92)}" rx="${w}" ry="6" fill="#2f5f3f"/>` +
    `<ellipse cx="${x}" cy="${r1(base - h)}" rx="${r1(w * 0.62)}" ry="4.4" fill="#2f5f3f"/>` +
    `<ellipse cx="${x}" cy="${r1(base - h * 1.06)}" rx="${r1(w * 0.32)}" ry="3" fill="#2f5f3f"/>`
  );
}

/** 植民地様式の教会。双塔とペディメント、白漆喰と金の装飾。 */
function colonialChurch(x, base, w, h, wall = "#f6efe2", trim = "#e8b84a") {
  const hw = r1(w / 2);
  const towerW = r1(w * 0.16);
  const towerH = r1(h * 1.25);
  return (
    `<rect x="${r1(x - hw)}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${wall}"/>` +
    `<path d="M${r1(x - hw)},${r1(base - h)}L${x},${r1(base - h * 1.3)}L${r1(x + hw)},${r1(base - h)}z" fill="${wall}"/>` +
    `<rect x="${r1(x - hw - towerW * 0.3)}" y="${r1(base - towerH)}" width="${towerW}" height="${towerH}" fill="${wall}"/>` +
    `<rect x="${r1(x + hw - towerW * 0.7)}" y="${r1(base - towerH)}" width="${towerW}" height="${towerH}" fill="${wall}"/>` +
    `<path d="M${r1(x - hw - towerW * 0.3)},${r1(base - towerH)}l${r1(towerW / 2)},-10l${r1(towerW / 2)},10z" fill="${trim}"/>` +
    `<path d="M${r1(x + hw - towerW * 0.7)},${r1(base - towerH)}l${r1(towerW / 2)},-10l${r1(towerW / 2)},10z" fill="${trim}"/>` +
    `<circle cx="${x}" cy="${r1(base - h * 0.7)}" r="${r1(h * 0.14)}" fill="${trim}" opacity=".85"/>` +
    `<rect x="${r1(x - hw)}" y="${r1(base - h)}" width="${w}" height="4" fill="${trim}"/>`
  );
}

/** 石段テラス(段々畑・コーヒー畑・ブドウ畑の横畝)。 */
function rows(x, y, w, count, gap, color) {
  const parts = [];
  for (let i = 0; i < count; i++) {
    parts.push(`<path d="M${x},${r1(y + i * gap)}h${w}"/>`);
  }
  return `<g stroke="${color}" stroke-width="3" opacity=".8">${parts.join("")}</g>`;
}

/** 丸い茂みの列(コーヒー・ブドウの株)。 */
function shrubRow(x, y, count, gap, r, color) {
  const parts = [];
  for (let i = 0; i < count; i++) {
    parts.push(`<circle cx="${r1(x + i * gap)}" cy="${y}" r="${r}" fill="${color}"/>`);
  }
  return `<g opacity=".9">${parts.join("")}</g>`;
}

/** 高層ビル群。 */
function skylineBlocks(specs, fill = "#7f8896", winFill = "#c8e0f0") {
  const parts = [`<g fill="${fill}">`];
  for (const [x, y, w, h] of specs) parts.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}"/>`);
  parts.push("</g><g fill=\"" + winFill + "\" opacity=\".6\">");
  for (const [x, y, w, h] of specs) {
    for (let wy = y + 6; wy < y + h - 6; wy += 12) {
      for (let wx = x + 4; wx < x + w - 4; wx += 10) {
        parts.push(`<rect x="${wx}" y="${wy}" width="4" height="4"/>`);
      }
    }
  }
  parts.push("</g>");
  return parts.join("");
}

/** カヌー・川船。 */
function canoe(x, y, w, fill = "#6b5330") {
  return `<path d="M${x},${y}c${r1(w * 0.1)},-6 ${r1(w * 0.9)},-6 ${w},0l-4,5h${r1(-w + 8)}z" fill="${fill}"/>`;
}

/** マカウ(コンゴウインコ)。飛ぶ姿の簡略シルエット。 */
function macaw(x, y, scale = 1, fill = "#3f8fc4") {
  return (
    `<path d="M${r1(x - 10 * scale)},${y}q${r1(6 * scale)},${r1(-8 * scale)} ${r1(14 * scale)},${r1(-2 * scale)}q${r1(6 * scale)},${r1(-8 * scale)} ${r1(12 * scale)},0z" fill="${fill}"/>` +
    `<circle cx="${r1(x + 12 * scale)}" cy="${r1(y - 3 * scale)}" r="${r1(3 * scale)}" fill="#f5b31c"/>`
  );
}

/** トウカン(オオハシ)の横顔。 */
function toucanHead(x, y, scale = 1) {
  return (
    `<circle cx="${x}" cy="${y}" r="${r1(6 * scale)}" fill="#241a10"/>` +
    `<path d="M${r1(x + 4 * scale)},${r1(y - 1 * scale)}q${r1(10 * scale)},${r1(-1 * scale)} ${r1(12 * scale)},${r1(3 * scale)}q${r1(-8 * scale)},${r1(3 * scale)} ${r1(-12 * scale)},${r1(1 * scale)}z" fill="#f5b31c"/>` +
    `<circle cx="${r1(x - 1 * scale)}" cy="${r1(y - 2 * scale)}" r="${r1(1.4 * scale)}" fill="#f6efe2"/>`
  );
}

/** ジャカレー(カイマン)。水面近くを漂う簡略シルエット。 */
function caiman(x, y, w, fill = "#5f7f4a") {
  return (
    `<ellipse cx="${x}" cy="${y}" rx="${r1(w / 2)}" ry="${r1(w * 0.12)}" fill="${fill}"/>` +
    `<circle cx="${r1(x - w / 2)}" cy="${r1(y - w * 0.06)}" r="${r1(w * 0.06)}" fill="${fill}"/>` +
    `<circle cx="${r1(x - w / 2)}" cy="${r1(y - w * 0.08)}" r="${r1(w * 0.02)}" fill="#241a10"/>`
  );
}

/** カピバラ。水辺に佇む簡略シルエット。 */
function capybara(x, base, w) {
  const h = r1(w * 0.5);
  return (
    `<ellipse cx="${x}" cy="${r1(base - h * 0.5)}" rx="${r1(w / 2)}" ry="${r1(h / 2)}" fill="#8a6f4a"/>` +
    `<circle cx="${r1(x + w / 2)}" cy="${r1(base - h * 0.6)}" r="${r1(h * 0.4)}" fill="#8a6f4a"/>` +
    `<rect x="${r1(x - w * 0.3)}" y="${r1(base - h * 0.1)}" width="3" height="${r1(h * 0.3)}" fill="#6b5330"/>` +
    `<rect x="${r1(x + w * 0.2)}" y="${r1(base - h * 0.1)}" width="3" height="${r1(h * 0.3)}" fill="#6b5330"/>`
  );
}

/** 蒸気機関車の横顔(簡略)。 */
function steamLoco(x, base, w) {
  const h = r1(w * 0.4);
  return (
    `<rect x="${x}" y="${r1(base - h)}" width="${w}" height="${h}" rx="3" fill="#2f4a52"/>` +
    `<circle cx="${r1(x + w * 0.18)}" cy="${base}" r="${r1(h * 0.32)}" fill="#241a10"/>` +
    `<circle cx="${r1(x + w * 0.55)}" cy="${base}" r="${r1(h * 0.32)}" fill="#241a10"/>` +
    `<rect x="${r1(x + w * 0.7)}" y="${r1(base - h * 1.5)}" width="5" height="${r1(h * 1.1)}" fill="#4a4a52"/>` +
    `<ellipse cx="${r1(x + w * 0.72)}" cy="${r1(base - h * 1.6)}" rx="10" ry="6" fill="#c8ccc4" opacity=".7"/>`
  );
}

/** 起重機港ではなく貨物用サイロ(穀物輸出港)。 */
function grainSilo(x, base, w, h, fill = "#c8ccc4") {
  return (
    `<rect x="${x}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${fill}"/>` +
    `<ellipse cx="${r1(x + w / 2)}" cy="${r1(base - h)}" rx="${r1(w / 2)}" ry="5" fill="${fill}"/>` +
    `<rect x="${r1(x + w * 0.3)}" y="${r1(base - h - 14)}" width="${r1(w * 0.4)}" height="14" fill="#9a9ea4"/>`
  );
}

/** 半木骨造の家(南部の欧州系移民町)。 */
function halfTimberHouse(x, base, w, h, wall = "#e8dcc0", beam = "#5a4630") {
  return (
    `<rect x="${x}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${wall}"/>` +
    `<path d="M${x},${r1(base - h)}h${w}v${r1(-h * 0.25)}l${r1(-w / 2)},-14l${r1(-w / 2)},14z" fill="#8a4a3a"/>` +
    `<g stroke="${beam}" stroke-width="2.4"><path d="M${x},${r1(base - h)}v${h}M${r1(x + w)},${r1(base - h)}v${h}M${r1(x + w / 2)},${r1(base - h)}v${h}M${x},${r1(base - h * 0.5)}h${w}"/></g>`
  );
}

export const BRAZIL_COLORS = {
  sea: "#123f5f",
  seaWave: "#1a5678",
  landBase: "#3f8f5a",
  coast: "#1f4a2f",
};

// ---------------------------------------------------------------------------
// 背景シーン(26種)。鍵は cities.mjs の `bg` と対応。
// ---------------------------------------------------------------------------

export const BRAZIL_BG = {
  /** マナウス専用。オペラハウスと二色の川。 */
  manaus:
    sky("#8fc4e8", "#cfe4f0", 120) +
    clouds(300, 30, 1.1) +
    hills(118, "#2f8a4a") +
    ground(120, "#3f8f5a") +
    // 二色の川(黒い川と淡い川が並ぶ)
    `<rect x="0" y="160" width="200" height="50" fill="#2a3f2f"/>` +
    `<rect x="200" y="160" width="200" height="50" fill="#7fa8c4"/>` +
    ripples(176, "#bfe8f4") +
    canoe(60, 195, 40) +
    canoe(300, 198, 34, "#8a6f4a") +
    // 劇場のドーム(左)
    `<path d="M40,150a40,20 0 0 1 80,0z" fill="#3f8fc4"/>` +
    `<rect x="50" y="150" width="60" height="30" fill="#f6efe2"/>` +
    `<g fill="#e8b84a"><rect x="56" y="156" width="8" height="16"/><rect x="72" y="156" width="8" height="16"/><rect x="88" y="156" width="8" height="16"/></g>` +
    macaw(330, 60, 1.3) +
    macaw(350, 78, 1, "#e8443f"),

  /** 港町。アマゾンの川沿いの町(ベレン・サンタレン・リオブランコ・ボア・ヴィスタ・マカパー)。 */
  riverport:
    sky("#8fc4e8", "#cfe4f0", 118) +
    clouds(310, 28, 1) +
    hills(116, "#2f8a4a") +
    ground(118, "#3f8f5a") +
    gull(60, 50, 1) +
    gull(320, 44, 1) +
    `<rect x="0" y="150" width="400" height="60" fill="#3f7f9f"/>` +
    ripples(168, "#bfe8f4") +
    crane(50, 150, 60) +
    crane(90, 150, 44) +
    `<rect x="0" y="140" width="400" height="12" fill="#9a9484"/>` +
    canoe(320, 178, 46, "#6b5330") +
    toucanHead(40, 96, 1.3) +
    palm(30, 200, 44) +
    palm(370, 202, 38),

  /** パリンチンス専用。ボイ・ブンバの祭りの色彩。 */
  boiband:
    sky("#5f7f9f", "#e8b84a", 130) +
    sun(330, 42, 24, "#f5b31c") +
    hills(128, "#2f8a4a") +
    ground(130, "#3f8f5a") +
    `<rect x="0" y="160" width="400" height="50" fill="#3f7f9f"/>` +
    ripples(176, "#bfe8f4") +
    // 牛の頭を模した山車(赤陣営)
    `<g><path d="M60,190c0,-20 40,-20 40,0z" fill="#e8443f"/><path d="M62,172l-8,-10M98,172l8,-10" stroke="#f6efe2" stroke-width="3"/><circle cx="72" cy="182" r="3" fill="#f6efe2"/><circle cx="88" cy="182" r="3" fill="#f6efe2"/></g>` +
    // 牛の頭を模した山車(青陣営)
    `<g><path d="M280,196c0,-18 36,-18 36,0z" fill="#2f6ea8"/><path d="M282,180l-7,-9M314,180l7,-9" stroke="#f6efe2" stroke-width="3"/><circle cx="291" cy="188" r="2.6" fill="#f6efe2"/><circle cx="305" cy="188" r="2.6" fill="#f6efe2"/></g>` +
    // 紙吹雪と旗飾り
    `<g fill="#f5b31c"><circle cx="150" cy="60" r="3"/><circle cx="180" cy="45" r="3"/><circle cx="330" cy="70" r="3"/><circle cx="60" cy="55" r="2.4"/><circle cx="220" cy="40" r="2.4"/></g>` +
    `<g fill="#e8443f"><circle cx="100" cy="48" r="2.4"/><circle cx="260" cy="58" r="2.4"/></g>` +
    `<g stroke="#f6efe2" stroke-width="1.6"><path d="M20,36h300"/></g>` +
    `<g fill="#3f8fc4"><path d="M30,36l-5,6h10z"/><path d="M80,36l-5,6h10z"/><path d="M230,36l-5,6h10z"/><path d="M280,36l-5,6h10z"/></g>` +
    // 太鼓を打つ人影(手前)
    `<g fill="#4a4436"><circle cx="180" cy="185" r="6"/><rect x="174" y="191" width="12" height="14"/></g>` +
    `<ellipse cx="180" cy="200" rx="10" ry="6" fill="#8a5a3a"/>`,

  /** ポルトヴェーリョ専用。廃線化した鉄道と密林。 */
  oldrail:
    sky("#8fc4e8", "#cfe4f0", 130) +
    clouds(90, 30, 1) +
    hills(128, "#2f8a4a", 5) +
    ground(130, "#3f8f5a") +
    // 錆びた線路(草に呑まれかけている)
    `<g stroke="#7a5f4a" stroke-width="4"><path d="M0,190h400"/></g>` +
    `<g fill="#5a4630"><rect x="20" y="186" width="8" height="10"/><rect x="60" y="186" width="8" height="10"/><rect x="100" y="186" width="8" height="10"/><rect x="140" y="186" width="8" height="10"/><rect x="260" y="186" width="8" height="10"/><rect x="300" y="186" width="8" height="10"/><rect x="340" y="186" width="8" height="10"/></g>` +
    steamLoco(280, 190, 90) +
    shrubRow(20, 195, 5, 10, 4, "#2f6b3a") +
    roundTree(40, 200, 16) +
    roundTree(370, 202, 14),

  /** マラバー専用。カラジャス鉄鉱山と鉱石列車。 */
  ironmine:
    sky("#9fb0b8", "#dfe4e0", 140) +
    `<g opacity=".5" fill="#c8ccc4"><ellipse cx="70" cy="60" rx="26" ry="12"/><ellipse cx="330" cy="50" rx="22" ry="10"/><ellipse cx="200" cy="40" rx="20" ry="8"/></g>` +
    ground(140, "#a8624a") +
    // 赤鉄鉱の山
    `<path d="M0,140L60,80L120,140z" fill="#8a4a3a"/><path d="M60,140L110,90L160,140z" fill="#a8624a"/>` +
    // 採掘場のベンチ状の段(左手前)
    `<g fill="#7a4030"><path d="M0,170h90l-10,10H0z"/><path d="M0,182h70l-10,10H0z"/></g>` +
    // ベルトコンベア(左)
    `<g stroke="#4a4a52" stroke-width="2"><path d="M20,168l60,-30"/><path d="M20,178l60,-30"/></g>` +
    `<g fill="#241a10"><rect x="18" y="164" width="6" height="8"/><rect x="76" y="134" width="6" height="8"/></g>` +
    // 鉱石列車(手前)
    `<g fill="#4a4a52"><rect x="180" y="168" width="200" height="24" rx="2"/><rect x="180" y="160" width="200" height="10" fill="#8a4a3a"/></g>` +
    `<g fill="#241a10"><circle cx="200" cy="196" r="7"/><circle cx="240" cy="196" r="7"/><circle cx="280" cy="196" r="7"/><circle cx="320" cy="196" r="7"/><circle cx="360" cy="196" r="7"/></g>` +
    `<rect x="0" y="192" width="400" height="4" fill="#7a5f4a"/>` +
    // 好景気の集落の屋根(右奥)
    `<g fill="#c8a878"><rect x="330" y="130" width="20" height="14"/><rect x="356" y="126" width="18" height="18"/></g>` +
    `<g fill="#7a5f4a"><path d="M328,130h24l-4,-6h-16z"/><path d="M354,126h22l-4,-6h-14z"/></g>`,

  /** サルバドール専用。ペロウリーニョの坂と海。 */
  salvador:
    sky("#8fc4e8", "#cfe4f0", 116) +
    clouds(300, 28, 1) +
    ground(116, "#c8a878") +
    // 坂の上の色とりどりの植民地建築
    `<g><rect x="30" y="130" width="46" height="50" fill="#e8443f"/><rect x="76" y="140" width="40" height="40" fill="#f5b31c"/><rect x="116" y="126" width="44" height="54" fill="#2f6ea8"/></g>` +
    `<g fill="#f6efe2"><rect x="36" y="140" width="10" height="14"/><rect x="54" y="140" width="10" height="14"/><rect x="84" y="150" width="10" height="12"/><rect x="124" y="136" width="10" height="14"/><rect x="142" y="136" width="10" height="14"/></g>` +
    colonialChurch(330, 176, 60, 40) +
    // 海(手前)
    `<rect x="0" y="180" width="400" height="30" fill="#1e6ea0"/>` +
    ripples(192, "#bfe8f4") +
    // カポエイラの輪(手前・左)
    `<g stroke="#4a4436" stroke-width="2" fill="none"><path d="M20,205a20,4 0 0 0 40,0"/></g>`,

  /** 北東部の海辺(ヘシフィ・フォルタレーザ・ナタウ・ジョアン・ペソア・マセイオ・アラカージュ)。 */
  beachnortheast:
    sky("#8fc4e8", "#cfe4f0", 108) +
    sun(340, 44, 22) +
    clouds(80, 28, 1) +
    `<rect x="0" y="108" width="400" height="60" fill="#1e8ea8"/>` +
    ripples(124, "#bfe8f4") +
    `<path d="M0,148c60,-8 120,4 200,-2c80,-6 140,4 200,-2v72H0z" fill="#e8dcc0"/>` +
    // ジャンガーダ(帆の筏)
    `<path d="M170,158L200,110L230,158z" fill="#f6efe2"/><rect x="168" y="156" width="64" height="4" fill="#6b5330"/>` +
    `<g><path d="M60,168a20,10 0 0 1 40,0z" fill="#e8443f"/><rect x="78" y="168" width="3" height="30" fill="#6b5330"/></g>` +
    palm(20, 200, 32) +
    palm(378, 202, 28) +
    gull(300, 40, 1),

  /** 植民地港町(オリンダ・サンルイス・パラチー・パラナグア)。 */
  colonialport:
    sky("#8fc4e8", "#cfe4f0", 116) +
    clouds(320, 26, 1) +
    ground(116, "#c8a878") +
    colonialChurch(90, 176, 70, 46) +
    `<g fill="#2f6ea8"><rect x="180" y="150" width="30" height="26"/><rect x="212" y="140" width="28" height="36"/></g>` +
    `<g fill="#f5b31c"><rect x="242" y="156" width="26" height="20"/></g>` +
    `<g fill="#f6efe2"><rect x="186" y="156" width="8" height="8"/><rect x="218" y="148" width="8" height="8"/><rect x="218" y="162" width="8" height="8"/></g>` +
    `<rect x="0" y="180" width="400" height="30" fill="#2f6ea8"/>` +
    ripples(192, "#bfe8f4") +
    crane(340, 180, 44) +
    gull(350, 42, 1),

  /** バヘイリーニャス専用。白い砂丘とラグーン。 */
  dunes:
    sky("#a8c8e0", "#f2ecd8", 195) +
    sun(340, 40, 20, "#f5b31c") +
    clouds(60, 30, 0.8) +
    `<path d="M0,90Q60,70 120,90" fill="none" stroke="#f6efe2" stroke-width="2" opacity=".7"/>` +
    `<path d="M0,150Q80,110 160,150Q240,190 320,140Q370,120 400,150v60H0z" fill="#f2ecd8"/>` +
    `<path d="M0,150Q80,120 160,150" fill="none" stroke="#e2dcc0" stroke-width="2"/>` +
    `<path d="M40,170Q100,150 160,172" fill="none" stroke="#e2dcc0" stroke-width="2"/>` +
    `<path d="M230,180Q290,160 350,182" fill="none" stroke="#e2dcc0" stroke-width="2"/>` +
    // ターコイズのラグーン
    `<ellipse cx="140" cy="185" rx="46" ry="10" fill="#3fc4c4"/>` +
    `<ellipse cx="260" cy="192" rx="34" ry="8" fill="#3fc4c4"/>` +
    `<ellipse cx="60" cy="196" rx="22" ry="6" fill="#3fc4c4"/>` +
    `<g fill="#4a4a52" opacity=".8"><circle cx="140" cy="180" r="1.6"/><circle cx="150" cy="182" r="1.6"/><circle cx="260" cy="188" r="1.4"/></g>` +
    // 裸足の足跡(砂丘を横切る)
    `<g fill="#dcd0a8" opacity=".8"><ellipse cx="180" cy="140" rx="2" ry="3"/><ellipse cx="188" cy="136" rx="2" ry="3"/><ellipse cx="196" cy="132" rx="2" ry="3"/></g>` +
    // 砂丘バギー
    `<g><rect x="40" y="184" width="30" height="10" rx="2" fill="#e8443f"/><circle cx="46" cy="196" r="5" fill="#241a10"/><circle cx="64" cy="196" r="5" fill="#241a10"/></g>` +
    // 渡り鳥(手前上空)
    `<g stroke="#4a4a52" stroke-width="1.4" fill="none"><path d="M300,60q4,-4 8,0q4,-4 8,0"/><path d="M320,70q3,-3 6,0q3,-3 6,0"/></g>`,

  /** 内陸乾燥地(テレジーナ・ペトロリーナ・ゴイアニア・クイアバ)。 */
  sertao:
    sky("#c8d8a0", "#f2ecd0", 140) +
    sun(60, 40, 20) +
    ground(140, "#a8864a") +
    // ペキ/セラードの木
    `<path d="M100,140L104,90L108,140z" fill="#7a6030"/><circle cx="104" cy="86" r="18" fill="#b3a24a"/>` +
    `<path d="M260,140L264,100L268,140z" fill="#7a6030"/><circle cx="264" cy="96" r="14" fill="#b3a24a"/>` +
    shrubRow(20, 175, 5, 16, 6, "#8a9a4a") +
    shrubRow(300, 180, 5, 16, 6, "#8a9a4a") +
    // 灌漑用の畝(ペトロリーナのブドウ畑を思わせる)
    rows(150, 190, 100, 3, 7, "#7fa8c4") +
    `<rect x="0" y="206" width="400" height="4" fill="#8a6f4a"/>`,

  /** ブラジリア専用。モダニズム建築とプラノ・ピロトの広場。 */
  capital:
    sky("#8fc4e8", "#cfe4f0", 150) +
    clouds(70, 26, 0.9) +
    sun(360, 34, 14) +
    ground(150, "#a8864a") +
    // ニーマイヤー風の建築(白いアーチ)
    `<g fill="#f6efe2"><path d="M40,150v-50a20,20 0 0 1 40,0v50z"/><path d="M100,150v-60a24,24 0 0 1 48,0v60z"/></g>` +
    `<g fill="#7f8896"><rect x="280" y="70" width="16" height="80"/><rect x="304" y="60" width="16" height="90"/></g>` +
    `<g fill="#c8e0f0" opacity=".6"><rect x="284" y="78" width="4" height="4"/><rect x="284" y="90" width="4" height="4"/><rect x="308" y="68" width="4" height="4"/><rect x="308" y="80" width="4" height="4"/></g>` +
    // 双子の議事堂ドーム
    `<circle cx="220" cy="140" r="18" fill="#f6efe2"/><path d="M220,140a18,10 0 0 1 0,-18a18,10 0 0 1 0,18z" fill="#e2dcc0"/>` +
    `<rect x="210" y="140" width="20" height="10" fill="#7f8896"/>` +
    // 国旗(左手前)
    `<rect x="30" y="176" width="2" height="26" fill="#4a4a52"/>` +
    `<path d="M32,178h22v14h-22z" fill="#009c3b"/><path d="M35,185l8,-6l8,6l-8,6z" fill="#ffdf00"/>` +
    // ブラジリアの並木道
    roundTree(70, 200, 12) +
    roundTree(340, 202, 14) +
    `<ellipse cx="180" cy="192" rx="140" ry="14" fill="#5b8fe8" opacity=".8"/>` +
    `<ellipse cx="180" cy="192" rx="30" ry="4" fill="#bfe8f4"/>` +
    `<g stroke="#e2dcc0" stroke-width="2" opacity=".6"><path d="M60,192h240"/></g>`,

  /** パンタナール(カンポ・グランデ・ボニート・コルンバ)。 */
  pantanal:
    sky("#8fc4e8", "#cfe4f0", 130) +
    sun(60, 40, 18) +
    hills(128, "#7fae8a") +
    ground(130, "#8a624a") +
    `<rect x="0" y="160" width="400" height="50" fill="#7fa8b0"/>` +
    ripples(174, "#bfe8f4") +
    caiman(90, 186, 40) +
    caiman(300, 192, 34) +
    capybara(200, 200, 30) +
    capybara(240, 202, 24) +
    `<g stroke="#5f8f6a" stroke-width="3" opacity=".8"><path d="M10,150v-30M30,150v-24M330,150v-28M360,150v-20"/></g>`,

  /** バロック様式の金鉱町(オウロ・プレット・ジアマンチーナ)。 */
  colonialbaroque:
    sky("#8fc4e8", "#cfe4f0", 110) +
    clouds(90, 28, 1) +
    graniteMountain(340, 108, 56, "#7f8f5c") +
    ground(110, "#8fae63") +
    // 坂の町並み
    `<g fill="#f6efe2"><rect x="20" y="140" width="34" height="40"/><rect x="60" y="130" width="30" height="50"/><rect x="94" y="146" width="28" height="34"/></g>` +
    `<g fill="#4a4a52"><rect x="20" y="140" width="34" height="6"/><rect x="60" y="130" width="30" height="6"/><rect x="94" y="146" width="28" height="6"/></g>` +
    colonialChurch(210, 178, 64, 44) +
    // 石畳(手前)
    `<g fill="#9a9488" opacity=".7"><rect x="0" y="200" width="400" height="10"/></g>`,

  /** リオデジャネイロ専用。シュガーローフとコルコバードの丘、海。 */
  rio:
    sky("#8fc4e8", "#cfe4f0", 140) +
    sun(40, 34, 16) +
    graniteMountain(70, 130, 60, "#7f8f5c") +
    // コルコバードとキリスト像(簡略シルエット)
    `<path d="M300,140L330,60L360,140z" fill="#5f7f4a"/>` +
    `<g stroke="#e8dcc0" stroke-width="3"><path d="M330,90v-20M318,72h24"/></g>` +
    ground(140, "#8fae63") +
    `<rect x="0" y="176" width="400" height="34" fill="#1e6ea0"/>` +
    ripples(190, "#bfe8f4") +
    // コパカバーナの波模様歩道
    `<g stroke="#4a4a52" stroke-width="2" fill="none" opacity=".6"><path d="M0,172q20,-6 40,0t40,0t40,0t40,0t40,0t40,0t40,0t40,0t40,0t40,0"/></g>` +
    palm(130, 202, 30) +
    palm(160, 204, 26),

  /** 高原の避暑地(ペトロポリス・ジュイス・ジ・フォーラ)。 */
  highlandcity:
    sky("#a8c8e0", "#dbe6e0", 120) +
    clouds(300, 24, 0.9) +
    hills(118, "#5f7f4a", 5) +
    ground(120, "#6f8a52") +
    halfTimberHouse(60, 176, 50, 40) +
    halfTimberHouse(120, 180, 40, 34) +
    `<rect x="0" y="184" width="400" height="26" fill="#3f7fae"/>` +
    ripples(196, "#bfe8f4") +
    roundTree(340, 200, 16) +
    roundTree(370, 204, 12),

  /** サンパウロ専用。密集した高層ビル群。 */
  saopaulo:
    sky("#9fb0b8", "#dfe4e0", 150) +
    ground(150, "#8a8478") +
    skylineBlocks([
      [20, 70, 22, 80], [46, 50, 26, 100], [76, 84, 20, 66],
      [230, 60, 24, 90], [258, 76, 22, 74], [284, 44, 26, 106],
      [316, 90, 20, 60], [340, 66, 24, 84],
    ]) +
    // ヘリコプター(手前上空)
    `<g><rect x="150" y="40" width="20" height="8" rx="2" fill="#e8443f"/><line x1="140" y1="44" x2="180" y2="44" stroke="#241a10" stroke-width="1.6"/></g>` +
    `<rect x="0" y="150" width="400" height="60" fill="#9a9484"/>` +
    `<g fill="#4a4a52" opacity=".8"><rect x="0" y="150" width="400" height="4"/></g>`,

  /** 大西洋岸の港(サントス・ヴィトーリア)。 */
  atlanticport:
    sky("#8fc4e8", "#cfe4f0", 118) +
    clouds(300, 26, 1) +
    ground(118, "#9a9484") +
    gull(60, 46, 1) +
    gull(90, 60, 0.8) +
    `<rect x="0" y="150" width="400" height="60" fill="#1e6ea0"/>` +
    ripples(166, "#bfe8f4") +
    grainSilo(40, 150, 24, 56) +
    grainSilo(70, 150, 24, 46) +
    crane(300, 150, 60) +
    crane(340, 150, 44) +
    `<rect x="0" y="140" width="400" height="12" fill="#8a8478"/>` +
    `<rect x="200" y="152" width="90" height="20" rx="3" fill="#e8443f"/>` +
    `<rect x="210" y="140" width="70" height="14" fill="#f6efe2"/>`,

  /** 農業・物流の内陸都市(カンピーナス・ウベルランジア)。 */
  agritown:
    sky("#8fc4e8", "#cfe4f0", 130) +
    clouds(300, 26, 0.9) +
    ground(130, "#a8bd6a") +
    shrubRow(20, 160, 8, 18, 6, "#2f6b3a") +
    shrubRow(20, 178, 8, 18, 6, "#3f8f4f") +
    // 物流倉庫(手前・右)
    `<rect x="220" y="160" width="140" height="40" fill="#c8ccc4"/>` +
    `<rect x="220" y="160" width="140" height="6" fill="#e8443f"/>` +
    `<g fill="#4a4a52"><rect x="240" y="176" width="20" height="24"/><rect x="280" y="176" width="20" height="24"/><rect x="320" y="176" width="20" height="24"/></g>` +
    `<g><rect x="360" y="180" width="30" height="14" rx="2" fill="#5b8fe8"/><circle cx="368" cy="196" r="5" fill="#241a10"/><circle cx="384" cy="196" r="5" fill="#241a10"/></g>`,

  /** ベロオリゾンチ専用。パンプーリャ教会の曲線。 */
  belohorizonte:
    sky("#8fc4e8", "#cfe4f0", 140) +
    clouds(60, 24, 0.9) +
    hills(138, "#5f7f4a", 5) +
    ground(140, "#6f8a52") +
    // ニーマイヤーの教会(流線型の屋根。隠れ帯を避けて左寄りに)
    `<path d="M20,178c0,-30 30,-46 60,-46s60,16 60,46z" fill="#f6efe2"/>` +
    `<path d="M20,178c0,-30 30,-46 60,-46" fill="none" stroke="#4a4a52" stroke-width="2"/>` +
    `<rect x="40" y="150" width="40" height="28" fill="#5b8fe8" opacity=".6"/>` +
    skylineBlocks([[260, 80, 20, 70], [286, 60, 24, 90], [316, 96, 18, 54]]) +
    `<rect x="0" y="178" width="400" height="32" fill="#1e6ea0"/>` +
    ripples(192, "#bfe8f4"),

  /** 南部の海辺(ウバトゥーバ・フロリアノーポリス)。 */
  beachsouth:
    sky("#8fc4e8", "#cfe4f0", 108) +
    sun(60, 40, 18) +
    clouds(320, 26, 1) +
    gull(280, 40, 1) +
    gull(300, 54, 0.8) +
    `<rect x="0" y="108" width="400" height="58" fill="#1e6ea0"/>` +
    ripples(122, "#bfe8f4") +
    // クジラの潮吹き(手前の海)
    `<g><path d="M320,150a26,10 0 0 1 52,0z" fill="#4a5a6a"/><path d="M340,148q0,-14 4,-20" fill="none" stroke="#bfe8f4" stroke-width="3"/></g>` +
    `<path d="M0,146c60,-8 120,4 200,-2c80,-6 140,4 200,-2v74H0z" fill="#e8dcc0"/>` +
    // 漁船と網(手前)
    `<path d="M60,178c8,-4 30,-4 38,0l-4,8h-30z" fill="#2f6ea8"/>` +
    `<g stroke="#8a8478" stroke-width="1.4" fill="none" opacity=".8"><path d="M100,190q10,-6 20,0t20,0"/></g>` +
    // レース編みの網目(アソーレス系の手仕事、手前・左)
    `<g stroke="#f6efe2" stroke-width="1.2" fill="none" opacity=".8"><circle cx="120" cy="196" r="6"/><circle cx="130" cy="196" r="6"/></g>` +
    araucaria(340, 200, 24) +
    palm(20, 200, 30) +
    palm(370, 204, 26),

  /** モヘッチス専用。セーラ・ド・マールを越える山岳鉄道。 */
  mountaintrain:
    sky("#8fc4e8", "#cfe4f0", 140) +
    clouds(330, 26, 1) +
    graniteMountain(90, 130, 80, "#7f9f5c") +
    graniteMountain(200, 136, 64, "#8faf68") +
    hills(140, "#5f7f4a") +
    ground(140, "#6f8a52") +
    // 高架橋(ヴェウ・ジ・ノイヴァ)
    `<g fill="#9a9488"><rect x="140" y="150" width="6" height="40"/><rect x="170" y="150" width="6" height="40"/><rect x="200" y="150" width="6" height="40"/></g>` +
    `<rect x="130" y="146" width="86" height="6" fill="#8a8478"/>` +
    steamLoco(150, 146, 60) +
    // バヘアードの土鍋(手前)
    `<g><ellipse cx="330" cy="200" rx="20" ry="8" fill="#8a5a3a"/><rect x="316" y="182" width="28" height="20" rx="4" fill="#a8624a"/></g>`,

  /** クリチバ専用。チューブ型バス停と欧州系移民の街並み。 */
  curitiba:
    sky("#8fc4e8", "#cfe4f0", 140) +
    clouds(300, 24, 0.9) +
    hills(138, "#5f7f4a") +
    ground(140, "#6f8a52") +
    // チューブ型バス停(BRT)
    `<rect x="60" y="160" width="60" height="30" rx="15" fill="#e8443f"/>` +
    `<rect x="70" y="166" width="40" height="18" fill="#bfe8f4" opacity=".8"/>` +
    `<g><rect x="150" y="176" width="120" height="16" rx="2" fill="#f5b31c"/><circle cx="164" cy="196" r="6" fill="#241a10"/><circle cx="256" cy="196" r="6" fill="#241a10"/></g>` +
    // 植物園の温室(右)
    `<path d="M310,178a30,20 0 0 1 60,0z" fill="#bfe8f4" opacity=".8"/>` +
    `<rect x="300" y="178" width="80" height="8" fill="#7f8896"/>` +
    `<g stroke="#4a4a52" stroke-width="1" opacity=".7"><path d="M312,178v20M330,172v26M348,172v26M366,178v20"/></g>` +
    // 緑あふれる並木道(クリチバの緑化都市計画を思わせる)
    roundTree(40, 200, 14) +
    roundTree(20, 202, 10) +
    roundTree(130, 202, 11) +
    roundTree(140, 204, 8) +
    // ポーランド・ウクライナ系の木造家屋(左奥)
    `<g fill="#e8dcc0"><rect x="20" y="150" width="24" height="14"/></g>` +
    `<path d="M18,150h28l-5,-8h-18z" fill="#8a4a3a"/>`,

  /** イグアス専用。滝とイタイプダム。 */
  iguazu:
    sky("#8fc4e8", "#dbe6e0", 110) +
    clouds(90, 26, 1) +
    hills(108, "#2f8a4a", 6) +
    ground(110, "#2f8a4a") +
    // 滝(中央〜右)
    `<path d="M180,110v70M210,104v76M240,110v70M270,116v64" stroke="#f6efe2" stroke-width="10" stroke-linecap="round" opacity=".9"/>` +
    `<ellipse cx="230" cy="186" rx="90" ry="14" fill="#bfe8f4" opacity=".8"/>` +
    // イタイプダム(手前・右)
    `<rect x="320" y="160" width="70" height="24" fill="#9a9488"/>` +
    `<g fill="#7a7468"><rect x="326" y="164" width="8" height="16"/><rect x="342" y="164" width="8" height="16"/><rect x="358" y="164" width="8" height="16"/><rect x="374" y="164" width="8" height="16"/></g>` +
    roundTree(30, 202, 16) +
    roundTree(60, 204, 12),

  /** セーラ・ガウーシャ(ブルメナウ・グラマード・ベント・ゴンサウヴィス)。 */
  serragaucha:
    sky("#8fc4e8", "#cfe4f0", 130) +
    clouds(320, 26, 1) +
    hills(128, "#5f7f4a", 5) +
    ground(130, "#6f8a52") +
    halfTimberHouse(50, 190, 50, 42) +
    halfTimberHouse(110, 194, 40, 36) +
    // ブドウ畑の畝(右)
    rows(230, 176, 150, 4, 8, "#7fa8c4") +
    shrubRow(230, 200, 8, 20, 5, "#5f8f3a") +
    araucaria(370, 204, 26),

  /** ポルトアレグレ専用。ラグーンの河岸。 */
  portoalegre:
    sky("#8fc4e8", "#cfe4f0", 120) +
    clouds(300, 26, 1) +
    ground(120, "#6f8a52") +
    skylineBlocks([[40, 80, 22, 60], [66, 60, 26, 80], [96, 94, 20, 46]], "#8f96a0") +
    `<rect x="0" y="150" width="400" height="60" fill="#3f7fae"/>` +
    ripples(166, "#bfe8f4") +
    // 参加型予算の集会テント(手前)
    `<path d="M280,190h60l-10,-20h-40z" fill="#e8443f"/>` +
    `<rect x="290" y="190" width="40" height="4" fill="#f6efe2"/>` +
    araucaria(360, 202, 22),

  /** サンミゲル・ダス・ミソンイス専用。イエズス会伝道の廃墟。 */
  missionruins:
    sky("#e8b84a", "#f2ecd0", 130) +
    sun(60, 40, 20) +
    clouds(340, 26, 0.8) +
    ground(130, "#8a864a") +
    // 石造りの廃墟(教会の壁と窓のアーチ)
    `<g fill="#9a8a6a"><rect x="120" y="130" width="10" height="70"/><rect x="180" y="120" width="10" height="80"/><rect x="240" y="130" width="10" height="70"/><rect x="300" y="140" width="10" height="60"/></g>` +
    `<path d="M120,150q30,-20 60,0M180,140q30,-20 60,0M240,150q30,-14 60,0" fill="none" stroke="#8a7a5a" stroke-width="4"/>` +
    // 崩れた石塊(手前・散在)
    `<g fill="#8a7a5a"><rect x="100" y="192" width="16" height="10"/><rect x="340" y="188" width="18" height="12"/><rect x="360" y="196" width="14" height="8"/></g>` +
    // 十字の断片(隠れ帯を避けて左寄りに)
    `<path d="M130,110v-20M122,98h16" stroke="#8a7a5a" stroke-width="4"/>` +
    `<g fill="#7a6a4a" opacity=".7"><rect x="0" y="196" width="400" height="14"/></g>` +
    shrubRow(30, 190, 4, 14, 5, "#8a9a4a") +
    shrubRow(340, 172, 3, 12, 4, "#8a9a4a") +
    roundTree(370, 202, 12, "#7a8a3a"),
};

// ---------------------------------------------------------------------------
// 都市シンボル(28種)。鍵は cities.mjs の `mark` と対応。24×24の座標系。
// ---------------------------------------------------------------------------

export const BRAZIL_MARKS = {
  /** オペラハウスのドーム。マナウス専用。 */
  operahouse:
    `<path d="M4,17a8,5 0 0 1 16,0z" fill="#3f8fc4"/>` +
    `<rect x="6" y="17" width="12" height="5" fill="#f6efe2"/>` +
    `<rect x="10" y="9" width="4" height="5" fill="#e8b84a"/>`,

  /** 露店・市場の屋根。ベレン専用。 */
  market:
    `<path d="M3,12h18l-2,-5h-14z" fill="#e8443f"/>` +
    `<rect x="5" y="12" width="14" height="8" fill="#f6efe2"/>` +
    `<g fill="#3f8f5a"><circle cx="9" cy="16" r="1.6"/><circle cx="13" cy="16" r="1.6"/><circle cx="17" cy="16" r="1.6"/></g>`,

  /** 起重機と船。サンタレン専用。 */
  riverport:
    `<rect x="10" y="4" width="2" height="14" fill="#e8443f"/>` +
    `<rect x="10" y="4" width="9" height="2" fill="#e8443f"/>` +
    `<path d="M2,18h20l-3,4H5z" fill="#3f7f9f"/>`,

  /** 牛の頭を模した山車の角。パリンチンス専用。 */
  boiband:
    `<path d="M4,18c0,-9 16,-9 16,0z" fill="#e8443f"/>` +
    `<path d="M6,10l-4,-6M18,10l4,-6" stroke="#f6efe2" stroke-width="2"/>` +
    `<circle cx="9" cy="13" r="1.6" fill="#f6efe2"/><circle cx="15" cy="13" r="1.6" fill="#f6efe2"/>`,

  /** 錆びた線路。ポルトヴェーリョ専用。 */
  oldrail:
    `<path d="M2,20h20" stroke="#7a5f4a" stroke-width="2.4"/>` +
    `<g fill="#5a4630"><rect x="4" y="17" width="3" height="5"/><rect x="11" y="17" width="3" height="5"/><rect x="18" y="17" width="3" height="5"/></g>` +
    `<path d="M4,12q6,-4 12,0" fill="none" stroke="#2f6b3a" stroke-width="2"/>`,

  /** 起重機と船。北部の川港(リオブランコ・ボア・ヴィスタ)。 */
  port:
    `<rect x="10" y="4" width="2" height="14" fill="#e8443f"/>` +
    `<rect x="10" y="4" width="9" height="2" fill="#e8443f"/>` +
    `<path d="M2,18h20l-3,4H5z" fill="#2f6ea8"/>`,

  /** 赤道のモニュメント。マカパー専用。 */
  equator:
    `<path d="M2,12h20" stroke="#e8443f" stroke-width="2" stroke-dasharray="3,2"/>` +
    `<rect x="10" y="8" width="4" height="10" fill="#c8ccc4"/>` +
    `<path d="M8,8h8l-4,-6z" fill="#f5b31c"/>`,

  /** 鉱山の山と起重機。マラバー専用。 */
  mining:
    `<path d="M2,20L9,8L14,14L17,10L22,20z" fill="#a8624a"/>` +
    `<rect x="16" y="4" width="2" height="10" fill="#4a4a52"/><rect x="16" y="4" width="6" height="2" fill="#4a4a52"/>`,

  /** カンドンブレの白いレース襟と太鼓。サルバドール専用。 */
  candomble:
    `<path d="M6,20V13q0,-7 6,-7t6,7v7z" fill="#f6efe2"/>` +
    `<circle cx="12" cy="8" r="3" fill="#d9a273"/>` +
    `<path d="M4,20h16v2H4z" fill="#e8b84a"/>`,

  /** 波と浜。北東部・南部の海辺の町。 */
  coast:
    `<path d="M2,10q5,-4 10,0t10,0" fill="none" stroke="#3f8fc4" stroke-width="1.8"/>` +
    `<path d="M2,15q5,-4 10,0t10,0" fill="none" stroke="#5b8fe8" stroke-width="1.8"/>` +
    `<path d="M2,20h20" stroke="#e8dcc0" stroke-width="4"/>`,

  /** 植民地の教会の双塔。オリンダ・サンルイス・パラチー・パラナグア。 */
  colonial:
    `<rect x="4" y="12" width="4" height="9" fill="#f6efe2"/>` +
    `<rect x="16" y="12" width="4" height="9" fill="#f6efe2"/>` +
    `<rect x="8" y="15" width="8" height="6" fill="#f6efe2"/>` +
    `<path d="M4,12l2,-4l2,4zM16,12l2,-4l2,4z" fill="#e8b84a"/>`,

  /** 砂丘とラグーン。バヘイリーニャス専用。 */
  dunes:
    `<path d="M2,20Q8,12 14,20Q18,15 22,20z" fill="#f2ecd0"/>` +
    `<ellipse cx="11" cy="19" rx="4" ry="1.6" fill="#3fc4c4"/>`,

  /** 乾いた低木と太陽。内陸乾燥地(テレジーナ・ペトロリーナ・ゴイアニア・クイアバ)。 */
  dry:
    `<circle cx="18" cy="6" r="3" fill="#f5b31c"/>` +
    `<path d="M6,20V13q0,-5 5,-5t5,5v7z" fill="#8a9a4a"/>` +
    `<path d="M2,20h10" stroke="#a8864a" stroke-width="2"/>`,

  /** モダニズム建築のアーチ。ブラジリア専用。 */
  modernist:
    `<path d="M4,20V10a8,8 0 0 1 16,0v10z" fill="#f6efe2"/>` +
    `<rect x="8" y="16" width="8" height="4" fill="#5b8fe8" opacity=".7"/>`,

  /** 湿地とカイマン。パンタナール(カンポ・グランデ・ボニート・コルンバ)。 */
  wetland:
    `<rect x="2" y="16" width="20" height="5" fill="#7fa8b0"/>` +
    `<ellipse cx="14" cy="17" rx="7" ry="2" fill="#5f7f4a"/>` +
    `<circle cx="8" cy="16.4" r="0.8" fill="#241a10"/>`,

  /** バロックの教会。オウロ・プレット・ジアマンチーナ。 */
  baroque:
    `<rect x="6" y="14" width="12" height="7" fill="#f6efe2"/>` +
    `<path d="M6,14L12,6L18,14z" fill="#f6efe2"/>` +
    `<circle cx="12" cy="11" r="1.6" fill="#e8b84a"/>`,

  /** シュガーローフとコルコバードの丘。リオデジャネイロ専用。 */
  sugarloaf:
    `<path d="M2,20Q6,10 12,12Q14,6 18,4Q22,10 22,20z" fill="#7f8f5c"/>` +
    `<path d="M18,10v-4M16,8h4" stroke="#f6efe2" stroke-width="1.4"/>`,

  /** 高原の避暑地の木組みの家。ペトロポリス・ジュイス・ジ・フォーラ。 */
  highland:
    `<rect x="5" y="14" width="14" height="7" fill="#e8dcc0"/>` +
    `<path d="M4,14h16l-8,-8z" fill="#8a4a3a"/>` +
    `<path d="M12,14v7M5,17h14" stroke="#5a4630" stroke-width="1.4"/>`,

  /** 高層ビル群。サンパウロ専用。 */
  skyline:
    `<g fill="#7f8896"><rect x="3" y="10" width="5" height="11"/><rect x="10" y="4" width="5" height="17"/><rect x="17" y="8" width="5" height="13"/></g>` +
    `<g fill="#bfe0f0" opacity=".7"><rect x="4" y="13" width="2" height="2"/><rect x="11" y="8" width="2" height="2"/><rect x="18" y="11" width="2" height="2"/></g>`,

  /** 起重機とサイロ。サントス・ヴィトーリア。 */
  seaport:
    `<rect x="4" y="10" width="6" height="11" fill="#c8ccc4"/>` +
    `<ellipse cx="7" cy="10" rx="3" ry="1.6" fill="#c8ccc4"/>` +
    `<rect x="14" y="4" width="2" height="14" fill="#e8443f"/><rect x="14" y="4" width="7" height="2" fill="#e8443f"/>`,

  /** 農地の畝と倉庫。カンピーナス・ウベルランジア。 */
  farm:
    `<rect x="12" y="12" width="10" height="9" fill="#c8ccc4"/>` +
    `<g stroke="#3f8f5a" stroke-width="2"><path d="M2,14h8M2,18h8"/></g>`,

  /** 流線型の教会屋根。ベロオリゾンチ専用。 */
  pampulha:
    `<path d="M4,20c0,-9 6,-13 8,-13s8,4 8,13z" fill="#f6efe2"/>` +
    `<rect x="8" y="14" width="8" height="6" fill="#5b8fe8" opacity=".7"/>`,

  /** 山岳鉄道の高架橋。モヘッチス専用。 */
  mountainrail:
    `<path d="M2,20L8,8L14,16L18,6L22,20z" fill="#7f9f5c"/>` +
    `<g fill="#9a9488"><rect x="9" y="16" width="2" height="5"/><rect x="14" y="16" width="2" height="5"/></g>`,

  /** チューブ型バス停。クリチバ専用。 */
  tubestation:
    `<rect x="4" y="10" width="14" height="9" rx="4.5" fill="#e8443f"/>` +
    `<rect x="7" y="13" width="8" height="4" fill="#bfe8f4"/>`,

  /** 滝。フォス・ド・イグアス専用。 */
  waterfall:
    `<path d="M4,4v10M9,3v11M14,4v10M19,5v9" stroke="#f6efe2" stroke-width="2.2" stroke-linecap="round"/>` +
    `<ellipse cx="12" cy="18" rx="10" ry="3" fill="#bfe8f4"/>`,

  /** 半木骨造の家。南部の欧州系移民町(ブルメナウ・グラマード・ベント・ゴンサウヴィス)。 */
  european:
    `<rect x="5" y="13" width="14" height="8" fill="#e8dcc0"/>` +
    `<path d="M4,13h16l-8,-7z" fill="#8a4a3a"/>` +
    `<path d="M12,13v8M5,17h14" stroke="#5a4630" stroke-width="1.4"/>`,

  /** ラグーンの河岸。ポルトアレグレ専用。 */
  riverfront:
    `<rect x="2" y="15" width="20" height="6" fill="#3f7fae"/>` +
    `<g fill="#7f8896"><rect x="6" y="7" width="3" height="8"/><rect x="12" y="4" width="3" height="11"/><rect x="18" y="9" width="3" height="6"/></g>`,

  /** 廃墟のアーチ。サンミゲル・ダス・ミソンイス専用。 */
  missionruins:
    `<path d="M4,21V13q4,-6 8,-6t8,6v8z" fill="none" stroke="#9a8a6a" stroke-width="2.4"/>` +
    `<rect x="2" y="19" width="20" height="2" fill="#7a6a4a"/>`,
};
