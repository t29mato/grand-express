/**
 * 太陽系の都市(=天体)イラスト。プレビュー5天体ぶん
 * (太陽・地球・火星・木星・土星)。
 *
 * `SOLARSYSTEM_MARKS` は24×24の座標系に描くシンボル、`SOLARSYSTEM_BG` は
 * 400×210の座標系に描く背景シーン(いずれもSVG断片の文字列)。他国と同じく
 * 最初から文字列として持つ。動きは含めない(アニメーションはReact側で重ねる)。
 *
 * 他の盤面は「空→地面」の2層だが、ここは天体によって主役が違う
 * (太陽=表面そのもの、地球=軌道から見た球、火星=地表に立った視点、
 * 木星・土星=ガスの縞や環)。**それでも「奥→手前」の重ね順は必ず守る**
 * (`space()` の第3引数=次に来る塗りの開始yを渡すのを忘れない)。
 *
 * 色は宇宙らしい紺黒を基調に、天体ごとの固有色を足す。
 * 恒星光・#f5b31c(太陽) / 深宇宙紺・#050a1c / 星明かり・#f0ead6 /
 * 強調・#e8443f・#5b8fe8。
 *
 * **背景SVGの中央25%(x=151〜249 / y=54〜152)は都市シンボルに隠れて
 * 見えない。** 見せたい細部は左右3分の1と手前(y>170)に置く。
 */

const W = 400;
const r1 = (v) => Math.round(v * 10) / 10;

function band(y, h, fill) {
  return `<rect x="0" y="${y}" width="${W}" height="${h}" fill="${fill}"/>`;
}

/**
 * 深宇宙・恒星表面などの「奥」の帯。**第3引数に「次に来る塗りの開始y」を
 * 渡すこと。**渡し忘れると奥と手前のあいだに塗り残しの帯ができる。
 */
function space(top, bottom, to = 124) {
  // `to` が境界の84以下なら2色目の見える余地が無い。高さ0の <rect> を出さない。
  return band(0, 92, top) + (to > 84 ? band(84, to - 84, bottom) : "");
}

function surface(y, fill) {
  return `<rect x="0" y="${y}" width="${W}" height="${210 - y}" fill="${fill}"/>`;
}

/** 決定的な擬似乱数(星の散布などに使う)。 */
function mulberry32(seed) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let x = Math.imul(a ^ (a >>> 15), 1 | a);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

/** 星の散布。指定した矩形の中にランダムな小さい点を撒く。 */
function starfield(seed, count, x0, y0, w, h, color = "#f0ead6") {
  const rand = mulberry32(seed);
  const parts = [];
  for (let i = 0; i < count; i++) {
    const x = r1(x0 + rand() * w);
    const y = r1(y0 + rand() * h);
    const r = rand() < 0.2 ? 1.4 : 0.8;
    const op = (0.4 + rand() * 0.5).toFixed(2);
    parts.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="${color}" opacity="${op}"/>`);
  }
  return `<g>${parts.join("")}</g>`;
}

/** 環(楕円の弧)。土星の輪などに使う。 */
function ringArc(cx, cy, rx, ry, fill, opacity = 1) {
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="${fill}" stroke-width="${r1(ry * 0.3)}" opacity="${opacity}"/>`;
}

/** コロナの光条(太陽から放射状に伸びる線)。 */
function flareRays(cx, cy, count, rInner, rOuter, color, seed = 1) {
  const rand = mulberry32(seed);
  const parts = [];
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2 + rand() * 0.2;
    const len = rOuter + rand() * 20;
    const x1 = r1(cx + Math.cos(a) * rInner);
    const y1 = r1(cy + Math.sin(a) * rInner);
    const x2 = r1(cx + Math.cos(a) * len);
    const y2 = r1(cy + Math.sin(a) * len);
    parts.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="2" opacity="${(0.3 + rand() * 0.4).toFixed(2)}"/>`);
  }
  return `<g>${parts.join("")}</g>`;
}

/** プロミネンス(表面から立ち上がる炎のループ)。 */
function prominence(x, base, h, w, fill = "#f5b31c") {
  return `<path d="M${r1(x - w / 2)},${base}q${r1(-w * 0.3)},${r1(-h * 0.6)} 0,${-h}q${r1(w * 0.3)},${r1(h * 0.4)} ${w},0q${r1(-w * 0.2)},${r1(-h * 0.5)} 0,${-h * 0.85}" fill="none" stroke="${fill}" stroke-width="3" opacity=".85"/>`;
}

/** 粒状斑(太陽表面のむら)。 */
function granule(x, y, r, fill) {
  return `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r1(r * 0.7)}" fill="${fill}" opacity=".55"/>`;
}

/** 雲の帯(木星・土星のガスの縞)。 */
function cloudBand(y, h, fill, wobble = 6, seed = 2) {
  const rand = mulberry32(seed);
  let d = `M0,${y}`;
  for (let x = 0; x <= W; x += 40) {
    d += `q20,${r1((rand() - 0.5) * wobble * 2)} 40,0`;
  }
  return `<path d="${d}v${h}H0z" fill="${fill}" opacity=".85"/>`;
}

/** 遠くの山(火星のオリンポス山のような、裾野の広い低い山影)。 */
function distantVolcano(cx, base, w, h, fill) {
  return `<path d="M${r1(cx - w / 2)},${base}Q${cx},${r1(base - h)} ${r1(cx + w / 2)},${base}z" fill="${fill}" opacity=".8"/>`;
}

/** クレーター(縁取りのある円)。 */
function crater(x, y, r, fill, rim) {
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/><circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${rim}" stroke-width="1.4" opacity=".6"/>`;
}

/** 砂塵旋風(ダストデビル)。細い漏斗形。 */
function dustDevil(x, base, h, fill) {
  return `<path d="M${x},${base}q${r1(h * 0.18)},${r1(-h * 0.4)} 0,${-h}q${r1(-h * 0.14)},${r1(h * 0.5)} 0,${-h * 0.15}" fill="none" stroke="${fill}" stroke-width="2.2" opacity=".7"/>`;
}

