/**
 * ウクライナの都市イラスト。
 *
 * `UKRAINE_MARKS` は24×24の座標系に描くシンボル、`UKRAINE_BG` は400×210の
 * 座標系に描く背景シーン(いずれもSVG断片の文字列)。他の盤面と同じく
 * 最初から文字列として持つ。動きは含めない(アニメーションはReact側で重ねる)。
 *
 * ウクライナらしさは **黄金の玉ねぎ屋根 #d4af37、国旗の青 #0057B7、
 * チェルノーゼムの黒褐色 #3a2a1a、小麦の金色 #d8b34a、白漆喰の壁
 * #f6efe2、刺繍の赤 #c8102e、カルパチアの森の緑 #2f6b3a** で出す。
 *
 * 鍵は `cities.mjs` の `mark` / `bg` と一対一で対応する(21種)。
 * 増やすときは両方を揃えること。
 *
 * **背景SVGの中央25%(x=151〜249 / y=54〜152)は都市シンボルに隠れて
 * 見えない。** 見せたい細部は左右3分の1と手前(y>170)に置く。
 * `sky()` は必ず第3引数(次に来る塗りの開始y)を渡すこと。
 */

// ---------------------------------------------------------------------------
// 背景シーンの組み立て部品
// ---------------------------------------------------------------------------

const W = 400;
const r1 = (v) => Math.round(v * 10) / 10;

function band(y, h, fill) {
  return `<rect x="0" y="${y}" width="${W}" height="${h}" fill="${fill}"/>`;
}

/** 空。第3引数に「次に来る塗りの開始y」を渡す。 */
function sky(top = "#8fc4e8", bottom = "#cfe4f0", to = 124) {
  return band(0, 92, top) + band(84, Math.max(0, to - 84), bottom);
}

function ground(y, fill) {
  return `<rect x="0" y="${y}" width="${W}" height="${210 - y}" fill="${fill}"/>`;
}

function sun(cx, cy, r, fill = "#f4c430") {
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

/** カルパチアの丸みを帯びた緑の山(韓国の花崗岩の山と違い、雪帽子を付けない)。 */
function carpathianHill(cx, base, h, fill = "#4f7a52") {
  const w = r1(h * 1.5);
  return `<path d="M${r1(cx - w / 2)},${base}Q${r1(cx - w * 0.2)},${r1(base - h)} ${cx},${r1(base - h * 0.86)}Q${r1(cx + w * 0.2)},${r1(base - h)} ${r1(cx + w / 2)},${base}z" fill="${fill}"/>`;
}

/** 松。カルパチアとポリッシャの森に。 */
function pine(x, base, h, fill = "#2f5f3f") {
  const w = r1(h * 0.6);
  return (
    `<rect x="${r1(x - 2)}" y="${r1(base - 8)}" width="4" height="8" fill="#5a4630"/>` +
    `<path d="M${r1(x - w / 2)},${r1(base - h * 0.32)}L${x},${r1(base - h * 0.62)}L${r1(x + w / 2)},${r1(base - h * 0.32)}z" fill="${fill}"/>` +
    `<path d="M${r1(x - w * 0.42)},${r1(base - h * 0.6)}L${x},${r1(base - h * 0.86)}L${r1(x + w * 0.42)},${r1(base - h * 0.6)}z" fill="${fill}"/>` +
    `<path d="M${r1(x - w * 0.3)},${r1(base - h * 0.84)}L${x},${r1(base - h)}L${r1(x + w * 0.3)},${r1(base - h * 0.84)}z" fill="${fill}"/>`
  );
}

/** ポプラ(細長い卵形の樹冠。ステップの並木道)。 */
function poplar(x, base, h, fill = "#3f7a4a") {
  return (
    `<rect x="${r1(x - 1.5)}" y="${r1(base - h * 0.3)}" width="3" height="${r1(h * 0.3)}" fill="#5a4630"/>` +
    `<ellipse cx="${x}" cy="${r1(base - h * 0.62)}" rx="${r1(h * 0.16)}" ry="${r1(h * 0.42)}" fill="${fill}"/>`
  );
}

/** 柳(垂れ枝)。ポリッシャの川辺に。 */
function willow(x, base, h, fill = "#5f8f5a") {
  const branches = [];
  for (let i = -2; i <= 2; i++) {
    branches.push(`M${x},${r1(base - h * 0.6)}Q${r1(x + i * 6)},${r1(base - h * 0.3)} ${r1(x + i * 8)},${base}`);
  }
  return (
    `<rect x="${r1(x - 2)}" y="${r1(base - h * 0.6)}" width="4" height="${r1(h * 0.6)}" fill="#6b5330"/>` +
    `<g stroke="${fill}" stroke-width="1.6" fill="none" opacity=".85"><path d="${branches.join("")}"/></g>` +
    `<ellipse cx="${x}" cy="${r1(base - h * 0.68)}" rx="${r1(h * 0.34)}" ry="${r1(h * 0.2)}" fill="${fill}" opacity=".7"/>`
  );
}

/**
 * ハタ(白漆喰の農家。青い窓枠と茅葺き・瓦の切妻屋根)。この盤面の
 * 視覚の核なので部品にしてある。
 */
function khata(x, base, w, h, roof = "#c8a862", wall = "#f6efe2") {
  const hw = r1(w / 2);
  return (
    `<rect x="${r1(x - hw)}" y="${r1(base - h * 0.6)}" width="${w}" height="${r1(h * 0.6)}" fill="${wall}"/>` +
    `<path d="M${r1(x - hw - 4)},${r1(base - h * 0.6)}L${x},${r1(base - h)}L${r1(x + hw + 4)},${r1(base - h * 0.6)}z" fill="${roof}"/>` +
    `<rect x="${r1(x - hw * 0.3)}" y="${r1(base - h * 0.42)}" width="${r1(hw * 0.6)}" height="${r1(h * 0.3)}" fill="#1a4a8f"/>` +
    `<rect x="${r1(x - hw * 0.3)}" y="${r1(base - h * 0.42)}" width="${r1(hw * 0.6)}" height="${r1(h * 0.3)}" fill="none" stroke="#0057B7" stroke-width="1.4"/>`
  );
}

/** 黄金の玉ねぎ屋根(タマネギドーム)。正教会・聖堂に。 */
function goldenDome(cx, base, w, h, fill = "#d4af37") {
  const hw = r1(w / 2);
  return (
    `<rect x="${r1(cx - hw * 0.7)}" y="${r1(base - h * 0.55)}" width="${r1(hw * 1.4)}" height="${r1(h * 0.55)}" fill="#f6efe2"/>` +
    `<path d="M${r1(cx - hw)},${r1(base - h * 0.55)}Q${r1(cx - hw)},${r1(base - h * 0.85)} ${cx},${r1(base - h)}Q${r1(cx + hw)},${r1(base - h * 0.85)} ${r1(cx + hw)},${r1(base - h * 0.55)}z" fill="${fill}"/>` +
    `<rect x="${r1(cx - 1.2)}" y="${r1(base - h - 8)}" width="2.4" height="8" fill="${fill}"/>` +
    `<rect x="${r1(cx - 4)}" y="${r1(base - h - 5)}" width="8" height="2" fill="${fill}"/>`
  );
}

/** 麦の畝(細い縦の穂の並び)。 */
function wheatRows(x, y, w, rows = 3, color = "#d8b34a") {
  const parts = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < Math.floor(w / 10); j++) {
      parts.push(`<rect x="${r1(x + j * 10)}" y="${r1(y + i * 6 - 5)}" width="1.6" height="7" fill="${color}"/>`);
    }
  }
  return `<g opacity=".85">${parts.join("")}</g>`;
}

