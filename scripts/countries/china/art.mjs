/**
 * 中国の都市イラスト。
 *
 * `CHINA_MARKS` は24×24の座標系に描くシンボル、`CHINA_BG` は400×210の
 * 座標系に描く背景シーン(いずれもSVG断片の文字列)。他の盤面と同じく
 * 最初から文字列として持つ。動きは含めない(アニメーションはReact側で重ねる)。
 *
 * 色は他の盤面と揃える(空 #8fc4e8〜#cfe4f0、顔・白 #f6efe2、
 * 強調 #f5b31c/#e8443f/#5b8fe8)。中国らしさは `flavour.mjs` の
 * `CHINA_META.stripe`(故宮の朱・玉の緑・青花磁器の藍・宣紙の白)と揃え、
 * **朱 #c8102e・金 #d4a017・玉の緑 #3f8f6f・磁器の藍 #1a4a8f、
 * 瓦の黒灰 #4a4a52、黄土 #a67a52、竹の緑 #5f9c5c、兵馬俑の陶土 #8a7355**
 * で出す。
 *
 * 鍵は `cities.mjs` の `mark` / `bg` と一対一で対応する(bg16種・mark20種)。
 * 増やすときは両方を揃えること。
 *
 * 背景1枚あたりの目安要素数は約40(`docs/50-authoring/12-city-background-guide.md`
 * §3の測り方=SVGタグ数(`<g>`含む)で数える。韓国は同じ数え方で27、
 * フランスは94)。§3の4か条(層を5〜6枚にする/手前を空けない/人を置く/
 * 時間帯を変える)を意識して1枚ずつ厚くしてある。
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

function moon(cx, cy, r, fill = "#f6efe2") {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" opacity=".92"/>`;
}

function clouds(cx, cy, scale = 1, fill = "#f6efe2") {
  const e = (dx, rx, ry) =>
    `<ellipse cx="${r1(cx + dx * scale)}" cy="${cy}" rx="${r1(rx * scale)}" ry="${r1(ry * scale)}"/>`;
  return `<g opacity=".8" fill="${fill}">${e(0, 18, 7)}${e(-10, 11, 5.5)}${e(11, 13, 5.5)}</g>`;
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

/** 靄の帯(遠景をぼかして奥行きを出す)。カルスト地形の山あいに使う。 */
function mist(y, h, fill = "#eef3ee", o = ".55") {
  return `<rect x="0" y="${y}" width="${W}" height="${h}" fill="${fill}" opacity="${o}"/>`;
}

/** 波の反射線・水面。 */
function ripples(y, color = "#bfe8f4") {
  return `<g stroke="${color}" stroke-width="2" opacity=".7" fill="none"><path d="M26,${y}h74M176,${y + 12}h92M108,${y + 24}h62"/></g>`;
}

/**
 * 水に浮かぶ小舟。§4.6の3点を守る: さざ波を遮る・舷の内側に暗い三日月・
 * 真下に映り込みの筋。**ripples() より後に呼ぶこと。**
 */
function boat(x, y, w = 26, hull = "#6b5330") {
  const hw = r1(w / 2);
  return (
    `<path d="M${r1(x - hw)},${y}c${r1(hw * 0.2)},6 ${r1(hw * 1.8)},6 ${w},0l-3,7h${-w + 6}z" fill="${hull}"/>` +
    `<path d="M${r1(x - hw * 0.5)},${r1(y + 1.5)}c${r1(hw * 0.3)},2.4 ${r1(hw * 0.7)},2.4 ${r1(hw)},0" fill="none" stroke="#3f2f1f" stroke-width="1.4" opacity=".7"/>` +
    `<path d="M${x},${r1(y + 9)}v6" stroke="${hull}" stroke-width="1.6" opacity=".5"/>`
  );
}

function gull(x, y, scale = 1) {
  const w = 8 * scale;
  return `<path d="M${r1(x - w)},${y}q${r1(w / 2)},-6 ${w},0q${r1(w / 2)},-6 ${w},0" fill="none" stroke="#4a4a52" stroke-width="1.4"/>`;
}

/** 起重機(港のクレーン)。 */
function crane(x, base, h, fill = "#e8443f") {
  return (
    `<rect x="${r1(x - 2)}" y="${r1(base - h)}" width="4" height="${h}" fill="${fill}"/>` +
    `<rect x="${r1(x - 2)}" y="${r1(base - h)}" width="${r1(h * 0.72)}" height="4" fill="${fill}"/>` +
    `<line x1="${r1(x + h * 0.6)}" y1="${r1(base - h + 2)}" x2="${r1(x + h * 0.6)}" y2="${r1(base - h * 0.55)}" stroke="${fill}" stroke-width="2"/>`
  );
}

/** 小さな人物。20px前後で置くと町に生きた気配が出て、大きさの手がかりにもなる。 */
function person(x, base, h = 18, shirt = "#5b8fe8", skin = "#e0b48a") {
  const headR = r1(h * 0.16);
  const bodyH = r1(h - headR * 2.2);
  return (
    `<circle cx="${x}" cy="${r1(base - h + headR)}" r="${headR}" fill="${skin}"/>` +
    `<rect x="${r1(x - h * 0.13)}" y="${r1(base - h + headR * 2.1)}" width="${r1(h * 0.26)}" height="${bodyH}" rx="1.4" fill="${shirt}"/>` +
    `<rect x="${r1(x - h * 0.13)}" y="${base - 2}" width="${r1(h * 0.1)}" height="2" fill="#2a241c"/>` +
    `<rect x="${r1(x + h * 0.03)}" y="${base - 2}" width="${r1(h * 0.1)}" height="2" fill="#2a241c"/>`
  );
}

/** 田・段々畑の畝(横線)。 */
function paddyRows(x, y, w, rows = 3, color = "#7fa8c4") {
  const parts = [];
  for (let i = 0; i < rows; i++) parts.push(`<path d="M${x},${r1(y + i * 7)}h${w}"/>`);
  return `<g stroke="${color}" stroke-width="3" opacity=".75">${parts.join("")}</g>`;
}

/** 花畑・茶畑の横畝(丸い茂みの列)。数珠つなぎで要素数を稼げる。 */
function shrubRow(x, y, count, gap, r, color) {
  const parts = [];
  for (let i = 0; i < count; i++) parts.push(`<circle cx="${r1(x + i * gap)}" cy="${y}" r="${r}" fill="${color}"/>`);
  return `<g opacity=".9">${parts.join("")}</g>`;
}

/** 段畑の擁壁(段差の目地)。手前ほど広い段を持つ棚田・茶畑に。 */
function terraceWall(y, h, fill = "#cfc7b4", joint = "#a2977f") {
  const step = 18;
  const joints = [];
  for (let x = step / 2; x < W; x += step) joints.push(`M${r1(x)},${y}v${h - 2}`);
  return (
    `<rect x="0" y="${y}" width="${W}" height="${h}" fill="${fill}"/>` +
    `<rect x="0" y="${r1(y + h - 2)}" width="${W}" height="2" fill="${joint}"/>` +
    `<g stroke="${joint}" stroke-width="1.2" fill="none" opacity=".7"><path d="${joints.join("")}"/></g>`
  );
}

/** 松。北方の山や海岸に多い。 */
function pine(x, base, h, fill = "#2f5f3f") {
  const w = r1(h * 0.6);
  return (
    `<rect x="${r1(x - 2)}" y="${r1(base - 8)}" width="4" height="8" fill="#5a4630"/>` +
    `<path d="M${r1(x - w / 2)},${r1(base - h * 0.32)}L${x},${r1(base - h * 0.62)}L${r1(x + w / 2)},${r1(base - h * 0.32)}z" fill="${fill}"/>` +
    `<path d="M${r1(x - w * 0.42)},${r1(base - h * 0.6)}L${x},${r1(base - h * 0.86)}L${r1(x + w * 0.42)},${r1(base - h * 0.6)}z" fill="${fill}"/>` +
    `<path d="M${r1(x - w * 0.3)},${r1(base - h * 0.84)}L${x},${r1(base - h)}L${r1(x + w * 0.3)},${r1(base - h * 0.84)}z" fill="${fill}"/>`
  );
}

