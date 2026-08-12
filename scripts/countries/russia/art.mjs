/**
 * ロシアの都市イラスト。
 *
 * `RUSSIA_MARKS` は24×24の座標系に描くシンボル、`RUSSIA_BG` は400×210の
 * 座標系に描く背景シーン(いずれもSVG断片の文字列)。イタリア・韓国と同じく
 * 最初から文字列として持つ。動きは含めない(アニメーションはReact側で重ねる)。
 *
 * 色は他の盤面と揃える。空 #8fc4e8〜#20364a、地面の緑 #2f4a33、
 * 顔・白 #f6efe2、強調 #f5b31c(金)/#e8443f(赤)/#5b8fe8(青)。
 * ロシアらしさは **クレムリンの赤煉瓦 #a83232・タマネギ屋根の金 #f4c430・
 * 白樺の白い幹 #f2f0e8・タイガの濃緑 #2f5f3f・凍土の淡い灰緑 #c4ccc0・
 * ヴォルガの青 #2a7196** で出す(geography.mjsの色と揃えてある)。
 *
 * 鍵は `cities.mjs` の `mark` / `bg` と一対一で対応する(同じキー名)。
 * 増やすときは両方を揃えること。
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

/** 起重機(港のクレーン)。 */
function crane(x, base, h, fill = "#e8443f") {
  return (
    `<rect x="${r1(x - 2)}" y="${r1(base - h)}" width="4" height="${h}" fill="${fill}"/>` +
    `<rect x="${r1(x - 2)}" y="${r1(base - h)}" width="${r1(h * 0.72)}" height="4" fill="${fill}"/>` +
    `<line x1="${r1(x + h * 0.6)}" y1="${r1(base - h + 2)}" x2="${r1(x + h * 0.6)}" y2="${r1(base - h * 0.55)}" stroke="${fill}" stroke-width="2"/>`
  );
}

/** タイガの針葉樹。三段の三角。 */
function pine(x, base, h, fill = "#2f5f3f") {
  const w = h * 0.42;
  return (
    `<rect x="${r1(x - 1.4)}" y="${r1(base - 4)}" width="2.8" height="4" fill="#5a4630"/>` +
    `<path d="M${x},${r1(base - h)}L${r1(x - w)},${r1(base - h * 0.42)}L${r1(x + w)},${r1(base - h * 0.42)}z" fill="${fill}"/>` +
    `<path d="M${x},${r1(base - h * 0.66)}L${r1(x - w * 0.8)},${r1(base - h * 0.12)}L${r1(x + w * 0.8)},${r1(base - h * 0.12)}z" fill="${fill}"/>`
  );
}

/** 白樺。白い幹に黒い横縞、小さな黄緑の樹冠。 */
function birch(x, base, h) {
  return (
    `<rect x="${r1(x - 1.6)}" y="${r1(base - h)}" width="3.2" height="${h}" fill="#f2f0e8"/>` +
    `<g fill="#3a3630"><rect x="${r1(x - 1.6)}" y="${r1(base - h * 0.8)}" width="3.2" height="1.6"/><rect x="${r1(x - 1.6)}" y="${r1(base - h * 0.5)}" width="3.2" height="1.6"/><rect x="${r1(x - 1.6)}" y="${r1(base - h * 0.2)}" width="3.2" height="1.6"/></g>` +
    `<ellipse cx="${x}" cy="${r1(base - h - 6)}" rx="9" ry="8" fill="#9fbf6a"/>`
  );
}

/** タマネギ屋根の小聖堂。ゴールデンリングの町で使う。 */
function onionChurch(x, base, r, domeColor = "#f4c430", wallColor = "#f6efe2") {
  const h = r * 2.6;
  return (
    `<rect x="${r1(x - r)}" y="${r1(base - h)}" width="${r1(r * 2)}" height="${h}" fill="${wallColor}"/>` +
    `<path d="M${r1(x - r * 1.1)},${r1(base - h)}c0,-${r1(r * 1.5)} ${r1(r * 2.2)},-${r1(r * 1.5)} ${r1(r * 2.2)},0z" fill="${domeColor}"/>` +
    `<rect x="${r1(x - 0.8)}" y="${r1(base - h - r * 1.9)}" width="1.6" height="${r1(r * 0.9)}" fill="${domeColor}"/>`
  );
}

/** クレムリンの塁壁(歯型の胸壁)。 */
function kremlinWall(x, y, w, h, fill = "#a83232") {
  const teeth = Math.max(2, Math.round(w / 14));
  const parts = [`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"/>`];
  for (let i = 0; i < teeth; i++) {
    parts.push(`<rect x="${r1(x + i * (w / teeth))}" y="${r1(y - 5)}" width="${r1(w / teeth / 2)}" height="5" fill="${fill}"/>`);
  }
  return parts.join("");
}

/** クレムリンの尖塔(天幕屋根)。 */
function kremlinTower(x, base, w, h, fill = "#8f2d2d", roof = "#3f6f4a") {
  return (
    `<rect x="${r1(x - w / 2)}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${fill}"/>` +
    `<path d="M${r1(x - w / 2 - 2)},${r1(base - h)}L${x},${r1(base - h - w)}L${r1(x + w / 2 + 2)},${r1(base - h)}z" fill="${roof}"/>` +
    `<circle cx="${x}" cy="${r1(base - h - w - 5)}" r="2" fill="#f4c430"/>`
  );
}

