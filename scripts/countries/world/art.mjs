/**
 * 世界一周の都市イラスト。
 *
 * `marks` は 24×24 の座標系に描くシンボル、`bg` は 400×210 の座標系に描く
 * 背景シーン(いずれもSVG断片の文字列)。インド・フランスと同じく最初から
 * 文字列として持ち、動きは含めない(アニメーションはReact側で重ねる)。
 *
 * キー名は都市側(cities.mjs)が参照するので固定。1つの背景を複数の大陸の
 * 都市が使い回すため、特定の国だと分かる建物は避け、地形と気候で描き分ける。
 * 色は他国と揃える。空 #8fc4e8〜、砂 #c9a877、緑 #4d7a44、生成り #f6efe2、
 * 強調 #f5b31c / #e8443f / #5b8fe8。
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

/** 空(グラデーション代わりに2枚重ねる)。 */
/**
 * `to` は**空を塗り下ろす深さ**。既定の118はこの下にすぐ地面が来る場合の値。
 * 地面がもっと下から始まるシーンでそのままにすると、あいだが塗り残しになり
 * カードの地色が透ける。実測(2026-08-08)で12種中9種にこの穴があった。
 */
function sky(top, bottom, to = 118) {
  return band(0, 84, top) + band(78, to - 78, bottom);
}

function sun(cx, cy, r, fill = "#f5b31c") {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>`;
}

function clouds(cx, cy, scale = 1) {
  const e = (dx, rx, ry) =>
    `<ellipse cx="${r1(cx + dx * scale)}" cy="${cy}" rx="${r1(rx * scale)}" ry="${r1(ry * scale)}"/>`;
  return `<g opacity=".8" fill="#f6efe2">${e(0, 18, 7)}${e(-10, 11, 5.5)}${e(11, 13, 5.5)}</g>`;
}

/** 地面。 */
function ground(y, fill) {
  return `<rect x="0" y="${y}" width="${W}" height="${210 - y}" fill="${fill}"/>`;
}

/** 遠景の丘の連なり。 */
function hills(y, fill, count = 4) {
  const parts = [];
  for (let i = 0; i < count; i++) {
    const cx = 40 + (i * W) / count;
    parts.push(`<path d="M${cx - 70},${y}c20,-34 50,-34 70,0z" fill="${fill}"/>`);
  }
  return `<g opacity=".9">${parts.join("")}</g>`;
}

/** 水面の反射線。 */
function ripples(y, color = "#bfe8f4") {
  return `<g stroke="${color}" stroke-width="2" opacity=".7" fill="none"><path d="M30,${y}h70M180,${y + 12}h90M110,${y + 24}h64"/></g>`;
}

/** ヤシ並木。 */
function palmRow(y, count = 5, h = 34) {
  const parts = [];
  for (let i = 0; i < count; i++) {
    const x = 30 + (i * (W - 60)) / (count - 1);
    parts.push(
      `<rect x="${x - 2}" y="${y - h}" width="4" height="${h}" fill="#6b5330"/>`,
      `<path d="M${x},${y - h}c-14,-4 -19,3 -21,9c7,-6 14,-6 21,-2c7,-4 14,-4 21,2c-2,-6 -7,-13 -21,-9z" fill="#2f7d3f"/>`,
    );
  }
  return parts.join("");
}

/** 星空(位置は固定。乱数を使うと抽出のたびに差分が出るため)。 */
function stars(count = 26) {
  const parts = [];
  for (let i = 0; i < count; i++) {
    const x = r1(((i * 137) % 391) + 5);
    const y = r1(((i * 53) % 74) + 6);
    parts.push(`<circle cx="${x}" cy="${y}" r="${i % 4 === 0 ? 1.6 : 1}"/>`);
  }
  return `<g fill="#f6efe2" opacity=".85">${parts.join("")}</g>`;
}

/** ビルの列(窓は等間隔の格子)。 */
function towers(list, wall, glass) {
  const bodies = list.map(([x, y, w, h]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}"/>`);
  const panes = [];
  for (const [x, y, w, h] of list) {
    for (let wy = y + 8; wy < y + h - 8; wy += 14) {
      for (let wx = x + 6; wx < x + w - 6; wx += 12) {
        panes.push(`<rect x="${wx}" y="${wy}" width="6" height="7"/>`);
      }
    }
  }
  return `<g fill="${wall}">${bodies.join("")}</g><g fill="${glass}" opacity=".85">${panes.join("")}</g>`;
}

/** 平屋根の家並み(瓦屋根+漆喰壁)。 */
function roofRow(base, tops, wall, roof) {
  const parts = [];
  let x = 4;
  for (const top of tops) {
    const w = 40 + ((x * 7) % 18);
    parts.push(
      `<rect x="${x}" y="${top}" width="${w}" height="${base - top}" fill="${wall}"/>`,
      `<path d="M${x - 4},${top}h${w + 8}l-6,-11H${x + 2}z" fill="${roof}"/>`,
      `<rect x="${r1(x + w / 2 - 5)}" y="${top + 12}" width="10" height="12" fill="#7f97ad"/>`,
    );
    x += w + 6;
  }
  return parts.join("");
}

/** 傘型のアカシア(サバンナ)。 */
function acacia(x, base, scale = 1) {
  const s = scale;
  return (
    `<path d="M${r1(x - 2 * s)},${base}c0,${r1(-14 * s)} ${r1(-3 * s)},${r1(-16 * s)} ${r1(-3 * s)},${r1(-22 * s)}h${r1(9 * s)}c0,${r1(6 * s)} ${r1(-2 * s)},${r1(8 * s)} ${r1(-2 * s)},${r1(22 * s)}z" fill="#6b5330"/>` +
    `<path d="M${r1(x - 34 * s)},${r1(base - 24 * s)}c${r1(6 * s)},${r1(-11 * s)} ${r1(56 * s)},${r1(-11 * s)} ${r1(62 * s)},0c${r1(-14 * s)},${r1(4 * s)} ${r1(-48 * s)},${r1(4 * s)} ${r1(-62 * s)},0z" fill="#4d7a44"/>`
  );
}

/** ラクダ(右を向いて歩く)。原点は前足の接地点。 */
function camel(x, base, s = 1, fill = "#7a5a34") {
  return (
    `<g fill="${fill}" transform="translate(${x},${base}) scale(${s})">` +
    `<path d="M4,-11h3.4v11H4zM11,-11h3.4v11H11zM22,-11h3.4v11H22zM28,-11h3.4v11H28z"/>` +
    `<ellipse cx="17" cy="-16" rx="15" ry="7.5"/>` +
    `<path d="M7,-19c1.5,-8 8,-8 9.5,0z"/>` +
    `<path d="M19,-20c1.5,-8 8.5,-8 10,0z"/>` +
    `<path d="M28,-19l3.5,-13l4.5,1l-3,13z"/>` +
    `<path d="M32,-33h8.5l1.5,4.5h-9z"/>` +
    `<path d="M2,-18l-4,7h2.4l4,-6z"/>` +
    `</g>`
  );
}

/** 象(右を向く)。原点は前足の接地点。 */
function elephant(x, base, s = 1, fill = "#6b6350", shade = "#5c5546") {
  return (
    `<g transform="translate(${x},${base}) scale(${s})">` +
    `<g fill="${fill}"><rect x="-22" y="-12" width="11" height="12"/><rect x="6" y="-12" width="11" height="12"/>` +
    `<rect x="-26" y="-36" width="46" height="26" rx="13"/><circle cx="24" cy="-27" r="12"/>` +
    `<path d="M32,-19c5,3 6,9 3,13c-2,3 -7,2 -6,-2c1,-3 2,-6 0,-8z"/><rect x="-27.4" y="-32" width="2.6" height="13"/></g>` +
    `<ellipse cx="19" cy="-28" rx="8.5" ry="9.5" fill="${shade}"/>` +
    `<path d="M30,-17l8.5,3l-1,2.6l-8.5,-3z" fill="#e0dbcd"/>` +
    `</g>`
  );
}

/** 麒麟(右を向く)。原点は前足の接地点。 */
function giraffe(x, base, s = 1, fill = "#d8a84c", spot = "#a8712c") {
  return (
    `<g transform="translate(${x},${base}) scale(${s})">` +
    `<g fill="${fill}"><rect x="-12" y="-16" width="4.4" height="16"/><rect x="-5" y="-16" width="4.4" height="16"/>` +
    `<rect x="5" y="-16" width="4.4" height="16"/><rect x="11" y="-16" width="4.4" height="16"/>` +
    `<rect x="-14" y="-32" width="30" height="17" rx="6"/><path d="M8,-30l6,-26h6.5l-3.6,26z"/>` +
    `<path d="M17,-58h9.5l1.4,4.6h-9.6z"/><path d="M-14.4,-30l-4,10h2.4l4.6,-8z"/></g>` +
    `<g fill="${spot}"><circle cx="-6" cy="-26" r="3"/><circle cx="3" cy="-22" r="2.6"/><circle cx="8" cy="-28" r="2.4"/><circle cx="-11" cy="-20" r="2.2"/></g>` +
    `<g fill="${spot}"><rect x="18.6" y="-63" width="1.8" height="5"/><rect x="23" y="-63" width="1.8" height="5"/></g>` +
    `</g>`
  );
}

/** 樅の列。 */
function firRow(y, xs, h = 26, fill = "#2f5f3f") {
  return xs
    .map((x) => {
      const w = r1(h * 0.5);
      return (
        `<rect x="${r1(x - 1.6)}" y="${y - 5}" width="3.2" height="5" fill="#5a4630"/>` +
        `<path d="M${r1(x - w / 2)},${y - 3}L${x},${y - h}L${r1(x + w / 2)},${y - 3}z" fill="${fill}"/>` +
        `<path d="M${r1(x - w / 2.6)},${r1(y - h * 0.44)}L${x},${r1(y - h * 0.92)}L${r1(x + w / 2.6)},${r1(y - h * 0.44)}z" fill="${fill}"/>`
      );
    })
    .join("");
}

/** 積み上げたコンテナ。 */
function containers(x, base, rows) {
  const colors = ["#e8443f", "#f5b31c", "#3f8f7a", "#5b8fe8", "#c2603c"];
  const parts = [];
  rows.forEach((count, row) => {
    for (let i = 0; i < count; i++) {
      const cx = x + i * 34;
      const cy = base - (row + 1) * 15;
      parts.push(
        `<rect x="${cx}" y="${cy}" width="32" height="14" fill="${colors[(row * 3 + i) % colors.length]}"/>`,
        `<rect x="${cx}" y="${cy}" width="32" height="14" fill="none" stroke="#3a3428" stroke-width="1.2"/>`,
      );
    }
  });
  return parts.join("");
}

/**
 * ガントリークレーン。脚は岸壁に立ち、ブームは海側(左)へ張り出す。
 * `reach` を負にすると逆向きになる。
 */
function crane(x, base, reach = -54) {
  const legT = base - 68;
  const boomY = base - 84;
  const bx = reach < 0 ? x + reach : x;
  const bw = 56 + Math.abs(reach);
  return (
    `<g fill="#e8a83c">` +
    `<rect x="${x}" y="${legT}" width="9" height="68"/><rect x="${x + 47}" y="${legT}" width="9" height="68"/>` +
    `<rect x="${x - 4}" y="${legT}" width="64" height="8"/>` +
    `<rect x="${bx}" y="${boomY}" width="${bw}" height="8"/>` +
    `<rect x="${x + 24}" y="${base - 108}" width="8" height="24"/>` +
    `</g>` +
    `<g stroke="#c98a2c" stroke-width="3" fill="none"><path d="M${x + 28},${base - 108}L${bx + 6},${boomY}M${x + 28},${base - 108}L${bx + bw - 6},${boomY}"/></g>` +
    `<g fill="#4a4438"><rect x="${bx + 14}" y="${boomY + 8}" width="12" height="6"/><path d="M${bx + 20},${boomY + 14}v10" stroke="#4a4438" stroke-width="2"/></g>`
  );
}

/** 連なるアーチ(回廊・高架橋)。 */
function arches(x, y, count, w, h, fill, hole) {
  const parts = [`<rect x="${x}" y="${y - h}" width="${count * w}" height="${h}" fill="${fill}"/>`];
  for (let i = 0; i < count; i++) {
    const ax = x + i * w + w * 0.18;
    const aw = w * 0.64;
    parts.push(
      `<path d="M${r1(ax)},${y}v${r1(-(h - w * 0.5))}a${r1(aw / 2)},${r1(aw / 2)} 0 0 1 ${r1(aw)},0V${y}z" fill="${hole}"/>`,
    );
  }
  return parts.join("");
}

/** オーロラの帯。 */
function aurora() {
  const ribbon = (d, color, op) =>
    `<path d="${d}" fill="none" stroke="${color}" stroke-width="14" opacity="${op}" stroke-linecap="round"/>`;
  return (
    ribbon("M10,54q70,-38 140,-8t150,-24", "#5fd8a8", ".55") +
    ribbon("M0,74q80,-30 160,4t160,-22", "#7fe8c8", ".4") +
    ribbon("M40,36q90,-24 170,6t150,-18", "#8fc4e8", ".3")
  );
}

/** 縦看板(アジアの繁華街)。 */
function neonSigns(list) {
  const parts = [];
  for (const [x, y, h, color] of list) {
    parts.push(`<rect x="${x}" y="${y}" width="13" height="${h}" fill="${color}"/>`);
    for (let ty = y + 5; ty < y + h - 4; ty += 9) {
      parts.push(`<rect x="${x + 3}" y="${ty}" width="7" height="4" fill="#f6efe2" opacity=".85"/>`);
    }
  }
  return parts.join("");
}

/** 高いすじ雲。空の上のほう(y<54)は隠れないので、ここは全幅を使える。 */
function cirrus(x, y, w, op = ".5") {
  return (
    `<g fill="#f6efe2" opacity="${op}">` +
    `<ellipse cx="${x}" cy="${y}" rx="${w}" ry="2.4"/>` +
    `<ellipse cx="${r1(x - w * 0.5)}" cy="${y + 5}" rx="${r1(w * 0.55)}" ry="1.8"/>` +
    `</g>`
  );
}

/**
 * 通り雨の雲。熱帯の背景には動きの層がしずくを降らせるので、
 * 降ってくる先の雲を静止画の側にも置いて辻褄を合わせる。
 */
function squall(cx, cy, s = 1) {
  const e = (dx, dy, rx, ry) =>
    `<ellipse cx="${r1(cx + dx * s)}" cy="${r1(cy + dy * s)}" rx="${r1(rx * s)}" ry="${r1(ry * s)}"/>`;
  const streak = (dx, len) => `M${r1(cx + dx * s)},${r1(cy + 11 * s)}l-5,${len}`;
  return (
    `<g fill="#93aec2" opacity=".8">${e(0, 0, 26, 10)}${e(-18, 3, 15, 7)}${e(19, 3, 16, 7)}${e(-6, -7, 14, 8)}${e(11, -6, 12, 7)}</g>` +
    `<g fill="#7091a8" opacity=".5">${e(-9, 7, 16, 5)}${e(13, 8, 14, 4.6)}</g>` +
    `<g stroke="#a8c8dc" stroke-width="1.6" opacity=".45" stroke-linecap="round" fill="none">` +
    `<path d="${streak(-20, 20)}${streak(-4, 27)}${streak(12, 17)}${streak(24, 23)}"/></g>`
  );
}

/**
 * 水上の高床の家。熱帯の港ならどこにでもある形にとどめる
 * (屋根の反りや飾りを付けると特定の国のものになってしまう)。
 * 脚は波打ちぎわで地面に隠れるので、水に立って見える。
 */
function stiltHouse(x, deck, s = 1) {
  const w = r1(38 * s);
  const h = r1(19 * s);
  const top = r1(deck - h);
  const eave = r1(top - 13 * s);
  const legs = [];
  for (let i = 0; i < 4; i++) {
    const lx = r1(x + 3 + (i * (w - 8)) / 3);
    legs.push(`<rect x="${lx}" y="${deck}" width="${r1(2.4 * s)}" height="18" fill="#6b4a28"/>`);
  }
  return (
    `<g opacity=".9">${legs.join("")}</g>` +
    `<rect x="${r1(x - 3)}" y="${r1(deck - 3)}" width="${r1(w + 6)}" height="4" fill="#8a5a2c"/>` +
    `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="#c9a877"/>` +
    `<g stroke="#a8813c" stroke-width="1.2" opacity=".7" fill="none"><path d="M${x},${r1(top + 6)}h${w}M${x},${r1(top + 12)}h${w}"/></g>` +
    `<path d="M${r1(x - 7)},${top}h${r1(w + 14)}l${r1(-(w + 14) / 2)},${r1(eave - top)}z" fill="#a8813c"/>` +
    `<g stroke="#8a6a2c" stroke-width="1.2" opacity=".8" fill="none"><path d="M${r1(x - 2)},${r1(top - 5)}h${r1(w + 4)}M${r1(x + 3)},${r1(top - 11)}h${r1(w - 6)}"/></g>` +
    `<rect x="${r1(x + w * 0.28)}" y="${r1(top + 5)}" width="${r1(9 * s)}" height="${r1(9 * s)}" fill="#5a4630"/>` +
    `<rect x="${r1(x + w * 0.3)}" y="${r1(top + 7)}" width="${r1(5 * s)}" height="${r1(5 * s)}" fill="#f5b31c" opacity=".8"/>` +
    // 水へ降りる梯子
    `<g stroke="#6b4a28" stroke-width="1.6" fill="none"><path d="M${r1(x + w - 6)},${deck}v16M${r1(x + w - 1)},${deck}v16M${r1(x + w - 7)},${r1(deck + 5)}h7M${r1(x + w - 7)},${r1(deck + 11)}h7"/></g>`
  );
}

/**
 * 20px前後の人影。**大きさを伝えるために置く**ので、輪郭より姿勢を優先する。
 * 熱帯の港ならどこにでもいる姿にとどめ、民族衣装は描かない。
 * `pose` は "stand"(立つ)/ "carry"(頭に荷)/ "crouch"(かがむ)。
 */