/** 大陸(地球専用、雲の下の陸地の小さな塊)。 */
function continentBlob(cx, cy, w, h, fill) {
  return `<path d="M${r1(cx - w / 2)},${cy}q${r1(w * 0.15)},${r1(-h * 0.6)} ${r1(w * 0.5)},${r1(-h * 0.3)}q${r1(w * 0.3)},${r1(h * 0.1)} ${r1(w * 0.2)},${r1(h * 0.5)}q${r1(-w * 0.4)},${r1(h * 0.3)} ${r1(-w * 0.7)},${r1(-h * 0.2)}z" fill="${fill}" opacity=".9"/>`;
}

/** 雲の渦(地球専用)。 */
function cloudSwirl(cx, cy, r, fill = "#f6efe2") {
  return `<path d="M${r1(cx - r)},${cy}a${r},${r1(r * 0.5)} 0 1 0 ${r1(r * 2)},0a${r1(r * 0.6)},${r1(r * 0.3)} 0 1 1 ${r1(-r * 1.2)},0" fill="${fill}" opacity=".75"/>`;
}

/** 小さな人工衛星・探査機のシルエット(手前に置く)。 */
function probeSilhouette(x, y, scale = 1, fill = "#c9d6f0") {
  const s = scale;
  return (
    `<rect x="${r1(x - 3 * s)}" y="${r1(y - 3 * s)}" width="${r1(6 * s)}" height="${r1(6 * s)}" fill="${fill}"/>` +
    `<rect x="${r1(x - 14 * s)}" y="${r1(y - 1 * s)}" width="${r1(10 * s)}" height="${r1(2 * s)}" fill="${fill}" opacity=".8"/>` +
    `<rect x="${r1(x + 4 * s)}" y="${r1(y - 1 * s)}" width="${r1(10 * s)}" height="${r1(2 * s)}" fill="${fill}" opacity=".8"/>` +
    `<line x1="${x}" y1="${r1(y - 3 * s)}" x2="${x}" y2="${r1(y - 9 * s)}" stroke="${fill}" stroke-width="1"/>`
  );
}

/** 月・衛星の遠景円盤。 */
function moonDisc(cx, cy, r, fill) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" opacity=".9"/>`;
}

/** 氷の亀裂(細い線を数本まとめる)。 */
function iceCrack(x, y, w, h, color = "#8fa8c0") {
  return `<path d="M${x},${y}q${r1(w * 0.3)},${r1(h * 0.4)} ${w},${h}" fill="none" stroke="${color}" stroke-width="1.4" opacity=".7"/>`;
}

/** 間欠泉(細く伸びる白い噴出)。 */
function geyserPlume(x, base, h, w = 10, fill = "#f6efe2") {
  return (
    `<path d="M${r1(x - w / 2)},${base}Q${x},${r1(base - h * 0.7)} ${r1(x - w * 0.2)},${r1(base - h)}" fill="none" stroke="${fill}" stroke-width="2.4" opacity=".8"/>` +
    `<path d="M${r1(x + w / 2)},${base}Q${x},${r1(base - h * 0.7)} ${r1(x + w * 0.2)},${r1(base - h)}" fill="none" stroke="${fill}" stroke-width="2.4" opacity=".8"/>` +
    `<path d="M${x},${base}L${x},${r1(base - h * 1.1)}" fill="none" stroke="${fill}" stroke-width="1.6" opacity=".6"/>`
  );
}

/** 溶岩の亀裂(暗い地面に走る発光する線)。 */
function lavaCrack(x1, y1, x2, y2, w = 3, fill = "#ff8f3a") {
  return `<path d="M${x1},${y1}L${x2},${y2}" fill="none" stroke="${fill}" stroke-width="${w}" opacity=".85"/>`;
}

/** 遠くの小さな太陽(外縁の天体から見た、点のように小さい太陽)。 */
function distantSun(cx, cy, r = 5) {
  return (
    `<circle cx="${cx}" cy="${cy}" r="${r * 2.2}" fill="#f5b31c" opacity=".18"/>` +
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff0c8"/>`
  );
}

/** 彗星の尾(核から伸びる淡いグラデーション状の筋)。 */
function cometTailShape(cx, cy, len, w, fill = "#bfe8f4") {
  return `<path d="M${cx},${r1(cy - w / 2)}L${r1(cx + len)},${cy}L${cx},${r1(cy + w / 2)}z" fill="${fill}" opacity=".4"/>`;
}

/** 断崖(ミランダのヴェローナ断崖のような、急な段差)。 */
function cliffFace(x, base, h, w, fill) {
  return `<path d="M${x},${base}L${x},${r1(base - h)}L${r1(x + w)},${r1(base - h * 0.4)}L${r1(x + w)},${base}z" fill="${fill}" opacity=".9"/>`;
}

// ---------------------------------------------------------------------------
// 背景シーン(プレビュー5種)。鍵は cities.mjs の `bg` と対応。
// ---------------------------------------------------------------------------