/** 木造の家(イズバー)。切妻屋根、白樺と並べて使う。 */
function izba(x, base, w, h, roof = "#8f2d2d", wall = "#c9a877") {
  return (
    `<rect x="${x}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${wall}"/>` +
    `<path d="M${r1(x - 3)},${r1(base - h)}L${r1(x + w / 2)},${r1(base - h - w * 0.55)}L${r1(x + w + 3)},${r1(base - h)}z" fill="${roof}"/>` +
    `<rect x="${r1(x + w / 2 - 3)}" y="${r1(base - h * 0.5)}" width="6" height="${r1(h * 0.5)}" fill="#5a4630"/>`
  );
}

/** 麦畑の畝(ステップ)。 */
function wheatRows(x, y, w, rows, color = "#c8a860") {
  const parts = [];
  for (let i = 0; i < rows; i++) {
    parts.push(`<rect x="${x}" y="${r1(y + i * 6)}" width="${w}" height="3" fill="${color}" opacity="${r1(0.5 + i * 0.06)}"/>`);
  }
  return `<g>${parts.join("")}</g>`;
}

/** 流氷・氷塊。 */
function iceFloe(x, y, rx, ry, fill = "#eef4f6") {
  return `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${fill}" stroke="#c4dbe0" stroke-width="1"/>`;
}

/** 石油の採掘やぐら(ポンプジャック)。 */
function derrick(x, base, h, fill = "#4a4a52") {
  return (
    `<path d="M${r1(x - h * 0.28)},${base}L${x},${r1(base - h)}L${r1(x + h * 0.28)},${base}" fill="none" stroke="${fill}" stroke-width="2.4"/>` +
    `<path d="M${r1(x - h * 0.16)},${r1(base - h * 0.55)}h${r1(h * 0.32)}" stroke="${fill}" stroke-width="1.6"/>` +
    `<rect x="${r1(x - 1.5)}" y="${r1(base - 4)}" width="3" height="4" fill="#2a2a30"/>`
  );
}

/** サユーズ風のロケットと発射塔。 */
function rocketShape(x, base, h) {
  const w = h * 0.16;
  return (
    `<path d="M${r1(x - w)},${base}L${r1(x - w)},${r1(base - h * 0.75)}Q${x},${r1(base - h)} ${r1(x + w)},${r1(base - h * 0.75)}L${r1(x + w)},${base}z" fill="#e8e0cc" stroke="#9a8f70" stroke-width="1"/>` +
    `<path d="M${r1(x - w)},${base}l-6,10h${r1(w * 2 + 6)}l-6,-10z" fill="#e8443f"/>` +
    `<line x1="${r1(x - w - 10)}" y1="${base}" x2="${r1(x - w - 10)}" y2="${r1(base - h * 0.7)}" stroke="#8f96a0" stroke-width="2"/>` +
    `<line x1="${r1(x - w - 10)}" y1="${r1(base - h * 0.35)}" x2="${r1(x - w)}" y2="${r1(base - h * 0.35)}" stroke="#8f96a0" stroke-width="1.6"/>`
  );
}

/** カフカス・ウラルの峰。雪冠つき。 */
function peak(cx, base, h, fill = "#8b8f98") {
  return (
    `<path d="M${r1(cx - h * 0.55)},${base}L${cx},${r1(base - h)}L${r1(cx + h * 0.55)},${base}z" fill="${fill}"/>` +
    `<path d="M${cx},${r1(base - h)}L${r1(cx - h * 0.16)},${r1(base - h * 0.72)}L${r1(cx + h * 0.16)},${r1(base - h * 0.72)}z" fill="#f2f6f8"/>`
  );
}

/** 噴煙。 */
function smokePuffs(cx, topY, count = 3) {
  const parts = [];
  for (let i = 0; i < count; i++) {
    parts.push(`<circle cx="${r1(cx + i * 4 - count * 2)}" cy="${r1(topY - i * 7)}" r="${r1(4 + i * 1.4)}" fill="#c8ccc4" opacity="${r1(0.85 - i * 0.15)}"/>`);
  }
  return `<g>${parts.join("")}</g>`;
}

// ---------------------------------------------------------------------------
// 背景(17種)
// ---------------------------------------------------------------------------

