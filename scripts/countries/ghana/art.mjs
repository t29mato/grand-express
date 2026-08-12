/**
 * ガーナの都市イラスト。
 *
 * `GHANA_MARKS` は24×24の座標系に描くシンボル、`GHANA_BG` は400×210の
 * 座標系に描く背景シーン(いずれもSVG断片の文字列)。イタリア・韓国と同じく
 * 最初から文字列として持つ。動きは含めない(アニメーションはReact側で重ねる)。
 *
 * 色は他の盤面と揃える。空 #8fc4e8〜#20364a、地面の緑 #2f4a33、
 * 顔・白 #f6efe2、強調 #f5b31c(金)/#e8443f(赤)/#5b8fe8(青)。
 * ガーナらしさは **白亜の砦の壁 #e8e0cc・熱帯の海 #136e8a〜#1e88a8
 * (geography.mjsの海の色と揃えてある)・雨林の濃緑 #2f6b3a・
 * ケンテ布の金/赤/緑/黒 #f5b31c #a83a2a #1f5a2c #241a10・
 * サバンナの土色 #cbb673** で出す。
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

/**
 * 5(角)星。国旗・ブラックスター広場のモチーフに使う。
 * `rOuter`・`rInner` は外側・内側の半径(px)。
 */
function star(cx, cy, rOuter, rInner, fill = "#1a1a1a") {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? rOuter : rInner;
    const a = ((-90 + i * 36) * Math.PI) / 180;
    pts.push(`${r1(cx + r * Math.cos(a))},${r1(cy + r * Math.sin(a))}`);
  }
  return `<path d="M${pts.join("L")}z" fill="${fill}"/>`;
}

/** ヤシの木。海岸沿いの装飾。 */
function palmTree(x, base, h, crown = "#2f7a3a") {
  const top = r1(base - h);
  return (
    `<path d="M${x},${base}Q${r1(x + h * 0.18)},${r1(base - h * 0.55)} ${x},${top}" fill="none" stroke="#7a5a30" stroke-width="3"/>` +
    `<g fill="${crown}">` +
    `<path d="M${x},${top}c-16,-3 -24,5 -26,12c9,-9 18,-9 26,-5z"/>` +
    `<path d="M${x},${top}c16,-3 24,5 26,12c-9,-9 -18,-9 -26,-5z"/>` +
    `<path d="M${x},${top}c-3,-11 2,-18 9,-22c-2,9 -5,16 -9,22z"/>` +
    `<path d="M${x},${top}c3,-11 -2,-18 -9,-22c2,9 5,16 9,22z"/>` +
    `</g>`
  );
}

/** 円い樹冠の広葉樹(カカオ・シアなど汎用)。 */
function roundTree(x, base, r, crown = "#3a7a45", trunk = "#5a4630") {
  const th = r1(r * 1.1);
  return (
    `<rect x="${r1(x - r * 0.16)}" y="${r1(base - th - r * 0.3)}" width="${r1(r * 0.32)}" height="${r1(th + r * 0.3)}" fill="${trunk}"/>` +
    `<circle cx="${x}" cy="${r1(base - th - r * 0.5)}" r="${r}" fill="${crown}"/>`
  );
}

/** カカオの実(木の樹冠に添える色付きの莢)。 */
function cocoaPods(x, base, r) {
  return (
    `<ellipse cx="${r1(x - r * 0.5)}" cy="${r1(base - r * 0.7)}" rx="2.6" ry="5.4" fill="#c47a2a"/>` +
    `<ellipse cx="${r1(x + r * 0.4)}" cy="${r1(base - r * 1.1)}" rx="2.6" ry="5.4" fill="#a83a2a"/>`
  );
}

/** バオバブの木(サバンナ)。太い幹に小さな枝分かれ。幹の太さは高さに比例させる。 */
function baobab(x, base, h, trunk = "#8a6a3f") {
  const top = r1(base - h);
  const tw = r1(h * 0.22);
  const bw = r1(h * 0.16);
  const spread = r1(h * 0.4);
  return (
    `<path d="M${r1(x - tw)},${base}L${r1(x - bw)},${top}L${r1(x + bw)},${top}L${r1(x + tw)},${base}z" fill="${trunk}"/>` +
    `<g stroke="#6f5230" stroke-width="2.6" fill="none">` +
    `<path d="M${r1(x - bw)},${top}c-${r1(spread * 0.6)},-${r1(spread * 0.35)} -${spread},-${r1(spread * 0.1)} -${r1(spread * 1.15)},${r1(spread * 0.25)}"/>` +
    `<path d="M${r1(x + bw)},${top}c${r1(spread * 0.6)},-${r1(spread * 0.35)} ${spread},-${r1(spread * 0.1)} ${r1(spread * 1.15)},${r1(spread * 0.25)}"/>` +
    `<path d="M${x},${top}L${x},${r1(top - spread * 0.7)}"/>` +
    `</g>`
  );
}

