/**
 * マレーシアの都市イラスト。
 *
 * `MALAYSIA_MARKS` は24×24の座標系に描くシンボル、`MALAYSIA_BG` は400×210の
 * 座標系に描く背景シーン(いずれもSVG断片の文字列)。イタリア・韓国と同じく
 * 最初から文字列として持つ。動きは含めない(アニメーションはReact側で重ねる)。
 *
 * 色は他の盤面と揃える(空 #8fc4e8〜#cfe4f0、顔・白 #f6efe2、強調
 * #f5b31c(金)/#e8443f(赤)/#5b8fe8(青))。**マレーシアらしさは
 * 熱帯雨林の濃緑 #2f6a30〜#4a8f3f・トルコ石色の海 #14788f〜#2a95af
 * (geography.mjs の海・陸の色と揃えてある)・チーク材の焼き茶 #6b5330・
 * アタップ(ニッパ椰子)葺きの屋根 #9a7b4a・海峡植民地の赤煉瓦 #b5502f・
 * オランダ統治時代の赤 #a8402e** で出す。文字要素は使わない
 * (紋章・看板の文字は線と面だけで表す)。
 *
 * 鍵は `cities.mjs` の `mark` / `bg` と一対一で対応する(同じキー名)。
 * 増やすときは両方を揃えること。
 *
 * **背景SVGの中央25%(x=151〜249 / y=54〜152)は都市シンボルに隠れて
 * 見えない。** 見せたい細部は左右3分の1と手前(y>170)に置く。
 * `sky()` は必ず第3引数(次に来る塗りの開始y)を渡すこと。渡し忘れると
 * 空と地面のあいだに塗り残しの帯ができる(ibaraki・韓国・イタリアで実際に起きた)。
 *
 * **この時点では5都市ぶんのみ(プレビュー用)。** 残りは都市の追加に
 * あわせて描き足す。
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

function clouds(cx, cy, scale = 1) {
  const e = (dx, rx, ry) =>
    `<ellipse cx="${r1(cx + dx * scale)}" cy="${cy}" rx="${r1(rx * scale)}" ry="${r1(ry * scale)}"/>`;
  return `<g opacity=".8" fill="#f6efe2">${e(0, 18, 7)}${e(-10, 11, 5.5)}${e(11, 13, 5.5)}</g>`;
}

function gull(x, y, scale = 1) {
  const w = 8 * scale;
  return `<path d="M${r1(x - w)},${y}q${r1(w / 2)},-6 ${w},0q${r1(w / 2)},-6 ${w},0" fill="none" stroke="#4a4a52" stroke-width="1.4"/>`;
}

/** 波の反射線・水面。 */
function ripples(y, color = "#bfe8f4") {
  return `<g stroke="${color}" stroke-width="2" opacity=".7" fill="none"><path d="M26,${y}h74M176,${y + 12}h92M108,${y + 24}h62"/></g>`;
}

/** ヤシの木(アブラヤシ・ココヤシ。低地の海岸によく置く)。 */
function palmTree(x, base, h, crown = "#2f6a30") {
  return (
    `<path d="M${r1(x)},${r1(base)}q${r1(-h * 0.1)},${r1(-h * 0.5)} ${r1(-h * 0.06)},${r1(-h * 0.9)}" stroke="#6b5330" stroke-width="${r1(h * 0.08)}" fill="none"/>` +
    `<g fill="${crown}" opacity=".92">${[-1, -0.5, 0, 0.5, 1]
      .map((k) => {
        const tx = r1(x - h * 0.06);
        const ty = r1(base - h * 0.9);
        return `<path d="M${tx},${ty}q${r1(k * h * 0.5)},${r1(-h * 0.08)} ${r1(k * h * 0.55)},${r1(h * 0.14)}q${r1(-k * h * 0.2)},${r1(h * 0.05)} ${r1(-k * h * 0.35)},${r1(-h * 0.06)}z"/>`;
      })
      .join("")}</g>`
  );
}

