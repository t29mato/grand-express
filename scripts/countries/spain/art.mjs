/**
 * スペインの都市イラスト。
 *
 * `SPAIN_MARKS` は24×24の座標系に描くシンボル、`SPAIN_BG` は400×210の
 * 座標系に描く背景シーン(いずれもSVG断片の文字列)。韓国・フランスと同じく
 * 最初から文字列として持つ。動きは含めない(アニメーションはReact側で重ねる)。
 *
 * この盤面の主題は**同じ国の中で土地ごとに色がまったく違う**こと。
 * 18種の背景を同じ色調でまとめない。土地ごとの基調:
 *
 *   メセタ(中央高原)  赤茶けた土 #b0703c・麦 #d9b25a・白く暑い空
 *   アンダルシア        白い漆喰 #f6efe2・オリーブの銀緑 #8fa06a・濃い影
 *   北岸(バスク・ガリシア) 緑 #5f8a4a・灰色の海 #4f7a8e・低い雲
 *   地中海岸            乾いた岩 #c9a877・松 #3f6f4a・青 #2f6ea8
 *   ピレネー・シエラ    岩 #8b8f98・雪 #f2f6f8
 *
 * 共通色は他の盤面と揃える: 顔・白 #f6efe2、強調 #f5b31c/#e8443f/#5b8fe8。
 * アル=アンダルスの装飾は azulejo の青 #2f6ea8・馬蹄形アーチの朱 #b5482f で出す。
 *
 * 鍵は `cities.mjs` の `mark` / `bg` と一対一で対応する(mark 20種・bg 18種)。
 * 増やすときは両方を揃えること。
 *
 * **背景SVGの中央25%(x=151〜249 / y=54〜152)は都市シンボルに隠れて
 * 見えない。** 見せたい細部は左右3分の1と手前(y>170)に置く。
 * `sky()` は必ず第3引数(次に来る塗りの開始y)を渡すこと。渡し忘れると
 * 空と地面のあいだに塗り残しの帯ができる。
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

function clouds(cx, cy, scale = 1, fill = "#f6efe2", opacity = 0.8) {
  const e = (dx, rx, ry) =>
    `<ellipse cx="${r1(cx + dx * scale)}" cy="${cy}" rx="${r1(rx * scale)}" ry="${r1(ry * scale)}"/>`;
  return `<g opacity="${opacity}" fill="${fill}">${e(0, 18, 7)}${e(-10, 11, 5.5)}${e(11, 13, 5.5)}</g>`;
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

/** かもめ。 */
function gull(x, y, scale = 1) {
  const w = 8 * scale;
  return `<path d="M${r1(x - w)},${y}q${r1(w / 2)},-6 ${w},0q${r1(w / 2)},-6 ${w},0" fill="none" stroke="#4a4a52" stroke-width="1.4"/>`;
}

/** 糸杉。アンダルシアの庭園と巡礼路の目印。細く高い。 */
function cypress(x, base, h, fill = "#2f5f3f") {
  const w = r1(h * 0.28);
  return (
    `<rect x="${r1(x - 1.5)}" y="${r1(base - 6)}" width="3" height="6" fill="#5a4630"/>` +
    `<path d="M${x},${r1(base - h)}C${r1(x + w)},${r1(base - h * 0.72)} ${r1(x + w)},${r1(base - h * 0.28)} ${x},${r1(base - 5)}C${r1(x - w)},${r1(base - h * 0.28)} ${r1(x - w)},${r1(base - h * 0.72)} ${x},${r1(base - h)}z" fill="${fill}"/>`
  );
}

/** 傘松(ピノ・ピニョネロ)。ローマ遺跡と地中海岸の木。平たく広い笠を2層。 */
function umbrellaPine(x, base, h, fill = "#3f6f4a") {
  const w = r1(h * 1.5);
  return (
    `<path d="M${r1(x - 2.5)},${base}L${r1(x - 1)},${r1(base - h * 0.55)}L${r1(x + 2)},${r1(base - h * 0.55)}L${r1(x + 3.5)},${base}z" fill="#6b5330"/>` +
    `<path d="M${r1(x + 1)},${r1(base - h * 0.4)}L${r1(x + w * 0.2)},${r1(base - h * 0.6)}" stroke="#6b5330" stroke-width="2.5"/>` +
    `<path d="M${r1(x - w / 2)},${r1(base - h * 0.62)}Q${x},${r1(base - h * 1.18)} ${r1(x + w / 2)},${r1(base - h * 0.62)}Q${r1(x + w * 0.24)},${r1(base - h * 0.72)} ${x},${r1(base - h * 0.7)}Q${r1(x - w * 0.24)},${r1(base - h * 0.72)} ${r1(x - w / 2)},${r1(base - h * 0.62)}z" fill="${fill}"/>` +
    `<path d="M${r1(x - w * 0.3)},${r1(base - h * 0.74)}Q${x},${r1(base - h * 1.06)} ${r1(x + w * 0.3)},${r1(base - h * 0.74)}z" fill="#4f8a5f" opacity=".85"/>`
  );
}

/** 常緑カシ(エンシーナ)。メセタとデエサの木。低く丸い。 */
function holmOak(x, base, r, crown = "#5f7a42") {
  return (
    `<rect x="${r1(x - r * 0.14)}" y="${r1(base - r * 1.1)}" width="${r1(r * 0.28)}" height="${r1(r * 1.1)}" fill="#5a4630"/>` +
    `<g fill="${crown}"><circle cx="${r1(x - r * 0.5)}" cy="${r1(base - r * 1.2)}" r="${r1(r * 0.62)}"/><circle cx="${r1(x + r * 0.5)}" cy="${r1(base - r * 1.2)}" r="${r1(r * 0.62)}"/><circle cx="${x}" cy="${r1(base - r * 1.55)}" r="${r1(r * 0.7)}"/></g>`
  );
}

/** オリーブの木。銀緑の丸い樹冠、ねじれた幹。 */
function oliveTree(x, base, r, crown = "#8fa06a") {
  return (
    `<path d="M${r1(x - 2)},${base}q3,-${r1(r * 0.6)} -1,-${r1(r * 1.1)}h4q-2,${r1(r * 0.5)} 1,${r1(r * 1.1)}z" fill="#6b5330"/>` +
    `<g fill="${crown}"><circle cx="${r1(x - r * 0.45)}" cy="${r1(base - r * 1.25)}" r="${r1(r * 0.55)}"/><circle cx="${r1(x + r * 0.45)}" cy="${r1(base - r * 1.2)}" r="${r1(r * 0.5)}"/><circle cx="${x}" cy="${r1(base - r * 1.5)}" r="${r1(r * 0.6)}"/></g>`
  );
}

/** ラ・マンチャの白い風車。円筒の胴・黒い円錐屋根・十字の羽根。 */
function windmill(x, base, h, sailStroke = 2) {
  const bw = r1(h * 0.42);
  const capY = r1(base - h);
  const hubY = r1(capY + h * 0.1);
  const s = r1(h * 0.5);
  return (
    `<path d="M${r1(x - bw / 2)},${base}L${r1(x - bw * 0.38)},${capY}h${r1(bw * 0.76)}L${r1(x + bw / 2)},${base}z" fill="#f6efe2"/>` +
    `<path d="M${r1(x - bw * 0.44)},${capY}Q${x},${r1(capY - h * 0.22)} ${r1(x + bw * 0.44)},${capY}z" fill="#4a4a52"/>` +
    `<rect x="${r1(x - bw * 0.12)}" y="${r1(base - h * 0.28)}" width="${r1(bw * 0.24)}" height="${r1(h * 0.28)}" fill="#4a4436"/>` +
    `<g stroke="#6b5330" stroke-width="${sailStroke}"><path d="M${r1(x - s * 0.85)},${r1(hubY - s * 0.85)}L${r1(x + s * 0.85)},${r1(hubY + s * 0.85)}M${r1(x - s * 0.85)},${r1(hubY + s * 0.85)}L${r1(x + s * 0.85)},${r1(hubY - s * 0.85)}"/></g>` +
    `<g fill="#e8dcc0" opacity=".9"><path d="M${r1(x - s * 0.85)},${r1(hubY - s * 0.85)}l${r1(s * 0.3)},-2l${r1(s * 0.42)},${r1(s * 0.42)}l-${r1(s * 0.3)},2z"/><path d="M${r1(x + s * 0.85)},${r1(hubY + s * 0.85)}l-${r1(s * 0.3)},2l-${r1(s * 0.42)},-${r1(s * 0.42)}l${r1(s * 0.3)},-2z"/></g>` +
    `<circle cx="${x}" cy="${hubY}" r="2.4" fill="#4a4a52"/>`
  );
}

/** 畑の畝・刈り跡の横線。 */
function furrows(x, y, w, rows, gap, color, width = 2, opacity = 0.55) {
  const parts = [];
  for (let i = 0; i < rows; i++) {
    parts.push(`<path d="M${x},${r1(y + i * gap)}h${w}"/>`);
  }
  return `<g stroke="${color}" stroke-width="${width}" opacity="${opacity}" fill="none">${parts.join("")}</g>`;
}

/** 刈り株の短い縦線を散らす。 */
function stubble(x0, y0, cols, gap, color = "#8f5a30") {
  const parts = [];
  for (let i = 0; i < cols; i++) {
    const x = r1(x0 + i * gap + (i % 3) * 2);
    const y = r1(y0 + (i % 4) * 3);
    parts.push(`<path d="M${x},${y}v5"/>`);
  }
  return `<g stroke="${color}" stroke-width="1.6" opacity=".7">${parts.join("")}</g>`;
}

/** ひなげし(アマポーラ)。麦畑の縁に散る赤。 */
function poppies(spots) {
  const parts = spots.map(
    ([x, y]) =>
      `<circle cx="${x}" cy="${y}" r="3" fill="#e8443f"/><circle cx="${x}" cy="${y}" r="1" fill="#241a10"/>`,
  );
  return `<g>${parts.join("")}</g>`;
}

/** 波の反射線・水面。 */
function ripples(y, color = "#bfe8f4") {
  return `<g stroke="${color}" stroke-width="2" opacity=".7" fill="none"><path d="M26,${y}h74M176,${y + 12}h92M108,${y + 24}h62"/></g>`;
}

/** 起重機(港のクレーン)。塔にラチスの筋交い、腕に控え索と巻き上げ索を入れる。 */
function crane(x, base, h, fill = "#e8443f") {
  const jib = r1(h * 0.72);
  const topY = r1(base - h);
  return (
    // 台座と塔
    `<rect x="${r1(x - 6)}" y="${r1(base - 6)}" width="12" height="6" fill="#4a4a52"/>` +
    `<rect x="${r1(x - 3)}" y="${topY}" width="6" height="${h}" fill="${fill}"/>` +
    `<path d="M${r1(x - 3)},${r1(base - h * 0.25)}l6,-${r1(h * 0.22)}m0,${r1(h * 0.22)}l-6,-${r1(h * 0.22)}M${r1(x - 3)},${r1(base - h * 0.7)}l6,-${r1(h * 0.22)}m0,${r1(h * 0.22)}l-6,-${r1(h * 0.22)}" stroke="#4a4a52" stroke-width="1.4" fill="none" opacity=".6"/>` +
    // 腕と釣り合い腕
    `<rect x="${r1(x - h * 0.2)}" y="${topY}" width="${r1(jib + h * 0.2)}" height="4" fill="${fill}"/>` +
    `<rect x="${r1(x - h * 0.2)}" y="${r1(topY + 4)}" width="${r1(h * 0.1)}" height="7" fill="#4a4a52"/>` +
    // 控え索(塔頂から腕先へ)
    `<path d="M${x},${r1(topY - 7)}L${r1(x + jib)},${r1(topY + 2)}M${x},${r1(topY - 7)}L${r1(x - h * 0.18)},${r1(topY + 2)}" stroke="${fill}" stroke-width="1.4" fill="none"/>` +
    `<rect x="${r1(x - 2)}" y="${r1(topY - 8)}" width="4" height="8" fill="${fill}"/>` +
    // 巻き上げ索とフック
    `<line x1="${r1(x + jib - 4)}" y1="${r1(topY + 4)}" x2="${r1(x + jib - 4)}" y2="${r1(base - h * 0.5)}" stroke="#4a4a52" stroke-width="1.6"/>` +
    `<path d="M${r1(x + jib - 4)},${r1(base - h * 0.5)}q4,3 0,6" stroke="#4a4a52" stroke-width="2" fill="none"/>`
  );
}

/**
 * ガレリア(ガラス張りの白いバルコニー)。ア・コルーニャなど北の港の顔。
 * ただの窓格子ではなく、**白い木枠のガラス張りが層になって石壁から張り出す**。
 * 各層: 張り出した白い箱 + 細かい縦桟のガラス + 層の下の影。
 */
function galeria(x, y, w, h, roof = "#c9773f") {
  const parts = [
    // 奥の石壁(張り出しの根元)
    `<rect x="${r1(x + 3)}" y="${y}" width="${r1(w - 6)}" height="${h}" fill="#c8bda8"/>`,
    // 屋根
    `<path d="M${r1(x - 3)},${y}h${r1(w + 6)}l-4,-8h${r1(-(w - 2))}z" fill="${roof}"/>`,
  ];
  const floorH = 20;
  const rows = Math.floor(h / floorH);
  for (let f = 0; f < rows; f++) {
    const fy = r1(y + f * floorH);
    const bh = floorH - 4;
    // 張り出す白い木枠の箱
    parts.push(`<rect x="${x}" y="${fy}" width="${w}" height="${bh}" fill="#f6efe2"/>`);
    // ガラス面(縦桟で細かく割る)
    parts.push(`<rect x="${r1(x + 2)}" y="${r1(fy + 3)}" width="${r1(w - 4)}" height="${bh - 7}" fill="#a8ccd8"/>`);
    const panes = Math.floor((w - 4) / 6);
    const muls = [];
    for (let p = 1; p < panes; p++) {
      muls.push(`M${r1(x + 2 + (p * (w - 4)) / panes)},${r1(fy + 3)}v${bh - 7}`);
    }
    parts.push(`<path d="${muls.join("")}" stroke="#f6efe2" stroke-width="1.6" fill="none"/>`);
    // 層の下端の影(張り出しが落とす)
    parts.push(`<rect x="${x}" y="${r1(fy + bh)}" width="${w}" height="3" fill="#b8ac94"/>`);
  }
  return parts.join("");
}

