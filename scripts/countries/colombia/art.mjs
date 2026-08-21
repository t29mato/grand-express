/**
 * コロンビア盤の都市イラスト。
 *
 * `COLOMBIA_MARKS` は 24×24 の座標系に描くシンボル、`COLOMBIA_BG` は
 * 400×210 の座標系に描く背景シーン(いずれもSVG断片の文字列)。フランスと
 * 同じく最初から文字列として持ち、動きは含めない。
 *
 * ## この盤面の芯
 *
 * **川がまず道だった国。**アンデスが3本の山脈に分かれて走るため、鉄道は
 * 国を1つに結ぶ幹線にならず、**マグダレナ川へ荷を運ぶ短い枝**として
 * バラバラに敷かれた。だから絵の主役は機関車ではなく、**川と、川に浮かぶもの**
 * ——外輪の蒸気船、積み替えの桟橋、川面に降りる水上機(SCADTAは滑走路が
 * 足りず、ユンカースをマグダレナ川に着水させていた)。
 *
 * ## 描かないもの
 *
 * - 武力紛争は**構造で描く**(軍が退いた土地=誰もいない会場)。武器・暴力は描かない。
 * - アラカタカは実在の生家(博物館)だけ。**小説の図像(黄色い蝶)を持ち込まない。**
 * - 先住民の集団を「顔」で代表させない。**土木(セヌーの水路)・建築・道具**で語る。
 *
 * 色はフランス・オセアニアと揃える。空 #8fc4e8〜、顔 #f6efe2、強調 #f5b31c/
 * #e8443f/#5b8fe8。コロンビアらしさはマグダレナの泥色 #8f7a4e、メデジンとボゴタの
 * レンガ #a85a3a、コーヒー地帯の深緑 #2d6b3f、カリブのターコイズ #57c8c0、
 * グアヒラの砂 #d8a05f で出す。
 */

// ---------------------------------------------------------------------------
// 背景シーンの組み立て部品
// ---------------------------------------------------------------------------

const W = 400;

/** 小数の桁を抑える(SVGを読みやすく保つため)。 */
const r1 = (v) => Math.round(v * 10) / 10;

/** 横帯。 */
function band(y, h, fill) {
  return `<rect x="0" y="${y}" width="${W}" height="${h}" fill="${fill}"/>`;
}

/**
 * 空。`to` は**塗り下ろす深さ**(= 次に来る塗りの開始y)。
 * 水平線がもっと下にあるシーンで既定のままにすると、あいだが横一文字に透ける。
 * 確認は `node scripts/check-city-backgrounds.mjs`(colombia は取り込み後)か、
 * 描いている最中は scratchpad の自前チェックで。
 */
function sky(top, bottom, to = 118) {
  const h = Math.min(84, to);
  return band(0, h, top) + (to > h ? band(h, to - h, bottom) : "");
}

/** 地面。下端まで必ず塗る。 */
function ground(y, fill) {
  return `<rect x="0" y="${y}" width="${W}" height="${210 - y}" fill="${fill}"/>`;
}

/** 接地の影。敷かないと物が浮く。 */
function shade(cx, cy, rx, ry, o = ".2") {
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#000" opacity="${o}"/>`;
}

function sun(cx, cy, r, fill = "#f5b31c") {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>`;
}

function clouds(cx, cy, scale = 1, fill = "#f6efe2", o = ".8") {
  const e = (dx, rx, ry) =>
    `<ellipse cx="${r1(cx + dx * scale)}" cy="${cy}" rx="${r1(rx * scale)}" ry="${r1(ry * scale)}"/>`;
  return `<g opacity="${o}" fill="${fill}">${e(0, 18, 7)}${e(-10, 11, 5.5)}${e(11, 13, 5.5)}</g>`;
}

/** リャノスの巨大な積乱雲。上に膨らむ塔。 */
function thunderhead(cx, base, s = 1, fill = "#f2ede0") {
  return (
    `<g fill="${fill}">` +
    `<ellipse cx="${cx}" cy="${base}" rx="${r1(34 * s)}" ry="${r1(9 * s)}"/>` +
    `<ellipse cx="${r1(cx - 8 * s)}" cy="${r1(base - 12 * s)}" rx="${r1(22 * s)}" ry="${r1(12 * s)}"/>` +
    `<ellipse cx="${r1(cx + 12 * s)}" cy="${r1(base - 18 * s)}" rx="${r1(16 * s)}" ry="${r1(13 * s)}"/>` +
    `<ellipse cx="${r1(cx + 2 * s)}" cy="${r1(base - 30 * s)}" rx="${r1(11 * s)}" ry="${r1(10 * s)}"/>` +
    `</g>`
  );
}

/** 谷にたまる霧の帯。 */
function mist(cx, cy, rx, o = ".6", fill = "#e8eee8") {
  return (
    `<g fill="${fill}" opacity="${o}">` +
    `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="8"/>` +
    `<ellipse cx="${r1(cx + rx * 0.55)}" cy="${r1(cy + 5)}" rx="${r1(rx * 0.6)}" ry="6"/>` +
    `</g>`
  );
}

/** 太平洋岸の雨。画面全体に降る斜線。 */
function rain(o = ".45", c = "#cfe0e8") {
  const p = [];
  for (let i = 0; i < 14; i++) {
    const x = 8 + i * 29 + (i % 3) * 7;
    const y = 4 + (i % 5) * 34;
    p.push(`M${x},${y}l-7,22`);
  }
  return `<g stroke="${c}" stroke-width="2" opacity="${o}" fill="none" stroke-linecap="round"><path d="${p.join("")}"/></g>`;
}

/** 遠景の丘の連なり。 */
function hills(y, fill, count = 4) {
  const parts = [];
  for (let i = 0; i < count; i++) {
    const cx = 40 + (i * W) / count;
    parts.push(`<path d="M${cx - 70},${y}c20,-34 50,-34 70,0z" fill="${fill}"/>`);
  }
  return `<g opacity=".95">${parts.join("")}</g>`;
}

/** 険しい稜線(アンデス)。下へ60まで塗る。 */
function jaggedRidge(y, h, fill, seed = 1) {
  let d = `M0,${y}`;
  for (let i = 0; i < 9; i++) {
    const up = r1(h * (0.45 + ((i * seed) % 5) / 7));
    d += `l22,${-up}l24,${r1(up * 0.72)}`;
  }
  return `<path d="${d}V${y + 60}H0z" fill="${fill}"/>`;
}

/** 雪をかぶった峰(トリマ・シエラネバダ)。 */
function snowPeak(x, base, w, h, rock = "#6b7a80", snow = "#f2f6f8") {
  const hw = r1(w / 2);
  return (
    `<path d="M${r1(x - hw)},${base}L${x},${r1(base - h)}L${r1(x + hw)},${base}z" fill="${rock}"/>` +
    `<path d="M${r1(x - hw * 0.42)},${r1(base - h * 0.58)}L${x},${r1(base - h)}L${r1(x + hw * 0.44)},${r1(base - h * 0.56)}l${r1(-w * 0.1)},${r1(h * 0.1)}l${r1(-w * 0.09)},${r1(-h * 0.06)}l${r1(-w * 0.1)},${r1(h * 0.09)}l${r1(-w * 0.08)},${r1(-h * 0.05)}z" fill="${snow}"/>`
  );
}

/**
 * 川。`y` から下端まで必ず塗る。既定はマグダレナの泥色。
 * 遠いほど濃く、手前ほど明るい。
 */
function river(y, far = "#57482f", mid = "#6f5c3b", near = "#8f7a4e") {
  const h = 210 - y;
  return (
    `<rect x="0" y="${y}" width="${W}" height="${h}" fill="${near}"/>` +
    `<rect x="0" y="${y}" width="${W}" height="${r1(h * 0.34)}" fill="${far}"/>` +
    `<rect x="0" y="${r1(y + h * 0.34)}" width="${W}" height="${r1(h * 0.3)}" fill="${mid}"/>`
  );
}

/** 海。`y` から下端まで必ず塗る。 */
function sea(y, deep = "#1f5f8f", mid = "#2f7fa8", near = "#4aa8c0") {
  const h = 210 - y;
  return (
    `<rect x="0" y="${y}" width="${W}" height="${h}" fill="${near}"/>` +
    `<rect x="0" y="${y}" width="${W}" height="${r1(h * 0.36)}" fill="${deep}"/>` +
    `<rect x="0" y="${r1(y + h * 0.36)}" width="${W}" height="${r1(h * 0.3)}" fill="${mid}"/>`
  );
}

/** 水面のさざ波。川ならクリーム、海なら水色を渡す。 */
function ripple(y, color = "#d8c8a0", o = ".5") {
  return (
    `<g stroke="${color}" stroke-width="2" opacity="${o}" fill="none" stroke-linecap="round">` +
    `<path d="M16,${y}q9,-3 18,0M112,${r1(y + 10)}q9,-3 18,0M256,${r1(y + 4)}q9,-3 18,0` +
    `M332,${r1(y + 16)}q9,-3 18,0M56,${r1(y + 22)}q11,-4 22,0M300,${r1(y + 30)}q11,-4 22,0` +
    `M150,${r1(y + 34)}q11,-4 22,0M28,${r1(y + 44)}q13,-4 26,0M344,${r1(y + 50)}q13,-4 26,0"/></g>`
  );
}

/**
 * マグダレナの外輪蒸気船。**この盤面の「機関車」。**
 * 平底の白い船体に2層の甲板、黒い煙突、艫の外輪。`wl` は喫水線のy。
 */
function paddleSteamer(x, wl, s = 1) {
  const p = [
    // 船体(平底。左が舳先)
    `<path d="M${r1(x - 52 * s)},${r1(wl - 10 * s)}h${r1(104 * s)}v${r1(10 * s)}h${r1(-98 * s)}q${r1(-6 * s)},${r1(-4 * s)} ${r1(-6 * s)},${r1(-10 * s)}z" fill="#efe8d8"/>`,
    `<rect x="${r1(x - 52 * s)}" y="${r1(wl - 4 * s)}" width="${r1(104 * s)}" height="${r1(4 * s)}" fill="#8a4a30"/>`,
    // 上甲板と屋根
    `<rect x="${r1(x - 42 * s)}" y="${r1(wl - 24 * s)}" width="${r1(80 * s)}" height="${r1(14 * s)}" fill="#f6f0e0"/>`,
    `<rect x="${r1(x - 46 * s)}" y="${r1(wl - 27 * s)}" width="${r1(88 * s)}" height="${r1(3 * s)}" fill="#b0543a"/>`,
    // 甲板の柱
    `<g stroke="#b8a882" stroke-width="${r1(1.6 * s)}" fill="none"><path d="${[-36, -22, -8, 6, 20, 32]
      .map((d) => `M${r1(x + d * s)},${r1(wl - 24 * s)}v${r1(14 * s)}`)
      .join("")}"/></g>`,
    // 窓
    `<g fill="#5f7f96">${[-34, -20, -6, 8, 22]
      .map((d) => `<rect x="${r1(x + d * s)}" y="${r1(wl - 21 * s)}" width="${r1(7 * s)}" height="${r1(7 * s)}"/>`)
      .join("")}</g>`,
    // 煙突と煙
    `<rect x="${r1(x - 20 * s)}" y="${r1(wl - 44 * s)}" width="${r1(7 * s)}" height="${r1(18 * s)}" fill="#33302c"/>`,
    `<rect x="${r1(x - 21 * s)}" y="${r1(wl - 46 * s)}" width="${r1(9 * s)}" height="${r1(3 * s)}" fill="#c8452f"/>`,
    plume(r1(x - 16 * s), r1(wl - 46 * s), r1(20 * s), 0.7 * s, "#8a857a", ".7"),
    // 艫の外輪(輪郭と輻)
    `<circle cx="${r1(x + 46 * s)}" cy="${r1(wl - 4 * s)}" r="${r1(13 * s)}" fill="#8a4a30"/>`,
    `<circle cx="${r1(x + 46 * s)}" cy="${r1(wl - 4 * s)}" r="${r1(13 * s)}" fill="none" stroke="#5f3320" stroke-width="${r1(2 * s)}"/>`,
    `<g stroke="#5f3320" stroke-width="${r1(1.6 * s)}" fill="none"><path d="M${r1(x + 33 * s)},${r1(wl - 4 * s)}h${r1(26 * s)}M${r1(x + 46 * s)},${r1(wl - 17 * s)}v${r1(26 * s)}M${r1(x + 37 * s)},${r1(wl - 13 * s)}l${r1(18 * s)},${r1(18 * s)}M${r1(x + 55 * s)},${r1(wl - 13 * s)}l${r1(-18 * s)},${r1(18 * s)}"/></g>`,
    // 喫水の白い引き波
    `<path d="M${r1(x - 56 * s)},${wl}q${r1(10 * s)},${r1(3 * s)} ${r1(20 * s)},0M${r1(x + 40 * s)},${r1(wl + 2 * s)}q${r1(12 * s)},${r1(4 * s)} ${r1(24 * s)},0" stroke="#d8c8a0" stroke-width="${r1(2 * s)}" fill="none" opacity=".8"/>`,
  ];
  return p.join("");
}

/**
 * ユンカース型の水上機(SCADTA)。**川が道であり、滑走路でもあった。**
 * 波板の胴体、低い主翼、2本のフロート。左向き。
 */
function floatplane(x, y, s = 1) {
  return (
    // フロートと支柱
    `<g fill="#8a8f92"><path d="M${r1(x - 26 * s)},${r1(y + 14 * s)}h${r1(30 * s)}l${r1(4 * s)},${r1(-4 * s)}h${r1(-30 * s)}q${r1(-4 * s)},0 ${r1(-4 * s)},${r1(4 * s)}z"/><path d="M${r1(x + 4 * s)},${r1(y + 14 * s)}h${r1(28 * s)}l${r1(4 * s)},${r1(-4 * s)}h${r1(-28 * s)}q${r1(-4 * s)},0 ${r1(-4 * s)},${r1(4 * s)}z"/></g>` +
    `<g stroke="#5f6266" stroke-width="${r1(1.6 * s)}" fill="none"><path d="M${r1(x - 14 * s)},${r1(y + 10 * s)}v${r1(-6 * s)}M${r1(x - 4 * s)},${r1(y + 10 * s)}v${r1(-6 * s)}M${r1(x + 14 * s)},${r1(y + 10 * s)}v${r1(-6 * s)}M${r1(x + 24 * s)},${r1(y + 10 * s)}v${r1(-6 * s)}"/></g>` +
    // 胴体(左が機首)
    `<path d="M${r1(x - 30 * s)},${y}q${r1(3 * s)},${r1(-5 * s)} ${r1(12 * s)},${r1(-5 * s)}h${r1(44 * s)}l${r1(8 * s)},${r1(-6 * s)}v${r1(9 * s)}q${r1(-4 * s)},${r1(2 * s)} ${r1(-10 * s)},${r1(2 * s)}h${r1(-44 * s)}q${r1(-8 * s)},0 ${r1(-10 * s)},0z" fill="#d8d4c4"/>` +
    // 波板の筋
    `<g stroke="#a8a494" stroke-width="${r1(0.8 * s)}" opacity=".8" fill="none"><path d="M${r1(x - 22 * s)},${r1(y - 4 * s)}h${r1(44 * s)}M${r1(x - 24 * s)},${r1(y - 1 * s)}h${r1(48 * s)}"/></g>` +
    // 操縦席と主翼
    `<rect x="${r1(x - 20 * s)}" y="${r1(y - 8 * s)}" width="${r1(9 * s)}" height="${r1(4 * s)}" fill="#3f4a56"/>` +
    `<path d="M${r1(x - 16 * s)},${r1(y - 1 * s)}l${r1(38 * s)},${r1(4 * s)}l0,${r1(3 * s)}l${r1(-38 * s)},${r1(-3 * s)}z" fill="#c8c4b4"/>` +
    `<path d="M${r1(x - 16 * s)},${r1(y - 1 * s)}l${r1(-22 * s)},${r1(5 * s)}l0,${r1(3 * s)}l${r1(22 * s)},${r1(-4 * s)}z" fill="#b8b4a4"/>` +
    // 尾翼とプロペラ
    `<path d="M${r1(x + 26 * s)},${r1(y - 11 * s)}l${r1(6 * s)},${r1(-6 * s)}l${r1(2 * s)},${r1(6 * s)}z" fill="#c8452f"/>` +
    `<path d="M${r1(x - 31 * s)},${r1(y - 9 * s)}v${r1(12 * s)}" stroke="#6b6862" stroke-width="${r1(1.8 * s)}" fill="none"/>`
  );
}

/** チャンパン・ピラグア(川の丸木舟)。 */
function canoa(x, y, s = 1, hull = "#6b5330") {
  return (
    `<path d="M${r1(x - 22 * s)},${y}q${r1(22 * s)},${r1(8 * s)} ${r1(44 * s)},0q${r1(-22 * s)},${r1(-4 * s)} ${r1(-44 * s)},0z" fill="${hull}"/>` +
    `<path d="M${r1(x - 17 * s)},${r1(y + 1 * s)}q${r1(17 * s)},${r1(5 * s)} ${r1(34 * s)},0" stroke="#4a3a24" stroke-width="${r1(1.4 * s)}" fill="none"/>`
  );
}

/** 小型のランチャ(船外機の艀)。 */
function skiff(x, y, s = 1, hull = "#3f6f9a") {
  return (
    `<path d="M${r1(x - 20 * s)},${y}q${r1(20 * s)},${r1(10 * s)} ${r1(40 * s)},0q${r1(-20 * s)},${r1(-4 * s)} ${r1(-40 * s)},0z" fill="${hull}"/>` +
    `<path d="M${r1(x - 14 * s)},${r1(y - 1 * s)}h${r1(28 * s)}v${r1(2 * s)}h${r1(-28 * s)}z" fill="#e8e0cc"/>` +
    `<rect x="${r1(x + 10 * s)}" y="${r1(y - 7 * s)}" width="${r1(6 * s)}" height="${r1(7 * s)}" fill="#4a4438"/>`
  );
}

/** 貨物船(外洋)。 */
function freighter(x, y, s = 1, hull = "#8a4a30", house = "#e0dccc") {
  const p = [
    `<path d="M${r1(x - 60 * s)},${r1(y - 12 * s)}h${r1(120 * s)}l${r1(-8 * s)},${r1(12 * s)}h${r1(-104 * s)}z" fill="${hull}"/>`,
    `<rect x="${r1(x - 60 * s)}" y="${r1(y - 16 * s)}" width="${r1(120 * s)}" height="${r1(4 * s)}" fill="#5f3320"/>`,
    `<rect x="${r1(x + 20 * s)}" y="${r1(y - 32 * s)}" width="${r1(28 * s)}" height="${r1(16 * s)}" fill="${house}"/>`,
    `<g fill="#3f4a56">${[0, 1, 2, 3]
      .map((i) => `<rect x="${r1(x + 23 * s + i * 6 * s)}" y="${r1(y - 28 * s)}" width="${r1(4 * s)}" height="${r1(5 * s)}"/>`)
      .join("")}</g>`,
    `<rect x="${r1(x + 30 * s)}" y="${r1(y - 42 * s)}" width="${r1(8 * s)}" height="${r1(10 * s)}" fill="#c8452f"/>`,
    `<rect x="${r1(x + 30 * s)}" y="${r1(y - 42 * s)}" width="${r1(8 * s)}" height="${r1(3 * s)}" fill="#2f2f2f"/>`,
  ];
  const cols = [
    ["#3f7f9a", -54, -24],
    ["#c8a13f", -38, -24],
    ["#4f9a5f", -22, -24],
    ["#c8452f", -38, -32],
  ];
  for (const [c, dx, dy] of cols) {
    p.push(`<rect x="${r1(x + dx * s)}" y="${r1(y + dy * s)}" width="${r1(15 * s)}" height="${r1(8 * s)}" fill="${c}"/>`);
  }
  return p.join("");
}

/** 桟橋。杭と板。 */
function jetty(x0, x1, deckY, waterY, deck = "#8a7454") {
  const p = [`<rect x="${x0}" y="${deckY}" width="${r1(x1 - x0)}" height="5" fill="${deck}"/>`];
  p.push(`<rect x="${x0}" y="${r1(deckY + 5)}" width="${r1(x1 - x0)}" height="2" fill="#5f4c33"/>`);
  for (let x = x0 + 6; x < x1; x += 22) {
    p.push(`<rect x="${r1(x)}" y="${r1(deckY + 5)}" width="4" height="${r1(waterY - deckY + 6)}" fill="#5f4c33"/>`);
  }
  return p.join("");
}

/** 川港の石造りの倉庫(ボデガ)。アーチの荷口が並ぶ。 */
function warehouse(x, base, w, h, wall = "#c8b494", roof = "#8a4a30") {
  const p = [
    `<rect x="${x}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${wall}"/>`,
    `<path d="M${r1(x - 5)},${r1(base - h)}h${w + 10}l-8,-11h${r1(-w + 6)}z" fill="${roof}"/>`,
    `<rect x="${x}" y="${r1(base - h)}" width="${w}" height="3" fill="#a89272"/>`,
  ];
  const n = Math.max(2, Math.floor(w / 30));
  for (let i = 0; i < n; i++) {
    const dx = r1(x + 8 + (i * (w - 16 - 14)) / Math.max(1, n - 1));
    p.push(`<path d="M${dx},${base}v${r1(-h * 0.52)}a7,7 0 0 1 14,0v${r1(h * 0.52)}z" fill="#6b5638"/>`);
  }
  return p.join("");
}

/** トタン屋根の家。低地の町並みの基本形。 */
function tinHouse(x, top, w, base, wall = "#e8e0cc", roof = "#b04a3a") {
  const h = base - top;
  const cx = r1(x + w / 2);
  const parts = [
    `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="${wall}"/>`,
    `<path d="M${x - 6},${top}L${cx},${r1(top - h * 0.4)}L${x + w + 6},${top}z" fill="${roof}"/>`,
    `<rect x="${x - 6}" y="${top}" width="${w + 12}" height="3" fill="#8a3a2c"/>`,
  ];
  const cols = Math.max(1, Math.floor(w / 22));
  for (let i = 0; i < cols; i++) {
    const wx = r1(x + 6 + (i * (w - 14)) / Math.max(1, cols));
    parts.push(`<rect x="${wx}" y="${r1(top + h * 0.28)}" width="9" height="10" fill="#5f7f96"/>`);
  }
  parts.push(`<rect x="${r1(cx - 5)}" y="${r1(base - h * 0.44)}" width="10" height="${r1(h * 0.44)}" fill="#6b5330"/>`);
  return parts.join("");
}

