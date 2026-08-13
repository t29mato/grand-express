/**
 * ベネズエラの都市イラスト(28都市ぶん)。
 *
 * `VENEZUELA_MARKS` は24×24の座標系に描くシンボル、`VENEZUELA_BG` は
 * 400×210の座標系に描く背景シーン(いずれもSVG断片の文字列)。
 * 韓国・中国と同じく最初から文字列として持つ。動きは含めない。
 *
 * 色は他の盤面と揃える。空 #8fc4e8〜#cfe4f0、顔・白 #f6efe2、
 * 強調 #f5b31c/#e8443f/#5b8fe8。ベネズエラらしさは
 * **アンデスの雪 #f2f6f8・グランサバナの赤褐色 #8a6a4c・
 * マラカイボ湖の油じみた青緑 #1e5a5f・熱帯の濃緑 #2f6b3a・
 * 土壁の赤茶 #b06a3a** で出す。
 *
 * 鍵は `cities.mjs` の `mark` / `bg` と一対一で対応する。
 *
 * **背景SVGの中央25%(x=151〜249 / y=54〜152)は都市シンボルに隠れて
 * 見えない。** 見せたい細部は左右3分の1と手前(y>170)に置く。
 * `sky()` は必ず第3引数(次に来る塗りの開始y)を渡すこと。
 *
 * 背景1枚あたり40要素を目安に、繰り返しの多い部品(窓・星・鳥・花・
 * 草)は `windowGrid` / `stars` / `flock` / `flowerDots` / `grassTufts`
 * のような生成ヘルパーでまとめて作る。
 */

const W = 400;

/** 小数の桁を抑える。 */
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

/** 雪をかぶったアンデスの峰。 */
function snowPeak(cx, base, h, fill = "#8b8f98") {
  const w = r1(h * 1.3);
  return (
    `<path d="M${r1(cx - w / 2)},${base}L${r1(cx - w * 0.1)},${r1(base - h)}L${r1(cx + w * 0.08)},${r1(base - h * 0.6)}L${r1(cx + w / 2)},${base}z" fill="${fill}"/>` +
    `<path d="M${r1(cx - w * 0.1)},${r1(base - h)}L${r1(cx - w * 0.02)},${r1(base - h * 0.78)}L${r1(cx + w * 0.05)},${r1(base - h * 0.84)}L${r1(cx - w * 0.1)},${r1(base - h * 0.7)}z" fill="#f2f6f8"/>`
  );
}

/** テプイ。頂が平らな卓状山(グランサバナの目印)。 */
function tepui(cx, base, w, h, fill = "#8a6a4c") {
  return (
    `<path d="M${r1(cx - w / 2)},${base}L${r1(cx - w * 0.36)},${r1(base - h)}L${r1(cx + w * 0.36)},${r1(base - h)}L${r1(cx + w / 2)},${base}z" fill="${fill}"/>` +
    `<rect x="${r1(cx - w * 0.36)}" y="${r1(base - h - 4)}" width="${r1(w * 0.72)}" height="4" fill="#5f4a36"/>` +
    `<path d="M${r1(cx - w * 0.3)},${r1(base - h)}v6M${r1(cx)},${r1(base - h)}v8M${r1(cx + w * 0.24)},${r1(base - h)}v5" stroke="#3f6b4a" stroke-width="2"/>`
  );
}