/**
 * 竹。中国らしさの核の一つ。節のある細い幹を数本まとめて生やし、
 * 葉は左右へ細い三角の房で出す(針葉樹と混同しないよう、葉を非対称に振る)。
 */
function bambooClump(x, base, h, count = 3, fill = "#5f9c5c") {
  const parts = [];
  for (let i = 0; i < count; i++) {
    const sx = r1(x + (i - (count - 1) / 2) * 7);
    const sh = r1(h * (0.82 + 0.09 * (i % 3)));
    const top = r1(base - sh);
    parts.push(
      `<path d="M${sx},${base}v${-sh}" stroke="${fill}" stroke-width="2.4" fill="none"/>`,
      `<g stroke="${fill}" stroke-width="1.4" opacity=".7"><path d="M${r1(sx - 1.6)},${r1(base - sh * 0.3)}h3.2M${r1(sx - 1.6)},${r1(base - sh * 0.55)}h3.2M${r1(sx - 1.6)},${r1(base - sh * 0.8)}h3.2"/></g>`,
      // 葉(細い塗りの笹形。線1本だと風車の羽根に見えてしまうため面にする)
      `<path d="M${sx},${top}Q${r1(sx + 7)},${r1(top - 7)} ${r1(sx + 15)},${r1(top - 9)}Q${r1(sx + 6)},${r1(top - 4)} ${sx},${top}z" fill="${fill}"/>`,
      `<path d="M${sx},${r1(top + 5)}Q${r1(sx - 7)},${r1(top - 1)} ${r1(sx - 14)},${r1(top - 6)}Q${r1(sx - 5)},${r1(top + 3)} ${sx},${r1(top + 5)}z" fill="${fill}"/>`,
    );
  }
  return `<g>${parts.join("")}</g>`;
}

/** 柳。江南の水郷に多い、垂れる枝。 */
function willow(x, base, h, fill = "#6a9c5c") {
  const w = r1(h * 0.7);
  const droop = [];
  for (let i = 0; i < 5; i++) {
    const dx = r1(-w / 2 + (i * w) / 4);
    droop.push(`M${r1(x + dx)},${r1(base - h * 0.55)}q${r1(-dx * 0.15)},${r1(h * 0.3)} ${r1(-dx * 0.1)},${r1(h * 0.42)}`);
  }
  return (
    `<rect x="${r1(x - 3)}" y="${r1(base - h * 0.55)}" width="6" height="${r1(h * 0.55)}" fill="#6b5330"/>` +
    `<ellipse cx="${x}" cy="${r1(base - h * 0.62)}" rx="${r1(w / 2)}" ry="${r1(h * 0.22)}" fill="${fill}"/>` +
    `<g stroke="${fill}" stroke-width="1.6" fill="none" opacity=".85">${droop.join("")}</g>`
  );
}

/**
 * 中国式の切妻・入母屋屋根。両端が反り上がる曲線と、朱の壁が特徴。
 * 韓国の反り屋根(牛角形)より棟が長く、瓦は暗い黒灰にする。
 */
function chineseRoof(x, base, w, h, roof = "#4a4a52", wall = "#c8102e") {
  const hw = r1(w / 2);
  const eave = r1(hw + h * 0.32);
  return (
    `<rect x="${r1(x - hw * 0.82)}" y="${r1(base - h * 0.6)}" width="${r1(hw * 1.64)}" height="${r1(h * 0.6)}" fill="${wall}"/>` +
    `<rect x="${r1(x - hw * 0.82)}" y="${r1(base - h * 0.6)}" width="${r1(hw * 1.64)}" height="3" fill="#6b0f1c"/>` +
    `<path d="M${r1(x - eave)},${r1(base - h * 0.58)}Q${r1(x - hw * 0.5)},${r1(base - h * 1.06)} ${x},${r1(base - h)}Q${r1(x + hw * 0.5)},${r1(base - h * 1.06)} ${r1(x + eave)},${r1(base - h * 0.58)}Q${r1(x + eave - 9)},${r1(base - h * 0.48)} ${x},${r1(base - h * 0.64)}Q${r1(x - eave + 9)},${r1(base - h * 0.48)} ${r1(x - eave)},${r1(base - h * 0.58)}z" fill="${roof}"/>`
  );
}

/**
 * 楼閣型の塔(多重の反り屋根を重ねる、天壇や鐘楼ふう)。層を積むだけで
 * 要素数が自然に増える。
 */
function towerHall(x, base, w, h, tiers = 2, roof = "#4a4a52", wall = "#c8102e") {
  const parts = [];
  const tierH = r1(h / tiers);
  for (let i = 0; i < tiers; i++) {
    const tw = r1(w * (1 - i * 0.22));
    const b = r1(base - i * tierH * 0.86);
    parts.push(chineseRoof(x, b, tw, tierH, roof, wall));
  }
  return parts.join("");
}

/** 多重塔(仏塔)。四角い階を積み上げ、上に向かって細くする。 */
function pagoda(x, base, tiers, tierH, w0, fill = "#8a7f6a") {
  const parts = [];
  for (let i = 0; i < tiers; i++) {
    const w = r1(w0 * (1 - i * 0.13));
    const y = r1(base - (i + 1) * tierH);
    parts.push(
      `<rect x="${r1(x - w / 2)}" y="${y}" width="${w}" height="${r1(tierH - 2)}" fill="${fill}"/>`,
      `<path d="M${r1(x - w / 2 - 3)},${y}h${r1(w + 6)}l${-3},-6h${-w}z" fill="#4a4a52"/>`,
    );
  }
  return parts.join("");
}

/** 提灯1つ。 */
function lantern(x, y, r = 5, fill = "#c8102e") {
  return (
    `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r1(r * 1.15)}" fill="${fill}"/>` +
    `<rect x="${r1(x - 1)}" y="${r1(y - r * 1.15 - 3)}" width="2" height="3" fill="#4a4436"/>` +
    `<rect x="${r1(x - 0.6)}" y="${r1(y + r * 1.15)}" width="1.2" height="4" fill="#d4a017"/>`
  );
}

/** 提灯の列。1回の呼び出しで多数の要素を稼げる密度の主力。 */
function lanternRow(x, y, count, gap, r = 5) {
  const parts = [];
  for (let i = 0; i < count; i++) parts.push(lantern(r1(x + i * gap), r1(y + Math.sin(i) * 2), r));
  return `<g>${parts.join("")}</g>`;
}

/**
 * 兵馬俑ふうの小さな人型を並べる列。等身大の陶製の兵士がずらりと並ぶ様子を
 * 単純化して表す。胴を肩幅ぶん広くし、肩当てで人の形を作らないと
 * 柵の杭に見えてしまう(実測で確認済み)。
 */
function figureRow(x, y, count, gap, h = 14, fill = "#8a7355") {
  const parts = [];
  const headR = r1(h * 0.2);
  const bodyW = r1(h * 0.42);
  const bodyH = r1(h * 0.62);
  for (let i = 0; i < count; i++) {
    const fx = r1(x + i * gap);
    const legY = r1(y - h * 0.22);
    const shoulderY = r1(legY - bodyH * 0.82);
    parts.push(
      `<rect x="${r1(fx - bodyW * 0.26)}" y="${legY}" width="${r1(bodyW * 0.2)}" height="${r1(h * 0.22)}" fill="${fill}"/>`,
      `<rect x="${r1(fx + bodyW * 0.06)}" y="${legY}" width="${r1(bodyW * 0.2)}" height="${r1(h * 0.22)}" fill="${fill}"/>`,
      `<rect x="${r1(fx - bodyW / 2)}" y="${r1(legY - bodyH)}" width="${bodyW}" height="${bodyH}" rx="1" fill="${fill}"/>`,
      `<rect x="${r1(fx - bodyW * 0.72)}" y="${shoulderY}" width="${r1(bodyW * 0.24)}" height="${r1(bodyH * 0.5)}" fill="${fill}"/>`,
      `<rect x="${r1(fx + bodyW * 0.48)}" y="${shoulderY}" width="${r1(bodyW * 0.24)}" height="${r1(bodyH * 0.5)}" fill="${fill}"/>`,
      `<circle cx="${fx}" cy="${r1(legY - bodyH - headR)}" r="${headR}" fill="${fill}"/>`,
    );
  }
  return `<g>${parts.join("")}</g>`;
}

