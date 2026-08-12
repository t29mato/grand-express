/**
 * バリの都市イラスト。
 *
 * `BALI_MARKS` は 24×24 の座標系に描くシンボル、`BALI_BG` は 400×210 の
 * 座標系に描く背景シーン(いずれもSVG断片の文字列)。他の盤面と同じく
 * 最初から文字列として持つ。動きは含めない(アニメーションはReact側で重ねる)。
 *
 * 色はトロピカルに寄せつつ他の盤面の調子と揃える。空 #8fc4e8〜#cfe4f0、
 * 顔・白 #f6efe2、強調 #f5b31c/#e8443f/#5b8fe8。バリらしさは
 * **棚田の緑 #6fae4a・#8fae4a、火山の焦げ茶 #5c5044、寺院の黒い笠 #241a10、
 * 供物の編み籠 #c9a877、海の青 #1a5f8a** で出す。
 *
 * 鍵は `cities.mjs` の `mark` / `bg` と一対一で対応する。
 * 増やすときは両方を揃えること。
 *
 * **`mark` は12種。** 盤面では直径19pxにしかならないので、描き分けられる数に
 * 絞ってある(他の盤面も12〜14種前後)。
 *
 * | キー | 描くもの | 受け持つ町(想定) |
 * |---|---|---|
 * | `palace`   | 分かれ門(チャンディ・ブンタール) | 行政・王宮の町 |
 * | `craft`    | 筆と彫刻刀 | 芸術・工芸の村 |
 * | `volcano`  | 噴煙を上げる山 | 火山・カルデラの町 |
 * | `lake`     | 波紋の水面 | 山あいの湖 |
 * | `boat`     | 舟(ジュクン) | 港・渡し場 |
 * | `dive`     | 魚と気泡 | 潜水・シュノーケルの海岸 |
 * | `terrace`  | 段々になった田 | 棚田の村 |
 * | `surf`     | 波と板 | サーフの浜 |
 * | `beach`    | ヤシと太陽 | 静かな浜 |
 * | `meru`     | 多層屋根の祠 | 大きな寺院 |
 * | `offering` | 供物の籠(チャナン・サリ) | 日々の祭祀が濃い村 |
 * | `harvest`  | 果物と籠 | 農産物の村(コーヒー・マンゴー・サラック) |
 */

const W = 400;
const r1 = (v) => Math.round(v * 10) / 10;

// ---------------------------------------------------------------------------
// 背景シーンの組み立て部品
// ---------------------------------------------------------------------------

function band(y, h, fill) {
  return `<rect x="0" y="${y}" width="${W}" height="${h}" fill="${fill}"/>`;
}

/**
 * 空。**第3引数に「次に来る塗りの開始y」を渡すこと。**
 * 既定では y=124 までしか塗らないので、地面がそれより下から始まるシーンでは
 * あいだが塗り残しになる(茨城・韓国・イタリアで実際に踏んだ)。
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

/** 遠景のなだらかな丘(棚田の縁を兼ねる)。 */
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

/** ヤシの木。幹が軽く曲がり、葉が5枚放射に開く。 */
function palm(x, base, h, fill = "#3f8f4a") {
  const dx = r1(h * 0.16);
  return (
    `<path d="M${x},${base}q${dx},${r1(-h * 0.5)} ${r1(dx * 0.6)},${-h}" stroke="#6b5330" stroke-width="3" fill="none" stroke-linecap="round"/>` +
    `<g fill="${fill}">` +
    [-1.1, -0.55, 0, 0.55, 1.1]
      .map((a) => {
        const tx = r1(x + dx * 0.6 + a * h * 0.4);
        const ty = r1(base - h + Math.abs(a) * h * 0.14 - 2);
        return `<path d="M${r1(x + dx * 0.6)},${r1(base - h)}Q${r1((x + dx * 0.6 + tx) / 2)},${r1(base - h - h * 0.16)} ${tx},${ty}Q${r1((x + dx * 0.6 + tx) / 2)},${r1(base - h + 4)} ${r1(x + dx * 0.6)},${r1(base - h)}z"/>`;
      })
      .join("") +
    `</g>`
  );
}

/**
 * ジュクン(アウトリガー付きの木舟)。舳先が反り上がる細長い胴に、
 * 竹の腕で浮きを一本添える。バリの海岸ならどこでも見る形。
 */
