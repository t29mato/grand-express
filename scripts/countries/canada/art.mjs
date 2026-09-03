/**
 * カナダの都市イラスト。
 *
 * `CANADA_MARKS` は24×24の座標系に描くシンボル、`CANADA_BG` は400×210の
 * 座標系に描く背景シーン(いずれもSVG断片の文字列)。フランス・韓国と同じく
 * 最初から文字列として持つ。動きは含めない(アニメーションはReact側で重ねる)。
 *
 * 色は他の盤面と揃える。空 #8fc4e8〜#cfe4f0、顔・白 #f6efe2、
 * 強調 #f5b31c/#e8443f/#5b8fe8。カナダらしさは
 * **国旗の朱 #c8102e・森の深緑 #1a5f3f・湖と海の青 #2f6ea8・
 * プレーリーの小麦色 #e8b23c・花崗岩の灰 #8b8f98** で出す。
 *
 * 鍵は `cities.mjs` の `mark` / `bg` と一対一で対応する。
 * 増やすときは両方を揃えること。
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
  // `to` が境界の84以下なら2色目の見える余地が無い。高さ0の <rect> を出さない。
  return band(0, 92, top) + (to > 84 ? band(84, to - 84, bottom) : "");
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

/** 花崗岩の山。ロッキー山脈らしく稜線が鋭く、雪をかぶる。 */
function rockyPeak(cx, base, h, fill = "#8b8f98") {
  const w = r1(h * 1.3);
  return (
    `<path d="M${r1(cx - w / 2)},${base}L${r1(cx - w * 0.12)},${r1(base - h)}L${r1(cx + w * 0.1)},${r1(base - h * 0.62)}L${r1(cx + w / 2)},${base}z" fill="${fill}"/>` +
    `<path d="M${r1(cx - w * 0.12)},${r1(base - h)}L${r1(cx - w * 0.02)},${r1(base - h * 0.8)}L${r1(cx + w * 0.04)},${r1(base - h * 0.86)}z" fill="#f2f6f8"/>`
  );
}

/** 針葉樹(ボレアル林・太平洋岸)。 */
function pine(x, base, h, fill = "#1a5f3f") {
  const w = r1(h * 0.6);
  return (
    `<rect x="${r1(x - 2)}" y="${r1(base - 8)}" width="4" height="8" fill="#5a4630"/>` +
    `<path d="M${r1(x - w / 2)},${r1(base - h * 0.32)}L${x},${r1(base - h * 0.62)}L${r1(x + w / 2)},${r1(base - h * 0.32)}z" fill="${fill}"/>` +
    `<path d="M${r1(x - w * 0.42)},${r1(base - h * 0.6)}L${x},${r1(base - h * 0.86)}L${r1(x + w * 0.42)},${r1(base - h * 0.6)}z" fill="${fill}"/>` +
    `<path d="M${r1(x - w * 0.3)},${r1(base - h * 0.84)}L${x},${r1(base - h)}L${r1(x + w * 0.3)},${r1(base - h * 0.84)}z" fill="${fill}"/>`
  );
}

