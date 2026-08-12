/**
 * インドネシアの都市イラスト。
 *
 * `INDONESIA_MARKS` は24×24の座標系に描くシンボル、`INDONESIA_BG` は
 * 400×210の座標系に描く背景シーン(いずれもSVG断片の文字列)。動きは
 * 含めない(アニメーションはReact側で重ねる)。
 *
 * 色は他の盤面と揃える。空 #8fc4e8〜#20364a、地面の緑 #2f4a33、
 * 顔・白 #f6efe2、強調 #f5b31c(金)/#e8443f(赤)/#5b8fe8(青)。
 * インドネシアらしさは **赤道直下の濃い緑 #3f7a3f・熱帯の海の青緑 #1c6f7a〜
 * #2a8f96・火山の焦げ茶 #4a3c30・木造家屋の焦げ茶 #6b5330・イスラム建築の白
 * #f2ece0** で出す(海の色は geography.mjs と揃えてある)。
 *
 * 鍵は `cities.mjs` の `mark` / `bg` と一対一で対応する(同じキー名)。
 * 増やすときは両方を揃えること。
 *
 * **背景SVGの中央25%(x=151〜249 / y=54〜152)は都市シンボルに隠れて
 * 見えない。** 見せたい細部は左右3分の1と手前(y>170)に置く。
 * `sky()` は必ず第3引数(次に来る塗りの開始y)を渡すこと。渡し忘れると
 * 空と地面のあいだに塗り残しの帯ができる(ibaraki・韓国・イタリアで実際に
 * 起きた)。
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
  return `<g opacity=".85" fill="#f6efe2">${e(0, 18, 7)}${e(-10, 11, 5.5)}${e(11, 13, 5.5)}</g>`;
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

/** 起重機(港のクレーン)。 */
function crane(x, base, h, fill = "#e8443f") {
  return (
    `<rect x="${r1(x - 2)}" y="${r1(base - h)}" width="4" height="${h}" fill="${fill}"/>` +
    `<rect x="${r1(x - 2)}" y="${r1(base - h)}" width="${r1(h * 0.72)}" height="4" fill="${fill}"/>` +
    `<line x1="${r1(x + h * 0.6)}" y1="${r1(base - h + 2)}" x2="${r1(x + h * 0.6)}" y2="${r1(base - h * 0.55)}" stroke="${fill}" stroke-width="2"/>`
  );
}

/** 丸い樹冠の広葉樹。 */
function roundTree(x, base, r, crown = "#3f7a3f", trunk = "#6b5330") {
  const th = r1(r * 1.1);
  return (
    `<rect x="${r1(x - r * 0.16)}" y="${r1(base - th - r * 0.3)}" width="${r1(r * 0.32)}" height="${r1(th + r * 0.3)}" fill="${trunk}"/>` +
    `<circle cx="${x}" cy="${r1(base - th - r * 0.5)}" r="${r}" fill="${crown}"/>`
  );
}

/** ヤシの木。熱帯の海岸のどのシーンでも使い回す基本部品。 */
function palm(x, base, h = 26, lean = 3) {
  const tx = r1(x + lean);
  return (
    `<path d="M${x},${base}q${r1(lean * 0.6)},-${r1(h * 0.6)} ${lean},-${h}" fill="none" stroke="#6b5330" stroke-width="2.6"/>` +
    `<g fill="#2f8f4a">` +
    `<path d="M${tx},${r1(base - h)}q-13,-5 -17,3q9,-1 17,0"/>` +
    `<path d="M${tx},${r1(base - h)}q13,-5 17,3q-9,-1 -17,0"/>` +
    `<path d="M${tx},${r1(base - h)}q-3,-11 3,-15q3,8 -3,15"/>` +
    `<path d="M${tx},${r1(base - h)}q9,-9 15,-6q-6,7 -15,6"/>` +
    `<path d="M${tx},${r1(base - h)}q-9,-9 -15,-6q6,7 15,6"/>` +
    `</g>` +
    `<g fill="#a06a30"><circle cx="${r1(tx - 2)}" cy="${r1(base - h + 4)}" r="1.4"/><circle cx="${r1(tx + 2)}" cy="${r1(base - h + 5)}" r="1.4"/></g>`
  );
}

/** 火山。噴煙は任意。 */
function volcanoShape(x, base, w, h, fill = "#4a3c30", smoke = true) {
  let s = `<path d="M${r1(x - w / 2)},${base}L${x},${r1(base - h)}L${r1(x + w / 2)},${base}z" fill="${fill}"/>`;
  if (smoke) {
    s += `<g fill="#c8ccc4" opacity=".75"><ellipse cx="${x}" cy="${r1(base - h - 6)}" rx="9" ry="5"/><ellipse cx="${r1(x + 5)}" cy="${r1(base - h - 13)}" rx="7" ry="4"/></g>`;
  }
  return s;
}

/** 水面の帯(川・海)。 */
function water(y, h, fill = "#1c6f7a") {
  return band(y, h, fill);
}

/** 高床の水上家屋。 */
function stiltHut(x, base, w = 26, h = 16, roof = "#8a5a3a", wall = "#c9a877") {
  const legY = base - 2;
  return (
    `<g stroke="#5a4020" stroke-width="1.6"><line x1="${r1(x - w * 0.35)}" y1="${legY}" x2="${r1(x - w * 0.35)}" y2="${r1(base + 8)}"/><line x1="${r1(x + w * 0.35)}" y1="${legY}" x2="${r1(x + w * 0.35)}" y2="${r1(base + 8)}"/></g>` +
    `<rect x="${r1(x - w / 2)}" y="${r1(base - h - 6)}" width="${w}" height="${h}" fill="${wall}"/>` +
    `<path d="M${r1(x - w / 2 - 2)},${r1(base - h - 6)}L${x},${r1(base - h - 15)}L${r1(x + w / 2 + 2)},${r1(base - h - 6)}z" fill="${roof}"/>`
  );
}

/** 舟形屋根の家(トンコナン/舟)。 */
/** 遠くを飛ぶ鳥のシルエット(カモメ・海鳥)。 */
function gull(x, y, scale = 1) {
  const w = 8 * scale;
  return `<path d="M${r1(x - w)},${y}q${r1(w / 2)},-6 ${w},0q${r1(w / 2)},-6 ${w},0" fill="none" stroke="#4a4a52" stroke-width="1.4"/>`;
}

function boatRoof(x, base, w, h, roof = "#3a2f24") {
  return `<path d="M${r1(x - w / 2)},${r1(base - h * 0.3)}q${r1(w * 0.1)},${r1(-h * 0.9)} ${r1(w * 0.5)},${r1(-h)}q${r1(w * 0.4)},${r1(h * 0.1)} ${r1(w * 0.5)},${r1(h)}q-${r1(w * 0.5)},${r1(h * 0.35)} -${r1(w)},0z" fill="${roof}"/>`;
}

// ---------------------------------------------------------------------------
// mark(24×24)
// ---------------------------------------------------------------------------