/** 円形の草葺き屋根の小屋(北部の集落)。壁(粘土色)の上に屋根(藁色)を載せる。 */
function thatchHut(x, base, r) {
  const wallH = r1(r * 0.9);
  const wallTop = r1(base - wallH);
  const overhang = r1(r * 1.25);
  const roofH = r1(r * 1.1);
  return (
    `<rect x="${r1(x - r * 0.75)}" y="${wallTop}" width="${r1(r * 1.5)}" height="${wallH}" fill="#e0c69a"/>` +
    `<rect x="${r1(x - r * 0.75)}" y="${wallTop}" width="${r1(r * 1.5)}" height="3" fill="#c9a877"/>` +
    `<path d="M${r1(x - overhang)},${wallTop}L${x},${r1(wallTop - roofH)}L${r1(x + overhang)},${wallTop}z" fill="#b98a3a"/>`
  );
}

/** 白亜の砦の壁。狭間胸壁(クレネレーション)付き。 */
function fortWall(x, base, w, h, fill = "#e8e0cc") {
  const merlons = [];
  const step = 10;
  for (let mx = x; mx < x + w; mx += step) {
    merlons.push(`<rect x="${r1(mx)}" y="${r1(base - h - 6)}" width="6" height="6" fill="${fill}"/>`);
  }
  return `<rect x="${r1(x)}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${fill}"/>${merlons.join("")}`;
}

/** 砦の角の稜堡(五角形の張り出し)。 */
function bastion(x, base, w, h, fill = "#e8e0cc") {
  return `<path d="M${r1(x - w / 2)},${base}L${r1(x - w / 2)},${r1(base - h * 0.6)}L${x},${r1(base - h)}L${r1(x + w / 2)},${r1(base - h * 0.6)}L${r1(x + w / 2)},${base}z" fill="${fill}"/>`;
}

/** ケンテ布の縞模様(金・赤・緑・黒)。 */
function kenteStripe(x, y, w, h) {
  const colors = ["#f5b31c", "#a83a2a", "#1f5a2c", "#241a10", "#f5b31c"];
  const cw = r1(w / colors.length);
  return `<g>${colors.map((c, i) => `<rect x="${r1(x + i * cw)}" y="${y}" width="${cw + 0.5}" height="${h}" fill="${c}"/>`).join("")}</g>`;
}

/** アサンテの黄金の腰掛け(シンプルなシルエット)。 */
function goldenStool(x, base, s = 1) {
  return (
    `<rect x="${r1(x - 9 * s)}" y="${r1(base - 3 * s)}" width="${18 * s}" height="${3 * s}" fill="#c9941c"/>` +
    `<path d="M${r1(x - 7 * s)},${r1(base - 3 * s)}Q${x},${r1(base - 11 * s)} ${r1(x + 7 * s)},${r1(base - 3 * s)}" fill="none" stroke="#c9941c" stroke-width="${2.6 * s}"/>` +
    `<rect x="${r1(x - 9 * s)}" y="${r1(base - 14 * s)}" width="${18 * s}" height="${3 * s}" fill="#f5b31c"/>`
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

/** 積み重なった輸送用コンテナ。 */
function containers(x, base, cols, rows) {
  const colors = ["#e8443f", "#f5b31c", "#1e88a8", "#2f6b3a"];
  const parts = [];
  const cw = 18, ch = 12;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const color = colors[(r + c) % colors.length];
      parts.push(`<rect x="${r1(x + c * (cw + 2))}" y="${r1(base - (r + 1) * (ch + 1))}" width="${cw}" height="${ch}" fill="${color}"/>`);
    }
  }
  return parts.join("");
}

/** 漁師のカヌー。船体に彩色の縞(諺を記す帯を単純化)を添える。 */
function canoe(x, base, w, hull = "#e8e0cc") {
  const h = r1(w * 0.22);
  return (
    `<path d="M${r1(x - w / 2)},${base}Q${x},${r1(base + h)} ${r1(x + w / 2)},${base}L${r1(x + w / 2 - 4)},${r1(base - h)}L${r1(x - w / 2 + 4)},${r1(base - h)}z" fill="${hull}"/>` +
    `<rect x="${r1(x - w * 0.3)}" y="${r1(base - h - 3)}" width="${r1(w * 0.6)}" height="3" fill="#e8443f"/>`
  );
}