/** 丸い樹冠の広葉樹(アメリカネムノキ・雨の木など)。 */
function roundTreeFallback(x, base, r, crown = "#5f9f4a", trunk = "#6b5330") {
  return (
    `<rect x="${r1(x - r * 0.14)}" y="${r1(base - r * 0.9)}" width="${r1(r * 0.28)}" height="${r1(r * 0.9)}" fill="${trunk}"/>` +
    `<ellipse cx="${r1(x)}" cy="${r1(base - r * 1.1)}" rx="${r}" ry="${r1(r * 0.62)}" fill="${crown}"/>`
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

/** 五フィート街路(ショップハウス)の並び。色とりどりの二・三階建て。 */
function shophouseRow(positions) {
  return positions
    .map(([x, base, w, h, wall, trim]) => {
      const hw = r1(w / 2);
      return (
        `<rect x="${r1(x - hw)}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${wall}"/>` +
        `<rect x="${r1(x - hw - 3)}" y="${r1(base - h * 0.32)}" width="${r1(w + 6)}" height="${r1(h * 0.32)}" fill="none" stroke="${trim}" stroke-width="1.2" opacity=".8"/>` +
        `<g fill="${trim}" opacity=".85"><rect x="${r1(x - hw + 3)}" y="${r1(base - h + 5)}" width="6" height="10"/><rect x="${r1(x + hw - 9)}" y="${r1(base - h + 5)}" width="6" height="10"/></g>` +
        `<rect x="${r1(x - hw - 4)}" y="${r1(base - 4)}" width="${r1(w + 8)}" height="4" fill="#5a4630" opacity=".7"/>`
      );
    })
    .join("");
}

/** 要塞の石門。左右の石壁のあいだに、奥へ抜ける暗いアーチの開口を見せる。 */
function stoneGate(x, base, w, h, stone = "#9a8f78", opening = "#4a4030") {
  const hw = r1(w / 2);
  const pw = r1(w * 0.24);
  const ow = r1(w - pw * 2);
  const oh = r1(h * 0.72);
  return (
    // 開口(奥行き。先に描いて石壁で縁取る)
    `<rect x="${r1(x - hw + pw)}" y="${r1(base - oh)}" width="${ow}" height="${oh}" fill="${opening}"/>` +
    `<path d="M${r1(x - hw + pw)},${r1(base - oh)}a${r1(ow / 2)},${r1(ow / 2)} 0 0 1 ${ow},0z" fill="${opening}"/>` +
    // 左右の石壁
    `<rect x="${r1(x - hw)}" y="${r1(base - h)}" width="${pw}" height="${h}" fill="${stone}"/>` +
    `<rect x="${r1(x + hw - pw)}" y="${r1(base - h)}" width="${pw}" height="${h}" fill="${stone}"/>` +
    // 石壁をつなぐアーチの縁(開口より一回り大きく、輪郭として見せる)
    `<path d="M${r1(x - hw)},${r1(base - oh)}a${hw},${r1(hw * 0.62)} 0 0 1 ${w},0v${r1(h * 0.05)}a${hw},${r1(hw * 0.58)} 0 0 0 -${w},0z" fill="${stone}"/>` +
    // 上部の胸壁(装飾。文字は使わない)
    `<g fill="${stone}">${[-1, 0, 1].map((k) => `<rect x="${r1(x + k * hw * 0.6 - 4)}" y="${r1(base - h - 7)}" width="8" height="7"/>`).join("")}</g>`
  );
}

/** 高床式の木造家屋(マレーの伝統家屋・クランジェティ)。 */
function stiltHouse(x, base, w, h, wall = "#c9a877", roof = "#9a7b4a") {
  const hw = r1(w / 2);
  return (
    `<g stroke="#5a4630" stroke-width="2"><line x1="${r1(x - hw + 2)}" y1="${r1(base)}" x2="${r1(x - hw + 2)}" y2="${r1(base - h * 0.3)}"/><line x1="${r1(x + hw - 2)}" y1="${r1(base)}" x2="${r1(x + hw - 2)}" y2="${r1(base - h * 0.3)}"/></g>` +
    `<rect x="${r1(x - hw)}" y="${r1(base - h * 0.7)}" width="${w}" height="${r1(h * 0.4)}" fill="${wall}"/>` +
    `<path d="M${r1(x - hw - 3)},${r1(base - h * 0.7)}h${r1(w + 6)}l-${r1(hw + 3)},-${r1(h * 0.28)}z" fill="${roof}"/>`
  );
}

/** ジャノメ(鋸歯)状の花崗岩の峰。キナバル山の特徴的な岩肌。 */
function granitePeak(cx, base, h, fill = "#8f8a80") {
  return (
    `<path d="M${r1(cx - h * 0.7)},${r1(base)}L${r1(cx - h * 0.3)},${r1(base - h * 0.6)}L${r1(cx - h * 0.1)},${r1(base - h * 0.9)}L${r1(cx + 0.06 * h)},${r1(base - h)}L${r1(cx + h * 0.25)},${r1(base - h * 0.7)}L${r1(cx + h * 0.65)},${r1(base)}z" fill="${fill}"/>` +
    `<path d="M${r1(cx - h * 0.1)},${r1(base - h * 0.9)}L${r1(cx + 0.06 * h)},${r1(base - h)}L${r1(cx + h * 0.1)},${r1(base - h * 0.82)}z" fill="#eef1ee"/>`
  );
}

/** 猫の像(クチンの町のシンボル)。丸い頭に三角の耳、台座つき。 */
function catStatue(x, base, s = 1) {
  const bodyR = r1(11 * s);
  const headR = r1(8 * s);
  const headY = r1(base - bodyR * 1.3 - headR * 0.7);
  return (
    // 台座
    `<rect x="${r1(x - bodyR * 1.3)}" y="${r1(base + 1)}" width="${r1(bodyR * 2.6)}" height="5" fill="#9a8f70"/>` +
    `<g fill="#e8dcc0" stroke="#7a7060" stroke-width="1.2">` +
    // 座った胴体
    `<ellipse cx="${r1(x)}" cy="${r1(base - bodyR * 0.75)}" rx="${bodyR}" ry="${r1(bodyR * 1.05)}"/>` +
    // 頭
    `<circle cx="${r1(x)}" cy="${headY}" r="${headR}"/>` +
    // 三角の耳
    `<path d="M${r1(x - headR * 0.75)},${r1(headY - headR * 0.55)}l${r1(-headR * 0.35)},${r1(-headR * 0.9)}l${r1(headR * 0.75)},${r1(headR * 0.55)}z" fill="#e8dcc0" stroke="#7a7060" stroke-width="1.2"/>` +
    `<path d="M${r1(x + headR * 0.75)},${r1(headY - headR * 0.55)}l${r1(headR * 0.35)},${r1(-headR * 0.9)}l${r1(-headR * 0.75)},${r1(headR * 0.55)}z" fill="#e8dcc0" stroke="#7a7060" stroke-width="1.2"/>` +
    // 尻尾(体の右にカーブして立ち上がる)
    `<path d="M${r1(x + bodyR * 0.9)},${r1(base - bodyR * 0.5)}q${r1(bodyR * 0.9)},${r1(-bodyR * 0.2)} ${r1(bodyR * 0.7)},${r1(-bodyR * 1.6)}" fill="none"/>` +
    `</g>` +
    // ひげ
    `<g stroke="#7a7060" stroke-width=".8"><path d="M${r1(x - headR * 0.3)},${r1(headY + headR * 0.15)}h${r1(-headR * 0.9)}M${r1(x + headR * 0.3)},${r1(headY + headR * 0.15)}h${r1(headR * 0.9)}"/></g>`
  );
}

/** 丸屋根のモスク。ドームと三日月の飾り、ミナレット(尖塔)を1本添える。 */
function mosqueDome(x, base, r, dome = "#f2f0e8", accent = "#d4a017") {
  return (
    `<rect x="${r1(x - r * 1.3)}" y="${r1(base - r * 0.7)}" width="${r1(r * 2.6)}" height="${r1(r * 0.7)}" fill="${dome}"/>` +
    `<path d="M${r1(x - r)},${r1(base - r * 0.7)}a${r},${r} 0 0 1 ${r1(r * 2)},0z" fill="${dome}" stroke="${accent}" stroke-width="1.4"/>` +
    `<rect x="${r1(x - 1.6)}" y="${r1(base - r * 0.7 - r * 0.5)}" width="3.2" height="${r1(r * 0.5)}" fill="${accent}"/>` +
    `<circle cx="${r1(x)}" cy="${r1(base - r * 0.7 - r * 0.5 - 3)}" r="2.4" fill="${accent}"/>` +
    `<rect x="${r1(x + r * 1.6)}" y="${r1(base - r * 1.6)}" width="5" height="${r1(r * 1.6)}" fill="${dome}" stroke="${accent}" stroke-width="1"/>` +
    `<path d="M${r1(x + r * 1.6)},${r1(base - r * 1.6)}a2.5,2.5 0 0 1 5,0z" fill="${accent}"/>`
  );
}

/** 段々畑(茶畑・棚田)。等高線状の帯を重ねる。 */
function terraceRows(x, base, w, rows, color) {
  const parts = [];
  for (let i = 0; i < rows; i++) {
    const y = r1(base - i * 7);
    parts.push(`<path d="M${r1(x - w / 2)},${y}q${r1(w * 0.25)},-5 ${r1(w * 0.5)},0t${r1(w * 0.5)},0" fill="none" stroke="${color}" stroke-width="4"/>`);
  }
  return `<g opacity=".85">${parts.join("")}</g>`;
}

/** ロープウェイの支柱と索道。 */
function cableCarLine(x1, y1, x2, y2, poleH = 30) {
  return (
    `<rect x="${r1(x1 - 2)}" y="${r1(y1 - poleH)}" width="4" height="${poleH}" fill="#8a8478"/>` +
    `<rect x="${r1(x2 - 2)}" y="${r1(y2 - poleH * 1.6)}" width="4" height="${r1(poleH * 1.6)}" fill="#8a8478"/>` +
    `<line x1="${r1(x1)}" y1="${r1(y1 - poleH)}" x2="${r1(x2)}" y2="${r1(y2 - poleH * 1.6)}" stroke="#5a5a5a" stroke-width="1.4"/>` +
    `<rect x="${r1(x1 + (x2 - x1) * 0.4 - 5)}" y="${r1(y1 - poleH - (poleH * 0.6 - (y1 - y2)) * 0.4 + 6)}" width="10" height="8" rx="2" fill="#e8443f"/>`
  );
}

/** 木々のあいだに張られたキャノピーウォーク(吊り橋)。 */
function canopyWalk(x, y, w) {
  return (
    `<path d="M${r1(x)},${r1(y)}q${r1(w * 0.5)},8 ${w},0" fill="none" stroke="#9a7b4a" stroke-width="4"/>` +
    `<g stroke="#5a4630" stroke-width="1.2">${Array.from({ length: 6 }).map((_, i) => {
      const px = r1(x + (w / 5) * i);
      const py = r1(y + Math.sin((i / 5) * Math.PI) * 8);
      return `<line x1="${px}" y1="${py}" x2="${px}" y2="${r1(py - 8)}"/>`;
    }).join("")}</g>` +
    `<path d="M${r1(x)},${r1(y - 8)}q${r1(w * 0.5)},8 ${w},0" fill="none" stroke="#c9a877" stroke-width="1.4"/>`
  );
}

/** 洞窟の入り口(暗い開口を岩肌でふちどる)。 */
function caveMouth(x, base, w, h, rock = "#7a7568") {
  return (
    `<path d="M${r1(x - w / 2)},${r1(base)}v${r1(-h * 0.5)}q0,${r1(-h * 0.6)} ${r1(w / 2)},${r1(-h * 0.6)}q${r1(w / 2)},0 ${r1(w / 2)},${r1(h * 0.6)}v${r1(h * 0.5)}z" fill="${rock}"/>` +
    `<path d="M${r1(x - w * 0.32)},${r1(base)}v${r1(-h * 0.35)}q0,${r1(-h * 0.4)} ${r1(w * 0.32)},${r1(-h * 0.4)}q${r1(w * 0.32)},0 ${r1(w * 0.32)},${r1(h * 0.4)}v${r1(h * 0.35)}z" fill="#241a10"/>`
  );
}

/** 海食柱(海に立つ岩の塔)。 */
function seaStack(x, base, w, h, fill = "#9a8f78") {
  return (
    `<path d="M${r1(x - w / 2)},${r1(base)}q${r1(-2)},${r1(-h * 0.6)} ${r1(w * 0.2)},${r1(-h)}q${r1(w * 0.3)},${r1(-h * 0.15)} ${r1(w * 0.5)},0q${r1(w * 0.2 + 2)},${r1(h * 0.4)} ${r1(w * 0.5)},${r1(h * 0.6)}z" fill="${fill}"/>` +
    `<path d="M${r1(x - w * 0.15)},${r1(base - h * 0.75)}q${r1(w * 0.15)},${r1(-h * 0.1)} ${r1(w * 0.3)},0" fill="none" stroke="#2f6a30" stroke-width="2.4"/>`
  );
}

/** 高床式の長屋(ロングハウス)。壁一面に複数の戸口を持つ、横に長い建物。 */
function longhouseHut(x, base, w, h, wall = "#c9a877", roof = "#9a7b4a") {
  const hw = r1(w / 2);
  return (
    `<g stroke="#5a4630" stroke-width="2.4">${[-1, -0.5, 0, 0.5, 1].map((k) => `<line x1="${r1(x + k * hw * 0.9)}" y1="${r1(base)}" x2="${r1(x + k * hw * 0.9)}" y2="${r1(base - h * 0.3)}"/>`).join("")}</g>` +
    `<rect x="${r1(x - hw)}" y="${r1(base - h * 0.75)}" width="${w}" height="${r1(h * 0.45)}" fill="${wall}"/>` +
    `<g fill="#5a4630">${[-0.7, -0.2, 0.3, 0.75].map((k) => `<rect x="${r1(x + k * hw - 4)}" y="${r1(base - h * 0.5)}" width="8" height="${r1(h * 0.2)}"/>`).join("")}</g>` +
    `<path d="M${r1(x - hw - 4)},${r1(base - h * 0.75)}h${r1(w + 8)}l-${r1(hw * 0.5)},-${r1(h * 0.35)}h-${r1(hw)}z" fill="${roof}"/>`
  );
}

/** 蒸気機関車(小型・横向き)。 */
function steamLoco(x, base, s = 1) {
  const w = r1(70 * s);
  const h = r1(26 * s);
  return (
    `<g fill="#3a3f4a">` +
    `<rect x="${r1(x - w * 0.5)}" y="${r1(base - h)}" width="${w}" height="${h}" rx="4"/>` +
    `<circle cx="${r1(x - w * 0.32)}" cy="${r1(base - h * 0.15)}" r="${r1(h * 0.32)}"/>` +
    `<circle cx="${r1(x)}" cy="${r1(base - h * 0.15)}" r="${r1(h * 0.32)}"/>` +
    `<circle cx="${r1(x + w * 0.32)}" cy="${r1(base - h * 0.15)}" r="${r1(h * 0.32)}"/>` +
    `</g>` +
    `<rect x="${r1(x - w * 0.5 - 6)}" y="${r1(base - h * 1.5)}" width="10" height="${r1(h * 0.5)}" fill="#3a3f4a"/>` +
    `<g fill="#5a5f6a"><circle cx="${r1(x - w * 0.32)}" cy="${r1(base - h * 0.15)}" r="${r1(h * 0.14)}"/><circle cx="${r1(x)}" cy="${r1(base - h * 0.15)}" r="${r1(h * 0.14)}"/><circle cx="${r1(x + w * 0.32)}" cy="${r1(base - h * 0.15)}" r="${r1(h * 0.14)}"/></g>` +
    `<g fill="#e8dcc0" opacity=".85"><ellipse cx="${r1(x - w * 0.5 - 6)}" cy="${r1(base - h * 1.6)}" rx="8" ry="5"/><ellipse cx="${r1(x - w * 0.5 - 10)}" cy="${r1(base - h * 1.85)}" rx="6" ry="4"/></g>`
  );
}

/** 石油掘削やぐら。三角形の骨組みとポンプジャック。 */
function oilWell(x, base, h) {
  return (
    `<g stroke="#5a5040" stroke-width="2.4" fill="none"><path d="M${r1(x - h * 0.28)},${r1(base)}L${r1(x)},${r1(base - h)}L${r1(x + h * 0.28)},${r1(base)}"/><path d="M${r1(x - h * 0.14)},${r1(base - h * 0.5)}h${r1(h * 0.28)}"/><path d="M${r1(x - h * 0.21)},${r1(base - h * 0.25)}h${r1(h * 0.42)}"/></g>` +
    `<circle cx="${r1(x)}" cy="${r1(base - h - 4)}" r="3" fill="#e8443f"/>`
  );
}

// ---------------------------------------------------------------------------
// 背景(400×210)。5都市ぶん(プレビュー分)。以下、残り37都市ぶんを追加。
// ---------------------------------------------------------------------------

const MALAYSIA_BASE_BG = {
  /** クアラルンプール専用。ペトロナスツインタワーとスカイブリッジ、都市の緑地。 */
  twintowers:
    sky("#7cb8e0", "#e8c890", 150) +
    clouds(70, 30, 1) + clouds(330, 22, 0.7) +
    ground(150, "#4a8f3f") +
    // 遠景の高層ビル群
    `<g fill="#8f96a0" opacity=".85"><rect x="10" y="90" width="20" height="60"/><rect x="34" y="106" width="16" height="44"/><rect x="352" y="96" width="18" height="54"/><rect x="374" y="112" width="14" height="38"/></g>` +
    // ペトロナスツインタワー(左右対称。中央25%は隠れるため塔本体は左右に寄せる)
    `<g fill="#c9d4de" stroke="#9fb8c8" stroke-width="1">` +
    `<rect x="118" y="46" width="18" height="104" /><path d="M118,46L127,26L136,46z" fill="#e8443f"/>` +
    `<rect x="264" y="54" width="18" height="96"/><path d="M264,54L273,34L282,54z" fill="#e8443f"/>` +
    `</g>` +
    // スカイブリッジ
    `<rect x="136" y="96" width="128" height="6" fill="#9fb8c8"/>` +
    // 塔の窓の列
    `<g fill="#5b8fe8" opacity=".5">${Array.from({ length: 8 }).map((_, i) => `<rect x="121" y="${54 + i * 10}" width="12" height="4"/>`).join("")}${Array.from({ length: 8 }).map((_, i) => `<rect x="267" y="${62 + i * 10}" width="12" height="4"/>`).join("")}</g>` +
    // 手前の芝生の帯(この上にヤシ・ハイビスカス・高架を重ねる)
    ground(184, "#3f7a3a") +
    // 並木道のヤシ
    palmTree(50, 176, 46) + palmTree(350, 180, 40) +
    // ハイビスカス(国花)の植え込み
    `<g fill="#e8443f"><circle cx="70" cy="188" r="3"/><circle cx="80" cy="192" r="3"/><circle cx="330" cy="190" r="3"/></g>` +
    // KLIA/モノレール高架(手前を横切る)
    `<rect x="0" y="196" width="400" height="6" fill="#9a8f78"/>` +
    gull(160, 34, 0.8) + gull(240, 40, 0.7),

  /** ジョージタウン専用。色とりどりのショップハウスとクラン・ジェティ。 */
  shophouse:
    sky("#8fc4e8", "#cfe4f0", 116) +
    clouds(340, 24, 0.8) +
    ground(116, "#c9c0a8") +
    shophouseRow([
      [30, 116, 34, 58, "#e8a020", "#f6efe2"],
      [70, 116, 30, 52, "#5b8fe8", "#f6efe2"],
      [106, 116, 32, 56, "#e8dcc0", "#c9714a"],
      [300, 116, 30, 54, "#7fae5a", "#f6efe2"],
      [336, 116, 34, 58, "#e8443f", "#f6efe2"],
      [374, 116, 26, 48, "#f4c430", "#f6efe2"],
    ]) +
    // 五フィート街路のアーケード(手前)
    `<rect x="20" y="150" width="360" height="8" fill="#9a8f70" opacity=".85"/>` +
    `<g fill="#8a8478">${Array.from({ length: 9 }).map((_, i) => `<rect x="${26 + i * 42}" y="150" width="6" height="30"/>`).join("")}</g>` +
    // 壁の色斑(壁画の代わりに色面だけで賑わいを出す。文字は使わない)
    `<g opacity=".55"><rect x="112" y="128" width="18" height="14" fill="#5b8fe8"/><circle cx="318" cy="132" r="8" fill="#f5b31c"/></g>` +
    // 手前の舗道(この上にクラン・ジェティ・川・トライショーを重ねる)
    ground(182, "#b8ac8e") +
    // クラン・ジェティ(水上高床式集落。右手前)
    stiltHouse(346, 196, 26, 40, "#c9a877", "#9a7b4a") +
    stiltHouse(372, 200, 22, 34, "#e8dcc0", "#9a7b4a") +
    band(196, 14, "#2a95af") +
    ripples(202, "#bfe8f4") +
    // トライショー(三輪自転車タクシー)
    `<g><circle cx="140" cy="196" r="6" fill="none" stroke="#4a4a52" stroke-width="1.6"/><rect x="132" y="182" width="18" height="10" rx="2" fill="#e8443f"/></g>` +
    gull(50, 34, 0.8) + gull(360, 30, 0.7),

  /** マラッカ専用。アファモサ要塞の門とオランダ広場の赤い建物、河畔。 */
  afamosa:
    sky("#8fc4e8", "#cfe4f0", 128) +
    clouds(90, 26, 1) +
    ground(128, "#9ab35a") +
    // アファモサ要塞の石門(左)
    stoneGate(56, 176, 60, 66, "#9a8f78") +
    `<g fill="#7a7060">${Array.from({ length: 5 }).map((_, i) => `<rect x="${34 + i * 10}" y="${168 - (i % 2) * 4}" width="8" height="6"/>`).join("")}</g>` +
    // オランダ統治時代の赤い建物(スタダイス、右)
    `<rect x="280" y="120" width="90" height="56" fill="#a8402e"/>` +
    `<g fill="#f6efe2"><rect x="292" y="132" width="12" height="16"/><rect x="312" y="132" width="12" height="16"/><rect x="332" y="132" width="12" height="16"/><rect x="352" y="132" width="12" height="16"/></g>` +
    `<rect x="278" y="118" width="94" height="6" fill="#7a2a1f"/>` +
    // ジョンカー通りのランタン(石門と建物のあいだ、手前)
    `<g fill="#e8443f" opacity=".85"><ellipse cx="200" cy="150" rx="6" ry="8"/><ellipse cx="220" cy="146" rx="5" ry="7"/></g>` +
    // マラッカ川と伝統的な小舟(手前いっぱいまで水面)
    band(176, 34, "#2a95af") +
    ripples(184, "#bfe8f4") +
    `<path d="M150,194c6,-4 40,-4 46,0l-4,6h-38z" fill="#c9714a"/><path d="M172,194v-14" stroke="#5a4630" stroke-width="2"/>` +
    gull(240, 40, 0.8) + gull(30, 46, 0.7),

  /** クチン専用。猫の像と川辺の遊歩道、フォート・マルガリータ。 */
  catstatue:
    sky("#8fc4e8", "#cfe4f0", 132) +
    clouds(60, 28, 0.9) +
    ground(132, "#4a8f3f") +
    // フォート・マルガリータ(対岸の丘、右奥)
    `<path d="M300,132c0,-24 60,-24 60,0z" fill="#7a9068" opacity=".8"/>` +
    `<rect x="322" y="96" width="16" height="36" fill="#e8dcc0"/><path d="M322,96h16l-8,-10z" fill="#c9714a"/>` +
    // サラワク川と伝統的な渡し船(プラフ)
    band(132, 40, "#2a95af") +
    ripples(140, "#bfe8f4") + ripples(155, "#9fd0e4") +
    `<path d="M60,163c8,-5 46,-5 54,0l-5,6H65z" fill="#c9714a"/>` +
    // 川辺の遊歩道(手前)と大きな猫の像
    ground(172, "#c9c0a8") +
    catStatue(140, 200, 2.2) +
    catStatue(320, 196, 1.4) +
    palmTree(230, 200, 44) +
    gull(200, 36, 0.8) + gull(30, 44, 0.7),

  /** コタキナバル専用。キナバル山と海沿いの漁村。 */
  mountain:
    sky("#7cb8e0", "#e8c890", 132) +
    clouds(300, 26, 0.9) + clouds(70, 18, 0.7) +
    granitePeak(200, 132, 110, "#8f8a80") +
    // 山裾の雨林
    `<path d="M60,132c40,-20 260,-20 300,0v10H60z" fill="#2f6a30"/>` +
    ground(132, "#2f6a30") +
    `<g fill="#245a26" opacity=".8">${[100, 300].map((x) => `<path d="M${x - 14},132q14,-18 28,0z"/>`).join("")}</g>` +
    // 海と漁船
    band(160, 38, "#14788f") +
    ripples(168, "#bfe8f4") + ripples(178, "#9fd0e4") +
    `<path d="M40,186c6,-4 30,-4 36,0l-3,5H43z" fill="#e8dcc0"/><path d="M58,186v-16" stroke="#5a4630" stroke-width="1.6"/><path d="M58,172l14,6l-14,4z" fill="#f6efe2"/>` +
    `<path d="M300,192c6,-4 32,-4 38,0l-3,5H303z" fill="#c9714a"/>` +
    // 手前の砂浜(この上に桟橋を重ねる)
    ground(198, "#c9c0a8") +
    // 桟橋(ジェッセルトンポイント)
    `<rect x="150" y="192" width="100" height="6" fill="#9a7b4a"/>` +
    `<g fill="#5a4630">${Array.from({ length: 5 }).map((_, i) => `<rect x="${156 + i * 20}" y="198" width="4" height="8"/>`).join("")}</g>` +
    gull(120, 40, 0.9) + gull(280, 34, 0.7) + gull(340, 46, 0.6),

  /** 海辺の町・島(ランカウイ・クアラブスット・ティオマン・ルムット・クアンタン・ポートディクソン・ラブアン)。 */
  beach:
    sky("#7cb8e0", "#e8c890", 150) +
    clouds(70, 26, 1) + clouds(320, 20, 0.7) +
    band(150, 40, "#2a95af") +
    ripples(156, "#bfe8f4") + ripples(172, "#9fd0e4") +
    `<path d="M60,180c6,-4 34,-4 40,0l-4,6H64z" fill="#c9714a"/><path d="M80,180v-16" stroke="#5a4630" stroke-width="1.6"/><path d="M80,166l14,6l-14,4z" fill="#f6efe2"/>` +
    ground(190, "#e8dcc0") +
    palmTree(40, 190, 42) + palmTree(340, 194, 38) + palmTree(200, 200, 30) +
    `<g fill="#f6efe2" opacity=".9"><ellipse cx="290" cy="200" rx="16" ry="5"/></g>` +
    gull(150, 34, 0.8) + gull(250, 40, 0.7),

  /** プトラジャヤ・シャーアラム専用。バラ色/青のドームを持つ巨大モスクと湖。 */
  government:
    sky("#8fc4e8", "#cfe4f0", 140) +
    clouds(90, 26, 1) +
    ground(140, "#7fae5a") +
    mosqueDome(200, 140, 46, "#e8b0a0", "#8a3a2a") +
    `<g fill="#8a3a2a" opacity=".8">${[120, 280].map((x) => `<rect x="${x - 3}" y="70" width="6" height="70"/><path d="M${x - 4},70a4,4 0 0 1 8,0z"/>`).join("")}</g>` +
    band(176, 22, "#3f8fc4") +
    ripples(182, "#bfe8f4") +
    `<path d="M140,176c20,-8 100,-8 120,0" fill="none" stroke="#e8dcc0" stroke-width="6"/>` +
    ground(196, "#8ba85a") +
    palmTree(40, 196, 34) + palmTree(360, 200, 30) +
    gull(220, 40, 0.8) + gull(60, 34, 0.7),

  /** プタリンジャヤ・スパン専用。現代的な住宅街と高速道路。 */
  suburb:
    sky("#8fc4e8", "#cfe4f0", 130) +
    clouds(330, 22, 0.8) +
    ground(130, "#8ba85a") +
    `<g fill="#c9c0a8">${[30, 90, 150].map((x, i) => `<rect x="${x}" y="${94 - (i % 2) * 10}" width="40" height="${46 + (i % 2) * 10}"/>`).join("")}</g>` +
    `<g fill="#5b8fe8" opacity=".55">${[30, 90, 150].flatMap((x) => [0, 1, 2].map((r) => `<rect x="${x + 6}" y="${104 + r * 12}" width="8" height="6"/><rect x="${x + 26}" y="${104 + r * 12}" width="8" height="6"/>`)).join("")}</g>` +
    `<g fill="#8f96a0">${[260, 300, 340].map((x, i) => `<rect x="${x}" y="${86 - (i % 2) * 14}" width="26" height="${58 + (i % 2) * 14}"/>`).join("")}</g>` +
    ground(160, "#9a8f78") +
    `<rect x="0" y="180" width="400" height="16" fill="#5a5a5a"/>` +
    `<g fill="#f4c430" opacity=".8">${Array.from({ length: 8 }).map((_, i) => `<rect x="${10 + i * 50}" y="187" width="20" height="2"/>`).join("")}</g>` +
    ground(196, "#7fae5a") +
    gull(200, 40, 0.8),

  /** アロースター専用。ケダの田んぼとタワー、モスク。 */
  ricefield:
    sky("#8fc4e8", "#e8c890", 130) +
    clouds(320, 24, 0.8) +
    ground(130, "#c8d46a") +
    mosqueDome(90, 154, 22, "#f2f0e8", "#d4a017") +
    `<rect x="292" y="60" width="10" height="94" fill="#c9c0a8"/><ellipse cx="297" cy="58" rx="14" ry="7" fill="#8f96a0"/>` +
    `<g stroke="#a8b850" stroke-width="1.6" opacity=".85">${Array.from({ length: 9 }).map((_, i) => `<path d="M${20 + i * 42},210v-40"/>`).join("")}</g>` +
    `<g stroke="#7a8f4a" stroke-width="1.2" opacity=".7">${Array.from({ length: 4 }).map((_, i) => `<line x1="0" y1="${140 + i * 16}" x2="400" y2="${140 + i * 16}"/>`).join("")}</g>` +
    ground(190, "#9a8f70") +
    gull(150, 40, 0.8) + gull(250, 34, 0.7),

  /** タイピン専用。植民地時代の建物と湖畔庭園。 */
  "colonial-museum":
    sky("#8fc4e8", "#cfe4f0", 132) +
    clouds(70, 26, 0.9) + clouds(330, 20, 0.7) +
    ground(132, "#7fae5a") +
    `<rect x="130" y="90" width="140" height="42" fill="#e8dcc0"/><rect x="126" y="86" width="148" height="6" fill="#c9714a"/>` +
    `<g fill="#c9714a"><rect x="140" y="98" width="14" height="20"/><rect x="164" y="98" width="14" height="20"/><rect x="222" y="98" width="14" height="20"/><rect x="246" y="98" width="14" height="20"/></g>` +
    `<g fill="#f6efe2" opacity=".8"><rect x="142" y="100" width="10" height="14"/><rect x="166" y="100" width="10" height="14"/><rect x="224" y="100" width="10" height="14"/><rect x="248" y="100" width="10" height="14"/></g>` +
    `<rect x="192" y="70" width="16" height="62" fill="#e8dcc0"/><path d="M192,70h16l-8,-14z" fill="#c9714a"/>` +
    `<rect x="196" y="60" width="8" height="10" fill="#8a8478"/>` +
    band(160, 30, "#3f8fc4") +
    ripples(166, "#bfe8f4") + ripples(178, "#9fd0e4") +
    roundTreeFallback(50, 190, 26) + roundTreeFallback(350, 194, 24) + roundTreeFallback(100, 198, 16) +
    ground(190, "#8ba85a") +
    `<g fill="#e8443f" opacity=".85"><circle cx="120" cy="196" r="2.4"/><circle cx="280" cy="200" r="2.4"/></g>` +
    gull(230, 40, 0.8) + gull(30, 46, 0.7),

  /** クアラカンサール専用。金色のドームを持つ王室モスクと川。 */
  "royal-mosque":
    sky("#7cb8e0", "#e8c890", 140) +
    clouds(90, 26, 1) + clouds(320, 20, 0.7) +
    ground(140, "#7fae5a") +
    `<g fill="#8f96a0" opacity=".5"><rect x="80" y="110" width="16" height="30"/><rect x="300" y="106" width="14" height="34"/></g>` +
    mosqueDome(200, 140, 40, "#f2f0e8", "#d4a017") +
    `<rect x="176" y="120" width="10" height="20" fill="#f2f0e8" stroke="#d4a017" stroke-width="1"/><rect x="214" y="120" width="10" height="20" fill="#f2f0e8" stroke="#d4a017" stroke-width="1"/>` +
    band(172, 26, "#2a95af") +
    ripples(178, "#bfe8f4") + ripples(190, "#9fd0e4") +
    `<path d="M40,192c6,-4 28,-4 34,0l-3,5H43z" fill="#c9714a"/><path d="M62,192v-12" stroke="#5a4630" stroke-width="1.4"/>` +
    ground(196, "#8ba85a") +
    palmTree(340, 196, 32) + palmTree(120, 200, 26) +
    `<g fill="#d4a017" opacity=".8"><circle cx="200" cy="200" r="2"/><circle cx="210" cy="204" r="2"/></g>` +
    gull(280, 40, 0.8) + gull(60, 34, 0.7),

  /** クアラトレンガヌ専用。鋼とガラスのクリスタルモスクと川。 */
  crystalmosque:
    sky("#7cb8e0", "#cfe4f0", 138) +
    clouds(330, 22, 0.8) + clouds(50, 18, 0.7) +
    ground(138, "#3f8fc4") +
    ripples(150, "#bfe8f4") + ripples(166, "#9fd0e4") + ripples(180, "#7fc0d8") +
    `<rect x="150" y="86" width="100" height="52" fill="#bfe0f0" opacity=".9"/>` +
    `<path d="M150,86a50,26 0 0 1 100,0z" fill="#dff0f8" opacity=".9"/>` +
    `<g stroke="#5b8fe8" stroke-width="1.4">${Array.from({ length: 8 }).map((_, i) => `<line x1="${158 + i * 12}" y1="90" x2="${158 + i * 12}" y2="138"/>`).join("")}</g>` +
    `<rect x="196" y="60" width="8" height="30" fill="#bfe0f0"/><circle cx="200" cy="58" r="2.4" fill="#d4a017"/>` +
    `<g fill="#8f96a0" opacity=".4"><rect x="270" y="100" width="14" height="38"/><rect x="290" y="94" width="12" height="44"/></g>` +
    `<path d="M60,168c6,-4 26,-4 32,0l-3,6H63z" fill="#c9714a"/><path d="M76,168v-10" stroke="#5a4630" stroke-width="1.2"/>` +
    ground(178, "#c9c0a8") +
    `<g fill="#e8dcc0" opacity=".8"><rect x="100" y="182" width="20" height="4"/><rect x="290" y="186" width="24" height="4"/></g>` +
    gull(300, 40, 0.8) + gull(340, 34, 0.7),

  /** コタバル専用。市場の露店と大きなワウ凧。 */
  "batik-kite":
    sky("#8fc4e8", "#cfe4f0", 110) +
    clouds(60, 24, 0.9) + clouds(340, 18, 0.7) +
    `<path d="M280,60c-14,-18 -50,-16 -60,4c-14,-6 -30,4 -26,20c14,8 76,4 86,-24z" fill="#e8443f" opacity=".9"/>` +
    `<line x1="280" y1="60" x2="330" y2="110" stroke="#5a4a3a" stroke-width="1"/>` +
    `<path d="M120,50c-8,-10 -28,-8 -32,4c-8,-2 -16,4 -12,12c8,4 40,0 44,-16z" fill="#f4c430" opacity=".85"/>` +
    `<line x1="120" y1="50" x2="150" y2="100" stroke="#5a4a3a" stroke-width="1"/>` +
    ground(110, "#c9c0a8") +
    shophouseRow([
      [40, 110, 30, 42, "#e8a020", "#f6efe2"],
      [80, 110, 28, 38, "#5b8fe8", "#f6efe2"],
    ]) +
    `<g fill="#f4c430" opacity=".85">${[130, 170, 210, 250].map((x) => `<rect x="${x}" y="130" width="30" height="18"/>`).join("")}</g>` +
    `<g fill="#e8443f" opacity=".7">${[135, 175, 215, 255].map((x) => `<rect x="${x}" y="148" width="20" height="6"/>`).join("")}</g>` +
    `<g fill="#7fae5a" opacity=".8">${[132, 172, 212, 252].map((x) => `<circle cx="${x + 15}" cy="126" r="3"/>`).join("")}</g>` +
    ground(184, "#b8ac8e") +
    `<g fill="#9a8f70" opacity=".8"><ellipse cx="200" cy="196" rx="14" ry="4"/><ellipse cx="300" cy="200" rx="10" ry="3"/></g>` +
    gull(340, 40, 0.8) + gull(30, 46, 0.7),

  /** キャメロンハイランド専用。段々の茶畑と霧。 */
  "hillstation-tea":
    sky("#9fc8e0", "#dfeaf0", 120) +
    clouds(60, 30, 1.2) + clouds(320, 26, 1) +
    ground(120, "#5f8f4a") +
    terraceRows(120, 200, 180, 9, "#3f7a3a") +
    terraceRows(300, 190, 140, 7, "#4a8a44") +
    `<rect x="330" y="150" width="30" height="20" fill="#e8dcc0"/><path d="M328,150h34l-17,-14z" fill="#c9714a"/>` +
    `<g fill="#f6efe2" opacity=".7"><ellipse cx="90" cy="150" rx="40" ry="10"/><ellipse cx="250" cy="130" rx="30" ry="8"/></g>` +
    ground(200, "#4a8a44") +
    gull(60, 40, 0.8),

  /** ゲンティンハイランド専用。雲の上のロープウェイとリゾート。 */
  "hillstation-casino":
    sky("#6fa8d8", "#cfe4f0", 150) +
    `<g fill="#f6efe2" opacity=".9"><ellipse cx="60" cy="150" rx="60" ry="16"/><ellipse cx="340" cy="160" rx="70" ry="18"/><ellipse cx="200" cy="170" rx="90" ry="14"/></g>` +
    `<g fill="#eef2f4" opacity=".7"><ellipse cx="150" cy="140" rx="30" ry="8"/><ellipse cx="270" cy="145" rx="34" ry="9"/></g>` +
    cableCarLine(60, 190, 340, 100, 40) +
    `<rect x="140" y="70" width="10" height="80" fill="#8f96a0"/>` +
    `<g fill="#8f96a0">${[180, 210, 240].map((x, i) => `<rect x="${x}" y="${80 - i * 8}" width="20" height="${70 + i * 8}"/>`).join("")}</g>` +
    `<g fill="#f4c430" opacity=".7">${[186, 216, 246].flatMap((x) => [0, 1, 2].map((r) => `<rect x="${x + 3}" y="${100 + r * 16}" width="6" height="8"/>`)).join("")}</g>` +
    `<g fill="#5b8fe8" opacity=".6">${[144].flatMap(() => [0, 1, 2, 3].map((r) => `<rect x="142" y="${76 + r * 16}" width="6" height="8"/>`)).join("")}</g>` +
    ground(150, "#3f6a3f") +
    `<g fill="#2f5a2f" opacity=".8">${[40, 370].map((x) => `<path d="M${x - 10},150q10,-18 20,0z"/>`).join("")}</g>` +
    gull(100, 40, 0.8) + gull(300, 34, 0.7),

  /** タマンヌガラ専用。木々のあいだのキャノピーウォークと熱帯雨林。 */
  "rainforest-canopy":
    sky("#8fc4e8", "#cfe4f0", 100) +
    clouds(340, 20, 0.7) + clouds(60, 22, 0.8) +
    `<path d="M0,100c50,-30 350,-30 400,0v10H0z" fill="#2f6a30"/>` +
    ground(100, "#2f6a30") +
    `<g fill="#245a26">${[60, 160, 260, 340].map((x, i) => `<rect x="${x - 6}" y="${70 - (i % 2) * 10}" width="12" height="${100 + (i % 2) * 10}"/>`).join("")}</g>` +
    `<g fill="#1e4a20" opacity=".8">${[60, 160, 260, 340].map((x) => `<ellipse cx="${x}" cy="${70}" rx="28" ry="14"/>`).join("")}</g>` +
    `<g stroke="#4a3020" stroke-width="1.6" fill="none" opacity=".8"><path d="M60,70q6,20 -4,40"/><path d="M260,70q-6,20 4,40"/></g>` +
    canopyWalk(90, 130, 220) +
    `<g fill="#c9a877" opacity=".9"><circle cx="120" cy="126" r="3"/><circle cx="280" cy="128" r="3"/></g>` +
    ground(190, "#3f7a3a") +
    `<g fill="#7fae5a" opacity=".8">${[30, 100, 300, 370].map((x) => `<path d="M${x - 6},200q6,-14 12,0z"/>`).join("")}</g>` +
    gull(200, 40, 0.8) + gull(320, 34, 0.7),

  /** セレンバン専用。鞍形屋根のミナンカバウ様式建築。 */
  minangkabau:
    sky("#8fc4e8", "#cfe4f0", 130) +
    clouds(70, 24, 0.9) + clouds(330, 20, 0.7) +
    ground(130, "#7fae5a") +
    `<rect x="150" y="110" width="100" height="30" fill="#e8dcc0"/>` +
    `<path d="M150,110c0,-20 10,-30 20,-30c-4,10 0,18 10,18c-6,-14 4,-24 20,-24c-6,12 2,20 12,20c-4,-12 8,-22 20,-22c10,0 18,10 18,26c0,4 -4,10 -8,12z" fill="#8a3a2a"/>` +
    `<g fill="#c9714a"><rect x="164" y="118" width="10" height="16"/><rect x="188" y="118" width="10" height="16"/><rect x="212" y="118" width="10" height="16"/><rect x="236" y="118" width="10" height="16"/></g>` +
    `<rect x="146" y="138" width="108" height="4" fill="#c9a877"/>` +
    `<g fill="#8a3a2a" opacity=".85"><circle cx="170" cy="106" r="2"/><circle cx="200" cy="102" r="2"/><circle cx="230" cy="106" r="2"/></g>` +
    ground(188, "#8ba85a") +
    roundTreeFallback(60, 190, 24) + roundTreeFallback(340, 194, 22) + roundTreeFallback(100, 198, 16) +
    `<g fill="#e8443f" opacity=".8"><circle cx="80" cy="196" r="2.4"/><circle cx="90" cy="200" r="2.4"/></g>` +
    gull(230, 40, 0.8) + gull(30, 44, 0.7),

  /** ジョホールバル専用。近代的な高層ビルとコーズウェイ、モスク。 */
  "causeway-city":
    sky("#8fc4e8", "#cfe4f0", 128) +
    clouds(60, 26, 0.9) +
    ground(128, "#7fae5a") +
    `<g fill="#8f96a0">${[40, 70, 320, 350].map((x, i) => `<rect x="${x}" y="${70 - (i % 2) * 16}" width="24" height="${60 + (i % 2) * 16}"/>`).join("")}</g>` +
    mosqueDome(200, 128, 24, "#f6efe2", "#3a5a30") +
    band(160, 20, "#2a95af") +
    ripples(166, "#bfe8f4") +
    `<rect x="0" y="180" width="400" height="8" fill="#c9c0a8"/>` +
    `<g fill="#5a5a5a">${Array.from({ length: 8 }).map((_, i) => `<rect x="${16 + i * 48}" y="184" width="4" height="10"/>`).join("")}</g>` +
    ground(196, "#8ba85a") +
    gull(150, 40, 0.8) + gull(260, 34, 0.7),

  /** ムアル・シブ・リンバン専用。川辺のショップハウスと渡し船。 */
  rivertown:
    sky("#8fc4e8", "#cfe4f0", 116) +
    clouds(340, 22, 0.8) +
    ground(116, "#c9c0a8") +
    shophouseRow([
      [40, 116, 30, 44, "#e8a020", "#f6efe2"],
      [76, 116, 28, 40, "#7fae5a", "#f6efe2"],
      [300, 116, 30, 44, "#5b8fe8", "#f6efe2"],
      [340, 116, 26, 38, "#e8443f", "#f6efe2"],
    ]) +
    ground(160, "#b8ac8e") +
    band(172, 30, "#2a95af") +
    ripples(178, "#bfe8f4") +
    `<path d="M150,196c6,-4 40,-4 46,0l-4,6h-38z" fill="#c9714a"/><path d="M172,196v-14" stroke="#5a4630" stroke-width="2"/>` +
    gull(240, 40, 0.8) + gull(30, 44, 0.7),

  /** メルシン専用。桟橋と底引き網漁船。 */
  "fishing-jetty":
    sky("#8fc4e8", "#cfe4f0", 130) +
    clouds(80, 24, 0.9) + clouds(330, 18, 0.7) +
    ground(130, "#7fae5a") +
    `<g fill="#8ba85a" opacity=".8">${[20, 370].map((x) => `<rect x="${x - 6}" y="110" width="12" height="20"/>`).join("")}</g>` +
    band(150, 40, "#2a95af") +
    ripples(158, "#bfe8f4") + ripples(172, "#9fd0e4") +
    `<path d="M40,178c8,-6 40,-6 48,0l-4,8H44z" fill="#c9c0a8"/><rect x="60" y="150" width="4" height="28" fill="#5a4630"/><path d="M60,150l12,5l-12,4z" fill="#f6efe2"/>` +
    `<path d="M240,182c8,-6 44,-6 52,0l-4,8H244z" fill="#e8dcc0"/><rect x="260" y="154" width="4" height="28" fill="#5a4630"/>` +
    `<g fill="#5a4a3a" opacity=".8"><ellipse cx="150" cy="176" rx="10" ry="4"/><ellipse cx="170" cy="180" rx="8" ry="3"/></g>` +
    `<rect x="0" y="190" width="400" height="6" fill="#9a7b4a"/>` +
    `<g fill="#5a4630">${Array.from({ length: 8 }).map((_, i) => `<rect x="${10 + i * 50}" y="196" width="4" height="10"/>`).join("")}</g>` +
    `<g fill="#f4c430" opacity=".8"><rect x="330" y="180" width="14" height="10"/><rect x="348" y="184" width="12" height="6"/></g>` +
    gull(150, 40, 0.8) + gull(340, 34, 0.7) + gull(200, 44, 0.6),

  /** ミリ専用。石油掘削やぐらとヤシ。 */
  oilderrick:
    sky("#7cb8e0", "#e8c890", 140) +
    clouds(320, 22, 0.8) + clouds(90, 20, 0.7) +
    ground(140, "#7fae5a") +
    oilWell(120, 140, 60) +
    oilWell(190, 140, 34) +
    `<rect x="230" y="112" width="60" height="28" fill="#e8dcc0"/><path d="M228,112h64l-10,-10h-44z" fill="#c9714a"/>` +
    `<g fill="#c9714a" opacity=".85"><rect x="238" y="118" width="10" height="14"/><rect x="256" y="118" width="10" height="14"/></g>` +
    palmTree(340, 196, 34) + palmTree(40, 196, 30) +
    band(176, 20, "#14788f") +
    ripples(180, "#bfe8f4") +
    ground(196, "#c9c0a8") +
    `<g fill="#5a4630" opacity=".8"><rect x="150" y="200" width="4" height="8"/><rect x="170" y="200" width="4" height="8"/></g>` +
    gull(200, 40, 0.8) + gull(280, 34, 0.7),

  /** グヌン・ムル専用。洞窟の入り口とコウモリの渦。 */
  caves:
    sky("#7cb8e0", "#cfe4f0", 120) +
    clouds(330, 20, 0.7) +
    `<path d="M0,120c40,-16 360,-16 400,0v10H0z" fill="#2f6a30"/>` +
    ground(120, "#2f6a30") +
    caveMouth(200, 190, 160, 100, "#6a6558") +
    `<g fill="#3a3530" opacity=".85">${Array.from({ length: 22 }).map((_, i) => {
      const a = (i / 22) * Math.PI * 2.4;
      const r = 30 + (i % 5) * 8;
      const cx = 200 + Math.cos(a) * r;
      const cy = 70 + Math.sin(a) * r * 0.5;
      return `<path d="M${r1(cx)},${r1(cy)}l4,-2l4,2l-4,2z"/>`;
    }).join("")}</g>` +
    ground(198, "#8a8478") +
    gull(60, 40, 0.7),

  /** バコ専用。海食柱とテングザル。 */
  seastacks:
    sky("#8fc4e8", "#cfe4f0", 140) +
    clouds(70, 24, 0.9) + clouds(340, 20, 0.7) +
    ground(140, "#7fae5a") +
    `<g fill="#245a26">${[40, 380].map((x) => `<rect x="${x - 5}" y="106" width="10" height="34"/>`).join("")}</g>` +
    band(160, 40, "#2a95af") +
    ripples(166, "#bfe8f4") + ripples(182, "#9fd0e4") +
    seaStack(100, 200, 30, 60) + seaStack(150, 202, 20, 40) + seaStack(320, 198, 26, 50) +
    `<g fill="#8a7a5a"><ellipse cx="240" cy="176" rx="10" ry="7"/><circle cx="240" cy="164" r="6"/><path d="M232,158l6,-2l-2,6z" fill="#c9a877"/></g>` +
    `<g fill="#7a4a2a" opacity=".9"><circle cx="60" cy="182" r="5"/><ellipse cx="60" cy="192" rx="4" ry="8"/></g>` +
    ground(198, "#c9c0a8") +
    `<g fill="#e8dcc0" opacity=".8"><ellipse cx="200" cy="204" rx="14" ry="3"/><ellipse cx="260" cy="206" rx="10" ry="2.6"/></g>` +
    gull(300, 40, 0.8) + gull(20, 46, 0.7),

  /** サンダカン専用。雨林とオランウータン、記念公園。 */
  orangutan:
    sky("#8fc4e8", "#cfe4f0", 108) +
    clouds(340, 20, 0.7) + clouds(80, 24, 0.8) +
    `<path d="M0,108c50,-24 350,-24 400,0v10H0z" fill="#2f6a30"/>` +
    ground(108, "#2f6a30") +
    `<g fill="#245a26">${[30, 130, 350, 380].map((x, i) => `<rect x="${x - 5}" y="${76 - (i % 2) * 10}" width="10" height="${90 + (i % 2) * 10}"/>`).join("")}</g>` +
    `<g stroke="#3f7a3a" stroke-width="2" fill="none" opacity=".8"><path d="M40,80q10,20 0,40"/><path d="M360,76q-10,24 0,44"/><path d="M130,80q8,18 -2,38"/></g>` +
    `<g fill="#7a4a2a"><path d="M280,150q-4,-30 0,-40" stroke="#7a4a2a" stroke-width="5" fill="none"/><circle cx="280" cy="100" r="12"/><ellipse cx="266" cy="128" rx="8" ry="20"/><ellipse cx="294" cy="128" rx="8" ry="20"/></g>` +
    `<g fill="#5a3a1f"><ellipse cx="270" cy="96" rx="3" ry="4"/><ellipse cx="290" cy="96" rx="3" ry="4"/></g>` +
    `<rect x="60" y="150" width="18" height="40" fill="#e8dcc0"/><path d="M58,150h22l-11,-12z" fill="#c9714a"/>` +
    `<g fill="#9a8f70" opacity=".85"><rect x="55" y="188" width="28" height="4"/><rect x="52" y="192" width="34" height="3"/></g>` +
    ground(190, "#8ba85a") +
    `<g fill="#f4c430" opacity=".7"><circle cx="150" cy="196" r="3"/><circle cx="160" cy="200" r="3"/></g>` +
    gull(150, 40, 0.8) + gull(230, 34, 0.7) + gull(30, 46, 0.6),

  /** センポルナ専用。ターコイズブルーの礁湖に浮かぶ水上高床式集落。 */
  stiltreef:
    sky("#8fc4e8", "#cfe4f0", 120) +
    clouds(60, 24, 0.9) + clouds(340, 18, 0.7) +
    band(120, 90, "#1ea6b8") +
    ripples(130, "#bfe8f4") + ripples(150, "#9fd0e4") + ripples(170, "#7fd0d8") +
    `<g fill="#0f8fa0" opacity=".5"><ellipse cx="100" cy="140" rx="30" ry="8"/><ellipse cx="280" cy="150" rx="36" ry="9"/></g>` +
    stiltHouse(90, 176, 24, 36, "#c9a877", "#9a7b4a") +
    stiltHouse(140, 182, 20, 32, "#e8dcc0", "#9a7b4a") +
    stiltHouse(300, 178, 22, 34, "#c9714a", "#9a7b4a") +
    `<g stroke="#9a7b4a" stroke-width="2.4"><path d="M102,176h26M160,182h30"/></g>` +
    `<path d="M220,196c6,-4 24,-4 30,0l-3,5H223z" fill="#e8dcc0"/><path d="M235,196v-10" stroke="#5a4630" stroke-width="1.4"/>` +
    ground(206, "#e8dcc0") +
    `<g fill="#5a4a3a" opacity=".85"><ellipse cx="60" cy="210" rx="10" ry="3"/></g>` +
    gull(250, 40, 0.8) + gull(40, 34, 0.7) + gull(180, 44, 0.6),

  /** クダット専用。ロングハウスとボルネオ最北端の岬。 */
  longhouse:
    sky("#7cb8e0", "#cfe4f0", 132) +
    clouds(320, 24, 0.9) + clouds(80, 18, 0.7) +
    ground(132, "#7fae5a") +
    longhouseHut(160, 178, 200, 60, "#c9a877", "#9a7b4a") +
    `<g fill="#e8443f" opacity=".85"><rect x="100" y="150" width="6" height="10"/><rect x="150" y="146" width="6" height="10"/><rect x="200" y="150" width="6" height="10"/></g>` +
    band(178, 20, "#14788f") +
    ripples(184, "#bfe8f4") + ripples(192, "#9fd0e4") +
    `<path d="M340,190c-4,-30 20,-50 40,-50c0,20 -14,40 -40,50z" fill="#8a8478"/>` +
    `<rect x="360" y="150" width="6" height="16" fill="#f2f0e8"/>` +
    ground(198, "#c9c0a8") +
    `<g fill="#c9a877" opacity=".85"><rect x="40" y="200" width="16" height="4"/><rect x="60" y="204" width="12" height="3"/></g>` +
    gull(60, 40, 0.9) + gull(300, 34, 0.7) + gull(200, 46, 0.6),

  /** テノム専用。パダス渓谷を走る蒸気機関車。 */
  steamtrain:
    sky("#8fc4e8", "#cfe4f0", 110) +
    clouds(70, 24, 0.9) +
    `<path d="M0,110c30,-40 100,-50 140,-30c20,-30 80,-30 100,0c40,-20 120,-10 160,20v10H0z" fill="#2f6a30"/>` +
    ground(110, "#2f6a30") +
    band(150, 20, "#3f8fc4") +
    ripples(156, "#bfe8f4") +
    `<rect x="0" y="176" width="400" height="10" fill="#8a8478"/>` +
    `<g stroke="#5a4630" stroke-width="2">${Array.from({ length: 12 }).map((_, i) => `<line x1="${20 + i * 32}" y1="176" x2="${20 + i * 32}" y2="186"/>`).join("")}</g>` +
    steamLoco(180, 176, 1.4) +
    `<g fill="#c8c8c8" opacity=".7"><ellipse cx="120" cy="120" rx="16" ry="8"/><ellipse cx="100" cy="112" rx="12" ry="6"/></g>` +
    ground(186, "#9a7b4a") +
    gull(320, 40, 0.8),

  /** クラン・ビントゥル・タワウ専用。起重機とコンテナ、貨物船の港。 */
  port:
    sky("#8fc4e8", "#cfe4f0", 130) +
    clouds(70, 24, 0.9) + clouds(330, 18, 0.7) +
    ground(130, "#7fae5a") +
    `<g fill="#8f96a0" opacity=".6"><rect x="10" y="108" width="14" height="22"/><rect x="370" y="104" width="16" height="26"/></g>` +
    crane(70, 176, 60, "#e8443f") + crane(120, 176, 50, "#5b8fe8") +
    `<g fill="#e8443f">${[0, 1, 2].map((i) => `<rect x="${170 + i * 22}" y="${150 - (i % 2) * 8}" width="18" height="14"/>`).join("")}</g>` +
    `<g fill="#f4c430">${[0, 1, 2].map((i) => `<rect x="${170 + i * 22}" y="${166 - (i % 2) * 8}" width="18" height="14"/>`).join("")}</g>` +
    `<g fill="#5b8fe8" opacity=".85">${[0, 1].map((i) => `<rect x="${236 + i * 22}" y="158" width="18" height="14"/>`).join("")}</g>` +
    band(176, 20, "#14788f") +
    ripples(182, "#bfe8f4") + ripples(190, "#9fd0e4") +
    `<path d="M260,192c10,-6 90,-6 100,0l-6,10H266z" fill="#8f96a0"/><rect x="290" y="170" width="10" height="22" fill="#5a5a5a"/>` +
    `<g fill="#e8443f" opacity=".9"><rect x="270" y="184" width="10" height="6"/><rect x="284" y="184" width="10" height="6"/></g>` +
    ground(196, "#c9c0a8") +
    `<g fill="#5a4630"><rect x="20" y="200" width="4" height="10"/><rect x="40" y="200" width="4" height="10"/></g>` +
    gull(340, 40, 0.8) + gull(50, 46, 0.7) + gull(200, 36, 0.6),
};

export const MALAYSIA_BG = { ...MALAYSIA_BASE_BG };

// ---------------------------------------------------------------------------
// 都市シンボル(5種、プレビュー)。鍵は cities.mjs の `mark` と対応。24×24の座標系。
// ---------------------------------------------------------------------------

export const MALAYSIA_MARKS = {
  /** ペトロナスツインタワーとスカイブリッジ。クアラルンプール専用。 */
  twintowers:
    `<rect x="5" y="6" width="4" height="16" fill="#c9d4de"/><path d="M5,6L7,2L9,6z" fill="#e8443f"/>` +
    `<rect x="15" y="8" width="4" height="14" fill="#c9d4de"/><path d="M15,8L17,4L19,8z" fill="#e8443f"/>` +
    `<rect x="9" y="13" width="6" height="2" fill="#9fb8c8"/>`,

  /** 五フィート街路の色とりどりのショップハウス。ジョージタウン専用。 */
  shophouse:
    `<rect x="2" y="12" width="8" height="10" fill="#e8a020"/><rect x="10" y="10" width="7" height="12" fill="#5b8fe8"/><rect x="17" y="13" width="5" height="9" fill="#e8443f"/>` +
    `<rect x="1" y="20" width="22" height="2" fill="#9a8f70"/>`,

  /** アファモサ要塞の石門。マラッカ専用。 */
  afamosa:
    `<path d="M4,22v-8a8,8 0 0 1 16,0v8z" fill="#9a8f78"/>` +
    `<rect x="9" y="14" width="6" height="8" fill="#5a5040"/>`,

  /** 猫の像。クチン専用(町の名は「猫」の意)。 */
  catstatue:
    `<ellipse cx="12" cy="18" rx="7" ry="5" fill="#e8dcc0" stroke="#9a8f70" stroke-width="1"/>` +
    `<circle cx="12" cy="11" r="5" fill="#e8dcc0" stroke="#9a8f70" stroke-width="1"/>` +
    `<path d="M8,8l-1,-3 3,1z M16,8l1,-3 -3,1z" fill="#e8dcc0"/>`,

  /** ジャノメ状の花崗岩の峰。コタキナバル専用。 */
  mountain:
    `<path d="M2,22L8,10L11,15L13,8L22,22z" fill="#8f8a80"/>` +
    `<path d="M11,15L13,8L15,13z" fill="#eef1ee"/>`,

  /** ヤシと波打ち際。海辺の町・島専用。 */
  beach:
    `<rect x="0" y="17" width="24" height="6" fill="#e8dcc0"/><path d="M0,17q6,3 12,0t12,0" fill="none" stroke="#2a95af" stroke-width="2"/>` +
    `<path d="M9,17q-1,-7 -3,-10" stroke="#6b5330" stroke-width="1.4" fill="none"/><g fill="#2f6a30"><path d="M6,7q-5,-1 -6,3q4,1 6,-3z"/><path d="M6,7q5,-1 6,3q-4,1 -6,-3z"/></g>`,

  /** バラ色のドームを持つモスク。プトラジャヤ・シャーアラム専用。 */
  government:
    `<rect x="8" y="16" width="8" height="6" fill="#e8b0a0"/><path d="M6,16a6,6 0 0 1 12,0z" fill="#e8b0a0" stroke="#8a3a2a" stroke-width="1"/>` +
    `<rect x="11" y="4" width="2" height="4" fill="#8a3a2a"/>`,

  /** 現代的な住宅の並び。プタリンジャヤ・スパン専用。 */
  suburb:
    `<rect x="2" y="12" width="6" height="10" fill="#c9c0a8"/><rect x="9" y="9" width="6" height="13" fill="#c9c0a8"/><rect x="16" y="13" width="6" height="9" fill="#c9c0a8"/>` +
    `<g fill="#5b8fe8"><rect x="4" y="15" width="2" height="2"/><rect x="11" y="12" width="2" height="2"/><rect x="18" y="16" width="2" height="2"/></g>`,

  /** 起重機とコンテナ。クラン・ビントゥル・タワウ専用。 */
  port:
    `<rect x="10" y="4" width="2" height="14" fill="#e8443f"/><rect x="10" y="4" width="9" height="2" fill="#e8443f"/>` +
    `<g fill="#f4c430"><rect x="2" y="18" width="7" height="5"/><rect x="10" y="18" width="7" height="5" fill="#5b8fe8"/></g>`,

  /** 田んぼの畝とタワー。アロースター専用。 */
  ricefield:
    `<g stroke="#a8b850" stroke-width="1.6"><path d="M2,20v-8M8,20v-8M14,20v-8M20,20v-8"/></g>` +
    `<rect x="18" y="4" width="3" height="12" fill="#c9c0a8"/>`,

  /** 植民地様式の建物正面。タイピン専用。 */
  "colonial-museum":
    `<rect x="3" y="12" width="18" height="10" fill="#e8dcc0"/><rect x="2" y="9" width="20" height="3" fill="#c9714a"/>` +
    `<g fill="#c9714a"><rect x="6" y="14" width="4" height="6"/><rect x="14" y="14" width="4" height="6"/></g>`,

  /** 金色のドーム。クアラカンサール専用。 */
  "royal-mosque":
    `<rect x="8" y="16" width="8" height="6" fill="#f2f0e8"/><path d="M6,16a6,6 0 0 1 12,0z" fill="#f2f0e8" stroke="#d4a017" stroke-width="1.4"/>` +
    `<rect x="11" y="4" width="2" height="4" fill="#d4a017"/><circle cx="12" cy="3" r="1.6" fill="#d4a017"/>`,

  /** 鋼とガラスのモスク。クアラトレンガヌ専用。 */
  crystalmosque:
    `<rect x="4" y="12" width="16" height="10" fill="#bfe0f0"/><path d="M4,12a8,5 0 0 1 16,0z" fill="#dff0f8"/>` +
    `<g stroke="#5b8fe8" stroke-width="1"><path d="M8,12v10M12,12v10M16,12v10"/></g>`,

  /** 大きな装飾凧ワウ。コタバル専用。 */
  "batik-kite":
    `<path d="M20,4c-3,-3 -9,-2 -10,2c-3,-1 -6,1 -5,4c3,1 13,1 15,-6z" fill="#e8443f"/><line x1="20" y1="4" x2="24" y2="22" stroke="#5a4a3a" stroke-width="1"/>`,

  /** 段々の茶畑。キャメロンハイランド専用。 */
  "hillstation-tea":
    `<path d="M2,22c4,-14 16,-14 20,0z" fill="#5f8f4a"/>` +
    `<g stroke="#3f7a3a" stroke-width="1.4" fill="none"><path d="M5,20q7,-3 14,0M6,15q6,-3 12,0M8,10q4,-2 8,0"/></g>`,

  /** ロープウェイ。ゲンティンハイランド専用。 */
  "hillstation-casino":
    `<line x1="2" y1="6" x2="22" y2="18" stroke="#5a5a5a" stroke-width="1.2"/>` +
    `<rect x="2" y="4" width="3" height="6" fill="#8a8478"/><rect x="19" y="16" width="3" height="6" fill="#8a8478"/>` +
    `<rect x="9" y="10" width="7" height="5" rx="1.4" fill="#e8443f"/>`,

  /** 木々のあいだのキャノピーウォーク。タマンヌガラ専用。 */
  "rainforest-canopy":
    `<rect x="2" y="6" width="4" height="16" fill="#245a26"/><rect x="18" y="6" width="4" height="16" fill="#245a26"/>` +
    `<path d="M6,10q6,6 12,0" fill="none" stroke="#9a7b4a" stroke-width="2"/>`,

  /** 鞍形屋根。セレンバン専用(ミナンカバウ様式)。 */
  minangkabau:
    `<rect x="6" y="14" width="12" height="8" fill="#e8dcc0"/>` +
    `<path d="M6,14c0,-6 2,-8 4,-8c-1,3 0,5 2,5c-1,-4 1,-7 4,-7c-1,4 1,6 3,6c1,-2 3,-2 3,0c0,2 -2,4 -4,4z" fill="#8a3a2a"/>`,

  /** コーズウェイ(海峡を渡る橋)。ジョホールバル専用。 */
  "causeway-city":
    `<g fill="#8f96a0"><rect x="2" y="8" width="4" height="10"/><rect x="18" y="6" width="4" height="12"/></g>` +
    `<rect x="0" y="18" width="24" height="3" fill="#c9c0a8"/><path d="M2,18v-4M8,18v-4M14,18v-4M20,18v-4" stroke="#5a5a5a" stroke-width="1.2"/>`,

  /** 川辺のショップハウスと渡し船。ムアル・シブ・リンバン専用。 */
  rivertown:
    `<rect x="3" y="10" width="7" height="10" fill="#e8a020"/><rect x="11" y="8" width="6" height="12" fill="#7fae5a"/>` +
    `<rect x="0" y="20" width="24" height="4" fill="#2a95af"/><path d="M4,22c3,-2 8,-2 11,0" fill="none" stroke="#c9714a" stroke-width="1.6"/>`,

  /** 桟橋と漁船。メルシン専用。 */
  "fishing-jetty":
    `<rect x="0" y="16" width="24" height="3" fill="#9a7b4a"/><g stroke="#5a4630" stroke-width="1.2"><path d="M3,19v4M11,19v4M19,19v4"/></g>` +
    `<path d="M6,16c4,-3 10,-3 14,0l-2,4H8z" fill="#c9714a"/>`,

  /** 石油掘削やぐら。ミリ専用。 */
  oilderrick:
    `<g stroke="#5a5040" stroke-width="1.6" fill="none"><path d="M5,22L12,4L19,22"/><path d="M8,14h8M6.5,18h11"/></g><circle cx="12" cy="3" r="1.6" fill="#e8443f"/>`,

  /** 洞窟の暗い開口。グヌン・ムル専用。 */
  caves:
    `<path d="M2,22v-6a10,9 0 0 1 20,0v6z" fill="#7a7568"/><path d="M6,22v-5a6,6 0 0 1 12,0v5z" fill="#241a10"/>`,

  /** 海食柱。バコ専用。 */
  seastacks:
    `<rect x="0" y="19" width="24" height="5" fill="#2a95af"/>` +
    `<path d="M8,19c-1,-8 3,-13 5,-13c2,0 6,5 5,13z" fill="#9a8f78"/><path d="M10,10q2,-2 4,0" stroke="#2f6a30" stroke-width="1.6" fill="none"/>`,

  /** テングザルとジャングル。サンダカン専用。 */
  orangutan:
    `<rect x="0" y="18" width="24" height="6" fill="#2f6a30"/>` +
    `<g fill="#7a4a2a"><circle cx="14" cy="8" r="4"/><ellipse cx="9" cy="14" rx="2.4" ry="6"/><ellipse cx="19" cy="14" rx="2.4" ry="6"/></g>`,

  /** ターコイズブルーの礁湖に浮かぶ水上家屋。センポルナ専用。 */
  stiltreef:
    `<rect x="0" y="15" width="24" height="9" fill="#1ea6b8"/>` +
    `<g stroke="#5a4630" stroke-width="1.4"><path d="M6,15v6M16,15v6"/></g><rect x="4" y="9" width="6" height="7" fill="#c9a877"/><path d="M3,9h8l-4,-4z" fill="#9a7b4a"/>`,

  /** 横に長いロングハウス。クダット専用。 */
  longhouse:
    `<rect x="2" y="14" width="20" height="7" fill="#c9a877"/><path d="M1,14h22l-4,-6h-14z" fill="#9a7b4a"/>` +
    `<g fill="#5a4630"><rect x="5" y="16" width="3" height="5"/><rect x="11" y="16" width="3" height="5"/><rect x="17" y="16" width="3" height="5"/></g>`,

  /** 小さな蒸気機関車。テノム専用。 */
  steamtrain:
    `<rect x="3" y="10" width="16" height="8" rx="2" fill="#3a3f4a"/><rect x="1" y="6" width="4" height="6" fill="#3a3f4a"/>` +
    `<g fill="#5a5f6a"><circle cx="7" cy="18" r="2.4"/><circle cx="15" cy="18" r="2.4"/></g>`,
};
