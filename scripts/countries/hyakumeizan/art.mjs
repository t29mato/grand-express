/**
 * 日本百名山の都市(=山)イラスト。
 *
 * `HYAKUMEIZAN_MARKS` は24×24の座標系に描くシンボル、`HYAKUMEIZAN_BG` は
 * 400×210の座標系に描く背景シーン(いずれもSVG断片の文字列)。カナダ・
 * 韓国と同じく最初から文字列として持つ。動きは含めない。
 *
 * **この盤面は「町」ではなく「山」を都市として置く。** 日本の通常盤面
 * (`japan.content.json`)のマーク(城・鐘楼・観覧車など)は町向けで山の
 * 形を表せないため、流用せずすべて新規に描いている。
 *
 * 色は他の盤面と揃える。空 #8fc4e8〜#cfe4f0、顔・白 #f6efe2、
 * 強調 #f5b31c/#e8443f/#5b8fe8。百名山らしさは
 * **岩肌の花崗岩の灰 #8b8f98・雪の白 #f2f6f8・針葉樹の濃緑 #1a4a2a・
 * 鳥居の朱 #b8382a・火口原の草地緑 #7f9a4a・木造の山小屋の飴色 #c8b48a**
 * で出す。
 *
 * 鍵は `cities.mjs` の `mark` / `bg` と一対一で対応する。
 * 増やすときは両方を揃えること。
 *
 * **背景SVGの中央25%(x=151〜249 / y=54〜152)は都市シンボルに隠れて
 * 見えない。** 見せたい細部は左右3分の1と手前(y>170)に置く。
 * `sky()` は必ず第3引数(次に来る塗りの開始y)を渡すこと。
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

/** 空。第3引数に「次に来る塗りの開始y」を渡すこと。 */
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

/** 遠景のなだらかな丘の連なり(草原・高原の背景用)。 */
function hills(y, fill, count = 4) {
  const parts = [];
  for (let i = 0; i < count; i++) {
    const cx = 40 + (i * W) / count;
    parts.push(`<path d="M${r1(cx - 74)},${y}c22,-30 52,-30 74,0z" fill="${fill}"/>`);
  }
  return `<g opacity=".9">${parts.join("")}</g>`;
}

/** 遠景の単峰。左右対称の円錐(富士山・成層火山の遠景用)。 */
function distantCone(cx, base, h, fill = "#5a6a7a", snow = "#f2f6f8") {
  const w = r1(h * 1.2);
  return (
    `<path d="M${r1(cx - w / 2)},${base}L${cx},${r1(base - h)}L${r1(cx + w / 2)},${base}z" fill="${fill}"/>` +
    `<path d="M${cx},${r1(base - h)}L${r1(cx + w * 0.14)},${r1(base - h * 0.72)}L${r1(cx - w * 0.14)},${r1(base - h * 0.72)}z" fill="${snow}"/>`
  );
}

/** 遠景の稜線。鋭峰の並び(北アルプス・岩稜)。 */
function jaggedRidge(y, fill = "#8b8f98", snow = "#f2f6f8") {
  return (
    `<path d="M0,${y}L40,${y - 46}L60,${y - 30}L96,${y - 70}L120,${y - 40}L150,${y - 58}L180,${y - 32}L220,${y - 64}L260,${y - 36}L300,${y - 52}L340,${y - 28}L400,${y - 20}L400,${y + 20}L0,${y + 20}z" fill="${fill}"/>` +
    `<path d="M86,${y - 60}L96,${y - 70}L104,${y - 54}L96,${y - 52}z" fill="${snow}"/>` +
    `<path d="M210,${y - 54}L220,${y - 64}L228,${y - 48}L220,${y - 46}z" fill="${snow}"/>`
  );
}

/** 手前の岩の斜面。 */
function talus(y, fill = "#9a9ea4") {
  return `<path d="M0,${y}c60,-14 120,6 180,-8c60,-14 130,10 220,-6v${210 - y + 20}H0z" fill="${fill}"/>`;
}

function pine(x, base, h, fill = "#1a4a2a") {
  const w = r1(h * 0.6);
  return (
    `<rect x="${r1(x - 2)}" y="${r1(base - 8)}" width="4" height="8" fill="#5a4630"/>` +
    `<path d="M${r1(x - w / 2)},${r1(base - h * 0.32)}L${x},${r1(base - h * 0.62)}L${r1(x + w / 2)},${r1(base - h * 0.32)}z" fill="${fill}"/>` +
    `<path d="M${r1(x - w * 0.42)},${r1(base - h * 0.6)}L${x},${r1(base - h * 0.86)}L${r1(x + w * 0.42)},${r1(base - h * 0.6)}z" fill="${fill}"/>` +
    `<path d="M${r1(x - w * 0.3)},${r1(base - h * 0.84)}L${x},${r1(base - h)}L${r1(x + w * 0.3)},${r1(base - h * 0.84)}z" fill="${fill}"/>`
  );
}

