/**
 * 茨城県の都市イラスト。
 *
 * `IBARAKI_MARKS` は 24×24 の座標系に描くシンボル、`IBARAKI_BG` は 400×210 の
 * 座標系に描く背景シーン(いずれもSVG断片の文字列)。フランス・世界一周と同じく
 * 最初から文字列として持つ。動きは含めない(アニメーションはReact側で重ねる)。
 *
 * 色は他の盤面と揃える。空 #8fc4e8〜#cfe4f0、顔・白 #f6efe2、
 * 強調 #f5b31c/#e8443f/#5b8fe8。茨城らしさは
 * **梅の紅 #c4384f、台地の砂 #d8c8a0、干し芋の飴色 #d8a24a、
 * 松と杉の濃緑 #2f5f3f、常磐の海の青 #2f6ea8** で出す。
 *
 * 鍵は `cities.mjs` の `mark` / `bg` と一対一で対応する。
 * 増やすときは両方を揃えること。
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

/** 空。関東平野は空が広いので、他の盤面より帯を高く取る。 */
/**
 * 空。**第3引数に「次に来る塗りの開始y」を渡すこと。**
 *
 * 既定では y=124 までしか塗らないので、地面が y=128 から始まるシーンでは
 * あいだの4行が塗り残しになり、カードの地色がそのまま透ける。
 * エラーにならないので気づけない(茨城で3種が透けていた)。
 *
 * `node scripts/check-city-backgrounds.mjs ibaraki` で検査できる。
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

/**
 * 筑波山。**この県の背景の要**なので部品にしてある。
 * 二峰なので、必ず左右で高さを変えた二つの山を描くこと。
 */
function tsukuba(cx, base, h, fill = "#7f8fa8") {
  const w = r1(h * 1.9);
  const gap = r1(h * 0.46);
  return (
    `<path d="M${r1(cx - w / 2)},${base}L${r1(cx - gap)},${r1(base - h * 0.92)}L${r1(cx - gap + w * 0.26)},${base}z" fill="${fill}"/>` +
    `<path d="M${r1(cx - w * 0.18)},${base}L${r1(cx + gap * 0.6)},${r1(base - h)}L${r1(cx + w / 2)},${base}z" fill="${fill}"/>`
  );
}

/** 遠景のなだらかな丘。県北以外はこれで十分。 */
function hills(y, fill, count = 4) {
  const parts = [];
  for (let i = 0; i < count; i++) {
    const cx = 40 + (i * W) / count;
    parts.push(`<path d="M${cx - 74},${y}c22,-30 52,-30 74,0z" fill="${fill}"/>`);
  }
  return `<g opacity=".9">${parts.join("")}</g>`;
}

/** 水面の反射線。 */
function ripples(y, color = "#bfe8f4") {
  return `<g stroke="${color}" stroke-width="2" opacity=".7" fill="none"><path d="M26,${y}h74M176,${y + 12}h92M108,${y + 24}h62"/></g>`;
}

/** 杉。県北の谷と社叢に使う。まっすぐで細いのが茨城の植林の姿。 */
function cedar(x, base, h, fill = "#2f5f3f") {
  const w = r1(h * 0.34);
  return (
    `<rect x="${r1(x - 1.6)}" y="${r1(base - 6)}" width="3.2" height="6" fill="#5a4630"/>` +
    `<path d="M${r1(x - w / 2)},${r1(base - 4)}L${x},${r1(base - h)}L${r1(x + w / 2)},${r1(base - 4)}z" fill="${fill}"/>` +
    `<path d="M${r1(x - w / 2.4)},${r1(base - h * 0.46)}L${x},${r1(base - h * 0.94)}L${r1(x + w / 2.4)},${r1(base - h * 0.46)}z" fill="${fill}"/>`
  );
}

/** 丸い樹冠の木。 */
function roundTree(x, base, r, crown = "#3f8f4f", trunk = "#6b5330") {
  const th = r1(r * 1.2);
  return (
    `<rect x="${r1(x - r * 0.16)}" y="${r1(base - th - r * 0.3)}" width="${r1(r * 0.32)}" height="${r1(th + r * 0.3)}" fill="${trunk}"/>` +
    `<circle cx="${x}" cy="${r1(base - th - r * 0.55)}" r="${r}" fill="${crown}"/>`
  );
}

