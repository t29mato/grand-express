/**
 * イタリアの都市イラスト。
 *
 * `ITALY_MARKS` は24×24の座標系に描くシンボル、`ITALY_BG` は400×210の
 * 座標系に描く背景シーン(いずれもSVG断片の文字列)。フランス・韓国と同じく
 * 最初から文字列として持つ。動きは含めない(アニメーションはReact側で重ねる)。
 *
 * 色は他の盤面と揃える。空 #8fc4e8〜#20364a、地面の緑 #2f4a33、
 * 顔・白 #f6efe2、強調 #f5b31c(金)/#e8443f(赤)/#5b8fe8(青)。
 * イタリアらしさは **テラコッタの屋根 #b5502f・大理石の白 #f2f0e8・
 * 糸杉の濃緑 #2f4a30・地中海の青 #1c5f82〜#2a7196・火山の焦げ茶 #4a3c30**
 * で出す(いずれも geography.mjs の海の色と揃えてある)。
 *
 * 鍵は `cities.mjs` の `mark` / `bg` と一対一で対応する(同じキー名)。
 * 増やすときは両方を揃えること。
 *
 * **背景SVGの中央25%(x=151〜249 / y=54〜152)は都市シンボルに隠れて
 * 見えない。** 見せたい細部は左右3分の1と手前(y>170)に置く。
 * `sky()` は必ず第3引数(次に来る塗りの開始y)を渡すこと。渡し忘れると
 * 空と地面のあいだに塗り残しの帯ができる(ibaraki・韓国で実際に起きた)。
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

/** 丸い樹冠の広葉樹(オリーブ・ハシバミなど)。 */
function roundTree(x, base, r, crown = "#7fae5a", trunk = "#6b5330") {
  const th = r1(r * 1.1);
  return (
    `<rect x="${r1(x - r * 0.16)}" y="${r1(base - th - r * 0.3)}" width="${r1(r * 0.32)}" height="${r1(th + r * 0.3)}" fill="${trunk}"/>` +
    `<circle cx="${x}" cy="${r1(base - th - r * 0.5)}" r="${r}" fill="${crown}"/>`
  );
}

/** 糸杉(トスカーナの並木)。細く尖った濃緑。 */
function cypress(x, base, h, fill = "#2f4a30") {
  return (
    `<rect x="${r1(x - 1.6)}" y="${r1(base - 6)}" width="3.2" height="6" fill="#5a4630"/>` +
    `<path d="M${x},${r1(base - h)}c-${r1(h * 0.16)},0 -${r1(h * 0.2)},${r1(h * 0.3)} -${r1(h * 0.2)},${r1(h * 0.46)}c0,${r1(h * 0.18)} ${r1(h * 0.09)},${r1(h * 0.3)} ${r1(h * 0.2)},${r1(h * 0.3)}c${r1(h * 0.11)},0 ${r1(h * 0.2)},-${r1(h * 0.12)} ${r1(h * 0.2)},-${r1(h * 0.3)}c0,-${r1(h * 0.16)} -${r1(h * 0.04)},-${r1(h * 0.46)} -${r1(h * 0.2)},-${r1(h * 0.46)}z" fill="${fill}"/>`
  );
}

/** レモン(または柑橘)の木。丸い樹冠に黄色い実の点。 */
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

/** 列柱(ギリシャ・ローマ様式)。等間隔に並べる。 */
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

/** アーチの列(円形闘技場・アーケード・水道橋)。 */
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

/** 屋根つきの家並み(テラコッタ屋根)。並べて何棟も描く。 */
function houseRow(positions, roof = "#b5502f", wall = "#e8dcc0") {
  return positions
    .map(([x, base, w, h]) => {
      const hw = r1(w / 2);
      return (
        `<rect x="${r1(x - hw)}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${wall}"/>` +
        `<path d="M${r1(x - hw - 4)},${r1(base - h)}h${r1(w + 8)}l-${r1(hw + 4)},-${r1(h * 0.45)}z" fill="${roof}"/>`
      );
    })
    .join("");
}

/** 段々畑・ぶどう畑の横畝(丸い茂みの列)。 */
function shrubRow(x, y, count, gap, r, color) {
  const parts = [];
  for (let i = 0; i < count; i++) {
    parts.push(`<circle cx="${r1(x + i * gap)}" cy="${y}" r="${r}" fill="${color}"/>`);
  }
  return `<g opacity=".9">${parts.join("")}</g>`;
}

/** ぶどう畑の畝線(等間隔の横縞)。 */
function vineRows(x, y, w, rows, color = "#5f7f3a") {
  const parts = [];
  for (let i = 0; i < rows; i++) {
    parts.push(`<path d="M${x},${r1(y + i * 6)}h${w}"/>`);
  }
  return `<g stroke="${color}" stroke-width="2.4" opacity=".8">${parts.join("")}</g>`;
}

/** 花崗岩ふうの山(雪冠つき)。アルプス・アペニン。 */
function alpinePeak(cx, base, h, fill = "#8b8f98") {
  const w = r1(h * 1.3);
  return (
    `<path d="M${r1(cx - w / 2)},${base}L${r1(cx - w * 0.12)},${r1(base - h)}L${r1(cx + w * 0.1)},${r1(base - h * 0.62)}L${r1(cx + w / 2)},${base}z" fill="${fill}"/>` +
    `<path d="M${r1(cx - w * 0.12)},${r1(base - h)}L${r1(cx - w * 0.02)},${r1(base - h * 0.8)}L${r1(cx + w * 0.04)},${r1(base - h * 0.86)}z" fill="#f2f6f8"/>`
  );
}

/** 中世の石塔(サンジミニャーノ・城壁都市)。てっぺんに凹凸(狭間)。 */
function stoneTower(x, base, w, h, fill = "#c9b896") {
  const hw = r1(w / 2);
  const parts = [`<rect x="${r1(x - hw)}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${fill}"/>`];
  for (let i = -1; i <= 1; i++) {
    parts.push(`<rect x="${r1(x + i * hw * 0.7 - 1.6)}" y="${r1(base - h - 4)}" width="3.2" height="4" fill="${fill}"/>`);
  }
  return parts.join("");
}

/** 円錐屋根の家(トゥルッリ・ヌラーゲ)。 */
function coneRoofHouse(x, base, w, h, roof = "#8a8f95", wall = "#f5f0e0") {
  const hw = r1(w / 2);
  return (
    `<rect x="${r1(x - hw)}" y="${r1(base - h * 0.55)}" width="${w}" height="${r1(h * 0.55)}" fill="${wall}"/>` +
    `<path d="M${r1(x - hw * 1.05)},${r1(base - h * 0.55)}L${x},${r1(base - h)}L${r1(x + hw * 1.05)},${r1(base - h * 0.55)}z" fill="${roof}"/>` +
    `<circle cx="${x}" cy="${r1(base - h * 0.94)}" r="2.2" fill="#f5f0e0"/>`
  );
}

/** 崖に張り付く色とりどりの家並み(ポジターノ・チンクエテッレ・トロペア・チェファル)。 */
function cliffHouseRow(baseX, baseY, count, colors) {
  const parts = [];
  for (let i = 0; i < count; i++) {
    const x = baseX + i * 17;
    const y = baseY - (i % 3) * 9 - Math.floor(i / 3) * 2;
    const c = colors[i % colors.length];
    parts.push(
      `<rect x="${r1(x)}" y="${r1(y - 16)}" width="15" height="16" fill="${c}"/>`,
      `<rect x="${r1(x - 1)}" y="${r1(y - 19)}" width="17" height="4" fill="#b5502f"/>`,
      `<rect x="${r1(x + 5)}" y="${r1(y - 11)}" width="4" height="4" fill="#5b8fe8" opacity=".8"/>`,
    );
  }
  return parts.join("");
}

/** 火山(噴煙つき)。エトナ・ヴェスヴィオ。 */
function volcanoShape(cx, base, h, fill = "#6f5a48") {
  const w = r1(h * 1.5);
  return (
    `<path d="M${r1(cx - w / 2)},${base}L${r1(cx - w * 0.06)},${r1(base - h)}L${r1(cx + w * 0.06)},${r1(base - h)}L${r1(cx + w / 2)},${base}z" fill="${fill}"/>` +
    `<circle cx="${cx}" cy="${r1(base - h - 4)}" r="6" fill="#e8443f" opacity=".85"/>`
  );
}

/** 噴煙(揺れなしの静止形)。 */
function smokePuffs(cx, topY, count = 3) {
  const parts = [];
  for (let i = 0; i < count; i++) {
    parts.push(`<circle cx="${r1(cx + i * 7 - 6)}" cy="${r1(topY - i * 12)}" r="${r1(6 + i * 2)}" fill="#c8ccc4" opacity="${r1(0.6 - i * 0.12)}"/>`);
  }
  return parts.join("");
}