/** 屋久杉のような、太くこぶのある巨木。 */
function ancientCedar(x, base, h, fill = "#2f5f3a") {
  const w = r1(h * 0.5);
  return (
    `<path d="M${r1(x - w * 0.3)},${base}C${r1(x - w * 0.4)},${r1(base - h * 0.3)} ${r1(x - w * 0.15)},${r1(base - h * 0.4)} ${r1(x - w * 0.18)},${r1(base - h * 0.6)}L${r1(x + w * 0.18)},${r1(base - h * 0.6)}C${r1(x + w * 0.15)},${r1(base - h * 0.4)} ${r1(x + w * 0.4)},${r1(base - h * 0.3)} ${r1(x + w * 0.3)},${base}z" fill="#5a4a34"/>` +
    `<ellipse cx="${x}" cy="${r1(base - h * 0.8)}" rx="${r1(w * 0.9)}" ry="${r1(h * 0.32)}" fill="${fill}"/>` +
    `<ellipse cx="${r1(x - w * 0.4)}" cy="${r1(base - h * 0.62)}" rx="${r1(w * 0.5)}" ry="${r1(h * 0.2)}" fill="${fill}" opacity=".9"/>`
  );
}

/** 桜の丸い樹冠。 */
function cherryTree(x, base, r, crown = "#e89ab0", trunk = "#6b5330") {
  const th = r1(r * 1.0);
  return (
    `<rect x="${r1(x - r * 0.14)}" y="${r1(base - th)}" width="${r1(r * 0.28)}" height="${th}" fill="${trunk}"/>` +
    `<circle cx="${x}" cy="${r1(base - th - r * 0.5)}" r="${r}" fill="${crown}"/>`
  );
}

/** 鳥居。参道や山頂を示す。 */
function torii(x, base, h, fill = "#b8382a") {
  const w = r1(h * 0.8);
  return (
    `<rect x="${r1(x - w / 2)}" y="${r1(base - h)}" width="${r1(w * 0.12)}" height="${h}" fill="${fill}"/>` +
    `<rect x="${r1(x + w / 2 - w * 0.12)}" y="${r1(base - h)}" width="${r1(w * 0.12)}" height="${h}" fill="${fill}"/>` +
    `<rect x="${r1(x - w / 2 - w * 0.08)}" y="${r1(base - h)}" width="${r1(w * 1.16)}" height="${r1(h * 0.14)}" fill="${fill}"/>` +
    `<rect x="${r1(x - w / 2 + w * 0.05)}" y="${r1(base - h * 0.68)}" width="${r1(w * 0.9)}" height="${r1(h * 0.1)}" fill="${fill}"/>`
  );
}

/** 山小屋。三角屋根、木壁。 */
function mountainHut(x, base, w = 40, h = 26, roof = "#a83c32") {
  return (
    `<rect x="${r1(x - w / 2)}" y="${r1(base - h * 0.62)}" width="${w}" height="${r1(h * 0.62)}" fill="#c8b48a"/>` +
    `<path d="M${r1(x - w / 2 - 4)},${r1(base - h * 0.62)}L${x},${r1(base - h)}L${r1(x + w / 2 + 4)},${r1(base - h * 0.62)}z" fill="${roof}"/>` +
    `<rect x="${r1(x - w * 0.1)}" y="${r1(base - h * 0.34)}" width="${r1(w * 0.2)}" height="${r1(h * 0.34)}" fill="#4a4a52"/>`
  );
}

/** 石を積んだケルン。 */
function cairn(x, base) {
  return (
    `<ellipse cx="${x}" cy="${base}" rx="9" ry="4" fill="#8b8f98"/>` +
    `<ellipse cx="${r1(x + 1)}" cy="${r1(base - 5)}" rx="7" ry="3.4" fill="#9a9ea4"/>` +
    `<ellipse cx="${r1(x - 1)}" cy="${r1(base - 9.5)}" rx="4.6" ry="2.6" fill="#8b8f98"/>`
  );
}

/** 波の反射線。 */
function ripples(y, color = "#bfe8f4") {
  return `<g stroke="${color}" stroke-width="2" opacity=".7" fill="none"><path d="M26,${y}h74M176,${y + 12}h92M108,${y + 24}h62"/></g>`;
}

/** かもめ。 */
function gull(x, y, scale = 1) {
  const w = 8 * scale;
  return `<path d="M${r1(x - w)},${y}q${r1(w / 2)},-6 ${w},0q${r1(w / 2)},-6 ${w},0" fill="none" stroke="#4a4a52" stroke-width="1.4"/>`;
}

