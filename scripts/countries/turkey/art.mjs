/**
 * トルコの都市イラスト。
 *
 * `TURKEY_MARKS` は24×24の座標系に描くシンボル、`TURKEY_BG` は400×210の
 * 座標系に描く背景シーン(いずれもSVG断片の文字列)。韓国・フランスと同じく
 * 最初から文字列として持つ。動きは含めない(アニメーションはReact側で重ねる)。
 *
 * 色は他の盤面と揃える。空 #8fc4e8〜#cfe4f0、顔・白 #f6efe2、
 * 強調 #f5b31c/#e8443f/#5b8fe8。トルコらしさは
 * **イズニク陶器のトルコ石 #1a7a8f・群青 #1e4a8f、モスクの鉛色ドーム #7a8290、
 * 石灰岩の白 #e8dcc0、オリーブの銀緑 #8a9a6a、アナトリアの土色 #b3ab6a** で出す。
 *
 * 鍵は `cities.mjs` の `mark` / `bg` と一対一で対応する。
 * 増やすときは両方を揃えること。
 *
 * **背景SVGの中央25%(x=151〜249 / y=54〜152)は都市シンボルに隠れて
 * 見えない。** 見せたい細部は左右3分の1と手前(y>170)に置く。
 * `sky()` は必ず第3引数(次に来る塗りの開始y)を渡すこと。渡し忘れると
 * 空と地面のあいだに塗り残しの帯ができる(茨城・韓国の両方で踏んだ穴)。
 *
 * 密度の目安は背景1枚あたり40要素(韓国の27より厚くする)。
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

function moon(cx, cy, r, fill = "#f6efe2") {
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

/** アナトリアの乾いた山。稜線が鋭く、雪冠は任意。 */
function anatoliaMountain(cx, base, h, fill = "#9a9488", snow = true) {
  const w = r1(h * 1.3);
  let out = `<path d="M${r1(cx - w / 2)},${base}L${r1(cx - w * 0.1)},${r1(base - h)}L${r1(cx + w * 0.12)},${r1(base - h * 0.6)}L${r1(cx + w / 2)},${base}z" fill="${fill}"/>`;
  if (snow) {
    out += `<path d="M${r1(cx - w * 0.1)},${r1(base - h)}L${r1(cx)},${r1(base - h * 0.8)}L${r1(cx + w * 0.06)},${r1(base - h * 0.86)}z" fill="#f2f6f8"/>`;
  }
  return out;
}

/** ドーム(モスクの円蓋)。 */
function dome(x, base, w, h, fill = "#7a8290") {
  const hw = r1(w / 2);
  return (
    `<path d="M${r1(x - hw)},${base}A${hw},${r1(h)} 0 0 1 ${r1(x + hw)},${base}z" fill="${fill}"/>` +
    `<rect x="${r1(x - 2)}" y="${r1(base - h - 10)}" width="4" height="8" fill="${fill}"/>` +
    `<circle cx="${x}" cy="${r1(base - h - 12)}" r="2.4" fill="#c9a227"/>`
  );
}

/** ミナレット(尖塔)。細い塔+バルコニー+円錐の帽子。 */
function minaret(x, base, h, fill = "#e8dcc0") {
  const w = r1(h * 0.1);
  return (
    `<rect x="${r1(x - w / 2)}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${fill}"/>` +
    `<rect x="${r1(x - w * 0.9)}" y="${r1(base - h * 0.78)}" width="${r1(w * 1.8)}" height="3" fill="#9a9488"/>` +
    `<path d="M${r1(x - w * 0.7)},${r1(base - h)}L${x},${r1(base - h - 10)}L${r1(x + w * 0.7)},${r1(base - h)}z" fill="#7a8290"/>` +
    `<circle cx="${x}" cy="${r1(base - h - 12)}" r="1.6" fill="#c9a227"/>`
  );
}

/** モスクの一式(ドーム+左右のミナレット)。呼ぶだけで6〜8要素増える。 */
function mosque(x, base, scale = 1) {
  return (
    dome(x, base, 60 * scale, 26 * scale) +
    `<rect x="${r1(x - 34 * scale)}" y="${r1(base - 8 * scale)}" width="${r1(68 * scale)}" height="${r1(8 * scale)}" fill="#d8cba8"/>` +
    minaret(r1(x - 44 * scale), base, 54 * scale) +
    minaret(r1(x + 44 * scale), base, 54 * scale)
  );
}

/** 糸杉(地中海・エーゲの細く尖った木)。 */
function cypress(x, base, h, fill = "#2f5f4a") {
  const w = r1(h * 0.22);
  return (
    `<rect x="${r1(x - 1.4)}" y="${r1(base - 4)}" width="2.8" height="4" fill="#5a4630"/>` +
    `<path d="M${x},${r1(base - h)}C${r1(x - w)},${r1(base - h * 0.7)} ${r1(x - w * 0.8)},${r1(base - h * 0.2)} ${r1(x - w * 0.5)},${base}L${r1(x + w * 0.5)},${base}C${r1(x + w * 0.8)},${r1(base - h * 0.2)} ${r1(x + w)},${r1(base - h * 0.7)} ${x},${r1(base - h)}z" fill="${fill}"/>`
  );
}

/** オリーブの木(銀緑の丸い樹冠)。 */
function oliveTree(x, base, r, crown = "#8a9a6a", trunk = "#6b6048") {
  return (
    `<path d="M${r1(x - 1.6)},${base}q-2,-10 1.6,-${r1(r * 1.4)}q3.6,${r1(r * 1.4 - 10)} 1.6,${r * 0} " stroke="${trunk}" stroke-width="3" fill="none"/>` +
    `<circle cx="${x}" cy="${r1(base - r * 1.3)}" r="${r}" fill="${crown}"/>` +
    `<circle cx="${r1(x - r * 0.5)}" cy="${r1(base - r * 1.6)}" r="${r1(r * 0.6)}" fill="${crown}" opacity=".85"/>`
  );
}

/** 松(黒海の山)。 */
function pine(x, base, h, fill = "#2f5f3f") {
  const w = r1(h * 0.6);
  return (
    `<rect x="${r1(x - 2)}" y="${r1(base - 8)}" width="4" height="8" fill="#5a4630"/>` +
    `<path d="M${r1(x - w / 2)},${r1(base - h * 0.32)}L${x},${r1(base - h * 0.62)}L${r1(x + w / 2)},${r1(base - h * 0.32)}z" fill="${fill}"/>` +
    `<path d="M${r1(x - w * 0.42)},${r1(base - h * 0.6)}L${x},${r1(base - h * 0.86)}L${r1(x + w * 0.42)},${r1(base - h * 0.6)}z" fill="${fill}"/>` +
    `<path d="M${r1(x - w * 0.3)},${r1(base - h * 0.84)}L${x},${r1(base - h)}L${r1(x + w * 0.3)},${r1(base - h * 0.84)}z" fill="${fill}"/>`
  );
}

/** 妖精の煙突(カッパドキアの岩の塔)。 */
function fairyChimney(x, base, h, fill = "#d8b878") {
  const w = r1(h * 0.42);
  return (
    `<path d="M${r1(x - w / 2)},${base}L${r1(x - w * 0.36)},${r1(base - h * 0.85)}L${x},${r1(base - h)}L${r1(x + w * 0.36)},${r1(base - h * 0.85)}L${r1(x + w / 2)},${base}z" fill="${fill}"/>` +
    `<ellipse cx="${x}" cy="${r1(base - h * 0.85)}" rx="${r1(w * 0.5)}" ry="4" fill="#9a9488"/>`
  );
}