/**
 * カルスト(石灰岩)の孤立峰。桂林・貴陽らしい、木とまぎれないよう
 * 幹に相当する部分を作らず、根元から丸い頂まで一枚岩の柱として立たせる。
 */
function karstPeak(cx, base, h, fill = "#7a9070") {
  const w = r1(h * 0.36);
  return (
    `<path d="M${r1(cx - w / 2)},${base}L${r1(cx - w / 2)},${r1(base - h * 0.68)}Q${r1(cx - w / 2)},${r1(base - h)} ${cx},${r1(base - h)}Q${r1(cx + w / 2)},${r1(base - h)} ${r1(cx + w / 2)},${r1(base - h * 0.68)}L${r1(cx + w / 2)},${base}z" fill="${fill}"/>` +
    `<path d="M${r1(cx - w * 0.16)},${r1(base - h * 0.12)}v${r1(-h * 0.55)}M${r1(cx + w * 0.14)},${r1(base - h * 0.3)}v${r1(-h * 0.4)}" stroke="#5f7a5a" stroke-width="1" opacity=".5"/>`
  );
}

/** 花崗岩の山。黄山らしい、稜線が鋭く白っぽい岩肌。 */
function graniteMountain(cx, base, h, fill = "#8b8f98") {
  const w = r1(h * 1.3);
  return (
    `<path d="M${r1(cx - w / 2)},${base}L${r1(cx - w * 0.12)},${r1(base - h)}L${r1(cx + w * 0.1)},${r1(base - h * 0.62)}L${r1(cx + w / 2)},${base}z" fill="${fill}"/>` +
    `<path d="M${r1(cx - w * 0.12)},${r1(base - h)}L${r1(cx - w * 0.02)},${r1(base - h * 0.8)}L${r1(cx + w * 0.04)},${r1(base - h * 0.86)}z" fill="#f2f6f8"/>`
  );
}

/** 雪をいただく高山。青海・チベット高原らしい。 */
function snowPeak(cx, base, h, fill = "#7f8896") {
  const w = r1(h * 1.1);
  return (
    `<path d="M${r1(cx - w / 2)},${base}L${cx},${r1(base - h)}L${r1(cx + w / 2)},${base}z" fill="${fill}"/>` +
    `<path d="M${cx},${r1(base - h)}L${r1(cx - w * 0.16)},${r1(base - h * 0.72)}L${r1(cx - w * 0.06)},${r1(base - h * 0.68)}L${r1(cx + w * 0.02)},${r1(base - h * 0.8)}L${r1(cx + w * 0.16)},${r1(base - h * 0.74)}z" fill="#f6efe2"/>`
  );
}

/** タルチョー(祈祷旗)を渡したロープ。チベット高原らしさの手がかり。 */
function prayerFlags(x, y, w, count = 6) {
  const colors = ["#3f8fc4", "#f6efe2", "#c8102e", "#d4a017", "#3f8f6f"];
  const parts = [`<path d="M${x},${y}h${w}" stroke="#8a8478" stroke-width="1.2" fill="none"/>`];
  for (let i = 0; i < count; i++) {
    const fx = r1(x + (i * w) / (count - 1));
    parts.push(`<path d="M${r1(fx - 3)},${y}h6l-3,7z" fill="${colors[i % colors.length]}"/>`);
  }
  return `<g>${parts.join("")}</g>`;
}

/** 高層ビル1棟(輪郭のみ)。 */
function towerBlock(x, y, w, h, fill = "#8f96a0") {
  return `<rect x="${r1(x)}" y="${r1(y)}" width="${r1(w)}" height="${r1(h)}" fill="${fill}"/>`;
}

/** ビルの窓を格子状に並べる。1呼び出しで要素数を大きく稼げる密度の主力。 */
function windowGrid(x, y, w, h, cols, rows, color = "#c8e0f0", opacity = ".6") {
  const gx = w / cols;
  const gy = h / rows;
  const parts = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      parts.push(
        `<rect x="${r1(x + c * gx + gx * 0.22)}" y="${r1(y + r * gy + gy * 0.22)}" width="${r1(gx * 0.56)}" height="${r1(gy * 0.56)}" fill="${color}"/>`,
      );
    }
  }
  return `<g opacity="${opacity}">${parts.join("")}</g>`;
}

/** 帆掛け船(中国式ジャンク)。横に渡した帆桁が特徴。 */
function junk(x, base, w = 46, hull = "#6b5330", sail = "#c9a877") {
  const hw = r1(w / 2);
  return (
    `<path d="M${r1(x - hw)},${base}c${r1(hw * 0.2)},7 ${r1(hw * 1.8)},7 ${w},0l-4,8h${-w + 8}z" fill="${hull}"/>` +
    `<rect x="${x}" y="${r1(base - w * 0.9)}" width="2" height="${r1(w * 0.9)}" fill="#4a4436"/>` +
    `<g fill="${sail}" opacity=".92"><path d="M${x},${r1(base - w * 0.86)}h${r1(w * 0.6)}l${r1(-w * 0.08)},${r1(w * 0.22)}h${r1(-w * 0.52)}z"/><path d="M${x},${r1(base - w * 0.58)}h${r1(w * 0.5)}l${r1(-w * 0.07)},${r1(w * 0.2)}h${r1(-w * 0.43)}z"/></g>` +
    `<g stroke="#4a4436" stroke-width=".8" opacity=".6"><path d="M${x},${r1(base - w * 0.78)}h${r1(w * 0.52)}M${x},${r1(base - w * 0.5)}h${r1(w * 0.43)}"/></g>`
  );
}

/** 砂丘。曲線の稜線を重ねて描く。 */
function dune(baseY, h, fill) {
  return `<path d="M0,${210}L0,${baseY}Q${r1(W * 0.3)},${r1(baseY - h)} ${r1(W * 0.55)},${baseY}Q${r1(W * 0.8)},${r1(baseY + h * 0.4)} ${W},${r1(baseY - h * 0.3)}L${W},210z" fill="${fill}"/>`;
}

/** ラクダ。背の上に山が1つ、その前に首が斜めに立ち上がり、頭は背より高い形を守る。 */
function camel(x, base, s = 1, fill = "#c9a877") {
  const legY = r1(base - 2 * s);
  return (
    `<g fill="${fill}">` +
    `<rect x="${r1(x - 10 * s)}" y="${legY}" width="${r1(2.2 * s)}" height="${r1(8 * s)}"/>` +
    `<rect x="${r1(x - 2 * s)}" y="${legY}" width="${r1(2.2 * s)}" height="${r1(8 * s)}"/>` +
    `<rect x="${r1(x + 4 * s)}" y="${legY}" width="${r1(2.2 * s)}" height="${r1(8 * s)}"/>` +
    `<path d="M${r1(x - 12 * s)},${legY}Q${r1(x - 13 * s)},${r1(base - 10 * s)} ${r1(x - 6 * s)},${r1(base - 9 * s)}Q${r1(x - 4 * s)},${r1(base - 15 * s)} ${x},${r1(base - 14 * s)}Q${r1(x + 4 * s)},${r1(base - 15 * s)} ${r1(x + 2 * s)},${r1(base - 9 * s)}Q${r1(x + 10 * s)},${r1(base - 10 * s)} ${r1(x + 9 * s)},${legY}z"/>` +
    // 首(斜めに立ち上がり、頭は背より高い)
    `<path d="M${r1(x + 7 * s)},${r1(base - 13 * s)}Q${r1(x + 13 * s)},${r1(base - 20 * s)} ${r1(x + 14 * s)},${r1(base - 26 * s)}Q${r1(x + 17 * s)},${r1(base - 27 * s)} ${r1(x + 15 * s)},${r1(base - 22 * s)}Q${r1(x + 12 * s)},${r1(base - 17 * s)} ${r1(x + 9 * s)},${r1(base - 12 * s)}z"/>` +
    `</g>`
  );
}

