/**
 * 南アフリカの都市イラスト。
 *
 * `SOUTHAFRICA_MARKS` は 24×24 の座標系に描くシンボル、`SOUTHAFRICA_BG` は
 * 400×210 の座標系に描く背景シーン(いずれもSVG断片の文字列)。
 * 動きは含めない(アニメーションはReact側で重ねる)。
 *
 * ## この盤面の芯
 *
 * 「鉄道が、法律で引き離された『住む場所』と『働く場所』のあいだを、
 * 毎日運んでいた国」。アフリカ大陸盤が**外向きの話**(資源を運び出す鉄道)を
 * 語るのに対し、こちらは**国の内側の話**を描く。誰がどこに住めて、どこで
 * 働かされたか。
 *
 * その芯を担うのは `township` `goldbelt` `bighole` `islandprison`
 * `homelandcapital` `megacity` の数枚だけで、残りはワイン・鯨・古代王国・
 * 岩と星空へ広く散らしてある。**41都市を全部アパルトヘイトの風景にしない。**
 *
 * `goldbelt`(カールトンビル/ウェルコム/ゲルミストン)と
 * `homelandcapital`(ムタタ/ビショ)が背景を共有するのは手抜きではない。
 * **同じ法律が同じ形に作った場所**であり、巻き上げ櫓と宿舎の並ぶ町並みは
 * 実際に似ている。似ていることを、そのまま描いている。
 *
 * ## 色
 *
 * 空 #8fc4e8〜、ハイフェルトの枯草 #c2a868/#a8905a、ブッシュフェルトの緑
 * #4f7f42、赤土 #a8603c、カルーの砂 #c9a877、波形鉄板 #9aa4ac/#a8623c、
 * 鉱滓の山 #d8c98a、鋼 #5a6470、ジャカランダ #8a7ab8、石炭 #33343a。
 *
 * ## 描くときの決まり
 *
 * - 中央 x=151〜249 / y=54〜152 は都市シンボルに隠れる。**繰り返しの・
 *   失っても惜しくないもの**だけを置き、主役は左右3分の1と y>170 に置く。
 * - `sky(top, bottom, to)` の `to` には**次に来る塗りの開始y**を渡す。
 *   渡し忘れると横一文字に台紙が透ける。
 *   確認は `node scripts/check-city-backgrounds.mjs southafrica --src`。
 */

// ---------------------------------------------------------------------------
// 背景シーンの組み立て部品
// ---------------------------------------------------------------------------

const W = 400;

/** 小数の桁を抑える(SVGを読みやすく保つため)。 */
const r1 = (v) => Math.round(v * 10) / 10;

/** 繰り返し。等間隔の家並み・柵・畝はこれで作る。 */
const rep = (n, f) => {
  let s = "";
  for (let i = 0; i < n; i++) s += f(i);
  return s;
};

/** 横帯。 */
function band(y, h, fill) {
  return `<rect x="0" y="${y}" width="${W}" height="${h}" fill="${fill}"/>`;
}

/**
 * 空。`to` は**塗り下ろす深さ**(= 次に来る塗りの開始y)。
 * 既定の118はすぐ下に地面が来る場合の値でしかない。
 */
function sky(top, bottom, to = 118) {
  return band(0, 84, top) + band(78, to - 78, bottom);
}

/** 地面。 */
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

/** 遠景の丘の連なり。 */
function hills(y, fill, count = 4) {
  return `<g opacity=".9">${rep(
    count,
    (i) => `<path d="M${r1(40 + (i * W) / count - 70)},${y}c20,-34 50,-34 70,0z" fill="${fill}"/>`,
  )}</g>`;
}

/** 水面の反射線。 */
function ripples(y, color = "#bfe8f4") {
  return `<g stroke="${color}" stroke-width="2" opacity=".7" fill="none"><path d="M22,${y}h70M180,${y + 12}h90M108,${y + 24}h64M282,${y + 6}h74"/></g>`;
}

/** 人。20px前後。腕は `arm()` で別に足して、何をしているかを出す。 */
function person(x, base, h, shirt, skin = "#8a5a34") {
  const hd = r1(h * 0.19);
  const top = r1(base - h + hd * 1.7);
  return (
    `<g><rect x="${r1(x - h * 0.09)}" y="${r1(base - h * 0.4)}" width="${r1(h * 0.08)}" height="${r1(h * 0.4)}" fill="#3f3428"/>` +
    `<rect x="${r1(x + h * 0.02)}" y="${r1(base - h * 0.4)}" width="${r1(h * 0.08)}" height="${r1(h * 0.4)}" fill="#3f3428"/>` +
    `<path d="M${r1(x - h * 0.16)},${top}h${r1(h * 0.32)}l${r1(h * 0.03)},${r1(h * 0.42)}h${r1(-h * 0.38)}z" fill="${shirt}"/>` +
    `<circle cx="${x}" cy="${r1(top - hd * 0.75)}" r="${hd}" fill="${skin}"/></g>`
  );
}

function arm(x, y, dx, dy, color = "#8a5a34", w = 3) {
  return `<path d="M${x},${y}l${dx},${dy}" stroke="${color}" stroke-width="${w}" stroke-linecap="round" fill="none"/>`;
}

// ---------------------------------------------------------------------------
// 南アフリカに固有の部品
// ---------------------------------------------------------------------------

/**
 * 巻き上げ櫓(headgear)。この国の産業景観でいちばん目につく形。
 * 塔・斜めの支え・滑車2枚。滑車が2枚並ぶことで「巻き上げ機」だと分かる。
 */
function headgear(x, base, h, steel = "#5a6470", dark = "#3f4a55") {
  const top = r1(base - h);
  const hw = r1(h * 0.17);
  const tw = r1(h * 0.07);
  const parts = [
    // 巻き上げ機側へ伸びる斜めの支え
    `<path d="M${r1(x + hw * 1.6)},${base}L${r1(x + tw * 0.6)},${r1(top + h * 0.1)}l${r1(tw * 1.2)},0L${r1(x + hw * 2.6)},${base}z" fill="${dark}"/>`,
    // 主塔
    `<path d="M${r1(x - hw)},${base}L${r1(x - tw)},${top}h${r1(tw * 2)}L${r1(x + hw)},${base}z" fill="${steel}"/>`,
  ];
  for (let i = 1; i <= 4; i++) {
    const t = i / 5;
    const wd = r1(hw + (tw - hw) * t);
    parts.push(
      `<rect x="${r1(x - wd)}" y="${r1(base - h * t)}" width="${r1(wd * 2)}" height="1.6" fill="${dark}"/>`,
    );
  }
  const rw = r1(h * 0.105);
  parts.push(
    `<g fill="${dark}"><circle cx="${r1(x - rw * 0.8)}" cy="${r1(top - rw * 0.5)}" r="${rw}"/><circle cx="${r1(x + rw * 0.8)}" cy="${r1(top - rw * 0.5)}" r="${rw}"/></g>`,
    `<g fill="${steel}"><circle cx="${r1(x - rw * 0.8)}" cy="${r1(top - rw * 0.5)}" r="${r1(rw * 0.4)}"/><circle cx="${r1(x + rw * 0.8)}" cy="${r1(top - rw * 0.5)}" r="${r1(rw * 0.4)}"/></g>`,
  );
  return parts.join("");
}

/** 波形鉄板の小屋。継ぎ目の縦線が「トタン」を決める。 */
function shack(x, base, w, h, wall = "#9aa4ac", roof = "#a8623c") {
  const parts = [
    `<rect x="${x}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${wall}"/>`,
    `<path d="M${r1(x - 3)},${r1(base - h)}h${r1(w + 6)}l-2.4,-4.6h${r1(-(w + 1.2))}z" fill="${roof}"/>`,
    `<path d="${rep(Math.max(1, Math.floor(w / 6)), (i) => `M${r1(x + 4.5 + i * 6)},${r1(base - h)}v${h}`)}" stroke="#000" stroke-width="1.4" opacity=".14" fill="none"/>`,
    `<rect x="${r1(x + w * 0.34)}" y="${r1(base - h * 0.66)}" width="${r1(w * 0.3)}" height="${r1(h * 0.66)}" fill="#4a4436"/>`,
  ];
  return parts.join("");
}

/** マッチ箱住宅(タウンシップの規格住宅)。同じ形が延々と並ぶのが要点。 */
function matchbox(x, base, w, h, wall = "#cfc0a4", roof = "#8a5f4a") {
  return (
    `<rect x="${x}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${wall}"/>` +
    `<path d="M${r1(x - 2.4)},${r1(base - h)}h${r1(w + 4.8)}l${r1(-w * 0.14)},-4.4h${r1(-(w * 0.72))}z" fill="${roof}"/>` +
    `<g fill="#5f6b76"><rect x="${r1(x + w * 0.16)}" y="${r1(base - h * 0.68)}" width="${r1(w * 0.22)}" height="${r1(h * 0.36)}"/><rect x="${r1(x + w * 0.62)}" y="${r1(base - h * 0.68)}" width="${r1(w * 0.22)}" height="${r1(h * 0.36)}"/></g>`
  );
}

/** ロンダベル(丸屋根の伝統家屋)。円筒の壁に円錐の茅葺き。 */
function rondavelHut(x, base, r, thatch = "#b08f52", wall = "#e0d2b4") {
  const wh = r1(r * 0.85);
  const eave = r1(base - wh);
  const apex = r1(base - wh - r * 1.05);
  return (
    `<path d="M${r1(x - r)},${base}v${-wh}h${r1(r * 2)}v${wh}z" fill="${wall}"/>` +
    `<path d="M${r1(x - r * 1.26)},${eave}L${x},${apex}L${r1(x + r * 1.26)},${eave}z" fill="${thatch}"/>` +
    `<g stroke="#8f7038" stroke-width="1" fill="none">${rep(4, (i) => `<path d="M${x},${r1(apex + 2)}L${r1(x + r * 1.2 * (-0.62 + i * 0.42))},${eave}"/>`)}</g>` +
    `<path d="M${r1(x - r * 1.3)},${eave}h${r1(r * 2.6)}v2h${r1(-r * 2.6)}z" fill="#96793f"/>` +
    `<path d="M${r1(x - r * 0.26)},${base}v${r1(-r * 0.56)}h${r1(r * 0.52)}v${r1(r * 0.56)}z" fill="#5a4630"/>`
  );
}

/** 宿舎(長屋)。同じ窓と扉が等間隔に続く、閉鎖コンパウンドの形。 */
function hostelBlock(x, base, w, h, wall = "#b8ae98", roof = "#7f8a94") {
  const n = Math.max(3, Math.round(w / 26));
  return (
    `<rect x="${x}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${wall}"/>` +
    `<rect x="${r1(x - 3)}" y="${r1(base - h - 5)}" width="${r1(w + 6)}" height="5" fill="${roof}"/>` +
    `<g fill="#5f6b76">${rep(n, (i) => `<rect x="${r1(x + 6 + (i * (w - 12)) / n)}" y="${r1(base - h * 0.74)}" width="${r1(h * 0.26)}" height="${r1(h * 0.3)}"/>`)}</g>` +
    `<g fill="#4a4436">${rep(n, (i) => `<rect x="${r1(x + 6 + (i * (w - 12)) / n)}" y="${r1(base - h * 0.4)}" width="${r1(h * 0.22)}" height="${r1(h * 0.4)}"/>`)}</g>` +
    `<rect x="${x}" y="${r1(base - h * 0.4)}" width="${w}" height="1.4" fill="#9a917c"/>`
  );
}

/**
 * 金網の柵。キンバリーの閉鎖コンパウンドから金鉱の宿舎へ受け継がれた形。
 * **柵を描けば伝わる。**残酷な場面を描く必要はない。
 */
function fence(x0, x1, base, h, color = "#6f6a5e") {
  const span = x1 - x0;
  const mesh = [];
  for (let x = x0; x < x1; x += 8) mesh.push(`M${r1(x)},${base}l8,${-h}M${r1(x)},${r1(base - h)}l8,${h}`);
  return (
    `<g stroke="${color}" stroke-width=".8" opacity=".6" fill="none"><path d="${mesh.join("")}"/></g>` +
    `<rect x="${x0}" y="${r1(base - h)}" width="${span}" height="1.6" fill="${color}"/>` +
    `<rect x="${x0}" y="${r1(base - h * 0.55)}" width="${span}" height="1.2" fill="${color}" opacity=".8"/>` +
    `<g fill="${color}">${rep(9, (i) => `<rect x="${r1(x0 + (i * span) / 8)}" y="${r1(base - h - 2)}" width="1.8" height="${r1(h + 2)}"/>`)}</g>`
  );
}

/** 鉱滓の山(平らな頂の黄色い台形)。ランドの町ならどこからでも見える。 */
function mineDump(cx, base, w, h, fill = "#d8c98a", edge = "#bfad6a") {
  const tw = r1(w * 0.4);
  return (
    `<path d="M${r1(cx - w / 2)},${base}L${r1(cx - tw / 2)},${r1(base - h)}h${tw}L${r1(cx + w / 2)},${base}z" fill="${fill}"/>` +
    `<g stroke="${edge}" stroke-width="1.4" fill="none">${rep(3, (i) => {
      const t = (i + 1) / 4;
      const hw = r1(w / 2 + (tw / 2 - w / 2) * t);
      return `<path d="M${r1(cx - hw)},${r1(base - h * t)}h${r1(hw * 2)}"/>`;
    })}</g>` +
    `<path d="M${r1(cx + tw / 2)},${r1(base - h)}L${r1(cx + w / 2)},${base}h${r1(-w * 0.16)}z" fill="#000" opacity=".1"/>`
  );
}

/** 傘状のアカシア(ブッシュフェルト)。**縦より横が広い**ことで読める。 */
function acacia(x, base, h, crown = "#4f7f42") {
  const top = r1(base - h);
  const fork = r1(top + h * 0.44);
  return (
    `<path d="M${r1(x - 1.8)},${base}L${r1(x - 0.9)},${fork}h1.8L${r1(x + 1.8)},${base}z" fill="#6b5330"/>` +
    `<g stroke="#6b5330" stroke-width="1.4" fill="none"><path d="M${x},${fork}l${r1(-h * 0.34)},${r1(-h * 0.2)}M${x},${fork}l${r1(h * 0.34)},${r1(-h * 0.2)}M${x},${fork}l0,${r1(-h * 0.26)}"/></g>` +
    `<g fill="${crown}"><ellipse cx="${x}" cy="${r1(top + h * 0.13)}" rx="${r1(h * 0.56)}" ry="${r1(h * 0.13)}"/>` +
    `<ellipse cx="${r1(x - h * 0.3)}" cy="${r1(top + h * 0.25)}" rx="${r1(h * 0.28)}" ry="${r1(h * 0.1)}"/>` +
    `<ellipse cx="${r1(x + h * 0.32)}" cy="${r1(top + h * 0.24)}" rx="${r1(h * 0.26)}" ry="${r1(h * 0.1)}"/></g>`
  );
}

/** バオバブ。**幹が太く、枝が細い根のように上へ散る。** */
function baobabTree(x, base, h) {
  const top = r1(base - h);
  const bw = r1(h * 0.3);
  return (
    `<path d="M${r1(x - bw)},${base}c${r1(bw * 0.15)},${r1(-h * 0.5)} ${r1(bw * 0.3)},${r1(-h * 0.6)} ${r1(bw * 0.55)},${r1(-h * 0.66)}h${r1(bw * 0.9)}c${r1(bw * 0.25)},${r1(h * 0.06)} ${r1(bw * 0.4)},${r1(h * 0.16)} ${r1(bw * 0.55)},${r1(h * 0.66)}z" fill="#a8977c"/>` +
    `<path d="M${r1(x + bw * 0.2)},${base}c${r1(bw * 0.1)},${r1(-h * 0.4)} ${r1(bw * 0.3)},${r1(-h * 0.56)} ${r1(bw * 0.35)},${r1(-h * 0.66)}h${r1(bw * 0.45)}c${r1(bw * 0.25)},${r1(h * 0.06)} ${r1(bw * 0.4)},${r1(h * 0.16)} ${r1(bw * 0.55)},${r1(h * 0.66)}z" fill="#8f7f66" opacity=".7"/>` +
    `<g stroke="#8f7f66" stroke-width="2.2" stroke-linecap="round" fill="none"><path d="M${x},${r1(top + h * 0.34)}l${r1(-h * 0.24)},${r1(-h * 0.2)}M${x},${r1(top + h * 0.34)}l${r1(h * 0.26)},${r1(-h * 0.18)}M${x},${r1(top + h * 0.34)}l${r1(-h * 0.06)},${r1(-h * 0.3)}M${x},${r1(top + h * 0.34)}l${r1(h * 0.1)},${r1(-h * 0.3)}"/></g>` +
    `<g stroke="#8f7f66" stroke-width="1.2" stroke-linecap="round" fill="none"><path d="M${r1(x - h * 0.24)},${r1(top + h * 0.14)}l${r1(-h * 0.1)},${r1(-h * 0.1)}M${r1(x + h * 0.26)},${r1(top + h * 0.16)}l${r1(h * 0.12)},${r1(-h * 0.1)}M${r1(x + h * 0.1)},${r1(top + h * 0.04)}l${r1(h * 0.06)},${r1(-h * 0.1)}"/></g>`
  );
}

/** 冷却塔(双曲線の胴)。 */
function coolingTower(x, base, h, w = 34, fill = "#b8b2a8") {
  const top = r1(base - h);
  const tw = r1(w * 0.6);
  const mid = r1(base - h * 0.6);
  return (
    `<path d="M${r1(x - w / 2)},${base}C${r1(x - w * 0.3)},${mid} ${r1(x - tw / 2)},${r1(top + h * 0.2)} ${r1(x - tw / 2)},${top}h${tw}C${r1(x + tw / 2)},${r1(top + h * 0.2)} ${r1(x + w * 0.3)},${mid} ${r1(x + w / 2)},${base}z" fill="${fill}"/>` +
    `<rect x="${r1(x - tw / 2)}" y="${top}" width="${tw}" height="2.4" fill="#8f897e"/>` +
    `<path d="M${r1(x + tw * 0.08)},${top}C${r1(x + tw * 0.2)},${r1(top + h * 0.3)} ${r1(x + w * 0.2)},${mid} ${r1(x + w * 0.24)},${base}h${r1(w * 0.26)}C${r1(x + w * 0.3)},${mid} ${r1(x + tw / 2)},${r1(top + h * 0.2)} ${r1(x + tw / 2)},${top}z" fill="#000" opacity=".1"/>`
  );
}

/** 湯気・煙。 */
function steam(cx, cy, s = 1, fill = "#f0ece4", o = ".7") {
  const e = (dx, dy, rx, ry) =>
    `<ellipse cx="${r1(cx + dx * s)}" cy="${r1(cy + dy * s)}" rx="${r1(rx * s)}" ry="${r1(ry * s)}"/>`;
  return `<g fill="${fill}" opacity="${o}">${e(0, 0, 15, 8)}${e(-11, -6, 10, 6)}${e(9, -8, 11, 7)}${e(-2, -15, 9, 6)}</g>`;
}

/** 送電鉄塔。 */
function pylon(x, base, h, color = "#6b7280") {
  const hw = r1(h * 0.16);
  const tw = r1(h * 0.045);
  const top = r1(base - h);
  return (
    `<path d="M${r1(x - hw)},${base}L${r1(x - tw)},${top}h${r1(tw * 2)}L${r1(x + hw)},${base}l${r1(-hw * 0.45)},0L${r1(x + tw * 0.55)},${r1(top + 2)}h${r1(-tw * 1.1)}L${r1(x - hw * 0.45)},${base}z" fill="${color}"/>` +
    `<g fill="${color}"><rect x="${r1(x - h * 0.26)}" y="${r1(base - h * 0.72)}" width="${r1(h * 0.52)}" height="1.6"/><rect x="${r1(x - h * 0.19)}" y="${r1(base - h * 0.87)}" width="${r1(h * 0.38)}" height="1.5"/></g>` +
    `<g stroke="${color}" stroke-width="1" opacity=".8" fill="none"><path d="M${r1(x - hw * 0.8)},${r1(base - h * 0.5)}h${r1(hw * 1.6)}M${r1(x - hw * 0.55)},${r1(base - h * 0.24)}h${r1(hw * 1.1)}"/></g>`
  );
}

/** ナツメヤシ(オレンジ川)。葉が弓なりに垂れる。 */
function datePalm(x, base, h) {
  const top = r1(base - h);
  return (
    `<path d="M${r1(x - 2.4)},${base}q1.4,${r1(-h * 0.5)} 1,${r1(-h)}h2.4q0.4,${r1(h * 0.5)} 1.8,${r1(h)}z" fill="#7f6a48"/>` +
    `<g fill="#3f7f42">${rep(6, (i) => {
      const a = -0.5 + i * 0.35;
      const dx = r1(Math.sin(a) * h * 0.62);
      const dy = r1(-Math.abs(Math.cos(a)) * h * 0.2 + h * 0.16);
      return `<path d="M${x},${top}q${r1(dx * 0.6)},${r1(dy - h * 0.2)} ${dx},${dy}q${r1(-dx * 0.5)},${r1(-dy * 0.3 - h * 0.06)} ${-dx},${r1(-dy)}z"/>`;
    })}</g>` +
    `<g fill="#a8763c"><circle cx="${r1(x - 3)}" cy="${r1(top + 5)}" r="2"/><circle cx="${r1(x + 3.4)}" cy="${r1(top + 6)}" r="2"/></g>`
  );
}

/** ソテツ(モジャジ)。短く太い幹から硬い葉が放射状に出る。 */
function cycadPlant(x, base, h) {
  const top = r1(base - h * 0.42);
  return (
    `<rect x="${r1(x - h * 0.11)}" y="${top}" width="${r1(h * 0.22)}" height="${r1(h * 0.42)}" fill="#6b5a3c"/>` +
    `<g stroke="#7f6a48" stroke-width=".9" fill="none">${rep(3, (i) => `<path d="M${r1(x - h * 0.11)},${r1(top + h * 0.1 + i * h * 0.11)}h${r1(h * 0.22)}"/>`)}</g>` +
    `<g stroke="#2f6b3a" stroke-width="2.6" stroke-linecap="round" fill="none">${rep(7, (i) => {
      const a = -1.3 + i * 0.43;
      return `<path d="M${x},${top}q${r1(Math.sin(a) * h * 0.3)},${r1(-h * 0.34)} ${r1(Math.sin(a) * h * 0.58)},${r1(-Math.cos(a) * h * 0.4 + h * 0.06)}"/>`;
    })}</g>` +
    `<g stroke="#4f8f4a" stroke-width="1.2" fill="none">${rep(7, (i) => {
      const a = -1.3 + i * 0.43;
      return `<path d="M${x},${top}q${r1(Math.sin(a) * h * 0.3)},${r1(-h * 0.34)} ${r1(Math.sin(a) * h * 0.58)},${r1(-Math.cos(a) * h * 0.4 + h * 0.06)}"/>`;
    })}</g>`
  );
}

/** アロエ(カルー・東ケープ)。分厚い葉が放射状に立つ。 */
function aloe(x, base, h, leaf = "#5f8f5a") {
  return (
    `<g fill="${leaf}">${rep(7, (i) => {
      const a = -1.15 + i * 0.38;
      const tx = r1(x + Math.sin(a) * h * 0.55);
      const ty = r1(base - Math.cos(a) * h);
      return `<path d="M${r1(x - 2)},${base}Q${r1((x + tx) / 2 - 2)},${r1((base + ty) / 2)} ${tx},${ty}Q${r1((x + tx) / 2 + 2.4)},${r1((base + ty) / 2)} ${r1(x + 2)},${base}z"/>`;
    })}</g>` +
    `<rect x="${r1(x - 0.8)}" y="${r1(base - h * 1.35)}" width="1.6" height="${r1(h * 0.45)}" fill="#7f6a48"/>` +
    `<g fill="#e8562f"><ellipse cx="${x}" cy="${r1(base - h * 1.42)}" rx="3" ry="5"/><ellipse cx="${r1(x - 3.4)}" cy="${r1(base - h * 1.3)}" rx="2.2" ry="4"/></g>`
  );
}

/** カルーの平頂丘(コッピー)。 */
function koppie(cx, base, w, h, fill = "#a8906c") {
  const tw = r1(w * 0.34);
  return (
    `<path d="M${r1(cx - w / 2)},${base}L${r1(cx - tw / 2)},${r1(base - h)}h${tw}L${r1(cx + w / 2)},${base}z" fill="${fill}"/>` +
    `<rect x="${r1(cx - tw / 2 - 2)}" y="${r1(base - h)}" width="${r1(tw + 4)}" height="3" fill="#7f6a52"/>` +
    `<g stroke="#8f7a5c" stroke-width="1.2" opacity=".7" fill="none"><path d="M${r1(cx - w * 0.3)},${base}l${r1(w * 0.1)},${r1(-h * 0.6)}M${r1(cx + w * 0.22)},${base}l${r1(-w * 0.08)},${r1(-h * 0.55)}"/></g>`
  );
}

/** オークの並木(ケープワインランズ)。 */
function oakTree(x, base, r, crown = "#3f7f46") {
  return (
    `<rect x="${r1(x - r * 0.14)}" y="${r1(base - r * 1.5)}" width="${r1(r * 0.28)}" height="${r1(r * 1.5)}" fill="#5f4a30"/>` +
    `<circle cx="${x}" cy="${r1(base - r * 1.9)}" r="${r}" fill="${crown}"/>` +
    `<circle cx="${r1(x - r * 0.6)}" cy="${r1(base - r * 1.5)}" r="${r1(r * 0.6)}" fill="${crown}"/>` +
    `<circle cx="${r1(x + r * 0.62)}" cy="${r1(base - r * 1.55)}" r="${r1(r * 0.58)}" fill="${crown}"/>`
  );
}

/** ポプラ(自由州・ミッドランズ)。細く高い。 */
function poplar(x, base, h, fill = "#5f8f4a") {
  const b = r1(h * 0.11);
  return `<path d="M${x},${r1(base - h)}c${b},${r1(h * 0.3)} ${b},${r1(h * 0.7)} 0,${h}c${-b},${r1(-h * 0.3)} ${-b},${r1(-h * 0.7)} 0,${-h}z" fill="${fill}"/>`;
}

/** ケープダッチ様式の農園邸宅(白壁・曲線の破風・茅葺き)。 */
function capeDutch(x, base, w, h, wall = "#f2ede0", thatch = "#a8894e") {
  const top = r1(base - h);
  const cx = r1(x + w / 2);
  return (
    `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="${wall}"/>` +
    `<path d="M${r1(x - 6)},${top}L${cx},${r1(top - h * 0.62)}L${r1(x + w + 6)},${top}z" fill="${thatch}"/>` +
    `<g stroke="#8f7038" stroke-width="1.2" opacity=".8" fill="none"><path d="M${r1(x - 2)},${r1(top - h * 0.14)}h${r1(w + 4)}M${r1(x + 6)},${r1(top - h * 0.3)}h${r1(w - 12)}"/></g>` +
    `<path d="M${r1(cx - w * 0.17)},${top}v${r1(-h * 0.4)}q0,${r1(-h * 0.22)} ${r1(w * 0.17)},${r1(-h * 0.22)}q${r1(w * 0.17)},0 ${r1(w * 0.17)},${r1(h * 0.22)}v${r1(h * 0.4)}z" fill="${wall}"/>` +
    `<path d="M${r1(cx - w * 0.17)},${r1(top - h * 0.4)}h${r1(w * 0.34)}" stroke="#d5cdb9" stroke-width="1.6" fill="none"/>` +
    `<rect x="${r1(cx - w * 0.06)}" y="${r1(top - h * 0.5)}" width="${r1(w * 0.12)}" height="${r1(h * 0.24)}" fill="#5f7f96"/>` +
    `<path d="M${r1(cx - w * 0.08)},${base}v${r1(-h * 0.58)}h${r1(w * 0.16)}v${r1(h * 0.58)}z" fill="#4a3a24"/>` +
    `<g fill="#5f7f96">${rep(4, (i) => `<rect x="${r1(x + w * [0.1, 0.27, 0.63, 0.8][i])}" y="${r1(base - h * 0.66)}" width="${r1(w * 0.09)}" height="${r1(h * 0.4)}"/>`)}</g>` +
    `<g fill="#d5cdb9">${rep(4, (i) => `<rect x="${r1(x + w * [0.1, 0.27, 0.63, 0.8][i] - 1.2)}" y="${r1(base - h * 0.7)}" width="${r1(w * 0.09 + 2.4)}" height="2"/>`)}</g>`
  );
}