export const SOLARSYSTEM_BG = {
  /**
   * 太陽の表面近くから見た構図。コロナの光条とプロミネンス、黒点、
   * 粒状斑。手前に小さな観測プローブのシルエット。
   */
  solarcore:
    space("#8a2a0a", "#f5b31c", 130) +
    flareRays(200, 90, 28, 60, 150, "#ffdf9a", 5) +
    surface(130, "#f5b31c") +
    // 粒状斑(表面のむら)を格子状にばらまく
    granule(30, 150, 10, "#e89a1c") + granule(60, 165, 8, "#ffce5a") + granule(96, 148, 9, "#e89a1c") +
    granule(340, 155, 9, "#ffce5a") + granule(368, 172, 7, "#e89a1c") + granule(20, 190, 8, "#ffce5a") +
    granule(370, 195, 8, "#e89a1c") + granule(50, 200, 7, "#ffce5a") +
    // 黒点2つ(手前寄り)
    `<circle cx="80" cy="180" r="9" fill="#7a3a0a"/><circle cx="80" cy="180" r="4" fill="#4a2005"/>` +
    `<circle cx="330" cy="192" r="6" fill="#7a3a0a"/>` +
    // プロミネンス(表面から立ち上がる炎のループ)
    prominence(60, 130, 46, 30, "#ffce5a") +
    prominence(340, 130, 60, 40, "#ff8f3a") +
    // 観測プローブ(手前、シルエット)
    probeSilhouette(40, 196, 1.3, "#20364a") +
    probeSilhouette(366, 60, 1, "#20364a"),

  /**
   * 軌道から見た地球。雲の渦と大陸、薄い大気の縁。上空に星と月のかけら。
   */
  bluemarble:
    space("#050a1c", "#0a1030", 40) +
    starfield(11, 40, 0, 0, 400, 40) +
    moonDisc(40, 26, 10, "#c9c4bc") +
    band(40, 6, "#7fb0e0") + // 大気の淡い縁
    surface(46, "#1f5fa0") +
    // 大陸(緑)
    continentBlob(90, 90, 60, 40, "#3f8f4f") +
    // 都市シンボルが隠す帯(x151-249, y54-152)を避けて右寄りに置く
    continentBlob(280, 130, 80, 46, "#3f8f4f") +
    continentBlob(320, 80, 50, 34, "#4fa05a") +
    continentBlob(40, 150, 44, 30, "#3f8f4f") +
    // 白い雲の渦
    cloudSwirl(70, 60, 26) +
    cloudSwirl(260, 60, 20) +
    cloudSwirl(150, 175, 30) +
    cloudSwirl(340, 165, 18) +
    // 薄い巻雲の筋(赤道帯)
    `<g stroke="#f6efe2" stroke-width="2" opacity=".5"><path d="M20,110q30,-6 60,0"/><path d="M300,190q30,-6 60,0"/></g>` +
    // 低軌道の人工衛星(手前、シルエット)
    probeSilhouette(370, 195, 0.9, "#0c1830"),

  /**
   * 火星の地表に立った視点。赤茶の砂丘、遠くにオリンポス山、砂塵旋風。
   * 空は薄い大気のためピンクがかったベージュ。
   */
  redplanet:
    space("#c98a5a", "#e8b98a", 96) +
    starfield(13, 10, 0, 0, 400, 20, "#fff0d8") +
    distantVolcano(320, 96, 140, 40, "#9a4a2a") +
    surface(96, "#b5502a") +
    // 砂丘の起伏
    `<path d="M0,120q60,-14 120,0t120,0t120,0t40,0v90H0z" fill="#c46538"/>` +
    `<path d="M0,150q80,-10 160,0t160,0t80,0v60H0z" fill="#a8461f" opacity=".8"/>` +
    // 岩(左右)
    crater(30, 175, 10, "#8a3a1c", "#6a2a10") +
    crater(60, 190, 6, "#8a3a1c", "#6a2a10") +
    crater(360, 180, 12, "#8a3a1c", "#6a2a10") +
    crater(340, 200, 7, "#8a3a1c", "#6a2a10") +
    // 砂塵旋風
    dustDevil(90, 190, 60, "#e8c8a0") +
    dustDevil(300, 200, 44, "#e8c8a0") +
    // 探査車の轍(手前)
    `<g stroke="#7a3418" stroke-width="2" opacity=".6"><path d="M20,205q30,-6 60,0"/><path d="M20,209q30,-6 60,0"/></g>` +
    // 遠くの尾根(オリンポス山の裾野の続き)
    `<path d="M0,110q100,-8 180,2t220,-4" fill="none" stroke="#9a4a2a" stroke-width="2" opacity=".5"/>` +
    // 散らばる小石(手前)
    `<g fill="#8a3a1c" opacity=".8"><circle cx="140" cy="195" r="3"/><circle cx="160" cy="200" r="2"/><circle cx="230" cy="198" r="3"/><circle cx="250" cy="204" r="2"/><circle cx="10" cy="150" r="2.4"/><circle cx="390" cy="160" r="2.4"/></g>` +
    // 小さな二つの月(フォボス・ダイモス、遠景の点)
    `<circle cx="330" cy="30" r="2.4" fill="#c9c4bc"/><circle cx="300" cy="18" r="1.4" fill="#c9c4bc"/>`,

  /**
   * 木星のガスの縞と大赤斑。上空に薄く星、手前にガリレオ衛星のひとつを小さく。
   */
  gasbands:
    space("#050a1c", "#0a1030", 20) +
    starfield(17, 26, 0, 0, 400, 20) +
    surface(20, "#d8b878") +
    cloudBand(30, 20, "#c8a060", 8, 21) +
    cloudBand(52, 24, "#e8d0a0", 7, 22) +
    cloudBand(78, 18, "#b8905a", 9, 23) +
    cloudBand(98, 26, "#e8d0a0", 6, 24) +
    cloudBand(126, 20, "#c8a060", 8, 25) +
    cloudBand(148, 24, "#d8b878", 7, 26) +
    cloudBand(174, 20, "#b8905a", 9, 27) +
    cloudBand(196, 20, "#e8d0a0", 6, 28) +
    // 大赤斑
    `<ellipse cx="300" cy="150" rx="34" ry="20" fill="#c85a3a" opacity=".9"/>` +
    `<ellipse cx="300" cy="150" rx="34" ry="20" fill="none" stroke="#8a3a24" stroke-width="2" opacity=".6"/>` +
    // ガリレオ衛星のひとつ(手前、小さく)
    moonDisc(40, 190, 9, "#c9c4bc") +
    moonDisc(366, 40, 6, "#e8d8c0"),

  /**
   * 土星のガスの縞と環。環は前後から挟むように弧を描き、
   * 手前に霞んだタイタンのような衛星をひとつ。
   */
  ringworld:
    space("#050a1c", "#0a1030", 20) +
    starfield(19, 22, 0, 0, 400, 20) +
    surface(20, "#e8d8a0") +
    cloudBand(30, 22, "#d8c088", 6, 31) +
    cloudBand(54, 20, "#f0e0b0", 5, 32) +
    cloudBand(76, 24, "#c8a870", 7, 33) +
    cloudBand(102, 18, "#f0e0b0", 6, 34) +
    cloudBand(122, 22, "#d8c088", 5, 35) +
    cloudBand(146, 20, "#c8a870", 7, 36) +
    cloudBand(168, 20, "#f0e0b0", 6, 37) +
    cloudBand(190, 20, "#d8c088", 5, 38) +
    // 環(手前を通る大きな弧、奥は星空にかかる細い弧)
    ringArc(200, 40, 260, 14, "#e8dcc0", 0.5) +
    ringArc(200, 190, 320, 26, "#f0ead0", 0.85) +
    ringArc(200, 190, 320, 18, "#c9bfa0", 0.7) +
    // 環の氷の粒(手前の弧の上に散らす)
    `<g fill="#f6efe2" opacity=".8"><circle cx="70" cy="184" r="1.6"/><circle cx="110" cy="196" r="1.4"/><circle cx="290" cy="196" r="1.6"/><circle cx="330" cy="184" r="1.4"/><circle cx="150" cy="202" r="1.2"/><circle cx="250" cy="202" r="1.2"/></g>` +
    // タイタン(霞んだオレンジの衛星、遠景)
    moonDisc(50, 46, 12, "#e8b878"),

  /**
   * 天王星・海王星共用。淡い氷惑星の縞と、うっすら見える環。
   * 2つの氷惑星の中間の色(シアンと深い青の間)にして、どちらの mark
   * (別に色分けしてある)と並んでも違和感が出ないようにしてある。
   */
  icebands: makeIceGiantBg("#5f8fc0", "#8fc0d0", 41),

  /** 岩石天体の地表に立った視点。水星・フォボス・ダイモス・カリスト・
   * ミマス・イアペトゥス・ミランダで使う汎用のクレーター地帯。 */
  rockysurface:
    space("#08101f", "#141c30", 70) +
    starfield(23, 60, 0, 0, 400, 70) +
    surface(70, "#8b8378") +
    `<path d="M0,90q90,-12 180,0t220,-2v122H0z" fill="#726a5f"/>` +
    crater(40, 130, 16, "#5f584c", "#8b8378") +
    crater(90, 165, 10, "#5f584c", "#8b8378") +
    crater(320, 140, 20, "#5f584c", "#8b8378") +
    crater(360, 185, 12, "#5f584c", "#8b8378") +
    crater(20, 190, 8, "#5f584c", "#8b8378") +
    crater(270, 100, 9, "#5f584c", "#8b8378") +
    cliffFace(280, 210, 60, 40, "#5a5348") +
    // 散らばる小石
    `<g fill="#4f483e" opacity=".8">${Array.from({ length: 10 }, (_, i) => {
      const x = 10 + i * 38;
      const y = 175 + ((i * 13) % 30);
      return `<circle cx="${x}" cy="${y}" r="${1.6 + (i % 3)}"/>`;
    }).join("")}</g>` +
    // 遠くの断崖(左)
    cliffFace(0, 130, 40, 40, "#635c50"),

  /** 金星。厚い硫酸雲の海。稲光と圧力計のような渦。 */
  cloudsurface:
    space("#9a7a2a", "#e8c860", 100) +
    surface(100, "#d8b048") +
    cloudBand(110, 20, "#c89838", 8, 51) +
    cloudBand(132, 24, "#e8c860", 7, 52) +
    cloudBand(158, 18, "#b88a2c", 9, 53) +
    cloudBand(178, 22, "#e8c860", 6, 54) +
    cloudBand(200, 10, "#c89838", 8, 55) +
    // 渦(硫酸雲の巨大な渦)
    cloudSwirl(70, 130, 30, "#f0dc90") +
    cloudSwirl(320, 160, 24, "#f0dc90") +
    // 稲光
    `<path d="M60,150l8,14l-6,2l10,18" fill="none" stroke="#fff0c8" stroke-width="2" opacity=".8"/>` +
    `<path d="M340,120l-8,16l6,2l-10,16" fill="none" stroke="#fff0c8" stroke-width="2" opacity=".7"/>` +
    // 手前の観測気球(この高度でしか長くもたない探査手段)
    `<ellipse cx="40" cy="195" rx="16" ry="20" fill="#20364a" opacity=".85"/><line x1="40" y1="215" x2="40" y2="225" stroke="#20364a" stroke-width="1.5"/>` +
    // 渦の縁に沿う細かい雲の房(密度を足す)
    `<g fill="#f0dc90" opacity=".5">${Array.from({ length: 12 }, (_, i) => `<circle cx="${20 + i * 32}" cy="${180 + ((i * 17) % 20)}" r="${3 + (i % 3)}"/>`).join("")}</g>` +
    `<g fill="#c89838" opacity=".6">${Array.from({ length: 6 }, (_, i) => `<ellipse cx="${60 + i * 55}" cy="${100 + (i % 2) * 10}" rx="10" ry="4"/>`).join("")}</g>`,

  /** 氷の衛星の地表。月・エウロパ・ガニメデ・ティタニア・レア・
   * トリトン・カロンで使う汎用の氷原。 */
  icysurface:
    space("#050a1c", "#0a1030", 60) +
    starfield(27, 50, 0, 0, 400, 60) +
    surface(60, "#c9d4dc") +
    iceCrack(20, 90, 60, 40, "#7f96b0") +
    iceCrack(280, 80, 90, 60, "#7f96b0") +
    iceCrack(60, 140, 100, 30, "#9fb0c4") +
    iceCrack(260, 150, -60, 40, "#9fb0c4") +
    crater(30, 170, 8, "#aab8c4", "#e8eef2") +
    crater(360, 185, 12, "#aab8c4", "#e8eef2") +
    crater(340, 100, 6, "#aab8c4", "#e8eef2") +
    crater(15, 110, 5, "#aab8c4", "#e8eef2") +
    // 割れ目の網目模様(手前)
    `<g stroke="#8fa0b4" stroke-width="1.2" opacity=".55">${Array.from({ length: 6 }, (_, i) => `<path d="M${20 + i * 65},185q20,-10 40,0"/>`).join("")}</g>` +
    // 遠くに親星のかけら
    moonDisc(370, 35, 14, "#3f5fc0"),

  /** エンケラドス専用。南極から立ち上る間欠泉の列。 */
  geysersurface:
    space("#050a1c", "#0a1030", 60) +
    starfield(29, 45, 0, 0, 400, 60) +
    surface(60, "#eef0ec") +
    geyserPlume(60, 60, 55, 12) +
    geyserPlume(90, 60, 70, 10) +
    geyserPlume(300, 60, 62, 11) +
    geyserPlume(330, 60, 48, 9) +
    geyserPlume(20, 60, 40, 8) +
    geyserPlume(370, 60, 44, 8) +
    iceCrack(50, 70, 40, 15, "#c8d4dc") +
    iceCrack(280, 70, 60, 15, "#c8d4dc") +
    crater(30, 190, 10, "#dfe6ea", "#f6f8f8") +
    crater(360, 195, 8, "#dfe6ea", "#f6f8f8") +
    // 土星の環がかすかに見える(遠景)
    ringArc(200, 30, 200, 10, "#e8dcc0", 0.35),

  /** イオ専用。暗い溶岩台地に発光する亀裂と噴煙。 */
  lavamoon:
    space("#1a0e08", "#3a1c0c", 60) +
    starfield(31, 20, 0, 0, 400, 60, "#ffdca0") +
    surface(60, "#3a2418") +
    // 硫黄の斑(黄・オレンジ)
    `<ellipse cx="60" cy="120" rx="40" ry="20" fill="#e8c840" opacity=".55"/>` +
    `<ellipse cx="320" cy="150" rx="46" ry="22" fill="#d89830" opacity=".5"/>` +
    lavaCrack(20, 150, 90, 130, 4) +
    lavaCrack(90, 130, 150, 160, 3) +
    lavaCrack(280, 110, 340, 150, 4) +
    lavaCrack(340, 150, 390, 130, 3) +
    // 噴煙(手前)
    `<path d="M300,150q-6,-40 10,-70q10,30 4,70z" fill="#8a8078" opacity=".6"/>` +
    `<path d="M60,180q-8,-30 4,-55q8,26 4,55z" fill="#8a8078" opacity=".5"/>` +
    // 溶岩の光る池
    `<ellipse cx="200" cy="195" rx="28" ry="8" fill="#ff8f3a" opacity=".8"/>` +
    `<ellipse cx="200" cy="195" rx="14" ry="4" fill="#ffe08a"/>` +
    // 木星が空にのしかかる
    `<circle cx="360" cy="35" r="20" fill="#d8b878" opacity=".9"/><path d="M340,35h40" stroke="#b8905a" stroke-width="2" opacity=".7"/>`,

  /** タイタン専用。もやのかかったオレンジの空、メタンの湖と砂丘。 */
  hazyorange:
    space("#b87a30", "#e8b868", 110) +
    surface(110, "#c88f48") +
    cloudBand(120, 16, "#b87a30", 6, 61) +
    cloudBand(138, 14, "#d89850", 5, 62) +
    // 砂丘の畝
    `<path d="M0,160q60,-10 120,0t120,0t120,0t40,0v50H0z" fill="#a86a30" opacity=".85"/>` +
    // メタンの湖(手前)
    `<ellipse cx="90" cy="195" rx="60" ry="14" fill="#3a5a4a" opacity=".85"/>` +
    `<ellipse cx="90" cy="195" rx="60" ry="14" fill="none" stroke="#5a8070" stroke-width="1.4"/>` +
    `<ellipse cx="310" cy="200" rx="36" ry="8" fill="#3a5a4a" opacity=".8"/>` +
    // ホイヘンスの着陸機(手前、シルエット)
    `<path d="M195,175h10l3,10h-16z" fill="#c8a850"/><line x1="200" y1="175" x2="200" y2="160" stroke="#c8a850" stroke-width="1.4"/>` +
    // 遠くにうっすら土星
    `<ellipse cx="360" cy="30" rx="20" ry="4" fill="none" stroke="#c9bfa0" stroke-width="1.4" opacity=".5"/><circle cx="360" cy="30" r="10" fill="#e8d8a0" opacity=".6"/>` +
    // 湖岸の小石と靄の房(密度を足す)
    `<g fill="#8a5a24" opacity=".7">${Array.from({ length: 8 }, (_, i) => `<circle cx="${20 + i * 46}" cy="${185 + (i % 2) * 8}" r="${2 + (i % 3)}"/>`).join("")}</g>` +
    `<g fill="#e8b868" opacity=".35">${Array.from({ length: 6 }, (_, i) => `<ellipse cx="${40 + i * 60}" cy="${110 - (i % 2) * 8}" rx="14" ry="4"/>`).join("")}</g>`,

  /** 小惑星帯(ベスタ・ケレス)。不規則な岩の地表と遠い太陽。 */
  asteroidfield:
    space("#050a1c", "#0a1030", 55) +
    starfield(35, 70, 0, 0, 400, 55) +
    distantSun(40, 30, 6) +
    surface(55, "#a89880") +
    crater(60, 100, 14, "#8f8070", "#c8b8a0") +
    crater(320, 90, 18, "#8f8070", "#c8b8a0") +
    crater(30, 150, 8, "#8f8070", "#c8b8a0") +
    crater(360, 160, 10, "#8f8070", "#c8b8a0") +
    // 塩の斑点(ケレスのオカトルクレーター)
    `<circle cx="200" cy="200" r="10" fill="#f0e8d8" opacity=".85"/><circle cx="212" cy="196" r="5" fill="#f0e8d8" opacity=".7"/>` +
    // 浮遊する小さな岩(手前、微小重力)
    `<g fill="#7a6c58">${Array.from({ length: 8 }, (_, i) => `<circle cx="${20 + i * 46}" cy="${180 - (i % 3) * 8}" r="${2 + (i % 2)}"/>`).join("")}</g>` +
    // 遠景の岩の地平線
    `<path d="M0,90q80,-16 160,0t160,0t80,0" fill="none" stroke="#8f8070" stroke-width="2" opacity=".5"/>`,

  /** 冥王星専用。トンボー地域の窒素の氷原(ハート形)と窒素の山。 */
  plutoheart:
    space("#1a1420", "#2a2438", 70) +
    starfield(37, 55, 0, 0, 400, 70) +
    distantSun(30, 30, 4) +
    surface(70, "#3a3244") +
    // トンボー地域(明るいハート形の氷原、簡略化)
    `<path d="M120,150q-10,-20 10,-30q16,-8 30,4q14,-12 30,-4q20,10 10,30q-20,26 -40,40q-20,-14 -40,-40z" fill="#f0dcc0" opacity=".92"/>` +
    // 窒素の山(氷床の縁)
    `<path d="M60,150L90,110L120,150z" fill="#8a8098" opacity=".8"/>` +
    `<path d="M280,150L310,105L340,150z" fill="#8a8098" opacity=".8"/>` +
    crater(30, 180, 8, "#4a4258", "#6a6278") +
    crater(370, 185, 6, "#4a4258", "#6a6278") +
    // カロンが空に浮かぶ(いつも同じ位置に見える)
    moonDisc(350, 40, 16, "#9a9488"),

  /** 準惑星の汎用地表。ハウメア・マケマケ・エリス・セドナで使う。 */
  dwarfplanetsurface:
    space("#0a0e1c", "#161c2e", 65) +
    starfield(39, 65, 0, 0, 400, 65) +
    distantSun(370, 30, 3) +
    surface(65, "#c8b8a0") +
    `<path d="M0,85q100,-10 200,0t200,0v125H0z" fill="#b8a690" opacity=".9"/>` +
    crater(50, 130, 12, "#a89880", "#e0d4c0") +
    crater(330, 110, 16, "#a89880", "#e0d4c0") +
    crater(20, 180, 7, "#a89880", "#e0d4c0") +
    crater(360, 190, 9, "#a89880", "#e0d4c0") +
    iceCrack(70, 150, 60, 30, "#8f8070") +
    iceCrack(260, 160, -50, 25, "#8f8070") +
    // 遠くの小さな衛星
    moonDisc(40, 40, 8, "#d8ccb0"),

  /** 深宇宙の視界。カイパーベルト・オールトの雲・太陽圏界面で使う。 */
  deepfield:
    space("#04081a", "#080c22", 210) +
    starfield(41, 130, 0, 0, 400, 210) +
    distantSun(30, 190, 4) +
    // 散らばる氷の欠片(手前、微小重力で漂う)
    `<g fill="#8898a8" opacity=".8">${Array.from({ length: 14 }, (_, i) => `<circle cx="${(i * 71) % 400}" cy="${170 + ((i * 37) % 30)}" r="${1.4 + (i % 3)}"/>`).join("")}</g>` +
    // かすかな球状の境界(太陽圏の泡を暗示)
    `<circle cx="200" cy="105" r="360" fill="none" stroke="#6878b0" stroke-width="2" opacity=".18"/>`,

  /** ハレー彗星専用。暗い核と明るいイオンの尾。 */
  comettail:
    space("#04081a", "#080c22", 210) +
    starfield(43, 90, 0, 0, 400, 210) +
    cometTailShape(60, 130, 320, 90, "#bfe8f4") +
    cometTailShape(60, 130, 300, 40, "#f6efe2") +
    // 核(暗く細長い)
    `<ellipse cx="55" cy="130" rx="22" ry="12" fill="#1c1712"/><ellipse cx="55" cy="130" rx="22" ry="12" fill="none" stroke="#3a322a" stroke-width="1.4"/>` +
    // 表面から吹き出すガス
    `<path d="M55,120q-14,-16 -4,-30" fill="none" stroke="#bfe8f4" stroke-width="1.6" opacity=".7"/>` +
    `<path d="M62,140q10,10 6,24" fill="none" stroke="#bfe8f4" stroke-width="1.6" opacity=".6"/>`,

  /** 探査機からの視界。ニューホライズンズ・ボイジャー1号2号で使う。 */
  probedeck:
    space("#04081a", "#080c22", 210) +
    starfield(45, 100, 0, 0, 400, 210) +
    distantSun(370, 20, 3) +
    // 探査機本体(手前、大きめのシルエット)
    `<circle cx="120" cy="175" r="16" fill="#0c1830"/>` +
    `<rect x="60" y="172" width="50" height="6" fill="#c8a850" opacity=".85"/>` +
    `<rect x="130" y="172" width="50" height="6" fill="#c8a850" opacity=".85"/>` +
    `<circle cx="120" cy="175" r="16" fill="none" stroke="#c9d6f0" stroke-width="1.4"/>` +
    `<path d="M120,159v-14" stroke="#c9d6f0" stroke-width="1.4"/>` +
    // 遠くの惑星のかけら
    moonDisc(340, 190, 12, "#a8d8d0") +
    moonDisc(20, 60, 6, "#8898a8"),

  /** パーカー・ソーラー・プローブ専用。太陽の熱を受ける手前のシールド。 */
  sunprobedeck:
    space("#5a1c08", "#f5b31c", 110) +
    flareRays(200, 60, 20, 40, 100, "#ffdf9a", 7) +
    surface(110, "#f5b31c") +
    granule(60, 140, 8, "#e89a1c") + granule(320, 150, 9, "#ffce5a") + granule(20, 170, 7, "#e89a1c") +
    granule(370, 180, 7, "#ffce5a") +
    // 熱シールド(手前、大きく)
    `<path d="M140,210Q160,150 200,150Q240,150 260,210z" fill="#d8d0c0"/>` +
    `<path d="M140,210Q160,150 200,150Q240,150 260,210z" fill="none" stroke="#8a8478" stroke-width="2"/>` +
    `<line x1="200" y1="150" x2="200" y2="130" stroke="#8a8478" stroke-width="2"/>` +
    // シールドの光る縁
    `<path d="M142,205Q162,152 200,152" fill="none" stroke="#ffe08a" stroke-width="2" opacity=".7"/>`,
};