const RUSSIA_BASE_BG = {
  /** モスクワ専用。赤の広場、クレムリンの壁、聖ワシリイのタマネギ屋根群。 */
  capital:
    sky("#8fc4e8", "#cfe4f0", 134) +
    clouds(70, 26, 1) + clouds(320, 20, 0.7) +
    ground(134, "#b8ac8e") +
    kremlinWall(20, 108, 130, 26, "#a83232") +
    kremlinTower(40, 134, 12, 32) +
    kremlinTower(130, 134, 12, 30, "#a83232", "#f4c430") +
    onionChurch(280, 150, 12, "#3fae5a", "#f6efe2") +
    onionChurch(310, 156, 9, "#f4c430", "#f6efe2") +
    onionChurch(335, 150, 11, "#2a7196", "#f6efe2") +
    onionChurch(358, 158, 8, "#e8443f", "#f6efe2") +
    onionChurch(300, 162, 7, "#f6efe2", "#c9714a") +
    `<g fill="#9a8f70" opacity=".8">${Array.from({ length: 9 }).map((_, i) => `<rect x="${20 + i * 42}" y="196" width="30" height="12"/>`).join("")}</g>` +
    birch(24, 200, 26) + birch(378, 202, 24) +
    gull(60, 40, 0.8) + gull(340, 34, 0.7),

  /** ゴールデンリング(ヤロスラヴリ・ヴラジーミル・スーズダリ・ヴォログダ・ノヴゴロド・ペトロザヴォーツク)。 */
  goldenring:
    sky("#8fc4e8", "#cfe4f0", 138) +
    clouds(90, 24, 0.9) +
    band(138, 30, "#3f7fae") +
    ripples(150, "#bfe8f4") + ripples(162, "#9fd0e4") +
    ground(168, "#8ba85a") +
    onionChurch(70, 150, 14, "#2a7196", "#f6efe2") +
    onionChurch(100, 156, 9, "#f4c430", "#f6efe2") +
    onionChurch(300, 148, 15, "#f4c430", "#f6efe2") +
    onionChurch(330, 154, 10, "#e8443f", "#f6efe2") +
    `<rect x="30" y="150" width="320" height="8" fill="#9a8f70"/>` +
    birch(20, 200, 30) + birch(50, 204, 22) + birch(360, 198, 28) + birch(388, 206, 20) +
    `<g fill="#c9a877" opacity=".8">${Array.from({ length: 6 }).map((_, i) => `<rect x="${60 + i * 50}" y="192" width="34" height="10"/>`).join("")}</g>` +
    gull(200, 36, 0.8) + gull(230, 46, 0.6),

  /** リャザン・スモレンスク・プスコフ。石積みの要塞都市。 */
  fortress:
    sky("#8fc4e8", "#cfe4f0", 150) +
    clouds(60, 24, 0.9) +
    hills(138, "#7f9968", 4) +
    band(150, 20, "#3f7fae") +
    ripples(160, "#bfe8f4") +
    ground(170, "#7f9968") +
    kremlinWall(24, 130, 120, 24, "#8a8478") +
    kremlinTower(34, 154, 14, 40, "#79746a", "#5a5650") +
    kremlinTower(130, 154, 14, 34, "#79746a", "#5a5650") +
    kremlinWall(260, 130, 120, 24, "#8a8478") +
    kremlinTower(360, 154, 14, 38, "#79746a", "#5a5650") +
    pine(20, 198, 26) + pine(380, 200, 24) + pine(390, 204, 18) +
    `<g fill="#9a8f70" opacity=".8">${Array.from({ length: 5 }).map((_, i) => `<rect x="${150 + i * 20}" y="188" width="14" height="12"/>`).join("")}</g>` +
    gull(200, 40, 0.7),

  /** ヴォルゴグラード・ロストフ・クラスノダール・スタヴロポリ・ヴラジカフカス。草原と麦畑。 */
  steppe:
    sky("#8fc4e8", "#cfe4f0", 150) +
    sun(340, 40, 20) +
    clouds(80, 26, 0.9) +
    hills(148, "#c2b559", 4) +
    ground(150, "#c8a860") +
    wheatRows(20, 156, 130, 8) +
    wheatRows(250, 160, 130, 7) +
    peak(370, 150, 34, "#8b8f98") +
    `<g fill="#8a7a3a" opacity=".85"><path d="M170,205q4,-16 8,0z"/><path d="M182,207q4,-18 8,0z"/><path d="M194,205q4,-15 8,0z"/></g>` +
    `<g><ellipse cx="60" cy="188" rx="10" ry="5" fill="#5a4a30"/><rect x="55" y="176" width="3" height="14" fill="#5a4a30"/></g>` +
    `<g fill="#f2f0e8" opacity=".9"><circle cx="120" cy="196" r="3"/><circle cx="128" cy="198" r="3"/><circle cx="136" cy="196" r="3"/></g>` +
    gull(300, 44, 0.8) + gull(30, 40, 0.6),

  /** ソチ専用。亜熱帯の海岸とヤシ、背後のカフカスの山。 */
  coast:
    sky("#8fc4e8", "#dff0f4", 140) +
    clouds(320, 24, 0.9) +
    peak(60, 150, 60, "#8b8f98") +
    peak(110, 152, 46, "#9a9a94") +
    band(140, 34, "#2a7196") +
    ripples(150, "#bfe8f4") + ripples(164, "#9fd0e4") +
    ground(174, "#e8dcb0") +
    `<g fill="#3f7a45"><rect x="330" y="150" width="4" height="30" transform="rotate(8 332 165)"/><path d="M332,150c-16,-4 -24,4 -26,10c10,-2 16,2 26,-10z"/><path d="M332,150c16,-4 24,4 26,10c-10,-2 -16,2 -26,-10z"/><path d="M332,150c-6,-14 4,-22 10,-24c-2,10 2,16 -10,24z"/></g>` +
    `<g fill="#3f7a45"><rect x="30" y="156" width="4" height="26" transform="rotate(-8 32 169)"/><path d="M32,156c-14,-3 -20,4 -22,9c8,-2 14,2 22,-9z"/><path d="M32,156c14,-3 20,4 22,9c-8,-2 -14,2 -22,-9z"/></g>` +
    `<g fill="#e8443f"><path d="M180,180a14,10 0 0 1 28,0z"/></g><rect x="192" y="174" width="4" height="6" fill="#6b5330"/>` +
    `<g fill="#f6efe2"><rect x="170" y="192" width="10" height="6"/><rect x="210" y="192" width="10" height="6"/><rect x="60" y="196" width="10" height="6"/></g>` +
    `<g fill="#e8443f" opacity=".85"><path d="M64,190a6,6 0 0 1 12,0z"/></g><rect x="69" y="186" width="2" height="4" fill="#6b5330"/>` +
    `<g stroke="#c9a877" stroke-width="1.2" opacity=".8"><path d="M40,205h340"/></g>` +
    `<g fill="#f2f0e8" opacity=".9"><circle cx="90" cy="200" r="2.4"/><circle cx="240" cy="202" r="2"/></g>` +
    gull(250, 40, 0.8) + gull(270, 32, 0.6) + gull(150, 46, 0.7) + gull(200, 54, 0.5),

  /** アストラハン専用。ヴォルガデルタの葦とキャビア漁、スイカ畑。 */
  caspian:
    sky("#8fc4e8", "#cfe4f0", 142) +
    clouds(90, 24, 0.8) +
    band(142, 40, "#3f7fae") +
    ripples(150, "#bfe8f4") + ripples(166, "#9fd0e4") + ripples(178, "#bfe8f4") +
    `<g stroke="#5f7f3a" stroke-width="2" opacity=".85"><path d="M20,182v-24M28,182v-30M36,182v-22M44,182v-28M52,182v-18"/><path d="M336,182v-26M344,182v-20M352,182v-30M360,182v-24M368,182v-16"/></g>` +
    ground(182, "#c8b478") +
    `<g fill="#3f8f4f"><ellipse cx="130" cy="196" rx="18" ry="10"/><path d="M112,196q18,-10 36,0z" fill="#2f5f3f" opacity=".4"/></g>` +
    `<g fill="#3f8f4f"><ellipse cx="270" cy="200" rx="16" ry="9"/></g>` +
    `<path d="M60,166l16,-4v10z" fill="#e8e0cc"/><rect x="58" y="172" width="4" height="10" fill="#5a4630"/>` +
    `<path d="M300,170l14,-3v9z" fill="#e8e0cc"/><rect x="298" y="176" width="4" height="8" fill="#5a4630"/>` +
    `<g fill="#4a4a52" opacity=".85"><rect x="150" y="200" width="10" height="6"/><rect x="164" y="200" width="10" height="6"/><rect x="226" y="200" width="10" height="6"/><rect x="240" y="200" width="10" height="6"/></g>` +
    `<g fill="#e8443f" opacity=".8"><circle cx="20" cy="60" r="1.6"/><circle cx="34" cy="66" r="1.4"/><circle cx="366" cy="62" r="1.6"/></g>` +
    `<g fill="#8f2d2d" opacity=".8"><path d="M170,192q4,-10 8,0z"/><path d="M182,194q4,-11 8,0z"/></g>` +
    gull(220, 40, 0.7) + gull(200, 50, 0.6) + gull(240, 34, 0.6),

  /** カザン専用。クレムリンの壁の中に正教の聖堂とモスクが並ぶ。 */
  domes:
    sky("#8fc4e8", "#cfe4f0", 136) +
    clouds(60, 24, 0.9) +
    ground(136, "#b8ac8e") +
    kremlinWall(20, 112, 360, 24, "#c9a877") +
    onionChurch(90, 136, 15, "#2a7196", "#f6efe2") +
    onionChurch(120, 142, 10, "#f4c430", "#f6efe2") +
    `<rect x="270" y="90" width="8" height="46" fill="#f6efe2"/><path d="M270,90a4,6 0 0 1 8,0z" fill="#3fae5a"/><rect x="273" y="82" width="2" height="8" fill="#3fae5a"/>` +
    `<path d="M240,136a30,26 0 0 1 60,0z" fill="#3fae5a"/><rect x="238" y="136" width="64" height="14" fill="#f6efe2"/>` +
    `<rect x="330" y="96" width="8" height="40" fill="#f6efe2"/><path d="M330,96a4,6 0 0 1 8,0z" fill="#3fae5a"/>` +
    `<g fill="#9a8f70" opacity=".8">${Array.from({ length: 8 }).map((_, i) => `<rect x="${20 + i * 46}" y="196" width="32" height="12"/>`).join("")}</g>` +
    gull(200, 40, 0.7) + gull(190, 50, 0.6),

  /** エカテリンブルク専用。欧亜境界の標柱と低い山、白樺林。 */
  urals:
    sky("#8fc4e8", "#cfe4f0", 150) +
    clouds(300, 26, 0.9) +
    hills(138, "#7f9968", 4) +
    peak(60, 148, 40, "#9a9a94") +
    peak(100, 150, 30, "#8b8f98") +
    ground(150, "#7f9968") +
    `<rect x="196" y="120" width="8" height="40" fill="#e8e0cc"/><path d="M196,120L200,110L204,120z" fill="#e8443f"/>` +
    `<g fill="#f6efe2" font-size="0"><rect x="192" y="126" width="6" height="4"/><rect x="202" y="126" width="6" height="4"/></g>` +
    birch(230, 198, 32) + birch(260, 204, 26) + birch(300, 200, 30) + birch(60, 206, 22) +
    `<g fill="#9a8f70" opacity=".8"><rect x="320" y="188" width="60" height="14"/><path d="M316,188c0,-8 68,-8 68,0z" fill="#8f2d2d"/></g>` +
    gull(150, 40, 0.7),

  /** ペルミ・ウファ・チェリャビンスク・ケメロヴォ。工業都市。 */
  industrial:
    sky("#7fa8c8", "#c4ccc0", 148) +
    ground(148, "#8a8478") +
    `<rect x="20" y="110" width="30" height="38" fill="#6f6f78"/><rect x="52" y="120" width="24" height="28" fill="#7f7f88"/>` +
    smokePuffs(30, 110, 4) + smokePuffs(64, 120, 3) +
    `<rect x="300" y="96" width="26" height="52" fill="#6f6f78"/>` + smokePuffs(313, 96, 4) +
    `<rect x="340" y="112" width="22" height="36" fill="#7f7f88"/>` + smokePuffs(351, 112, 3) +
    `<g stroke="#4a4a52" stroke-width="3"><path d="M0,168h400"/></g>` +
    `<g fill="#4a4a52"><rect x="90" y="150" width="60" height="14"/><rect x="230" y="150" width="50" height="14"/></g>` +
    `<g fill="#9a9a94" opacity=".8">${Array.from({ length: 10 }).map((_, i) => `<rect x="${8 + i * 40}" y="180" width="28" height="4"/>`).join("")}</g>` +
    crane(180, 168, 40, "#e8443f") +
    gull(210, 40, 0.7),

  /** サマラ専用。発射台のロケットとヴォルガ河岸。 */
  rocket:
    sky("#3a4f78", "#8fc4e8", 150) +
    `<g fill="#f2f0e8" opacity=".8"><circle cx="60" cy="40" r="1.4"/><circle cx="90" cy="26" r="1"/><circle cx="330" cy="34" r="1.4"/><circle cx="360" cy="50" r="1"/><circle cx="140" cy="30" r="1"/></g>` +
    clouds(300, 30, 0.8) +
    hills(148, "#7f9968", 4) +
    band(150, 30, "#2a7196") +
    ripples(160, "#bfe8f4") +
    ground(180, "#7f9968") +
    rocketShape(300, 180, 92) +
    smokePuffs(300, 178, 5) +
    `<g fill="#9a8f70" opacity=".8">${Array.from({ length: 6 }).map((_, i) => `<rect x="${20 + i * 20}" y="196" width="14" height="8"/>`).join("")}</g>` +
    birch(30, 198, 24) +
    gull(180, 40, 0.8) + gull(200, 50, 0.6),

  /** トヴェリ・ニジニノヴゴロド・サラトフ・ハバロフスク・ブラゴヴェシチェンスク・ビロビジャン。大きな川と橋。 */
  river:
    sky("#8fc4e8", "#cfe4f0", 130) +
    clouds(60, 24, 0.9) +
    hills(128, "#7f9968", 3) +
    ground(130, "#8ba85a") +
    band(150, 40, "#2a7196") +
    ripples(160, "#bfe8f4") + ripples(176, "#9fd0e4") +
    `<path d="M0,150c60,-18 100,-18 160,0" fill="none" stroke="#c9a877" stroke-width="7"/>` +
    `<path d="M240,150c60,-18 100,-18 160,0" fill="none" stroke="#c9a877" stroke-width="7"/>` +
    `<g fill="#9a8f70">${Array.from({ length: 3 }).map((_, i) => `<rect x="${190 + i * 20}" y="146" width="4" height="8"/>`).join("")}</g>` +
    `<g fill="#e8dcc0" opacity=".9">${Array.from({ length: 5 }).map((_, i) => `<rect x="${20 + i * 16}" y="116" width="10" height="14"/>`).join("")}</g>` +
    birch(360, 200, 26) + birch(20, 202, 22) +
    `<path d="M290,168l14,-6v10z" fill="#f6efe2"/><rect x="288" y="172" width="3" height="8" fill="#5a4630"/>` +
    gull(120, 40, 0.7) + gull(140, 50, 0.6),

  /** オムスク・ノヴォシビルスク・トムスク・バルナウル・クラスノヤルスク。タイガの針葉樹林。 */
  taiga:
    sky("#8fc4e8", "#cfe4f0", 150) +
    clouds(80, 24, 0.8) +
    hills(148, "#5f7f5a", 4) +
    ground(150, "#3f5a3a") +
    pine(30, 200, 34) + pine(60, 206, 26) + pine(20, 208, 20) +
    pine(340, 198, 32) + pine(370, 206, 24) + pine(390, 210, 18) +
    `<g fill="#e8dcc0">${Array.from({ length: 4 }).map((_, i) => `<rect x="${150 + i * 24}" y="176" width="16" height="20"/>`).join("")}</g>` +
    `<g fill="#8f2d2d">${Array.from({ length: 4 }).map((_, i) => `<path d="M${148 + i * 24},176L${158 + i * 24},166L${168 + i * 24},176z"/>`).join("")}</g>` +
    `<path d="M0,196h400" stroke="#5a4630" stroke-width="3"/>` +
    gull(230, 40, 0.7),

  /** イルクーツク・ウランウデ専用。バイカル湖と対岸の山。 */
  baikal:
    sky("#8fc4e8", "#dff0f4", 140) +
    clouds(300, 26, 0.9) +
    peak(60, 150, 36, "#8b8f98") +
    peak(340, 150, 40, "#9a9a94") +
    band(140, 50, "#3f8fc4") +
    ripples(150, "#bfe8f4") + ripples(166, "#9fd0e4") + ripples(182, "#bfe8f4") +
    ground(190, "#7f9968") +
    iceFloe(120, 178, 14, 5) + iceFloe(150, 184, 10, 4) + iceFloe(260, 176, 12, 4.5) + iceFloe(60, 186, 9, 3.5) +
    `<path d="M200,170l16,-6v10z" fill="#f6efe2"/><rect x="198" y="174" width="3" height="8" fill="#5a4630"/>` +
    pine(30, 198, 24) + pine(380, 200, 22) + pine(20, 204, 18) + pine(392, 206, 16) +
    peak(180, 150, 22, "#9a9a94") +
    `<g fill="#f2f0e8" opacity=".85"><circle cx="80" cy="34" r="1.4"/><circle cx="320" cy="30" r="1.2"/></g>` +
    gull(180, 40, 0.8) + gull(160, 50, 0.6) + gull(230, 36, 0.6),

  /** チュメニ専用。油田のやぐらとパイプライン。 */
  oil:
    sky("#8fc4e8", "#cfe4f0", 148) +
    hills(146, "#7f9968", 3) +
    ground(148, "#6f7f5a") +
    derrick(70, 190, 46) + derrick(140, 194, 36) + derrick(320, 188, 50) + derrick(360, 192, 32) +
    `<g stroke="#4a4a52" stroke-width="4"><path d="M0,180h400"/></g>` +
    `<g fill="#4a4a52"><rect x="30" y="176" width="10" height="10" rx="2"/><rect x="200" y="176" width="10" height="10" rx="2"/><rect x="270" y="176" width="10" height="10" rx="2"/></g>` +
    `<circle cx="230" cy="176" r="10" fill="#8a8478"/>` +
    pine(20, 200, 22) + pine(380, 202, 20) + pine(400, 208, 16) +
    smokePuffs(70, 144, 3) + smokePuffs(320, 138, 3) +
    `<g fill="#c8ccc4" opacity=".85"><rect x="100" y="170" width="16" height="10"/><rect x="118" y="174" width="10" height="6"/></g>` +
    gull(250, 40, 0.7) + gull(180, 32, 0.6),

  /** ノリリスク・ヤクーツク。凍土と低い極夜の太陽。 */
  permafrost:
    sky("#3a4f78", "#c4ccc0", 150) +
    sun(60, 40, 16, "#f5b31c") +
    clouds(300, 24, 0.7) +
    ground(150, "#c4ccc0") +
    `<g stroke="#a8b0a4" stroke-width="1.4" opacity=".8"><path d="M20,170l40,-6M120,180l50,-8M260,172l60,-10M300,190l40,-6"/></g>` +
    `<g fill="#e8e0cc">${Array.from({ length: 4 }).map((_, i) => `<rect x="${180 + i * 40}" y="150" width="24" height="30"/><rect x="${182 + i * 40}" y="180" width="4" height="14" fill="#8a8f95"/><rect x="${198 + i * 40}" y="180" width="4" height="14" fill="#8a8f95"/>`).join("")}</g>` +
    iceFloe(50, 190, 16, 5) + iceFloe(90, 196, 12, 4) + iceFloe(340, 188, 14, 5) + iceFloe(370, 196, 10, 4) +
    `<g fill="#f2f0e8" opacity=".9"><circle cx="360" cy="60" r="1.2"/><circle cx="30" cy="90" r="1"/><circle cx="200" cy="70" r="1"/></g>` +
    `<g fill="#3a3630" opacity=".8"><path d="M40,140q4,-6 8,0q-4,4 -8,0z"/><path d="M340,150q4,-6 8,0q-4,4 -8,0z"/></g>` +
    gull(110, 40, 0.7) + gull(50, 30, 0.6),

  /** ムルマンスク・アルハンゲリスク・ウラジオストク・マガダン・ユジノサハリンスク。港とクレーン。 */
  port:
    sky("#8fc4e8", "#cfe4f0", 140) +
    clouds(70, 24, 0.9) +
    hills(138, "#7f9968", 3) +
    ground(140, "#8a8478") +
    band(150, 40, "#16324f") +
    ripples(160, "#1e4266") + ripples(176, "#2a4a6e") +
    crane(70, 150, 48, "#e8443f") +
    crane(130, 150, 36, "#f4c430") +
    crane(320, 150, 44, "#e8443f") +
    `<rect x="180" y="130" width="70" height="18" fill="#e8e0cc"/><rect x="180" y="126" width="70" height="6" fill="#e8443f"/><rect x="245" y="112" width="8" height="18" fill="#4a4a52"/>` +
    `<g fill="#9a8f70" opacity=".8">${Array.from({ length: 8 }).map((_, i) => `<rect x="${8 + i * 40}" y="196" width="26" height="10"/>`).join("")}</g>` +
    gull(200, 40, 0.8) + gull(220, 30, 0.6) + gull(160, 50, 0.7),

  /** ペトロパブロフスク・カムチャツキー専用。噴煙を上げる火山と入り江の町。 */
  volcano:
    sky("#8fc4e8", "#cfe4f0", 140) +
    clouds(300, 24, 0.8) +
    `<path d="M20,140L110,20L200,140z" fill="#4a3c30"/>` +
    `<path d="M90,50a20,20 0 0 1 40,0z" fill="#f2f6f8"/>` +
    smokePuffs(110, 22, 4) +
    `<path d="M180,140L260,60L340,140z" fill="#5a4a38"/><path d="M245,80a14,14 0 0 1 30,0z" fill="#f2f6f8"/>` +
    ground(140, "#7f9968") +
    band(160, 30, "#2a7196") +
    ripples(168, "#bfe8f4") +
    `<g fill="#e8dcc0" opacity=".9">${Array.from({ length: 5 }).map((_, i) => `<rect x="${30 + i * 16}" y="150" width="10" height="12"/>`).join("")}</g>` +
    `<g fill="#8f2d2d" opacity=".85">${Array.from({ length: 5 }).map((_, i) => `<path d="M${28 + i * 16},150L${33 + i * 16},144L${38 + i * 16},150z"/>`).join("")}</g>` +
    `<path d="M320,166l16,-6v10z" fill="#f6efe2"/><rect x="318" y="170" width="3" height="10" fill="#5a4630"/>` +
    `<path d="M360,172l12,-5v8z" fill="#e8e0cc"/><rect x="358" y="176" width="3" height="6" fill="#5a4630"/>` +
    peak(370, 140, 24, "#6f5a48") +
    `<g fill="#f2f0e8" opacity=".85"><circle cx="60" cy="34" r="1.4"/><circle cx="330" cy="30" r="1.2"/></g>` +
    ground(190, "#8a8478") +
    gull(140, 40, 0.7) + gull(160, 50, 0.6) + gull(230, 44, 0.6),
};

