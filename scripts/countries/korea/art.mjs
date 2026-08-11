/**
 * 韓国の都市イラスト。
 *
 * `KOREA_MARKS` は24×24の座標系に描くシンボル、`KOREA_BG` は400×210の
 * 座標系に描く背景シーン(いずれもSVG断片の文字列)。フランス・茨城と同じく
 * 最初から文字列として持つ。動きは含めない(アニメーションはReact側で重ねる)。
 *
 * 色は他の盤面と揃える。空 #8fc4e8〜#cfe4f0、顔・白 #f6efe2、
 * 強調 #f5b31c/#e8443f/#5b8fe8。韓国らしさは
 * **丹青(タンチョン)の朱 #c8102e・群青 #1a4a8f・金 #f4c430、
 * 松の濃緑 #2f5f3f、瓦の黒灰 #4a4a52、花崗岩の山肌 #8b8f98** で出す。
 *
 * 鍵は `cities.mjs` の `mark` / `bg` と一対一で対応する。
 * 増やすときは両方を揃えること。
 *
 * **背景SVGの中央25%(x=151〜249 / y=54〜152)は都市シンボルに隠れて
 * 見えない。** 見せたい細部は左右3分の1と手前(y>170)に置く。
 * `sky()` は必ず第3引数(次に来る塗りの開始y)を渡すこと。渡し忘れると
 * 空と地面のあいだに塗り残しの帯ができる(ibarakiで実際に起きた)。
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

/** 花崗岩の山。韓国の山は稜線が鋭く、白っぽい岩肌が特徴。 */
function graniteMountain(cx, base, h, fill = "#8b8f98") {
  const w = r1(h * 1.3);
  return (
    `<path d="M${r1(cx - w / 2)},${base}L${r1(cx - w * 0.12)},${r1(base - h)}L${r1(cx + w * 0.1)},${r1(base - h * 0.62)}L${r1(cx + w / 2)},${base}z" fill="${fill}"/>` +
    `<path d="M${r1(cx - w * 0.12)},${r1(base - h)}L${r1(cx - w * 0.02)},${r1(base - h * 0.8)}L${r1(cx + w * 0.04)},${r1(base - h * 0.86)}z" fill="#f2f6f8"/>`
  );
}

/** 松。韓国の山や海岸に多い。 */
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

/**
 * 韓屋。反った屋根(牛角形の隅棟)が特徴で、瓦は青灰色、壁は白い漆喰、
 * 柱と梁は木の色。この盤面の視覚の核になるので部品にしてある。
 */
function hanokRoof(x, base, w, h, roof = "#4a4a52", wall = "#f6efe2") {
  const hw = r1(w / 2);
  const eave = r1(hw + h * 0.35);
  return (
    `<rect x="${r1(x - hw * 0.86)}" y="${r1(base - h * 0.62)}" width="${r1(hw * 1.72)}" height="${r1(h * 0.62)}" fill="${wall}"/>` +
    `<rect x="${r1(x - hw * 0.86)}" y="${r1(base - h * 0.62)}" width="${r1(hw * 1.72)}" height="4" fill="#6b5330"/>` +
    // 反り棟。両端が跳ね上がる曲線
    `<path d="M${r1(x - eave)},${r1(base - h * 0.6)}Q${r1(x - hw * 0.5)},${r1(base - h * 1.08)} ${x},${r1(base - h)}Q${r1(x + hw * 0.5)},${r1(base - h * 1.08)} ${r1(x + eave)},${r1(base - h * 0.6)}Q${r1(x + eave - 10)},${r1(base - h * 0.5)} ${x},${r1(base - h * 0.66)}Q${r1(x - eave + 10)},${r1(base - h * 0.5)} ${r1(x - eave)},${r1(base - h * 0.6)}z" fill="${roof}"/>`
  );
}

