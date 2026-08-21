/**
 * オセアニア大陸盤の都市イラスト。
 *
 * `OCEANIA_MARKS` は 24×24 の座標系に描くシンボル、`OCEANIA_BG` は
 * 400×210 の座標系に描く背景シーン(いずれもSVG断片の文字列)。フランスと
 * 同じく最初から文字列として持ち、動きは含めない。
 *
 * ## この盤面の芯
 *
 * **鉄道はほとんど来なかった大陸で、来た場合は決まって一つの資源のためだけに
 * 敷かれ、人を運ぶための線には最後までならなかった。**51都市を結ぶ54本の路線の
 * うち、陸路はたった3本しかない。だから **鉄道の絵で埋めない。**線路が出るのは
 * サトウキビ鉄道(`sugarmill`)・ニッケルの狭軌(`junglemine`)・掘り尽くして
 * 止まった燐鉱石の線(`pinnacles`)の3枚だけで、いずれも**貨物しか積んでいない。**
 * ほかは桟橋・艀・小型貨物機・環礁のあいだの水路で「線路が無いこと」を描く。
 *
 * ## 描かないもの
 *
 * - **「南の島の楽園」で埋めない。**ヤシとビーチと夕日だけ並べると51都市の
 *   努力が絵で台無しになる。曇り・嵐・灰・赤土・石灰岩の白・錆を意識して混ぜる。
 * - **重い題材(核実験・掘り尽くし・戦跡・海面上昇)は惨状として描かない。**
 *   遺体・暴力・爆発の瞬間は描かず、**構造**で語る。無人の環礁、沈んだ艦影、
 *   掘り尽くされた尖塔、高潮が届いた家の前。
 * - 島嶼の集団を「顔」で代表させない。**建築・水・道具・船**で語る。
 *
 * 色はフランス・インドと揃える。空 #8fc4e8〜、砂 #efe2c6、顔 #f6efe2、
 * 強調 #f5b31c/#e8443f/#5b8fe8。オセアニアらしさは潟のターコイズ #57c8c0、
 * 外洋の #1f5f8f、赤土 #a85a3a、珊瑚石灰岩の #ded6c4、錆の #8a4a30 で出す。
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
 * 既定の118はすぐ下に海か地面が来る場合の値で、水平線がもっと下にあるシーンで
 * そのままにすると、あいだが横一文字に透ける。
 * 確認は `node scripts/check-city-backgrounds.mjs --src oceania`。
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

/** 貿易風の下に並ぶ、横に長い積雲の列。 */
function tradeClouds(y, fill = "#f6efe2", o = ".7") {
  const p = [];
  for (const [x, s] of [
    [26, 1],
    [96, 0.7],
    [188, 0.85],
    [268, 0.6],
    [346, 0.95],
  ]) {
    p.push(clouds(x, r1(y + (x % 17) - 8), s, fill, "1"));
  }
  return `<g opacity="${o}">${p.join("")}</g>`;
}

/**
 * 海。`y` から下端まで必ず塗る(地面を兼ねるので塗り残しが出ない)。
 * 遠いほど濃く、手前ほど明るくして奥行きを出す。
 */
function sea(y, deep = "#1f5f8f", mid = "#2f7fa8", near = "#4aa8c0") {
  const h = 210 - y;
  return (
    `<rect x="0" y="${y}" width="${W}" height="${h}" fill="${near}"/>` +
    `<rect x="0" y="${y}" width="${W}" height="${r1(h * 0.36)}" fill="${deep}"/>` +
    `<rect x="0" y="${r1(y + h * 0.36)}" width="${W}" height="${r1(h * 0.3)}" fill="${mid}"/>`
  );
}

/** 水面のうねり。 */
function swell(y, color = "#bfe8f4", o = ".5") {
  return (
    `<g stroke="${color}" stroke-width="2" opacity="${o}" fill="none" stroke-linecap="round">` +
    `<path d="M16,${y}q9,-3 18,0M112,${r1(y + 10)}q9,-3 18,0M256,${r1(y + 4)}q9,-3 18,0` +
    `M332,${r1(y + 16)}q9,-3 18,0M56,${r1(y + 22)}q11,-4 22,0M300,${r1(y + 30)}q11,-4 22,0` +
    `M150,${r1(y + 34)}q11,-4 22,0M28,${r1(y + 44)}q13,-4 26,0M344,${r1(y + 50)}q13,-4 26,0"/></g>`
  );
}

/** 礁の上で砕ける白波の線。 */
function surf(y, o = ".85") {
  const p = [];
  for (let x = -10; x < W + 20; x += 46) {
    p.push(`M${x},${y}q11,-6 23,0q12,6 23,0`);
  }
  return `<g stroke="#f2f8fa" stroke-width="3.4" opacity="${o}" fill="none" stroke-linecap="round"><path d="${p.join("")}"/></g>`;
}

/** 荒れた海の白い頭。 */
function whitecaps(y, n = 7) {
  const p = [];
  for (let i = 0; i < n; i++) {
    const x = r1(10 + (i * 380) / n + (i % 3) * 9);
    const yy = r1(y + (i % 4) * 14);
    p.push(
      `<path d="M${x},${yy}q10,-9 21,-2q-8,-2 -12,4q-4,4 -9,-2z" fill="#eef6f8" opacity=".9"/>`,
    );
  }
  return p.join("");
}

/** 遠い島影。輪郭だけ。 */
function islandFar(x, y, w, h, fill = "#5f8080") {
  const hw = r1(w / 2);
  return `<path d="M${r1(x - hw)},${y}q${r1(w * 0.2)},${r1(-h * 0.95)} ${hw},${r1(-h * 0.9)}q${r1(w * 0.3)},${r1(-h * 0.1)} ${hw},${r1(h * 0.9)}z" fill="${fill}"/>`;
}

/** 水平線に長く伸びる環礁の縁(細い緑の糸)。 */
function atollRim(y, fill = "#4f7f5a", h = 4) {
  return (
    `<path d="M0,${y}q60,${-h} 118,${r1(-h * 0.6)}q70,${r1(-h * 0.5)} 140,${r1(-h * 0.2)}q80,${r1(h * 0.2)} 142,${r1(h * 0.4)}v${r1(h + 3)}H0z" fill="${fill}"/>` +
    `<path d="M0,${r1(y + h)}h400v3H0z" fill="#cfe0d0" opacity=".5"/>`
  );
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

/** 険しい稜線(マルケサス・高地)。 */
function jaggedRidge(y, h, fill, seed = 1) {
  let d = `M0,${y}`;
  for (let i = 0; i < 9; i++) {
    const up = r1(h * (0.45 + ((i * seed) % 5) / 7));
    d += `l22,${-up}l24,${r1(up * 0.72)}`;
  }
  return `<path d="${d}V${y + 60}H0z" fill="${fill}"/>`;
}

/** ヤシ。`lean` は幹の傾き。葉は6枚のレンズ形。 */
function palm(x, base, h, lean = 0, frond = "#2f7f4a", trunk = "#7a6247", nuts = true) {
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
  if (nuts) {
    parts.push(
      `<g fill="#8a6f3a"><circle cx="${r1(topX - 3)}" cy="${r1(topY + 3)}" r="2.2"/><circle cx="${r1(topX + 3)}" cy="${r1(topY + 4)}" r="2"/></g>`,
    );
  }
  return parts.join("");
}

/** タコノキ(パンダナス)。気根と剣状の葉。護符もこの葉で編む。 */
function pandanus(x, base, h, leaf = "#3f8f52") {
  const topY = r1(base - h);
  const parts = [`<path d="M${r1(x - 2.4)},${base}L${r1(x - 1.4)},${topY}h2.8L${r1(x + 2.4)},${base}z" fill="#6b5a44"/>`];
  for (const d of [-8, -4, 4, 8]) {
    parts.push(
      `<path d="M${x},${r1(base - h * 0.36)}L${r1(x + d)},${base}" stroke="#6b5a44" stroke-width="1.8" fill="none"/>`,
    );
  }
  const n = 9;
  for (let i = 0; i < n; i++) {
    const a = Math.PI * (0.06 + (0.88 * i) / (n - 1));
    const ex = r1(x - Math.cos(a) * h * 0.56);
    const ey = r1(topY - Math.sin(a) * h * 0.32 + h * 0.12);
    parts.push(
      `<path d="M${x},${topY}Q${r1((x + ex) / 2)},${r1(ey - 4)} ${ex},${ey}" stroke="${leaf}" stroke-width="2.8" stroke-linecap="round" fill="none"/>`,
    );
  }
  return parts.join("");
}

/** パンノキ・マンゴーなど、丸く広がる樹。 */
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

/** マングローブの根(水際)。 */
function mangrove(x, waterY, s = 1) {
  const p = [`<ellipse cx="${x}" cy="${r1(waterY - 14 * s)}" rx="${r1(15 * s)}" ry="${r1(9 * s)}" fill="#2f6b42"/>`];
  for (const d of [-11, -5, 2, 9]) {
    p.push(
      `<path d="M${r1(x + d * 0.5 * s)},${r1(waterY - 10 * s)}Q${r1(x + d * s)},${r1(waterY - 4 * s)} ${r1(x + d * 1.3 * s)},${r1(waterY + 2 * s)}" stroke="#4a3a2a" stroke-width="${r1(2 * s)}" fill="none"/>`,
    );
  }
  return p.join("");
}

/** トタン屋根の家。太平洋の町並みの基本形。 */
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

/** 高床の家。支柱の下が見えることが大事(高潮のときに効く)。 */
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

/** 草葺きの丸い家(高地)。 */
function roundHut(x, base, r, thatch = "#a8894a") {
  return (
    `<path d="M${r1(x - r)},${base}v${r1(-r * 0.55)}h${r1(r * 2)}v${r1(r * 0.55)}z" fill="#8a7350"/>` +
    `<path d="M${r1(x - r * 1.25)},${r1(base - r * 0.55)}Q${x},${r1(base - r * 2.5)} ${r1(x + r * 1.25)},${r1(base - r * 0.55)}z" fill="${thatch}"/>` +
    `<g stroke="#7f6636" stroke-width="1.2" opacity=".7" fill="none"><path d="M${r1(x - r * 0.7)},${r1(base - r * 1.05)}Q${x},${r1(base - r * 2)} ${r1(x + r * 0.7)},${r1(base - r * 1.05)}"/></g>` +
    `<path d="M${r1(x - r * 0.3)},${base}v${r1(-r * 0.5)}h${r1(r * 0.6)}v${r1(r * 0.5)}z" fill="#4a3a26"/>`
  );
}

/**
 * 高い切妻の家(セピック川の精霊堂・ヤップの集会所・PNG国会)。
 * **建築で語るための形。**人物は出さない。
 */
function gableHouse(x, base, w, h, thatch = "#9a7f46", wall = "#c8b48a") {
  const cx = r1(x + w / 2);
  return (
    `<rect x="${r1(x + w * 0.08)}" y="${r1(base - h * 0.42)}" width="${r1(w * 0.84)}" height="${r1(h * 0.42)}" fill="${wall}"/>` +
    `<path d="M${x},${r1(base - h * 0.34)}L${cx},${r1(base - h)}L${r1(x + w)},${r1(base - h * 0.34)}L${r1(x + w - 6)},${r1(base - h * 0.3)}L${cx},${r1(base - h * 0.9)}L${r1(x + 6)},${r1(base - h * 0.3)}z" fill="${thatch}"/>` +
    `<path d="M${r1(x + 6)},${r1(base - h * 0.32)}L${cx},${r1(base - h * 0.92)}L${r1(x + w - 6)},${r1(base - h * 0.32)}z" fill="${thatch}" opacity=".82"/>` +
    `<g stroke="#7a6436" stroke-width="1.3" opacity=".65" fill="none"><path d="M${r1(x + 16)},${r1(base - h * 0.4)}L${cx},${r1(base - h * 0.86)}M${r1(x + w - 16)},${r1(base - h * 0.4)}L${cx},${r1(base - h * 0.86)}"/></g>` +
    `<rect x="${r1(cx - 5)}" y="${r1(base - h * 0.3)}" width="10" height="${r1(h * 0.3)}" fill="#5a4630"/>` +
    `<path d="M${cx},${r1(base - h - 7)}v9" stroke="#5a4630" stroke-width="2.4" fill="none"/>`
  );
}

/** 白い教会。太平洋の町でいちばん高い建物はたいていこれ。 */
function church(x, base, w, h) {
  const tw = r1(w * 0.34);
  return (
    `<rect x="${x}" y="${r1(base - h * 0.56)}" width="${w}" height="${r1(h * 0.56)}" fill="#f2ece0"/>` +
    `<path d="M${r1(x - 4)},${r1(base - h * 0.56)}h${w + 8}l-8,-11h${r1(-w + 8)}z" fill="#9aa4ac"/>` +
    `<rect x="${r1(x + w * 0.1)}" y="${r1(base - h)}" width="${tw}" height="${h}" fill="#f6f2e8"/>` +
    `<path d="M${r1(x + w * 0.1 - 3)},${r1(base - h)}L${r1(x + w * 0.1 + tw / 2)},${r1(base - h - 18)}L${r1(x + w * 0.1 + tw + 3)},${r1(base - h)}z" fill="#9aa4ac"/>` +
    `<path d="M${r1(x + w * 0.1 + tw / 2)},${r1(base - h - 26)}v9M${r1(x + w * 0.1 + tw / 2 - 3.4)},${r1(base - h - 22)}h6.8" stroke="#7f8890" stroke-width="1.8" fill="none"/>` +
    `<g fill="#5f7f96"><rect x="${r1(x + w * 0.1 + tw / 2 - 3)}" y="${r1(base - h + 10)}" width="6" height="8"/>` +
    `<rect x="${r1(x + w * 0.56)}" y="${r1(base - h * 0.44)}" width="8" height="11" rx="4"/>` +
    `<rect x="${r1(x + w * 0.78)}" y="${r1(base - h * 0.44)}" width="8" height="11" rx="4"/></g>` +
    `<rect x="${r1(x + w * 0.3)}" y="${r1(base - h * 0.34)}" width="11" height="${r1(h * 0.34)}" fill="#6b5330"/>`
  );
}

/** 桟橋。杭と板。**この盤面の駅にあたるもの。** */
function jetty(x0, x1, deckY, waterY, deck = "#8a7454") {
  const p = [`<rect x="${x0}" y="${deckY}" width="${r1(x1 - x0)}" height="5" fill="${deck}"/>`];
  p.push(`<rect x="${x0}" y="${r1(deckY + 5)}" width="${r1(x1 - x0)}" height="2" fill="#5f4c33"/>`);
  for (let x = x0 + 6; x < x1; x += 22) {
    p.push(`<rect x="${r1(x)}" y="${r1(deckY + 5)}" width="4" height="${r1(waterY - deckY + 6)}" fill="#5f4c33"/>`);
  }
  return p.join("");
}

/** 朽ちた杭だけが残っている桟橋の跡。 */
function ruinedPiles(xs, waterY, h = 16) {
  return xs
    .map(
      (x, i) =>
        `<rect x="${x}" y="${r1(waterY - h - (i % 3) * 4)}" width="3.6" height="${r1(h + (i % 3) * 4 + 4)}" fill="#5a4a34"/>` +
        `<ellipse cx="${r1(x + 1.8)}" cy="${waterY}" rx="5" ry="2" fill="#000" opacity=".16"/>`,
    )
    .join("");
}

/** アウトリガーのカヌー。 */
function outrigger(x, y, s = 1, hull = "#6b5330", sail = null) {
  const p = [
    `<path d="M${r1(x - 26 * s)},${y}q${r1(26 * s)},${r1(9 * s)} ${r1(52 * s)},0q${r1(-26 * s)},${r1(-5 * s)} ${r1(-52 * s)},0z" fill="${hull}"/>`,
    `<path d="M${r1(x - 22 * s)},${r1(y + 2 * s)}q${r1(22 * s)},${r1(5 * s)} ${r1(44 * s)},0" stroke="#4a3a24" stroke-width="${r1(1.6 * s)}" fill="none"/>`,
    `<path d="M${r1(x - 14 * s)},${y}l${r1(-9 * s)},${r1(9 * s)}M${r1(x + 10 * s)},${y}l${r1(-9 * s)},${r1(9 * s)}" stroke="#6b5330" stroke-width="${r1(2 * s)}" fill="none"/>`,
    `<path d="M${r1(x - 32 * s)},${r1(y + 9 * s)}q${r1(11 * s)},${r1(3.4 * s)} ${r1(22 * s)},0q${r1(-11 * s)},${r1(-2 * s)} ${r1(-22 * s)},0z" fill="#7a6242"/>`,
  ];
  if (sail) {
    p.push(
      `<path d="M${x},${r1(y - 2 * s)}L${r1(x + 3 * s)},${r1(y - 34 * s)}L${r1(x + 22 * s)},${r1(y - 3 * s)}z" fill="${sail}"/>`,
      `<path d="M${x},${r1(y - 2 * s)}L${r1(x + 3 * s)},${r1(y - 34 * s)}" stroke="#4a3a24" stroke-width="${r1(1.6 * s)}" fill="none"/>`,
    );
  }
  return p.join("");
}

/** 小型の艀・バナナボート。 */
function skiff(x, y, s = 1, hull = "#3f6f9a") {
  return (
    `<path d="M${r1(x - 20 * s)},${y}q${r1(20 * s)},${r1(10 * s)} ${r1(40 * s)},0q${r1(-20 * s)},${r1(-4 * s)} ${r1(-40 * s)},0z" fill="${hull}"/>` +
    `<path d="M${r1(x - 14 * s)},${r1(y - 1 * s)}h${r1(28 * s)}v${r1(2 * s)}h${r1(-28 * s)}z" fill="#e8e0cc"/>` +
    `<rect x="${r1(x + 10 * s)}" y="${r1(y - 7 * s)}" width="${r1(6 * s)}" height="${r1(7 * s)}" fill="#4a4438"/>`
  );
}

/** 貨物船。**この盤面の「機関車」。** */
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
  // 甲板のコンテナ
  const cols = [
    ["#3f7f9a", -54, -24],
    ["#c8a13f", -38, -24],
    ["#8a5a9a", -22, -24],
    ["#4f9a5f", -6, -24],
    ["#c8452f", -38, -32],
    ["#3f7f9a", -22, -32],
  ];
  for (const [c, dx, dy] of cols) {
    p.push(`<rect x="${r1(x + dx * s)}" y="${r1(y + dy * s)}" width="${r1(15 * s)}" height="${r1(8 * s)}" fill="${c}"/>`);
  }
  // デリック
  p.push(
    `<path d="M${r1(x - 46 * s)},${r1(y - 16 * s)}v${r1(-26 * s)}M${r1(x - 46 * s)},${r1(y - 40 * s)}l${r1(20 * s)},${r1(12 * s)}" stroke="#5f5a4a" stroke-width="${r1(2.2 * s)}" fill="none"/>`,
  );
  return p.join("");
}