/** 石獅子(牌坊・廟門の対の獅子像)。 */
function stoneLion(x, base, h = 16, fill = "#9a9ea4") {
  return (
    `<ellipse cx="${x}" cy="${r1(base - h * 0.3)}" rx="${r1(h * 0.42)}" ry="${r1(h * 0.34)}" fill="${fill}"/>` +
    `<circle cx="${x}" cy="${r1(base - h * 0.68)}" r="${r1(h * 0.3)}" fill="${fill}"/>` +
    `<circle cx="${r1(x - h * 0.1)}" cy="${r1(base - h * 0.7)}" r="1.6" fill="#2a241c"/>` +
    `<rect x="${r1(x - h * 0.14)}" y="${base}" width="${r1(h * 0.5)}" height="${r1(h * 0.14)}" fill="${fill}"/>`
  );
}

/** 城壁(女墻の凹凸を持つ胸壁)。全幅に渡す。 */
function cityWall(y, h, fill = "#8a8478", crenel = "#7a7468") {
  const teeth = [];
  for (let x = 6; x < W; x += 20) teeth.push(`<rect x="${x}" y="${r1(y - 8)}" width="12" height="8" fill="${crenel}"/>`);
  return `<rect x="0" y="${y}" width="${W}" height="${h}" fill="${fill}"/>` + `<g>${teeth.join("")}</g>`;
}

/** 烽火台・敵楼(城壁の物見やぐら)。 */
function watchtower(x, base, w, h, fill = "#8a8478", roof = "#4a4a52") {
  const hw = r1(w / 2);
  return (
    `<rect x="${r1(x - hw)}" y="${r1(base - h)}" width="${w}" height="${h}" fill="${fill}"/>` +
    `<path d="M${r1(x - hw - 4)},${r1(base - h)}h${r1(w + 8)}l-6,-10h${r1(-w + 4)}z" fill="${roof}"/>` +
    `<rect x="${r1(x - hw * 0.3)}" y="${r1(base - h * 0.6)}" width="${r1(hw * 0.6)}" height="${r1(h * 0.32)}" fill="#20364a"/>`
  );
}

// ---------------------------------------------------------------------------
// 背景シーン(16種)。鍵は cities.mjs の `bg` と対応。
// ---------------------------------------------------------------------------