/** 鉱山の櫓(巻き上げ滑車付きのA型フレーム)。 */
function mineHeadframe(x, base, h) {
  const top = r1(base - h);
  return (
    `<path d="M${r1(x - h * 0.3)},${base}L${x},${top}L${r1(x + h * 0.3)},${base}" fill="none" stroke="#4a4a52" stroke-width="4"/>` +
    `<path d="M${r1(x - h * 0.18)},${r1(base - h * 0.4)}L${r1(x + h * 0.18)},${r1(base - h * 0.4)}" stroke="#4a4a52" stroke-width="3"/>` +
    `<circle cx="${x}" cy="${r1(top + 6)}" r="5" fill="none" stroke="#8a6a3f" stroke-width="2.4"/>` +
    `<rect x="${r1(x - 14)}" y="${r1(base - 12)}" width="28" height="12" fill="#8a6a3f"/>`
  );
}

/** ダムの堤体(コンクリートの壁と放水路)。 */
function damWall(x, base, w, h) {
  return (
    `<rect x="${r1(x)}" y="${r1(base - h)}" width="${w}" height="${h}" fill="#c9c4b6"/>` +
    `<rect x="${r1(x + w * 0.4)}" y="${r1(base - h)}" width="${r1(w * 0.12)}" height="${h}" fill="#8fa8b8" opacity=".7"/>` +
    `<g stroke="#8fa8b8" stroke-width="1.5" opacity=".6">${Array.from({ length: 5 })
      .map((_, i) => `<line x1="${r1(x + i * (w / 5))}" y1="${r1(base - h)}" x2="${r1(x + i * (w / 5))}" y2="${base}"/>`)
      .join("")}</g>`
  );
}

/** サヘル様式のモスク。壁から突き出す木の支柱と円錐形の塔。 */
function mosqueTower(x, base, h) {
  const top = r1(base - h);
  const struts = [];
  for (let i = 0; i < 5; i++) {
    const sy = base - (i + 1) * (h / 6);
    struts.push(`<line x1="${r1(x - 9)}" y1="${r1(sy)}" x2="${r1(x - 13)}" y2="${r1(sy - 3)}" stroke="#6f5230" stroke-width="1.6"/>`);
    struts.push(`<line x1="${r1(x + 9)}" y1="${r1(sy)}" x2="${r1(x + 13)}" y2="${r1(sy - 3)}" stroke="#6f5230" stroke-width="1.6"/>`);
  }
  return (
    `<path d="M${r1(x - 10)},${base}L${r1(x - 7)},${top}L${r1(x + 7)},${top}L${r1(x + 10)},${base}z" fill="#c9a877"/>` +
    `<path d="M${r1(x - 3)},${top}L${x},${r1(top - 10)}L${r1(x + 3)},${top}z" fill="#c9a877"/>` +
    struts.join("")
  );
}

/** 水上の高床の小屋(ンズレズ)。細い杭で支えられる。 */
function stiltHut(x, base, r) {
  return (
    `<line x1="${r1(x - r * 0.7)}" y1="${base}" x2="${r1(x - r * 0.7)}" y2="${r1(base + 14)}" stroke="#6f5230" stroke-width="2.4"/>` +
    `<line x1="${r1(x + r * 0.7)}" y1="${base}" x2="${r1(x + r * 0.7)}" y2="${r1(base + 14)}" stroke="#6f5230" stroke-width="2.4"/>` +
    `<rect x="${r1(x - r)}" y="${r1(base - r * 0.7)}" width="${r1(r * 2)}" height="${r1(r * 0.7)}" fill="#c9a877"/>` +
    `<path d="M${r1(x - r * 1.1)},${r1(base - r * 0.7)}L${x},${r1(base - r * 1.5)}L${r1(x + r * 1.1)},${r1(base - r * 0.7)}z" fill="#8a6a3f"/>`
  );
}