function jukung(x, base, w, hull = "#e8823c", sail = null) {
  const h = r1(w * 0.22);
  const parts = [
    `<path d="M${r1(x - w / 2)},${base}Q${r1(x - w / 2 - 6)},${r1(base - h * 1.6)} ${r1(x - w / 2 + 4)},${r1(base - h)}L${r1(x + w / 2 - 6)},${r1(base - h * 0.4)}Q${r1(x + w / 2 + 8)},${base} ${r1(x + w / 2 - 4)},${r1(base + h * 0.5)}L${r1(x - w / 2 + 6)},${r1(base + h * 0.5)}z" fill="${hull}"/>`,
    `<path d="M${r1(x - w * 0.3)},${r1(base + h * 0.4)}L${r1(x - w * 0.3)},${r1(base + h * 1.8)}M${r1(x + w * 0.2)},${r1(base + h * 0.4)}L${r1(x + w * 0.2)},${r1(base + h * 1.8)}" stroke="#c9a877" stroke-width="2"/>`,
    `<path d="M${r1(x - w * 0.42)},${r1(base + h * 1.7)}h${r1(w * 0.76)}" stroke="#c9a877" stroke-width="2.4"/>`,
  ];
  if (sail) {
    parts.push(
      `<rect x="${r1(x - 1.5)}" y="${r1(base - h * 3.4)}" width="3" height="${r1(h * 3)}" fill="#5a4630"/>`,
      `<path d="M${r1(x)},${r1(base - h * 3.3)}L${r1(x + w * 0.34)},${r1(base - h * 1.4)}L${r1(x)},${r1(base - h * 0.9)}z" fill="${sail}"/>`,
    );
  }
  return parts.join("");
}

/**
 * メール(多層屋根の祠)。下から上へ小さくなる黒い笠を重ね、
 * 台座を石で描く。バリのヒンドゥー寺院を示すいちばん強い形。
 */
function meru(x, base, h, tiers = 5) {
  const parts = [`<rect x="${r1(x - h * 0.11)}" y="${r1(base - h * 0.16)}" width="${r1(h * 0.22)}" height="${r1(h * 0.16)}" fill="#a89e88"/>`];
  for (let i = 0; i < tiers; i++) {
    const t = i / tiers;
    const y = r1(base - h * 0.16 - (h * 0.84 * i) / tiers);
    const hw = r1((h * 0.4) * (1 - t * 0.72));
    const th = r1((h * 0.84) / tiers + 3);
    parts.push(`<path d="M${r1(x - hw)},${y}h${r1(hw * 2)}l${r1(-hw + 4)},${-th}h${r1(-(hw - 4) * 2)}z" fill="#241a10"/>`);
  }
  return parts.join("");
}

/** 分かれ門(チャンディ・ブンタール)。中央で真っ二つに割れた塔門。 */
function splitGate(x, base, h) {
  const w = r1(h * 0.36);
  const half = (mirror) => {
    const s = mirror ? -1 : 1;
    const gx = r1(x + s * 4);
    return (
      `<path d="M${gx},${base}h${s * w}v${-h}l${s * -6},${-10}v${h + 10}z" fill="#8a7250"/>` +
      `<g stroke="#5a4630" stroke-width="1.6" opacity=".8"><path d="M${gx},${r1(base - h * 0.3)}h${s * w}M${gx},${r1(base - h * 0.6)}h${s * w}"/></g>` +
      `<path d="M${gx},${r1(base - h)}l${s * (w - 4)},${-14}l${s * 8},10z" fill="#5a4630"/>`
    );
  };
  return half(false) + half(true);
}

/** 供物の籠(チャナン・サリ)。編んだヤシ葉の四角に花を点で置く。 */
function offering(x, base, s) {
  return (
    `<rect x="${r1(x - s / 2)}" y="${r1(base - s * 0.3)}" width="${s}" height="${r1(s * 0.3)}" fill="#c9a877"/>` +
    `<g fill="#e8443f"><circle cx="${r1(x - s * 0.2)}" cy="${r1(base - s * 0.42)}" r="${r1(s * 0.12)}"/></g>` +
    `<g fill="#f5b31c"><circle cx="${r1(x + s * 0.05)}" cy="${r1(base - s * 0.46)}" r="${r1(s * 0.1)}"/></g>` +
    `<g fill="#f6efe2"><circle cx="${r1(x + s * 0.25)}" cy="${r1(base - s * 0.38)}" r="${r1(s * 0.1)}"/></g>`
  );
}