/** 砂に埋まった錆びた上陸用舟艇。**戦跡は残骸の形だけで語る。** */
function rustedHulk(x, base, s = 1, rot = 0) {
  const g = `<g transform="translate(${x},${base}) rotate(${rot}) scale(${s})">`;
  return (
    g +
    `<path d="M-46,0h84l-6,-22h-72z" fill="#8a4a30"/>` +
    `<path d="M-46,-4h84v-4h-84z" fill="#6b3722"/>` +
    `<path d="M-40,-22h30l4,-14h-30z" fill="#7a4128"/>` +
    `<path d="M14,-22h20v-10h-20z" fill="#6b3722"/>` +
    `<g fill="#a86a48" opacity=".8"><rect x="-30" y="-18" width="14" height="4"/><rect x="0" y="-14" width="20" height="3"/><rect x="-42" y="-9" width="10" height="3"/></g>` +
    `<g fill="#33302c"><rect x="-24" y="-32" width="4" height="10"/><rect x="-8" y="-30" width="4" height="8"/></g>` +
    `<path d="M38,0l16,-6v6z" fill="#7a4128"/>` +
    `</g>`
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

/** 木箱。 */
function crate(x, base, w = 16, h = 12, fill = "#b08a4f") {
  return (
    `<rect x="${x}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${fill}"/>` +
    `<g stroke="#7f6234" stroke-width="1.6" fill="none"><path d="M${x},${r1(base - h)}l${w},${h}M${r1(x + w)},${r1(base - h)}l${-w},${h}"/></g>` +
    `<rect x="${x}" y="${r1(base - h)}" width="${w}" height="2.4" fill="#8a6b3a"/>`
  );
}

/** 海鳥。 */
function gull(x, y, s = 1, color = "#3a3a34") {
  return `<path d="M${r1(x - 7 * s)},${y}q${r1(3.5 * s)},${r1(-4.5 * s)} ${r1(7 * s)},0q${r1(3.5 * s)},${r1(-4.5 * s)} ${r1(7 * s)},0" stroke="${color}" stroke-width="${r1(1.6 * s)}" fill="none" stroke-linecap="round"/>`;
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

/** 噴煙・煙。上へ広がる楕円の重なり。 */
function plume(x, base, h, s = 1, color = "#b8b2a8", o = ".85") {
  const p = [];
  const n = 6;
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    p.push(
      `<ellipse cx="${r1(x + t * 16 * s)}" cy="${r1(base - t * h)}" rx="${r1((7 + t * 20) * s)}" ry="${r1((5 + t * 13) * s)}"/>`,
    );
  }
  return `<g fill="${color}" opacity="${o}">${p.join("")}</g>`;
}

/** 火山錐。 */
function volcanoCone(x, base, h, w, rock = "#4a4038", top = "#5f544a") {
  const hw = r1(w / 2);
  return (
    `<path d="M${r1(x - hw)},${base}L${r1(x - w * 0.09)},${r1(base - h)}h${r1(w * 0.18)}L${r1(x + hw)},${base}z" fill="${rock}"/>` +
    `<path d="M${r1(x - w * 0.09)},${r1(base - h)}h${r1(w * 0.18)}L${r1(x + w * 0.14)},${r1(base - h + 5)}h${r1(-w * 0.28)}z" fill="${top}"/>` +
    `<g fill="#33302c" opacity=".45"><path d="M${x},${r1(base - h + 4)}L${r1(x + w * 0.2)},${base}L${r1(x + hw)},${base}z"/></g>`
  );
}

/** 掘り尽くしたあとの石灰岩の尖塔(ナウル・バナバ)。 */
function pinnacle(x, base, h, w, fill = "#ded6c4", shadow = "#b8ae98") {
  const hw = r1(w / 2);
  return (
    `<path d="M${r1(x - hw)},${base}L${r1(x - hw * 0.3)},${r1(base - h * 0.62)}L${r1(x - hw * 0.45)},${r1(base - h * 0.7)}L${x},${r1(base - h)}L${r1(x + hw * 0.4)},${r1(base - h * 0.66)}L${r1(x + hw * 0.28)},${r1(base - h * 0.58)}L${r1(x + hw)},${base}z" fill="${fill}"/>` +
    `<path d="M${x},${r1(base - h)}L${r1(x + hw * 0.4)},${r1(base - h * 0.66)}L${r1(x + hw * 0.28)},${r1(base - h * 0.58)}L${r1(x + hw)},${base}L${r1(x + hw * 0.2)},${base}z" fill="${shadow}"/>`
  );
}

/** キノコ型の石灰岩の島(パラオのロックアイランド)。下が波で抉れている。 */
function mushroomIslet(x, waterY, w, h) {
  const hw = r1(w / 2);
  return (
    `<path d="M${r1(x - hw * 0.5)},${waterY}q${r1(-hw * 0.5)},${r1(-h * 0.2)} ${r1(-hw * 0.2)},${r1(-h * 0.36)}q${r1(hw * 0.4)},${r1(-h * 0.5)} ${hw},${r1(-h * 0.52)}q${r1(hw * 0.7)},${r1(0)} ${r1(hw * 1.1)},${r1(h * 0.5)}q${r1(hw * 0.24)},${r1(h * 0.22)},${r1(-hw * 0.3)},${r1(h * 0.38)}z" fill="#9a9a86"/>` +
    `<path d="M${r1(x - hw * 0.9)},${r1(waterY - h * 0.5)}q${r1(hw * 0.9)},${r1(-h * 0.55)} ${r1(hw * 1.9)},${r1(-h * 0.02)}q${r1(-hw * 0.9)},${r1(h * 0.3)} ${r1(-hw * 1.9)},${r1(h * 0.02)}z" fill="#2f6b42"/>` +
    `<path d="M${r1(x - hw * 0.6)},${r1(waterY - h * 0.62)}q${r1(hw * 0.6)},${r1(-h * 0.3)} ${r1(hw * 1.3)},${r1(-h * 0.04)}q${r1(-hw * 0.6)},${r1(h * 0.2)} ${r1(-hw * 1.3)},${r1(h * 0.04)}z" fill="#3f8f52"/>` +
    `<ellipse cx="${x}" cy="${waterY}" rx="${r1(hw * 0.8)}" ry="${r1(3)}" fill="#000" opacity=".14"/>`
  );
}

/** 土嚢の列。海面上昇と高潮の手当て。 */
function sandbags(x, base, n = 5, s = 1) {
  const p = [];
  for (let row = 0; row < 2; row++) {
    for (let i = 0; i < n - row; i++) {
      const bx = r1(x + i * 15 * s + row * 7.5 * s);
      const by = r1(base - row * 8 * s);
      p.push(
        `<ellipse cx="${bx}" cy="${by}" rx="${r1(8 * s)}" ry="${r1(4.6 * s)}" fill="${row % 2 ? "#b0a486" : "#c2b494"}"/>`,
        `<path d="M${r1(bx - 7 * s)},${by}q${r1(7 * s)},${r1(2.6 * s)} ${r1(14 * s)},0" stroke="#8a7f62" stroke-width="${r1(1.2 * s)}" fill="none"/>`,
      );
    }
  }
  return p.join("");
}

/** 旗竿。旗は無地(文字も紋章も描かない)。 */
function flagPole(x, base, h, fill, stripe = null) {
  const top = r1(base - h);
  return (
    `<rect x="${r1(x - 1.2)}" y="${top}" width="2.4" height="${h}" fill="#b8b2a4"/>` +
    `<path d="M${r1(x + 1.2)},${r1(top + 2)}q10,4 22,0q-2,7 0,13q-12,4 -22,0z" fill="${fill}"/>` +
    (stripe ? `<path d="M${r1(x + 1.2)},${r1(top + 7)}q10,4 22,0v4q-12,4 -22,0z" fill="${stripe}"/>` : "")
  );
}

/** 金網のフェンス。立入制限。 */
function chainFence(x0, x1, top, h) {
  const p = [
    `<rect x="${x0}" y="${top}" width="${r1(x1 - x0)}" height="2.6" fill="#9aa0a0"/>`,
    `<rect x="${x0}" y="${r1(top + h)}" width="${r1(x1 - x0)}" height="2.6" fill="#9aa0a0"/>`,
  ];
  const mesh = [];
  for (let x = x0 - h; x < x1 + h; x += 11) {
    mesh.push(`M${r1(x)},${top}l${h},${h}M${r1(x)},${r1(top + h)}l${h},${-h}`);
  }
  p.push(
    `<g stroke="#aeb4b2" stroke-width="1.1" opacity=".8" fill="none"><path d="${mesh.join("")}"/></g>`,
  );
  for (let x = x0 + 4; x < x1; x += 62) {
    p.push(`<rect x="${r1(x)}" y="${r1(top - 4)}" width="4.4" height="${r1(h + 26)}" fill="#8a9090"/>`);
  }
  return p.join("");
}

/** 文字の無い注意標識(黄地に黒帯)。 */
function warnSign(x, base, s = 1) {
  return (
    `<rect x="${r1(x - 1.4 * s)}" y="${r1(base - 22 * s)}" width="${r1(2.8 * s)}" height="${r1(22 * s)}" fill="#8a8f8a"/>` +
    `<rect x="${r1(x - 11 * s)}" y="${r1(base - 36 * s)}" width="${r1(22 * s)}" height="${r1(16 * s)}" rx="${r1(2 * s)}" fill="#f0c33a"/>` +
    `<g fill="#33302c"><rect x="${r1(x - 8 * s)}" y="${r1(base - 32 * s)}" width="${r1(16 * s)}" height="${r1(3 * s)}"/><rect x="${r1(x - 8 * s)}" y="${r1(base - 27 * s)}" width="${r1(11 * s)}" height="${r1(3 * s)}"/></g>`
  );
}

/** 小型の貨物機(高翼・尾輪)。道路の代わりに荷を運ぶ。 */
function bushPlane(x, base, s = 1, body = "#e0dccc", trim = "#c8452f") {
  return (
    `<g><path d="M${r1(x - 34 * s)},${r1(base - 14 * s)}q${r1(10 * s)},${r1(-8 * s)} ${r1(30 * s)},${r1(-8 * s)}h${r1(28 * s)}q${r1(12 * s)},0 ${r1(14 * s)},${r1(6 * s)}q${r1(-6 * s)},${r1(6 * s)} ${r1(-20 * s)},${r1(6 * s)}h${r1(-40 * s)}z" fill="${body}"/>` +
    `<path d="M${r1(x - 34 * s)},${r1(base - 14 * s)}h${r1(56 * s)}v${r1(3 * s)}h${r1(-56 * s)}z" fill="${trim}"/>` +
    `<path d="M${r1(x - 36 * s)},${r1(base - 22 * s)}h${r1(52 * s)}v${r1(4 * s)}h${r1(-52 * s)}z" fill="${body}"/>` +
    `<path d="M${r1(x - 8 * s)},${r1(base - 22 * s)}v${r1(4 * s)}" stroke="#8a8f8a" stroke-width="${r1(1.6 * s)}"/>` +
    `<path d="M${r1(x - 34 * s)},${r1(base - 14 * s)}l${r1(-4 * s)},${r1(-16 * s)}h${r1(9 * s)}l${r1(2 * s)},${r1(16 * s)}z" fill="${trim}"/>` +
    `<g fill="#5f7f96"><rect x="${r1(x + 8 * s)}" y="${r1(base - 20 * s)}" width="${r1(9 * s)}" height="${r1(6 * s)}" rx="${r1(2 * s)}"/><rect x="${r1(x - 4 * s)}" y="${r1(base - 20 * s)}" width="${r1(7 * s)}" height="${r1(6 * s)}"/></g>` +
    `<path d="M${r1(x + 26 * s)},${r1(base - 20 * s)}v${r1(14 * s)}" stroke="#4a4438" stroke-width="${r1(2.4 * s)}"/>` +
    `<g fill="#33302c"><circle cx="${r1(x + 2 * s)}" cy="${r1(base - 2 * s)}" r="${r1(4 * s)}"/><circle cx="${r1(x - 26 * s)}" cy="${r1(base - 2 * s)}" r="${r1(3 * s)}"/></g>` +
    `<rect x="${r1(x + 0.6 * s)}" y="${r1(base - 8 * s)}" width="${r1(2.4 * s)}" height="${r1(6 * s)}" fill="#5f5a4a"/></g>`
  );
}

/** キビを積んだ狭軌の貨車。**客は乗らない。** */
function caneWagon(x, base, s = 1) {
  const p = [
    `<rect x="${r1(x - 20 * s)}" y="${r1(base - 16 * s)}" width="${r1(40 * s)}" height="${r1(12 * s)}" fill="#6b6a5a"/>`,
    `<g stroke="#4a4a40" stroke-width="${r1(1.2 * s)}" fill="none"><path d="M${r1(x - 14 * s)},${r1(base - 16 * s)}v${r1(12 * s)}M${r1(x)},${r1(base - 16 * s)}v${r1(12 * s)}M${r1(x + 14 * s)},${r1(base - 16 * s)}v${r1(12 * s)}"/></g>`,
  ];
  for (let i = 0; i < 7; i++) {
    p.push(
      `<path d="M${r1(x - 19 * s + i * 5.6 * s)},${r1(base - 16 * s)}q${r1(3 * s)},${r1(-8 * s)} ${r1(7 * s)},${r1(-9 * s)}" stroke="#8f9a4a" stroke-width="${r1(2.6 * s)}" fill="none" stroke-linecap="round"/>`,
    );
  }
  p.push(
    `<g fill="#33302c"><circle cx="${r1(x - 12 * s)}" cy="${r1(base - 2 * s)}" r="${r1(3.4 * s)}"/><circle cx="${r1(x + 12 * s)}" cy="${r1(base - 2 * s)}" r="${r1(3.4 * s)}"/></g>`,
  );
  return p.join("");
}

/** 610mmの狭軌。**枕木が細かい。** */
function narrowTrack(y, from = 0, to = W, tie = "#6b5a3a", rail = "#7f8288") {
  const ties = [];
  for (let x = from; x < to; x += 11) ties.push(`<rect x="${r1(x)}" y="${y}" width="6" height="7"/>`);
  return (
    `<g fill="${tie}">${ties.join("")}</g>` +
    `<rect x="${from}" y="${r1(y + 1)}" width="${r1(to - from)}" height="2.2" fill="${rail}"/>` +
    `<rect x="${from}" y="${r1(y + 5)}" width="${r1(to - from)}" height="2.2" fill="${rail}"/>`
  );
}

/** 石貨(ヤップ)。穴のあいた円盤。 */
function stoneDisc(x, base, r, tilt = 0) {
  return (
    `<g transform="translate(${x},${r1(base - r)}) rotate(${tilt})">` +
    `<ellipse cx="0" cy="0" rx="${r}" ry="${r1(r * 0.96)}" fill="#cfc7b0"/>` +
    `<ellipse cx="0" cy="0" rx="${r}" ry="${r1(r * 0.96)}" fill="none" stroke="#a89e84" stroke-width="1.6"/>` +
    `<ellipse cx="${r1(-r * 0.16)}" cy="${r1(-r * 0.16)}" rx="${r1(r * 0.72)}" ry="${r1(r * 0.7)}" fill="none" stroke="#b8ae94" stroke-width="1.2" opacity=".7"/>` +
    `<circle cx="0" cy="0" r="${r1(r * 0.2)}" fill="#8a8068"/>` +
    `</g>` +
    shade(x, base, r1(r * 0.9), 3.4, ".18")
  );
}

/** 珊瑚の頭(浅瀬に散らす)。 */
function coralHead(x, y, s = 1, fill = "#c87a6a") {
  return (
    `<g fill="${fill}" opacity=".85"><ellipse cx="${x}" cy="${y}" rx="${r1(9 * s)}" ry="${r1(5 * s)}"/>` +
    `<ellipse cx="${r1(x - 6 * s)}" cy="${r1(y - 3 * s)}" rx="${r1(5 * s)}" ry="${r1(3.4 * s)}"/>` +
    `<ellipse cx="${r1(x + 6 * s)}" cy="${r1(y - 2 * s)}" rx="${r1(4.4 * s)}" ry="${r1(3 * s)}"/></g>`
  );
}

/** 魚の群れ。 */
function fishSchool(x, y, n = 6, s = 1, fill = "#f2e0a8") {
  const p = [];
  for (let i = 0; i < n; i++) {
    const fx = r1(x + (i % 3) * 13 * s);
    const fy = r1(y + Math.floor(i / 3) * 9 * s + (i % 2) * 3);
    p.push(
      `<path d="M${fx},${fy}q${r1(5 * s)},${r1(-3 * s)} ${r1(10 * s)},0q${r1(-5 * s)},${r1(3 * s)} ${r1(-10 * s)},0zM${fx},${fy}l${r1(-4 * s)},${r1(-2.6 * s)}v${r1(5.2 * s)}z"/>`,
    );
  }
  return `<g fill="${fill}" opacity=".9">${p.join("")}</g>`;
}

/** 泡の列(潜水)。 */
function bubbles(x, y, h, s = 1) {
  const p = [];
  for (let i = 0; i < 7; i++) {
    p.push(
      `<circle cx="${r1(x + (i % 2 ? 4 : -3) * s)}" cy="${r1(y - (i * h) / 7)}" r="${r1((1.6 + i * 0.5) * s)}"/>`,
    );
  }
  return `<g fill="#e0f4fa" opacity=".7">${p.join("")}</g>`;
}

/** ハイビスカスの茂み。 */
function hibiscus(x, base, s = 1) {
  return (
    `<ellipse cx="${x}" cy="${r1(base - 8 * s)}" rx="${r1(16 * s)}" ry="${r1(10 * s)}" fill="#2f6b42"/>` +
    `<ellipse cx="${r1(x - 9 * s)}" cy="${r1(base - 5 * s)}" rx="${r1(9 * s)}" ry="${r1(6 * s)}" fill="#3f8f52"/>` +
    `<g fill="#e8443f"><circle cx="${r1(x - 7 * s)}" cy="${r1(base - 12 * s)}" r="${r1(2.6 * s)}"/><circle cx="${r1(x + 6 * s)}" cy="${r1(base - 9 * s)}" r="${r1(2.4 * s)}"/><circle cx="${r1(x + 12 * s)}" cy="${r1(base - 13 * s)}" r="${r1(2.2 * s)}"/></g>`
  );
}

/** 草の株(環礁のわずかな草)。 */
function tuft(x, base, s = 1, fill = "#5f8f4a") {
  const p = [];
  for (const d of [-5, -2, 1, 4]) {
    p.push(
      `<path d="M${x},${base}q${r1(d * 0.6 * s)},${r1(-5 * s)} ${r1(d * s)},${r1(-9 * s)}" stroke="${fill}" stroke-width="${r1(1.6 * s)}" fill="none" stroke-linecap="round"/>`,
    );
  }
  return p.join("");
}

// ---------------------------------------------------------------------------
// 背景シーン(400×210)
//
// **中央 x=151〜249 / y=54〜152 はシンボルに、(200,155)の楕円は影に隠れる。**
// 見せたいものは左右3分の1と y>170 に置く。
// ---------------------------------------------------------------------------

export const OCEANIA_BG = {
  /**
   * 製糖工場と610mmの狭軌(ラウトカ・ラバサ)。
   * **この盤面で線路が出る3枚のうちの1枚。**積んでいるのはキビだけ。
   */
  sugarmill:
    sky("#a8c0c0", "#ded4b8", 104) +
    tradeClouds(30, "#efe8d4", ".6") +
    hills(104, "#7f8f62", 3) +
    ground(104, "#c2ab72") +
    // 製糖工場(左)
    `<rect x="6" y="52" width="96" height="62" fill="#9a9284"/>` +
    `<rect x="6" y="52" width="96" height="5" fill="#7f776a"/>` +
    `<g fill="#5f7f96"><rect x="14" y="66" width="12" height="14"/><rect x="34" y="66" width="12" height="14"/><rect x="54" y="66" width="12" height="14"/><rect x="74" y="66" width="12" height="14"/></g>` +
    `<rect x="16" y="26" width="11" height="28" fill="#8a7f70"/>` +
    `<rect x="16" y="24" width="11" height="4" fill="#6b6256"/>` +
    `<rect x="64" y="18" width="13" height="36" fill="#8a7f70"/>` +
    `<rect x="64" y="16" width="13" height="4" fill="#6b6256"/>` +
    plume(70, 18, 22, 0.85, "#d8d2c4", ".8") +
    plume(21, 26, 14, 0.6, "#c8c2b4", ".7") +
    // キビ畑(右)
    `<rect x="196" y="96" width="204" height="26" fill="#7f9a3f"/>` +
    `<g stroke="#8fae4a" stroke-width="2" opacity=".8" fill="none"><path d="M204,122v-26M218,122v-26M232,122v-26M246,122v-26M260,122v-26M274,122v-26M288,122v-26M302,122v-26M316,122v-26M330,122v-26M344,122v-26M358,122v-26M372,122v-26M386,122v-26"/></g>` +
    `<g fill="#a8b85a" opacity=".9"><path d="M208,96q3,-9 7,-13M240,96q3,-9 7,-13M282,96q3,-9 7,-13M330,96q3,-9 7,-13M372,96q3,-9 7,-13" stroke="#a8b85a" stroke-width="2.4" fill="none"/></g>` +
    // 焼いたあとの黒い畑
    `<path d="M104,116h104v10H104z" fill="#6b6250"/>` +
    // 計量所
    `<rect x="112" y="86" width="46" height="30" fill="#c2b494"/>` +
    `<path d="M106,86h58l-8,-12h-42z" fill="#8a4a30"/>` +
    `<rect x="122" y="96" width="12" height="20" fill="#5a4630"/>` +
    // 手前の線路と貨車
    ground(150, "#b09a68") +
    `<path d="M0,150q90,-8 200,0q100,8 200,-2v14H0z" fill="#a8925f"/>` +
    narrowTrack(168, 0, 400) +
    caneWagon(46, 168, 1) +
    caneWagon(112, 168, 1) +
    caneWagon(300, 168, 1) +
    caneWagon(366, 168, 1) +
    shade(46, 170, 22, 3.4, ".18") +
    shade(112, 170, 22, 3.4, ".18") +
    shade(300, 170, 22, 3.4, ".18") +
    // 手前の刈ったキビの山
    `<g stroke="#9aa84f" stroke-width="2.6" fill="none" stroke-linecap="round"><path d="M14,206q14,-14 34,-10M20,208q16,-16 38,-12M28,210q16,-16 40,-13M330,208q16,-14 38,-9M340,210q16,-15 42,-11"/></g>` +
    tuft(190, 200, 1.2) +
    tuft(238, 206, 1.1),

  /**
   * 高地の金鉱の谷(ラエ・ブロロ)。
   * **道路も鉄道も一度も通っていない。**草の滑走路と、分解して空輸された機械。
   */
  goldvalley:
    sky("#a4bfcc", "#dbe4e0", 96) +
    `<g fill="#e8eeea" opacity=".75"><ellipse cx="90" cy="80" rx="120" ry="13"/><ellipse cx="320" cy="88" rx="110" ry="11"/></g>` +
    jaggedRidge(96, 34, "#78908c", 2) +
    jaggedRidge(112, 24, "#5f7a70", 3) +
    ground(124, "#4f7048") +
    `<path d="M0,124q80,-10 168,-2q96,10 232,-4v20H0z" fill="#5f8450"/>` +
    // 谷の斜面の林
    `<g fill="#2d5f3f">${[8, 26, 44, 62, 300, 320, 340, 360, 382]
      .map((x) => `<ellipse cx="${x}" cy="${128 + (x % 5)}" rx="13" ry="9"/>`)
      .join("")}</g>` +
    // 草の滑走路(手前を斜めに横切る)
    `<path d="M0,168L400,148v34L0,196z" fill="#9aa860"/>` +
    `<path d="M0,172L400,152v3L0,175z" fill="#c2cf8a" opacity=".8"/>` +
    ground(196, "#5f7f48") +
    // 小型貨物機(左)
    shade(72, 190, 42, 6, ".2") +
    bushPlane(72, 188, 0.95) +
    // 分解された浚渫機の部品と木箱(右)
    shade(320, 196, 54, 7, ".2") +
    `<g fill="#7f6a4a">${[292, 308, 324, 340]
      .map((x) => `<path d="M${x},196v-14h13v14z"/><path d="M${x},182h13l-3,-6h-7z"/>`)
      .join("")}</g>` +
    crate(352, 196, 22, 16) +
    crate(360, 178, 16, 12, "#a8823f") +
    drum(286, 196, 0.9, "#4f6f8a") +
    person(268, 196, 21, "#e8443f") +
    arm(266, 182, -10, 5) +
    // 遠くの尾根に道が無いことを見せる:切れ端の踏み分け道
    `<path d="M0,140q40,6 76,2" stroke="#b8a882" stroke-width="2.6" opacity=".7" fill="none" stroke-dasharray="9 12"/>` +
    gull(340, 44, 1.1) +
    gull(360, 54, 0.9),

  /**
   * 共同統治の港町(ポートビラ)。
   * **ほとんど何にも合意しない二つの宗主国が、庁舎も学校も別々に建てた。**
   * 旗は無地。紋章も文字も描かない。
   */
  harbourtown:
    sky("#8fc4e8", "#cfe4f0", 92) +
    clouds(60, 26, 0.9) +
    clouds(330, 34, 0.7) +
    islandFar(300, 92, 190, 30, "#5f8272") +
    islandFar(70, 92, 150, 22, "#6b8f7a") +
    sea(92, "#2f6f96", "#3f8fae", "#57b0c0") +
    swell(120) +
    // 左の庁舎(青い旗)
    `<rect x="10" y="98" width="86" height="34" fill="#f0e8d4"/>` +
    `<path d="M4,98h98l-10,-13H14z" fill="#5f6f7a"/>` +
    `<g fill="#5f7f96"><rect x="18" y="108" width="11" height="14"/><rect x="38" y="108" width="11" height="14"/><rect x="58" y="108" width="11" height="14"/><rect x="78" y="108" width="11" height="14"/></g>` +
    flagPole(24, 85, 30, "#3f5f9f") +
    // 右の庁舎(赤い旗)。同じ町に、ぶつかる二つの役所。
    `<rect x="300" y="104" width="88" height="30" fill="#e8e0c8"/>` +
    `<path d="M294,104h100l-9,-12h-82z" fill="#8a4a30"/>` +
    `<g fill="#5f7f96"><rect x="308" y="112" width="11" height="13"/><rect x="328" y="112" width="11" height="13"/><rect x="348" y="112" width="11" height="13"/><rect x="368" y="112" width="11" height="13"/></g>` +
    flagPole(378, 92, 28, "#c8452f", "#f0e8d4") +
    // 町並み
    tinHouse(106, 112, 40, 136, "#e0e8dc", "#4f7f6a") +
    tinHouse(154, 116, 36, 136, "#f0e0c0", "#8a4a30") +
    tinHouse(200, 110, 44, 136, "#dce4ea", "#c8452f") +
    tinHouse(252, 116, 38, 136, "#efe8d0", "#4f6f8a") +
    palm(128, 140, 34, -4) +
    palm(232, 142, 30, 3) +
    // 湾と桟橋
    ground(136, "#57b0c0") +
    `<rect x="0" y="136" width="400" height="18" fill="#3f8fae"/>` +
    jetty(30, 190, 156, 176) +
    ruinedPiles([206, 222, 238], 178, 14) +
    ground(178, "#4aa0b8") +
    skiff(96, 190, 1.1, "#c8452f") +
    skiff(322, 196, 1, "#3f6f9a") +
    outrigger(240, 196, 0.8) +
    drum(356, 172, 0.9, "#4f7f6a") +
    drum(370, 174, 0.9, "#c8452f") +
    crate(336, 172, 16, 12) +
    person(58, 176, 20, "#f5b31c") +
    arm(56, 164, 9, 6) +
    person(150, 176, 19, "#3f5f9f") +
    gull(280, 66) +
    gull(302, 76, 0.8),

  /**
   * 太平洋の首都(レブカ・ポートモレスビー・ヌメア・ヌクアロファ・
   * アヴァルア・マタウトゥ)。**6都市が共有するので、いちばん濃く描く。**
   * いちばん高い建物は教会、いちばん大事な設備は桟橋。
   */
  pacificcapital:
    sky("#8fc4e8", "#d4e8f0", 104) +
    sun(48, 30, 15, "#f8e08a") +
    clouds(150, 26, 0.9) +
    clouds(320, 20, 0.8) +
    hills(104, "#547f5f", 4) +
    hills(107, "#3f6b4a", 3) +
    sea(104, "#2f6f96", "#3f92ae", "#57b4c2") +
    // 対岸の緑
    `<path d="M0,104h400v6H0z" fill="#4f7f5f"/>` +
    // 教会(左)
    church(16, 150, 62, 66) +
    // 官庁(右)
    `<rect x="288" y="112" width="104" height="38" fill="#efe8d4"/>` +
    `<path d="M282,112h116l-11,-16h-94z" fill="#c8452f"/>` +
    `<rect x="282" y="112" width="116" height="4" fill="#8a3a2c"/>` +
    `<g fill="#5f7f96"><rect x="298" y="122" width="12" height="16"/><rect x="320" y="122" width="12" height="16"/><rect x="342" y="122" width="12" height="16"/><rect x="364" y="122" width="12" height="16"/></g>` +
    `<rect x="330" y="134" width="14" height="16" fill="#6b5330"/>` +
    flagPole(384, 96, 26, "#3f5f9f", "#f0e8d4") +
    // 町並み
    tinHouse(88, 124, 44, 150, "#e8e0cc", "#4f7f6a") +
    tinHouse(138, 128, 38, 150, "#f0dcc0", "#8a4a30") +
    tinHouse(184, 122, 46, 150, "#dfe8ea", "#c8452f") +
    tinHouse(238, 128, 42, 150, "#efe8d0", "#4f6f8a") +
    broadTree(120, 150, 15) +
    palm(172, 150, 40, -5) +
    palm(268, 152, 34, 4) +
    // 海沿いの道
    ground(150, "#b6ad9b") +
    `<rect x="0" y="150" width="400" height="4" fill="#cfc7b0"/>` +
    `<rect x="0" y="162" width="400" height="26" fill="#6b6458"/>` +
    `<g stroke="#f0e8d4" stroke-width="2.6" stroke-dasharray="16 14" opacity=".7" fill="none"><path d="M0,175h400"/></g>` +
    // 乗合バスと歩く人
    shade(66, 190, 40, 6, ".2") +
    `<g><path d="M22,188v-26q0,-5 6,-5h68q6,0 6,5v26z" fill="#f5b31c"/>` +
    `<rect x="22" y="180" width="80" height="4" fill="#c8452f"/>` +
    `<g fill="#8fc4e8"><rect x="28" y="162" width="16" height="12"/><rect x="48" y="162" width="16" height="12"/><rect x="68" y="162" width="16" height="12"/><rect x="88" y="162" width="10" height="12"/></g>` +
    `<g fill="#33302c"><circle cx="38" cy="188" r="6.4"/><circle cx="88" cy="188" r="6.4"/></g></g>` +
    ground(188, "#5f8f4a") +
    person(300, 200, 24, "#e8443f") +
    arm(298, 184, 11, 7) +
    person(326, 202, 22, "#3f5f9f") +
    person(348, 198, 20, "#f5b31c") +
    hibiscus(370, 206, 1.1) +
    hibiscus(16, 204, 1) +
    tuft(140, 200, 1.2) +
    gull(214, 60) +
    gull(236, 70, 0.8),

  /**
   * 灰に埋もれた町(ココポ・タンナ・パンガイ)。
   * **前の首都はいまも噴火し続けている。**色は灰と橙だけに絞る。
   */
  volcanicdisaster:
    sky("#9a9188", "#c0b6a8", 108) +
    `<g fill="#8a8074" opacity=".7"><ellipse cx="120" cy="34" rx="130" ry="18"/><ellipse cx="330" cy="26" rx="90" ry="14"/></g>` +
    volcanoCone(324, 108, 72, 150, "#4f463c", "#6b5f50") +
    plume(324, 40, 40, 1.5, "#a89e90", ".9") +
    `<g fill="#c8622f" opacity=".85"><path d="M318,42l6,-10 6,10z"/><path d="M312,50q12,-8 24,0q-12,5 -24,0z"/></g>` +
    hills(108, "#6b6254", 3) +
    ground(108, "#b0a698") +
    `<path d="M0,108q86,-10 178,0q96,10 222,-4v18H0z" fill="#bfb5a5"/>` +
    // 灰をかぶった家(左)。屋根だけ見えている。
    `<path d="M8,150h90v-16H8z" fill="#a89e90"/>` +
    `<path d="M2,134h102l-14,-18H16z" fill="#8f857a"/>` +
    `<path d="M2,134h102v-4H2z" fill="#cfc7ba"/>` +
    `<rect x="30" y="138" width="14" height="12" fill="#6b6254"/>` +
    `<path d="M110,150h64v-12h-64z" fill="#9a9084"/>` +
    `<path d="M104,138h76l-11,-14h-54z" fill="#8f857a"/>` +
    `<path d="M104,138h76v-3h-76z" fill="#cfc7ba"/>` +
    // 灰をかぶった椰子。**葉が灰色になる。**
    palm(210, 152, 40, -6, "#9a968a", "#6b6254") +
    palm(258, 150, 34, 5, "#a8a496", "#6b6254") +
    palm(126, 148, 30, 3, "#9a968a", "#6b6254") +
    // 灰の吹き溜まり
    ground(150, "#c4bbab") +
    `<path d="M0,158q66,-12 132,-2q70,10 138,-4q64,-12 130,2v22H0z" fill="#cfc7b6"/>` +
    ground(178, "#b8ae9c") +
    `<g fill="#a89e8a" opacity=".8"><ellipse cx="60" cy="188" rx="52" ry="9"/><ellipse cx="320" cy="196" rx="60" ry="10"/></g>` +
    // 灰に残る轍と足跡
    `<g stroke="#9a9084" stroke-width="2.6" opacity=".8" fill="none"><path d="M0,200q92,-10 190,2M0,208q96,-10 200,2"/></g>` +
    `<g fill="#9a9084" opacity=".7">${[280, 296, 312, 328, 344, 360]
      .map((x, i) => `<ellipse cx="${x}" cy="${182 + (i % 2) * 7}" rx="4" ry="2.4"/>`)
      .join("")}</g>` +
    // 灰をかき出すスコップ
    `<path d="M188,206l22,-16" stroke="#6b5330" stroke-width="3" fill="none" stroke-linecap="round"/>` +
    `<path d="M208,192l14,-10 6,8-13,10z" fill="#9aa0a0"/>`,

  /**
   * 高地の谷(ゴロカ)。**よそ者が1930年代に飛行機で見つけるまで、
   * 外の世界は谷の存在を知らなかった。**朝の霧と段になった畑。
   */
  highlandvalley:
    sky("#b0c6cf", "#dfe8e2", 92) +
    `<g fill="#eef2ee" opacity=".8"><ellipse cx="70" cy="76" rx="130" ry="12"/><ellipse cx="300" cy="84" rx="140" ry="14"/><ellipse cx="180" cy="94" rx="120" ry="10"/></g>` +
    jaggedRidge(92, 30, "#7f9490", 2) +
    jaggedRidge(106, 22, "#62807a", 4) +
    ground(118, "#4f7048") +
    `<path d="M0,118q90,-12 186,-2q100,10 214,-6v22H0z" fill="#5f8a50"/>` +
    // 谷を覆う霧の帯
    `<g fill="#dfe8e2" opacity=".45"><ellipse cx="70" cy="116" rx="120" ry="7"/><ellipse cx="230" cy="112" rx="130" ry="6"/><ellipse cx="360" cy="118" rx="90" ry="6"/></g>` +
    // 草葺きの家(左)
    roundHut(30, 156, 22) +
    roundHut(76, 152, 16) +
    roundHut(112, 158, 13) +
    // 柵
    `<g stroke="#6b5330" stroke-width="2.4" fill="none"><path d="M4,160h140M4,166h140M20,156v14M56,154v16M96,156v14M132,156v14"/></g>` +
    // 右:バナナとコーヒーの木
    `<g>${[300, 326, 352, 378]
      .map((x, i) => broadTree(x, 152 + (i % 2) * 4, 13 - (i % 3), "#2f6b3f"))
      .join("")}</g>` +
    `<g fill="#3f8f52">${[286, 312, 340, 368]
      .map(
        (x) =>
          `<path d="M${x},152q-16,-6 -20,-20q14,4 20,20zM${x},152q16,-6 20,-20q-14,4 -20,20zM${x},152q-3,-16 4,-26q6,12 -4,26z"/>`,
      )
      .join("")}</g>` +
    // 段になった畑(手前)
    ground(160, "#7f8f4a") +
    `<rect x="0" y="160" width="400" height="4" fill="#5f6f36"/>` +
    `<rect x="0" y="176" width="400" height="4" fill="#5f6f36"/>` +
    `<rect x="0" y="194" width="400" height="4" fill="#5f6f36"/>` +
    `<g stroke="#9aa85a" stroke-width="2.2" opacity=".85" fill="none"><path d="M0,168h400M0,186h400M0,204h400"/></g>` +
    `<g fill="#8a9a4a" opacity=".8">${[20, 60, 100, 150, 250, 300, 340, 380]
      .map((x) => `<ellipse cx="${x}" cy="172" rx="12" ry="5"/><ellipse cx="${x + 18}" cy="190" rx="12" ry="5"/>`)
      .join("")}</g>` +
    // 豚。高地で富そのものだったもの。
    shade(72, 200, 20, 4, ".2") +
    `<g><ellipse cx="72" cy="192" rx="19" ry="10" fill="#3a352e"/>` +
    `<ellipse cx="90" cy="188" rx="8" ry="6.4" fill="#3a352e"/>` +
    `<circle cx="97" cy="188" r="2.8" fill="#6b5a50"/>` +
    `<path d="M84,182l3,-6 5,4z" fill="#2f2b26"/>` +
    `<g fill="#2f2b26"><rect x="60" y="198" width="4" height="8"/><rect x="70" y="198" width="4" height="8"/><rect x="80" y="198" width="4" height="8"/></g></g>` +
    person(348, 202, 22, "#c8452f") +
    arm(346, 188, -12, 4),

  /**
   * 熱帯の山を削った露天掘り(アラワ・チオ)。
   * 赤土と、鉱石だけを運ぶ狭軌。**利益の配分が戦争になった山。**
   */
  junglemine:
    sky("#a4b8bc", "#d0d8cf", 70) +
    jungleBand(70, 16, "#2d5f3f") +
    jungleBand(84, 12, "#26543a") +
    // 段になった掘削面
    ground(96, "#a85a3a") +
    `<g fill="#9a4f32"><rect x="0" y="96" width="400" height="4"/><rect x="0" y="114" width="400" height="4"/><rect x="0" y="134" width="400" height="4"/><rect x="0" y="156" width="400" height="4"/></g>` +
    `<g fill="#b8674a"><rect x="0" y="100" width="400" height="14"/><rect x="0" y="138" width="400" height="18"/></g>` +
    `<g fill="#8a4530" opacity=".7"><path d="M0,100q60,10 122,4q70,-6 128,6q70,10 150,-6v10H0z"/><path d="M0,138q70,10 148,2q80,-8 152,8q50,6 100,-4v10H0z"/></g>` +
    // 崩れた土の筋
    `<g stroke="#7f3f28" stroke-width="2" opacity=".6" fill="none"><path d="M40,96l-14,18M120,114l-16,20M300,96l16,18M356,134l-14,22M210,114l12,20"/></g>` +
    // 濁った川(手前)
    ground(174, "#8a6a44") +
    `<path d="M0,174q80,-8 168,2q94,10 232,-6v14H0z" fill="#9a7a50"/>` +
    `<g stroke="#b09068" stroke-width="2" opacity=".6" fill="none"><path d="M20,190q22,-4 44,0M240,196q26,-4 52,0M120,202q24,-4 48,0"/></g>` +
    // 狭軌のトロッコ(左)。**鉱石しか積まない。**
    narrowTrack(160, 0, 150, "#6b4a30", "#8a8f92") +
    `<g><rect x="24" y="144" width="34" height="14" fill="#5f6a6a"/><path d="M24,144h34l4,-6h-42z" fill="#7f8a8a"/>` +
    `<g fill="#8a6a3a"><circle cx="32" cy="142" r="3"/><circle cx="42" cy="141" r="3.4"/><circle cx="52" cy="142" r="3"/></g>` +
    `<g fill="#33302c"><circle cx="32" cy="160" r="3.4"/><circle cx="52" cy="160" r="3.4"/></g></g>` +
    `<g><rect x="76" y="146" width="34" height="12" fill="#5f6a6a"/><g fill="#33302c"><circle cx="84" cy="160" r="3.4"/><circle cx="104" cy="160" r="3.4"/></g></g>` +
    // ダンプの荷台(右)
    shade(334, 172, 46, 6, ".22") +
    `<g><path d="M288,166v-20h58l6,20z" fill="#c8452f"/><path d="M288,150h58v-4h-58z" fill="#8a3a2c"/>` +
    `<path d="M352,166v-14h22q6,0 6,6v8z" fill="#e0dccc"/><rect x="356" y="154" width="12" height="8" fill="#5f7f96"/>` +
    `<g fill="#33302c"><circle cx="306" cy="168" r="8"/><circle cx="368" cy="168" r="8"/></g>` +
    `<g fill="#6b6a5a"><ellipse cx="300" cy="146" rx="9" ry="4"/><ellipse cx="318" cy="144" rx="10" ry="4.4"/><ellipse cx="336" cy="146" rx="8" ry="3.6"/></g></g>` +
    person(180, 196, 22, "#f5b31c") +
    arm(178, 182, 12, 6) +
    `<path d="M190,188l16,-6" stroke="#6b5330" stroke-width="2.6" fill="none"/>`,

  /**
   * 戦跡の浜(ホニアラ・ムンダ・ルーガンヴィル・アロタウ・カビエン・
   * ハガニア・ガラパン)。**7都市が共有するので、いちばん濃く描く。**
   * 描くのは錆びた残骸と静かな浜だけ。人も暴力も出さない。
   */
  pacificwarfront:
    sky("#8fc4e8", "#d8e8ee", 88) +
    clouds(96, 28, 0.9) +
    clouds(300, 22, 0.7) +
    islandFar(340, 88, 170, 26, "#5f8272") +
    islandFar(60, 88, 130, 20, "#6b8f7a") +
    sea(88, "#26688f", "#3f92ae", "#5fb8c4") +
    surf(126, ".8") +
    ground(134, "#efe2c6") +
    `<path d="M0,134q80,-6 166,2q92,8 234,-4v14H0z" fill="#e4d4b2"/>` +
    ground(148, "#efe2c6") +
    `<g fill="#e8dcc0" opacity=".8"><ellipse cx="70" cy="176" rx="80" ry="12"/><ellipse cx="330" cy="192" rx="90" ry="14"/></g>` +
    // 錆びた上陸用舟艇(左)。半ば砂に埋まる。
    shade(78, 178, 58, 8, ".22") +
    rustedHulk(78, 176, 1.1, -4) +
    `<path d="M20,176q60,8 120,0v10H20z" fill="#e0cfa8"/>` +
    // 椰子の列(右)と、椰子の葉で覆われた掩体
    palm(300, 168, 46, -6) +
    palm(336, 172, 52, 4) +
    palm(372, 166, 40, -3) +
    palm(266, 164, 34, 5) +
    `<g><path d="M296,180q26,-24 60,-2z" fill="#4f6b46"/>` +
    `<g stroke="#3f5a38" stroke-width="2.2" fill="none"><path d="M304,176q10,-10 22,-11M320,172q12,-2 24,5M312,180q6,-9 18,-11"/></g>` +
    `<path d="M348,180l14,-8 6,8z" fill="#6b6a58"/></g>` +
    // 砂に埋まったドラムと鉄板
    drum(148, 196, 1.1, "#7f6a4a") +
    drum(166, 200, 1, "#6b5f46") +
    `<path d="M186,204h44l-6,-8h-32z" fill="#8a6a4a"/>` +
    `<g fill="#8a4a30" opacity=".9"><path d="M28,200h40l-4,-7h-32z"/><path d="M242,196h30l-3,-6h-24z"/></g>` +
    // 浜のカニと海鳥
    `<g fill="#c87a5a"><ellipse cx="112" cy="200" rx="6" ry="4"/><path d="M106,198l-6,-4M118,198l6,-4M106,202l-6,3M118,202l6,3" stroke="#c87a5a" stroke-width="1.6" fill="none"/><path d="M108,195l-2,-4M116,195l2,-4" stroke="#c87a5a" stroke-width="1.6" fill="none"/></g>` +
    gull(216, 62) +
    gull(240, 72, 0.8) +
    gull(190, 78, 0.9) +
    tuft(272, 200, 1.3) +
    tuft(392, 194, 1.2),

  /**
   * セピック川(ウェワク)。**首都への道はいまも無い。**
   * 川そのものが道で、精霊堂の高い切妻がいちばん高い建物。
   */
  sepikriver:
    sky("#a8c0c8", "#dfe4d4", 80) +
    clouds(280, 30, 0.9) +
    jungleBand(80, 18, "#2a5738") +
    jungleBand(94, 14, "#22492f") +
    `<g fill="#2f6b42">${[10, 44, 78, 300, 340, 378]
      .map((x) => `<ellipse cx="${x}" cy="104" rx="20" ry="12"/>`)
      .join("")}</g>` +
    ground(112, "#7f6a48") +
    // 精霊堂(左)。**建築で語る。人物は出さない。**
    gableHouse(6, 150, 92, 76) +
    // 高床の家(右)
    stiltHouse(300, 148, 58, 28, "#8a7a4a") +
    stiltHouse(356, 152, 42, 22, "#9a8a54") +
    palm(258, 150, 40, 5) +
    palm(122, 148, 32, -4) +
    // 川岸
    `<path d="M0,144q90,-6 190,2q100,8 210,-6v14H0z" fill="#6b5a3a"/>` +
    // 川
    ground(158, "#7a6644") +
    `<rect x="0" y="158" width="400" height="20" fill="#8a7450"/>` +
    ground(178, "#96805a") +
    `<g stroke="#b09a70" stroke-width="2.2" opacity=".55" fill="none"><path d="M20,172q26,-4 52,0M240,180q30,-4 60,0M90,192q30,-4 60,0M300,198q28,-4 56,0"/></g>` +
    // 丸木舟2艘
    shade(80, 194, 34, 4, ".16") +
    outrigger(80, 190, 0.9, "#5a4630") +
    person(80, 186, 20, "#c8452f") +
    arm(78, 174, 14, -8) +
    `<path d="M92,166l6,26" stroke="#6b5330" stroke-width="2.4" fill="none"/>` +
    shade(320, 204, 30, 4, ".16") +
    outrigger(320, 200, 0.8, "#6b5330") +
    // 川面に浮かぶ草の島
    `<g fill="#4f7f46" opacity=".9"><ellipse cx="188" cy="186" rx="22" ry="6"/><ellipse cx="240" cy="200" rx="18" ry="5"/></g>` +
    mangrove(20, 166, 0.9) +
    mangrove(376, 172, 1),

  /**
   * 掘り尽くしたあとの石灰岩の尖塔(ヤレン・バナバ)。
   * **島の表面の5分の4がこれになった。**緑はほとんど残っていない。
   * 線路は出るが、尖塔のあいだで途切れている。
   */
  pinnacles:
    sky("#c4cac6", "#e4e0d2", 78) +
    // 遠くに海の細い帯だけ
    `<rect x="0" y="78" width="400" height="12" fill="#5f9aae"/>` +
    `<rect x="0" y="88" width="400" height="4" fill="#8fc4c8" opacity=".7"/>` +
    ground(90, "#c2b89e") +
    `<path d="M0,90q80,-6 168,0q96,6 232,-4v16H0z" fill="#cfc4a8"/>` +
    // 尖塔地帯(奥)
    `<g opacity=".75">${[16, 44, 74, 104, 288, 318, 348, 380]
      .map((x, i) => pinnacle(x, 118, 26 + (i % 4) * 7, 16, "#cfc7b2", "#b0a68e"))
      .join("")}</g>` +
    ground(118, "#b8ac90") +
    `<path d="M0,118q90,-8 186,2q98,10 214,-6v20H0z" fill="#c2b89a"/>` +
    // 尖塔地帯(中景)
    `${[10, 40, 72, 104, 130, 276, 306, 336, 366, 392]
      .map((x, i) => pinnacle(x, 156, 34 + (i % 5) * 9, 21, "#ded6c4", "#b8ae98"))
      .join("")}` +
    // 掘り取った跡の赤い土
    ground(156, "#a8815a") +
    `<path d="M0,164q76,-10 158,0q86,10 168,-4q42,-6 74,2v20H0z" fill="#b8916a"/>` +
    ground(184, "#9a7550") +
    // 途切れた線路。**ここで止まった。**
    narrowTrack(176, 0, 236, "#6b5a3a", "#8a8f92") +
    `<g fill="#8a8f92"><path d="M236,177l10,-2v2z"/><path d="M236,181l8,-1v2z"/></g>` +
    `<g fill="#7f6a4a" opacity=".9"><rect x="248" y="176" width="7" height="8" transform="rotate(18 251 180)"/><rect x="266" y="180" width="7" height="8" transform="rotate(-24 269 184)"/></g>` +
    // 手前の尖塔
    pinnacle(40, 210, 46, 28) +
    pinnacle(92, 208, 34, 22) +
    pinnacle(340, 210, 50, 30) +
    pinnacle(388, 206, 36, 24) +
    // 石灰岩のあいだにわずかな草
    tuft(140, 202, 1.4) +
    tuft(300, 198, 1.3) +
    tuft(200, 208, 1.2),

  /**
   * 環礁の潟(ビキニ)。**1946年に住民を立ち退かせ、八十年後のいまも無人。**
   * 標的艦隊は潟に沈んだままで、水面下に艦影だけが見える。
   * **人を1人も描かない。**それがこの絵の芯。
   */
  atolllagoon:
    sky("#8fc4e8", "#cfe4f0", 92) +
    clouds(70, 26, 0.9) +
    clouds(310, 32, 0.7) +
    atollRim(92, "#4f7f5a", 5) +
    // 環礁の縁の椰子(遠く、小さく)
    `<g opacity=".9">${[24, 56, 88, 268, 300, 332, 364, 392]
      .map((x, i) => palm(x, 96, 12 + (i % 3) * 3, i % 2 ? 2 : -2, "#3f7f4a", "#6b5a44", false))
      .join("")}</g>` +
    sea(99, "#3f9aa8", "#57c0c0", "#7ed8cc") +
    // **水面下の艦影。**輪郭だけ、静かに。
    `<g fill="#2f6f80" opacity=".45"><path d="M18,150q46,-10 96,0q-14,14 -50,15q-38,-1 -46,-15z"/>` +
    `<path d="M56,142l4,-16 5,16z"/><path d="M84,146l3,-11 4,11z"/></g>` +
    `<g fill="#2f6f80" opacity=".35"><path d="M286,178q54,-12 112,2q-16,16 -58,17q-42,-1 -54,-19z"/>` +
    `<path d="M330,168l4,-14 5,14z"/></g>` +
    swell(112, "#bfe8f4", ".45") +
    // 手前の浜(左下)。誰もいない。
    `<path d="M0,182q46,-14 96,-6q-8,20 -46,26q-38,4 -50,-20z" fill="#efe2c6"/>` +
    `<path d="M0,190q40,-10 80,-4q-8,14 -40,18q-32,2 -40,-14z" fill="#e4d4b2"/>` +
    // 落ちた椰子の実と、朽ちた桟橋の杭
    `<g fill="#8a6f3a"><ellipse cx="30" cy="200" rx="5.4" ry="4.4"/><ellipse cx="48" cy="206" rx="5" ry="4"/><ellipse cx="16" cy="192" rx="4.4" ry="3.6"/></g>` +
    ruinedPiles([120, 136, 152, 172], 194, 18) +
    tuft(66, 198, 1.2) +
    gull(230, 62) +
    gull(254, 72, 0.8) +
    gull(206, 76, 0.9),

  /**
   * 細長い環礁の帯(マジュロ・エベイエ・フナフティ)。
   * **平均標高2メートル。**外洋と潟に挟まれた、幅の無い陸。
   */
  atollstrip:
    sky("#8fc4e8", "#d8ecf2", 82) +
    tradeClouds(28, "#f6efe2", ".7") +
    // 上=外洋(濃い)
    `<rect x="0" y="82" width="400" height="34" fill="#26688f"/>` +
    `<rect x="0" y="104" width="400" height="12" fill="#3f92ae"/>` +
    surf(116, ".9") +
    // 中央の細い陸
    `<rect x="0" y="116" width="400" height="30" fill="#e4d4b2"/>` +
    `<path d="M0,120q88,-5 180,0q96,5 220,-3v6H0z" fill="#efe2c6"/>` +
    // 滑走路を兼ねた1本道
    `<rect x="0" y="130" width="400" height="9" fill="#8a8f8a"/>` +
    `<g stroke="#f0e8d4" stroke-width="2.2" stroke-dasharray="14 12" opacity=".85" fill="none"><path d="M0,134.5h400"/></g>` +
    // 陸の上のもの(左右に寄せる)
    palm(24, 124, 26, -3) +
    palm(58, 126, 22, 3) +
    palm(348, 124, 24, -3) +
    palm(378, 128, 20, 2) +
    tinHouse(84, 108, 30, 126, "#e8e0cc", "#4f7f6a") +
    tinHouse(288, 110, 28, 126, "#f0dcc0", "#c8452f") +
    `<rect x="120" y="114" width="26" height="12" fill="#9aa0a0"/>` +
    `<rect x="120" y="112" width="26" height="3" fill="#7f8484"/>` +
    // 下=潟(明るい)
    ground(146, "#7ed8cc") +
    `<rect x="0" y="146" width="400" height="16" fill="#57c0c0"/>` +
    `<g fill="#a8e8dc" opacity=".55"><ellipse cx="70" cy="176" rx="60" ry="10"/><ellipse cx="320" cy="190" rx="66" ry="11"/></g>` +
    swell(170, "#d8f4f4", ".5") +
    coralHead(140, 186, 1.1, "#c87a6a") +
    coralHead(250, 176, 0.9, "#b06a5a") +
    // 潟の小舟と、護岸のブロック
    shade(64, 196, 24, 4, ".16") +
    skiff(64, 192, 1, "#c8452f") +
    person(64, 190, 18, "#f5b31c") +
    `<g fill="#b0aca0">${[300, 318, 336, 354, 372, 390]
      .map((x) => `<rect x="${x}" y="200" width="15" height="10" rx="2"/>`)
      .join("")}</g>` +
    `<g fill="#c2beb2">${[292, 310, 328, 346, 364, 382]
      .map((x) => `<rect x="${x}" y="192" width="15" height="9" rx="2"/>`)
      .join("")}</g>` +
    gull(190, 62) +
    gull(214, 70, 0.8),

  /**
   * ひび割れつつある核廃棄物のドーム(エニウェトク)。
   * **住民が実際に帰還を許された環礁に、これが残っている。**
   * 爆発は描かない。コンクリートの構造だけで足りる。
   */
  domecrater:
    sky("#a8bcc4", "#d8e0e0", 92) +
    clouds(320, 26, 0.8, "#e8eeee", ".7") +
    atollRim(92, "#5f7f5a", 4) +
    `<rect x="0" y="98" width="400" height="26" fill="#4f9aae"/>` +
    `<rect x="0" y="116" width="400" height="8" fill="#6fc0c0"/>` +
    surf(124, ".7") +
    ground(124, "#ded6c4") +
    `<path d="M0,128q84,-6 176,2q96,8 224,-4v16H0z" fill="#cfc7b2"/>` +
    // 左のドーム。**ひびを入れる。**
    shade(74, 158, 68, 9, ".22") +
    `<path d="M4,158a70,44 0 0 1 140,0z" fill="#b0aca4"/>` +
    `<path d="M4,158a70,44 0 0 1 140,0z" fill="none" stroke="#8f8b84" stroke-width="2"/>` +
    `<g stroke="#8f8b84" stroke-width="1.4" opacity=".8" fill="none"><path d="M28,140a70,44 0 0 1 92,-2M46,126a70,44 0 0 1 56,-1M74,116v42M40,158a44,30 0 0 1 68,0"/></g>` +
    `<g stroke="#6b6760" stroke-width="1.8" fill="none"><path d="M56,120l-6,16 5,10M96,124l7,14 -4,12M74,116l3,20"/></g>` +
    `<rect x="0" y="156" width="152" height="5" fill="#9a968e"/>` +
    // 右のクレーターの縁と溜まった水
    `<path d="M256,164q30,-24 76,-24q48,0 68,24q-34,10 -72,10q-40,0 -72,-10z" fill="#b8ae98"/>` +
    `<ellipse cx="332" cy="164" rx="58" ry="10" fill="#4f8f9a"/>` +
    `<ellipse cx="322" cy="162" rx="30" ry="4" fill="#7fc0c4" opacity=".55"/>` +
    // 割れた舗装と雑草
    ground(170, "#c4bca6") +
    `<g stroke="#a89e88" stroke-width="2" opacity=".8" fill="none"><path d="M0,182h400M0,196h400M60,170v40M160,170v40M260,170v40M348,170v40"/></g>` +
    `<g stroke="#8f8874" stroke-width="2.4" fill="none"><path d="M96,170l10,20 -6,20M212,174l-8,18 10,18"/></g>` +
    tuft(120, 194, 1.3) +
    tuft(240, 202, 1.4) +
    tuft(36, 200, 1.2) +
    palm(376, 152, 30, 4) +
    `<g fill="#a8a49a"><rect x="188" y="176" width="26" height="9" rx="2" transform="rotate(-6 201 180)"/><rect x="226" y="186" width="20" height="8" rx="2" transform="rotate(9 236 190)"/><rect x="150" y="192" width="24" height="8" rx="2"/></g>` +
    tuft(174, 186, 1.2) +
    tuft(300, 190, 1.3) +
    tuft(78, 206, 1.2) +
    gull(190, 66) +
    gull(214, 76, 0.8),

  /**
   * 潮との競走(タラワ)。**高潮が家の前まで届いている。**
   * 曇り。土嚢と、塩で立ち枯れた椰子。
   */
  risingtide:
    sky("#9aacb4", "#c8d4d4", 90) +
    `<g fill="#b0bcc0" opacity=".8"><ellipse cx="100" cy="36" rx="130" ry="15"/><ellipse cx="330" cy="28" rx="100" ry="12"/></g>` +
    atollRim(90, "#5f7f60", 4) +
    // 高い海
    `<rect x="0" y="96" width="400" height="34" fill="#4f7f90"/>` +
    `<rect x="0" y="118" width="400" height="12" fill="#6b9aa8"/>` +
    whitecaps(104, 6) +
    // 護岸を越えてきた水
    `<path d="M0,130h400v10H0z" fill="#7fa8b0"/>` +
    ground(140, "#8fb0b4") +
    // 高床の家。**支柱が水に浸かっている。**
    stiltHouse(20, 150, 66, 30, "#7f6a44", "#dfd4bc") +
    stiltHouse(96, 154, 52, 24, "#8a4a30", "#e8e0c8") +
    stiltHouse(300, 152, 60, 26, "#4f6f6a", "#dce4dc") +
    // 立ち枯れた椰子(葉が茶色)
    palm(170, 152, 40, -5, "#8a7a4a", "#6b5a44", false) +
    palm(268, 148, 34, 4, "#9a8a56", "#6b5a44", false) +
    // 土嚢とブロックの護岸
    sandbags(6, 178, 6, 1.1) +
    sandbags(296, 182, 6, 1.1) +
    `<g fill="#a8a498">${[110, 130, 150, 230, 250, 270]
      .map((x) => `<rect x="${x}" y="172" width="18" height="11" rx="2"/>`)
      .join("")}</g>` +
    // 冠水した道。空を映す。
    ground(186, "#7fa0a8") +
    `<g fill="#c0d4d8" opacity=".55"><ellipse cx="80" cy="196" rx="76" ry="8"/><ellipse cx="310" cy="204" rx="86" ry="9"/><ellipse cx="196" cy="192" rx="50" ry="5"/></g>` +
    `<g stroke="#dfeaec" stroke-width="2" opacity=".6" fill="none"><path d="M20,200q30,-4 60,0M250,196q34,-4 68,0M130,206q30,-4 60,0"/></g>` +
    // 水に浮かぶ椰子の実と板
    `<g fill="#8a6f3a"><ellipse cx="60" cy="202" rx="5" ry="3.4"/><ellipse cx="230" cy="200" rx="4.6" ry="3.2"/></g>` +
    `<path d="M340,194h34l-4,4h-30z" fill="#8a7454"/>` +
    person(374, 186, 22, "#c8452f") +
    arm(372, 172, -12, 6),

  /**
   * ロックアイランド(コロール)。**フランスほどの広さのサメの聖域。**
   * 波に抉られたキノコ型の石灰岩の島。鉄道は一本も無い国。
   */
  lagoonislands:
    sky("#8fc4e8", "#cfe8f0", 78) +
    clouds(56, 24, 0.8) +
    clouds(300, 30, 0.9) +
    `<rect x="0" y="78" width="400" height="18" fill="#3f92ae"/>` +
    // 奥のキノコ島
    mushroomIslet(40, 100, 62, 40) +
    mushroomIslet(120, 102, 44, 30) +
    mushroomIslet(300, 100, 70, 44) +
    mushroomIslet(376, 104, 50, 32) +
    sea(96, "#3f9aa8", "#57c0c0", "#84dcd0") +
    // 手前の大きなキノコ島(右)
    mushroomIslet(348, 150, 96, 62) +
    mushroomIslet(46, 156, 74, 50) +
    swell(126, "#d0f0f0", ".5") +
    // 浅瀬のサンゴ
    coralHead(130, 176, 1.2) +
    coralHead(168, 190, 1) +
    coralHead(236, 182, 1.1, "#b06a5a") +
    coralHead(276, 198, 1.2) +
    `<g fill="#3f9a8a" opacity=".35"><ellipse cx="180" cy="200" rx="60" ry="10"/><ellipse cx="90" cy="192" rx="40" ry="7"/></g>` +
    // サメの背びれ(手前・左寄り)
    `<path d="M104,196l9,-16 5,16z" fill="#5f7f8a"/>` +
    `<path d="M96,200q18,-4 34,2q-16,4 -34,-2z" fill="#5f7f8a" opacity=".5"/>` +
    // 小舟
    shade(200, 172, 22, 3, ".14") +
    skiff(200, 168, 0.9, "#e8e0cc") +
    fishSchool(300, 178, 6, 0.9, "#f2d878") +
    gull(210, 58) +
    gull(232, 68, 0.8),

  /**
   * 珊瑚岩の洞窟と、短い滑走路(ペリリュー)。
   * **誰にとってもさほど長くは必要にならなかった滑走路のための戦い。**
   * 暗い絵なので、**洞窟の口の縁を明るくして主役が沈まないようにする。**
   */
  junglecaves:
    sky("#8aa8a0", "#bfd0c0", 56) +
    jungleBand(56, 18, "#2a5334") +
    jungleBand(70, 14, "#20452c") +
    ground(82, "#3a5f3c") +
    // 珊瑚岩の崖(左〜中央)
    `<path d="M0,82q40,-14 74,-4q40,12 76,-2q34,-12 66,4v100H0z" fill="#8f8a74"/>` +
    `<path d="M0,96q36,-10 68,-2q38,10 70,0q30,-8 62,4v84H0z" fill="#a09a82"/>` +
    `<g stroke="#7a7562" stroke-width="1.8" opacity=".8" fill="none"><path d="M20,96l-8,24 10,20M70,92l8,26 -6,22M124,100l-10,22 8,18M176,104l10,20 -8,20"/></g>` +
    // **洞窟の口。**縁を明るくして輪郭を立てる。
    `<path d="M36,168q10,-42 42,-42q32,0 40,42z" fill="#cfc7ae"/>` +
    `<path d="M42,168q9,-36 36,-36q27,0 34,36z" fill="#2a2620"/>` +
    `<path d="M50,168q7,-27 28,-27q21,0 26,27z" fill="#171512"/>` +
    `<g fill="#8f8a74" opacity=".85"><path d="M60,142l4,10 5,-9z"/><path d="M88,140l4,11 5,-10z"/></g>` +
    // 岩肌の緑
    `<g fill="#2f6b3f" opacity=".9">${[10, 42, 96, 150, 190]
      .map((x, i) => `<ellipse cx="${x}" cy="${88 + (i % 3) * 6}" rx="16" ry="8"/>`)
      .join("")}</g>` +
    // 右:密林と、根に覆われた滑走路の端
    ground(150, "#3f6b40") +
    `<path d="M0,150q90,-8 190,2q100,10 210,-6v18H0z" fill="#4a7a46"/>` +
    broadTree(300, 156, 22, "#26543a") +
    broadTree(356, 152, 18, "#2d5f3f") +
    palm(258, 154, 40, 5, "#2f7f4a") +
    ground(168, "#4f7a42") +
    // 割れたコンクリートの滑走路(手前)
    `<path d="M0,186h400v24H0z" fill="#a8a494"/>` +
    `<path d="M0,186q94,-8 196,2q98,10 204,-4v6H0z" fill="#bfbaa8"/>` +
    `<g stroke="#8f8b7c" stroke-width="2.2" fill="none"><path d="M60,186v24M150,188v22M250,186v24M340,188v22M0,198h400"/></g>` +
    `<g fill="#3f6b40" opacity=".9"><path d="M96,210q8,-16 26,-12q-6,12 -26,12z"/><path d="M296,210q10,-14 28,-10q-8,10 -28,10z"/><path d="M186,208q8,-12 22,-9q-6,9 -22,9z"/></g>` +
    tuft(30, 208, 1.3) +
    tuft(374, 206, 1.2),

  /**
   * 沈船の礁(ウェノ)。**わずか二日で沈んだ艦隊を、いまも探っている。**
   * 水面より上と下を1枚に収める断面の構図。
   */
  wreckreef:
    sky("#8fc4e8", "#cfe4f0", 62) +
    clouds(76, 24, 0.8) +
    islandFar(330, 62, 150, 22, "#5f8272") +
    // 海面
    `<rect x="0" y="62" width="400" height="4" fill="#e8f4f8" opacity=".8"/>` +
    // 水中(深くなるほど暗く)
    ground(66, "#17557a") +
    `<rect x="0" y="66" width="400" height="34" fill="#2f8fa8"/>` +
    `<rect x="0" y="100" width="400" height="34" fill="#25749a"/>` +
    // 差し込む光
    `<g fill="#a8e0ee" opacity=".18"><path d="M40,66l-24,144h30l30,-144z"/><path d="M300,66l24,144h-28l-30,-144z"/></g>` +
    // 水面上のダイビング船(左上)
    shade(70, 64, 30, 3, ".12") +
    skiff(70, 60, 1.1, "#e8e0cc") +
    `<rect x="60" y="46" width="4" height="14" fill="#4a4438"/>` +
    `<path d="M64,46h14v8h-14z" fill="#c8452f"/>` +
    // **横倒しの貨物船(右下)。**輪郭で見せる。
    `<g opacity=".95"><path d="M232,206q26,-46 92,-52q64,-6 76,14q-8,34 -74,42q-64,6 -94,-4z" fill="#2f5f70"/>` +
    `<path d="M252,196q26,-34 84,-40q54,-4 64,10q-8,24 -66,32q-56,6 -82,-2z" fill="#3a6f80"/>` +
    `<g fill="#1f4a5a"><rect x="300" y="150" width="34" height="14" rx="2" transform="rotate(-12 317 157)"/><rect x="344" y="146" width="18" height="10" transform="rotate(-12 353 151)"/></g>` +
    `<path d="M262,168l-24,-30" stroke="#1f4a5a" stroke-width="4" fill="none"/>` +
    `<g fill="#2a5566">${[248, 268, 288, 308]
      .map((x, i) => `<circle cx="${x}" cy="${190 - i * 5}" r="4"/>`)
      .join("")}</g></g>` +
    // 沈んだ艦橋(左)
    `<g opacity=".9"><path d="M10,210v-44h46v44z" fill="#2f5f70"/>` +
    `<path d="M18,166v-16h30v16z" fill="#3a6f80"/>` +
    `<path d="M30,150v-14h6v14z" fill="#3a6f80"/>` +
    `<g fill="#1f4a5a"><rect x="16" y="176" width="8" height="7"/><rect x="30" y="176" width="8" height="7"/><rect x="44" y="176" width="8" height="7"/></g></g>` +
    // 珊瑚に覆われた甲板
    coralHead(46, 166, 1, "#c87a6a") +
    coralHead(280, 158, 0.9, "#b06a8a") +
    coralHead(360, 148, 1.1, "#c87a6a") +
    // 魚とダイバーの泡
    fishSchool(96, 108, 6, 1, "#f2e0a8") +
    fishSchool(180, 176, 6, 0.9, "#a8e8dc") +
    bubbles(126, 148, 78, 1.1) +
    // ダイバーの影(小さく、輪郭だけ)
    `<g fill="#1f3f4a" opacity=".85"><ellipse cx="136" cy="150" rx="13" ry="6"/>` +
    `<circle cx="150" cy="147" r="4.4"/><path d="M124,152l-12,8M126,146l-10,-4" stroke="#1f3f4a" stroke-width="3" fill="none" stroke-linecap="round"/>` +
    `<rect x="126" y="140" width="12" height="8" rx="2"/></g>`,

  /**
   * 礁の上に積まれた玄武岩(ポンペイ・ナンマトル)。
   * **よそ者が誰も見る前から、石の都はここにあった。**
   * 六角柱を井桁に積んだ壁と、そのあいだを通る水路。
   */
  basaltislets:
    sky("#a8c4c8", "#d8e4dc", 84) +
    clouds(300, 26, 0.8) +
    jungleBand(84, 16, "#2a5738") +
    ground(96, "#3f6b46") +
    `<g fill="#2f6b42">${[14, 48, 300, 340, 380]
      .map((x) => `<ellipse cx="${x}" cy="102" rx="22" ry="12"/>`)
      .join("")}</g>` +
    // 左の壁。玄武岩の柱を横積みにする。
    `<g>${[0, 1, 2, 3, 4, 5, 6, 7]
      .map(
        (i) =>
          `<rect x="${4 + (i % 2) * 5}" y="${112 + i * 8}" width="${126 - (i % 2) * 8}" height="7" rx="2" fill="${i % 2 ? "#4a4a44" : "#3a3a36"}"/>`,
      )
      .join("")}</g>` +
    `<g fill="#5a5a52" opacity=".8">${[10, 34, 58, 82, 106]
      .map((x) => `<rect x="${x}" y="112" width="18" height="7" rx="2"/>`)
      .join("")}</g>` +
    // 右の壁
    `<g>${[0, 1, 2, 3, 4, 5, 6]
      .map(
        (i) =>
          `<rect x="${272 + (i % 2) * 6}" y="${120 + i * 8}" width="${124 - (i % 2) * 10}" height="7" rx="2" fill="${i % 2 ? "#4a4a44" : "#3a3a36"}"/>`,
      )
      .join("")}</g>` +
    `<g fill="#5a5a52" opacity=".8">${[278, 302, 326, 350, 374]
      .map((x) => `<rect x="${x}" y="120" width="18" height="7" rx="2"/>`)
      .join("")}</g>` +
    // 壁の上の緑
    `<g fill="#3f8f52" opacity=".9"><ellipse cx="40" cy="110" rx="20" ry="7"/><ellipse cx="96" cy="112" rx="16" ry="6"/><ellipse cx="316" cy="118" rx="20" ry="7"/><ellipse cx="368" cy="120" rx="15" ry="6"/></g>` +
    // 水路
    ground(168, "#3f6f7f") +
    `<rect x="0" y="168" width="400" height="18" fill="#4f8794"/>` +
    ground(186, "#5f9aa4") +
    `<g stroke="#a8d4d8" stroke-width="2" opacity=".55" fill="none"><path d="M20,180q26,-4 52,0M240,192q30,-4 60,0M110,200q28,-4 56,0M330,204q26,-4 52,0"/></g>` +
    // 水面に落ちた壁の影
    `<g fill="#2a3a3a" opacity=".28"><rect x="4" y="168" width="126" height="12"/><rect x="272" y="168" width="124" height="10"/></g>` +
    // 水路に浮かぶ丸木舟
    shade(180, 200, 26, 3, ".16") +
    outrigger(180, 196, 0.8, "#5a4630") +
    mangrove(30, 176, 1) +
    mangrove(360, 182, 1.1) +
    // 崩れて水に落ちた柱
    `<g fill="#3a3a36"><rect x="130" y="176" width="34" height="6" rx="2" transform="rotate(12 147 179)"/><rect x="216" y="186" width="30" height="6" rx="2" transform="rotate(-8 231 189)"/></g>`,

  /**
   * 石の銀行(ヤップ)。**重すぎて運べない通貨、だから所有権は口約束だけで移る。**
   * 道沿いに石貨が立ち並び、いちばん高い建物は集会所。
   */
  lagoonvillage:
    sky("#8fc4e8", "#d4e8ec", 88) +
    clouds(76, 24, 0.8) +
    clouds(320, 30, 0.7) +
    `<rect x="0" y="88" width="400" height="16" fill="#4f9aae"/>` +
    `<rect x="0" y="100" width="400" height="6" fill="#7ed8cc" opacity=".7"/>` +
    ground(104, "#4f7f4a") +
    jungleBand(104, 14, "#2d5f3f") +
    `<path d="M0,118q86,-8 180,0q96,8 220,-4v18H0z" fill="#5f8f4a"/>` +
    // 集会所(右)。高い切妻。
    gableHouse(292, 158, 100, 72, "#9a7f46", "#c8b48a") +
    palm(268, 158, 44, -5) +
    broadTree(240, 156, 16) +
    // 土の道
    ground(158, "#a89474") +
    `<path d="M0,158q94,-6 196,2q98,8 204,-6v14H0z" fill="#b8a482"/>` +
    ground(178, "#5f8f4a") +
    `<rect x="0" y="170" width="400" height="26" fill="#a89474"/>` +
    `<path d="M0,170q90,-4 188,2q102,6 212,-4v6H0z" fill="#c2ae8a"/>` +
    // **石貨。**道沿いに大小が並ぶ。
    stoneDisc(30, 168, 26) +
    stoneDisc(84, 170, 18) +
    stoneDisc(120, 166, 12) +
    stoneDisc(360, 176, 30) +
    stoneDisc(310, 170, 15) +
    // 手前にもう一枚、大きく
    stoneDisc(66, 208, 34) +
    hibiscus(160, 202, 1.2) +
    hibiscus(232, 206, 1) +
    tuft(196, 196, 1.3) +
    gull(200, 62) +
    gull(224, 72, 0.8),

  /**
   * 遠い島(コスラエ・ピンゲラップ・ファカオフォ)。
   * **道路ではなく、たった一本の便か船がつなぎとめている。**
   */
  remoteisland:
    sky("#8fc4e8", "#cfe4f0", 90) +
    clouds(60, 24, 0.9) +
    clouds(320, 28, 0.7) +
    islandFar(200, 84, 300, 46, "#4f7f5f") +
    `<path d="M40,84q60,-24 160,-22q100,2 160,22z" fill="#3f6b4a" opacity=".6"/>` +
    sea(90, "#26688f", "#3f92ae", "#5fb8c4") +
    surf(132, ".75") +
    ground(140, "#efe2c6") +
    `<path d="M0,140q86,-6 178,2q94,8 222,-4v14H0z" fill="#e4d4b2"/>` +
    ground(154, "#5f8f4a") +
    `<path d="M0,154q90,-6 190,2q98,8 210,-4v10H0z" fill="#6f9a52"/>` +
    // 椰子と青いトタンの家(左右)
    palm(28, 158, 44, -5) +
    palm(64, 162, 36, 4) +
    palm(346, 156, 40, -4) +
    palm(384, 160, 32, 3) +
    tinHouse(94, 132, 40, 158, "#e8e0cc", "#3f6f9a") +
    tinHouse(292, 136, 34, 158, "#f0dcc0", "#4f7f6a") +
    broadTree(140, 158, 14) +
    // 桟橋と小舟
    ground(172, "#efe2c6") +
    `<rect x="0" y="182" width="400" height="28" fill="#5fb8c4"/>` +
    `<path d="M0,182q92,-6 194,2q98,8 206,-4v6H0z" fill="#84dcd0"/>` +
    jetty(150, 260, 176, 196) +
    shade(310, 200, 26, 4, ".16") +
    skiff(310, 196, 1, "#c8452f") +
    outrigger(70, 200, 0.85, "#6b5330") +
    person(180, 176, 20, "#f5b31c") +
    arm(178, 164, 10, 6) +
    crate(196, 176, 16, 12) +
    drum(220, 176, 0.85, "#4f7f6a") +
    gull(240, 60) +
    gull(262, 70, 0.8) +
    tuft(20, 200, 1.2),

  /**
   * 空っぽの秘密の泊地(ウリシー)。
   * **真珠湾より大きな潟に、いまは船が1隻もいない。**
   * 夕方。残っているのは錆びた係留ブイと朽ちた杭だけ。
   */
  emptylagoon:
    sky("#e8a878", "#f2cf9c", 104) +
    sun(66, 44, 18, "#f8d878") +
    `<g fill="#f0bc84" opacity=".7"><ellipse cx="140" cy="40" rx="120" ry="10"/><ellipse cx="330" cy="56" rx="100" ry="9"/><ellipse cx="60" cy="72" rx="90" ry="8"/></g>` +
    atollRim(96, "#5f6f56", 4) +
    `<g opacity=".85">${[16, 44, 74, 288, 318, 350, 384]
      .map((x, i) => palm(x, 100, 11 + (i % 3) * 3, i % 2 ? 2 : -2, "#3f5f44", "#5a4a38", false))
      .join("")}</g>` +
    // 夕日を映す潟
    ground(104, "#4f7f8a") +
    `<rect x="0" y="104" width="400" height="26" fill="#3f6f80"/>` +
    `<rect x="0" y="130" width="400" height="24" fill="#5f8f96"/>` +
    ground(154, "#78a4a8") +
    `<g fill="#f2c078" opacity=".5"><ellipse cx="66" cy="120" rx="26" ry="4"/><ellipse cx="66" cy="140" rx="34" ry="5"/><ellipse cx="66" cy="164" rx="44" ry="6"/><ellipse cx="66" cy="192" rx="54" ry="7"/></g>` +
    swell(126, "#f0d0a0", ".45") +
    swell(168, "#f0d0a0", ".35") +
    // **船は1隻もいない。**残るのは係留ブイと鎖。
    shade(310, 178, 22, 4, ".16") +
    `<g><circle cx="310" cy="170" r="16" fill="#8a4a30"/>` +
    `<path d="M294,170a16,16 0 0 0 32,0z" fill="#6b3722"/>` +
    `<rect x="304" y="150" width="12" height="8" rx="2" fill="#5f5a4a"/>` +
    `<path d="M310,150v-8" stroke="#5f5a4a" stroke-width="3" fill="none"/>` +
    `<g fill="#a86a48" opacity=".8"><rect x="298" y="164" width="9" height="4"/><rect x="314" y="172" width="10" height="4"/></g>` +
    `<path d="M318,178q14,10 30,6q-16,6 -30,-6z" fill="#5f5a4a" opacity=".7"/></g>` +
    ruinedPiles([120, 138, 154, 174, 196], 190, 20) +
    ruinedPiles([28, 46], 200, 22) +
    // 手前の砂州
    `<path d="M0,206q60,-12 130,-4q-14,10 -68,12H0z" fill="#d8c49a"/>` +
    gull(220, 66, 1, "#5f4a3a") +
    gull(244, 76, 0.8, "#5f4a3a"),

  /**
   * 台風の湾(アピア)。**三か国の軍艦を一度に沈めたのは、戦闘ではなく台風だった。**
   * 嵐。暗い灰青と白波だけで、遺体も残骸の細部も描かない。
   */
  cyclonebay:
    sky("#48586a", "#6f7f8c", 80) +
    `<g fill="#3a4856" opacity=".85"><ellipse cx="90" cy="26" rx="140" ry="18"/><ellipse cx="320" cy="18" rx="120" ry="16"/><ellipse cx="200" cy="46" rx="150" ry="14"/></g>` +
    `<g stroke="#8f9aa4" stroke-width="2" opacity=".5" fill="none"><path d="M20,62q40,-8 80,-2M240,54q44,-8 88,-2M120,74q40,-8 80,-2"/></g>` +
    islandFar(60, 80, 150, 22, "#3f5250") +
    // 荒れた海
    ground(80, "#3f5f70") +
    `<rect x="0" y="80" width="400" height="30" fill="#33505f"/>` +
    `<rect x="0" y="110" width="400" height="32" fill="#456a7c"/>` +
    ground(142, "#527f90") +
    whitecaps(92, 8) +
    whitecaps(140, 7) +
    // **傾いたマスト3本。**船体は波の下。
    `<g stroke="#33302c" stroke-width="4" stroke-linecap="round" fill="none"><path d="M64,168L48,116M84,166l4,-46M300,182L322,128"/></g>` +
    `<g stroke="#6b6a5a" stroke-width="2.6" fill="none"><path d="M52,130h22M56,144h22M312,140h20M316,156h18M84,132h16"/></g>` +
    `<g fill="#5a5648"><path d="M46,116l-12,6 12,4z"/><path d="M322,128l14,4 -13,6z"/></g>` +
    `<g fill="#33302c" opacity=".5"><path d="M30,176q40,-14 84,-4q-30,14 -84,4z"/><path d="M282,190q42,-14 88,-2q-34,14 -88,2z"/></g>` +
    // 大きな砕け波(手前)
    `<path d="M0,190q54,-32 118,-14q66,18 128,-6q62,-24 154,6v34H0z" fill="#5f8f9a"/>` +
    `<path d="M0,196q54,-26 116,-10q64,16 126,-6q62,-22 158,8v22H0z" fill="#7fa8b0"/>` +
    `<g fill="#eef6f8" opacity=".9"><path d="M0,192q50,-28 112,-12q-52,4 -112,12z"/><path d="M246,180q60,-22 154,4q-76,-6 -154,-4z"/></g>` +
    // 風でしなる椰子(右)
    palm(378, 178, 46, -22, "#3f6b44", "#5a4a38", false) +
    palm(348, 184, 36, -18, "#456f48", "#5a4a38", false) +
    // 砕けた板
    `<g fill="#7a6242"><rect x="140" y="200" width="34" height="5" transform="rotate(-12 157 202)"/><rect x="196" y="206" width="28" height="5" transform="rotate(9 210 208)"/></g>` +
    // 飛沫
    `<g fill="#e8f0f2" opacity=".8"><circle cx="70" cy="176" r="4"/><circle cx="92" cy="166" r="3"/><circle cx="112" cy="180" r="3.4"/><circle cx="300" cy="172" r="3.6"/><circle cx="326" cy="182" r="3"/></g>`,

  /**
   * 深く切れ込んだ湾(パゴパゴ)。**アメリカ海軍がどうしても欲しかった港。**
   * 両側が急峻なので空が狭い。缶詰工場とまき網船。
   */
  deepharbour:
    sky("#8fc4e8", "#cfe0e8", 114) +
    clouds(200, 24, 0.7) +
    // 両側の緑の壁
    `<path d="M0,0v170q30,-24 54,-70q26,-50 30,-100z" fill="#2d5f45"/>` +
    `<path d="M0,20v150q26,-20 48,-62q22,-42 26,-88z" fill="#3f7a52"/>` +
    `<path d="M400,0v176q-40,-26 -70,-78q-32,-56 -36,-98z" fill="#26543a"/>` +
    `<path d="M400,24v152q-34,-22 -62,-70q-28,-48 -32,-82z" fill="#37704a"/>` +
    `<g fill="#4f8f5a" opacity=".8"><ellipse cx="46" cy="88" rx="18" ry="10"/><ellipse cx="66" cy="126" rx="15" ry="9"/><ellipse cx="340" cy="94" rx="18" ry="10"/><ellipse cx="366" cy="132" rx="16" ry="9"/></g>` +
    // 奥の稜線
    `<path d="M74,60q60,-34 128,-24q70,10 124,26z" fill="#3f6b4a"/>` +
    // 湾
    ground(114, "#2f6f8a") +
    `<rect x="0" y="114" width="400" height="30" fill="#265f7f"/>` +
    ground(144, "#3f88a0") +
    swell(150, "#a8d8e4", ".45") +
    // 缶詰工場(右)
    `<rect x="292" y="118" width="104" height="36" fill="#e0dccc"/>` +
    `<rect x="292" y="114" width="104" height="6" fill="#9aa0a0"/>` +
    `<g fill="#5f7f96"><rect x="300" y="126" width="14" height="12"/><rect x="322" y="126" width="14" height="12"/><rect x="344" y="126" width="14" height="12"/><rect x="366" y="126" width="14" height="12"/></g>` +
    `<rect x="352" y="90" width="12" height="26" fill="#a8a498"/>` +
    plume(358, 90, 20, 0.7, "#dcd8ce", ".75") +
    `<rect x="292" y="150" width="104" height="6" fill="#8a8f8a"/>` +
    // まき網船
    shade(70, 172, 46, 6, ".2") +
    freighter(76, 166, 0.72, "#3f5f8a", "#e0dccc") +
    shade(300, 186, 40, 5, ".18") +
    skiff(300, 182, 1.3, "#c8452f") +
    // 桟橋とドラム
    ground(178, "#3f88a0") +
    jetty(230, 396, 176, 196) +
    drum(246, 176, 1, "#3f7f9a") +
    drum(262, 176, 1, "#c8452f") +
    crate(276, 176, 18, 13) +
    person(214, 196, 22, "#f5b31c") +
    arm(212, 182, 12, 6) +
    // 手前の岸壁
    `<path d="M0,190h150v20H0z" fill="#8a8f8a"/>` +
    `<path d="M0,190h150v4H0z" fill="#a8aca8"/>` +
    `<g fill="#6b7070">${[16, 56, 96, 132].map((x) => `<rect x="${x}" y="194" width="12" height="8" rx="4"/>`).join("")}</g>` +
    gull(180, 50) +
    gull(202, 60, 0.8),

  /**
   * 島のあいだの水路(ネイアフ)。**ここで出産するクジラだけが、
   * 港を出る理由になる船もある。**
   */
  islandchannel:
    sky("#8fc4e8", "#d4e8f0", 112) +
    clouds(180, 26, 0.8) +
    clouds(340, 20, 0.7) +
    // 両岸の島
    `<path d="M0,74v54q34,-10 56,-32q22,-22 26,-42z" fill="#3f7a52"/>` +
    `<path d="M0,86v42q28,-8 46,-26q18,-18 20,-32z" fill="#4f8f5a"/>` +
    `<path d="M400,74v62q-40,-12 -66,-36q-26,-24 -30,-50z" fill="#2d5f45"/>` +
    `<path d="M400,88v48q-32,-10 -54,-30q-22,-20 -24,-38z" fill="#3f7a52"/>` +
    `<g>${[20, 48, 342, 372].map((x, i) => palm(x, 108 + (i % 2) * 10, 26, i < 2 ? 3 : -3)).join("")}</g>` +
    // 石灰岩の白い崖の帯
    `<g fill="#cfc7b0" opacity=".9"><path d="M0,120q34,-6 62,4q-30,10 -62,6z"/><path d="M400,128q-36,-6 -66,4q32,10 66,4z"/></g>` +
    sea(112, "#2f7f9a", "#3f9ab0", "#5fc0c8") +
    swell(140, "#c8f0f4", ".5") +
    // **クジラの尾びれ。**左寄り、水面から。
    `<g><path d="M40,182q10,-30 22,-42q6,-6 6,-14q10,10 22,4q-14,10 -16,22q-2,14 -8,30z" fill="#3f5460"/>` +
    `<path d="M52,140q-10,-14 -26,-16q18,-4 28,6q10,-12 28,-10q-16,6 -20,20z" fill="#4a6472"/>` +
    `<path d="M28,186q26,-8 52,2q-28,8 -52,-2z" fill="#eef6f8" opacity=".85"/>` +
    `<g fill="#eef6f8" opacity=".7"><circle cx="30" cy="172" r="4"/><circle cx="82" cy="166" r="3.4"/><circle cx="14" cy="182" r="3"/></g></g>` +
    // ヨットと係留ブイ
    shade(310, 178, 30, 4, ".16") +
    `<g><path d="M282,178q28,10 58,0q-28,-6 -58,0z" fill="#e8e0cc"/>` +
    `<path d="M306,176v-46" stroke="#8a8f8a" stroke-width="2.4" fill="none"/>` +
    `<path d="M308,132l22,42h-22z" fill="#f6efe2"/>` +
    `<path d="M304,140l-16,34h16z" fill="#e0e8ee"/></g>` +
    `<g><circle cx="200" cy="196" r="7" fill="#c8452f"/><path d="M193,196a7,7 0 0 0 14,0z" fill="#8a3a2c"/><path d="M200,189v-6" stroke="#5f5a4a" stroke-width="2"/></g>` +
    `<g><circle cx="240" cy="204" r="6" fill="#f5b31c"/><path d="M234,204a6,6 0 0 0 12,0z" fill="#c88f14"/></g>` +
    gull(140, 56) +
    gull(162, 66, 0.8) +
    gull(118, 70, 0.9),

  /**
   * 隆起した珊瑚の岩(アロフィ)。**一つの岩、そして世界でも指折り小さくなった人口。**
   * 砂浜が無い。岩棚がそのまま海に落ちている。
   */
  shallowreef:
    sky("#8fc4e8", "#d8ecf0", 72) +
    clouds(88, 22, 0.8) +
    clouds(320, 26, 0.7) +
    // 外洋の濃い帯
    `<rect x="0" y="72" width="400" height="26" fill="#1f5f8f"/>` +
    `<rect x="0" y="90" width="400" height="8" fill="#2f7fa8"/>` +
    surf(98, ".85") +
    // 浅瀬
    ground(98, "#6fc8c8") +
    `<rect x="0" y="104" width="400" height="20" fill="#57b8be"/>` +
    `<g fill="#9ae4dc" opacity=".5"><ellipse cx="90" cy="140" rx="80" ry="12"/><ellipse cx="300" cy="132" rx="70" ry="10"/></g>` +
    // 隆起した岩棚(右に大きく、下が抉れている)
    `<path d="M400,86v72q-40,10 -84,-2q-40,-12 -30,-38q10,-24 46,-30q38,-6 68,-2z" fill="#cfc7b0"/>` +
    `<path d="M400,86v18q-38,-6 -70,2q-32,8 -40,26q-6,-24 30,-38q40,-14 80,-8z" fill="#3f8f52"/>` +
    `<g stroke="#a89e84" stroke-width="1.8" opacity=".8" fill="none"><path d="M320,120l-4,20 8,16M356,116l6,22 -4,18M392,118l-6,20 8,18"/></g>` +
    `<path d="M286,146q40,14 92,10q-8,10 -46,10q-42,-2 -46,-20z" fill="#a89e84"/>` +
    // 左の低い岩棚
    `<path d="M0,132q46,-8 88,4q40,12 24,26q-18,14 -60,10q-42,-4 -52,-16z" fill="#cfc7b0"/>` +
    `<path d="M0,132q44,-8 84,4q-42,6 -84,2z" fill="#3f8f52"/>` +
    // 手前の岩棚と潮だまり
    ground(160, "#c4bca6") +
    `<path d="M0,160q92,-8 194,2q98,10 206,-6v18H0z" fill="#ded6c0"/>` +
    `<g stroke="#a89e84" stroke-width="2.2" fill="none"><path d="M40,168l-12,20 10,22M140,172l14,18 -10,20M260,166l-14,20 12,24M348,174l12,18 -8,18M0,192h400"/></g>` +
    `<g fill="#4f9aa8"><ellipse cx="76" cy="192" rx="30" ry="9"/><ellipse cx="290" cy="200" rx="36" ry="8"/><ellipse cx="186" cy="184" rx="22" ry="5"/></g>` +
    `<g fill="#8fd8dc" opacity=".6"><ellipse cx="70" cy="190" rx="14" ry="3.4"/><ellipse cx="282" cy="198" rx="16" ry="3"/></g>` +
    coralHead(120, 202, 1, "#c87a6a") +
    coralHead(236, 194, 0.9, "#b06a5a") +
    coralHead(58, 206, 0.9, "#b06a5a") +
    // 岩の割れ目に根を張るタコノキ(この島に砂浜は無い)
    pandanus(24, 168, 30) +
    pandanus(384, 172, 24) +
    `<g fill="#a89e84"><ellipse cx="160" cy="206" rx="13" ry="5"/><ellipse cx="204" cy="200" rx="9" ry="4"/><ellipse cx="322" cy="208" rx="15" ry="5"/></g>` +
    `<g stroke="#b8b0a0" stroke-width="1.6" opacity=".8" fill="none"><path d="M60,196l20,-6M200,176l18,6M300,188l22,-8"/></g>` +
    tuft(96, 186, 1.2) +
    tuft(268, 178, 1.1) +
    // 岩の上のカニ
    `<g fill="#c8622f"><ellipse cx="342" cy="196" rx="6.4" ry="4.4"/><path d="M336,194l-7,-4M348,194l7,-4M336,198l-6,4M348,198l6,4" stroke="#c8622f" stroke-width="1.6" fill="none"/><path d="M338,191l-2,-5M346,191l2,-5" stroke="#c8622f" stroke-width="1.6" fill="none"/></g>` +
    gull(150, 56) +
    gull(174, 66, 0.8),

  /**
   * 立入制限の環礁(ムルロア)。**193回の核爆発を受け止めた。その多くは秘密だった。**
   * 爆発も惨状も描かない。**フェンスと、その向こうの無人**で足りる。
   */
  restrictedatoll:
    sky("#9aa8ac", "#c4ccc8", 92) +
    `<g fill="#aeb8b8" opacity=".8"><ellipse cx="110" cy="34" rx="130" ry="14"/><ellipse cx="330" cy="26" rx="100" ry="12"/></g>` +
    atollRim(92, "#5f7256", 4) +
    `<rect x="0" y="98" width="400" height="26" fill="#456f80"/>` +
    `<rect x="0" y="116" width="400" height="8" fill="#5f8f9a"/>` +
    surf(124, ".6") +
    ground(124, "#ded6c4") +
    `<path d="M0,128q88,-6 182,2q94,8 218,-4v16H0z" fill="#cfc7b2"/>` +
    // 向こう側:朽ちたコンクリートの構造物。**人はいない。**
    `<g fill="#a8a49a"><rect x="16" y="112" width="46" height="26"/><rect x="12" y="108" width="54" height="6"/>` +
    `<rect x="76" y="120" width="26" height="18"/><rect x="300" y="116" width="40" height="22"/><rect x="296" y="112" width="48" height="5"/>` +
    `<rect x="356" y="122" width="24" height="16"/></g>` +
    `<g fill="#8f8b80"><rect x="30" y="120" width="12" height="10"/><rect x="312" y="122" width="12" height="10"/></g>` +
    `<path d="M120,138v-30h5v30zM130,138v-24h5v24zM268,138v-28h5v28z" fill="#9a968c"/>` +
    palm(216, 140, 26, 4, "#5f7f52", "#6b5a44", false) +
    palm(160, 138, 22, -3, "#5f7f52", "#6b5a44", false) +
    ground(140, "#cfc7b2") +
    `<g fill="#c2b9a2" opacity=".8"><ellipse cx="80" cy="160" rx="70" ry="10"/><ellipse cx="320" cy="166" rx="76" ry="11"/></g>` +
    // **金網のフェンスが手前を横切る。**
    chainFence(0, 400, 152, 40) +
    warnSign(64, 194, 1.05) +
    warnSign(316, 198, 1.05) +
    ground(194, "#b8b0a0") +
    `<g stroke="#a09884" stroke-width="2" opacity=".7" fill="none"><path d="M0,202h400M0,208h400"/></g>` +
    tuft(150, 204, 1.3) +
    tuft(238, 200, 1.2) +
    tuft(20, 206, 1.1) +
    gull(200, 62, 1, "#5f6260") +
    gull(224, 72, 0.8, "#5f6260"),

  /**
   * 峻険な谷と湾(タイオハエ)。**貨物船が、いまも唯一決まった出入りの手段。**
   * 尖った黒い稜線で空が狭い。桟橋は無く、艀で荷を運ぶ。
   */
  volcanicvalley:
    sky("#8fc4e8", "#cfe0e0", 58) +
    clouds(200, 22, 0.7) +
    jaggedRidge(58, 46, "#3f4a44", 3) +
    jaggedRidge(74, 34, "#4f5a4a", 5) +
    `<path d="M0,74q60,-40 118,-30q62,10 96,34z" fill="#33403a"/>` +
    `<path d="M400,80q-56,-42 -118,-32q-58,10 -86,36z" fill="#33403a"/>` +
    ground(86, "#2d5f45")+
    `<path d="M0,86q84,-12 176,-2q98,10 224,-6v22H0z" fill="#3f7a52"/>` +
    `<g fill="#4f8f5a" opacity=".85">${[14, 46, 80, 300, 336, 372]
      .map((x, i) => `<ellipse cx="${x}" cy="${104 + (i % 3) * 6}" rx="19" ry="11"/>`)
      .join("")}</g>` +
    // 谷を流れ落ちる細い滝
    `<path d="M96,72q4,26 -2,44" stroke="#cfe8ee" stroke-width="3" opacity=".8" fill="none"/>` +
    palm(52, 132, 34, -4) +
    palm(340, 130, 30, 4) +
    // 湾
    ground(128, "#2f6f8a") +
    `<rect x="0" y="128" width="400" height="26" fill="#265f7f"/>` +
    ground(154, "#3f88a0") +
    swell(160, "#a8d8e4", ".45") +
    // 貨物船(右)と艀
    shade(316, 158, 62, 6, ".18") +
    freighter(316, 152, 0.74) +
    shade(150, 182, 30, 4, ".16") +
    skiff(150, 178, 1.2, "#8a4a30") +
    crate(142, 176, 14, 10) +
    // 黒い砂浜(手前)
    ground(186, "#4a4438") +
    `<path d="M0,186q94,-8 196,2q98,10 204,-6v10H0z" fill="#5a5346"/>` +
    `<g fill="#3f3a30" opacity=".8"><ellipse cx="70" cy="200" rx="60" ry="8"/><ellipse cx="320" cy="204" rx="66" ry="8"/></g>` +
    person(60, 202, 22, "#c8452f") +
    arm(58, 188, 12, 6) +
    person(86, 204, 20, "#f5b31c") +
    crate(104, 204, 18, 13) +
    drum(30, 202, 0.9, "#4f7f6a") +
    gull(196, 44) +
    gull(220, 54, 0.8),

  /**
   * マラエ(ウツロア)。**ポリネシア人がかつて、あらゆる航海の起点と呼んだ島。**
   * 夕暮れ。石を並べた低い壇と立石だけ。**人物も儀礼の場面も描かない。**
   */
  sacredmarae:
    sky("#e8a878", "#f2cf9c", 88) +
    sun(324, 48, 17, "#f8d878") +
    `<g fill="#f0bc84" opacity=".7"><ellipse cx="110" cy="36" rx="120" ry="11"/><ellipse cx="300" cy="72" rx="110" ry="9"/></g>` +
    // 山影
    `<path d="M0,88q54,-46 118,-34q66,12 106,34z" fill="#4a4438"/>` +
    `<path d="M400,88q-50,-38 -110,-28q-56,10 -84,28z" fill="#3f3a30"/>` +
    `<path d="M0,88q70,-24 148,-14q80,10 252,14z" fill="#5a5346" opacity=".8"/>` +
    // 潟の照り返し
    ground(88, "#5f8f96") +
    `<rect x="0" y="96" width="400" height="22" fill="#4f7f8a"/>` +
    ground(118, "#78a4a8") +
    `<g fill="#f2c078" opacity=".5"><ellipse cx="324" cy="108" rx="26" ry="4"/><ellipse cx="324" cy="126" rx="34" ry="5"/></g>` +
    swell(110, "#f0d0a0", ".4") +
    // 陸
    ground(138, "#6b7f52") +
    `<path d="M0,138q90,-6 190,2q100,8 210,-6v16H0z" fill="#7a8f5a"/>` +
    palm(300, 148, 40, 5, "#3f6b48", "#5a4a38") +
    palm(348, 144, 34, -4, "#3f6b48", "#5a4a38") +
    broadTree(376, 148, 15, "#3a6b46") +
    // **マラエ。**低い石壇と立石。
    `<path d="M8,180h180v-14H8z" fill="#b0a68e"/>` +
    `<path d="M8,166h180v-5H8z" fill="#c2b89e"/>` +
    `<g stroke="#8f8674" stroke-width="1.6" opacity=".8" fill="none"><path d="M40,166v14M76,166v14M112,166v14M148,166v14M8,173h180"/></g>` +
    `<g fill="#a89e86"><path d="M20,161v-30l11,-4v34zM52,161v-40l12,-3v43zM90,161v-26l10,-3v29zM126,161v-36l12,-4v40zM164,161v-22l10,-3v25z"/></g>` +
    `<g fill="#8f8674" opacity=".7"><path d="M31,161v-34l4,2v32zM64,161v-43l5,3v40zM100,161v-29l4,2v27zM138,161v-40l5,3v37z"/></g>` +
    shade(100, 182, 92, 6, ".2") +
    // 長い夕影
    ground(180, "#5f7448") +
    `<g fill="#4a5a38" opacity=".55"><path d="M20,180l52,26h-24l-40,-26z"/><path d="M300,188l50,22h-26l-38,-22z"/></g>` +
    tuft(230, 196, 1.4) +
    tuft(268, 204, 1.3) +
    tuft(206, 206, 1.2) +
    gull(230, 64, 1, "#5f4a3a") +
    gull(252, 74, 0.8, "#5f4a3a"),

  /**
   * 孤立した断崖(アダムスタウン)。**そもそも誰も来ない島。**
   * 桟橋は作れない。長艇1艘だけが唯一の出入り口。
   */
  isolatedcliff:
    sky("#8aa4b4", "#c0d0d4", 76) +
    `<g fill="#a8bcc0" opacity=".8"><ellipse cx="80" cy="28" rx="120" ry="14"/><ellipse cx="310" cy="20" rx="110" ry="12"/></g>` +
    gull(120, 44, 1.1, "#4a4a44") +
    gull(148, 56, 0.9, "#4a4a44") +
    gull(96, 60, 0.8, "#4a4a44") +
    // 荒れた灰色の海
    ground(76, "#456a7c") +
    `<rect x="0" y="76" width="400" height="30" fill="#3a5c6c"/>` +
    `<rect x="0" y="106" width="400" height="32" fill="#4f7688"/>` +
    ground(138, "#5f8898") +
    whitecaps(88, 6) +
    whitecaps(140, 6) +
    // **切り立った断崖(右に大きく)。**赤茶の火山岩。
    `<path d="M236,210V132q14,-38 50,-56q40,-20 114,-22v156z" fill="#8a5a44"/>` +
    `<path d="M262,210V140q14,-32 48,-48q36,-16 90,-18v136z" fill="#9a6a4a"/>` +
    `<g stroke="#6b4230" stroke-width="2.4" opacity=".8" fill="none"><path d="M290,210V150l14,-24M330,210V140l-10,-26M366,210V148l12,-22M256,180h144M256,196h144"/></g>` +
    `<path d="M254,72q40,-20 146,-18v22q-70,-4 -110,14q-34,16 -46,38z" fill="#3f6b44"/>` +
    `<g fill="#4f8f52" opacity=".85"><ellipse cx="300" cy="70" rx="22" ry="9"/><ellipse cx="356" cy="62" rx="24" ry="10"/></g>` +
    // 崖に砕ける波
    `<g fill="#eef6f8" opacity=".9"><path d="M216,182q22,-34 46,-12q-16,4 -22,16q-8,10 -24,-4z"/><path d="M226,200q20,-22 42,-8q-18,4 -24,14q-8,8 -18,-6z"/></g>` +
    // 左の岩礁
    `<path d="M0,168q30,-26 58,-10q26,16 8,32q-22,16 -66,4z" fill="#6b5a4a"/>` +
    `<path d="M0,172q26,-18 48,-6q-24,10 -48,6z" fill="#7f6a56"/>` +
    // **長艇1艘だけ。**桟橋は無い。
    shade(120, 196, 34, 5, ".2") +
    `<g><path d="M84,192q36,16 74,0q-36,-8 -74,0z" fill="#7f6242"/>` +
    `<path d="M90,190q32,10 62,0q-32,-5 -62,0z" fill="#9a7a52"/>` +
    `<g stroke="#5f4a30" stroke-width="2" fill="none"><path d="M98,190l-14,-12M112,190l-12,-14M134,190l12,-14M148,190l14,-12"/></g>` +
    person(120, 190, 20, "#c8452f") +
    `<path d="M158,180l16,-14" stroke="#5f4a30" stroke-width="2.6" fill="none"/></g>` +
    `<g fill="#eef6f8" opacity=".8"><path d="M74,196q24,-8 48,2q-26,6 -48,-2z"/></g>` +
    // 崖に営巣する海鳥
    `<g fill="#e8eef0">${[[288, 118], [316, 104], [344, 126], [370, 110], [300, 142]]
      .map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="3.4" ry="2.2"/><circle cx="${x + 3}" cy="${y - 2}" r="1.6"/>`)
      .join("")}</g>` +
    gull(200, 92, 1, "#4a4a44") +
    gull(228, 78, 0.9, "#4a4a44") +
    // 沖の岩
    `<path d="M172,178q14,-16 28,-6q12,10 -2,16q-16,4 -26,-10z" fill="#5f5045"/>` +
    `<path d="M176,176q12,-10 22,-2q-12,4 -22,2z" fill="#7f6a56"/>` +
    `<g fill="#eef6f8" opacity=".75"><path d="M164,186q14,-6 28,2q-16,4 -28,-2z"/></g>` +
    whitecaps(168, 4),

  /**
   * 小さな環礁(ロツマ)。**フィジーが統治する島でありながら、
   * それ以外の共通点がほとんど無い。**礁の輪ごと1枚に収まる小ささ。
   */
  tinyatoll:
    sky("#8fc4e8", "#d4ecf0", 88) +
    tradeClouds(30, "#f6efe2", ".65") +
    sea(88, "#1f5f8f", "#2f7fa8", "#4aa8c0") +
    // 礁の輪(手前に開いた楕円の帯)
    `<ellipse cx="200" cy="176" rx="230" ry="58" fill="#57c0c0"/>` +
    `<ellipse cx="200" cy="176" rx="230" ry="58" fill="none" stroke="#a8e8dc" stroke-width="7" opacity=".85"/>` +
    `<ellipse cx="200" cy="178" rx="192" ry="46" fill="#7ed8cc"/>` +
    surf(120, ".6") +
    // 島は右寄りに1つだけ。
    `<path d="M286,150q34,-14 74,-6q40,8 34,20q-8,10 -56,12q-52,0 -52,-26z" fill="#efe2c6"/>` +
    `<path d="M292,152q32,-12 70,-5q34,7 28,15q-40,-10 -98,-10z" fill="#e4d4b2"/>` +
    palm(310, 152, 34, -4) +
    palm(340, 148, 40, 3) +
    palm(370, 154, 30, -3) +
    broadTree(356, 156, 12) +
    tinHouse(292, 132, 26, 152, "#e8e0cc", "#c8452f") +
    shade(340, 172, 58, 7, ".16") +
    // 手前の砂州とカヌー
    `<path d="M0,196q52,-16 116,-6q-16,14 -70,20H0z" fill="#efe2c6"/>` +
    `<path d="M0,202q46,-12 100,-4q-18,10 -62,12H0z" fill="#e4d4b2"/>` +
    shade(78, 204, 26, 4, ".16") +
    outrigger(78, 200, 0.9, "#6b5330") +
    tuft(30, 200, 1.2) +
    `<g fill="#8a6f3a"><ellipse cx="52" cy="206" rx="5" ry="4"/><ellipse cx="20" cy="210" rx="4.4" ry="3.4"/></g>` +
    coralHead(170, 190, 1.1) +
    coralHead(230, 200, 1, "#b06a5a") +
    fishSchool(146, 168, 6, 0.85, "#f2d878") +
    gull(190, 64) +
    gull(214, 74, 0.8),
};

// ---------------------------------------------------------------------------
// シンボル(24×24)
//
// **盤面では直径19pxほどの点にしかならない。**輪郭を優先し、主役は1つに絞る。
// 下端(y=24)が影の楕円に載るようにしておく。
//
// この盤面は似た題材が固まっているので、**先に描き分けを決めてある:**
//   飛行機5種  airfreight=白赤+黄の木箱 / islandhopper=青白の旅客機+島3つ /
//              noairport=赤い斜線 / camouflage=緑の葉の山 / cargocult=茶色の丸太
//   沈没4種    ghostfleet=水面下の艦影2隻 / wreckdive=潜る人と泡 /
//              shipwreck=水上の横倒しの帆船 / milliondollarpoint=沈むブルドーザー
//   採掘4種    phosphate=海へ張り出す腕 / openpitmine=段になった穴 /
//              nickelore=緑の鉱石 / golddredge=バケットの梯子
// ---------------------------------------------------------------------------

export const OCEANIA_MARKS = {
  /** 空輸される貨物(ラエ)。**道路が無いので、重い物ほど飛ぶ。** */
  airfreight:
    '<path d="M3.4,15.6q2.4,-3.6 8,-3.6h8.2q3.2,0 3.2,2.6q0,2.8 -3.6,2.8H5.4z" fill="#efe8d8"/>' +
    '<path d="M3.4,15.6h18.6q0.8,0.8 0.8,1.6H4.6z" fill="#c8452f"/>' +
    '<path d="M3.4,15.6L2.2,7.4h3.2l1.8,8.2z" fill="#c8452f"/>' +
    '<rect x="5.6" y="9.6" width="13.6" height="2" rx="0.8" fill="#dfd6c2"/>' +
    '<rect x="10.6" y="11.4" width="1.4" height="1.2" fill="#8a8f8a"/>' +
    '<rect x="16.6" y="12.8" width="3.6" height="2.6" rx="0.8" fill="#5f7f96"/>' +
    '<path d="M8.4,12.6h5.2v5.2H8.4z" fill="#3a4048"/>' +
    '<path d="M13.6,17.8h-5.2l-2.6,3h5.2z" fill="#8a8f8a"/>' +
    '<rect x="8.2" y="17.4" width="4.6" height="4" fill="#f5b31c"/>' +
    '<path d="M8.2,17.4h4.6l-2.3,2.2z" fill="#c88f14"/>' +
    '<g fill="#2f2b26"><circle cx="14.6" cy="19.6" r="2.2"/><circle cx="5.6" cy="19" r="1.6"/></g>' +
    '<rect x="1" y="22.6" width="22" height="1.4" rx="0.6" fill="#b8a882"/>',

  /** 礁の上に積まれた玄武岩(ポンペイ・ウツロア)。 */
  ancientstone:
    '<rect x="1" y="22.4" width="22" height="1.6" rx="0.6" fill="#8a8f7a"/>' +
    '<g fill="#3a3a36"><rect x="2" y="19.4" width="20" height="3" rx="1.2"/><rect x="3.6" y="12.6" width="17" height="3" rx="1.2"/><rect x="2.6" y="5.8" width="18.4" height="3" rx="1.2"/></g>' +
    '<g fill="#4c4c46"><rect x="3" y="16" width="18.4" height="3" rx="1.2"/><rect x="2.4" y="9.2" width="19.2" height="3" rx="1.2"/></g>' +
    '<g fill="#5f5f56"><rect x="4.4" y="5.8" width="4.4" height="3" rx="1.2"/><rect x="13" y="5.8" width="4.4" height="3" rx="1.2"/><rect x="8.6" y="16" width="4.4" height="3" rx="1.2"/><rect x="16" y="12.6" width="4" height="3" rx="1.2"/></g>' +
    '<path d="M5,5.8q3,-3 7,-1q4,-2.4 6.6,1z" fill="#3f8f52"/>' +
    '<path d="M2.6,4.6q1.6,-1.6 3.6,-0.6q-1.6,1 -3.6,0.6z" fill="#4f9a5a"/>',

  /** 錆びた上陸用舟艇の残骸(戦跡の5都市)。**残骸の形だけで語る。** */
  battlefield:
    '<rect x="0" y="0" width="24" height="9.6" fill="#bfe0ee"/>' +
    '<rect x="0" y="9.6" width="24" height="3.6" fill="#3f92ae"/>' +
    '<rect x="0" y="13" width="24" height="11" fill="#efe2c6"/>' +
    '<path d="M0,13q6,-1 12,0q6,1 12,-0.6v1.6H0z" fill="#e4d4b2"/>' +
    '<path d="M20.6,13V6.6" stroke="#2f5f3c" stroke-width="1.3" fill="none"/>' +
    '<g fill="#2f5f3c"><ellipse cx="17.6" cy="5.6" rx="3.4" ry="1.1" transform="rotate(-22 17.6 5.6)"/><ellipse cx="23.4" cy="5.4" rx="3.4" ry="1.1" transform="rotate(20 23.4 5.4)"/><ellipse cx="20.6" cy="4" rx="1.4" ry="2.6"/></g>' +
    '<ellipse cx="10.4" cy="21.4" rx="10" ry="2.2" fill="#000" opacity=".2"/>' +
    '<path d="M0.8,20.6L2.6,8.6l5.8,-1.4l8.8,9.6l-1.2,4z" fill="#8a4a30"/>' +
    '<path d="M2.6,8.6l5.8,-1.4l8.8,9.6z" fill="#ab6440"/>' +
    '<path d="M0.8,20.6h15.4l-0.4,1.4H1.2z" fill="#5f3320"/>' +
    '<path d="M16.2,16.8l7,3.6l-0.8,1.8l-7.4,-1.8z" fill="#7a4128"/>' +
    '<g fill="#c2825c" opacity=".9"><rect x="4" y="12" width="4.4" height="1.6"/><rect x="9.4" y="16.4" width="4" height="1.4"/><rect x="2.4" y="16.6" width="2.6" height="1.4"/></g>' +
    '<path d="M6,7.6L4.6,1.6" stroke="#33302c" stroke-width="1.5" fill="none"/>' +
    '<g fill="#c2b494"><ellipse cx="20" cy="22.6" rx="3.4" ry="1"/></g>',

  /** 生きたヤシの葉の下に隠された滑走路(ムンダ)。**輪郭は緑の茂み。** */
  camouflage:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#8a8f6a"/>' +
    '<path d="M17.4,11.6l-1.6,-8h3.2l2,8z" fill="#6b7a5f"/>' +
    '<path d="M17.8,4.6h3.6v1.6h-3.6z" fill="#4f5a44"/>' +
    '<path d="M1.6,22.4q3,-9 11,-9q8.4,0 10,9z" fill="#3f6b46"/>' +
    '<g fill="#2f5f3c"><path d="M2.4,21.4q2.4,-6.4 8.6,-7.4q-4.4,3.6 -5.6,7.4z"/><path d="M12,14q6.4,1.2 8.6,7.6q-4.2,-4.8 -8.6,-7.6z"/></g>' +
    '<g stroke="#4f8f52" stroke-width="1.2" stroke-linecap="round" fill="none"><path d="M6,21.6q0.6,-5 5.6,-6.8M12.4,21.8q1.6,-4.6 6.4,-5.6M9.2,22q-0.6,-4.4 2.6,-7.4M3.6,20.6q1.6,-3.6 5,-5"/></g>' +
    '<g fill="#5f9a5a" opacity=".85"><ellipse cx="6.4" cy="17.6" rx="2.6" ry="1.2" transform="rotate(-32 6.4 17.6)"/><ellipse cx="17.6" cy="18.4" rx="2.6" ry="1.2" transform="rotate(26 17.6 18.4)"/></g>',

  /** キビを積んだ610mmの狭軌の貨車(ラウトカ・ラバサ)。**客は乗らない。** */
  canerail:
    '<g fill="#6b5a3a"><rect x="0.6" y="21.2" width="3.4" height="1.8"/><rect x="6.4" y="21.2" width="3.4" height="1.8"/><rect x="12.2" y="21.2" width="3.4" height="1.8"/><rect x="18" y="21.2" width="3.4" height="1.8"/></g>' +
    '<g fill="#8a8f92"><rect x="0" y="21.4" width="24" height="1"/><rect x="0" y="23" width="24" height="1"/></g>' +
    '<rect x="2.4" y="13.4" width="19.2" height="6.4" fill="#5f6258"/>' +
    '<g stroke="#40433c" stroke-width="0.9" fill="none"><path d="M6.6,13.4v6.4M12,13.4v6.4M17.4,13.4v6.4"/></g>' +
    '<rect x="2.4" y="13.4" width="19.2" height="1.2" fill="#7a7e74"/>' +
    '<g stroke="#8f9a4a" stroke-width="1.8" stroke-linecap="round" fill="none"><path d="M4,13.6q1.4,-4.4 4,-6M8,13.6q1.2,-5 4.4,-6.6M12.4,13.6q1.4,-4.4 4.4,-5.6M16.8,13.6q1.6,-3.6 4,-4.4"/></g>' +
    '<g stroke="#b0bf5f" stroke-width="1.1" stroke-linecap="round" fill="none"><path d="M6.4,12.4q1.4,-3.4 3.6,-4.6M13,12.8q1.6,-3 4,-4"/></g>' +
    '<g fill="#2f2b26"><circle cx="6.6" cy="20.4" r="2"/><circle cx="17.4" cy="20.4" r="2"/></g>' +
    '<g fill="#8a8f92"><circle cx="6.6" cy="20.4" r="0.7"/><circle cx="17.4" cy="20.4" r="0.7"/></g>',

  /** 首都(ポートモレスビーほか)。**いちばん高い建物は、高い切妻。** */
  capital:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#b8a882"/>' +
    '<rect x="4.6" y="14.4" width="14.8" height="8" fill="#cfbf98"/>' +
    '<path d="M2,15.4L12,0.8L22,15.4l-2.4,0.6L12,4.4L4.4,16z" fill="#9a7f46"/>' +
    '<path d="M4.4,16L12,4.4L19.6,16z" fill="#a88f52"/>' +
    '<g stroke="#7a6436" stroke-width="0.8" opacity=".8" fill="none"><path d="M7,15.6L12,6M17,15.6L12,6M9.4,15.6L12,9.4M14.6,15.6L12,9.4"/></g>' +
    '<path d="M12,0.8v-0.8M10.4,2.6h3.2" stroke="#5a4630" stroke-width="1.2" fill="none"/>' +
    '<path d="M9.8,22.4v-4.6a2.2,2.2 0 0 1 4.4,0v4.6z" fill="#5a4630"/>' +
    '<g fill="#5f7f96"><rect x="6" y="16.6" width="2.6" height="3"/><rect x="15.4" y="16.6" width="2.6" height="3"/></g>' +
    '<rect x="4.6" y="14.4" width="14.8" height="1" fill="#b8a482"/>',

  /** 木で組んだ飛行機(タンナ)。**待つ側が作ったもの。**素材は丸太と竹。 */
  cargocult:
    '<rect x="0" y="0" width="24" height="17.4" fill="#cfe4f0"/>' +
    '<rect x="0" y="17.4" width="24" height="6.6" fill="#8a9a5a"/>' +
    '<path d="M0,17.4q6,-1.2 12,-0.2q6,1 12,-0.8v1.8H0z" fill="#9aa864"/>' +
    '<g fill="#6b5330"><rect x="3.6" y="20" width="16.8" height="1.8" rx="0.8"/><rect x="6" y="21.6" width="2" height="2.4"/><rect x="16" y="21.6" width="2" height="2.4"/></g>' +
    '<path d="M3,14q1.4,-2.6 5.6,-2.6h9q3.4,0 3.4,2q0,2.2 -3.6,2.2H4.4z" fill="#7a5c30"/>' +
    '<path d="M3,14h18.4q0.2,0.8 0,1.6H4z" fill="#5f4526"/>' +
    '<rect x="0" y="9" width="24" height="2.6" rx="1.1" fill="#9a7a44"/>' +
    '<rect x="0" y="9" width="24" height="1" fill="#b08c4c"/>' +
    '<path d="M3,14L1.6,5.4h2.8l1.8,8.4z" fill="#7a5c30"/>' +
    '<g stroke="#5f4526" stroke-width="1.5" stroke-linecap="round" fill="none"><path d="M21.6,8v9.4M18.8,10l5.6,5.4M24.4,10l-5.6,5.4"/></g>' +
    '<g stroke="#5f4526" stroke-width="0.7" opacity=".85" fill="none"><path d="M7,11.6v3.4M12,11.6v3.4M17,11.8v3M6,9v2.6M13,9v2.6M19,9v2.6"/></g>' +
    '<g fill="#3f8f52"><ellipse cx="6.4" cy="7.6" rx="2.6" ry="0.9" transform="rotate(-24 6.4 7.6)"/><ellipse cx="16" cy="7.4" rx="2.6" ry="0.9" transform="rotate(22 16 7.4)"/></g>',

  /** 貨物船(タイオハエ)。**いまも唯一決まった出入りの手段。** */
  cargoship:
    '<path d="M0.4,17.6h23.2q-1.6,4.6 -6.4,4.6H6.2q-4.4,0 -5.8,-4.6z" fill="#8a4a30"/>' +
    '<path d="M0.4,17.6h23.2v1.6H0.6z" fill="#5f3320"/>' +
    '<g><rect x="1.6" y="13.4" width="4.4" height="4.2" fill="#3f7f9a"/><rect x="6.4" y="13.4" width="4.4" height="4.2" fill="#c8a13f"/><rect x="11.2" y="13.4" width="4.4" height="4.2" fill="#4f9a5f"/><rect x="4" y="9.2" width="4.4" height="4" fill="#c8452f"/><rect x="8.8" y="9.2" width="4.4" height="4" fill="#8a5a9a"/></g>' +
    '<rect x="16.4" y="10.4" width="6.4" height="7.2" fill="#e0dccc"/>' +
    '<g fill="#3f4a56"><rect x="17.4" y="12" width="1.6" height="2"/><rect x="20" y="12" width="1.6" height="2"/><rect x="17.4" y="15" width="4.2" height="1.4"/></g>' +
    '<rect x="18.4" y="6" width="2.8" height="4.4" fill="#c8452f"/>' +
    '<rect x="18.4" y="6" width="2.8" height="1.2" fill="#2f2f2f"/>' +
    '<path d="M2.4,13.4V5.6M2.4,6.4l6,3.4" stroke="#5f5a4a" stroke-width="1.2" fill="none"/>' +
    '<g stroke="#bfe8f4" stroke-width="1" opacity=".8" fill="none"><path d="M1.4,23.4q3,-1.4 6,0M11,23.6q3,-1.4 6,0"/></g>',

  /** 色の見えない目(ピンゲラップ)。**同じ一枚の葉が、半分だけ色を失う。** */
  colorblind:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#8a8f7a"/>' +
    '<path d="M11.2,23.2V14h1.6v9.2z" fill="#5a4630"/>' +
    '<path d="M12,1.2C4.6,1.6 1.6,5.4 1.6,9.4q0,3 2.4,4.2q-1.6,0.4 -1.6,1.4q0,1.4 3.4,1.4q3.4,0 6.2,-1.4z" fill="#2f7f46"/>' +
    '<path d="M12,1.2C19.4,1.6 22.4,5.4 22.4,9.4q0,3 -2.4,4.2q1.6,0.4 1.6,1.4q0,1.4 -3.4,1.4q-3.4,0 -6.2,-1.4z" fill="#9a9a94"/>' +
    '<g stroke="#4f9a5a" stroke-width="0.9" opacity=".95" fill="none"><path d="M12,12.4L4.4,9.4M12,8.4L3.4,6M12,4.6L6,3"/></g>' +
    '<g stroke="#bcbcb6" stroke-width="0.9" opacity=".95" fill="none"><path d="M12,12.4L19.6,9.4M12,8.4L20.6,6M12,4.6L18,3"/></g>' +
    '<path d="M11.4,1.2h1.2v14h-1.2z" fill="#5a4630"/>' +
    '<g><circle cx="5.4" cy="19.4" r="2.8" fill="#e8443f"/><circle cx="5.4" cy="19.4" r="1" fill="#f5b31c"/></g>' +
    '<g><circle cx="18.6" cy="19.4" r="2.8" fill="#a8a8a2"/><circle cx="18.6" cy="19.4" r="1" fill="#cfcfc8"/></g>',

  /** 共同統治(ポートビラ)。**二つの旗が、一つの町に別々に立つ。** */
  condominium:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#b8a882"/>' +
    '<rect x="4.4" y="17" width="15.2" height="5.4" fill="#efe8d4"/>' +
    '<path d="M3.4,17h17.2l-1.6,-2.6H5z" fill="#8a8478"/>' +
    '<g fill="#5f7f96"><rect x="6" y="18.6" width="2.4" height="2.6"/><rect x="10.8" y="18.6" width="2.4" height="2.6"/><rect x="15.6" y="18.6" width="2.4" height="2.6"/></g>' +
    '<rect x="4.6" y="2.4" width="1.6" height="12.4" fill="#b0aca0"/>' +
    '<path d="M6.2,3q4,1.6 8.4,0q-0.8,2.8 0,5.2q-4.6,1.6 -8.4,0z" fill="#3f5f9f"/>' +
    '<rect x="17.8" y="5.4" width="1.6" height="9.4" fill="#b0aca0"/>' +
    '<path d="M17.8,6q-3.6,1.4 -7.4,0q0.8,2.6 0,4.8q4.2,1.4 7.4,0z" fill="#c8452f"/>' +
    '<path d="M17.8,8q-3.6,1 -7.4,0.2v1.8q3.8,0.8 7.4,-0.2z" fill="#efe8d4"/>' +
    '<g fill="#8a8478"><circle cx="5.4" cy="2" r="1"/><circle cx="18.6" cy="5" r="1"/></g>',

  /** 太平洋でも指折り過密な1平方キロメートル(エベイエ)。 */
  crowdedisland:
    '<path d="M0,20.4q4,-2.4 12,-2.4t12,2.4q-4,3 -12,3t-12,-3z" fill="#57c0c0"/>' +
    '<path d="M2.6,20.6q3.4,-1.8 9.4,-1.8t9.4,1.8q-3.6,2 -9.4,2t-9.4,-2z" fill="#efe2c6"/>' +
    '<g><rect x="2.6" y="15.4" width="5" height="4.4" fill="#dcd4c0"/><path d="M1.8,15.4h6.6l-1.4,-2.4H3.2z" fill="#c8452f"/></g>' +
    '<g><rect x="8.4" y="14" width="5.2" height="5.8" fill="#e8e0cc"/><path d="M7.6,14h6.8l-1.4,-2.6H9z" fill="#4f7f6a"/></g>' +
    '<g><rect x="14" y="15.8" width="4.8" height="4" fill="#dfd6c0"/><path d="M13.2,15.8h6.4l-1.4,-2.2h-3.6z" fill="#3f6f9a"/></g>' +
    '<g><rect x="5.2" y="10.2" width="5" height="4" fill="#e8e0cc"/><path d="M4.4,10.2h6.6l-1.4,-2.4H5.8z" fill="#8a4a30"/></g>' +
    '<g><rect x="11.6" y="9" width="5.4" height="5" fill="#dcd4c0"/><path d="M10.8,9h7l-1.4,-2.4h-4.2z" fill="#c8452f"/></g>' +
    '<g><rect x="8.6" y="4.4" width="5" height="4.4" fill="#e8e0cc"/><path d="M7.8,4.4h6.6l-1.4,-2.4H9.2z" fill="#4f7f6a"/></g>' +
    '<g fill="#5f7f96" opacity=".9"><rect x="9.8" y="15.6" width="1.6" height="2"/><rect x="6.4" y="11.6" width="1.6" height="1.8"/><rect x="13.2" y="10.6" width="1.6" height="1.8"/></g>' +
    '<g stroke="#4aa8c0" stroke-width="1" opacity=".8" fill="none"><path d="M1,23q3,-1.2 6,0M15,23.2q3,-1.2 6,0"/></g>',

  /** 遠い島(ロツマ)。**同じ国だが、それ以外の共通点がほとんど無い。** */
  distantisland:
    '<rect x="0" y="4" width="24" height="9" fill="#bfe0ee"/>' +
    '<path d="M6.4,13q1.6,-4.6 5.6,-4.6q4.2,0 5.8,4.6z" fill="#4f7f5f"/>' +
    '<path d="M8.6,13q1.2,-3 3.4,-3q2.2,0 3.4,3z" fill="#5f9a66"/>' +
    '<g fill="#3f6b4a"><path d="M9.6,9.4q0.6,-1.8 2.4,-2q-1.2,1.2 -1.4,2z"/><path d="M14.4,9.4q-0.6,-1.8 -2.4,-2q1.2,1.2 1.4,2z"/></g>' +
    '<rect x="0" y="13" width="24" height="11" fill="#2f7fa8"/>' +
    '<rect x="0" y="17.4" width="24" height="6.6" fill="#4aa8c0"/>' +
    '<rect x="0" y="12.6" width="24" height="1" fill="#d8f0f6" opacity=".8"/>' +
    '<g stroke="#bfe8f4" stroke-width="1.1" opacity=".7" fill="none" stroke-linecap="round"><path d="M2,15.6q2,-0.8 4,0M15,16.6q2,-0.8 4,0M6,20q2.4,-1 4.8,0M16,21.4q2.4,-1 4.8,0M1,22.4q2.4,-1 4.8,0"/></g>' +
    '<path d="M20.6,6.6q1.4,-1.8 2.8,0q1.4,-1.8 2.8,0" stroke="#4a4a44" stroke-width="0.9" fill="none" stroke-linecap="round" transform="translate(-4,0)"/>',

  /** フランス海外領のなかの王国(マタウトゥ)。**三色旗の下に、王の家がある。** */
  dualkingdom:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#8a9a62"/>' +
    '<rect x="18.6" y="2.4" width="1.6" height="20" fill="#b0aca0"/>' +
    '<g><rect x="20.2" y="3" width="3.4" height="5.6" fill="#3f5f9f"/><rect x="20.2" y="3" width="1.2" height="5.6" fill="#3f5f9f"/><rect x="21.4" y="3" width="1.2" height="5.6" fill="#efe8d4"/><rect x="22.6" y="3" width="1.2" height="5.6" fill="#c8452f"/></g>' +
    '<path d="M2.6,22.4v-5h13.6v5z" fill="#c2ae8a"/>' +
    '<g fill="#6b5a44"><rect x="3.4" y="17.4" width="1.4" height="5"/><rect x="8.8" y="17.4" width="1.4" height="5"/><rect x="14.2" y="17.4" width="1.4" height="5"/></g>' +
    '<path d="M0.8,17.6q3.4,-11 8.6,-11q5.2,0 8.6,11z" fill="#9a7f46"/>' +
    '<path d="M2.8,17.6q2.6,-8.4 6.6,-8.4q4,0 6.6,8.4z" fill="#a88f52"/>' +
    '<g stroke="#7a6436" stroke-width="0.8" opacity=".8" fill="none"><path d="M5,17.4q1.6,-6 4.4,-7.4M13.8,17.4q-1.6,-6 -4.4,-7.4M9.4,17.4V9.6"/></g>' +
    '<path d="M9.4,6.6V4.4" stroke="#5a4630" stroke-width="1.2" fill="none"/>' +
    '<g fill="#3f8f52"><ellipse cx="21" cy="20.4" rx="3" ry="1.8"/><ellipse cx="2.2" cy="21" rx="2.2" ry="1.4"/></g>',

  /** 秘密の艦隊泊地(ウリシー)。**真珠湾より大きい潟に、錨だけが残った。** */
  fleetanchor:
    '<rect x="0" y="15" width="24" height="9" fill="#3f7f9a"/>' +
    '<rect x="0" y="15" width="24" height="1.2" fill="#bfe8f4" opacity=".7"/>' +
    '<g stroke="#a8d8e4" stroke-width="1" opacity=".6" fill="none"><path d="M1,19q2.4,-1 4.8,0M17,20.6q2.4,-1 4.8,0"/></g>' +
    '<circle cx="12" cy="3.6" r="2.8" fill="none" stroke="#5f6a70" stroke-width="1.8"/>' +
    '<rect x="10.8" y="6" width="2.4" height="15.6" rx="0.8" fill="#5f6a70"/>' +
    '<rect x="6.8" y="7.6" width="10.4" height="2.2" rx="1" fill="#5f6a70"/>' +
    '<path d="M12,21.6q-7.4,-0.6 -8.4,-8q3,3.6 3.8,3.4q-1,3.2 4.6,3.4z" fill="#5f6a70"/>' +
    '<path d="M12,21.6q7.4,-0.6 8.4,-8q-3,3.6 -3.8,3.4q1,3.2 -4.6,3.4z" fill="#5f6a70"/>' +
    '<g fill="#7f8a90"><rect x="10.8" y="6" width="2.4" height="1.4"/><path d="M3.6,13.6l2.2,2.4l-1.6,0.6z"/><path d="M20.4,13.6l-2.2,2.4l1.6,0.6z"/></g>' +
    '<g fill="#8a4a30"><rect x="1.4" y="12.6" width="3.4" height="2.6" rx="1.2"/></g>',

  /** 自治だが完全な独立ではない地位(アヴァルア)。**一枚の旗の隅に、別の旗。** */
  freeassociation:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#8a9a62"/>' +
    '<rect x="2.4" y="1.6" width="1.8" height="21" fill="#b0aca0"/>' +
    '<path d="M4.2,2.4q7,2.4 15.4,0q-1.4,5.4 0,10.8q-8.6,2.4 -15.4,0z" fill="#3f5f9f"/>' +
    '<path d="M4.2,2.4q3.6,1.2 7.6,1.2v5.6q-4,0 -7.6,-1.2z" fill="#efe8d4"/>' +
    '<path d="M5,3.2q2.8,0.9 6,0.9v1.4q-3.2,0 -6,-0.9z" fill="#c8452f"/>' +
    '<path d="M5,6q2.8,0.9 6,0.9v1.4q-3.2,0 -6,-0.9z" fill="#c8452f"/>' +
    '<g fill="#efe8d4" opacity=".95"><circle cx="15.6" cy="6.4" r="1.1"/><circle cx="18.6" cy="8.2" r="0.9"/><circle cx="18.2" cy="4.2" r="0.9"/><circle cx="15" cy="10" r="0.9"/></g>' +
    '<circle cx="3.3" cy="1.2" r="1.1" fill="#8a8478"/>' +
    '<path d="M8.4,22.4v-4.2a3,3 0 0 1 6,0v4.2z" fill="#4f7f6a"/>' +
    '<path d="M7,18.6h8.8l-1.4,-2.6H8.4z" fill="#8a4a30"/>' +
    '<g fill="#3f8f52"><ellipse cx="19.4" cy="20.6" rx="3.4" ry="2"/><ellipse cx="4" cy="21.2" rx="2.4" ry="1.4"/></g>',

  /** 潟に沈んだままの艦隊(ビキニ・ウェノ)。**水面の下に輪郭だけ。** */
  ghostfleet:
    '<rect x="0" y="0" width="24" height="4.4" fill="#bfe0ee"/>' +
    '<rect x="0" y="4.4" width="24" height="19.6" fill="#4aa8c0"/>' +
    '<rect x="0" y="12.4" width="24" height="11.6" fill="#3690ac"/>' +
    '<rect x="0" y="3.8" width="24" height="1.8" fill="#f2fafc" opacity=".9"/>' +
    '<g fill="#0f3547"><path d="M0.4,17.6q6.4,-3.4 13.4,-1.4q6.4,1.8 10.2,0.2q-2.4,4.6 -11.4,5.2q-9.6,0.6 -12.2,-4z"/>' +
    '<path d="M5.6,16.2l0.8,-6.6l2.2,6.2z"/><path d="M11.6,16.8l0.9,-4.4l1.8,4.2z"/>' +
    '<rect x="15.4" y="13.4" width="4.6" height="3.2" rx="0.9"/></g>' +
    '<g fill="#1a566e" opacity=".85"><path d="M1.6,11.4q4.8,-2.4 10,-0.8q-1.6,3 -5.2,3.2q-3.8,0 -4.8,-2.4z"/>' +
    '<path d="M5.4,10.4l0.7,-3.6l1.4,3.4z"/></g>' +
    '<g fill="#a8dce8" opacity=".45"><path d="M3.6,4.4L0.6,24h1.8L7,4.4z"/><path d="M19.4,4.4L22.4,24h-1.8L16.2,4.4z"/></g>' +
    '<g stroke="#8fd4e4" stroke-width="0.9" opacity=".6" fill="none"><path d="M2,8q2.6,-1 5.2,0M16,7.4q2.6,-1 5.2,0"/></g>',

  /** 金の浚渫機(ブロロ)。**自分の機械さえ飛行機で運び込むしかなかった。** */
  golddredge:
    '<rect x="0" y="0" width="24" height="11.6" fill="#7f9a5f"/>' +
    '<path d="M0,11.6q6,-2 12,-0.6q6,1.4 12,-1.4v2.6H0z" fill="#6b8a4f"/>' +
    '<rect x="0" y="11.6" width="24" height="12.4" fill="#6fa8bc"/>' +
    '<rect x="0" y="11.2" width="24" height="1.2" fill="#b8e0ec"/>' +
    '<rect x="0" y="18.4" width="24" height="5.6" fill="#568fa4"/>' +
    '<path d="M0.6,22.4V16.6h18.4v5.8z" fill="#5f4326"/>' +
    '<path d="M0.6,16.6h18.4v1.4H0.6z" fill="#8a6a3a"/>' +
    '<rect x="2.6" y="8.4" width="12" height="8.2" fill="#8a4a30"/>' +
    '<path d="M1.4,8.4h14.4l-1.8,-2.8H3.2z" fill="#5f3320"/>' +
    '<g fill="#2f2b26"><rect x="4" y="10.4" width="2.8" height="3.4"/><rect x="8" y="10.4" width="2.8" height="3.4"/><rect x="12" y="10.4" width="2" height="3.4"/></g>' +
    '<path d="M13.6,15.6L23.6,2.6" stroke="#33302c" stroke-width="3.4" stroke-linecap="round" fill="none"/>' +
    '<g fill="#c2c6c2"><rect x="14.4" y="12.4" width="3.2" height="2.6" rx="0.6" transform="rotate(-52 16 13.7)"/><rect x="16.8" y="9.2" width="3.2" height="2.6" rx="0.6" transform="rotate(-52 18.4 10.5)"/><rect x="19.2" y="6" width="3.2" height="2.6" rx="0.6" transform="rotate(-52 20.8 7.3)"/><rect x="21.6" y="2.8" width="3.2" height="2.6" rx="0.6" transform="rotate(-52 23.2 4.1)"/></g>' +
    '<g fill="#f5b31c"><circle cx="4.4" cy="19.4" r="1.4"/><circle cx="8.6" cy="20" r="1.2"/><circle cx="12.6" cy="19.2" r="1.3"/></g>',

  /** 高地(ゴロカ)。**よそ者が1930年代まで見つけられなかった谷。** */
  highlands:
    '<rect x="0" y="0" width="24" height="8" fill="#cfdce0"/>' +
    '<path d="M0,9.4L5.4,3.6L9.6,7.4L14.4,2.4L19,7L24,4v6H0z" fill="#7f9490"/>' +
    '<rect x="0" y="9" width="24" height="1.8" fill="#eaf0ee" opacity=".85"/>' +
    '<path d="M0,15L4.6,9.6L9,13.4L13.6,8.4L18.4,13L24,9.4v6H0z" fill="#5f7a70"/>' +
    '<rect x="0" y="14.4" width="24" height="1.6" fill="#eaf0ee" opacity=".7"/>' +
    '<path d="M0,20.4L5,15.6L10,19L15,14.6L20,18.6L24,15.6v5H0z" fill="#4f7048"/>' +
    '<rect x="0" y="20.2" width="24" height="3.8" fill="#5f8a50"/>' +
    '<g stroke="#7f9a56" stroke-width="0.9" opacity=".9" fill="none"><path d="M0,21.8h24M0,23h24"/></g>' +
    '<g fill="#3f6b40"><path d="M2.6,20.4q1.4,-2.6 3.4,-0.6q-1.6,0.6 -3.4,0.6z"/><path d="M17.4,20.2q1.6,-2.4 3.6,-0.4q-1.8,0.6 -3.6,0.4z"/></g>' +
    '<g fill="#a8894a"><path d="M9,20.4q1.4,-3.6 3.4,0z"/><path d="M9,20.4h3.4v0.8H9z"/></g>',

  /** ザトウクジラ(ネイアフ)。**ここで出産するクジラだけが、船を出す理由になる。** */
  humpbackwhale:
    '<rect x="0" y="14.6" width="24" height="9.4" fill="#3f88a0"/>' +
    '<rect x="0" y="14.6" width="24" height="1.2" fill="#cfeef4" opacity=".8"/>' +
    '<path d="M11,20.4q1.4,-6.4 2.6,-9.4q0.8,-2 0.4,-4q2.6,3 6,0.6q-3.4,3.4 -4,7q-0.6,3.6 -1.4,5.8z" fill="#3a4c58"/>' +
    '<path d="M13.6,11q-3,-4.4 -8.6,-4.4q5.6,-2.4 9.4,1.4q1.4,-4 6.6,-4.4q-4.6,2.6 -5.4,7z" fill="#48606e"/>' +
    '<g fill="#8fa8b4"><path d="M14,8.4q-2.6,-2.6 -6.4,-3q4.4,-0.6 7,2z"/><path d="M15.4,7.6q1.2,-3 5,-3.6q-3.4,2 -4.4,4z"/></g>' +
    '<path d="M6.6,20.6q6.6,-2.6 13.4,0q-6.4,2.4 -13.4,0z" fill="#eef6f8" opacity=".9"/>' +
    '<g fill="#eef6f8" opacity=".75"><circle cx="5.6" cy="17.4" r="1.6"/><circle cx="21" cy="17" r="1.3"/><circle cx="3" cy="20" r="1.2"/></g>' +
    '<g stroke="#bfe8f4" stroke-width="1" opacity=".6" fill="none"><path d="M1,22.6q2.6,-1 5.2,0M15,23q2.6,-1 5.2,0"/></g>',

  /** 週に一本の島づたいの便(コスラエ)。**線ではなく、点をつないでいる。** */
  islandhopper:
    '<path d="M1.6,9.6q1.2,-2 5.4,-2h7q4.4,0 6.4,2.4q1.8,2.2 -2,2.2H4.2z" fill="#f2ece0"/>' +
    '<path d="M1.6,9.6h18.2q0.8,1.2 0.6,2.6H3.4z" fill="#3f5f9f"/>' +
    '<path d="M6.6,7.6L4.4,1.4h2.6l3.6,6.2z" fill="#f2ece0"/>' +
    '<path d="M12.4,7.6L16.6,2h2.4l-2,5.6z" fill="#5b8fe8"/>' +
    '<path d="M4.4,12.2L1.6,17.4h2.2l3.6,-5.2z" fill="#cfd8dc"/>' +
    '<g fill="#5f7f96"><circle cx="9" cy="9.6" r="0.8"/><circle cx="12" cy="9.6" r="0.8"/><circle cx="15" cy="9.6" r="0.8"/></g>' +
    '<rect x="0" y="18.6" width="24" height="5.4" fill="#4aa8c0"/>' +
    '<rect x="0" y="18.6" width="24" height="1.2" fill="#84dcd0" opacity=".8"/>' +
    '<g><path d="M1.6,20.4q1.4,-2.4 3.6,-2.4t3.6,2.4z" fill="#4f7f5f"/><path d="M9.6,20.6q1,-1.8 2.6,-1.8t2.6,1.8z" fill="#4f7f5f"/><path d="M16.6,20.4q1.4,-2.4 3.6,-2.4t3.6,2.4z" fill="#4f7f5f"/></g>' +
    '<g stroke="#f2ece0" stroke-width="1" stroke-dasharray="2 2" opacity=".9" fill="none"><path d="M2,15.4q10,-3.4 20,0"/></g>',

  /** 海へ捨てた財産(ルーガンヴィル)。**運び返すより、そのほうが安かった。** */
  milliondollarpoint:
    '<rect x="0" y="6.4" width="24" height="17.6" fill="#2f7f96"/>' +
    '<rect x="0" y="14" width="24" height="10" fill="#256b84"/>' +
    '<rect x="0" y="5.8" width="24" height="1.2" fill="#e8f4f8" opacity=".85"/>' +
    '<g transform="rotate(14 12 16)">' +
    '<path d="M4.6,20.4v-5.4h11v5.4z" fill="#c8452f"/>' +
    '<path d="M6.6,15v-4.4h6.4l1.4,4.4z" fill="#e0a83a"/>' +
    '<rect x="7.6" y="11.6" width="4.4" height="2.6" fill="#3f5560"/>' +
    '<path d="M16.6,21.4V12.4h2.4v9z" fill="#8a8f8a"/>' +
    '<g fill="#33302c"><circle cx="6.6" cy="20.6" r="2.2"/><circle cx="13.4" cy="20.6" r="2.2"/></g>' +
    '<g fill="#7f8a90"><circle cx="6.6" cy="20.6" r="0.8"/><circle cx="13.4" cy="20.6" r="0.8"/></g>' +
    '</g>' +
    '<g fill="#a8dce8" opacity=".5"><circle cx="3.4" cy="11" r="1.4"/><circle cx="21" cy="9.4" r="1.2"/><circle cx="19.4" cy="13.6" r="0.9"/></g>' +
    '<g stroke="#bfe8f4" stroke-width="0.9" opacity=".6" fill="none"><path d="M1,9.4q2.4,-1 4.8,0M16,8.4q2.4,-1 4.8,0"/></g>',

  /** 列強に一度も支配されなかった王国(ヌクアロファ)。 */
  monarchy:
    '<rect x="1" y="22.4" width="22" height="1.6" rx="0.6" fill="#8a7f5a"/>' +
    '<path d="M3,20.4h18v2H3z" fill="#c88f14"/>' +
    '<path d="M3.4,20.4L2,8.6l5.6,5L12,5.4l4.4,8.2L22,8.6l-1.4,11.8z" fill="#f5b31c"/>' +
    '<path d="M3.4,20.4L2,8.6l5.6,5L12,5.4v15z" fill="#e0a212"/>' +
    '<path d="M3,17.4h18v1.6H3z" fill="#c88f14"/>' +
    '<g fill="#e8443f"><circle cx="12" cy="18.2" r="1.6"/><circle cx="6.4" cy="18.4" r="1.1"/><circle cx="17.6" cy="18.4" r="1.1"/></g>' +
    '<g fill="#f6efe2"><circle cx="2" cy="7.6" r="1.6"/><circle cx="22" cy="7.6" r="1.6"/><circle cx="12" cy="4.2" r="1.9"/></g>' +
    '<g fill="#5b8fe8"><circle cx="9.2" cy="18.6" r="0.9"/><circle cx="14.8" cy="18.6" r="0.9"/></g>' +
    '<path d="M12,2.2V0.4" stroke="#c88f14" stroke-width="1.2" fill="none"/>',

  /** 九人の反乱者(アダムスタウン)。**船を焼いたので、帰る手だてが無くなった。** */
  mutineers:
    '<rect x="0" y="18" width="24" height="6" fill="#3a5c6c"/>' +
    '<rect x="0" y="18" width="24" height="1.2" fill="#bfe0ee" opacity=".7"/>' +
    '<path d="M2.6,18.4h18.8q-1.6,3.6 -6,3.6H8.4q-4.2,0 -5.8,-3.6z" fill="#5f4326"/>' +
    '<path d="M2.6,18.4h18.8v1.2H2.8z" fill="#43301c"/>' +
    '<path d="M12,18.4V3.4" stroke="#4a3520" stroke-width="1.6" fill="none"/>' +
    '<path d="M6.4,18.4L5,9.4" stroke="#4a3520" stroke-width="1.4" fill="none"/>' +
    '<path d="M12.8,6.4q4.4,1.4 4.4,4.4q-2.6,-1 -4.4,-0.6z" fill="#8a7f66" opacity=".8"/>' +
    '<g fill="#e8443f"><path d="M12,17.6q-4.4,-1.4 -3.4,-5.6q1.4,1.6 2.2,1q-1.4,-3.6 1.6,-6.4q-0.4,3.6 2.2,5.2q1.6,-0.6 1,-2.6q3.4,3.4 0.4,8.4z"/></g>' +
    '<g fill="#f5b31c"><path d="M12,17.4q-2.4,-1 -2,-3.6q0.8,1 1.4,0.6q-0.8,-2.2 0.8,-4q-0.2,2.4 1.4,3.4q0.8,-0.4 0.6,-1.6q1.8,2.2 0.2,5.2z"/></g>' +
    '<g fill="#f6efe2" opacity=".9"><path d="M4.6,10.6q1.6,0.6 1.4,3.4q-1,-0.8 -1.6,-0.4z"/></g>' +
    '<g fill="#33302c" opacity=".5"><circle cx="18.4" cy="7.4" r="1.4"/><circle cx="20.6" cy="4.6" r="1.8"/><circle cx="16.6" cy="4" r="1.2"/></g>',

  /** ニッケルの鉱石(ヌメア・チオ)。**赤土のなかの、緑がかった石。** */
  nickelore:
    '<rect x="0" y="15" width="24" height="9" fill="#a85a3a"/>' +
    '<path d="M0,15q6,-2.6 12,-0.6q6,2 12,-1.4v3H0z" fill="#b8674a"/>' +
    '<path d="M0,19.4q7,-2 13,0q5,1.6 11,-0.6v5.2H0z" fill="#9a4f32"/>' +
    '<path d="M2.6,15q1.4,-4.6 5.4,-4.6q4,0 5.4,4.6z" fill="#8a4530" opacity=".6"/>' +
    '<path d="M4.6,18.4l-1.6,-4.6l4.4,-2.6l4.4,2.4l-1.4,4.8z" fill="#5f8f6a"/>' +
    '<path d="M4.6,18.4l-1.6,-4.6l4.4,-2.6z" fill="#7fae86"/>' +
    '<path d="M10.4,18.4l1.4,-4.8l-4.4,-2.4v7.2z" fill="#4a7a56"/>' +
    '<path d="M14.6,20.4l-1.2,-3.4l3.4,-2l3.4,1.8l-1.2,3.6z" fill="#5f8f6a"/>' +
    '<path d="M14.6,20.4l-1.2,-3.4l3.4,-2v5.4z" fill="#7fae86"/>' +
    '<path d="M19.4,10.4l-0.8,-2.4l2.4,-1.4l2.4,1.2l-0.8,2.6z" fill="#4a7a56"/>' +
    '<g fill="#c2856a" opacity=".7"><ellipse cx="4" cy="22" rx="3.4" ry="1.2"/><ellipse cx="19" cy="22.6" rx="4" ry="1.2"/></g>',

  /** 空港が無い国(ファカオフォ)。**丸一日がかりの船旅でしか行けない。** */
  noairport:
    '<path d="M2.4,13.4q1.2,-2 5,-2h6.6q4.2,0 6,2.2q1.6,2 -1.8,2H4.8z" fill="#b8b8b0"/>' +
    '<path d="M7,11.4L5,5.6h2.4l3.4,5.8z" fill="#b8b8b0"/>' +
    '<path d="M12.4,11.4L16.4,6h2.2l-1.8,5.4z" fill="#a0a098"/>' +
    '<path d="M5,15.8L2.4,20.6h2l3.4,-4.8z" fill="#a0a098"/>' +
    '<g fill="#8a8f8a"><circle cx="9.4" cy="13.4" r="0.7"/><circle cx="12.2" cy="13.4" r="0.7"/><circle cx="15" cy="13.4" r="0.7"/></g>' +
    '<circle cx="12" cy="12" r="11" fill="none" stroke="#e8443f" stroke-width="2.6"/>' +
    '<path d="M4.2,4.2L19.8,19.8" stroke="#e8443f" stroke-width="3.4" stroke-linecap="round" fill="none"/>' +
    '<path d="M4.2,4.2L19.8,19.8" stroke="#f27a72" stroke-width="1.1" stroke-linecap="round" fill="none" opacity=".6"/>',

  /** ひび割れつつある核廃棄物のドーム(エニウェトク)。**構造だけで足りる。** */
  nucleardome:
    '<rect x="0" y="19.6" width="24" height="4.4" fill="#cfc7b2"/>' +
    '<path d="M0,19.6q6,-1.6 12,-0.4q6,1.2 12,-0.8v1.6H0z" fill="#ded6c4"/>' +
    '<path d="M1.4,19.6a10.6,9 0 0 1 21.2,0z" fill="#b0aca4"/>' +
    '<path d="M1.4,19.6a10.6,9 0 0 1 10.6,-9v9z" fill="#c0bcb4"/>' +
    '<path d="M1.4,19.6a10.6,9 0 0 1 21.2,0z" fill="none" stroke="#8f8b84" stroke-width="1.2"/>' +
    '<g stroke="#8f8b84" stroke-width="0.8" opacity=".85" fill="none"><path d="M4.6,14.4a10.6,9 0 0 1 14.8,-0.4M7.4,11.6a10.6,9 0 0 1 9.2,0M12,10.6v9M4.4,19.6a7,6 0 0 1 15.2,0"/></g>' +
    '<g stroke="#5f5b54" stroke-width="1" fill="none"><path d="M8.4,11.4l-1.4,3.6l1.6,2.6M15.6,11.8l1.8,3.4l-1.2,3M12,10.6l0.6,4.4l-1,3"/></g>' +
    '<rect x="0" y="18.8" width="24" height="1.4" fill="#9a968e"/>' +
    '<g fill="#8a9a62"><path d="M1.4,22.4q1.4,-2.6 3.4,-0.6q-1.6,0.8 -3.4,0.6z"/><path d="M19.4,23q1.6,-2.4 3.6,-0.4q-1.8,0.8 -3.6,0.4z"/></g>',

  /** 立入制限の環礁(ムルロア)。**爆発は描かない。標識と鎖で足りる。** */
  nucleartest:
    '<rect x="0" y="13.6" width="24" height="10.4" fill="#456f80"/>' +
    '<rect x="0" y="13.6" width="24" height="1.2" fill="#a8ccd8" opacity=".8"/>' +
    '<rect x="0" y="18.4" width="24" height="5.6" fill="#3a5c6c"/>' +
    '<g stroke="#33302c" stroke-width="1.6" stroke-linecap="round" fill="none"><path d="M6.4,3.6L12,9.2M17.6,3.6L12,9.2"/></g>' +
    '<g fill="#33302c"><circle cx="5.4" cy="3" r="1.8"/><circle cx="18.6" cy="3" r="1.8"/></g>' +
    '<rect x="11" y="8.6" width="2" height="4.6" fill="#8a8f8a"/>' +
    '<path d="M5.4,17.4q0,-4.4 6.6,-4.4t6.6,4.4q0,2.6 -6.6,2.6t-6.6,-2.6z" fill="#f0c33a"/>' +
    '<path d="M5.8,15h12.4v2.2H5.8z" fill="#33302c"/>' +
    '<path d="M7.4,19.6q4.6,1 9.2,0q-1.6,1.4 -4.6,1.4t-4.6,-1.4z" fill="#c89a14"/>' +
    '<g stroke="#5f5a4a" stroke-width="1.2" fill="none"><path d="M18.6,19q2.4,2.6 5,2.6"/></g>' +
    '<g stroke="#a8ccd8" stroke-width="0.9" opacity=".5" fill="none"><path d="M0.6,21.6q2.4,-1 4.8,0"/></g>',

  /** 31か月の占領と、奪還のための更地(ハガニア)。**残った壁が一枚。** */
  occupation:
    '<rect x="0" y="0" width="24" height="17.6" fill="#bfd8e4"/>' +
    '<rect x="0" y="17.6" width="24" height="6.4" fill="#a89e84"/>' +
    '<path d="M0,17.6q6,-1.2 12,-0.2q6,1 12,-0.8v1.8H0z" fill="#b8ae98"/>' +
    '<ellipse cx="11.6" cy="21.6" rx="9.4" ry="2" fill="#000" opacity=".16"/>' +
    '<path d="M4,21.6V5.6l3.4,-2.2V0.6l3.2,2.8l2.6,-1.6l0.6,3.6l4,-1.4v17.6z" fill="#b8985f"/>' +
    '<path d="M4,21.6V5.6l3.4,-2.2V0.6l3.2,2.8V21.6z" fill="#d0b276"/>' +
    '<path d="M7.6,21.6v-5.8a3.2,3.2 0 0 1 6.4,0v5.8z" fill="#33302c"/>' +
    '<path d="M7.6,21.6v-5.8a3.2,3.2 0 0 1 3.2,-3.2v9z" fill="#463f34"/>' +
    '<g stroke="#9a7c48" stroke-width="0.9" opacity=".9" fill="none"><path d="M4,9.4h13.8M4,13.6h3.6M14,13.6h3.8M15.4,17.6h2.4M4,17.6h3.6"/></g>' +
    '<g fill="#a89e84"><path d="M18.6,21.6l3.6,-1.6l1.2,1.6z"/><path d="M0.4,21.6l2.4,-1.8l1.2,1.8z"/><rect x="19" y="17.4" width="3.2" height="2.4" rx="0.6" transform="rotate(18 20.6 18.6)"/></g>' +
    '<g fill="#8a9a62"><path d="M2.4,21.2q1,-2.2 2.6,-0.4q-1.4,0.8 -2.6,0.4z"/><path d="M20.4,22q1.2,-2.4 2.8,-0.4q-1.4,0.8 -2.8,0.4z"/></g>',

  /** フィジー最初の首都(レブカ)。**木造の商館が海に向いて並んでいる。** */
  oldport:
    '<rect x="0" y="18.6" width="24" height="5.4" fill="#4aa8c0"/>' +
    '<rect x="0" y="18.6" width="24" height="1.2" fill="#84dcd0" opacity=".7"/>' +
    '<rect x="0" y="16.6" width="24" height="2.2" fill="#b8a482"/>' +
    '<rect x="1.6" y="8" width="13.6" height="8.6" fill="#e8dcc0"/>' +
    '<path d="M0.4,8h16l-1.8,-3.4H2.2z" fill="#8a4a30"/>' +
    '<rect x="0.4" y="8" width="16" height="1" fill="#6b3722"/>' +
    '<g fill="#5f7f96"><rect x="3" y="9.6" width="2.4" height="3"/><rect x="7.2" y="9.6" width="2.4" height="3"/><rect x="11.4" y="9.6" width="2.4" height="3"/></g>' +
    '<path d="M0.6,14h16.4v1.2H0.6z" fill="#c8452f"/>' +
    '<g fill="#8a7454"><rect x="2.4" y="15.2" width="1.2" height="1.4"/><rect x="8" y="15.2" width="1.2" height="1.4"/><rect x="13.6" y="15.2" width="1.2" height="1.4"/></g>' +
    '<rect x="6.4" y="12.8" width="3" height="3.8" fill="#6b5330"/>' +
    '<g fill="#5f4c33"><rect x="17.4" y="16.4" width="1.6" height="6"/><rect x="20.4" y="16.4" width="1.6" height="6.6"/><rect x="23" y="16.4" width="1.4" height="5.4"/></g>' +
    '<rect x="16.6" y="14.6" width="7.4" height="2" fill="#8a7454"/>' +
    '<path d="M17.4,21q3,1.4 6,0q-1,2 -3,2t-3,-2z" fill="#3f6f9a"/>',

  /** 露天掘りの銅山(アラワ)。**段が下へ下へと降りていく。** */
  openpitmine:
    '<rect x="0" y="0" width="24" height="6" fill="#bfd8dc"/>' +
    '<path d="M0,6q5,-2.6 12,-2q7,0.6 12,-1.4v4H0z" fill="#2d5f3f"/>' +
    '<rect x="0" y="6" width="24" height="18" fill="#a85a3a"/>' +
    '<path d="M0,7.4q6,4 12,4t12,-4v2.6q-6,4.4 -12,4.4T0,10z" fill="#b8674a"/>' +
    '<path d="M2,10.6q4.4,3.4 10,3.4t10,-3.4v2.6q-4.6,3.6 -10,3.6t-10,-3.6z" fill="#9a4f32"/>' +
    '<path d="M4,14.4q3.6,3 8,3t8,-3v2.6q-3.6,3 -8,3t-8,-3z" fill="#b8674a"/>' +
    '<path d="M6,18.2q2.8,2.4 6,2.4t6,-2.4v2.4q-2.8,2.4 -6,2.4t-6,-2.4z" fill="#8a4530"/>' +
    '<ellipse cx="12" cy="21.6" rx="3.4" ry="1.6" fill="#5f6f4a"/>' +
    '<g stroke="#7f3f28" stroke-width="0.9" opacity=".7" fill="none"><path d="M4.4,8l2.6,4M19.6,8l-2.6,4M12,14v3"/></g>' +
    '<g><rect x="16.4" y="8.4" width="5" height="2.6" fill="#c8452f"/><g fill="#33302c"><circle cx="17.6" cy="11.2" r="1.1"/><circle cx="20.4" cy="11.2" r="1.1"/></g></g>',

  /** 燐鉱石の積出腕(ヤレン・バナバ)。**海に張り出し、船に落とす。** */
  phosphate:
    '<rect x="0" y="15.4" width="24" height="8.6" fill="#3f88a0"/>' +
    '<rect x="0" y="15.4" width="24" height="1.2" fill="#a8d8e4" opacity=".7"/>' +
    '<path d="M0,10.6h6.4v5H0z" fill="#ded6c4"/>' +
    '<path d="M0,10.6h6.4v1.4H0z" fill="#c2b89e"/>' +
    '<g fill="#b0a68e"><path d="M1,10.6L2.4,5.4L4,10.6z"/><path d="M4.4,10.6L5.4,7L6.4,10.6z"/></g>' +
    '<path d="M2.4,12L21.6,3.4" stroke="#8a8f8a" stroke-width="2.2" fill="none"/>' +
    '<path d="M2.4,12L21.6,3.4" stroke="#b0b4b0" stroke-width="0.8" fill="none"/>' +
    '<g stroke="#8a8f8a" stroke-width="1" fill="none"><path d="M6,10.2v2.6M10,8.4v2.6M14,6.6v2.6M18,4.8v2.6"/></g>' +
    '<rect x="18.4" y="3" width="4.4" height="3" rx="0.8" fill="#5f6258"/>' +
    '<path d="M19.6,6q0.4,4 1.2,7.4" stroke="#efe8d4" stroke-width="2.4" fill="none" opacity=".9"/>' +
    '<g fill="#efe8d4" opacity=".9"><circle cx="20.4" cy="9" r="0.9"/><circle cx="21.4" cy="12" r="0.8"/></g>' +
    '<path d="M14.6,15.4h9.4v3.4q0,1.4 -2,1.4h-5.4q-2,0 -2,-1.6z" fill="#8a4a30"/>' +
    '<path d="M15.6,15.4h8.4l-0.6,2h-7.2z" fill="#cfc7b0"/>',

  /** 隆起した珊瑚の岩(アロフィ)。**波が下だけを抉っていった。** */
  raisedatoll:
    '<rect x="0" y="16.4" width="24" height="7.6" fill="#4aa8c0"/>' +
    '<rect x="0" y="16.4" width="24" height="1.2" fill="#84dcd0" opacity=".8"/>' +
    '<path d="M2,17q2.4,-9.4 10,-9.4t10,9.4q-3.4,2 -10,2t-10,-2z" fill="#cfc7b0"/>' +
    '<path d="M2,17q2.4,-9.4 10,-9.4V19q-6.6,0 -10,-2z" fill="#ded6c0"/>' +
    '<path d="M3.4,12.4q3.6,-4.8 8.6,-4.8q5,0 8.6,4.8q-4,-2 -8.6,-2t-8.6,2z" fill="#3f8f52"/>' +
    '<path d="M4.4,10.4q3.2,-3.4 7.6,-3.4q4.4,0 7.6,3.4q-3.6,-1.4 -7.6,-1.4t-7.6,1.4z" fill="#4f9a5a"/>' +
    '<g stroke="#a89e84" stroke-width="0.9" opacity=".85" fill="none"><path d="M6.6,17.4l0.6,-5M12,18.6V11.4M17.4,17.4l-0.8,-5"/></g>' +
    '<path d="M2,17q4.4,2.4 10,2.4t10,-2.4q-1.4,3 -10,3t-10,-3z" fill="#a89e84"/>' +
    '<g fill="#eef6f8" opacity=".85"><path d="M0.4,19.6q2.6,-1.6 5,0.4q-2.6,1 -5,-0.4z"/><path d="M19,20.6q2.4,-1.6 4.8,0.4q-2.4,1 -4.8,-0.4z"/></g>' +
    '<g stroke="#bfe8f4" stroke-width="0.9" opacity=".6" fill="none"><path d="M6,22.6q3,-1.2 6,0"/></g>',

  /** 海面が追いついてくる(マジュロ・フナフティ)。**家の下半分が、もう水。** */
  risingsea:
    '<rect x="0" y="0" width="24" height="13" fill="#a8bcc4"/>' +
    '<path d="M4.4,13.4V6.6h13.2v6.8z" fill="#e8e0cc"/>' +
    '<path d="M2.6,6.6h16.8L15.4,1.6H6.6z" fill="#c8452f"/>' +
    '<rect x="2.6" y="6.6" width="16.8" height="1" fill="#8a3a2c"/>' +
    '<g fill="#5f7f96"><rect x="6" y="8.4" width="3.4" height="3.4"/><rect x="13" y="8.4" width="3.4" height="3.4"/></g>' +
    '<rect x="0" y="13" width="24" height="11" fill="#4f8f9a"/>' +
    '<rect x="0" y="12.6" width="24" height="1.4" fill="#a8dce4" opacity=".9"/>' +
    '<path d="M4.4,13V21h13.2v-8z" fill="#3f7f8a" opacity=".55"/>' +
    '<g fill="#8fc4cc" opacity=".55"><rect x="6" y="13.4" width="3.4" height="2.4"/><rect x="13" y="13.4" width="3.4" height="2.4"/></g>' +
    '<g stroke="#bfe8f4" stroke-width="1.1" opacity=".75" fill="none" stroke-linecap="round"><path d="M1,16.4q2.4,-1.2 4.8,0M17,17.6q2.4,-1.2 4.8,0M7,20.4q2.6,-1.2 5.2,0M0.6,21.6q2.6,-1.2 5.2,0M16.4,22q2.6,-1.2 5.2,0"/></g>' +
    '<g fill="#b0a486"><ellipse cx="20.6" cy="14.6" rx="3" ry="1.6"/><ellipse cx="3" cy="15.4" rx="2.6" ry="1.4"/></g>',

  /** サメの聖域(コロール)。**フランスほどの広さがある。** */
  sharktourism:
    '<rect x="0" y="3.4" width="24" height="20.6" fill="#57c0c0"/>' +
    '<rect x="0" y="3.4" width="24" height="1.4" fill="#bff0ea" opacity=".9"/>' +
    '<rect x="0" y="16.4" width="24" height="7.6" fill="#3f9aa8"/>' +
    '<path d="M0.4,15.4q3.6,-4.6 10.6,-4.8q7.2,-0.2 10.8,2.6q-3,3.8 -10.6,4.6q-7.6,0.8 -10.8,-2.4z" fill="#3a4c58"/>' +
    '<path d="M1.4,17q3.8,1.6 9.4,1q5.6,-0.6 9.2,-2.6q-3,3 -9.6,3.8q-6.6,0.8 -9,-2.2z" fill="#a8bcc4"/>' +
    '<path d="M10.8,11.2L12.6,3.4l3.6,7.8z" fill="#2f4048"/>' +
    '<path d="M5.4,17.6l-1.2,3.8l3.8,-2.8z" fill="#2f4048"/>' +
    '<path d="M21.4,13.2L24,9v8.4z" fill="#2f4048"/>' +
    '<path d="M21.4,13.2L24,9l-0.8,4.6z" fill="#4a606e"/>' +
    '<circle cx="4" cy="14.4" r="1.1" fill="#f6efe2"/>' +
    '<circle cx="4" cy="14.4" r="0.6" fill="#1f2b34"/>' +
    '<path d="M0.6,16.4q2.2,1 4.8,0.8" stroke="#1f2b34" stroke-width="1" fill="none"/>' +
    '<g stroke="#e8fafa" stroke-width="0.9" opacity=".7" fill="none"><path d="M2,7.4q2.4,-1 4.8,0M15,6.4q2.4,-1 4.8,0"/></g>',

  /** 台風が三か国の軍艦を一度に沈めた(アピア)。**戦闘ではなかった。** */
  shipwreck:
    '<rect x="0" y="0" width="24" height="10" fill="#6f7f8c"/>' +
    '<rect x="0" y="10" width="24" height="14" fill="#456a7c"/>' +
    '<rect x="0" y="15.4" width="24" height="8.6" fill="#527f90"/>' +
    '<g transform="rotate(-26 12 15)">' +
    '<path d="M3,16.6h17.4q-1.4,3.4 -5.6,3.4H8.2q-3.8,0 -5.2,-3.4z" fill="#5f4326"/>' +
    '<path d="M3,16.6h17.4v1.2H3.2z" fill="#43301c"/>' +
    '<path d="M11.4,16.6V3" stroke="#4a3520" stroke-width="1.6" fill="none"/>' +
    '<path d="M16.6,16.6V6.4" stroke="#4a3520" stroke-width="1.3" fill="none"/>' +
    '<path d="M12.2,4.4q3.6,1.6 3.4,4.4q-2,-1 -3.4,-0.8z" fill="#cfc7b0" opacity=".85"/>' +
    '<path d="M6.4,9.6h9.4v1h-9.4z" fill="#4a3520"/>' +
    '</g>' +
    '<g fill="#eef6f8" opacity=".9"><path d="M0,19.4q4.4,-4.4 9,-1q-5,0.6 -9,3z"/><path d="M13,21.4q5.4,-4 10.8,-0.4q-5.6,-0.4 -10.8,2z"/><path d="M4,23q4.4,-2.6 9,-0.4q-4.6,0.6 -9,1.4z"/></g>' +
    '<g fill="#eef6f8" opacity=".7"><circle cx="3.4" cy="15" r="1.4"/><circle cx="20" cy="16.4" r="1.2"/></g>' +
    '<g stroke="#8f9aa4" stroke-width="0.9" opacity=".6" fill="none"><path d="M1,4q2.6,-1.2 5.2,0M16,2.6q2.6,-1.2 5.2,0"/></g>',

  /** 石の貨幣(ヤップ)。**重すぎて運べないので、所有権は口約束だけで移る。** */
  stonemoney:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#a89474"/>' +
    '<path d="M0.6,4.4L23.4,2.6" stroke="#6b5330" stroke-width="1.8" stroke-linecap="round" fill="none"/>' +
    '<circle cx="12" cy="13" r="9.6" fill="#cfc7b0"/>' +
    '<circle cx="12" cy="13" r="9.6" fill="none" stroke="#a89e84" stroke-width="1.4"/>' +
    '<circle cx="10.6" cy="11.6" r="7" fill="none" stroke="#b8ae94" stroke-width="1"/>' +
    '<circle cx="12" cy="13" r="2.6" fill="#8a8068"/>' +
    '<circle cx="12" cy="13" r="1.8" fill="#7a6f58"/>' +
    '<path d="M11.1,3.6h1.8v7.4h-1.8z" fill="#6b5330"/>' +
    '<g fill="#b8ae94" opacity=".8"><path d="M5.6,8.4q2.6,-2.6 6,-3M17.4,16.6q-1.6,2.6 -4.4,3.6"/></g>' +
    '<g stroke="#a89e84" stroke-width="0.8" opacity=".7" fill="none"><path d="M4.6,15.4q3.4,1.6 7,1.4M19,10q-2.4,-2.6 -5.6,-3.4"/></g>' +
    '<g fill="#8a9a62"><path d="M2.4,22.2q1.2,-2.4 3,-0.6q-1.4,0.8 -3,0.6z"/><path d="M19.4,22.4q1.4,-2.4 3.2,-0.4q-1.6,0.8 -3.2,0.4z"/></g>',

  /** 今世紀いちばん大きな音のすぐそば(パンガイ)。**壁のような波。** */
  tsunami:
    '<rect x="0" y="0" width="24" height="24" fill="#cfe4f0"/>' +
    '<rect x="0" y="18.6" width="24" height="5.4" fill="#c2b494"/>' +
    '<path d="M0,18.6q6,-1.4 12,-0.4q6,1 12,-1v2H0z" fill="#b0a486"/>' +
    '<g fill="#4f7f6a"><path d="M2,18.4q1.4,-3.6 3,-4.2q-0.4,2.6 -0.8,4.2z"/><path d="M21.4,19q-1.2,-3.4 -2.8,-4q0.4,2.4 0.6,4z"/></g>' +
    '<path d="M24,22q-10,1.4 -16.4,-3.6Q1,13.2 2,6.2Q2.8,1 8.6,-0.4q-3.6,4.4 -1.8,9.2q1.8,4.8 7.2,7q5.4,2.2 10,1.2z" fill="#1f6f8c"/>' +
    '<path d="M24,17.4q-6.8,0.8 -11.4,-2Q7.6,12.4 7,6.4q-0.4,-3.8 2.4,-6.4q-1.4,4 0.4,7.2q1.8,3.2 6,5q4.2,1.8 8.2,1.4z" fill="#3f9ab0"/>' +
    '<path d="M8.6,-0.4Q2.4,1.4 1.6,7.4q4,-5.4 10.4,-4q-2.8,-1.8 -3.4,-3.8z" fill="#f2fafc"/>' +
    '<path d="M24,22q-8,1 -14,-2.2q6.8,-0.8 10.8,0q1.6,0.4 3.2,0.2z" fill="#f2fafc"/>' +
    '<g fill="#f2fafc" opacity=".9"><circle cx="5.4" cy="6" r="1.8"/><circle cx="3.4" cy="11" r="1.3"/><circle cx="8.6" cy="2.6" r="1.2"/></g>',

  /** マグロの缶詰(パゴパゴ)。**港が欲しかったのは軍で、雇ったのは缶詰工場。** */
  tunacannery:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#8a8f8a"/>' +
    '<path d="M3.4,22.4V9.6h17.2v12.8z" fill="#b8bcc0"/>' +
    '<path d="M3.4,9.6h17.2v1.6H3.4z" fill="#d8dce0"/>' +
    '<ellipse cx="12" cy="9.6" rx="8.6" ry="2.4" fill="#cfd4d8"/>' +
    '<ellipse cx="12" cy="9.6" rx="6.4" ry="1.6" fill="#9aa0a4"/>' +
    '<path d="M3.4,13.4h17.2v6.4H3.4z" fill="#c8452f"/>' +
    '<g fill="#f5b31c"><rect x="3.4" y="13.4" width="17.2" height="1.2"/><rect x="3.4" y="18.6" width="17.2" height="1.2"/></g>' +
    '<path d="M6,17.6q2.4,-2.6 6,-2.6q3.6,0 5,2q-2.6,2 -6,2q-3.4,0 -5,-1.4z" fill="#3f6f8a"/>' +
    '<path d="M6,17.6q2.4,-2.6 6,-2.6q3.6,0 5,2q-3.4,-0.8 -6,-0.4q-2.6,0.4 -5,1z" fill="#5f9ab0"/>' +
    '<path d="M17,17l2.4,-2v4z" fill="#3f6f8a"/>' +
    '<circle cx="8" cy="16.8" r="0.7" fill="#1f2b34"/>' +
    '<g fill="#8a8f8a"><rect x="1.6" y="20.4" width="20.8" height="2" rx="0.8"/></g>',

  /** いまも噴火し続けている火山(ココポ)。 */
  volcano:
    '<rect x="0" y="0" width="24" height="24" fill="#9a9188"/>' +
    '<rect x="0" y="18.6" width="24" height="5.4" fill="#b0a698"/>' +
    '<g fill="#8a8074" opacity=".75"><ellipse cx="6" cy="3" rx="8" ry="2.6"/><ellipse cx="19" cy="2" rx="7" ry="2.2"/></g>' +
    '<path d="M0,19.4L8.4,4.6h2.4l3.4,4.6L20,19.4z" fill="#4f463c"/>' +
    '<path d="M0,19.4L8.4,4.6h2.4v14.8z" fill="#5f5648"/>' +
    '<path d="M8.4,4.6h2.4l0.6,1.6H8z" fill="#6b6154"/>' +
    '<path d="M8,6.4q1.6,-4.4 3.4,-5q-0.4,3 1,5.4q-2.4,-1.4 -4.4,-0.4z" fill="#c8622f"/>' +
    '<path d="M8.6,10.4q0.8,3 -0.4,6q2.4,-2.6 3.4,-6.6q-1.6,1.4 -3,0.6z" fill="#e8443f"/>' +
    '<g fill="#c8c2b4" opacity=".9"><ellipse cx="10.6" cy="2.6" rx="4.4" ry="2.4"/><ellipse cx="15" cy="5.4" rx="3.4" ry="2"/></g>' +
    '<g fill="#8a8074"><ellipse cx="4" cy="21" rx="4.4" ry="1.4"/><ellipse cx="18" cy="21.6" rx="5" ry="1.4"/></g>' +
    '<g fill="#3f3a30"><circle cx="14.6" cy="12" r="1"/><circle cx="17.4" cy="15.4" r="0.8"/><circle cx="4" cy="14.4" r="0.9"/></g>',

  /** 沈船に潜る(カビエン)。**戦時の処刑地が、いま指折り澄んだ海流への入り口。** */
  wreckdive:
    '<rect x="0" y="0" width="24" height="24" fill="#57bcd0"/>' +
    '<rect x="0" y="11" width="24" height="13" fill="#3f9ab8"/>' +
    '<rect x="0" y="18.4" width="24" height="5.6" fill="#2f7f9a"/>' +
    '<g fill="#bfeaf2" opacity=".22"><path d="M4,0L0,24h3.4L9.4,0z"/><path d="M20,0l4,24h-3.4L14.6,0z"/></g>' +
    '<path d="M1.6,24q3.4,-5.4 11.4,-6q8,-0.6 11,2.4V24z" fill="#1a5872"/>' +
    '<g fill="#124257"><rect x="13.4" y="19" width="5.4" height="2.6" rx="0.8" transform="rotate(-10 16 20.3)"/><rect x="20" y="17.8" width="3.4" height="2.2" transform="rotate(-10 21.7 18.9)"/><path d="M6.4,21.6L2.6,17.6" stroke="#124257" stroke-width="1.8" fill="none"/></g>' +
    '<g transform="rotate(-14 11 10)">' +
    '<ellipse cx="10" cy="10" rx="6.6" ry="3.1" fill="#12323f"/>' +
    '<circle cx="16.2" cy="8.6" r="3" fill="#12323f"/>' +
    '<circle cx="16.8" cy="8.2" r="1.5" fill="#9ae4f4"/>' +
    '<rect x="5" y="6.2" width="5.4" height="3.4" rx="1.2" fill="#2f5f70"/>' +
    '<g stroke="#12323f" stroke-width="2" stroke-linecap="round" fill="none"><path d="M4,11.4L0.4,14M5.4,12.8L1.6,15.6M12.8,12.4l-2.4,3.6"/></g>' +
    '</g>' +
    '<g fill="#f2fbfd" opacity=".95"><circle cx="18.4" cy="5.4" r="1.2"/><circle cx="19.8" cy="2.8" r="1.7"/><circle cx="17.4" cy="0.8" r="1.1"/></g>' +
    '<g fill="#f5d878"><path d="M2,5.4q1.6,-1 3.2,0q-1.6,1 -3.2,0zM2,5.4L0.6,4.4v2z"/><path d="M5.4,8q1.6,-1 3.2,0q-1.6,1 -3.2,0zM5.4,8L4,7v2z"/></g>',

};