/** 梅の木。枝が曲がり、花が点で付く。桜と描き分けるため幹を黒く太く。 */
function plumTree(x, base, h) {
  const c = "#c4384f";
  const dots = [];
  for (let i = 0; i < 9; i++) {
    const a = (i / 9) * Math.PI * 2;
    dots.push(
      `<circle cx="${r1(x + Math.cos(a) * h * 0.34)}" cy="${r1(base - h * 0.68 + Math.sin(a) * h * 0.3)}" r="${r1(h * 0.09)}" fill="${c}"/>`,
    );
  }
  return (
    `<path d="M${x},${base}c-2,${r1(-h * 0.4)} -6,${r1(-h * 0.45)} -9,${r1(-h * 0.6)}M${x},${base}c2,${r1(-h * 0.4)} 7,${r1(-h * 0.5)} 10,${r1(-h * 0.62)}" stroke="#3b2a1c" stroke-width="3" fill="none" stroke-linecap="round"/>` +
    `<rect x="${r1(x - 2.4)}" y="${r1(base - h * 0.5)}" width="4.8" height="${r1(h * 0.5)}" fill="#3b2a1c"/>` +
    dots.join("")
  );
}

/** 切妻の家。棟が低く、瓦が黒いのが関東の平屋の姿。 */
function house(x, base, w, h, wall = "#f6efe2", roof = "#4a4436") {
  const hw = r1(w / 2);
  return (
    `<rect x="${r1(x - hw)}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${wall}"/>` +
    `<path d="M${r1(x - hw - 4)},${r1(base - h)}L${x},${r1(base - h - h * 0.62)}L${r1(x + hw + 4)},${r1(base - h)}z" fill="${roof}"/>` +
    `<rect x="${r1(x - w * 0.14)}" y="${r1(base - h * 0.6)}" width="${r1(w * 0.28)}" height="${r1(h * 0.6)}" fill="#6b5330"/>`
  );
}

/** 鳥居。笠木が両端で反り上がる明神型。 */
function torii(x, base, h, fill = "#c4384f") {
  const w = r1(h * 0.86);
  return (
    `<path d="M${r1(x - w / 2 - 5)},${r1(base - h)}q${r1(w / 2 + 5)},${r1(-h * 0.1)} ${r1(w + 10)},0v5q${r1(-w / 2 - 5)},${r1(h * 0.07)} ${r1(-w - 10)},0z" fill="${fill}"/>` +
    `<rect x="${r1(x - w / 2 - 1)}" y="${r1(base - h * 0.78)}" width="${r1(w + 2)}" height="4.5" fill="${fill}"/>` +
    `<rect x="${r1(x - w / 2)}" y="${r1(base - h)}" width="5" height="${h}" fill="${fill}"/>` +
    `<rect x="${r1(x + w / 2 - 5)}" y="${r1(base - h)}" width="5" height="${h}" fill="${fill}"/>`
  );
}

/** 蓮田。丸い葉が水面に浮く。 */
function lotusField(y) {
  const parts = [];
  for (let i = 0; i < 11; i++) {
    const x = 18 + i * 35 + (i % 2) * 12;
    const yy = y + (i % 3) * 9;
    parts.push(`<ellipse cx="${x}" cy="${yy}" rx="15" ry="6" fill="#3f8f4f"/>`);
    parts.push(`<ellipse cx="${x}" cy="${r1(yy - 1.5)}" rx="9" ry="3.4" fill="#5aa85f" opacity=".8"/>`);
  }
  return parts.join("");
}

/** 干し場。棚に薄切りの芋が並ぶ。 */
function dryingRack(x, base, w) {
  const rows = [];
  for (let r = 0; r < 3; r++) {
    const y = r1(base - 10 - r * 11);
    rows.push(`<rect x="${x}" y="${y}" width="${w}" height="6" fill="#d8a24a"/>`);
    rows.push(`<rect x="${x}" y="${r1(y + 6)}" width="${w}" height="1.6" fill="#a8763a"/>`);
  }
  return (
    `<rect x="${r1(x - 3)}" y="${r1(base - 44)}" width="3" height="44" fill="#6b5330"/>` +
    `<rect x="${r1(x + w)}" y="${r1(base - 44)}" width="3" height="44" fill="#6b5330"/>` +
    rows.join("")
  );
}