export const INDONESIA_MARKS = {
  /** ドームとミナレット。バンダアチェ・マタラム。 */
  mosque:
    `<path d="M4,22V14a8,7 0 0 1 16,0v8z" fill="#f2ece0"/>` +
    `<circle cx="12" cy="10" r="4" fill="#3f8fc4"/>` +
    `<rect x="19" y="2" width="2" height="14" fill="#f2ece0"/><circle cx="20" cy="2" r="1.4" fill="#f5b31c"/>`,

  /** オランダ統治時代の建物。メダン・スマラン。 */
  colonial:
    `<rect x="3" y="10" width="18" height="12" fill="#f2ece0"/>` +
    `<path d="M2,10L12,3L22,10z" fill="#8a5a3a"/>` +
    `<g fill="#8a5a3a"><rect x="6" y="14" width="3" height="5"/><rect x="15" y="14" width="3" height="5"/></g>`,

  /** カルデラ湖と船。トバ湖畔。 */
  lake:
    `<path d="M2,20c4,-8 8,-12 10,-12c2,0 6,4 10,12z" fill="#7f8f5c"/>` +
    `<path d="M2,16h20v6H2z" fill="#3f8fc4"/>` +
    `<path d="M8,18h8l-1,3H9z" fill="#8a5a3a"/>`,

  /** 時計塔。ブキッティンギ。 */
  clocktower:
    `<rect x="9" y="4" width="6" height="18" fill="#f2ece0"/>` +
    `<path d="M8,4c0,-4 8,-4 8,0z" fill="#8a5a3a"/>` +
    `<circle cx="12" cy="10" r="2.4" fill="#3a2f24"/>`,

  /** 起重機と船。パダン・アンボン・ジャヤプラ。 */
  port:
    `<rect x="10" y="4" width="2" height="14" fill="#e8443f"/>` +
    `<rect x="10" y="4" width="9" height="2" fill="#e8443f"/>` +
    `<path d="M2,18h20l-3,4H5z" fill="#1c6f7a"/>`,

  /** 坑口とトロッコ。サワルント。 */
  mine:
    `<path d="M4,22V13a8,8 0 0 1 16,0v9z" fill="#4a3c30"/>` +
    `<ellipse cx="12" cy="13" rx="6" ry="6" fill="#1a1512"/>` +
    `<rect x="2" y="20" width="20" height="2" fill="#6b5330"/>`,

  /** 鉄橋。パレンバン。 */
  bridge:
    `<path d="M2,18q10,-14 20,0" fill="none" stroke="#8f96a0" stroke-width="2.2"/>` +
    `<rect x="2" y="18" width="20" height="2" fill="#6b5330"/>` +
    `<g stroke="#8f96a0" stroke-width="1.4"><line x1="7" y1="14" x2="7" y2="18"/><line x1="17" y1="14" x2="17" y2="18"/></g>`,

  /** フェリー船。バカウヘニ・メラック・ギリマヌク。 */
  ferry:
    `<path d="M3,16h18l-2,5H5z" fill="#f2ece0"/>` +
    `<rect x="8" y="9" width="8" height="7" fill="#3f8fc4"/>` +
    `<rect x="10" y="5" width="1.6" height="5" fill="#4a4a52"/>`,

  /** 炎を戴く塔(モナス)。ジャカルタ。 */
  monas:
    `<path d="M10,22V8l2,-5l2,5v14z" fill="#e8e0cc"/>` +
    `<path d="M11,7q1,-3 2,-3q1,0 2,3q-2,1.4 -4,0z" fill="#f5b31c"/>`,

  /** アール・デコの建物正面。バンドン。 */
  artdeco:
    `<rect x="4" y="8" width="16" height="14" fill="#e8dcc0"/>` +
    `<path d="M4,8l8,-6l8,6z" fill="#c9a877"/>` +
    `<g stroke="#8a5a3a" stroke-width="1.2"><line x1="8" y1="8" x2="8" y2="22"/><line x1="16" y1="8" x2="16" y2="22"/></g>`,

  /** 宮殿の屋根(プンドポ)。ジョグジャカルタ。 */
  palace:
    `<path d="M2,15L12,5L22,15z" fill="#3a2f24"/>` +
    `<path d="M4,15L12,8L20,15z" fill="#8a5a3a"/>` +
    `<rect x="6" y="15" width="12" height="7" fill="#f2ece0"/>`,

  /** 仏塔(ストゥーパ)。ボロブドゥール。 */
  temple:
    `<path d="M2,22c0,-6 8,-8 10,-8c2,0 10,2 10,8z" fill="#8f8a78"/>` +
    `<circle cx="12" cy="8" r="4" fill="#9a9488"/><circle cx="12" cy="3" r="1.4" fill="#9a9488"/>`,

  /** 蝋描きの文様。ソロ。 */
  batik:
    `<rect x="2" y="2" width="20" height="20" fill="#3a2f24"/>` +
    `<g fill="#e8c060"><circle cx="7" cy="7" r="2"/><circle cx="17" cy="7" r="2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><circle cx="12" cy="12" r="2.4"/></g>`,

  /** 重なる雲の文様(メガ・ムンドゥン)。チルボン専用。 */
  megamendung:
    `<rect x="2" y="2" width="20" height="20" fill="#1c5f82"/>` +
    `<g fill="none" stroke="#bfe8f4" stroke-width="1.6">` +
    `<path d="M4,9q4,-5 8,0q4,-5 8,0"/>` +
    `<path d="M4,14q4,-5 8,0q4,-5 8,0"/>` +
    `<path d="M4,19q4,-5 8,0q4,-5 8,0"/>` +
    `</g>`,

  /** 記念塔。スラバヤ。 */
  monument:
    `<path d="M9,22V6q3,-4 6,0v16z" fill="#c8ccc4"/>` +
    `<path d="M9,6q3,-3 6,0" fill="none" stroke="#8f96a0" stroke-width="1.4"/>`,

  /** 噴煙を上げる火山。ブロモ山。 */
  volcano:
    `<path d="M2,20L12,4L22,20z" fill="#4a3c30"/>` +
    `<g fill="#c8ccc4" opacity=".8"><circle cx="12" cy="3" r="2.4"/><circle cx="14" cy="0" r="2"/></g>` +
    `<circle cx="12" cy="6" r="1.6" fill="#e8443f"/>`,

  /** 青い炎の火口。バニュワンギ(イジェン山)。 */
  bluefire:
    `<path d="M2,20L12,6L22,20z" fill="#2a2440"/>` +
    `<g fill="#5b8fe8"><path d="M10,20q-2,-6 2,-9q0,4 3,5q-1,3 -5,4z"/><path d="M14,20q1,-4 4,-5q-1,3 1,4q-2,2 -5,1z"/></g>`,

  /** 割れ門(チャンディ・ブンタル)。デンパサール。 */
  baligate:
    `<path d="M3,22V10l4,-8h2v20z" fill="#8a5a3a"/>` +
    `<path d="M21,22V10l-4,-8h-2v20z" fill="#8a5a3a"/>` +
    `<g fill="#c9a877"><rect x="3" y="10" width="6" height="2"/><rect x="15" y="10" width="6" height="2"/></g>`,

  /** 棚田。ウブド。 */
  riceterrace:
    `<g fill="#c9dc7a"><path d="M2,22l20,-4v4z"/><path d="M2,17l20,-5v3l-20,4z"/><path d="M2,13l20,-7v3l-20,6z"/></g>` +
    `<g stroke="#8fa84f" stroke-width="1"><path d="M2,17l20,-5M2,13l20,-7"/></g>`,

  /** コモドドラゴン。ラブアンバジョ。 */
  dragon:
    `<path d="M3,18c3,-4 8,-6 13,-4c2,1 4,0 5,-2l-1,3c1,1 1,3 -1,3c-3,3 -12,3 -16,0z" fill="#6f7a4a"/>` +
    `<circle cx="18" cy="13" r="1" fill="#1a1512"/>` +
    `<g fill="#4a5230"><path d="M6,18l-2,3M9,19l-1,3M12,19l0,3"/></g>`,

  /** 三色の火口湖。エンデ(クリムトゥ)。 */
  crater:
    `<path d="M2,20c2,-9 8,-14 10,-14c2,0 8,5 10,14z" fill="#7a7060"/>` +
    `<g><ellipse cx="7" cy="18" rx="3.6" ry="2.2" fill="#3f8fc4"/><ellipse cx="12.5" cy="19" rx="3.4" ry="2" fill="#4f9f5a"/><ellipse cx="18" cy="18" rx="3" ry="1.8" fill="#2a2440"/></g>`,

  /** イカット織の文様と馬。ワインガプ。 */
  ikat:
    `<path d="M2,18c3,-8 6,-10 8,-10q1,3 -1,6c3,-1 5,-3 6,-6q2,0 2,3c2,-1 3,-1 4,1c-2,2 -4,10 -6,10c-1,-3 -1,-5 0,-7c-2,2 -4,3 -6,3c0,2 1,3 0,4c-3,0 -5,-2 -7,-4z" fill="#8a5a3a"/>`,

  /** サンゴ礁と魚。クパン・ブナケン・ワカトビ・ワイサイ。 */
  reef:
    `<g fill="#e8804a"><path d="M4,22c0,-8 3,-12 4,-12c1,3 -1,8 0,12z"/><path d="M10,22c0,-6 2,-10 4,-10c0,3 -1,7 1,10z"/><path d="M16,22c0,-7 3,-11 4,-11c1,3 -1,8 0,11z"/></g>` +
    `<path d="M6,10q3,-2 5,0q-2,1 -5,0z" fill="#f5b31c"/><circle cx="10.5" cy="10" r=".7" fill="#1a1512"/>`,

  /** 赤道記念塔。ポンティアナック。 */
  equator:
    `<rect x="10" y="3" width="4" height="19" fill="#c8ccc4"/>` +
    `<path d="M6,7h12M4,11h16" stroke="#8f96a0" stroke-width="1.4"/>` +
    `<circle cx="12" cy="3" r="2" fill="#f5b31c"/>`,

  /** 沖合の掘削基地。バリクパパン。 */
  oilrig:
    `<path d="M2,22l3,-14h14l3,14z" fill="none" stroke="#8f96a0" stroke-width="1.6"/>` +
    `<rect x="9" y="2" width="6" height="6" fill="#e8443f"/>` +
    `<path d="M12,2v-2" stroke="#e8443f" stroke-width="2"/>`,

  /** 水上マーケットの舟。バンジャルマシン。 */
  floatingmarket:
    `<path d="M2,17h20v4H2z" fill="#1c6f7a"/>` +
    `<path d="M4,17l1,-4h14l1,4z" fill="#8a5a3a"/>` +
    `<g fill="#e8804a"><circle cx="9" cy="12" r="1.6"/><circle cx="13" cy="12" r="1.6"/><circle cx="11" cy="10" r="1.6"/></g>`,

  /** 川船。サマリンダ。 */
  riverboat:
    `<path d="M2,18h20l-2,4H4z" fill="#8a5a3a"/>` +
    `<rect x="7" y="10" width="10" height="6" fill="#e8dcc0"/>` +
    `<rect x="11" y="4" width="1.6" height="6" fill="#4a4a52"/>`,

  /** オランウータン。パランカラヤ。 */
  orangutan:
    `<circle cx="12" cy="13" r="5" fill="#c9713a"/>` +
    `<circle cx="12" cy="12" r="3" fill="#e8dcc0"/>` +
    `<g fill="#1a1512"><circle cx="10.5" cy="11.5" r=".8"/><circle cx="13.5" cy="11.5" r=".8"/></g>` +
    `<path d="M6,10q-2,4 1,8M18,10q2,4 -1,8" fill="none" stroke="#c9713a" stroke-width="2.6" stroke-linecap="round"/>`,

  /** 市場の屋台。マナド。 */
  market:
    `<rect x="3" y="12" width="18" height="9" fill="#f2ece0"/>` +
    `<path d="M2,12l3,-5h14l3,5z" fill="#e8443f"/>` +
    `<g fill="#3f7a3f"><circle cx="8" cy="16" r="1.6"/><circle cx="12" cy="16" r="1.6"/><circle cx="16" cy="16" r="1.6"/></g>`,

  /** 高床の水上家屋。ゴロンタロ。 */
  stilthouse:
    `<g stroke="#5a4020" stroke-width="1.6"><line x1="7" y1="16" x2="7" y2="22"/><line x1="17" y1="16" x2="17" y2="22"/></g>` +
    `<rect x="5" y="10" width="14" height="8" fill="#c9a877"/>` +
    `<path d="M3,10L12,3L21,10z" fill="#8a5a3a"/>`,

  /** ピニシ帆船。マカッサル。 */
  phinisi:
    `<path d="M2,20h20l-3,3H5z" fill="#8a5a3a"/>` +
    `<path d="M8,20V6l9,4z" fill="#f2ece0"/>` +
    `<path d="M15,20V9l5,5z" fill="#e8dcc0"/>` +
    `<rect x="7.4" y="3" width="1.2" height="17" fill="#5a4020"/>`,

  /** 舟形屋根の家(トンコナン)。タナトラジャ。 */
  tongkonan:
    `<path d="M2,16q3,-13 10,-14q7,1 10,14q-10,3 -20,0z" fill="#3a2f24"/>` +
    `<rect x="8" y="15" width="8" height="7" fill="#c9a877"/>` +
    `<g stroke="#e8443f" stroke-width="1"><line x1="9" y1="16" x2="9" y2="21"/><line x1="15" y1="16" x2="15" y2="21"/></g>`,

  /** 丁子(クローブ)の実。テルナテ。 */
  clove:
    `<g fill="#7a5030"><path d="M6,20V13q0,-3 2,-3q2,0 2,3v7z"/><path d="M12,20V11q0,-3 2,-3q2,0 2,3v9z"/><path d="M18,20V14q0,-3 2,-3q2,0 2,3v6z"/></g>` +
    `<g fill="#e8443f"><circle cx="8" cy="9" r="1.6"/><circle cx="14" cy="7" r="1.6"/><circle cx="20" cy="10" r="1.6"/></g>`,

  /** 極楽鳥。ソロン。 */
  birdparadise:
    `<path d="M8,14c0,-4 3,-7 6,-7c3,0 5,3 5,6c0,3 -3,4 -5,4c-1,3 -4,4 -6,3c1,-2 2,-4 0,-6z" fill="#3a2f24"/>` +
    `<g fill="#f5b31c"><path d="M13,14q6,-2 8,2q-5,1 -8,-2z"/><path d="M13,14q7,1 7,6q-6,-1 -7,-6z"/></g>` +
    `<circle cx="10" cy="10" r="1" fill="#1a1512"/>`,

  /** 山あいの茅葺き家屋。ワメナ。 */
  highland:
    `<path d="M2,20c1,-9 5,-15 10,-15c5,0 9,6 10,15z" fill="#5f7a44"/>` +
    `<path d="M6,21c0,-5 3,-8 6,-8c3,0 6,3 6,8z" fill="#c9a877"/>` +
    `<path d="M4,21L12,10L20,21z" fill="#8a6a3a"/>`,
};