/** 葡萄の畝。 */
function vineRow(y, count, r, fill = "#4f8f3f") {
  const cy = r1(y - r - 2);
  const hw = r1(r * 2.1);
  return (
    `<path d="M4,${cy}h392" stroke="#8a8578" stroke-width="1.2" fill="none"/>` +
    rep(count, (i) => {
      const x = r1(14 + (i * 372) / (count - 1));
      return (
        `<rect x="${r1(x - 1.2)}" y="${r1(cy - r * 0.2)}" width="2.4" height="${r1(y - cy + r * 0.2)}" fill="#6b5330"/>` +
        `<path d="M${r1(x - hw)},${cy}c0,${r1(-r * 1.4)} ${r1(hw * 2)},${r1(-r * 1.4)} ${r1(hw * 2)},0c${r1(-hw * 0.4)},${r1(r * 0.55)} ${r1(-hw * 1.6)},${r1(r * 0.55)} ${r1(-hw * 2)},0z" fill="${fill}"/>`
      );
    })
  );
}

/** サトウキビの畑(縦に立つ細い茎の帯)。 */
function caneField(y, h, x0 = 0, x1 = W, fill = "#5f9a4a", tip = "#c2c98a") {
  const n = Math.floor((x1 - x0) / 7);
  // 茎を1本ずつ図形にすると1枚で100個を超える。**1本のパスにまとめる。**
  return (
    `<rect x="${x0}" y="${y}" width="${r1(x1 - x0)}" height="${h}" fill="#4f7f3a"/>` +
    `<path d="${rep(n, (i) => `M${r1(x0 + 4 + i * 7)},${r1(y + h)}v${-h}`)}" stroke="${fill}" stroke-width="3" fill="none"/>` +
    `<path d="${rep(n, (i) => `M${r1(x0 + 4 + i * 7)},${y}l${i % 2 ? 3 : -3},-5`)}" stroke="${tip}" stroke-width="2" opacity=".8" fill="none"/>`
  );
}

/** 線路。枕木とレール。 */
function rails(y, color = "#5a5248", tie = "#6b5a44") {
  return (
    `<path d="M0,${r1(y + 1.5)}h400" stroke="${tie}" stroke-width="7" stroke-dasharray="9 5" fill="none"/>` +
    `<g stroke="${color}" stroke-width="2" fill="none"><path d="M0,${y}h400M0,${r1(y + 4)}h400"/></g>`
  );
}

/** 通勤電車の客車。片道の通勤のために敷かれた鉄道。 */
function coach(x, base, w, h, body = "#c2b06a", roof = "#8f8578") {
  const n = Math.max(3, Math.round(w / 22));
  return (
    `<rect x="${x}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${body}"/>` +
    `<rect x="${r1(x - 1)}" y="${r1(base - h - 3)}" width="${r1(w + 2)}" height="3.4" rx="1.4" fill="${roof}"/>` +
    `<rect x="${x}" y="${r1(base - h * 0.34)}" width="${w}" height="${r1(h * 0.34)}" fill="#8a7a48"/>` +
    `<g fill="#5f7f8f">${rep(n, (i) => `<rect x="${r1(x + 4 + (i * (w - 8)) / n)}" y="${r1(base - h * 0.82)}" width="${r1(h * 0.4)}" height="${r1(h * 0.38)}"/>`)}</g>` +
    `<g fill="#3f4a55">${rep(4, (i) => `<circle cx="${r1(x + 10 + (i * (w - 20)) / 3)}" cy="${r1(base + 2)}" r="3"/>`)}</g>`
  );
}

/** 貨車(石炭・鉱石)。 */
function wagon(x, base, w, h, body = "#5a5248", load = "#33343a") {
  return (
    `<rect x="${x}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${body}"/>` +
    `<path d="M${r1(x + 2)},${r1(base - h)}q${r1(w / 2 - 2)},${r1(-h * 0.7)} ${r1(w - 4)},0z" fill="${load}"/>` +
    `<rect x="${x}" y="${r1(base - h * 0.4)}" width="${w}" height="1.6" fill="#3f3a34"/>` +
    `<g fill="#3f4a55"><circle cx="${r1(x + w * 0.24)}" cy="${r1(base + 2)}" r="2.6"/><circle cx="${r1(x + w * 0.76)}" cy="${r1(base + 2)}" r="2.6"/></g>`
  );
}

/** 野花の絨毯(ナマクワランド)。 */
function flowerCarpet(y0, y1, cols = 12, rows = 5) {
  return `<g>${rep(rows, (rI) => {
    const yy = r1(y0 + (rI * (y1 - y0)) / rows);
    const rr = r1(1.6 + rI * 0.5);
    return rep(cols, (i) => {
      const xx = r1(((i * 400) / cols + (rI % 2 ? 11 : 0)) % 400);
      const c = (i + rI) % 5 === 0 ? "#f6efe2" : (i + rI) % 3 === 0 ? "#f5b31c" : "#f2762a";
      return `<circle cx="${xx}" cy="${yy}" r="${rr}" fill="${c}"/>`;
    });
  })}</g>`;
}

/** 星(サザーランド)。決定性を保つため sin で散らす。 */
function stars(n, y0, y1) {
  return `<g fill="#f6efe2">${rep(n, (i) => {
    const x = r1(((Math.sin(i * 12.9898) + 1) / 2) * 400);
    const y = r1(y0 + ((Math.sin(i * 78.233) + 1) / 2) * (y1 - y0));
    const r = r1(0.6 + ((Math.sin(i * 3.14) + 1) / 2) * 1.2);
    return `<circle cx="${x}" cy="${y}" r="${r}" opacity="${r1(0.5 + r * 0.3)}"/>`;
  })}</g>`;
}

// ---------------------------------------------------------------------------
// 背景シーン(400×210)
// ---------------------------------------------------------------------------