/** 熱気球。 */
function balloon(x, y, scale = 1, fill = "#e8443f") {
  const rx = 14 * scale;
  const ry = 18 * scale;
  return (
    `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${fill}"/>` +
    `<g stroke="#c9a227" stroke-width="${1.4 * scale}"><path d="M${r1(x - rx * 0.5)},${r1(y - ry * 0.8)}L${r1(x - rx * 0.5)},${r1(y + ry * 0.8)}M${r1(x + rx * 0.5)},${r1(y - ry * 0.8)}L${r1(x + rx * 0.5)},${r1(y + ry * 0.8)}"/></g>` +
    `<path d="M${r1(x - rx * 0.5)},${r1(y + ry * 0.9)}L${r1(x - rx * 0.28)},${r1(y + ry + 6 * scale)}L${r1(x + rx * 0.28)},${r1(y + ry + 6 * scale)}L${r1(x + rx * 0.5)},${r1(y + ry * 0.9)}z" fill="none" stroke="#5a4630" stroke-width="1"/>` +
    `<rect x="${r1(x - rx * 0.26)}" y="${r1(y + ry + 6 * scale)}" width="${r1(rx * 0.52)}" height="${r1(5 * scale)}" fill="#8a6a3a"/>`
  );
}

/** らくだ。背に山、首は背より高く前へ傾ける(要点を外さないよう部位で描く)。 */
function camel(x, base, scale = 1, fill = "#c9a877") {
  const s = scale;
  return (
    `<g>` +
    `<path d="M${r1(x - 14 * s)},${r1(base)}Q${r1(x - 15 * s)},${r1(base - 9 * s)} ${r1(x - 6 * s)},${r1(base - 10 * s)}Q${r1(x - 2 * s)},${r1(base - 20 * s)} ${r1(x + 4 * s)},${r1(base - 10 * s)}Q${r1(x + 13 * s)},${r1(base - 9 * s)} ${r1(x + 15 * s)},${r1(base)}z" fill="${fill}"/>` +
    `<path d="M${r1(x + 11 * s)},${r1(base - 8 * s)}Q${r1(x + 17 * s)},${r1(base - 16 * s)} ${r1(x + 15 * s)},${r1(base - 24 * s)}Q${r1(x + 20 * s)},${r1(base - 22 * s)} ${r1(x + 18 * s)},${r1(base - 27 * s)}" fill="none" stroke="${fill}" stroke-width="${4 * s}" stroke-linecap="round"/>` +
    `<g stroke="${fill}" stroke-width="${3 * s}" stroke-linecap="round"><path d="M${r1(x - 10 * s)},${r1(base)}L${r1(x - 10 * s)},${r1(base + 8 * s)}M${r1(x - 2 * s)},${r1(base)}L${r1(x - 2 * s)},${r1(base + 8 * s)}M${r1(x + 6 * s)},${r1(base)}L${r1(x + 6 * s)},${r1(base + 8 * s)}M${r1(x + 13 * s)},${r1(base)}L${r1(x + 13 * s)},${r1(base + 8 * s)}"/></g>` +
    `</g>`
  );
}

/** ドルムシュ・小型バス。 */
function minibus(x, base, fill = "#5b8fe8") {
  return (
    `<rect x="${r1(x - 20)}" y="${r1(base - 16)}" width="40" height="16" rx="3" fill="${fill}" stroke="#20364a" stroke-width="1.4"/>` +
    `<rect x="${r1(x - 15)}" y="${r1(base - 13)}" width="10" height="7" fill="#bfe0f0"/>` +
    `<rect x="${r1(x - 2)}" y="${r1(base - 13)}" width="10" height="7" fill="#bfe0f0"/>` +
    `<circle cx="${r1(x - 12)}" cy="${base}" r="3.6" fill="#241a10"/>` +
    `<circle cx="${r1(x + 12)}" cy="${base}" r="3.6" fill="#241a10"/>`
  );
}