function person(x, base, s = 1, cloth = "#e8443f", pose = "stand", skin = "#8a5a34") {
  const p = (dx, dy) => `${r1(x + dx * s)},${r1(base + dy * s)}`;
  // 足もとの影。地面と同系色の中に人を置くと沈むので、必ず敷く。
  const shadow = `<ellipse cx="${r1(x)}" cy="${r1(base + 1)}" rx="${r1(5.6 * s)}" ry="${r1(1.8 * s)}" fill="#000" opacity=".14"/>`;
  const rect = (dx, dy, w, h, fill) =>
    `<rect x="${r1(x + dx * s)}" y="${r1(base + dy * s)}" width="${r1(w * s)}" height="${r1(h * s)}" fill="${fill}"/>`;
  const head = (dy) => `<circle cx="${r1(x)}" cy="${r1(base + dy * s)}" r="${r1(2.8 * s)}" fill="${skin}"/>`;

  if (pose === "crouch") {
    return (
      shadow +
      head(-11.4) +
      `<path d="M${p(-3.4, -8.6)}q3.4,-1.6 6.8,0l1.6,7.4h-10z" fill="${cloth}"/>` +
      rect(-3.6, -1.2, 3, 1.2, skin) +
      rect(1, -1.2, 3, 1.2, skin) +
      `<path d="M${p(3.2, -7)}l4.2,3.4" stroke="${skin}" stroke-width="${r1(1.7 * s)}" stroke-linecap="round" fill="none"/>`
    );
  }
  const load =
    pose === "carry"
      ? // 頭に載せた籠。**頭に食い込ませること。**わずかでも隙間を空けると、
        // 宙に浮いた帽子に見えた(拡大して気づいた)。腕も籠の縁まで届かせる。
        `<path d="M${p(-6.2, -16.2)}h12.4l-1.8,-5.4h-8.8z" fill="#c9a877"/>` +
        `<g stroke="#8a6a3c" stroke-width="${r1(1.1 * s)}" opacity=".85" fill="none"><path d="M${p(-5.6, -18.6)}h11.2"/></g>` +
        `<path d="M${p(-2.9, -11.2)}L${p(-4.8, -15.4)}M${p(2.9, -11.2)}L${p(4.8, -15.4)}" stroke="${skin}" stroke-width="${r1(1.7 * s)}" stroke-linecap="round" fill="none"/>`
      : `<path d="M${p(-2.8, -12.6)}l-2.6,5M${p(2.8, -12.6)}l2.6,5" stroke="${skin}" stroke-width="${r1(1.7 * s)}" stroke-linecap="round" fill="none"/>`;
  return (
    shadow +
    head(-14.6) +
    `<path d="M${p(-2.9, -11.8)}q2.9,-1.4 5.8,0l1.1,6.6h-8z" fill="${cloth}"/>` +
    rect(-2.6, -5.2, 2.2, 5.2, skin) +
    rect(0.5, -5.2, 2.2, 5.2, skin) +
    load
  );
}

/**
 * `palmRow` の葉と同じ形を、大きさと色を変えて重ねるための部品。
 *
 * **形は変えない。** 細い線を放射状に並べた葉は蜘蛛の脚に見えたし、
 * 中肋から小葉を生やす描き方も、この大きさ(幅40px)では線が潰れて汚れになった
 * (ガイド §4.1 が同じ失敗を記録している)。すでに椰子に見えている形を、
 * 明度違いで3枚重ねて厚みだけを出す。
 */
function palmFrondCrown(x, y, s, fill) {
  const c = (a, b) => `${r1(a * s)},${r1(b * s)}`;
  return (
    `<path d="M${x},${y}c${c(-14, -4)} ${c(-19, 3)} ${c(-21, 9)}` +
    `c${c(7, -6)} ${c(14, -6)} ${c(21, -2)}c${c(7, -4)} ${c(14, -4)} ${c(21, 2)}` +
    `c${c(-2, -6)} ${c(-7, -13)} ${c(-21, -9)}z" fill="${fill}"/>`
  );
}

/**
 * 椰子の**奥の葉**。`palmRow` より前に描く。
 *
 * `palmRow` の幹と葉には手を触れないこと。動きの層(`world-tropics.tsx`)が
 * 同じ位置・同じ形の葉を重ねてひるがえらせているので、動かすと二重にずれる。
 */
function palmBack(x, top) {
  return palmFrondCrown(x, top + 4, 1.34, "#276b36");
}

/** 椰子の**手前の葉**と実と幹の節。`palmRow` より後に描く。 */
function palmFront(x, top) {
  return (
    palmFrondCrown(x, top - 2, 0.72, "#4f9f5c") +
    `<g fill="#6b4a28"><circle cx="${r1(x - 3.4)}" cy="${r1(top + 3.6)}" r="2.4"/><circle cx="${r1(x + 3.2)}" cy="${r1(top + 4.8)}" r="2.2"/></g>` +
    `<g stroke="#54401f" stroke-width="1.1" opacity=".55" fill="none"><path d="M${r1(x - 2)},${r1(top + 13)}h4M${r1(x - 2)},${r1(top + 22)}h4M${r1(x - 2)},${r1(top + 31)}h4M${r1(x - 2)},${r1(top + 40)}h4"/></g>`
  );
}

/**
 * 水に浮かぶものの足もと。
 *
 * **輪郭だけでは「水の上の物」と「水に空いた穴」が見分けられない。**
 * 効くのは、真下へ短く伸びる映り込みと、接するところで左右へ逃げるさざ波。
 * 前後関係が決まると、浮いているかどうかも決まる。
 */
function afloat(cx, waterY, w, fill, op = ".3") {
  return (
    `<ellipse cx="${cx}" cy="${r1(waterY + 2)}" rx="${r1(w * 0.48)}" ry="2.6" fill="${fill}" opacity="${op}"/>` +
    `<g stroke="${fill}" stroke-width="1.6" opacity="${op}" fill="none">` +
    `<path d="M${r1(cx - w * 0.32)},${r1(waterY + 6)}h${r1(w * 0.32)}M${r1(cx + w * 0.04)},${r1(waterY + 9)}h${r1(w * 0.28)}"/></g>` +
    `<g stroke="#eafbfd" stroke-width="1.6" opacity=".6" fill="none">` +
    `<path d="M${r1(cx - w * 0.92)},${r1(waterY + 1)}h${r1(w * 0.36)}M${r1(cx + w * 0.56)},${r1(waterY + 1)}h${r1(w * 0.36)}"/></g>`
  );
}

/**
 * 遠い卓状台地。
 *
 * **崖はほぼ垂直にすること。** 裾を16%も広げたら台地ではなく
 * テントの屋根に見えた(撮って気づいた)。卓状台地は頂が平らで側面が切り立っていて、
 * 裾に崩れた砂礫が溜まっている。その3つで、砂丘の丸みと見分けが付く。
 */
function mesa(x, base, w, h, fill = "#b8996a", shade = "#9c7f55") {
  const top = r1(base - h);
  const inset = r1(w * 0.05);
  return (
    `<path d="M${x},${base}L${r1(x + inset)},${top}H${r1(x + w - inset)}L${r1(x + w)},${base}z" fill="${fill}"/>` +
    // 日陰は**崖の細い面だけ**にする。面積を広く取ると、平面が2枚に見えて屋根になる。
    `<path d="M${r1(x + w - inset)},${top}L${r1(x + w)},${base}H${r1(x + w - inset * 3)}z" fill="${shade}" opacity=".5"/>` +
    // 頂の縁を明るく抜いて、平らな頂であることを見せる。
    `<g stroke="#e6cb96" stroke-width="1.4" opacity=".55" fill="none"><path d="M${r1(x + inset)},${r1(top + 1)}H${r1(x + w - inset)}"/></g>` +
    `<g stroke="${shade}" stroke-width="1.2" opacity=".35" fill="none"><path d="M${r1(x + inset)},${r1(top + h * 0.4)}H${r1(x + w - inset)}M${r1(x + inset)},${r1(top + h * 0.68)}H${r1(x + w - inset)}"/></g>` +
    `<path d="M${r1(x - w * 0.09)},${base}q${r1(w * 0.59)},${r1(-h * 0.26)} ${r1(w * 1.18)},0z" fill="${fill}" opacity=".8"/>`
  );
}

/**
 * 日干し煉瓦の町。**塔の形は決めすぎない。**
 * ドームや尖塔を付けるとカイロ・イスファハン・サマルカンドのどれかに寄ってしまう
 * (しかもそれらは都市シンボルの側がすでに描いている)。
 * 平屋根の箱を段違いに積み、小さな窓と胸壁だけで「乾いた土地の町」にとどめる。
 */
function adobeTown(x, base, s = 1) {
  const blocks = [
    [0, 26, 30],
    [28, 34, 22],
    [52, 20, 26],
    [74, 30, 20],
    [96, 24, 28],
  ];
  const parts = [];
  for (const [dx, h, w] of blocks) {
    const bx = r1(x + dx * s);
    const bw = r1(w * s);
    const by = r1(base - h * s);
    parts.push(`<rect x="${bx}" y="${by}" width="${bw}" height="${r1(h * s)}" fill="#c9a877"/>`);
    // 胸壁(四角い歯)
    for (let i = 0; i < 3; i++) {
      parts.push(
        `<rect x="${r1(bx + (i * bw) / 3 + 1)}" y="${r1(by - 3 * s)}" width="${r1(bw / 3 - 2)}" height="${r1(3 * s)}" fill="#b89a5c"/>`,
      );
    }
    // 影になる面
    parts.push(
      `<rect x="${r1(bx + bw * 0.66)}" y="${by}" width="${r1(bw * 0.34)}" height="${r1(h * s)}" fill="#ac8c5c" opacity=".55"/>`,
    );
    // 小窓
    parts.push(
      `<g fill="#6b5330"><rect x="${r1(bx + bw * 0.18)}" y="${r1(by + h * s * 0.34)}" width="${r1(4 * s)}" height="${r1(5 * s)}"/>` +
        `<rect x="${r1(bx + bw * 0.5)}" y="${r1(by + h * s * 0.52)}" width="${r1(4 * s)}" height="${r1(5 * s)}"/></g>`,
    );
  }
  // 門
  parts.push(
    `<path d="M${r1(x + 52 * s)},${base}v${r1(-11 * s)}a${r1(6 * s)},${r1(6 * s)} 0 0 1 ${r1(12 * s)},0v${r1(11 * s)}z" fill="#6b5330"/>`,
  );
  return parts.join("");
}

/**
 * トナカイ。
 *
 * ラマ・縞馬と同じで、**胴と脚をひと筆にしない。**
 * 正体を決めているのは**枝分かれした角**で、これは胴の輪郭とは無関係の形なので、
 * 独立した図形として置かないと絶対に読めない。
 *
 * **角は背より 26px 高いところに来る。**中央(x=151〜249)に置くと
 * y=150 あたりで都市シンボルの台座に食われるので、置き場所を先に決めること。
 */
function reindeer(x, base, s = 1, coat = "#8a6a4c", pale = "#cfc0a4", dark = "#5a442c") {
  const rect = (dx, dy, w, h, fill) =>
    `<rect x="${r1(x + dx * s)}" y="${r1(base + dy * s)}" width="${r1(w * s)}" height="${r1(h * s)}" fill="${fill}"/>`;
  const p = (dx, dy) => `${r1(x + dx * s)},${r1(base + dy * s)}`;
  // 角。主枝から前後へ枝を出す。**左右で形を変える**(左右対称だと飾りに見える)
  const antler = (dir) =>
    `<path d="M${p(dir * 1.6, -25)}L${p(dir * 3.4, -34)}L${p(dir * 2, -34.4)}L${p(dir * 0.6, -26)}z" fill="${dark}"/>` +
    `<path d="M${p(dir * 3.2, -31)}L${p(dir * 7.4, -33.4)}L${p(dir * 7, -35)}L${p(dir * 2.8, -32.4)}z" fill="${dark}"/>` +
    `<path d="M${p(dir * 3.4, -34)}L${p(dir * 5.6, -39)}L${p(dir * 4.4, -39.4)}L${p(dir * 2.6, -34.6)}z" fill="${dark}"/>`;
  return (
    rect(-6, -9, 2, 9, dark) +
    rect(-3, -9, 2, 9, dark) +
    rect(2.4, -9, 2, 9, dark) +
    rect(5.2, -9, 2, 9, dark) +
    `<ellipse cx="${r1(x)}" cy="${r1(base - 13.6 * s)}" rx="${r1(9 * s)}" ry="${r1(5.2 * s)}" fill="${coat}"/>` +
    `<path d="M${p(-6.6, -15.6)}L${p(-9.6, -23)}L${p(-6, -24.2)}L${p(-3, -16)}z" fill="${coat}"/>` +
    // 首の白い毛。トナカイの見分けどころのひとつ。
    `<ellipse cx="${r1(x - 7 * s)}" cy="${r1(base - 18.4 * s)}" rx="${r1(3.6 * s)}" ry="${r1(3 * s)}" fill="${pale}"/>` +
    `<ellipse cx="${r1(x - 9.8 * s)}" cy="${r1(base - 24.6 * s)}" rx="${r1(3.8 * s)}" ry="${r1(2.4 * s)}" fill="${coat}"/>` +
    `<ellipse cx="${r1(x - 12.8 * s)}" cy="${r1(base - 24.2 * s)}" rx="${r1(1.5 * s)}" ry="${r1(1.2 * s)}" fill="${dark}"/>` +
    // 角(頭の位置に合わせて左へずらす)
    `<g transform="translate(${r1(-9.8 * s)},${r1(0.8 * s)})">${antler(-1)}${antler(1)}</g>` +
    `<path d="M${p(8.6, -16)}q${r1(3 * s)},${r1(0.6 * s)} ${r1(3.4 * s)},${r1(3.4 * s)}" stroke="${pale}" stroke-width="${r1(2 * s)}" fill="none" stroke-linecap="round"/>`
  );
}

/**
 * 縞馬。
 *
 * ラマと同じく、**胴と脚をひと筆にしない。** 正体を決めているのは
 * **立ったたてがみ**と**縞**で、どちらも胴の輪郭とは別の図形として置く必要がある
 * (輪郭の中に塗り込むと、ただの四つ足になる)。
 */
function zebra(x, base, s = 1, coat = "#f2ede0", stripe = "#3a3a38") {
  const rect = (dx, dy, w, h, fill) =>
    `<rect x="${r1(x + dx * s)}" y="${r1(base + dy * s)}" width="${r1(w * s)}" height="${r1(h * s)}" fill="${fill}"/>`;
  const p = (dx, dy) => `${r1(x + dx * s)},${r1(base + dy * s)}`;
  return (
    rect(-7, -9, 2.2, 9, stripe) +
    rect(-3.6, -9, 2.2, 9, coat) +
    rect(2.6, -9, 2.2, 9, coat) +
    rect(6, -9, 2.2, 9, stripe) +
    `<ellipse cx="${r1(x)}" cy="${r1(base - 13.4 * s)}" rx="${r1(9.6 * s)}" ry="${r1(5.2 * s)}" fill="${coat}"/>` +
    `<path d="M${p(-7.4, -15.6)}L${p(-12.4, -24)}L${p(-8.6, -25.4)}L${p(-3.6, -16)}z" fill="${coat}"/>` +
    `<ellipse cx="${r1(x - 13.4 * s)}" cy="${r1(base - 25.6 * s)}" rx="${r1(4 * s)}" ry="${r1(2.3 * s)}" fill="${coat}"/>` +
    `<ellipse cx="${r1(x - 16.6 * s)}" cy="${r1(base - 25 * s)}" rx="${r1(1.5 * s)}" ry="${r1(1.2 * s)}" fill="${stripe}"/>` +
    // 立ったたてがみ。**首の輪郭の外へ出す。**
    `<path d="M${p(-11.8, -25.8)}L${p(-5.6, -16.4)}L${p(-3.8, -17.8)}L${p(-10.2, -26.8)}z" fill="${stripe}"/>` +
    // 縞は独立した図形で置く
    `<g fill="${stripe}"><rect x="${r1(x - 5.4 * s)}" y="${r1(base - 18 * s)}" width="${r1(1.8 * s)}" height="${r1(9 * s)}"/>` +
    `<rect x="${r1(x - 1 * s)}" y="${r1(base - 18.4 * s)}" width="${r1(1.8 * s)}" height="${r1(9.6 * s)}"/>` +
    `<rect x="${r1(x + 3.4 * s)}" y="${r1(base - 18 * s)}" width="${r1(1.8 * s)}" height="${r1(9 * s)}"/></g>` +
    `<path d="M${p(9.2, -16)}q${r1(4 * s)},${r1(1 * s)} ${r1(4.4 * s)},${r1(5 * s)}" stroke="${coat}" stroke-width="${r1(1.8 * s)}" fill="none" stroke-linecap="round"/>` +
    `<ellipse cx="${r1(x + 13.8 * s)}" cy="${r1(base - 10 * s)}" rx="${r1(1.6 * s)}" ry="${r1(2.4 * s)}" fill="${stripe}"/>`
  );
}

/**
 * 高地の駄獣(ラマ・アルパカの類)。
 *
 * **胴と脚をひと筆の `path` でまとめないこと。** まとめると、何の獣か分からない
 * 四つ足の塊になる(らくだが犬に、ヤクが黒い塊になったのと同じ原因)。
 * ここでは12個の独立した図形で組み、そのうち3つ —
 * **背の線よりはっきり上へ伸びる首・小さな頭・バナナ形の耳** — が正体を決めている。
 * この3つが背の輪郭の中に収まってしまうと、途端に読めなくなる。
 */
