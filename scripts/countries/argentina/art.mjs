/**
 * アルゼンチン盤の都市イラスト。
 *
 * `ARGENTINA_MARKS` は 24×24 の座標系に描くシンボル、`ARGENTINA_BG` は
 * 400×210 の座標系に描く背景シーン(いずれもSVG断片の文字列)。
 *
 * ## この盤面の芯
 *
 * **鉄道は国を一つに結ぶためではなく、パンパの富をブエノスアイレス港へ
 * 送り出すために、競合する外国資本ごとにばらばらに敷かれた。**扇形の路線網と、
 * いまも揃わない3つの軌間(1676mm広軌・1435mm標準軌・1000mm軌)がその設計を
 * 残している。だから線路を描くときは**軌間の違いを描き分ける**:
 *   broadTrack() = 広軌(枕木が長く太い) / metreTrack() = 1000mm・750mm軌
 *   (枕木が短く細かい)。積み替え(trasbordo)の絵では両方を並べて見せる。
 *
 * 1990年代の民営化で旅客列車が消えた町は、**廃墟ではなく車止め(bufferStop)で
 * 描く**(北海道盤と同じ扱い。人はいまも住んでいる)。
 *
 * ## 描かないもの
 *
 * - タンゴ・ガウチョ・アコンカグアは南アメリカ盤の題材(重ねない。
 *   アコーディオンはチャマメ(コリエンテス)の文脈でのみ出す)。
 * - 軍事政権期・生贄(サルタの凍った子供たち)は**惨状ではなく構造で語る**。
 *   frozenmummies は遺体を描かず、山と博物館で語る。
 * - 先住民の伝承・人々を「顔」で代表させない。土地と道具で語る。
 *
 * 色はフランスと揃える。空 #8fc4e8〜、顔 #f6efe2、強調 #f5b31c/#e8443f/#5b8fe8。
 * アルゼンチンらしさは国旗の空色 #75aadb、パンパの小麦 #d8b95f、パラナ川の
 * 土色 #8a9464、北西部の赤土 #b06a42、パタゴニアの灰緑 #9aa584 で出す。
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
 * 地面や水平線がもっと下にあるシーンで既定のままにすると、
 * あいだが横一文字に透ける。描いたら必ず実測すること
 * (`node scripts/check-city-backgrounds.mjs --src argentina` 相当)。
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

/** パンパの地平線に長く伸びる巻雲。**平らさを強調する。** */
function pampaClouds(y, fill = "#f6efe2", o = ".7") {
  const p = [];
  for (const [x, w] of [
    [40, 64],
    [150, 40],
    [252, 76],
    [352, 48],
  ]) {
    p.push(
      `<ellipse cx="${x}" cy="${r1(y + (x % 13) - 6)}" rx="${w}" ry="5"/>`,
      `<ellipse cx="${r1(x + w * 0.4)}" cy="${r1(y + (x % 13) - 10)}" rx="${r1(w * 0.5)}" ry="4"/>`,
    );
  }
  return `<g fill="${fill}" opacity="${o}">${p.join("")}</g>`;
}

/** 川・海。`y` から下端まで必ず塗る。 */
function water(y, deep = "#3f7f9a", mid = "#4f92ae", near = "#6bb0c4") {
  const h = 210 - y;
  return (
    `<rect x="0" y="${y}" width="${W}" height="${h}" fill="${near}"/>` +
    `<rect x="0" y="${y}" width="${W}" height="${r1(h * 0.36)}" fill="${deep}"/>` +
    `<rect x="0" y="${r1(y + h * 0.36)}" width="${W}" height="${r1(h * 0.3)}" fill="${mid}"/>`
  );
}

/** パラナ川。土を運ぶ川なので青ではなく茶緑。 */
function paranaWater(y) {
  return water(y, "#6b7f4a", "#7f9058", "#98a86a");
}

/** 水面のうねり。 */
function swell(y, color = "#bfe8f4", o = ".5") {
  return (
    `<g stroke="${color}" stroke-width="2" opacity="${o}" fill="none" stroke-linecap="round">` +
    `<path d="M16,${y}q9,-3 18,0M112,${r1(y + 10)}q9,-3 18,0M256,${r1(y + 4)}q9,-3 18,0` +
    `M332,${r1(y + 16)}q9,-3 18,0M56,${r1(y + 22)}q11,-4 22,0M300,${r1(y + 30)}q11,-4 22,0` +
    `M150,${r1(y + 34)}q11,-4 22,0"/></g>`
  );
}

/** 遠景のなだらかな丘(シエラ)。 */
function hills(y, fill, count = 4) {
  const parts = [];
  for (let i = 0; i < count; i++) {
    const cx = 40 + (i * W) / count;
    parts.push(`<path d="M${cx - 70},${y}c20,-34 50,-34 70,0z" fill="${fill}"/>`);
  }
  return `<g opacity=".95">${parts.join("")}</g>`;
}

/** 雪をかぶったアンデスの稜線。 */
function snowRidge(y, h, rock = "#7a8496", seed = 2) {
  const peaks = [];
  for (let i = 0; i < 6; i++) {
    const px = 20 + i * 72 + ((i * seed) % 3) * 10;
    const ph = r1(h * (0.65 + ((i * seed) % 4) / 8));
    peaks.push(
      `<path d="M${px - 44},${y}L${px},${r1(y - ph)}L${px + 44},${y}z" fill="${rock}"/>` +
        `<path d="M${r1(px - 13)},${r1(y - ph * 0.68)}L${px},${r1(y - ph)}L${r1(px + 13)},${r1(y - ph * 0.68)}l-5,3l-4,-3l-4,4z" fill="#eef2f4"/>`,
    );
  }
  return `<g>${peaks.join("")}</g>`;
}

/**
 * 広軌(1676mm)。**枕木が長く太い。**この国の幹線の軌間。
 */
function broadTrack(y, from = 0, to = W, tie = "#5f4c33", rail = "#8a8f92") {
  const ties = [];
  for (let x = from; x < to; x += 16) ties.push(`<rect x="${r1(x)}" y="${y}" width="9" height="10"/>`);
  return (
    `<g fill="${tie}">${ties.join("")}</g>` +
    `<rect x="${from}" y="${r1(y + 1.4)}" width="${r1(to - from)}" height="2.8" fill="${rail}"/>` +
    `<rect x="${from}" y="${r1(y + 6.4)}" width="${r1(to - from)}" height="2.8" fill="${rail}"/>`
  );
}

/** 1000mm・750mm軌。**枕木が短く細かい。** */
function metreTrack(y, from = 0, to = W, tie = "#6b5a3a", rail = "#7f8288") {
  const ties = [];
  for (let x = from; x < to; x += 11) ties.push(`<rect x="${r1(x)}" y="${y}" width="5.5" height="6.5"/>`);
  return (
    `<g fill="${tie}">${ties.join("")}</g>` +
    `<rect x="${from}" y="${r1(y + 1)}" width="${r1(to - from)}" height="2" fill="${rail}"/>` +
    `<rect x="${from}" y="${r1(y + 4.4)}" width="${r1(to - from)}" height="2" fill="${rail}"/>`
  );
}

/**
 * 車止め。**旅客列車が消えた町の記号。**廃墟は描かない。
 * 赤白の横木と、後ろで途切れる線路。
 */
function bufferStop(x, base, s = 1) {
  return (
    `<g transform="translate(${x},${base}) scale(${s})">` +
    `<path d="M-12,0L-4,-16h2L-6,0z" fill="#5f5a50"/>` +
    `<path d="M12,0L4,-16h-2L6,0z" fill="#5f5a50"/>` +
    `<rect x="-13" y="-15" width="26" height="6" fill="#c8452f"/>` +
    `<rect x="-13" y="-15" width="7" height="6" fill="#efe8d8"/>` +
    `<rect x="1" y="-15" width="7" height="6" fill="#efe8d8"/>` +
    `<rect x="-14" y="0" width="28" height="3" fill="#4a4438"/>` +
    `</g>`
  );
}

/** 電信柱の列。パンパ・ステップの奥行き。 */
function telegraphPoles(xs, base, h = 30, lean = 0, color = "#6b5a44") {
  return xs
    .map(
      (x, i) =>
        `<g stroke="${color}" stroke-width="2.4" fill="none">` +
        `<path d="M${x},${r1(base + (i % 2) * 2)}l${r1(lean)},${-h}m${r1(lean - 6)},${r1(4 - h + h * 0.12)}h12"/></g>`,
    )
    .join("");
}

/** 針金の柵。estancia の境界。 */
function wireFence(x0, x1, base, h = 12, post = "#6b5a44") {
  const p = [];
  for (let x = x0; x <= x1; x += 26) {
    p.push(`<rect x="${r1(x)}" y="${r1(base - h)}" width="2.6" height="${h}" fill="${post}"/>`);
  }
  p.push(
    `<g stroke="#8a8074" stroke-width="1" opacity=".8" fill="none">` +
      `<path d="M${x0},${r1(base - h * 0.78)}H${x1}M${x0},${r1(base - h * 0.42)}H${x1}"/></g>`,
  );
  return p.join("");
}

/**
 * パンパの風車(molino)。**水を汲むための多翼風車。**この盤面の田園の記号。
 */
function molino(x, base, h, s = 1) {
  const hubY = r1(base - h);
  const R = r1(11 * s);
  const blades = [];
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI) / 4;
    blades.push(
      `<path d="M${x},${hubY}L${r1(x + Math.cos(a) * R)},${r1(hubY + Math.sin(a) * R)}" stroke="#9aa0a8" stroke-width="${r1(2.2 * s)}"/>`,
    );
  }
  return (
    `<g fill="none">` +
    `<path d="M${r1(x - 7 * s)},${base}L${x},${hubY}L${r1(x + 7 * s)},${base}M${r1(x - 4 * s)},${r1(base - h * 0.42)}h${r1(8 * s)}" stroke="#7a7268" stroke-width="${r1(2 * s)}"/>` +
    blades.join("") +
    `<circle cx="${x}" cy="${hubY}" r="${r1(3 * s)}" fill="#5f5a50"/>` +
    `<path d="M${x},${hubY}h${r1(13 * s)}l${r1(4 * s)},${r1(3 * s)}v${r1(-6 * s)}z" fill="#9aa0a8"/>` +
    `</g>`
  );
}

/** 円筒の穀物サイロの組。 */
function siloGroup(x, base, h, n = 3, s = 1, body = "#c8c2b4") {
  const p = [];
  const w = r1(17 * s);
  for (let i = 0; i < n; i++) {
    const sx = r1(x + i * (w + 3 * s));
    p.push(
      `<rect x="${sx}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${body}"/>`,
      `<path d="M${sx},${r1(base - h)}a${r1(w / 2)},${r1(6 * s)} 0 0 1 ${w},0z" fill="#8a857a"/>`,
      `<rect x="${sx}" y="${r1(base - h)}" width="${r1(w * 0.28)}" height="${h}" fill="#dcd6c8" opacity=".7"/>`,
    );
  }
  p.push(
    `<path d="M${r1(x + (n * (w + 3 * s)) / 2 - 2)},${r1(base - h - 14 * s)}v${r1(14 * s)}" stroke="#8a857a" stroke-width="${r1(3 * s)}" fill="none"/>`,
  );
  return p.join("");
}

/** コンクリートの大型穀物エレベーター(港)。 */
function grainElevator(x, base, w, h, body = "#c2bcae") {
  const head = r1(h * 0.3);
  return (
    `<rect x="${x}" y="${r1(base - h + head)}" width="${w}" height="${r1(h - head)}" fill="${body}"/>` +
    `<g stroke="#a8a294" stroke-width="2" opacity=".8" fill="none">${[0.25, 0.5, 0.75]
      .map((t) => `<path d="M${r1(x + w * t)},${r1(base - h + head)}V${base}"/>`)
      .join("")}</g>` +
    `<rect x="${r1(x + w * 0.12)}" y="${r1(base - h)}" width="${r1(w * 0.76)}" height="${head}" fill="#9a948a"/>` +
    `<g fill="#5f7f96">${[0.2, 0.5, 0.8]
      .map((t) => `<rect x="${r1(x + w * 0.12 + w * 0.76 * t - 3)}" y="${r1(base - h + head * 0.3)}" width="6" height="7"/>`)
      .join("")}</g>`
  );
}

/** 積み込みの筒(エレベーターから船へ)。 */
function loadingSpout(x0, y0, x1, y1, dust = true) {
  return (
    `<path d="M${x0},${y0}L${x1},${y1}" stroke="#7a746a" stroke-width="5" stroke-linecap="round" fill="none"/>` +
    (dust
      ? `<g fill="#d8c88f" opacity=".8"><ellipse cx="${x1}" cy="${r1(y1 + 5)}" rx="5" ry="3"/><ellipse cx="${r1(x1 + 4)}" cy="${r1(y1 + 9)}" rx="3.4" ry="2.2"/></g>`
      : "")
  );
}

/** 港のガントリークレーン。 */
function portCrane(x, base, h, s = 1, color = "#c8763f") {
  return (
    `<g stroke="${color}" stroke-width="${r1(3.4 * s)}" fill="none">` +
    `<path d="M${x},${base}V${r1(base - h)}h${r1(30 * s)}M${r1(x + 22 * s)},${base}V${r1(base - h)}M${x},${r1(base - h * 0.55)}h${r1(22 * s)}"/>` +
    `</g>` +
    `<path d="M${r1(x + 27 * s)},${r1(base - h)}v${r1(12 * s)}" stroke="#5f5a50" stroke-width="${r1(1.6 * s)}" fill="none"/>` +
    `<rect x="${r1(x + 22 * s)}" y="${r1(base - h + 12 * s)}" width="${r1(10 * s)}" height="${r1(7 * s)}" fill="#8a5a3a"/>`
  );
}

/** 貨物船。穀物・コンテナを積む。 */
function ship(x, y, s = 1, hull = "#8a4a30", house = "#e0dccc") {
  return (
    `<path d="M${r1(x - 55 * s)},${r1(y - 12 * s)}h${r1(110 * s)}l${r1(-8 * s)},${r1(12 * s)}h${r1(-94 * s)}z" fill="${hull}"/>` +
    `<rect x="${r1(x - 55 * s)}" y="${r1(y - 15 * s)}" width="${r1(110 * s)}" height="${r1(3.4 * s)}" fill="#5f3320"/>` +
    `<rect x="${r1(x + 22 * s)}" y="${r1(y - 30 * s)}" width="${r1(24 * s)}" height="${r1(15 * s)}" fill="${house}"/>` +
    `<g fill="#3f4a56">${[0, 1, 2]
      .map((i) => `<rect x="${r1(x + 25 * s + i * 7 * s)}" y="${r1(y - 26 * s)}" width="${r1(4 * s)}" height="${r1(5 * s)}"/>`)
      .join("")}</g>` +
    `<rect x="${r1(x + 28 * s)}" y="${r1(y - 39 * s)}" width="${r1(7 * s)}" height="${r1(9 * s)}" fill="#c8452f"/>` +
    `<g fill="#7f8288">${[-46, -28, -10]
      .map((dx) => `<path d="M${r1(x + dx * s)},${r1(y - 15 * s)}a${r1(8 * s)},${r1(5 * s)} 0 0 1 ${r1(16 * s)},0z"/>`)
      .join("")}</g>`
  );
}

/** 有蓋貨車。 */
function boxcar(x, base, s = 1, body = "#8a4a30") {
  return (
    `<rect x="${r1(x - 22 * s)}" y="${r1(base - 20 * s)}" width="${r1(44 * s)}" height="${r1(16 * s)}" fill="${body}"/>` +
    `<rect x="${r1(x - 22 * s)}" y="${r1(base - 21.6 * s)}" width="${r1(44 * s)}" height="${r1(2.6 * s)}" fill="#5f3320"/>` +
    `<rect x="${r1(x - 5 * s)}" y="${r1(base - 18 * s)}" width="${r1(10 * s)}" height="${r1(13 * s)}" fill="#5f4c33"/>` +
    `<g fill="#33302c"><circle cx="${r1(x - 13 * s)}" cy="${r1(base - 2.6 * s)}" r="${r1(3 * s)}"/><circle cx="${r1(x + 13 * s)}" cy="${r1(base - 2.6 * s)}" r="${r1(3 * s)}"/></g>`
  );
}

/** 小さな蒸気機関車(ラ・トロチータ級)。左向き。 */
function steamLoco(x, base, s = 1, body = "#3f4a44", trim = "#c8452f") {
  return (
    `<g transform="translate(${x},${base}) scale(${s})">` +
    `<rect x="-30" y="-18" width="38" height="12" fill="${body}"/>` +
    `<path d="M-30,-18a6,6 0 0 1 0,-0.01z" fill="none"/>` +
    `<rect x="8" y="-26" width="16" height="20" fill="${body}"/>` +
    `<rect x="9.5" y="-23" width="5.4" height="6" fill="#f2d98a"/>` +
    `<rect x="-30" y="-20" width="38" height="3" fill="#33302c"/>` +
    `<rect x="-26" y="-30" width="6" height="12" fill="#33302c"/>` +
    `<rect x="-12" y="-24" width="7" height="6" fill="${trim}"/>` +
    `<path d="M-34,-6h60v3h-60z" fill="${trim}"/>` +
    `<path d="M-34,-6l-6,6h10z" fill="#5f5a50"/>` +
    `<g fill="#33302c"><circle cx="-18" cy="-1" r="4.6"/><circle cx="-4" cy="-1" r="4.6"/><circle cx="14" cy="-1" r="5.4"/></g>` +
    `<g fill="#8a8f92"><circle cx="-18" cy="-1" r="1.6"/><circle cx="-4" cy="-1" r="1.6"/><circle cx="14" cy="-1" r="1.8"/></g>` +
    `</g>`
  );
}

/** 煙・湯気。 */
function plume(x, base, h, s = 1, color = "#d8d2c4", o = ".85") {
  const p = [];
  for (let i = 0; i < 5; i++) {
    const t = i / 4;
    p.push(
      `<ellipse cx="${r1(x + t * 14 * s)}" cy="${r1(base - t * h)}" rx="${r1((6 + t * 15) * s)}" ry="${r1((4 + t * 10) * s)}"/>`,
    );
  }
  return `<g fill="${color}" opacity="${o}">${p.join("")}</g>`;
}

/** コイロン(ステップの草)。風に寝ている。 */
function tuft(x, base, s = 1, fill = "#b0a468", lean = 3) {
  const p = [];
  for (const d of [-5, -2, 1, 4]) {
    p.push(
      `<path d="M${x},${base}q${r1(d * 0.6 * s + lean)},${r1(-5 * s)} ${r1(d * s + lean * 1.6)},${r1(-9 * s)}" stroke="${fill}" stroke-width="${r1(1.6 * s)}" fill="none" stroke-linecap="round"/>`,
    );
  }
  return p.join("");
}

/** ポプラ(álamo)の防風林。クージョの畑の縁。 */
function poplar(x, base, h, fill = "#4f7f3f") {
  return (
    `<path d="M${x},${base}v${r1(-h * 0.2)}" stroke="#6b5a44" stroke-width="2.4" fill="none"/>` +
    `<ellipse cx="${x}" cy="${r1(base - h * 0.58)}" rx="${r1(h * 0.14)}" ry="${r1(h * 0.46)}" fill="${fill}"/>`
  );
}

/** オンブー(パンパの孤木)。幹が太く冠が広い。 */
function ombu(x, base, s = 1) {
  return (
    `<path d="M${r1(x - 5 * s)},${base}q${r1(1 * s)},${r1(-14 * s)} ${r1(-3 * s)},${r1(-22 * s)}m${r1(3 * s)},${r1(22 * s)}q${r1(4 * s)},${r1(-16 * s)} ${r1(2 * s)},${r1(-24 * s)}m${r1(3 * s)},${r1(24 * s)}q${r1(5 * s)},${r1(-12 * s)} ${r1(9 * s)},${r1(-18 * s)}" stroke="#6b5a44" stroke-width="${r1(4 * s)}" fill="none" stroke-linecap="round"/>` +
    `<ellipse cx="${x}" cy="${r1(base - 33 * s)}" rx="${r1(26 * s)}" ry="${r1(13 * s)}" fill="#3f6b3a"/>` +
    `<ellipse cx="${r1(x - 14 * s)}" cy="${r1(base - 27 * s)}" rx="${r1(13 * s)}" ry="${r1(8 * s)}" fill="#4a7a42"/>` +
    `<ellipse cx="${r1(x + 15 * s)}" cy="${r1(base - 28 * s)}" rx="${r1(12 * s)}" ry="${r1(7 * s)}" fill="#4a7a42"/>`
  );
}

/** カルドン(北西部の柱サボテン)。 */
function cardon(x, base, h, fill = "#5f8a4f") {
  return (
    `<path d="M${r1(x - 3)},${base}v${-h}a3,3 0 0 1 6,0v${h}z" fill="${fill}"/>` +
    `<path d="M${r1(x - 10)},${r1(base - h * 0.4)}v${r1(-h * 0.25)}a2.6,2.6 0 0 1 5.2,0v${r1(h * 0.12)}q0,4 4.8,4z" fill="${fill}"/>` +
    `<path d="M${r1(x + 10)},${r1(base - h * 0.32)}v${r1(-h * 0.32)}a2.6,2.6 0 0 1 5.2,0v${r1(h * 0.2)}q0,4 -5.2,4z" fill="${fill}" transform="translate(${r1(2 * x + 0)},0) scale(-1,1) translate(${r1(-2 * x)},0)"/>` +
    `<g stroke="#4a6b3c" stroke-width="0.8" opacity=".7" fill="none"><path d="M${r1(x - 1.4)},${base}V${r1(base - h + 3)}M${r1(x + 1.4)},${base}V${r1(base - h + 3)}"/></g>`
  );
}

/** リャマ。顔は描かず輪郭で。 */
function llama(x, base, s = 1, coat = "#c9a877") {
  return (
    `<g fill="${coat}">` +
    `<ellipse cx="${x}" cy="${r1(base - 11 * s)}" rx="${r1(9 * s)}" ry="${r1(5.5 * s)}"/>` +
    `<rect x="${r1(x + 5 * s)}" y="${r1(base - 22 * s)}" width="${r1(3.4 * s)}" height="${r1(12 * s)}" rx="${r1(1.6 * s)}"/>` +
    `<ellipse cx="${r1(x + 6.7 * s)}" cy="${r1(base - 23 * s)}" rx="${r1(3 * s)}" ry="${r1(2.4 * s)}"/>` +
    `<path d="M${r1(x + 5.4 * s)},${r1(base - 25 * s)}l${r1(-1 * s)},${r1(-3 * s)}l${r1(1.8 * s)},${r1(1 * s)}zM${r1(x + 8 * s)},${r1(base - 25 * s)}l${r1(1 * s)},${r1(-3 * s)}l${r1(-1.8 * s)},${r1(1 * s)}z"/>` +
    `<rect x="${r1(x - 7 * s)}" y="${r1(base - 8 * s)}" width="${r1(2.2 * s)}" height="${r1(8 * s)}"/>` +
    `<rect x="${r1(x - 2 * s)}" y="${r1(base - 8 * s)}" width="${r1(2.2 * s)}" height="${r1(8 * s)}"/>` +
    `<rect x="${r1(x + 3 * s)}" y="${r1(base - 8 * s)}" width="${r1(2.2 * s)}" height="${r1(8 * s)}"/>` +
    `</g>`
  );
}