/** ひまわり。 */
function sunflower(x, y, r = 5) {
  return (
    `<circle cx="${x}" cy="${y}" r="${r}" fill="${'#f4c430'}"/>` +
    `<circle cx="${x}" cy="${y}" r="${r1(r * 0.4)}" fill="#5a4630"/>` +
    `<rect x="${r1(x - 1)}" y="${y}" width="2" height="${r1(r * 2.4)}" fill="#3f7a4a"/>`
  );
}

/** 石垣(城壁)。凸凹の胸壁付き。 */
function fortressWall(x, y, w, h, fill = "#8a8478") {
  const parts = [`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"/>`];
  for (let i = 0; i < Math.floor(w / 20); i++) {
    parts.push(`<rect x="${r1(x + i * 20)}" y="${r1(y - 8)}" width="10" height="8" fill="${fill}"/>`);
  }
  return parts.join("");
}

/** 円塔(円錐屋根)。 */
function fortressTower(x, base, w, h, fill = "#8a8478", roof = "#6b5330") {
  const hw = r1(w / 2);
  return (
    `<rect x="${r1(x - hw)}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${fill}"/>` +
    `<path d="M${r1(x - hw - 3)},${r1(base - h)}L${x},${r1(base - h - 16)}L${r1(x + hw + 3)},${r1(base - h)}z" fill="${roof}"/>`
  );
}

/** 起重機(港のクレーン)。 */
function crane(x, base, h, fill = "#e8443f") {
  return (
    `<rect x="${r1(x - 2)}" y="${r1(base - h)}" width="4" height="${h}" fill="${fill}"/>` +
    `<rect x="${r1(x - 2)}" y="${r1(base - h)}" width="${r1(h * 0.72)}" height="4" fill="${fill}"/>` +
    `<line x1="${r1(x + h * 0.6)}" y1="${r1(base - h + 2)}" x2="${r1(x + h * 0.6)}" y2="${r1(base - h * 0.55)}" stroke="${fill}" stroke-width="2"/>`
  );
}

function gull(x, y, scale = 1) {
  const w = 8 * scale;
  return `<path d="M${r1(x - w)},${y}q${r1(w / 2)},-6 ${w},0q${r1(w / 2)},-6 ${w},0" fill="none" stroke="#4a4a52" stroke-width="1.4"/>`;
}

function ripples(y, color = "#bfe8f4") {
  return `<g stroke="${color}" stroke-width="2" opacity=".7" fill="none"><path d="M26,${y}h74M176,${y + 12}h92M108,${y + 24}h62"/></g>`;
}

