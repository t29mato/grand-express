/**
 * 北海道盤面の都市イラスト。
 *
 * `HOKKAIDO_MARKS` は24×24の座標系に描くシンボル、`HOKKAIDO_BG` は400×210の
 * 座標系に描く背景シーン(いずれもSVG断片の文字列)。フランス・ノルウェーと
 * 同じく最初から文字列として持つ。動きは含めない。
 *
 * 【この盤面の芯】**鉄道は石炭のために敷かれ、いま人口で閉じられている。**
 * 40都市のうち7つは、路線が廃止された町である。**廃墟としては描かない。**
 * 人はいまも住んでいる。線が「無い」ことは、
 * **車止め・草に埋もれた路盤・駅前に立つバス停**の3つで静かに描く
 * (`bufferStop()` / `trackbedOvergrown()` / `busStop()`)。
 * ノルウェー盤の `railterminus` と同じ手つき。
 *
 * アイヌの人々は、人物や顔ではなく**建築(チセ)**で表す
 * (`lakeshore` / `chise`)。神秘化しない。
 *
 * 色は他の盤面と揃える。空 #8fc4e8〜#cfe4f0、顔・白 #f6efe2、
 * 強調 #f5b31c/#e8443f/#5b8fe8。北海道らしさは
 * **トタン屋根の赤 #b4453c・青 #3f6f9a・緑 #3f7a5a、下見板の茶 #7a5a3c、
 * トドマツの濃緑 #28402f、白樺 #e4e6e0、雪 #eef4fa と雪影 #c8d8e6、
 * 石炭の黒 #2a2620、錆 #8a5a3a、オホーツクの青 #2f6a8f** で出す。
 *
 * **雪と空が多い盤面なので、白と淡い青を直に接しさせない。**
 * 雪原の上端には必ず針葉樹の列か雪影の帯を挟む(縮小すると輪郭が消える)。
 *
 * 鍵は `cities.mjs` の `mark` / `bg` と一対一(記号32種・背景23種)。
 *
 * **背景SVGの中央25%(x=151〜249 / y=54〜152)は都市シンボルに隠れて
 * 見えない。** 見せたい細部は左右3分の1と手前(y>170)に置く。
 * `sky()` は必ず第3引数(次に来る塗りの開始y)を渡すこと。渡し忘れると
 * 空と地面のあいだに塗り残しの帯ができる。
 * 確認は `node scripts/check-city-backgrounds.mjs hokkaido --src`。
 */

// ---------------------------------------------------------------------------
// 背景シーンの組み立て部品
// ---------------------------------------------------------------------------

const W = 400;

/** 小数の桁を抑える(SVGを読みやすく保つため)。 */
const r1 = (v) => Math.round(v * 10) / 10;

/** 横帯。 */
function band(y, h, fill) {
  return `<rect x="0" y="${r1(y)}" width="${W}" height="${r1(h)}" fill="${fill}"/>`;
}

/**
 * 空。**第3引数に「次に来る塗りの開始y」を渡すこと。**
 * 既定の118はすぐ下に地面が来る場合の値でしかない。
 */
function sky(top, bottom, to = 118) {
  const h2 = to - 78;
  return band(0, Math.min(84, to), top) + (h2 > 0 ? band(78, h2, bottom) : "");
}

/** 地面(下端まで塗る)。 */
function ground(y, fill) {
  return `<rect x="0" y="${r1(y)}" width="${W}" height="${r1(210 - y)}" fill="${fill}"/>`;
}

/** 接地の影。敷かないと物が浮く。 */
function shade(cx, cy, rx, ry, o = ".2") {
  return `<ellipse cx="${r1(cx)}" cy="${r1(cy)}" rx="${r1(rx)}" ry="${r1(ry)}" fill="#000" opacity="${o}"/>`;
}

/** 冬の低い太陽。にじみを1枚重ねる。 */
function lowSun(cx, cy, r, core = "#f8d88a", halo = "#f5d89a") {
  return (
    `<circle cx="${cx}" cy="${cy}" r="${r1(r * 2.2)}" fill="${halo}" opacity=".3"/>` +
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${core}"/>`
  );
}

function clouds(cx, cy, scale = 1, fill = "#f6efe2", o = ".8") {
  const e = (dx, rx, ry) =>
    `<ellipse cx="${r1(cx + dx * scale)}" cy="${cy}" rx="${r1(rx * scale)}" ry="${r1(ry * scale)}"/>`;
  return `<g opacity="${o}" fill="${fill}">${e(0, 18, 7)}${e(-10, 11, 5.5)}${e(11, 13, 5.5)}</g>`;
}

/** 遠景のなだらかな丘。 */
function hills(y, fill, count = 4, h = 30) {
  const parts = [];
  for (let i = 0; i < count; i++) {
    const cx = 40 + (i * W) / count;
    parts.push(`<path d="M${r1(cx - 72)},${y}c20,${-h} 52,${-h} 72,0z" fill="${fill}"/>`);
  }
  return `<g opacity=".95">${parts.join("")}</g>`;
}

/**
 * 遠景の峰。`list` は `[頂点x, 頂点y, 裾の半幅, 雪をかぶるか]`。
 * **雪の白を空の淡い青に直に接しさせないため、雪は稜線より内側にだけ置く。**
 */
function peaks(baseY, fill, list, snow = "#e8eef4") {
  const parts = [];
  for (const [x, top, half, hasSnow] of list) {
    parts.push(
      `<path d="M${r1(x - half)},${baseY}L${x},${top}L${r1(x + half)},${baseY}z" fill="${fill}"/>`,
    );
    if (hasSnow) {
      const w = r1(half * 0.4);
      const by = r1(top + half * 0.44);
      parts.push(
        `<path d="M${x},${r1(top + 2)}L${r1(x + w)},${by}q${r1(-w * 0.5)},4 ${r1(-w)},0q${r1(-w * 0.5)},-4 ${r1(-w)},0z" fill="${snow}"/>`,
      );
    }
  }
  return parts.join("");
}

/** トドマツ・エゾマツ。北海道の針葉樹は細く尖る。 */
function fir(x, base, h, fill = "#28402f") {
  const w = r1(h * 0.42);
  return (
    `<rect x="${r1(x - 1.5)}" y="${r1(base - 5)}" width="3" height="5" fill="#4a3a28"/>` +
    `<path d="M${r1(x - w / 2)},${r1(base - 3)}L${x},${r1(base - h)}L${r1(x + w / 2)},${r1(base - 3)}z" fill="${fill}"/>` +
    `<path d="M${r1(x - w / 2.6)},${r1(base - h * 0.5)}L${x},${r1(base - h * 0.96)}L${r1(x + w / 2.6)},${r1(base - h * 0.5)}z" fill="${fill}"/>`
  );
}

/** トドマツの林(帯で置く)。雪原と空のあいだの輪郭にもなる。 */
function firRow(y, from, to, count, h, fill = "#28402f") {
  const parts = [];
  for (let i = 0; i < count; i++) {
    const x = r1(from + ((to - from) * i) / (count - 1));
    parts.push(fir(x, y, r1(h * (0.74 + ((i * 7) % 5) * 0.12)), fill));
  }
  return parts.join("");
}

/** 白樺。幹の黒い節を入れないと樹に見えない。 */
function birch(x, base, h) {
  const top = r1(base - h);
  return (
    `<path d="M${r1(x - 1.8)},${base}L${r1(x - 1)},${top}h2L${r1(x + 1.8)},${base}z" fill="#e4e6e0"/>` +
    `<g fill="#3a3a38"><rect x="${r1(x - 1.4)}" y="${r1(base - h * 0.7)}" width="2.8" height="1.6"/>` +
    `<rect x="${r1(x - 1.2)}" y="${r1(base - h * 0.44)}" width="2.4" height="1.4"/></g>` +
    `<g stroke="#5a5a52" stroke-width="1.1" fill="none"><path d="M${x},${r1(top + h * 0.2)}l-7,-8M${x},${r1(top + h * 0.3)}l8,-9M${x},${r1(top + h * 0.44)}l-9,-6"/></g>`
  );
}

/**
 * 防風林。根釧台地・十勝の**まっすぐな帯**。北海道の畑を北海道に見せる要。
 */
function shelterbelt(y, from, to, h = 24, fill = "#2f5240") {
  const parts = [`<rect x="${r1(from)}" y="${r1(y - 3)}" width="${r1(to - from)}" height="4" fill="#3a4a34"/>`];
  const count = Math.max(3, Math.round((to - from) / 13));
  for (let i = 0; i < count; i++) {
    const x = r1(from + ((to - from) * i) / (count - 1));
    const hh = r1(h * (0.82 + ((i * 3) % 4) * 0.09));
    parts.push(
      `<path d="M${r1(x - h * 0.2)},${y}L${x},${r1(y - hh)}L${r1(x + h * 0.2)},${y}z" fill="${fill}"/>`,
    );
  }
  return parts.join("");
}

/** 草の株。廃線跡と原野に散らす。 */
function tuft(x, y, h = 7, fill = "#7f9a52") {
  return (
    `<path d="M${x},${y}l${r1(-h * 0.4)},${r1(-h)}M${x},${y}v${r1(-h * 1.15)}M${x},${y}l${r1(h * 0.42)},${r1(-h * 0.9)}" ` +
    `stroke="${fill}" stroke-width="1.6" fill="none" stroke-linecap="round"/>`
  );
}

/** ヨシ原。湿原の縁に。 */
function reeds(y, from, to, count = 16, fill = "#a89a5f") {
  const parts = [];
  for (let i = 0; i < count; i++) {
    const x = r1(from + ((to - from) * i) / (count - 1));
    const h = r1(11 + ((i * 5) % 4) * 3);
    parts.push(
      `<path d="M${x},${y}v${-h}" stroke="${fill}" stroke-width="1.6" stroke-linecap="round" fill="none"/>` +
        `<ellipse cx="${x}" cy="${r1(y - h - 2)}" rx="1.5" ry="3" fill="#8a7a48"/>`,
    );
  }
  return parts.join("");
}

/** 水面のさざ波。 */
function ripples(y, color = "#bfe8f4", o = ".5") {
  return `<g stroke="${color}" stroke-width="2" opacity="${o}" fill="none"><path d="M22,${y}h64M186,${y + 11}h94M104,${y + 22}h58M296,${y + 5}h74"/></g>`;
}

/** 波頭。外洋に開いた荒い海に。 */
function whitecaps(y, list, color = "#f0f8fc") {
  return `<g fill="${color}" opacity=".85">${list
    .map(([x, dy, s = 1]) => `<path d="M${x},${r1(y + dy)}q${r1(7 * s)},${r1(-5 * s)} ${r1(14 * s)},0q${r1(-7 * s)},${r1(3 * s)} ${r1(-14 * s)},0z"/>`)
    .join("")}</g>`;
}

/** 雪面の風紋・吹きだまり。 */
function drifts(y, color = "#c8d8e6", o = ".8") {
  return (
    `<g fill="${color}" opacity="${o}">` +
    `<path d="M0,${y}q40,-9 84,-2q40,7 78,0v9H0z"/>` +
    `<path d="M232,${y + 15}q46,-10 92,-2q34,4 76,-2v10H232z"/>` +
    `<path d="M14,${y + 32}q56,-8 104,1q40,4 70,-2v9H14z"/>` +
    `</g>`
  );
}

/** 生きている線路。枕木とレール。 */
function rails(y, x0 = 0, x1 = W, step = 15, sleeper = "#4a3a28", rail = "#c0c6cc") {
  const parts = [`<g fill="${sleeper}">`];
  for (let x = x0; x < x1; x += step) {
    parts.push(`<rect x="${r1(x)}" y="${r1(y - 3)}" width="9" height="7"/>`);
  }
  parts.push(
    `</g><g stroke="${rail}" stroke-width="2" fill="none"><path d="M${x0},${r1(y - 2)}H${x1}M${x0},${r1(y + 3)}H${x1}"/></g>`,
  );
  return parts.join("");
}

/**
 * **廃線の路盤。**レールは剥がされ、枕木が草に埋もれる。
 * これがこの盤面の芯を受け持つ図形なので、**「線が無い」ことが分かる形**に
 * する——砂利の帯だけが真っ直ぐ残り、その上を草が越えていく。
 */
function trackbedOvergrown(y, x0 = 0, x1 = W, step = 26) {
  const parts = [
    `<rect x="${r1(x0)}" y="${r1(y - 7)}" width="${r1(x1 - x0)}" height="16" fill="#a09880" opacity=".75"/>`,
  ];
  let i = 0;
  for (let x = x0 + 6; x < x1 - 12; x += step) {
    parts.push(
      `<rect x="${r1(x)}" y="${r1(y - 2 + (i % 2) * 3)}" width="17" height="5" fill="#5a4a36" opacity=".9" transform="rotate(${i % 3 ? 0 : 2} ${r1(x + 8)} ${y})"/>`,
    );
    i++;
  }
  for (let x = x0 + 2; x < x1; x += 17) {
    parts.push(tuft(r1(x), r1(y + 7 - ((x / 17) % 3) * 4), 8));
  }
  return parts.join("");
}

/** 車止め。**その先に線路が無いことを示す。** */
function bufferStop(x, base, s = 1) {
  const u = (v) => r1(v * s);
  return (
    `<rect x="${r1(x - 15 * s)}" y="${r1(base - 4 * s)}" width="${u(30)}" height="${u(4)}" fill="#4a3a28"/>` +
    `<path d="M${r1(x - 12 * s)},${r1(base - 4 * s)}l${u(4)},${u(-14)}h${u(16)}l${u(4)},${u(14)}z" fill="#6b7078"/>` +
    `<rect x="${r1(x - 10 * s)}" y="${r1(base - 22 * s)}" width="${u(20)}" height="${u(6)}" fill="#e8443f"/>` +
    `<g fill="#f0ece0"><rect x="${r1(x - 6 * s)}" y="${r1(base - 22 * s)}" width="${u(3.4)}" height="${u(6)}"/>` +
    `<rect x="${r1(x + 1.6 * s)}" y="${r1(base - 22 * s)}" width="${u(3.4)}" height="${u(6)}"/></g>` +
    `<g stroke="#4a4038" stroke-width="${u(1.4)}" fill="none"><path d="M${r1(x - 8 * s)},${r1(base - 6 * s)}L${r1(x + 8 * s)},${r1(base - 15 * s)}M${r1(x + 8 * s)},${r1(base - 6 * s)}L${r1(x - 8 * s)},${r1(base - 15 * s)}"/></g>`
  );
}

/** 電信柱。原野では、これが列になって道の代わりに遠近をつくる。 */
function pole(x, base, h, fill = "#5a4630") {
  const top = r1(base - h);
  return (
    `<rect x="${r1(x - 1.5)}" y="${top}" width="3" height="${h}" fill="${fill}"/>` +
    `<rect x="${r1(x - 7)}" y="${r1(top + 4)}" width="14" height="2.2" fill="${fill}"/>` +
    `<g fill="#dfe4ea"><circle cx="${r1(x - 5)}" cy="${r1(top + 3)}" r="1.4"/><circle cx="${r1(x + 5)}" cy="${r1(top + 3)}" r="1.4"/></g>`
  );
}

/** バス停。**駅がここに変わった、という一言。** */
function busStop(x, base, h = 30) {
  const top = r1(base - h);
  return (
    `<rect x="${r1(x - 1.8)}" y="${top}" width="3.6" height="${h}" fill="#6b7078"/>` +
    `<ellipse cx="${x}" cy="${r1(top - 1)}" rx="8" ry="8.4" fill="#f0ece0"/>` +
    `<ellipse cx="${x}" cy="${r1(top - 1)}" rx="8" ry="8.4" fill="none" stroke="#3f6f9a" stroke-width="2"/>` +
    `<path d="M${r1(x - 4.6)},${r1(top - 4)}h9.2v5.6h-9.2z" fill="#3f6f9a"/>` +
    `<rect x="${r1(x + 2)}" y="${r1(base - h * 0.42)}" width="13" height="16" fill="#e8e4d8"/>` +
    `<g stroke="#8a8578" stroke-width="1" fill="none"><path d="M${r1(x + 4)},${r1(base - h * 0.42 + 4)}h9M${r1(x + 4)},${r1(base - h * 0.42 + 8)}h9M${r1(x + 4)},${r1(base - h * 0.42 + 12)}h9"/></g>`
  );
}

/**
 * 北海道の家。**急な三角屋根のトタン**(赤・青・緑)と煙突。
 * 本州の瓦屋根と描き分ける要。
 */
function tinHouse(x, base, w, h, roof = "#b4453c", wall = "#e0d8c8") {
  const top = r1(base - h);
  const cx = r1(x + w / 2);
  const ridge = r1(top - w * 0.44);
  const parts = [
    `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="${wall}"/>`,
    `<path d="M${r1(x - 4)},${r1(top + 1)}L${cx},${ridge}L${r1(x + w + 4)},${r1(top + 1)}z" fill="${roof}"/>`,
    `<path d="M${r1(x - 4)},${r1(top + 1)}L${cx},${ridge}l3,0L${r1(x - 1)},${r1(top + 1)}z" fill="#000" opacity=".12"/>`,
    `<rect x="${r1(x - 4)}" y="${r1(top + 1)}" width="${r1(w + 8)}" height="2.4" fill="#8a8578"/>`,
    `<rect x="${r1(cx + w * 0.24)}" y="${r1(ridge - 6)}" width="4.4" height="${r1(top - ridge + 12)}" fill="#5f646e"/>`,
  ];
  const cols = Math.max(1, Math.round(w / 26));
  for (let i = 0; i < cols; i++) {
    const wx = r1(x + (w * (i + 0.5)) / cols - 5);
    const wy = r1(top + h * 0.26);
    parts.push(
      `<rect x="${r1(wx - 1.2)}" y="${r1(wy - 1.2)}" width="12.4" height="${r1(h * 0.4 + 2.4)}" fill="#f0ece0"/>`,
      `<rect x="${wx}" y="${wy}" width="10" height="${r1(h * 0.4)}" fill="#5f7f96"/>`,
      `<path d="M${r1(wx + 5)},${wy}v${r1(h * 0.4)}" stroke="#f0ece0" stroke-width="1.2" fill="none"/>`,
    );
  }
  return parts.join("");
}

/** 下見板張りの倉・番屋。にしんの浜と港の町に。 */
function boardHouse(x, base, w, h, wall = "#7a5a3c", roof = "#4a4f58") {
  const top = r1(base - h);
  const cx = r1(x + w / 2);
  const ridge = r1(top - w * 0.3);
  const parts = [
    `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="${wall}"/>`,
    `<path d="M${r1(x - 5)},${top}L${cx},${ridge}L${r1(x + w + 5)},${top}z" fill="${roof}"/>`,
    `<rect x="${r1(x - 5)}" y="${top}" width="${r1(w + 10)}" height="2.4" fill="#3a3f47"/>`,
  ];
  for (let i = 1; i < 5; i++) {
    parts.push(
      `<path d="M${x},${r1(top + (h * i) / 5)}h${w}" stroke="#000" stroke-width="1" opacity=".16" fill="none"/>`,
    );
  }
  parts.push(
    `<rect x="${r1(x + w * 0.14)}" y="${r1(top + h * 0.3)}" width="${r1(w * 0.2)}" height="${r1(h * 0.3)}" fill="#3a3228"/>`,
    `<rect x="${r1(x + w * 0.6)}" y="${r1(base - h * 0.5)}" width="${r1(w * 0.22)}" height="${r1(h * 0.5)}" fill="#4a3a28"/>`,
  );
  return parts.join("");
}

/**
 * 炭住の長屋。同じ戸口が並ぶ。`closed` の数だけ**右から板で塞ぐ**。
 * **崩さない。**人が住んでいた形のまま、戸だけが閉まっている。
 */
function rowHouse(x, base, w, h, units = 4, closed = 0) {
  const top = r1(base - h);
  const parts = [
    `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="#cfc6b4"/>`,
    `<path d="M${r1(x - 4)},${top}l${r1(w * 0.06)},${r1(-h * 0.34)}h${r1(w * 0.88)}l${r1(w * 0.06)},${r1(h * 0.34)}z" fill="#3f6f9a"/>`,
    `<rect x="${r1(x - 4)}" y="${top}" width="${r1(w + 8)}" height="2.4" fill="#5f646e"/>`,
  ];
  for (let i = 0; i < units; i++) {
    const ux = r1(x + (w * (i + 0.5)) / units);
    const shut = i >= units - closed;
    parts.push(
      `<rect x="${r1(ux - 6)}" y="${r1(base - h * 0.56)}" width="12" height="${r1(h * 0.56)}" fill="${shut ? "#6b6250" : "#4a3a28"}"/>`,
      `<rect x="${r1(ux - 9)}" y="${r1(top + h * 0.16)}" width="7" height="${r1(h * 0.24)}" fill="${shut ? "#7a7468" : "#5f7f96"}"/>`,
    );
    if (shut) {
      parts.push(
        `<path d="M${r1(ux - 7)},${r1(base - h * 0.5)}l14,4M${r1(ux - 7)},${r1(base - h * 0.28)}l14,4" stroke="#8a6a44" stroke-width="2.6" fill="none"/>`,
      );
    }
  }
  return parts.join("");
}