/** 羊。パタゴニアの主。 */
function sheep(x, base, s = 1) {
  return (
    `<g><ellipse cx="${x}" cy="${r1(base - 7 * s)}" rx="${r1(7.5 * s)}" ry="${r1(5 * s)}" fill="#e8e2d4"/>` +
    `<ellipse cx="${r1(x + 6.4 * s)}" cy="${r1(base - 9.4 * s)}" rx="${r1(2.6 * s)}" ry="${r1(2 * s)}" fill="#4a4438"/>` +
    `<g fill="#4a4438"><rect x="${r1(x - 4.4 * s)}" y="${r1(base - 4 * s)}" width="${r1(1.6 * s)}" height="${r1(4 * s)}"/><rect x="${r1(x + 2.4 * s)}" y="${r1(base - 4 * s)}" width="${r1(1.6 * s)}" height="${r1(4 * s)}"/></g></g>`
  );
}

/** 人。 */
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

/** 植民地様式のアーケード(回廊)。 */
function arcade(x, base, w, h, n = 4, wall = "#efe4cc", roofC = "#b05a3a") {
  const p = [
    `<rect x="${x}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${wall}"/>`,
    `<path d="M${r1(x - 4)},${r1(base - h)}h${w + 8}l-6,-10h${r1(-w + 4)}z" fill="${roofC}"/>`,
  ];
  const aw = (w - 8) / n;
  for (let i = 0; i < n; i++) {
    const ax = r1(x + 4 + i * aw + aw * 0.12);
    p.push(
      `<path d="M${ax},${base}v${r1(-h * 0.42)}a${r1(aw * 0.38)},${r1(aw * 0.3)} 0 0 1 ${r1(aw * 0.76)},0V${base}z" fill="#7a6a52"/>`,
    );
  }
  return p.join("");
}

/** 教会。白壁と鐘塔。 */
function iglesia(x, base, w, h, wall = "#f2ece0", roofC = "#b05a3a") {
  const tw = r1(w * 0.3);
  return (
    `<rect x="${x}" y="${r1(base - h * 0.55)}" width="${w}" height="${r1(h * 0.55)}" fill="${wall}"/>` +
    `<path d="M${r1(x - 4)},${r1(base - h * 0.55)}h${w + 8}l-7,-10h${r1(-w + 6)}z" fill="${roofC}"/>` +
    `<rect x="${r1(x + w * 0.08)}" y="${r1(base - h)}" width="${tw}" height="${h}" fill="${wall}"/>` +
    `<path d="M${r1(x + w * 0.08 - 3)},${r1(base - h)}h${r1(tw + 6)}l${r1(-tw / 2 - 3)},-11z" fill="${roofC}"/>` +
    `<path d="M${r1(x + w * 0.08 + tw / 2)},${r1(base - h - 18)}v7M${r1(x + w * 0.08 + tw / 2 - 3)},${r1(base - h - 15)}h6" stroke="#7f6a52" stroke-width="1.7" fill="none"/>` +
    `<rect x="${r1(x + w * 0.08 + tw / 2 - 3.4)}" y="${r1(base - h + 8)}" width="6.8" height="9" rx="3.4" fill="#5f4c33"/>` +
    `<rect x="${r1(x + w * 0.5)}" y="${r1(base - h * 0.42)}" width="12" height="${r1(h * 0.42)}" rx="6" fill="#6b5330"/>` +
    `<rect x="${r1(x + w * 0.74)}" y="${r1(base - h * 0.4)}" width="8" height="10" rx="4" fill="#5f7f96"/>`
  );
}

/** 街灯(欧風)。 */
function lamp(x, base, h = 26) {
  return (
    `<path d="M${x},${base}V${r1(base - h)}" stroke="#4a4438" stroke-width="2.4" fill="none"/>` +
    `<circle cx="${x}" cy="${r1(base - h - 3)}" r="3.4" fill="#f2d98a"/>`
  );
}

/** カモメ・鳥。 */
function bird(x, y, s = 1, color = "#3a3a34") {
  return `<path d="M${r1(x - 6 * s)},${y}q${r1(3 * s)},${r1(-4 * s)} ${r1(6 * s)},0q${r1(3 * s)},${r1(-4 * s)} ${r1(6 * s)},0" stroke="${color}" stroke-width="${r1(1.6 * s)}" fill="none"/>`;
}

// ---------------------------------------------------------------------------
// 背景シーン(400×210)
//
// **中央 x=151〜249 / y=54〜152 はシンボルに、(200,155)の楕円は影に隠れる。**
// 見せたいものは左右3分の1と y>170 に置く。
// ---------------------------------------------------------------------------