// ---------------------------------------------------------------------------
// bg(400×210)組み立て用の追加部品
// ---------------------------------------------------------------------------

/** ドームとミナレット(モスク)。左右どちらかに置く想定。 */
function mosqueBuilding(x, base, scale = 1) {
  const s = scale;
  return (
    `<path d="M${r1(x - 26 * s)},${base}V${r1(base - 30 * s)}a${r1(26 * s)},${r1(24 * s)} 0 0 1 ${r1(52 * s)},0V${base}z" fill="#f2ece0"/>` +
    `<circle cx="${x}" cy="${r1(base - 40 * s)}" r="${r1(15 * s)}" fill="#3f8fc4"/>` +
    `<circle cx="${x}" cy="${r1(base - 40 * s)}" r="${r1(15 * s)}" fill="none" stroke="#f2ece0" stroke-width="1.4"/>` +
    `<rect x="${r1(x - 6 * s)}" y="${r1(base - 26 * s)}" width="${r1(4 * s)}" height="${r1(14 * s)}" fill="#e8dcc0"/>` +
    `<rect x="${r1(x + 34 * s)}" y="${r1(base - 70 * s)}" width="${r1(7 * s)}" height="${r1(70 * s)}" fill="#f2ece0"/>` +
    `<circle cx="${r1(x + 37.5 * s)}" cy="${r1(base - 74 * s)}" r="${r1(5 * s)}" fill="#f5b31c"/>` +
    `<rect x="${r1(x - 64 * s)}" y="${r1(base - 46 * s)}" width="${r1(7 * s)}" height="${r1(46 * s)}" fill="#f2ece0"/>` +
    `<circle cx="${r1(x - 60.5 * s)}" cy="${r1(base - 50 * s)}" r="${r1(3.6 * s)}" fill="#f5b31c"/>`
  );
}

/** 高床の水上家屋を横一列に並べる。 */
function stiltRow(y0, count, spacing, xStart) {
  const parts = [];
  for (let i = 0; i < count; i++) {
    parts.push(stiltHut(xStart + i * spacing, y0, 24 + (i % 3) * 4, 13 + (i % 2) * 3));
  }
  return `<g>${parts.join("")}</g>`;
}

/** 市場の屋台を横一列に並べる。 */
function stallRow(y0, count, spacing, xStart, colors) {
  const parts = [];
  for (let i = 0; i < count; i++) {
    const c = colors[i % colors.length];
    const x = xStart + i * spacing;
    parts.push(
      `<path d="M${r1(x - 12)},${r1(y0 - 12)}L${x},${r1(y0 - 20)}L${r1(x + 12)},${r1(y0 - 12)}z" fill="${c}"/>` +
        `<rect x="${r1(x - 11)}" y="${r1(y0 - 12)}" width="22" height="12" fill="#c9a877"/>`,
    );
  }
  return `<g>${parts.join("")}</g>`;
}