/** ヤシの木。カリブ海岸とオリノコ・デルタに多い。 */
function palm(x, base, h, fill = "#2f6b3a") {
  return (
    `<path d="M${r1(x - 2)},${base}q3,-${r1(h * 0.5)} -1,-${h}q6,${r1(h * 0.28)} 3,${r1(h * 0.9)}z" fill="#6b5330"/>` +
    `<g fill="${fill}"><path d="M${r1(x - 1)},${r1(base - h)}c-9,-2 -14,-8 -15,-14c7,2 13,7 15,14z"/>` +
    `<path d="M${r1(x - 1)},${r1(base - h)}c9,-2 14,-8 15,-14c-7,2 -13,7 -15,14z"/>` +
    `<path d="M${r1(x - 1)},${r1(base - h)}c-7,1 -12,7 -13,13c6,0 12,-5 13,-13z"/>` +
    `<path d="M${r1(x - 1)},${r1(base - h)}c7,1 12,7 13,13c-6,0 -12,-5 -13,-13z"/></g>`
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

/** 波の反射線・水面。 */
function ripples(y, color = "#bfe8f4") {
  return `<g stroke="${color}" stroke-width="2" opacity=".7" fill="none"><path d="M26,${y}h74M176,${y + 12}h92M108,${y + 24}h62"/></g>`;
}

/** 油井やぐら。 */
function derrickTower(x, base, h, fill = "#4a4a52") {
  const w = r1(h * 0.42);
  return (
    `<path d="M${r1(x - w / 2)},${base}L${r1(x - w * 0.08)},${r1(base - h)}L${r1(x + w * 0.08)},${r1(base - h)}L${r1(x + w / 2)},${base}z" fill="none" stroke="${fill}" stroke-width="2"/>` +
    `<g stroke="${fill}" stroke-width="1.4"><path d="M${r1(x - w * 0.38)},${r1(base - h * 0.3)}L${r1(x + w * 0.38)},${r1(base - h * 0.3)}M${r1(x - w * 0.24)},${r1(base - h * 0.6)}L${r1(x + w * 0.24)},${r1(base - h * 0.6)}"/></g>` +
    `<rect x="${r1(x - w * 0.5)}" y="${r1(base - 2)}" width="${w}" height="4" fill="${fill}"/>`
  );
}

/** ロープウェイの索道と搬器。 */
function cableLine(x1, y1, x2, y2, carAt = 0.5, fill = "#4a4a52") {
  const cx = r1(x1 + (x2 - x1) * carAt);
  const cy = r1(y1 + (y2 - y1) * carAt);
  return (
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${fill}" stroke-width="1.6"/>` +
    `<line x1="${r1(cx - 5)}" y1="${r1(cy - 2)}" x2="${cx}" y2="${cy}" stroke="${fill}" stroke-width="1"/>` +
    `<rect x="${r1(cx - 6)}" y="${cy}" width="12" height="8" rx="1.5" fill="#5b8fe8"/>`
  );
}

/** つり橋(マラカイボ湖・オリノコ川の橋)。 */
function suspensionBridge(x0, x1, y, h, fill = "#8a8478") {
  return (
    `<rect x="${x0}" y="${y}" width="${r1(x1 - x0)}" height="4" fill="${fill}"/>` +
    `<g stroke="${fill}" stroke-width="2"><line x1="${r1(x0 + (x1 - x0) * 0.3)}" y1="${y}" x2="${r1(x0 + (x1 - x0) * 0.3)}" y2="${r1(y - h)}"/>` +
    `<line x1="${r1(x0 + (x1 - x0) * 0.7)}" y1="${y}" x2="${r1(x0 + (x1 - x0) * 0.7)}" y2="${r1(y - h)}"/></g>` +
    `<path d="M${x0},${y}Q${r1(x0 + (x1 - x0) * 0.3)},${r1(y - h)} ${r1(x0 + (x1 - x0) * 0.5)},${r1(y - h * 0.75)}Q${r1(x0 + (x1 - x0) * 0.7)},${r1(y - h)} ${x1},${y}" fill="none" stroke="${fill}" stroke-width="1.6"/>`
  );
}

/** 川船。 */
function riverBoat(x, y, w = 46) {
  return (
    `<path d="M${x},${y}h${w}l-6,10h-${w - 12}z" fill="#c8a878"/>` +
    `<rect x="${r1(x + w * 0.3)}" y="${r1(y - 10)}" width="${r1(w * 0.3)}" height="10" fill="#f6efe2"/>`
  );
}

/** 土壁の植民地建築。アーチ窓と瓦屋根、白い漆喰の縁取り。 */
function colonialHouse(x, base, w, h, wall = "#b06a3a", roof = "#8a4a2c") {
  return (
    `<rect x="${x}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${wall}"/>` +
    `<rect x="${x}" y="${r1(base - h)}" width="${w}" height="3" fill="#f6efe2"/>` +
    `<path d="M${r1(x - 4)},${r1(base - h)}h${r1(w + 8)}l-6,-10h${r1(-w + 4)}z" fill="${roof}"/>` +
    `<path d="M${r1(x + w * 0.4)},${base}v-${r1(h * 0.6)}a${r1(w * 0.1)},${r1(w * 0.1)} 0 0 1 ${r1(w * 0.2)},0v${r1(h * 0.6)}z" fill="#f6efe2" opacity=".85"/>`
  );
}

/** 砂丘の稜線。 */
/**
 * 砂丘の稜線。**曲線の累積dy(-14-18=-32)ぶん、終点は`y`より上にずれる。**
 * そのため下端への `v` は `210 - y` に単純な余白を足すだけでは足りず
 * (実測: 余白20では下端が12px不足し、マゼンタ台紙で塗り残しが見えた)、
 * その分を見込んで大きめの余白(60)を取る。
 */
function dune(y, fill = "#e2c48a") {
  return `<path d="M0,${y}c60,-24 120,-30 200,-14c70,15 130,4 200,-18v${210 - y + 60}H0z" fill="${fill}"/>`;
}

/** かもめ。 */
function gull(x, y, scale = 1) {
  const w = 8 * scale;
  return `<path d="M${r1(x - w)},${y}q${r1(w / 2)},-6 ${w},0q${r1(w / 2)},-6 ${w},0" fill="none" stroke="#4a4a52" stroke-width="1.4"/>`;
}

// ---------------------------------------------------------------------------
// 反復部品をまとめて作る生成ヘルパー(密度を上げるため)。
// ---------------------------------------------------------------------------

/** 窓の並び(高層ビルなどに使う)。 */
function windowGrid(x0, y0, cols, rows, w, h, gx, gy, fill = "#bfe0f0") {
  const parts = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      parts.push(`<rect x="${r1(x0 + c * gx)}" y="${r1(y0 + r * gy)}" width="${w}" height="${h}" fill="${fill}"/>`);
    }
  }
  return `<g opacity=".65">${parts.join("")}</g>`;
}

/** 星(夜空)。 */
function stars(list, fill = "#f6efe2") {
  return `<g fill="${fill}" opacity=".9">${list.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join("")}</g>`;
}

/** 鳥の群れ(かもめ・フラミンゴ・コンゴウインコを兼ねる)。 */
function flock(list, scale = 1, color = "#4a4a52") {
  return `<g stroke="${color}" stroke-width="1.4" fill="none">${list.map(([x, y]) => gull(x, y, scale).replace(/stroke="#4a4a52"/, `stroke="${color}"`)).join("")}</g>`;
}