export const ARGENTINA_BG = {
  /**
   * 首都の港と、扇の要(ブエノスアイレス)。
   * **左に肩を並べる3つの駅(ミトレ・サンマルティン・ベルグラノ)。**
   * いまもホームを共有しない。右は穀物を吸い込む港。手前は港へ集まる線路の扇
   * ——広軌2本と、細い1000mm軌が1本、**並んでいても合流しない。**
   */
  capitalport:
    sky("#8fc4e8", "#cfe0ec", 96) +
    clouds(70, 26, 0.8) +
    clouds(320, 20, 0.6, "#f6efe2", ".6") +
    // 対岸(ラ・プラタ川は海のように広い)
    band(96, 8, "#a8b89a") +
    water(104, "#6b7f5f", "#7f9268", "#98a878") +
    swell(126, "#c2d0a8", ".4") +
    // 左:肩を並べる3つの駅。屋根の色も高さも揃っていない
    `<rect x="2" y="70" width="52" height="52" fill="#d8c8a8"/>` +
    `<path d="M2,70a26,16 0 0 1 52,0z" fill="#8a6a4a"/>` +
    `<rect x="8" y="86" width="9" height="14" rx="4.5" fill="#5f7f96"/>` +
    `<rect x="24" y="84" width="9" height="16" rx="4.5" fill="#5f7f96"/>` +
    `<rect x="40" y="86" width="9" height="14" rx="4.5" fill="#5f7f96"/>` +
    `<rect x="20" y="104" width="17" height="18" fill="#6b5330"/>` +
    `<rect x="58" y="62" width="44" height="60" fill="#c8b494"/>` +
    `<rect x="58" y="58" width="44" height="8" fill="#8a7a5f"/>` +
    `<rect x="64" y="42" width="13" height="20" fill="#c8b494"/>` +
    `<rect x="62" y="38" width="17" height="6" fill="#8a7a5f"/>` +
    `<circle cx="70.5" cy="50" r="4" fill="#f2ecdc"/>` +
    `<g fill="#5f7f96"><rect x="64" y="72" width="8" height="13"/><rect x="78" y="72" width="8" height="13"/><rect x="92" y="72" width="6" height="13"/></g>` +
    `<rect x="72" y="104" width="14" height="18" fill="#5f4c33"/>` +
    `<rect x="106" y="78" width="40" height="44" fill="#e0d0b0"/>` +
    `<path d="M102,78h48l-7,-11h-34z" fill="#a85a3a"/>` +
    `<g fill="#5f7f96"><rect x="112" y="88" width="8" height="12"/><rect x="126" y="88" width="8" height="12"/></g>` +
    `<rect x="118" y="106" width="12" height="16" fill="#6b5330"/>` +
    // 右:港。穀物エレベーターとクレーンと船
    grainElevator(300, 122, 64, 56) +
    portCrane(258, 122, 44, 0.9) +
    ship(342, 118, 0.72) +
    loadingSpout(332, 84, 348, 100) +
    bird(230, 40, 1) +
    bird(250, 32, 0.8) +
    // 手前:港へ集まる線路の扇。広軌2本+1000mm軌1本
    ground(140, "#b0a488") +
    `<path d="M0,140h400v6H0z" fill="#9a8f76"/>` +
    broadTrack(152, 0, W) +
    broadTrack(172, 0, W) +
    metreTrack(194, 0, W) +
    // 広軌と1000mm軌のあいだの緩衝(合流しないことを見せる仕切り柵)
    `<g fill="#6b5a44">${[16, 66, 116, 166, 216, 266, 316, 366]
      .map((x) => `<rect x="${x}" y="184" width="2.6" height="9"/>`)
      .join("")}</g>` +
    `<path d="M0,186h400" stroke="#8a8074" stroke-width="1.2" opacity=".8"/>` +
    boxcar(58, 172, 0.85, "#7a4a5f") +
    boxcar(348, 172, 0.85, "#3f6b5f") +
    shade(58, 172, 20, 3, ".16") +
    shade(348, 172, 20, 3, ".16") +
    tuft(206, 208, 1, "#8f9a5f", 1) +
    tuft(150, 206, 0.9, "#8f9a5f", 1),

  /**
   * パラナ川の川港(ロサリオ・サンタフェ・コリエンテスほか7都市)。
   * 崖の上のエレベーターから、土色の川に浮かぶ船へ穀物が落ちる。
   * **鉄道は連結し合わなかった競合会社の置き土産**——エレベーター脇で途切れる側線。
   */
  riverport:
    sky("#9cc8e4", "#d4e4ec", 92) +
    clouds(90, 30, 0.9) +
    clouds(300, 24, 0.7, "#f6efe2", ".65") +
    // 対岸の低い緑(中州)
    `<path d="M0,92q80,-8 190,-3q120,5 210,-4v16H0z" fill="#6b8a54"/>` +
    paranaWater(98) +
    swell(118, "#c2cf9a", ".45") +
    // 左:崖(バランカ)の上の穀物エレベーター
    `<path d="M0,98h132l-10,44H0z" fill="#a8895f"/>` +
    `<path d="M0,120h126l-4,22H0z" fill="#8f7350"/>` +
    grainElevator(6, 98, 74, 62, "#cfc8b8") +
    siloGroup(88, 98, 34, 2, 0.85) +
    loadingSpout(78, 66, 112, 92) +
    // エレベーター脇で途切れる側線と車止め
    `<path d="M4,142h108v20H4z" fill="#8f7350" opacity="0"/>` +
    // 右:接岸するはしけと引き船
    ship(330, 116, 0.6, "#5f6b7a") +
    `<path d="M252,120h56l-5,8h-46z" fill="#8a5a3a"/>` +
    `<rect x="256" y="112" width="14" height="8" fill="#c8b494"/>` +
    bird(348, 44, 1) +
    bird(368, 54, 0.8) +
    bird(210, 36, 0.9) +
    // 手前の岸。荷を待つ袋とトラック
    ground(150, "#a8925f") +
    `<path d="M0,150q100,-8 208,-2q102,6 192,-4v12H0z" fill="#97814f"/>` +
    broadTrack(166, 0, 220) +
    bufferStop(230, 176, 1) +
    boxcar(64, 174, 0.9, "#8a4a30") +
    boxcar(150, 174, 0.9, "#4f6b8a") +
    shade(64, 174, 21, 3, ".16") +
    shade(150, 174, 21, 3, ".16") +
    `<g fill="#d8c88f"><ellipse cx="300" cy="196" rx="13" ry="5"/><ellipse cx="322" cy="199" rx="11" ry="4.4"/><ellipse cx="311" cy="190" rx="9" ry="4"/></g>` +
    `<g fill="#c2b17a"><ellipse cx="352" cy="197" rx="12" ry="4.6"/><ellipse cx="366" cy="191" rx="8" ry="3.6"/></g>` +
    person(272, 202, 22, "#3f6f9a") +
    arm(274, 188, 10, 4) +
    tuft(26, 206, 1, "#8f9a5f", 1) +
    tuft(238, 205, 0.9, "#8f9a5f", 1),

  /**
   * プナの高原(サンアントニオ・デ・ロス・コブレス、フマワカ)。
   * 標高3700m。カルドンとリャマと日干しレンガの家、遠くに色の縞の丘。
   * 右奥には**鉱石を運ぶトラックの土煙**——鉄道が運ぶはずだった荷。
   */
  punaplateau:
    sky("#7fb8dc", "#cfe0e4", 84) +
    sun(340, 26, 12, "#f6e8c8") +
    // 色の縞の丘(赤・オークル・緑)
    `<path d="M0,84L46,52L96,84z" fill="#a85a3a"/>` +
    `<path d="M8,84L46,60L84,84z" fill="#c27a4a"/>` +
    `<path d="M60,84L118,46L180,84z" fill="#8f6b4f"/>` +
    `<path d="M84,84L118,58L156,84z" fill="#b08a52"/>` +
    `<path d="M230,84L288,50L348,84z" fill="#9a5f44"/>` +
    `<path d="M256,84L288,60L322,84z" fill="#7f8a54"/>` +
    `<path d="M310,84L368,54L400,78V84z" fill="#b06a42"/>` +
    band(84, 10, "#c2996b") +
    ground(94, "#cfa878") +
    `<path d="M0,94q90,6 200,2q110,-4 200,3v10H0z" fill="#c29a68"/>` +
    // 塩湖のきらめき(左遠景)
    `<path d="M6,112q34,-4 66,0q-30,5 -66,0z" fill="#eee8dc"/>` +
    `<path d="M20,118q22,-3 42,0q-20,4 -42,0z" fill="#e4dccc" opacity=".8"/>` +
    // 右:日干しレンガの家並み
    `<rect x="300" y="102" width="40" height="26" fill="#c08a58"/>` +
    `<rect x="296" y="98" width="48" height="6" fill="#9a6b42"/>` +
    `<rect x="312" y="112" width="11" height="16" fill="#6b4a30"/>` +
    `<rect x="348" y="106" width="34" height="22" fill="#b58152"/>` +
    `<rect x="344" y="102" width="42" height="6" fill="#8f6240"/>` +
    `<rect x="356" y="114" width="9" height="14" fill="#6b4a30"/>` +
    `<rect x="332" y="94" width="7" height="10" fill="#8f6240"/>` +
    // 左:カルドンの群れ
    cardon(28, 160, 42) +
    cardon(66, 148, 30) +
    cardon(96, 158, 24) +
    shade(28, 161, 9, 2.4, ".16") +
    // 鉱石トラックの土煙(右奥)
    `<g fill="#d8c2a0" opacity=".7"><ellipse cx="262" cy="120" rx="14" ry="5"/><ellipse cx="278" cy="116" rx="10" ry="4"/></g>` +
    `<rect x="284" y="112" width="18" height="8" fill="#8a6b4a"/>` +
    `<rect x="298" y="108" width="8" height="6" fill="#6b5a44"/>` +
    `<g fill="#33302c"><circle cx="289" cy="121" r="2.6"/><circle cx="300" cy="121" r="2.6"/></g>` +
    // 手前:リャマの群れと1000mm軌
    ground(168, "#b8925f") +
    metreTrack(176, 0, W) +
    llama(60, 206, 1.3) +
    llama(96, 202, 1.1) +
    llama(126, 207, 0.95) +
    shade(60, 207, 12, 2.8, ".16") +
    shade(96, 203, 10, 2.4, ".16") +
    tuft(180, 206, 1, "#a8925f", 1) +
    tuft(316, 204, 1.1, "#a8925f", 1) +
    tuft(354, 208, 0.9, "#a8925f", 1) +
    `<g fill="#8f7350"><circle cx="252" cy="200" r="3"/><circle cx="270" cy="206" r="2.4"/><circle cx="336" cy="199" r="2.6"/></g>`,

  /**
   * パタゴニアのステップ(エスケル・ハコバッシ・コモドロ・リオガジェゴス)。
   * 風がすべてを西から東へ寝かせる。柵と電信柱と羊、
   * そして**旅客が消えた線路の終わりに立つ車止め。**廃墟は描かない。
   */
  patagoniasteppe:
    sky("#9cb8c8", "#d8dcd4", 90) +
    // レンズ雲(強風の印)
    `<g fill="#eef0ec" opacity=".85"><ellipse cx="90" cy="34" rx="52" ry="7"/><ellipse cx="104" cy="26" rx="34" ry="5"/><ellipse cx="300" cy="46" rx="60" ry="8"/><ellipse cx="318" cy="37" rx="38" ry="5.4"/></g>` +
    // 遠くの台地(メセタ)
    `<path d="M0,90h96l8,-14h44l8,14h244v8H0z" fill="#8f9484"/>` +
    band(90, 12, "#a8ab94" ) +
    ground(102, "#b0a884") +
    `<path d="M0,102q100,8 210,3q100,-4 190,4v12H0z" fill="#a89e7c"/>` +
    // 中景:羊の群れと針金の柵
    wireFence(0, 400, 138, 11) +
    sheep(48, 132, 1) +
    sheep(76, 128, 0.85) +
    sheep(100, 133, 0.9) +
    sheep(320, 130, 0.95) +
    sheep(348, 134, 0.8) +
    // 電信柱は全部風下(右)に傾く
    telegraphPoles([30, 120, 290, 380], 130, 34, 5) +
    // 手前:途切れる線路と車止め
    ground(158, "#a09572") +
    metreTrack(172, 0, 306) +
    bufferStop(318, 182, 1.15) +
    shade(318, 184, 16, 3, ".18") +
    // 車止めの先には何もない——草だけ
    tuft(348, 196, 1.2, "#b0a468", 4) +
    tuft(372, 202, 1, "#b0a468", 4) +
    tuft(390, 194, 0.9, "#b0a468", 4) +
    tuft(20, 202, 1.2, "#b0a468", 4) +
    tuft(64, 206, 1, "#b0a468", 4) +
    tuft(122, 200, 1.1, "#b0a468", 4) +
    tuft(160, 207, 0.9, "#b0a468", 4) +
    tuft(250, 204, 1, "#b0a468", 4) +
    // 風に飛ぶ砂
    `<g stroke="#c2b894" stroke-width="1.4" opacity=".6" fill="none"><path d="M20,150q30,-2 56,1M240,146q26,-2 48,1M120,156q22,-2 40,1"/></g>` +
    bird(200, 30, 1.1) +
    bird(222, 38, 0.9),

  /**
   * 定規で引かれた州都(ラ・プラタ)。
   * **建物より先に道があった。**斜めの大通りが一点へ収束し、
   * 左に大聖堂の双塔、並木と街灯が遠近をなぞる。
   */
  planneddiagonals:
    sky("#a8c8e0", "#dce8ec", 112) +
    clouds(310, 30, 0.8) +
    // 奥の街並み(通りの消失点の両側)
    `<g fill="#c8bca8"><rect x="120" y="64" width="30" height="24"/><rect x="252" y="60" width="34" height="28"/><rect x="292" y="68" width="26" height="20"/></g>` +
    `<g fill="#b0a48e"><rect x="152" y="70" width="22" height="18"/><rect x="228" y="66" width="22" height="22"/></g>` +
    // 左:大聖堂(ネオゴシックの双塔)
    `<rect x="14" y="52" width="66" height="60" fill="#b58a6b"/>` +
    `<path d="M20,52v-22l7,-10l7,10v22z" fill="#a87a5c"/>` +
    `<path d="M60,52v-22l7,-10l7,10v22z" fill="#a87a5c"/>` +
    `<path d="M27,20v-8M67,20v-8" stroke="#8f6242" stroke-width="2" fill="none"/>` +
    `<g fill="#5f4c33"><rect x="23" y="36" width="8" height="14" rx="4"/><rect x="63" y="36" width="8" height="14" rx="4"/><rect x="40" y="64" width="14" height="26" rx="7"/></g>` +
    `<circle cx="47" cy="44" r="7" fill="#e8dcc8"/>` +
    `<g stroke="#8f6242" stroke-width="1.4" fill="none"><circle cx="47" cy="44" r="4"/><path d="M47,37v14M40,44h14"/></g>` +
    `<g fill="#5f7f96"><rect x="20" y="86" width="9" height="16" rx="4.5"/><rect x="66" y="86" width="9" height="16" rx="4.5"/></g>` +
    // 右:碁盤目の公共建築(自然史博物館ふう)
    `<rect x="322" y="70" width="72" height="42" fill="#d8c8a8"/>` +
    `<path d="M318,70h80l-8,-12h-64z" fill="#9a8a6a"/>` +
    `<g fill="#8a7a5f"><rect x="330" y="80" width="7" height="32"/><rect x="346" y="80" width="7" height="32"/><rect x="362" y="80" width="7" height="32"/><rect x="378" y="80" width="7" height="32"/></g>` +
    // 地面と、収束する斜めの大通り
    ground(112, "#9aa878") +
    `<path d="M186,112L0,210H140L212,112z" fill="#b8b0a0"/>` +
    `<path d="M214,112L260,210H400V196L232,112z" fill="#b8b0a0"/>` +
    `<path d="M198,112L60,210h60L214,112z" fill="#cfc8b8"/>` +
    `<path d="M220,112L300,210h56L236,112z" fill="#cfc8b8"/>` +
    // 通りを縁取る並木(遠→近で大きく)
    `<g fill="#4f7f3f"><ellipse cx="150" cy="132" rx="9" ry="11"/><ellipse cx="108" cy="150" rx="12" ry="15"/><ellipse cx="56" cy="174" rx="16" ry="19"/><ellipse cx="262" cy="132" rx="9" ry="11"/><ellipse cx="304" cy="150" rx="12" ry="15"/><ellipse cx="356" cy="174" rx="16" ry="19"/></g>` +
    `<g fill="#6b5a44"><rect x="148" y="140" width="4" height="10"/><rect x="106" y="162" width="5" height="13"/><rect x="53" y="190" width="6" height="16"/><rect x="260" y="140" width="4" height="10"/><rect x="302" y="162" width="5" height="13"/><rect x="353" y="190" width="6" height="16"/></g>` +
    lamp(130, 152, 20) +
    lamp(88, 172, 26) +
    lamp(282, 152, 20) +
    lamp(324, 172, 26) +
    // 手前:斜めに交わるタイル
    `<g stroke="#8a9a6a" stroke-width="1.6" opacity=".7" fill="none"><path d="M0,196L120,150M400,188L268,148M30,210L150,158M368,210L252,156"/></g>`,

  /**
   * 植民地時代の広場(コルドバ・サルタ・トゥクマンほか9都市)。
   * 白い回廊と鐘塔、オレンジの街路樹、広場のタイル。
   * 内陸の古い町のいちばん共有された顔。
   */
  colonialplaza:
    sky("#a4cbe4", "#e0e8e4", 92) +
    clouds(84, 28, 0.8) +
    sun(354, 30, 11, "#f6e8c8") +
    hills(92, "#8f9a6f", 3) +
    ground(92, "#c8b894") +
    // 左:教会
    iglesia(10, 128, 84, 92) +
    // 右:回廊(カビルド)
    arcade(276, 128, 118, 52, 5) +
    `<rect x="276" y="66" width="118" height="10" fill="#d8c8a8" opacity="0"/>` +
    `<g fill="#5f7f96"><rect x="292" y="86" width="9" height="12"/><rect x="316" y="86" width="9" height="12"/><rect x="340" y="86" width="9" height="12"/><rect x="364" y="86" width="9" height="12"/></g>` +
    `<rect x="272" y="76" width="126" height="6" fill="#a08a64"/>` +
    `<rect x="276" y="82" width="118" height="46" fill="#efe4cc" opacity="0"/>` +
    // 広場
    ground(128, "#cfc0a0") +
    `<g stroke="#b8a888" stroke-width="2" opacity=".8" fill="none"><path d="M0,142h400M0,160h400M0,182h400"/><path d="M60,128L20,210M180,128L160,210M240,128L262,210M340,128L378,210"/></g>` +
    // 中央の噴水は駒に隠れる位置なので、代わりに左右へ主役を置く
    `<g fill="#3f6b3a"><ellipse cx="66" cy="146" rx="17" ry="14"/><ellipse cx="118" cy="140" rx="13" ry="11"/><ellipse cx="332" cy="146" rx="17" ry="14"/><ellipse cx="286" cy="140" rx="13" ry="11"/></g>` +
    `<g fill="#e8943f"><circle cx="60" cy="142" r="2.2"/><circle cx="72" cy="148" r="2.2"/><circle cx="114" cy="138" r="2"/><circle cx="326" cy="144" r="2.2"/><circle cx="338" cy="150" r="2.2"/><circle cx="290" cy="137" r="2"/></g>` +
    `<g fill="#6b5a44"><rect x="63" y="156" width="5" height="12"/><rect x="115" y="148" width="4.4" height="10"/><rect x="329" y="156" width="5" height="12"/><rect x="283" y="148" width="4.4" height="10"/></g>` +
    lamp(150, 168, 24) +
    lamp(250, 168, 24) +
    // ベンチと人
    `<g fill="#8a6a4a"><rect x="30" y="184" width="34" height="5"/><rect x="33" y="189" width="4" height="8"/><rect x="57" y="189" width="4" height="8"/></g>` +
    `<g fill="#8a6a4a"><rect x="336" y="184" width="34" height="5"/><rect x="339" y="189" width="4" height="8"/><rect x="363" y="189" width="4" height="8"/></g>` +
    person(90, 206, 24, "#c8452f") +
    person(310, 204, 23, "#3f6f9a") +
    arm(312, 190, 9, 5) +
    bird(196, 44, 0.9) +
    `<g fill="#9a948a"><circle cx="206" cy="196" r="1.6"/><circle cx="214" cy="200" r="1.4"/><circle cx="188" cy="199" r="1.5"/></g>`,

  /**
   * 大西洋岸のリゾート(マル・デル・プラタ、ネコチェア)。
   * **縞のカルパ(貸しテント)の列**が浜を埋める。崖の上に夏の別荘、
   * 沖にはトロール船——1月は行楽客、残りの季節は魚の町。
   */
  atlanticresort:
    sky("#8fc4e8", "#cfe4f0", 90) +
    sun(52, 30, 13) +
    clouds(150, 26, 0.7, "#f6efe2", ".7") +
    water(90, "#2f6f96", "#3f8fae", "#57a8c0") +
    swell(112) +
    // 沖のトロール船
    `<path d="M310,96h34l-4,7h-27z" fill="#c8452f"/>` +
    `<rect x="316" y="88" width="10" height="8" fill="#e8e0cc"/>` +
    `<path d="M330,96V82" stroke="#5f5a4a" stroke-width="1.6" fill="none"/>` +
    bird(300, 46, 1) +
    bird(322, 38, 0.8) +
    bird(60, 56, 0.9) +
    // 右:崖と夏の別荘
    `<path d="M400,80h-96l-14,16l-6,20l116,10z" fill="#b08a5f"/>` +
    `<path d="M400,96h-88l-10,12l98,12z" fill="#9a744a"/>` +
    `<rect x="330" y="58" width="46" height="30" fill="#e8dcc0"/>` +
    `<path d="M324,58h58l-12,-16h-34z" fill="#8f4a38"/>` +
    `<g fill="#5f7f96"><rect x="337" y="66" width="9" height="12"/><rect x="356" y="66" width="9" height="12"/></g>` +
    `<rect x="345" y="78" width="10" height="10" fill="#6b5330"/>` +
    `<path d="M382,44v-8" stroke="#5f5a4a" stroke-width="2" fill="none"/>` +
    // 浜
    `<path d="M0,132q110,-10 220,-4q100,5 180,-2V210H0z" fill="#e8d8ae"/>` +
    `<path d="M0,128q90,-6 190,-2q110,5 210,-3v10q-100,7 -210,2q-100,-4 -190,3z" fill="#f2ecd8" opacity=".8"/>` +
    // 縞のカルパの列(2列。遠→近)
    `<g>${[30, 82, 134, 268, 320]
      .map(
        (x) =>
          `<path d="M${x},156l14,-14l14,14z" fill="#e05a4a"/><path d="M${x + 4},156l10,-10l10,10z" fill="#f2ece0"/><rect x="${x + 2}" y="156" width="24" height="3" fill="#b84838"/>`,
      )
      .join("")}</g>` +
    `<g>${[6, 60, 118, 246, 300, 352]
      .map(
        (x) =>
          `<path d="M${x},190l17,-18l17,18z" fill="#3f7fae"/><path d="M${x + 5},190l12,-13l12,13z" fill="#f2ece0"/><rect x="${x + 2}" y="190" width="30" height="4" fill="#2f6288"/>`,
      )
      .join("")}</g>` +
    // 人:浜を歩く2人とパラソル
    person(190, 208, 24, "#f5b31c") +
    person(216, 206, 22, "#c8452f") +
    `<path d="M96,206q0,-24 0,-26m-13,4a13,7 0 0 1 26,0z" stroke="#5f5a4a" stroke-width="2" fill="#e8943f"/>` +
    shade(190, 208, 10, 2.4, ".14") +
    shade(216, 206, 9, 2.2, ".14"),

  /**
   * 海軍基地の湾(バイア・ブランカ)。
   * 灰色の艦と穀物埠頭が同じ深い水を分け合う。**軍港と穀物港が隣り合う町。**
   */
  navybase:
    sky("#93b4c8", "#d0dce0", 94) +
    clouds(90, 32, 0.85, "#e8ecec", ".7") +
    water(94, "#3f5f78", "#4f7290", "#6b8fa8") +
    swell(116, "#a8c8d8", ".45") +
    // 左:灰色の艦(輪郭で語る。兵装は最小限)
    `<path d="M8,122h120l-10,12H20z" fill="#7f8a94"/>` +
    `<rect x="8" y="118" width="120" height="5" fill="#5f6a74"/>` +
    `<rect x="40" y="96" width="34" height="22" fill="#8f9aa4"/>` +
    `<rect x="52" y="84" width="12" height="12" fill="#7f8a94"/>` +
    `<path d="M58,84v-12M52,76h12" stroke="#5f6a74" stroke-width="2" fill="none"/>` +
    `<g fill="#3f4a56"><rect x="44" y="100" width="6" height="5"/><rect x="56" y="100" width="6" height="5"/><rect x="68" y="100" width="5" height="5"/></g>` +
    `<rect x="88" y="104" width="22" height="14" fill="#8f9aa4"/>` +
    `<path d="M20,118l14,-8h10l-8,8z" fill="#6b7680"/>` +
    // 右:穀物埠頭
    grainElevator(322, 132, 60, 66, "#c8c2b4") +
    portCrane(288, 132, 40, 0.85, "#8a6a4a") +
    loadingSpout(352, 92, 366, 110) +
    ship(372, 128, 0.5, "#5f6b7a") +
    bird(180, 40, 1) +
    bird(206, 50, 0.85) +
    bird(232, 34, 0.8) +
    // 手前の岸壁
    ground(148, "#8f8a7c") +
    `<path d="M0,148h400v7H0z" fill="#6f6a5e"/>` +
    `<g fill="#5f5a50">${[40, 130, 270, 360]
      .map((x) => `<path d="M${x},155a6,6 0 0 1 12,0v4h-12z"/>`)
      .join("")}</g>` +
    broadTrack(170, 0, W) +
    boxcar(80, 192, 1, "#5f6b7a") +
    boxcar(330, 192, 1, "#8a4a30") +
    shade(80, 193, 23, 3.4, ".16") +
    shade(330, 193, 23, 3.4, ".16") +
    person(180, 208, 23, "#3a4a3a") +
    person(238, 207, 22, "#e0d8c8") +
    `<g fill="#d8c88f"><ellipse cx="150" cy="204" rx="11" ry="4"/><ellipse cx="166" cy="208" rx="9" ry="3.6"/></g>`,

  /**
   * パンパの町(フニン・ペルガミノ・タンディルほか8都市)。
   * どこまでも平らな地平線に、サイロと風車と駅と1本のオンブー。
   * **鉄道がこの平原の富を港へ吸い上げた**——駅は町のへそ。
   */
  pampatown:
    sky("#9cc8e4", "#e4ecdc", 96) +
    sun(58, 30, 12, "#f6e8c8") +
    pampaClouds(40) +
    // 小麦とトウモロコシの帯(地平線がどこまでも平ら)
    band(96, 10, "#c8b45f") +
    band(106, 8, "#d8c46b") +
    `<g stroke="#b8a44f" stroke-width="1.8" opacity=".8" fill="none">${[12, 40, 68, 96, 124, 276, 304, 332, 360, 388]
      .map((x) => `<path d="M${x},114v-8"/>`)
      .join("")}</g>` +
    ground(114, "#a8b874") +
    `<path d="M0,114q100,6 200,3q100,-3 200,4v10H0z" fill="#98a868"/>` +
    // 左:サイロの組と風車
    siloGroup(18, 118, 52, 3, 1.1) +
    molino(108, 122, 44, 1) +
    shade(38, 119, 30, 4, ".14") +
    // 右:駅舎(英国風の煉瓦)とオンブー
    `<rect x="296" y="88" width="62" height="34" fill="#a85a3a"/>` +
    `<path d="M290,88h74l-8,-12h-58z" fill="#6b4a30"/>` +
    `<rect x="288" y="118" width="78" height="5" fill="#8f8a7c"/>` +
    `<g fill="#f2e8d0"><rect x="304" y="96" width="9" height="13"/><rect x="322" y="96" width="9" height="13"/><rect x="340" y="96" width="9" height="13"/></g>` +
    `<rect x="320" y="108" width="13" height="14" fill="#5f4c33"/>` +
    ombu(384, 122, 0.85) +
    // 手前:広軌の本線
    ground(146, "#a89a72") +
    broadTrack(158, 0, W) +
    wireFence(0, 400, 196, 10) +
    boxcar(66, 180, 0.95, "#8a4a30") +
    boxcar(148, 180, 0.95, "#3f6b5f") +
    shade(66, 181, 22, 3.2, ".16") +
    shade(148, 181, 22, 3.2, ".16") +
    // 荷を待つ牛乳缶(スンチャレス)と穀物袋
    `<g fill="#c8ccd0"><rect x="252" y="186" width="7" height="12" rx="2.4"/><rect x="262" y="186" width="7" height="12" rx="2.4"/></g>` +
    `<g fill="#d8c88f"><ellipse cx="290" cy="196" rx="10" ry="4"/><ellipse cx="304" cy="199" rx="8" ry="3.4"/></g>` +
    person(330, 208, 24, "#c8452f") +
    arm(332, 194, 10, -3) +
    tuft(28, 206, 1, "#8f9a5f", 1) +
    tuft(226, 205, 0.9, "#8f9a5f", 1) +
    bird(230, 36, 1) +
    bird(254, 46, 0.8),

  /**
   * 川岸の一貫製鉄所(サンニコラス)。
   * 高炉と赤い熱、鉱石の山、川へ突き出す桟橋。**国家が建てた最大の炉。**
   */
  steelmill:
    sky("#8f9aa8", "#c8beac", 88) +
    // 煙が空を濁す
    plume(66, 44, 30, 1.2, "#b8b2a8", ".8") +
    plume(120, 52, 24, 0.9, "#c8c2b4", ".7") +
    paranaWater(88) +
    swell(104, "#c2cf9a", ".35") +
    // 左〜中央:製鉄所の構造物
    `<rect x="6" y="52" width="26" height="70" fill="#6f6a5e"/>` +
    `<rect x="6" y="48" width="26" height="6" fill="#524e44"/>` +
    `<path d="M56,122V64l14,-14l14,14v58z" fill="#7a746a"/>` +
    `<rect x="63" y="44" width="14" height="10" fill="#524e44"/>` +
    `<path d="M32,86h24v6H32z" fill="#5f5a50"/>` +
    `<rect x="100" y="70" width="40" height="52" fill="#8a857a"/>` +
    `<rect x="100" y="66" width="40" height="6" fill="#6f6a5e"/>` +
    `<g fill="#e8763f"><rect x="108" y="102" width="8" height="12"/><rect x="122" y="102" width="8" height="12"/></g>` +
    `<rect x="116" y="40" width="9" height="30" fill="#6f6a5e"/>` +
    // 右:鉱石と石炭の山、積み出し桟橋
    `<path d="M300,122l24,-26l26,26z" fill="#8f5f44"/>` +
    `<path d="M340,122l20,-20l22,20z" fill="#4a4438"/>` +
    portCrane(374, 122, 36, 0.7, "#8f6242") +
    ship(310, 108, 0.5, "#5f6b7a") +
    // 手前の構内
    ground(140, "#8f887a") +
    `<path d="M0,140h400v6H0z" fill="#736e62"/>` +
    broadTrack(154, 0, W) +
    // トーピードカー(溶銑を運ぶ長い貨車)
    `<g><path d="M60,182a16,10 0 0 1 32,0z" fill="#5f5a50" transform="rotate(180 76 177)"/><rect x="52" y="168" width="48" height="6" fill="#4a4438"/><g fill="#33302c"><circle cx="62" cy="178" r="3.4"/><circle cx="90" cy="178" r="3.4"/></g><circle cx="76" cy="170" r="5" fill="#e8763f"/></g>` +
    boxcar(320, 178, 0.95, "#5f5a50") +
    shade(320, 179, 22, 3.2, ".18") +
    // 火の粉と作業者(遠目)
    `<g fill="#f5b31c"><circle cx="112" cy="130" r="1.6"/><circle cx="120" cy="126" r="1.2"/><circle cx="106" cy="124" r="1.2"/></g>` +
    person(160, 206, 22, "#e8943f") +
    person(250, 207, 22, "#5f6b7a") +
    arm(162, 193, 9, 4) +
    `<g stroke="#8a8074" stroke-width="1.4" opacity=".6" fill="none"><path d="M180,196h44M188,202h30"/></g>`,

  /**
   * 赤い渓谷(ラ・リオハ=タランパージャ)。
   * 風と鉄砲水が刻んだ垂直の壁。谷底は乾いた川床。人工物はほぼ無い。
   */
  redcanyon:
    sky("#a8c4d8", "#e4d8c0", 80) +
    sun(200, 26, 11, "#f6e8c8") +
    // 奥の谷の出口(地面は崖より先に塗る)
    band(80, 22, "#d8b088") +
    ground(102, "#d0a878") +
    `<path d="M0,102q110,8 200,4q110,-4 200,5v12H0z" fill="#c49868"/>` +
    // 左右の絶壁(赤い砂岩の柱)。地面の上に立てる
    `<path d="M0,210V36h58l14,26l-8,20l10,34l-6,94z" fill="#b0563a"/>` +
    `<path d="M0,210V60h30l10,40l-6,110z" fill="#c26b44"/>` +
    `<g stroke="#8f4530" stroke-width="2.4" opacity=".7" fill="none"><path d="M22,60v130M44,80v112M60,52v60"/></g>` +
    `<path d="M400,210V30h-64l-12,30l10,24l-12,38l8,88z" fill="#a84f34"/>` +
    `<path d="M400,210V56h-36l-8,36l8,118z" fill="#bd6540"/>` +
    `<g stroke="#8f4530" stroke-width="2.4" opacity=".7" fill="none"><path d="M376,56v144M352,72v128M338,44v52"/></g>` +
    // 谷底:乾いた川床の蛇行
    `<path d="M74,210q30,-36 86,-42q76,-8 130,8q46,14 40,34z" fill="#e0c49c"/>` +
    `<path d="M104,210q34,-24 90,-30q64,-6 108,10q24,10 24,20z" fill="#eed8b4" opacity=".8"/>` +
    `<g fill="#a8825c"><circle cx="120" cy="196" r="3"/><circle cx="160" cy="188" r="2.4"/><circle cx="250" cy="192" r="2.8"/><circle cx="300" cy="200" r="2.2"/></g>` +
    // 崖の横縞(堆積の層)
    `<g stroke="#c98055" stroke-width="1.8" opacity=".6" fill="none"><path d="M0,90h64M0,124h58M0,158h54M400,84h-70M400,118h-62M400,152h-58"/></g>` +
    // 岩の上の低木とグアナコ
    `<g fill="#7f8a54"><ellipse cx="96" cy="150" rx="8" ry="4.4"/><ellipse cx="316" cy="158" rx="9" ry="4.6"/><ellipse cx="130" cy="170" rx="7" ry="3.6"/><ellipse cx="230" cy="176" rx="7" ry="3.4"/><ellipse cx="180" cy="182" rx="6" ry="3"/></g>` +
    cardon(108, 186, 26, "#6b8a4f") +
    cardon(302, 178, 20, "#6b8a4f") +
    shade(108, 187, 7, 1.8, ".14") +
    llama(74, 178, 0.9, "#b08a5f") +
    llama(146, 186, 0.75, "#c9a877") +
    shade(74, 179, 8, 2, ".16") +
    shade(146, 187, 7, 1.8, ".14") +
    // 崩れ落ちた岩塊
    `<g fill="#9a4f34"><circle cx="68" cy="196" r="4.4"/><circle cx="212" cy="202" r="3.6"/><circle cx="330" cy="192" r="4"/><circle cx="366" cy="204" r="3.4"/></g>` +
    `<g fill="#b56a44"><circle cx="60" cy="200" r="2.4"/><circle cx="222" cy="206" r="2"/><circle cx="340" cy="198" r="2.2"/></g>` +
    bird(200, 46, 1.2) +
    bird(178, 56, 0.8) +
    bird(224, 40, 0.9) +
    tuft(280, 176, 0.9, "#a8925f", 1) +
    tuft(196, 190, 0.8, "#a8925f", 1) +
    tuft(346, 190, 1, "#a8925f", 1),

  /**
   * 高地のぶどうの谷(カファジャテ・サンラファエル)。
   * アセキアの水路が畑の縁を走り、ポプラの防風林、奥にアンデス。
   * **空からは雨が来ない土地の緑。**
   */
  vineyardvalley:
    sky("#8fc0dc", "#e0e4d4", 86) +
    sun(342, 28, 12, "#f6e8c8") +
    snowRidge(86, 44, "#8a8ea0", 2) +
    band(86, 8, "#b09a74") +
    ground(94, "#b8a070") +
    // ポプラの防風林(畑の奥の縁)
    `<g>${[24, 44, 64, 84, 104, 296, 316, 336, 356, 376]
      .map((x) => poplar(x, 116, 34))
      .join("")}</g>` +
    // ぶどうの畝(遠近で間隔が開く)
    ground(118, "#c2a878") +
    `<g stroke="#5f8a4f" stroke-width="5" fill="none" stroke-linecap="round"><path d="M0,132q100,-4 200,-2q100,2 200,-1"/><path d="M0,150q100,-5 200,-2q100,2 200,-2"/><path d="M0,172q100,-6 200,-3q100,3 200,-2"/><path d="M0,198q100,-7 200,-3q100,3 200,-3"/></g>` +
    `<g stroke="#4a7a42" stroke-width="2" opacity=".8" fill="none">${[30, 90, 150, 250, 310, 370]
      .map((x) => `<path d="M${x},132v-8M${x + 14},150v-9M${x - 10},172v-10M${x + 6},198v-11"/>`)
      .join("")}</g>` +
    // アセキア(左手前を走る水路)
    `<path d="M0,182q60,-6 120,10q40,10 60,18H0z" fill="#8a7350"/>` +
    `<path d="M4,188q56,-6 110,9q36,9 52,13l-6,0q-40,-8 -60,-12q-50,-12 -96,-6z" fill="#6ba8c0"/>` +
    `<g stroke="#a8d0dc" stroke-width="1.4" opacity=".8" fill="none"><path d="M20,192q20,-2 40,2M70,200q16,2 30,5"/></g>` +
    // 収穫かごと人
    `<g fill="#a8823f"><path d="M330,196a9,9 0 0 0 18,0v-5h-18z"/><path d="M354,200a8,8 0 0 0 16,0v-4h-16z"/></g>` +
    `<g fill="#6b3a5f"><circle cx="335" cy="191" r="1.8"/><circle cx="341" cy="189" r="1.8"/><circle cx="345" cy="192" r="1.8"/></g>` +
    person(310, 207, 24, "#c8452f") +
    arm(312, 192, 11, 4) +
    person(374, 205, 22, "#e0d8c8") +
    shade(310, 208, 10, 2.4, ".14") +
    bird(120, 40, 0.9) +
    bird(146, 32, 0.8),

  /**
   * イグアスの密林(プエルト・イグアス)。
   * **275の滝の壁**が奥に立ち、霧が上がる。手前は遊歩道(パサレラ)。
   * 三国国境の川の合流も対岸の緑で暗示する。
   */
  iguazujungle:
    sky("#9cc4d8", "#d4e4dc", 56) +
    // 滝の上の密林の縁
    `<path d="M0,56${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(() => "q16,-12 32,0").join("")}v14H0z" fill="#3f6b4a"/>` +
    band(64, 54, "#2f5244") +
    // 白い滝の列(左右3分の1に主役を置く。中央は駒に隠れる)
    `<g fill="#e8f0ec"><rect x="4" y="66" width="18" height="52"/><rect x="30" y="66" width="10" height="52"/><rect x="48" y="66" width="22" height="52"/><rect x="78" y="66" width="12" height="52"/><rect x="98" y="66" width="20" height="52"/><rect x="126" y="66" width="10" height="52"/><rect x="258" y="66" width="14" height="52"/><rect x="280" y="66" width="20" height="52"/><rect x="308" y="66" width="10" height="52"/><rect x="326" y="66" width="22" height="52"/><rect x="356" y="66" width="12" height="52"/><rect x="376" y="66" width="20" height="52"/></g>` +
    `<g fill="#c2d8d0" opacity=".9"><rect x="10" y="66" width="4" height="52"/><rect x="56" y="66" width="5" height="52"/><rect x="104" y="66" width="4" height="52"/><rect x="286" y="66" width="5" height="52"/><rect x="334" y="66" width="5" height="52"/><rect x="382" y="66" width="4" height="52"/></g>` +
    band(64, 4, "#f2f8f4") +
    // 滝壺の霧と水面
    water(118, "#3f7a86", "#4f8f96", "#68a8aa") +
    `<g fill="#eef4f0" opacity=".85"><ellipse cx="56" cy="120" rx="52" ry="8"/><ellipse cx="330" cy="120" rx="56" ry="9"/><ellipse cx="30" cy="110" rx="20" ry="6"/><ellipse cx="368" cy="108" rx="18" ry="6"/></g>` +
    swell(138, "#bfe0dc", ".5") +
    // 密林(画面の隅だけから抱き込む)
    `<path d="M0,210V128q26,-10 46,4q16,12 12,34q-6,30 -58,44z" fill="#2d6b42"/>` +
    `<g fill="#3f8052"><ellipse cx="20" cy="136" rx="17" ry="11"/><ellipse cx="36" cy="158" rx="15" ry="11"/></g>` +
    `<path d="M400,210V124q-28,-8 -46,6q-14,12 -10,34q6,30 56,46z" fill="#2d6b42"/>` +
    `<g fill="#3f8052"><ellipse cx="380" cy="134" rx="16" ry="11"/><ellipse cx="366" cy="156" rx="14" ry="10"/></g>` +
    `<g fill="#4f9a5f"><path d="M46,178q16,-14 32,-7q-14,12 -32,7z"/><path d="M354,180q-16,-14 -32,-7q14,12 32,7z"/></g>` +
    // 手前:水面すれすれの遊歩道
    ground(178, "#68a8aa") +
    `<rect x="0" y="182" width="400" height="7" fill="#8a6a4a"/>` +
    `<rect x="0" y="189" width="400" height="3" fill="#5f4c33"/>` +
    `<g fill="#5f4c33">${[20, 70, 120, 170, 220, 270, 320, 370]
      .map((x) => `<rect x="${x}" y="192" width="4" height="16"/>`)
      .join("")}</g>` +
    `<g stroke="#8a6a4a" stroke-width="2.2" fill="none"><path d="M0,172h400M0,176h400"/></g>` +
    `<g stroke="#6b5330" stroke-width="1.8" fill="none">${[40, 130, 260, 350]
      .map((x) => `<path d="M${x},182v-10"/>`)
      .join("")}</g>` +
    person(100, 180, 22, "#f5b31c") +
    person(296, 180, 22, "#3f6f9a") +
    arm(298, 167, 9, -4) +
    // 虹(滝の霧に)
    `<path d="M290,96a48,48 0 0 1 96,4" stroke="#e8a898" stroke-width="3" opacity=".55" fill="none"/>` +
    `<path d="M294,98a44,44 0 0 1 88,4" stroke="#f2d98a" stroke-width="2.6" opacity=".5" fill="none"/>` +
    bird(180, 40, 1) +
    bird(206, 30, 0.9),

  /**
   * 彫刻の町(レシステンシア)。
   * 白い彫刻が並ぶ街路。**完成した作品はそのまま外に残る。**
   * 台座と作品を通りの左右に(中央は駒に隠れるため空ける)。
   */
  sculpturecity:
    sky("#a8c8dc", "#e4e8dc", 118) +
    clouds(96, 30, 0.8) +
    sun(348, 26, 10, "#f6e8c8") +
    // 街並み(低い商店)
    `<g fill="#d8c8a8"><rect x="6" y="66" width="60" height="52"/><rect x="86" y="74" width="52" height="44"/></g>` +
    `<g fill="#b05a3a"><rect x="2" y="60" width="68" height="8"/><rect x="82" y="68" width="60" height="8"/></g>` +
    `<g fill="#5f7f96"><rect x="16" y="80" width="10" height="14"/><rect x="38" y="80" width="10" height="14"/><rect x="96" y="86" width="9" height="12"/><rect x="116" y="86" width="9" height="12"/></g>` +
    `<g fill="#e0d0b0"><rect x="270" y="70" width="56" height="48"/><rect x="340" y="64" width="54" height="54"/></g>` +
    `<g fill="#8a6a4a"><rect x="266" y="64" width="64" height="8"/><rect x="336" y="58" width="62" height="8"/></g>` +
    `<g fill="#5f7f96"><rect x="280" y="82" width="9" height="13"/><rect x="300" y="82" width="9" height="13"/><rect x="350" y="78" width="10" height="14"/><rect x="372" y="78" width="10" height="14"/></g>` +
    ground(118, "#b8b0a0") +
    `<path d="M0,118h400v8H0z" fill="#a8a090"/>` +
    // 左の彫刻:抱き合う曲線(白い石)
    `<rect x="34" y="164" width="44" height="12" fill="#8f8a7c"/>` +
    `<path d="M44,164q-8,-28 12,-40q-2,16 6,22q8,-22 24,-18q-12,10 -10,36z" fill="#efeae0"/>` +
    `<path d="M52,164q-2,-20 10,-30" stroke="#c8c2b4" stroke-width="2" fill="none"/>` +
    shade(56, 178, 26, 3.6, ".16") +
    // 右の彫刻:傾いだ二重の輪(赤錆の鉄)
    `<rect x="316" y="158" width="46" height="12" fill="#8f8a7c"/>` +
    `<ellipse cx="339" cy="128" rx="24" ry="21" fill="none" stroke="#a85a3a" stroke-width="8" transform="rotate(-18 339 128)"/>` +
    `<ellipse cx="343" cy="132" rx="12" ry="10" fill="none" stroke="#8a4a30" stroke-width="5" transform="rotate(-18 343 132)"/>` +
    `<rect x="336" y="146" width="6" height="12" fill="#8a4a30"/>` +
    shade(339, 172, 27, 3.8, ".16") +
    // 奥の小さい彫刻(遠近)
    `<rect x="150" y="140" width="22" height="7" fill="#8f8a7c"/>` +
    `<path d="M154,140q4,-18 8,-20q4,10 6,20z" fill="#e8e2d4"/>` +
    `<rect x="240" y="140" width="20" height="7" fill="#8f8a7c"/>` +
    `<path d="M244,140v-16h4v10h6v-8h4v14z" fill="#d8d2c4"/>` +
    // 街路樹(ラパチョ:桃色の花)
    `<g fill="#e0a8b8"><ellipse cx="118" cy="140" rx="15" ry="12"/><ellipse cx="284" cy="144" rx="13" ry="10"/></g>` +
    `<g fill="#6b5a44"><rect x="116" y="150" width="4.4" height="14"/><rect x="282" y="152" width="4" height="12"/></g>` +
    lamp(190, 156, 22) +
    lamp(226, 156, 22) +
    // 通りの人。彫刻を見上げる
    person(96, 204, 25, "#3f6f9a") +
    arm(98, 189, 10, -6) +
    person(360, 206, 24, "#c8452f") +
    arm(358, 192, -10, -5) +
    person(206, 208, 22, "#e0d8c8") +
    `<g stroke="#a8a090" stroke-width="1.8" opacity=".7" fill="none"><path d="M0,150h140M260,150h140M0,182h120M280,182h120M0,206h90M310,206h90"/></g>` +
    bird(160, 40, 0.9) +
    bird(250, 48, 0.8),

  /**
   * カーニバルの町(グアレグアイチュ)。
   * 夕暮れのコルソドロモ。観覧席と電飾、羽根の山車。
   * **数百メートルのために1年をかける町。**顔は描かない——羽根と光で語る。
   */
  carnivaltown:
    sky("#6b5a8f", "#c87a6a", 100) +
    band(100, 8, "#e0975f") +
    sun(60, 76, 12, "#f2c26b") +
    // 正面奥の観覧席の壁(中央の抜けを塞ぐ)
    band(108, 54, "#423a54") +
    `<g fill="#564a6f">${[136, 168, 200, 232, 264]
      .map((x) => `<rect x="${x}" y="118" width="20" height="4"/>`)
      .join("")}${[136, 168, 200, 232, 264]
      .map((x) => `<rect x="${x}" y="134" width="20" height="4"/>`)
      .join("")}</g>` +
    // 観覧席(左右)
    `<g fill="#4a3f5f"><path d="M0,108h120v54H0z"/><path d="M280,108h120v54H280z"/></g>` +
    `<g fill="#6b5a8f"><path d="M0,108h120l-8,-10H0z"/><path d="M280,108h120v-10h-112z"/></g>` +
    `<g fill="#8f7aae">${[10, 34, 58, 82, 106]
      .map((x) => `<rect x="${x}" y="116" width="16" height="5"/>`)
      .join("")}${[290, 314, 338, 362, 386]
      .map((x) => `<rect x="${x}" y="116" width="12" height="5"/>`)
      .join("")}</g>` +
    `<g fill="#8f7aae">${[10, 34, 58, 82, 106]
      .map((x) => `<rect x="${x}" y="130" width="16" height="5"/>`)
      .join("")}${[290, 314, 338, 362, 386]
      .map((x) => `<rect x="${x}" y="130" width="12" height="5"/>`)
      .join("")}</g>` +
    `<g fill="#8f7aae">${[10, 34, 58, 82, 106]
      .map((x) => `<rect x="${x}" y="144" width="16" height="5"/>`)
      .join("")}${[290, 314, 338, 362]
      .map((x) => `<rect x="${x}" y="144" width="12" height="5"/>`)
      .join("")}</g>` +
    // 電飾のワイヤ
    `<path d="M0,96q100,18 200,16q100,-2 200,-18" stroke="#4a3f5f" stroke-width="1.6" fill="none"/>` +
    `<g fill="#f2d98a">${[20, 60, 100, 140, 180, 220, 260, 300, 340, 380]
      .map((x) => `<circle cx="${x}" cy="${r1(96 + 16 * Math.sin((x / 400) * Math.PI))}" r="2.6"/>`)
      .join("")}</g>` +
    // パレードの路面
    ground(162, "#8f5f6b") +
    `<path d="M0,162h400v6H0z" fill="#7a4f5c"/>` +
    // 左:羽根の山車(孔雀色の扇)。丸い羽先を放射状に
    `<g stroke="#3fa89a" stroke-width="7" stroke-linecap="round" fill="none">` +
    `<path d="M62,186L26,150M62,186L44,140M62,186L62,134M62,186L80,140M62,186L98,150"/></g>` +
    `<g stroke="#57c8b8" stroke-width="4" stroke-linecap="round" fill="none">` +
    `<path d="M62,186L38,158M62,186L54,144M62,186L72,144M62,186L86,158"/></g>` +
    `<g fill="#f5b31c"><circle cx="26" cy="150" r="4.4"/><circle cx="44" cy="140" r="4.4"/><circle cx="62" cy="134" r="4.4"/><circle cx="80" cy="140" r="4.4"/><circle cx="98" cy="150" r="4.4"/></g>` +
    `<path d="M42,186a20,16 0 0 1 40,0z" fill="#b84a6b"/>` +
    `<rect x="36" y="186" width="52" height="12" rx="3" fill="#8f3f60"/>` +
    `<g fill="#f2d98a"><circle cx="46" cy="192" r="1.8"/><circle cx="62" cy="192" r="1.8"/><circle cx="78" cy="192" r="1.8"/></g>` +
    `<g fill="#33302c"><circle cx="48" cy="200" r="3.4"/><circle cx="76" cy="200" r="3.4"/></g>` +
    // 右:もう1台(炎色の扇)
    `<g stroke="#e0703f" stroke-width="6" stroke-linecap="round" fill="none">` +
    `<path d="M334,190L304,160M334,190L320,150M334,190L336,146M334,190L352,152M334,190L364,164"/></g>` +
    `<g stroke="#f5b31c" stroke-width="3.4" stroke-linecap="round" fill="none">` +
    `<path d="M334,190L314,166M334,190L328,154M334,190L346,158"/></g>` +
    `<g fill="#f2d98a"><circle cx="304" cy="160" r="3.8"/><circle cx="320" cy="150" r="3.8"/><circle cx="336" cy="146" r="3.8"/><circle cx="352" cy="152" r="3.8"/><circle cx="364" cy="164" r="3.8"/></g>` +
    `<path d="M318,190a17,13 0 0 1 34,0z" fill="#8f3f8a"/>` +
    `<rect x="312" y="190" width="46" height="11" rx="3" fill="#6b2f66"/>` +
    `<g fill="#f2d98a"><circle cx="322" cy="195" r="1.6"/><circle cx="335" cy="195" r="1.6"/><circle cx="348" cy="195" r="1.6"/></g>` +
    `<g fill="#33302c"><circle cx="322" cy="203" r="3"/><circle cx="348" cy="203" r="3"/></g>` +
    // 落ちた羽根と紙吹雪
    `<g fill="#3fa89a" opacity=".9"><ellipse cx="140" cy="200" rx="5" ry="2" transform="rotate(-20 140 200)"/><ellipse cx="252" cy="196" rx="5" ry="2" transform="rotate(24 252 196)"/></g>` +
    `<g fill="#f2d98a"><circle cx="170" cy="192" r="1.6"/><circle cx="238" cy="204" r="1.6"/><circle cx="196" cy="206" r="1.4"/></g>` +
    `<g fill="#e8443f"><circle cx="152" cy="206" r="1.4"/><circle cx="262" cy="188" r="1.4"/></g>`,

  /**
   * 火山のステップ(マラルグエ=パジュニア)。
   * **800を超える単成火山の円錐**が黒い野に並ぶ。右に深宇宙アンテナの白い皿
   * ——澄んだ空だけがこの土地の資源。
   */
  volcanicsteppe:
    sky("#8fb4d4", "#e0d4c0", 84) +
    sun(56, 28, 11, "#f6e8c8") +
    // 遠景の円錐の列(黒に赤の差し色)
    `<path d="M6,84L40,48L74,84z" fill="#4a4038"/>` +
    `<path d="M30,84L40,58L52,84z" fill="#6b4438"/>` +
    `<path d="M96,84L130,56L166,84z" fill="#524a40"/>` +
    `<path d="M236,84L262,60L290,84z" fill="#4a4038"/>` +
    `<path d="M320,84L352,52L386,84z" fill="#553f36"/>` +
    `<path d="M340,84L352,62L366,84z" fill="#7a4a38"/>` +
    `<path d="M186,84L206,66L228,84z" fill="#5a4f44"/>` +
    `<path d="M382,84L394,70L400,76V84z" fill="#4a4038"/>` +
    band(84, 10, "#a08a68") +
    ground(94, "#b09a74") +
    `<path d="M0,94q100,8 200,4q100,-4 200,5v12H0z" fill="#a08c66"/>` +
    // 中景の円錐(裾に黒い溶岩)
    `<path d="M28,150L62,108L98,150z" fill="#5f5348"/>` +
    `<path d="M50,150L62,120L76,150z" fill="#8a5442"/>` +
    `<path d="M0,150h400v6H0z" fill="#8f7a58" opacity="0"/>` +
    `<path d="M16,150q30,-8 92,0q-46,6 -92,0z" fill="#3f3830"/>` +
    // 右:深宇宙アンテナ(白い皿)
    `<path d="M320,150h18v-14h-18z" fill="#c8c2b4"/>` +
    `<path d="M300,108a34,26 0 0 1 60,-14l-46,38z" fill="#eef0ec"/>` +
    `<path d="M300,108a34,26 0 0 1 60,-14" stroke="#b8b2a8" stroke-width="2.4" fill="none"/>` +
    `<path d="M326,112l16,-20" stroke="#8f8a7c" stroke-width="2.4" fill="none"/>` +
    `<circle cx="344" cy="90" r="3.4" fill="#8f8a7c"/>` +
    `<rect x="314" y="150" width="30" height="5" fill="#8f8a7c"/>` +
    shade(330, 156, 22, 3.4, ".16") +
    // 手前:黒い火山礫の野
    ground(160, "#9a8460") +
    `<g fill="#4a4038"><circle cx="30" cy="180" r="5"/><circle cx="58" cy="196" r="4"/><circle cx="96" cy="186" r="6"/><circle cx="140" cy="200" r="4.4"/><circle cx="250" cy="192" r="5"/><circle cx="288" cy="204" r="4"/><circle cx="330" cy="188" r="5.4"/><circle cx="372" cy="198" r="4.6"/></g>` +
    `<g fill="#6b5f50"><circle cx="44" cy="190" r="2.6"/><circle cx="120" cy="192" r="3"/><circle cx="268" cy="200" r="2.6"/><circle cx="352" cy="192" r="3"/><circle cx="200" cy="196" r="2.4"/><circle cx="16" cy="200" r="2.6"/></g>` +
    // 冷えた溶岩の裂け目
    `<g stroke="#4a4038" stroke-width="1.6" opacity=".7" fill="none"><path d="M8,168q30,4 60,2M150,172q26,3 50,1M300,170q30,4 58,2"/></g>` +
    tuft(76, 206, 1, "#a8925f", 2) +
    tuft(160, 200, 0.85, "#a8925f", 2) +
    tuft(200, 205, 0.9, "#a8925f", 2) +
    tuft(310, 207, 1, "#a8925f", 2) +
    tuft(388, 202, 0.9, "#a8925f", 2) +
    bird(180, 38, 1) +
    bird(206, 46, 0.8) +
    clouds(150, 24, 0.6, "#eef0ec", ".6"),

  /**
   * アンデスの湖のリゾート(バリローチェ)。
   * ナウエル・ワピ湖と雪の峰、**石と木の山岳様式**のチョコレート店の並び。
   */
  andeanlakeresort:
    sky("#8fc0e0", "#dce8ec", 78) +
    snowRidge(78, 46, "#7a8496", 3) +
    band(78, 6, "#5f7a6f") +
    water(84, "#2f6f8f", "#3f84a4", "#57a0b8") +
    swell(104, "#bfe0ec", ".5") +
    // 対岸の針葉樹の帯
    `<g fill="#2d5f4a">${[20, 48, 76, 104, 296, 324, 352, 380]
      .map((x) => `<path d="M${x},84l7,-12l7,12z"/>`)
      .join("")}</g>` +
    // ヨット(左の開けた水面に)
    `<path d="M124,100l0,-14l10,14z" fill="#f2ece0"/>` +
    `<path d="M118,102h20l-3,4h-14z" fill="#8a5a3a"/>` +
    // 手前の湖岸
    ground(126, "#7f9468") +
    `<path d="M0,126q100,-6 200,-3q100,3 200,-4v10H0z" fill="#8fa478"/>` +
    // 左:石と木のシャレー(1階が石、2階が木、深い軒)
    `<rect x="14" y="150" width="76" height="28" fill="#8f8a7c"/>` +
    `<g fill="#c8c2b4"><circle cx="26" cy="160" r="3"/><circle cx="44" cy="170" r="3.4"/><circle cx="66" cy="158" r="3"/><circle cx="80" cy="168" r="2.6"/></g>` +
    `<rect x="18" y="122" width="68" height="28" fill="#8a5f3a"/>` +
    `<g stroke="#6b4a2c" stroke-width="1.8" fill="none"><path d="M18,130h68M18,140h68"/></g>` +
    `<path d="M4,124L52,92l48,32l-8,6l-40,-26l-40,26z" fill="#5f4030"/>` +
    `<path d="M12,124l40,-26l40,26z" fill="#7a4f38"/>` +
    `<g fill="#f2d98a"><rect x="28" y="128" width="10" height="12"/><rect x="58" y="128" width="10" height="12"/></g>` +
    `<rect x="42" y="158" width="16" height="20" fill="#5f4030"/>` +
    // 右:並びのシャレー(ティーハウス)
    `<rect x="308" y="146" width="66" height="32" fill="#8f8a7c"/>` +
    `<g fill="#c8c2b4"><circle cx="320" cy="158" r="3"/><circle cx="342" cy="168" r="3.2"/><circle cx="362" cy="156" r="2.8"/></g>` +
    `<rect x="312" y="122" width="58" height="24" fill="#9a6b42"/>` +
    `<path d="M300,124l40,-24l42,24l-8,6l-34,-19l-33,19z" fill="#5f4030"/>` +
    `<g fill="#f2d98a"><rect x="322" y="128" width="9" height="11"/><rect x="348" y="128" width="9" height="11"/></g>` +
    `<rect x="334" y="160" width="14" height="18" fill="#5f4030"/>` +
    plume(366, 116, 16, 0.6, "#e8e2d4", ".8") +
    // 湖岸の道と人
    ground(184, "#a89a72") +
    `<path d="M0,184h400v5H0z" fill="#8f8266"/>` +
    person(140, 208, 24, "#c8452f") +
    person(258, 207, 23, "#3f6f9a") +
    arm(260, 193, -9, 5) +
    `<g fill="#4f7f3f"><path d="M112,184l8,-16l8,16z"/><path d="M120,174l0,14" stroke="#4a3a2a" stroke-width="2"/></g>` +
    `<g fill="#4f7f3f"><path d="M282,184l8,-16l8,16z"/></g>` +
    bird(190, 36, 1) +
    bird(214, 44, 0.8),

  /**
   * 恐竜の荒野(ネウケン)。
   * 縞の露頭(バッドランド)と発掘テント、**地面から現れる巨大な大腿骨**、
   * 遠景にバカ・ムエルタのポンプジャック。
   */
  dinofields:
    sky("#a8c0d4", "#e8d8b8", 80) +
    sun(64, 26, 11, "#f6e8c8") +
    // 地面を先に塗ってから、縞の露頭を立てる
    band(80, 12, "#c8a878") +
    ground(92, "#cfae7c") +
    `<path d="M0,92q100,8 200,4q100,-4 200,5v10H0z" fill="#c2a070"/>` +
    // 縞の露頭(バッドランド)。裾はy≈160で地面に沈み、発掘は手前に置く
    `<path d="M0,160V52h88l16,34l-8,66q-48,10 -96,8z" fill="#c49a6b"/>` +
    `<g fill="#a87a52"><path d="M0,74h94v8H0z"/><path d="M0,100h100v7H0z"/><path d="M0,128h98v6H0z"/></g>` +
    `<g fill="#e0c090"><path d="M0,88h97v6H0z"/><path d="M0,114h99v6H0z"/></g>` +
    `<path d="M400,166V46h-84l-16,38l10,74q44,10 90,8z" fill="#bd905f"/>` +
    `<g fill="#a06f4a"><path d="M400,70h-92v7h92z"/><path d="M400,98h-96v6h96z"/><path d="M400,126h-94v6h94z"/></g>` +
    `<g fill="#dcbc8a"><path d="M400,84h-94v5h94z"/><path d="M400,112h-95v5h95z"/></g>` +
    // 遠景のポンプジャック(右奥)
    `<g stroke="#5f5a50" stroke-width="2.4" fill="none"><path d="M330,118v-12l10,-6M330,106l-9,-5M321,101l-4,17M340,100l6,3"/></g>` +
    `<circle cx="321" cy="101" r="2.4" fill="#5f5a50"/>` +
    // 手前:発掘サイト
    ground(150, "#c2a070") +
    // 発掘の区画(ロープと杭)
    `<g fill="#8a6a4a"><rect x="36" y="168" width="3" height="12"/><rect x="120" y="168" width="3" height="12"/><rect x="36" y="196" width="3" height="12"/><rect x="120" y="196" width="3" height="12"/></g>` +
    `<g stroke="#e8dcc0" stroke-width="1.6" fill="none"><path d="M37,170h84M37,198h84M37,170v28M121,170v28"/></g>` +
    // 巨大な大腿骨(半分埋まっている)
    `<path d="M48,190q4,-8 14,-7l32,3q10,1 12,9q-2,6 -12,5l-32,-3q-10,-1 -14,-7z" fill="#e8e0cc"/>` +
    `<path d="M48,190q4,-8 14,-7l-2,10q-8,0 -12,-3z" fill="#d4c8ac"/>` +
    `<circle cx="102" cy="193" r="4.4" fill="#d4c8ac"/>` +
    shade(78, 202, 34, 4, ".14") +
    // 発掘テントと道具
    `<path d="M300,206l22,-30l22,30z" fill="#e0d8c0"/>` +
    `<path d="M310,206l12,-17l12,17z" fill="#8a7a5f"/>` +
    shade(322, 207, 24, 3.4, ".16") +
    `<g fill="#8a6a4a"><rect x="352" y="196" width="16" height="4" rx="2" transform="rotate(-30 360 198)"/></g>` +
    // 化石を掘る人(はけを持つ)
    person(150, 206, 23, "#e0975f") +
    arm(148, 194, -10, 6) +
    person(258, 204, 22, "#5f8a4f") +
    tuft(196, 206, 0.9, "#a8925f", 2) +
    tuft(230, 208, 0.8, "#a8925f", 2) +
    `<g fill="#8f7350"><circle cx="180" cy="198" r="2.4"/><circle cx="212" cy="202" r="2"/></g>` +
    bird(200, 34, 1.1),

  /**
   * ウェールズ人の海岸(プエルト・マドリン、トレレウ)。
   * 灰緑のステップが青い湾で終わる。**煉瓦の礼拝堂(カペル)**と茶店、
   * 湾にはミナミセミクジラの尾。
   */
  welshcoast:
    sky("#9cc0d8", "#dce4e0", 88) +
    clouds(80, 30, 0.85) +
    water(88, "#2f6688", "#3f7fa0", "#579ab4") +
    swell(108, "#bfe0ec", ".5") +
    // クジラの尾(右の湾)
    `<path d="M316,106q-3,-12 6,-18q-2,8 2,10q4,-8 12,-8q-6,6 -5,16q-8,3 -15,0z" fill="#3f4a56"/>` +
    `<g stroke="#dfeef6" stroke-width="1.8" opacity=".7" fill="none"><path d="M300,110q10,-3 20,0M328,112q9,-3 18,0"/></g>` +
    bird(340, 46, 1) +
    bird(362, 38, 0.85) +
    // ステップの岸
    ground(122, "#a8a584") +
    `<path d="M0,122q100,-8 200,-4q100,4 200,-5v12H0z" fill="#9a9878"/>` +
    // 左:煉瓦の礼拝堂(切妻を正面に)
    `<rect x="26" y="136" width="54" height="42" fill="#9a5a42"/>` +
    `<path d="M20,136L53,110l33,26z" fill="#7a4232"/>` +
    `<path d="M28,134L53,114l25,20z" fill="#8f4f3a"/>` +
    `<rect x="46" y="152" width="14" height="26" rx="7" fill="#5f4c33"/>` +
    `<g fill="#e8dcc0"><rect x="32" y="146" width="8" height="14" rx="4"/><rect x="66" y="146" width="8" height="14" rx="4"/></g>` +
    `<circle cx="53" cy="128" r="4.4" fill="#e8dcc0"/>` +
    `<g stroke="#7a4232" stroke-width="1.2" fill="none"><path d="M53,124v9M49,128h9"/></g>` +
    shade(53, 180, 30, 4, ".16") +
    // 左奥:入植者の鉄道の小さな車庫と線路
    `<rect x="104" y="122" width="34" height="20" fill="#8a5f3a"/>` +
    `<path d="M100,122h42l-6,-9h-30z" fill="#5f4030"/>` +
    metreTrack(146, 90, 220) +
    // 右:茶店(白壁・ケトルの看板は描かず湯気で)
    `<rect x="300" y="140" width="52" height="38" fill="#efe4cc"/>` +
    `<path d="M294,140h64l-8,-12h-48z" fill="#6b7a5f"/>` +
    `<g fill="#5f7f96"><rect x="308" y="150" width="10" height="12"/><rect x="332" y="150" width="10" height="12"/></g>` +
    `<rect x="320" y="162" width="12" height="16" fill="#6b5330"/>` +
    plume(348, 136, 12, 0.5, "#e8e2d4", ".7") +
    shade(326, 180, 28, 3.8, ".16") +
    // 手前:風のステップと柵、ヒツジ
    ground(184, "#a09a76") +
    wireFence(0, 400, 200, 10) +
    sheep(168, 202, 0.9) +
    sheep(238, 206, 0.95) +
    tuft(20, 206, 1.1, "#b0a468", 3) +
    tuft(96, 204, 0.9, "#b0a468", 3) +
    tuft(272, 203, 1, "#b0a468", 3) +
    tuft(376, 206, 1.1, "#b0a468", 3),

  /**
   * 世界の果て(ウシュアイア、リオ・グランデ)。
   * ビーグル水道と鋸歯の雪山、色とりどりのトタンの家、
   * **監獄の薪を運んだ狭軌の煙。**
   */
  endoftheworld:
    sky("#8fb0cc", "#dce4e8", 74) +
    snowRidge(74, 50, "#6f7a8f", 4) +
    band(74, 6, "#4f6a5f") +
    water(80, "#2f5f80", "#3f7496", "#5790a8") +
    swell(100, "#bfe0ec", ".5") +
    // 灯台(レス・エクレルール風の紅白)
    `<rect x="330" y="84" width="10" height="22" fill="#c8452f"/>` +
    `<rect x="330" y="90" width="10" height="7" fill="#f2ece0"/>` +
    `<rect x="328" y="82" width="14" height="4" fill="#33302c"/>` +
    `<circle cx="335" cy="79" r="3" fill="#f2d98a"/>` +
    `<path d="M322,106q13,-4 26,0l-3,4q-10,-3 -20,0z" fill="#6f6a5e"/>` +
    bird(300, 40, 1) +
    bird(322, 30, 0.8) +
    // 斜面の色の家(トタン)
    ground(118, "#7f9468") +
    `<path d="M0,118q100,-8 200,-3q100,4 200,-6v12H0z" fill="#8fa478"/>` +
    `<g>` +
    `<rect x="16" y="128" width="36" height="26" fill="#c8452f"/><path d="M12,128h44l-6,-10h-32z" fill="#8f3325"/><rect x="26" y="136" width="8" height="10" fill="#f2d98a"/>` +
    `<rect x="66" y="134" width="34" height="22" fill="#3f7fae"/><path d="M62,134h42l-6,-9h-30z" fill="#2f6288"/><rect x="76" y="140" width="8" height="9" fill="#f2d98a"/>` +
    `<rect x="112" y="128" width="30" height="24" fill="#f5b31c"/><path d="M108,128h38l-5,-9h-28z" fill="#c88f14"/><rect x="121" y="136" width="8" height="9" fill="#5f4c33"/>` +
    `<rect x="290" y="130" width="34" height="24" fill="#4f9a5f"/><path d="M286,130h42l-6,-10h-30z" fill="#3a7346"/><rect x="300" y="138" width="8" height="9" fill="#f2d98a"/>` +
    `<rect x="342" y="126" width="38" height="28" fill="#8a5a9a"/><path d="M338,126h46l-7,-11h-32z" fill="#66416f"/><rect x="354" y="136" width="9" height="10" fill="#f2d98a"/>` +
    `</g>` +
    // 南極ブナの林(ニレに似た低い樹形)
    `<g fill="#3f6b4a"><ellipse cx="216" cy="128" rx="14" ry="8"/><ellipse cx="248" cy="124" rx="12" ry="7"/><ellipse cx="270" cy="130" rx="10" ry="6"/></g>` +
    // 手前:狭軌の観光列車(世界の果ての列車)
    ground(160, "#8a9a6f") +
    `<path d="M0,160q100,6 200,3q100,-3 200,4v10H0z" fill="#7f8f62"/>` +
    metreTrack(178, 0, W) +
    steamLoco(80, 176, 1) +
    plume(48, 154, 18, 0.6, "#e8e2d4", ".85") +
    `<g><rect x="118" y="160" width="40" height="14" fill="#8f3f32"/><rect x="118" y="158" width="40" height="3" fill="#5f2a20"/><g fill="#f2d98a"><rect x="124" y="164" width="7" height="6"/><rect x="136" y="164" width="7" height="6"/><rect x="148" y="164" width="7" height="6"/></g><g fill="#33302c"><circle cx="128" cy="176" r="3"/><circle cx="148" cy="176" r="3"/></g></g>` +
    `<g><rect x="166" y="160" width="40" height="14" fill="#8f3f32"/><rect x="166" y="158" width="40" height="3" fill="#5f2a20"/><g fill="#f2d98a"><rect x="172" y="164" width="7" height="6"/><rect x="184" y="164" width="7" height="6"/><rect x="196" y="164" width="7" height="6"/></g><g fill="#33302c"><circle cx="176" cy="176" r="3"/><circle cx="196" cy="176" r="3"/></g></g>` +
    shade(80, 178, 26, 3.6, ".18") +
    // 雪の残る手前の草地
    `<g fill="#e8ecec"><ellipse cx="270" cy="196" rx="20" ry="5"/><ellipse cx="330" cy="204" rx="26" ry="6"/><ellipse cx="40" cy="202" rx="24" ry="6"/></g>` +
    tuft(140, 202, 1, "#8f9a5f", 2) +
    tuft(230, 206, 0.9, "#8f9a5f", 2) +
    person(370, 200, 22, "#c8452f") +
    arm(372, 187, 8, -4),
};

