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
  const rect = (dx, dy, w, h, fill) =>
    `<rect x="${r1(x + dx * s)}" y="${r1(base + dy * s)}" width="${r1(w * s)}" height="${r1(h * s)}" fill="${fill}"/>`;
  const head = (dy) => `<circle cx="${r1(x)}" cy="${r1(base + dy * s)}" r="${r1(2.8 * s)}" fill="${skin}"/>`;

  if (pose === "crouch") {
    return (
      head(-11.4) +
      `<path d="M${p(-3.4, -8.6)}q3.4,-1.6 6.8,0l1.6,7.4h-10z" fill="${cloth}"/>` +
      rect(-3.6, -1.2, 3, 1.2, skin) +
      rect(1, -1.2, 3, 1.2, skin) +
      `<path d="M${p(3.2, -7)}l4.2,3.4" stroke="${skin}" stroke-width="${r1(1.7 * s)}" stroke-linecap="round" fill="none"/>`
    );
  }
  const load =
    pose === "carry"
      ? `<path d="M${p(-5.2, -17.6)}h10.4l-1.4,-4.4h-7.6z" fill="#c9a877"/>` +
        `<g stroke="#8a6a3c" stroke-width="1" opacity=".8" fill="none"><path d="M${p(-4.4, -19.6)}h8.8"/></g>` +
        `<path d="M${p(-2.8, -13.4)}l-1.4,-3.2M${p(2.8, -13.4)}l1.4,-3.2" stroke="${skin}" stroke-width="${r1(1.7 * s)}" stroke-linecap="round" fill="none"/>`
      : `<path d="M${p(-2.8, -12.6)}l-2.6,5M${p(2.8, -12.6)}l2.6,5" stroke="${skin}" stroke-width="${r1(1.7 * s)}" stroke-linecap="round" fill="none"/>`;
  return (
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

  /** 尖塔と瓦屋根の旧市街。 */
  oldworld:
    sky("#9ccbe8", "#cfe4f0", 150) +
    clouds(304, 30) +
    hills(120, "#7a8f5a", 3) +
    roofRow(150, [104, 96, 110, 100, 106, 98, 108], "#e8dfc8", "#c2603c") +
    // 大聖堂の鐘楼
    `<rect x="180" y="46" width="34" height="104" fill="#dfd8c8"/>` +
    `<path d="M176,46h42l-21,-30z" fill="#4a5568"/>` +
    `<circle cx="197" cy="70" r="9" fill="#f2ede0"/><circle cx="197" cy="70" r="7" fill="#e0dbcd"/>` +
    `<path d="M197,70v-5M197,70l4,3" stroke="#3a4453" stroke-width="1.6" fill="none"/>` +
    `<rect x="186" y="92" width="10" height="16" rx="5" fill="#5a4630"/><rect x="200" y="92" width="10" height="16" rx="5" fill="#5a4630"/>` +
    // 石畳の広場と噴水
    ground(150, "#b0a894") +
    `<g stroke="#9a9280" stroke-width="2" opacity=".7" fill="none"><path d="M0,164h400M0,180h400M0,196h400"/></g>` +
    `<ellipse cx="200" cy="188" rx="52" ry="14" fill="#5f9fb8"/>` +
    `<ellipse cx="200" cy="186" rx="40" ry="9" fill="#8fc8dc"/>` +
    `<rect x="196" y="160" width="8" height="24" fill="#cfc7b4"/>` +
    `<path d="M200,158c-6,-6 -2,-12 0,-14c2,2 6,8 0,14z" fill="#bfe8f4"/>`,

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
    // 水上の高床の家。脚は波打ちぎわで砂に隠れる。
    stiltHouse(300, 140) +
    stiltHouse(354, 134, 0.88) +
    // 左の桟橋と、舫った小舟
    `<g fill="#8a5a2c"><rect x="0" y="136" width="72" height="4"/><rect x="10" y="140" width="3" height="14"/><rect x="34" y="140" width="3" height="14"/><rect x="58" y="140" width="3" height="14"/></g>` +
    `<g stroke="#6b4a28" stroke-width="1.4" fill="none"><path d="M70,138q8,6 16,4"/></g>` +
    `<path d="M78,146c10,-5 30,-5 40,0c-6,6 -34,6 -40,0z" fill="#e8443f"/>` +
    `<path d="M84,145c8,-3 24,-3 30,0c-4,3 -26,3 -30,0z" fill="#f6efe2"/>` +
    `<rect x="96" y="126" width="2.2" height="18" fill="#6b5330"/>` +
    `<path d="M98,127l12,10l-12,3z" fill="#f6efe2" opacity=".9"/>` +
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
    person(288, 196, 1, "#5b8fe8") +
    beachDog(258, 200) +
    // 砂に上げた丸木舟(舷外浮材つき)。櫂は舟に立てかけて、まわりを空ける。
    `<path d="M60,190c18,-8 60,-8 78,0c-10,10 -68,10 -78,0z" fill="#8a5a2c"/>` +
    `<path d="M67,189c15,-5 49,-5 64,0c-8,5 -56,5 -64,0z" fill="#c9a877"/>` +
    `<rect x="56" y="186" width="86" height="3.4" fill="#5a4630"/>` +
    `<g stroke="#6b4a28" stroke-width="2" fill="none"><path d="M78,192l-16,10M120,192l16,10"/></g>` +
    `<path d="M54,202h96v4h-96z" fill="#6b5330"/>` +
    `<path d="M44,204l22,-26l3.4,2.6l-22,26z" fill="#6b5330"/>` +
    `<path d="M67,180c4,-5 9,-5 11,-1.6c-2.6,3.4 -7,6 -12.6,6z" fill="#8a6a3c"/>` +
    // 浜の手前(y>170 は中央でも隠れない)。魚をより分ける人と、荷かご。
    person(198, 200, 1.05, "#f5b31c", "crouch") +
    `<ellipse cx="216" cy="198" rx="15" ry="5" fill="#b89a5c"/>` +
    `<ellipse cx="216" cy="196" rx="12" ry="3.4" fill="#cfe4f0" opacity=".9"/>` +
    `<g fill="#8fb8cc"><ellipse cx="211" cy="196" rx="4" ry="1.8"/><ellipse cx="220" cy="197" rx="3.4" ry="1.6"/></g>` +
    `<g fill="#c9a877"><ellipse cx="166" cy="196" rx="11" ry="6"/><ellipse cx="182" cy="203" rx="9" ry="5"/></g>` +
    `<g stroke="#8a6a3c" stroke-width="1" opacity=".8" fill="none"><path d="M156,195h20M174,202h16"/></g>` +
    person(120, 178, 0.9, "#37b3a4", "carry") +
    // 波打ちぎわの足あと
    `<g fill="#d4bd85" opacity=".7"><ellipse cx="236" cy="176" rx="2.6" ry="1.6"/><ellipse cx="244" cy="181" rx="2.6" ry="1.6"/><ellipse cx="252" cy="186" rx="2.6" ry="1.6"/><ellipse cx="260" cy="191" rx="2.6" ry="1.6"/></g>`,

  /** アカシアと草原。 */
  savanna:
    sky("#e8c88a", "#f2dcae", 126) +
    sun(84, 40, 22, "#f0a83c") +
    `<path d="M232,124h132l-24,-30h-84z" fill="#8a7f66"/>` +
    hills(126, "#a89873", 3) +
    ground(126, "#d8bc72") +
    `<path d="M0,152c70,-8 130,6 200,0c70,-6 130,2 200,8v50H0z" fill="#c9a85c"/>` +
    acacia(72, 152, 1) +
    acacia(330, 160, 1.25) +
    // 象と麒麟
    elephant(176, 196, 0.92) +
    giraffe(268, 190, 0.86) +
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
  mountains:
    sky("#7fb0d8", "#cfe0ea", 128) +
    `<path d="M0,128l58,-70l38,42l46,-58l54,68l48,-40l60,58l96,0v90H0z" fill="#8fa4b8"/>` +
    `<path d="M58,58l21,24h-42zM142,42l27,34h-54zM306,80l24,22h-48z" fill="#f8fbfd"/>` +
    ground(128, "#5f7f5a") +
    `<path d="M0,146c70,-14 130,10 200,2c70,-8 130,4 200,10v52H0z" fill="#4d7a44"/>` +
    firRow(146, [22, 46, 70, 330, 356, 380], 26) +
    // 石造りの高架橋
    arches(96, 168, 5, 42, 40, "#c9bfa8", "#7f93a8") +
    `<rect x="88" y="124" width="226" height="10" fill="#dfd8c8"/>` +
    `<rect x="88" y="120" width="226" height="4" fill="#a89873"/>` +
    // 湖
    band(180, 30, "#3f7f9f") +
    `<g stroke="#bfe0f0" stroke-width="2" opacity=".7" fill="none"><path d="M40,190h80M200,198h90"/></g>`,

  /** 極夜のオーロラと氷。 */
  tundra:
    band(0, 130, "#1f3350") +
    stars(26) +
    aurora() +
    `<path d="M0,118c60,-14 110,6 180,-2c70,-8 140,4 220,10v84H0z" fill="#cfe0ea"/>` +
    band(126, 26, "#16293f") +
    // 流氷
    `<g fill="#e8eef2"><path d="M40,138h56l-8,10H48z"/><path d="M150,132h40l-6,8h-28z"/><path d="M244,140h64l-9,10h-46z"/></g>` +
    ground(148, "#e8eef2") +
    `<path d="M0,170c80,-8 140,8 210,2c70,-6 120,2 190,6v32H0z" fill="#dbe6ee"/>` +
    // 灯りのついた小屋と犬橇の跡
    `<rect x="256" y="128" width="70" height="24" fill="#6b5330"/>` +
    `<path d="M250,128h82l-41,-18z" fill="#8a5a2c"/>` +
    `<rect x="280" y="136" width="14" height="12" fill="#f5b31c"/>` +
    firRow(150, [40, 62, 84], 22, "#25452f") +
    `<g stroke="#b8ccd8" stroke-width="2" opacity=".8" fill="none"><path d="M20,190q90,-14 180,0t180,-6"/></g>`,

  /** 礁湖の向こうの火山島。 */
  island:
    sky("#8fc4e8", "#e0eef0") +
    sun(322, 34, 16) +
    clouds(90, 30) +
    // 火山島
    `<path d="M120,116l58,-58l30,22l52,36z" fill="#4d7a44"/>` +
    `<path d="M178,58l-14,14c10,4 20,4 30,-2z" fill="#6b6350"/>` +
    `<path d="M120,116l58,-58l6,5l-40,53z" fill="#3f6b3a"/>` +
    band(116, 40, "#3fa8b8") +
    band(148, 16, "#7fd8dc") +
    `<g stroke="#bfeef4" stroke-width="3" opacity=".7" fill="none"><path d="M40,128h70M200,124h80M120,142h100M280,144h80"/></g>` +
    ground(164, "#f0e0b8") +
    palmRow(206, 3, 50) +
    // アウトリガーのカヌー
    `<path d="M120,178c22,-7 76,-7 98,0c-12,9 -86,9 -98,0z" fill="#8a5a2c"/>` +
    `<path d="M132,192c20,-5 62,-5 78,0c-10,5 -68,5 -78,0z" fill="#6b5330"/>` +
    `<g stroke="#6b5330" stroke-width="3" fill="none"><path d="M146,182l-6,10M198,182l6,10"/></g>`,

  /** 列柱の遺跡。 */
  ruins:
    sky("#a8c8e0", "#dce8dc", 132) +
    clouds(72, 28) +
    hills(124, "#9a9a76", 3) +
    ground(132, "#c9b98c") +
    `<path d="M0,158c80,-10 140,6 210,0c70,-6 120,2 190,6v46H0z" fill="#bcaa7c"/>` +
    // 基壇と列柱
    `<rect x="70" y="146" width="230" height="12" fill="#cfc7b4"/>` +
    `<rect x="66" y="138" width="238" height="8" fill="#e0dbcd"/>` +
    `<g fill="#e8e2d2">` +
    [78, 118, 158, 198, 238].map((x) => `<rect x="${x}" y="${70}" width="18" height="68" rx="2"/>`).join("") +
    `</g>` +
    `<g fill="#d4ccb8">` +
    [78, 118, 158, 198, 238].map((x) => `<rect x="${x - 3}" y="64" width="24" height="7"/>`).join("") +
    `</g>` +
    `<rect x="70" y="52" width="180" height="14" fill="#e0dbcd"/>` +
    `<path d="M64,52h192l-96,-26z" fill="#e8e2d2"/>` +
    // 折れた柱と転がった円盤
    `<rect x="290" y="104" width="18" height="34" fill="#e8e2d2"/>` +
    `<g fill="#d4ccb8"><ellipse cx="330" cy="176" rx="22" ry="7"/><ellipse cx="356" cy="188" rx="18" ry="6"/></g>` +
    `<path d="M20,150c0,-24 4,-38 8,-46c4,8 8,22 8,46z" fill="#2f5f3f"/>`,

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
  plaza:
    sky("#9ccbe8", "#dce8ea", 150) +
    clouds(320, 28) +
    sun(58, 34, 15, "#f5d06a") +
    hills(122, "#8a9a6a", 3) +
    // 教会の鐘楼
    `<rect x="40" y="58" width="52" height="92" fill="#f2ede0"/>` +
    `<path d="M34,58h64l-32,-22z" fill="#c2603c"/>` +
    `<path d="M56,104V94a10,10 0 0 1 20,0v10z" fill="#5a4630"/>` +
    `<path d="M60,98a6,6 0 0 1 12,0v4a6,6 0 0 0 -12,0z" fill="#a89873"/>` +
    `<rect x="64" y="24" width="4" height="14" fill="#a89873"/><rect x="59" y="28" width="14" height="4" fill="#a89873"/>` +
    // 回廊
    arches(112, 150, 6, 44, 52, "#e0b46a", "#8a5a2c") +
    `<rect x="108" y="94" width="272" height="8" fill="#f2ede0"/>` +
    `<path d="M104,94h280l-8,-14H112z" fill="#c2603c"/>` +
    ground(150, "#c9b98c") +
    `<g stroke="#b0a077" stroke-width="2" opacity=".7" fill="none"><path d="M0,166h400M0,184h400M0,202h400"/></g>` +
    // 噴水と椰子
    `<ellipse cx="204" cy="184" rx="54" ry="15" fill="#5f9fb8"/>` +
    `<ellipse cx="204" cy="182" rx="42" ry="10" fill="#8fc8dc"/>` +
    `<rect x="200" y="158" width="8" height="20" fill="#e0dbcd"/>` +
    `<ellipse cx="204" cy="158" rx="16" ry="5" fill="#e0dbcd"/>` +
    `<g><rect x="342" y="112" width="5" height="42" fill="#6b5330"/><path d="M344,112c-15,-4 -20,3 -22,10c8,-7 15,-7 22,-2c7,-5 14,-5 22,2c-2,-7 -7,-14 -22,-10z" fill="#2f7d3f"/></g>`,
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