/** 高床の家(デルタの水路沿い)。 */
function stiltHouse(x, base, w, h, wall = "#f6efe2", roof = "#8a6a3a") {
  const hw = r1(w / 2);
  return (
    `<rect x="${r1(x - 1.5)}" y="${r1(base - h * 0.3)}" width="3" height="${r1(h * 0.3)}" fill="#5a4630"/>` +
    `<rect x="${r1(x + hw - 3)}" y="${r1(base - h * 0.3)}" width="3" height="${r1(h * 0.3)}" fill="#5a4630"/>` +
    `<rect x="${r1(x - hw)}" y="${r1(base - h * 0.7)}" width="${w}" height="${r1(h * 0.4)}" fill="${wall}"/>` +
    `<path d="M${r1(x - hw - 3)},${r1(base - h * 0.7)}L${x},${r1(base - h)}L${r1(x + hw + 3)},${r1(base - h * 0.7)}z" fill="${roof}"/>`
  );
}

/** 小舟。 */
function boat(x, y, w, color = "#8a6a3a") {
  const hw = r1(w / 2);
  return `<path d="M${r1(x - hw)},${y}Q${x},${r1(y + 8)} ${r1(x + hw)},${y}z" fill="${color}"/>`;
}

/** 新安全閉じ込め施設ふうの大きなアーチ。 */
function reactorArch(cx, base, w, h, fill = "#8b8f98") {
  const hw = r1(w / 2);
  return (
    `<path d="M${r1(cx - hw)},${base}V${r1(base - h * 0.5)}A${hw},${r1(h * 0.85)} 0 0,1 ${r1(cx + hw)},${r1(base - h * 0.5)}V${base}" fill="none" stroke="${fill}" stroke-width="7"/>` +
    `<rect x="${r1(cx - hw - 6)}" y="${r1(base - 3)}" width="${r1(hw * 2 + 12)}" height="4" fill="#6b7060"/>`
  );
}

/** コンストラクティビズムふうの塔(空中回廊で結ぶ)。 */
function constructivistTower(x, base, w, h, fill = "#8b8f98") {
  return `<rect x="${x}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${fill}"/>` +
    `<g fill="#bfe0f0" opacity=".55">${Array.from({ length: 3 }, (_, i) => `<rect x="${r1(x + 4)}" y="${r1(base - h + 10 + i * 16)}" width="${r1(w - 8)}" height="6"/>`).join("")}</g>`;
}

/** 噴水。 */
function fountainJet(cx, base, h, color = "#bfe8f4") {
  return (
    `<ellipse cx="${cx}" cy="${base}" rx="${r1(h * 0.7)}" ry="6" fill="#7fa8c4"/>` +
    `<g stroke="${color}" stroke-width="2" fill="none" opacity=".85"><path d="M${cx},${base}V${r1(base - h)}M${r1(cx - h * 0.3)},${base}V${r1(base - h * 0.55)}M${r1(cx + h * 0.3)},${base}V${r1(base - h * 0.55)}"/></g>`
  );
}

/** 集合住宅の建物(スラウーティチ)。 */
function apartmentBlock(x, base, w, h, color) {
  return `<rect x="${x}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${color}"/>` +
    `<g fill="#bfe0f0" opacity=".6">${Array.from({ length: 4 }, (_, i) => `<rect x="${r1(x + 3 + (i % 2) * (w / 2))}" y="${r1(base - h + 6 + Math.floor(i / 2) * 14)}" width="${r1(w / 2 - 6)}" height="8"/>`).join("")}</g>`;
}

/** ロケット。 */
function rocket(x, base, h, fill = "#e2dccb") {
  const hw = r1(h * 0.14);
  return (
    `<path d="M${x},${r1(base - h)}c${hw},${r1(h * 0.3)} ${hw},${r1(h * 0.6)} ${hw},${h}h${-hw * 2}c0,${r1(-h * 0.4)} 0,${r1(-h * 0.7)} ${hw},${-h}z" fill="${fill}"/>` +
    `<path d="M${r1(x - hw)},${r1(base - h * 0.3)}l-6,10h6z" fill="#e8443f"/>` +
    `<path d="M${r1(x + hw)},${r1(base - h * 0.3)}l6,10h-6z" fill="#e8443f"/>`
  );
}

// ---------------------------------------------------------------------------
// マーク(24×24)。21種。`cities.mjs` の `mark` と対応。
// ---------------------------------------------------------------------------