/** 小さな花・実の点(カカオ・花畑・彩色の点描)。 */
function flowerDots(list, color = "#e8443f") {
  return `<g fill="${color}">${list.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r || 3}"/>`).join("")}</g>`;
}

/** 草むら(ラノス・サバンナ)。 */
function grassTufts(list, color = "#8a9a4a") {
  return `<g stroke="${color}" stroke-width="2" opacity=".8">${list.map(([x, y, h]) => `<path d="M${r1(x - 5)},${y}l-1,${-(h || 9)}M${x},${y}l0,${-(h || 12)}M${r1(x + 5)},${y}l1,${-(h || 9)}"/>`).join("")}</g>`;
}

/** ガスの炎(マトゥリン・バリナス)。 */
function flame(x, y, h) {
  return (
    `<rect x="${r1(x - 1.5)}" y="${y}" width="3" height="${h}" fill="#4a4a52"/>` +
    `<path d="M${x},${r1(y - h)}c-6,-6 -6,-14 0,-20c6,6 6,14 0,20z" fill="#f5b31c"/>` +
    `<path d="M${x},${r1(y - h - 4)}c-3,-3 -3,-8 0,-11c3,3 3,8 0,11z" fill="#e8443f"/>`
  );
}

/** 工場の建物と煙突。 */
function factoryBlock(x, base, w, h, fill = "#7f8896") {
  return (
    `<rect x="${x}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${fill}"/>` +
    `<rect x="${r1(x + w * 0.2)}" y="${r1(base - h - h * 0.7)}" width="${r1(w * 0.16)}" height="${r1(h * 0.7)}" fill="${fill}"/>` +
    `<circle cx="${r1(x + w * 0.28)}" cy="${r1(base - h - h * 0.8)}" r="6" fill="#c8ccc4" opacity=".7"/>` +
    `<circle cx="${r1(x + w * 0.28)}" cy="${r1(base - h - h * 1.05)}" r="8" fill="#c8ccc4" opacity=".5"/>`
  );
}

/** 牛(ラノス)。 */
function cow(x, y, scale = 1) {
  const s = scale;
  return (
    `<g fill="#f6efe2" stroke="#4a4436" stroke-width="1"><ellipse cx="${x}" cy="${y}" rx="${9 * s}" ry="${5 * s}"/>` +
    `<circle cx="${r1(x + 9 * s)}" cy="${r1(y - 2 * s)}" r="${3.4 * s}"/>` +
    `<rect x="${r1(x - 6 * s)}" y="${r1(y + 3 * s)}" width="${2 * s}" height="${5 * s}" fill="#4a4436"/>` +
    `<rect x="${r1(x + 3 * s)}" y="${r1(y + 3 * s)}" width="${2 * s}" height="${5 * s}" fill="#4a4436"/></g>` +
    `<g fill="#4a4436"><circle cx="${r1(x - 2 * s)}" cy="${y}" r="${2 * s}"/><circle cx="${r1(x + 3 * s)}" cy="${r1(y + 2 * s)}" r="${1.6 * s}"/></g>`
  );
}

/** リャネラ・ハープ(小型)。 */
function harpShape(x, base, h) {
  return (
    `<path d="M${x},${base}Q${r1(x - h * 0.5)},${r1(base - h * 0.5)} ${r1(x - h * 0.1)},${r1(base - h)}" fill="none" stroke="#6b5330" stroke-width="3"/>` +
    `<line x1="${x}" y1="${base}" x2="${r1(x - h * 0.1)}" y2="${r1(base - h)}" stroke="#6b5330" stroke-width="3"/>` +
    `<g stroke="#f6efe2" stroke-width="1">${Array.from({ length: 5 }, (_, i) => `<line x1="${r1(x - i * (h * 0.02))}" y1="${r1(base - i * (h * 0.18))}" x2="${r1(x - h * 0.08 - i * (h * 0.02))}" y2="${r1(base - i * (h * 0.18) - h * 0.12)}"/>`).join("")}</g>`
  );
}

/** 高床式の家(オリノコ・デルタ)。 */
function stiltHut(x, base, w, h, fill = "#c8a06a") {
  return (
    `<g stroke="#6b5330" stroke-width="2.4"><line x1="${r1(x + 4)}" y1="${base}" x2="${r1(x + 4)}" y2="${r1(base - h * 0.55)}"/><line x1="${r1(x + w - 4)}" y1="${base}" x2="${r1(x + w - 4)}" y2="${r1(base - h * 0.55)}"/></g>` +
    `<rect x="${x}" y="${r1(base - h)}" width="${w}" height="${r1(h * 0.55)}" fill="${fill}"/>` +
    `<path d="M${r1(x - 4)},${r1(base - h)}h${r1(w + 8)}l-6,-9h${r1(-w + 4)}z" fill="#8a4a2c"/>`
  );
}

/** マングローブ・葦の茂み(オリノコ・デルタ、水辺)。 */
function reedCluster(x, y, count = 5, color = "#3f6b4a") {
  const parts = [];
  for (let i = 0; i < count; i++) {
    parts.push(`<line x1="${r1(x + i * 4)}" y1="${y}" x2="${r1(x + i * 4 - 2)}" y2="${r1(y - 14 - (i % 3) * 3)}" stroke="${color}" stroke-width="1.6"/>`);
  }
  return `<g>${parts.join("")}</g>`;
}

/** カーニバルの仮面(祭り)。 */
function maskShape(x, y, scale = 1, color = "#f4941c") {
  const s = scale;
  return (
    `<circle cx="${x}" cy="${y}" r="${9 * s}" fill="${color}"/>` +
    `<circle cx="${r1(x - 3 * s)}" cy="${r1(y - 2 * s)}" r="${1.6 * s}" fill="#241a10"/>` +
    `<circle cx="${r1(x + 3 * s)}" cy="${r1(y - 2 * s)}" r="${1.6 * s}" fill="#241a10"/>` +
    `<path d="M${r1(x - 4 * s)},${r1(y + 4 * s)}q${4 * s},${3 * s} ${8 * s},0" fill="none" stroke="#241a10" stroke-width="${1.4 * s}"/>` +
    `<path d="M${x},${r1(y - 9 * s)}l-2,-6 4,0z" fill="#c8102e"/>`
  );
}

/** 真珠貝(ポルラマル)。 */
function pearlShell(x, y, r) {
  return (
    `<path d="M${r1(x - r)},${y}Q${x},${r1(y - r * 1.3)} ${r1(x + r)},${y}Q${x},${r1(y + r * 0.4)} ${r1(x - r)},${y}z" fill="#c8a878"/>` +
    `<circle cx="${x}" cy="${r1(y - r * 0.2)}" r="${r1(r * 0.36)}" fill="#f6efe2"/>`
  );
}

/** 岩と白波(急流)。 */
function rapidsRock(x, y, r) {
  return (
    `<path d="M${r1(x - r)},${r1(y + r * 0.6)}L${x},${r1(y - r)}L${r1(x + r)},${r1(y + r * 0.6)}z" fill="#4a4a52"/>` +
    `<path d="M${r1(x - r * 1.6)},${r1(y + r * 0.8)}q${r1(r * 1.6)},${-r * 0.6} ${r1(r * 3.2)},0" fill="none" stroke="#f6efe2" stroke-width="2" opacity=".8"/>`
  );
}

/** 星形要塞の壁(プエルトカベージョ)。 */
function starFortShape(cx, base, w, h, fill = "#8a8478") {
  const hw = r1(w / 2);
  return (
    `<path d="M${r1(cx - hw)},${base}L${r1(cx - hw * 0.6)},${r1(base - h)}L${r1(cx - hw * 0.2)},${r1(base - h * 0.7)}L${cx},${r1(base - h)}L${r1(cx + hw * 0.2)},${r1(base - h * 0.7)}L${r1(cx + hw * 0.6)},${r1(base - h)}L${r1(cx + hw)},${base}z" fill="${fill}"/>` +
    `<rect x="${r1(cx - hw * 0.3)}" y="${r1(base - h * 0.5)}" width="${r1(hw * 0.6)}" height="${r1(h * 0.5)}" fill="#6b6a60"/>`
  );
}

// ---------------------------------------------------------------------------
// 背景シーン(16種)。鍵は cities.mjs の `bg` と対応。
// ---------------------------------------------------------------------------

const VENEZUELA_BASE_BG = {
  /**
   * 首都。カラカス専用。アビラ山の緑を背に、近代的な高層ビルと
   * ケーブルカーの索道を左右に置く。
   */
  capital:
    sky("#8fc4e8", "#cfe4f0", 108) +
    clouds(90, 26, 1) +
    clouds(360, 18, 0.7) +
    hills(106, "#5f7f4a") +
    ground(108, "#8fae63") +
    // アビラ山(中央奥、隠れ帯にかかってよい)
    snowPeak(200, 108, 46, "#6f8a52") +
    // 索道(左からアビラの肩へ)
    cableLine(28, 150, 130, 96, 0.55) +
    // 高層ビル群(右)
    `<g fill="#7f8896"><rect x="300" y="70" width="22" height="60"/><rect x="326" y="50" width="26" height="80"/><rect x="356" y="82" width="20" height="48"/></g>` +
    windowGrid(304, 76, 2, 5, 3, 3, 8, 9, "#bfe0f0") +
    windowGrid(330, 56, 2, 6, 3, 3, 8, 9, "#bfe0f0") +
    windowGrid(360, 88, 2, 4, 3, 3, 8, 9, "#bfe0f0") +
    // 地下鉄の出入口(手前・左)
    `<rect x="30" y="188" width="30" height="14" rx="2" fill="#4a4a52"/><rect x="34" y="180" width="22" height="8" fill="#5b8fe8"/>` +
    // 道路と車(手前)
    `<rect x="0" y="204" width="400" height="6" fill="#5a5f52"/>` +
    `<g fill="#e8443f"><rect x="90" y="200" width="14" height="6" rx="1.5"/></g>` +
    `<g fill="#5b8fe8"><rect x="120" y="200" width="14" height="6" rx="1.5"/></g>` +
    // 街路樹(手前・左右)
    roundTree(16, 200, 10, "#3f8f4f") +
    roundTree(384, 200, 9, "#3f8f4f") +
    flock([[70, 40], [88, 34], [340, 46]], 1, "#4a4a52"),

  /**
   * 油とマラカイボ湖の町。マラカイボ・カビマス・サンタバルバラで共有。
   * 夜の空にカタトゥンボの雷光、湖を渡る橋、対岸に並ぶ油井やぐら。
   */
  oillake:
    sky("#3f5a6f", "#1e5a5f", 110) +
    stars([[40, 14, 1], [70, 22, 1.2], [110, 10, 1], [200, 16, 1.4], [230, 8, 1], [370, 20, 1.2], [30, 40, 0.8], [180, 30, 0.9]]) +
    // 雷光(カタトゥンボ)
    `<path d="M280,10l-14,26h10l-16,30l26,-32h-11z" fill="#f4c430" opacity=".9"/>` +
    `<path d="M120,4l-10,20h8l-12,24l20,-26h-9z" fill="#f4c430" opacity=".6"/>` +
    `<path d="M60,2l-8,16h6l-10,20l16,-22h-7z" fill="#f4c430" opacity=".4"/>` +
    ground(110, "#8a8478") +
    `<rect x="0" y="150" width="400" height="60" fill="#1e5a5f"/>` +
    ripples(166, "#4a8a8f") +
    ripples(184, "#3a7a80") +
    // 湖の橋(手前を横断)
    suspensionBridge(20, 380, 150, 34, "#8a8478") +
    // 油井やぐら(対岸に並ぶ、隠れ帯にかかってよい)
    derrickTower(90, 148, 30) +
    derrickTower(150, 146, 26) +
    derrickTower(320, 148, 32) +
    derrickTower(360, 146, 24) +
    derrickTower(40, 150, 20) +
    // 小舟のシルエット(手前)
    riverBoat(180, 196, 34) +
    flock([[240, 60], [260, 54]], 0.8, "#f6efe2"),

  /**
   * アンデスの町。メリダ・サンクリストバル・トルヒージョ・ハヒで共有。
   * 雪の峰とロープウェイ、段々畑。
   */
  andes:
    sky("#a8c8e0", "#e8f0f4", 108) +
    clouds(330, 24, 0.9) +
    clouds(40, 20, 0.7) +
    snowPeak(90, 106, 90, "#8b8f98") +
    snowPeak(200, 108, 100, "#9a9ea4") +
    snowPeak(320, 106, 76, "#8b8f98") +
    ground(108, "#6f8a52") +
    // ロープウェイ(左下から山頂近くへ)
    cableLine(30, 176, 190, 60, 0.4) +
    cableLine(30, 176, 190, 60, 0.75) +
    // 段々畑(手前)
    `<g stroke="#8a9a4a" stroke-width="3" opacity=".7"><path d="M20,190h100M20,198h100M240,196h140M240,204h140"/></g>` +
    flowerDots([[40, 186, 2.4], [60, 186, 2.4], [80, 194, 2.4], [100, 194, 2.4], [260, 192, 2.4], [280, 200, 2.4], [300, 192, 2.4]], "#e8a0b0") +
    roundTree(360, 200, 12, "#3f8f4f") +
    roundTree(20, 202, 10, "#3f8f4f") +
    flock([[110, 44], [130, 50], [280, 40]], 0.9, "#4a4a52") +
    `<path d="M40,204c30,-3 60,3 90,0c40,-4 70,4 100,0c30,-3 60,3 90,0" fill="none" stroke="#7a8a5a" stroke-width="1.4" opacity=".6"/>`,

  /**
   * オリノコ川の町。シウダー・ボリバル専用。狭まる川と吊り橋、川船。
   */
  orinoco:
    sky("#8fc4e8", "#cfe4f0", 118) +
    clouds(70, 26, 1) +
    clouds(320, 20, 0.8) +
    ground(118, "#9a9484") +
    `<rect x="0" y="150" width="400" height="60" fill="#8a6a3a"/>` +
    ripples(168, "#c4a878") +
    ripples(188, "#b89868") +
    suspensionBridge(0, 400, 150, 40, "#8a8478") +
    riverBoat(170, 178, 50) +
    riverBoat(60, 192, 30) +
    palm(30, 200, 26) +
    palm(370, 202, 24) +
    palm(50, 204, 18) +
    roundTree(390, 206, 8, "#3f8f4f") +
    flock([[60, 40], [80, 34], [340, 46], [360, 40]], 1, "#4a4a52") +
    // 対岸の草地(手前左右)
    grassTufts([[16, 208, 10], [26, 206, 9], [374, 208, 10], [384, 206, 9]], "#7a8a4a"),

  /**
   * 砂丘の町。コロ専用。土壁の家並みと砂丘、サボテン。
   */
  dunes:
    sky("#a8c8e0", "#e8dcc0", 130) +
    sun(340, 40, 20, "#f5b31c") +
    clouds(60, 30, 0.8) +
    dune(130, "#e2c48a") +
    colonialHouse(60, 190, 60, 34, "#b06a3a", "#8a4a2c") +
    colonialHouse(140, 196, 44, 26, "#c8a06a", "#8a4a2c") +
    colonialHouse(10, 200, 36, 20, "#b06a3a", "#8a4a2c") +
    // サボテン(手前・右)
    `<g fill="#5f8a4a"><rect x="330" y="164" width="8" height="40" rx="3"/><rect x="316" y="180" width="8" height="20" rx="3"/><rect x="344" y="176" width="8" height="24" rx="3"/></g>` +
    `<g fill="#5f8a4a"><rect x="200" y="188" width="6" height="20" rx="3"/></g>` +
    flock([[100, 50], [120, 44], [250, 40]], 0.9, "#4a4a52") +
    // 砂丘の稜線に沿った点描(草)
    grassTufts([[70, 168, 6], [180, 148, 6], [260, 156, 6]], "#8a9a4a"),

  /**
   * 港町。ラグアイラ・プエルトカベージョ・プエルトラクルス・クマナで共有。
   * 起重機と船、かもめ、桟橋。
   */
  port:
    sky("#8fc4e8", "#cfe4f0", 118) +
    clouds(310, 28, 1) +
    clouds(50, 20, 0.7) +
    ground(118, "#9a9484") +
    flock([[60, 50], [90, 62], [320, 44], [40, 70]], 1, "#4a4a52") +
    `<rect x="0" y="150" width="400" height="60" fill="#2f6ea8"/>` +
    ripples(168, "#bfe8f4") +
    ripples(186, "#a4d8ec") +
    // 起重機(左)
    `<g stroke="#e8443f" stroke-width="3"><line x1="50" y1="150" x2="50" y2="94"/><line x1="50" y1="94" x2="86" y2="94"/><line x1="76" y1="96" x2="76" y2="118"/></g>` +
    `<g stroke="#e8443f" stroke-width="3"><line x1="90" y1="150" x2="90" y2="110"/><line x1="90" y1="110" x2="118" y2="110"/></g>` +
    // 埠頭
    `<rect x="0" y="140" width="400" height="12" fill="#8a8478"/>` +
    // 貨物船(右)
    `<rect x="290" y="152" width="90" height="20" rx="3" fill="#e8443f"/>` +
    `<rect x="300" y="140" width="70" height="14" fill="#f6efe2"/>` +
    windowGrid(306, 143, 3, 1, 6, 5, 16, 0, "#5b8fe8") +
    // 星形要塞のシルエット(手前左、隠れてもよい規模)
    starFortShape(200, 150, 60, 24, "#8a8478") +
    palm(20, 200, 22) +
    palm(380, 202, 20),

  /**
   * 高原の町。ロス・テケス専用。霧をまとう山とトンネル入口、コーヒー畑。
   */
  hilltown:
    sky("#9fb4c4", "#dbe6e0", 110) +
    clouds(80, 30, 1.1) +
    clouds(300, 24, 0.9) +
    hills(108, "#5f7f4a") +
    hills(120, "#4f6f3f", 3) +
    ground(110, "#6f8a52") +
    // トンネル入口(左)
    `<path d="M20,150a20,20 0 0 1 40,0z" fill="#4a4a52"/><rect x="16" y="150" width="48" height="8" fill="#8a8478"/>` +
    `<rect x="34" y="130" width="12" height="20" fill="#20364a"/>` +
    // 線路(トンネルから右へ)
    `<g stroke="#6b5330" stroke-width="2"><line x1="64" y1="158" x2="380" y2="158"/></g>` +
    `<g stroke="#4a4a52" stroke-width="1.6">${Array.from({ length: 12 }, (_, i) => `<line x1="${70 + i * 27}" y1="154" x2="${70 + i * 27}" y2="162"/>`).join("")}</g>` +
    // コーヒー農園の段々畑(右)
    `<g stroke="#5f7f4a" stroke-width="3" opacity=".7"><path d="M240,190h140M240,198h140M240,206h140"/></g>` +
    flowerDots([[250, 188, 2], [270, 188, 2], [290, 196, 2], [310, 196, 2], [330, 204, 2]], "#8a4a2c") +
    roundTree(390, 200, 8, "#3f8f4f") +
    flock([[120, 40], [140, 34]], 0.9, "#4a4a52"),

  /**
   * カカオの海岸。イグエロテ専用。カカオの木とヤシ、太鼓。
   */
  cacaoshore:
    sky("#8fc4e8", "#cfe4f0", 116) +
    clouds(300, 26, 1) +
    ground(116, "#8fae63") +
    `<rect x="0" y="160" width="400" height="50" fill="#1e6ea0"/>` +
    ripples(176, "#bfe8f4") +
    // カカオの木(左、実は赤黄の点)
    roundTree(40, 200, 16, "#2f6b3a") +
    flowerDots([[34, 188, 3], [46, 192, 3], [30, 196, 3]], "#e8443f") +
    flowerDots([[52, 190, 3]], "#f5b31c") +
    roundTree(80, 202, 13, "#2f6b3a") +
    flowerDots([[76, 192, 2.6], [86, 196, 2.6]], "#e8443f") +
    palm(360, 200, 26) +
    palm(384, 204, 20) +
    // 太鼓(手前右、サンフアンの祭り)
    `<g><rect x="220" y="184" width="16" height="22" rx="2" fill="#8a4a2c"/><rect x="220" y="184" width="16" height="6" fill="#c8a06a"/></g>` +
    `<g><rect x="248" y="188" width="14" height="18" rx="2" fill="#8a4a2c"/><rect x="248" y="188" width="14" height="5" fill="#c8a06a"/></g>` +
    flock([[130, 40], [150, 34], [270, 44]], 1, "#4a4a52") +
    grassTufts([[16, 208, 8], [384, 208, 8]], "#8a9a4a"),

  /**
   * カーニバルの町。バルキシメト・エルカジャオ・カルパノで共有。
   * 仮面と太鼓、パレードの旗。
   */
  festival:
    sky("#8fc4e8", "#cfe4f0", 120) +
    clouds(60, 24, 0.9) +
    hills(118, "#8fae7a") +
    ground(120, "#c9a877") +
    // 旗の列(パレード)
    `<g stroke="#4a4a52" stroke-width="1.4"><line x1="0" y1="70" x2="400" y2="70"/></g>` +
    `<g>${[30, 70, 110, 150, 190, 230, 270, 310, 350, 390].map((x, i) => `<path d="M${x},70l10,10l-10,10l-10,-10z" fill="${["#c8102e", "#f4c430", "#00247d", "#5f8a4a"][i % 4]}"/>`).join("")}</g>` +
    // 仮面(左右、中央は隠れ帯を避ける)
    maskShape(60, 170, 1.2, "#f4941c") +
    maskShape(100, 182, 0.9, "#c8102e") +
    maskShape(320, 172, 1.2, "#5b8fe8") +
    maskShape(350, 186, 0.9, "#f4c430") +
    // 太鼓の列(手前)
    `<g><rect x="150" y="188" width="14" height="18" rx="2" fill="#8a4a2c"/><rect x="150" y="188" width="14" height="5" fill="#c8a06a"/></g>` +
    `<g><rect x="170" y="192" width="12" height="14" rx="2" fill="#8a4a2c"/><rect x="170" y="192" width="12" height="4" fill="#c8a06a"/></g>` +
    `<g><rect x="230" y="190" width="13" height="16" rx="2" fill="#8a4a2c"/><rect x="230" y="190" width="13" height="4" fill="#c8a06a"/></g>` +
    flock([[200, 36], [220, 30]], 0.9, "#4a4a52"),

  /**
   * 工業都市。ヴァレンシア・シウダーグアヤナ・マトゥリンで共有。
   * 工場と煙突、ガスの炎。
   */
  industrial:
    sky("#9fb0b8", "#dfe4e0", 130) +
    `<g opacity=".5" fill="#c8ccc4"><ellipse cx="70" cy="60" rx="26" ry="12"/><ellipse cx="330" cy="50" rx="22" ry="10"/><ellipse cx="200" cy="40" rx="20" ry="9"/></g>` +
    ground(130, "#8a8478") +
    factoryBlock(30, 150, 60, 60, "#7f8896") +
    factoryBlock(300, 150, 70, 70, "#6b7280") +
    windowGrid(36, 106, 4, 3, 4, 4, 12, 10, "#bfe0f0") +
    windowGrid(306, 96, 4, 4, 4, 4, 12, 10, "#bfe0f0") +
    flame(150, 150, 34) +
    flame(180, 150, 26) +
    `<rect x="0" y="150" width="400" height="60" fill="#2f6ea8"/>` +
    ripples(166, "#7fa8c4") +
    // 送電線(手前)
    `<g stroke="#4a4a52" stroke-width="1.2"><path d="M0,120c40,-10 80,10 120,0c40,-10 80,10 120,0c40,-10 80,10 120,0c20,-4 30,2 40,0" fill="none"/></g>` +
    `<g fill="#4a4a52"><rect x="0" y="118" width="3" height="8"/><rect x="120" y="118" width="3" height="8"/><rect x="240" y="118" width="3" height="8"/><rect x="360" y="118" width="3" height="8"/></g>`,

  /**
   * ラノスの牧場。バリナス専用。牛の群れ、ポンプジャッキ、ハープ。
   */
  llanos:
    sky("#a8d0e8", "#f0e8c8", 150) +
    sun(340, 46, 22, "#f5b31c") +
    clouds(70, 26, 1) +
    clouds(180, 20, 0.8) +
    ground(150, "#c9c26a") +
    // 広大な平原(手前まで続く帯)
    `<path d="M0,170c60,-4 120,4 200,-2c80,-6 140,4 200,-2v42H0z" fill="#b3c26a"/>` +
    grassTufts([[30, 195, 10], [70, 198, 9], [140, 200, 10], [260, 196, 9], [320, 200, 10], [370, 198, 9]], "#8a9a4a") +
    cow(80, 178, 1) +
    cow(110, 184, 0.8) +
    cow(60, 190, 0.7) +
    cow(250, 180, 1) +
    cow(280, 188, 0.8) +
    derrickTower(340, 176, 22, "#4a4a52") +
    derrickTower(370, 178, 18, "#4a4a52") +
    harpShape(170, 202, 30) +
    flock([[100, 40], [120, 34], [300, 44]], 1, "#4a4a52"),

  /**
   * 滝と卓状山。カナイマ専用。アウヤン・テプイから落ちる滝、ラグーン。
   */
  waterfall:
    sky("#8fc4e8", "#cfe4f0", 90) +
    clouds(320, 22, 0.9) +
    tepui(180, 90, 220, 60, "#8a6a4c") +
    ground(90, "#2f6b3a") +
    // 滝(テプイの縁から水面へ。ground()より後に描かないと下側が地面に消える)
    `<path d="M170,30v130h20V30z" fill="#bfe8f4" opacity=".85"/>` +
    `<path d="M172,40v110M180,35v120M188,42v108" stroke="#f6efe2" stroke-width="1.4" opacity=".7"/>` +
    `<rect x="0" y="160" width="400" height="50" fill="#3f7fae"/>` +
    ripples(176, "#bfe8f4") +
    `<circle cx="180" cy="176" r="18" fill="#e8f4f8" opacity=".5"/>` +
    palm(30, 200, 24) +
    palm(60, 204, 18) +
    palm(360, 200, 24) +
    palm(384, 204, 18) +
    roundTree(80, 206, 10, "#2f6b3a") +
    roundTree(340, 206, 10, "#2f6b3a") +
    riverBoat(230, 194, 30) +
    flock([[260, 40], [280, 34]], 1, "#4a4a52"),

  /**
   * グランサバナのテプイ。サンタエレナ・デ・ウアイレン専用。
   * ロライマ山とサバンナ、国境の草原。
   */
  tepui:
    sky("#8fc4e8", "#cfe4f0", 100) +
    clouds(60, 24, 0.9) +
    tepui(90, 100, 130, 80, "#8a6a4c") +
    tepui(300, 106, 100, 60, "#9a7a5c") +
    ground(100, "#b3c26a") +
    grassTufts([[30, 190, 8], [70, 194, 9], [130, 198, 8], [200, 200, 9], [250, 196, 8], [320, 200, 9], [370, 198, 8]], "#8a9a4a") +
    // テント(トレッキングの拠点)
    `<path d="M40,206l16,-18l16,18z" fill="#5b8fe8"/>` +
    `<path d="M40,206l16,-18l16,18z" fill="none" stroke="#20364a" stroke-width="1.2"/>` +
    // 国境の目印(小さな石積み)
    `<g fill="#9a9484"><rect x="200" y="196" width="10" height="6"/><rect x="203" y="190" width="6" height="6"/></g>` +
    flock([[110, 40], [130, 34], [280, 44]], 1, "#4a4a52") +
    roundTree(370, 202, 9, "#5f7f4a") +
    roundTree(20, 200, 9, "#5f7f4a"),

  /**
   * オリノコの急流。プエルトアヤクーチョ専用。黒い岩と白波、線刻画の岩。
   */
  rapids:
    sky("#8fc4e8", "#cfe4f0", 110) +
    clouds(70, 26, 1) +
    ground(110, "#8a8478") +
    `<rect x="0" y="150" width="400" height="60" fill="#3f7fae"/>` +
    rapidsRock(80, 172, 14) +
    rapidsRock(130, 180, 10) +
    rapidsRock(170, 168, 12) +
    rapidsRock(220, 184, 9) +
    rapidsRock(260, 172, 13) +
    ripples(196, "#bfe8f4") +
    // 線刻画の岩(手前・左)
    `<path d="M20,180a20,16 0 0 1 40,0z" fill="#4a4a52"/>` +
    `<g stroke="#f6efe2" stroke-width="1.2" opacity=".8"><circle cx="32" cy="172" r="3"/><path d="M40,168l6,8M50,170l-4,6"/></g>` +
    palm(350, 200, 24) +
    palm(374, 204, 18) +
    roundTree(300, 206, 9, "#2f6b3a") +
    flock([[110, 40], [130, 34], [300, 44]], 1, "#4a4a52"),

  /**
   * オリノコ・デルタ。トゥクピタ専用。高床式の家とモリチェヤシ、カヌー。
   */
  delta:
    sky("#8fc4e8", "#cfe4f0", 96) +
    clouds(60, 22, 0.9) +
    ground(96, "#3f6b4a") +
    `<rect x="0" y="150" width="400" height="60" fill="#2f6ea8"/>` +
    ripples(166, "#bfe8f4") +
    stiltHut(30, 170, 46, 40) +
    stiltHut(90, 176, 38, 34) +
    stiltHut(330, 172, 44, 38) +
    reedCluster(150, 190, 6) +
    reedCluster(250, 194, 6) +
    palm(200, 200, 30, "#2f6b3a") +
    palm(220, 204, 20, "#2f6b3a") +
    riverBoat(140, 198, 34) +
    flock([[100, 40], [120, 34], [280, 44]], 1, "#4a4a52") +
    grassTufts([[16, 208, 8], [384, 208, 8]], "#3f6b4a"),

  /**
   * 島の砂浜。ポルラマル専用。真珠貝と免税店、ヤシ。
   */
  beachisland:
    sky("#8fc4e8", "#cfe4f0", 108) +
    sun(60, 40, 20, "#f5b31c") +
    clouds(320, 24, 0.9) +
    `<rect x="0" y="108" width="400" height="60" fill="#1e8fae"/>` +
    ripples(124, "#bfe8f4") +
    ripples(142, "#a4d8ec") +
    `<path d="M0,150c60,-8 120,4 200,-2c80,-6 140,4 200,-2v64H0z" fill="#e8dcc0"/>` +
    pearlShell(60, 190, 10) +
    pearlShell(90, 196, 8) +
    pearlShell(310, 192, 9) +
    palm(30, 202, 26) +
    palm(370, 204, 24) +
    // 免税店の並び(手前)
    `<g fill="#f6efe2"><rect x="150" y="182" width="34" height="20"/><rect x="190" y="186" width="30" height="16"/><rect x="226" y="182" width="34" height="20"/></g>` +
    `<g fill="#5b8fe8"><rect x="156" y="188" width="8" height="8"/><rect x="196" y="190" width="7" height="7"/><rect x="232" y="188" width="8" height="8"/></g>` +
    flock([[130, 40], [150, 34], [260, 44]], 1, "#4a4a52"),
};

export const VENEZUELA_BG = { ...VENEZUELA_BASE_BG };

// ---------------------------------------------------------------------------
// 都市シンボル(19種)。鍵は cities.mjs の `mark` と対応。24×24の座標系。
// ---------------------------------------------------------------------------

export const VENEZUELA_MARKS = {
  /** 街並みとアビラ山。カラカス専用。 */
  capital:
    `<path d="M4,20L9,10L14,20z" fill="#5f7f4a"/>` +
    `<g fill="#7f8896"><rect x="14" y="10" width="3" height="10"/><rect x="18" y="6" width="3" height="14"/></g>` +
    `<rect x="2" y="20" width="20" height="2" fill="#4a4a52"/>`,

  /** 起重機と船。ラグアイラ・プエルトカベージョ・プエルトラクルス・クマナ。 */
  port:
    `<rect x="10" y="4" width="2" height="14" fill="#e8443f"/>` +
    `<rect x="10" y="4" width="9" height="2" fill="#e8443f"/>` +
    `<path d="M2,18h20l-3,4H5z" fill="#2f6ea8"/>`,

  /** 山とトンネル入口。ロス・テケス専用。 */
  hilltown:
    `<path d="M2,18L8,6L14,18z" fill="#5f7f4a"/>` +
    `<path d="M14,18a5,5 0 0 1 10,0z" fill="#4a4a52"/>` +
    `<rect x="12" y="18" width="12" height="2" fill="#8a8478"/>`,

  /** カカオの実。イグエロテ専用。 */
  cacao:
    `<path d="M12,4c5,2 6,10 0,16c-6,-6 -5,-14 0,-16z" fill="#e8443f"/>` +
    `<path d="M12,6v12M9,9l6,2M9,15l6,-2" stroke="#8a1a1a" stroke-width="1"/>`,

  /** 油井やぐら。マラカイボ・カビマス。 */
  derrick:
    `<path d="M9,20L11,4L13,4L15,20z" fill="none" stroke="#4a4a52" stroke-width="1.4"/>` +
    `<path d="M7,14h10M8,9h8" stroke="#4a4a52" stroke-width="1.2"/>` +
    `<rect x="6" y="19" width="12" height="2" fill="#4a4a52"/>`,

  /** 水面と雷光。サンタバルバラ・デル・スリア専用。 */
  lightning:
    `<rect x="0" y="16" width="24" height="6" fill="#1e5a5f"/>` +
    `<path d="M13,2l-6,10h4l-6,10l12,-13h-5z" fill="#f4c430"/>`,

  /** ロープウェイの搬器。メリダ専用。 */
  cablecar:
    `<line x1="2" y1="6" x2="22" y2="6" stroke="#4a4a52" stroke-width="1.4"/>` +
    `<line x1="12" y1="6" x2="12" y2="12" stroke="#4a4a52" stroke-width="1"/>` +
    `<rect x="6" y="12" width="12" height="8" rx="2" fill="#5b8fe8"/>`,

  /** コーヒーの枝。サンクリストバル専用。 */
  coffee:
    `<path d="M4,20Q6,8 12,4Q18,8 20,20" fill="none" stroke="#5f7f4a" stroke-width="1.6"/>` +
    `<circle cx="9" cy="12" r="2.4" fill="#8a1a1a"/><circle cx="15" cy="10" r="2.4" fill="#8a1a1a"/><circle cx="12" cy="17" r="2.4" fill="#e8443f"/>`,

  /** 両腕を広げた聖母像。トルヒージョ専用。 */
  statue:
    `<path d="M12,2v18" stroke="#f6efe2" stroke-width="2"/>` +
    `<path d="M12,8L3,14M12,8l9,6" stroke="#f6efe2" stroke-width="2"/>` +
    `<circle cx="12" cy="5" r="3" fill="#f6efe2"/>` +
    `<rect x="4" y="20" width="16" height="2" fill="#9a9484"/>`,

  /** 土壁の家と瓦屋根。ハヒ・コロ。 */
  colonial:
    `<rect x="5" y="13" width="14" height="8" fill="#b06a3a"/>` +
    `<path d="M3,13h18l-3,-5h-12z" fill="#8a4a2c"/>` +
    `<path d="M0,21c6,-4 18,-4 24,0z" fill="#e2c48a"/>`,

  /** 仮面と太鼓。バルキシメト・エルカジャオ・カルパノ。 */
  festival:
    `<circle cx="12" cy="12" r="9" fill="#f4941c"/>` +
    `<circle cx="8.5" cy="10" r="1.6" fill="#241a10"/><circle cx="15.5" cy="10" r="1.6" fill="#241a10"/>` +
    `<path d="M7,16q5,5 10,0" fill="none" stroke="#241a10" stroke-width="1.6"/>` +
    `<path d="M4,6q8,-5 16,0" fill="none" stroke="#c8102e" stroke-width="2"/>`,

  /** 煙突と工場。ヴァレンシア・シウダーグアヤナ・マトゥリン。 */
  factory:
    `<rect x="3" y="14" width="18" height="8" fill="#7f8896"/>` +
    `<rect x="6" y="4" width="4" height="12" fill="#7f8896"/>` +
    `<circle cx="8" cy="3" r="2.4" fill="#c8ccc4" opacity=".7"/>`,

  /** 牛とハープ。バリナス専用。 */
  llanos:
    `<ellipse cx="9" cy="16" rx="6" ry="3.6" fill="#f6efe2" stroke="#4a4436" stroke-width=".8"/>` +
    `<circle cx="15" cy="14" r="2.2" fill="#f6efe2" stroke="#4a4436" stroke-width=".8"/>` +
    `<path d="M20,20V8Q22,8 22,10V20z" fill="none" stroke="#6b5330" stroke-width="1.4"/>`,

  /** 橋と川船。シウダー・ボリバル専用。 */
  riverport:
    `<path d="M2,14Q12,4 22,14" fill="none" stroke="#8a8478" stroke-width="1.6"/>` +
    `<path d="M6,18h12l-2,4H8z" fill="#c8a878"/>`,

  /** 卓状山から落ちる滝。カナイマ専用。 */
  waterfall:
    `<path d="M4,2h16l-4,6h-8z" fill="#8a6a4c"/>` +
    `<rect x="10" y="8" width="4" height="14" fill="#bfe8f4"/>`,

  /** 卓状山。サンタエレナ・デ・ウアイレン専用。 */
  tepui:
    `<path d="M2,20L8,6h8l6,14z" fill="#8a6a4c"/>` +
    `<rect x="7" y="4" width="10" height="3" fill="#5f4a36"/>`,

  /** 岩と急流。プエルトアヤクーチョ専用。 */
  rapids:
    `<rect x="0" y="16" width="24" height="6" fill="#3f7fae"/>` +
    `<path d="M6,16a5,4 0 0 1 10,0z" fill="#4a4a52"/>` +
    `<path d="M2,20q4,-3 8,0q4,-3 8,0" fill="none" stroke="#f6efe2" stroke-width="1.4"/>`,

  /** 高床式の家。トゥクピタ専用。 */
  delta:
    `<line x1="6" y1="22" x2="6" y2="14" stroke="#6b5330" stroke-width="1.6"/>` +
    `<line x1="18" y1="22" x2="18" y2="14" stroke="#6b5330" stroke-width="1.6"/>` +
    `<rect x="4" y="9" width="16" height="7" fill="#c8a06a"/>` +
    `<path d="M2,9h20l-4,-5h-12z" fill="#8a4a2c"/>`,

  /** ヤシと真珠貝。ポルラマル専用。 */
  beachisland:
    `<path d="M10,20Q12,14 20,12Q13,15 10,20z" fill="#c8a878"/>` +
    `<circle cx="12" cy="16" r="1.8" fill="#f6efe2"/>` +
    `<path d="M4,4c1,-2 3,-2 4,0" stroke="#2f6b3a" stroke-width="1.4" fill="none"/>`,
};