/** サンゴの群れ。 */
function coralCluster(x, base, scale = 1) {
  const s = scale;
  return (
    `<g fill="#e8804a"><path d="M${r1(x - 10 * s)},${base}c0,${r1(-16 * s)} ${r1(5 * s)},${r1(-22 * s)} ${r1(7 * s)},${r1(-22 * s)}c${r1(2 * s)},${r1(6 * s)} ${r1(-2 * s)},${r1(16 * s)} 0,${r1(22 * s)}z"/>` +
    `<path d="M${x},${base}c0,${r1(-12 * s)} ${r1(4 * s)},${r1(-18 * s)} ${r1(7 * s)},${r1(-18 * s)}c${r1(2 * s)},${r1(5 * s)} ${r1(-2 * s)},${r1(13 * s)} 0,${r1(18 * s)}z"/></g>` +
    `<g fill="#f5b31c"><path d="M${r1(x + 12 * s)},${base}c0,${r1(-14 * s)} ${r1(4 * s)},${r1(-19 * s)} ${r1(6 * s)},${r1(-19 * s)}c${r1(2 * s)},${r1(5 * s)} ${r1(-2 * s)},${r1(14 * s)} 0,${r1(19 * s)}z"/></g>` +
    `<g fill="#9a5ac0" opacity=".85"><circle cx="${r1(x - 2 * s)}" cy="${r1(base - 4 * s)}" r="${r1(3 * s)}"/></g>`
  );
}

/** 棚田(横に何段も重ねる)。 */
function terraceRows(y0, rows, xStart, xEnd, fill = "#c9dc7a", edge = "#8fa84f") {
  const parts = [];
  for (let i = 0; i < rows; i++) {
    const y = y0 - i * 8;
    const inset = i * 14;
    parts.push(`<path d="M${xStart + inset},${y}L${xEnd - inset},${y - 4}v6L${xStart + inset},${y + 6}z" fill="${fill}" stroke="${edge}" stroke-width="1"/>`);
  }
  return `<g>${parts.join("")}</g>`;
}