export const UKRAINE_MARKS = {
  /** 黄金のドームを持つ聖堂。キーウ。 */
  cathedral:
    `<rect x="8" y="17" width="8" height="4" fill="#f6efe2"/>` +
    `<path d="M6,13Q6,5 12,3Q18,5 18,13Q18,17 12,17Q6,17 6,13z" fill="#d4af37"/>` +
    `<rect x="11" y="0.5" width="2" height="3" fill="#d4af37"/>`,

  /** 市場広場の石造りの町並み。リヴィウ。 */
  oldtown:
    `<rect x="2" y="12" width="6" height="9" fill="#e8b04a"/><path d="M2,12l3,-5l3,5z" fill="#c8783a"/>` +
    `<rect x="9" y="10" width="6" height="11" fill="#7fa8c4"/><path d="M9,10l3,-6l3,6z" fill="#4a4a52"/>` +
    `<rect x="16" y="13" width="6" height="8" fill="#e2dccb"/><path d="M16,13l3,-5l3,5z" fill="#8a5a3a"/>`,

  /** 起重機と船、海への大階段。オデーサ・ミコライウ・イズマイール。 */
  port:
    `<rect x="3" y="8" width="2" height="12" fill="#e8443f"/><rect x="3" y="8" width="12" height="2" fill="#e8443f"/>` +
    `<path d="M4,20h18l-2,-4H7z" fill="#3f7fae"/>`,

  /** 新安全閉じ込め施設のアーチ。チョルノービリ。 */
  memorial:
    `<path d="M4,20V13A8,7 0 0,1 20,13V20" fill="none" stroke="#8b8f98" stroke-width="3"/>` +
    `<rect x="2" y="19" width="20" height="2" fill="#6b7060"/>`,

  /** 空中回廊で結ばれた無機質な塔。ハルキウ。 */
  constructivist:
    `<rect x="4" y="7" width="5" height="14" fill="#8b8f98"/><rect x="15" y="7" width="5" height="14" fill="#8b8f98"/>` +
    `<rect x="9" y="12" width="6" height="3" fill="#6b7060"/>`,

  /** 石垣と塔。カムヤネツィ=ポジーリシキー・ビルホロド=ドニストロウシキー・ルーツィク・テルノーピリ。 */
  fortress:
    `<rect x="3" y="14" width="18" height="7" fill="#8a8478"/>` +
    `<g fill="#7a7468"><rect x="3" y="11" width="3" height="3"/><rect x="9" y="11" width="3" height="3"/><rect x="15" y="11" width="3" height="3"/></g>` +
    `<rect x="9.5" y="5" width="5" height="16" fill="#8a8478"/><path d="M8.5,5L12,0.5L15.5,5z" fill="#6b5330"/>`,

  /** フツル地方の山と木造教会。イヴァノ=フランキウシク・コロミヤ・ウージュホロド。 */
  hutsul:
    `<path d="M1,20L8,6L15,20z" fill="#4f7a52"/>` +
    `<rect x="16" y="15" width="6" height="6" fill="#8a6a3a"/><path d="M15,15l3.5,-5l3.5,5z" fill="#6b5330"/>`,

  /** 温泉水を汲む東屋。トゥルスカヴェツィ。 */
  spa:
    `<path d="M12,3c4,6 6,9 6,12a6,6 0 0,1 -12,0c0,-3 2,-6 6,-12z" fill="#7fc4e8"/>` +
    `<ellipse cx="12" cy="15" rx="3.4" ry="2" fill="#bfe8f4"/>`,

  /** 高床の家と小舟。ヴィルコヴェ。 */
  canal:
    `<rect x="0" y="16" width="24" height="5" fill="#3f7fae"/>` +
    `<rect x="6" y="4" width="1.6" height="12" fill="#6b5330"/><rect x="16" y="4" width="1.6" height="12" fill="#6b5330"/>` +
    `<rect x="5" y="8" width="14" height="8" fill="#f6efe2"/><path d="M4,8l8,-5l8,5z" fill="#8a6a3a"/>`,

  /** 正教会の小さな玉ねぎ屋根。チェルニーヒウ・スーミ。 */
  onion:
    `<rect x="9" y="16" width="6" height="5" fill="#f6efe2"/>` +
    `<path d="M7,12Q7,5 12,4Q17,5 17,12Q17,16 12,16Q7,16 7,12z" fill="#1a4a8f"/>` +
    `<rect x="11" y="1" width="2" height="3" fill="#d4af37"/>`,

  /** 貴族庭園の噴水と並木。ビラ・ツェールクヴァ・ウマーニ。 */
  park:
    `<circle cx="12" cy="17" r="5" fill="#7fa8c4"/><rect x="11" y="7" width="2" height="10" fill="#9a9488"/>` +
    `<circle cx="5" cy="19" r="3" fill="#3f8f4f"/><circle cx="19" cy="19" r="3" fill="#3f8f4f"/>`,

  /** 移築された茅葺き民家。ペレヤスラウ。 */
  folkmuseum:
    `<rect x="3" y="14" width="8" height="7" fill="#f6efe2"/><path d="M2,14l5,-6l5,6z" fill="#c8a862"/>` +
    `<rect x="13" y="15" width="7" height="6" fill="#f6efe2"/><path d="M12,15l4,-5l4,5z" fill="#c8a862"/>`,

  /** 先史時代の環状土器住居。トリピッリャ。 */
  relic:
    `<ellipse cx="12" cy="19" rx="9" ry="2.4" fill="#8a6a3a" opacity=".5"/>` +
    `<path d="M5,19a3,4 0 0,1 6,0z" fill="#c8783a"/><path d="M13,19a3,4 0 0,1 6,0z" fill="#c8783a"/>`,

  /** 緑のトンネルと小さな貨物列車。クレヴァニ。 */
  tunnel:
    `<path d="M2,20V12A10,9 0 0,1 22,12V20" fill="none" stroke="#2f6b3a" stroke-width="4"/>` +
    `<rect x="9" y="16" width="6" height="4" rx="1" fill="#e8443f"/>`,

  /** 各共和国様式の集合住宅。スラウーティチ。 */
  planned:
    `<rect x="3" y="6" width="6" height="15" fill="#c8a862"/><rect x="10" y="9" width="6" height="12" fill="#7fa8c4"/><rect x="17" y="4" width="5" height="17" fill="#c8783a"/>`,

  /** 装飾的な府主教館。チェルニウツィー。 */
  residence:
    `<rect x="4" y="10" width="16" height="11" fill="#e2dccb"/>` +
    `<path d="M10,10V6a2,2 0 0,1 4,0v4z" fill="#d4af37"/>` +
    `<rect x="7" y="13" width="3" height="6" fill="#4a4a52"/><rect x="14" y="13" width="3" height="6" fill="#4a4a52"/>`,

  /** 見張り塔と葦原。チェルカースィ・ザポリッジャ。 */
  cossack:
    `<rect x="11" y="5" width="2" height="15" fill="#6b5330"/><rect x="6" y="5" width="12" height="5" fill="#8a6a3a"/>` +
    `<g stroke="#4a5f3a" stroke-width="1.5"><path d="M2,20v-6M5,20v-7M19,20v-6M22,20v-7"/></g>`,

  /** 仮面と緞帳。クロピヴニツィクィイ。 */
  theatre:
    `<circle cx="8" cy="12" r="6" fill="#e2dccb"/><path d="M5,15q3,3 6,0" fill="none" stroke="#4a4a52" stroke-width="1.4"/>` +
    `<circle cx="16" cy="12" r="6" fill="#c8a862"/><path d="M13,10q3,-3 6,0" fill="none" stroke="#4a4a52" stroke-width="1.4"/>`,

  /** 煙突と線路。クレメンチューク・コロステーニ。 */
  industry:
    `<rect x="9" y="4" width="4" height="14" fill="#8a8478"/><path d="M9,4c0,-3 4,-3 4,0" fill="none" stroke="#c8bfae" stroke-width="1.4"/>` +
    `<rect x="2" y="19" width="20" height="2" fill="#6b7060"/>`,

  /** ロケットの尾翼。ドニプロ。 */
  rocket:
    `<path d="M12,2c2,5 2,10 2,15h-4c0,-5 0,-10 2,-15z" fill="#e2dccb"/>` +
    `<path d="M10,15l-5,7h5z" fill="#e8443f"/><path d="M14,15l5,7h-5z" fill="#e8443f"/>` +
    `<circle cx="12" cy="8" r="1.6" fill="#3f7fae"/>`,

  /** 噴水と放射状の並木道。ヴィーンヌィツャ・ポルタヴァ。 */
  fountain:
    `<ellipse cx="12" cy="19" rx="8" ry="2.4" fill="#7fa8c4"/>` +
    `<g stroke="#bfe8f4" stroke-width="1.6" fill="none"><path d="M12,19V6M8,19V10M16,19V10"/></g>`,
};

