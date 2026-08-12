/**
 * モロッコの都市イラスト。
 *
 * `MOROCCO_MARKS` は24×24の座標系に描くシンボル、`MOROCCO_BG` は400×210の
 * 座標系に描く背景シーン(いずれもSVG断片の文字列)。イタリア・韓国と同じく
 * 最初から文字列として持つ。動きは含めない(アニメーションはReact側で重ねる)。
 *
 * 色は他の盤面と揃える。空 #8fc4e8〜#20364a、地面の緑 #2f4a33、
 * 顔・白 #f6efe2、強調 #f5b31c(金)/#e8443f(赤)/#5b8fe8(青)。
 * モロッコらしさは **ジェリージュ(モザイクタイル)の青 #1a5a9c(マジョレル・ブルー寄り)・
 * 日干し煉瓦の赤茶 #b5502f・砂の色 #e0bb70・杉の濃緑 #4f6a42・
 * 大西洋の青 #1a5a78〜#2a7898**(いずれも geography.mjs の海の色と揃えてある)で出す。
 *
 * 鍵は `cities.mjs` の `mark` / `bg` と一対一で対応する(同じキー名)。
 * 増やすときは両方を揃えること。**現在は5都市プレビュー分のみ実装。**
 * 残りの都市を足すときはこのファイルにキーを追加する。
 *
 * **背景SVGの中央25%(x=151〜249 / y=54〜152)は都市シンボルに隠れて
 * 見えない。** 見せたい細部は左右3分の1と手前(y>170)に置く。
 * `sky()` は必ず第3引数(次に来る塗りの開始y)を渡すこと。渡し忘れると
 * 空と地面のあいだに塗り残しの帯ができる(ibaraki・韓国・イタリアで実際に起きた)。
 */

// ---------------------------------------------------------------------------
// 背景シーンの組み立て部品(汎用)
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

function gull(x, y, scale = 1) {
  const w = 8 * scale;
  return `<path d="M${r1(x - w)},${y}q${r1(w / 2)},-6 ${w},0q${r1(w / 2)},-6 ${w},0" fill="none" stroke="#4a4a52" stroke-width="1.4"/>`;
}

/** 波の反射線・水面。 */
function ripples(y, color = "#bfe8f4") {
  return `<g stroke="${color}" stroke-width="2" opacity=".7" fill="none"><path d="M26,${y}h74M176,${y + 12}h92M108,${y + 24}h62"/></g>`;
}

/**
 * モロッコらしい馬蹄形アーチの入口。ジェリージュのタイル張りをふちに添える。
 */
function horseshoeArch(x, base, w, h, wallFill, archFill) {
  const rx = w / 2;
  return (
    `<rect x="${r1(x - w * 0.6)}" y="${r1(base - h)}" width="${r1(w * 1.2)}" height="${h}" fill="${wallFill}"/>` +
    `<path d="M${r1(x - rx)},${base}v-${r1(h * 0.45)}a${rx},${rx} 0 1 1 ${r1(w)},0v${r1(h * 0.45)}z" fill="${archFill}"/>` +
    `<path d="M${r1(x - rx)},${base}v-${r1(h * 0.45)}a${rx},${rx} 0 1 1 ${r1(w)},0v${r1(h * 0.45)}" fill="none" stroke="#1a5a9c" stroke-width="2"/>`
  );
}

/** ジェリージュ(モザイクタイル)の帯。菱形を並べる。 */
function zellige(x, y, count, size, colors = ["#1a5a9c", "#f5b31c", "#e8443f"]) {
  const parts = [];
  for (let i = 0; i < count; i++) {
    const cx = x + i * size;
    const c = colors[i % colors.length];
    parts.push(
      `<path d="M${r1(cx)},${r1(y - size / 2)}L${r1(cx + size / 2)},${y}L${r1(cx)},${r1(y + size / 2)}L${r1(cx - size / 2)},${y}z" fill="${c}"/>`,
    );
  }
  return `<g>${parts.join("")}</g>`;
}

/** ミナレット(四角い塔、モロッコ様式)。遠景用にシルエットで置く。 */
function minaret(x, base, h, fill = "#c9a877") {
  const w = h * 0.22;
  return (
    `<rect x="${r1(x - w / 2)}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${fill}"/>` +
    `<rect x="${r1(x - w * 0.65)}" y="${r1(base - h - w * 0.4)}" width="${r1(w * 1.3)}" height="${r1(w * 0.4)}" fill="${fill}"/>` +
    `<path d="M${r1(x - w * 0.3)},${r1(base - h - w * 0.4)}L${x},${r1(base - h - w * 1.1)}L${r1(x + w * 0.3)},${r1(base - h - w * 0.4)}z" fill="${fill}"/>`
  );
}

/** カスバ(日干し煉瓦の要塞)の角塔。 */
function kasbahTower(x, base, w, h, fill = "#b5502f") {
  return (
    `<rect x="${r1(x - w / 2)}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${fill}"/>` +
    `<g fill="${fill}" opacity=".9">${Array.from({ length: 4 })
      .map((_, i) => `<rect x="${r1(x - w / 2 + (i * w) / 4)}" y="${r1(base - h - 6)}" width="${r1(w / 8)}" height="6"/>`)
      .join("")}</g>`
  );
}

/** 砂丘の稜線。 */
function dune(x, y, w, h, fill) {
  return `<path d="M${r1(x - w / 2)},${y}q${r1(w * 0.3)},${-h} ${r1(w * 0.55)},${-h * 0.7}q${r1(w * 0.3)},${h * 0.35} ${r1(w * 0.45)},${h * 0.3}v${r1(h * 0.4 + 10)}h${-w}z" fill="${fill}"/>`;
}

/** ラクダの隊列(シルエット)。 */
function camel(x, base, scale = 1) {
  const s = scale;
  return (
    `<g fill="#5a4530" opacity=".9" transform="translate(${r1(x)},${r1(base)}) scale(${s})">` +
    `<path d="M-14,0c-2,-10 4,-14 8,-10c2,-6 8,-10 12,-4c4,-2 8,0 8,4c4,0 6,4 4,8c2,4 -2,8 -6,6c-2,4 -8,4 -10,0c-6,2 -14,0 -16,-4z"/>` +
    `<line x1="-10" y1="0" x2="-10" y2="10" stroke="#5a4530" stroke-width="2.4"/>` +
    `<line x1="-2" y1="0" x2="-2" y2="10" stroke="#5a4530" stroke-width="2.4"/>` +
    `<line x1="8" y1="0" x2="8" y2="10" stroke="#5a4530" stroke-width="2.4"/>` +
    `</g>`
  );
}

/** 杉(中部アトラスの針葉樹)。 */
function cedarTree(x, base, h, fill = "#4f6a42") {
  return (
    `<rect x="${r1(x - 1.6)}" y="${r1(base - 6)}" width="3.2" height="6" fill="#5a4630"/>` +
    `<path d="M${r1(x - h * 0.32)},${base - 6}L${x},${r1(base - h)}L${r1(x + h * 0.32)},${base - 6}z" fill="${fill}"/>` +
    `<path d="M${r1(x - h * 0.24)},${r1(base - h * 0.55)}L${x},${r1(base - h * 0.85)}L${r1(x + h * 0.24)},${r1(base - h * 0.55)}z" fill="${fill}"/>`
  );
}

/** 大砲(要塞の砲門)。 */
function cannon(x, y, len, fill = "#4a4a52") {
  return `<rect x="${r1(x)}" y="${r1(y - 4)}" width="${len}" height="8" rx="3" fill="${fill}"/>`;
}

/** ナツメヤシ。オアシスの木。 */
function palmTree(x, base, h, fill = "#5a9a4a") {
  const fronds = [-1, -0.5, 0, 0.5, 1].map((t) => {
    const dx = t * h * 0.42;
    return `<path d="M${x},${r1(base - h)}Q${r1(x + dx * 0.6)},${r1(base - h - h * 0.16)} ${r1(x + dx)},${r1(base - h + h * 0.12)}" fill="none" stroke="${fill}" stroke-width="3.4" stroke-linecap="round"/>`;
  });
  return (
    `<rect x="${r1(x - 2)}" y="${r1(base - h)}" width="4" height="${h}" fill="#8a6a3f"/>` +
    fronds.join("")
  );
}

/** 滝(段になって落ちる水)。 */
function waterfall(x, top, h, w = 14, fill = "#bfe8f4") {
  return `<path d="M${r1(x - w / 2)},${top}h${w}l-3,${h}h-${w - 6}z" fill="${fill}" opacity=".9"/>`;
}

/** ラバ(荷を積んだ)。 */
function mule(x, base, scale = 1) {
  return (
    `<g fill="#7a6650" transform="translate(${r1(x)},${r1(base)}) scale(${scale})">` +
    `<rect x="-10" y="-10" width="20" height="10" rx="4"/>` +
    `<rect x="6" y="-16" width="8" height="8" rx="2"/>` +
    `<rect x="-9" y="0" width="3" height="8"/><rect x="5" y="0" width="3" height="8"/>` +
    `<rect x="-6" y="-14" width="10" height="6" fill="#c9922f"/>` +
    `</g>`
  );
}