/** 木造の駅舎。 */
function stationHouse(x, base, w, h, wall = "#e8e0d0", roof = "#4a4f58") {
  const top = r1(base - h);
  const cx = r1(x + w / 2);
  return (
    `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="${wall}"/>` +
    `<path d="M${r1(x - 6)},${top}L${cx},${r1(top - h * 0.5)}L${r1(x + w + 6)},${top}z" fill="${roof}"/>` +
    `<rect x="${r1(x - 6)}" y="${top}" width="${r1(w + 12)}" height="2.6" fill="#3a3f47"/>` +
    `<rect x="${r1(cx - w * 0.16)}" y="${r1(base - h * 0.62)}" width="${r1(w * 0.32)}" height="${r1(h * 0.62)}" fill="#3a3228"/>` +
    `<g fill="#5f7f96"><rect x="${r1(x + w * 0.08)}" y="${r1(top + h * 0.24)}" width="${r1(w * 0.16)}" height="${r1(h * 0.3)}"/>` +
    `<rect x="${r1(x + w * 0.76)}" y="${r1(top + h * 0.24)}" width="${r1(w * 0.16)}" height="${r1(h * 0.3)}"/></g>` +
    `<rect x="${r1(cx - w * 0.22)}" y="${r1(top - 6)}" width="${r1(w * 0.44)}" height="7" fill="#f0ece0"/>` +
    `<rect x="${r1(cx - w * 0.18)}" y="${r1(top - 4.6)}" width="${r1(w * 0.36)}" height="4.2" fill="#3f6f9a"/>`
  );
}

/** サイロ。円筒とドーム。 */
function silo(x, base, h, wall = "#dfd8c8", cap = "#8a8578") {
  const w = r1(h * 0.36);
  const top = r1(base - h);
  return (
    `<rect x="${r1(x - w / 2)}" y="${top}" width="${w}" height="${h}" fill="${wall}"/>` +
    `<path d="M${r1(x - w / 2)},${top}a${r1(w / 2)},${r1(w / 2.4)} 0 0 1 ${w},0z" fill="${cap}"/>` +
    `<g stroke="#b0a894" stroke-width="1.2" fill="none"><path d="M${r1(x - w / 2)},${r1(top + h * 0.3)}h${w}M${r1(x - w / 2)},${r1(top + h * 0.6)}h${w}"/></g>` +
    `<rect x="${r1(x + w * 0.24)}" y="${top}" width="${r1(w * 0.26)}" height="${h}" fill="#000" opacity=".1"/>`
  );
}

/** 牛舎。長くて低い切妻。 */
function barn(x, base, w, h, roof = "#3f7a5a", wall = "#e4dccc") {
  const top = r1(base - h);
  const parts = [
    `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="${wall}"/>`,
    `<path d="M${r1(x - 5)},${top}l${r1(w * 0.1)},${r1(-h * 0.5)}h${r1(w * 0.8)}l${r1(w * 0.1)},${r1(h * 0.5)}z" fill="${roof}"/>`,
    `<rect x="${r1(x - 5)}" y="${top}" width="${r1(w + 10)}" height="2.4" fill="#3a4a40"/>`,
  ];
  const n = Math.max(2, Math.round(w / 24));
  for (let i = 0; i < n; i++) {
    parts.push(
      `<rect x="${r1(x + (w * (i + 0.5)) / n - 6)}" y="${r1(top + h * 0.28)}" width="12" height="${r1(h * 0.42)}" fill="#4a4038"/>`,
    );
  }
  return parts.join("");
}

/** ホルスタイン。白地に黒い斑。 */
function cow(x, base, s = 1, facing = 1) {
  const u = (v) => r1(v * s);
  const f = facing;
  return (
    `<g fill="#3a3630"><rect x="${r1(x - 8 * s)}" y="${r1(base - 9 * s)}" width="${u(2.6)}" height="${u(9)}"/>` +
    `<rect x="${r1(x - 3 * s)}" y="${r1(base - 9 * s)}" width="${u(2.6)}" height="${u(9)}"/>` +
    `<rect x="${r1(x + 3 * s)}" y="${r1(base - 9 * s)}" width="${u(2.6)}" height="${u(9)}"/>` +
    `<rect x="${r1(x + 7 * s)}" y="${r1(base - 9 * s)}" width="${u(2.6)}" height="${u(9)}"/></g>` +
    `<ellipse cx="${x}" cy="${r1(base - 13 * s)}" rx="${u(11.5)}" ry="${u(6)}" fill="#f4f2ec"/>` +
    `<g fill="#3a3630"><ellipse cx="${r1(x - 4 * s)}" cy="${r1(base - 15 * s)}" rx="${u(4)}" ry="${u(3)}"/>` +
    `<ellipse cx="${r1(x + 5 * s)}" cy="${r1(base - 11 * s)}" rx="${u(3.4)}" ry="${u(2.6)}"/></g>` +
    `<path d="M${r1(x + f * 10 * s)},${r1(base - 16 * s)}l${u(f * 7)},${u(-2)}l${u(f * 1)},${u(7)}l${u(-f * 7)},${u(2)}z" fill="#f4f2ec"/>` +
    `<path d="M${r1(x + f * 15 * s)},${r1(base - 17 * s)}l${u(f * 4)},${u(0.6)}l${u(-f * 0.6)},${u(4)}l${u(-f * 4)},${u(-0.8)}z" fill="#3a3630"/>` +
    `<path d="M${r1(x + f * 14 * s)},${r1(base - 19 * s)}l${u(f * 2.6)},${u(-2.6)}` +
    `M${r1(x + f * 17 * s)},${r1(base - 18.4 * s)}l${u(f * 2.4)},${u(-2.8)}" stroke="#d8d0bc" stroke-width="${u(1.4)}" fill="none" stroke-linecap="round"/>` +
    `<path d="M${r1(x - f * 11 * s)},${r1(base - 17 * s)}q${u(-f * 4)},${u(5)} ${u(-f * 1.6)},${u(11)}" stroke="#3a3630" stroke-width="${u(1.6)}" fill="none"/>`
  );
}

/** かもめ。 */
function gull(x, y, s = 1) {
  return `<path d="M${x},${y}q${r1(3.4 * s)},${r1(-3.4 * s)} ${r1(6.8 * s)},0q${r1(3.4 * s)},${r1(-3.4 * s)} ${r1(6.8 * s)},0" stroke="#3f434a" stroke-width="${r1(1.6 * s)}" fill="none" stroke-linecap="round"/>`;
}

/** 漁船。**さざ波を描いたあとに呼ぶ。** */
function fishingBoat(x, y, w, hull = "#2f4a5f") {
  const h = r1(w * 0.24);
  return (
    `<path d="M${x},${y}h${w}l${r1(-w * 0.12)},${h}h${r1(-w * 0.76)}z" fill="${hull}"/>` +
    `<path d="M${r1(x + 2)},${r1(y + 1.6)}h${r1(w - 4)}l${r1(-w * 0.1)},${r1(h * 0.4)}h${r1(-w * 0.8)}z" fill="#2f2620" opacity=".5"/>` +
    `<rect x="${x}" y="${y}" width="${w}" height="2.4" fill="#f0ece0"/>` +
    `<rect x="${r1(x + w * 0.5)}" y="${r1(y - h * 1.5)}" width="${r1(w * 0.3)}" height="${r1(h * 1.5)}" fill="#f0ece0"/>` +
    `<rect x="${r1(x + w * 0.54)}" y="${r1(y - h * 1.1)}" width="${r1(w * 0.22)}" height="${r1(h * 0.6)}" fill="#3f5f7a"/>` +
    `<rect x="${r1(x + w * 0.26)}" y="${r1(y - h * 3.2)}" width="2.2" height="${r1(h * 3.2)}" fill="#8a5a3a"/>` +
    `<path d="M${r1(x + w * 0.27)},${r1(y - h * 3)}L${r1(x + w * 0.7)},${r1(y - h * 1.5)}" stroke="#8a5a3a" stroke-width="1" fill="none"/>` +
    `<g fill="#e8eef4" opacity=".22"><rect x="${r1(x + w * 0.2)}" y="${r1(y + h)}" width="4" height="${r1(h * 1.4)}"/>` +
    `<rect x="${r1(x + w * 0.62)}" y="${r1(y + h)}" width="4" height="${r1(h * 1)}"/></g>`
  );
}

/** 風車。3枚羽根。 */
function windTurbine(x, base, h, tilt = 0) {
  const hubY = r1(base - h);
  const blade = r1(h * 0.46);
  const arms = [0, 120, 240]
    .map(
      (a) =>
        `<path d="M0,0L${r1(-blade * 0.05)},${r1(-blade)}q${r1(blade * 0.1)},${r1(-blade * 0.08)} ${r1(blade * 0.14)},0z" fill="#f0f2f4" transform="rotate(${a + tilt})"/>`,
    )
    .join("");
  return (
    `<path d="M${r1(x - 2.6)},${base}L${r1(x - 1.1)},${hubY}h2.2L${r1(x + 2.6)},${base}z" fill="#e4e8ec"/>` +
    `<g transform="translate(${x},${hubY})">${arms}</g>` +
    `<circle cx="${x}" cy="${hubY}" r="2.2" fill="#b8bcc4"/>`
  );
}

/** 竪坑櫓。石炭の町の輪郭そのもの。 */
function headframe(x, base, h, fill = "#4a4038") {
  const top = r1(base - h);
  const hw = r1(h * 0.2);
  return (
    `<path d="M${r1(x - hw)},${base}L${r1(x - hw * 0.5)},${top}h${r1(hw)}L${r1(x + hw)},${base}h${r1(-hw * 0.4)}L${r1(x + hw * 0.34)},${r1(top + 4)}h${r1(-hw * 0.68)}L${r1(x - hw * 0.6)},${base}z" fill="${fill}"/>` +
    `<g fill="${fill}"><rect x="${r1(x - hw * 1.1)}" y="${r1(top + h * 0.3)}" width="${r1(hw * 2.2)}" height="2.6"/>` +
    `<rect x="${r1(x - hw * 0.9)}" y="${r1(top + h * 0.58)}" width="${r1(hw * 1.8)}" height="2.4"/></g>` +
    `<g stroke="${fill}" stroke-width="1.4" fill="none"><path d="M${r1(x - hw * 0.7)},${r1(top + 6)}L${r1(x + hw * 0.8)},${r1(top + h * 0.55)}M${r1(x + hw * 0.7)},${r1(top + 6)}L${r1(x - hw * 0.8)},${r1(top + h * 0.55)}"/></g>` +
    `<circle cx="${x}" cy="${r1(top + 2)}" r="${r1(h * 0.17)}" fill="#8a8578"/>` +
    `<circle cx="${x}" cy="${r1(top + 2)}" r="${r1(h * 0.09)}" fill="#4a4038"/>` +
    `<path d="M${r1(x + h * 0.17)},${r1(top + 2)}L${r1(x + h * 0.5)},${r1(base - h * 0.2)}" stroke="#3a3228" stroke-width="1.4" fill="none"/>`
  );
}

/** 石炭の山。 */
function coalHeap(x, base, w, h) {
  return (
    `<path d="M${r1(x - w / 2)},${base}q${r1(w * 0.2)},${-h} ${r1(w / 2)},${-h}q${r1(w * 0.3)},0 ${r1(w / 2)},${h}z" fill="#2a2620"/>` +
    `<path d="M${r1(x - w * 0.2)},${r1(base - h * 0.5)}q${r1(w * 0.12)},${r1(-h * 0.3)} ${r1(w * 0.26)},${r1(-h * 0.36)}" stroke="#4a453e" stroke-width="2" fill="none"/>` +
    `<g fill="#514b42"><circle cx="${r1(x - w * 0.3)}" cy="${r1(base - 3)}" r="2.4"/><circle cx="${r1(x + w * 0.34)}" cy="${r1(base - 2)}" r="2"/></g>`
  );
}

/** 煙突。 */
function chimney(x, base, h, w = 8, fill = "#b0603c", smoke = false) {
  const top = r1(base - h);
  return (
    `<path d="M${r1(x - w / 2 - 1.4)},${base}L${r1(x - w / 2)},${top}h${w}L${r1(x + w / 2 + 1.4)},${base}z" fill="${fill}"/>` +
    `<rect x="${r1(x - w / 2 - 1.6)}" y="${top}" width="${r1(w + 3.2)}" height="3" fill="#8a4a30"/>` +
    `<g fill="#000" opacity=".12"><rect x="${r1(x + w * 0.14)}" y="${top}" width="${r1(w * 0.36)}" height="${h}"/></g>` +
    (smoke
      ? `<g fill="#e8eef4" opacity=".7"><ellipse cx="${r1(x + 4)}" cy="${r1(top - 8)}" rx="10" ry="6"/>` +
        `<ellipse cx="${r1(x + 13)}" cy="${r1(top - 19)}" rx="13" ry="7.4"/><ellipse cx="${r1(x + 26)}" cy="${r1(top - 29)}" rx="9" ry="5.4"/></g>`
      : "")
  );
}

/** 灯台。 */
function lighthouse(x, base, h) {
  const top = r1(base - h);
  const w = r1(h * 0.26);
  return (
    `<path d="M${r1(x - w * 0.8)},${base}L${r1(x - w * 0.42)},${top}h${r1(w * 0.84)}L${r1(x + w * 0.8)},${base}z" fill="#f0ece0"/>` +
    `<g fill="#e8443f"><path d="M${r1(x - w * 0.68)},${r1(base - h * 0.28)}h${r1(w * 1.36)}l${r1(-w * 0.06)},${r1(-h * 0.18)}h${r1(-w * 1.24)}z"/>` +
    `<path d="M${r1(x - w * 0.52)},${r1(base - h * 0.66)}h${r1(w * 1.04)}l${r1(-w * 0.05)},${r1(-h * 0.16)}h${r1(-w * 0.94)}z"/></g>` +
    `<rect x="${r1(x - w * 0.6)}" y="${r1(top - 6)}" width="${r1(w * 1.2)}" height="6" fill="#3f434a"/>` +
    `<rect x="${r1(x - w * 0.34)}" y="${r1(top - 12)}" width="${r1(w * 0.68)}" height="6.4" fill="#f8dc90"/>` +
    `<path d="M${r1(x - w * 0.44)},${r1(top - 12)}h${r1(w * 0.88)}l${r1(-w * 0.14)},${-4}h${r1(-w * 0.6)}z" fill="#3f434a"/>` +
    `<path d="M${r1(x + w * 0.4)},${r1(top - 9)}l22,-6v12z" fill="#f8dc90" opacity=".35"/>`
  );
}

/** 牧柵。 */
function fence(y, x0, x1, fill = "#8a7a5f") {
  const parts = [
    `<g stroke="${fill}" stroke-width="1.8" fill="none"><path d="M${x0},${r1(y - 5)}H${x1}M${x0},${r1(y - 11)}H${x1}"/></g>`,
  ];
  for (let x = x0; x <= x1; x += 30) {
    parts.push(`<rect x="${r1(x)}" y="${r1(y - 15)}" width="2.8" height="15" fill="#6b5f48"/>`);
  }
  return parts.join("");
}

/** 牧草ロール。 */
function bale(x, base, r, fill = "#dcd0a0") {
  return (
    `<ellipse cx="${x}" cy="${r1(base - r)}" rx="${r1(r * 1.15)}" ry="${r}" fill="${fill}"/>` +
    `<ellipse cx="${r1(x + r * 0.5)}" cy="${r1(base - r)}" rx="${r1(r * 0.5)}" ry="${r1(r * 0.86)}" fill="#c8bc8c"/>` +
    `<path d="M${r1(x - r * 0.9)},${r1(base - r * 1.5)}q${r1(r * 0.9)},${r1(-r * 0.4)} ${r1(r * 1.8)},0" stroke="#b8ac7c" stroke-width="1.4" fill="none"/>`
  );
}

/** チセ(アイヌの家)。**茅葺きの急な切妻**で表す。人物は描かない。 */
function chiseHut(x, base, w, h) {
  const cx = r1(x + w / 2);
  const ridge = r1(base - h);
  const parts = [
    `<path d="M${x},${base}L${r1(x + w * 0.13)},${ridge}h${r1(w * 0.74)}L${r1(x + w)},${base}z" fill="#b09a62"/>`,
    `<path d="M${x},${base}L${r1(x + w * 0.13)},${ridge}l${r1(w * 0.1)},0L${r1(x + w * 0.1)},${base}z" fill="#000" opacity=".14"/>`,
    `<rect x="${r1(x + w * 0.1)}" y="${r1(ridge - 3)}" width="${r1(w * 0.8)}" height="3.4" fill="#7a6640"/>`,
  ];
  parts.push(
    `<g stroke="#8a7648" stroke-width="1.2" opacity=".8" fill="none">` +
      `<path d="M${r1(x + w * 0.06)},${r1(base - h * 0.22)}L${r1(x + w * 0.2)},${r1(base - h * 0.9)}` +
      `M${r1(x + w * 0.94)},${r1(base - h * 0.22)}L${r1(x + w * 0.8)},${r1(base - h * 0.9)}` +
      `M${r1(x + w * 0.02)},${r1(base - h * 0.1)}h${r1(w * 0.96)}` +
      `M${r1(x + w * 0.08)},${r1(base - h * 0.42)}h${r1(w * 0.84)}"/></g>`,
    `<rect x="${r1(cx - w * 0.11)}" y="${r1(base - h * 0.34)}" width="${r1(w * 0.22)}" height="${r1(h * 0.34)}" fill="#4a3a28"/>`,
    `<rect x="${r1(cx - w * 0.13)}" y="${r1(base - h * 0.38)}" width="${r1(w * 0.26)}" height="4" fill="#7a6640"/>`,
  );
  return parts.join("");
}

/** テトラポッド(の列)。日本の港はこれがあるとそれらしくなる。 */
function tetrapods(y, x0, x1, s = 1) {
  const parts = [];
  for (let x = x0; x < x1; x += 17 * s) {
    parts.push(
      `<g fill="#a8a49a"><path d="M${r1(x)},${r1(y)}l${r1(5 * s)},${r1(-9 * s)}l${r1(4 * s)},${r1(2 * s)}l${r1(-4 * s)},${r1(7 * s)}z"/>` +
        `<path d="M${r1(x + 1)},${r1(y)}l${r1(9 * s)},${r1(-3 * s)}l${r1(1 * s)},${r1(3 * s)}z"/>` +
        `<path d="M${r1(x + 4 * s)},${r1(y - 9 * s)}l${r1(6 * s)},${r1(3 * s)}l${r1(-2 * s)},${r1(3 * s)}z"/></g>`,
    );
  }
  return parts.join("");
}

/** 雪の粒(静止)。降っている絵ではなく、空気の粒として散らす。 */
function flakes(list, fill = "#f4fafe") {
  return `<g fill="${fill}">${list.map(([x, y, r = 1.6]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join("")}</g>`;
}