/** 漁船。船体に舷側の縞、小さな操舵室とマスト。 */
function fishingBoat(x, y, w, hull = "#2f6ea8", stripe = "#e8443f") {
  const h = r1(w * 0.22);
  return (
    `<path d="M${x},${y}h${w}l-${r1(w * 0.16)},${h}h-${r1(w * 0.66)}z" fill="${hull}"/>` +
    `<rect x="${x}" y="${y}" width="${w}" height="${r1(h * 0.28)}" fill="${stripe}"/>` +
    `<rect x="${r1(x + w * 0.56)}" y="${r1(y - h * 0.9)}" width="${r1(w * 0.22)}" height="${r1(h * 0.9)}" fill="#f6efe2"/>` +
    `<rect x="${r1(x + w * 0.6)}" y="${r1(y - h * 0.65)}" width="${r1(w * 0.09)}" height="${r1(h * 0.4)}" fill="#20364a"/>` +
    `<rect x="${r1(x + w * 0.3)}" y="${r1(y - h * 1.7)}" width="2" height="${r1(h * 1.7)}" fill="#5a4630"/>`
  );
}

/**
 * 馬蹄形アーチ。アル=アンダルスの建築の核。開口が半円より深く、
 * 迫石(ヴサール)が朱と生成りで交互に並ぶ。
 */
function horseshoeArch(x, base, r, pier = "#e8dcc0", inner = "#5a3a2a") {
  const cy = r1(base - r * 1.5);
  const R = r * 1.32;
  // 迫石の輪は全周ではなく、起拱線(中心より少し下)までの扇環。
  // 全周にすると浮き輪に見える。
  const lim = 105; // 垂直から±105度
  const pt = (deg, rad) => {
    const a = (deg * Math.PI) / 180;
    return `${r1(x + rad * Math.sin(a))},${r1(cy - rad * Math.cos(a))}`;
  };
  const parts = [
    `<path d="M${pt(-lim, R)}A${r1(R)},${r1(R)} 0 1 1 ${pt(lim, R)}L${pt(lim, r * 0.94)}A${r1(r * 0.94)},${r1(r * 0.94)} 0 1 0 ${pt(-lim, r * 0.94)}z" fill="#b5482f"/>`,
    // 迫石の縞(生成りの扇形を重ねて交互に見せる)
    ...[-70, -35, 0, 35, 70].map((deg) => {
      const a0 = ((deg - 8) * Math.PI) / 180;
      const a1 = ((deg + 8) * Math.PI) / 180;
      return `<path d="M${x},${cy}L${r1(x + R * Math.sin(a0))},${r1(cy - R * Math.cos(a0))}A${r1(R)},${r1(R)} 0 0 1 ${r1(x + R * Math.sin(a1))},${r1(cy - R * Math.cos(a1))}z" fill="${pier}"/>`;
    }),
    // 開口(馬蹄形: 半円より下へ絞る)
    `<path d="M${r1(x - r)},${cy}A${r},${r} 0 1 1 ${r1(x + r)},${cy}L${r1(x + r * 0.82)},${base}H${r1(x - r * 0.82)}z" fill="${inner}"/>`,
    // 柱と柱頭
    `<rect x="${r1(x - r * 1.14)}" y="${r1(cy + r * 0.34)}" width="${r1(r * 0.34)}" height="${r1(base - cy - r * 0.34)}" fill="${pier}"/>`,
    `<rect x="${r1(x + r * 0.8)}" y="${r1(cy + r * 0.34)}" width="${r1(r * 0.34)}" height="${r1(base - cy - r * 0.34)}" fill="${pier}"/>`,
    `<rect x="${r1(x - r * 1.2)}" y="${r1(cy + r * 0.34)}" width="${r1(r * 0.46)}" height="4" fill="#d0c3a4"/>`,
    `<rect x="${r1(x + r * 0.74)}" y="${r1(cy + r * 0.34)}" width="${r1(r * 0.46)}" height="4" fill="#d0c3a4"/>`,
  ];
  return parts.join("");
}

/** セビージャ焼きのタイル腰壁。菱形の幾何学模様を並べる。 */
function zellige(x, y, w, h, colors = ["#2f6ea8", "#f4c430", "#3f8f6f"]) {
  const parts = [`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#f6efe2"/>`];
  const step = 14;
  const n = Math.floor(w / step);
  for (let i = 0; i < n; i++) {
    const cx = r1(x + step / 2 + i * step);
    const cy = r1(y + h / 2);
    const c = colors[i % colors.length];
    parts.push(
      `<path d="M${cx},${r1(cy - h * 0.36)}L${r1(cx + step * 0.32)},${cy}L${cx},${r1(cy + h * 0.36)}L${r1(cx - step * 0.32)},${cy}z" fill="${c}"/>`,
    );
  }
  parts.push(
    `<rect x="${x}" y="${y}" width="${w}" height="2" fill="#2f6ea8"/>`,
    `<rect x="${x}" y="${r1(y + h - 2)}" width="${w}" height="2" fill="#2f6ea8"/>`,
  );
  return parts.join("");
}

/** オレンジの木。中庭と川辺の並木。 */
function orangeTree(x, base, r) {
  const parts = [
    `<rect x="${r1(x - r * 0.12)}" y="${r1(base - r * 1.2)}" width="${r1(r * 0.24)}" height="${r1(r * 1.2)}" fill="#5a4630"/>`,
    `<circle cx="${x}" cy="${r1(base - r * 1.6)}" r="${r}" fill="#3f7f3f"/>`,
  ];
  const dots = [
    [-0.4, -0.3],
    [0.35, -0.5],
    [0.05, 0.3],
    [-0.25, 0.55],
    [0.5, 0.15],
  ];
  for (const [dx, dy] of dots) {
    parts.push(`<circle cx="${r1(x + dx * r)}" cy="${r1(base - r * 1.6 + dy * r)}" r="${r1(r * 0.18)}" fill="#f4941c"/>`);
  }
  return parts.join("");
}

/** 丸い樹冠の広葉樹。dots を渡すと実(りんご・オレンジ)を散らす。 */
function roundTree(x, base, r, crown = "#3f8f4f", trunk = "#6b5330", dots = 0, dotFill = "#e8443f") {
  const th = r1(r * 1.1);
  const parts = [
    `<rect x="${r1(x - r * 0.16)}" y="${r1(base - th - r * 0.3)}" width="${r1(r * 0.32)}" height="${r1(th + r * 0.3)}" fill="${trunk}"/>`,
    `<circle cx="${x}" cy="${r1(base - th - r * 0.5)}" r="${r}" fill="${crown}"/>`,
  ];
  const spots = [
    [-0.45, -0.25],
    [0.4, -0.45],
    [0, 0.35],
    [0.5, 0.2],
    [-0.2, 0.55],
  ];
  for (let i = 0; i < dots && i < spots.length; i++) {
    parts.push(
      `<circle cx="${r1(x + spots[i][0] * r)}" cy="${r1(base - th - r * 0.5 + spots[i][1] * r)}" r="${r1(r * 0.2)}" fill="${dotFill}"/>`,
    );
  }
  return parts.join("");
}

/**
 * 石のアーチの連なり(水道橋・闘技場)。開口には空の色を入れて
 * 「向こうが透けて見える」ようにする。
 */
function arcade(x0, x1, base, h, stone = "#c9b18a", through = "#cfe4f0") {
  const step = 34;
  const parts = [`<rect x="${x0}" y="${r1(base - h)}" width="${r1(x1 - x0)}" height="${h}" fill="${stone}"/>`];
  for (let x = x0 + 6; x + step - 12 <= x1; x += step) {
    const w = step - 12;
    const r = w / 2;
    parts.push(
      `<path d="M${x},${base}v-${r1(h * 0.55 - r)}a${r},${r} 0 0 1 ${w},0v${r1(h * 0.55 - r)}z" fill="${through}"/>`,
    );
  }
  parts.push(`<rect x="${x0}" y="${r1(base - h)}" width="${r1(x1 - x0)}" height="4" fill="#b0966e"/>`);
  return parts.join("");
}

/** 稜堡壁。半円塔と胸壁の歯形(メルロン)が並ぶ市壁。 */
function rampartWall(x0, x1, base, h, towers = [], stone = "#9a9184", dark = "#847d70") {
  const parts = [
    `<rect x="${x0}" y="${r1(base - h)}" width="${r1(x1 - x0)}" height="${h}" fill="${stone}"/>`,
  ];
  // 胸壁の歯形
  for (let x = x0 + 4; x + 10 <= x1; x += 18) {
    parts.push(`<rect x="${x}" y="${r1(base - h - 7)}" width="10" height="7" fill="${stone}"/>`);
  }
  // 半円塔(壁より一段高い)
  for (const tx of towers) {
    const tw = 24;
    const th = h + 18;
    parts.push(
      `<path d="M${r1(tx - tw / 2)},${base}v-${r1(th - tw / 2)}a${tw / 2},${tw / 2} 0 0 1 ${tw},0v${r1(th - tw / 2)}z" fill="${dark}"/>`,
      `<rect x="${r1(tx - tw / 2 + 3)}" y="${r1(base - th - 4)}" width="6" height="7" fill="${dark}"/>`,
      `<rect x="${r1(tx + tw / 2 - 9)}" y="${r1(base - th - 4)}" width="6" height="7" fill="${dark}"/>`,
      `<rect x="${r1(tx - 2.5)}" y="${r1(base - th + 8)}" width="5" height="8" rx="2.5" fill="#4a4436"/>`,
    );
  }
  return parts.join("");
}

/** コウノトリと小枝の巣。塔や鐘楼の上に載せる。 */
function storkNest(x, y) {
  return (
    // 巣(小枝の皿)
    `<ellipse cx="${x}" cy="${y}" rx="13" ry="4.5" fill="#8a6a44"/>` +
    `<path d="M${r1(x - 11)},${r1(y + 1)}h22M${r1(x - 8)},${r1(y - 2)}h16" stroke="#6b5330" stroke-width="1.6"/>` +
    // 体(白い胴・黒い風切)
    `<ellipse cx="${r1(x - 1)}" cy="${r1(y - 12)}" rx="8" ry="5.5" fill="#f6efe2"/>` +
    `<path d="M${r1(x - 9)},${r1(y - 12)}q-3,4 1,6q4,2 8,0z" fill="#241a10"/>` +
    // 首と頭・赤いくちばし
    `<path d="M${r1(x + 5)},${r1(y - 14)}q5,-3 5,-9" stroke="#f6efe2" stroke-width="3.5" fill="none"/>` +
    `<circle cx="${r1(x + 10)}" cy="${r1(y - 24)}" r="3" fill="#f6efe2"/>` +
    `<path d="M${r1(x + 12)},${r1(y - 24)}l8,1.5l-8,1.5z" fill="#e8443f"/>` +
    `<circle cx="${r1(x + 10)}" cy="${r1(y - 25)}" r="1" fill="#241a10"/>` +
    // 脚
    `<path d="M${r1(x - 2)},${r1(y - 7)}v6M${r1(x + 2)},${r1(y - 7)}v6" stroke="#e8443f" stroke-width="1.6"/>`
  );
}

/** 放牧の牛(白黒でなく北スペインの栗色)。 */
function cow(x, base, s = 1, hide = "#a8683f") {
  return (
    `<g transform="translate(${x},${base}) scale(${s})">` +
    `<rect x="-14" y="-16" width="28" height="12" rx="5" fill="${hide}"/>` +
    `<rect x="-12" y="-6" width="4" height="6" fill="${hide}"/><rect x="8" y="-6" width="4" height="6" fill="${hide}"/>` +
    `<circle cx="16" cy="-16" r="6" fill="${hide}"/>` +
    `<path d="M12,-20l-2,-4M20,-20l2,-4" stroke="#e8dcc0" stroke-width="2" fill="none" stroke-linecap="round"/>` +
    `<circle cx="18" cy="-17" r="1.1" fill="#241a10"/>` +
    `<path d="M-14,-12q-4,1 -3,5" stroke="${hide}" stroke-width="2" fill="none"/>` +
    `</g>`
  );
}

/** オレオ(アストゥリアスの高床の穀物倉)。石の脚4本の上に木の小屋。 */
function horreo(x, base, w) {
  const h = r1(w * 0.52);
  const legH = r1(w * 0.28);
  return (
    `<g fill="#9a9184"><rect x="${r1(x - w * 0.4)}" y="${r1(base - legH)}" width="5" height="${legH}"/><rect x="${r1(x + w * 0.4 - 5)}" y="${r1(base - legH)}" width="5" height="${legH}"/><rect x="${r1(x - w * 0.15)}" y="${r1(base - legH)}" width="5" height="${legH}"/><rect x="${r1(x + w * 0.15)}" y="${r1(base - legH)}" width="5" height="${legH}"/></g>` +
    `<rect x="${r1(x - w / 2)}" y="${r1(base - legH - 6)}" width="${w}" height="6" fill="#847d70"/>` +
    `<rect x="${r1(x - w * 0.44)}" y="${r1(base - legH - 6 - h)}" width="${r1(w * 0.88)}" height="${h}" fill="#8a5a3a"/>` +
    `<path d="M${r1(x - w * 0.44)},${r1(base - legH - 6 - h)}h${r1(w * 0.88)}v${r1(h * 0.3)}h-${r1(w * 0.88)}z" fill="#6e4630" opacity=".5"/>` +
    `<path d="M${r1(x - w * 0.56)},${r1(base - legH - 6 - h)}h${r1(w * 1.12)}l-${r1(w * 0.2)},-${r1(w * 0.22)}h-${r1(w * 0.72)}z" fill="#c9773f"/>`
  );
}

/** 小さな人物(遠景・中景用)。shirt/skin/hair を変えて使い回しを避ける。 */
function tinyPerson(x, base, s, shirt, skin = "#d9a273", hair = "#3a2a1e") {
  return (
    `<g transform="translate(${x},${base}) scale(${s})">` +
    `<rect x="-5" y="-10" width="4" height="10" fill="#20364a"/><rect x="1" y="-10" width="4" height="10" fill="#20364a"/>` +
    `<path d="M-6,-26h12l-1,17h-10z" fill="${shirt}"/>` +
    `<circle cx="0" cy="-32" r="7" fill="${skin}"/>` +
    `<path d="M-7,-34a7,7 0 0 1 14,0l0,1h-14z" fill="${hair}"/>` +
    `</g>`
  );
}