// ---------------------------------------------------------------------------
// 背景シーン(13種)。鍵は cities.mjs の `bg` と対応。
// ---------------------------------------------------------------------------

export const IBARAKI_BG = {
  /** 城下町。堀と土塁の上に低い櫓、手前に梅。 */
  castletown:
    sky("#8fc4e8", "#cfe4f0", 128) +
    clouds(78, 32) +
    hills(126, "#8fae7a") +
    ground(126, "#7f9f5f") +
    band(150, 12, "#4a7fa8") +
    `<rect x="120" y="96" width="160" height="30" fill="#7f8f5c"/>` +
    `<rect x="176" y="66" width="52" height="34" fill="#f6efe2"/>` +
    `<path d="M166,66h72l-10,-14h-52z" fill="#4a4436"/>` +
    `<rect x="192" y="80" width="20" height="20" fill="#3b2a1c"/>` +
    plumTree(60, 190, 46) +
    plumTree(340, 196, 40) +
    plumTree(268, 186, 32),

  /** 焼き物の町。登り窯が斜面に段を作り、煙が細く上がる。 */
  pottery:
    sky("#8fc4e8", "#e8d8bf") +
    clouds(300, 30, 0.8) +
    hills(122, "#7f8f5c") +
    ground(122, "#a88f5f") +
    `<path d="M60,168L250,110l26,0l0,58z" fill="#8a7250"/>` +
    `<g fill="#5a4630">` +
    `<rect x="86" y="150" width="26" height="18"/><rect x="128" y="139" width="26" height="18"/>` +
    `<rect x="170" y="128" width="26" height="18"/><rect x="212" y="117" width="26" height="18"/></g>` +
    `<g fill="#e8443f"><rect x="92" y="156" width="14" height="12"/><rect x="134" y="145" width="14" height="12"/>` +
    `<rect x="176" y="134" width="14" height="12"/><rect x="218" y="123" width="14" height="12"/></g>` +
    `<path d="M264,110c6,-16 -6,-24 2,-40" stroke="#f6efe2" stroke-width="5" fill="none" opacity=".7" stroke-linecap="round"/>` +
    `<g fill="#c9a877"><ellipse cx="326" cy="176" rx="20" ry="22"/><ellipse cx="326" cy="154" rx="13" ry="5"/></g>` +
    `<ellipse cx="360" cy="184" rx="15" ry="16" fill="#8a7250"/>`,

  /** 海辺。岩の上の鳥居と、水平線から昇る日。 */
  seaside:
    sky("#f5b31c", "#f6d9a8") +
    sun(300, 56, 26, "#f6efe2") +
    band(112, 98, "#2f6ea8") +
    ripples(140) +
    ripples(176, "#8fc4e8") +
    `<path d="M84,190c8,-30 30,-44 56,-42c22,2 30,16 34,42z" fill="#3b3a3c"/>` +
    torii(130, 150, 52) +
    `<path d="M0,206c30,-8 70,-8 100,0z" fill="#3b3a3c" opacity=".8"/>`,

  /** 港町。防波堤と工場の影、係留された小型船。 */
  harbourtown:
    sky("#8fc4e8", "#cfe4f0") +
    clouds(96, 28) +
    band(118, 92, "#2f6ea8") +
    ripples(150) +
    `<g fill="#6b6b74"><rect x="240" y="76" width="20" height="42"/><rect x="276" y="88" width="14" height="30"/>` +
    `<rect x="230" y="98" width="80" height="20"/></g>` +
    `<path d="M246,76c4,-14 -4,-20 2,-32" stroke="#f6efe2" stroke-width="4" fill="none" opacity=".6" stroke-linecap="round"/>` +
    `<rect x="0" y="118" width="140" height="10" fill="#8a8272"/>` +
    `<path d="M56,152h84l-12,20h-60z" fill="#f6efe2"/>` +
    `<rect x="86" y="130" width="6" height="22" fill="#3b2a1c"/>` +
    `<path d="M92,132h30l-30,16z" fill="#e8443f"/>`,

  /** 内陸の緑の街。並木と低い建物、遠くに筑波山。 */
  citygreen:
    sky("#8fc4e8", "#cfe4f0", 128) +
    clouds(70, 30) +
    tsukuba(320, 128, 54) +
    ground(128, "#7f9f5f") +
    band(128, 8, "#8fae7a") +
    `<g fill="#f6efe2"><rect x="40" y="88" width="34" height="40"/><rect x="86" y="72" width="28" height="56"/>` +
    `<rect x="126" y="96" width="40" height="32"/></g>` +
    `<g fill="#5b8fe8" opacity=".7"><rect x="46" y="96" width="8" height="8"/><rect x="60" y="96" width="8" height="8"/>` +
    `<rect x="92" y="82" width="8" height="8"/><rect x="92" y="100" width="8" height="8"/></g>` +
    roundTree(206, 176, 20) +
    roundTree(252, 182, 16) +
    roundTree(160, 186, 14) +
    roundTree(64, 188, 15),

  /** 湖の港。帆引き船の四角い帆が横を向いて浮かぶ。 */
  lakeport:
    sky() +
    clouds(300, 26, 0.8) +
    hills(112, "#8fae7a", 3) +
    band(112, 98, "#4a8fb8") +
    ripples(146) +
    `<g><rect x="150" y="84" width="4" height="70" fill="#3b2a1c"/>` +
    `<path d="M154,86h84v58h-84z" fill="#f6efe2"/>` +
    `<g stroke="#c9a877" stroke-width="1.6"><path d="M176,86v58M198,86v58M220,86v58"/></g>` +
    `<path d="M126,152h140l-16,16h-108z" fill="#5a4630"/></g>` +
    `<g opacity=".85"><rect x="52" y="120" width="3" height="34" fill="#3b2a1c"/>` +
    `<path d="M55,122h34v26h-34z" fill="#f6efe2"/><path d="M38,152h64l-8,10h-48z" fill="#5a4630"/></g>`,

  /** 蓮田。低い水面いっぱいに丸い葉、遠景は平ら。 */
  wetland:
    sky() +
    clouds(88, 26) +
    band(112, 10, "#8fae7a") +
    band(122, 88, "#6b8f7a") +
    lotusField(132) +
    `<path d="M300,140c0,-14 8,-22 14,-22c-4,8 -2,16 4,20z" fill="#f6efe2"/>` +
    `<circle cx="316" cy="136" r="7" fill="#e8a8bf"/>` +
    `<g stroke="#3f8f4f" stroke-width="2.4" fill="none"><path d="M316,143v22M296,150v18"/></g>`,

  /** 水田。畦で区切られた水面が空を映す。 */
  ricefield:
    sky() +
    clouds(120, 24, 0.9) +
    hills(114, "#8fae7a", 3) +
    band(114, 96, "#9fc4d8") +
    `<g stroke="#7f9f5f" stroke-width="4" fill="none"><path d="M0,134h400M0,158h400M0,184h400M120,114v96M268,114v96"/></g>` +
    `<g fill="#5f9f4f" opacity=".8">` +
    Array.from({ length: 22 }, (_, i) => {
      const x = 14 + (i % 11) * 36;
      const y = 126 + Math.floor(i / 11) * 26;
      return `<path d="M${x},${y}l-4,-8M${x},${y}v-10M${x},${y}l4,-8" stroke="#5f9f4f" stroke-width="2" fill="none"/>`;
    }).join("") +
    `</g>`,

  /** 川の渡し。堤と広い川面、対岸は低い。 */
  riverport:
    sky() +
    clouds(70, 28) +
    band(108, 12, "#8fae7a") +
    band(120, 90, "#5f9fc4") +
    ripples(152, "#bfe8f4") +
    `<rect x="0" y="104" width="400" height="6" fill="#a89a72"/>` +
    `<path d="M150,166h108l-14,18h-80z" fill="#5a4630"/>` +
    `<rect x="196" y="140" width="4" height="26" fill="#3b2a1c"/>` +
    `<path d="M200,142h28l-28,14z" fill="#f6efe2"/>` +
    house(56, 108, 46, 22) +
    house(330, 110, 40, 20),

  /** 社叢。杉の暗い列と、その奥の朱い門。 */
  shrineforest:
    sky("#7fb4d8", "#cfe4f0") +
    hills(120, "#5f7f4f", 3) +
    ground(120, "#4a6b3f") +
    `<g>` +
    cedar(40, 200, 96) +
    cedar(84, 204, 78) +
    cedar(320, 202, 88) +
    cedar(364, 206, 70) +
    `</g>` +
    `<path d="M150,204h100l-8,-56h-84z" fill="#3f5f3a"/>` +
    torii(200, 190, 66) +
    `<g fill="#8a8272"><rect x="176" y="196" width="48" height="4"/><rect x="180" y="202" width="40" height="4"/></g>`,

  /**
   * 谷。両側から迫る斜面と、そのあいだの細い流れ。
   * 空の下帯を淡い青のままにし、谷底を高く取ること。
   * ここを砂色にすると、谷ではなく砂丘に見える(一度そうなった)。
   */
  valley2:
    sky("#8fc4e8", "#cfe4f0", 128) +
    `<path d="M0,60L120,210H0z" fill="#5f7f4f"/>` +
    `<path d="M400,50L268,210h132z" fill="#4a6b3f"/>` +
    hills(128, "#6b8f5a", 3) +
    ground(128, "#7f8f5c") +
    `<path d="M150,210c10,-40 20,-56 46,-70c-14,26 -18,44 -14,70z" fill="#9fc4d8"/>` +
    `<g>` +
    cedar(88, 190, 62) +
    cedar(300, 188, 58) +
    cedar(334, 200, 48) +
    `</g>` +
    `<path d="M196,140c8,-18 6,-32 -2,-44" stroke="#f6efe2" stroke-width="6" fill="none" opacity=".8" stroke-linecap="round"/>`,

  /** 海岸の町。低い崖の上に家が並び、下に浜。 */
  coasttown:
    sky() +
    clouds(310, 30, 0.9) +
    band(104, 106, "#2f6ea8") +
    ripples(140) +
    `<path d="M0,104h230l-14,34H0z" fill="#8fae7a"/>` +
    `<rect x="0" y="138" width="216" height="10" fill="#c9a877"/>` +
    house(48, 104, 44, 22) +
    house(112, 104, 36, 18) +
    house(172, 104, 40, 20) +
    `<path d="M0,178c40,-10 90,-10 130,0z" fill="#e8dfc8"/>`,

  /** 集落。低い家と生垣、屋敷林。関東平野の農家の姿。 */
  villagehouse:
    sky() +
    clouds(96, 30) +
    hills(122, "#8fae7a", 4) +
    ground(122, "#8f9f5f") +
    `<g>` +
    cedar(300, 150, 62) +
    cedar(330, 154, 52) +
    cedar(356, 150, 58) +
    `</g>` +
    house(130, 178, 96, 40) +
    house(226, 180, 46, 24, "#e8dfc8") +
    `<rect x="0" y="182" width="400" height="6" fill="#5f8f4f"/>` +
    dryingRack(38, 178, 56),
};

