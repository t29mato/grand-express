/**
 * オーストラリアの都市イラスト。
 *
 * `AUSTRALIA_MARKS` は24×24の座標系に描くシンボル、`AUSTRALIA_BG` は400×210の
 * 座標系に描く背景シーン(いずれもSVG断片の文字列)。韓国・中国と同じく
 * 最初から文字列として持つ。動きは含めない(アニメーションはReact側で重ねる)。
 *
 * **5都市ぶんのレビュー用サンプル。** 残り37都市の分は方向確認のあとに追加する。
 *
 * 色は他の盤面と揃える。空 #8fc4e8〜#cfe4f0、顔・白 #f6efe2、
 * 強調 #f5b31c/#e8443f/#5b8fe8。オーストラリアらしさは
 * **赤土のオーカー #a8562e・ユーカリの灰緑 #7a9a5e・鋼灰色の橋梁 #4a4a52・
 * 港の紺青 #1c6a8a・砂岩の砂色 #c9bd8a** で出す。
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

/** ゴーストガム(白い幹のユーカリ)。内陸の乾いた土地に多い。 */
function ghostGum(x, base, h, trunk = "#e2dccb", crown = "#8fae6a") {
  const w = r1(h * 0.55);
  return (
    `<path d="M${r1(x - 1.6)},${base}Q${r1(x - 3)},${r1(base - h * 0.6)} ${x},${r1(base - h)}" fill="none" stroke="${trunk}" stroke-width="3"/>` +
    `<ellipse cx="${r1(x - w * 0.3)}" cy="${r1(base - h * 0.92)}" rx="${r1(w * 0.4)}" ry="${r1(w * 0.22)}" fill="${crown}" opacity=".9"/>` +
    `<ellipse cx="${r1(x + w * 0.28)}" cy="${r1(base - h * 0.82)}" rx="${r1(w * 0.36)}" ry="${r1(w * 0.2)}" fill="${crown}" opacity=".9"/>` +
    `<ellipse cx="${x}" cy="${r1(base - h)}" rx="${r1(w * 0.32)}" ry="${r1(w * 0.18)}" fill="${crown}" opacity=".95"/>`
  );
}

/** 鉱山の櫓(ヘッドフレーム)。金鉱の巻上げ機。 */
function headframe(x, base, h, fill = "#6b7280") {
  const w = r1(h * 0.5);
  return (
    `<rect x="${r1(x - 2)}" y="${r1(base - h)}" width="4" height="${h}" fill="${fill}"/>` +
    `<path d="M${r1(x - w / 2)},${base}L${x},${r1(base - h)}M${r1(x + w / 2)},${base}L${x},${r1(base - h)}" stroke="${fill}" stroke-width="2.4" fill="none"/>` +
    `<circle cx="${x}" cy="${r1(base - h)}" r="3.4" fill="none" stroke="#e8443f" stroke-width="1.6"/>` +
    `<rect x="${r1(x - w * 0.7)}" y="${r1(base - 8)}" width="${r1(w * 1.4)}" height="8" fill="#8a5a3a"/>`
  );
}

/** 教会の尖塔。石壁と切妻窓、先端の十字架。 */
function churchSpire(x, base, h, wall = "#c9c3b0", roof = "#6b5a4a") {
  const w = r1(h * 0.42);
  return (
    `<rect x="${r1(x - w / 2)}" y="${r1(base - h * 0.5)}" width="${w}" height="${r1(h * 0.5)}" fill="${wall}"/>` +
    `<path d="M${r1(x - w / 2)},${r1(base - h * 0.5)}L${x},${r1(base - h)}L${r1(x + w / 2)},${r1(base - h * 0.5)}z" fill="${roof}"/>` +
    `<path d="M${x},${r1(base - h)}v-8M${r1(x - 3)},${r1(base - h - 5)}h6" stroke="${roof}" stroke-width="2"/>` +
    `<rect x="${r1(x - w * 0.14)}" y="${r1(base - h * 0.32)}" width="${r1(w * 0.28)}" height="${r1(h * 0.2)}" fill="#3f5a34"/>`
  );
}

/** ハーバーブリッジ風の鋼鉄アーチ橋。 */
function steelArchBridge(cx, base, w, h, fill = "#4a4a52") {
  const hw = r1(w / 2);
  const parts = [
    `<path d="M${r1(cx - hw)},${base}Q${cx},${r1(base - h)} ${r1(cx + hw)},${base}" fill="none" stroke="${fill}" stroke-width="5"/>`,
    `<rect x="${r1(cx - hw)}" y="${r1(base - 4)}" width="${w}" height="6" fill="${fill}"/>`,
  ];
  for (let i = -3; i <= 3; i++) {
    const px = cx + (i * hw) / 3.6;
    const t = 1 - Math.abs(i) / 4.2;
    const py = base - h * 0.94 * t;
    parts.push(`<line x1="${r1(px)}" y1="${r1(py)}" x2="${r1(px)}" y2="${r1(base - 2)}" stroke="${fill}" stroke-width="2"/>`);
  }
  return parts.join("");
}

/** シドニー・オペラハウス風の帆の連なり。 */
function operaSails(x, base, scale = 1) {
  const s = (dx, h, w) =>
    `<path d="M${r1(x + dx * scale)},${base}Q${r1(x + dx * scale + w * 0.15 * scale)},${r1(base - h * scale)} ${r1(x + dx * scale + w * scale)},${base}z" fill="#f6efe2" stroke="#c9c3b0" stroke-width="1"/>`;
  return `<g>${s(0, 26, 22)}${s(16, 20, 18)}${s(-14, 16, 16)}</g>`;
}

/** 黒鳥(コクチョウ)。西オーストラリアの州の象徴。 */
function blackSwan(x, y, scale = 1) {
  return (
    `<g fill="#20242a" transform="translate(${x},${y}) scale(${scale})">` +
    `<path d="M-8,4Q-8,-4 0,-4Q6,-4 6,0Q6,-8 12,-10" fill="none" stroke="#20242a" stroke-width="2"/>` +
    `<ellipse cx="-4" cy="4" rx="10" ry="5"/>` +
    `<circle cx="12" cy="-10" r="2.2"/>` +
    `<path d="M14,-10l4,1l-4,1.6z" fill="#e8443f"/>` +
    `</g>`
  );
}

/** スピニフェックス(内陸の棘状の叢)。 */
function spinifex(x, y, fill = "#a8ae5a") {
  return `<path d="M${r1(x - 6)},${y}Q${x},${r1(y - 10)} ${r1(x + 1)},${y}Q${r1(x + 2)},${r1(y - 8)} ${r1(x + 7)},${y}" fill="none" stroke="${fill}" stroke-width="1.6"/>`;
}

/** 波の反射線・水面。 */
function ripples(y, color = "#bfe8f4") {
  return `<g stroke="${color}" stroke-width="2" opacity=".7" fill="none"><path d="M26,${y}h74M176,${y + 12}h92M108,${y + 24}h62"/></g>`;
}

/** 小さなフェリー。 */
function ferry(x, y, scale = 1) {
  return (
    `<g transform="translate(${x},${y}) scale(${scale})">` +
    `<path d="M-10,0h20l-3,7h-14z" fill="#f6efe2" stroke="#4a4a52" stroke-width="1"/>` +
    `<rect x="-6" y="-6" width="12" height="6" fill="#5b8fe8"/>` +
    `</g>`
  );
}

/** 赤い岩の連なり(マクドネル山脈ふう)。 */
function redRange(cx, base, w, h, fill = "#a8562e") {
  return (
    `<path d="M${r1(cx - w / 2)},${base}L${r1(cx - w * 0.22)},${r1(base - h)}L${r1(cx - w * 0.05)},${r1(base - h * 0.7)}L${r1(cx + w * 0.15)},${r1(base - h * 0.92)}L${r1(cx + w / 2)},${base}z" fill="${fill}"/>` +
    `<path d="M${r1(cx - w * 0.22)},${r1(base - h)}L${r1(cx - w * 0.16)},${r1(base - h * 0.86)}L${r1(cx - w * 0.28)},${r1(base - h * 0.8)}z" fill="#c9713f" opacity=".7"/>`
  );
}

/** 起重機(港のクレーン)。 */
function crane(x, base, h, fill = "#e8443f") {
  return (
    `<rect x="${r1(x - 2)}" y="${r1(base - h)}" width="4" height="${h}" fill="${fill}"/>` +
    `<rect x="${r1(x - 2)}" y="${r1(base - h)}" width="${r1(h * 0.7)}" height="4" fill="${fill}"/>` +
    `<line x1="${r1(x + h * 0.58)}" y1="${r1(base - h + 2)}" x2="${r1(x + h * 0.58)}" y2="${r1(base - h * 0.55)}" stroke="${fill}" stroke-width="2"/>`
  );
}

/** 煙突。ウロンゴンの製鉄所ふう。 */
function chimney(x, base, h, w = 8, fill = "#7f8896") {
  return (
    `<rect x="${r1(x - w / 2)}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${fill}"/>` +
    `<path d="M${r1(x + w * 0.3)},${r1(base - h)}c2,-6 6,-8 4,-16" stroke="#c8ccc4" stroke-width="2.4" fill="none" opacity=".7"/>`
  );
}

/** 崖を登る急勾配鉄道。カトゥーンバのスケニック鉄道。 */
function inclineRail(x1, y1, x2, y2, fill = "#4a4a52") {
  return (
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${fill}" stroke-width="4"/>` +
    `<rect x="${r1((x1 + x2) / 2 - 6)}" y="${r1((y1 + y2) / 2 - 5)}" width="12" height="8" fill="#e8443f" transform="rotate(${r1((Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI)} ${r1((x1 + x2) / 2)} ${r1((y1 + y2) / 2)})"/>`
  );
}