/** 昆布を干す竿。利尻の名物。 */
function kelpRack(x, base, w = 30) {
  const parts = [`<rect x="${r1(x - w / 2)}" y="${r1(base - 22)}" width="2" height="22" fill="#6b5330"/><rect x="${r1(x + w / 2 - 2)}" y="${r1(base - 22)}" width="2" height="22" fill="#6b5330"/>`];
  parts.push(`<line x1="${r1(x - w / 2)}" y1="${r1(base - 20)}" x2="${r1(x + w / 2)}" y2="${r1(base - 20)}" stroke="#6b5330" stroke-width="1.4"/>`);
  for (let i = 0; i < 5; i++) {
    const kx = r1(x - w / 2 + 3 + i * (w - 6) / 4);
    parts.push(`<path d="M${kx},${r1(base - 20)}q-2,10 0,18" fill="none" stroke="#3f6b3a" stroke-width="2.4" opacity=".85"/>`);
  }
  return parts.join("");
}

/** 立ち枯れの巨木のシルエット(信仰の山の霧の森)。 */
function fogBand(y, h, fill = "#c8d4d8", opacity = 0.5) {
  return `<rect x="0" y="${y}" width="${W}" height="${h}" fill="${fill}" opacity="${opacity}"/>`;
}

/** 滝。禊(みそぎ)を思わせる一筋の白い流れ。 */
function waterfall(x, top, h, w = 8) {
  return (
    `<path d="M${r1(x - w / 2)},${top}L${r1(x + w / 2)},${top}L${r1(x + w / 2 + 4)},${r1(top + h)}L${r1(x - w / 2 - 4)},${r1(top + h)}z" fill="#e8f4f6" opacity=".9"/>` +
    `<g stroke="#a8ccd8" stroke-width="1" opacity=".6" fill="none"><path d="M${r1(x - w * 0.2)},${r1(top + h * 0.15)}L${r1(x - w * 0.35)},${r1(top + h * 0.85)}M${r1(x + w * 0.15)},${r1(top + h * 0.1)}L${r1(x + w * 0.28)},${r1(top + h * 0.8)}"/></g>` +
    `<ellipse cx="${x}" cy="${r1(top + h)}" rx="${r1(w * 1.6)}" ry="4" fill="#e8f4f6" opacity=".7"/>` +
    `<g fill="#c8e0e8" opacity=".7"><ellipse cx="${r1(x - w)}" cy="${r1(top + h + 1)}" rx="4" ry="2"/><ellipse cx="${r1(x + w)}" cy="${r1(top + h + 2)}" rx="5" ry="2"/></g>`
  );
}

/** ヤクシカ(屋久島の小型のシカ)。 */
function sikaDeer(x, base, scale = 1) {
  const s = scale;
  return (
    `<g transform="translate(${x},${base}) scale(${s})">` +
    `<ellipse cx="0" cy="-6" rx="8" ry="4.6" fill="#8a6a40"/>` +
    `<path d="M-8,-8L-13,-11L-11,-6z" fill="#8a6a40"/>` +
    `<circle cx="-11" cy="-11" r="2.6" fill="#8a6a40"/>` +
    `<g stroke="#5a4a30" stroke-width="1" fill="none"><path d="M-12,-13l-2,-3M-10,-14l-1,-3"/></g>` +
    `<g fill="#8a6a40"><rect x="-5" y="-3" width="2" height="6"/><rect x="4" y="-3" width="2" height="6"/></g>` +
    `</g>`
  );
}

/** 丸い樹冠の広葉樹(ブナ林・紅葉)。 */
function roundTree(x, base, r, crown = "#8fae63", trunk = "#c8c8bc") {
  const th = r1(r * 1.0);
  return (
    `<rect x="${r1(x - r * 0.14)}" y="${r1(base - th)}" width="${r1(r * 0.28)}" height="${th}" fill="${trunk}"/>` +
    `<circle cx="${x}" cy="${r1(base - th - r * 0.5)}" r="${r}" fill="${crown}"/>`
  );
}

/** 牛(高原の放牧)。 */
function cattle(x, base, scale = 1) {
  return (
    `<g transform="translate(${x},${base}) scale(${scale})">` +
    `<ellipse cx="0" cy="-5" rx="9" ry="5" fill="#f6efe2"/>` +
    `<g fill="#4a4a52"><ellipse cx="-3" cy="-6" rx="3" ry="2.4"/><ellipse cx="4" cy="-4" rx="2.6" ry="2"/></g>` +
    `<circle cx="-8" cy="-9" r="2.6" fill="#f6efe2"/>` +
    `<g fill="#f6efe2"><rect x="-6" y="-2" width="1.8" height="5"/><rect x="3" y="-2" width="1.8" height="5"/></g>` +
    `</g>`
  );
}