// ---------------------------------------------------------------------------
// 背景シーン(21種)。鍵は cities.mjs の `bg` と対応。
// ---------------------------------------------------------------------------

export const UKRAINE_BG = {
  /** 首都。キーウ専用。黄金のドームを左に、ドニプロ川と緑の丘を右に。 */
  capital:
    sky("#8fc4e8", "#cfe4f0", 128) +
    clouds(300, 30, 1.1) +
    hills(126, "#7f9f5f") +
    ground(128, "#7f9f5f") +
    band(168, 42, "#3f7fae") +
    ripples(184, "#bfe8f4") +
    goldenDome(70, 150, 40, 46) +
    goldenDome(110, 150, 26, 30, "#c8102e") +
    `<rect x="40" y="150" width="60" height="6" fill="#4a4436"/>` +
    willow(20, 168, 30) +
    poplar(330, 150, 46) +
    poplar(360, 150, 40) +
    poplar(300, 152, 36),

  /** 市場広場を囲む石造りの町並み。リヴィウ。 */
  oldtown:
    sky("#8fc4e8", "#cfe4f0", 118) +
    clouds(90, 28, 1) +
    ground(118, "#8a8478") +
    `<rect x="0" y="118" width="400" height="12" fill="#9a9488"/>` +
    `<rect x="20" y="60" width="60" height="70" fill="#e8b04a"/><path d="M18,60l32,-24l32,24z" fill="#c8783a"/>` +
    `<rect x="90" y="40" width="55" height="90" fill="#7fa8c4"/><path d="M88,40l29,-22l29,22z" fill="#4a4a52"/>` +
    `<rect x="300" y="55" width="60" height="75" fill="#e2dccb"/><path d="M298,55l32,-24l32,24z" fill="#8a5a3a"/>` +
    `<g fill="#bfe0f0" opacity=".7"><rect x="34" y="76" width="8" height="10"/><rect x="56" y="76" width="8" height="10"/><rect x="104" y="58" width="8" height="10"/><rect x="126" y="58" width="8" height="10"/><rect x="316" y="72" width="8" height="10"/></g>` +
    `<g fill="#4a4a52"><circle cx="50" cy="148" r="3"/></g>`,

  /** 港。オデーサ・ミコライウ・イズマイール。起重機と船、大階段。 */
  port:
    sky("#8fc4e8", "#cfe4f0", 118) +
    clouds(310, 28, 1) +
    ground(118, "#9a9484") +
    gull(60, 50, 1) +
    gull(90, 62, 0.8) +
    gull(320, 44, 1) +
    band(150, 60, "#2f6ea8") +
    ripples(168, "#bfe8f4") +
    crane(50, 150, 60) +
    crane(90, 150, 44) +
    `<rect x="0" y="140" width="400" height="12" fill="#8a8478"/>` +
    `<rect x="290" y="152" width="90" height="20" rx="3" fill="#e8443f"/>` +
    `<rect x="300" y="140" width="70" height="14" fill="#f6efe2"/>` +
    `<g fill="#5b8fe8"><rect x="306" y="143" width="10" height="8"/><rect x="322" y="143" width="10" height="8"/><rect x="338" y="143" width="10" height="8"/></g>` +
    // 大階段(手前左)
    `<g fill="#c8bfae">${Array.from({ length: 6 }, (_, i) => `<rect x="${20 + i * 6}" y="${182 + i * 4}" width="${70 - i * 6}" height="4"/>`).join("")}</g>`,

  /** 新安全閉じ込め施設のアーチ。チョルノービリ。意図して人けのない構図。 */
  zone:
    sky("#9fc0d8", "#dbe6e0", 116) +
    clouds(90, 30, 0.9) +
    ground(116, "#8a9a6a") +
    band(150, 60, "#7f8f5c") +
    // 中央の隠れ帯(x151-249/y54-152)を避け、アーチの頂点を左に寄せる。
    reactorArch(115, 180, 130, 58) +
    pine(280, 178, 34) +
    pine(310, 180, 26) +
    pine(340, 178, 30) +
    pine(370, 180, 24) +
    `<path d="M0,200L400,200" stroke="#c8bda0" stroke-width="14" opacity=".5"/>` +
    `<g fill="#8b8f98" opacity=".8"><rect x="40" y="150" width="14" height="10"/></g>`,

  /** コンストラクティビズムの塔。ハルキウ。 */
  constructivist:
    sky("#8fc4e8", "#cfe4f0", 100) +
    clouds(320, 26, 1) +
    ground(100, "#9a9484") +
    `<rect x="0" y="100" width="400" height="12" fill="#8a8478"/>` +
    constructivistTower(50, 190, 40, 90) +
    constructivistTower(120, 190, 34, 74) +
    `<rect x="90" y="128" width="30" height="8" fill="#6b7060"/>` +
    constructivistTower(300, 190, 44, 96) +
    `<g fill="#8a8478"><rect x="150" y="180" width="180" height="10"/></g>` +
    `<g fill="#5a5f52"><circle cx="180" cy="196" r="4"/><circle cx="220" cy="196" r="4"/><circle cx="260" cy="196" r="4"/></g>`,

  /** 石垣と塔。カムヤネツィ=ポジーリシキー・ビルホロド=ドニストロウシキー・ルーツィク・テルノーピリ。 */
  fortress:
    sky("#8fc4e8", "#cfe4f0", 110) +
    clouds(90, 30, 1) +
    carpathianHill(340, 108, 50, "#6f8a52") +
    ground(110, "#8fae63") +
    fortressWall(0, 140, 400, 20, "#8a8478") +
    fortressTower(60, 160, 24, 40) +
    fortressTower(340, 160, 24, 40) +
    band(176, 34, "#3f7fae") +
    ripples(190, "#bfe8f4"),

  /** フツル地方の山と木造教会。イヴァノ=フランキウシク・コロミヤ・ウージュホロド。 */
  hutsul:
    sky("#8fc4e8", "#cfe4f0", 128) +
    sun(30, 44, 16) +
    clouds(300, 30, 1) +
    carpathianHill(70, 150, 90, "#4f7a52") +
    carpathianHill(340, 150, 76, "#5f8a5c") +
    ground(128, "#7fae63") +
    pine(40, 176, 30) +
    pine(360, 178, 26) +
    khata(180, 190, 40, 34) +
    khata(240, 194, 32, 28) +
    `<rect x="30" y="160" width="16" height="16" fill="#8a6a3a"/><path d="M28,160l10,-14l10,14z" fill="#6b5330"/>`,

  /** 温泉水を汲む東屋。トゥルスカヴェツィ。 */
  spa:
    sky("#8fc4e8", "#cfe4f0", 130) +
    clouds(90, 28, 1) +
    hills(128, "#7f9f5f") +
    ground(130, "#8fae63") +
    `<rect x="60" y="150" width="60" height="40" fill="#e2dccb"/>` +
    `<g fill="#c8bfae">${Array.from({ length: 5 }, (_, i) => `<rect x="${64 + i * 11}" y="150" width="4" height="40"/>`).join("")}</g>` +
    `<path d="M55,150h70l-6,-10h-58z" fill="#8a5a3a"/>` +
    `<ellipse cx="90" cy="192" rx="10" ry="4" fill="#7fc4e8"/>` +
    `<rect x="300" y="160" width="60" height="30" fill="#e2dccb"/>` +
    `<path d="M296,160h68l-6,-9h-56z" fill="#8a5a3a"/>`,

  /** 高床の家と小舟。ヴィルコヴェ。 */
  canal:
    sky("#8fc4e8", "#cfe4f0", 100) +
    clouds(320, 26, 1) +
    band(100, 110, "#3f7fae") +
    ripples(140, "#bfe8f4") +
    ripples(170, "#8fc4e8") +
    stiltHouse(60, 170, 44, 60) +
    stiltHouse(120, 178, 34, 46) +
    stiltHouse(330, 172, 40, 56) +
    boat(200, 195, 30) +
    boat(250, 200, 22) +
    `<g stroke="#4a5f3a" stroke-width="1.5"><path d="M30,200v-14M34,200v-16"/></g>`,

  /** 正教会の小さな玉ねぎ屋根。チェルニーヒウ・スーミ。 */
  onion:
    sky("#8fc4e8", "#cfe4f0", 128) +
    clouds(310, 28, 1) +
    hills(126, "#7f9f5f") +
    ground(128, "#8fae63") +
    goldenDome(70, 168, 30, 40, "#1a4a8f") +
    goldenDome(100, 172, 20, 28, "#c8102e") +
    `<rect x="40" y="168" width="60" height="6" fill="#4a4436"/>` +
    poplar(340, 168, 40) +
    poplar(365, 170, 34) +
    band(190, 20, "#3f7fae"),

  /** 貴族庭園の噴水と並木。ビラ・ツェールクヴァ・ウマーニ。 */
  park:
    sky("#8fc4e8", "#cfe4f0", 130) +
    clouds(90, 28, 1) +
    hills(128, "#7f9f5f") +
    ground(130, "#8fae63") +
    fountainJet(200, 192, 30) +
    poplar(60, 190, 44) +
    poplar(90, 192, 36) +
    poplar(310, 190, 44) +
    poplar(340, 192, 36) +
    `<g>${["#c8102e", "#d4af37", "#7fa8c4"].map((c, i) => `<circle cx="${40 + i * 14}" cy="198" r="4" fill="${c}"/>`).join("")}</g>` +
    `<g>${["#c8102e", "#d4af37", "#7fa8c4"].map((c, i) => `<circle cx="${330 + i * 14}" cy="200" r="4" fill="${c}"/>`).join("")}</g>`,

  /** 移築された茅葺き民家。ペレヤスラウ。 */
  folkmuseum:
    sky("#8fc4e8", "#cfe4f0", 128) +
    clouds(320, 28, 1) +
    hills(126, "#7f9f5f") +
    ground(128, "#8fae63") +
    khata(60, 190, 44, 36) +
    khata(120, 194, 36, 30) +
    khata(300, 188, 46, 38) +
    khata(350, 194, 32, 28) +
    `<rect x="200" y="150" width="4" height="40" fill="#6b5330"/>` +
    `<path d="M188,150h28l-6,-14l-16,0z" fill="#c8a862"/>` +
    `<g stroke="#8a8478" stroke-width="2"><path d="M0,190h400"/></g>`,

  /** 先史時代の環状土器住居。トリピッリャ。 */
  relic:
    sky("#8fc4e8", "#cfe4f0", 128) +
    clouds(90, 28, 1) +
    hills(126, "#c2b26a") +
    ground(128, "#c2b26a") +
    `<ellipse cx="200" cy="196" rx="150" ry="10" fill="#8a6a3a" opacity=".4"/>` +
    `<path d="M60,196a5,7 0 0,1 10,0z" fill="#c8783a"/>` +
    `<path d="M90,198a5,7 0 0,1 10,0z" fill="#c8783a"/>` +
    `<path d="M280,196a5,7 0 0,1 10,0z" fill="#c8783a"/>` +
    `<path d="M320,198a5,7 0 0,1 10,0z" fill="#c8783a"/>` +
    `<path d="M350,196a5,7 0 0,1 10,0z" fill="#c8783a"/>` +
    wheatRows(30, 175, 60, 2, "#d8b34a") +
    wheatRows(300, 175, 70, 2, "#d8b34a") +
    sunflower(340, 172, 5) +
    sunflower(355, 178, 4),

  /** 緑のトンネルと小さな貨物列車。クレヴァニ。 */
  tunnel:
    sky("#8fc4e8", "#cfe4f0", 60) +
    clouds(90, 22, 0.8) +
    ground(60, "#5f8f5a") +
    // 木々のアーチ(太い緑の帯)。頂点は隠れ帯に入るが、
    // フォートレスの城壁と同じく繰り返しの帯なので軽い(docs参照)。
    `<path d="M12,210V90A188,150 0 0,1 388,210" fill="none" stroke="#2f6b3a" stroke-width="46" stroke-linecap="round"/>` +
    `<path d="M12,210V96A182,145 0 0,1 388,210" fill="none" stroke="#4f8f4f" stroke-width="10" stroke-linecap="round" opacity=".6"/>` +
    // 葉叢の房(左右の見える帯に集中させる)
    `<g fill="#3f7a4a">${[[30, 150], [55, 130], [345, 130], [370, 150], [40, 175], [360, 175]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="14"/>`).join("")}</g>` +
    // トンネルの内側(暗がり)
    `<path d="M40,210V150A160,120 0 0,1 360,210z" fill="#12321c"/>` +
    // 奥の出口の明るみ
    `<ellipse cx="200" cy="176" rx="30" ry="14" fill="#cfe4f0" opacity=".55"/>` +
    // 線路と貨物列車(手前・可視域)
    `<rect x="0" y="196" width="400" height="14" fill="#6b5330"/>` +
    `<g fill="#8a6a3a">${Array.from({ length: 10 }, (_, i) => `<rect x="${i * 40}" y="200" width="20" height="4"/>`).join("")}</g>` +
    `<rect x="150" y="178" width="60" height="20" rx="2" fill="#e8443f"/>` +
    `<rect x="156" y="182" width="14" height="10" fill="#bfe0f0"/><rect x="190" y="182" width="14" height="10" fill="#bfe0f0"/>`,

  /** 各共和国様式の集合住宅。スラウーティチ。 */
  planned:
    sky("#8fc4e8", "#cfe4f0", 110) +
    clouds(320, 28, 1) +
    ground(110, "#8fae63") +
    apartmentBlock(30, 190, 50, 80, "#c8a862") +
    apartmentBlock(90, 190, 44, 68, "#7fa8c4") +
    apartmentBlock(150, 190, 46, 76, "#c8783a") +
    apartmentBlock(300, 190, 50, 84, "#8f7ab0") +
    apartmentBlock(360, 190, 40, 60, "#6fae7a") +
    poplar(250, 190, 40) +
    poplar(275, 192, 34),

  /** 装飾的な府主教館。チェルニウツィー。 */
  residence:
    sky("#8fc4e8", "#cfe4f0", 100) +
    clouds(90, 26, 1) +
    ground(100, "#8fae63") +
    `<rect x="60" y="100" width="280" height="90" fill="#e2dccb"/>` +
    // 双塔のドーム。中央の隠れ帯(x151-249)を避けて左右に置く。
    `<path d="M96,100V76a18,18 0 0,1 36,0v24z" fill="#d4af37"/>` +
    `<path d="M268,100V76a18,18 0 0,1 36,0v24z" fill="#d4af37"/>` +
    `<g fill="#4a4a52">${Array.from({ length: 6 }, (_, i) => `<rect x="${80 + i * 42}" y="130" width="16" height="40"/>`).join("")}</g>` +
    `<rect x="60" y="96" width="280" height="6" fill="#8a5a3a"/>` +
    poplar(30, 190, 46) +
    poplar(370, 190, 46),

  /** 見張り塔と葦原。チェルカースィ・ザポリッジャ。 */
  cossack:
    sky("#8fc4e8", "#cfe4f0", 118) +
    clouds(320, 28, 1) +
    ground(118, "#c2b26a") +
    band(160, 50, "#3f7fae") +
    ripples(174, "#bfe8f4") +
    // 見張り塔。中央の隠れ帯(x151-249)を避けて左寄りに置く。
    `<rect x="96" y="70" width="8" height="90" fill="#6b5330"/>` +
    `<rect x="76" y="70" width="48" height="22" fill="#8a6a3a"/>` +
    `<path d="M70,70h60l-8,-14h-44z" fill="#6b5330"/>` +
    `<g stroke="#4a5f3a" stroke-width="1.6"><path d="M20,190v-24M26,190v-28M32,190v-22M300,190v-24M310,190v-28M320,190v-22M340,190v-26M348,190v-22M356,190v-28"/></g>`,

  /** 仮面と緞帳。クロピヴニツィクィイ。 */
  theatre:
    sky("#8fc4e8", "#cfe4f0", 110) +
    clouds(90, 26, 1) +
    ground(110, "#8fae63") +
    `<rect x="80" y="60" width="240" height="70" fill="#e2dccb"/>` +
    `<path d="M80,60h240l-20,-20h-200z" fill="#8a5a3a"/>` +
    `<g fill="#c8102e"><rect x="100" y="80" width="30" height="50"/><rect x="270" y="80" width="30" height="50"/></g>` +
    `<g fill="#4a4a52">${Array.from({ length: 5 }, (_, i) => `<rect x="${150 + i * 22}" y="90" width="12" height="40"/>`).join("")}</g>` +
    poplar(40, 190, 40) +
    poplar(360, 190, 40),

  /** 煙突と線路。クレメンチューク・コロステーニ。 */
  industry:
    sky("#a0a8a8", "#cfd4d0", 100) +
    ground(100, "#9a9484") +
    `<g fill="#8a8478"><rect x="60" y="50" width="18" height="60"/><rect x="120" y="30" width="18" height="80"/><rect x="300" y="46" width="18" height="64"/></g>` +
    `<g fill="#c8bfae" opacity=".6"><ellipse cx="69" cy="42" rx="14" ry="8"/><ellipse cx="129" cy="22" rx="16" ry="9"/><ellipse cx="309" cy="38" rx="14" ry="8"/></g>` +
    `<rect x="0" y="196" width="400" height="14" fill="#6b7060"/>` +
    `<g fill="#4a4a52">${Array.from({ length: 10 }, (_, i) => `<rect x="${i * 40}" y="200" width="20" height="4"/>`).join("")}</g>` +
    band(170, 26, "#3f7fae"),

  /** ロケットの尾翼。ドニプロ。 */
  rocket:
    sky("#5f8fc4", "#cfe4f0", 100) +
    clouds(280, 26, 1) +
    ground(100, "#8fae63") +
    // 中央の隠れ帯を避け、ロケットを左寄りに置く。
    rocket(90, 190, 96) +
    `<g fill="#8a8478"><rect x="40" y="150" width="24" height="40"/><rect x="330" y="150" width="30" height="40"/></g>` +
    band(176, 34, "#3f7fae") +
    ripples(190, "#bfe8f4"),

  /** 噴水と放射状の並木道。ヴィーンヌィツャ・ポルタヴァ。 */
  fountain:
    sky("#8fc4e8", "#cfe4f0", 128) +
    clouds(90, 28, 1) +
    hills(126, "#7f9f5f") +
    ground(128, "#8fae63") +
    fountainJet(200, 194, 40) +
    poplar(60, 192, 44) +
    poplar(90, 194, 36) +
    poplar(120, 196, 30) +
    poplar(280, 196, 30) +
    poplar(310, 194, 36) +
    poplar(340, 192, 44) +
    band(180, 20, "#3f7fae"),
};