/** サーキットのコーナーと縁石。バサースト。 */
function raceTrack(x, base, w) {
  return (
    `<path d="M${r1(x - w / 2)},${base}Q${x},${r1(base - 30)} ${r1(x + w / 2)},${base}" fill="none" stroke="#4a4a52" stroke-width="22"/>` +
    `<path d="M${r1(x - w / 2)},${base}Q${x},${r1(base - 30)} ${r1(x + w / 2)},${base}" fill="none" stroke="#f6efe2" stroke-width="2" stroke-dasharray="6 5"/>`
  );
}

/** チェッカーフラッグ。 */
function checkerFlag(x, y, s = 1) {
  const parts = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 3; c++) {
      if ((r + c) % 2 === 0) parts.push(`<rect x="${r1(x + c * 3 * s)}" y="${r1(y + r * 3 * s)}" width="${3 * s}" height="${3 * s}" fill="#20242a"/>`);
    }
  }
  return `<rect x="${r1(x - 1)}" y="${y}" width="1" height="${r1(14 * s)}" fill="#6b7280"/>` + `<g fill="#f6efe2">${parts.join("")}</g>`;
}

/** パラボラアンテナ。パークス。 */
function radioDish(x, base, r) {
  return (
    `<rect x="${r1(x - 2)}" y="${r1(base - r * 1.4)}" width="4" height="${r1(r * 1.4)}" fill="#8a8478"/>` +
    `<path d="M${r1(x - r)},${r1(base - r * 1.4)}Q${x},${r1(base - r * 2.5)} ${r1(x + r)},${r1(base - r * 1.4)}Q${x},${r1(base - r * 1.65)} ${r1(x - r)},${r1(base - r * 1.4)}z" fill="#f6efe2" stroke="#8a8478" stroke-width="1.4"/>`
  );
}

/** 巨大なギター。タムワース。 */
function bigGuitar(x, base, h) {
  const w = r1(h * 0.55);
  return (
    `<path d="M${x},${r1(base - h)}c${r1(-w * 0.5)},${r1(h * 0.1)} ${r1(-w * 0.5)},${r1(h * 0.35)} 0,${r1(h * 0.45)}c${r1(w * 0.55)},${r1(-h * 0.1)} ${r1(w * 0.55)},${r1(-h * 0.35)} 0,${r1(-h * 0.45)}z" fill="#f4c430" stroke="#6b5330" stroke-width="2"/>` +
    `<rect x="${r1(x - 3)}" y="${r1(base - h - 24)}" width="6" height="24" fill="#6b5330"/>` +
    `<circle cx="${x}" cy="${r1(base - h * 0.55)}" r="${r1(w * 0.14)}" fill="#241a10"/>`
  );
}

/** トラム(路面電車)。メルボルン。 */
function tramCar(x, y, scale = 1) {
  return (
    `<g transform="translate(${x},${y}) scale(${scale})">` +
    `<rect x="-24" y="-14" width="48" height="16" rx="3" fill="#8a2e2e"/>` +
    `<rect x="-20" y="-11" width="10" height="7" fill="#bfe0f0"/><rect x="-6" y="-11" width="10" height="7" fill="#bfe0f0"/><rect x="8" y="-11" width="10" height="7" fill="#bfe0f0"/>` +
    `<rect x="-24" y="0" width="48" height="3" fill="#f4c430"/>` +
    `<circle cx="-14" cy="4" r="3" fill="#20242a"/><circle cx="14" cy="4" r="3" fill="#20242a"/>` +
    `<line x1="0" y1="-14" x2="0" y2="-26" stroke="#4a4a52" stroke-width="1.4"/>` +
    `</g>`
  );
}

/** 羊毛の梱。ジーロング。 */
function woolBale(x, base, w, h, fill = "#e2dccb") {
  return (
    `<rect x="${r1(x - w / 2)}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${fill}" stroke="#8a7a5c" stroke-width="1.4"/>` +
    `<g stroke="#8a7a5c" stroke-width="1.4"><path d="M${r1(x - w / 2)},${r1(base - h * 0.5)}h${w}"/></g>`
  );
}

/** 海に立つ石灰岩の塔(十二使徒岩ふう)。ワーナンブール。 */
function seaStack(x, base, w, h, fill = "#e2dccb") {
  return `<path d="M${r1(x - w / 2)},${base}L${r1(x - w * 0.4)},${r1(base - h)}L${r1(x + w * 0.4)},${r1(base - h)}L${r1(x + w / 2)},${base}z" fill="${fill}"/>`;
}

/** 乳牛。セール。 */
function dairyCow(x, base, scale = 1) {
  return (
    `<g transform="translate(${x},${base}) scale(${scale})">` +
    `<ellipse cx="0" cy="-8" rx="12" ry="7" fill="#f6efe2"/>` +
    `<g fill="#241a10"><ellipse cx="-4" cy="-9" rx="3" ry="3.6"/><ellipse cx="5" cy="-6" rx="2.6" ry="3.2"/></g>` +
    `<circle cx="-11" cy="-11" r="4" fill="#f6efe2"/>` +
    `<rect x="-3" y="-2" width="2.4" height="6" fill="#e2dccb"/><rect x="4" y="-2" width="2.4" height="6" fill="#e2dccb"/>` +
    `</g>`
  );
}

/** 高層ビル1棟。ブリスベン・ゴールドコースト・パースの対岸で使う。 */
function tower(x, base, w, h, fill = "#7f8896") {
  return `<rect x="${r1(x - w / 2)}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${fill}"/>`;
}

/** 窓の明かり(繰り返し)。 */
function windows(x, y, cols, rows, gap = 8, fill = "#bfe0f0") {
  const parts = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) parts.push(`<rect x="${r1(x + c * gap)}" y="${r1(y + r * gap)}" width="4" height="4" fill="${fill}"/>`);
  return `<g opacity=".6">${parts.join("")}</g>`;
}

/** 珊瑚と魚。ケアンズ・タウンズビル。 */
function coralFan(x, y, scale = 1, fill = "#e8785a") {
  return (
    `<g transform="translate(${x},${y}) scale(${scale})" fill="${fill}">` +
    `<path d="M0,0Q-10,-14 -4,-22Q0,-14 0,-6Q0,-14 4,-22Q10,-14 0,0z"/>` +
    `</g>`
  );
}
function reefFish(x, y, scale = 1, fill = "#f5b31c") {
  return `<g transform="translate(${x},${y}) scale(${scale})" fill="${fill}"><path d="M0,0q8,-5 14,0q-6,5 -14,0z"/><path d="M0,0l-5,-4v8z"/></g>`;
}

/** サトウキビ列車の貨車。マッカイ。 */
function caneCart(x, base, scale = 1) {
  return `<g transform="translate(${x},${base}) scale(${scale})"><rect x="-9" y="-9" width="18" height="9" fill="#8a5a3a"/><circle cx="-5" cy="0" r="2.4" fill="#20242a"/><circle cx="5" cy="0" r="2.4" fill="#20242a"/></g>`;
}

/** 牛の像。ロックハンプトン。 */
function bullStatue(x, base, h, fill = "#8a8478") {
  const w = r1(h * 0.95);
  return (
    `<ellipse cx="${x}" cy="${r1(base - h * 0.42)}" rx="${r1(w * 0.42)}" ry="${r1(h * 0.3)}" fill="${fill}"/>` +
    `<circle cx="${r1(x - w * 0.34)}" cy="${r1(base - h * 0.62)}" r="${r1(h * 0.18)}" fill="${fill}"/>` +
    `<path d="M${r1(x - w * 0.46)},${r1(base - h * 0.72)}q${r1(-w * 0.12)},${r1(-h * 0.12)} 0,${r1(-h * 0.16)}M${r1(x - w * 0.24)},${r1(base - h * 0.74)}q${r1(w * 0.1)},${r1(-h * 0.12)} 0,${r1(-h * 0.16)}` +
    `" stroke="#e2dccb" stroke-width="2" fill="none"/>` +
    `<g fill="${fill}"><rect x="${r1(x - w * 0.3)}" y="${r1(base - h * 0.24)}" width="4" height="${r1(h * 0.24)}"/><rect x="${r1(x + w * 0.1)}" y="${r1(base - h * 0.24)}" width="4" height="${r1(h * 0.24)}"/></g>`
  );
}

/** 複葉機。ロングリーチ。 */
function biplane(x, y, scale = 1) {
  return (
    `<g transform="translate(${x},${y}) scale(${scale})" stroke="#20242a" stroke-width="1.6" fill="none">` +
    `<line x1="-16" y1="-6" x2="16" y2="-6"/><line x1="-14" y1="2" x2="14" y2="2"/>` +
    `<line x1="-10" y1="-6" x2="-10" y2="2"/><line x1="10" y1="-6" x2="10" y2="2"/>` +
    `<path d="M-18,-2h30l6,3h-36z" fill="#e8443f" stroke="none"/>` +
    `</g>`
  );
}

/** 灯台。ジェラルトン。 */
function lighthouseTower(x, base, h) {
  const w = r1(h * 0.32);
  return (
    `<path d="M${r1(x - w / 2)},${base}L${r1(x - w * 0.28)},${r1(base - h)}h${r1(w * 0.56)}L${r1(x + w / 2)},${base}z" fill="#f6efe2" stroke="#8a8478" stroke-width="1.4"/>` +
    `<rect x="${r1(x - w * 0.28)}" y="${r1(base - h * 0.55)}" width="${r1(w * 0.56)}" height="${r1(h * 0.14)}" fill="#e8443f"/>` +
    `<rect x="${r1(x - w * 0.22)}" y="${r1(base - h - 6)}" width="${r1(w * 0.44)}" height="8" fill="#4a4a52"/>`
  );
}

/** 記念ドーム。ジェラルトンのHMASシドニー記念碑。 */
function memorialDome(x, base, r) {
  return `<path d="M${r1(x - r)},${base}A${r},${r} 0 0 1 ${r1(x + r)},${base}z" fill="#f6efe2" stroke="#c9c3b0" stroke-width="1.4"/>`;
}