/** 高床の家。増水があたりまえの土地の形。 */
function stiltHouse(x, floorY, w, h, roof = "#8a7a4a", wall = "#d8cbb0") {
  const cx = r1(x + w / 2);
  const p = [
    `<g fill="#5a4630"><rect x="${r1(x + 2)}" y="${floorY}" width="4" height="26"/><rect x="${r1(cx - 2)}" y="${floorY}" width="4" height="26"/><rect x="${r1(x + w - 6)}" y="${floorY}" width="4" height="26"/></g>`,
    `<rect x="${r1(x - 2)}" y="${r1(floorY - 2)}" width="${w + 4}" height="4" fill="#6b5330"/>`,
    `<rect x="${x}" y="${r1(floorY - h)}" width="${w}" height="${h}" fill="${wall}"/>`,
    `<path d="M${r1(x - 8)},${r1(floorY - h)}L${cx},${r1(floorY - h - h * 0.72)}L${r1(x + w + 8)},${r1(floorY - h)}z" fill="${roof}"/>`,
    `<rect x="${r1(cx - 6)}" y="${r1(floorY - h * 0.72)}" width="12" height="${r1(h * 0.72)}" fill="#6b5330"/>`,
  ];
  return p.join("");
}

/** 白壁とテハ(素焼き瓦)の植民地時代の家。 */
function colonialHouse(x, base, w, h, wall = "#f2ece0", zocalo = "#4f7f6a") {
  const p = [
    `<rect x="${x}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${wall}"/>`,
    `<rect x="${x}" y="${r1(base - h * 0.3)}" width="${w}" height="${r1(h * 0.3)}" fill="${zocalo}" opacity=".85"/>`,
    `<path d="M${r1(x - 5)},${r1(base - h)}h${w + 10}l-7,-10h${r1(-w + 4)}z" fill="#a85a3a"/>`,
    `<g stroke="#8a4a30" stroke-width="1.4" opacity=".8" fill="none"><path d="${[0.2, 0.45, 0.7]
      .map((f) => `M${r1(x + w * f)},${r1(base - h - 9)}l4,9`)
      .join("")}"/></g>`,
  ];
  const n = Math.max(1, Math.floor(w / 26));
  for (let i = 0; i < n; i++) {
    const wx = r1(x + 7 + (i * (w - 16)) / Math.max(1, n));
    p.push(
      `<rect x="${wx}" y="${r1(base - h * 0.72)}" width="10" height="13" fill="#5a4630"/>` +
        `<rect x="${r1(wx - 1.6)}" y="${r1(base - h * 0.72 - 2)}" width="13.2" height="2.4" fill="#6b8a5a"/>`,
    );
  }
  return p.join("");
}

/** カルタヘナの木のバルコニーの家。壁は色鮮やかに。 */
function balconyHouse(x, base, w, h, wall = "#c8a13f", balc = "#6b4a2f") {
  const by = r1(base - h * 0.52);
  const p = [
    `<rect x="${x}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${wall}"/>`,
    `<path d="M${r1(x - 4)},${r1(base - h)}h${w + 8}l-6,-9h${r1(-w + 4)}z" fill="#a85a3a"/>`,
    `<rect x="${r1(x + 3)}" y="${by}" width="${w - 6}" height="4" fill="${balc}"/>`,
    `<g stroke="${balc}" stroke-width="1.6" fill="none"><path d="${[6, 12, 18, 24, 30]
      .filter((d) => d < w - 5)
      .map((d) => `M${r1(x + d)},${by}v-8`)
      .join("")}"/></g>`,
    `<rect x="${r1(x + 3)}" y="${r1(by - 9)}" width="${w - 6}" height="2" fill="${balc}"/>`,
    `<rect x="${r1(x + w / 2 - 5)}" y="${r1(by - h * 0.34)}" width="10" height="${r1(h * 0.34 - 9)}" fill="#4a3a26"/>`,
    `<rect x="${r1(x + w / 2 - 5)}" y="${r1(base - h * 0.4)}" width="10" height="${r1(h * 0.4)}" fill="#4a3a26"/>`,
    // ブーゲンビリア
    `<g fill="#d84a7f" opacity=".9"><circle cx="${r1(x + 6)}" cy="${r1(by - 3)}" r="3.4"/><circle cx="${r1(x + 11)}" cy="${r1(by + 1)}" r="2.6"/><circle cx="${r1(x + 3)}" cy="${r1(by + 3)}" r="2.2"/></g>`,
  ];
  return p.join("");
}

/** レンガ積みの家(ボゴタ・メデジン)。 */
function brickHouse(x, base, w, h, tone = "#a85a3a") {
  const p = [
    `<rect x="${x}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${tone}"/>`,
    `<rect x="${x}" y="${r1(base - h)}" width="${w}" height="3" fill="#8a4a30"/>`,
  ];
  const cols = Math.max(1, Math.floor(w / 14));
  const rows = Math.max(1, Math.floor(h / 16));
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      p.push(
        `<rect x="${r1(x + 4 + (i * (w - 8)) / cols)}" y="${r1(base - h + 7 + (j * (h - 10)) / rows)}" width="6" height="8" fill="#f0d8a8" opacity=".9"/>`,
      );
    }
  }
  return p.join("");
}

/** 都市の高層棟。 */
function towerBlock(x, base, w, h, tone = "#d8d4c8") {
  const p = [
    `<rect x="${x}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${tone}"/>`,
    `<rect x="${x}" y="${r1(base - h)}" width="${w}" height="3" fill="#8a8a7f"/>`,
  ];
  const cols = Math.max(2, Math.floor(w / 10));
  const rows = Math.max(3, Math.floor(h / 14));
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      p.push(
        `<rect x="${r1(x + 3 + (i * (w - 6)) / cols)}" y="${r1(base - h + 6 + (j * (h - 10)) / rows)}" width="4" height="6" fill="#5f7f96"/>`,
      );
    }
  }
  return p.join("");
}

/** 白い教会。植民地の町でいちばん高い建物。 */
function church(x, base, w, h) {
  const tw = r1(w * 0.34);
  return (
    `<rect x="${x}" y="${r1(base - h * 0.56)}" width="${w}" height="${r1(h * 0.56)}" fill="#f2ece0"/>` +
    `<path d="M${r1(x - 4)},${r1(base - h * 0.56)}h${w + 8}l-8,-11h${r1(-w + 8)}z" fill="#a85a3a"/>` +
    `<rect x="${r1(x + w * 0.1)}" y="${r1(base - h)}" width="${tw}" height="${h}" fill="#f6f2e8"/>` +
    `<path d="M${r1(x + w * 0.1 - 3)},${r1(base - h)}L${r1(x + w * 0.1 + tw / 2)},${r1(base - h - 18)}L${r1(x + w * 0.1 + tw + 3)},${r1(base - h)}z" fill="#a85a3a"/>` +
    `<path d="M${r1(x + w * 0.1 + tw / 2)},${r1(base - h - 26)}v9M${r1(x + w * 0.1 + tw / 2 - 3.4)},${r1(base - h - 22)}h6.8" stroke="#7f8890" stroke-width="1.8" fill="none"/>` +
    `<g fill="#5f7f96"><rect x="${r1(x + w * 0.1 + tw / 2 - 3)}" y="${r1(base - h + 10)}" width="6" height="8"/>` +
    `<rect x="${r1(x + w * 0.56)}" y="${r1(base - h * 0.44)}" width="8" height="11" rx="4"/>` +
    `<rect x="${r1(x + w * 0.78)}" y="${r1(base - h * 0.44)}" width="8" height="11" rx="4"/></g>` +
    `<rect x="${r1(x + w * 0.3)}" y="${r1(base - h * 0.34)}" width="11" height="${r1(h * 0.34)}" fill="#6b5330"/>`
  );
}

/** キンディオのワックスパーム。**世界一高いヤシ。**細く長い幹に小さな冠。 */
function waxPalm(x, base, h) {
  const topY = r1(base - h);
  const p = [
    `<path d="M${r1(x - 1.6)},${base}L${r1(x - 1)},${topY}h2L${r1(x + 1.6)},${base}z" fill="#c8c2b0"/>`,
    `<g stroke="#a8a290" stroke-width="0.9" opacity=".8" fill="none"><path d="${[0.25, 0.45, 0.65, 0.82]
      .map((f) => `M${r1(x - 1.4)},${r1(base - h * f)}h2.8`)
      .join("")}"/></g>`,
  ];
  for (const [dx, dy] of [
    [-9, -2],
    [-6, -6],
    [0, -8],
    [6, -6],
    [9, -2],
  ]) {
    p.push(
      `<path d="M${x},${topY}q${r1(dx * 0.5)},${r1(dy - 3)} ${dx},${dy}" stroke="#3f8f52" stroke-width="2.2" stroke-linecap="round" fill="none"/>`,
    );
  }
  return p.join("");
}

/** 海辺のヤシ。 */
function palm(x, base, h, lean = 0, frond = "#2f7f4a", trunk = "#7a6247") {
  const topX = r1(x + lean);
  const topY = r1(base - h);
  const tw = r1(h * 0.05 + 1.2);
  const parts = [
    `<path d="M${r1(x - tw)},${base}q${r1(lean * 0.35)},${r1(-h * 0.55)} ${r1(lean + tw * 0.3)},${-h}h${r1(tw * 1.5)}q${r1(-lean * 0.3)},${r1(h * 0.5)} ${r1(-lean + tw * 1.2)},${h}z" fill="${trunk}"/>`,
  ];
  const L = r1(h * 0.52);
  const leaves = [
    [-1, -0.3],
    [-0.88, 0.2],
    [-0.46, 0.5],
    [0.46, 0.5],
    [0.88, 0.2],
    [1, -0.3],
  ];
  for (const [dx, dy] of leaves) {
    const ex = r1(topX + dx * L);
    const ey = r1(topY + dy * L * 0.8);
    const c1x = r1(topX + dx * L * 0.55);
    const c1y = r1(topY + dy * L * 0.5 - L * 0.34);
    const c2x = r1(topX + dx * L * 0.5);
    const c2y = r1(topY + dy * L * 0.5 + L * 0.14);
    parts.push(`<path d="M${topX},${topY}Q${c1x},${c1y} ${ex},${ey}Q${c2x},${c2y} ${topX},${topY}z" fill="${frond}"/>`);
  }
  return parts.join("");
}

/** マンゴー・サマンなど、丸く広がる樹。 */
function broadTree(x, base, r, crown = "#2d6b3f", trunk = "#5a4630") {
  return (
    `<rect x="${r1(x - r * 0.13)}" y="${r1(base - r * 1.1)}" width="${r1(r * 0.26)}" height="${r1(r * 1.1)}" fill="${trunk}"/>` +
    `<ellipse cx="${x}" cy="${r1(base - r * 1.5)}" rx="${r}" ry="${r1(r * 0.72)}" fill="${crown}"/>` +
    `<ellipse cx="${r1(x - r * 0.5)}" cy="${r1(base - r * 1.2)}" rx="${r1(r * 0.55)}" ry="${r1(r * 0.42)}" fill="${crown}"/>` +
    `<ellipse cx="${r1(x + r * 0.52)}" cy="${r1(base - r * 1.24)}" rx="${r1(r * 0.5)}" ry="${r1(r * 0.4)}" fill="${crown}"/>`
  );
}

/** 密林の帯。上端がこぶになった濃い緑。 */
function jungleBand(y, h = 16, fill = "#265f3c") {
  let d = `M0,${y}`;
  for (let i = 0; i < 13; i++) d += `q16,-${h} 32,0`;
  return `<path d="${d}v${h + 10}H0z" fill="${fill}"/>`;
}

/** バナナの株。弧を描く大きな葉。 */
function banana(x, base, s = 1, leaf = "#3f8f52") {
  const p = [`<path d="M${r1(x - 1.6 * s)},${base}v${r1(-13 * s)}h${r1(3.2 * s)}v${r1(13 * s)}z" fill="#8a9a4a"/>`];
  for (const [dx, dy, lw] of [
    [-11, -8, 4],
    [-7, -13, 4],
    [0, -15, 4],
    [7, -13, 4],
    [11, -8, 4],
  ]) {
    p.push(
      `<path d="M${x},${r1(base - 13 * s)}q${r1(dx * 0.5 * s)},${r1(dy * s)} ${r1(dx * s)},${r1((dy + 4) * s)}q${r1(2 * s)},${r1(2 * s)} ${r1(lw * 0.5 * s)},${r1(1 * s)}q${r1(-dx * 0.4 * s)},${r1(-dy * 0.7 * s)} ${r1(-dx * s + lw * 0.4 * s)},${r1(-dy * s - 3 * s)}z" fill="${leaf}"/>`,
    );
  }
  return p.join("");
}

/** コーヒーの畝。斜面に沿う低木の列。 */
function coffeeRows(x0, x1, y, rows = 3, drop = 10, fill = "#2d6b3f") {
  const p = [];
  for (let j = 0; j < rows; j++) {
    const yy = r1(y + j * drop);
    const bumps = [];
    for (let x = x0; x < x1; x += 13) {
      bumps.push(`<ellipse cx="${r1(x)}" cy="${r1(yy + (x % 7) * 0.4)}" rx="6.4" ry="5"/>`);
    }
    p.push(`<g fill="${fill}" opacity="${j === 0 ? ".85" : "1"}">${bumps.join("")}</g>`);
  }
  return p.join("");
}

/** 柱サボテン(タタコア・グアヒラ)。 */
function cactus(x, base, h, fill = "#4f8048") {
  return (
    `<rect x="${r1(x - 3)}" y="${r1(base - h)}" width="6" height="${h}" rx="3" fill="${fill}"/>` +
    `<path d="M${r1(x - 3)},${r1(base - h * 0.55)}q-7,-1 -7,-8v-6" stroke="${fill}" stroke-width="5" fill="none" stroke-linecap="round"/>` +
    `<path d="M${r1(x + 3)},${r1(base - h * 0.4)}q7,-1 7,-9v-4" stroke="${fill}" stroke-width="5" fill="none" stroke-linecap="round"/>` +
    `<g stroke="#3a6b38" stroke-width="0.9" opacity=".8" fill="none"><path d="M${x},${base}v${-h + 3}M${r1(x - 10)},${r1(base - h * 0.55 - 8)}v-5M${r1(x + 10)},${r1(base - h * 0.4 - 9)}v-3"/></g>`
  );
}

/** こぶ牛(セブー)。カリブ平原の牧畜。 */
function zebu(x, base, s = 1, tone = "#e8e0d0") {
  return (
    `<g fill="${tone}">` +
    `<ellipse cx="${x}" cy="${r1(base - 10 * s)}" rx="${r1(13 * s)}" ry="${r1(7 * s)}"/>` +
    `<path d="M${r1(x - 6 * s)},${r1(base - 15 * s)}q${r1(4 * s)},${r1(-5 * s)} ${r1(8 * s)},0z"/>` +
    `<rect x="${r1(x - 15 * s)}" y="${r1(base - 15 * s)}" width="${r1(6 * s)}" height="${r1(9 * s)}" rx="${r1(2.4 * s)}"/>` +
    `</g>` +
    `<g fill="${tone}"><rect x="${r1(x - 10 * s)}" y="${r1(base - 6 * s)}" width="${r1(2.6 * s)}" height="${r1(6 * s)}"/><rect x="${r1(x - 4 * s)}" y="${r1(base - 6 * s)}" width="${r1(2.6 * s)}" height="${r1(6 * s)}"/><rect x="${r1(x + 3 * s)}" y="${r1(base - 6 * s)}" width="${r1(2.6 * s)}" height="${r1(6 * s)}"/><rect x="${r1(x + 8 * s)}" y="${r1(base - 6 * s)}" width="${r1(2.6 * s)}" height="${r1(6 * s)}"/></g>` +
    `<path d="M${r1(x - 14 * s)},${r1(base - 14 * s)}q${r1(-3 * s)},${r1(-2 * s)} ${r1(-2 * s)},${r1(-4 * s)}" stroke="#b8b0a0" stroke-width="${r1(1.6 * s)}" fill="none"/>` +
    `<ellipse cx="${r1(x - 16 * s)}" cy="${r1(base - 11 * s)}" rx="${r1(2.6 * s)}" ry="${r1(1.4 * s)}" fill="#b8b0a0"/>` +
    `<path d="M${r1(x + 12 * s)},${r1(base - 14 * s)}q${r1(3 * s)},${r1(4 * s)} ${r1(1 * s)},${r1(9 * s)}" stroke="${tone}" stroke-width="${r1(1.4 * s)}" fill="none"/>`
  );
}

/** 荷を積んだ騾馬。オンダの積み替え、コーヒーの運び出し。 */
function mule(x, base, s = 1, tone = "#7a6a58") {
  return (
    `<g fill="${tone}">` +
    `<ellipse cx="${x}" cy="${r1(base - 11 * s)}" rx="${r1(11 * s)}" ry="${r1(6 * s)}"/>` +
    `<rect x="${r1(x - 14 * s)}" y="${r1(base - 18 * s)}" width="${r1(5 * s)}" height="${r1(10 * s)}" rx="${r1(2 * s)}"/>` +
    `<rect x="${r1(x - 17 * s)}" y="${r1(base - 20 * s)}" width="${r1(7 * s)}" height="${r1(4 * s)}" rx="${r1(2 * s)}"/>` +
    `</g>` +
    `<g fill="${tone}"><rect x="${r1(x - 8 * s)}" y="${r1(base - 6 * s)}" width="${r1(2.4 * s)}" height="${r1(6 * s)}"/><rect x="${r1(x - 3 * s)}" y="${r1(base - 6 * s)}" width="${r1(2.4 * s)}" height="${r1(6 * s)}"/><rect x="${r1(x + 3 * s)}" y="${r1(base - 6 * s)}" width="${r1(2.4 * s)}" height="${r1(6 * s)}"/><rect x="${r1(x + 7 * s)}" y="${r1(base - 6 * s)}" width="${r1(2.4 * s)}" height="${r1(6 * s)}"/></g>` +
    `<g stroke="${tone}" stroke-width="${r1(1.6 * s)}" stroke-linecap="round" fill="none"><path d="M${r1(x - 15 * s)},${r1(base - 21 * s)}l${r1(-2 * s)},${r1(-4 * s)}M${r1(x - 12 * s)},${r1(base - 21 * s)}l${r1(1 * s)},${r1(-4 * s)}"/></g>` +
    `<rect x="${r1(x - 5 * s)}" y="${r1(base - 20 * s)}" width="${r1(11 * s)}" height="${r1(7 * s)}" rx="${r1(2 * s)}" fill="#b08a4f"/>` +
    `<path d="M${r1(x - 5 * s)},${r1(base - 16.5 * s)}h${r1(11 * s)}" stroke="#8a6b3a" stroke-width="${r1(1.2 * s)}"/>`
  );
}

/** コーヒーの麻袋。 */
function sack(x, base, s = 1, fill = "#c8a86a") {
  return (
    `<path d="M${r1(x - 6 * s)},${base}v${r1(-11 * s)}q0,${r1(-3 * s)} 3,${r1(-3 * s)}h${r1(6 * s)}q3,0 3,${r1(3 * s)}v${r1(11 * s)}z" fill="${fill}"/>` +
    `<path d="M${r1(x - 3 * s)},${r1(base - 14 * s)}q${r1(3 * s)},${r1(-3 * s)} ${r1(6 * s)},0" stroke="#8a6b3a" stroke-width="${r1(1.6 * s)}" fill="none"/>` +
    `<path d="M${r1(x - 6 * s)},${r1(base - 6 * s)}h${r1(12 * s)}" stroke="#a8884a" stroke-width="${r1(1 * s)}" opacity=".8"/>`
  );
}

/** 木箱。 */
function crate(x, base, w = 16, h = 12, fill = "#b08a4f") {
  return (
    `<rect x="${x}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${fill}"/>` +
    `<g stroke="#7f6234" stroke-width="1.6" fill="none"><path d="M${x},${r1(base - h)}l${w},${h}M${r1(x + w)},${r1(base - h)}l${-w},${h}"/></g>` +
    `<rect x="${x}" y="${r1(base - h)}" width="${w}" height="2.4" fill="#8a6b3a"/>`
  );
}

/** ドラム缶。 */
function drum(x, base, s = 1, fill = "#4f7f6a") {
  return (
    `<rect x="${r1(x - 6 * s)}" y="${r1(base - 16 * s)}" width="${r1(12 * s)}" height="${r1(16 * s)}" rx="${r1(1.6 * s)}" fill="${fill}"/>` +
    `<ellipse cx="${x}" cy="${r1(base - 16 * s)}" rx="${r1(6 * s)}" ry="${r1(2 * s)}" fill="#e0dccc" opacity=".55"/>` +
    `<g stroke="#2f2f2a" stroke-width="${r1(1.2 * s)}" opacity=".55" fill="none"><path d="M${r1(x - 6 * s)},${r1(base - 11 * s)}h${r1(12 * s)}M${r1(x - 6 * s)},${r1(base - 5 * s)}h${r1(12 * s)}"/></g>`
  );
}

/** 石油のポンプジャック。 */
function pumpjack(x, base, s = 1, c = "#5a5a52") {
  return (
    `<path d="M${r1(x - 10 * s)},${base}L${x},${r1(base - 22 * s)}L${r1(x + 10 * s)},${base}z" fill="none" stroke="${c}" stroke-width="${r1(2.6 * s)}"/>` +
    `<path d="M${r1(x - 16 * s)},${r1(base - 24 * s)}L${r1(x + 14 * s)},${r1(base - 20 * s)}" stroke="${c}" stroke-width="${r1(3 * s)}" stroke-linecap="round"/>` +
    `<path d="M${r1(x - 16 * s)},${r1(base - 24 * s)}q${r1(-5 * s)},${r1(1 * s)} ${r1(-5 * s)},${r1(6 * s)}v${r1(3 * s)}" stroke="${c}" stroke-width="${r1(2.6 * s)}" fill="none"/>` +
    `<circle cx="${r1(x + 12 * s)}" cy="${r1(base - 12 * s)}" r="${r1(5 * s)}" fill="${c}"/>` +
    `<path d="M${r1(x - 21 * s)},${r1(base - 15 * s)}v${r1(15 * s)}" stroke="${c}" stroke-width="${r1(1.8 * s)}"/>`
  );
}