// ---------------------------------------------------------------------------
// 背景シーン(18種)。鍵は cities.mjs の `bg` と対応。
// ---------------------------------------------------------------------------

const SPAIN_BASE_BG = {
  /**
   * メセタ(中央高原)。マドリード・カンポ・デ・クリプターナ。
   * 赤茶けた土と刈り入れ後の麦、白く乾いた空、地平線の低い丘。
   * 左の尾根に白い風車を並べる(19世紀までここの日常の道具)。
   * 中央帯は畝の繰り返しだけにして、主役は左右へ。
   */
  "spain-meseta":
    sky("#a8cfe4", "#ecdfb4", 118) +
    sun(342, 36, 18, "#f6e6a8") +
    clouds(120, 30, 0.9, "#f6efe2", 0.65) +
    // 地平線の低い丘(乾いた土色)
    hills(118, "#c49a66", 5) +
    // 麦の帯 → 赤土の帯 → 手前の濃い土、の3段
    ground(118, "#d9b25a") +
    band(146, 34, "#b0703c") +
    band(180, 30, "#96562c") +
    // 尾根の風車(左に3基・右に1基。中央は空けておく)
    windmill(46, 116, 34) +
    windmill(86, 112, 42) +
    windmill(122, 116, 30) +
    windmill(356, 114, 36) +
    // 麦の刈り跡と畝
    stubble(8, 124, 16, 9, "#b08a3c") +
    stubble(258, 122, 16, 9, "#b08a3c") +
    furrows(0, 152, 400, 3, 9, "#8f5a30", 2, 0.5) +
    furrows(0, 184, 400, 3, 9, "#6b3f1e", 2.4, 0.55) +
    // 手前の常緑カシとひなげし(左右の端)
    holmOak(30, 208, 16) +
    holmOak(374, 206, 13) +
    poppies([[70, 196], [82, 202], [312, 198], [326, 204], [340, 196]]),

  /**
   * 大西洋の港。ア・コルーニャ・ビーゴ・サンタンデール・カルタヘナ・
   * マラガ・カディス・アリカンテ。灰色がかった海と低い雲、
   * 左にガレリア(ガラス張りの白いバルコニー)、右に起重機、手前に漁船。
   */
  "spain-atlantic-port":
    sky("#9fb8c8", "#dbe4e0", 108) +
    clouds(70, 30, 1.1, "#eef2f0", 0.85) +
    clouds(300, 44, 0.9, "#eef2f0", 0.7) +
    gull(120, 58, 1) +
    gull(146, 48, 0.8) +
    gull(330, 66, 1) +
    // 対岸の緑の岬(北の丘)
    `<path d="M250,108c30,-16 70,-20 150,-14v14z" fill="#5f8a5f"/>` +
    // 海
    ground(108, "#4f7a8e") +
    ripples(122, "#9fc4cc") +
    ripples(146, "#9fc4cc") +
    // 埠頭
    band(160, 14, "#8a8478") +
    `<g fill="#7a7468"><rect x="20" y="160" width="10" height="14"/><rect x="120" y="160" width="10" height="14"/><rect x="250" y="160" width="10" height="14"/><rect x="352" y="160" width="10" height="14"/></g>` +
    band(174, 36, "#9a9484") +
    // ガレリアの白い壁(左)
    galeria(10, 54, 58, 106) +
    galeria(74, 70, 46, 90, "#b5482f") +
    // 起重機と貨物(右)
    crane(322, 160, 62) +
    crane(360, 160, 44) +
    `<g fill="#5b8fe8"><rect x="296" y="146" width="26" height="14"/><rect x="326" y="152" width="20" height="8"/></g>` +
    // 手前の漁船(陸揚げ)と魚箱
    `<ellipse cx="196" cy="199" rx="52" ry="5" fill="#7a7468" opacity=".8"/>` +
    fishingBoat(150, 178, 90) +
    `<g fill="#e8dcc0"><rect x="40" y="182" width="22" height="9"/><rect x="46" y="172" width="22" height="9"/><rect x="70" y="182" width="22" height="9"/></g>` +
    `<g stroke="#b8ac94" stroke-width="1"><path d="M40,186h22M46,176h22M70,186h22"/></g>` +
    // 係船柱とロープ
    `<circle cx="120" cy="196" r="5" fill="#4a4a52"/>` +
    `<path d="M124,194q20,10 34,-6" stroke="#6b5330" stroke-width="2" fill="none"/>`,

  /**
   * アル=アンダルスの中庭。コルドバ・アルメリア。
   * 朱と生成りの馬蹄形二重アーチ、幾何学タイルの腰壁、糸杉、
   * 手前に水路。強い日差しの濃い影を落とす。
   */
  "spain-alandalus":
    sky("#8fc4e8", "#f0e2c0", 100) +
    sun(52, 34, 16, "#f6e6a8") +
    // 中庭の奥の壁。タイルの腰壁(全幅・繰り返しなので中央帯に置いてよい)を
    // 先に敷き、その上にアーケードを重ねる(逆にするとタイルがアーチの足元を切る)
    band(100, 70, "#f3ead6") +
    zellige(0, 156, 400, 18) +
    horseshoeArch(60, 170, 22) +
    horseshoeArch(140, 170, 22) +
    horseshoeArch(200, 170, 22) +
    horseshoeArch(260, 170, 22) +
    horseshoeArch(340, 170, 22) +
    // 壁の上端の歯形飾り(メルロン)
    `<g fill="#e0d3b8"><rect x="10" y="94" width="14" height="10"/><rect x="44" y="94" width="14" height="10"/><rect x="78" y="94" width="14" height="10"/><rect x="112" y="94" width="14" height="10"/><rect x="274" y="94" width="14" height="10"/><rect x="308" y="94" width="14" height="10"/><rect x="342" y="94" width="14" height="10"/><rect x="376" y="94" width="14" height="10"/></g>` +
    // 中庭の床(日なたと影)
    ground(174, "#e8d9b4") +
    `<path d="M0,174h400v10l-400,14z" fill="#c9a877" opacity=".7"/>` +
    // 水路(手前)
    band(192, 12, "#3f8fc4") +
    `<path d="M0,197h140M240,199h160" stroke="#bfe8f4" stroke-width="1.6" opacity=".8"/>` +
    `<rect x="0" y="190" width="400" height="3" fill="#d8cbb0"/>` +
    `<rect x="0" y="204" width="400" height="3" fill="#d8cbb0"/>` +
    // 糸杉とオレンジの木(左右)
    cypress(20, 192, 76) +
    cypress(388, 192, 66) +
    orangeTree(96, 192, 13) +
    orangeTree(310, 192, 12),

  /**
   * ローマ遺跡。セゴビア・メリダ・タラゴナ・オウレンセ。
   * 二層の石積みアーチが画面を貫き、開口から向こうの空が透ける。
   * 下に川、左右に傘松。金色がかった花崗岩。
   */
  "spain-roman-ruins":
    sky("#8fc4e8", "#cfe4f0", 112) +
    clouds(330, 30, 1) +
    hills(112, "#a8955f") +
    ground(112, "#b5a05f") +
    // 水道橋(上層は低く、下層は高い)
    arcade(0, 400, 118, 26, "#c9b18a", "#cfe4f0") +
    arcade(0, 400, 166, 48, "#bfa678", "#b5a05f") +
    // 石積みの目地
    `<g stroke="#a8906a" stroke-width="1.2" opacity=".6"><path d="M0,128h400M0,152h400M0,160h400"/></g>` +
    `<g stroke="#a8906a" stroke-width="1.2" opacity=".4"><path d="M20,122v6M90,122v6M160,122v6M230,122v6M300,122v6M370,122v6M40,154v6M110,154v6M180,154v6M250,154v6M320,154v6M390,154v6"/></g>` +
    // 川岸と川
    band(166, 14, "#9aae5f") +
    band(180, 30, "#3f7fae") +
    ripples(192, "#bfe8f4") +
    // 川の石と葦
    `<g fill="#9a9184"><ellipse cx="60" cy="206" rx="10" ry="4"/><ellipse cx="330" cy="204" rx="12" ry="4.5"/><ellipse cx="96" cy="202" rx="7" ry="3"/><ellipse cx="290" cy="207" rx="8" ry="3.5"/></g>` +
    `<g stroke="#7a9a4f" stroke-width="2" fill="none"><path d="M40,206v-14M46,207v-11M352,204v-13M358,206v-10M364,205v-12"/></g>` +
    `<g fill="#7a9a4f"><ellipse cx="40" cy="191" rx="1.6" ry="4"/><ellipse cx="352" cy="190" rx="1.6" ry="4"/></g>` +
    // 鴨の親子
    `<g fill="#5a4630"><ellipse cx="150" cy="196" rx="7" ry="4"/><circle cx="156" cy="192" r="3"/><ellipse cx="166" cy="199" rx="4" ry="2.5"/><ellipse cx="176" cy="197" rx="4" ry="2.5"/></g>` +
    `<path d="M159,192l4,1l-4,1z" fill="#f5b31c"/>` +
    `<path d="M140,204q8,3 20,1M162,206q8,2 18,0" stroke="#bfe8f4" stroke-width="1.4" fill="none" opacity=".6"/>` +
    // 傘松(左右)
    umbrellaPine(28, 180, 52) +
    umbrellaPine(374, 178, 46) +
    // アマツバメの群れ
    gull(120, 60, 0.9) +
    gull(300, 48, 1) +
    gull(140, 46, 0.6) +
    gull(268, 62, 0.7) +
    gull(330, 38, 0.6),

  /**
   * 丘の上の市壁。アビラ・ルーゴ・カセレス・トレド。
   * 半円塔の並ぶ石の壁、塔の上にコウノトリの巣、裾に乾いた麦畑。
   */
  "spain-ramparts":
    sky("#a8cfe4", "#e8dcae", 116) +
    sun(354, 40, 16, "#f6e6a8") +
    clouds(90, 32, 0.9, "#f6efe2", 0.6) +
    // 丘の土台(壁の裾の塗り残しを防ぐ下敷き)
    band(116, 44, "#b08a50") +
    // 壁の載る丘
    `<path d="M0,150Q100,108 200,112Q300,116 400,146V210H0z" fill="#b08a50"/>` +
    ground(150, "#d0aa54") +
    // 市壁(丘の稜線に沿わせて2段に見せる)
    rampartWall(0, 400, 132, 26, [40, 110, 300, 368]) +
    storkNest(40, 84) +
    // 城門(左寄り)
    `<path d="M66,132v-16a8,8 0 0 1 16,0v16z" fill="#4a4436"/>` +
    // 麦畑の畝と刈り株
    furrows(0, 168, 400, 4, 10, "#b08a3c", 2.2, 0.5) +
    stubble(20, 196, 14, 9, "#b08a3c") +
    stubble(250, 194, 14, 9, "#b08a3c") +
    oliveTree(30, 204, 13) +
    oliveTree(64, 210, 11) +
    holmOak(348, 208, 15) +
    poppies([[100, 200], [114, 206], [312, 202]]),

  /**
   * 大学の中庭。サラマンカ・アルカラ・デ・エナレス。
   * プラテレスコの砂岩ファサード(細かい彫刻の帯)と石畳、学生の群れ。
   */
  "spain-university":
    sky("#8fc4e8", "#cfe4f0", 60) +
    // 砂岩のファサード
    band(54, 100, "#d9b98a") +
    band(54, 8, "#c2a06a") +
    // 彫刻の帯(小さなアーチ形の壁龕とメダイヨンの繰り返し)
    `<g fill="#c2a06a">${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => `<path d="M${16 + i * 40},96v-12a6,6 0 0 1 12,0v12z"/>`).join("")}</g>` +
    `<g fill="#e8cfa0">${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => `<circle cx="${22 + i * 40}" cy="116" r="7"/>`).join("")}</g>` +
    `<g fill="#c2a06a">${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => `<circle cx="${22 + i * 40}" cy="116" r="3"/>`).join("")}</g>` +
    `<g stroke="#c2a06a" stroke-width="2"><path d="M0,102h400M0,130h400"/></g>` +
    // 正門(左寄り。二重の飾りアーチと付け柱)
    `<path d="M52,154v-30a18,18 0 0 1 36,0v30z" fill="#b5915f"/>` +
    `<path d="M58,154v-26a12,12 0 0 1 24,0v26z" fill="#4a4436"/>` +
    `<g fill="#c2a06a"><rect x="44" y="118" width="6" height="36"/><rect x="90" y="118" width="6" height="36"/></g>` +
    `<g fill="#e8cfa0"><rect x="42" y="114" width="10" height="5"/><rect x="88" y="114" width="10" height="5"/></g>` +
    `<circle cx="70" cy="106" r="9" fill="#e8cfa0"/><circle cx="70" cy="106" r="5" fill="#b5915f"/>` +
    gull(330, 40, 0.7) +
    gull(352, 32, 0.8) +
    // 石畳
    ground(154, "#b8ac94") +
    furrows(0, 168, 400, 4, 12, "#9a8f7c", 2, 0.6) +
    // 学生の群れ(左右の手前)
    tinyPerson(120, 208, 1.1, "#5b8fe8") +
    tinyPerson(140, 210, 1.15, "#e8443f", "#e8b88a", "#6e553c") +
    tinyPerson(296, 208, 1.1, "#3f8f6f", "#c98a5f", "#241a10") +
    tinyPerson(318, 210, 1.2, "#f5b31c", "#d9a273", "#6b3f1e") +
    `<rect x="128" y="182" width="9" height="7" rx="1" fill="#8a5a3a"/>` +
    `<rect x="306" y="184" width="9" height="7" rx="1" fill="#2f6ea8"/>`,

  /**
   * 峡谷の町。クエンカ・ロンダ。両岸の断崖と、崖の縁にせり出す家、
   * 谷を渡る橋。中央の帯は峡谷の空隙にする。
   */
  "spain-gorge":
    sky("#9fc4e0", "#d8cbb0", 58) +
    // 岩の全面(この上に川を彫る)
    ground(58, "#b08a6a") +
    // 峡谷の空隙と川
    `<path d="M168,58L150,210h100L232,58z" fill="#8a6a4f"/>` +
    `<path d="M186,58L176,210h48L214,58z" fill="#3f7fae"/>` +
    `<path d="M190,120q4,20 -2,40M210,140q-3,22 2,44" stroke="#bfe8f4" stroke-width="2" fill="none" opacity=".7"/>` +
    // 崖の縦の節理
    `<g stroke="#967252" stroke-width="3" opacity=".7"><path d="M40,70V190M84,64V196M128,60V204M272,60V204M318,66V196M362,72V188"/></g>` +
    `<g stroke="#c9a877" stroke-width="2" opacity=".5"><path d="M62,80V180M106,70V196M296,70V196M342,76V184"/></g>` +
    // 崖の縁の家並み(木のバルコニーが崖の上に張り出す)
    `<g><rect x="10" y="30" width="52" height="30" fill="#f6efe2"/><path d="M6,30h60l-5,-9H12z" fill="#c9773f"/><rect x="46" y="38" width="24" height="12" fill="#8a5a3a"/><path d="M46,50h24l3,4h-30z" fill="#6e4630"/><g fill="#5a3a2a"><rect x="16" y="38" width="8" height="10"/><rect x="30" y="38" width="8" height="10"/></g></g>` +
    `<g><rect x="66" y="38" width="40" height="22" fill="#e8dcc0"/><path d="M62,38h48l-5,-8H67z" fill="#b5602f"/><g fill="#5a3a2a"><rect x="72" y="44" width="7" height="9"/><rect x="86" y="44" width="7" height="9"/></g><rect x="96" y="46" width="18" height="10" fill="#8a5a3a"/><path d="M96,56h18l3,4h-22z" fill="#6e4630"/></g>` +
    `<g><rect x="316" y="34" width="56" height="26" fill="#e8dcc0"/><path d="M312,34h64l-6,-9h-52z" fill="#b5602f"/><rect x="306" y="40" width="22" height="11" fill="#8a5a3a"/><path d="M306,51h22l-3,4h-22z" fill="#6e4630"/><g fill="#5a3a2a"><rect x="340" y="42" width="8" height="9"/><rect x="354" y="42" width="8" height="9"/></g></g>` +
    `<g><rect x="278" y="40" width="36" height="20" fill="#f6efe2"/><path d="M274,40h44l-5,-8h-34z" fill="#c9773f"/><g fill="#5a3a2a"><rect x="284" y="46" width="7" height="8"/><rect x="298" y="46" width="7" height="8"/></g></g>` +
    // 崖の横の地層線
    `<g stroke="#967252" stroke-width="2" opacity=".5"><path d="M0,110h150M0,148h150M250,106h150M250,144h150"/></g>` +
    `<g stroke="#c9a877" stroke-width="1.6" opacity=".4"><path d="M0,128h150M250,124h150"/></g>` +
    // 谷を渡る石橋(欄干の柱を並べる)
    `<rect x="150" y="118" width="100" height="8" fill="#9a8f7c"/>` +
    `<path d="M164,126v10a14,14 0 0 1 28,0v-10zM208,126v10a14,14 0 0 1 28,0v-10z" fill="#847d70"/>` +
    `<g fill="#b0a894"><rect x="150" y="114" width="100" height="2"/>${[0, 1, 2, 3, 4, 5, 6].map((i) => `<rect x="${153 + i * 16}" y="114" width="3" height="4"/>`).join("")}</g>` +
    `<g stroke="#6e6658" stroke-width="1.6"><path d="M150,118h100"/></g>` +
    // 崖を舞うベニハシガラス
    gull(190, 90, 0.7) +
    gull(216, 76, 0.6) +
    // 崖のくぼみの窓(崖に掘られた家)
    `<g fill="#5a3a2a"><rect x="52" y="120" width="7" height="9" rx="3"/><rect x="96" y="132" width="7" height="9" rx="3"/><rect x="308" y="126" width="7" height="9" rx="3"/><rect x="350" y="136" width="7" height="9" rx="3"/></g>` +
    // 手前の岩棚と灌木
    `<path d="M0,190q60,-8 150,6L150,210H0z" fill="#967252"/>` +
    `<path d="M400,186q-70,-6 -152,8l2,16h150z" fill="#967252"/>` +
    `<g fill="#8a6a4f"><ellipse cx="120" cy="204" rx="8" ry="3"/><ellipse cx="286" cy="202" rx="7" ry="3"/></g>` +
    `<g stroke="#7a9a4f" stroke-width="2" fill="none"><path d="M70,202q5,-7 10,0M100,208q5,-7 10,0M320,204q5,-7 10,0M346,200q5,-7 10,0"/></g>` +
    holmOak(34, 208, 12, "#5f7a42") +
    holmOak(368, 206, 11, "#5f7a42"),

  /**
   * 大聖堂の町並み。ブルゴス・バリャドリッド・サラゴサ・ムルシア・レオン。
   * 瓦屋根の上に立つゴシックの尖塔とバラ窓、手前に川と石橋。
   */
  "spain-cathedral-skyline":
    sky("#9fc4e0", "#e0d6c0", 108) +
    clouds(320, 34, 1, "#f6efe2", 0.7) +
    gull(240, 52, 0.9) +
    gull(268, 42, 0.8) +
    // 瓦屋根の帯
    band(108, 52, "#c9885f") +
    `<g fill="#b5714a">${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<path d="M${i * 50},124l25,-12l25,12z"/>`).join("")}</g>` +
    `<g fill="#e8dcc0">${[0, 1, 2, 3].map((i) => `<rect x="${30 + i * 100}" y="128" width="10" height="14"/>`).join("")}</g>` +
    // 大聖堂(左)。双子の尖塔と透かしの帯、バラ窓
    `<rect x="46" y="60" width="18" height="70" fill="#c2ac8a"/>` +
    `<rect x="92" y="60" width="18" height="70" fill="#c2ac8a"/>` +
    `<path d="M46,60l9,-30l9,30zM92,60l9,-30l9,30z" fill="#b0966e"/>` +
    `<path d="M55,30v-8M101,30v-8" stroke="#b0966e" stroke-width="2"/>` +
    `<rect x="64" y="76" width="28" height="54" fill="#d0ba96"/>` +
    `<circle cx="78" cy="94" r="10" fill="#8a6a44"/><circle cx="78" cy="94" r="6" fill="#5b8fe8"/>` +
    `<g stroke="#d0ba96" stroke-width="1.6"><path d="M78,88v12M72,94h12M74,90l8,8M82,90l-8,8"/></g>` +
    `<path d="M64,76h28l-14,-10z" fill="#b0966e"/>` +
    `<g fill="#8a6a44"><path d="M50,116v-10a4,4 0 0 1 8,0v10zM96,116v-10a4,4 0 0 1 8,0v10z"/></g>` +
    // ムデハルの塔(右。彩釉タイルの菱形)
    `<rect x="330" y="66" width="24" height="64" fill="#c9885f"/>` +
    `<g fill="#3f8f6f"><path d="M336,80l6,5l-6,5l-6,-5zM348,80l6,5l-6,5l-6,-5z"/></g>` +
    `<g fill="#f6efe2"><path d="M336,98l6,5l-6,5l-6,-5zM348,98l6,5l-6,5l-6,-5z"/></g>` +
    `<path d="M326,66h32l-16,-12z" fill="#3f8f6f"/>` +
    // 川と石橋
    band(160, 12, "#9aae5f") +
    band(172, 38, "#4f7fa0") +
    ripples(186, "#bfe8f4") +
    `<rect x="0" y="166" width="400" height="7" fill="#9a8f7c"/>` +
    `<g fill="#847d70"><path d="M30,173v8a12,12 0 0 1 24,0v-8zM130,173v8a12,12 0 0 1 24,0v-8zM230,173v8a12,12 0 0 1 24,0v-8zM330,173v8a12,12 0 0 1 24,0v-8z"/></g>` +
    // 橋の欄干
    `<g fill="#b0a894"><rect x="0" y="162" width="400" height="2"/>${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => `<rect x="${8 + i * 31}" y="162" width="3" height="5"/>`).join("")}</g>` +
    // 煙突と屋根窓の列
    `<g fill="#a85a3a">${[0, 1, 2, 3, 4].map((i) => `<rect x="${58 + i * 82}" y="112" width="6" height="10"/>`).join("")}</g>` +
    `<g fill="#8a6a44">${[0, 1, 2, 3].map((i) => `<rect x="${66 + i * 96}" y="146" width="8" height="9"/>`).join("")}</g>` +
    // ムデハルの塔のコウノトリの巣(この土地の春の風物。遠景なので縮める)
    `<g transform="translate(342,52) scale(0.55)">${storkNest(0, 0)}</g>` +
    `<path d="M42,196a12,5 0 0 0 24,0M142,198a12,5 0 0 0 24,0M342,196a12,5 0 0 0 24,0" stroke="#bfe8f4" stroke-width="1.6" fill="none" opacity=".6"/>` +
    `<path d="M60,180h60M240,184h70M120,192h50" stroke="#7fa8c4" stroke-width="1.6" opacity=".5"/>`,

  /**
   * エイシャンプレ。バルセロナ専用。45度に角を切った街区の建物、
   * 鉄のバルコニー、路面電車の架線、大通りの奥に海。
   */
  "spain-eixample":
    sky("#8fc4e8", "#cfe4f0", 100) +
    sun(200, 30, 12, "#f6e6a8") +
    // 大通りの奥の海と、海へ下る通りの遠景
    band(100, 12, "#2f6ea8") +
    `<path d="M150,104h100" stroke="#bfe8f4" stroke-width="1.6" opacity=".8"/>` +
    band(112, 48, "#c8bda8") +
    // 遠景の街路樹の列(大通りの奥)
    roundTree(168, 150, 8, "#7fae5a") +
    roundTree(232, 150, 8, "#7fae5a") +
    roundTree(184, 158, 9, "#6f9a52") +
    roundTree(216, 158, 9, "#6f9a52") +
    `<rect x="150" y="112" width="100" height="3" fill="#e8dcc0" opacity=".7"/>` +
    // 左の角切り街区(正面+45度の面)
    `<path d="M0,44H96V160H0z" fill="#d9c1a0"/>` +
    `<path d="M96,44L150,64V160H96z" fill="#c2a879"/>` +
    `<rect x="0" y="44" width="96" height="6" fill="#b08a5c"/>` +
    `<path d="M96,44l54,20v6l-54,-20z" fill="#a87e50"/>` +
    // 窓とバルコニー(正面)
    `<g fill="#5a4a38">${[0, 1, 2].map((r) => [0, 1, 2].map((c) => `<rect x="${14 + c * 28}" y="${62 + r * 30}" width="14" height="20"/>`).join("")).join("")}</g>` +
    `<g stroke="#4a4a52" stroke-width="1.6" fill="none">${[0, 1, 2].map((r) => [0, 1, 2].map((c) => `<path d="M${11 + c * 28},${82 + r * 30}h20M${11 + c * 28},${82 + r * 30}v-6m20,6v-6"/>`).join("")).join("")}</g>` +
    // 窓(45度の面)
    `<g fill="#4a3d2e">${[0, 1, 2].map((r) => [0, 1].map((c) => `<path d="M${106 + c * 22},${68 + r * 30}l12,4v20l-12,-4z"/>`).join("")).join("")}</g>` +
    // 右の角切り街区(対称)
    `<path d="M400,44H304V160h96z" fill="#e0cdb0"/>` +
    `<path d="M304,44L250,64V160h54z" fill="#c9b18a"/>` +
    `<rect x="304" y="44" width="96" height="6" fill="#b8946a"/>` +
    `<path d="M304,44l-54,20v6l54,-20z" fill="#a87e50"/>` +
    `<g fill="#5a4a38">${[0, 1, 2].map((r) => [0, 1, 2].map((c) => `<rect x="${318 + c * 28}" y="${62 + r * 30}" width="14" height="20"/>`).join("")).join("")}</g>` +
    `<g stroke="#4a4a52" stroke-width="1.6" fill="none">${[0, 1, 2].map((r) => [0, 1, 2].map((c) => `<path d="M${315 + c * 28},${82 + r * 30}h20M${315 + c * 28},${82 + r * 30}v-6m20,6v-6"/>`).join("")).join("")}</g>` +
    `<g fill="#4a3d2e">${[0, 1, 2].map((r) => [0, 1].map((c) => `<path d="M${294 - c * 22},${68 + r * 30}l-12,4v20l12,-4z"/>`).join("")).join("")}</g>` +
    // モデルニスモの屋上飾り(左角)
    `<path d="M20,44q10,-14 20,0z" fill="#3f8f6f"/><circle cx="30" cy="30" r="4" fill="#f5b31c"/>` +
    // 路面電車の架線
    `<g stroke="#4a4a52" stroke-width="1.2" opacity=".8" fill="none"><path d="M0,56Q200,70 400,56M150,64L250,64"/></g>` +
    `<path d="M196,64v-6M204,64v-6" stroke="#4a4a52" stroke-width="1.2"/>` +
    // 大通りと軌道
    ground(160, "#9a9484") +
    `<g stroke="#7a7468" stroke-width="3"><path d="M172,160L120,210M228,160L280,210"/></g>` +
    `<g fill="#e8dcc0"><path d="M60,180h50l-8,8H50zM290,180h50l-10,8h-50z"/></g>` +
    // 街路樹(プラタナス)
    roundTree(30, 210, 17, "#7fae5a") +
    roundTree(372, 208, 16, "#7fae5a") +
    tinyPerson(160, 206, 1.05, "#e8443f", "#e8b88a", "#241a10") +
    tinyPerson(248, 208, 1.1, "#2f6ea8"),

  /**
   * 旧市街の路地。ヘローナ・ビトリア・ヘレス・バレンシア・テルエル。
   * 石のアーケードと、花で飾られたバルコニー。路地の奥は明るく抜く。
   */
  "spain-old-quarter":
    sky("#8fc4e8", "#f0e2c0", 56) +
    // 突き当たりの明るい壁と鐘楼
    band(50, 120, "#e8d9b4") +
    `<rect x="184" y="64" width="32" height="70" fill="#d9b98a"/>` +
    `<path d="M184,64h32l-16,-14z" fill="#b5602f"/>` +
    `<path d="M192,96v-8a8,8 0 0 1 16,0v8z" fill="#5a4436"/>` +
    // 左の建物(石。アーケード)
    `<path d="M0,20h150V210H0z" fill="#c9b18a"/>` +
    `<g fill="#5a4a38"><path d="M14,170v-26a14,14 0 0 1 28,0v26zM66,170v-26a14,14 0 0 1 28,0v26zM118,170v-26a14,14 0 0 1 28,0v26z"/></g>` +
    `<g fill="#b0966e"><rect x="42" y="144" width="8" height="26"/><rect x="94" y="144" width="8" height="26"/></g>` +
    // 左のバルコニー(鉄柵とゼラニウム)
    `<g><rect x="18" y="86" width="30" height="22" fill="#8a6a4f"/><g stroke="#4a4a52" stroke-width="1.6" fill="none"><path d="M14,108h38M18,108v-8M26,108v-8M34,108v-8M42,108v-8M48,108v-8"/></g><g fill="#e8443f"><circle cx="20" cy="99" r="3.5"/><circle cx="28" cy="101" r="3.5"/><circle cx="44" cy="99" r="3.5"/></g><g fill="#3f8f4f"><circle cx="24" cy="103" r="2.5"/><circle cx="40" cy="103" r="2.5"/></g></g>` +
    `<g><rect x="86" y="52" width="30" height="22" fill="#8a6a4f"/><g stroke="#4a4a52" stroke-width="1.6" fill="none"><path d="M82,74h38M86,74v-8M94,74v-8M102,74v-8M110,74v-8M116,74v-8"/></g><g fill="#e8443f"><circle cx="90" cy="65" r="3.5"/><circle cx="106" cy="67" r="3.5"/></g></g>` +
    // 右の建物(白壁)
    `<path d="M400,26H252V210h148z" fill="#f3ead6"/>` +
    `<g fill="#5a4a38"><rect x="286" y="140" width="22" height="30"/><rect x="340" y="140" width="22" height="30"/></g>` +
    `<g><rect x="284" y="80" width="30" height="22" fill="#8a6a4f"/><g stroke="#4a4a52" stroke-width="1.6" fill="none"><path d="M280,102h38M284,102v-8M292,102v-8M300,102v-8M308,102v-8M314,102v-8"/></g><g fill="#e8443f"><circle cx="288" cy="93" r="3.5"/><circle cx="304" cy="95" r="3.5"/></g></g>` +
    `<g><rect x="338" y="48" width="30" height="22" fill="#8a6a4f"/><g stroke="#4a4a52" stroke-width="1.6" fill="none"><path d="M334,70h38M338,70v-8M346,70v-8M354,70v-8M362,70v-8M368,70v-8"/></g><g fill="#f5b31c"><circle cx="342" cy="61" r="3.5"/><circle cx="358" cy="63" r="3.5"/></g></g>` +
    // 壁のランタン(両側)
    `<path d="M150,60h14" stroke="#4a4a52" stroke-width="2"/>` +
    `<rect x="160" y="60" width="8" height="12" rx="2" fill="#f5b31c" stroke="#4a4a52" stroke-width="1.6"/>` +
    `<path d="M252,72h-14" stroke="#4a4a52" stroke-width="2"/>` +
    `<rect x="234" y="72" width="8" height="12" rx="2" fill="#f5b31c" stroke="#4a4a52" stroke-width="1.6"/>` +
    // 建物のあいだに渡した洗濯ロープ
    `<path d="M150,36q50,10 102,-2" stroke="#6b5330" stroke-width="1.6" fill="none"/>` +
    `<g><rect x="176" y="40" width="10" height="14" fill="#f5b31c"/><rect x="194" y="42" width="13" height="12" fill="#f6efe2"/><rect x="218" y="39" width="9" height="13" fill="#e8a0b0"/></g>` +
    // 戸口の植木鉢
    `<g><rect x="230" y="180" width="10" height="8" fill="#c9773f"/><circle cx="235" cy="176" r="5" fill="#3f8f4f"/><circle cx="233" cy="173" r="2" fill="#e8443f"/></g>` +
    `<g><rect x="160" y="184" width="10" height="8" fill="#c9773f"/><circle cx="165" cy="180" r="5" fill="#3f8f4f"/><circle cx="167" cy="177" r="2" fill="#f5b31c"/></g>` +
    // 石畳の路地(丸石を散らす)
    ground(170, "#b8ac94") +
    `<path d="M150,170L120,210h160l-30,-40z" fill="#c8bda8"/>` +
    `<g stroke="#9a8f7c" stroke-width="1.6" opacity=".7"><path d="M150,182h100M140,194h124M128,206h146"/></g>` +
    `<g stroke="#9a8f7c" stroke-width="1.6" opacity=".5"><path d="M20,182h90M30,196h84M290,184h88M282,198h92"/></g>` +
    `<g fill="#a89a84" opacity=".8"><ellipse cx="160" cy="188" rx="6" ry="2.5"/><ellipse cx="200" cy="200" rx="7" ry="3"/><ellipse cx="240" cy="190" rx="6" ry="2.5"/><ellipse cx="60" cy="190" rx="6" ry="2.5"/><ellipse cx="330" cy="192" rx="6" ry="2.5"/><ellipse cx="184" cy="176" rx="5" ry="2"/></g>` +
    // 路地の猫
    `<g fill="#4a4a52"><ellipse cx="292" cy="204" rx="9" ry="5"/><circle cx="300" cy="198" r="4"/><path d="M297,195l2,-4l2,4zM301,195l2,-4l2,4z"/><path d="M283,204q-5,-2 -4,-7" stroke="#4a4a52" stroke-width="2" fill="none"/></g>`,

  /**
   * 奇抜な現代建築の美術館。フィゲラス・ビルバオ。
   * 波打つ金属の量塊が川辺に建つ。手前に遊歩道と見物の二人。
   */
  "spain-landmark-museum":
    sky("#9fb8c8", "#dfe4e0", 118) +
    clouds(60, 36, 1, "#eef2f0", 0.8) +
    gull(320, 50, 1) +
    // 対岸の丘
    `<path d="M0,118Q80,96 180,112L400,118v4H0z" fill="#5f8a5f"/>` +
    ground(118, "#8a9a94") +
    // 川
    band(160, 50, "#4f7a8e") +
    ripples(176, "#9fc4cc") +
    // 金属の量塊(曲面を重ねる)
    `<path d="M60,152Q80,70 150,86Q210,98 232,80Q290,60 320,110Q334,140 340,152z" fill="#b8c4cc"/>` +
    `<path d="M92,152Q120,92 180,108Q160,124 168,152z" fill="#9aa8b4"/>` +
    `<path d="M232,152Q240,96 300,104Q312,124 306,152z" fill="#dfe8ee"/>` +
    `<path d="M150,86Q170,96 168,120" stroke="#eef2f4" stroke-width="3" fill="none"/>` +
    `<path d="M280,84Q296,100 298,124" stroke="#8a98a4" stroke-width="3" fill="none"/>` +
    // チタン板の継ぎ目
    `<g stroke="#a4b2bc" stroke-width="1.4" fill="none" opacity=".8"><path d="M100,140Q118,100 150,96M118,148Q130,116 158,108M250,120Q264,100 288,98M262,140Q272,118 296,112"/></g>` +
    // 川面への映り込み
    `<g fill="#8aa4b0" opacity=".5"><path d="M120,162q40,10 100,6l-6,10q-50,4 -88,-6z"/><path d="M250,164q30,6 60,2l-4,8q-28,4 -52,-4z"/></g>` +
    // ガラスのアトリウム
    `<g fill="#5b8fe8" opacity=".8"><rect x="122" y="128" width="10" height="24"/><rect x="136" y="122" width="10" height="30"/><rect x="252" y="126" width="10" height="26"/><rect x="266" y="130" width="8" height="22"/><rect x="112" y="134" width="8" height="18"/></g>` +
    `<g stroke="#3f6fae" stroke-width="1" opacity=".7"><path d="M122,136h10M136,132h10M252,134h10M136,142h10"/></g>` +
    gull(90, 84, 0.8) +
    gull(212, 60, 0.9) +
    clouds(300, 84, 0.7, "#eef2f0", 0.6) +
    // 赤いゲートの橋(ラ・サルベ橋のオマージュ)
    `<path d="M352,152v-44h14v44" stroke="#e8443f" stroke-width="6" fill="none"/>` +
    `<path d="M330,132h80" stroke="#e8443f" stroke-width="4"/>` +
    // 手前の遊歩道(欄干と敷石の目地)
    band(152, 8, "#b8ac94") +
    `<rect x="0" y="196" width="400" height="14" fill="#9a9484"/>` +
    `<rect x="0" y="192" width="400" height="4" fill="#b8ac94"/>` +
    `<g fill="#7a746a">${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => `<rect x="${12 + i * 42}" y="200" width="3" height="10"/>`).join("")}</g>` +
    `<g stroke="#8a847a" stroke-width="1.4" opacity=".7"><path d="M0,203h400"/></g>` +
    // 街灯2本
    `<g><rect x="228" y="166" width="3" height="26" fill="#4a4a52"/><circle cx="229.5" cy="163" r="4" fill="#f5b31c" opacity=".9"/></g>` +
    `<g><rect x="96" y="168" width="3" height="24" fill="#4a4a52"/><circle cx="97.5" cy="165" r="4" fill="#f5b31c" opacity=".9"/></g>` +
    // 蜘蛛の彫刻へのオマージュ(細長い脚の輪)
    `<g stroke="#4a4a52" stroke-width="2.4" fill="none"><path d="M40,192q2,-24 12,-34q-8,14 -4,34M52,192q-6,-26 4,-38q0,16 6,38M62,192q4,-20 12,-26q-6,12 -2,26"/></g>` +
    `<ellipse cx="56" cy="158" rx="7" ry="5" fill="#4a4a52"/>` +
    // 見物の二人(手前右)
    tinyPerson(330, 208, 1.2, "#c8384f", "#e8b88a", "#6e553c") +
    tinyPerson(352, 210, 1.25, "#f5b31c", "#c98a5f", "#241a10"),

  /**
   * 三日月の入江。サン・セバスティアン専用。緑の岬に抱かれた湾、
   * 沖の小島、白い欄干の遊歩道、右手前の岩に鉄の彫刻。
   */
  "spain-atlantic-bay":
    sky("#9fc0d8", "#dbe6e0", 96) +
    clouds(80, 30, 1, "#eef2f0", 0.8) +
    clouds(310, 40, 0.85, "#eef2f0", 0.7) +
    gull(150, 56, 0.9) +
    gull(260, 44, 1) +
    // 左右の緑の岬
    `<path d="M0,96Q40,60 96,86L110,120L0,132z" fill="#5f8a4a"/>` +
    `<path d="M400,96Q360,58 306,84L296,118L400,130z" fill="#4f7a3f"/>` +
    // 湾
    ground(96, "#4f8aa0") +
    ripples(120, "#9fc8d4") +
    ripples(142, "#9fc8d4") +
    // 沖の小島(サンタ・クララ島)と灯台、湾内のヨット
    `<path d="M178,96Q200,82 224,96L218,108H184z" fill="#6b8a5a"/>` +
    `<rect x="198" y="82" width="4" height="8" fill="#f6efe2"/><rect x="197.5" y="80" width="5" height="2.5" fill="#e8443f"/>` +
    `<g><path d="M96,128l6,-14l1,14z" fill="#f6efe2"/><path d="M92,128h14l-2,4h-10z" fill="#e8443f"/></g>` +
    `<g><path d="M290,140l5,-11l1,11z" fill="#f6efe2"/><path d="M287,140h11l-2,3h-8z" fill="#5b8fe8"/></g>` +
    // 波頭
    `<g stroke="#c8dce0" stroke-width="2" fill="none" opacity=".8"><path d="M40,132q6,-4 12,0M120,140q6,-4 12,0M250,136q6,-4 12,0M330,142q6,-4 12,0"/></g>` +
    // 波打ち際と砂浜
    `<path d="M0,158q100,-8 200,0t200,0V210H0z" fill="#e8dcc0"/>` +
    `<path d="M0,158q100,-8 200,0t200,0" stroke="#f6efe2" stroke-width="4" fill="none"/>` +
    `<path d="M0,164q100,-7 200,0t200,0" stroke="#f6efe2" stroke-width="2" fill="none" opacity=".6"/>` +
    // 砂浜の足跡と貝
    `<g fill="#c8bda0"><ellipse cx="60" cy="196" rx="2.5" ry="1.4"/><ellipse cx="68" cy="200" rx="2.5" ry="1.4"/><ellipse cx="76" cy="196" rx="2.5" ry="1.4"/><ellipse cx="84" cy="200" rx="2.5" ry="1.4"/></g>` +
    `<path d="M130,198l-4,-5a5,5 0 0 1 8,0z" fill="#f5b31c"/>` +
    // 遊歩道の白い街灯(この浜の意匠)
    `<g><rect x="30" y="164" width="3" height="14" fill="#f6efe2"/><circle cx="31.5" cy="161" r="3.5" fill="#f6efe2"/><circle cx="31.5" cy="161" r="1.8" fill="#f5b31c"/></g>` +
    `<g><rect x="150" y="164" width="3" height="14" fill="#f6efe2"/><circle cx="151.5" cy="161" r="3.5" fill="#f6efe2"/><circle cx="151.5" cy="161" r="1.8" fill="#f5b31c"/></g>` +
    `<g><rect x="230" y="164" width="3" height="14" fill="#f6efe2"/><circle cx="231.5" cy="161" r="3.5" fill="#f6efe2"/><circle cx="231.5" cy="161" r="1.8" fill="#f5b31c"/></g>` +
    // 白い欄干の遊歩道(この浜の意匠)
    `<rect x="0" y="176" width="252" height="4" fill="#f6efe2"/>` +
    `<g stroke="#f6efe2" stroke-width="2">${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => `<path d="M${8 + i * 21},180v10"/>`).join("")}</g>` +
    `<rect x="0" y="190" width="252" height="3" fill="#e0d6c0"/>` +
    // 右手前の岩と鉄の彫刻(風の櫛)。岩に錆色の腕が3本、外へ湾曲する
    `<path d="M284,210q-2,-22 18,-28q28,-8 48,4q14,10 14,24z" fill="#6e6658"/>` +
    `<path d="M296,192q-8,-6 -20,-4q10,-4 18,-2z" fill="#5a5548"/>` +
    `<path d="M310,184q-16,-8 -20,-28q-1,-7 2,-12" stroke="#8a5a3a" stroke-width="4.5" fill="none" stroke-linecap="round"/>` +
    `<path d="M330,180q0,-22 12,-34q5,-5 12,-6" stroke="#8a5a3a" stroke-width="4.5" fill="none" stroke-linecap="round"/>` +
    `<path d="M352,186q14,-10 30,-10q6,0 10,3" stroke="#8a5a3a" stroke-width="4.5" fill="none" stroke-linecap="round"/>` +
    // 岩に砕ける波しぶき
    `<path d="M270,198q10,-10 26,-6" stroke="#dbe6e0" stroke-width="3" fill="none" opacity=".9"/>` +
    `<g fill="#eef2f0" opacity=".85"><circle cx="276" cy="190" r="2.5"/><circle cx="286" cy="184" r="2"/><circle cx="382" cy="192" r="2.5"/></g>`,

  /**
   * 牛追いの通り。パンプローナ専用。二重の木柵が横切る朝の細い通り、
   * 白壁に赤い窓枠、遠くに星形要塞の稜堡。柵に赤いスカーフ。
   */
  "spain-bull-run":
    sky("#bcd4e4", "#f0e2c0", 96) +
    // 遠くの星形要塞(角張った稜堡の壁)
    `<path d="M0,96l60,-12l40,10l50,-10l30,8v12H0z" fill="#847d70"/>` +
    `<path d="M0,96l60,-12l40,10l50,-10l30,8" stroke="#6e6658" stroke-width="2" fill="none"/>` +
    ground(96, "#c8bda8") +
    // 通りの奥の家並み(遠景)
    `<g fill="#e8dcc0"><rect x="150" y="100" width="40" height="50"/><rect x="196" y="106" width="44" height="44"/><rect x="246" y="102" width="34" height="48"/></g>` +
    `<g fill="#b5602f"><rect x="150" y="100" width="40" height="4"/><rect x="196" y="106" width="44" height="4"/><rect x="246" y="102" width="34" height="4"/></g>` +
    `<g fill="#8a3a2f"><rect x="158" y="112" width="9" height="13"/><rect x="176" y="112" width="9" height="13"/><rect x="206" y="118" width="9" height="13"/><rect x="224" y="118" width="9" height="13"/><rect x="254" y="114" width="9" height="13"/></g>` +
    // 通りの両側の建物(白壁・赤い窓枠)
    `<path d="M0,24h130V182H0z" fill="#f6efe2"/>` +
    `<path d="M0,24h130v6H0z" fill="#c9773f"/>` +
    `<g fill="#8a3a2f"><rect x="14" y="44" width="18" height="26"/><rect x="52" y="44" width="18" height="26"/><rect x="90" y="44" width="18" height="26"/><rect x="14" y="92" width="18" height="26"/><rect x="52" y="92" width="18" height="26"/><rect x="90" y="92" width="18" height="26"/></g>` +
    `<g fill="#f6efe2"><rect x="16" y="46" width="14" height="10"/><rect x="54" y="46" width="14" height="10"/><rect x="92" y="46" width="14" height="10"/><rect x="16" y="94" width="14" height="10"/><rect x="54" y="94" width="14" height="10"/><rect x="92" y="94" width="14" height="10"/></g>` +
    `<path d="M400,20H286V180h114z" fill="#e8dcc0"/>` +
    `<path d="M400,20H286v6h114z" fill="#b5602f"/>` +
    `<g fill="#8a3a2f"><rect x="300" y="42" width="18" height="26"/><rect x="338" y="42" width="18" height="26"/><rect x="300" y="90" width="18" height="26"/><rect x="338" y="90" width="18" height="26"/></g>` +
    `<g fill="#f6efe2"><rect x="302" y="44" width="14" height="10"/><rect x="340" y="44" width="14" height="10"/><rect x="302" y="92" width="14" height="10"/><rect x="340" y="92" width="14" height="10"/></g>` +
    // 祭りの紙旗(街路を横切る)
    `<path d="M130,34Q200,46 286,32" stroke="#8a6a4f" stroke-width="1.4" fill="none"/>` +
    `<g>${[0, 1, 2, 3, 4, 5, 6].map((i) => `<path d="M${142 + i * 20},${37 + [2, 4, 5, 6, 5, 4, 2][i]}l4,9l4,-9z" fill="${i % 2 ? "#f6efe2" : "#e8443f"}"/>`).join("")}</g>` +
    // 石畳
    `<path d="M130,182L286,180L306,210H110z" fill="#b8ac94"/>` +
    `<g stroke="#9a8f7c" stroke-width="1.6" opacity=".6"><path d="M140,190h130M128,200h150M118,208h166"/></g>` +
    `<g fill="#a89a84" opacity=".8"><ellipse cx="170" cy="196" rx="6" ry="2.5"/><ellipse cx="222" cy="188" rx="5" ry="2"/><ellipse cx="200" cy="204" rx="7" ry="3"/><ellipse cx="252" cy="198" rx="6" ry="2.5"/></g>` +
    // 窓辺の花箱
    `<g fill="#3f8f4f"><rect x="14" y="70" width="18" height="4"/><rect x="90" y="70" width="18" height="4"/><rect x="300" y="68" width="18" height="4"/></g>` +
    `<g fill="#e8443f"><circle cx="18" cy="69" r="2"/><circle cx="26" cy="68" r="2"/><circle cx="96" cy="69" r="2"/><circle cx="306" cy="67" r="2"/><circle cx="314" cy="68" r="2"/></g>` +
    // 二重の木柵(手前を横切る)
    `<g fill="#8a6a4f"><rect x="0" y="150" width="10" height="60"/><rect x="70" y="152" width="10" height="58"/><rect x="150" y="154" width="10" height="56"/><rect x="240" y="154" width="10" height="56"/><rect x="320" y="152" width="10" height="58"/><rect x="390" y="150" width="10" height="60"/></g>` +
    `<g fill="#a8825f"><rect x="0" y="158" width="400" height="8"/><rect x="0" y="180" width="400" height="8"/></g>` +
    `<g fill="#8a6a4f" opacity=".5"><rect x="0" y="166" width="400" height="2"/><rect x="0" y="188" width="400" height="2"/></g>` +
    // 柵に結んだ赤いスカーフ(サン・フェルミンの赤)
    `<g fill="#e8443f"><circle cx="78" cy="162" r="3.5"/><path d="M76,164q-4,12 -8,16q8,-2 12,-14z"/><path d="M80,164q6,10 12,13q-8,1 -14,-11z"/></g>` +
    `<g fill="#e8443f"><circle cx="328" cy="162" r="3.5"/><path d="M326,164q-4,12 -8,16q8,-2 12,-14z"/><path d="M330,164q6,10 12,13q-8,1 -14,-11z"/></g>`,

  /**
   * 洞窟と緑の丘。サンティリャーナ・デル・マル専用。
   * カンタブリアの湿った緑、洞窟の口、放牧の牛と石の農家。
   */
  "spain-cave":
    sky("#9fc0d8", "#dbe6e0", 100) +
    clouds(300, 32, 1.1, "#eef2f0", 0.85) +
    clouds(90, 46, 0.8, "#eef2f0", 0.7) +
    hills(100, "#5f8a4a") +
    ground(100, "#6f9a52") +
    // 洞窟のある岩の丘(左)
    `<path d="M0,160Q10,86 90,92Q140,96 150,160z" fill="#8a9a6a"/>` +
    `<path d="M22,160q-2,-34 34,-36q30,-2 34,36z" fill="#847d70"/>` +
    `<path d="M34,160q0,-24 22,-25q20,-1 24,25z" fill="#3a2a1e"/>` +
    // 壁画の獣の気配(入口の奥にかすかな赤茶)
    `<path d="M48,148q6,-8 14,-6q6,2 8,8" stroke="#a8683f" stroke-width="3" fill="none" opacity=".7"/>` +
    // 石の農家(右)
    `<rect x="300" y="118" width="56" height="34" fill="#b8ac94"/>` +
    `<path d="M294,118h68l-12,-18h-44z" fill="#8a5a3a"/>` +
    `<rect x="322" y="134" width="12" height="18" fill="#5a4436"/>` +
    `<rect x="308" y="126" width="10" height="10" fill="#5a4a38"/>` +
    // 石垣と牧草地
    `<g fill="#9a9184"><rect x="0" y="164" width="400" height="6"/><rect x="30" y="158" width="14" height="6"/><rect x="120" y="158" width="14" height="6"/><rect x="250" y="158" width="14" height="6"/><rect x="352" y="158" width="14" height="6"/></g>` +
    `<g fill="#847d70"><rect x="70" y="160" width="12" height="4"/><rect x="190" y="160" width="12" height="4"/><rect x="310" y="160" width="12" height="4"/></g>` +
    band(170, 40, "#5f8a4a") +
    // 木の柵と野の花
    `<g fill="#8a6a4f"><rect x="10" y="176" width="4" height="16"/><rect x="52" y="178" width="4" height="16"/><rect x="94" y="176" width="4" height="16"/><rect x="8" y="180" width="92" height="3"/><rect x="8" y="188" width="92" height="3"/></g>` +
    `<g fill="#f6efe2"><circle cx="140" cy="196" r="2"/><circle cx="152" cy="202" r="2"/><circle cx="250" cy="194" r="2"/><circle cx="332" cy="196" r="2"/></g>` +
    `<g fill="#f5b31c"><circle cx="140" cy="196" r="0.9"/><circle cx="152" cy="202" r="0.9"/><circle cx="250" cy="194" r="0.9"/><circle cx="332" cy="196" r="0.9"/></g>` +
    // 放牧の牛(手前)
    cow(210, 206, 1.15) +
    cow(300, 200, 0.9, "#8a5a3a") +
    cow(360, 208, 1) +
    `<g stroke="#8fae63" stroke-width="2" opacity=".9" fill="none"><path d="M20,186q6,-6 12,0M60,196q6,-6 12,0M120,190q6,-6 12,0M170,202q6,-6 12,0"/></g>`,

  /**
   * りんご畑と緑の丘。オビエド・ヒホン。オレオ(高床の穀物倉)と
   * りんごの列、遠くの海と港のクレーン。
   */
  "spain-cider-orchard":
    sky("#9fc0d8", "#dbe6e0", 92) +
    clouds(120, 34, 1, "#eef2f0", 0.8) +
    // 遠くの海と港
    band(92, 28, "#5f8aa0") +
    crane(330, 106, 26, "#8a98a4") +
    crane(368, 106, 20, "#8a98a4") +
    gull(280, 60, 0.9) +
    // 緑の丘
    `<path d="M0,120Q90,88 200,108Q310,124 400,106V210H0z" fill="#6f9a52"/>` +
    ground(120, "#5f8a4a") +
    // オレオ(左)
    horreo(64, 160, 64) +
    // りんごの木の列(中景と手前)
    roundTree(160, 156, 10, "#4f8a3f", "#6b5330", 3) +
    roundTree(200, 158, 10, "#4f8a3f", "#6b5330", 3) +
    roundTree(240, 156, 10, "#4f8a3f", "#6b5330", 3) +
    roundTree(300, 178, 14, "#3f8f4f", "#6b5330", 4) +
    roundTree(354, 184, 16, "#3f8f4f", "#6b5330", 5) +
    roundTree(30, 200, 17, "#3f8f4f", "#6b5330", 5) +
    roundTree(110, 206, 15, "#4f8a3f", "#6b5330", 4) +
    // 手前の草と落ちたりんご
    `<g fill="#e8443f"><circle cx="150" cy="200" r="3.5"/><circle cx="162" cy="206" r="3.5"/><circle cx="330" cy="204" r="3.5"/></g>` +
    `<g stroke="#4f7a3f" stroke-width="2" opacity=".7" fill="none"><path d="M190,196q6,-6 12,0M240,204q6,-6 12,0M370,200q6,-6 12,0"/></g>`,

  /**
   * ヒラルダの塔と川。セビーリャ専用。ミナレット起源の鐘塔、
   * 瓦屋根の連なり、グアダルキビール川と金の塔、オレンジの並木。
   */
  "spain-giralda-river":
    sky("#8fc4e8", "#f0dca0", 110) +
    sun(330, 40, 18, "#f6e6a8") +
    gull(160, 50, 0.8) +
    gull(196, 38, 0.7) +
    gull(240, 56, 0.8) +
    // ヒラルダ(左)
    `<rect x="40" y="30" width="34" height="102" fill="#d9a860"/>` +
    // セブカ(菱形の透かし)の帯
    `<g fill="#b5885f"><path d="M49,66l8,8l-8,8l-8,-8zM65,66l8,8l-8,8l-8,-8zM49,92l8,8l-8,8l-8,-8zM65,92l8,8l-8,8l-8,-8z"/></g>` +
    `<path d="M46,50v-8a11,11 0 0 1 22,0v8z" fill="#8a6a44"/>` +
    // 鐘楼とヒラルディーリョ(風見)
    `<rect x="44" y="30" width="26" height="12" fill="#f3ead6"/>` +
    `<g fill="#8a6a44"><rect x="48" y="32" width="5" height="8"/><rect x="61" y="32" width="5" height="8"/></g>` +
    `<rect x="52" y="14" width="10" height="16" fill="#d9a860"/>` +
    `<path d="M57,14v-6l7,3z" fill="#f5b31c"/>` +
    // 瓦屋根の連なり
    band(110, 40, "#c9885f") +
    `<g fill="#b5714a">${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<path d="M${i * 50 + 10},124l22,-10l22,10z"/>`).join("")}</g>` +
    `<g fill="#f3ead6">${[0, 1, 2, 3].map((i) => `<rect x="${116 + i * 72}" y="128" width="9" height="12"/>`).join("")}</g>` +
    // 金の塔(右岸)
    `<path d="M330,150v-30a17,17 0 0 1 34,0v30z" fill="#d9b25a"/>` +
    `<path d="M338,120v-10a9,9 0 0 1 18,0v10z" fill="#c9a24a"/>` +
    `<g fill="#b08a3c"><rect x="336" y="132" width="5" height="8"/><rect x="346" y="132" width="5" height="8"/><rect x="356" y="132" width="5" height="8"/></g>` +
    // 川と手漕ぎの艇(グアダルキビールの朝の漕手)
    band(150, 34, "#4f8aa0") +
    ripples(162, "#bfe8f4") +
    `<g><path d="M120,170h44l-5,5h-34z" fill="#e8443f"/><circle cx="140" cy="164" r="3.5" fill="#d9a273"/><path d="M136,170l-8,-4M146,170l8,-4" stroke="#6b5330" stroke-width="1.6"/></g>` +
    `<path d="M112,178h56" stroke="#bfe8f4" stroke-width="1.4" opacity=".6"/>` +
    `<path d="M336,168a12,4 0 0 0 24,0" stroke="#f4c430" stroke-width="2" fill="none" opacity=".7"/>` +
    // ヒラルダの映り込み
    `<path d="M48,152v22M66,152v22" stroke="#d9a860" stroke-width="3" opacity=".35"/>` +
    // 川辺の遊歩道とオレンジ並木
    ground(184, "#d9c1a0") +
    `<rect x="0" y="184" width="400" height="4" fill="#c2a879"/>` +
    orangeTree(30, 210, 14) +
    orangeTree(110, 212, 12) +
    orangeTree(290, 212, 12) +
    orangeTree(370, 210, 14) +
    `<g fill="#f4941c"><circle cx="60" cy="204" r="3"/><circle cx="330" cy="206" r="3"/></g>`,

  /**
   * アルハンブラの丘。グラナダ専用。丘の上の赤い城壁と塔、
   * 背後にシエラネバダの雪の稜線、裾に糸杉。
   */
  "spain-alhambra-hill":
    sky("#8fc4e8", "#cfe4f0", 92) +
    // シエラネバダの雪の稜線
    `<path d="M0,92L70,56L130,84L210,48L280,80L340,58L400,86V110H0z" fill="#e8eef2"/>` +
    `<path d="M0,92L70,56L130,84L210,48L280,80L340,58L400,86" stroke="#c8d4dc" stroke-width="2" fill="none"/>` +
    `<path d="M60,92l10,-24l14,24zM268,88l12,-20l14,20z" fill="#f8fbfc"/>` +
    ground(92, "#8a9a6a") +
    // 城壁の載る丘
    `<path d="M0,150Q120,110 240,118Q330,124 400,142V210H0z" fill="#6b8a4f"/>` +
    // 赤い城壁と方形の塔
    `<rect x="20" y="106" width="360" height="26" fill="#a85a3a"/>` +
    `<g fill="#96482f"><rect x="36" y="82" width="34" height="50"/><rect x="130" y="90" width="28" height="42"/><rect x="308" y="84" width="34" height="48"/></g>` +
    `<g fill="#b5714a"><rect x="36" y="82" width="34" height="5"/><rect x="130" y="90" width="28" height="5"/><rect x="308" y="84" width="34" height="5"/></g>` +
    `<g fill="#5a3a2a"><rect x="48" y="94" width="9" height="12" rx="4"/><rect x="139" y="100" width="8" height="11" rx="4"/><rect x="320" y="96" width="9" height="12" rx="4"/></g>` +
    `<g fill="#96482f">${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => `<rect x="${26 + i * 28}" y="100" width="10" height="6"/>`).join("")}</g>` +
    // 裾の糸杉と庭
    cypress(96, 150, 40, "#2f5f3f") +
    cypress(238, 152, 34, "#2f5f3f") +
    cypress(360, 156, 38, "#2f5f3f") +
    // 対岸の白い家々(アルバイシンの斜面)
    `<g fill="#f6efe2"><rect x="10" y="160" width="22" height="16"/><rect x="38" y="166" width="18" height="14"/><rect x="14" y="182" width="26" height="14"/></g>` +
    `<g fill="#c9773f"><path d="M7,160h28l-6,-7H13zM35,166h24l-5,-6H40zM11,182h32l-7,-7H18z"/></g>` +
    `<g fill="#5a4a38"><rect x="17" y="165" width="5" height="6"/><rect x="44" y="170" width="5" height="6"/><rect x="24" y="187" width="5" height="6"/></g>` +
    // 手前の谷(ダロ川沿いの緑)
    band(178, 32, "#4f7a3f") +
    `<path d="M0,178q100,10 200,4t200,2" stroke="#3f6a33" stroke-width="3" fill="none" opacity=".8"/>` +
    cypress(30, 210, 44, "#245032") +
    cypress(58, 212, 34, "#245032") +
    cypress(330, 212, 40, "#245032") +
    // 壁の窓(二連アーチ)と塔の頂部
    `<g fill="#7a3423"><path d="M170,116v-5a3,3 0 0 1 6,0v5zM180,116v-5a3,3 0 0 1 6,0v5zM230,116v-5a3,3 0 0 1 6,0v5zM240,116v-5a3,3 0 0 1 6,0v5z"/></g>` +
    `<g fill="#b5714a"><rect x="40" y="78" width="6" height="6"/><rect x="60" y="78" width="6" height="6"/><rect x="134" y="86" width="5" height="6"/><rect x="149" y="86" width="5" height="6"/><rect x="312" y="80" width="6" height="6"/><rect x="332" y="80" width="6" height="6"/></g>` +
    // ザクロの茂み(グラナダの名の実)
    `<g><circle cx="150" cy="196" r="7" fill="#3f6a33"/><circle cx="166" cy="202" r="6" fill="#3f6a33"/><circle cx="256" cy="198" r="7" fill="#3f6a33"/></g>` +
    `<g fill="#c8384f"><circle cx="150" cy="194" r="3"/><circle cx="166" cy="201" r="3"/><circle cx="256" cy="196" r="3"/><circle cx="159" cy="199" r="2.4"/><circle cx="262" cy="201" r="2.4"/></g>`,

  /**
   * 巡礼路。サンティアゴ・デ・コンポステーラ・ログローニョ。
   * 霧のかかった緑の丘、ホタテ貝の道標、ぶどう畑の畝、歩く巡礼者。
   */
  "spain-pilgrim-road":
    sky("#a8bccb", "#dde4dc", 96) +
    clouds(320, 36, 1.1, "#e8eeea", 0.8) +
    hills(96, "#6b8a5a") +
    // 霧の帯
    `<g fill="#e8eeea" opacity=".7"><ellipse cx="90" cy="96" rx="90" ry="10"/><ellipse cx="300" cy="90" rx="80" ry="9"/></g>` +
    ground(96, "#6f9a52") +
    // ぶどう畑の畝(右の斜面)と杭
    `<g stroke="#4f7a3f" stroke-width="4" opacity=".85"><path d="M240,118L400,108M236,132L400,124M232,146L400,140"/></g>` +
    `<g stroke="#6b5330" stroke-width="2"><path d="M260,120v-8M300,117v-8M340,113v-8M270,134v-8M310,130v-8M350,127v-8"/></g>` +
    `<g fill="#5a3a5f"><circle cx="270" cy="115" r="2.5"/><circle cx="310" cy="112" r="2.5"/><circle cx="352" cy="122" r="2.5"/><circle cx="296" cy="128" r="2.5"/><circle cx="340" cy="137" r="2.5"/><circle cx="282" cy="141" r="2.5"/><circle cx="366" cy="134" r="2.5"/></g>` +
    // 石の小さな聖堂(左の丘)
    `<rect x="40" y="112" width="36" height="26" fill="#9a9184"/>` +
    `<path d="M34,112h48l-24,-14z" fill="#847d70"/>` +
    `<path d="M56,98v-8M52,93h8" stroke="#6e6658" stroke-width="2"/>` +
    // 土の道(手前へ広がる)
    `<path d="M172,138Q150,170 96,210H286Q216,168 204,138z" fill="#c2a879"/>` +
    `<path d="M186,150q-10,24 -40,52M204,152q10,24 44,54" stroke="#a8825f" stroke-width="2" fill="none" opacity=".7"/>` +
    band(138, 4, "#8fae63") +
    // 道端の草
    `<g stroke="#8fae63" stroke-width="2" opacity=".9" fill="none"><path d="M100,180q6,-8 10,0M300,186q6,-8 10,0M70,200q7,-9 12,0M330,202q7,-9 12,0"/></g>` +
    // 巡礼路を渡る鳥と、道端に積まれた祈りの石
    gull(140, 70, 0.7) +
    gull(166, 60, 0.6) +
    `<g fill="#9a9184"><ellipse cx="86" cy="172" rx="6" ry="2.6"/><ellipse cx="86" cy="168" rx="4.5" ry="2"/><ellipse cx="86" cy="165" rx="3" ry="1.6"/></g>` +
    `<g fill="#9a9184"><ellipse cx="308" cy="178" rx="5" ry="2.2"/><ellipse cx="308" cy="175" rx="3.5" ry="1.8"/></g>` +
    // ホタテ貝の道標(左手前)
    `<rect x="34" y="160" width="26" height="50" fill="#847d70"/>` +
    `<rect x="34" y="160" width="26" height="4" fill="#6e6658"/>` +
    `<g><path d="M47,186l-9,-11a11,11 0 0 1 18,0z" fill="#f5b31c"/><path d="M47,186l-6,-8M47,186l0,-10M47,186l6,-8" stroke="#c9922f" stroke-width="1.6"/></g>` +
    `<path d="M40,196l7,6l7,-9" stroke="#f5b31c" stroke-width="3" fill="none"/>` +
    // ハリエニシダの黄色い茂みと放牧の羊
    `<g><circle cx="120" cy="174" r="6" fill="#4f7a3f"/><circle cx="127" cy="177" r="5" fill="#4f7a3f"/><g fill="#f5b31c"><circle cx="118" cy="171" r="1.6"/><circle cx="124" cy="174" r="1.6"/><circle cx="129" cy="175" r="1.4"/></g></g>` +
    `<g><ellipse cx="252" cy="172" rx="8" ry="5" fill="#e8e2d4"/><circle cx="259" cy="169" r="3" fill="#4a4436"/><path d="M248,177v4M256,177v4" stroke="#4a4436" stroke-width="1.6"/></g>` +
    `<g><ellipse cx="278" cy="180" rx="7" ry="4.5" fill="#e8e2d4"/><circle cx="284" cy="177" r="2.6" fill="#4a4436"/><path d="M274,184v4M281,184v4" stroke="#4a4436" stroke-width="1.6"/></g>` +
    `<g><ellipse cx="230" cy="186" rx="6" ry="4" fill="#dcd6c8"/><circle cx="235" cy="183" r="2.4" fill="#4a4436"/><path d="M227,190v3M233,190v3" stroke="#4a4436" stroke-width="1.4"/></g>` +
    // 霧の切れ端(手前の丘にもかかる)
    `<g fill="#e8eeea" opacity=".45"><ellipse cx="60" cy="130" rx="70" ry="7"/><ellipse cx="330" cy="156" rx="60" ry="6"/></g>` +
    // 歩く巡礼者(右手前。杖と貝)
    `<g transform="translate(322,208) scale(1.25)">` +
    `<rect x="-5" y="-10" width="4" height="10" fill="#4a4436"/><rect x="1" y="-11" width="4" height="11" fill="#4a4436"/>` +
    `<path d="M-7,-27h13l-1,17h-11z" fill="#8a3a2f"/>` +
    `<rect x="-9" y="-27" width="9" height="12" rx="3" fill="#5a4a38"/>` +
    `<path d="M-6,-21l-7,-11a7,7 0 0 1 11,0z" fill="#f5b31c" transform="translate(2,10)"/>` +
    `<circle cx="1" cy="-33" r="6.5" fill="#c98a5f"/>` +
    `<path d="M-6,-35a7,7 0 0 1 13,-1l1,3l-14,0z" fill="#6e553c"/>` +
    `<path d="M11,-30v30" stroke="#6b5330" stroke-width="2.5"/>` +
    `<path d="M8,-24l3,-2" stroke="#c98a5f" stroke-width="3"/>` +
    `</g>`,
};