/** 国境の遮断棒(赤白の縞)と検問小屋。 */
function borderBarrier(x, base, w) {
  return (
    `<rect x="${r1(x - 4)}" y="${r1(base - 30)}" width="8" height="30" fill="#c9c4b6"/>` +
    `<g>${Array.from({ length: 6 })
      .map((_, i) => `<rect x="${r1(x + (i * w) / 6)}" y="${r1(base - 34)}" width="${r1(w / 6)}" height="6" fill="${i % 2 === 0 ? "#e8443f" : "#e8e0cc"}"/>`)
      .join("")}</g>`
  );
}

/** 市場の縞の日除け(パラソル)と台。 */
function marketStall(x, base, r, color) {
  return (
    `<rect x="${r1(x - r * 0.9)}" y="${r1(base - r * 0.4)}" width="${r1(r * 1.8)}" height="${r1(r * 0.4)}" fill="#8a6a3f"/>` +
    `<path d="M${r1(x - r)},${r1(base - r * 0.4)}L${x},${r1(base - r * 1.6)}L${r1(x + r)},${r1(base - r * 0.4)}z" fill="${color}"/>` +
    `<line x1="${x}" y1="${r1(base - r * 1.6)}" x2="${x}" y2="${r1(base - r * 0.4)}" stroke="#6f5230" stroke-width="1.6"/>`
  );
}

/** アディンクラふうの幾何学模様(文字ではなく渦巻きと同心円)。 */
function adinkraSymbol(cx, cy, r, color = "#e8e0cc") {
  return (
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="2.4"/>` +
    `<circle cx="${cx}" cy="${cy}" r="${r1(r * 0.55)}" fill="none" stroke="${color}" stroke-width="2"/>` +
    `<path d="M${cx},${r1(cy - r)}q${r1(r * 0.9)},${r1(r * 0.4)} 0,${r1(r * 2)}" fill="none" stroke="${color}" stroke-width="1.8"/>`
  );
}

// ---------------------------------------------------------------------------
// GHANA_BG(400×210)
// ---------------------------------------------------------------------------