/** 鳥(海鳥・川鳥)。 */
function bird(x, y, s = 1, color = "#3a3a34") {
  return `<path d="M${r1(x - 7 * s)},${y}q${r1(3.5 * s)},${r1(-4.5 * s)} ${r1(7 * s)},0q${r1(3.5 * s)},${r1(-4.5 * s)} ${r1(7 * s)},0" stroke="${color}" stroke-width="${r1(1.6 * s)}" fill="none" stroke-linecap="round"/>`;
}

/** シラサギ。牛のそばに立つ白い鳥。 */
function egret(x, base, s = 1) {
  return (
    `<ellipse cx="${x}" cy="${r1(base - 8 * s)}" rx="${r1(4.4 * s)}" ry="${r1(3 * s)}" fill="#f6f2e8"/>` +
    `<path d="M${r1(x + 3 * s)},${r1(base - 10 * s)}q${r1(3 * s)},${r1(-4 * s)} ${r1(2 * s)},${r1(-7 * s)}" stroke="#f6f2e8" stroke-width="${r1(1.8 * s)}" fill="none"/>` +
    `<circle cx="${r1(x + 5 * s)}" cy="${r1(base - 17 * s)}" r="${r1(1.8 * s)}" fill="#f6f2e8"/>` +
    `<path d="M${r1(x + 6.6 * s)},${r1(base - 17 * s)}l${r1(3 * s)},${r1(0.6 * s)}l${r1(-3 * s)},${r1(0.8 * s)}z" fill="#f5b31c"/>` +
    `<path d="M${r1(x - 1 * s)},${r1(base - 5 * s)}v${r1(5 * s)}M${r1(x + 2 * s)},${r1(base - 5 * s)}v${r1(5 * s)}" stroke="#33302c" stroke-width="${r1(1 * s)}"/>`
  );
}

/** 人。20px前後。 */
function person(x, base, h, shirt, skin = "#c98f5f") {
  const hd = r1(h * 0.19);
  const top = r1(base - h + hd * 1.7);
  return (
    `<g><rect x="${r1(x - h * 0.09)}" y="${r1(base - h * 0.4)}" width="${r1(h * 0.08)}" height="${r1(h * 0.4)}" fill="#3f3428"/>` +
    `<rect x="${r1(x + h * 0.02)}" y="${r1(base - h * 0.4)}" width="${r1(h * 0.08)}" height="${r1(h * 0.4)}" fill="#3f3428"/>` +
    `<path d="M${r1(x - h * 0.16)},${top}h${r1(h * 0.32)}l${r1(h * 0.03)},${r1(h * 0.42)}h${r1(-h * 0.38)}z" fill="${shirt}"/>` +
    `<circle cx="${x}" cy="${r1(top - hd * 0.75)}" r="${hd}" fill="${skin}"/></g>`
  );
}

function arm(x, y, dx, dy, color = "#c98f5f", w = 3) {
  return `<path d="M${x},${y}l${dx},${dy}" stroke="${color}" stroke-width="${w}" stroke-linecap="round" fill="none"/>`;
}

/** 煙・湯気。上へ広がる楕円の重なり。 */
function plume(x, base, h, s = 1, color = "#b8b2a8", o = ".85") {
  const p = [];
  const n = 6;
  for (let i = 0; i < n; i++) {
    const f = i / (n - 1);
    p.push(
      `<ellipse cx="${r1(x + f * 10 * s)}" cy="${r1(base - f * h)}" rx="${r1((4 + f * 9) * s)}" ry="${r1((3 + f * 5) * s)}" opacity="${r1(1 - f * 0.55)}"/>`,
    );
  }
  return `<g fill="${color}" opacity="${o}">${p.join("")}</g>`;
}

/** 草の株。 */
function tuft(x, base, s = 1, fill = "#5f8f4a") {
  const p = [];
  for (const d of [-5, -2, 1, 4]) {
    p.push(
      `<path d="M${x},${base}q${r1(d * 0.6 * s)},${r1(-5 * s)} ${r1(d * s)},${r1(-9 * s)}" stroke="${fill}" stroke-width="${r1(1.6 * s)}" fill="none" stroke-linecap="round"/>`,
    );
  }
  return p.join("");
}

/** 柵の杭の列(牧場)。 */
function fence(x0, x1, y, h = 10, c = "#8a7454") {
  const p = [];
  for (let x = x0; x <= x1; x += 26) {
    p.push(`<rect x="${r1(x)}" y="${r1(y - h)}" width="3" height="${h}" fill="${c}"/>`);
  }
  p.push(
    `<path d="M${x0},${r1(y - h * 0.7)}H${x1}M${x0},${r1(y - h * 0.3)}H${x1}" stroke="${c}" stroke-width="1.6" fill="none"/>`,
  );
  return p.join("");
}

// ---------------------------------------------------------------------------
// 背景シーン(400×210)
//
// **中央 x=151〜249 / y=54〜152 はシンボルに、(200,155)の楕円は影に隠れる。**
// 見せたいものは左右3分の1と y>170 に置く。
// ---------------------------------------------------------------------------