export const HOKKAIDO_BG = {
  /**
   * 炭鉱町(夕張・歌志内)。竪坑櫓と、戸を塞いだ長屋と、剥がされた線路。
   * **この2都市は絵として同じになる。**同じ理由で同じ姿になった町なので、
   * 似ていることが正確(`cities.mjs` の注記どおり意図的)。
   */
  minetown:
    sky("#9fbcd6", "#dbe6ee", 106) +
    clouds(300, 24, 0.9, "#eef2f6", ".8") +
    clouds(64, 30, 1.1, "#eef2f6", ".65") +
    peaks(102, "#5f6a70", [
      [40, 44, 62, true],
      [196, 34, 74, true],
      [340, 48, 58, true],
    ]) +
    hills(104, "#3f4f46", 4, 24) +
    firRow(108, 4, 396, 22, 26) +
    ground(106, "#e6eef6") +
    drifts(122, "#c8d8e6", ".75") +
    // 左:竪坑櫓と選炭場
    shade(64, 154, 46, 7, ".16") +
    headframe(60, 152, 74) +
    `<rect x="6" y="126" width="66" height="26" fill="#6b6250"/>` +
    `<path d="M2,126h74l-6,-9H8z" fill="#4a4438"/>` +
    `<g fill="#3a3228"><rect x="14" y="134" width="10" height="12"/><rect x="30" y="134" width="10" height="12"/><rect x="46" y="134" width="10" height="12"/></g>` +
    `<path d="M96,152l14,-26h9l-9,26z" fill="#7a7468"/>` +
    coalHeap(112, 152, 46, 17) +
    // 右:長屋。4戸のうち2戸は板で塞がれている
    shade(316, 156, 56, 7, ".16") +
    rowHouse(272, 154, 116, 30, 4, 2) +
    chimney(258, 154, 30, 6, "#8a6a4a") +
    tinHouse(342, 154, 46, 24, "#3f6f9a") +
    // 手前:剥がされた線路と車止め
    band(156, 54, "#dde8f0") +
    `<path d="M0,168q90,-8 190,-2q120,8 210,0v10H0z" fill="#c8d8e6" opacity=".7"/>` +
    trackbedOvergrown(188, 0, 296) +
    bufferStop(322, 192, 1.25) +
    pole(238, 190, 40) +
    pole(96, 186, 32) +
    flakes([
      [30, 60, 1.8],
      [120, 36, 1.4],
      [270, 74, 1.6],
      [350, 44, 1.4],
      [186, 96, 1.5],
      [66, 118, 1.4],
    ]),

  /**
   * 分岐の駅(岩見沢・木古内・長万部・音威子府)。
   * **右へ伸びる線は生きていて、左へ分かれていた線は路盤しか残っていない。**
   */
  junction:
    sky("#8fc4e8", "#cfe4f0", 112) +
    clouds(88, 26, 1) +
    clouds(320, 20, 0.8) +
    hills(106, "#5f7a64", 4, 26) +
    firRow(110, 8, 392, 20, 22, "#2f5240") +
    ground(108, "#9a9280") +
    // 駅舎とホーム(左)
    shade(78, 156, 62, 8, ".16") +
    stationHouse(20, 152, 116, 40) +
    `<rect x="0" y="150" width="176" height="6" fill="#c8c0ae"/>` +
    `<rect x="0" y="156" width="176" height="5" fill="#8a8578"/>` +
    `<g fill="#4a4f58"><rect x="150" y="120" width="3" height="30"/><rect x="140" y="116" width="24" height="6"/></g>` +
    `<rect x="140" y="122" width="24" height="9" fill="#f0ece0"/>` +
    `<rect x="143" y="124.5" width="18" height="4" fill="#3f6f9a"/>` +
    // 生きている線路(右へ抜ける)
    band(160, 12, "#a8a08c") +
    rails(174, 130, 400, 15) +
    rails(166, 260, 400, 17) +
    `<g fill="#4a4f58"><rect x="286" y="128" width="3.4" height="34"/></g>` +
    `<circle cx="288" cy="126" r="6.4" fill="#3a3f47"/><circle cx="288" cy="126" r="3.4" fill="#5fc47a"/>` +
    // 分かれていた線(左手前)——路盤だけが残る
    trackbedOvergrown(196, 0, 214, 24) +
    bufferStop(236, 200, 1.1) +
    // バス停(駅前)
    busStop(96, 190, 32) +
    pole(346, 156, 34) +
    pole(196, 154, 30) +
    `<g fill="#7f9a52" opacity=".9"><path d="M0,182q40,-6 84,-1v6H0z"/><path d="M110,190q46,-6 92,0v5H110z"/></g>` +
    tuft(258, 206, 9) +
    tuft(300, 202, 8) +
    tuft(342, 208, 10),

  /**
   * ポロト湖畔(白老)。チセの集落は**建築として**描く。人物・顔は描かない。
   */
  lakeshore:
    sky("#8fc4e8", "#d8e8f2", 102) +
    clouds(300, 24, 0.9) +
    clouds(76, 18, 0.7) +
    hills(102, "#4a6b56", 4, 28) +
    firRow(104, 4, 396, 24, 24, "#2a4a36") +
    band(102, 46, "#4f86a8") +
    ripples(116, "#bfe8f4", ".45") +
    `<g fill="#e8eef4" opacity=".16"><rect x="46" y="118" width="6" height="26"/><rect x="86" y="118" width="6" height="22"/><rect x="316" y="118" width="6" height="24"/></g>` +
    ground(148, "#7f9a5f") +
    band(148, 8, "#6b8a4f") +
    // 対岸のチセ(左)
    chiseHut(18, 146, 74, 44) +
    chiseHut(96, 148, 56, 34) +
    `<g fill="#7a6640"><rect x="60" y="112" width="3" height="34"/><rect x="52" y="108" width="19" height="4"/></g>` +
    // 右:湖に張り出す木の桟橋と、収蔵の建物(現代の館)
    `<rect x="286" y="112" width="106" height="36" fill="#e4e0d4"/>` +
    `<path d="M280,112h118l-8,-10H288z" fill="#8a8578"/>` +
    `<g fill="#5f7f96"><rect x="296" y="120" width="18" height="22"/><rect x="322" y="120" width="18" height="22"/><rect x="348" y="120" width="18" height="22"/><rect x="374" y="120" width="14" height="22"/></g>` +
    `<rect x="286" y="144" width="106" height="4" fill="#c8c0ae"/>` +
    `<g fill="#8a7a5f"><rect x="322" y="148" width="60" height="5"/><rect x="330" y="153" width="4" height="9"/><rect x="368" y="153" width="4" height="9"/></g>` +
    // 手前:ヨシと湿った岸
    reeds(176, 6, 148, 14) +
    reeds(182, 256, 396, 13) +
    band(184, 26, "#5f7a44") +
    `<g stroke="#4f6a38" stroke-width="2" opacity=".7" fill="none"><path d="M0,192h400M0,204h400"/></g>` +
    tuft(200, 196, 10, "#8faa5f") +
    tuft(232, 190, 8, "#8faa5f"),

  /** 空港の町(千歳)。旅客機と、滑走路の奥に並ぶ自衛隊機。 */
  airporttown:
    sky("#8fc4e8", "#cfe4f0", 112) +
    clouds(300, 22, 0.9) +
    clouds(66, 30, 1.2) +
    hills(110, "#4f6b58", 4, 22) +
    firRow(112, 4, 396, 22, 18, "#2f5240") +
    ground(112, "#7f9a5f") +
    // 管制塔(左)
    shade(58, 152, 26, 6, ".16") +
    `<rect x="48" y="70" width="20" height="80" fill="#e4e0d4"/>` +
    `<path d="M38,72h40l-6,-8H44z" fill="#b8b0a0"/>` +
    `<rect x="38" y="52" width="40" height="20" fill="#3f5f7a"/>` +
    `<path d="M36,52h44l-6,-9H42z" fill="#8a8578"/>` +
    `<g fill="#9fd8f0"><rect x="42" y="56" width="14" height="12"/><rect x="60" y="56" width="14" height="12"/></g>` +
    `<rect x="56" y="34" width="2.4" height="9" fill="#6b7078"/><circle cx="57" cy="33" r="2.6" fill="#e8443f"/>` +
    // 格納庫と自衛隊機(右奥)
    `<path d="M282,132h108v18H282z" fill="#c8c4b8"/>` +
    `<path d="M282,132a54,20 0 0 1 108,0z" fill="#8a8f96"/>` +
    `<g fill="#5f646e"><rect x="300" y="136" width="22" height="14"/><rect x="348" y="136" width="22" height="14"/></g>` +
    `<g fill="#6b7a6b"><path d="M232,148l24,-4l4,4z"/><path d="M240,146l-6,-8h5l9,7z"/><path d="M254,148l10,-2v2z"/></g>` +
    // 滑走路
    band(150, 8, "#8a8578") +
    band(158, 52, "#5f5f5f") +
    `<g fill="#e8e4d8" opacity=".85"><rect x="0" y="182" width="46" height="4"/><rect x="70" y="182" width="46" height="4"/><rect x="140" y="182" width="46" height="4"/><rect x="212" y="182" width="46" height="4"/><rect x="282" y="182" width="46" height="4"/><rect x="352" y="182" width="46" height="4"/></g>` +
    `<g fill="#f5b31c"><rect x="24" y="164" width="10" height="3"/><rect x="60" y="164" width="10" height="3"/><rect x="330" y="164" width="10" height="3"/><rect x="366" y="164" width="10" height="3"/></g>` +
    // 手前:旅客機(白と赤)
    shade(214, 202, 96, 8, ".2") +
    `<path d="M96,196h176q34,0 44,-9q-12,-9 -44,-9H108q-10,0 -12,9z" fill="#f4f2ec"/>` +
    `<path d="M96,196h176q34,0 44,-9H92z" fill="#e8443f" opacity=".85"/>` +
    `<g fill="#3f5f7a"><circle cx="130" cy="184" r="3"/><circle cx="146" cy="184" r="3"/><circle cx="162" cy="184" r="3"/><circle cx="178" cy="184" r="3"/><circle cx="194" cy="184" r="3"/><circle cx="210" cy="184" r="3"/><circle cx="226" cy="184" r="3"/><circle cx="242" cy="184" r="3"/></g>` +
    `<path d="M300,178l-6,-6h-9l-7,6z" fill="#9fd8f0"/>` +
    `<path d="M118,178l-22,-30h12l32,30z" fill="#f4f2ec"/>` +
    `<path d="M116,150h10l24,28h-12z" fill="#e8443f"/>` +
    `<path d="M156,196h64l-16,10h-64z" fill="#c8c4b8"/>` +
    `<ellipse cx="152" cy="192" rx="16" ry="8" fill="#6b7078"/>` +
    `<ellipse cx="152" cy="192" rx="9" ry="5.4" fill="#3a3f47"/>` +
    `<g fill="#2f2a26"><circle cx="112" cy="202" r="5"/><circle cx="238" cy="202" r="5"/><circle cx="250" cy="202" r="5"/></g>`,

  /** 掘り込み港(苫小牧)。製紙の煙とガントリークレーン。 */
  industrialport:
    sky("#8fb4cc", "#d8e2e8", 108) +
    clouds(72, 26, 1, "#eceff2", ".7") +
    // 奥の工場地帯
    `<g fill="#6b7078"><rect x="0" y="86" width="60" height="22"/><rect x="66" y="94" width="44" height="14"/><rect x="286" y="90" width="52" height="18"/><rect x="344" y="96" width="46" height="12"/></g>` +
    chimney(28, 88, 56, 11, "#b0603c", true) +
    chimney(304, 92, 46, 9, "#8a8578", true) +
    ground(108, "#5f7f96") +
    band(108, 44, "#3f6f8f") +
    ripples(122, "#7fb8d0", ".4") +
    // 岸壁と紙のロール(左)
    `<rect x="0" y="126" width="150" height="8" fill="#a8a49a"/>` +
    `<rect x="0" y="134" width="150" height="18" fill="#8a8578"/>` +
    `<g fill="#f0ece0"><rect x="12" y="108" width="18" height="18" rx="3"/><rect x="34" y="108" width="18" height="18" rx="3"/><rect x="23" y="90" width="18" height="18" rx="3"/></g>` +
    `<g fill="#d8d0bc"><rect x="27" y="108" width="4" height="18"/><rect x="49" y="108" width="4" height="18"/><rect x="38" y="90" width="4" height="18"/></g>` +
    // ガントリークレーン(右)
    `<g fill="#e8443f"><rect x="286" y="52" width="7" height="76"/><rect x="360" y="52" width="7" height="76"/><rect x="270" y="46" width="118" height="8"/></g>` +
    `<g stroke="#e8443f" stroke-width="3" fill="none"><path d="M290,66h74M293,84L360,110M360,84L293,110"/></g>` +
    `<rect x="316" y="54" width="4" height="26" fill="#4a4f58"/>` +
    `<rect x="306" y="80" width="24" height="14" fill="#3f434a"/>` +
    `<rect x="264" y="128" width="132" height="24" fill="#8a8578"/>` +
    // 貨物船
    shade(216, 152, 76, 6, ".18") +
    `<path d="M136,128h164l-14,22H150z" fill="#2f4a5f"/>` +
    `<rect x="136" y="122" width="164" height="7" fill="#e8443f"/>` +
    `<g fill="#c8c4b8"><rect x="252" y="98" width="40" height="24"/><rect x="258" y="88" width="10" height="12"/></g>` +
    `<g fill="#5f7f96"><rect x="258" y="104" width="9" height="8"/><rect x="272" y="104" width="9" height="8"/></g>` +
    `<g fill="#f5b31c"><rect x="152" y="106" width="26" height="16"/><rect x="182" y="106" width="26" height="16"/></g>` +
    `<g fill="#3f6f9a"><rect x="152" y="90" width="26" height="16"/><rect x="212" y="106" width="26" height="16"/></g>` +
    // 手前:埠頭
    band(152, 6, "#b0aa9c") +
    band(158, 52, "#7a7468") +
    `<g stroke="#5f5a52" stroke-width="2" opacity=".7" fill="none"><path d="M0,172h400M0,192h400M60,158v52M180,158v52M300,158v52"/></g>` +
    `<g fill="#3a3f47"><rect x="24" y="176" width="44" height="26" rx="3"/><rect x="76" y="176" width="44" height="26" rx="3"/></g>` +
    `<g fill="#e8443f"><rect x="24" y="176" width="44" height="6"/><rect x="76" y="176" width="44" height="6"/></g>` +
    `<g fill="#5f646e"><circle cx="330" cy="196" r="8"/><circle cx="366" cy="196" r="8"/></g>` +
    gull(240, 70) +
    gull(266, 60, 0.8) +
    gull(112, 66, 0.9),

  /** 石狩川の川辺(江別・石狩)。左に煉瓦の煙突、右の海沿いに風車。 */
  rivertown:
    sky("#8fc4e8", "#d8e8f2", 106) +
    clouds(92, 24, 1) +
    clouds(330, 18, 0.7) +
    hills(104, "#5f7a64", 4, 22) +
    firRow(106, 4, 200, 12, 18, "#2f5240") +
    // 右奥の海沿いの風車
    windTurbine(268, 106, 46, 18) +
    windTurbine(310, 106, 38, 62) +
    windTurbine(350, 106, 42, 100) +
    windTurbine(388, 106, 34, 40) +
    ground(106, "#8fa858") +
    // 川
    `<path d="M0,150q90,-22 200,-8q120,12 200,-4v34H0z" fill="#4f86a8"/>` +
    `<path d="M0,158q90,-20 200,-6q120,10 200,-4v20H0z" fill="#3f6f8f"/>` +
    ripples(156, "#bfe8f4", ".4") +
    // 左:煉瓦の窯と煙突
    shade(74, 150, 56, 7, ".16") +
    `<rect x="26" y="112" width="96" height="38" fill="#a85a44"/>` +
    `<g stroke="#8a4a34" stroke-width="1.2" opacity=".8" fill="none"><path d="M26,120h96M26,128h96M26,136h96M26,144h96M50,112v38M74,112v38M98,112v38"/></g>` +
    `<path d="M22,112h104l-8,-9H30z" fill="#6b4a38"/>` +
    `<path d="M52,150v-20a22,22 0 0 1 44,0v20z" fill="#3a3228"/>` +
    `<path d="M58,150v-16a16,16 0 0 1 32,0v16z" fill="#5f4a3a"/>` +
    chimney(24, 112, 64, 10, "#a85a44", true) +
    // 煉瓦の積み上げ
    `<g fill="#b46a4a"><rect x="126" y="136" width="30" height="6"/><rect x="126" y="143" width="30" height="6"/><rect x="130" y="129" width="26" height="6"/></g>` +
    // 右:堤防の上の道と、川辺の柳
    `<path d="M256,150h144v10H256z" fill="#9a9a70"/>` +
    birch(272, 150, 34) +
    birch(292, 152, 26) +
    birch(376, 148, 30) +
    // 手前:河川敷
    band(174, 36, "#7f9a52") +
    `<g stroke="#6b8a44" stroke-width="2" opacity=".7" fill="none"><path d="M0,184h400M0,198h400"/></g>` +
    reeds(184, 4, 116, 11) +
    reeds(188, 286, 396, 10) +
    tuft(180, 200, 10, "#8faa5f") +
    tuft(226, 194, 8, "#8faa5f") +
    gull(148, 84, 0.9) +
    gull(176, 74, 0.8),

  /** 廃校が彫刻の野になった町(美唄)。雪の敷地に、白い抽象の形が立つ。 */
  artpark:
    sky("#a8c4dc", "#dfe8ef", 104) +
    clouds(310, 26, 1, "#eef2f6", ".7") +
    hills(102, "#4f5f52", 4, 24) +
    firRow(106, 4, 396, 22, 24) +
    ground(104, "#eef4fa") +
    drifts(120, "#c8d8e6", ".8") +
    // 左:木造の廃校(窓は暗い。壊れてはいない)
    shade(84, 158, 74, 8, ".14") +
    `<rect x="14" y="112" width="140" height="44" fill="#d8cfbc"/>` +
    `<path d="M8,112h152l-10,-14H18z" fill="#8a6a4a"/>` +
    `<rect x="8" y="112" width="152" height="3.4" fill="#5f5348"/>` +
    `<g fill="#4a4f58"><rect x="22" y="120" width="16" height="18"/><rect x="44" y="120" width="16" height="18"/><rect x="66" y="120" width="16" height="18"/><rect x="106" y="120" width="16" height="18"/><rect x="128" y="120" width="16" height="18"/></g>` +
    `<g fill="#6b7a86"><rect x="24" y="122" width="12" height="14"/><rect x="46" y="122" width="12" height="14"/><rect x="68" y="122" width="12" height="14"/><rect x="108" y="122" width="12" height="14"/><rect x="130" y="122" width="12" height="14"/></g>` +
    `<rect x="86" y="128" width="18" height="28" fill="#4a3a28"/>` +
    `<rect x="80" y="124" width="30" height="5" fill="#8a6a4a"/>` +
    `<path d="M8,98h152l-8,-6H16z" fill="#eef4fa"/>` +
    // 右:雪原に立つ彫刻(抽象)
    shade(300, 168, 34, 6, ".14") +
    `<g fill="#f0ece0"><rect x="286" y="112" width="12" height="56"/><rect x="272" y="126" width="40" height="11"/></g>` +
    `<circle cx="292" cy="104" r="13" fill="none" stroke="#f0ece0" stroke-width="8"/>` +
    shade(356, 172, 26, 5, ".14") +
    `<path d="M340,172l16,-44l16,44z" fill="#dce4ea"/>` +
    `<rect x="346" y="150" width="20" height="6" fill="#8a949e"/>` +
    shade(212, 178, 28, 5, ".14") +
    `<g fill="#e4e8ec"><rect x="196" y="150" width="34" height="10" rx="4"/><rect x="206" y="158" width="10" height="20"/></g>` +
    // 手前:雪の斜面と、雪に埋もれた彫刻の台座
    band(176, 34, "#f4f8fc") +
    `<path d="M0,186q80,-10 168,-2q110,10 232,-4v30H0z" fill="#dee8f0"/>` +
    `<g fill="#c8d8e6" opacity=".8"><ellipse cx="70" cy="200" rx="40" ry="7"/><ellipse cx="300" cy="204" rx="52" ry="8"/></g>` +
    `<g fill="#f0ece0"><rect x="52" y="176" width="26" height="9" rx="3"/><rect x="330" y="182" width="20" height="8" rx="3"/></g>` +
    flakes([
      [40, 46, 1.8],
      [128, 30, 1.5],
      [252, 60, 1.7],
      [330, 40, 1.5],
      [188, 88, 1.6],
      [80, 76, 1.4],
      [364, 92, 1.6],
    ]),

  /** 山の麓の町(倶知安)。羊蹄山と、まだ開かない新幹線の橋脚。 */
  mountainbase:
    sky("#8fc4e8", "#d8e8f2", 110) +
    clouds(310, 22, 0.9) +
    // 羊蹄山(円錐・雪をかぶる)
    `<path d="M28,110L142,20L256,110z" fill="#6b7f8f"/>` +
    `<path d="M142,20l-34,26q14,8 30,2t38,4z" fill="#eef4fa"/>` +
    `<g stroke="#5a6b78" stroke-width="1.6" opacity=".7" fill="none"><path d="M142,28L112,86M142,30l26,54M142,34l-52,66M142,36l58,70"/></g>` +
    hills(110, "#4f6b52", 4, 22) +
    firRow(112, 4, 396, 22, 20) +
    ground(110, "#9aa860") +
    band(110, 16, "#8a9a58") +
    // 左:高架の橋脚(工事中)
    shade(64, 158, 56, 8, ".16") +
    `<g fill="#c8c4b8"><rect x="14" y="126" width="20" height="34"/><rect x="66" y="122" width="20" height="38"/><rect x="118" y="126" width="20" height="34"/></g>` +
    `<rect x="4" y="112" width="146" height="14" fill="#b0aa9c"/>` +
    `<rect x="4" y="112" width="146" height="4" fill="#8a8578"/>` +
    `<g fill="#f5b31c"><rect x="4" y="104" width="146" height="4"/></g>` +
    // クレーン
    `<g fill="#e8443f"><rect x="164" y="70" width="6" height="90"/></g>` +
    `<rect x="132" y="66" width="82" height="6" fill="#e8443f"/>` +
    `<g stroke="#e8443f" stroke-width="2" fill="none"><path d="M136,68l30,-10M210,68l-42,-10"/></g>` +
    `<path d="M196,72v20" stroke="#4a4f58" stroke-width="1.6" fill="none"/>` +
    `<rect x="190" y="92" width="14" height="10" fill="#8a8578"/>` +
    // 右:町なみと畑
    tinHouse(268, 158, 48, 26, "#b4453c") +
    tinHouse(324, 158, 42, 22, "#3f7a5a") +
    tinHouse(372, 158, 28, 20, "#3f6f9a") +
    // 手前:畑の畝と工事のフェンス
    band(160, 50, "#8a7a5a") +
    `<g stroke="#6b5f44" stroke-width="2.4" opacity=".8" fill="none"><path d="M0,172q100,-6 200,0t200,-2M0,186q100,-6 200,0t200,-2M0,200q100,-6 200,0t200,-2"/></g>` +
    `<g fill="#3f6f9a"><rect x="0" y="160" width="130" height="18" rx="2"/></g>` +
    `<g stroke="#e8e4d8" stroke-width="2" opacity=".7" fill="none"><path d="M14,160v18M40,160v18M66,160v18M92,160v18M118,160v18"/></g>` +
    `<g fill="#f5b31c"><rect x="292" y="168" width="12" height="22"/><path d="M298,160l10,8h-20z"/></g>`,

  /** 漁港(留萌・増毛・江差)。番屋と干し場、テトラポッド。 */
  fishport:
    sky("#8fc4e8", "#d8e8f2", 102) +
    clouds(80, 24, 1) +
    clouds(320, 18, 0.8) +
    hills(102, "#5f6f64", 4, 26) +
    band(102, 44, "#3f6f8f") +
    ripples(118, "#bfe8f4", ".45") +
    // 防波堤
    `<rect x="216" y="112" width="184" height="8" fill="#a8a49a"/>` +
    `<rect x="216" y="106" width="10" height="8" fill="#e8443f"/>` +
    tetrapods(130, 218, 396, 0.9) +
    ground(146, "#a8a094") +
    // 左:番屋と倉
    shade(66, 150, 62, 8, ".16") +
    boardHouse(12, 148, 90, 40) +
    boardHouse(110, 148, 52, 28, "#8a6a44", "#3f6f9a") +
    chimney(104, 148, 26, 5, "#6b6250") +
    // 干し場(魚を吊るす棚)
    `<g fill="#8a7a5f"><rect x="286" y="118" width="4" height="30"/><rect x="378" y="118" width="4" height="30"/><rect x="282" y="116" width="104" height="4"/><rect x="282" y="130" width="104" height="3"/></g>` +
    `<g fill="#c8b8a0"><rect x="294" y="120" width="5" height="14"/><rect x="306" y="120" width="5" height="16"/><rect x="318" y="120" width="5" height="13"/><rect x="330" y="120" width="5" height="15"/><rect x="342" y="120" width="5" height="14"/><rect x="354" y="120" width="5" height="16"/><rect x="366" y="120" width="5" height="13"/></g>` +
    // 漁船(岸に着く)
    fishingBoat(184, 128, 74) +
    // 手前:岸壁と網・浮き玉
    band(150, 8, "#8a8578") +
    band(158, 52, "#6b6458") +
    `<g stroke="#57514a" stroke-width="2" opacity=".7" fill="none"><path d="M0,176h400M0,196h400M90,158v52M250,158v52"/></g>` +
    `<g fill="#3f7a5a" opacity=".9"><path d="M18,206q26,-30 58,0z"/></g>` +
    `<g stroke="#2f5f44" stroke-width="1" opacity=".8" fill="none"><path d="M28,196h40M22,202h54M36,190h24"/></g>` +
    `<g fill="#f5b31c"><circle cx="118" cy="196" r="9"/><circle cx="136" cy="202" r="7"/></g>` +
    `<g fill="#e8443f"><circle cx="150" cy="194" r="6.4"/></g>` +
    `<g fill="#8a5a3a"><rect x="300" y="182" width="44" height="24" rx="3"/><rect x="348" y="188" width="36" height="18" rx="3"/></g>` +
    `<g stroke="#6b4028" stroke-width="1.6" fill="none"><path d="M300,190h44M300,198h44M348,196h36"/></g>` +
    gull(232, 78) +
    gull(262, 66, 0.8) +
    gull(96, 74, 0.9),

  /** 城下町(松前)。白い天守と石垣、藩の門。 */
  castletown:
    sky("#8fc4e8", "#dfe8ef", 102) +
    clouds(84, 22, 0.9) +
    hills(102, "#5f7a5a", 4, 26) +
    firRow(104, 4, 396, 20, 20, "#2f5240") +
    ground(102, "#8fa858") +
    band(150, 60, "#7f9a52") +
    // 石垣と天守(左〜中央寄り、中央帯は避ける)
    shade(96, 152, 76, 8, ".16") +
    `<path d="M22,150L40,104h96l18,46z" fill="#a8a294"/>` +
    `<g stroke="#8a8578" stroke-width="1.2" opacity=".8" fill="none"><path d="M32,124h112M28,136h124M36,112h100"/></g>` +
    `<rect x="52" y="76" width="72" height="28" fill="#f0ece0"/>` +
    `<path d="M40,76h96l-12,-10H52z" fill="#4a4f58"/>` +
    `<rect x="62" y="52" width="52" height="22" fill="#f0ece0"/>` +
    `<path d="M50,52h76l-10,-9H60z" fill="#4a4f58"/>` +
    `<path d="M60,44h56l-14,-12H74z" fill="#4a4f58"/>` +
    `<g fill="#3a3228"><rect x="66" y="58" width="10" height="10"/><rect x="82" y="58" width="10" height="10"/><rect x="98" y="58" width="10" height="10"/><rect x="60" y="82" width="12" height="12"/><rect x="80" y="82" width="12" height="12"/><rect x="100" y="82" width="12" height="12"/></g>` +
    `<path d="M88,32v-8" stroke="#8a8578" stroke-width="2" fill="none"/>` +
    // 右:武家の門と塀
    `<rect x="286" y="120" width="106" height="30" fill="#d8cfbc"/>` +
    `<path d="M280,120h118l-8,-9H288z" fill="#5f5348"/>` +
    `<rect x="316" y="126" width="44" height="24" fill="#4a3a28"/>` +
    `<g fill="#8a6a4a"><rect x="316" y="126" width="44" height="4"/><rect x="336" y="130" width="4" height="20"/></g>` +
    `<rect x="256" y="132" width="30" height="18" fill="#cfc6b4"/>` +
    `<path d="M250,132h40l-6,-7h-28z" fill="#5f5348"/>` +
    // 桜(控えめに2本)
    `<g><rect x="196" y="130" width="5" height="22" fill="#4a3a28"/><circle cx="198" cy="124" r="15" fill="#f0c8d4"/><circle cx="186" cy="130" r="9" fill="#f0c8d4"/><circle cx="211" cy="130" r="9" fill="#f0c8d4"/></g>` +
    `<g><rect x="368" y="150" width="5" height="20" fill="#4a3a28"/><circle cx="370" cy="146" r="14" fill="#f4d4de"/><circle cx="358" cy="152" r="8" fill="#f4d4de"/></g>` +
    // 手前:石段と土塀
    band(176, 34, "#9a9280") +
    `<g fill="#b0aa9c"><rect x="0" y="176" width="400" height="6"/><rect x="0" y="188" width="400" height="6"/><rect x="0" y="200" width="400" height="6"/></g>` +
    `<g fill="#f0c8d4" opacity=".9"><circle cx="46" cy="184" r="2.4"/><circle cx="88" cy="194" r="2.2"/><circle cx="150" cy="180" r="2.4"/><circle cx="238" cy="198" r="2.2"/><circle cx="300" cy="186" r="2.4"/><circle cx="352" cy="202" r="2.2"/></g>`,

  /**
   * 中世の館跡(上ノ国)。**丘の上に柵、丘の下に発掘の区画、右手は日本海。**
   * 柵は海の上に浮かないよう、左の段丘の高台に載せる。
   */
  oldsettlement:
    sky("#8fc4e8", "#d8e8f2", 100) +
    clouds(300, 24, 0.9) +
    clouds(70, 16, 0.7) +
    hills(100, "#5f7a64", 3, 22) +
    band(100, 40, "#3f6f8f") +
    ripples(112, "#bfe8f4", ".4") +
    whitecaps(122, [
      [258, 4, 0.9],
      [340, 12, 0.8],
    ]) +
    fishingBoat(298, 118, 48, "#3f5f7a") +
    // 左の高台(段丘)。ここに柵と館が載る
    `<path d="M0,84h158l30,26 6,50H0z" fill="#6b8a5a"/>` +
    `<path d="M0,84h158l30,26H0z" fill="#7f9a52"/>` +
    `<g stroke="#5f7a44" stroke-width="1.6" opacity=".8" fill="none"><path d="M0,96h172M0,106h182"/></g>` +
    `<g fill="#8a7a5a"><path d="M0,110h186l4,18H0z"/></g>` +
    `<g stroke="#7a6a4a" stroke-width="1.4" opacity=".8" fill="none"><path d="M0,118h188M0,124h188"/></g>` +
    // 柵(丸太を立て並べた囲い)と門
    `<g fill="#7a5a3c"><rect x="6" y="60" width="5" height="24"/><rect x="28" y="56" width="5" height="28"/><rect x="50" y="58" width="5" height="26"/><rect x="72" y="54" width="5" height="30"/><rect x="94" y="58" width="5" height="26"/><rect x="116" y="56" width="5" height="28"/><rect x="138" y="60" width="5" height="24"/></g>` +
    `<g fill="#5f4630"><path d="M6,60l2.5,-4 2.5,4z"/><path d="M28,56l2.5,-4 2.5,4z"/><path d="M50,58l2.5,-4 2.5,4z"/><path d="M72,54l2.5,-4 2.5,4z"/><path d="M94,58l2.5,-4 2.5,4z"/><path d="M116,56l2.5,-4 2.5,4z"/><path d="M138,60l2.5,-4 2.5,4z"/></g>` +
    `<g stroke="#5f4630" stroke-width="2.6" fill="none"><path d="M4,68h142M4,78h142"/></g>` +
    `<path d="M50,54h48l-8,-12H58z" fill="#6b5a44"/>` +
    `<rect x="58" y="54" width="32" height="18" fill="#8a7a5f"/>` +
    `<rect x="68" y="60" width="13" height="12" fill="#3a3228"/>` +
    `<g fill="#6b5a44"><rect x="58" y="54" width="32" height="3"/></g>` +
    ground(128, "#8a9a5f") +
    band(128, 22, "#7f9a52") +
    // 右手前:発掘の区画(縄張りと杭、掘り出された穴と出土品)
    ground(150, "#8a7a5a") +
    `<g fill="#6b5a44" opacity=".55"><rect x="244" y="156" width="146" height="46"/></g>` +
    `<g stroke="#f0ece0" stroke-width="1.6" fill="none"><path d="M244,156h146v46H244zM244,172h146M244,188h146M292,156v46M340,156v46"/></g>` +
    `<g fill="#4a4038"><rect x="240" y="152" width="3.4" height="10"/><rect x="388" y="152" width="3.4" height="10"/><rect x="240" y="198" width="3.4" height="10"/><rect x="388" y="198" width="3.4" height="10"/></g>` +
    `<g fill="#3a3228" opacity=".8"><ellipse cx="268" cy="180" rx="14" ry="7"/><ellipse cx="318" cy="194" rx="12" ry="6"/><ellipse cx="362" cy="166" rx="11" ry="5"/></g>` +
    `<g fill="#c8bca8"><rect x="300" y="164" width="10" height="5" rx="1"/><rect x="352" y="182" width="9" height="4" rx="1"/><path d="M274,162l7,-3 3,5 -7,3z"/><path d="M336,176l6,-3 2,4 -6,3z"/></g>` +
    // 手前左:段丘の下の畑と一軒
    shade(58, 202, 40, 6, ".16") +
    tinHouse(20, 200, 56, 28, "#b4453c") +
    `<g stroke="#6b5f44" stroke-width="2.4" opacity=".7" fill="none"><path d="M84,206q60,-6 120,0M92,196q58,-6 116,0M100,186q56,-6 112,0"/></g>` +
    tuft(158, 174, 10, "#8faa5f") +
    tuft(196, 166, 8, "#8faa5f") +
    tuft(228, 176, 9, "#8faa5f") +
    gull(216, 60) +
    gull(248, 48, 0.8),

  /** 酪農の入植地(八雲)。牛舎とサイロ、牧草ロール、防風林。 */
  dairyfarm:
    sky("#8fc4e8", "#d8e8f2", 102) +
    clouds(70, 26, 1.1) +
    clouds(312, 20, 0.8) +
    hills(102, "#5f7a5a", 4, 24) +
    shelterbelt(104, 4, 396, 24) +
    ground(102, "#9aae5f") +
    band(102, 16, "#8faa5a") +
    // 左:牛舎とサイロ
    shade(88, 156, 74, 8, ".16") +
    barn(24, 154, 116, 32) +
    silo(154, 154, 62) +
    `<rect x="140" y="140" width="22" height="6" fill="#8a8578"/>` +
    // 右:牧草ロールと柵
    fence(154, 246, 396) +
    bale(288, 172, 13) +
    bale(330, 176, 11) +
    bale(366, 170, 12) +
    // 牧草地
    band(154, 56, "#8fa858") +
    `<g stroke="#7f9a4a" stroke-width="2" opacity=".7" fill="none"><path d="M0,168q100,-6 200,0t200,-2M0,186q100,-6 200,0t200,-2M0,202q100,-6 200,0t200,-2"/></g>` +
    // 牛(手前)
    shade(88, 200, 26, 5, ".18") +
    cow(84, 198, 1.15, 1) +
    shade(178, 190, 22, 4, ".18") +
    cow(176, 188, 0.9, -1) +
    shade(300, 206, 20, 4, ".18") +
    cow(300, 204, 0.8, 1) +
    tuft(238, 176, 8, "#7f9a4a") +
    tuft(46, 172, 7, "#7f9a4a") +
    gull(120, 60, 0.7),

  /** 湾の海岸(森・福島・厚岸)。円い湾と、養殖の筏と桟橋。 */
  baycoast:
    sky("#8fc4e8", "#d8e8f2", 98) +
    clouds(90, 22, 1) +
    clouds(324, 18, 0.8) +
    // 対岸(湾は閉じた円なので、向こう岸が見える)
    hills(98, "#6b8a76", 5, 22) +
    peaks(98, "#7a8f8a", [
      [72, 62, 46, false],
      [316, 58, 52, false],
    ]) +
    band(98, 62, "#3f7f9a") +
    ripples(114, "#bfe8f4", ".45") +
    // 養殖の筏(右)
    `<g fill="#6b5a44"><rect x="262" y="124" width="130" height="4"/><rect x="262" y="136" width="130" height="4"/></g>` +
    `<g fill="#f0ece0"><circle cx="272" cy="126" r="4"/><circle cx="296" cy="126" r="4"/><circle cx="320" cy="126" r="4"/><circle cx="344" cy="126" r="4"/><circle cx="368" cy="126" r="4"/><circle cx="278" cy="138" r="4"/><circle cx="302" cy="138" r="4"/><circle cx="326" cy="138" r="4"/><circle cx="350" cy="138" r="4"/><circle cx="374" cy="138" r="4"/></g>` +
    `<g stroke="#4a4038" stroke-width="1.2" opacity=".7" fill="none"><path d="M272,130v9M296,130v9M320,130v9M344,130v9M368,130v9"/></g>` +
    // 桟橋(左)
    `<g fill="#8a7a5f"><rect x="0" y="128" width="118" height="6"/></g>` +
    `<g fill="#6b5a44"><rect x="24" y="134" width="5" height="26"/><rect x="58" y="134" width="5" height="26"/><rect x="92" y="134" width="5" height="26"/></g>` +
    fishingBoat(126, 138, 62, "#3f5f7a") +
    ground(160, "#a89a78") +
    // 手前:砂利の浜と、いかめしの木箱・牡蠣の殻
    band(160, 12, "#c8b898") +
    band(172, 38, "#b0a084") +
    `<g fill="#9a8a70" opacity=".8"><ellipse cx="60" cy="182" rx="18" ry="5"/><ellipse cx="180" cy="196" rx="24" ry="6"/><ellipse cx="330" cy="188" rx="20" ry="5"/></g>` +
    `<g fill="#8a5a3a"><rect x="20" y="178" width="46" height="22" rx="2"/></g>` +
    `<g stroke="#6b4028" stroke-width="1.6" fill="none"><path d="M20,186h46M42,178v22"/></g>` +
    `<g fill="#cfc4ae"><ellipse cx="290" cy="200" rx="13" ry="7" transform="rotate(-14 290 200)"/><ellipse cx="316" cy="196" rx="11" ry="6" transform="rotate(9 316 196)"/><ellipse cx="344" cy="204" rx="12" ry="6" transform="rotate(-6 344 204)"/></g>` +
    `<g stroke="#a89880" stroke-width="1" fill="none"><path d="M282,198h16M310,195h11M338,203h13"/></g>` +
    gull(226, 72) +
    gull(256, 62, 0.8) +
    gull(108, 68, 0.9),

  /** 荒い日本海の岩海岸(せたな)。奇岩と風車、崖下に廃線の路盤。 */
  ruggedcoast:
    sky("#7fa8c8", "#d0e0ea", 94) +
    clouds(300, 30, 1.2, "#e4e8ec", ".7") +
    clouds(70, 22, 0.9, "#e4e8ec", ".6") +
    // 崖の上の風車列
    windTurbine(36, 96, 44, 26) +
    windTurbine(84, 96, 38, 74) +
    windTurbine(126, 96, 34, 12) +
    band(94, 58, "#2f6a8f") +
    whitecaps(104, [
      [24, 4, 1.1],
      [96, 16, 0.9],
      [206, 8, 1.2],
      [300, 22, 1],
      [356, 6, 0.9],
    ]) +
    ripples(126, "#8fc0d8", ".4") +
    // 奇岩(右。海に立つ岩柱)
    shade(322, 152, 34, 6, ".2") +
    `<path d="M292,152l10,-52q4,-14 14,-14t14,14l10,52z" fill="#5f646e"/>` +
    `<path d="M300,152l6,-42q3,-10 10,-10v52z" fill="#4a4f58"/>` +
    `<g fill="#3f444d"><path d="M310,96l6,-14 6,14z"/></g>` +
    `<path d="M352,152l8,-30q3,-9 9,-9t9,9l8,30z" fill="#5f646e"/>` +
    whitecaps(146, [
      [286, 0, 1.2],
      [340, 4, 1],
    ]) +
    // 崖と、その上の草地
    `<path d="M0,152h400v10H0z" fill="#7a7468"/>` +
    ground(152, "#6b6b60") +
    `<path d="M0,120h172l-8,32H0z" fill="#5f6b58"/>` +
    `<path d="M0,120h172l-6,-8H0z" fill="#7f9a52"/>` +
    // 崖下の廃線の路盤(海沿いをなぞって右へ消える)
    band(162, 48, "#8a8578") +
    trackbedOvergrown(184, 0, 268, 26) +
    bufferStop(298, 190, 1.05) +
    `<g fill="#a8a49a"><path d="M0,196q80,-8 160,0t240,-4v18H0z"/></g>` +
    tetrapods(206, 4, 160, 1) +
    tuft(292, 206, 9) +
    tuft(340, 200, 8) +
    tuft(376, 208, 10) +
    gull(220, 60) +
    gull(248, 48, 0.8) +
    gull(174, 44, 0.7),

  /** 島の海岸(奥尻)。11mの防潮堤と、その内側に建て直された町。 */
  islandcoast:
    sky("#8fc4e8", "#d8e8f2", 96) +
    clouds(80, 22, 0.9) +
    // 島影と海
    peaks(98, "#6b7a76", [
      [318, 52, 74, false],
      [66, 66, 52, false],
    ]) +
    band(96, 44, "#3f7f9a") +
    whitecaps(108, [
      [40, 6, 1],
      [166, 14, 1.1],
      [300, 4, 0.9],
    ]) +
    ripples(122, "#bfe8f4", ".4") +
    ground(140, "#a8a294") +
    // 防潮堤(手前を横切る高い壁。階段が付く)
    `<rect x="0" y="132" width="400" height="10" fill="#b8b2a4"/>` +
    `<rect x="0" y="142" width="400" height="34" fill="#c8c2b4"/>` +
    `<g stroke="#a8a294" stroke-width="1.6" opacity=".9" fill="none"><path d="M0,152h400M0,164h400M60,142v34M140,142v34M220,142v34M300,142v34M380,142v34"/></g>` +
    `<path d="M0,176h400v6H0z" fill="#9a9488"/>` +
    // 階段(左)
    `<g fill="#d8d2c4"><rect x="18" y="170" width="46" height="6"/><rect x="18" y="162" width="38" height="6"/><rect x="18" y="154" width="30" height="6"/><rect x="18" y="146" width="22" height="6"/></g>` +
    `<g stroke="#8a8578" stroke-width="1.8" fill="none"><path d="M64,172L38,140M18,176V146"/></g>` +
    // 内側の再建された町(右手前・低い位置)
    ground(182, "#8a9a68") +
    tinHouse(258, 206, 50, 24, "#b4453c") +
    tinHouse(318, 204, 44, 22, "#3f6f9a") +
    tinHouse(368, 206, 32, 20, "#3f7a5a") +
    `<g fill="#7f9a52"><path d="M0,196q60,-8 120,-2v16H0z"/></g>` +
    // 記念の灯(左手前・小さく)
    `<g fill="#8a8578"><rect x="108" y="188" width="9" height="20"/></g>` +
    `<rect x="104" y="182" width="17" height="7" fill="#c8c2b4"/>` +
    `<circle cx="112.5" cy="178" r="4.4" fill="#f5b31c"/>` +
    `<circle cx="112.5" cy="178" r="10" fill="#f5b31c" opacity=".18"/>` +
    tuft(160, 200, 9) +
    tuft(200, 194, 8) +
    gull(238, 62) +
    gull(268, 52, 0.8),

  /** 北の原野(幌延・豊富・遠別)。地平線と、電柱の列と、風車。 */
  northplain:
    sky("#8fc4e8", "#dfe8ef", 110) +
    clouds(96, 24, 1.2) +
    clouds(320, 20, 0.9) +
    clouds(220, 34, 0.7) +
    // 遠い利尻山(海の向こうの円錐)
    `<path d="M312,112L360,52L400,112z" fill="#8a9aa8" opacity=".9"/>` +
    `<path d="M360,52l-14,18q8,4 14,0t14,4z" fill="#eef4fa" opacity=".9"/>` +
    band(110, 8, "#5f8fa8") +
    ground(112, "#9aae68") +
    band(112, 10, "#8fa858") +
    // 電柱の列(左から奥へ)
    pole(14, 158, 44) +
    pole(74, 152, 36) +
    pole(122, 146, 28) +
    pole(158, 142, 22) +
    pole(184, 138, 17) +
    `<g stroke="#6b6250" stroke-width="1" opacity=".8" fill="none"><path d="M14,118l60,6 48,6 36,4 26,4M14,124l60,6 48,5 36,4 26,3"/></g>` +
    // 風車(右)
    windTurbine(268, 130, 52, 34) +
    windTurbine(314, 130, 44, 88) +
    windTurbine(356, 130, 40, 8) +
    windTurbine(392, 130, 34, 56) +
    // 原野(草の帯を重ねて地平の広さを出す)
    band(130, 20, "#8fa858") +
    band(150, 20, "#7f9a4e") +
    band(170, 40, "#6f8a46") +
    `<g stroke="#5f7a3a" stroke-width="2" opacity=".55" fill="none"><path d="M0,140h400M0,158h400M0,176h400M0,194h400"/></g>` +
    // 放牧の牛(小さく2頭)と、道
    `<path d="M0,206q120,-30 400,-22v26H0z" fill="#8a7a5a"/>` +
    `<g stroke="#a89880" stroke-width="2" stroke-dasharray="12 14" opacity=".8" fill="none"><path d="M0,198q120,-26 400,-18"/></g>` +
    shade(70, 176, 20, 4, ".16") +
    cow(68, 174, 0.8, 1) +
    shade(214, 166, 15, 3, ".16") +
    cow(214, 164, 0.6, -1) +
    tuft(120, 180, 10, "#7f9a4a") +
    tuft(254, 186, 9, "#7f9a4a") +
    tuft(340, 178, 8, "#7f9a4a") +
    tuft(34, 190, 11, "#7f9a4a"),

  /** 冷え込む盆地(名寄)。低い太陽・光柱・ダイヤモンドダスト。 */
  coldbasin:
    sky("#8faec8", "#e0e4e0", 108) +
    // サンピラー(光の柱)
    `<rect x="316" y="12" width="16" height="92" fill="#f8dc90" opacity=".28"/>` +
    lowSun(324, 74, 15) +
    `<path d="M0,104q60,-30 120,-26q80,6 130,-14q70,-16 150,6v34H0z" fill="#7a8a94"/>` +
    hills(106, "#5f6b70", 4, 22) +
    firRow(110, 4, 396, 24, 26, "#2a3a30") +
    ground(108, "#eef4fa") +
    drifts(124, "#c8d8e6", ".8") +
    // 左:雪をかぶった家と、雪に埋もれた観測小屋
    shade(76, 158, 58, 7, ".14") +
    tinHouse(30, 156, 62, 30, "#b4453c") +
    `<path d="M22,140h78l-8,-6H30z" fill="#f4f8fc"/>` +
    tinHouse(108, 156, 40, 22, "#3f6f9a") +
    `<g fill="#f0ece0"><rect x="286" y="132" width="42" height="26"/></g>` +
    `<path d="M280,132h54l-6,-8h-42z" fill="#c8d0d8"/>` +
    `<g fill="#5f7f96"><rect x="292" y="138" width="12" height="12"/></g>` +
    `<g fill="#8a8578"><rect x="344" y="118" width="3.4" height="40"/><rect x="336" y="116" width="20" height="5"/></g>` +
    `<circle cx="346" cy="112" r="4" fill="#e8443f"/>` +
    // 樹氷(白い木立)
    `<g fill="#e4eef6"><path d="M186,158l-10,-30 10,-6 10,6z" opacity=".9"/><path d="M212,158l-8,-24 8,-5 8,5z" opacity=".9"/></g>` +
    // 手前:雪の畝と足跡
    band(160, 50, "#f4f8fc") +
    `<path d="M0,178q90,-12 180,-2q110,12 220,-6v40H0z" fill="#e0eaf2"/>` +
    `<g fill="#c8d8e6" opacity=".8"><ellipse cx="96" cy="196" rx="52" ry="8"/><ellipse cx="300" cy="204" rx="60" ry="8"/></g>` +
    `<g fill="#b8cbdc" opacity=".8"><ellipse cx="150" cy="204" rx="5" ry="3"/><ellipse cx="168" cy="199" rx="5" ry="3"/><ellipse cx="186" cy="194" rx="5" ry="3"/><ellipse cx="204" cy="189" rx="5" ry="3"/><ellipse cx="222" cy="184" rx="5" ry="3"/></g>` +
    flakes(
      [
        [40, 44, 1.5],
        [86, 66, 1.2],
        [132, 34, 1.4],
        [176, 58, 1.2],
        [222, 40, 1.5],
        [268, 62, 1.2],
        [356, 36, 1.4],
        [388, 62, 1.2],
        [60, 92, 1.3],
        [246, 96, 1.2],
        [150, 90, 1.4],
        [312, 100, 1.3],
      ],
      "#ffffff",
    ),

  /** 石炭の積出港(羽幌)。使われなくなった積込桟橋と、島へのフェリー。 */
  coalport:
    sky("#8fb8d4", "#dbe6ee", 102) +
    clouds(76, 26, 1) +
    clouds(316, 20, 0.8) +
    hills(102, "#4f6b58", 4, 26) +
    firRow(104, 4, 200, 12, 20) +
    // 沖の島(天売・焼尻)
    `<path d="M300,102q26,-16 54,-2q22,10 46,2v6H300z" fill="#6b7a76"/>` +
    band(102, 46, "#2f6a8f") +
    ripples(118, "#8fc0d8", ".4") +
    // 使われなくなった石炭の積込桟橋(左。錆びて草が生える)
    `<g fill="#8a5a3a"><rect x="0" y="112" width="150" height="9"/></g>` +
    `<g fill="#6b4028"><rect x="18" y="121" width="6" height="30"/><rect x="52" y="121" width="6" height="30"/><rect x="86" y="121" width="6" height="30"/><rect x="120" y="121" width="6" height="30"/></g>` +
    `<g stroke="#6b4028" stroke-width="1.6" fill="none"><path d="M18,130l34,16M52,130l34,16M86,130l34,16"/></g>` +
    `<path d="M96,112l16,-26h22l-6,26z" fill="#7a6a5a"/>` +
    `<g fill="#5f5348"><rect x="104" y="92" width="26" height="6"/></g>` +
    tuft(30, 112, 8) +
    tuft(74, 112, 9) +
    tuft(132, 112, 7) +
    ground(148, "#8a8578") +
    // フェリーの発着(右)
    fishingBoat(238, 124, 58, "#3f5f7a") +
    `<path d="M300,148h100v-22h-88z" fill="#c8c4b8"/>` +
    `<g fill="#e8443f"><rect x="312" y="112" width="88" height="14"/></g>` +
    `<g fill="#9fd8f0"><rect x="322" y="130" width="14" height="10"/><rect x="344" y="130" width="14" height="10"/><rect x="366" y="130" width="14" height="10"/></g>` +
    `<g fill="#f0ece0"><rect x="330" y="94" width="46" height="18"/><rect x="340" y="82" width="9" height="12"/></g>` +
    `<path d="M282,148h30v10h-30z" fill="#a8a49a"/>` +
    // 手前:港の広場と石炭の名残
    band(148, 10, "#a09880") +
    band(158, 52, "#7a7468") +
    `<g stroke="#5f5a52" stroke-width="2" opacity=".65" fill="none"><path d="M0,174h400M0,194h400M120,158v52M280,158v52"/></g>` +
    coalHeap(60, 200, 74, 26) +
    trackbedOvergrown(180, 128, 268, 24) +
    `<g fill="#8a5a3a"><rect x="316" y="180" width="60" height="26" rx="3"/></g>` +
    `<g stroke="#6b4028" stroke-width="1.8" fill="none"><path d="M316,190h60M346,180v26"/></g>` +
    gull(214, 74) +
    gull(244, 62, 0.8) +
    gull(178, 56, 0.9) +
    gull(268, 84, 0.7),

  /** 森の町(下川・中頓別・足寄)。土場に積まれた丸太と、木を燃やす煙。 */
  foresttown:
    sky("#8fc4e8", "#d8e8f2", 116) +
    clouds(310, 22, 0.9) +
    peaks(100, "#5f7060", [
      [56, 44, 62, false],
      [200, 34, 76, false],
      [344, 46, 60, false],
    ]) +
    firRow(104, 4, 396, 26, 34, "#24402e") +
    firRow(114, 10, 390, 20, 26, "#2f5240") +
    ground(116, "#6b7a4a") +
    // 左:丸太の山(木口が見える)
    shade(74, 162, 66, 8, ".18") +
    `<g fill="#a87a4a"><rect x="16" y="126" width="116" height="34" rx="3"/></g>` +
    `<g fill="#c89a62"><circle cx="26" cy="134" r="8"/><circle cx="44" cy="134" r="8"/><circle cx="62" cy="134" r="8"/><circle cx="80" cy="134" r="8"/><circle cx="98" cy="134" r="8"/><circle cx="116" cy="134" r="8"/>` +
    `<circle cx="34" cy="150" r="8"/><circle cx="52" cy="150" r="8"/><circle cx="70" cy="150" r="8"/><circle cx="88" cy="150" r="8"/><circle cx="106" cy="150" r="8"/></g>` +
    `<g fill="none" stroke="#a87a4a" stroke-width="1.4"><circle cx="26" cy="134" r="4"/><circle cx="62" cy="134" r="4"/><circle cx="98" cy="134" r="4"/><circle cx="52" cy="150" r="4"/><circle cx="88" cy="150" r="4"/></g>` +
    `<g fill="#6b5a44"><rect x="12" y="158" width="124" height="5"/><rect x="12" y="122" width="5" height="40"/><rect x="130" y="122" width="5" height="40"/></g>` +
    // 右:木を燃やす小さな発電所と町
    `<rect x="286" y="122" width="94" height="38" fill="#c8c4b8"/>` +
    `<path d="M280,122h106l-8,-10H288z" fill="#8a8f96"/>` +
    `<g fill="#5f7f96"><rect x="296" y="132" width="16" height="16"/><rect x="320" y="132" width="16" height="16"/><rect x="344" y="132" width="16" height="16"/></g>` +
    chimney(374, 122, 44, 9, "#a8a49a", true) +
    tinHouse(232, 162, 44, 24, "#b4453c") +
    // 手前:林道と、切り株と、運材のわだち
    band(160, 50, "#7f8a4a") +
    `<path d="M0,208q120,-46 400,-38v40H0z" fill="#8a7a5a"/>` +
    `<g stroke="#6b5f44" stroke-width="2.4" opacity=".8" fill="none"><path d="M0,200q120,-42 400,-34M0,208q120,-42 400,-34"/></g>` +
    `<g fill="#a87a4a"><ellipse cx="66" cy="184" rx="13" ry="6"/><rect x="53" y="184" width="26" height="7"/></g>` +
    `<g fill="#c89a62"><ellipse cx="66" cy="184" rx="9" ry="4"/></g>` +
    `<g fill="#a87a4a"><ellipse cx="330" cy="196" rx="11" ry="5"/><rect x="319" y="196" width="22" height="6"/></g>` +
    `<g fill="#c89a62"><ellipse cx="330" cy="196" rx="7.4" ry="3.4"/></g>` +
    tuft(150, 190, 10, "#8faa5f") +
    tuft(196, 182, 9, "#8faa5f") +
    tuft(258, 194, 8, "#8faa5f"),

  /** 岬(根室・標津・羅臼)。灯台と、海峡の向こうに見える陸。 */
  capecoast:
    sky("#8fb8d4", "#dfe8ef", 92) +
    clouds(78, 22, 0.9, "#eceff2", ".7") +
    // 海峡の向こうの陸(低く、青くかすむ)
    `<path d="M188,92q40,-22 84,-12q56,12 128,-6v18H188z" fill="#8a9aa8" opacity=".85"/>` +
    band(92, 60, "#2f6a8f") +
    whitecaps(104, [
      [206, 8, 1],
      [292, 18, 0.9],
      [346, 4, 1.1],
    ]) +
    ripples(126, "#8fc0d8", ".4") +
    // 流氷のかけら(海峡の手前)
    `<g fill="#eef6fa"><path d="M188,140l22,-6 16,6 -12,6z"/><path d="M244,150l26,-5 14,5 -16,6z"/><path d="M300,136l18,-4 12,5 -14,5z"/><path d="M348,148l24,-5 14,6 -18,5z"/></g>` +
    `<g fill="#c8dce8"><path d="M188,140l22,-6 4,4 -18,4z"/><path d="M244,150l26,-5 4,3 -22,4z"/></g>` +
    // 岬の断崖(左)
    `<path d="M0,88h96l14,26 -8,38H0z" fill="#5f6b62"/>` +
    `<path d="M0,88h96l14,26H0z" fill="#7f9a52"/>` +
    `<g stroke="#4a5450" stroke-width="1.6" opacity=".8" fill="none"><path d="M22,120l6,26M56,118l4,30M86,124l6,24"/></g>` +
    lighthouse(52, 88, 62) +
    ground(152, "#7a7a68") +
    // 定置網の浮きと、係留の漁船
    `<g fill="#f5b31c"><circle cx="252" cy="158" r="6"/><circle cx="278" cy="162" r="5"/><circle cx="304" cy="157" r="5.4"/></g>` +
    `<g stroke="#4a4038" stroke-width="1.2" opacity=".7" fill="none"><path d="M246,158h64"/></g>` +
    fishingBoat(316, 156, 66, "#2f4a5f") +
    // 手前:磯と、干した昆布の棚
    band(168, 42, "#6b6b5f") +
    `<g fill="#57574e"><ellipse cx="46" cy="186" rx="30" ry="10"/><ellipse cx="128" cy="198" rx="36" ry="11"/><ellipse cx="216" cy="190" rx="28" ry="9"/></g>` +
    `<g fill="#8a7a5f"><rect x="0" y="170" width="4" height="26"/><rect x="88" y="170" width="4" height="26"/><rect x="0" y="168" width="92" height="4"/></g>` +
    `<g fill="#4a4030"><rect x="10" y="172" width="7" height="22"/><rect x="26" y="172" width="7" height="26"/><rect x="42" y="172" width="7" height="20"/><rect x="58" y="172" width="7" height="25"/><rect x="74" y="172" width="7" height="21"/></g>` +
    gull(232, 62) +
    gull(268, 50, 0.8) +
    gull(150, 56, 0.9) +
    gull(330, 68, 0.7),

  /** 火山の裸地(弟子屈)。硫黄の噴気と、橙の岩肌と、木道。 */
  volcanicplain:
    sky("#8fbcd8", "#dfe4e0", 100) +
    clouds(70, 20, 0.8, "#e8ecec", ".6") +
    hills(100, "#6b7060", 4, 22) +
    band(100, 48, "#8a8270") +
    // 右奥:カルデラの外輪山と、そのふちに載る針葉樹。湖は縁だけ見える
    `<path d="M214,148q22,-34 62,-40q46,-8 72,-18q30,-8 52,-2v60H214z" fill="#6b7466"/>` +
    `<path d="M240,120q34,-16 74,-20q40,-4 86,-10v10q-46,8 -86,12q-40,4 -70,14z" fill="#5f6b60"/>` +
    firRow(122, 246, 396, 14, 18, "#2a4a36") +
    `<path d="M268,148q34,-14 78,-12q30,2 54,-4v10q-26,6 -56,4q-42,-2 -76,10z" fill="#2f5f8f"/>` +
    `<g stroke="#7fb8d0" stroke-width="1.6" opacity=".5" fill="none"><path d="M300,146h44M338,141h40"/></g>` +
    // 噴気を上げる裸の山(左〜中央)
    `<path d="M0,148L64,52L150,148z" fill="#a8703f"/>` +
    `<path d="M64,52L28,148h44L96,80z" fill="#c88a4a"/>` +
    `<g fill="#e8b850"><path d="M50,110l10,-6 8,10 -12,6z"/><path d="M84,124l12,-4 6,10 -14,4z"/><path d="M34,132l10,-5 6,9 -12,5z"/></g>` +
    `<g fill="#e8eef4" opacity=".75"><ellipse cx="58" cy="46" rx="13" ry="8"/><ellipse cx="68" cy="30" rx="17" ry="10"/><ellipse cx="82" cy="16" rx="13" ry="8"/>` +
    `<ellipse cx="104" cy="72" rx="10" ry="6"/><ellipse cx="112" cy="58" rx="12" ry="7"/></g>` +
    `<g stroke="#8a5a30" stroke-width="1.6" opacity=".8" fill="none"><path d="M40,120l-8,26M92,108l10,32M64,64l-6,22"/></g>` +
    ground(148, "#b0855a") +
    band(148, 14, "#9a7048") +
    // 裸地に取り残された枯れたハイマツ
    `<g fill="#4f5f48"><ellipse cx="286" cy="156" rx="17" ry="7"/><ellipse cx="332" cy="152" rx="13" ry="6"/><ellipse cx="374" cy="158" rx="15" ry="6"/></g>` +
    `<g fill="#6b5a44"><ellipse cx="242" cy="158" rx="18" ry="6"/><ellipse cx="196" cy="164" rx="14" ry="5"/></g>` +
    `<g stroke="#7a6248" stroke-width="1.8" fill="none" stroke-linecap="round"><path d="M216,158v-12l-6,-4M216,150l7,-5M258,152v-10l6,-4"/></g>` +
    // 手前:木道と、湯気の立つ穴
    band(162, 48, "#a8804f") +
    `<g fill="#8a6238" opacity=".8"><ellipse cx="120" cy="180" rx="34" ry="9"/><ellipse cx="316" cy="196" rx="40" ry="10"/><ellipse cx="216" cy="172" rx="26" ry="7"/></g>` +
    `<g fill="#e8eef4" opacity=".6"><ellipse cx="120" cy="170" rx="12" ry="6"/><ellipse cx="126" cy="158" rx="9" ry="5"/>` +
    `<ellipse cx="316" cy="186" rx="13" ry="6"/><ellipse cx="324" cy="174" rx="9" ry="5"/><ellipse cx="216" cy="164" rx="9" ry="4.4"/></g>` +
    `<g fill="#e8b850"><ellipse cx="120" cy="180" rx="16" ry="4"/><ellipse cx="316" cy="196" rx="20" ry="5"/><ellipse cx="216" cy="172" rx="12" ry="3.4"/></g>` +
    `<g fill="#f0cc70"><path d="M62,176l9,-4 4,7 -9,4z"/><path d="M366,182l8,-3 3,6 -8,3z"/><path d="M170,190l10,-4 4,7 -10,4z"/></g>` +
    `<g fill="#8a7a5f"><rect x="0" y="186" width="400" height="7"/><rect x="0" y="196" width="400" height="7"/></g>` +
    `<g fill="#6b5a44"><rect x="24" y="192" width="7" height="16"/><rect x="126" y="192" width="7" height="16"/><rect x="228" y="192" width="7" height="16"/><rect x="330" y="192" width="7" height="16"/></g>` +
    `<g stroke="#6b5a44" stroke-width="1.4" opacity=".8" fill="none"><path d="M0,190h400M0,200h400"/></g>` +
    `<g fill="#a89a80"><rect x="0" y="182" width="400" height="4"/></g>`,

  /** 湿原の縁(標茶・鶴居)。蛇行する川とヨシ原、遠くに丹頂が一羽。 */
  wetlandedge:
    sky("#8fc4e8", "#d8e8f2", 104) +
    clouds(88, 24, 1) +
    clouds(322, 18, 0.8) +
    hills(102, "#5f7a64", 4, 24) +
    shelterbelt(104, 200, 396, 20) +
    firRow(106, 4, 190, 12, 20, "#2f5240") +
    ground(104, "#8fa858") +
    // 蛇行する川
    `<path d="M0,124q60,10 96,26q40,18 100,14q64,-6 106,10q40,12 98,6v14q-60,6 -100,-6q-46,-14 -104,-8q-60,6 -104,-14q-40,-18 -92,-28z" fill="#4f86a8"/>` +
    `<path d="M0,130q56,10 92,26q40,18 100,14q64,-6 106,10q40,12 102,6v6q-62,4 -104,-8q-46,-14 -104,-8q-60,6 -100,-16q-38,-20 -92,-24z" fill="#3f6f8f"/>` +
    ripples(148, "#bfe8f4", ".3") +
    // ヨシ原
    band(160, 50, "#8a9a5a") +
    reeds(180, 4, 150, 15) +
    reeds(186, 250, 396, 14) +
    reeds(196, 40, 360, 22, "#9a8a4f") +
    // ハンノキ(湿原に点々と立つ)
    `<g><rect x="176" y="128" width="4" height="20" fill="#4a3a28"/><ellipse cx="178" cy="122" rx="12" ry="9" fill="#3f6b4a"/></g>` +
    `<g><rect x="228" y="136" width="3.4" height="16" fill="#4a3a28"/><ellipse cx="230" cy="130" rx="10" ry="7" fill="#3f6b4a"/></g>` +
    // 遠くに丹頂(小さく2羽。主役にしない)
    `<g fill="#f4f8fc"><ellipse cx="300" cy="152" rx="11" ry="6"/><path d="M308,148l7,-14h3l-4,15z"/></g>` +
    `<g fill="#2f2a26"><path d="M289,152l-9,2 9,3z"/><rect x="298" y="157" width="2" height="10"/><rect x="303" y="157" width="2" height="10"/></g>` +
    `<circle cx="317" cy="132" r="2.4" fill="#e8443f"/>` +
    `<path d="M318,134l8,-2" stroke="#3a3630" stroke-width="1.6" fill="none"/>` +
    `<g fill="#f4f8fc"><ellipse cx="340" cy="158" rx="9" ry="5"/><path d="M346,155l6,-11h2.4l-3.4,12z"/></g>` +
    `<g fill="#2f2a26"><rect x="338" y="162" width="2" height="8"/><rect x="343" y="162" width="2" height="8"/></g>` +
    `<circle cx="353" cy="142" r="2" fill="#e8443f"/>` +
    // 手前:木道の展望デッキ(左)
    `<g fill="#8a7a5f"><rect x="0" y="184" width="132" height="7"/><rect x="0" y="196" width="132" height="7"/></g>` +
    `<g fill="#6b5a44"><rect x="24" y="191" width="6" height="19"/><rect x="94" y="191" width="6" height="19"/><rect x="126" y="176" width="6" height="34"/></g>` +
    `<g stroke="#6b5a44" stroke-width="2.2" fill="none"><path d="M0,176h132M0,168v0"/></g>` +
    tuft(180, 202, 10, "#7f9a4a") +
    tuft(226, 196, 9, "#7f9a4a") +
    gull(120, 68, 0.7),

  /** 根釧台地の草地(別海・中標津)。碁盤の防風林と、草に消えた廃線。 */
  grassland:
    sky("#8fc4e8", "#dfe8ef", 110) +
    clouds(84, 26, 1.1) +
    clouds(318, 20, 0.9) +
    hills(108, "#5f7a5a", 4, 20) +
    // 碁盤の防風林(北海道の畑を北海道に見せる形)
    shelterbelt(110, 4, 396, 22) +
    ground(110, "#9aae5f") +
    shelterbelt(132, 0, 148, 18, "#35583f") +
    shelterbelt(132, 252, 400, 18, "#35583f") +
    band(134, 22, "#8faa5a") +
    // 左:サイロと牛舎
    shade(78, 158, 60, 8, ".16") +
    silo(40, 156, 54) +
    barn(62, 156, 92, 26) +
    // 右:牛の群れ
    shade(310, 164, 24, 5, ".18") +
    cow(308, 162, 0.9, -1) +
    shade(360, 158, 18, 4, ".18") +
    cow(360, 156, 0.7, 1) +
    // 牧草地
    band(156, 54, "#8fa858") +
    `<g stroke="#7f9a4a" stroke-width="2" opacity=".65" fill="none"><path d="M0,168q100,-6 200,0t200,-2M0,182q100,-6 200,0t200,-2M0,198q100,-6 200,0t200,-2"/></g>` +
    // 草に消えた廃線(まっすぐ横切る一本の筋)と、その先の車止め
    trackbedOvergrown(186, 0, 268, 26) +
    bufferStop(302, 192, 1.1) +
    fence(174, 300, 400) +
    bale(200, 208, 12) +
    bale(238, 204, 10) +
    tuft(60, 200, 10, "#7f9a4a") +
    tuft(140, 194, 9, "#7f9a4a") +
    gull(140, 62, 0.7) +
    gull(240, 54, 0.6),
};