/** 段々になった棚田の縁(等高線状の弧)。 */
function terraceRows(y, rows = 4, color = "#5f8f4a") {
  const parts = [];
  for (let i = 0; i < rows; i++) {
    const yy = y + i * 9;
    const amp = 8 - i;
    parts.push(`<path d="M0,${yy}q${100 + i * 4},${-amp} ${200 + i * 8},0t${200 - i * 8},0" stroke="${color}" stroke-width="2.2" fill="none" opacity="${0.85 - i * 0.08}"/>`);
  }
  return `<g>${parts.join("")}</g>`;
}

/** 火山の三角錐。稜線だけの濃い緑褐色(雪は載せない、噴煙は任意)。 */
function volcanoCone(cx, base, h, fill = "#5c5044", smoke = false) {
  const parts = [
    `<path d="M${r1(cx - h * 0.9)},${base}L${cx},${r1(base - h)}L${r1(cx + h * 0.9)},${base}z" fill="${fill}"/>`,
    `<path d="M${r1(cx - h * 0.2)},${r1(base - h * 0.78)}L${cx},${r1(base - h)}L${r1(cx + h * 0.22)},${r1(base - h * 0.76)}z" fill="#3a3228"/>`,
  ];
  if (smoke) {
    parts.push(
      `<g fill="#cfd4d8" opacity=".7"><ellipse cx="${cx}" cy="${r1(base - h - 14)}" rx="9" ry="6"/><ellipse cx="${r1(cx + 8)}" cy="${r1(base - h - 26)}" rx="12" ry="7"/></g>`,
    );
  }
  return parts.join("");
}

/** 人。単色シルエットに腕1本を足すだけの簡略形。 */
function person(x, base, shirt = "#4a7bd0") {
  return (
    `<ellipse cx="${x}" cy="${r1(base + 2)}" rx="8" ry="2.4" fill="#000" opacity=".14"/>` +
    `<path d="M${r1(x - 7)},${base}q7,-3.4 14,0l-2,-14q-5,-2.6 -10,0z" fill="${shirt}"/>` +
    `<circle cx="${x}" cy="${r1(base - 19)}" r="5" fill="#a8763a"/>` +
    `<g fill="#3a3446"><rect x="${r1(x - 5.4)}" y="${base}" width="3.6" height="4.4"/><rect x="${r1(x + 1.8)}" y="${base}" width="3.6" height="4.4"/></g>`
  );
}

// ---------------------------------------------------------------------------
// 背景シーン(12種)。鍵は cities.mjs の `bg` と対応。
// ---------------------------------------------------------------------------