/** 鯨。オールバニ。 */
function whaleShape(x, y, scale = 1) {
  return (
    `<g transform="translate(${x},${y}) scale(${scale})" fill="#3a4a5a">` +
    `<path d="M-20,0q4,-10 20,-9q10,1 14,6l-4,2l4,3q-4,4 -14,5q-16,1 -20,-7z"/>` +
    `<path d="M0,-9q0,-6 6,-8q-2,4 0,8z" fill="#bfe8f4" opacity=".8"/>` +
    `</g>`
  );
}

/** 煮沸釜(捕鯨基地)。 */
function tryPot(x, base, r, fill = "#4a4a52") {
  return `<path d="M${r1(x - r)},${r1(base - r * 0.4)}a${r},${r} 0 0 0 ${r1(r * 2)},0z" fill="${fill}"/>`;
}

/** 信号機(鉄道)。ポート・オーガスタ。 */
function signalPost(x, base, h) {
  return (
    `<rect x="${r1(x - 1.6)}" y="${r1(base - h)}" width="3.2" height="${h}" fill="#6b7280"/>` +
    `<rect x="${r1(x - 2)}" y="${r1(base - h)}" width="14" height="4" fill="#4a4a52"/>` +
    `<circle cx="${r1(x + 12)}" cy="${r1(base - h + 2)}" r="3" fill="#e8443f"/>`
  );
}

/** 地下住居。クーバー・ペディ。丘に埋まった扉と換気筒。 */
function dugoutHome(x, base, w, h) {
  return (
    `<path d="M${r1(x - w / 2)},${base}Q${x},${r1(base - h)} ${r1(x + w / 2)},${base}z" fill="#c9713f"/>` +
    `<rect x="${r1(x - w * 0.1)}" y="${r1(base - h * 0.5)}" width="${r1(w * 0.2)}" height="${r1(h * 0.5)}" fill="#4a4436"/>` +
    `<rect x="${r1(x - w * 0.32)}" y="${r1(base - h * 0.78)}" width="4" height="${r1(h * 0.5)}" fill="#8a8478"/>` +
    `<rect x="${r1(x + w * 0.24)}" y="${r1(base - h * 0.66)}" width="4" height="${r1(h * 0.4)}" fill="#8a8478"/>`
  );
}

/** 火口湖の縁(輪郭のカーブ)。マウント・ガンビア。 */
function craterRim(cx, base, w, h) {
  return `<path d="M${r1(cx - w / 2)},${base}Q${cx},${r1(base - h)} ${r1(cx + w / 2)},${base}z" fill="none" stroke="#8a7a5c" stroke-width="4"/>`;
}

/** ブドウ畑の畝。タヌンダ(バロッサ)。 */
function vineRow(x, y, count, gap) {
  const parts = [`<line x1="${x}" y1="${y}" x2="${r1(x + count * gap)}" y2="${y}" stroke="#8a7050" stroke-width="1.4"/>`];
  for (let i = 0; i <= count; i++) {
    const vx = r1(x + i * gap);
    parts.push(`<circle cx="${vx}" cy="${r1(y - 3)}" r="3" fill="#4e7a3d"/>`);
  }
  return `<g>${parts.join("")}</g>`;
}

/** チェアリフトの支柱とケーブル。ランセストン・カトゥーンバ。 */
function chairliftTower(x, base, h) {
  return (
    `<rect x="${r1(x - 1.6)}" y="${r1(base - h)}" width="3.2" height="${h}" fill="#6b7280"/>` +
    `<rect x="${r1(x - 6)}" y="${r1(base - h)}" width="12" height="3" fill="#6b7280"/>`
  );
}

/** 石造りの流刑地の廃墟。ポート・アーサー。文字要素は使わない。 */
function prisonRuin(x, base, w, h) {
  return (
    `<rect x="${r1(x - w / 2)}" y="${r1(base - h)}" width="${w}" height="${h}" fill="#c9a877"/>` +
    `<rect x="${r1(x - w / 2)}" y="${base}" width="${w}" height="4" fill="#8a7a5c"/>` +
    `<g fill="#4a4436"><rect x="${r1(x - w * 0.32)}" y="${r1(base - h * 0.7)}" width="${r1(w * 0.14)}" height="${r1(h * 0.5)}" rx="2"/><rect x="${r1(x + w * 0.16)}" y="${r1(base - h * 0.7)}" width="${r1(w * 0.14)}" height="${r1(h * 0.5)}" rx="2"/></g>` +
    `<path d="M${r1(x + w * 0.36)},${base}L${r1(x + w * 0.5)},${r1(base - h * 1.2)}L${r1(x + w * 0.64)},${base}z" fill="#c9a877" opacity=".7"/>`
  );
}

/** 川船(外輪船・熱帯雨林の観光船)。ミルドゥラ・ストラーン。 */
function riverboat(x, y, scale = 1, hull = "#8a5a3a") {
  return (
    `<g transform="translate(${x},${y}) scale(${scale})">` +
    `<path d="M-16,4h32l-4,6h-24z" fill="${hull}"/>` +
    `<rect x="-10" y="-8" width="20" height="12" fill="#f6efe2"/>` +
    `<rect x="10" y="-16" width="3" height="16" fill="#4a4a52"/>` +
    `<circle cx="-16" cy="7" r="4" fill="#6b5330" opacity=".8"/>` +
    `</g>`
  );
}

/** 一枚岩(ウルル)。滑らかなドーム状。登る人は描かない(2019年から登山禁止)。 */
function monolithRock(cx, base, w, h) {
  return (
    `<path d="M${r1(cx - w / 2)},${base}Q${r1(cx - w * 0.3)},${r1(base - h)} ${r1(cx - w * 0.05)},${r1(base - h * 1.02)}Q${r1(cx + w * 0.2)},${r1(base - h)} ${r1(cx + w / 2)},${base}z" fill="#a8562e"/>` +
    `<path d="M${r1(cx - w * 0.3)},${r1(base - h * 0.5)}Q${r1(cx - w * 0.05)},${r1(base - h * 0.6)} ${r1(cx + w * 0.1)},${r1(base - h * 0.48)}" fill="none" stroke="#c9713f" stroke-width="3" opacity=".6"/>`
  );
}

// ---------------------------------------------------------------------------
// 背景シーン(39種)。鍵は cities.mjs の `bg` と対応。
// ---------------------------------------------------------------------------