/** 鳥居に代わる、韓国の伝統的な柱門(紅箭門・ホンサルムン風の簡略形)。 */
function hongsalmun(x, base, h, fill = "#c8102e") {
  const w = r1(h * 0.68);
  return (
    `<rect x="${r1(x - w / 2)}" y="${r1(base - h)}" width="4" height="${h}" fill="${fill}"/>` +
    `<rect x="${r1(x + w / 2 - 4)}" y="${r1(base - h)}" width="4" height="${h}" fill="${fill}"/>` +
    `<g stroke="${fill}" stroke-width="2"><path d="M${r1(x - w / 2)},${r1(base - h)}h${w}M${r1(x - w / 2)},${r1(base - h + 8)}h${w}"/></g>` +
    `<path d="M${r1(x - w / 2)},${r1(base - h)}L${x},${r1(base - h - 10)}L${r1(x + w / 2)},${r1(base - h)}" fill="none" stroke="${fill}" stroke-width="3"/>`
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

/** 田・段々畑の畝。 */
function paddyRows(x, y, w, rows = 3, color = "#7fa8c4") {
  const parts = [];
  for (let i = 0; i < rows; i++) {
    parts.push(`<path d="M${x},${r1(y + i * 7)}h${w}"/>`);
  }
  return `<g stroke="${color}" stroke-width="3" opacity=".75">${parts.join("")}</g>`;
}

/** 花畑・茶畑の横畝(丸い茂みの列)。 */
function shrubRow(x, y, count, gap, r, color) {
  const parts = [];
  for (let i = 0; i < count; i++) {
    parts.push(`<circle cx="${r1(x + i * gap)}" cy="${y}" r="${r}" fill="${color}"/>`);
  }
  return `<g opacity=".9">${parts.join("")}</g>`;
}

/** 芝の古墳(半球)。 */
function moundTomb(cx, base, r, fill = "#8fae63") {
  return `<path d="M${r1(cx - r)},${base}A${r},${r1(r * 0.62)} 0 0 1 ${r1(cx + r)},${base}z" fill="${fill}" stroke="#5f8a4a" stroke-width="1.5"/>`;
}

/** 塔(仏国寺の石塔ふうの三重塔)。 */
function stonePagoda(x, base, h, fill = "#9aa0a8") {
  const w0 = r1(h * 0.34);
  const parts = [];
  for (let i = 0; i < 3; i++) {
    const w = r1(w0 * (1 - i * 0.22));
    const y = r1(base - (i + 1) * (h / 3));
    parts.push(`<rect x="${r1(x - w / 2)}" y="${y}" width="${w}" height="${r1(h / 3 - 3)}" fill="${fill}"/>`);
  }
  parts.push(`<rect x="${r1(x - w0 * 0.5)}" y="${r1(base - h * 0.12)}" width="${r1(w0)}" height="${r1(h * 0.12)}" fill="${fill}"/>`);
  return parts.join("");
}

/** トルハルバン(済州の石像)。 */
function dolharubangFigure(x, base, h, fill = "#8b8f98") {
  const w = r1(h * 0.42);
  return (
    `<rect x="${r1(x - w * 0.3)}" y="${r1(base - h)}" width="${r1(w * 0.6)}" height="${h}" rx="3" fill="${fill}"/>` +
    `<ellipse cx="${x}" cy="${r1(base - h)}" rx="${r1(w / 2)}" ry="${r1(h * 0.22)}" fill="${fill}"/>` +
    `<circle cx="${r1(x - w * 0.14)}" cy="${r1(base - h * 0.86)}" r="2.6" fill="#241a10"/>` +
    `<circle cx="${r1(x + w * 0.14)}" cy="${r1(base - h * 0.86)}" r="2.6" fill="#241a10"/>` +
    `<rect x="${r1(x - w * 0.14)}" y="${r1(base - h * 0.6)}" width="${r1(w * 0.28)}" height="3" fill="#241a10" opacity=".6"/>`
  );
}

/** 監視塔(DMZ)。 */
function watchtower(x, base, h, fill = "#6b7060") {
  return (
    `<rect x="${r1(x - 3)}" y="${r1(base - h)}" width="6" height="${h}" fill="${fill}"/>` +
    `<rect x="${r1(x - 14)}" y="${r1(base - h - 22)}" width="28" height="22" fill="${fill}"/>` +
    `<rect x="${r1(x - 10)}" y="${r1(base - h - 17)}" width="20" height="10" fill="#20364a"/>` +
    `<path d="M${r1(x - 16)},${r1(base - h - 22)}h32l-4,-8h-24z" fill="#4a4f42"/>`
  );
}

// ---------------------------------------------------------------------------
// 背景シーン(16種)。鍵は cities.mjs の `bg` と対応。
// ---------------------------------------------------------------------------

const KOREA_BASE_BG = {
  /**
   * 首都。ソウル専用。景福宮ふうの丹青の甍を左に、漢江と近代的な高層ビルの
   * 稜線を右に置く。中央の隠れ帯には橋の橋脚(繰り返しなので失っても軽い)。
   */
  capital:
    sky("#8fc4e8", "#cfe4f0", 128) +
    clouds(300, 30, 1.1) +
    hills(126, "#8fae7a") +
    ground(128, "#7f9f5f") +
    // 川
    `<rect x="0" y="168" width="400" height="42" fill="#3f7fae"/>` +
    ripples(184, "#bfe8f4") +
    // 橋脚(中央、隠れてよい)
    `<g fill="#8b8f98"><rect x="170" y="150" width="6" height="60"/><rect x="200" y="150" width="6" height="60"/><rect x="230" y="150" width="6" height="60"/></g>` +
    // 王宮(左)
    hanokRoof(70, 128, 90, 34, "#1a4a8f", "#c8102e") +
    `<rect x="40" y="128" width="60" height="6" fill="#4a4436"/>` +
    // 高層ビル群(右)
    `<g fill="#7f8896"><rect x="300" y="60" width="22" height="68"/><rect x="326" y="40" width="26" height="88"/><rect x="356" y="72" width="20" height="56"/></g>` +
    `<g fill="#bfe0f0" opacity=".6"><rect x="304" y="66" width="4" height="4"/><rect x="312" y="66" width="4" height="4"/><rect x="330" y="48" width="4" height="4"/><rect x="340" y="48" width="4" height="4"/><rect x="330" y="64" width="4" height="4"/></g>`,

  /**
   * 非武装地帯。板門店専用。監視塔と鉄条網、境界を示す青い小屋。
   * 意図して人けのない構図にする(子どもも遊ぶため、緊張は示すが脅威にしない)。
   */
  dmz:
    sky("#9fc0d8", "#dbe6e0", 120) +
    clouds(90, 34, 0.9) +
    ground(120, "#8a9a6a") +
    `<rect x="0" y="150" width="400" height="60" fill="#7f8f5c"/>` +
    watchtower(50, 150, 46) +
    watchtower(360, 150, 40) +
    // 鉄条網
    `<g stroke="#5a5f52" stroke-width="1.6"><path d="M120,140h160M120,146h160M120,152h160"/></g>` +
    `<g stroke="#5a5f52" stroke-width="1.4"><path d="M130,132l6,8M150,132l6,8M170,132l6,8M190,132l6,8M210,132l6,8M230,132l6,8M250,132l6,8M270,132l6,8"/></g>` +
    // 会議用の青い小屋
    `<rect x="176" y="150" width="48" height="26" fill="#2f6ea8"/><rect x="176" y="150" width="48" height="5" fill="#f6efe2"/>` +
    `<path d="M172,150h56l-6,-8h-44z" fill="#e2dccb"/>` +
    // 空いた道
    `<path d="M0,200L400,200" stroke="#c8bda0" stroke-width="18" opacity=".6"/>`,

  /**
   * 韓屋の村。水原・龍仁・全州・安東。反った瓦屋根の家並みと、
   * 手前の柿の木・石垣。
   */
  hanok:
    sky("#8fc4e8", "#cfe4f0", 126) +
    clouds(320, 28, 1) +
    hills(124, "#8fae7a") +
    ground(126, "#8fae63") +
    // 石垣
    `<g fill="#9a9488"><rect x="0" y="180" width="400" height="10"/><rect x="20" y="172" width="18" height="8"/><rect x="60" y="172" width="18" height="8"/><rect x="340" y="172" width="18" height="8"/></g>` +
    hanokRoof(64, 150, 56, 24, "#4a4a52") +
    hanokRoof(120, 156, 44, 20, "#4a4a52") +
    hanokRoof(330, 150, 58, 24, "#4a4a52") +
    // 柿の木(手前)
    roundTree(30, 200, 15, "#c8783a") +
    roundTree(374, 202, 13, "#3f8f4f"),

  /**
   * 城壁の町。扶余・晋州。石垣と将台、下に川。
   */
  fortress:
    sky("#8fc4e8", "#cfe4f0", 110) +
    clouds(90, 30, 1) +
    graniteMountain(340, 108, 60, "#7f8f5c") +
    ground(110, "#8fae63") +
    // 石垣(全幅)
    `<path d="M0,140h60l8,-14h20l8,14h280v20H0z" fill="#8a8478"/>` +
    `<g fill="#7a7468"><rect x="0" y="140" width="16" height="20"/><rect x="30" y="140" width="16" height="20"/><rect x="150" y="140" width="16" height="20"/><rect x="300" y="140" width="16" height="20"/><rect x="360" y="140" width="16" height="20"/></g>` +
    // 将台
    `<rect x="52" y="106" width="36" height="20" fill="#f6efe2"/><path d="M46,106h48l-6,-10h-36z" fill="#4a4a52"/>` +
    // 川(手前)
    `<rect x="0" y="176" width="400" height="34" fill="#3f7fae"/>` +
    ripples(190, "#bfe8f4"),

  /**
   * 港町。仁川・木浦・群山・麗水・統営。起重機と船、かもめ。
   */
  port:
    sky("#8fc4e8", "#cfe4f0", 118) +
    clouds(310, 28, 1) +
    ground(118, "#9a9484") +
    gull(60, 50, 1) +
    gull(90, 62, 0.8) +
    gull(320, 44, 1) +
    `<rect x="0" y="150" width="400" height="60" fill="#2f6ea8"/>` +
    ripples(168, "#bfe8f4") +
    crane(50, 150, 60) +
    crane(90, 150, 44) +
    // 埠頭
    `<rect x="0" y="140" width="400" height="12" fill="#8a8478"/>` +
    // 貨物船(右)
    `<rect x="290" y="152" width="90" height="20" rx="3" fill="#e8443f"/>` +
    `<rect x="300" y="140" width="70" height="14" fill="#f6efe2"/>` +
    `<g fill="#5b8fe8"><rect x="306" y="143" width="10" height="8"/><rect x="322" y="143" width="10" height="8"/><rect x="338" y="143" width="10" height="8"/></g>`,

  /**
   * 海辺。江陵・釜山・西帰浦・保寧。砂浜と波、パラソル。
   */
  seaside:
    sky("#8fc4e8", "#cfe4f0", 110) +
    sun(340, 46, 22) +
    clouds(80, 30, 1) +
    `<rect x="0" y="110" width="400" height="60" fill="#1e6ea0"/>` +
    ripples(126, "#bfe8f4") +
    `<path d="M0,150c60,-8 120,4 200,-2c80,-6 140,4 200,-2v64H0z" fill="#e8dcc0"/>` +
    // パラソル
    `<g><path d="M60,168a20,10 0 0 1 40,0z" fill="#e8443f"/><rect x="78" y="168" width="3" height="30" fill="#6b5330"/></g>` +
    `<g><path d="M320,172a16,8 0 0 1 32,0z" fill="#f5b31c"/><rect x="334" y="172" width="3" height="26" fill="#6b5330"/></g>` +
    pine(20, 200, 30) +
    pine(378, 202, 26),

  /**
   * 島。欝陵島。切り立った崖と、灯を連ねたイカ釣り船。
   */
  island:
    sky("#5f7f9f", "#20364a", 70) +
    `<circle cx="330" cy="40" r="16" fill="#f6efe2" opacity=".9"/>` +
    `<rect x="0" y="70" width="400" height="140" fill="#16324f"/>` +
    ripples(150, "#2f5f7f") +
    // 切り立った島
    `<path d="M80,210L110,60L150,20L190,50L200,210z" fill="#5f6a5a"/>` +
    `<path d="M120,60L150,30L170,55L150,90z" fill="#4a5548"/>` +
    pine(140, 130, 20, "#1f4a30") +
    pine(165, 145, 16, "#1f4a30") +
    // イカ釣り船の灯
    `<g fill="#f5b31c"><circle cx="300" cy="160" r="2.4"/><circle cx="312" cy="164" r="2.4"/><circle cx="290" cy="168" r="2.4"/></g>` +
    `<rect x="284" y="168" width="34" height="8" rx="2" fill="#4a4a52"/>`,

  /**
   * 山あいの谷。束草・三陟・原州・忠州。花崗岩の峰と川。
   */
  valley:
    sky("#8fc4e8", "#cfe4f0", 150) +
    clouds(340, 30, 1) +
    graniteMountain(90, 130, 90, "#8b8f98") +
    graniteMountain(180, 138, 70, "#9a9ea4") +
    graniteMountain(320, 128, 84, "#8b8f98") +
    hills(150, "#5f7f4a") +
    ground(150, "#6f8a52") +
    `<path d="M150,150c10,20 -6,40 4,60h40c-10,-20 10,-40 0,-60z" fill="#3f7fae"/>` +
    pine(60, 200, 26) +
    pine(360, 202, 24),

  /**
   * スキー場。平昌専用。雪山とリフト、松。
   */
  ski:
    sky("#a8c8e0", "#e8f0f4", 150) +
    sun(50, 40, 18, "#f6efe2") +
    `<path d="M0,150L120,60L260,150z" fill="#f2f6f8"/>` +
    `<path d="M120,60L180,150h40z" fill="#dfe8ee" opacity=".8"/>` +
    ground(150, "#f2f6f8") +
    // リフト線
    `<g stroke="#4a4a52" stroke-width="1.6"><path d="M40,160L340,70"/></g>` +
    `<g fill="#e8443f"><rect x="90" y="140" width="10" height="6" rx="1"/><rect x="190" y="112" width="10" height="6" rx="1"/><rect x="290" y="84" width="10" height="6" rx="1"/></g>` +
    `<g stroke="#4a4a52" stroke-width="1"><path d="M95,146v-6M195,118v-6M295,90v-6"/></g>` +
    pine(30, 190, 30) +
    pine(370, 195, 26) +
    // スキーヤー(小さく)
    `<g><circle cx="150" cy="128" r="4" fill="#f6efe2"/><path d="M150,132v10M146,142h8" stroke="#e8443f" stroke-width="2"/></g>`,

  /**
   * 湖畔。春川・加平。ダム湖と並木道、渡し舟。
   */
  lakeside:
    sky("#8fc4e8", "#cfe4f0", 100) +
    clouds(70, 28, 1) +
    hills(98, "#8fae7a") +
    ground(100, "#8fae63") +
    `<rect x="0" y="140" width="400" height="70" fill="#3f8fc4"/>` +
    ripples(156, "#bfe8f4") +
    // メタセコイア並木(左)
    pine(40, 200, 34) +
    pine(66, 200, 30) +
    pine(92, 200, 34) +
    // ダム(右)
    `<rect x="320" y="120" width="70" height="24" fill="#9a9488"/>` +
    `<g fill="#7a7468"><rect x="326" y="124" width="8" height="16"/><rect x="342" y="124" width="8" height="16"/><rect x="358" y="124" width="8" height="16"/><rect x="374" y="124" width="8" height="16"/></g>` +
    // 小舟
    `<path d="M170,178c10,-4 30,-4 40,0l-4,6h-32z" fill="#6b5330"/>`,

  /**
   * 農村。高陽・順天・宝城・利川・淡陽。花や茶の畝、藁ぶきの納屋。
   */
  farmland:
    sky("#8fc4e8", "#cfe4f0", 118) +
    clouds(300, 26, 0.9) +
    hills(116, "#8fae7a") +
    ground(118, "#a8bd6a") +
    shrubRow(20, 150, 6, 20, 8, "#c8384f") +
    shrubRow(20, 168, 6, 20, 8, "#e8a0b0") +
    shrubRow(250, 156, 7, 18, 7, "#5f8f4a") +
    shrubRow(250, 172, 7, 18, 7, "#7fae5a") +
    `<rect x="150" y="176" width="46" height="24" fill="#e8dcc0"/>` +
    `<path d="M144,176h58l-8,-14h-42z" fill="#c8a878"/>`,

  /**
   * 近代都市。大田・世宗・大邱・清州・光州。整った高層ビルと広場。
   */
  metro:
    sky("#8fc4e8", "#cfe4f0", 150) +
    clouds(60, 26, 0.9) +
    ground(150, "#9a9484") +
    `<g fill="#8f96a0"><rect x="30" y="70" width="30" height="80"/><rect x="70" y="50" width="26" height="100"/><rect x="280" y="60" width="28" height="90"/><rect x="316" y="86" width="24" height="64"/></g>` +
    `<g fill="#c8e0f0" opacity=".65"><rect x="36" y="78" width="4" height="4"/><rect x="46" y="78" width="4" height="4"/><rect x="36" y="90" width="4" height="4"/><rect x="76" y="58" width="4" height="4"/><rect x="86" y="58" width="4" height="4"/><rect x="76" y="72" width="4" height="4"/><rect x="286" y="68" width="4" height="4"/><rect x="322" y="94" width="4" height="4"/></g>` +
    // 広場の噴水(手前)
    `<circle cx="200" cy="188" r="16" fill="#5b8fe8" opacity=".8"/><circle cx="200" cy="188" r="4" fill="#bfe8f4"/>`,

  /**
   * 工業都市。浦項・蔚山。高炉と起重機、煙。
   */
  industrial:
    sky("#9fb0b8", "#dfe4e0", 150) +
    `<g opacity=".5" fill="#c8ccc4"><ellipse cx="70" cy="60" rx="26" ry="12"/><ellipse cx="330" cy="50" rx="22" ry="10"/></g>` +
    ground(150, "#8a8478") +
    // 高炉
    `<rect x="40" y="90" width="30" height="60" fill="#7f8896"/>` +
    `<rect x="30" y="80" width="50" height="12" fill="#6b7280"/>` +
    `<rect x="50" y="60" width="8" height="20" fill="#6b7280"/>` +
    crane(320, 150, 70) +
    crane(350, 150, 50) +
    `<rect x="0" y="150" width="400" height="60" fill="#2f6ea8"/>` +
    ripples(166, "#7fa8c4"),

  /**
   * 古墳のある都。慶州専用。芝の古墳と石塔。
   */
  ancienttomb:
    sky("#8fc4e8", "#cfe4f0", 130) +
    clouds(300, 28, 1) +
    hills(128, "#8fae7a") +
    ground(130, "#8fae63") +
    moundTomb(60, 190, 34) +
    moundTomb(110, 195, 24) +
    moundTomb(150, 192, 18) +
    hongsalmun(268, 198, 46) +
    stonePagoda(330, 195, 60) +
    roundTree(370, 200, 12, "#3f8f4f"),

  /**
   * 火山の島。済州専用。漢拏山とトルハルバン、みかん畑。
   */
  volcanic:
    sky("#8fc4e8", "#cfe4f0", 150) +
    sun(40, 40, 16) +
    `<path d="M120,150L200,50L280,150z" fill="#7f8f5c"/>` +
    `<path d="M190,64L200,50L210,64z" fill="#5f7f4a"/>` +
    ground(150, "#8fae63") +
    dolharubangFigure(50, 200, 40) +
    dolharubangFigure(90, 202, 34) +
    shrubRow(230, 176, 6, 22, 9, "#f4941c") +
    shrubRow(230, 192, 6, 22, 9, "#3f8f4f"),

  /**
   * ふつうの町。天安。切妻の家並みと畑、道端の記念碑。
   */
  village:
    sky("#8fc4e8", "#cfe4f0", 122) +
    clouds(320, 28, 1) +
    hills(120, "#8fae7a") +
    ground(122, "#a8bd6a") +
    `<rect x="60" y="160" width="50" height="30" fill="#f6efe2"/><path d="M54,160h62l-8,-12h-46z" fill="#4a4436"/>` +
    `<rect x="130" y="170" width="40" height="20" fill="#f6efe2"/><path d="M125,170h50l-6,-10h-38z" fill="#4a4436"/>` +
    paddyRows(210, 178, 160, 4, "#7fa8c4") +
    // 記念碑(手前・右)
    `<rect x="360" y="172" width="8" height="34" fill="#8b8f98"/><path d="M356,172h16l-8,-14z" fill="#f5b31c"/>`,
};

export const KOREA_BG = { ...KOREA_BASE_BG };

// ---------------------------------------------------------------------------
// 都市シンボル(17種)。鍵は cities.mjs の `mark` と対応。24×24の座標系。
// ---------------------------------------------------------------------------

export const KOREA_MARKS = {
  /** 丹青の反り屋根。ソウル専用。 */
  palace:
    `<path d="M3,17h18v2H3z" fill="#4a4436"/>` +
    `<path d="M4,17Q8,9 12,9Q16,9 20,17Q17,12 12,12Q7,12 4,17z" fill="#c8102e"/>` +
    `<rect x="10" y="10" width="4" height="7" fill="#1a4a8f"/>` +
    `<rect x="6" y="19" width="12" height="2" fill="#6b5330"/>`,

  /** 監視塔と鉄条網。板門店専用。 */
  dmz:
    `<rect x="11" y="10" width="2" height="10" fill="#6b7060"/>` +
    `<rect x="6" y="4" width="12" height="7" fill="#6b7060"/>` +
    `<rect x="8" y="6" width="8" height="4" fill="#20364a"/>` +
    `<path d="M2,20l4,-3l4,3l4,-3l4,3l4,-3l4,3" fill="none" stroke="#5a5f52" stroke-width="1.4"/>`,

  /** 韓屋の反り屋根。水原・龍仁・全州・安東。 */
  hanok:
    `<rect x="6" y="15" width="12" height="6" fill="#f6efe2"/>` +
    `<path d="M3,15Q8,7 12,7Q16,7 21,15Q16,10 12,10Q8,10 3,15z" fill="#4a4a52"/>`,

  /** 石垣と城門。扶余・晋州。 */
  fortress:
    `<rect x="3" y="13" width="18" height="8" fill="#8a8478"/>` +
    `<g fill="#7a7468"><rect x="3" y="10" width="4" height="4"/><rect x="10" y="10" width="4" height="4"/><rect x="17" y="10" width="4" height="4"/></g>` +
    `<rect x="10" y="15" width="4" height="6" fill="#4a4436"/>`,

  /** 芝の古墳。慶州専用。 */
  tomb:
    `<path d="M2,20a10,7 0 0 1 20,0z" fill="#8fae63" stroke="#5f8a4a" stroke-width="1.2"/>` +
    `<ellipse cx="12" cy="20" rx="10" ry="1.6" fill="#5f8a4a" opacity=".5"/>`,

  /** 仮面。保寧・安東。 */
  festival:
    `<circle cx="12" cy="12" r="9" fill="#f4941c"/>` +
    `<circle cx="8.5" cy="10" r="1.6" fill="#241a10"/><circle cx="15.5" cy="10" r="1.6" fill="#241a10"/>` +
    `<path d="M7,16q5,5 10,0" fill="none" stroke="#241a10" stroke-width="1.6"/>` +
    `<path d="M4,6q8,-5 16,0" fill="none" stroke="#c8102e" stroke-width="2"/>`,

  /** 起重機と船。仁川・木浦・群山・麗水・統営。 */
  port:
    `<rect x="10" y="4" width="2" height="14" fill="#e8443f"/>` +
    `<rect x="10" y="4" width="9" height="2" fill="#e8443f"/>` +
    `<path d="M2,18h20l-3,4H5z" fill="#2f6ea8"/>`,

  /** ロープウェイの搬器。麗水・統営。 */
  cablecar:
    `<line x1="2" y1="6" x2="22" y2="16" stroke="#4a4a52" stroke-width="1.4"/>` +
    `<line x1="11" y1="11" x2="11" y2="15" stroke="#4a4a52" stroke-width="1.2"/>` +
    `<rect x="7" y="15" width="8" height="6" rx="1.4" fill="#e8443f"/>`,

  /** 二つ並んだ峰。束草・三陟・原州・平昌。 */
  mountain:
    `<path d="M2,20L9,7L14,14L17,9L22,20z" fill="#8b8f98"/>` +
    `<path d="M9,7L11,11L7,12z" fill="#f2f6f8"/>` +
    `<path d="M17,9L18.5,12L15.5,12.5z" fill="#f2f6f8"/>`,

  /** 水面とダム。春川・加平・忠州。 */
  lake:
    `<rect x="2" y="14" width="20" height="7" fill="#3f8fc4"/>` +
    `<path d="M2,14h20v-3l-4,2l-4,-2l-4,2l-4,-2l-4,2z" fill="#9a9488"/>` +
    `<path d="M4,18q4,-2 8,0t8,0" fill="none" stroke="#bfe8f4" stroke-width="1.2"/>`,

  /** 丘を覆う花や畝。高陽・順天・宝城。 */
  flowerfield:
    `<g fill="#c8384f"><circle cx="6" cy="15" r="3"/><circle cx="12" cy="17" r="3"/><circle cx="18" cy="15" r="3"/></g>` +
    `<g fill="#f4c430"><circle cx="6" cy="15" r="1.2"/><circle cx="12" cy="17" r="1.2"/><circle cx="18" cy="15" r="1.2"/></g>` +
    `<rect x="2" y="20" width="20" height="2" fill="#7fae5a"/>`,

  /** 窯・機・本。利川・淡陽・清州・光州。 */
  craft:
    `<path d="M6,21V13q0,-5 6,-5t6,5v8z" fill="#8a5a3a"/>` +
    `<rect x="10" y="4" width="4" height="4" fill="#8a5a3a"/>` +
    `<path d="M6,21h12v2H6z" fill="#4a4436"/>`,

  /** ロケットと回路。大田・世宗。 */
  science:
    `<path d="M12,3c3,4 3,10 2,14h-4c-1,-4 -1,-10 2,-14z" fill="#e8443f"/>` +
    `<circle cx="12" cy="9" r="1.8" fill="#bfe8f4"/>` +
    `<path d="M9,17l-3,4h3zM15,17l3,4h-3z" fill="#5b8fe8"/>`,

  /** 煙突と高炉。大邱・浦項・蔚山。 */
  industry:
    `<rect x="4" y="12" width="6" height="9" fill="#7f8896"/>` +
    `<rect x="12" y="7" width="4" height="14" fill="#6b7280"/>` +
    `<path d="M14,7c0,-3 3,-3 3,-6" fill="none" stroke="#c8ccc4" stroke-width="1.6" opacity=".8"/>`,

  /** 波と浜。江陵・釜山・欝陵島・西帰浦。 */
  coast:
    `<path d="M2,10q5,-4 10,0t10,0" fill="none" stroke="#3f8fc4" stroke-width="1.8"/>` +
    `<path d="M2,15q5,-4 10,0t10,0" fill="none" stroke="#5b8fe8" stroke-width="1.8"/>` +
    `<path d="M2,20h20" stroke="#e8dcc0" stroke-width="4"/>`,

  /** トルハルバン。済州専用。 */
  dolharubang:
    `<ellipse cx="12" cy="6" rx="6" ry="3" fill="#8b8f98"/>` +
    `<path d="M7,8q-1,8 0,13h10q1,-5 0,-13z" fill="#9a9ea4"/>` +
    `<circle cx="9.5" cy="11" r="1.3" fill="#241a10"/><circle cx="14.5" cy="11" r="1.3" fill="#241a10"/>`,

  /** 聖火の塔。天安専用。 */
  monument:
    `<rect x="9" y="12" width="6" height="9" fill="#8b8f98"/>` +
    `<path d="M12,3c-3,4 -3,7 0,9c3,-2 3,-5 0,-9z" fill="#f5b31c"/>` +
    `<path d="M12,6c-1.4,2 -1.4,3.4 0,4.6c1.4,-1.2 1.4,-2.6 0,-4.6z" fill="#e8443f"/>`,
};