const BALI_BASE_BG = {
  /**
   * 王宮・行政の町(デンパサール・シガラジャ内陸部など)。
   * 分かれ門を左3分の1に置き、隠れる帯には繰り返しの塀と瓦を通す。
   */
  royaltown:
    sky("#8fc4e8", "#cfe4f0", 130) +
    clouds(300, 30, 1.1) +
    clouds(78, 26, 0.8) +
    ground(130, "#8fae63") +
    splitGate(88, 168, 74) +
    // 塀(中央の隠れる帯を横切る繰り返し)
    `<rect x="150" y="140" width="250" height="28" fill="#c9a877"/>` +
    `<g fill="#8a7250">` +
    Array.from({ length: 10 }, (_, i) => `<rect x="${154 + i * 25}" y="132" width="18" height="8"/>`).join("") +
    `</g>` +
    `<g stroke="#a8926c" stroke-width="1.4" opacity=".8"><path d="M150,150h250M150,160h250"/></g>` +
    ground(168, "#7fae5a") +
    `<path d="M0,178c70,-8 130,6 200,0c70,-6 130,4 200,8v24H0z" fill="#6f9450"/>` +
    offering(210, 196, 16) +
    offering(250, 200, 13) +
    person(320, 200, "#5b8fe8") +
    person(300, 204, "#c2603c") +
    `<g fill="#3f8f4a" opacity=".8"><ellipse cx="360" cy="196" rx="12" ry="4"/></g>`,

  /** 芸術の村(ウブド)。画架と彫刻台を左に、右手に川沿いの棚田を薄く覗かせる。 */
  artvillage:
    sky("#8fc4e8", "#d9ecd2", 126) +
    clouds(90, 28, 0.9) +
    hills(120, "#7fae5a", 3) +
    ground(126, "#8fae63") +
    // 工房の軒先(左3分の1)
    `<rect x="30" y="130" width="90" height="46" fill="#c9a877"/>` +
    `<path d="M24,130h102l-14,-16H38z" fill="#5a4630"/>` +
    `<rect x="42" y="150" width="20" height="26" fill="#3b2a1c"/>` +
    // 画架と絵
    `<path d="M78,176l6,-40M104,176l-6,-40M84,146h14" stroke="#5a4630" stroke-width="2.4"/>` +
    `<rect x="80" y="140" width="18" height="22" fill="#f6efe2"/><rect x="83" y="144" width="12" height="6" fill="#e8443f"/><rect x="83" y="152" width="12" height="6" fill="#3f8f4a"/>` +
    person(56, 176, "#c2603c") +
    // 隠れる帯は棚田の等高線(繰り返しなので惜しくない)
    terraceRows(150, 4, "#5f8f4a") +
    ground(168, "#7fae5a") +
    `<path d="M0,178c70,-6 130,6 200,0c70,-6 130,4 200,8v24H0z" fill="#6f9450"/>` +
    palm(340, 200, 46) +
    palm(368, 204, 34) +
    `<g fill="#8a7250"><rect x="300" y="188" width="30" height="4"/></g>` +
    offering(300, 196, 12),

  /** 火山とカルデラ湖(キンタマーニ)。稜線から噴煙、麓に湖と棚田。 */
  cratervolcano:
    // sky() の第3引数は130。band(130,...)が最初の全面塗りなので、ここと一致させる
    // (96のままだと稜線の外側・y=96〜130が塗り残しになる。イタリアで踏んだ穴と同じ)。
    sky("#f5b31c", "#f6d9a8", 130) +
    sun(340, 40, 22, "#f6efe2") +
    volcanoCone(96, 130, 82, "#5c5044", true) +
    volcanoCone(180, 130, 46, "#6f5f4a", false) +
    hills(128, "#7fae5a", 3) +
    `<g fill="none" stroke="#3a3228" stroke-width="1.4" opacity=".8"><path d="M40,44q6,-5 12,0M320,30q6,-5 12,0M60,60q5,-4 10,0"/></g>` +
    band(130, 24, "#3f8fc4") +
    ripples(140, "#bfe8f4") +
    ground(154, "#8fae63") +
    terraceRows(160, 5, "#5f8f4a") +
    terraceRows(196, 2, "#4f8f42") +
    `<path d="M0,178c70,-6 130,6 200,0c70,-6 130,4 200,8v24H0z" fill="#6f9450"/>` +
    meru(340, 200, 40, 4) +
    offering(60, 200, 12) +
    person(300, 202, "#4a7bd0"),

  /** 港・フェリー(シガラジャ・ギリマヌッ・パダンバイ)。防波堤と係留船。 */
  portferry:
    sky("#8fc4e8", "#cfe4f0") +
    clouds(96, 26) +
    clouds(200, 20, 0.7) +
    band(118, 92, "#1a5f8a") +
    ripples(148) +
    ripples(180, "#8fc4e8") +
    // 防波堤と倉庫(右3分の1)
    `<rect x="286" y="120" width="10" height="70" fill="#8a8272"/>` +
    `<g fill="#e8e2d2"><rect x="330" y="96" width="50" height="40"/><rect x="356" y="110" width="16" height="14" fill="#5b8fe8" opacity=".6"/></g>` +
    `<path d="M324,96h62l-10,-12h-42z" fill="#5a4630"/>` +
    `<g fill="#8a6a3c"><rect x="298" y="176" width="14" height="12"/><rect x="314" y="180" width="14" height="10"/></g>` +
    `<rect x="270" y="150" width="4" height="30" fill="#5a4630"/>` +
    jukung(150, 170, 70, "#e8823c", "#f6efe2") +
    jukung(210, 182, 50, "#c2603c", null) +
    jukung(60, 192, 40, "#e8823c", null) +
    `<path d="M0,190c30,-6 70,-6 100,0z" fill="#6b6b74" opacity=".7"/>` +
    `<g stroke="#f6efe2" stroke-width="1.6" fill="none"><path d="M40,60q4,-4 8,0M120,50q4,-4 8,0"/></g>` +
    person(100, 196, "#4a7bd0"),

  /** 石灰岩の断崖と入江(ヌサペニダ・ヌサレンボンガン・ウルワトゥ)。 */
  cliffcove:
    sky("#8fc4e8", "#cfe4f0", 110) +
    clouds(300, 26, 1) +
    clouds(200, 18, 0.7) +
    band(110, 100, "#1a5f8a") +
    ripples(140, "#bfe8f4") +
    ripples(168, "#8fc4e8") +
    ripples(190, "#bfe8f4") +
    // 断崖(左3分の1に立つ)
    `<path d="M0,210V96c26,-4 40,10 46,30c4,16 -2,30 -2,84z" fill="#c9c0a4"/>` +
    `<path d="M6,120q20,4 30,20" stroke="#a8a084" stroke-width="1.6" fill="none" opacity=".7"/>` +
    `<path d="M4,160q22,2 34,14" stroke="#a8a084" stroke-width="1.6" fill="none" opacity=".7"/>` +
    `<path d="M10,140q14,2 20,12" stroke="#8a8268" stroke-width="1.2" fill="none" opacity=".6"/>` +
    `<g fill="#3f8f4a" opacity=".8"><ellipse cx="30" cy="98" rx="26" ry="6"/><ellipse cx="12" cy="104" rx="10" ry="4"/><ellipse cx="40" cy="106" rx="9" ry="4"/></g>` +
    meru(56, 92, 30, 3) +
    person(30, 108, "#c2603c") +
    // 沖の岩とジュクン
    `<g fill="#3f7f6a" opacity=".6"><ellipse cx="330" cy="150" rx="18" ry="7"/><ellipse cx="360" cy="164" rx="14" ry="6"/></g>` +
    jukung(300, 186, 44, "#e8823c", null) +
    // 海鳥
    `<g fill="none" stroke="#20364a" stroke-width="1.4"><path d="M120,80q5,-5 10,0M150,60q5,-5 10,0M180,86q5,-5 10,0M220,50q4,-4 8,0M260,72q4,-4 8,0"/></g>`,

  /** 棚田の村(テガララン・ジャティルウィ・ムンドゥック)。段が主役。 */
  riceterrace:
    sky("#8fc4e8", "#dce8ee", 96) +
    clouds(90, 24, 0.8) +
    hills(94, "#7fae5a", 3) +
    ground(96, "#8fae63") +
    terraceRows(100, 6, "#5f8f4a") +
    terraceRows(150, 5, "#79a854") +
    terraceRows(70, 3, "#8fae4a") +
    // あぜ道と農具小屋(右3分の1、隠れない側)
    `<rect x="316" y="150" width="34" height="26" fill="#c9a877"/>` +
    `<path d="M310,150h46l-8,-10h-30z" fill="#5a4630"/>` +
    person(280, 186, "#4a7bd0") +
    `<path d="M270,182l-14,-4" stroke="#8a6a3c" stroke-width="2" fill="none"/>` +
    ground(178, "#6f9450") +
    // 水牛(あぜの手前)
    `<g fill="#3a3446"><ellipse cx="60" cy="196" rx="16" ry="9"/><circle cx="46" cy="188" r="5"/><rect x="52" y="202" width="3" height="6"/><rect x="66" y="202" width="3" height="6"/></g>` +
    `<path d="M42,184l-4,-5M42,184l1,-6" stroke="#e8e2d2" stroke-width="1.6" fill="none"/>` +
    `<g fill="none" stroke="#20364a" stroke-width="1.2"><path d="M60,50q4,-4 8,0M340,40q4,-4 8,0"/></g>` +
    `<g fill="#a8763a" opacity=".5"><ellipse cx="150" cy="196" rx="30" ry="6"/></g>`,

  /** サーフの浜(クタ・チャングー・スミニャック)。波と板。 */
  surfbeach:
    sky("#f5b31c", "#f6d9a8", 92) +
    sun(320, 44, 24, "#f6efe2") +
    band(92, 70, "#1a5f8a") +
    `<g fill="#cfe8f4" opacity=".9"><path d="M0,140q40,-14 80,0t80,0t80,0t80,0t80,0v6H0z"/></g>` +
    band(162, 48, "#e8d8bf") +
    `<g stroke="#d8c8a0" stroke-width="1.6" opacity=".7"><path d="M0,170q60,6 120,0t120,0t120,0"/></g>` +
    // サーフボードを立てかけた屋台(左3分の1)
    `<rect x="24" y="166" width="6" height="30" fill="#3b2a1c"/>` +
    `<path d="M20,166L34,150L48,166z" fill="#e8443f"/>` +
    `<g fill="#5b8fe8"><rect x="60" y="176" width="4" height="20"/><rect x="70" y="172" width="4" height="24"/></g>` +
    `<g fill="#f5b31c"><rect x="80" y="178" width="4" height="18"/></g>` +
    person(120, 196, "#e8443f") +
    person(150, 200, "#5b8fe8") +
    palm(360, 200, 44) +
    palm(384, 206, 30) +
    `<g fill="none" stroke="#20364a" stroke-width="1.4"><path d="M40,50q4,-4 8,0M60,40q4,-4 8,0"/></g>` +
    `<path d="M200,196q7,-4 14,0l-2,-16q-5,-3 -10,0z" fill="#3f8f4a"/>`,

  /** 静かな浜(サヌール・ヌサドゥア・ジンバラン)。ヤシと日の出。 */
  quietbeach:
    sky("#f5b31c", "#f6d9a8", 96) +
    sun(300, 56, 26, "#f6efe2") +
    clouds(160, 30, 0.7) +
    band(96, 62, "#1a5f8a") +
    ripples(120, "#bfe8f4") +
    ripples(140, "#8fc4e8") +
    band(158, 52, "#e8d8bf") +
    jukung(90, 176, 60, "#e8823c", null) +
    jukung(140, 190, 40, "#c2603c", null) +
    palm(44, 200, 50) +
    palm(20, 206, 34) +
    person(340, 196, "#4a7bd0") +
    `<g fill="none" stroke="#20364a" stroke-width="1.4"><path d="M240,50q4,-4 8,0M260,40q4,-4 8,0"/></g>` +
    `<g fill="#f6efe2" opacity=".8"><ellipse cx="240" cy="202" rx="2.4" ry="1.6"/><ellipse cx="252" cy="204" rx="2" ry="1.4"/><ellipse cx="264" cy="201" rx="2.2" ry="1.5"/></g>` +
    `<g fill="#8a7250" opacity=".6"><ellipse cx="200" cy="200" rx="24" ry="4"/></g>`,

  /** 大きな寺院(ブサキ・タナロット・ウルンダヌ・ティルタウンプル)。 */
  templegate:
    sky("#8fc4e8", "#cfe4f0", 128) +
    clouds(300, 30, 1) +
    hills(126, "#7fae5a", 3) +
    ground(128, "#8fae63") +
    splitGate(70, 172, 70) +
    // 石段と塀の帯(隠れる帯を横切る、繰り返し)
    `<rect x="150" y="150" width="250" height="10" fill="#a8926c"/>` +
    `<g stroke="#8a7250" stroke-width="1.2" opacity=".8"><path d="M150,155h250"/></g>` +
    meru(330, 200, 60, 6) +
    meru(288, 204, 40, 4) +
    ground(178, "#7fae5a") +
    offering(150, 200, 14) +
    person(190, 202, "#c2603c"),

  /** 山あいの湖(ブラタン・ブヤン・タンブリガン)。水面に浮かぶ祠。 */
  lakeside:
    sky("#8fc4e8", "#dce8ee", 100) +
    clouds(90, 24, 0.9) +
    clouds(280, 18, 0.7) +
    hills(98, "#6f8a52", 4) +
    hills(96, "#8fae5a", 2) +
    band(100, 84, "#4a8fb8") +
    ripples(126) +
    ripples(150, "#8fc4e8") +
    ripples(170, "#bfe8f4") +
    // 湖上の祠(左3分の1)
    `<ellipse cx="96" cy="182" rx="30" ry="8" fill="#4a8fb8" opacity=".6"/>` +
    `<rect x="80" y="168" width="32" height="14" fill="#a8926c"/>` +
    meru(96, 168, 46, 4) +
    jukung(280, 176, 40, "#e8823c", null) +
    // 岸辺の葦
    `<g stroke="#4f8f42" stroke-width="2" fill="none" opacity=".8"><path d="M330,190v-16M340,190v-20M350,190v-14"/></g>` +
    ground(184, "#7fae5a") +
    `<path d="M0,192c60,-6 120,4 200,0c60,-4 120,4 200,8v10H0z" fill="#6f9450"/>` +
    `<g fill="none" stroke="#20364a" stroke-width="1.2"><path d="M200,50q4,-4 8,0M220,40q4,-4 8,0"/></g>` +
    person(330, 198, "#5b8fe8"),

  /** 漁村(アメッド・トゥランベン)。黒砂の浜にジュクンが並ぶ。 */
  fishingvillage:
    sky("#f5b31c", "#f6d9a8", 96) +
    sun(60, 50, 22, "#f6efe2") +
    band(96, 62, "#1a5f8a") +
    ripples(118, "#bfe8f4") +
    ground(158, "#3b3a3c") +
    `<g stroke="#2a2a2c" stroke-width="1.4" opacity=".6"><path d="M0,168q60,4 120,0t120,0t120,0"/></g>` +
    jukung(200, 186, 66, "#e8823c", "#f6efe2") +
    jukung(260, 196, 46, "#c2603c", null) +
    jukung(320, 192, 40, "#e8823c", null) +
    jukung(40, 200, 34, "#e8823c", null) +
    // 干した網(繰り返しのジグザグ)
    `<path d="M150,150l14,10l-14,10l14,10" stroke="#a8926c" stroke-width="1.6" fill="none"/>` +
    `<path d="M180,150l14,10l-14,10l14,10" stroke="#a8926c" stroke-width="1.6" fill="none"/>` +
    person(120, 198, "#4a7bd0") +
    palm(370, 200, 42) +
    `<g fill="#3f7f6a" opacity=".5"><ellipse cx="40" cy="130" rx="16" ry="6"/><ellipse cx="70" cy="140" rx="12" ry="5"/></g>` +
    `<g fill="none" stroke="#20364a" stroke-width="1.4"><path d="M280,60q5,-5 10,0M310,44q5,-5 10,0M100,70q4,-4 8,0"/></g>`,

  /** 高地の村(ムンドゥック・バンリ)。霧の中のコーヒー畑。 */
  hillvillage:
    sky("#9fb8c8", "#dce8ee", 110) +
    `<g opacity=".5" fill="#f6efe2"><ellipse cx="200" cy="100" rx="180" ry="14"/></g>` +
    hills(108, "#6f8a52", 4) +
    ground(110, "#7fae5a") +
    // コーヒーの木の列(隠れる帯を横切る繰り返し)
    `<g fill="#3f6b3a">` +
    Array.from({ length: 9 }, (_, i) => `<ellipse cx="${30 + i * 42}" cy="150" rx="14" ry="10"/>`).join("") +
    `</g>` +
    `<g fill="#8a3a3a">` +
    Array.from({ length: 9 }, (_, i) => `<circle cx="${26 + i * 42}" cy="148" r="1.6"/><circle cx="${34 + i * 42}" cy="152" r="1.6"/>`).join("") +
    `</g>` +
    ground(178, "#6f9450") +
    `<rect x="300" y="150" width="40" height="30" fill="#c9a877"/>` +
    `<path d="M294,150h52l-10,-12h-32z" fill="#5a4630"/>` +
    person(80, 196, "#4a7bd0"),
};

