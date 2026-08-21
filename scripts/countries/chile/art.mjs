/**
 * チリ盤の都市イラスト。
 *
 * `CHILE_MARKS` は 24×24 の座標系に描くシンボル、`CHILE_BG` は 400×210 の
 * 座標系に描く背景シーン(いずれもSVG断片の文字列)。フランス・オセアニアと
 * 同じく最初から文字列として持ち、動きは含めない。
 *
 * ## この盤面の芯
 *
 * **北と南で、鉄道が止まった理由が違う。**
 * 北(ノルテ・グランデ)は硝石のためだけに敷かれ、**経済的な理由で**止まった
 * ——掘り尽くしたあとに、線路と町だけが残った。南(スル/アウストラル)は
 * 入植のために敷かれ、**地理的な理由で**止まった——プエルト・モントで線路は
 * 文字どおり終わり、その先はフィヨルドと氷河で、船と飛行機しか届かない。
 * 絵でも対にする:北は**砂に埋まる線路・煙の消えた煙突・無人の社宅**、
 * 南は**水際で終わる車止め・杭だけ残った桟橋・道の終わりの標識**。
 *
 * ## 描かないもの
 *
 * - 軍事政権期(1973〜90)に触れる町があるが、**惨状ではなく構造で描く。**
 *   遺体・暴力・爆発の瞬間は描かない。
 * - マプチェなど先住民族を「顔」で代表させない。**建築・木・水・道具**で語る。
 *   アラウカニアは砦と平原とアラウカリアの木で描く。
 * - 「南米の楽園リゾート」で埋めない。砂漠の乾き・鉱滓の灰色・南部の雨と
 *   苔の緑・パタゴニアの風を混ぜる。
 *
 * 色は他盤面と揃える。空 #8fc4e8〜、顔 #f6efe2、強調 #f5b31c/#e8443f/#5b8fe8。
 * チリらしさは硝石パンパの #e0cfa0、銅の #b87333、アンデスの雪 #f2f4f6、
 * 南部森林の #2f6b3a、氷河の #9fd4e4、パタゴニアのステップ #b0a068 で出す。
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
 * 既定の118はすぐ下に海か地面が来る場合の値で、水平線がもっと下にあるシーンで
 * そのままにすると、あいだが横一文字に透ける。
 * 確認は scratchpad の chile-bg-check.mjs(マゼンタ台紙で実測)。
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

/** パタゴニアのレンズ雲。風の強さを空で見せる。 */
function lenticular(y, fill = "#e8ecf0", o = ".8") {
  return (
    `<g fill="${fill}" opacity="${o}">` +
    `<ellipse cx="86" cy="${y}" rx="52" ry="6"/>` +
    `<ellipse cx="96" cy="${r1(y - 9)}" rx="36" ry="4.4"/>` +
    `<ellipse cx="300" cy="${r1(y + 12)}" rx="60" ry="6.6"/>` +
    `<ellipse cx="312" cy="${r1(y + 2)}" rx="40" ry="4.6"/>` +
    `</g>`
  );
}

/** 夜空の星。澄んだ北部の空はこれが主役。 */
function stars(n = 14, maxY = 70) {
  const p = [];
  for (let i = 0; i < n; i++) {
    const x = r1(((i * 137) % 396) + 2);
    const y = r1(((i * 53) % maxY) + 3);
    p.push(`<circle cx="${x}" cy="${y}" r="${i % 3 === 0 ? 1.5 : 1}"/>`);
  }
  return `<g fill="#e8ecf4" opacity=".9">${p.join("")}</g>`;
}

/**
 * アンデスの稜線。雪冠つき。**どの町からも東にこれが見える国。**
 * `y` が麓、`h` が峰の高さ。下へ60塗り足すので、直後に `ground(y…)` が来ても
 * 隙間は出ない(空側は `sky(..., y)` で必ず`y`まで塗り下ろすこと)。
 */
function cordillera(y, h, rock = "#7a7086", snowLine = 0.55) {
  const peaks = [
    [0, 0.5], [38, 0.85], [86, 0.6], [128, 1], [178, 0.7],
    [224, 0.92], [272, 0.62], [316, 0.86], [364, 0.66], [400, 0.8],
  ];
  let d = `M0,${r1(y - h * peaks[0][1])}`;
  for (let i = 1; i < peaks.length; i++) {
    const [px, ph] = peaks[i];
    const mx = r1((peaks[i - 1][0] + px) / 2);
    d += `L${mx},${r1(y - h * Math.min(peaks[i - 1][1], ph) * 0.42)}L${px},${r1(y - h * ph)}`;
  }
  d += `V${y + 60}H0z`;
  const caps = [];
  for (const [px, ph] of peaks) {
    if (ph < snowLine + 0.1) continue;
    const top = r1(y - h * ph);
    const wHalf = r1(h * 0.22);
    caps.push(
      `<path d="M${px},${top}l${wHalf},${r1(h * ph * 0.32)}l${r1(-wHalf * 0.6)},${r1(h * 0.05)}l${r1(-wHalf * 0.5)},${r1(-h * 0.06)}l${r1(-wHalf * 0.9)},${r1(h * 0.04)}z" fill="#f2f4f6"/>`,
    );
  }
  return `<path d="${d}" fill="${rock}"/>` + caps.join("");
}

/** 乾いた丸い丘(海岸砂漠)。 */
function dryHills(y, fill = "#c2a06a", count = 4) {
  const parts = [];
  for (let i = 0; i < count; i++) {
    const cx = 30 + (i * W) / count + (i % 2) * 24;
    parts.push(`<path d="M${r1(cx - 78)},${y}c22,-30 54,-30 78,0z" fill="${fill}"/>`);
  }
  return `<g opacity=".95">${parts.join("")}</g>`;
}

/**
 * 海。`y` から下端まで必ず塗る(地面を兼ねるので塗り残しが出ない)。
 */
function sea(y, deep = "#1f5f8f", mid = "#2f7fa8", near = "#4aa8c0") {
  const h = 210 - y;
  return (
    `<rect x="0" y="${y}" width="${W}" height="${h}" fill="${near}"/>` +
    `<rect x="0" y="${y}" width="${W}" height="${r1(h * 0.36)}" fill="${deep}"/>` +
    `<rect x="0" y="${r1(y + h * 0.36)}" width="${W}" height="${r1(h * 0.3)}" fill="${mid}"/>`
  );
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

/** 荒れた海の白い頭。マガジャネスの海はいつもこれ。 */
function whitecaps(y, n = 7) {
  const p = [];
  for (let i = 0; i < n; i++) {
    const x = r1(10 + (i * 380) / n + (i % 3) * 9);
    const yy = r1(y + (i % 4) * 12);
    p.push(
      `<path d="M${x},${yy}q10,-9 21,-2q-8,-2 -12,4q-4,4 -9,-2z" fill="#eef6f8" opacity=".9"/>`,
    );
  }
  return p.join("");
}

/** 遠い島影・岬。 */
function islandFar(x, y, w, h, fill = "#5f7080") {
  const hw = r1(w / 2);
  return `<path d="M${r1(x - hw)},${y}q${r1(w * 0.2)},${r1(-h * 0.95)} ${hw},${r1(-h * 0.9)}q${r1(w * 0.3)},${r1(-h * 0.1)} ${hw},${r1(h * 0.9)}z" fill="${fill}"/>`;
}

/** トタン屋根の低い家。チリの町並みの基本形。 */
function tinHouse(x, top, w, base, wall = "#e8e0cc", roof = "#b04a3a") {
  const h = base - top;
  const cx = r1(x + w / 2);
  const parts = [
    `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="${wall}"/>`,
    `<path d="M${x - 6},${top}L${cx},${r1(top - h * 0.4)}L${x + w + 6},${top}z" fill="${roof}"/>`,
    `<rect x="${x - 6}" y="${top}" width="${w + 12}" height="3" fill="#00000022"/>`,
  ];
  const cols = Math.max(1, Math.floor(w / 22));
  for (let i = 0; i < cols; i++) {
    const wx = r1(x + 6 + (i * (w - 14)) / Math.max(1, cols));
    parts.push(`<rect x="${wx}" y="${r1(top + h * 0.28)}" width="9" height="10" fill="#5f7f96"/>`);
  }
  parts.push(`<rect x="${r1(cx - 5)}" y="${r1(base - h * 0.44)}" width="10" height="${r1(h * 0.44)}" fill="#6b5330"/>`);
  return parts.join("");
}

/** 陸屋根の低い建物(北部砂漠の町。雨が降らないから屋根が平ら)。 */
function flatHouse(x, top, w, base, wall = "#e0cfa0", trim = "#b89a5f") {
  const h = base - top;
  const parts = [
    `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="${wall}"/>`,
    `<rect x="${r1(x - 2)}" y="${r1(top - 3)}" width="${w + 4}" height="4" fill="${trim}"/>`,
  ];
  const cols = Math.max(1, Math.floor(w / 20));
  for (let i = 0; i < cols; i++) {
    const wx = r1(x + 5 + (i * (w - 12)) / Math.max(1, cols));
    parts.push(`<rect x="${wx}" y="${r1(top + h * 0.3)}" width="8" height="9" fill="#4a6274"/>`);
  }
  return parts.join("");
}

/**
 * ドイツ入植地の家。急勾配の屋根・木羽根壁・破風飾り。
 * バルディビア〜フルティジャルはこの形で語る。
 */
function germanHouse(x, base, w, h, wall = "#e8dcc0", roof = "#7a4a3a") {
  const cx = r1(x + w / 2);
  const eave = r1(base - h * 0.55);
  return (
    `<rect x="${x}" y="${eave}" width="${w}" height="${r1(base - eave)}" fill="${wall}"/>` +
    `<path d="M${r1(x - 5)},${eave}L${cx},${r1(base - h)}L${r1(x + w + 5)},${eave}z" fill="${roof}"/>` +
    `<path d="M${r1(x - 5)},${eave}L${cx},${r1(base - h)}" stroke="#5f3a2c" stroke-width="1.6" fill="none"/>` +
    `<g stroke="#c8b894" stroke-width="1" opacity=".6" fill="none">` +
    `<path d="M${x},${r1(eave + 6)}h${w}M${x},${r1(eave + 12)}h${w}M${x},${r1(eave + 18)}h${w}"/></g>` +
    `<rect x="${r1(cx - 4)}" y="${r1(base - h + 8)}" width="8" height="8" fill="#4a6274"/>` +
    `<g fill="#4a6274"><rect x="${r1(x + 4)}" y="${r1(eave + 8)}" width="8" height="11"/>` +
    `<rect x="${r1(x + w - 12)}" y="${r1(eave + 8)}" width="8" height="11"/></g>` +
    `<rect x="${r1(cx - 5)}" y="${r1(base - 16)}" width="10" height="16" fill="#5a3f2c"/>`
  );
}

/**
 * パラフィト(チロエの高床式住居)。支柱が水の上に立つことが大事。
 */
function palafito(x, waterY, w, h, wall, roof = "#6b5a4a") {
  const floorY = r1(waterY - 12);
  const cx = r1(x + w / 2);
  return (
    `<g fill="#4a3a2c"><rect x="${r1(x + 3)}" y="${floorY}" width="3.4" height="${r1(waterY - floorY + 8)}"/>` +
    `<rect x="${r1(cx - 1.7)}" y="${floorY}" width="3.4" height="${r1(waterY - floorY + 8)}"/>` +
    `<rect x="${r1(x + w - 6)}" y="${floorY}" width="3.4" height="${r1(waterY - floorY + 8)}"/></g>` +
    `<rect x="${x}" y="${r1(floorY - h)}" width="${w}" height="${h}" fill="${wall}"/>` +
    `<path d="M${r1(x - 4)},${r1(floorY - h)}L${cx},${r1(floorY - h - h * 0.5)}L${r1(x + w + 4)},${r1(floorY - h)}z" fill="${roof}"/>` +
    `<rect x="${r1(cx - 4)}" y="${r1(floorY - h * 0.62)}" width="8" height="9" fill="#3a4a56"/>` +
    `<rect x="${r1(x + 3)}" y="${r1(floorY - 2)}" width="${r1(w - 6)}" height="2.6" fill="#3a3026"/>`
  );
}

/** チロエの木造教会。木羽根の塔と八角の尖塔。 */
function chiloeChurch(x, base, w, h, wall = "#c8a13f", trim = "#8a6f2c") {
  const cx = r1(x + w / 2);
  const tw = r1(w * 0.36);
  return (
    `<rect x="${x}" y="${r1(base - h * 0.44)}" width="${w}" height="${r1(h * 0.44)}" fill="${wall}"/>` +
    `<path d="M${r1(x - 4)},${r1(base - h * 0.44)}h${w + 8}l-7,-9h${r1(-w + 6)}z" fill="${trim}"/>` +
    `<rect x="${r1(cx - tw / 2)}" y="${r1(base - h * 0.82)}" width="${tw}" height="${r1(h * 0.4)}" fill="${wall}"/>` +
    `<path d="M${r1(cx - tw / 2 - 2)},${r1(base - h * 0.82)}L${cx},${r1(base - h)}L${r1(cx + tw / 2 + 2)},${r1(base - h * 0.82)}z" fill="${trim}"/>` +
    `<path d="M${cx},${r1(base - h - 8)}v6M${r1(cx - 3)},${r1(base - h - 5)}h6" stroke="#5f4c26" stroke-width="1.8" fill="none"/>` +
    `<g fill="#4a6274"><rect x="${r1(cx - 3)}" y="${r1(base - h * 0.72)}" width="6" height="8"/></g>` +
    `<g fill="#5a4630"><path d="M${r1(cx - 6)},${base}v-14a6,6 0 0 1 12,0v14z"/></g>` +
    `<g stroke="${trim}" stroke-width="1" opacity=".6" fill="none">` +
    `<path d="M${x},${r1(base - h * 0.3)}h${w}M${x},${r1(base - h * 0.18)}h${w}"/></g>`
  );
}

/** 桟橋。杭と板。 */
function jetty(x0, x1, deckY, waterY, deck = "#8a7454") {
  const p = [`<rect x="${x0}" y="${deckY}" width="${r1(x1 - x0)}" height="5" fill="${deck}"/>`];
  p.push(`<rect x="${x0}" y="${r1(deckY + 5)}" width="${r1(x1 - x0)}" height="2" fill="#5f4c33"/>`);
  for (let x = x0 + 6; x < x1; x += 22) {
    p.push(`<rect x="${r1(x)}" y="${r1(deckY + 5)}" width="4" height="${r1(waterY - deckY + 6)}" fill="#5f4c33"/>`);
  }
  return p.join("");
}

/** 朽ちた杭だけが残っている桟橋の跡。**南の「止まった」しるし。** */
function ruinedPiles(xs, waterY, h = 16) {
  return xs
    .map(
      (x, i) =>
        `<rect x="${x}" y="${r1(waterY - h - (i % 3) * 4)}" width="3.6" height="${r1(h + (i % 3) * 4 + 4)}" fill="#5a4a34"/>` +
        `<ellipse cx="${r1(x + 1.8)}" cy="${waterY}" rx="5" ry="2" fill="#000" opacity=".16"/>`,
    )
    .join("");
}

/** 線路。2本のレールと枕木。 */
function track(y, x0 = 0, x1 = W) {
  const ties = [];
  for (let x = x0 + 4; x < x1; x += 14) {
    ties.push(`<rect x="${x}" y="${r1(y - 1.6)}" width="9" height="3.2" fill="#6b5a3a"/>`);
  }
  return (
    `<g>${ties.join("")}</g>` +
    `<rect x="${x0}" y="${r1(y - 4)}" width="${r1(x1 - x0)}" height="2" fill="#8a8f92"/>` +
    `<rect x="${x0}" y="${r1(y + 2)}" width="${r1(x1 - x0)}" height="2" fill="#8a8f92"/>`
  );
}

/** 車止め。**線路が終わる場所のしるし。** */
function bufferStop(x, y) {
  return (
    `<g stroke="#7a3a2c" stroke-width="3.4" fill="none">` +
    `<path d="M${r1(x - 9)},${r1(y + 4)}L${x},${r1(y - 12)}L${r1(x + 9)},${r1(y + 4)}"/></g>` +
    `<rect x="${r1(x - 8)}" y="${r1(y - 14)}" width="16" height="7" rx="1.6" fill="#c8452f"/>` +
    `<rect x="${r1(x - 8)}" y="${r1(y - 11.4)}" width="16" height="1.8" fill="#f2f4f6"/>`
  );
}

/** 鉱山の立坑やぐら。 */
function headframe(x, base, h, color = "#5f5548") {
  const w = r1(h * 0.5);
  return (
    `<g stroke="${color}" stroke-width="3" fill="none">` +
    `<path d="M${r1(x - w / 2)},${base}L${x},${r1(base - h)}L${r1(x + w / 2)},${base}"/>` +
    `<path d="M${r1(x - w * 0.3)},${r1(base - h * 0.45)}h${r1(w * 0.6)}"/></g>` +
    `<circle cx="${x}" cy="${r1(base - h)}" r="${r1(h * 0.14)}" fill="none" stroke="${color}" stroke-width="2.4"/>` +
    `<path d="M${x},${r1(base - h)}L${r1(x + w * 0.7)},${base}" stroke="#3f382e" stroke-width="1.4" fill="none"/>`
  );
}

/** 煙突。`smoke` を false にすると**煙の消えた**煙突になる。 */
function chimney(x, base, w, h, smoke = true, brick = "#8a7f70") {
  let s = "";
  if (smoke) {
    s = plume(r1(x + w / 2), r1(base - h), 20, 0.7, "#d8d2c4", ".8");
  }
  return (
    `<rect x="${x}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${brick}"/>` +
    `<rect x="${r1(x - 1)}" y="${r1(base - h)}" width="${w + 2}" height="4" fill="#6b6256"/>` +
    s
  );
}

/** 噴煙・煙。上へ広がる楕円の重なり。 */
function plume(x, base, h, s = 1, color = "#b8b2a8", o = ".85") {
  const p = [];
  const n = 6;
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    p.push(
      `<ellipse cx="${r1(x + t * 16 * s)}" cy="${r1(base - t * h)}" rx="${r1((7 + t * 20) * s)}" ry="${r1((5 + t * 13) * s)}"/>`,
    );
  }
  return `<g fill="${color}" opacity="${o}">${p.join("")}</g>`;
}

/** 火山錐。雪をかぶった成層火山(オソルノ・ビジャリカ)。 */
function volcanoCone(x, base, h, w, rock = "#5f6874", snowT = 0.5) {
  const hw = r1(w / 2);
  const sy = r1(base - h * snowT);
  const sw = r1(hw * (1 - snowT) + w * 0.05);
  return (
    `<path d="M${r1(x - hw)},${base}Q${r1(x - w * 0.16)},${r1(base - h * 0.72)} ${r1(x - w * 0.05)},${r1(base - h)}h${r1(w * 0.1)}Q${r1(x + w * 0.16)},${r1(base - h * 0.72)} ${r1(x + hw)},${base}z" fill="${rock}"/>` +
    `<path d="M${r1(x - sw)},${sy}q${r1(sw * 0.5)},6 ${sw},0q${r1(sw * 0.4)},5 ${sw},0L${r1(x + w * 0.05)},${r1(base - h)}h${r1(-w * 0.1)}z" fill="#f2f4f6"/>`
  );
}

/** 露天掘りの段(ベンチ)。穴の縁を上から見た弧。 */
function pitBenches(cx, cy, n = 4, rw = 150, rh = 34, rock = "#9a7a5a") {
  const p = [];
  for (let i = 0; i < n; i++) {
    const t = 1 - i * 0.22;
    p.push(
      `<ellipse cx="${cx}" cy="${r1(cy + i * 8)}" rx="${r1(rw * t)}" ry="${r1(rh * t)}" fill="${i % 2 ? "#8a6a4a" : rock}"/>`,
    );
  }
  p.push(`<ellipse cx="${cx}" cy="${r1(cy + n * 8)}" rx="${r1(rw * (1 - n * 0.22) + 8)}" ry="${r1(rh * (1 - n * 0.22) + 3)}" fill="#5f4632"/>`);
  return p.join("");
}

/** ブドウ畑の列。奥へすぼむ。 */
function vineRows(y0, y1, n = 5, green = "#5f8f3f", post = "#6b5a3a") {
  const p = [];
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const y = r1(y0 + (y1 - y0) * t * t);
    const lean = r1(8 + t * 26);
    p.push(
      `<path d="M${-10 + lean},${y}q${W / 2},${r1(-4 - t * 5)} ${W + 20 - lean * 2},0" stroke="${green}" stroke-width="${r1(3 + t * 5)}" fill="none"/>`,
    );
    if (i % 2 === 0) {
      p.push(
        `<g fill="${post}"><rect x="${r1(60 + t * 30)}" y="${r1(y - 7 - t * 3)}" width="2.4" height="${r1(8 + t * 4)}"/>` +
          `<rect x="${r1(320 - t * 30)}" y="${r1(y - 7 - t * 3)}" width="2.4" height="${r1(8 + t * 4)}"/></g>`,
      );
    }
  }
  return p.join("");
}

/** ポプラ並木(中央谷の畑の縁)。 */
function poplar(x, base, h, fill = "#4f7f3a") {
  return (
    `<rect x="${r1(x - 1.4)}" y="${r1(base - h * 0.3)}" width="2.8" height="${r1(h * 0.3)}" fill="#5a4630"/>` +
    `<ellipse cx="${x}" cy="${r1(base - h * 0.62)}" rx="${r1(h * 0.16)}" ry="${r1(h * 0.42)}" fill="${fill}"/>`
  );
}

/** アラウカリア。傘状の樹冠が段になる。**この木だけで南の平原と分かる。** */
function araucaria(x, base, h, crown = "#2f5f44") {
  const p = [`<path d="M${r1(x - 1.8)},${base}L${r1(x - 0.8)},${r1(base - h)}h1.6L${r1(x + 1.8)},${base}z" fill="#6b5340"/>`];
  const tiers = 4;
  for (let i = 0; i < tiers; i++) {
    const t = i / tiers;
    const y = r1(base - h * (0.45 + t * 0.55));
    const wHalf = r1(h * 0.3 * (1 - t * 0.72));
    p.push(
      `<path d="M${r1(x - wHalf)},${y}q${wHalf},${r1(-h * 0.1)} ${wHalf},${r1(-h * 0.16)}q0,${r1(h * 0.06)} ${wHalf},${r1(h * 0.16)}q${r1(-wHalf * 0.5)},${r1(h * 0.05)} ${-wHalf},0z" fill="${crown}"/>`,
    );
  }
  return p.join("");
}