const AUSTRALIA_BASE_BG = {
  /**
   * 港町。シドニー専用。ハーバーブリッジを左寄りに、オペラハウスの帆を
   * 右寄りに置き、中央の隠れ帯(x151-249)には塗りだけで細部を置かない。
   */
  harbour:
    sky("#8fc4e8", "#cfe4f0", 130) +
    clouds(300, 30, 1.1) +
    hills(128, "#8fae7a") +
    ground(130, "#c9bd8a") +
    // 港の水面
    `<rect x="0" y="168" width="400" height="42" fill="#1c6a8a"/>` +
    ripples(182, "#bfe8f4") +
    ferry(230, 190, 1) +
    ferry(70, 196, 0.8) +
    // ハーバーブリッジ(左)
    steelArchBridge(90, 168, 150, 58, "#4a4a52") +
    // オペラハウス(右)
    operaSails(300, 168, 1) +
    // 手前の防波堤
    `<rect x="0" y="196" width="400" height="6" fill="#8a8478"/>`,

  /**
   * 川辺の町。パース専用。スワン川と黒鳥、対岸のスカイラインを左右に振り分ける。
   */
  riverside:
    sky("#8fc4e8", "#cfe4f0", 126) +
    clouds(90, 28, 1) +
    hills(124, "#7a9a5e") +
    ground(126, "#8fae63") +
    // 川
    `<rect x="0" y="164" width="400" height="46" fill="#3f8fc4"/>` +
    ripples(178, "#bfe8f4") +
    blackSwan(60, 188, 1.6) +
    blackSwan(100, 196, 1.1) +
    // 対岸のスカイライン(右寄り)
    `<g fill="#7f8896"><rect x="290" y="96" width="18" height="60"/><rect x="312" y="70" width="24" height="86"/><rect x="340" y="104" width="16" height="52"/></g>` +
    `<g fill="#bfe0f0" opacity=".6"><rect x="294" y="102" width="4" height="4"/><rect x="316" y="78" width="4" height="4"/><rect x="324" y="78" width="4" height="4"/><rect x="316" y="96" width="4" height="4"/></g>` +
    // 手前のユーカリ(左)
    ghostGum(40, 210, 60) +
    ghostGum(66, 208, 44),

  /**
   * 緑地帯に囲まれた町。アデレード専用。教会の尖塔を並べ、
   * 手前に環状の公園帯(パークランド)の芝を敷く。
   */
  parklands:
    sky("#8fc4e8", "#cfe4f0", 128) +
    clouds(320, 26, 0.9) +
    hills(126, "#6f8a4a") +
    ground(128, "#4e7a3d") +
    // パークランドの帯(手前、環状緑地の象徴)
    `<rect x="0" y="172" width="400" height="38" fill="#5f9a4a"/>` +
    // 教会の尖塔(左右に散らして中央の隠れ帯を避ける)
    churchSpire(60, 172, 64) +
    churchSpire(110, 172, 46) +
    churchSpire(320, 172, 58) +
    churchSpire(360, 172, 40) +
    // 街区の道
    `<path d="M0,196L400,196" stroke="#c8bda0" stroke-width="10" opacity=".7"/>` +
    // 手前の街路樹
    ghostGum(200, 206, 34) +
    ghostGum(280, 208, 30),

  /**
   * 内陸の赤土の町。アリス・スプリングスとカルグーリーで共有する
   * 「アウトバック」の基調(細部は各都市シンボルで描き分ける)。
   */
  outback:
    sky("#e8b464", "#f4d9a0", 122) +
    sun(340, 40, 22, "#f5b31c") +
    hills(120, "#a8562e") +
    ground(122, "#c9713f") +
    // 赤い岩の連なり(左右に振り分ける)
    redRange(70, 150, 120, 64) +
    redRange(340, 150, 100, 46) +
    // 乾いた川床(隠れ帯の下、y>170に置く)
    `<path d="M140,182Q200,192 270,182" fill="none" stroke="#d9a877" stroke-width="10" opacity=".6"/>` +
    spinifex(180, 200) +
    spinifex(220, 204) +
    spinifex(60, 200) +
    spinifex(330, 202) +
    spinifex(30, 190) +
    spinifex(380, 194) +
    // 転がる岩(左右の手前)
    `<g fill="#8a5a3a"><ellipse cx="20" cy="204" rx="10" ry="5"/><ellipse cx="365" cy="200" rx="12" ry="6"/><ellipse cx="95" cy="206" rx="7" ry="4"/></g>` +
    ghostGum(40, 210, 46) +
    ghostGum(370, 208, 38),

  /**
   * 金鉱の町。カルグーリー専用。ヘッドフレーム(巻上げ櫓)を主役に、
   * 赤土とスピニフェックスで乾いた大地を出す。
   */
  goldfields:
    sky("#e8b464", "#f4d9a0", 120) +
    sun(60, 36, 18, "#f5b31c") +
    hills(118, "#a8562e") +
    ground(120, "#c9713f") +
    headframe(80, 176, 84) +
    headframe(320, 172, 60) +
    // 露天掘りの段々(手前、赤土の地層)
    `<path d="M140,210L180,180L260,180L300,210z" fill="#8a5a3a"/>` +
    `<path d="M160,210L190,190L250,190L280,210z" fill="#a8562e"/>` +
    spinifex(50, 202) +
    spinifex(350, 200) +
    spinifex(120, 206) +
    spinifex(15, 194) +
    spinifex(385, 190) +
    // 積み上げた鉱石のずり山(手前、左右)
    `<g fill="#8a8478"><rect x="4" y="182" width="26" height="10"/><rect x="368" y="178" width="28" height="12"/></g>` +
    // 手前の鉄道の線路
    `<rect x="0" y="204" width="400" height="4" fill="#4a4a52"/>` +
    `<g stroke="#6b5330" stroke-width="2"><path d="M20,208v-8M60,208v-8M100,208v-8M300,208v-8M340,208v-8M380,208v-8"/></g>`,

  /** 首都。キャンベラ専用。国会議事堂の旗竿を丘の上に、湖の噴水を手前に。 */
  capital:
    sky("#8fc4e8", "#cfe4f0", 130) +
    clouds(300, 28, 1) +
    hills(128, "#7a9a5e") +
    ground(130, "#5f9a4a") +
    `<path d="M60,170q40,-34 80,0z" fill="#8fae7a"/>` +
    `<rect x="98" y="122" width="4" height="48" fill="#8a8478"/>` +
    `<path d="M102,124l24,8l-24,6z" fill="#00247d"/>` +
    `<rect x="0" y="182" width="400" height="28" fill="#3f8fc4"/>` +
    `<path d="M340,182v-40" stroke="#bfe8f4" stroke-width="4" opacity=".8"/>` +
    ripples(196, "#bfe8f4") +
    memorialDome(320, 170, 22) +
    ghostGum(30, 208, 34) +
    ghostGum(370, 210, 40),

  /** 港町。ニューカッスル専用。石炭クレーンと積出岸壁。 */
  port:
    sky("#8fc4e8", "#cfe4f0", 128) +
    clouds(300, 26, 1) +
    hills(126, "#8fae7a") +
    ground(128, "#8a8478") +
    `<rect x="0" y="168" width="400" height="42" fill="#1c6a8a"/>` +
    ripples(182, "#bfe8f4") +
    crane(70, 168, 60) +
    crane(110, 168, 46) +
    `<g fill="#4a4436"><rect x="300" y="150" width="70" height="18"/><rect x="310" y="140" width="10" height="10"/><rect x="330" y="140" width="10" height="10"/><rect x="350" y="140" width="10" height="10"/></g>` +
    ferry(230, 194, 0.8) +
    `<rect x="0" y="196" width="400" height="6" fill="#6b7280"/>`,

  /** 鉄鋼の町。ウロンゴン専用。断崖と煙突。 */
  steeltown:
    sky("#8fc4e8", "#cfe4f0", 126) +
    clouds(340, 24, 0.9) +
    `<path d="M0,60L120,60L150,126L0,126z" fill="#6f8a4a"/>` +
    ground(126, "#7f8896") +
    chimney(270, 210, 92, 10) +
    chimney(295, 210, 70, 8) +
    chimney(320, 210, 100, 12) +
    chimney(350, 210, 60, 7) +
    `<g fill="#c8ccc4" opacity=".7"><ellipse cx="278" cy="112" rx="10" ry="6"/><ellipse cx="324" cy="104" rx="12" ry="7"/><ellipse cx="352" cy="146" rx="8" ry="5"/></g>` +
    `<rect x="0" y="196" width="400" height="14" fill="#4a4a52"/>` +
    `<rect x="0" y="168" width="400" height="28" fill="#1c6a8a"/>` +
    ripples(180, "#bfe8f4") +
    `<g fill="#4a4436"><rect x="20" y="184" width="30" height="12"/><rect x="360" y="188" width="30" height="8"/></g>` +
    ghostGum(10, 210, 26),

  /** 断崖の急勾配鉄道。カトゥーンバ専用。三姉妹岩と青みがかった谷。 */
  bluemountains:
    sky("#8fc4e8", "#cfe4f0", 100) +
    clouds(320, 24, 1) +
    `<path d="M0,60L400,60L400,100L0,100z" fill="#6a8ab0" opacity=".5"/>` +
    ground(100, "#4e7a3d") +
    redRange(80, 130, 90, 44, "#8b8f98") +
    inclineRail(60, 128, 130, 60) +
    `<path d="M330,130L360,60L390,130z" fill="#9a9ea4"/>` +
    `<path d="M300,130L325,70L350,130z" fill="#8b8f98"/>` +
    ghostGum(20, 208, 44) +
    ghostGum(380, 206, 38) +
    ghostGum(360, 210, 26) +
    `<g fill="#3f5a34"><ellipse cx="70" cy="150" rx="40" ry="8"/><ellipse cx="330" cy="150" rx="40" ry="8"/></g>` +
    `<path d="M40,80l14,8" stroke="#f6efe2" stroke-width="1.6" opacity=".8"/>`,

  /** サーキットのコーナー。バサースト専用。 */
  racetrack:
    sky("#8fc4e8", "#cfe4f0", 122) +
    clouds(70, 26, 1) +
    hills(120, "#6f8a4a") +
    ground(122, "#5f9a4a") +
    raceTrack(200, 190, 320) +
    checkerFlag(40, 150, 1.4) +
    checkerFlag(340, 150, 1.4) +
    `<g fill="#e8443f"><rect x="60" y="188" width="18" height="8"/><rect x="300" y="188" width="18" height="8"/></g>` +
    ghostGum(20, 208, 36) +
    ghostGum(380, 206, 40),

  /** パラボラアンテナ。パークス専用。羊の放牧地。 */
  dish:
    sky("#8fc4e8", "#cfe4f0", 130) +
    clouds(300, 30, 1) +
    hills(128, "#8fae63") +
    ground(130, "#a8bd6a") +
    radioDish(90, 175, 46) +
    `<g fill="#f6efe2" stroke="#c9c3b0" stroke-width="1"><ellipse cx="300" cy="200" rx="10" ry="7"/><ellipse cx="330" cy="204" rx="10" ry="7"/><ellipse cx="360" cy="198" rx="10" ry="7"/></g>` +
    `<g fill="#4a4436"><circle cx="296" cy="195" r="1.6"/><circle cx="304" cy="195" r="1.6"/><circle cx="326" cy="199" r="1.6"/><circle cx="334" cy="199" r="1.6"/></g>` +
    `<g stroke="#8a7050" stroke-width="1.6"><line x1="20" y1="180" x2="20" y2="208"/><line x1="20" y1="184" x2="380" y2="184"/><line x1="20" y1="196" x2="380" y2="196"/></g>` +
    ghostGum(370, 210, 26),

  /** 赤い花崗岩の露頭地。ブロークンヒル専用。木のない乾いた街並み。 */
  silvercity:
    sky("#e8b464", "#f4d9a0", 120) +
    sun(340, 36, 20, "#f5b31c") +
    clouds(70, 20, 0.7) +
    hills(118, "#a8562e") +
    ground(120, "#c9713f") +
    headframe(70, 178, 76) +
    `<g fill="#8a5a3a"><rect x="20" y="184" width="30" height="12"/><rect x="330" y="180" width="40" height="16"/></g>` +
    `<g fill="#c9a877"><rect x="200" y="192" width="30" height="18"/><rect x="240" y="196" width="26" height="14"/></g>` +
    `<g fill="#e8443f"><rect x="204" y="188" width="6" height="4"/><rect x="246" y="192" width="6" height="4"/></g>` +
    spinifex(100, 202) +
    spinifex(300, 200) +
    spinifex(160, 206) +
    `<rect x="0" y="204" width="400" height="4" fill="#4a4a52"/>`,

  /** カントリー音楽の町。タムワース専用。巨大なギターと舞台。 */
  countrytown:
    sky("#8fc4e8", "#cfe4f0", 128) +
    clouds(320, 26, 1) +
    hills(126, "#7a9a5e") +
    ground(128, "#5f9a4a") +
    bigGuitar(90, 208, 90) +
    `<rect x="280" y="176" width="90" height="32" fill="#4a4436"/>` +
    `<rect x="284" y="180" width="82" height="6" fill="#f5b31c"/>` +
    ghostGum(30, 210, 30) +
    ghostGum(380, 206, 26),

  /** 路面電車の走る都心。メルボルン専用。 */
  metro:
    sky("#8fc4e8", "#cfe4f0", 118) +
    clouds(80, 24, 1) +
    ground(118, "#6b7280") +
    tower(300, 118, 30, 90, "#7f8896") + windows(288, 34, 3, 8) +
    tower(340, 118, 40, 130, "#8a94a2") + windows(324, 4, 4, 12) +
    tower(370, 118, 24, 70, "#7f8896") + windows(360, 54, 2, 5) +
    `<rect x="0" y="196" width="400" height="14" fill="#4a4a52"/>` +
    `<line x1="0" y1="190" x2="400" y2="190" stroke="#4a4a52" stroke-width="2"/>` +
    tramCar(160, 200, 1) +
    ghostGum(30, 208, 30),

  /** 羊毛港。ジーロング専用。彩色された更衣小屋。 */
  wharf:
    sky("#8fc4e8", "#cfe4f0", 128) +
    clouds(300, 26, 1) +
    hills(126, "#8fae7a") +
    ground(128, "#c9bd8a") +
    `<rect x="0" y="168" width="400" height="42" fill="#1c6a8a"/>` +
    ripples(182, "#bfe8f4") +
    woolBale(70, 168, 30, 22) +
    woolBale(104, 168, 30, 22) +
    `<g><rect x="220" y="176" width="16" height="24" fill="#e8443f"/><rect x="242" y="180" width="16" height="20" fill="#5b8fe8"/><rect x="264" y="174" width="16" height="26" fill="#f4c430"/><rect x="286" y="178" width="16" height="22" fill="#4e7a3d"/></g>` +
    `<path d="M0,168h400" stroke="#8a8478" stroke-width="4"/>`,

  /** 金鉱の谷。バララット・ベンディゴが共有。 */
  diggings:
    sky("#e8b464", "#f4d9a0", 122) +
    sun(60, 36, 18, "#f5b31c") +
    clouds(320, 20, 0.7) +
    hills(120, "#a8562e") +
    ground(122, "#c9713f") +
    headframe(300, 176, 70) +
    `<g fill="#8a5a3a"><rect x="40" y="188" width="24" height="14"/><rect x="70" y="192" width="20" height="10"/></g>` +
    `<path d="M280,210L310,180L340,210z" fill="#6b5a4a" opacity=".6"/>` +
    `<g fill="#4a4436"><rect x="44" y="192" width="6" height="6"/><rect x="74" y="196" width="6" height="4"/></g>` +
    spinifex(30, 202) +
    spinifex(370, 198) +
    spinifex(180, 206) +
    ghostGum(370, 210, 32),

  /** 石灰岩の海岸道路。ワーナンブール専用。十二使徒岩と鯨。 */
  greatoceanroad:
    sky("#8fc4e8", "#cfe4f0", 100) +
    clouds(60, 22, 1) +
    ground(100, "#6f8a4a") +
    `<rect x="0" y="150" width="400" height="60" fill="#1c6a8a"/>` +
    ripples(164, "#bfe8f4") +
    ripples(188, "#8fd0e8") +
    seaStack(90, 150, 22, 60) +
    seaStack(130, 150, 18, 46) +
    seaStack(300, 150, 24, 66) +
    seaStack(340, 150, 16, 40) +
    whaleShape(210, 186, 0.9) +
    `<rect x="0" y="96" width="400" height="4" fill="#c8bda0" opacity=".8"/>` +
    `<g fill="#4a4a52"><rect x="20" y="92" width="4" height="8"/><rect x="40" y="92" width="4" height="8"/><rect x="360" y="92" width="4" height="8"/></g>` +
    `<path d="M50,80l10,6M370,76l-10,6" stroke="#f6efe2" stroke-width="1.6" opacity=".8"/>`,

  /** 酪農地帯と運河。セール専用。 */
  gippsland:
    sky("#8fc4e8", "#cfe4f0", 128) +
    clouds(320, 26, 1) +
    hills(126, "#4e7a3d") +
    ground(128, "#5f9a4a") +
    `<rect x="0" y="174" width="400" height="36" fill="#3f8fc4"/>` +
    ripples(186, "#bfe8f4") +
    dairyCow(70, 168, 1.1) +
    dairyCow(110, 172, 0.9) +
    dairyCow(300, 170, 1) +
    `<rect x="330" y="150" width="30" height="24" fill="#8a5a3a"/><path d="M326,150h38l-6,-10h-26z" fill="#4a4436"/>`,

  /** 灌漑した果樹園。ミルドゥラ専用。マレー川の外輪船。 */
  orchard:
    sky("#8fc4e8", "#cfe4f0", 126) +
    clouds(80, 24, 1) +
    hills(124, "#6f8a3a") +
    ground(126, "#a8874a") +
    `<rect x="0" y="168" width="400" height="42" fill="#3f8fc4"/>` +
    ripples(180, "#bfe8f4") +
    riverboat(280, 186, 1.1) +
    `<g fill="#f4941c"><circle cx="60" cy="192" r="6"/><circle cx="80" cy="196" r="6"/><circle cx="100" cy="190" r="6"/></g>` +
    `<g fill="#4e7a3d"><circle cx="60" cy="184" r="7"/><circle cx="80" cy="188" r="7"/><circle cx="100" cy="182" r="7"/></g>` +
    vineRow(320, 200, 4, 16),

  /** 亜熱帯の川の都市。ブリスベン専用。 */
  subtropical:
    sky("#8fc4e8", "#cfe4f0", 128) +
    clouds(300, 30, 1.1) +
    hills(126, "#4e7a3d") +
    ground(128, "#5f9a4a") +
    `<rect x="0" y="168" width="400" height="42" fill="#1c6a8a"/>` +
    ripples(182, "#bfe8f4") +
    tower(60, 168, 24, 76, "#7f8896") + windows(50, 96, 2, 6) +
    tower(90, 168, 20, 60, "#8a94a2") +
    ferry(230, 190, 1) +
    `<rect x="0" y="196" width="400" height="14" fill="#c9a877" opacity=".8"/>`,

  /** サーフの街。ゴールドコースト専用。運河と高層ビル。 */
  surfcity:
    sky("#8fc4e8", "#cfe4f0", 100) +
    sun(340, 40, 22, "#f5b31c") +
    ground(100, "#e8dcc0") +
    `<rect x="0" y="150" width="400" height="60" fill="#1c6a8a"/>` +
    ripples(164, "#bfe8f4") +
    tower(300, 150, 20, 60, "#7f8896") + windows(292, 96, 2, 5) +
    tower(330, 150, 26, 84, "#8a94a2") + windows(320, 74, 3, 7) +
    tower(365, 150, 18, 46, "#7f8896") +
    `<path d="M60,150q6,-14 16,0M100,150q6,-16 16,0M140,150q6,-12 16,0" fill="none" stroke="#bfe8f4" stroke-width="3"/>`,

  /** グレートバリアリーフ。ケアンズ専用。ダイビングと珊瑚。 */
  reef:
    sky("#8fc4e8", "#cfe4f0", 90) +
    clouds(320, 22, 1) +
    ground(90, "#0f5a7a") +
    `<rect x="0" y="90" width="400" height="120" fill="#1c6a8a"/>` +
    coralFan(60, 200, 1.4, "#e8785a") +
    coralFan(100, 204, 1.1, "#f4941c") +
    coralFan(330, 198, 1.3, "#e8785a") +
    reefFish(150, 150, 1.2) +
    reefFish(250, 170, 1) +
    reefFish(200, 130, 0.9) +
    ferry(220, 110, 0.7) +
    ripples(120, "#bfe8f4"),

  /** 守備隊の町。タウンズビル専用。花崗岩の丘と沖の島。 */
  garrison:
    sky("#8fc4e8", "#cfe4f0", 128) +
    clouds(60, 26, 1) +
    hills(126, "#8fae63") +
    ground(128, "#c9713f") +
    redRange(90, 174, 70, 50, "#8b8f98") +
    `<rect x="0" y="174" width="400" height="36" fill="#1c6a8a"/>` +
    ripples(186, "#bfe8f4") +
    ripples(200, "#8fd0e8") +
    `<ellipse cx="320" cy="188" rx="34" ry="12" fill="#4e7a3d"/>` +
    ghostGum(370, 210, 30) +
    `<g fill="#4a4436"><rect x="20" y="196" width="24" height="14"/><rect x="50" y="200" width="20" height="10"/></g>` +
    `<path d="M60,60l14,8" stroke="#f6efe2" stroke-width="1.6" opacity=".8"/>`,

  /** サトウキビ畑と製糖鉄道。マッカイ専用。 */
  canefields:
    sky("#8fc4e8", "#cfe4f0", 122) +
    clouds(70, 24, 1) +
    ground(122, "#6f8a3a") +
    `<g fill="#a8ae5a"><rect x="20" y="150" width="4" height="60"/><rect x="34" y="140" width="4" height="70"/><rect x="48" y="152" width="4" height="58"/><rect x="300" y="145" width="4" height="65"/><rect x="314" y="155" width="4" height="55"/><rect x="328" y="142" width="4" height="68"/></g>` +
    `<rect x="0" y="204" width="400" height="6" fill="#4a4a52"/>` +
    `<g stroke="#6b5330" stroke-width="2"><path d="M40,208v-8M120,208v-8M200,208v-8M280,208v-8M360,208v-8"/></g>` +
    caneCart(160, 200, 1) +
    caneCart(200, 200, 1),

  /** 牛肉の都。ロックハンプトン専用。牛の像と回帰線標識。 */
  beefcapital:
    sky("#8fc4e8", "#cfe4f0", 128) +
    clouds(300, 26, 1) +
    hills(126, "#8fae63") +
    ground(128, "#a8bd6a") +
    bullStatue(90, 208, 60) +
    bullStatue(150, 208, 50) +
    `<rect x="290" y="176" width="6" height="32" fill="#8a8478"/><circle cx="293" cy="172" r="10" fill="none" stroke="#f5b31c" stroke-width="3"/>` +
    `<rect x="0" y="196" width="400" height="14" fill="#3f8fc4"/>`,

  /** 内陸の空港町。ロングリーチ専用。複葉機の格納庫。 */
  outbackair:
    sky("#e8b464", "#f4d9a0", 118) +
    sun(60, 34, 18, "#f5b31c") +
    clouds(340, 22, 0.8) +
    ground(118, "#c9713f") +
    `<path d="M120,178h140l-10,-24h-120z" fill="#8a8478"/>` +
    `<rect x="120" y="178" width="140" height="4" fill="#6b7280"/>` +
    biplane(190, 150, 1.3) +
    biplane(60, 130, 0.8) +
    `<rect x="0" y="200" width="400" height="6" fill="#c9bd8a"/>` +
    `<rect x="0" y="206" width="400" height="4" fill="#4a4a52"/>` +
    `<path d="M340,178v-24" stroke="#f6efe2" stroke-width="2"/><path d="M340,154q10,4 0,8q-10,-4 0,-8" fill="#f6efe2"/>` +
    spinifex(40, 202) +
    spinifex(340, 200) +
    spinifex(180, 206) +
    spinifex(260, 204) +
    ghostGum(20, 210, 30),

  /** 真珠の海岸。ブルーム専用。真珠採り舟と赤い断崖。 */
  pearlcoast:
    sky("#e8b464", "#f4d9a0", 120) +
    sun(340, 40, 20, "#f5b31c") +
    clouds(70, 20, 0.8) +
    ground(120, "#a8562e") +
    `<rect x="0" y="160" width="400" height="50" fill="#1c6a8a"/>` +
    ripples(174, "#bfe8f4") +
    ripples(196, "#8fd0e8") +
    `<g><path d="M60,175h50l-6,10h-38z" fill="#f6efe2" stroke="#8a7050" stroke-width="1"/><line x1="85" y1="175" x2="85" y2="155" stroke="#6b5330" stroke-width="1.6"/></g>` +
    `<g><path d="M140,180h40l-5,8h-30z" fill="#e2dccb" stroke="#8a7050" stroke-width="1"/><line x1="160" y1="180" x2="160" y2="162" stroke="#6b5330" stroke-width="1.4"/></g>` +
    `<g fill="#f6efe2" opacity=".8"><ellipse cx="300" cy="200" rx="10" ry="3"/><ellipse cx="330" cy="204" rx="8" ry="3"/></g>` +
    ghostGum(370, 208, 30, "#8a7050", "#6f8a3a") +
    `<path d="M20,110l14,8M300,108l14,8" stroke="#4a4436" stroke-width="1.6" opacity=".7"/>`,

  /** 灯台と風の海岸。ジェラルトン専用。 */
  lighthouse:
    sky("#8fc4e8", "#cfe4f0", 110) +
    clouds(300, 24, 1) +
    ground(110, "#e8dcc0") +
    `<rect x="0" y="150" width="400" height="60" fill="#1c6a8a"/>` +
    ripples(164, "#bfe8f4") +
    ripples(198, "#8fd0e8") +
    lighthouseTower(80, 150, 70) +
    memorialDome(300, 150, 26) +
    `<rect x="286" y="150" width="28" height="6" fill="#c9c3b0"/>` +
    `<path d="M20,110l16,10M60,104l14,12M340,108l14,10" stroke="#f6efe2" stroke-width="2" opacity=".7"/>` +
    `<g fill="#20242a" opacity=".8"><path d="M40,120q6,-4 12,0"/><path d="M60,126q6,-4 12,0"/></g>` +
    `<g fill="#8a8478"><ellipse cx="40" cy="206" rx="10" ry="4"/><ellipse cx="360" cy="206" rx="14" ry="5"/></g>`,

  /** 捕鯨基地。オールバニ専用。煮沸釜と鯨。 */
  whalingstation:
    sky("#8fc4e8", "#cfe4f0", 120) +
    clouds(60, 24, 1) +
    hills(118, "#8fae63") +
    ground(120, "#8a8478") +
    `<rect x="0" y="160" width="400" height="50" fill="#1c6a8a"/>` +
    ripples(174, "#bfe8f4") +
    tryPot(90, 158, 20) +
    tryPot(140, 158, 16) +
    tryPot(280, 158, 12) +
    whaleShape(300, 186, 1.1) +
    `<rect x="0" y="150" width="400" height="10" fill="#6b7280"/>` +
    `<g fill="#4a4a52"><rect x="30" y="140" width="4" height="12"/><rect x="60" y="140" width="4" height="12"/><rect x="200" y="140" width="4" height="12"/></g>` +
    `<path d="M20,116l14,8M50,110l12,10" stroke="#f6efe2" stroke-width="1.6" opacity=".7"/>`,

  /** 鉄鉱石の港。ポート・ヘッドランド専用。赤い集積場。 */
  ironport:
    sky("#e8b464", "#f4d9a0", 118) +
    sun(340, 36, 18, "#f5b31c") +
    clouds(70, 24, 0.8) +
    ground(118, "#a8562e") +
    `<path d="M40,196L100,160L340,160L380,196z" fill="#c9713f"/>` +
    `<path d="M60,196L110,168L330,168L370,196z" fill="#8a5a3a"/>` +
    `<rect x="0" y="196" width="400" height="14" fill="#6b7280"/>` +
    `<rect x="0" y="206" width="400" height="4" fill="#1c6a8a"/>` +
    crane(120, 196, 40) +
    crane(280, 196, 46) +
    crane(340, 196, 30) +
    `<g fill="#20242a" opacity=".8"><ellipse cx="150" cy="210" rx="26" ry="4"/><ellipse cx="250" cy="210" rx="30" ry="4"/></g>` +
    `<path d="M30,60q6,-4 12,0M50,66q6,-4 12,0" fill="none" stroke="#f6efe2" stroke-width="1.6" opacity=".8"/>`,

  /** 鉄道の十字路。ポート・オーガスタ専用。 */
  railjunction:
    sky("#e8b464", "#f4d9a0", 122) +
    sun(60, 34, 18, "#f5b31c") +
    clouds(300, 20, 0.8) +
    ground(122, "#c9713f") +
    `<rect x="0" y="200" width="400" height="4" fill="#4a4a52"/>` +
    `<rect x="0" y="188" width="400" height="4" fill="#4a4a52" transform="rotate(-4 200 190)"/>` +
    `<g stroke="#6b5330" stroke-width="2"><path d="M40,204v-6M80,204v-6M120,204v-6M280,204v-6M320,204v-6M360,204v-6"/></g>` +
    signalPost(120, 190, 40) +
    signalPost(280, 186, 46) +
    `<g fill="#7f8896"><rect x="330" y="150" width="40" height="30"/><rect x="336" y="130" width="6" height="20"/></g>` +
    `<g fill="#bfe0f0" opacity=".6"><rect x="336" y="158" width="4" height="4"/><rect x="346" y="158" width="4" height="4"/></g>` +
    spinifex(40, 202) +
    spinifex(200, 206) +
    spinifex(240, 200),

  /** 地下の町。クーバー・ペディ専用。丘に埋まった住居。 */
  dugout:
    sky("#e8b464", "#f4d9a0", 116) +
    sun(340, 34, 18, "#f5b31c") +
    clouds(70, 20, 0.7) +
    ground(116, "#c9713f") +
    dugoutHome(70, 200, 90, 40) +
    dugoutHome(300, 204, 100, 44) +
    `<g fill="#e2dccb" opacity=".7"><ellipse cx="140" cy="204" rx="16" ry="6"/><ellipse cx="170" cy="206" rx="20" ry="7"/><ellipse cx="230" cy="204" rx="14" ry="5"/></g>` +
    `<g fill="#8a8478"><rect x="120" y="196" width="3" height="10"/><rect x="250" y="192" width="3" height="14"/></g>` +
    spinifex(30, 208) +
    spinifex(380, 206) +
    spinifex(160, 200) +
    spinifex(200, 202),

  /** 火口湖。マウント・ガンビア専用。コバルトブルーの水面。 */
  bluelake:
    sky("#8fc4e8", "#cfe4f0", 100) +
    clouds(320, 24, 1) +
    ground(100, "#6f8a4a") +
    craterRim(200, 150, 320, 70) +
    `<path d="M60,150Q200,90 340,150Q200,170 60,150z" fill="#1c6a8a"/>` +
    ripples(140, "#bfe8f4") +
    ripples(155, "#8fd0e8") +
    ghostGum(30, 208, 34) +
    ghostGum(370, 206, 30) +
    `<ellipse cx="120" cy="204" rx="30" ry="6" fill="#5f9a4a"/>` +
    `<ellipse cx="280" cy="206" rx="26" ry="5" fill="#4e7a3d"/>`,

  /** ブドウ畑の谷。タヌンダ(バロッサ)専用。ルター派教会の尖塔。 */
  vineyard:
    sky("#8fc4e8", "#cfe4f0", 128) +
    clouds(300, 26, 1) +
    hills(126, "#6f8a4a") +
    ground(128, "#a8874a") +
    vineRow(30, 190, 5, 20) +
    vineRow(30, 200, 5, 20) +
    churchSpire(340, 176, 50) +
    churchSpire(370, 178, 36),

  /** ホバートの港。世界最長の一つのヨットレースのゴール。ウェリントン山を背に。 */
  hobartharbour:
    sky("#8fc4e8", "#cfe4f0", 100) +
    clouds(90, 26, 1) +
    `<path d="M120,60L200,-4L280,60z" fill="#8b8f98"/>` +
    `<path d="M190,10L200,-4L210,10z" fill="#f2f6f8"/>` +
    ground(100, "#4e7a3d") +
    `<rect x="0" y="160" width="400" height="50" fill="#1c6a8a"/>` +
    ripples(174, "#bfe8f4") +
    ripples(196, "#8fd0e8") +
    `<g><path d="M60,174h20l-3,6h-14z" fill="#f6efe2" stroke="#4a4a52" stroke-width="1"/><line x1="70" y1="174" x2="70" y2="158" stroke="#4a4a52" stroke-width="1"/></g>` +
    `<g><path d="M320,178h22l-3,6h-16z" fill="#e2dccb" stroke="#4a4a52" stroke-width="1"/><line x1="331" y1="178" x2="331" y2="162" stroke="#4a4a52" stroke-width="1"/></g>` +
    `<g fill="#8a8478"><rect x="30" y="196" width="6" height="14"/><rect x="360" y="192" width="6" height="18"/></g>` +
    `<path d="M40,50l14,8M340,46l-14,8" stroke="#f6efe2" stroke-width="1.6" opacity=".8"/>`,

  /** キャタラクト峡谷。ランセストン専用。チェアリフト。 */
  cataractgorge:
    sky("#8fc4e8", "#cfe4f0", 90) +
    clouds(320, 22, 1) +
    ground(90, "#7a6a56") +
    `<path d="M0,90L130,210L0,210z" fill="#6b5a4a"/>` +
    `<path d="M400,90L270,210L400,210z" fill="#7a6a56"/>` +
    `<rect x="130" y="150" width="140" height="60" fill="#1c6a8a"/>` +
    ripples(170, "#bfe8f4") +
    ripples(190, "#8fd0e8") +
    chairliftTower(80, 150, 40) +
    chairliftTower(320, 150, 36) +
    `<line x1="86" y1="112" x2="326" y2="116" stroke="#6b7280" stroke-width="1.4"/>` +
    `<g fill="#5a4a3a"><ellipse cx="150" cy="205" rx="10" ry="4"/><ellipse cx="260" cy="207" rx="12" ry="4"/></g>` +
    `<path d="M20,120l10,-14M370,116l-10,-14" stroke="#4a4436" stroke-width="1.6" fill="none"/>`,

  /** 流刑地の廃墟。ポート・アーサー専用。文字要素は使わない。 */
  convictruins:
    sky("#9fc0d8", "#dbe6e0", 128) +
    clouds(300, 24, 0.9) +
    hills(126, "#6f8a4a") +
    ground(128, "#4e7a3d") +
    prisonRuin(120, 200, 120, 60) +
    prisonRuin(260, 204, 80, 44) +
    `<rect x="0" y="196" width="400" height="14" fill="#c9bd8a"/>` +
    `<rect x="0" y="206" width="400" height="4" fill="#1c6a8a"/>`,

  /** 熱帯雨林の川。ストラーン専用。ゴードン川の観光船。 */
  rainforest:
    sky("#8fc4e8", "#cfe4f0", 90) +
    clouds(60, 22, 1) +
    `<path d="M0,60L400,60L400,90L0,90z" fill="#3f5a34" opacity=".6"/>` +
    ground(90, "#2f5a34") +
    `<rect x="0" y="160" width="400" height="50" fill="#1c6a8a"/>` +
    ripples(174, "#bfe8f4") +
    riverboat(200, 186, 1.2) +
    ghostGum(30, 208, 40, "#8a7050", "#2f5a34") +
    ghostGum(370, 210, 46, "#8a7050", "#2f5a34"),

  /** 熱帯の港。ダーウィン専用。沈船のダイブサイトと夕暮れ。 */
  tropicalharbour:
    sky("#e8895a", "#f4c98a", 128) +
    sun(340, 40, 24, "#f5b31c") +
    hills(126, "#6f8a3a") +
    ground(128, "#8fae63") +
    `<rect x="0" y="168" width="400" height="42" fill="#1c6a8a"/>` +
    ripples(182, "#bfe8f4") +
    ripples(198, "#e89a6a") +
    `<g fill="#4a4a52" opacity=".8"><rect x="90" y="186" width="24" height="6" transform="rotate(-8 100 190)"/><circle cx="80" cy="192" r="3"/></g>` +
    ferry(240, 190, 0.9) +
    ferry(300, 196, 0.7) +
    ghostGum(30, 208, 34, "#8a7050", "#6f8a3a") +
    `<path d="M20,110l14,8M320,60l14,8" stroke="#4a4436" stroke-width="1.6" opacity=".8"/>`,

  /** 峡谷とゴージクルーズ。キャサリン専用。 */
  gorgecliffs:
    sky("#8fc4e8", "#cfe4f0", 90) +
    clouds(300, 22, 1) +
    ground(90, "#c9713f") +
    `<path d="M0,90L110,210L0,210z" fill="#a8562e"/>` +
    `<path d="M400,90L290,210L400,210z" fill="#c9713f"/>` +
    `<rect x="110" y="150" width="180" height="60" fill="#3f8fc4"/>` +
    ripples(170, "#bfe8f4") +
    ripples(190, "#8fd0e8") +
    riverboat(200, 186, 0.9) +
    spinifex(50, 202) +
    spinifex(350, 200) +
    spinifex(150, 200) +
    `<path d="M30,120l12,8M370,116l-12,8" stroke="#4a4436" stroke-width="1.6" fill="none"/>`,

  /** 一枚岩。ユララ(ウルル)専用。滑らかなドーム、登る人は描かない。 */
  monolith:
    sky("#e8b464", "#f4d9a0", 130) +
    sun(340, 36, 20, "#f5b31c") +
    clouds(70, 20, 0.7) +
    ground(130, "#c9713f") +
    monolithRock(200, 178, 220, 70) +
    spinifex(50, 202) +
    spinifex(340, 200) +
    spinifex(90, 206) +
    spinifex(310, 206) +
    spinifex(20, 196) +
    ghostGum(30, 210, 30) +
    ghostGum(370, 208, 26) +
    `<g fill="#8a5a3a" opacity=".7"><ellipse cx="140" cy="204" rx="6" ry="3"/><ellipse cx="260" cy="206" rx="8" ry="3"/></g>`,
};