/** 全てに `sky()` の塗り残しが無いことを、簡易チェックで確かめておく。 */
export const BALI_BG = BALI_BASE_BG;

// ---------------------------------------------------------------------------
// 都市シンボル(12種、24×24)
// ---------------------------------------------------------------------------

export const BALI_MARKS = {
  /** 分かれ門(チャンディ・ブンタール)。左右対称の半分ずつの塔。 */
  palace:
    `<path d="M9,21h4v-9l-2,-3z" fill="#8a7250"/><path d="M15,21h-4v-9l2,-3z" fill="#8a7250"/>` +
    `<path d="M9,12l-2,-4l3,-2z" fill="#5a4630"/><path d="M15,12l2,-4l-3,-2z" fill="#5a4630"/>` +
    `<rect x="8.5" y="21" width="7" height="1.6" fill="#5a4630"/>`,

  /** 筆と彫刻刀。 */
  craft:
    `<path d="M5,19l9,-11l3,3l-9,11z" fill="#8a6a3c"/><path d="M14,8l3,3l-2,2l-3,-3z" fill="#3a3446"/>` +
    `<path d="M17,20c2,-1 3,-3 2,-5c-2,1 -3,3 -2,5z" fill="#e8443f"/>` +
    `<rect x="4" y="19" width="3" height="3" fill="#4a4436"/>`,

  /** 噴煙を上げる山。 */
  volcano:
    `<path d="M2,20L12,4L22,20z" fill="#5c5044"/><path d="M9,9L12,4L15,9z" fill="#3a3228"/>` +
    `<g fill="#cfd4d8" opacity=".8"><ellipse cx="12" cy="2" rx="3" ry="2"/><ellipse cx="15" cy="0" rx="3.4" ry="2"/></g>`,

  /** 波紋の水面(湖)。 */
  lake:
    `<ellipse cx="12" cy="13" rx="10" ry="7" fill="#4a8fb8"/>` +
    `<g stroke="#bfe8f4" stroke-width="1.4" fill="none" opacity=".8"><path d="M4,11q4,-2 8,0t8,0M5,15q4,-2 8,0t7,0"/></g>` +
    `<path d="M8,7l4,-5l4,5z" fill="#6f8a52"/>`,

  /** ジュクン(アウトリガー舟)。 */
  boat:
    `<path d="M3,18Q1,14 5,13L18,10Q21,15 17,18z" fill="#e8823c"/>` +
    `<path d="M6,18v3M15,17v3" stroke="#c9a877" stroke-width="1.4"/><path d="M4,21h13" stroke="#c9a877" stroke-width="1.6"/>`,

  /** 魚と気泡(潜水)。 */
  dive:
    `<path d="M4,13c3,-4 10,-4 13,0c-3,4 -10,4 -13,0z" fill="#5b8fe8"/><path d="M17,13l4,-3v6z" fill="#5b8fe8"/><circle cx="7" cy="12" r="1" fill="#20364a"/>` +
    `<g fill="#bfe8f4" opacity=".8"><circle cx="18" cy="4" r="1.6"/><circle cx="21" cy="7" r="1.2"/></g>`,

  /** 段々の田(棚田)。 */
  terrace:
    `<g fill="#6fae4a"><path d="M2,20h20v-3H2z"/><path d="M4,17h16v-3H4z"/><path d="M6,14h12v-3H6z"/><path d="M8,11h8v-3H8z"/></g>` +
    `<g stroke="#4f8f42" stroke-width="1" opacity=".7"><path d="M2,17h20M4,14h16M6,11h12"/></g>`,

  /** 波と板(サーフ)。 */
  surf:
    `<path d="M2,17q5,-6 10,0t10,0" stroke="#1a5f8a" stroke-width="2.4" fill="none"/>` +
    `<path d="M13,4L17,20" stroke="#e8443f" stroke-width="3" stroke-linecap="round"/>`,

  /** ヤシと太陽(浜)。 */
  beach:
    `<circle cx="17" cy="6" r="3.4" fill="#f5b31c"/>` +
    `<path d="M6,20q1,-8 -1,-14" stroke="#6b5330" stroke-width="1.8" fill="none"/>` +
    `<g fill="#3f8f4a"><path d="M5,6c-4,-1 -6,1 -7,4c3,1 6,0 7,-4z"/><path d="M5,6c4,-1 6,1 7,4c-3,1 -6,0 -7,-4z"/></g>` +
    `<path d="M2,20h20" stroke="#e8d8bf" stroke-width="3"/>`,

  /**
   * 多層屋根の祠(メール)。**火山(volcano)と同じ三角錐にならないよう、
   * 各段の軒を横に張り出させて段差をはっきり見せる**(pagoda型の輪郭)。
   * 軒だけ地の色を替えて、階段状であることが24px でも分かるようにする。
   */
  meru:
    `<g fill="#241a10">` +
    `<path d="M3,20h18l-2,-3.4H5z"/><path d="M4.6,16.6h14.8l-1,-2H5.6z"/>` +
    `<path d="M5.6,14.6h12.8l-1.8,-3H7.4z"/><path d="M7.4,11.6h9.2l-1,-1.8H8.4z"/>` +
    `<path d="M8.4,9.8h7.2l-1.6,-2.8H10z"/><path d="M10,7h4l-2,-3.6z"/>` +
    `</g>` +
    `<g fill="#4a3626">` +
    `<path d="M3,20h18l-1,-1.6H4z"/><path d="M4.6,16.6h14.8l-0.6,-1H5.2z"/>` +
    `<path d="M5.6,14.6h12.8l-1,-1.6H6.6z"/><path d="M7.4,11.6h9.2l-0.6,-1H7.8z"/>` +
    `</g>` +
    `<rect x="10.2" y="20" width="3.6" height="2.4" fill="#c9a877"/>`,

  /** 供物の籠(チャナン・サリ)。 */
  offering:
    `<rect x="4" y="15" width="16" height="5" fill="#c9a877"/>` +
    `<circle cx="8" cy="13" r="2.2" fill="#e8443f"/><circle cx="13" cy="12.4" r="2" fill="#f5b31c"/><circle cx="17" cy="13.4" r="2" fill="#f6efe2"/>`,

  /** 果物と籠(収穫)。 */
  harvest:
    `<path d="M3,14c2,-6 16,-6 18,0c-2,4 -16,4 -18,0z" fill="#c9a877"/>` +
    `<circle cx="9" cy="9" r="3.2" fill="#e8443f"/><circle cx="15" cy="8" r="3" fill="#f5b31c"/><path d="M9,6v-2M15,5v-2" stroke="#3f8f4a" stroke-width="1.4"/>`,
};