// ---------------------------------------------------------------------------
// シンボル(13種)。24×24。鍵は cities.mjs の `mark` と対応。
// ---------------------------------------------------------------------------

export const IBARAKI_MARKS = {
  /** 梅。水戸。五弁で、中心に蕊を点で置く。 */
  plum:
    '<g fill="#c4384f">' +
    Array.from({ length: 5 }, (_, i) => {
      const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
      return `<circle cx="${r1(12 + Math.cos(a) * 5.6)}" cy="${r1(12 + Math.sin(a) * 5.6)}" r="4.2"/>`;
    }).join("") +
    '</g><circle cx="12" cy="12" r="3" fill="#f6efe2"/>' +
    '<g fill="#f5b31c"><circle cx="12" cy="9.4" r="1"/><circle cx="14.4" cy="12.8" r="1"/><circle cx="9.6" cy="12.8" r="1"/></g>',

  /** 窯。笠間。段になった登り窯と火。 */
  craft:
    '<path d="M2,20L16,7h4v13z" fill="#8a7250"/>' +
    '<g fill="#5a4630"><rect x="4.4" y="15.6" width="4.4" height="4.4"/><rect x="10.4" y="12.4" width="4.4" height="4.4"/></g>' +
    '<g fill="#e8443f"><rect x="5.6" y="17" width="2" height="3"/><rect x="11.6" y="13.8" width="2" height="3"/></g>' +
    '<path d="M20.6,7c1.6,-3 -1,-4.2 0.4,-6.6" stroke="#8a8272" stroke-width="1.4" fill="none" stroke-linecap="round"/>' +
    '<rect x="1" y="20" width="22" height="2.6" fill="#4a4436"/>',

  /** 鳥居。大洗・鹿島。 */
  faith:
    '<path d="M2.6,6.6q9.4,-2 18.8,0v3.4q-9.4,-1.6 -18.8,0z" fill="#c4384f"/>' +
    '<rect x="4.4" y="11" width="15.2" height="2.6" fill="#c4384f"/>' +
    '<rect x="5.4" y="6.6" width="3" height="15.4" fill="#c4384f"/>' +
    '<rect x="15.6" y="6.6" width="3" height="15.4" fill="#c4384f"/>' +
    '<rect x="1.6" y="22" width="20.8" height="1.6" fill="#3b2a1c"/>',

  /** 歯車。日立。 */
  steam:
    '<g fill="#6b6b74">' +
    Array.from(
      { length: 8 },
      (_, i) => `<rect x="10.6" y="0.8" width="2.8" height="5" transform="rotate(${r1((i * 360) / 8)} 12 12)"/>`,
    ).join("") +
    '</g><circle cx="12" cy="12" r="7.4" fill="#8a8272"/><circle cx="12" cy="12" r="3.2" fill="#f6efe2"/>',

  /** ロケット。つくば。 */
  science:
    '<path d="M12,1c3.4,3.6 4.8,8.2 4.8,12.6H7.2C7.2,9.2 8.6,4.6 12,1z" fill="#f6efe2"/>' +
    '<path d="M7.2,13.6L3.4,18.6h4.4zM16.8,13.6L20.6,18.6h-4.4z" fill="#e8443f"/>' +
    '<circle cx="12" cy="8.4" r="2.4" fill="#5b8fe8"/>' +
    '<path d="M9.6,18.6h4.8l-2.4,4.6z" fill="#f5b31c"/>',

  /** 帆引き船。かすみがうら・行方。四角い帆が横を向く。 */
  boat:
    '<rect x="6.4" y="3" width="1.8" height="13" fill="#3b2a1c"/>' +
    '<path d="M8.2,3.8h11.4v10.6H8.2z" fill="#f6efe2"/>' +
    '<g stroke="#c9a877" stroke-width="0.8"><path d="M11.8,3.8v10.6M15.4,3.8v10.6"/></g>' +
    '<path d="M2.6,16.6h18.8l-3,4.6H5.6z" fill="#5a4630"/>' +
    '<path d="M1,22.4h22" stroke="#4a8fb8" stroke-width="1.6"/>',

  /** 蓮。土浦・かすみがうら。 */
  flowerfield:
    '<ellipse cx="12" cy="18.6" rx="10" ry="3.6" fill="#3f8f4f"/>' +
    '<ellipse cx="12" cy="17.6" rx="6" ry="2.2" fill="#5aa85f"/>' +
    '<g fill="#e8a8bf">' +
    Array.from({ length: 6 }, (_, i) => {
      const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
      return `<ellipse cx="${r1(12 + Math.cos(a) * 3.6)}" cy="${r1(9.6 + Math.sin(a) * 3.6)}" rx="2.6" ry="3.6" transform="rotate(${r1((i * 360) / 6)} ${r1(12 + Math.cos(a) * 3.6)} ${r1(9.6 + Math.sin(a) * 3.6)})"/>`;
    }).join("") +
    '</g><circle cx="12" cy="9.6" r="2.2" fill="#f5b31c"/>',

  /** 花火。土浦。競技として裁かれる菊型。 */
  festival:
    '<g stroke="#f5b31c" stroke-width="1.4" stroke-linecap="round">' +
    Array.from({ length: 12 }, (_, i) => {
      const a = (i / 12) * Math.PI * 2;
      return `<path d="M${r1(12 + Math.cos(a) * 3)},${r1(11 + Math.sin(a) * 3)}L${r1(12 + Math.cos(a) * 9.6)},${r1(11 + Math.sin(a) * 9.6)}"/>`;
    }).join("") +
    '</g>' +
    '<g fill="#e8443f">' +
    Array.from({ length: 12 }, (_, i) => {
      const a = (i / 12) * Math.PI * 2;
      return `<circle cx="${r1(12 + Math.cos(a) * 9.6)}" cy="${r1(11 + Math.sin(a) * 9.6)}" r="1.5"/>`;
    }).join("") +
    '</g><circle cx="12" cy="11" r="2.4" fill="#f6efe2"/>',

  /** 城。水戸・古河。低い櫓と石垣。 */
  castle:
    '<path d="M2,22h20l-2.6,-6H4.6z" fill="#8a8272"/>' +
    '<rect x="6.4" y="8.4" width="11.2" height="7.6" fill="#f6efe2"/>' +
    '<path d="M4.4,8.4h15.2l-2.6,-3.4H7z" fill="#4a4436"/>' +
    '<path d="M7.4,5h9.2l-2,-2.6h-5.2z" fill="#4a4436"/>' +
    '<rect x="10.6" y="11.4" width="2.8" height="4.6" fill="#3b2a1c"/>',

  /** 干し芋の棚。ひたちなか一帯。 */
  harvest:
    '<rect x="2.6" y="4" width="2" height="17" fill="#6b5330"/>' +
    '<rect x="19.4" y="4" width="2" height="17" fill="#6b5330"/>' +
    '<g fill="#d8a24a"><rect x="4.6" y="6" width="14.8" height="3.4"/><rect x="4.6" y="11.4" width="14.8" height="3.4"/>' +
    '<rect x="4.6" y="16.8" width="14.8" height="3.4"/></g>' +
    '<g fill="#a8763a"><rect x="4.6" y="9.4" width="14.8" height="1"/><rect x="4.6" y="14.8" width="14.8" height="1"/>' +
    '<rect x="4.6" y="20.2" width="14.8" height="1"/></g>',

  /** 筑波山。二峰。県南のしるし。 */
  scenery:
    '<path d="M1,21L8.4,7.6L14,21z" fill="#7f8fa8"/>' +
    '<path d="M9.4,21L16.4,5.6L23,21z" fill="#6b7f98"/>' +
    '<path d="M14.2,10.4L16.4,5.6L18.7,10.4L17.2,9.4L16.4,8.2L15.6,9.4z" fill="#f6efe2"/>' +
    '<rect x="1" y="21" width="22" height="1.8" fill="#4a6b3f"/>',

  /** 筆と紬。結城・笠間の手仕事。 */
  brush:
    '<path d="M15.6,2.4l6,6L11,19l-6,-6z" fill="#c9a877"/>' +
    '<path d="M15.6,2.4l6,6l1.4,-1.4a4.2,4.2 0 0 0 -6,-6z" fill="#8a7250"/>' +
    '<path d="M5,13l-3.4,8.4L10,18z" fill="#3b2a1c"/>' +
    '<g stroke="#f6efe2" stroke-width="0.9" opacity=".8"><path d="M9.4,8.6l6,6M12.4,5.6l6,6"/></g>',

  /** 予科練の飛行機。阿見。 */
  airplane:
    '<path d="M12,2c1.4,0 2.4,1.6 2.4,4.4v6.2l7.6,4.6v2.4l-7.6,-2.2v3.4l2.4,1.8v1.4L12,22.6L7.2,24v-1.4l2.4,-1.8v-3.4L2,19.6v-2.4l7.6,-4.6V6.4C9.6,3.6 10.6,2 12,2z" fill="#8a8272"/>' +
    '<circle cx="12" cy="8.4" r="1.8" fill="#5b8fe8"/>',
};