/** 木造の帆船(ギュレット)。 */
function gulet(x, base, w, fill = "#e8dcc0") {
  const h = r1(w * 0.22);
  return (
    `<path d="M${r1(x - w / 2)},${base}Q${x},${r1(base + h)} ${r1(x + w / 2)},${base}L${r1(x + w * 0.42)},${r1(base - h)}L${r1(x - w * 0.42)},${r1(base - h)}z" fill="${fill}" stroke="#6b5330" stroke-width="1.2"/>` +
    `<rect x="${r1(x - 2)}" y="${r1(base - h - 26)}" width="3" height="26" fill="#6b5330"/>` +
    `<path d="M${r1(x - 1)},${r1(base - h - 24)}L${r1(x - 16)},${r1(base - h - 2)}L${r1(x - 1)},${r1(base - h - 2)}z" fill="#f6efe2" opacity=".9"/>`
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

/** かもめ。 */
function gull(x, y, scale = 1) {
  const w = 8 * scale;
  return `<path d="M${r1(x - w)},${y}q${r1(w / 2)},-6 ${w},0q${r1(w / 2)},-6 ${w},0" fill="none" stroke="#4a4a52" stroke-width="1.4"/>`;
}

/** 波の反射線・水面。 */
function ripples(y, color = "#bfe8f4") {
  return `<g stroke="${color}" stroke-width="2" opacity=".7" fill="none"><path d="M26,${y}h74M176,${y + 12}h92M108,${y + 24}h62"/></g>`;
}

/** 人(簡略、色を変えられる)。 */
function person(x, base, skin = "#d9a273", cloth = "#5b8fe8") {
  return (
    `<circle cx="${x}" cy="${r1(base - 15)}" r="4" fill="${skin}"/>` +
    `<rect x="${r1(x - 4)}" y="${r1(base - 11)}" width="8" height="11" rx="2" fill="${cloth}"/>`
  );
}

/** 絨毯の山(市場の店先)。 */
function carpetStack(x, y, w, colors) {
  const parts = [];
  let cy = y;
  for (const c of colors) {
    parts.push(`<rect x="${r1(x - w / 2)}" y="${r1(cy)}" width="${w}" height="6" fill="${c}"/>`);
    cy -= 5.5;
  }
  return parts.join("");
}

/** 提灯(バザールの灯)。 */
function lampString(x, y, count, gap) {
  const parts = [`<path d="M${r1(x - gap / 2)},${y}q${r1(gap / 2)},10 ${gap},0" stroke="#6b5330" stroke-width="1.4" fill="none"/>`];
  for (let i = 0; i < count; i++) {
    const lx = r1(x - gap / 2 + (i * gap) / (count - 1));
    parts.push(`<circle cx="${lx}" cy="${r1(y + 5)}" r="2.6" fill="#f5b31c"/>`);
  }
  return parts.join("");
}

/** 段畑・茶畑の横畝(丸い茂みの列)。 */
function shrubRow(x, y, count, gap, r, color) {
  const parts = [];
  for (let i = 0; i < count; i++) {
    parts.push(`<circle cx="${r1(x + i * gap)}" cy="${y}" r="${r}" fill="${color}"/>`);
  }
  return `<g opacity=".9">${parts.join("")}</g>`;
}

/** 果樹の並び(段々畑・柑橘畑)。 */
function orchardRow(x, y, count, gap, r, crown) {
  const parts = [];
  for (let i = 0; i < count; i++) {
    const ox = r1(x + i * gap);
    parts.push(`<rect x="${r1(ox - 1)}" y="${r1(y - r * 0.6)}" width="2" height="${r1(r * 0.6)}" fill="#6b6048"/>`);
    parts.push(`<circle cx="${ox}" cy="${r1(y - r * 0.9)}" r="${r}" fill="${crown}"/>`);
  }
  return parts.join("");
}

/** テラス(段々畑)の縞。 */
function terraceRows(x, y, w, rows, color) {
  const parts = [];
  for (let i = 0; i < rows; i++) {
    parts.push(`<path d="M${x},${r1(y + i * 6)}h${w}"/>`);
  }
  return `<g stroke="${color}" stroke-width="3" opacity=".75">${parts.join("")}</g>`;
}

// ---------------------------------------------------------------------------
// 都市シンボル(24×24)。33種。
// ---------------------------------------------------------------------------

/** ドームとミナレット(24×24用の簡略版)。 */
function markMosque(minaretColor = "#e8dcc0") {
  return (
    `<path d="M5,20A7,5 0 0 1 19,20z" fill="#7a8290"/>` +
    `<rect x="3" y="20" width="18" height="2.5" fill="#d8cba8"/>` +
    `<rect x="1.5" y="10" width="2" height="10" fill="${minaretColor}"/>` +
    `<path d="M0.8,10L2.5,7L4.2,10z" fill="#7a8290"/>` +
    `<rect x="20.5" y="10" width="2" height="10" fill="${minaretColor}"/>` +
    `<path d="M19.8,10L21.5,7L23.2,10z" fill="#7a8290"/>` +
    `<circle cx="12" cy="12" r="0.9" fill="#c9a227"/>`
  );
}

export const TURKEY_MARKS = {
  /** アヤソフィア(イスタンブール専用)。大きな円蓋と4本のミナレット。 */
  hagiasophia: `<path d="M4,19A8,6 0 0 1 20,19z" fill="#7a8290"/><rect x="3" y="19" width="18" height="2.5" fill="#d8cba8"/><g fill="#e8dcc0"><rect x="0.5" y="12" width="1.6" height="9"/><rect x="21.9" y="12" width="1.6" height="9"/><rect x="5.5" y="9" width="1.6" height="12"/><rect x="16.9" y="9" width="1.6" height="12"/></g><circle cx="12" cy="13" r="0.9" fill="#c9a227"/>`,
  /** モスク。ブルサ・エディルネ・マニサ・コンヤ(基調)。 */
  mosque: markMosque(),
  /** 慰霊の十字と船(チャナッカレ、ガリポリ)。 */
  memorial: `<rect y="16" width="24" height="8" fill="#8a9a6a"/><path d="M4,20h9l-2,-3h-5z" fill="#e8dcc0"/><rect x="7.5" y="19" width="2" height="2" fill="#e8443f"/><g stroke="#e8443f" stroke-width="1.6"><path d="M17,6v10M13,10h8"/></g><circle cx="17" cy="6" r="1.6" fill="none" stroke="#e8443f" stroke-width="1.4"/>`,
  /** 港(起重機と船)。イズミット・イズミル・メルスィン・トラブゾン。 */
  port: `<rect y="17" width="24" height="7" fill="#2a72ae"/><rect x="1" y="9" width="1.8" height="8" fill="#e8443f"/><rect x="1" y="9" width="8" height="1.8" fill="#e8443f"/><line x1="8" y1="10" x2="8" y2="14" stroke="#e8443f" stroke-width="1.4"/><path d="M13,20h9l-1.5,-5h-6z" fill="#e8dcc0"/><rect x="15" y="12" width="4" height="4" fill="#5b8fe8"/>`,
  /** イズニク陶板の文様。 */
  tile: `<rect x="2" y="2" width="20" height="20" rx="1.5" fill="#f6efe2"/><path d="M12,4L20,12L12,20L4,12z" fill="#1a7a8f"/><circle cx="12" cy="12" r="3" fill="#1e4a8f"/><g fill="#c9a227"><circle cx="12" cy="6" r="1"/><circle cx="12" cy="18" r="1"/><circle cx="6" cy="12" r="1"/><circle cx="18" cy="12" r="1"/></g>`,
  /** ブドウ畑(テキルダー)。 */
  vineyard: `<g stroke="#5f7f4a" stroke-width="1.6"><path d="M2,18h20M2,21h20"/></g><g fill="#5a2f6b"><circle cx="6" cy="14" r="1.6"/><circle cx="8" cy="15.5" r="1.6"/><circle cx="7" cy="17" r="1.6"/></g><g fill="#5a2f6b"><circle cx="16" cy="13" r="1.6"/><circle cx="18" cy="14.5" r="1.6"/><circle cx="17" cy="16" r="1.6"/></g><path d="M2,18Q12,10 22,18" fill="none" stroke="#3f6f34" stroke-width="1.2"/>`,
  /** 円形劇場・図書館(エフェソス)。 */
  amphitheater: `<path d="M2,20A10,9 0 0 1 22,20z" fill="none" stroke="#e8dcc0" stroke-width="1.6"/><path d="M4,20A8,7.2 0 0 1 20,20z" fill="none" stroke="#d8cba8" stroke-width="1.4"/><g fill="#e8dcc0"><rect x="6" y="14" width="2" height="6"/><rect x="11" y="12" width="2" height="8"/><rect x="16" y="14" width="2" height="6"/></g>`,
  /** 石灰華段丘(パムッカレ)。 */
  travertine: `<path d="M1,21h5v-4h5v-4h5v-4h6v12h-21z" fill="#f2f6f8" stroke="#cfe0dc" stroke-width="1"/><rect x="1" y="19" width="22" height="2" fill="#bfe0f0" opacity=".6"/><rect x="6" y="15" width="22" height="1.6" fill="#bfe0f0" opacity=".6"/>`,
  /** 城(ボドルム・アランヤ・アンカラ)。 */
  castle: `<rect x="3" y="12" width="18" height="10" fill="#9a9488"/><g fill="#9a9488"><rect x="3" y="8" width="3" height="4"/><rect x="8" y="8" width="3" height="4"/><rect x="13" y="8" width="3" height="4"/><rect x="18" y="8" width="3" height="4"/></g><rect x="10" y="15" width="4" height="7" fill="#5a4a3a"/><path d="M12,5l1.6,3.6h-3.2z" fill="#e8443f"/>`,
  /** 海辺(チェシメ)。 */
  coast: `<rect y="16" width="24" height="8" fill="#8fc4e8"/><path d="M0,19q6,-3 12,0t12,0" fill="none" stroke="#f6efe2" stroke-width="1.4"/><path d="M2,22a5,2.5 0 0 1 10,0z" fill="#e8443f"/><rect x="6.6" y="17" width="1" height="5" fill="#6b5330"/>`,
  /** オリーブ(アイワルック)。 */
  olive: `<rect x="11" y="14" width="2" height="8" fill="#6b6048"/><circle cx="12" cy="10" r="6.5" fill="#8a9a6a"/><circle cx="8" cy="8" r="4" fill="#9aa878"/><circle cx="6" cy="15" r="1.4" fill="#3a4a2a"/><circle cx="9" cy="17" r="1.4" fill="#3a4a2a"/>`,
  /** 滝(アンタルヤ)。 */
  waterfall: `<path d="M9,2h6v13a3,3 0 0 1 -6,0z" fill="#bfe8f4"/><g stroke="#f6efe2" stroke-width="0.8" opacity=".8"><path d="M10,4v10M12,3v11M14,4v10"/></g><rect y="17" width="24" height="7" fill="#1e5a8f"/><ellipse cx="12" cy="17" rx="7" ry="2" fill="#f6efe2" opacity=".7"/>`,
  /** パラグライダー(フェティエ)。 */
  paraglide: `<path d="M4,6Q12,1 20,6L17,9Q12,7 7,9z" fill="#e8443f"/><g stroke="#5a4a3a" stroke-width="0.8"><path d="M6,7L11,16M18,7L13,16M12,6L12,16"/></g><circle cx="12" cy="18" r="2.4" fill="#d9a273"/><rect y="21" width="24" height="3" fill="#bfe8f4"/>`,
  /** 石橋(アダナ)。 */
  bridge: `<rect y="18" width="24" height="6" fill="#3f7fae"/><path d="M2,18a10,7 0 0 1 20,0z" fill="none" stroke="#9a9488" stroke-width="2.2"/><g fill="#9a9488"><rect x="1" y="17" width="2.4" height="5"/><rect x="20.6" y="17" width="2.4" height="5"/></g>`,
  /** ダイビング(カシュ)。 */
  diving: `<rect y="14" width="24" height="10" fill="#1e5a8f"/><circle cx="12" cy="17" r="3.2" fill="#f6efe2" opacity=".9"/><path d="M9,15.6h6v2.8h-6z" fill="#5b8fe8" opacity=".7"/><g fill="#f6efe2" opacity=".8"><circle cx="17" cy="10" r="1"/><circle cx="19" cy="7" r="0.8"/><circle cx="16" cy="6" r="0.6"/></g>`,
  /** 旋回舞踊(コンヤ)。円錐帽と広がる裾。 */
  dervish: `<path d="M12,3l2.2,4h-4.4z" fill="#5a4a3a"/><path d="M6,20a6,10 0 0 1 12,0z" fill="#f6efe2" stroke="#c9a227" stroke-width="0.8"/><circle cx="12" cy="9" r="2.4" fill="#d9a273"/><rect x="10.6" y="11" width="2.8" height="4" fill="#e8dcc0"/>`,
  /** 熱気球(ギョレメ・アクサライ)。 */
  balloon: `<ellipse cx="12" cy="10" rx="7" ry="9" fill="#e8443f"/><g stroke="#c9a227" stroke-width="0.8"><path d="M8,3v14M16,3v14"/></g><path d="M8,18l1.4,3h5.2l1.4,-3z" fill="none" stroke="#5a4630" stroke-width="0.8"/><rect x="9.4" y="21" width="5.2" height="2.4" fill="#8a6a3a"/>`,
  /** 火山(カイセリ・ドゥバヤズット)。雪化粧の単独峰。 */
  volcano: `<path d="M2,22L11,4L13,4L22,22z" fill="#9a9488"/><path d="M11,4L12,3.2L13,4L14.4,7.6L9.6,7.6z" fill="#f2f6f8"/><path d="M12,3.5q1.2,-3 1,-3.4" fill="none" stroke="#8a8478" stroke-width="1" opacity=".6"/>`,
  /** 運河のゴンドラ(エスキシェヒル)。 */
  canal: `<rect y="14" width="24" height="10" fill="#3f8fc4"/><path d="M2,18c4,-3 16,-3 20,0l-2,3h-16z" fill="#6b5330"/><rect x="10" y="10" width="1" height="8" fill="#5a4630"/><path d="M10.5,10l3,1.4l-3,1.4z" fill="#e8443f"/>`,
  /** メドレセの門(シワス)。双子の尖塔。 */
  medrese: `<rect x="9" y="8" width="6" height="14" fill="#e8dcc0"/><path d="M9,8a3,4 0 0 1 6,0z" fill="#7a8290"/><rect x="3" y="4" width="2" height="18" fill="#d8cba8"/><path d="M2.4,4L4,1.5L5.6,4z" fill="#7a8290"/><rect x="19" y="4" width="2" height="18" fill="#d8cba8"/><path d="M18.4,4L20,1.5L21.6,4z" fill="#7a8290"/>`,
  /** 茶(リゼ)。 */
  tea: `<path d="M4,22c0,-9 5,-15 8,-15s8,6 8,15z" fill="#3f6f34"/><g fill="#5f9f4a"><circle cx="8" cy="14" r="2.4"/><circle cx="16" cy="12" r="2.4"/><circle cx="12" cy="9" r="2.4"/></g>`,
  /** 崖の岩窟墓(アマスィヤ)。 */
  rocktomb: `<path d="M1,22L4,4h16l3,18z" fill="#9a8a6a"/><g fill="#5a4a3a"><rect x="8" y="10" width="3" height="6"/><rect x="13" y="10" width="3" height="6"/></g><path d="M8,10a1.5,1.5 0 0 1 3,0zM13,10a1.5,1.5 0 0 1 3,0z" fill="#5a4a3a"/>`,
  /** 木骨造りの家(サフランボル)。 */
  timberhouse: `<rect x="3" y="10" width="18" height="12" fill="#e8dcc0"/><g stroke="#6b5330" stroke-width="1"><path d="M3,14h18M3,18h18M8,10v12M16,10v12"/></g><path d="M1,10L12,3L23,10z" fill="#7a5a3a"/>`,
  /** 灯台(シノプ)。 */
  lighthouse: `<rect x="10" y="6" width="4" height="16" fill="#f6efe2" stroke="#e8443f" stroke-width="1"/><g fill="#e8443f"><rect x="10" y="9" width="4" height="2.4"/><rect x="10" y="14" width="4" height="2.4"/></g><path d="M8.5,6h7l-1,-3h-5z" fill="#5a4a3a"/><circle cx="12" cy="4.4" r="1.4" fill="#f5b31c"/>`,
  /** 記念碑(サムスン)。 */
  monument: `<rect x="10.4" y="4" width="3.2" height="18" fill="#9a9488"/><path d="M10.4,4l1.6,-3l1.6,3z" fill="#9a9488"/><rect x="6" y="21" width="12" height="2.4" fill="#7a7468"/><rect y="19" width="24" height="5" fill="#2a72ae"/>`,
  /** 湖(ヴァン)。水面と背後の要塞シルエット。 */
  lake: `<rect y="15" width="24" height="9" fill="#3f8fc4"/><path d="M2,17h6M10,19h8M4,21h16" stroke="#bfe8f4" stroke-width="1" fill="none"/><path d="M15,14L17,8L19,10L21,6L22,14z" fill="#8b8f98" opacity=".85"/>`,
  /** 廃墟(カルス・アンタキヤ)。崩れた柱とアーチ。 */
  ruins: `<g fill="#d8cba8"><rect x="3" y="10" width="2.4" height="12"/><rect x="10" y="8" width="2.4" height="14"/><rect x="18" y="11" width="2.4" height="11"/></g><path d="M10,8a4,4 0 0 1 8,3" fill="none" stroke="#c9bda0" stroke-width="1.4"/>`,
  /** バザール(ガズィアンテプ)。丸屋根と提灯。 */
  bazaar: `<path d="M2,14a10,6 0 0 1 20,0z" fill="#9a8a6a"/><rect x="1" y="14" width="22" height="2" fill="#7a6a4a"/><g fill="#f5b31c"><circle cx="7" cy="18" r="1.4"/><circle cx="12" cy="19.5" r="1.4"/><circle cx="17" cy="18" r="1.4"/></g>`,
  /** 蜂の巣型の家(シャンルウルファ・ハッラン)。 */
  beehive: `<path d="M4,22a6,9 0 0 1 6,-16a6,9 0 0 1 6,16z" fill="#d8b878" stroke="#b39a5c" stroke-width="0.8"/><path d="M6,20a4,6 0 0 1 4,-11a4,6 0 0 1 4,11z" fill="#c9a877" opacity=".6"/><circle cx="10" cy="9" r="1.4" fill="#5a4a3a"/>`,
  /** 石造りの段々町(マルディン)。 */
  stonecity: `<g fill="#d8b878"><rect x="2" y="14" width="7" height="8"/><rect x="9" y="9" width="7" height="13"/><rect x="16" y="12" width="6" height="10"/></g><g fill="#f2f6f8" opacity=".7"><rect x="4" y="16" width="1.6" height="1.6"/><rect x="11" y="12" width="1.6" height="1.6"/><rect x="18" y="15" width="1.6" height="1.6"/></g>`,
  /** 黒い城壁(ディヤルバクル)。 */
  walls: `<rect y="12" width="24" height="10" fill="#3a3a40"/><g fill="#3a3a40"><rect x="1" y="8" width="3" height="4"/><rect x="7" y="8" width="3" height="4"/><rect x="13" y="8" width="3" height="4"/><rect x="19" y="8" width="3" height="4"/></g><rect x="10" y="16" width="4" height="6" fill="#20364a"/>`,
  /** 巨石の頭部(ネムルト山)。 */
  statueheads: `<path d="M1,22L12,3L23,22z" fill="#b3ab6a"/><circle cx="8" cy="17" r="3.4" fill="#c9bda0"/><path d="M6,15.4a2,1.4 0 0 1 4,0" fill="none" stroke="#8a8478" stroke-width="0.6"/><circle cx="16" cy="15" r="3" fill="#c9bda0"/>`,
  /** スキー(エルズルム)。 */
  ski: `<path d="M2,20L12,4L22,20z" fill="#f2f6f8"/><path d="M12,4L15,20h3z" fill="#dfe8ee" opacity=".8"/><g stroke="#4a4a52" stroke-width="1"><path d="M4,18L20,10"/></g><rect x="10" y="12" width="4" height="1.4" fill="#e8443f"/>`,
};

// ---------------------------------------------------------------------------
// 背景シーン(15種)。鍵は cities.mjs の `bg` と対応。
// ---------------------------------------------------------------------------

const TURKEY_BASE_BG = {
  /**
   * 首都。イスタンブール専用。左にモスク、右に近代的な高層ビル群、
   * 手前にボスポラス海峡とギュレット船、路面電車を置く。
   */
  capital:
    sky("#8fc4e8", "#cfe4f0", 128) +
    sun(346, 40, 20) +
    clouds(300, 30, 1.1) +
    hills(126, "#8fae7a", 4) +
    ground(128, "#8a9a6a") +
    // ボスポラス海峡
    `<rect x="0" y="168" width="400" height="42" fill="#1e5a8f"/>` +
    ripples(184, "#bfe8f4") +
    ripples(198, "#9fd0e8") +
    // モスク(左)
    mosque(70, 128, 1) +
    // 近代的な高層ビル群(右)
    `<g fill="#7f8896"><rect x="300" y="60" width="22" height="68"/><rect x="326" y="40" width="26" height="88"/><rect x="356" y="72" width="20" height="56"/></g>` +
    `<g fill="#bfe0f0" opacity=".6"><rect x="304" y="66" width="4" height="4"/><rect x="312" y="66" width="4" height="4"/><rect x="330" y="48" width="4" height="4"/><rect x="340" y="48" width="4" height="4"/><rect x="330" y="64" width="4" height="4"/><rect x="360" y="80" width="4" height="4"/></g>` +
    // ギュレット船(手前)
    gulet(70, 192, 46) +
    gulet(330, 196, 40) +
    gull(60, 50, 1) +
    gull(90, 62, 0.8) +
    gull(320, 44, 1) +
    // トラム通り(手前中央、隠れてよい)
    `<rect x="0" y="200" width="400" height="10" fill="#8a8478"/>` +
    minibus(200, 208, "#e8443f") +
    // トルコ国旗
    `<rect x="392" y="120" width="1.6" height="30" fill="#5a4a3a"/><path d="M392,120h16v10h-16z" fill="#E30A17"/><circle cx="399" cy="125" r="2.4" fill="#f6efe2"/>` +
    person(150, 205, "#d9a273", "#5b8fe8") +
    person(165, 206, "#c98a5a", "#e8443f"),

  /**
   * モスク。ブルサ・エディルネ・マニサ・コンヤ。大きなモスクを中心に
   * 市場と住宅、糸杉を置く。
   */
  mosque:
    sky("#8fc4e8", "#cfe4f0", 126) +
    clouds(320, 28, 1) +
    hills(124, "#8fae7a", 4) +
    ground(126, "#b3ab6a") +
    mosque(200, 150, 1.4) +
    // 住宅街(左右)
    `<g fill="#e8dcc0"><rect x="20" y="130" width="34" height="22"/><rect x="60" y="140" width="26" height="12"/><rect x="330" y="132" width="30" height="20"/></g>` +
    `<g fill="#c9a877"><rect x="20" y="130" width="34" height="4"/><rect x="330" y="132" width="30" height="4"/></g>` +
    cypress(16, 200, 46) +
    cypress(384, 202, 40) +
    cypress(300, 198, 34) +
    // 市場の露店(手前)
    carpetStack(60, 196, 24, ["#8a1f2b", "#c9a227", "#1a5276"]) +
    lampString(140, 176, 4, 40) +
    person(100, 200, "#d9a273", "#5b8fe8") +
    person(250, 202, "#c98a5a", "#8a1f2b") +
    person(270, 202, "#d9a273", "#3f6f34"),

  /**
   * ダーダネルス海峡。チャナッカレ専用。海峡と慰霊の碑、灰色の艦影。
   */
  strait:
    sky("#8fc4e8", "#d8e4e0", 110) +
    clouds(90, 30, 0.9) +
    ground(110, "#8a9a6a") +
    `<rect x="0" y="146" width="400" height="64" fill="#1e5a8f"/>` +
    ripples(160, "#9fd0e8") +
    ripples(180, "#bfe8f4") +
    // 対岸(ゲリボル半島、遠景)
    hills(108, "#7f8f5c", 5) +
    // 慰霊碑(左)
    `<rect x="46" y="86" width="6" height="24" fill="#e8dcc0"/><rect x="30" y="108" width="38" height="6" fill="#c9bda0"/>` +
    `<g stroke="#e8443f" stroke-width="2"><path d="M49,86v18M42,93h14"/></g>` +
    // 灰色の艦影(手前)
    `<rect x="150" y="160" width="90" height="16" rx="2" fill="#7a8290"/><rect x="180" y="150" width="14" height="12" fill="#7a8290"/>` +
    `<line x1="187" y1="150" x2="187" y2="142" stroke="#7a8290" stroke-width="1.6"/>` +
    // フェリー(遠く)
    gulet(320, 156, 34) +
    gull(300, 50, 1) +
    gull(330, 62, 0.8) +
    gull(60, 60, 0.9) +
    gull(200, 44, 0.7) +
    // 慰霊の赤いポピー(手前)
    `<g fill="#e8443f"><circle cx="90" cy="200" r="3"/><circle cx="100" cy="204" r="3"/><circle cx="310" cy="202" r="3"/><circle cx="320" cy="198" r="3"/><circle cx="30" cy="202" r="2.6"/></g>` +
    `<g fill="#3f6f34"><circle cx="88" cy="202" r="1.6"/><circle cx="98" cy="206" r="1.6"/></g>` +
    // 花崗岩の慰霊碑の台座
    `<rect x="26" y="112" width="46" height="4" fill="#9a9488"/>` +
    person(120, 190, "#d9a273", "#3a3a40") +
    person(280, 192, "#c98a5a", "#3a3a40"),

  /**
   * 港。イズミット・イズミル・メルスィン・アダナ・トラブゾン・シノプ・
   * サムスン。起重機と貨物船、市場の一角。
   */
  port:
    sky("#8fc4e8", "#cfe4f0", 118) +
    clouds(310, 28, 1) +
    ground(118, "#9a9484") +
    gull(60, 50, 1) +
    gull(90, 62, 0.8) +
    gull(320, 44, 1) +
    gull(150, 40, 0.7) +
    `<rect x="0" y="150" width="400" height="60" fill="#1e5a8f"/>` +
    ripples(168, "#bfe8f4") +
    ripples(188, "#9fd0e8") +
    crane(50, 150, 60) +
    crane(90, 150, 44) +
    // 埠頭
    `<rect x="0" y="140" width="400" height="12" fill="#8a8478"/>` +
    // 貨物船(右)
    `<rect x="290" y="152" width="90" height="20" rx="3" fill="#e8443f"/>` +
    `<rect x="300" y="140" width="70" height="14" fill="#f6efe2"/>` +
    `<g fill="#5b8fe8"><rect x="306" y="143" width="10" height="8"/><rect x="322" y="143" width="10" height="8"/><rect x="338" y="143" width="10" height="8"/></g>` +
    // 小型のモスクのシルエット(遠景)
    `<path d="M370,140A6,4 0 0 1 382,140z" fill="#7a8290" opacity=".7"/>` +
    // 手前の桟橋と漁師
    `<rect x="30" y="188" width="70" height="8" fill="#8a8478"/>` +
    `<g stroke="#3a3a40" stroke-width="1.4"><path d="M45,180v8M70,182v6"/></g>` +
    person(45, 188, "#d9a273", "#3a3a40") +
    person(70, 188, "#c98a5a", "#5b8fe8") +
    gulet(370, 195, 44) +
    // 積み上げたコンテナ(手前左)
    `<g><rect x="120" y="180" width="30" height="14" fill="#c9a227"/><rect x="120" y="166" width="30" height="14" fill="#1a7a8f"/></g>` +
    // 灯台の光(遠く)
    `<rect x="386" y="90" width="3" height="16" fill="#f6efe2"/><circle cx="387.5" cy="88" r="2" fill="#f5b31c"/>`,

  /**
   * 石灰華段丘。パムッカレ専用。段々の白い棚田状の池と、
   * 見下ろす丘の上のヒエラポリス劇場。
   */
  travertine:
    sky("#8fc4e8", "#cfe4f0", 100) +
    sun(50, 40, 18) +
    clouds(300, 26, 1) +
    hills(98, "#9aa85c", 4) +
    ground(100, "#c9bda0") +
    // 段々の白い石灰華棚(手前へ降りる)
    `<path d="M0,120h90v20h60v20h80v20h100v30h-330z" fill="#f2f6f8" stroke="#cfe0dc" stroke-width="1.5"/>` +
    `<rect x="0" y="118" width="90" height="4" fill="#bfe0f0" opacity=".7"/>` +
    `<rect x="90" y="138" width="60" height="4" fill="#bfe0f0" opacity=".7"/>` +
    `<rect x="150" y="158" width="80" height="4" fill="#bfe0f0" opacity=".7"/>` +
    `<rect x="230" y="178" width="100" height="4" fill="#bfe0f0" opacity=".7"/>` +
    // ヒエラポリス劇場(丘の上、左)
    `<g fill="#e8dcc0"><rect x="20" y="70" width="3" height="16"/><rect x="30" y="66" width="3" height="20"/><rect x="40" y="70" width="3" height="16"/><rect x="50" y="74" width="3" height="12"/></g>` +
    `<path d="M14,86a22,10 0 0 1 44,0z" fill="none" stroke="#d8cba8" stroke-width="1.6"/>` +
    // 石柱(倒れたもの、手前)
    `<g fill="#c9bda0"><rect x="340" y="180" width="30" height="6"/><rect x="350" y="172" width="6" height="8"/></g>` +
    // 段差の縁の陰影(奥行きを出す)
    `<g fill="#dfe8e4" opacity=".7"><path d="M0,120h90v6h-90z"/><path d="M90,140h60v6h-60z"/><path d="M150,160h80v6h-80z"/></g>` +
    // 遠くの糸杉の並木
    cypress(340, 96, 20) +
    cypress(360, 98, 16) +
    cypress(20, 94, 18) +
    // 手すりと案内の杭(観光地らしさ)
    `<g stroke="#8a6a3a" stroke-width="1.4"><path d="M250,178v-8M270,178v-8M290,178v-8"/></g>` +
    // 湯に浸かる人々(手前)
    person(180, 200, "#d9a273", "#f6efe2") +
    person(200, 202, "#c98a5a", "#f6efe2") +
    person(120, 195, "#d9a273", "#e8dcc0") +
    person(240, 198, "#c98a5a", "#f6efe2"),

  /**
   * カッパドキア。ギョレメ・アクサライ。妖精の煙突と熱気球。
   */
  cappadocia:
    sky("#e8a878", "#f5d4a8", 130) +
    sun(70, 50, 22, "#f5b31c") +
    hills(128, "#c9a877", 4) +
    ground(130, "#d8b878") +
    // 妖精の煙突(いくつも)
    fairyChimney(50, 190, 70) +
    fairyChimney(90, 195, 50) +
    fairyChimney(340, 192, 62) +
    fairyChimney(370, 196, 42) +
    fairyChimney(20, 200, 38) +
    // 岩窟の窓・扉
    `<g fill="#5a4a3a"><rect x="45" y="150" width="4" height="5"/><rect x="52" y="158" width="4" height="6"/><rect x="335" y="150" width="4" height="5"/></g>` +
    // 熱気球(何個も、空に散らして)
    balloon(120, 60, 0.8, "#e8443f") +
    balloon(160, 40, 0.65, "#1a7a8f") +
    balloon(200, 70, 0.9, "#c9a227") +
    balloon(240, 45, 0.7, "#5b8fe8") +
    balloon(280, 85, 0.6, "#8a1f2b") +
    balloon(300, 30, 0.5, "#3f6f34") +
    // 谷底の小道(手前)
    `<path d="M0,205q100,-10 200,0t200,0" stroke="#c9a877" stroke-width="10" fill="none" opacity=".7"/>` +
    person(200, 202, "#d9a273", "#5b8fe8"),

  /**
   * 湖畔。イズニク・ヴァン。水面と対岸の丘、渡し舟。
   */
  lakeside:
    sky("#8fc4e8", "#cfe4f0", 100) +
    clouds(70, 28, 1) +
    hills(98, "#8fae7a", 4) +
    ground(100, "#9aa85c") +
    `<rect x="0" y="140" width="400" height="70" fill="#3f8fc4"/>` +
    ripples(156, "#bfe8f4") +
    ripples(176, "#9fd0e8") +
    ripples(196, "#bfe8f4") +
    // 対岸の山(遠景の要塞シルエット)
    anatoliaMountain(60, 100, 46, "#9a9488", false) +
    anatoliaMountain(340, 98, 40, "#8b8f98", false) +
    `<path d="M355,84L360,74L365,80L370,68L376,84z" fill="#7a8290" opacity=".85"/>` +
    // 渡し舟
    gulet(200, 178, 40) +
    gulet(280, 190, 30) +
    // 水鳥
    gull(100, 130, 0.8) +
    gull(320, 120, 0.7) +
    gull(140, 118, 0.6) +
    // 湖畔の小さな家(左手前)
    `<rect x="20" y="176" width="26" height="18" fill="#e8dcc0"/><path d="M17,176h32l-4,-7h-24z" fill="#7a5a3a"/>` +
    // 葦(手前)
    `<g stroke="#5f8f4a" stroke-width="1.6"><path d="M355,210v-20M362,210v-24M369,210v-18"/></g>` +
    // 桟橋
    `<rect x="180" y="196" width="60" height="6" fill="#8a6a3a"/>` +
    // 波紋(手前)
    `<g stroke="#f6efe2" stroke-width="1" opacity=".6" fill="none"><ellipse cx="250" cy="185" rx="10" ry="3"/></g>` +
    person(150, 198, "#d9a273", "#3f6f34") +
    person(60, 195, "#c98a5a", "#5b8fe8") +
    // 手前の草むら
    `<g fill="#7f9f5f" opacity=".85"><ellipse cx="10" cy="205" rx="8" ry="4"/><ellipse cx="390" cy="206" rx="8" ry="4"/></g>` +
    // 遠くの帆(白い三角)
    `<path d="M330,150L336,132L342,150z" fill="#f6efe2" opacity=".9"/>`,

  /**
   * 高地。カイセリ・ドゥバヤズット・エルズルム。雪化粧の単独峰と、
   * 放牧の羊、遊牧の天幕。
   */
  highland:
    sky("#a8c8e0", "#e8f0f4", 130) +
    sun(340, 40, 18, "#f6efe2") +
    // 雪化粧の単独峰(中央奥、隠れてよい)
    anatoliaMountain(200, 132, 100, "#9a9488", true) +
    anatoliaMountain(90, 128, 60, "#8b8f98", false) +
    anatoliaMountain(330, 126, 54, "#9a9488", false) +
    hills(130, "#b3ab6a", 4) +
    ground(130, "#b3ab6a") +
    // 遊牧の天幕(左)
    `<path d="M30,200a26,16 0 0 1 52,0z" fill="#c9a877" stroke="#8a6a3a" stroke-width="1.2"/><rect x="52" y="192" width="6" height="8" fill="#3a3a40"/>` +
    // 羊の群れ(右)
    `<g fill="#f6efe2" stroke="#c9bda0" stroke-width="0.6"><ellipse cx="260" cy="198" rx="8" ry="6"/><ellipse cx="276" cy="200" rx="8" ry="6"/><ellipse cx="292" cy="197" rx="8" ry="6"/><ellipse cx="308" cy="200" rx="8" ry="6"/><ellipse cx="322" cy="199" rx="7" ry="5.4"/></g>` +
    `<g fill="#3a3a40"><circle cx="253" cy="196" r="2.2"/><circle cx="269" cy="198" r="2.2"/><circle cx="285" cy="195" r="2.2"/><circle cx="301" cy="198" r="2.2"/><circle cx="316" cy="197" r="2"/></g>` +
    person(240, 200, "#d9a273", "#8a1f2b") +
    // 遠くの鳥(渡り)
    gull(150, 44, 0.7) +
    gull(170, 38, 0.6) +
    gull(60, 60, 0.8) +
    // 牧羊犬
    `<ellipse cx="228" cy="202" rx="5" ry="3.4" fill="#c9a877"/><circle cx="223" cy="199" r="2.2" fill="#c9a877"/>` +
    // 天幕の前の荷物・織物
    carpetStack(70, 208, 20, ["#8a1f2b", "#c9a227"]) +
    // 手前の岩と草の茂み
    `<path d="M0,210L20,190L45,210z" fill="#8a8478"/>` +
    `<g fill="#8a9a5c" opacity=".85"><ellipse cx="120" cy="206" rx="6" ry="3"/><ellipse cx="360" cy="204" rx="6" ry="3"/></g>` +
    // 遠くの雪原の陰影
    `<g fill="#f2f6f8" opacity=".7"><path d="M170,60L200,42L215,55L195,64z"/></g>` +
    // 小石(手前)
    `<g fill="#9a9488"><circle cx="100" cy="207" r="2"/><circle cx="340" cy="206" r="2.4"/></g>` +
    // 山あいの松林(裾野)
    pine(365, 160, 30) +
    pine(15, 156, 26),

  /**
   * 海辺。テキルダー・ボドルム・チェシメ・アイワルック・アンタルヤ・
   * フェティエ・アランヤ・カシュ。砂浜と波、パラソル、糸杉。
   */
  seaside:
    sky("#8fc4e8", "#cfe4f0", 110) +
    sun(340, 46, 22) +
    clouds(80, 30, 1) +
    `<rect x="0" y="110" width="400" height="60" fill="#1e6ea0"/>` +
    ripples(126, "#bfe8f4") +
    ripples(146, "#9fd0e8") +
    ripples(162, "#bfe8f4") +
    `<path d="M0,150c60,-8 120,4 200,-2c80,-6 140,4 200,-2v64H0z" fill="#e8dcc0"/>` +
    // パラソル
    `<g><path d="M60,168a20,10 0 0 1 40,0z" fill="#e8443f"/><rect x="78" y="168" width="3" height="30" fill="#6b5330"/></g>` +
    `<g><path d="M320,172a16,8 0 0 1 32,0z" fill="#f5b31c"/><rect x="334" y="172" width="3" height="26" fill="#6b5330"/></g>` +
    `<g><path d="M170,178a14,7 0 0 1 28,0z" fill="#1a7a8f"/><rect x="182" y="178" width="2.6" height="22" fill="#6b5330"/></g>` +
    cypress(20, 200, 34) +
    oliveTree(380, 202, 15) +
    // ビーチチェア
    `<g fill="#f6efe2" stroke="#c9a227" stroke-width="1"><rect x="55" y="188" width="14" height="4"/><rect x="325" y="192" width="14" height="4"/><rect x="180" y="196" width="14" height="4"/></g>` +
    // ギュレット船(沖)
    gulet(250, 120, 30) +
    gull(150, 40, 0.7) +
    gull(200, 50, 0.9) +
    gull(90, 46, 0.6) +
    // 浮き輪(手前)
    `<circle cx="230" cy="192" r="8" fill="none" stroke="#e8443f" stroke-width="3"/>` +
    // 貝殻(手前)
    `<g fill="#f2f6f8" opacity=".9"><circle cx="110" cy="204" r="2"/><circle cx="280" cy="206" r="2.4"/></g>` +
    person(75, 198, "#d9a273", "#f6efe2") +
    person(330, 200, "#c98a5a", "#f6efe2") +
    person(160, 190, "#d9a273", "#1a7a8f"),

  /**
   * 旧市街。アマスィヤ・サフランボル・マルディン・ディヤルバクル。
   * 段々に積み重なる家並みと、ミナレット、洗濯物のロープ。
   */
  oldtown:
    sky("#8fc4e8", "#d8e4e0", 100) +
    clouds(340, 26, 0.9) +
    hills(98, "#9a9488", 4) +
    ground(100, "#b3ab6a") +
    // 段々に積み重なる家並み
    `<g fill="#d8b878"><rect x="10" y="120" width="60" height="30"/><rect x="60" y="140" width="55" height="40"/><rect x="105" y="128" width="50" height="26"/><rect x="290" y="118" width="55" height="34"/><rect x="330" y="140" width="60" height="42"/></g>` +
    `<g fill="#c9a877" opacity=".8"><rect x="10" y="120" width="60" height="5"/><rect x="60" y="140" width="55" height="5"/><rect x="290" y="118" width="55" height="5"/><rect x="330" y="140" width="60" height="5"/></g>` +
    `<g fill="#5a4a3a"><rect x="20" y="130" width="6" height="8"/><rect x="34" y="130" width="6" height="8"/><rect x="70" y="150" width="6" height="8"/><rect x="84" y="150" width="6" height="8"/><rect x="300" y="128" width="6" height="8"/><rect x="340" y="150" width="6" height="8"/></g>` +
    minaret(200, 190, 66) +
    `<path d="M182,190A18,10 0 0 1 218,190z" fill="#7a8290" opacity=".9"/>` +
    // 洗濯物のロープ(手前)
    `<g stroke="#8a8478" stroke-width="1"><path d="M40,190h60"/></g>` +
    `<g fill="#f6efe2"><rect x="48" y="186" width="8" height="6"/><rect x="60" y="187" width="7" height="5"/><rect x="72" y="186" width="8" height="6"/></g>` +
    // 石畳の坂道(手前中央、隠れてよい)
    `<path d="M180,210q20,-30 40,-40" stroke="#9a8a6a" stroke-width="14" fill="none" opacity=".6"/>` +
    person(150, 200, "#d9a273", "#8a1f2b") +
    person(260, 202, "#c98a5a", "#3f6f34"),

  /**
   * バザール。ガズィアンテプ・シャンルウルファ。丸屋根の市場と提灯、
   * 香辛料の山、絨毯。
   */
  bazaar:
    sky("#e8c890", "#f5e0b8", 110) +
    sun(60, 44, 18) +
    ground(110, "#c9a877") +
    // 丸屋根の市場(奥)
    `<path d="M60,110a70,40 0 0 1 140,0z" fill="#9a8a6a"/><rect x="58" y="108" width="144" height="4" fill="#7a6a4a"/>` +
    `<path d="M220,116a50,30 0 0 1 100,0z" fill="#8a7a5c"/><rect x="218" y="114" width="102" height="4" fill="#6a5a3e"/>` +
    // 提灯(何連も)
    lampString(120, 122, 5, 60) +
    lampString(260, 128, 4, 50) +
    lampString(350, 130, 3, 34) +
    // 香辛料の山(手前左)
    `<g><path d="M20,205a18,10 0 0 1 36,0z" fill="#c9531a"/><path d="M60,205a14,8 0 0 1 28,0z" fill="#d4a017"/><path d="M92,205a12,7 0 0 1 24,0z" fill="#8a1f2b"/></g>` +
    // 絨毯(手前右)
    carpetStack(320, 202, 40, ["#8a1f2b", "#c9a227", "#1a5276", "#3f6f34"]) +
    // 籠(中央手前)
    `<g fill="#8a6a3a"><rect x="180" y="196" width="20" height="12" rx="2"/><rect x="205" y="198" width="18" height="10" rx="2"/></g>` +
    person(150, 200, "#d9a273", "#3a3a40") +
    person(240, 202, "#c98a5a", "#8a1f2b") +
    person(280, 200, "#d9a273", "#3f6f34") +
    // 隊商の名残のらくだ(市場の入口、手前左)
    camel(45, 204, 1.1),

  /**
   * 高原の平野。アンカラ・エスキシェヒル・シワス。中央アナトリアの
   * 広い麦畑と、遠くの近代的な庁舎・セルジューク建築。
   */
  steppe:
    sky("#8fc4e8", "#cfe4f0", 120) +
    clouds(300, 24, 1) +
    clouds(90, 30, 0.8) +
    hills(118, "#b3ab6a", 5) +
    ground(120, "#c9a227") +
    // 麦畑の畝(広く)
    terraceRows(0, 150, 400, 8, "#e8c060") +
    // 近代的な庁舎(左奥)
    `<g fill="#7f8896"><rect x="30" y="96" width="50" height="24"/><rect x="30" y="90" width="50" height="6" fill="#5f6a76"/></g>` +
    `<g fill="#bfe0f0" opacity=".6"><rect x="36" y="100" width="4" height="4"/><rect x="46" y="100" width="4" height="4"/><rect x="56" y="100" width="4" height="4"/></g>` +
    // セルジュークの門(右奥)
    `<rect x="320" y="92" width="4" height="26" fill="#d8cba8"/><rect x="356" y="92" width="4" height="26" fill="#d8cba8"/><path d="M320,92h40l-6,-10h-28z" fill="#9a8a6a"/>` +
    // 一本道(手前)
    `<path d="M180,210L200,120L220,210z" fill="#c9bda0" opacity=".8"/>` +
    `<g stroke="#f6efe2" stroke-width="2" opacity=".7"><path d="M198,200v-10M199,175v-10M200,150v-10"/></g>` +
    minibus(120, 202, "#e8443f") +
    person(280, 200, "#d9a273", "#5b8fe8") +
    // りんご・あんずの果樹園(手前右)
    orchardRow(260, 200, 4, 26, 10, "#9aa85c"),

  /**
   * 茶畑の丘。リゼ専用。緑濃い段々畑と手摘みの籠、霧、遠くの黒海。
   */
  teahills:
    sky("#8fa8b8", "#d4dcd8", 90) +
    `<g opacity=".5" fill="#f6efe2"><ellipse cx="80" cy="70" rx="50" ry="10"/><ellipse cx="260" cy="60" rx="60" ry="12"/></g>` +
    hills(88, "#3f6f34", 5) +
    ground(90, "#3f6f34") +
    // 段々畑の茶の木(何列も)
    terraceRows(0, 120, 400, 3, "#5f9f4a") +
    terraceRows(0, 140, 400, 3, "#4f8f3a") +
    terraceRows(0, 160, 400, 3, "#3f6f34") +
    shrubRow(20, 128, 8, 20, 7, "#5f9f4a") +
    shrubRow(30, 148, 7, 22, 7, "#4f8f3a") +
    shrubRow(240, 128, 7, 20, 7, "#5f9f4a") +
    // 遠くの黒海(奥に細く)
    `<rect x="0" y="90" width="400" height="10" fill="#1e5a8f" opacity=".8"/>` +
    // 手摘みの籠を背負う人
    `<g><rect x="192" y="182" width="16" height="18" rx="2" fill="#8a6a3a"/><circle cx="200" cy="176" r="4" fill="#d9a273"/><rect x="196" y="180" width="8" height="10" fill="#5f9f4a"/></g>` +
    person(140, 200, "#c98a5a", "#e8c060") +
    person(280, 198, "#d9a273", "#3f6f34") +
    // 茶屋(手前右)
    `<rect x="330" y="176" width="50" height="30" fill="#e8dcc0"/><path d="M326,176h58l-6,-8h-46z" fill="#5a4a3a"/>`,

  /**
   * ネムルト山。専用。山頂の巨石頭部の列と、夜明けの光。
   */
  nemrut:
    sky("#3a3a6a", "#e89858", 140) +
    sun(90, 70, 24, "#f5c060") +
    // 明けきらない西の空にまだ残る月
    moon(360, 30, 12, "#e8ecf0") +
    `<g opacity=".6" fill="#5a5a8a"><ellipse cx="300" cy="50" rx="60" ry="10"/></g>` +
    // 山の稜線
    `<path d="M0,140L120,60L200,100L280,50L400,120V210H0z" fill="#b3ab6a"/>` +
    `<path d="M0,140L120,60L200,100L280,50L400,120" fill="none" stroke="#8a8478" stroke-width="1.5"/>` +
    // 墳丘(右)
    `<path d="M300,110a50,30 0 0 1 100,0z" fill="#c9bda0"/>` +
    // 巨石の頭部の列(手前の東テラス)
    `<g><circle cx="70" cy="176" r="14" fill="#c9bda0"/><path d="M60,170a4,3 0 0 1 8,0" fill="none" stroke="#8a8478" stroke-width="0.8"/></g>` +
    `<g><circle cx="120" cy="182" r="12" fill="#b8ac90"/></g>` +
    `<g><circle cx="165" cy="178" r="15" fill="#c9bda0"/><path d="M155,172a4,3 0 0 1 8,0" fill="none" stroke="#8a8478" stroke-width="0.8"/></g>` +
    `<g><circle cx="215" cy="184" r="11" fill="#b8ac90"/></g>` +
    `<g><circle cx="255" cy="180" r="13" fill="#c9bda0"/></g>` +
    `<g><circle cx="300" cy="186" r="10" fill="#b8ac90"/></g>` +
    // 台座の破片(手前)
    `<g fill="#9a8a6a"><rect x="55" y="190" width="30" height="8"/><rect x="150" y="192" width="34" height="8"/><rect x="240" y="192" width="30" height="8"/><rect x="290" y="196" width="26" height="7"/></g>` +
    // 頭部の目・鼻筋(細部)
    `<g fill="#8a8478"><circle cx="66" cy="174" r="1.4"/><circle cx="74" cy="174" r="1.4"/><circle cx="161" cy="176" r="1.4"/><circle cx="169" cy="176" r="1.4"/></g>` +
    // 星(まだ暗い西の空)
    `<g fill="#f6efe2" opacity=".8"><circle cx="30" cy="20" r="1.2"/><circle cx="15" cy="35" r="1"/><circle cx="45" cy="30" r="1"/></g>` +
    // 小石・砂利(手前一面)
    `<g fill="#8a8478" opacity=".7"><circle cx="20" cy="204" r="2"/><circle cx="345" cy="200" r="2.4"/><circle cx="370" cy="205" r="1.8"/><circle cx="100" cy="205" r="1.6"/></g>` +
    // 登山者のシルエット(小さく、手前左)
    `<path d="M15,196L20,180L25,196" fill="none" stroke="#3a3a40" stroke-width="2" stroke-linecap="round"/>` +
    // 遠くの鳥(渡り)
    gull(340, 30, 0.6) +
    gull(355, 24, 0.5) +
    // 山肌の亀裂・地層
    `<g stroke="#8a8478" stroke-width="0.8" opacity=".6"><path d="M40,150L60,180M330,140L350,175"/></g>` +
    person(310, 195, "#d9a273", "#3a3a40"),

  /**
   * 遺跡。セルチュク・アンタキヤ・カルス。崩れた石柱と、
   * 緑に還りつつある廃墟。
   */
  ruins:
    sky("#8fc4e8", "#cfe4f0", 116) +
    sun(60, 44, 18) +
    clouds(300, 26, 1) +
    hills(114, "#9aa85c", 4) +
    ground(116, "#9aa85c") +
    // 石柱の並び(奥)
    `<g fill="#e8dcc0"><rect x="40" y="80" width="8" height="40"/><rect x="60" y="76" width="8" height="44"/><rect x="80" y="80" width="8" height="40"/><rect x="310" y="82" width="8" height="38"/><rect x="332" y="78" width="8" height="42"/></g>` +
    `<g fill="#d8cba8"><rect x="38" y="76" width="12" height="4"/><rect x="58" y="72" width="12" height="4"/><rect x="78" y="76" width="12" height="4"/></g>` +
    // アーチの残骸
    `<path d="M180,120a30,26 0 0 1 60,0" fill="none" stroke="#c9bda0" stroke-width="5"/>` +
    // 崩れた柱(手前、横倒し)
    `<g fill="#c9bda0"><rect x="120" y="180" width="70" height="12"/><rect x="200" y="188" width="12" height="14"/></g>` +
    // 蔦・緑(廃墟に還る)
    `<g fill="#5f8f4a" opacity=".8"><circle cx="45" cy="96" r="5"/><circle cx="65" cy="100" r="5"/><circle cx="316" cy="98" r="5"/><circle cx="336" cy="102" r="4"/></g>` +
    // モザイクの床の断片(手前中央)
    `<g><rect x="150" y="196" width="60" height="10" fill="#e8dcc0"/><rect x="150" y="196" width="10" height="10" fill="#1a7a8f"/><rect x="170" y="196" width="10" height="10" fill="#c9a227"/><rect x="190" y="196" width="10" height="10" fill="#8a1f2b"/></g>` +
    // 彫刻の断片(手前左)
    `<g fill="#c9bda0"><circle cx="30" cy="192" r="6"/><rect x="20" y="198" width="20" height="6"/></g>` +
    // 野の花(廃墟の合間)
    `<g fill="#e8a878"><circle cx="100" cy="140" r="2"/><circle cx="290" cy="150" r="2"/></g>` +
    gull(340, 40, 0.8) +
    person(250, 200, "#d9a273", "#5b8fe8") +
    person(280, 198, "#c98a5a", "#3f6f34"),
};

export const TURKEY_BG = { ...TURKEY_BASE_BG };