export const GHANA_BG = {
  /** アクラ。ブラックスター広場の三連アーチと星、海沿いの首都。 */
  capital: (() => {
    const base = 168;
    return (
      sky("#8fc4e8", "#cfe4f0", base) +
      clouds(70, 26, 0.9) + clouds(320, 20, 0.7) +
      star(200, 72, 22, 8.6, "#1a1a1a") +
      band(base, 210 - base, "#136e8a") +
      ripples(base + 16, "#bfe8f4") + ripples(base + 30, "#8fd0e4") +
      `<g fill="#e8e0cc">` +
      `<rect x="60" y="${base - 46}" width="10" height="46"/>` +
      `<rect x="330" y="${base - 46}" width="10" height="46"/>` +
      `<rect x="60" y="${base - 46}" width="280" height="8"/>` +
      `</g>` +
      palmTree(30, base, 40) + palmTree(374, base, 34)
    );
  })(),

  /** 白亜の砦。エルミナ城・ケープコースト城で共有。 */
  castle: (() => {
    const base = 150;
    return (
      sky("#8fc4e8", "#cfe4f0", base) +
      clouds(90, 24, 0.8) + clouds(300, 18, 0.6) +
      gull(60, 46, 1) + gull(330, 40, 0.8) +
      band(base, 210 - base, "#1e88a8") +
      ripples(base + 18, "#bfe8f4") + ripples(base + 34, "#8fd0e4") +
      bastion(80, base, 60, 34) +
      fortWall(110, base, 190, 34) +
      bastion(320, base, 60, 34) +
      `<rect x="150" y="${base - 50}" width="16" height="16" fill="#e8e0cc"/>` +
      `<rect x="235" y="${base - 46}" width="14" height="12" fill="#e8e0cc"/>`
    );
  })(),

  /** アシャンティ。黄金の腰掛けとケンテの縞、王宮の甍。 */
  asante: (() => {
    const base = 168;
    return (
      sky("#f0c86a", "#f6dfa0", base) +
      sun(340, 44, 22, "#f5b31c") +
      clouds(80, 26, 0.7) + clouds(180, 18, 0.5) +
      ground(base, "#c9a877") +
      kenteStripe(0, 186, W, 24) +
      `<path d="M40,${base}L40,${base - 30}L90,${base - 30}L90,${base}z" fill="#c9a877"/>` +
      `<path d="M32,${base - 30}L65,${base - 52}L98,${base - 30}z" fill="#a83a2a"/>` +
      `<rect x="48" y="${base - 24}" width="8" height="10" fill="#8a6a3f"/>` +
      `<rect x="68" y="${base - 24}" width="8" height="10" fill="#8a6a3f"/>` +
      goldenStool(200, base - 4, 1.6) +
      `<circle cx="188" cy="${base - 16}" r="2.4" fill="#f5b31c"/><circle cx="212" cy="${base - 14}" r="2" fill="#f5b31c"/>` +
      roundTree(340, base, 18) + cocoaPods(340, base, 18) +
      roundTree(300, base, 10)
    );
  })(),

  /** 北部のサバンナ。バオバブと草葺きの集落。 */
  savanna: (() => {
    const base = 158;
    return (
      sky("#f0b25a", "#f6d79a", base) +
      sun(330, 46, 26, "#f5851c") +
      ground(base, "#cbb673") +
      baobab(70, base, 52) +
      baobab(330, base, 40) +
      thatchHut(160, base + 4, 22) +
      thatchHut(210, base + 8, 16) +
      thatchHut(260, base + 2, 12) +
      `<g stroke="#8a6a3f" stroke-width="2" opacity=".6"><path d="M0,${base + 22}h400M0,${base + 34}h400M0,${base + 46}h400"/></g>` +
      `<path d="M110,${base + 8}q6,-10 12,0q6,-14 12,0" fill="none" stroke="#6f5230" stroke-width="2"/>` +
      `<circle cx="20" cy="${base - 40}" r="2" fill="#4a4a52"/><path d="M20,${base - 40}q4,-3 8,0" fill="none" stroke="#4a4a52" stroke-width="1.4"/>`
    );
  })(),

  /** 港。テマ・タコラディで共有。起重機とコンテナ、貨物船。 */
  port: (() => {
    const base = 150;
    return (
      sky("#8fc4e8", "#cfe4f0", base) +
      clouds(100, 26, 0.8) +
      gull(50, 40, 1) + gull(340, 34, 0.8) +
      band(base, 210 - base, "#1e88a8") +
      ripples(base + 18, "#bfe8f4") + ripples(base + 34, "#8fd0e4") +
      `<path d="M230,${base}h140v-14l-16,-8h-108l-16,8z" fill="#4a4a52"/>` +
      crane(70, base, 70) + crane(120, base, 56) +
      containers(30, base, 4, 3)
    );
  })(),

  /** 潟湖のそばの小さな砦と漁村。ウィネバ・ソルトポンド・アノマブ・アパム・アダ・ケタで共有。 */
  lagoonfort: (() => {
    const base = 156;
    return (
      sky("#8fc4e8", "#cfe4f0", base) +
      clouds(90, 24, 0.7) +
      band(base, 210 - base, "#1e88a8") +
      ripples(base + 16, "#bfe8f4") + ripples(base + 30, "#8fd0e4") +
      fortWall(150, base, 70, 22) +
      canoe(60, base + 4, 46) + canoe(340, base + 6, 40) +
      palmTree(20, base, 32) + palmTree(378, base, 30)
    );
  })(),

  /** 市場。ドドワ・コフォリドゥアで共有。縞の日除けと露店。 */
  market: (() => {
    const base = 162;
    return (
      sky("#8fc4e8", "#cfe4f0", base) +
      clouds(90, 20, 0.6) +
      hills(base - 4, "#7ea852", 3) +
      ground(base, "#c9a877") +
      marketStall(70, base, 26, "#e8443f") +
      marketStall(150, base, 24, "#f5b31c") +
      marketStall(230, base, 26, "#2f6b3a") +
      marketStall(310, base, 24, "#1e88a8") +
      `<g fill="#a83a2a"><circle cx="60" cy="${base - 4}" r="3"/><circle cx="66" cy="${base - 4}" r="3"/><circle cx="63" cy="${base - 9}" r="3"/></g>` +
      `<g fill="#e8e0cc"><rect x="180" y="${base - 8}" width="16" height="8" rx="2"/><rect x="198" y="${base - 6}" width="14" height="6" rx="2"/></g>` +
      `<g fill="#4a4a52"><circle cx="110" cy="${base - 14}" r="5"/><rect x="105" y="${base - 9}" width="10" height="16" rx="2"/></g>` +
      `<g fill="#4a4a52"><circle cx="270" cy="${base - 12}" r="5"/><rect x="265" y="${base - 7}" width="10" height="16" rx="2"/></g>`
    );
  })(),

  /** ヴォルタの丘陵。ンカウカウ・ホー・ホホエ・クパンドで共有。 */
  hills: (() => {
    const base = 158;
    return (
      sky("#8fc4e8", "#cfe4f0", base) +
      clouds(320, 24, 0.8) + clouds(60, 16, 0.5) +
      hills(base - 30, "#5f8a52", 3) +
      hills(base - 10, "#7ea852", 4) +
      ground(base, "#7ea852") +
      `<path d="M40,${base - 10}L40,${base + 60}" stroke="#bfe8f4" stroke-width="4" opacity=".8"/>` +
      `<path d="M38,${base + 4}q2,-2 4,0M38,${base + 14}q2,-2 4,0M38,${base + 24}q2,-2 4,0" stroke="#bfe8f4" stroke-width="2" fill="none" opacity=".7"/>` +
      roundTree(320, base, 16) + roundTree(360, base, 12) + roundTree(150, base, 10) +
      thatchHut(220, base + 4, 14) +
      gull(300, 30, 0.8) + gull(330, 24, 0.6)
    );
  })(),

  /** ケンテの織り工房。ボンウィレ専用。 */
  kente: (() => {
    const base = 168;
    return (
      sky("#f0c86a", "#f6dfa0", base) +
      sun(340, 40, 20, "#f5b31c") +
      clouds(80, 18, 0.5) +
      ground(base, "#c9a877") +
      `<rect x="60" y="${base - 60}" width="8" height="60" fill="#6f5230"/>` +
      `<rect x="200" y="${base - 60}" width="8" height="60" fill="#6f5230"/>` +
      `<rect x="60" y="${base - 60}" width="148" height="6" fill="#6f5230"/>` +
      kenteStripe(70, base - 50, 128, 44) +
      `<g stroke="#4a3620" stroke-width="1.4"><line x1="80" y1="${base - 60}" x2="80" y2="${base}"/><line x1="100" y1="${base - 60}" x2="100" y2="${base}"/><line x1="120" y1="${base - 60}" x2="120" y2="${base}"/></g>` +
      `<g fill="#a83a2a"><circle cx="240" cy="${base - 8}" r="6"/><circle cx="256" cy="${base - 8}" r="6"/></g>` +
      `<g fill="#f5b31c"><circle cx="248" cy="${base - 16}" r="6"/></g>` +
      roundTree(340, base, 18) +
      thatchHut(30, base + 4, 14)
    );
  })(),

  /** アディンクラの捺染場。ントンソ専用。 */
  adinkra: (() => {
    const base = 168;
    return (
      sky("#8fc4e8", "#cfe4f0", base) +
      clouds(90, 24, 0.7) + clouds(200, 16, 0.5) +
      ground(base, "#c9a877") +
      `<rect x="60" y="${base - 50}" width="130" height="46" fill="#241a10"/>` +
      adinkraSymbol(90, base - 28, 12) +
      adinkraSymbol(125, base - 28, 12) +
      adinkraSymbol(160, base - 28, 12) +
      `<rect x="58" y="${base - 52}" width="134" height="4" fill="#6f5230"/>` +
      `<rect x="56" y="${base - 4}" width="6" height="14" fill="#6f5230"/><rect x="188" y="${base - 4}" width="6" height="14" fill="#6f5230"/>` +
      `<circle cx="230" cy="${base - 10}" r="10" fill="none" stroke="#8a6a3f" stroke-width="2.4"/>` +
      `<circle cx="230" cy="${base - 10}" r="10" fill="#241a10" opacity=".2"/>` +
      roundTree(320, base, 18) +
      roundTree(280, base, 10)
    );
  })(),

  /** 金鉱の櫓。オブアシ・プレステア・タルクワで共有。 */
  goldmine: (() => {
    const base = 160;
    return (
      sky("#8fc4e8", "#cfe4f0", base) +
      clouds(300, 22, 0.7) + clouds(60, 16, 0.5) +
      ground(base, "#a8794a") +
      mineHeadframe(120, base, 70) +
      mineHeadframe(60, base, 34) +
      `<rect x="180" y="${base - 14}" width="34" height="14" rx="2" fill="#4a4a52"/><circle cx="188" cy="${base}" r="5" fill="#2a2a2a"/><circle cx="206" cy="${base}" r="5" fill="#2a2a2a"/>` +
      `<circle cx="300" cy="${base - 20}" r="4" fill="#f5b31c"/>` +
      `<circle cx="320" cy="${base - 10}" r="3" fill="#f5b31c"/>` +
      `<circle cx="335" cy="${base - 24}" r="3.4" fill="#f5b31c"/>` +
      `<circle cx="310" cy="${base - 4}" r="2.6" fill="#f5b31c"/>` +
      `<path d="M0,${base + 10}h400M0,${base + 22}h400" stroke="#8a6a3f" stroke-width="2" opacity=".5"/>`
    );
  })(),

  /** アコソンボ・ダムの堤体と貯水池。アコソンボ専用。 */
  dam: (() => {
    const base = 150;
    return (
      sky("#8fc4e8", "#cfe4f0", base) +
      clouds(320, 24, 0.8) + clouds(90, 18, 0.6) +
      hills(base - 44, "#5f8a52", 3) +
      damWall(90, base, 220, 46) +
      band(base, 210 - base, "#2f6a95") +
      ripples(base + 18, "#bfe8f4") + ripples(base + 32, "#8fd0e4") +
      `<path d="M170,${r1(base - 46)}v-30M190,${r1(base - 46)}v-34M210,${r1(base - 46)}v-28" stroke="#bfe8f4" stroke-width="3" opacity=".8"/>` +
      `<rect x="60" y="${base - 20}" width="16" height="20" fill="#c9c4b6"/><rect x="324" y="${base - 20}" width="16" height="20" fill="#c9c4b6"/>` +
      gull(40, 40, 0.8) + gull(360, 34, 0.7)
    );
  })(),

  /** 国境の検問所。アフラウ・エルボで共有。 */
  border: (() => {
    const base = 168;
    return (
      sky("#8fc4e8", "#cfe4f0", base) +
      clouds(90, 22, 0.7) + clouds(300, 16, 0.5) +
      ground(base, "#c9a877") +
      `<rect x="0" y="${base - 4}" width="400" height="4" fill="#8a8378"/>` +
      borderBarrier(200, base, 60) +
      `<rect x="170" y="${base - 40}" width="20" height="18" rx="2" fill="#e8e0cc" stroke="#8a8378" stroke-width="1.4"/>` +
      marketStall(60, base, 20, "#e8443f") +
      marketStall(340, base, 20, "#2f6b3a") +
      `<g fill="#4a4a52"><circle cx="90" cy="${base - 10}" r="5"/><rect x="85" y="${base - 5}" width="10" height="16" rx="2"/></g>` +
      `<g fill="#4a4a52"><circle cx="310" cy="${base - 10}" r="5"/><rect x="305" y="${base - 5}" width="10" height="16" rx="2"/></g>`
    );
  })(),

  /** サヘル様式の泥のモスク。ララバンガ専用。 */
  mosque: (() => {
    const base = 164;
    return (
      sky("#f0b25a", "#f6d79a", base) +
      sun(340, 40, 22, "#f5851c") +
      clouds(90, 18, 0.5) +
      ground(base, "#cbb673") +
      mosqueTower(130, base, 60) +
      mosqueTower(210, base, 44) +
      mosqueTower(170, base, 30) +
      `<rect x="100" y="${base - 4}" width="140" height="4" fill="#a8895c"/>` +
      baobab(340, base, 34) +
      baobab(30, base, 24)
    );
  })(),

  /** 水上の高床の集落。ベイン専用。 */
  stiltvillage: (() => {
    const base = 148;
    return (
      sky("#8fc4e8", "#cfe4f0", base) +
      clouds(100, 22, 0.7) + clouds(220, 16, 0.5) +
      gull(50, 40, 0.8) + gull(340, 34, 0.7) +
      band(base, 210 - base, "#2a7196") +
      ripples(base + 20, "#bfe8f4") + ripples(base + 40, "#8fd0e4") +
      stiltHut(90, base, 26) +
      stiltHut(180, base, 22) +
      stiltHut(270, base, 24) +
      `<path d="M116,${base - 4}h38M206,${base - 2}h38" stroke="#6f5230" stroke-width="3"/>` +
      canoe(340, base + 16, 40) +
      canoe(20, base + 10, 30)
    );
  })(),
};