export const SPAIN_BG = { ...SPAIN_BASE_BG };

// ---------------------------------------------------------------------------
// 都市シンボル(20種)。鍵は cities.mjs の `mark` と対応。24×24の座標系。
// 盤面では直径19px程度にしかならないので、輪郭と主役1つに絞る。
// ---------------------------------------------------------------------------

export const SPAIN_MARKS = {
  /** 官庁風の丸屋根と尖塔。マドリード専用。 */
  "spain-capital-dome":
    `<rect x="3" y="14" width="18" height="7" fill="#f6efe2"/>` +
    `<g fill="#5a6673"><rect x="3" y="11" width="4" height="3"/><rect x="17" y="11" width="4" height="3"/></g>` +
    `<path d="M7,14a5,5 0 0 1 10,0z" fill="#5a6673"/>` +
    `<path d="M12,3v6" stroke="#5a6673" stroke-width="1.6"/>` +
    `<circle cx="12" cy="8" r="1.4" fill="#f5b31c"/>` +
    `<g fill="#8a6a44"><rect x="6" y="16" width="3" height="5"/><rect x="15" y="16" width="3" height="5"/><rect x="10.5" y="16" width="3" height="5"/></g>`,

  /** ローマ水道橋の連続アーチ。セゴビア・メリダ・タラゴナ・オウレンセ。 */
  "spain-roman-arch":
    `<rect x="2" y="6" width="20" height="15" fill="#c9b18a"/>` +
    `<g fill="#8fc4e8"><path d="M4,12v-2a2.5,2.5 0 0 1 5,0v2zM15,12v-2a2.5,2.5 0 0 1 5,0v2z"/><path d="M9.5,12v-2a2.5,2.5 0 0 1 5,0v2z"/></g>` +
    `<g fill="#8fc4e8"><path d="M4,21v-4a3,3 0 0 1 6,0v4zM14,21v-4a3,3 0 0 1 6,0v4z"/></g>` +
    `<rect x="2" y="6" width="20" height="2" fill="#b0966e"/>` +
    `<rect x="2" y="13" width="20" height="1.6" fill="#b0966e"/>`,

  /** 半円塔のある石の市壁。アビラ・ルーゴ・カセレス・トレド。 */
  "spain-city-wall":
    `<rect x="2" y="12" width="20" height="9" fill="#9a9184"/>` +
    `<g fill="#9a9184"><rect x="3" y="9" width="3" height="3"/><rect x="9" y="9" width="3" height="3"/><rect x="15" y="9" width="3" height="3"/><rect x="20" y="9" width="2" height="3"/></g>` +
    `<g fill="#847d70"><path d="M4,21v-13a3,3 0 0 1 6,0v13z"/><path d="M14,21v-13a3,3 0 0 1 6,0v13z"/></g>` +
    `<rect x="10.5" y="16" width="3" height="5" fill="#4a4436"/>`,

  /** プラテレスコの彫刻ファサード。サラマンカ・アルカラ。 */
  "spain-university-facade":
    `<rect x="4" y="4" width="16" height="17" fill="#d9b98a"/>` +
    `<rect x="4" y="4" width="16" height="2" fill="#b5915f"/>` +
    `<circle cx="12" cy="9.5" r="2.8" fill="#e8cfa0"/><circle cx="12" cy="9.5" r="1.4" fill="#b5915f"/>` +
    `<g fill="#b5915f"><circle cx="7" cy="9.5" r="1.2"/><circle cx="17" cy="9.5" r="1.2"/></g>` +
    `<path d="M9,21v-5a3,3 0 0 1 6,0v5z" fill="#4a4436"/>` +
    `<g fill="#b5915f"><rect x="5.5" y="14" width="2" height="7"/><rect x="16.5" y="14" width="2" height="7"/></g>`,

  /** 崖にせり出す家。クエンカ・ロンダ。 */
  "spain-cliff-houses":
    `<path d="M5,24V10h14v14z" fill="#b08a6a"/>` +
    `<path d="M5,24V10l3,0v14z" fill="#967252"/>` +
    `<rect x="4" y="4" width="13" height="7" fill="#f6efe2"/>` +
    `<path d="M3,4h15l-2,-3H5z" fill="#c9773f"/>` +
    `<rect x="17" y="5" width="5" height="4" fill="#8a5a3a"/>` +
    `<path d="M17,9h5l1,1.6h-7z" fill="#6e4630"/>` +
    `<g fill="#5a3a2a"><rect x="6.5" y="6" width="2.5" height="3"/><rect x="11.5" y="6" width="2.5" height="3"/></g>`,

  /** ゴシックの尖塔とバラ窓。ブルゴス・バリャドリッド・サラゴサ・ムルシア・レオン。 */
  "spain-cathedral-spire":
    `<rect x="4" y="12" width="5" height="9" fill="#c2ac8a"/>` +
    `<rect x="15" y="12" width="5" height="9" fill="#c2ac8a"/>` +
    `<path d="M4,12l2.5,-8l2.5,8zM15,12l2.5,-8l2.5,8z" fill="#b0966e"/>` +
    `<path d="M6.5,4v-2M17.5,4v-2" stroke="#b0966e" stroke-width="1.4"/>` +
    `<rect x="9" y="13" width="6" height="8" fill="#d0ba96"/>` +
    `<circle cx="12" cy="16" r="2.6" fill="#8a6a44"/><circle cx="12" cy="16" r="1.4" fill="#5b8fe8"/>`,

  /** 丘の上の白い風車。カンポ・デ・クリプターナ専用。 */
  "spain-windmill":
    `<path d="M8,21l1,-9h6l1,9z" fill="#f6efe2"/>` +
    `<path d="M8.6,12a4,4 0 0 1 6.8,0z" fill="#4a4a52"/>` +
    `<g stroke="#6b5330" stroke-width="1.6"><path d="M5,3l14,14M19,3L5,17"/></g>` +
    `<g fill="#e8dcc0"><path d="M5,3l3,-0.5l3,3.5l-3,1.5z"/><path d="M19,17l-3,0.5l-3,-3.5l3,-1.5z"/></g>` +
    `<circle cx="12" cy="10" r="1.6" fill="#4a4a52"/>`,

  /** 45度に角を切った街区の俯瞰。バルセロナ専用。 */
  "spain-grid-corner":
    `<g fill="#c2a879" stroke="#8a7350" stroke-width="1">` +
    `<path d="M2,2h7l2,2v7l-2,2H2z"/>` +
    `<path d="M22,2h-7l-2,2v7l2,2h7z"/>` +
    `<path d="M2,22h7l2,-2v-7l-2,-2H2z"/>` +
    `<path d="M22,22h-7l-2,-2v-7l2,-2h7z"/>` +
    `</g>` +
    `<path d="M12,1v22M1,12h22" stroke="#9a9484" stroke-width="1.6"/>` +
    `<circle cx="12" cy="12" r="1.8" fill="#7fae5a"/>`,

  /** アーケードの続く石畳の路地。ヘローナ・ビトリア・ヘレス・バレンシア。 */
  "spain-arcaded-lane":
    `<rect x="2" y="3" width="20" height="18" fill="#c9b18a"/>` +
    `<path d="M4,21v-9a4.5,4.5 0 0 1 9,0v9z" fill="#5a4a38"/>` +
    `<path d="M14,21v-7a3.5,3.5 0 0 1 7,0v7z" fill="#6e5a44"/>` +
    `<path d="M6,21v-7a3,3 0 0 1 6,0v7z" fill="#8a7358"/>` +
    `<path d="M15.5,21v-5.5a2.4,2.4 0 0 1 4.8,0v5.5z" fill="#a08662"/>` +
    `<rect x="2" y="3" width="20" height="2" fill="#b0966e"/>`,

  /** 緑と白の施釉タイルの煉瓦塔。テルエル専用。 */
  "spain-mudejar-tower":
    `<rect x="7" y="5" width="10" height="16" fill="#b5714a"/>` +
    `<path d="M5,5h14l-7,-3z" fill="#3f8f6f"/>` +
    `<g fill="#3f8f6f"><path d="M12,8l2.5,2l-2.5,2l-2.5,-2z"/></g>` +
    `<g fill="#f6efe2"><path d="M12,13l2.5,2l-2.5,2l-2.5,-2z"/></g>` +
    `<rect x="10.5" y="17.5" width="3" height="3.5" fill="#5a3a2a"/>`,

  /** 卵形・波打つ屋根の現代建築。フィゲラス・ビルバオ。 */
  "spain-surreal-roofline":
    `<rect x="3" y="18" width="18" height="3.5" fill="#8a98a4"/>` +
    `<path d="M4,18q0,-9 5,-9q3,0 4,-4q1,-4 4,-2q3,2 3,8q0,4 -1,7z" fill="#b8c4cc"/>` +
    `<path d="M7,18q0,-6 4,-7q-1,4 0,7z" fill="#dfe8ee"/>` +
    `<path d="M14,18q0,-8 4,-8q1,4 0.5,8z" fill="#9aa8b4"/>` +
    `<g fill="#5b8fe8" opacity=".85"><rect x="9.5" y="14" width="1.6" height="4"/><rect x="12" y="13" width="1.6" height="5"/></g>` +
    `<circle cx="19" cy="4.5" r="2.2" fill="#f6efe2" stroke="#8a98a4" stroke-width="0.8"/>`,

  /** 岩の上の鉄の彫刻(風の櫛)。サン・セバスティアン専用。 */
  "spain-wind-sculpture":
    `<path d="M3,24q0,-7 8,-8q9,-1 10,8z" fill="#6e6658"/>` +
    `<path d="M8,16Q4,10 7,4" stroke="#8a5a3a" stroke-width="2.4" fill="none" stroke-linecap="round"/>` +
    `<path d="M13,15q0,-7 5,-10" stroke="#8a5a3a" stroke-width="2.4" fill="none" stroke-linecap="round"/>` +
    `<path d="M17,18q5,-3 6,-8" stroke="#8a5a3a" stroke-width="2.4" fill="none" stroke-linecap="round"/>` +
    `<path d="M2,20q3,-3 6,-1" stroke="#dbe6e0" stroke-width="1.6" fill="none"/>`,

  /** 柵と牛。パンプローナ専用。柵の向こうに角を上げた牛の横顔。 */
  "spain-running-bull":
    `<path d="M2,13q-1.5,1 -1,3.5" stroke="#241a10" stroke-width="1.4" fill="none"/>` +
    `<ellipse cx="11" cy="11" rx="8" ry="4.8" fill="#241a10"/>` +
    `<g fill="#241a10"><rect x="6" y="13" width="2.2" height="6"/><rect x="14" y="13" width="2.2" height="6"/></g>` +
    `<circle cx="19.5" cy="9.5" r="3.4" fill="#241a10"/>` +
    `<path d="M18,6.5q-1,-4 1,-5.5M21,6.5q1,-4 -1,-5.5" stroke="#e8dcc0" stroke-width="1.5" fill="none" stroke-linecap="round"/>` +
    `<circle cx="20.6" cy="9" r="0.9" fill="#f6efe2"/>` +
    `<g fill="#8a6a4f"><rect x="2" y="16" width="20" height="2.4"/><rect x="2" y="20.6" width="20" height="2.4"/><rect x="4" y="14.5" width="2.2" height="9.5"/><rect x="17.8" y="14.5" width="2.2" height="9.5"/></g>`,

  /** 洞窟の入口と壁画の獣。サンティリャーナ・デル・マル専用。 */
  "spain-cave-bison":
    `<path d="M2,22q0,-16 10,-16q10,0 10,16z" fill="#847d70"/>` +
    `<path d="M4,22q0,-13 8,-13q8,0 8,13z" fill="#3a2a1e"/>` +
    `<path d="M8,19q0,-4 4,-4q3,0 4,2l1.6,-1l-0.6,2.6q0,1.4 -2,1.4z" fill="#a8683f"/>` +
    `<path d="M9,16q1,-2 3,-2" stroke="#8a4a2f" stroke-width="1.2" fill="none"/>`,

  /** 高く注ぐシードル。オビエド・ヒホン。 */
  "spain-cider-splash":
    `<rect x="3" y="2" width="4" height="9" rx="1.4" fill="#2f5f3f"/>` +
    `<rect x="4" y="1" width="2" height="3" fill="#2f5f3f"/>` +
    `<path d="M7,4q9,2 10,13" stroke="#f5b31c" stroke-width="1.8" fill="none"/>` +
    `<path d="M14,17h7l-1.4,6h-4.2z" fill="#e8dcc0"/>` +
    `<rect x="14.6" y="19" width="5.8" height="3" fill="#f5b31c"/>` +
    `<g fill="#f5b31c"><circle cx="15" cy="14" r="0.9"/><circle cx="18.5" cy="15" r="0.9"/></g>`,

  /** 港の起重機と漁船。ア・コルーニャ・ビーゴ・サンタンデール・ヒホンほか。 */
  "spain-crane-port":
    `<rect x="9" y="3" width="2.4" height="14" fill="#e8443f"/>` +
    `<rect x="9" y="3" width="10" height="2.4" fill="#e8443f"/>` +
    `<path d="M17,5.4v4" stroke="#4a4a52" stroke-width="1.4"/>` +
    `<path d="M17,9.4q2,1.5 0,3" stroke="#4a4a52" stroke-width="1.6" fill="none"/>` +
    `<path d="M2,18h20l-3,4H5z" fill="#2f6ea8"/>` +
    `<rect x="2" y="16" width="20" height="2" fill="#e8443f"/>`,

  /** 赤白の馬蹄形二重アーチ。コルドバ・アルメリア。 */
  "spain-horseshoe-arcade":
    `<rect x="2" y="3" width="20" height="18" fill="#e8dcc0"/>` +
    `<path d="M3.5,21v-8.5a4.5,4.5 0 1 1 9,0v8.5z" fill="#b5482f"/>` +
    `<path d="M5,21v-7.5a3,3 0 1 1 6,0v7.5z" fill="#5a3a2a"/>` +
    `<path d="M11.5,21v-8.5a4.5,4.5 0 1 1 9,0v8.5z" fill="#b5482f"/>` +
    `<path d="M13,21v-7.5a3,3 0 1 1 6,0v7.5z" fill="#5a3a2a"/>` +
    `<g stroke="#e8dcc0" stroke-width="1.2" fill="none"><path d="M4,10l4,-3M16,7l4,3"/></g>` +
    `<rect x="2" y="3" width="20" height="2" fill="#b5482f"/>`,

  /** ミナレット起源の鐘塔。セビーリャ専用。 */
  "spain-giralda-tower":
    `<rect x="8" y="6" width="8" height="15" fill="#d9a860"/>` +
    `<g fill="#b5885f"><path d="M12,10l2,1.6l-2,1.6l-2,-1.6z"/><path d="M12,15l2,1.6l-2,1.6l-2,-1.6z"/></g>` +
    `<rect x="9" y="6" width="6" height="2.6" fill="#f3ead6"/>` +
    `<rect x="10.5" y="2.6" width="3" height="3.4" fill="#d9a860"/>` +
    `<path d="M12,2.6v-1.6l2.4,0.8z" fill="#f5b31c"/>`,

  /** 幾何学の透かし壁と赤い城壁。グラナダ専用。 */
  "spain-alhambra-lattice":
    `<rect x="2" y="10" width="20" height="11" fill="#a85a3a"/>` +
    `<g fill="#96482f"><rect x="3" y="7" width="3" height="3"/><rect x="9" y="7" width="3" height="3"/><rect x="15" y="7" width="3" height="3"/><rect x="20" y="7" width="2" height="3"/></g>` +
    `<rect x="5" y="12" width="14" height="7" fill="#e8cfa0"/>` +
    `<g stroke="#a85a3a" stroke-width="1"><path d="M5,15.5h14M8.5,12v7M12,12v7M15.5,12v7"/></g>` +
    `<g stroke="#a85a3a" stroke-width="0.8" fill="none"><path d="M5,12l3.5,3.5l-3.5,3.5M8.5,12l3.5,3.5l-3.5,3.5M12,12l3.5,3.5l-3.5,3.5M15.5,12l3.5,3.5l-3.5,3.5"/></g>`,

  /** ホタテ貝と巡礼の杖。サンティアゴ・デ・コンポステーラ・ログローニョ。 */
  "spain-scallop-staff":
    `<path d="M12,17L4,8a10,10 0 0 1 16,0z" fill="#f5b31c"/>` +
    `<path d="M12,17L6,9.5M12,17L9,7.5M12,17V7M12,17l3,-9.5M12,17l6,-7.5" stroke="#c9922f" stroke-width="1.2" fill="none"/>` +
    `<path d="M18,3L10,23" stroke="#6b5330" stroke-width="2.2" stroke-linecap="round"/>` +
    `<circle cx="18.5" cy="3.5" r="1.6" fill="#8a5a3a"/>`,
};