export const SOUTHAFRICA_BG = {
  /**
   * ソウェト。**夜明けの通勤。**
   *
   * 「住む場所」から「働く場所」へ、片道を運ぶために敷かれた鉄道を描く。
   * 丘の上は同じ形の規格住宅が延々と並ぶ(繰り返しなので中央が隠れてよい)。
   * y>170 の手前には、駅へ向かう人の列を置いた。**構造を描けば伝わる。**
   */
  township:
    sky("#6f6f9c", "#f0b478", 104) +
    sun(56, 88, 14, "#f5d06a") +
    `<circle cx="56" cy="88" r="22" fill="#f8dc9a" opacity=".22"/>` +
    clouds(300, 34, 1.1, "#e8a878", ".7") +
    clouds(140, 26, 0.8, "#d8a088", ".55") +
    // オーランドの冷却塔(塗装された2本)
    coolingTower(316, 106, 62, 30, "#d8cfc0") +
    coolingTower(356, 106, 54, 26, "#c9c0b0") +
    `<g fill="#c2453c" opacity=".8"><rect x="304" y="76" width="24" height="8"/><rect x="346" y="80" width="20" height="7"/></g>` +
    `<g fill="#3f8f8a" opacity=".8"><rect x="304" y="86" width="24" height="7"/><rect x="346" y="89" width="20" height="6"/></g>` +
    // 丘
    `<path d="M0,106L70,96L150,102L230,90L310,98L400,92V150H0z" fill="#9a8a68"/>` +
    ground(104, "#a89468") +
    // 規格住宅の列(同じ形が延々と続く)
    rep(7, (i) => matchbox(r1(2 + i * 58), 120, 32, 13)) +
    rep(6, (i) => matchbox(r1(18 + i * 64), 139, 34, 14, "#c4b498", "#7f5642")) +
    // 手前の丘に建て増した小屋
    rep(4, (i) => shack(r1(10 + i * 102), 155, 38, 15, i % 2 ? "#9aa4ac" : "#a8623c", i % 2 ? "#8f6a4a" : "#8a8f96")) +
    // 通勤鉄道
    band(156, 12, "#8a7f6a") +
    rails(162) +
    coach(214, 160, 96, 22) +
    coach(316, 160, 84, 22, "#b8a45f") +
    // ホーム
    band(170, 12, "#c2b9a2") +
    `<rect x="0" y="170" width="400" height="2.6" fill="#f5b31c" opacity=".8"/>` +
    ground(182, "#9a8f78") +
    // ホームで待つ人と、駅へ向かう列(繰り返しの人影 = 毎日の片道)
    person(28, 180, 20, "#3f6b9a") +
    person(52, 181, 19, "#8a4a3c") +
    arm(52, 172, 6, -5) +
    person(346, 180, 20, "#4f7f5a") +
    person(370, 181, 18, "#6b4a7a") +
    `<g>${rep(6, (i) => person(r1(150 + i * 19), r1(198 + (i % 2) * 4), 22, ["#3f6b9a", "#8a4a3c", "#4f7f5a", "#a8763c", "#6b4a7a", "#3f7f8a"][i]))}</g>` +
    `<g fill="#4a4436">${rep(6, (i) => `<rect x="${r1(142 + i * 19)}" y="${r1(190 + (i % 2) * 4)}" width="7" height="6" rx="1"/>`)}</g>` +
    // 手前の柵と看板
    `<g fill="#6f6a5e"><rect x="0" y="188" width="3" height="22"/><rect x="34" y="188" width="3" height="22"/><rect x="0" y="190" width="37" height="2"/></g>` +
    `<g><rect x="382" y="176" width="2.6" height="26" fill="#6f6a5e"/><rect x="366" y="172" width="34" height="10" fill="#3f6b9a"/><rect x="369" y="175" width="28" height="1.6" fill="#f6efe2" opacity=".8"/></g>`,

  /**
   * 金鉱の帯(カールトンビル・ウェルコム・ゲルミストン)。
   *
   * **3つの町で同じ背景を使う。**深い立坑・同心円の計画都市・精錬所と
   * 役割は違うが、巻き上げ櫓と鉱滓の山と宿舎が並ぶ町並みは実際に似ている。
   * 手前は男女別宿舎の中庭(柵・洗濯物・水道)。
   */
  goldbelt:
    sky("#9cc0d8", "#e4dcc4", 110) +
    sun(330, 40, 15, "#f5d06a") +
    `<g fill="#e0d8bc" opacity=".55"><rect x="0" y="86" width="400" height="26"/></g>` +
    // 鉱滓の山(平頂の黄色い台形)
    mineDump(78, 112, 210, 50) +
    mineDump(300, 112, 170, 40, "#cfbf7c", "#b8a464") +
    ground(110, "#c2ac7a") +
    // 巻き上げ櫓
    headgear(56, 140, 76) +
    headgear(352, 134, 52) +
    `<rect x="24" y="126" width="46" height="14" fill="#7f8a94"/>` +
    `<rect x="24" y="126" width="46" height="3" fill="#5a6470"/>` +
    // 選鉱の建屋とベルトコンベヤー
    `<path d="M96,140L262,112h18v6L110,146z" fill="#8f8578"/>` +
    `<g fill="#6f6a5e">${rep(7, (i) => `<rect x="${r1(108 + i * 24)}" y="${r1(142 - i * 4)}" width="3" height="${r1(10 + i * 2)}"/>`)}</g>` +
    `<rect x="266" y="98" width="34" height="24" fill="#9a917c"/>` +
    `<rect x="266" y="98" width="34" height="3.4" fill="#6f6a5e"/>` +
    // 宿舎(同じ窓と扉が延々と続く)
    hostelBlock(112, 152, 132, 24) +
    hostelBlock(258, 150, 108, 22, "#b0a68f") +
    ground(152, "#b39a62") +
    // 柵(閉鎖コンパウンドから受け継がれた形)
    fence(0, 400, 176, 22) +
    ground(178, "#a8905a") +
    // 中庭 — 洗濯物と水道
    `<g stroke="#8a8578" stroke-width="1.4" fill="none"><path d="M6,184q46,6 92,0"/></g>` +
    `<g>${rep(5, (i) => `<rect x="${r1(12 + i * 18)}" y="${r1(185 + (i === 2 ? 2 : 0))}" width="12" height="15" fill="${["#3f6b9a", "#c2453c", "#f6efe2", "#4f7f5a", "#a8763c"][i]}"/>`)}</g>` +
    `<g><rect x="330" y="182" width="3" height="20" fill="#7f8a94"/><path d="M326,182h11l-2,-4h-7z" fill="#5a6470"/><ellipse cx="331" cy="203" rx="12" ry="4" fill="#7f96a8" opacity=".7"/></g>` +
    person(302, 202, 24, "#4f6b8a") +
    arm(302, 190, 12, 6) +
    person(360, 200, 22, "#8a4a3c") +
    // 手前の鉱石の塊(地面より2段暗く)
    `<g fill="#8f7a4a"><path d="M120,206l10,-8l12,3l4,9z"/><path d="M150,210l8,-6l10,2l2,6z"/><path d="M96,210l7,-5l9,2l1,5z"/></g>`,

  /**
   * プレトリア。**紫の並木道と、丘の上の官庁。**
   * 手前の路面に散った花を敷いて、季節を出す。
   */
  jacaranda:
    sky("#8fc4e8", "#dbe8f0", 112) +
    clouds(80, 30, 1.1) +
    clouds(330, 24, 0.8) +
    // 丘とユニオン・ビルディングス
    `<path d="M0,120L60,110L140,104L230,100L310,106L400,116V150H0z" fill="#8f9a68"/>` +
    ground(112, "#94a05f") +
    `<g fill="#e0d2b4"><rect x="252" y="76" width="132" height="34"/><rect x="268" y="66" width="28" height="12"/><rect x="342" y="66" width="28" height="12"/></g>` +
    `<g fill="#a8763c"><rect x="248" y="72" width="140" height="5"/><path d="M264,66h36l-6,-8h-24z"/><path d="M338,66h36l-6,-8h-24z"/></g>` +
    `<g fill="#c9bc9c">${rep(9, (i) => `<rect x="${r1(258 + i * 14)}" y="82" width="5" height="24"/>`)}</g>` +
    `<g fill="#7f6a48">${rep(9, (i) => `<rect x="${r1(258 + i * 14)}" y="80" width="5" height="2.4"/>`)}</g>` +
    `<path d="M300,76h36v-8a18,18 0 0 0 -36,0z" fill="#c2603c"/>` +
    `<rect x="316" y="52" width="2" height="10" fill="#8a7f66"/>` +
    // 円形広場の階段
    `<g fill="#cfc7b4">${rep(4, (i) => `<path d="M${r1(268 + i * 6)},${r1(110 + i * 5)}h${r1(104 - i * 12)}v4h${r1(-104 + i * 12)}z"/>`)}</g>` +
    // 並木道(繰り返しなので中央が隠れてよい)
    band(150, 14, "#a89a72") +
    band(164, 46, "#5f5a52") +
    `<g stroke="#f6efe2" stroke-width="3" stroke-dasharray="16 18" opacity=".6" fill="none"><path d="M0,188h400"/></g>` +
    `<g>${rep(7, (i) => {
      const x = r1(14 + i * 62);
      return (
        `<rect x="${r1(x - 2.4)}" y="128" width="4.8" height="24" fill="#6b5330"/>` +
        `<circle cx="${x}" cy="${r1(118 + (i % 2) * 4)}" r="${r1(16 - (i % 3))}" fill="#8a7ab8"/>` +
        `<circle cx="${r1(x - 9)}" cy="${r1(126 + (i % 2) * 3)}" r="9" fill="#7a6aa8"/>` +
        `<circle cx="${r1(x + 10)}" cy="${r1(125 + (i % 2) * 3)}" r="8.4" fill="#9a8ac4"/>`
      );
    })}</g>` +
    // 手前の家と、路面に散った花
    `<rect x="6" y="140" width="70" height="24" fill="#e0d2b4"/>` +
    `<path d="M0,140h82l-10,-12H10z" fill="#8f5642"/>` +
    `<g fill="#5f7f96"><rect x="16" y="146" width="12" height="14"/><rect x="52" y="146" width="12" height="14"/></g>` +
    `<g fill="#8a7ab8">${rep(26, (i) => `<circle cx="${r1(((i * 71) % 400) + 4)}" cy="${r1(168 + ((i * 37) % 40))}" r="${r1(1.8 + (i % 3) * 0.7)}"/>`)}</g>` +
    `<g fill="#6f5f9c" opacity=".7"><ellipse cx="96" cy="198" rx="30" ry="6"/><ellipse cx="290" cy="204" rx="36" ry="6"/></g>` +
    person(348, 176, 22, "#f6efe2") +
    person(366, 177, 20, "#3f6b9a"),

  /**
   * ブルームフォンテーン。**石造りの最高上訴裁判所と、右手の小さな集会所。**
   * 1912年、その集会所で運動が生まれた。**大きい建物より、小さい建物のほうが
   * 話の中心**なので、右3分の1に置いて隠れないようにしてある。
   */
  judicialcapital:
    sky("#9cc8e4", "#e0e8e4", 118) +
    clouds(210, 28, 0.9) +
    clouds(52, 22, 0.7) +
    hills(120, "#8f9a72", 4) +
    ground(118, "#a8a068") +
    // 裁判所(列柱とペディメント)
    `<rect x="16" y="76" width="150" height="66" fill="#e4ddc9"/>` +
    `<path d="M8,76h166L91,44z" fill="#cfc7b4"/>` +
    `<path d="M16,74h150v4H16z" fill="#b8ae98"/>` +
    `<g fill="#c9bc9c">${rep(6, (i) => `<rect x="${r1(26 + i * 24)}" y="82" width="12" height="52"/>`)}</g>` +
    `<g fill="#b8ae98">${rep(6, (i) => `<rect x="${r1(24 + i * 24)}" y="80" width="16" height="3.4"/>`)}</g>` +
    `<g fill="#a29881">${rep(6, (i) => `<rect x="${r1(24 + i * 24)}" y="130" width="16" height="3.4"/>`)}</g>` +
    `<path d="M78,142v-16a13,13 0 0 1 26,0v16z" fill="#5a4630"/>` +
    `<g fill="#cfc7b4">${rep(4, (i) => `<path d="M${r1(10 + i * 4)},${r1(142 + i * 5)}h${r1(162 - i * 8)}v4h${r1(-162 + i * 8)}z"/>`)}</g>` +
    // 天秤の意匠(切妻)
    `<g stroke="#8f8578" stroke-width="1.6" fill="none"><path d="M91,54v10M78,60h26"/></g>` +
    `<g fill="#8f8578"><path d="M74,60l-4,6h8z"/><path d="M108,60l-4,6h8z"/></g>` +
    // 小さな煉瓦の集会所(ワイフック)
    `<rect x="288" y="106" width="82" height="38" fill="#a8563c"/>` +
    `<g stroke="#8f4630" stroke-width="1" opacity=".7" fill="none">${rep(4, (i) => `<path d="M288,${r1(112 + i * 8)}h82"/>`)}</g>` +
    `<path d="M282,106h94l-16,-16h-62z" fill="#7f8a94"/>` +
    `<rect x="322" y="122" width="14" height="22" fill="#4a3a24"/>` +
    `<g fill="#5f7f96"><rect x="298" y="118" width="10" height="14"/><rect x="350" y="118" width="10" height="14"/></g>` +
    `<rect x="328" y="82" width="2.4" height="10" fill="#8f8578"/>` +
    // 手前
    ground(150, "#a8a068") +
    `<g stroke="#8f9a52" stroke-width="2" opacity=".5" fill="none"><path d="M0,166q100,-8 200,0t200,0M0,186q100,-8 200,0t200,0"/></g>` +
    poplar(252, 152, 44) +
    poplar(268, 152, 56) +
    poplar(284, 152, 38) +
    person(58, 186, 26, "#2f3a4a") +
    person(84, 188, 24, "#6b4a7a") +
    arm(84, 174, 10, 4) +
    person(330, 184, 24, "#8a4a3c") +
    `<g fill="#8f7a4a"><path d="M240,208l12,-9l14,4l3,10z"/><path d="M266,210l9,-6l10,3l1,6z"/></g>`,

  /**
   * クロンスタッド。**曇天の操車場と、右手の記念地。**
   * 分岐する線路が補給を運び、同じ位置が収容所を呼び寄せた。
   * 白い小さな標石を並べる(数の多さがそのまま意味になる)。
   */
  concentrationcamp:
    sky("#93a4b0", "#c4ccce", 112) +
    `<g fill="#a8b0b4" opacity=".7"><ellipse cx="90" cy="40" rx="54" ry="14"/><ellipse cx="286" cy="30" rx="62" ry="12"/><ellipse cx="196" cy="56" rx="48" ry="10"/></g>` +
    ground(110, "#9a9068") +
    `<path d="M0,124L80,116L170,120L260,112L340,118L400,112V140H0z" fill="#8a8560"/>` +
    // 給水塔と信号
    `<g fill="#6f6a5e"><rect x="34" y="96" width="5" height="42"/><rect x="62" y="96" width="5" height="42"/><rect x="30" y="132" width="41" height="4"/></g>` +
    `<rect x="26" y="72" width="50" height="26" rx="3" fill="#7f8a94"/>` +
    `<rect x="24" y="68" width="54" height="6" rx="2" fill="#5a6470"/>` +
    `<path d="M46,138v10h10v-10z" fill="#5a5248"/>` +
    `<g><rect x="352" y="86" width="3.4" height="46" fill="#5a5248"/><rect x="344" y="86" width="20" height="12" fill="#3f4a55"/><circle cx="349" cy="92" r="3" fill="#c2453c"/><circle cx="359" cy="92" r="3" fill="#5f9a4a"/></g>` +
    // 操車場(分岐する線路)
    band(132, 22, "#8a8272") +
    rails(140) +
    `<g stroke="#5a5248" stroke-width="2" fill="none"><path d="M0,150L400,128M0,156L400,136"/></g>` +
    `<g stroke="#5a5248" stroke-width="1.6" fill="none"><path d="M120,150L400,150M120,156L400,158"/></g>` +
    wagon(150, 130, 40, 16, "#6b6459", "#4a4436") +
    wagon(196, 130, 40, 16, "#6b6459", "#4a4436") +
    ground(158, "#94906c") +
    // 記念地(右) — 低い石垣と白い標石の列
    `<rect x="252" y="164" width="148" height="4" fill="#b8ae98"/>` +
    `<g fill="#e8e4d8">${rep(9, (i) => `<path d="M${r1(258 + i * 16)},176v-8a3.4,3.4 0 0 1 6.8,0v8z"/>`)}</g>` +
    `<g fill="#e8e4d8">${rep(8, (i) => `<path d="M${r1(266 + i * 16)},190v-9a3.8,3.8 0 0 1 7.6,0v9z"/>`)}</g>` +
    `<g fill="#e8e4d8">${rep(7, (i) => `<path d="M${r1(274 + i * 17)},206v-10a4.2,4.2 0 0 1 8.4,0v10z"/>`)}</g>` +
    `<g fill="#000" opacity=".12">${rep(7, (i) => `<ellipse cx="${r1(278 + i * 17)}" cy="207" rx="6" ry="2"/>`)}</g>` +
    poplar(240, 168, 46, "#4f6b44") +
    // 手前(左) — バラストと転轍てこ
    `<g fill="#7f7a6e">${rep(22, (i) => `<circle cx="${r1(6 + i * 10)}" cy="${r1(176 + ((i * 29) % 26))}" r="${r1(1.8 + (i % 3))}"/>`)}</g>` +
    `<g><rect x="60" y="178" width="26" height="5" rx="2" fill="#5a5248"/><path d="M84,182l14,-20" stroke="#8f5642" stroke-width="4" stroke-linecap="round" fill="none"/><circle cx="98" cy="162" r="4" fill="#c2453c"/></g>` +
    person(28, 200, 26, "#4a4436") +
    `<g fill="#7f8a5a"><path d="M136,210q6,-14 12,0z"/><path d="M172,210q5,-11 10,0z"/></g>`,

  /**
   * クラレンス。**夕陽の砂岩。**
   * 含まれる酸化鉄で岩肌が金色に燃える。谷底の村はトタン屋根。
   * 一番明るいのは崖なので、建物は2段落とす。
   */
  goldencliffs:
    sky("#e8a45c", "#f2d09a", 96) +
    sun(72, 46, 18, "#f8dc9a") +
    `<circle cx="72" cy="46" r="28" fill="#f8dc9a" opacity=".25"/>` +
    clouds(292, 36, 1.2, "#e8b878", ".8") +
    // 遠い稜線
    `<path d="M0,96L70,74L150,90L240,68L330,86L400,76V120H0z" fill="#a8764a"/>` +
    ground(94, "#c98f52") +
    // 砂岩の崖(大きな面を斜めに切って明暗を分ける)
    `<path d="M0,150V104L44,88L96,100L150,84L210,98L268,82L330,96L400,86V150z" fill="#d8873c"/>` +
    `<path d="M0,150V126L44,110L96,122L150,106L210,120L268,104L330,118L400,108V150z" fill="#c26f30"/>` +
    `<path d="M96,100L150,84L210,98L180,150H120z" fill="#e8a052" opacity=".7"/>` +
    `<g stroke="#a8562c" stroke-width="1.6" opacity=".7" fill="none"><path d="M28,104l6,32M118,92l-8,36M262,88l10,34M348,98l-6,28"/></g>` +
    `<g stroke="#f0b878" stroke-width="1.4" opacity=".6" fill="none"><path d="M64,96l-4,26M212,102l6,24M310,104l-5,22"/></g>` +
    ground(148, "#8f9a5a") +
    // 谷底の村
    `<rect x="18" y="130" width="50" height="20" fill="#c9bc9c"/>` +
    `<path d="M12,130h62l-8,-11H20z" fill="#8f4a3c"/>` +
    `<g fill="#5f7f96"><rect x="26" y="136" width="10" height="10"/><rect x="50" y="136" width="10" height="10"/></g>` +
    `<rect x="86" y="136" width="38" height="14" fill="#b8ae98"/>` +
    `<path d="M82,136h46l-6,-9H88z" fill="#6f7f8a"/>` +
    `<rect x="300" y="128" width="56" height="22" fill="#c2b49c"/>` +
    `<path d="M294,128h68l-9,-12h-50z" fill="#8f4a3c"/>` +
    `<g fill="#5f7f96"><rect x="308" y="134" width="11" height="12"/><rect x="336" y="134" width="11" height="12"/></g>` +
    `<rect x="366" y="120" width="4" height="30" fill="#8a8578"/>` +
    // 手前の牧草地とポプラ
    ground(158, "#7f9a52") +
    `<g stroke="#6b8a44" stroke-width="2" opacity=".55" fill="none"><path d="M0,174q100,-8 200,0t200,0M0,196q100,-8 200,0t200,0"/></g>` +
    poplar(244, 160, 52, "#c9a84a") +
    poplar(260, 160, 62, "#b8a44a") +
    poplar(276, 160, 44, "#c9b45a") +
    `<g fill="#f6efe2"><ellipse cx="56" cy="184" rx="11" ry="7"/><ellipse cx="49" cy="180" rx="5" ry="4"/><ellipse cx="61" cy="179" rx="5" ry="4"/></g>` +
    `<g fill="#4a4436"><ellipse cx="67" cy="181" rx="4" ry="3.4"/><rect x="50" y="189" width="2.2" height="6"/><rect x="60" y="189" width="2.2" height="6"/></g>` +
    person(330, 190, 26, "#c2453c") +
    arm(330, 176, 11, -6) +
    `<g fill="#6f7f42"><path d="M240,210q8,-18 16,0z"/><path d="M272,210q6,-14 12,0z"/><path d="M300,210q7,-15 14,0z"/></g>` +
    // 石積みの塀と、崖のギャラリーの看板(手前)
    `<rect x="0" y="176" width="120" height="10" fill="#c2b088"/>` +
    `<g stroke="#a89460" stroke-width="1.4" fill="none"><path d="M20,176v10M46,176v10M72,176v10M98,176v10M0,181h120"/></g>` +
    `<g><rect x="128" y="182" width="4" height="26" fill="#7f6a48"/><rect x="108" y="170" width="46" height="14" fill="#4f6b8a"/>` +
    `<rect x="112" y="174" width="38" height="2" fill="#f6efe2" opacity=".8"/><rect x="112" y="179" width="26" height="2" fill="#f6efe2" opacity=".6"/></g>` +
    aloe(214, 202, 18) +
    aloe(374, 196, 15) +
    // 荷馬車
    `<g><rect x="248" y="176" width="46" height="14" rx="2" fill="#8a6f4a"/><rect x="248" y="176" width="46" height="4" fill="#6b5330"/>` +
    `<g fill="#5f4f34"><circle cx="258" cy="192" r="7"/><circle cx="286" cy="192" r="7"/></g>` +
    `<g fill="#8a6f4a"><circle cx="258" cy="192" r="2.4"/><circle cx="286" cy="192" r="2.4"/></g>` +
    `<path d="M294,180l14,-4" stroke="#6b5330" stroke-width="2.4" fill="none"/></g>`,

  /**
   * 包囲された町(マヒケン・レディスミス)。
   * 土嚢の胸壁が町をぐるりと囲い、見張り塔が立つ。埃っぽい真昼。
   */
  siegetown:
    sky("#c2c8b8", "#e0dcc4", 114) +
    sun(300, 44, 16, "#f5d88a") +
    `<g fill="#d8d0b4" opacity=".6"><rect x="0" y="88" width="400" height="28"/></g>` +
    hills(116, "#9a9270", 4) +
    ground(112, "#c2b483") +
    // 町(低いトタン屋根)
    `<g>${rep(8, (i) => {
      const x = r1(96 + i * 30);
      const h = 18 + (i % 3) * 5;
      return (
        `<rect x="${x}" y="${r1(134 - h)}" width="24" height="${h}" fill="${i % 2 ? "#cfc0a4" : "#c2b49c"}"/>` +
        `<path d="M${r1(x - 3)},${r1(134 - h)}h30l-3,-5h-24z" fill="${i % 3 ? "#8f6a4a" : "#7f8a94"}"/>` +
        `<rect x="${r1(x + 8)}" y="${r1(140 - h)}" width="8" height="9" fill="#5f6b76"/>`
      );
    })}</g>` +
    `<g><rect x="308" y="86" width="3" height="24" fill="#8f8578"/><path d="M298,94h26l-6,10h-14z" fill="#c9bc9c"/><path d="M292,110h34v6h-34z" fill="#a8967c"/></g>` +
    // 見張り塔(左)
    `<g fill="#8a6f4a"><path d="M26,140L34,84h14l8,56z"/><rect x="24" y="82" width="34" height="4"/></g>` +
    `<g stroke="#6b5330" stroke-width="1.8" fill="none"><path d="M29,120h24M31,104h20M33,92h16M30,112l22,-8M52,112l-22,-8"/></g>` +
    `<rect x="22" y="70" width="38" height="14" fill="#a8894e"/>` +
    `<path d="M18,70h46l-8,-8h-30z" fill="#7f6a48"/>` +
    person(40, 82, 15, "#8a7f5a") +
    `<g><rect x="60" y="52" width="2" height="20" fill="#6b5330"/><path d="M62,52h22l-5,5l5,5H62z" fill="#c2453c"/></g>` +
    // 電信柱
    `<g fill="#7f6a48"><rect x="266" y="96" width="3" height="42"/><rect x="258" y="96" width="19" height="2.4"/><rect x="344" y="102" width="3" height="34"/><rect x="337" y="102" width="17" height="2.2"/></g>` +
    `<path d="M0,92q134,14 267,6t133,4" stroke="#7f6a48" stroke-width="1" fill="none"/>` +
    ground(138, "#b8a878") +
    // 塹壕と土嚢の胸壁(手前)
    `<path d="M0,178L60,164L140,176L220,162L300,174L400,166V210H0z" fill="#a8956a"/>` +
    `<path d="M0,186L60,172L140,184L220,170L300,182L400,174V210H0z" fill="#8f7f52"/>` +
    `<g fill="#c2b088">${rep(13, (i) => `<ellipse cx="${r1(12 + i * 31)}" cy="${r1(176 - (i % 3) * 5)}" rx="16" ry="7"/>`)}</g>` +
    `<g fill="#a89460">${rep(12, (i) => `<ellipse cx="${r1(28 + i * 31)}" cy="${r1(188 - (i % 3) * 4)}" rx="16" ry="7"/>`)}</g>` +
    `<g stroke="#8f7f52" stroke-width="1" opacity=".7" fill="none">${rep(13, (i) => `<path d="M${r1(12 + i * 31)},${r1(169 - (i % 3) * 5)}v14"/>`)}</g>` +
    // 手前の塹壕にいる人
    person(52, 206, 24, "#8a7f5a") +
    arm(52, 194, 12, -8) +
    person(330, 208, 22, "#7f6a48") +
    `<g fill="#5a5248"><rect x="336" y="188" width="26" height="3" rx="1.4"/><circle cx="366" cy="192" r="4"/></g>`,

  /**
   * ラステンバーグ。**白金の帯。**
   * 岩脈に沿って巻き上げ櫓が一直線に並ぶ。赤土とアカシア。
   */
  platinumbelt:
    sky("#8fc0e0", "#dfe8e0", 112) +
    clouds(70, 30, 1.1) +
    clouds(300, 24, 0.85) +
    // マガリースバーグの尾根
    `<path d="M0,116L70,92L160,104L250,88L340,100L400,92V140H0z" fill="#7f8a68"/>` +
    `<path d="M0,124L70,104L160,114L250,100L340,110L400,104V140H0z" fill="#6b7a56"/>` +
    ground(112, "#a8825c") +
    // 岩脈に沿って並ぶ櫓(繰り返し = 帯であることが分かる)
    headgear(48, 138, 56) +
    headgear(146, 132, 44) +
    headgear(238, 130, 40) +
    headgear(330, 136, 50) +
    `<g fill="#8f897e"><rect x="26" y="126" width="34" height="12"/><rect x="128" y="124" width="26" height="9"/><rect x="312" y="126" width="30" height="11"/></g>` +
    // ベルトコンベヤーと選鉱の建屋
    `<path d="M60,128L360,116v6L60,134z" fill="#7f8a94" opacity=".9"/>` +
    `<g fill="#6f6a5e">${rep(9, (i) => `<rect x="${r1(72 + i * 34)}" y="${r1(132 - i * 1.4)}" width="3" height="${r1(10 + i)}"/>`)}</g>` +
    `<rect x="356" y="98" width="40" height="26" fill="#9a917c"/>` +
    `<rect x="356" y="98" width="40" height="3.4" fill="#6f6a5e"/>` +
    ground(140, "#b08454") +
    `<g stroke="#96703f" stroke-width="2" opacity=".55" fill="none"><path d="M0,152q100,-6 200,0t200,0M0,168q100,-6 200,0t200,0"/></g>` +
    // 赤土の道と運搬トラック(手前・右)
    `<path d="M400,210L260,158h48l92,34z" fill="#96703f"/>` +
    `<g><rect x="286" y="176" width="62" height="22" rx="2" fill="#f5b31c"/><path d="M348,176h26l10,14v8h-36z" fill="#e0a015"/>` +
    `<path d="M290,180h54v12h-54z" fill="#7f6a48"/><rect x="356" y="180" width="18" height="9" fill="#5f7f96"/>` +
    `<g fill="#3f3a34"><circle cx="304" cy="200" r="9"/><circle cx="342" cy="200" r="9"/><circle cx="372" cy="200" r="8"/></g>` +
    `<g fill="#7f7a6e"><circle cx="304" cy="200" r="3.4"/><circle cx="342" cy="200" r="3.4"/><circle cx="372" cy="200" r="3"/></g></g>` +
    // 手前左のアカシア
    acacia(40, 200, 42) +
    acacia(96, 190, 28) +
    `<g fill="#8f7040"><path d="M138,210l12,-8l13,3l3,5z"/><path d="M170,210l9,-6l10,2l1,4z"/></g>` +
    person(206, 204, 24, "#3f6b9a"),

  /**
   * サンシティ。**夜。見せかけの国境の検問所と、その向こうのカジノの明かり。**
   * 手前(左)にゲート、右にドームの明かり。**構造を描けば伝わる。**
   */
  fakeborder:
    sky("#1f2a4a", "#3f4a72", 128) +
    stars(26, 6, 76) +
    `<circle cx="72" cy="34" r="11" fill="#f2ecd4" opacity=".9"/>` +
    `<circle cx="68" cy="31" r="9" fill="#3f4a72"/>` +
    hills(130, "#2f3a52", 4) +
    ground(126, "#3a4038") +
    // カジノ(右)
    `<rect x="256" y="80" width="132" height="46" fill="#6b4a3c"/>` +
    `<g fill="#8a5f42"><rect x="268" y="62" width="34" height="18"/><rect x="336" y="58" width="38" height="22"/></g>` +
    `<g fill="#a8763c"><path d="M264,62h42l-21,-18z"/><path d="M330,58h50l-25,-20z"/><path d="M250,80h144l-14,-10H264z"/></g>` +
    `<g fill="#f5d06a">${rep(11, (i) => `<rect x="${r1(262 + i * 12)}" y="94" width="7" height="10"/>`)}</g>` +
    `<g fill="#f5b31c">${rep(9, (i) => `<rect x="${r1(268 + i * 14)}" y="112" width="8" height="14"/>`)}</g>` +
    `<g fill="#f8e8a8" opacity=".85"><circle cx="285" cy="44" r="3"/><circle cx="355" cy="38" r="3.4"/></g>` +
    `<g fill="#f5d06a" opacity=".2"><ellipse cx="320" cy="104" rx="90" ry="40"/></g>` +
    // 投光器
    `<g fill="#c9bc9c"><rect x="122" y="66" width="3" height="60"/><rect x="116" y="60" width="15" height="8"/></g>` +
    `<path d="M131,64L216,30l6,16z" fill="#f5d06a" opacity=".22"/>` +
    // 椰子
    datePalm(78, 128, 44) +
    datePalm(392, 128, 38) +
    // 道と検問所(左)
    `<path d="M0,210L120,128h56L120,210z" fill="#3f4048"/>` +
    `<g stroke="#f0e8c8" stroke-width="3" stroke-dasharray="12 14" opacity=".5" fill="none"><path d="M148,130L44,210"/></g>` +
    `<rect x="14" y="120" width="46" height="34" fill="#5f5a52"/>` +
    `<path d="M8,120h58l-8,-10H16z" fill="#7f8a94"/>` +
    `<rect x="24" y="128" width="26" height="16" fill="#f5d06a"/>` +
    `<rect x="24" y="128" width="26" height="16" fill="none" stroke="#3f3a34" stroke-width="1.4"/>` +
    `<g><rect x="64" y="140" width="4" height="24" fill="#8f8578"/><path d="M66,146h96v7H66z" fill="#c2453c"/>` +
    `<g fill="#f6efe2">${rep(4, (i) => `<rect x="${r1(78 + i * 22)}" y="146" width="11" height="7"/>`)}</g></g>` +
    `<g><rect x="76" y="96" width="3" height="26" fill="#8f8578"/><rect x="52" y="80" width="52" height="18" rx="2" fill="#2f5f4a"/>` +
    `<rect x="56" y="84" width="44" height="2.4" fill="#f6efe2" opacity=".8"/><rect x="56" y="90" width="30" height="2.4" fill="#f6efe2" opacity=".6"/></g>` +
    // 順番待ちの車(手前)
    `<g><path d="M170,206h72l-6,-16h-18l-8,-10h-26l-8,10h-12z" fill="#8a4a3c"/>` +
    `<path d="M186,190h34l-6,-8h-22z" fill="#5f7f96"/>` +
    `<g fill="#2f2a24"><circle cx="188" cy="206" r="7"/><circle cx="230" cy="206" r="7"/></g>` +
    `<g fill="#f8e8a8"><ellipse cx="248" cy="196" rx="5" ry="3.4"/></g>` +
    `<path d="M254,196L330,182l4,18z" fill="#f8e8a8" opacity=".25"/></g>` +
    `<g fill="#c2453c" opacity=".9"><circle cx="166" cy="200" r="3"/></g>`,

  /**
   * クルーガーの玄関口(ムボンベラ・スクザ)。
   * 茅葺きと低木のブッシュフェルト。手前は赤土の道と停車場。
   */
  krugergate:
    sky("#8fc4e8", "#dfe8d8", 106) +
    sun(324, 36, 15, "#f5d88a") +
    clouds(96, 28, 1) +
    `<path d="M0,110L70,88L150,102L240,84L330,100L400,90V132H0z" fill="#7f96a8" opacity=".75"/>` +
    ground(104, "#8f9a5c") +
    hills(120, "#6f8a4a", 5) +
    ground(122, "#9a9a56") +
    // 茅葺きの大屋根(ターミナル/休憩キャンプ)
    `<path d="M40,144V128h96v16z" fill="#e0d2b4"/>` +
    `<path d="M20,128h136L88,86z" fill="#a8894e"/>` +
    `<g stroke="#8f7038" stroke-width="1.2" opacity=".75" fill="none"><path d="M34,120h108M46,110h84M58,100h60"/></g>` +
    `<rect x="86" y="80" width="3" height="8" fill="#7f6a48"/>` +
    `<g fill="#5f7f96"><rect x="54" y="132" width="14" height="12"/><rect x="108" y="132" width="14" height="12"/></g>` +
    `<path d="M78,144v-13h20v13z" fill="#4a3a24"/>` +
    // 小さなロンダベル(繰り返し・中央でよい)
    rondavelHut(178, 146, 15) +
    rondavelHut(214, 144, 13) +
    rondavelHut(248, 147, 16) +
    // アカシアと低木
    acacia(300, 140, 40) +
    acacia(348, 134, 30) +
    acacia(376, 144, 24) +
    ground(148, "#a8935a") +
    `<g fill="#5f7f42"><ellipse cx="34" cy="156" rx="18" ry="7"/><ellipse cx="140" cy="158" rx="14" ry="6"/><ellipse cx="290" cy="160" rx="16" ry="6"/><ellipse cx="378" cy="156" rx="13" ry="5"/></g>` +
    // 赤土の道(手前)
    `<path d="M0,210L146,156h60L118,210z" fill="#a8603c"/>` +
    `<g stroke="#96522f" stroke-width="2" opacity=".6" fill="none"><path d="M156,158L36,210M186,158L96,210"/></g>` +
    // 停車場の標識と柵(左手前)
    `<g><rect x="20" y="168" width="4" height="34" fill="#7f6a48"/><rect x="0" y="160" width="52" height="14" fill="#3f6b4a"/>` +
    `<rect x="4" y="164" width="44" height="2.4" fill="#f6efe2" opacity=".85"/></g>` +
    `<g fill="#7f6a48">${rep(5, (i) => `<rect x="${r1(232 + i * 34)}" y="180" width="4" height="24"/>`)}</g>` +
    `<g stroke="#7f6a48" stroke-width="2.4" fill="none"><path d="M232,186h140M232,196h140"/></g>` +
    acacia(84, 200, 34) +
    `<g fill="#6f8f4a"><path d="M200,210q10,-20 20,0z"/><path d="M330,210q8,-16 16,0z"/></g>`,

  /**
   * グラスコップ。**崖の裂け目(神の窓)。**
   * 左右の岩壁で切り取り、その間からはるか下のローフェルドを見せる。
   * 靄の帯を重ねて、700mの落差を出す。
   */
  escarpmentview:
    sky("#7fb4dc", "#cfe0ea", 132) +
    clouds(220, 26, 0.9) +
    // はるか下の低地(靄の帯を3枚重ねる)
    `<path d="M96,132L150,110L200,124L250,106L304,132z" fill="#8fa8b4" opacity=".8"/>` +
    band(122, 12, "#a8bcc2") +
    band(132, 12, "#93a8ae") +
    ground(142, "#7f948f") +
    `<g fill="#f0f4f6" opacity=".55"><ellipse cx="180" cy="130" rx="80" ry="7"/><ellipse cx="286" cy="140" rx="70" ry="6"/><ellipse cx="110" cy="146" rx="60" ry="6"/></g>` +
    `<g fill="#6b8478" opacity=".8"><path d="M100,152q30,-16 60,0zM212,156q34,-18 68,0zM320,150q26,-14 52,0z"/></g>` +
    // 左の岩壁
    `<path d="M0,0h116l-14,44l10,38l-18,42l16,40l-22,46H0z" fill="#7f6a58"/>` +
    `<path d="M0,0h84l-10,42l8,38l-14,44l12,40l-16,46H0z" fill="#96806c"/>` +
    `<g stroke="#5f4f42" stroke-width="1.8" opacity=".7" fill="none"><path d="M28,14l10,52M62,40l-8,44M14,96l16,54M78,120l-10,42"/></g>` +
    `<g fill="#4f7f42"><ellipse cx="104" cy="52" rx="16" ry="8"/><ellipse cx="88" cy="118" rx="14" ry="7"/><ellipse cx="110" cy="176" rx="18" ry="8"/></g>` +
    // 右の岩壁
    `<path d="M400,0h-92l12,40l-10,40l16,44l-14,40l18,46h70z" fill="#7f6a58"/>` +
    `<path d="M400,0h-64l10,40l-8,40l14,44l-12,40l16,46h44z" fill="#8f7a66"/>` +
    `<g stroke="#5f4f42" stroke-width="1.8" opacity=".7" fill="none"><path d="M368,20l-8,50M336,54l10,44M384,104l-14,52M322,132l12,40"/></g>` +
    `<g fill="#4f7f42"><ellipse cx="308" cy="70" rx="15" ry="7"/><ellipse cx="326" cy="140" rx="16" ry="7"/><ellipse cx="300" cy="188" rx="18" ry="8"/></g>` +
    // 展望デッキ(手前・左)
    `<path d="M0,196h150v14H0z" fill="#6b5330"/>` +
    `<g stroke="#8a6f4a" stroke-width="2" opacity=".8" fill="none">${rep(6, (i) => `<path d="M${r1(10 + i * 24)},196v14"/>`)}</g>` +
    `<g fill="#5a5248"><rect x="0" y="166" width="150" height="3.4"/><rect x="0" y="180" width="150" height="2.6"/>${rep(5, (i) => `<rect x="${r1(12 + i * 32)}" y="166" width="3.4" height="30"/>`)}</g>` +
    person(52, 196, 28, "#c2453c") +
    arm(52, 180, 14, -10) +
    person(104, 196, 26, "#3f6b9a") +
    // 崖にとまる鳥
    `<path d="M254,64c8,-5 15,-6 19,-1c4,-5 11,-4 19,1c-8,-1 -15,2 -19,4c-4,-2 -11,-5 -19,-4z" fill="#4a4436" opacity=".85"/>` +
    `<path d="M186,88c6,-4 11,-4 14,-1c3,-4 8,-3 14,1c-6,-1 -11,1 -14,3c-3,-2 -8,-4 -14,-3z" fill="#4a4436" opacity=".7"/>` +
    // はるか下を蛇行する川と、低地の集落
    `<g stroke="#a8c4cc" stroke-width="2.4" opacity=".7" fill="none"><path d="M110,158q34,-10 62,4t70,-2q34,-8 62,6"/></g>` +
    `<g fill="#5f5a4a" opacity=".7">${rep(5, (i) => `<rect x="${r1(146 + i * 26)}" y="${r1(146 - (i % 2) * 3)}" width="7" height="${r1(5 + (i % 2) * 3)}"/>`)}</g>` +
    // 渓谷縁の交易所(手前・右)
    `<g><path d="M280,196h108v14H280z" fill="#8a6f4a"/><path d="M272,196h124l-12,-14h-100z" fill="#c2453c"/>` +
    `<g fill="#f2ede0"><rect x="292" y="182" width="10" height="14"/><rect x="316" y="182" width="10" height="14"/><rect x="340" y="182" width="10" height="14"/><rect x="364" y="182" width="10" height="14"/></g>` +
    `<g fill="#f5b31c"><rect x="286" y="200" width="14" height="8"/><rect x="308" y="200" width="14" height="8"/></g>` +
    `<g fill="#3f6b9a"><rect x="332" y="200" width="14" height="8"/><rect x="354" y="200" width="14" height="8"/></g></g>` +
    person(246, 208, 26, "#f5b31c") +
    `<g fill="#4f7f42"><path d="M172,210q10,-22 20,0z"/><path d="M214,210q7,-16 14,0z"/></g>`,

  /**
   * 石炭産業(エマラレニ・リチャーズベイ)。
   * 川上(採掘・地下火災)と川下(積み出し)の共通の景色 —
   * 積み上げた石炭・冷却塔・煙。手前の地割れから、地下の火の煙が漏れる。
   */
  coalindustry:
    sky("#a8a08a", "#d8cbaa", 128) +
    sun(80, 46, 15, "#f0b060") +
    `<g fill="#c2b89a" opacity=".6"><rect x="0" y="80" width="400" height="34"/></g>` +
    // 冷却塔と煙突
    coolingTower(60, 130, 66, 42, "#a8a49a") +
    coolingTower(112, 130, 54, 34, "#b0aca2") +
    steam(62, 62, 1.1, "#e0dcd0", ".75") +
    steam(114, 74, 0.8, "#e0dcd0", ".6") +
    `<g fill="#8f897e"><rect x="134" y="60" width="11" height="70"/><rect x="132" y="58" width="15" height="5"/></g>` +
    `<g fill="#c2453c"><rect x="134" y="70" width="11" height="6"/><rect x="134" y="90" width="11" height="6"/></g>` +
    steam(142, 44, 0.7, "#8f8a80", ".55") +
    pylon(300, 130, 56) +
    pylon(362, 130, 48) +
    `<g stroke="#6b7280" stroke-width="1" opacity=".8" fill="none"><path d="M262,90q38,10 76,0M338,92q30,8 62,0"/></g>` +
    ground(128, "#8a8270") +
    // ベルトコンベヤーと貯炭場
    `<path d="M186,130L370,104h16v7L192,138z" fill="#7f8a94"/>` +
    `<g fill="#6f6a5e">${rep(6, (i) => `<rect x="${r1(196 + i * 30)}" y="${r1(136 - i * 4)}" width="3.4" height="${r1(12 + i * 2)}"/>`)}</g>` +
    `<path d="M180,158q56,-40 112,0z" fill="#33343a"/>` +
    `<path d="M300,158q40,-30 80,0z" fill="#3f4046"/>` +
    `<g stroke="#4f5058" stroke-width="1.4" opacity=".8" fill="none"><path d="M206,152q30,-18 60,-8M316,152q22,-14 46,-6"/></g>` +
    // 石炭列車
    ground(158, "#7f7a68") +
    rails(166) +
    wagon(18, 164, 46, 18) +
    wagon(70, 164, 46, 18) +
    wagon(122, 164, 46, 18) +
    ground(176, "#6f6a58") +
    // 地割れから漏れる煙(地下火災)
    `<path d="M0,192q60,-8 118,4t142,-6q70,-6 140,4v16H0z" fill="#5f5a4a"/>` +
    `<g stroke="#2f2a24" stroke-width="2.4" fill="none"><path d="M40,206q14,-12 26,-4t28,-6M232,208q16,-14 30,-4t26,-8"/></g>` +
    `<g fill="#c9c4b8" opacity=".55"><ellipse cx="58" cy="192" rx="16" ry="7"/><ellipse cx="66" cy="180" rx="11" ry="6"/><ellipse cx="252" cy="194" rx="18" ry="7"/><ellipse cx="262" cy="182" rx="12" ry="6"/><ellipse cx="270" cy="170" rx="8" ry="5"/></g>` +
    `<g fill="#f0a03c" opacity=".5"><ellipse cx="58" cy="200" rx="9" ry="3.4"/><ellipse cx="252" cy="202" rx="10" ry="3.4"/></g>` +
    `<g><rect x="340" y="176" width="3.4" height="26" fill="#f5b31c"/><path d="M330,172h26v10h-26z" fill="#f5b31c"/><path d="M343,174l-5,7h10z" fill="#3f3a34"/></g>`,

  /**
   * ポロクワネ。**円形の党大会ホールと、北の鉄道分岐点。**
   * 国内の鉄道網の北端。ここから先はジンバブエへ抜ける。
   */
  conferencetown:
    sky("#8fc4e8", "#e0e8dc", 114) +
    clouds(64, 26, 0.9) +
    clouds(298, 30, 1.1) +
    hills(118, "#8a9a62", 4) +
    ground(114, "#b8a868") +
    // 円形のホール(左)
    `<path d="M14,146V104a58,20 0 0 1 116,0v42z" fill="#dfd8c8"/>` +
    `<ellipse cx="72" cy="104" rx="58" ry="20" fill="#7f96a8"/>` +
    `<ellipse cx="72" cy="104" rx="44" ry="14" fill="#93a8b8"/>` +
    `<g fill="#c9bc9c">${rep(7, (i) => `<rect x="${r1(20 + i * 17)}" y="118" width="6" height="28"/>`)}</g>` +
    `<g fill="#5f7f96">${rep(6, (i) => `<rect x="${r1(29 + i * 17)}" y="120" width="10" height="18"/>`)}</g>` +
    `<path d="M58,146v-14h28v14z" fill="#4a3a24"/>` +
    `<g fill="#cfc7b4">${rep(3, (i) => `<path d="M${r1(30 + i * 5)},${r1(146 + i * 4)}h${r1(84 - i * 10)}v4h${r1(-84 + i * 10)}z"/>`)}</g>` +
    // 旗の列
    `<g>${rep(5, (i) => {
      const x = r1(150 + i * 17);
      return `<rect x="${x}" y="98" width="2.4" height="48" fill="#c9bc9c"/><path d="M${r1(x + 2.4)},98h14v9h-14z" fill="${["#5f9a4a", "#f5b31c", "#c2453c", "#3f6b9a", "#2f2a24"][i]}"/>`;
    })}</g>` +
    // 鉄道分岐点(右)
    `<rect x="264" y="112" width="96" height="30" fill="#c2b49c"/>` +
    `<path d="M258,112h108l-10,-12h-88z" fill="#8f5642"/>` +
    `<g fill="#5f7f96">${rep(4, (i) => `<rect x="${r1(274 + i * 22)}" y="118" width="12" height="14"/>`)}</g>` +
    `<rect x="264" y="140" width="96" height="3.4" fill="#a8967c"/>` +
    `<g><rect x="376" y="98" width="3.4" height="46" fill="#5a5248"/><rect x="368" y="98" width="20" height="12" fill="#3f4a55"/><circle cx="373" cy="104" r="3" fill="#5f9a4a"/><circle cx="383" cy="104" r="3" fill="#c2453c"/></g>` +
    ground(146, "#a89460") +
    band(150, 14, "#8a8272") +
    rails(158) +
    `<g stroke="#5a5248" stroke-width="2" fill="none"><path d="M170,166L400,150M170,172L400,158"/></g>` +
    ground(172, "#a89460") +
    `<g stroke="#8f7f4a" stroke-width="2" opacity=".5" fill="none"><path d="M0,186q100,-8 200,0t200,0M0,202q100,-8 200,0t200,0"/></g>` +
    // 手前
    person(46, 200, 28, "#5f9a4a") +
    person(74, 202, 26, "#f5b31c") +
    person(100, 199, 27, "#c2453c") +
    arm(100, 184, 12, -8) +
    acacia(330, 200, 36) +
    `<g fill="#8f7a4a"><path d="M228,210l12,-8l13,3l3,5z"/><path d="M262,210l9,-6l10,2l1,4z"/></g>`,

  /**
   * ムシナ。**丘の上の発掘地と、国境の川。**
   * 11世紀、ここは金と象牙をインド洋の航路へ流していた。
   * 丘の頂に段になった発掘の切り込み、手前にリンポポ川の砂州。
   */
  ancientkingdom:
    sky("#a8c8dc", "#ecdcb8", 118) +
    sun(302, 34, 17, "#f8dc9a") +
    `<circle cx="302" cy="34" r="26" fill="#f8dc9a" opacity=".2"/>` +
    `<g fill="#d8c8a0" opacity=".55"><rect x="0" y="94" width="400" height="26"/></g>` +
    ground(116, "#c2a877") +
    // 砂岩の丘(発掘の段)
    `<path d="M18,146L46,72q34,-14 72,-2l30,76z" fill="#b8925c"/>` +
    `<path d="M18,146L46,72q34,-14 72,-2l10,26q-58,-8 -96,50z" fill="#c9a46a"/>` +
    `<g stroke="#96703f" stroke-width="1.6" opacity=".8" fill="none"><path d="M34,110q42,-14 92,-4M28,126q48,-16 106,-4M42,94q34,-10 74,-2"/></g>` +
    `<g fill="#8f6a3c"><rect x="62" y="80" width="26" height="10"/><rect x="94" y="88" width="18" height="8"/></g>` +
    // 発掘の天幕
    `<path d="M124,116h44l-22,-20z" fill="#e8e0cc"/>` +
    `<g fill="#c9bfa8"><rect x="130" y="116" width="32" height="10"/></g>` +
    `<g stroke="#8a7f66" stroke-width="1.4" fill="none"><path d="M146,96v-6M124,116l-8,8M168,116l8,8"/></g>` +
    person(112, 126, 20, "#f6efe2") +
    arm(112, 116, 8, 6) +
    // バオバブ
    baobabTree(212, 148, 62) +
    baobabTree(268, 144, 44) +
    baobabTree(376, 150, 54) +
    ground(146, "#b8a06a") +
    `<g fill="#8f9a52"><ellipse cx="60" cy="156" rx="20" ry="7"/><ellipse cx="180" cy="158" rx="16" ry="6"/><ellipse cx="322" cy="154" rx="18" ry="6"/></g>` +
    // リンポポ川(手前)と砂州
    band(164, 46, "#7f9a8a") +
    `<path d="M0,164q90,10 180,0t220,4v14H0z" fill="#6b8f8a"/>` +
    ripples(174, "#a8c8bc") +
    `<g fill="#d8c8a0"><ellipse cx="86" cy="198" rx="66" ry="12"/><ellipse cx="286" cy="204" rx="80" ry="11"/><ellipse cx="196" cy="188" rx="34" ry="6"/></g>` +
    `<g fill="#c2b088" opacity=".8"><ellipse cx="70" cy="194" rx="28" ry="5"/><ellipse cx="304" cy="200" rx="34" ry="5"/></g>` +
    // 交易の目印 — ガラス玉の首飾りと小舟
    `<g fill="#5a4630"><path d="M112,190q22,-9 44,0q-22,7 -44,0z"/></g>` +
    `<path d="M112,190q22,7 44,0" stroke="#f6efe2" stroke-width="1.2" fill="none"/>` +
    `<g fill="#3f6b9a"><circle cx="352" cy="184" r="2.4"/><circle cx="360" cy="186" r="2.4"/><circle cx="368" cy="184" r="2.4"/></g>` +
    person(40, 200, 26, "#a8763c") +
    arm(40, 186, 14, 4) +
    // 丘の石積みの段(王国の城壁)
    `<g fill="#a8895c"><rect x="46" y="118" width="72" height="5"/><rect x="38" y="132" width="94" height="5"/></g>` +
    `<g stroke="#8f6a3c" stroke-width="1" opacity=".7" fill="none"><path d="M62,118v5M84,118v5M106,118v5M56,132v5M80,132v5M104,132v5"/></g>` +
    // 川の浅瀬を渡る人と、荷の束
    person(316, 190, 24, "#5f9a8a") +
    arm(316, 178, 12, -8) +
    `<g fill="#8a6f4a"><rect x="326" y="166" width="20" height="9" rx="2"/><rect x="326" y="166" width="20" height="2.6" fill="#6b5330"/></g>` +
    `<g fill="#f5b31c"><ellipse cx="152" cy="200" rx="9" ry="5"/><ellipse cx="168" cy="203" rx="7" ry="4"/></g>` +
    `<g fill="#4f7f42"><ellipse cx="248" cy="156" rx="16" ry="6"/><ellipse cx="112" cy="158" rx="14" ry="5"/></g>`,

  /**
   * ツァニーン。**雨を呼ぶ王家の集落と、恐竜以前からのソテツの林。**
   * 姿を見せない女王の話なので、集落は木立の陰に半分隠す。
   */
  cycadreserve:
    sky("#8a9ab0", "#c8d4c8", 110) +
    `<g fill="#7f8a9a" opacity=".85"><ellipse cx="120" cy="34" rx="80" ry="20"/><ellipse cx="300" cy="26" rx="72" ry="17"/><ellipse cx="212" cy="52" rx="66" ry="14"/></g>` +
    `<g stroke="#a8b4bc" stroke-width="1.4" opacity=".55" fill="none">${rep(14, (i) => `<path d="M${r1(20 + i * 27)},${r1(50 + (i % 3) * 8)}l-5,${r1(28 + (i % 4) * 8)}"/>`)}</g>` +
    // 緑の丘
    `<path d="M0,120L70,98L160,112L250,94L340,110L400,100V150H0z" fill="#4f6b52"/>` +
    ground(108, "#5f7f52") +
    `<path d="M0,132L80,116L170,128L260,112L350,126L400,118V160H0z" fill="#3f6b46"/>` +
    `<g fill="#e0e8e4" opacity=".45"><ellipse cx="120" cy="126" rx="90" ry="8"/><ellipse cx="310" cy="120" rx="70" ry="7"/></g>` +
    ground(136, "#4f7f46") +
    // 王家の集落(木立の陰・柵で囲われている)
    rondavelHut(58, 152, 17) +
    rondavelHut(96, 150, 14) +
    rondavelHut(128, 153, 16) +
    `<g stroke="#7f6a48" stroke-width="2.4" fill="none"><path d="M22,158h132M22,164h132"/></g>` +
    `<g fill="#7f6a48">${rep(7, (i) => `<rect x="${r1(22 + i * 22)}" y="152" width="3" height="16"/>`)}</g>` +
    person(150, 160, 20, "#c2453c") +
    // ソテツ(手前・繰り返し)
    ground(158, "#3f6b3a") +
    `<g stroke="#2f5f36" stroke-width="2" opacity=".5" fill="none"><path d="M0,174q100,-8 200,0t200,0M0,196q100,-8 200,0t200,0"/></g>` +
    cycadPlant(36, 208, 50) +
    cycadPlant(104, 200, 40) +
    cycadPlant(196, 206, 44) +
    cycadPlant(360, 208, 48) +
    `<g fill="#2f5f36" opacity=".7"><ellipse cx="150" cy="192" rx="18" ry="6"/><ellipse cx="248" cy="200" rx="16" ry="6"/><ellipse cx="330" cy="188" rx="14" ry="5"/></g>` +
    // 雨のすじ(右)
    `<g stroke="#c8d8dc" stroke-width="1.4" opacity=".45" fill="none">${rep(10, (i) => `<path d="M${r1(300 + i * 11)},70l-8,52"/>`)}</g>`,

  /**
   * キンバリー。**手掘りの大穴と、そこから出るものを見張るための柵。**
   * 1880年代にここで始まった閉鎖コンパウンドが、のちの金鉱の宿舎の型になった。
   * 穴は左に、柵に囲われた宿舎は右に置いて、両方見えるようにしてある。
   */
  bighole:
    sky("#9cc4dc", "#e4dcc4", 108) +
    sun(340, 34, 14, "#f5d06a") +
    clouds(120, 26, 0.9) +
    ground(106, "#c2ac82") +
    // 奥のトタンの町
    `<g>${rep(9, (i) => {
      const x = r1(6 + i * 27);
      const h = 12 + (i % 3) * 4;
      return (
        `<rect x="${x}" y="${r1(120 - h)}" width="20" height="${h}" fill="#b8ae98"/>` +
        `<path d="M${r1(x - 2)},${r1(120 - h)}h24l-2.4,-4h-20z" fill="${i % 2 ? "#8f6a4a" : "#7f8a94"}"/>`
      );
    })}</g>` +
    // 木の巻き上げ櫓(穴の縁)
    `<g fill="#7f6a48"><path d="M96,126L104,86h10l8,40z"/><rect x="94" y="84" width="30" height="3.4"/></g>` +
    `<g stroke="#5f4f34" stroke-width="1.6" fill="none"><path d="M99,114h20M101,102h16M99,110l18,-8M117,110l-18,-8"/></g>` +
    `<g fill="#5a4630"><circle cx="109" cy="80" r="7"/><circle cx="109" cy="80" r="2.6"/></g>` +
    ground(120, "#b89c6a") +
    // 大穴(段になった壁と、底の水)
    `<ellipse cx="118" cy="164" rx="132" ry="52" fill="#8f7a52"/>` +
    `<ellipse cx="118" cy="168" rx="116" ry="44" fill="#a8905c"/>` +
    `<ellipse cx="118" cy="172" rx="98" ry="36" fill="#8f7a4a"/>` +
    `<ellipse cx="118" cy="176" rx="78" ry="28" fill="#7f6a44"/>` +
    `<ellipse cx="118" cy="180" rx="56" ry="20" fill="#3f7f8a"/>` +
    `<ellipse cx="106" cy="178" rx="30" ry="8" fill="#5f9aa4" opacity=".7"/>` +
    `<g stroke="#6b5a38" stroke-width="1.4" opacity=".7" fill="none"><path d="M20,150l14,26M212,148l-16,28M66,138l6,20M172,140l-8,20"/></g>` +
    `<g fill="#c2ac82"><path d="M0,148q26,-14 54,-6l-8,12q-24,-4 -46,4z"/></g>` +
    // 縁の柵
    fence(0, 250, 146, 18) +
    // 柵に囲われた宿舎(右)
    ground(140, "#b89c6a") +
    hostelBlock(262, 152, 128, 26) +
    fence(252, 400, 172, 24) +
    ground(174, "#a8905c") +
    `<g fill="#8f7a4a"><ellipse cx="300" cy="188" rx="26" ry="6"/><ellipse cx="366" cy="196" rx="22" ry="6"/></g>` +
    person(276, 198, 26, "#4f6b8a") +
    person(330, 202, 24, "#8a4a3c") +
    person(384, 196, 25, "#6b4a7a") +
    // 手前の砂利と、選り分けの台
    `<g fill="#8f7a4a">${rep(14, (i) => `<circle cx="${r1(10 + i * 17)}" cy="${r1(196 + ((i * 31) % 12))}" r="${r1(2 + (i % 3))}"/>`)}</g>` +
    `<g><rect x="34" y="192" width="70" height="5" fill="#7f6a48"/><rect x="40" y="197" width="4" height="13" fill="#5f4f34"/><rect x="94" y="197" width="4" height="13" fill="#5f4f34"/>` +
    `<g fill="#cfe4f0"><circle cx="52" cy="189" r="2.6"/><circle cx="68" cy="188" r="3"/><circle cx="86" cy="189" r="2.4"/></g></g>`,

  /**
   * ヨハネスブルグ。**アフリカで最も裕福な一角と、最も貧しい一角。**
   * 右にサントンのガラスの塔、左にアレクサンドラの家並み。
   * その間を高速道路が抜ける。**同じ絵の中に両方入れることが要点。**
   */
  megacity:
    sky("#7fa8cc", "#dbe4ea", 126) +
    `<g fill="#c9c4b8" opacity=".45"><rect x="0" y="84" width="400" height="30"/></g>` +
    sun(58, 40, 15, "#f5d88a") +
    // サントンのガラス塔(右)
    `<g fill="#7f9ab0"><rect x="252" y="46" width="34" height="82"/><rect x="292" y="24" width="40" height="104"/><rect x="338" y="58" width="30" height="70"/><rect x="374" y="72" width="26" height="56"/></g>` +
    `<g fill="#9ab8cc"><rect x="252" y="46" width="12" height="82"/><rect x="292" y="24" width="14" height="104"/><rect x="338" y="58" width="11" height="70"/><rect x="374" y="72" width="9" height="56"/></g>` +
    `<g fill="#5f7f96" opacity=".8">${rep(9, (i) => `<rect x="256" y="${r1(54 + i * 8)}" width="26" height="3.4"/>`)}</g>` +
    `<g fill="#5f7f96" opacity=".8">${rep(11, (i) => `<rect x="296" y="${r1(32 + i * 8)}" width="32" height="3.4"/>`)}</g>` +
    `<g fill="#5f7f96" opacity=".8">${rep(7, (i) => `<rect x="342" y="${r1(66 + i * 8)}" width="22" height="3.4"/>`)}</g>` +
    `<g fill="#c9bc9c"><rect x="290" y="18" width="44" height="6"/><rect x="308" y="6" width="3.4" height="12"/></g>` +
    // アレクサンドラの家並み(左) — 低く密で、屋根が一枚ずつ違う
    `<g>${rep(11, (i) => {
      const x = r1(-4 + i * 22);
      const h = 14 + ((i * 7) % 4) * 4;
      return (
        `<rect x="${x}" y="${r1(128 - h)}" width="19" height="${h}" fill="${i % 3 ? "#b8a88c" : "#a89a80"}"/>` +
        `<path d="M${r1(x - 2)},${r1(128 - h)}h23l-2,-4h-19z" fill="${["#9aa4ac", "#a8623c", "#8f6a4a"][i % 3]}"/>` +
        `<rect x="${r1(x + 6)}" y="${r1(132 - h)}" width="7" height="7" fill="#5f6b76"/>`
      );
    })}</g>` +
    `<g>${rep(8, (i) => shack(r1(2 + i * 30), 146, 24, 16, i % 2 ? "#9aa4ac" : "#a8623c", i % 2 ? "#8f6a4a" : "#8a8f96"))}</g>` +
    ground(126, "#8f8a72") +
    // 高速道路(両者を隔てる)
    `<path d="M0,210L138,146h104L400,210z" fill="#5f5a52"/>` +
    `<path d="M0,210L152,146h6L52,210z" fill="#6b6459"/>` +
    `<g stroke="#f0e8c8" stroke-width="3" stroke-dasharray="14 16" opacity=".6" fill="none"><path d="M172,148L92,210M212,148L292,210"/></g>` +
    `<g fill="#c9bc9c"><rect x="138" y="140" width="112" height="6"/>${rep(5, (i) => `<rect x="${r1(146 + i * 24)}" y="130" width="3.4" height="10"/>`)}</g>` +
    // 車
    `<g><path d="M104,190h56l-6,-13h-14l-7,-8h-20l-6,8h-8z" fill="#3f6b9a"/><g fill="#2f2a24"><circle cx="118" cy="190" r="6"/><circle cx="150" cy="190" r="6"/></g></g>` +
    `<g><path d="M258,176h44l-5,-10h-11l-6,-7h-15l-5,7h-6z" fill="#c2453c"/><g fill="#2f2a24"><circle cx="270" cy="176" r="5"/><circle cx="294" cy="176" r="5"/></g></g>` +
    `<g><path d="M326,200h56l-6,-13h-14l-7,-8h-20l-6,8h-8z" fill="#e0d2b4"/><g fill="#2f2a24"><circle cx="340" cy="200" r="6"/><circle cx="372" cy="200" r="6"/></g></g>` +
    // 道の両脇(手前)
    `<g fill="#7f7a68"><path d="M0,168q30,-8 58,4t72,10v28H0z"/></g>` +
    `<g fill="#8f8a72"><path d="M400,166q-30,-6 -56,6t-58,18v20h114z"/></g>` +
    person(30, 200, 26, "#4f7f5a") +
    person(58, 204, 24, "#f5b31c") +
    person(368, 194, 24, "#2f3a4a"),

  /**
   * フェレーニヒング。**製鉄所と炭田、そしてファール川。**
   * 高炉と熱風炉、側線の石炭貨車。和平条約に名を残した町でもある。
   */
  steeltown:
    sky("#a8aca0", "#d8d4be", 116) +
    sun(320, 42, 14, "#f0b060") +
    `<g fill="#c4c0aa" opacity=".55"><rect x="0" y="88" width="400" height="30"/></g>` +
    ground(114, "#8f8a72") +
    // 高炉と熱風炉
    `<g fill="#7f6a58"><rect x="30" y="72" width="34" height="66"/><rect x="26" y="66" width="42" height="8"/></g>` +
    `<g fill="#5f5148"><rect x="72" y="82" width="16" height="56"/><rect x="94" y="86" width="16" height="52"/><rect x="116" y="90" width="16" height="48"/></g>` +
    `<g fill="#8a7f6a"><rect x="70" y="78" width="20" height="5"/><rect x="92" y="82" width="20" height="5"/><rect x="114" y="86" width="20" height="5"/></g>` +
    `<path d="M64,90L96,84v5L64,96z" fill="#6f6a5e"/>` +
    `<g fill="#8f897e"><rect x="136" y="52" width="12" height="86"/><rect x="134" y="50" width="16" height="5"/></g>` +
    steam(142, 36, 0.85, "#8f8a80", ".55") +
    `<g fill="#c2453c"><rect x="30" y="86" width="34" height="6"/></g>` +
    `<g fill="#f0a03c" opacity=".8"><rect x="38" y="120" width="18" height="14"/></g>` +
    `<g fill="#f5d06a" opacity=".55"><ellipse cx="47" cy="128" rx="26" ry="12"/></g>` +
    // 工場棟(右)
    `<rect x="238" y="98" width="146" height="40" fill="#8f9aa0"/>` +
    `<g fill="#7f8a94">${rep(6, (i) => `<path d="M${r1(238 + i * 25)},98l12,-12h13l-12,12z"/>`)}</g>` +
    `<g fill="#5f6b76">${rep(9, (i) => `<rect x="${r1(244 + i * 16)}" y="108" width="10" height="14"/>`)}</g>` +
    `<rect x="238" y="130" width="146" height="3.4" fill="#6f7a84"/>` +
    // 側線と石炭貨車
    ground(138, "#7f7a68") +
    rails(148) +
    wagon(188, 146, 44, 17) +
    wagon(238, 146, 44, 17) +
    wagon(288, 146, 44, 17) +
    wagon(338, 146, 44, 17) +
    `<g fill="#33343a"><path d="M182,160q30,-16 60,0z"/></g>` +
    ground(158, "#6f7a56") +
    // ファール川(手前)
    band(172, 38, "#5f8a96") +
    `<path d="M0,172q100,8 200,0t200,4v10H0z" fill="#4f7f8a"/>` +
    ripples(182, "#a8ccd4") +
    `<g fill="#8a8578"><rect x="0" y="168" width="400" height="5"/></g>` +
    `<g fill="#c9c4b0"><rect x="86" y="166" width="118" height="4"/>${rep(5, (i) => `<rect x="${r1(92 + i * 28)}" y="170" width="4" height="10"/>`)}</g>` +
    poplar(24, 170, 46, "#4f7f46") +
    poplar(40, 170, 58, "#3f6b3a") +
    poplar(56, 170, 40, "#5f8f4a") +
    person(300, 176, 24, "#8a4a3c") +
    arm(300, 164, 16, 4) +
    `<g fill="#f6efe2" opacity=".85"><ellipse cx="252" cy="196" rx="10" ry="4"/><path d="M258,193c-1,-4.4 1.2,-6.6 3.2,-5.8c1.6,0.5 1.6,2.3 0,2.9l-1.4,0.5l0.5,3z"/></g>`,

  /**
   * ケープタウン。**島から街を見る。**
   * 手前は石灰岩の採石場、海峡の向こうにテーブルマウンテンと街。
   * 「見えるほど近く、それでいて出られない」——構図そのものが話になる。
   */
  islandprison:
    sky("#8fc4e8", "#dbe8f0", 100) +
    clouds(86, 28, 1) +
    // テーブルマウンテン(平らな頂)と街(右)
    `<path d="M212,100V64q0,-4 4,-4h150q4,0 4,4v36z" fill="#7f8a9a"/>` +
    `<path d="M212,100V64q0,-4 4,-4h58l-14,40z" fill="#93a0ae"/>` +
    `<path d="M366,100V64q0,-4 -4,-4h-22l18,40z" fill="#6f7a8a"/>` +
    `<g stroke="#5f6a7a" stroke-width="1.4" opacity=".65" fill="none"><path d="M244,66l6,32M286,64l-4,34M330,66l8,32"/></g>` +
    `<g fill="#f2f6f8" opacity=".8"><ellipse cx="290" cy="62" rx="60" ry="7"/></g>` +
    `<path d="M366,100L400,78V100z" fill="#8a94a4"/>` +
    `<g fill="#c9c4b0">${rep(12, (i) => `<rect x="${r1(214 + i * 15)}" y="${r1(100 - 4 - ((i * 5) % 9))}" width="10" height="${r1(4 + ((i * 5) % 9))}"/>`)}</g>` +
    `<g fill="#e0dcd0">${rep(5, (i) => `<rect x="${r1(232 + i * 30)}" y="${r1(86 - (i % 2) * 8)}" width="9" height="${r1(14 + (i % 2) * 8)}"/>`)}</g>` +
    // 海峡
    band(100, 54, "#4f8fb0") +
    `<path d="M0,100q100,8 200,0t200,6v10H0z" fill="#3f7f9f"/>` +
    ripples(114, "#a8d8e8") +
    `<g fill="#f6efe2" opacity=".75"><path d="M96,132h30l-4,6H100z"/><rect x="108" y="124" width="2.4" height="8"/><path d="M111,124h10l-3,4h-7z"/></g>` +
    // 島(手前)
    `<path d="M0,146q80,-12 200,-6t200,10v60H0z" fill="#a8a483"/>` +
    ground(154, "#b0aa86") +
    `<g fill="#8f9a5c"><ellipse cx="36" cy="152" rx="20" ry="6"/><ellipse cx="176" cy="150" rx="18" ry="5"/><ellipse cx="330" cy="152" rx="22" ry="6"/></g>` +
    // 石灰岩の採石場(手前) — いちばん明るいのは石灰岩
    `<path d="M0,210V172q80,-14 160,-2t240,-4v44z" fill="#eae6d8"/>` +
    `<path d="M0,210V186q80,-12 160,0t240,-6v30z" fill="#dcd6c2"/>` +
    `<g stroke="#c2bca6" stroke-width="1.6" opacity=".8" fill="none"><path d="M40,176l-8,32M118,172l10,36M266,176l-10,32M340,170l12,38"/></g>` +
    `<g fill="#c9c4ac"><path d="M60,208l14,-12l16,5l4,13z"/><path d="M188,210l12,-10l14,4l2,10z"/><path d="M296,210l10,-9l12,4l2,9z"/></g>` +
    // 柵と門
    fence(0, 400, 168, 20, "#7f7a6e") +
    person(88, 196, 28, "#8a8578") +
    arm(88, 180, 14, 8) +
    person(220, 200, 26, "#8a8578") +
    person(352, 194, 27, "#8a8578"),

  /**
   * ケープワインランズ(ステレンボッシュ・フランシュフック)。
   * オークの並木とケープダッチ様式の農園、その背後に切り立つ山。
   */
  capewinelands:
    sky("#8fc4e8", "#e4ecdc", 104) +
    clouds(302, 26, 0.9) +
    // ケープ褶曲の山(角ばった稜線)
    `<path d="M0,116L52,58L104,92L164,46L228,96L286,62L348,100L400,74V140H0z" fill="#7f8a9a"/>` +
    `<g fill="#6b7686" opacity=".7"><path d="M52,58L104,92L74,96zM164,46L228,96L186,90zM286,62L348,100L306,96z"/></g>` +
    `<g stroke="#e8eef2" stroke-width="2" opacity=".5" fill="none"><path d="M164,58l-10,26M52,70l-8,20M286,74l9,20"/></g>` +
    ground(104, "#7f9a5c") +
    `<path d="M0,126q90,-16 200,-8t200,14v26H0z" fill="#6f9a52"/>` +
    // 農園邸宅
    capeDutch(24, 148, 108, 34) +
    `<g fill="#4f7f46"><ellipse cx="140" cy="146" rx="14" ry="8"/><ellipse cx="14" cy="146" rx="12" ry="7"/></g>` +
    // オーク並木(繰り返し・中央でよい)
    ground(148, "#7f9a4a") +
    `<g>${rep(6, (i) => oakTree(r1(158 + i * 42), r1(146 + i * 1.5), r1(12 + i * 0.8)))}</g>` +
    `<g fill="#000" opacity=".14">${rep(6, (i) => `<ellipse cx="${r1(158 + i * 42)}" cy="${r1(147 + i * 1.5)}" rx="${r1(12 + i)}" ry="4"/>`)}</g>` +
    // 葡萄畑(手前ほど大きく)
    vineRow(164, 11, 6) +
    vineRow(186, 9, 8) +
    vineRow(210, 7, 10) +
    `<g fill="#6b4a7a"><circle cx="42" cy="198" r="6"/><circle cx="54" cy="198" r="6"/><circle cx="48" cy="207" r="6"/><circle cx="60" cy="206" r="5.4"/></g>` +
    `<g fill="#8a5f9a"><circle cx="40" cy="196" r="2"/><circle cx="52" cy="196" r="2"/><circle cx="46" cy="205" r="2"/></g>` +
    person(320, 194, 28, "#c2453c") +
    arm(320, 178, -14, 8) +
    `<g fill="#8a6f4a"><rect x="296" y="192" width="18" height="14" rx="2"/><rect x="296" y="192" width="18" height="3" fill="#6b5330"/></g>`,

  /**
   * ハーマナス。**崖から鯨を見る。**
   * 海藻の角笛を吹く男が、いまも最良の鯨予報。
   * 崖は左、鯨は右の沖。中央は海なので隠れても惜しくない。
   */
  whalecoast:
    sky("#7fb8dc", "#dce8f0", 96) +
    sun(330, 30, 14, "#f5d88a") +
    clouds(120, 24, 0.9) +
    `<path d="M0,96L60,80L140,92L230,78L320,90L400,82V104H0z" fill="#8a94a0" opacity=".8"/>` +
    // 海
    band(96, 114, "#3f7f9f") +
    `<path d="M0,96q100,8 200,0t200,6v14H0z" fill="#4f8fb0"/>` +
    band(150, 60, "#356f92") +
    ripples(112, "#a8d8e8") +
    ripples(160, "#7fb0c8") +
    // 鯨(背と尾びれ)
    `<path d="M262,152q42,-16 84,-2q-40,14 -84,2z" fill="#3f4a55"/>` +
    `<path d="M266,150q40,-12 76,-1q-36,8 -76,1z" fill="#5a6470" opacity=".8"/>` +
    `<path d="M352,146q10,-22 26,-26q-6,16 -4,26q-10,-6 -22,0z" fill="#3f4a55"/>` +
    `<g fill="#f6efe2" opacity=".7"><ellipse cx="256" cy="154" rx="18" ry="4"/><ellipse cx="382" cy="150" rx="14" ry="4"/></g>` +
    `<g fill="#f6efe2" opacity=".55"><ellipse cx="290" cy="126" rx="8" ry="14"/><ellipse cx="300" cy="120" rx="6" ry="11"/></g>` +
    // 崖(左)
    `<path d="M0,210V88L54,80l40,20l32,-6l26,26l30,10v92z" fill="#8a7f6a"/>` +
    `<path d="M0,210V102L46,96l38,18l30,-4l24,24l26,10v64z" fill="#9a8f78"/>` +
    `<g stroke="#6b6255" stroke-width="1.8" opacity=".7" fill="none"><path d="M28,110l8,44M84,124l-6,40M132,140l10,38M56,160l-8,36"/></g>` +
    `<g fill="#5f8f52"><ellipse cx="30" cy="86" rx="20" ry="8"/><ellipse cx="88" cy="100" rx="16" ry="7"/><ellipse cx="140" cy="122" rx="14" ry="6"/><ellipse cx="20" cy="150" rx="18" ry="7"/><ellipse cx="96" cy="170" rx="16" ry="6"/></g>` +
    `<g fill="#c2453c"><circle cx="34" cy="82" r="2.6"/><circle cx="92" cy="96" r="2.4"/><circle cx="24" cy="146" r="2.4"/></g>` +
    // 崖の上の道と見台
    `<path d="M0,196h176v6H0z" fill="#b8ae98"/>` +
    `<g fill="#6f6a5e"><rect x="0" y="182" width="176" height="2.6"/>${rep(6, (i) => `<rect x="${r1(8 + i * 30)}" y="182" width="3" height="14"/>`)}</g>` +
    // 海藻の角笛を吹く男
    person(120, 196, 30, "#3f6b4a") +
    arm(120, 178, 16, -10) +
    `<path d="M136,168q16,-6 26,-16q-4,14 -22,20z" fill="#6b5330"/>` +
    person(54, 198, 26, "#f5b31c") +
    arm(54, 184, 12, -10) +
    `<g><rect x="196" y="176" width="4" height="24" fill="#6f6a5e"/><rect x="180" y="168" width="36" height="10" fill="#3f6b9a"/><rect x="183" y="171" width="30" height="1.6" fill="#f6efe2" opacity=".8"/></g>` +
    // 2頭目の鯨(潮を吹く)と、沖の小舟
    `<path d="M258,200q34,-12 68,-1q-32,11 -68,1z" fill="#3f4a55" opacity=".9"/>` +
    `<g fill="#f6efe2" opacity=".5"><ellipse cx="276" cy="180" rx="6" ry="11"/><ellipse cx="284" cy="176" rx="4.4" ry="8"/></g>` +
    `<path d="M320,178h40q-5,7 -20,7t-20,-7z" fill="#c9bc9c"/>` +
    `<path d="M320,178h40l-2,3h-36z" fill="#8a4a3c"/>` +
    `<rect x="338" y="166" width="2.4" height="12" fill="#6b5330"/>` +
    // 崖の上のフィンボス(手前)
    `<g fill="#5f8f52"><ellipse cx="26" cy="206" rx="22" ry="9"/><ellipse cx="72" cy="209" rx="18" ry="8"/><ellipse cx="150" cy="207" rx="20" ry="8"/></g>` +
    `<g fill="#e8562f"><circle cx="18" cy="198" r="3.4"/><circle cx="34" cy="200" r="3"/><circle cx="68" cy="202" r="3.4"/><circle cx="148" cy="200" r="3"/><circle cx="160" cy="202" r="2.6"/></g>` +
    `<g fill="#f5b31c"><circle cx="46" cy="202" r="2.4"/><circle cx="82" cy="204" r="2.4"/><circle cx="136" cy="202" r="2.4"/></g>` +
    `<g stroke="#4f7f46" stroke-width="1.4" fill="none"><path d="M18,198v8M34,200v7M68,202v6M148,200v7"/></g>`,

  /**
   * クニスナ。**潟湖と、その口を守る二つの岬。**
   * 左は深い森(数えられなかったゾウの棲む森)、手前は潟湖沿いの旧鉄道。
   */
  lagoonforest:
    sky("#8fc4e8", "#dfe8ea", 98) +
    clouds(240, 24, 0.9) +
    // 岬(海への口)
    `<path d="M266,110V70l24,-8l20,10v38z" fill="#8a7f6a"/>` +
    `<path d="M340,110V66l22,-10l24,12v42z" fill="#7f7460"/>` +
    `<g stroke="#6b6255" stroke-width="1.6" opacity=".7" fill="none"><path d="M280,74v34M296,78v30M356,70v38M372,74v34"/></g>` +
    `<g fill="#4f7f42"><ellipse cx="286" cy="66" rx="16" ry="7"/><ellipse cx="362" cy="60" rx="18" ry="7"/></g>` +
    `<rect x="310" y="98" width="30" height="12" fill="#5f9ab0"/>` +
    // 森の丘(左)
    `<path d="M0,120q40,-40 96,-30t92,-10l30,50z" fill="#2f5f3a"/>` +
    `<path d="M0,130q46,-30 100,-20t108,-6l14,36z" fill="#3f7346"/>` +
    `<g fill="#4f8f4a">${rep(9, (i) => `<ellipse cx="${r1(8 + i * 26)}" cy="${r1(112 + (i % 3) * 10)}" rx="${r1(16 - (i % 3) * 3)}" ry="${r1(9 - (i % 3))}"/>`)}</g>` +
    `<g fill="#5f9a52">${rep(7, (i) => `<ellipse cx="${r1(20 + i * 32)}" cy="${r1(128 + (i % 2) * 8)}" rx="13" ry="7"/>`)}</g>` +
    ground(96, "#4f7f8a") +
    // 潟湖
    band(110, 58, "#5f9ab0") +
    `<path d="M0,142q100,8 200,0t200,6v22H0z" fill="#4f8aa4"/>` +
    ripples(126, "#a8d8e0") +
    `<g fill="#3f6b7a" opacity=".55"><ellipse cx="130" cy="150" rx="60" ry="8"/><ellipse cx="320" cy="156" rx="50" ry="7"/></g>` +
    // 小舟
    `<path d="M282,152h44q-6,10 -22,10t-22,-10z" fill="#c9bc9c"/>` +
    `<path d="M282,152h44l-3,4h-38z" fill="#8a6f4a"/>` +
    `<rect x="302" y="136" width="2.4" height="16" fill="#6b5330"/>` +
    `<path d="M305,137l14,14h-14z" fill="#f6efe2"/>` +
    // 手前 — 潟湖沿いの旧鉄道
    ground(168, "#8f9a6a") +
    band(174, 14, "#8a8272") +
    rails(180) +
    ground(192, "#6f8a4a") +
    `<g fill="#3f6b3a">${rep(7, (i) => `<path d="M${r1(6 + i * 58)},210q${r1(6 + (i % 3) * 3)},-22 ${r1(12 + (i % 3) * 6)},0z"/>`)}</g>` +
    `<g fill="#5f9a52">${rep(6, (i) => `<path d="M${r1(30 + i * 62)},210q7,-14 14,0z"/>`)}</g>` +
    `<g><rect x="34" y="152" width="4" height="24" fill="#6b5330"/><rect x="14" y="144" width="46" height="10" fill="#5f4f34"/><rect x="17" y="147" width="40" height="1.6" fill="#f6efe2" opacity=".8"/></g>` +
    person(348, 176, 24, "#4f7f5a") +
    // 森の奥に半分隠れたゾウ(深すぎて何年も数えられなかった)
    `<g opacity=".85"><ellipse cx="74" cy="120" rx="26" ry="19" fill="#5f6b5a"/>` +
    `<ellipse cx="46" cy="118" rx="12" ry="13" fill="#5f6b5a"/>` +
    `<path d="M40,116q-11,-4 -14,8t8,12q8,-6 8,-14z" fill="#54604f"/>` +
    `<path d="M40,128q-4,12 -10,16" stroke="#5f6b5a" stroke-width="4.4" stroke-linecap="round" fill="none"/>` +
    `<g fill="#5f6b5a"><rect x="58" y="134" width="8" height="12"/><rect x="84" y="134" width="8" height="12"/></g></g>` +
    `<g fill="#3f7346"><ellipse cx="60" cy="112" rx="20" ry="9"/><ellipse cx="98" cy="120" rx="18" ry="8"/></g>` +
    // 手前のシダ
    `<g stroke="#2f5f36" stroke-width="2" stroke-linecap="round" fill="none">${rep(4, (i) => {
      const x = r1(96 + i * 74);
      return `<path d="M${x},210q-12,-14 -20,-24M${x},210q12,-14 20,-24M${x},210v-26"/>`;
    })}</g>` +
    `<g fill="#5f9a52">${rep(4, (i) => `<ellipse cx="${r1(96 + i * 74)}" cy="196" rx="16" ry="6"/>`)}</g>`,

  /**
   * アウツホールン。**羽根御殿とダチョウ。**
   * 羽根の好景気が一夜で終わった町。鉄のレース細工のヴェランダを持つ邸宅と、
   * 金網に囲われた飼育場。
   */
  featherpalace:
    sky("#9cc8e4", "#e8e0c8", 116) +
    sun(74, 40, 15, "#f5d88a") +
    `<g fill="#d8ceac" opacity=".5"><rect x="0" y="92" width="400" height="28"/></g>` +
    koppie(60, 120, 150, 40, "#a8916c") +
    koppie(300, 120, 180, 32, "#b09a74") +
    ground(118, "#c9a877") +
    // 羽根御殿(左〜中央)
    `<rect x="18" y="86" width="150" height="60" fill="#e8dcc0"/>` +
    `<path d="M10,86h166l-14,-16H24z" fill="#8f5642"/>` +
    `<g fill="#7f4a3a"><rect x="10" y="84" width="166" height="4"/></g>` +
    `<path d="M62,70V52q0,-8 12,-8h48q12,0 12,8v18z" fill="#e8dcc0"/>` +
    `<path d="M58,70h88l-8,-8h-72z" fill="#8f5642"/>` +
    `<g fill="#5f7f96">${rep(5, (i) => `<rect x="${r1(30 + i * 29)}" y="96" width="15" height="22"/>`)}</g>` +
    `<g fill="#c2b49c">${rep(5, (i) => `<rect x="${r1(27 + i * 29)}" y="92" width="21" height="4"/>`)}</g>` +
    `<rect x="86" y="50" width="14" height="18" fill="#5f7f96"/>` +
    // 鉄のレース細工のヴェランダ
    `<rect x="6" y="124" width="174" height="5" fill="#7f8a94"/>` +
    `<g fill="#7f8a94">${rep(8, (i) => `<rect x="${r1(10 + i * 23)}" y="128" width="3" height="20"/>`)}</g>` +
    `<g stroke="#7f8a94" stroke-width="1.4" fill="none">${rep(7, (i) => `<path d="M${r1(13 + i * 23)},130q11,10 22,0"/>`)}</g>` +
    `<path d="M84,148v-18h20v18z" fill="#4a3a24"/>` +
    // 飼育場(右)
    ground(146, "#c2a06a") +
    fence(216, 400, 176, 30, "#8a8578") +
    ground(178, "#b8946a") +
    // ダチョウ(長い首・小さい頭・太い胴・長い脚)
    `<g><ellipse cx="288" cy="156" rx="24" ry="17" fill="#3f3a34"/>` +
    `<path d="M300,146q10,-26 14,-40" stroke="#c9a877" stroke-width="4.4" fill="none"/>` +
    `<ellipse cx="315" cy="103" rx="5.4" ry="4.4" fill="#c9a877"/>` +
    `<path d="M319,102l5,1.6l-5,1.6z" fill="#8a6f4a"/>` +
    `<g stroke="#c9a877" stroke-width="3.4" fill="none"><path d="M280,172v20M294,172v20"/></g>` +
    `<g fill="#f6efe2" opacity=".85"><ellipse cx="272" cy="150" rx="12" ry="6"/></g></g>` +
    `<g><ellipse cx="356" cy="164" rx="19" ry="13" fill="#4a4436"/>` +
    `<path d="M366,156q8,-20 11,-31" stroke="#c9a877" stroke-width="3.8" fill="none"/>` +
    `<ellipse cx="378" cy="122" rx="4.6" ry="3.8" fill="#c9a877"/>` +
    `<g stroke="#c9a877" stroke-width="3" fill="none"><path d="M350,176v16M362,176v16"/></g></g>` +
    // 手前 — 卵と籠
    `<g fill="#f2ede0"><ellipse cx="60" cy="196" rx="10" ry="13"/><ellipse cx="82" cy="202" rx="9" ry="12"/><ellipse cx="42" cy="204" rx="9" ry="11"/></g>` +
    `<g fill="#dcd4c0"><ellipse cx="57" cy="192" rx="4" ry="5"/><ellipse cx="79" cy="198" rx="3.4" ry="4.4"/></g>` +
    `<g fill="#8a6f4a"><path d="M120,210l-6,-20h44l-6,20z"/><rect x="112" y="186" width="48" height="5" rx="2"/></g>` +
    `<g fill="#f6efe2" opacity=".9"><path d="M126,186q6,-24 12,-2zM140,186q7,-26 13,-2z"/></g>`,

  /**
   * パール。**丘の上の言語記念碑と、谷のぶどう畑。**
   * 高さの違う3本の塔が並ぶ形。左手前に刑務所の門を小さく置いてある
   * (ある言語に記念碑を与え、ある大統領に自由を与えた谷)。
   */
  languagemonument:
    sky("#8fc4e8", "#e0eadc", 110) +
    clouds(292, 26, 0.9) +
    // 花崗岩のドームと丘
    `<path d="M0,116q46,-38 104,-24t120,-6q66,-12 176,18v40H0z" fill="#8a9a72"/>` +
    `<g fill="#b8b0a0"><ellipse cx="118" cy="96" rx="34" ry="16"/><ellipse cx="70" cy="102" rx="24" ry="11"/></g>` +
    ground(110, "#7f9a5c") +
    // 記念碑(高さの違う3本 + 低い列)
    `<g fill="#d8d0bc"><path d="M262,110V44q0,-8 7,-8t7,8v66z"/><path d="M284,110V26q0,-9 8,-9t8,9v84z"/><path d="M308,110V56q0,-7 6,-7t6,7v54z"/></g>` +
    `<g fill="#b8b0a0"><path d="M270,110V44q0,-8 6,-8v74z"/><path d="M292,110V26q0,-9 8,-9v93z"/><path d="M314,110V56q0,-7 6,-7v61z"/></g>` +
    `<g fill="#d8d0bc">${rep(4, (i) => `<path d="M${r1(328 + i * 13)},110V${r1(84 + i * 5)}q0,-5 5,-5t5,5v${r1(26 - i * 5)}z"/>`)}</g>` +
    `<g fill="#c2bcaa"><path d="M244,110h136v6H244z"/></g>` +
    `<g fill="#cfc7b4">${rep(3, (i) => `<path d="M${r1(240 - i * 6)},${r1(116 + i * 5)}h${r1(146 + i * 12)}v4h${r1(-146 - i * 12)}z"/>`)}</g>` +
    person(228, 132, 22, "#c2453c") +
    person(244, 133, 20, "#3f6b9a") +
    // 谷のぶどう畑
    ground(134, "#7f9a4a") +
    vineRow(152, 12, 5) +
    vineRow(172, 10, 7) +
    vineRow(196, 8, 9) +
    // 刑務所の門(左手前)
    `<g fill="#c2b9a2"><rect x="0" y="146" width="26" height="46"/><rect x="54" y="146" width="22" height="46"/></g>` +
    `<g fill="#a8a08c"><rect x="0" y="142" width="80" height="6"/></g>` +
    `<g stroke="#8f8578" stroke-width="1.2" opacity=".7" fill="none"><path d="M0,158h26M0,170h26M54,158h22M54,170h22"/></g>` +
    `<g><rect x="26" y="166" width="4" height="26" fill="#7f8a94"/><path d="M28,172h64v6H28z" fill="#c2453c"/>` +
    `<g fill="#f6efe2">${rep(3, (i) => `<rect x="${r1(38 + i * 18)}" y="172" width="9" height="6"/>`)}</g></g>` +
    `<g fill="#8a8578"><rect x="6" y="118" width="3.4" height="26"/><rect x="0" y="112" width="16" height="7"/></g>` +
    `<g fill="#6b4a7a"><circle cx="118" cy="198" r="5.4"/><circle cx="129" cy="198" r="5.4"/><circle cx="123" cy="206" r="5.4"/></g>`,

  /**
   * ダーバン。**サトウキビ畑と、それを運ぶ軽便鉄道。**
   * 刈るために連れてこられた人々が、この海岸に留まった。
   */
  sugarcoast:
    sky("#8fc4e8", "#e0ecdc", 100) +
    sun(66, 32, 15, "#f8dc9a") +
    `<g fill="#dfe8dc" opacity=".5"><rect x="0" y="76" width="400" height="26"/></g>` +
    clouds(300, 26, 1) +
    // インド洋(右奥)
    `<path d="M232,100h168v34H232z" fill="#3f8fb0"/>` +
    `<g stroke="#a8d8e8" stroke-width="2" opacity=".7" fill="none"><path d="M244,110h48M312,118h64M258,126h52"/></g>` +
    `<path d="M232,132h168v8H232z" fill="#f6efe2" opacity=".7"/>` +
    // 緑の丘
    `<path d="M0,112q60,-24 130,-12t120,-6l40,18z" fill="#4f7f46"/>` +
    ground(100, "#5f8f4a") +
    `<path d="M0,124q80,-14 170,-4t230,10v20H0z" fill="#3f7f42"/>` +
    // 椰子
    datePalm(28, 138, 46) +
    datePalm(64, 134, 36) +
    datePalm(374, 140, 40) +
    // サトウキビ畑(中景と手前)
    caneField(126, 26, 90, 340) +
    ground(152, "#4f7f3a") +
    caneField(150, 34) +
    // 軽便鉄道(手前)
    ground(184, "#8a7f68") +
    `<g stroke="#5a5248" stroke-width="2" fill="none"><path d="M0,192h400M0,198h400"/></g>` +
    `<path d="M0,189h400" stroke="#6b5a44" stroke-width="6" stroke-dasharray="8 6" fill="none"/>` +
    `<g><rect x="26" y="164" width="60" height="24" fill="#4f6b8a"/><rect x="24" y="160" width="64" height="5" rx="2" fill="#3f5a74"/>` +
    `<path d="M40,170q20,-9 34,0z" fill="#8f9a52"/>` +
    `<g fill="#3f3a34"><circle cx="42" cy="190" r="5"/><circle cx="72" cy="190" r="5"/></g></g>` +
    `<g><rect x="96" y="164" width="60" height="24" fill="#4f6b8a"/><rect x="94" y="160" width="64" height="5" rx="2" fill="#3f5a74"/>` +
    `<path d="M110,170q20,-9 34,0z" fill="#8f9a52"/>` +
    `<g fill="#3f3a34"><circle cx="112" cy="190" r="5"/><circle cx="142" cy="190" r="5"/></g></g>` +
    // 刈る人
    person(300, 186, 30, "#f5b31c") +
    arm(300, 168, 18, 10) +
    `<path d="M318,178q12,4 16,14" stroke="#c9c4b0" stroke-width="3" fill="none"/>` +
    person(348, 188, 28, "#3f6b9a") +
    `<g fill="#8a6f4a"><path d="M356,196l-4,-14h30l-4,14z"/></g>` +
    `<g fill="#7f9a4a">${rep(6, (i) => `<path d="M${r1(180 + i * 12)},210q4,-14 8,0z"/>`)}</g>`,

  /**
   * ピーターマリッツバーグ。**赤煉瓦の市庁舎と、雨に濡れた駅のホーム。**
   * 座席を理由に列車から降ろされた話が起きたのは、この駅である。
   * ベンチは手前(y>170)の中央に置いた。**ここは隠れない。**
   */
  colonialcapital:
    sky("#a8b4bc", "#d4dcdc", 112) +
    `<g fill="#b8c0c4" opacity=".8"><ellipse cx="110" cy="34" rx="70" ry="16"/><ellipse cx="300" cy="28" rx="66" ry="14"/></g>` +
    hills(118, "#6f8a72", 4) +
    `<g fill="#dfe6e6" opacity=".5"><rect x="0" y="100" width="400" height="18"/></g>` +
    ground(112, "#8f9a78") +
    // 赤煉瓦の市庁舎(左)
    `<rect x="14" y="82" width="128" height="52" fill="#a8563c"/>` +
    `<g stroke="#8f4630" stroke-width="1" opacity=".6" fill="none">${rep(6, (i) => `<path d="M14,${r1(88 + i * 8)}h128"/>`)}</g>` +
    `<path d="M8,82h140l-12,-10H20z" fill="#5f6b76"/>` +
    `<rect x="52" y="30" width="34" height="52" fill="#a8563c"/>` +
    `<path d="M46,30h46L69,10z" fill="#5f6b76"/>` +
    `<circle cx="69" cy="46" r="10" fill="#f2ede0"/>` +
    `<circle cx="69" cy="46" r="8" fill="#e0d8c4"/>` +
    `<g stroke="#4a4436" stroke-width="1.4" fill="none"><path d="M69,46V40M69,46l4.4,3"/></g>` +
    `<g fill="#e0d8c4">${rep(6, (i) => `<path d="M${r1(24 + i * 20)},112V96a6,6 0 0 1 12,0v16z"/>`)}</g>` +
    `<g fill="#5f7f96">${rep(6, (i) => `<path d="M${r1(26 + i * 20)},110V97a4,4 0 0 1 8,0v13z"/>`)}</g>` +
    `<path d="M66,134v-18h20v18z" fill="#4a3a24"/>` +
    // 駅舎と屋根(右)
    `<rect x="266" y="96" width="120" height="34" fill="#c2b49c"/>` +
    `<path d="M256,96h140l-12,-12H268z" fill="#7f8a94"/>` +
    `<g fill="#5f7f96">${rep(4, (i) => `<rect x="${r1(276 + i * 28)}" y="104" width="14" height="16"/>`)}</g>` +
    `<g fill="#8f8578"><rect x="256" y="128" width="144" height="4"/>${rep(4, (i) => `<rect x="${r1(268 + i * 40)}" y="132" width="3.4" height="24"/>`)}</g>` +
    // ホーム
    ground(134, "#7f8a72") +
    band(150, 12, "#8a8272") +
    rails(158) +
    band(168, 14, "#c2b9a2") +
    `<rect x="0" y="168" width="400" height="2.6" fill="#f5b31c" opacity=".75"/>` +
    ground(182, "#9a9280") +
    `<g stroke="#8a8272" stroke-width="1.4" opacity=".5" fill="none">${rep(5, (i) => `<path d="M0,${r1(188 + i * 5)}h400"/>`)}</g>` +
    // ベンチ(手前中央・隠れない)
    `<g><rect x="150" y="184" width="100" height="6" rx="2" fill="#6b5330"/>` +
    `<rect x="150" y="192" width="100" height="5" rx="2" fill="#7f6a48"/>` +
    `<g fill="#5a4630"><rect x="156" y="176" width="5" height="10"/><rect x="196" y="176" width="5" height="10"/><rect x="238" y="176" width="5" height="10"/></g>` +
    `<rect x="150" y="172" width="100" height="5" rx="2" fill="#6b5330"/>` +
    `<g fill="#4a4436"><rect x="156" y="197" width="5" height="13"/><rect x="238" y="197" width="5" height="13"/></g></g>` +
    `<g fill="#8a6f4a"><rect x="262" y="192" width="26" height="18" rx="2"/><rect x="262" y="196" width="26" height="3" fill="#6b5330"/><path d="M270,192v-4h10v4z" fill="none" stroke="#6b5330" stroke-width="2"/></g>` +
    `<g><rect x="352" y="150" width="3.4" height="34" fill="#5a5248"/><path d="M346,146h16l-3,8h-10z" fill="#3f4a55"/><circle cx="354" cy="152" r="3" fill="#f5d06a"/></g>` +
    person(52, 200, 28, "#2f3a4a"),

  /**
   * イサンドルワナ。**草原と、白い石積み。**
   * 岩山の形(頭を伏せた獣のような輪郭)がこの土地の目印。
   * 石積みは倒れた場所に置かれたので、散らばっているのが正しい。
   */
  battleplain:
    sky("#8fb4cc", "#dce0cc", 116) +
    `<g fill="#a8aca0" opacity=".8"><ellipse cx="90" cy="36" rx="72" ry="16"/><ellipse cx="300" cy="30" rx="64" ry="14"/></g>` +
    // 岩山(右) — 上が平たくて片側が急に落ちる輪郭
    `<path d="M254,120q14,-30 44,-38q22,-6 34,4q12,10 20,34z" fill="#6f6a5e"/>` +
    `<path d="M254,120q14,-30 44,-38q10,-3 18,-1q-30,12 -40,39z" fill="#8a8578"/>` +
    `<g stroke="#5a5248" stroke-width="1.6" opacity=".7" fill="none"><path d="M290,92l-8,26M312,88l4,30M332,96l6,22"/></g>` +
    hills(122, "#8a9070", 4) +
    ground(116, "#b8a868") +
    `<path d="M0,134q90,-14 190,-6t210,12v22H0z" fill="#c2ab68"/>` +
    ground(140, "#c2a860") +
    `<g stroke="#a8905a" stroke-width="2" opacity=".5" fill="none"><path d="M0,154q100,-8 200,0t200,0M0,172q100,-8 200,0t200,0M0,192q100,-8 200,0t200,0"/></g>` +
    // 白い石積み(散らばる)
    `<g>${rep(9, (i) => {
      const x = r1(18 + ((i * 71) % 370));
      const y = r1(150 + ((i * 37) % 52));
      const s = r1(0.7 + ((i * 13) % 7) / 8);
      return (
        `<ellipse cx="${x}" cy="${r1(y + 2)}" rx="${r1(11 * s)}" ry="${r1(3 * s)}" fill="#000" opacity=".13"/>` +
        `<path d="M${r1(x - 10 * s)},${y}q${r1(10 * s)},${r1(-16 * s)} ${r1(20 * s)},0z" fill="#e8e4d8"/>` +
        `<path d="M${r1(x - 6 * s)},${y}q${r1(6 * s)},${r1(-10 * s)} ${r1(12 * s)},0z" fill="#f2ede0"/>` +
        `<circle cx="${r1(x - 3 * s)}" cy="${r1(y - 5 * s)}" r="${r1(2.4 * s)}" fill="#dcd6c4"/>`
      );
    })}</g>` +
    aloe(36, 190, 20) +
    aloe(370, 176, 16) +
    `<g fill="#8f9a5c"><ellipse cx="130" cy="164" rx="16" ry="5"/><ellipse cx="252" cy="182" rx="18" ry="6"/><ellipse cx="322" cy="160" rx="14" ry="5"/></g>` +
    // 手前の草の房
    `<g stroke="#a8905a" stroke-width="2" stroke-linecap="round" fill="none">${rep(8, (i) => {
      const x = r1(14 + i * 50);
      return `<path d="M${x},210l-5,-14M${x},210l1,-17M${x},210l6,-13"/>`;
    })}</g>`,

  /**
   * 東ケープの港(グケベルハ・イーストロンドン)。
   * 旧倉庫街と埠頭。奥に河口の鉄道橋。
   */
  ecport:
    sky("#8fc4e8", "#dfe8ee", 96) +
    clouds(110, 26, 1) +
    clouds(324, 22, 0.8) +
    // 河口の鉄道橋(右奥)
    `<g fill="#7f8a94"><rect x="256" y="86" width="144" height="6"/>${rep(5, (i) => `<rect x="${r1(266 + i * 30)}" y="92" width="5" height="16"/>`)}</g>` +
    `<g stroke="#7f8a94" stroke-width="2" fill="none">${rep(4, (i) => `<path d="M${r1(268 + i * 32)},86l16,-14l16,14"/>`)}</g>` +
    // 倉庫街
    ground(96, "#6f8a9a") +
    `<g>${rep(6, (i) => {
      const x = r1(4 + i * 42);
      const h = 40 + (i % 3) * 8;
      return (
        `<rect x="${x}" y="${r1(140 - h)}" width="36" height="${h}" fill="${i % 2 ? "#a8563c" : "#96513c"}"/>` +
        `<path d="M${r1(x - 3)},${r1(140 - h)}h42l-6,-12h-30z" fill="#7f8a94"/>` +
        `<g fill="#5f6b76"><rect x="${r1(x + 5)}" y="${r1(148 - h)}" width="10" height="12"/><rect x="${r1(x + 22)}" y="${r1(148 - h)}" width="10" height="12"/></g>` +
        `<rect x="${r1(x + 12)}" y="122" width="13" height="18" fill="#4a3a24"/>`
      );
    })}</g>` +
    `<g>${rep(4, (i) => `<rect x="${r1(262 + i * 34)}" y="${r1(110 + (i % 2) * 6)}" width="28" height="${r1(30 - (i % 2) * 6)}" fill="#b8ae98"/><path d="M${r1(260 + i * 34)},${r1(110 + (i % 2) * 6)}h32l-4,-8h-24z" fill="#8f8578"/>`)}</g>` +
    // 埠頭のクレーン
    `<g fill="#f5b31c"><rect x="330" y="66" width="6" height="74"/><rect x="292" y="64" width="88" height="6"/><rect x="320" y="70" width="26" height="12"/></g>` +
    `<g stroke="#c98f15" stroke-width="1.6" fill="none"><path d="M298,70v14M368,70v10M333,70l-34,-6M333,70l42,-6"/></g>` +
    `<path d="M298,84v20" stroke="#5a5248" stroke-width="1.4" fill="none"/>` +
    `<rect x="291" y="104" width="14" height="10" fill="#8a4a3c"/>` +
    // 岸壁と線路
    ground(140, "#9a9280") +
    band(146, 12, "#8a8272") +
    rails(152) +
    band(162, 10, "#b8ae98") +
    `<rect x="0" y="162" width="400" height="2.6" fill="#8f8578"/>` +
    // 水(手前)
    band(172, 38, "#3f7f9f") +
    `<path d="M0,172q100,8 200,0t200,6v8H0z" fill="#4f8fb0"/>` +
    ripples(184, "#a8d8e8") +
    `<g fill="#000" opacity=".18"><rect x="0" y="172" width="400" height="6"/></g>` +
    // 係留された漁船
    `<path d="M244,190h84q-10,14 -42,14t-42,-14z" fill="#c9bc9c"/>` +
    `<path d="M244,190h84l-4,5h-76z" fill="#3f5a74"/>` +
    `<rect x="282" y="168" width="3" height="22" fill="#6b5330"/>` +
    `<path d="M285,170h20l-6,10h-14z" fill="#f6efe2"/>` +
    `<g fill="#6f6a5e"><rect x="60" y="164" width="8" height="12" rx="3"/><rect x="140" y="164" width="8" height="12" rx="3"/></g>` +
    person(40, 162, 26, "#f5b31c") +
    `<g fill="#f6efe2" opacity=".85"><path d="M330,110c6,-4 11,-4 14,-1c3,-4 8,-3 14,1c-6,-1 -11,1 -14,3c-3,-2 -8,-4 -14,-3z"/></g>`,

  /**
   * ホームランドの首都(ムタタ・ビショ)。
   * **農地の中に、新造の行政庁舎が唐突に建つ。**周りは丘とロンダベル、牛。
   * 舗装された道は庁舎の前で途切れる。誰からも承認されなかった「国」の形。
   */
  homelandcapital:
    sky("#8fc4e8", "#e0ecdc", 110) +
    clouds(70, 26, 0.9) +
    clouds(322, 22, 0.8) +
    `<path d="M0,116q56,-26 120,-14t130,-8q70,-10 150,14v40H0z" fill="#6f9a58"/>` +
    ground(110, "#7f9a52") +
    // 丘の上のロンダベル(点々と)
    rondavelHut(28, 128, 11) +
    rondavelHut(62, 126, 9) +
    rondavelHut(104, 130, 12) +
    rondavelHut(354, 128, 11) +
    rondavelHut(388, 131, 9) +
    // 新造の行政庁舎(中央よりやや右・水平に長い)
    `<rect x="196" y="98" width="176" height="46" fill="#dcd6c4"/>` +
    `<rect x="196" y="94" width="176" height="6" fill="#b8b0a0"/>` +
    `<g fill="#5f7f96">${rep(9, (i) => `<rect x="${r1(204 + i * 19)}" y="106" width="12" height="14"/>`)}</g>` +
    `<g fill="#5f7f96">${rep(9, (i) => `<rect x="${r1(204 + i * 19)}" y="126" width="12" height="14"/>`)}</g>` +
    `<rect x="196" y="122" width="176" height="2.6" fill="#c2bcaa"/>` +
    `<path d="M268,144v-20h30v20z" fill="#4a3a24"/>` +
    `<g fill="#cfc7b4">${rep(3, (i) => `<path d="M${r1(258 - i * 10)},${r1(144 + i * 5)}h${r1(50 + i * 20)}v4h${r1(-50 - i * 20)}z"/>`)}</g>` +
    `<g><rect x="382" y="86" width="3" height="58" fill="#c9bc9c"/><path d="M385,86h15v10h-15z" fill="#5f9a4a"/></g>` +
    // 舗装された道が、庁舎の前で途切れる
    ground(148, "#7f9a4a") +
    `<path d="M232,150h108l30,60H188z" fill="#6b6459"/>` +
    `<g stroke="#f0e8c8" stroke-width="3" stroke-dasharray="12 14" opacity=".5" fill="none"><path d="M286,152L280,210"/></g>` +
    `<path d="M188,210h182v-6H188z" fill="#8f8a72"/>` +
    // 何もない野
    `<g stroke="#6f8a44" stroke-width="2" opacity=".5" fill="none"><path d="M0,164q90,-8 180,0M0,184q90,-8 180,0M0,204q90,-8 180,0"/></g>` +
    // ングニ牛。**背に肩こぶ、頭の上に外へ張り出す角**。この2つが無いと
    // 「四つ足の獣」に落ちる(手引き §4.1)。
    `<g><ellipse cx="72" cy="176" rx="23" ry="11" fill="#7f5238"/>` +
    `<path d="M56,168q8,-9 17,-1z" fill="#7f5238"/>` +
    `<ellipse cx="76" cy="176" rx="12" ry="7" fill="#f2ede0" opacity=".85"/>` +
    `<path d="M92,170q7,-5 13,-1l2,10q-8,3 -13,-2z" fill="#7f5238"/>` +
    `<g stroke="#e8dcc0" stroke-width="2.6" stroke-linecap="round" fill="none"><path d="M97,166q-4,-7 -11,-7M104,166q5,-7 12,-6"/></g>` +
    `<g fill="#5f4030"><rect x="58" y="186" width="4.4" height="15"/><rect x="82" y="186" width="4.4" height="15"/><rect x="94" y="180" width="4" height="21"/></g>` +
    `<path d="M50,178q-9,5 -7,16" stroke="#5f4030" stroke-width="2.6" fill="none"/>` +
    shade(74, 202, 26, 4, ".14") + `</g>` +
    `<g><ellipse cx="150" cy="196" rx="15" ry="8" fill="#5f4a34"/>` +
    `<path d="M164,192q5,-4 9,-1l1,7q-6,2 -10,-2z" fill="#5f4a34"/>` +
    `<g stroke="#e8dcc0" stroke-width="1.8" stroke-linecap="round" fill="none"><path d="M167,189q-3,-5 -8,-5M173,189q4,-5 9,-4"/></g>` +
    `<g fill="#3f3428"><rect x="141" y="202" width="3.4" height="8"/><rect x="157" y="202" width="3.4" height="8"/></g></g>` +
    person(340, 190, 26, "#3f6b9a"),

  /**
   * グラーフ・ライネット。**川に囲まれた歴史地区。**
   * カルーの平頂丘、白い破風の家並み、教会の尖塔。手前は川の湾曲部。
   */
  riverloop:
    sky("#9cc8e4", "#e8e0c4", 112) +
    sun(322, 36, 15, "#f8dc9a") +
    koppie(70, 116, 190, 52) +
    koppie(280, 116, 210, 44, "#9a8360") +
    `<g stroke="#8a7358" stroke-width="1.4" opacity=".6" fill="none"><path d="M40,116l14,-34M124,116l-10,-30M300,116l10,-28"/></g>` +
    ground(112, "#c9a877") +
    // 教会の尖塔と町並み
    `<rect x="10" y="82" width="34" height="58" fill="#f2ede0"/>` +
    `<path d="M6,82h42L27,44z" fill="#7f8a94"/>` +
    `<rect x="26" y="34" width="2.4" height="10" fill="#8a8578"/>` +
    `<g fill="#5f7f96"><rect x="22" y="92" width="10" height="16"/></g>` +
    `<g>${rep(5, (i) => {
      const x = r1(58 + i * 26);
      const h = 26 + (i % 3) * 5;
      return (
        `<rect x="${x}" y="${r1(140 - h)}" width="22" height="${h}" fill="#f2ede0"/>` +
        `<path d="M${r1(x - 3)},${r1(140 - h)}h28l-4,-6h-20z" fill="#8f8578"/>` +
        `<path d="M${r1(x + 7)},${r1(140 - h)}v-7q0,-4 4,-4t4,4v7z" fill="#f2ede0"/>` +
        `<rect x="${r1(x + 7)}" y="${r1(148 - h)}" width="8" height="10" fill="#5f7f96"/>`
      );
    })}</g>` +
    `<g>${rep(5, (i) => {
      const x = r1(230 + i * 34);
      const h = 28 + (i % 2) * 6;
      return (
        `<rect x="${x}" y="${r1(140 - h)}" width="26" height="${h}" fill="#e8e0cc"/>` +
        `<path d="M${r1(x - 3)},${r1(140 - h)}h32l-5,-7h-22z" fill="#8f5642"/>` +
        `<rect x="${r1(x + 8)}" y="${r1(148 - h)}" width="10" height="12" fill="#5f7f96"/>`
      );
    })}</g>` +
    ground(140, "#b89a68") +
    // 川の湾曲部(手前でぐるりと回る)
    `<path d="M0,168q60,-16 130,-8t120,20q60,20 150,10v20H0z" fill="#5f8f8a"/>` +
    `<path d="M0,178q60,-14 130,-6t120,18q60,18 150,8v12H0z" fill="#4f7f7a"/>` +
    `<g stroke="#a8ccc4" stroke-width="2" opacity=".6" fill="none"><path d="M40,182q60,-10 120,4M200,196q70,12 140,4"/></g>` +
    ground(200, "#b89a68") +
    aloe(46, 200, 22) +
    aloe(346, 198, 18) +
    `<g fill="#8f7a52"><path d="M136,208l12,-8l14,3l3,7z"/><path d="M226,210l10,-7l11,3l1,4z"/></g>` +
    person(288, 172, 22, "#c2453c"),

  /**
   * アピントン。**砂漠のただ中の葡萄畑と、手で掘った灌漑水路。**
   * 赤い砂丘、ナツメヤシの並木、緑の畝。水路が景色を分ける。
   */
  desertvineyard:
    sky("#8fc0dc", "#f0d8a8", 120) +
    sun(300, 34, 18, "#f8dc9a") +
    `<circle cx="300" cy="34" r="28" fill="#f8dc9a" opacity=".2"/>` +
    // 赤い砂丘
    `<path d="M0,118q60,-26 130,-14t120,-10q70,-12 150,16v30H0z" fill="#b8703c"/>` +
    `<path d="M0,126q70,-20 140,-8t130,-8q60,-8 130,14v20H0z" fill="#a8603c"/>` +
    `<g stroke="#96522f" stroke-width="1.6" opacity=".6" fill="none"><path d="M20,124q40,-14 90,-6M240,120q50,-12 110,2"/></g>` +
    ground(120, "#a8603c") +
    // ナツメヤシの並木
    datePalm(28, 148, 48) +
    datePalm(72, 146, 40) +
    datePalm(116, 149, 44) +
    datePalm(338, 148, 46) +
    datePalm(370, 146, 38) +
    datePalm(396, 150, 42) +
    `<g fill="#000" opacity=".12">${rep(6, (i) => `<ellipse cx="${[28, 72, 116, 338, 370, 396][i]}" cy="${[149, 147, 150, 149, 147, 151][i]}" rx="12" ry="3.4"/>`)}</g>` +
    // ワイン蔵
    `<rect x="252" y="118" width="70" height="30" fill="#e0d2b4"/>` +
    `<path d="M246,118h82l-9,-12h-64z" fill="#8f5642"/>` +
    `<g fill="#5f7f96"><rect x="264" y="124" width="12" height="14"/><rect x="298" y="124" width="12" height="14"/></g>` +
    ground(150, "#8f9a4a") +
    // 灌漑水路(手前を横切る)
    `<path d="M0,164h400v18H0z" fill="#8a8578"/>` +
    `<path d="M0,168h400v11H0z" fill="#4f8fa8"/>` +
    `<g stroke="#a8d8e8" stroke-width="1.6" opacity=".7" fill="none"><path d="M30,172h60M160,175h70M300,171h74"/></g>` +
    `<g fill="#b8ae98"><rect x="0" y="162" width="400" height="3"/><rect x="0" y="180" width="400" height="3"/></g>` +
    // 取水口の水門
    `<g><rect x="60" y="150" width="6" height="32" fill="#8f8578"/><rect x="112" y="150" width="6" height="32" fill="#8f8578"/>` +
    `<rect x="58" y="146" width="62" height="6" fill="#7f8a94"/><rect x="80" y="152" width="18" height="20" fill="#5a6470"/>` +
    `<rect x="86" y="140" width="5" height="14" fill="#5a6470"/><circle cx="88.5" cy="138" r="5" fill="#c2453c"/></g>` +
    // 手前の葡萄畑
    ground(184, "#7f9a4a") +
    vineRow(198, 9, 7) +
    `<g fill="#8fb45a" opacity=".5"><ellipse cx="90" cy="206" rx="50" ry="6"/><ellipse cx="300" cy="208" rx="60" ry="5"/></g>` +
    person(348, 200, 26, "#f6efe2") +
    arm(348, 186, -14, 6),

  /**
   * スプリングボック。**雨が来た数週間だけ、砂漠が花畑になる。**
   * 手前を一面のオレンジと白の花で埋め、奥に乾いた岩の丘とコーカーブーム。
   */
  namaqualand:
    sky("#7fb8dc", "#dfe4d0", 112) +
    sun(322, 32, 15, "#f8dc9a") +
    clouds(96, 26, 1) +
    // 乾いた岩の丘
    `<path d="M0,118L60,88L130,110L206,84L280,112L340,92L400,116V150H0z" fill="#8a7f68"/>` +
    `<g fill="#7f7460" opacity=".7"><path d="M60,88L130,110L92,112zM206,84L280,112L232,110zM340,92L400,116L358,114z"/></g>` +
    `<g fill="#a8a08c"><ellipse cx="72" cy="104" rx="14" ry="8"/><ellipse cx="300" cy="110" rx="16" ry="7"/><ellipse cx="182" cy="102" rx="12" ry="6"/></g>` +
    ground(112, "#b8a878") +
    // コーカーブーム(アロエの木)
    `<g><path d="M42,148V116" stroke="#a8967c" stroke-width="9" fill="none"/>` +
    `<g stroke="#a8967c" stroke-width="4.4" stroke-linecap="round" fill="none"><path d="M42,120l-13,-12M42,120l14,-13M42,112l-8,-14M42,112l9,-13"/></g>` +
    `<g fill="#5f8f5a"><ellipse cx="27" cy="105" rx="8" ry="5"/><ellipse cx="58" cy="104" rx="8" ry="5"/><ellipse cx="33" cy="96" rx="7" ry="4.4"/><ellipse cx="52" cy="96" rx="7" ry="4.4"/></g></g>` +
    `<g><path d="M362,142V118" stroke="#a8967c" stroke-width="7" fill="none"/>` +
    `<g stroke="#a8967c" stroke-width="3.4" stroke-linecap="round" fill="none"><path d="M362,122l-10,-10M362,122l11,-10"/></g>` +
    `<g fill="#5f8f5a"><ellipse cx="350" cy="110" rx="7" ry="4.4"/><ellipse cx="375" cy="110" rx="7" ry="4.4"/></g></g>` +
    // 花の絨毯
    ground(126, "#9aa462") +
    `<path d="M0,140q90,-14 190,-6t210,10v66H0z" fill="#a8b05a"/>` +
    flowerCarpet(134, 208, 13, 6) +
    // 砂の轍
    `<path d="M0,210L150,140h32L96,210z" fill="#c2a877" opacity=".7"/>` +
    `<g stroke="#a8906a" stroke-width="2" opacity=".6" fill="none"><path d="M156,142L34,210M172,142L74,210"/></g>` +
    // 花を見に来た人と、3本目のコーカーブーム。
    // **獣は描かない。**輪郭に種が出ない生きものは、この寸法では名前を言えない
    // 塊にしかならない(手引き §4.1)。町の名は移動路の標識のほうで示す。
    `<g><path d="M300,142V120" stroke="#a8967c" stroke-width="8" fill="none"/>` +
    `<g stroke="#a8967c" stroke-width="4" stroke-linecap="round" fill="none"><path d="M300,124l-12,-11M300,124l13,-12M300,116l-7,-12"/></g>` +
    `<g fill="#5f8f5a"><ellipse cx="286" cy="110" rx="7.4" ry="4.6"/><ellipse cx="314" cy="109" rx="7.4" ry="4.6"/><ellipse cx="292" cy="102" rx="6.4" ry="4"/></g></g>` +
    person(286, 186, 28, "#c2453c") +
    arm(286, 170, 14, 10) +
    person(312, 190, 26, "#3f6b9a") +
    arm(312, 176, -12, 8) +
    shade(286, 187, 12, 3, ".14") +
    shade(312, 191, 11, 3, ".14") +
    `<g><rect x="34" y="176" width="3.4" height="24" fill="#8f8578"/><rect x="16" y="168" width="40" height="12" fill="#f5b31c"/>` +
    `<path d="M36,171l-6,7h12z" fill="#3f3a34"/></g>`,

  /**
   * サザーランド。**国内で最も寒く、最も空の澄んだ町。**
   * 夜。天の川の帯、高原に並ぶ望遠鏡のドーム、霜の降りた地面。
   * **いちばん明るいのは霜**なので、建物は2段落としてある。
   */
  darkskyplateau:
    sky("#141c3a", "#2a3358", 126) +
    stars(46, 4, 108) +
    `<g fill="#5f6ba8" opacity=".3"><path d="M0,26q120,40 240,20t160,26v18q-140,-30 -250,-6T0,50z"/></g>` +
    `<g fill="#8f9ad8" opacity=".25"><path d="M0,34q120,38 240,18t160,24v8q-140,-28 -250,-4T0,52z"/></g>` +
    stars(20, 20, 70) +
    // 高原の稜線
    `<path d="M0,132L70,120L160,128L250,116L340,126L400,118V160H0z" fill="#1f2740"/>` +
    ground(126, "#2a3348") +
    // 望遠鏡のドーム(右)
    `<g><path d="M258,146V132a22,22 0 0 1 44,0v14z" fill="#4a5468"/>` +
    `<path d="M280,110a22,22 0 0 0 -22,22h10a12,12 0 0 1 12,-12z" fill="#5f6b80"/>` +
    `<path d="M276,110h9v22h-9z" fill="#0f1424"/>` +
    `<rect x="256" y="146" width="48" height="10" fill="#3f4a5c"/></g>` +
    `<g><path d="M330,148V138a16,16 0 0 1 32,0v10z" fill="#4a5468"/>` +
    `<path d="M346,122a16,16 0 0 0 -16,16h7a9,9 0 0 1 9,-9z" fill="#5f6b80"/>` +
    `<path d="M343,122h7v16h-7z" fill="#0f1424"/>` +
    `<rect x="328" y="148" width="36" height="8" fill="#3f4a5c"/></g>` +
    `<g><path d="M386,150V142a12,12 0 0 1 24,0v8z" fill="#4a5468"/><rect x="384" y="150" width="24" height="7" fill="#3f4a5c"/></g>` +
    `<g stroke="#8f9ad8" stroke-width="1" opacity=".35" fill="none"><path d="M280,110L266,54M346,122L336,72"/></g>` +
    // 霜の地面(いちばん明るい)
    ground(156, "#c8d4dc") +
    `<path d="M0,170q90,-10 190,-4t210,8v36H0z" fill="#dce6ec"/>` +
    `<g fill="#b0c0cc"><ellipse cx="80" cy="180" rx="52" ry="7"/><ellipse cx="300" cy="192" rx="60" ry="7"/><ellipse cx="186" cy="204" rx="44" ry="6"/></g>` +
    // 農家(霜より2段暗い)
    `<rect x="26" y="134" width="62" height="24" fill="#5f5a52"/>` +
    `<path d="M20,134h74l-11,-12H31z" fill="#4a4640"/>` +
    `<rect x="40" y="140" width="13" height="13" fill="#f5d06a"/>` +
    `<rect x="66" y="142" width="11" height="11" fill="#a8967c"/>` +
    `<g fill="#3f3a34"><rect x="96" y="124" width="3" height="34"/><rect x="90" y="120" width="15" height="5"/></g>` +
    `<g fill="#f5d06a" opacity=".2"><ellipse cx="46" cy="152" rx="26" ry="14"/></g>` +
    // 羊(霜の上)
    `<g fill="#f2f6f8"><ellipse cx="132" cy="184" rx="12" ry="8"/><ellipse cx="124" cy="180" rx="6" ry="4.4"/><ellipse cx="138" cy="179" rx="6" ry="4.4"/></g>` +
    `<g fill="#4a5468"><ellipse cx="144" cy="181" rx="4.4" ry="3.6"/><rect x="126" y="190" width="2.4" height="7"/><rect x="136" y="190" width="2.4" height="7"/></g>` +
    `<g fill="#f2f6f8"><ellipse cx="222" cy="196" rx="13" ry="9"/><ellipse cx="213" cy="192" rx="6" ry="4.4"/><ellipse cx="229" cy="191" rx="6" ry="4.4"/></g>` +
    `<g fill="#4a5468"><ellipse cx="236" cy="193" rx="4.6" ry="3.8"/><rect x="215" y="203" width="2.6" height="7"/><rect x="227" y="203" width="2.6" height="7"/></g>` +
    `<g stroke="#f2f6f8" stroke-width="1.6" opacity=".5" fill="none">${rep(5, (i) => `<path d="M${r1(300 + i * 22)},210l-4,-10M${r1(304 + i * 22)},210l3,-9"/>`)}</g>`,

  // __BG_END__
};

// ---------------------------------------------------------------------------
// シンボル(24×24)
// ---------------------------------------------------------------------------

export const SOUTHAFRICA_MARKS = {
  /**
   * タウンシップ。密集した簡易住宅の屋根の段と、その前を走る通勤客車。
   * 19pxで残るのは「屋根の段々」と「その下を横切る帯」の2つ。
   */
  township:
    '<path d="M0,21.8h24V24H0z" fill="#5f4f34"/>' +
    // 奥の屋根の段(繰り返し)
    '<g fill="#8a949c"><path d="M0.6,11.6h6.6v5.4H0.6z"/><path d="M8,8.4h7v8.6H8z"/><path d="M15.8,10.6h6.2v6.4h-6.2z"/></g>' +
    '<g fill="#a8503c"><path d="M0,11.6h7.8l-1,-2.6H1z"/><path d="M7.2,8.4h8.6l-1,-2.8H8.2z"/><path d="M15,10.6h7.8l-1,-2.6h-5.8z"/></g>' +
    '<g fill="#3f4a55"><rect x="2" y="12.8" width="2.2" height="2.6"/><rect x="9.8" y="10" width="2.6" height="2.8"/><rect x="17.4" y="12" width="2.2" height="2.6"/></g>' +
    '<rect x="22" y="9.4" width="2" height="7.6" fill="#7f5642"/>' +
    // 手前の通勤客車(帯として太く)
    '<rect x="0.4" y="17" width="23.2" height="5" fill="#c2a83c"/>' +
    '<rect x="0" y="15.6" width="24" height="1.8" rx="0.8" fill="#4a4436"/>' +
    '<rect x="0.4" y="20" width="23.2" height="2" fill="#8a6f22"/>' +
    '<g fill="#2f3a44"><rect x="2" y="17.8" width="3.4" height="2.2"/><rect x="7.6" y="17.8" width="3.4" height="2.2"/><rect x="13.2" y="17.8" width="3.4" height="2.2"/><rect x="18.8" y="17.8" width="3.4" height="2.2"/></g>' +
    '<g fill="#2f2a24"><circle cx="5.4" cy="22.4" r="1.6"/><circle cx="18.6" cy="22.4" r="1.6"/></g>',

  /** 金鉱。深い立坑の巻き上げ櫓。滑車が2枚並ぶことで巻き上げ機だと分かる。 */
  goldmine:
    '<path d="M0,21.6h24V24H0z" fill="#6b5330"/>' +
    '<path d="M14.8,21.6L11.6,5.2l1.8,-0.4l4.6,16.8z" fill="#3f4a55"/>' +
    '<path d="M6.4,21.6L9.2,3.4h5.4l2.8,18.2z" fill="#5a6470"/>' +
    '<g fill="#3f4a55"><rect x="8.6" y="7" width="6.6" height="1.1"/><rect x="8.1" y="11" width="7.6" height="1.1"/><rect x="7.6" y="15" width="8.6" height="1.1"/><rect x="7.1" y="19" width="9.6" height="1.1"/></g>' +
    '<g fill="#2f3a44"><circle cx="10.2" cy="2.6" r="2.4"/><circle cx="14.2" cy="2.6" r="2.4"/></g>' +
    '<g fill="#8a94a0"><circle cx="10.2" cy="2.6" r="0.9"/><circle cx="14.2" cy="2.6" r="0.9"/></g>' +
    '<rect x="1" y="17.4" width="5.6" height="4.2" fill="#7f8a94"/>' +
    '<rect x="1" y="17.4" width="5.6" height="1" fill="#5a6470"/>' +
    '<g fill="#f5b31c"><circle cx="20.4" cy="20" r="1.5"/><circle cx="22.4" cy="21.2" r="1.2"/></g>',

  /** 首都。丸屋根と列柱の政府庁舎。 */
  capital:
    '<path d="M0,21.4h24V24H0z" fill="#8a9a62"/>' +
    '<rect x="1.4" y="12" width="21.2" height="9.4" fill="#e0d2b4"/>' +
    '<path d="M0.6,12h22.8l-2.4,-2.4H3z" fill="#a8763c"/>' +
    '<path d="M8.6,9.6h6.8V6.4a3.4,3.4 0 0 0 -6.8,0z" fill="#c2603c"/>' +
    '<rect x="11.4" y="1.6" width="1.2" height="4" fill="#8a7f66"/>' +
    '<circle cx="12" cy="1.4" r="1.2" fill="#f5b31c"/>' +
    '<g fill="#c9bc9c"><rect x="3.2" y="13.4" width="1.9" height="8"/><rect x="7" y="13.4" width="1.9" height="8"/><rect x="10.8" y="13.4" width="1.9" height="8"/><rect x="14.6" y="13.4" width="1.9" height="8"/><rect x="18.4" y="13.4" width="1.9" height="8"/></g>' +
    '<g fill="#7f6a48"><rect x="2.8" y="12.8" width="2.7" height="1"/><rect x="6.6" y="12.8" width="2.7" height="1"/><rect x="10.4" y="12.8" width="2.7" height="1"/><rect x="14.2" y="12.8" width="2.7" height="1"/><rect x="18" y="12.8" width="2.7" height="1"/></g>' +
    '<rect x="0.4" y="21" width="23.2" height="1.4" fill="#b8ae98"/>',

  /** 司法。天秤。 */
  courthouse:
    '<path d="M0,21.6h24V24H0z" fill="#8a8578"/>' +
    '<path d="M6.6,21.6c0,-2.4 2,-3 5.4,-3s5.4,0.6 5.4,3z" fill="#8f8578"/>' +
    '<rect x="11" y="3.6" width="2" height="15.4" fill="#c9bc9c"/>' +
    '<rect x="2.4" y="5.6" width="19.2" height="1.8" rx="0.9" fill="#c9bc9c"/>' +
    '<circle cx="12" cy="3" r="1.8" fill="#f5b31c"/>' +
    '<g stroke="#8f8578" stroke-width="0.9" fill="none"><path d="M5.4,7.4v3.4M18.6,7.4v3.4"/></g>' +
    '<path d="M1.2,10.8h8.4c-0.6,3 -2.2,4.4 -4.2,4.4s-3.6,-1.4 -4.2,-4.4z" fill="#f5b31c"/>' +
    '<path d="M14.4,10.8h8.4c-0.6,3 -2.2,4.4 -4.2,4.4s-3.6,-1.4 -4.2,-4.4z" fill="#f5b31c"/>' +
    '<g fill="#c98f15"><path d="M1.2,10.8h8.4l-0.4,1.6H1.6z"/><path d="M14.4,10.8h8.4l-0.4,1.6h-7.6z"/></g>',

  /** 田園都市。竪坑に突き当たらないよう同心円に敷かれた街路。 */
  gardencity:
    '<circle cx="12" cy="12" r="11.6" fill="#7f9a52"/>' +
    '<g fill="none" stroke="#e0d2b4" stroke-width="1.6"><circle cx="12" cy="12" r="9.4"/><circle cx="12" cy="12" r="6.2"/><circle cx="12" cy="12" r="3.2"/></g>' +
    '<g stroke="#e0d2b4" stroke-width="1.3"><path d="M12,0.6v4M12,19.4v4M0.6,12h4M19.4,12h4"/></g>' +
    '<g fill="#8f5642"><rect x="9.2" y="1.8" width="2.2" height="2.2"/><rect x="17.4" y="6.4" width="2.2" height="2.2"/><rect x="4" y="15.4" width="2.2" height="2.2"/><rect x="16.6" y="16" width="2.2" height="2.2"/><rect x="4.6" y="6" width="2.2" height="2.2"/></g>' +
    '<path d="M11,13.6L11.6,8h1.6l0.8,5.6z" fill="#3f4a55"/>' +
    '<g fill="#2f3a44"><circle cx="11.4" cy="7.2" r="1.2"/><circle cx="13.2" cy="7.2" r="1.2"/></g>',

  /**
   * 鉄道の分岐点。**Yの字に分かれる線路**と給水塔。
   * 19pxでは線路の分岐と、太い塔の柱だけが残る。細い線は消える。
   */
  railjunction:
    '<path d="M0,15.4h24V24H0z" fill="#8a8272"/>' +
    '<path d="M0,16.6h24v1.4H0z" fill="#6b5a44"/>' +
    '<g stroke="#3f4a55" stroke-width="2.2" fill="none"><path d="M0,20.8h24"/></g>' +
    '<g stroke="#3f4a55" stroke-width="2.2" fill="none"><path d="M2,23.6L24,16.4"/></g>' +
    '<g stroke="#3f4a55" stroke-width="2" fill="none"><path d="M0,17.6L14,17.4"/></g>' +
    '<g stroke="#6b5a44" stroke-width="1" opacity=".9" fill="none"><path d="M4,19.6v4M9,19.6v4M14,18.8v4M19,17.6v4"/></g>' +
    // 給水塔(太い脚)
    '<g fill="#5f5a4e"><rect x="2.6" y="8.6" width="2.4" height="7.4"/><rect x="9.4" y="8.6" width="2.4" height="7.4"/><rect x="2.2" y="13" width="10" height="1.4"/></g>' +
    '<rect x="0.6" y="2.4" width="13.2" height="6.6" rx="1" fill="#7f8a94"/>' +
    '<rect x="0.2" y="0.8" width="14" height="2" rx="0.8" fill="#3f4a55"/>' +
    '<rect x="2.4" y="4" width="9.6" height="1.6" fill="#3f4a55" opacity=".8"/>' +
    '<path d="M6.4,9h1.6v4.4H6.4z" fill="#3f4a55"/>' +
    // 信号
    '<g><rect x="19.6" y="3" width="1.8" height="13" fill="#3f3a34"/><rect x="17" y="2.4" width="6.6" height="5.4" rx="0.8" fill="#2f3a44"/>' +
    '<circle cx="18.8" cy="5.1" r="1.4" fill="#5f9a4a"/><circle cx="21.8" cy="5.1" r="1.4" fill="#c2453c"/></g>',

  /** オレンジ色の砂岩の崖。夕陽で金色に燃える岩肌。 */
  sandstone:
    '<path d="M0,21h24v3H0z" fill="#7f9a52"/>' +
    '<path d="M0,21V7.4l5.4,-2.6l6,2.2l5,-2.8L24,6.4V21z" fill="#d8873c"/>' +
    '<path d="M0,21V13l5.4,-2.6l6,2.2l5,-2.8L24,12V21z" fill="#c26f30"/>' +
    '<path d="M5.4,4.8l6,2.2l5,-2.8l-3,8.6h-8z" fill="#e8a052"/>' +
    '<g stroke="#a8562c" stroke-width="0.9" opacity=".8" fill="none"><path d="M3,7.4l0.8,13M9.4,7.6l-0.7,13M15,5.6l1,15M20.4,6.2l-0.8,14"/></g>' +
    '<g stroke="#f0b878" stroke-width="0.8" opacity=".7" fill="none"><path d="M6.4,6.2l-0.6,14M17.8,5.4l0.7,15"/></g>' +
    '<path d="M0,21.8h24V24H0z" fill="#5f8f4a"/>' +
    '<g fill="#4f7f42"><path d="M2,21.8q1.6,-3.4 3.2,0z"/><path d="M18,21.8q1.4,-3 2.8,0z"/></g>',

  /** 見張り塔と伝令の少年。 */
  scout:
    '<path d="M0,21.6h24V24H0z" fill="#b8a878"/>' +
    '<g fill="#6b4a26"><path d="M5.2,21.6L7,4h6l1.8,17.6z"/></g>' +
    '<g stroke="#3f2c14" stroke-width="0.9" fill="none"><path d="M6.4,17.4h7.2M6.8,13.2h6.4M7.2,9h5.6M6.6,15.4l6.8,-2.2M13.4,15.4l-6.8,-2.2"/></g>' +
    '<rect x="4.4" y="1.4" width="11.2" height="3" fill="#8a6a30"/>' +
    '<path d="M3.4,1.4h13.2l-2.6,-1.4H6z" fill="#5a4020"/>' +
    '<g><rect x="16.2" y="1" width="0.9" height="6" fill="#6b5330"/><path d="M17.1,1h5l-1.4,1.6l1.4,1.7h-5z" fill="#c2453c"/></g>' +
    // 伝令の少年(走る)
    '<g><circle cx="19.4" cy="14.6" r="2" fill="#8a5a34"/>' +
    '<path d="M17.6,16.6h3.8l0.6,3.6h-5z" fill="#f5b31c"/>' +
    '<g stroke="#8a5a34" stroke-width="1.3" stroke-linecap="round" fill="none"><path d="M17.8,17.6l-2.4,1.4M21.4,17.4l2,-1.2"/></g>' +
    '<g stroke="#3f3428" stroke-width="1.4" stroke-linecap="round" fill="none"><path d="M18.6,20.2l-2,1.6M20.6,20.2l1.4,1.6"/></g></g>',

  /** 白金の立坑櫓と、足元の銀白色の延べ棒。 */
  platinummine:
    '<path d="M0,21.6h24V24H0z" fill="#a8603c"/>' +
    '<path d="M13.6,18.2L11,4.8l1.6,-0.4l3.8,13.8z" fill="#6b7684"/>' +
    '<path d="M6,18.2L8.4,3.2h4.4L15.2,18.2z" fill="#93a0ae"/>' +
    '<g fill="#6b7684"><rect x="7.9" y="6.6" width="5.4" height="0.9"/><rect x="7.5" y="10" width="6.2" height="0.9"/><rect x="7.1" y="13.4" width="7" height="0.9"/></g>' +
    '<g fill="#5a6470"><circle cx="9.4" cy="2.4" r="2.1"/><circle cx="12.8" cy="2.4" r="2.1"/></g>' +
    '<g fill="#c9d2d8"><circle cx="9.4" cy="2.4" r="0.8"/><circle cx="12.8" cy="2.4" r="0.8"/></g>' +
    // 延べ棒(白金)
    '<path d="M2,21.6l1.4,-3.2h9.2l1.4,3.2z" fill="#dfe6ea"/>' +
    '<path d="M2,21.6l1.4,-3.2h3l-1.2,3.2z" fill="#f2f6f8"/>' +
    '<path d="M13.6,18.4h5l1.4,3.2h-5z" fill="#c2ccd2"/>' +
    '<path d="M6.4,15.2l1,-2.2h7.2l1,2.2z" fill="#c9d2d8" opacity=".9"/>',

  /** カジノの明かりと、国境のゲート。 */
  resort:
    '<path d="M0,21.6h24V24H0z" fill="#3a4038"/>' +
    '<rect x="3.4" y="10.6" width="17.2" height="11" fill="#6b4a3c"/>' +
    '<path d="M2,10.6h20l-2.6,-2.4H4.6z" fill="#a8763c"/>' +
    '<path d="M8,8.2h8V5.4a4,4 0 0 0 -8,0z" fill="#c2603c"/>' +
    '<circle cx="12" cy="1" r="1.4" fill="#f8e8a8"/>' +
    '<g fill="#f5d06a"><rect x="4.6" y="12.4" width="2.4" height="2.6"/><rect x="8.6" y="12.4" width="2.4" height="2.6"/><rect x="12.6" y="12.4" width="2.4" height="2.6"/><rect x="16.6" y="12.4" width="2.4" height="2.6"/></g>' +
    '<g fill="#f5b31c"><rect x="5.6" y="16.6" width="2.6" height="5"/><rect x="10.6" y="16.6" width="2.6" height="5"/><rect x="15.6" y="16.6" width="2.6" height="5"/></g>' +
    // 遮断機
    '<g><rect x="0.4" y="14" width="1.8" height="7.6" fill="#8f8578"/>' +
    '<path d="M1.6,15.4h13.6l-1.2,2.2H1.6z" fill="#c2453c"/>' +
    '<g fill="#f6efe2"><path d="M4.4,15.4h2.6l-1.2,2.2H3.2z"/><path d="M9.4,15.4h2.6l-1.2,2.2H8.2z"/></g></g>',

  /** ロンダベル(丸屋根の伝統家屋)。 */
  rondavel:
    '<path d="M0,21.4h24V24H0z" fill="#8f9a5c"/>' +
    '<ellipse cx="12" cy="21" rx="9.4" ry="2.2" fill="#000" opacity=".16"/>' +
    '<path d="M4,21.4v-7.2h16v7.2z" fill="#e0d2b4"/>' +
    '<path d="M1.6,14.4L12,3.4l10.4,11z" fill="#b08f52"/>' +
    '<g stroke="#8f7038" stroke-width="0.9" fill="none"><path d="M12,4.4L5.4,14.2M12,4.4L8.8,14.2M12,4.4L12,14.2M12,4.4L15.2,14.2M12,4.4L18.6,14.2"/></g>' +
    '<path d="M1.2,14.2h21.6v1.5H1.2z" fill="#96793f"/>' +
    '<circle cx="12" cy="3.2" r="1.2" fill="#7f6a48"/>' +
    '<path d="M9.6,21.4v-4.6h4.8v4.6z" fill="#5a4630"/>' +
    '<g fill="#5f7f96"><rect x="5.4" y="16.6" width="2.6" height="2.4"/><rect x="16" y="16.6" width="2.6" height="2.4"/></g>',

  /** ライオンの横顔(たてがみで輪郭を作る)。 */
  safari:
    '<path d="M0,21.6h24V24H0z" fill="#c2a860"/>' +
    '<g fill="#8a5f2c"><circle cx="12" cy="12" r="10.4"/></g>' +
    '<g fill="#a8763c"><path d="M12,1.6l2.4,3.4l3.6,-1.6l-0.6,4l4,0.6l-2.6,3.2l3.2,2.6l-3.8,1.4l1.4,3.8l-4,-0.4l-1,3.9L12,20.4l-2.6,2.1l-1,-3.9l-4,0.4l1.4,-3.8L2,13.8l3.2,-2.6L2.6,8l4,-0.6L6,3.4l3.6,1.6z"/></g>' +
    '<circle cx="12" cy="12.4" r="6.6" fill="#e0a94e"/>' +
    '<g fill="#c98f4a"><ellipse cx="7" cy="7.8" rx="2" ry="2.2"/><ellipse cx="17" cy="7.8" rx="2" ry="2.2"/></g>' +
    '<g fill="#3f3428"><ellipse cx="9.6" cy="11" rx="1.2" ry="1.4"/><ellipse cx="14.4" cy="11" rx="1.2" ry="1.4"/></g>' +
    '<path d="M10.2,14.4h3.6l-1.8,1.8z" fill="#3f3428"/>' +
    '<path d="M12,16.2v1.6" stroke="#3f3428" stroke-width="0.9" fill="none"/>' +
    '<g stroke="#3f3428" stroke-width="0.8" fill="none"><path d="M9.4,15.8q-1.8,1.4 -3.2,1.6M14.6,15.8q1.8,1.4 3.2,1.6"/></g>' +
    '<path d="M9.8,17.8q2.2,1.6 4.4,0" stroke="#3f3428" stroke-width="0.9" fill="none"/>',

  /** 断崖の裂け目(神の窓)。左右の岩壁のあいだから低地が見える。 */
  canyon:
    // 崖の裂け目。**全面の背景を敷かない。**他の記号と揃えて「物」として立たせる。
    '<path d="M0,21.6h24V24H0z" fill="#6b6255"/>' +
    '<path d="M7.6,21.6V6.4q4.4,-1.6 8.8,0v15.2z" fill="#a8bcc4"/>' +
    '<path d="M7.6,21.6v-6q4.4,-1.4 8.8,0v6z" fill="#7f9490"/>' +
    '<path d="M8.4,15.4q3.6,-1.2 7.2,0" stroke="#e0eaec" stroke-width="0.9" fill="none"/>' +
    '<path d="M1.2,21.6V1.4h7.4l-1.4,4.6l1.2,4.4l-1.6,4.6l1.4,4.2l-0.8,2.4z" fill="#7f6a58"/>' +
    '<path d="M1.2,21.6V1.4h4l-1,4.6l0.8,4.6l-1.2,4.4l1,4.2l-0.8,2.4z" fill="#96806c"/>' +
    '<path d="M22.8,21.6V1.4h-7.4l1.4,4.4l-1.2,4.6l1.6,4.4l-1.4,4.4l0.8,2.4z" fill="#7f6a58"/>' +
    '<path d="M22.8,21.6V1.4h-4l1,4.6l-0.8,4.6l1.2,4.4l-1,4.2l0.8,2.4z" fill="#8f7a66"/>' +
    '<g stroke="#5f4f42" stroke-width="0.7" opacity=".8" fill="none"><path d="M3.4,3l0.8,7.4M5.6,12.4l-0.6,7.6M20.6,3.4l-0.8,7.4M18.4,13l0.8,7"/></g>' +
    '<g fill="#4f7f42"><ellipse cx="7.4" cy="4.6" rx="1.8" ry="1"/><ellipse cx="16.8" cy="7.4" rx="1.7" ry="0.9"/><ellipse cx="7" cy="16.6" rx="1.9" ry="1"/></g>',

  /** 発電所の冷却塔。すぼまった胴と立ちのぼる湯気。 */
  powerstation:
    '<path d="M0,21.6h24V24H0z" fill="#6f6a58"/>' +
    '<g fill="#c9c4b8" opacity=".85"><ellipse cx="9" cy="4" rx="5.4" ry="2.8"/><ellipse cx="15.4" cy="2.6" rx="4.4" ry="2.4"/><ellipse cx="12" cy="1" rx="3.4" ry="1.8"/></g>' +
    '<path d="M3.6,21.6C4.6,16 6.4,12 7.4,8.6h9.2c1,3.4 2.8,7.4 3.8,13z" fill="#b8b2a8"/>' +
    '<path d="M13.4,8.6h3.2c1,3.4 2.8,7.4 3.8,13h-3.6C15.8,16 14.4,12 13.4,8.6z" fill="#96908a"/>' +
    '<rect x="7" y="7.4" width="10" height="1.6" fill="#8f897e"/>' +
    '<g fill="#7f7a72" opacity=".65"><rect x="4.4" y="18.6" width="15.2" height="1.2"/><rect x="5.4" y="14.6" width="13.2" height="1.1"/></g>' +
    '<g fill="#5a5248"><rect x="0.4" y="17" width="3.2" height="4.6"/><rect x="20.4" y="15" width="3.2" height="6.6"/></g>' +
    '<g fill="#f5b31c" opacity=".9"><rect x="1.2" y="18.4" width="1.6" height="1.6"/><rect x="21.2" y="16.4" width="1.6" height="1.6"/></g>',

  /** 円形の議事堂。上から見た丸い屋根と、放射状の梁。 */
  cityhall:
    '<path d="M0,21.6h24V24H0z" fill="#a8a068"/>' +
    '<path d="M2,21.6V9.4h20v12.2z" fill="#dfd8c8"/>' +
    '<ellipse cx="12" cy="9.4" rx="10" ry="4.2" fill="#7f96a8"/>' +
    '<ellipse cx="12" cy="9.4" rx="7.2" ry="2.8" fill="#93a8b8"/>' +
    '<g stroke="#6b8090" stroke-width="0.7" fill="none"><path d="M12,6.6v5.6M4.4,9.4h15.2M6.2,7.4l11.6,4M6.2,11.4l11.6,-4"/></g>' +
    '<g fill="#c9bc9c"><rect x="2.6" y="12.6" width="1.8" height="9"/><rect x="7" y="12.6" width="1.8" height="9"/><rect x="15.2" y="12.6" width="1.8" height="9"/><rect x="19.6" y="12.6" width="1.8" height="9"/></g>' +
    '<g fill="#5f7f96"><rect x="5" y="13.4" width="1.8" height="5"/><rect x="17.2" y="13.4" width="1.8" height="5"/></g>' +
    '<path d="M9.4,21.6v-6.4h5.2v6.4z" fill="#4a3a24"/>' +
    '<rect x="1.2" y="21" width="21.6" height="1.4" fill="#b8ae98"/>' +
    '<rect x="11.4" y="4.6" width="1.2" height="3" fill="#8a7f66"/>' +
    '<path d="M12.6,4.6h4.4l-1.2,1.4l1.2,1.4h-4.4z" fill="#5f9a4a"/>',

  /**
   * バオバブ。太い幹に、根のような細い枝。
   * **19pxでは幹と地面の明暗差だけが残る。**幹は地面より3段暗くしてある。
   */
  baobab:
    '<path d="M0,20.6h24V24H0z" fill="#e0c898"/>' +
    '<ellipse cx="12" cy="20.8" rx="9.4" ry="2" fill="#000" opacity=".18"/>' +
    '<path d="M3.6,21c1.2,-8 2.2,-10.4 3.2,-11.8h10.4c1,1.4 2,3.8 3.2,11.8z" fill="#5f4f3c"/>' +
    '<path d="M12.4,21c-0.4,-8 0,-10.4 0.6,-11.8h4.2c1,1.4 2,3.8 3.2,11.8z" fill="#463a2c"/>' +
    '<g stroke="#463a2c" stroke-width="1.7" stroke-linecap="round" fill="none"><path d="M12,10.4L6.6,5.6M12,10.4l5.8,-4.6M12,10.4L10.4,4M12,10.4l2.2,-6.4"/></g>' +
    '<g stroke="#463a2c" stroke-width="1" stroke-linecap="round" fill="none"><path d="M6.6,5.6L4.2,3.2M6.6,5.6L5.2,2.4M17.8,5.8l2.6,-2.6M17.8,5.8l1.4,-3.2M10.4,4L9,1.4M14.2,4L15.4,1.4"/></g>' +
    '<g fill="#4f7f3a"><ellipse cx="5" cy="2.4" rx="2" ry="1.1"/><ellipse cx="19.6" cy="2.6" rx="2" ry="1.1"/><ellipse cx="12.6" cy="1.4" rx="2.2" ry="1.1"/></g>' +
    '<g fill="#c2a877"><path d="M0.6,20.6l1.8,-1.8l2.2,0.7l0.4,1.1z"/><path d="M20.2,20.6l1.4,-1.4l1.8,0.5l0.4,0.9z"/></g>',

  /** 雨雲を戴く冠(雨の女王)。 */
  raincrown:
    '<path d="M0,21.6h24V24H0z" fill="#4f7f46"/>' +
    '<g fill="#7f8a9a"><ellipse cx="9" cy="4.6" rx="6" ry="3.2"/><ellipse cx="16" cy="4" rx="5.4" ry="3"/><ellipse cx="12.6" cy="2.6" rx="4.4" ry="2.4"/></g>' +
    '<g fill="#93a0ae"><ellipse cx="8" cy="3.6" rx="3.4" ry="1.8"/></g>' +
    '<g stroke="#5f8fa8" stroke-width="1.2" stroke-linecap="round" fill="none"><path d="M5.6,8.4l-1,2.6M9.4,8.6l-1,2.6M14.6,8.4l-1,2.6M18.6,8.2l-1,2.6"/></g>' +
    // 冠
    '<path d="M4,20.4L2.6,12l4,3l3.4,-4.6h4l3.4,4.6l4,-3l-1.4,8.4z" fill="#f5b31c"/>' +
    '<path d="M4,20.4L2.6,12l4,3l1.2,-1.6l-1.4,7z" fill="#f8d06a"/>' +
    '<rect x="3.4" y="20.2" width="17.2" height="2.4" rx="0.6" fill="#e0a015"/>' +
    '<g fill="#c2453c"><circle cx="8" cy="17.4" r="1.3"/><circle cx="16" cy="17.4" r="1.3"/></g>' +
    '<circle cx="12" cy="16.6" r="1.6" fill="#3f6b9a"/>' +
    '<g fill="#f8e8a8"><circle cx="2.6" cy="11.4" r="1.1"/><circle cx="21.4" cy="11.4" r="1.1"/><circle cx="12" cy="9.4" r="1.1"/></g>',

  /** 手掘りの大穴。段になった縁と、底の水。 */
  diamondmine:
    '<path d="M0,21.6h24V24H0z" fill="#b89c6a"/>' +
    '<ellipse cx="12" cy="14.6" rx="11.6" ry="8.4" fill="#8f7a52"/>' +
    '<ellipse cx="12" cy="15.2" rx="9.6" ry="6.8" fill="#a8905c"/>' +
    '<ellipse cx="12" cy="15.8" rx="7.4" ry="5.2" fill="#8f7a4a"/>' +
    '<ellipse cx="12" cy="16.4" rx="5.2" ry="3.6" fill="#7f6a44"/>' +
    '<ellipse cx="12" cy="17" rx="3.2" ry="2.2" fill="#3f7f8a"/>' +
    '<ellipse cx="11" cy="16.6" rx="1.6" ry="0.9" fill="#5f9aa4"/>' +
    '<g stroke="#6b5a38" stroke-width="0.7" opacity=".7" fill="none"><path d="M1.4,12.4l3,4.4M22.6,12.4l-3,4.4M12,6.4v3M6,8.2l1.6,3.4M18,8.2l-1.6,3.4"/></g>' +
    // 縁の柵
    '<g stroke="#6f6a5e" stroke-width="0.8" fill="none"><path d="M0.4,7.6h23.2M0.4,9.6h23.2"/></g>' +
    '<g fill="#6f6a5e"><rect x="1.4" y="6.6" width="0.9" height="4"/><rect x="7.4" y="6.6" width="0.9" height="4"/><rect x="15.4" y="6.6" width="0.9" height="4"/><rect x="21.4" y="6.6" width="0.9" height="4"/></g>' +
    // 原石
    '<g><path d="M8.4,4.6l3.6,-3.8l3.6,3.8L12,7.4z" fill="#a8dcec"/>' +
    '<path d="M8.4,4.6l3.6,-3.8v6.6z" fill="#7fc0d8"/>' +
    '<path d="M12,0.8l3.6,3.8h-3.6z" fill="#d8f0f8"/></g>',

  /** ガラス張りの高層ビル群。高さの差で輪郭を作る。 */
  skyline:
    '<path d="M0,21.6h24V24H0z" fill="#5f5a52"/>' +
    '<g fill="#7f9ab0"><rect x="0.6" y="10.4" width="5.2" height="11.2"/><rect x="6.6" y="4.4" width="6.4" height="17.2"/><rect x="13.8" y="8" width="4.6" height="13.6"/><rect x="19" y="12.6" width="4.4" height="9"/></g>' +
    '<g fill="#9ab8cc"><rect x="0.6" y="10.4" width="1.8" height="11.2"/><rect x="6.6" y="4.4" width="2.2" height="17.2"/><rect x="13.8" y="8" width="1.6" height="13.6"/><rect x="19" y="12.6" width="1.5" height="9"/></g>' +
    '<g fill="#5f7f96" opacity=".85"><rect x="1" y="12.4" width="4.4" height="0.9"/><rect x="1" y="15.4" width="4.4" height="0.9"/><rect x="1" y="18.4" width="4.4" height="0.9"/>' +
    '<rect x="7" y="6.6" width="5.6" height="0.9"/><rect x="7" y="9.6" width="5.6" height="0.9"/><rect x="7" y="12.6" width="5.6" height="0.9"/><rect x="7" y="15.6" width="5.6" height="0.9"/><rect x="7" y="18.6" width="5.6" height="0.9"/>' +
    '<rect x="14.2" y="10" width="3.8" height="0.9"/><rect x="14.2" y="13.4" width="3.8" height="0.9"/><rect x="14.2" y="16.8" width="3.8" height="0.9"/>' +
    '<rect x="19.4" y="14.6" width="3.6" height="0.9"/><rect x="19.4" y="17.8" width="3.6" height="0.9"/></g>' +
    '<g fill="#c9bc9c"><rect x="6.2" y="3.2" width="7.2" height="1.4"/><rect x="9.4" y="0.6" width="1" height="2.6"/></g>' +
    '<g fill="#f5d06a"><rect x="8.4" y="15.6" width="1.6" height="0.9"/><rect x="15.2" y="13.4" width="1.6" height="0.9"/></g>',

  /** 精錬所。煙突と、金の延べ棒の入った金庫。 */
  refinery:
    '<path d="M0,21.6h24V24H0z" fill="#7f7a68"/>' +
    '<g fill="#8f8578"><rect x="2" y="2.4" width="3.2" height="19.2"/><rect x="1.4" y="1.6" width="4.4" height="1.4"/></g>' +
    '<g fill="#c2453c"><rect x="2" y="5" width="3.2" height="1.6"/><rect x="2" y="9" width="3.2" height="1.6"/></g>' +
    '<g fill="#c9c4b8" opacity=".7"><ellipse cx="4.4" cy="0.8" rx="3.4" ry="1.4"/><ellipse cx="9" cy="1.6" rx="2.6" ry="1.1"/></g>' +
    // 金庫室
    '<rect x="7" y="8.4" width="16.4" height="13.2" fill="#5a6470"/>' +
    '<rect x="8.4" y="9.8" width="13.6" height="10.4" fill="#7f8a94"/>' +
    '<circle cx="15.2" cy="15" r="3.8" fill="#5a6470"/>' +
    '<circle cx="15.2" cy="15" r="2.2" fill="#93a0ae"/>' +
    '<g stroke="#3f4a55" stroke-width="1.1" fill="none"><path d="M15.2,11.2v7.6M11.4,15h7.6M12.5,12.3l5.4,5.4M17.9,12.3l-5.4,5.4"/></g>' +
    '<rect x="7" y="8.4" width="16.4" height="1.4" fill="#3f4a55"/>' +
    // 延べ棒
    '<path d="M6.6,21.6l0.8,-2h6.4l0.8,2z" fill="#f5b31c"/>' +
    '<path d="M6.6,21.6l0.8,-2h2l-0.7,2z" fill="#f8d06a"/>' +
    '<path d="M15,19.6h4.6l0.8,2h-4.6z" fill="#e0a015"/>',

  /**
   * 石の記念碑。条約と言語、二つの記念碑を兼ねる形。
   * **明るい石を明るい空に置くと19pxで消える。**石を落とし、台座と地面を暗くした。
   */
  monument:
    '<path d="M0,20.4h24V24H0z" fill="#4f6b3a"/>' +
    '<g fill="#5f5a4e"><path d="M0.4,21l1.2,-3h20.8l1.2,3z"/><rect x="2.2" y="16" width="19.6" height="3"/></g>' +
    '<path d="M9.2,16V4.2q0,-1.8 2.8,-1.8t2.8,1.8V16z" fill="#cfc7b4"/>' +
    '<path d="M12,2.4V16h2.8V4.2q0,-1.8 -2.8,-1.8z" fill="#8f8578"/>' +
    '<path d="M5.8,16V8q0,-1.6 2,-1.6t2,1.6v8z" fill="#c2b9a2"/>' +
    '<path d="M14.2,16V6.2q0,-1.6 2,-1.6t2,1.6V16z" fill="#c2b9a2"/>' +
    '<g fill="#8f8578"><path d="M7.8,6.4V16h2V8q0,-1.6 -2,-1.6z"/><path d="M16.2,4.6V16h2V6.2q0,-1.6 -2,-1.6z"/></g>' +
    '<path d="M19.6,16v-6q0,-1.4 1.6,-1.4t1.6,1.4v6z" fill="#a89e88"/>' +
    '<path d="M1.2,16v-4.6q0,-1.4 1.6,-1.4t1.6,1.4V16z" fill="#a89e88"/>' +
    '<rect x="2.2" y="15.2" width="19.6" height="1.2" fill="#7f7a6e"/>' +
    '<g fill="#6f6a5e"><rect x="10.6" y="9.4" width="2.8" height="1"/><rect x="10.6" y="12" width="2.8" height="1"/></g>',

  /** 監獄。石灰岩の採石場の白い壁と、監視塔。 */
  prison:
    // 石灰岩の採石場の白い壁と、その上の監視塔。
    '<path d="M0,21.6h24V24H0z" fill="#8a8578"/>' +
    '<path d="M0.4,21.6v-4.2h3.6v-2.4h5.2v-1.8h9.2v3.2h4.8v5.2z" fill="#eae6d8"/>' +
    '<path d="M0.4,21.6v-4.2h3.6v-2.4h5.2v-1.8h3.2v8.4z" fill="#f6f2e6"/>' +
    '<g stroke="#c2bca6" stroke-width="0.8" opacity=".9" fill="none"><path d="M4,16.4l-1.4,5M9.4,14l-0.6,7.4M15.4,14.4l0.8,7M20,17l1.4,4.6"/></g>' +
    '<g fill="#c9c4ac"><path d="M2.4,21.6l2,-2.2l2.6,0.8l0.4,1.4z"/><path d="M15.4,21.6l1.8,-2l2.4,0.7l0.3,1.3z"/></g>' +
    '<path d="M9,13.6L10.2,4.4h3.6L15,13.6z" fill="#3f3a34"/>' +
    '<path d="M7.8,4.4h8.4v3.4H7.8z" fill="#5f5a4e"/>' +
    '<path d="M6.8,4.4h10.4l-2.4,-2.8H9.2z" fill="#2f2a24"/>' +
    '<rect x="9.2" y="5.2" width="5.6" height="1.8" fill="#8fb0c4"/>' +
    '<circle cx="12" cy="6.1" r="1" fill="#f8e8a8"/>' +
    '<path d="M12,7.4L4.6,13V9.4z" fill="#f8e8a8" opacity=".3"/>' +
    '<g stroke="#8f8a80" stroke-width="0.7" fill="none"><path d="M9.6,9.4h4.8M9.4,11.4h5.2"/></g>',

  /** ケープダッチ様式の破風と、葡萄畑の畝。 */
  vineyard:
    '<path d="M0,21.6h24V24H0z" fill="#7f9a4a"/>' +
    '<rect x="4.6" y="9.6" width="15" height="7.4" fill="#f2ede0"/>' +
    '<path d="M3,9.6h18L12,4z" fill="#a8894e"/>' +
    '<g stroke="#8f7038" stroke-width="0.7" opacity=".8" fill="none"><path d="M4.6,8.4h14.8M6.6,6.8h10.8"/></g>' +
    '<path d="M9.6,9.6V6.4q0,-1.4 2.4,-1.4t2.4,1.4v3.2z" fill="#f2ede0"/>' +
    '<rect x="11.2" y="5.8" width="1.6" height="2.4" fill="#5f7f96"/>' +
    '<g fill="#5f7f96"><rect x="6.4" y="11.4" width="2.4" height="3.2"/><rect x="15.2" y="11.4" width="2.4" height="3.2"/></g>' +
    '<path d="M10.8,17V12.6h2.4V17z" fill="#4a3a24"/>' +
    // 葡萄の畝(手前)
    '<path d="M0,17.4h24" stroke="#8a8578" stroke-width="0.8" fill="none"/>' +
    '<g fill="#4f8f3f"><ellipse cx="3" cy="17" rx="2.8" ry="1.5"/><ellipse cx="9" cy="17" rx="2.8" ry="1.5"/><ellipse cx="15" cy="17" rx="2.8" ry="1.5"/><ellipse cx="21" cy="17" rx="2.8" ry="1.5"/></g>' +
    '<g fill="#6b5330"><rect x="2.6" y="17" width="0.9" height="3"/><rect x="8.6" y="17" width="0.9" height="3"/><rect x="14.6" y="17" width="0.9" height="3"/><rect x="20.6" y="17" width="0.9" height="3"/></g>' +
    '<g fill="#6b4a7a"><circle cx="5.6" cy="19.6" r="1.5"/><circle cx="8.4" cy="19.6" r="1.5"/><circle cx="7" cy="21.8" r="1.5"/></g>' +
    '<g fill="#6b4a7a"><circle cx="16.6" cy="20" r="1.4"/><circle cx="19.2" cy="20" r="1.4"/></g>',

  /** 鯨。海面から立ち上がる尾びれ。 */
  whale:
    '<path d="M0,17.6q6,-1.8 12,-0.2t12,-1.4V24H0z" fill="#3f7f9f"/>' +
    '<path d="M0,19q6,-1.6 12,-0.2t12,-1.2v2.2q-6,1.4 -12,0.2t-12,1.2z" fill="#4f8fb0"/>' +
    '<g stroke="#a8d8e8" stroke-width="0.9" opacity=".8" fill="none"><path d="M1.4,20h6M15.4,21.6h7M3.4,22.6h5"/></g>' +
    '<path d="M12,17.4c-1.6,-2.6 -2.4,-5.4 -1.4,-8c-2.4,2.2 -4.4,3.2 -6.6,3.4c2.6,-3.4 4.6,-6.6 5,-11.4c1.4,2.8 2.4,4.6 3,6.4c0.6,-1.8 1.6,-3.6 3,-6.4c0.4,4.8 2.4,8 5,11.4c-2.2,-0.2 -4.2,-1.2 -6.6,-3.4c1,2.6 0.2,5.4 -1.4,8z" fill="#3f4a55"/>' +
    '<path d="M12,17.4c-1.6,-2.6 -2.4,-5.4 -1.4,-8c-2.4,2.2 -4.4,3.2 -6.6,3.4c2.6,-3.4 4.6,-6.6 5,-11.4c1.4,2.8 2.4,4.6 3,6.4z" fill="#5a6470"/>' +
    '<g fill="#f6efe2" opacity=".8"><ellipse cx="12" cy="16.6" rx="5.4" ry="1.4"/><ellipse cx="5.4" cy="18.4" rx="3" ry="0.9"/><ellipse cx="19.4" cy="18.6" rx="3" ry="0.9"/></g>' +
    '<g fill="#f6efe2" opacity=".55"><ellipse cx="20.6" cy="4.4" rx="1.5" ry="3"/><ellipse cx="22.4" cy="2.6" rx="1.1" ry="2.2"/></g>',

  /** 潟湖ぞいの密林。重なった樹冠と、その足元の水。 */
  forest:
    // 潟湖ぞいの密林。樹冠の塊と、その足元の水。
    '<path d="M0,18.6q6,-1.6 12,0t12,-1.4V24H0z" fill="#4f8aa4"/>' +
    '<g stroke="#a8d8e0" stroke-width="0.9" opacity=".8" fill="none"><path d="M1.4,20.8h7M13.4,22.2h8M4.4,22.8h5"/></g>' +
    '<g fill="#5f4a30"><rect x="11.2" y="12" width="1.6" height="7"/><rect x="4" y="14" width="1.2" height="5"/><rect x="19" y="14" width="1.2" height="5"/></g>' +
    '<g fill="#2f5f3a"><ellipse cx="12" cy="6.6" rx="6.4" ry="3.4"/><ellipse cx="4.6" cy="10.4" rx="4.6" ry="2.8"/><ellipse cx="19.6" cy="10" rx="4.6" ry="2.8"/></g>' +
    '<g fill="#3f7346"><ellipse cx="12" cy="10.4" rx="6.6" ry="3.4"/><ellipse cx="3.4" cy="13.6" rx="3.4" ry="2.2"/><ellipse cx="20.6" cy="13.2" rx="3.4" ry="2.2"/></g>' +
    '<g fill="#4f8f4a"><ellipse cx="7.4" cy="13.6" rx="4.4" ry="2.6"/><ellipse cx="16.6" cy="13.2" rx="4.4" ry="2.6"/></g>' +
    '<g fill="#5f9a52"><ellipse cx="12" cy="15.4" rx="4.4" ry="2.4"/></g>' +
    '<g fill="#2f5f3a" opacity=".5"><ellipse cx="8" cy="19.6" rx="5.4" ry="1.1"/><ellipse cx="18" cy="20.2" rx="4.4" ry="1"/></g>',

  /**
   * ダチョウ。**長い首の上に小さな頭が、胴より高く出ている**ことで読める。
   * 脚も長い。これが無いと「丸い鳥」に落ちる。
   */
  ostrich:
    '<path d="M0,21.6h24V24H0z" fill="#c9a877"/>' +
    '<ellipse cx="12" cy="21.8" rx="7.4" ry="1.6" fill="#000" opacity=".15"/>' +
    '<g stroke="#c9a877" stroke-width="1.7" fill="none"><path d="M9.6,17.4v4.4M14,17.4v4.4"/></g>' +
    '<g stroke="#8a6f4a" stroke-width="1.1" fill="none"><path d="M9.6,21.8h-1.8M14,21.8h1.8"/></g>' +
    '<ellipse cx="11.6" cy="14.4" rx="7.4" ry="5.4" fill="#3f3a34"/>' +
    '<path d="M4.6,13c-1.8,-0.6 -3.2,0.2 -4,1.6c1.6,0.4 3,0.2 4.4,-0.4z" fill="#4a4436"/>' +
    '<g fill="#f6efe2" opacity=".9"><ellipse cx="6.6" cy="15.6" rx="3.4" ry="2"/><ellipse cx="17.6" cy="16.2" rx="2.4" ry="1.5"/></g>' +
    '<path d="M16.4,11.4q2.4,-5 3,-8.2" stroke="#c9a877" stroke-width="2.2" fill="none"/>' +
    '<ellipse cx="19.6" cy="2.6" rx="2.2" ry="1.8" fill="#c9a877"/>' +
    '<path d="M21.4,2l2.2,0.7l-2.2,0.7z" fill="#8a6f4a"/>' +
    '<circle cx="19" cy="2.2" r="0.7" fill="#2f2a24"/>' +
    '<g fill="#f6efe2"><ellipse cx="3.4" cy="20.4" rx="2" ry="1.5"/></g>',

  /** ゴープラム(インド系の寺院の塔)。段になった塔身。 */
  temple:
    '<path d="M0,21.6h24V24H0z" fill="#8f9a5c"/>' +
    '<rect x="3.4" y="16.6" width="17.2" height="5" fill="#f2ede0"/>' +
    '<path d="M4.6,16.6L5.8,12h12.4l1.2,4.6z" fill="#f5b31c"/>' +
    '<path d="M6.4,12L7.4,8.4h9.2L17.6,12z" fill="#e8562f"/>' +
    '<path d="M8,8.4L8.8,5.4h6.4L16,8.4z" fill="#f5b31c"/>' +
    '<path d="M9.4,5.4L10,3h4l0.6,2.4z" fill="#e8562f"/>' +
    '<g fill="#c2453c"><circle cx="10" cy="2" r="1"/><circle cx="12" cy="1.4" r="1.1"/><circle cx="14" cy="2" r="1"/></g>' +
    '<g fill="#3f6b9a"><rect x="6.6" y="13" width="2.2" height="2.4"/><rect x="15.2" y="13" width="2.2" height="2.4"/><rect x="8.4" y="9.2" width="2" height="2"/><rect x="13.6" y="9.2" width="2" height="2"/></g>' +
    '<g fill="#5f9a4a"><rect x="10.8" y="13" width="2.4" height="2.4"/></g>' +
    '<path d="M9.8,21.6V17q0,-1.6 2.2,-1.6t2.2,1.6v4.6z" fill="#4a3a24"/>' +
    '<g fill="#e0a015"><rect x="3.4" y="16.2" width="17.2" height="0.9"/><rect x="5.4" y="11.6" width="13.2" height="0.9"/></g>',

  /** 駅舎。時計とホームのベンチ。 */
  trainstation:
    '<path d="M0,21.6h24V24H0z" fill="#8a8272"/>' +
    '<rect x="2.4" y="8.6" width="19.2" height="9" fill="#c2b49c"/>' +
    '<path d="M1,8.6h22l-2.6,-2.8H3.6z" fill="#7f8a94"/>' +
    '<rect x="9.4" y="2.6" width="5.2" height="3.2" fill="#a8563c"/>' +
    '<path d="M8.6,2.6h6.8L12,0.4z" fill="#7f8a94"/>' +
    '<circle cx="12" cy="11.4" r="2.6" fill="#f2ede0"/>' +
    '<circle cx="12" cy="11.4" r="2" fill="#e0d8c4"/>' +
    '<g stroke="#4a4436" stroke-width="0.7" fill="none"><path d="M12,11.4V9.8M12,11.4l1.2,0.8"/></g>' +
    '<g fill="#5f7f96"><rect x="4.4" y="10.4" width="2.6" height="3.4"/><rect x="17" y="10.4" width="2.6" height="3.4"/></g>' +
    '<path d="M9.8,17.6v-2.4h4.4v2.4z" fill="#4a3a24"/>' +
    '<rect x="0.6" y="17.4" width="22.8" height="1.6" fill="#b8ae98"/>' +
    '<rect x="0.6" y="17.4" width="22.8" height="0.6" fill="#f5b31c"/>' +
    // ホームのベンチ
    '<g fill="#6b5330"><rect x="4" y="20.4" width="8.6" height="1.1" rx="0.4"/><rect x="4" y="19" width="8.6" height="1" rx="0.4"/>' +
    '<rect x="4.6" y="21.5" width="1" height="2.1"/><rect x="11" y="21.5" width="1" height="2.1"/></g>' +
    '<g fill="#5a5248"><rect x="19.4" y="19" width="0.9" height="5"/><path d="M18.4,17.6h2.9l-0.6,1.4h-1.7z"/></g>',

  /**
   * 塹壕。土嚢を積んだ胸壁と、掲げた旗。
   * **砂色を砂色に重ねると19pxで平らな面になる。**段ごとに明度を落としてある。
   */
  siege:
    '<path d="M0,21.8h24V24H0z" fill="#5f5230"/>' +
    '<path d="M0,13V6.6q5,-1.6 10,0.4t14,-1.4V13z" fill="#d8cba0"/>' +
    '<g><rect x="4" y="0.4" width="1" height="8" fill="#5a4630"/>' +
    '<path d="M5,0.4h7l-1.8,2l1.8,2H5z" fill="#c2453c"/></g>' +
    '<g fill="#e0d4ac"><ellipse cx="3" cy="12.6" rx="3.6" ry="1.8"/><ellipse cx="9.6" cy="11.8" rx="3.6" ry="1.8"/><ellipse cx="16.2" cy="12.6" rx="3.6" ry="1.8"/><ellipse cx="22.4" cy="11.8" rx="3.4" ry="1.8"/></g>' +
    '<g fill="#a89050"><ellipse cx="0.2" cy="16.2" rx="3.8" ry="2"/><ellipse cx="6.8" cy="15.4" rx="3.8" ry="2"/><ellipse cx="13.4" cy="16.2" rx="3.8" ry="2"/><ellipse cx="20" cy="15.4" rx="3.8" ry="2"/></g>' +
    '<g fill="#6b5a2c"><ellipse cx="3" cy="20" rx="4" ry="2.2"/><ellipse cx="10.2" cy="19.2" rx="4" ry="2.2"/><ellipse cx="17.4" cy="20" rx="4" ry="2.2"/><ellipse cx="23.6" cy="19.2" rx="3.4" ry="2.2"/></g>' +
    '<g stroke="#8f7f52" stroke-width="0.7" opacity=".9" fill="none"><path d="M3,10.8v3.6M9.6,10v3.6M16.2,10.8v3.6M6.8,13.4v3.6M13.4,14.2v3.6"/></g>' +
    '<g><circle cx="18.6" cy="8" r="2" fill="#6b4a2c"/><path d="M16.6,9.6h4v2.4h-4z" fill="#7f6a3c"/>' +
    '<path d="M20.4,10.2l3.2,-1.6" stroke="#3f3a34" stroke-width="1.3" fill="none"/></g>',

  /** ズールーの盾と、交差した槍。白い石積みを添える。 */
  battlefield:
    '<path d="M0,21.6h24V24H0z" fill="#c2a860"/>' +
    '<g stroke="#8a6f4a" stroke-width="1.2" fill="none"><path d="M3.4,21.6L18.6,2.4M20.6,21.6L5.4,2.4"/></g>' +
    '<g fill="#c9d2d8"><path d="M18.6,2.4l-1.6,2.6l2.8,-0.6z"/><path d="M5.4,2.4L4,5l2.8,-0.6z"/></g>' +
    '<path d="M12,3.4c3.6,0 6,3.6 6,8.4s-2.4,9.4 -6,9.4s-6,-4.6 -6,-9.4s2.4,-8.4 6,-8.4z" fill="#5f4a34"/>' +
    '<path d="M12,3.4c-3.6,0 -6,3.6 -6,8.4s2.4,9.4 6,9.4z" fill="#7f6444"/>' +
    '<g fill="#f2ede0"><path d="M12,5c1.6,0.8 2.4,3 2.4,6.6s-0.8,6.6 -2.4,7.8c-1.6,-1.2 -2.4,-4.2 -2.4,-7.8S10.4,5.8 12,5z"/></g>' +
    '<g fill="#5f4a34"><ellipse cx="12" cy="9" rx="1.2" ry="1.6"/><ellipse cx="12" cy="14.4" rx="1.2" ry="1.6"/></g>' +
    '<rect x="11.4" y="2" width="1.2" height="20.4" fill="#3f3428"/>' +
    // 白い石積み
    '<g fill="#e8e4d8"><path d="M0.4,21.6q2.2,-3.6 4.4,0z"/><path d="M19.6,21.6q2,-3.2 4,0z"/></g>' +
    '<g fill="#f2ede0"><path d="M1.4,21.6q1.2,-2.2 2.4,0z"/></g>',

  /** 石炭の積み出し。ベルトコンベヤーと貯炭の山。 */
  coalport:
    '<path d="M0,21.6h24V24H0z" fill="#7f7a68"/>' +
    '<path d="M0,18.4q4.4,-6.4 9,0z" fill="#33343a"/>' +
    '<path d="M9.6,18.4q5,-7.4 10.4,0z" fill="#3f4046"/>' +
    '<g stroke="#4f5058" stroke-width="0.8" opacity=".8" fill="none"><path d="M2,17q2.4,-3.4 5,-1.6M12,17q3,-4 6,-1.6"/></g>' +
    '<path d="M1.4,12.6L21.4,3.6l1.6,2.4L3,15z" fill="#7f8a94"/>' +
    '<path d="M1.4,12.6L21.4,3.6l0.5,0.8L2,13.4z" fill="#a8b4bc"/>' +
    '<g fill="#5a6470"><rect x="4.4" y="13.4" width="1.2" height="5.4"/><rect x="11.4" y="10.4" width="1.2" height="7.4"/><rect x="18.4" y="7.2" width="1.2" height="10.4"/></g>' +
    '<g fill="#33343a"><ellipse cx="9" cy="8.4" rx="1.6" ry="1"/><ellipse cx="14.4" cy="6" rx="1.4" ry="0.9"/><ellipse cx="5" cy="10.6" rx="1.2" ry="0.8"/></g>' +
    '<rect x="20.4" y="2.4" width="3.4" height="3.4" fill="#f5b31c"/>' +
    '<rect x="20.4" y="18.4" width="3.6" height="3.2" fill="#5a6470"/>' +
    '<g stroke="#4a4436" stroke-width="0.9" fill="none"><path d="M0,20.4h24"/></g>',

  /** 自動車工場。組立ラインの門と、出てくる車体。 */
  factory:
    '<path d="M0,21.6h24V24H0z" fill="#6b6459"/>' +
    '<rect x="0.6" y="8" width="22.8" height="12" fill="#8f9aa0"/>' +
    '<g fill="#7f8a94"><path d="M0.6,8l2.6,-3h3.4L4,8z"/><path d="M6.6,8l2.6,-3h3.4L10,8z"/><path d="M12.6,8l2.6,-3H18.6L16,8z"/><path d="M18.6,8L21.2,5h2.2v3z"/></g>' +
    '<g fill="#5f6b76"><rect x="1.6" y="9.4" width="2.6" height="2.4"/><rect x="6.6" y="9.4" width="2.6" height="2.4"/><rect x="14.6" y="9.4" width="2.6" height="2.4"/><rect x="19.6" y="9.4" width="2.6" height="2.4"/></g>' +
    // 出荷口
    '<path d="M9.4,20v-6.4h5.6V20z" fill="#3f4a55"/>' +
    '<g fill="#f5b31c"><rect x="0.6" y="19.4" width="22.8" height="1"/></g>' +
    // 車体
    '<g><path d="M4,21.6h13l-1.4,-3.2h-2.6l-1.6,-2h-4.4l-1.6,2H4.4z" fill="#c2453c"/>' +
    '<path d="M7.4,18.4h6.4l-1.2,-1.5H8.4z" fill="#7fb0cc"/>' +
    '<g fill="#2f2a24"><circle cx="6.6" cy="21.6" r="1.6"/><circle cx="14.4" cy="21.6" r="1.6"/></g>' +
    '<g fill="#8a8578"><circle cx="6.6" cy="21.6" r="0.6"/><circle cx="14.4" cy="21.6" r="0.6"/></g></g>' +
    '<g fill="#c9c4b8" opacity=".7"><ellipse cx="19.4" cy="3" rx="2.6" ry="1.2"/><ellipse cx="22.4" cy="1.6" rx="1.8" ry="0.9"/></g>',

  /** シーラカンス。**肉厚の柄のあるひれ**が他の魚と違うところ。 */
  coelacanth:
    // 6600万年前に絶滅したはずの魚。**肉厚の柄のあるひれ**が他の魚と違うところ。
    '<path d="M0,20.4q6,-1.4 12,0t12,-1V24H0z" fill="#2f5f7a"/>' +
    '<path d="M2.4,11c3.4,-4.4 9,-5.6 14,-3.6l3,-2.4l-0.6,4.4l2.6,1.6l-2.6,1.6l0.6,4.4l-3,-2.4c-5,2 -10.6,0.8 -14,-3.6z" fill="#9ac4c8"/>' +
    '<path d="M2.4,11c3.4,-4.4 9,-5.6 14,-3.6c-4.2,0.6 -8.4,2 -14,3.6z" fill="#cfe4e0"/>' +
    '<g fill="#4f7f8a"><ellipse cx="9" cy="7" rx="2.6" ry="1.5" transform="rotate(-24 9 7)"/><ellipse cx="12.6" cy="15.2" rx="2.8" ry="1.5" transform="rotate(20 12.6 15.2)"/></g>' +
    '<g fill="#4f7f8a"><path d="M7.2,13.4c1.6,0.5 2.3,1.8 1.8,3.9c-1.6,-0.5 -2.5,-1.6 -1.8,-3.9z"/>' +
    '<path d="M13.2,14.4c1.7,0.6 2.5,1.9 2,4.1c-1.7,-0.5 -2.7,-1.7 -2,-4.1z"/>' +
    '<path d="M5.8,8.2c-1.6,-0.7 -2.7,0.2 -3.2,2.3c1.6,0.2 2.7,-0.5 3.2,-2.3z"/></g>' +
    '<circle cx="5.6" cy="9.8" r="1.8" fill="#f2ede0"/>' +
    '<circle cx="5.6" cy="9.8" r="0.9" fill="#1f2a34"/>' +
    '<g fill="#4f7f8a" opacity=".8"><circle cx="10" cy="10.4" r="0.9"/><circle cx="13.4" cy="11.4" r="0.9"/><circle cx="16.4" cy="10.4" r="0.8"/></g>',

  /** カルーの町。破風の家と教会の尖塔、その前を回る川。 */
  karootown:
    // 川に囲まれた歴史地区。破風の家と教会の尖塔、その前を回る川。
    '<path d="M0,18.4q5,-2.6 11,-0.6t13,-1.4V24H0z" fill="#4f7f7a"/>' +
    '<path d="M0,20q5,-2.2 11,-0.4t13,-1.2V24H0z" fill="#5f8f8a"/>' +
    '<g stroke="#a8ccc4" stroke-width="0.8" opacity=".8" fill="none"><path d="M2.4,21q4,-1 8,0.4M15,21.8q4,0.6 7,-0.6"/></g>' +
    '<path d="M0,17.4q6,-2.6 12,-1t12,-1.8v2.4q-6,2 -12,0.4t-12,1.4z" fill="#c9a877"/>' +
    '<rect x="9.6" y="4.6" width="4.6" height="11.4" fill="#f2ede0"/>' +
    '<path d="M8.8,4.6h6.2L11.9,0.8z" fill="#7f8a94"/>' +
    '<rect x="11" y="7" width="1.8" height="2.8" fill="#5f7f96"/>' +
    '<g fill="#f2ede0"><rect x="1.2" y="8.4" width="6" height="7.8"/><rect x="17" y="9" width="6" height="7.4"/></g>' +
    '<g fill="#8f8578"><path d="M0.2,8.4h8l-1.6,-2H1.8z"/><path d="M16,9h8l-1.6,-2h-4.8z"/></g>' +
    '<g fill="#f2ede0"><path d="M3,8.4V6.4q0,-1.1 1.2,-1.1t1.2,1.1v2z"/><path d="M18.8,9V7q0,-1.1 1.2,-1.1t1.2,1.1v2z"/></g>' +
    '<g fill="#5f7f96"><rect x="3.2" y="10.4" width="2" height="2.6"/><rect x="19" y="11" width="2" height="2.4"/></g>' +
    '<g fill="#5f8f5a"><path d="M7.6,17q1.4,-2.6 2.8,0z"/><path d="M15.4,16.6q1.2,-2.2 2.4,0z"/></g>',

  /** ナツメヤシの並木と、その間を通る水路。 */
  palmavenue:
    // ナツメヤシの並木と、そのあいだを通る灌漑水路。
    '<path d="M0,21.8h24V24H0z" fill="#96522f"/>' +
    '<path d="M8.6,10.6h6.8L19.6,24H4.4z" fill="#b8703c"/>' +
    '<path d="M9.4,11.4h5.2L17.6,24H6.4z" fill="#8a8578"/>' +
    '<path d="M10.2,12h3.6L16,24H8z" fill="#4f8fa8"/>' +
    '<g stroke="#a8d8e8" stroke-width="0.8" opacity=".8" fill="none"><path d="M10.4,16h3.2M9.6,19.6h4.8"/></g>' +
    '<path d="M4.2,24q1.6,-9 1.2,-14.4h1.8Q6.8,15 8.4,24z" fill="#7f6a48"/>' +
    '<g fill="#3f7f42"><path d="M6,10.4q-4.6,-1.6 -5.8,-4.8q4.2,0.6 5.8,4.8z"/><path d="M6,10.4q4.6,-1.6 5.8,-4.8q-4.2,0.6 -5.8,4.8z"/>' +
    '<path d="M6,10.4q-3.2,-3.6 -2.8,-7q2.8,2.8 2.8,7z"/><path d="M6,10.4q3.2,-3.6 2.8,-7q-2.8,2.8 -2.8,7z"/><path d="M6,10.4V3.2q0,2.4 0,7.2z"/></g>' +
    '<g fill="#a8763c"><circle cx="4.6" cy="10.8" r="0.9"/><circle cx="7.4" cy="11" r="0.9"/></g>' +
    '<path d="M16.4,24q1.5,-8 1.1,-12.6h1.7Q18.8,16 20.2,24z" fill="#7f6a48"/>' +
    '<g fill="#3f7f42"><path d="M17.8,12q-4,-1.4 -5.2,-4.2q3.6,0.6 5.2,4.2z"/><path d="M17.8,12q4,-1.4 5.2,-4.2q-3.6,0.6 -5.2,4.2z"/>' +
    '<path d="M17.8,12q-2.8,-3.2 -2.4,-6.2q2.4,2.4 2.4,6.2z"/><path d="M17.8,12q2.8,-3.2 2.4,-6.2q-2.4,2.4 -2.4,6.2z"/></g>' +
    '<g fill="#a8763c"><circle cx="16.6" cy="12.4" r="0.8"/><circle cx="19" cy="12.6" r="0.8"/></g>',

  /** 野花。オレンジと白の花が一面に咲く数週間。 */
  wildflower:
    // 雨さえ来れば、数週間だけ花畑に変わる砂漠。
    '<path d="M0,17.6q6,-3 12,-1t12,-2.4V24H0z" fill="#a8b05a"/>' +
    '<path d="M0,20.4q6,-2 12,-0.6t12,-1.6V24H0z" fill="#8fa04a"/>' +
    '<g stroke="#4f7f42" stroke-width="1" fill="none"><path d="M8,15.4V24M17.6,18.6V24M2.4,20.4V24"/></g>' +
    '<g fill="#f2762a"><ellipse cx="8" cy="9" rx="2.2" ry="3.6"/><ellipse cx="8" cy="16.4" rx="2.2" ry="3.6"/><ellipse cx="4.2" cy="12.7" rx="3.6" ry="2.2"/><ellipse cx="11.8" cy="12.7" rx="3.6" ry="2.2"/>' +
    '<ellipse cx="5.3" cy="10" rx="2.8" ry="1.9" transform="rotate(-45 5.3 10)"/><ellipse cx="10.7" cy="15.4" rx="2.8" ry="1.9" transform="rotate(-45 10.7 15.4)"/>' +
    '<ellipse cx="10.7" cy="10" rx="2.8" ry="1.9" transform="rotate(45 10.7 10)"/><ellipse cx="5.3" cy="15.4" rx="2.8" ry="1.9" transform="rotate(45 5.3 15.4)"/></g>' +
    '<circle cx="8" cy="12.7" r="2.8" fill="#3f3428"/>' +
    '<circle cx="8" cy="12.7" r="1.3" fill="#f5b31c"/>' +
    '<g fill="#f6efe2"><ellipse cx="17.6" cy="14.6" rx="1.4" ry="2.4"/><ellipse cx="17.6" cy="19.4" rx="1.4" ry="2.4"/><ellipse cx="15.2" cy="17" rx="2.4" ry="1.4"/><ellipse cx="20" cy="17" rx="2.4" ry="1.4"/></g>' +
    '<circle cx="17.6" cy="17" r="1.5" fill="#f5b31c"/>' +
    '<g fill="#f5b31c"><circle cx="2.4" cy="19" r="1.7"/><circle cx="22" cy="12.6" r="1.5"/></g>' +
    '<g fill="#f6efe2"><circle cx="21.6" cy="20.6" r="1.4"/><circle cx="13.2" cy="21.4" r="1.3"/></g>',

  /** 望遠鏡のドーム。開いたスリットから鏡筒がのぞく。 */
  telescope:
    // 空の澄み具合を理由に選ばれた高原。開いたスリットから鏡筒がのぞく。
    '<path d="M0,20.4q6,-1.6 12,-0.4t12,-1V24H0z" fill="#c8d4dc"/>' +
    '<path d="M0,22q6,-1.2 12,-0.3t12,-0.8V24H0z" fill="#dce6ec"/>' +
    '<rect x="2.4" y="18" width="19.2" height="2.8" fill="#3f4a5c"/>' +
    '<path d="M3.8,18V12a8.2,8.2 0 0 1 16.4,0v6z" fill="#93a0b8"/>' +
    '<path d="M12,3.8A8.2,8.2 0 0 0 3.8,12h4.2A4,4 0 0 1 12,8z" fill="#c8d4e4"/>' +
    '<path d="M10.4,4h4v8h-4z" fill="#1f2a40"/>' +
    '<path d="M10.8,12.6l1.4,-8.4l2.6,0.5l-1.4,8.4z" fill="#5f6b80"/>' +
    '<path d="M11.2,12.4h3.4v2.2h-3.4z" fill="#3f4a5c"/>' +
    '<g stroke="#7f8a9c" stroke-width="0.7" opacity=".9" fill="none"><path d="M5.6,15h12.8"/></g>' +
    '<g fill="#f5d06a"><path d="M20.4,1.6a3,3 0 1 0 2,4.2a3.4,3.4 0 0 1 -2,-4.2z"/></g>' +
    '<g fill="#f6efe2"><circle cx="2.6" cy="3" r="0.9"/><circle cx="7" cy="1.4" r="0.7"/><circle cx="15.6" cy="1.8" r="0.8"/></g>',

  // __MARKS_END__
};