/** 木道(湿原)。 */
function boardwalk(x, y, w) {
  const parts = [`<rect x="${r1(x - w / 2)}" y="${y}" width="${w}" height="4" fill="#8a6a40"/>`];
  for (let i = 0; i < w / 6; i++) {
    parts.push(`<line x1="${r1(x - w / 2 + i * 6)}" y1="${y}" x2="${r1(x - w / 2 + i * 6)}" y2="${y + 4}" stroke="#5a4630" stroke-width="1"/>`);
  }
  return parts.join("");
}

export const HYAKUMEIZAN_MARKS = {
  /** 鋭峰・双耳峰(岩稜)。槍ヶ岳・穂高岳・剱岳・鹿島槍ヶ岳・谷川岳など。 */
  spire:
    `<path d="M5,21L7.5,12L9,14.5L11,4L12.5,9L14.5,7L16.5,11L19,21z" fill="#8b8f98"/>` +
    `<path d="M10,7L11,4L12,9L11,10z" fill="#f2f6f8"/>` +
    `<path d="M10.5,10L11,10L9.6,17L8.6,17z" fill="#f2f6f8"/>`,

  /** 成層火山(なだらかな円錐)。岩手山・羊蹄山・開聞岳・鳥海山・利尻岳など。 */
  cone_volcano:
    `<path d="M2,21L12,5L22,21z" fill="#7f6a4a"/>` +
    `<path d="M12,5L15.5,11.5L8.5,11.5z" fill="#f2f6f8"/>` +
    `<path d="M12,5Q13,2.8 12,1.3Q11,-0.2 12,-1" stroke="#d8dce0" stroke-width="1.1" fill="none" opacity=".85"/>`,

  /** 富士山専用。青みがかった大きな円錐と、裾の鳥居。 */
  fuji:
    `<path d="M1,21L12,3L23,21z" fill="#5a6a7a"/>` +
    `<path d="M12,3L16,12L8,12z" fill="#f2f6f8"/>` +
    `<path d="M9,12L8,15L11,15L10,12z" fill="#f2f6f8" opacity=".8"/>` +
    `<rect x="10.6" y="18" width="0.9" height="3" fill="#b8382a"/><rect x="12.5" y="18" width="0.9" height="3" fill="#b8382a"/><rect x="10.3" y="18" width="3.4" height="1" fill="#b8382a"/>`,

  /** カルデラ(火口原・外輪山)。阿蘇・霧島・八幡平など。 */
  caldera:
    `<path d="M2,20L7,10L10,13L12,9L14,13L17,10L22,20z" fill="#7f9a4a"/>` +
    `<ellipse cx="12" cy="11" rx="2.2" ry="1.2" fill="#4a4a52"/>` +
    `<path d="M12,9Q13,6 12,4Q11,2 12,0.5" stroke="#d8dce0" stroke-width="1" fill="none" opacity=".8"/>`,

  /** 山小屋。稜線上の宿泊小屋・避難小屋。 */
  hut:
    `<path d="M2,21L6,15L18,15L22,21z" fill="#8b8f98"/>` +
    `<rect x="8" y="11" width="8" height="5" fill="#c8b48a"/>` +
    `<path d="M7,11L12,5L17,11z" fill="#a83c32"/>` +
    `<rect x="11" y="12.5" width="2" height="3.5" fill="#4a4a52"/>`,

  /** 信仰の山(山頂・登拝道の鳥居)。白山・御嶽山・大峰山・出羽三山など。 */
  torii_peak:
    `<path d="M2,21L12,6L22,21z" fill="#8b8f98"/>` +
    `<rect x="9" y="14" width="1.6" height="7" fill="#b8382a"/>` +
    `<rect x="15" y="14" width="1.6" height="7" fill="#b8382a"/>` +
    `<rect x="7.5" y="13" width="10" height="1.6" fill="#b8382a"/>` +
    `<rect x="9" y="16" width="8" height="1.4" fill="#b8382a"/>`,

  /** 残雪の稜線(単峰ではなく横に長い稜線)。白馬岳・立山・乗鞍岳・五竜岳など。 */
  ridge_snow:
    `<path d="M0,20L3,15L6,17L9,11L12,15L15,10.5L18,15L21,13L24,17L24,21L0,21z" fill="#8b8f98"/>` +
    `<path d="M8,12L9,11L10.5,16L9,16z" fill="#f2f6f8"/>` +
    `<path d="M14,11.5L15,10.5L16.5,16L15,16z" fill="#f2f6f8"/>` +
    `<path d="M19.5,14L21,13L22,17L20,17z" fill="#f2f6f8"/>`,

  /** 照葉樹林に覆われた花崗岩の丸い山。屋久島・白神山地など。 */
  domepeak:
    `<path d="M2,21C2,13 6,7 12,7C18,7 22,13 22,21z" fill="#3f6b3a"/>` +
    `<ellipse cx="9" cy="12" rx="2.6" ry="1.8" fill="#9a9ea4"/>` +
    `<ellipse cx="15" cy="10" rx="2.2" ry="1.6" fill="#8b8f98"/>` +
    `<rect x="4" y="18" width="2" height="4" fill="#5a4a34"/><ellipse cx="5" cy="17" rx="3" ry="2.4" fill="#2f5f3a"/>`,

  /** 湿原の山。尾瀬(至仏山・燧ヶ岳)など、山裾に池塘と葦原を持つ。 */
  marsh:
    `<path d="M2,18C2,13 6,10 12,10C18,10 22,13 22,18z" fill="#6f8f4a"/>` +
    `<ellipse cx="12" cy="20" rx="9" ry="2.4" fill="#3f8fc4"/>` +
    `<g stroke="#c9a877" stroke-width="0.8" fill="none"><path d="M5,20v-5M6.5,20v-6M18,20v-5M16.5,20v-4.4"/></g>`,

  /** 草原の丸い山。霧ヶ峰・美ヶ原など、木の少ない高原状の山。 */
  grasspeak:
    `<path d="M2,21C2,12 6,6 12,6C18,6 22,12 22,21z" fill="#8fae63"/>` +
    `<g stroke="#6f9a4a" stroke-width="0.8" opacity=".8" fill="none"><path d="M7,19l1,-3M11,20l1,-4M15,19l1,-3M9,21l1,-3"/></g>`,

  /** 平らな高原の山。大台ヶ原など、頂上が広い台地状。 */
  plateau:
    `<path d="M2,21L7,9L17,9L22,21z" fill="#8a7a5c"/>` +
    `<rect x="7" y="9" width="10" height="2" fill="#a8916a"/>` +
    `<g fill="#6b5a42"><circle cx="10" cy="10.6" r="0.8"/><circle cx="14" cy="10.6" r="0.8"/></g>`,

  /** 花崗岩の岩塔。瑞牆山など、垂直に切り立つ岩の群れ。 */
  granite_tower:
    `<path d="M3,21L5,12L7,15L5,21z" fill="#8b8f98"/>` +
    `<path d="M8,21L9,5L15,5L16,21z" fill="#9a9ea4"/>` +
    `<path d="M12,21L12,7" stroke="#7f8288" stroke-width="0.8" fill="none"/>` +
    `<path d="M17,21L19,14L21,17L19,21z" fill="#8b8f98"/>`,
};