export const RUSSIA_BG = { ...RUSSIA_BASE_BG };

// ---------------------------------------------------------------------------
// 都市シンボル(21種)。鍵は cities.mjs の `mark` と対応。24×24の座標系。
// ---------------------------------------------------------------------------

export const RUSSIA_MARKS = {
  /** クレムリンの塁壁と塔。モスクワ専用。 */
  kremlin:
    `<rect x="2" y="14" width="20" height="8" fill="#a83232"/>` +
    `<g fill="#a83232"><rect x="3" y="10" width="3" height="4"/><rect x="9" y="10" width="3" height="4"/><rect x="15" y="10" width="3" height="4"/></g>` +
    `<rect x="9" y="3" width="6" height="9" fill="#8f2d2d"/>` +
    `<path d="M8,3a4,4 0 0 1 8,0z" fill="#f4c430"/>`,

  /** バロックの宮殿。サンクトペテルブルク専用。 */
  palace:
    `<rect x="2" y="12" width="20" height="10" fill="#7fb3c9"/>` +
    `<g fill="#f2f0e8"><rect x="4" y="14" width="2" height="8"/><rect x="8" y="14" width="2" height="8"/><rect x="14" y="14" width="2" height="8"/><rect x="18" y="14" width="2" height="8"/></g>` +
    `<rect x="9" y="6" width="6" height="6" fill="#f2f0e8"/><path d="M9,6a3,3 0 0 1 6,0z" fill="#f4c430"/>`,

  /** タマネギ屋根の白い聖堂。ゴールデンリングの古都に使う。 */
  church:
    `<rect x="7" y="14" width="10" height="8" fill="#f6efe2"/>` +
    `<path d="M6,14c0,-6 12,-6 12,0z" fill="#2a7196"/>` +
    `<rect x="11.2" y="4" width="1.6" height="4" fill="#2a7196"/>`,

  /** 石積みの塁壁。国境の要塞都市。 */
  fortress:
    `<rect x="2" y="13" width="20" height="9" fill="#8a8478"/>` +
    `<g fill="#8a8478"><rect x="3" y="9" width="3" height="4"/><rect x="9" y="9" width="3" height="4"/><rect x="15" y="9" width="3" height="4"/></g>` +
    `<rect x="9" y="5" width="6" height="8" fill="#79746a"/>`,

  /** 川港と小舟。ヴォルガ・アムール・極東の川港。 */
  river:
    `<rect x="2" y="16" width="20" height="6" fill="#2a7196"/>` +
    `<path d="M4,16l14,-2v6l-14,2z" fill="#e8dcc0"/>` +
    `<rect x="10" y="9" width="2" height="7" fill="#5a4630"/>`,

  /** ヤシと波。黒海の保養地。 */
  coast:
    `<path d="M2,20q10,-6 20,0v2H2z" fill="#2a7196"/>` +
    `<rect x="10" y="10" width="2" height="10" fill="#6b5330"/>` +
    `<path d="M11,10c-6,-1 -8,3 -9,5c4,-1 7,1 9,-5z" fill="#3f7a45"/>` +
    `<path d="M11,10c6,-1 8,3 9,5c-4,-1 -7,1 -9,-5z" fill="#3f7a45"/>`,

  /** 剣を掲げる戦没者記念像。 */
  memorial:
    `<rect x="10" y="6" width="4" height="14" fill="#8a8478"/>` +
    `<path d="M12,2l2,6h-4z" fill="#c8ccc4"/>` +
    `<rect x="6" y="20" width="12" height="2" fill="#8a8478"/>`,

  /** 麦の穂と地平線。南部の草原。 */
  steppe:
    `<rect x="2" y="18" width="20" height="4" fill="#c8a860"/>` +
    `<g stroke="#8a7a3a" stroke-width="1.4"><path d="M5,18v-8M9,18v-10M13,18v-8M17,18v-9"/></g>` +
    `<circle cx="20" cy="5" r="2.4" fill="#f5b31c"/>`,

  /** 正教とイスラームの二つの丸屋根。カザンの二つの信仰。 */
  domes:
    `<rect x="2" y="15" width="8" height="7" fill="#f6efe2"/><path d="M2,15c0,-5 8,-5 8,0z" fill="#2a7196"/>` +
    `<rect x="13" y="15" width="8" height="7" fill="#f6efe2"/><path d="M13,15a4,5 0 0 1 8,0z" fill="#3fae5a"/><rect x="16.2" y="6" width="1.6" height="6" fill="#3fae5a"/>`,

  /** 雪冠の山。カフカスの山あい。 */
  caucasus:
    `<path d="M2,20L9,7L14,14L17,9L22,20z" fill="#8b8f98"/>` +
    `<path d="M9,7L11,11L7,12z" fill="#f2f6f8"/>`,

  /** 欧亜境界の標柱。ウラル・欧亜の境。 */
  urals:
    `<rect x="10" y="6" width="4" height="14" fill="#e8e0cc"/>` +
    `<path d="M10,6L12,2L14,6z" fill="#e8443f"/>` +
    `<path d="M2,20a10,5 0 0 1 20,0z" fill="#9a9a94" opacity=".7"/>`,

  /** 煙突と工場。工業都市。 */
  industry:
    `<rect x="3" y="12" width="14" height="9" fill="#8f96a0"/>` +
    `<rect x="15" y="5" width="4" height="16" fill="#7f8896"/>` +
    `<path d="M17,5c0,-3 3,-3 3,-6" fill="none" stroke="#c8ccc4" stroke-width="1.4" opacity=".8"/>`,

  /** サユーズ風のロケット。サマラの宇宙開発。 */
  rocket:
    `<path d="M9,20L9,9Q12,4 15,9L15,20z" fill="#e8e0cc" stroke="#9a8f70" stroke-width=".8"/>` +
    `<path d="M9,20l-4,4h14l-4,-4z" fill="#e8443f"/>`,

  /** タイガの針葉樹。シベリアの針葉樹林。 */
  taiga:
    `<rect x="10.6" y="18" width="2.4" height="4" fill="#5a4630"/>` +
    `<path d="M12,3L4,16h16z" fill="#2f5f3f"/>` +
    `<path d="M12,9L6,20h12z" fill="#3f6f4a"/>`,

  /** 研究施設と軌道環。ノヴォシビルスク(アカデムゴロドク)。 */
  science:
    `<circle cx="12" cy="12" r="4" fill="#5b8fe8"/>` +
    `<ellipse cx="12" cy="12" rx="10" ry="3.4" fill="none" stroke="#8a8f95" stroke-width="1.2"/>` +
    `<ellipse cx="12" cy="12" rx="10" ry="3.4" fill="none" stroke="#8a8f95" stroke-width="1.2" transform="rotate(60 12 12)"/>`,

  /** 湖と小舟。バイカル湖畔。 */
  lake:
    `<rect x="2" y="15" width="20" height="6" fill="#3f8fc4"/>` +
    `<path d="M8,15c6,-6 8,-2 12,0" fill="none" stroke="#bfe8f4" stroke-width="1.2"/>` +
    `<path d="M4,17c4,-3 12,-3 16,0l-2,3H6z" fill="#f6efe2"/>`,

  /** 仏塔(ダツァン)。ウランウデの仏教。 */
  buddha:
    `<rect x="8" y="16" width="8" height="6" fill="#f4c430"/>` +
    `<rect x="9" y="10" width="6" height="6" fill="#e8443f"/>` +
    `<path d="M7,10L12,4L17,10z" fill="#f4c430"/>`,

  /** 凍土の低い太陽と割れ目。永久凍土。 */
  permafrost:
    `<rect x="2" y="17" width="20" height="5" fill="#c4ccc0"/>` +
    `<circle cx="18" cy="8" r="4" fill="#f5b31c"/>` +
    `<path d="M4,19l5,-3M12,20l5,-4" stroke="#a8b0a4" stroke-width="1.2"/>`,

  /** 起重機と船。北極海・太平洋の港。 */
  port:
    `<rect x="10" y="4" width="2" height="14" fill="#e8443f"/>` +
    `<rect x="10" y="4" width="9" height="2" fill="#e8443f"/>` +
    `<path d="M2,18h20l-3,4H5z" fill="#2a7196"/>`,

  /** 噴煙を上げる火山。カムチャツカ。 */
  volcano:
    `<path d="M2,20L12,4L22,20z" fill="#4a3c30"/>` +
    `<g fill="#c8ccc4" opacity=".8"><circle cx="12" cy="3" r="2.4"/><circle cx="14" cy="0" r="2"/></g>` +
    `<circle cx="12" cy="6" r="1.6" fill="#e8443f"/>`,

  /** マトリョーシカ。職人の町(トゥーラ・チュメニ・トムスク)。 */
  craft:
    `<path d="M12,3c-4,0 -6,4 -6,9c0,6 3,10 6,10c3,0 6,-4 6,-10c0,-5 -2,-9 -6,-9z" fill="#e8443f"/>` +
    `<circle cx="12" cy="9" r="3.4" fill="#f6efe2"/>` +
    `<path d="M8,14c1,-1 7,-1 8,0" stroke="#f4c430" stroke-width="1.4" fill="none"/>`,
};