export const COLOMBIA_BG = {
  /**
   * マグダレナ川の川港(オンダ・バランカベルメハ・マガンゲ)。
   * **内陸への唯一の道だった川。**外輪蒸気船と、荷を待つ倉庫と騾馬。
   */
  riverport:
    sky("#a8cce0", "#e8d8b8", 96) +
    clouds(70, 30, 0.9) +
    clouds(330, 24, 0.7, "#f6efe2", ".6") +
    hills(96, "#7a8a5a", 3) +
    // 川面へ降りていく水上機(滑走路は川そのもの)
    floatplane(310, 38, 0.62) +
    band(96, 12, "#6b8a50") +
    jungleBand(104, 10, "#3f6b46") +
    river(108) +
    ripple(126, "#d8c8a0", ".45") +
    // 外輪蒸気船(左)
    paddleSteamer(84, 152, 1) +
    shade(84, 154, 54, 5, ".14") +
    canoa(320, 136, 0.8) +
    // 近い岸(手前)
    `<path d="M0,176q100,-8 220,-2q100,5 180,-4v40H0z" fill="#c9a877"/>` +
    `<path d="M0,176q100,-8 220,-2q100,5 180,-4v6q-80,8 -180,3q-120,-5 -220,3z" fill="#b8945f"/>` +
    // 倉庫と桟橋(右)
    warehouse(268, 176, 92, 42, "#c8b494") +
    jetty(252, 344, 158, 172) +
    // 積み替えを待つ荷と騾馬
    sack(226, 202, 1.2) +
    sack(242, 204, 1.1) +
    crate(254, 206, 18, 13) +
    mule(120, 202, 1.1) +
    shade(120, 203, 16, 3, ".16") +
    person(88, 204, 21, "#5b8fe8") +
    arm(92, 191, 9, 4) +
    person(160, 205, 20, "#e8443f") +
    bird(40, 40, 1) +
    bird(64, 50, 0.8),

  /**
   * 山に囲まれた高原の首都(ボゴタ)。標高2600m、涼しい灰色の空と
   * レンガ色の町並み。丘の上に小さな白い聖堂。
   */
  capitalcity:
    sky("#9ab4c8", "#d8dce0", 92) +
    clouds(90, 28, 1, "#e8ecf0", ".85") +
    clouds(300, 20, 0.8, "#e8ecf0", ".7") +
    jaggedRidge(92, 30, "#4f6b52", 2) +
    // モンセラーテの丘の聖堂
    `<path d="M310,66q14,-20 34,-22q20,2 32,22z" fill="#41604a"/>` +
    `<rect x="336" y="42" width="16" height="12" fill="#f2f0e8"/>` +
    `<path d="M334,42h20l-4,-6h-12z" fill="#c8c4b8"/>` +
    `<path d="M344,33v5M341.6,35h4.8" stroke="#8a8f92" stroke-width="1.4" fill="none"/>` +
    ground(112, "#8a8a80") +
    // 遠景のレンガの町並み
    `<g>${[0, 34, 68, 102, 262, 296, 330, 364]
      .map((x) => `<rect x="${x}" y="${104 + (x % 3) * 2}" width="30" height="${18 - (x % 3) * 2}" fill="#9a5638"/>`)
      .join("")}</g>` +
    `<g fill="#f0d8a8" opacity=".85">${[6, 40, 74, 108, 268, 302, 336, 370]
      .map((x) => `<rect x="${x}" y="110" width="5" height="6"/><rect x="${x + 11}" y="110" width="5" height="6"/>`)
      .join("")}</g>` +
    // 中層のレンガ塔(左)
    brickHouse(14, 168, 34, 52) +
    brickHouse(54, 168, 30, 40) +
    towerBlock(94, 166, 26, 60, "#c8c4b8") +
    towerBlock(300, 168, 30, 54, "#d0ccc0") +
    brickHouse(340, 168, 40, 44, "#a85a3a") +
    // 手前の石畳の通り
    ground(168, "#7a766c") +
    band(168, 5, "#8f8b80") +
    `<g fill="#6b675e" opacity=".8">${[12, 60, 108, 156, 204, 252, 300, 348]
      .map((x) => `<ellipse cx="${x}" cy="${184 + (x % 4) * 4}" rx="12" ry="3"/>`)
      .join("")}</g>` +
    // 通りの人(ルアナをまとう)
    person(70, 204, 22, "#7a4a3a") +
    `<path d="M64,193h12l2,7H62z" fill="#5f4436"/>` +
    person(330, 202, 21, "#3f6f9a") +
    arm(334, 190, 8, 6, "#c98f5f") +
    `<path d="M342,196l7,-3" stroke="#33302c" stroke-width="1.6" fill="none"/>` +
    bird(160, 36, 0.9, "#4a4a44") +
    bird(240, 30, 0.8, "#4a4a44"),

  /**
   * 急峻な谷の大都市(メデジン)。両斜面をレンガ色の家が埋め、
   * 谷底に白い高層が立つ。常春の明るい空。
   */
  andeanmetropolis:
    sky("#9fc8e0", "#e0e8d8", 84) +
    clouds(200, 26, 0.9, "#f6efe2", ".7") +
    ground(84, "#5f7f52") +
    // 左右の谷壁
    `<path d="M0,84v126h150q-40,-70 -90,-100q-30,-18 -60,-26z" fill="#4f7048"/>` +
    `<path d="M400,80v130h-140q30,-66 80,-98q30,-20 60,-32z" fill="#547a4c"/>` +
    // 斜面のレンガの家々(左)
    `<g>${[
      [8, 100], [30, 108], [52, 118], [16, 122], [40, 132], [64, 130], [10, 144], [34, 148], [58, 146], [82, 142],
      [20, 162], [46, 164], [72, 160], [96, 156],
    ]
      .map(([x, y]) => `<rect x="${x}" y="${y}" width="17" height="12" fill="#a85a3a"/><rect x="${x}" y="${y}" width="17" height="2.4" fill="#8a4a30"/><rect x="${x + 5}" y="${y + 4}" width="4" height="4" fill="#f0d8a8"/>`)
      .join("")}</g>` +
    // 斜面のレンガの家々(右)
    `<g>${[
      [372, 96], [350, 106], [328, 118], [368, 118], [344, 130], [318, 132], [378, 132], [332, 146], [358, 144], [304, 148],
      [344, 160], [318, 164], [372, 158], [292, 162],
    ]
      .map(([x, y]) => `<rect x="${x}" y="${y}" width="17" height="12" fill="#b06a45"/><rect x="${x}" y="${y}" width="17" height="2.4" fill="#8a4a30"/><rect x="${x + 5}" y="${y + 4}" width="4" height="4" fill="#f0d8a8"/>`)
      .join("")}</g>` +
    // 谷底
    ground(172, "#7a8a6a") +
    band(172, 4, "#8f9c7a") +
    towerBlock(96, 210, 26, 66, "#e0dcd0") +
    towerBlock(126, 210, 22, 52, "#d0ccc0") +
    towerBlock(278, 210, 26, 60, "#d8d4c8") +
    towerBlock(252, 210, 20, 46, "#c8c4b8") +
    // 谷底を流れる川
    `<path d="M0,196q100,-5 200,0q100,5 200,-2v16H0z" fill="#6f7f6a"/>` +
    `<path d="M30,200q10,-3 20,0M340,202q10,-3 20,0" stroke="#9ab0a0" stroke-width="2" fill="none" opacity=".7"/>` +
    bird(70, 40, 1) +
    bird(320, 32, 0.9),

  /**
   * カウカ渓谷の平坦な農地(カリ)。サトウキビ畑が地平線まで続き、
   * 遠くに西部山脈の青い稜線。
   */
  caucavalley:
    sky("#8fc4e8", "#e8e0c0", 100) +
    sun(348, 34, 15, "#f5c84a") +
    clouds(120, 36, 1, "#f6efe2", ".8") +
    hills(100, "#7a94a8", 4) +
    ground(100, "#9ab060") +
    // サトウキビの区画(左右)
    `<rect x="0" y="112" width="150" height="26" fill="#7f9a3f"/>` +
    `<g stroke="#8fae4a" stroke-width="2" opacity=".85" fill="none"><path d="${[8, 22, 36, 50, 64, 78, 92, 106, 120, 134]
      .map((x) => `M${x},138v-26`)
      .join("")}"/></g>` +
    `<rect x="252" y="110" width="148" height="28" fill="#88a446"/>` +
    `<g stroke="#98b452" stroke-width="2" opacity=".85" fill="none"><path d="${[260, 274, 288, 302, 316, 330, 344, 358, 372, 386]
      .map((x) => `M${x},138v-28`)
      .join("")}"/></g>` +
    `<g fill="#a8b85a"><path d="M18,112q3,-8 7,-12M60,112q3,-8 7,-12M104,112q3,-8 7,-12M268,110q3,-8 7,-12M318,110q3,-8 7,-12M368,110q3,-8 7,-12" stroke="#a8b85a" stroke-width="2.2" fill="none"/></g>` +
    // サマンの大樹(左)
    broadTree(56, 176, 30, "#3f7048") +
    shade(56, 177, 34, 5, ".16") +
    // 手前の畑道
    ground(150, "#8aa050") +
    `<path d="M0,168L400,182v12L0,182z" fill="#c2ab72"/>` +
    `<path d="M0,173L400,187" stroke="#a8925f" stroke-width="2" opacity=".7" fill="none"/>` +
    // 刈り取りのキビの束と荷車
    `<g stroke="#9aa84f" stroke-width="2.6" fill="none" stroke-linecap="round"><path d="M292,206q14,-14 34,-10M300,208q16,-16 38,-12M310,210q16,-16 40,-13"/></g>` +
    crate(348, 208, 20, 14) +
    egret(120, 206, 1.1) +
    egret(255, 200, 0.9) +
    bird(200, 34, 0.9) +
    tuft(20, 206, 1.2) +
    tuft(180, 204, 1),

  /**
   * コーヒー地帯の丘(マニサレス・ペレイラ・アルメニア・サレント)。
   * 深緑の畝と、霧と、世界一高いワックスパーム。
   */
  coffeeridge:
    sky("#a4c8d8", "#e0e8d0", 90) +
    clouds(80, 30, 0.9, "#eef2e8", ".8") +
    hills(90, "#3f6b46", 3) +
    ground(90, "#4f8048") +
    mist(110, 96, 110, ".55") +
    mist(330, 102, 90, ".45") +
    // 丘の重なり
    `<path d="M0,118q90,-26 190,-8q110,18 210,-12v112H0z" fill="#457a44"/>` +
    `<path d="M0,150q110,-22 220,-4q100,14 180,-8v72H0z" fill="#3f7040"/>` +
    // 斜面のコーヒーの畝
    coffeeRows(6, 140, 130, 3, 13, "#2d6b3f") +
    coffeeRows(266, 400, 124, 3, 13, "#2d6b3f") +
    coffeeRows(0, 400, 172, 3, 13, "#255f36") +
    `<g fill="#e8443f">${[24, 48, 84, 120, 288, 320, 356, 384]
      .map((x) => `<circle cx="${x}" cy="${174 + (x % 3) * 12}" r="1.4"/>`)
      .join("")}</g>` +
    // ワックスパーム
    waxPalm(58, 130, 74) +
    waxPalm(96, 124, 58) +
    waxPalm(330, 122, 78) +
    waxPalm(368, 128, 56) +
    // 農家(フィンカ)
    tinHouse(262, 108, 40, 128, "#f2ece0", "#c8452f") +
    shade(282, 130, 26, 4, ".16") +
    sack(318, 132, 1) +
    person(238, 134, 19, "#f5b31c") +
    bird(180, 34, 0.9) +
    bird(210, 44, 0.7),

  /**
   * 崖際の町(ブカラマンガ)。台地の縁に白い家が並び、
   * 足もとはチカモチャ峡谷へ落ちる。
   */
  canyonledge:
    sky("#a8c4d0", "#e8dcc0", 88) +
    clouds(80, 32, 0.9) +
    hills(88, "#8a9a7a", 3) +
    // 峡谷の空間ぜんたいの基礎(左右の崖のパスはこの上に重なる)
    ground(88, "#9a7448") +
    // 台地(右)と崖
    `<path d="M400,88v122H150q30,-8 52,-30q20,-20 26,-48q4,-24 18,-34q60,-14 154,-10z" fill="#b0895c"/>` +
    `<path d="M400,96q-90,-4 -146,8q-12,9 -16,30q-6,28 -26,48q-20,20 -48,28h236z" fill="#c99a68"/>` +
    // 地層の筋
    `<g stroke="#8a6a44" stroke-width="2" opacity=".6" fill="none"><path d="M252,128q60,-8 148,-6M240,152q66,-8 160,-6M228,176q70,-8 172,-7"/></g>` +
    // 台地の上の町(右上)
    `<g>${[258, 286, 314, 342, 370]
      .map((x) => `<rect x="${x}" y="${92 - (x % 3) * 2}" width="24" height="14" fill="#f2ece0"/><path d="M${x - 3},${92 - (x % 3) * 2}h30l-4,-6h-22z" fill="#b0543a"/><rect x="${x + 8}" y="${97 - (x % 3) * 2}" width="6" height="6" fill="#5f7f96"/>`)
      .join("")}</g>` +
    // 峡谷の底(左)
    `<path d="M0,88v122h150q-24,-26 -34,-58q-8,-28 -30,-44q-40,-18 -86,-20z" fill="#7a5636"/>` +
    `<path d="M0,110q40,2 70,16q20,14 28,42q8,30 28,42H0z" fill="#8f6640"/>` +
    `<g stroke="#6b4a30" stroke-width="2" opacity=".6" fill="none"><path d="M0,140q50,4 86,26M0,170q44,6 80,24"/></g>` +
    // 底の細い川(峡谷のいちばん深いところ)
    `<path d="M0,192q70,-6 130,6q50,8 110,10H0z" fill="#5f8a7a"/>` +
    `<path d="M0,196q70,-6 126,5q46,7 100,9H0z" fill="#7aa892"/>` +
    `<path d="M14,200q10,-3 20,0M70,204q10,-3 20,0M150,207q10,-3 20,0" stroke="#c8e0d0" stroke-width="2" opacity=".8" fill="none"/>` +
    // 崖際のサボテンと灌木
    cactus(52, 138, 24, "#5f8048") +
    tuft(96, 172, 1.1, "#8a9a5a") +
    tuft(300, 196, 1.2, "#8a9a5a") +
    bird(120, 60, 0.9) +
    bird(180, 40, 1),

  /**
   * 植民地時代の広場を持つアンデス高地の町(トゥンハ・ビジャ・デ・レイバ・ポパヤン)。
   * 白壁とテハの瓦、石畳の広場、澄んだ空。
   */
  andeancolonial:
    sky("#8fc4e8", "#e8e8d8", 96) +
    clouds(310, 30, 0.9) +
    clouds(90, 22, 0.7, "#f6efe2", ".6") +
    hills(96, "#6b8a5a", 3) +
    ground(96, "#b0a284") +
    // 教会(左)
    church(28, 148, 66, 92) +
    shade(60, 150, 42, 5, ".14") +
    // 白壁の家並み(右)
    colonialHouse(258, 148, 52, 40, "#f2ece0", "#4f7f6a") +
    colonialHouse(314, 148, 44, 34, "#f6f0e4", "#8a4a30") +
    colonialHouse(362, 148, 38, 38, "#efe8da", "#3f6f9a") +
    // 石畳の広場
    ground(148, "#a89878") +
    band(148, 5, "#bcaa88") +
    `<g fill="#8f7f62" opacity=".7">${[16, 64, 112, 160, 208, 256, 304, 352]
      .map((x) => `<ellipse cx="${x}" cy="${168 + (x % 4) * 10}" rx="13" ry="3.4"/>`)
      .join("")}</g>` +
    // 広場の噴水(左手前)と街灯
    `<ellipse cx="86" cy="196" rx="26" ry="7" fill="#8a8a80"/>` +
    `<ellipse cx="86" cy="194" rx="20" ry="5" fill="#9fc0c8"/>` +
    `<rect x="83" y="176" width="6" height="16" fill="#8a8a80"/>` +
    `<ellipse cx="86" cy="176" rx="9" ry="2.6" fill="#9fc0c8"/>` +
    `<path d="M330,206v-26M326,180h8l-4,-6z" stroke="#33302c" stroke-width="2.4" fill="none"/>` +
    `<circle cx="330" cy="177" r="3" fill="#f5b31c"/>` +
    // 広場の人
    person(140, 206, 22, "#7a4a3a") +
    `<path d="M134,195h12l2,7h-16z" fill="#5f4436"/>` +
    person(288, 204, 20, "#5b8fe8") +
    arm(292, 193, 8, 5) +
    bird(180, 40, 0.9) +
    bird(220, 32, 0.8),

  /**
   * 霧の山道の麓の町(イバゲ)。キンディオ峠へ登る道と、
   * 雪をかぶったトリマ火山。
   */
  cordillerapass:
    sky("#9ab8cc", "#dce4dc", 80) +
    snowPeak(322, 80, 120, 62, "#6b7a80") +
    jaggedRidge(80, 36, "#5f7a70", 3) +
    jaggedRidge(96, 26, "#4f6b58", 2) +
    ground(108, "#4f7048") +
    mist(90, 92, 104, ".6") +
    mist(300, 108, 92, ".5") +
    // 峠へ登るつづら折り(左の斜面)
    `<path d="M0,108v102h130q-6,-40 -40,-58q-34,-18 -90,-44z" fill="#457a44"/>` +
    `<path d="M4,196q40,-8 62,-26q-36,2 -50,12q22,-16 44,-22q-30,-2 -44,4q24,-14 40,-16" stroke="#c2ab72" stroke-width="4" fill="none" opacity=".85"/>` +
    // 斜面の林
    `<g fill="#2d5f3f">${[24, 48, 76, 104, 320, 344, 368, 390]
      .map((x) => `<ellipse cx="${x}" cy="${126 + (x % 5) * 3}" rx="13" ry="9"/>`)
      .join("")}</g>` +
    // 麓の町(右手前)
    ground(168, "#5f8450") +
    tinHouse(276, 176, 38, 202, "#f2ece0", "#b0543a") +
    tinHouse(322, 180, 34, 204, "#e8dcc4", "#8a4a30") +
    tinHouse(364, 178, 30, 202, "#f2ece0", "#c8452f") +
    shade(320, 205, 60, 6, ".16") +
    // 荷を積んだ騾馬の隊列(道の上)
    mule(56, 200, 1) +
    mule(86, 204, 0.95) +
    person(114, 206, 20, "#e8443f") +
    `<path d="M108,196h12l2,6h-16z" fill="#b03a30"/>` +
    bird(200, 30, 0.9) +
    mist(180, 168, 110, ".4"),

  /**
   * 乾いた浸食地形(ネイバ=タタコア砂漠)。赤い土柱と柱サボテン。
   * 夜には星がよく見える土地だが、絵は昼の乾いた光で。
   */
  dryvalley:
    sky("#a8c8e0", "#f0dcb8", 104) +
    sun(70, 36, 16, "#f5c84a") +
    clouds(280, 28, 0.7, "#f6efe2", ".5") +
    band(104, 8, "#8a9a5a") +
    ground(110, "#c98a5f") +
    // 浸食された赤い土柱(左)。上ほど痩せ、頂に固い層の帽子が載る
    `<g fill="#b06a3a">${[
      [12, 120, 22, 54], [46, 112, 18, 62], [78, 126, 20, 48], [110, 118, 15, 56],
    ]
      .map(([x, y, w, h]) => `<path d="M${x},${y + h}q${r1(w * 0.16)},${r1(-h * 0.5)} ${r1(w * 0.3)},${-h}h${r1(w * 0.4)}q${r1(w * 0.14)},${r1(h * 0.5)} ${r1(w * 0.3)},${h}z"/>`)
      .join("")}</g>` +
    `<g fill="#8f5230">${[
      [12, 120, 22], [46, 112, 18], [78, 126, 20], [110, 118, 15],
    ]
      .map(([x, y, w]) => `<rect x="${r1(x + w * 0.18)}" y="${y - 5}" width="${r1(w * 0.64)}" height="6" rx="2"/>`)
      .join("")}</g>` +
    `<g stroke="#8f5230" stroke-width="1.6" opacity=".6" fill="none"><path d="M22,134v34M54,128v40M87,142v26M117,132v36"/></g>` +
    // 灰色の土柱(右)
    `<g fill="#9a8a72">${[
      [294, 124, 20, 50], [326, 116, 17, 58], [356, 128, 22, 46], [386, 122, 14, 52],
    ]
      .map(([x, y, w, h]) => `<path d="M${x},${y + h}q${r1(w * 0.16)},${r1(-h * 0.5)} ${r1(w * 0.3)},${-h}h${r1(w * 0.4)}q${r1(w * 0.14)},${r1(h * 0.5)} ${r1(w * 0.3)},${h}z"/>`)
      .join("")}</g>` +
    `<g fill="#7a6a54">${[
      [294, 124, 20], [326, 116, 17], [356, 128, 22], [386, 122, 14],
    ]
      .map(([x, y, w]) => `<rect x="${r1(x + w * 0.18)}" y="${y - 5}" width="${r1(w * 0.64)}" height="6" rx="2"/>`)
      .join("")}</g>` +
    `<g stroke="#7a6a54" stroke-width="1.6" opacity=".6" fill="none"><path d="M303,138v30M334,130v38M366,142v26M392,134v34"/></g>` +
    // 手前の乾いた谷底
    ground(174, "#b87a4f") +
    band(174, 4, "#c98a5f") +
    `<g stroke="#9a5f38" stroke-width="1.6" opacity=".6" fill="none"><path d="M20,190l24,4M70,198l20,-3M270,192l26,4M330,200l22,-3M150,204l22,3"/></g>` +
    cactus(136, 176, 30) +
    cactus(258, 182, 26, "#5f8048") +
    cactus(374, 204, 34) +
    tuft(60, 200, 1, "#a89a5a") +
    tuft(220, 206, 0.9, "#a89a5a") +
    bird(180, 40, 0.8, "#5a4a3a") +
    bird(220, 52, 0.7, "#5a4a3a"),

  /**
   * 首都より低く暖かい行楽地(ジラルドット)。マグダレナ川と、
   * 川を渡る鉄道の鋼橋。**線路はここでも川へ向かう。**
   */
  hotlowlandtown:
    sky("#8fc4e8", "#f0e0b8", 92) +
    sun(56, 30, 15, "#f5c84a") +
    clouds(300, 26, 0.9) +
    hills(92, "#7a945f", 3) +
    ground(92, "#9ab060") +
    // 対岸の町(左)
    tinHouse(8, 102, 34, 126, "#f2d88a", "#c8452f") +
    tinHouse(48, 106, 30, 126, "#e8b06a", "#8a4a30") +
    tinHouse(84, 104, 30, 126, "#f2ece0", "#b0543a") +
    palm(128, 128, 34, 4) +
    palm(10, 130, 28, -4) +
    // 川
    river(126, "#5f4f34", "#75613f", "#8f7a4e") +
    ripple(148, "#d8c8a0", ".45") +
    // 鉄道の鋼橋(トラス)
    `<rect x="0" y="132" width="400" height="5" fill="#4a4a44"/>` +
    `<g stroke="#4a4a44" stroke-width="2.6" fill="none"><path d="M0,132l20,-16l20,16l20,-16l20,16M320,132l20,-16l20,16l20,-16l20,16"/><path d="M0,116h100M320,116h80"/></g>` +
    `<g fill="#3a3a34"><rect x="30" y="137" width="7" height="20"/><rect x="86" y="137" width="7" height="22"/><rect x="330" y="137" width="7" height="20"/><rect x="382" y="137" width="7" height="22"/></g>` +
    // 手前の岸辺(行楽の砂地)
    `<path d="M0,182q110,-8 226,-2q94,4 174,-4v34H0z" fill="#d8b87f"/>` +
    `<ellipse cx="80" cy="198" rx="30" ry="8" fill="#5b9fc8"/>` +
    `<ellipse cx="80" cy="196" rx="24" ry="6" fill="#8fd0e8"/>` +
    // パラソルと川辺の人
    `<path d="M320,206v-22" stroke="#8a7454" stroke-width="2.4" fill="none"/>` +
    `<path d="M300,186q20,-14 40,0q-10,-4 -20,-4q-10,0 -20,4z" fill="#e8443f"/>` +
    `<path d="M304,184q16,-10 32,0" stroke="#c8342f" stroke-width="1.6" fill="none"/>` +
    person(348, 208, 21, "#f5b31c") +
    person(130, 206, 19, "#5b8fe8") +
    arm(134, 196, 8, -4) +
    canoa(230, 172, 0.7) +
    bird(180, 36, 0.9) +
    bird(240, 44, 0.8),

  /**
   * 岩塩の山(シパキラ)。緑の丘に露頭が白く光り、
   * 坑口から**大聖堂が掘られた**闇へ降りていく。
   */
  saltmountain:
    sky("#9ab4c8", "#dce0d8", 88) +
    clouds(90, 30, 0.9, "#e8ecf0", ".8") +
    hills(88, "#6b8a5a", 4) +
    ground(88, "#7a9a62") +
    // 岩塩の山体(右)
    `<path d="M400,88v122H210q16,-36 48,-62q36,-28 76,-42q34,-12 66,-18z" fill="#b8b0a0"/>` +
    `<g fill="#ded6c4"><path d="M264,148q30,-30 70,-46q-20,26 -34,50q-20,2 -36,-4z"/><path d="M330,110q30,-12 66,-16q-16,18 -28,38q-22,-8 -38,-22z"/></g>` +
    `<g stroke="#9a927f" stroke-width="2" opacity=".6" fill="none"><path d="M240,170q40,-42 96,-68M300,180q30,-36 76,-58"/></g>` +
    // 坑口(右手前)
    `<path d="M300,210v-34a26,26 0 0 1 52,0v34z" fill="#33302c"/>` +
    `<path d="M300,210v-34a26,26 0 0 1 52,0v34l-7,0v-32a19,19 0 0 0 -38,0v32z" fill="#6b5638"/>` +
    `<path d="M310,190h32" stroke="#5a4630" stroke-width="3" fill="none"/>` +
    `<circle cx="326" cy="196" r="3" fill="#f5b31c" opacity=".9"/>` +
    // トロッコの線路と塩の山
    `<path d="M326,210v-14" stroke="#8a8f92" stroke-width="1.6" fill="none"/>` +
    `<path d="M318,210v-12M334,210v-12" stroke="#8a8f92" stroke-width="1.4" fill="none"/>` +
    `<path d="M252,210q6,-16 20,-16q14,0 18,16z" fill="#e8e0d0"/>` +
    `<path d="M282,210q4,-10 13,-10q9,0 12,10z" fill="#ded6c4"/>` +
    // 丘の上の町(左)
    ground(160, "#6b8a52") +
    colonialHouse(10, 152, 44, 32, "#f2ece0", "#4f7f6a") +
    colonialHouse(58, 154, 38, 28, "#f6f0e4", "#8a4a30") +
    church(104, 156, 40, 60) +
    shade(70, 156, 60, 5, ".14") +
    // 手前の草地
    tuft(30, 196, 1.2) +
    tuft(90, 204, 1.1) +
    tuft(150, 200, 1) +
    person(196, 206, 20, "#e8443f") +
    sack(226, 206, 1) +
    bird(180, 36, 0.9),

  /**
   * 川口の港(バランキージャ)。**川口を絞る2本の突堤(ボカス・デ・セニサ)**が
   * 開いて、外洋船が川へ直接入れるようになった。
   */
  rivermouthport:
    sky("#8fc4e8", "#e0d8c0", 92) +
    clouds(80, 30, 0.9) +
    clouds(320, 22, 0.7, "#f6efe2", ".6") +
    sea(92, "#1f5f8f", "#2f7fa8", "#57a8b8") +
    // 川の水が海へ広がる(茶色の舌)
    `<path d="M120,92q80,4 160,0q-10,30 -40,52q-30,20 -40,66h-60q-6,-46 -30,-70q-16,-20 10,-48z" fill="#8f7a4e"/>` +
    `<path d="M150,92q50,3 100,0q-8,24 -30,44q-22,18 -32,62h-36q-4,-42 -22,-62q-10,-18 20,-44z" fill="#7a6642" opacity=".8"/>` +
    // 左右の突堤(岩積み)
    `<g fill="#5f5a4a">${[
      [96, 100], [104, 112], [112, 126], [122, 142], [132, 158], [142, 176], [152, 194],
    ]
      .map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="13" ry="6"/>`)
      .join("")}</g>` +
    `<g fill="#6f6a58">${[
      [300, 100], [292, 112], [284, 126], [274, 142], [264, 158], [254, 176], [244, 194],
    ]
      .map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="13" ry="6"/>`)
      .join("")}</g>` +
    // 入ってくる貨物船(左)と水先の艀
    freighter(60, 132, 0.85) +
    skiff(340, 150, 0.9, "#c8452f") +
    // 浮標
    `<g><path d="M320,108l4,-10l4,10z" fill="#c8452f"/><path d="M76,110l4,-10l4,10z" fill="#3f8f52"/></g>` +
    ripple(120, "#bfe8f4", ".5") +
    ripple(170, "#d8c8a0", ".4") +
    bird(150, 40, 1) +
    bird(180, 30, 0.8) +
    bird(250, 46, 0.9) +
    // 手前の防波の岩
    `<g fill="#4f4a3e"><ellipse cx="30" cy="206" rx="30" ry="8"/><ellipse cx="378" cy="204" rx="34" ry="9"/><ellipse cx="70" cy="209" rx="22" ry="6"/></g>`,
  /**
   * 石造りの城壁都市(カルタヘナ)。厚い稜堡と見張りの塔(ガリータ)、
   * 壁の内に色鮮やかなバルコニーの家。
   */
  walledcity:
    sky("#8fc4e8", "#f0e4c8", 90) +
    sun(340, 30, 14, "#f5c84a") +
    clouds(80, 28, 0.9) +
    sea(90, "#1f6f96", "#2f8fae", "#57c8c0") +
    ripple(102, "#bfe8f4", ".55") +
    // 壁の内側の家並みと聖堂のドーム(壁の上に覗く)
    balconyHouse(24, 132, 34, 44, "#c8a13f") +
    balconyHouse(62, 132, 30, 38, "#b0543a", "#4a3a26") +
    balconyHouse(96, 132, 30, 42, "#4f7f6a") +
    `<g><path d="M306,132v-26a22,22 0 0 1 44,0v26z" fill="#c8944a"/><path d="M328,96v-8" stroke="#8a6b3a" stroke-width="2.4" fill="none"/><circle cx="328" cy="86" r="2.6" fill="#f5b31c"/><rect x="296" y="112" width="12" height="20" fill="#f2ece0"/></g>` +
    // 城壁(手前いっぱい)
    ground(132, "#b8a888") +
    band(132, 6, "#cbb894") +
    `<g fill="#a89474">${[0, 44, 88, 132, 176, 220, 264, 308, 352]
      .map((x) => `<rect x="${x}" y="126" width="26" height="8"/>`)
      .join("")}</g>` +
    `<g stroke="#8f7c5e" stroke-width="1.6" opacity=".6" fill="none"><path d="M0,152h400M0,172h400M40,138v70M120,146v64M200,152v58M280,146v64M360,138v70"/><path d="M80,152v58M160,152v58M240,152v58M320,152v58"/></g>` +
    // 見張りの塔(左端)
    `<g><path d="M8,132v-30q0,-8 10,-8q10,0 10,8v30z" fill="#c2ab84"/><path d="M18,86q12,2 10,12q-10,-4 -20,0q-2,-10 10,-12z" fill="#a89060"/><rect x="14" y="108" width="8" height="12" rx="4" fill="#5f5340"/></g>` +
    // 壁の上の大砲と歩く人
    `<g fill="#3a3a34"><path d="M330,128l22,-6l1,4l-22,6z"/><rect x="348" y="122" width="8" height="8" rx="2"/></g>` +
    `<g fill="#33302c"><circle cx="368" cy="128" r="3"/><circle cx="376" cy="129" r="3"/></g>` +
    person(220, 130, 18, "#e8443f") +
    person(150, 131, 17, "#f5b31c") +
    bird(120, 40, 1) +
    bird(240, 32, 0.9) +
    bird(196, 48, 0.7),

  /**
   * 雪山を背にした海岸(サンタ・マルタ)。**海のすぐ後ろに5700mの雪の峰。**
   */
  coastalsierra:
    sky("#8fc4e8", "#dce8f0", 70) +
    snowPeak(250, 72, 150, 58, "#7a8a92") +
    snowPeak(330, 72, 120, 44, "#8a98a0") +
    clouds(60, 30, 0.9) +
    jaggedRidge(70, 26, "#4f7048", 2) +
    band(96, 18, "#5f8450") +
    // 海辺の町の帯
    band(114, 22, "#c9a877") +
    tinHouse(12, 116, 32, 134, "#f2ece0", "#c8452f") +
    tinHouse(50, 118, 28, 134, "#f2d88a", "#8a4a30") +
    tinHouse(300, 116, 32, 134, "#e8dcc4", "#b0543a") +
    tinHouse(338, 118, 30, 134, "#f2ece0", "#c8452f") +
    palm(96, 136, 34, 5) +
    palm(282, 136, 30, -5) +
    palm(384, 134, 32, 4) +
    // 海(手前)
    sea(136, "#1f6f96", "#2f8fae", "#4ab0c0") +
    ripple(150, "#bfe8f4", ".5") +
    skiff(80, 172, 1, "#c8452f") +
    canoa(330, 186, 0.9) +
    freighter(210, 160, 0.5) +
    // 手前の砂浜(右下)
    `<path d="M400,210h-190q40,-16 96,-18q56,-2 94,6z" fill="#efe2c6"/>` +
    `<path d="M240,204q40,-10 96,-11" stroke="#e0d0ae" stroke-width="3" fill="none" opacity=".8"/>` +
    person(330, 208, 20, "#5b8fe8") +
    bird(140, 32, 1) +
    bird(170, 44, 0.8),

  /**
   * 乾いたグアヒラ半島の海岸(リオアチャ・カボ・デ・ラ・ベラ)。
   * 砂丘とターコイズの海が直接出会う。
   */
  desertcoast:
    sky("#9fc8e0", "#f0d8a8", 96) +
    sun(64, 32, 16, "#f5c84a") +
    clouds(300, 22, 0.7, "#f6efe2", ".5") +
    sea(96, "#2f8fae", "#3fa8b8", "#57c8c0") +
    ripple(108, "#bfe8f4", ".55") +
    // 砂丘(手前へ流れる)
    `<path d="M0,148q90,-18 190,-6q110,12 210,-10v78H0z" fill="#d8a05f"/>` +
    `<path d="M0,170q110,-14 220,-4q100,8 180,-6v50H0z" fill="#c98a4f"/>` +
    `<g stroke="#b87a42" stroke-width="1.8" opacity=".6" fill="none"><path d="M20,160q40,-8 90,-6M240,158q60,-6 130,-8M60,186q60,-8 130,-6M260,190q60,-6 120,-8"/></g>` +
    // 風の筋
    `<g stroke="#f0d8a8" stroke-width="2" opacity=".7" fill="none" stroke-linecap="round"><path d="M40,140q14,-5 28,0M300,132q14,-5 28,0M120,128q12,-4 24,0"/></g>` +
    cactus(38, 202, 34) +
    cactus(346, 196, 28, "#5f8048") +
    cactus(90, 186, 22, "#5f8048") +
    tuft(100, 200, 1, "#a89a5a") +
    tuft(300, 206, 1.1, "#a89a5a") +
    tuft(180, 202, 0.9, "#a89a5a") +
    tuft(250, 208, 1, "#a89a5a") +
    // 砂に転がる岩と流木
    `<g fill="#b0885a"><ellipse cx="140" cy="196" rx="10" ry="4"/><ellipse cx="156" cy="200" rx="7" ry="3"/><ellipse cx="290" cy="204" rx="9" ry="3.4"/></g>` +
    `<path d="M204,206q14,-4 26,-1l-3,3q-12,2 -23,-2z" fill="#8a6f4a"/>` +
    // 帆を張った小さな漁の船(ワユーの漁は道具で語る)
    `<g><path d="M96,120q14,6 28,0q-7,4 -14,4q-7,0 -14,-4z" fill="#6b5330"/><path d="M110,118v-22l16,20z" fill="#efe8d8"/><path d="M110,96v22" stroke="#4a3a24" stroke-width="1.6"/></g>` +
    skiff(330, 126, 0.8, "#c8452f") +
    bird(150, 36, 1) +
    bird(190, 46, 0.8) +
    bird(230, 30, 0.9),

  /**
   * カリブ海岸に近い平坦な牧畜地帯(バジェドゥパル・モンテリア・シンセレホ)。
   * セブー牛とシラサギ、マンゴーの大樹。
   */
  caribbeanplain:
    sky("#8fc4e8", "#f0e4c0", 100) +
    sun(344, 32, 15, "#f5c84a") +
    thunderhead(90, 52, 1.1) +
    hills(100, "#8aa4b0", 3) +
    ground(100, "#9ab060") +
    band(100, 6, "#8aa455") +
    // マンゴーの大樹(左右)
    broadTree(52, 168, 30, "#3f7048") +
    shade(52, 169, 34, 5, ".16") +
    broadTree(354, 156, 24, "#2d6b3f") +
    shade(354, 157, 27, 4, ".14") +
    // 牧場の柵
    fence(120, 400, 132, 12) +
    fence(0, 120, 148, 12) +
    // セブー牛の群れ
    zebu(96, 176, 1.1) +
    zebu(130, 168, 0.85, "#d8c8b0") +
    zebu(304, 174, 1) +
    zebu(340, 184, 1.15, "#e0d4c0") +
    shade(96, 177, 15, 3, ".14") +
    shade(340, 185, 16, 3, ".14") +
    egret(78, 176, 1) +
    egret(322, 184, 0.9) +
    bird(200, 40, 0.9) +
    // 手前の草地と水たまり
    ground(176, "#8aa455") +
    band(176, 4, "#9ab060") +
    `<ellipse cx="210" cy="200" rx="40" ry="8" fill="#7a9a8a"/>` +
    `<ellipse cx="210" cy="198" rx="32" ry="6" fill="#9fc0c8" opacity=".8"/>` +
    tuft(20, 204, 1.2) +
    tuft(160, 208, 1) +
    tuft(280, 206, 1.1) +
    tuft(388, 202, 1),

  /**
   * カリブ海岸の低地の町(プエルト・コロンビア・シエナガ・アラカタカ)。
   * バナナ園と砂の道、遠くに帯のような海。
   */
  caribbeancoast:
    sky("#8fc4e8", "#f0e0b8", 88) +
    sun(60, 28, 14, "#f5c84a") +
    clouds(300, 26, 0.9) +
    sea(88, "#2f7fa8", "#3f9ab0", "#57b8c0") +
    // 砂の帯と低地
    `<path d="M0,104q100,-5 200,0q100,5 200,-2v108H0z" fill="#e0cb96"/>` +
    ground(122, "#8aa455") +
    // バナナ園(左右の列)
    banana(24, 148, 1.1) +
    banana(56, 142, 0.95) +
    banana(90, 150, 1.05) +
    banana(124, 144, 0.9) +
    banana(288, 146, 1) +
    banana(320, 152, 1.1) +
    banana(354, 142, 0.95) +
    banana(386, 150, 1) +
    `<g fill="#3a7a44" opacity=".8">${[40, 74, 108, 304, 338, 372]
      .map((x) => `<ellipse cx="${x}" cy="128" rx="14" ry="5"/>`)
      .join("")}</g>` +
    // 砂の道(手前を斜めに)
    `<path d="M0,176L400,164v16L0,196z" fill="#e0cb96"/>` +
    `<path d="M0,182L400,170" stroke="#c9b27c" stroke-width="2" opacity=".7" fill="none"/>` +
    // トタンの家と庭先
    ground(192, "#7a9a4f") +
    tinHouse(300, 168, 40, 196, "#f2ece0", "#c8452f") +
    shade(320, 198, 26, 4, ".16") +
    person(352, 204, 20, "#f5b31c") +
    mule(70, 204, 1) +
    sack(100, 206, 1) +
    tuft(160, 206, 1.1) +
    tuft(240, 202, 1) +
    bird(160, 34, 1) +
    bird(200, 26, 0.8),

  /**
   * 取り残された川辺の植民地建築(モンポス)。川筋が痩せて船が来なくなり、
   * **町ごと時間が止まった。**白いアーケードと静かな水面。
   */
  rivercolonial:
    sky("#a4c4d8", "#ecdfc0", 94) +
    clouds(80, 26, 0.8, "#f6efe2", ".7") +
    clouds(310, 20, 0.6, "#f6efe2", ".55") +
    // 白いアーケードの並び
    band(94, 56, "#f2ece0") +
    `<path d="M0,94h400v-8H0z" fill="#a85a3a"/>` +
    `<g stroke="#8a4a30" stroke-width="1.4" opacity=".8" fill="none"><path d="${[30, 90, 150, 210, 270, 330, 390]
      .map((x) => `M${x},86l3,8`)
      .join("")}"/></g>` +
    `<g fill="#d8ccb4">${[10, 58, 106, 262, 310, 358]
      .map((x) => `<path d="M${x},150v-30a13,13 0 0 1 26,0v30z"/>`)
      .join("")}</g>` +
    `<g fill="#6b5638">${[16, 64, 112, 268, 316, 364]
      .map((x) => `<path d="M${x},150v-26a7,7 0 0 1 14,0v26z"/>`)
      .join("")}</g>` +
    // サンタ・バルバラの塔(右端。中央はシンボルに隠れるので置かない)
    `<g><rect x="344" y="60" width="30" height="90" fill="#f6f0e0"/><rect x="340" y="96" width="38" height="6" fill="#c8944a"/><rect x="347" y="72" width="24" height="5" fill="#c8944a"/><path d="M344,60h30l-15,-16z" fill="#c8944a"/><rect x="354" y="112" width="10" height="14" rx="5" fill="#6b5638"/></g>` +
    // 川辺の手すりと段
    band(150, 8, "#c2ab84") +
    `<g stroke="#5f5340" stroke-width="1.8" fill="none"><path d="M0,146h400M8,146v-8M48,146v-8M88,146v-8M128,146v-8M168,146v-8M248,146v-8M288,146v-8M328,146v-8M368,146v-8"/></g>` +
    // 静かな川と砂州
    river(158, "#5f5238", "#77653f", "#93805a") +
    ripple(172, "#d8c8a0", ".4") +
    `<path d="M250,210q30,-22 90,-24q40,-2 60,6v18z" fill="#d8b87f"/>` +
    `<path d="M280,202q30,-10 80,-12" stroke="#c9a877" stroke-width="2.4" opacity=".8" fill="none"/>` +
    // 岸につないだ小舟(蒸気船はもう来ない)
    canoa(60, 180, 1) +
    `<path d="M60,180q-2,-8 -8,-12" stroke="#5f4c33" stroke-width="1.4" fill="none"/>` +
    canoa(160, 192, 0.85) +
    egret(348, 188, 1) +
    bird(120, 40, 0.8) +
    bird(300, 30, 0.7),

  /**
   * 多雨の太平洋岸熱帯林(キブド・ブエナベントゥーラ・ヌキ・イスミナ)。
   * 舗装道路が無く、**川と雨だけが道。**
   */
  pacificrainforest:
    sky("#8a9aa0", "#c2ccc4", 70) +
    mist(120, 60, 100, ".55", "#dce4e0") +
    jungleBand(70, 20, "#1f4f34") +
    jungleBand(88, 18, "#265f3c") +
    jungleBand(104, 16, "#2d6b3f") +
    // 川
    river(116, "#3f4f3c", "#4f6248", "#5f7654") +
    ripple(134, "#a8c0a8", ".45") +
    // 岸の高床の家(右)
    stiltHouse(276, 158, 44, 30, "#8a7a4a", "#d8cbb0") +
    stiltHouse(330, 166, 40, 28, "#7a6a3f", "#c8bba0") +
    shade(300, 186, 30, 4, ".18") +
    // 岸辺(手前)
    `<path d="M0,182q90,-10 190,-4q110,6 210,-6v38H0z" fill="#4f6b48"/>` +
    jungleBand(196, 12, "#2d5f3f") +
    // 丸木舟で行き交う(左)
    canoa(76, 158, 1.1) +
    person(76, 156, 16, "#f5b31c") +
    arm(80, 148, 7, 8, "#8a6a4a") +
    `<path d="M87,156l4,12" stroke="#8a6b3a" stroke-width="2" fill="none"/>` +
    canoa(150, 174, 0.8) +
    // 雨と水面の輪
    rain(".5") +
    `<g stroke="#c2d4c8" stroke-width="1.4" opacity=".6" fill="none"><circle cx="60" cy="136" r="4"/><circle cx="120" cy="146" r="3"/><circle cx="250" cy="140" r="4"/><circle cx="330" cy="148" r="3"/></g>` +
    bird(40, 40, 0.9, "#2f3a32") +
    tuft(20, 206, 1.2, "#3f7048") +
    tuft(230, 204, 1.1, "#3f7048"),

  /**
   * 橋で結ばれた島の町(トゥマコ)。海の上の高床と、島へ渡る橋。
   */
  pacificisland:
    sky("#9ab0b8", "#e0dcc8", 84) +
    clouds(90, 30, 0.9, "#e8e8dc", ".8") +
    clouds(320, 22, 0.7, "#e8e8dc", ".6") +
    sea(84, "#3f6f7f", "#4f8290", "#5f98a0") +
    ripple(100, "#bfd8dc", ".5") +
    // 島(左)
    `<path d="M0,84v60q60,4 130,-2q-10,-28 -40,-42q-40,-16 -90,-16z" fill="#3f7048"/>` +
    tinHouse(16, 100, 34, 128, "#f2d88a", "#c8452f") +
    tinHouse(58, 106, 30, 130, "#f2ece0", "#8a4a30") +
    palm(110, 122, 30, 5) +
    // 橋(島から右へ)
    `<rect x="118" y="128" width="282" height="6" fill="#8a7454"/>` +
    `<rect x="118" y="134" width="282" height="2.4" fill="#5f4c33"/>` +
    `<g fill="#5f4c33">${[136, 172, 208, 244, 280, 316, 352, 388]
      .map((x) => `<rect x="${x}" y="136" width="5" height="26"/>`)
      .join("")}</g>` +
    `<g stroke="#6b5844" stroke-width="1.6" fill="none"><path d="M118,128h282" opacity=".6"/><path d="${[136, 208, 280, 352]
      .map((x) => `M${x},128v-8h36v8`)
      .join("")}"/></g>` +
    // 海上の高床の家(右手前)
    stiltHouse(296, 178, 46, 32, "#8a7a4a", "#e8dcc4") +
    stiltHouse(352, 186, 42, 30, "#7a6a3f", "#d8cbb0") +
    shade(320, 202, 30, 4, ".14") +
    // 手前の水と舟
    canoa(80, 182, 1.1) +
    person(80, 180, 15, "#e8443f") +
    skiff(180, 196, 1, "#3f6f9a") +
    ripple(168, "#bfd8dc", ".4") +
    bird(180, 36, 1) +
    bird(220, 46, 0.8) +
    bird(260, 30, 0.9),

  /**
   * 開けたリャノスの草原(ビジャビセンシオ・ヨパル・ラ・マカレナ)。
   * 地平線と巨大な空、モリチェヤシの島、遠くの牛。
   */
  llanosgrassland:
    sky("#8fc4e8", "#f0e8c8", 118) +
    sun(52, 34, 16, "#f5c84a") +
    thunderhead(260, 66, 1.4) +
    thunderhead(360, 78, 1) +
    clouds(150, 30, 0.8, "#f6efe2", ".6") +
    ground(118, "#9ab060") +
    band(118, 5, "#a8bc6a") +
    // モリチェヤシの島(左)
    palm(40, 132, 30, -3, "#3f8f52", "#8a7350") +
    palm(62, 134, 34, 4, "#2f7f4a", "#8a7350") +
    palm(84, 130, 26, 2, "#3f8f52", "#8a7350") +
    `<ellipse cx="62" cy="136" rx="42" ry="6" fill="#7a9a4f"/>` +
    // 遠くの牛の群れ(右)
    zebu(316, 142, 0.55) +
    zebu(340, 138, 0.5, "#d8c8b0") +
    zebu(362, 144, 0.6) +
    zebu(388, 140, 0.5, "#e0d4c0") +
    egret(300, 142, 0.7) +
    // 手前の草の海
    ground(158, "#8aa455") +
    band(158, 4, "#9ab060") +
    `<g stroke="#7a9a4f" stroke-width="2" opacity=".7" fill="none" stroke-linecap="round"><path d="M20,178q6,-8 4,-16M60,186q6,-8 4,-16M110,180q6,-8 4,-16M300,182q6,-8 4,-16M350,178q6,-8 4,-16M386,188q6,-8 4,-16"/></g>` +
    tuft(36, 202, 1.3) +
    tuft(94, 208, 1.2) +
    tuft(150, 204, 1.1) +
    tuft(250, 206, 1.2) +
    tuft(320, 202, 1.3) +
    tuft(384, 208, 1.1) +
    // 草を渡る風の筋と鳥
    `<g stroke="#c2cf8a" stroke-width="2" opacity=".6" fill="none"><path d="M120,168q20,-5 40,0M260,172q20,-5 40,0"/></g>` +
    bird(180, 50, 1, "#5a4a3a") +
    bird(220, 40, 0.9, "#5a4a3a") +
    bird(140, 60, 0.7, "#5a4a3a"),

  /**
   * 国境の川沿いの町(プエルト・カレーニョ・アラウカ)。広い川と
   * 花崗岩の岩(ラハ)、対岸は別の国。
   */
  llanosriverbank:
    sky("#98c0d8", "#ecdcb8", 96) +
    sun(340, 30, 14, "#f5c84a") +
    clouds(100, 28, 0.9) +
    band(96, 8, "#7a9a4f") +
    jungleBand(100, 10, "#3f7048") +
    river(104, "#4f4530", "#665738", "#7f6f48") +
    ripple(122, "#d8c8a0", ".45") +
    // 川の中の花崗岩のラハ(右)
    `<g fill="#8a8078"><path d="M290,140q20,-14 48,-12q26,2 40,14q-22,8 -44,8q-24,0 -44,-10z"/><path d="M330,158q16,-8 34,-6q14,2 22,8q-14,6 -28,6q-16,0 -28,-8z"/></g>` +
    `<g stroke="#6f665c" stroke-width="1.8" opacity=".6" fill="none"><path d="M300,138q20,-8 60,-6M340,158q16,-4 40,-2"/></g>` +
    // 手前の岸と町
    `<path d="M0,166q110,-10 220,-4q100,5 180,-4v52H0z" fill="#c9a877"/>` +
    ground(190, "#b8945f") +
    tinHouse(14, 148, 38, 178, "#f2ece0", "#c8452f") +
    tinHouse(60, 152, 34, 180, "#f2d88a", "#8a4a30") +
    shade(50, 180, 44, 5, ".16") +
    // 桟橋と舟
    jetty(250, 336, 156, 168) +
    skiff(360, 152, 0.9, "#c8452f") +
    canoa(120, 138, 0.9) +
    // 荷を下ろす人と荷
    person(268, 202, 21, "#5b8fe8") +
    arm(272, 190, 9, 4) +
    pumpjack(160, 204, 0.95) +
    shade(160, 205, 20, 3.4, ".14") +
    drum(298, 204, 0.9, "#4f6f8a") +
    crate(316, 206, 18, 13) +
    sack(346, 204, 1.1) +
    egret(90, 200, 1) +
    bird(160, 36, 0.9) +
    bird(200, 46, 0.8),

  /**
   * アンデス・アマゾン移行地帯の森(サン・ビセンテ・デル・カグアン・モコア・
   * フロレンシア・サン・ホセ・デル・グアビアレ)。山地が平らな森へ溶けていく。
   */
  amazonpiedmont:
    sky("#9ab8c0", "#dce4d0", 76) +
    clouds(80, 28, 0.9, "#e8ecdc", ".8") +
    jaggedRidge(76, 30, "#5f7a70", 2) +
    ground(94, "#3f7048") +
    mist(110, 88, 104, ".55") +
    // 左の丘から右の平原へ
    `<path d="M0,94v116h190q-16,-46 -60,-72q-56,-30 -130,-44z" fill="#457a44"/>` +
    `<path d="M400,120q-80,-6 -150,6q30,20 44,44q10,20 12,40h94z" fill="#3a7040"/>` +
    // 蛇行する川が森を抜ける(右)
    `<path d="M400,140q-60,2 -92,18q-24,12 -30,30q-4,14 -2,22h30q-2,-18 10,-30q16,-16 44,-22q22,-4 40,-4z" fill="#8f7a4e"/>` +
    `<path d="M330,182q16,-12 42,-16" stroke="#d8c8a0" stroke-width="2" opacity=".6" fill="none"/>` +
    // 森の樹冠
    broadTree(40, 150, 22, "#2d6b3f") +
    broadTree(84, 162, 26, "#265f3c") +
    broadTree(130, 176, 22, "#2d6b3f") +
    jungleBand(184, 14, "#255f36") +
    ground(196, "#265f3c") +
    // 手前のシダと大きな葉
    `<g stroke="#3f8f52" stroke-width="2.2" fill="none" stroke-linecap="round"><path d="M20,206q8,-16 22,-20M34,208q8,-14 20,-18M212,204q8,-16 22,-20M232,208q8,-14 20,-18"/></g>` +
    `<g fill="#3f8f52" opacity=".9"><ellipse cx="66" cy="196" rx="10" ry="4" transform="rotate(-28 66 196)"/><ellipse cx="258" cy="198" rx="10" ry="4" transform="rotate(24 258 198)"/></g>` +
    // 飛ぶコンゴウインコの対(赤がよく目立つ)
    `<g><path d="M310,60q6,-6 12,0q6,-6 12,0" stroke="#c8452f" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M336,74q5,-5 10,0q5,-5 10,0" stroke="#e8443f" stroke-width="2" fill="none" stroke-linecap="round"/></g>` +
    mist(320, 150, 80, ".4") +
    // 樹冠の中景(左右)
    broadTree(302, 208, 24, "#265f3c") +
    broadTree(366, 202, 20, "#2d6b3f") +
    `<g fill="#255f36"><ellipse cx="14" cy="132" rx="12" ry="8"/><ellipse cx="164" cy="188" rx="14" ry="9"/><ellipse cx="342" cy="132" rx="12" ry="8"/></g>` +
    tuft(110, 208, 1.1, "#3f8f52") +
    tuft(288, 206, 1, "#3f8f52") +
    `<g stroke="#8f7a4e" stroke-width="2" opacity=".6" fill="none"><path d="M340,196q14,-8 30,-10M352,204q12,-6 26,-8"/></g>` +
    bird(150, 40, 0.9) +
    bird(120, 52, 0.7),

  /**
   * 奥地の熱帯林を流れる川の町(レティシア・プエルト・イニリダ)。
   * 大河と森の壁、木の桟橋。**ここへは川と空からしか来られない。**
   */
  amazonriver:
    sky("#8fc4e8", "#e8e0c0", 84) +
    sun(60, 28, 14, "#f5c84a") +
    clouds(300, 26, 0.9) +
    // 森の壁と、樹冠を抜けるセイバの大樹
    jungleBand(84, 22, "#1f4f34") +
    jungleBand(102, 18, "#265f3c") +
    `<g><rect x="52" y="52" width="7" height="46" fill="#5a4630"/><ellipse cx="55" cy="48" rx="26" ry="12" fill="#2d6b3f"/><ellipse cx="38" cy="56" rx="13" ry="7" fill="#2d6b3f"/><ellipse cx="74" cy="54" rx="12" ry="7" fill="#2d6b3f"/></g>` +
    // 大河
    river(116, "#57482f", "#6f5c3b", "#8f7a4e") +
    ripple(134, "#d8c8a0", ".5") +
    // カワイルカの背(左)—淡い桃色の弧
    `<path d="M96,150q10,-8 20,0q-5,-3 -10,-3q-5,0 -10,3z" fill="#d8a0a0"/>` +
    `<circle cx="118" cy="150" r="1.6" fill="#c88a8a"/>` +
    // ペケペケ(長い棹の船外機の舟)
    canoa(72, 176, 1.2) +
    `<rect x="88" y="164" width="8" height="8" fill="#4a4438"/>` +
    person(66, 174, 16, "#f5b31c") +
    `<path d="M96,172l14,6" stroke="#5f4c33" stroke-width="2" fill="none"/>` +
    // 木の桟橋と川の店(右)
    jetty(258, 372, 152, 168) +
    stiltHouse(300, 150, 48, 32, "#8a7a4a", "#e8dcc4") +
    shade(324, 170, 32, 4, ".16") +
    `<g fill="#c8452f"><rect x="360" y="140" width="9" height="7"/></g>` +
    drum(276, 158, 0.8, "#4f6f8a") +
    sack(290, 158, 0.9) +
    // 手前の岸
    `<path d="M0,192q100,-8 200,-4q110,4 200,-6v28H0z" fill="#6b8a50"/>` +
    jungleBand(200, 10, "#3f7048") +
    tuft(40, 208, 1.1, "#3f7048") +
    tuft(220, 206, 1.2, "#3f7048") +
    // 流木と川鳥
    `<path d="M160,186q16,-3 30,0l-4,3q-12,2 -26,-3z" fill="#5a4630"/>` +
    bird(180, 36, 1) +
    bird(220, 28, 0.8) +
    bird(340, 40, 0.9),
};