/** 天王星・海王星共用の背景を組み立てる(色だけ差し替える)。 */
function makeIceGiantBg(base, band2, seedBase) {
  return (
    space("#050a1c", "#0a1030", 20) +
    starfield(seedBase, 24, 0, 0, 400, 20) +
    surface(20, base) +
    cloudBand(30, 20, band2, 5, seedBase + 1) +
    cloudBand(52, 22, base, 6, seedBase + 2) +
    cloudBand(78, 16, band2, 4, seedBase + 3) +
    cloudBand(98, 24, base, 5, seedBase + 4) +
    cloudBand(126, 18, band2, 6, seedBase + 5) +
    cloudBand(148, 20, base, 5, seedBase + 6) +
    cloudBand(172, 20, band2, 4, seedBase + 7) +
    cloudBand(196, 18, base, 6, seedBase + 8) +
    // かすかな環(天王星・海王星ともわずかに持つ)
    ringArc(200, 105, 300, 60, "#e8eef0", 0.12) +
    moonDisc(40, 190, 8, "#b0a898") +
    moonDisc(366, 40, 6, "#d8c8c0")
  );
}

// ---------------------------------------------------------------------------
// 都市シンボル(プレビュー5種)。鍵は cities.mjs の `mark` と対応。24×24の座標系。
// ---------------------------------------------------------------------------