/** ゴンドラ(ヴェネツィア)。 */
function gondola(x, y, scale = 1) {
  return (
    `<path d="M${r1(x - 18 * scale)},${y}c2,-6 6,-8 10,-8h${r1(24 * scale)}c4,0 8,2 10,8z" fill="#241a10"/>` +
    `<path d="M${r1(x - 18 * scale)},${y}q-${r1(6 * scale)},0 -${r1(6 * scale)},${r1(4 * scale)}" fill="none" stroke="#241a10" stroke-width="2"/>` +
    `<path d="M${x},${r1(y - 8)}q${r1(6 * scale)},-${r1(20 * scale)} 0,-${r1(30 * scale)}" fill="none" stroke="#4a4436" stroke-width="1.6"/>`
  );
}

// ---------------------------------------------------------------------------
// 背景シーン(27種)。鍵は cities.mjs の `bg` と対応。
// ---------------------------------------------------------------------------

const ITALY_BASE_BG = {
  /** ローマ専用。コロッセオの弧、松、遺構の石。 */
  capital:
    sky("#8fc4e8", "#cfe4f0", 128) +
    clouds(300, 30, 1.1) +
    hills(126, "#9ab35a") +
    ground(128, "#8ba85a") +
    archRow(24, 60, 8, 24, 36, "#c9a877") +
    `<rect x="24" y="112" width="192" height="16" fill="#c9a877"/>` +
    // 上段のアーチ(小さく)
    archRow(30, 46, 7, 24, 16, "#d8cca8", 0.85) +
    // 傘松(ローマの並木)
    `<rect x="330" y="130" width="4" height="20" fill="#6b5330"/><ellipse cx="332" cy="122" rx="20" ry="9" fill="#3f7a45"/>` +
    `<rect x="360" y="140" width="3" height="16" fill="#6b5330"/><ellipse cx="361" cy="134" rx="15" ry="7" fill="#3f7a45"/>` +
    `<rect x="240" y="146" width="3" height="14" fill="#6b5330"/><ellipse cx="241" cy="140" rx="13" ry="6" fill="#3f7a45"/>` +
    // 石畳(手前)
    `<g fill="#b8ac8e" opacity=".8">${Array.from({ length: 10 }).map((_, i) => `<rect x="${20 + i * 20}" y="180" width="16" height="10"/>`).join("")}</g>` +
    // 落ちた円柱の破片
    `<rect x="250" y="172" width="40" height="12" rx="4" fill="#c9a877"/><rect x="292" y="176" width="26" height="10" rx="4" fill="#b8ac8e"/>` +
    // 噴水(トレヴィの泉ふう、小さく)
    `<path d="M340,176a10,10 0 0 1 20,0z" fill="#f2f0e8"/><circle cx="350" cy="176" r="6" fill="#bfe8f4"/>` +
    gull(200, 40, 0.8) + gull(230, 32, 0.7),

  /** ヴェネツィア専用。運河とゴンドラ、橋。 */
  canal:
    sky("#8fc4e8", "#cfe4f0", 110) +
    clouds(90, 26, 1) +
    `<g fill="#e8dcc0">${houseRow([
      [40, 110, 44, 60], [86, 110, 30, 46], [118, 110, 34, 54],
      [280, 110, 36, 50], [318, 110, 30, 44], [356, 110, 40, 58],
    ], "#b5502f")}</g>` +
    `<g fill="#f4c430" opacity=".7">${Array.from({ length: 8 }).map((_, i) => `<rect x="${44 + i * 34}" y="118" width="5" height="7"/>`).join("")}</g>` +
    `<rect x="0" y="110" width="400" height="10" fill="#9a8f70"/>` +
    band(120, 90, "#2a7196") +
    ripples(136, "#bfe8f4") + ripples(154, "#bfe8f4") + ripples(172, "#9fd0e4") +
    // 橋
    `<path d="M170,118c10,-14 50,-14 60,0" fill="none" stroke="#c9a877" stroke-width="7"/>` +
    `<g fill="#9a8f70">${Array.from({ length: 3 }).map((_, i) => `<rect x="${172 + i * 20}" y="115" width="4" height="6"/>`).join("")}</g>` +
    gondola(200, 172, 1.1) +
    gondola(70, 190, 0.8) +
    gondola(330, 200, 0.9) +
    // 洗濯物のロープ(路地の細部)
    `<g stroke="#4a4a52" stroke-width="1"><path d="M96,116h20"/></g><g fill="#f6efe2"><rect x="98" y="116" width="4" height="6"/><rect x="106" y="116" width="4" height="6"/></g>` +
    gull(30, 40, 0.9) + gull(360, 46, 0.8),

  /** ミラノ専用。ゴシックの尖塔とガレリアのアーケード。 */
  duomo:
    sky("#8fc4e8", "#cfe4f0", 150) +
    clouds(60, 24, 0.9) + clouds(200, 18, 0.6) +
    ground(150, "#9a9484") +
    `<g fill="#f2f0e8" stroke="#c8c0ac" stroke-width="1">${Array.from({ length: 7 }).map((_, i) => {
      const x = 40 + i * 44; const h = 60 + (i % 3) * 18;
      return `<rect x="${x}" y="${150 - h}" width="14" height="${h}"/><path d="M${x},${150 - h}L${x + 7},${150 - h - 16}L${x + 14},${150 - h}z"/>`;
    }).join("")}</g>` +
    // 尖塔の頂の金の像(小さく)
    `<g fill="#f4c430">${Array.from({ length: 7 }).map((_, i) => `<circle cx="${47 + i * 44}" cy="${150 - (60 + (i % 3) * 18) - 17}" r="1.6"/>`).join("")}</g>` +
    // 遠景の近代ビル(右)
    `<g fill="#8f96a0" opacity=".85"><rect x="330" y="70" width="24" height="80"/><rect x="360" y="90" width="20" height="60"/></g>` +
    `<g fill="#bfe0f0" opacity=".6">${Array.from({ length: 4 }).map((_, i) => `<rect x="336" y="${80 + i * 16}" width="4" height="4"/>`).join("")}</g>` +
    archRow(60, 176, 6, 28, 22, "#c9a877") +
    // ガレリアの床のモザイク(手前)
    `<g fill="#c9a877" opacity=".8">${Array.from({ length: 8 }).map((_, i) => `<rect x="${30 + i * 46}" y="188" width="30" height="14"/>`).join("")}</g>` +
    // 広場の鳩
    `<g fill="#9a9484">${Array.from({ length: 4 }).map((_, i) => `<ellipse cx="${140 + i * 20}" cy="196" rx="4" ry="2.6"/>`).join("")}</g>` +
    ground(190, "#b8ac8e"),

  /** フィレンツェ専用。赤いルネサンスドームとアルノ川。 */
  renaissance:
    sky("#8fc4e8", "#cfe4f0", 130) +
    clouds(320, 28, 1) +
    hills(128, "#9ab35a") +
    ground(130, "#c9b07a") +
    // 大聖堂の赤いドーム
    `<path d="M120,130a40,40 0 0 1 80,0z" fill="#b5502f"/>` +
    `<g stroke="#8a3a1f" stroke-width="1.6">${Array.from({ length: 7 }).map((_, i) => `<path d="M${130 + i * 10},130Q${130 + i * 10},96 160,92"/>`).join("")}</g>` +
    `<rect x="152" y="88" width="16" height="14" fill="#e8e0cc"/>` +
    houseRow([[40, 150, 30, 40], [80, 150, 26, 34], [300, 150, 28, 38], [340, 150, 32, 42]], "#c9714a") +
    `<g fill="#f4c430" opacity=".7">${Array.from({ length: 4 }).map((_, i) => `<rect x="${46 + i * 60}" y="140" width="5" height="6"/>`).join("")}</g>` +
    band(168, 30, "#3f7fae") +
    ripples(178, "#bfe8f4") + ripples(192, "#9fd0e4") +
    // ポンテ・ヴェッキオ(小さく、金細工店の並び)
    `<rect x="150" y="168" width="60" height="10" fill="#c9a877"/><g fill="#e8dcc0"><rect x="156" y="160" width="10" height="10"/><rect x="170" y="160" width="10" height="10"/><rect x="184" y="160" width="10" height="10"/></g>` +
    `<g fill="#f4c430" opacity=".8">${Array.from({ length: 3 }).map((_, i) => `<circle cx="${161 + i * 14}" cy="165" r="1.6"/>`).join("")}</g>` +
    gull(320, 40, 0.8) + gull(60, 44, 0.7) +
    cypress(20, 200, 20) + cypress(380, 202, 18),

  /** ピサ専用。傾いた塔と大聖堂、洗礼堂。 */
  leaningtower:
    sky("#8fc4e8", "#cfe4f0", 150) +
    clouds(80, 26, 1) + clouds(340, 20, 0.7) +
    ground(150, "#9ab35a") +
    // 傾いた鐘楼(円筒を積んだ形)
    `<g transform="rotate(-6 200 190)"><rect x="188" y="90" width="24" height="100" rx="10" fill="#f2f0e8" stroke="#d8d0bc" stroke-width="1.4"/>${Array.from({ length: 6 }).map((_, i) => `<rect x="186" y="${94 + i * 15}" width="28" height="3" fill="#d8d0bc"/>`).join("")}<ellipse cx="200" cy="88" rx="14" ry="7" fill="#f2f0e8"/>${Array.from({ length: 5 }).map((_, i) => `<rect x="196" y="${98 + i * 15}" width="8" height="6" fill="#bfb59c"/>`).join("")}</g>` +
    // 大聖堂(左)
    `<ellipse cx="110" cy="176" rx="46" ry="18" fill="#f2f0e8"/><rect x="70" y="150" width="80" height="30" fill="#f2f0e8"/><path d="M70,150a40,26 0 0 1 80,0z" fill="#e8e0cc"/>` +
    `<g fill="#bfb59c">${Array.from({ length: 5 }).map((_, i) => `<rect x="${78 + i * 15}" y="160" width="6" height="10"/>`).join("")}</g>` +
    // 洗礼堂(右)
    `<circle cx="300" cy="172" r="24" fill="#f2f0e8"/><path d="M276,172a24,14 0 0 1 48,0z" fill="#e8e0cc"/>` +
    `<rect x="297" y="146" width="6" height="8" fill="#e8e0cc"/>` +
    // 芝生の草むら(手前)
    `<g fill="#7fae5a">${Array.from({ length: 8 }).map((_, i) => `<path d="M${20 + i * 46},198q3,-8 6,0z"/>`).join("")}</g>` +
    // ピクニックの観光客(小さく)
    `<g><circle cx="230" cy="190" r="3.4" fill="#d9a273"/><rect x="227" y="193" width="6" height="9" fill="#5b8fe8"/></g>` +
    gull(60, 40, 0.9) + gull(340, 54, 0.8) +
    ground(196, "#8ba85a"),

  /** サンジミニャーノ専用。中世の石塔が林立する稜線。 */
  towers:
    sky("#8fc4e8", "#cfe4f0", 140) +
    clouds(330, 26, 1) +
    hills(138, "#9ab35a", 5) +
    ground(140, "#c2b559") +
    stoneTower(60, 172, 20, 60, "#c9b896") +
    stoneTower(92, 176, 16, 46, "#bfae8a") +
    stoneTower(128, 172, 18, 56, "#c9b896") +
    stoneTower(230, 178, 16, 42, "#bfae8a") +
    stoneTower(266, 174, 20, 54, "#c9b896") +
    stoneTower(300, 178, 15, 38, "#bfae8a") +
    stoneTower(334, 174, 18, 50, "#c9b896") +
    ground(196, "#a8bd6a"),

  /** シエナ・アッシジ・ペルージャ・オルヴィエート。丘上の城壁都市。 */
  hilltown:
    sky("#8fc4e8", "#cfe4f0", 168) +
    clouds(70, 26, 1) + clouds(320, 20, 0.7) +
    hills(130, "#9ab35a", 5) +
    // 丘そのもの
    `<path d="M0,168c60,-40 120,-52 200,-52c80,0 140,12 200,52v42H0z" fill="#c2b559"/>` +
    // 城壁
    `<rect x="30" y="166" width="340" height="8" fill="#9a8f70"/>` +
    `<g fill="#8a8478">${Array.from({ length: 9 }).map((_, i) => `<rect x="${34 + i * 40}" y="162" width="8" height="6"/>`).join("")}</g>` +
    houseRow([
      [70, 158, 24, 26], [100, 154, 20, 22], [128, 158, 22, 24],
      [220, 156, 22, 24], [250, 152, 24, 26], [280, 158, 20, 22],
    ], "#b5502f") +
    `<g fill="#f4c430" opacity=".7">${Array.from({ length: 6 }).map((_, i) => `<rect x="${74 + i * 30}" y="150" width="5" height="6"/>`).join("")}</g>` +
    // 大聖堂(中心)
    `<rect x="176" y="142" width="30" height="26" fill="#e8e0cc"/><path d="M176,142L191,124L206,142z" fill="#c9a877"/>` +
    `<rect x="188" y="128" width="6" height="8" fill="#5a4a30"/>` +
    ground(178, "#a8bd6a") +
    cypress(40, 200, 26) + cypress(360, 202, 24) + cypress(20, 205, 20) + cypress(380, 206, 18) +
    // 丘の段々畑(手前)
    vineRows(200, 196, 100, 3, "#7a8f4a"),

  /** ヴェローナ専用。ローマ円形闘技場(オペラの観客席)。 */
  arena:
    sky("#8fc4e8", "#cfe4f0", 140) +
    clouds(320, 28, 1) + clouds(70, 20, 0.7) +
    ground(140, "#9a9484") +
    archRow(50, 92, 9, 34, 48, "#e8dcc0") +
    `<rect x="40" y="140" width="320" height="10" fill="#c9b896"/>` +
    // アーチの上段(小さく)
    archRow(60, 76, 7, 30, 18, "#d8cca8", 0.9) +
    // 観客席の段(手前、オペラ客の点)
    `<g fill="#f6efe2" opacity=".85">${Array.from({ length: 16 }).map((_, i) => `<circle cx="${40 + i * 22}" cy="${150 + (i % 3) * 6}" r="2.4"/>`).join("")}</g>` +
    // 舞台の照明(左右)
    `<rect x="30" y="130" width="4" height="20" fill="#4a4a52"/><circle cx="32" cy="128" r="3" fill="#f5b31c" opacity=".8"/>` +
    `<rect x="366" y="130" width="4" height="20" fill="#4a4a52"/><circle cx="368" cy="128" r="3" fill="#f5b31c" opacity=".8"/>` +
    // 石畳(手前)
    `<g fill="#b8ac8e" opacity=".7">${Array.from({ length: 9 }).map((_, i) => `<rect x="${20 + i * 42}" y="180" width="32" height="14"/>`).join("")}</g>` +
    ground(190, "#b8ac8e"),

  /** ボローニャ・パドヴァ。アーケードの柱廊と大学の塔。 */
  portico:
    sky("#8fc4e8", "#cfe4f0", 140) +
    clouds(60, 24, 0.9) + clouds(320, 20, 0.7) +
    ground(140, "#c9714a") +
    archRow(20, 154, 11, 34, 34, "#e8dcc0") +
    `<rect x="20" y="154" width="374" height="8" fill="#e8dcc0"/>` +
    // 柱廊の柱(各アーチの下)
    `<g fill="#d8cca8">${Array.from({ length: 11 }).map((_, i) => `<rect x="${18 + i * 34}" y="176" width="6" height="14"/>`).join("")}</g>` +
    // 塔(2本、大学の塔)
    `<rect x="150" y="70" width="16" height="84" fill="#b5502f"/><rect x="146" y="66" width="24" height="6" fill="#8a3a1f"/>` +
    `<g fill="#e8a020" opacity=".8">${Array.from({ length: 4 }).map((_, i) => `<rect x="154" y="${78 + i * 18}" width="8" height="6"/>`).join("")}</g>` +
    `<rect x="230" y="90" width="14" height="64" fill="#c9714a"/><rect x="226" y="86" width="22" height="6" fill="#8a3a1f"/>` +
    `<g fill="#e8a020" opacity=".8">${Array.from({ length: 3 }).map((_, i) => `<rect x="234" y="${98 + i * 18}" width="6" height="5"/>`).join("")}</g>` +
    // 屋根瓦の家並み(遠景)
    houseRow([[40, 90, 22, 20], [70, 96, 18, 16], [310, 92, 20, 18], [340, 98, 18, 14]], "#8a3a1f") +
    gull(20, 40, 0.8) + gull(370, 44, 0.7) +
    ground(190, "#c9a877"),

  /** ラヴェンナ専用。ビザンチンのドームとモザイクの色。 */
  mosaic:
    sky("#8fc4e8", "#cfe4f0", 140) +
    clouds(300, 26, 1) + clouds(90, 20, 0.7) +
    ground(140, "#8ba85a") +
    // 八角形のドーム建物
    `<rect x="150" y="110" width="60" height="34" fill="#c9a877"/>` +
    `<path d="M150,110a30,26 0 0 1 60,0z" fill="#d8cca8"/>` +
    `<circle cx="180" cy="96" r="5" fill="#f4c430"/>` +
    `<g fill="#9a8f70">${Array.from({ length: 4 }).map((_, i) => `<rect x="${158 + i * 12}" y="118" width="7" height="10"/>`).join("")}</g>` +
    // 側廊(左右の小さな建物)
    `<rect x="110" y="128" width="34" height="16" fill="#c9a877"/><path d="M108,128h38l-5,-8h-28z" fill="#8a3a1f"/>` +
    `<rect x="216" y="130" width="30" height="14" fill="#c9a877"/><path d="M214,130h34l-5,-8h-24z" fill="#8a3a1f"/>` +
    // モザイクの色帯(手前、2列に拡張)
    `<g>${["#e8443f", "#f4c430", "#1a4a8f", "#3f8f4f", "#e8dcc0", "#e8443f", "#f4c430"].map((c, i) => `<rect x="${30 + i * 8}" y="176" width="7" height="7" fill="${c}"/>`).join("")}</g>` +
    `<g>${["#f4c430", "#1a4a8f", "#e8443f", "#e8dcc0", "#3f8f4f", "#1a4a8f", "#e8dcc0"].map((c, i) => `<rect x="${290 + i * 8}" y="184" width="7" height="7" fill="${c}"/>`).join("")}</g>` +
    `<g>${["#3f8f4f", "#e8dcc0", "#e8443f", "#f4c430"].map((c, i) => `<rect x="${160 + i * 8}" y="192" width="7" height="7" fill="${c}"/>`).join("")}</g>` +
    // 松林(ラヴェンナ周辺は松林で知られる)
    roundTree(30, 200, 16, "#2f6b3a") + roundTree(370, 198, 14, "#2f6b3a") + roundTree(50, 202, 12, "#2f6b3a") +
    gull(340, 40, 0.8) +
    ground(190, "#7fa85a"),

  /** パルマ専用。チーズの塊と熟成庫。 */
  dairy:
    sky("#8fc4e8", "#cfe4f0", 140) +
    clouds(300, 24, 0.9) + clouds(90, 20, 0.7) +
    hills(138, "#9ab35a") +
    ground(140, "#a8bd6a") +
    // 熟成庫(左)
    `<rect x="30" y="110" width="120" height="80" fill="#c9a877"/>` +
    `<path d="M26,110h128l-8,-12h-112z" fill="#8a3a1f"/>` +
    // 棚の段(横線)
    `<g stroke="#9a8f70" stroke-width="1.4">${Array.from({ length: 3 }).map((_, r) => `<path d="M36,${132 + r * 20}h108"/>`).join("")}</g>` +
    `<g fill="#f4d060">${Array.from({ length: 3 }).map((_, r) =>
      Array.from({ length: 4 }).map((_, c) => `<ellipse cx="${50 + c * 25}" cy="${140 + r * 16}" rx="10" ry="6" stroke="#c9a020" stroke-width="1"/>`).join("")
    ).join("")}</g>` +
    // 検品用の小さな槌を持つ職人
    `<g><circle cx="180" cy="150" r="6" fill="#d9a273"/><rect x="175" y="156" width="10" height="16" fill="#f6efe2"/><line x1="186" y1="158" x2="196" y2="150" stroke="#6b5330" stroke-width="2"/></g>` +
    // 生ハムの吊り下げ(右)
    `<g stroke="#8a5a3a" stroke-width="1.4">${Array.from({ length: 4 }).map((_, i) => `<line x1="${280 + i * 22}" y1="100" x2="${280 + i * 22}" y2="118"/>`).join("")}</g>` +
    `<g fill="#c9714a">${Array.from({ length: 4 }).map((_, i) => `<ellipse cx="${280 + i * 22}" cy="132" rx="9" ry="16"/>`).join("")}</g>` +
    `<rect x="260" y="90" width="130" height="10" fill="#6b5330"/>` +
    ground(188, "#8ba85a"),

  /** アオスタ・ボルツァーノ・ラクイラ。アルプス・アペニンの山あいの町。 */
  mountain:
    sky("#8fc4e8", "#cfe4f0", 150) +
    clouds(340, 30, 1) + clouds(60, 20, 0.7) +
    alpinePeak(90, 130, 90, "#8b8f98") +
    alpinePeak(180, 138, 70, "#9a9ea4") +
    alpinePeak(320, 128, 84, "#8b8f98") +
    alpinePeak(30, 140, 50, "#9a9ea4") +
    hills(150, "#5f7f4a") +
    ground(150, "#6f8a52") +
    // 石造りの小さな塔(ローマ門・城)
    `<rect x="150" y="150" width="16" height="34" fill="#9a9488"/><rect x="146" y="146" width="24" height="6" fill="#8a8478"/>` +
    `<g fill="#5a5f52">${Array.from({ length: 3 }).map((_, i) => `<rect x="153" y="${156 + i * 8}" width="4" height="4"/>`).join("")}</g>` +
    `<rect x="176" y="158" width="40" height="26" fill="#c9b896"/>` +
    `<g fill="#8a3a1f"><path d="M172,158h48l-6,-10h-36z"/></g>` +
    `<g fill="#5b8fe8" opacity=".8">${Array.from({ length: 3 }).map((_, i) => `<rect x="${184 + i * 12}" y="166" width="7" height="8"/>`).join("")}</g>` +
    // シャレー風の家(手前)
    `<rect x="240" y="172" width="34" height="22" fill="#c9714a"/><path d="M236,172h42l-6,-12h-30z" fill="#6b5330"/>` +
    // 松の木の並び
    cypress(60, 200, 22) + cypress(340, 202, 20) + cypress(300, 204, 16) + cypress(20, 204, 15) +
    gull(200, 40, 0.8),

  /** コモ専用。湖と渡し船、シルクの並木。 */
  lakeside:
    sky("#8fc4e8", "#cfe4f0", 98) +
    clouds(70, 24, 1) + clouds(200, 32, 0.8) +
    alpinePeak(340, 96, 46, "#9a9ea4") + alpinePeak(300, 100, 34, "#a8aeb4") +
    hills(96, "#9ab35a") +
    ground(98, "#8ba85a") +
    band(138, 72, "#3f8fc4") +
    ripples(152, "#bfe8f4") + ripples(168, "#bfe8f4") + ripples(184, "#9fd0e4") +
    // ヴィラ(湖畔の別荘)群
    `<rect x="54" y="112" width="50" height="26" fill="#e8dcc0"/><path d="M48,112h62l-8,-14h-46z" fill="#c9714a"/>` +
    `<g fill="#5b8fe8" opacity=".8"><rect x="60" y="120" width="6" height="8"/><rect x="72" y="120" width="6" height="8"/><rect x="84" y="120" width="6" height="8"/></g>` +
    `<rect x="120" y="122" width="30" height="18" fill="#e8dcc0"/><path d="M116,122h38l-5,-10h-28z" fill="#c9714a"/>` +
    // シルクの並木(手前)
    roundTree(30, 200, 14, "#3f8f4f") + roundTree(56, 202, 11, "#4f8f4f") + roundTree(378, 200, 13, "#3f8f4f") +
    // 渡し船
    `<path d="M270,168c10,-4 60,-4 70,0l-6,10h-58z" fill="#f6efe2" stroke="#20364a" stroke-width="1.6"/>` +
    `<rect x="290" y="150" width="30" height="16" fill="#f6efe2" stroke="#20364a" stroke-width="1.4"/>` +
    `<g fill="#5b8fe8" opacity=".8">${Array.from({ length: 3 }).map((_, i) => `<rect x="${296 + i * 9}" y="154" width="5" height="6"/>`).join("")}</g>` +
    gull(160, 60, 1) + gull(190, 50, 0.8) +
    roundTree(370, 198, 12, "#3f8f4f"),

  /** アルバ専用。丘のぶどう畑とトリュフを探す犬。 */
  vineyard:
    sky("#8fc4e8", "#cfe4f0", 130) +
    clouds(320, 26, 1) + clouds(80, 20, 0.7) +
    hills(128, "#9ab35a", 5) +
    ground(130, "#c2b559") +
    vineRows(20, 144, 120, 7, "#7a8f4a") +
    vineRows(240, 152, 140, 7, "#8f9f5a") +
    // ぶどうの房(点)
    `<g fill="#5f3f6f">${Array.from({ length: 6 }).map((_, i) => `<circle cx="${30 + i * 18}" cy="150" r="2.2"/>`).join("")}</g>` +
    `<g fill="#5f3f6f">${Array.from({ length: 6 }).map((_, i) => `<circle cx="${250 + i * 20}" cy="158" r="2.2"/>`).join("")}</g>` +
    // 犬(トリュフ探し)と探す人
    `<g fill="#c9a877" stroke="#8a5a3a" stroke-width="1"><ellipse cx="180" cy="188" rx="12" ry="7"/><circle cx="192" cy="184" r="5"/><rect x="172" y="192" width="3" height="8"/><rect x="184" y="192" width="3" height="8"/></g>` +
    `<g><circle cx="150" cy="176" r="6" fill="#d9a273"/><rect x="145" y="182" width="10" height="16" fill="#6b5330"/></g>` +
    roundTree(60, 202, 14, "#7fae5a") + roundTree(340, 200, 16, "#7fae5a") + roundTree(380, 204, 12, "#7fae5a") +
    ground(192, "#a8bd6a"),

  /** トリノ専用。フィアットの工場と組立ライン。 */
  factory:
    sky("#9fb0b8", "#dfe4e0", 140) +
    alpinePeak(340, 100, 44, "#a8aeb4") + alpinePeak(370, 106, 30, "#b8bec4") +
    ground(140, "#8a8478") +
    `<rect x="30" y="80" width="200" height="60" fill="#8f96a0"/>` +
    `<rect x="30" y="60" width="200" height="24" rx="4" fill="#7f8896"/>` +
    `<g fill="#c8ccc4" opacity=".7">${Array.from({ length: 3 }).map((_, i) => `<ellipse cx="${60 + i * 40}" cy="50" rx="16" ry="8"/>`).join("")}</g>` +
    `<g fill="#bfe0f0" opacity=".6">${Array.from({ length: 6 }).map((_, i) => `<rect x="${40 + i * 30}" y="94" width="16" height="12"/>`).join("")}</g>` +
    `<g fill="#bfe0f0" opacity=".5">${Array.from({ length: 6 }).map((_, i) => `<rect x="${40 + i * 30}" y="112" width="16" height="10"/>`).join("")}</g>` +
    // 屋上の試験走路(楕円)、その上を走る試作車
    `<ellipse cx="130" cy="80" rx="90" ry="8" fill="none" stroke="#e8443f" stroke-width="2"/>` +
    `<rect x="105" y="72" width="14" height="7" rx="2" fill="#5b8fe8"/><rect x="200" y="83" width="14" height="7" rx="2" fill="#f5b31c"/>` +
    crane(300, 140, 60) +
    // 組立ラインの車体(手前、シャシー)
    `<g fill="#4a4a52">${Array.from({ length: 4 }).map((_, i) => `<circle cx="${250 + i * 24}" cy="176" r="8"/>`).join("")}</g>` +
    `<g fill="#7f8896">${Array.from({ length: 4 }).map((_, i) => `<rect x="${242 + i * 24}" y="160" width="16" height="10" rx="2"/>`).join("")}</g>` +
    // コンベアの支柱
    `<g fill="#5a5f52">${Array.from({ length: 5 }).map((_, i) => `<rect x="${238 + i * 24}" y="150" width="3" height="30"/>`).join("")}</g>` +
    ground(190, "#9a9484"),

  /** ジェノヴァ・トリエステ・バーリ・レッジョカラブリア・パレルモ・カリアリ・アルゲーロ・オルビア。港町。 */
  port:
    sky("#8fc4e8", "#cfe4f0", 118) +
    clouds(310, 28, 1) + clouds(100, 20, 0.7) +
    ground(118, "#9a9484") +
    gull(60, 50, 1) + gull(90, 62, 0.8) + gull(320, 44, 1) + gull(250, 36, 0.7) +
    band(150, 60, "#2a7196") +
    ripples(164, "#bfe8f4") + ripples(182, "#9fd0e4") +
    crane(50, 150, 60) + crane(90, 150, 44) +
    `<rect x="0" y="140" width="400" height="12" fill="#9a9484"/>` +
    // 係留ロープと杭
    `<g fill="#5a4630">${Array.from({ length: 5 }).map((_, i) => `<rect x="${20 + i * 12}" y="140" width="3" height="10"/>`).join("")}</g>` +
    `<rect x="290" y="152" width="90" height="20" rx="3" fill="#e8443f"/>` +
    `<rect x="300" y="140" width="70" height="14" fill="#f6efe2"/>` +
    `<g fill="#5b8fe8">${Array.from({ length: 3 }).map((_, i) => `<rect x="${306 + i * 16}" y="143" width="10" height="8"/>`).join("")}</g>` +
    // コンテナの山
    `<g fill="#f5b31c">${Array.from({ length: 3 }).map((_, i) => `<rect x="${180 + i * 18}" y="164" width="16" height="14"/>`).join("")}</g>` +
    `<g fill="#3f8f4f">${Array.from({ length: 2 }).map((_, i) => `<rect x="${186 + i * 18}" y="150" width="16" height="14"/>`).join("")}</g>` +
    houseRow([[110, 140, 26, 24], [140, 140, 22, 20], [162, 140, 24, 22]], "#c9714a") +
    `<g fill="#5b8fe8" opacity=".8">${Array.from({ length: 3 }).map((_, i) => `<rect x="${118 + i * 22}" y="150" width="6" height="6"/>`).join("")}</g>`,

  /** ナポリ専用。三日月形の湾とヴェスヴィオ山。 */
  bay:
    sky("#8fc4e8", "#cfe4f0", 118) +
    sun(340, 40, 20) +
    clouds(90, 22, 0.8) +
    volcanoShape(280, 118, 60, "#6f5a48") +
    smokePuffs(280, 62, 3) +
    ground(118, "#c9b07a") +
    band(150, 60, "#2a7196") +
    ripples(160, "#bfe8f4") + ripples(178, "#9fd0e4") +
    houseRow([
      [30, 150, 24, 28], [58, 150, 20, 24], [84, 150, 22, 26],
      [120, 150, 20, 22], [150, 150, 24, 26], [178, 150, 18, 20],
    ], "#e8a020") +
    `<g fill="#5b8fe8" opacity=".8">${Array.from({ length: 6 }).map((_, i) => `<rect x="${36 + i * 24}" y="158" width="7" height="8"/>`).join("")}</g>` +
    // 湾を渡るフェリーと小舟
    `<g fill="#5b8fe8" opacity=".8">${Array.from({ length: 3 }).map((_, i) => `<path d="M${200 + i * 40},166c8,-3 20,-3 28,0l-3,5h-22z"/>`).join("")}</g>` +
    `<path d="M320,172c6,-3 30,-3 36,0l-3,6h-30z" fill="#f6efe2" stroke="#20364a" stroke-width="1.4"/>` +
    gull(60, 40, 0.9) + gull(180, 30, 0.8) + gull(300, 50, 0.7) +
    // 洗濯物のロープ(ナポリらしい細部)
    `<g stroke="#4a4a52" stroke-width="1"><path d="M60,150h20"/></g><g fill="#f6efe2"><rect x="62" y="150" width="4" height="6"/><rect x="70" y="150" width="4" height="6"/></g>` +
    ground(184, "#b8ac8e"),

  /** ポンペイ専用。発掘された遺構とヴェスヴィオ山。 */
  ruins:
    sky("#8fc4e8", "#cfe4f0", 130) +
    clouds(80, 20, 0.7) +
    volcanoShape(320, 130, 56, "#5c4a3a") +
    smokePuffs(320, 78, 2) +
    ground(130, "#c9b07a") +
    columnRow(50, 178, 5, 24, 40, "#e8e0cc") +
    `<rect x="150" y="176" width="60" height="6" fill="#9a8f70"/>` +
    `<rect x="160" y="150" width="26" height="26" fill="#c9a877" opacity=".9"/>` +
    // フレスコ画の名残(壁に残る色)
    `<g fill="#e8443f" opacity=".6">${Array.from({ length: 3 }).map((_, i) => `<rect x="${164 + i * 8}" y="158" width="5" height="10"/>`).join("")}</g>` +
    // 割れた円柱(横倒し)
    `<rect x="220" y="190" width="60" height="12" rx="5" fill="#d8cca8"/>` +
    `<rect x="290" y="186" width="40" height="10" rx="4" fill="#c9b896"/>` +
    // 敷石の街路(轍つき、ポンペイの実際の轍跡)
    `<g fill="#b8ac8e" opacity=".7">${Array.from({ length: 8 }).map((_, i) => `<rect x="${20 + i * 22}" y="196" width="18" height="10"/>`).join("")}</g>` +
    `<g stroke="#9a8f70" stroke-width="2" opacity=".8"><path d="M20,206h180M20,204h180"/></g>` +
    // 石畳の飛び石(横断歩道)
    `<g fill="#e8e0cc">${Array.from({ length: 3 }).map((_, i) => `<rect x="${100 + i * 16}" y="200" width="10" height="8"/>`).join("")}</g>` +
    // 遠くの人影(発掘作業員)
    `<g><circle cx="60" cy="168" r="3.4" fill="#d9a273"/><rect x="57" y="172" width="6" height="10" fill="#5b8fe8"/></g>`,

  /** ソレント専用。レモンの木立と崖。 */
  citrus:
    sky("#8fc4e8", "#cfe4f0", 130) +
    clouds(60, 24, 1) + clouds(200, 18, 0.7) +
    ground(130, "#9ab35a") +
    citrusTree(60, 176, 20) + citrusTree(100, 182, 16) + citrusTree(140, 178, 14) +
    citrusTree(280, 176, 17) + citrusTree(310, 178, 18) + citrusTree(350, 184, 15) +
    // 藁のむしろ(冬の霜よけ)
    `<g fill="#e8dcc0" opacity=".85">${Array.from({ length: 3 }).map((_, i) => `<rect x="${55 + i * 40}" y="188" width="20" height="4"/>`).join("")}</g>` +
    `<g stroke="#7fa8c4" stroke-width="2" opacity=".7"><path d="M40,196h100M280,200h100"/></g>` +
    // 水路(灌漑の溝)
    `<g stroke="#3f8fc4" stroke-width="2" opacity=".8"><path d="M180,190v16"/></g>` +
    // レモン畑の家(小屋)
    `<rect x="190" y="180" width="26" height="18" fill="#e8dcc0"/><path d="M186,180h34l-5,-8h-24z" fill="#c9714a"/>` +
    // 崖の縁(手前)
    `<path d="M0,206c60,-10 100,4 160,-6c90,-14 180,6 240,-8v18H0z" fill="#c9b896"/>` +
    band(170, 40, "#2a7196") +
    ripples(180, "#bfe8f4") + ripples(196, "#9fd0e4") +
    gull(340, 40, 0.8),

  /** ポジターノ・チンクエテッレ・トロペア・チェファル。崖に張り付く家並み。 */
  cliffhouses:
    sky("#8fc4e8", "#cfe4f0", 110) +
    sun(340, 46, 22) +
    clouds(80, 30, 1) +
    band(110, 60, "#1e6ea0") +
    ripples(126, "#bfe8f4") +
    // 崖
    `<path d="M0,170c40,-70 90,-100 140,-100c50,0 90,60 100,100v40H0z" fill="#9a8f70"/>` +
    cliffHouseRow(40, 168, 11, ["#e8a020", "#e8dcc0", "#c9714a", "#f4c430", "#e8443f"]) +
    // 浜(手前)
    `<path d="M0,196c60,-6 120,4 200,-2c80,-6 140,4 200,-2v16H0z" fill="#e8dcc0"/>`,

  /** アルベロベッロ専用。円錐屋根のトゥルッリ。 */
  trulli:
    sky("#8fc4e8", "#cfe4f0", 140) +
    sun(50, 36, 18) +
    clouds(320, 26, 1) + clouds(160, 20, 0.7) +
    ground(140, "#a8bd6a") +
    coneRoofHouse(60, 190, 34, 44, "#8a8f95", "#f5f0e0") +
    coneRoofHouse(104, 194, 28, 36, "#9a9ea4", "#f5f0e0") +
    coneRoofHouse(140, 190, 30, 42, "#8a8f95", "#f5f0e0") +
    coneRoofHouse(240, 192, 26, 34, "#9a9ea4", "#f5f0e0") +
    coneRoofHouse(276, 188, 32, 46, "#8a8f95", "#f5f0e0") +
    coneRoofHouse(318, 194, 24, 32, "#9a9ea4", "#f5f0e0") +
    coneRoofHouse(350, 198, 20, 26, "#8a8f95", "#f5f0e0") +
    // 屋根の頂の絵柄(トゥルッリの目印)
    `<g fill="#241a10" opacity=".8">${[60, 104, 140, 276, 318].map((x) => `<circle cx="${x}" cy="${150 + (x % 40)}" r="1.4"/>`).join("")}</g>` +
    // 石畳の小径(手前)と扉
    `<g fill="#e8dcc0">${[60, 104, 140, 240, 276].map((x) => `<rect x="${x - 5}" y="182" width="10" height="12"/>`).join("")}</g>` +
    `<g fill="#b8ac8e" opacity=".8">${Array.from({ length: 10 }).map((_, i) => `<rect x="${10 + i * 40}" y="200" width="30" height="8"/>`).join("")}</g>` +
    roundTree(200, 200, 12, "#7fae5a") + roundTree(20, 204, 10, "#7fae5a") +
    ground(202, "#8ba85a"),

  /** レッチェ専用。彫刻を纏った石の正面。 */
  baroque:
    sky("#8fc4e8", "#cfe4f0", 130) +
    clouds(300, 26, 1) + clouds(90, 20, 0.7) +
    ground(130, "#c9b07a") +
    `<rect x="120" y="90" width="160" height="90" fill="#e8dcc0"/>` +
    `<path d="M120,90c0,-20 160,-20 160,0z" fill="#d8cca8"/>` +
    // 彫刻の渦巻き(左右の柱)
    `<g stroke="#c9a877" stroke-width="3" fill="none"><path d="M130,180V110q0,-10 10,-10M270,180V110q0,-10 -10,-10"/></g>` +
    // ガーゴイル・果物の飾り(頂部)
    `<g fill="#e8443f">${Array.from({ length: 5 }).map((_, i) => `<circle cx="${150 + i * 22}" cy="86" r="4"/>`).join("")}</g>` +
    `<g fill="#f4c430">${Array.from({ length: 5 }).map((_, i) => `<circle cx="${150 + i * 22}" cy="86" r="1.6"/>`).join("")}</g>` +
    `<g fill="#c9a877">${Array.from({ length: 2 }).map((_, i) => `<path d="M${132 + i * 130},95c-4,4 -4,10 0,14c4,-4 4,-10 0,-14z"/>`).join("")}</g>` +
    // ステンドグラスふうの窓
    `<g fill="#5b8fe8" opacity=".8"><circle cx="200" cy="120" r="12"/></g><circle cx="200" cy="120" r="12" fill="none" stroke="#e8dcc0" stroke-width="2"/>` +
    `<g fill="#e8dcc0" opacity=".9">${Array.from({ length: 6 }).map((_, i) => `<line x1="200" y1="120" x2="${200 + Math.cos((i / 6) * Math.PI * 2) * 12}" y2="${120 + Math.sin((i / 6) * Math.PI * 2) * 12}" stroke="#e8dcc0" stroke-width="1"/>`).join("")}</g>` +
    columnRow(40, 178, 3, 26, 34, "#e8e0cc") +
    columnRow(300, 178, 3, 26, 34, "#e8e0cc") +
    // 石畳の広場(手前)
    `<g fill="#c9b896" opacity=".7">${Array.from({ length: 5 }).map((_, i) => `<rect x="${140 + i * 24}" y="196" width="18" height="8"/>`).join("")}</g>` +
    ground(190, "#b8ac8e"),

  /** マテーラ専用。崖に穿たれた洞窟住居。 */
  sassi:
    sky("#8fc4e8", "#cfe4f0", 120) +
    clouds(80, 26, 1) + clouds(320, 20, 0.7) +
    ground(120, "#c9b07a") +
    // ラヴィーネ(渓谷)の崖
    `<path d="M0,206c40,-70 100,-90 160,-86c60,4 100,50 120,86z" fill="#c2b090"/>` +
    `<g fill="#b8a880">${Array.from({ length: 14 }).map((_, i) => {
      const x = 20 + (i % 7) * 48; const y = 130 + Math.floor(i / 7) * 34;
      return `<rect x="${x}" y="${y}" width="34" height="26" rx="3"/><rect x="${x + 12}" y="${y + 8}" width="10" height="14" fill="#5a4a30"/>`;
    }).join("")}</g>` +
    // 岩窟教会の入口(アーチ形)
    `<path d="M300,196v-20a12,12 0 0 1 24,0v20z" fill="#5a4a30"/>` +
    // 階段(渓谷を降りる小径)
    `<g fill="#9a8f70">${Array.from({ length: 6 }).map((_, i) => `<rect x="${180 + i * 8}" y="${180 - i * 4}" width="8" height="4"/>`).join("")}</g>` +
    // 小さな窓の明かり
    `<g fill="#f4c430" opacity=".8">${Array.from({ length: 5 }).map((_, i) => `<rect x="${34 + i * 48}" y="140" width="3" height="4"/>`).join("")}</g>` +
    gull(200, 40, 0.9) +
    ground(196, "#9a8f70"),

  /** アグリジェント・シラクーサ・タオルミーナ。ギリシャ様式の列柱。 */
  temple:
    sky("#8fc4e8", "#cfe4f0", 150) +
    sun(340, 40, 18) +
    clouds(70, 22, 0.8) +
    hills(148, "#9ab35a") +
    ground(150, "#a8bd6a") +
    columnRow(50, 190, 6, 24, 50, "#e8e0cc") +
    `<rect x="30" y="178" width="180" height="6" fill="#c9b896"/>` +
    // 崩れた円柱の破片(手前)
    `<g fill="#d8cca8">${Array.from({ length: 4 }).map((_, i) => `<rect x="${230 + i * 18}" y="196" width="14" height="8" rx="3"/>`).join("")}</g>` +
    `<g fill="#c9b896">${Array.from({ length: 3 }).map((_, i) => `<rect x="${300 + i * 20}" y="188" width="16" height="7" rx="3"/>`).join("")}</g>` +
    // アーモンド・オリーブの木立
    roundTree(250, 202, 12, "#7fae5a") + roundTree(80, 204, 10, "#7fae5a") + roundTree(360, 200, 11, "#5f8f4a") +
    // 段になった石の基壇(手前)
    `<g fill="#b8ac8e" opacity=".85"><rect x="30" y="186" width="180" height="8"/></g>` +
    `<g fill="#c9b896" opacity=".8">${Array.from({ length: 8 }).map((_, i) => `<rect x="${30 + i * 22}" y="196" width="18" height="8"/>`).join("")}</g>` +
    gull(200, 40, 0.9) + gull(230, 30, 0.7),

  /** カターニア専用。噴煙を上げるエトナ山と黒い溶岩石の町。 */
  volcano:
    sky("#8fc4e8", "#cfe4f0", 100) +
    volcanoShape(200, 110, 90, "#4a3c30") +
    smokePuffs(200, 24, 4) +
    // 溶岩流の筋
    `<g fill="#e8443f" opacity=".5">${Array.from({ length: 3 }).map((_, i) => `<path d="M${196 + i * 6},${70 - i * 6}l-3,${30 + i * 6}h6z"/>`).join("")}</g>` +
    ground(100, "#5c4a3a") +
    houseRow([
      [40, 150, 26, 30], [70, 150, 22, 26], [100, 154, 20, 22], [280, 150, 24, 28], [320, 150, 26, 30], [352, 154, 20, 22],
    ], "#3a3028") +
    `<g fill="#5b8fe8" opacity=".7">${Array.from({ length: 5 }).map((_, i) => `<rect x="${48 + i * 32}" y="160" width="7" height="8"/>`).join("")}</g>` +
    // 黒い溶岩石の舗装(市場の広場)
    `<g fill="#8a8478" opacity=".8">${Array.from({ length: 6 }).map((_, i) => `<rect x="${100 + i * 34}" y="176" width="26" height="10"/>`).join("")}</g>` +
    `<g fill="#3a3028" opacity=".6">${Array.from({ length: 6 }).map((_, i) => `<rect x="${100 + i * 34}" y="188" width="26" height="8"/>`).join("")}</g>` +
    // 魚市場の露店(カターニアの名物)
    `<rect x="170" y="150" width="60" height="8" fill="#4a4a52"/><g fill="#bfe8f4"><ellipse cx="190" cy="156" rx="8" ry="4"/><ellipse cx="210" cy="156" rx="8" ry="4"/></g>` +
    ground(190, "#4a3c30"),

  /** バルーミニ専用。石積みの円塔(ヌラーゲ)。 */
  nuraghe:
    sky("#8fc4e8", "#cfe4f0", 150) +
    clouds(320, 26, 1) + clouds(70, 22, 0.8) +
    hills(148, "#9ab35a", 4) +
    ground(150, "#9ab35a") +
    coneRoofHouse(190, 196, 60, 76, "#9a9488", "#9a9488") +
    // 石積みの継ぎ目(横縞)
    `<g stroke="#7a7468" stroke-width="1" opacity=".7">${Array.from({ length: 7 }).map((_, i) => `<path d="M${164 + i * 0.3},${196 - i * 9}h${52 - i * 0.6}"/>`).join("")}</g>` +
    `<g fill="#8a8478">${Array.from({ length: 3 }).map((_, i) => `<rect x="${176 + i * 14}" y="${140 + i * 3}" width="10" height="8"/>`).join("")}</g>` +
    coneRoofHouse(100, 202, 24, 30, "#8a8478", "#8a8478") +
    coneRoofHouse(290, 200, 26, 32, "#9a9488", "#9a9488") +
    coneRoofHouse(70, 206, 18, 22, "#9a9488", "#9a9488") +
    coneRoofHouse(322, 204, 20, 24, "#8a8478", "#8a8478") +
    // 石垣の囲い(手前)
    `<g fill="#8a8478">${Array.from({ length: 10 }).map((_, i) => `<rect x="${20 + i * 8}" y="196" width="6" height="8"/>`).join("")}</g>` +
    // 羊(遠景の放牧)
    `<g fill="#f2f0e8" opacity=".9">${Array.from({ length: 3 }).map((_, i) => `<ellipse cx="${340 + i * 10}" cy="188" rx="5" ry="3.4"/>`).join("")}</g>` +
    ground(206, "#8ba85a"),

  /** ヌオーロ専用。羊飼いと羊、バルバジアの山。 */
  shepherd:
    sky("#8fc4e8", "#cfe4f0", 140) +
    clouds(80, 22, 0.8) +
    alpinePeak(340, 138, 50, "#6f8a52") + alpinePeak(300, 142, 34, "#7f9f5c") +
    hills(138, "#7f9f5c", 5) +
    ground(140, "#8fae63") +
    `<g fill="#f2f0e8" stroke="#8a8478" stroke-width="1">${Array.from({ length: 9 }).map((_, i) => {
      const x = 30 + (i % 5) * 24 + Math.floor(i / 5) * 12; const y = 180 + Math.floor(i / 5) * 14;
      return `<ellipse cx="${x}" cy="${y}" rx="9" ry="6.4"/><circle cx="${x - 7}" cy="${y - 2}" r="3.6" fill="#3a3028"/>`;
    }).join("")}</g>` +
    // 遠くの群れ(小さく)
    `<g fill="#e8e0cc" opacity=".85">${Array.from({ length: 5 }).map((_, i) => `<ellipse cx="${240 + i * 12}" cy="158" rx="4" ry="2.6"/>`).join("")}</g>` +
    // 羊飼い
    `<g><circle cx="320" cy="168" r="7" fill="#d9a273"/><rect x="313" y="176" width="14" height="20" fill="#5a4a30"/><line x1="330" y1="170" x2="345" y2="150" stroke="#6b5330" stroke-width="2.4"/></g>` +
    // 石積みの羊小屋(手前)
    `<rect x="20" y="184" width="40" height="20" fill="#9a9488"/><path d="M16,184h48l-6,-8h-36z" fill="#6b7060"/>` +
    // マムトーネスの木の面(壁に掛けた飾り)
    `<circle cx="360" cy="192" r="8" fill="#8a5a3a"/><circle cx="357" cy="190" r="1.4" fill="#241a10"/><circle cx="363" cy="190" r="1.4" fill="#241a10"/>` +
    ground(198, "#7fae5a"),
};