// ---------------------------------------------------------------------------
// GHANA_MARKS(24×24)
// ---------------------------------------------------------------------------

export const GHANA_MARKS = {
  /** ブラックスター広場の星とアーチ。アクラ専用。 */
  capital:
    `<rect x="4" y="16" width="3" height="6" fill="#e8e0cc"/><rect x="17" y="16" width="3" height="6" fill="#e8e0cc"/><rect x="4" y="14" width="16" height="2" fill="#e8e0cc"/>` +
    star(12, 9, 6, 2.4, "#1a1a1a"),

  /** 白亜の砦、狭間胸壁。エルミナ・ケープコーストで共有。 */
  castle:
    `<rect x="3" y="14" width="18" height="8" fill="#e8e0cc"/>` +
    `<g fill="#e8e0cc"><rect x="3" y="9" width="4" height="5"/><rect x="10" y="9" width="4" height="5"/><rect x="17" y="9" width="4" height="5"/></g>` +
    `<rect x="1" y="20" width="22" height="3" fill="#1e88a8"/>`,

  /** 黄金の腰掛けとケンテの縞。クマシ専用。 */
  asante:
    goldenStool(12, 20, 0.9) +
    `<rect x="2" y="22" width="20" height="2" fill="#a83a2a"/>`,

  /** バオバブとサバンナの地平線。タマレ専用。 */
  savanna:
    baobab(12, 22, 15) +
    `<rect x="1" y="22" width="22" height="1.5" fill="#cbb673"/>`,

  /** クレーンとコンテナ。テマ・タコラディで共有。 */
  port:
    `<rect x="2" y="19" width="20" height="3" fill="#1e88a8"/>` +
    `<g fill="#e8443f"><rect x="4" y="15" width="5" height="4"/><rect x="10" y="15" width="5" height="4"/></g>` +
    `<rect x="14" y="4" width="2" height="12" fill="#4a4a52"/><rect x="14" y="4" width="8" height="2" fill="#4a4a52"/>`,

  /** 小さな砦とカヌー。海岸の潟湖沿いの町で共有。 */
  lagoonfort:
    `<rect x="6" y="12" width="12" height="8" fill="#e8e0cc"/><rect x="6" y="9" width="12" height="3" fill="#e8e0cc"/>` +
    `<path d="M2,21Q12,25 22,21z" fill="#e8e0cc"/>` +
    `<rect x="1" y="21" width="22" height="3" fill="#1e88a8"/>`,

  /** 縞の日除けの市場。ドドワ・コフォリドゥアで共有。 */
  market:
    `<path d="M4,15L12,6L20,15z" fill="#e8443f"/><line x1="12" y1="15" x2="12" y2="21" stroke="#6f5230" stroke-width="1.6"/>` +
    `<rect x="4" y="21" width="16" height="2" fill="#8a6a3f"/>`,

  /** 重なる緑の丘陵。ンカウカウ・ホー・ホホエ・クパンドで共有。 */
  hills:
    `<path d="M2,20c4,-8 8,-8 12,0z" fill="#5f8a52"/><path d="M10,20c4,-10 10,-10 14,0z" fill="#7ea852"/>`,

  /** 織機とケンテの帯。ボンウィレ専用。 */
  kente:
    `<rect x="4" y="4" width="2" height="17" fill="#6f5230"/><rect x="18" y="4" width="2" height="17" fill="#6f5230"/>` +
    kenteStripe(6, 8, 12, 12),

  /** アディンクラの渦巻き紋様。ントンソ専用。 */
  adinkra:
    `<rect x="2" y="4" width="20" height="16" fill="#241a10"/>` +
    adinkraSymbol(12, 12, 7),

  /** 鉱山の櫓。オブアシ・プレステア・タルクワで共有。 */
  goldmine:
    mineHeadframe(12, 22, 18) +
    `<circle cx="19" cy="18" r="1.6" fill="#f5b31c"/>`,

  /** ダムの堤体。アコソンボ専用。 */
  dam:
    `<rect x="3" y="8" width="18" height="12" fill="#c9c4b6"/>` +
    `<rect x="0" y="20" width="24" height="3" fill="#2f6a95"/>`,

  /** 縞の遮断棒。アフラウ・エルボで共有。 */
  border:
    `<rect x="11" y="4" width="2" height="16" fill="#c9c4b6"/>` +
    `<g><rect x="2" y="7" width="4" height="4" fill="#e8443f"/><rect x="6" y="7" width="4" height="4" fill="#e8e0cc"/><rect x="10" y="7" width="4" height="4" fill="#e8443f"/><rect x="14" y="7" width="4" height="4" fill="#e8e0cc"/></g>`,

  /** サヘル様式の泥のモスクの塔。ララバンガ専用。 */
  mosque:
    `<path d="M8,22L9,10L15,10L16,22z" fill="#c9a877"/><path d="M11,10L12,4L13,10z" fill="#c9a877"/>` +
    `<line x1="6" y1="16" x2="8" y2="14" stroke="#6f5230" stroke-width="1.4"/><line x1="18" y1="16" x2="16" y2="14" stroke="#6f5230" stroke-width="1.4"/>`,

  /** 水上の高床の小屋。ベイン専用。 */
  stiltvillage:
    `<line x1="8" y1="16" x2="8" y2="23" stroke="#6f5230" stroke-width="1.6"/><line x1="16" y1="16" x2="16" y2="23" stroke="#6f5230" stroke-width="1.6"/>` +
    `<rect x="5" y="12" width="14" height="6" fill="#c9a877"/><path d="M4,12L12,6L20,12z" fill="#8a6a3f"/>` +
    `<rect x="0" y="21" width="24" height="2" fill="#2a7196"/>`,
};