export const SOLARSYSTEM_MARKS = {
  /** 燃える円盤(プロミネンス付き)。太陽専用。 */
  sun:
    `<circle cx="12" cy="12" r="7" fill="#f5b31c"/>` +
    `<g stroke="#f5b31c" stroke-width="1.6"><line x1="12" y1="1" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="23"/><line x1="1" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="23" y2="12"/><line x1="4.5" y1="4.5" x2="6.5" y2="6.5"/><line x1="17.5" y1="17.5" x2="19.5" y2="19.5"/><line x1="4.5" y1="19.5" x2="6.5" y2="17.5"/><line x1="17.5" y1="6.5" x2="19.5" y2="4.5"/></g>`,

  /** 青い球に雲と大陸。地球専用。 */
  earth:
    `<circle cx="12" cy="12" r="9" fill="#2f6fb0"/>` +
    `<path d="M6,9q3,-3 6,-1q2,2 -1,3q-3,1 -5,-2z" fill="#3f8f4f"/>` +
    `<path d="M14,14q3,-1 4,2q-1,3 -4,1z" fill="#3f8f4f"/>` +
    `<ellipse cx="9" cy="16" rx="4" ry="1.6" fill="#f6efe2" opacity=".8"/>`,

  /** 赤茶の球にマリネリス峡谷の筋。火星専用。 */
  mars:
    `<circle cx="12" cy="12" r="9" fill="#b5502a"/>` +
    `<path d="M4,13q8,3 16,-2" fill="none" stroke="#7a3418" stroke-width="1.6"/>` +
    `<circle cx="16" cy="7" r="2" fill="#9a4a2a"/>`,

  /** 縞模様の球に大赤斑。木星専用。 */
  jupiter:
    `<circle cx="12" cy="12" r="9" fill="#d8b878"/>` +
    `<path d="M3,9h18" stroke="#b8905a" stroke-width="2"/>` +
    `<path d="M3,15h18" stroke="#b8905a" stroke-width="2"/>` +
    `<ellipse cx="15" cy="12" rx="3.4" ry="2" fill="#c85a3a"/>`,

  /** 環付きの球。土星専用。 */
  saturn:
    `<ellipse cx="12" cy="13" rx="11" ry="3" fill="none" stroke="#c9bfa0" stroke-width="1.6"/>` +
    `<circle cx="12" cy="12" r="6.4" fill="#e8d8a0"/>` +
    `<ellipse cx="12" cy="13" rx="11" ry="3" fill="none" stroke="#f0ead0" stroke-width="1" opacity=".8"/>`,

  /** アンテナと太陽電池パネルを持つ探査機。パーカー・ニューホライズンズ・
   * ボイジャー1号2号で共用。 */
  probe:
    `<circle cx="12" cy="12" r="4" fill="#c9d6f0"/>` +
    `<rect x="2" y="11" width="7" height="2" fill="#c8a850"/>` +
    `<rect x="15" y="11" width="7" height="2" fill="#c8a850"/>` +
    `<line x1="12" y1="8" x2="12" y2="2" stroke="#c9d6f0" stroke-width="1.4"/>` +
    `<circle cx="12" cy="2" r="1.6" fill="#c9d6f0"/>`,

  /** 灰茶の岩石惑星。水星専用。 */
  rockyplanet:
    `<circle cx="12" cy="12" r="9" fill="#9a8f7a"/>` +
    `<circle cx="8" cy="8" r="2.2" fill="#7a7062"/>` +
    `<circle cx="15" cy="14" r="1.6" fill="#7a7062"/>` +
    `<circle cx="9" cy="16" r="1.2" fill="#7a7062"/>`,

  /** 厚い雲に覆われた黄色い球。金星専用。 */
  cloudplanet:
    `<circle cx="12" cy="12" r="9" fill="#d8c078"/>` +
    `<path d="M4,9q8,-4 16,0" fill="none" stroke="#c8a850" stroke-width="1.6" opacity=".8"/>` +
    `<path d="M3,14q9,4 18,0" fill="none" stroke="#c8a850" stroke-width="1.6" opacity=".8"/>`,

  /** 白っぽい氷の球。月・エウロパ・ガニメデ・ティタニア・レア・
   * トリトン・カロンで共用。 */
  icymoon:
    `<circle cx="12" cy="12" r="8" fill="#c9d4dc"/>` +
    `<path d="M6,9q4,3 2,7" fill="none" stroke="#8fa0b4" stroke-width="1.2" opacity=".8"/>` +
    `<path d="M16,8q-2,4 1,8" fill="none" stroke="#8fa0b4" stroke-width="1.2" opacity=".8"/>`,

  /** 灰色でクレーターだらけの球。フォボス・ダイモス・カリスト・ミマス・
   * イアペトゥス・ミランダで共用。 */
  rockymoon:
    `<circle cx="12" cy="12" r="7" fill="#8b8378"/>` +
    `<circle cx="9" cy="9" r="2" fill="#6b6358"/>` +
    `<circle cx="15" cy="14" r="1.6" fill="#6b6358"/>` +
    `<circle cx="8" cy="15" r="1.2" fill="#6b6358"/>`,

  /** 不規則な岩塊。ベスタ・ケレス専用。 */
  asteroid:
    `<path d="M4,12q-1,-6 6,-8q7,-2 10,3q3,5 -1,9q-5,5 -11,3q-5,-2 -4,-7z" fill="#a89880"/>` +
    `<circle cx="9" cy="10" r="1.6" fill="#7a6c58"/>` +
    `<circle cx="15" cy="14" r="1.4" fill="#7a6c58"/>`,

  /** 黄色に発光する亀裂を持つ球。イオ専用。 */
  volcanicmoon:
    `<circle cx="12" cy="12" r="8" fill="#c8a838"/>` +
    `<path d="M6,10q3,2 1,5" fill="none" stroke="#ff8f3a" stroke-width="1.4"/>` +
    `<path d="M16,9q-3,3 0,7" fill="none" stroke="#ff8f3a" stroke-width="1.4"/>` +
    `<circle cx="9" cy="16" r="1.6" fill="#e8443f" opacity=".85"/>`,

  /** もやのかかったオレンジの球。タイタン専用。 */
  hazymoon:
    `<circle cx="12" cy="12" r="8" fill="#d89850"/>` +
    `<circle cx="12" cy="12" r="8" fill="none" stroke="#f0c890" stroke-width="1.6" opacity=".7"/>` +
    `<ellipse cx="10" cy="14" rx="3" ry="1.4" fill="#3a5a4a" opacity=".8"/>`,

  /** 淡いシアンの球。天王星専用(横倒しの環を添える)。 */
  uranus:
    `<circle cx="12" cy="12" r="8" fill="#a8d8d0"/>` +
    `<ellipse cx="12" cy="12" rx="3" ry="10" fill="none" stroke="#e8eef0" stroke-width="1.4" opacity=".7" transform="rotate(20 12 12)"/>`,

  /** 深い青の球。海王星専用(風の筋を添える)。 */
  neptune:
    `<circle cx="12" cy="12" r="8" fill="#3f5fc0"/>` +
    `<path d="M5,10q7,-3 14,1" fill="none" stroke="#7f9fe0" stroke-width="1.4" opacity=".8"/>` +
    `<ellipse cx="15" cy="14" rx="2.4" ry="1.4" fill="#20348a"/>`,

  /** 尾を引く彗星。ハレー彗星専用。 */
  comet:
    `<circle cx="15" cy="9" r="4" fill="#2a2620"/>` +
    `<path d="M15,9L2,18" fill="none" stroke="#bfe8f4" stroke-width="2.6" opacity=".6"/>` +
    `<path d="M15,9L4,14" fill="none" stroke="#f6efe2" stroke-width="1.6" opacity=".7"/>`,

  /** ハート形の斑を持つ淡い球。冥王星専用。 */
  pluto:
    `<circle cx="12" cy="12" r="7" fill="#d8b088"/>` +
    `<path d="M10,11q-1,-2 1,-2q1,0 1,1q0,-1 1,-1q2,0 1,2q-1,2 -2,3q-1,-1 -2,-3z" fill="#f0dcc0"/>`,

  /** 小さく淡い準惑星の球。ハウメア・マケマケ・エリス・セドナで共用。 */
  dwarfplanet:
    `<circle cx="12" cy="12" r="6.4" fill="#c8b8a0"/>` +
    `<circle cx="12" cy="12" r="6.4" fill="none" stroke="#8f8070" stroke-width="1" opacity=".6"/>`,

  /** 小さな点の群れ。カイパーベルト・オールトの雲専用。 */
  beltcloud:
    `<g fill="#8898a8">${[
      [5, 9, 1.6], [9, 5, 1.2], [13, 8, 1.8], [17, 6, 1.2], [7, 15, 1.4],
      [12, 17, 1.6], [16, 14, 1.2], [19, 11, 1.4], [4, 14, 1.2],
    ].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join("")}</g>`,

  /** 淡い泡の輪郭。太陽圏界面専用。 */
  boundary:
    `<circle cx="12" cy="12" r="9" fill="none" stroke="#6878b0" stroke-width="2" opacity=".7"/>` +
    `<circle cx="12" cy="12" r="9" fill="#6878b0" opacity=".12"/>` +
    `<circle cx="12" cy="12" r="3" fill="#f0ead6" opacity=".8"/>`,
};