export const ITALY_BG = { ...ITALY_BASE_BG };

// ---------------------------------------------------------------------------
// 都市シンボル(27種)。鍵は cities.mjs の `mark` と対応。24×24の座標系。
// ---------------------------------------------------------------------------

export const ITALY_MARKS = {
  /** 円形闘技場のアーチ。ローマ専用。 */
  colosseum:
    `<rect x="2" y="14" width="20" height="8" fill="#c9a877"/>` +
    `<g fill="none" stroke="#c9a877" stroke-width="2"><path d="M4,14v-4a2,2 0 0 1 4,0v4M11,14v-4a2,2 0 0 1 4,0v4M18,14v-4a2,2 0 0 1 4,0v4"/></g>` +
    `<rect x="2" y="7" width="20" height="3" fill="#b8ac8e"/>`,

  /** 運河とゴンドラ。ヴェネツィア専用。 */
  canal:
    `<rect x="2" y="16" width="20" height="6" fill="#2a7196"/>` +
    `<path d="M4,16c1,-3 3,-4 5,-4h6c2,0 4,1 5,4z" fill="#241a10"/>` +
    `<path d="M4,16q-2,0 -2,2" fill="none" stroke="#241a10" stroke-width="1.4"/>`,

  /** ゴシックの尖塔。ミラノ専用。 */
  duomo:
    `<rect x="8" y="12" width="8" height="10" fill="#f2f0e8"/>` +
    `<path d="M8,12L12,4L16,12z" fill="#e8e0cc"/>` +
    `<rect x="3" y="16" width="5" height="6" fill="#f2f0e8"/><path d="M3,16L5.5,10L8,16z" fill="#e8e0cc"/>` +
    `<rect x="16" y="16" width="5" height="6" fill="#f2f0e8"/><path d="M16,16L18.5,10L21,16z" fill="#e8e0cc"/>`,

  /** 赤い丸屋根(ルネサンス)。フィレンツェ専用。 */
  dome:
    `<rect x="8" y="16" width="8" height="6" fill="#e8e0cc"/>` +
    `<path d="M6,16a6,6 0 0 1 12,0z" fill="#b5502f"/>` +
    `<rect x="11" y="4" width="2" height="4" fill="#e8e0cc"/>`,

  /** 傾いた塔。ピサ専用。 */
  leaningtower:
    `<g transform="rotate(-8 12 20)"><rect x="9" y="4" width="6" height="18" rx="3" fill="#f2f0e8" stroke="#d8d0bc" stroke-width="1"/><ellipse cx="12" cy="4" rx="3.6" ry="2" fill="#f2f0e8"/></g>`,

  /** 中世の石塔が並ぶ稜線。サンジミニャーノ専用。 */
  towers:
    `<rect x="2" y="12" width="5" height="10" fill="#c9b896"/>` +
    `<rect x="9" y="6" width="6" height="16" fill="#bfae8a"/>` +
    `<rect x="17" y="14" width="5" height="8" fill="#c9b896"/>`,

  /** 丘の上の城壁都市。シエナ・アッシジ・ペルージャ・オルヴィエート。 */
  hilltown:
    `<path d="M2,20a10,6 0 0 1 20,0z" fill="#c2b559"/>` +
    `<rect x="7" y="13" width="5" height="7" fill="#b5502f"/><rect x="13" y="15" width="5" height="5" fill="#c9714a"/>`,

  /** ローマ円形闘技場(小型)。ヴェローナ専用。 */
  arena:
    `<ellipse cx="12" cy="17" rx="10" ry="5" fill="#e8dcc0" stroke="#c9b896" stroke-width="1.4"/>` +
    `<ellipse cx="12" cy="15" rx="10" ry="5" fill="none" stroke="#9a8f70" stroke-width="1.4"/>`,

  /** アーケードの柱廊。ボローニャ・パドヴァ。 */
  portico:
    `<rect x="2" y="14" width="20" height="3" fill="#e8dcc0"/>` +
    `<g fill="#e8dcc0"><rect x="3" y="17" width="3" height="5"/><rect x="9" y="17" width="3" height="5"/><rect x="15" y="17" width="3" height="5"/><rect x="18" y="17" width="3" height="5"/></g>`,

  /** ビザンチンのドームとモザイク。ラヴェンナ専用。 */
  mosaic:
    `<path d="M5,15a7,6 0 0 1 14,0z" fill="#d8cca8"/><rect x="4" y="15" width="16" height="7" fill="#c9a877"/>` +
    `<g fill="#e8443f"><rect x="6" y="18" width="3" height="3"/></g><g fill="#1a4a8f"><rect x="10" y="18" width="3" height="3"/></g><g fill="#f4c430"><rect x="14" y="18" width="3" height="3"/></g>`,

  /** チーズの塊と熟成庫。パルマ専用。 */
  dairy:
    `<ellipse cx="8" cy="16" rx="6" ry="4" fill="#f4d060" stroke="#c9a020" stroke-width="1"/>` +
    `<ellipse cx="17" cy="18" rx="4.5" ry="3" fill="#f4d060" stroke="#c9a020" stroke-width="1"/>`,

  /** アルプス・アペニンの峰。アオスタ・ボルツァーノ・ラクイラ。 */
  mountain:
    `<path d="M2,20L9,7L14,14L17,9L22,20z" fill="#8b8f98"/>` +
    `<path d="M9,7L11,11L7,12z" fill="#f2f6f8"/>`,

  /** 湖と渡し船。コモ専用。 */
  lake:
    `<rect x="2" y="15" width="20" height="6" fill="#3f8fc4"/>` +
    `<path d="M8,15c6,-6 8,-2 12,0" fill="none" stroke="#bfe8f4" stroke-width="1.2"/>` +
    `<path d="M4,17c4,-3 12,-3 16,0l-2,3H6z" fill="#f6efe2"/>`,

  /** 丘のぶどう畑(トリュフの犬つき)。アルバ専用。 */
  vineyard:
    `<g stroke="#7a8f4a" stroke-width="2"><path d="M2,20h20M2,16h20M2,12h20"/></g>` +
    `<circle cx="18" cy="9" r="2" fill="#7fae5a"/>`,

  /** 煙突と組立ライン。トリノ専用。 */
  factory:
    `<rect x="3" y="12" width="14" height="9" fill="#8f96a0"/>` +
    `<rect x="15" y="5" width="4" height="16" fill="#7f8896"/>` +
    `<path d="M17,5c0,-3 3,-3 3,-6" fill="none" stroke="#c8ccc4" stroke-width="1.4" opacity=".8"/>`,

  /** 起重機と船。ジェノヴァ・トリエステ・バーリ・レッジョカラブリア・パレルモ・カリアリ・アルゲーロ・オルビア。 */
  port:
    `<rect x="10" y="4" width="2" height="14" fill="#e8443f"/>` +
    `<rect x="10" y="4" width="9" height="2" fill="#e8443f"/>` +
    `<path d="M2,18h20l-3,4H5z" fill="#2a7196"/>`,

  /** 三日月形の湾とヴェスヴィオ山。ナポリ専用。 */
  bay:
    `<path d="M8,14L12,6L16,14z" fill="#6f5a48"/><circle cx="12" cy="4.5" r="1.6" fill="#e8443f" opacity=".8"/>` +
    `<path d="M2,17q10,-6 20,0v5H2z" fill="#2a7196"/>`,

  /** 発掘された古代の遺構。ポンペイ専用。 */
  ruins:
    `<rect x="4" y="10" width="3" height="11" fill="#e8e0cc"/><rect x="10" y="8" width="3" height="13" fill="#e8e0cc"/><rect x="16" y="11" width="3" height="10" fill="#e8e0cc"/>` +
    `<rect x="3" y="20" width="17" height="2" fill="#c9a877"/>`,

  /** レモンの木立。ソレント専用。 */
  citrus:
    `<circle cx="12" cy="12" r="8" fill="#4f8f4f"/>` +
    `<g fill="#f4c430"><circle cx="8" cy="10" r="1.6"/><circle cx="16" cy="14" r="1.6"/><circle cx="12" cy="17" r="1.6"/></g>` +
    `<rect x="11" y="19" width="2" height="4" fill="#6b5330"/>`,

  /** 崖に張り付く色とりどりの家並み。ポジターノ・チンクエテッレ・トロペア・チェファル。 */
  cliffhouses:
    `<path d="M2,22c2,-14 8,-20 10,-20c2,0 8,6 10,20z" fill="#9a8f70"/>` +
    `<g><rect x="6" y="14" width="4" height="6" fill="#e8a020"/><rect x="11" y="11" width="4" height="7" fill="#e8dcc0"/><rect x="16" y="15" width="4" height="5" fill="#c9714a"/></g>`,

  /** 円錐屋根の家(トゥルッリ)。アルベロベッロ専用。 */
  trulli:
    `<rect x="6" y="15" width="12" height="7" fill="#f5f0e0"/>` +
    `<path d="M4,15L12,5L20,15z" fill="#8a8f95"/><circle cx="12" cy="7" r="1.6" fill="#f5f0e0"/>`,

  /** 彫刻を纏った石の正面。レッチェ専用。 */
  baroque:
    `<rect x="4" y="12" width="16" height="10" fill="#e8dcc0"/>` +
    `<path d="M4,12c0,-5 16,-5 16,0z" fill="#d8cca8"/>` +
    `<g fill="#e8443f"><circle cx="8" cy="10" r="1.4"/><circle cx="12" cy="9" r="1.4"/><circle cx="16" cy="10" r="1.4"/></g>`,

  /** 崖に穿たれた洞窟住居。マテーラ専用。 */
  sassi:
    `<path d="M2,22c1,-10 6,-16 10,-16c4,0 9,6 10,16z" fill="#c2b090"/>` +
    `<g fill="#5a4a30"><rect x="6" y="15" width="4" height="5" rx="1"/><rect x="14" y="15" width="4" height="5" rx="1"/><rect x="10" y="10" width="4" height="5" rx="1"/></g>`,

  /** ギリシャ様式の列柱。アグリジェント・シラクーサ・タオルミーナ。 */
  temple:
    `<rect x="2" y="16" width="20" height="3" fill="#e8e0cc"/>` +
    `<g fill="#e8e0cc"><rect x="3" y="8" width="3" height="8"/><rect x="8" y="8" width="3" height="8"/><rect x="13" y="8" width="3" height="8"/><rect x="18" y="8" width="3" height="8"/></g>` +
    `<rect x="2" y="6" width="20" height="2" fill="#d8cca8"/>`,

  /** 噴煙を上げる火山。カターニア専用。 */
  volcano:
    `<path d="M2,20L12,4L22,20z" fill="#4a3c30"/>` +
    `<g fill="#c8ccc4" opacity=".8"><circle cx="12" cy="3" r="2.4"/><circle cx="14" cy="0" r="2"/></g>` +
    `<circle cx="12" cy="6" r="1.6" fill="#e8443f"/>`,

  /** 石積みの円塔(ヌラーゲ)。バルーミニ専用。 */
  nuraghe:
    `<path d="M5,22c0,-9 3,-15 7,-15c4,0 7,6 7,15z" fill="#9a9488"/>` +
    `<ellipse cx="12" cy="7" rx="3" ry="1.6" fill="#8a8478"/>`,

  /** 羊飼いと羊、山の斜面。ヌオーロ専用。 */
  shepherd:
    `<ellipse cx="8" cy="17" rx="5" ry="3.6" fill="#f2f0e8" stroke="#8a8478" stroke-width="1"/><circle cx="4" cy="15" r="2" fill="#3a3028"/>` +
    `<circle cx="18" cy="10" r="3" fill="#d9a273"/><rect x="15" y="13" width="6" height="9" fill="#5a4a30"/>`,
};