export const AUSTRALIA_BG = { ...AUSTRALIA_BASE_BG };

// ---------------------------------------------------------------------------
// 都市シンボル(5種。5都市のサンプル分)。鍵は cities.mjs の `mark` と対応。
// 24×24の座標系。
// ---------------------------------------------------------------------------

export const AUSTRALIA_MARKS = {
  /** 鋼鉄アーチ橋。シドニー専用。 */
  bridge:
    `<path d="M2,18Q12,4 22,18" fill="none" stroke="#4a4a52" stroke-width="2.2"/>` +
    `<rect x="2" y="17" width="20" height="2" fill="#2f3b4f"/>` +
    `<g stroke="#4a4a52" stroke-width="1.2"><path d="M8,17v-6M12,17v-9M16,17v-6"/></g>`,

  /** 川面と黒鳥。パース専用。 */
  river:
    `<rect x="2" y="15" width="20" height="6" fill="#3f8fc4"/>` +
    `<ellipse cx="9" cy="15" rx="6" ry="3" fill="#20242a"/>` +
    `<path d="M9,12.5Q7,7.5 13,6.5Q10,7.5 11,4.5Q13.5,5 15,3.5" fill="none" stroke="#20242a" stroke-width="1.8" stroke-linecap="round"/>` +
    `<circle cx="15" cy="3.5" r="1.5" fill="#20242a"/>` +
    `<path d="M16.4,3.5l2.6,0.5l-2.2,1.2z" fill="#e8443f"/>`,

  /** 教会の尖塔。アデレード専用。 */
  spire:
    `<path d="M9,21V12L12,4L15,12V21z" fill="#c9c3b0"/>` +
    `<path d="M12,4v-3" stroke="#6b5a4a" stroke-width="1.4"/>` +
    `<rect x="10.5" y="15" width="3" height="4" fill="#3f5a34"/>`,

  /** 赤い岩の峰。アリス・スプリングス専用。 */
  ranges:
    `<path d="M2,20L8,8L12,14L16,6L22,20z" fill="#a8562e"/>` +
    `<path d="M8,8L9.5,11.5L6.5,12.5z" fill="#c9713f" opacity=".8"/>`,

  /** 鉱山のヘッドフレーム。カルグーリー・ブロークンヒル・バララット・ベンディゴ。 */
  mine:
    `<rect x="11" y="4" width="2" height="16" fill="#6b7280"/>` +
    `<path d="M6,20L12,4M18,20L12,4" stroke="#6b7280" stroke-width="1.6" fill="none"/>` +
    `<circle cx="12" cy="4" r="2" fill="none" stroke="#e8443f" stroke-width="1.2"/>` +
    `<rect x="5" y="18" width="14" height="3" fill="#8a5a3a"/>`,

  /** 国会議事堂の旗竿。キャンベラ専用。 */
  parliament:
    `<path d="M2,21a10,4 0 0 1 20,0z" fill="#8fae7a"/>` +
    `<rect x="11" y="4" width="2" height="17" fill="#8a8478"/>` +
    `<path d="M13,5l8,3l-8,2z" fill="#00247d"/>`,

  /** 起重機と船。ニューカッスル・ダーウィン・ホバート。 */
  port:
    `<rect x="4" y="4" width="2" height="14" fill="#e8443f"/>` +
    `<rect x="4" y="4" width="10" height="2" fill="#e8443f"/>` +
    `<path d="M2,18h20l-3,4H5z" fill="#2f6ea8"/>`,

  /** 煙突と高炉。ウロンゴン専用。 */
  steelmill:
    `<rect x="4" y="12" width="6" height="9" fill="#7f8896"/>` +
    `<rect x="12" y="7" width="4" height="14" fill="#6b7280"/>` +
    `<path d="M14,7c0,-3 3,-3 3,-6" stroke="#c8ccc4" stroke-width="1.6" fill="none" opacity=".8"/>`,

  /** 断崖の急勾配鉄道。カトゥーンバ専用。 */
  mountainpass:
    `<path d="M2,21L9,9L14,9L15,21z" fill="#8b8f98" opacity=".5"/>` +
    `<line x1="3" y1="21" x2="19" y2="5" stroke="#4a4a52" stroke-width="2"/>` +
    `<rect x="9.5" y="10.5" width="5" height="3.5" fill="#e8443f" transform="rotate(-45 12 12)"/>`,

  /** サーキットのコーナー。バサースト専用。 */
  racetrack:
    `<path d="M3,19Q12,5 21,19" fill="none" stroke="#4a4a52" stroke-width="4"/>` +
    `<path d="M3,19Q12,5 21,19" fill="none" stroke="#f6efe2" stroke-width="1" stroke-dasharray="2 2"/>` +
    `<g fill="#20242a"><rect x="2" y="4" width="2" height="2"/><rect x="4" y="6" width="2" height="2"/><rect x="2" y="8" width="2" height="2"/></g>`,

  /** パラボラアンテナ。パークス専用。 */
  dish:
    `<rect x="11" y="14" width="2" height="7" fill="#8a8478"/>` +
    `<path d="M4,14Q12,4 20,14Q12,10 4,14z" fill="#f6efe2" stroke="#8a8478" stroke-width="1"/>`,

  /** 巨大なギター。タムワース専用。 */
  guitar:
    `<circle cx="10" cy="16" r="5" fill="#f4c430" stroke="#6b5330" stroke-width="1"/>` +
    `<circle cx="14" cy="9" r="3.6" fill="#f4c430" stroke="#6b5330" stroke-width="1"/>` +
    `<rect x="13" y="2" width="2" height="8" fill="#6b5330"/>` +
    `<circle cx="10" cy="16" r="1.6" fill="#241a10"/>`,

  /** 路面電車。メルボルン専用。 */
  tram:
    `<rect x="3" y="10" width="18" height="8" rx="1.5" fill="#8a2e2e"/>` +
    `<rect x="5" y="12" width="4" height="3" fill="#bfe0f0"/><rect x="11" y="12" width="4" height="3" fill="#bfe0f0"/>` +
    `<circle cx="7" cy="19" r="1.6" fill="#20242a"/><circle cx="17" cy="19" r="1.6" fill="#20242a"/>` +
    `<line x1="12" y1="10" x2="12" y2="4" stroke="#4a4a52" stroke-width="1"/>`,

  /** 羊毛の梱。ジーロング専用。 */
  wool:
    `<rect x="3" y="10" width="8" height="7" fill="#e2dccb" stroke="#8a7a5c" stroke-width="1"/>` +
    `<rect x="12" y="10" width="8" height="7" fill="#e2dccb" stroke="#8a7a5c" stroke-width="1"/>` +
    `<rect x="7" y="4" width="8" height="7" fill="#e2dccb" stroke="#8a7a5c" stroke-width="1"/>`,

  /** 海に立つ石灰岩の塔。ワーナンブール専用。 */
  cliffs:
    `<rect y="16" width="24" height="8" fill="#1c6a8a"/>` +
    `<path d="M4,16L6,4L8,16z" fill="#e2dccb"/>` +
    `<path d="M14,16L17,2L20,16z" fill="#e2dccb"/>`,

  /** 牛と搾乳小屋。セール専用。 */
  dairy:
    `<ellipse cx="12" cy="14" rx="9" ry="6" fill="#f6efe2"/>` +
    `<g fill="#241a10"><ellipse cx="8" cy="13" rx="2.4" ry="3"/><ellipse cx="16" cy="15" rx="2" ry="2.6"/></g>` +
    `<circle cx="4" cy="10" r="3" fill="#f6efe2"/>`,

  /** 川沿いの高層ビル。ブリスベン専用。 */
  skyline:
    `<rect x="3" y="10" width="4" height="11" fill="#7f8896"/>` +
    `<rect x="9" y="4" width="5" height="17" fill="#8a94a2"/>` +
    `<rect x="16" y="12" width="4" height="9" fill="#7f8896"/>`,

  /** サーフビーチと高層ビル。ゴールドコースト専用。 */
  beach:
    `<path d="M2,16q5,-4 10,0t10,0" fill="none" stroke="#3f8fc4" stroke-width="1.8"/>` +
    `<rect x="2" y="18" width="20" height="3" fill="#e8dcc0"/>` +
    `<rect x="15" y="8" width="6" height="8" fill="#7f8896"/>`,

  /** 珊瑚礁と魚。ケアンズ・タウンズビル。 */
  reef:
    `<path d="M6,20Q2,10 6,4Q10,10 6,20z" fill="#e8785a"/>` +
    `<g fill="#f5b31c"><path d="M14,14q4,-2 7,0q-3,2 -7,0z"/><path d="M14,14l-2,-2v4z"/></g>`,

  /** サトウキビ列車。マッカイ専用。 */
  cane:
    `<rect x="4" y="12" width="14" height="6" fill="#8a5a3a"/>` +
    `<circle cx="8" cy="19" r="1.8" fill="#20242a"/><circle cx="16" cy="19" r="1.8" fill="#20242a"/>` +
    `<g fill="#a8ae5a"><rect x="6" y="4" width="2" height="10"/><rect x="10" y="6" width="2" height="8"/></g>`,

  /** 牛の像。ロックハンプトン専用。 */
  cattle:
    `<ellipse cx="12" cy="15" rx="7" ry="5" fill="#8a8478"/>` +
    `<path d="M6,11q-3,-2 -4,-4M18,11q3,-2 4,-4" stroke="#e2dccb" stroke-width="1.6" fill="none"/>` +
    `<circle cx="9" cy="13" r="1.2" fill="#241a10"/><circle cx="15" cy="13" r="1.2" fill="#241a10"/>`,

  /** 複葉機。ロングリーチ専用。 */
  aviation:
    `<line x1="2" y1="10" x2="22" y2="10" stroke="#20242a" stroke-width="1.6"/>` +
    `<line x1="4" y1="15" x2="20" y2="15" stroke="#20242a" stroke-width="1.4"/>` +
    `<path d="M4,12h14l4,3h-22z" fill="#e8443f"/>`,

  /** 真珠採り舟。ブルーム専用。 */
  pearl:
    `<path d="M3,17h18l-3,5H6z" fill="#e2dccb" stroke="#8a7050" stroke-width="1"/>` +
    `<line x1="12" y1="17" x2="12" y2="4" stroke="#6b5330" stroke-width="1.4"/>` +
    `<circle cx="12" cy="4" r="2" fill="#f6efe2" stroke="#8a8478" stroke-width=".8"/>`,

  /** 記念ドームと灯台。ジェラルトン専用。 */
  lighthouse:
    `<path d="M9,21L10,5h4l1,16z" fill="#f6efe2" stroke="#8a8478" stroke-width="1"/>` +
    `<rect x="9.6" y="11" width="4.8" height="3" fill="#e8443f"/>` +
    `<rect x="9" y="3" width="6" height="3" fill="#4a4a52"/>`,

  /** 鯨と解体甲板。オールバニ専用。 */
  whale:
    `<path d="M2,14q2,-6 12,-6q6,1 8,4l-3,1l3,2q-3,3 -8,3q-10,1 -12,-4z" fill="#3a4a5a"/>` +
    `<path d="M9,8q0,-3 4,-4q-1,2 0,4z" fill="#bfe8f4" opacity=".8"/>`,

  /** 鉱石の積出設備。ポート・ヘッドランド専用。 */
  ironore:
    `<path d="M2,20L8,10L16,10L20,20z" fill="#a8562e"/>` +
    `<rect x="17" y="4" width="2" height="16" fill="#6b7280"/>` +
    `<rect x="17" y="4" width="6" height="2" fill="#6b7280"/>`,

  /** 鉄道の分岐信号。ポート・オーガスタ専用。 */
  crossroads:
    `<rect x="11" y="4" width="2" height="16" fill="#6b7280"/>` +
    `<rect x="9" y="4" width="10" height="3" fill="#4a4a52"/>` +
    `<circle cx="18" cy="5.5" r="2" fill="#e8443f"/>`,

  /** 地下住居の通気筒。クーバー・ペディ専用。 */
  underground:
    `<path d="M2,20Q12,8 22,20z" fill="#c9713f"/>` +
    `<rect x="10" y="14" width="4" height="6" fill="#4a4436"/>` +
    `<rect x="6" y="10" width="2" height="10" fill="#8a8478"/>`,

  /** 火口湖。マウント・ガンビア専用。 */
  crater:
    `<path d="M2,16Q12,4 22,16z" fill="none" stroke="#8a7a5c" stroke-width="2"/>` +
    `<path d="M5,16Q12,10 19,16z" fill="#1c6a8a"/>`,

  /** ブドウ畑の畝。タヌンダ(バロッサ)専用。 */
  vineyard:
    `<line x1="2" y1="16" x2="22" y2="16" stroke="#8a7050" stroke-width="1.4"/>` +
    `<g fill="#4e7a3d"><circle cx="4" cy="13" r="2.4"/><circle cx="10" cy="13" r="2.4"/><circle cx="16" cy="13" r="2.4"/><circle cx="21" cy="13" r="2.4"/></g>`,

  /** 峡谷とチェアリフト。ランセストン・キャサリン。 */
  gorge:
    `<path d="M2,20L9,4L2,4z" fill="#a8562e"/>` +
    `<path d="M22,20L15,4L22,4z" fill="#c9713f"/>` +
    `<line x1="9" y1="8" x2="15" y2="9" stroke="#6b7280" stroke-width="1.2"/>`,

  /** 石造りの流刑地の廃墟。ポート・アーサー専用。文字要素は使わない。 */
  convict:
    `<rect x="3" y="10" width="18" height="11" fill="#c9a877"/>` +
    `<path d="M9,21v-7a3,3 0 0 1 6,0v7z" fill="#4a4436"/>` +
    `<rect x="3" y="21" width="18" height="2" fill="#8a7a5c"/>`,

  /** 熱帯雨林の川船。ストラーン専用。 */
  wilderness:
    `<path d="M4,18h16l-2,3H6z" fill="#8a5a3a"/>` +
    `<rect x="9" y="9" width="6" height="7" fill="#f6efe2"/>` +
    `<rect x="15" y="4" width="2" height="8" fill="#4a4a52"/>`,

  /** 一枚岩。ユララ(ウルル)専用。滑らかなドーム、登る人は描かない。 */
  monolith:
    `<path d="M2,20Q4,10 12,8Q20,10 22,20z" fill="#a8562e"/>` +
    `<path d="M6,15Q12,12 17,15" fill="none" stroke="#c9713f" stroke-width="1.4" opacity=".7"/>`,
};