/** コウノトリの巣(塔の上)。 */
function storkNest(x, y, r = 6) {
  return (
    `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 0.55}" fill="#7a6040"/>` +
    `<path d="M${r1(x - 2)},${r1(y - 3)}q2,-8 0,-12" fill="none" stroke="#f6efe2" stroke-width="2"/>` +
    `<circle cx="${r1(x - 2)}" cy="${r1(y - 16)}" r="2.4" fill="#f6efe2"/>`
  );
}

/** アール・デコの建物正面(段状の縦線)。 */
function artDecoFacade(x, base, w, h, fill = "#e8dcc0") {
  return (
    `<rect x="${r1(x)}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${fill}"/>` +
    `<rect x="${r1(x + w * 0.35)}" y="${r1(base - h - h * 0.22)}" width="${r1(w * 0.3)}" height="${r1(h * 0.22)}" fill="${fill}"/>` +
    `<g stroke="#c8b898" stroke-width="1.6">${Array.from({ length: 4 })
      .map((_, i) => `<line x1="${r1(x + (i + 1) * (w / 5))}" y1="${r1(base - h)}" x2="${r1(x + (i + 1) * (w / 5))}" y2="${base}"/>`)
      .join("")}</g>`
  );
}

/** 陶工のろくろと窯。 */
function potteryKiln(x, base, r = 14, fill = "#b5502f") {
  return (
    `<path d="M${r1(x - r)},${base}a${r},${r * 1.3} 0 0 1 ${r * 2},0z" fill="${fill}"/>` +
    `<rect x="${r1(x - 3)}" y="${r1(base - r * 0.5)}" width="6" height="${r * 0.5}" fill="#4a3c2e"/>`
  );
}

/** 複葉機のシルエット。 */
function biplane(x, y, scale = 1) {
  return (
    `<g fill="#e8dcc0" stroke="#4a3c2e" stroke-width="1.2" transform="translate(${r1(x)},${r1(y)}) scale(${scale})">` +
    `<rect x="-14" y="-2" width="28" height="4" rx="2"/>` +
    `<rect x="-10" y="-9" width="20" height="3.4" rx="1.6"/>` +
    `<rect x="-2" y="-9" width="3" height="8"/>` +
    `<path d="M12,-1l8,-5v10z"/>` +
    `</g>`
  );
}

/** 渓谷の切り立った崖(左右一対)。 */
function gorgeCliffs(baseY, topY, fill = "#9c7a52") {
  return (
    `<path d="M0,${baseY}L60,${topY}L110,${baseY + 10}L70,${baseY}z" fill="${fill}"/>` +
    `<path d="M400,${baseY}L340,${topY}L290,${baseY + 10}L330,${baseY}z" fill="${fill}"/>`
  );
}

/** 丸い樹冠の広葉樹(オリーブ・クルミなど)。 */
function roundTree(x, base, r, crown = "#7fae5a", trunk = "#6b5330") {
  const th = r1(r * 1.1);
  return (
    `<rect x="${r1(x - r * 0.16)}" y="${r1(base - th - r * 0.3)}" width="${r1(r * 0.32)}" height="${r1(th + r * 0.3)}" fill="${trunk}"/>` +
    `<circle cx="${x}" cy="${r1(base - th - r * 0.5)}" r="${r}" fill="${crown}"/>`
  );
}

/** オレンジ(柑橘)の木。丸い樹冠に黄色い実の点。 */
function citrusTree(x, base, r) {
  return (
    roundTree(x, base, r, "#4f8f4f") +
    `<g fill="#f4c430">${Array.from({ length: 4 })
      .map((_, i) => {
        const a = (i / 4) * Math.PI * 2 + 0.4;
        return `<circle cx="${r1(x + Math.cos(a) * r * 0.55)}" cy="${r1(base - r * 1.4 + Math.sin(a) * r * 0.55)}" r="1.8"/>`;
      })
      .join("")}</g>`
  );
}

/** 列柱(ローマ・イスラム様式)。等間隔に並べる。 */
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

/** アーチの列(貯水槽・アーケード・水道橋)。 */
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

// ---------------------------------------------------------------------------
// mark(24×24)
// ---------------------------------------------------------------------------