export const HYAKUMEIZAN_BG = {
  /** 利尻岳専用。宗谷海峡から望む火山島と、昆布干しの浜。 */
  islandvolcano:
    sky("#8fc4e8", "#cfe4f0", 128) +
    clouds(70, 30, 1) +
    gull(200, 40, 1) +
    gull(230, 52, 0.8) +
    jaggedRidge(126, "#7f6a4a", "#f2f6f8") +
    band(146, 34, "#1e3a52") +
    ripples(160, "#bfe8f4") +
    ripples(174, "#bfe8f4") +
    ground(180, "#c8b48a") +
    kelpRack(60, 204) +
    kelpRack(110, 206, 26) +
    `<path d="M2,204c4,-16 10,-16 14,0z" fill="#7f6a4a"/>` +
    `<path d="M370,206c-4,-14 -10,-14 -14,0z" fill="#7f6a4a"/>` +
    `<g fill="#e89ab0"><circle cx="330" cy="192" r="2"/><circle cx="340" cy="196" r="2"/><circle cx="320" cy="198" r="1.8"/></g>` +
    `<path d="M280,206c10,-6 20,-6 30,0z" fill="#5a4a34" opacity=".8"/>`,

  /** 槍ヶ岳専用。北アルプスの岩稜、鎖場、山小屋。 */
  alpineridge:
    sky("#a8c8e0", "#e8f0f4", 118) +
    sun(40, 30, 15, "#f6efe2") +
    jaggedRidge(116, "#8b8f98", "#f2f6f8") +
    talus(136, "#9a9ea4") +
    ground(150, "#9a9ea4") +
    mountainHut(70, 200, 42, 28) +
    pine(24, 208, 22, "#2f5f3a") +
    pine(360, 206, 18, "#2f5f3a") +
    cairn(320, 202) +
    cairn(340, 204) +
    `<g stroke="#4a4a52" stroke-width="1.6" fill="none"><path d="M180,190c10,-10 20,-14 34,-20"/></g>` +
    `<g fill="#4a4a52"><rect x="182" y="188" width="2" height="4"/><rect x="196" y="180" width="2" height="4"/><rect x="210" y="172" width="2" height="4"/></g>` +
    `<g fill="#e89ab0" opacity=".9"><circle cx="120" cy="198" r="2"/><circle cx="128" cy="200" r="2"/><circle cx="112" cy="202" r="1.8"/></g>`,

  /** 富士山専用。湖畔から望む雪冠の峰、桜、五重塔。 */
  fujilake:
    sky("#f0d8b8", "#cfe4f0", 118) +
    sun(340, 34, 20, "#f5b31c") +
    distantCone(180, 118, 78, "#5a6a7a", "#f2f6f8") +
    ground(118, "#6f9f5f") +
    band(158, 52, "#3f8fc4") +
    ripples(168, "#bfe8f4") +
    ripples(182, "#bfe8f4") +
    `<path d="M300,150L318,110L334,80L344,110L336,150z" fill="#a83c32"/>` +
    `<g fill="#a83c32"><rect x="308" y="96" width="52" height="4"/><rect x="304" y="118" width="60" height="4"/><rect x="300" y="140" width="68" height="4"/></g>` +
    cherryTree(46, 200, 30) +
    cherryTree(90, 206, 22) +
    torii(210, 206, 26) +
    `<path d="M2,206c40,-10 60,4 90,0l6,4H2z" fill="#3f6b3a"/>`,

  /** 大峰山(山上ヶ岳)専用。修験の森、鳥居、行者の滝。 */
  shugendoforest:
    sky("#6f88a0", "#b8c8d0", 120) +
    fogBand(70, 24, "#c8d4d8", 0.5) +
    ancientCedar(40, 190, 96) +
    ancientCedar(360, 196, 84) +
    ground(120, "#3f6b3a") +
    waterfall(300, 60, 90) +
    torii(80, 200, 46) +
    `<path d="M60,200h120" stroke="#5a4a34" stroke-width="3" fill="none"/>` +
    `<g fill="#2f5f3a" opacity=".9"><ellipse cx="150" cy="204" rx="10" ry="4"/><ellipse cx="200" cy="206" rx="14" ry="4"/></g>` +
    fogBand(150, 16, "#c8d4d8", 0.35) +
    `<g stroke="#c8d4d8" stroke-width="2" opacity=".4" fill="none"><path d="M0,60c60,10 100,-10 160,0c60,10 100,-10 180,0"/></g>`,

  /** 宮之浦岳(屋久島)専用。屋久杉と亜熱帯の森、ヤクシカ。 */
  cedarrainforest:
    sky("#8fb8c8", "#d0e4dc", 120) +
    fogBand(78, 20, "#e0ecec", 0.55) +
    ancientCedar(60, 196, 110) +
    ancientCedar(340, 200, 92) +
    ground(120, "#2f5f3a") +
    `<g fill="#3f6b3a" opacity=".85"><ellipse cx="150" cy="200" rx="24" ry="8"/><ellipse cx="240" cy="204" rx="26" ry="8"/></g>` +
    sikaDeer(110, 202, 1.1) +
    sikaDeer(270, 206, 0.9) +
    `<g stroke="#bfe8f4" stroke-width="2" opacity=".6" fill="none"><path d="M180,60v20M190,58v22M200,62v18"/></g>` +
    `<g fill="#8b8f98" opacity=".9"><ellipse cx="70" cy="205" rx="10" ry="4"/><ellipse cx="310" cy="206" rx="9" ry="3.6"/></g>`,

  /** 北海道の高山帯。大雪山・トムラウシ山・十勝岳など。いち早く色づく紅葉と噴気。 */
  daisetsu_tundra:
    sky("#a8c8e0", "#e8d8c8", 130) +
    jaggedRidge(110, "#9a9ea4", "#f2f6f8") +
    ground(130, "#9a7a5a") +
    `<g fill="#c8783a" opacity=".85"><ellipse cx="60" cy="180" rx="20" ry="6"/><ellipse cx="130" cy="192" rx="26" ry="7"/><ellipse cx="300" cy="184" rx="22" ry="6"/><ellipse cx="360" cy="198" rx="18" ry="6"/></g>` +
    `<g fill="#a83c32" opacity=".8"><ellipse cx="90" cy="196" rx="14" ry="4"/><ellipse cx="250" cy="200" rx="16" ry="4"/></g>` +
    pine(30, 206, 16, "#3f6b3a") +
    pine(370, 204, 14, "#3f6b3a") +
    `<path d="M340,150Q342,145 340,140Q338,135 340,132" stroke="#d8dce0" stroke-width="1" fill="none" opacity=".7"/>` +
    `<g fill="#8b8f98" opacity=".9"><ellipse cx="180" cy="204" rx="10" ry="4"/><ellipse cx="210" cy="206" rx="8" ry="3.4"/></g>` +
    cairn(20, 206),

  /** 東北のブナ林。八甲田山・飯豊山・朝日岳など、雪の残る稜線と広葉樹。 */
  beech_ridge:
    sky("#a8c4d8", "#dce8ec", 124) +
    jaggedRidge(104, "#9aa0a8", "#f2f6f8") +
    fogBand(100, 20, "#e0e8ec", 0.35) +
    ground(124, "#4a3f30") +
    roundTree(40, 200, 22, "#8fae63", "#d8d4c4") +
    roundTree(80, 206, 16, "#9fbe73", "#d8d4c4") +
    roundTree(340, 202, 20, "#8fae63", "#d8d4c4") +
    roundTree(300, 208, 14, "#7f9e53", "#d8d4c4") +
    `<g fill="#3f6b3a" opacity=".8"><ellipse cx="150" cy="206" rx="8" ry="3"/><ellipse cx="200" cy="204" rx="10" ry="3.4"/></g>` +
    `<rect x="198" y="180" width="3" height="24" fill="#6b5330"/><rect x="192" y="176" width="15" height="6" fill="#8a6a40"/>`,

  /** 尾瀬の湿原。至仏山・燧ヶ岳専用。池塘と木道、水芭蕉。 */
  oze_marsh:
    sky("#a8cce0", "#dcecec", 116) +
    jaggedRidge(96, "#9aa0a8", "#f2f6f8") +
    ground(116, "#5f8f4a") +
    `<ellipse cx="200" cy="158" rx="170" ry="13" fill="#bcdce8" opacity=".8"/>` +
    boardwalk(200, 178, 220) +
    `<g fill="#f6efe2"><ellipse cx="60" cy="196" rx="4" ry="6"/><ellipse cx="70" cy="200" rx="4" ry="6"/><ellipse cx="330" cy="198" rx="4" ry="6"/></g>` +
    `<g stroke="#c9a877" stroke-width="0.9" fill="none"><path d="M50,204v-8M340,206v-9M320,202v-7"/></g>` +
    ripples(150, "#e8f4f6"),

  /** 奥秩父の杉林。雲取山・甲武信岳・両神山など。石段と石地蔵。 */
  chichibu_forest:
    sky("#8fa8b8", "#c8d8dc", 110) +
    fogBand(90, 20, "#d8e0e0", 0.4) +
    ground(110, "#3f5f3a") +
    pine(40, 204, 40, "#1a4a2a") +
    pine(60, 206, 34, "#1a4a2a") +
    pine(340, 202, 38, "#1a4a2a") +
    pine(360, 206, 30, "#1a4a2a") +
    `<g><ellipse cx="180" cy="198" rx="5" ry="8" fill="#9a9ea4"/><rect x="176" y="192" width="8" height="5" fill="#b8382a"/></g>` +
    `<g><ellipse cx="192" cy="202" rx="4" ry="6" fill="#9a9ea4"/><rect x="189" y="197" width="6" height="4" fill="#b8382a"/></g>` +
    `<g fill="#8b8f98"><rect x="195" y="200" width="20" height="4"/><rect x="200" y="192" width="16" height="4"/><rect x="205" y="184" width="12" height="4"/></g>`,

  /** 上高地の谷。北アルプス側の山小屋のある峰(常念岳・燕岳など)。梓川と河童橋。 */
  kamikochi_valley:
    sky("#a8c8e0", "#e8f0f4", 112) +
    jaggedRidge(92, "#8b8f98", "#f2f6f8") +
    ground(112, "#5f7f4a") +
    `<path d="M0,150c60,10 100,-10 160,10c80,20 140,-10 240,10v40H0z" fill="#3f8fc4" opacity=".85"/>` +
    ripples(168, "#bfe8f4") +
    `<g><rect x="170" y="168" width="60" height="4" fill="#a83c32"/><rect x="172" y="172" width="3" height="10" fill="#a83c32"/><rect x="225" y="172" width="3" height="10" fill="#a83c32"/><g stroke="#a83c32" stroke-width="1.5" fill="none"><path d="M170,168v-6M230,168v-6"/></g></g>` +
    pine(30, 206, 30) +
    pine(370, 204, 26) +
    pine(60, 208, 20),

  /** 中央・南アルプスの岩稜。甲斐駒ヶ岳・北岳・悪沢岳など。花崗岩の岩と高山植物。 */
  minamialps_rock:
    sky("#a8c8e0", "#e8f0f4", 122) +
    jaggedRidge(102, "#9a9488", "#f2f6f8") +
    talus(122, "#8a8478") +
    ground(150, "#8a8478") +
    `<g fill="#c85a8a" opacity=".9"><circle cx="60" cy="198" r="2.4"/><circle cx="72" cy="202" r="2"/><circle cx="320" cy="200" r="2.4"/></g>` +
    `<g fill="#f5b31c" opacity=".9"><circle cx="90" cy="204" r="2"/><circle cx="300" cy="206" r="2"/></g>` +
    cairn(200, 206) +
    cairn(230, 204),

  /** 高原の牧草地。霧ヶ峰・美ヶ原など、木の少ない草原の山。牛と柵。 */
  highland_meadow:
    sky("#a8c8e0", "#e0ecd8", 130) +
    hills(128, "#8fae7a", 4) +
    ground(130, "#9fbe73") +
    cattle(80, 200, 1.1) +
    cattle(140, 206, 0.9) +
    cattle(260, 204, 1.0) +
    `<g stroke="#8a6a40" stroke-width="2" fill="none"><path d="M20,190h60M100,190h60"/></g>` +
    `<g fill="#8a6a40"><rect x="18" y="182" width="3" height="14"/><rect x="78" y="182" width="3" height="14"/><rect x="98" y="182" width="3" height="14"/><rect x="158" y="182" width="3" height="14"/></g>` +
    `<g fill="#f5b31c" opacity=".85"><circle cx="200" cy="200" r="2"/><circle cx="330" cy="204" r="2"/></g>`,

  /** 伊豆の森。天城山専用。滝とわさび田。 */
  izu_coast:
    sky("#8fc4e8", "#cfe4f0", 108) +
    hills(106, "#3f6b3a", 3) +
    ground(108, "#2f5f3a") +
    waterfall(120, 60, 90) +
    `<rect x="200" y="180" width="80" height="26" fill="#3f5f3a" opacity=".7"/>` +
    `<g stroke="#3f8f4f" stroke-width="3" opacity=".9" fill="none"><path d="M210,188h60M210,196h60M210,204h60"/></g>` +
    pine(30, 204, 30) +
    pine(370, 202, 26),

  /** 白山の雪田。残雪と池、高山植物(ハクサンコザクラ)。 */
  hakusan_snowfield:
    sky("#a8c8e0", "#e8f0f4", 116) +
    jaggedRidge(96, "#8b8f98", "#f2f6f8") +
    ground(116, "#f2f6f8") +
    `<g stroke="#d8dce0" stroke-width="1.5" opacity=".7" fill="none"><path d="M20,160c60,-8 120,8 180,-4c60,-10 120,8 180,-4"/></g>` +
    `<ellipse cx="120" cy="188" rx="20" ry="8" fill="#3f8fc4"/>` +
    ripples(190, "#bfe8f4") +
    `<g fill="#c85a8a" opacity=".9"><circle cx="280" cy="198" r="2.4"/><circle cx="292" cy="202" r="2"/><circle cx="60" cy="200" r="2.2"/></g>`,

  /** 阿蘇・九重のカルデラ草原。放牧と野焼きの跡、噴煙。 */
  caldera_grass:
    sky("#a8c8e0", "#e0ecd8", 128) +
    hills(126, "#8fae63", 4) +
    ground(128, "#9fbe73") +
    `<path d="M340,110Q343,100 340,92Q337,84 340,78" stroke="#d8dce0" stroke-width="2" fill="none" opacity=".7"/>` +
    `<ellipse cx="342" cy="76" rx="10" ry="6" fill="#d8dce0" opacity=".6"/>` +
    cattle(70, 200, 1) +
    cattle(250, 204, 0.9) +
    `<ellipse cx="180" cy="198" rx="30" ry="8" fill="#4a3f30" opacity=".8"/>`,

  /** 霧島の噴火口。御鉢の火口湖、ミヤマキリシマ、天孫降臨の逆鉾。 */
  kirishima_volcanic:
    sky("#a8c8e0", "#e8f0f4", 120) +
    distantCone(90, 120, 40, "#6f7f4a", "#f2f6f8") +
    distantCone(320, 120, 34, "#7f6a4a", "#f2f6f8") +
    ground(120, "#7f9a4a") +
    `<ellipse cx="200" cy="170" rx="70" ry="18" fill="#3f8fc4"/>` +
    ripples(172, "#bfe8f4") +
    `<g stroke="#4a4a52" stroke-width="1.5" fill="none"><path d="M340,150v-40M332,118h16"/></g>` +
    `<g fill="#3f6b3a" opacity=".85"><ellipse cx="60" cy="200" rx="16" ry="6"/><ellipse cx="100" cy="204" rx="14" ry="5"/></g>` +
    `<g fill="#c85a8a" opacity=".9"><circle cx="55" cy="196" r="2.4"/><circle cx="66" cy="199" r="2"/><circle cx="94" cy="200" r="2.2"/><circle cx="106" cy="202" r="2"/></g>`,
};