/** 風に曲げられた旗の木(パタゴニア)。枝が片側にしか無い。 */
function windTree(x, base, h, lean = 14, crown = "#4f6b46") {
  return (
    `<path d="M${x},${base}q${r1(lean * 0.3)},${r1(-h * 0.55)} ${lean},${r1(-h)}" stroke="#5a4630" stroke-width="3" fill="none"/>` +
    `<g fill="${crown}">` +
    `<ellipse cx="${r1(x + lean + 9)}" cy="${r1(base - h + 2)}" rx="11" ry="5"/>` +
    `<ellipse cx="${r1(x + lean * 0.7 + 8)}" cy="${r1(base - h * 0.72)}" rx="9" ry="4.2"/>` +
    `<ellipse cx="${r1(x + lean * 0.45 + 7)}" cy="${r1(base - h * 0.5)}" rx="7" ry="3.6"/>` +
    `</g>`
  );
}

/** サボテン(北部の谷)。 */
function cactus(x, base, h, fill = "#5f7f4a") {
  return (
    `<rect x="${r1(x - 2.4)}" y="${r1(base - h)}" width="4.8" height="${h}" rx="2.2" fill="${fill}"/>` +
    `<path d="M${r1(x - 2.4)},${r1(base - h * 0.55)}q-6,-1 -6,-8q0,-3 2.6,-3q2.4,0 2.4,3q0,3.4 1,4.4z" fill="${fill}"/>` +
    `<path d="M${r1(x + 2.4)},${r1(base - h * 0.42)}q6,-1 6,-9q0,-3 -2.6,-3q-2.4,0 -2.4,3q0,4 -1,5z" fill="${fill}"/>`
  );
}

/** 柵。ステップの牧場。 */
function fence(x0, x1, y, post = "#6b5a3a") {
  const p = [];
  for (let x = x0; x <= x1; x += 18) {
    p.push(`<rect x="${x}" y="${r1(y - 9)}" width="2.4" height="10" fill="${post}"/>`);
  }
  p.push(
    `<path d="M${x0},${r1(y - 7)}H${x1}M${x0},${r1(y - 3)}H${x1}" stroke="${post}" stroke-width="1.4" fill="none"/>`,
  );
  return p.join("");
}

/** 羊の群れ。点で描く。 */
function sheepFlock(xs, y) {
  return xs
    .map(
      ([x, dy], i) =>
        `<g><ellipse cx="${x}" cy="${r1(y + dy)}" rx="5" ry="3.2" fill="#e8e4d8"/>` +
        `<circle cx="${r1(x + (i % 2 ? 4 : -4))}" cy="${r1(y + dy - 1.4)}" r="1.6" fill="#3a3430"/></g>`,
    )
    .join("");
}

/** 港のガントリークレーン。 */
function gantry(x, base, s = 1, color = "#c8452f") {
  return (
    `<g stroke="${color}" stroke-width="${r1(3.4 * s)}" fill="none">` +
    `<path d="M${r1(x - 14 * s)},${base}V${r1(base - 40 * s)}M${r1(x + 14 * s)},${base}V${r1(base - 40 * s)}"/>` +
    `<path d="M${r1(x - 30 * s)},${r1(base - 40 * s)}H${r1(x + 34 * s)}"/>` +
    `<path d="M${r1(x - 30 * s)},${r1(base - 40 * s)}l${r1(10 * s)},${r1(-10 * s)}"/></g>` +
    `<path d="M${r1(x - 6 * s)},${r1(base - 40 * s)}v${r1(12 * s)}" stroke="#33302c" stroke-width="${r1(1.6 * s)}" fill="none"/>` +
    `<rect x="${r1(x - 11 * s)}" y="${r1(base - 28 * s)}" width="${r1(11 * s)}" height="${r1(7 * s)}" fill="#3f7f9a"/>`
  );
}

/** コンテナの山。 */
function containerStack(x, base, rows = 2, cols = 3) {
  const colors = ["#3f7f9a", "#c8a13f", "#4f9a5f", "#c8452f", "#8a5a9a", "#5f6874"];
  const p = [];
  for (let ry = 0; ry < rows; ry++) {
    for (let cx = 0; cx < cols - (ry % 2); cx++) {
      const c = colors[(ry * cols + cx + x) % colors.length];
      p.push(
        `<rect x="${r1(x + cx * 17 + (ry % 2) * 8)}" y="${r1(base - 10 - ry * 10)}" width="16" height="9" fill="${c}"/>`,
      );
    }
  }
  return p.join("");
}

/** 貨物船。 */
function freighter(x, y, s = 1, hull = "#8a4a30", house = "#e0dccc") {
  const p = [
    `<path d="M${r1(x - 60 * s)},${r1(y - 12 * s)}h${r1(120 * s)}l${r1(-8 * s)},${r1(12 * s)}h${r1(-104 * s)}z" fill="${hull}"/>`,
    `<rect x="${r1(x - 60 * s)}" y="${r1(y - 16 * s)}" width="${r1(120 * s)}" height="${r1(4 * s)}" fill="#5f3320"/>`,
    `<rect x="${r1(x + 20 * s)}" y="${r1(y - 32 * s)}" width="${r1(28 * s)}" height="${r1(16 * s)}" fill="${house}"/>`,
    `<g fill="#3f4a56">${[0, 1, 2, 3]
      .map((i) => `<rect x="${r1(x + 23 * s + i * 6 * s)}" y="${r1(y - 28 * s)}" width="${r1(4 * s)}" height="${r1(5 * s)}"/>`)
      .join("")}</g>`,
    `<rect x="${r1(x + 30 * s)}" y="${r1(y - 42 * s)}" width="${r1(8 * s)}" height="${r1(10 * s)}" fill="#c8452f"/>`,
    `<rect x="${r1(x + 30 * s)}" y="${r1(y - 42 * s)}" width="${r1(8 * s)}" height="${r1(3 * s)}" fill="#2f2f2f"/>`,
  ];
  const cols = [
    ["#3f7f9a", -54, -24],
    ["#c8a13f", -38, -24],
    ["#8a5a9a", -22, -24],
    ["#4f9a5f", -6, -24],
    ["#c8452f", -38, -32],
    ["#3f7f9a", -22, -32],
  ];
  for (const [c, dx, dy] of cols) {
    p.push(`<rect x="${r1(x + dx * s)}" y="${r1(y + dy * s)}" width="${r1(15 * s)}" height="${r1(8 * s)}" fill="${c}"/>`);
  }
  return p.join("");
}

/** 木造の漁船(黄色や赤の南部のランチャ)。 */
function lancha(x, y, s = 1, hull = "#c8a13f") {
  return (
    `<path d="M${r1(x - 20 * s)},${y}q${r1(20 * s)},${r1(10 * s)} ${r1(40 * s)},0q${r1(-20 * s)},${r1(-4 * s)} ${r1(-40 * s)},0z" fill="${hull}"/>` +
    `<path d="M${r1(x - 16 * s)},${r1(y - 1 * s)}h${r1(32 * s)}v${r1(2 * s)}h${r1(-32 * s)}z" fill="#e8e0cc"/>` +
    `<rect x="${r1(x + 6 * s)}" y="${r1(y - 9 * s)}" width="${r1(9 * s)}" height="${r1(9 * s)}" fill="#4a5a66"/>` +
    `<path d="M${r1(x - 10 * s)},${r1(y - 2 * s)}v${r1(-10 * s)}" stroke="#5a4630" stroke-width="${r1(1.6 * s)}" fill="none"/>`
  );
}

/** 灯台。赤白の横縞。 */
function lighthouse(x, base, h, s1 = "#c8452f", s2 = "#f2f4f6") {
  const w = r1(h * 0.34);
  const bands = [];
  const n = 4;
  for (let i = 0; i < n; i++) {
    const y0 = r1(base - h + (h * 0.8 * i) / n);
    bands.push(
      `<path d="M${r1(x - w / 2 - ((w * 0.16) / n) * (n - i))},${y0}h${r1(w + ((w * 0.32) / n) * (n - i))}v${r1((h * 0.8) / n)}h${r1(-w - ((w * 0.32) / n) * (n - i - 0.6))}z" fill="${i % 2 ? s2 : s1}"/>`,
    );
  }
  return (
    bands.join("") +
    `<rect x="${r1(x - w * 0.42)}" y="${r1(base - h - h * 0.16)}" width="${r1(w * 0.84)}" height="${r1(h * 0.16)}" fill="#33302c"/>` +
    `<rect x="${r1(x - w * 0.3)}" y="${r1(base - h - h * 0.13)}" width="${r1(w * 0.6)}" height="${r1(h * 0.1)}" fill="#f5d34c"/>` +
    `<path d="M${r1(x - w * 0.5)},${r1(base - h - h * 0.16)}h${w}l${r1(-w * 0.5)},${r1(-h * 0.1)}z" fill="#c8452f"/>`
  );
}

/** 海鳥。 */
function gull(x, y, s = 1, color = "#3a3a34") {
  return `<path d="M${r1(x - 7 * s)},${y}q${r1(3.5 * s)},${r1(-4.5 * s)} ${r1(7 * s)},0q${r1(3.5 * s)},${r1(-4.5 * s)} ${r1(7 * s)},0" stroke="${color}" stroke-width="${r1(1.6 * s)}" fill="none" stroke-linecap="round"/>`;
}

/** コンドル。翼の先が指のように開く。 */
function condor(x, y, s = 1) {
  return (
    `<g fill="#33302c">` +
    `<path d="M${r1(x - 16 * s)},${y}q${r1(8 * s)},${r1(-6 * s)} ${r1(16 * s)},${r1(-2 * s)}q${r1(8 * s)},${r1(-4 * s)} ${r1(16 * s)},2q${r1(-8 * s)},${r1(-1 * s)} ${r1(-15 * s)},${r1(1 * s)}q${r1(-9 * s)},${r1(-2 * s)} ${r1(-17 * s)},${r1(-1 * s)}z"/>` +
    `</g>`
  );
}

/** 人。20px前後。 */
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

/** 馬と騎手(アリエロ・ガウチョ)。 */
function rider(x, y, s = 1, coat = "#8a4a30", horse = "#5a4630") {
  return (
    `<g>` +
    `<path d="M${r1(x - 14 * s)},${y}q${r1(2 * s)},${r1(-10 * s)} ${r1(12 * s)},${r1(-10 * s)}h${r1(8 * s)}q${r1(9 * s)},0 ${r1(8 * s)},${r1(8 * s)}l${r1(-2 * s)},${r1(2 * s)}" fill="${horse}"/>` +
    `<path d="M${r1(x + 12 * s)},${r1(y - 9 * s)}q${r1(6 * s)},${r1(-2 * s)} ${r1(7 * s)},${r1(-8 * s)}l${r1(2.6 * s)},${r1(1 * s)}q0,${r1(8 * s)} ${r1(-7 * s)},${r1(10 * s)}z" fill="${horse}"/>` +
    `<circle cx="${r1(x + 22.4 * s)}" cy="${r1(y - 17 * s)}" r="${r1(2.6 * s)}" fill="${horse}"/>` +
    `<g stroke="${horse}" stroke-width="${r1(2.4 * s)}" fill="none">` +
    `<path d="M${r1(x - 11 * s)},${y}v${r1(9 * s)}M${r1(x - 4 * s)},${y}v${r1(9 * s)}M${r1(x + 6 * s)},${y}v${r1(9 * s)}M${r1(x + 12 * s)},${y}v${r1(9 * s)}"/></g>` +
    `<path d="M${r1(x - 14 * s)},${y}q${r1(-4 * s)},${r1(2 * s)} ${r1(-3 * s)},${r1(7 * s)}" stroke="${horse}" stroke-width="${r1(1.8 * s)}" fill="none"/>` +
    `<path d="M${r1(x - 2 * s)},${r1(y - 10 * s)}l${r1(1 * s)},${r1(-9 * s)}h${r1(5 * s)}l${r1(1 * s)},${r1(9 * s)}z" fill="${coat}"/>` +
    `<circle cx="${r1(x + 1 * s)}" cy="${r1(y - 21 * s)}" r="${r1(2.8 * s)}" fill="#c98f5f"/>` +
    `<path d="M${r1(x - 3 * s)},${r1(y - 23 * s)}h${r1(8 * s)}l${r1(-1 * s)},${r1(-1.6 * s)}h${r1(-6 * s)}z" fill="#3f3428"/>` +
    `</g>`
  );
}

/** 天文台のドーム。 */
function dome(x, base, rr, fill = "#e8ecf0") {
  return (
    `<path d="M${r1(x - rr)},${base}v${r1(-rr * 0.3)}a${rr},${rr} 0 0 1 ${rr * 2},0v${r1(rr * 0.3)}z" fill="${fill}"/>` +
    `<path d="M${r1(x - rr * 0.14)},${r1(base - rr * 1.28)}l${r1(rr * 0.28)},0l${r1(rr * 0.1)},${r1(rr * 0.5)}l${r1(-rr * 0.48)},0z" fill="#8a929c"/>` +
    `<rect x="${r1(x - rr)}" y="${r1(base - rr * 0.02)}" width="${r1(rr * 2)}" height="3" fill="#b8bec6"/>`
  );
}

/** 氷河の舌。谷を流れ下る白と青。 */
function glacierTongue(x, y, w, h) {
  const hw = r1(w / 2);
  return (
    `<path d="M${r1(x - hw)},${r1(y + h)}Q${r1(x - hw * 0.6)},${r1(y + h * 0.3)} ${r1(x - hw * 0.34)},${y}h${r1(w * 0.34)}Q${r1(x + hw * 0.7)},${r1(y + h * 0.4)} ${r1(x + hw)},${r1(y + h)}z" fill="#dceef4"/>` +
    `<g stroke="#8fc4d8" stroke-width="2" opacity=".8" fill="none">` +
    `<path d="M${r1(x - hw * 0.5)},${r1(y + h * 0.9)}Q${r1(x - hw * 0.3)},${r1(y + h * 0.4)} ${r1(x - hw * 0.16)},${r1(y + h * 0.08)}M${x},${r1(y + h * 0.92)}V${r1(y + h * 0.1)}M${r1(x + hw * 0.44)},${r1(y + h * 0.9)}Q${r1(x + hw * 0.3)},${r1(y + h * 0.4)} ${r1(x + hw * 0.14)},${r1(y + h * 0.08)}"/></g>` +
    `<path d="M${r1(x - hw)},${r1(y + h)}q${hw},8 ${w},0v6h${-w}z" fill="#bfe4f0"/>`
  );
}

/** 浮氷。 */
function iceberg(x, y, s = 1) {
  return (
    `<path d="M${r1(x - 9 * s)},${y}l${r1(3 * s)},${r1(-8 * s)}l${r1(5 * s)},${r1(3 * s)}l${r1(4 * s)},${r1(-6 * s)}l${r1(6 * s)},${r1(11 * s)}z" fill="#e8f4f8"/>` +
    `<path d="M${r1(x - 9 * s)},${y}h${r1(18 * s)}l${r1(-2 * s)},${r1(3 * s)}h${r1(-14 * s)}z" fill="#9fd4e4"/>`
  );
}

/** 木箱と樽。 */
function crate(x, base, w = 16, h = 12, fill = "#b08a4f") {
  return (
    `<rect x="${x}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${fill}"/>` +
    `<g stroke="#7f6234" stroke-width="1.6" fill="none"><path d="M${x},${r1(base - h)}l${w},${h}M${r1(x + w)},${r1(base - h)}l${-w},${h}"/></g>` +
    `<rect x="${x}" y="${r1(base - h)}" width="${w}" height="2.4" fill="#8a6b3a"/>`
  );
}

function barrel(x, base, s = 1, fill = "#8a6b3a") {
  return (
    `<path d="M${r1(x - 6 * s)},${base}q${r1(-2 * s)},${r1(-8 * s)} 0,${r1(-16 * s)}h${r1(12 * s)}q${r1(2 * s)},${r1(8 * s)} 0,${r1(16 * s)}z" fill="${fill}"/>` +
    `<g stroke="#5f4526" stroke-width="${r1(1.4 * s)}" fill="none">` +
    `<path d="M${r1(x - 6.6 * s)},${r1(base - 4 * s)}h${r1(13.2 * s)}M${r1(x - 6.6 * s)},${r1(base - 12 * s)}h${r1(13.2 * s)}"/></g>`
  );
}

/** 洗濯物のロープ。人の暮らしのしるし。 */
function laundry(x0, x1, y, colors = ["#e8443f", "#f2f4f6", "#5b8fe8"]) {
  const p = [`<path d="M${x0},${y}Q${r1((x0 + x1) / 2)},${r1(y + 7)} ${x1},${y}" stroke="#8a8f92" stroke-width="1.2" fill="none"/>`];
  const n = colors.length;
  for (let i = 0; i < n; i++) {
    const t = (i + 1) / (n + 1);
    const x = r1(x0 + (x1 - x0) * t);
    const yy = r1(y + 7 * 4 * t * (1 - t) * 0.9);
    p.push(`<path d="M${r1(x - 4)},${yy}h8l-1,9h-6z" fill="${colors[i]}"/>`);
  }
  return p.join("");
}

/** 砂の吹き溜まり。**北で時が止まっているしるし。** */
function sandDrift(x, base, w, h = 8, fill = "#e0cfa0") {
  return `<path d="M${x},${base}q${r1(w * 0.3)},${-h} ${r1(w * 0.62)},${r1(-h * 0.7)}q${r1(w * 0.25)},${r1(h * 0.25)} ${r1(w * 0.38)},${r1(h * 0.7)}z" fill="${fill}"/>`;
}

// ---------------------------------------------------------------------------
// 背景シーン(400×210)
//
// **中央 x=151〜249 / y=54〜152 はシンボルに、(200,155)の楕円は影に隠れる。**
// 見せたいものは左右3分の1と y>170 に置く。
// ---------------------------------------------------------------------------