export const MOROCCO_MARKS = {
  /** シェフシャウエン: 青く塗られた壁と階段の路地。 */
  bluewalls: `
    <rect width="24" height="24" fill="#dfeaf2"/>
    <rect x="2" y="6" width="8" height="16" fill="#2a6fa8"/>
    <rect x="10" y="6" width="12" height="16" fill="#1a5a9c"/>
    <path d="M14,22v-8a3,3 0 0 1 6,0v8z" fill="#dfeaf2"/>
    <rect x="3" y="9" width="4" height="4" fill="#5b8fe8"/>
  `,
  /** フェズ: 円形のなめし桶(染料の色違い)。 */
  tannery: `
    <rect width="24" height="24" fill="#e8dcc0"/>
    <circle cx="7" cy="16" r="4" fill="#c9922f"/>
    <circle cx="14" cy="17" r="3.4" fill="#b5502f"/>
    <circle cx="19" cy="14" r="3" fill="#8a9a3f"/>
    <circle cx="10" cy="11" r="3" fill="#1a5a9c"/>
  `,
  /** イフレン: 赤い三角屋根のシャレーと杉。 */
  chalet: `
    <rect width="24" height="24" fill="#cfe4f0"/>
    <rect x="7" y="14" width="10" height="8" fill="#e8dcc0"/>
    <path d="M5,14L12,6L19,14z" fill="#b5502f"/>
    <rect x="2" y="10" width="3" height="12" fill="#4f6a42"/>
  `,
  /** エッサウィラ: 海に向いた稜堡と大砲。 */
  skala: `
    <rect width="24" height="24" fill="#bfe0f0"/>
    <rect x="1" y="14" width="22" height="8" fill="#c9a877"/>
    <rect x="3" y="9" width="4" height="6" fill="#c9a877"/>
    <rect x="9" y="9" width="4" height="6" fill="#c9a877"/>
    <rect x="15" y="9" width="4" height="6" fill="#c9a877"/>
    <rect x="7" y="17" width="8" height="3" rx="1.4" fill="#4a4a52"/>
  `,
  /** メルズーガ: サハラの砂丘と太陽。 */
  dunes: `
    <rect width="24" height="24" fill="#f2c96b"/>
    <circle cx="19" cy="6" r="3" fill="#f5b31c"/>
    <path d="M0,22q6,-10 12,-4q4,-4 12,-2v6z" fill="#e0bb70"/>
    <path d="M0,22q4,-6 8,-3q3,-3 7,-1v4z" fill="#c9922f"/>
  `,
  /** タンジェ: 海峡を見下ろす岬と灯台。 */
  strait: `
    <rect width="24" height="24" fill="#8fc4e8"/>
    <path d="M0,24V14c6,-6 18,-6 24,0v10z" fill="#c9a877"/>
    <rect x="10" y="4" width="4" height="10" fill="#f6efe2"/>
    <path d="M9,4h6l-3,-4z" fill="#e8443f"/>
    <circle cx="12" cy="6" r="1.4" fill="#f5b31c"/>
  `,
  /** テトゥアン・アシラ: 白壁と鍛鉄バルコニー。 */
  andalou: `
    <rect width="24" height="24" fill="#dfeaf2"/>
    <rect x="3" y="4" width="18" height="20" fill="#f2f0e8"/>
    <rect x="6" y="12" width="12" height="7" fill="#5b8fe8" opacity=".3"/>
    <g stroke="#3a3a3a" stroke-width="1"><line x1="6" y1="19" x2="18" y2="19"/><line x1="7" y1="19" x2="7" y2="22"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="17" y1="19" x2="17" y2="22"/></g>
    <path d="M9,12v-3a3,3 0 0 1 6,0v3z" fill="#f2f0e8" stroke="#3a3a3a" stroke-width="0.8"/>
  `,
  /** アル・ホセイマ・ナドール: 湾と岩礁。 */
  bayrock: `
    <rect width="24" height="24" fill="#8fc4e8"/>
    <path d="M0,24V16c8,4 16,4 24,0v8z" fill="#2a7898"/>
    <path d="M15,15c-2,-4 3,-6 4,-2c2,-1 3,3 0,4z" fill="#9c7a52"/>
    <path d="M5,20c4,-6 10,-6 14,-1v5H5z" fill="#c9a877"/>
  `,
  /** ラルシュ: 塔の上のコウノトリの巣。 */
  storks: `
    <rect width="24" height="24" fill="#cfe4f0"/>
    <rect x="9" y="10" width="6" height="14" fill="#c9a877"/>
    <ellipse cx="12" cy="9" rx="6" ry="3" fill="#7a6040"/>
    <path d="M10,7q2,-6 0,-9" fill="none" stroke="#f6efe2" stroke-width="1.6"/>
    <circle cx="10" cy="-1" r="1.6" fill="#f6efe2"/>
  `,
  /** ラバト: 途中で止まったハッサンの塔。 */
  hassantower: `
    <rect width="24" height="24" fill="#8fc4e8"/>
    <rect x="8" y="9" width="8" height="15" fill="#c9a877"/>
    <rect x="10" y="5" width="4" height="4" fill="#c9a877" opacity=".7"/>
    <rect x="2" y="17" width="3" height="7" fill="#e8e0cc"/>
    <rect x="19" y="17" width="3" height="7" fill="#e8e0cc"/>
  `,
  /** カサブランカ・ケニトラ・モハメディア: アール・デコの正面。 */
  artdeco: `
    <rect width="24" height="24" fill="#cfe4f0"/>
    <rect x="4" y="8" width="16" height="16" fill="#e8dcc0"/>
    <rect x="9" y="2" width="6" height="6" fill="#e8dcc0"/>
    <g stroke="#c8b898" stroke-width="1"><line x1="9" y1="8" x2="9" y2="24"/><line x1="15" y1="8" x2="15" y2="24"/></g>
  `,
  /** エルジャディダ: 地下貯水槽と一筋の光。 */
  cistern: `
    <rect width="24" height="24" fill="#3a4a3a"/>
    <path d="M8,2v4l4,4l4,-4v-4z" fill="#f5b31c" opacity=".7"/>
    <ellipse cx="12" cy="18" rx="9" ry="4" fill="#2a7898"/>
    <ellipse cx="12" cy="18" rx="4" ry="1.6" fill="#f6efe2" opacity=".6"/>
  `,
  /** サフィ: ろくろと壺。 */
  pottery: `
    <rect width="24" height="24" fill="#e8dcc0"/>
    <path d="M9,22c-2,-6 0,-10 3,-10c3,0 5,4 3,10z" fill="#1a5a9c"/>
    <ellipse cx="12" cy="22" rx="6" ry="2" fill="#8a5a34"/>
    <ellipse cx="12" cy="12" rx="4" ry="1.4" fill="#f5b31c"/>
  `,
  /** アガディール: 新しい海辺のリゾート。 */
  resort: `
    <rect width="24" height="24" fill="#8fc4e8"/>
    <rect y="16" width="24" height="8" fill="#2a7898"/>
    <rect x="4" y="6" width="8" height="16" fill="#f2f0e8"/>
    <rect x="14" y="10" width="6" height="12" fill="#e8dcc0"/>
    <circle cx="20" cy="6" r="2.6" fill="#5a9a4a"/>
    <rect x="19.2" y="8" width="1.6" height="8" fill="#8a6a3f"/>
  `,
  /** メクネス: 大きな馬蹄形の門。 */
  grandgate: `
    <rect width="24" height="24" fill="#e8dcc0"/>
    <rect x="2" y="4" width="20" height="20" fill="#b5502f"/>
    <path d="M8,24v-8a4,4 0 0 1 8,0v8z" fill="#e8dcc0"/>
    <rect x="4" y="6" width="16" height="2" fill="#1a5a9c"/>
  `,
  /** マラケシュ: クトゥビアの尖塔。 */
  koutoubia: `
    <rect width="24" height="24" fill="#cfe4f0"/>
    <rect x="9" y="4" width="6" height="18" fill="#e8443f"/>
    <rect x="10" y="1" width="4" height="3" fill="#f5b31c"/>
    <rect x="8" y="9" width="8" height="1.6" fill="#c9a877"/>
    <path d="M2,20c1,-3 4,-3 5,0v4H2z" fill="#5a9a4a"/>
  `,
  /** ヴォルビリス: ローマの円柱の列。 */
  romanruins: `
    <rect width="24" height="24" fill="#cfe4f0"/>
    <rect y="18" width="24" height="6" fill="#b8c26a"/>
    <rect x="3" y="8" width="3" height="10" fill="#e8e0cc"/>
    <rect x="10" y="5" width="3" height="13" fill="#e8e0cc"/>
    <rect x="17" y="10" width="3" height="8" fill="#e8e0cc"/>
  `,
  /** ベニ・メラル: 崖から落ちる湧き水。 */
  springs: `
    <rect width="24" height="24" fill="#8a9a5c"/>
    <path d="M0,0h9v24H0z" fill="#9c7a52"/>
    <path d="M7,0h4l-2,24h-2z" fill="#bfe8f4"/>
    <ellipse cx="10" cy="22" rx="6" ry="2" fill="#3f8fc4"/>
  `,
  /** アズルー: 杉の木の猿。 */
  macaques: `
    <rect width="24" height="24" fill="#cfe4f0"/>
    <path d="M4,22L12,4L20,22z" fill="#4f6a42"/>
    <circle cx="15" cy="14" r="3" fill="#6b5a42"/>
    <circle cx="13" cy="12.5" r="1.2" fill="#6b5a42"/>
    <circle cx="17" cy="12.5" r="1.2" fill="#6b5a42"/>
  `,
  /** イムリル・セッティ・ファトマ: 山とラバの道。 */
  trailhead: `
    <rect width="24" height="24" fill="#8fc4e8"/>
    <path d="M0,24L9,8L15,18L19,12L24,24z" fill="#8a8f92"/>
    <path d="M6,20L9,8L12,20" fill="none" stroke="#f6efe2" stroke-width="1.4"/>
    <rect x="3" y="20" width="4" height="4" fill="#7a6650"/>
  `,
  /** ミデルト・ベルカン: 果実のなる木。 */
  orchard: `
    <rect width="24" height="24" fill="#cfe4f0"/>
    <rect x="10.4" y="16" width="3.2" height="8" fill="#5a4630"/>
    <circle cx="12" cy="12" r="8" fill="#5a9a4a"/>
    <circle cx="8" cy="11" r="1.6" fill="#e8443f"/>
    <circle cx="14" cy="8" r="1.6" fill="#f5b31c"/>
    <circle cx="16" cy="14" r="1.6" fill="#e8443f"/>
  `,
  /** ワルザザート: カスバの塔とカチンコ。 */
  filmkasbah: `
    <rect width="24" height="24" fill="#e0bb70"/>
    <rect x="3" y="6" width="8" height="18" fill="#b5502f"/>
    <rect x="3" y="4" width="8" height="3" fill="#b5502f" opacity=".85"/>
    <rect x="14" y="14" width="9" height="6" fill="#2f241a"/>
    <rect x="14" y="12" width="9" height="3" fill="#f6efe2"/>
  `,
  /** アイット・ベン・ハドゥ: 丘に連なる土の塔。 */
  ksar: `
    <rect width="24" height="24" fill="#e0bb70"/>
    <path d="M0,24V18h24v6z" fill="#9c7a52"/>
    <rect x="3" y="10" width="4" height="8" fill="#b5502f"/>
    <rect x="9" y="6" width="5" height="12" fill="#c9622f"/>
    <rect x="16" y="11" width="4" height="7" fill="#b5502f"/>
  `,
  /** ザゴラ: ラクダと道しるべ。 */
  camelsign: `
    <rect width="24" height="24" fill="#e0bb70"/>
    <path d="M2,20c-1,-5 2,-7 4,-5c1,-3 4,-5 6,-2c2,-1 4,0 4,2c2,0 3,2 2,4c1,2 -1,4 -3,3c-1,2 -4,2 -5,0c-3,1 -7,0 -8,-2z" fill="#8a6a3f"/>
    <rect x="19" y="6" width="2" height="14" fill="#5a4630"/>
    <rect x="19" y="6" width="4" height="3" fill="#f6efe2"/>
  `,
  /** ティネリール: 切り立った渓谷。 */
  gorge: `
    <rect width="24" height="24" fill="#8fc4e8"/>
    <path d="M0,24V10l7,10V24z" fill="#9c7a52"/>
    <path d="M24,24V10l-7,10V24z" fill="#9c7a52"/>
    <rect x="10" y="18" width="4" height="6" fill="#3f8fc4"/>
  `,
  /** エルラシディア: ダムと水。 */
  dam: `
    <rect width="24" height="24" fill="#8fc4e8"/>
    <rect y="14" width="24" height="4" fill="#9c9c98"/>
    <rect y="18" width="24" height="6" fill="#3f8fc4"/>
    <rect x="2" y="8" width="4" height="6" fill="#9c9c98"/>
    <rect x="18" y="8" width="4" height="6" fill="#9c9c98"/>
  `,
  /** シディイフニ: 崖の上のアール・デコと海。 */
  artdecocoast: `
    <rect width="24" height="24" fill="#8fc4e8"/>
    <rect y="18" width="24" height="6" fill="#c9a877"/>
    <rect x="7" y="6" width="10" height="12" fill="#f2f0e8"/>
    <rect x="10" y="3" width="4" height="4" fill="#f2f0e8"/>
    <rect y="16" width="24" height="2" fill="#2a7898"/>
  `,
  /** タンタン: 遊牧民のテントとラクダレース。 */
  moussem: `
    <rect width="24" height="24" fill="#e0bb70"/>
    <path d="M4,22l7,-14l7,14z" fill="#4a3c2e"/>
    <path d="M8,22l3,-6l3,6z" fill="#2f241a"/>
    <path d="M17,10h5v3h-5z" fill="#e8443f"/>
    <line x1="20" y1="10" x2="20" y2="4" stroke="#5a4630" stroke-width="1"/>
  `,
  /** タルファヤ: 複葉機と砂丘。 */
  aeropostale: `
    <rect width="24" height="24" fill="#f2c96b"/>
    <path d="M0,22q6,-6 12,-2q4,-4 12,-1v5z" fill="#e0bb70"/>
    <rect x="3" y="9" width="14" height="2" fill="#e8dcc0"/>
    <rect x="8" y="6" width="10" height="1.8" fill="#e8dcc0"/>
    <path d="M17,10l4,-3v6z" fill="#e8dcc0"/>
  `,
  /** ウジダ: 門と閉ざされたフェンス。 */
  bordergate: `
    <rect width="24" height="24" fill="#e0bb70"/>
    <path d="M4,24v-9a4,4 0 0 1 8,0v9z" fill="#c9a877"/>
    <g stroke="#7a7a72" stroke-width="1"><line x1="14" y1="24" x2="14" y2="12"/><line x1="18" y1="24" x2="18" y2="12"/><line x1="22" y1="24" x2="22" y2="12"/><line x1="14" y1="12" x2="22" y2="12"/></g>
  `,
  /** フィギッグ: 井戸とナツメヤシ。 */
  oasis: `
    <rect width="24" height="24" fill="#e0bb70"/>
    <rect x="10.4" y="10" width="3.2" height="14" fill="#8a6a3f"/>
    <path d="M12,10Q6,8 3,14M12,10Q18,8 21,14M12,10Q7,6 5,4M12,10Q17,6 19,4" fill="none" stroke="#5a9a4a" stroke-width="2.4" stroke-linecap="round"/>
    <rect x="8" y="18" width="8" height="6" fill="#9c7a52"/>
  `,
  /** タザ: フリワト洞窟の開口部。 */
  corkoak: `
    <rect width="24" height="24" fill="#8a9a5c"/>
    <path d="M2,24V16c4,-8 16,-8 20,0v8z" fill="#c9a877"/>
    <ellipse cx="12" cy="24" rx="5" ry="8" fill="#2f241a"/>
  `,
  /** ベルカン(果樹園): orchardキーを共用。 */
};