// ---------------------------------------------------------------------------
// シンボル(24×24)
//
// **盤面では直径19pxほどの点にしかならない。**輪郭を優先し、主役は1つに絞る。
// 下端(y=24)が影の楕円に載るようにしておく。
//
// この盤面は似た題材が固まっているので、**先に描き分けを決めてある:**
//   川の乗り物4種  rapidsdock=白波と桟橋 / vehicleferry=平らな艀+車 /
//                  strandedriver=邸宅+痩せた水路 / orinococonfluence=2色の合流(俯瞰)
//   飛行機2種      cordillerabasin=山あいを飛ぶ水上機 / riverresort=プールに落ちる機影
//   索道2種        metrocable=赤い箱+斜面の家 / aerialcable=支柱+吊られた麻袋
//   石油3種        oilrefinery=銀の塔と炎 / oilboomtown=やぐら+新築ビル /
//                  borderoilfield=ポンプジャック+川
//   地震・再建3種  refoundedcity=古い基礎の上の新しい家 / bamboorebuild=竹の足場 /
//                  whitecityquake=白壁のひびとろうそく(deepquakenest は波形で別)
// ---------------------------------------------------------------------------

export const COLOMBIA_MARKS = {
  /** 急流サルト・デ・オンダと積み替えの桟橋(オンダ)。**船はここで止まる。** */
  rapidsdock:
    '<rect x="0" y="0" width="24" height="2.6" fill="#2d6b3f"/>' +
    '<rect x="0" y="2.6" width="24" height="9.4" fill="#2f7296"/>' +
    '<path d="M0,5q3,-2.6 6,0q3,2.6 6,0q3,-2.6 6,0q3,2.6 6,0v3.4q-3,2.6 -6,0q-3,-2.6 -6,0q-3,2.6 -6,0q-3,-2.6 -6,0z" fill="#eef6f8"/>' +
    '<path d="M2,10.4q2.4,-2 4.8,0M10,10.8q2.4,-2 4.8,0M17,10q2.4,-2 4.8,0" stroke="#bfe8f4" stroke-width="1.3" fill="none" stroke-linecap="round"/>' +
    '<g fill="#4a4038"><ellipse cx="4" cy="11.4" rx="2.8" ry="1.9"/><ellipse cx="19.6" cy="11" rx="2.6" ry="1.7"/></g>' +
    '<rect x="0" y="12" width="24" height="12" fill="#c9a877"/>' +
    '<rect x="1.6" y="13.6" width="10" height="8.4" fill="#b8a488"/>' +
    '<path d="M0.6,13.6h12l-2,-3.4h-8z" fill="#8a4a30"/>' +
    '<path d="M4.4,22v-4.4a2.2,2.2 0 0 1 4.4,0v4.4z" fill="#5f4c33"/>' +
    '<rect x="13.6" y="14.6" width="10.4" height="2" fill="#8a7454"/>' +
    '<path d="M15.4,16.6v4M20.6,16.6v4" stroke="#5f4c33" stroke-width="1.4" fill="none"/>' +
    '<rect x="0" y="22.6" width="24" height="1.4" fill="#a8925f"/>',

  /** 山に囲まれた高原を飛ぶSCADTAの水上機(ボゴタ)。 */
  cordillerabasin:
    '<rect x="0" y="0" width="24" height="18" fill="#bfd8ec"/>' +
    '<path d="M-1,18L5,9l6,9z" fill="#4f7048"/>' +
    '<path d="M13,18l6,-9l6,9z" fill="#456b44"/>' +
    '<rect x="0" y="18" width="24" height="6" fill="#8a9a5a"/>' +
    '<path d="M0,18q6,-1.4 12,0q6,1.4 12,-0.6v2H0z" fill="#9aa864"/>' +
    // 機体は大きく・白く・輪郭を濃く(19pxで潰れないように)
    '<path d="M2.6,7.4q1.4,-2.6 5,-2.6h11l4,-2.8v4.8q-2,1.4 -4.8,1.4h-11q-3.4,0 -4.2,-0.8z" fill="#f2efe4" stroke="#6b6862" stroke-width="0.7"/>' +
    '<path d="M5.4,6l10.6,2.2v2l-10.6,-2z" fill="#c8c4b4"/>' +
    '<rect x="6.4" y="3" width="3.4" height="2" fill="#3f4a56"/>' +
    '<g fill="#7a7f82" stroke="#5f6266" stroke-width="0.6"><path d="M4.4,13.4h8l1.8,-2h-8q-1.8,0 -1.8,2z"/><path d="M15,13.4h6l1.8,-2h-6q-1.8,0 -1.8,2z"/></g>' +
    '<path d="M7.4,9.4v2M12,9.8v1.6M17.4,9.4v2" stroke="#5f6266" stroke-width="1" fill="none"/>' +
    '<path d="M19.6,4.4l2.6,-2.6l1,3z" fill="#c8452f"/>',

  /** 斜面をのぼるメトロカブレのゴンドラ(メデジン)。 */
  metrocable:
    '<rect x="0" y="0" width="24" height="24" fill="#bfd8ec"/>' +
    '<path d="M0,24l24,-14v14z" fill="#4f7048"/>' +
    '<g><rect x="3" y="17.6" width="5" height="3.6" fill="#a85a3a"/><rect x="10" y="20" width="5" height="3.4" fill="#b06a45"/><rect x="17" y="21.4" width="5" height="2.6" fill="#a85a3a"/><rect x="4.4" y="18.6" width="1.6" height="1.4" fill="#f0d8a8"/><rect x="11.4" y="21" width="1.6" height="1.4" fill="#f0d8a8"/></g>' +
    '<path d="M0,14L24,3" stroke="#4a4a44" stroke-width="1.2" fill="none"/>' +
    '<path d="M12.5,8.2v-2.4" stroke="#33302c" stroke-width="1.4" fill="none"/>' +
    '<rect x="7.6" y="8.2" width="10" height="8" rx="2" fill="#c8452f"/>' +
    '<rect x="8.8" y="10" width="7.6" height="3.4" rx="1" fill="#cfe4f0"/>' +
    '<path d="M7.6,14.4h10" stroke="#8a2f24" stroke-width="1.2"/>',

  /** カウカ渓谷を港へ下る線路とサトウキビ(カリ)。 */
  railtoport:
    '<rect x="0" y="0" width="24" height="24" fill="#88a446"/>' +
    '<g stroke="#98b452" stroke-width="1.6" opacity=".9" fill="none"><path d="M2,6v-5M6,7v-5M18,6v-5M22,7v-5M2,22v-5M20,23v-5"/></g>' +
    '<g stroke="#a8b85a" stroke-width="1.2" fill="none"><path d="M4,2q1.4,-1.6 2.8,-2M20,2q1.4,-1.6 2.8,-2"/></g>' +
    '<path d="M8,24L16,0h2.4L10.8,24z" fill="#b09a68"/>' +
    '<path d="M11.4,24L18.6,0h1.2L12.8,24z" fill="#c2ab72"/>' +
    '<g stroke="#6b5a3a" stroke-width="1.3" fill="none"><path d="M8.6,21h5.4M9.8,17.4h5.2M11,13.8h5M12.2,10.2h4.8M13.4,6.6h4.6M14.6,3h4.4"/></g>' +
    '<g stroke="#8a8f92" stroke-width="1.1" fill="none"><path d="M9.2,24L17,0M12.4,24L19.6,0"/></g>',

  /** コーヒー袋を運ぶ索道のゴンドラ(マニサレス)。 */
  aerialcable:
    '<rect x="0" y="0" width="24" height="17" fill="#bfd8ec"/>' +
    '<path d="M0,17q6,-8 12,-9q7,-1 12,4v5z" fill="#3f7048"/>' +
    '<rect x="0" y="17" width="24" height="7" fill="#2d6b3f"/>' +
    '<g fill="#255f36"><ellipse cx="4" cy="18.6" rx="2.6" ry="2"/><ellipse cx="10" cy="20" rx="2.6" ry="2"/><ellipse cx="16.6" cy="19" rx="2.6" ry="2"/><ellipse cx="21.6" cy="20.6" rx="2.4" ry="1.8"/></g>' +
    '<path d="M2.6,14V4.6M2.6,4.6l3,3M2.6,4.6l-2.4,3" stroke="#5a4630" stroke-width="1.5" fill="none"/>' +
    '<path d="M21,12V3M21,3l2.6,2.6M21,3l-3,2.6" stroke="#5a4630" stroke-width="1.5" fill="none"/>' +
    '<path d="M0,6.4Q12,2 24,4.4" stroke="#4a4a44" stroke-width="1.2" fill="none"/>' +
    '<path d="M12,3.4v2.6" stroke="#33302c" stroke-width="1.3" fill="none"/>' +
    '<path d="M8.6,6v6.4q0,2.6 3.4,2.6q3.4,0 3.4,-2.6V6z" fill="#c8a86a"/>' +
    '<path d="M8.6,8h6.8" stroke="#8a6b3a" stroke-width="1.2"/>' +
    '<path d="M10,6q2,-2 4,0" stroke="#8a6b3a" stroke-width="1.4" fill="none"/>',

  /** 古い基礎の上に建て直された町(ペレイラ)。 */
  refoundedcity:
    '<rect x="0" y="0" width="24" height="10" fill="#cfe4f0"/>' +
    '<rect x="0" y="16" width="24" height="8" fill="#9a9284"/>' +
    '<g fill="#6f675e"><rect x="1.6" y="17.4" width="5.4" height="6.6"/><rect x="9.4" y="17.4" width="5.4" height="6.6"/><rect x="17.2" y="17.4" width="5.2" height="6.6"/></g>' +
    '<g stroke="#5a544c" stroke-width="0.9" opacity=".8" fill="none"><path d="M1.6,20.6h5.4M9.4,20.6h5.4M17.2,20.6h5.2"/></g>' +
    '<rect x="0" y="15" width="24" height="1.6" fill="#4a4640"/>' +
    '<rect x="2.4" y="7" width="8.6" height="8" fill="#f2ece0"/>' +
    '<path d="M1,7h11.4l-2,-3.4H3z" fill="#c8452f"/>' +
    '<rect x="4.4" y="9.4" width="2.4" height="2.6" fill="#5f7f96"/>' +
    '<rect x="8" y="9.4" width="2.4" height="2.6" fill="#5f7f96"/>' +
    '<rect x="13.6" y="5.4" width="8.6" height="9.6" fill="#e8dcc4"/>' +
    '<path d="M12.2,5.4h11.4l-2,-3.4h-7.4z" fill="#b0543a"/>' +
    '<rect x="15.6" y="8" width="2.4" height="2.6" fill="#5f7f96"/>' +
    '<rect x="19.2" y="8" width="2.4" height="2.6" fill="#5f7f96"/>',

  /** グアドゥア竹の足場に囲まれた建て直し(アルメニア)。 */
  bamboorebuild:
    '<rect x="0" y="0" width="24" height="20" fill="#cfe4f0"/>' +
    '<rect x="0" y="20" width="24" height="4" fill="#b8a882"/>' +
    '<rect x="5" y="8" width="14" height="12" fill="#e8dcc4"/>' +
    '<path d="M3.6,8h16.8l-3,-4.4H6.6z" fill="#b0543a"/>' +
    '<rect x="10.4" y="13.6" width="3.6" height="6.4" fill="#6b5330"/>' +
    '<g stroke="#9aa84f" stroke-width="1.6" fill="none"><path d="M2.4,22V2.6M8,22V1.6M16,22V1.6M21.6,22V2.6"/></g>' +
    '<g stroke="#8f9a44" stroke-width="1.4" fill="none"><path d="M0.8,6h22.4M0.8,12h22.4M0.8,18h22.4"/></g>' +
    '<g stroke="#7f8a3a" stroke-width="0.8" fill="none"><path d="M2.4,9h0M1.6,6.4l1.6,0M7.2,12.4l1.6,0M15.2,6.4l1.6,0M20.8,12.4l1.6,0"/></g>',

  /** 崖際の町と地震計の針(ブカラマンガ)。**巣のように地震が湧く深さ。** */
  deepquakenest:
    '<rect x="0" y="0" width="24" height="13" fill="#bfd8ec"/>' +
    '<path d="M0,13q7,-2 12,-6q6,-4 12,-4v10z" fill="#c99a68"/>' +
    '<g><rect x="14" y="4.4" width="7" height="4.6" fill="#f2ece0"/><path d="M13,4.4h9l-1.6,-2.6h-6z" fill="#b0543a"/><rect x="16.6" y="6" width="2" height="2" fill="#5f7f96"/></g>' +
    '<rect x="0" y="13" width="24" height="11" fill="#efe8d8"/>' +
    '<path d="M0,14.4h24" stroke="#c8bfa8" stroke-width="0.8"/>' +
    '<path d="M0,21h24" stroke="#c8bfa8" stroke-width="0.8"/>' +
    '<path d="M0,18h3l1.6,-2.6l2,5l2.4,-8l2.6,10l2.4,-7l2,4l1.6,-2.4h5.4" stroke="#c8342f" stroke-width="1.6" fill="none" stroke-linejoin="round"/>' +
    '<circle cx="12" cy="15" r="1.2" fill="#c8342f"/>',

  /** 彩色された植民地聖堂の天井文様(トゥンハ)。 */
  paintedceiling:
    '<rect x="0" y="0" width="24" height="24" fill="#8a3a2c"/>' +
    '<rect x="1.6" y="1.6" width="20.8" height="20.8" fill="none" stroke="#f5b31c" stroke-width="1.2"/>' +
    '<circle cx="12" cy="12" r="6.6" fill="#c8944a"/>' +
    '<circle cx="12" cy="12" r="6.6" fill="none" stroke="#f5b31c" stroke-width="1.1"/>' +
    '<g fill="#f2e8d0"><path d="M12,7.4l1.2,3.4l3.4,1.2l-3.4,1.2l-1.2,3.4l-1.2,-3.4l-3.4,-1.2l3.4,-1.2z"/></g>' +
    '<circle cx="12" cy="12" r="1.4" fill="#c8452f"/>' +
    '<g stroke="#f5b31c" stroke-width="1.1" fill="none" stroke-linecap="round"><path d="M3.4,3.4q3,1.6 4,4.6M20.6,3.4q-3,1.6 -4,4.6M3.4,20.6q3,-1.6 4,-4.6M20.6,20.6q-3,-1.6 -4,-4.6"/></g>' +
    '<g fill="#4f7f6a"><circle cx="4.6" cy="4.6" r="1.3"/><circle cx="19.4" cy="4.6" r="1.3"/><circle cx="4.6" cy="19.4" r="1.3"/><circle cx="19.4" cy="19.4" r="1.3"/></g>',

  /** 白い町のひびと、聖週間のろうそく(ポパヤン)。 */
  whitecityquake:
    '<rect x="0" y="0" width="24" height="7" fill="#9ab4c8"/>' +
    '<rect x="1.6" y="7" width="20.8" height="17" fill="#f2ece0"/>' +
    '<path d="M0.4,7h23.2l-2.6,-3.6H3z" fill="#a85a3a"/>' +
    '<rect x="4.4" y="10" width="4" height="5" rx="2" fill="#5f7f96"/>' +
    '<rect x="15.6" y="10" width="4" height="5" rx="2" fill="#5f7f96"/>' +
    '<path d="M12,7.4l-1.4,4.4l2,3.4l-1.6,4l1,4.8" stroke="#8a8578" stroke-width="1.1" fill="none"/>' +
    '<path d="M10.6,11.8l-2.6,1.6M12.6,15.2l2.4,1.8" stroke="#8a8578" stroke-width="0.9" fill="none"/>' +
    '<g><rect x="4.6" y="18.6" width="2.2" height="5" fill="#f2e8c8"/><ellipse cx="5.7" cy="17.6" rx="1" ry="1.6" fill="#f5b31c"/><rect x="17.2" y="19.4" width="2.2" height="4.2" fill="#f2e8c8"/><ellipse cx="18.3" cy="18.4" rx="1" ry="1.6" fill="#f5b31c"/></g>',

  /** 霧の山道とトンネルの坑口(イバゲ=キンディオ峠)。 */
  mountaintunnel:
    '<rect x="0" y="0" width="24" height="14" fill="#bfd8ec"/>' +
    '<path d="M-1,14L8,2l8,12z" fill="#4f7048"/>' +
    '<path d="M10,14l7,-9l8,9z" fill="#456b44"/>' +
    '<rect x="0" y="14" width="24" height="10" fill="#5f8450"/>' +
    '<path d="M4,24v-7.4a5,5 0 0 1 10,0V24z" fill="#33302c"/>' +
    '<path d="M4,24v-7.4a5,5 0 0 1 10,0V24l-2,0v-7a3,3 0 0 0 -6,0v7z" fill="#8a8578"/>' +
    '<g fill="#e8eee8" opacity=".85"><ellipse cx="6" cy="8.6" rx="5" ry="1.8"/><ellipse cx="19" cy="6" rx="4.4" ry="1.6"/></g>' +
    '<path d="M16.6,23.4q3,-4.4 6.4,-5.4" stroke="#c2ab72" stroke-width="1.8" fill="none"/>',

  /** 赤い浸食地形と天文の望遠鏡(ネイバ=タタコア)。 */
  desertbadlands:
    '<rect x="0" y="0" width="24" height="15" fill="#2f3a5f"/>' +
    '<g fill="#e8ecf0"><circle cx="4" cy="3.4" r="0.9"/><circle cx="9" cy="6" r="0.7"/><circle cx="14.6" cy="2.6" r="0.8"/><circle cx="20" cy="5" r="0.7"/><circle cx="17.6" cy="8.4" r="0.6"/></g>' +
    '<rect x="0" y="15" width="24" height="9" fill="#b06a3a"/>' +
    '<g fill="#c98a5f"><path d="M1.4,15.4v-4q0,-2 2.2,-2q2.2,0 2.2,2v4z"/><path d="M18.4,15.4v-3.4q0,-2 2.2,-2q2.2,0 2.2,2v3.4z"/></g>' +
    '<path d="M2.6,15v-3.4M20,15v-3" stroke="#8f5230" stroke-width="0.9" fill="none"/>' +
    '<path d="M8,15.6v6M16,15.6v6M8,21.6h8" stroke="#e8e4d4" stroke-width="1.6" fill="none"/>' +
    '<path d="M9,15l6.4,-7l1.8,1.6l-6.4,7z" fill="#d8d4c4"/>' +
    '<circle cx="16.2" cy="7.2" r="1.4" fill="#8a8f92"/>',

  /** 川辺のプールに落ちる水上機の影(ジラルドット)。 */
  riverresort:
    '<rect x="0" y="0" width="24" height="24" fill="#d8b87f"/>' +
    '<rect x="2" y="3" width="20" height="18" rx="3" fill="#5b9fc8"/>' +
    '<rect x="3.6" y="4.6" width="16.8" height="14.8" rx="2" fill="#8fd0e8"/>' +
    '<g stroke="#c8ecf6" stroke-width="1" opacity=".8" fill="none"><path d="M5.4,8q2.4,-1.4 4.8,0M13,10q2.4,-1.4 4.8,0M6.4,14q2.4,-1.4 4.8,0M12.6,16.6q2.4,-1.4 4.8,0"/></g>' +
    '<g fill="#2f5f7a" opacity=".85"><path d="M11,6.4h2.2v4.4l4.4,2v1.8l-4.4,-1v3l1.8,1.4v1.2l-2.9,-0.8l-2.9,0.8v-1.2l1.8,-1.4v-3l-4.4,1v-1.8l4.4,-2z"/></g>' +
    '<path d="M2,10.4h1.6M2,14.4h1.6" stroke="#e8e4d4" stroke-width="1.2" fill="none"/>',

  /** 岩塩の壁に彫られた十字架(シパキラの塩の大聖堂)。 */
  saltcathedral:
    '<rect x="0" y="0" width="24" height="24" fill="#3a3444"/>' +
    '<path d="M0,0h24v3q-6,2.4 -12,2.4q-6,0 -12,-2.4z" fill="#2b2634"/>' +
    '<g stroke="#5f566b" stroke-width="1.2" opacity=".8" fill="none"><path d="M2,4q-0.6,8 0,18M22,4q0.6,8 0,18M5.4,3q-1,9 -0.4,20M18.6,3q1,9 0.4,20"/></g>' +
    '<rect x="10" y="5" width="4" height="15" fill="#cfd8e8"/>' +
    '<rect x="5.6" y="9" width="12.8" height="4" fill="#cfd8e8"/>' +
    '<rect x="10.6" y="5.6" width="2.8" height="13.8" fill="#eef2fa"/>' +
    '<rect x="6.2" y="9.6" width="11.6" height="2.8" fill="#eef2fa"/>' +
    '<ellipse cx="12" cy="22" rx="7" ry="1.8" fill="#8a90a8" opacity=".6"/>',

  /** 石畳の広場と首長竜の骨格(ビジャ・デ・レイバ)。 */
  fossilplaza:
    '<rect x="0" y="0" width="24" height="24" fill="#c2ab84"/>' +
    '<g fill="#b09a72" opacity=".8"><ellipse cx="4" cy="4" rx="3" ry="1.6"/><ellipse cx="12" cy="2.6" rx="3" ry="1.6"/><ellipse cx="20" cy="4.4" rx="3" ry="1.6"/><ellipse cx="3" cy="21" rx="3" ry="1.6"/><ellipse cx="21" cy="20.6" rx="3" ry="1.6"/></g>' +
    '<path d="M3,16q1,-6.4 6.4,-6.4q4.4,0 6.4,3.2q2,3 4.6,3q2,0 3,-2.2" stroke="#f6f2e8" stroke-width="3.2" fill="none" stroke-linecap="round"/>' +
    '<circle cx="21.8" cy="12.2" r="2.2" fill="#f6f2e8"/>' +
    '<g stroke="#f6f2e8" stroke-width="2.2" fill="none" stroke-linecap="round"><path d="M5.2,15.4v3.6M8,13.2v5.2M10.8,12.4v5.6M13.6,13.4v4.8M16.4,14.6v3.4"/></g>' +
    '<path d="M6,10.4l-2.8,-2.2M15.6,12.2l-1.8,-3" stroke="#f6f2e8" stroke-width="2.2" fill="none" stroke-linecap="round"/>',

  /** 荷を山積みにしたウィリス・ジープ(サレント)。 */
  willysjeep:
    '<rect x="0" y="0" width="24" height="17" fill="#cfe4f0"/>' +
    '<rect x="0" y="17" width="24" height="7" fill="#b09a68"/>' +
    '<g fill="#c8a86a"><path d="M5,8.6v-3q0,-1.6 1.6,-1.6h2q1.6,0 1.6,1.6v3z"/><path d="M10.6,8.6v-4q0,-1.6 1.6,-1.6h2q1.6,0 1.6,1.6v4z"/><path d="M16.2,8.6v-2.6q0,-1.6 1.6,-1.6h1.4q1.6,0 1.6,1.6v2.6z"/></g>' +
    '<path d="M4.4,9h16.6" stroke="#8a6b3a" stroke-width="1.3"/>' +
    '<path d="M3.4,15.4v-4q0,-1.8 2,-1.8h13.8q2.4,0 3.2,2l0.8,2v1.8z" fill="#4f7048"/>' +
    '<path d="M15.6,9.8l1.2,3h4.4q-0.6,-2.4 -2.4,-3z" fill="#cfe4f0"/>' +
    '<rect x="2.6" y="15" width="20.8" height="3.4" rx="1" fill="#3f5f3a"/>' +
    '<g fill="#2f2b26"><circle cx="7" cy="18.8" r="2.6"/><circle cx="18" cy="18.8" r="2.6"/></g>' +
    '<g fill="#8a8f92"><circle cx="7" cy="18.8" r="1"/><circle cx="18" cy="18.8" r="1"/></g>' +
    '<rect x="21.2" y="12.4" width="1.6" height="1.6" fill="#f5b31c"/>',

  /** 製油所の塔と川の艀(バランカベルメハ)。 */
  oilrefinery:
    '<rect x="0" y="0" width="24" height="17" fill="#c2ccd4"/>' +
    '<rect x="0" y="17" width="24" height="7" fill="#6f5c3b"/>' +
    '<path d="M2,20q4,-1.6 8,0M13,21q4,-1.6 8,0" stroke="#d8c8a0" stroke-width="1" fill="none" opacity=".7"/>' +
    '<rect x="3" y="5" width="4.4" height="12" rx="1.6" fill="#8a9298"/>' +
    '<rect x="9.4" y="2.6" width="4.4" height="14.4" rx="1.6" fill="#9aa2a8"/>' +
    '<rect x="15.8" y="6.4" width="3.4" height="10.6" rx="1.4" fill="#8a9298"/>' +
    '<g stroke="#6f767c" stroke-width="1" fill="none"><path d="M3,9h10.8M3,13h16.2M13.8,5.4h5.4"/></g>' +
    '<path d="M21.4,17V6.4" stroke="#6f767c" stroke-width="1.6" fill="none"/>' +
    '<path d="M21.4,6.4q-1.6,-2.4 0,-4.4q1.6,2 0,4.4z" fill="#f5b31c"/>' +
    '<path d="M21.4,4.4q-0.8,-1.2 0,-2.4q0.8,1.2 0,2.4z" fill="#e8443f"/>' +
    '<path d="M2.6,21.4h9l-1.4,2.2H4z" fill="#5a4630"/>',

  /** 海へ長く延びた桟橋と線路(プエルト・コロンビア)。**一時は世界最長。** */
  longpier:
    '<rect x="0" y="0" width="24" height="10" fill="#bfe0ee"/>' +
    '<rect x="0" y="10" width="24" height="14" fill="#3f92ae"/>' +
    '<path d="M2,13q2.6,-1.6 5.2,0M14,14.6q2.6,-1.6 5.2,0M6,18.6q2.6,-1.6 5.2,0M16,20.6q2.6,-1.6 5.2,0" stroke="#bfe8f4" stroke-width="1.1" fill="none" stroke-linecap="round"/>' +
    '<path d="M8.4,24L11.2,7h1.6L15.6,24z" fill="#8a7454"/>' +
    '<path d="M9.6,24L11.6,9h0.8L14.4,24z" fill="#a8905f"/>' +
    '<g stroke="#5f4c33" stroke-width="1.2" fill="none"><path d="M9.2,21.4h5.6M9.8,18h4.8M10.3,14.6h3.8M10.8,11.4h2.8M11.2,8.8h1.8"/></g>' +
    '<g stroke="#4a3a28" stroke-width="0.9" fill="none"><path d="M9.4,24L11.5,7.4M14.6,24L12.6,7.4"/></g>' +
    '<rect x="10.6" y="5" width="2.8" height="2.4" fill="#8a4a30"/>',

  /** 川口を絞る2本の突堤(バランキージャ=ボカス・デ・セニサ)。俯瞰。 */
  goldengate:
    '<rect x="0" y="0" width="24" height="8" fill="#1f5f8f"/>' +
    '<path d="M0,2.6q4,-1.4 8,0M15,3.6q4,-1.4 8,0" stroke="#bfe8f4" stroke-width="1" fill="none" opacity=".8"/>' +
    '<rect x="0" y="8" width="24" height="16" fill="#9a7f52"/>' +
    '<path d="M2,13q4,-1.4 8,0M13,17q4,-1.4 8,0M4,21q4,-1.4 8,0" stroke="#d8c8a0" stroke-width="1" fill="none" opacity=".7"/>' +
    // 突堤は角ばった2本の帯。あいだの水路だけが開く
    '<path d="M0,24V8.4h3.4q2.6,0 3.4,2.6l2.2,7.4l1,5.6z" fill="#5f5a4a"/>' +
    '<path d="M24,24V8.4h-3.4q-2.6,0 -3.4,2.6l-2.2,7.4l-1,5.6z" fill="#524d3e"/>' +
    '<g stroke="#8a857a" stroke-width="1" fill="none"><path d="M1.4,8.6V24M5,10l2.4,8.4l1,5.4M22.6,8.6V24M19,10l-2.4,8.4l-1,5.4"/></g>' +
    // 水路をとおる船(白い船体を大きく)
    '<path d="M9.4,17.4h5.4l-1,3.4h-3.4z" fill="#f2efe4"/>' +
    '<rect x="10.8" y="12.6" width="2.6" height="4.8" fill="#c8452f"/>' +
    '<path d="M12,12.6v-2" stroke="#33302c" stroke-width="1" fill="none"/>',

  /** 大砲を備えた石造りの要塞壁(カルタヘナ)。 */
  stonefort:
    '<rect x="0" y="0" width="24" height="10" fill="#bfe0ee"/>' +
    '<rect x="0" y="10" width="24" height="14" fill="#b8a888"/>' +
    '<g fill="#a89474"><rect x="0.6" y="8" width="4.4" height="3"/><rect x="7" y="8" width="4.4" height="3"/><rect x="13.4" y="8" width="4.4" height="3"/><rect x="19.8" y="8" width="4" height="3"/></g>' +
    '<g stroke="#8f7c5e" stroke-width="1" opacity=".7" fill="none"><path d="M0,14h24M0,18h24M6,11v13M12,11v13M18,11v13"/></g>' +
    '<path d="M17.4,10v-6q0,-2.4 2.6,-2.4q2.6,0 2.6,2.4v6z" fill="#c2ab84"/>' +
    '<path d="M20,1.6q3,0.6 2.6,3q-2.6,-1 -5.2,0q-0.4,-2.4 2.6,-3z" fill="#a89060"/>' +
    '<rect x="19" y="5.4" width="2" height="3" rx="1" fill="#5f5340"/>' +
    '<path d="M4,6.4l6,-1.6l0.4,1.8l-6,1.6z" fill="#3a3a34"/>' +
    '<circle cx="4" cy="7.4" r="1.6" fill="#33302c"/>',

  /** 浜のすぐ後ろにそびえる雪山(サンタ・マルタ)。 */
  snowcoast:
    '<rect x="0" y="0" width="24" height="13" fill="#bfd8ec"/>' +
    '<path d="M1,13L9,1.6L17,13z" fill="#7a8a92"/>' +
    '<path d="M6.4,5.4L9,1.6l2.8,4l-1.2,1l-1.6,-1.2l-1.4,1.2z" fill="#f2f6f8"/>' +
    '<path d="M12,13l6,-8l6,8z" fill="#8a98a0"/>' +
    '<path d="M16.4,7.6L18,5l1.8,2.8l-1,0.8l-0.9,-0.8l-0.8,0.8z" fill="#f2f6f8"/>' +
    '<rect x="0" y="13" width="24" height="4" fill="#4f7048"/>' +
    '<rect x="0" y="16" width="24" height="3" fill="#efe2c6"/>' +
    '<rect x="0" y="19" width="24" height="5" fill="#3f92ae"/>' +
    '<path d="M2,20.6q3,-1.6 6,0M13,21.6q3,-1.6 6,0" stroke="#bfe8f4" stroke-width="1.2" fill="none" stroke-linecap="round"/>' +
    '<path d="M19,16.4q1.6,-3.4 1.2,-6" stroke="#7a6247" stroke-width="1" fill="none"/>' +
    '<path d="M20.2,10.4q-2.4,-0.6 -3.4,1q2,-0.2 3.4,0.6q1.4,-0.8 3.4,-0.6q-1,-1.6 -3.4,-1z" fill="#2f7f4a"/>',

  /** 真珠採りの潜水(リオアチャ)。潜る人と貝と、上に帆。 */
  pearldive:
    '<rect x="0" y="0" width="24" height="5" fill="#bfe0ee"/>' +
    '<rect x="0" y="5" width="24" height="19" fill="#2f7fa8"/>' +
    '<rect x="0" y="10" width="24" height="14" fill="#26688f"/>' +
    '<path d="M4,5q-2,-2 -1,-4l7,2.4l-1,1.6z" fill="#efe8d8"/>' +
    '<path d="M2,5.6q4,2 8,0q-2,1.6 -4,1.6q-2,0 -4,-1.6z" fill="#6b5330"/>' +
    '<g fill="#c98f5f"><circle cx="14" cy="10" r="1.8"/><path d="M12.6,11.4l3,1l3.4,3.4l-1.4,1.4l-3,-2.8l-2.6,-0.8q-1.4,-0.6 -0.8,-2z"/><path d="M13,12.6l-2.6,2l1,1.4l2.4,-1.6z"/></g>' +
    '<path d="M17.4,16.4l2.6,2.6M11.6,15.6l-1.6,2.4" stroke="#c98f5f" stroke-width="1.4" fill="none" stroke-linecap="round"/>' +
    '<g stroke="#bfe8f4" stroke-width="0.9" opacity=".7" fill="none"><circle cx="9.4" cy="8" r="0.9"/><circle cx="11" cy="6.4" r="0.7"/></g>' +
    '<path d="M4.4,21.6q0,-2.6 2.6,-2.6q2.6,0 2.6,2.6q-1.3,1 -2.6,1q-1.3,0 -2.6,-1z" fill="#e8dcc4"/>' +
    '<path d="M5,20.6q2,-1 4,0" stroke="#b8a482" stroke-width="0.8" fill="none"/>' +
    '<circle cx="7" cy="20.4" r="1" fill="#f6f2e8"/>',

  /** アコーディオンとカハ(バジェドゥパル=バジェナートの音)。 */
  accordion:
    '<rect x="0" y="0" width="24" height="18" fill="#f0e4c0"/>' +
    '<rect x="0" y="18" width="24" height="6" fill="#c9a877"/>' +
    '<rect x="2.6" y="4" width="5" height="13" rx="1.4" fill="#c8342f"/>' +
    '<g fill="#f2ece0"><rect x="3.6" y="6" width="1.4" height="2.2"/><rect x="5.6" y="6" width="1.4" height="2.2"/><rect x="3.6" y="9.4" width="1.4" height="2.2"/><rect x="5.6" y="9.4" width="1.4" height="2.2"/><rect x="3.6" y="12.8" width="1.4" height="2.2"/></g>' +
    '<path d="M7.6,5h6.8v11H7.6z" fill="#e8dcc4"/>' +
    '<g stroke="#b0543a" stroke-width="1.2" fill="none"><path d="M8.8,5v11M10.4,5v11M12,5v11M13.6,5v11"/></g>' +
    '<rect x="14.4" y="4" width="4.6" height="13" rx="1.4" fill="#c8342f"/>' +
    '<g fill="#33302c"><circle cx="16" cy="6.6" r="0.8"/><circle cx="17.8" cy="6.6" r="0.8"/><circle cx="16" cy="9.4" r="0.8"/><circle cx="17.8" cy="9.4" r="0.8"/><circle cx="16" cy="12.2" r="0.8"/><circle cx="17.8" cy="12.2" r="0.8"/></g>' +
    '<path d="M20.2,19.4v-3.6a2.6,2.6 0 0 1 3.2,0v3.6z" fill="#b08a4f"/>' +
    '<path d="M20.2,15.8a2.6,2.6 0 0 1 3.2,0" stroke="#e8dcc4" stroke-width="1.2" fill="none"/>',

  /** 氾濫原に広がるセヌーの水路網(モンテリア)。俯瞰の魚骨。 */
  zenucanals:
    '<rect x="0" y="0" width="24" height="24" fill="#7a9a4f"/>' +
    '<g fill="#8aa455" opacity=".8"><rect x="1" y="2" width="9" height="8" rx="1"/><rect x="14" y="3" width="9" height="7" rx="1"/><rect x="2" y="14" width="8" height="8" rx="1"/><rect x="15" y="15" width="8" height="7" rx="1"/></g>' +
    '<path d="M11,0.6q1.6,11.4 0.4,22.8" stroke="#4f8fae" stroke-width="2.4" fill="none"/>' +
    '<g stroke="#4f8fae" stroke-width="1.5" fill="none"><path d="M11.4,4.4L2,2M11.6,8.4L1.6,7.4M11.8,12.4L2,13.4M11.8,16.4L2.6,19M11.4,4.4L21,2.6M11.6,8.4l10.4,-0.4M11.8,12.4l9.8,1.4M11.8,16.4l8.8,3"/></g>' +
    '<g stroke="#6f9a44" stroke-width="0.9" opacity=".9" fill="none"><path d="M4,4.4l4,1M4.4,9l4,0.4M16,5l4,-0.6M16.4,9.4l4,0.4M4.4,16l4,0.6M16,16.6l4,1"/></g>',

  /** 増水した水面に立つ高床の家(シンセレホ=モハーナ)。 */
  floodstilts:
    '<rect x="0" y="0" width="24" height="8" fill="#cfe4f0"/>' +
    '<rect x="0" y="8" width="24" height="16" fill="#6f8f9a"/>' +
    '<path d="M2,11q3,-1.6 6,0M14,12q3,-1.6 6,0M5,16q3,-1.6 6,0M14,18.6q3,-1.6 6,0M3,21q3,-1.6 6,0" stroke="#bfd8dc" stroke-width="1.2" fill="none" stroke-linecap="round"/>' +
    '<g fill="#5a4630"><rect x="6" y="12.4" width="1.6" height="7"/><rect x="11.2" y="12.4" width="1.6" height="7"/><rect x="16.4" y="12.4" width="1.6" height="7"/></g>' +
    '<rect x="4.4" y="11" width="15.2" height="2" fill="#6b5330"/>' +
    '<rect x="5.4" y="4.4" width="13.2" height="6.6" fill="#e8dcc4"/>' +
    '<path d="M3.6,4.4h16.8L12,0.4z" fill="#8a7a4a"/>' +
    '<rect x="10.6" y="6.4" width="2.8" height="4.6" fill="#6b5330"/>' +
    '<path d="M20.6,19.4q-2,-1.4 -1.6,-3.4l2.6,0.6q0.6,1.6 -1,2.8z" fill="#6b5330"/>',

  /** 川辺の壮麗な邸宅と痩せた水路(モンポス)。 */
  strandedriver:
    '<rect x="0" y="0" width="24" height="15" fill="#ecdfc0"/>' +
    '<rect x="1.6" y="4.4" width="20.8" height="10.6" fill="#f2ece0"/>' +
    '<path d="M0.4,4.4h23.2l-2,-3H2.4z" fill="#a85a3a"/>' +
    '<g fill="#d8ccb4"><path d="M3.4,15v-6a2.6,2.6 0 0 1 5.2,0v6z"/><path d="M9.4,15v-6a2.6,2.6 0 0 1 5.2,0v6z"/><path d="M15.4,15v-6a2.6,2.6 0 0 1 5.2,0v6z"/></g>' +
    '<g fill="#6b5638"><path d="M4.6,15v-5a1.6,1.6 0 0 1 3.2,0v5z"/><path d="M10.6,15v-5a1.6,1.6 0 0 1 3.2,0v5z"/><path d="M16.6,15v-5a1.6,1.6 0 0 1 3.2,0v5z"/></g>' +
    '<rect x="0" y="15" width="24" height="2.4" fill="#c2ab84"/>' +
    '<rect x="0" y="17.4" width="24" height="6.6" fill="#d8b87f"/>' +
    '<path d="M0,19.4q6,-1.6 12,-0.6q6,1 12,-0.4v3q-6,1.4 -12,0.4q-6,-1 -12,0.6z" fill="#93805a"/>' +
    '<path d="M3,20.4q3,-1 6,-0.4M14,20.2q3,-0.6 6,-0.2" stroke="#d8c8a0" stroke-width="0.9" fill="none" opacity=".8"/>',

  /** 川を渡る平らな車両渡し船プランチョン(マガンゲ)。 */
  vehicleferry:
    '<rect x="0" y="0" width="24" height="9" fill="#cfe4f0"/>' +
    '<path d="M0,9q6,-1.6 12,0q6,1.6 12,-0.6" stroke="#3f7048" stroke-width="2.4" fill="none"/>' +
    '<rect x="0" y="9" width="24" height="15" fill="#6f5c3b"/>' +
    '<path d="M2,14q3,-1.4 6,0M15,15q3,-1.4 6,0M5,20q3,-1.4 6,0M14,21.6q3,-1.4 6,0" stroke="#d8c8a0" stroke-width="1.1" fill="none" stroke-linecap="round"/>' +
    '<path d="M1.6,15.4h20.8l-2,3.4H3.6z" fill="#8a8f92"/>' +
    '<rect x="1.6" y="14.4" width="20.8" height="1.6" fill="#5f6266"/>' +
    '<path d="M6,14.4v-4.6q0,-1.4 1.4,-1.4h4q1.4,0 1.8,1.4l0.8,2.4h2.4q1.2,0 1.2,1.2v1z" fill="#c8452f"/>' +
    '<path d="M7.4,9.4h3.4l0.6,2.4H7.4z" fill="#cfe4f0"/>' +
    '<g fill="#2f2b26"><circle cx="8.6" cy="14.4" r="1.4"/><circle cx="15" cy="14.4" r="1.4"/></g>' +
    '<path d="M20.4,14.4v-3.4l1.6,-1v4.4z" fill="#5f6266"/>',

  /** バナナの房を運ぶ小さな鉄道(シエナガ)。 */
  bananarail:
    '<rect x="0" y="0" width="24" height="17" fill="#cfe4f0"/>' +
    '<g fill="#3f8f52"><ellipse cx="3.4" cy="6.4" rx="3" ry="1.4" transform="rotate(-30 3.4 6.4)"/><ellipse cx="20.6" cy="6.4" rx="3" ry="1.4" transform="rotate(30 20.6 6.4)"/><ellipse cx="3" cy="10" rx="2.6" ry="1.2" transform="rotate(-14 3 10)"/><ellipse cx="21" cy="10" rx="2.6" ry="1.2" transform="rotate(14 21 10)"/></g>' +
    '<rect x="0" y="17" width="24" height="7" fill="#8a9a5a"/>' +
    '<g fill="#6b5a3a"><rect x="1" y="17.4" width="2.8" height="1.6"/><rect x="6.2" y="17.4" width="2.8" height="1.6"/><rect x="11.4" y="17.4" width="2.8" height="1.6"/><rect x="16.6" y="17.4" width="2.8" height="1.6"/><rect x="21.4" y="17.4" width="2.6" height="1.6"/></g>' +
    '<g fill="#8a8f92"><rect x="0" y="17.6" width="24" height="0.9"/><rect x="0" y="19" width="24" height="0.9"/></g>' +
    '<path d="M2.6,16.4v-6.6h5.4l1.6,-2.6h3.4v9.2z" fill="#3f6f5a"/>' +
    '<rect x="4" y="11" width="2.6" height="2.6" fill="#cfe4f0"/>' +
    '<rect x="1.6" y="14.6" width="12.4" height="2" fill="#33302c"/>' +
    '<g fill="#2f2b26"><circle cx="4.6" cy="16.4" r="1.8"/><circle cx="10.6" cy="16.4" r="1.8"/></g>' +
    '<rect x="14.8" y="10.4" width="8" height="6" fill="#7a5c30"/>' +
    '<g fill="#9aa84f"><path d="M16.4,10q-0.8,-3.4 1,-5.4q1.4,1 1.6,3q0.2,1.4 -0.4,2.4z"/><path d="M19.4,10q-0.4,-3 1.4,-4.6q1.2,1.2 1.2,3q0,1 -0.6,1.6z"/></g>' +
    '<g fill="#2f2b26"><circle cx="16.6" cy="16.4" r="1.4"/><circle cx="20.4" cy="16.4" r="1.4"/></g>',

  /** ガルシア=マルケスの生家(アラカタカ)。**実在の家屋だけを描く。** */
  macondohouse:
    '<rect x="0" y="0" width="24" height="18" fill="#cfe4f0"/>' +
    '<rect x="0" y="18" width="24" height="6" fill="#8a9a5a"/>' +
    '<rect x="2.6" y="8" width="18.8" height="10.6" fill="#f2ece0"/>' +
    '<g stroke="#d8d0c0" stroke-width="0.8" opacity=".9" fill="none"><path d="M2.6,10.6h18.8M2.6,13.2h18.8M2.6,15.8h18.8"/></g>' +
    '<path d="M1,8h22l-3,-4.6H4z" fill="#b8bec4"/>' +
    '<path d="M1.6,8h20.8" stroke="#8a9298" stroke-width="0.9"/>' +
    '<rect x="10.4" y="12" width="3.2" height="6.6" fill="#5f7f6a"/>' +
    '<g fill="#5f7f96"><rect x="4.6" y="10.6" width="3" height="3.6"/><rect x="16.4" y="10.6" width="3" height="3.6"/></g>' +
    '<g stroke="#4f7f5a" stroke-width="1.4" fill="none" stroke-linecap="round"><path d="M1.4,18q1,-3.4 3.4,-4.6M22.6,18q-1,-3.4 -3.4,-4.6"/></g>' +
    '<g fill="#e8443f"><circle cx="2.6" cy="15" r="0.9"/><circle cx="21.4" cy="15" r="0.9"/></g>' +
    '<path d="M4,20.6h16" stroke="#6b8a4a" stroke-width="1.2" fill="none"/>',

  /** 砂丘に立つ風力タービン(カボ・デ・ラ・ベラ)。 */
  windturbine:
    '<rect x="0" y="0" width="24" height="15" fill="#9fc8e0"/>' +
    '<rect x="0" y="15" width="24" height="9" fill="#d8a05f"/>' +
    '<path d="M0,17.4q7,-2.4 14,-1q6,1 10,-0.6v8H0z" fill="#c98a4f"/>' +
    '<path d="M2,20q4,-1.4 8,0M13,21q4,-1.4 8,0" stroke="#b87a42" stroke-width="1" fill="none" opacity=".7"/>' +
    '<path d="M11.2,16.4L12,5.4h0.8l0.8,11z" fill="#e8e4d4"/>' +
    '<circle cx="12.4" cy="5" r="1.2" fill="#c8ccd0"/>' +
    '<path d="M12.4,5L14.6,0.6l1,0.8l-2.6,4.2z" fill="#f2f0e8"/>' +
    '<path d="M12.4,5l-4.8,-1l0.2,-1.4l4.9,1.4z" fill="#f2f0e8"/>' +
    '<path d="M12.4,5l2,4.8l-1.2,0.8l-1.6,-5z" fill="#e8e6da"/>' +
    '<path d="M2.4,12q2.4,-1.4 4.8,0M17,11q2.4,-1.4 4.8,0" stroke="#e8f0f6" stroke-width="1.1" fill="none" stroke-linecap="round"/>',

  /** 熱帯林を貫く川と激しい雨(キブド)。 */
  rainforestriver:
    '<rect x="0" y="0" width="24" height="8" fill="#8a9aa0"/>' +
    '<path d="M0,8q4,-4 8,0q4,-4 8,0q4,-4 8,0v4H0z" fill="#265f3c"/>' +
    '<rect x="0" y="11" width="24" height="13" fill="#2d6b3f"/>' +
    '<path d="M9,11q3,6.4 0,13h6q-3,-6.6 0,-13z" fill="#5f7654"/>' +
    '<path d="M11,14q1.4,3.4 0.4,7" stroke="#a8c0a8" stroke-width="1" fill="none" opacity=".8"/>' +
    '<g fill="#1f4f34"><ellipse cx="4" cy="14" rx="3" ry="2.2"/><ellipse cx="20" cy="15" rx="3" ry="2.2"/><ellipse cx="3.4" cy="20" rx="2.6" ry="2"/><ellipse cx="20.6" cy="21" rx="2.6" ry="2"/></g>' +
    '<g stroke="#cfe0e8" stroke-width="1.1" opacity=".85" fill="none" stroke-linecap="round"><path d="M4,2l-1.6,4M9,1.4l-1.6,4M14,2.2l-1.6,4M19,1.4l-1.6,4M6.6,7l-1.4,3.4M17,6.6l-1.4,3.4M21.6,8l-1.4,3.4M2.6,12l-1.2,3M22,14l-1.2,3"/></g>',

  /** 雨に濡れるコンテナクレーン(ブエナベントゥーラ)。 */
  containerport:
    '<rect x="0" y="0" width="24" height="18" fill="#8a9aa0"/>' +
    '<rect x="0" y="18" width="24" height="6" fill="#6f767c"/>' +
    '<g stroke="#3f4a56" stroke-width="1.6" fill="none"><path d="M4,18V4.6M18,18V4.6M1,4.6h22M4,9h14"/></g>' +
    '<path d="M21,4.6l3,-2.4" stroke="#3f4a56" stroke-width="1.4" fill="none"/>' +
    '<path d="M11,4.6v3.4" stroke="#33302c" stroke-width="1.1" fill="none"/>' +
    '<rect x="7.4" y="8" width="7.2" height="3.4" fill="#c8452f"/>' +
    '<path d="M8.4,8v3.4M10.4,8v3.4M12.4,8v3.4" stroke="#8a2f24" stroke-width="0.8" fill="none"/>' +
    '<rect x="2.6" y="14.6" width="7.2" height="3.4" fill="#3f7f9a"/>' +
    '<rect x="13" y="14.6" width="7.2" height="3.4" fill="#c8a13f"/>' +
    '<g stroke="#cfe0e8" stroke-width="1" opacity=".8" fill="none" stroke-linecap="round"><path d="M3,1.4l-1.2,3M21.4,1l-1.2,3M23,8l-1.2,3M1.6,9.4l-1.2,3"/></g>',

  /** 島へ架かる短い橋(トゥマコ)。 */
  islandbridge:
    '<rect x="0" y="0" width="24" height="12" fill="#bfd8dc"/>' +
    '<rect x="0" y="12" width="24" height="12" fill="#4f8290"/>' +
    '<path d="M2,15q3,-1.6 6,0M14,16.6q3,-1.6 6,0M6,20.6q3,-1.6 6,0" stroke="#bfd8dc" stroke-width="1.2" fill="none" stroke-linecap="round"/>' +
    '<path d="M-0.6,12.4q3.4,-4.4 7,-2q2,1.4 2,3.4l-0.4,1.6q-4.4,1.6 -8.6,-0.6z" fill="#3f7048"/>' +
    '<path d="M24.6,12.4q-3.4,-4.4 -7,-2q-2,1.4 -2,3.4l0.4,1.6q4.4,1.6 8.6,-0.6z" fill="#457a44"/>' +
    '<rect x="6" y="11.4" width="12" height="2.2" fill="#8a7454"/>' +
    '<g fill="#5f4c33"><rect x="8" y="13.6" width="1.4" height="5.4"/><rect x="14.6" y="13.6" width="1.4" height="5.4"/><rect x="11.3" y="13.6" width="1.4" height="6.4"/></g>' +
    '<path d="M6,11.4h12" stroke="#6b5844" stroke-width="0.8"/>' +
    '<rect x="2.6" y="6.6" width="3.4" height="2.6" fill="#f2d88a"/>' +
    '<path d="M2,6.6h4.6l-1,-1.6H3z" fill="#c8452f"/>',

  /** 沖で跳ねるザトウクジラ(ヌキ)。 */
  whalewatch:
    '<rect x="0" y="0" width="24" height="16" fill="#bfd8dc"/>' +
    '<rect x="0" y="16" width="24" height="8" fill="#3f6f7f"/>' +
    '<path d="M1,18.6q3,-1.6 6,0M16,19.6q3,-1.6 6,0M8,21.6q3,-1.6 6,0" stroke="#bfd8dc" stroke-width="1.2" fill="none" stroke-linecap="round"/>' +
    '<path d="M4.4,16.6Q6,6 13,3.4q4,-1.4 6.4,0.6q-1.6,0.4 -2.6,1.6q3,0.6 4.4,3q-5,-1 -8,2.4q-2.6,3 -3.4,6.6z" fill="#33404a"/>' +
    '<path d="M9,16.4q0.8,-3.4 3,-6q-3.4,0.6 -4.6,3.4q-0.8,1.6 -0.4,2.8z" fill="#e8f0f4"/>' +
    '<path d="M14.4,5.4l3.4,-2.6q0.6,1.6 -0.6,2.8q1.8,0 2.8,1l-3.4,1.4z" fill="#4a5866"/>' +
    '<g fill="#e8f0f4" opacity=".9"><circle cx="4" cy="14" r="1.1"/><circle cx="6.4" cy="11" r="0.9"/><circle cx="19" cy="12.4" r="1"/><circle cx="17" cy="15" r="0.8"/></g>' +
    '<path d="M2,16.4q2.4,-2 4.8,0q-1.2,1 -2.4,1q-1.2,0 -2.4,-1z" fill="#eef6f8"/>' +
    '<path d="M17.6,16.6q2.4,-2 4.8,0q-1.2,1 -2.4,1q-1.2,0 -2.4,-1z" fill="#eef6f8"/>',

  /** 川の選鉱皿にきらめく金・白金(イスミナ)。 */
  platinumdredge:
    '<rect x="0" y="0" width="24" height="10" fill="#2d6b3f"/>' +
    '<path d="M0,10q4,-3.4 8,0q4,-3.4 8,0q4,-3.4 8,0" stroke="#1f4f34" stroke-width="2" fill="none"/>' +
    '<rect x="0" y="10" width="24" height="14" fill="#5f7654"/>' +
    '<path d="M2,13.4q3,-1.4 6,0M16,14.4q3,-1.4 6,0M4,20q3,-1.4 6,0M15,21q3,-1.4 6,0" stroke="#a8c0a8" stroke-width="1.1" fill="none" stroke-linecap="round"/>' +
    '<circle cx="12" cy="15.4" r="6.6" fill="#8a6b3a"/>' +
    '<circle cx="12" cy="15.4" r="5" fill="#a8884a"/>' +
    '<circle cx="12" cy="15.8" r="3.2" fill="#6f5c3b"/>' +
    '<g fill="#f5b31c"><circle cx="10.8" cy="15" r="0.8"/><circle cx="13.2" cy="16.4" r="0.7"/></g>' +
    '<g fill="#e8ecf0"><circle cx="12.6" cy="14.4" r="0.7"/><circle cx="11" cy="17" r="0.6"/></g>',

  /** 草原で唐突に途切れる鉄道の盛土(ビジャビセンシオ)。 */
  unfinishedrail:
    '<rect x="0" y="0" width="24" height="12" fill="#bfd8ec"/>' +
    '<path d="M0,12q6,-1.6 12,0q6,1.6 12,-0.6" stroke="#7a9a4f" stroke-width="2" fill="none"/>' +
    '<rect x="0" y="12" width="24" height="12" fill="#8aa455"/>' +
    '<path d="M0,17.4h13.4q2,0 2,2v0.6q0,2 -2,2H0z" fill="#b09a68"/>' +
    '<path d="M0,17.4h13.4l1,1H0z" fill="#c2ab72"/>' +
    '<g fill="#6b5a3a"><rect x="1" y="18.4" width="1.6" height="2.6"/><rect x="4.4" y="18.4" width="1.6" height="2.6"/><rect x="7.8" y="18.4" width="1.6" height="2.6"/><rect x="11.2" y="18.4" width="1.6" height="2.6"/></g>' +
    '<g stroke="#8a8f92" stroke-width="1" fill="none"><path d="M0,18.8h13.6M0,20.4h13.2"/></g>' +
    '<path d="M15.4,17.6l3,2.6" stroke="#6b5a3a" stroke-width="1.2" fill="none"/>' +
    '<g stroke="#7a9a4f" stroke-width="1.3" fill="none" stroke-linecap="round"><path d="M18.6,21.6q1,-2.6 3,-3.4M20.6,22.6q1,-2 2.6,-2.6M17,15.4q1,-2 2.6,-2.6M20.4,14.4q1,-1.6 2.4,-2"/></g>',

  /** 石油やぐらと新しい高層アパート(ヨパル)。 */
  oilboomtown:
    '<rect x="0" y="0" width="24" height="18" fill="#bfd8ec"/>' +
    '<rect x="0" y="18" width="24" height="6" fill="#8aa455"/>' +
    '<g stroke="#5a5a52" stroke-width="1.4" fill="none"><path d="M3,18L7,3.4M11,18L7,3.4M4.4,13.4h5.2M5.4,9.4h3.2M6.2,6h1.8"/></g>' +
    '<path d="M7,3.4v-2" stroke="#5a5a52" stroke-width="1.2" fill="none"/>' +
    '<rect x="14.6" y="6.4" width="7.4" height="11.6" fill="#e0dcd0"/>' +
    '<rect x="14.6" y="6.4" width="7.4" height="1.4" fill="#8a8a7f"/>' +
    '<g fill="#5f7f96"><rect x="15.8" y="9" width="1.8" height="2"/><rect x="19" y="9" width="1.8" height="2"/><rect x="15.8" y="12.4" width="1.8" height="2"/><rect x="19" y="12.4" width="1.8" height="2"/><rect x="15.8" y="15.6" width="1.8" height="2"/><rect x="19" y="15.6" width="1.8" height="2"/></g>' +
    '<path d="M13,6h10" stroke="#c8a13f" stroke-width="1.2" fill="none"/>' +
    '<path d="M18.2,6V3l3,1.4" stroke="#c8a13f" stroke-width="1.1" fill="none"/>',

  /** 2本の大河が合流する地点(プエルト・カレーニョ)。俯瞰。 */
  orinococonfluence:
    '<rect x="0" y="0" width="24" height="24" fill="#3f7048"/>' +
    '<path d="M0,3q7,3.4 10,10q1.6,4 1.6,11h6q0.4,-8 -2,-13.4Q12,4 4,0H0z" fill="#8f7a4e"/>' +
    '<path d="M24,5q-6,2.6 -8.4,8q-1.6,4 -1.6,11h3.6q0,-7 2.4,-11q2,-4 4,-5.4z" fill="#57482f"/>' +
    '<path d="M14,24q0,-5 1,-8.4q-1.6,-1.4 -2.6,-3.4q1.4,5 1.4,11.8z" fill="#6f5c3b"/>' +
    '<g stroke="#d8c8a0" stroke-width="0.9" opacity=".8" fill="none"><path d="M3,4.4q3.4,2.6 5.4,6M14.6,19q0,-3.4 1,-6"/></g>' +
    '<g fill="#2d5f3f"><ellipse cx="4" cy="18" rx="2.6" ry="2"/><ellipse cx="21" cy="18.6" rx="2.4" ry="1.8"/><ellipse cx="2.6" cy="22" rx="2.2" ry="1.6"/></g>' +
    '<rect x="1.6" y="12.4" width="3.4" height="2.6" fill="#f2d88a"/>' +
    '<path d="M1,12.4h4.6l-1,-1.6H2z" fill="#c8452f"/>' +
    '<path d="M17.6,13.6q1.6,-1.4 3.4,0q-0.8,0.8 -1.7,0.8q-0.9,0 -1.7,-0.8z" fill="#6b5330"/>',

  /** 五色に染まるカニョ・クリスタレスの川底(ラ・マカレナ)。 */
  rainbowriver:
    '<rect x="0" y="0" width="24" height="24" fill="#3f7048"/>' +
    '<path d="M0,4q8,-2 14,1q6,3 10,1v14q-8,2 -14,-1q-6,-3 -10,-1z" fill="#4f8fae"/>' +
    '<path d="M0,6.4q8,-2 13,0.8q6,3 11,1.2v2q-8,1.6 -13,-1q-6,-3 -11,-1z" fill="#c8342f"/>' +
    '<path d="M0,9.4q8,-2 13,0.8q6,3 11,1.2v2q-8,1.6 -13,-1q-6,-3 -11,-1z" fill="#d86a9a"/>' +
    '<path d="M0,12.4q8,-2 13,0.8q6,3 11,1.2v2q-8,1.6 -13,-1q-6,-3 -11,-1z" fill="#e8b83f"/>' +
    '<path d="M0,15.4q8,-2 13,0.8q6,3 11,1.2v2q-8,1.6 -13,-1q-6,-3 -11,-1z" fill="#4f9a5f"/>' +
    '<g fill="#eef6f8" opacity=".85"><circle cx="4.4" cy="5.6" r="1"/><circle cx="19.6" cy="17.4" r="1"/><circle cx="8" cy="18.6" r="0.8"/></g>' +
    '<g fill="#2d5f3f"><ellipse cx="3" cy="1.6" rx="3" ry="1.4"/><ellipse cx="21" cy="22.4" rx="3" ry="1.4"/><ellipse cx="12" cy="0.8" rx="2.6" ry="1.2"/></g>',

  /** 国境の川辺の石油ポンプ(アラウカ)。 */
  borderoilfield:
    '<rect x="0" y="0" width="24" height="15" fill="#c8dce8"/>' +
    '<rect x="0" y="15" width="24" height="4.4" fill="#8f7a4e"/>' +
    '<path d="M2,16.6q3,-1.2 6,0M14,17.2q3,-1.2 6,0" stroke="#d8c8a0" stroke-width="0.9" fill="none" stroke-linecap="round"/>' +
    '<rect x="0" y="19.4" width="24" height="4.6" fill="#8aa455"/>' +
    '<path d="M4.4,15L9.4,3.6h1.2L15.6,15z" fill="none" stroke="#5a5a52" stroke-width="1.6"/>' +
    '<path d="M2.6,4.4L17.4,7l-0.4,1.8L2.2,6.2z" fill="#5a5a52"/>' +
    '<path d="M17,6.4q2.4,0.6 2.4,3v2.4" stroke="#5a5a52" stroke-width="1.6" fill="none"/>' +
    '<circle cx="3.4" cy="5.2" r="2.2" fill="#4a4a44"/>' +
    '<path d="M19.4,11.8v3.2" stroke="#4a4a44" stroke-width="1.4" fill="none"/>' +
    '<path d="M0.6,1.4h4.4M0.6,1.4v4" stroke="#c8452f" stroke-width="1.2" fill="none"/>',

  /** 軍が退いた交渉の会場(サン・ビセンテ・デル・カグアン)。**誰もいない。** */
  emptyzone:
    '<rect x="0" y="0" width="24" height="16" fill="#bfd8ec"/>' +
    '<rect x="0" y="16" width="24" height="8" fill="#8aa455"/>' +
    '<path d="M1,7.4L12,2l11,5.4l-1,1.8L12,4.6L2,9.2z" fill="#e8e4d4"/>' +
    '<path d="M2.6,8.6L12,4.2l9.4,4.4V10H2.6z" fill="#f2efe4"/>' +
    '<g stroke="#b8b4a4" stroke-width="1.2" fill="none"><path d="M3.4,10v8M20.6,10v8"/></g>' +
    '<rect x="5.4" y="12.4" width="13.2" height="1.8" fill="#8a7454"/>' +
    '<g stroke="#6b5844" stroke-width="1.1" fill="none"><path d="M6.4,14.2v3.6M17.6,14.2v3.6"/></g>' +
    '<g fill="#6b5844"><rect x="7.6" y="15.6" width="2.4" height="1.4"/><rect x="14" y="15.6" width="2.4" height="1.4"/><path d="M8,17v2.4M9.6,17v2.4M14.4,17v2.4M16,17v2.4" stroke="#6b5844" stroke-width="0.9"/></g>' +
    '<path d="M12,12.4V9" stroke="#8a8f92" stroke-width="1" fill="none"/>' +
    '<path d="M12,9h3.4v2h-3.4z" fill="#f6f2e8"/>' +
    '<path d="M2,21.4q3,-1.2 6,0M15,21.8q3,-1.2 6,0" stroke="#7a9a4f" stroke-width="1.2" fill="none" stroke-linecap="round"/>',

  /** 3か国の旗が並ぶ川の船着き場(レティシア)。旗は無地。 */
  triborderport:
    '<rect x="0" y="0" width="24" height="13" fill="#cfe4f0"/>' +
    '<path d="M0,13q6,-1.6 12,0q6,1.6 12,-0.6" stroke="#2d6b3f" stroke-width="2.6" fill="none"/>' +
    '<rect x="0" y="13" width="24" height="11" fill="#6f5c3b"/>' +
    '<path d="M2,17q3,-1.4 6,0M14,18q3,-1.4 6,0M5,21.6q3,-1.4 6,0" stroke="#d8c8a0" stroke-width="1.1" fill="none" stroke-linecap="round"/>' +
    '<rect x="2.6" y="13.6" width="18.8" height="2" fill="#8a7454"/>' +
    '<g fill="#5f4c33"><rect x="4.4" y="15.6" width="1.4" height="5"/><rect x="11.3" y="15.6" width="1.4" height="5"/><rect x="18.2" y="15.6" width="1.4" height="5"/></g>' +
    '<g stroke="#5a4630" stroke-width="1" fill="none"><path d="M5,13.6V3.4M12,13.6V2.6M19,13.6V3.4"/></g>' +
    '<path d="M5,3.4h5v3.4H5z" fill="#f5b31c"/>' +
    '<path d="M12,2.6h5V6h-5z" fill="#3f8f52"/>' +
    '<path d="M19,3.4h5v3.4h-5z" fill="#c8452f"/>',

  /** 峡谷の川沿いの警報柱(モコア)。 */
  mudslidewarning:
    '<rect x="0" y="0" width="24" height="14" fill="#a8bcc4"/>' +
    '<path d="M-1,14L7,3l7,11z" fill="#4f7048"/>' +
    '<path d="M10,14l7,-10l8,10z" fill="#456b44"/>' +
    '<path d="M13,9.4l4,-5.6l2.6,3.4q-2.6,4 -4,8.4l-2,-1.4q0.4,-2.6 -0.6,-4.8z" fill="#8f6640"/>' +
    '<rect x="0" y="14" width="24" height="10" fill="#5f8450"/>' +
    '<path d="M0,18q6,-1.6 12,0q6,1.6 12,-0.6v7H0z" fill="#8f7a4e"/>' +
    '<path d="M3,20.4q3,-1.2 6,0M14,21q3,-1.2 6,0" stroke="#d8c8a0" stroke-width="1" fill="none" stroke-linecap="round"/>' +
    '<rect x="6.4" y="5" width="1.8" height="14" fill="#e8e4d4"/>' +
    '<path d="M5,5.4h4.6l-2.3,-2.6z" fill="#c8342f"/>' +
    '<path d="M4.4,7.4l2,-1.4M10.2,7.4l-2,-1.4" stroke="#4a4a44" stroke-width="1.3" fill="none"/>' +
    '<path d="M3.4,6.4q-1,-1.6 -0.6,-3.4M11.2,6.4q1,-1.6 0.6,-3.4" stroke="#c8342f" stroke-width="1" fill="none"/>',

  /** 緑の森と牧草地の境界線(フロレンシア)。 */
  deforestfrontier:
    '<rect x="0" y="0" width="24" height="24" fill="#9ab060"/>' +
    '<path d="M0,0h13q-2,6 -1,12q1,6 2.6,12H0z" fill="#265f3c"/>' +
    '<g fill="#2d6b3f"><ellipse cx="3" cy="3.4" rx="2.8" ry="2.2"/><ellipse cx="8.4" cy="2.6" rx="2.8" ry="2.2"/><ellipse cx="3.4" cy="8.4" rx="2.8" ry="2.2"/><ellipse cx="9" cy="7.6" rx="2.8" ry="2.2"/><ellipse cx="4" cy="13.6" rx="2.8" ry="2.2"/><ellipse cx="9.4" cy="12.8" rx="2.8" ry="2.2"/><ellipse cx="4.6" cy="19" rx="2.8" ry="2.2"/><ellipse cx="10.4" cy="18.4" rx="2.8" ry="2.2"/></g>' +
    '<g fill="#6b5330"><rect x="15.6" y="4.4" width="2.2" height="1.6" rx="0.8"/><rect x="19.6" y="8.4" width="2.2" height="1.6" rx="0.8"/><rect x="16.4" y="13.4" width="2.2" height="1.6" rx="0.8"/><rect x="20.4" y="17.4" width="2.2" height="1.6" rx="0.8"/></g>' +
    '<g stroke="#8aa455" stroke-width="0.9" opacity=".9" fill="none"><path d="M15,7.4h6M15.6,11.4h6M15,16h6M15.6,20.4h6"/></g>' +
    '<path d="M13,0q-2,6 -1,12q1,6 2.6,12" stroke="#c2ab72" stroke-width="1.4" fill="none"/>',

  /** 砂岩の崖の赤オーカーの岩絵(サン・ホセ・デル・グアビアレ)。 */
  rockartcliff:
    '<rect x="0" y="0" width="24" height="24" fill="#c99a68"/>' +
    '<path d="M0,0h5q-1.6,12 0,24H0z" fill="#a87848"/>' +
    '<path d="M24,0h-4q1.6,12 0,24h4z" fill="#b8895a"/>' +
    '<g stroke="#8f6640" stroke-width="1" opacity=".6" fill="none"><path d="M6,2q-0.6,10 0,20M19,2q0.6,10 0,20"/></g>' +
    '<g fill="#b0402c"><path d="M9,8l2.6,-1.6l2.6,1.6l-1,1l-1.6,-1l-1.6,1z"/><path d="M14.6,7.4h1.4l0.6,2l1.4,0.4l-0.4,1.2l-1.6,-0.4l-0.4,1.6h-1.2l0.4,-2l-1.2,-0.6l0.4,-1.2l1,0.4z"/><circle cx="9" cy="13" r="1.4"/><path d="M12,12.4l3.4,0.6l-0.3,1.4l-3.4,-0.6z"/><path d="M8.4,16.6l2,-1l2,1l-0.6,1l-1.4,-0.6l-1.4,0.6z"/><path d="M13.6,16l2.6,0.4l1.6,1.6l-1,1l-1.4,-1.4l-2,-0.4z"/></g>' +
    '<g fill="#8f3222" opacity=".9"><circle cx="17.4" cy="12.4" r="0.7"/><circle cx="10.4" cy="10.4" r="0.6"/><circle cx="15.4" cy="14.4" r="0.6"/></g>',

  /** 熱帯林からそびえる花崗岩のドームとイニリダの花(プエルト・イニリダ)。 */
  graniteinselberg:
    '<rect x="0" y="0" width="24" height="16" fill="#bfd8ec"/>' +
    '<path d="M3,16q0,-11 9,-11q9,0 9,11z" fill="#8a8078"/>' +
    '<path d="M6,16q0.6,-8 6,-9q-2,3.4 -2.6,9z" fill="#9a9088"/>' +
    '<g stroke="#6f665c" stroke-width="1" opacity=".7" fill="none"><path d="M12,5.4q4,3 5.4,10.6M9,6.6q-2,3.4 -2.6,9.4"/></g>' +
    '<path d="M0,16q4,-3.4 8,0q4,-3.4 8,0q4,-3.4 8,0v8H0z" fill="#265f3c"/>' +
    '<g fill="#2d6b3f"><ellipse cx="4" cy="18.6" rx="3" ry="2.2"/><ellipse cx="12" cy="19.4" rx="3" ry="2.2"/><ellipse cx="20" cy="18.6" rx="3" ry="2.2"/></g>' +
    '<g fill="#f2ece0"><path d="M4.4,22.4l0.8,-2l0.8,2l2,0.4l-2,0.8l-0.8,2l-0.8,-2l-2,-0.8z"/><path d="M17.6,21.4l0.7,-1.6l0.7,1.6l1.6,0.4l-1.6,0.6l-0.7,1.6l-0.7,-1.6l-1.6,-0.6z"/></g>' +
    '<circle cx="5.2" cy="22.8" r="0.6" fill="#d86a9a"/>' +
    '<circle cx="18.3" cy="21.9" r="0.5" fill="#d86a9a"/>',
};
