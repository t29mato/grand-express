/**
 * スイスの都市イラスト。
 *
 * `SWITZERLAND_MARKS` は 24×24 の座標系に描くシンボル(35種)、
 * `SWITZERLAND_BG` は 400×210 の座標系に描く背景シーン(30種)。
 * いずれもSVG断片の文字列で、動きは含めない(アニメーションはReact側で重ねる)。
 *
 * ## この盤面で描くもの・描かないもの
 *
 * 芯は**「永世中立とは、丸腰の平和ではなく、国土そのものを要塞に変えて守り抜く
 * 武装中立だった」**。したがって絵の主題は風景ではなく**人がつくり変えた国土**に置く。
 * トンネルの坑口、爆破装薬を仕掛けた鉄橋、岩肌に紛れた銃眼、国境の遮断機、
 * 段になった葡萄畑、落石防護網、雪よけの石造ギャラリー——山や湖はその背景にある。
 *
 * **時計・チョコレート・観光絵葉書の図像は使わない。**文章の担当が意図的に
 * 避けているので、絵で持ち込むと44都市ぶんの内容が観光案内に化ける。
 * 牛・花・尖った峰だけの背景も作らない。
 *
 * 盤面をひとつながりに見せる通し要素として、**赤い車両と線路**を複数の背景に置く
 * (鉄道が山を貫いている国であることが、盤面を通して見えるようにするため)。
 *
 * ## 色
 *
 * 他の盤面と揃える。空 #8fc4e8〜#cfe4f0、白・顔 #f6efe2、強調 #f5b31c/#e8443f/#5b8fe8。
 * スイスらしさは**鉄道の赤 #c8102e、岩肌の青灰 #7f8590、氷河の雪 #f4f8fb、
 * 樅の濃緑 #2f5f3f、漆喰の生成り #eae4d6、木造の焼けた茶 #8a5a2c、
 * コンクリート要塞の灰 #9aa0a0** で出す。
 *
 * ## 描くときに守ること
 *
 * - **中央25%(x=151〜249 / y=54〜152)は都市シンボルに隠れて見えない。**
 *   主役は左右3分の1か y>170 の手前に置く。
 * - `sky()` の第3引数(次に来る塗りの開始y)を必ず渡す。渡し忘れると空と地面の
 *   あいだが横一文字に透ける。実測は `scripts/check-city-backgrounds.mjs`。
 * - `Math.random()` を使わない(抽出時に2回評価して一致を検査している)。
 *
 * 鍵は `cities.mjs` の `mark` / `bg` と一対一。増やすときは両方を揃えること。
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
 * 空。**第3引数 `to` に「次に来る塗りの開始y」を渡すこと。**
 * 既定の118はすぐ下に地面が来る場合の値でしかない。
 */
function sky(top, bottom, to = 118) {
  // `to` が境界の78以下なら2色目の見える余地が無い。高さ0の <rect> を出さない。
  return band(0, 84, top) + (to > 78 ? band(78, to - 78, bottom) : "");
}

/** 地面(下端まで塗り切る)。 */
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

function clouds(cx, cy, scale = 1, fill = "#f6efe2") {
  const e = (dx, rx, ry) =>
    `<ellipse cx="${r1(cx + dx * scale)}" cy="${cy}" rx="${r1(rx * scale)}" ry="${r1(ry * scale)}"/>`;
  return `<g opacity=".8" fill="${fill}">${e(0, 18, 7)}${e(-10, 11, 5.5)}${e(11, 13, 5.5)}</g>`;
}

/** 人。20px前後。腕は `arm()` で足して、何をしているかを出す。 */
function person(x, base, h, shirt, skin = "#e0b48a") {
  const hd = r1(h * 0.19);
  const top = r1(base - h + hd * 1.7);
  return (
    `<g><rect x="${r1(x - h * 0.09)}" y="${r1(base - h * 0.4)}" width="${r1(h * 0.08)}" height="${r1(h * 0.4)}" fill="#3f3428"/>` +
    `<rect x="${r1(x + h * 0.02)}" y="${r1(base - h * 0.4)}" width="${r1(h * 0.08)}" height="${r1(h * 0.4)}" fill="#3f3428"/>` +
    `<path d="M${r1(x - h * 0.16)},${top}h${r1(h * 0.32)}l${r1(h * 0.03)},${r1(h * 0.42)}h${r1(-h * 0.38)}z" fill="${shirt}"/>` +
    `<circle cx="${x}" cy="${r1(top - hd * 0.75)}" r="${hd}" fill="${skin}"/></g>`
  );
}

function arm(x, y, dx, dy, color = "#e0b48a", w = 3) {
  return `<path d="M${x},${y}l${dx},${dy}" stroke="${color}" stroke-width="${w}" stroke-linecap="round" fill="none"/>`;
}

/** 遠景のなだらかな丘(前アルプス)。 */
function hills(y, fill, count = 4) {
  const parts = [];
  for (let i = 0; i < count; i++) {
    const cx = 40 + (i * W) / count;
    parts.push(`<path d="M${cx - 74},${y}c22,-30 52,-30 74,0z" fill="${fill}"/>`);
  }
  return `<g opacity=".9">${parts.join("")}</g>`;
}

/**
 * アルプスの峰。**尖った三角ひとつでは絵葉書になる**ので、
 * 陰の面・ぎざぎざの雪線・岩溝の3つを必ず載せて岩の塊として読ませる。
 */
function peakMt(cx, base, h, w, rock = "#7f8590", dark = "#616873", snowF = 0.42) {
  const L = r1(cx - w / 2);
  const R = r1(cx + w / 2);
  const top = r1(base - h);
  const sy = r1(base - h * (1 - snowF));
  const sl = r1(cx - (w / 2) * snowF);
  const sr = r1(cx + (w / 2) * snowF);
  const u = r1((sr - sl) / 4);
  return (
    `<path d="M${L},${base}L${cx},${top}L${R},${base}z" fill="${rock}"/>` +
    `<path d="M${cx},${top}L${R},${base}L${r1(cx + w * 0.06)},${base}z" fill="${dark}"/>` +
    `<path d="M${cx},${top}L${sl},${sy}l${u},-4l${u},3l${u},-5l${u},6z" fill="#f4f8fb"/>` +
    `<g stroke="${dark}" stroke-width="1.4" opacity=".7" fill="none">` +
    `<path d="M${r1(cx - w * 0.18)},${r1(base - h * 0.34)}l${r1(-w * 0.08)},${r1(h * 0.24)}` +
    `M${r1(cx - w * 0.3)},${r1(base - h * 0.16)}l${r1(-w * 0.05)},${r1(h * 0.1)}"/></g>`
  );
}

/** 樅。段を3つにして、遠景でも樅と分かる輪郭にする。 */
function fir(x, base, h, fill = "#2f5f3f") {
  const w = r1(h * 0.5);
  return (
    `<rect x="${r1(x - 1.6)}" y="${r1(base - 5)}" width="3.2" height="5" fill="#5a4630"/>` +
    `<path d="M${r1(x - w / 2)},${r1(base - 3)}L${x},${r1(base - h * 0.66)}L${r1(x + w / 2)},${r1(base - 3)}z" fill="${fill}"/>` +
    `<path d="M${r1(x - w / 2.4)},${r1(base - h * 0.42)}L${x},${r1(base - h * 0.86)}L${r1(x + w / 2.4)},${r1(base - h * 0.42)}z" fill="${fill}"/>` +
    `<path d="M${r1(x - w / 3.6)},${r1(base - h * 0.7)}L${x},${r1(base - h)}L${r1(x + w / 3.6)},${r1(base - h * 0.7)}z" fill="${fill}"/>`
  );
}

/** 落葉樹(栗・菩提樹)。南の谷と町の広場に使う。 */
function roundTree(x, base, r, crown = "#3f8f4f", trunk = "#6b5330") {
  const th = r1(r * 1.2);
  return (
    `<rect x="${r1(x - r * 0.16)}" y="${r1(base - th - r * 0.3)}" width="${r1(r * 0.32)}" height="${r1(th + r * 0.3)}" fill="${trunk}"/>` +
    `<circle cx="${x}" cy="${r1(base - th - r * 0.55)}" r="${r}" fill="${crown}"/>` +
    `<circle cx="${r1(x - r * 0.5)}" cy="${r1(base - th - r * 0.2)}" r="${r1(r * 0.62)}" fill="${crown}"/>` +
    `<circle cx="${r1(x + r * 0.52)}" cy="${r1(base - th - r * 0.25)}" r="${r1(r * 0.58)}" fill="${crown}"/>`
  );
}

/** 水面の帯とさざ波。 */
function lake(y, h, top = "#3f7f9f", bot = "#58a0bc") {
  return (
    band(y, r1(h * 0.55), top) +
    band(r1(y + h * 0.55), r1(h * 0.45), bot) +
    `<g stroke="#bfe0f0" stroke-width="2.2" opacity=".6" fill="none">` +
    `<path d="M18,${r1(y + h * 0.2)}h56M276,${r1(y + h * 0.16)}h84M8,${r1(y + h * 0.55)}h44M300,${r1(y + h * 0.6)}h72M84,${r1(y + h * 0.82)}h60"/></g>`
  );
}

/**
 * 線路(バラスト・枕木・レール)。この盤面の通し要素。
 * `y` はレール面。
 */
function track(y, x0 = 0, x1 = W) {
  const ties = [];
  for (let x = x0 + 3; x < x1 - 4; x += 11) {
    ties.push(`<rect x="${r1(x)}" y="${r1(y - 1.5)}" width="7" height="4.5" fill="#6b5330"/>`);
  }
  return (
    `<rect x="${x0}" y="${r1(y - 4)}" width="${r1(x1 - x0)}" height="9" fill="#9a9384"/>` +
    `<g>${ties.join("")}</g>` +
    `<rect x="${x0}" y="${r1(y - 2.6)}" width="${r1(x1 - x0)}" height="1.6" fill="#5f6b72"/>` +
    `<rect x="${x0}" y="${r1(y + 1.6)}" width="${r1(x1 - x0)}" height="1.6" fill="#8a949a"/>`
  );
}

/** 赤い電車の車両(横向き)。`base` は車輪の接地線。 */
function railcar(x, base, len, h = 20, body = "#c8102e") {
  const top = r1(base - h);
  const n = Math.max(2, Math.floor((len - 14) / 12));
  const win = [];
  for (let i = 0; i < n; i++) {
    win.push(`<rect x="${r1(x + 9 + i * 12)}" y="${r1(top + 4.5)}" width="8" height="7" fill="#cfe4f0"/>`);
  }
  return (
    `<rect x="${x}" y="${top}" width="${len}" height="${r1(h - 5)}" rx="3" fill="${body}"/>` +
    `<rect x="${x}" y="${top}" width="${len}" height="2.6" rx="1.3" fill="#f2ede0" opacity=".55"/>` +
    `<g>${win.join("")}</g>` +
    `<rect x="${r1(x + 1)}" y="${r1(base - 7)}" width="${r1(len - 2)}" height="3" fill="#4a4436"/>` +
    `<g fill="#3a3a3a"><circle cx="${r1(x + 9)}" cy="${r1(base - 2.4)}" r="2.6"/><circle cx="${r1(x + len - 9)}" cy="${r1(base - 2.4)}" r="2.6"/></g>` +
    `<rect x="${r1(x + len - 5)}" y="${r1(top + 5)}" width="3.4" height="3" rx="1" fill="#f5d06a"/>`
  );
}

/** 石積みのトンネル坑口。アーチの迫石まで描くと「掘った穴」に見える。 */
function portal(cx, base, w, h, stone = "#8a8272", inner = "#241f1c") {
  const rr = r1(w / 2);
  const L = r1(cx - rr);
  const R = r1(cx + rr);
  const spring = r1(base - h + rr);
  const vous = [];
  for (let k = 0; k <= 8; k++) {
    const a = Math.PI + (k * Math.PI) / 8;
    const x1 = r1(cx + rr * Math.cos(a));
    const y1 = r1(spring + rr * Math.sin(a));
    const x2 = r1(cx + (rr + 6) * Math.cos(a));
    const y2 = r1(spring + (rr + 6) * Math.sin(a));
    vous.push(`M${x1},${y1}L${x2},${y2}`);
  }
  return (
    `<path d="M${r1(L - 9)},${base}V${r1(base - h - 4)}h${r1(w + 18)}V${base}z" fill="${stone}"/>` +
    `<path d="M${r1(L - 9)},${r1(base - h - 4)}h${r1(w + 18)}v3h${r1(-w - 18)}z" fill="#6f6a5e"/>` +
    `<path d="M${L},${base}V${spring}A${rr},${rr} 0 0 1 ${R},${spring}V${base}z" fill="${inner}"/>` +
    `<path d="M${L},${base}V${spring}A${rr},${rr} 0 0 1 ${R},${spring}V${base}" stroke="#b8ae98" stroke-width="3" fill="none"/>` +
    `<g stroke="#6f6a5e" stroke-width="1.2" opacity=".8" fill="none"><path d="${vous.join("")}"/></g>`
  );
}

/** 石造の高架橋(アーチ列)。峡谷を渡す。 */
function viaduct(x0, x1, deckY, base, n, stone = "#a89e8c") {
  const span = r1((x1 - x0) / n);
  const parts = [`<rect x="${x0}" y="${deckY}" width="${r1(x1 - x0)}" height="9" fill="${stone}"/>`];
  parts.push(`<rect x="${x0}" y="${deckY}" width="${r1(x1 - x0)}" height="2.6" fill="#c2b9a2"/>`);
  for (let i = 0; i < n; i++) {
    const cx = r1(x0 + span * (i + 0.5));
    const rr = r1(span * 0.34);
    const pierY = r1(deckY + 9);
    parts.push(
      `<rect x="${r1(cx - span / 2 + 1)}" y="${pierY}" width="${r1(span - 2)}" height="${r1(base - pierY)}" fill="${stone}"/>`,
      `<path d="M${r1(cx - rr)},${base}V${r1(pierY + rr + 4)}A${rr},${rr} 0 0 1 ${r1(cx + rr)},${r1(pierY + rr + 4)}V${base}z" fill="#5f6b72" opacity=".85"/>`,
    );
  }
  return parts.join("");
}

/** 木造の農家。石を載せた寄棟屋根とバルコニー。 */
function chalet(x, top, w, base, wall = "#8a5a2c", roof = "#5a4a3c") {
  const h = base - top;
  const cx = r1(x + w / 2);
  const logs = [];
  for (let ly = top + 6; ly < base - 4; ly += 6) logs.push(`M${x},${r1(ly)}h${w}`);
  const stones = [];
  for (let i = 0; i < 5; i++) {
    stones.push(`<ellipse cx="${r1(x + 6 + (i * (w - 12)) / 4)}" cy="${r1(top - h * 0.16)}" rx="2.6" ry="1.6"/>`);
  }
  const rails = [];
  for (let i = 0; i < 7; i++) rails.push(`M${r1(x + 3 + (i * (w - 6)) / 6)},${r1(base - 16)}v7`);
  return (
    `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="${wall}"/>` +
    `<g stroke="#6b4423" stroke-width="1.3" opacity=".7" fill="none"><path d="${logs.join("")}"/></g>` +
    `<path d="M${r1(x - 9)},${top}L${cx},${r1(top - h * 0.34)}L${r1(x + w + 9)},${top}z" fill="${roof}"/>` +
    `<rect x="${r1(x - 9)}" y="${top}" width="${r1(w + 18)}" height="3.4" fill="#3f3a34"/>` +
    `<g fill="#8a8578">${stones.join("")}</g>` +
    `<rect x="${r1(x - 3)}" y="${r1(base - 17)}" width="${r1(w + 6)}" height="2.6" fill="#6b4423"/>` +
    `<g stroke="#6b4423" stroke-width="1.6" fill="none"><path d="${rails.join("")}"/></g>` +
    `<g fill="#3f5f76"><rect x="${r1(x + w * 0.2)}" y="${r1(top + h * 0.22)}" width="7" height="7"/>` +
    `<rect x="${r1(x + w * 0.62)}" y="${r1(top + h * 0.22)}" width="7" height="7"/></g>` +
    `<g fill="#c2453c"><rect x="${r1(x + w * 0.2 - 2.6)}" y="${r1(top + h * 0.22)}" width="2.6" height="7"/>` +
    `<rect x="${r1(x + w * 0.2 + 7)}" y="${r1(top + h * 0.22)}" width="2.6" height="7"/>` +
    `<rect x="${r1(x + w * 0.62 - 2.6)}" y="${r1(top + h * 0.22)}" width="2.6" height="7"/>` +
    `<rect x="${r1(x + w * 0.62 + 7)}" y="${r1(top + h * 0.22)}" width="2.6" height="7"/></g>`
  );
}

/** 漆喰の町家(旧市街)。切妻・鎧戸・一階の店。 */
function townHouse(x, top, w, base, wall = "#eae4d6", roof = "#b0503c") {
  const h = base - top;
  const cx = r1(x + w / 2);
  const parts = [
    `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="${wall}"/>`,
    `<path d="M${r1(x - 5)},${top}L${cx},${r1(top - h * 0.3)}L${r1(x + w + 5)},${top}z" fill="${roof}"/>`,
    `<rect x="${r1(x - 5)}" y="${top}" width="${r1(w + 10)}" height="2.6" fill="#8a3f30"/>`,
  ];
  const cols = Math.max(2, Math.floor(w / 18));
  for (let ry = top + 10; ry < base - 20; ry += 17) {
    for (let i = 0; i < cols; i++) {
      const wx = r1(x + 5 + (i * (w - 14)) / Math.max(1, cols - 1));
      parts.push(
        `<rect x="${wx}" y="${ry}" width="8" height="10" fill="#5f7f96"/>`,
        `<rect x="${r1(wx - 2.4)}" y="${ry}" width="2.4" height="10" fill="#4a6b52"/>`,
        `<rect x="${r1(wx + 8)}" y="${ry}" width="2.4" height="10" fill="#4a6b52"/>`,
      );
    }
  }
  parts.push(
    `<rect x="${x}" y="${r1(base - 15)}" width="${w}" height="15" fill="#d8d0be"/>`,
    `<path d="M${r1(x + w * 0.3)},${base}v-9a${r1(w * 0.2)},9 0 0 1 ${r1(w * 0.4)},0v9z" fill="#5a4630"/>`,
  );
  return parts.join("");
}

/** 教会の尖塔(鐘楼)。文字盤は描かない。 */
function spire(x, base, h, wall = "#eae4d6", roof = "#4a5568") {
  const w = r1(h * 0.26);
  return (
    `<rect x="${r1(x - w / 2)}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${wall}"/>` +
    `<path d="M${r1(x - w / 2 - 2.5)},${r1(base - h)}L${x},${r1(base - h - h * 0.4)}L${r1(x + w / 2 + 2.5)},${r1(base - h)}z" fill="${roof}"/>` +
    `<rect x="${r1(x - w / 2 - 2)}" y="${r1(base - h)}" width="${r1(w + 4)}" height="2.4" fill="#3a4453"/>` +
    `<g fill="#4a4436"><rect x="${r1(x - w * 0.26)}" y="${r1(base - h * 0.82)}" width="${r1(w * 0.52)}" height="${r1(h * 0.2)}" rx="${r1(w * 0.26)}"/></g>` +
    `<rect x="${r1(x - 0.7)}" y="${r1(base - h - h * 0.55)}" width="1.4" height="${r1(h * 0.16)}" fill="#f5b31c"/>`
  );
}

/** 岩壁。等間隔の格子にすると煉瓦塀に見えるので、斜めの面で明暗を割る。 */
function cliff(x, y, w, h, face = "#7f8590", dark = "#616873") {
  return (
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${face}"/>` +
    `<path d="M${x},${y}l${r1(w * 0.38)},0l${r1(-w * 0.16)},${h}h${r1(-w * 0.22)}z" fill="${dark}" opacity=".55"/>` +
    `<path d="M${r1(x + w * 0.62)},${y}l${r1(w * 0.38)},0v${h}l${r1(-w * 0.2)},0z" fill="#8f959e" opacity=".5"/>` +
    `<g stroke="#4f545c" stroke-width="1.3" opacity=".55" fill="none">` +
    `<path d="M${r1(x + w * 0.2)},${r1(y + h * 0.12)}l${r1(w * 0.07)},${r1(h * 0.3)}` +
    `M${r1(x + w * 0.55)},${r1(y + h * 0.3)}l${r1(-w * 0.05)},${r1(h * 0.34)}` +
    `M${r1(x + w * 0.8)},${r1(y + h * 0.08)}l${r1(w * 0.04)},${r1(h * 0.22)}"/></g>`
  );
}

/** 段畑の擁壁(ヴァレー・ティチーノの葡萄畑)。 */
function terraceWall(y, h, x0 = 0, x1 = W) {
  const step = Math.max(10, Math.round(h * 2.4));
  const joints = [];
  for (let x = x0 + step / 2; x < x1; x += step) joints.push(`M${r1(x)},${y}v${r1(h - 2)}`);
  return (
    `<rect x="${x0}" y="${y}" width="${r1(x1 - x0)}" height="${h}" fill="#cfc7b4"/>` +
    `<rect x="${x0}" y="${y}" width="${r1(x1 - x0)}" height="1.6" fill="#e0dbcd"/>` +
    `<rect x="${x0}" y="${r1(y + h - 2)}" width="${r1(x1 - x0)}" height="2" fill="#a2977f"/>` +
    `<g stroke="#b8ae98" stroke-width="1.3" fill="none"><path d="${joints.join("")}"/></g>`
  );
}

/** 葡萄の畝(支柱と針金)。 */
function vineRow(y, count, r, x0 = 6, x1 = 394) {
  const cy = r1(y - r - 2);
  const hw = r1(r * 2.1);
  const parts = [`<path d="M${x0},${cy}h${r1(x1 - x0)}" stroke="#8a8578" stroke-width="1.3" fill="none"/>`];
  for (let i = 0; i < count; i++) {
    const x = r1(x0 + (i * (x1 - x0)) / (count - 1));
    parts.push(
      `<rect x="${r1(x - 1.1)}" y="${r1(cy - r * 0.2)}" width="2.2" height="${r1(y - cy + r * 0.2)}" fill="#6b5330"/>`,
      `<path d="M${r1(x - hw)},${cy}c0,${r1(-r * 1.3)} ${r1(hw * 2)},${r1(-r * 1.3)} ${r1(hw * 2)},0c${r1(-hw * 0.4)},${r1(r * 0.55)} ${r1(-hw * 1.6)},${r1(r * 0.55)} ${r1(-hw * 2)},0z" fill="#4f8f3f"/>`,
    );
  }
  return parts.join("");
}

/** 落石防護網。**山を押さえつけている人工物**として、岩肌の上に重ねる。 */
function rockNet(x, y, w, h) {
  const d = [];
  for (let i = 0; i <= 6; i++) d.push(`M${r1(x + (i * w) / 6)},${y}l${r1(-w * 0.06)},${h}`);
  for (let j = 1; j <= 3; j++) d.push(`M${x},${r1(y + (j * h) / 4)}h${w}`);
  return (
    `<g stroke="#5f6b72" stroke-width="1" opacity=".6" fill="none"><path d="${d.join("")}"/></g>` +
    `<g fill="#4a5158">${[0, 1, 2].map((i) => `<rect x="${r1(x + (i * w) / 2 - 1)}" y="${r1(y - 3)}" width="2.4" height="5"/>`).join("")}</g>`
  );
}

/** 旗竿(スイス十字・州旗)。武装中立の盤面なので旗は要所に立てる。 */
function flagPole(x, base, h, fill = "#e8443f") {
  const top = r1(base - h);
  return (
    `<rect x="${r1(x - 0.9)}" y="${top}" width="1.8" height="${h}" fill="#8a8578"/>` +
    `<rect x="${r1(x + 1.8)}" y="${top}" width="13" height="9.5" fill="${fill}"/>` +
    `<g fill="#f6efe2"><rect x="${r1(x + 7)}" y="${r1(top + 2)}" width="2.6" height="5.5"/>` +
    `<rect x="${r1(x + 5.5)}" y="${r1(top + 3.5)}" width="5.6" height="2.5"/></g>`
  );
}

/** 街灯。夕景・夜景で層をひとつ増やす。 */
function lamp(x, base, h, glow = "#f5d06a") {
  return (
    `<rect x="${r1(x - 1)}" y="${r1(base - h)}" width="2" height="${h}" fill="#4a4f56"/>` +
    `<path d="M${r1(x - 4)},${r1(base - h)}h8l-1.6,-4h-4.8z" fill="#3a4046"/>` +
    `<circle cx="${x}" cy="${r1(base - h + 1)}" r="2.6" fill="${glow}"/>` +
    `<circle cx="${x}" cy="${r1(base - h + 1)}" r="6" fill="${glow}" opacity=".18"/>`
  );
}