function llama(x, base, s = 1, fleece = "#e0d4bc", dark = "#7a6242") {
  const rect = (dx, dy, w, h, fill) =>
    `<rect x="${r1(x + dx * s)}" y="${r1(base + dy * s)}" width="${r1(w * s)}" height="${r1(h * s)}" fill="${fill}"/>`;
  const p = (dx, dy) => `${r1(x + dx * s)},${r1(base + dy * s)}`;
  return (
    // 脚は4本とも別の図形にする
    rect(-5.6, -9, 1.9, 9, dark) +
    rect(-2.8, -9, 1.9, 9, dark) +
    rect(2.2, -9, 1.9, 9, dark) +
    rect(5, -9, 1.9, 9, dark) +
    // 胴
    `<ellipse cx="${r1(x)}" cy="${r1(base - 13 * s)}" rx="${r1(8.4 * s)}" ry="${r1(5 * s)}" fill="${fleece}"/>` +
    // 首。**背(base-18)よりずっと上、base-26 まで伸ばす。**
    `<path d="M${p(-5.4, -15)}L${p(-8.2, -26)}L${p(-4.6, -26.6)}L${p(-2.2, -15.4)}z" fill="${fleece}"/>` +
    // 小さな頭を水平に載せる
    `<ellipse cx="${r1(x - 8.6 * s)}" cy="${r1(base - 27.4 * s)}" rx="${r1(3.3 * s)}" ry="${r1(2.1 * s)}" fill="${fleece}"/>` +
    `<ellipse cx="${r1(x - 11.2 * s)}" cy="${r1(base - 26.8 * s)}" rx="${r1(1.5 * s)}" ry="${r1(1.2 * s)}" fill="${dark}"/>` +
    // バナナ形の耳2枚。これがラマの目印。
    `<path d="M${p(-10.2, -29)}q${r1(-0.8 * s)},${r1(-4 * s)} ${r1(1.4 * s)},${r1(-4.4 * s)}q${r1(0.5 * s)},${r1(2.8 * s)} ${r1(-0.2 * s)},${r1(4.4 * s)}z" fill="${fleece}"/>` +
    `<path d="M${p(-7.4, -29)}q${r1(0.8 * s)},${r1(-3.8 * s)} ${r1(2.4 * s)},${r1(-3.6 * s)}q${r1(-0.8 * s)},${r1(2.4 * s)} ${r1(-1 * s)},${r1(3.8 * s)}z" fill="${fleece}"/>` +
    // 短く跳ね上がる尾
    `<path d="M${p(8, -15)}q${r1(3.2 * s)},${r1(-1 * s)} ${r1(3.6 * s)},${r1(-3.6 * s)}" stroke="${fleece}" stroke-width="${r1(2.2 * s)}" fill="none" stroke-linecap="round"/>`
  );
}

/**
 * 水に浮かぶ小舟。
 *
 * **さざ波を描いたあとに呼ぶこと。**この部品は順序に意味があるので、
 * 3つを1つにまとめて順序を埋め込んである:
 *
 *  1. 波より**後**に描く … 波が舟に遮られていれば、舟は水面より手前にある
 *  2. 舷の内側に暗い三日月 … へこんだ容器だと分かる
 *  3. 真下に映り込みの筋 … 映り込むものは水の上にある
 *
 * **1つめだけでは「容器」までしか言えない。** 3つ揃って初めて浮いて見える。
 */
function boat(cx, waterY, w, hull = "#a8763c", shade = "#553a1c", trim = "#e0c088") {
  const h = r1(w / 2);
  const d = r1(w * 0.13);
  return (
    // 3. 映り込み(舟より先に、真下へ)
    `<ellipse cx="${cx}" cy="${r1(waterY + d + 3)}" rx="${r1(h * 0.76)}" ry="${r1(d * 0.85)}" fill="#17607a" opacity=".3"/>` +
    `<g stroke="#17607a" stroke-width="1.5" opacity=".26" fill="none">` +
    `<path d="M${r1(cx - h * 0.5)},${r1(waterY + d + 7)}h${r1(h * 0.55)}M${r1(cx - h * 0.05)},${r1(waterY + d + 10)}h${r1(h * 0.45)}"/></g>` +
    // 1. 船体
    `<path d="M${r1(cx - h)},${waterY}q${h},${r1(d * 2)} ${w},0q${r1(-h)},${r1(-d * 0.7)} ${-w},0z" fill="${hull}"/>` +
    // 2. 舷の内側の暗い三日月
    `<path d="M${r1(cx - h * 0.9)},${r1(waterY - 0.4)}q${r1(h * 0.9)},${r1(d * 0.8)} ${r1(h * 1.8)},0q${r1(-h * 0.9)},${r1(-d * 0.5)} ${r1(-h * 1.8)},0z" fill="${shade}" opacity=".75"/>` +
    `<path d="M${r1(cx - h)},${waterY}q${h},${r1(-d * 0.7)} ${w},0" stroke="${trim}" stroke-width="1.8" fill="none"/>` +
    // 舟が遮ったぶん、波は左右へ逃げる
    `<g stroke="#eafbfd" stroke-width="1.6" opacity=".55" fill="none">` +
    `<path d="M${r1(cx - h * 1.75)},${r1(waterY + 2)}h${r1(h * 0.62)}M${r1(cx + h * 1.12)},${r1(waterY + 2)}h${r1(h * 0.62)}"/></g>`
  );
}

/**
 * 海鳥。
 *
 * **輪郭をひと筆で描かないこと。** 胴と翼を1つの `path` にまとめると、
 * 何の鳥か分からない塊になる(らくだが犬に、ヤクが黒い塊になったのと同じ原因)。
 * 海鳥だと分かる特徴 — **長く尖った翼・鉤形の嘴・二叉の尾** — を、
 * それぞれ独立した図形として置く。
 */
function seabird(x, y, s = 1, fill = "#3a4453") {
  const p = (dx, dy) => `${r1(x + dx * s)},${r1(y + dy * s)}`;
  return (
    `<ellipse cx="${r1(x)}" cy="${r1(y)}" rx="${r1(5 * s)}" ry="${r1(2.1 * s)}" fill="${fill}"/>` +
    `<path d="M${p(-1, -1)}q${r1(-9 * s)},${r1(-6 * s)} ${r1(-17 * s)},${r1(-2 * s)}q${r1(8 * s)},${r1(1.4 * s)} ${r1(16 * s)},${r1(4 * s)}z" fill="${fill}"/>` +
    `<path d="M${p(1, -1)}q${r1(9 * s)},${r1(-6 * s)} ${r1(17 * s)},${r1(-2 * s)}q${r1(-8 * s)},${r1(1.4 * s)} ${r1(-16 * s)},${r1(4 * s)}z" fill="${fill}"/>` +
    `<circle cx="${r1(x - 4.6 * s)}" cy="${r1(y - 1 * s)}" r="${r1(1.7 * s)}" fill="${fill}"/>` +
    `<path d="M${p(-6, -1.6)}l${r1(-3.6 * s)},${r1(1.1 * s)}l${r1(2.8 * s)},${r1(1.1 * s)}z" fill="${fill}"/>` +
    `<path d="M${p(4.6, 0)}l${r1(4.6 * s)},${r1(-2.2 * s)}l${r1(-1.1 * s)},${r1(2.2 * s)}l${r1(3.6 * s)},${r1(2.2 * s)}z" fill="${fill}"/>`
  );
}

/**
 * 建物のあいだに渡した物干し。
 *
 * 旧市街を旧市街に見せるのに、いちばん安く効く。パリでもハバナでも
 * イスタンブールでもデリーでも成り立ち、**どこか1国を指さない。**
 */