// ---------------------------------------------------------------------------
// シンボル(24×24)
//
// **盤面では直径19pxほどの点にしかならない。**輪郭を優先し、主役は1つに絞る。
// 下端(y=24)が影の楕円に載るようにしておく。
//
// 似た題材が多いので、**先に描き分けを決めてある:**
//   鉄道7種   threeterminals=3つ並ぶ駅の顔 / trochita=緑の蒸機+煙 /
//             closedjunction=赤白の車止め / railworkshops=歯車の工場 /
//             welshrail=赤煉瓦の車庫 / coalnarrowgauge=黒い石炭貨車 /
//             prisontrain=雪の白地に黒の蒸機
//   山と丘6種 movingstone=丘の縁の丸岩 / talampayacliff=赤い縦壁 /
//             colorfulhills=色の縞 / atuelcanyon=水の入った峡谷 /
//             payuniacone=黒い錐の群れ / frozenmummies=雪の火山+博物館(遺体は描かない)
//   穀物4種   soyelevator=筒+船 / grainmouth=2つの埠頭 / cornsilo=とんがり屋根の
//             サイロ+トウモロコシ / milkchurn=銀の缶(穀物ではなく乳)
// ---------------------------------------------------------------------------

export const ARGENTINA_MARKS = {
  /** 肩を並べる3つの別々の駅(ブエノスアイレス)。**いまもホームを共有しない。** */
  threeterminals:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#b8a882"/>' +
    '<rect x="1" y="9" width="7" height="13.4" fill="#d8c8a8"/>' +
    '<path d="M1,9a3.5,3 0 0 1 7,0z" fill="#8a6a4a"/>' +
    '<rect x="3" y="15" width="3" height="7.4" fill="#6b5330"/>' +
    '<rect x="3.4" y="10.6" width="2.2" height="3" rx="1.1" fill="#5f7f96"/>' +
    '<rect x="8.6" y="5.6" width="7" height="16.8" fill="#c8b494"/>' +
    '<rect x="8.6" y="4" width="7" height="2.4" fill="#8a7a5f"/>' +
    '<circle cx="12.1" cy="8.4" r="1.7" fill="#f2ecdc"/>' +
    '<path d="M12.1,7v1.4h1.2" stroke="#8a7a5f" stroke-width="0.7" fill="none"/>' +
    '<rect x="10.2" y="15" width="3.6" height="7.4" fill="#5f4c33"/>' +
    '<rect x="10.2" y="11.4" width="3.6" height="2.6" fill="#5f7f96"/>' +
    '<rect x="16.2" y="10" width="6.8" height="12.4" fill="#e0d0b0"/>' +
    '<path d="M15.4,10h8.4l-1.6,-3h-5.2z" fill="#a85a3a"/>' +
    '<rect x="18.2" y="15.6" width="3" height="6.8" fill="#6b5330"/>' +
    '<rect x="18.2" y="11.6" width="3" height="2.6" fill="#5f7f96"/>',

  /** 川岸の大豆エレベーターと船(ロサリオ)。 */
  soyelevator:
    '<rect x="0" y="0" width="24" height="15" fill="#cfe4f0"/>' +
    '<rect x="0" y="15" width="24" height="9" fill="#7f9058"/>' +
    '<rect x="1.4" y="4.6" width="9.6" height="12.4" fill="#c8c2b4"/>' +
    '<rect x="2.8" y="2.4" width="6.8" height="2.6" fill="#9a948a"/>' +
    '<g stroke="#a8a294" stroke-width="0.9" fill="none"><path d="M4.6,5v12M7.8,5v12"/></g>' +
    '<path d="M11,7l7.4,7" stroke="#7a746a" stroke-width="2.2" stroke-linecap="round" fill="none"/>' +
    '<ellipse cx="18.6" cy="15.4" rx="1.8" ry="1.1" fill="#d8c88f"/>' +
    '<path d="M12.4,17.4h10.4l-1.6,3.4h-7.4z" fill="#8a4a30"/>' +
    '<rect x="12.4" y="16.2" width="10.4" height="1.4" fill="#5f3320"/>' +
    '<rect x="18.4" y="12.6" width="2.6" height="3.6" fill="#e0dccc"/>' +
    '<g stroke="#a8c8a0" stroke-width="0.9" opacity=".8" fill="none"><path d="M2,21.4q2.4,-1.2 4.8,0M8.6,22.6q2.4,-1.2 4.8,0"/></g>',

  /** ラ・ポルボリージャ高架橋(標高4220m・1932年完成の曲線鋼橋)。 */
  polvorillaviaduct:
    '<rect x="0" y="0" width="24" height="24" fill="#bfd8e8"/>' +
    // V字の谷
    '<path d="M0,24V9q5,3 8,8q3,4 4,7z" fill="#c2996b"/>' +
    '<path d="M0,24V14q4,2 6.4,6q1.6,2.6 2,4z" fill="#b0824f"/>' +
    '<path d="M24,24V9q-5,3 -8,8q-3,4 -4,7z" fill="#b58a58"/>' +
    '<path d="M24,24V14q-4,2 -6.4,6q-1.6,2.6 -2,4z" fill="#a3764a"/>' +
    '<rect x="0" y="22.6" width="24" height="1.4" fill="#a3764a"/>' +
    // 鋼の橋桁(緩い曲線)と高い橋脚
    '<g stroke="#3f3a34" stroke-width="1.2" fill="none">' +
    '<path d="M5,10.4V15M12,10.4v10M19,10.4V15M3.4,13.4h3.2M10.4,17h3.2M17.4,13.4h3.2M10.4,20.4h3.2"/>' +
    '<path d="M12,12l-6.4,2M12,12l6.4,2M12,16l-2,3.4M12,16l2,3.4"/></g>' +
    '<path d="M0,9.4q12,-3.6 24,0v2q-12,-3.6 -24,0z" fill="#33302c"/>' +
    // 上を渡る赤い列車
    '<rect x="7.6" y="5" width="7.4" height="3.6" fill="#c8452f"/>' +
    '<rect x="15.8" y="5.6" width="5.2" height="3.2" fill="#c8452f"/>' +
    '<rect x="4.6" y="5.6" width="2.6" height="3" fill="#33302c"/>' +
    '<path d="M3.4,3.4q1.4,-1 2.8,0q-1.4,0.8 -2.8,0z" fill="#e8e2d4"/>',

  /** ラ・トロチータ(750mm軌の蒸気)。**緑の小さな機関車。** */
  trochita:
    '<rect x="0" y="0" width="24" height="17" fill="#cfe0e4"/>' +
    '<rect x="0" y="17" width="24" height="7" fill="#b0a884"/>' +
    '<g fill="#e8e2d4" opacity=".9"><circle cx="4.4" cy="4.4" r="2.2"/><circle cx="7.6" cy="6.6" r="1.7"/><circle cx="10.4" cy="8.4" r="1.3"/></g>' +
    '<rect x="2.6" y="9.4" width="13" height="6" fill="#3f6b4a"/>' +
    '<rect x="2.6" y="8.4" width="13" height="1.4" fill="#33302c"/>' +
    '<rect x="15.6" y="5.6" width="6" height="9.8" fill="#3f6b4a"/>' +
    '<rect x="16.8" y="7" width="2.6" height="3" fill="#f2d98a"/>' +
    '<rect x="3.6" y="4.6" width="2.6" height="4.8" fill="#33302c"/>' +
    '<rect x="9.4" y="7" width="3" height="2.4" fill="#c8452f"/>' +
    '<path d="M1,15.4h22v1.6H1z" fill="#c8452f"/>' +
    '<g fill="#33302c"><circle cx="5.6" cy="18.4" r="1.9"/><circle cx="10.4" cy="18.4" r="1.9"/><circle cx="16.4" cy="18.4" r="2.3"/></g>' +
    '<g fill="#8a8f92"><circle cx="5.6" cy="18.4" r="0.7"/><circle cx="10.4" cy="18.4" r="0.7"/><circle cx="16.4" cy="18.4" r="0.8"/></g>' +
    '<g fill="#6b5a3a"><rect x="1" y="21" width="3" height="1.6"/><rect x="6.4" y="21" width="3" height="1.6"/><rect x="11.8" y="21" width="3" height="1.6"/><rect x="17.2" y="21" width="3" height="1.6"/></g>' +
    '<rect x="0" y="20.4" width="24" height="0.9" fill="#7f8288"/>',

  /** 分岐点を失った町(ハコバッシ)。**赤白の車止めと、2つの軌間。** */
  closedjunction:
    '<rect x="0" y="0" width="24" height="16" fill="#d8dcd4"/>' +
    '<rect x="0" y="16" width="24" height="8" fill="#a89e7c"/>' +
    '<path d="M4,16v-5.4h2.4V16zM17.6,16v-5.4H20V16z" fill="#5f5a50"/>' +
    '<rect x="2.6" y="8.4" width="18.8" height="3.4" fill="#c8452f"/>' +
    '<g fill="#efe8d8"><rect x="4.4" y="8.4" width="3.6" height="3.4"/><rect x="11.4" y="8.4" width="3.6" height="3.4"/><rect x="18.4" y="8.4" width="2.6" height="3.4"/></g>' +
    // 手前へ来る2本:広軌(左・太い)と750mm(右・細い)
    '<g fill="#5f4c33"><rect x="1" y="17.6" width="10" height="1.6"/><rect x="1" y="20.8" width="10" height="1.6"/></g>' +
    '<g stroke="#8a8f92" stroke-width="1.2" fill="none"><path d="M2.4,16v8M9.6,16v8"/></g>' +
    '<g fill="#6b5a3a"><rect x="14.4" y="18" width="6.4" height="1.2"/><rect x="14.4" y="20.6" width="6.4" height="1.2"/></g>' +
    '<g stroke="#7f8288" stroke-width="0.9" fill="none"><path d="M15.6,16v8M19.6,16v8"/></g>' +
    '<path d="M11.8,3.4q2.4,-1.4 4.4,0q-2.2,1 -4.4,0z" fill="#b0a468"/>',

  /** 定規で引かれた斜めの街路(ラ・プラタ)。**都市の平面図そのもの。** */
  diagonalgrid:
    '<rect x="1.4" y="1.4" width="21.2" height="21.2" rx="1.4" fill="#9aa878"/>' +
    '<g stroke="#e8e0cc" stroke-width="1.6" fill="none">' +
    '<path d="M1.4,8h21.2M1.4,15.8h21.2M8,1.4v21.2M15.8,1.4v21.2"/></g>' +
    '<g stroke="#f2d98a" stroke-width="1.7" fill="none"><path d="M2,2L22,22M22,2L2,22"/></g>' +
    '<rect x="9.6" y="9.6" width="4.6" height="4.6" fill="#4f7f3f"/>' +
    '<g fill="#4f7f3f"><circle cx="4.7" cy="4.7" r="1.7"/><circle cx="19.1" cy="4.7" r="1.7"/><circle cx="4.7" cy="19.1" r="1.7"/><circle cx="19.1" cy="19.1" r="1.7"/></g>' +
    '<rect x="1.4" y="1.4" width="21.2" height="21.2" rx="1.4" fill="none" stroke="#6b7a5f" stroke-width="1.2"/>',

  /** イエズス会街区(コルドバ)。**回廊のアーチと鐘塔。1613年の大学。** */
  jesuitblock:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#b8a882"/>' +
    '<rect x="1.6" y="10.6" width="20.8" height="11.8" fill="#e0c898"/>' +
    '<path d="M0.8,10.6h22.4l-1.8,-3H2.6z" fill="#a85a3a"/>' +
    '<g fill="#7a5c38"><path d="M3.6,22.4v-6.4a2.4,2.4 0 0 1 4.8,0v6.4z"/><path d="M9.8,22.4v-6.4a2.4,2.4 0 0 1 4.8,0v6.4z"/><path d="M16,22.4v-6.4a2.4,2.4 0 0 1 4.8,0v6.4z"/></g>' +
    '<rect x="14.6" y="1.6" width="6.4" height="6" fill="#e0c898"/>' +
    '<path d="M13.8,1.6h8l-1.6,-1.6h-4.8z" fill="#a85a3a"/>' +
    '<rect x="16.6" y="3" width="2.4" height="3" rx="1.2" fill="#5f4c33"/>' +
    '<path d="M17.8,-0.4v1.6M17,0.4h1.6" stroke="#7a5c38" stroke-width="0.8" fill="none"/>' +
    '<rect x="3.4" y="12.4" width="3" height="2.2" fill="#5f7f96"/>',

  /** 崖の上の夏の別荘(マル・デル・プラタ)。**急勾配の屋根と張り出し窓。** */
  seasidevilla:
    '<rect x="0" y="0" width="24" height="18" fill="#bfe0ee"/>' +
    '<rect x="0" y="12.6" width="24" height="3" fill="#3f92ae"/>' +
    '<path d="M0,15.6h24V24H0z" fill="#c2a070"/>' +
    '<path d="M0,15.6h24v1.4H0z" fill="#a8825c"/>' +
    '<rect x="4" y="9.6" width="15.4" height="8.6" fill="#e8dcc0"/>' +
    '<path d="M2,10.4L11.7,1l9.7,9.4l-2,1.6l-7.7,-7.4l-7.7,7.4z" fill="#8f4a38"/>' +
    '<path d="M4.4,9.8l7.3,-7l7.3,7z" fill="#a85847"/>' +
    '<rect x="6.4" y="11.6" width="3.4" height="4" fill="#5f7f96"/>' +
    '<rect x="13.6" y="11.6" width="3.4" height="6.6" fill="#6b5330"/>' +
    '<rect x="9.8" y="5.6" width="3.8" height="3.4" fill="#f2d98a"/>' +
    '<path d="M16.6,3.6v-3h1.8v3z" fill="#8f4a38"/>' +
    '<g stroke="#f2f8fa" stroke-width="1" opacity=".85" fill="none"><path d="M2,13.6q2.4,-1.2 4.8,0M17,14q2.4,-1.2 4.8,0"/></g>',

  /** 海軍の埠頭(バイア・ブランカ)。**灰色の艦を輪郭で。** */
  navydock:
    '<rect x="0" y="0" width="24" height="16" fill="#cfe0e8"/>' +
    '<rect x="0" y="16" width="24" height="8" fill="#3f5f78"/>' +
    '<path d="M1,17.6h22l-2.6,3.6H3.6z" fill="#7f8a94"/>' +
    '<rect x="1" y="16.2" width="22" height="1.6" fill="#5f6a74"/>' +
    '<rect x="6.4" y="10.4" width="8.4" height="6" fill="#8f9aa4"/>' +
    '<rect x="9" y="6.4" width="3.4" height="4.4" fill="#7f8a94"/>' +
    '<path d="M10.7,6.4V2.4M8.6,4h4.2" stroke="#5f6a74" stroke-width="1" fill="none"/>' +
    '<g fill="#3f4a56"><rect x="7.4" y="12" width="1.8" height="1.6"/><rect x="10.4" y="12" width="1.8" height="1.6"/><rect x="13.2" y="12" width="1.4" height="1.6"/></g>' +
    '<rect x="16.4" y="12.4" width="4.4" height="4" fill="#8f9aa4"/>' +
    '<path d="M3,17l3.4,-2.6h2.6l-2.6,2.6z" fill="#6b7680"/>' +
    '<g stroke="#a8c8d8" stroke-width="1" opacity=".8" fill="none"><path d="M2,22.4q2.6,-1.2 5.2,0M15,23q2.6,-1.2 5.2,0"/></g>',

  /** 川底のトンネル(サンタフェ⇄パラナ)。**水の下をくぐる。** */
  subfluvialtunnel:
    '<rect x="0" y="0" width="24" height="7.4" fill="#cfe4f0"/>' +
    '<rect x="0" y="7.4" width="24" height="5.2" fill="#7f9058"/>' +
    '<g stroke="#98a86a" stroke-width="1" opacity=".9" fill="none"><path d="M3,9.4q2.4,-1.2 4.8,0M13,10.6q2.4,-1.2 4.8,0"/></g>' +
    '<path d="M2.4,7.6h4l-1,-1.6h-2z" fill="#8a5a3a"/>' +
    '<rect x="0" y="12.6" width="24" height="11.4" fill="#8f7350"/>' +
    '<path d="M2.4,24v-6.4a9.6,8 0 0 1 19.2,0V24z" fill="#5f4c33"/>' +
    '<path d="M4.8,24v-5.4a7.2,6.2 0 0 1 14.4,0V24z" fill="#33302c"/>' +
    '<g fill="#f2d98a"><circle cx="8.4" cy="16.6" r="0.9"/><circle cx="12" cy="15.6" r="0.9"/><circle cx="15.6" cy="16.6" r="0.9"/></g>' +
    '<path d="M10.2,24v-3.4a1.9,1.9 0 0 1 3.8,0V24z" fill="#f2d98a"/>' +
    '<g stroke="#8a8074" stroke-width="0.9" opacity=".8" fill="none"><path d="M6.6,24v-2.6M17.4,24v-2.6"/></g>',

  /** 鉄道工場(フニン)。**歯車と鋸屋根。町いちばんの雇い主だった。** */
  railworkshops:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#a8a090"/>' +
    '<path d="M1.6,22.4V10.4l5,-3.4l0,3.4l5,-3.4l0,3.4l5,-3.4l0,3.4l5.8,-3.4v16.4z" fill="#8f8a7c"/>' +
    '<path d="M1.6,10.4l5,-3.4l0,3.4z" fill="#6f6a5e"/>' +
    '<path d="M11.6,10.4l5,-3.4l0,3.4z" fill="#6f6a5e"/>' +
    '<g fill="#5f7f96"><rect x="3.4" y="13.4" width="3.4" height="3"/><rect x="13.6" y="13.4" width="3.4" height="3"/></g>' +
    '<rect x="8" y="17" width="5" height="5.4" fill="#5f4c33"/>' +
    '<g fill="#c8763f"><circle cx="19.4" cy="17.4" r="3.6"/><g>' +
    '<rect x="18.8" y="12.6" width="1.2" height="2.2"/><rect x="18.8" y="20" width="1.2" height="2.2"/>' +
    '<rect x="14.6" y="16.8" width="2.2" height="1.2"/><rect x="22" y="16.8" width="2.2" height="1.2"/>' +
    '<rect x="15.7" y="13.7" width="2" height="1.2" transform="rotate(45 16.7 14.3)"/><rect x="21.1" y="19.1" width="2" height="1.2" transform="rotate(45 22.1 19.7)"/>' +
    '<rect x="15.7" y="19.9" width="2" height="1.2" transform="rotate(-45 16.7 20.5)"/><rect x="21.1" y="13.9" width="2" height="1.2" transform="rotate(-45 22.1 14.5)"/></g></g>' +
    '<circle cx="19.4" cy="17.4" r="1.5" fill="#f2ecdc"/>',

  /** 動く石(タンディル)。**丘の縁で釣り合う丸岩。** */
  movingstone:
    '<rect x="0" y="0" width="24" height="19" fill="#bfe0ee"/>' +
    '<circle cx="19" cy="4.6" r="2.6" fill="#f5b31c"/>' +
    '<path d="M0,19L9,8q3,-3.4 7,-2l8,3v10z" fill="#7f9a5f"/>' +
    '<path d="M0,19l9,-11q3,-3.4 7,-2" stroke="#5f7a46" stroke-width="1.4" fill="none"/>' +
    '<rect x="0" y="19" width="24" height="5" fill="#6b8a54"/>' +
    '<path d="M7.6,9.6a4.9,4.6 0 1 1 9.8,-1.2a4.9,4.6 0 0 1 -9.8,1.2z" fill="#8f8a7c"/>' +
    '<path d="M8.6,6.4a4.9,4.6 0 0 1 6.4,-1.6q-3.6,0 -6.4,1.6z" fill="#a8a294"/>' +
    '<path d="M9.4,11.4l6.4,-1.8" stroke="#524e44" stroke-width="0.9" fill="none"/>' +
    '<g fill="#5f8f4a"><path d="M3.4,19q1,-2.6 2.6,-3.4q0,2 -1,3.4z"/><path d="M20,17.6q-1,-2.2 -2.4,-3q0,1.8 1,3z"/></g>',

  /** 一つの河口を分け合う二つの港(ネコチェア/ケケン)。 */
  grainmouth:
    '<rect x="0" y="0" width="24" height="8" fill="#3f92ae"/>' +
    '<path d="M1.6,3.4q2.2,-1 4.4,0M14,2q2.2,-1 4.4,0" stroke="#7fc4d8" stroke-width="0.9" fill="none"/>' +
    // 左岸=浜、右岸=働く港
    '<path d="M0,8h24v16H0z" fill="#e8d8ae"/>' +
    '<path d="M13,8h11v16H13z" fill="#b0a884"/>' +
    // 河口(海へ開く水路)
    '<path d="M8.6,8h7L14,24h-3.6z" fill="#57a8c0"/>' +
    '<path d="M10.4,12q1.6,-0.8 3.2,0M10.8,17q1.4,-0.8 2.8,0" stroke="#a8d4e0" stroke-width="0.8" fill="none"/>' +
    // 左:大きな縞のカルパ1張
    '<path d="M0.8,19.4l3.8,-5.4l3.8,5.4z" fill="#e05a4a"/>' +
    '<path d="M2.4,19.4l2.2,-3.2l2.2,3.2z" fill="#f2ece0"/>' +
    '<rect x="0.6" y="19.4" width="8" height="1.3" fill="#b84838"/>' +
    // 右:大きなサイロ2本と船
    '<rect x="15.6" y="11.4" width="3.6" height="10" fill="#c8c2b4"/>' +
    '<rect x="19.8" y="11.4" width="3.6" height="10" fill="#b8b2a4"/>' +
    '<path d="M15.6,11.4a1.8,1.2 0 0 1 3.6,0zM19.8,11.4a1.8,1.2 0 0 1 3.6,0z" fill="#8a857a"/>' +
    '<rect x="17" y="16" width="1.2" height="2" fill="#8a857a"/>' +
    '<path d="M18.4,5.4h4.4l-1,2h-2.6z" fill="#8a4a30"/>' +
    '<rect x="19.4" y="4" width="1.4" height="1.4" fill="#e0dccc"/>',

  /** とうもろこしサイロ(ペルガミノ)。 */
  cornsilo:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#c2b17a"/>' +
    '<rect x="3" y="8.4" width="6.4" height="14" fill="#c8c2b4"/>' +
    '<path d="M2.4,8.4L6.2,4l3.8,4.4z" fill="#8a857a"/>' +
    '<rect x="10.4" y="10.4" width="5.6" height="12" fill="#b8b2a4"/>' +
    '<path d="M9.8,10.4l3.4,-4l3.4,4z" fill="#7f7a70"/>' +
    '<path d="M6.2,4v-2.4" stroke="#8a857a" stroke-width="1" fill="none"/>' +
    '<rect x="4.6" y="14" width="3" height="2.4" fill="#5f5a50"/>' +
    // 主役のトウモロコシ
    '<path d="M18.4,22.6q-1.6,-6.4 0.6,-12q3,1.2 3.2,6q0.2,4 -1.6,6.4z" fill="#f5b31c"/>' +
    '<g stroke="#c88f14" stroke-width="0.8" opacity=".9" fill="none"><path d="M18.6,12.4q-1,5 0.4,9.6M20.4,11.6q1,4.6 0.2,9.6M18.2,15.4q2,0.6 3.6,0M18,18.6q2.2,0.6 3.8,0"/></g>' +
    '<path d="M19.2,10.6q-2.4,-1.6 -2.6,-4.4q2.6,0.6 3.4,3.2q1.6,-2.6 4,-2.6q-0.8,3 -3.6,4z" fill="#5f8f4a"/>',

  /** 国境の砦(チャスコムス)。**木柵と見張り台と湖。** */
  frontierfort:
    '<rect x="0" y="0" width="24" height="16" fill="#cfe4f0"/>' +
    '<rect x="0" y="16" width="24" height="8" fill="#8a9a5a"/>' +
    '<path d="M1,17.4q5.6,-2 11,0q5.6,2 11,0v3q-5.4,2 -11,0q-5.4,-2 -11,0z" fill="#6ba8c0"/>' +
    '<g fill="#8a6a4a">' +
    '<path d="M3,16V7.4l1.4,-1.8l1.4,1.8V16z"/><path d="M6.6,16V8.6L8,6.8l1.4,1.8V16z"/>' +
    '<path d="M10.2,16V8.6l1.4,-1.8l1.4,1.8V16z"/><path d="M13.8,16V8.6l1.4,-1.8l1.4,1.8V16z"/>' +
    '<path d="M17.4,16V7.4l1.4,-1.8l1.4,1.8V16z"/></g>' +
    '<g stroke="#6b4a30" stroke-width="0.9" fill="none"><path d="M3,10.4h17.2M3,13.4h17.2"/></g>' +
    '<rect x="9.4" y="1.4" width="5.2" height="4.4" fill="#a8824f"/>' +
    '<path d="M8.8,1.4h6.4l-0.8,-1.4h-4.8z" fill="#6b4a30"/>' +
    '<rect x="11.2" y="2.6" width="1.8" height="1.8" fill="#4a3a26"/>' +
    '<rect x="10.6" y="5.8" width="2.6" height="10.2" fill="#7a5c38"/>',

  /** 一貫製鉄所(サンニコラス)。**高炉と赤い熱。** */
  steelworks:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#8f8a7c"/>' +
    '<path d="M2.4,22.4V9l3.4,-3.4L9.2,9v13.4z" fill="#7a746a"/>' +
    '<rect x="4" y="3" width="3.6" height="3" fill="#524e44"/>' +
    '<g fill="#e8763f"><rect x="4.2" y="16.6" width="3" height="3.4"/></g>' +
    '<rect x="10.6" y="12.4" width="11.4" height="10" fill="#8a857a"/>' +
    '<rect x="10.6" y="11" width="11.4" height="1.8" fill="#6f6a5e"/>' +
    '<rect x="13" y="4.4" width="2.8" height="6.6" fill="#6f6a5e"/>' +
    '<rect x="18" y="6.4" width="2.6" height="4.6" fill="#6f6a5e"/>' +
    '<g fill="#c8c2b4" opacity=".85"><circle cx="14.4" cy="3" r="1.9"/><circle cx="16.8" cy="1.8" r="1.4"/><circle cx="19.3" cy="4.6" r="1.6"/></g>' +
    '<g fill="#e8763f"><rect x="12.4" y="17" width="2.6" height="3"/><rect x="17" y="17" width="2.6" height="3"/></g>' +
    '<g fill="#f5b31c"><circle cx="8" cy="14.4" r="0.8"/><circle cx="9.8" cy="16" r="0.6"/></g>',

  /** 入植地のシナゴーグ(モイセス・ビジェ)。**1889年、ポグロムから逃れて。** */
  colonysynagogue:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#b8a882"/>' +
    '<rect x="4" y="9.4" width="16" height="13" fill="#e0d0b0"/>' +
    '<path d="M2.8,9.4h18.4l-2,-3.4H4.8z" fill="#8a6a4a"/>' +
    '<path d="M9.4,6l2.6,-4.4L14.6,6z" fill="#a8825c"/>' +
    '<path d="M12,1.2l1.5,2.6h-3z" fill="#c8b494"/>' +
    '<path d="M12,3.2l1.9,3.2h-3.8zM12,7.6l-1.9,-3.2h3.8z" fill="none" stroke="#3f5f9f" stroke-width="0.9"/>' +
    '<path d="M9.4,22.4v-6a2.6,2.6 0 0 1 5.2,0v6z" fill="#5f4c33"/>' +
    '<g fill="#5f7f96"><rect x="5.6" y="12" width="2.6" height="5" rx="1.3"/><rect x="15.8" y="12" width="2.6" height="5" rx="1.3"/></g>' +
    '<g stroke="#b8a482" stroke-width="0.8" fill="none"><path d="M4,12.4h16"/></g>',

  /** 牛乳缶(スンチャレス)。**協同組合が町を建てた。** */
  milkchurn:
    '<rect x="0" y="0" width="24" height="17" fill="#dce8dc"/>' +
    '<rect x="0" y="17" width="24" height="7" fill="#8a9a5a"/>' +
    '<path d="M4.4,21.6v-9.4q-1,-2.4 0,-3.6q0.6,-1 2.4,-1.4v-1.8h4v1.8q1.8,0.4 2.4,1.4q1,1.2 0,3.6v9.4z" fill="#c8ccd0"/>' +
    '<path d="M4.4,12.2q4.4,-1.4 8.8,0" stroke="#9aa4ac" stroke-width="0.9" fill="none"/>' +
    '<rect x="6" y="4.4" width="5.6" height="1.6" rx="0.8" fill="#8f9aa4"/>' +
    '<path d="M4.4,21.6h8.8v1h-8.8z" fill="#8f9aa4"/>' +
    '<rect x="5.6" y="14" width="6.4" height="4.4" rx="0.8" fill="#eef2f4"/>' +
    '<path d="M8.8,14v4.4" stroke="#c8ccd0" stroke-width="0.7" fill="none"/>' +
    '<path d="M15.4,21.6v-7.4q-0.8,-2 0,-3q0.5,-0.8 2,-1.2v-1.4h3.2v1.4q1.5,0.4 2,1.2q0.8,1 0,3v7.4z" fill="#b8bcc2"/>' +
    '<rect x="16.6" y="7.4" width="4.4" height="1.4" rx="0.7" fill="#8f9aa4"/>' +
    '<ellipse cx="9" cy="22.8" rx="7" ry="0.9" fill="#000" opacity=".14"/>',

  /** 王の道の交差点(リオ・クアルト)。**方位の道標。** */
  royalroad:
    '<rect x="0" y="0" width="24" height="17" fill="#e4d8b8"/>' +
    '<rect x="0" y="17" width="24" height="7" fill="#b09a68"/>' +
    '<path d="M0,18.4h24v2H0z" fill="#c2ab72"/>' +
    '<path d="M4,17q7,-2.4 9,-8q0.6,5.6 7,8z" fill="#d0b888" opacity=".9"/>' +
    '<rect x="11" y="4.4" width="2" height="17" fill="#7a5c38"/>' +
    '<path d="M3.4,6.4h8.4l2,1.8l-2,1.8H3.4z" fill="#a8824f"/>' +
    '<path d="M20.6,10.6h-8.2l-2,1.8l2,1.8h8.2z" fill="#a8824f"/>' +
    '<g stroke="#6b4a30" stroke-width="0.9" fill="none"><path d="M5,8.2h6M14,12.4h5"/></g>' +
    '<circle cx="19.4" cy="4" r="2.4" fill="#f5b31c"/>' +
    '<g fill="#8f7350"><circle cx="4.4" cy="20.4" r="0.9"/><circle cx="18.6" cy="21.4" r="0.9"/></g>',

  /** 山が損なわなかった子供たち(サルタ)。**遺体は描かない。雪の火山と博物館。** */
  frozenmummies:
    '<rect x="0" y="0" width="24" height="15" fill="#a8c4d8"/>' +
    '<path d="M0,15L8.4,3.4L17,15z" fill="#8a8ea0"/>' +
    '<path d="M6,6.8L8.4,3.4l2.5,3.4L9.4,8.6L8.4,7.2l-1.2,1.6z" fill="#eef2f4"/>' +
    '<path d="M12,15l5.4,-7l6.6,7z" fill="#7a8496"/>' +
    '<rect x="0" y="15" width="24" height="9" fill="#c8b894"/>' +
    '<rect x="3.4" y="10.4" width="17.2" height="11" fill="#e8dcc0"/>' +
    '<path d="M2.2,10.4h19.6l-1.8,-2.6H4z" fill="#a85a3a"/>' +
    '<g fill="#8a7a5f"><rect x="5.4" y="13" width="2" height="8.4"/><rect x="9.4" y="13" width="2" height="8.4"/><rect x="13.4" y="13" width="2" height="8.4"/><rect x="17.4" y="13" width="2" height="8.4"/></g>' +
    '<rect x="0.8" y="21.4" width="22.4" height="1.6" rx="0.6" fill="#b8a882"/>',

  /** フフイの脱出の松明。**焦土の退却を記念で語る。** */
  exodotorch:
    '<rect x="0" y="0" width="24" height="18" fill="#6b5a8f"/>' +
    '<rect x="0" y="18" width="24" height="6" fill="#4a3f5f"/>' +
    '<path d="M10.6,21.6l0.8,-10h1.6l0.8,10z" fill="#7a5c38"/>' +
    '<path d="M9.6,11.6h5.2l-0.6,-2.4H10.2z" fill="#5f4526"/>' +
    '<path d="M12,8.6q-3.4,-2.4 -2.4,-5.6q1.2,1.4 2,1.2q-0.6,-2 0.6,-3.8q1,1.8 2.4,3.2q1.6,1.6 0.8,3.6q-0.8,2 -3.4,1.4z" fill="#f5b31c"/>' +
    '<path d="M12,8.2q-1.8,-1.6 -1.2,-3.6q1.6,1.4 1.8,3.6z" fill="#e8763f"/>' +
    '<g fill="#f2d98a"><circle cx="8.4" cy="4.4" r="0.7"/><circle cx="16" cy="3.4" r="0.7"/><circle cx="15.4" cy="7.4" r="0.6"/></g>' +
    '<g fill="#8f7aae"><rect x="2.4" y="19.4" width="6" height="1.2" rx="0.6"/><rect x="15.6" y="20.4" width="6" height="1.2" rx="0.6"/></g>' +
    '<ellipse cx="12" cy="22.4" rx="5" ry="0.9" fill="#000" opacity=".2"/>',

  /** 独立が宣言された家(トゥクマン)。**白壁の植民地家屋。1816年7月9日。** */
  independencehall:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#b8a882"/>' +
    '<rect x="1.6" y="8.4" width="20.8" height="14" fill="#f2ece0"/>' +
    '<path d="M0.6,8.4h22.8l-2,-3.4H2.6z" fill="#b05a3a"/>' +
    '<g stroke="#8f4530" stroke-width="0.8" opacity=".7" fill="none"><path d="M4,6.4h16M6,7.4h12"/></g>' +
    '<path d="M8.8,22.4v-8.4a3.2,3.6 0 0 1 6.4,0v8.4z" fill="#7a5c38"/>' +
    '<path d="M10,22.4v-7.4a2,2.4 0 0 1 4,0v7.4z" fill="#5f4526"/>' +
    '<g fill="#5f7f96"><rect x="3.4" y="12" width="3.4" height="5.6"/><rect x="17.2" y="12" width="3.4" height="5.6"/></g>' +
    '<g stroke="#8a7a5f" stroke-width="0.7" fill="none"><path d="M3.4,14.8h3.4M17.2,14.8h3.4M5.1,12v5.6M18.9,12v5.6"/></g>' +
    '<path d="M12,4.6V1.2M12,1.6q2.4,-1 4.4,0.2q-2.2,1 -4.4,0.6z" stroke="#75aadb" stroke-width="1" fill="#75aadb"/>',

  /** 町々の母の礎石(サンティアゴ・デル・エステロ)。**1553年、最古の町。** */
  foundingstone:
    '<rect x="0" y="0" width="24" height="17.4" fill="#e4d8b8"/>' +
    '<rect x="0" y="17.4" width="24" height="6.6" fill="#b09a68"/>' +
    '<path d="M8.4,19.4V8l1.8,-2.6h3.6L15.6,8v11.4z" fill="#a8a294"/>' +
    '<path d="M8.4,19.4V8l1.8,-2.6l0.8,1.2L9.8,8.6v10.8z" fill="#c2bcae"/>' +
    '<rect x="10.4" y="9.4" width="3.2" height="4.4" rx="0.6" fill="#8f8a7c"/>' +
    '<rect x="6.6" y="19.4" width="10.8" height="2.2" fill="#8f8a7c"/>' +
    // 母から伸びる道(ここから他の町々が開かれた)
    '<g stroke="#d0b888" stroke-width="1.6" fill="none"><path d="M8,21.6L1.6,17M16,21.6l6.4,-4.6M12,21.6v-1"/></g>' +
    '<g fill="#7a5c38"><circle cx="2.6" cy="15.6" r="1.4"/><circle cx="21.4" cy="15.6" r="1.4"/></g>' +
    '<path d="M18.4,4.4q1.6,-1.8 3.6,-1q-1.6,1.4 -3.6,1z" fill="#8a9a5a"/>' +
    '<ellipse cx="12" cy="22.4" rx="7" ry="1" fill="#000" opacity=".14"/>',

  /** 手織りのポンチョ(カタマルカ)。**織り機に掛かった一枚。** */
  wovenponcho:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#b8a882"/>' +
    '<g stroke="#7a5c38" stroke-width="1.6" fill="none"><path d="M3,22.4V2.6M21,22.4V2.6M1.6,3.4h20.8"/></g>' +
    '<rect x="5.4" y="5.4" width="13.2" height="14.6" fill="#a8543f"/>' +
    '<g fill="#e0975f"><rect x="5.4" y="7.4" width="13.2" height="1.8"/><rect x="5.4" y="16.4" width="13.2" height="1.8"/></g>' +
    '<g fill="#f2d98a"><rect x="5.4" y="10.2" width="13.2" height="1"/><rect x="5.4" y="14.4" width="13.2" height="1"/></g>' +
    '<rect x="5.4" y="11.8" width="13.2" height="2" fill="#6b3a5f"/>' +
    '<g stroke="#8f4530" stroke-width="0.7" opacity=".7" fill="none"><path d="M7.4,5.4v14.6M10.4,5.4v14.6M13.6,5.4v14.6M16.6,5.4v14.6"/></g>' +
    '<g stroke="#a8543f" stroke-width="1" fill="none"><path d="M6,20v2.2M9,20v2.2M12,20v2.2M15,20v2.2M18,20v2.2"/></g>',

  /** タランパージャの赤い崖(ラ・リオハ)。 */
  talampayacliff:
    '<rect x="0" y="0" width="24" height="18" fill="#a8c4d8"/>' +
    '<rect x="0" y="18" width="24" height="6" fill="#d0a878"/>' +
    '<path d="M0.8,20V4.4h6.6l1.6,4l-1,3l1.4,4.4l-0.6,4.2z" fill="#b0563a"/>' +
    '<path d="M0.8,20V7.4h3.4l1.2,5l-0.8,7.6z" fill="#c26b44"/>' +
    '<path d="M23.2,20V3.4h-7l-1.6,4.6l1.2,3l-1.6,4.4l0.8,4.6z" fill="#a84f34"/>' +
    '<path d="M23.2,20V6.6h-4l-1,5.4l1,8z" fill="#bd6540"/>' +
    '<g stroke="#8f4530" stroke-width="0.9" opacity=".8" fill="none"><path d="M3.4,7v12M5.8,9v10M18.4,6.6v13M20.6,9v11"/></g>' +
    '<path d="M9.4,24q2.6,-8.4 5.2,0z" fill="#e0c49c"/>' +
    '<circle cx="12" cy="4" r="1.8" fill="#f6e8c8"/>' +
    '<path d="M10.4,8.4q1.6,-1.4 3.2,0" stroke="#3a3a34" stroke-width="0.8" fill="none"/>',
  /** 色の縞の丘(フマワカ)。 */
  colorfulhills:
    '<rect x="0" y="0" width="24" height="18" fill="#9cc8e4"/>' +
    '<rect x="0" y="18" width="24" height="6" fill="#c2996b"/>' +
    '<path d="M0.6,19.4L8,4.6l7.4,14.8z" fill="#b06a42"/>' +
    '<path d="M3.4,13.6L8,4.6l4.6,9q-4.6,2 -9.2,0z" fill="#c88f52"/>' +
    '<path d="M5,10.4L8,4.6l3,5.8q-3,1.4 -6,0z" fill="#a85a6b"/>' +
    '<path d="M6.4,7.6L8,4.6l1.6,3q-1.6,0.8 -3.2,0z" fill="#7f8a54"/>' +
    '<path d="M11,19.4L17.6,6.4L24,19.4z" fill="#9a5f44"/>' +
    '<path d="M13.6,14.4l4,-8l3.8,7.6q-3.8,2.2 -7.8,0.4z" fill="#e0975f"/>' +
    '<path d="M15.4,10.6l2.2,-4.2l2.2,4.2q-2.2,1.2 -4.4,0z" fill="#8f6b8f"/>' +
    '<g fill="#8a9a5a"><path d="M2,21.4q1,-2 2.4,-2.6q-0.2,1.8 -1.2,2.6z"/><path d="M20.6,21.4q1,-2 2.4,-2.6q-0.2,1.8 -1.2,2.6z"/></g>' +
    '<circle cx="12" cy="3" r="1.7" fill="#f6e8c8"/>',

  /** 高地のトロンテス(カファジャテ)。**白ぶどうの房と支柱。** */
  torrontesvine:
    '<rect x="0" y="0" width="24" height="17.4" fill="#bfd8e8"/>' +
    '<path d="M0,17.4L5,12l5,5.4z" fill="#8a8ea0"/>' +
    '<path d="M3.4,13.8L5,12l1.7,1.9l-1,1l-0.7,-1l-0.8,0.8z" fill="#eef2f4"/>' +
    '<rect x="0" y="17.4" width="24" height="6.6" fill="#c2a878"/>' +
    '<path d="M2,20.4h20" stroke="#5f8a4f" stroke-width="1.8" fill="none"/>' +
    '<g stroke="#7a5c38" stroke-width="1.4" fill="none"><path d="M12,21.6V6.4M12,8q-4,-1 -5.4,-4M12,8q4,-1 5.4,-4"/></g>' +
    '<g fill="#cfe0a0"><circle cx="10" cy="12.4" r="1.7"/><circle cx="13.2" cy="12" r="1.7"/><circle cx="8.8" cy="15.2" r="1.7"/><circle cx="12" cy="15" r="1.7"/><circle cx="15" cy="14.8" r="1.6"/><circle cx="10.4" cy="17.8" r="1.6"/><circle cx="13.4" cy="17.6" r="1.6"/><circle cx="12" cy="20" r="1.5"/></g>' +
    '<circle cx="10.6" cy="13" r="0.5" fill="#eef4d8"/>' +
    '<g fill="#5f8f4a"><path d="M6.6,4q2.4,-1.6 4.6,-0.4q-2.2,1.4 -4.6,0.4z"/><path d="M17.4,4q-2.4,-1.6 -4.6,-0.4q2.2,1.4 4.6,0.4z"/></g>' +
    '<circle cx="20.6" cy="3.4" r="1.9" fill="#f5b31c"/>',

  /** チャマメのアコーディオン(コリエンテス)。 */
  chamamerhythm:
    '<rect x="0" y="0" width="24" height="18" fill="#8a5f8f"/>' +
    '<rect x="0" y="18" width="24" height="6" fill="#5f4068"/>' +
    '<rect x="2.6" y="4.4" width="5" height="15" rx="1.2" fill="#b03a3a"/>' +
    '<g fill="#f2ecdc"><rect x="3.6" y="6.4" width="1.4" height="2.6"/><rect x="3.6" y="10" width="1.4" height="2.6"/><rect x="3.6" y="13.6" width="1.4" height="2.6"/><circle cx="6.4" cy="7.6" r="0.7"/><circle cx="6.4" cy="10.4" r="0.7"/><circle cx="6.4" cy="13.2" r="0.7"/></g>' +
    '<path d="M7.6,5.4l9,-1.6v17.4l-9,-1.2z" fill="#e8dcc0"/>' +
    '<g stroke="#b8a482" stroke-width="1" fill="none"><path d="M9.4,4.8v15.4M11.2,4.5v15.9M13,4.2v16.3M14.8,4v16.6"/></g>' +
    '<g stroke="#8f3f32" stroke-width="0.7" opacity=".8" fill="none"><path d="M9.4,7.4l7.2,-1.2M9.4,12.4l7.2,-0.4M9.4,17.4l7.2,0.6"/></g>' +
    '<rect x="16.6" y="3" width="4.8" height="18" rx="1.2" fill="#b03a3a"/>' +
    '<g fill="#33302c"><circle cx="19" cy="6" r="0.8"/><circle cx="19" cy="9" r="0.8"/><circle cx="19" cy="12" r="0.8"/><circle cx="19" cy="15" r="0.8"/><circle cx="19" cy="18" r="0.8"/></g>' +
    '<g stroke="#f2d98a" stroke-width="0.9" fill="none"><path d="M2,2.6q1.6,-1.6 3.2,0M20,1.6q1.4,-1.4 2.8,0"/></g>',

  /** ヤシレタダム(ポサダス)。**「腐敗の記念碑」と呼ばれた壁。** */
  yacyretadam:
    '<rect x="0" y="0" width="24" height="10.4" fill="#bfe0ee"/>' +
    '<rect x="0" y="10.4" width="24" height="3" fill="#5f8aa0"/>' +
    '<path d="M0.8,13.4h22.4l-2,-3h-18.4z" fill="#a8a294"/>' +
    '<rect x="0" y="13.4" width="24" height="10.6" fill="#7f9058"/>' +
    '<g fill="#8f8a7c"><rect x="1.6" y="13.4" width="3.6" height="8"/><rect x="7.2" y="13.4" width="3.6" height="8"/><rect x="12.8" y="13.4" width="3.6" height="8"/><rect x="18.4" y="13.4" width="3.6" height="8"/></g>' +
    '<g fill="#dfeef6"><path d="M5.2,13.4h2v8l-1,1.6l-1,-1.6z"/><path d="M10.8,13.4h2v8l-1,1.6l-1,-1.6z"/><path d="M16.4,13.4h2v8l-1,1.6l-1,-1.6z"/></g>' +
    '<g stroke="#a8ccdc" stroke-width="0.9" opacity=".9" fill="none"><path d="M5.4,16h1.6M11,17.4h1.6M16.6,16h1.6"/></g>' +
    '<path d="M0,22.4q6,2 12,0q6,-2 12,0v1.6H0z" fill="#98a86a"/>' +
    '<g stroke="#7f8288" stroke-width="1" fill="none"><path d="M3.4,10.4V6.4M12,10.4V5.6M20.6,10.4V6.4"/></g>' +
    '<path d="M2,6.4h20" stroke="#7f8288" stroke-width="1.2" fill="none"/>',

  /** 三国国境(プエルト・イグアス)。**一点から見える3つの旗。旗は無地。** */
  triplefrontier:
    '<rect x="0" y="0" width="24" height="14.4" fill="#bfe0ee"/>' +
    '<path d="M0,14.4h9.4L12,17l2.6,-2.6H24V24H0z" fill="#3f8fae"/>' +
    '<path d="M0,14.4h9.4L12,17l2.6,-2.6H24v1.6h-8.6L12,19.4L8.6,16H0z" fill="#57a8c0"/>' +
    '<path d="M9.6,24v-4.4a2.4,2 0 0 1 4.8,0V24z" fill="#c2bcae"/>' +
    '<path d="M10.6,24v-3.4a1.4,1.2 0 0 1 2.8,0V24z" fill="#8f8a7c"/>' +
    '<path d="M4,13.4V5l4.4,1.6L4,8.4" stroke="#75aadb" stroke-width="1.2" fill="#75aadb"/>' +
    '<path d="M12,12V2.6l4.4,1.6L12,6" stroke="#4f9a5f" stroke-width="1.2" fill="#4f9a5f"/>' +
    '<path d="M20,13.4V5l-4.4,1.6L20,8.4" stroke="#c8452f" stroke-width="1.2" fill="#c8452f"/>' +
    '<g stroke="#dfeef6" stroke-width="0.9" opacity=".8" fill="none"><path d="M2.6,20.4q2.2,-1 4.4,0M17,21.4q2.2,-1 4.4,0"/></g>',

  /** 野外の彫刻(レシステンシア)。**台座の上の白い曲線。** */
  publicsculpture:
    '<rect x="0" y="0" width="24" height="18" fill="#c8b894"/>' +
    '<rect x="0" y="18" width="24" height="6" fill="#a8a090"/>' +
    '<rect x="6" y="16.4" width="12" height="4" fill="#8f8a7c"/>' +
    '<rect x="7" y="20.4" width="10" height="1.6" fill="#6f6a5e"/>' +
    '<path d="M8.4,16.4q-2.4,-8.4 3.6,-12q-0.6,4.6 1.6,6.6q2.4,-6.6 7,-5.4q-3.4,3 -3,10.8z" fill="#f2ece0"/>' +
    '<path d="M10.6,16.4q-0.6,-6 3,-9.4" stroke="#c8c2b4" stroke-width="1.1" fill="none"/>' +
    '<circle cx="4" cy="4.4" r="1.8" fill="#f6e8c8"/>' +
    '<g fill="#6b8a54"><path d="M1.6,18q1.2,-2.4 3,-3.2q-0.4,2.2 -1.6,3.2z"/><path d="M22.4,18q-1.2,-2.4 -3,-3.2q0.4,2.2 1.6,3.2z"/></g>' +
    '<ellipse cx="12" cy="22.8" rx="7" ry="0.9" fill="#000" opacity=".16"/>',

  /** 柑橘の木(コンコルディア)。 */
  citrusgrove:
    '<rect x="0" y="0" width="24" height="17.4" fill="#cfe4f0"/>' +
    '<rect x="0" y="17.4" width="24" height="6.6" fill="#8a9a5a"/>' +
    '<rect x="10.6" y="12.4" width="2.8" height="9" fill="#7a5c38"/>' +
    '<path d="M10.6,14.4l-4,-3.4l1.2,-1.2l3.4,3z" fill="#7a5c38"/>' +
    '<ellipse cx="12" cy="8" rx="9.4" ry="6.6" fill="#3f8052"/>' +
    '<ellipse cx="7" cy="6.4" rx="4" ry="3" fill="#4f9a5f"/>' +
    '<ellipse cx="16.4" cy="5.6" rx="3.6" ry="2.8" fill="#4f9a5f"/>' +
    '<g fill="#e8943f"><circle cx="7.4" cy="9.4" r="1.7"/><circle cx="12" cy="6" r="1.7"/><circle cx="16.6" cy="9" r="1.7"/><circle cx="10" cy="12" r="1.6"/><circle cx="14.6" cy="12.4" r="1.6"/></g>' +
    '<g fill="#f2b05f"><circle cx="6.9" cy="8.9" r="0.5"/><circle cx="11.5" cy="5.5" r="0.5"/><circle cx="16.1" cy="8.5" r="0.5"/></g>' +
    '<circle cx="20.4" cy="19.6" r="1.6" fill="#e8943f"/>' +
    '<path d="M2.4,19.4h4.4a2.2,2.2 0 0 1 -4.4,0z" fill="#a8823f"/>' +
    '<ellipse cx="12" cy="22" rx="7" ry="1" fill="#000" opacity=".14"/>',

  /** カーニバルの山車(グアレグアイチュ)。**顔は描かない。羽根と光で語る。** */
  carnivalfloat:
    '<rect x="0" y="0" width="24" height="18" fill="#4a3f5f"/>' +
    '<rect x="0" y="18" width="24" height="6" fill="#6b4a5f"/>' +
    '<g fill="#3fa89a"><path d="M12,17l-7.4,-11l2.2,-1.2L12,14z"/><path d="M12,17l-2.6,-13.4l2.6,-0.6l2.6,0.6L12,17z"/><path d="M12,17l7.4,-11l-2.2,-1.2L12,14z"/></g>' +
    '<g fill="#57c8b8"><path d="M12,16l-4.4,-8.4l1.4,-0.8L12,14z"/><path d="M12,16l4.4,-8.4l-1.4,-0.8L12,14z"/></g>' +
    '<g fill="#f5b31c"><circle cx="5.4" cy="5.4" r="1.3"/><circle cx="12" cy="2.6" r="1.3"/><circle cx="18.6" cy="5.4" r="1.3"/></g>' +
    '<rect x="6.4" y="15.4" width="11.2" height="4.4" rx="1.4" fill="#b84a6b"/>' +
    '<g fill="#f2d98a"><circle cx="8.6" cy="17.6" r="0.8"/><circle cx="12" cy="17.6" r="0.8"/><circle cx="15.4" cy="17.6" r="0.8"/></g>' +
    '<g fill="#33302c"><circle cx="9" cy="20.6" r="1.5"/><circle cx="15" cy="20.6" r="1.5"/></g>' +
    '<g fill="#e8443f"><circle cx="3" cy="12" r="0.7"/><circle cx="21" cy="12.4" r="0.7"/><circle cx="2.6" cy="16.4" r="0.6"/><circle cx="21.4" cy="16.6" r="0.6"/></g>',

  /** 連合の首都だった政庁(パラナ)。**ドームの建物。** */
  confederationcapital:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#b8a882"/>' +
    '<rect x="2.4" y="12.4" width="19.2" height="10" fill="#e8dcc0"/>' +
    '<rect x="1.4" y="10.6" width="21.2" height="2.4" fill="#b8a482"/>' +
    '<path d="M6.4,10.6a5.6,5 0 0 1 11.2,0z" fill="#5f8a8f"/>' +
    '<path d="M8.4,10.6a3.6,3.6 0 0 1 7.2,0z" fill="#7aa4a8"/>' +
    '<path d="M12,5.6V3.4M11,4.2h2" stroke="#5f8a8f" stroke-width="0.9" fill="none"/>' +
    '<g fill="#8a7a5f"><rect x="4.4" y="14" width="1.8" height="8.4"/><rect x="8.4" y="14" width="1.8" height="8.4"/><rect x="13.8" y="14" width="1.8" height="8.4"/><rect x="17.8" y="14" width="1.8" height="8.4"/></g>' +
    '<path d="M10.8,22.4v-5.4a1.7,2 0 0 1 3.4,0v5.4z" fill="#5f4c33"/>' +
    '<path d="M3.4,14h17.2" stroke="#c8b894" stroke-width="0.8" fill="none"/>',

  /** ケブラチョのタンニン工場(フォルモサ)。**「斧を折る」硬い赤い木。** */
  quebrachoworks:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#a8925f"/>' +
    '<rect x="1.6" y="12.4" width="12.8" height="10" fill="#9a8a6a"/>' +
    '<path d="M0.8,12.4h14.4l-1.6,-3H2.4z" fill="#6b5a3a"/>' +
    '<rect x="4" y="4.4" width="2.8" height="5" fill="#7a6a4a"/>' +
    '<g fill="#c8c2b4" opacity=".8"><circle cx="5.6" cy="3" r="1.6"/><circle cx="7.8" cy="1.8" r="1.2"/></g>' +
    '<rect x="3.6" y="15" width="3" height="3" fill="#e8763f"/>' +
    '<rect x="9" y="15" width="3.4" height="7.4" fill="#5f4c33"/>' +
    // 主役:積まれた赤心材の丸太
    '<g><circle cx="18" cy="20.6" r="2.6" fill="#8a4a30"/><circle cx="22" cy="20.6" r="2.6" fill="#8a4a30"/><circle cx="20" cy="16.6" r="2.6" fill="#8a4a30"/>' +
    '<circle cx="18" cy="20.6" r="1.3" fill="#c26b44"/><circle cx="22" cy="20.6" r="1.3" fill="#c26b44"/><circle cx="20" cy="16.6" r="1.3" fill="#c26b44"/></g>' +
    '<path d="M16.4,10.4l3,-2.4l1,1.2l-3,2.4z" fill="#7a746a"/>' +
    '<rect x="19.6" y="7" width="1.6" height="3.4" fill="#7a5c38" transform="rotate(38 20.4 8.7)"/>',

  /** アセキアの水路(メンドーサ)。**乾いた土地を貫く青い一本。** */
  acequiacanal:
    '<rect x="0" y="0" width="24" height="24" fill="#d8c090"/>' +
    '<path d="M0,7.4L4.4,2.6L9,7.4z" fill="#8a8ea0"/>' +
    '<path d="M3.2,3.9L4.4,2.6l1.3,1.4l-0.7,0.7l-0.6,-0.8l-0.6,0.7z" fill="#eef2f4"/>' +
    '<circle cx="19.4" cy="4" r="2.2" fill="#f5b31c"/>' +
    // 主役:画面を斜めに貫く石組みの水路
    '<path d="M0,10.4L24,14v2.2L0,12.6z" fill="#8f8a7c"/>' +
    '<path d="M0,17.4L24,21v2.2L0,19.6z" fill="#8f8a7c"/>' +
    '<path d="M0,12.6L24,16.2v4.8L0,17.4z" fill="#57a8c0"/>' +
    '<g stroke="#bfe8f4" stroke-width="1" opacity=".9" fill="none"><path d="M3,14.6q2,-0.8 4,0M10,16q2,-0.8 4,0M17,17.6q2,-0.8 4,0"/></g>' +
    // 水路の上だけ緑(ぶどうとプラタナス)
    '<g fill="#4f7f3f"><ellipse cx="4.4" cy="8.4" rx="2.6" ry="2"/><ellipse cx="12" cy="9.6" rx="2.8" ry="2"/><ellipse cx="19.6" cy="10.8" rx="2.6" ry="2"/></g>' +
    // 水路の外は乾いたまま
    '<g fill="#b09a64"><circle cx="4" cy="22.4" r="0.9"/><circle cx="14" cy="23" r="0.8"/><circle cx="21" cy="23.4" r="0.8"/><circle cx="16" cy="7.4" r="0.9"/><circle cx="9" cy="5.6" r="0.8"/></g>',

  /** アトゥエル渓谷(サンラファエル)。**水が刻み、のちにその水を貯めた。** */
  atuelcanyon:
    '<rect x="0" y="0" width="24" height="16" fill="#bfd8e8"/>' +
    '<path d="M0.8,18V3.4h6.4L9.4,9l-1.6,4l1.2,5z" fill="#b0563a"/>' +
    '<path d="M23.2,18V3.4h-6.4L14.6,9l1.6,4l-1.2,5z" fill="#c26b44"/>' +
    '<g stroke="#8f4530" stroke-width="0.9" opacity=".8" fill="none"><path d="M3.4,6v10M5.8,8v9M18.4,6v10M20.6,8v9"/></g>' +
    '<rect x="0" y="18" width="24" height="6" fill="#8a7350"/>' +
    // ダムと貯水池
    '<path d="M8,13.4h8v4.6H8z" fill="#a8a294"/>' +
    '<g stroke="#8f8a7c" stroke-width="0.8" fill="none"><path d="M10.6,13.4v4.6M13.4,13.4v4.6"/></g>' +
    '<path d="M8.6,4.6h6.8v8.8H8.6z" fill="#3f8fae"/>' +
    '<g stroke="#bfe8f4" stroke-width="0.9" opacity=".8" fill="none"><path d="M9.6,7q1.2,-0.6 2.4,0M11.6,10q1.2,-0.6 2.4,0"/></g>' +
    '<path d="M11,18q1,2.6 0,6h2q-1,-3.4 0,-6z" fill="#57a8c0"/>' +
    // カヤック
    '<path d="M9.4,11.6q2.6,1.2 5.2,0q-2.6,2 -5.2,0z" fill="#f5b31c"/>',

  /** 耐震で建て直した町(サンフアン)。**筋交いの入った低い家。1944年の教訓。** */
  quakerelief:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#b8a882"/>' +
    '<rect x="2.4" y="10.4" width="19.2" height="12" fill="#e8dcc0"/>' +
    '<path d="M1.4,10.4h21.2l-2,-3.6H3.4z" fill="#8f4a38"/>' +
    // 目立つ筋交い(アンチサイスミックの印)
    '<g stroke="#8a6a4a" stroke-width="1.6" fill="none"><path d="M3.4,11.4l7,10M10.4,11.4l-7,10M13.6,11.4l7,10M20.6,11.4l-7,10"/></g>' +
    '<rect x="9.6" y="14.4" width="4.8" height="8" fill="#5f4c33"/>' +
    '<g stroke="#8a7a5f" stroke-width="1.2" fill="none"><path d="M2.4,10.4v12M21.6,10.4v12M2.4,22.4h19.2"/></g>' +
    // 手前:昔の壁の名残がわずかに(隅の低い石積み)
    '<g fill="#a8a294"><rect x="0.6" y="20" width="2.6" height="2.4"/><rect x="20.8" y="20" width="2.6" height="2.4"/></g>' +
    '<circle cx="12" cy="3.4" r="1.8" fill="#f6e8c8"/>',

  /** 乾いたシエラの町(サンルイス)。 */
  sierrapueblo:
    '<rect x="0" y="0" width="24" height="17" fill="#c8dce8"/>' +
    '<path d="M0,17L7,6l7,11z" fill="#a8825c"/>' +
    '<path d="M9.4,17l6,-9l8.6,9z" fill="#8f6b4f"/>' +
    '<rect x="0" y="17" width="24" height="7" fill="#c2a878"/>' +
    '<rect x="3.4" y="14.4" width="7.4" height="7" fill="#e8dcc0"/>' +
    '<path d="M2.6,14.4h9l-1.2,-2.2H3.8z" fill="#a85a3a"/>' +
    '<rect x="6" y="17" width="2.4" height="4.4" fill="#6b5330"/>' +
    '<rect x="13.6" y="16" width="6.4" height="5.4" fill="#e0d0b0"/>' +
    '<path d="M12.8,16h8l-1,-2h-6z" fill="#8f4a38"/>' +
    '<rect x="15.6" y="17.6" width="2.2" height="3.8" fill="#5f4c33"/>' +
    '<path d="M21.6,21.4q0.6,-3.4 -0.6,-5.4" stroke="#5f8a4f" stroke-width="1.3" fill="none"/>' +
    '<path d="M21,17.6q-1.4,-0.6 -1.8,-2.2M21.2,18.6q1.4,-0.4 2,-1.8" stroke="#5f8a4f" stroke-width="1.1" fill="none"/>' +
    '<circle cx="4.4" cy="3.6" r="1.9" fill="#f5b31c"/>',

  /** 鉄道に選ばれて栄えた分岐点(ビジャ・メルセデス)。**腕木信号と分かれる線路。** */
  junctionboom:
    '<rect x="0" y="0" width="24" height="16.4" fill="#cfe0e4"/>' +
    '<rect x="0" y="16.4" width="24" height="7.6" fill="#a89a72"/>' +
    // 分岐する2本の線路
    '<g fill="#5f4c33"><rect x="1" y="17.6" width="22" height="1.4"/><rect x="1" y="20.6" width="10" height="1.4"/></g>' +
    '<path d="M2,16.6L22,16.6" stroke="#8a8f92" stroke-width="1.1" fill="none"/>' +
    '<path d="M2,19.2h20M2,22.2h9M11,22.2q6,-0.4 11,-3" stroke="#8a8f92" stroke-width="1.1" fill="none"/>' +
    // 腕木信号機(主役)
    '<rect x="16.6" y="3.4" width="1.8" height="13" fill="#5f5a50"/>' +
    '<rect x="18.4" y="4.4" width="5" height="2" fill="#c8452f"/>' +
    '<rect x="21.6" y="4.4" width="1.8" height="2" fill="#efe8d8"/>' +
    '<rect x="18.4" y="8.4" width="4.2" height="1.8" fill="#c8452f" transform="rotate(-32 18.4 9.3)"/>' +
    '<circle cx="17.5" cy="14" r="1" fill="#f5b31c"/>' +
    // 貨物の活気(左の貨車)
    '<rect x="2.4" y="12.4" width="9.4" height="5" fill="#8a4a30"/>' +
    '<rect x="2.4" y="11.6" width="9.4" height="1.2" fill="#5f3320"/>' +
    '<g fill="#33302c"><circle cx="4.6" cy="18.2" r="1.3"/><circle cx="9.6" cy="18.2" r="1.3"/></g>' +
    '<g fill="#d8c88f"><ellipse cx="13.6" cy="15.6" rx="1.8" ry="0.9"/><ellipse cx="14.4" cy="14.2" rx="1.4" ry="0.8"/></g>',

  /** パジュニアの黒い錐(マラルグエ)。 */
  payuniacone:
    '<rect x="0" y="0" width="24" height="17.4" fill="#a8c4d8"/>' +
    '<rect x="0" y="17.4" width="24" height="6.6" fill="#b09a74"/>' +
    '<path d="M1,18.4L7,8.6l6,9.8z" fill="#524a40"/>' +
    '<path d="M5,18.4L7,12l2.2,6.4z" fill="#7a4a38"/>' +
    '<path d="M10.4,18.4l5.8,-11l7,11z" fill="#4a4038"/>' +
    '<path d="M13.6,18.4l2.6,-7.4l3,7.4z" fill="#6b4438"/>' +
    '<path d="M18.6,13.4L21,9.4l3,4.6v4.4h-2z" fill="#553f36"/>' +
    // 手前の黒い火山礫
    '<g fill="#4a4038"><circle cx="4" cy="21.4" r="1.4"/><circle cx="9.4" cy="22.4" r="1.1"/><circle cx="15" cy="21" r="1.3"/><circle cx="20.4" cy="22.4" r="1.2"/></g>' +
    '<g stroke="#a8925f" stroke-width="0.9" fill="none"><path d="M6.6,20.4q0.6,-1.6 1.6,-2.2M17.6,20.6q0.6,-1.6 1.6,-2.2"/></g>' +
    '<circle cx="12" cy="3.4" r="1.7" fill="#f6e8c8"/>' +
    '<path d="M2.6,4.4q1.8,-1.2 3.6,0" stroke="#eef0ec" stroke-width="1" fill="none"/>',

  /** 石と木のチョコレート店(バリローチェ)。 */
  chocolatechalet:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#9aa584"/>' +
    // 1階が石、2階が木、深い軒
    '<rect x="3.4" y="16.4" width="17.2" height="6" fill="#8f8a7c"/>' +
    '<g fill="#c8c2b4"><circle cx="6.4" cy="18.4" r="1"/><circle cx="10.4" cy="20" r="1.1"/><circle cx="15.4" cy="18" r="1"/><circle cx="18.4" cy="20" r="0.9"/></g>' +
    '<rect x="4.4" y="10.4" width="15.2" height="6" fill="#8a5f3a"/>' +
    '<g stroke="#6b4a2c" stroke-width="0.9" fill="none"><path d="M4.4,12.4h15.2M4.4,14.4h15.2"/></g>' +
    '<path d="M1.6,11L12,3.4L22.4,11l-1.6,1.6L12,6.4l-8.8,6.2z" fill="#5f4030"/>' +
    '<path d="M3.8,11L12,5l8.2,6z" fill="#7a4f38"/>' +
    '<g fill="#f2d98a"><rect x="6.4" y="11.6" width="3" height="3.4"/><rect x="14.6" y="11.6" width="3" height="3.4"/></g>' +
    '<rect x="10.4" y="17" width="3.4" height="5.4" fill="#5f4030"/>' +
    // 板チョコの看板
    '<rect x="15.4" y="16.8" width="3.6" height="2.6" fill="#5a3826"/>' +
    '<g stroke="#7a5240" stroke-width="0.5" fill="none"><path d="M16.6,16.8v2.6M18.2,16.8v2.6M15.4,18.1h3.6"/></g>' +
    '<path d="M12,3.4v-2" stroke="#5f4030" stroke-width="1" fill="none"/>',

  /** ティタノサウルスの骨(ネウケン)。**地面から現れる大腿骨。** */
  titanosaurbone:
    '<rect x="0" y="0" width="24" height="15.4" fill="#e8d8b8"/>' +
    '<g fill="#a87a52"><rect x="0" y="4.4" width="24" height="2"/><rect x="0" y="10" width="24" height="1.6"/></g>' +
    '<rect x="0" y="15.4" width="24" height="8.6" fill="#cfae7c"/>' +
    // 発掘区画のロープ
    '<g fill="#8a6a4a"><rect x="2" y="14" width="1.2" height="4"/><rect x="21" y="14" width="1.2" height="4"/></g>' +
    '<path d="M2.6,14.6h18.8" stroke="#e8dcc0" stroke-width="0.8" fill="none"/>' +
    // 主役:大腿骨(両端の骨端を大きく)
    '<g fill="#efeae0"><circle cx="4.6" cy="16.6" r="2.4"/><circle cx="6.2" cy="19.6" r="2.4"/><circle cx="19.4" cy="17.6" r="2.4"/><circle cx="20.6" cy="20.6" r="2.4"/><path d="M5,15.4l14.8,1.2l1,4.4l-15.4,-1.2z"/></g>' +
    '<path d="M7.4,17.4l10.4,0.9" stroke="#d4c8ac" stroke-width="1.2" fill="none"/>' +
    '<path d="M4.6,16.6l1.6,3M19.4,17.6l1.2,3" stroke="#d4c8ac" stroke-width="0.8" fill="none"/>' +
    '<ellipse cx="12" cy="21.6" rx="8.4" ry="1" fill="#000" opacity=".12"/>' +
    // 刷毛
    '<rect x="18.4" y="21" width="3.6" height="1.2" rx="0.6" fill="#8a6a4a" transform="rotate(-18 20.2 21.6)"/>',

  /** 水を掘って当てた石油(コモドロ・リバダビア)。**やぐらと最初の黒い滴。** */
  oildrill:
    '<rect x="0" y="0" width="24" height="17.4" fill="#cfe0e4"/>' +
    '<rect x="0" y="17.4" width="24" height="6.6" fill="#a09572"/>' +
    '<g stroke="#5f5a50" stroke-width="1.4" fill="none">' +
    '<path d="M8,21.4L11,3.4h2L16,21.4M9,16h6M9.6,11.4h4.8M10.2,7.4h3.6"/>' +
    '<path d="M8.8,16l5.4,-4.6M15.2,16l-5.4,-4.6M9.8,11.4l4.2,-4M14.2,11.4l-4.2,-4"/></g>' +
    '<rect x="10.6" y="2" width="2.8" height="1.8" fill="#5f5a50"/>' +
    '<path d="M12,4.4v11" stroke="#33302c" stroke-width="1" fill="none"/>' +
    '<path d="M10.6,17.4h2.8l2,4h-6.8z" fill="#33302c"/>' +
    '<path d="M12,15.4q1.4,2 0,3.4q-1.4,-1.4 0,-3.4z" fill="#33302c"/>' +
    // 風(この土地のもう一つの資源)
    '<g stroke="#eef0ec" stroke-width="1.1" opacity=".9" fill="none"><path d="M1.6,5.4q3,-1.6 6,0M2.6,9q2.6,-1.4 5.2,0"/></g>' +
    '<g fill="#8f7350"><circle cx="4" cy="20.4" r="1"/><circle cx="20" cy="21.4" r="1"/></g>',

  /** ミモサ号(プエルト・マドリン)。**入植者を運んだ帆船。横帆を大きく張る。** */
  mimosaship:
    '<rect x="0" y="0" width="24" height="16.4" fill="#bfd8e8"/>' +
    '<rect x="0" y="16.4" width="24" height="7.6" fill="#2f6688"/>' +
    '<path d="M1.6,17.4h20.8l-3,4.2H4.6z" fill="#5a4630"/>' +
    '<rect x="1.6" y="16.2" width="20.8" height="1.6" fill="#3f3020"/>' +
    '<g stroke="#4a3a24" stroke-width="1.1" fill="none"><path d="M7.4,16.2V1.6M16.6,16.2V3.4"/></g>' +
    // 前マストの横帆2枚(風をはらむ)
    '<path d="M3,3h8.8q-1.2,2.2 0,4.4H3q1.2,-2.2 0,-4.4z" fill="#efe8d8"/>' +
    '<path d="M2.4,8.6h10q-1.2,2.6 0,5.2h-10q1.2,-2.6 0,-5.2z" fill="#f4efe2"/>' +
    // 後マストの横帆2枚
    '<path d="M12.6,4.6h8q-1,2 0,4h-8q1,-2 0,-4z" fill="#efe8d8"/>' +
    '<path d="M12.2,10h9q-1.1,2.4 0,4.8h-9q1.1,-2.4 0,-4.8z" fill="#f4efe2"/>' +
    '<g stroke="#d8d0ba" stroke-width="0.7" opacity=".9" fill="none"><path d="M4,5.2h7M3.6,11.2h8.4M13.4,6.6h6.6M13.4,12.4h7.4"/></g>' +
    '<path d="M7.4,1.6L16.6,3.4" stroke="#4a3a24" stroke-width="0.8" fill="none"/>' +
    '<g stroke="#dfeef6" stroke-width="1" opacity=".8" fill="none"><path d="M2,20.6q2.6,-1.2 5.2,0M16,21.8q2.6,-1.2 5.2,0"/></g>' +
    '<path d="M21,1.4q1.6,-1 3,0q-1.4,0.8 -3,0z" fill="#3a3a34"/>',

  /** 入植者が自分たちで敷いた鉄道(トレレウ)。**赤煉瓦の車庫。** */
  welshrail:
    '<rect x="0" y="0" width="24" height="17" fill="#dce4e0"/>' +
    '<rect x="0" y="17" width="24" height="7" fill="#a09a76"/>' +
    '<rect x="3.4" y="8.4" width="17.2" height="10" fill="#9a5a42"/>' +
    '<path d="M2.2,8.4h19.6L12,1.6z" fill="#7a4232"/>' +
    '<path d="M4.6,8L12,2.8L19.4,8z" fill="#8f4f3a"/>' +
    '<g stroke="#7a4232" stroke-width="0.8" opacity=".8" fill="none"><path d="M3.4,11h17.2M3.4,13.6h17.2M3.4,16h17.2"/></g>' +
    '<path d="M8.4,18.4v-7a3.6,4 0 0 1 7.2,0v7z" fill="#33302c"/>' +
    '<path d="M9.6,18.4v-6a2.4,2.8 0 0 1 4.8,0v6z" fill="#5f5a50"/>' +
    '<circle cx="12" cy="6.4" r="1.4" fill="#e8dcc0"/>' +
    '<g fill="#6b5a3a"><rect x="1" y="20.4" width="3" height="1.4"/><rect x="6.4" y="20.4" width="3" height="1.4"/><rect x="11.8" y="20.4" width="3" height="1.4"/><rect x="17.2" y="20.4" width="3" height="1.4"/></g>' +
    '<g fill="#7f8288"><rect x="0" y="19.6" width="24" height="0.9"/><rect x="0" y="22.4" width="24" height="0.9"/></g>',

  /** 750mm軌の石炭貨車(リオ・ガジェゴス)。 */
  coalnarrowgauge:
    '<rect x="0" y="0" width="24" height="16" fill="#c8d4d8"/>' +
    '<rect x="0" y="16" width="24" height="8" fill="#9aa584"/>' +
    '<rect x="2.4" y="8.4" width="19.2" height="8" fill="#5f6258"/>' +
    '<g stroke="#40433c" stroke-width="0.9" fill="none"><path d="M7,8.4v8M12,8.4v8M17,8.4v8"/></g>' +
    '<rect x="2.4" y="8.4" width="19.2" height="1.2" fill="#7a7e74"/>' +
    // 石炭の山
    '<g fill="#33302c"><circle cx="5.4" cy="7.4" r="1.9"/><circle cx="8.8" cy="6.4" r="2.1"/><circle cx="12.4" cy="7" r="2"/><circle cx="15.8" cy="6.2" r="2"/><circle cx="19" cy="7.4" r="1.8"/></g>' +
    '<g fill="#524e48"><circle cx="7.2" cy="6" r="0.8"/><circle cx="13.8" cy="5.6" r="0.8"/><circle cx="17.6" cy="6.6" r="0.7"/></g>' +
    '<g fill="#2f2b26"><circle cx="6.6" cy="17.4" r="1.9"/><circle cx="17.4" cy="17.4" r="1.9"/></g>' +
    '<g fill="#8a8f92"><circle cx="6.6" cy="17.4" r="0.7"/><circle cx="17.4" cy="17.4" r="0.7"/></g>' +
    '<g fill="#6b5a3a"><rect x="1" y="20" width="2.8" height="1.4"/><rect x="6" y="20" width="2.8" height="1.4"/><rect x="11" y="20" width="2.8" height="1.4"/><rect x="16" y="20" width="2.8" height="1.4"/><rect x="21" y="20" width="2.4" height="1.4"/></g>' +
    '<rect x="0" y="19.4" width="24" height="0.8" fill="#7f8288"/>' +
    '<rect x="0" y="21.6" width="24" height="0.8" fill="#7f8288"/>' +
    '<g stroke="#eef0ec" stroke-width="1" opacity=".85" fill="none"><path d="M1.6,3q2.6,-1.4 5.2,0M16,2.4q2.6,-1.4 5.2,0"/></g>',

  /** 監獄の薪列車(ウシュアイア)。**雪の白地に黒い蒸機。いまは観光列車。** */
  prisontrain:
    '<rect x="0" y="0" width="24" height="17" fill="#dce4e8"/>' +
    '<path d="M0,8L5,3l5,5z" fill="#6f7a8f"/>' +
    '<path d="M3.4,4.6L5,3l1.7,1.7l-0.9,0.9L5,4.8l-0.8,0.7z" fill="#eef2f4"/>' +
    '<path d="M14,8l5,-5l5,5z" fill="#6f7a8f"/>' +
    '<path d="M17.4,4.6L19,3l1.7,1.7l-0.9,0.9l-0.8,-0.8l-0.8,0.7z" fill="#eef2f4"/>' +
    '<rect x="0" y="17" width="24" height="7" fill="#e8ecec"/>' +
    '<g fill="#c8c2b4" opacity=".8"><circle cx="4.4" cy="6.4" r="1.6"/><circle cx="6.8" cy="4.8" r="1.2"/></g>' +
    '<rect x="2.6" y="10.4" width="11" height="6" fill="#33302c"/>' +
    '<rect x="13.6" y="7.4" width="5.4" height="9" fill="#33302c"/>' +
    '<rect x="14.8" y="8.8" width="2.4" height="2.6" fill="#f2d98a"/>' +
    '<rect x="3.6" y="6.4" width="2.4" height="4" fill="#1f1d1a"/>' +
    '<rect x="8.4" y="8.6" width="2.6" height="1.8" fill="#c8452f"/>' +
    '<path d="M1.6,16.4h18.6v1.2H1.6z" fill="#c8452f"/>' +
    '<g fill="#1f1d1a"><circle cx="5.4" cy="18.6" r="1.7"/><circle cx="9.6" cy="18.6" r="1.7"/><circle cx="15.4" cy="18.6" r="2"/></g>' +
    '<g fill="#8a8f92"><circle cx="5.4" cy="18.6" r="0.6"/><circle cx="9.6" cy="18.6" r="0.6"/><circle cx="15.4" cy="18.6" r="0.7"/></g>' +
    '<g fill="#6b5a3a"><rect x="1" y="21" width="2.8" height="1.4"/><rect x="6.4" y="21" width="2.8" height="1.4"/><rect x="11.8" y="21" width="2.8" height="1.4"/><rect x="17.2" y="21" width="2.8" height="1.4"/></g>' +
    '<rect x="0" y="20.4" width="24" height="0.8" fill="#7f8288"/>',

  /** ペンギンと組立工場(リオ・グランデ)。**税法が羊の牧場を工場に変えた。** */
  penguinelectronics:
    '<rect x="0" y="0" width="24" height="17.4" fill="#c8d4d8"/>' +
    '<rect x="0" y="17.4" width="24" height="6.6" fill="#b0a884"/>' +
    // 奥:組立工場(鋸屋根)
    '<path d="M12.4,17.4V8.4l3.4,-2.4v2.4l3.4,-2.4v2.4l3.6,-2.4v11.4z" fill="#8f8a7c"/>' +
    '<path d="M12.4,8.4l3.4,-2.4v2.4zM19.2,8.4l3.6,-2.4v2.4z" fill="#6f6a5e"/>' +
    '<g fill="#5f7f96"><rect x="14" y="11" width="2.6" height="2.4"/><rect x="18.4" y="11" width="2.6" height="2.4"/></g>' +
    '<rect x="15.6" y="14.4" width="3" height="3" fill="#5f4c33"/>' +
    // 主役:キングペンギン(道路で行けるコロニー)
    '<ellipse cx="6.4" cy="14.4" rx="4.4" ry="7.4" fill="#33363c"/>' +
    '<path d="M3.4,12.4q3,-2 6,0q0.8,4.4 -0.6,8.4q-2.4,1 -4.8,0q-1.4,-4 -0.6,-8.4z" fill="#eef2f4"/>' +
    '<circle cx="6.4" cy="6.2" r="2.6" fill="#33363c"/>' +
    '<path d="M6.4,7.4q2,0.4 2.6,2q-1.4,0.4 -2.6,-0.4z" fill="#f5b31c"/>' +
    '<path d="M8.6,5.4l2.6,0.6l-2.4,1z" fill="#33363c"/>' +
    '<path d="M2.2,11.4q-0.8,3 0.6,5.4" stroke="#33363c" stroke-width="1.4" fill="none"/>' +
    '<g fill="#33363c"><path d="M4.6,21.6h1.8l-0.4,1.2H4.6z"/><path d="M7.4,21.6h1.8l-0.4,1.2H7.4z"/></g>' +
    '<ellipse cx="6.4" cy="22.8" rx="4.4" ry="0.8" fill="#000" opacity=".14"/>',
};