export const INDONESIA_BG = {
  /** ドームとミナレット。バンダアチェ・マタラム。 */
  mosque:
    sky("#8fc4e8", "#cfe4f0", 150) +
    hills(150, "#5f7a44", 3) +
    ground(150, "#3f7a3f") +
    clouds(70, 30) +
    clouds(320, 22, 0.8) +
    mosqueBuilding(70, 170, 1.1) +
    mosqueBuilding(330, 195, 0.6) +
    palm(20, 205, 30, 4) +
    palm(390, 208, 24, -3) +
    `<g fill="#7fae52"><path d="M10,150c-8,-5 -8,-14 -2,-16c2,6 4,12 2,16z"/><path d="M40,150c8,-4 9,-13 3,-16c-3,6 -5,12 -3,16z"/></g>` +
    `<g fill="#3a2f24" opacity=".8"><rect x="150" y="170" width="4" height="18"/><rect x="248" y="175" width="4" height="16"/></g>`,

  /** オランダ統治時代の建物。メダン・スマラン。 */
  colonial:
    sky("#8fc4e8", "#cfe4f0", 118) +
    ground(118, "#7f8f5c") +
    ground(150, "#3f7a3f") +
    clouds(340, 26) +
    `<g><rect x="20" y="90" width="60" height="60" fill="#f2ece0"/><path d="M14,90L50,58L86,90z" fill="#8a5a3a"/>` +
    `<g fill="#8a5a3a"><rect x="30" y="105" width="10" height="16"/><rect x="46" y="105" width="10" height="16"/><rect x="62" y="105" width="10" height="16"/></g>` +
    `<rect x="16" y="150" width="68" height="6" fill="#c9a877"/></g>` +
    `<g><rect x="300" y="105" width="46" height="45" fill="#e8dcc0"/><path d="M296,105L323,82L350,105z" fill="#6b5330"/>` +
    `<g fill="#6b5330"><rect x="308" y="118" width="8" height="12"/><rect x="322" y="118" width="8" height="12"/><rect x="336" y="118" width="8" height="12"/></g></g>` +
    `<g fill="#3f7a3f"><path d="M8,150c-6,-8 -4,-16 2,-18c4,7 3,14 -2,18z"/><path d="M368,150c6,-8 4,-16 -2,-18c-4,7 -3,14 2,18z"/></g>` +
    `<g stroke="#8a5a3a" stroke-width="1.4" fill="none"><line x1="0" y1="180" x2="400" y2="180"/></g>`,

  /** カルデラ湖と船。トバ湖畔。 */
  lake:
    sky("#8fc4e8", "#cfe4f0", 96) +
    hills(96, "#5f7a44", 5) +
    water(96, 80, "#3f8fc4") +
    ripples(120) +
    ripples(150, "#9fd4e8") +
    ground(176, "#3f7a3f") +
    `<path d="M150,176c10,-40 40,-70 60,-70c20,0 50,30 60,70z" fill="#7f8f5c"/>` +
    `<path d="M170,176c6,-24 20,-40 30,-40c10,0 24,16 30,40z" fill="#5f7a44"/>` +
    `<g><rect x="30" y="150" width="20" height="8" fill="#8a5a3a"/><path d="M25,150l5,-14h10l5,14z" fill="#3a2f24"/></g>` +
    `<g><rect x="330" y="160" width="18" height="7" fill="#8a5a3a"/><path d="M326,160l4,-11h10l4,11z" fill="#3a2f24"/></g>` +
    `<path d="M60,168h30l-3,6H63z" fill="#6b5330"/>` +
    `<g fill="#c8ccc4" opacity=".6"><ellipse cx="200" cy="60" rx="20" ry="8"/></g>` +
    `<g><rect x="185" y="150" width="16" height="12" fill="#c9a877"/><path d="M181,150L193,136L205,150z" fill="#3a2f24"/></g>` +
    `<g><rect x="215" y="156" width="14" height="10" fill="#c9a877"/><path d="M211,156L222,144L233,156z" fill="#3a2f24"/></g>` +
    gull(100, 40, 1) +
    gull(280, 55, 0.8) +
    `<g fill="#5f7a44"><ellipse cx="20" cy="176" rx="10" ry="4"/><ellipse cx="380" cy="178" rx="10" ry="4"/></g>`,

  /** 山あいの棚田と時計塔の町。ブキッティンギ・ワメナ。 */
  highland:
    sky("#8fc4e8", "#cfe4f0", 90) +
    hills(90, "#5f7a44", 4) +
    ground(120, "#7f8f5c") +
    ground(160, "#3f7a3f") +
    terraceRows(196, 5, 10, 130) +
    terraceRows(200, 4, 270, 392) +
    `<g><rect x="150" y="150" width="18" height="18" fill="#c9a877"/><path d="M146,150L159,132L172,150z" fill="#8a6a3a"/></g>` +
    `<g><rect x="200" y="158" width="16" height="16" fill="#c9a877"/><path d="M196,158L208,142L220,158z" fill="#8a6a3a"/></g>` +
    roundTree(30, 200, 12, "#4f8f4f") +
    roundTree(370, 205, 14, "#3f7a3f") +
    `<g fill="#c8ccc4" opacity=".7"><ellipse cx="80" cy="50" rx="16" ry="6"/><ellipse cx="330" cy="40" rx="20" ry="7"/></g>`,

  /** 起重機と船。パダン・アンボン・ジャヤプラ・スラバヤ。 */
  port:
    sky("#8fc4e8", "#cfe4f0", 130) +
    water(130, 46, "#1c6f7a") +
    ripples(146) +
    ground(176, "#3f7a3f") +
    crane(40, 176, 60) +
    crane(70, 176, 40, "#f5b31c") +
    `<path d="M300,176V130h60l10,20v26z" fill="#f2ece0"/>` +
    `<g fill="#e8443f"><rect x="300" y="150" width="60" height="6"/><rect x="300" y="162" width="60" height="6"/></g>` +
    `<path d="M0,176h150v10H0z" fill="#8a5a3a"/>` +
    `<g fill="#f6efe2" opacity=".9"><path d="M120,150h20l-3,10h-14z"/></g>` +
    palm(370, 208, 26, 3) +
    `<g fill="#c8ccc4" opacity=".7"><ellipse cx="90" cy="40" rx="18" ry="7"/></g>`,

  /** 坑口とトロッコ。サワルント。 */
  mine:
    sky("#8fc4e8", "#cfe4f0", 100) +
    hills(100, "#5f7a44", 4) +
    ground(130, "#7f8f5c") +
    ground(168, "#5a4a38") +
    `<path d="M40,168V130a24,24 0 0 1 48,0v38z" fill="#4a3c30"/>` +
    `<ellipse cx="64" cy="130" rx="17" ry="17" fill="#1a1512"/>` +
    `<g stroke="#3a2f24" stroke-width="2"><line x1="0" y1="190" x2="400" y2="190"/><line x1="0" y1="200" x2="400" y2="200"/></g>` +
    `<g stroke="#8f96a0" stroke-width="1.4"><line x1="10" y1="190" x2="10" y2="200"/><line x1="30" y1="190" x2="30" y2="200"/><line x1="50" y1="190" x2="50" y2="200"/><line x1="70" y1="190" x2="70" y2="200"/><line x1="330" y1="190" x2="330" y2="200"/><line x1="350" y1="190" x2="350" y2="200"/><line x1="370" y1="190" x2="370" y2="200"/></g>` +
    `<g><rect x="300" y="176" width="30" height="14" fill="#6b5330"/><circle cx="306" cy="192" r="4" fill="#3a2f24"/><circle cx="324" cy="192" r="4" fill="#3a2f24"/></g>` +
    `<rect x="300" y="168" width="30" height="8" fill="#8f96a0"/>`,

  /** 川船と橋。パレンバン・サマリンダ。 */
  river:
    sky("#8fc4e8", "#cfe4f0", 130) +
    hills(130, "#5f7a44", 3) +
    water(130, 46, "#1c6f7a") +
    ripples(146) +
    ripples(160, "#9fd4e8") +
    ground(176, "#3f7a3f") +
    `<path d="M40,130q160,-56 320,0" fill="none" stroke="#8f96a0" stroke-width="5"/>` +
    `<g stroke="#8f96a0" stroke-width="2"><line x1="80" y1="120" x2="80" y2="140"/><line x1="200" y1="102" x2="200" y2="130"/><line x1="320" y1="120" x2="320" y2="140"/></g>` +
    `<g><rect x="30" y="150" width="26" height="8" fill="#8a5a3a"/><path d="M24,150l6,-13h14l6,13z" fill="#3a2f24"/></g>` +
    `<g><rect x="330" y="158" width="22" height="7" fill="#8a5a3a"/><path d="M325,158l5,-11h12l5,11z" fill="#3a2f24"/></g>` +
    palm(15, 200, 24, 3) +
    palm(380, 205, 22, -3),

  /** フェリー船と海峡。バカウヘニ・メラック・ギリマヌク。 */
  ferry:
    sky("#8fc4e8", "#cfe4f0", 128) +
    hills(128, "#5f7a44", 3) +
    water(128, 48, "#1c6f7a") +
    ripples(146) +
    ripples(162, "#9fd4e8") +
    ground(176, "#3f7a3f") +
    `<g><path d="M20,166h64l-6,12H26z" fill="#f2ece0"/><rect x="34" y="150" width="20" height="16" fill="#3f8fc4"/><rect x="42" y="140" width="3" height="12" fill="#4a4a52"/></g>` +
    `<g opacity=".8"><path d="M310,170h50l-5,9h-40z" fill="#e8dcc0"/><rect x="322" y="158" width="14" height="12" fill="#5b8fe8"/></g>` +
    volcanoShape(360, 128, 40, 30, "#7f8f5c", true) +
    `<g fill="#c8ccc4" opacity=".7"><ellipse cx="130" cy="50" rx="18" ry="7"/></g>` +
    palm(390, 208, 24, -3),

  /** モナスと高層ビル群。ジャカルタ。 */
  capital:
    sky("#8fc4e8", "#20364a", 110) +
    ground(110, "#5a6068") +
    ground(160, "#3f7a3f") +
    `<g fill="#8f96a0"><rect x="10" y="60" width="24" height="50"/><rect x="40" y="40" width="20" height="70"/><rect x="330" y="50" width="22" height="60"/><rect x="358" y="70" width="20" height="40"/></g>` +
    `<g fill="#c8ccc4" opacity=".8"><rect x="14" y="66" width="4" height="4"/><rect x="22" y="66" width="4" height="4"/><rect x="14" y="76" width="4" height="4"/><rect x="22" y="76" width="4" height="4"/><rect x="44" y="50" width="4" height="4"/><rect x="52" y="50" width="4" height="4"/><rect x="44" y="60" width="4" height="4"/></g>` +
    `<path d="M182,176V64l4,-10l4,10v112z" fill="#e8e0cc"/>` +
    `<path d="M182,63q4,-10 8,0q-4,4 -8,0z" fill="#f5b31c"/>` +
    `<rect x="0" y="176" width="400" height="6" fill="#6b5330"/>` +
    `<g fill="#c8ccc4" opacity=".7"><ellipse cx="90" cy="30" rx="20" ry="7"/></g>` +
    `<g fill="#e8443f"><rect x="0" y="182" width="400" height="3"/></g>` +
    `<g fill="#c8ccc4" opacity=".85"><rect x="66" y="80" width="4" height="4"/><rect x="74" y="80" width="4" height="4"/><rect x="66" y="90" width="4" height="4"/><rect x="74" y="90" width="4" height="4"/></g>` +
    `<g fill="#8f96a0" opacity=".9"><rect x="120" y="120" width="14" height="56"/><rect x="250" y="100" width="16" height="76"/></g>` +
    `<g fill="#5a6068"><rect x="30" y="176" width="10" height="6"/><rect x="90" y="176" width="10" height="6"/><rect x="280" y="176" width="10" height="6"/></g>`,

  /** 丘の上のアール・デコ建築。バンドン。 */
  hillcity:
    sky("#8fc4e8", "#cfe4f0", 100) +
    hills(100, "#5f7a44", 4) +
    hills(120, "#7f8f5c", 3) +
    ground(150, "#3f7a3f") +
    `<g><rect x="30" y="120" width="50" height="30" fill="#e8dcc0"/><path d="M26,120l24,-18l24,18z" fill="#c9a877"/>` +
    `<g stroke="#8a5a3a" stroke-width="1.2"><line x1="42" y1="120" x2="42" y2="150"/><line x1="58" y1="120" x2="58" y2="150"/></g></g>` +
    `<g><rect x="300" y="128" width="40" height="24" fill="#f2ece0"/><path d="M296,128l24,-16l24,16z" fill="#8a5a3a"/></g>` +
    `<g fill="#3f7a3f"><path d="M12,150c-6,-9 -4,-18 2,-20c5,7 3,15 -2,20z"/></g>` +
    roundTree(370, 155, 12, "#4f8f4f") +
    `<g fill="#c8ccc4" opacity=".7"><ellipse cx="150" cy="40" rx="16" ry="6"/></g>`,

  /** 宮殿の楼閣とプンドポ。ジョグジャカルタ。 */
  palace:
    sky("#8fc4e8", "#cfe4f0", 120) +
    ground(120, "#7f8f5c") +
    ground(160, "#3f7a3f") +
    `<g><path d="M30,150L70,110L110,150z" fill="#3a2f24"/><path d="M40,150L70,120L100,150z" fill="#8a5a3a"/><rect x="46" y="150" width="48" height="14" fill="#c9a877"/></g>` +
    `<g><path d="M290,158L330,128L370,158z" fill="#3a2f24"/><rect x="300" y="158" width="60" height="10" fill="#c9a877"/></g>` +
    `<g stroke="#8a5a3a" stroke-width="2"><line x1="54" y1="150" x2="54" y2="164"/><line x1="70" y1="150" x2="70" y2="164"/><line x1="86" y1="150" x2="86" y2="164"/></g>` +
    volcanoShape(50, 120, 40, 30, "#7f8f5c", false) +
    `<g fill="#e8443f" opacity=".85"><circle cx="20" cy="160" r="3"/><circle cx="380" cy="164" r="3"/></g>` +
    `<g fill="#c9a877"><rect x="4" y="140" width="4" height="24"/><rect x="392" y="144" width="4" height="24"/></g>` +
    `<g fill="#f5b31c" opacity=".9"><path d="M4,140h4l-2,-8z"/><path d="M392,144h4l-2,-8z"/></g>` +
    `<g fill="#3a2f24" opacity=".8"><rect x="200" y="164" width="6" height="10"/></g>` +
    `<g fill="#c8ccc4" opacity=".65"><ellipse cx="150" cy="40" rx="16" ry="6"/></g>`,

  /** 仏塔(ストゥーパ)。ボロブドゥール。 */
  temple:
    sky("#8fc4e8", "#cfe4f0", 110) +
    hills(110, "#5f7a44", 4) +
    ground(140, "#3f7a3f") +
    `<path d="M20,140c0,-30 40,-40 50,-40c10,0 50,10 50,40z" fill="#8f8a78"/>` +
    `<circle cx="45" cy="86" r="10" fill="#9a9488"/><circle cx="45" cy="70" r="4" fill="#9a9488"/>` +
    `<g fill="#8f8a78" opacity=".9"><circle cx="20" cy="102" r="5"/><circle cx="72" cy="98" r="5"/></g>` +
    `<path d="M290,150c0,-24 32,-32 40,-32c8,0 40,8 40,32z" fill="#7a7568"/>` +
    `<circle cx="330" cy="106" r="8" fill="#8a8478"/>` +
    `<g fill="#9a9488" opacity=".8"><rect x="10" y="140" width="10" height="10"/><rect x="380" y="150" width="10" height="10"/></g>` +
    volcanoShape(200, 110, 50, 34, "#5f7a44", true) +
    roundTree(35, 145, 10, "#4f8f4f") +
    roundTree(365, 155, 11, "#3f7a3f") +
    `<g fill="#8f8a78" opacity=".85"><circle cx="45" cy="80" r="4"/><circle cx="60" cy="90" r="3"/></g>` +
    `<g fill="#c8ccc4" opacity=".6"><ellipse cx="150" cy="35" rx="16" ry="6"/></g>` +
    `<circle cx="45" cy="66" r="1.8" fill="#f5b31c"/>`,

  /** 蝋描きの文様と宮廷の柱廊。ソロ。 */
  batik:
    sky("#8fc4e8", "#cfe4f0", 130) +
    ground(130, "#3a2f24") +
    `<g fill="#e8c060" opacity=".9">` +
    Array.from({ length: 6 })
      .map((_, i) => `<circle cx="${20 + i * 15}" cy="150" r="4"/>`)
      .join("") +
    Array.from({ length: 6 })
      .map((_, i) => `<circle cx="${300 + i * 15}" cy="160" r="4"/>`)
      .join("") +
    `</g>` +
    `<g><rect x="140" y="160" width="120" height="20" fill="#c9a877"/>` +
    `<g stroke="#8a5a3a" stroke-width="2"><line x1="150" y1="160" x2="150" y2="180"/><line x1="170" y1="160" x2="170" y2="180"/><line x1="190" y1="160" x2="190" y2="180"/><line x1="210" y1="160" x2="210" y2="180"/><line x1="230" y1="160" x2="230" y2="180"/><line x1="250" y1="160" x2="250" y2="180"/></g>` +
    `<path d="M136,160L200,138L264,160z" fill="#8a5a3a"/></g>` +
    `<g fill="#e8443f" opacity=".8"><circle cx="60" cy="120" r="6"/><circle cx="340" cy="115" r="6"/></g>`,

  /** 噴煙を上げる火山。ブロモ山・テルナテ。 */
  volcano:
    sky("#8fc4e8", "#cfe4f0", 130) +
    hills(130, "#7f8f5c", 3) +
    ground(150, "#8f8a78") +
    ground(176, "#3f7a3f") +
    volcanoShape(200, 150, 90, 70) +
    volcanoShape(80, 150, 50, 34, "#5f7a44", false) +
    volcanoShape(330, 150, 44, 30, "#5f7a44", false) +
    `<g fill="#c8ccc4" opacity=".65"><ellipse cx="60" cy="40" rx="16" ry="6"/><ellipse cx="330" cy="34" rx="20" ry="7"/></g>` +
    `<g fill="#8a8478" opacity=".8"><ellipse cx="90" cy="170" rx="30" ry="4"/><ellipse cx="300" cy="176" rx="34" ry="4"/></g>` +
    `<g><rect x="40" y="164" width="14" height="10" fill="#c9a877"/><path d="M36,164L47,152L58,164z" fill="#8a6a3a"/></g>` +
    `<g><rect x="340" y="168" width="14" height="10" fill="#c9a877"/><path d="M336,168L347,156L358,168z" fill="#8a6a3a"/></g>` +
    gull(160, 40, 1) +
    gull(250, 30, 0.8) +
    `<circle cx="200" cy="90" r="2" fill="#e8443f" opacity=".8"/>`,

  /** 青い炎の火口。バニュワンギ(イジェン山)。 */
  bluefire:
    sky("#1a1a30", "#2a2440", 130) +
    hills(130, "#2a2440", 3) +
    ground(150, "#3a2f24") +
    ground(176, "#241f1a") +
    volcanoShape(200, 150, 90, 70, "#241f1a", false) +
    `<g fill="#5b8fe8" opacity=".9"><path d="M180,150q-4,-16 6,-24q0,10 8,13q-3,8 -14,11z"/><path d="M200,150q3,-12 12,-14q-2,8 3,11q-6,5 -15,3z"/><path d="M215,150q4,-14 13,-16q-1,9 5,12q-6,6 -18,4z"/></g>` +
    `<g fill="#f6efe2" opacity=".9"><circle cx="60" cy="30" r="1.4"/><circle cx="90" cy="45" r="1"/><circle cx="330" cy="25" r="1.4"/><circle cx="360" cy="50" r="1"/></g>` +
    `<g fill="#4a4a52"><rect x="40" y="160" width="16" height="12"/><rect x="340" y="164" width="16" height="12"/></g>` +
    `<g fill="#e8443f" opacity=".9"><circle cx="48" cy="158" r="1.6"/><circle cx="348" cy="162" r="1.6"/></g>` +
    `<g stroke="#5a4a30" stroke-width="1.4"><line x1="30" y1="176" x2="30" y2="160"/><line x1="370" y1="178" x2="370" y2="162"/></g>` +
    `<g fill="#241f1a" opacity=".9"><ellipse cx="100" cy="176" rx="20" ry="4"/><ellipse cx="290" cy="180" rx="24" ry="4"/></g>`,

  /** 割れ門(チャンディ・ブンタル)。デンパサール。 */
  baligate:
    sky("#8fc4e8", "#cfe4f0", 100) +
    hills(100, "#7f8f5c", 3) +
    ground(130, "#3f7a3f") +
    `<g><path d="M20,176V110l16,-34h9v100z" fill="#8a5a3a"/><path d="M100,176V110l-16,-34h-9v100z" fill="#8a5a3a"/>` +
    `<g fill="#c9a877"><rect x="20" y="110" width="25" height="8"/><rect x="55" y="110" width="25" height="8"/></g></g>` +
    `<g fill="#3a2f24" opacity=".85"><rect x="27" y="130" width="4" height="20"/><rect x="90" y="130" width="4" height="20"/></g>` +
    palm(150, 200, 26, -3) +
    palm(360, 205, 24, 3) +
    `<g fill="#e8443f"><path d="M150,150c-4,-8 -12,-8 -12,-2c0,4 6,8 12,10c6,-2 12,-6 12,-10c0,-6 -8,-6 -12,2z" opacity=".85"/></g>` +
    terraceRows(200, 3, 200, 340, "#c9dc7a", "#8fa84f"),

  /** 棚田。ウブド。 */
  riceterrace:
    sky("#8fc4e8", "#cfe4f0", 90) +
    hills(90, "#5f7a44", 4) +
    ground(120, "#7f8f5c") +
    terraceRows(206, 9, 0, 400, "#c9dc7a", "#8fa84f") +
    `<g><rect x="30" y="150" width="18" height="14" fill="#c9a877"/><path d="M26,150L39,134L52,150z" fill="#8a6a3a"/></g>` +
    palm(360, 190, 26, -3) +
    roundTree(20, 195, 10, "#3f7a3f") +
    `<g fill="#8fa84f" opacity=".8"><ellipse cx="200" cy="200" rx="20" ry="4"/></g>` +
    `<g fill="#c8ccc4" opacity=".7"><ellipse cx="330" cy="40" rx="18" ry="7"/></g>`,

  /** コモドドラゴンと乾いた丘。ラブアンバジョ。 */
  dragon:
    sky("#8fc4e8", "#d8e8c8", 120) +
    hills(120, "#9a9060", 4) +
    ground(150, "#b0a870") +
    water(176, 34, "#1c6f7a") +
    ripples(190) +
    `<g fill="#7a8050"><path d="M60,150c8,-10 24,-16 44,-10c6,2 12,0 16,-6l-3,9c3,3 3,9 -3,9c-10,9 -40,9 -54,-2z"/></g>` +
    `<circle cx="102" cy="138" r="2.4" fill="#1a1512"/>` +
    `<g fill="#5f6438"><path d="M66,158l-6,10M76,160l-4,10M86,160l0,10"/></g>` +
    `<g fill="#e8804a"><path d="M320,176c0,-16 4,-24 6,-24c2,6 -2,16 0,24z"/><path d="M340,176c0,-12 4,-18 6,-18c2,4 -2,12 0,18z"/></g>` +
    roundTree(350, 150, 9, "#7f8f5c") +
    `<g fill="#9a9060" opacity=".85"><ellipse cx="30" cy="176" rx="10" ry="4"/><ellipse cx="360" cy="182" rx="12" ry="4"/></g>` +
    gull(200, 40, 1) +
    gull(230, 55, 0.8) +
    `<g fill="#8a8050"><circle cx="40" cy="140" r="3"/><circle cx="55" cy="145" r="2.4"/></g>` +
    `<g fill="#c8ccc4" opacity=".7"><ellipse cx="90" cy="45" rx="16" ry="6"/></g>`,

  /** 三色の火口湖。エンデ(クリムトゥ)。 */
  crater:
    sky("#8fc4e8", "#cfe4f0", 110) +
    hills(110, "#7a7568", 3) +
    ground(140, "#8f8a78") +
    `<path d="M20,178c4,-30 20,-46 30,-46c10,0 24,16 28,46z" fill="#9a9488"/>` +
    `<ellipse cx="50" cy="172" rx="18" ry="8" fill="#3f8fc4"/>` +
    `<path d="M290,180c4,-26 18,-40 26,-40c8,0 22,14 26,40z" fill="#9a9488"/>` +
    `<ellipse cx="316" cy="174" rx="16" ry="7" fill="#4f9f5a"/>` +
    `<path d="M340,182c3,-20 14,-30 20,-30c6,0 17,10 20,30z" fill="#8a8478"/>` +
    `<ellipse cx="360" cy="178" rx="12" ry="5" fill="#2a2440"/>` +
    `<g fill="#c8ccc4" opacity=".8"><ellipse cx="50" cy="140" rx="10" ry="4"/><ellipse cx="316" cy="130" rx="10" ry="4"/></g>` +
    ground(190, "#3f7a3f") +
    `<g fill="#5f7a44"><rect x="10" y="185" width="6" height="10"/><rect x="380" y="188" width="6" height="10"/></g>` +
    gull(200, 30, 1) +
    gull(230, 42, 0.8) +
    `<g fill="#8a8478" opacity=".8"><circle cx="34" cy="182" r="3"/><circle cx="370" cy="188" r="3"/></g>` +
    `<path d="M60,196q20,-6 40,0" fill="none" stroke="#8fa84f" stroke-width="1.4"/>`,

  /** イカット織の文様と馬。ワインガプ。 */
  ikat:
    sky("#8fc4e8", "#cfe4f0", 120) +
    hills(120, "#c9b878", 4) +
    ground(150, "#d8cc94") +
    ground(178, "#3f7a3f") +
    `<g fill="#8a5a3a"><path d="M20,176c0,-12 5,-22 9,-22c1,4 -3,10 -3,17c4,-6 7,-13 12,-15c1,3 -2,9 -6,13c5,-2 9,-6 13,-3c-2,4 -8,7 -13,8c4,3 9,2 10,6c-4,2 -12,0 -16,-4c-1,4 1,7 -1,10c-3,-2 -5,-6 -5,-10z"/></g>` +
    `<circle cx="24" cy="150" r="2" fill="#1a1512"/>` +
    `<g stroke="#c9714a" stroke-width="2" fill="none"><path d="M280,178q10,-14 20,-14t20,14"/><path d="M330,178q10,-14 20,-14t20,14"/></g>` +
    `<g fill="#c9714a"><circle cx="290" cy="150" r="3"/><circle cx="310" cy="150" r="3"/><circle cx="340" cy="150" r="3"/><circle cx="360" cy="150" r="3"/></g>` +
    sun(40, 40, 14) +
    `<g fill="#d8cc94" opacity=".8"><ellipse cx="200" cy="188" rx="60" ry="6"/></g>` +
    `<g stroke="#8a5a3a" stroke-width="1.4" fill="none"><path d="M120,180q8,-8 16,0"/><path d="M150,182q8,-8 16,0"/></g>` +
    `<circle cx="360" cy="60" r="2" fill="#f6efe2"/>`,

  /** 赤道記念塔。ポンティアナック。 */
  equator:
    sky("#8fc4e8", "#cfe4f0", 130) +
    hills(130, "#5f7a44", 3) +
    water(130, 30, "#1c6f7a") +
    ground(160, "#3f7a3f") +
    `<rect x="195" y="30" width="10" height="130" fill="#c8ccc4"/>` +
    `<g stroke="#8f96a0" stroke-width="2.4"><line x1="170" y1="60" x2="230" y2="60"/><line x1="160" y1="90" x2="240" y2="90"/></g>` +
    `<circle cx="200" cy="28" r="6" fill="#f5b31c"/>` +
    `<g fill="#e8443f" opacity=".85"><rect x="192" y="160" width="16" height="6"/></g>` +
    `<g><rect x="330" y="150" width="20" height="8" fill="#8a5a3a"/><path d="M325,150l5,-12h10l5,12z" fill="#3a2f24"/></g>` +
    palm(30, 190, 24, 3) +
    palm(370, 195, 22, -3),

  /** 沖合の掘削基地。バリクパパン。 */
  oilrig:
    sky("#8fc4e8", "#cfe4f0", 130) +
    water(130, 46, "#1c6f7a") +
    ripples(148) +
    ground(176, "#3f7a3f") +
    `<path d="M40,176V150l10,-34h60l10,34v26z" fill="none" stroke="#8f96a0" stroke-width="2"/>` +
    `<rect x="60" y="98" width="20" height="20" fill="#e8443f"/>` +
    `<path d="M70,98v-14" stroke="#e8443f" stroke-width="2.4"/>` +
    `<g fill="#f5b31c" opacity=".9"><path d="M70,84q4,-10 0,-16q-4,6 0,16z"/></g>` +
    `<path d="M310,176V158l6,-20h40l6,20v18z" fill="none" stroke="#8f96a0" stroke-width="2"/>` +
    `<rect x="322" y="116" width="14" height="16" fill="#c8ccc4"/>` +
    crane(360, 176, 30, "#e8443f") +
    `<g fill="#8f96a0" opacity=".7"><ellipse cx="200" cy="180" rx="60" ry="4"/></g>` +
    gull(120, 50, 1) +
    gull(150, 40, 0.8) +
    ripples(190, "#9fd4e8") +
    `<g fill="#c8ccc4" opacity=".7"><ellipse cx="330" cy="40" rx="18" ry="6"/></g>` +
    `<rect x="55" y="88" width="30" height="10" fill="#8f96a0"/>` +
    `<circle cx="70" cy="94" r="3" fill="#e8443f"/>`,

  /** 水上マーケットの舟。バンジャルマシン。 */
  floatingmarket:
    sky("#8fc4e8", "#cfe4f0", 108) +
    hills(108, "#5f7a44", 3) +
    water(108, 68, "#1c6f7a") +
    ripples(130) +
    ripples(150, "#9fd4e8") +
    ground(176, "#3f7a3f") +
    stallRow(160, 3, 42, 26, ["#e8443f", "#f5b31c", "#3f8fc4"]) +
    stallRow(168, 3, 40, 270, ["#3f8fc4", "#e8443f", "#f5b31c"]) +
    `<g fill="#8a5a3a" opacity=".9"><ellipse cx="90" cy="172" rx="30" ry="5"/><ellipse cx="330" cy="180" rx="28" ry="5"/></g>` +
    `<g fill="#e8804a"><circle cx="60" cy="150" r="3"/><circle cx="70" cy="150" r="3"/><circle cx="300" cy="158" r="3"/></g>`,

  /** オランウータンの森。パランカラヤ。 */
  orangutan:
    sky("#8fc4e8", "#cfe4f0", 96) +
    hills(96, "#3f7a3f", 4) +
    ground(120, "#3f7a3f") +
    roundTree(30, 176, 24, "#2f6a2f") +
    roundTree(70, 190, 16, "#3f7a3f") +
    roundTree(340, 180, 22, "#2f6a2f") +
    roundTree(375, 195, 14, "#3f7a3f") +
    `<circle cx="180" cy="150" r="9" fill="#c9713a"/>` +
    `<circle cx="180" cy="149" r="5.4" fill="#e8dcc0"/>` +
    `<g fill="#1a1512"><circle cx="178" cy="148" r="1.2"/><circle cx="183" cy="148" r="1.2"/></g>` +
    `<path d="M170,144q-4,8 2,16M190,144q4,8 -2,16" fill="none" stroke="#c9713a" stroke-width="4" stroke-linecap="round"/>` +
    water(196, 14, "#1c6f7a") +
    `<g fill="#8a5a3a"><rect x="330" y="182" width="30" height="7"/></g>`,

  /** 市場の屋台。マナド。 */
  market:
    sky("#8fc4e8", "#cfe4f0", 110) +
    hills(110, "#5f7a44", 3) +
    ground(140, "#3f7a3f") +
    stallRow(176, 3, 40, 24, ["#e8443f", "#f5b31c", "#3f8fc4"]) +
    stallRow(180, 3, 40, 270, ["#3f8fc4", "#e8443f", "#f5b31c"]) +
    `<g fill="#3f7a3f"><circle cx="40" cy="164" r="3"/><circle cx="46" cy="164" r="3"/><circle cx="52" cy="164" r="3"/></g>` +
    `<g fill="#e8443f"><circle cx="290" cy="170" r="3"/><circle cx="296" cy="170" r="3"/></g>` +
    water(190, 20, "#1c6f7a") +
    ripples(198),

  /** 高床の水上家屋。ゴロンタロ。 */
  stilthouse:
    sky("#8fc4e8", "#cfe4f0", 130) +
    water(130, 46, "#1c6f7a") +
    ripples(148) +
    ripples(164, "#9fd4e8") +
    stiltRow(178, 4, 34, 20) +
    stiltRow(184, 3, 36, 268) +
    `<g stroke="#5a4020" stroke-width="1.4"><line x1="46" y1="176" x2="286" y2="182"/></g>` +
    palm(360, 200, 24, -3),

  /** ピニシ帆船。マカッサル。 */
  phinisi:
    sky("#8fc4e8", "#cfe4f0", 130) +
    water(130, 46, "#1c6f7a") +
    ripples(148) +
    ground(176, "#3f7a3f") +
    `<path d="M20,166h90l-8,12H30z" fill="#8a5a3a"/>` +
    `<path d="M40,166V110l50,26z" fill="#f2ece0"/>` +
    `<path d="M70,166V122l30,32z" fill="#e8dcc0"/>` +
    `<rect x="38" y="98" width="2.4" height="68" fill="#5a4020"/>` +
    `<g opacity=".85"><path d="M310,172h60l-5,8h-50z" fill="#c9a877"/><path d="M325,172V140l25,20z" fill="#e8dcc0"/></g>` +
    `<g fill="#c8ccc4" opacity=".7"><ellipse cx="200" cy="40" rx="20" ry="7"/><ellipse cx="240" cy="55" rx="14" ry="5"/></g>` +
    gull(120, 60, 1.1) +
    gull(150, 48, 0.9) +
    gull(270, 70, 1) +
    `<g fill="#8a5a3a" opacity=".9"><rect x="150" y="176" width="16" height="8"/><rect x="230" y="180" width="20" height="8"/></g>` +
    ripples(178, "#9fd4e8") +
    `<circle cx="60" cy="98" r="2" fill="#e8443f"/><circle cx="330" cy="140" r="2" fill="#e8443f"/>`,

  /** 舟形屋根の家(トンコナン)。タナトラジャ。 */
  tongkonan:
    sky("#8fc4e8", "#cfe4f0", 100) +
    hills(100, "#5f7a44", 4) +
    ground(140, "#3f7a3f") +
    boatRoof(50, 170, 70, 46) +
    `<rect x="30" y="164" width="40" height="14" fill="#c9a877"/>` +
    `<g stroke="#e8443f" stroke-width="1.4"><line x1="36" y1="166" x2="36" y2="176"/><line x1="64" y1="166" x2="64" y2="176"/></g>` +
    boatRoof(320, 178, 56, 36) +
    `<rect x="304" y="174" width="32" height="10" fill="#c9a877"/>` +
    `<g fill="#8a5a3a"><rect x="150" y="176" width="6" height="10"/><rect x="244" y="176" width="6" height="10"/></g>` +
    `<g fill="#3f7a3f" opacity=".8"><ellipse cx="200" cy="188" rx="26" ry="4"/></g>` +
    boatRoof(90, 176, 34, 22) +
    `<rect x="78" y="172" width="24" height="8" fill="#c9a877"/>` +
    `<g fill="#c8ccc4" opacity=".8"><path d="M280,190c6,-4 14,-4 18,2c-4,3 -14,3 -18,-2z"/></g>` +
    `<circle cx="286" cy="185" r="1.4" fill="#1a1512"/>` +
    `<g fill="#c8ccc4" opacity=".7"><ellipse cx="60" cy="45" rx="16" ry="6"/></g>`,

  /** 極楽鳥の森。ソロン。 */
  birdparadise:
    sky("#8fc4e8", "#cfe4f0", 90) +
    hills(90, "#2f6a2f", 4) +
    ground(120, "#3f7a3f") +
    roundTree(30, 190, 26, "#2f6a2f") +
    roundTree(370, 195, 24, "#3f7a3f") +
    `<path d="M60,150c0,-6 4,-11 9,-11c4,0 8,4 8,9c0,4 -4,6 -8,6c-1,4 -6,6 -9,4c1,-3 3,-5 0,-8z" fill="#3a2f24"/>` +
    `<g fill="#f5b31c"><path d="M77,148q9,-3 12,3q-8,1 -12,-3z"/><path d="M77,148q10,1 10,9q-9,-1 -10,-9z"/></g>` +
    `<circle cx="65" cy="145" r="1.4" fill="#1a1512"/>` +
    water(200, 10, "#1c6f7a") +
    roundTree(90, 200, 16, "#2f6a2f") +
    roundTree(320, 190, 14, "#3f7a3f") +
    `<g fill="#3a2f24" opacity=".9"><path d="M300,140c0,-5 3,-9 7,-9c3,0 6,3 6,7c0,3 -3,5 -6,5c-1,3 -4,4 -7,3c1,-2 2,-4 0,-6z"/></g>` +
    `<g fill="#e8443f"><path d="M313,138q6,-2 8,2q-5,1 -8,-2z"/></g>` +
    `<g fill="#c8ccc4" opacity=".7"><ellipse cx="180" cy="50" rx="16" ry="6"/></g>`,

  /** サンゴ礁と魚。クパン・ブナケン・ワカトビ・ワイサイ。 */
  reef:
    sky("#8fc4e8", "#bfe8f4", 96) +
    water(96, 24, "#3f8fc4") +
    ripples(104) +
    water(120, 90, "#1c6f7a") +
    coralCluster(50, 210, 1.3) +
    coralCluster(90, 210, 1) +
    coralCluster(310, 210, 1.2) +
    coralCluster(350, 210, 0.9) +
    `<g fill="#f5b31c"><path d="M40,150q4,-3 8,0q-4,3 -8,0z"/><circle cx="49" cy="150" r="1"/></g>` +
    `<g fill="#e8443f"><path d="M320,170q5,-3 9,0q-5,3 -9,0z"/><circle cx="330" cy="170" r="1"/></g>` +
    `<g fill="#5b8fe8" opacity=".85"><path d="M70,190q4,-3 8,0q-4,3 -8,0z"/></g>`,
};