const CHINA_BASE_BG = {
  /**
   * 首都。北京・上海専用。左に宮城の楼門、右に高層ビル群を置き、
   * 帝都と現代都市の二つの顔を一枚に収める。あいだに川(護城河)。
   */
  capital:
    sky("#e8b370", "#f6d9a0", 130) +
    clouds(200, 26, 1.1, "#fff3d8") +
    hills(128, "#8a6f4a") +
    ground(130, "#9a9484") +
    // 護城河(手前)
    `<rect x="0" y="172" width="400" height="38" fill="#3f6ea0"/>` +
    ripples(184, "#bfe8f4") +
    boat(90, 192, 22) +
    // 宮城の楼門(左)
    `<g fill="#9a9ea4"><rect x="30" y="150" width="70" height="20"/></g>` +
    towerHall(64, 150, 62, 44, 2, "#4a4a52", "#c8102e") +
    stoneLion(38, 172, 14) +
    stoneLion(92, 172, 14) +
    `<rect x="16" y="120" width="3" height="50" fill="#6b0f1c"/>` +
    `<path d="M16,120l14,4l-14,4z" fill="#d4a017"/>` +
    // 高層ビル群(右)
    towerBlock(300, 66, 20, 84, "#8f96a0") +
    towerBlock(324, 44, 24, 106, "#7f8896") +
    towerBlock(354, 78, 18, 72, "#9aa2ac") +
    windowGrid(300, 70, 20, 76, 2, 8) +
    windowGrid(324, 48, 24, 96, 2, 10) +
    windowGrid(354, 82, 18, 64, 2, 7) +
    `<rect x="333" y="34" width="6" height="10" fill="#d4a017"/>` +
    // 中央(隠れ帯)は橋脚。繰り返しなので失っても軽い
    `<g fill="#8b8f98"><rect x="170" y="152" width="6" height="58"/><rect x="200" y="152" width="6" height="58"/><rect x="230" y="152" width="6" height="58"/></g>` +
    // 手前(y>170、隠れない)
    person(70, 205, 18, "#3f8f6f") +
    person(330, 206, 17, "#c8102e") +
    lanternRow(240, 200, 3, 14, 4),

  /**
   * 近代都市。太原・瀋陽・武漢・広州・深圳・長沙・重慶・ウルムチ。
   * 整った高層ビルと高架橋、広場。8都市が使う最頻出の背景なので、
   * どの都市でも浮かないよう装飾は控えめにし、密度は建物と高架で稼ぐ。
   */
  metro:
    sky("#9fc0d8", "#dce8ee", 140) +
    clouds(70, 24, 0.9) +
    clouds(330, 34, 1.1) +
    ground(140, "#9a9484") +
    towerBlock(24, 60, 26, 80, "#8f96a0") +
    towerBlock(54, 40, 22, 100, "#7f8896") +
    towerBlock(300, 54, 24, 86, "#8f96a0") +
    towerBlock(328, 76, 20, 64, "#9aa2ac") +
    towerBlock(352, 34, 26, 106, "#7f8896") +
    windowGrid(24, 64, 26, 72, 2, 9) +
    windowGrid(54, 44, 22, 92, 2, 11) +
    windowGrid(300, 58, 24, 78, 2, 9) +
    windowGrid(352, 38, 26, 96, 2, 11) +
    // 高架橋(中景、道路と橋脚)
    `<path d="M0,150h400" stroke="#8a8478" stroke-width="8" fill="none"/>` +
    `<g fill="#7a7468"><rect x="60" y="150" width="6" height="24"/><rect x="140" y="150" width="6" height="24"/><rect x="260" y="150" width="6" height="24"/><rect x="340" y="150" width="6" height="24"/></g>` +
    `<rect x="0" y="140" width="120" height="4" fill="#e8443f" opacity=".8"/>` +
    // 広場の噴水(手前中央)
    `<circle cx="200" cy="188" r="16" fill="#5b8fe8" opacity=".8"/><circle cx="200" cy="188" r="4" fill="#bfe8f4"/>` +
    person(150, 205, 16, "#f5b31c") +
    person(255, 206, 17, "#c8102e") +
    person(120, 202, 15, "#3f8f6f"),

  /**
   * 港町。天津・大連・青島・福州。起重機とコンテナ、帆船とかもめ。
   */
  port:
    sky("#8fc4e8", "#cfe4f0", 120) +
    clouds(310, 28, 1) +
    gull(60, 46, 1) +
    gull(90, 58, 0.8) +
    gull(320, 40, 1) +
    gull(200, 30, 0.7) +
    ground(120, "#9a9484") +
    `<rect x="0" y="150" width="400" height="60" fill="#2f6ea8"/>` +
    ripples(166, "#bfe8f4") +
    junk(310, 176, 40) +
    // 埠頭
    `<rect x="0" y="140" width="400" height="12" fill="#8a8478"/>` +
    crane(50, 150, 62) +
    crane(92, 150, 46) +
    // コンテナの積み重ね(密度の主力)
    `<g fill="#c8102e"><rect x="130" y="128" width="24" height="14"/><rect x="130" y="114" width="24" height="14"/></g>` +
    `<g fill="#3f8f6f"><rect x="156" y="128" width="24" height="14"/></g>` +
    `<g fill="#1a4a8f"><rect x="256" y="128" width="24" height="14"/><rect x="256" y="114" width="24" height="14"/><rect x="280" y="128" width="24" height="14"/></g>` +
    // 倉庫と窓
    `<rect x="0" y="128" width="60" height="14" fill="#8a8478"/>` +
    windowGrid(4, 130, 52, 10, 6, 1, "#f5b31c", ".5") +
    // 手前
    person(200, 202, 17, "#f6efe2") +
    person(230, 205, 16, "#5b8fe8"),

  /**
   * 田園。フフホト・南寧・成都・昆明。作物の畝と農家、水牛。
   * 4都市の気候差が大きいので、特定の作物に寄せず段々の緑と花畝で束ねる。
   */
  farmland:
    sky("#8fc4e8", "#cfe4f0", 118) +
    clouds(300, 26, 0.9) +
    hills(116, "#8fae7a") +
    ground(118, "#a8bd6a") +
    terraceWall(150, 10, "#cfc7b4") +
    paddyRows(20, 156, 140, 4, "#7fa8c4") +
    shrubRow(230, 152, 7, 18, 7, "#5f8f4a") +
    shrubRow(230, 168, 7, 18, 7, "#7fae5a") +
    shrubRow(20, 186, 6, 20, 6, "#e8a0b0") +
    // 農家
    `<rect x="150" y="176" width="46" height="24" fill="#e8dcc0"/>` +
    `<path d="M144,176h58l-8,-14h-42z" fill="#8a1f1f"/>` +
    // 水牛(手前)
    `<g fill="#4a4436"><ellipse cx="300" cy="196" rx="14" ry="8"/><ellipse cx="286" cy="188" rx="6" ry="5"/></g>` +
    `<path d="M280,184q-4,-6 0,-8M292,184q4,-6 0,-8" stroke="#e2dccb" stroke-width="1.6" fill="none"/>` +
    // 鳥(小)
    gull(60, 50, 0.8) +
    gull(80, 40, 0.6) +
    person(120, 202, 16, "#f5b31c") +
    person(340, 205, 17, "#3f8f6f"),

  /**
   * 砂漠のオアシス。敦煌・銀川・トルファン・カシュガル。隊商と土壁の家、
   * 白揚とカレーズの井戸口。夕方寄りの色にして単調な真昼を避ける。
   */
  desert:
    sky("#e8c07a", "#f6dfae", 164) +
    sun(340, 40, 20, "#f4941c") +
    dune(150, 30, "#d9b877") +
    dune(184, 16, "#c9a877") +
    // カレーズの井戸口(手前、繰り返し)
    `<g fill="#8a7355"><ellipse cx="230" cy="188" rx="6" ry="3"/><ellipse cx="248" cy="192" rx="6" ry="3"/><ellipse cx="266" cy="188" rx="6" ry="3"/></g>` +
    // 土壁の家(左)
    `<rect x="30" y="150" width="60" height="30" fill="#c9a877"/>` +
    `<rect x="30" y="150" width="60" height="4" fill="#8a7355"/>` +
    `<rect x="40" y="160" width="10" height="14" fill="#5a4630"/>` +
    `<rect x="60" y="158" width="8" height="8" fill="#4a3a28"/>` +
    // 市場の天幕(右)
    `<path d="M300,168h60l-8,-16h-44z" fill="#c8102e"/>` +
    `<g fill="#d4a017"><rect x="304" y="168" width="10" height="14"/><rect x="330" y="168" width="10" height="14"/><rect x="350" y="168" width="6" height="14"/></g>` +
    // 白揚(ポプラ)の並木
    `<g fill="#5f9c5c"><ellipse cx="110" cy="132" rx="7" ry="20"/><rect x="107" y="150" width="6" height="20" fill="#6b5330"/></g>` +
    `<g fill="#6a9c5c"><ellipse cx="128" cy="138" rx="6" ry="17" /><rect x="125" y="152" width="5" height="18" fill="#6b5330"/></g>` +
    // 隊商(手前中央寄り、y>170は隠れない。地面と同系色にならないよう濃い色にする)
    camel(200, 202, 1.1, "#8a5f3a") +
    camel(226, 200, 0.9, "#7a5030") +
    camel(180, 198, 0.8, "#8a5f3a") +
    person(160, 204, 16, "#c8102e") +
    // 星(夕空)
    `<g fill="#f6efe2" opacity=".7"><circle cx="60" cy="30" r="1.4"/><circle cx="90" cy="20" r="1.2"/><circle cx="40" cy="50" r="1"/></g>`,

  /**
   * 城壁の町。平遥・南京・嘉峪関。全幅の城壁と敵楼、女墻。
   */
  fortress:
    sky("#8fc4e8", "#cfe4f0", 110) +
    clouds(90, 30, 1) +
    graniteMountain(350, 108, 56, "#7f8f5c") +
    graniteMountain(20, 112, 40, "#8b8f98") +
    ground(110, "#8fae63") +
    // 濠(手前)
    `<rect x="0" y="176" width="400" height="34" fill="#3f7fae"/>` +
    ripples(190, "#bfe8f4") +
    boat(60, 194, 20) +
    // 城壁(全幅)
    cityWall(140, 24, "#8a8478", "#7a7468") +
    watchtower(70, 140, 34, 40, "#8a8478", "#4a4a52") +
    watchtower(340, 140, 34, 44, "#8a8478", "#4a4a52") +
    // 城門(中央寄り、隠れ帯にかかっても惜しくない)
    `<path d="M180,164a20,20 0 0 1 40,0z" fill="#3a342c"/>` +
    `<rect x="176" y="140" width="48" height="24" fill="#9a9488"/>` +
    // 旗
    `<g fill="#c8102e"><path d="M90,120v-30l14,4l-14,4z"/><path d="M310,124v-32l14,4l-14,4z"/></g>` +
    person(140, 204, 16, "#3f8f6f") +
    person(260, 205, 17, "#d4a017"),

  /**
   * 海辺。厦門・海口・三亜。砂浜と椰子、パラソル。
   */
  seaside:
    sky("#8fc4e8", "#cfe4f0", 110) +
    sun(340, 46, 22) +
    clouds(80, 30, 1) +
    `<rect x="0" y="110" width="400" height="60" fill="#1e8ea0"/>` +
    ripples(126, "#bfe8f4") +
    junk(280, 140, 24) +
    `<path d="M0,150c60,-8 120,4 200,-2c80,-6 140,4 200,-2v64H0z" fill="#e8dcc0"/>` +
    // 火山岩(海口らしい黒い岩、失っても惜しくない位置)
    `<g fill="#4a4436" opacity=".8"><ellipse cx="200" cy="176" rx="14" ry="6"/><ellipse cx="216" cy="180" rx="10" ry="5"/></g>` +
    // 椰子(左右、羽の切れ込みを持たせる)
    `<g fill="#3f8f4f"><path d="M40,196L40,150M40,150q-16,-6 -26,-2q10,4 24,10M40,150q16,-8 28,-4q-12,6 -26,10M40,150q-4,-16 -14,-22q10,2 18,16M40,150q4,-16 16,-20q-8,4 -14,18" stroke="#3f8f4f" stroke-width="3" fill="none"/></g>` +
    `<rect x="38" y="176" width="4" height="24" fill="#6b5330"/>` +
    `<g fill="#3f8f4f"><path d="M372,198L372,156M372,156q-14,-6 -22,-2q8,4 20,8M372,156q14,-8 24,-4q-10,6 -22,8M372,156q-2,-14 -12,-18q8,2 14,14" stroke="#3f8f4f" stroke-width="2.6" fill="none"/></g>` +
    `<rect x="370" y="178" width="4" height="20" fill="#6b5330"/>` +
    // パラソル
    `<g><path d="M70,172a20,10 0 0 1 40,0z" fill="#e8443f"/><rect x="88" y="172" width="3" height="28" fill="#6b5330"/></g>` +
    `<g><path d="M290,178a16,8 0 0 1 32,0z" fill="#f5b31c"/><rect x="304" y="178" width="3" height="24" fill="#6b5330"/></g>` +
    // 貝殻(手前、小さい点)
    `<g fill="#f6efe2" opacity=".8"><ellipse cx="150" cy="200" rx="3" ry="1.6"/><ellipse cx="170" cy="204" rx="2.6" ry="1.4"/></g>` +
    gull(340, 40, 1) +
    gull(320, 30, 0.7) +
    person(120, 202, 16, "#5b8fe8"),

  /**
   * 江南式の庭園。承徳・蘇州。池と太湖石、反り橋。
   */
  garden:
    sky("#8fc4e8", "#cfe4f0", 128) +
    clouds(320, 26, 1) +
    hills(126, "#8fae7a") +
    ground(128, "#7fae63") +
    // 池
    `<rect x="0" y="160" width="400" height="50" fill="#3f8fa8"/>` +
    ripples(174, "#bfe8f4") +
    // 蓮の葉
    `<g fill="#4a8f5c" opacity=".9"><ellipse cx="90" cy="180" rx="10" ry="4"/><ellipse cx="108" cy="188" rx="8" ry="3.4"/><ellipse cx="320" cy="184" rx="9" ry="3.6"/></g>` +
    `<circle cx="90" cy="178" r="2" fill="#e8a0b0"/>` +
    // 太湖石(左、穴の空いた奇石)
    `<path d="M30,180c-4,-14 6,-24 2,-34c8,-4 14,4 10,12c8,-2 14,8 6,16c6,6 0,14 -8,12c2,8 -6,12 -10,-2z" fill="#7f8f8a"/>` +
    `<ellipse cx="34" cy="158" rx="3" ry="4" fill="#5f6f6a"/>` +
    // 楼閣(右、太字な東屋)
    towerHall(340, 160, 46, 34, 2, "#4a4a52", "#c8102e") +
    // 反り橋(中央寄り、隠れ帯にかかっても惜しくない列柱)
    `<path d="M170,160Q200,140 230,160" fill="none" stroke="#c8a877" stroke-width="6"/>` +
    `<g fill="#c8a877"><rect x="175" y="158" width="2" height="10"/><rect x="195" y="146" width="2" height="10"/><rect x="223" y="158" width="2" height="10"/></g>` +
    willow(60, 200, 46) +
    willow(360, 202, 40) +
    person(150, 204, 16, "#f6efe2"),

  /**
   * 古の陵墓。洛陽・西安。兵馬俑の列と芝の封土、神道の石像。
   */
  ancienttomb:
    sky("#e0c88a", "#f2e0b0", 132) +
    clouds(320, 24, 0.9, "#fff3d8") +
    hills(130, "#a68a58") +
    ground(132, "#c9ab7c") +
    // 封土(左、芝の墳丘)
    `<path d="M20,190A46,30 0 0 1 112,190z" fill="#8fae63" stroke="#5f8a4a" stroke-width="1.6"/>` +
    `<path d="M50,190A20,13 0 0 1 90,190z" fill="#7a9a52" opacity=".7"/>` +
    // 神道の石獣(右)
    stoneLion(300, 196, 15) +
    stoneLion(334, 198, 15) +
    pagoda(370, 200, 3, 16, 22, "#9aa0a8") +
    // 兵馬俑の列(手前、密度の主力)
    figureRow(150, 202, 6, 15, 15, "#8a7355") +
    `<rect x="140" y="188" width="120" height="16" fill="#5a4630" opacity=".5"/>` +
    person(120, 205, 16, "#3f8f6f"),

  /**
   * 湖畔。杭州・済南。堤の柳並木と反り橋、湧き水。
   */
  lakeside:
    sky("#8fc4e8", "#cfe4f0", 100) +
    clouds(70, 28, 1) +
    hills(98, "#8fae7a") +
    ground(100, "#8fae63") +
    `<rect x="0" y="140" width="400" height="70" fill="#3f8fc4"/>` +
    ripples(156, "#bfe8f4") +
    boat(140, 172, 22) +
    // 堤(柳並木、左)
    willow(40, 200, 34) +
    willow(66, 200, 30) +
    willow(92, 200, 34) +
    // 楼閣(右、湖上の東屋)
    towerHall(340, 160, 44, 32, 1, "#4a4a52", "#c8102e") +
    `<g fill="#c8a877"><rect x="322" y="176" width="2" height="14"/><rect x="338" y="176" width="2" height="14"/><rect x="354" y="176" width="2" height="14"/></g>` +
    // 湧き水の泡(済南らしい、手前)
    `<g fill="#bfe8f4" opacity=".8"><circle cx="230" cy="198" r="3"/><circle cx="242" cy="202" r="2.4"/><circle cx="220" cy="204" r="2"/></g>` +
    // 蓮
    `<g fill="#4a8f5c"><ellipse cx="180" cy="180" rx="9" ry="3.6"/><ellipse cx="196" cy="186" rx="7" ry="3"/></g>` +
    person(160, 205, 16, "#c8102e"),

  /**
   * 工業都市。長春専用。自動車工場と組立ラインの車、起重機。
   */
  industrial:
    sky("#9fb0b8", "#dfe4e0", 150) +
    `<g opacity=".5" fill="#c8ccc4"><ellipse cx="70" cy="60" rx="26" ry="12"/><ellipse cx="330" cy="50" rx="22" ry="10"/></g>` +
    ground(150, "#8a8478") +
    // 工場棟(左)
    `<rect x="20" y="100" width="90" height="50" fill="#7f8896"/>` +
    `<path d="M20,100l15,-16h60l15,16z" fill="#6b7280"/>` +
    windowGrid(24, 108, 82, 36, 6, 2, "#f5b31c", ".45") +
    `<rect x="50" y="76" width="8" height="24" fill="#6b7280"/>` +
    `<rect x="70" y="70" width="8" height="30" fill="#6b7280"/>` +
    crane(330, 150, 66) +
    crane(360, 150, 46) +
    // 組立ラインの車(手前、密度の主力)
    `<g fill="#c8102e"><rect x="140" y="190" width="26" height="12" rx="3"/></g>` +
    `<g fill="#1a4a8f"><rect x="172" y="190" width="26" height="12" rx="3"/></g>` +
    `<g fill="#3f8f6f"><rect x="204" y="190" width="26" height="12" rx="3"/></g>` +
    `<g fill="#8f96a0"><rect x="236" y="190" width="26" height="12" rx="3"/></g>` +
    `<g fill="#4a4a52"><circle cx="148" cy="204" r="3"/><circle cx="160" cy="204" r="3"/><circle cx="180" cy="204" r="3"/><circle cx="192" cy="204" r="3"/><circle cx="212" cy="204" r="3"/><circle cx="224" cy="204" r="3"/><circle cx="244" cy="204" r="3"/><circle cx="256" cy="204" r="3"/></g>` +
    `<path d="M130,196h140" stroke="#5a5f52" stroke-width="2"/>` +
    person(100, 202, 15, "#f5b31c") +
    person(300, 204, 16, "#3f8f6f"),

  /**
   * 雪の都。ハルビン専用。凍った川と氷灯、露西亜正教の聖堂。
   */
  ski:
    sky("#3f5f7f", "#7f9fb8", 130) +
    moon(60, 36, 18) +
    ground(130, "#e8eef4") +
    // 聖堂のタマネギ屋根(左)
    `<rect x="30" y="110" width="26" height="30" fill="#c9bda4"/>` +
    `<path d="M43,84c-10,0 -14,10 -14,18h28c0,-8 -4,-18 -14,-18z" fill="#3f8fc4"/>` +
    `<path d="M43,72l4,10h-8z" fill="#d4a017"/>` +
    `<rect x="70" y="118" width="20" height="22" fill="#c9bda4"/>` +
    `<path d="M80,98c-7,0 -10,8 -10,14h20c0,-6 -3,-14 -10,-14z" fill="#3f8fc4"/>` +
    // 凍った川(手前)
    `<rect x="0" y="160" width="400" height="50" fill="#cfe4f0"/>` +
    `<g stroke="#a8c8dc" stroke-width="1.4" opacity=".7"><path d="M20,170l40,10M120,166l50,14M260,172l40,10M320,168l50,12"/></g>` +
    // 氷灯(氷祭りの塔)。隠れ帯の外・雪原より濃い青にして沈まないようにする
    `<g fill="#4fa8c4" stroke="#2f6e8a" stroke-width=".6"><rect x="270" y="150" width="18" height="34"/><rect x="294" y="158" width="14" height="26"/><rect x="252" y="160" width="12" height="24"/></g>` +
    `<g fill="#f5b31c"><circle cx="279" cy="164" r="2.4"/><circle cx="301" cy="170" r="2"/><circle cx="258" cy="172" r="1.8"/></g>` +
    lanternRow(60, 176, 4, 12, 4) +
    // スケートをする人
    `<g><circle cx="130" cy="186" r="4" fill="#e0b48a"/><path d="M130,190v8M126,198h8" stroke="#c8102e" stroke-width="2"/></g>` +
    person(300, 202, 16, "#3f8f6f"),

  /**
   * 山あいの谷。大同・黄山・桂林・張家界・楽山・貴陽・蘭州・張掖・西寧。
   * 9都市が使う最頻出の背景。峰の性格(花崗岩・カルスト)を問わず、
   * 川が刻む谷という形で束ねる。実在の地形差が大きい分、密度は高めにした。
   */
  valley:
    sky("#8fc4e8", "#cfe4f0", 140) +
    clouds(340, 28, 1) +
    mist(120, 24, "#eef3ee", ".5") +
    karstPeak(60, 138, 76, "#7a9070") +
    karstPeak(110, 142, 56, "#8aa07f") +
    graniteMountain(320, 130, 82, "#8b8f98") +
    hills(140, "#5f7f4a") +
    ground(140, "#6f8a52") +
    // 川(谷を刻む)。上流は隠れ帯にかかるが、y>170の手前は隠れないので
    // そこで川だと分かる幅広の帯にする(§2.1「隠れる場所には惜しくないものを」)
    `<path d="M182,140Q170,170 178,210h44Q214,170 220,140z" fill="#3f7fae"/>` +
    ripples(178, "#bfe8f4") +
    boat(198, 194, 18) +
    // 段々畑(手前左)
    terraceWall(180, 8, "#cfc7b4") +
    paddyRows(20, 188, 100, 3, "#7fa8c4") +
    // 小さな廟(手前右、崖の家)
    `<rect x="300" y="176" width="34" height="20" fill="#e8dcc0"/>` +
    `<path d="M294,176h46l-6,-10h-34z" fill="#4a4a52"/>` +
    pine(60, 202, 26) +
    pine(360, 204, 24) +
    bambooClump(20, 204, 30, 3) +
    person(250, 205, 16, "#c8102e"),

  /**
   * 孔廟。曲阜専用。大成殿と古柏の並木、石碑の林。
   */
  temple:
    sky("#8fc4e8", "#cfe4f0", 128) +
    clouds(90, 26, 1) +
    hills(126, "#8fae7a") +
    ground(128, "#a8bd6a") +
    // 石畳の庭
    band(176, 34, "#c9ab7c") +
    // 大成殿(中央寄り右、二重の反り屋根)
    towerHall(300, 168, 84, 56, 2, "#4a4a52", "#c8102e") +
    `<g fill="#d4a017"><rect x="272" y="150" width="4" height="6"/><rect x="288" y="146" width="4" height="6"/><rect x="304" y="146" width="4" height="6"/><rect x="320" y="150" width="4" height="6"/></g>` +
    // 古柏の並木(左)
    pine(30, 200, 40, "#1f4a30") +
    pine(58, 202, 34, "#2f5f3f") +
    pine(86, 200, 38, "#1f4a30") +
    // 石碑の林(手前中央、密度の主力)
    `<g fill="#9a9ea4"><rect x="150" y="180" width="8" height="26"/><rect x="164" y="184" width="8" height="22"/><rect x="178" y="178" width="8" height="28"/><rect x="192" y="186" width="8" height="20"/></g>` +
    `<g fill="#7f8480"><rect x="150" y="204" width="8" height="3"/><rect x="164" y="204" width="8" height="3"/><rect x="178" y="204" width="8" height="3"/><rect x="192" y="204" width="8" height="3"/></g>` +
    // 香炉
    `<rect x="230" y="188" width="16" height="14" rx="2" fill="#4a4436"/><rect x="235" y="180" width="6" height="8" fill="#4a4436"/>` +
    person(120, 205, 16, "#3f8f6f"),

  /**
   * 麗江の古い町。麗江専用。水路と紅い提灯、雪山を遠くに望む。
   */
  oldtown:
    sky("#a8c8e0", "#e4ecf0", 120) +
    snowPeak(340, 116, 60, "#f2f6f8") +
    snowPeak(300, 122, 44, "#dfe8ee") +
    ground(120, "#8fae63") +
    // 瓦屋根の家並み
    `<rect x="20" y="150" width="60" height="24" fill="#e8dcc0"/><path d="M14,150h72l-9,-13h-54z" fill="#4a4a52"/>` +
    `<rect x="90" y="156" width="44" height="18" fill="#e8dcc0"/><path d="M85,156h54l-7,-11h-40z" fill="#4a4a52"/>` +
    // 水路(手前)
    `<rect x="0" y="176" width="400" height="34" fill="#3f8fa8"/>` +
    ripples(190, "#bfe8f4") +
    // 石橋
    `<path d="M170,176Q195,162 220,176" fill="none" stroke="#c9ab7c" stroke-width="6"/>` +
    `<g fill="#c9ab7c"><rect x="176" y="176" width="2" height="8"/><rect x="196" y="166" width="2" height="8"/><rect x="214" y="176" width="2" height="8"/></g>` +
    // 水車
    `<circle cx="60" cy="188" r="14" fill="none" stroke="#6b5330" stroke-width="2.4"/>` +
    `<g stroke="#6b5330" stroke-width="2"><path d="M60,174v28M46,188h28M50,178l20,20M70,178l-20,20"/></g>` +
    // 紅い提灯(密度の主力)
    lanternRow(250, 160, 5, 14, 4) +
    willow(370, 202, 30) +
    person(140, 205, 15, "#c8102e"),

  /**
   * ポタラ宮。ラサ専用。紅山にそびえる白亜の宮殿と、タルチョー、巡礼者。
   */
  potala:
    sky("#4a7fb8", "#a8cfe8", 150) +
    sun(60, 34, 16, "#f6efe2") +
    snowPeak(360, 148, 50, "#f2f6f8") +
    snowPeak(20, 152, 40, "#e0e8ee") +
    ground(150, "#8a7355") +
    // 紅山(宮殿の土台)
    `<path d="M100,150L140,90L340,90L380,150z" fill="#7a6048"/>` +
    // 白宮(左右の白い翼)
    `<rect x="110" y="106" width="60" height="46" fill="#f6efe2"/>` +
    `<rect x="290" y="100" width="60" height="52" fill="#f6efe2"/>` +
    windowGrid(112, 112, 56, 38, 4, 5, "#20364a", ".7") +
    windowGrid(292, 106, 56, 44, 4, 6, "#20364a", ".7") +
    // 紅宮(中央、隠れ帯にかかっても宮殿全体の輪郭で成立する)
    `<rect x="176" y="94" width="108" height="58" fill="#8a1f1f"/>` +
    `<rect x="176" y="94" width="108" height="6" fill="#d4a017"/>` +
    windowGrid(180, 104, 100, 44, 6, 5, "#20364a", ".65") +
    `<circle cx="230" cy="90" r="7" fill="#d4a017"/>` +
    // タルチョー
    prayerFlags(20, 176, 90, 6) +
    prayerFlags(280, 182, 100, 6) +
    // 巡礼者(手前、時計回りに巡る人々)
    person(90, 204, 16, "#c8102e") +
    person(130, 206, 15, "#3f8f6f") +
    person(310, 205, 16, "#d4a017"),
};