function laundry(x1, y1, x2, y2, colors) {
  const mx = r1((x1 + x2) / 2);
  const my = r1((y1 + y2) / 2 + Math.min(11, (x2 - x1) * 0.13));
  const parts = [
    `<path d="M${x1},${y1}Q${mx},${my} ${x2},${y2}" stroke="#8a8272" stroke-width="1.2" fill="none"/>`,
  ];
  colors.forEach((color, i) => {
    const t = (i + 1) / (colors.length + 1);
    const bx = r1((1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * mx + t * t * x2);
    const by = r1((1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * my + t * t * y2);
    const w = 7 + (i % 3) * 2;
    const h = 9 + (i % 2) * 5;
    parts.push(`<path d="M${r1(bx - w / 2)},${by}h${w}l-1.6,${h}h${r1(-(w - 3.2))}z" fill="${color}"/>`);
  });
  return parts.join("");
}

/** 広場の鳩。古い町の広場には必ずいて、しかもどの国のものでもない。 */
function pigeon(x, base, s = 1, fill = "#8a8578") {
  return (
    `<ellipse cx="${r1(x)}" cy="${r1(base - 2.6 * s)}" rx="${r1(4.2 * s)}" ry="${r1(2.6 * s)}" fill="${fill}"/>` +
    `<circle cx="${r1(x - 4 * s)}" cy="${r1(base - 5.2 * s)}" r="${r1(1.9 * s)}" fill="${fill}"/>` +
    `<path d="M${r1(x + 4 * s)},${r1(base - 3.4 * s)}l${r1(3.2 * s)},${r1(-1.4 * s)}" stroke="${fill}" stroke-width="${r1(1.4 * s)}" fill="none" stroke-linecap="round"/>` +
    `<g fill="#c2603c"><rect x="${r1(x - 1.6 * s)}" y="${r1(base - 1 * s)}" width="${r1(1 * s)}" height="${r1(1.6 * s)}"/>` +
    `<rect x="${r1(x + 0.8 * s)}" y="${r1(base - 1 * s)}" width="${r1(1 * s)}" height="${r1(1.6 * s)}"/></g>`
  );
}

/** 山羊。隊商の町にはどこにでもいる。人と同じく大きさを伝えるために置く。 */
function goat(x, base, s = 1, fill = "#e8dfc8") {
  return (
    `<g fill="${fill}"><ellipse cx="${r1(x)}" cy="${r1(base - 5 * s)}" rx="${r1(6.4 * s)}" ry="${r1(3.4 * s)}"/>` +
    `<circle cx="${r1(x - 6.6 * s)}" cy="${r1(base - 8.4 * s)}" r="${r1(2.6 * s)}"/></g>` +
    `<g fill="#6b5330"><rect x="${r1(x - 4 * s)}" y="${r1(base - 3 * s)}" width="${r1(1.6 * s)}" height="${r1(3 * s)}"/>` +
    `<rect x="${r1(x + 2.6 * s)}" y="${r1(base - 3 * s)}" width="${r1(1.6 * s)}" height="${r1(3 * s)}"/></g>` +
    `<path d="M${r1(x - 7.4 * s)},${r1(base - 10.4 * s)}q-1.6,-3 0.6,-4.4" stroke="#6b5330" stroke-width="${r1(1.2 * s)}" fill="none" stroke-linecap="round"/>`
  );
}

/** 浜の犬。人と同じく、大きさを伝えるために置く。 */
function beachDog(x, base, s = 1, fill = "#c9955c") {
  return (
    `<g fill="${fill}">` +
    `<ellipse cx="${r1(x)}" cy="${r1(base - 5 * s)}" rx="${r1(7 * s)}" ry="${r1(3.4 * s)}"/>` +
    `<circle cx="${r1(x + 7.4 * s)}" cy="${r1(base - 8.4 * s)}" r="${r1(3 * s)}"/>` +
    `</g>` +
    `<g fill="${fill}"><rect x="${r1(x - 5 * s)}" y="${r1(base - 3 * s)}" width="${r1(1.8 * s)}" height="${r1(3 * s)}"/>` +
    `<rect x="${r1(x + 3 * s)}" y="${r1(base - 3 * s)}" width="${r1(1.8 * s)}" height="${r1(3 * s)}"/></g>` +
    `<path d="M${r1(x - 7 * s)},${r1(base - 6.4 * s)}q-3,-2.4 -1,-5" stroke="${fill}" stroke-width="${r1(1.5 * s)}" fill="none" stroke-linecap="round"/>` +
    `<path d="M${r1(x + 9 * s)},${r1(base - 10.6 * s)}l1.6,3" stroke="${fill}" stroke-width="${r1(1.8 * s)}" fill="none" stroke-linecap="round"/>`
  );
}

// ---------------------------------------------------------------------------
// 背景シーン(400×210)
// ---------------------------------------------------------------------------

export const WORLD_BG = {
  /** 高層ビルと広い車道の現代都市。 */
  metropolis:
    sky("#8fc4e8", "#cfe4f0", 142) +
    sun(336, 30, 14, "#f5d06a") +
    clouds(88, 28) +
    towers(
      [
        [14, 66, 30, 84],
        [50, 94, 22, 56],
        [80, 46, 34, 104],
        [122, 78, 26, 72],
        [156, 34, 40, 116],
        [204, 70, 28, 80],
        [240, 54, 34, 96],
        [282, 90, 24, 60],
        [314, 62, 30, 88],
        [352, 82, 34, 68],
      ],
      "#4a5566",
      "#f5d06a",
    ) +
    // ガラス張りの一棟だけ色を変える
    `<rect x="156" y="34" width="40" height="116" fill="#5f8fa8" opacity=".55"/>` +
    `<rect x="0" y="142" width="400" height="10" fill="#5f9450"/>` +
    ground(152, "#6f6a5e") +
    `<rect x="0" y="152" width="400" height="7" fill="#8a8578"/>` +
    `<g stroke="#f6efe2" stroke-width="3" stroke-dasharray="20 18" opacity=".8" fill="none"><path d="M0,186h400"/></g>` +
    // 二階建てバスと乗用車
    `<rect x="248" y="158" width="96" height="30" rx="6" fill="#e8443f"/>` +
    `<g fill="#cfe4f0"><rect x="256" y="164" width="20" height="10"/><rect x="282" y="164" width="20" height="10"/><rect x="308" y="164" width="20" height="10"/></g>` +
    `<g fill="#2a2f38"><circle cx="266" cy="190" r="6"/><circle cx="328" cy="190" r="6"/></g>` +
    `<rect x="70" y="170" width="60" height="18" rx="5" fill="#f5b31c"/>` +
    `<g fill="#2a2f38"><circle cx="84" cy="189" r="5"/><circle cx="118" cy="189" r="5"/></g>`,

  /**
   * 古い町の広場。
   *
   * **これはヨーロッパの旧市街ではない。** 使うのはパリ・プラハ・モスクワ・
   * イスタンブール・デリー・北京・エルサレム・ハバナの8都市で、4大陸にまたがる。
   * 切妻の家並みや紋章を入れると6都市が嘘になるので、どの町にもある
   * 「古い町」の共通項だけで組む — 詰まって建つ石と漆喰、柱廊、物干し、
   * 露店の日よけ、広場の水、鳩。**旗も紋章も塔の形も出さない。**
   * (塔やドームや尖塔は都市シンボルの側がすでに描いている)
   *
   * **動きの層(`world-oldworld.tsx`)と噛み合っている位置は動かせない:**
   * 窓 (24,116) (78,108) (132,122) (240,118) (294,110) (348,120) の 10×12 …灯りがともる
   * 噴水の噴き口 (200,158) と水面 (200,186) …水柱としずくと波紋が乗る
   * これらは `roofRow(150, [104,96,110,100,106,98,108])` が生む位置なので、その呼び方を変えない。
   */
  oldworld:
    /*
     * 灯りがともり始める時間。夕方にすると、動きの層の窓の灯りに理由ができる。
     *
     * **段を増やしてはいけない。** 夕方の色で3段4段に割ったら、空が縞模様になった。
     * 明度差の小さい2枚に戻し、地平の靄で下端をぼかす。
     */
    sky("#8fb0d0", "#e4dac6", 150) +
    cirrus(104, 20, 44, ".45") +
    cirrus(300, 14, 34, ".38") +
    /*
     * 屋根の向こうに続く町。
     *
     * **離して置くと看板に見える。**隙間なく詰めて高さだけを変えると、
     * 建て込んだ町の影になる。形は決めない(どの国とも読めるように)。
     */
    `<g fill="#93a4b4" opacity=".45">` +
    `<rect x="0" y="94" width="22" height="10"/><rect x="22" y="88" width="18" height="16"/>` +
    `<rect x="40" y="96" width="26" height="8"/><rect x="66" y="86" width="14" height="18"/>` +
    `<rect x="80" y="92" width="24" height="12"/><rect x="104" y="98" width="20" height="6"/>` +
    `<rect x="282" y="96" width="22" height="8"/><rect x="304" y="88" width="16" height="16"/>` +
    `<rect x="320" y="94" width="26" height="10"/><rect x="346" y="84" width="13" height="20"/>` +
    `<rect x="359" y="92" width="41" height="12"/></g>` +
    `<rect x="0" y="93" width="400" height="11" fill="#ecdcc4" opacity=".45"/>` +
    // 家並み(窓の位置が動きの層と対応している。この呼び方を変えない)
    roofRow(150, [104, 96, 110, 100, 106, 98, 108], "#e0d2b8", "#b8543c") +
    // 漆喰の剥がれと屋根の筋。古さは汚れで出る。
    `<g fill="#c9b898" opacity=".55"><rect x="8" y="126" width="16" height="20"/><rect x="88" y="118" width="12" height="26"/>` +
    `<rect x="238" y="132" width="18" height="16"/><rect x="332" y="124" width="14" height="24"/></g>` +
    `<g stroke="#9a4a34" stroke-width="1" opacity=".5" fill="none"><path d="M6,144h46M62,140h42M114,148h46M222,146h46M278,142h42M330,146h46"/></g>` +
    // 鎧戸と、窓の下の小さな手すり
    `<g fill="#7a6a4c">` +
    [24, 78, 132, 186, 240, 294, 348]
      .map((wx, i) => {
        const wy = [116, 108, 122, 112, 118, 110, 120][i];
        return `<rect x="${wx - 4.4}" y="${wy}" width="3.6" height="12"/><rect x="${wx + 10.8}" y="${wy}" width="3.6" height="12"/>`;
      })
      .join("") +
    `</g>` +
    `<g stroke="#8a8272" stroke-width="1.4" opacity=".85" fill="none">` +
    [24, 78, 132, 186, 240, 294, 348]
      .map((wx, i) => {
        const wy = [116, 108, 122, 112, 118, 110, 120][i] + 13;
        return `M${wx - 5},${wy}h20M${wx - 3},${wy}v-4M${wx + 4},${wy}v-4M${wx + 11},${wy}v-4`;
      })
      .join("") +
    `</g>` +
    // 物干し。左右3分の1に渡す(中央は隠れて見えない)。
    laundry(30, 128, 96, 122, ["#e8443f", "#f6efe2", "#5b8fe8"]) +
    laundry(292, 122, 366, 128, ["#f5b31c", "#f6efe2", "#37b3a4"]) +
    // 石畳の広場。目地は等間隔にせず、擦り減った跡を混ぜる。
    ground(150, "#b0a894") +
    `<g stroke="#9a9280" stroke-width="1.8" opacity=".6" fill="none"><path d="M0,162h400M0,176h400M0,190h400M0,204h400"/></g>` +
    `<g stroke="#9a9280" stroke-width="1.4" opacity=".4" fill="none"><path d="M28,162v14M96,162v14M164,162v14M232,162v14M300,162v14M368,162v14M62,176v14M130,176v14M198,176v14M266,176v14M334,176v14M28,190v14M96,190v14M232,190v14M300,190v14M368,190v14"/></g>` +
    `<g fill="#bab29c" opacity=".6"><ellipse cx="120" cy="196" rx="34" ry="8"/><ellipse cx="316" cy="188" rx="28" ry="6"/></g>` +
    // 左: 柱廊。日陰の奥行きが出て、町が厚く見える。
    arches(6, 180, 4, 24, 30, "#cfc2a8", "#584f42") +
    `<rect x="2" y="146" width="102" height="6" fill="#c2b49a"/>` +
    `<g stroke="#a89a80" stroke-width="1.2" opacity=".7" fill="none"><path d="M6,156h96"/></g>` +
    // 右: 露店の日よけと台
    `<path d="M282,166h96l-10,-12h-76z" fill="#c2603c"/>` +
    `<g stroke="#a34a30" stroke-width="1.4" opacity=".7" fill="none"><path d="M292,160h76M286,164h88"/></g>` +
    `<g fill="#6b5330"><rect x="284" y="166" width="3.4" height="22"/><rect x="373" y="166" width="3.4" height="22"/></g>` +
    `<rect x="292" y="176" width="76" height="4.4" fill="#c9a877"/>` +
    `<g fill="#e8443f"><circle cx="300" cy="172" r="3.4"/><circle cx="308" cy="173" r="3"/></g>` +
    `<g fill="#f5b31c"><circle cx="318" cy="172" r="3.2"/><circle cx="326" cy="173" r="2.8"/></g>` +
    `<g fill="#4d7a44"><circle cx="336" cy="172" r="3.2"/><circle cx="344" cy="173" r="2.8"/></g>` +
    `<g fill="#7a4a8c"><circle cx="354" cy="172" r="3"/><circle cx="362" cy="173" r="2.6"/></g>` +
    // 広場の水。**噴き口 (200,158) と水面 (200,186) は動かせない。**
    `<ellipse cx="200" cy="192" rx="48" ry="13" fill="#a09880"/>` +
    `<ellipse cx="200" cy="190" rx="44" ry="11" fill="#c2b8a0"/>` +
    `<ellipse cx="200" cy="186" rx="40" ry="9.4" fill="#4f8fa8"/>` +
    `<ellipse cx="200" cy="185" rx="30" ry="6" fill="#8fc8dc"/>` +
    `<rect x="195" y="164" width="10" height="24" fill="#cfc7b4"/>` +
    `<ellipse cx="200" cy="164" rx="15" ry="4.2" fill="#cfc7b4"/>` +
    `<ellipse cx="200" cy="163" rx="11" ry="2.6" fill="#8fc8dc"/>` +
    `<path d="M200,158c-6,-6 -2,-12 0,-14c2,2 6,8 0,14z" fill="#bfe8f4"/>` +
    /*
     * 広場の人(y>170 は中央でも隠れない)。
     *
     * **人がいて初めて「広場」になる。**水を汲む、露店で売る、柱廊で立ち話をする、
     * 鳩を追いかける。大きさは 24〜28px。
     */
    person(158, 204, 1.35, "#c2603c", "carry") +
    person(64, 200, 1.3, "#5b8fe8") +
    person(84, 201, 1.25, "#4d7a44") +
    person(300, 198, 1.3, "#f5b31c") +
    person(248, 202, 1.2, "#e8447a", "crouch") +
    pigeon(140, 206) +
    pigeon(154, 203, 0.9, "#9a948a") +
    pigeon(170, 207, 0.85) +
    pigeon(262, 205, 0.95, "#9a948a") +
    pigeon(276, 202, 0.85) +
    // 柱廊の下に置かれた籠と、広場の隅の猫
    `<g fill="#c9a877"><ellipse cx="112" cy="200" rx="10" ry="5"/><ellipse cx="126" cy="205" rx="8" ry="4.2"/></g>` +
    `<g stroke="#8a6a3c" stroke-width="1" opacity=".8" fill="none"><path d="M103,199h18M119,204h14"/></g>` +
    beachDog(374, 202, 0.82, "#6f6a5e"),

  /**
   * 砂丘とキャラバン。
   *
   * ティンブクトゥ・ドバイ・サマルカンド・イスファハン・マラケシュ・カイロ・リマの
   * **7都市が使う**ので、ドーム・尖塔・ピラミッド・高層ビルは置かない
   * (どれか1つの都市に寄るうえ、それらは都市シンボルの側がすでに描いている)。
   * 「乾いた土地の隊商の町」の共通項 — 卓状台地・砂丘・日干し煉瓦・泉・らくだ — で組む。
   *
   * **動きの層(`world-desert.tsx`)と噛み合っている位置は動かせない:**
   * 太陽 (298,46) / 泉の水面 (60,140) / なつめやしの葉 (36,106) と (68,114) /
   * 砂の舞う稜線 y=128・136・158・186。
   */
  desert:
    sky("#f0c48a", "#f8dcb0", 132) +
    // 高いところに舞う砂塵。空の上(y<54)は隠れないので、ここは全幅を使える。
    `<g fill="#e8c48a" opacity=".45"><ellipse cx="120" cy="26" rx="80" ry="5"/><ellipse cx="300" cy="16" rx="64" ry="4"/><ellipse cx="60" cy="44" rx="52" ry="3.4"/></g>` +
    `<circle cx="298" cy="46" r="34" fill="#f8dcb0" opacity=".45"/>` +
    sun(298, 46, 24, "#f0a83c") +
    // 遠い卓状台地。左右に離して置く(重ねると段になって、何の形か読めなくなる)。
    // 左は泉と椰子の後ろに来るので、低く淡くして遠くに置く(手前と競らせない)。
    mesa(0, 132, 92, 19, "#cbab7c", "#b08f60") +
    mesa(292, 132, 108, 27, "#c2a071", "#a48355") +
    // 地平の靄。遠さを出しつつ、台地と砂丘の境を和らげる。
    `<rect x="0" y="124" width="400" height="10" fill="#f8dcb0" opacity=".3"/>` +
    // 日干し煉瓦の町(右)。太陽の下、台地の手前に置く。
    adobeTown(268, 132, 0.92) +
    // 砂丘。**稜線の位置は動きの層と揃える。**
    `<path d="M0,132c70,-22 130,6 200,-4c70,-10 130,-14 200,4v78H0z" fill="#dcc182"/>` +
    `<g stroke="#cbb079" stroke-width="1.6" opacity=".55" fill="none"><path d="M20,144q40,-7 80,0t80,0M220,148q40,-7 80,0t80,0"/></g>` +
    `<path d="M0,158c80,-20 140,4 210,-6c70,-10 120,-8 190,6v52H0z" fill="#cfae6e"/>` +
    `<g stroke="#bd9c60" stroke-width="1.6" opacity=".55" fill="none"><path d="M0,170q50,-8 100,0t100,0M210,174q45,-8 90,0t90,0"/></g>` +
    ground(184, "#b89a5c") +
    `<g stroke="#a68a4e" stroke-width="1.8" opacity=".5" fill="none"><path d="M0,194q60,-9 120,0t120,0M150,204q60,-9 120,0t120,0"/></g>` +
    // 泉のまわりの草と、なつめやし。**葉の位置は動きの層と揃えたまま**、奥の葉だけ足す。
    palmFrondCrown(36, 110, 1.28, "#22602f") +
    palmFrondCrown(68, 117, 1.1, "#2b7038") +
    `<g><rect x="34" y="106" width="4" height="30" fill="#6b5330"/><path d="M36,106c-13,-4 -18,3 -20,9c7,-6 13,-6 20,-2c7,-4 13,-4 20,2c-2,-6 -7,-13 -20,-9z" fill="#2f7d3f"/></g>` +
    `<g><rect x="66" y="114" width="4" height="22" fill="#6b5330"/><path d="M68,114c-11,-3 -15,3 -17,8c6,-5 11,-5 17,-2c6,-3 11,-3 17,2c-2,-5 -6,-11 -17,-8z" fill="#3f8f4f"/></g>` +
    `<g fill="#6b4a28"><circle cx="32.6" cy="109.6" r="2"/><circle cx="39" cy="110.8" r="1.8"/></g>` +
    `<g stroke="#54401f" stroke-width="1" opacity=".55" fill="none"><path d="M34,118h4M34,126h4M66,122h4M66,130h4"/></g>` +
    `<ellipse cx="60" cy="140" rx="44" ry="8" fill="#4f8f9f" opacity=".8"/>` +
    `<ellipse cx="60" cy="139" rx="30" ry="4" fill="#7fc0cc" opacity=".6"/>` +
    // 水際の葦と、水を汲む人
    `<g stroke="#5f8f4a" stroke-width="1.6" fill="none" stroke-linecap="round"><path d="M18,142l-3,-11M24,143l-1,-12M100,143l3,-11M106,142l1,-10"/></g>` +
    person(112, 148, 0.82, "#5b8fe8") +
    `<ellipse cx="118" cy="147" rx="5" ry="2.4" fill="#8a6a3c"/>` +
    // 隊商。先頭に追い手、後ろに荷を積んだらくだ。
    person(160, 168, 0.86, "#e8443f") +
    `<path d="M164,160l14,-4" stroke="#6b5330" stroke-width="1.2" fill="none"/>` +
    camel(186, 170, 0.9, "#8a6a3c") +
    `<path d="M178,158h18l-2,-7h-14z" fill="#c2603c"/>` +
    camel(244, 180, 1.05) +
    `<path d="M234,166h22l-3,-8h-16z" fill="#37b3a4"/>` +
    camel(310, 194, 1.2, "#6b4a28") +
    `<path d="M298,178h26l-3,-9h-20z" fill="#f5b31c"/>` +
    // 手前(y>170 は中央でも隠れない)。井戸・荷・岩・草むら。
    `<g fill="#a89060"><ellipse cx="70" cy="196" rx="17" ry="6"/></g>` +
    `<ellipse cx="70" cy="194" rx="12" ry="4" fill="#3f4f5a"/>` +
    `<g fill="#8a6a3c"><rect x="56" y="176" width="3" height="20"/><rect x="81" y="176" width="3" height="20"/><rect x="54" y="173" width="32" height="4"/></g>` +
    `<path d="M70,177v9" stroke="#6b5330" stroke-width="1.2" fill="none"/>` +
    `<path d="M66,186h8v6h-8z" fill="#6b5330"/>` +
    goat(120, 200) +
    goat(146, 194, 0.86, "#d8cbae") +
    // 岩は地面より2段暗くしないと、ただの染みになる(ガイド §4.4)。
    `<g fill="#8a7550"><path d="M198,204c4,-10 14,-12 20,-6c6,-2 10,2 10,6z"/><path d="M236,206c3,-7 10,-9 14,-4c4,-1 7,1 7,4z"/></g>` +
    `<g fill="#6f5c3d" opacity=".7"><path d="M212,198c3,-2 6,-1 7,2z"/></g>` +
    `<g stroke="#9c8452" stroke-width="1.6" fill="none" stroke-linecap="round"><path d="M340,206l-4,-9M344,206l1,-10M348,206l5,-9M368,204l-3,-8M372,204l2,-9"/></g>` +
    // 砂に残る隊商の足あと
    `<g fill="#a68a4e" opacity=".55"><ellipse cx="150" cy="184" rx="3" ry="1.6"/><ellipse cx="164" cy="188" rx="3" ry="1.6"/><ellipse cx="178" cy="192" rx="3" ry="1.6"/><ellipse cx="192" cy="196" rx="3" ry="1.6"/><ellipse cx="206" cy="200" rx="3" ry="1.6"/></g>`,

  /**
   * 椰子と礁湖の海辺。
   *
   * シンガポール・ジャカルタ・ラゴス・ベレン・スバなど**大陸をまたいで9都市が使う**ので、
   * どこか1つの国に見える建物は置かない。「熱帯の港町」の共通項
   * (礁湖・高床の家・丸木舟・干し網・浜の市)だけで組む。
   *
   * 海は y=104〜152、砂は y=152 から。**この境目は動かせない。**
   * 動きの層(`world-tropics.tsx`)が y=112〜142 に波を、y=151/152 に波打ちぎわの泡を
   * 置いている。椰子も `palmRow(200,4,46)` の位置に葉を重ねてくるので、そのまま残す。
   */
  tropics:
    // 空。動きの層が驟雨を降らせるので、その降り元の雲を右手に置く。
    sky("#8fc4e8", "#dcecf2", 104) +
    `<circle cx="64" cy="32" r="27" fill="#f5d06a" opacity=".3"/>` +
    sun(64, 32, 16) +
    cirrus(96, 17, 42) +
    cirrus(214, 28, 30, ".32") +
    cirrus(38, 58, 26, ".34") +
    cirrus(300, 12, 32, ".4") +
    squall(324, 36) +
    // 遠い島影。**丸い輪郭にすると雲と見分けが付かない**ので、稜線を尖らせる。
    // 雨雲(灰青)と別の色域(暗い青緑)にして、空と地面を取り違えないようにする。
    `<path d="M0,104L18,84L30,92L48,70L64,88L78,80L96,104z" fill="#5a8288" opacity=".85"/>` +
    `<path d="M400,104L382,86L368,94L348,74L330,92L316,84L298,104z" fill="#5a8288" opacity=".85"/>` +
    `<path d="M262,104L276,88L286,95L300,104z" fill="#48706f" opacity=".7"/>` +
    `<path d="M84,104L98,90L108,97L120,104z" fill="#48706f" opacity=".7"/>` +
    // 島にかかる靄(遠さを出す)
    `<rect x="0" y="97" width="400" height="7" fill="#cfe4f0" opacity=".35"/>` +
    // 海。沖・礁湖・浅瀬の3段。同じ青を使い回さず明度を分ける。
    band(104, 14, "#1f7f9c") +
    band(118, 14, "#2f9fb8") +
    band(132, 20, "#5fc8d0") +
    // 礁の砕け波
    `<g stroke="#eafbfd" stroke-width="2.4" opacity=".6" fill="none"><path d="M0,118q26,-5 52,0t52,0M132,118q26,-5 52,0t52,0M264,118q26,-5 52,0t52,0"/></g>` +
    ripples(126) +
    // 日ざしの照り返し(太陽の真下)
    `<g stroke="#f2fbfd" stroke-width="2" opacity=".38" fill="none"><path d="M46,110h22M36,120h32M50,132h24M30,142h28"/></g>` +
    // 水上の高床の家。脚は波打ちぎわで砂に隠れる。脚もとに接する波を置いて、
    // 水面より上に立っていることを見せる(輪郭だけでは水に空いた穴と区別できない)。
    stiltHouse(300, 138) +
    stiltHouse(354, 132, 0.88) +
    `<g stroke="#eafbfd" stroke-width="1.4" opacity=".55" fill="none"><path d="M294,150h12M318,150h12M348,148h10M372,148h10"/></g>` +
    // 桟橋。杭が水に入るところにも波を立てる。
    `<g fill="#8a5a2c"><rect x="0" y="124" width="72" height="4"/><rect x="10" y="128" width="3" height="20"/><rect x="34" y="128" width="3" height="20"/><rect x="58" y="128" width="3" height="20"/></g>` +
    `<g stroke="#eafbfd" stroke-width="1.4" opacity=".5" fill="none"><path d="M6,140h12M30,140h12M54,140h12"/></g>` +
    `<g stroke="#6b4a28" stroke-width="1.4" fill="none"><path d="M70,126q10,7 20,5"/></g>` +
    // 舫った小舟。**映り込みを先に敷いてから舟を重ねる**(舟が波を遮る側になる)。
    afloat(100, 136, 40, "#17607a", ".34") +
    `<path d="M80,134c10,-5 30,-5 40,0c-6,6 -34,6 -40,0z" fill="#e8443f"/>` +
    `<path d="M86,133c8,-3 24,-3 30,0c-4,3 -26,3 -30,0z" fill="#f6efe2"/>` +
    `<rect x="98" y="114" width="2.2" height="18" fill="#6b5330"/>` +
    `<path d="M100,115l12,10l-12,3z" fill="#f6efe2" opacity=".9"/>` +
    // 砂浜。濡れた砂 → 乾いた砂 → 砂丘の3段。
    ground(152, "#f0e0b8") +
    `<path d="M0,152c60,7 120,-3 200,2c80,5 140,-2 200,2v9H0z" fill="#d8c48e" opacity=".75"/>` +
    `<path d="M0,170c60,9 120,-6 200,2c80,8 140,-4 200,3v35H0z" fill="#e8d4a4"/>` +
    `<g stroke="#d4bd85" stroke-width="1.6" opacity=".6" fill="none"><path d="M0,186q100,-7 200,0t200,0M0,200q100,-7 200,0t200,0"/></g>` +
    // 椰子。**幹と葉の位置は動きの層と揃えたまま**、奥と手前の葉だけを足して厚みを出す。
    palmBack(30, 154) +
    palmBack(143.3, 154) +
    palmBack(256.7, 154) +
    palmBack(370, 154) +
    palmRow(200, 4, 46) +
    palmFront(30, 154) +
    palmFront(143.3, 154) +
    palmFront(256.7, 154) +
    palmFront(370, 154) +
    // 浜の市の日よけ(右)。屋根は影の楕円(y=169まで)の下に置く。
    `<path d="M296,172h76l-8,-10h-60z" fill="#a8813c"/>` +
    `<g stroke="#8a6a2c" stroke-width="1.2" opacity=".8" fill="none"><path d="M300,168h68"/></g>` +
    `<g fill="#6b5330"><rect x="298" y="172" width="3" height="22"/><rect x="367" y="172" width="3" height="22"/></g>` +
    `<rect x="306" y="182" width="56" height="4" fill="#c9a877"/>` +
    `<g fill="#e8443f"><circle cx="314" cy="178" r="3.4"/><circle cx="322" cy="179" r="3"/></g>` +
    `<g fill="#f5b31c"><circle cx="332" cy="178" r="3.2"/><circle cx="340" cy="179" r="2.8"/></g>` +
    `<g fill="#4d7a44"><circle cx="350" cy="178" r="3.2"/><circle cx="357" cy="179" r="2.6"/></g>` +
    person(288, 204, 1.4, "#4d7a44") +
    beachDog(340, 206) +
    // 砂に上げた丸木舟(舷外浮材つき)。櫂は舟に立てかけて、まわりを空ける。
    `<path d="M60,190c18,-8 60,-8 78,0c-10,10 -68,10 -78,0z" fill="#8a5a2c"/>` +
    `<path d="M67,189c15,-5 49,-5 64,0c-8,5 -56,5 -64,0z" fill="#c9a877"/>` +
    `<rect x="56" y="186" width="86" height="3.4" fill="#5a4630"/>` +
    `<g stroke="#6b4a28" stroke-width="2" fill="none"><path d="M78,192l-16,10M120,192l16,10"/></g>` +
    `<path d="M54,202h96v4h-96z" fill="#6b5330"/>` +
    `<path d="M44,204l22,-26l3.4,2.6l-22,26z" fill="#6b5330"/>` +
    `<path d="M67,180c4,-5 9,-5 11,-1.6c-2.6,3.4 -7,6 -12.6,6z" fill="#8a6a3c"/>` +
    /*
     * 浜の手前(y>170 は中央でも隠れない)。
     *
     * **この浜を「港町」にしているのは建物ではなく、人が何をしているか。**
     * 網を繕う、魚をより分ける、舟から網を引き上げる、荷を市へ運ぶ、浅瀬で遊ぶ。
     * 大きさは 24〜28px。20pxでは他の細部に埋もれて、いるのかどうか分からなかった。
     */
    // 荷を市へ運ぶ人
    person(38, 206, 1.4, "#37b3a4", "carry") +
    // 網を繕う人と、砂に広げた網。
    // **網は面で描く**(細い線だけだと砂の引っかき傷に見えた)が、
    // **弧を大きく取らないこと**。人や籠の上を跨ぐと、網ではなく吊り橋に見えた。
    person(156, 207, 1.25, "#5b8fe8", "crouch") +
    `<path d="M166,208q10,-8 24,-6q14,-1 21,5q-10,5 -23,3q-12,1 -22,-2z" fill="#ded3ba" opacity=".85"/>` +
    `<g stroke="#a08f76" stroke-width=".9" opacity=".9" fill="none"><path d="M172,206q8,-5 16,-3M178,203q11,0 19,4M177,201v6M191,200v7M203,202v5"/></g>` +
    // 浮子。**網だと分かるのはこれ。**縁に沿った点が無いと、弧と縦線が吊り橋に見えた。
    `<g fill="#e8443f"><circle cx="170" cy="204" r="1.8"/><circle cx="183" cy="200.6" r="1.8"/><circle cx="197" cy="201" r="1.8"/><circle cx="209" cy="205" r="1.8"/></g>` +
    // 魚をより分ける人と、その盤
    person(224, 205, 1.4, "#f5b31c", "crouch") +
    `<ellipse cx="244" cy="202" rx="15" ry="5.2" fill="#b89a5c"/>` +
    `<ellipse cx="244" cy="200" rx="12" ry="3.4" fill="#cfe4f0" opacity=".9"/>` +
    `<g fill="#8fb8cc"><ellipse cx="238" cy="200" rx="4" ry="1.8"/><ellipse cx="248" cy="201" rx="3.4" ry="1.6"/></g>` +
    // 浅瀬で遊ぶ子。小さく描いて奥にいることを見せる。
    // 砂と同系色にすると沈むので、この絵に無い色を着せる。
    person(252, 173, 0.8, "#e8447a") +
    `<g stroke="#eafbfd" stroke-width="1.4" opacity=".6" fill="none"><path d="M240,172h9M257,173h9"/></g>` +
    // 波打ちぎわの足あと
    `<g fill="#d4bd85" opacity=".7"><ellipse cx="290" cy="176" rx="2.6" ry="1.6"/><ellipse cx="298" cy="181" rx="2.6" ry="1.6"/><ellipse cx="306" cy="186" rx="2.6" ry="1.6"/><ellipse cx="314" cy="191" rx="2.6" ry="1.6"/></g>`,

  /**
   * アカシアと乾いた草原。
   *
   * 使うのはダカールとナイロビ。どちらもアフリカだが、片方は大西洋岸のサヘル、
   * もう片方は東アフリカの高地なので、**どちらとも読める乾いた草原**にとどめる。
   * 平らな地平・傘のような樹・遠くの群れ・蟻塚・土ぼこりで組む。
   *
   * **置き場所を先に数えてある(隠れる帯 x=151〜249 / y=54〜152):**
   * 象は x が帯にかかるが上端 y=160 で帯より下なので無事。
   * **麒麟は頭が y=136** と帯の中に入るため、x を右へ寄せて帯から離した
   * (元の x=268 では左端が 252.5 で、余裕が 3.5px しかなかった)。
   *
   * **動きの層(`world-savanna.tsx`)と噛み合っている位置:**
   * 太陽 (84,40) / 陽炎 y=126・152 / 土ぼこり y=176・192・202 /
   * 象 (176,196) s=0.92 の耳 / 枯れ草 (20,200) (32,204) (44,198) (356,202) (368,206) (380,200)
   */
  savanna:
    sky("#e8c88a", "#f2dcae", 126) +
    `<g fill="#e0b878" opacity=".4"><ellipse cx="150" cy="22" rx="90" ry="5"/><ellipse cx="320" cy="14" rx="60" ry="4"/></g>` +
    `<circle cx="84" cy="40" r="32" fill="#f5d69a" opacity=".5"/>` +
    sun(84, 40, 22, "#f0a83c") +
    // 右の岩山(コピエ)。面を割って、砂丘や丘と見分けが付くようにする。
    `<path d="M232,124h132l-24,-30h-84z" fill="#8a7f66"/>` +
    `<path d="M256,94h84l24,30h-46z" fill="#6f6a5e" opacity=".65"/>` +
    `<path d="M232,124l24,-30h18l-14,30z" fill="#a09680" opacity=".7"/>` +
    `<g stroke="#5f5a50" stroke-width="1.2" opacity=".45" fill="none"><path d="M262,102l30,10M280,98l24,14M300,104l22,10"/></g>` +
    hills(126, "#a89873", 3) +
    // 地平の靄と、その手前を歩く遠い群れ。**繰り返しなので中央が隠れても惜しくない。**
    `<rect x="0" y="120" width="400" height="10" fill="#f2dcae" opacity=".45"/>` +
    `<g fill="#8a7f66" opacity=".55">` +
    [30, 46, 60, 78, 96, 158, 172, 188, 206, 224, 300, 316, 332]
      .map((hx, i) => {
        const hy = 128 + (i % 3);
        return `<ellipse cx="${hx}" cy="${hy}" rx="4.6" ry="2.4"/><rect x="${hx - 3.4}" y="${hy}" width="1.4" height="3.4"/><rect x="${hx + 2}" y="${hy}" width="1.4" height="3.4"/><circle cx="${hx - 5.4}" cy="${hy - 2.6}" r="1.8"/>`;
      })
      .join("") +
    `</g>` +
    ground(126, "#d8bc72") +
    `<path d="M0,152c70,-8 130,6 200,0c70,-6 130,2 200,8v50H0z" fill="#c9a85c"/>` +
    `<path d="M0,180c60,-6 120,8 200,2c80,-6 140,4 200,8v20H0z" fill="#bd9a4c"/>` +
    `<g stroke="#b08e42" stroke-width="1.6" opacity=".45" fill="none"><path d="M0,166q100,-7 200,0t200,0M0,192q100,-7 200,0t200,0"/></g>` +
    // 蟻塚。乾いた草原にしかない形なので、これだけで場所が伝わる。
    `<path d="M116,178c2,-16 6,-22 8,-22c2,0 6,6 8,22z" fill="#a8763c"/>` +
    `<path d="M124,156c1,4 2,10 2,22h-4c0,-12 1,-18 2,-22z" fill="#8a5a2c" opacity=".6"/>` +
    `<path d="M300,186c2,-13 5,-18 6,-18c1,0 4,5 6,18z" fill="#a8763c"/>` +
    // アカシア。傘の形は層を重ねてから、幹の分かれを足す。
    acacia(64, 152, 1) +
    `<path d="M34,128c6,-9 50,-9 56,0c-13,3 -43,3 -56,0z" fill="#3f6b3a"/>` +
    `<path d="M40,124c6,-6 42,-6 48,0c-11,2 -37,2 -48,0z" fill="#5f8f4a"/>` +
    `<g stroke="#6b5330" stroke-width="1.4" fill="none"><path d="M63,140l-10,-10M63,140l9,-8"/></g>` +
    // 右のアカシアは x=352 へ寄せてある。330 のままだと**樹冠が麒麟の首と重なり**、
    // 角と頭が枝葉に紛れて読めなくなった(撮って気づいた)。
    acacia(352, 160, 1.1) +
    `<path d="M318,158c6,-10 55,-10 61,0c-14,4 -47,4 -61,0z" fill="#3f6b3a" transform="translate(0,-24)"/>` +
    `<path d="M325,152c6,-6 47,-6 53,0c-13,2 -40,2 -53,0z" fill="#5f8f4a" transform="translate(0,-24)"/>` +
    `<g stroke="#6b5330" stroke-width="1.6" fill="none"><path d="M351,146l-11,-11M351,146l10,-9"/></g>` +
    // 木陰(乾いた地面に落ちる濃い影)
    `<g fill="#a8863c" opacity=".45"><ellipse cx="64" cy="153" rx="30" ry="6"/><ellipse cx="352" cy="161" rx="32" ry="6.4"/></g>` +
    // 群れ。象は動きの層が耳をあおぐので (176,196) s=0.92 のまま。
    elephant(176, 196, 0.92) +
    elephant(212, 200, 0.52, "#7a7160", "#6a6152") +
    zebra(104, 186, 0.95) +
    zebra(78, 196, 0.8, "#e8e2d2") +
    giraffe(292, 190, 0.86) +
    // 群れを見に来た人。**背より高い部位が無いので、ここは中央でも y>170 なら安全。**
    person(238, 204, 1.3, "#e8443f") +
    `<path d="M238,192v-16" stroke="#6b5330" stroke-width="1.6" fill="none"/>` +
    // 白鷺。象のそばに降りているのが、この草原らしさ。
    `<g fill="#f6efe2"><ellipse cx="150" cy="200" rx="4" ry="2.2"/><circle cx="146.6" cy="197.4" r="1.7"/>` +
    `<rect x="149" y="202" width="1.2" height="3"/><rect x="152" y="202" width="1.2" height="3"/></g>` +
    `<path d="M144.6,197l-3.4,1.2l2.6,1" fill="#f5b31c"/>` +
    `<g fill="#f6efe2"><ellipse cx="264" cy="204" rx="3.4" ry="1.9"/><circle cx="261.2" cy="201.8" r="1.5"/>` +
    `<rect x="263.2" y="205.6" width="1" height="2.8"/><rect x="265.6" y="205.6" width="1" height="2.8"/></g>` +
    // 手前の低木と、白く晒された骨
    `<g fill="#8a7a3c"><ellipse cx="20" cy="176" rx="12" ry="6"/><ellipse cx="34" cy="180" rx="8" ry="4.4"/>` +
    `<ellipse cx="372" cy="178" rx="11" ry="5.6"/></g>` +
    // 晒された骨。**十字に組むと骨に見えない**(プラス記号になった)。
    // 端の膨らんだ長骨を1本、寝かせて置く。
    `<path d="M52,204q10,-3 20,0" stroke="#e8e2d2" stroke-width="2.4" fill="none" stroke-linecap="round"/>` +
    `<g fill="#e8e2d2"><circle cx="51" cy="204.6" r="2.2"/><circle cx="53.4" cy="202.6" r="1.8"/>` +
    `<circle cx="73" cy="204.6" r="2.2"/><circle cx="70.6" cy="202.4" r="1.8"/></g>` +
    `<g stroke="#a8913c" stroke-width="2" opacity=".7" fill="none"><path d="M20,200v-10M32,204v-12M44,198v-9M356,202v-11M368,206v-13M380,200v-10"/></g>`,

  /** 岸壁とクレーンの港。 */
  harbour:
    sky("#8fb8d8", "#cfe4f0") +
    clouds(76, 26) +
    sun(330, 34, 15, "#f5d06a") +
    band(108, 48, "#2f6f9f") +
    ripples(120, "#8fc4e8") +
    ground(156, "#8a8578") +
    `<rect x="0" y="156" width="400" height="6" fill="#6f6a5e"/>` +
    // 貨物船
    `<path d="M28,146h150l-14,18H40z" fill="#3a4453"/>` +
    `<path d="M32,152h142l-9,10H41z" fill="#c2603c"/>` +
    `<rect x="120" y="120" width="46" height="26" fill="#f2ede0"/>` +
    `<g fill="#5f8fa8"><rect x="126" y="126" width="10" height="8"/><rect x="140" y="126" width="10" height="8"/><rect x="154" y="126" width="10" height="8"/></g>` +
    `<rect x="136" y="104" width="12" height="16" fill="#e8443f"/><rect x="136" y="104" width="12" height="4" fill="#2a2f38"/>` +
    crane(226, 158) +
    crane(324, 158) +
    containers(232, 210, [3, 2]) +
    `<g fill="#4a4438"><rect x="0" y="164" width="400" height="4"/></g>` +
    containers(30, 210, [4, 2]),

  /** 雪嶺と石橋の山あい。 */
  /**
   * 山あいの町と山湖。
   *
   * 使うのはアディスアベバ・ケープタウン・バンクーバー・クスコで、4大陸にまたがる。
   * どこか1つの峰(テーブルマウンテンなど)の形にすると他が嘘になるので、
   * 「高いところの町」の共通項 — 稜線・雪・段々畑・石積みの家・駄獣・山湖 — で組む。
   *
   * **隠れる帯(x=151〜249)には高架橋の連続アーチを置いている。**
   * 繰り返しの形なので、中央がシンボルに隠れても失うものが少ない。
   * 読ませたいもの(村・段々畑・獣・人)は左右3分の1へ寄せる。
   *
   * **動きの層(`world-mountains.tsx`)と噛み合っている位置:**
   * 高架橋の桁の上端 y=120(汽車が渡る)/ 峰 (58,58) (142,42) (306,80)(雪煙が流れる)/
   * 山湖 y=180〜210(きらめきが y=186・188・198 に乗る)
   */
  mountains:
    sky("#7fb0d8", "#cfe0ea", 128) +
    cirrus(96, 20, 40, ".4") +
    cirrus(310, 30, 32, ".32") +
    // 奥の稜線(淡くして遠さを出す)
    `<path d="M0,128L40,90L78,106L122,78L170,112L216,88L268,118L322,98L400,128z" fill="#aebdcb"/>` +
    /*
     * 主稜線。
     *
     * **3つ目の峰を (306,80) に作り直した。** 元の稜線は (244,70) が3つ目の峰で、
     * (306,80) には稜線が無かったのに、そこへ雪冠が描かれていた
     * ——**雪の三角が空に浮いていた。**動きの層も (318,78) から雪煙を流すので、
     * 雪冠と雪煙のほうに合わせて稜線を通す。峰1 (58,58) と峰2 (142,42) は変えない。
     */
    `<path d="M0,128l58,-70l38,42l46,-58l54,68l48,-40l22,26l40,-16l94,48v82H0z" fill="#8fa4b8"/>` +
    // 岩の面。稜線を一様な板にしない(ただし稜線の内側だけに置くこと)。
    `<g fill="#7a8ea4" opacity=".8"><path d="M58,58l38,42l-24,4z"/><path d="M142,42l54,68l-30,2z"/><path d="M306,80l-40,16l30,10z"/></g>` +
    `<g stroke="#6f8299" stroke-width="1.2" opacity=".5" fill="none"><path d="M58,70l14,16M142,56l18,22M244,80l10,12M306,92l12,14"/></g>` +
    // 雪冠(位置は動きの層の雪煙と対応)
    `<path d="M58,58l21,24h-42zM142,42l27,34h-54zM306,80l24,22h-48z" fill="#f8fbfd"/>` +
    `<g fill="#dce8f0"><path d="M58,58l21,24h-12z"/><path d="M142,42l27,34h-14z"/><path d="M306,80l24,22h-12z"/></g>` +
    // 雪渓(谷筋に残る雪)
    `<g fill="#eef4f8" opacity=".8"><path d="M96,100l8,26l-14,-2z"/><path d="M196,110l10,18l-16,-1z"/></g>` +
    ground(128, "#5f7f5a") +
    `<path d="M0,146c70,-14 130,10 200,2c70,-8 130,4 200,10v52H0z" fill="#4d7a44"/>` +
    // 右: 斜面の段々畑。**針葉樹より先に描く**(後にすると木の根元を塗りつぶす)。
    // 緑の帯だけだと草地と見分けが付かないので、土留めの石垣を挟む。
    `<g fill="#84a85a"><path d="M312,136h88v7h-88zM304,146h96v7h-96zM296,156h104v7H296z"/></g>` +
    `<g fill="#cbba95"><path d="M310,143h90v4h-90zM302,153h98v4h-98zM294,163h106v4H294z"/></g>` +
    `<g fill="#a8c47a"><rect x="330" y="137" width="24" height="5"/><rect x="356" y="147" width="28" height="5"/><rect x="312" y="157" width="26" height="5"/></g>` +
    firRow(146, [22, 46, 70, 330, 356, 380], 26) +
    // 潅木。針葉樹だけにすると北の森になるので、丸い低木を混ぜる。
    `<g fill="#41703c"><ellipse cx="94" cy="158" rx="7" ry="5"/><ellipse cx="106" cy="162" rx="5.4" ry="4"/>` +
    `<ellipse cx="300" cy="160" rx="6.4" ry="4.6"/><ellipse cx="312" cy="164" rx="5" ry="3.6"/></g>` +
    // 左: 石積みの家が数軒。屋根の形は決めすぎない。
    `<g fill="#c9bfa8"><rect x="10" y="140" width="24" height="18"/><rect x="38" y="146" width="20" height="14"/><rect x="62" y="136" width="18" height="22"/></g>` +
    `<g fill="#8a5a42"><path d="M6,140h32l-16,-9z"/><path d="M34,146h28l-14,-8z"/><path d="M58,136h26l-13,-8z"/></g>` +
    `<g fill="#6b5330"><rect x="18" y="149" width="6" height="9"/><rect x="45" y="153" width="5" height="7"/><rect x="68" y="146" width="5" height="12"/></g>` +
    `<g stroke="#a89a80" stroke-width="1" opacity=".7" fill="none"><path d="M10,147h24M10,153h24M38,152h20M62,143h18M62,150h18"/></g>` +
    // 石造りの高架橋(桁の上端 y=120 を汽車が渡る)
    arches(96, 168, 5, 42, 40, "#c9bfa8", "#7f93a8") +
    `<g stroke="#a89a80" stroke-width="1.2" opacity=".6" fill="none"><path d="M96,140h210M96,152h210"/></g>` +
    `<rect x="88" y="124" width="226" height="10" fill="#dfd8c8"/>` +
    `<rect x="88" y="120" width="226" height="4" fill="#a89873"/>` +
    `<rect x="88" y="134" width="226" height="3" fill="#a89873" opacity=".6"/>` +
    // 駄獣と、追う人。左右の草地に置く(中央は高架橋)。
    llama(52, 178, 1) +
    llama(76, 174, 0.86, "#cfc0a4") +
    person(96, 178, 1.25, "#c2603c") +
    llama(336, 176, 0.95, "#d8cbae") +
    person(358, 176, 1.15, "#5b8fe8", "carry") +
    // 山湖。まず映り込みとさざ波、そのあとに舟(`boat` が順序を持っている)。
    band(180, 30, "#3f7f9f") +
    `<g fill="#8fa4b8" opacity=".3"><path d="M40,180l18,22h-36zM124,180l22,26h-44zM288,180l20,24h-40z"/></g>` +
    `<g fill="#f8fbfd" opacity=".25"><path d="M40,180l10,12h-20zM124,180l12,14h-24zM288,180l10,12h-20z"/></g>` +
    `<g stroke="#bfe0f0" stroke-width="2" opacity=".7" fill="none"><path d="M40,190h80M200,198h90M250,186h60"/></g>` +
    boat(160, 196, 42, "#8a5a2c", "#4a3320", "#c9a877") +
    `<circle cx="160" cy="188" r="3" fill="#8a5a34"/>` +
    `<path d="M157,191q3,-1.4 6,0l1,4.4h-8z" fill="#f5b31c"/>` +
    `<path d="M153,194l14,-7" stroke="#6b5330" stroke-width="1.8" fill="none"/>` +
    // 岸辺の石。水際をはっきりさせる。
    `<g fill="#6f7a6a"><ellipse cx="24" cy="180" rx="12" ry="3.4"/><ellipse cx="376" cy="181" rx="14" ry="3.6"/></g>`,

  /** 極夜のオーロラと氷。 */
  /**
   * 極夜のツンドラ。
   *
   * 使うのはレイキャヴィク・ウランバートル・ウシュアイアで、
   * 北極圏・モンゴル草原・南極圏にまたがる。**装いや住居で示すと3つとも嘘になる**
   * (イグルーもゲルも、どれか1つの土地のものになってしまう)ので、
   * 寒さそのもの — 低い光・凍った海・雪原・防寒具の人影・野生のトナカイ — で組む。
   * 橇や馴らした群れではなく**野生のトナカイ**にしたのも同じ理由。
   *
   * **置き場所を先に決めてある:** トナカイの角は背より 26px 高く、
   * 中央に置くと y=150 あたりで台座に食われる。3頭とも隠れる帯(x=151〜249)の外。
   *
   * **動きの層(`world-tundra.tsx`)と噛み合っている位置:**
   * 小屋の窓 (280,136) 14×12 にランプがまたたく / オーロラの帳 y=28〜74 /
   * 星 / 粉雪は y=0 から降る
   */
  tundra:
    band(0, 74, "#16233c") +
    band(70, 60, "#1f3350") +
    stars(26) +
    // 低い月。極夜の光源をひとつ置くと、雪面の明るさに理由ができる。
    `<circle cx="330" cy="52" r="13" fill="#e8eef2" opacity=".9"/>` +
    `<circle cx="330" cy="52" r="20" fill="#cfe0ea" opacity=".18"/>` +
    `<circle cx="335" cy="48" r="2.6" fill="#c9d8e4" opacity=".5"/>` +
    `<circle cx="326" cy="57" r="1.8" fill="#c9d8e4" opacity=".4"/>` +
    aurora() +
    // 遠い雪の峰。氷の海の向こうに置く。
    `<path d="M0,118L34,92L58,104L92,84L124,110L152,96L186,118z" fill="#2f4462"/>` +
    `<path d="M232,118L266,94L292,106L322,88L352,108L400,118z" fill="#2f4462"/>` +
    `<g fill="#8fa4bc" opacity=".8"><path d="M92,84l12,16h-24zM322,88l11,15h-22zM34,92l9,12h-18z"/></g>` +
    `<path d="M0,118c60,-14 110,6 180,-2c70,-8 140,4 220,10v84H0z" fill="#cfe0ea"/>` +
    band(126, 26, "#16293f") +
    // 氷の海に落ちるオーロラと月あかり
    `<g stroke="#5fd8a8" stroke-width="3" opacity=".22" fill="none"><path d="M20,132h90M180,136h120"/></g>` +
    `<g stroke="#a8d8f4" stroke-width="2" opacity=".25" fill="none"><path d="M300,142h70M60,144h80"/></g>` +
    `<g fill="#e8eef2" opacity=".35"><ellipse cx="330" cy="140" rx="9" ry="3"/></g>` +
    // 流氷。稜のある面と平らな面に割ると、板ではなく氷に見える。
    `<g fill="#e8eef2"><path d="M40,138h56l-8,10H48z"/><path d="M150,132h40l-6,8h-28z"/><path d="M244,140h64l-9,10h-46z"/>` +
    `<path d="M110,134h28l-4,7h-20z"/><path d="M198,142h34l-5,7h-24z"/></g>` +
    `<g fill="#b8ccd8"><path d="M88,138h8l-8,10h-6z"/><path d="M184,132h6l-6,8h-4z"/><path d="M300,140h8l-9,10h-6z"/></g>` +
    ground(148, "#e8eef2") +
    `<path d="M0,170c80,-8 140,8 210,2c70,-6 120,2 190,6v32H0z" fill="#dbe6ee"/>` +
    // 雪の吹きだまりと、風が刻んだ筋。青い影を入れないと紙のように白い。
    `<g fill="#c4d6e2"><ellipse cx="60" cy="184" rx="46" ry="8"/><ellipse cx="230" cy="196" rx="60" ry="9"/>` +
    `<ellipse cx="370" cy="180" rx="34" ry="7"/></g>` +
    `<g stroke="#b8ccd8" stroke-width="2" opacity=".8" fill="none"><path d="M20,190q90,-14 180,0t180,-6M0,204q100,-10 200,0t200,-4"/></g>` +
    // 灯りのついた小屋。窓 (280,136) は動きの層のランプと対応するので動かせない。
    `<rect x="256" y="128" width="70" height="24" fill="#6b5330"/>` +
    `<g stroke="#54401f" stroke-width="1.4" opacity=".8" fill="none"><path d="M256,134h70M256,140h70M256,146h70"/></g>` +
    `<path d="M250,128h82l-41,-18z" fill="#8a5a2c"/>` +
    `<path d="M250,128h82l-6,-3H256z" fill="#6b4423"/>` +
    // 屋根に積もった雪
    `<path d="M252,126h78l-39,-15z" fill="#e8eef2"/>` +
    `<rect x="280" y="136" width="14" height="12" fill="#f5b31c"/>` +
    `<g stroke="#8a6a2c" stroke-width="1.2" fill="none"><path d="M287,136v12M280,142h14"/></g>` +
    `<rect x="302" y="138" width="10" height="14" fill="#4a3320"/>` +
    // 煙突と、まっすぐ立ちのぼる煙(風の無い寒さ)
    `<rect x="266" y="106" width="8" height="12" fill="#5a4630"/>` +
    `<g fill="#cfe0ea" opacity=".45"><ellipse cx="270" cy="98" rx="5" ry="4"/><ellipse cx="272" cy="88" rx="6.4" ry="5"/>` +
    `<ellipse cx="269" cy="76" rx="7.6" ry="5.6"/></g>` +
    // 薪の山と、柱に下げた提灯
    `<g fill="#6b5330"><ellipse cx="340" cy="152" rx="12" ry="4"/><ellipse cx="340" cy="148" rx="11" ry="3.6"/>` +
    `<ellipse cx="340" cy="144.5" rx="9" ry="3.2"/></g>` +
    `<g fill="#8a6a3c"><circle cx="333" cy="151" r="1.8"/><circle cx="340" cy="147" r="1.8"/><circle cx="345" cy="151" r="1.6"/></g>` +
    `<rect x="242" y="140" width="3" height="26" fill="#5a4630"/>` +
    `<path d="M238,140h11l-5.5,-6z" fill="#5a4630"/>` +
    `<rect x="240.5" y="140" width="6" height="7" fill="#f5b31c"/>` +
    `<circle cx="243.5" cy="143" r="9" fill="#f5b31c" opacity=".16"/>` +
    firRow(150, [40, 62, 84], 22, "#25452f") +
    firRow(154, [14, 108, 132], 18, "#1e3a28") +
    // 梢に載った雪。**横長の楕円で置くと、宙に浮いた白い皿に見えた。**
    // 木と同じ三角で、てっぺんに載せる。
    `<g fill="#e8eef2"><path d="M40,128l5.4,7.4h-10.8zM62,128l5.4,7.4h-10.8zM84,128l5.4,7.4h-10.8z"/>` +
    `<path d="M14,136l4.4,6h-8.8zM108,136l4.4,6h-8.8zM132,136l4.4,6h-8.8z"/></g>` +
    /*
     * 野生のトナカイ。**角は背より26px高い**ので、3頭とも隠れる帯の外に置いてある
     * (x=104 と x=136 は帯の左、x=356 は帯の右)。
     */
    reindeer(104, 186, 1) +
    reindeer(136, 178, 0.82) +
    reindeer(356, 196, 0.88) +
    // 厚着の人影。顔を描かず、丸い頭巾と厚い胴で寒さを見せる。
    `<ellipse cx="206" cy="204" rx="8" ry="2.4" fill="#000" opacity=".12"/>` +
    `<path d="M199,203q7,-4 14,0l-2,-16q-5,-3 -10,0z" fill="#37536b"/>` +
    `<circle cx="206" cy="183" r="6" fill="#4a6b86"/>` +
    `<circle cx="206" cy="184.4" r="4" fill="#2a3a4c"/>` +
    `<g fill="#37536b"><rect x="201.4" y="203" width="3.6" height="4"/><rect x="207" y="203" width="3.6" height="4"/></g>` +
    `<path d="M213,190l7,-4" stroke="#37536b" stroke-width="3" fill="none" stroke-linecap="round"/>` +
    `<ellipse cx="184" cy="200" rx="7" ry="2.2" fill="#000" opacity=".12"/>` +
    `<path d="M178,199q6,-3.4 12,0l-1.8,-14q-4.4,-2.6 -8.6,0z" fill="#8a4f42"/>` +
    `<circle cx="184" cy="182" r="5.2" fill="#a8635a"/>` +
    `<circle cx="184" cy="183.2" r="3.4" fill="#2a3a4c"/>` +
    `<g fill="#8a4f42"><rect x="180" y="199" width="3.2" height="3.6"/><rect x="185" y="199" width="3.2" height="3.6"/></g>` +
    // 雪に残る橇の轍
    `<g stroke="#c4d6e2" stroke-width="1.8" opacity=".9" fill="none"><path d="M0,200q80,-10 160,-2M0,206q80,-10 160,-2"/></g>`,

  /** 礁湖の向こうの火山島。 */
  /**
   * 環礁と島。
   *
   * 使うのはザンジバル・ホノルル・オークランド・パペーテで、インド洋と太平洋にまたがる。
   * **どの海とも読める島**にするため、その島だと分かる山の形(ダイヤモンドヘッドなど)や
   * 建物は置かず、緑の尾根・礁・浜・カヌー・海鳥だけで組む。
   *
   * **隠れる帯(x=151〜249 / y=54〜152)の使い方:**
   * 火口は動きの層が (178,56) から噴気を上げるので動かせず、真ん中=隠れる位置にある。
   * そこで**島が島に見える手掛かりを左右へ振り分けた** — 左肩に見える峰と滝、
   * 右へ長く下る尾根と岩肌。中央の頂が隠れても、island だと読める。
   *
   * **動きの層(`world-island.tsx`)と噛み合っている位置:**
   * 火口 (178,56) / 海 y=116〜164(波は 122・126・140・144・156)/
   * 浜の泡 cy=163・164 / 椰子の葉 (30,156) (200,156) (370,156) = `palmRow(206,3,50)`
   */
  island:
    sky("#8fc4e8", "#e0eef0") +
    sun(322, 34, 16) +
    clouds(90, 30) +
    cirrus(200, 18, 46, ".4") +
    // 空をわたる海鳥。輪郭ではなく特徴(長い翼・鉤形の嘴・二叉の尾)で鳥にする。
    seabird(78, 46, 0.9) +
    seabird(316, 62, 0.7, "#4a5568") +
    // 左の岬と、右の離れ島。島がひとつだけだと海の広さが出ない。
    `<path d="M0,120L18,104L34,112L52,102L70,120z" fill="#3f6b3a"/>` +
    `<path d="M344,120L358,98L370,108L382,96L400,120z" fill="#44724a"/>` +
    `<path d="M382,96L400,120L386,120z" fill="#31563a"/>` +
    /*
     * 主島。頂(火口)は隠れるので、**読ませる細部は左右の肩に置く。**
     */
    `<path d="M56,120L112,74L146,92L178,56L214,84L262,104L330,120z" fill="#4d7a44"/>` +
    // 谷筋(明度を変えて尾根を立てる)
    `<path d="M112,74L146,92L128,120L96,120z" fill="#3f6b3a"/>` +
    `<path d="M178,56L214,84L196,120L166,120z" fill="#448040"/>` +
    `<path d="M262,104L330,120L268,120z" fill="#3a6437"/>` +
    // 火口(動きの層がここから噴気を上げる)
    `<path d="M178,58l-14,14c10,4 20,4 30,-2z" fill="#6b6350"/>` +
    /*
     * 左肩の滝。**左3分の1なので、これは見える。**
     * 白い線を1本引いただけでは引っかき傷にしかならない。
     * 暗い谷を彫って、そこへ落として、落ち口に泡を溜める。
     */
    `<path d="M98,82L112,82L110,122L96,122z" fill="#31563a"/>` +
    `<path d="M102,85q-2,17 -1,35h5q-1,-18 1,-35z" fill="#eaf8fb" opacity=".92"/>` +
    `<path d="M101,85h7l-1,4h-5z" fill="#cfeef6" opacity=".9"/>` +
    `<ellipse cx="104" cy="120" rx="9" ry="3.2" fill="#eaf8fb" opacity=".7"/>` +
    `<ellipse cx="104" cy="119" rx="4.4" ry="1.7" fill="#f8ffff" opacity=".85"/>` +
    /*
     * 右肩の岩肌。**一様な灰色の面にしないこと。**
     * 一枚で塗ったら、緑に貼った絆創膏に見えた。明度の違う面に割って、
     * 割れ目を数本だけ不規則に入れる。
     */
    `<path d="M242,96L284,112L262,118L236,106z" fill="#8a8272" opacity=".8"/>` +
    `<path d="M258,104L284,112L266,117z" fill="#6b665a" opacity=".7"/>` +
    `<path d="M242,96L256,102L240,106z" fill="#a09884" opacity=".7"/>` +
    `<g stroke="#5f5a50" stroke-width="1.1" opacity=".5" fill="none"><path d="M250,102l19,7M244,107l13,5"/></g>` +
    // 波打ち際の崖(島と海の境をはっきりさせる)
    `<path d="M56,120h274v6H56z" fill="#3a5c36"/>` +
    // 海。沖・礁湖・浅瀬の3段。
    band(116, 14, "#2f8fa8") +
    band(130, 20, "#3fa8b8") +
    band(150, 14, "#7fd8dc") +
    // 外洋との境で砕ける礁
    `<g stroke="#eafbfd" stroke-width="2.6" opacity=".6" fill="none"><path d="M0,130q24,-5 48,0t48,0M116,130q24,-5 48,0t48,0M232,130q24,-5 48,0t48,0"/></g>` +
    `<g stroke="#bfeef4" stroke-width="3" opacity=".65" fill="none"><path d="M40,138h70M200,136h80M120,148h100M280,152h60"/></g>` +
    // 礁湖のカヌー。**波のあとに置く**(`boat` が順序を持っている)。
    boat(300, 150, 58) +
    // 漕ぎ手。胴と腕と櫂を別々に置く。
    `<circle cx="300" cy="139" r="3.4" fill="#8a5a34"/>` +
    `<path d="M296.6,142.6q3.4,-1.6 6.8,0l1.2,6h-9z" fill="#e8443f"/>` +
    `<path d="M292,146l16,-8" stroke="#6b5330" stroke-width="2" fill="none"/>` +
    `<path d="M290,147c-3,-2 -5,-1 -5.6,1c2,1 4.6,1 6.6,0z" fill="#8a6a3c"/>` +
    // 浜
    ground(164, "#f0e0b8") +
    `<path d="M0,164c60,7 120,-3 200,2c80,5 140,-2 200,2v9H0z" fill="#d8c48e" opacity=".7"/>` +
    `<path d="M0,180c60,8 120,-6 200,2c80,8 140,-4 200,3v25H0z" fill="#e8d4a4"/>` +
    `<g stroke="#d4bd85" stroke-width="1.6" opacity=".55" fill="none"><path d="M0,194q100,-7 200,0t200,0"/></g>` +
    // 椰子(位置は動きの層と揃えたまま、奥と手前の葉を足す)
    palmBack(30, 156) +
    palmBack(200, 156) +
    palmBack(370, 156) +
    palmRow(206, 3, 50) +
    palmFront(30, 156) +
    palmFront(200, 156) +
    palmFront(370, 156) +
    /*
     * 浜の手前(y>170 は中央でも隠れない)。
     * 島を島にしているのは、そこで人が海と行き来していること。
     */
    // 砂に上げた舷外浮材つきのカヌー
    `<path d="M126,184c22,-7 76,-7 98,0c-12,9 -86,9 -98,0z" fill="#8a5a2c"/>` +
    `<path d="M134,183c18,-4 60,-4 78,0c-9,4 -69,4 -78,0z" fill="#c9a877"/>` +
    `<rect x="122" y="180" width="106" height="3.4" fill="#5a4630"/>` +
    `<g stroke="#6b4a28" stroke-width="2" fill="none"><path d="M150,187l-18,11M204,187l18,11"/></g>` +
    `<path d="M120,198h114v4H120z" fill="#6b5330"/>` +
    `<path d="M108,200l22,-24l3.4,2.6l-22,24z" fill="#6b5330"/>` +
    // 網を担いで戻る人・砂に座って貝を選る人・海を見る子
    person(78, 200, 1.35, "#37b3a4", "carry") +
    person(250, 202, 1.25, "#f5b31c", "crouch") +
    `<g fill="#f6efe2"><ellipse cx="268" cy="203" rx="3" ry="2"/><ellipse cx="275" cy="205" rx="2.6" ry="1.8"/><ellipse cx="262" cy="206" rx="2.4" ry="1.7"/></g>` +
    person(340, 190, 1.15, "#e8447a") +
    // 浜の岩は、砂より2段暗くしないとただの染みになる
    `<g fill="#8a7550"><path d="M36,206c5,-11 16,-13 22,-6c6,-2 11,2 11,6z"/><path d="M300,204c4,-8 12,-10 16,-4c4,-1 8,1 8,4z"/></g>` +
    seabird(56, 176, 0.55, "#5a6472"),

  /** 列柱の遺跡。 */
  /**
   * 列柱の遺跡。
   *
   * 使うのはローマとアテネ。**どの文明とも読める遺跡**にとどめるため、
   * 柱・基壇・切妻・崩れた石だけで組み、渦巻や葉飾りの柱頭は付けない
   * (柱頭の形を決めると、そこで場所が決まってしまう)。
   *
   * **隠れる帯(x=151〜249)に入るのは柱 158 と 198。**
   * 柱は繰り返しなので、中央が隠れても失うものが少ない。
   * 読ませたいもの(折れた柱・崩れた壁・見に来た人・糸杉)は左右3分の1へ。
   *
   * **動きの層(`world-ruins.tsx`)と噛み合っている位置:**
   * 柱 x=78・118・158・198・238(18×68, y=70〜138)に順に日が差す /
   * 陽炎 y=132・160 / 土ぼこり y=182・196
   */
  ruins:
    sky("#a8c8e0", "#dce8dc", 132) +
    clouds(72, 28) +
    cirrus(280, 26, 34, ".4") +
    // 遠くの丘にも崩れた石が残っている
    hills(124, "#9a9a76", 3) +
    `<g fill="#8a8a68" opacity=".7"><rect x="24" y="112" width="4" height="12"/><rect x="32" y="108" width="4" height="16"/>` +
    `<rect x="40" y="114" width="4" height="10"/><rect x="336" y="110" width="4" height="14"/><rect x="344" y="114" width="4" height="10"/>` +
    `<rect x="24" y="108" width="22" height="3"/></g>` +
    `<rect x="0" y="124" width="400" height="8" fill="#dce8dc" opacity=".4"/>` +
    ground(132, "#c9b98c") +
    `<path d="M0,158c80,-10 140,6 210,0c70,-6 120,2 190,6v46H0z" fill="#bcaa7c"/>` +
    `<g stroke="#ab9968" stroke-width="1.6" opacity=".45" fill="none"><path d="M0,176q100,-7 200,0t200,0M0,196q100,-7 200,0t200,0"/></g>` +
    // 基壇は3段に切る(1枚の板だと台に見える)
    `<rect x="62" y="154" width="246" height="8" fill="#c2b9a4"/>` +
    `<rect x="66" y="146" width="238" height="9" fill="#cfc7b4"/>` +
    `<rect x="70" y="138" width="230" height="9" fill="#e0dbcd"/>` +
    `<g stroke="#b5ac96" stroke-width="1.2" opacity=".7" fill="none"><path d="M104,138v24M172,138v24M240,138v24"/></g>` +
    // 列柱(位置は動きの層と対応)。**溝彫りは繰り返しなので中央が隠れても惜しくない。**
    `<g fill="#e8e2d2">` +
    [78, 118, 158, 198, 238].map((x) => `<rect x="${x}" y="${70}" width="18" height="68" rx="2"/>`).join("") +
    `</g>` +
    `<g stroke="#d0c8b2" stroke-width="1.4" opacity=".9" fill="none">` +
    [78, 118, 158, 198, 238].map((x) => `M${x + 4.5},74v60M${x + 9},74v60M${x + 13.5},74v60`).join("") +
    `</g>` +
    `<g fill="#c9c0a8">` +
    [78, 118, 158, 198, 238].map((x) => `<rect x="${x - 1}" y="134" width="20" height="4"/>`).join("") +
    `</g>` +
    `<g fill="#d4ccb8">` +
    [78, 118, 158, 198, 238].map((x) => `<rect x="${x - 3}" y="64" width="24" height="7"/>`).join("") +
    `</g>` +
    `<g fill="#e0d8c4">` +
    [78, 118, 158, 198, 238].map((x) => `<rect x="${x - 1}" y="70" width="20" height="4"/>`).join("") +
    `</g>` +
    `<rect x="70" y="52" width="180" height="14" fill="#e0dbcd"/>` +
    `<g stroke="#c2b9a4" stroke-width="1.2" opacity=".8" fill="none"><path d="M70,59h180M100,52v14M160,52v14M220,52v14"/></g>` +
    `<path d="M64,52h192l-96,-26z" fill="#e8e2d2"/>` +
    `<path d="M64,52h192v4H64z" fill="#cfc7b4"/>` +
    /*
     * 崩れ。**欠けは見える側(左3分の1)に作ること。**
     * はじめ右端(x=216〜256)を欠いたが、そこは隠れる帯の中で、崩れが一切見えなかった。
     * 左の斜面を食い、楣の上端も欠けさせる。右端の欠けはそのまま残す
     * (折れた柱と倒れた円盤が右にあるので、そちらは形が読める)。
     */
    `<path d="M62,66h44V52l-44,-4z" fill="#a8c8e0"/>` +
    `<path d="M106,66V52l5,-0.6V66z" fill="#cfc7b4"/>` +
    `<g fill="#a8c8e0"><rect x="118" y="52" width="9" height="4"/><rect x="140" y="52" width="6" height="3"/></g>` +
    `<path d="M256,52l-40,-11l40,-15z" fill="#a8c8e0"/>` +
    `<path d="M250,66h58v6h-58z" fill="#e0dbcd"/>` +
    `<rect x="290" y="72" width="18" height="66" fill="#e8e2d2"/>` +
    `<g stroke="#d0c8b2" stroke-width="1.4" opacity=".9" fill="none"><path d="M294.5,76v56M299,76v56M303.5,76v56"/></g>` +
    `<path d="M290,72l18,0l0,-8l-6,-3l-12,5z" fill="#d4ccb8"/>` +
    // 折れた柱と、倒れて並ぶ円盤(繰り返し)
    `<rect x="322" y="118" width="17" height="20" fill="#e8e2d2"/>` +
    `<path d="M322,118h17l-4,-7h-9z" fill="#cfc7b4"/>` +
    `<g fill="#ddd5c0"><ellipse cx="330" cy="176" rx="22" ry="7"/><ellipse cx="356" cy="188" rx="19" ry="6.4"/>` +
    `<ellipse cx="376" cy="172" rx="17" ry="5.6"/><ellipse cx="306" cy="192" rx="20" ry="6.6"/></g>` +
    `<g fill="#c2b9a4"><ellipse cx="330" cy="173" rx="22" ry="6"/><ellipse cx="356" cy="185" rx="19" ry="5.4"/>` +
    `<ellipse cx="376" cy="169" rx="17" ry="4.8"/><ellipse cx="306" cy="189" rx="20" ry="5.6"/></g>` +
    `<g stroke="#b5ac96" stroke-width="1.2" opacity=".8" fill="none"><path d="M318,173h24M346,185h20M366,169h20M296,189h20"/></g>` +
    // 崩れた低い壁(石の抜けで崩れを見せる)
    `<g fill="#d4ccb8"><rect x="0" y="150" width="46" height="10"/><rect x="0" y="160" width="34" height="10"/>` +
    `<rect x="40" y="160" width="18" height="10"/><rect x="0" y="170" width="52" height="10"/></g>` +
    `<g stroke="#b5ac96" stroke-width="1.2" opacity=".8" fill="none"><path d="M16,150v10M34,150v10M18,160v10M26,170v10M40,170v10"/></g>` +
    // 石の割れ目から生える草と、糸杉
    `<g stroke="#5f8f4a" stroke-width="1.8" opacity=".85" fill="none" stroke-linecap="round">` +
    `<path d="M104,162v-8M106,163v-6M172,162v-7M240,163v-8M242,163v-5M312,170l1,-7M348,182l1,-6"/></g>` +
    `<path d="M20,150c0,-24 4,-38 8,-46c4,8 8,22 8,46z" fill="#2f5f3f"/>` +
    `<path d="M24,150c0,-20 2,-32 4,-38c2,6 4,18 4,38z" fill="#3f7550" opacity=".8"/>` +
    `<path d="M382,168c0,-18 3,-28 6,-34c3,6 6,16 6,34z" fill="#2f5f3f"/>` +
    /*
     * 見に来た人(y>170)。**遺跡を遺跡にしているのは、そこに人が見に来ていること。**
     * 柱の高さ(68px)も、人が並んで初めて伝わる。
     */
    person(48, 196, 1.35, "#5b8fe8") +
    person(104, 200, 1.25, "#f5b31c", "crouch") +
    person(268, 198, 1.3, "#c2603c") +
    person(288, 200, 1.2, "#4d7a44") +
    person(214, 204, 1.2, "#e8447a") +
    // 足もとに転がる石くず
    `<g fill="#c2b9a4"><ellipse cx="140" cy="200" rx="7" ry="3"/><ellipse cx="152" cy="205" rx="5" ry="2.4"/>` +
    `<ellipse cx="82" cy="206" rx="6" ry="2.6"/><ellipse cx="252" cy="200" rx="6" ry="2.6"/></g>`,

  /** 看板の並ぶアジアの繁華街(夜)。 */
  megacity_asia:
    band(0, 150, "#1f2f4f") +
    stars(18) +
    sun(340, 34, 13, "#f2ede0") +
    towers(
      [
        [8, 40, 36, 116],
        [50, 62, 30, 94],
        [86, 26, 34, 130],
        [126, 54, 32, 102],
        [200, 34, 38, 122],
        [244, 66, 28, 90],
        [278, 44, 36, 112],
        [322, 70, 30, 86],
        [358, 50, 34, 106],
      ],
      "#2a3550",
      "#f5d06a",
    ) +
    neonSigns([
      [164, 34, 74, "#e8443f"],
      [180, 46, 56, "#f5b31c"],
      [148, 58, 44, "#3fbfa8"],
      [316, 40, 62, "#e8447a"],
    ]) +
    ground(156, "#242c3c") +
    // 高架と電車
    `<rect x="0" y="150" width="400" height="9" fill="#3a4453"/>` +
    `<g fill="#2f3849"><rect x="40" y="159" width="12" height="26"/><rect x="180" y="159" width="12" height="26"/><rect x="320" y="159" width="12" height="26"/></g>` +
    `<rect x="96" y="126" width="150" height="24" rx="7" fill="#e8443f"/>` +
    `<g fill="#cfe4f0"><rect x="106" y="132" width="22" height="11"/><rect x="134" y="132" width="22" height="11"/><rect x="162" y="132" width="22" height="11"/><rect x="190" y="132" width="22" height="11"/></g>` +
    // 濡れた路面の映り込み
    `<g opacity=".45"><rect x="164" y="186" width="13" height="24" fill="#e8443f"/><rect x="316" y="190" width="13" height="20" fill="#e8447a"/><rect x="88" y="188" width="10" height="22" fill="#f5b31c"/></g>`,

  /** 回廊と鐘楼のある広場。 */
  /**
   * 回廊のある広場。
   *
   * 使うのはウィーン・バルセロナ・メキシコシティ・ブエノスアイレスで、
   * ヨーロッパとラテンアメリカにまたがる。旗も紋章も出さず、
   * **どの広場にもあるもの** — 回廊・敷石・噴水・並木・日よけの露店・鳩 — で組む。
   *
   * **隠れる帯(x=151〜249)には回廊の連続アーチを通してある。**
   * 繰り返しの形なので、中央がシンボルに隠れても失うものが少ない。
   * 読ませたいもの(鐘楼・露店・人)は左右3分の1へ寄せる。
   *
   * **背より高い部位を持つものを中央に置かない。**
   * 人の頭は base−26 に来るので、中央の人は base≥196(頭が y>170)に置く。
   *
   * **動きの層(`world-plaza.tsx`)と噛み合っている位置:**
   * 噴水の鉢 (204,158) と水面 (204,182) / 回廊 x=112〜376・base y=150 /
   * 太陽 (58,34) / 椰子の葉 (344,112) / 鳩の飛び立ち (120,168) (300,176)
   */
  plaza:
    sky("#9ccbe8", "#dce8ea", 150) +
    clouds(320, 28) +
    cirrus(150, 16, 40, ".4") +
    sun(58, 34, 15, "#f5d06a") +
    // 回廊の屋根の向こうに続く町。隙間なく詰めて、高さだけ変える。
    `<g fill="#a8b0a8" opacity=".5"><rect x="100" y="70" width="30" height="12"/><rect x="130" y="64" width="20" height="18"/>` +
    `<rect x="150" y="72" width="34" height="10"/><rect x="184" y="66" width="16" height="16"/>` +
    `<rect x="200" y="74" width="40" height="8"/><rect x="240" y="68" width="18" height="14"/>` +
    `<rect x="258" y="72" width="36" height="10"/><rect x="294" y="62" width="16" height="20"/>` +
    `<rect x="310" y="70" width="44" height="12"/><rect x="354" y="74" width="38" height="8"/></g>` +
    hills(122, "#8a9a6a", 3) +
    /*
     * 鐘楼。**左3分の1に置いてある**ので、ここは細部が効く。
     * 頂は旗でも紋章でもなく風見にする(4都市のどれとも読めるように)。
     */
    `<rect x="40" y="58" width="52" height="92" fill="#f2ede0"/>` +
    `<rect x="40" y="58" width="14" height="92" fill="#e2dccb"/>` +
    `<path d="M34,58h64l-32,-22z" fill="#c2603c"/>` +
    `<path d="M34,58h64v5H34z" fill="#a34a30"/>` +
    `<g fill="#d8d0bc"><rect x="38" y="86" width="56" height="4"/><rect x="38" y="118" width="56" height="4"/></g>` +
    `<path d="M56,104V94a10,10 0 0 1 20,0v10z" fill="#5a4630"/>` +
    `<path d="M60,98a6,6 0 0 1 12,0v4a6,6 0 0 0 -12,0z" fill="#a89873"/>` +
    `<circle cx="66" cy="72" r="9" fill="#f8f4e8"/><circle cx="66" cy="72" r="7" fill="#e6e0cf"/>` +
    `<path d="M66,72v-5M66,72l4,3" stroke="#5a4630" stroke-width="1.5" fill="none"/>` +
    `<g fill="#6b5330"><rect x="46" y="126" width="9" height="18" rx="4.5"/><rect x="78" y="126" width="9" height="18" rx="4.5"/></g>` +
    `<rect x="65" y="20" width="2.6" height="16" fill="#a89873"/>` +
    `<path d="M67.6,22l11,4l-11,4z" fill="#a89873"/>` +
    `<circle cx="66.3" cy="18" r="2.6" fill="#a89873"/>` +
    // 回廊(中央を通す繰り返し)
    arches(112, 150, 6, 44, 52, "#e0b46a", "#8a5a2c") +
    // アーチの奥の暗がりと、柱の礎盤・柱頭
    `<g fill="#6b451f" opacity=".8">` +
    [119.9, 163.9, 207.9, 251.9, 295.9, 339.9]
      .map((ax) => `<path d="M${ax},150v-24a14.1,14.1 0 0 1 28.2,0v6a14.1,14.1 0 0 0 -28.2,0z"/>`)
      .join("") +
    `</g>` +
    `<g fill="#c99a52">` +
    [112, 156, 200, 244, 288, 332, 376]
      .map((px) => `<rect x="${px - 5}" y="126" width="10" height="24"/><rect x="${px - 7}" y="122" width="14" height="5"/>`)
      .join("") +
    `</g>` +
    `<rect x="108" y="94" width="272" height="8" fill="#f2ede0"/>` +
    `<path d="M104,94h280l-8,-14H112z" fill="#c2603c"/>` +
    `<path d="M104,94h280v4H104z" fill="#a34a30"/>` +
    /*
     * 屋根の上の手すり。**屋根より先に描いたら屋根の下に隠れて、丸ごと無駄になった。**
     * 空を背にする高さへ移す。繰り返しなので、中央が隠れても惜しくない。
     */
    `<g fill="#e6dcc4"><rect x="112" y="72" width="264" height="4"/><rect x="112" y="78" width="264" height="3"/>` +
    [118, 136, 154, 172, 190, 208, 226, 244, 262, 280, 298, 316, 334, 352, 368]
      .map((bx) => `<rect x="${bx}" y="76" width="4" height="4"/>`)
      .join("") +
    `</g>` +
    ground(150, "#c9b98c") +
    // 敷石。目地を等間隔にせず、噴水のまわりだけ円く敷く。
    `<g stroke="#b0a077" stroke-width="2" opacity=".65" fill="none"><path d="M0,166h400M0,184h400M0,202h400"/></g>` +
    `<g stroke="#b0a077" stroke-width="1.4" opacity=".45" fill="none"><path d="M34,166v18M92,166v18M150,166v18M262,166v18M320,166v18M378,166v18M62,184v18M120,184v18M290,184v18M348,184v18"/></g>` +
    `<g fill="#bdac80" opacity=".55"><ellipse cx="204" cy="192" rx="96" ry="20"/><ellipse cx="70" cy="196" rx="34" ry="8"/></g>` +
    // 並木(繰り返し)。左右に置いて、中央の回廊を邪魔しない。
    `<g fill="#6b5330"><rect x="106" y="128" width="5" height="28"/><rect x="298" y="130" width="5" height="26"/></g>` +
    `<g fill="#41703c"><ellipse cx="108.5" cy="124" rx="17" ry="12"/><ellipse cx="300.5" cy="126" rx="15" ry="11"/></g>` +
    `<g fill="#4d8046"><ellipse cx="103" cy="120" rx="10" ry="7"/><ellipse cx="296" cy="122" rx="9" ry="6.4"/></g>` +
    // 椰子(葉の位置は動きの層と対応)
    `<g><rect x="342" y="112" width="5" height="42" fill="#6b5330"/><path d="M344,112c-15,-4 -20,3 -22,10c8,-7 15,-7 22,-2c7,-5 14,-5 22,2c-2,-7 -7,-14 -22,-10z" fill="#2f7d3f"/></g>` +
    palmFront(344.5, 112) +
    /*
     * 露店。**噴水より先に描く。** 後に描いたら、支柱が噴水の鉢を突き抜けて
     * 手前に立ってしまい、どちらが奥か分からなくなった。
     * 先に描けば鉢が支柱の足もとを隠すので、露店が奥にあると読める。
     */
    `<path d="M120,158h64l-8,-11h-48z" fill="#e8443f"/>` +
    `<g stroke="#b8342c" stroke-width="1.4" opacity=".7" fill="none"><path d="M128,152h48M124,156h56"/></g>` +
    `<g fill="#6b5330"><rect x="120" y="158" width="3.4" height="24"/><rect x="180" y="158" width="3.4" height="24"/></g>` +
    `<rect x="126" y="168" width="52" height="4.4" fill="#c9a877"/>` +
    `<g fill="#f5b31c"><circle cx="134" cy="164" r="3.2"/><circle cx="142" cy="165" r="2.8"/></g>` +
    `<g fill="#4d7a44"><circle cx="152" cy="164" r="3"/><circle cx="160" cy="165" r="2.6"/></g>` +
    `<g fill="#7a4a8c"><circle cx="169" cy="164" r="3"/></g>` +
    // 噴水。鉢 (204,158) と水面 (204,182) は動かせない。
    `<ellipse cx="204" cy="188" rx="58" ry="16" fill="#a89e84"/>` +
    `<ellipse cx="204" cy="186" rx="54" ry="14" fill="#c9bfa2"/>` +
    `<ellipse cx="204" cy="184" rx="50" ry="12" fill="#5f9fb8"/>` +
    `<ellipse cx="204" cy="182" rx="42" ry="10" fill="#8fc8dc"/>` +
    `<rect x="200" y="158" width="8" height="22" fill="#e0dbcd"/>` +
    `<ellipse cx="204" cy="158" rx="16" ry="5" fill="#e0dbcd"/>` +
    `<ellipse cx="204" cy="157" rx="11" ry="3" fill="#8fc8dc"/>` +
    /*
     * 広場の人。**中央に置くものは base≥196**(頭が y>170 に収まる)。
     * 広場を広場にしているのは、そこで人が何をしているか — 売る、休む、話す、鳩を追う。
     */
    person(112, 196, 1.35, "#5b8fe8") +
    // 中央: 噴水の縁に腰かけて休む人(頭は y=174 で隠れない)
    person(160, 200, 1.3, "#f5b31c", "crouch") +
    person(254, 200, 1.3, "#c2603c", "crouch") +
    // 右: 立ち話と、鳩を追う子
    person(300, 202, 1.35, "#4d7a44") +
    person(320, 203, 1.3, "#e8447a") +
    person(122, 178, 1.05, "#37b3a4") +
    pigeon(136, 182, 0.9) +
    pigeon(150, 186, 0.85, "#9a948a") +
    pigeon(290, 190) +
    pigeon(306, 186, 0.9, "#9a948a") +
    pigeon(272, 194, 0.85) +
    // 街灯。三角を載せただけでは矢印に見えたので、笠と火屋のある灯にする。
    `<g fill="#4a4436"><rect x="88" y="158" width="3.4" height="36"/><rect x="358" y="156" width="3.4" height="38"/></g>` +
    `<g fill="#f5d06a"><path d="M85,157h10l-2,-9h-6z"/><path d="M355,155h10l-2,-9h-6z"/></g>` +
    `<g fill="#4a4436"><path d="M83,148h14l-7,-6z"/><path d="M353,146h14l-7,-6z"/>` +
    `<rect x="88.4" y="140" width="2.6" height="3"/><rect x="358.4" y="138" width="2.6" height="3"/>` +
    `<rect x="83" y="156" width="14" height="2.4"/><rect x="353" y="154" width="14" height="2.4"/></g>` +
    `<g fill="#4a4436"><ellipse cx="89.7" cy="194" rx="7" ry="2.4"/><ellipse cx="359.7" cy="194" rx="7" ry="2.4"/></g>`,
};

// ---------------------------------------------------------------------------
// シンボル(24×24)
// ---------------------------------------------------------------------------

export const WORLD_MARKS = {
  /** 高層ビル群。 */
  skyline:
    '<rect x="2" y="10" width="6" height="13" fill="#4a5566"/>' +
    '<rect x="9" y="4" width="7" height="19" fill="#5f7080"/>' +
    '<rect x="17" y="12" width="5" height="11" fill="#4a5566"/>' +
    '<g fill="#f5d06a"><rect x="3.4" y="12" width="1.6" height="2.2"/><rect x="5.6" y="12" width="1.6" height="2.2"/><rect x="3.4" y="16" width="1.6" height="2.2"/><rect x="10.6" y="7" width="1.8" height="2.4"/><rect x="13.2" y="7" width="1.8" height="2.4"/><rect x="10.6" y="11" width="1.8" height="2.4"/><rect x="13.2" y="11" width="1.8" height="2.4"/><rect x="18.4" y="14" width="1.8" height="2.2"/></g>' +
    '<rect x="0" y="22.6" width="24" height="1.4" fill="#3a4453"/>',

  /** 円蓋の議事堂・大聖堂。 */
  dome:
    '<path d="M5,14a7,7 0 0 1 14,0z" fill="#e0dbcd"/>' +
    '<circle cx="12" cy="7.6" r="2.4" fill="#e8e2d2"/>' +
    '<rect x="11.3" y="2.6" width="1.4" height="3.2" fill="#f5b31c"/>' +
    '<rect x="5" y="14" width="14" height="6" fill="#f2ede0"/>' +
    '<g fill="#cfc7b4"><rect x="6.4" y="15" width="1.8" height="5"/><rect x="11.1" y="15" width="1.8" height="5"/><rect x="15.8" y="15" width="1.8" height="5"/></g>' +
    '<rect x="2" y="20" width="20" height="3.4" fill="#a89873"/>',

  /** 層塔(反り屋根)。 */
  pagoda:
    '<rect x="2" y="21.6" width="20" height="2" fill="#8a5a2c"/>' +
    '<rect x="7.4" y="15.6" width="9.2" height="6" fill="#e8dfc8"/>' +
    '<rect x="10.6" y="18" width="2.8" height="3.6" fill="#5a3220"/>' +
    '<rect x="8.8" y="8.4" width="6.4" height="4" fill="#e8dfc8"/>' +
    '<path d="M1.5,15.6q10.5,3 21,0l-3.5,-3.6H5z" fill="#c2603c"/>' +
    '<path d="M4,8.6q8,2.6 16,0l-3,-3.2H7z" fill="#c2603c"/>' +
    '<path d="M6.8,4.6q5.2,2 10.4,0l-2.2,-2.4h-6z" fill="#c2603c"/>' +
    '<rect x="11.4" y="0.4" width="1.2" height="2" fill="#f5b31c"/>',

  /** 角錐の墳墓。 */
  pyramid:
    '<circle cx="19.4" cy="5.4" r="3.2" fill="#f0a83c"/>' +
    '<path d="M5.6,10L12,20H-0.8z" fill="#c9a877"/>' +
    '<path d="M12,2.6L23,20H1z" fill="#dcc182"/>' +
    '<path d="M12,2.6L23,20H12z" fill="#c29a52"/>' +
    '<path d="M0,20h24v3.4H0z" fill="#bda068"/>',

  /** 掲げる像。 */
  statue:
    '<path d="M6,23.4v-4.6h12v4.6z" fill="#a89873"/>' +
    '<rect x="8.4" y="14.6" width="7.2" height="4.2" fill="#cfc7b4"/>' +
    '<path d="M9.8,14.6V8.6c0,-1.4 4.4,-1.4 4.4,0v6z" fill="#7fbfa8"/>' +
    '<circle cx="12" cy="6.4" r="2" fill="#7fbfa8"/>' +
    '<path d="M13.4,9l2.8,-4.4l1.7,1l-2.8,4.4z" fill="#6faf98"/>' +
    '<path d="M17.6,4.4c1.5,-1.6 1.4,-3.2 0.3,-4.2c0,1.6 -1.6,1.6 -1.9,3z" fill="#f5b31c"/>',

  /** 双塔の大聖堂。 */
  cathedral_w:
    '<g fill="#e0dbcd"><rect x="2" y="9" width="5" height="14"/><rect x="17" y="9" width="5" height="14"/></g>' +
    '<path d="M1.6,9L4.5,3L7.4,9zM16.6,9L19.5,3L22.4,9z" fill="#7a8f9f"/>' +
    '<rect x="7" y="12" width="10" height="11" fill="#f2ede0"/>' +
    '<path d="M6.6,12L12,7.4L17.4,12z" fill="#e8e2d2"/>' +
    '<circle cx="12" cy="15.4" r="2.4" fill="#5b8fe8"/>' +
    '<path d="M12,13v4.8M9.6,15.4h4.8" stroke="#e8e2d2" stroke-width="0.8" fill="none"/>' +
    '<path d="M10.3,23v-3.6a1.7,1.7 0 0 1 3.4,0V23z" fill="#5a4630"/>',

  /** 吊り橋。 */
  bridge_w:
    '<rect x="0" y="19.6" width="24" height="4.4" fill="#3f7fa8"/>' +
    '<path d="M0,12.4C2,7.4 4,5.4 6,4.8C10,10.6 14,10.6 18,4.8C20,5.4 22,7.4 24,12.4" stroke="#c2603c" stroke-width="1.4" fill="none"/>' +
    '<g stroke="#c2603c" stroke-width="0.8"><path d="M2,9.6v6.4M9.6,8.6v7.4M14.4,8.6v7.4M22,9.6v6.4"/></g>' +
    '<g fill="#c2603c"><rect x="5" y="3.4" width="2.4" height="12.6"/><rect x="16.6" y="3.4" width="2.4" height="12.6"/></g>' +
    '<g fill="#a84f30"><rect x="4.6" y="7" width="3.2" height="1.4"/><rect x="16.2" y="7" width="3.2" height="1.4"/></g>' +
    '<rect x="0" y="16" width="24" height="2.4" fill="#d8734a"/>',

  /** 浜辺のヤシ。 */
  palm_w:
    '<path d="M0,20.6h24v3.4H0z" fill="#e8d4a4"/>' +
    '<path d="M11,20.6c0,-6.4 0.6,-10.4 2.6,-13.6l2,1c-1.8,3 -2.4,6.6 -2.4,12.6z" fill="#8a6a3c"/>' +
    '<path d="M14.2,6.4c-4.6,-2.6 -8.4,-0.6 -9.8,3c3.4,-2.6 6.6,-2.4 9.2,0z" fill="#2f7d3f"/>' +
    '<path d="M14.2,6.4c4.6,-2.2 8,0.2 9,4c-3,-3 -6.2,-3.2 -8.6,-1z" fill="#3f8f4f"/>' +
    '<path d="M14.2,6.4c1.4,-4.4 5,-5.6 8.4,-4.6c-3.6,0.6 -5.8,2.4 -6.8,5.2z" fill="#2f7d3f"/>' +
    '<path d="M14.2,6.4c-3.4,-3.2 -3.2,-6 -1.4,-6.4c0.2,2.2 1.4,3.8 3,5z" fill="#3f8f4f"/>' +
    '<g fill="#8a5a2c"><circle cx="12.4" cy="8.6" r="1.2"/><circle cx="15.2" cy="9" r="1.1"/></g>',

  /** 雪をかぶった峰。 */
  peak_w:
    '<circle cx="20" cy="4.4" r="2.4" fill="#f5d06a"/>' +
    '<path d="M1,21L9,5.6l5.4,8.4l3,-4L23,21z" fill="#7f93a8"/>' +
    '<path d="M9,5.6l3.4,6.4h-6.8zM17.4,10l2.2,3.2h-4.4z" fill="#f8fbfd"/>' +
    '<path d="M1,21L9,5.6l1.6,3L4.6,21z" fill="#6b7f94"/>' +
    '<rect x="0" y="21" width="24" height="3" fill="#4d7a44"/>',

  /** 汽船。 */
  ship_w:
    '<rect x="0" y="20" width="24" height="4" fill="#3f7fa8"/>' +
    '<path d="M1,16h22l-3.4,5H4.4z" fill="#3a4453"/>' +
    '<path d="M2.6,18.4h18.8l-1.8,2.6H4.4z" fill="#c2603c"/>' +
    '<rect x="7" y="10.4" width="10" height="5.6" fill="#e8dfc8"/>' +
    '<rect x="6.4" y="9.6" width="11.2" height="1.4" fill="#3a4453"/>' +
    '<g fill="#5f8fa8"><rect x="8.4" y="12" width="2.4" height="2.4"/><rect x="12" y="12" width="2.4" height="2.4"/></g>' +
    '<rect x="11" y="4.4" width="3.6" height="6" fill="#e8443f"/>' +
    '<rect x="11" y="4.4" width="3.6" height="1.6" fill="#2a2f38"/>' +
    '<rect x="5.2" y="6.4" width="1" height="4" fill="#5a4630"/>',

  /** 円蓋とミナレット。 */
  mosque:
    '<g fill="#e8dfc8"><rect x="1.4" y="7" width="2.6" height="16"/><rect x="20" y="7" width="2.6" height="16"/></g>' +
    '<path d="M1.2,7L2.7,3.6L4.2,7zM19.8,7l1.5,-3.4L22.8,7z" fill="#2f7f9f"/>' +
    '<rect x="5" y="15.6" width="14" height="7.4" fill="#f2ede0"/>' +
    '<path d="M6,15.6a6,6 0 0 1 12,0z" fill="#3fa8c8"/>' +
    '<rect x="5.4" y="15" width="13.2" height="1.4" fill="#f5b31c"/>' +
    '<path d="M10,23v-3.8a2,2 0 0 1 4,0V23z" fill="#2f7f9f"/>' +
    '<path d="M12,3.4a2.6,2.6 0 1 0 1.9,4.5a2.1,2.1 0 1 1 -1.9,-4.5z" fill="#f5b31c"/>',

  /** 彫られた柱。 */
  totem:
    '<path d="M8,7L1.6,4.6v4.2L8,10zM16,7l6.4,-2.4v4.2L16,10z" fill="#3f7f6a"/>' +
    '<rect x="8" y="3" width="8" height="19" fill="#a8622f"/>' +
    '<rect x="8" y="5.4" width="8" height="7.2" fill="#c2603c"/>' +
    '<g fill="#f6efe2"><circle cx="10.3" cy="8" r="1.4"/><circle cx="13.7" cy="8" r="1.4"/></g>' +
    '<g fill="#2a251c"><circle cx="10.3" cy="8" r="0.7"/><circle cx="13.7" cy="8" r="0.7"/></g>' +
    '<path d="M10.6,10.4h2.8l-1.4,3z" fill="#f5b31c"/>' +
    '<rect x="8" y="13.6" width="8" height="8.4" fill="#e8dfc8"/>' +
    '<g fill="#2a251c"><circle cx="10.3" cy="16.4" r="1"/><circle cx="13.7" cy="16.4" r="1"/><rect x="9.8" y="18.8" width="4.4" height="1.6"/></g>' +
    '<rect x="6" y="22" width="12" height="2" fill="#6b5330"/>',
};