// ---------------------------------------------------------------------------
// 記号(24×24)。**盤面では直径19pxほどの点にしかならない。**
// 輪郭を優先し、主役を1つに絞る。同系色の面を隣り合わせない
// (雪と空が多い盤面なので、白と淡い青が接すると縮小時に輪郭が消える)。
// 呼び出し側が g に stroke="#241a10" stroke-width=".7" を掛けるので、
// 図形はそれ前提で分けて置く。
// ---------------------------------------------------------------------------

export const HOKKAIDO_MARKS = {
  /** 炭鉱(夕張・美唄・歌志内)。竪坑櫓と巻き上げの車輪。 */
  coalmine:
    '<rect x="0.6" y="20.8" width="22.8" height="3.2" fill="#2a2620"/>' +
    '<path d="M2.6,20.8L9,4.4h6l6.4,16.4h-3.4L12.6,7.4h-1.2L5.9,20.8z" fill="#4a4038"/>' +
    '<rect x="4.6" y="14.6" width="14.8" height="1.9" fill="#4a4038"/>' +
    '<rect x="6.4" y="10.2" width="11.2" height="1.7" fill="#4a4038"/>' +
    '<circle cx="12" cy="4.6" r="3.9" fill="#8a8578"/>' +
    '<circle cx="12" cy="4.6" r="1.7" fill="#3a3228"/>' +
    '<path d="M15.6,5.8L20,15.6" stroke="#3a3228" stroke-width="1.2" fill="none"/>' +
    '<path d="M2.2,20.8q4,-6 9.8,-6t9.8,6z" fill="#2a2620"/>',

  /** 操車場・扇形機関庫(岩見沢)。三連のアーチと、手前の転車台。 */
  railyard:
    '<rect x="0.6" y="19.4" width="22.8" height="4.6" fill="#6b6458"/>' +
    '<rect x="1.4" y="7.4" width="21.2" height="12" fill="#a85a44"/>' +
    '<path d="M0.6,7.4h22.8l-2.6,-3.4H3.2z" fill="#4a4f58"/>' +
    '<rect x="0.6" y="7.4" width="22.8" height="1.6" fill="#3a3f47"/>' +
    '<g stroke="#8a4a34" stroke-width="0.7" opacity="0.8" fill="none"><path d="M1.4,12.4h21.2M1.4,16h21.2"/></g>' +
    '<g fill="#2a2620"><path d="M2.6,19.4v-3.6a2.8,2.8 0 0 1 5.6,0v3.6z"/>' +
    '<path d="M9.2,19.4v-4a2.8,2.8 0 0 1 5.6,0v4z"/>' +
    '<path d="M15.8,19.4v-3.6a2.8,2.8 0 0 1 5.6,0v3.6z"/></g>' +
    '<rect x="10.4" y="16.4" width="3.4" height="3" fill="#3f5f4a"/>' +
    '<circle cx="12.1" cy="17.6" r="0.8" fill="#f5b31c"/>' +
    '<ellipse cx="12" cy="21.6" rx="10.6" ry="2.2" fill="#8a8578"/>' +
    '<g stroke="#c0c6cc" stroke-width="0.9" fill="none"><path d="M1.8,21.4h20.4"/></g>' +
    '<g stroke="#a09880" stroke-width="0.7" fill="none"><path d="M12,21.6L5.4,19.6M12,21.6L18.6,19.6"/></g>' +
    '<circle cx="12" cy="21.6" r="1.3" fill="#3a3f47"/>',

  /** チセ(白老)。アイヌの家。**建築で表す。人物・顔は描かない。** */
  chise:
    '<rect x="0.6" y="21.2" width="22.8" height="2.8" fill="#6b8a4f"/>' +
    '<path d="M1.6,21.2L8.4,2.8h7.2L22.4,21.2z" fill="#b09a62"/>' +
    '<path d="M1.6,21.2L8.4,2.8h2.8L5.2,21.2z" fill="#8a7648"/>' +
    '<rect x="7.6" y="1.6" width="8.8" height="2.4" fill="#7a6640"/>' +
    '<g stroke="#8a7648" stroke-width="0.9" fill="none"><path d="M3.4,10.8h17.2M2.8,15.4h18.4"/></g>' +
    '<g stroke="#7a6640" stroke-width="0.9" fill="none"><path d="M10.2,4L7,21.2M13.8,4L17,21.2"/></g>' +
    '<rect x="9.6" y="13.4" width="4.8" height="7.8" fill="#4a3a28"/>' +
    '<rect x="9" y="12.4" width="6" height="1.6" fill="#7a6640"/>' +
    '<g stroke="#7a6640" stroke-width="1.1" fill="none"><path d="M8.8,3.4L7.4,0.4M9.8,0.4L8.4,3.4M15.2,3.4L13.8,0.4M16.2,0.4L14.8,3.4"/></g>',

  /** 空港(千歳・中標津)。滑走路の上の旅客機。 */
  airport:
    '<rect x="0.6" y="19.4" width="22.8" height="4.6" fill="#5f5f5f"/>' +
    '<g fill="#e8e4d8"><rect x="1.6" y="21.2" width="4.4" height="1.2"/><rect x="9.8" y="21.2" width="4.4" height="1.2"/><rect x="18" y="21.2" width="4.4" height="1.2"/></g>' +
    '<path d="M2.4,15.2h13.4q3.4,0 4.6,-2.4q-1.2,-2.4 -4.6,-2.4H3.6q-1.4,0 -1.6,2.4z" fill="#f4f2ec"/>' +
    '<path d="M2.4,15.2h13.4q3.4,0 4.6,-2.4H2.3z" fill="#e8443f"/>' +
    '<path d="M6.4,10.4L3.6,3.6h2.2l4.4,6.8z" fill="#f4f2ec"/>' +
    '<path d="M4,4.6h2l2.8,4.4h-2z" fill="#e8443f"/>' +
    '<path d="M9,15.2h6.6l-2,3.4H7z" fill="#c8c4b8"/>' +
    '<ellipse cx="9" cy="14" rx="2.6" ry="1.6" fill="#5f646e"/>' +
    '<g fill="#3f5f7a"><circle cx="8.2" cy="12.6" r="0.8"/><circle cx="11" cy="12.6" r="0.8"/><circle cx="13.8" cy="12.6" r="0.8"/></g>' +
    '<g fill="#2f2a26"><circle cx="6.4" cy="18.8" r="1.4"/><circle cx="15" cy="18.8" r="1.4"/></g>',

  /** 製紙(苫小牧)。のこぎり屋根の工場と、積まれた巻取り紙。 */
  papermill:
    '<rect x="0.6" y="20.6" width="22.8" height="3.4" fill="#6b6458"/>' +
    '<path d="M0.8,20.6V11.4l3.6,-3.4v3.4l3.6,-3.4v3.4l3.6,-3.4v3.4l3.6,-3.4v12.6z" fill="#c8c4b8"/>' +
    '<g fill="#5f7f96"><path d="M1,11.4l3.4,-3.2v3.2z"/><path d="M4.6,11.4L8,8.2v3.2z"/><path d="M8.2,11.4l3.4,-3.2v3.2z"/><path d="M11.8,11.4l3.4,-3.2v3.2z"/></g>' +
    '<g fill="#3a3228"><rect x="2.4" y="14.4" width="3" height="3.4"/><rect x="7.4" y="14.4" width="3" height="3.4"/><rect x="12.4" y="14.4" width="3" height="3.4"/></g>' +
    '<rect x="16.6" y="2.6" width="3.4" height="12" fill="#b0603c"/>' +
    '<rect x="16" y="2.2" width="4.6" height="1.6" fill="#8a4a30"/>' +
    '<g fill="#e8eef4" opacity="0.85"><ellipse cx="15.4" cy="4.8" rx="2.6" ry="1.6"/><ellipse cx="12.6" cy="2.6" rx="2.1" ry="1.3"/><ellipse cx="9.6" cy="1.4" rx="1.6" ry="1"/></g>' +
    '<g fill="#f4f2ec"><rect x="15.4" y="15" width="7.2" height="5.6"/><rect x="17.4" y="9.4" width="5.4" height="5"/></g>' +
    '<ellipse cx="22.6" cy="17.8" rx="1.6" ry="2.8" fill="#e0dcd0"/>' +
    '<ellipse cx="22.6" cy="17.8" rx="0.7" ry="1.3" fill="#a89f8c"/>' +
    '<ellipse cx="22.8" cy="11.9" rx="1.4" ry="2.5" fill="#e0dcd0"/>' +
    '<ellipse cx="22.8" cy="11.9" rx="0.6" ry="1.1" fill="#a89f8c"/>' +
    '<rect x="0.6" y="19" width="22.8" height="1.8" fill="#8a8578"/>',

  /** 煉瓦(江別)。積まれた赤煉瓦と、窯の煙突。 */
  brick:
    '<rect x="0.6" y="21.4" width="22.8" height="2.6" fill="#6b5f48"/>' +
    '<g fill="#b46a4a"><rect x="1.2" y="17.4" width="9.4" height="3.8"/><rect x="11.2" y="17.4" width="9.4" height="3.8"/>' +
    '<rect x="3.4" y="13.2" width="9.4" height="3.8"/><rect x="13.4" y="13.2" width="7.4" height="3.8"/>' +
    '<rect x="1.2" y="9" width="9.4" height="3.8"/><rect x="11.2" y="9" width="7" height="3.8"/></g>' +
    '<g fill="#8a4a34" opacity="0.8"><rect x="1.2" y="17.4" width="9.4" height="0.9"/><rect x="11.2" y="17.4" width="9.4" height="0.9"/>' +
    '<rect x="3.4" y="13.2" width="9.4" height="0.9"/><rect x="13.4" y="13.2" width="7.4" height="0.9"/>' +
    '<rect x="1.2" y="9" width="9.4" height="0.9"/><rect x="11.2" y="9" width="7" height="0.9"/></g>' +
    '<path d="M15.6,9L16.6,0.8h3.6L21.4,9z" fill="#a85a44"/>' +
    '<rect x="16" y="0.4" width="4.8" height="1.6" fill="#8a4a34"/>' +
    '<g fill="#e8eef4" opacity="0.8"><ellipse cx="15.4" cy="3" rx="2.4" ry="1.5"/><ellipse cx="12.6" cy="1.2" rx="1.9" ry="1.2"/></g>',

  /** 新幹線(倶知安・木古内)。長い鼻先と、緑の帯。 */
  shinkansen:
    '<rect x="0.6" y="20.4" width="22.8" height="3.6" fill="#7a7468"/>' +
    '<g fill="#4a3a28"><rect x="1.4" y="19" width="3.4" height="1.6"/><rect x="7.4" y="19" width="3.4" height="1.6"/><rect x="13.4" y="19" width="3.4" height="1.6"/><rect x="19.4" y="19" width="3.4" height="1.6"/></g>' +
    '<path d="M23.4,18.4H6.6q-5.4,0 -5.4,-5.4q0,-4.6 6.6,-6.8q4.4,-1.4 16.2,-1.4z" fill="#f0f2f4"/>' +
    '<path d="M23.4,10.6H2.2q-0.8,1.2 -0.9,2.4q0,1.6 0.7,2.6h21.4z" fill="#3f7a5a"/>' +
    '<path d="M23.4,15.6H2q0.6,2.8 4.6,2.8h16.8z" fill="#d8dce0"/>' +
    '<path d="M8.4,6.6q-4.4,1.8 -5.6,4.4h5.6z" fill="#2f3a48"/>' +
    '<g fill="#9fd8f0"><rect x="11" y="7.4" width="3.6" height="2.6"/><rect x="16" y="7.4" width="3.6" height="2.6"/></g>' +
    '<circle cx="4.4" cy="12.4" r="1" fill="#f5b31c"/>' +
    '<g fill="#3a3f47"><circle cx="9" cy="18.6" r="1.6"/><circle cx="18" cy="18.6" r="1.6"/></g>',

  /** 風車(石狩・せたな・遠別)。3枚羽根と、低い海。 */
  windturbine:
    '<rect x="0.6" y="20" width="22.8" height="4" fill="#2f6a8f"/>' +
    '<g stroke="#7fb8d0" stroke-width="1" fill="none"><path d="M1.6,21.6h6M13,22.8h9M9,21.4h2.6"/></g>' +
    '<path d="M9.6,20L11.2,7.6h1.6L14.4,20z" fill="#e4e8ec"/>' +
    '<g fill="#f4f8fc"><path d="M12,7.4L11.4,0.8l1.6,-0.2 0.8,6.8z"/>' +
    '<path d="M12.6,7.8l6.2,-2.6 0.6,1.5 -6,2.6z"/>' +
    '<path d="M11.4,8.2L6,12.6l-1.1,-1.2 5.5,-4.4z"/></g>' +
    '<circle cx="12" cy="7.6" r="1.7" fill="#b8bcc4"/>' +
    '<circle cx="12" cy="7.6" r="0.7" fill="#5f646e"/>' +
    '<path d="M0.6,20h22.8v1.4H0.6z" fill="#1f5878"/>',

  /** 鰊御殿(江差)。低く長い大屋根と、下見板の壁。 */
  herringmansion:
    '<rect x="0.6" y="21.4" width="22.8" height="2.6" fill="#8a8578"/>' +
    '<path d="M0.8,10.4L12,3.4l11.2,7z" fill="#4a4f58"/>' +
    '<path d="M0.8,10.4L12,3.4l1.4,0.9 -10.4,6.1z" fill="#6b7078"/>' +
    '<rect x="0.6" y="10.4" width="22.8" height="1.8" fill="#3a3f47"/>' +
    '<rect x="2" y="12.2" width="20" height="9.2" fill="#7a5a3c"/>' +
    '<g stroke="#5f4630" stroke-width="0.8" opacity="0.85" fill="none"><path d="M2,14.6h20M2,17h20M2,19.4h20"/></g>' +
    '<rect x="3.6" y="13.6" width="4.6" height="4.4" fill="#f0ece0"/>' +
    '<g stroke="#7a5a3c" stroke-width="0.8" fill="none"><path d="M5.9,13.6v4.4M3.6,15.8h4.6"/></g>' +
    '<rect x="15.6" y="13.6" width="4.6" height="4.4" fill="#f0ece0"/>' +
    '<g stroke="#7a5a3c" stroke-width="0.8" fill="none"><path d="M17.9,13.6v4.4M15.6,15.8h4.6"/></g>' +
    '<rect x="9.8" y="15.4" width="4.6" height="6" fill="#3a3228"/>' +
    '<path d="M11.2,3.4h1.6V1.2h-1.6z" fill="#4a4f58"/>',

  /** 松前城(松前)。白い天守と石垣。 */
  castle:
    '<path d="M0.8,24L3.4,15.6h17.2L23.2,24z" fill="#a8a294"/>' +
    '<g stroke="#8a8578" stroke-width="0.8" fill="none"><path d="M2.6,18.4h18.8M1.8,21.2h20.4"/></g>' +
    '<rect x="4.4" y="10.6" width="15.2" height="5" fill="#f0ece0"/>' +
    '<path d="M2.6,10.6h18.8l-2.6,-2.4H5.2z" fill="#4a4f58"/>' +
    '<rect x="6.8" y="5.6" width="10.4" height="2.8" fill="#f0ece0"/>' +
    '<path d="M4.8,5.6h14.4l-2.2,-2.2H7z" fill="#4a4f58"/>' +
    '<path d="M6.4,3.4h11.2L12,0.4z" fill="#4a4f58"/>' +
    '<g fill="#3a3228"><rect x="6" y="11.8" width="2.6" height="2.6"/><rect x="10.7" y="11.8" width="2.6" height="2.6"/><rect x="15.4" y="11.8" width="2.6" height="2.6"/>' +
    '<rect x="8.4" y="6.4" width="2.4" height="1.8"/><rect x="13.2" y="6.4" width="2.4" height="1.8"/></g>' +
    '<path d="M12,0.4V-0.2" stroke="#4a4f58" stroke-width="0.8"/>',

  /** 中世の館(上ノ国)。土の塁と、丸太の柵と、門。 */
  fort_medieval:
    '<rect x="0.6" y="20.6" width="22.8" height="3.4" fill="#8a7a5a"/>' +
    '<path d="M0.6,20.6q4,-6.4 11.4,-6.4t11.4,6.4z" fill="#7f9a52"/>' +
    '<g fill="#7a5a3c"><rect x="1.4" y="8.8" width="2.2" height="9"/><rect x="5" y="7.4" width="2.2" height="10"/>' +
    '<rect x="16.8" y="7.4" width="2.2" height="10"/><rect x="20.4" y="8.8" width="2.2" height="9"/></g>' +
    '<g fill="#6b4a30"><path d="M1.4,8.8l1.1,-1.6 1.1,1.6z"/><path d="M5,7.4l1.1,-1.6 1.1,1.6z"/><path d="M16.8,7.4l1.1,-1.6 1.1,1.6z"/><path d="M20.4,8.8l1.1,-1.6 1.1,1.6z"/></g>' +
    '<g stroke="#5f4630" stroke-width="1.2" fill="none"><path d="M0.8,10.6h6.8M16.4,10.6h6.8M0.8,14.4h6.8M16.4,14.4h6.8"/></g>' +
    '<path d="M7.6,17.4V9.4h8.8v8z" fill="#8a7a5f"/>' +
    '<path d="M6.6,9.4h10.8L15.8,6.2H8.2z" fill="#6b5a44"/>' +
    '<rect x="10.2" y="12" width="3.6" height="5.4" fill="#3a3228"/>' +
    '<g fill="#5f4630"><rect x="7.6" y="9.4" width="8.8" height="1"/></g>',

  /** 乳牛(八雲・標茶・別海)。白地に黒斑のホルスタイン。 */
  dairycow:
    '<rect x="0.6" y="21.4" width="22.8" height="2.6" fill="#8fa858"/>' +
    '<g fill="#3a3630"><rect x="4.6" y="15.4" width="2.2" height="6"/><rect x="8.4" y="15.4" width="2.2" height="6"/><rect x="13" y="15.4" width="2.2" height="6"/><rect x="16.6" y="15.4" width="2.2" height="6"/></g>' +
    '<ellipse cx="11.6" cy="12.4" rx="8.6" ry="5.2" fill="#f4f2ec"/>' +
    '<g fill="#3a3630"><ellipse cx="8.2" cy="10.6" rx="3" ry="2.3"/><ellipse cx="14.4" cy="13.6" rx="2.6" ry="2"/></g>' +
    '<path d="M17.4,7.4h5.2v7.4h-5.2z" fill="#f4f2ec"/>' +
    '<path d="M17.4,11.4h5.2v3.4h-5.2z" fill="#3a3630"/>' +
    '<g fill="#f4f2ec"><path d="M17.6,8.4l-2.6,-1.4 0.4,3z"/><path d="M22.4,8.4l1.4,-1.6 0.2,2.6z"/></g>' +
    '<g stroke="#c8b8a0" stroke-width="1.1" stroke-linecap="round" fill="none"><path d="M18.4,7.4l-0.6,-2.2M21.6,7.4l1,-2"/></g>' +
    '<g fill="#2a2620"><circle cx="19" cy="9.6" r="0.8"/><circle cx="21.4" cy="9.6" r="0.8"/><circle cx="19.2" cy="12.8" r="0.7"/><circle cx="21.2" cy="12.8" r="0.7"/></g>' +
    '<path d="M3.2,9.6q-2,2.6 -0.8,5.6" stroke="#3a3630" stroke-width="1.2" fill="none"/>',

  /** 駅弁(長万部)。かにめしの折と、掛け紙の蟹。 */
  ekiben:
    '<rect x="0.6" y="21" width="22.8" height="3" fill="#8a7a5f"/>' +
    '<path d="M1.6,21L3,8.6h18L22.4,21z" fill="#c89a62"/>' +
    '<path d="M1.6,21L3,8.6h2.4L4.2,21z" fill="#a87a4a"/>' +
    '<rect x="2.2" y="7" width="19.6" height="2.4" fill="#8a6a44"/>' +
    '<rect x="3.8" y="11" width="16.4" height="7.4" fill="#f0ece0"/>' +
    '<g fill="#e8443f"><ellipse cx="12" cy="14.6" rx="3.2" ry="2.2"/>' +
    '<path d="M8.6,12.4l-2.6,-1.6 -0.6,1.2 2.6,1.6z"/><path d="M15.4,12.4l2.6,-1.6 0.6,1.2 -2.6,1.6z"/>' +
    '<path d="M8.4,16.4l-2.8,1.4 0.6,1.2 2.8,-1.4z"/><path d="M15.6,16.4l2.8,1.4 -0.6,1.2 -2.8,-1.4z"/>' +
    '<path d="M9.4,11.4L8,9.4l1.2,-0.6 1.4,2z"/><path d="M14.6,11.4L16,9.4l-1.2,-0.6 -1.4,2z"/></g>' +
    '<g fill="#3a3228"><circle cx="10.8" cy="13.8" r="0.6"/><circle cx="13.2" cy="13.8" r="0.6"/></g>' +
    '<rect x="3.8" y="18.4" width="16.4" height="1.4" fill="#d8cfbc"/>',

  /** いかめし(森)。米を詰めたイカ。 */
  squid:
    '<rect x="0.6" y="21" width="22.8" height="3" fill="#6b5a44"/>' +
    '<path d="M12,1.4q5.6,0 5.6,6.4v6.6q0,3.4 -5.6,3.4t-5.6,-3.4V7.8q0,-6.4 5.6,-6.4z" fill="#d8a878"/>' +
    '<path d="M12,1.4q-5.6,0 -5.6,6.4v6.6q0,2.4 2.8,3.1V4.4q0,-3 2.8,-3z" fill="#e8c096"/>' +
    '<g fill="#c88a56"><path d="M8.2,17.4l-2.6,4.4 1.8,0.6 2.4,-4.4z"/><path d="M11,17.8l-1,4.8h1.6l0.8,-4.8z"/>' +
    '<path d="M14,17.6l1.4,4.8 1.6,-0.6 -1.4,-4.4z"/><path d="M16,16.6l3.6,3.6 1.2,-1.2 -3.4,-3.2z"/>' +
    '<path d="M6.6,15.8L3.4,18.6l1,1.4 3.2,-2.8z"/></g>' +
    '<g fill="#3a3228"><circle cx="9.6" cy="13" r="1.1"/><circle cx="14.4" cy="13" r="1.1"/></g>' +
    '<g fill="#f4f2ec"><circle cx="10.4" cy="7" r="1.5"/><circle cx="13.4" cy="6.2" r="1.5"/><circle cx="12" cy="9.6" r="1.5"/><circle cx="14.6" cy="9.2" r="1.3"/><circle cx="9.6" cy="10" r="1.3"/></g>' +
    '<path d="M9,3.6q3,-1.4 6,0" stroke="#c88a56" stroke-width="0.9" fill="none"/>',

  /** 横綱(福島)。**人ではなく**、化粧まわしと綱で表す。 */
  sumo:
    '<rect x="0.6" y="21.6" width="22.8" height="2.4" fill="#8a7a5f"/>' +
    '<path d="M2.4,4.6q9.6,-4 19.2,0l-1,3q-8.6,-3.4 -17.2,0z" fill="#f4f2ec"/>' +
    '<g stroke="#d8d0bc" stroke-width="0.8" fill="none"><path d="M6,3.6l-0.6,3M10,2.9l-0.4,3.1M14,2.9l0.4,3.1M18,3.6l0.6,3"/></g>' +
    '<g fill="#f0ece0"><path d="M7.4,6.4l-2.2,3.4 2.8,0.4 0.6,-3.4z"/><path d="M16.6,6.4l2.2,3.4 -2.8,0.4 -0.6,-3.4z"/></g>' +
    '<path d="M8.4,7.4h7.2l1.4,10.4H7z" fill="#8a2f3a"/>' +
    '<path d="M8.4,7.4h7.2l0.3,2H8.1z" fill="#f5b31c"/>' +
    '<path d="M9.4,10.6h5.2l0.7,5.2H8.7z" fill="#f5b31c"/>' +
    '<path d="M12,11.4l1.6,2 -1.6,2 -1.6,-2z" fill="#8a2f3a"/>' +
    '<g fill="#f5b31c"><rect x="6.8" y="17.6" width="10.4" height="1.6"/></g>' +
    '<g stroke="#f5d89a" stroke-width="1" stroke-linecap="round" fill="none"><path d="M7.6,19.4v2.4M9.8,19.4v2.4M12,19.4v2.4M14.2,19.4v2.4M16.4,19.4v2.4"/></g>',

  /** 防潮堤(奥尻)。海に向かって立つコンクリートの壁。 */
  seawall:
    '<path d="M0.6,7h9.4v17H0.6z" fill="#2f6a8f"/>' +
    '<g fill="#f0f8fc"><path d="M0.6,12.4q2.4,-2 4.8,0q-2.4,1.6 -4.8,0z"/><path d="M0.6,17.4q2.6,-2 5.2,0q-2.6,1.6 -5.2,0z"/></g>' +
    '<path d="M8.6,5.4q-2.4,1.6 -3.4,4.4q-0.8,2.4 -3.4,3.4q3,0.4 5,-1.6q1.4,-1.4 1.8,-3.4z" fill="#f4fafc"/>' +
    '<g fill="#f4fafc"><circle cx="4.6" cy="7.4" r="1.4"/><circle cx="2.4" cy="10" r="1"/><circle cx="6.6" cy="4.6" r="1"/></g>' +
    '<path d="M8.6,24V6.4h5.8V24z" fill="#d8d2c4"/>' +
    '<path d="M8.6,6.4h5.8v1.8H8.6z" fill="#b8b2a4"/>' +
    '<g stroke="#b0aa9c" stroke-width="0.8" fill="none"><path d="M8.6,11h5.8M8.6,15.4h5.8M8.6,19.8h5.8M11.5,6.4V24"/></g>' +
    '<path d="M14.4,24v-6.6h9v6.6z" fill="#8a9a68"/>' +
    '<g fill="#dcd6c8"><rect x="15.4" y="14.4" width="2.8" height="3"/><rect x="19.6" y="13.4" width="2.8" height="4"/><rect x="18" y="12" width="2.4" height="1.4"/></g>' +
    '<g fill="#b4453c"><path d="M15,14.4h3.6l-1.8,-1.6z"/><path d="M19.2,13.4h3.6l-1.8,-1.6z"/></g>' +
    '<path d="M0.6,22.4h8v1.6h-8z" fill="#1f5878"/>',

  /** 廃線(留萌)。車止めと、レールの無い路盤。 */
  raildisused:
    '<rect x="0.6" y="16.4" width="22.8" height="7.6" fill="#a09880"/>' +
    '<g fill="#5a4a36"><rect x="1" y="18.4" width="6.4" height="1.9"/><rect x="1.6" y="21.4" width="6.4" height="1.9"/><rect x="9.6" y="18.6" width="6" height="1.8"/><rect x="10.4" y="21.6" width="6" height="1.8"/></g>' +
    '<rect x="14.4" y="14.6" width="9" height="2.4" fill="#4a3a28"/>' +
    '<path d="M15.4,14.6l1.4,-5.6h5l1.4,5.6z" fill="#6b7078"/>' +
    '<rect x="16" y="5.4" width="7.4" height="3.6" fill="#e8443f"/>' +
    '<g fill="#f0ece0"><rect x="17.6" y="5.4" width="1.4" height="3.6"/><rect x="20.6" y="5.4" width="1.4" height="3.6"/></g>' +
    '<g stroke="#4a4038" stroke-width="1" fill="none"><path d="M16.4,13.4l6,-3.4M22.4,13.4l-6,-3.4"/></g>' +
    '<g stroke="#7f9a52" stroke-width="1.2" stroke-linecap="round" fill="none">' +
    '<path d="M4,18.4l-1.4,-3.4M4,18.4v-4M4,18.4l1.6,-3M11.4,18.6l-1.2,-2.8M11.4,18.6v-3.4M18,20.4v-2.6"/></g>' +
    '<path d="M0.6,16.4q5,-1.4 10.4,-0.4" stroke="#8a8578" stroke-width="1" fill="none"/>',

  /** 深地層の試錐(幌延)。**掘るが、埋めない。**櫓と、空のままの地層。 */
  borehole:
    '<rect x="0.6" y="9.4" width="22.8" height="14.6" fill="#a8926a"/>' +
    '<g fill="#8a7a52"><rect x="0.6" y="12.6" width="22.8" height="2.2"/><rect x="0.6" y="17.6" width="22.8" height="2.2"/></g>' +
    '<g fill="#6b5a3a"><rect x="0.6" y="21.6" width="22.8" height="2.4"/></g>' +
    '<rect x="0.6" y="9.4" width="22.8" height="1.6" fill="#7f9a52"/>' +
    '<path d="M6.4,9.4L8.4,0.8h7.2L17.6,9.4h-2.4L13.8,3h-3.6L8.8,9.4z" fill="#6b7078"/>' +
    '<g fill="#6b7078"><rect x="8" y="5.4" width="8" height="1.4"/></g>' +
    '<rect x="11.2" y="0.4" width="1.6" height="2.6" fill="#4a4f58"/>' +
    '<rect x="11.2" y="9.4" width="1.6" height="11.8" fill="#e8e4d8"/>' +
    '<rect x="11.6" y="9.4" width="0.8" height="11.8" fill="#8a8578"/>' +
    '<circle cx="12" cy="21.8" r="1.6" fill="#f0ece0"/>' +
    '<g stroke="#4a4f58" stroke-width="0.9" fill="none"><path d="M9.6,4.2l4.8,4.4M14.4,4.2L9.6,8.6"/></g>' +
    '<g fill="#f5b31c"><rect x="18.6" y="6.6" width="4.4" height="2.8"/></g>',

  /** 油田型の温泉(豊富)。褐色の湯と、掘削のやぐら。 */
  onsen_oil:
    '<rect x="0.6" y="20.8" width="22.8" height="3.2" fill="#7a7468"/>' +
    '<path d="M2.2,12.4h19.6l-1.6,8.4H3.8z" fill="#c8c2b4"/>' +
    '<path d="M3.4,14h17.2l-1.2,5.6H4.6z" fill="#8a6238"/>' +
    '<path d="M3.4,14h17.2l-0.4,1.6H3.8z" fill="#6b4a28"/>' +
    '<g fill="#a87a4a" opacity="0.9"><ellipse cx="8.4" cy="17.4" rx="2.4" ry="0.9"/><ellipse cx="15.4" cy="18" rx="2" ry="0.8"/></g>' +
    '<g stroke="#e8eef4" stroke-width="1.3" stroke-linecap="round" fill="none">' +
    '<path d="M7,11.4q-1.6,-2 0,-4t0,-4"/><path d="M12,11.4q-1.6,-2.4 0,-4.6t0,-4.4"/><path d="M17,11.4q-1.6,-2 0,-4t0,-4"/></g>' +
    '<path d="M18.4,12.4L19.6,4.6h1.4l1.2,7.8z" fill="#4a4f58"/>' +
    '<g stroke="#4a4f58" stroke-width="0.8" fill="none"><path d="M19.2,7.4h2.6M18.9,9.6h3.2"/></g>' +
    '<rect x="1" y="12.4" width="22" height="1.6" fill="#a8a294"/>',

  /** 黒い蕎麦(音威子府)。せいろに盛った、殻ごと挽いた黒い麺。 */
  soba:
    '<rect x="0.6" y="21.4" width="22.8" height="2.6" fill="#8a7a5f"/>' +
    '<path d="M1.4,21.4V13h21.2v8.4z" fill="#a87a4a"/>' +
    '<path d="M1.4,13h21.2v2.4H1.4z" fill="#c89a62"/>' +
    '<g stroke="#8a6238" stroke-width="0.8" fill="none"><path d="M1.4,18.4h21.2M6.6,13v8.4M17.4,13v8.4"/></g>' +
    '<ellipse cx="12" cy="12.4" rx="9.6" ry="3.6" fill="#c89a62"/>' +
    '<ellipse cx="12" cy="11.6" rx="8" ry="2.8" fill="#3a3228"/>' +
    '<g stroke="#5f5348" stroke-width="1" stroke-linecap="round" fill="none">' +
    '<path d="M5.6,11.6q3,-2.6 6.4,-1.4M8.4,13.2q3.4,-2.4 7.2,-1.8M12.4,10.4q3,-1.4 5.8,0.4M6.8,13q2.4,-1 4.6,-0.2"/></g>' +
    '<g fill="#e0dcd0"><rect x="16.4" y="5.6" width="1.2" height="6.4" transform="rotate(14 17 9)"/>' +
    '<rect x="18.6" y="5.6" width="1.2" height="6.4" transform="rotate(14 19.2 9)"/></g>' +
    '<path d="M3.4,9.4h4.4l-0.6,2.2H4z" fill="#3f5f7a"/>',

  /** 厳寒(名寄)。雪の結晶と、下がりきった寒暖計。 */
  snowflake_cold:
    '<rect x="0.6" y="20.6" width="22.8" height="3.4" fill="#dee8f0"/>' +
    '<g stroke="#5b8fe8" stroke-width="1.5" stroke-linecap="round" fill="none">' +
    '<path d="M8.6,3.4v15.4M2,7.4l13.2,7.6M15.2,7.4L2,15"/>' +
    '<path d="M8.6,6.4l-2.4,-2M8.6,6.4l2.4,-2M8.6,15.8l-2.4,2M8.6,15.8l2.4,2"/>' +
    '<path d="M4.8,9.6L4,6.8M4.8,9.6l-2.8,0.6M12.4,12.6l0.8,2.8M12.4,12.6l2.8,-0.6"/>' +
    '<path d="M4.8,12.6L2,12M4.8,12.6L4,15.4M12.4,9.6l2.8,0.6M12.4,9.6l0.8,-2.8"/></g>' +
    '<circle cx="8.6" cy="11.1" r="1.4" fill="#e8f2fc"/>' +
    '<rect x="18.2" y="1.4" width="3.6" height="15" rx="1.8" fill="#f0ece0"/>' +
    '<circle cx="20" cy="19.4" r="3.6" fill="#e8443f"/>' +
    '<rect x="19.2" y="12.4" width="1.6" height="7" fill="#e8443f"/>' +
    '<g stroke="#8a8578" stroke-width="0.8" fill="none"><path d="M18.2,4h1.4M18.2,6.4h1.4M18.2,8.8h1.4M18.2,11.2h1.4"/></g>' +
    '<circle cx="20" cy="19.4" r="1.4" fill="#a82f2c"/>',

  /** 酒蔵(増毛)。軒に吊るした杉玉と、蔵の白壁。 */
  sakebrewery:
    '<rect x="0.6" y="21.4" width="22.8" height="2.6" fill="#7a7468"/>' +
    '<rect x="2.2" y="9.4" width="19.6" height="12" fill="#f0ece0"/>' +
    '<path d="M0.8,9.4h22.4l-2.6,-3.4H3.4z" fill="#4a4f58"/>' +
    '<rect x="0.8" y="9.4" width="22.4" height="1.6" fill="#3a3f47"/>' +
    '<g fill="#6b5a44"><rect x="2.2" y="19" width="19.6" height="2.4"/><rect x="2.2" y="9.4" width="1.8" height="9.6"/><rect x="20" y="9.4" width="1.8" height="9.6"/></g>' +
    '<rect x="4.4" y="14.4" width="4.4" height="4.6" fill="#3a3228"/>' +
    '<rect x="15.2" y="14.4" width="4.4" height="4.6" fill="#3a3228"/>' +
    '<circle cx="12" cy="14.4" r="4.4" fill="#8a9a52"/>' +
    '<circle cx="12" cy="14.4" r="4.4" fill="none" stroke="#6b7a3a" stroke-width="1.4"/>' +
    '<g fill="#a8b862"><circle cx="10.4" cy="12.8" r="1.5"/><circle cx="13.6" cy="13.6" r="1.4"/><circle cx="11.4" cy="16.2" r="1.3"/></g>' +
    '<rect x="11.4" y="10" width="1.2" height="1.6" fill="#6b5a44"/>' +
    '<path d="M4.6,4.6h6.2v1.4H4.6z" fill="#8a6a44"/>',

  /** 海鳥(羽幌)。ウトウ。嘴の上の角と、白い頬の飾り羽。 */
  seabird:
    '<rect x="0.6" y="20.4" width="22.8" height="3.6" fill="#2f6a8f"/>' +
    '<g stroke="#7fb8d0" stroke-width="1" fill="none"><path d="M1.4,22.4h6.4M14.6,23h7.6"/></g>' +
    '<path d="M6.6,20.4q-3.2,-3 -3.2,-7.4q0,-6 6.6,-6q6.4,0 6.4,6.6q0,4.4 -2.8,6.8z" fill="#3a3f47"/>' +
    '<path d="M6.6,20.4q-3.2,-3 -3.2,-7.4q0,-4.4 3.6,-5.6q-1.2,2.2 -1.2,5.6q0,4.2 2,7.4z" fill="#4f545c"/>' +
    '<path d="M13.6,12.4q3.6,1.4 5.4,5.6q-3,-1 -5.6,-2.6z" fill="#3a3f47"/>' +
    '<ellipse cx="9.8" cy="9" rx="4.4" ry="4" fill="#2f343c"/>' +
    '<path d="M13.6,8.4l6.4,1.6 -6,2z" fill="#f5b31c"/>' +
    '<path d="M14.2,7.6q1.6,-2.4 2.6,-0.2q-1.2,0.6 -2.6,0.2z" fill="#e8843c"/>' +
    '<g stroke="#f4f2ec" stroke-width="0.9" stroke-linecap="round" fill="none"><path d="M11.6,7.4l4,-2.4M11.2,10.6l3.4,2.4"/></g>' +
    '<circle cx="11.6" cy="8.6" r="1" fill="#f4f2ec"/>' +
    '<circle cx="11.7" cy="8.6" r="0.5" fill="#2a2620"/>',

  /** 林業(下川)。積まれた丸太と、そばに立つトドマツ。 */
  forestry:
    '<rect x="0.6" y="21" width="22.8" height="3" fill="#6b5f48"/>' +
    '<rect x="17.6" y="18.4" width="1.8" height="3" fill="#4a3a28"/>' +
    '<path d="M18.4,12.6L13.6,20.4h9.6z" fill="#28402f"/>' +
    '<path d="M18.4,7.4L14.4,14.4h8z" fill="#2f5240"/>' +
    '<path d="M18.4,2.6L15.4,8.6h6z" fill="#28402f"/>' +
    '<g fill="#a87a4a"><rect x="0.8" y="10.4" width="13.4" height="10.6" rx="1"/></g>' +
    '<g fill="#c89a62"><circle cx="3.2" cy="13" r="2.4"/><circle cx="8" cy="13" r="2.4"/><circle cx="12.8" cy="13" r="2.4"/>' +
    '<circle cx="5.6" cy="18" r="2.4"/><circle cx="10.4" cy="18" r="2.4"/></g>' +
    '<g fill="none" stroke="#a87a4a" stroke-width="0.9"><circle cx="3.2" cy="13" r="1.1"/><circle cx="8" cy="13" r="1.1"/><circle cx="12.8" cy="13" r="1.1"/>' +
    '<circle cx="5.6" cy="18" r="1.1"/><circle cx="10.4" cy="18" r="1.1"/></g>' +
    '<g fill="#6b5a44"><rect x="0.6" y="20.4" width="14" height="1.6"/><rect x="0.6" y="9.4" width="1.4" height="11.4"/><rect x="13.4" y="9.4" width="1.4" height="11.4"/></g>',

  /** 鍾乳洞(中頓別)。丘の下の洞口と、垂れる石筍。 */
  cave:
    '<path d="M0.6,24V9.4q0,-8 11.4,-8t11.4,8V24z" fill="#7a7060"/>' +
    '<path d="M0.6,24V9.4q0,-6.4 7.4,-7.6q-3.4,2.6 -3.4,7.6V24z" fill="#8f8674"/>' +
    '<g fill="#5f8f4f"><ellipse cx="4.4" cy="3.4" rx="3.4" ry="1.6"/><ellipse cx="12" cy="1.6" rx="4.4" ry="1.8"/><ellipse cx="19.6" cy="3.6" rx="3.4" ry="1.6"/></g>' +
    '<path d="M5.4,24v-6.6q0,-6.6 6.6,-6.6t6.6,6.6V24z" fill="#2a2620"/>' +
    '<path d="M7.2,24v-6.4q0,-4.8 4.8,-4.8t4.8,4.8V24z" fill="#1a1814"/>' +
    '<g fill="#c8bca8"><path d="M8.4,12.6l1,4.4 1,-4.8z"/><path d="M11.6,11.6l1.2,5.4 1.2,-5.2z"/><path d="M14.8,13.4l1,3.6 0.9,-4z"/></g>' +
    '<g fill="#b0a48c"><path d="M8.6,24l1.2,-4.4 1.1,4.4z"/><path d="M12.8,24l1,-3.4 1,3.4z"/></g>' +
    '<g fill="#f5b31c"><circle cx="12" cy="19.4" r="1.2" opacity="0.8"/></g>' +
    '<path d="M0.6,22.4h5v1.6h-5zM18.4,22.4h5v1.6h-5z" fill="#6b6250"/>',

  /** 花咲がに(根室)。棘の多い甲羅と太い鋏。 */
  crab:
    '<rect x="0.6" y="20.6" width="22.8" height="3.4" fill="#8a8578"/>' +
    '<g stroke="#c0453c" stroke-width="1.8" stroke-linecap="round" fill="none">' +
    '<path d="M6.4,15.4L2.6,19M8,17.4l-2.4,4M16,17.4l2.4,4M17.6,15.4L21.4,19"/></g>' +
    '<path d="M4.6,12.4q0,-6.4 7.4,-6.4t7.4,6.4q0,5.4 -7.4,5.4t-7.4,-5.4z" fill="#e8443f"/>' +
    '<path d="M4.6,12.4q0,-6.4 7.4,-6.4q-3.6,1.6 -3.6,6.4q0,3.8 2.4,5.2q-6.2,-0.6 -6.2,-5.2z" fill="#f0685f"/>' +
    '<g fill="#c0453c"><path d="M4.8,10l-2.4,-1.4 2.8,-0.4z"/><path d="M19.2,10l2.4,-1.4 -2.8,-0.4z"/>' +
    '<path d="M7.4,7l-1.4,-2.6 2.6,1.4z"/><path d="M16.6,7l1.4,-2.6 -2.6,1.4z"/><path d="M12,5.8l-0.6,-3 1.8,2.8z"/></g>' +
    '<g fill="#e8443f"><path d="M6.2,8.4L2.4,3.4l1.8,-1 3,4.6z"/><path d="M17.8,8.4l3.8,-5 -1.8,-1 -3,4.6z"/></g>' +
    '<g fill="#c0453c"><path d="M2.6,4.4l-2,-2.6 3.4,0.4 0.6,2.6z"/><path d="M21.4,4.4l2,-2.6 -3.4,0.4 -0.6,2.6z"/></g>' +
    '<g fill="#3a2620"><circle cx="9.6" cy="10.6" r="1.1"/><circle cx="14.4" cy="10.6" r="1.1"/></g>' +
    '<g fill="#c0453c"><circle cx="8.4" cy="13.6" r="0.8"/><circle cx="12" cy="14.6" r="0.8"/><circle cx="15.6" cy="13.6" r="0.8"/></g>',

  /** カルデラ湖(弟子屈)。切り立った外輪山の環と、深い青の水。 */
  calderalake:
    '<rect x="0.6" y="21" width="22.8" height="3" fill="#6b7060"/>' +
    '<path d="M0.8,17.4L7,4.4h10l6.2,13z" fill="#5f6b62"/>' +
    '<path d="M0.8,17.4L7,4.4h2.6L4.4,17.4z" fill="#74806f"/>' +
    '<ellipse cx="12" cy="15.6" rx="11.2" ry="5.4" fill="#4a5450"/>' +
    '<ellipse cx="12" cy="15.4" rx="9" ry="4.2" fill="#2f5f8f"/>' +
    '<ellipse cx="12" cy="15" rx="6.6" ry="2.8" fill="#1f4470"/>' +
    '<g stroke="#7fb8d0" stroke-width="0.9" opacity="0.8" fill="none"><path d="M7,15.6h4.4M13.4,17h5M9,17.6h2.6"/></g>' +
    '<path d="M4.4,7.4q7.6,-4.4 15.2,0l-1,2.2q-6.6,-3.6 -13.2,0z" fill="#eef4fa" opacity="0.9"/>' +
    '<g stroke="#4a5450" stroke-width="0.9" fill="none"><path d="M8.6,5.4L6.4,11.4M15.6,5.4l2,5.8M12,4.4v6.4"/></g>' +
    '<g fill="#e8eef4" opacity="0.55"><ellipse cx="17.6" cy="12" rx="4.4" ry="1.6"/></g>',

  /** 牡蠣(厚岸)。**殻を開けた横顔**——浅い下殻に身、上殻は蝶番から起こす。 */
  oyster:
    '<rect x="0.6" y="20.4" width="22.8" height="3.6" fill="#3f7f9a"/>' +
    '<g stroke="#7fb8d0" stroke-width="1" fill="none"><path d="M1.4,22.4h6M15,23h7.4"/></g>' +
    '<g transform="rotate(-27 3.4 12.4)">' +
    '<path d="M3.4,12.4q3.4,-5.4 10.4,-5.4q7.4,0 9.6,5.4q-3.4,2.6 -9.6,2.6q-7,0 -10.4,-2.6z" fill="#b0a48c"/>' +
    '<g stroke="#8f8674" stroke-width="0.8" fill="none"><path d="M4,11.4q6.4,-3 13.4,-2.6M4.6,12.8q7,-2.4 14.6,-1.6M6.4,9.6q4.4,-1.4 8.6,-1.2"/></g>' +
    '</g>' +
    '<path d="M2.6,16q3.4,-4.4 10.4,-4.4q7.6,0 9.8,4.4q-3.2,4.6 -9.8,4.6q-7.2,0 -10.4,-4.6z" fill="#cfc4ae"/>' +
    '<path d="M2.6,16q3.4,-4.4 10.4,-4.4q-5.4,1.6 -7,4.6q-1.6,3 -0.6,4.2q-1.6,-1.6 -2.8,-4.4z" fill="#e0d8c4"/>' +
    '<g stroke="#a89880" stroke-width="0.8" fill="none"><path d="M4.4,15q6.4,-2.6 14.4,-1.4M5,17.6q7,-2.6 15.4,-1.4M6.6,19.4q6.4,-2 12.4,-1.4"/></g>' +
    '<ellipse cx="13.6" cy="16.4" rx="6.4" ry="2.8" fill="#f0e4d0"/>' +
    '<ellipse cx="12.6" cy="16" rx="4.2" ry="1.8" fill="#e8cfae"/>' +
    '<path d="M9.6,17.4q3.6,-2.4 8,-1" stroke="#c8a888" stroke-width="0.9" fill="none"/>' +
    '<circle cx="16" cy="15.6" r="0.9" fill="#c89060"/>' +
    '<path d="M2.6,16.4l-1.8,-1.2 1.2,-1.6z" fill="#8f8674"/>',

  /** 鮭(標津)。遡上する秋の鮭。婚姻色の帯を入れる。 */
  salmon:
    '<rect x="0.6" y="19.4" width="22.8" height="4.6" fill="#3f6f8f"/>' +
    '<g stroke="#7fb8d0" stroke-width="1" fill="none"><path d="M1.4,21.4h7M13,22.6h9"/></g>' +
    '<path d="M2.4,12.4q5.6,-6.4 13.4,-4.4q4.4,1.2 6.2,4.4q-1.8,3.4 -6.2,4.6q-7.8,2 -13.4,-4.6z" fill="#6b8a9a"/>' +
    '<path d="M2.4,12.4q5.6,-6.4 13.4,-4.4q-6.6,0.6 -10.4,6.6q-2,-1 -3,-2.2z" fill="#8fa8b4"/>' +
    '<path d="M5.4,12.8q6.4,-3.4 15.4,-1.6l0.6,2q-9,-1.6 -15.2,1.6z" fill="#c85a3c"/>' +
    '<path d="M2.4,12.4L-0.2,7.4l1.4,-0.4 3.4,4z" fill="#5f7a88"/>' +
    '<path d="M2.2,12.6l-2.4,4.8 1.6,0.4 3,-3.8z" fill="#5f7a88"/>' +
    '<path d="M11.4,8.2l-1.4,-3.4 4.4,2.6z" fill="#5f7a88"/>' +
    '<path d="M12,16.6l1.4,3.4 -4.4,-2.6z" fill="#5f7a88"/>' +
    '<path d="M19.4,10.4q3,1 4,2.2q-1.4,1.4 -4.4,2.2z" fill="#4f6a78"/>' +
    '<circle cx="19.6" cy="11.6" r="1.1" fill="#f4f2ec"/>' +
    '<circle cx="19.7" cy="11.6" r="0.6" fill="#2a2620"/>',

  /**
   * 羅臼昆布(羅臼)。**束ではなく一枚。**幅の広い一葉に、売り物の紙帯を巻く。
   * 19pxで「棚に干した細い筋」は読めなかったので、一枚を大きく寝かせた。
   */
  kelp:
    '<rect x="0.6" y="20.4" width="22.8" height="3.6" fill="#3f6f8f"/>' +
    '<g stroke="#7fb8d0" stroke-width="1" fill="none"><path d="M1.4,22.4h6.4M15,23h7.4"/></g>' +
    '<rect x="0.6" y="0.6" width="22.8" height="20.4" fill="#3f6f8f"/>' +
    '<g stroke="#7fb8d0" stroke-width="0.9" opacity="0.6" fill="none"><path d="M1.6,3.4h5.4M16,5.4h6M2.4,17h4"/></g>' +
    '<path d="M7.4,21q-3.6,-5 -2.2,-10.4q1.4,-5.4 -1.2,-9.4l4.4,-0.6q2.6,4.6 1.2,10q-1.4,5.4 1.4,10.4z" fill="#3f3a26"/>' +
    '<path d="M7.4,21q-3.6,-5 -2.2,-10.4q1.4,-5.4 -1.2,-9.4l1.6,-0.2q2.6,4.4 1.2,9.8q-1.4,5.4 1,10.2z" fill="#5f5636"/>' +
    '<path d="M15,21q-4.2,-4.6 -3,-10q1.2,-5.4 -1.6,-9.6l4,-0.8q2.8,4.6 1.6,10q-1.2,5.4 2.4,10.4z" fill="#4a4430"/>' +
    '<path d="M19.8,21q-3.4,-4.2 -2.4,-8.6q1,-4.4 -1,-7.8l2.8,-0.6q2,3.6 1,8q-1,4.4 2.4,9z" fill="#2f2a1c"/>' +
    '<g stroke="#241f14" stroke-width="0.7" opacity="0.85" fill="none">' +
    '<path d="M6.4,2.4q2.2,4.6 0.8,9.4q-1.2,4.2 0.6,8.4M13,2.6q2.4,4.4 1.2,9.2q-1.2,4.4 1,8.6M19,5.6q1.8,3.4 0.8,7.2q-1,3.8 1.2,7.6"/></g>' +
    '<g fill="#8a7a5f"><path d="M3.4,0.6h6.4v1.8H3.4z"/><path d="M10.6,0.6h5.4v1.8h-5.4z"/><path d="M16.8,4.2h5.4v1.8h-5.4z"/></g>' +
    '<rect x="0.6" y="0.6" width="22.8" height="1.4" fill="#6b5f48"/>',

  /** ギター(足寄)。フォークの木のギター。くびれと棹で「ギター」に見せる。 */
  guitar:
    '<rect x="0.6" y="21.6" width="22.8" height="2.4" fill="#6b5f48"/>' +
    '<path d="M11.4,7.4q3.4,0 4.2,3q0.5,1.9 -0.2,2.9q-0.8,1.1 -0.3,2.6q1.1,3.2 -0.9,5.1q-2,1.9 -5,1q-3.2,-1 -3.8,-4.2q-0.4,-2.2 0.5,-3.4q0.7,-1 0.2,-2.3q-1,-2.7 0.9,-4.1q1.6,-1.2 4.4,-0.6z" fill="#c89a62"/>' +
    '<path d="M11.4,7.4q1.6,0 2.6,0.7q-2.4,0.1 -3.6,1.6q-1.4,1.8 -0.6,3.9q0.5,1.3 -0.2,2.3q-0.9,1.2 -0.5,3.4q0.4,2.2 2,3.4q-2.7,-0.6 -3.5,-3.7q-0.5,-2.2 0.4,-3.4q0.7,-1 0.2,-2.3q-1,-2.7 0.9,-4.1q0.9,-0.7 2.3,-0.8z" fill="#dcb07a"/>' +
    '<path d="M8.6,17.6q3,-1.6 6.4,-0.4" stroke="#a87a4a" stroke-width="0.8" fill="none"/>' +
    '<circle cx="11.4" cy="12.6" r="2.4" fill="#5f4630"/>' +
    '<circle cx="11.4" cy="12.6" r="2.4" fill="none" stroke="#8a6238" stroke-width="0.7"/>' +
    '<rect x="8.6" y="18.4" width="6.4" height="1.5" rx="0.4" fill="#4a3a28"/>' +
    '<path d="M12.6,7.6L16.6,1.4l2.2,1.4 -4,6.2z" fill="#8a6238"/>' +
    '<path d="M16.6,1.4l1.4,-2.2 3.4,2.2 -1.6,2.4z" fill="#5f4630"/>' +
    '<g stroke="#4a3a28" stroke-width="0.6" fill="none"><path d="M14,5.6l2.4,1.5M15.2,3.8l2.4,1.5"/></g>' +
    '<g stroke="#f0ece0" stroke-width="0.5" fill="none"><path d="M13.4,8.2L17,2.6M14.2,8.7L17.8,3.1"/></g>' +
    '<g stroke="#e0dcd0" stroke-width="0.5" fill="none"><path d="M10.4,18.8L13,9M11.8,18.9L14,9.4"/></g>' +
    '<g fill="#c8c4b8"><circle cx="19.4" cy="0.9" r="0.8"/><circle cx="21" cy="1.9" r="0.8"/></g>',

  /** タンチョウ(鶴居)。白い体・黒い風切羽・赤い頭頂。 */
  crane:
    '<rect x="0.6" y="21" width="22.8" height="3" fill="#8a9a5f"/>' +
    '<g stroke="#8a7a5f" stroke-width="1.1" fill="none"><path d="M1.4,22.4h6M15,23h7"/></g>' +
    '<g stroke="#2a2620" stroke-width="1.4" stroke-linecap="round" fill="none"><path d="M9.2,16.4v5M12.4,16.4v5"/></g>' +
    '<ellipse cx="11" cy="13.6" rx="7.4" ry="4.2" fill="#f4f8fc"/>' +
    '<path d="M4.4,12q-2.6,0.4 -4,2.4q2.6,1.4 4.8,1.2z" fill="#2a2620"/>' +
    '<path d="M6.4,16.4q3.4,1.6 7.4,0.4q-2,2.4 -5,2.2q-2,-0.6 -2.4,-2.6z" fill="#2a2620"/>' +
    '<path d="M15.4,11.6q1.4,-1.4 1.6,-3.6l1.6,-6.6 2.4,0.6 -1.8,6.6q-0.6,3 -2.4,4.4z" fill="#f4f8fc"/>' +
    '<path d="M17.8,4.4l2.6,0.6 -0.6,2.4 -2.6,-0.6z" fill="#2a2620"/>' +
    '<path d="M19.6,1.4l2.4,0.6 -0.4,1.6 -2.4,-0.6z" fill="#e8443f"/>' +
    '<path d="M21.4,2.6l2.6,-1.4 -2.2,2.4z" fill="#f5b31c"/>' +
    '<circle cx="20.6" cy="3.4" r="0.6" fill="#2a2620"/>',
};