export const CHINA_BG = { ...CHINA_BASE_BG };

// ---------------------------------------------------------------------------
// 都市シンボル(20種)。鍵は cities.mjs の `mark` と対応。24×24の座標系。
// ---------------------------------------------------------------------------

export const CHINA_MARKS = {
  /** 朱の壁と、どっしりした灰の屋根。北京専用。 */
  palace:
    `<rect x="5" y="16" width="14" height="5" fill="#c8102e"/>` +
    `<rect x="5" y="16" width="14" height="1.4" fill="#8a1f1f"/>` +
    `<path d="M2,16L12,7L22,16z" fill="#4a4a52"/>` +
    `<path d="M4,16h16" stroke="#2a2a30" stroke-width="1" opacity=".6"/>` +
    `<circle cx="12" cy="6" r="1.3" fill="#d4a017"/>`,

  /** 紅山に立つ白と朱の宮殿。ラサ専用。 */
  potala:
    `<path d="M2,21L6,11H18L22,21z" fill="#8a7355"/>` +
    `<rect x="5" y="9" width="6" height="10" fill="#f6efe2"/>` +
    `<rect x="13" y="9" width="6" height="10" fill="#f6efe2"/>` +
    `<rect x="10" y="6" width="4" height="13" fill="#8a1f1f"/>` +
    `<rect x="10" y="6" width="4" height="2" fill="#d4a017"/>`,

  /** 起重機と船。天津・大連・青島・厦門・福州。 */
  port:
    `<rect x="10" y="4" width="2" height="14" fill="#e8443f"/>` +
    `<rect x="10" y="4" width="9" height="2" fill="#e8443f"/>` +
    `<path d="M2,18h20l-3,4H5z" fill="#2f6ea8"/>`,

  /** 崖に開いた石窟の龕。大同・洛陽・楽山・敦煌。 */
  grotto:
    `<path d="M2,21V9q0,-6 10,-6t10,6v12z" fill="#a68a6a"/>` +
    `<ellipse cx="8" cy="14" rx="2.6" ry="3.4" fill="#4a3a28" opacity=".7"/>` +
    `<ellipse cx="15" cy="16" rx="2.2" ry="3" fill="#4a3a28" opacity=".7"/>` +
    `<ellipse cx="12" cy="9" rx="2" ry="2.6" fill="#4a3a28" opacity=".7"/>`,

  /** 甕と轆轤。太原・長沙・蘭州・西寧。 */
  craft:
    `<path d="M6,21V13q0,-5 6,-5t6,5v8z" fill="#a67a52"/>` +
    `<ellipse cx="12" cy="8" rx="6" ry="1.6" fill="#8a5a3a"/>` +
    `<path d="M6,21h12v2H6z" fill="#4a4436"/>`,

  /** 城壁と城門。平遥・南京・嘉峪関。 */
  fortress:
    `<rect x="3" y="13" width="18" height="8" fill="#8a8478"/>` +
    `<g fill="#7a7468"><rect x="3" y="10" width="4" height="4"/><rect x="10" y="10" width="4" height="4"/><rect x="17" y="10" width="4" height="4"/></g>` +
    `<rect x="10" y="15" width="4" height="6" fill="#4a4436"/>`,

  /** ゲルと草原。フフホト専用。 */
  grassland:
    `<path d="M6,20V13Q6,9 12,9T18,13V20z" fill="#f6efe2"/>` +
    `<path d="M9,20V14Q9,11 12,11T15,14V20z" fill="none" stroke="#c9ab7c" stroke-width="1"/>` +
    `<path d="M2,20q2,-3 4,0M18,20q2,-3 4,0" fill="none" stroke="#7fae5a" stroke-width="1.6"/>`,

  /** 封土と兵馬俑。西安・銀川。 */
  tomb:
    `<path d="M2,20a10,7 0 0 1 20,0z" fill="#8fae63" stroke="#5f8a4a" stroke-width="1.2"/>` +
    `<rect x="10" y="12" width="3" height="8" fill="#8a7355"/><circle cx="11.5" cy="10.4" r="1.6" fill="#8a7355"/>`,

  /** 煙突と高炉。瀋陽・長春。 */
  industry:
    `<rect x="4" y="12" width="6" height="9" fill="#7f8896"/>` +
    `<rect x="12" y="7" width="4" height="14" fill="#6b7280"/>` +
    `<path d="M14,7c0,-3 3,-3 3,-6" fill="none" stroke="#c8ccc4" stroke-width="1.6" opacity=".8"/>`,

  /** 氷の塔と結晶。ハルビン専用。 */
  ice:
    `<path d="M8,21V11l4,-5l4,5v10z" fill="#bfe8f4" opacity=".9"/>` +
    `<path d="M12,6v5M9.5,8.5h5M10.2,6.8l3.6,3.4M13.8,6.8l-3.6,3.4" stroke="#f6efe2" stroke-width="1"/>`,

  /** 高層ビルの林立。上海・広州・深圳・重慶。 */
  skyline:
    `<g fill="#8f96a0"><rect x="3" y="10" width="4" height="11"/><rect x="9" y="5" width="5" height="16"/><rect x="16" y="12" width="5" height="9"/></g>` +
    `<g fill="#c8e0f0" opacity=".7"><rect x="4" y="12" width="1.4" height="1.4"/><rect x="10.5" y="8" width="1.4" height="1.4"/><rect x="17" y="14" width="1.4" height="1.4"/></g>`,

  /** 池と太湖石、東屋。承徳・蘇州。 */
  garden:
    `<rect x="2" y="16" width="20" height="5" fill="#3f8fa8"/>` +
    `<path d="M15,16Q13,9 17,7Q20,10 18,16z" fill="#7f8f8a"/>` +
    `<path d="M4,16Q6,10 9,16z" fill="#4a8f5c"/>`,

  /** 湖面と柳。杭州・済南。 */
  lake:
    `<rect x="2" y="14" width="20" height="7" fill="#3f8fc4"/>` +
    `<path d="M2,14h20v-3l-4,2l-4,-2l-4,2l-4,-2l-4,2z" fill="#9a9488"/>` +
    `<path d="M4,18q4,-2 8,0t8,0" fill="none" stroke="#bfe8f4" stroke-width="1.2"/>`,

  /** 二つ並んだ峰。黄山・桂林・張家界・貴陽・張掖。 */
  mountain:
    `<path d="M2,20L9,7L14,14L17,9L22,20z" fill="#7a9070"/>` +
    `<path d="M9,7L11,11L7,12z" fill="#eef3ee"/>`,

  /** 白壁に朱の門、灰の屋根。曲阜・武漢。 */
  temple:
    `<rect x="5" y="15" width="14" height="6" fill="#f6efe2"/>` +
    `<rect x="5" y="15" width="14" height="1.2" fill="#c9ab7c"/>` +
    `<path d="M2,15L12,6L22,15z" fill="#4a4a52"/>` +
    `<path d="M4,15h16" stroke="#8a8478" stroke-width="1" opacity=".6"/>` +
    `<rect x="10" y="16.4" width="4" height="4.6" fill="#c8102e"/>`,

  /** 波と浜。海口・三亜。 */
  coast:
    `<path d="M2,10q5,-4 10,0t10,0" fill="none" stroke="#3f8fc4" stroke-width="1.8"/>` +
    `<path d="M2,15q5,-4 10,0t10,0" fill="none" stroke="#5b8fe8" stroke-width="1.8"/>` +
    `<path d="M2,20h20" stroke="#e8dcc0" stroke-width="4"/>`,

  /** パンダの顔。成都専用。 */
  panda:
    `<circle cx="12" cy="13" r="9" fill="#f6efe2"/>` +
    `<circle cx="5" cy="6" r="3" fill="#2a241c"/><circle cx="19" cy="6" r="3" fill="#2a241c"/>` +
    `<ellipse cx="8.4" cy="13" rx="2" ry="2.6" fill="#2a241c"/><ellipse cx="15.6" cy="13" rx="2" ry="2.6" fill="#2a241c"/>` +
    `<circle cx="8.4" cy="12.6" r=".8" fill="#f6efe2"/><circle cx="15.6" cy="12.6" r=".8" fill="#f6efe2"/>`,

  /** 花畑の畝。南寧・昆明。 */
  flowerfield:
    `<g fill="#c8384f"><circle cx="6" cy="15" r="3"/><circle cx="12" cy="17" r="3"/><circle cx="18" cy="15" r="3"/></g>` +
    `<g fill="#d4a017"><circle cx="6" cy="15" r="1.2"/><circle cx="12" cy="17" r="1.2"/><circle cx="18" cy="15" r="1.2"/></g>` +
    `<rect x="2" y="20" width="20" height="2" fill="#5f9c5c"/>`,

  /** 水路と紅い提灯、石橋。麗江専用。 */
  oldtown:
    `<rect x="2" y="15" width="20" height="6" fill="#3f8fa8"/>` +
    `<path d="M6,15Q12,9 18,15" fill="none" stroke="#c9ab7c" stroke-width="2.4"/>` +
    `<ellipse cx="18" cy="7" rx="2.4" ry="2.8" fill="#c8102e"/><rect x="17.6" y="4.4" width=".8" height="1.6" fill="#4a4436"/>`,

  /** 市場の天幕と商品。ウルムチ・トルファン・カシュガル。 */
  bazaar:
    `<path d="M3,14h18l-4,-8H7z" fill="#c8102e"/>` +
    `<g fill="#d4a017"><rect x="5" y="14" width="4" height="6"/><rect x="15" y="14" width="4" height="6"/></g>` +
    `<rect x="10" y="14" width="4" height="7" fill="#3f8f6f"/>`,
};