/** 雪の吹きだまり(白い場面の起伏)。 */
function drifts(spec, fill = "#dde8f0") {
  return `<g fill="${fill}">${spec.map(([cx, cy, rx, ry]) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"/>`).join("")}</g>`;
}

// ---------------------------------------------------------------------------
// 背景シーン(400×210)
// ---------------------------------------------------------------------------

export const SWITZERLAND_BG = {
  /**
   * ベルン。連邦議事堂の前庭と朝市。
   * ドームは中央帯に入れず左へ寄せ、手前(y>170)に赤白の露店を置く。
   */
  capital:
    sky("#8fc4e8", "#dbe8f0", 150) +
    clouds(300, 30, 1.05) +
    clouds(60, 22, 0.8) +
    // 遠いアルプス(ベルナーオーバーラント)
    peakMt(64, 118, 46, 70) +
    peakMt(128, 118, 34, 56) +
    peakMt(348, 118, 40, 66) +
    `<path d="M0,118c40,-14 90,-10 130,2c46,14 96,6 140,-4c40,-15 88,-12 130,4v20H0z" fill="#6f8a76"/>` +
    ground(126, "#8a9a80") +
    // 連邦議事堂(左寄せ)。ドームと側翼
    `<rect x="16" y="96" width="150" height="56" fill="#b8ae98"/>` +
    `<rect x="16" y="92" width="150" height="6" fill="#cfc7b4"/>` +
    `<path d="M58,92V60h66v32z" fill="#c2b9a2"/>` +
    `<path d="M52,60h78L91,42z" fill="#a2977f"/>` +
    `<path d="M75,42a16,14 0 0 1 32,0z" fill="#5f8a72"/>` +
    `<path d="M73,44h36v4H73z" fill="#4f7560"/>` +
    `<rect x="90" y="24" width="2" height="8" fill="#8a8578"/>` +
    `<g fill="#5f7f96">${[24, 40, 132, 148].map((x) => `<rect x="${x}" y="108" width="10" height="18"/>`).join("")}</g>` +
    `<g fill="#4a6b7a">${[66, 82, 98, 114].map((x) => `<rect x="${x}" y="66" width="7" height="20"/>`).join("")}</g>` +
    `<g fill="#8a8578">${[62, 78, 94, 110, 126].map((x) => `<rect x="${x}" y="98" width="5" height="24"/>`).join("")}</g>` +
    // 右手のアーケードの町家
    townHouse(258, 104, 44, 152, "#e6ddc8", "#a8563c") +
    townHouse(306, 96, 40, 152, "#dfd2bb", "#8f4a38") +
    townHouse(350, 108, 46, 152, "#eae4d6", "#a8563c") +
    `<g fill="#5a4630">${[262, 282, 310, 330, 356, 376].map((x) => `<rect x="${x}" y="138" width="4" height="14"/>`).join("")}</g>` +
    // 石畳の広場
    ground(152, "#a89e8c") +
    `<g stroke="#948a78" stroke-width="1.6" opacity=".65" fill="none"><path d="M0,164h400M0,180h400M0,196h400M60,156v54M170,156v54M300,156v54"/></g>` +
    // 朝市の露店(手前・中央は隠れないy>170)
    `<path d="M148,178h104l-8,-14h-88z" fill="#e8443f"/>` +
    `<g fill="#f6efe2"><path d="M158,178h16l1.4,-14h-14zM196,178h16l1.4,-14h-14zM234,178h14l1,-14h-14z"/></g>` +
    `<rect x="150" y="178" width="100" height="4" fill="#8a6a44"/>` +
    `<g fill="#c2603c"><circle cx="164" cy="186" r="4"/><circle cx="176" cy="188" r="4.4"/><circle cx="188" cy="186" r="4"/></g>` +
    `<g fill="#f5b31c"><circle cx="206" cy="187" r="3.6"/><circle cx="216" cy="189" r="4"/><circle cx="228" cy="187" r="3.6"/></g>` +
    `<g fill="#4f8f3f"><ellipse cx="240" cy="188" rx="7" ry="4"/></g>` +
    shade(120, 200, 11, 3, ".16") +
    person(119, 200, 22, "#5b8fe8") +
    arm(119, 187, 12, 6) +
    shade(292, 196, 10, 3, ".16") +
    person(291, 196, 20, "#4a6b52") +
    arm(291, 185, -10, 5) +
    flagPole(28, 152, 34) +
    lamp(214, 168, 26),

  /**
   * チューリヒ。石造の銀行街と路面電車。
   * 金庫の入口(地下への階段)は左手前に置き、通りの奥に高層を薄く重ねる。
   */
  financial:
    sky("#6f96c0", "#c6d6e4", 148) +
    `<g fill="#f2d8a8" opacity=".35"><ellipse cx="300" cy="52" rx="70" ry="28"/></g>` +
    // 奥の高層(靄の中)
    `<g fill="#8d9fb2" opacity=".8"><rect x="176" y="40" width="30" height="92"/><rect x="212" y="26" width="26" height="106"/><rect x="244" y="52" width="22" height="80"/></g>` +
    `<g fill="#a8b8c8" opacity=".7">${[180, 190, 200, 216, 226, 248, 256].map((x, i) => `<rect x="${x}" y="${46 + (i % 3) * 6}" width="5" height="70"/>`).join("")}</g>` +
    ground(132, "#6f6a62") +
    // 通りの両側の石造の銀行
    `<rect x="0" y="52" width="132" height="96" fill="#cfc7b4"/>` +
    `<rect x="0" y="46" width="132" height="8" fill="#b8ae98"/>` +
    `<g fill="#8a8578">${[10, 34, 58, 82, 106].map((x) => `<rect x="${x}" y="62" width="14" height="54"/>`).join("")}</g>` +
    `<g fill="#3f4a52">${[14, 38, 62, 86, 110].map((x) => `<rect x="${x}" y="66" width="6" height="46"/>`).join("")}</g>` +
    `<rect x="0" y="116" width="132" height="4" fill="#b8ae98"/>` +
    `<rect x="0" y="120" width="132" height="28" fill="#57606b"/>` +
    `<rect x="286" y="60" width="114" height="88" fill="#c2b9a2"/>` +
    `<rect x="286" y="54" width="114" height="8" fill="#a89e8c"/>` +
    `<g fill="#4a5f70">${[294, 316, 338, 360, 382].map((x) => `<rect x="${x}" y="70" width="12" height="16"/>`).join("")}</g>` +
    `<g fill="#4a5f70">${[294, 316, 338, 360, 382].map((x) => `<rect x="${x}" y="94" width="12" height="16"/>`).join("")}</g>` +
    `<rect x="286" y="118" width="114" height="30" fill="#4a4f56"/>` +
    `<g fill="#f5d06a" opacity=".8">${[300, 328, 356, 384].map((x) => `<rect x="${x}" y="126" width="9" height="14"/>`).join("")}</g>` +
    // 地下金庫の入口(左手前・鋼の扉と階段)
    `<path d="M8,190h60l-6,-26H14z" fill="#3f454c"/>` +
    `<g fill="#5a626b"><rect x="16" y="168" width="46" height="4"/><rect x="14" y="176" width="50" height="4"/><rect x="11" y="184" width="56" height="4"/></g>` +
    `<rect x="24" y="146" width="30" height="20" fill="#8a939c"/>` +
    `<circle cx="39" cy="156" r="5" fill="#c9c0ac"/>` +
    `<circle cx="39" cy="156" r="2" fill="#6f6a5e"/>` +
    // 通り
    band(148, 62, "#57606b") +
    `<g stroke="#c9c0ac" stroke-width="2.6" stroke-dasharray="16 14" opacity=".5" fill="none"><path d="M0,204h400"/></g>` +
    track(166, 90, 400) +
    // 路面電車(右寄り)
    `<rect x="238" y="140" width="118" height="26" rx="4" fill="#5b8fe8"/>` +
    `<rect x="238" y="140" width="118" height="4" rx="2" fill="#f2ede0" opacity=".6"/>` +
    `<g fill="#cfe4f0">${[246, 266, 286, 306, 326].map((x) => `<rect x="${x}" y="146" width="14" height="10"/>`).join("")}</g>` +
    `<rect x="240" y="160" width="114" height="4" fill="#3a4453"/>` +
    `<g fill="#2f3338"><circle cx="256" cy="167" r="3"/><circle cx="338" cy="167" r="3"/></g>` +
    `<path d="M292,140v-12h24" stroke="#4a4f56" stroke-width="1.6" fill="none"/>` +
    `<path d="M0,120h400" stroke="#4a4f56" stroke-width="1" opacity=".7" fill="none"/>` +
    // 歩く人
    shade(120, 194, 11, 3, ".2") +
    person(119, 194, 23, "#3f4a52") +
    arm(119, 181, 8, 9) +
    `<rect x="126" y="188" width="12" height="9" rx="1.5" fill="#6b4423"/>` +
    shade(184, 202, 11, 3, ".2") +
    person(183, 202, 22, "#8a3f4a") +
    arm(183, 190, -9, 8) +
    lamp(70, 150, 34) +
    lamp(370, 150, 34),

  /**
   * ツーク。看板の無い低層のオフィスと、郵便受けだけが並ぶ壁。
   * 会社の数だけある郵便受けを手前に置く(町より会社のほうが多い)。
   */
  taxhaven:
    sky("#7fa8cc", "#f0c8a0", 96) +
    sun(322, 42, 15, "#f5c86a") +
    `<circle cx="322" cy="42" r="24" fill="#fdf0c8" opacity=".22"/>` +
    // 対岸の山(リギ)
    `<path d="M0,96c50,-30 110,-34 168,-10c40,17 88,12 132,-6c34,-14 70,-14 100,2v18H0z" fill="#6b7f8a"/>` +
    `<path d="M232,80c22,-14 50,-16 76,-4c-24,2 -50,6 -76,4z" fill="#8a99a4"/>` +
    lake(96, 40, "#3f6f8f", "#5d94ae") +
    ground(136, "#8a8f80") +
    // 湖畔の低層オフィス(無地・看板が無い)
    `<rect x="8" y="98" width="86" height="42" fill="#d8d4c8"/>` +
    `<rect x="8" y="94" width="86" height="5" fill="#b8b4a6"/>` +
    `<g fill="#7f97ad" opacity=".9">${[14, 34, 54, 74].map((x) => `<rect x="${x}" y="104" width="14" height="9"/>`).join("")}</g>` +
    `<g fill="#7f97ad" opacity=".9">${[14, 34, 54, 74].map((x) => `<rect x="${x}" y="120" width="14" height="9"/>`).join("")}</g>` +
    `<rect x="286" y="90" width="106" height="50" fill="#cfc7b4"/>` +
    `<rect x="286" y="86" width="106" height="5" fill="#b0a894"/>` +
    `<g fill="#6b8598">${[292, 314, 336, 358, 378].map((x) => `<rect x="${x}" y="96" width="14" height="10"/>`).join("")}</g>` +
    `<g fill="#6b8598">${[292, 314, 336, 358, 378].map((x) => `<rect x="${x}" y="114" width="14" height="10"/>`).join("")}</g>` +
    `<rect x="330" y="128" width="18" height="12" fill="#4a5158"/>` +
    // 桟橋と繋がれた小舟
    `<rect x="120" y="128" width="70" height="4" fill="#8a6a44"/>` +
    `<g fill="#6b5330"><rect x="126" y="132" width="3" height="8"/><rect x="152" y="132" width="3" height="8"/><rect x="180" y="132" width="3" height="8"/></g>` +
    // 湖畔の道
    ground(140, "#7f8578") +
    band(150, 60, "#6f7568") +
    // 郵便受けの壁(手前・右)。会社の数だけ並ぶ
    `<rect x="252" y="150" width="140" height="46" fill="#8a939c"/>` +
    `<rect x="252" y="146" width="140" height="5" fill="#6f7880"/>` +
    `<g fill="#b8bfc6">${[0, 1, 2, 3, 4].flatMap((c) => [0, 1, 2].map((r) => `<rect x="${258 + c * 27}" y="${156 + r * 14}" width="22" height="11"/>`)).join("")}</g>` +
    `<g fill="#5f676e">${[0, 1, 2, 3, 4].flatMap((c) => [0, 1, 2].map((r) => `<rect x="${261 + c * 27}" y="${159 + r * 14}" width="16" height="1.8"/>`)).join("")}</g>` +
    shade(196, 200, 12, 3.4, ".2") +
    person(195, 200, 24, "#2f3a44") +
    arm(195, 186, 14, 6) +
    `<rect x="204" y="190" width="13" height="10" rx="1.4" fill="#4a3a24"/>` +
    roundTree(66, 156, 15, "#3f7f4a") +
    roundTree(120, 160, 12, "#4f8f52") +
    lamp(224, 156, 30),

  /**
   * バーゼル。ライン川沿いの化学工場と鉄道橋。
   * 川は左から右へ抜け、はしけが手前を行く。
   */
  riverindustry:
    sky("#8fb8d4", "#d4dfe4", 114) +
    clouds(96, 26, 1) +
    `<g fill="#c9d4d8" opacity=".85"><ellipse cx="252" cy="34" rx="34" ry="10"/><ellipse cx="230" cy="42" rx="22" ry="7"/></g>` +
    // 対岸の町
    `<g fill="#a89e8c">${[0, 26, 52, 78, 104].map((x) => `<rect x="${x}" y="${74 + (x % 3) * 4}" width="22" height="${18 - (x % 3) * 2}"/>`).join("")}</g>` +
    `<g fill="#8f4a38">${[0, 26, 52, 78, 104].map((x) => `<path d="M${x - 2},${74 + (x % 3) * 4}h26l-13,-8z"/>`).join("")}</g>` +
    spire(140, 92, 46) +
    // 化学工場(右)。タンク・煙突・配管
    `<rect x="270" y="72" width="124" height="42" fill="#b0b4b0"/>` +
    `<rect x="270" y="68" width="124" height="5" fill="#8f948f"/>` +
    `<g fill="#7f8478">${[276, 300, 324, 348, 372].map((x) => `<rect x="${x}" y="78" width="16" height="12"/>`).join("")}</g>` +
    `<rect x="352" y="18" width="12" height="54" fill="#c9c0ac"/>` +
    `<g fill="#c2453c"><rect x="352" y="26" width="12" height="6"/><rect x="352" y="42" width="12" height="6"/></g>` +
    `<g fill="#d8dcd8"><ellipse cx="300" cy="60" rx="16" ry="6"/><rect x="284" y="60" width="32" height="14"/></g>` +
    `<g fill="#d8dcd8"><ellipse cx="332" cy="64" rx="12" ry="5"/><rect x="320" y="64" width="24" height="10"/></g>` +
    `<g stroke="#8f948f" stroke-width="2.6" fill="none"><path d="M284,84h-30v14M316,80h20"/></g>` +
    // 鉄道橋(川を渡る)
    `<rect x="180" y="96" width="220" height="7" fill="#5f6b72"/>` +
    `<path d="M180,96l24,-18h36l24,18M264,96l24,-18h36l24,18" stroke="#4a5158" stroke-width="3" fill="none"/>` +
    `<g fill="#4a5158">${[200, 232, 264, 296, 328, 360].map((x) => `<rect x="${x}" y="103" width="7" height="22"/>`).join("")}</g>` +
    railcar(198, 96, 66, 18, "#3f4a52") +
    // ライン川
    lake(114, 54, "#4a7f92", "#63a0ae") +
    ground(168, "#8a8578") +
    // 護岸と積み出し場(手前)
    `<rect x="0" y="164" width="400" height="8" fill="#a89e8c"/>` +
    `<g fill="#8a8578">${[10, 60, 110, 250, 300, 350].map((x) => `<rect x="${x}" y="172" width="6" height="8"/>`).join("")}</g>` +
    band(180, 30, "#6f6a5e") +
    // はしけ(波を遮る=水の上にいる)
    `<path d="M56,150h150l-10,16H66z" fill="#3f4f5a"/>` +
    `<path d="M60,152h142l-3,5H63z" fill="#5f6f7a"/>` +
    `<g fill="#8a6a44"><rect x="80" y="140" width="26" height="11"/><rect x="120" y="142" width="26" height="9"/><rect x="160" y="140" width="26" height="11"/></g>` +
    `<rect x="188" y="134" width="16" height="17" fill="#e6ddc8"/>` +
    `<rect x="191" y="138" width="10" height="7" fill="#5f7f96"/>` +
    `<g fill="#3f4f5a" opacity=".35"><rect x="56" y="166" width="150" height="6"/></g>` +
    // 手前の樽と作業員
    shade(46, 196, 13, 4, ".2") +
    `<g fill="#8a5a2c"><rect x="34" y="180" width="24" height="18" rx="3"/></g>` +
    `<g fill="#6b4423"><rect x="34" y="184" width="24" height="2.4"/><rect x="34" y="192" width="24" height="2.4"/></g>` +
    `<g fill="#f5b31c"><path d="M40,176h12v4H40z"/></g>` +
    shade(300, 200, 12, 3.4, ".2") +
    person(299, 200, 24, "#f5b31c") +
    arm(299, 186, 13, 7) +
    `<path d="M312,192l14,-4" stroke="#4a4436" stroke-width="2" fill="none"/>` +
    shade(356, 194, 10, 3, ".2") +
    person(355, 194, 21, "#5b8fe8") +
    arm(355, 183, -11, 4),

  /**
   * 湖畔の町(8都市が共用する、この盤面でいちばん多く出る背景)。
   * 対岸の山・町並み・遊覧船・桟橋の4層を置き、手前の桟橋に人を立たせる。
   */
  lakeside:
    sky("#8fc4e8", "#dfeaf0", 94) +
    clouds(72, 26, 1) +
    clouds(330, 20, 0.85) +
    // 対岸の山と丘
    peakMt(74, 88, 42, 68) +
    peakMt(330, 88, 36, 60) +
    hills(90, "#6f8a6a", 4) +
    `<path d="M0,90c60,-12 120,-4 190,4c60,7 130,2 210,-6v14H0z" fill="#5f7f5a"/>` +
    // 対岸の町並み(繰り返しなので中央が隠れても惜しくない)
    `<g fill="#e6ddc8">${[110, 132, 154, 176, 198, 220, 242].map((x, i) => `<rect x="${x}" y="${78 + (i % 3) * 3}" width="18" height="${16 - (i % 3) * 2}"/>`).join("")}</g>` +
    `<g fill="#a8563c">${[110, 132, 154, 176, 198, 220, 242].map((x, i) => `<path d="M${x - 2},${78 + (i % 3) * 3}h22l-11,-7z"/>`).join("")}</g>` +
    spire(268, 94, 40) +
    // 手前岸の町(左)
    townHouse(6, 96, 40, 142, "#eae4d6", "#a8563c") +
    townHouse(48, 88, 36, 142, "#e0d6bf", "#8f4a38") +
    townHouse(86, 100, 38, 142, "#f0e8d8", "#a8563c") +
    // 湖
    lake(94, 62, "#3f7f9f", "#58a0bc") +
    // 遊覧船(右)。波を遮ってから描く
    `<path d="M258,130h108l-12,16H268z" fill="#f2ede0"/>` +
    `<rect x="272" y="116" width="80" height="14" fill="#f6efe2"/>` +
    `<g fill="#5f7f96">${[278, 294, 310, 326, 340].map((x) => `<rect x="${x}" y="120" width="10" height="7"/>`).join("")}</g>` +
    `<rect x="286" y="104" width="34" height="12" fill="#f2ede0"/>` +
    `<rect x="300" y="92" width="7" height="12" fill="#e8443f"/>` +
    `<rect x="300" y="92" width="7" height="4" fill="#3a4453"/>` +
    `<g fill="#3f4f5a" opacity=".3"><rect x="258" y="146" width="108" height="7"/></g>` +
    `<path d="M0,150h400" stroke="#bfe0f0" stroke-width="2" opacity=".5" fill="none"/>` +
    // 遊歩道
    ground(156, "#9a9382") +
    band(156, 6, "#b0a894") +
    `<g stroke="#8a8272" stroke-width="1.6" opacity=".6" fill="none"><path d="M0,176h400M0,194h400M80,162v48M240,162v48M330,162v48"/></g>` +
    roundTree(38, 168, 16, "#3f7f4a") +
    roundTree(104, 172, 13, "#4f8f52") +
    roundTree(370, 170, 15, "#3f7f4a") +
    // 手前の桟橋(y>170 の中央は隠れない)
    `<rect x="140" y="176" width="120" height="6" fill="#a8763c"/>` +
    `<g fill="#8a6a44"><rect x="146" y="182" width="5" height="12"/><rect x="196" y="182" width="5" height="12"/><rect x="248" y="182" width="5" height="12"/></g>` +
    `<g fill="#6b5330"><rect x="136" y="170" width="7" height="20" rx="2"/><rect x="256" y="170" width="7" height="20" rx="2"/></g>` +
    shade(178, 176, 10, 3, ".18") +
    person(177, 176, 22, "#e8443f") +
    arm(177, 163, 12, 5) +
    shade(226, 178, 10, 3, ".18") +
    person(225, 178, 20, "#5b8fe8") +
    arm(225, 166, -10, 6) +
    lamp(300, 168, 28) +
    // 水鳥
    `<g fill="#f6efe2"><ellipse cx="60" cy="200" rx="9" ry="4.4"/><path d="M66,197c-1,-5 1.4,-7.4 3.6,-6.6c1.8,0.6 1.8,2.6 0,3.2l-1.6,0.6l0.6,3.4z"/></g>` +
    `<path d="M70.6,190.6l2.6,1l-2.6,1z" fill="#f5b31c"/>`,

  /**
   * トゥーン。兵舎と砂利の演習場。
   * 永世中立国が自分の兵器を作り、町の屋根の見えるところで撃っている。
   */
  military:
    sky("#8fb4cc", "#dbe4e8", 102) +
    clouds(300, 24, 0.9) +
    // 遠いアルプス
    peakMt(56, 92, 52, 84) +
    peakMt(150, 92, 40, 66) +
    peakMt(348, 92, 46, 76) +
    `<path d="M0,92c56,-10 118,-6 184,2c60,8 140,4 216,-6v18H0z" fill="#5f7562"/>` +
    ground(102, "#8a8a72") +
    // 兵舎の列(左)
    `<g>${[0, 1, 2].map((i) => {
      const x = 6 + i * 66;
      return (
        `<rect x="${x}" y="${100 - i * 2}" width="58" height="34" fill="#9aa08c"/>` +
        `<path d="M${x - 5},${100 - i * 2}h68l-10,-11H${x + 5}z" fill="#6f6a5e"/>` +
        `<g fill="#4f5f6b"><rect x="${x + 6}" y="${108 - i * 2}" width="9" height="11"/><rect x="${x + 24}" y="${108 - i * 2}" width="9" height="11"/><rect x="${x + 42}" y="${108 - i * 2}" width="9" height="11"/></g>` +
        `<rect x="${x + 22}" y="${122 - i * 2}" width="12" height="12" fill="#5a4630"/>`
      );
    }).join("")}</g>` +
    // 監視塔と工場の建屋(右)
    `<rect x="286" y="96" width="108" height="40" fill="#a8a894"/>` +
    `<g fill="#7f8478">${[292, 320, 348, 376].map((x) => `<path d="M${x},96l10,-10h14l-10,10z"/>`).join("")}</g>` +
    `<g fill="#4f5f6b">${[292, 316, 340, 364].map((x) => `<rect x="${x}" y="106" width="18" height="12"/>`).join("")}</g>` +
    `<rect x="248" y="72" width="20" height="62" fill="#8a8f84"/>` +
    `<path d="M242,72h32l-16,-12z" fill="#5f6b60"/>` +
    `<rect x="252" y="80" width="12" height="9" fill="#3f4a52"/>` +
    `<g stroke="#6f7468" stroke-width="1.6" fill="none"><path d="M248,100h20M248,116h20"/></g>` +
    // 砂利の演習場
    ground(134, "#b0a888") +
    `<g fill="#a29a7c"><ellipse cx="90" cy="150" rx="70" ry="9"/><ellipse cx="300" cy="162" rx="80" ry="10"/><ellipse cx="200" cy="186" rx="90" ry="11"/></g>` +
    `<g stroke="#8f8a70" stroke-width="2.4" opacity=".7" fill="none"><path d="M0,158q100,-8 200,0t200,2M0,176q110,-8 210,2t190,-4"/></g>` +
    // 火砲(手前・左)
    shade(78, 196, 26, 5, ".2") +
    `<path d="M40,190h60l-6,-14H46z" fill="#5f6b52"/>` +
    `<circle cx="52" cy="190" r="9" fill="#3f4a38"/>` +
    `<circle cx="52" cy="190" r="3.4" fill="#6f7a62"/>` +
    `<circle cx="92" cy="190" r="9" fill="#3f4a38"/>` +
    `<circle cx="92" cy="190" r="3.4" fill="#6f7a62"/>` +
    `<path d="M62,176l52,-16l3,7l-52,16z" fill="#4f5a44"/>` +
    `<rect x="112" y="156" width="9" height="9" rx="2" fill="#3f4a38"/>` +
    `<path d="M42,180l-22,12" stroke="#4f5a44" stroke-width="4" stroke-linecap="round" fill="none"/>` +
    // 土嚢と兵(手前・右)
    `<g fill="#a89a72">${[300, 316, 332, 348].map((x) => `<ellipse cx="${x}" cy="192" rx="9" ry="5.4"/>`).join("")}</g>` +
    `<g fill="#9a8c66">${[308, 324, 340].map((x) => `<ellipse cx="${x}" cy="183" rx="9" ry="5.4"/>`).join("")}</g>` +
    shade(228, 202, 11, 3, ".2") +
    person(227, 202, 23, "#5f6b52") +
    arm(227, 189, 12, -6) +
    `<path d="M239,181l14,-4" stroke="#4a4436" stroke-width="2.4" fill="none"/>` +
    `<path d="M219,186a8,6 0 0 1 16,0z" fill="#4f5a44"/>` +
    flagPole(374, 176, 32),

  /**
   * ザンクトガレン。鋸屋根の刺繍工場と、修道院の双塔。
   * 手前に反物を張る枠を置く(一夜で傾いた産業の現物)。
   */
  textiletown:
    sky("#9cc0d8", "#e0e8e8", 110) +
    clouds(64, 24, 0.9) +
    hills(102, "#6f8a5f", 4) +
    ground(110, "#7f8a6a") +
    // 修道院の双塔(左)
    `<rect x="14" y="66" width="86" height="70" fill="#eae4d6"/>` +
    `<g fill="#cfc7b4"><rect x="10" y="46" width="26" height="90"/><rect x="78" y="46" width="26" height="90"/></g>` +
    `<g fill="#5f7560"><path d="M8,46h30l-15,-16zM76,46h30l-15,-16z"/></g>` +
    `<g fill="#4a6b7a"><rect x="17" y="58" width="12" height="14" rx="6"/><rect x="85" y="58" width="12" height="14" rx="6"/></g>` +
    `<path d="M40,136V112a17,17 0 0 1 34,0v24z" fill="#8a6a44"/>` +
    `<g fill="#5f7f96"><rect x="44" y="76" width="12" height="16" rx="6"/><rect x="60" y="76" width="12" height="16" rx="6"/></g>` +
    // 鋸屋根の工場(右)。採光の窓が北を向く
    `<rect x="248" y="104" width="152" height="34" fill="#b8ae98"/>` +
    `<g>${[0, 1, 2, 3, 4].map((i) => {
      const x = 248 + i * 31;
      return `<path d="M${x},104V88l31,16z" fill="#cfc7b4"/><path d="M${x},104V88l10,5v11z" fill="#6b8598"/>`;
    }).join("")}</g>` +
    `<g fill="#5f7f96">${[256, 282, 308, 334, 360, 384].map((x) => `<rect x="${x}" y="112" width="12" height="16"/>`).join("")}</g>` +
    `<rect x="238" y="76" width="10" height="62" fill="#c9c0ac"/>` +
    `<g fill="#a89e8c"><rect x="236" y="76" width="14" height="4"/></g>` +
    // 中景の町並み
    `<g fill="#e0d6bf">${[112, 140, 168, 196, 220].map((x, i) => `<rect x="${x}" y="${112 + (i % 2) * 4}" width="24" height="${26 - (i % 2) * 4}"/>`).join("")}</g>` +
    `<g fill="#8f4a38">${[112, 140, 168, 196, 220].map((x, i) => `<path d="M${x - 3},${112 + (i % 2) * 4}h30l-15,-9z"/>`).join("")}</g>` +
    // 石畳の通り
    ground(138, "#9a9082") +
    `<g stroke="#8a8072" stroke-width="1.6" opacity=".6" fill="none"><path d="M0,152h400M0,170h400M0,190h400M60,144v66M180,144v66M300,144v66"/></g>` +
    // 反物を張る枠(手前)
    `<g fill="#6b5330"><rect x="96" y="164" width="5" height="42"/><rect x="238" y="164" width="5" height="42"/><rect x="96" y="164" width="147" height="5"/></g>` +
    `<rect x="103" y="172" width="132" height="30" fill="#f2ede0"/>` +
    `<g stroke="#c99ab8" stroke-width="1.6" opacity=".85" fill="none"><path d="M112,180h116M112,190h116"/></g>` +
    `<g fill="#c9a0c0"><circle cx="122" cy="185" r="3.4"/><circle cx="150" cy="185" r="3.4"/><circle cx="178" cy="185" r="3.4"/><circle cx="206" cy="185" r="3.4"/></g>` +
    `<g fill="#8a6a9a"><circle cx="136" cy="196" r="2.6"/><circle cx="164" cy="196" r="2.6"/><circle cx="192" cy="196" r="2.6"/><circle cx="220" cy="196" r="2.6"/></g>` +
    shade(300, 196, 11, 3, ".2") +
    person(299, 196, 23, "#4a6b52") +
    arm(299, 183, -13, 5) +
    `<rect x="278" y="184" width="12" height="14" rx="2" fill="#c9c0ac"/>` +
    shade(52, 200, 11, 3, ".2") +
    person(51, 200, 21, "#8a3f4a") +
    arm(51, 189, 11, 6),

  /**
   * シャフハウゼン。ライン滝。
   * 岩の島は中央帯を外して右へ。左に展望台、手前に飛沫と遊覧の小舟。
   */
  waterfall:
    sky("#8fc4e8", "#dfeaf0", 76) +
    clouds(120, 22, 0.85) +
    // 川上の岸と森
    `<path d="M0,76c70,-8 150,-6 230,2c50,5 110,3 170,-4v14H0z" fill="#3f6b46"/>` +
    ground(84, "#4f7f4a") +
    fir(24, 88, 30) +
    fir(48, 92, 24) +
    fir(340, 90, 28) +
    fir(366, 94, 22) +
    // 川上の水面
    band(88, 22, "#4f8fa8") +
    `<g stroke="#bfe0f0" stroke-width="2.2" opacity=".6" fill="none"><path d="M20,96h60M300,94h80M120,104h70"/></g>` +
    // 滝の落ち口と落水
    `<rect x="0" y="108" width="400" height="6" fill="#e8f2f6"/>` +
    `<rect x="0" y="112" width="400" height="46" fill="#dceaf2"/>` +
    `<g stroke="#f6fbfd" stroke-width="3.4" opacity=".9" fill="none">` +
    `<path d="M14,112v44M34,112v46M54,112v42M74,112v46M94,112v44M114,112v46M134,112v42M154,112v46M174,112v44M194,112v46M214,112v42M234,112v46M254,112v44M274,112v46M294,112v42M314,112v46M334,112v44M354,112v46M374,112v42M392,112v46"/></g>` +
    `<g stroke="#a8cfe0" stroke-width="1.6" opacity=".7" fill="none">` +
    `<path d="M24,116v38M64,116v40M104,116v36M144,118v38M184,116v40M224,118v36M264,116v38M304,118v40M344,116v36M384,118v38"/></g>` +
    // 滝の中の岩(右へ寄せる)
    `<path d="M300,158V104c0,-10 8,-16 16,-16c9,0 18,7 18,18v52z" fill="#7f7a6e"/>` +
    `<path d="M316,88c9,0 18,7 18,18v52h-10V102z" fill="#5f5c52"/>` +
    `<g fill="#4f7f4a"><ellipse cx="312" cy="88" rx="12" ry="5"/><ellipse cx="322" cy="86" rx="7" ry="3.4"/></g>` +
    `<rect x="313" y="72" width="2" height="14" fill="#8a8578"/>` +
    `<path d="M315,72h11l-4,3.4l4,3.4h-11z" fill="#e8443f"/>` +
    // 滝つぼ
    band(154, 56, "#63a0b4") +
    `<g fill="#e8f2f6" opacity=".85"><ellipse cx="70" cy="160" rx="66" ry="12"/><ellipse cx="230" cy="158" rx="80" ry="11"/><ellipse cx="356" cy="162" rx="46" ry="10"/></g>` +
    `<g fill="#f6fbfd" opacity=".7"><ellipse cx="120" cy="172" rx="40" ry="7"/><ellipse cx="290" cy="176" rx="46" ry="7"/></g>` +
    `<g stroke="#bfe0f0" stroke-width="2.4" opacity=".6" fill="none"><path d="M20,192h80M240,196h110"/></g>` +
    // 左の展望台(岩に張り出す木の桟敷)
    `<path d="M0,150h70l6,10H0z" fill="#7f7a6e"/>` +
    `<rect x="0" y="146" width="74" height="6" fill="#a8763c"/>` +
    `<g fill="#8a6a44"><rect x="16" y="152" width="4" height="16"/><rect x="46" y="152" width="4" height="18"/><rect x="68" y="152" width="4" height="16"/></g>` +
    `<g stroke="#8a6a44" stroke-width="2" fill="none"><path d="M0,136h74M0,142h74"/></g>` +
    `<g fill="#8a6a44">${[8, 28, 48, 68].map((x) => `<rect x="${x}" y="136" width="3" height="12"/>`).join("")}</g>` +
    shade(34, 146, 10, 3, ".18") +
    person(33, 146, 21, "#e8443f") +
    arm(33, 135, 12, -5) +
    // 手前の小舟(波を遮ってから描く)
    `<path d="M148,186c14,-6 46,-6 60,0c-8,8 -52,8 -60,0z" fill="#4a3a24"/>` +
    `<path d="M152,186c12,-4 40,-4 52,0z" fill="#8a6a44"/>` +
    `<path d="M152,188c12,4 40,4 52,0z" fill="#3f2f1c" opacity=".6"/>` +
    person(178, 184, 19, "#f5b31c") +
    arm(178, 174, -12, 6) +
    `<path d="M166,182l-14,8" stroke="#8a6a44" stroke-width="2.4" fill="none"/>` +
    `<g fill="#4a3a24" opacity=".3"><rect x="150" y="190" width="58" height="5"/></g>`,

  /**
   * ヴィンタートゥール。機関車の組立工場。
   * 建屋・門型クレーン・線路に載った車体・工員の4層。
   */
  engineering:
    sky("#8fb0c4", "#dbe0e0", 96) +
    `<g fill="#c4ccce" opacity=".8"><ellipse cx="120" cy="34" rx="40" ry="11"/><ellipse cx="92" cy="42" rx="26" ry="8"/></g>` +
    // 煙突と煙
    `<rect x="42" y="20" width="14" height="76" fill="#9a7a62"/>` +
    `<rect x="40" y="20" width="18" height="5" fill="#7f6250"/>` +
    `<g fill="#c9cfd2" opacity=".7"><ellipse cx="58" cy="16" rx="16" ry="7"/><ellipse cx="80" cy="10" rx="12" ry="5"/></g>` +
    ground(96, "#7f7a6e") +
    // 工場の建屋(奥)
    `<rect x="0" y="88" width="164" height="52" fill="#a89e8c"/>` +
    `<g>${[0, 1, 2, 3].map((i) => `<path d="M${i * 41},88V74l41,14z" fill="#b8ae98"/><path d="M${i * 41},88V74l14,5v9z" fill="#6b8598"/>`).join("")}</g>` +
    `<g fill="#5f7f96">${[8, 34, 60, 86, 112, 138].map((x) => `<rect x="${x}" y="98" width="16" height="18"/>`).join("")}</g>` +
    `<rect x="0" y="120" width="164" height="20" fill="#8f8578"/>` +
    `<rect x="286" y="76" width="114" height="64" fill="#9a9082"/>` +
    `<path d="M280,76h120l-14,-12H294z" fill="#6f6a5e"/>` +
    `<g fill="#4a5f6b">${[294, 322, 350, 378].map((x) => `<rect x="${x}" y="86" width="18" height="22"/>`).join("")}</g>` +
    `<path d="M320,140v-24h44v24z" fill="#3f454c"/>` +
    // 門型クレーン
    `<g fill="#f5b31c"><rect x="96" y="60" width="10" height="80"/><rect x="292" y="60" width="10" height="80"/><rect x="90" y="52" width="218" height="12"/></g>` +
    `<g fill="#c98f14"><rect x="90" y="64" width="218" height="3"/></g>` +
    `<rect x="180" y="64" width="26" height="14" fill="#4a4f56"/>` +
    `<path d="M193,78v22" stroke="#4a4f56" stroke-width="2" fill="none"/>` +
    `<rect x="182" y="100" width="22" height="8" fill="#6f6a5e"/>` +
    // 組立中の機関車(手前・左右に振る)
    ground(140, "#8a8578") +
    track(160, 0, 400) +
    track(190, 0, 400) +
    `<rect x="10" y="136" width="118" height="24" rx="3" fill="#2f4a5f"/>` +
    `<rect x="10" y="136" width="118" height="4" fill="#5f7f96" opacity=".7"/>` +
    `<g fill="#cfe4f0">${[18, 38, 58, 78, 98].map((x) => `<rect x="${x}" y="142" width="12" height="9"/>`).join("")}</g>` +
    `<g fill="#3a3a3a"><circle cx="30" cy="160" r="5"/><circle cx="60" cy="160" r="5"/><circle cx="108" cy="160" r="5"/></g>` +
    `<rect x="252" y="128" width="140" height="32" rx="3" fill="#5f6b52"/>` +
    `<rect x="252" y="128" width="140" height="4" fill="#7f8a6a"/>` +
    `<g fill="#3f4a38">${[262, 288, 314, 340, 366].map((x) => `<rect x="${x}" y="136" width="16" height="12"/>`).join("")}</g>` +
    `<g fill="#3a3a3a"><circle cx="276" cy="160" r="6"/><circle cx="312" cy="160" r="6"/><circle cx="356" cy="160" r="6"/></g>` +
    `<path d="M252,144h-18v16h18z" fill="#4f5a44"/>` +
    // 手前の工員と部品
    shade(150, 200, 12, 3.4, ".22") +
    person(149, 200, 24, "#f5b31c") +
    arm(149, 186, 13, 8) +
    `<circle cx="149" cy="182" r="5.4" fill="#f5b31c"/>` +
    shade(212, 204, 12, 3.4, ".22") +
    person(211, 204, 23, "#3f5f7a") +
    arm(211, 191, -12, 7) +
    `<g fill="#6f6a5e"><circle cx="268" cy="198" r="11"/><circle cx="268" cy="198" r="4" fill="#8f8a7c"/></g>` +
    `<g fill="#6f6a5e"><circle cx="292" cy="204" r="8"/><circle cx="292" cy="204" r="3" fill="#8f8a7c"/></g>` +
    `<g fill="#8a8578"><rect x="52" y="196" width="46" height="7" rx="2"/><rect x="60" y="188" width="30" height="7" rx="2"/></g>`,

  /**
   * バーデン。湯気の立つ浴場と、国内初の鉄道の駅。
   * 夕方。左に柱廊、右に駅と列車、手前に湯の張られた浴槽。
   */
  spa:
    sky("#6b8fc0", "#f2c08a", 112) +
    sun(300, 56, 16, "#f5b06a") +
    `<circle cx="300" cy="56" r="26" fill="#fdf0c8" opacity=".2"/>` +
    `<g fill="#e0a880" opacity=".55"><ellipse cx="120" cy="40" rx="46" ry="9"/><ellipse cx="92" cy="50" rx="30" ry="6"/></g>` +
    // 谷の斜面
    `<path d="M0,104c60,-24 140,-30 214,-12c48,12 116,10 186,-8v20H0z" fill="#4f5f5a"/>` +
    ground(112, "#5f6b60") +
    fir(348, 116, 26, "#2b4f39") +
    fir(372, 120, 22, "#2b4f39") +
    // 柱廊(左)
    `<rect x="0" y="96" width="136" height="8" fill="#cfc7b4"/>` +
    `<rect x="0" y="90" width="136" height="7" fill="#dfd8c8"/>` +
    `<g fill="#c2b9a2">${[6, 30, 54, 78, 102, 124].map((x) => `<rect x="${x}" y="104" width="10" height="42"/>`).join("")}</g>` +
    `<g fill="#a89e8c">${[6, 30, 54, 78, 102, 124].map((x) => `<rect x="${x - 2}" y="104" width="14" height="4"/>`).join("")}</g>` +
    `<rect x="0" y="146" width="136" height="6" fill="#b0a894"/>` +
    `<rect x="0" y="112" width="136" height="34" fill="#8a8272" opacity=".35"/>` +
    // 駅と最初の鉄道(右)
    `<rect x="262" y="94" width="138" height="42" fill="#e0d6bf"/>` +
    `<path d="M256,94h150l-14,-13H270z" fill="#8f4a38"/>` +
    `<g fill="#5f7f96">${[272, 300, 328, 356, 380].map((x) => `<rect x="${x}" y="104" width="14" height="16"/>`).join("")}</g>` +
    `<rect x="300" y="122" width="20" height="14" fill="#5a4630"/>` +
    `<rect x="246" y="122" width="154" height="5" fill="#6b5330"/>` +
    `<g fill="#8a6a44"><rect x="252" y="127" width="4" height="12"/><rect x="330" y="127" width="4" height="12"/></g>` +
    ground(136, "#9a9082") +
    track(150, 210, 400) +
    // 初期の蒸気機関車
    `<rect x="238" y="126" width="66" height="22" rx="2" fill="#3f4a52"/>` +
    `<circle cx="248" cy="132" r="9" fill="#2f3840"/>` +
    `<rect x="243" y="108" width="10" height="18" fill="#2f3840"/>` +
    `<path d="M240,108h16l4,-6h-24z" fill="#2f3840"/>` +
    `<g fill="#c9cfd2" opacity=".65"><ellipse cx="252" cy="98" rx="14" ry="6"/><ellipse cx="272" cy="90" rx="10" ry="4.4"/></g>` +
    `<g fill="#3a3a3a"><circle cx="252" cy="148" r="6"/><circle cx="278" cy="148" r="6"/><circle cx="296" cy="148" r="4"/></g>` +
    `<rect x="306" y="128" width="52" height="20" rx="2" fill="#8a5a2c"/>` +
    `<g fill="#f5d06a">${[312, 328, 344].map((x) => `<rect x="${x}" y="133" width="10" height="8"/>`).join("")}</g>` +
    // 手前の浴槽(湯気は動きの層が足す。ここでは湯と縁だけ)
    ground(156, "#8a8272") +
    `<rect x="0" y="156" width="400" height="5" fill="#a89e8c"/>` +
    `<path d="M92,168h216v34H92z" fill="#b0a894"/>` +
    `<path d="M100,172h200v26H100z" fill="#5f9fae"/>` +
    `<g fill="#8fc8d4" opacity=".8"><ellipse cx="150" cy="180" rx="30" ry="4.4"/><ellipse cx="250" cy="188" rx="34" ry="5"/></g>` +
    `<g stroke="#cfe8ee" stroke-width="2" opacity=".7" fill="none"><path d="M112,192h60M220,176h60"/></g>` +
    `<g fill="#e0b48a"><circle cx="136" cy="176" r="5"/><circle cx="272" cy="182" r="5"/></g>` +
    `<g fill="#f6efe2"><path d="M130,182h12v6h-12zM266,188h12v6h-12z"/></g>` +
    shade(50, 200, 12, 3.4, ".22") +
    person(49, 200, 23, "#e8443f") +
    arm(49, 187, 12, 6) +
    lamp(348, 176, 30) +
    lamp(76, 170, 26),

  /**
   * 素朴な旧市街(4都市が共用)。
   * 主役は手前の彩色噴水。塔は鐘楼で、文字盤は描かない。
   */
  smalltown:
    sky("#8fc4e8", "#dfe8ea", 126) +
    clouds(80, 24, 0.9) +
    clouds(320, 20, 0.8) +
    hills(120, "#6f8a5f", 4) +
    ground(126, "#7f8a6a") +
    // 通りの両側の町家
    townHouse(0, 82, 46, 152, "#eae4d6", "#a8563c") +
    townHouse(48, 92, 40, 152, "#e0d6bf", "#8f4a38") +
    townHouse(90, 74, 44, 152, "#f0e8d8", "#a8563c") +
    townHouse(276, 88, 42, 152, "#e6ddc8", "#8f4a38") +
    townHouse(320, 78, 40, 152, "#eae4d6", "#a8563c") +
    townHouse(362, 94, 38, 152, "#dfd2bb", "#8f4a38") +
    // 奥の門塔(鐘楼)
    `<rect x="176" y="60" width="48" height="92" fill="#dfd8c8"/>` +
    `<rect x="172" y="56" width="56" height="6" fill="#c2b9a2"/>` +
    `<path d="M170,56h60l-30,-24z" fill="#5f6b72"/>` +
    `<g fill="#4a4436"><rect x="188" y="66" width="10" height="14" rx="5"/><rect x="202" y="66" width="10" height="14" rx="5"/></g>` +
    `<path d="M186,152v-26a14,14 0 0 1 28,0v26z" fill="#5a4630"/>` +
    // 石畳
    ground(152, "#9a9082") +
    `<g stroke="#8a8072" stroke-width="1.6" opacity=".6" fill="none"><path d="M0,164h400M0,180h400M0,196h400M70,156v54M330,156v54"/></g>` +
    `<g stroke="#8a8072" stroke-width="1.4" opacity=".4" fill="none"><path d="M140,156v54M260,156v54"/></g>` +
    // 彩色噴水(手前・y>170 の中央)
    shade(104, 200, 34, 6, ".16") +
    `<path d="M68,198h72l-6,-12H74z" fill="#a8a094"/>` +
    `<path d="M74,186h60v-6H74z" fill="#8f8a7c"/>` +
    `<rect x="98" y="150" width="12" height="32" fill="#b8b0a0"/>` +
    `<rect x="94" y="146" width="20" height="6" fill="#a8a094"/>` +
    `<path d="M98,146V132a6,6 0 0 1 12,0v14z" fill="#5b8fe8"/>` +
    `<circle cx="104" cy="128" r="5" fill="#e0b48a"/>` +
    `<path d="M99,124a5,4 0 0 1 10,0z" fill="#f5b31c"/>` +
    `<path d="M110,138l10,-10" stroke="#c9c0ac" stroke-width="2.6" fill="none"/>` +
    `<path d="M120,128l3,-8l3,8z" fill="#e8443f"/>` +
    `<g stroke="#a8d8ec" stroke-width="2" opacity=".8" fill="none"><path d="M90,158q-6,10 -4,22M118,158q6,10 4,22"/></g>` +
    // 手前の人と八百屋の台
    shade(78, 202, 12, 3.4, ".2") +
    person(77, 202, 24, "#4a6b52") +
    arm(77, 188, 13, 7) +
    `<rect x="88" y="192" width="14" height="11" rx="2" fill="#a8763c"/>` +
    shade(316, 198, 11, 3, ".2") +
    person(315, 198, 21, "#c2453c") +
    arm(315, 187, -11, 5) +
    `<rect x="286" y="176" width="44" height="5" fill="#8a6a44"/>` +
    `<g fill="#6b5330"><rect x="290" y="181" width="3" height="10"/><rect x="322" y="181" width="3" height="10"/></g>` +
    `<g fill="#e8443f"><circle cx="296" cy="172" r="3.4"/><circle cx="304" cy="172" r="3.4"/></g>` +
    `<g fill="#f5b31c"><circle cx="314" cy="172" r="3.4"/><circle cx="322" cy="172" r="3.4"/></g>` +
    roundTree(140, 160, 13, "#3f7f4a") +
    lamp(252, 158, 26),

  /**
   * 山あいの村(4都市が共用)。
   * 絵葉書にしないため、村の射撃場(的と旗)を右手前に置く。
   * 兵役の国では射撃場は村の設備で、日曜に音がする。
   */
  village:
    sky("#8fc4e8", "#dfeae4", 106) +
    clouds(300, 22, 0.9) +
    peakMt(60, 96, 50, 80) +
    peakMt(146, 96, 38, 62) +
    peakMt(336, 96, 44, 72) +
    `<path d="M0,96c50,-16 108,-14 168,0c52,12 122,8 232,-8v20H0z" fill="#4f7048"/>` +
    ground(106, "#6f9f52") +
    `<g stroke="#5a8a42" stroke-width="2" opacity=".5" fill="none"><path d="M0,120q100,-10 200,0t200,-2M0,140q100,-10 200,2t200,-4"/></g>` +
    fir(20, 118, 30) +
    fir(44, 122, 24) +
    fir(376, 120, 28) +
    // 村の教会と農家
    spire(112, 132, 44) +
    `<rect x="96" y="118" width="34" height="14" fill="#eae4d6"/>` +
    `<path d="M92,118h42l-21,-10z" fill="#8f4a38"/>` +
    chalet(18, 122, 54, 152) +
    chalet(266, 116, 58, 150, "#7f5228", "#4f4238") +
    chalet(336, 126, 50, 152) +
    // 干し草の架け(スイスの畑の道具)
    `<g fill="#6b5330"><rect x="152" y="124" width="3" height="28"/><rect x="196" y="124" width="3" height="28"/></g>` +
    `<g stroke="#6b5330" stroke-width="2" fill="none"><path d="M152,130h46M152,138h46"/></g>` +
    `<g fill="#d8b45c"><path d="M152,130h46v-5h-46zM152,138h46v-5h-46z"/></g>` +
    // 牧草地
    ground(152, "#5f9450") +
    `<g fill="#4f8544"><ellipse cx="90" cy="176" rx="80" ry="12"/><ellipse cx="320" cy="192" rx="90" ry="13"/></g>` +
    `<g fill="#f5b31c"><circle cx="46" cy="184" r="2.2"/><circle cx="118" cy="196" r="2.2"/><circle cx="182" cy="180" r="2.2"/><circle cx="252" cy="204" r="2.2"/></g>` +
    // 村の射撃場(右手前)。土手・的・旗
    `<path d="M262,206c14,-20 60,-26 138,-14v14z" fill="#7f8a62"/>` +
    `<rect x="300" y="160" width="8" height="34" fill="#6b5330"/>` +
    `<rect x="352" y="160" width="8" height="34" fill="#6b5330"/>` +
    `<rect x="292" y="152" width="76" height="12" fill="#4a4436"/>` +
    `<rect x="300" y="164" width="60" height="30" fill="#f2ede0"/>` +
    `<circle cx="330" cy="179" r="12" fill="#e8443f"/>` +
    `<circle cx="330" cy="179" r="7" fill="#f6efe2"/>` +
    `<circle cx="330" cy="179" r="3" fill="#3f3428"/>` +
    flagPole(276, 194, 40) +
    // 手前の柵と、的を見に行く人
    `<g fill="#8a6a44"><rect x="0" y="176" width="4" height="24"/><rect x="40" y="180" width="4" height="24"/><rect x="80" y="184" width="4" height="24"/></g>` +
    `<g stroke="#8a6a44" stroke-width="2.6" fill="none"><path d="M0,184l84,8M0,194l84,8"/></g>` +
    shade(180, 200, 11, 3, ".18") +
    person(179, 200, 23, "#4a6b52") +
    arm(179, 187, 13, 5) +
    shade(214, 204, 10, 3, ".18") +
    person(213, 204, 19, "#c2453c") +
    arm(213, 194, -10, 5),

  /**
   * ブリーク。峠の入口。
   * 石造の雪よけギャラリー・九十九折の道・トンネル坑口。**山を通すための人工物**を並べる。
   */
  mountainpass:
    sky("#7fa8cc", "#dbe4ea", 120) +
    clouds(80, 22, 0.8) +
    // 奥の峰
    peakMt(120, 92, 74, 120, "#8a919c", "#6b7280", 0.5) +
    peakMt(300, 88, 62, 104, "#8a919c", "#6b7280", 0.5) +
    // 谷の斜面(左右から寄せる)
    `<path d="M0,60l84,54c22,14 40,32 46,52l-6,44H0z" fill="#6f7566"/>` +
    `<path d="M400,66l-96,60c-24,16 -40,34 -44,54l4,30h136z" fill="#5f6b5c"/>` +
    ground(120, "#7f8570") +
    // 九十九折の道
    `<path d="M4,196q60,-16 96,-38q30,-18 22,-34q-8,-16 24,-26q28,-9 56,-22" stroke="#a8a08c" stroke-width="9" fill="none"/>` +
    `<path d="M4,196q60,-16 96,-38q30,-18 22,-34q-8,-16 24,-26q28,-9 56,-22" stroke="#c2b9a2" stroke-width="2" stroke-dasharray="10 12" fill="none"/>` +
    // 雪よけギャラリー(石の柱と屋根で道を覆う)
    `<rect x="196" y="66" width="120" height="7" fill="#8f8a7c"/>` +
    `<rect x="196" y="73" width="120" height="4" fill="#6f6a5e"/>` +
    `<g fill="#a29a86">${[200, 224, 248, 272, 296].map((x) => `<rect x="${x}" y="77" width="9" height="22"/>`).join("")}</g>` +
    `<path d="M196,66l-14,10h134l-2,-10z" fill="#a8a094"/>` +
    // トンネル坑口(右下)
    portal(330, 168, 54, 46) +
    track(168, 300, 400) +
    railcar(300, 168, 58, 20) +
    // 手前の岩と防護網
    ground(168, "#8a8272") +
    `<path d="M0,178c40,-14 90,-16 140,-4c40,10 90,8 140,-4c46,-11 84,-8 120,4v36H0z" fill="#6f6a5e"/>` +
    cliff(0, 120, 96, 58) +
    rockNet(6, 124, 84, 46) +
    `<g fill="#5f5a52"><ellipse cx="60" cy="196" rx="24" ry="9"/><ellipse cx="140" cy="204" rx="30" ry="10"/></g>` +
    // 峠の道標と旅人
    `<rect x="184" y="156" width="4" height="40" fill="#6b5330"/>` +
    `<path d="M188,158h30l6,5l-6,5h-30z" fill="#f2ede0"/>` +
    `<path d="M188,170h24l5,5l-5,5h-24z" fill="#d8d0be"/>` +
    shade(226, 198, 11, 3, ".2") +
    person(225, 198, 23, "#e8443f") +
    arm(225, 185, 12, 8) +
    `<path d="M237,193v14" stroke="#8a6a44" stroke-width="2" fill="none"/>` +
    fir(268, 200, 30, "#2b4f39") +
    fir(292, 206, 24, "#2b4f39"),

  /**
   * ツェルマット。岩肌の村。
   * 主役は石の円盤に載った木造の穀物倉(ネズミ返し)。峰は右奥に置き、
   * 手前の路地に電気の運搬車を通す(自家用車が入れない村)。
   */
  alpine:
    sky("#6f9fca", "#e8e0dc", 134) +
    // 奥の峰(中央帯を外して右寄り)
    peakMt(316, 128, 108, 132, "#8a919c", "#666d79", 0.46) +
    peakMt(52, 120, 66, 96, "#7f8590", "#5f6672", 0.4) +
    `<path d="M0,124c48,-14 96,-10 150,4c48,12 108,10 160,-4c34,-9 62,-8 90,2v20H0z" fill="#5f6660"/>` +
    ground(134, "#6f6a5e") +
    fir(140, 140, 26, "#2b4f39") +
    fir(166, 144, 20, "#2b4f39") +
    // 穀物倉(左)。石の円盤の上に木の箱
    `<g fill="#6b5330"><rect x="18" y="124" width="5" height="12"/><rect x="44" y="124" width="5" height="12"/></g>` +
    `<g fill="#a8a094"><ellipse cx="20.5" cy="124" rx="11" ry="3.4"/><ellipse cx="46.5" cy="124" rx="11" ry="3.4"/></g>` +
    `<rect x="10" y="92" width="48" height="32" fill="#7f5228"/>` +
    `<g stroke="#5f3c1c" stroke-width="1.3" opacity=".7" fill="none"><path d="M10,98h48M10,104h48M10,110h48M10,116h48"/></g>` +
    `<path d="M4,92h60l-30,-14z" fill="#5a4a3c"/>` +
    `<g fill="#8a8578"><ellipse cx="18" cy="86" rx="3" ry="1.8"/><ellipse cx="34" cy="82" rx="3" ry="1.8"/><ellipse cx="50" cy="86" rx="3" ry="1.8"/></g>` +
    `<rect x="72" y="126" width="5" height="10" fill="#6b5330"/>` +
    `<ellipse cx="74.5" cy="126" rx="9" ry="3" fill="#a8a094"/>` +
    `<rect x="64" y="102" width="34" height="24" fill="#8a5a2c"/>` +
    `<path d="M60,102h42l-21,-11z" fill="#5a4a3c"/>` +
    // 村の家並み(右)
    chalet(264, 108, 54, 146, "#7f5228", "#4f4238") +
    chalet(330, 116, 50, 148) +
    spire(118, 140, 46) +
    // 路地
    ground(146, "#8a8272") +
    band(158, 52, "#7f7a6e") +
    `<g stroke="#6f6a5e" stroke-width="1.6" opacity=".7" fill="none"><path d="M0,172h400M0,190h400"/></g>` +
    // 電気の運搬車(手前・小さく低い)
    shade(150, 196, 30, 5, ".2") +
    `<rect x="118" y="170" width="64" height="22" rx="3" fill="#3f6b5f"/>` +
    `<rect x="122" y="162" width="30" height="10" rx="2" fill="#5f8f82"/>` +
    `<rect x="126" y="164" width="10" height="6" fill="#cfe4f0"/>` +
    `<g fill="#2f3338"><circle cx="132" cy="192" r="5"/><circle cx="170" cy="192" r="5"/></g>` +
    `<g fill="#8a6a44"><rect x="152" y="160" width="26" height="10" rx="1.6"/><rect x="156" y="152" width="18" height="8" rx="1.6"/></g>` +
    `<rect x="178" y="176" width="4" height="4" fill="#f5d06a"/>` +
    // 登る人(縮尺が伝わる)
    shade(238, 200, 10, 3, ".2") +
    person(237, 200, 22, "#e8443f") +
    arm(237, 188, 11, 7) +
    `<path d="M248,182v20" stroke="#8a8578" stroke-width="2" fill="none"/>` +
    `<rect x="230" y="180" width="14" height="12" rx="2.6" fill="#f5b31c"/>` +
    shade(300, 204, 10, 3, ".2") +
    person(299, 204, 20, "#3f5f7a") +
    arm(299, 193, -10, 6) +
    `<g fill="#8a8578"><ellipse cx="44" cy="196" rx="20" ry="8"/><ellipse cx="76" cy="204" rx="16" ry="6"/></g>`,

  /**
   * シュヴィーツ。建国憲章をしまってある文書館のある旧市街。
   * 窓の無いコンクリートの箱に青銅の扉。国の由来がこの一室にある。
   */
  founding:
    sky("#8fc4e8", "#dfe8ea", 124) +
    clouds(72, 26, 0.95) +
    peakMt(300, 116, 56, 92) +
    peakMt(360, 116, 40, 68) +
    hills(120, "#6f8a5f", 4) +
    ground(124, "#7f8a6a") +
    // 文書館(左)。窓が無い
    `<rect x="14" y="82" width="122" height="70" fill="#b8b8ae"/>` +
    `<rect x="14" y="76" width="122" height="8" fill="#9a9a90"/>` +
    `<g stroke="#a2a298" stroke-width="1.4" opacity=".9" fill="none"><path d="M14,96h122M14,112h122M14,128h122M52,76v76M98,76v76"/></g>` +
    `<path d="M56,152v-30a20,20 0 0 1 40,0v30z" fill="#7f6a3c"/>` +
    `<path d="M60,152v-28a16,16 0 0 1 32,0v28z" fill="#9a8248"/>` +
    `<circle cx="76" cy="136" r="4" fill="#6b5a30"/>` +
    `<g fill="#8a8578"><rect x="46" y="152" width="60" height="5"/><rect x="50" y="157" width="52" height="5"/></g>` +
    flagPole(150, 152, 46) +
    flagPole(168, 152, 46, "#5b8fe8") +
    // 旧市街(右)
    townHouse(252, 96, 44, 152, "#eae4d6", "#a8563c") +
    townHouse(300, 86, 42, 152, "#e0d6bf", "#8f4a38") +
    townHouse(346, 100, 46, 152, "#f0e8d8", "#a8563c") +
    spire(224, 152, 58) +
    // 広場
    ground(152, "#a89e8c") +
    `<g stroke="#948a78" stroke-width="1.6" opacity=".6" fill="none"><path d="M0,166h400M0,184h400M0,202h400M110,156v54M290,156v54"/></g>` +
    roundTree(126, 168, 18, "#3f7f4a") +
    roundTree(50, 176, 15, "#4f8f52") +
    // 手前:見学の列と、案内の立て札
    `<rect x="150" y="176" width="5" height="26" fill="#6b5330"/>` +
    `<rect x="128" y="168" width="50" height="16" fill="#e6ddc8"/>` +
    `<g stroke="#8a8272" stroke-width="1.6" opacity=".8" fill="none"><path d="M134,174h38M134,179h30"/></g>` +
    shade(202, 200, 11, 3, ".2") +
    person(201, 200, 23, "#5b8fe8") +
    arm(201, 187, 12, 6) +
    shade(232, 204, 11, 3, ".2") +
    person(231, 204, 21, "#c2453c") +
    arm(231, 193, -11, 5) +
    shade(262, 200, 10, 3, ".2") +
    person(261, 200, 19, "#4a6b52") +
    lamp(330, 168, 28),

  /**
   * アンデルマット。岩肌に紛れた要塞。
   * 納屋の壁に見える防爆扉、崩れた岩に見える銃眼、橋に取り付けられた装薬の箱。
   * 夕方。**この盤面の芯そのもの。**
   */
  fortress:
    sky("#4f6f9a", "#e0a878", 104) +
    sun(66, 62, 14, "#f0a860") +
    `<circle cx="66" cy="62" r="24" fill="#f8d8a8" opacity=".22"/>` +
    peakMt(180, 96, 78, 116, "#6b7280", "#4f5560", 0.5) +
    peakMt(340, 92, 60, 92, "#6b7280", "#4f5560", 0.5) +
    `<path d="M0,96c60,-12 130,-8 200,4c60,10 130,6 200,-8v20H0z" fill="#4a5150"/>` +
    ground(104, "#565c58") +
    fir(30, 120, 32, "#243f30") +
    fir(56, 126, 24, "#243f30") +
    // 岩の壁(右)と、その中の銃眼
    cliff(240, 96, 160, 78, "#6b7280", "#535a66") +
    `<g fill="#1f2328"><rect x="268" y="120" width="20" height="8" rx="1.4"/><rect x="322" y="134" width="22" height="8" rx="1.4"/><rect x="368" y="112" width="18" height="7" rx="1.4"/></g>` +
    `<g fill="#8a919c" opacity=".8"><path d="M266,120h24l-3,-4h-18zM320,134h26l-3,-4h-20z"/></g>` +
    // 納屋に化けた防爆扉(左)
    `<rect x="52" y="118" width="76" height="46" fill="#7f5228"/>` +
    `<g stroke="#5f3c1c" stroke-width="1.4" opacity=".75" fill="none"><path d="M52,126h76M52,134h76M52,142h76M52,150h76"/></g>` +
    `<path d="M44,118h92l-46,-16z" fill="#4f4238"/>` +
    `<rect x="74" y="130" width="32" height="34" fill="#5f6b6a"/>` +
    `<g stroke="#4a5352" stroke-width="2" fill="none"><path d="M90,130v34"/></g>` +
    `<g fill="#8a939c"><circle cx="84" cy="148" r="2.6"/><circle cx="96" cy="148" r="2.6"/></g>` +
    `<rect x="72" y="126" width="36" height="4" fill="#4a5352"/>` +
    // 鉄橋と装薬の箱(中景)
    `<rect x="130" y="140" width="120" height="6" fill="#4f565c"/>` +
    `<path d="M130,140l20,-14h30l20,14M200,140l20,-14h30l20,14" stroke="#3f454c" stroke-width="2.6" fill="none"/>` +
    `<g fill="#3f454c"><rect x="148" y="146" width="6" height="24"/><rect x="196" y="146" width="6" height="26"/><rect x="238" y="146" width="6" height="22"/></g>` +
    `<g fill="#c2453c"><rect x="164" y="132" width="10" height="8" rx="1.4"/><rect x="212" y="132" width="10" height="8" rx="1.4"/></g>` +
    `<path d="M169,140l4,26l38,-26" stroke="#e8b04a" stroke-width="1.6" fill="none"/>` +
    // 起爆器(手前・左)。ケーブルが橋から降りてくる
    ground(166, "#4f544e") +
    `<path d="M0,178c50,-14 110,-16 170,-6c50,8 120,6 180,-6c22,-4 38,-4 50,0v44H0z" fill="#3f443f"/>` +
    `<path d="M173,166q-40,14 -84,22" stroke="#e8b04a" stroke-width="1.6" fill="none"/>` +
    shade(78, 200, 20, 5, ".26") +
    `<rect x="60" y="176" width="38" height="22" rx="2.6" fill="#6b5330"/>` +
    `<rect x="64" y="180" width="30" height="8" fill="#3f3a34"/>` +
    `<rect x="74" y="166" width="10" height="12" rx="2" fill="#8a939c"/>` +
    `<circle cx="79" cy="192" r="3.4" fill="#c2453c"/>` +
    shade(126, 202, 11, 3, ".26") +
    person(125, 202, 23, "#5f6b52") +
    arm(125, 189, -12, 6) +
    `<path d="M116,190a8,6 0 0 1 16,0z" fill="#4f5a44"/>` +
    // 手前の岩(地面より2段暗く)
    `<g fill="#33383a"><ellipse cx="300" cy="196" rx="40" ry="12"/><ellipse cx="360" cy="206" rx="34" ry="10"/><ellipse cx="240" cy="206" rx="26" ry="8"/></g>` +
    `<g fill="#464d4e"><ellipse cx="292" cy="192" rx="18" ry="6"/><ellipse cx="352" cy="202" rx="14" ry="4.4"/></g>`,

  /**
   * ジュネーブ。国際機関の建物群と旗の列。
   * 手前に脚の折れた椅子(対人地雷禁止のモニュメント)、右奥の湖に大噴水。
   */
  international:
    sky("#8fc4e8", "#dfeaf0", 112) +
    clouds(78, 24, 0.9) +
    peakMt(348, 104, 44, 74) +
    hills(108, "#6f8a6a", 4) +
    ground(112, "#7f8f72") +
    // 湖と大噴水(右)
    band(112, 22, "#4a8fa8") +
    `<path d="M336,112V50c0,-6 6,-6 6,0v62z" fill="#f2f8fb" opacity=".9"/>` +
    `<path d="M330,112c0,-30 6,-52 9,-60c3,8 9,30 9,60z" fill="#e8f2f6" opacity=".55"/>` +
    `<g fill="#f6fbfd" opacity=".7"><ellipse cx="339" cy="112" rx="16" ry="5"/></g>` +
    `<g stroke="#bfe0f0" stroke-width="2" opacity=".6" fill="none"><path d="M280,124h50M356,120h40"/></g>` +
    // 国際機関の建物群
    `<rect x="0" y="70" width="150" height="64" fill="#e0dcd0"/>` +
    `<rect x="0" y="64" width="150" height="8" fill="#c9c4b6"/>` +
    `<g fill="#8a8578">${[8, 32, 56, 80, 104, 128].map((x) => `<rect x="${x}" y="80" width="12" height="40"/>`).join("")}</g>` +
    `<g fill="#4a5f70">${[11, 35, 59, 83, 107, 131].map((x) => `<rect x="${x}" y="84" width="6" height="32"/>`).join("")}</g>` +
    `<rect x="0" y="120" width="150" height="14" fill="#cfc7b4"/>` +
    `<rect x="176" y="86" width="118" height="48" fill="#d8d4c8"/>` +
    `<g fill="#5f7f96">${[182, 206, 230, 254, 278].map((x) => `<rect x="${x}" y="94" width="14" height="12"/>`).join("")}</g>` +
    `<g fill="#5f7f96">${[182, 206, 230, 254, 278].map((x) => `<rect x="${x}" y="112" width="14" height="12"/>`).join("")}</g>` +
    // 旗の列(繰り返しなので中央が隠れてよい)
    `<g>${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => flagPole(24 + i * 30, 152, 34, ["#e8443f", "#5b8fe8", "#f5b31c", "#4a6b52"][i % 4])).join("")}</g>` +
    // 広場
    ground(134, "#9a9382") +
    band(150, 8, "#b0a894") +
    `<g stroke="#8a8272" stroke-width="1.6" opacity=".6" fill="none"><path d="M0,170h400M0,190h400M120,158v52M300,158v52"/></g>` +
    // 脚の折れた椅子(手前・左寄り)
    shade(96, 202, 34, 6, ".2") +
    `<path d="M50,180h92v10H50z" fill="#8a6a44"/>` +
    `<path d="M50,180h92l-4,-6H54z" fill="#a8763c"/>` +
    `<path d="M126,174V128h14v46z" fill="#a8763c"/>` +
    `<path d="M56,190v14M132,190v14" stroke="#8a6a44" stroke-width="7" fill="none"/>` +
    `<path d="M92,190v6l-6,8" stroke="#8a6a44" stroke-width="7" fill="none"/>` +
    `<path d="M86,204l-4,-3l2,5z" fill="#6b5330"/>` +
    // 会議へ向かう人
    shade(248, 200, 11, 3, ".2") +
    person(247, 200, 24, "#2f3a44") +
    arm(247, 186, 12, 8) +
    `<rect x="258" y="190" width="13" height="10" rx="1.4" fill="#4a3a24"/>` +
    shade(288, 204, 11, 3, ".2") +
    person(287, 204, 22, "#8a3f4a") +
    arm(287, 192, -11, 6) +
    roundTree(360, 176, 17, "#3f7f4a") +
    lamp(190, 160, 28),

  /**
   * ニヨン。小さな湖の港。
   * 石の岸壁・繋がれた帆船・係船柱と綱。対岸はフランス側の山。
   */
  harbor:
    sky("#8fc4e8", "#e4eef2", 90) +
    clouds(316, 22, 0.9) +
    peakMt(96, 86, 40, 68, "#8a919c", "#6b7280", 0.36) +
    peakMt(300, 86, 34, 56, "#8a919c", "#6b7280", 0.36) +
    `<path d="M0,86c70,-10 150,-8 230,2c46,6 110,4 170,-4v14H0z" fill="#6f8578"/>` +
    // 湖
    lake(90, 68, "#3f7f9f", "#5b9eb8") +
    // 防波堤(左から突き出す)
    `<path d="M0,132h150l-8,10H0z" fill="#a8a094"/>` +
    `<rect x="0" y="128" width="150" height="5" fill="#c2b9a2"/>` +
    `<g fill="#8a8578">${[20, 60, 100, 136].map((x) => `<rect x="${x}" y="142" width="8" height="8"/>`).join("")}</g>` +
    `<rect x="140" y="106" width="10" height="24" fill="#f2ede0"/>` +
    `<rect x="139" y="100" width="12" height="7" fill="#c2453c"/>` +
    `<circle cx="145" cy="98" r="3" fill="#f5d06a"/>` +
    // 帆船(右)。波を遮ってから描く
    `<path d="M276,140c14,-6 74,-6 88,0c-10,10 -78,10 -88,0z" fill="#f2ede0"/>` +
    `<path d="M280,142c12,4 72,4 80,0z" fill="#5f6b72" opacity=".5"/>` +
    `<rect x="318" y="76" width="3" height="64" fill="#8a6a44"/>` +
    `<path d="M316,138V84l-26,54z" fill="#f6efe2"/>` +
    `<path d="M323,138V88l24,50z" fill="#e8eef0"/>` +
    `<path d="M323,124h14l10,14h-24z" fill="#5b8fe8"/>` +
    `<g fill="#3f4f5a" opacity=".28"><rect x="278" y="150" width="84" height="6"/></g>` +
    `<path d="M198,146c10,-5 40,-5 50,0c-6,7 -44,7 -50,0z" fill="#5f6b72"/>` +
    `<rect x="220" y="118" width="2.4" height="28" fill="#8a6a44"/>` +
    `<path d="M219,144V122l-16,22z" fill="#f2ede0"/>` +
    // 岸壁
    ground(158, "#a8a094") +
    `<rect x="0" y="154" width="400" height="6" fill="#c2b9a2"/>` +
    `<g stroke="#8f8a7c" stroke-width="1.6" opacity=".6" fill="none"><path d="M0,172h400M0,190h400M70,160v50M210,160v50M330,160v50"/></g>` +
    // 係船柱と綱(手前)
    `<g fill="#4a4f56"><rect x="106" y="170" width="16" height="24" rx="4"/><rect x="102" y="166" width="24" height="8" rx="3"/></g>` +
    `<g fill="#4a4f56"><rect x="286" y="176" width="16" height="24" rx="4"/><rect x="282" y="172" width="24" height="8" rx="3"/></g>` +
    `<path d="M114,172q40,26 90,20q56,-6 78,-20" stroke="#c9b48a" stroke-width="3" fill="none"/>` +
    `<path d="M114,176q42,28 92,22q54,-6 76,-22" stroke="#a89a72" stroke-width="2" fill="none"/>` +
    // 網と籠、釣り人
    `<g fill="#6b5330"><ellipse cx="46" cy="196" rx="20" ry="8"/></g>` +
    `<g stroke="#8a8578" stroke-width="1.3" opacity=".8" fill="none"><path d="M30,192h32M30,198h32M38,188v14M54,188v14"/></g>` +
    shade(348, 200, 11, 3, ".2") +
    person(347, 200, 23, "#4a6b52") +
    arm(347, 187, -13, -6) +
    `<path d="M334,181l-32,-8" stroke="#8a8578" stroke-width="1.6" fill="none"/>` +
    roundTree(180, 168, 14, "#3f7f4a") +
    lamp(250, 166, 28),

  /**
   * 川沿いの谷(シオン・ビアスカ)。
   * 両岸の斜面・段になった葡萄畑・落石防護網・谷底の線路と赤い列車。
   */
  valley:
    sky("#8fc4e8", "#e0e8e0", 96) +
    clouds(200, 22, 0.85) +
    // 谷の壁(左右から寄せる)
    `<path d="M0,52l70,40c26,15 44,32 52,52l4,66H0z" fill="#6f7566"/>` +
    `<path d="M400,44l-84,44c-28,15 -46,34 -52,56l-2,66h138z" fill="#5f6b5c"/>` +
    `<path d="M0,52l70,40c26,15 44,32 52,52l-30,4c-8,-20 -24,-36 -48,-50L0,74z" fill="#7f8570" opacity=".8"/>` +
    ground(96, "#7f8a6a") +
    cliff(0, 60, 74, 74, "#7f8590", "#5f6672") +
    rockNet(4, 66, 66, 56) +
    cliff(330, 52, 70, 70, "#7f8590", "#5f6672") +
    // 段になった葡萄畑(左)
    terraceWall(112, 8, 0, 150) +
    vineRow(112, 7, 5, 6, 144) +
    terraceWall(136, 9, 0, 176) +
    vineRow(136, 8, 6, 6, 170) +
    terraceWall(162, 10, 0, 132) +
    vineRow(162, 6, 7, 6, 126) +
    // 谷底
    ground(170, "#6f8a5a") +
    `<g fill="#5f7f4c"><ellipse cx="120" cy="188" rx="90" ry="12"/><ellipse cx="330" cy="200" rx="80" ry="12"/></g>` +
    // 川(手前を横切る)
    band(190, 20, "#5f9fb4") +
    `<g stroke="#bfe0f0" stroke-width="2.2" opacity=".6" fill="none"><path d="M20,196h70M240,194h100M120,204h80"/></g>` +
    `<g fill="#8a8578"><ellipse cx="66" cy="192" rx="12" ry="4"/><ellipse cx="286" cy="200" rx="14" ry="4.4"/></g>` +
    // 谷を走る線路と赤い列車(右)
    track(172, 180, 400) +
    railcar(238, 172, 74, 22) +
    railcar(318, 172, 74, 22) +
    // 教会と農家(中景・左)
    spire(196, 168, 44) +
    chalet(96, 142, 44, 168, "#7f5228", "#4f4238") +
    // 手前の葡萄の房と作業の人
    shade(60, 186, 12, 3.4, ".18") +
    person(59, 186, 23, "#c2453c") +
    arm(59, 173, 12, 7) +
    `<path d="M20,166c8,-9 18,-9 24,-3c-6,9 -16,10 -24,3z" fill="#4f8f3f"/>` +
    `<g fill="#6b4a7a"><circle cx="16" cy="180" r="5.4"/><circle cx="27" cy="180" r="5.4"/><circle cx="21" cy="189" r="5.4"/></g>` +
    `<g fill="#8a5f9a"><circle cx="14" cy="178" r="1.8"/><circle cx="25" cy="178" r="1.8"/></g>` +
    `<g fill="#a8763c"><rect x="96" y="176" width="26" height="18" rx="2.6"/></g>` +
    `<g fill="#6b4a7a"><circle cx="102" cy="176" r="3.4"/><circle cx="110" cy="175" r="3.4"/><circle cx="118" cy="176" r="3.4"/></g>`,

  /**
   * ラ・ショー=ド=フォン。碁盤目の工房町。雪。
   * **雪がいちばん明るい場面なので、建物は地面より2段暗くする**(手引き §4.2)。
   * 工房の長い窓列(採光)を描く。時計そのものは描かない。
   */
  industrialtown:
    sky("#8fa8c0", "#d8dfe4", 122) +
    `<g fill="#c4ccd4" opacity=".8"><ellipse cx="90" cy="30" rx="46" ry="12"/><ellipse cx="60" cy="40" rx="30" ry="8"/></g>` +
    // 奥の丘(雪をかぶった針葉樹の稜線)
    `<path d="M0,118c60,-16 130,-14 200,-2c58,10 130,6 200,-6v18H0z" fill="#5f6b66"/>` +
    `<g>${[16, 40, 64, 340, 366, 390].map((x, i) => fir(x, 122, 22 + (i % 3) * 5, "#2b4235")).join("")}</g>` +
    ground(122, "#e8eef4") +
    // 碁盤目に並ぶ長い工房(奥から手前へ3列)。壁は雪より2段暗い
    `<g>${[0, 1, 2].map((row) => {
      const y = 104 + row * 22;
      const h = 22 + row * 6;
      const wall = ["#8f8a80", "#7f7a70", "#6f6a60"][row];
      const roof = ["#5f5a52", "#524d46", "#45413b"][row];
      return [0, 1, 2, 3].map((i) => {
        const x = -10 + i * 106 + row * 12;
        return (
          `<rect x="${x}" y="${y}" width="86" height="${h}" fill="${wall}"/>` +
          `<path d="M${x - 4},${y}h94l-8,-7H${x + 4}z" fill="${roof}"/>` +
          `<rect x="${x - 4}" y="${y}" width="94" height="2.6" fill="#e8eef4"/>` +
          `<g fill="#c9d8e0">${[6, 20, 34, 48, 62, 74].map((dx) => `<rect x="${x + dx}" y="${y + 5}" width="9" height="${r1(h * 0.42)}"/>`).join("")}</g>` +
          `<g fill="#f5d06a" opacity=".85">${[20, 48].map((dx) => `<rect x="${x + dx}" y="${y + 5}" width="9" height="${r1(h * 0.42)}"/>`).join("")}</g>`
        );
      }).join("");
    }).join("")}</g>` +
    // 雪の通り(碁盤目の交差)
    ground(174, "#e8eef4") +
    drifts([
      [70, 186, 66, 10],
      [300, 196, 80, 11],
      [190, 204, 90, 10],
    ]) +
    `<g stroke="#c9d8e0" stroke-width="2.4" opacity=".9" fill="none"><path d="M0,182h400M0,198h400M96,174v36M256,174v36"/></g>` +
    // 除雪の跡と、雪をかく人
    `<path d="M0,190q100,-10 200,-2q100,8 200,-4" stroke="#cfdde6" stroke-width="7" fill="none"/>` +
    shade(122, 200, 12, 3.4, ".16") +
    person(121, 200, 24, "#3f4a5f") +
    arm(121, 186, 14, 8) +
    `<path d="M135,194l16,8" stroke="#8a6a44" stroke-width="2.4" fill="none"/>` +
    `<path d="M148,200h14v7h-14z" fill="#8a939c"/>` +
    shade(268, 204, 11, 3, ".16") +
    person(267, 204, 21, "#8a3f4a") +
    arm(267, 193, -11, 6) +
    lamp(58, 178, 32) +
    lamp(340, 182, 30) +
    `<g fill="#4a5158"><rect x="196" y="160" width="4" height="18"/></g>` +
    `<rect x="182" y="146" width="32" height="15" fill="#c2453c"/>` +
    `<g fill="#f6efe2"><rect x="196" y="149" width="4" height="9"/><rect x="193" y="152" width="10" height="3"/></g>`,

  /**
   * キアッソ。国境の駅。
   * 遮断機・検問の詰所・側線の貨車・金網。曇り。
   * **人は返され、貨物は通った**——同じ一本の線路の上で。
   */
  border:
    sky("#8a9aa8", "#c8d0d4", 104) +
    `<g fill="#b8c0c4" opacity=".9"><ellipse cx="120" cy="28" rx="60" ry="14"/><ellipse cx="290" cy="36" rx="70" ry="12"/></g>` +
    hills(100, "#5f6b5c", 4) +
    ground(104, "#7f8078") +
    // 駅の上屋(左)
    `<rect x="0" y="86" width="140" height="6" fill="#6f6a5e"/>` +
    `<path d="M0,86h146l-10,-12H0z" fill="#8a8578"/>` +
    `<g fill="#5f6b72">${[16, 56, 96, 128].map((x) => `<rect x="${x}" y="92" width="6" height="46"/>`).join("")}</g>` +
    `<rect x="0" y="98" width="86" height="40" fill="#d8d0be"/>` +
    `<g fill="#4a5f6b">${[8, 32, 56].map((x) => `<rect x="${x}" y="106" width="16" height="14"/>`).join("")}</g>` +
    `<rect x="30" y="124" width="18" height="14" fill="#5a4630"/>` +
    // 検問の詰所(右)
    `<rect x="286" y="94" width="76" height="48" fill="#e0dcd0"/>` +
    `<path d="M280,94h88l-8,-10h-72z" fill="#6f6a5e"/>` +
    `<g fill="#5f7f96"><rect x="294" y="104" width="20" height="16"/><rect x="326" y="104" width="20" height="16"/></g>` +
    `<rect x="300" y="126" width="18" height="16" fill="#5a4630"/>` +
    `<rect x="368" y="84" width="9" height="58" fill="#8a8f94"/>` +
    `<rect x="360" y="78" width="26" height="8" fill="#4a4f56"/>` +
    `<g fill="#f5d06a"><rect x="363" y="80" width="6" height="5"/><rect x="373" y="80" width="6" height="5"/></g>` +
    // 金網の柵(奥を横切る)
    `<g stroke="#7f868c" stroke-width="1" opacity=".8" fill="none">` +
    `<path d="M146,142V104M186,142V102M226,142V104M266,142V102"/>` +
    `<path d="M146,110h120M146,120h120M146,130h120M150,104l112,36M262,104l-112,36"/></g>` +
    `<g stroke="#5f676e" stroke-width="2" fill="none"><path d="M146,142V100M266,142V100M146,102h120"/></g>` +
    // 線路(3本)と側線の貨車
    ground(140, "#8a8578") +
    track(148, 0, 400) +
    track(166, 0, 400) +
    track(190, 0, 400) +
    `<rect x="0" y="128" width="96" height="20" rx="2" fill="#6f6a5e"/>` +
    `<g fill="#5a5650">${[6, 26, 46, 66].map((x) => `<rect x="${x}" y="132" width="14" height="12"/>`).join("")}</g>` +
    `<g fill="#3a3a3a"><circle cx="20" cy="148" r="3.4"/><circle cx="80" cy="148" r="3.4"/></g>` +
    `<rect x="112" y="126" width="104" height="22" rx="2" fill="#5f5a52"/>` +
    `<rect x="112" y="126" width="104" height="3.4" fill="#7f7a70"/>` +
    `<g fill="#3a3a3a"><circle cx="130" cy="148" r="3.4"/><circle cx="198" cy="148" r="3.4"/></g>` +
    `<g fill="#f5b31c"><rect x="140" y="132" width="18" height="10"/></g>` +
    railcar(276, 166, 96, 22, "#4a5f6b") +
    // 遮断機(手前・右)。赤白の縞
    `<g fill="#4a4f56"><rect x="316" y="164" width="10" height="34"/><rect x="308" y="196" width="26" height="6"/></g>` +
    `<path d="M320,168h-140v9h140z" fill="#f2ede0"/>` +
    `<g fill="#c2453c"><path d="M180,168h20v9h-20zM220,168h20v9h-20zM260,168h20v9h-20zM300,168h20v9h-20z"/></g>` +
    `<circle cx="322" cy="160" r="4.4" fill="#e8443f"/>` +
    // 待たされる人と、鞄(手前・中央下は隠れない)
    shade(150, 202, 11, 3, ".2") +
    person(149, 202, 23, "#4a4436") +
    arm(149, 189, 11, 8) +
    `<rect x="158" y="192" width="15" height="11" rx="1.6" fill="#6b4423"/>` +
    `<rect x="158" y="192" width="15" height="2.6" fill="#8a5a2c"/>` +
    shade(196, 206, 11, 3, ".2") +
    person(195, 206, 20, "#8a3f4a") +
    arm(195, 195, -10, 6) +
    `<rect x="176" y="196" width="12" height="9" rx="1.4" fill="#4a3a24"/>` +
    shade(238, 202, 10, 3, ".2") +
    person(237, 202, 24, "#3f5f4a") +
    arm(237, 188, 10, 6) +
    `<path d="M229,187a8,6 0 0 1 16,0z" fill="#2f4a38"/>` +
    lamp(88, 158, 34),

  /**
   * ベリンツォーナ。谷を塞ぐ城塞。
   * 丘の上の天守(左)から、**谷を横切る城壁**が右へ伸びる。
   * 城壁は「通行を止めるために国土に引いた線」なので、手前まで下ろす。
   */
  citadel:
    sky("#8fc4e8", "#f0dcb8", 104) +
    sun(70, 40, 15, "#f5c86a") +
    clouds(300, 22, 0.9) +
    peakMt(210, 92, 62, 100, "#8a919c", "#6b7280", 0.32) +
    peakMt(330, 92, 48, 80, "#8a919c", "#6b7280", 0.32) +
    `<path d="M0,92c50,-16 120,-14 190,-2c60,10 140,6 210,-8v22H0z" fill="#4f7048"/>` +
    ground(104, "#6f8f52") +
    // 丘と天守(左)
    `<path d="M0,150c30,-40 90,-58 140,-46l-6,50z" fill="#7f8f5a"/>` +
    `<rect x="30" y="72" width="66" height="44" fill="#b8ae98"/>` +
    `<g fill="#a2977f">${[30, 46, 62, 78, 90].map((x) => `<rect x="${x}" y="64" width="10" height="9"/>`).join("")}</g>` +
    `<rect x="16" y="52" width="26" height="64" fill="#c2b9a2"/>` +
    `<g fill="#a2977f">${[16, 28, 38].map((x) => `<rect x="${x}" y="46" width="8" height="7"/>`).join("")}</g>` +
    `<g fill="#3f4a52"><rect x="24" y="66" width="8" height="12"/><rect x="46" y="84" width="9" height="13"/><rect x="70" y="84" width="9" height="13"/></g>` +
    `<path d="M56,116V98a10,10 0 0 1 20,0v18z" fill="#5a4630"/>` +
    flagPole(102, 72, 30) +
    // 谷を横切る城壁
    `<path d="M96,110h250v16H96z" fill="#b0a894"/>` +
    `<g fill="#9a9082">${[100, 122, 144, 166, 188, 210, 232, 254, 276, 298, 320].map((x) => `<rect x="${x}" y="102" width="12" height="9"/>`).join("")}</g>` +
    `<rect x="96" y="122" width="250" height="4" fill="#8f8a7c"/>` +
    `<rect x="252" y="90" width="32" height="36" fill="#c2b9a2"/>` +
    `<g fill="#a2977f">${[252, 266, 276].map((x) => `<rect x="${x}" y="84" width="9" height="7"/>`).join("")}</g>` +
    `<rect x="262" y="98" width="10" height="14" fill="#3f4a52"/>` +
    // 城壁の内側の町
    ground(126, "#7f8f62") +
    townHouse(304, 128, 42, 166, "#eae4d6", "#a8563c") +
    townHouse(350, 136, 44, 166, "#e0d6bf", "#8f4a38") +
    // 手前の葡萄畑と栗の木
    ground(166, "#6f9f52") +
    terraceWall(170, 8, 0, 240) +
    vineRow(170, 7, 6, 6, 232) +
    `<g fill="#5f8f46"><ellipse cx="120" cy="196" rx="90" ry="12"/></g>` +
    roundTree(40, 200, 22, "#3f7f3f") +
    roundTree(330, 202, 18, "#4f8f4a") +
    shade(200, 200, 11, 3, ".2") +
    person(199, 200, 23, "#c2453c") +
    arm(199, 187, 12, 7) +
    `<g fill="#a8763c"><rect x="210" y="190" width="24" height="16" rx="2.6"/></g>` +
    `<g fill="#6b4a7a"><circle cx="216" cy="190" r="3.4"/><circle cx="224" cy="189" r="3.4"/><circle cx="231" cy="190" r="3.2"/></g>` +
    shade(268, 204, 10, 3, ".2") +
    person(267, 204, 20, "#4a6b52") +
    arm(267, 193, -10, 5),

  /**
   * アイローロ。トンネル工事の飯場。
   * 掘っている最中の坑口・ズリ山・トロッコ・角灯・仮の宿舎。夕暮れ。
   * ゴッタルドは掘った人が大勢死んでいる。**工事は風景ではなく労働。**
   */
  tunnellabor:
    sky("#4f6b90", "#d8a070", 110) +
    `<g fill="#e0b070" opacity=".4"><ellipse cx="330" cy="60" rx="60" ry="22"/></g>` +
    peakMt(120, 96, 70, 110, "#5f6672", "#464c56", 0.46) +
    peakMt(300, 92, 56, 90, "#5f6672", "#464c56", 0.46) +
    `<path d="M0,96c60,-10 130,-8 200,2c60,8 130,4 200,-8v22H0z" fill="#4a5148"/>` +
    ground(110, "#5a5f52") +
    // 坑口(左寄り)。木の支保工がむき出し
    portal(66, 156, 60, 52, "#7f7a6e") +
    `<g fill="#8a5a2c"><rect x="40" y="112" width="6" height="44"/><rect x="86" y="112" width="6" height="44"/><rect x="36" y="106" width="60" height="7"/></g>` +
    `<g stroke="#6b4423" stroke-width="2.4" fill="none"><path d="M46,120h40M46,134h40"/></g>` +
    `<circle cx="66" cy="130" r="4.4" fill="#f5d06a"/>` +
    `<circle cx="66" cy="130" r="10" fill="#f5d06a" opacity=".2"/>` +
    // ズリ山(掘り出した石の山・右)
    `<path d="M262,168c22,-46 62,-60 138,-52v52z" fill="#5f5a52"/>` +
    `<path d="M282,168c18,-34 52,-46 118,-42v42z" fill="#6f6a5e"/>` +
    `<g fill="#4f4a44"><ellipse cx="300" cy="152" rx="18" ry="6"/><ellipse cx="352" cy="138" rx="22" ry="7"/></g>` +
    // 仮の宿舎(中景)
    `<rect x="112" y="118" width="92" height="34" fill="#7f5228"/>` +
    `<path d="M106,118h104l-10,-11h-84z" fill="#4f4238"/>` +
    `<g stroke="#5f3c1c" stroke-width="1.3" opacity=".7" fill="none"><path d="M112,126h92M112,134h92M112,142h92"/></g>` +
    `<g fill="#f5d06a"><rect x="122" y="128" width="12" height="10"/><rect x="176" y="128" width="12" height="10"/></g>` +
    `<rect x="146" y="138" width="14" height="14" fill="#3f3428"/>` +
    `<rect x="200" y="96" width="8" height="24" fill="#8a8578"/>` +
    `<g fill="#c9cfd2" opacity=".55"><ellipse cx="208" cy="92" rx="14" ry="6"/><ellipse cx="226" cy="86" rx="10" ry="4.4"/></g>` +
    // 飯場の地面とトロッコの軌道
    ground(156, "#6b6558") +
    `<path d="M0,168c60,-10 130,-8 200,2c60,8 130,4 200,-6v46H0z" fill="#5a5548"/>` +
    track(178, 0, 400) +
    // トロッコ(手前)。石を積んで出てくる
    shade(140, 186, 26, 5, ".26") +
    `<path d="M104,158h68l-6,20h-56z" fill="#4a4f56"/>` +
    `<g fill="#7f7a6e"><ellipse cx="122" cy="158" rx="9" ry="4"/><ellipse cx="140" cy="156" rx="10" ry="4.4"/><ellipse cx="158" cy="158" rx="8" ry="3.6"/></g>` +
    `<g fill="#2f3338"><circle cx="118" cy="180" r="4.4"/><circle cx="158" cy="180" r="4.4"/></g>` +
    `<path d="M172,166l16,-4" stroke="#4a4f56" stroke-width="2.6" fill="none"/>` +
    // 人夫(角灯を持つ・押す)
    shade(200, 194, 11, 3, ".26") +
    person(199, 194, 23, "#8a6a44") +
    arm(199, 181, -12, 6) +
    `<rect x="182" y="184" width="8" height="10" rx="1.4" fill="#4a4f56"/>` +
    `<circle cx="186" cy="189" r="2.6" fill="#f5d06a"/>` +
    `<circle cx="186" cy="189" r="7" fill="#f5d06a" opacity=".2"/>` +
    shade(252, 198, 11, 3, ".26") +
    person(251, 198, 24, "#6b5330") +
    arm(251, 184, 12, 8) +
    `<path d="M263,192l14,6" stroke="#4a4436" stroke-width="2.4" fill="none"/>` +
    shade(310, 202, 10, 3, ".26") +
    person(309, 202, 20, "#5f5a52") +
    arm(309, 191, -10, 6) +
    // 手前の枕木の山
    `<g fill="#5a4630"><rect x="6" y="188" width="60" height="6" rx="1.4"/><rect x="10" y="180" width="60" height="6" rx="1.4"/><rect x="4" y="196" width="60" height="6" rx="1.4"/></g>` +
    lamp(348, 176, 30),

  /**
   * クール。大聖堂のある旧市街。
   * 聖堂は左に寄せ、右に山、手前に市の露店。アルプスの司教座は谷の交通の要でもあった。
   */
  cathedral:
    sky("#8fc4e8", "#e0e8ea", 120) +
    clouds(324, 24, 0.9) +
    peakMt(300, 112, 66, 104) +
    peakMt(376, 112, 48, 78) +
    `<path d="M0,112c60,-14 130,-10 200,2c56,10 130,6 200,-8v20H0z" fill="#5f7f56"/>` +
    ground(120, "#6f8a5f") +
    fir(268, 126, 24, "#2b4f39") +
    fir(288, 130, 20, "#2b4f39") +
    // 大聖堂(左)
    `<rect x="20" y="80" width="104" height="72" fill="#dfd8c8"/>` +
    `<path d="M14,80h116l-16,-14H30z" fill="#8f4a38"/>` +
    `<rect x="112" y="42" width="34" height="110" fill="#e6ddc8"/>` +
    `<rect x="108" y="38" width="42" height="6" fill="#cfc7b4"/>` +
    `<path d="M106,38h48l-24,-20z" fill="#5f6b72"/>` +
    `<g fill="#4a4436"><rect x="118" y="50" width="9" height="14" rx="4.5"/><rect x="131" y="50" width="9" height="14" rx="4.5"/></g>` +
    `<g fill="#5f7f96"><path d="M40,120V96a8,8 0 0 1 16,0v24zM68,120V96a8,8 0 0 1 16,0v24z"/></g>` +
    `<circle cx="72" cy="88" r="11" fill="#cfc7b4"/>` +
    `<circle cx="72" cy="88" r="8" fill="#3f5f9f"/>` +
    `<g fill="#f5b31c"><circle cx="72" cy="88" r="2.6"/></g>` +
    `<path d="M60,152v-22a12,12 0 0 1 24,0v22z" fill="#5a4630"/>` +
    `<rect x="128" y="26" width="2" height="10" fill="#8a8578"/>` +
    // 旧市街(右)
    townHouse(196, 104, 42, 152, "#eae4d6", "#a8563c") +
    townHouse(242, 94, 40, 152, "#e0d6bf", "#8f4a38") +
    townHouse(286, 108, 44, 152, "#f0e8d8", "#a8563c") +
    townHouse(334, 98, 42, 152, "#e6ddc8", "#8f4a38") +
    // 石畳の広場
    ground(152, "#a29a86") +
    `<g stroke="#8f8a7c" stroke-width="1.6" opacity=".6" fill="none"><path d="M0,166h400M0,184h400M0,202h400M96,156v54M286,156v54"/></g>` +
    // 手前の市(y>170)
    `<path d="M132,180h116l-8,-13h-100z" fill="#4a6b52"/>` +
    `<rect x="134" y="180" width="112" height="4" fill="#8a6a44"/>` +
    `<g fill="#6b5330"><rect x="138" y="184" width="4" height="14"/><rect x="238" y="184" width="4" height="14"/></g>` +
    `<g fill="#d8b45c"><ellipse cx="156" cy="188" rx="10" ry="5"/><ellipse cx="176" cy="188" rx="10" ry="5"/></g>` +
    `<g fill="#c2603c"><circle cx="200" cy="188" r="4.4"/><circle cx="211" cy="189" r="4.4"/><circle cx="222" cy="188" r="4.4"/></g>` +
    shade(96, 202, 12, 3.4, ".2") +
    person(95, 202, 24, "#5b8fe8") +
    arm(95, 188, 13, 7) +
    shade(288, 200, 11, 3, ".2") +
    person(287, 200, 22, "#8a3f4a") +
    arm(287, 188, -12, 6) +
    `<rect x="268" y="190" width="14" height="11" rx="2" fill="#a8763c"/>` +
    roundTree(52, 174, 15, "#3f7f4a") +
    lamp(346, 166, 28),

  /**
   * ダヴォス。バルコニーの並ぶ療養所。
   * 南向きのバルコニーで一日じゅう横になる場所。雪。夕方の斜光。
   */
  sanatorium:
    sky("#6f8fb8", "#e8c8a8", 120) +
    sun(58, 48, 14, "#f2b46a") +
    `<circle cx="58" cy="48" r="22" fill="#f8d8a8" opacity=".2"/>` +
    peakMt(150, 112, 74, 116, "#7f8590", "#5f6672", 0.56) +
    peakMt(316, 108, 60, 96, "#7f8590", "#5f6672", 0.56) +
    `<path d="M0,112c60,-14 130,-12 200,0c60,10 130,6 200,-8v22H0z" fill="#50594f"/>` +
    ground(120, "#dfe8ee") +
    `<g>${[10, 34, 58, 350, 376].map((x, i) => fir(x, 132, 26 + (i % 3) * 6, "#26402f")).join("")}</g>` +
    // 療養所(右)。バルコニーが段になって並ぶ
    `<rect x="228" y="82" width="164" height="72" fill="#d8d2c2"/>` +
    `<path d="M222,82h176l-14,-12H236z" fill="#6f6a5e"/>` +
    `<g>${[0, 1, 2].map((r) => {
      const y = 94 + r * 20;
      return (
        `<rect x="228" y="${y}" width="164" height="13" fill="#b8b2a2"/>` +
        `<rect x="228" y="${y + 13}" width="164" height="3" fill="#8f8a7c"/>` +
        `<g stroke="#9a9488" stroke-width="1.3" fill="none">${[236, 252, 268, 284, 300, 316, 332, 348, 364, 380].map((x) => `M${x},${y + 3}v10`).join("")}</g>` +
        `<g fill="#8a5a2c">${[240, 300, 356].map((x) => `<rect x="${x}" y="${y + 4}" width="18" height="6" rx="1.6"/>`).join("")}</g>` +
        `<g fill="#f2ede0">${[240, 300, 356].map((x) => `<rect x="${x}" y="${y + 3}" width="18" height="3"/>`).join("")}</g>`
      );
    }).join("")}</g>` +
    `<rect x="228" y="154" width="164" height="10" fill="#b0a894"/>` +
    // 診療棟(中景・左)
    `<rect x="86" y="118" width="76" height="36" fill="#cfc7b4"/>` +
    `<path d="M80,118h88l-10,-10H90z" fill="#8f4a38"/>` +
    `<g fill="#5f7f96"><rect x="94" y="126" width="14" height="12"/><rect x="118" y="126" width="14" height="12"/><rect x="142" y="126" width="14" height="12"/></g>` +
    `<rect x="112" y="142" width="16" height="12" fill="#5a4630"/>` +
    `<rect x="118" y="104" width="5" height="14" fill="#e8443f"/>` +
    `<rect x="113" y="108" width="15" height="5" fill="#e8443f"/>` +
    // 雪の斜面
    ground(158, "#e8eef4") +
    drifts([
      [80, 178, 76, 11],
      [300, 190, 90, 12],
      [190, 200, 96, 11],
    ]) +
    `<g stroke="#cfdde6" stroke-width="2.6" opacity=".9" fill="none"><path d="M0,186q100,-10 200,-2q100,8 200,-6"/></g>` +
    // 手前:毛布にくるまった寝椅子と、そりの跡
    shade(126, 200, 34, 6, ".14") +
    `<path d="M92,196h74l-4,-10H96z" fill="#8a5a2c"/>` +
    `<path d="M96,186h66l6,-22h-64z" fill="#a8763c"/>` +
    `<path d="M100,182h58l4,-14h-56z" fill="#c2b9a2"/>` +
    `<path d="M104,196v8M156,196v8" stroke="#6b5330" stroke-width="3" fill="none"/>` +
    `<g fill="#8a3f4a"><path d="M102,180h54l-3,10h-52z"/></g>` +
    `<circle cx="132" cy="164" r="6" fill="#e0b48a"/>` +
    `<path d="M126,160a6,5 0 0 1 12,0z" fill="#4a4436"/>` +
    shade(266, 204, 11, 3, ".14") +
    person(265, 204, 23, "#f6efe2", "#e0b48a") +
    arm(265, 191, 12, 6) +
    `<rect x="276" y="194" width="14" height="10" rx="2" fill="#5b8fe8"/>` +
    `<g stroke="#cfdde6" stroke-width="2" opacity=".9" fill="none"><path d="M300,208q20,-14 46,-18M312,210q20,-14 46,-18"/></g>` +
    lamp(200, 164, 30, "#f5d06a"),

  /**
   * サンモリッツ。凍った湖畔のリゾート。
   * 湖の氷の上に馬そりの跡。ホテルは左、氷上の人は手前。夕方の桃色。
   */
  resort:
    sky("#7f9cc4", "#f0c4b0", 118) +
    sun(340, 44, 15, "#f5b48a") +
    `<circle cx="340" cy="44" r="24" fill="#f8dcc8" opacity=".22"/>` +
    peakMt(96, 108, 68, 108, "#8a8f9c", "#666c7a", 0.62) +
    peakMt(250, 104, 54, 88, "#8a8f9c", "#666c7a", 0.62) +
    peakMt(360, 108, 46, 76, "#8a8f9c", "#666c7a", 0.62) +
    `<path d="M0,108c60,-12 130,-10 200,0c60,8 130,4 200,-8v22H0z" fill="#4f5850"/>` +
    ground(118, "#e4ecf2") +
    `<g>${[300, 322, 344, 372].map((x, i) => fir(x, 132, 24 + (i % 3) * 6, "#26402f")).join("")}</g>` +
    // 大ホテル(左)。塔と灯った窓
    `<rect x="6" y="76" width="132" height="66" fill="#e0d8c4"/>` +
    `<path d="M0,76h146l-12,-12H10z" fill="#6f5a52"/>` +
    `<rect x="24" y="52" width="26" height="24" fill="#e0d8c4"/>` +
    `<path d="M20,52h34l-17,-16z" fill="#6f5a52"/>` +
    `<rect x="98" y="56" width="24" height="20" fill="#e0d8c4"/>` +
    `<path d="M94,56h32l-16,-14z" fill="#6f5a52"/>` +
    `<g fill="#f5d06a">${[14, 38, 62, 86, 110].map((x) => `<rect x="${x}" y="86" width="12" height="12"/>`).join("")}</g>` +
    `<g fill="#4a5f70">${[14, 38, 62, 86, 110].map((x) => `<rect x="${x}" y="106" width="12" height="12"/>`).join("")}</g>` +
    `<g fill="#f5d06a"><rect x="30" y="60" width="10" height="10"/><rect x="104" y="62" width="10" height="9"/></g>` +
    `<path d="M56,142v-18a14,14 0 0 1 28,0v18z" fill="#5a4630"/>` +
    `<circle cx="70" cy="120" r="4" fill="#f5d06a"/>` +
    // 凍った湖(白と薄青の面)
    ground(142, "#dfe8f0") +
    `<g fill="#cfdde8"><ellipse cx="120" cy="164" rx="110" ry="14"/><ellipse cx="320" cy="176" rx="90" ry="13"/></g>` +
    `<g stroke="#b8cbd8" stroke-width="1.6" opacity=".9" fill="none"><path d="M0,158q90,-6 180,2q100,9 220,-4M0,180q100,-8 200,2q110,10 200,-6"/></g>` +
    // 馬そりの跡(氷の上の轍)
    `<g stroke="#c2d4e0" stroke-width="2.4" opacity=".9" fill="none"><path d="M400,196q-120,-16 -200,-30q-70,-12 -130,-10M400,204q-120,-16 -202,-30q-70,-12 -128,-8"/></g>` +
    // 馬そり(手前・右)
    shade(300, 198, 30, 5, ".16") +
    `<path d="M262,180h64l-4,12h-56z" fill="#5a4630"/>` +
    `<path d="M258,192h74" stroke="#8a939c" stroke-width="2.6" fill="none"/>` +
    `<path d="M326,180l14,-6" stroke="#6b5330" stroke-width="2.6" fill="none"/>` +
    `<g fill="#8a3f4a"><rect x="268" y="172" width="26" height="10" rx="2"/></g>` +
    person(280, 172, 18, "#3f4a5f") +
    `<path d="M340,174c8,-10 22,-10 30,0l-2,16h-8l-2,-8l-6,8h-8z" fill="#6b4423"/>` +
    `<path d="M368,174l8,-6l4,4l-8,6z" fill="#6b4423"/>` +
    `<circle cx="376" cy="171" r="2" fill="#3f3428"/>` +
    // 氷上を歩く人(手前・左)
    shade(146, 200, 11, 3, ".14") +
    person(145, 200, 23, "#c2453c") +
    arm(145, 187, 13, 6) +
    shade(184, 206, 10, 3, ".14") +
    person(183, 206, 20, "#3f5f7a") +
    arm(183, 195, -10, 5) +
    `<g fill="#4a4f56"><rect x="30" y="180" width="4" height="22"/></g>` +
    `<path d="M34,178h26l-4,6h-22z" fill="#e8443f"/>` +
    lamp(226, 160, 30),

  /**
   * ディセンティス。修道院のある谷。
   * 白い双塔の修道院は右、谷底を赤い列車が曲がっていく。
   */
  monasteryvalley:
    sky("#8fc4e8", "#dfe8e4", 110) +
    clouds(88, 24, 0.9) +
    peakMt(60, 100, 66, 104) +
    peakMt(180, 96, 52, 84) +
    peakMt(320, 100, 58, 92) +
    `<path d="M0,100c60,-14 130,-10 200,2c60,10 130,6 200,-8v20H0z" fill="#4f7048"/>` +
    ground(110, "#6f9f52") +
    fir(20, 126, 30, "#2b4f39") +
    fir(44, 132, 24, "#2b4f39") +
    // 修道院(右)。白い壁と双塔
    `<rect x="252" y="78" width="140" height="64" fill="#f2ede0"/>` +
    `<path d="M246,78h152l-14,-12H260z" fill="#8f4a38"/>` +
    `<g fill="#f6efe2"><rect x="256" y="48" width="26" height="30"/><rect x="358" y="48" width="26" height="30"/></g>` +
    `<g fill="#8f4a38"><path d="M252,48a17,12 0 0 1 34,0zM354,48a17,12 0 0 1 34,0z"/></g>` +
    `<g fill="#4a4436"><rect x="264" y="56" width="10" height="14" rx="5"/><rect x="366" y="56" width="10" height="14" rx="5"/></g>` +
    `<g fill="#8a8578"><rect x="268" y="34" width="1.8" height="9"/><rect x="370" y="34" width="1.8" height="9"/></g>` +
    `<g fill="#5f7f96">${[264, 292, 320, 348, 372].map((x) => `<rect x="${x}" y="90" width="14" height="18"/>`).join("")}</g>` +
    `<g fill="#5f7f96">${[264, 292, 320, 348, 372].map((x) => `<rect x="${x}" y="116" width="14" height="16"/>`).join("")}</g>` +
    `<path d="M304,142v-20a14,14 0 0 1 28,0v20z" fill="#5a4630"/>` +
    // 谷の段と牧草地
    ground(142, "#5f9450") +
    `<path d="M0,152c70,-12 150,-8 220,4c56,9 120,5 180,-6v60H0z" fill="#6f9f52"/>` +
    `<g fill="#4f8544"><ellipse cx="90" cy="180" rx="86" ry="12"/></g>` +
    // 谷底を行く赤い列車(手前・左から中央下へ)
    `<path d="M0,166h300l-8,10H0z" fill="#8a8578"/>` +
    track(174, 0, 300) +
    railcar(10, 174, 76, 22) +
    railcar(94, 174, 76, 22) +
    railcar(178, 174, 76, 22) +
    // 農家と干し草(中景・左)
    chalet(96, 116, 50, 142, "#7f5228", "#4f4238") +
    `<g fill="#6b5330"><rect x="48" y="120" width="3" height="22"/><rect x="82" y="120" width="3" height="22"/></g>` +
    `<g fill="#d8b45c"><path d="M48,128h37v-5H48zM48,136h37v-5H48z"/></g>` +
    // 手前の人と道
    ground(190, "#5f8f4a") +
    `<g fill="#4f8544"><ellipse cx="320" cy="200" rx="90" ry="12"/></g>` +
    shade(326, 198, 11, 3, ".2") +
    person(325, 198, 23, "#4a4436") +
    arm(325, 185, 12, 7) +
    `<path d="M317,184a8,6 0 0 1 16,0z" fill="#3f3428"/>` +
    shade(360, 204, 10, 3, ".2") +
    person(359, 204, 20, "#5b8fe8") +
    arm(359, 193, -10, 5) +
    `<g fill="#f5b31c"><circle cx="270" cy="196" r="2.2"/><circle cx="296" cy="204" r="2.2"/><circle cx="240" cy="200" r="2.2"/></g>`,

  /**
   * ツェルネッツ。手つかずの山林(国立公園)。
   * 建物は道標の柱だけ。倒木をそのままにしてある森と、朝の靄。
   */
  nationalpark:
    sky("#9cc0d0", "#e4ece8", 108) +
    `<g fill="#f2f6f4" opacity=".7"><ellipse cx="120" cy="60" rx="80" ry="12"/><ellipse cx="300" cy="52" rx="70" ry="10"/></g>` +
    peakMt(80, 100, 62, 98, "#8a8f9c", "#666c7a", 0.36) +
    peakMt(230, 96, 48, 78, "#8a8f9c", "#666c7a", 0.36) +
    peakMt(344, 100, 54, 86, "#8a8f9c", "#666c7a", 0.36) +
    `<path d="M0,100c60,-12 130,-10 200,0c60,8 130,4 200,-6v18H0z" fill="#3f5f46"/>` +
    ground(108, "#4f7048") +
    // 靄の帯(遠近を割る)
    `<g fill="#e0eae4" opacity=".55"><rect x="0" y="106" width="400" height="16"/></g>` +
    // 森(奥から手前へ3段。色を変えて層にする)
    `<g>${[6, 30, 54, 78, 102, 126, 150, 174, 198, 222, 246, 270, 294, 318, 342, 366, 390]
      .map((x, i) => fir(x, 128, 26 + (i % 4) * 5, "#2f6247"))
      .join("")}</g>` +
    `<g>${[0, 28, 56, 84, 112, 140, 168, 196, 224, 252, 280, 308, 336, 364, 392]
      .map((x, i) => fir(x, 150, 34 + (i % 3) * 8, "#26523c"))
      .join("")}</g>` +
    ground(148, "#3f6b44") +
    `<g>${[16, 62, 340, 386].map((x, i) => fir(x, 182, 46 + (i % 2) * 10, "#1f4433")).join("")}</g>` +
    // 下草と倒木(手前)
    ground(176, "#4f7a48") +
    `<g fill="#42663f"><ellipse cx="110" cy="192" rx="80" ry="12"/><ellipse cx="310" cy="202" rx="80" ry="12"/></g>` +
    `<path d="M96,190h150l-4,10H100z" fill="#6b5330"/>` +
    `<g stroke="#5a4630" stroke-width="1.4" opacity=".8" fill="none"><path d="M100,193h142M100,197h142"/></g>` +
    `<path d="M246,190l16,-8l4,7l-16,9z" fill="#5a4630"/>` +
    `<g fill="#3f7f4a"><ellipse cx="120" cy="188" rx="14" ry="5"/><ellipse cx="200" cy="188" rx="12" ry="4.4"/></g>` +
    `<g fill="#8a9a52"><ellipse cx="60" cy="204" rx="22" ry="7"/><ellipse cx="352" cy="196" rx="20" ry="6"/></g>` +
    // 鹿(林縁・左)。背より高い首と枝角で四つ足一般に落ちないようにする
    shade(56, 176, 16, 4, ".18") +
    `<path d="M34,176v-16h4v16zM64,176v-16h4v16z" fill="#6b4a30"/>` +
    `<path d="M30,160h42c4,0 6,2 6,6c0,4 -3,6 -8,6H36c-4,0 -6,-2 -6,-6z" fill="#8a5f3c"/>` +
    `<path d="M72,162l6,-16h6l-2,18z" fill="#8a5f3c"/>` +
    `<path d="M76,148a5,4 0 0 1 10,1l-1,3h-8z" fill="#7f5432"/>` +
    `<g stroke="#6b4a30" stroke-width="1.8" fill="none" stroke-linecap="round"><path d="M78,146l-4,-10l-5,3M78,146l2,-11l5,2M84,148l4,-9l4,4"/></g>` +
    `<circle cx="84" cy="152" r="1.2" fill="#2f2820"/>` +
    // 道標(人工物はこれだけ)
    `<rect x="286" y="150" width="5" height="40" fill="#8a6a44"/>` +
    `<path d="M291,152h32l7,5l-7,5h-32z" fill="#f5b31c"/>` +
    `<path d="M291,164h26l6,5l-6,5h-26z" fill="#f2ede0"/>` +
    `<g stroke="#8a6a44" stroke-width="1.4" opacity=".8" fill="none"><path d="M296,156h20M296,168h14"/></g>` +
    // 手前の岩(地面より2段暗く)
    `<g fill="#5f6660"><ellipse cx="238" cy="204" rx="26" ry="8"/><ellipse cx="286" cy="206" rx="18" ry="6"/></g>` +
    `<g fill="#727a72"><ellipse cx="232" cy="200" rx="14" ry="4.4"/></g>`,

  /**
   * ベルギューン。高架橋のかかる峡谷。
   * 石のアーチ橋・螺旋に巻く線路・トンネル坑口。**高度を稼ぐために山を彫った線。**
   */
  gorge:
    sky("#8fc4e8", "#dbe4e8", 96) +
    clouds(300, 20, 0.8) +
    // 峡谷の壁(左右)
    `<path d="M0,40l64,44c24,16 40,36 44,60l4,66H0z" fill="#66705f"/>` +
    `<path d="M400,34l-78,46c-26,16 -42,36 -46,60l-2,70h126z" fill="#576050"/>` +
    ground(96, "#5f6b56") +
    cliff(0, 44, 66, 90, "#7f8590", "#5f6672") +
    cliff(340, 40, 60, 84, "#7f8590", "#5f6672") +
    rockNet(4, 50, 56, 70) +
    // 上段の線路とトンネル坑口(左)
    portal(52, 108, 44, 40, "#8a8272") +
    track(108, 0, 130) +
    // 石造の高架橋(峡谷を渡す)
    viaduct(96, 340, 112, 176, 5) +
    track(112, 96, 340) +
    railcar(120, 112, 70, 20) +
    railcar(198, 112, 70, 20) +
    // 下段の線路(螺旋で戻ってくる)
    `<path d="M400,158H286c-30,0 -40,14 -40,26h-60" stroke="#9a9384" stroke-width="9" fill="none"/>` +
    `<path d="M400,158H286c-30,0 -40,14 -40,26h-60" stroke="#6f7a80" stroke-width="1.6" fill="none"/>` +
    portal(370, 168, 40, 36, "#8a8272") +
    // 峡谷の底の川
    ground(176, "#5a6450") +
    `<path d="M0,190c50,-12 110,-14 170,-4c50,8 120,6 180,-6c20,-4 34,-4 50,0v30H0z" fill="#4a5444"/>` +
    band(196, 14, "#5f9fb4") +
    `<g stroke="#bfe0f0" stroke-width="2" opacity=".6" fill="none"><path d="M20,200h60M240,202h100"/></g>` +
    `<g fill="#7f8578"><ellipse cx="120" cy="198" rx="16" ry="5"/><ellipse cx="220" cy="204" rx="12" ry="4"/><ellipse cx="330" cy="196" rx="14" ry="4.4"/></g>` +
    // 手前の樅と、橋を見上げる人
    fir(30, 200, 44, "#243f30") +
    fir(64, 208, 34, "#243f30") +
    fir(372, 204, 40, "#243f30") +
    shade(160, 194, 11, 3, ".2") +
    person(159, 194, 23, "#e8443f") +
    arm(159, 181, 12, -7) +
    `<rect x="168" y="170" width="12" height="9" rx="1.6" fill="#3f454c"/>` +
    shade(206, 198, 10, 3, ".2") +
    person(205, 198, 20, "#5b8fe8") +
    arm(205, 187, -10, -6),

  /**
   * ポスキアーヴォ。南向きの谷の斜面。
   * 石造の家・葡萄棚・栗の木、そして斜面を巻いて降りてくる赤い列車。
   * イタリア語圏の暖かい光にする。
   */
  southvalley:
    sky("#8fc4e8", "#f2dcb0", 100) +
    sun(60, 40, 16, "#f5c86a") +
    `<circle cx="60" cy="40" r="26" fill="#fdf0c8" opacity=".2"/>` +
    peakMt(230, 88, 60, 96, "#8a919c", "#6b7280", 0.3) +
    peakMt(340, 88, 48, 78, "#8a919c", "#6b7280", 0.3) +
    `<path d="M0,88c50,-18 120,-16 190,-2c60,12 140,8 210,-8v22H0z" fill="#4f7f46"/>` +
    ground(100, "#6f9f52") +
    // 斜面を巻く線路(奥)と赤い列車
    `<path d="M400,116q-90,6 -150,22q-60,18 -110,18H0" stroke="#9a9384" stroke-width="10" fill="none"/>` +
    `<path d="M400,116q-90,6 -150,22q-60,18 -110,18H0" stroke="#6f7a80" stroke-width="1.6" fill="none"/>` +
    railcar(300, 130, 70, 20) +
    railcar(226, 144, 64, 19) +
    // 石造の家並み(左と右)
    `<rect x="6" y="118" width="58" height="40" fill="#d8cdb6"/>` +
    `<path d="M0,118h70l-8,-10H8z" fill="#8a7a62"/>` +
    `<g fill="#5f7f96"><rect x="14" y="126" width="10" height="12"/><rect x="34" y="126" width="10" height="12"/><rect x="52" y="126" width="8" height="12"/></g>` +
    `<rect x="28" y="144" width="14" height="14" fill="#5a4630"/>` +
    `<rect x="70" y="126" width="52" height="34" fill="#e0d6bf"/>` +
    `<path d="M64,126h64l-8,-9H72z" fill="#8a7a62"/>` +
    `<g fill="#5f7f96"><rect x="78" y="134" width="10" height="11"/><rect x="98" y="134" width="10" height="11"/></g>` +
    `<g fill="#c2453c"><rect x="75" y="134" width="3" height="11"/><rect x="88" y="134" width="3" height="11"/><rect x="95" y="134" width="3" height="11"/><rect x="108" y="134" width="3" height="11"/></g>` +
    `<rect x="330" y="120" width="62" height="42" fill="#dfd2bb"/>` +
    `<path d="M324,120h74l-9,-10h-56z" fill="#8a7a62"/>` +
    `<g fill="#5f7f96"><rect x="338" y="128" width="11" height="13"/><rect x="360" y="128" width="11" height="13"/></g>` +
    spire(136, 160, 46) +
    // 段畑と葡萄棚
    ground(160, "#6f9f52") +
    terraceWall(164, 9, 0, 250) +
    vineRow(164, 7, 6, 6, 244) +
    // 手前の葡萄棚(柱と梁の下に日陰)
    `<g fill="#6b5330"><rect x="24" y="176" width="6" height="30"/><rect x="120" y="176" width="6" height="30"/><rect x="216" y="176" width="6" height="30"/></g>` +
    `<rect x="18" y="170" width="210" height="6" fill="#8a6a44"/>` +
    `<path d="M18,170h210l-6,-8H24z" fill="#4f8f3f"/>` +
    `<g fill="#3f7f34"><ellipse cx="60" cy="170" rx="26" ry="7"/><ellipse cx="140" cy="170" rx="30" ry="7"/><ellipse cx="200" cy="170" rx="24" ry="6"/></g>` +
    `<g fill="#6b4a7a"><circle cx="70" cy="180" r="4"/><circle cx="78" cy="181" r="4"/><circle cx="74" cy="187" r="4"/><circle cx="156" cy="180" r="4"/><circle cx="164" cy="181" r="4"/><circle cx="160" cy="187" r="4"/></g>` +
    // 手前の栗の木と人
    roundTree(300, 196, 24, "#3f7f3f") +
    roundTree(368, 204, 18, "#4f8f4a") +
    shade(176, 202, 11, 3, ".2") +
    person(175, 202, 23, "#c2453c") +
    arm(175, 189, 12, 7) +
    `<g fill="#a8763c"><rect x="186" y="192" width="24" height="15" rx="2.6"/></g>` +
    `<g fill="#6b4a7a"><circle cx="192" cy="192" r="3.4"/><circle cx="200" cy="191" r="3.4"/><circle cx="207" cy="192" r="3.2"/></g>` +
    shade(250, 206, 10, 3, ".2") +
    person(249, 206, 20, "#4a6b52") +
    arm(249, 195, -10, 5),
};

// ---------------------------------------------------------------------------
// 都市シンボル(24×24)
// ---------------------------------------------------------------------------
//
// 盤面では**直径19pxほどの点**にしかならない。守ること:
//   ・主役は1つ。細部は消える
//   ・**同系色の面を隣り合わせない。**縮小したときだけ輪郭が消える
//   ・下端(y=24)を影の楕円に載せる。台座か地面の帯を必ず置く
// 19pxと96pxを並べたシートを焼いて、目で確かめること。

export const SWITZERLAND_MARKS = {
  /** 連邦議事堂のドーム(ベルン)。緑青のドームと砂岩の躯体。 */
  federal:
    '<rect x="0.6" y="21.6" width="22.8" height="2.4" fill="#8a8578"/>' +
    '<rect x="3" y="12" width="18" height="9.6" fill="#e0d8c4"/>' +
    '<g fill="#a89e8c"><rect x="2" y="10.6" width="20" height="1.8"/><rect x="4.4" y="14.4" width="2.4" height="7.2"/><rect x="17.2" y="14.4" width="2.4" height="7.2"/></g>' +
    '<g fill="#3f4a52"><rect x="8.4" y="14.8" width="2.8" height="6.8"/><rect x="12.8" y="14.8" width="2.8" height="6.8"/></g>' +
    '<path d="M6.2,10.6a5.8,5 0 0 1 11.6,0z" fill="#4f7560"/>' +
    '<path d="M7.4,7.6a4.6,3.6 0 0 1 9.2,0z" fill="#5f8a72"/>' +
    '<rect x="5.6" y="9.6" width="12.8" height="1.6" fill="#3f6350"/>' +
    '<rect x="11.4" y="1.2" width="1.2" height="4.6" fill="#8a8578"/>' +
    '<path d="M12.6,1.2h5.4l-1.8,1.6l1.8,1.6h-5.4z" fill="#e8443f"/>',

  /** 金庫の扉(チューリヒ・ツーク・ルガーノ)。厚い鋼板とハンドル。 */
  bank:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#4a4f56"/>' +
    '<rect x="1.4" y="2" width="21.2" height="19.4" fill="#3f454c"/>' +
    '<circle cx="12.6" cy="11.6" r="8.6" fill="#8a939c"/>' +
    '<circle cx="12.6" cy="11.6" r="7" fill="#b8bfc6"/>' +
    '<circle cx="12.6" cy="11.6" r="3" fill="#5f676e"/>' +
    '<g stroke="#4a5158" stroke-width="1.5" stroke-linecap="round" fill="none"><path d="M12.6,4.8v3.4M12.6,15v3.4M5.8,11.6h3.4M16,11.6h3.4"/></g>' +
    '<g fill="#6f7880"><rect x="1.4" y="2" width="21.2" height="1.6"/><rect x="1.4" y="19.8" width="21.2" height="1.6"/></g>' +
    '<g fill="#f5b31c"><ellipse cx="4.6" cy="20" rx="3.4" ry="1.3"/><ellipse cx="4.6" cy="17.6" rx="3.4" ry="1.3"/></g>',

  /** 化学のフラスコ(バーゼル)。川へ流れた中身の色を入れる。 */
  chemical:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#5f6b72"/>' +
    '<rect x="17" y="5" width="5.4" height="16.4" fill="#9aa0a0"/>' +
    '<rect x="16.4" y="4" width="6.6" height="1.8" fill="#7f8686"/>' +
    '<path d="M9.6,2.4h4.6v6.2l6,12.8H3.6l6,-12.8z" fill="#e6f0f4"/>' +
    '<path d="M6.4,15.2h11l3.4,6.2H3z" fill="#c2453c"/>' +
    '<path d="M6.4,15.2h11l0.9,1.6H5.5z" fill="#e05a4c"/>' +
    '<rect x="8.8" y="1.2" width="6.2" height="2" rx="0.8" fill="#8a939c"/>' +
    '<g fill="#f6efe2" opacity=".85"><circle cx="8.6" cy="18" r="1.2"/><circle cx="12.4" cy="19.4" r="0.9"/></g>',

  /**
   * 岩壁に彫られた瀕死の獅子(ルツェルン)。暗い龕に明るい獅子。
   *
   * 胴だけの塊にすると19pxで**何かの染み**になる。たてがみを一回り暗い輪で
   * 囲い、前脚を前へ出して、頭が胴より高い形にする。
   */
  lion:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#6f7a5f"/>' +
    '<path d="M0.6,21.4V6.6q0,-5.4 5.6,-5.4h11.6q5.6,0 5.6,5.4v14.8z" fill="#8a8272"/>' +
    '<path d="M3,21.4V8q0,-4 4.2,-4h9.6q4.2,0 4.2,4v13.4z" fill="#413c36"/>' +
    '<path d="M9,20.4c-1.4,-4 0.6,-7 5,-7c3.6,0 6.4,1.8 7,7z" fill="#c9a05a"/>' +
    '<path d="M14,13.4c3.6,0 6.4,1.8 7,7h-3.4c-0.4,-3.4 -1.8,-5.4 -4.6,-6.2z" fill="#b98f48"/>' +
    '<circle cx="8" cy="12.6" r="5" fill="#a8783a"/>' +
    '<circle cx="8.4" cy="12.8" r="3.4" fill="#e0b96e"/>' +
    '<path d="M5.2,13.6q-1.6,1.6 -0.6,3.4q1.4,-0.6 2.2,-2z" fill="#e0b96e"/>' +
    '<circle cx="6.8" cy="12" r="0.9" fill="#3f3428"/>' +
    '<path d="M5.6,14.4q1.4,1 3,0.2" stroke="#3f3428" stroke-width="0.7" fill="none"/>' +
    '<path d="M9.4,20.4q-1,-3.4 -4.4,-3.4l-0.6,3.4z" fill="#d8b070"/>' +
    '<path d="M17.6,13.6q2.4,-1.4 3.6,-4.4" stroke="#8a939c" stroke-width="1.4" fill="none"/>',

  /** 火砲(トゥーン)。砲身・車輪・脚。 */
  cannon:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#8a8a72"/>' +
    '<path d="M7,14.6L21.4,7.4l1.6,3.2L8.6,17.8z" fill="#4f5a44"/>' +
    '<rect x="19.6" y="6.2" width="3.6" height="3.4" rx="1" fill="#3f4a38"/>' +
    '<path d="M2,20.4l8.6,-5l1.8,3l-8.6,5z" fill="#5f6b52"/>' +
    '<circle cx="9.6" cy="16.2" r="5.4" fill="#3f4a38"/>' +
    '<circle cx="9.6" cy="16.2" r="2.6" fill="#7f8a6a"/>' +
    '<circle cx="9.6" cy="16.2" r="1" fill="#3f4a38"/>' +
    '<g fill="#5f6b52"><rect x="4.4" y="12.4" width="7.4" height="2" rx="0.8"/></g>',

  /** 糸巻きと針(ザンクトガレン)。刺繍の町。 */
  textile:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#8a8272"/>' +
    '<path d="M6.2,21.4l1.4,-3.6h8.8l1.4,3.6z" fill="#a8763c"/>' +
    '<rect x="5.4" y="3.4" width="11.2" height="2.6" rx="0.8" fill="#8a5a2c"/>' +
    '<rect x="5.4" y="17.2" width="11.2" height="2.6" rx="0.8" fill="#8a5a2c"/>' +
    '<rect x="8.6" y="5.4" width="4.8" height="12.2" fill="#6b4423"/>' +
    '<path d="M7.4,6.8h6.6v10.2H7.4z" fill="#e8a8c0"/>' +
    '<g stroke="#c97fa8" stroke-width="0.9" fill="none"><path d="M7.4,8.4h6.6M7.4,10.4h6.6M7.4,12.4h6.6M7.4,14.4h6.6M7.4,16.4h6.6"/></g>' +
    '<path d="M14,7.4q6,1.6 6,7.4" stroke="#e8a8c0" stroke-width="1.2" fill="none"/>' +
    '<path d="M20.4,3.6l1.4,1.2l-6.4,11l-1,-1.4z" fill="#b8bfc6"/>' +
    '<circle cx="21" cy="3.6" r="1.4" fill="#8a939c"/>' +
    '<circle cx="21" cy="3.6" r="0.6" fill="#4a5158"/>',

  /** 崩れた壁(シャフハウゼン・シュタンス)。欠けた輪郭で「壊れた」と分かる。 */
  ruin:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#7f8a6a"/>' +
    '<path d="M2.6,21.4V7.4l5.4,-2.6v3.4l4.6,-2.4V9l5.6,-2.6v15z" fill="#c2b9a2"/>' +
    '<path d="M2.6,21.4V7.4l5.4,-2.6v3.4l1.6,-0.8v14z" fill="#a2977f"/>' +
    '<path d="M12.6,21.4l1.6,-8.6l-2.6,-1.4l3.4,-4.4l-0.4,4l2.6,1.4l-2.2,9z" fill="#5f5a52"/>' +
    '<g fill="#8f8a7c"><rect x="4.2" y="10.6" width="3.4" height="2.6"/><rect x="4.2" y="15.4" width="3.4" height="2.6"/></g>' +
    '<g fill="#8f8a7c"><ellipse cx="20" cy="20.4" rx="3.4" ry="1.8"/><ellipse cx="16.6" cy="21.6" rx="2.6" ry="1.4"/></g>' +
    '<path d="M18.2,6.4l3.4,1.6v13.4h-3.4z" fill="#a2977f"/>',

  /** 歯車(ヴィンタートゥール)。歯を大きく取って輪郭で読ませる。 */
  gear:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#6f6a5e"/>' +
    `<g fill="#4f5a62">${[0, 1, 2, 3, 4, 5, 6, 7]
      .map((i) => {
        const a = (i * Math.PI) / 4;
        const cx = r1(11.6 + 9.2 * Math.cos(a));
        const cy = r1(11.6 + 9.2 * Math.sin(a));
        return `<rect x="${r1(cx - 2.4)}" y="${r1(cy - 2.4)}" width="4.8" height="4.8" rx="1"/>`;
      })
      .join("")}</g>` +
    '<circle cx="11.6" cy="11.6" r="8.4" fill="#5f6b72"/>' +
    '<circle cx="11.6" cy="11.6" r="6.6" fill="#8a939c"/>' +
    '<circle cx="11.6" cy="11.6" r="3.2" fill="#3f454c"/>' +
    '<g stroke="#5f6b72" stroke-width="1.4" fill="none"><path d="M11.6,5v2.6M11.6,15.6v2.6M5,11.6h2.6M15.6,11.6h2.6"/></g>' +
    '<path d="M4,20.4h16v1.4H4z" fill="#8a8272"/>',

  /** 初期の蒸気機関車の動輪(バーデン)。連接棒とレールを添える。 */
  rail:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#9a9384"/>' +
    '<g fill="#6b5330"><rect x="2" y="19" width="4.4" height="2.4"/><rect x="10" y="19" width="4.4" height="2.4"/><rect x="18" y="19" width="4.4" height="2.4"/></g>' +
    '<rect x="0" y="18" width="24" height="1.6" fill="#5f6b72"/>' +
    '<circle cx="11.4" cy="11.4" r="9.4" fill="#3f454c"/>' +
    '<circle cx="11.4" cy="11.4" r="7.4" fill="#a8a8a0"/>' +
    `<g stroke="#3f454c" stroke-width="1.5" fill="none">${[0, 1, 2, 3, 4, 5]
      .map((i) => {
        const a = (i * Math.PI) / 6 + 0.3;
        return `<path d="M${r1(11.4 - 7 * Math.cos(a))},${r1(11.4 - 7 * Math.sin(a))}L${r1(11.4 + 7 * Math.cos(a))},${r1(11.4 + 7 * Math.sin(a))}"/>`;
      })
      .join("")}</g>` +
    '<circle cx="11.4" cy="11.4" r="3" fill="#c2453c"/>' +
    '<circle cx="11.4" cy="11.4" r="1.2" fill="#3f454c"/>' +
    '<path d="M14,14.4l8.4,-3.4l0.8,2.4l-8.4,3.4z" fill="#8a939c"/>',

  /** 封蝋のついた巻物(アーラウ・シュヴィーツ)。 */
  charter:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#8a8578"/>' +
    '<path d="M3.4,20.6V5.4h17.2v15.2z" fill="#f2e8cc"/>' +
    '<path d="M3.4,5.4h17.2v1.8H3.4z" fill="#dcd0ac"/>' +
    '<g stroke="#b8a878" stroke-width="1" fill="none"><path d="M6,9h12M6,11.6h12M6,14.2h9"/></g>' +
    '<path d="M1,4.6q0,-2.4 2.6,-2.4h17q2.6,0 2.6,2.4q0,2.4 -2.6,2.4h-17q-2.6,0 -2.6,-2.4z" fill="#e0d0a0"/>' +
    '<path d="M1,4.6q0,-2.4 2.6,-2.4q2.6,0 2.6,2.4q0,2.4 -2.6,2.4q-2.6,0 -2.6,-2.4z" fill="#c9b880"/>' +
    '<path d="M17.8,4.6q0,-2.4 2.6,-2.4q2.6,0 2.6,2.4q0,2.4 -2.6,2.4q-2.6,0 -2.6,-2.4z" fill="#c9b880"/>' +
    '<path d="M14.6,15.4h3.4l-1.7,4z" fill="#c2453c"/>' +
    '<circle cx="16.3" cy="18.6" r="3.2" fill="#c2453c"/>' +
    '<circle cx="16.3" cy="18.6" r="1.6" fill="#a03830"/>',

  /** 円卓と旗(ゾロトゥルン・ジュネーブ・ロカルノ)。 */
  diplomacy:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#8a8578"/>' +
    '<g fill="#8a8f94"><rect x="10.6" y="4" width="1.4" height="10"/><rect x="13.2" y="3" width="1.4" height="11"/></g>' +
    '<path d="M12,4h6.6v4.6H12z" fill="#e8443f"/>' +
    '<g fill="#f6efe2"><rect x="14.6" y="5.2" width="1.4" height="2.4"/><rect x="13.8" y="5.8" width="3" height="1.2"/></g>' +
    '<path d="M4.4,3h6.2v4.6H4.4z" fill="#5b8fe8"/>' +
    '<ellipse cx="12" cy="15.4" rx="10.6" ry="3.8" fill="#a8763c"/>' +
    '<ellipse cx="12" cy="14.6" rx="10.6" ry="3.8" fill="#c9964a"/>' +
    '<ellipse cx="12" cy="14.6" rx="6.4" ry="2.2" fill="#b0803c"/>' +
    '<g fill="#4a4436"><rect x="1.4" y="16.2" width="2.6" height="5.2" rx="0.8"/><rect x="20" y="16.2" width="2.6" height="5.2" rx="0.8"/><rect x="10.6" y="18" width="2.8" height="3.4" rx="0.8"/></g>',

  /** 挙手と投票箱(アッペンツェル)。 */
  ballot:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#7f8a6a"/>' +
    '<path d="M3.4,21.4V10.6h17.2v10.8z" fill="#a8763c"/>' +
    '<path d="M3.4,10.6h17.2v2.2H3.4z" fill="#c9964a"/>' +
    '<rect x="7.4" y="11.2" width="9.2" height="1.6" rx="0.6" fill="#4a3a24"/>' +
    '<g stroke="#8a5a2c" stroke-width="1" fill="none"><path d="M3.4,16h17.2M12,12.8v8.6"/></g>' +
    '<path d="M10,10.6L11.4,3.4h3.4l1.2,7.2z" fill="#f2ede0" opacity=".9"/>' +
    '<path d="M16.6,9.6V4.2q0,-1.4 1.4,-1.4q1.4,0 1.4,1.4v3.4l0.6,-2.4q0.3,-1.2 1.5,-0.9q1.2,0.3 0.9,1.5l-1.2,5q-0.6,2.4 -3,2.4h-1.6z" fill="#e0b48a"/>' +
    '<path d="M16.6,4.2q0,-1.4 1.4,-1.4q1.4,0 1.4,1.4v1h-2.8z" fill="#efc79c"/>',

  /**
   * 広場に挙がる手の群れ(グラールス)。
   *
   * 指を縦棒4本で描くと、19pxでは**蝋燭の列**にしか見えなかった。
   * 掌を面で取り、**親指を横に出す**と手として読める。
   */
  assembly:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#9a9082"/>' +
    '<path d="M0,21.4c2,-3.6 6,-5.4 12,-5.4s10,1.8 12,5.4z" fill="#3f5260"/>' +
    '<g fill="#324450"><circle cx="4" cy="17.4" r="2.4"/><circle cx="12" cy="16.6" r="2.4"/><circle cx="20" cy="17.4" r="2.4"/></g>' +
    // 左の手
    '<path d="M2.6,18.6v-6.2q-1.6,-0.4 -1.8,-1.8q-0.2,-1.4 1.2,-1.4q1,0 1.8,1.4V7.4q0,-1 1,-1q1,0 1,1v2.2V6.6q0,-1 1,-1q1,0 1,1v3.6V7.6q0,-1 1,-1q1,0 1,1v5.8q0,5.2 -4,5.2z" fill="#e0b48a"/>' +
    // 中央の手(いちばん高い)
    '<path d="M9.6,18v-9.4q-1.6,-0.4 -1.8,-1.8q-0.2,-1.4 1.2,-1.4q1,0 1.8,1.4V3.4q0,-1 1,-1q1,0 1,1v3.2V2.4q0,-1 1,-1q1,0 1,1v4.2V3.6q0,-1 1,-1q1,0 1,1v6.8q0,7.6 -4,7.6z" fill="#efc79c"/>' +
    // 右の手
    '<path d="M16.8,18.6v-6.6q-1.4,-0.4 -1.6,-1.6q-0.2,-1.4 1.2,-1.4q1,0 1.6,1.2V6.6q0,-1 1,-1q1,0 1,1v3.2V5.6q0,-1 1,-1q1,0 1,1v3.6V6.6q0,-1 1,-1q1,0 1,1v6.8q0,5.2 -3.8,5.2z" fill="#e0b48a"/>' +
    '<g stroke="#c08a5c" stroke-width="0.7" fill="none"><path d="M4.6,10.4v2.4M6.6,10v2.6M12,7v2.6M14,6.6v3M19,10v2.4M21,9.6v2.6"/></g>',

  /**
   * 弩と林檎(アルトドルフ)。伝説の意匠として使う。
   *
   * 弓を細い弧で描いたら、19pxでは**旗の立った柱**に見えた。
   * 弓の腕を太くし、林檎を上に大きく置いて、矢が貫いている形にする。
   */
  crossbow:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#8a8272"/>' +
    '<path d="M9.6,21.4v-8.4h4.8v8.4z" fill="#8a5a2c"/>' +
    '<path d="M14.4,17.6l5.4,3.8h-5.4z" fill="#6b4423"/>' +
    '<path d="M1.6,11.6q10.4,-7.4 20.8,0" stroke="#6b4423" stroke-width="3.4" fill="none" stroke-linecap="round"/>' +
    '<path d="M1.6,11.6q10.4,-4 20.8,0" stroke="#e0dcd0" stroke-width="1.2" fill="none"/>' +
    '<rect x="7.6" y="10.6" width="8.8" height="3.6" rx="1" fill="#a8763c"/>' +
    '<rect x="11.2" y="1.6" width="1.8" height="11.4" fill="#8a939c"/>' +
    '<path d="M12.1,0.4l2,3.2h-4z" fill="#b8bfc6"/>' +
    '<circle cx="12.1" cy="7" r="4.6" fill="#e8443f"/>' +
    '<path d="M12.1,2.4a4.6,4.6 0 0 1 4.6,4.6a4.6,4.6 0 0 1 -4.6,4.6z" fill="#c2453c"/>' +
    '<path d="M11.4,3q-0.4,-1.8 -2.6,-2.4q1.4,2 2.2,2.6z" fill="#4f8f3f"/>' +
    '<g fill="#f6efe2" opacity=".55"><ellipse cx="10" cy="5.6" rx="1.2" ry="0.8"/></g>',

  /** アーチのトンネル坑口(ブリーク・ビアスカ)。 */
  tunnelportal:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#9a9384"/>' +
    '<path d="M1,21.4V6.6h22v14.8z" fill="#8a8272"/>' +
    '<path d="M1,6.6h22v2.2H1z" fill="#6f6a5e"/>' +
    '<path d="M5,21.4v-8.2a7,7 0 0 1 14,0v8.2z" fill="#c2b9a2"/>' +
    '<path d="M6.8,21.4v-8a5.2,5.2 0 0 1 10.4,0v8z" fill="#241f1c"/>' +
    `<g stroke="#6f6a5e" stroke-width="0.9" fill="none">${[0, 1, 2, 3, 4, 5, 6]
      .map((i) => {
        const a = Math.PI + (i * Math.PI) / 6;
        return `<path d="M${r1(12 + 5.2 * Math.cos(a))},${r1(13.4 + 5.2 * Math.sin(a))}L${r1(12 + 7 * Math.cos(a))},${r1(13.4 + 7 * Math.sin(a))}"/>`;
      })
      .join("")}</g>` +
    '<g fill="#6b5330"><rect x="8" y="19.6" width="2.6" height="1.8"/><rect x="13.4" y="19.6" width="2.6" height="1.8"/></g>' +
    '<g fill="#5f6b72"><rect x="8.6" y="18.4" width="1.2" height="3"/><rect x="14.2" y="18.4" width="1.2" height="3"/></g>',

  /** 二つ並んだ峰(ツェルマット・サンモリッツ)。 */
  peak:
    '<rect x="0" y="21" width="24" height="3" fill="#e8eef4"/>' +
    '<path d="M0.6,21L8,4.6l6.4,16.4z" fill="#7f8590"/>' +
    '<path d="M8,4.6L11.4,12l-1.6,-0.6l-1.4,1l-1.4,-1.2l-1.2,0.9z" fill="#f4f8fb"/>' +
    '<path d="M8,4.6l6.4,16.4h-2.6L8,10z" fill="#616873"/>' +
    '<path d="M11.6,21L17.6,8.6L23.4,21z" fill="#8f959e"/>' +
    '<path d="M17.6,8.6l2.8,6l-1.4,-0.5l-1.2,0.9l-1.2,-1l-1,0.8z" fill="#f4f8fb"/>' +
    '<path d="M17.6,8.6L23.4,21h-2.2l-3.6,-8.6z" fill="#6b7280"/>' +
    '<path d="M2.4,21l1.8,-4.4L6,21z" fill="#2f5f3f"/>',

  /** 岩肌に隠れた銃眼(アンデルマット)。岩の中の黒い横筋。 */
  bunker:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#5f6660"/>' +
    '<path d="M0.6,21.4V8q3.4,-4.6 8,-5.6q6.4,-1.4 11,2q4,3 3.8,7.4v9.6z" fill="#7f8590"/>' +
    '<path d="M8.6,2.4q6.4,-1.4 11,2q4,3 3.8,7.4v9.6h-4.6V9.4q0,-4 -3.4,-5.6z" fill="#616873"/>' +
    '<path d="M3.4,13.4h15v4.6h-15z" fill="#4a5158"/>' +
    '<path d="M4.6,14.4h12.6v2.8H4.6z" fill="#15181a"/>' +
    '<path d="M17.2,15l4.6,-1.4v2.6l-4.6,-0.4z" fill="#3f454c"/>' +
    '<g stroke="#4f545c" stroke-width="0.9" opacity=".8" fill="none"><path d="M5,6.4l1.6,4M12.6,4.4l-1,3.6M19.6,8l1,3.4"/></g>' +
    '<g fill="#2f5f3f"><ellipse cx="4" cy="7.4" rx="3" ry="1.4"/><ellipse cx="20.4" cy="6.6" rx="2.4" ry="1.2"/></g>',

  /** トロフィーと笛(ローザンヌ・ニヨン)。 */
  sportbody:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#8a8578"/>' +
    '<rect x="6.6" y="19" width="10.8" height="2.6" rx="0.8" fill="#8a5a2c"/>' +
    '<rect x="9.4" y="15.4" width="5.2" height="3.8" fill="#d8a91c"/>' +
    '<path d="M6.4,3.4h11.2v6q0,5.6 -5.6,5.6q-5.6,0 -5.6,-5.6z" fill="#f5b31c"/>' +
    '<path d="M12,3.4h5.6v6q0,5.6 -5.6,5.6z" fill="#d8a91c"/>' +
    '<path d="M6.4,4.6H4q-2.2,0 -2.2,2.4q0,3.4 4.6,3.8z" fill="#f5b31c"/>' +
    '<path d="M17.6,4.6H20q2.2,0 2.2,2.4q0,3.4 -4.6,3.8z" fill="#f5b31c"/>' +
    '<rect x="5.6" y="2.4" width="12.8" height="1.8" rx="0.6" fill="#e0a015"/>' +
    '<path d="M16.4,16.6q4.6,0.6 5.8,3.4" stroke="#c9c0ac" stroke-width="1" fill="none"/>' +
    '<path d="M18.6,17.4h4.4v3.6h-4.4z" fill="#5f6b72"/>' +
    '<circle cx="20.4" cy="19.2" r="1" fill="#3f454c"/>',

  /** 書類鞄(ヴヴェイ)。 */
  briefcase:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#8a8578"/>' +
    '<path d="M8.4,7.4V5q0,-1.4 1.4,-1.4h4.4q1.4,0 1.4,1.4v2.4h-2V5.8h-3.2v1.6z" fill="#4a3a24"/>' +
    '<rect x="4.4" y="6" width="15.2" height="3" fill="#f2ede0"/>' +
    '<rect x="6" y="4.4" width="12" height="2.6" fill="#e0dcd0"/>' +
    '<rect x="1.6" y="7.4" width="20.8" height="13.6" rx="1.8" fill="#8a5a2c"/>' +
    '<rect x="1.6" y="12.6" width="20.8" height="2.4" fill="#6b4423"/>' +
    '<rect x="1.6" y="7.4" width="20.8" height="1.8" rx="0.9" fill="#a8763c"/>' +
    '<g fill="#f5b31c"><rect x="8" y="11.6" width="3.4" height="4.4" rx="0.8"/><rect x="13.4" y="11.6" width="3.4" height="4.4" rx="0.8"/></g>' +
    '<g fill="#4a3a24"><rect x="9" y="13.4" width="1.4" height="1.4"/><rect x="14.4" y="13.4" width="1.4" height="1.4"/></g>',

  /** 炎とギター(モントルー)。焼けた会場と、そこで鳴っていた音。 */
  flame:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#4a4436"/>' +
    '<path d="M12,1.4c4.4,4 7.6,7.4 7.6,11.6c0,4.6 -3.4,7.6 -7.6,7.6s-7.6,-3 -7.6,-7.6c0,-4.2 3.2,-7.6 7.6,-11.6z" fill="#e8443f"/>' +
    '<path d="M12,6c2.8,3 4.8,5.2 4.8,8c0,3.2 -2.2,5.2 -4.8,5.2s-4.8,-2 -4.8,-5.2c0,-2.8 2,-5 4.8,-8z" fill="#f5b31c"/>' +
    '<path d="M12,11.6c1.4,1.6 2.4,2.6 2.4,4c0,1.6 -1.1,2.6 -2.4,2.6s-2.4,-1 -2.4,-2.6c0,-1.4 1,-2.4 2.4,-4z" fill="#f8e08a"/>' +
    '<path d="M8.4,19.6a4.2,4 0 0 1 8.4,0a4.2,4 0 0 1 -8.4,0z" fill="#3f3428"/>' +
    '<path d="M9.6,14.6a3,2.8 0 0 1 6,0a3,2.8 0 0 1 -6,0z" fill="#3f3428"/>' +
    '<rect x="11.4" y="4" width="1.8" height="11" fill="#3f3428"/>' +
    '<rect x="10.6" y="2.6" width="3.4" height="2" rx="0.6" fill="#241f1c"/>' +
    '<circle cx="12.6" cy="18.4" r="1.6" fill="#8a5a2c"/>' +
    '<g stroke="#c9c0ac" stroke-width="0.5" fill="none"><path d="M11.8,5v13M12.8,5v13"/></g>',

  /** 開いた本(イヴェルドン)。 */
  book:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#8a8578"/>' +
    '<path d="M1.2,18.6V6q4.4,-2.4 9.6,-1.4v13.4q-5.2,-1 -9.6,0.6z" fill="#dfd8c8"/>' +
    '<path d="M22.8,18.6V6q-4.4,-2.4 -9.6,-1.4v13.4q5.2,-1 9.6,0.6z" fill="#f2ede0"/>' +
    '<path d="M1.2,18.6q4.4,-1.6 9.6,-0.6h2.4q5.2,-1 9.6,0.6l-1.6,3q-4,-1.2 -8,-0.4h-2.4q-4,-0.8 -8,0.4z" fill="#3f5f9f"/>' +
    '<rect x="10.8" y="4.4" width="2.4" height="14.2" fill="#2f4a7a"/>' +
    '<g stroke="#b8ae98" stroke-width="0.8" fill="none"><path d="M3.4,8.4h5.4M3.4,10.6h5.4M3.4,12.8h4"/></g>' +
    '<g stroke="#c9c0ac" stroke-width="0.8" fill="none"><path d="M15,8.4h5.4M15,10.6h5.4M15,12.8h4"/></g>' +
    '<path d="M12,4.4v14.2" stroke="#f5b31c" stroke-width="1" fill="none"/>',

  /** 二つに割れた吹き出し(フリブール)。言語の境界の町。 */
  speech:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#8a8578"/>' +
    '<path d="M1,4.6q0,-2.6 2.6,-2.6h6.8v12.4H6.6l-3.4,3.4v-3.4H3.6q-2.6,0 -2.6,-2.6z" fill="#5b8fe8"/>' +
    '<path d="M23,7.4q0,-2.6 -2.6,-2.6H13.6v12.4h3.8l3.4,3.4v-3.4h-0.4q2.6,0 2.6,-2.6z" fill="#e8443f"/>' +
    '<g fill="#f6efe2"><rect x="3.4" y="5.4" width="5" height="1.4"/><rect x="3.4" y="8.4" width="5" height="1.4"/><rect x="3.4" y="11.4" width="3.4" height="1.4"/></g>' +
    '<g fill="#f6efe2"><rect x="15.6" y="8.4" width="5" height="1.4"/><rect x="15.6" y="11.4" width="5" height="1.4"/><rect x="17.2" y="14.4" width="3.4" height="1.4"/></g>' +
    '<path d="M11.4,1v20" stroke="#3f3428" stroke-width="1.4" stroke-dasharray="2 2" fill="none"/>',

  /** 王冠(ヌーシャテル)。 */
  crown:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#8a8578"/>' +
    '<path d="M3.4,19.4h17.2v2h-17.2z" fill="#c9962c"/>' +
    '<path d="M2.4,7.4l4.6,4.2l5,-7.6l5,7.6l4.6,-4.2l-1.6,12h-16z" fill="#f5b31c"/>' +
    '<path d="M12,4l5,7.6l4.6,-4.2l-1.6,12h-7z" fill="#e0a015"/>' +
    '<rect x="4" y="15.4" width="16" height="2.4" fill="#c9962c"/>' +
    '<g fill="#e8443f"><circle cx="12" cy="17" r="1.8"/></g>' +
    '<g fill="#5b8fe8"><circle cx="7" cy="17" r="1.4"/><circle cx="17" cy="17" r="1.4"/></g>' +
    '<g fill="#f6efe2"><circle cx="2.4" cy="6.6" r="1.6"/><circle cx="21.6" cy="6.6" r="1.6"/><circle cx="12" cy="3" r="1.8"/></g>',

  /** ダムの堤(シオン)。せき止められた水と放流。 */
  dam:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#6f7566"/>' +
    '<path d="M0,2.4h24v9.6H0z" fill="#4a8fa8"/>' +
    '<g stroke="#bfe0f0" stroke-width="1" opacity=".7" fill="none"><path d="M2,5h7M14,4h8M4,8.4h6M15,9h6"/></g>' +
    '<path d="M0,12q6,-3.4 12,-3.4q6,0 12,3.4v3.4q-6,-3 -12,-3q-6,0 -12,3z" fill="#c2c6c2"/>' +
    '<path d="M0,15.4q6,-3 12,-3q6,0 12,3v6H0z" fill="#9aa0a0"/>' +
    '<path d="M0,15.4q6,-3 12,-3v9H0z" fill="#aab0ae"/>' +
    '<g stroke="#7f8686" stroke-width="0.9" fill="none"><path d="M4,13.6v7.8M8,12.8v8.6M12,12.4v9M16,12.8v8.6M20,13.6v7.8"/></g>' +
    '<path d="M10.4,15.4h3.2l1.4,6h-6z" fill="#e8f2f6"/>' +
    '<g fill="#f6fbfd"><ellipse cx="12" cy="21.4" rx="5" ry="1.8"/></g>',

  /**
   * 掲げた拳と旗(ドゥレモン)。新しい州を自分たちで作った町。
   *
   * 掌を平らな面で描いたら、19pxでは**肌色の塊**にしかならなかった。
   * 指の関節を4つのこぶで出し、親指を手前に横切らせる。
   */
  fist:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#8a8578"/>' +
    '<rect x="15.6" y="1.4" width="1.8" height="20" fill="#8a6a44"/>' +
    '<path d="M17.4,2.2h6.2v6.4h-6.2z" fill="#e8443f"/>' +
    '<path d="M17.4,2.2h6.2v3.2h-6.2z" fill="#f6efe2"/>' +
    '<path d="M4,21.4v-5.6q0,-1.6 1.6,-1.6h7.4q1.6,0 1.6,1.6v5.6z" fill="#d8a97c"/>' +
    '<path d="M2.6,14.2q0,-2.4 2.4,-2.4q2.4,0 2.4,2.4q0,-2.4 2.4,-2.4q2.4,0 2.4,2.4q0,-2.4 2.4,-2.4q1.6,0 1.6,2.4v2.2H2.6z" fill="#e0b48a"/>' +
    '<path d="M3.4,11.8q0.6,-3.4 4.6,-3.4h4.6q3.4,0 3.6,3.4z" fill="#efc79c"/>' +
    '<path d="M2.4,17.6q-1.4,-0.6 -1,-2q0.4,-1.4 2,-1q1.4,0.4 2.6,2l-0.6,2.6q-1.6,-1 -3,-1.6z" fill="#e0b48a"/>' +
    '<g stroke="#a8764c" stroke-width="1" fill="none"><path d="M7.4,12v4.4M9.8,11.8v4.6M12.2,12v4.4M4.4,18.2h9.8"/></g>',

  /** 街路の格子(ラ・ショー=ド=フォン)。火事のあと引き直した町割り。 */
  grid:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#8a8578"/>' +
    '<rect x="0.6" y="1.4" width="22.8" height="20" fill="#e8eef4"/>' +
    `<g fill="#5f6b72">${[0, 1, 2].flatMap((r) => [0, 1, 2].map((c) => `<rect x="${r1(2.4 + c * 7.2)}" y="${r1(3.2 + r * 6.2)}" width="5.6" height="4.6"/>`)).join("")}</g>` +
    `<g fill="#8f959e">${[0, 1, 2].flatMap((r) => [0, 1, 2].map((c) => `<rect x="${r1(2.4 + c * 7.2)}" y="${r1(3.2 + r * 6.2)}" width="5.6" height="1.2"/>`)).join("")}</g>` +
    '<g stroke="#b8c4cc" stroke-width="0.8" fill="none"><path d="M0.6,8.6h22.8M0.6,14.8h22.8M8.6,1.4v20M15.8,1.4v20"/></g>' +
    '<g fill="#c2453c"><rect x="9.4" y="9.6" width="5.4" height="4.4"/></g>' +
    '<g fill="#f5b31c"><circle cx="8.6" cy="8.6" r="1"/><circle cx="15.8" cy="14.8" r="1"/></g>' +
    '<rect x="0.6" y="1.4" width="22.8" height="20" fill="none" stroke="#4a5158" stroke-width="1.4"/>',

  /** 遮断機と検問(キアッソ)。 */
  border:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#7f8078"/>' +
    '<rect x="15.6" y="9" width="7.4" height="12.4" fill="#e0dcd0"/>' +
    '<path d="M14.6,9h9.4l-2,-3h-5.4z" fill="#6f6a5e"/>' +
    '<rect x="17.4" y="11.4" width="4" height="4.4" fill="#4a5f6b"/>' +
    '<g fill="#4a4f56"><rect x="10.6" y="5.4" width="3" height="16"/><rect x="8.6" y="19.6" width="7" height="1.8"/></g>' +
    '<path d="M10.6,7.4H0.6v3.6h10z" fill="#f2ede0"/>' +
    '<g fill="#c2453c"><path d="M0.6,7.4h2.6v3.6H0.6zM5.4,7.4h2.6v3.6H5.4z"/></g>' +
    '<circle cx="12.1" cy="3.6" r="2.2" fill="#e8443f"/>' +
    '<circle cx="12.1" cy="3.6" r="0.9" fill="#f8c8b8"/>' +
    '<g stroke="#8a939c" stroke-width="0.9" fill="none"><path d="M2,13.4v8M5.4,13.4v8M2,15.4h3.4M2,18.4h3.4"/></g>',

  /** 城の塔(ベリンツォーナ)。狭間と矢狭間。 */
  castle:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#7f8f5a"/>' +
    '<path d="M2.4,21.4V13h6.2v8.4z" fill="#a2977f"/>' +
    '<g fill="#8f8a7c"><rect x="2.4" y="11" width="2.4" height="2.2"/><rect x="6.2" y="11" width="2.4" height="2.2"/></g>' +
    '<path d="M8.2,21.4V5.4h9.6v16z" fill="#c2b9a2"/>' +
    '<g fill="#a2977f"><rect x="7.6" y="3" width="3" height="2.6"/><rect x="11.6" y="3" width="3" height="2.6"/><rect x="15.4" y="3" width="3" height="2.6"/></g>' +
    '<rect x="7.6" y="5.4" width="10.8" height="1.6" fill="#a2977f"/>' +
    '<path d="M17.8,21.4V14h4.6v7.4z" fill="#a2977f"/>' +
    '<g fill="#8f8a7c"><rect x="17.8" y="12" width="2" height="2.2"/><rect x="20.6" y="12" width="1.8" height="2.2"/></g>' +
    '<g fill="#3f4a52"><rect x="11.4" y="8.4" width="2.2" height="4.4" rx="1.1"/></g>' +
    '<path d="M10.4,21.4v-4.6a2.6,2.6 0 0 1 5.2,0v4.6z" fill="#5a4630"/>' +
    '<rect x="12.6" y="0.6" width="1" height="2.6" fill="#8a8578"/>',

  /** 交差したつるはし(アイローロ)。掘る側の道具。 */
  pickaxe:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#6b6558"/>' +
    '<g fill="#5f5a52"><ellipse cx="12" cy="19.6" rx="9" ry="3"/></g>' +
    '<path d="M4.4,4.6l16,15.6l-2,2l-16,-15.6z" fill="#8a5a2c"/>' +
    '<path d="M19.6,4.6l-16,15.6l2,2l16,-15.6z" fill="#a8763c"/>' +
    '<path d="M1.6,7.4q1,-4.6 6,-6l1,2.4q-3.6,1.2 -4.4,4.4z" fill="#8a939c"/>' +
    '<path d="M22.4,7.4q-1,-4.6 -6,-6l-1,2.4q3.6,1.2 4.4,4.4z" fill="#b8bfc6"/>' +
    '<path d="M1.6,7.4q1,-4.6 6,-6l0.4,1.2q-4,1.6 -5,5.2z" fill="#6f7880"/>' +
    '<g fill="#7f7a6e"><ellipse cx="6" cy="20.6" rx="3.4" ry="1.6"/><ellipse cx="17.6" cy="21" rx="2.6" ry="1.2"/></g>',

  /** 司教冠(クール)。 */
  mitre:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#8a8578"/>' +
    '<path d="M6.6,19.4l-2.4,2.4l-1.6,-1l1.6,-5.4zM17.4,19.4l2.4,2.4l1.6,-1l-1.6,-5.4z" fill="#e0d0a0"/>' +
    '<path d="M4.6,17.4V12q0,-6 7.4,-11q7.4,5 7.4,11v5.4z" fill="#f2ede0"/>' +
    '<path d="M12,1q7.4,5 7.4,11v5.4H12z" fill="#e0dcd0"/>' +
    '<rect x="4.6" y="17.4" width="14.8" height="2.6" fill="#f5b31c"/>' +
    '<path d="M11,6.4h2v11h-2z" fill="#f5b31c"/>' +
    '<path d="M7.6,10.4h8.8v2h-8.8z" fill="#f5b31c"/>' +
    '<g fill="#e8443f"><circle cx="12" cy="11.4" r="1.4"/></g>' +
    '<g fill="#5b8fe8"><circle cx="7.4" cy="18.6" r="0.9"/><circle cx="12" cy="18.6" r="0.9"/><circle cx="16.6" cy="18.6" r="0.9"/></g>',

  /** 医療の十字と山(ダヴォス)。高地の療養所。 */
  lungs:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#e8eef4"/>' +
    '<path d="M0,21.4L7.4,7l6.6,14.4z" fill="#7f8590"/>' +
    '<path d="M7.4,7l3,6.4l-1.4,-0.5l-1.2,0.9l-1.2,-1l-1.2,0.8z" fill="#f4f8fb"/>' +
    '<path d="M12.6,21.4L18.6,9.4l5.4,12z" fill="#616873"/>' +
    '<rect x="6.4" y="10.6" width="12" height="11.2" rx="1.4" fill="#f6efe2"/>' +
    '<rect x="6.4" y="10.6" width="12" height="1.8" rx="0.9" fill="#dfd8c8"/>' +
    '<path d="M10.6,13h3.6v2.8h2.8v3.6h-2.8v2.4h-3.6v-2.4H7.8v-3.6h2.8z" fill="#e8443f"/>' +
    '<g fill="#c9d8e0"><ellipse cx="3.4" cy="21" rx="3.4" ry="1.4"/><ellipse cx="21" cy="21.4" rx="3" ry="1.2"/></g>',

  /** 鐘楼のある修道院(ディセンティス)。白い壁と玉ねぎ屋根。 */
  monastery:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#6f9f52"/>' +
    '<path d="M2.4,21.4V11h19.2v10.4z" fill="#f2ede0"/>' +
    '<path d="M1,11h22l-2.6,-3.4H3.6z" fill="#8f4a38"/>' +
    '<rect x="4.4" y="3.4" width="6" height="7.6" fill="#f6efe2"/>' +
    '<rect x="13.6" y="3.4" width="6" height="7.6" fill="#e8e2d4"/>' +
    '<path d="M3.6,3.4q0,-3.4 3.8,-3.4q3.8,0 3.8,3.4z" fill="#8f4a38"/>' +
    '<path d="M12.8,3.4q0,-3.4 3.8,-3.4q3.8,0 3.8,3.4z" fill="#7f4030"/>' +
    '<g fill="#4a4436"><rect x="6" y="5" width="2.8" height="4" rx="1.4"/><rect x="15.2" y="5" width="2.8" height="4" rx="1.4"/></g>' +
    '<g fill="#5f7f96"><rect x="3.6" y="13.6" width="3" height="3.6"/><rect x="10.6" y="13.6" width="3" height="3.6"/><rect x="17.6" y="13.6" width="3" height="3.6"/></g>' +
    '<path d="M9,21.4v-3.6a3,3 0 0 1 6,0v3.6z" fill="#5a4630"/>',

  /** 守られた木(ツェルネッツ)。手を触れない決まりで囲われた一本。 */
  leaf:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#4f7048"/>' +
    '<path d="M11,21.4V9.4h2.4v12z" fill="#6b5330"/>' +
    '<path d="M12.2,3q6.4,3.6 6.4,8.6q0,4.4 -6.4,7.4q-6.4,-3 -6.4,-7.4q0,-5 6.4,-8.6z" fill="#3f8f4f"/>' +
    '<path d="M12.2,3q6.4,3.6 6.4,8.6q0,4.4 -6.4,7.4z" fill="#2f7040"/>' +
    '<path d="M12.2,3.4v15.6" stroke="#f2ede0" stroke-width="0.9" opacity=".7" fill="none"/>' +
    '<g stroke="#f2ede0" stroke-width="0.7" opacity=".55" fill="none"><path d="M12.2,7.4l-3.6,2M12.2,7.4l3.6,2M12.2,11.4l-4,2.4M12.2,11.4l4,2.4"/></g>' +
    '<g fill="#8a6a44"><rect x="1.6" y="12" width="1.8" height="9.4"/><rect x="21" y="12" width="1.8" height="9.4"/></g>' +
    '<g stroke="#8a6a44" stroke-width="1.4" fill="none"><path d="M1.6,15h21.2M1.6,19h21.2"/></g>',

  /** 弧を描く高架橋(ベルギューン)。 */
  viaduct:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#5f7f4c"/>' +
    '<path d="M0,21.4V13.4h24v8z" fill="#b0a894"/>' +
    '<path d="M2,21.4v-4.6a2.6,2.6 0 0 1 5.2,0v4.6zM9.4,21.4v-4.6a2.6,2.6 0 0 1 5.2,0v4.6zM16.8,21.4v-4.6a2.6,2.6 0 0 1 5.2,0v4.6z" fill="#3f5f4a"/>' +
    '<rect x="0" y="10.6" width="24" height="3" fill="#c2b9a2"/>' +
    '<rect x="0" y="9" width="24" height="1.8" fill="#a2977f"/>' +
    '<g stroke="#9a9082" stroke-width="0.8" opacity=".8" fill="none"><path d="M8.2,13.4v8M15.6,13.4v8"/></g>' +
    '<rect x="4.4" y="4" width="15.2" height="5" rx="1.4" fill="#c8102e"/>' +
    '<g fill="#cfe4f0"><rect x="6" y="5.4" width="2.6" height="2.4"/><rect x="10" y="5.4" width="2.6" height="2.4"/><rect x="14" y="5.4" width="2.6" height="2.4"/></g>' +
    '<rect x="4.4" y="4" width="15.2" height="1.2" rx="0.6" fill="#f2ede0" opacity=".6"/>',

  /** 旅行鞄(ポスキアーヴォ)。峠を越えて働きに出た町。 */
  suitcase:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#8a8578"/>' +
    '<path d="M9,6.4V4.6q0,-1.6 1.6,-1.6h2.8q1.6,0 1.6,1.6v1.8h-1.8V5h-2.4v1.4z" fill="#4a3a24"/>' +
    '<rect x="1.6" y="6.4" width="20.8" height="14.6" rx="2" fill="#a8763c"/>' +
    '<rect x="1.6" y="6.4" width="20.8" height="2" rx="1" fill="#c9964a"/>' +
    '<g fill="#6b4423"><rect x="5.6" y="6.4" width="2.6" height="14.6"/><rect x="15.8" y="6.4" width="2.6" height="14.6"/></g>' +
    '<g fill="#f5b31c"><rect x="5.2" y="12" width="3.4" height="2.4" rx="0.6"/><rect x="15.4" y="12" width="3.4" height="2.4" rx="0.6"/></g>' +
    '<rect x="9.4" y="10.4" width="5.4" height="4.4" fill="#e8443f"/>' +
    '<g fill="#f6efe2"><rect x="11.6" y="11.2" width="1" height="2.8"/><rect x="10.8" y="12.2" width="2.6" height="1"/></g>' +
    '<rect x="9.4" y="16.4" width="5.4" height="3.4" fill="#5b8fe8"/>',
};