export const CHILE_BG = {
  /**
   * 砂漠を背にした硝石の積出港(アントファガスタ・アリカ・イキケ)。
   * 乾いた丘と平屋根の町、そして海。**雨どいの無い町。**
   */
  desertport:
    sky("#a8cce0", "#e8d8b0", 96) +
    sun(52, 30, 13, "#f5d34c") +
    dryHills(96, "#b8925f", 3) +
    dryHills(102, "#c9a877", 4) +
    ground(96, "#d8bc88") +
    // 平屋根の町並み(左右)
    flatHouse(6, 92, 44, 122, "#e8d8b0") +
    flatHouse(56, 98, 38, 122, "#d8c294") +
    flatHouse(100, 94, 42, 122, "#efe2c6") +
    flatHouse(258, 96, 40, 122, "#e0cfa0") +
    flatHouse(304, 92, 46, 122, "#e8d8b0") +
    flatHouse(356, 98, 40, 122, "#d8c294") +
    `<path d="M20,88v-8M118,86v-8" stroke="#8a8f92" stroke-width="1.6" fill="none"/>` +
    // 港へ落ちる崖と海
    ground(122, "#c2a06a") +
    sea(140, "#1f5f8f", "#2f7fa8", "#4aa8c0") +
    swell(156) +
    // 積出の桟橋とクレーン(左)。硝石の袋を積む。
    jetty(8, 148, 148, 168) +
    gantry(56, 148, 0.9, "#8a6f4a") +
    `<g fill="#e8dcc0"><rect x="86" y="138" width="10" height="7" rx="2"/><rect x="98" y="138" width="10" height="7" rx="2"/><rect x="92" y="131" width="10" height="7" rx="2"/></g>` +
    freighter(320, 196, 0.9) +
    lancha(200, 200, 0.9, "#c8452f") +
    swell(186, "#bfe8f4", ".4") +
    gull(150, 60, 1) +
    gull(172, 50, 0.8) +
    gull(360, 118, 0.9),

  /**
   * 無人の硝石オフィシナ(ウンベルストネ)。
   * **煙の消えた煙突・窓の抜けた社宅・砂に埋まる線路。**1960年に人が去り、
   * 2005年に世界遺産になった。ここが「経済的な理由で止まった」ほうの絵。
   */
  saltpeterghost:
    sky("#c2d4d8", "#e8ddb8", 104) +
    sun(340, 28, 11, "#f2e4c0") +
    band(96, 8, "#d8c898") +
    ground(104, "#dcc691") +
    // 製錬所の廃屋(左)。鉄骨がむき出し。
    `<rect x="8" y="46" width="88" height="66" fill="#9a8a72"/>` +
    `<path d="M8,46h88l-10,-14H20z" fill="#7a6a52"/>` +
    `<g fill="#5f5244"><rect x="18" y="60" width="13" height="16"/><rect x="40" y="60" width="13" height="16"/><rect x="62" y="60" width="13" height="16"/></g>` +
    `<path d="M30,32v-10M62,32v-10" stroke="#6b5f4c" stroke-width="3" fill="none"/>` +
    chimney(104, 104, 12, 64, false, "#8a7a62") +
    // 窓の抜けた社宅の列(右)
    `<g>${[252, 288, 324, 360]
      .map(
        (x) =>
          `<rect x="${x}" y="92" width="30" height="26" fill="#c2ab84"/>` +
          `<path d="M${x - 3},92h36l-5,-8h-26z" fill="#8a7355"/>` +
          `<rect x="${x + 5}" y="99" width="8" height="10" fill="#4a4238"/>` +
          `<rect x="${x + 18}" y="99" width="8" height="10" fill="#4a4238"/>`,
      )
      .join("")}</g>` +
    // 砂に埋まる線路(手前)。**途中から消える。**
    ground(150, "#d0b981") +
    track(178, 0, 252) +
    sandDrift(210, 182, 120, 12, "#e4d4a4") +
    sandDrift(300, 184, 90, 9, "#dcc896") +
    sandDrift(-20, 186, 100, 10, "#e4d4a4") +
    // 打ち捨てられた鉱車と風車ポンプ
    `<rect x="60" y="158" width="30" height="14" fill="#7a5a42"/>` +
    `<g fill="#4a3f34"><circle cx="67" cy="174" r="3.4"/><circle cx="83" cy="174" r="3.4"/></g>` +
    sandDrift(52, 176, 46, 6, "#e4d4a4") +
    `<g stroke="#8a7a62" stroke-width="2.4" fill="none"><path d="M340,150V96M330,150h20"/></g>` +
    `<g stroke="#9a8a72" stroke-width="2" fill="none"><path d="M340,96l-9,-7M340,96l11,-4M340,96l-4,11M340,96l7,9"/></g>` +
    shade(75, 174, 22, 3.4, ".14") +
    gull(196, 40, 0.9),

  /**
   * いまも人が住むオフィシナ(マリア・エレナ)。
   * saltpeterghost と同じ土地で、**煙と洗濯物だけが違う。**最後の一つ。
   */
  livingoficina:
    sky("#a8cce0", "#e8d8b0", 100) +
    sun(58, 26, 12, "#f5d34c") +
    band(92, 8, "#d0ba8a") +
    ground(100, "#d8bc88") +
    // 稼働する工場(右)。**煙が出ている。**
    `<rect x="300" y="44" width="92" height="70" fill="#9a9284"/>` +
    `<rect x="300" y="44" width="92" height="5" fill="#7f776a"/>` +
    `<g fill="#5f7f96"><rect x="310" y="58" width="12" height="15"/><rect x="330" y="58" width="12" height="15"/><rect x="350" y="58" width="12" height="15"/><rect x="370" y="58" width="12" height="15"/></g>` +
    chimney(316, 44, 12, 26, true, "#8a7f70") +
    `<path d="M292,114h108v4H292z" fill="#7f776a"/>` +
    // 碁盤目の社宅(左)。同じ形の家が並ぶ。
    `<g>${[6, 44, 82, 120]
      .map(
        (x, i) =>
          `<rect x="${x}" y="86" width="32" height="28" fill="#e0cfa0"/>` +
          `<path d="M${x - 3},86h38l-5,-8h-28z" fill="${i % 2 ? "#b04a3a" : "#8a6f4a"}"/>` +
          `<rect x="${x + 5}" y="94" width="8" height="9" fill="#4a6274"/>` +
          `<rect x="${x + 19}" y="94" width="8" height="9" fill="#4a6274"/>`,
      )
      .join("")}</g>` +
    // 広場と給水塔
    `<g stroke="#6b5f4c" stroke-width="2.6" fill="none"><path d="M204,100V64M192,100h24"/></g>` +
    `<rect x="192" y="52" width="24" height="14" rx="3" fill="#8a7a62"/>` +
    // 手前の通りと暮らし
    ground(148, "#cbb178") +
    `<path d="M0,148h400v6H0z" fill="#b89a68"/>` +
    laundry(28, 96, 168) +
    laundry(260, 330, 174, ["#f5b31c", "#f2f4f6", "#4f9a5f"]) +
    person(140, 196, 22, "#e8443f") +
    arm(138, 182, -10, 6) +
    person(348, 200, 23, "#5b8fe8") +
    arm(350, 186, 11, 4) +
    person(370, 198, 21, "#f5b31c") +
    shade(140, 196, 10, 2.4, ".16") +
    shade(352, 199, 13, 2.6, ".16") +
    `<g fill="#5f7f4a"><ellipse cx="228" cy="192" rx="10" ry="5"/><rect x="226.6" y="192" width="2.8" height="8" fill="#6b5340"/></g>` +
    cactus(310, 200, 16),

  /**
   * 露天掘りの銅山の縁(カラマ・チュキカマタ)。
   * 段(ベンチ)が渦を巻いて下りる穴と、縁に沿う町。**穴が町より大きい。**
   */
  openpitcopper:
    sky("#b0ccd8", "#e0d0a8", 92) +
    cordillera(92, 40, "#8a7a86", 0.6) +
    ground(92, "#c2a06a") +
    // 巨大な穴(右手前)。
    pitBenches(320, 130, 4, 170, 40) +
    `<g stroke="#6b5340" stroke-width="2" opacity=".7" fill="none">` +
    `<path d="M180,132q60,-16 140,-8M200,146q52,-12 118,-6"/></g>` +
    // ダンプトラック(豆粒に見える大きさ対比)
    `<g fill="#f5b31c"><rect x="352" y="128" width="12" height="6"/><rect x="356" y="124" width="6" height="4"/></g>` +
    `<g fill="#33302c"><circle cx="355" cy="135" r="2"/><circle cx="361" cy="135" r="2"/></g>` +
    `<g fill="#f5b31c"><rect x="284" y="150" width="10" height="5"/></g>` +
    // 鉱山の町(左)。
    flatHouse(4, 100, 40, 128, "#e0cfa0") +
    flatHouse(50, 104, 36, 128, "#d8c294") +
    flatHouse(92, 100, 40, 128, "#e8d8b0") +
    `<path d="M0,128h140v4H0z" fill="#a8895c"/>` +
    headframe(120, 100, 26, "#5f5548") +
    // 精鉱を積んだ貨車が穴から町へ
    ground(162, "#b89a68") +
    track(186, 0, 400) +
    `<g>${[36, 84, 132]
      .map(
        (x) =>
          `<rect x="${x}" y="170" width="38" height="13" fill="#6b5a4a"/>` +
          `<path d="M${x + 3},170q16,-7 32,0z" fill="#b87333"/>` +
          `<circle cx="${x + 9}" cy="185" r="3" fill="#33302c"/><circle cx="${x + 29}" cy="185" r="3" fill="#33302c"/>`,
      )
      .join("")}</g>` +
    shade(55, 184, 20, 3, ".14") +
    plume(360, 148, 20, 0.7, "#c8b89a", ".5") +
    condor(196, 36, 1),

  /**
   * 19世紀の鉱業と鉄道でできた町(コピアポ・カルデラ)。
   * 1851年、南米で最初期の鉄道がこの二つの町を結んだ。教会と駅と乾いた丘。
   */
  miningcolonial:
    sky("#a8cce0", "#ecd9ae", 98) +
    sun(344, 30, 12, "#f5d34c") +
    dryHills(98, "#b8925f", 4) +
    ground(98, "#d0b47e") +
    // 教会(左)。木造の塔。
    `<rect x="22" y="74" width="52" height="46" fill="#efe2c6"/>` +
    `<path d="M16,74h64l-7,-10H23z" fill="#a86a48"/>` +
    `<rect x="36" y="42" width="22" height="34" fill="#f2ecdc"/>` +
    `<path d="M33,42L47,26l14,16z" fill="#a86a48"/>` +
    `<path d="M47,20v6M44,23h6" stroke="#8a6f4a" stroke-width="1.8" fill="none"/>` +
    `<g fill="#5f7f96"><rect x="30" y="86" width="9" height="13"/><rect x="56" y="86" width="9" height="13"/><rect x="43" y="52" width="7" height="9"/></g>` +
    `<path d="M42,120v-16a5,5 0 0 1 10,0v16z" fill="#5a4630"/>` +
    // 木造の駅舎(右)
    `<rect x="292" y="84" width="76" height="36" fill="#c8a13f"/>` +
    `<path d="M284,84h92l-9,-13h-74z" fill="#8a6f2c"/>` +
    `<rect x="300" y="94" width="10" height="12" fill="#4a6274"/>` +
    `<rect x="322" y="94" width="10" height="12" fill="#4a6274"/>` +
    `<rect x="346" y="94" width="12" height="26" fill="#5a4630"/>` +
    `<circle cx="330" cy="78" r="4" fill="#f2f4f6"/>` +
    `<path d="M330,76v2.6M330,78l1.8,1" stroke="#33302c" stroke-width="0.8" fill="none"/>` +
    // 駅前の線路と古い蒸気機関車
    ground(146, "#c2a06a") +
    track(176, 0, 400) +
    `<g>` +
    `<rect x="250" y="146" width="44" height="22" rx="3" fill="#3f4a56"/>` +
    `<rect x="284" y="138" width="14" height="30" fill="#33302c"/>` +
    `<rect x="256" y="138" width="10" height="10" fill="#33302c"/>` +
    plume(261, 138, 18, 0.6, "#d8d2c4", ".7") +
    `<g fill="#2a2622"><circle cx="260" cy="170" r="5"/><circle cx="276" cy="170" r="5"/><circle cx="290" cy="170" r="4"/></g>` +
    `<g fill="#8a8f92"><circle cx="260" cy="170" r="1.8"/><circle cx="276" cy="170" r="1.8"/></g>` +
    `</g>` +
    shade(272, 176, 26, 3.4, ".18") +
    // 荷を待つ人と木箱
    crate(96, 174, 18, 13) +
    crate(118, 174, 14, 10, "#a8823f") +
    barrel(142, 174, 0.9) +
    person(70, 176, 22, "#5b8fe8") +
    arm(72, 162, 10, 5) +
    shade(70, 176, 10, 2.4, ".16") +
    cactus(180, 202, 18) +
    gull(120, 40, 0.9),

  /**
   * 鉱滓が埋めた湾(チャニャラル)。
   * 上流の銅山が川に流した尾鉱が、湾をまるごと灰色の浜に変えた。
   * **色が違うことが主役。**海の青と、鉱滓の灰色の境目を見せる。
   */
  coastalpollution:
    sky("#b0c4cc", "#d8d4c4", 90) +
    clouds(90, 30, 0.9, "#e4e0d4", ".7") +
    clouds(310, 24, 0.7, "#dcd8c8", ".6") +
    dryHills(90, "#a8865a", 3) +
    dryHills(96, "#b8925f", 4) +
    ground(90, "#b89a68") +
    sea(112, "#2f6f8f", "#3f86a0", "#57a0b0") +
    swell(126) +
    swell(118, "#8fc4d8", ".4") +
    // 灰色の鉱滓の浜が海へ張り出す
    `<path d="M0,142q90,-14 190,-6q110,8 210,-8v82H0z" fill="#9a9a92"/>` +
    `<path d="M0,142q90,-14 190,-6q110,8 210,-8v6q-100,14 -210,7q-100,-7 -190,7z" fill="#b0b0a8"/>` +
    `<g stroke="#7f7f78" stroke-width="2" opacity=".7" fill="none">` +
    `<path d="M20,168q60,-8 120,-4M240,164q70,-6 140,-9M60,188q80,-8 160,-4"/></g>` +
    // 死んだ桟橋の杭
    ruinedPiles([48, 66, 84, 102], 140, 15) +
    // 上流の鉱山の名残:錆びたドラム缶とパイプ
    `<g fill="#8a4a30"><rect x="352" y="176" width="10" height="14" rx="1.4"/><rect x="366" y="178" width="10" height="12" rx="1.4"/></g>` +
    `<g stroke="#5f4c33" stroke-width="1" opacity=".6" fill="none"><path d="M352,181h10M366,183h10"/></g>` +
    `<path d="M330,200q26,-6 60,-4" stroke="#7a6a56" stroke-width="3.4" fill="none"/>` +
    shade(360, 191, 16, 2.6, ".14") +
    // 川筋を下ってきた灰色の帯(右)
    `<path d="M400,90l-52,52q-10,10 -6,22l6,18l52,-6z" fill="#a8a89e"/>` +
    // 立ち入りを注意する旗と観測の人
    `<path d="M300,186v-26" stroke="#8a8f92" stroke-width="2.4" fill="none"/>` +
    `<path d="M300,160h16l-4,5l4,5h-16z" fill="#e8443f"/>` +
    person(322, 192, 22, "#f5b31c") +
    arm(320, 178, -9, 6) +
    shade(322, 192, 10, 2.4, ".16") +
    // 使われなくなった小船が浜に置き去り
    `<path d="M130,186q18,9 36,0q-18,-4 -36,0z" fill="#8a6b4a" transform="rotate(-6 148 186)"/>` +
    shade(148, 190, 20, 3, ".14") +
    gull(230, 50, 1) +
    gull(252, 42, 0.8),

  /**
   * 双子の港町と澄んだ夜空(ラ・セレナ・コキンボ)。
   * 世界の大望遠鏡がこの後背の山に集まる。**空が主役の一枚。**
   */
  astronomyvalley:
    sky("#1f2a4a", "#3f4a6a", 86) +
    stars(18, 66) +
    `<circle cx="330" cy="24" r="9" fill="#e8ecf4"/>` +
    `<circle cx="326" cy="21" r="2" fill="#c8ccd8" opacity=".7"/>` +
    // 尾根の上の天文台ドーム(左)
    `<path d="M0,86q60,-18 130,-10q80,8 270,-2v14H0z" fill="#3a3450"/>` +
    dome(56, 74, 13) +
    dome(92, 78, 9) +
    dome(30, 80, 7) +
    ground(88, "#4a4260") +
    // ネオコロニアルのアーケード(右)。窓に灯り。
    `<rect x="270" y="96" width="122" height="42" fill="#8a7a6a"/>` +
    `<path d="M264,96h134l-9,-11H274z" fill="#6b5a4c"/>` +
    `<g fill="#f5d34c">${[280, 302, 324, 346, 368]
      .map((x) => `<path d="M${x},112v-8a6,6 0 0 1 12,0v8z"/>`)
      .join("")}</g>` +
    `<rect x="270" y="136" width="122" height="4" fill="#5f5244"/>` +
    // 湾を挟んで向き合う二つの町の灯り
    sea(140, "#1a3a56", "#24506b", "#2f6480") +
    `<g fill="#f5d34c" opacity=".9">${[16, 34, 52, 70, 88, 106]
      .map((x) => `<rect x="${x}" y="${146 + (x % 3) * 4}" width="4" height="3"/>`)
      .join("")}</g>` +
    `<g fill="#f5b31c" opacity=".8">${[300, 320, 340, 360, 380]
      .map((x) => `<rect x="${x}" y="${168 + (x % 4) * 3}" width="4" height="3"/>`)
      .join("")}</g>` +
    `<path d="M0,140h128v4H0z" fill="#3a3450"/>` +
    // 十字架の丘の影(コキンボ側)
    `<path d="M108,140v-22M100,126h16" stroke="#5f5a72" stroke-width="3" fill="none"/>` +
    swell(166, "#4a6a8a", ".5") +
    lancha(210, 196, 0.9, "#3f6f9a") +
    `<path d="M210,190h2v-30" stroke="#f5d34c" stroke-width="1" opacity=".5" fill="none"/>`,

  /**
   * 灌漑されたブドウの渓谷(ビクーニャ・オバジェ・イジャペル)。
   * 裸の山と、水路が通った緑の谷底。**緑と乾きの境目が一本の線。**
   */
  elquivalley:
    sky("#8fc4e8", "#e8d8b0", 88) +
    sun(60, 28, 12, "#f5d34c") +
    cordillera(88, 44, "#a8865a", 0.85) +
    ground(88, "#b8925f") +
    // 谷底の緑の帯
    `<path d="M0,120q100,-10 200,-4q100,6 200,-8v102H0z" fill="#6b9a4a"/>` +
    vineRows(132, 196, 6) +
    // 灌漑水路
    `<path d="M0,126q100,-8 200,-3q100,5 200,-7v7q-100,10 -200,5q-100,-5 -200,3z" fill="#5b8fe8" opacity=".85"/>` +
    // 日干しレンガの農家(左)とピスコの蒸留小屋(右)
    `<rect x="14" y="98" width="44" height="28" fill="#d8b888"/>` +
    `<path d="M8,98h56l-7,-10H16z" fill="#a86a48"/>` +
    `<rect x="24" y="106" width="9" height="11" fill="#4a6274"/>` +
    `<rect x="42" y="106" width="10" height="20" fill="#5a4630"/>` +
    `<rect x="330" y="102" width="52" height="26" fill="#e0cfa0"/>` +
    `<path d="M324,102h64l-8,-10h-48z" fill="#8a6f4a"/>` +
    `<rect x="342" y="110" width="9" height="10" fill="#4a6274"/>` +
    barrel(368, 128, 0.8) +
    barrel(356, 128, 0.7) +
    // 収穫の人と籠
    person(84, 190, 23, "#e8443f") +
    arm(86, 176, 11, 5) +
    `<path d="M98,186q7,6 14,0v8h-14z" fill="#b08a4f"/>` +
    `<g fill="#6b3f7a"><circle cx="103" cy="186" r="2.4"/><circle cx="108" cy="185" r="2.2"/></g>` +
    person(330, 186, 22, "#5b8fe8") +
    arm(328, 172, -10, 6) +
    shade(84, 190, 10, 2.4, ".16") +
    shade(330, 186, 10, 2.4, ".16") +
    cactus(126, 116, 14) +
    cactus(286, 112, 12) +
    condor(320, 36, 0.9),

  /**
   * 盆地の首都(サンティアゴ)。
   * スモッグの帯の上にアンデスの雪の峰だけが浮かび、麓は見えない。
   */
  andessmog:
    sky("#a8c4d8", "#c2beb0", 118) +
    cordillera(96, 52, "#8a8096", 0.5) +
    // スモッグの帯。**山の麓を消す。**
    band(84, 34, "#c2b8a4") +
    `<g fill="#b8ae9a" opacity=".8"><ellipse cx="90" cy="92" rx="120" ry="10"/><ellipse cx="300" cy="100" rx="140" ry="12"/></g>` +
    ground(118, "#9a948a") +
    // 高層ビル群(左)と旧市街の低い建物(右)
    `<g>${[[10, 60, 26, "#7f8a96"], [42, 46, 24, "#8a95a0"], [72, 70, 28, "#6b7784"], [106, 52, 22, "#7f8a96"]]
      .map(
        ([x, h, w, c]) =>
          `<rect x="${x}" y="${118 - h}" width="${w}" height="${h}" fill="${c}"/>` +
          `<g fill="#d8e4ec" opacity=".8">${[0, 1, 2]
            .map((i) => `<rect x="${x + 4}" y="${118 - h + 6 + i * 14}" width="${w - 8}" height="5"/>`)
            .join("")}</g>`,
      )
      .join("")}</g>` +
    `<rect x="130" y="46" width="18" height="72" fill="#8a95a0"/>` +
    `<rect x="134" y="38" width="10" height="8" fill="#7f8a96"/>` +
    `<rect x="272" y="98" width="120" height="20" fill="#b0a08a"/>` +
    `<g fill="#5f7f96">${[280, 300, 320, 340, 360, 378]
      .map((x) => `<rect x="${x}" y="103" width="8" height="10"/>`)
      .join("")}</g>` +
    `<path d="M266,98h132l-6,-8H274z" fill="#8a7a62"/>` +
    // 街路
    ground(156, "#8a8478") +
    `<path d="M0,156h400v5H0z" fill="#6b665c"/>` +
    // 地下鉄の入口と通勤の人波
    `<g stroke="#c8452f" stroke-width="3" fill="none"><path d="M330,196v-18q0,-8 9,-8h6"/></g>` +
    `<rect x="322" y="196" width="34" height="5" fill="#5f5a52"/>` +
    `<path d="M328,178l14,0l0,18" stroke="#8a8478" stroke-width="10" fill="none"/>` +
    person(40, 200, 22, "#e8443f") +
    person(66, 196, 21, "#5b8fe8") +
    arm(68, 183, 9, 5) +
    person(96, 202, 23, "#f5b31c") +
    person(288, 198, 22, "#4f9a5f") +
    arm(286, 184, -9, 6) +
    shade(40, 200, 10, 2.4, ".16") +
    shade(96, 202, 10, 2.4, ".16") +
    shade(288, 198, 10, 2.4, ".16") +
    // バス
    `<rect x="150" y="176" width="56" height="22" rx="3" fill="#efe8d4"/>` +
    `<rect x="150" y="176" width="56" height="8" fill="#c8452f"/>` +
    `<g fill="#4a6274"><rect x="156" y="186" width="10" height="8"/><rect x="170" y="186" width="10" height="8"/><rect x="184" y="186" width="10" height="8"/></g>` +
    `<g fill="#33302c"><circle cx="162" cy="200" r="4"/><circle cx="192" cy="200" r="4"/></g>`,

  /**
   * 丘の港と保養地(バルパライソ・ビニャ・デル・マール)。
   * 色とりどりの家が斜面に積み上がり、アセンソールの線が丘を登る。
   * **パナマ運河に主役を奪われた港。**クレーンは動くが、湾は静か。
   */
  hillport:
    sky("#8fc4e8", "#cfe4f0", 150) +
    clouds(300, 30, 0.9) +
    clouds(80, 22, 0.7) +
    // 左右の丘(セロ)に積み上がる家
    `<path d="M0,84q60,-26 130,-14v90H0z" fill="#8a7355"/>` +
    `<path d="M400,84q-70,-28 -150,-12v90h150z" fill="#7f6a4e"/>` +
    `<g>${[[6, 78, "#e8443f"], [40, 66, "#f5b31c"], [76, 58, "#4f9a5f"], [10, 104, "#5b8fe8"], [48, 94, "#efe2c6"], [88, 86, "#c86a9a"], [26, 128, "#4fb0a0"], [66, 120, "#e8884f"]]
      .map(
        ([x, y, c]) =>
          `<rect x="${x}" y="${y}" width="26" height="20" fill="${c}"/>` +
          `<path d="M${x - 2},${y}h30l-4,-7h-22z" fill="#5f4c33"/>` +
          `<rect x="${x + 9}" y="${y + 6}" width="8" height="8" fill="#33424e"/>`,
      )
      .join("")}</g>` +
    `<g>${[[368, 74, "#f5b31c"], [330, 64, "#4f9a5f"], [292, 76, "#e8443f"], [362, 102, "#5b8fe8"], [322, 94, "#e8884f"], [286, 106, "#efe2c6"], [346, 128, "#c86a9a"], [304, 132, "#4fb0a0"]]
      .map(
        ([x, y, c]) =>
          `<rect x="${x}" y="${y}" width="26" height="20" fill="${c}"/>` +
          `<path d="M${x - 2},${y}h30l-4,-7h-22z" fill="#5f4c33"/>` +
          `<rect x="${x + 9}" y="${y + 6}" width="8" height="8" fill="#33424e"/>`,
      )
      .join("")}</g>` +
    // アセンソールの軌道(左の丘)
    `<path d="M108,160L52,60" stroke="#5f5548" stroke-width="4" fill="none"/>` +
    `<path d="M100,146l-10,-6l8,-4z" fill="#8a4a30"/>` +
    `<rect x="76" y="98" width="13" height="11" fill="#c8a13f" transform="rotate(28 82 103)"/>` +
    // 湾
    sea(150, "#1f5f8f", "#2f7fa8", "#4aa8c0") +
    swell(168) +
    jetty(150, 260, 158, 176) +
    gantry(178, 158, 0.8, "#8a6f4a") +
    lancha(300, 192, 1, "#c8452f") +
    lancha(120, 200, 0.9, "#3f6f9a") +
    `<path d="M228,150q4,-10 12,-12" stroke="#8a8f92" stroke-width="2" fill="none"/>` +
    gull(200, 44, 1) +
    gull(224, 36, 0.8) +
    gull(180, 56, 0.7),

  /**
   * アンデス山中の鉱山町(ランカグア・セウェル)。
   * 車の道が無く、**中央階段**に沿って色分けされた寮が積み上がる。
   */
  miningandes:
    sky("#9fb8cc", "#d8dce0", 88) +
    cordillera(88, 46, "#6b6274", 0.45) +
    ground(88, "#7f7568") +
    `<path d="M0,88L130,210H0z" fill="#6b6156"/>` +
    `<path d="M400,88L270,210h130z" fill="#5f564c"/>` +
    // 中央階段(木の色)。**この町の目抜き通り。**
    `<path d="M186,210L200,88h6L220,210z" fill="#a8895c"/>` +
    `<g stroke="#8a6f44" stroke-width="1.6" opacity=".8" fill="none">${[100, 112, 124, 136, 148, 160, 172, 184, 196]
      .map((y) => `<path d="M${r1(193 - (y - 100) * 0.1)},${y}h${r1(16 + (y - 100) * 0.22)}"/>`)
      .join("")}</g>` +
    // 段状に建つ色分けの寮(左右)
    `<g>${[[118, 96, "#c8452f"], [86, 118, "#f5b31c"], [120, 140, "#4f9a5f"], [76, 162, "#5b8fe8"], [116, 182, "#c86a9a"]]
      .map(
        ([x, y, c]) =>
          `<rect x="${x}" y="${y}" width="42" height="22" fill="${c}"/>` +
          `<rect x="${x}" y="${y}" width="42" height="4" fill="#00000033"/>` +
          `<g fill="#e8ecf0"><rect x="${x + 6}" y="${y + 8}" width="7" height="8"/><rect x="${x + 18}" y="${y + 8}" width="7" height="8"/><rect x="${x + 30}" y="${y + 8}" width="7" height="8"/></g>`,
      )
      .join("")}</g>` +
    `<g>${[[244, 100, "#4f9a5f"], [258, 124, "#e8884f"], [240, 148, "#5b8fe8"], [262, 172, "#c8452f"], [242, 192, "#f5b31c"]]
      .map(
        ([x, y, c]) =>
          `<rect x="${x}" y="${y}" width="42" height="22" fill="${c}"/>` +
          `<rect x="${x}" y="${y}" width="42" height="4" fill="#00000033"/>` +
          `<g fill="#e8ecf0"><rect x="${x + 6}" y="${y + 8}" width="7" height="8"/><rect x="${x + 18}" y="${y + 8}" width="7" height="8"/><rect x="${x + 30}" y="${y + 8}" width="7" height="8"/></g>`,
      )
      .join("")}</g>` +
    // 坑口(左上)と鉱車の索道
    `<path d="M20,112h34v22H20z" fill="#4a4238"/>` +
    `<path d="M20,112a17,14 0 0 1 34,0z" fill="#5f5548"/>` +
    `<path d="M37,110L180,60" stroke="#5f5548" stroke-width="1.6" fill="none"/>` +
    `<rect x="96" y="86" width="10" height="7" fill="#8a4a30"/>` +
    // 階段を登る人
    person(203, 172, 18, "#e8443f") +
    person(198, 132, 15, "#f5b31c") +
    // 残雪
    `<g fill="#e8ecf0" opacity=".85"><ellipse cx="30" cy="150" rx="16" ry="4"/><ellipse cx="352" cy="140" rx="14" ry="3.6"/><ellipse cx="60" cy="196" rx="18" ry="4.4"/><ellipse cx="340" cy="200" rx="16" ry="4"/></g>`,

  /**
   * 現代のコンテナ港(サン・アントニオ)。
   * バルパライソから王座を継いだ、チリでいちばん忙しい港。
   */
  portindustrial:
    sky("#9fb8c8", "#ccd4d8", 92) +
    clouds(70, 26, 0.9, "#e4e8ec", ".7") +
    islandFar(60, 92, 130, 20, "#5f7080") +
    sea(92, "#2f5f7f", "#3f7896", "#5290a8") +
    swell(112) +
    freighter(110, 148, 1.15) +
    // 埠頭(手前)
    `<path d="M0,158h400v52H0z" fill="#8a9298"/>` +
    `<path d="M0,158h400v5H0z" fill="#6b7278"/>` +
    gantry(268, 158, 1.15, "#c8452f") +
    gantry(348, 158, 1.15, "#c8452f") +
    containerStack(20, 208, 3, 4) +
    containerStack(110, 208, 2, 3) +
    containerStack(180, 206, 2, 2) +
    // トラックとシャーシ
    `<rect x="234" y="188" width="40" height="11" fill="#5f6874"/>` +
    `<rect x="236" y="180" width="30" height="9" fill="#4f9a5f"/>` +
    `<rect x="274" y="184" width="14" height="15" rx="2" fill="#3f6f9a"/>` +
    `<g fill="#33302c"><circle cx="244" cy="201" r="3.4"/><circle cx="262" cy="201" r="3.4"/><circle cx="282" cy="201" r="3.4"/></g>` +
    person(320, 202, 22, "#f5b31c") +
    arm(322, 188, 10, 4) +
    shade(320, 202, 10, 2.4, ".18") +
    gull(320, 50, 1) +
    gull(344, 42, 0.8) +
    gull(180, 60, 0.9),

  /**
   * 中央谷のワイン産地(サンタ・クルス・クリコ)。
   * ブドウ畑・ボデガ・ポプラ並木。奥にアンデス。収穫のかご。
   */
  winevalley:
    sky("#8fc4e8", "#e8e0c0", 90) +
    sun(56, 26, 12, "#f5d34c") +
    cordillera(90, 40, "#8a8096", 0.6) +
    ground(90, "#8faa5a") +
    vineRows(112, 200, 7) +
    // ボデガ(右)。土壁と瓦屋根。
    `<rect x="300" y="80" width="86" height="34" fill="#e8dcc0"/>` +
    `<path d="M292,80h100l-10,-14H304z" fill="#a86a48"/>` +
    `<g stroke="#c86a4a" stroke-width="2" opacity=".7" fill="none"><path d="M296,72h92M298,68h88"/></g>` +
    `<rect x="312" y="90" width="10" height="12" fill="#4a6274"/>` +
    `<rect x="352" y="88" width="16" height="26" fill="#5a4630"/>` +
    barrel(320, 132, 1) +
    barrel(338, 132, 0.9) +
    // ポプラ並木(左)
    poplar(16, 116, 44) +
    poplar(36, 118, 52) +
    poplar(58, 116, 46) +
    poplar(80, 118, 50) +
    // 収穫
    person(120, 172, 22, "#e8443f") +
    arm(122, 158, 10, 6) +
    `<path d="M134,168q8,7 16,0v9h-16z" fill="#b08a4f"/>` +
    `<g fill="#6b3f7a"><circle cx="140" cy="168" r="2.6"/><circle cx="146" cy="167" r="2.4"/><circle cx="143" cy="164" r="2.2"/></g>` +
    person(300, 184, 23, "#5b8fe8") +
    arm(298, 170, -11, 6) +
    person(348, 190, 22, "#f5b31c") +
    shade(120, 172, 10, 2.4, ".16") +
    shade(300, 184, 10, 2.4, ".16") +
    shade(348, 190, 10, 2.4, ".16") +
    gull(190, 40, 0.8),

  /**
   * 幾度も建て直された町(コンセプシオン・タルカワノ・チジャン)。
   * 1939年・1960年・2010年。**新しい建物と足場が普通の景色になった町。**
   */
  quakerebuilt:
    sky("#a4c0d4", "#d8d8cc", 96) +
    clouds(320, 28, 0.9, "#e8e8dc", ".7") +
    `<path d="M0,96q80,-12 180,-8q120,4 220,-4v16H0z" fill="#6b7f6a"/>` +
    ground(100, "#9a9488") +
    // 建て直しずみの新しい建物(左)
    `<rect x="10" y="52" width="52" height="72" fill="#c8ccd0"/>` +
    `<g fill="#5f7f96">${[0, 1, 2, 3]
      .map((i) => `<rect x="18" y="${58 + i * 16}" width="14" height="8"/><rect x="40" y="${58 + i * 16}" width="14" height="8"/>`)
      .join("")}</g>` +
    `<rect x="68" y="76" width="40" height="48" fill="#e0d8c4"/>` +
    `<g fill="#5f7f96"><rect x="74" y="84" width="10" height="10"/><rect x="90" y="84" width="10" height="10"/><rect x="74" y="102" width="10" height="10"/><rect x="90" y="102" width="10" height="10"/></g>` +
    // 足場のかかった建設中の建物(右)。**壊れた絵ではなく、直している絵。**
    `<rect x="300" y="64" width="60" height="60" fill="#b8b4a8"/>` +
    `<g stroke="#8a6f44" stroke-width="2.4" fill="none">` +
    `<path d="M294,124V58M312,124V58M330,124V58M348,124V58M366,124V58"/>` +
    `<path d="M294,64h72M294,84h72M294,104h72"/></g>` +
    `<g fill="#4a5560"><rect x="308" y="72" width="10" height="10"/><rect x="326" y="72" width="10" height="10"/><rect x="308" y="94" width="10" height="10"/><rect x="326" y="94" width="10" height="10"/></g>` +
    // タワークレーン
    `<path d="M382,124V30M382,30h-58M330,30l-6,6M382,30l8,10" stroke="#c8452f" stroke-width="3" fill="none"/>` +
    `<path d="M340,30v16" stroke="#33302c" stroke-width="1.6" fill="none"/>` +
    `<rect x="336" y="46" width="9" height="7" fill="#5f6874"/>` +
    // 川と橋(ビオビオ)
    ground(150, "#5b86a8") +
    `<rect x="0" y="150" width="400" height="8" fill="#4a7290"/>` +
    `<path d="M0,168h400" stroke="#8a9298" stroke-width="5" fill="none"/>` +
    `<g fill="#6b7278">${[40, 110, 180, 250, 320]
      .map((x) => `<rect x="${x}" y="168" width="7" height="20"/>`)
      .join("")}</g>` +
    ground(190, "#8a8478") +
    // 通りの人
    person(140, 208, 22, "#f5b31c") +
    person(240, 206, 22, "#e8443f") +
    arm(242, 192, 10, 5) +
    shade(140, 208, 10, 2.4, ".16") +
    shade(240, 206, 10, 2.4, ".16") +
    swell(158, "#8fb8d0", ".5"),

  /**
   * 海に張り出す石炭の町(ロタ)。
   * 坑道は海の下へ8kmのびていた。1997年閉山。緑の岬と黒い浜。
   */
  coalcoast:
    sky("#9fb4c4", "#ccd0c8", 118) +
    clouds(90, 26, 0.9, "#dce0d8", ".7") +
    clouds(300, 40, 0.7, "#d4d8d0", ".6") +
    `<path d="M0,88q90,-24 180,-10q40,6 60,10v40H0z" fill="#4f7048"/>` +
    `<path d="M0,102q80,-14 170,-6v20H0z" fill="#5f8455"/>` +
    sea(118, "#2f5468", "#3f6a80", "#527f92") +
    whitecaps(134, 5) +
    // 岬の上の坑口とやぐら(左)
    headframe(70, 88, 34, "#4a4238") +
    `<path d="M52,88h36v-10H52z" fill="#5f5548"/>` +
    chimney(108, 88, 10, 34, false, "#7a6f60") +
    // 炭鉱住宅の列(岬の上)
    `<g>${[6, 26, 128]
      .map(
        (x) =>
          `<rect x="${x}" y="76" width="16" height="12" fill="#c2b494"/>` +
          `<path d="M${x - 2},76h20l-3,-6h-14z" fill="#8a4a30"/>` +
          `<rect x="${x + 5}" y="80" width="5" height="6" fill="#4a4238"/>`,
      )
      .join("")}</g>` +
    // 海へ下りるコンベヤの橋
    `<path d="M90,80L210,128" stroke="#5f5548" stroke-width="4" fill="none"/>` +
    `<g fill="#5f5548"><rect x="120" y="92" width="4" height="22"/><rect x="160" y="106" width="4" height="20"/></g>` +
    // 黒い砂の浜(手前)
    `<path d="M0,158q100,-12 210,-4q100,6 190,-6v62H0z" fill="#3f3c38"/>` +
    `<path d="M0,158q100,-12 210,-4q100,6 190,-6v6q-90,10 -190,5q-110,-7 -210,5z" fill="#57534c"/>` +
    // 置き去りの鉱車と石炭の山
    `<rect x="292" y="168" width="34" height="15" fill="#5f5548"/>` +
    `<path d="M295,168q16,-8 28,0z" fill="#2a2724"/>` +
    `<g fill="#33302c"><circle cx="300" cy="185" r="3.4"/><circle cx="318" cy="185" r="3.4"/></g>` +
    `<path d="M40,190q14,-14 30,0q-15,-4 -30,0z" fill="#2a2724"/>` +
    `<path d="M76,194q12,-12 26,0q-13,-4 -26,0z" fill="#33302c"/>` +
    // 浜で貝を採る人(閉山後の暮らし)
    person(180, 196, 22, "#5b8fe8") +
    arm(178, 184, -9, 8) +
    `<path d="M162,196q6,4 12,0v5h-12z" fill="#8a6b4a"/>` +
    shade(180, 196, 10, 2.4, ".2") +
    gull(240, 52, 1) +
    gull(262, 44, 0.8) +
    gull(130, 60, 0.9),

  /**
   * 鉄道が終わる海の玄関口(プエルト・モント)。
   * **車止めの先が海。**ここが「地理的な理由で止まった」ほうの絵。
   * 奥に雪の火山、湾には南へ向かうフェリー。
   */
  lakegateway:
    sky("#9fc0d8", "#d8e0dc", 92) +
    clouds(90, 30, 1, "#e8ece4", ".8") +
    volcanoCone(330, 92, 56, 96, "#5f6874", 0.55) +
    sea(92, "#2f5f7f", "#3f7896", "#5290a8") +
    swell(112) +
    // 南へ向かうフェリー
    `<path d="M290,140h76l-7,10h-62z" fill="#3f6f9a"/>` +
    `<rect x="304" y="128" width="44" height="12" fill="#e8e4d8"/>` +
    `<g fill="#3f4a56"><rect x="308" y="131" width="6" height="5"/><rect x="318" y="131" width="6" height="5"/><rect x="328" y="131" width="6" height="5"/><rect x="338" y="131" width="6" height="5"/></g>` +
    `<rect x="338" y="120" width="7" height="8" fill="#c8452f"/>` +
    // 木羽根の家並み(左)
    `<path d="M0,120h150v10H0z" fill="#6b7f6a"/>` +
    germanHouse(6, 122, 36, 42, "#e8dcc0", "#7a4a3a") +
    germanHouse(48, 124, 32, 38, "#d8c8a8", "#5f4632") +
    germanHouse(86, 122, 36, 40, "#e0d0b0", "#8a5a3a") +
    // 市場の屋根と魚の箱(アンヘルモ)
    `<rect x="126" y="108" width="34" height="14" fill="#c8452f"/>` +
    `<g fill="#5a4630"><rect x="130" y="122" width="4" height="8"/><rect x="152" y="122" width="4" height="8"/></g>` +
    // 岸壁と、**線路の終わり**
    ground(152, "#8a8478") +
    `<path d="M0,152h400v5H0z" fill="#6b665c"/>` +
    track(184, 0, 236) +
    bufferStop(248, 186) +
    shade(248, 190, 14, 3, ".18") +
    // 車止めの先はもう海への斜路
    `<path d="M262,182q70,4 138,14v14H262z" fill="#57534c"/>` +
    lancha(180, 132, 0.9, "#c8a13f") +
    lancha(60, 142, 0.8, "#c8452f") +
    person(300, 204, 22, "#f5b31c") +
    arm(302, 190, 10, -6) +
    person(120, 200, 22, "#e8443f") +
    shade(300, 204, 10, 2.4, ".16") +
    shade(120, 200, 10, 2.4, ".16") +
    gull(200, 46, 1) +
    gull(224, 38, 0.8),

  /**
   * アラウカニアの平原の砦の町(テムコ・アンゴル)。
   * 「平定」の前線として建てられた町。**砦と、始まったばかりの線路と、
   * アラウカリアの木**で語る。人の顔では語らない。
   */
  araucaniaplain:
    sky("#a4c4d8", "#dce4d4", 96) +
    clouds(310, 28, 0.9, "#e8ece0", ".8") +
    volcanoCone(60, 96, 48, 84, "#6b7280", 0.5) +
    `<path d="M0,96h400v8H0z" fill="#6b8a5a"/>` +
    ground(96, "#7f9a5f") +
    // 木の柵の砦(右)
    `<g fill="#8a6f44">${[300, 308, 316, 324, 332, 340, 348, 356, 364, 372]
      .map((x, i) => `<path d="M${x},124v-${26 + (i % 2) * 3}l4,-5l4,5v${26 + (i % 2) * 3}z"/>`)
      .join("")}</g>` +
    `<rect x="296" y="118" width="88" height="4" fill="#6b5330"/>` +
    `<rect x="330" y="76" width="22" height="18" fill="#a8895c"/>` +
    `<path d="M326,76h30l-4,-8h-22z" fill="#6b5330"/>` +
    // アラウカリアの木(左)
    araucaria(30, 118, 52) +
    araucaria(74, 122, 40) +
    araucaria(112, 118, 30) +
    // 麦畑の帯
    `<path d="M0,130h400v18H0z" fill="#c8b45f"/>` +
    `<g stroke="#b8a44f" stroke-width="2" opacity=".8" fill="none">${[20, 60, 100, 140, 180, 220, 260, 300, 340, 380]
      .map((x) => `<path d="M${x},148v-14"/>`)
      .join("")}</g>` +
    ground(148, "#8a9a58") +
    // 始まったばかりの単線
    track(180, 0, 400) +
    // 荷馬車
    `<rect x="80" y="160" width="34" height="12" fill="#8a6f44"/>` +
    `<g fill="#4a3f34"><circle cx="88" cy="174" r="4.4"/><circle cx="106" cy="174" r="4.4"/></g>` +
    `<path d="M114,164h14l6,4" stroke="#6b5330" stroke-width="2" fill="none"/>` +
    `<path d="M132,158q6,0 8,6l-2,6q-6,0 -8,-4z" fill="#5a4630"/>` +
    `<path d="M138,158l3,-5l2,5z" fill="#5a4630"/>` +
    shade(97, 174, 22, 3.4, ".16") +
    person(160, 204, 23, "#5b8fe8") +
    arm(162, 190, 10, 5) +
    shade(160, 204, 10, 2.4, ".16") +
    condor(340, 40, 0.9),

  /**
   * 火山を望む湖畔の町(ビジャリカ)。
   * 夜、山頂だけが赤く光る。**世界でも数少ない、火口に溶岩湖を持つ山。**
   */
  volcanolake:
    sky("#2a3450", "#4a5470", 88) +
    stars(12, 50) +
    volcanoCone(300, 88, 62, 110, "#3f4658", 0.5) +
    // 山頂の赤い光と噴気
    `<circle cx="300" cy="26" r="7" fill="#e8443f" opacity=".8"/>` +
    `<circle cx="300" cy="26" r="3.4" fill="#f5b31c"/>` +
    plume(300, 24, 18, 0.6, "#5f5468", ".8") +
    `<path d="M295,30q5,-6 10,0" stroke="#e8884f" stroke-width="2" opacity=".8" fill="none"/>` +
    // 湖
    sea(88, "#1a2e46", "#243c56", "#2f4a66") +
    // 湖面に映る赤
    `<path d="M296,96q4,20 0,44M304,98q-3,18 0,40" stroke="#c8452f" stroke-width="2.4" opacity=".55" fill="none"/>` +
    `<path d="M300,142q2,10 0,22" stroke="#f5b31c" stroke-width="1.6" opacity=".4" fill="none"/>` +
    swell(120, "#3f5a76", ".6") +
    // 湖畔の町の灯り(左)
    `<path d="M0,130q80,-8 170,-4v84H0z" fill="#2a3038"/>` +
    `<g>${[[10, 118, "#4a4238"], [46, 122, "#3f4658"], [84, 118, "#4a4238"], [122, 124, "#3f4658"]]
      .map(
        ([x, y, c]) =>
          `<rect x="${x}" y="${y}" width="30" height="22" fill="${c}"/>` +
          `<path d="M${x - 3},${y}h36l-5,-9h-26z" fill="#33302c"/>` +
          `<rect x="${x + 6}" y="${y + 7}" width="8" height="9" fill="#f5d34c"/>` +
          `<rect x="${x + 18}" y="${y + 7}" width="8" height="9" fill="#f5b31c"/>`,
      )
      .join("")}</g>` +
    // 桟橋とカヤック
    jetty(60, 160, 152, 172) +
    `<path d="M190,180q14,6 28,0q-14,-3 -28,0z" fill="#c8452f"/>` +
    `<path d="M186,178l8,1M226,178l-8,1" stroke="#8a8f92" stroke-width="1.6" fill="none"/>` +
    // 見上げる二人
    person(96, 206, 22, "#f5b31c") +
    arm(98, 192, 9, -7) +
    person(120, 204, 21, "#e8443f") +
    shade(96, 206, 10, 2.4, ".2") +
    shade(120, 204, 10, 2.4, ".2"),

  /**
   * ドイツ系入植の湖水地方(バルディビア・オソルノ・プエルト・バラス・フルティジャル)。
   * 急勾配の屋根・木羽根の壁・バラの庭。湖と雨雲。
   */
  germanlakedistrict:
    sky("#9fc0d0", "#d8e4dc", 90) +
    clouds(80, 24, 1.1, "#c8d4d0", ".9") +
    clouds(210, 34, 0.8, "#d8e0da", ".8") +
    volcanoCone(340, 90, 50, 86, "#6b7280", 0.55) +
    sea(90, "#3f7086", "#4f86a0", "#639ab0") +
    swell(110) +
    // 湖畔の並木と岸
    `<path d="M0,128q100,-8 200,-4q110,4 200,-6v92H0z" fill="#5f8455"/>` +
    // 木羽根の家(左右に2軒ずつ)
    germanHouse(10, 136, 44, 52, "#e8dcc0", "#7a4a3a") +
    germanHouse(62, 140, 38, 46, "#d8c8a8", "#5f4632") +
    germanHouse(296, 138, 42, 50, "#e0d0b0", "#8a5a3a") +
    germanHouse(346, 142, 40, 46, "#e8dcc0", "#6b4a36") +
    // バラの庭
    `<g fill="#3f7048"><ellipse cx="34" cy="146" rx="16" ry="6"/><ellipse cx="320" cy="148" rx="17" ry="6"/></g>` +
    `<g fill="#e8443f"><circle cx="26" cy="143" r="2.2"/><circle cx="38" cy="141" r="2"/><circle cx="46" cy="144" r="1.8"/></g>` +
    `<g fill="#e88ab0"><circle cx="312" cy="145" r="2.2"/><circle cx="326" cy="143" r="2"/><circle cx="334" cy="147" r="1.8"/></g>` +
    // 庭先の道と自転車
    ground(158, "#8a9a68") +
    `<path d="M0,168q100,-6 200,-2q110,4 200,-6v10q-90,8 -200,4q-100,-4 -200,4z" fill="#b0a486"/>` +
    `<g stroke="#4a4238" stroke-width="2" fill="none"><circle cx="150" cy="196" r="7"/><circle cx="172" cy="196" r="7"/><path d="M150,196l8,-12h8l6,12M158,184h-6"/></g>` +
    // 桟橋と手漕ぎボート
    jetty(220, 290, 120, 128, "#7a6a52") +
    `<path d="M250,142q13,6 26,0q-13,-3 -26,0z" fill="#8a6b4a"/>` +
    person(236, 118, 19, "#5b8fe8") +
    arm(238, 106, 8, 5) +
    // 雨のカーテン(左遠く)
    `<g stroke="#8fa8b8" stroke-width="1.6" opacity=".6" fill="none"><path d="M40,44l-6,22M60,42l-6,22M80,46l-6,20M100,44l-6,22"/></g>` +
    gull(190, 52, 0.9) +
    gull(214, 44, 0.8),

  /**
   * チロエ島(アンクー・カストロ)。
   * 木造の教会と極彩色のパラフィト。**すべて板と木羽根でできた島。**
   */
  chiloebg:
    sky("#9fb8c8", "#d0d8d4", 88) +
    clouds(70, 26, 1, "#c8d0cc", ".9") +
    clouds(320, 34, 0.8, "#d8e0dc", ".8") +
    islandFar(330, 88, 150, 22, "#5f7568") +
    sea(88, "#2f5f74", "#3f7690", "#528aa0") +
    swell(108) +
    // 丘の上の木造教会(左)
    `<path d="M0,110q70,-16 150,-8v108H0z" fill="#5f8455"/>` +
    chiloeChurch(28, 108, 56, 64, "#c8a13f", "#8a6f2c") +
    tinHouse(96, 92, 34, 110, "#e0d0b0", "#4f6f8a") +
    // パラフィトの列(右手前)。**支柱が水に立つ。**
    ground(150, "#3f6a80") +
    `<rect x="0" y="150" width="400" height="8" fill="#35596b"/>` +
    palafito(240, 196, 38, 30, "#e8443f") +
    palafito(284, 198, 36, 28, "#f5b31c") +
    palafito(324, 196, 38, 30, "#4fb0a0") +
    palafito(366, 198, 34, 28, "#c86a9a") +
    // 手前の浜と舟
    `<path d="M0,168q60,-8 130,-4q40,2 70,8v38H0z" fill="#8a7a5f"/>` +
    lancha(70, 186, 1, "#c8452f") +
    `<path d="M120,196q12,7 26,0q-13,-3 -26,0z" fill="#6b5330"/>` +
    // 網の手入れをする人
    person(30, 202, 23, "#5b8fe8") +
    arm(32, 188, 12, 6) +
    `<path d="M44,194q10,4 20,2" stroke="#8a8f92" stroke-width="1.2" opacity=".8" fill="none"/>` +
    `<path d="M46,198q9,3 18,2" stroke="#8a8f92" stroke-width="1.2" opacity=".8" fill="none"/>` +
    shade(30, 202, 10, 2.4, ".18") +
    gull(180, 44, 1) +
    gull(204, 36, 0.8) +
    gull(156, 54, 0.7),

  /**
   * パタゴニアのステップ(コジャイケ・プエルト・アイセン・プエルト・エデン・
   * チレ・チコ・コクラン)。**道が途切れる開拓地。**風・柵・羊・レンズ雲。
   */
  patagoniasteppe:
    sky("#a8c4d4", "#e0dcc8", 96) +
    lenticular(34) +
    cordillera(96, 42, "#7a7a8a", 0.5) +
    ground(96, "#b0a068") +
    `<path d="M0,120q100,-8 200,-2q110,6 200,-8v100H0z" fill="#bfae74"/>` +
    // 風に曲がった木
    windTree(40, 118, 34, 16) +
    windTree(320, 122, 28, 13) +
    // 柵と羊
    fence(10, 150, 148) +
    fence(266, 396, 152) +
    sheepFlock(
      [
        [50, 0],
        [72, 6],
        [94, -2],
        [120, 8],
      ],
      164,
    ) +
    sheepFlock(
      [
        [300, 2],
        [326, -3],
        [352, 6],
      ],
      170,
    ) +
    // 砂利道が奥で途切れる
    `<path d="M170,210q6,-40 20,-64q8,-14 20,-22l-6,-2q-14,8 -24,26q-14,26 -18,62z" fill="#c8b894"/>` +
    `<path d="M204,122q8,-6 14,-8" stroke="#c8b894" stroke-width="3" stroke-dasharray="6 8" fill="none"/>` +
    // 開拓の小屋(右)とガウチョ
    tinHouse(340, 108, 36, 130, "#d8c8a8", "#8a4a30") +
    rider(260, 192, 1, "#8a4a30") +
    shade(260, 200, 20, 3.4, ".16") +
    // 草の株
    `<g stroke="#9a8f5a" stroke-width="1.8" fill="none" stroke-linecap="round">` +
    `<path d="M60,196q2,-8 6,-11M66,196q0,-8 2,-12M72,196q-2,-8 -5,-11M130,204q2,-8 6,-11M136,204q0,-8 2,-12M310,206q2,-7 5,-10M316,206q0,-8 2,-11"/></g>` +
    condor(120, 36, 1) +
    condor(150, 46, 0.7),

  /**
   * 氷河と国立公園の玄関口(プエルト・ナタレス・ビジャ・オイギンス)。
   * 角の立った峰・氷河の舌・乳白色の湖と浮氷。
   */
  glacierpark:
    sky("#9fbccc", "#d8e0dc", 92) +
    lenticular(30, "#e8ecf0", ".7") +
    // トーレスのような角の立った峰
    `<path d="M60,92L76,26l10,14l8,-22l12,26l8,-14l12,62z" fill="#6b6274"/>` +
    `<path d="M76,26l10,14l8,-22l12,26l-6,10l-10,-12l-8,14z" fill="#9a92a4"/>` +
    `<path d="M180,92l20,-40l16,18l12,-26l18,48z" fill="#7a7286"/>` +
    `<path d="M300,92l16,-30l14,14l10,-20l16,36z" fill="#6b6274"/>` +
    `<g fill="#f2f4f6"><path d="M200,52l8,8l-6,4l-8,-6z"/><path d="M316,62l6,6l-5,3l-6,-5z"/></g>` +
    glacierTongue(250, 52, 90, 40) +
    // 乳白色の湖
    sea(92, "#6ba8b8", "#7fb8c4", "#93c8d0") +
    iceberg(70, 116, 1.2) +
    iceberg(180, 128, 1) +
    iceberg(320, 120, 1.4) +
    iceberg(250, 140, 0.9) +
    swell(120, "#d8ecf0", ".6") +
    // モレーンの岸(手前)
    `<path d="M0,152q100,-10 210,-4q100,6 190,-8v70H0z" fill="#8a8272"/>` +
    `<path d="M0,152q100,-10 210,-4q100,6 190,-8v6q-90,12 -190,7q-110,-6 -210,5z" fill="#a09880"/>` +
    // 展望の桟橋と観光船
    jetty(40, 130, 160, 176, "#7a6a52") +
    `<path d="M130,138h54l-6,9h-44z" fill="#3f6f9a"/>` +
    `<rect x="140" y="128" width="30" height="10" fill="#e8e4d8"/>` +
    `<rect x="160" y="121" width="6" height="7" fill="#c8452f"/>` +
    // 岩の上の見張り小屋と人
    tinHouse(330, 160, 34, 186, "#d8c8a8", "#4f6f8a") +
    person(80, 158, 21, "#e8443f") +
    arm(82, 145, 9, -6) +
    person(304, 200, 22, "#f5b31c") +
    shade(304, 200, 10, 2.4, ".16") +
    condor(360, 40, 1),

  /**
   * マガジャネス海峡沿いの町(プンタ・アレナス・ポルベニル)。
   * 羊毛で栄えた海峡の町。**いつも風、いつも白波。**トタン屋根が色とりどり。
   */
  magallanesstrait:
    sky("#9fb4c8", "#ccd4d4", 84) +
    clouds(100, 24, 1.2, "#b8c4c8", ".9") +
    clouds(280, 32, 0.9, "#c8d0d4", ".8") +
    islandFar(340, 84, 170, 18, "#5f6b74") +
    sea(84, "#2f4f68", "#3f6480", "#527892") +
    whitecaps(100, 8) +
    whitecaps(126, 6) +
    freighter(90, 128, 0.85) +
    // 海峡へ下る町(手前)。色とりどりのトタン屋根。
    ground(146, "#8a8272") +
    `<path d="M0,146h400v5H0z" fill="#6b665c"/>` +
    `<g>${[[6, 156, "#c8452f"], [46, 160, "#3f6f9a"], [86, 156, "#4f9a5f"], [126, 162, "#f5b31c"], [270, 158, "#8a5a9a"], [310, 154, "#c8452f"], [350, 160, "#3f6f9a"]]
      .map(
        ([x, y, c]) =>
          `<rect x="${x}" y="${y}" width="34" height="24" fill="#e0d8c4"/>` +
          `<path d="M${x - 3},${y}h40l-6,-9h-28z" fill="${c}"/>` +
          `<rect x="${x + 6}" y="${y + 8}" width="8" height="9" fill="#4a6274"/>` +
          `<rect x="${x + 20}" y="${y + 8}" width="8" height="9" fill="#4a6274"/>`,
      )
      .join("")}</g>` +
    // 羊毛の倉庫(中央下・楕円の外)
    `<rect x="168" y="182" width="70" height="28" fill="#a86a48"/>` +
    `<rect x="168" y="182" width="70" height="5" fill="#7f4a30"/>` +
    `<rect x="196" y="192" width="16" height="18" fill="#5a4630"/>` +
    `<g fill="#e8e4d8"><ellipse cx="252" cy="202" rx="9" ry="7"/><ellipse cx="268" cy="204" rx="8" ry="6"/></g>` +
    `<path d="M244,202h16M260,204h16" stroke="#b0a88a" stroke-width="1.2" fill="none"/>` +
    // 風に傾く人と旗
    person(140, 204, 22, "#e8443f") +
    arm(138, 190, -11, 3) +
    shade(140, 204, 10, 2.4, ".18") +
    `<path d="M300,200v-28" stroke="#8a8f92" stroke-width="2.4" fill="none"/>` +
    `<path d="M300,172q12,4 20,0v9q-8,4 -20,0z" fill="#5b8fe8"/>` +
    gull(210, 40, 1) +
    gull(234, 32, 0.8) +
    gull(60, 52, 0.9),

  /**
   * 世界最南の集落(プエルト・ウィリアムズ)。
   * 歯のような峰・海峡・灯台・散らばる家。**この先にはもう町が無い。**
   */
  southernmost:
    sky("#8fa8c0", "#c8d4d8", 80) +
    clouds(240, 24, 1, "#b8c8d0", ".8") +
    // ディエンテス(歯)のような峰
    `<path d="M0,80l24,-38l14,20l16,-30l18,34l14,-16l18,30z" fill="#5f5a70"/>` +
    `<path d="M104,80l18,-26l12,14l14,-22l16,34z" fill="#6b6478"/>` +
    `<g fill="#e8ecf0"><path d="M24,42l8,10l-6,4l-7,-8z"/><path d="M72,36l7,12l-6,3l-6,-9z"/><path d="M148,46l6,9l-5,3l-5,-7z"/></g>` +
    sea(80, "#2f4a62", "#3f5f7a", "#52748c") +
    whitecaps(98, 6) +
    // 岬の灯台(右)
    `<path d="M320,124q30,-10 80,-8v94h-80z" fill="#6b7a62"/>` +
    lighthouse(366, 118, 40) +
    // 海軍の小さな巡視船
    `<path d="M60,122h58l-6,9h-46z" fill="#4a5a66"/>` +
    `<rect x="72" y="112" width="26" height="10" fill="#8a929c"/>` +
    `<rect x="88" y="105" width="5" height="7" fill="#33302c"/>` +
    // 散らばる家(手前)
    ground(140, "#7f8a62") +
    `<path d="M0,140h400v5H0z" fill="#5f6b4c"/>` +
    tinHouse(14, 158, 36, 182, "#e0d8c4", "#c8452f") +
    tinHouse(66, 164, 32, 186, "#d8ccb0", "#3f6f9a") +
    tinHouse(120, 158, 34, 182, "#e8dcc0", "#4f9a5f") +
    tinHouse(286, 162, 34, 186, "#e0d8c4", "#f5b31c") +
    // 薪の山と煙
    `<g fill="#6b5330"><rect x="252" y="196" width="22" height="5"/><rect x="255" y="191" width="16" height="5"/><rect x="258" y="186" width="10" height="5"/></g>` +
    plume(30, 158, 16, 0.5, "#c8ccd0", ".7") +
    // 風に立つ人と犬
    person(180, 204, 22, "#e8443f") +
    arm(178, 190, -10, 4) +
    shade(180, 204, 10, 2.4, ".18") +
    `<g fill="#5a4630"><ellipse cx="206" cy="202" rx="7" ry="3.4"/><circle cx="213" cy="198" r="2.4"/><rect x="200" y="202" width="2" height="5"/><rect x="210" y="202" width="2" height="5"/></g>` +
    gull(140, 60, 0.9) +
    gull(260, 50, 0.8),
};

// ---------------------------------------------------------------------------
// シンボル(24×24)
//
// **盤面では直径19pxほどの点にしかならない。**輪郭を優先し、主役は1つに絞る。
// 下端(y=24)が影の楕円に載るようにしておく。
//
// 似た題材が固まっているので、**先に描き分けを決めてある:**
//   「終わり」3種   bufferstop=線路+赤い車止め / roadsend=緑の標識+続く道 /
//                   roadend=赤白の柵+その先の氷
//   鉱山4種        coppertrain=橙の鉱石を積む貨車 / abandonedpit=段の渦 /
//                   tenienteshaft=山腹の坑口 / underseamine=海の下への断面
//   港・船4種      nitraterail=桟橋クレーン+白い袋 / containercranes=門形2基 /
//                   navalbase=灰色の軍艦 / riverport=泥に傾く杭
// ---------------------------------------------------------------------------

export const CHILE_MARKS = {
  /** 硝石鉄道の桟橋(アントファガスタ)。**袋が白いのは硝石だから。** */
  nitraterail:
    '<rect x="0" y="0" width="24" height="10" fill="#bfe0ee"/>' +
    '<rect x="0" y="10" width="24" height="14" fill="#3f92ae"/>' +
    '<path d="M1,21q5,-2 11,0q6,2 11,0" stroke="#bfe8f4" stroke-width="1" opacity=".7" fill="none"/>' +
    '<rect x="1" y="9" width="22" height="3" fill="#8a7454"/>' +
    '<g fill="#5f4c33"><rect x="3" y="12" width="2.2" height="10"/><rect x="11" y="12" width="2.2" height="10"/><rect x="19" y="12" width="2.2" height="10"/></g>' +
    '<path d="M4,9V2.6l10,2.8" stroke="#5f5548" stroke-width="1.8" fill="none"/>' +
    '<path d="M14,5.4v3" stroke="#33302c" stroke-width="1" fill="none"/>' +
    '<g fill="#efe8d8"><rect x="12.6" y="8.2" width="3.4" height="2.6" rx="1"/><rect x="7" y="5.6" width="4.4" height="3.4" rx="1.4"/><rect x="10.6" y="3" width="4.4" height="3.4" rx="1.4"/></g>' +
    '<rect x="16.6" y="5.8" width="6" height="3.4" fill="#6b5a4a"/>' +
    '<g fill="#efe8d8"><rect x="17.4" y="3.4" width="2.2" height="2.4" rx="0.8"/><rect x="20" y="3.4" width="2.2" height="2.4" rx="0.8"/></g>' +
    '<g fill="#2f2b26"><circle cx="18.2" cy="9.6" r="1.2"/><circle cx="21" cy="9.6" r="1.2"/></g>',

  /** 砂に埋もれかけた木造劇場(ウンベルストネ)。**扉の奥が真っ暗。** */
  ghosttheater:
    '<rect x="0" y="0" width="24" height="22" fill="#e8ddb8"/>' +
    '<rect x="3" y="6" width="18" height="16" fill="#b09a6f"/>' +
    '<path d="M1.6,6.6L12,1l10.4,5.6l-0.8,1.6L12,3L2.4,8.2z" fill="#8a7355"/>' +
    '<rect x="5" y="9" width="14" height="2" fill="#8a7355"/>' +
    '<g fill="#6b5c42"><rect x="4.6" y="12.6" width="3.4" height="4.4"/><rect x="16" y="12.6" width="3.4" height="4.4"/></g>' +
    '<g stroke="#5a4c36" stroke-width="0.8" fill="none"><path d="M4.6,14.8h3.4M16,14.8h3.4M6.3,12.6v4.4M17.7,12.6v4.4"/></g>' +
    '<rect x="9.6" y="12" width="4.8" height="10" fill="#2a241c"/>' +
    '<path d="M9.6,12h4.8v1.4h-4.8z" fill="#4a3f2e"/>' +
    '<path d="M0,24q4,-4 8,-2.6q4,1.2 8,0q4,-1 8,1.6v1H0z" fill="#e0cfa0"/>' +
    '<path d="M2,22.4q3,-2.6 6,-1.6" stroke="#cdb987" stroke-width="1" fill="none"/>',

  /** モロの断崖と古い大砲(アリカ)。 */
  morroguns:
    '<rect x="0" y="0" width="24" height="24" fill="#bfe0ee"/>' +
    '<rect x="0" y="17" width="24" height="7" fill="#3f92ae"/>' +
    '<path d="M1,20q5,-2 10,0" stroke="#bfe8f4" stroke-width="1" opacity=".8" fill="none"/>' +
    '<path d="M0,24V6q6,-2 10,2l4,5l3,7l-1,4z" fill="#a8794a"/>' +
    '<path d="M0,10q5,-1.6 8,1.2l4,5.2" stroke="#8a5f38" stroke-width="1.2" fill="none"/>' +
    '<rect x="1" y="4.6" width="8" height="3" fill="#7a6a52"/>' +
    '<path d="M8,5.4l8,-2.6l0.8,1.8l-7.6,3z" fill="#4a4a44"/>' +
    '<circle cx="8.2" cy="7" r="2" fill="#33302c"/>' +
    '<path d="M2,4.6V1.4M0.8,2h2.4" stroke="#5f5548" stroke-width="1" fill="none"/>' +
    '<g fill="#eef6f8" opacity=".9"><path d="M17,19q2,-2 4,-0.6q-2,-0.2 -4,0.6z"/></g>',

  /** サンタ・マリア学校跡の外観(イキケ)。**建物だけを、静かに。** */
  santamariaflag:
    '<rect x="0" y="0" width="24" height="22" fill="#d8d4c4"/>' +
    '<rect x="1.6" y="8" width="20.8" height="14" fill="#c2ab84"/>' +
    '<path d="M0.6,8.6L12,3.4L23.4,8.6l-0.7,1.4L12,5.4L1.3,10z" fill="#8a7355"/>' +
    '<path d="M8,8h8l-1,-3h-6z" fill="#a08a62"/>' +
    '<g fill="#5f5850"><path d="M3.4,12h3.4v5H3.4z"/><path d="M9,12h2.6v5H9z"/><path d="M12.4,12h2.6v5h-2.6z"/><path d="M17.2,12h3.4v5h-3.4z"/></g>' +
    '<g fill="#c2ab84"><path d="M3.4,12.8a1.7,1.7 0 0 1 3.4,0z" opacity=".4"/><path d="M17.2,12.8a1.7,1.7 0 0 1 3.4,0z" opacity=".4"/></g>' +
    '<rect x="10.4" y="18" width="3.2" height="4" fill="#4a4238"/>' +
    '<path d="M12,3.4V0.6" stroke="#5f5548" stroke-width="0.9" fill="none"/>' +
    '<path d="M12,0.6h4l-1,1.2l1,1.2h-4z" fill="#8a8f92"/>' +
    '<rect x="0.8" y="22" width="22.4" height="1.6" rx="0.6" fill="#c9a877"/>',

  /** いまも煙を上げる工場と社宅(マリア・エレナ)。**最後の一つ。** */
  lastoficina:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#c9a877"/>' +
    '<rect x="2.6" y="6" width="4.4" height="16.4" fill="#8a7f70"/>' +
    '<rect x="2" y="6" width="5.6" height="1.8" fill="#6b6256"/>' +
    '<g fill="#d8d2c4"><ellipse cx="6.6" cy="4" rx="2.6" ry="1.8"/><ellipse cx="9.4" cy="2.4" rx="3.4" ry="2.2"/><ellipse cx="13.4" cy="1.6" rx="4" ry="2.4"/></g>' +
    '<rect x="9" y="13.4" width="14" height="9" fill="#9a9284"/>' +
    '<rect x="9" y="13.4" width="14" height="1.6" fill="#7f776a"/>' +
    '<g fill="#5f7f96"><rect x="11" y="16" width="2.6" height="3.4"/><rect x="15" y="16" width="2.6" height="3.4"/><rect x="19" y="16" width="2.6" height="3.4"/></g>' +
    '<g fill="#e0cfa0"><rect x="10" y="8" width="5.4" height="4"/><rect x="16.6" y="8" width="5.4" height="4"/></g>' +
    '<g fill="#b04a3a"><path d="M9.4,8h6.6l-1,-2h-4.6z"/><path d="M16,8h6.6l-1,-2H17z"/></g>' +
    '<g fill="#4a6274"><rect x="11.6" y="9.4" width="2" height="2"/><rect x="18.2" y="9.4" width="2" height="2"/></g>',

  /** 銅精鉱を積んだ貨車(カラマ)。**荷の色がそのまま銅の色。** */
  coppertrain:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#c2a06a"/>' +
    '<g fill="#6b5a3a"><rect x="1" y="20" width="3.4" height="1.8"/><rect x="7" y="20" width="3.4" height="1.8"/><rect x="13" y="20" width="3.4" height="1.8"/><rect x="19" y="20" width="3.4" height="1.8"/></g>' +
    '<g fill="#8a8f92"><rect x="0" y="20.2" width="24" height="1"/><rect x="0" y="21.8" width="24" height="1"/></g>' +
    '<path d="M2,10h20v8.6H2z" fill="#5f6258"/>' +
    '<path d="M2,10h20l-1.6,8.6H3.6z" fill="#6f7268"/>' +
    '<g stroke="#40433c" stroke-width="1" fill="none"><path d="M7,10v8.6M12,10v8.6M17,10v8.6"/></g>' +
    '<path d="M2.6,10q2,-3.4 5,-2q2,-2.6 4.8,-1.4q2.6,-1.8 5,0q3,-0.6 4,3.4z" fill="#b87333"/>' +
    '<path d="M4,9q2,-2 4,-1M13,7q2,-1 3.6,0.4" stroke="#d89050" stroke-width="1.2" fill="none"/>' +
    '<g fill="#2f2b26"><circle cx="6.4" cy="19.6" r="2.2"/><circle cx="17.6" cy="19.6" r="2.2"/></g>' +
    '<g fill="#8a8f92"><circle cx="6.4" cy="19.6" r="0.8"/><circle cx="17.6" cy="19.6" r="0.8"/></g>',

  /** 無人の町と採掘穴の縁(チュキカマタ)。**穴が町を呑んだ。** */
  abandonedpit:
    '<rect x="0" y="0" width="24" height="8" fill="#d8c8a8"/>' +
    '<g fill="#b0a084"><rect x="2" y="3.6" width="4.4" height="4.4"/><rect x="8" y="3.6" width="4.4" height="4.4"/><rect x="14" y="3.6" width="4.4" height="4.4"/><rect x="19.6" y="3.6" width="3.6" height="4.4"/></g>' +
    '<g fill="#6b6256"><rect x="3.2" y="5" width="1.8" height="1.8"/><rect x="9.2" y="5" width="1.8" height="1.8"/><rect x="15.2" y="5" width="1.8" height="1.8"/></g>' +
    '<path d="M0,8h24v16H0z" fill="#9a7a5a"/>' +
    '<g><ellipse cx="12" cy="15.4" rx="11.4" ry="6.6" fill="#8a6a4a"/><ellipse cx="12" cy="16" rx="9" ry="5" fill="#a8875f"/><ellipse cx="12" cy="16.8" rx="6.6" ry="3.6" fill="#7a5a3e"/><ellipse cx="12" cy="17.4" rx="4.2" ry="2.2" fill="#5f4632"/><ellipse cx="12" cy="17.8" rx="2" ry="1.1" fill="#4a3626"/></g>' +
    '<path d="M2,20q5,3 10,3q6,0 10,-3" stroke="#6b5340" stroke-width="1" opacity=".6" fill="none"/>' +
    '<g fill="#f5b31c"><rect x="16.6" y="13.2" width="2.6" height="1.4"/></g>',

  /** 救出の縦坑とやぐら(コピアポ)。**33人が69日目に戻った穴。** */
  minerescue:
    '<rect x="0" y="0" width="24" height="16" fill="#e8d8b0"/>' +
    '<rect x="0" y="16" width="24" height="8" fill="#a8875f"/>' +
    '<path d="M0,16h24v1.6H0z" fill="#8a6a4a"/>' +
    '<g stroke="#5f5548" stroke-width="1.8" fill="none"><path d="M5,16L11,3.4L17,16M7.4,11h7.4"/></g>' +
    '<circle cx="11" cy="3.4" r="2.2" fill="none" stroke="#5f5548" stroke-width="1.6"/>' +
    '<path d="M11,5.6V19" stroke="#33302c" stroke-width="1" fill="none"/>' +
    '<rect x="9.2" y="13.6" width="3.6" height="8" rx="1.6" fill="#c8452f"/>' +
    '<rect x="9.2" y="16" width="3.6" height="3.4" fill="#f2f4f6"/>' +
    '<rect x="9.2" y="19.4" width="3.6" height="2.2" fill="#3f5f9f"/>' +
    '<g fill="#33302c"><rect x="10.4" y="14.6" width="1.2" height="1.2"/></g>' +
    '<path d="M18,20.6h4M19,18.6h3" stroke="#8a6a4a" stroke-width="1.2" fill="none"/>' +
    '<g fill="#f5b31c"><circle cx="20.4" cy="4.4" r="2.6"/></g>',

  /** 1851年開業の終着駅舎(カルデラ)。**南米で最初期の汽笛が鳴った場所。** */
  firstrail:
    '<rect x="0" y="0" width="24" height="22" fill="#e8d8b0"/>' +
    '<rect x="2" y="9" width="20" height="10" fill="#c8a13f"/>' +
    '<path d="M0.8,9.6L12,3l11.2,6.6l-0.8,1.4L12,5L1.6,11z" fill="#8a6f2c"/>' +
    '<circle cx="12" cy="8.4" r="1.8" fill="#f2f4f6"/>' +
    '<path d="M12,7.2v1.2M12,8.4l1,0.6" stroke="#33302c" stroke-width="0.7" fill="none"/>' +
    '<g fill="#4a6274"><rect x="4.4" y="11.6" width="3" height="3.6"/><rect x="16.6" y="11.6" width="3" height="3.6"/></g>' +
    '<path d="M10,19v-6a2,2 0 0 1 4,0v6z" fill="#5a4630"/>' +
    '<g fill="#6b5a3a"><rect x="1" y="20.4" width="3.2" height="1.6"/><rect x="6.6" y="20.4" width="3.2" height="1.6"/><rect x="12.2" y="20.4" width="3.2" height="1.6"/><rect x="17.8" y="20.4" width="3.2" height="1.6"/></g>' +
    '<g fill="#8a8f92"><rect x="0" y="20.6" width="24" height="0.9"/><rect x="0" y="22.1" width="24" height="0.9"/></g>' +
    '<rect x="0.8" y="23" width="22.4" height="1" rx="0.5" fill="#c9a877"/>',

  /** 鉱滓で埋まった浜(チャニャラル)。**青い海と灰色の浜の境目。** */
  tailingsbay:
    '<rect x="0" y="0" width="24" height="9" fill="#bfe0ee"/>' +
    '<rect x="0" y="9" width="24" height="6" fill="#3f92ae"/>' +
    '<path d="M2,11q4,-1.6 8,0M13,12.4q4,-1.6 8,0" stroke="#bfe8f4" stroke-width="1" opacity=".8" fill="none"/>' +
    '<path d="M0,15q6,-2.6 12,-1.4q7,1.4 12,-1.6v12H0z" fill="#9a9a92"/>' +
    '<path d="M0,15q6,-2.6 12,-1.4q7,1.4 12,-1.6v2q-5,3 -12,1.6q-6,-1.2 -12,1.4z" fill="#b0b0a8"/>' +
    '<g stroke="#7f7f78" stroke-width="1.2" opacity=".8" fill="none"><path d="M3,19q5,-1.4 9,-0.6M14,20q4,-1 7,-1.4"/></g>' +
    '<g fill="#5a4a34"><rect x="4" y="9.6" width="1.6" height="6"/><rect x="8" y="10.4" width="1.6" height="5.4"/><rect x="12" y="9.8" width="1.6" height="5.6"/></g>' +
    '<path d="M17,17.6v-3.4" stroke="#8a8f92" stroke-width="1" fill="none"/>' +
    '<path d="M17,14.2h4l-1,1.4l1,1.4h-4z" fill="#e8443f"/>',

  /** ネオコロニアルのドームとアーケード(ラ・セレナ)。 */
  colonialdome:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#c9a877"/>' +
    '<rect x="2" y="12" width="20" height="10.4" fill="#efe2c6"/>' +
    '<rect x="1.4" y="12" width="21.2" height="1.6" fill="#c2ab84"/>' +
    '<g fill="#8a7a62"><path d="M4,22.4v-5.4a2.2,2.2 0 0 1 4.4,0v5.4z"/><path d="M9.8,22.4v-5.4a2.2,2.2 0 0 1 4.4,0v5.4z"/><path d="M15.6,22.4v-5.4a2.2,2.2 0 0 1 4.4,0v5.4z"/></g>' +
    '<rect x="7.6" y="7.6" width="8.8" height="4.4" fill="#f2ecdc"/>' +
    '<path d="M7,7.6a5,4.6 0 0 1 10,0z" fill="#b04a3a"/>' +
    '<path d="M8.6,7.6a3.4,3.6 0 0 1 6.8,0" stroke="#8a3a2c" stroke-width="0.9" opacity=".7" fill="none"/>' +
    '<path d="M12,3v-2M10.9,1.8h2.2" stroke="#8a7a62" stroke-width="1" fill="none"/>' +
    '<g fill="#5f7f96"><rect x="9.8" y="8.6" width="1.8" height="2.4"/><rect x="12.6" y="8.6" width="1.8" height="2.4"/></g>',

  /** 湾を見下ろす千年紀の十字架(コキンボ)。**三本脚のコンクリート。** */
  millenniumcross:
    '<rect x="0" y="0" width="24" height="18" fill="#bfe0ee"/>' +
    '<rect x="0" y="14" width="24" height="4" fill="#3f92ae"/>' +
    '<path d="M0,24v-7q6,-4 12,-4q6,0 12,4v7z" fill="#a8875f"/>' +
    '<path d="M2,18q5,-2.6 10,-2.6" stroke="#8a6a4a" stroke-width="1" opacity=".7" fill="none"/>' +
    '<g fill="#eceade" stroke="#8a867a" stroke-width="0.5">' +
    '<path d="M7.8,16L10.3,3.2l1.2,0.5L9.6,16z"/>' +
    '<path d="M16.2,16L13.7,3.2l-1.2,0.5L14.4,16z"/>' +
    '<rect x="10.9" y="1" width="2.2" height="15"/>' +
    '<rect x="7" y="5.2" width="10" height="2.6" rx="0.7"/></g>' +
    '<path d="M8.6,15.8h6.8l0.6,1.8H8z" fill="#b8b4a8"/>' +
    '<g fill="#eef6f8" opacity=".9"><path d="M3,15.2q1.6,-1.4 3.4,-0.4q-1.8,0 -3.4,0.4z"/><path d="M18,15.4q1.6,-1.4 3.4,-0.4q-1.8,0 -3.4,0.4z"/></g>',

  /** 日干しレンガのミストラル生家(ビクーニャ)。 */
  mistralhouse:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#c9a877"/>' +
    '<rect x="2.6" y="10" width="18.8" height="12.4" fill="#d8b888"/>' +
    '<path d="M1,10.6h22l-2,-4.6H3z" fill="#a86a48"/>' +
    '<path d="M2.4,8.4h19.2" stroke="#8a5638" stroke-width="0.9" opacity=".7" fill="none"/>' +
    '<rect x="10" y="14" width="4" height="8.4" fill="#2f6b4a"/>' +
    '<path d="M10,14h4v1.2h-4z" fill="#255238"/>' +
    '<g fill="#4a6274"><rect x="4.6" y="13.4" width="3.4" height="3.6"/><rect x="16" y="13.4" width="3.4" height="3.6"/></g>' +
    '<g stroke="#2f6b4a" stroke-width="0.9" fill="none"><path d="M4.2,13h4.2M15.6,13h4.2"/></g>' +
    '<path d="M21.4,22.4q-0.6,-5 2,-7" stroke="#5a4630" stroke-width="1.2" fill="none"/>' +
    '<ellipse cx="22.4" cy="13.6" rx="2.4" ry="1.8" fill="#5f8f4a"/>' +
    '<g fill="#e8ecf0"><circle cx="6" cy="3.4" r="1"/><circle cx="12" cy="2" r="1.2"/><circle cx="18" cy="3.6" r="1"/></g>',

  /** 貯水池とブドウ畑(オバジェ)。**堰の水が谷を緑にする。** */
  limarivineyard:
    '<rect x="0" y="0" width="24" height="10" fill="#cfe4f0"/>' +
    '<path d="M0,10h24v4H0z" fill="#5b8fe8"/>' +
    '<path d="M2,11.6q4,-1.2 8,0M13,12.4q4,-1.2 8,0" stroke="#8fb8f0" stroke-width="0.9" opacity=".9" fill="none"/>' +
    '<path d="M0,14h24l-1.6,3H1.6z" fill="#b8b4a8"/>' +
    '<path d="M3,14v2.6M8,14v3M13,14v3M18,14v2.6" stroke="#8a8680" stroke-width="1" fill="none"/>' +
    '<rect x="0" y="17" width="24" height="7" fill="#6b9a4a"/>' +
    '<g stroke="#4f7f3a" stroke-width="1.6" fill="none"><path d="M0.6,19.4q5.7,-1.6 11.4,0q5.7,1.6 11.4,0"/><path d="M0.6,22.4q5.7,-1.6 11.4,0q5.7,1.6 11.4,0"/></g>' +
    '<g fill="#6b3f7a"><circle cx="5" cy="18.8" r="1"/><circle cx="12" cy="19.4" r="1"/><circle cx="19" cy="18.8" r="1"/><circle cx="8.6" cy="21.8" r="1"/><circle cx="15.6" cy="22" r="1"/></g>' +
    '<g fill="#6b5a3a"><rect x="2.6" y="17.6" width="1" height="3"/><rect x="20.4" y="17.6" width="1" height="3"/></g>',

  /** 山と海に挟まれた細い道(イジャペル)。**国の細さそのもの。** */
  narrowestpoint:
    '<rect x="0" y="0" width="24" height="24" fill="#bfe0ee"/>' +
    '<path d="M0,5h9v19H0z" fill="#3f92ae"/>' +
    '<path d="M1,9q3,-1.2 6,0M1.6,15q2.6,-1.2 5.4,0M1,20q3,-1.2 6,0" stroke="#bfe8f4" stroke-width="1" opacity=".8" fill="none"/>' +
    '<path d="M24,0v24h-8L14,14l3,-8l3,-4z" fill="#a8865a"/>' +
    '<path d="M20,2l-3,4l-3,8l2,10h-2L12,14l3,-9l3,-4z" fill="#8a6a44"/>' +
    '<path d="M9,24V5h3l2,9l-2,10z" fill="#c2b494"/>' +
    '<path d="M10.6,22l1.6,-8l-1,-6" stroke="#f2f4f6" stroke-width="0.9" stroke-dasharray="2 2.4" fill="none"/>' +
    '<g fill="#c8452f"><rect x="10" y="16.6" width="3.4" height="2" rx="0.6"/></g>' +
    '<g fill="#33302c"><circle cx="10.9" cy="18.9" r="0.8"/><circle cx="12.7" cy="18.9" r="0.8"/></g>' +
    '<path d="M17,2.6l4,-2" stroke="#e8ecf0" stroke-width="1.2" fill="none"/>',

  /** エスタシオン・セントラルの駅舎(サンティアゴ)。**緑の鉄のアーチ。** */
  centralstation:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#9a948a"/>' +
    '<path d="M2,22.4V10a10,9 0 0 1 20,0v12.4h-2.6V10.6a7.4,7 0 0 0 -14.8,0v11.8z" fill="#3f7050"/>' +
    '<path d="M4.6,22.4V10.6a7.4,7 0 0 1 14.8,0v11.8z" fill="#cfe0e8"/>' +
    '<g stroke="#3f7050" stroke-width="0.9" opacity=".9" fill="none"><path d="M7,22.4V8.6M12,22.4V6.4M17,22.4V8.6M4.8,13h14.4M5.6,9h12.8"/></g>' +
    '<rect x="1" y="8.4" width="3" height="2" fill="#3f7050"/>' +
    '<rect x="20" y="8.4" width="3" height="2" fill="#3f7050"/>' +
    '<circle cx="12" cy="4.4" r="1.6" fill="#f2f4f6"/>' +
    '<path d="M12,3.4v1M12,4.4l0.8,0.5" stroke="#33302c" stroke-width="0.6" fill="none"/>' +
    '<rect x="9.6" y="17" width="4.8" height="5.4" fill="#33424e"/>' +
    '<path d="M9.6,17h4.8v1h-4.8z" fill="#2a343c"/>',

  /** 丘を登るアセンソール(バルパライソ)。 */
  funicular:
    '<rect x="0" y="0" width="24" height="24" fill="#cfe4f0"/>' +
    '<path d="M0,24L20,2h4v22z" fill="#8a7355"/>' +
    '<path d="M2,24L22,2" stroke="#5f5548" stroke-width="2.2" fill="none"/>' +
    '<path d="M5,24L23,4" stroke="#5f5548" stroke-width="2.2" fill="none"/>' +
    '<g stroke="#6b5f4c" stroke-width="0.9" fill="none"><path d="M4.6,21.4l3,2.6M8.2,17.4l3,2.6M11.8,13.4l3,2.6M15.4,9.4l3,2.6M19,5.4l3,2.6"/></g>' +
    '<g transform="rotate(-47 11 13)"><rect x="6.6" y="9" width="9" height="8" rx="1" fill="#c8a13f"/><rect x="6.6" y="9" width="9" height="2.4" fill="#8a6f2c"/><g fill="#33424e"><rect x="8" y="12" width="2.4" height="2.6"/><rect x="11.6" y="12" width="2.4" height="2.6"/></g></g>' +
    '<g fill="#e8443f"><rect x="0.6" y="4" width="5.4" height="4.4"/></g>' +
    '<path d="M0.2,4h6.2l-1,-2H1.2z" fill="#8a3a2c"/>' +
    '<rect x="2" y="5.4" width="1.8" height="1.8" fill="#33424e"/>',

  /** 花時計(ビニャ・デル・マール)。 */
  flowerclock:
    '<rect x="0" y="0" width="24" height="24" fill="#7fa855"/>' +
    '<path d="M0,0h24v5q-12,4 -24,0z" fill="#9fc4e0"/>' +
    '<circle cx="12" cy="14" r="8.6" fill="#5f8f3f"/>' +
    '<circle cx="12" cy="14" r="8.6" fill="none" stroke="#4a703a" stroke-width="1"/>' +
    '<g fill="#e8443f"><circle cx="12" cy="6.6" r="1.2"/><circle cx="19.4" cy="14" r="1.2"/><circle cx="12" cy="21.4" r="1.2"/><circle cx="4.6" cy="14" r="1.2"/></g>' +
    '<g fill="#f5b31c"><circle cx="17.2" cy="8.8" r="1.1"/><circle cx="17.2" cy="19.2" r="1.1"/><circle cx="6.8" cy="19.2" r="1.1"/><circle cx="6.8" cy="8.8" r="1.1"/></g>' +
    '<g fill="#f2f4f6"><circle cx="14.8" cy="7.4" r="0.8"/><circle cx="18.6" cy="11.4" r="0.8"/><circle cx="18.6" cy="16.6" r="0.8"/><circle cx="14.8" cy="20.6" r="0.8"/><circle cx="9.2" cy="20.6" r="0.8"/><circle cx="5.4" cy="16.6" r="0.8"/><circle cx="5.4" cy="11.4" r="0.8"/><circle cx="9.2" cy="7.4" r="0.8"/></g>' +
    '<g stroke="#2f2b26" stroke-width="1.4" stroke-linecap="round" fill="none"><path d="M12,14V9.4M12,14l3.4,2.4"/></g>' +
    '<circle cx="12" cy="14" r="1.1" fill="#2f2b26"/>',

  /** エル・テニエンテの坑口(ランカグア)。**世界最大の坑内掘り。** */
  tenienteshaft:
    '<rect x="0" y="0" width="24" height="20" fill="#b0ccd8"/>' +
    '<path d="M0,20L9,3l6,8l4,-5l5,8v6H0z" fill="#7a7086"/>' +
    '<path d="M9,3l3.4,5.6l-2.2,1l-3.4,-3.2z" fill="#f2f4f6"/>' +
    '<path d="M19,6l2.6,4.2l-2,0.6l-2.4,-2.8z" fill="#f2f4f6"/>' +
    '<rect x="0" y="20" width="24" height="4" fill="#8a8272"/>' +
    '<path d="M7,20v-6.4a5,5.6 0 0 1 10,0V20z" fill="#4a4238"/>' +
    '<path d="M8.6,20v-5.8a3.4,4 0 0 1 6.8,0V20z" fill="#2a241c"/>' +
    '<g fill="#8a8f92"><rect x="6" y="20.6" width="12" height="0.9"/><rect x="6" y="22.2" width="12" height="0.9"/></g>' +
    '<g fill="#6b5a3a"><rect x="7" y="20.4" width="1.8" height="1.4"/><rect x="11" y="20.4" width="1.8" height="1.4"/><rect x="15" y="20.4" width="1.8" height="1.4"/></g>' +
    '<path d="M2.6,18.6h3M18.6,18.6h3" stroke="#5f5548" stroke-width="1" fill="none"/>' +
    '<circle cx="12" cy="16.2" r="1" fill="#f5b31c"/>',

  /** 色分けの家々と屋根つき階段(セウェル)。 */
  stairtown:
    '<rect x="0" y="0" width="24" height="24" fill="#8a8072"/>' +
    '<path d="M9.6,24L11,2h2L14.4,24z" fill="#c2a06a"/>' +
    '<g stroke="#8a6f44" stroke-width="0.9" fill="none"><path d="M10.6,6h2.8M10.4,10h3.2M10.2,14h3.6M10,18h4M9.8,21h4.4"/></g>' +
    '<g><rect x="1" y="3.4" width="7.6" height="5" fill="#c8452f"/><rect x="1" y="3.4" width="7.6" height="1.2" fill="#00000033"/><rect x="2.6" y="5" width="1.8" height="2" fill="#e8ecf0"/><rect x="5.6" y="5" width="1.8" height="2" fill="#e8ecf0"/></g>' +
    '<g><rect x="1.6" y="10.4" width="7" height="5" fill="#f5b31c"/><rect x="1.6" y="10.4" width="7" height="1.2" fill="#00000033"/><rect x="3" y="12" width="1.8" height="2" fill="#e8ecf0"/><rect x="6" y="12" width="1.8" height="2" fill="#e8ecf0"/></g>' +
    '<g><rect x="1" y="17.4" width="7.6" height="5" fill="#4f9a5f"/><rect x="1" y="17.4" width="7.6" height="1.2" fill="#00000033"/><rect x="2.6" y="19" width="1.8" height="2" fill="#e8ecf0"/><rect x="5.6" y="19" width="1.8" height="2" fill="#e8ecf0"/></g>' +
    '<g><rect x="15.4" y="6.4" width="7.6" height="5" fill="#5b8fe8"/><rect x="15.4" y="6.4" width="7.6" height="1.2" fill="#00000033"/><rect x="17" y="8" width="1.8" height="2" fill="#e8ecf0"/><rect x="20" y="8" width="1.8" height="2" fill="#e8ecf0"/></g>' +
    '<g><rect x="15.4" y="13.6" width="7.6" height="5" fill="#c86a9a"/><rect x="15.4" y="13.6" width="7.6" height="1.2" fill="#00000033"/><rect x="17" y="15.2" width="1.8" height="2" fill="#e8ecf0"/><rect x="20" y="15.2" width="1.8" height="2" fill="#e8ecf0"/></g>' +
    '<path d="M9.2,2.6h5.6l-1,-1.8h-3.6z" fill="#6b5330"/>',

  /** コンテナクレーン(サン・アントニオ)。 */
  containercranes:
    '<rect x="0" y="0" width="24" height="17" fill="#cfe0e8"/>' +
    '<rect x="0" y="17" width="24" height="7" fill="#8a9298"/>' +
    '<rect x="0" y="17" width="24" height="1.4" fill="#6b7278"/>' +
    '<g stroke="#c8452f" stroke-width="1.8" fill="none"><path d="M3.4,17V5.6M9,17V5.6M2,5.6h9.4M2,5.6l1.6,-2.6"/><path d="M15,17V5.6M20.6,17V5.6M13.6,5.6h9.4M13.6,5.6l1.6,-2.6"/></g>' +
    '<path d="M6.2,5.6v3.4M17.8,5.6v3.4" stroke="#33302c" stroke-width="0.9" fill="none"/>' +
    '<g fill="#3f7f9a"><rect x="4.2" y="9" width="4" height="2.6"/></g>' +
    '<g fill="#4f9a5f"><rect x="15.8" y="9" width="4" height="2.6"/></g>' +
    '<g><rect x="2.6" y="14.4" width="4.4" height="2.6" fill="#c8a13f"/><rect x="7.4" y="14.4" width="4.4" height="2.6" fill="#8a5a9a"/><rect x="12.2" y="14.4" width="4.4" height="2.6" fill="#4f9a5f"/><rect x="17" y="14.4" width="4.4" height="2.6" fill="#3f7f9a"/><rect x="5" y="11.8" width="4.4" height="2.6" fill="#c8452f"/><rect x="14.6" y="11.8" width="4.4" height="2.6" fill="#c8a13f"/></g>' +
    '<g stroke="#bfe8f4" stroke-width="0.9" opacity=".8" fill="none"><path d="M2,21.4q3,-1.2 6,0M13,22q3,-1.2 6,0"/></g>',

  /** ブドウ収穫の樽と籠(サンタ・クルス)。 */
  wineharvest:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#8a9a58"/>' +
    '<path d="M3,22.4q-2.4,-7.4 0,-14.8h11q2.4,7.4 0,14.8z" fill="#8a6b3a"/>' +
    '<g stroke="#5f4526" stroke-width="1.2" fill="none"><path d="M2.2,11.4h12.6M2,15h13M2.2,18.6h12.6"/></g>' +
    '<path d="M3,7.6h11v1.6H3z" fill="#6b5330"/>' +
    '<ellipse cx="8.5" cy="7.6" rx="5.5" ry="1.4" fill="#a8823f"/>' +
    '<path d="M16,22.4q-1,-5.4 1.6,-8.4h4.8q2.6,3 1.6,8.4z" fill="#c9a25f"/>' +
    '<g stroke="#a8823f" stroke-width="0.8" opacity=".9" fill="none"><path d="M16.2,16.6h7.6M15.9,19.4h8.2"/></g>' +
    '<g fill="#6b3f7a"><circle cx="18" cy="12.6" r="1.5"/><circle cx="20.8" cy="12.2" r="1.5"/><circle cx="19.4" cy="10.4" r="1.5"/><circle cx="22" cy="13.8" r="1.3"/><circle cx="16.6" cy="13.8" r="1.3"/></g>' +
    '<path d="M19.4,9.2q0.6,-2 2.4,-2.6" stroke="#4f7f3a" stroke-width="1.1" fill="none"/>',

  /** 広場の巨木とベンチ(クリコ)。 */
  plazapalms:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#b0a486"/>' +
    '<path d="M10.6,22.4L11.4,10h1.6l0.8,12.4z" fill="#7a6247"/>' +
    '<g fill="#2f7f4a"><path d="M12,10q-7,-1 -10,-6q6,-1 10,2z"/><path d="M12,10q7,-1 10,-6q-6,-1 -10,2z"/><path d="M12,10q-5,-4 -5,-9q4,2 5,6z"/><path d="M12,10q5,-4 5,-9q-4,2 -5,6z"/><path d="M12,10q0,-5 0,-8"/></g>' +
    '<path d="M12,10q-2,-4.6 0,-8.4q2,3.8 0,8.4z" fill="#3f8f52"/>' +
    '<g fill="#8a6f3a"><circle cx="10.6" cy="10.6" r="1"/><circle cx="13.4" cy="10.8" r="1"/></g>' +
    '<g fill="#6b5330"><rect x="2.4" y="18.4" width="6.4" height="1.4"/><rect x="2.8" y="16.4" width="5.6" height="1.2"/><rect x="3" y="19.8" width="1.2" height="2.6"/><rect x="7" y="19.8" width="1.2" height="2.6"/></g>' +
    '<g fill="#6b5330"><rect x="15.2" y="18.4" width="6.4" height="1.4"/><rect x="15.6" y="16.4" width="5.6" height="1.2"/><rect x="15.8" y="19.8" width="1.2" height="2.6"/><rect x="19.8" y="19.8" width="1.2" height="2.6"/></g>',

  /** 建て直しの足場(コンセプシオン)。**壊れた絵ではなく直している絵。** */
  quaketower:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#9a948a"/>' +
    '<rect x="3" y="4.6" width="12" height="17.8" fill="#c8ccd0"/>' +
    '<rect x="3" y="4.6" width="12" height="1.6" fill="#a8adb2"/>' +
    '<g fill="#5f7f96"><rect x="5" y="8" width="3" height="2.6"/><rect x="10" y="8" width="3" height="2.6"/><rect x="5" y="13" width="3" height="2.6"/><rect x="10" y="13" width="3" height="2.6"/><rect x="5" y="18" width="3" height="2.6"/></g>' +
    '<path d="M10,18l3.4,3.4" stroke="#8a8478" stroke-width="1" opacity=".9" fill="none"/>' +
    '<g stroke="#8a6f44" stroke-width="1.3" fill="none"><path d="M16.6,22.4V3M20.6,22.4V3M16,5h6M16,10h6M16,15h6M16,20h6"/></g>' +
    '<path d="M18.6,3V1M18.6,1h4l-1,3l-3,-2z" stroke="#c8452f" stroke-width="1.2" fill="none"/>' +
    '<rect x="17.4" y="6.4" width="2.4" height="2.4" fill="#f5b31c"/>' +
    '<circle cx="18.6" cy="12.4" r="1.6" fill="#c98f5f"/>' +
    '<path d="M17.6,13.6h2v3h-2z" fill="#e8443f"/>',

  /** 海へ向かう坑口とやぐら(ロタ)。**坑道は海の下へ8km。** */
  underseamine:
    '<rect x="0" y="0" width="24" height="9" fill="#bfe0ee"/>' +
    '<rect x="7" y="9" width="17" height="5.6" fill="#3f92ae"/>' +
    '<path d="M9,11q3,-1.2 6,0M16,12.6q3,-1.2 6,0" stroke="#bfe8f4" stroke-width="1" opacity=".85" fill="none"/>' +
    '<path d="M0,9h8l2,5.6h14V24H0z" fill="#6b5c4e"/>' +
    '<path d="M0,9h8l2,5.6H7.4L6,11H0z" fill="#4f7048"/>' +
    '<g stroke="#26201a" stroke-width="2.6" fill="none"><path d="M3,12q6,2.6 11,5.6q4,2.2 9,3"/></g>' +
    '<path d="M2.6,9V3.8L6.6,1.6L6.6,9" fill="none" stroke="#33302c" stroke-width="1.5"/>' +
    '<circle cx="4.6" cy="2.8" r="1.4" fill="none" stroke="#33302c" stroke-width="1.1"/>' +
    '<path d="M4.6,4.2V11" stroke="#22201c" stroke-width="1" fill="none"/>' +
    '<rect x="2.8" y="9.6" width="3.6" height="3.4" fill="#26201a"/>' +
    '<g fill="#f5b31c"><circle cx="8.6" cy="14" r="1.1"/><circle cx="13.6" cy="16.6" r="1.1"/><circle cx="19.4" cy="19.4" r="1.1"/></g>' +
    '<path d="M13,4.6q2,-2 4,-0.6q-2,-0.2 -4,0.6z" fill="#eef6f8" opacity=".9"/>',

  /** 湾の軍艦(タルカワノ)。 */
  navalbase:
    '<rect x="0" y="0" width="24" height="14" fill="#bfd8e4"/>' +
    '<rect x="0" y="14" width="24" height="10" fill="#3f7690"/>' +
    '<path d="M2,18q4,-1.6 8,0M14,19.4q4,-1.6 8,0" stroke="#8fc4d8" stroke-width="1.1" opacity=".8" fill="none"/>' +
    '<path d="M1.4,14.4h21.2l-2.6,4.2H4z" fill="#5f6b74"/>' +
    '<rect x="1.4" y="13" width="21.2" height="1.6" fill="#4a545c"/>' +
    '<rect x="6" y="9.4" width="8" height="3.6" fill="#8a929c"/>' +
    '<rect x="15" y="10.6" width="4.4" height="2.4" fill="#8a929c"/>' +
    '<path d="M8,9.4V7l4.6,0.8" stroke="#4a545c" stroke-width="1.3" fill="none"/>' +
    '<path d="M10.4,7.4V2.6" stroke="#33302c" stroke-width="1.1" fill="none"/>' +
    '<path d="M10.4,2.6h3.4l-0.9,1.2l0.9,1.2h-3.4z" fill="#c8452f"/>' +
    '<path d="M16.6,10.6V8.4" stroke="#33302c" stroke-width="0.9" fill="none"/>' +
    '<g fill="#33302c"><rect x="3.4" y="15.2" width="2.6" height="1.2"/><rect x="18" y="15.2" width="2.6" height="1.2"/></g>',

  /** オイギンスの騎馬像(チジャン)。**生まれた町に立つ独立の父。** */
  ohigginsstatue:
    '<rect x="0" y="0" width="24" height="24" fill="#cfe4f0"/>' +
    '<rect x="0" y="20" width="24" height="4" fill="#b0a486"/>' +
    '<rect x="5" y="14.6" width="14" height="6" fill="#8a8478"/>' +
    '<rect x="4" y="19.4" width="16" height="1.6" fill="#6b665c"/>' +
    '<rect x="5" y="14.6" width="14" height="1.2" fill="#a09a8c"/>' +
    '<g fill="#4a5a52"><path d="M7,14.6q0,-4 3.4,-4.4h5q3,0 3.4,2.6l-1.6,1l-1.4,-1.4l-0.6,2.2z"/><path d="M16.4,10.4q2,-1 2.4,-3l1.6,0.6q-0.4,2.6 -2.4,3.6z"/><circle cx="20.6" cy="6.4" r="1.1"/><path d="M8.6,14.6v-1.6M11.6,14.6v-1.6M14,14.6v-1.6M16.6,14.6l0.6,-1.6"/></g>' +
    '<g stroke="#4a5a52" stroke-width="1.2" fill="none"><path d="M8.6,14.6v-2M11.6,14.6v-2M14.4,14.6v-2M17,14.6v-2"/></g>' +
    '<path d="M11,10.2l0.6,-3.4h2.4l0.6,3.4z" fill="#3a4a42"/>' +
    '<circle cx="13.2" cy="5.4" r="1.4" fill="#4a5a52"/>' +
    '<path d="M11.6,4.4h3.4l-0.6,-1.2h-2.2z" fill="#3a4a42"/>' +
    '<path d="M11.2,8l-2.6,1.6" stroke="#3a4a42" stroke-width="1.1" fill="none"/>',

  /** 線路の終端の車止め(プエルト・モント)。**この先は海。** */
  bufferstop:
    '<rect x="0" y="0" width="24" height="8" fill="#bfe0ee"/>' +
    '<rect x="0" y="8" width="24" height="4" fill="#3f92ae"/>' +
    '<path d="M3,10q3,-1.2 6,0M14,10.4q3,-1.2 6,0" stroke="#bfe8f4" stroke-width="0.9" opacity=".8" fill="none"/>' +
    '<rect x="0" y="12" width="24" height="12" fill="#8a8478"/>' +
    '<g fill="#6b5a3a"><rect x="7" y="21.4" width="10" height="1.6"/><rect x="7.6" y="18.4" width="8.8" height="1.6"/><rect x="8.2" y="15.4" width="7.6" height="1.6"/></g>' +
    '<path d="M9,24L10.8,13.4M15,24L13.2,13.4" stroke="#8a8f92" stroke-width="1.4" fill="none"/>' +
    '<g stroke="#7a3a2c" stroke-width="1.8" fill="none"><path d="M8.6,15.4l3.4,-4l3.4,4"/></g>' +
    '<rect x="8.6" y="9.4" width="6.8" height="3.4" rx="0.8" fill="#c8452f"/>' +
    '<rect x="8.6" y="10.7" width="6.8" height="0.9" fill="#f2f4f6"/>' +
    '<path d="M2,5.6q2,-2 4,-0.6q-2,-0.2 -4,0.6z" fill="#eef6f8" opacity=".9"/>',

  /** 砦と線路の起点(テムコ)。**前線として敷かれた線。** */
  railfrontier:
    '<rect x="0" y="0" width="24" height="16" fill="#cfe4d8"/>' +
    '<rect x="0" y="16" width="24" height="8" fill="#7f9a5f"/>' +
    '<g fill="#8a6f44"><path d="M2,14v-7l1.6,-2l1.6,2v7z"/><path d="M6,14V8l1.6,-2l1.6,2v6z"/><path d="M10,14v-7l1.6,-2l1.6,2v7z"/></g>' +
    '<rect x="1.4" y="10" width="12.8" height="1.4" fill="#6b5330"/>' +
    '<rect x="16" y="8" width="6.4" height="6" fill="#a8895c"/>' +
    '<path d="M15,8h8.4l-1.4,-2.6h-5.6z" fill="#6b5330"/>' +
    '<rect x="18.4" y="10.4" width="1.8" height="3.6" fill="#4a3a26"/>' +
    '<g fill="#6b5a3a"><rect x="1" y="19.4" width="2.8" height="1.4"/><rect x="6" y="19.4" width="2.8" height="1.4"/><rect x="11" y="19.4" width="2.8" height="1.4"/><rect x="16" y="19.4" width="2.8" height="1.4"/><rect x="21" y="19.4" width="2.4" height="1.4"/></g>' +
    '<g fill="#8a8f92"><rect x="0" y="19.6" width="24" height="0.9"/><rect x="0" y="21" width="24" height="0.9"/></g>' +
    '<path d="M2.4,19l-1.6,-3.4" stroke="#8a8f92" stroke-width="1" fill="none"/>' +
    '<path d="M0.4,15.6h3l-0.8,-1.6H1z" fill="#c8452f"/>',

  /** 夜に赤く光る火山の山頂(ビジャリカ)。 */
  volcanoglow:
    '<rect x="0" y="0" width="24" height="24" fill="#242c46"/>' +
    '<g fill="#e8ecf4"><circle cx="4" cy="4" r="0.9"/><circle cx="19" cy="3" r="1.1"/><circle cx="9" cy="2.4" r="0.7"/><circle cx="22" cy="8" r="0.7"/></g>' +
    '<path d="M0,24L8,8h8l8,16z" fill="#3f4658"/>' +
    '<path d="M8,8h8l2.6,5.4q-3,1.6 -6.6,1.6q-3.6,0 -6.6,-1.6z" fill="#e8ecf0"/>' +
    '<path d="M9.4,8.6q1.2,3 2.6,3.2q1.4,-0.2 2.6,-3.2z" fill="#c8ccd8"/>' +
    '<circle cx="12" cy="7.4" r="3" fill="#e8443f" opacity=".75"/>' +
    '<path d="M9.6,8q2.4,-1.8 4.8,0l-0.6,1.2h-3.6z" fill="#f5b31c"/>' +
    '<g fill="#8a8096" opacity=".8"><ellipse cx="13" cy="4.6" rx="2.6" ry="1.2"/><ellipse cx="15" cy="3" rx="3.2" ry="1.4"/></g>' +
    '<path d="M0,24l4,-8q2,2 4.4,2.6L6,24z" fill="#33394a"/>' +
    '<path d="M12,14.4v5" stroke="#c8452f" stroke-width="1.2" opacity=".7" fill="none"/>',

  /** 川沿いの砦と醸造の樽(バルディビア)。 */
  riverfort:
    '<rect x="0" y="0" width="24" height="13" fill="#cfe4d8"/>' +
    '<rect x="0" y="13" width="24" height="11" fill="#3f7690"/>' +
    '<path d="M2,16.6q4,-1.6 8,0M13,18q4,-1.6 8,0" stroke="#8fc4d8" stroke-width="1.1" opacity=".8" fill="none"/>' +
    '<path d="M1,13.4h14v-6l-1.6,0.8v-2.4l-2.2,1v-2l-3.2,1.6l-3.2,-1.6v2l-2.2,-1v2.4L1,7.4z" fill="#8a8478"/>' +
    '<path d="M1,13.4h14v-1.6H1z" fill="#6b665c"/>' +
    '<g fill="#4a4a44"><rect x="3.4" y="9" width="2.2" height="2.6"/><rect x="7" y="9" width="2.2" height="2.6"/><rect x="10.6" y="9" width="2.2" height="2.6"/></g>' +
    '<path d="M4.5,10.2l-2,-1" stroke="#33302c" stroke-width="1" fill="none"/>' +
    '<path d="M18,13.6q-1.6,-4.6 0,-9h4q1.6,4.4 0,9z" fill="#8a6b3a"/>' +
    '<g stroke="#5f4526" stroke-width="1" fill="none"><path d="M17.4,7.4h5.2M17.4,10.6h5.2"/></g>' +
    '<path d="M16,20.6q4,2 8,0" stroke="#bfe8f4" stroke-width="1" opacity=".6" fill="none"/>' +
    '<path d="M4,20q3,2 7,1.4" stroke="#2f5f74" stroke-width="1.4" opacity=".8" fill="none"/>',

  /** ドイツ風木組みの酪農小屋(オソルノ)。 */
  dairybarn:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#7f9a5f"/>' +
    '<rect x="2.6" y="10" width="18.8" height="12.4" fill="#e8dcc0"/>' +
    '<path d="M1,10.6L12,2l11,8.6l-1,1.4L12,4L2,12z" fill="#7a4a3a"/>' +
    '<path d="M3.4,10h17.2v1.4H3.4z" fill="#c8b894"/>' +
    '<g stroke="#8a6f44" stroke-width="1.2" fill="none"><path d="M2.6,16h18.8M8,10v12.4M16,10v12.4M2.6,10.4l5.4,6M8,10.4l-5.4,6M8,16l8,6.4M16,16l-8,6.4M16,10.4l5.4,6M21.4,10.4l-5.4,6"/></g>' +
    '<rect x="9.6" y="15" width="4.8" height="7.4" fill="#5a4630"/>' +
    '<path d="M9.6,15h4.8v1.2H9.6z" fill="#4a3a26"/>' +
    '<path d="M18.6,22.4v-3.4q0,-1.6 1.4,-1.6q1.4,0 1.4,1.6v3.4z" fill="#a8adb2"/>' +
    '<ellipse cx="20" cy="17.6" rx="1.7" ry="0.7" fill="#8a9298"/>',

  /** バラの咲く湖畔の家のベランダ(プエルト・バラス)。 */
  roseporch:
    '<rect x="0" y="0" width="24" height="7" fill="#bfd8e4"/>' +
    '<rect x="0" y="7" width="24" height="3.4" fill="#5290a8"/>' +
    '<rect x="0" y="10.4" width="24" height="13.6" fill="#7f9a5f"/>' +
    '<rect x="3" y="8" width="18" height="12" fill="#e8dcc0"/>' +
    '<path d="M1.6,8.6L12,1.6L22.4,8.6l-1,1.4L12,3.6L2.6,10z" fill="#7a4a3a"/>' +
    '<g fill="#4a6274"><rect x="6" y="10.6" width="3.4" height="3.6"/><rect x="14.6" y="10.6" width="3.4" height="3.6"/></g>' +
    '<rect x="2" y="16" width="20" height="1.2" fill="#c8b894"/>' +
    '<g stroke="#c8b894" stroke-width="0.9" fill="none"><path d="M3.4,17.2v2.6M6,17.2v2.6M8.6,17.2v2.6M11.2,17.2v2.6M13.8,17.2v2.6M16.4,17.2v2.6M19,17.2v2.6M21.4,17.2v2.6"/></g>' +
    '<rect x="2" y="19.8" width="20" height="1.2" fill="#b0a486"/>' +
    '<path d="M2.6,20.6q-0.8,-6 1.6,-9.4M21.4,20.6q0.8,-6 -1.6,-9.4" stroke="#3f7048" stroke-width="1.2" fill="none"/>' +
    '<g fill="#e8443f"><circle cx="3.4" cy="13.4" r="1.2"/><circle cx="2.8" cy="16.6" r="1.1"/><circle cx="4.6" cy="11" r="1.1"/></g>' +
    '<g fill="#e88ab0"><circle cx="20.6" cy="13.4" r="1.2"/><circle cx="21.2" cy="16.6" r="1.1"/><circle cx="19.4" cy="11" r="1.1"/></g>',

  /** 湖畔の演奏会場の屋根(フルティジャル)。**湖に張り出した劇場。** */
  musicshell:
    '<rect x="0" y="0" width="24" height="14" fill="#bfd8e4"/>' +
    '<rect x="0" y="14" width="24" height="10" fill="#4a86a0"/>' +
    '<path d="M2,18q4,-1.6 8,0M13,19.4q4,-1.6 8,0" stroke="#8fc4d8" stroke-width="1.1" opacity=".8" fill="none"/>' +
    '<g fill="#4a3a2c"><rect x="4" y="15" width="1.8" height="7"/><rect x="10" y="15" width="1.8" height="7"/><rect x="16" y="15" width="1.8" height="7"/><rect x="20.4" y="15" width="1.8" height="7"/></g>' +
    '<rect x="1.6" y="13.4" width="20.8" height="2.2" fill="#6b5330"/>' +
    '<path d="M2.4,13.4V6.6q0,-3.4 4.4,-3.4h9q6,0 6.6,5.4l-2.6,0.4q-0.6,-3.4 -4,-3.4h-9q-1.6,0 -1.6,1.6v6.2z" fill="#8a4a30"/>' +
    '<path d="M4.8,13.4V7q0,-1.6 2,-1.6h8.4q3.4,0 4,3.4l1.4,4.6h-2.6l-1.2,-4q-0.4,-1.6 -2,-1.6H7.4z" fill="#c8b894"/>' +
    '<g stroke="#8a6f44" stroke-width="0.9" opacity=".8" fill="none"><path d="M7,13.4V6.8M10,13.4V6.6M13,13.4V6.6M16,13.4l-0.6,-6"/></g>' +
    '<path d="M18.6,9.4q1.2,-0.6 1.6,-2l0.8,0.2q-0.2,1.8 -1.6,2.6z" fill="#33302c"/>' +
    '<circle cx="21.2" cy="7.2" r="0.8" fill="#33302c"/>',

  /** 古いスペインの砦跡(アンクー)。**帝国の最後の拠点。** */
  wolfcastle:
    '<rect x="0" y="0" width="24" height="15" fill="#c8d4cc"/>' +
    '<rect x="0" y="15" width="24" height="9" fill="#5f8455"/>' +
    '<path d="M1.4,15.4h21.2v-7l-2,1v-2.4l-2.6,1.2v-2.2l-3.4,1.6l-3.4,-1.6v2.2L8.6,7v2.4l-2,-1v2.2l-2,-1v2.2l-3.2,-1.4z" fill="#8a8478"/>' +
    '<path d="M1.4,15.4h21.2v-1.8H1.4z" fill="#6b665c"/>' +
    '<g fill="#4a4a44"><rect x="4.4" y="10.6" width="2.4" height="3"/><rect x="10.8" y="10" width="2.4" height="3.6"/><rect x="17.2" y="10.6" width="2.4" height="3"/></g>' +
    '<path d="M5.6,12l-2.6,-1.2M12,11.4l-2.6,-1.2" stroke="#33302c" stroke-width="1.1" fill="none"/>' +
    '<g stroke="#6b7a5f" stroke-width="1" opacity=".8" fill="none"><path d="M2,17.6q4,1.6 8,0M13,18.6q4,1.6 8,0"/></g>' +
    '<path d="M20,17.4q2.4,1 3.4,3l-1.2,0.8q-1,-1.8 -3,-2.6z" fill="#3f7048"/>' +
    '<ellipse cx="4.4" cy="19.6" rx="2.6" ry="1.2" fill="#3f7048"/>',

  /** 極彩色のパラフィト(カストロ)。**支柱が水に立つ。** */
  stilthouses:
    '<rect x="0" y="0" width="24" height="15" fill="#c8d4cc"/>' +
    '<rect x="0" y="15" width="24" height="9" fill="#3f7690"/>' +
    '<path d="M2,19.4q4,-1.6 8,0M13,20.6q4,-1.6 8,0" stroke="#8fc4d8" stroke-width="1" opacity=".8" fill="none"/>' +
    '<g fill="#4a3a2c"><rect x="2.6" y="14.6" width="1.4" height="7"/><rect x="6.6" y="14.6" width="1.4" height="7"/><rect x="13.6" y="14.6" width="1.4" height="7"/><rect x="17.6" y="14.6" width="1.4" height="7"/><rect x="10.2" y="14.6" width="1.4" height="8"/><rect x="21" y="14.6" width="1.4" height="8"/></g>' +
    '<rect x="1.6" y="13.6" width="10.4" height="1.6" fill="#3a3026"/>' +
    '<rect x="12.8" y="13.6" width="10.4" height="1.6" fill="#3a3026"/>' +
    '<rect x="2" y="6.6" width="9.6" height="7" fill="#e8443f"/>' +
    '<path d="M1,6.6h11.6L6.8,2z" fill="#8a3a2c"/>' +
    '<rect x="4.6" y="8.6" width="2.6" height="3" fill="#33424e"/>' +
    '<rect x="12.8" y="7.6" width="9.6" height="6" fill="#4fb0a0"/>' +
    '<path d="M11.8,7.6h11.6L17.6,3.2z" fill="#2f7a6e"/>' +
    '<rect x="15.4" y="9.4" width="2.6" height="3" fill="#33424e"/>' +
    '<rect x="19.2" y="9.4" width="2" height="2.4" fill="#e8ecf0"/>',

  /** 棘のあるアラウカリアの木(アンゴル)。 */
  araucariapark:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#7f9a5f"/>' +
    '<path d="M10.9,22.4L11.5,6h1l0.6,16.4z" fill="#6b5340"/>' +
    '<g fill="#2f5f44">' +
    '<path d="M12,5.6q-3,-2.6 -6.4,-2.2q2.6,2.6 6,3.4z"/><path d="M12,5.6q3,-2.6 6.4,-2.2q-2.6,2.6 -6,3.4z"/>' +
    '<path d="M12,5.6q-1,-2.6 0,-4.6q1,2 0,4.6z"/>' +
    '<path d="M11.6,9.4q-4,-1.6 -7.6,0.4q3.6,1.6 7.6,1z"/><path d="M12.4,9.4q4,-1.6 7.6,0.4q-3.6,1.6 -7.6,1z"/>' +
    '<path d="M11.6,14q-5,-1.6 -9.4,0.8q4.4,1.8 9.4,0.8z"/><path d="M12.4,14q5,-1.6 9.4,0.8q-4.4,1.8 -9.4,0.8z"/>' +
    '</g>' +
    '<g stroke="#3f8f52" stroke-width="1" fill="none"><path d="M5.6,3.4l-1,-1M18.4,3.4l1,-1M4,9.8l-1.4,-0.2M20,9.8l1.4,-0.2M2.2,14.8l-1.4,0M21.8,14.8l1.4,0"/></g>' +
    '<ellipse cx="6" cy="21.4" rx="2.6" ry="0.9" fill="#5f8455"/>' +
    '<ellipse cx="18" cy="21.6" rx="2.6" ry="0.9" fill="#5f8455"/>',

  /** カレテラ・アウストラルの起点標識(コジャイケ)。**ここから先は未舗装。** */
  roadsend:
    '<rect x="0" y="0" width="24" height="16" fill="#cfe0d8"/>' +
    '<path d="M0,16l7,-9l5,4l4,-6l8,11z" fill="#8a8096"/>' +
    '<path d="M7,7l3.4,2.6l-2.6,1l-2.4,-1.4z" fill="#f2f4f6"/>' +
    '<rect x="0" y="16" width="24" height="8" fill="#b0a068"/>' +
    '<path d="M9,24l2,-8h2l2,8z" fill="#c8b894"/>' +
    '<path d="M11.9,17.4v1.6M11.9,20.6v1.6" stroke="#8a7a52" stroke-width="0.9" fill="none"/>' +
    '<rect x="3.2" y="10.4" width="1.6" height="9.6" fill="#8a8f92"/>' +
    '<rect x="0.6" y="5.4" width="7" height="5" rx="0.8" fill="#2f6b4a"/>' +
    '<path d="M1.8,7h3.4M1.8,8.8h4.4" stroke="#e8ecf0" stroke-width="1" fill="none"/>' +
    '<g stroke="#9a8f5a" stroke-width="1.2" fill="none" stroke-linecap="round"><path d="M19,22q1,-3 2.6,-4M20.6,22.4q0.6,-3 1.6,-4"/></g>' +
    '<path d="M17,3.6q2,-1.6 4,-0.4q-2,-0.2 -4,0.4z" fill="#eef6f8" opacity=".9"/>',

  /** 土砂で埋まった旧桟橋の跡(プエルト・アイセン/プエルト・エデン)。 */
  riverport:
    '<rect x="0" y="0" width="24" height="12" fill="#c8d4cc"/>' +
    '<path d="M0,7h10l-3,5H0z" fill="#5f7568"/>' +
    '<path d="M14,6h10v6H14z" fill="#5f7568"/>' +
    '<rect x="0" y="12" width="24" height="12" fill="#8a7a5f"/>' +
    '<path d="M0,12h24v2q-6,2 -12,1.4q-6,-0.6 -12,0.6z" fill="#9a8a6c"/>' +
    '<path d="M2,17q5,-1.6 10,-0.6M13,19q4,-1 8,-1.4" stroke="#6b5c44" stroke-width="1.1" opacity=".8" fill="none"/>' +
    '<g fill="#5a4a34"><path d="M4,17.6l1.6,-8l1.6,0.2l-1.2,8z"/><path d="M9.4,16.4l0.6,-7h1.6l0,7.4z"/><path d="M15,16.6l-0.6,-7.4l1.6,-0.2l1,7.6z"/><path d="M19.6,18l-1,-7.6l1.6,-0.2l1.4,7.8z"/></g>' +
    '<path d="M3,10.4h19" stroke="#5a4a34" stroke-width="1.2" opacity=".6" fill="none"/>' +
    '<path d="M6,21.4q7,-2 13,0q-6,1.4 -13,0z" fill="#6b5330"/>' +
    '<path d="M8,20.4h9" stroke="#4a3a24" stroke-width="0.9" fill="none"/>',

  /** 大理石の洞窟(チレ・チコ)。**水に磨かれた渦の岩。** */
  marblecaves:
    '<rect x="0" y="0" width="24" height="24" fill="#57c8c0"/>' +
    '<path d="M0,0h24v6H0z" fill="#9fd4e4"/>' +
    '<path d="M0,6h4l3,7l-2,11H0z" fill="#8a92a4"/>' +
    '<path d="M24,6h-6l-3,6l2,12h7z" fill="#8a92a4"/>' +
    '<path d="M4,6h14l-3,6h-8z" fill="#a8b0c0"/>' +
    '<path d="M7,13h8l-2,11H9z" fill="#1f8f88"/>' +
    '<g stroke="#e8ecf4" stroke-width="1.2" opacity=".85" fill="none"><path d="M2,9q2,1.6 1.6,4M20,8q-2,2 -1.6,4.6M6,7.4q3,1 6,0.4q3,-0.6 5,0.2"/></g>' +
    '<g stroke="#5f6a84" stroke-width="1" opacity=".7" fill="none"><path d="M3.4,15q1.6,1.6 1,3.6M19.6,14q-1.4,2 -0.8,4.4"/></g>' +
    '<path d="M8.6,20q3.4,1.6 6.8,0" stroke="#bfe8f4" stroke-width="1" opacity=".8" fill="none"/>' +
    '<path d="M9.4,22.6q2.6,1.2 5.2,0q-2.6,-1 -5.2,0z" fill="#c8a13f"/>',

  /** 馬に乗った牧夫と中継小屋(コクラン)。 */
  gauchopost:
    '<rect x="0" y="0" width="24" height="16" fill="#cfe0d8"/>' +
    '<path d="M0,16l8,-8l6,6l4,-7l6,9z" fill="#8a8096"/>' +
    '<path d="M8,8l3,3l-2.4,1L6,10z" fill="#f2f4f6"/>' +
    '<rect x="0" y="16" width="24" height="8" fill="#b0a068"/>' +
    '<rect x="1.6" y="12" width="6.4" height="4.6" fill="#a8895c"/>' +
    '<path d="M0.8,12h8l-1.2,-2.6H2z" fill="#6b5330"/>' +
    '<rect x="3.8" y="13.6" width="1.8" height="3" fill="#4a3a26"/>' +
    '<g><path d="M12.4,20.4q0.4,-3.4 3.4,-3.4h3q2.6,0 2.6,2.4l-0.8,1z" fill="#5a4630"/>' +
    '<path d="M20.6,18.6q1.6,-0.6 1.8,-2.4l1,0.4q-0.2,2.2 -1.8,3z" fill="#5a4630"/>' +
    '<circle cx="23" cy="15.4" r="0.9" fill="#5a4630"/>' +
    '<g stroke="#5a4630" stroke-width="1.2" fill="none"><path d="M13.4,20.4v3M16,20.4v3M18.6,20.4v3M20.8,20.2v3.2"/></g>' +
    '<path d="M12.4,20.4q-1.4,0.6 -1.2,2.4" stroke="#5a4630" stroke-width="1" fill="none"/>' +
    '<path d="M15.8,17l0.4,-3.6h2l0.4,3.6z" fill="#8a4a30"/>' +
    '<circle cx="17" cy="12.2" r="1.3" fill="#c98f5f"/>' +
    '<path d="M15.2,11.4h3.8l-0.5,-1h-2.8z" fill="#3f3428"/>' +
    '<path d="M15.6,14.6l-1.8,1.4" stroke="#8a4a30" stroke-width="1" fill="none"/></g>' +
    '<g stroke="#9a8f5a" stroke-width="1.1" fill="none" stroke-linecap="round"><path d="M2.6,23q1,-2.6 2.4,-3.6M4.6,23.4q0.6,-2.6 1.6,-3.6"/></g>',

  /** 洞窟とミロドンの骨(プエルト・ナタレス)。**1万年前の毛と皮が残っていた。** */
  milodonbones:
    '<rect x="0" y="0" width="24" height="20" fill="#b0bcc4"/>' +
    '<path d="M0,20V6q4,-5 12,-5q8,0 12,5v14z" fill="#7a6a56"/>' +
    '<path d="M3,20v-9q3,-6 9,-6q6,0 9,6v9z" fill="#4a3f32"/>' +
    '<path d="M5.6,20v-7.4q2.4,-4.6 6.4,-4.6q4,0 6.4,4.6V20z" fill="#2a241c"/>' +
    '<rect x="0" y="20" width="24" height="4" fill="#8a7a5f"/>' +
    '<g fill="#e8e0cc"><path d="M7,19.6q0.2,-3.4 2,-5l0.9,0.8q-1.5,1.6 -1.7,4.4z"/><path d="M11,19.4q0,-2.6 1.4,-4.2l0.9,0.7q-1.2,1.5 -1.2,3.6z"/><ellipse cx="15.6" cy="18.6" rx="2.2" ry="1"/><circle cx="17.2" cy="16.6" r="0.9"/><circle cx="14.2" cy="16.9" r="0.7"/></g>' +
    '<path d="M2,5.6q3,-2.6 6,-3.4M18,2.6q3,1.2 5,3.4" stroke="#93826c" stroke-width="1.1" opacity=".8" fill="none"/>' +
    '<g stroke="#5f8455" stroke-width="1.2" fill="none" stroke-linecap="round"><path d="M1.6,22.6q0.8,-2 2,-2.8M21.4,22.8q-0.6,-2 -1.6,-2.8"/></g>',

  /** 羊毛を積んだ倉庫(プンタ・アレナス)。**海峡の富はこの俵だった。** */
  woolwarehouse:
    '<rect x="0.8" y="22.4" width="22.4" height="1.6" rx="0.6" fill="#8a8272"/>' +
    '<rect x="2" y="9.6" width="20" height="12.8" fill="#a86a48"/>' +
    '<path d="M0.8,10L12,3l11.2,7l-0.9,1.4L12,5.2L1.7,11.4z" fill="#7f4a30"/>' +
    '<g stroke="#8a5638" stroke-width="0.9" opacity=".7" fill="none"><path d="M2,13h20M2,16.4h20"/></g>' +
    '<rect x="9.6" y="14.6" width="4.8" height="7.8" fill="#5a4630"/>' +
    '<path d="M9.6,14.6h4.8v1.2H9.6z" fill="#4a3a26"/>' +
    '<rect x="4" y="11" width="3.4" height="2.6" fill="#4a6274"/>' +
    '<rect x="16.6" y="11" width="3.4" height="2.6" fill="#4a6274"/>' +
    '<g fill="#e8e4d8"><ellipse cx="5.4" cy="20.4" rx="2.8" ry="2"/><ellipse cx="18.6" cy="20.4" rx="2.8" ry="2"/><ellipse cx="18.6" cy="17.2" rx="2.4" ry="1.7"/></g>' +
    '<g stroke="#b0a88a" stroke-width="0.8" fill="none"><path d="M2.8,20.4h5.2M16,20.4h5.2M16.4,17.2h4.4M5.4,18.6v3.6M18.6,18.6v3.6"/></g>',

  /** 砂金採りの皿(ポルベニル)。**ティエラ・デル・フエゴの金鉱熱。** */
  goldpan:
    '<rect x="0" y="0" width="24" height="13" fill="#c8d4cc"/>' +
    '<rect x="0" y="13" width="24" height="11" fill="#4a86a0"/>' +
    '<path d="M2,16.6q4,-1.6 8,0M13,18.4q4,-1.6 8,0M5,21q4,-1.6 8,0" stroke="#8fc4d8" stroke-width="1.1" opacity=".8" fill="none"/>' +
    '<path d="M2.6,8.6a9.4,6.6 0 0 0 18.8,0z" fill="#6b6256"/>' +
    '<path d="M4.6,8.6a7.4,5 0 0 0 14.8,0z" fill="#8a8478"/>' +
    '<path d="M6.6,8.6a5.4,3.4 0 0 0 10.8,0z" fill="#5f5044"/>' +
    '<path d="M7.4,8.6a4.6,2.6 0 0 0 9.2,0z" fill="#7a6a52"/>' +
    '<g fill="#f5b31c"><circle cx="10.4" cy="9.6" r="0.9"/><circle cx="13.2" cy="10" r="0.8"/><circle cx="12" cy="8.9" r="0.7"/><circle cx="14.6" cy="9.2" r="0.6"/></g>' +
    '<path d="M2.6,8.6h18.8" stroke="#4a4238" stroke-width="1" fill="none"/>' +
    '<g fill="#8a8478"><ellipse cx="4" cy="22" rx="2.2" ry="1"/><ellipse cx="20" cy="22.4" rx="2.4" ry="1.1"/></g>',

  /** 道の終わりの標識と氷原(ビジャ・オイギンス)。**その先は南氷原。** */
  roadend:
    '<rect x="0" y="0" width="24" height="10" fill="#bfd8e4"/>' +
    '<path d="M0,10l6,-6l5,4l4,-5l9,7z" fill="#6b6478"/>' +
    '<g fill="#f2f4f6"><path d="M6,4l3,2.6l-2.4,0.8L4.4,5.4z"/><path d="M15,3l3.4,2.6l-2.6,0.8l-2.4,-1.8z"/></g>' +
    '<path d="M0,10h24v5q-12,3 -24,0z" fill="#dceef4"/>' +
    '<g stroke="#8fc4d8" stroke-width="1" opacity=".8" fill="none"><path d="M3,12.4q3,1 6,0.4M14,13q3,0.8 6,0"/></g>' +
    '<rect x="0" y="15" width="24" height="9" fill="#b0a068"/>' +
    '<path d="M8,24l1.6,-6.6q2.4,-1 4.8,0L16,24z" fill="#c8b894"/>' +
    '<g stroke="#c8452f" stroke-width="2.2" fill="none"><path d="M4,18.4l4.4,0M4,18.4l-1.6,3.4M8.4,18.4l1.6,3.4"/></g>' +
    '<path d="M4.2,17.2h4v1.2h-4z" fill="#f2f4f6"/>' +
    '<rect x="17.6" y="10.6" width="1.4" height="9.4" fill="#8a8f92"/>' +
    '<rect x="15.6" y="6" width="5.4" height="4.6" rx="0.8" fill="#2f6b4a"/>' +
    '<path d="M16.6,7.6h2.6M16.6,9.2h3.4" stroke="#e8ecf0" stroke-width="0.9" fill="none"/>',

  /** 世界最南端の標識と灯台(プエルト・ウィリアムズ)。 */
  southernmosttown:
    '<rect x="0" y="0" width="24" height="12" fill="#b0c4d4"/>' +
    '<path d="M0,12l5,-7l4,4l3,-5l4,6l3,-4l5,6z" fill="#5f5a70"/>' +
    '<g fill="#e8ecf0"><path d="M5,5l2.6,2.6l-2,0.8L4,6.6z"/><path d="M12,4l2.6,3l-2,0.6l-2,-2.2z"/><path d="M19,6l2.4,2.4l-2,0.6l-1.6,-1.8z"/></g>' +
    '<rect x="0" y="12" width="24" height="5" fill="#3f6480"/>' +
    '<path d="M2,14q3,-1.2 6,0M14,14.6q3,-1.2 6,0" stroke="#7fa8bc" stroke-width="1" opacity=".8" fill="none"/>' +
    '<rect x="0" y="17" width="24" height="7" fill="#7f8a62"/>' +
    '<g><rect x="14.6" y="8.6" width="4.4" height="3" fill="#c8452f"/><rect x="14.6" y="11.6" width="4.4" height="3" fill="#f2f4f6"/><rect x="14.2" y="14.6" width="5.2" height="3" fill="#c8452f"/><rect x="15.2" y="6.6" width="3.2" height="2" fill="#33302c"/><rect x="15.8" y="7" width="2" height="1.2" fill="#f5d34c"/></g>' +
    '<rect x="5.4" y="10.4" width="1.4" height="10" fill="#8a6f44"/>' +
    '<g fill="#e8dcc0"><path d="M6.6,11l6,0.8l-1.4,1.4l1.4,1.4l-6,0.8z"/><path d="M5.6,16l-4.6,0.6l1.2,1.2l-1.2,1.2l4.6,0.6z"/></g>' +
    '<g stroke="#8a6f44" stroke-width="0.7" fill="none"><path d="M7.4,12.4h3M2.4,17.6h2.4"/></g>',
};