// ---------------------------------------------------------------------------
// bg(400×210)
// ---------------------------------------------------------------------------

export const MOROCCO_BG = {
  /** シェフシャウエン: 青一色の階段路地。 */
  bluewalls: [
    sky("#8fc4e8", "#cfe4f0", 60),
    ground(60, "#2a6fa8"),
    clouds(70, 30),
    clouds(320, 45, 0.8),
    // 左手前の壁面
    `<rect x="0" y="60" width="70" height="150" fill="#3a7fb8"/>`,
    `<rect x="0" y="60" width="70" height="150" fill="none"/>`,
    horseshoeArch(35, 200, 40, 70, "#3a7fb8", "#dfeaf2"),
    zellige(6, 74, 8, 8),
    // 右奥の壁面(遠近で少し暗く)
    `<rect x="330" y="60" width="70" height="150" fill="#1a5a9c"/>`,
    horseshoeArch(365, 210, 34, 60, "#1a5a9c", "#cfe4f0"),
    // 中央の階段(手前だけ見える)
    `<g fill="#5b9fd0">${Array.from({ length: 6 })
      .map((_, i) => `<rect x="${140 - i * 8}" y="${182 - i * 6}" width="${120 + i * 16}" height="6"/>`)
      .join("")}</g>`,
    // 手前の植木鉢(左)
    `<rect x="80" y="188" width="14" height="16" fill="#b5502f"/>`,
    `<circle cx="87" cy="180" r="10" fill="#4f8f4f"/>`,
    // 手前の窓辺の鉢(右)
    `<rect x="300" y="192" width="12" height="14" fill="#b5502f"/>`,
    `<circle cx="306" cy="185" r="8" fill="#7a9a4a"/>`,
    zellige(320, 190, 6, 6, ["#f5b31c", "#dfeaf2"]),
  ].join(""),

  /** フェズ(メクネス・ヴォルビリスなど旧市街の町も使い回す): 迷路のような旧市街。 */
  medina: [
    sky("#8fc4e8", "#cfe4f0", 96),
    hills(96, "#c9a877", 3),
    ground(96, "#c9a877"),
    clouds(60, 30),
    minaret(340, 130, 70, "#e8dcc0"),
    minaret(60, 140, 50, "#c9a877"),
    // 左手前の建物群(平屋根の連なり)
    `<g fill="#d8c090">${[
      [0, 96, 60, 60],
      [55, 116, 46, 40],
      [95, 100, 40, 56],
    ]
      .map(([x, y, w, h]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}"/>`)
      .join("")}</g>`,
    horseshoeArch(60, 156, 26, 36, "#d8c090", "#4a3c2e"),
    // 右手前(なめし桶を小さく添える)
    `<g>${[
      [320, 20, "#c9922f"],
      [340, 16, "#b5502f"],
      [358, 14, "#8a9a3f"],
    ]
      .map(([cx, r, c]) => `<circle cx="${cx}" cy="${190}" r="${r}" fill="${c}"/>`)
      .join("")}</g>`,
    `<rect x="300" y="96" width="60" height="70" fill="#c9a877"/>`,
    zellige(300, 100, 8, 8, ["#1a5a9c", "#f5b31c"]),
    // 市場の日よけ(手前中央寄り、シンボルに隠れない位置)
    `<path d="M60,196l20,-14l20,14z" fill="#e8443f" opacity=".9"/>`,
    `<path d="M280,198l18,-13l18,13z" fill="#1a5a9c" opacity=".9"/>`,
    `<path d="M20,200l16,-11l16,11z" fill="#f5b31c" opacity=".85"/>`,
    // 露店の壺(手前左端)
    `<g fill="#b5502f">${[
      [30, 4],
      [40, 5],
      [48, 3.4],
    ]
      .map(([cx, r]) => `<circle cx="${cx}" cy="${206 - r}" r="${r}"/>`)
      .join("")}</g>`,
    // 香辛料の山(手前右、色違いの三角に積む)
    `<g>${[
      [340, "#e8443f"],
      [356, "#f5b31c"],
      [372, "#c9922f"],
    ]
      .map(([x, c]) => `<path d="M${x - 8},206L${x},188L${x + 8},206z" fill="${c}"/>`)
      .join("")}</g>`,
    // 窓の格子(建物の壁面に、繰り返しで密度を足す)
    `<g fill="#4a3c2e" opacity=".8">${[
      [10, 108],
      [30, 118],
      [110, 112],
    ]
      .map(([x, y]) => `<rect x="${x}" y="${y}" width="10" height="10"/>`)
      .join("")}</g>`,
    // 遠くの鳥
    `<path d="M100,66q4,-5 8,0q4,-5 8,0" fill="none" stroke="#4a4a52" stroke-width="1.4"/>`,
    `<path d="M300,60q4,-5 8,0q4,-5 8,0" fill="none" stroke="#4a4a52" stroke-width="1.4"/>`,
  ].join(""),

  /** イフレン: 杉林とシャレー、雪の残る屋根。 */
  chalet: [
    sky("#a8d0ea", "#e4f0f6", 110),
    hills(110, "#7d9e6a", 3),
    ground(110, "#e4f0f6"),
    sun(40, 34, 16),
    cedarTree(30, 190, 70),
    cedarTree(370, 196, 78),
    cedarTree(350, 176, 46),
    // 手前左のシャレー
    `<rect x="70" y="150" width="70" height="46" fill="#e8dcc0"/>`,
    `<path d="M62,150L105,108L148,150z" fill="#b5502f"/>`,
    `<path d="M62,150L105,108L148,150" fill="none" stroke="#f2f6f8" stroke-width="4" opacity=".8"/>`,
    `<rect x="92" y="168" width="14" height="28" fill="#5a4630"/>`,
    `<rect x="78" y="160" width="12" height="10" fill="#bfe0f0"/>`,
    // 手前右の小さなシャレー
    `<rect x="260" y="164" width="52" height="34" fill="#e8dcc0"/>`,
    `<path d="M254,164L286,134L318,164z" fill="#8a4020"/>`,
    `<path d="M254,164L286,134L318,164" fill="none" stroke="#f2f6f8" stroke-width="3" opacity=".8"/>`,
    // 地面の雪だまり
    `<ellipse cx="200" cy="204" rx="120" ry="10" fill="#f2f6f8" opacity=".8"/>`,
    // 煙突の煙(左のシャレー)
    `<g fill="#f6efe2" opacity=".75"><circle cx="99" cy="164" r="4"/><circle cx="102" cy="156" r="5"/><circle cx="97" cy="148" r="6"/></g>`,
    // 追加の杉(密度を足す、左右の端)
    cedarTree(392, 160, 34),
    cedarTree(6, 150, 30),
    // 柵(手前、シンボルの死角にならない下端)
    `<g stroke="#5a4630" stroke-width="3"><line x1="160" y1="206" x2="160" y2="192"/><line x1="176" y1="206" x2="176" y2="190"/><line x1="192" y1="206" x2="192" y2="192"/><line x1="150" y1="196" x2="200" y2="192"/></g>`,
    // 雪をかぶった小岩(手前左)
    `<ellipse cx="46" cy="202" rx="14" ry="7" fill="#8a8f92"/>`,
    `<ellipse cx="46" cy="198" rx="10" ry="4" fill="#f2f6f8"/>`,
  ].join(""),

  /** エッサウィラ: 海に向いた砲台と漁港。 */
  skala: [
    sky("#8fc4e8", "#cfe4f0", 100),
    band(100, 40, "#2a7898"),
    band(140, 70, "#1a5a78"),
    ripples(120),
    ripples(150, "#3a88a8"),
    gull(80, 40),
    gull(120, 30, 0.8),
    gull(300, 50, 0.9),
    // 左手前の稜堡(石壁と砲門)
    `<rect x="0" y="140" width="150" height="70" fill="#c9a877"/>`,
    `<rect x="0" y="120" width="150" height="24" fill="#d8c090"/>`,
    cannon(10, 132, 30),
    cannon(60, 132, 30),
    cannon(110, 132, 30),
    `<rect x="0" y="112" width="20" height="16" fill="#c9a877"/>`,
    `<rect x="40" y="112" width="20" height="16" fill="#c9a877"/>`,
    `<rect x="90" y="112" width="20" height="16" fill="#c9a877"/>`,
    // 右手前の漁港(小舟)
    `<path d="M280,196c-4,10 44,10 40,0z" fill="#5b8fe8"/>`,
    `<rect x="296" y="176" width="3" height="22" fill="#8a5a34"/>`,
    `<path d="M299,176l14,10h-14z" fill="#f6efe2"/>`,
    `<path d="M340,204c-3,7 33,7 30,0z" fill="#4a7bd0"/>`,
    // 沖の小島(紫の染料の島、シンボルに隠れない右寄りへ)
    `<ellipse cx="280" cy="118" rx="18" ry="6" fill="#8a9a5c"/>`,
    kasbahTower(280, 112, 8, 14, "#c9a877"),
    // 追加のかもめ・波紋(密度を足す)
    gull(200, 24, 0.7),
    gull(40, 60, 0.6),
    ripples(178, "#245f78"),
    // 干している漁網(左手前)
    `<g stroke="#e8dcc0" stroke-width="1.4" opacity=".8"><path d="M4,150v40M14,150v40M24,150v40M4,160h20M4,172h20M4,184h20"/></g>`,
    // 稜堡の胸壁(繰り返しの凹凸)
    `<g fill="#d8c090">${Array.from({ length: 8 })
      .map((_, i) => `<rect x="${i * 20}" y="106" width="10" height="8"/>`)
      .join("")}</g>`,
    // 流木(手前右端)
    `<rect x="360" y="200" width="30" height="4" rx="2" fill="#5a4630" transform="rotate(-8 375 202)"/>`,
  ].join(""),

  /** メルズーガ: エルグ・シェビの砂丘とラクダの隊列。 */
  dunes: [
    sky("#f2c96b", "#f6e0a0", 90),
    sun(340, 40, 22, "#f5b31c"),
    ground(90, "#f6e0a0"),
    dune(80, 150, 220, 60, "#e0bb70"),
    dune(260, 170, 240, 70, "#d8ac5a"),
    dune(30, 190, 180, 50, "#c9922f"),
    // 手前のテント(左)
    `<path d="M40,208l30,-40l30,40z" fill="#4a3c2e"/>`,
    `<path d="M55,208l15,-20l15,20z" fill="#2f241a"/>`,
    // ラクダの隊列(右手前、シンボルの死角を避けて配置)
    camel(300, 196, 1.1),
    camel(330, 200, 0.9),
    camel(355, 204, 0.75),
    // 足跡
    `<g fill="#c9922f" opacity=".6">${Array.from({ length: 5 })
      .map((_, i) => `<ellipse cx="${290 - i * 14}" cy="${206 + (i % 2)}" rx="2.4" ry="1.4"/>`)
      .join("")}</g>`,
    // 稜線に並ぶ小さな灌木(密度を足す、左右の端)
    `<g fill="#7a8f4a">${[
      [12, 200],
      [26, 204],
      [370, 198],
      [386, 202],
    ]
      .map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="4" ry="3"/>`)
      .join("")}</g>`,
    // 遠くの隊商(尾根の上、シンボルの死角にならない位置)
    camel(60, 148, 0.5),
    camel(72, 150, 0.45),
    // 砂丘の縞模様(風紋)
    `<g stroke="#c9922f" stroke-width="1.2" opacity=".5" fill="none"><path d="M40,166q40,-8 80,0M20,180q50,-8 100,0"/></g>`,
    // 遠くの鷲(空)
    `<path d="M100,50q4,-5 8,0q4,-5 8,0" fill="none" stroke="#4a3c2e" stroke-width="1.4"/>`,
  ].join(""),

  /** タンジェ: 岬から見る海峡、大西洋と地中海の境目。 */
  strait: [
    sky("#8fc4e8", "#cfe4f0", 100),
    band(100, 30, "#2a7898"), // 地中海側(右)の帯
    band(100, 30, "#1a5a78"), // 重ねて塗り分けの土台
    `<path d="M200,100v30h200v-30z" fill="#2a7898"/>`,
    `<path d="M0,100v30h200v-30z" fill="#1a5a78"/>`,
    `<line x1="200" y1="100" x2="200" y2="130" stroke="#f6efe2" stroke-width="1" opacity=".5"/>`,
    ground(130, "#c9a877"),
    ripples(112, "#3a88a8"),
    gull(60, 40),
    gull(340, 30, 0.8),
    gull(120, 60, 0.7),
    // 手前の崖と灯台(スパルテル岬)
    `<path d="M0,210V150c20,-10 50,-10 70,0v60z" fill="#c9a877"/>`,
    `<rect x="28" y="120" width="8" height="34" fill="#f6efe2"/>`,
    `<path d="M26,120h12l-6,-8z" fill="#e8443f"/>`,
    `<circle cx="32" cy="126" r="2.4" fill="#f5b31c"/>`,
    // 対岸のシルエット(スペイン海岸、遠く小さく)
    `<path d="M320,132c20,-6 50,-6 70,0v6H320z" fill="#8a9a5c" opacity=".7"/>`,
    // 沖の貨物船
    `<rect x="240" y="118" width="34" height="8" fill="#4a4a52"/>`,
    `<rect x="252" y="110" width="10" height="8" fill="#4a4a52"/>`,
    // 手前の岩と草
    `<ellipse cx="80" cy="200" rx="16" ry="6" fill="#9c7a52"/>`,
    `<g fill="#7a8f4a">${[[10, 195], [95, 202], [20, 205]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="4" ry="3"/>`).join("")}</g>`,
    // 崖の階段(灯台への道)
    `<g fill="#e8dcc0">${Array.from({ length: 5 }).map((_, i) => `<rect x="${44 + i * 4}" y="${188 - i * 6}" width="10" height="4"/>`).join("")}</g>`,
    // 手前の帆船(小さく、遠くの海面)
    `<path d="M110,150c-2,5 18,5 16,0z" fill="#4a7bd0"/>`,
    `<line x1="118" y1="150" x2="118" y2="138" stroke="#5a4630" stroke-width="1"/>`,
    `<path d="M118,138l7,6h-7z" fill="#f6efe2"/>`,
    // 手前右の岩場
    `<ellipse cx="360" cy="204" rx="20" ry="6" fill="#9c7a52"/>`,
    `<g fill="#7a8f4a">${[[340, 200], [378, 202]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="4" ry="3"/>`).join("")}</g>`,
  ].join(""),

  /** テトゥアン・アシラ・ラルシュ: 白壁の路地と鍛鉄バルコニー。 */
  andalou: [
    sky("#8fc4e8", "#cfe4f0", 70),
    ground(70, "#f2f0e8"),
    clouds(60, 30),
    // 左手前の白壁の建物
    `<rect x="0" y="70" width="140" height="140" fill="#f2f0e8"/>`,
    `<rect x="20" y="110" width="60" height="30" fill="#5b8fe8" opacity=".35"/>`,
    `<g stroke="#3a3a3a" stroke-width="2"><line x1="20" y1="140" x2="80" y2="140"/><line x1="30" y1="140" x2="30" y2="150"/><line x1="50" y1="140" x2="50" y2="150"/><line x1="70" y1="140" x2="70" y2="150"/></g>`,
    horseshoeArch(40, 210, 34, 60, "#f2f0e8", "#c9622f"),
    zellige(10, 84, 8, 8),
    // 右手前の建物(タイルの中庭がのぞく)
    `<rect x="270" y="70" width="130" height="140" fill="#e8e0cc"/>`,
    `<rect x="300" y="150" width="60" height="60" fill="#1a5a9c" opacity=".2"/>`,
    zellige(300, 190, 6, 8, ["#1a5a9c", "#f5b31c", "#e8443f"]),
    // 中央のオレンジの木
    citrusTree(200, 200, 26),
    // 手前の鉢植え
    `<rect x="150" y="196" width="12" height="14" fill="#b5502f"/>`,
    `<circle cx="156" cy="188" r="8" fill="#4f8f4f"/>`,
    `<rect x="238" y="198" width="10" height="12" fill="#b5502f"/>`,
    `<circle cx="243" cy="192" r="7" fill="#7a9a4a"/>`,
  ].join(""),

  /** アル・ホセイマ・ナドール: 湾と岩の海岸。 */
  rifbay: [
    sky("#8fc4e8", "#cfe4f0", 96),
    hills(96, "#7d8f5c", 3),
    band(96, 40, "#2a7898"),
    ground(136, "#c9a877"),
    ripples(110),
    gull(70, 40),
    gull(330, 50, 0.8),
    // 沖の岩礁
    `<path d="M180,120c-3,-8 6,-12 9,-5c4,-2 6,5 0,7z" fill="#9c7a52"/>`,
    `<path d="M300,124c-2,-6 5,-9 7,-3c3,-1 4,4 0,5z" fill="#9c7a52"/>`,
    // 段々畑の家並み(斜面、左手前)
    `<g fill="#f2f0e8">${[[10, 150, 30, 26], [46, 158, 26, 20], [4, 172, 20, 20]].map(([x, y, w, h]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}"/>`).join("")}</g>`,
    `<g fill="#5b8fe8" opacity=".4">${[[16, 158, 10, 8], [52, 164, 8, 6]].map(([x, y, w, h]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}"/>`).join("")}</g>`,
    // 右手前の小舟
    `<path d="M320,196c-3,8 33,8 30,0z" fill="#5b8fe8"/>`,
    `<rect x="333" y="180" width="2.4" height="16" fill="#8a5a34"/>`,
    `<path d="M335,180l10,7h-10z" fill="#f6efe2"/>`,
    // 手前の網
    `<g stroke="#8a5a34" stroke-width="1.2" opacity=".7"><path d="M300,204h60M300,208h60"/></g>`,
    // 沿岸の集落(右奥、白い家並み)
    `<g fill="#f2f0e8">${[[280, 148, 14, 12], [298, 152, 12, 10], [314, 150, 10, 12]].map(([x, y, w, h]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}"/>`).join("")}</g>`,
    // 桟橋
    `<rect x="330" y="188" width="60" height="6" fill="#8a5a34"/>`,
    `<g stroke="#8a5a34" stroke-width="2">${[336, 356, 376].map((x) => `<line x1="${x}" y1="194" x2="${x}" y2="204"/>`).join("")}</g>`,
    // 手前の岩
    `<ellipse cx="20" cy="200" rx="14" ry="6" fill="#9c7a52"/>`,
    // 干している魚(手前左)
    `<g stroke="#5a4630" stroke-width="1"><line x1="4" y1="180" x2="60" y2="180"/></g>`,
    `<g fill="#c9a877">${[10, 20, 30, 40, 50].map((x) => `<ellipse cx="${x}" cy="184" rx="3" ry="5"/>`).join("")}</g>`,
    // 追加の岩礁(遠く)
    `<path d="M240,126c-2,-5 4,-7 5,-2c2,-1 3,3 0,4z" fill="#9c7a52" opacity=".8"/>`,
    // 段々畑の緑
    `<g fill="#7a8f4a">${[[8, 148], [40, 156], [70, 170]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="5" ry="3"/>`).join("")}</g>`,
  ].join(""),

  /** ラバト: 途中で止まったハッサンの塔と列柱。 */
  capital: [
    sky("#8fc4e8", "#cfe4f0", 96),
    hills(96, "#b8c26a", 3),
    ground(96, "#c2b559"),
    clouds(70, 30),
    // ハッサンの塔(左寄り、未完成の高さ)
    `<rect x="30" y="96" width="46" height="80" fill="#c9a877"/>`,
    `<rect x="38" y="88" width="30" height="10" fill="#c9a877" opacity=".8"/>`,
    zellige(34, 108, 5, 8, ["#1a5a9c", "#f5b31c"]),
    // 未完成の礼拝堂跡(円柱の野)
    columnRow(90, 176, 9, 22, 42, "#e8e0cc"),
    // 手前のシェラ庭園の植栽
    palmTree(340, 200, 40),
    palmTree(370, 206, 32),
    citrusTree(300, 202, 20),
    // ブー・レグレグ川の帯
    `<rect x="0" y="196" width="400" height="14" fill="#2a7898" opacity=".7"/>`,
    ripples(200, "#4a9fc0"),
    // コウノトリ(塔の上)
    storkNest(52, 90, 5),
  ].join(""),

  /** カサブランカ・ケニトラ・モハメディア: アール・デコの街並み。 */
  metropolis: [
    sky("#8fc4e8", "#cfe4f0", 96),
    ground(96, "#cfe4f0"),
    band(150, 60, "#2a7898"),
    clouds(60, 30),
    // 左手前のアール・デコの建物群
    artDecoFacade(4, 210, 60, 100, "#f2f0e8"),
    artDecoFacade(66, 210, 44, 76, "#e8dcc0"),
    // モスクの尖塔(海に面する、シンボルの死角を避けて右寄りに)
    minaret(270, 150, 66, "#e8e0cc"),
    `<circle cx="270" cy="86" r="3" fill="#f5b31c"/>`,
    // 右手前の建物
    artDecoFacade(300, 210, 50, 86, "#e8dcc0"),
    artDecoFacade(354, 210, 40, 66, "#f2f0e8"),
    // 海と防波堤
    ripples(168, "#4a9fc0"),
    `<rect x="180" y="196" width="220" height="14" fill="#c9a877"/>`,
    gull(120, 60, 0.7),
    gull(160, 40, 0.8),
    // ヤシ並木(大通り)
    palmTree(140, 208, 26),
    palmTree(170, 210, 22),
  ].join(""),

  /** エルジャディダ: 地下貯水槽の反射の間(屋内の場面)。 */
  cistern: [
    band(0, 210, "#2a2f28"),
    // 石のアーチ列(奥から手前)
    archRow(20, 40, 6, 62, 110, "#3a4a3a", 0.9),
    archRow(20, 130, 6, 62, 80, "#2f3a2f", 0.95),
    // 天井の穴から差す一筋の光
    `<path d="M188,0L212,0L240,140L160,140z" fill="#f5b31c" opacity=".35"/>`,
    `<ellipse cx="200" cy="30" rx="14" ry="8" fill="#f5b31c" opacity=".8"/>`,
    // 反射する水面
    `<rect x="0" y="150" width="400" height="60" fill="#1a5a78"/>`,
    `<ellipse cx="200" cy="150" rx="60" ry="10" fill="#f5b31c" opacity=".5"/>`,
    ripples(170, "#2a7898"),
    ripples(190, "#245f78"),
    // 石畳の縁(手前)
    `<rect x="0" y="196" width="400" height="14" fill="#5a4530"/>`,
    // 苔・石の質感(左右)
    `<g fill="#4a5a3a" opacity=".6">${[[10, 180], [30, 186], [370, 182], [386, 188]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="6" ry="3"/>`).join("")}</g>`,
    // 左右の追加アーチ(奥行きを足す)
    archRow(20, 60, 6, 62, 60, "#4a5a42", 0.6),
    // 石段(手前左)
    `<g fill="#3a4a3a">${Array.from({ length: 4 }).map((_, i) => `<rect x="${10 + i * 6}" y="${192 - i * 4}" width="14" height="4"/>`).join("")}</g>`,
    // 石畳の目地
    `<g stroke="#4a5a4a" stroke-width="1" opacity=".5">${[40, 90, 140, 260, 310, 360].map((x) => `<line x1="${x}" y1="196" x2="${x}" y2="210"/>`).join("")}</g>`,
  ].join(""),

  /** サフィ: 陶工地区の壺と窯。 */
  pottery: [
    sky("#8fc4e8", "#cfe4f0", 96),
    hills(96, "#c9a877", 3),
    ground(96, "#c9a877"),
    clouds(60, 30),
    // 左手前の窯(煙が立つ)
    potteryKiln(60, 206, 30, "#9c6a3f"),
    `<g fill="#c8ccd0" opacity=".6"><circle cx="60" cy="168" r="4"/><circle cx="64" cy="158" r="5"/><circle cx="58" cy="148" r="6"/></g>`,
    // 手前の壺の列(色違い)
    `<g>${[
      [130, "#1a5a9c"], [148, "#e8443f"], [164, "#f5b31c"], [180, "#8a9a3f"], [196, "#b5502f"],
    ].map(([x, c], i) => `<path d="M${x - 6},${206}c-2,-${10 + i}0,-14 6,-14c6,0 4,4 6,${14}z" fill="${c}"/>`).join("")}</g>`,
    // 右手前の粘土の丘(切り出し跡)
    `<path d="M280,210V180c20,-10 60,-10 90,0v30z" fill="#b5502f"/>`,
    `<path d="M300,200l10,-10M330,204l14,-16" stroke="#8a3c1f" stroke-width="2"/>`,
    // 露店の日よけ
    `<path d="M340,190l16,-12l16,12z" fill="#e8443f" opacity=".9"/>`,
    // 干している素焼きの皿(壁に立てかけ)
    `<g fill="#c9922f">${[[100, 200], [110, 202], [120, 198]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5"/>`).join("")}</g>`,
    // 手前の作業台
    `<rect x="220" y="200" width="40" height="6" fill="#8a5a34"/>`,
    `<rect x="224" y="206" width="4" height="4" fill="#5a4630"/>`,
    `<rect x="252" y="206" width="4" height="4" fill="#5a4630"/>`,
    // 遠くの海(サフィは港町)
    band(96, 8, "#2a7898"),
    // 追加の壺(左手前、大小)
    `<g>${[[350, "#4a4a52"], [365, "#9c922f"]].map(([x, c]) => `<path d="M${x - 5},206c-2,-8 0,-11 5,-11c5,0 3,3 5,11z" fill="${c}"/>`).join("")}</g>`,
    // 陶工の手(ろくろの脇)
    `<circle cx="70" cy="196" r="4" fill="#f6efe2"/>`,
    // 干し草の敷物
    `<ellipse cx="200" cy="204" rx="30" ry="5" fill="#d8b878" opacity=".7"/>`,
  ].join(""),

  /** アガディール: 新しい海辺のリゾートと丘の上の旧カスバ跡。 */
  resort: [
    sky("#8fc4e8", "#cfe4f0", 100),
    band(100, 40, "#2a7898"),
    ground(140, "#e8dcc0"),
    ripples(114),
    gull(90, 40),
    gull(300, 50, 0.8),
    // 丘の上の旧カスバ跡(遠景シルエット)
    `<path d="M340,100c10,-30 30,-30 40,0z" fill="#c9a877" opacity=".8"/>`,
    kasbahTower(360, 100, 6, 12, "#9c7a52"),
    // 手前のホテル群
    artDecoFacade(20, 210, 50, 60, "#f2f0e8"),
    artDecoFacade(76, 210, 60, 76, "#e8dcc0"),
    // 砂浜のパラソル
    `<path d="M180,180l16,-16l16,16z" fill="#e8443f"/>`,
    `<line x1="196" y1="164" x2="196" y2="196" stroke="#5a4630" stroke-width="2"/>`,
    `<path d="M240,184l14,-14l14,14z" fill="#f5b31c"/>`,
    `<line x1="254" y1="170" x2="254" y2="198" stroke="#5a4630" stroke-width="2"/>`,
    // ヤシ
    palmTree(340, 206, 30),
    palmTree(370, 208, 24),
  ].join(""),

  /** マラケシュ: クトゥビアの尖塔とヤシ、遠くのアトラス。 */
  koutoubia: [
    sky("#8fc4e8", "#cfe4f0", 100),
    band(100, 20, "#e8bfa0"), // 遠くのアトラスの雪山の空気感
    `<path d="M280,100c20,-30 50,-30 70,0z" fill="#8a8f92"/>`,
    `<path d="M290,88l10,-14l10,14z" fill="#f2f6f8"/>`,
    ground(120, "#c2b559"),
    clouds(60, 30),
    // クトゥビアの尖塔(大きく中心からずらして左寄り)
    `<rect x="30" y="60" width="40" height="60" fill="#e8443f"/>`,
    `<rect x="36" y="46" width="28" height="16" fill="#e8443f" opacity=".85"/>`,
    `<rect x="42" y="30" width="16" height="18" fill="#e8443f" opacity=".7"/>`,
    `<circle cx="50" cy="24" r="3" fill="#f5b31c"/>`,
    zellige(32, 76, 6, 6, ["#f5b31c", "#f2f0e8"]),
    // 手前のヤシ林
    palmTree(300, 200, 44),
    palmTree(330, 208, 36),
    palmTree(360, 202, 40),
    palmTree(120, 206, 30),
    // ジャマ・エル・フナの屋台の煙
    `<g fill="#c8ccd0" opacity=".55"><circle cx="230" cy="190" r="4"/><circle cx="234" cy="180" r="5"/><circle cx="228" cy="170" r="6"/></g>`,
    `<path d="M220,196l14,-10l14,10z" fill="#e8443f" opacity=".9"/>`,
  ].join(""),

  /** ヴォルビリス: ローマ遺跡の円柱と凱旋門。 */
  ruins: [
    sky("#8fc4e8", "#cfe4f0", 96),
    hills(96, "#b8c26a", 3),
    ground(96, "#8a9a5c"),
    clouds(70, 30),
    columnRow(20, 190, 6, 26, 60, "#e8e0cc"),
    columnRow(280, 190, 5, 24, 44, "#e8e0cc"),
    // 凱旋門(右手前)
    `<rect x="330" y="150" width="60" height="50" fill="#e8e0cc"/>`,
    `<path d="M348,200v-24a10,10 0 0 1 20,0v24z" fill="#8a9a5c"/>`,
    // オリーブの木
    roundTree(230, 200, 18, "#7a9a4a"),
    roundTree(260, 206, 14, "#8aaa5a"),
    // モザイクの床(手前、地面にのぞく)
    `<g>${[[100, 195, "#1a5a9c"], [116, 197, "#f5b31c"], [132, 195, "#e8443f"]].map(([x, y, c]) => `<rect x="${x}" y="${y}" width="12" height="10" fill="${c}"/>`).join("")}</g>`,
  ].join(""),

  /** ベニ・メラル・ミデルト・ベルカン: 田園の果樹園。 */
  countryside: [
    sky("#8fc4e8", "#cfe4f0", 96),
    hills(96, "#8a9a5c", 4),
    ground(96, "#b8c26a"),
    clouds(60, 30),
    // 果樹の畝(左右)
    `<g>${[
      [20, 190], [50, 194], [80, 190], [300, 192], [330, 196], [360, 190],
    ].map(([x, y]) => roundTree(x, y, 14, "#5a9a4a")).join("")}</g>`,
    `<g fill="#e8443f">${[[16, 178], [46, 182], [296, 180], [356, 178]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.6"/>`).join("")}</g>`,
    // 農家(手前)
    `<rect x="150" y="176" width="60" height="34" fill="#e8dcc0"/>`,
    `<path d="M144,176L180,150L216,176z" fill="#b5502f"/>`,
    // 遠くの雪山(アトラス、シンボルの死角を避けて左右に分ける)
    `<path d="M50,96c14,-20 34,-20 48,0z" fill="#8a8f92" opacity=".8"/>`,
    `<path d="M60,88l10,-12l10,12z" fill="#f2f6f8"/>`,
    `<path d="M300,96c14,-20 34,-20 48,0z" fill="#8a8f92" opacity=".8"/>`,
    `<path d="M310,88l10,-12l10,12z" fill="#f2f6f8"/>`,
    // 水路
    `<rect x="0" y="200" width="400" height="10" fill="#3f8fc4" opacity=".8"/>`,
    // 追加の果樹の畝(手前)
    `<g>${[[30, 210], [60, 208], [310, 210], [345, 208]].map(([x, y]) => roundTree(x, y, 10, "#6aaa4a")).join("")}</g>`,
    // 干し草の俵
    `<ellipse cx="120" cy="204" rx="10" ry="6" fill="#c9a877"/>`,
    `<ellipse cx="132" cy="206" rx="8" ry="5" fill="#d8b878"/>`,
    // 井戸(農家の前)
    `<rect x="176" y="196" width="10" height="10" fill="#9c7a52"/>`,
  ].join(""),

  /** イムリル・セッティ・ファトマ: アトラスの谷とラバの道。 */
  mountains: [
    sky("#a8d0ea", "#e4f0f6", 96),
    `<path d="M0,96c40,-50 90,-50 130,-10c40,-40 90,-40 130,0c40,-30 80,-30 140,0v10H0z" fill="#8a8f92"/>`,
    `<path d="M40,70l14,-20l14,20z" fill="#f2f6f8"/>`,
    `<path d="M170,66l14,-20l14,20z" fill="#f2f6f8"/>`,
    ground(96, "#8a9a5c"),
    // 谷を下る小径とラバ
    `<path d="M40,210Q140,140 200,96" fill="none" stroke="#c9a877" stroke-width="14" opacity=".8"/>`,
    mule(150, 150, 1.1),
    mule(170, 160, 0.9),
    // クルミの木(谷底)
    roundTree(70, 200, 20, "#5a8a3f"),
    roundTree(320, 196, 22, "#5a8a3f"),
    waterfall(350, 100, 60, 10),
    `<ellipse cx="350" cy="164" rx="16" ry="5" fill="#bfe8f4"/>`,
    // 手前の岩(谷底)
    `<g fill="#9c7a52">${[[20, 205], [50, 208], [340, 206], [370, 204]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="6" ry="3.4"/>`).join("")}</g>`,
    // 石積みの畑の縁
    `<g stroke="#7a6650" stroke-width="1.6" opacity=".6"><path d="M0,192h60M340,196h60"/></g>`,
    // 遠くの鳥
    `<path d="M80,60q4,-5 8,0q4,-5 8,0" fill="none" stroke="#4a4a52" stroke-width="1.4"/>`,
    // 手前のシダ・低木(密度を足す)
    `<g fill="#4a7a3f">${[[15, 208], [385, 210], [10, 195]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="5" ry="3"/>`).join("")}</g>`,
    // 追加の雪の斑(遠景の峰、シンボルの死角を避けて左右に)
    `<ellipse cx="60" cy="60" rx="10" ry="4" fill="#f2f6f8" opacity=".8"/>`,
    `<ellipse cx="340" cy="58" rx="10" ry="4" fill="#f2f6f8" opacity=".8"/>`,
    // 石積みの案内標
    `<rect x="130" y="188" width="4" height="20" fill="#9c7a52"/>`,
    `<rect x="126" y="182" width="12" height="6" fill="#e8dcc0"/>`,
  ].join(""),

  /** ワルザザート・アイット・ベン・ハドゥ: 丘の上のカスバ群とナツメヤシ。 */
  kasbah: [
    sky("#f2c96b", "#f6e0a0", 100),
    sun(40, 34, 16),
    ground(100, "#e0bb70"),
    // 丘の上に連なる土のカスバ
    kasbahTower(60, 100, 20, 60, "#b5502f"),
    kasbahTower(90, 100, 16, 46, "#c9622f"),
    kasbahTower(300, 100, 18, 54, "#b5502f"),
    kasbahTower(330, 100, 14, 40, "#c9622f"),
    `<rect x="40" y="94" width="70" height="8" fill="#9c7a52"/>`,
    `<rect x="284" y="94" width="70" height="8" fill="#9c7a52"/>`,
    // ナツメヤシの木立(谷底)
    palmTree(160, 206, 40),
    palmTree(190, 210, 32),
    palmTree(220, 204, 36),
    // 川(谷底)
    `<rect x="140" y="196" width="120" height="10" fill="#3f8fc4" opacity=".8"/>`,
  ].join(""),

  /** ザゴラ・エルラシディア・フィギッグ: ナツメヤシの谷のオアシス。 */
  palmoasis: [
    sky("#f2c96b", "#f6e0a0", 96),
    sun(360, 36, 16),
    ground(96, "#f6e0a0"),
    dune(60, 150, 160, 40, "#e0bb70"),
    dune(320, 160, 180, 50, "#d8ac5a"),
    // ナツメヤシの密林(谷底)
    `<g>${[
      [40, 200], [70, 206], [100, 198], [130, 204], [270, 202], [300, 208], [330, 200], [360, 206],
    ].map(([x, y]) => palmTree(x, y, 30 + (y % 10))).join("")}</g>`,
    // 水路
    `<rect x="0" y="200" width="400" height="10" fill="#3f8fc4" opacity=".8"/>`,
    ripples(204, "#5aafd0"),
    // 遠くの土の塔(シンボルの死角を避けて右寄りに)
    kasbahTower(280, 150, 10, 22, "#9c7a52"),
  ].join(""),

  /** ティネリール: 切り立ったトドラ渓谷。 */
  gorge: [
    sky("#8fc4e8", "#cfe4f0", 150),
    gorgeCliffs(150, 20, "#9c7a52"),
    `<path d="M0,150h400v60H0z" fill="#c9a877"/>`,
    ground(190, "#c9a877"),
    // 渓谷の川
    `<rect x="150" y="170" width="100" height="40" fill="#3f8fc4"/>`,
    ripples(180, "#5aafd0"),
    // 崖の縞模様
    `<g stroke="#8a6540" stroke-width="1.4" opacity=".5"><path d="M10,60h60M20,90h50M330,70h60M340,100h50"/></g>`,
    // 手前のクライマー(小さく、崖に張り付く)
    `<circle cx="90" cy="80" r="3" fill="#e8443f"/>`,
    // 小さな羊の群れ(谷底)
    `<g fill="#f6efe2">${[[60, 196], [72, 198], [84, 194]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="5" ry="3.4"/>`).join("")}</g>`,
    // 崖の岩肌の凹凸(左右、追加の陰影)
    `<g fill="#8a6540" opacity=".4">${[[20, 100, 20, 30], [340, 90, 24, 34]].map(([x, y, w, h]) => `<ellipse cx="${x}" cy="${y}" rx="${w}" ry="${h}"/>`).join("")}</g>`,
    // 対岸の小径
    `<path d="M300,208Q320,180 340,140" fill="none" stroke="#c9a877" stroke-width="6" opacity=".7"/>`,
    // 手前の石
    `<g fill="#9c7a52">${[[30, 206], [110, 208], [290, 206]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="6" ry="3.4"/>`).join("")}</g>`,
    // 遠くの鳥
    `<path d="M100,30q4,-5 8,0q4,-5 8,0" fill="none" stroke="#4a4a52" stroke-width="1.4"/>`,
    // 崖に生える低木
    `<g fill="#5a7a3f">${[[15, 130], [30, 150], [370, 120], [385, 145]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="4" ry="2.6"/>`).join("")}</g>`,
    // 手前の石垣(渓谷入口の目印)
    `<g fill="#7a6650">${Array.from({ length: 5 }).map((_, i) => `<rect x="${20 + i * 8}" y="200" width="6" height="8"/>`).join("")}</g>`,
    // 対岸の低木(密度を足す)
    `<g fill="#5a7a3f">${[[300, 190], [320, 194], [360, 188]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="4" ry="2.6"/>`).join("")}</g>`,
    // 手前の水たまりの反射
    `<ellipse cx="60" cy="204" rx="20" ry="3" fill="#5aafd0" opacity=".5"/>`,
    // 崖の亀裂(縦線)
    `<g stroke="#7a6540" stroke-width="1.2" opacity=".5">${[30, 45, 355, 372].map((x) => `<line x1="${x}" y1="60" x2="${x + 4}" y2="120"/>`).join("")}</g>`,
  ].join(""),

  /** シディイフニ・タンタン・タルファヤ: 平らな砂漠の海岸。 */
  coastdesert: [
    sky("#f2c96b", "#e8f0f4", 110),
    band(110, 30, "#2a7898"),
    ground(140, "#e0bb70"),
    ripples(122, "#4a9fc0"),
    gull(70, 60, 0.7),
    gull(320, 50, 0.8),
    // 崖(左)
    `<path d="M0,210V150c16,-14 34,-14 50,0v60z" fill="#c9a877"/>`,
    artDecoFacade(4, 148, 34, 40, "#f2f0e8"),
    // 手前の漁船
    `<path d="M240,196c-3,7 33,7 30,0z" fill="#5b8fe8"/>`,
    `<rect x="253" y="180" width="2.4" height="16" fill="#8a5a34"/>`,
    `<path d="M255,180l10,7h-10z" fill="#f6efe2"/>`,
    // 手前の砂丘
    dune(340, 190, 120, 30, "#d8ac5a"),
    // 遠くの複葉機(タルファヤを思わせる)
    biplane(100, 90, 0.9),
    // 干している網と釣り具(手前左)
    `<g stroke="#8a5a34" stroke-width="1.2" opacity=".7"><path d="M4,204h50M4,208h50"/></g>`,
    // 砂丘の風紋
    `<g stroke="#c9922f" stroke-width="1" opacity=".5" fill="none"><path d="M300,200q20,-4 40,0"/></g>`,
    // 手前の岩(崖の下)
    `<ellipse cx="60" cy="204" rx="10" ry="5" fill="#9c7a52"/>`,
    // 遠くの小舟(沖)
    `<path d="M180,132c-2,4 12,4 10,0z" fill="#4a7bd0"/>`,
    // ラクダの足跡(南部の海岸道)
    `<g fill="#c9922f" opacity=".5">${[[100, 205], [115, 207], [130, 205]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="2.4" ry="1.4"/>`).join("")}</g>`,
    // 崖の上のカフェ(小さな四角)
    `<rect x="10" y="132" width="18" height="14" fill="#e0d0a0"/>`,
    // 追加のかもめ
    gull(200, 40, 0.6),
    // 手前の貝殻・小石
    `<g fill="#e8dcc0">${[[180, 202], [200, 206], [220, 202]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="3" ry="2"/>`).join("")}</g>`,
    // 波打ち際の泡
    `<path d="M140,144q10,4 20,0t20,0" fill="none" stroke="#f6efe2" stroke-width="2" opacity=".6"/>`,
  ].join(""),

  /** ウジダ・タザ: 乾いた高原の峠道。 */
  borderdesert: [
    sky("#e8bfa0", "#f2ddc0", 96),
    hills(96, "#9c8a5c", 4),
    ground(96, "#c9a877"),
    clouds(70, 30),
    // 山地の隙間(タザの回廊)
    `<path d="M0,96c30,-40 70,-40 100,-6v6z" fill="#8a8f92" opacity=".7"/>`,
    `<path d="M300,96c30,-40 70,-40 100,-6v6z" fill="#8a8f92" opacity=".7"/>`,
    // カスバの城壁(左手前)
    kasbahTower(50, 200, 16, 40, "#b5502f"),
    kasbahTower(80, 200, 12, 30, "#9c6a3f"),
    // コルクガシ(タザ)
    roundTree(320, 200, 20, "#6a8a4a"),
    roundTree(350, 206, 16, "#6a8a4a"),
    // 遠くの隊商(道)
    `<path d="M120,208Q250,180 380,208" fill="none" stroke="#9c7a52" stroke-width="8" opacity=".6"/>`,
    camel(220, 200, 0.6),
    camel(235, 202, 0.5),
  ].join(""),
};