/** 丸い樹冠の広葉樹(紅葉も表せるよう色を渡す)。 */
function roundTree(x, base, r, crown = "#c8783a", trunk = "#6b5330") {
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

/** 穀物エレベーター(サイロの並び)。プレーリーの象徴。 */
function grainElevator(x, base, h, w = 18, fill = "#c8b48a") {
  return (
    `<rect x="${r1(x - w / 2)}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${fill}"/>` +
    `<rect x="${r1(x - w / 2 - 4)}" y="${r1(base - h * 0.55)}" width="${r1(w * 0.28)}" height="${r1(h * 0.55)}" fill="${fill}" opacity=".85"/>` +
    `<rect x="${r1(x + w / 2 - r1(w * 0.24))}" y="${r1(base - h * 0.7)}" width="${r1(w * 0.24)}" height="${r1(h * 0.7)}" fill="${fill}" opacity=".85"/>` +
    `<rect x="${r1(x - w / 2)}" y="${r1(base - h)}" width="${w}" height="5" fill="#8a7860"/>`
  );
}

/** ドーム屋根の議事堂。 */
function domeBuilding(cx, base, w, h, fill = "#c8bda0", dome = "#8b8f98") {
  const hw = r1(w / 2);
  return (
    `<rect x="${r1(cx - hw)}" y="${r1(base - h * 0.6)}" width="${w}" height="${r1(h * 0.6)}" fill="${fill}"/>` +
    `<g fill="#7f8896"><rect x="${r1(cx - hw + 4)}" y="${r1(base - h * 0.5)}" width="6" height="10"/><rect x="${r1(cx - 3)}" y="${r1(base - h * 0.5)}" width="6" height="10"/><rect x="${r1(cx + hw - 10)}" y="${r1(base - h * 0.5)}" width="6" height="10"/></g>` +
    `<ellipse cx="${cx}" cy="${r1(base - h * 0.6)}" rx="${r1(hw * 0.42)}" ry="${r1(h * 0.28)}" fill="${dome}"/>` +
    `<rect x="${r1(cx - 2)}" y="${r1(base - h)}" width="4" height="${r1(h * 0.14)}" fill="${dome}"/>`
  );
}

/** ゴンドラの支柱と索道線(スキーリゾート)。 */
function gondolaLine(x1, y1, x2, y2, fill = "#4a4a52") {
  return (
    `<g stroke="${fill}" stroke-width="1.6"><path d="M${x1},${y1}L${x2},${y2}"/></g>` +
    `<g fill="#e8443f"><rect x="${r1((x1 + x2) / 2 - 5)}" y="${r1((y1 + y2) / 2 - 3)}" width="10" height="6" rx="1"/></g>`
  );
}

/** 荒野の岩塔(フードゥー)。BC内陸の乾いた渓谷。 */
function hoodoo(x, base, h, fill = "#c8916a") {
  const w = r1(h * 0.32);
  return (
    `<path d="M${r1(x - w / 2)},${base}L${r1(x - w * 0.36)},${r1(base - h * 0.8)}L${r1(x - w * 0.5)},${r1(base - h * 0.86)}L${x},${r1(base - h)}L${r1(x + w * 0.5)},${r1(base - h * 0.86)}L${r1(x + w * 0.36)},${r1(base - h * 0.8)}L${r1(x + w / 2)},${base}z" fill="${fill}"/>`
  );
}

/** ぶどう畑・果樹園の畝(横列)。 */
function orchardRows(x, y, w, rows = 3, color = "#5f8f4a") {
  const parts = [];
  for (let i = 0; i < rows; i++) {
    parts.push(`<path d="M${x},${r1(y + i * 8)}h${w}"/>`);
  }
  return `<g stroke="${color}" stroke-width="4" opacity=".8">${parts.join("")}</g>`;
}

export const CANADA_BASE_BG = {
  /**
   * 太平洋の入り江。バンクーバー専用。山と海が接する景観に、
   * ガラス張りの高層ビル群を重ねる。
   */
  coastal:
    sky("#8fc4e8", "#cfe4f0", 120) +
    clouds(80, 30, 1) +
    rockyPeak(340, 118, 60, "#7f8f9a") +
    rockyPeak(300, 122, 44, "#8b8f98") +
    ground(120, "#7f9f5f") +
    `<rect x="0" y="160" width="400" height="50" fill="#2f6ea8"/>` +
    ripples(174, "#bfe8f4") +
    `<g fill="#7f8896"><rect x="60" y="100" width="20" height="60"/><rect x="86" y="80" width="24" height="80"/><rect x="300" y="94" width="18" height="66"/></g>` +
    `<g fill="#bfe0f0" opacity=".6"><rect x="65" y="108" width="4" height="4"/><rect x="92" y="88" width="4" height="4"/><rect x="92" y="100" width="4" height="4"/><rect x="305" y="102" width="4" height="4"/></g>` +
    pine(20, 200, 30) +
    pine(378, 202, 26),

  /**
   * 州議事堂。ビクトリア・エドモントン・リジャイナ・ウィニペグ・
   * フレデリクトン。ドーム屋根の建物を中央やや左右に置く。
   */
  capitol:
    sky("#8fc4e8", "#cfe4f0", 128) +
    clouds(310, 28, 1) +
    hills(126, "#8fae7a") +
    ground(128, "#8fae63") +
    domeBuilding(90, 172, 120, 70) +
    roundTree(300, 198, 16, "#c8783a") +
    roundTree(340, 202, 13, "#3f8f4f") +
    `<path d="M0,196c60,-6 120,4 200,-2c80,-6 140,4 200,-2v16H0z" fill="#7f9f5f"/>`,

  /**
   * 山岳リゾート。ウィスラー・バンフ・レイクルイーズ・ジャスパー。
   * ロッキー山脈とゴンドラの索道線。
   */
  alpine:
    sky("#a8c8e0", "#e8f0f4", 140) +
    sun(40, 36, 16, "#f6efe2") +
    rockyPeak(120, 130, 100, "#8b8f98") +
    rockyPeak(230, 138, 78, "#9a9ea4") +
    rockyPeak(330, 128, 88, "#8b8f98") +
    ground(140, "#eef4f6") +
    gondolaLine(40, 168, 300, 78) +
    `<rect x="20" y="176" width="46" height="26" fill="#6b5330"/><path d="M14,176h58l-8,-12h-42z" fill="#4a4436"/>` +
    pine(340, 195, 26) +
    pine(370, 200, 22),

  /**
   * 乾いた渓谷。カムループス専用。フードゥーとセージの草地。
   */
  "desert-canyon":
    sky("#a8c8d8", "#e0e8dc", 128) +
    sun(340, 40, 20) +
    hoodoo(70, 128, 70) +
    hoodoo(110, 132, 50) +
    hoodoo(330, 130, 60) +
    ground(128, "#c8b48a") +
    `<rect x="0" y="176" width="400" height="34" fill="#3f7fae"/>` +
    ripples(190, "#bfe8f4") +
    `<g fill="#8a9a6a" opacity=".8"><circle cx="40" cy="190" r="5"/><circle cx="58" cy="196" r="4"/><circle cx="330" cy="188" r="5"/></g>`,

  /**
   * ぶどう畑・湖畔。ケロウナ専用。オカナガン湖と畝。
   */
  vineyard:
    sky("#8fc4e8", "#cfe4f0", 118) +
    clouds(320, 26, 1) +
    hills(116, "#8fae7a") +
    ground(118, "#a8bd6a") +
    orchardRows(20, 150, 110, 5) +
    orchardRows(260, 156, 120, 5) +
    `<rect x="0" y="182" width="400" height="28" fill="#3f8fc4"/>` +
    ripples(194, "#bfe8f4"),

  /**
   * ロデオ会場。カルガリー専用。幌馬車と摩天楼、油井の櫓。
   */
  rodeo:
    sky("#e8c890", "#f4e0b8", 150) +
    sun(50, 40, 18, "#f5b31c") +
    ground(150, "#c8a878") +
    `<g fill="#7f8896"><rect x="300" y="70" width="18" height="80"/><rect x="322" y="50" width="22" height="100"/><rect x="352" y="82" width="16" height="68"/></g>` +
    `<rect x="330" y="122" width="6" height="28" fill="#4a4a52"/><path d="M324,122h18l-9,-16z" fill="#4a4a52"/>` +
    `<g stroke="#8a5a30" stroke-width="4"><path d="M0,190h140M0,198h140"/></g>` +
    `<path d="M40,168c14,-6 30,-6 40,0l-6,10h-28z" fill="#e8443f"/><circle cx="48" cy="190" r="8" fill="#241a10"/><circle cx="72" cy="190" r="8" fill="#241a10"/>`,

  /**
   * プレーリーの穀倉地帯。メディシンハット・ブランドン。
   * 穀物エレベーターと地平線。
   */
  prairie:
    sky("#a8c8e0", "#e8f0d8", 150) +
    sun(340, 36, 18) +
    ground(150, "#e8b23c") +
    `<g stroke="#c89838" stroke-width="3" opacity=".7"><path d="M0,170h400M0,180h400M0,190h400"/></g>` +
    grainElevator(70, 176, 60) +
    grainElevator(100, 172, 46) +
    `<path d="M0,150L400,150" stroke="#4a4a52" stroke-width="1.5"/>` +
    `<g fill="#4a4a52"><rect x="30" y="146" width="3" height="6"/><rect x="130" y="146" width="3" height="6"/><rect x="230" y="146" width="3" height="6"/><rect x="330" y="146" width="3" height="6"/></g>`,

  /**
   * 川に橋の架かる町。サスカトゥーン専用。サウスサスカチュワン川と七つの橋。
   */
  riverbridges:
    sky("#8fc4e8", "#cfe4f0", 130) +
    clouds(70, 28, 1) +
    ground(130, "#e8b23c") +
    `<rect x="0" y="158" width="400" height="52" fill="#3f8fc4"/>` +
    ripples(172, "#bfe8f4") +
    `<g stroke="#8b8f98" stroke-width="3"><path d="M0,158c30,-10 60,-10 90,0M120,158c30,-10 60,-10 90,0M220,158c30,-10 60,-10 90,0M310,158c30,-10 60,-10 90,0"/></g>` +
    grainElevator(360, 156, 40, 14),

  /**
   * ツンドラ。チャーチル専用。ホッキョクグマとオーロラ。
   */
  tundra:
    sky("#5f7f9f", "#20364a", 140) +
    `<g opacity=".5" fill="#5b8fe8"><path d="M0,20c40,-14 80,10 120,-6c40,-14 80,10 120,-6c40,-14 80,10 120,-6v40H0z"/></g>` +
    `<g opacity=".4" fill="#7ae8c8"><path d="M0,32c50,-10 90,14 140,0c50,-14 90,10 140,-2c40,-8 80,8 120,-2v30H0z"/></g>` +
    ground(140, "#dfe8ee") +
    `<ellipse cx="90" cy="188" rx="30" ry="8" fill="#c8ccc4"/>` +
    `<g><ellipse cx="90" cy="176" rx="18" ry="12" fill="#f6efe2"/><circle cx="72" cy="172" r="8" fill="#f6efe2"/><circle cx="66" cy="171" r="2" fill="#241a10"/></g>` +
    `<ellipse cx="300" cy="192" rx="14" ry="5" fill="#c8ccc4" opacity=".8"/>`,

  /**
   * 湖港。サンダーベイ専用。スペリオル湖の穀物ターミナルと眠れる巨人。
   */
  lakeport:
    sky("#8fc4e8", "#cfe4f0", 130) +
    clouds(60, 26, 0.9) +
    `<path d="M280,130L340,60L390,130z" fill="#5f6a5a" opacity=".85"/>` +
    ground(130, "#8a9a6a") +
    `<rect x="0" y="164" width="400" height="46" fill="#2f6ea8"/>` +
    ripples(178, "#bfe8f4") +
    grainElevator(50, 162, 56) +
    grainElevator(84, 158, 42) +
    crane(120, 164, 40),

  /**
   * 運河の水門。スーセントマリー専用。電動水門とアルゴマ・スチールの高炉。
   */
  canallocks:
    sky("#9fb0b8", "#dfe4e0", 130) +
    ground(130, "#8a8478") +
    `<rect x="0" y="160" width="400" height="50" fill="#2f6ea8"/>` +
    `<g fill="#6b7280"><rect x="120" y="150" width="10" height="60"/><rect x="270" y="150" width="10" height="60"/></g>` +
    `<rect x="130" y="176" width="140" height="10" fill="#5b8fe8" opacity=".6"/>` +
    `<rect x="40" y="90" width="26" height="70" fill="#7f8896"/><rect x="30" y="80" width="46" height="12" fill="#6b7280"/>` +
    `<circle cx="300" cy="60" r="14" fill="#c8ccc4" opacity=".5"/>`,

  /**
   * 鉱山町。サドバリー専用。立坑櫓とビッグニッケルの丘。
   */
  miningtown:
    sky("#a8b0a8", "#dfe0d4", 150) +
    ground(150, "#6a6458") +
    `<g fill="#6b7280"><rect x="60" y="90" width="8" height="60"/><rect x="94" y="90" width="8" height="60"/><path d="M56,90h50l-8,-14h-34z" fill="none" stroke="#6b7280" stroke-width="3"/></g>` +
    `<ellipse cx="200" cy="196" rx="26" ry="10" fill="#c8ccc4"/>` +
    roundTree(320, 200, 14, "#3f8f4f") +
    roundTree(350, 198, 12, "#3f8f4f") +
    `<g opacity=".4" fill="#c8ccc4"><ellipse cx="70" cy="70" rx="24" ry="10"/></g>`,

  /**
   * 大都市。トロント専用。CNタワーの通信塔とオフィス街。
   */
  metropolis:
    sky("#8fc4e8", "#cfe4f0", 150) +
    clouds(60, 24, 0.9) +
    ground(150, "#9a9484") +
    `<g fill="#8f96a0"><rect x="40" y="80" width="26" height="70"/><rect x="300" y="60" width="24" height="90"/><rect x="330" y="86" width="20" height="64"/></g>` +
    `<rect x="200" y="30" width="8" height="120" fill="#7f8896"/><ellipse cx="204" cy="30" rx="14" ry="8" fill="#7f8896"/><rect x="200" y="10" width="8" height="20" fill="#7f8896"/>` +
    `<circle cx="204" cy="60" r="3" fill="#f5b31c"/>` +
    `<g fill="#c8e0f0" opacity=".6"><rect x="46" y="90" width="4" height="4"/><rect x="46" y="102" width="4" height="4"/><rect x="306" y="70" width="4" height="4"/></g>`,

  /**
   * 滝。ナイアガラフォールズ専用。しぶきと虹。
   */
  falls:
    sky("#8fc4e8", "#cfe4f0", 90) +
    sun(330, 40, 18) +
    ground(90, "#7f9f5f") +
    `<path d="M100,90h100v50c0,26 -100,26 -100,0z" fill="#3f7fae"/>` +
    `<ellipse cx="150" cy="150" rx="90" ry="20" fill="#e8f4f6" opacity=".8"/>` +
    `<path d="M60,120a90,90 0 0 1 180,10" fill="none" stroke="#e8443f" stroke-width="3" opacity=".5"/>` +
    `<path d="M60,124a90,90 0 0 1 180,10" fill="none" stroke="#f5b31c" stroke-width="3" opacity=".5"/>` +
    roundTree(30, 200, 15, "#3f8f4f") +
    roundTree(370, 202, 13, "#c8783a"),

  /**
   * 要塞の町。キングストン専用。マルテロ塔とオンタリオ湖。
   */
  fortress:
    sky("#8fc4e8", "#cfe4f0", 130) +
    clouds(80, 28, 1) +
    ground(130, "#8fae63") +
    `<rect x="0" y="170" width="400" height="40" fill="#2f6ea8"/>` +
    ripples(184, "#bfe8f4") +
    `<ellipse cx="90" cy="150" rx="26" ry="10" fill="#9a9488"/><rect x="64" y="110" width="52" height="42" rx="24" fill="#9a9488"/>` +
    `<g fill="#4a4a52"><rect x="70" y="100" width="6" height="12"/><rect x="86" y="96" width="6" height="16"/><rect x="102" y="100" width="6" height="12"/></g>` +
    `<rect x="300" y="150" width="60" height="16" fill="#8a8478"/>`,

  /**
   * 連邦の首都。オタワ・ガティノー。平和の塔とリドー運河。
   */
  "capital-federal":
    sky("#8fc4e8", "#cfe4f0", 118) +
    clouds(300, 28, 1) +
    ground(118, "#7f9f5f") +
    `<rect x="0" y="160" width="400" height="50" fill="#3f7fae"/>` +
    ripples(174, "#bfe8f4") +
    `<rect x="60" y="86" width="90" height="60" fill="#9a9488"/>` +
    `<rect x="98" y="30" width="14" height="56" fill="#8a8478"/><path d="M98,30h14l-7,-14z" fill="#4a4a52"/>` +
    `<g fill="#4a4a52"><rect x="66" y="94" width="6" height="10"/><rect x="80" y="94" width="6" height="10"/><rect x="94" y="94" width="6" height="10"/></g>` +
    roundTree(330, 198, 14, "#c8783a"),

  /**
   * 国境の川。ウィンザー専用。吊橋とデトロイト川。
   */
  autoborder:
    sky("#8fc4e8", "#cfe4f0", 110) +
    clouds(70, 26, 0.9) +
    ground(110, "#8fae63") +
    `<rect x="0" y="150" width="400" height="60" fill="#2f6ea8"/>` +
    ripples(166, "#bfe8f4") +
    `<path d="M40,150V90M360,150V90" stroke="#8b8f98" stroke-width="6"/>` +
    `<path d="M40,90Q200,40 360,90" fill="none" stroke="#8b8f98" stroke-width="4"/>` +
    `<g stroke="#8b8f98" stroke-width="2"><path d="M80,150L100,95M130,150L140,92M240,150L250,92M300,150L290,95"/></g>` +
    `<rect x="0" y="146" width="400" height="6" fill="#4a4a52"/>`,

  /**
   * モントリオール専用。モン・ロワイヤルの十字架と摩天楼。
   */
  montrealcity:
    sky("#8fc4e8", "#cfe4f0", 150) +
    clouds(320, 26, 1) +
    `<path d="M60,150L110,70L160,150z" fill="#5f7a52" opacity=".9"/>` +
    `<rect x="106" y="46" width="4" height="26" fill="#f6efe2"/><rect x="96" y="52" width="24" height="4" fill="#f6efe2"/><rect x="96" y="60" width="24" height="4" fill="#f6efe2"/>` +
    ground(150, "#9a9484") +
    `<g fill="#8f96a0"><rect x="220" y="90" width="22" height="60"/><rect x="248" y="70" width="26" height="80"/><rect x="280" y="96" width="18" height="54"/></g>` +
    `<g fill="#c8e0f0" opacity=".6"><rect x="226" y="98" width="4" height="4"/><rect x="254" y="80" width="4" height="4"/><rect x="254" y="94" width="4" height="4"/></g>` +
    `<rect x="0" y="192" width="400" height="18" fill="#8a8478"/>`,

  /**
   * 製紙工場の町。トロワリビエール専用。ロール紙と河口の三つの水路。
   */
  papertown:
    sky("#9fb0b8", "#dfe4e0", 130) +
    ground(130, "#8fae63") +
    `<rect x="0" y="164" width="400" height="46" fill="#3f7fae"/>` +
    `<path d="M0,164c50,-10 90,10 140,0M170,164c50,-10 90,10 140,0M270,164c50,-10 90,10 140,0" fill="none" stroke="#bfe8f4" stroke-width="3" opacity=".6"/>` +
    `<rect x="60" y="100" width="20" height="66" fill="#7f8896"/><rect x="52" y="88" width="36" height="12" fill="#6b7280"/>` +
    `<g fill="#c8b48a"><rect x="270" y="176" width="24" height="24" rx="12"/><rect x="298" y="180" width="24" height="20" rx="10"/></g>`,

  /**
   * 城壁の旧市街。ケベックシティ専用。シャトー・フロントナックの尖塔。
   */
  oldcity:
    sky("#8fc4e8", "#cfe4f0", 130) +
    clouds(300, 26, 1) +
    ground(130, "#9a9484") +
    `<rect x="0" y="176" width="400" height="34" fill="#3f7fae"/>` +
    ripples(190, "#bfe8f4") +
    `<rect x="80" y="90" width="70" height="70" fill="#8a6a4a"/>` +
    `<path d="M80,90h30v-26l-15,-14l-15,14z" fill="#3f5f4a"/>` +
    `<path d="M118,90h32v-34l-16,-16l-16,16z" fill="#3f5f4a"/>` +
    `<g fill="#c8ccc4"><rect x="0" y="150" width="400" height="10"/><rect x="30" y="142" width="14" height="8"/><rect x="70" y="142" width="14" height="8"/></g>`,

  /**
   * フィヨルドの製材町。サグネ・コーナーブルック。断崖とパルプ工場。
   */
  fjordtown:
    sky("#7f9fb8", "#20364a", 80) +
    `<rect x="0" y="80" width="400" height="130" fill="#16324f"/>` +
    ripples(150, "#2f5f7f") +
    // 断崖(水面から立ち上がるので、水の全面塗りより後に描く)
    `<path d="M0,210L60,90L130,120L180,80L230,130L280,95L0,95z" fill="#3f4f48" opacity=".9"/>` +
    `<path d="M400,210L340,130L280,95L400,95z" fill="#3f4f48" opacity=".9"/>` +
    `<path d="M120,190c30,-16 40,4 60,-6c-10,20 -20,20 -60,6z" fill="#dfe8ee" opacity=".9"/>` +
    `<rect x="300" y="150" width="20" height="50" fill="#7f8896"/><rect x="292" y="140" width="36" height="10" fill="#6b7280"/>`,

  /**
   * 潮津波。モンクトン専用。逆流するペティコディアック川。
   */
  tidal:
    sky("#8fc4e8", "#cfe4f0", 140) +
    clouds(90, 28, 1) +
    ground(140, "#8a9a6a") +
    `<path d="M0,168c40,-12 70,4 110,-8c40,-12 70,4 110,-8c40,-12 70,4 110,-8c30,-6 40,2 70,-4v70H0z" fill="#7f8f6a" opacity=".7"/>` +
    `<path d="M0,178c50,-16 100,10 160,-6c60,-16 100,10 160,-6c30,-6 50,2 80,-4v42H0z" fill="#3f7fae"/>` +
    ripples(196, "#bfe8f4"),

  /**
   * ファンディ湾の町。セントジョン専用。逆流する急流の峡谷。
   */
  fundytown:
    sky("#8fc4e8", "#cfe4f0", 110) +
    clouds(320, 26, 1) +
    ground(110, "#8fae63") +
    `<path d="M140,110L140,150c0,26 30,30 60,26c30,4 60,0 60,-26L260,110z" fill="#7f8f6a"/>` +
    `<path d="M150,150c20,10 60,10 100,0v20c-40,14 -80,14 -100,0z" fill="#3f7fae"/>` +
    `<path d="M0,180c60,-10 100,10 150,-2c60,-12 100,10 150,-2c40,-8 70,2 100,-4v36H0z" fill="#2f6ea8"/>` +
    ripples(196, "#bfe8f4"),

  /**
   * 港町。ハリファックス専用。シタデルの時計塔と港。
   */
  harborcity:
    sky("#8fc4e8", "#cfe4f0", 130) +
    clouds(70, 26, 1) +
    ground(130, "#8fae63") +
    `<ellipse cx="90" cy="150" rx="30" ry="12" fill="#9a9488"/>` +
    `<rect x="82" y="96" width="16" height="50" fill="#f6efe2"/><path d="M82,96h16l-8,-16z" fill="#4a4436"/><circle cx="90" cy="106" r="5" fill="#241a10"/>` +
    `<rect x="0" y="166" width="400" height="44" fill="#2f6ea8"/>` +
    ripples(180, "#bfe8f4") +
    crane(320, 166, 44) +
    `<rect x="280" y="176" width="80" height="18" rx="3" fill="#e8443f"/>`,

  /**
   * 赤土の島の畑。シャーロットタウン専用。ジャガイモ畑と連邦議事堂の柱。
   */
  islandfields:
    sky("#8fc4e8", "#cfe4f0", 118) +
    clouds(320, 26, 1) +
    ground(118, "#c8783a") +
    `<g stroke="#8a5228" stroke-width="4" opacity=".7"><path d="M0,150h400M0,160h400M0,170h400"/></g>` +
    `<rect x="60" y="150" width="70" height="40" fill="#f6efe2"/>` +
    `<g fill="#c8bda0"><rect x="66" y="126" width="6" height="24"/><rect x="80" y="126" width="6" height="24"/><rect x="94" y="126" width="6" height="24"/><rect x="108" y="126" width="6" height="24"/></g>` +
    `<path d="M56,126h80l-10,-16h-60z" fill="#4a4436"/>` +
    `<rect x="0" y="190" width="400" height="20" fill="#2f6ea8"/>`,

  /**
   * 色とりどりの家並み。セントジョンズ専用。丘に並ぶジェリービーン・ロウ。
   */
  rowhousetown:
    sky("#8fc4e8", "#cfe4f0", 100) +
    clouds(300, 26, 1) +
    `<path d="M0,100c60,-16 120,-16 180,0c60,-16 140,-16 220,0v60H0z" fill="#8fae63"/>` +
    `<rect x="0" y="150" width="400" height="60" fill="#2f6ea8"/>` +
    ripples(166, "#bfe8f4") +
    `<g stroke="#241a10" stroke-width="1.5"><rect x="60" y="120" width="26" height="34" fill="#e8443f"/><rect x="86" y="112" width="26" height="42" fill="#f5b31c"/><rect x="112" y="122" width="26" height="32" fill="#5b8fe8"/><rect x="138" y="108" width="26" height="46" fill="#7ae8c8"/></g>`,

  /**
   * 航空の町。ガンダー専用。旧無線標識塔と古い空港ターミナル。
   */
  aviation:
    sky("#8fc4e8", "#cfe4f0", 150) +
    clouds(90, 30, 1) +
    ground(150, "#8fae63") +
    `<rect x="0" y="180" width="400" height="10" fill="#8b8f98"/>` +
    `<g stroke="#f6efe2" stroke-width="3" stroke-dasharray="14 10"><path d="M0,185h400"/></g>` +
    `<rect x="60" y="140" width="70" height="40" fill="#c8ccc4"/><rect x="60" y="140" width="70" height="6" fill="#7f8896"/>` +
    `<rect x="300" y="110" width="6" height="70" fill="#6b7280"/><rect x="292" y="100" width="22" height="10" fill="#6b7280"/>`,

  /**
   * 川船の町。ホワイトホース専用。外輪船とユーコン川。
   */
  riverboat:
    sky("#8fc4e8", "#cfe4f0", 110) +
    rockyPeak(90, 108, 60, "#8b8f98") +
    rockyPeak(320, 112, 50, "#9a9ea4") +
    ground(110, "#8fae63") +
    `<rect x="0" y="160" width="400" height="50" fill="#3f8fc4"/>` +
    ripples(174, "#bfe8f4") +
    `<rect x="140" y="168" width="90" height="22" rx="3" fill="#f6efe2" stroke="#241a10" stroke-width="1.5"/>` +
    `<circle cx="185" cy="160" r="14" fill="none" stroke="#e8443f" stroke-width="3"/>` +
    `<rect x="130" y="186" width="110" height="8" fill="#6b5330"/>`,

  /**
   * オーロラの空。イエローナイフ専用。鉱山の立坑櫓とオーロラ。
   */
  aurora:
    sky("#16324f", "#0f2438", 130) +
    `<g opacity=".55" fill="#7ae8c8"><path d="M0,10c40,-10 80,16 120,0c40,-16 80,10 120,-4c40,-12 80,8 120,-2c20,-4 30,2 40,0v60H0z"/></g>` +
    `<g opacity=".4" fill="#5b8fe8"><path d="M0,26c50,-8 90,18 140,2c50,-14 90,12 140,-2c40,-8 70,6 120,-2v40H0z"/></g>` +
    ground(130, "#20364a") +
    `<g fill="#6b7280"><rect x="60" y="90" width="6" height="40"/><rect x="88" y="90" width="6" height="40"/><path d="M56,90h44l-6,-12h-32z" fill="none" stroke="#6b7280" stroke-width="2"/></g>` +
    `<circle cx="330" cy="44" r="14" fill="#f6efe2" opacity=".9"/>`,

  /**
   * 漁の町。ヘイリバー専用。グレートスレーブ湖の漁船。
   */
  fishing:
    sky("#8fc4e8", "#cfe4f0", 140) +
    clouds(90, 28, 1) +
    ground(140, "#8fae63") +
    `<rect x="0" y="170" width="400" height="40" fill="#3f8fc4"/>` +
    ripples(184, "#bfe8f4") +
    `<path d="M120,180c14,-6 40,-6 54,0l-6,10h-42z" fill="#5b8fe8" stroke="#241a10" stroke-width="1.5"/>` +
    `<rect x="140" y="164" width="4" height="16" fill="#6b5330"/>` +
    `<g fill="#c8b48a"><rect x="280" y="178" width="30" height="24" rx="2"/></g>` +
    gull(60, 40, 1) +
    gull(330, 50, 0.9),

  /**
   * 雨がちな漁港と鉄道終着駅。プリンスルパート専用。
   */
  raincoast:
    sky("#7f96a0", "#a8bcc0", 110) +
    rockyPeak(70, 108, 56, "#7f8f9a") +
    rockyPeak(330, 112, 46, "#8b8f98") +
    ground(110, "#7f9f5f") +
    `<rect x="0" y="160" width="400" height="50" fill="#2f6ea8"/>` +
    ripples(174, "#bfe8f4") +
    `<g stroke="#bcd0d8" stroke-width="1.4" opacity=".6"><path d="M40,20l-8,16M120,10l-8,16M300,24l-8,16M360,14l-8,16"/></g>` +
    `<rect x="150" y="130" width="70" height="30" fill="#8a8478"/><rect x="150" y="122" width="70" height="10" fill="#6b6458"/>` +
    crane(280, 160, 40) +
    gull(250, 40, 1),

  /**
   * 幹線道路沿いの小さな湖畔の町。ワワ専用。巨大なガチョウの像。
   */
  goosetown:
    sky("#8fc4e8", "#cfe4f0", 140) +
    clouds(90, 26, 1) +
    hills(138, "#5f7a52") +
    ground(140, "#7f9f5f") +
    `<rect x="0" y="182" width="400" height="28" fill="#3f8fc4"/>` +
    ripples(194, "#bfe8f4") +
    `<path d="M0,166h400" stroke="#8a8478" stroke-width="10"/>` +
    `<g stroke="#f6efe2" stroke-width="2" stroke-dasharray="12 10"><path d="M0,166h400"/></g>` +
    // 巨大なガチョウの像(手前・主役)
    `<ellipse cx="90" cy="160" rx="30" ry="8" fill="#8b8f98"/>` +
    `<ellipse cx="90" cy="130" rx="26" ry="34" fill="#3f4a3a"/>` +
    `<path d="M90,100c-4,-18 8,-28 20,-28c-10,4 -10,14 -2,18z" fill="#3f4a3a"/>` +
    `<circle cx="112" cy="72" r="7" fill="#3f4a3a"/><path d="M112,70l10,-4l-6,7z" fill="#e8b23c"/>` +
    pine(340, 200, 30) +
    pine(365, 204, 24),

  /**
   * ニレ並木の川辺の町。ロンドン専用。テムズ川の合流点。
   */
  forestcity:
    sky("#8fc4e8", "#cfe4f0", 120) +
    clouds(300, 26, 1) +
    ground(120, "#a8bd6a") +
    `<rect x="0" y="168" width="400" height="42" fill="#3f8fc4"/>` +
    `<path d="M0,168c60,-10 100,10 150,-2M170,168c60,-10 100,10 150,-2" fill="none" stroke="#bfe8f4" stroke-width="3" opacity=".6"/>` +
    roundTree(50, 200, 16, "#3f8f4f") +
    roundTree(90, 196, 13, "#4f9f5a") +
    roundTree(320, 198, 15, "#3f8f4f") +
    roundTree(360, 202, 12, "#4f9f5a") +
    `<rect x="150" y="130" width="60" height="40" fill="#c8bda0"/><rect x="150" y="130" width="60" height="6" fill="#8a8478"/>`,

  /**
   * フェリーターミナル。ノースシドニー専用。マリン・アトランティックの大型フェリー。
   */
  ferryport:
    sky("#8fc4e8", "#cfe4f0", 130) +
    clouds(70, 26, 1) +
    ground(130, "#8fae63") +
    `<rect x="0" y="166" width="400" height="44" fill="#2f6ea8"/>` +
    ripples(180, "#bfe8f4") +
    `<rect x="60" y="140" width="70" height="26" fill="#f6efe2" stroke="#241a10" stroke-width="1"/>` +
    // 大型フェリー(手前)
    `<path d="M220,170c0,-16 100,-16 100,0v18h-100z" fill="#e8443f" stroke="#241a10" stroke-width="1.5"/>` +
    `<rect x="250" y="146" width="40" height="16" fill="#f6efe2" stroke="#241a10" stroke-width="1.5"/>` +
    `<rect x="0" y="192" width="400" height="8" fill="#6b6458" opacity=".6"/>`,
};

export const CANADA_BG = { ...CANADA_BASE_BG };

// ---------------------------------------------------------------------------
// 都市シンボル(28種)。鍵は cities.mjs の `mark` と対応。24×24の座標系。
// ---------------------------------------------------------------------------

export const CANADA_MARKS = {
  /** 山と海が接する入り江。バンクーバー専用。 */
  mountainsea:
    `<path d="M2,17L8,8L13,13L18,6L22,17z" fill="#8b8f98"/>` +
    `<path d="M2,17h20v3H2z" fill="#2f6ea8"/>` +
    `<path d="M8,10L6,8" stroke="#f2f6f8" stroke-width="1.5"/>`,

  /** ドームの議事堂。ビクトリア・エドモントン・リジャイナ・ウィニペグ・フレデリクトン。 */
  legislature:
    `<rect x="4" y="13" width="16" height="8" fill="#c8bda0"/>` +
    `<ellipse cx="12" cy="12" rx="6" ry="5" fill="#8b8f98"/>` +
    `<rect x="11" y="4" width="2" height="4" fill="#8b8f98"/>` +
    `<rect x="6" y="15" width="2" height="4" fill="#7f8896"/><rect x="11" y="15" width="2" height="4" fill="#7f8896"/><rect x="16" y="15" width="2" height="4" fill="#7f8896"/>`,

  /** ゴンドラと山小屋。ウィスラー・バンフ・レイクルイーズ・ジャスパー。 */
  resort:
    `<path d="M2,17L9,5L16,17z" fill="#8b8f98"/>` +
    `<path d="M6,13L9,8L12,13z" fill="#f2f6f8"/>` +
    `<path d="M12,10L21,4" stroke="#4a4a52" stroke-width="1.2"/>` +
    `<rect x="17" y="10" width="4" height="3" fill="#e8443f"/>`,

  /** 乾いた渓谷の崖。カムループス専用。 */
  canyon:
    `<path d="M2,20L5,6L8,9L11,4L14,10L17,6L20,20z" fill="#c8916a"/>` +
    `<path d="M2,20h18v2H2z" fill="#3f8fc4"/>`,

  /** 果樹園・ぶどう畑の畝。ケロウナ専用。 */
  orchard:
    `<circle cx="7" cy="10" r="5" fill="#5f8f4a"/><circle cx="15" cy="9" r="5.5" fill="#6f9f52"/><circle cx="11" cy="14" r="5" fill="#5f8f4a"/>` +
    `<rect x="6" y="19" width="2" height="3" fill="#6b5330"/><rect x="16" y="19" width="2" height="3" fill="#6b5330"/>`,

  /** カウボーイハットとロープ。カルガリー専用。 */
  stampede:
    `<ellipse cx="12" cy="15" rx="10" ry="2.4" fill="#8a5a30"/>` +
    `<path d="M6,15c0,-6 3,-9 6,-9c3,0 6,3 6,9z" fill="#a06a38"/>` +
    `<circle cx="18" cy="19" r="3" fill="none" stroke="#c8a838" stroke-width="1.4"/>`,

  /** 穀物エレベーター。メディシンハット・サスカトゥーン・ブランドン・サンダーベイ。 */
  wheatsilo:
    `<rect x="8" y="4" width="8" height="17" fill="#c8b48a"/>` +
    `<rect x="4" y="10" width="4" height="11" fill="#b8a47a"/>` +
    `<rect x="16" y="8" width="4" height="13" fill="#b8a47a"/>` +
    `<rect x="8" y="4" width="8" height="2" fill="#8a7860"/>`,

  /** ホッキョクグマ。チャーチル専用。 */
  polarbear:
    `<ellipse cx="12" cy="15" rx="8" ry="5" fill="#f6efe2"/>` +
    `<circle cx="19" cy="12" r="4" fill="#f6efe2"/>` +
    `<circle cx="21" cy="11" r="1.6" fill="#f6efe2"/>` +
    `<circle cx="20.6" cy="10.6" r=".6" fill="#241a10"/>`,

  /** 運河の水門。スーセントマリー専用。 */
  canallock:
    `<rect x="2" y="12" width="20" height="9" fill="#2f6ea8"/>` +
    `<rect x="10" y="4" width="4" height="17" fill="#6b7280"/>` +
    `<rect x="6" y="8" width="3" height="6" fill="#7f8896"/><rect x="15" y="8" width="3" height="6" fill="#7f8896"/>`,

  /** 鉱山の立坑櫓。サドバリー専用。 */
  mineheadframe:
    `<path d="M6,21V6l6,-3l6,3v15" fill="none" stroke="#6b7280" stroke-width="2"/>` +
    `<path d="M8,10h8M8,15h8" stroke="#6b7280" stroke-width="1.4"/>` +
    `<circle cx="12" cy="4" r="1.6" fill="#4a4a52"/>`,

  /** 電波塔。トロント専用(CNタワー)。 */
  citytower:
    `<path d="M11,21V6M13,21V6" stroke="#7f8896" stroke-width="1.6"/>` +
    `<ellipse cx="12" cy="6" rx="4" ry="2.4" fill="#8f96a0"/>` +
    `<rect x="11" y="2" width="2" height="5" fill="#8f96a0"/>` +
    `<circle cx="12" cy="4" r="1.2" fill="#f5b31c"/>`,

  /** 滝としぶき。ナイアガラフォールズ専用。 */
  waterfall:
    `<path d="M6,4h12v9c0,5 -12,5 -12,0z" fill="#3f7fae"/>` +
    `<ellipse cx="12" cy="19" rx="9" ry="3" fill="#e8f4f6"/>`,

  /** 稜堡と塔。キングストン専用(マルテロ塔)。 */
  fort:
    `<ellipse cx="12" cy="15" rx="7" ry="3" fill="#9a9488"/>` +
    `<rect x="7" y="6" width="10" height="9" rx="5" fill="#9a9488"/>` +
    `<g fill="#4a4a52"><rect x="8" y="4" width="2" height="3"/><rect x="14" y="4" width="2" height="3"/></g>`,

  /** 平和の塔。オタワ専用。 */
  parliament:
    `<rect x="9" y="10" width="6" height="11" fill="#9a9488"/>` +
    `<path d="M9,10h6l-3,-7z" fill="#4a4a52"/>` +
    `<rect x="6" y="17" width="3" height="4" fill="#8a8478"/><rect x="15" y="17" width="3" height="4" fill="#8a8478"/>`,

  /** 国境の吊橋。ウィンザー専用。 */
  bridge:
    `<path d="M2,17h20" stroke="#8b8f98" stroke-width="2"/>` +
    `<path d="M6,17V6M18,17V6" stroke="#8b8f98" stroke-width="1.6"/>` +
    `<path d="M6,6Q12,2 18,6" fill="none" stroke="#8b8f98" stroke-width="1.4"/>` +
    `<path d="M9,17L9,8M15,17L15,8" stroke="#8b8f98" stroke-width="1"/>`,

  /** 丘の十字架と摩天楼。モントリオール専用。 */
  crosshill:
    `<path d="M2,21L9,7L16,21z" fill="#5f7a52"/>` +
    `<rect x="8" y="3" width="1.6" height="8" fill="#f6efe2"/><rect x="5.6" y="5.4" width="6.4" height="1.6" fill="#f6efe2"/>` +
    `<g fill="#8f96a0"><rect x="17" y="12" width="3" height="9"/><rect x="20" y="8" width="3" height="13"/></g>`,

  /** 製紙工場の煙突とロール紙。トロワリビエール・サグネ・コーナーブルック。 */
  papermill:
    `<rect x="4" y="8" width="5" height="13" fill="#7f8896"/><rect x="2" y="5" width="9" height="3" fill="#6b7280"/>` +
    `<circle cx="17" cy="17" r="4" fill="#c8b48a"/><circle cx="17" cy="17" r="1.6" fill="#8a7860"/>`,

  /** 尖塔の大ホテル。ケベック専用(シャトー・フロントナック)。 */
  chateau:
    `<rect x="6" y="10" width="12" height="11" fill="#8a6a4a"/>` +
    `<path d="M6,10h8v-8l-4,-4l-4,4z" fill="#3f5f4a"/>` +
    `<path d="M14,10h6v-6l-3,-3l-3,3z" fill="#3f5f4a"/>`,

  /** 曲線の石灰岩の建物。ガティノー専用(カナダ歴史博物館)。 */
  museum:
    `<path d="M2,20c4,-12 16,-12 20,0z" fill="#c8bda0"/>` +
    `<path d="M2,20h20v1H2z" fill="#8a8478"/>`,

  /** 逆流する川の波。モンクトン専用(潮津波)。 */
  tidalbore:
    `<path d="M2,15c4,-6 6,4 10,-2c4,-6 6,4 10,-2" fill="none" stroke="#2f6ea8" stroke-width="2.4"/>` +
    `<path d="M2,20h20v1H2z" fill="#3f7fae"/>`,

  /** 逆流する急流。セントジョン専用(リバーシング・フォールズ)。 */
  reversingfalls:
    `<path d="M4,6c6,4 -2,8 4,12c6,4 -2,4 4,4" fill="none" stroke="#3f7fae" stroke-width="2.4"/>` +
    `<path d="M2,4L6,4" stroke="#8b8f98" stroke-width="2"/>`,

  /** 星形要塞と時計塔。ハリファックス専用(シタデル)。 */
  citadel:
    `<rect x="8" y="9" width="7" height="12" fill="#f6efe2"/>` +
    `<path d="M8,9h7l-3.5,-6z" fill="#4a4436"/>` +
    `<circle cx="11.5" cy="12" r="1.6" fill="#241a10"/>` +
    `<ellipse cx="11.5" cy="21" rx="9" ry="2.4" fill="#9a9488"/>`,

  /** 議事堂の列柱。シャーロットタウン専用(連邦議事堂)。 */
  confederation:
    `<rect x="3" y="10" width="18" height="10" fill="#c8bda0"/>` +
    `<g fill="#8a8478"><rect x="5" y="10" width="2" height="10"/><rect x="10" y="10" width="2" height="10"/><rect x="15" y="10" width="2" height="10"/><rect x="19" y="10" width="2" height="10"/></g>` +
    `<path d="M2,10h20l-2,-4h-16z" fill="#8a8478"/>`,

  /** 色とりどりの家並み。セントジョンズ専用(ジェリービーン・ロウ)。 */
  rowhouses:
    `<rect x="3" y="10" width="6" height="11" fill="#e8443f"/><rect x="9" y="7" width="6" height="14" fill="#f5b31c"/><rect x="15" y="11" width="6" height="10" fill="#5b8fe8"/>` +
    `<path d="M3,10h6l-3,-3z" fill="#241a10"/><path d="M9,7h6l-3,-3z" fill="#241a10"/><path d="M15,11h6l-3,-3z" fill="#241a10"/>`,

  /** 旧無線標識塔。ガンダー専用。 */
  radartower:
    `<path d="M8,21L12,4L16,21" fill="none" stroke="#6b7280" stroke-width="1.6"/>` +
    `<path d="M8,14h8M9.5,9h5" stroke="#6b7280" stroke-width="1.2"/>` +
    `<circle cx="12" cy="4" r="1.6" fill="#e8443f"/>`,

  /** 外輪船。ホワイトホース専用。 */
  paddlewheel:
    `<rect x="3" y="12" width="15" height="7" rx="2" fill="#f6efe2" stroke="#241a10" stroke-width="1"/>` +
    `<circle cx="19" cy="14" r="5" fill="none" stroke="#e8443f" stroke-width="1.6"/>` +
    `<path d="M19,9v10M14,14h10" stroke="#e8443f" stroke-width="1"/>`,

  /** オーロラ。イエローナイフ専用。 */
  northernlights:
    `<path d="M2,10c4,-4 6,4 10,0c4,-4 6,4 10,0" fill="none" stroke="#7ae8c8" stroke-width="2"/>` +
    `<path d="M2,15c4,-3 6,3 10,0c4,-3 6,3 10,0" fill="none" stroke="#5b8fe8" stroke-width="1.6"/>` +
    `<rect x="2" y="19" width="20" height="2" fill="#20364a"/>`,

  /** 白身魚漁の船。ヘイリバー専用。 */
  fishboat:
    `<path d="M3,15c2,-2 16,-2 18,0l-2,5H5z" fill="#5b8fe8" stroke="#241a10" stroke-width="1"/>` +
    `<rect x="11" y="5" width="1.4" height="10" fill="#6b5330"/><path d="M12.4,6l6,3l-6,2z" fill="#f6efe2"/>`,

  /** 巨大なカナダガンの像。ワワ専用。 */
  goosestatue:
    `<ellipse cx="12" cy="14" rx="8" ry="5" fill="#3f4a3a"/>` +
    `<path d="M12,10c-1,-5 2,-8 5,-8c-3,1 -3,4 -1,5z" fill="#3f4a3a"/>` +
    `<circle cx="17" cy="4" r="2" fill="#3f4a3a"/>` +
    `<path d="M17,3.4l3,-1.2l-2,2.2z" fill="#e8b23c"/>` +
    `<ellipse cx="8" cy="20" rx="9" ry="1.6" fill="#8b8f98"/>`,

  /** ニレ並木の町。ロンドン専用。 */
  forestcity:
    `<circle cx="7" cy="9" r="5" fill="#3f8f4f"/><circle cx="14" cy="7" r="5.6" fill="#4f9f5a"/><circle cx="19" cy="11" r="4.4" fill="#3f8f4f"/>` +
    `<rect x="6" y="15" width="2" height="6" fill="#6b5330"/><rect x="13" y="14" width="2" height="7" fill="#6b5330"/><rect x="18" y="16" width="2" height="5" fill="#6b5330"/>`,

  /** フェリーターミナル。ノースシドニー専用。 */
  ferryterminal:
    `<path d="M2,17c3,-3 17,-3 20,0l-3,4H5z" fill="#f6efe2" stroke="#241a10" stroke-width="1"/>` +
    `<rect x="9" y="6" width="2" height="11" fill="#8b8f98"/><rect x="13" y="8" width="2" height="9" fill="#8b8f98"/>` +
    `<path d="M9,6h4l-2,-3z" fill="#e8443f"/>`,
};
