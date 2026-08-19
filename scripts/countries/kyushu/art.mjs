/**
 * 九州の都市イラスト。
 *
 * `KYUSHU_MARKS` は 24×24 の座標系に描くシンボル、`KYUSHU_BG` は 400×210 の
 * 座標系に描く背景シーン(いずれもSVG断片の文字列)。動きは含めない。
 *
 * 盤面の芯は**「鎖国の二百年、外へ開いていた窓はここだけだった」**。
 * 平戸 → 出島 → 浦上と窓が移り、何が通り、何が咎められたかを軸にしている。
 * そのため**建物の開口部**(商館の窓・教会の窓・岸壁の石段・閉じられた門)を
 * 意識して描いてある。温泉・ラーメン・観光地としての火山は描かない。
 *
 * 色はフランス・インドと揃える。空 #8fc4e8〜、地面 #2f4a33/#c9a877、
 * 顔 #e0b48a、強調 #f5b31c/#e8443f/#5b8fe8。九州らしさは
 * いぶし瓦の #55606b、漆喰の #efe8d8、赤煉瓦の #a8543c、石炭の #2a2622、
 * 火山灰の #9a9288、有田の染付 #2f5aa8 で出す。
 *
 * ⚠ 都市カードでは背景の上に駒とシンボルが重なる。
 *   x=151〜249 / y=54〜152 と、(200,155) rx=53.3 ry=13.9 の影は見えない。
 *   見せたい細部は左右3分の1と y>170 に置くこと。
 * ⚠ 空と地面のyが噛み合っていないと横一文字に透ける。
 *   確認は `node scripts/check-city-backgrounds.mjs kyushu --src`。
 */

// ---------------------------------------------------------------------------
// 背景シーンの組み立て部品
// ---------------------------------------------------------------------------

const W = 400;

/** 小数の桁を抑える(SVGを読みやすく保つため)。 */
const r1 = (v) => Math.round(v * 10) / 10;

/** 横帯。 */
function band(y, h, fill) {
  return `<rect x="0" y="${y}" width="${W}" height="${r1(h)}" fill="${fill}"/>`;
}

/**
 * 空。`to` は**塗り下ろす深さ**(= 次に来る塗りの開始y)。
 * 地面や海がもっと下から始まるシーンで既定のままにすると、あいだが横一文字に透ける。
 */
function sky(top, bottom, to = 118) {
  return band(0, 84, top) + band(78, to - 78, bottom);
}

/** 地面。 */
function ground(y, fill) {
  return `<rect x="0" y="${y}" width="${W}" height="${r1(210 - y)}" fill="${fill}"/>`;
}

/** 接地の影。敷かないと物が浮く。 */
function shade(cx, cy, rx, ry, o = ".2") {
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#000" opacity="${o}"/>`;
}

function sun(cx, cy, r, fill = "#f5d06a") {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>`;
}

function clouds(cx, cy, scale = 1, fill = "#f6efe2", o = ".8") {
  const e = (dx, rx, ry) =>
    `<ellipse cx="${r1(cx + dx * scale)}" cy="${cy}" rx="${r1(rx * scale)}" ry="${r1(ry * scale)}"/>`;
  return `<g opacity="${o}" fill="${fill}">${e(0, 18, 7)}${e(-10, 11, 5.5)}${e(11, 13, 5.5)}</g>`;
}

/** 遠景の丸い丘。九州はどこからでも山が見える。 */
function hills(y, fill, count = 4, h = 34) {
  const parts = [];
  for (let i = 0; i < count; i++) {
    const cx = 40 + (i * W) / count;
    parts.push(`<path d="M${r1(cx - 70)},${y}c20,${-h} 50,${-h} 70,0z" fill="${fill}"/>`);
  }
  return `<g opacity=".9">${parts.join("")}</g>`;
}

/** ぎざぎざした稜線(奥の山並み)。 */
function ridge(y, amp, fill, seed = 3) {
  const pts = [];
  for (let i = 0; i <= 8; i++) {
    const x = r1((i * W) / 8);
    const d = ((i * seed) % 5) / 4;
    pts.push(`${i === 0 ? "M" : "L"}${x},${r1(y - amp * (0.3 + d * 0.7))}`);
  }
  return `<path d="${pts.join("")}L400,210H0z" fill="${fill}"/>`;
}

/** 水面の反射線。 */
function ripples(y, color = "#bfe8f4") {
  return `<g stroke="${color}" stroke-width="2" opacity=".65" fill="none"><path d="M22,${y}h64M188,${r1(y + 12)}h84M104,${r1(y + 24)}h60M292,${r1(y + 26)}h72"/></g>`;
}

/** 人。20px前後。腕は `arm()` で別に足す。 */
function person(x, base, h, shirt, skin = "#e0b48a", legs = "#3f3428") {
  const hd = r1(h * 0.19);
  const top = r1(base - h + hd * 1.7);
  return (
    `<g><rect x="${r1(x - h * 0.09)}" y="${r1(base - h * 0.4)}" width="${r1(h * 0.08)}" height="${r1(h * 0.4)}" fill="${legs}"/>` +
    `<rect x="${r1(x + h * 0.02)}" y="${r1(base - h * 0.4)}" width="${r1(h * 0.08)}" height="${r1(h * 0.4)}" fill="${legs}"/>` +
    `<path d="M${r1(x - h * 0.16)},${top}h${r1(h * 0.32)}l${r1(h * 0.03)},${r1(h * 0.42)}h${r1(-h * 0.38)}z" fill="${shirt}"/>` +
    `<circle cx="${x}" cy="${r1(top - hd * 0.75)}" r="${hd}" fill="${skin}"/></g>`
  );
}

function arm(x, y, dx, dy, color = "#e0b48a", w = 3) {
  return `<path d="M${x},${y}l${dx},${dy}" stroke="${color}" stroke-width="${w}" stroke-linecap="round" fill="none"/>`;
}

/** 黒松。曲がった幹に層になった葉。九州の海岸線と城下町の木。 */
function pine(x, base, h, fill = "#2f6b42") {
  const t = r1(base - h);
  const w = r1(h * 0.66);
  return (
    `<path d="M${x},${base}q${r1(-h * 0.14)},${r1(-h * 0.4)} ${r1(h * 0.05)},${r1(-h * 0.74)}" stroke="#5a4630" stroke-width="${r1(Math.max(2, h * 0.08))}" fill="none"/>` +
    `<g fill="${fill}">` +
    `<ellipse cx="${r1(x + h * 0.05)}" cy="${t}" rx="${r1(w * 0.5)}" ry="${r1(h * 0.1)}"/>` +
    `<ellipse cx="${r1(x - w * 0.34)}" cy="${r1(t + h * 0.19)}" rx="${r1(w * 0.4)}" ry="${r1(h * 0.085)}"/>` +
    `<ellipse cx="${r1(x + w * 0.38)}" cy="${r1(t + h * 0.22)}" rx="${r1(w * 0.36)}" ry="${r1(h * 0.08)}"/>` +
    `<ellipse cx="${r1(x - w * 0.08)}" cy="${r1(t + h * 0.4)}" rx="${r1(w * 0.34)}" ry="${r1(h * 0.075)}"/>` +
    `</g>`
  );
}

/** 杉。細い三角。山あいの村。 */
function cedar(x, base, h, fill = "#2a5a3a") {
  const w = r1(h * 0.32);
  return (
    `<rect x="${r1(x - 1.3)}" y="${r1(base - 6)}" width="2.6" height="6" fill="#4f3f2c"/>` +
    `<path d="M${r1(x - w / 2)},${r1(base - 4)}L${x},${r1(base - h)}L${r1(x + w / 2)},${r1(base - 4)}z" fill="${fill}"/>` +
    `<path d="M${r1(x - w / 2.6)},${r1(base - h * 0.42)}L${x},${r1(base - h * 0.86)}L${r1(x + w / 2.6)},${r1(base - h * 0.42)}z" fill="${fill}"/>`
  );
}

/** 広葉樹(照葉樹林の丸い樹冠)。 */
function roundTree(x, base, r, crown = "#3f7f4a", trunk = "#6b5330") {
  const th = r1(r * 1.1);
  return (
    `<rect x="${r1(x - r * 0.15)}" y="${r1(base - th - r * 0.3)}" width="${r1(r * 0.3)}" height="${r1(th + r * 0.3)}" fill="${trunk}"/>` +
    `<circle cx="${x}" cy="${r1(base - th - r * 0.5)}" r="${r}" fill="${crown}"/>`
  );
}

/**
 * 瓦屋根の町家。漆喰の壁・いぶし瓦の寄棟・格子戸。
 * 九州の城下町・商家町・漁村で使い回す一番の部品。
 */
function machiya(x, top, w, base, wall = "#efe8d8", roof = "#55606b") {
  const h = base - top;
  const cx = r1(x + w / 2);
  const parts = [
    `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="${wall}"/>`,
    `<path d="M${r1(x - 6)},${top}h${r1(w + 12)}l-9,-13h${r1(-(w - 6))}z" fill="${roof}"/>`,
    `<rect x="${r1(x - 6)}" y="${r1(top - 2)}" width="${r1(w + 12)}" height="3" fill="#3f4852"/>`,
    `<rect x="${r1(x + 2)}" y="${r1(top - 15)}" width="${r1(w - 10)}" height="2.4" fill="#3f4852"/>`,
  ];
  const cols = Math.max(2, Math.round(w / 15));
  for (let i = 0; i <= cols; i++) {
    const rx = r1(x - 6 + ((w + 12) * i) / cols);
    parts.push(
      `<path d="M${rx},${top}L${r1(rx * 0.72 + cx * 0.28)},${r1(top - 13)}" stroke="#46505a" stroke-width="1.1" fill="none"/>`,
    );
  }
  // 格子戸
  const dw = r1(w * 0.46);
  const dx = r1(x + w * 0.27);
  const dy = r1(base - h * 0.6);
  parts.push(`<rect x="${dx}" y="${dy}" width="${dw}" height="${r1(base - dy)}" fill="#6b4a30"/>`);
  const bars = Math.max(3, Math.round(dw / 5));
  for (let i = 1; i < bars; i++)
    parts.push(
      `<rect x="${r1(dx + (dw * i) / bars)}" y="${dy}" width="1.1" height="${r1(base - dy)}" fill="#9a7a4c"/>`,
    );
  parts.push(
    `<rect x="${r1(x + w * 0.06)}" y="${r1(top + h * 0.22)}" width="${r1(w * 0.16)}" height="${r1(h * 0.24)}" fill="#4a5a66"/>`,
    `<rect x="${r1(x + w * 0.78)}" y="${r1(top + h * 0.22)}" width="${r1(w * 0.16)}" height="${r1(h * 0.24)}" fill="#4a5a66"/>`,
  );
  return parts.join("");
}

/** 白壁の蔵(なまこ壁と重い瓦屋根、高い位置の小窓)。商家町・醸造。 */
function kura(x, top, w, base, wall = "#f2ede0") {
  const h = base - top;
  const parts = [
    `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="${wall}"/>`,
    `<path d="M${r1(x - 7)},${top}h${r1(w + 14)}l-8,-14h${r1(-(w - 2))}z" fill="#4a545e"/>`,
    `<rect x="${r1(x - 7)}" y="${r1(top - 2.5)}" width="${r1(w + 14)}" height="3.5" fill="#39424b"/>`,
    `<rect x="${x}" y="${r1(base - h * 0.34)}" width="${w}" height="${r1(h * 0.34)}" fill="#3a3d42"/>`,
  ];
  // なまこ壁の格子
  const gy = r1(base - h * 0.34);
  for (let i = 0; i <= Math.round(w / 11); i++)
    parts.push(
      `<path d="M${r1(x + (i * w) / Math.round(w / 11))},${gy}v${r1(h * 0.34)}" stroke="#e8e2d4" stroke-width="1.4" fill="none"/>`,
    );
  parts.push(
    `<path d="M${x},${r1(gy + h * 0.17)}h${w}" stroke="#e8e2d4" stroke-width="1.4" fill="none"/>`,
    `<rect x="${r1(x + w * 0.36)}" y="${r1(top + h * 0.16)}" width="${r1(w * 0.28)}" height="${r1(h * 0.2)}" fill="#3a3d42"/>`,
    `<rect x="${r1(x + w * 0.4)}" y="${r1(top + h * 0.19)}" width="${r1(w * 0.2)}" height="${r1(h * 0.14)}" fill="#8a8272"/>`,
  );
  return parts.join("");
}

/** 石垣。下ほど広がる布積み。城・武家屋敷・港の護岸。 */
function stoneWall(x, y, w, h, fill = "#9a9484", joint = "#7d7767") {
  const inset = r1(h * 0.42);
  const parts = [
    `<path d="M${r1(x + inset)},${y}h${r1(w - inset * 2)}l${inset},${h}h${r1(-w)}z" fill="${fill}"/>`,
    `<path d="M${r1(x + inset)},${y}h${r1(w - inset * 2)}v2h${r1(-(w - inset * 2))}z" fill="#b0a996"/>`,
  ];
  const rows = Math.max(2, Math.round(h / 7));
  for (let i = 1; i < rows; i++) {
    const t = i / rows;
    const ix = r1(inset * (1 - t));
    parts.push(
      `<path d="M${r1(x + ix)},${r1(y + h * t)}h${r1(w - ix * 2)}" stroke="${joint}" stroke-width="1" fill="none"/>`,
    );
  }
  const cols = Math.max(2, Math.round(w / 16));
  for (let i = 1; i < cols; i++)
    parts.push(
      `<path d="M${r1(x + (w * i) / cols)},${r1(y + 2)}v${r1(h - 3)}" stroke="${joint}" stroke-width="0.9" opacity=".8" fill="none"/>`,
    );
  return parts.join("");
}

/** 煉瓦の建物(門司の税関・八幡の工場・浦上の天主堂に使う)。 */
function brickBlock(x, top, w, base, fill = "#a8543c") {
  const h = base - top;
  const parts = [
    `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="${fill}"/>`,
    `<rect x="${r1(x - 3)}" y="${r1(top - 4)}" width="${r1(w + 6)}" height="4" fill="#8a4030"/>`,
  ];
  for (let i = 1; i < Math.round(h / 9); i++)
    parts.push(
      `<path d="M${x},${r1(top + i * 9)}h${w}" stroke="#8f4634" stroke-width="1" opacity=".7" fill="none"/>`,
    );
  return parts.join("");
}

/** アーチ窓の列(商館・税関・天主堂の「開口部」)。 */
function archWindows(x, y, w, h, n, fill = "#3f5566", frame = "#efe8d8") {
  const parts = [];
  const gap = r1(w / n);
  for (let i = 0; i < n; i++) {
    const wx = r1(x + gap * i + gap * 0.22);
    const ww = r1(gap * 0.56);
    parts.push(
      `<path d="M${wx},${r1(y + h)}v${r1(-(h - ww / 2))}a${r1(ww / 2)},${r1(ww / 2)} 0 0 1 ${ww},0v${r1(h - ww / 2)}z" fill="${frame}"/>`,
      `<path d="M${r1(wx + 1.3)},${r1(y + h)}v${r1(-(h - ww / 2 - 1))}a${r1(ww / 2 - 1.3)},${r1(ww / 2 - 1.3)} 0 0 1 ${r1(ww - 2.6)},0v${r1(h - ww / 2 - 1)}z" fill="${fill}"/>`,
    );
  }
  return parts.join("");
}

/** 四角い窓の格子(商館の倉庫。**平戸の「窓」**)。 */
function windowGrid(x, y, w, h, cols, rows, fill = "#3f5566", frame = "#c9c0ac") {
  const parts = [];
  const gw = r1(w / cols);
  const gh = r1(h / rows);
  for (let c = 0; c < cols; c++)
    for (let rw = 0; rw < rows; rw++) {
      const wx = r1(x + gw * c + gw * 0.24);
      const wy = r1(y + gh * rw + gh * 0.22);
      parts.push(
        `<rect x="${r1(wx - 1.2)}" y="${r1(wy - 1.2)}" width="${r1(gw * 0.52 + 2.4)}" height="${r1(gh * 0.56 + 2.4)}" fill="${frame}"/>`,
        `<rect x="${wx}" y="${wy}" width="${r1(gw * 0.52)}" height="${r1(gh * 0.56)}" fill="${fill}"/>`,
      );
    }
  return parts.join("");
}

/** 煙突。 */
function chimney(x, base, h, w = 8, fill = "#b0a48e", ring = "#e8443f") {
  const tw = r1(w * 0.68);
  return (
    `<path d="M${r1(x - w / 2)},${base}L${r1(x - tw / 2)},${r1(base - h)}h${tw}L${r1(x + w / 2)},${base}z" fill="${fill}"/>` +
    `<rect x="${r1(x - tw / 2 - 0.6)}" y="${r1(base - h)}" width="${r1(tw + 1.2)}" height="2.6" fill="${ring}"/>` +
    `<rect x="${r1(x - tw / 2 - 0.4)}" y="${r1(base - h * 0.62)}" width="${r1(tw + 1.6)}" height="2.4" fill="${ring}" opacity=".85"/>`
  );
}

/** 煙・噴煙。 */
function plume(x, y, s = 1, fill = "#c9c4bc", o = ".7") {
  const e = (dx, dy, rx, ry) =>
    `<ellipse cx="${r1(x + dx * s)}" cy="${r1(y + dy * s)}" rx="${r1(rx * s)}" ry="${r1(ry * s)}"/>`;
  return `<g fill="${fill}" opacity="${o}">${e(0, 0, 11, 8)}${e(-8, -9, 9, 7)}${e(6, -16, 12, 9)}${e(-4, -26, 15, 11)}${e(8, -38, 19, 13)}</g>`;
}

/** 竪坑櫓。筑豊・三池の炭鉱の顔。滑車を2つ載せる。 */
function headframe(x, base, h, fill = "#5c534a") {
  const w = r1(h * 0.46);
  const top = r1(base - h);
  const parts = [
    `<path d="M${r1(x - w / 2)},${base}L${r1(x - w * 0.2)},${top}h${r1(w * 0.4)}L${r1(x + w / 2)},${base}h${r1(-w * 0.16)}L${r1(x + w * 0.28)},${r1(top + 3)}h${r1(-w * 0.56)}L${r1(x - w * 0.34)},${base}z" fill="${fill}"/>`,
    `<path d="M${r1(x - w * 0.42)},${r1(base - h * 0.25)}h${r1(w * 0.84)}M${r1(x - w * 0.34)},${r1(base - h * 0.55)}h${r1(w * 0.68)}M${r1(x - w * 0.44)},${r1(base - h * 0.12)}L${r1(x + w * 0.36)},${r1(base - h * 0.42)}M${r1(x + w * 0.44)},${r1(base - h * 0.12)}L${r1(x - w * 0.36)},${r1(base - h * 0.42)}" stroke="${fill}" stroke-width="2" fill="none"/>`,
    `<rect x="${r1(x - w * 0.3)}" y="${r1(top - 3)}" width="${r1(w * 0.6)}" height="3" fill="#4a423a"/>`,
    `<circle cx="${r1(x - w * 0.22)}" cy="${r1(top - 7)}" r="6" fill="#4a423a"/>`,
    `<circle cx="${r1(x - w * 0.22)}" cy="${r1(top - 7)}" r="2.6" fill="#a09484"/>`,
    `<circle cx="${r1(x + w * 0.22)}" cy="${r1(top - 7)}" r="6" fill="#4a423a"/>`,
    `<circle cx="${r1(x + w * 0.22)}" cy="${r1(top - 7)}" r="2.6" fill="#a09484"/>`,
    // 斜めに下りる巻上げ索
    `<path d="M${r1(x - w * 0.22)},${r1(top - 7)}L${r1(x - w * 1.9)},${r1(base - 6)}" stroke="#4a423a" stroke-width="1.4" fill="none"/>`,
  ];
  return parts.join("");
}

/** ボタ山。捨て石の黒い三角。頂に草が戻りかけている。 */
function slagCone(x, base, w, h) {
  return (
    `<path d="M${r1(x - w / 2)},${base}L${x},${r1(base - h)}L${r1(x + w / 2)},${base}z" fill="#3a332c"/>` +
    `<path d="M${x},${r1(base - h)}L${r1(x + w / 2)},${base}L${r1(x + w * 0.1)},${base}z" fill="#4a4238" opacity=".9"/>` +
    `<path d="M${r1(x - w * 0.16)},${r1(base - h * 0.72)}q${r1(w * 0.16)},${r1(-h * 0.24)} ${r1(w * 0.3)},0q${r1(-w * 0.14)},${r1(h * 0.14)} ${r1(-w * 0.3)},0z" fill="#4f6b3f" opacity=".85"/>`
  );
}

/** 鳥居。 */
function torii(x, base, w, h, fill = "#c2453c") {
  const cw = r1(w * 0.09);
  return (
    `<g fill="${fill}">` +
    `<rect x="${r1(x - w / 2)}" y="${r1(base - h)}" width="${cw}" height="${h}"/>` +
    `<rect x="${r1(x + w / 2 - cw)}" y="${r1(base - h)}" width="${cw}" height="${h}"/>` +
    `<path d="M${r1(x - w * 0.62)},${r1(base - h)}q${r1(w * 0.62)},${r1(-h * 0.1)} ${r1(w * 1.24)},0l0,${r1(h * 0.075)}q${r1(-w * 0.62)},${r1(-h * 0.07)} ${r1(-w * 1.24)},0z"/>` +
    `<rect x="${r1(x - w * 0.56)}" y="${r1(base - h * 0.78)}" width="${r1(w * 1.12)}" height="${r1(h * 0.06)}"/>` +
    `<rect x="${r1(x - cw / 2)}" y="${r1(base - h * 0.95)}" width="${cw}" height="${r1(h * 0.2)}"/>` +
    `</g>`
  );
}

/** 漁船・和船。 */
function boat(x, y, s = 1, hull = "#f2ede0", cabin = "#4a7f9a") {
  return (
    `<path d="M${r1(x - 22 * s)},${y}q${r1(22 * s)},${r1(9 * s)} ${r1(44 * s)},0l${r1(-4 * s)},${r1(-6 * s)}h${r1(-36 * s)}z" fill="${hull}"/>` +
    `<rect x="${r1(x - 8 * s)}" y="${r1(y - 15 * s)}" width="${r1(16 * s)}" height="${r1(9 * s)}" fill="${cabin}"/>` +
    `<rect x="${r1(x - 1 * s)}" y="${r1(y - 26 * s)}" width="${r1(2 * s)}" height="${r1(11 * s)}" fill="#6b5330"/>` +
    `<path d="M${r1(x - 20 * s)},${r1(y - 6 * s)}h${r1(40 * s)}" stroke="#c2453c" stroke-width="${r1(2 * s)}" fill="none"/>`
  );
}

/** 帆船(伊万里・平戸に来た交易船)。 */
function tallShip(x, y, s = 1) {
  return (
    `<path d="M${r1(x - 30 * s)},${y}q${r1(30 * s)},${r1(13 * s)} ${r1(60 * s)},0l${r1(-6 * s)},${r1(-8 * s)}h${r1(-48 * s)}z" fill="#5a4630"/>` +
    `<path d="M${r1(x - 28 * s)},${r1(y - 8 * s)}h${r1(56 * s)}" stroke="#8a6a44" stroke-width="${r1(2.4 * s)}" fill="none"/>` +
    `<rect x="${r1(x - 13 * s)}" y="${r1(y - 54 * s)}" width="${r1(2.4 * s)}" height="${r1(46 * s)}" fill="#6b5330"/>` +
    `<rect x="${r1(x + 11 * s)}" y="${r1(y - 46 * s)}" width="${r1(2.4 * s)}" height="${r1(38 * s)}" fill="#6b5330"/>` +
    `<path d="M${r1(x - 24 * s)},${r1(y - 48 * s)}h${r1(22 * s)}v${r1(15 * s)}h${r1(-22 * s)}z" fill="#f2ede0"/>` +
    `<path d="M${r1(x - 26 * s)},${r1(y - 30 * s)}h${r1(26 * s)}v${r1(16 * s)}h${r1(-26 * s)}z" fill="#e8e2d4"/>` +
    `<path d="M${r1(x + 2 * s)},${r1(y - 42 * s)}h${r1(20 * s)}v${r1(14 * s)}h${r1(-20 * s)}z" fill="#f2ede0"/>` +
    `<path d="M${r1(x + 1 * s)},${r1(y - 26 * s)}h${r1(22 * s)}v${r1(14 * s)}h${r1(-22 * s)}z" fill="#e8e2d4"/>`
  );
}

/** 港のクレーン(門型)。造船所・積出港。 */
function gantry(x, base, h, w, fill = "#7f8a94") {
  return (
    `<g fill="${fill}">` +
    `<path d="M${r1(x - w / 2)},${base}h5l${r1(w * 0.22)},${r1(-h)}h-5z"/>` +
    `<path d="M${r1(x + w / 2)},${base}h-5l${r1(-w * 0.22)},${r1(-h)}h5z"/>` +
    `<rect x="${r1(x - w * 0.34)}" y="${r1(base - h - 6)}" width="${r1(w * 0.68)}" height="6"/>` +
    `<rect x="${r1(x - w * 0.34)}" y="${r1(base - h - 20)}" width="${r1(w * 0.2)}" height="14"/>` +
    `</g>` +
    `<path d="M${r1(x + w * 0.16)},${r1(base - h)}v${r1(h * 0.42)}" stroke="#5f6a74" stroke-width="1.4" fill="none"/>` +
    `<rect x="${r1(x + w * 0.09)}" y="${r1(base - h + h * 0.42)}" width="${r1(w * 0.14)}" height="${r1(h * 0.1)}" fill="#f5b31c"/>`
  );
}

/** 段々畑・棚田の畝。 */
function terraces(y, rows, h, fill1 = "#6f9f52", fill2 = "#5f8f46", wall = "#a89e88") {
  const parts = [];
  for (let i = 0; i < rows; i++) {
    const yy = r1(y + i * h);
    const curve = `M0,${yy}q100,${r1(-h * 0.5)} 200,${r1(-h * 0.15)}t200,${r1(h * 0.3)}`;
    parts.push(
      `<path d="${curve}v${r1(h)}H0z" fill="${i % 2 ? fill2 : fill1}"/>`,
      `<path d="${curve}" stroke="${wall}" stroke-width="3.4" fill="none"/>`,
      `<path d="${curve}" stroke="#8a8272" stroke-width="1.2" fill="none" opacity=".8" transform="translate(0,2)"/>`,
    );
  }
  return parts.join("");
}

/** 田畑の畝(手前の平地)。 */
function furrows(y, n, gap, color = "#4f8f3f", o = ".55") {
  const d = [];
  for (let i = 0; i < n; i++) d.push(`M0,${r1(y + i * gap)}q100,-6 200,0t200,4`);
  return `<g stroke="${color}" stroke-width="2" opacity="${o}" fill="none"><path d="${d.join("")}"/></g>`;
}

/** 線路。炭鉱・工場・港をつなぐ。 */
function railway(y, color = "#6b6252") {
  const ties = [];
  for (let x = 4; x < W; x += 16) ties.push(`<rect x="${x}" y="${r1(y - 2)}" width="10" height="4" fill="#5a4a38"/>`);
  return (
    ties.join("") +
    `<g stroke="${color}" stroke-width="2" fill="none"><path d="M0,${r1(y - 3)}h400M0,${r1(y + 2)}h400"/></g>`
  );
}

// ---------------------------------------------------------------------------
// 背景シーン(400×210)
// ---------------------------------------------------------------------------

export const KYUSHU_BG = {
  /** 炭鉱町(大牟田・飯塚・田川)。竪坑櫓とボタ山、炭鉱住宅の長屋、石炭車。 */
  coalmine:
    sky("#9ab4c4", "#d8d2c4", 120) +
    clouds(300, 30, 1.1, "#e2dccc", ".7") +
    clouds(60, 22, 0.8, "#e2dccc", ".6") +
    hills(122, "#6b7364", 4, 26) +
    ground(120, "#8f8674") +
    slagCone(316, 148, 132, 62) +
    slagCone(238, 150, 84, 40) +
    headframe(66, 152, 88) +
    // 巻上機の小屋
    `<rect x="10" y="126" width="42" height="26" fill="#7f7466"/>` +
    `<path d="M6,126h50l-6,-9h-38z" fill="#4a423a"/>` +
    `<rect x="18" y="134" width="10" height="10" fill="#3f4852"/>` +
    `<rect x="36" y="134" width="10" height="10" fill="#3f4852"/>` +
    // 選炭場のベルトコンベア(斜めに上がる)
    `<path d="M104,150L172,110h20l-64,40z" fill="#6b6252"/>` +
    `<g stroke="#4f4941" stroke-width="1.4" fill="none"><path d="M116,144l6,-4M132,136l6,-4M148,128l6,-4M164,120l6,-4"/></g>` +
    `<rect x="168" y="98" width="34" height="16" fill="#7f7466"/>` +
    // 炭鉱住宅の長屋(手前左)
    machiya(4, 158, 54, 186, "#d8cfbc", "#4a545e") +
    machiya(64, 160, 48, 186, "#cfc6b2", "#4a545e") +
    // 積み上げた石炭と石炭車
    ground(186, "#7a7264") +
    railway(196) +
    `<g fill="#2a2622"><path d="M296,186q22,-16 44,0z"/><path d="M348,186q16,-12 32,0z"/></g>` +
    `<rect x="188" y="176" width="46" height="16" fill="#4a423a"/>` +
    `<path d="M190,176h42l-6,-6h-30z" fill="#2a2622"/>` +
    `<g fill="#3a332c"><circle cx="198" cy="194" r="4.4"/><circle cx="224" cy="194" r="4.4"/></g>` +
    `<g fill="#8a8272"><circle cx="198" cy="194" r="1.6"/><circle cx="224" cy="194" r="1.6"/></g>` +
    // 石炭の粉が積もった路面
    `<g fill="#5f584c" opacity=".7"><ellipse cx="70" cy="204" rx="56" ry="6"/><ellipse cx="300" cy="206" rx="70" ry="5"/></g>` +
    shade(126, 190, 12, 3, ".18") +
    person(125, 190, 22, "#4a5a66", "#e0b48a") +
    arm(125, 177, 11, 6),

  /** 端島。**廃墟ではなく、人が住み働いた形**。屋上の物干し・階段・防潮堤。 */
  ghosttown:
    sky("#7fa8c4", "#c8d8e0", 128) +
    clouds(70, 26, 1, "#e8eef0", ".6") +
    `<g stroke="#4a4436" stroke-width="1.6" fill="none" opacity=".7"><path d="M300,44q4,-4 8,0q4,-4 8,0M336,58q3.4,-3.4 6.8,0q3.4,-3.4 6.8,0"/></g>` +
    // 島の輪郭(軍艦の形)
    `<path d="M18,128q26,-42 92,-46h180q64,4 92,46z" fill="#6b6b6b"/>` +
    // 集合住宅の棟(窓の抜けた開口部が並ぶ)
    `<rect x="24" y="90" width="46" height="38" fill="#8f8d88"/>` +
    windowGrid(26, 92, 42, 34, 4, 4, "#3a3f44", "#a5a39c") +
    `<rect x="76" y="70" width="54" height="58" fill="#a3a099"/>` +
    windowGrid(78, 72, 50, 54, 5, 6, "#33383d", "#b8b5ad") +
    `<rect x="278" y="62" width="52" height="66" fill="#9a978f"/>` +
    windowGrid(280, 64, 48, 62, 5, 7, "#33383d", "#b0ada5") +
    `<rect x="336" y="86" width="42" height="42" fill="#8a8880"/>` +
    windowGrid(338, 88, 38, 38, 4, 4, "#3a3f44", "#a5a39c") +
    // 屋上の物干し(**人が住んでいた**)
    `<g stroke="#6b6252" stroke-width="1.6" fill="none"><path d="M82,70v-9h42v9M84,64h38"/></g>` +
    `<g fill="#e8443f"><rect x="88" y="64" width="6" height="9"/></g>` +
    `<g fill="#5b8fe8"><rect x="100" y="64" width="6" height="8"/></g>` +
    `<g fill="#f2ede0"><rect x="112" y="64" width="6" height="9"/></g>` +
    // 屋上の菜園の木箱と、隙間を上る階段
    `<g fill="#5f7f52"><rect x="284" y="56" width="12" height="6"/><rect x="302" y="56" width="12" height="6"/></g>` +
    `<g fill="#3f6b3a"><circle cx="288" cy="54" r="2.6"/><circle cx="294" cy="55" r="2.2"/><circle cx="308" cy="54" r="2.6"/></g>` +
    `<g fill="#7f7d76"><path d="M132,128l16,-56h8l-14,56z"/></g>` +
    `<g stroke="#5f5d58" stroke-width="1.2" fill="none"><path d="M136,120h12M139,110h12M142,100h12M145,90h12M148,80h12"/></g>` +
    // 防潮堤とその上の手すり
    `<path d="M0,128h400v14H0z" fill="#8a857c"/>` +
    `<path d="M0,128h400v3H0z" fill="#a5a096"/>` +
    `<g stroke="#6b6659" stroke-width="1.2" fill="none"><path d="M40,128v14M96,128v14M152,128v14M208,128v14M264,128v14M320,128v14M376,128v14"/></g>` +
    // 海
    band(142, 22, "#2a5f80") +
    band(160, 20, "#316e90") +
    ground(178, "#3a7ea0") +
    ripples(150, "#a8d4e8") +
    ripples(184, "#a8d4e8") +
    // 波が壁を叩く
    `<path d="M0,144q30,-8 62,0t70,2q40,-8 84,0t80,-2q40,6 104,-2v8H0z" fill="#dfeef2" opacity=".8"/>` +
    // 見学の渡船(手前)
    boat(96, 196, 1.05, "#f2ede0", "#4a7f9a") +
    shade(96, 202, 24, 4, ".14"),

  /** 平戸。**出島より早く開いた窓**。石段の岸壁とオランダ商館の四角い窓。 */
  foreignquay:
    sky("#8fc4e8", "#d4e4ee", 112) +
    clouds(320, 28, 1, "#f6efe2", ".75") +
    hills(114, "#5f7f5a", 3, 30) +
    // 対岸の山と、丘の上の城
    `<path d="M300,114q22,-38 54,-34q26,4 46,34z" fill="#4f6b4a"/>` +
    `<g fill="#f2ede0"><rect x="336" y="66" width="22" height="16"/></g>` +
    `<path d="M332,66h30l-15,-11z" fill="#4a545e"/>` +
    // 海
    band(112, 20, "#2f7396") +
    band(130, 16, "#3b83a6") +
    ripples(118, "#bfe0f0") +
    // オランダ商館の倉庫。**窓を格子に並べる**
    `<rect x="12" y="60" width="118" height="86" fill="#e6e0d0"/>` +
    `<path d="M6,60h130l-14,-16H20z" fill="#55606b"/>` +
    `<rect x="6" y="58" width="130" height="3.4" fill="#3f4852"/>` +
    windowGrid(18, 68, 106, 54, 5, 3, "#3f5566", "#b8ae98") +
    // 咎められた竣工年の刻まれた切妻(数字は描かない。枠だけ残す)
    `<rect x="56" y="44" width="30" height="12" fill="#cfc7b4"/>` +
    `<rect x="59" y="47" width="24" height="6" fill="#8a8272"/>` +
    // 大扉(閉じている)
    `<rect x="52" y="118" width="40" height="28" fill="#5a4630"/>` +
    `<g stroke="#8a6a44" stroke-width="1.4" fill="none"><path d="M62,118v28M72,118v28M82,118v28"/></g>` +
    `<rect x="70" y="130" width="4" height="4" fill="#f5b31c"/>` +
    // 荷を上げ下ろしする滑車のはね出し
    `<path d="M64,44h16v-8h-16z" fill="#55606b"/>` +
    `<path d="M72,36v-6" stroke="#3f4852" stroke-width="2" fill="none"/>` +
    // 岸壁と石段(**窓の下の、水から上がる道**)
    ground(146, "#a09884") +
    stoneWall(0, 146, 400, 12, "#a8a08c") +
    ground(158, "#8f8878") +
    `<g fill="#b0a894"><rect x="196" y="158" width="76" height="7"/><rect x="204" y="165" width="68" height="7"/><rect x="212" y="172" width="60" height="7"/><rect x="220" y="179" width="52" height="7"/><rect x="228" y="186" width="44" height="7"/></g>` +
    `<g stroke="#8a8272" stroke-width="1" fill="none"><path d="M196,165h76M204,172h68M212,179h60M220,186h52"/></g>` +
    // 積んだ荷と樽
    `<g fill="#8a6a44"><rect x="300" y="168" width="30" height="22"/><rect x="334" y="174" width="26" height="16"/></g>` +
    `<g stroke="#5f4a34" stroke-width="1.6" fill="none"><path d="M300,176h30M300,184h30M334,180h26"/></g>` +
    `<g fill="#a8763c"><ellipse cx="366" cy="182" rx="9" ry="4"/><rect x="357" y="182" width="18" height="14"/><ellipse cx="366" cy="196" rx="9" ry="4"/></g>` +
    `<g stroke="#7a5a2c" stroke-width="1.4" fill="none"><path d="M357,187h18M357,192h18"/></g>` +
    ground(190, "#7f7868") +
    // 帆船
    tallShip(322, 146, 0.7) +
    // 荷を検める役人と、荷を担ぐ人
    shade(52, 196, 11, 3, ".16") +
    person(51, 196, 22, "#3f4852") +
    arm(51, 183, 12, -4) +
    shade(96, 200, 11, 3, ".16") +
    person(95, 200, 21, "#8a6a44") +
    `<rect x="86" y="180" width="20" height="8" fill="#a8763c"/>`,

  /** 長崎・浦上。**1873年の解禁、1925年の天主堂、そして被爆**。建物として描く。 */
  memorialchurch:
    sky("#8fc4e8", "#e2ddd0", 116) +
    sun(52, 34, 15, "#f8e0a0") +
    clouds(300, 30, 1, "#f6efe2", ".7") +
    hills(118, "#5f7f5a", 4, 28) +
    ground(116, "#8f9482") +
    // 天主堂(再建された双塔のロマネスク)。左に寄せる
    brickBlock(30, 62, 96, 158, "#a8543c") +
    `<rect x="24" y="40" width="30" height="118" fill="#b25b42"/>` +
    `<rect x="102" y="40" width="30" height="118" fill="#b25b42"/>` +
    `<g fill="#8a4030"><rect x="21" y="36" width="36" height="5"/><rect x="99" y="36" width="36" height="5"/></g>` +
    `<path d="M24,36h30l-15,-12z" fill="#7a3a2c"/>` +
    `<path d="M102,36h30l-15,-12z" fill="#7a3a2c"/>` +
    `<g fill="#efe8d8"><rect x="38" y="19" width="2.4" height="6"/><rect x="34.6" y="21" width="9.2" height="2.4"/><rect x="116" y="19" width="2.4" height="6"/><rect x="112.6" y="21" width="9.2" height="2.4"/></g>` +
    archWindows(26, 52, 26, 20, 1, "#3f5566", "#e2d8c4") +
    archWindows(104, 52, 26, 20, 1, "#3f5566", "#e2d8c4") +
    archWindows(32, 96, 92, 30, 4, "#3f5566", "#e2d8c4") +
    `<circle cx="78" cy="76" r="14" fill="#e2d8c4"/>` +
    `<circle cx="78" cy="76" r="11" fill="#3f5aa0"/>` +
    `<g fill="#e2d8c4"><rect x="76.9" y="65" width="2.2" height="22"/><rect x="67" y="74.9" width="22" height="2.2"/></g>` +
    `<circle cx="78" cy="76" r="3.4" fill="#e8443f"/>` +
    archWindows(56, 128, 44, 30, 1, "#5a4630", "#e2d8c4") +
    // 広場に移された、崩れた鐘楼の一部(**残された建物の断片**)
    ground(158, "#a89e88") +
    `<g stroke="#948a78" stroke-width="1.4" opacity=".7" fill="none"><path d="M0,172h400M0,188h400M0,204h400M60,160v50M160,160v50M260,160v50M350,160v50"/></g>` +
    `<path d="M296,190v-22a14,14 0 0 1 28,0v22z" fill="#a8543c"/>` +
    `<path d="M296,190v-22a14,14 0 0 1 28,0v22z" fill="none" stroke="#8a4030" stroke-width="1.4"/>` +
    `<path d="M300,168q10,-6 20,0l-2,10h-16z" fill="#8a4030"/>` +
    `<rect x="288" y="190" width="44" height="8" fill="#8a8272"/>` +
    shade(310, 200, 26, 4, ".14") +
    // 手向けの花と、立ち止まる人
    `<g fill="#e8443f"><circle cx="342" cy="192" r="3"/><circle cx="348" cy="194" r="2.6"/></g>` +
    `<g fill="#f5b31c"><circle cx="345" cy="188" r="2.4"/></g>` +
    `<g stroke="#4f8f3f" stroke-width="1.4" fill="none"><path d="M342,195v6M348,197v4"/></g>` +
    shade(366, 202, 11, 3, ".16") +
    person(365, 202, 22, "#efe8d8") +
    // 楠(浦上の被爆樹が今も立っている)
    roundTree(180, 168, 20, "#3f7f4a") +
    roundTree(214, 172, 15, "#4a8a52"),

  /** 桜島。**火口の隣の暮らし**。黄色い克灰袋の収集所とヘルメットの登校。 */
  livingvolcano:
    sky("#9ab8cc", "#d8d0c0", 108) +
    // 山と噴煙(右奥。中央は駒に隠れるので避ける)
    plume(318, 46, 1.5, "#b0aaa0", ".72") +
    `<path d="M186,124L292,26l30,26l24,-16l68,88z" fill="#6b6355"/>` +
    `<path d="M292,26l30,26l-18,4l-14,-12l-16,10z" fill="#8a8272"/>` +
    `<path d="M292,26L246,72l24,-4l10,10l14,-16z" fill="#5c5548" opacity=".8"/>` +
    `<path d="M0,124q40,-30 96,-26q44,4 90,26z" fill="#5f7460"/>` +
    ground(108, "#7f8a76") +
    ground(124, "#9a9288") +
    // 町並み(灰色がかった屋根)
    machiya(6, 132, 52, 166, "#e2dccc", "#5a636b") +
    machiya(64, 136, 46, 166, "#d8d2c2", "#5a636b") +
    machiya(122, 134, 44, 166, "#e2dccc", "#5a636b") +
    machiya(300, 130, 50, 166, "#dcd6c6", "#5a636b") +
    machiya(356, 136, 42, 166, "#e2dccc", "#5a636b") +
    // 灰が積もった道
    ground(166, "#a8a094") +
    `<g fill="#b8b0a2" opacity=".8"><ellipse cx="90" cy="182" rx="76" ry="8"/><ellipse cx="300" cy="192" rx="84" ry="8"/></g>` +
    // 黄色い克灰袋の収集所(**この盤面で桜島を語るのはこれ**)
    `<g fill="#f5b31c"><path d="M24,204q-3,-18 10,-18h14q13,0 10,18z"/><path d="M52,206q-3,-16 9,-16h12q12,0 9,16z"/><path d="M82,204q-2,-14 8,-14h10q10,0 8,14z"/></g>` +
    `<g fill="#d99a10"><path d="M28,190h30v3h-30zM54,194h26v3h-26zM84,192h22v2.6h-22z"/></g>` +
    `<g stroke="#8a6a10" stroke-width="1.4" fill="none"><path d="M34,186q7,-4 14,0M61,190q6,-3 12,0"/></g>` +
    // 網をかけた収集場所の枠
    `<g stroke="#5f6a5a" stroke-width="1.8" fill="none"><path d="M16,206v-24h100v24"/></g>` +
    // 箒(戸口に置く)
    `<path d="M138,204v-22" stroke="#8a6a44" stroke-width="2.4" fill="none"/>` +
    `<path d="M132,204q6,-8 12,0z" fill="#a8763c"/>` +
    // ヘルメットの子ども2人(右手前)
    shade(300, 200, 10, 3, ".16") +
    person(299, 200, 24, "#5b8fe8") +
    `<path d="M292,177a7,7 0 0 1 14,0z" fill="#f5b31c"/>` +
    `<rect x="291.5" y="176" width="15" height="2.6" rx="1.2" fill="#d99a10"/>` +
    arm(299, 186, 10, 6) +
    `<rect x="306" y="188" width="12" height="10" rx="2" fill="#c2453c"/>` +
    shade(330, 204, 10, 3, ".16") +
    person(329, 204, 22, "#e8443f") +
    `<path d="M323,183a6.5,6.5 0 0 1 13,0z" fill="#f5b31c"/>` +
    `<rect x="322.5" y="182" width="14" height="2.4" rx="1.2" fill="#d99a10"/>`,

  /** 福岡。湾沿いに続く元寇防塁の石塁と、松林ごしの博多。 */
  invasionwall:
    sky("#8fc4e8", "#d0e2ee", 104) +
    clouds(96, 26, 1, "#f6efe2", ".7") +
    clouds(330, 22, 0.8, "#f6efe2", ".6") +
    // 海と対岸
    `<path d="M0,104q60,-14 130,-8t140,-2q70,-6 130,6z" fill="#6f8a72"/>` +
    band(104, 18, "#3179a0") +
    band(118, 14, "#3e88ae") +
    ripples(110, "#bfe0f0") +
    // 博多の市街(奥)
    `<g fill="#8f9aa4"><rect x="20" y="72" width="18" height="32"/><rect x="44" y="60" width="22" height="44"/><rect x="72" y="78" width="16" height="26"/><rect x="300" y="66" width="20" height="38"/><rect x="326" y="76" width="18" height="28"/><rect x="350" y="58" width="24" height="46"/></g>` +
    `<g fill="#c4cdd4" opacity=".8"><rect x="24" y="78" width="10" height="4"/><rect x="24" y="88" width="10" height="4"/><rect x="48" y="66" width="14" height="4"/><rect x="48" y="76" width="14" height="4"/><rect x="48" y="86" width="14" height="4"/><rect x="304" y="72" width="12" height="4"/><rect x="304" y="84" width="12" height="4"/><rect x="354" y="64" width="16" height="4"/><rect x="354" y="76" width="16" height="4"/><rect x="354" y="88" width="16" height="4"/></g>` +
    // 砂浜
    ground(132, "#e0cfa4") +
    `<path d="M0,134q60,6 120,-2t140,4q70,4 140,-6v10H0z" fill="#efe0b8" opacity=".85"/>` +
    // 松林
    pine(30, 150, 44) +
    pine(66, 154, 36) +
    pine(352, 152, 42) +
    pine(382, 156, 34) +
    // 石塁(手前を横切る。上端が崩れかけ)
    ground(158, "#a8a08c") +
    stoneWall(-10, 158, 420, 30, "#a5a08c", "#6f6a58") +
    `<g fill="#7f7a68"><path d="M40,158q10,-7 20,0zM150,158q12,-8 24,0zM268,158q10,-6 20,0z"/></g>` +
    `<rect x="0" y="185" width="400" height="3.4" fill="#6f6a58"/>` +
    `<g fill="#6f8a52" opacity=".8"><path d="M14,160q6,-8 12,0zM104,159q5,-7 10,0zM214,160q6,-8 12,0zM330,159q5,-7 10,0z"/></g>` +
    ground(188, "#8f8878") +
    `<g stroke="#7a7466" stroke-width="1.4" opacity=".7" fill="none"><path d="M0,196h400M0,206h400"/></g>` +
    // 石塁を見にきた人
    shade(60, 202, 11, 3, ".16") +
    person(59, 202, 22, "#5b8fe8") +
    arm(59, 190, 12, -8),

  /** 小倉。**雲に半ば隠れた工業都市**。二発目が逸れた日の空。 */
  cloudshelter:
    sky("#8a9aa8", "#b8c0c4", 130) +
    // 厚い層雲が上半分を占める
    `<g fill="#c8ced2" opacity=".95"><ellipse cx="60" cy="44" rx="90" ry="30"/><ellipse cx="200" cy="34" rx="110" ry="30"/><ellipse cx="340" cy="46" rx="90" ry="28"/></g>` +
    `<g fill="#dde2e4" opacity=".8"><ellipse cx="110" cy="30" rx="70" ry="20"/><ellipse cx="300" cy="26" rx="80" ry="18"/></g>` +
    // 山影(雲の下)
    `<path d="M0,130L58,86l46,30l62,-40l58,44l60,-32l116,42z" fill="#6b7480" opacity=".75"/>` +
    ground(130, "#6f7680") +
    // 工場と煙突。上半分が雲に飲まれている
    chimney(38, 132, 96, 11, "#9aa0a4") +
    chimney(72, 132, 74, 9, "#9aa0a4") +
    chimney(348, 132, 88, 10, "#9aa0a4") +
    chimney(378, 132, 66, 8, "#9aa0a4") +
    plume(38, 42, 1.2, "#c8ced2", ".9") +
    plume(348, 50, 1.1, "#c8ced2", ".85") +
    `<rect x="10" y="112" width="80" height="20" fill="#7f858c"/>` +
    `<path d="M6,112h88l-8,-9h-72z" fill="#5f666e"/>` +
    `<rect x="300" y="106" width="92" height="26" fill="#7f858c"/>` +
    `<path d="M296,106h100l-10,-10h-80z" fill="#5f666e"/>` +
    windowGrid(14, 116, 72, 14, 6, 1, "#4a5158", "#9aa0a4") +
    windowGrid(304, 112, 84, 18, 7, 2, "#4a5158", "#9aa0a4") +
    // 鋸屋根の工場(手前)
    ground(150, "#5f666e") +
    `<g fill="#8a9096"><path d="M0,168v-16l14,-10v10l14,-10v10l14,-10v10l14,-10v10l14,-10v10l14,-10v10l14,-10v16z"/></g>` +
    `<g fill="#4f565c"><path d="M0,152l14,-10v10zM28,152l14,-10v10zM56,152l14,-10v10zM84,152l14,-10v10z"/></g>` +
    `<g fill="#8a9096"><path d="M300,170v-18l16,-11v11l16,-11v11l16,-11v11l16,-11v11l16,-11v18z"/></g>` +
    `<g fill="#4f565c"><path d="M300,152l16,-11v11zM332,152l16,-11v11zM364,152l16,-11v11z"/></g>` +
    ground(168, "#565d64") +
    railway(184, "#7a828a") +
    `<g fill="#4a5158" opacity=".7"><ellipse cx="80" cy="202" rx="80" ry="7"/><ellipse cx="320" cy="200" rx="76" ry="6"/></g>` +
    // 空を見上げる人(手前左)
    shade(120, 200, 11, 3, ".18") +
    person(119, 200, 22, "#8a8272") +
    arm(119, 188, -10, -8),

  /** 八幡。日本が初めて自前で鉄を溶かした地。溶鉱炉と煙突、赤い炉口。 */
  steeltown:
    sky("#7a6a72", "#c08a5a", 120) +
    sun(316, 40, 17, "#e8a03c") +
    `<g fill="#d8a068" opacity=".35"><ellipse cx="316" cy="40" rx="34" ry="26"/></g>` +
    hills(122, "#4f4a4a", 4, 24) +
    ground(120, "#5a534c") +
    // 溶鉱炉(左)。煉瓦と鉄殻、熱風炉が3本
    `<path d="M14,152V96q0,-14 16,-14h34q16,0 16,14v56z" fill="#7a6a5c"/>` +
    `<path d="M22,96h50v-12q-6,-8 -25,-8t-25,8z" fill="#8a7a68"/>` +
    `<g fill="#5f5348"><rect x="14" y="118" width="66" height="5"/><rect x="14" y="136" width="66" height="5"/></g>` +
    `<path d="M32,152v-14h30v14z" fill="#e8443f"/>` +
    `<path d="M36,152v-10h22v10z" fill="#f5b31c"/>` +
    `<g fill="#8a7a68"><rect x="86" y="86" width="12" height="66" rx="5"/><rect x="102" y="82" width="12" height="70" rx="5"/><rect x="118" y="90" width="12" height="62" rx="5"/></g>` +
    `<g stroke="#5f5348" stroke-width="1.4" fill="none"><path d="M86,104h44M86,124h44M86,142h44"/></g>` +
    // 傾斜のある原料ホッパーと索道
    `<path d="M14,82L58,58l6,10L20,90z" fill="#6b6252"/>` +
    `<g fill="#4f4941"><rect x="52" y="52" width="18" height="10"/></g>` +
    // 煙突の列(右)
    chimney(300, 122, 96, 12, "#a89c88") +
    chimney(334, 122, 76, 10, "#a89c88") +
    chimney(366, 122, 88, 11, "#a89c88") +
    plume(300, 30, 1.3, "#b8a898", ".55") +
    plume(366, 40, 1.1, "#b8a898", ".5") +
    `<rect x="270" y="98" width="120" height="24" fill="#7f7466"/>` +
    windowGrid(274, 102, 112, 16, 8, 1, "#f5b31c", "#5f5348") +
    // 溶けた鉄の光が路面に落ちる
    ground(152, "#4f4941") +
    `<g fill="#c2603c" opacity=".45"><ellipse cx="48" cy="160" rx="60" ry="10"/></g>` +
    // 取鍋を運ぶ台車と線路
    railway(174, "#8a8272") +
    `<rect x="176" y="152" width="48" height="20" rx="3" fill="#6b6252"/>` +
    `<path d="M182,152h36l-4,-8h-28z" fill="#e8443f"/>` +
    `<g fill="#f5b31c" opacity=".9"><path d="M186,146h28l-3,-5h-22z"/></g>` +
    `<g fill="#3a332c"><circle cx="186" cy="174" r="4.4"/><circle cx="214" cy="174" r="4.4"/></g>` +
    ground(184, "#4a443c") +
    `<g stroke="#5f584c" stroke-width="1.4" opacity=".8" fill="none"><path d="M0,194h400M0,204h400"/></g>` +
    // 送風の羽根(手前右)と作業の人
    `<g fill="#8a8272"><circle cx="352" cy="192" r="14"/></g>` +
    `<g fill="#5f584c"><path d="M352,192l12,-7v14zM352,192l-12,-7v14zM352,192l-4,-13h8z"/></g>` +
    `<circle cx="352" cy="192" r="3.4" fill="#c9c0ac"/>` +
    shade(96, 196, 11, 3, ".2") +
    person(95, 196, 22, "#3f4852") +
    `<path d="M89,176a6,6 0 0 1 12,0z" fill="#f5b31c"/>`,

  /** 門司。海峡と赤煉瓦の税関。**本州まで歩いて十分の岬**。 */
  straitport:
    sky("#8fc4e8", "#dbe8f0", 96) +
    clouds(120, 26, 1, "#f6efe2", ".7") +
    `<g stroke="#4a4436" stroke-width="1.6" fill="none" opacity=".8"><path d="M300,36q4,-4 8,0q4,-4 8,0M334,50q3.4,-3.4 6.8,0q3.4,-3.4 6.8,0"/></g>` +
    // 対岸(本州)の山と町。海峡の幅700m
    `<path d="M0,96q56,-42 128,-30q60,10 96,30z" fill="#5f7460"/>` +
    `<path d="M226,96q40,-30 90,-26q54,4 84,26z" fill="#6b8069"/>` +
    `<g fill="#c9c0ac"><rect x="60" y="80" width="12" height="16"/><rect x="78" y="74" width="14" height="22"/><rect x="98" y="82" width="10" height="14"/><rect x="290" y="78" width="12" height="18"/><rect x="308" y="72" width="14" height="24"/></g>` +
    `<g fill="#7a4438"><path d="M58,80h16l-8,-6zM76,74h18l-9,-7zM96,82h14l-7,-6zM288,78h16l-8,-6zM306,72h18l-9,-7z"/></g>` +
    // 吊り橋の主塔とケーブル(海峡をまたぐ)
    `<g fill="#c4c8cc"><rect x="126" y="24" width="7" height="72"/><rect x="266" y="24" width="7" height="72"/><rect x="122" y="34" width="15" height="4"/><rect x="262" y="34" width="15" height="4"/></g>` +
    `<path d="M0,58q64,10 129.5,-30Q196,68 269.5,-6Q334,44 400,52" stroke="#c4c8cc" stroke-width="2.4" fill="none"/>` +
    `<rect x="0" y="64" width="400" height="5" fill="#aeb4b8"/>` +
    `<rect x="0" y="69" width="400" height="2.4" fill="#8d9498"/>` +
    // 海峡(潮が速い)
    band(96, 20, "#2a6b95") +
    band(112, 18, "#357ea4") +
    band(128, 16, "#3f8cb2") +
    `<g stroke="#bfe0f0" stroke-width="2.4" opacity=".6" fill="none"><path d="M20,102h60M280,100h84M10,118h48M300,120h74M60,134h64M290,138h84"/></g>` +
    `<g fill="#dfeef2" opacity=".7"><ellipse cx="120" cy="126" rx="26" ry="3.4"/><ellipse cx="250" cy="112" rx="22" ry="3"/></g>` +
    // 赤煉瓦の税関(左手前)。アーチ窓と時計塔の輪郭
    ground(144, "#a89e88") +
    brickBlock(8, 96, 108, 152, "#a8543c") +
    `<rect x="18" y="76" width="26" height="20" fill="#b25b42"/>` +
    `<path d="M14,76h34l-17,-14z" fill="#55606b"/>` +
    `<circle cx="31" cy="86" r="6" fill="#efe8d8"/>` +
    `<circle cx="31" cy="86" r="4.4" fill="#c9c0ac"/>` +
    `<path d="M4,96h116l-8,-10H12z" fill="#55606b"/>` +
    archWindows(12, 104, 100, 22, 5, "#3f5566", "#e2d8c4") +
    archWindows(12, 132, 100, 20, 5, "#3f5566", "#e2d8c4") +
    `<rect x="52" y="134" width="20" height="18" fill="#5a4630"/>` +
    // 岸壁と繋船柱
    stoneWall(0, 144, 400, 10, "#a5a08c") +
    ground(154, "#8f8878") +
    `<g fill="#5f584c"><rect x="290" y="146" width="8" height="10" rx="3"/><rect x="336" y="146" width="8" height="10" rx="3"/></g>` +
    // 人道トンネルの入口(手前右)。**歩いて渡れる県境**
    `<path d="M296,200v-24a26,26 0 0 1 52,0v24z" fill="#c9c0ac"/>` +
    `<path d="M302,200v-22a20,20 0 0 1 40,0v22z" fill="#2f3640"/>` +
    `<g fill="#f5b31c" opacity=".85"><ellipse cx="322" cy="184" rx="9" ry="4"/></g>` +
    `<rect x="288" y="200" width="68" height="6" fill="#a8a08c"/>` +
    `<g stroke="#8a8272" stroke-width="1.6" fill="none"><path d="M296,176q26,-16 52,0"/></g>` +
    shade(322, 206, 12, 3, ".16") +
    person(322, 206, 20, "#5b8fe8") +
    // 渡船
    boat(178, 138, 0.85) +
    // 手前の岸のロープと荷
    ground(190, "#7f7868") +
    `<g stroke="#8a6a44" stroke-width="2.4" fill="none"><path d="M20,196q26,-10 52,0"/></g>` +
    `<g fill="#8a6a44"><rect x="90" y="184" width="26" height="16"/></g>`,

  /** 佐賀。維新の十年以上前に、オランダの本だけで築いた反射炉と工房。 */
  domainworks:
    sky("#8fc4e8", "#dde4e0", 118) +
    clouds(76, 26, 0.9, "#f6efe2", ".7") +
    hills(120, "#6f8a62", 4, 26) +
    ground(118, "#8f9a7c") +
    // 反射炉(角錐台の煙突が2本、煉瓦積み)
    `<path d="M22,150L34,52h16l12,98z" fill="#a8543c"/>` +
    `<path d="M74,150L86,58h16l12,92z" fill="#a8543c"/>` +
    `<g fill="#8a4030"><rect x="32" y="52" width="20" height="4"/><rect x="84" y="58" width="20" height="4"/></g>` +
    `<g stroke="#8f4634" stroke-width="1" opacity=".7" fill="none"><path d="M26,132h56M28,116h54M30,100h50M32,84h46M34,68h42M78,132h34M80,116h32M82,100h30M84,84h28"/></g>` +
    `<rect x="10" y="118" width="112" height="32" fill="#b25b42"/>` +
    `<path d="M6,118h120l-10,-12H16z" fill="#55606b"/>` +
    windowGrid(14, 124, 104, 22, 5, 1, "#f5b31c", "#8a4030") +
    `<path d="M50,150v-18h24v18z" fill="#5a4630"/>` +
    // 工房(棟が並ぶ)
    machiya(300, 108, 56, 150, "#efe8d8", "#55606b") +
    machiya(360, 114, 40, 150, "#e6dfcd", "#55606b") +
    // 水路(施設に水を引く)
    ground(150, "#8a9078") +
    band(152, 12, "#4f8fa8") +
    `<g stroke="#a8d8e8" stroke-width="1.6" opacity=".6" fill="none"><path d="M20,156h70M180,158h90M300,156h70"/></g>` +
    ground(164, "#7f8a6c") +
    // 鋳込んだ大砲(砲身が台に載る)。左右に寄せる
    `<g fill="#4a5158"><path d="M262,182h96v10h-96z"/><path d="M352,180h14v14h-14z"/></g>` +
    `<circle cx="366" cy="187" r="4" fill="#2f3640"/>` +
    `<g fill="#6b5330"><path d="M256,192h30l6,12h-42z"/><path d="M320,192h30l6,12h-42z"/></g>` +
    `<g fill="#3a332c"><circle cx="272" cy="200" r="6"/><circle cx="336" cy="200" r="6"/></g>` +
    `<g fill="#8a8272"><circle cx="272" cy="200" r="2.2"/><circle cx="336" cy="200" r="2.2"/></g>` +
    shade(308, 206, 60, 4, ".14") +
    // 蒸気機関車の模型を台に載せて見る技師たち(左手前)
    `<rect x="20" y="186" width="72" height="6" fill="#8a6a44"/>` +
    `<g fill="#4a5158"><rect x="30" y="174" width="40" height="12" rx="3"/><rect x="64" y="166" width="14" height="20"/></g>` +
    `<circle cx="40" cy="188" r="4.4" fill="#3a332c"/>` +
    `<circle cx="60" cy="188" r="4.4" fill="#3a332c"/>` +
    `<rect x="34" y="160" width="6" height="8" fill="#4a5158"/>` +
    shade(110, 200, 11, 3, ".16") +
    person(109, 200, 22, "#3f4852") +
    arm(109, 188, -12, -4) +
    shade(136, 202, 11, 3, ".16") +
    person(135, 202, 21, "#8a8272") +
    // 開いた技術書
    `<g fill="#efe8d8"><path d="M148,192q10,-5 20,0v10q-10,-4 -20,0z"/></g>` +
    `<path d="M158,192v10" stroke="#8a8272" stroke-width="1.2" fill="none"/>`,

  /** 有田。山あいの斜面を上る登り窯。薪と、割れた白い磁器。 */
  kilnvillage:
    sky("#a8c8dc", "#dfe6dc", 104) +
    plume(84, 62, 0.8, "#d8d2c4", ".65") +
    // 山
    `<path d="M0,116L54,44l50,44l44,-32l58,52l52,-38l142,46z" fill="#4f6b4a"/>` +
    `<path d="M0,116L54,44l24,22l-30,50z" fill="#5f7f56" opacity=".8"/>` +
    `<g fill="#3f5a3c">${[24, 62, 116, 172, 236, 300, 350].map((x, i) => `<path d="M${x},116l-7,-${18 + (i % 3) * 6}l7,-4l7,${4 + (i % 3) * 2}z"/>`).join("")}</g>` +
    ground(104, "#6f8a5c") +
    ground(116, "#8a8470") +
    // 登り窯(斜面を段になって上がる。窯室ごとに小さな焚口)
    `<path d="M8,166L136,96h26L34,166z" fill="#7a6a58"/>` +
    `<path d="M8,166L136,96h26L34,166z" fill="none" stroke="#5f5348" stroke-width="1.6"/>` +
    `<g fill="#8a7a64">${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M${r1(20 + i * 22)},${r1(154 - i * 12)}q11,-16 22,-6l-6,10q-8,-6 -14,4z"/>`).join("")}</g>` +
    `<g fill="#e8443f">${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${r1(24 + i * 22)}" y="${r1(148 - i * 12)}" width="7" height="7"/>`).join("")}</g>` +
    `<g fill="#f5b31c">${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${r1(25.6 + i * 22)}" y="${r1(150 - i * 12)}" width="4" height="5"/>`).join("")}</g>` +
    `<g fill="#5f5348">${[0, 1, 2, 3, 4].map((i) => `<rect x="${r1(38 + i * 22)}" y="${r1(140 - i * 12)}" width="4" height="9"/>`).join("")}</g>` +
    // 窯焚きの小屋
    machiya(300, 122, 52, 162, "#e6dfcd", "#55606b") +
    machiya(358, 128, 42, 162, "#efe8d8", "#55606b") +
    // 薪の山
    ground(166, "#8f8878") +
    `<g fill="#a8763c"><rect x="176" y="170" width="52" height="9"/><rect x="180" y="179" width="52" height="9"/><rect x="176" y="188" width="52" height="9"/></g>` +
    `<g fill="#7a5a2c"><circle cx="180" cy="174.5" r="3.4"/><circle cx="192" cy="174.5" r="3.4"/><circle cx="204" cy="174.5" r="3.4"/><circle cx="216" cy="174.5" r="3.4"/><circle cx="184" cy="192.5" r="3.4"/><circle cx="196" cy="192.5" r="3.4"/><circle cx="208" cy="192.5" r="3.4"/><circle cx="220" cy="192.5" r="3.4"/></g>` +
    // 白い磁器の破片が土に混じる(有田の道端)
    ground(196, "#8a8272") +
    `<g fill="#f2ede0"><path d="M30,204l8,-4l4,6z"/><path d="M56,200l10,-3l2,7z"/><path d="M92,206l7,-5l5,5z"/><path d="M330,202l9,-4l3,7z"/><path d="M362,206l8,-5l4,6z"/></g>` +
    `<g fill="#2f5aa8"><path d="M32,203l4,-2l1,2z"/><path d="M58,200l5,-1l0.6,3z"/><path d="M332,201l4,-2l1,3z"/></g>` +
    // 轆轤の前に座る人(右手前)
    shade(292, 202, 14, 4, ".16") +
    `<g fill="#8a6a44"><rect x="280" y="190" width="24" height="12"/></g>` +
    `<circle cx="292" cy="188" r="10" fill="#a8763c"/>` +
    `<path d="M286,188q6,-12 12,0z" fill="#f2ede0"/>` +
    person(266, 202, 22, "#4a7f9a") +
    arm(266, 190, 14, -2),

  /** 伊万里。有田の磁器を積み出した港。藁で包んだ箱と、オランダ船。 */
  exportport:
    sky("#8fc4e8", "#d8e6ee", 106) +
    sun(60, 32, 15, "#f8e0a0") +
    clouds(276, 28, 1, "#f6efe2", ".7") +
    `<path d="M0,106q50,-34 116,-28q56,6 92,28z" fill="#5f7f56"/>` +
    `<path d="M240,106q40,-26 84,-22q48,4 76,22z" fill="#6b8a5f"/>` +
    band(106, 20, "#2f7396") +
    band(122, 18, "#3b83a6") +
    ripples(112, "#bfe0f0") +
    // 帆船(左寄り)と艀
    tallShip(84, 140, 0.92) +
    boat(300, 136, 0.8, "#e6dfcd", "#8a6a44") +
    // 岸壁
    ground(140, "#a89e88") +
    stoneWall(0, 140, 400, 14, "#a5a08c") +
    ground(154, "#8f8878") +
    `<g stroke="#7f7869" stroke-width="1.2" opacity=".7" fill="none"><path d="M0,166h400M0,182h400M0,198h400M52,154v56M148,154v56M262,154v56M348,154v56"/></g>` +
    // 荷揚げの木の桁(デリック)
    `<path d="M330,154V96h5v58z" fill="#6b5330"/>` +
    `<path d="M332,100L282,116" stroke="#6b5330" stroke-width="3" fill="none"/>` +
    `<path d="M284,116v14" stroke="#5f4a34" stroke-width="1.4" fill="none"/>` +
    `<rect x="274" y="130" width="22" height="16" fill="#a8763c"/>` +
    `<g stroke="#7a5a2c" stroke-width="1.4" fill="none"><path d="M274,136h22M282,130v16"/></g>` +
    // 藁で梱包した積出箱(手前左右)
    `<g fill="#c9a05c"><rect x="14" y="164" width="42" height="30" rx="2"/><rect x="62" y="172" width="34" height="22" rx="2"/><rect x="20" y="140" width="34" height="24" rx="2"/></g>` +
    `<g stroke="#8a6a2c" stroke-width="2" fill="none"><path d="M14,172h42M14,186h42M62,178h34M62,188h34M20,148h34M20,158h34"/></g>` +
    `<g stroke="#e0c088" stroke-width="1.2" opacity=".8" fill="none"><path d="M18,166l6,26M30,166l4,26M44,166l4,26M66,174l4,18M80,174l3,18"/></g>` +
    shade(50, 196, 42, 4, ".14") +
    // 割れないよう藁を詰める人
    shade(330, 202, 11, 3, ".16") +
    person(329, 202, 22, "#8a6a44") +
    arm(329, 190, -12, 4) +
    `<g fill="#c9a05c"><rect x="344" y="180" width="30" height="22" rx="2"/></g>` +
    `<g stroke="#8a6a2c" stroke-width="1.8" fill="none"><path d="M344,188h30M344,196h30"/></g>` +
    // 藁の束
    `<g stroke="#d8b878" stroke-width="1.6" fill="none"><path d="M110,202q6,-14 12,-2M118,204q4,-12 10,-4"/></g>` +
    // 荷札のついた壺
    `<g fill="#f2ede0"><path d="M120,164q-8,6 -8,14t8,10q8,-2 8,-10t-8,-14z"/></g>` +
    `<g fill="#2f5aa8"><path d="M114,180q6,3 12,0v3q-6,3 -12,0z"/></g>`,

  /** 唐津。出兵のために築かれ、捨てられた城。礎石と崩れた石垣だけの野。 */
  invasionbase:
    sky("#a8b8c0", "#d8d8cc", 100) +
    clouds(300, 30, 1.1, "#e8e4d8", ".65") +
    // 海が奥に見える(渡海の起点)
    band(100, 12, "#4f7f9a") +
    `<g stroke="#bfe0f0" stroke-width="1.6" opacity=".5" fill="none"><path d="M30,104h60M240,106h80"/></g>` +
    // 松の生えた低い丘
    `<path d="M0,112q60,-22 132,-12q62,10 108,12z" fill="#5f7460"/>` +
    `<path d="M252,112q46,-20 92,-14q40,6 56,14z" fill="#6b8069"/>` +
    ground(112, "#78855c") +
    pine(30, 118, 34) +
    pine(64, 120, 26) +
    pine(356, 118, 30) +
    pine(384, 122, 24) +
    // 崩れた石垣(段になって残る)
    stoneWall(0, 122, 176, 18, "#a09a84", "#6f6a58") +
    `<g fill="#7f7a68"><path d="M40,122q12,-8 24,0zM110,122q10,-7 20,0z"/></g>` +
    `<path d="M176,122l14,18h-14z" fill="#847f6c"/>` +
    stoneWall(252, 126, 148, 16, "#a09a84", "#6f6a58") +
    `<g fill="#7f7a68"><path d="M300,126q12,-7 24,0zM356,126q10,-6 20,0z"/></g>` +
    ground(140, "#87945e") +
    // 崩れ落ちた石が野に散る
    `<g fill="#b0aa94"><rect x="184" y="146" width="20" height="12" rx="2" transform="rotate(-8 194 152)"/><rect x="210" y="152" width="16" height="11" rx="2" transform="rotate(6 218 157)"/><rect x="152" y="150" width="18" height="12" rx="2" transform="rotate(4 161 156)"/></g>` +
    `<g fill="#8a8472"><path d="M184,152h20v6h-20zM210,158h16v5h-16z"/></g>` +
    // 礎石の並び(建物があった痕跡)。手前に規則正しく
    ground(160, "#94a065") +
    furrows(168, 4, 12, "#7f8a5c", ".45") +
    `<g fill="#7f7a68">${[24, 66, 108, 150, 250, 292, 334, 376].map((x) => `<ellipse cx="${x}" cy="183" rx="12" ry="5"/>`).join("")}</g>` +
    `<g fill="#b0aa94">${[24, 66, 108, 150, 250, 292, 334, 376].map((x) => `<ellipse cx="${x}" cy="180" rx="12" ry="5"/>`).join("")}</g>` +
    `<g fill="#d0c9b4">${[24, 66, 108, 150, 250, 292, 334, 376].map((x) => `<ellipse cx="${r1(x - 2)}" cy="179" rx="7" ry="3"/>`).join("")}</g>` +
    `<g fill="#7f7a68">${[44, 86, 128, 270, 312, 354].map((x) => `<ellipse cx="${x}" cy="203" rx="14" ry="6"/>`).join("")}</g>` +
    `<g fill="#b0aa94">${[44, 86, 128, 270, 312, 354].map((x) => `<ellipse cx="${x}" cy="200" rx="14" ry="6"/>`).join("")}</g>` +
    `<g fill="#d0c9b4">${[44, 86, 128, 270, 312, 354].map((x) => `<ellipse cx="${r1(x - 2)}" cy="199" rx="8" ry="3.4"/>`).join("")}</g>` +
    // 畑に戻された地面の畝と、生えた雑草
    `<g stroke="#6f8a4c" stroke-width="1.6" stroke-linecap="round" fill="none"><path d="M14,194v-8M18,195v-10M60,190v-7M104,206v-9M300,192v-8M340,208v-8M382,194v-9"/></g>`,

  /** 太宰府。五百年、国の玄関を差配した政庁の礎石と梅の木。 */
  ancientcapital:
    sky("#a8cfe0", "#e2e8dc", 112) +
    clouds(304, 26, 0.9, "#f6efe2", ".7") +
    hills(114, "#5f7f5a", 4, 30) +
    // 大野城の土塁が載った背後の山
    `<path d="M40,114q46,-40 100,-34q52,6 78,34z" fill="#4f6b4a"/>` +
    ground(112, "#6f8a5c") +
    ground(126, "#8f9478") +
    // 参道の松と、遠くの回廊の跡
    `<g fill="#a5a08c"><rect x="0" y="120" width="400" height="6"/></g>` +
    pine(30, 132, 40) +
    pine(70, 136, 32) +
    pine(340, 134, 36) +
    pine(378, 138, 28) +
    // 梅の木(左手前。菅原道真)
    `<path d="M96,178q-6,-24 -2,-38q2,-8 8,-12" stroke="#5f4a34" stroke-width="5" fill="none" stroke-linecap="round"/>` +
    `<path d="M94,150q-14,-8 -22,-20M96,144q12,-10 24,-14M92,160q-16,-2 -24,-10" stroke="#5f4a34" stroke-width="3" fill="none" stroke-linecap="round"/>` +
    `<g fill="#f0c8d8">${[[70, 128], [78, 122], [64, 136], [120, 128], [112, 120], [128, 136], [92, 112], [102, 118], [84, 132], [110, 142]].map(([x, y]) => `<g><circle cx="${x}" cy="${y}" r="4"/><circle cx="${x}" cy="${y}" r="1.6" fill="#e8809a"/></g>`).join("")}</g>` +
    // 政庁跡の礎石(碁盤に並ぶ)。中央は駒に隠れるので左右と手前に
    ground(154, "#7f8a5c") +
    `<g stroke="#6f7a4c" stroke-width="1.6" opacity=".5" fill="none"><path d="M0,168h400M0,186h400M0,204h400"/></g>` +
    `<g fill="#b0a894">${[26, 66, 106, 146, 254, 294, 334, 374].map((x) => `<ellipse cx="${x}" cy="168" rx="11" ry="4.6"/>`).join("")}</g>` +
    `<g fill="#c9c2ae">${[26, 66, 106, 146, 254, 294, 334, 374].map((x) => `<ellipse cx="${r1(x - 1.5)}" cy="166.4" rx="6.4" ry="2.8"/>`).join("")}</g>` +
    `<g fill="#b0a894">${[16, 62, 108, 154, 246, 292, 338, 384].map((x) => `<ellipse cx="${x}" cy="190" rx="14" ry="5.6"/>`).join("")}</g>` +
    `<g fill="#c9c2ae">${[16, 62, 108, 154, 246, 292, 338, 384].map((x) => `<ellipse cx="${r1(x - 2)}" cy="188" rx="8" ry="3.4"/>`).join("")}</g>` +
    // 礎石のあいだの草
    `<g stroke="#5f8f4a" stroke-width="1.6" stroke-linecap="round" fill="none"><path d="M44,178v-7M86,180v-8M266,178v-7M312,182v-8M356,180v-7M40,200v-8M200,206v-9M360,202v-8"/></g>` +
    // 巻物を手に立つ人(右手前)
    shade(334, 206, 11, 3, ".16") +
    person(333, 206, 23, "#4a5a8a") +
    arm(333, 193, -12, 3) +
    `<g fill="#efe8d8"><rect x="316" y="192" width="14" height="6" rx="3"/></g>`,

  /** 吉野ヶ里。濠と物見櫓の環濠集落。武士より千年早い。 */
  ancientsettlement:
    sky("#8fc4e8", "#dfe6d8", 108) +
    clouds(70, 24, 0.9, "#f6efe2", ".7") +
    hills(110, "#6f8a5c", 4, 24) +
    ground(108, "#7f9a5c") +
    // 物見櫓(左。高い掘立の櫓)
    `<g fill="#8a6a44"><path d="M28,158V78h5v80zM66,158V78h5v80z"/></g>` +
    `<path d="M20,80h60v-4H20z" fill="#7a5a34"/>` +
    `<rect x="18" y="60" width="64" height="18" fill="#a8763c"/>` +
    `<path d="M12,60h76l-38,-18z" fill="#8a7a4c"/>` +
    `<g stroke="#7a5a34" stroke-width="1.6" fill="none"><path d="M12,60h76M28,100h43M28,124h43M28,140L71,124M71,140L28,124"/></g>` +
    `<g fill="#5f4a34"><rect x="24" y="76" width="52" height="3"/></g>` +
    `<path d="M46,60V44h6v16z" fill="#8a6a44"/>` +
    `<path d="M52,44l14,4l-14,4z" fill="#c2453c"/>` +
    // 高床の倉庫(右)
    `<g fill="#8a6a44"><rect x="300" y="130" width="4" height="24"/><rect x="322" y="130" width="4" height="24"/><rect x="344" y="130" width="4" height="24"/><rect x="366" y="130" width="4" height="24"/></g>` +
    `<g fill="#c9a05c"><circle cx="302" cy="128" r="6"/><circle cx="346" cy="128" r="6"/><circle cx="324" cy="128" r="6"/><circle cx="368" cy="128" r="6"/></g>` +
    `<rect x="294" y="112" width="82" height="18" fill="#a8763c"/>` +
    `<path d="M286,112h98l-49,-26z" fill="#9a8a54"/>` +
    `<g stroke="#7a6a3c" stroke-width="1.4" fill="none"><path d="M300,104l24,-13M320,110l30,-16M340,112l20,-11"/></g>` +
    `<path d="M320,86l16,-10l16,10" stroke="#7a5a34" stroke-width="2.4" fill="none"/>` +
    // 竪穴住居(中景右)
    `<path d="M240,154q14,-30 30,0z" fill="#9a8a54"/>` +
    `<path d="M244,154q10,-24 22,-6z" fill="#a8763c" opacity=".7"/>` +
    // 柵(集落を囲う)
    `<g fill="#8a6a44">${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((i) => `<path d="M${r1(6 + i * 23)},158v-24l3,-4l3,4v24z"/>`).join("")}</g>` +
    `<g stroke="#6b5330" stroke-width="2" fill="none"><path d="M0,142h400M0,152h400"/></g>` +
    // 濠(手前を横切る。V字に掘られている)
    ground(158, "#8a8f60") +
    `<path d="M0,164h400l-30,26H30z" fill="#7a7f50"/>` +
    `<path d="M30,190h340l-16,14H46z" fill="#4f7f9a"/>` +
    `<g stroke="#a8d8e8" stroke-width="1.6" opacity=".55" fill="none"><path d="M60,196h60M280,198h70"/></g>` +
    `<g stroke="#6f8a4c" stroke-width="1.6" stroke-linecap="round" fill="none"><path d="M18,164v-6M96,166v-6M300,164v-6M382,166v-6"/></g>` +
    // 濠を渡す木の橋(左)
    `<g fill="#a8763c"><path d="M60,184h40v5h-40z"/></g>` +
    `<g fill="#8a6a44"><rect x="64" y="189" width="4" height="14"/><rect x="92" y="189" width="4" height="14"/></g>`,

  /** 久留米。足袋屋から育ったゴム靴とタイヤの工場町。 */
  factorytown:
    sky("#8fc4e8", "#dbe2e6", 116) +
    clouds(94, 26, 1, "#f6efe2", ".7") +
    hills(118, "#6b8060", 4, 22) +
    ground(116, "#8a9078") +
    // 川と鉄橋(筑後川。九州最初の鉄道はここで止まった)
    band(118, 16, "#4f8fa8") +
    `<g stroke="#a8d8e8" stroke-width="1.6" opacity=".55" fill="none"><path d="M20,124h70M280,126h90"/></g>` +
    `<rect x="0" y="112" width="400" height="6" fill="#6b7480"/>` +
    `<g fill="#7f8a94"><path d="M0,112V96l24,16zM24,112L48,96v16zM48,112V96l24,16zM72,112L96,96v16zM300,112V96l24,16zM324,112L348,96v16zM348,112V96l24,16zM372,112L396,96v16z"/></g>` +
    `<rect x="0" y="94" width="400" height="4" fill="#6b7480"/>` +
    ground(134, "#8f8878") +
    // 工場(鋸屋根)と煙突
    `<g fill="#b0a894"><path d="M8,168v-30l18,-12v12l18,-12v12l18,-12v12l18,-12v12l18,-12v30z"/></g>` +
    `<g fill="#7f7a6c"><path d="M8,138l18,-12v12zM44,138l18,-12v12zM80,138l18,-12v12z"/></g>` +
    windowGrid(12, 148, 100, 18, 6, 1, "#4a5a66", "#8f8a76") +
    chimney(126, 138, 62, 9, "#a89c88") +
    plume(126, 62, 0.8, "#c8c4bc", ".5") +
    // 倉庫(右)
    `<rect x="300" y="132" width="96" height="36" fill="#c9c0ac"/>` +
    `<path d="M296,132h104l-10,-12h-84z" fill="#7a4438"/>` +
    windowGrid(304, 138, 88, 24, 5, 1, "#4a5a66", "#a89e88") +
    // 積み上げたタイヤ(手前右)
    ground(168, "#8f8878") +
    `<g fill="#3a3d42"><ellipse cx="336" cy="186" rx="26" ry="10"/><ellipse cx="336" cy="176" rx="26" ry="10"/><ellipse cx="336" cy="166" rx="26" ry="10"/><ellipse cx="376" cy="192" rx="22" ry="9"/><ellipse cx="376" cy="183" rx="22" ry="9"/></g>` +
    `<g fill="#5a5e64"><ellipse cx="336" cy="166" rx="11" ry="4.4"/><ellipse cx="376" cy="183" rx="9" ry="3.6"/></g>` +
    `<g stroke="#2a2d31" stroke-width="1.2" fill="none"><path d="M312,182h48M312,172h48M356,190h40"/></g>` +
    shade(336, 196, 30, 5, ".16") +
    // ゴム底の作業靴を並べる台(手前左)
    `<rect x="14" y="184" width="90" height="7" fill="#8a6a44"/>` +
    `<g fill="#3a3d42">${[22, 44, 66, 88].map((x) => `<path d="M${x},184q-4,-10 4,-11h8q4,1 4,11z"/>`).join("")}</g>` +
    `<g fill="#f2ede0">${[22, 44, 66, 88].map((x) => `<path d="M${r1(x + 1)},176q1,-5 3.4,-5h5q2.6,0 3.4,5z"/>`).join("")}</g>` +
    `<g fill="#8a6a44"><rect x="20" y="191" width="4" height="12"/><rect x="94" y="191" width="4" height="12"/></g>` +
    shade(140, 200, 11, 3, ".16") +
    person(139, 200, 22, "#4a7f9a") +
    arm(139, 188, 12, 4),

  /** 佐世保。静かな入江に置かれた造船所。二つの国の旗が並ぶ。 */
  navalport:
    sky("#8fc4e8", "#d4e2ea", 100) +
    clouds(66, 24, 0.9, "#f6efe2", ".7") +
    // 深く入り組んだ湾の山
    `<path d="M0,100q40,-40 96,-32q54,8 78,32z" fill="#4f6b4a"/>` +
    `<path d="M198,100q44,-34 96,-28q56,6 106,28z" fill="#5f7f56"/>` +
    band(100, 22, "#2a6b95") +
    band(118, 18, "#357ea4") +
    ripples(106, "#bfe0f0") +
    // ドックに入った船体(左)
    ground(136, "#8f8a7c") +
    `<rect x="0" y="136" width="150" height="52" fill="#7f7a6c"/>` +
    `<path d="M0,140h150v6H0z" fill="#6f6a5e"/>` +
    `<g stroke="#6f6a5e" stroke-width="1.4" fill="none"><path d="M0,152h150M0,164h150M0,176h150"/></g>` +
    `<path d="M6,168q10,-32 60,-32h58q10,10 10,32z" fill="#4a5158"/>` +
    `<path d="M6,168q10,-32 60,-32h58q10,10 10,32z" fill="none" stroke="#333a40" stroke-width="1.6"/>` +
    `<path d="M14,150h116v6H14z" fill="#8a3a34"/>` +
    `<rect x="40" y="118" width="52" height="18" fill="#5f676e"/>` +
    `<rect x="56" y="102" width="20" height="16" fill="#6b737a"/>` +
    `<rect x="64" y="82" width="4" height="20" fill="#8a9096"/>` +
    `<g fill="#c9c0ac"><rect x="46" y="122" width="8" height="7"/><rect x="60" y="122" width="8" height="7"/><rect x="74" y="122" width="8" height="7"/></g>` +
    // 門型クレーン(中景左と右)
    gantry(104, 136, 68, 88) +
    gantry(330, 140, 56, 76) +
    // 旗が2本(明治の港に、いまは二つの国の旗)
    `<g fill="#a5aab0"><rect x="288" y="112" width="3" height="52"/><rect x="316" y="112" width="3" height="52"/></g>` +
    `<path d="M291,114h24v14h-24z" fill="#f2ede0"/>` +
    `<circle cx="301" cy="121" r="4.4" fill="#e8443f"/>` +
    `<path d="M319,114h26v14h-26z" fill="#f2ede0"/>` +
    `<g fill="#e8443f"><rect x="319" y="116" width="26" height="2"/><rect x="319" y="120" width="26" height="2"/><rect x="319" y="124" width="26" height="2"/></g>` +
    `<rect x="319" y="114" width="11" height="7" fill="#3f5aa0"/>` +
    // 岸壁
    ground(164, "#8f8878") +
    `<g stroke="#7f7869" stroke-width="1.2" opacity=".7" fill="none"><path d="M0,176h400M0,190h400M0,204h400M180,164v46M240,164v46M300,164v46M360,164v46"/></g>` +
    `<g fill="#5f584c"><rect x="200" y="166" width="8" height="10" rx="3"/><rect x="256" y="166" width="8" height="10" rx="3"/></g>` +
    `<g stroke="#6b5330" stroke-width="2.4" fill="none"><path d="M204,170q26,10 52,0"/></g>` +
    // 溶接する人(手前右)
    shade(348, 202, 11, 3, ".16") +
    person(347, 202, 22, "#3f4852") +
    `<path d="M341,182a6,6 0 0 1 12,0z" fill="#f5b31c"/>` +
    arm(347, 190, 12, 4) +
    `<g fill="#f5f0c0" opacity=".9"><circle cx="362" cy="196" r="4"/></g>` +
    `<g stroke="#f5f0c0" stroke-width="1.2" opacity=".8" fill="none"><path d="M362,196l7,-5M362,196l6,6M362,196l-2,8"/></g>`,

  /** 島原。三万七千が立てこもった原城の跡。冬の野と、崩れた石垣、海。 */
  rebellionfield:
    sky("#9aa8b4", "#d0cec2", 96) +
    clouds(300, 28, 1.1, "#e2ded2", ".6") +
    `<g stroke="#4a4436" stroke-width="1.4" opacity=".6" fill="none"><path d="M62,40q4,-4 8,0q4,-4 8,0M100,52q3.4,-3.4 6.8,0q3.4,-3.4 6.8,0"/></g>` +
    // 遠くに雲仙の山
    `<path d="M240,96L306,40l28,26l22,-14l44,44z" fill="#6b7480"/>` +
    // 海(有明海)
    band(96, 16, "#4a7a94") +
    `<g stroke="#b8d8e4" stroke-width="1.6" opacity=".5" fill="none"><path d="M20,102h60M280,106h80"/></g>` +
    // 台地の縁
    `<path d="M0,112q70,-16 150,-8t120,4q70,4 130,-6z" fill="#6f7458"/>` +
    ground(112, "#7f8258"/* 冬枯れ */) +
    // 崩れた石垣が野に沈んでいる
    stoneWall(0, 122, 130, 16, "#a09a86", "#6b6656") +
    `<g fill="#7a7462"><path d="M30,122q12,-8 24,0zM86,122q10,-7 20,0z"/></g>` +
    stoneWall(286, 126, 114, 14, "#a09a86", "#6b6656") +
    `<path d="M130,122l16,16h-16z" fill="#847f6c"/>` +
    `<path d="M286,126l-14,14h14z" fill="#847f6c"/>` +
    ground(138, "#8a8a5c") +
    // 冬枯れの草の野。手前いっぱい
    ground(158, "#95935e") +
    `<g stroke="#c0bc80" stroke-width="1.8" opacity=".9" stroke-linecap="round" fill="none">${[8, 26, 44, 62, 80, 98, 116, 134, 152, 170, 188, 206, 224, 242, 260, 278, 296, 314, 332, 350, 368, 386]
      .map((x, i) => `<path d="M${x},${r1(178 + (i % 3) * 10)}v${r1(-12 - (i % 4) * 5)}"/>`)
      .join("")}</g>` +
    `<g stroke="#6a6f38" stroke-width="1.6" opacity=".85" stroke-linecap="round" fill="none">${[16, 52, 88, 124, 160, 232, 268, 304, 340, 376]
      .map((x, i) => `<path d="M${x},${r1(202 - (i % 2) * 8)}v${r1(-16 - (i % 3) * 6)}"/>`)
      .join("")}</g>` +
    // 土に半ば埋もれた石(掘り出された遺構)
    `<g fill="#b5af99"><rect x="18" y="182" width="26" height="12" rx="2" transform="rotate(-6 31 188)"/><rect x="54" y="192" width="20" height="10" rx="2" transform="rotate(5 64 197)"/><rect x="326" y="186" width="24" height="11" rx="2" transform="rotate(4 338 191)"/><rect x="360" y="196" width="18" height="9" rx="2" transform="rotate(-5 369 200)"/></g>` +
    `<g fill="#8a8472"><path d="M20,189h24v4h-24zM56,198h18v3h-18zM328,192h22v4h-22z"/></g>` +
    // 立てられた小さな石の標(慰霊)。旗も人も出さない
    `<path d="M100,204v-26a6,6 0 0 1 12,0v26z" fill="#b8b2a0"/>` +
    `<path d="M100,204v-26a6,6 0 0 1 12,0v26z" fill="none" stroke="#9a9484" stroke-width="1.2"/>` +
    shade(106, 205, 12, 3, ".14") +
    `<g fill="#e8443f"><circle cx="124" cy="200" r="2.6"/><circle cx="130" cy="203" r="2.2"/></g>` +
    `<g stroke="#5f8f4a" stroke-width="1.2" fill="none"><path d="M124,203v5M130,205v3"/></g>`,

  /** 雲仙。硫黄の噴気地帯。いまは国立公園で、木道が渡してある。 */
  volcanicpark:
    sky("#9ab4c4", "#dcdcd0", 104) +
    // 噴気が谷を埋める
    plume(60, 96, 1.3, "#e8e6de", ".65") +
    plume(300, 92, 1.5, "#e8e6de", ".6") +
    `<path d="M0,110L52,58l44,34l52,-26l50,40l60,-32l142,36z" fill="#6f6a62"/>` +
    ground(104, "#8a8478") +
    `<g fill="#3f5a3c">${[16, 48, 88, 128, 300, 340, 376].map((x, i) => `<path d="M${x},108l-6,-${16 + (i % 3) * 5}l6,-3l6,${3 + (i % 3) * 2}z"/>`).join("")}</g>` +
    // 硫黄で黄ばんだ地面
    ground(112, "#a8a084") +
    `<g fill="#c4b45c" opacity=".85"><ellipse cx="70" cy="146" rx="66" ry="20"/><ellipse cx="316" cy="150" rx="72" ry="22"/><ellipse cx="200" cy="176" rx="90" ry="22"/></g>` +
    `<g fill="#d8c86c" opacity=".8"><ellipse cx="60" cy="142" rx="34" ry="10"/><ellipse cx="326" cy="146" rx="38" ry="11"/></g>` +
    // 沸き立つ湯だまり
    `<g fill="#8a8a72"><ellipse cx="56" cy="150" rx="30" ry="11"/><ellipse cx="330" cy="154" rx="34" ry="12"/></g>` +
    `<g fill="#b8b49a"><ellipse cx="56" cy="149" rx="24" ry="8"/><ellipse cx="330" cy="153" rx="27" ry="9"/></g>` +
    `<g fill="#e2ddd0"><circle cx="46" cy="148" r="4"/><circle cx="60" cy="151" r="3"/><circle cx="68" cy="146" r="2.6"/><circle cx="320" cy="152" r="4.4"/><circle cx="336" cy="155" r="3.4"/><circle cx="344" cy="150" r="2.6"/></g>` +
    plume(56, 142, 0.6, "#f0eee6", ".8") +
    plume(330, 146, 0.7, "#f0eee6", ".75") +
    // 白く変質した岩
    `<g fill="#cfc8b4"><path d="M12,168q14,-16 30,-4l4,10H14z"/><path d="M356,172q14,-14 30,-2l4,8h-36z"/></g>` +
    // 木道(手前を横切る)
    ground(184, "#9a9280") +
    `<g fill="#a8763c"><path d="M0,188h400v10H0z"/></g>` +
    `<g fill="#c9a05c">${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => `<rect x="${r1(2 + i * 25)}" y="188" width="21" height="10"/>`).join("")}</g>` +
    `<g fill="#8a6a44"><rect x="0" y="198" width="400" height="4"/></g>` +
    `<g fill="#8a6a44"><rect x="30" y="198" width="5" height="12"/><rect x="150" y="198" width="5" height="12"/><rect x="270" y="198" width="5" height="12"/><rect x="360" y="198" width="5" height="12"/></g>` +
    // 手すり
    `<g stroke="#8a6a44" stroke-width="3" fill="none"><path d="M0,180h400"/></g>` +
    `<g fill="#8a6a44"><rect x="20" y="180" width="4" height="10"/><rect x="110" y="180" width="4" height="10"/><rect x="290" y="180" width="4" height="10"/><rect x="380" y="180" width="4" height="10"/></g>`,

  /** 五島。**隠れるために移り住んだ島**。断崖と段々畑、斜面に小さな教会。 */
  hiddenvillage:
    sky("#8fc4e8", "#dbe6ec", 96) +
    clouds(300, 26, 1, "#f6efe2", ".65") +
    `<g stroke="#4a4436" stroke-width="1.4" opacity=".7" fill="none"><path d="M60,34q4,-4 8,0q4,-4 8,0"/></g>` +
    // 沖の島影
    `<path d="M254,96q22,-14 46,-12q26,2 44,12z" fill="#6b7f74"/>` +
    band(96, 18, "#2f7396") +
    band(112, 16, "#3b83a6") +
    ripples(102, "#bfe0f0") +
    // 断崖(左)。海に落ちる
    `<path d="M0,128V52q30,-8 58,4q22,10 30,30l10,42z" fill="#7f7a68"/>` +
    `<path d="M0,128V52q30,-8 58,4l-14,10q-20,-6 -44,4z" fill="#948f7c"/>` +
    `<g stroke="#6b6656" stroke-width="1.2" opacity=".7" fill="none"><path d="M8,74h40M4,90h34M46,84h22M12,106h40"/></g>` +
    `<g fill="#4f6b4a"><ellipse cx="24" cy="50" rx="20" ry="6"/><ellipse cx="56" cy="56" rx="16" ry="5"/></g>` +
    // 波が崖を叩く
    `<path d="M84,126q14,-8 26,0t26,4v6H84z" fill="#dfeef2" opacity=".8"/>` +
    // 段々畑(痩せた斜面を切り開いた)
    ground(128, "#7f8a5c") +
    terraces(128, 5, 13, "#77a84f", "#4f7f3a", "#b8ae94") +
    // 小さな教会(右の斜面。**窓が3つだけ**)
    `<rect x="290" y="112" width="60" height="40" fill="#efe8d8"/>` +
    `<path d="M284,112h72l-36,-20z" fill="#8a5548"/>` +
    `<rect x="304" y="86" width="16" height="26" fill="#efe8d8"/>` +
    `<path d="M300,86h24l-12,-12z" fill="#8a5548"/>` +
    `<g fill="#8a8272"><rect x="311" y="64" width="2.4" height="10"/><rect x="307.6" y="67" width="9.2" height="2.4"/></g>` +
    archWindows(294, 122, 52, 20, 3, "#3f5566", "#c9c0ac") +
    `<rect x="310" y="140" width="14" height="12" fill="#5a4630"/>` +
    shade(320, 153, 34, 4, ".14") +
    // 石垣で支えた畑と、麦の畝
    ground(166, "#6f9f52") +
    stoneWall(0, 166, 400, 10, "#a89e88") +
    ground(176, "#5f8f46") +
    furrows(184, 3, 10, "#4f7f3a", ".6") +
    `<g stroke="#8aa85c" stroke-width="1.6" stroke-linecap="round" fill="none">${[14, 40, 66, 92, 118, 282, 308, 334, 360, 386]
      .map((x, i) => `<path d="M${x},${r1(206 - (i % 2) * 8)}v-12"/>`)
      .join("")}</g>` +
    // 畑を打つ人
    shade(150, 200, 11, 3, ".16") +
    person(149, 200, 22, "#8a6a44") +
    arm(149, 188, 13, -6) +
    `<path d="M162,182l10,-6" stroke="#6b5330" stroke-width="2.4" fill="none"/>` +
    `<path d="M172,176l6,4l-4,4z" fill="#8a8272"/>`,

  /** 諫早。海を農地に変えた潮受け堤防と、47枚の鋼板の水門。 */
  reclaimedflats:
    sky("#8fc4e8", "#d8e2e6", 100) +
    clouds(80, 26, 1, "#f6efe2", ".7") +
    hills(102, "#6b8060", 4, 20) +
    // 締め切られた側の海
    band(100, 20, "#3179a0") +
    `<g stroke="#bfe0f0" stroke-width="1.8" opacity=".5" fill="none"><path d="M20,106h70M280,110h90"/></g>` +
    // 全長7kmの堤防が水平に画面を横切る
    `<rect x="0" y="120" width="400" height="12" fill="#b0a894"/>` +
    `<rect x="0" y="120" width="400" height="3" fill="#c4bda8"/>` +
    `<rect x="0" y="129" width="400" height="3" fill="#948f7c"/>` +
    `<g stroke="#9a9484" stroke-width="1" fill="none">${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
      .map((i) => `<path d="M${r1(12 + i * 25)},120v9"/>`)
      .join("")}</g>` +
    // 水門(鋼板がずらりと落とされている)
    `<g fill="#6b7480"><rect x="0" y="104" width="6" height="28"/>${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => `<rect x="${r1(6 + i * 33)}" y="104" width="6" height="28"/>`).join("")}</g>` +
    `<g fill="#4a5158">${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => `<rect x="${r1(12 + i * 33)}" y="110" width="27" height="20"/>`).join("")}</g>` +
    `<g fill="#5f6a74">${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => `<rect x="${r1(12 + i * 33)}" y="110" width="27" height="3"/>`).join("")}</g>` +
    `<rect x="0" y="98" width="400" height="7" fill="#8a939c"/>` +
    `<rect x="0" y="96" width="400" height="3" fill="#a5aab0"/>` +
    // 干拓地(堤防の内側)の農地
    ground(132, "#7f9a5c") +
    ground(146, "#6f9f52") +
    furrows(154, 5, 11, "#4f8f3f", ".5") +
    // 用水路
    `<rect x="0" y="176" width="400" height="10" fill="#4f8fa8"/>` +
    `<rect x="0" y="176" width="400" height="2.4" fill="#a8d8e8" opacity=".6"/>` +
    `<g fill="#8a9070"><rect x="0" y="172" width="400" height="4"/><rect x="0" y="186" width="400" height="4"/></g>` +
    ground(190, "#5f8f46") +
    furrows(196, 2, 9, "#4f7f3a", ".55") +
    // 干潟に残された漁具(争いの両側)。左に杭と網、右に畑の苗
    `<g stroke="#6b5330" stroke-width="2.4" fill="none"><path d="M22,190v-16M40,192v-14M58,190v-18"/></g>` +
    `<g stroke="#8a8272" stroke-width="1" opacity=".8" fill="none"><path d="M22,178h36M22,184h36M40,174v14"/></g>` +
    `<g fill="#4f8f3f">${[300, 322, 344, 366, 388].map((x) => `<path d="M${x},200q-5,-12 0,-16q5,4 0,16z"/>`).join("")}</g>` +
    `<g fill="#5f9f4a">${[300, 322, 344, 366, 388].map((x) => `<path d="M${x},200q-9,-8 -6,-12q6,2 6,12z"/>`).join("")}</g>`,

  /** 熊本。足場と、番号を振って積み直す石材。完了は2050年代。 */
  rebuildingcastle:
    sky("#8fc4e8", "#dfe6e6", 118) +
    clouds(320, 26, 0.9, "#f6efe2", ".7") +
    hills(120, "#6b8060", 4, 24) +
    ground(118, "#8f9478") +
    // 天守(足場に半分包まれている)
    `<g fill="#3f4852">` +
    `<path d="M150,64h100l-10,-14h-80z"/>` +
    `<path d="M140,92h120l-12,-16h-96z"/>` +
    `<path d="M128,124h144l-14,-18h-116z"/>` +
    `</g>` +
    `<g fill="#efe8d8"><rect x="160" y="64" width="80" height="12"/><rect x="148" y="92" width="104" height="14"/></g>` +
    `<g fill="#2f3640"><rect x="160" y="50" width="80" height="4"/><rect x="176" y="40" width="48" height="10"/></g>` +
    `<g fill="#f5b31c"><path d="M192,40q8,-10 16,0z"/></g>` +
    windowGrid(164, 65, 72, 10, 4, 1, "#2f3640", "#c9c0ac") +
    windowGrid(152, 93, 96, 12, 5, 1, "#2f3640", "#c9c0ac") +
    // 反り返る石垣(三分の一が崩れている)
    `<path d="M120,168q14,-30 44,-38h72q30,8 44,38z" fill="#a5a08c"/>` +
    `<g stroke="#847f6c" stroke-width="1.2" fill="none"><path d="M128,152q22,-16 72,-16t72,16M124,160q26,-20 76,-20t76,20M134,144q20,-12 66,-12t66,12"/></g>` +
    `<g stroke="#847f6c" stroke-width="1" opacity=".8" fill="none"><path d="M150,168v-32M180,168v-36M220,168v-36M250,168v-32"/></g>` +
    `<path d="M262,168q4,-24 20,-32l16,32z" fill="#8f9478"/>` +
    // 足場(単管が組まれている)
    `<g stroke="#8a939c" stroke-width="2.4" fill="none"><path d="M112,168V56h180v112M112,56h180M112,84h180M112,112h180M112,140h180M152,56v112M212,56v112M262,56v112"/></g>` +
    `<g stroke="#f5b31c" stroke-width="1.6" fill="none"><path d="M112,70h180M112,98h180"/></g>` +
    // 番号を振って並べた石材(手前。左右に)
    ground(168, "#9a9280") +
    `<g fill="#b0a894">${[10, 46, 82, 300, 336, 372].map((x) => `<rect x="${x}" y="178" width="30" height="20" rx="2"/>`).join("")}</g>` +
    `<g fill="#c4bda8">${[10, 46, 82, 300, 336, 372].map((x) => `<rect x="${x}" y="178" width="30" height="4"/>`).join("")}</g>` +
    `<g fill="#efe8d8">${[10, 46, 82, 300, 336, 372].map((x) => `<rect x="${r1(x + 6)}" y="184" width="12" height="9"/>`).join("")}</g>` +
    `<g fill="#c2453c">${[10, 46, 82, 300, 336, 372].map((x) => `<rect x="${r1(x + 8)}" y="187" width="8" height="2.4"/>`).join("")}</g>` +
    `<g fill="#000" opacity=".14">${[10, 46, 82, 300, 336, 372].map((x) => `<ellipse cx="${r1(x + 15)}" cy="199" rx="17" ry="3.4"/>`).join("")}</g>` +
    // 記録する人
    shade(132, 202, 11, 3, ".16") +
    person(131, 202, 22, "#4a5a66") +
    arm(131, 190, 12, 2) +
    `<rect x="140" y="188" width="12" height="9" fill="#efe8d8"/>` +
    // ロープを引く滑車
    `<g stroke="#6b5330" stroke-width="2" fill="none"><path d="M172,168v34"/></g>` +
    `<circle cx="172" cy="166" r="4" fill="#5f584c"/>`,

  /** 水俣。工場の排水口がある入江。**この湾の名を負った病**。 */
  chemicaltown:
    sky("#8a9aa8", "#c4c8c0", 116) +
    clouds(70, 26, 1, "#d8dad2", ".6") +
    hills(118, "#5a6b58", 4, 26) +
    ground(116, "#7f8478") +
    // 化学工場(左〜中)。配管と煙突
    chimney(30, 130, 84, 11, "#a89c88") +
    chimney(60, 130, 66, 9, "#a89c88") +
    plume(30, 46, 1, "#c0c2ba", ".5") +
    `<rect x="6" y="106" width="122" height="24" fill="#8a8f8c"/>` +
    `<path d="M2,106h130l-10,-10H12z" fill="#5f666e"/>` +
    windowGrid(10, 110, 114, 16, 8, 1, "#4a5158", "#a0a49f") +
    `<g fill="#9aa0a4"><rect x="84" y="80" width="16" height="26" rx="7"/><rect x="104" y="86" width="14" height="20" rx="6"/></g>` +
    `<g stroke="#7f858c" stroke-width="3" fill="none"><path d="M92,80v-8h34v34M111,86v-6"/></g>` +
    // 配管が海へ下りていく(排水口)
    `<g stroke="#8a8f94" stroke-width="6" fill="none"><path d="M0,140h150l14,10h30"/></g>` +
    `<g stroke="#6b7076" stroke-width="1.6" fill="none"><path d="M40,136v8M80,136v8M120,136v8"/></g>` +
    ground(130, "#6f7468") +
    // 排水口の開口部
    `<path d="M186,150h34v18h-34z" fill="#5f666e"/>` +
    `<path d="M190,154h26v14h-26z" fill="#2f3640"/>` +
    // 護岸と入江の水
    stoneWall(0, 150, 186, 18, "#8f8a78") +
    stoneWall(220, 150, 180, 18, "#8f8a78") +
    band(168, 20, "#3f6b78") +
    band(184, 26, "#4a7684") +
    `<g stroke="#8fb8c0" stroke-width="1.8" opacity=".5" fill="none"><path d="M20,176h60M240,180h80M60,196h70M280,198h90"/></g>` +
    // 排水口から広がる筋
    `<g fill="#7f8a7c" opacity=".45"><ellipse cx="203" cy="176" rx="40" ry="8"/><ellipse cx="203" cy="188" rx="64" ry="10"/></g>` +
    // 岸に舫った漁船(操業できなくなった側)
    boat(70, 190, 0.9, "#e2ddd0", "#4a7f9a") +
    `<g stroke="#6b5330" stroke-width="1.6" fill="none"><path d="M46,186L20,168"/></g>` +
    // 積まれた網
    `<g fill="#7f7a6c"><ellipse cx="330" cy="200" rx="30" ry="8"/></g>` +
    `<g stroke="#5f5a4c" stroke-width="1" opacity=".8" fill="none"><path d="M304,198h52M306,203h48M318,194v12M342,194v12"/></g>`,

  /** 農地の広がる町(八代・都城・出水)。水路と、刈田と、遠くの山。 */
  farmtown:
    sky("#8fc4e8", "#dfe8dc", 112) +
    sun(64, 32, 15, "#f8e0a0") +
    clouds(300, 28, 1, "#f6efe2", ".7") +
    ridge(114, 44, "#5f7f5a", 2) +
    `<path d="M0,114q60,-24 132,-14q70,10 136,8q66,-2 132,6z" fill="#6f8f5c"/>` +
    ground(112, "#7f9a5c") +
    // 集落(奥)
    machiya(300, 92, 44, 118, "#efe8d8", "#55606b") +
    machiya(350, 96, 38, 118, "#e6dfcd", "#55606b") +
    machiya(14, 96, 40, 118, "#efe8d8", "#55606b") +
    roundTree(78, 118, 13, "#3f7f4a") +
    roundTree(276, 118, 11, "#4a8a52") +
    // 田(奥から手前へ、畝が太くなる)
    ground(118, "#6f9f52") +
    furrows(124, 3, 8, "#4f8f3f", ".5") +
    `<rect x="0" y="146" width="400" height="4" fill="#a89e88"/>` +
    ground(150, "#5f9a46") +
    furrows(156, 3, 10, "#4a8a3a", ".55") +
    // 用水路(手前を横切る)
    `<g fill="#a89e88"><rect x="0" y="178" width="400" height="5"/><rect x="0" y="194" width="400" height="5"/></g>` +
    `<rect x="0" y="183" width="400" height="11" fill="#4f8fa8"/>` +
    `<g stroke="#a8d8e8" stroke-width="1.6" opacity=".6" fill="none"><path d="M20,187h64M180,190h90M300,186h80"/></g>` +
    ground(199, "#5f9a46") +
    // 手前の稲(左右)
    `<g fill="#7fb44c">${[8, 26, 44, 62, 80, 320, 338, 356, 374, 392].map((x, i) => `<path d="M${x},210v${r1(-12 - (i % 3) * 4)}"/>`).join("")}</g>` +
    `<g stroke="#7fb44c" stroke-width="2" stroke-linecap="round" fill="none">${[8, 26, 44, 62, 80, 320, 338, 356, 374, 392]
      .map((x, i) => `<path d="M${x},208v${r1(-10 - (i % 3) * 4)}M${x},208l${r1(-5 - (i % 2) * 2)},${r1(-8 - (i % 3) * 3)}M${x},208l${r1(5 + (i % 2) * 2)},${r1(-8 - (i % 3) * 3)}"/>`)
      .join("")}</g>` +
    // 案山子と、畦を歩く人
    `<g stroke="#8a6a44" stroke-width="2.6" fill="none"><path d="M130,178v-30M116,158h28"/></g>` +
    `<path d="M120,150h20v14h-20z" fill="#c2453c"/>` +
    `<circle cx="130" cy="144" r="6" fill="#e8dfc0"/>` +
    `<path d="M120,142h20l-10,-6z" fill="#a8763c"/>` +
    shade(356, 176, 11, 3, ".16") +
    person(355, 176, 20, "#5b8fe8") +
    `<path d="M348,159q7,-5 14,0z" fill="#d8c48c"/>`,

  /** 人吉。戦災を免れ、江戸期の町並みが残った山あいの盆地。球磨川が抜ける。 */
  valleytown:
    sky("#8fc4e8", "#dde6e0", 108) +
    clouds(90, 24, 0.9, "#f6efe2", ".65") +
    // 盆地を囲む山(V字に開ける)
    `<path d="M0,120L64,32l58,58l30,-18l38,44z" fill="#4f6b4a"/>` +
    `<path d="M400,120L336,36l-56,54l-28,-16l-40,42z" fill="#4f6b4a"/>` +
    `<path d="M0,120L64,32l30,30l-52,58z" fill="#5f7f56" opacity=".7"/>` +
    `<g fill="#3f5a3c">${[20, 54, 92, 300, 340, 376].map((x, i) => `<path d="M${x},118l-6,-${16 + (i % 3) * 5}l6,-3l6,${3 + (i % 3) * 2}z"/>`).join("")}</g>` +
    ground(108, "#6f8a5c") +
    ground(120, "#8f9478") +
    // 町並み(左右に振り分ける)
    machiya(4, 128, 46, 164, "#efe8d8", "#55606b") +
    machiya(56, 132, 40, 164, "#e6dfcd", "#55606b") +
    kura(104, 126, 34, 164, "#f2ede0") +
    machiya(300, 130, 44, 164, "#efe8d8", "#55606b") +
    machiya(350, 126, 46, 164, "#e6dfcd", "#55606b") +
    // 城の石垣(中景。武者返しではない布積み)
    stoneWall(160, 140, 88, 24, "#a5a08c") +
    `<rect x="176" y="126" width="56" height="14" fill="#efe8d8"/>` +
    `<path d="M170,126h68l-8,-10h-52z" fill="#4a545e"/>` +
    // 球磨川(手前)。速い
    ground(164, "#8f8878") +
    band(172, 14, "#4f8fa8") +
    band(186, 12, "#4586a0") +
    ground(198, "#5f9ab0") +
    `<g stroke="#c4e6f0" stroke-width="2" opacity=".7" fill="none"><path d="M10,178q30,-5 60,0t60,2M240,182q30,-5 60,0t60,2M60,196q40,-5 80,0M260,200q40,-5 80,0"/></g>` +
    // 橋(左右の岸をつなぐ)
    `<path d="M0,172q100,-18 200,-16t200,14v6q-100,-16 -200,-14T0,178z" fill="#8a6a44"/>` +
    `<g fill="#6b5330"><rect x="60" y="176" width="5" height="20"/><rect x="200" y="172" width="5" height="24"/><rect x="330" y="176" width="5" height="20"/></g>` +
    `<g stroke="#a8763c" stroke-width="2" fill="none"><path d="M0,164q100,-18 200,-16t200,14"/></g>` +
    `<g fill="#a8763c"><rect x="60" y="160" width="4" height="8"/><rect x="140" y="156" width="4" height="8"/><rect x="260" y="156" width="4" height="8"/><rect x="340" y="160" width="4" height="8"/></g>`,

  /** 阿蘇。カルデラの内側に広がる牧草地。外輪山がぐるりと囲む。 */
  calderafarm:
    sky("#8fc4e8", "#dfe8dc", 96) +
    clouds(300, 26, 1, "#f6efe2", ".7") +
    // 外輪山(奥で弧を描いて閉じる)
    `<path d="M0,110q60,-46 140,-48q30,-1 60,2q80,-2 140,44q34,-2 60,2v14H0z" fill="#5f7f5a"/>` +
    `<path d="M0,110q60,-46 140,-48q30,-1 60,2q80,-2 140,44" stroke="#4f6b4a" stroke-width="3" fill="none"/>` +
    // 中央火口丘(小さく、噴煙は細く)
    plume(216, 76, 0.55, "#c8c4bc", ".55") +
    `<path d="M180,110L216,74l14,14l12,-8l30,30z" fill="#6f6a5c"/>` +
    `<path d="M216,74l14,14l-12,2l-8,-8z" fill="#8a8272"/>` +
    ground(96, "#6f8f5c") +
    ground(110, "#7f9f58") +
    // カルデラの底の集落と道
    machiya(12, 116, 40, 142, "#efe8d8", "#55606b") +
    machiya(58, 120, 34, 142, "#e6dfcd", "#55606b") +
    machiya(320, 118, 38, 142, "#efe8d8", "#55606b") +
    `<path d="M0,150q100,-10 200,-6t200,10v8q-100,-14 -200,-18T0,158z" fill="#b0a894"/>` +
    // 牧草地(手前)
    ground(158, "#6f9f52") +
    `<g stroke="#5f8f42" stroke-width="2.2" opacity=".55" fill="none"><path d="M0,172q100,-8 200,0t200,-2M0,190q100,-8 200,0t200,-2"/></g>` +
    // 野焼きのあとの黒い帯(左奥)と、その先の新しい緑
    `<path d="M0,142q60,-6 120,2t100,-2v10q-50,8 -110,0T0,152z" fill="#4a4438" opacity=".8"/>` +
    `<g stroke="#5f584c" stroke-width="1.4" opacity=".7" fill="none"><path d="M20,150v-6M60,152v-6M100,152v-6M140,150v-6M180,148v-6"/></g>` +
    // あか牛(赤牛)を右手前と左手前に
    shade(66, 200, 24, 5, ".16") +
    `<g fill="#b06a3c"><ellipse cx="66" cy="188" rx="24" ry="12"/><path d="M44,190h5v10h-5zM56,192h5v8h-5zM72,192h5v8h-5zM84,190h5v10h-5z"/></g>` +
    `<g fill="#9a5730"><ellipse cx="90" cy="178" rx="10" ry="8"/></g>` +
    `<g fill="#efe8d8"><path d="M96,172q6,-4 8,2q-5,2 -8,-2z"/><path d="M84,172q-6,-4 -8,2q5,2 8,-2z"/></g>` +
    `<circle cx="94" cy="178" r="1.6" fill="#2f2a24"/>` +
    shade(316, 204, 20, 4, ".16") +
    `<g fill="#b06a3c"><ellipse cx="316" cy="194" rx="20" ry="10"/><path d="M300,196h4v8h-4zM310,197h4v7h-4zM322,197h4v7h-4zM332,196h4v8h-4z"/></g>` +
    `<g fill="#9a5730"><ellipse cx="336" cy="186" rx="8.4" ry="6.6"/></g>` +
    `<g fill="#efe8d8"><path d="M341,181q5,-3 6.6,1.6q-4,1.6 -6.6,-1.6z"/></g>` +
    `<circle cx="339" cy="186" r="1.4" fill="#2f2a24"/>` +
    // 牧柵
    `<g stroke="#8a6a44" stroke-width="2" fill="none"><path d="M0,178h400M0,186h400"/></g>` +
    `<g fill="#6b5330"><rect x="18" y="172" width="4" height="20"/><rect x="132" y="172" width="4" height="20"/><rect x="246" y="172" width="4" height="20"/><rect x="368" y="172" width="4" height="20"/></g>`,

  /** 天草。橋の連なる入江の漁村。踏み絵の場の上に立つ教会も見える。 */
  fishingvillage:
    sky("#8fc4e8", "#d8e6ee", 104) +
    clouds(76, 24, 0.9, "#f6efe2", ".65") +
    `<g stroke="#4a4436" stroke-width="1.4" opacity=".7" fill="none"><path d="M300,34q4,-4 8,0q4,-4 8,0M334,46q3.4,-3.4 6.8,0q3.4,-3.4 6.8,0"/></g>` +
    // 島影と、島をつなぐ橋の連なり(奥)
    `<path d="M0,104q34,-26 74,-22q40,4 60,22z" fill="#5f7f56"/>` +
    `<path d="M152,104q30,-22 66,-18q36,4 54,18z" fill="#6b8a5f"/>` +
    `<path d="M290,104q28,-20 60,-16q34,4 50,16z" fill="#5f7f56"/>` +
    `<g stroke="#c4c8cc" stroke-width="3" fill="none"><path d="M110,96q22,-16 44,0M228,94q22,-16 44,0M334,96q22,-16 44,0"/></g>` +
    `<g fill="#aeb4b8"><rect x="106" y="96" width="52" height="3.4"/><rect x="224" y="94" width="52" height="3.4"/><rect x="330" y="96" width="52" height="3.4"/></g>` +
    `<g fill="#c4c8cc"><rect x="130" y="80" width="4" height="16"/><rect x="248" y="78" width="4" height="16"/><rect x="354" y="80" width="4" height="16"/></g>` +
    // 海
    band(104, 20, "#2f7396") +
    band(120, 18, "#3b83a6") +
    ripples(110, "#bfe0f0") +
    // 集落(斜面に瓦屋根)。教会は右の斜面に
    ground(138, "#7f8a6c") +
    machiya(4, 116, 40, 152, "#efe8d8", "#55606b") +
    machiya(50, 122, 34, 152, "#e6dfcd", "#55606b") +
    machiya(90, 126, 32, 152, "#efe8d8", "#55606b") +
    `<rect x="316" y="116" width="52" height="36" fill="#e2ddd0"/>` +
    `<path d="M310,116h64l-32,-16z" fill="#8a5548"/>` +
    `<rect x="330" y="94" width="14" height="22" fill="#e2ddd0"/>` +
    `<path d="M326,94h22l-11,-10z" fill="#8a5548"/>` +
    `<g fill="#8a8272"><rect x="336" y="76" width="2.2" height="8"/><rect x="333" y="78.4" width="8.4" height="2.2"/></g>` +
    archWindows(320, 124, 44, 18, 3, "#3f5566", "#c9c0ac") +
    `<rect x="334" y="140" width="12" height="12" fill="#5a4630"/>` +
    // 教会が建つ地面(踏み絵の場の真上)。石の枠だけ置く
    `<g fill="#a5a08c"><rect x="310" y="152" width="64" height="6"/></g>` +
    // 港の岸壁
    ground(152, "#8f8878") +
    stoneWall(0, 152, 400, 12, "#a5a08c") +
    ground(164, "#4a86a4") +
    `<g stroke="#a8d8e8" stroke-width="1.8" opacity=".5" fill="none"><path d="M20,176h64M280,180h90M100,196h70M300,200h80"/></g>` +
    // 舫った漁船2艘と、干した網
    boat(80, 186, 1.15) +
    shade(80, 194, 26, 4, ".14") +
    boat(300, 196, 0.95, "#e6dfcd", "#c2453c") +
    `<g stroke="#6b5330" stroke-width="1.6" fill="none"><path d="M56,180L24,164M276,190L246,166"/></g>` +
    `<g fill="#8a6a44"><rect x="176" y="158" width="4" height="20"/><rect x="230" y="158" width="4" height="20"/></g>` +
    `<g stroke="#8a8272" stroke-width="1" opacity=".85" fill="none"><path d="M178,164h52M178,170h52M190,162v14M204,162v14M218,162v14"/></g>` +
    // 浮き玉
    `<g fill="#e8443f"><circle cx="150" cy="176" r="5"/><circle cx="162" cy="180" r="4"/></g>` +
    `<g fill="#f5b31c"><circle cx="156" cy="184" r="4.4"/></g>`,

  /** 大分。旧藩の城下町に、四百年前に建った洋風の病棟。 */
  domaincapital:
    sky("#8fc4e8", "#dde6e4", 112) +
    sun(330, 34, 15, "#f8e0a0") +
    clouds(80, 26, 1, "#f6efe2", ".7") +
    hills(114, "#6b8060", 4, 26) +
    ground(112, "#8f9478") +
    // 城の櫓と石垣(中景。中央は駒に隠れるので低く)
    stoneWall(150, 124, 100, 20, "#a5a08c") +
    `<rect x="170" y="106" width="60" height="18" fill="#efe8d8"/>` +
    `<path d="M164,106h72l-10,-12h-52z" fill="#4a545e"/>` +
    windowGrid(174, 110, 52, 12, 3, 1, "#2f3640", "#c9c0ac") +
    // 洋風の病棟(左。下見板と十字、アーチの入口)
    `<rect x="10" y="94" width="118" height="62" fill="#f2ede0"/>` +
    `<path d="M4,94h130l-14,-18H18z" fill="#7a4438"/>` +
    `<g stroke="#d8d0bc" stroke-width="1.2" fill="none"><path d="M10,104h118M10,114h118M10,124h118M10,134h118M10,144h118"/></g>` +
    `<rect x="52" y="60" width="34" height="16" fill="#f2ede0"/>` +
    `<path d="M46,60h46l-23,-14z" fill="#7a4438"/>` +
    `<g fill="#c2453c"><rect x="67.6" y="34" width="2.8" height="12"/><rect x="63" y="38" width="12" height="2.8"/></g>` +
    archWindows(14, 100, 110, 24, 5, "#3f5566", "#c9c0ac") +
    archWindows(46, 132, 46, 24, 2, "#5a4630", "#c9c0ac") +
    `<rect x="6" y="152" width="126" height="5" fill="#c9c0ac"/>` +
    // 病棟の前の階段(**身分を問わず開いた入口**)
    `<g fill="#b0a894"><rect x="48" y="157" width="44" height="6"/><rect x="44" y="163" width="52" height="6"/><rect x="40" y="169" width="60" height="6"/></g>` +
    shade(70, 176, 32, 4, ".14") +
    // 城下の町並み(右)
    machiya(300, 122, 44, 158, "#efe8d8", "#55606b") +
    machiya(350, 126, 44, 158, "#e6dfcd", "#55606b") +
    // 通り
    ground(156, "#9a9280") +
    ground(176, "#8a8272") +
    `<g stroke="#7f7869" stroke-width="1.4" opacity=".65" fill="none"><path d="M0,186h400M0,198h400M0,208h400M60,176v34M160,176v34M260,176v34M350,176v34"/></g>` +
    pine(146, 176, 34) +
    pine(268, 178, 28) +
    // 順番を待つ人が並ぶ(身分の違う服の色で3人)
    shade(114, 196, 10, 3, ".16") +
    person(113, 196, 21, "#4a5a8a") +
    shade(136, 200, 10, 3, ".16") +
    person(135, 200, 20, "#8a6a44") +
    shade(158, 204, 10, 3, ".16") +
    person(157, 204, 22, "#efe8d8") +
    arm(157, 192, 11, 4),

  /** 日田。天領の商家町。材木商の白壁の蔵と水路、書物を運ぶ荷。 */
  merchanttown:
    sky("#8fc4e8", "#dfe4dc", 116) +
    clouds(310, 26, 0.9, "#f6efe2", ".65") +
    hills(118, "#5f7f5a", 4, 28) +
    ground(116, "#7f8a6c") +
    cedar(20, 124, 40) +
    cedar(48, 126, 32) +
    cedar(360, 124, 36) +
    cedar(386, 128, 28) +
    ground(126, "#9a9280") +
    // 蔵と町家が通りに沿って並ぶ
    kura(6, 108, 44, 162, "#f2ede0") +
    machiya(58, 116, 46, 162, "#efe8d8", "#55606b") +
    kura(116, 112, 38, 162, "#e8e2d4") +
    machiya(298, 114, 46, 162, "#efe8d8", "#55606b") +
    kura(354, 110, 42, 162, "#f2ede0") +
    // 軒下の暖簾と杉玉のかわりに、書物を積んだ荷車
    `<path d="M62,132h40v12H62z" fill="#3f5aa0"/>` +
    `<g fill="#efe8d8"><rect x="68" y="135" width="4" height="6"/><rect x="80" y="135" width="4" height="6"/><rect x="92" y="135" width="4" height="6"/></g>` +
    // 水路(町を貫く。日田は水の町)
    ground(162, "#9a9280") +
    `<g fill="#a89e88"><rect x="0" y="168" width="400" height="5"/><rect x="0" y="186" width="400" height="5"/></g>` +
    `<rect x="0" y="173" width="400" height="13" fill="#4f8fa8"/>` +
    `<g stroke="#a8d8e8" stroke-width="1.6" opacity=".6" fill="none"><path d="M20,178h64M180,181h90M300,177h80"/></g>` +
    `<g fill="#c2453c"><circle cx="120" cy="180" r="3.4"/><circle cx="136" cy="182" r="3"/></g>` +
    `<g fill="#f5b31c"><circle cx="128" cy="178" r="2.6"/></g>` +
    ground(191, "#8f8878") +
    `<g stroke="#7f7869" stroke-width="1.4" opacity=".65" fill="none"><path d="M0,200h400M0,208h400"/></g>` +
    // 材木を積んだ荷車(手前左)
    `<rect x="10" y="188" width="80" height="6" fill="#8a6a44"/>` +
    `<g fill="#c9a05c"><ellipse cx="20" cy="184" rx="6" ry="4"/><ellipse cx="34" cy="184" rx="6" ry="4"/><ellipse cx="48" cy="184" rx="6" ry="4"/><ellipse cx="62" cy="184" rx="6" ry="4"/><ellipse cx="76" cy="184" rx="6" ry="4"/><ellipse cx="27" cy="177" rx="6" ry="4"/><ellipse cx="41" cy="177" rx="6" ry="4"/><ellipse cx="55" cy="177" rx="6" ry="4"/><ellipse cx="69" cy="177" rx="6" ry="4"/></g>` +
    `<g fill="#a8763c"><circle cx="20" cy="184" r="2"/><circle cx="48" cy="184" r="2"/><circle cx="76" cy="184" r="2"/><circle cx="41" cy="177" r="2"/><circle cx="69" cy="177" r="2"/></g>` +
    `<circle cx="26" cy="198" r="7" fill="#6b5330"/>` +
    `<circle cx="74" cy="198" r="7" fill="#6b5330"/>` +
    `<g fill="#a8763c"><circle cx="26" cy="198" r="2.4"/><circle cx="74" cy="198" r="2.4"/></g>` +
    // 塾へ通う生徒(身分を問わない)。年格好の違う3人
    shade(300, 200, 10, 3, ".16") +
    person(299, 200, 24, "#4a5a8a") +
    arm(299, 187, 10, 5) +
    shade(322, 204, 9, 3, ".16") +
    person(321, 204, 18, "#8a6a44") +
    shade(342, 202, 10, 3, ".16") +
    person(341, 202, 21, "#5f8f6a") +
    `<g fill="#efe8d8"><rect x="306" y="190" width="12" height="8"/><rect x="346" y="192" width="11" height="7"/></g>`,

  /** 城下町(中津・飫肥)。石垣沿いの武家屋敷の並びと、門。 */
  castletown:
    sky("#8fc4e8", "#dfe6e0", 114) +
    clouds(88, 26, 1, "#f6efe2", ".7") +
    hills(116, "#5f7f5a", 4, 26) +
    ground(114, "#7f8a6c") +
    // 城の櫓(奥中央やや左)
    stoneWall(120, 96, 90, 22, "#a5a08c") +
    `<rect x="138" y="76" width="56" height="20" fill="#efe8d8"/>` +
    `<path d="M132,76h68l-10,-12h-48z" fill="#4a545e"/>` +
    `<rect x="150" y="58" width="32" height="18" fill="#efe8d8"/>` +
    `<path d="M144,58h44l-22,-12z" fill="#4a545e"/>` +
    windowGrid(142, 80, 48, 12, 3, 1, "#2f3640", "#c9c0ac") +
    ground(118, "#8f9478") +
    pine(240, 126, 40) +
    pine(276, 130, 30) +
    // 武家屋敷の並び(左右)。土塀と瓦の載った塀
    machiya(4, 128, 50, 164, "#efe8d8", "#55606b") +
    machiya(60, 132, 44, 164, "#e6dfcd", "#55606b") +
    machiya(300, 130, 46, 164, "#efe8d8", "#55606b") +
    machiya(352, 134, 44, 164, "#e6dfcd", "#55606b") +
    // 石垣の小道(手前を横切る。よそ者がどこまで近づけるかを定めた道)
    ground(164, "#9a9280") +
    stoneWall(0, 164, 400, 16, "#a5a08c") +
    `<rect x="0" y="160" width="400" height="5" fill="#5a636b"/>` +
    `<g fill="#4a545e">${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => `<rect x="${r1(4 + i * 25)}" y="157" width="18" height="4" rx="2"/>`).join("")}</g>` +
    // 閉じられた門(**この盤面の「窓」の裏返し**)。左に寄せる
    `<path d="M30,164V116h64v48z" fill="#5a4630"/>` +
    `<path d="M24,116h76l-10,-14H34z" fill="#4a545e"/>` +
    `<rect x="24" y="114" width="76" height="3.4" fill="#39424b"/>` +
    `<g fill="#3f3226"><rect x="36" y="124" width="24" height="40"/><rect x="64" y="124" width="24" height="40"/></g>` +
    `<g fill="#8a6a44"><circle cx="48" cy="144" r="3.4"/><circle cx="76" cy="144" r="3.4"/></g>` +
    `<g fill="#6b5330"><rect x="36" y="132" width="52" height="3"/><rect x="36" y="152" width="52" height="3"/></g>` +
    shade(62, 166, 34, 4, ".14") +
    ground(180, "#8f8878") +
    `<g stroke="#7f7869" stroke-width="1.4" opacity=".65" fill="none"><path d="M0,190h400M0,202h400M70,180v30M170,180v30M270,180v30M360,180v30"/></g>` +
    // 用水と、そこに射す木漏れ日
    `<rect x="0" y="184" width="400" height="6" fill="#4f8fa8" opacity=".85"/>` +
    // 通りを歩く2人
    shade(320, 200, 10, 3, ".16") +
    person(319, 200, 22, "#3f4852") +
    shade(344, 204, 10, 3, ".16") +
    person(343, 204, 20, "#8a6a44") +
    arm(343, 193, -10, 4),

  /** 延岡。川をせき止めたダムと導水管、その電気で回る工場と社宅の並び。 */
  companytown:
    sky("#8fc4e8", "#dbe4e4", 110) +
    clouds(86, 24, 0.9, "#f6efe2", ".65") +
    // 山(左)とダム
    `<path d="M0,120L58,40l52,50l38,-22l44,52z" fill="#4f6b4a"/>` +
    `<path d="M400,116L344,52l-46,44l-30,-16l-36,36z" fill="#5f7f56"/>` +
    `<g fill="#3f5a3c">${[16, 46, 84, 320, 356, 384].map((x, i) => `<path d="M${x},116l-6,-${15 + (i % 3) * 5}l6,-3l6,${3 + (i % 3) * 2}z"/>`).join("")}</g>` +
    // 貯水
    band(94, 22, "#3f7f9a") +
    `<g stroke="#a8d8e8" stroke-width="1.6" opacity=".5" fill="none"><path d="M30,100h50M290,104h70"/></g>` +
    // ダムの堤体(中央を横切る。低く)
    `<path d="M0,116h400v22H0z" fill="#b0a894"/>` +
    `<path d="M0,116h400v3H0z" fill="#c4bda8"/>` +
    `<g stroke="#9a9484" stroke-width="1" fill="none">${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => `<path d="M${r1(16 + i * 33)},119v19"/>`).join("")}</g>` +
    `<g fill="#8fbcd0"><rect x="60" y="122" width="26" height="16"/><rect x="300" y="122" width="26" height="16"/></g>` +
    ground(138, "#7f8a6c") +
    `<g fill="#dfeef2" opacity=".85"><path d="M60,138h26l4,14H56z"/><path d="M300,138h26l4,14h-34z"/></g>` +
    // 導水管(左の斜面を下る2本)。**地面より後に描く**
    `<g stroke="#7f8a94" stroke-width="9" fill="none"><path d="M14,140L52,186M42,140L80,186"/></g>` +
    `<g stroke="#5f6a74" stroke-width="1.6" fill="none"><path d="M20,148h28M28,158h28M36,168h28M44,178h28"/></g>` +
    // 発電所
    `<rect x="30" y="180" width="70" height="24" fill="#c9c0ac"/>` +
    `<path d="M26,180h78l-8,-10H34z" fill="#7a4438"/>` +
    windowGrid(34, 185, 62, 16, 4, 1, "#4a5a66", "#a89e88") +
    // 工場(右)
    `<g fill="#b0a894"><path d="M262,178v-30l16,-11v11l16,-11v11l16,-11v11l16,-11v11l16,-11v11l16,-11v30z"/></g>` +
    `<g fill="#7f7a6c"><path d="M262,148l16,-11v11zM294,148l16,-11v11zM326,148l16,-11v11zM358,148l16,-11v11z"/></g>` +
    windowGrid(266, 156, 128, 18, 8, 1, "#4a5a66", "#8f8a76") +
    chimney(250, 148, 66, 9, "#a89c88") +
    plume(250, 72, 0.8, "#c8c4bc", ".45") +
    // 社宅の並び(同じ形が繰り返す)。会社が建てた家
    `<g>${[0, 1, 2].map((i) => machiya(r1(116 + i * 58), 156, 44, 186, i % 2 ? "#e6dfcd" : "#efe8d8", "#55606b")).join("")}</g>` +
    ground(186, "#8a8272") +
    `<g stroke="#7f7869" stroke-width="1.4" opacity=".65" fill="none"><path d="M0,196h400M0,206h400"/></g>` +
    // 会社が建てた学校の門(手前右)
    `<g fill="#a5a08c"><rect x="316" y="180" width="7" height="26"/><rect x="372" y="180" width="7" height="26"/><rect x="312" y="176" width="71" height="6"/></g>` +
    `<g stroke="#8a939c" stroke-width="2" fill="none"><path d="M323,190h49M323,198h49M334,182v24M348,182v24M362,182v24"/></g>` +
    shade(296, 202, 10, 3, ".16") +
    person(295, 202, 21, "#4a5a8a"),

  /** 鹿児島。藩営の集成館。石造りの工場に洋式の機械が回っている。 */
  ironworks:
    sky("#8fc4e8", "#dde2dc", 108) +
    plume(340, 52, 1.1, "#c0bcb4", ".55") +
    // 遠くの桜島(小さく、右奥。主役にしない)
    `<path d="M282,108L340,50l16,16l14,-10l30,52z" fill="#6b7480" opacity=".85"/>` +
    `<path d="M0,108q60,-30 132,-24q72,6 118,24z" fill="#5f7f56"/>` +
    band(108, 14, "#3179a0") +
    `<g stroke="#bfe0f0" stroke-width="1.6" opacity=".5" fill="none"><path d="M30,113h60M280,115h80"/></g>` +
    ground(122, "#8f9478") +
    // 集成館(石造りの工場。低く長い。アーチ窓)
    `<rect x="10" y="80" width="150" height="62" fill="#cfc7b4"/>` +
    `<path d="M4,80h162l-16,-16H20z" fill="#4a545e"/>` +
    `<rect x="4" y="78" width="162" height="3.4" fill="#39424b"/>` +
    `<g stroke="#b8ae98" stroke-width="1.2" fill="none"><path d="M10,92h150M10,104h150M10,116h150M10,128h150"/></g>` +
    archWindows(14, 88, 142, 26, 6, "#3f5566", "#e2d8c4") +
    `<rect x="66" y="118" width="34" height="24" fill="#5a4630"/>` +
    `<g stroke="#8a6a44" stroke-width="1.4" fill="none"><path d="M76,118v24M86,118v24"/></g>` +
    chimney(184, 142, 74, 10, "#a89c88") +
    plume(184, 74, 0.7, "#c8c4bc", ".45") +
    // 洋式の機械(手前右)。歯車と調速機、ベルト
    ground(142, "#9a9280") +
    ground(164, "#8a8272") +
    `<g fill="#5f6a74"><rect x="286" y="156" width="100" height="10" rx="3"/></g>` +
    `<circle cx="312" cy="182" r="24" fill="#6b7480"/>` +
    `<circle cx="312" cy="182" r="18" fill="#8a939c"/>` +
    `<g fill="#5f6a74">${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
      const a = (i * Math.PI) / 4;
      return `<rect x="${r1(312 + Math.cos(a) * 22 - 3)}" y="${r1(182 + Math.sin(a) * 22 - 3)}" width="6" height="6"/>`;
    }).join("")}</g>` +
    `<circle cx="312" cy="182" r="5" fill="#3f4852"/>` +
    `<circle cx="368" cy="188" r="14" fill="#6b7480"/>` +
    `<circle cx="368" cy="188" r="9" fill="#8a939c"/>` +
    `<circle cx="368" cy="188" r="3.4" fill="#3f4852"/>` +
    `<g stroke="#3a3d42" stroke-width="3" fill="none"><path d="M312,158q28,-4 56,16M312,206q28,4 56,-4"/></g>` +
    `<g fill="#a5aab0"><rect x="336" y="140" width="4" height="20"/><circle cx="338" cy="138" r="3.4"/></g>` +
    `<g stroke="#a5aab0" stroke-width="1.6" fill="none"><path d="M338,140l-9,10M338,140l9,10"/></g>` +
    `<g fill="#5f6a74"><circle cx="329" cy="151" r="3.4"/><circle cx="347" cy="151" r="3.4"/></g>` +
    // 紡いだ綿の巻(左手前)
    `<g fill="#f2ede0"><rect x="14" y="176" width="16" height="28" rx="7"/><rect x="34" y="180" width="14" height="24" rx="6"/><rect x="52" y="178" width="15" height="26" rx="7"/></g>` +
    `<g stroke="#d8d0bc" stroke-width="1.2" fill="none"><path d="M14,186h16M14,196h16M34,190h14M52,188h15"/></g>` +
    shade(40, 206, 32, 4, ".14") +
    // 機械を見る人
    shade(104, 200, 11, 3, ".16") +
    person(103, 200, 22, "#3f4852") +
    arm(103, 188, 12, 2),

  /** 知覧。滑走路の跡と、灯籠の列。桜並木。静かに。 */
  airfieldmemorial:
    sky("#a8c4dc", "#e4dcd0", 118) +
    sun(70, 40, 16, "#f2d8a0") +
    `<g fill="#f8e8c8" opacity=".22"><circle cx="70" cy="40" r="30"/></g>` +
    clouds(300, 26, 1, "#f2ece0", ".6") +
    hills(120, "#6b7f60", 4, 24) +
    ground(118, "#8a9070") +
    // 桜並木(奥。ソメイヨシノの薄い桃色)
    `<g fill="#5f4a34">${[16, 56, 96, 300, 340, 380].map((x, i) => `<rect x="${r1(x - 2.6)}" y="${r1(92 - (i % 2) * 4)}" width="5.2" height="${r1(28 + (i % 2) * 4)}"/>`).join("")}</g>` +
    `<g stroke="#5f4a34" stroke-width="2.4" fill="none">${[16, 56, 96, 300, 340, 380].map((x, i) => `<path d="M${x},${r1(102 - (i % 2) * 4)}l-9,-8M${x},${r1(106 - (i % 2) * 4)}l9,-9"/>`).join("")}</g>` +
    `<g fill="#eec2d0">${[16, 56, 96, 300, 340, 380].map((x, i) => `<circle cx="${x}" cy="${r1(88 - (i % 2) * 6)}" r="${r1(15 + (i % 3) * 2)}"/>`).join("")}</g>` +
    `<g fill="#f8e2e8">${[16, 56, 96, 300, 340, 380].map((x, i) => `<circle cx="${r1(x - 6)}" cy="${r1(83 - (i % 2) * 6)}" r="${r1(8 + (i % 2) * 2)}"/>`).join("")}</g>` +
    // 記念館(中景右)。低い屋根
    `<rect x="286" y="126" width="106" height="26" fill="#e2ddd0"/>` +
    `<path d="M280,126h118l-14,-14h-90z" fill="#55606b"/>` +
    windowGrid(292, 132, 94, 16, 6, 1, "#3f5566", "#b8ae98") +
    // 滑走路の跡(手前へ伸びる。ひび割れた舗装に草)
    ground(152, "#8f9478") +
    `<path d="M120,152h160l90,58H30z" fill="#a5a09a"/>` +
    `<path d="M120,152h160l4,6H116z" fill="#b8b3ab"/>` +
    `<g stroke="#8f8a84" stroke-width="1.4" fill="none"><path d="M138,164h124M128,178h144M114,194h172"/></g>` +
    `<g stroke="#8f8a84" stroke-width="1.2" fill="none"><path d="M160,152L134,210M240,152L266,210M200,152v58"/></g>` +
    `<g fill="#efece4"><path d="M186,168h28v7h-28zM180,186h40v8h-40z"/></g>` +
    // 舗装の割れ目から出た草
    `<g stroke="#6f8a4c" stroke-width="1.6" stroke-linecap="round" fill="none"><path d="M150,192v-8M164,204v-9M252,196v-8M270,206v-9M206,200v-8"/></g>` +
    // 灯籠の列(左右に並ぶ。両側にあることで「列」になる)
    `<g>${[10, 46, 82, 306, 342, 378].map((x, i) => {
      const b = 190 - (i % 3) * 6;
      return (
        `<rect x="${r1(x - 6)}" y="${r1(b - 6)}" width="12" height="6" fill="#a09a8c"/>` +
        `<rect x="${r1(x - 4)}" y="${r1(b - 20)}" width="8" height="14" fill="#b0a99a"/>` +
        `<rect x="${r1(x - 8)}" y="${r1(b - 30)}" width="16" height="10" fill="#c4bdac"/>` +
        `<rect x="${r1(x - 5)}" y="${r1(b - 28)}" width="10" height="6" fill="#f5b31c"/>` +
        `<path d="M${r1(x - 11)},${r1(b - 30)}h22l-11,-8z" fill="#a09a8c"/>` +
        `<ellipse cx="${x}" cy="${b}" rx="13" ry="3.4" fill="#000" opacity=".14"/>`
      );
    }).join("")}</g>` +
    // 散る花びら(手前。少しだけ)
    `<g fill="#f2d2dc" opacity=".9"><ellipse cx="112" cy="176" rx="3.4" ry="2.2" transform="rotate(20 112 176)"/><ellipse cx="292" cy="182" rx="3.4" ry="2.2" transform="rotate(-30 292 182)"/><ellipse cx="130" cy="200" rx="3" ry="2" transform="rotate(40 130 200)"/><ellipse cx="276" cy="202" rx="3" ry="2" transform="rotate(-10 276 202)"/></g>`,

  /** 宗像。海沿いの神社と鳥居、沖に持ち出せない島。 */
  shrinecoast:
    sky("#8fc4e8", "#dbe8f0", 100) +
    clouds(94, 26, 1, "#f6efe2", ".7") +
    `<g stroke="#4a4436" stroke-width="1.6" opacity=".75" fill="none"><path d="M296,34q4,-4 8,0q4,-4 8,0M330,48q3.4,-3.4 6.8,0q3.4,-3.4 6.8,0"/></g>` +
    // 沖の島(遠く、小さく、近づけない)
    `<path d="M282,100q18,-20 40,-18q24,2 38,18z" fill="#4f6b52"/>` +
    `<path d="M292,96q12,-12 26,-11q16,1 24,11z" fill="#5f7f5a"/>` +
    band(100, 22, "#2a6b95") +
    band(118, 20, "#357ea4") +
    band(136, 24, "#3f8cb2") +
    `<g stroke="#bfe0f0" stroke-width="2.2" opacity=".55" fill="none"><path d="M20,108h56M280,110h84M10,126h44M300,128h80M60,144h60M290,146h84"/></g>` +
    // 波打ちぎわ
    `<path d="M0,150q40,8 84,0t92,4q46,-6 96,0t128,-4v10H0z" fill="#e2f0f4" opacity=".85"/>` +
    ground(158, "#e0cfa4") +
    `<path d="M0,162q56,-6 112,2q56,8 116,-2q54,-8 116,3q34,5 56,-2v12H0z" fill="#efe0b8" opacity=".85"/>` +
    // 海に立つ鳥居(左)
    torii(64, 150, 66, 62) +
    shade(64, 152, 34, 5, ".14") +
    `<g stroke="#dfeef2" stroke-width="2" opacity=".7" fill="none"><path d="M36,152q28,6 56,0"/></g>` +
    // 社殿(右手前)。檜皮葺きと千木
    ground(174, "#d8c48c") +
    `<rect x="288" y="150" width="96" height="24" fill="#e2ddd0"/>` +
    `<path d="M276,150h120l-18,-20h-84z" fill="#7a6a4c"/>` +
    `<rect x="276" y="148" width="120" height="3.4" fill="#5f5340"/>` +
    `<g stroke="#5f5340" stroke-width="2.4" fill="none"><path d="M320,130l-10,-12M352,130l10,-12"/></g>` +
    `<g fill="#c9a05c"><rect x="322" y="126" width="28" height="4"/><rect x="326" y="120" width="20" height="4"/></g>` +
    `<g fill="#c2453c"><rect x="296" y="156" width="10" height="18"/><rect x="366" y="156" width="10" height="18"/></g>` +
    `<rect x="320" y="156" width="32" height="18" fill="#5a4630"/>` +
    `<g fill="#efe8d8"><rect x="316" y="152" width="40" height="5"/></g>` +
    `<g fill="#b0a894"><rect x="284" y="174" width="104" height="6"/><rect x="290" y="180" width="92" height="6"/><rect x="296" y="186" width="80" height="6"/></g>` +
    shade(336, 194, 44, 5, ".14") +
    // 松と、注連縄を張った石(持ち出せない島への遥拝)
    pine(226, 176, 40) +
    pine(258, 180, 30) +
    `<g fill="#8f8a76"><path d="M150,206q-6,-24 12,-24t12,24z"/></g>` +
    `<g stroke="#efe8d8" stroke-width="3" fill="none"><path d="M146,190q16,-5 32,0"/></g>` +
    `<g fill="#efe8d8"><path d="M152,192l-3,8h6zM162,193l-3,8h6zM172,192l-3,8h6z"/></g>` +
    // 石灯籠を2基、参道の石畳
    `<g>${[112, 208].map((x) => {
      const b = x === 112 ? 196 : 202;
      return (
        `<rect x="${r1(x - 7)}" y="${r1(b - 6)}" width="14" height="6" fill="#a09a8c"/>` +
        `<rect x="${r1(x - 4.4)}" y="${r1(b - 22)}" width="8.8" height="16" fill="#b0a99a"/>` +
        `<rect x="${r1(x - 9)}" y="${r1(b - 33)}" width="18" height="11" fill="#c4bdac"/>` +
        `<rect x="${r1(x - 5.4)}" y="${r1(b - 31)}" width="10.8" height="7" fill="#f5b31c"/>` +
        `<path d="M${r1(x - 12)},${r1(b - 33)}h24l-12,-9z" fill="#a09a8c"/>` +
        `<ellipse cx="${x}" cy="${b}" rx="14" ry="3.6" fill="#000" opacity=".14"/>`
      );
    }).join("")}</g>` +
    `<g fill="#cfc7b4">${[24, 60, 96, 132, 250, 286, 322].map((x, i) => `<ellipse cx="${x}" cy="${r1(196 + (i % 2) * 8)}" rx="15" ry="5"/>`).join("")}</g>` +
    `<g fill="#dfd8c8">${[24, 60, 96, 132, 250, 286, 322].map((x, i) => `<ellipse cx="${r1(x - 2)}" cy="${r1(194.6 + (i % 2) * 8)}" rx="9" ry="3"/>`).join("")}</g>` +
    // 沖の島へ向かう小舟(近づけるのは神職だけ)
    boat(158, 130, 0.55, "#e6dfcd", "#8a6a44") +
    // 海鳥
    `<g stroke="#4a4436" stroke-width="1.6" fill="none" opacity=".8"><path d="M120,60q4,-4 8,0q4,-4 8,0M168,44q3.4,-3.4 6.8,0q3.4,-3.4 6.8,0"/></g>`,

  /** 種子島。鉄砲が着き、いまロケットが発つ島。南端の海岸の発射施設。 */
  spaceisland:
    sky("#7fb8dc", "#dce8f0", 98) +
    sun(52, 30, 15, "#f8e0a0") +
    clouds(300, 26, 1, "#f6efe2", ".65") +
    // 沖の水平線
    band(98, 20, "#2a6b95") +
    band(114, 18, "#3585ab") +
    band(130, 24, "#4590b4") +
    `<g stroke="#bfe0f0" stroke-width="2.2" opacity=".55" fill="none"><path d="M20,104h56M290,102h80M10,122h44M300,124h80"/></g>` +
    // 岬の岩(**ポルトガル人が流れ着いたのとほぼ同じ海岸**)
    `<path d="M0,144q22,-30 52,-24q26,6 34,24z" fill="#8a8272"/>` +
    `<path d="M0,144q22,-30 52,-24l-16,8q-20,-4 -36,8z" fill="#a09884"/>` +
    `<g stroke="#6f6a5e" stroke-width="1.2" opacity=".7" fill="none"><path d="M8,132h30M14,138h26"/></g>` +
    // 波打ちぎわ
    `<path d="M0,144q40,8 88,0t96,4q48,-6 100,0t116,-4v10H0z" fill="#e2f0f4" opacity=".85"/>` +
    ground(152, "#e8d6b0") +
    `<path d="M0,158q60,-6 120,2q60,8 124,-2q56,-8 120,3v12H0z" fill="#efe0b8" opacity=".85"/>` +
    // 発射台と整備塔(右。中央は駒に隠れる)
    `<g fill="#8a939c"><rect x="330" y="46" width="10" height="106"/><rect x="368" y="52" width="9" height="100"/></g>` +
    `<g stroke="#7f8a94" stroke-width="2" fill="none"><path d="M340,60h28M340,78h37M340,96h37M340,114h37M340,132h37M340,60l37,18M377,78l-37,18M340,96l37,18"/></g>` +
    `<rect x="318" y="146" width="72" height="10" fill="#6b7480"/>` +
    // ロケット(白い胴に赤い帯)
    `<path d="M348,152V70q0,-14 6,-22q6,8 6,22v82z" fill="#f2ede0"/>` +
    `<path d="M348,152V70q0,-14 6,-22v104z" fill="#dcd6c8"/>` +
    `<g fill="#c2453c"><rect x="348" y="92" width="12" height="6"/><rect x="348" y="122" width="12" height="6"/></g>` +
    `<g fill="#3f5aa0"><rect x="348" y="60" width="12" height="5"/></g>` +
    `<g fill="#8a939c"><path d="M348,152v-18l-8,18zM360,152v-18l8,18z"/></g>` +
    `<g fill="#e2ddd0"><rect x="336" y="112" width="9" height="40" rx="4"/><rect x="363" y="112" width="9" height="40" rx="4"/></g>` +
    shade(354, 156, 40, 5, ".14") +
    // 亜熱帯の植生(左手前)。ソテツ・アダン
    `<g stroke="#3f7f4a" stroke-width="3" stroke-linecap="round" fill="none"><path d="M40,204q-16,-14 -26,-14M40,204q-6,-20 -16,-26M40,204q4,-22 -2,-30M40,204q14,-18 26,-22M40,204q18,-8 30,-6"/></g>` +
    `<rect x="36" y="200" width="8" height="10" fill="#6b5330"/>` +
    `<g stroke="#4f8f3f" stroke-width="2.4" stroke-linecap="round" fill="none"><path d="M104,208q-12,-12 -20,-12M104,208q-4,-16 -12,-20M104,208q4,-18 0,-24M104,208q12,-14 22,-16"/></g>` +
    // 砂に打ち上げられた古い錨(漂着した船の記憶)
    `<g stroke="#7a6a58" stroke-width="3" fill="none" stroke-linecap="round"><path d="M170,204v-22M160,188h20M170,204q-12,-2 -14,-12M170,204q12,-2 14,-12"/></g>` +
    `<circle cx="170" cy="178" r="4.4" fill="none" stroke="#7a6a58" stroke-width="3"/>` +
    shade(170, 206, 20, 3, ".14") +
    // 管制棟と、施設をぐるりと囲う柵
    `<rect x="256" y="128" width="52" height="24" fill="#e2ddd0"/>` +
    `<path d="M252,128h60l-8,-10h-44z" fill="#55606b"/>` +
    windowGrid(260, 133, 44, 14, 4, 1, "#3f5566", "#b8ae98") +
    `<rect x="278" y="106" width="6" height="12" fill="#8a939c"/>` +
    `<circle cx="281" cy="103" r="4" fill="#c2453c"/>` +
    `<g stroke="#9aa0a4" stroke-width="1.6" fill="none"><path d="M232,156h172M232,164h172"/></g>` +
    `<g fill="#7f8a94"><rect x="238" y="150" width="3.4" height="18"/><rect x="290" y="150" width="3.4" height="18"/><rect x="342" y="150" width="3.4" height="18"/><rect x="394" y="150" width="3.4" height="18"/></g>` +
    // 沖を行く船と海鳥
    `<path d="M196,124q10,-4 30,0l-3,5h-24z" fill="#e2ddd0"/>` +
    `<rect x="206" y="116" width="10" height="7" fill="#8a939c"/>` +
    `<g stroke="#4a4436" stroke-width="1.6" fill="none" opacity=".8"><path d="M120,50q4,-4 8,0q4,-4 8,0M150,64q3.4,-3.4 6.8,0q3.4,-3.4 6.8,0M92,72q3,-3 6,0q3,-3 6,0"/></g>` +
    // 砂に残る轍と、貝
    `<g stroke="#d8c48c" stroke-width="2" opacity=".8" fill="none"><path d="M60,196q60,-14 130,-10M64,204q60,-14 130,-10"/></g>` +
    `<g fill="#f2ede0"><ellipse cx="212" cy="190" rx="4" ry="2.4"/><ellipse cx="224" cy="196" rx="3.4" ry="2"/><ellipse cx="128" cy="184" rx="3.6" ry="2.2"/></g>`,
};

// ---------------------------------------------------------------------------
// シンボル(24×24)
//
// 盤面では**直径19pxほどの点**にしかならない。輪郭を優先し、主役を1つに絞る。
// 下端(y=24)を影の楕円に載せると浮かない。
// ---------------------------------------------------------------------------

export const KYUSHU_MARKS = {
  /** 竪坑櫓(大牟田・飯塚・田川)。滑車を載せた鉄の櫓。 */
  pithead:
    '<rect x="0" y="21.6" width="24" height="2.4" fill="#5f584c"/>' +
    '<path d="M3.6,21.6L8.2,6.4h7.6l4.6,15.2h-3.4L12.8,8.8h-1.6L7,21.6z" fill="#5c534a"/>' +
    '<g stroke="#5c534a" stroke-width="1.3" fill="none"><path d="M6,16.6h12M7.2,12.4h9.6M6.4,20L17,14M17.6,20L7,14"/></g>' +
    '<rect x="8" y="4.4" width="8" height="2" fill="#4a423a"/>' +
    '<circle cx="8.6" cy="2.8" r="2.6" fill="#4a423a"/>' +
    '<circle cx="8.6" cy="2.8" r="1.1" fill="#c9c0ac"/>' +
    '<circle cx="15.4" cy="2.8" r="2.6" fill="#4a423a"/>' +
    '<circle cx="15.4" cy="2.8" r="1.1" fill="#c9c0ac"/>' +
    '<path d="M8.6,2.8L1,20.6" stroke="#4a423a" stroke-width="1" fill="none"/>',

  /** 端島。海から立つコンクリートの棟。**窓が抜けている。** */
  concreteruins:
    '<path d="M0,20.8h24V24H0z" fill="#3a7ea0"/>' +
    '<path d="M0,19.4h24v1.4H0z" fill="#dfeef2"/>' +
    '<rect x="1.6" y="17.6" width="20.8" height="2.4" fill="#8a857c"/>' +
    '<rect x="3" y="4" width="8.6" height="13.6" fill="#a3a099"/>' +
    '<rect x="13" y="8.2" width="8" height="9.4" fill="#8f8d88"/>' +
    '<g fill="#33383d"><rect x="4.2" y="5.4" width="2.2" height="2.4"/><rect x="8.2" y="5.4" width="2.2" height="2.4"/><rect x="4.2" y="9.4" width="2.2" height="2.4"/><rect x="8.2" y="9.4" width="2.2" height="2.4"/><rect x="4.2" y="13.4" width="2.2" height="2.4"/><rect x="8.2" y="13.4" width="2.2" height="2.4"/><rect x="14.2" y="10" width="2.2" height="2.4"/><rect x="17.6" y="10" width="2.2" height="2.4"/><rect x="14.2" y="14" width="2.2" height="2.4"/><rect x="17.6" y="14" width="2.2" height="2.4"/></g>' +
    '<path d="M11.6,17.6l1.4,-8.6h1.4l-1.4,8.6z" fill="#7f7d76"/>' +
    '<g fill="#5f7f52"><rect x="14.4" y="6.2" width="2.4" height="2"/></g>' +
    '<circle cx="15.6" cy="5.4" r="1.1" fill="#3f6b3a"/>',

  /** 平戸の商館。**四角い窓が格子に並ぶ倉庫と、掲げた旗。** */
  tradepost:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#8f8878"/>' +
    '<rect x="2.6" y="7.6" width="18.8" height="13.8" fill="#e6e0d0"/>' +
    '<path d="M1,7.6h22l-3,-3.4H4z" fill="#55606b"/>' +
    '<rect x="1" y="6.8" width="22" height="1.4" fill="#3f4852"/>' +
    '<g fill="#3f5566"><rect x="4.6" y="9.6" width="3.2" height="3.4"/><rect x="10.4" y="9.6" width="3.2" height="3.4"/><rect x="16.2" y="9.6" width="3.2" height="3.4"/><rect x="4.6" y="15" width="3.2" height="3.4"/><rect x="16.2" y="15" width="3.2" height="3.4"/></g>' +
    '<rect x="10" y="15" width="4" height="6.4" fill="#5a4630"/>' +
    '<rect x="11.8" y="15" width="0.9" height="6.4" fill="#8a6a44"/>' +
    '<rect x="11.4" y="0.6" width="1.2" height="4.2" fill="#6b5330"/>' +
    '<path d="M12.6,0.8h6.4l-1.6,1.8l1.6,1.8h-6.4z" fill="#e8443f"/>',

  /** 浦上の天主堂。**煉瓦の双塔とばら窓。** */
  cathedral:
    '<rect x="0" y="21.8" width="24" height="2.2" fill="#a89e88"/>' +
    '<rect x="1.6" y="5" width="4.8" height="16.8" fill="#b25b42"/>' +
    '<rect x="17.6" y="5" width="4.8" height="16.8" fill="#b25b42"/>' +
    '<rect x="6.4" y="8" width="11.2" height="13.8" fill="#a8543c"/>' +
    '<g fill="#7a3a2c"><path d="M1.6,5L4,1.8L6.4,5zM17.6,5L20,1.8L22.4,5z"/></g>' +
    '<g fill="#efe8d8"><rect x="3.6" y="0" width="0.8" height="2.2"/><rect x="2.6" y="0.7" width="2.8" height="0.8"/><rect x="19.6" y="0" width="0.8" height="2.2"/><rect x="18.6" y="0.7" width="2.8" height="0.8"/></g>' +
    '<circle cx="12" cy="12.4" r="3.4" fill="#e2d8c4"/>' +
    '<circle cx="12" cy="12.4" r="2.6" fill="#3f5aa0"/>' +
    '<g fill="#e2d8c4"><rect x="11.7" y="9.8" width="0.6" height="5.2"/><rect x="9.4" y="12.1" width="5.2" height="0.6"/></g>' +
    '<circle cx="12" cy="12.4" r="0.9" fill="#e8443f"/>' +
    '<path d="M9.6,21.8v-3.2a2.4,2.4 0 0 1 4.8,0v3.2z" fill="#5a4630"/>' +
    '<g fill="#3f5566"><path d="M2.8,10.4v-2a1.6,1.6 0 0 1 3.2,0v2zM18,10.4v-2a1.6,1.6 0 0 1 3.2,0v2z"/></g>',

  /**
   * 桜島。**黄色い克灰袋**。火口の隣の暮らしを、災害ではなく日課で表す。
   * 19pxで黄色い塊にしか見えなかったので、袋を1つに絞って口を縛った形にし、
   * 灰は丸ではなく斜めの筋にした(雪と見分けるため)。
   */
  ashvillage:
    '<rect x="0" y="20.4" width="24" height="3.6" fill="#a8a094"/>' +
    '<ellipse cx="11" cy="20.6" rx="8.6" ry="1.6" fill="#000" opacity=".18"/>' +
    // 克灰袋(主役)。口を絞ってある
    '<path d="M2.6,20.4q-1.8,-9.6 4.4,-11.4h7.4q6.2,1.8 4.4,11.4z" fill="#f5b31c"/>' +
    '<path d="M2.6,20.4q-1.8,-9.6 4.4,-11.4h3.4v11.4z" fill="#f8cf68"/>' +
    '<path d="M6.6,9q2.2,-1.6 4.4,-2.6q2.2,1 4.4,2.6z" fill="#d99a10"/>' +
    '<path d="M8.6,6.6q2.4,-2 4.4,0q-2.2,1.4 -4.4,0z" fill="#d99a10"/>' +
    '<g stroke="#d99a10" stroke-width="1.2" fill="none"><path d="M3.4,16.4h15.6"/></g>' +
    // ヘルメット(小さく、袋の脇)
    '<path d="M19,20.4a2.9,2.9 0 0 1 5,-2v2z" fill="#f5b31c"/>' +
    '<path d="M18.6,19.6h5.4v1.4h-5.4z" fill="#d99a10"/>' +
    // 降る灰(斜めの筋)
    '<g stroke="#8f877c" stroke-width="1.1" stroke-linecap="round" opacity=".9" fill="none"><path d="M2,3.4l-1,2.4M7.4,1.4l-1,2.4M13.4,3l-1,2.4M19,1.6l-1,2.4M21.6,6.4l-1,2.4M4.6,8l-1,2.4"/></g>',

  /**
   * 元寇防塁。**湾沿いの石塁の一区画。**
   * 19pxでは横縞の帯にしか見えなかったので、**上端を階段状に崩し**、
   * 石を大きく数を減らし、目地を濃くして輪郭で分かるようにしてある。
   */
  rampart:
    '<path d="M0,0h24v6.4H0z" fill="#3f8cb2"/>' +
    '<g stroke="#bfe0f0" stroke-width="1" opacity=".7" fill="none"><path d="M2,2.4h7M14,4.4h8"/></g>' +
    '<path d="M0,20.6h24V24H0z" fill="#e0cfa4"/>' +
    // **大きく欠けた上端。**細かい段では19pxで潰れたので、右側3分の1をまるごと落とす
    '<path d="M0,20.6V6.4h15.4v7.4H24v6.8z" fill="#a5a08c"/>' +
    '<path d="M0,6.4h15.4v2H0zM15.4,13.8H24v2h-8.6z" fill="#cdc7b2"/>' +
    '<g stroke="#5f5a4a" stroke-width="1.2" fill="none"><path d="M0,13.4h15.4M0,17.6h24M7.4,8.4v12.2M19.4,15.8v4.8"/></g>' +
    // 崩れ落ちた石が欠けの下に転がる
    '<path d="M16.2,10.4h4.4v3h-4.4z" fill="#b5af99"/>' +
    '<g fill="#2f6b42"><ellipse cx="4" cy="5" rx="3.6" ry="1.4"/></g>',

  /** 小倉造兵廠。**雲に半ば隠れた工場と煙突。** */
  arsenal:
    '<rect x="0" y="20.8" width="24" height="3.2" fill="#565d64"/>' +
    '<rect x="1.6" y="12.4" width="20.8" height="8.4" fill="#7f858c"/>' +
    '<g fill="#4a5158"><rect x="3.4" y="14.4" width="2.4" height="2.6"/><rect x="7.8" y="14.4" width="2.4" height="2.6"/><rect x="12.2" y="14.4" width="2.4" height="2.6"/><rect x="16.6" y="14.4" width="2.4" height="2.6"/></g>' +
    '<path d="M1.6,12.4v-2.6l3.4,-2.4v2.4l3.4,-2.4v2.4l3.4,-2.4v2.4l3.4,-2.4v2.4l3.4,-2.4v4.6z" fill="#8a9096"/>' +
    '<rect x="4.4" y="1.4" width="2.8" height="11" fill="#9aa0a4"/>' +
    '<rect x="16.8" y="3" width="2.6" height="9.4" fill="#9aa0a4"/>' +
    '<g fill="#c8ced2" opacity=".95"><ellipse cx="5.6" cy="6.6" rx="6.6" ry="2.8"/><ellipse cx="17" cy="8" rx="7" ry="2.6"/><ellipse cx="11.6" cy="4.6" rx="6" ry="2.2"/></g>' +
    '<g fill="#dde2e4" opacity=".9"><ellipse cx="8" cy="4" rx="5" ry="1.6"/><ellipse cx="19" cy="6.2" rx="4.4" ry="1.4"/></g>',

  /** 溶鉱炉・反射炉。**煉瓦の炉と、炉口の炎。** */
  furnace:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#4f4941"/>' +
    '<path d="M3.4,21.4V8.6q0,-3 3.4,-3h7.6q3.4,0 3.4,3v12.8z" fill="#7a6a5c"/>' +
    '<path d="M5.4,5.6h10.2V3.2q-1.4,-1.8 -5.1,-1.8T5.4,3.2z" fill="#8a7a68"/>' +
    '<g fill="#5f5348"><rect x="3.4" y="10.6" width="14.4" height="1.2"/><rect x="3.4" y="15" width="14.4" height="1.2"/></g>' +
    '<path d="M5.6,21.4v-6h10v6z" fill="#e8443f"/>' +
    '<path d="M7.2,21.4v-4.2h6.8v4.2z" fill="#f5b31c"/>' +
    '<path d="M8.8,21.4v-2.4h3.6v2.4z" fill="#f8e2a0"/>' +
    '<g fill="#8a7a68"><rect x="18.6" y="7" width="3" height="14.4" rx="1.4"/></g>' +
    '<g stroke="#5f5348" stroke-width="0.9" fill="none"><path d="M18.6,11h3M18.6,15.6h3"/></g>' +
    '<path d="M9.4,4.4q-1,-2.4 1.2,-4.4q0,2 1.6,2.6q1.8,0.8 1,3z" fill="#f5b31c"/>' +
    '<path d="M10.4,4.4q-0.6,-1.4 0.8,-2.6q0,1.2 1,1.6q1,0.6 0.4,1z" fill="#e8443f"/>',

  /** 海峡を渡す橋(門司・天草)。**水の上を渡る。** */
  strait:
    '<path d="M0,15.6h24V24H0z" fill="#2a6b95"/>' +
    '<g stroke="#bfe0f0" stroke-width="1" opacity=".6" fill="none"><path d="M1.6,18.4h7M14,20.6h8M4,22h6"/></g>' +
    '<path d="M0,15.6q3,-1.6 6,0v-2q-3,-1.6 -6,0z" fill="#6b8069"/>' +
    '<path d="M18,15.6q3,-1.6 6,0v-2q-3,-1.6 -6,0z" fill="#6b8069"/>' +
    '<rect x="0" y="11.4" width="24" height="2" fill="#aeb4b8"/>' +
    '<rect x="0" y="13.4" width="24" height="1" fill="#8d9498"/>' +
    '<g fill="#c4c8cc"><rect x="6.2" y="2.6" width="1.6" height="8.8"/><rect x="16.2" y="2.6" width="1.6" height="8.8"/></g>' +
    '<path d="M0,7.4Q3.4,8.6 7,2.8Q10.6,9.6 17,1.6Q20.4,6.4 24,6.6" stroke="#c4c8cc" stroke-width="1.1" fill="none"/>' +
    '<g stroke="#c4c8cc" stroke-width="0.7" fill="none"><path d="M3,8.6v2.8M10.4,7.6v3.8M13.6,6v5.4M20.6,6.6v4.8"/></g>' +
    '<g fill="#c4c8cc"><rect x="5.4" y="2.4" width="3.2" height="0.9"/><rect x="15.4" y="2.4" width="3.2" height="0.9"/></g>',

  /** ボタ山。**三角に積まれた黒い捨て石。** */
  slagheap:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#7a7264"/>' +
    '<path d="M0.6,21.4L9.6,4.4l9,17z" fill="#3a332c"/>' +
    '<path d="M9.6,4.4l9,17h-8.2z" fill="#4a4238"/>' +
    '<path d="M7,10.4q2.6,-3.4 5.2,0q-2.4,2.2 -5.2,0z" fill="#4f6b3f"/>' +
    '<path d="M19.4,21.4L22.4,13l3,8.4z" fill="#3a332c"/>' +
    '<g fill="#2a2622"><circle cx="4.4" cy="20.4" r="1.4"/><circle cx="8" cy="21" r="1.1"/><circle cx="15.4" cy="20.6" r="1.2"/></g>' +
    '<g stroke="#5f584c" stroke-width="0.8" fill="none"><path d="M4.6,17.6h9.8M2.8,20.2h13.6"/></g>',

  /** タイヤ(久留米)。**ゴム靴から育った工業。** */
  tire:
    '<rect x="0" y="21.6" width="24" height="2.4" fill="#8f8878"/>' +
    '<ellipse cx="12" cy="13.6" rx="10.4" ry="8"/>' +
    '<ellipse cx="12" cy="13.6" rx="10.4" ry="8" fill="#3a3d42"/>' +
    '<ellipse cx="12" cy="13.6" rx="6.6" ry="4.8" fill="#5a5e64"/>' +
    '<ellipse cx="12" cy="13.6" rx="4.4" ry="3" fill="#8f8a80"/>' +
    '<circle cx="12" cy="13.6" r="1.4" fill="#5a5e64"/>' +
    '<g stroke="#2a2d31" stroke-width="1" fill="none"><path d="M12,5.6v2.6M12,19v2.6M2,13.6h2.6M19.4,13.6h2.6M5,7.6l1.8,1.6M19,7.6l-1.8,1.6M5,19.6l1.8,-1.6M19,19.6l-1.8,-1.6"/></g>' +
    '<ellipse cx="12" cy="21.6" rx="9" ry="1.6" fill="#000" opacity=".2"/>',

  /** 学者(太宰府・中津)。**書物を手にした人。顔は描かない。** */
  scholar:
    '<rect x="0" y="21.6" width="24" height="2.4" fill="#a89e88"/>' +
    '<ellipse cx="12" cy="21.6" rx="7" ry="1.6" fill="#000" opacity=".18"/>' +
    '<path d="M6.6,21.6L8.4,9.6h7.2l1.8,12z" fill="#3f4852"/>' +
    '<path d="M9.4,21.6l1,-12h3.2l1,12z" fill="#4a5a8a"/>' +
    '<circle cx="12" cy="6" r="3.4" fill="#e0b48a"/>' +
    '<path d="M8.4,5.4a3.6,3.6 0 0 1 7.2,0q-1.4,-1.6 -3.6,-1.6t-3.6,1.6z" fill="#3a332c"/>' +
    '<path d="M8.4,12.2L4.4,15.4" stroke="#e0b48a" stroke-width="1.8" stroke-linecap="round" fill="none"/>' +
    '<path d="M15.6,12.2L19.6,15.4" stroke="#e0b48a" stroke-width="1.8" stroke-linecap="round" fill="none"/>' +
    '<path d="M3.4,14.4q4.4,-2.6 8.6,0v3.6q-4.2,-2.4 -8.6,0z" fill="#efe8d8"/>' +
    '<path d="M12,14.4q4.4,-2.6 8.6,0v3.6q-4.2,-2.4 -8.6,0z" fill="#f6f2e6"/>' +
    '<path d="M12,14.4v3.6" stroke="#8a8272" stroke-width="0.8" fill="none"/>',

  /** 沖ノ島(宗像)。**海の向こうの小島に立つ鳥居。持ち出せない。** */
  sacredisland:
    '<path d="M0,13.4h24V24H0z" fill="#2a6b95"/>' +
    '<path d="M0,18h24v6H0z" fill="#357ea4"/>' +
    '<g stroke="#bfe0f0" stroke-width="1" opacity=".65" fill="none"><path d="M1.6,15.6h7M14,16.6h8M3,20.6h7M14.6,21.6h7"/></g>' +
    '<path d="M4.6,13.4q3,-4.4 7.4,-4.4t7.4,4.4z" fill="#4f6b52"/>' +
    '<path d="M6.6,12q2.4,-3 5.4,-3t5.4,3z" fill="#5f7f5a"/>' +
    '<g fill="#c2453c">' +
    '<rect x="7.4" y="3.6" width="1.5" height="9.8"/>' +
    '<rect x="15.1" y="3.6" width="1.5" height="9.8"/>' +
    '<path d="M4.8,3.6q7.2,-1.2 14.4,0v1.2q-7.2,-1 -14.4,0z"/>' +
    '<rect x="5.6" y="6.4" width="12.8" height="1"/>' +
    '<rect x="11.2" y="2" width="1.6" height="2.6"/>' +
    '</g>',

  /** 有田の磁器。**染付の壺。** */
  porcelain:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#8a8272"/>' +
    '<ellipse cx="12" cy="21.4" rx="8" ry="1.8" fill="#000" opacity=".18"/>' +
    '<path d="M12,4.4q-6.8,4 -6.8,10q0,7 6.8,7t6.8,-7q0,-6 -6.8,-10z" fill="#f6f2e6"/>' +
    '<path d="M12,4.4q-6.8,4 -6.8,10q0,7 6.8,7z" fill="#efe8d8"/>' +
    '<path d="M9.6,4.6h4.8v2.2H9.6z" fill="#f2ede0"/>' +
    '<path d="M8.8,2.6h6.4v2.2H8.8z" fill="#f6f2e6"/>' +
    '<g fill="#2f5aa8">' +
    '<path d="M5.6,11.6q6.4,2.2 12.8,0v1.6q-6.4,2.2 -12.8,0z"/>' +
    '<circle cx="12" cy="16.6" r="2.4"/>' +
    '<path d="M7.2,17q0.6,-2.6 2.4,-3.4q-0.4,2.4 -2.4,3.4z"/>' +
    '<path d="M16.8,17q-0.6,-2.6 -2.4,-3.4q0.4,2.4 2.4,3.4z"/>' +
    '<path d="M9.4,3q2.6,-1 5.2,0v0.9q-2.6,-1 -5.2,0z"/>' +
    '</g>',

  /** 積出箱(伊万里)。**藁で梱包され、縄で結ばれた箱。** */
  exportcrate:
    '<rect x="0" y="21.6" width="24" height="2.4" fill="#8f8878"/>' +
    '<ellipse cx="12" cy="21.6" rx="9.4" ry="1.8" fill="#000" opacity=".18"/>' +
    '<rect x="2.6" y="7" width="18.8" height="14.6" rx="1" fill="#c9a05c"/>' +
    '<path d="M2.6,7h18.8v3H2.6z" fill="#d8b878"/>' +
    '<g stroke="#e0c088" stroke-width="0.9" opacity=".9" fill="none"><path d="M5,7.4v13.8M8,7.4v13.8M16,7.4v13.8M19,7.4v13.8"/></g>' +
    '<g fill="#8a6a2c"><rect x="2.6" y="10.6" width="18.8" height="1.6"/><rect x="2.6" y="17" width="18.8" height="1.6"/><rect x="11.2" y="7" width="1.6" height="14.6"/></g>' +
    '<path d="M9.4,3.4h5.2v3.6H9.4z" fill="#f2ede0"/>' +
    '<path d="M9.4,3.4h5.2v1.2H9.4z" fill="#2f5aa8"/>' +
    '<path d="M12,7V6" stroke="#8a6a2c" stroke-width="0.9" fill="none"/>',

  /**
   * 名護屋城跡(唐津)。**崩れ落ちた石垣の突端と、残った礎石。**
   * 19pxで灰色の塊にしか見えなかったので、**壁を1枚に絞って高くし**、
   * 崩れた斜めの断面を輪郭に出した。濃い緑の地に載せて縁を立てている。
   */
  ruinedcastle:
    '<rect x="0" y="0" width="24" height="24" fill="#94a065"/>' +
    '<rect x="0" y="15.6" width="24" height="8.4" fill="#7f9450"/>' +
    // 崩れて斜めに落ちる石垣の突端
    '<path d="M0.6,20.4V6.4h4.4v-2h4.6v2.6h2.6L20,20.4z" fill="#b5af99"/>' +
    '<path d="M0.6,6.4h4.4v1.6H0.6zM5,4.4h4.6v1.6H5z" fill="#cdc7b2"/>' +
    '<g stroke="#5f5a4a" stroke-width="1.1" fill="none"><path d="M0.6,11h13.6M0.6,15.4h16.2M5,5.4v15M9.6,7v13.4"/></g>' +
    // 崩れ落ちた石
    '<g fill="#b5af99"><rect x="17.4" y="15" width="5.6" height="4.4" rx="0.6" transform="rotate(-14 20.2 17.2)"/></g>' +
    '<g stroke="#5f5a4a" stroke-width="0.9" fill="none"><path d="M17.8,17.6l5.4,-1.4"/></g>' +
    // 礎石(建物があった痕跡)
    '<g fill="#7f7a68"><ellipse cx="5" cy="22.6" rx="4" ry="1.4"/><ellipse cx="16.4" cy="22.6" rx="4" ry="1.4"/></g>' +
    '<g fill="#cdc7b2"><ellipse cx="4.6" cy="21.8" rx="2.6" ry="0.9"/><ellipse cx="16" cy="21.8" rx="2.6" ry="0.9"/></g>',

  /** 環濠集落(吉野ヶ里)。**濠と、その上に立つ物見櫓。** */
  moat:
    '<rect x="0" y="18" width="24" height="6" fill="#7a7f50"/>' +
    '<path d="M0,20h24l-2.6,4H2.6z" fill="#4f7f9a"/>' +
    '<g stroke="#a8d8e8" stroke-width="0.8" opacity=".7" fill="none"><path d="M4,22h5.4M14,22.6h6"/></g>' +
    '<rect x="0" y="15.4" width="24" height="2.6" fill="#7f9a5c"/>' +
    '<g fill="#8a6a44"><rect x="6.6" y="5.4" width="1.6" height="10"/><rect x="15.2" y="5.4" width="1.6" height="10"/></g>' +
    '<g stroke="#7a5a34" stroke-width="0.9" fill="none"><path d="M6.6,9h10.2M6.6,12.4h10.2M6.6,12.4l10.2,-3.4M16.8,12.4L6.6,9"/></g>' +
    '<rect x="5.4" y="3.4" width="13.2" height="2.6" fill="#a8763c"/>' +
    '<path d="M3.6,3.4h16.8L12,0z" fill="#9a8a54"/>' +
    '<rect x="4.6" y="5.6" width="14.8" height="0.9" fill="#5f4a34"/>' +
    '<g fill="#8a6a44"><path d="M1.4,15.4v-3l0.9,-1.2l0.9,1.2v3zM20.8,15.4v-3l0.9,-1.2l0.9,1.2v3z"/></g>',

  /** 佐世保のドック。**ドックに入った艦とクレーン。** */
  drydock:
    '<rect x="0" y="17.6" width="24" height="6.4" fill="#7f7a6c"/>' +
    '<g stroke="#6f6a5e" stroke-width="0.8" fill="none"><path d="M0,20h24M0,22.4h24"/></g>' +
    '<path d="M1.4,17.6q1.6,-6 9.6,-6h7.4q1.6,2 1.6,6z" fill="#4a5158"/>' +
    '<path d="M2.6,14.6h17.4v1.4H2.6z" fill="#8a3a34"/>' +
    '<rect x="6.4" y="8" width="8" height="3.6" fill="#5f676e"/>' +
    '<rect x="8.6" y="5" width="3.6" height="3" fill="#6b737a"/>' +
    '<rect x="9.8" y="1.6" width="0.9" height="3.4" fill="#8a9096"/>' +
    '<g fill="#c9c0ac"><rect x="7.2" y="8.8" width="1.6" height="1.4"/><rect x="10" y="8.8" width="1.6" height="1.4"/><rect x="12.6" y="8.8" width="1.6" height="1.4"/></g>' +
    '<g fill="#7f8a94"><path d="M17,17.6h1.4l1.6,-12h-1.4zM23.4,17.6H22l-1.6,-12h1.4z"/><rect x="17.6" y="4" width="6" height="1.6"/></g>' +
    '<path d="M20,5.6v4.6" stroke="#5f6a74" stroke-width="0.8" fill="none"/>' +
    '<rect x="18.8" y="10.2" width="2.4" height="2" fill="#f5b31c"/>',

  /** 島原の一揆の旗印。**十字の紋の旗。** */
  banner:
    '<rect x="0" y="21.6" width="24" height="2.4" fill="#8a8a5c"/>' +
    '<ellipse cx="8" cy="21.6" rx="4.4" ry="1.4" fill="#000" opacity=".18"/>' +
    '<rect x="7.2" y="0.6" width="1.8" height="21" fill="#6b5330"/>' +
    '<path d="M9,1.4h13.4v13.2H9z" fill="#f2ede0"/>' +
    '<path d="M9,1.4h13.4v2H9z" fill="#e4ddc8"/>' +
    '<g fill="#c2453c"><rect x="14.6" y="3.4" width="2.2" height="9.4"/><rect x="10.6" y="6.8" width="10.2" height="2.2"/></g>' +
    '<path d="M9,14.6h13.4l-1.6,2H9z" fill="#dcd4c0"/>' +
    '<circle cx="8.1" cy="0.9" r="1.2" fill="#f5b31c"/>' +
    '<g stroke="#6b5330" stroke-width="0.9" fill="none"><path d="M8.1,18.4L4.4,21.6M8.1,18.4l3.6,3.2"/></g>',

  /** 雲仙地獄。**硫黄色に沸き立つ噴気の湯だまり。** */
  hellpool:
    '<rect x="0" y="15.6" width="24" height="8.4" fill="#a8a084"/>' +
    '<ellipse cx="12" cy="19" rx="11.6" ry="4.6" fill="#c4b45c"/>' +
    '<ellipse cx="12" cy="19" rx="8.6" ry="3.4" fill="#8a8a72"/>' +
    '<ellipse cx="12" cy="18.6" rx="7" ry="2.6" fill="#b8b49a"/>' +
    '<g fill="#e2ddd0"><circle cx="8.4" cy="18.4" r="1.6"/><circle cx="12.6" cy="19.4" r="1.2"/><circle cx="15.6" cy="17.8" r="1"/></g>' +
    '<g fill="#f0eee6" opacity=".9"><ellipse cx="10" cy="13.4" rx="4" ry="2.6"/><ellipse cx="14.4" cy="9.4" rx="4.6" ry="3"/><ellipse cx="9.6" cy="5.4" rx="5.2" ry="3.4"/><ellipse cx="14" cy="2" rx="5" ry="2.6"/></g>' +
    '<g fill="#cfc8b4"><path d="M0.4,17q2.4,-3 5,-0.8l0.6,1.8H0.6z"/><path d="M20,16.6q2,-2.4 4,-0.6v1.6h-4z"/></g>',

  /** 五島の教会。**断崖の上に立つ小さな教会。** */
  hiddenchurch:
    '<path d="M0,17.6h24V24H0z" fill="#2f7396"/>' +
    '<g stroke="#bfe0f0" stroke-width="0.9" opacity=".6" fill="none"><path d="M2,20h6M14,21.6h8"/></g>' +
    '<path d="M0,17.6V9.4q3.4,-1.4 7,0.6q3,1.8 4.4,7.6z" fill="#7f7a68"/>' +
    '<path d="M0,17.6V9.4q3.4,-1.4 7,0.6L4.4,11.8Q2.2,10.8 0,11.4z" fill="#948f7c"/>' +
    '<g stroke="#6b6656" stroke-width="0.6" fill="none"><path d="M0.6,12.8h4M0.6,15h3.4"/></g>' +
    '<path d="M11,17.6q4,-3.4 13,-2.6v9H11z" fill="#6f9f52"/>' +
    '<rect x="13.4" y="10.6" width="9.4" height="6.6" fill="#efe8d8"/>' +
    '<path d="M12.4,10.6h11.4L18.1,6.6z" fill="#8a5548"/>' +
    '<rect x="16.6" y="4.6" width="3" height="6" fill="#efe8d8"/>' +
    '<path d="M15.8,4.6h4.6l-2.3,-2z" fill="#8a5548"/>' +
    '<g fill="#8a8272"><rect x="17.8" y="0.8" width="0.7" height="2.2"/><rect x="16.8" y="1.4" width="2.7" height="0.7"/></g>' +
    '<g fill="#3f5566"><path d="M14.6,15.4v-1.8a1.2,1.2 0 0 1 2.4,0v1.8zM19.4,15.4v-1.8a1.2,1.2 0 0 1 2.4,0v1.8z"/></g>' +
    '<rect x="17.4" y="14" width="2" height="3.2" fill="#5a4630"/>',

  /** 諫早の水門。**海を仕切る、落とされた鋼板のゲート。** */
  floodgate:
    '<rect x="0" y="18.6" width="24" height="5.4" fill="#6f9f52"/>' +
    '<rect x="0" y="0" width="24" height="4.4" fill="#3179a0"/>' +
    '<g stroke="#bfe0f0" stroke-width="0.8" opacity=".55" fill="none"><path d="M2,1.6h6M14,2.6h8"/></g>' +
    '<rect x="0" y="4" width="24" height="2.2" fill="#a5aab0"/>' +
    '<g fill="#6b7480"><rect x="0.6" y="6" width="2.2" height="12"/><rect x="7.2" y="6" width="2.2" height="12"/><rect x="13.8" y="6" width="2.2" height="12"/><rect x="20.4" y="6" width="2.2" height="12"/></g>' +
    '<g fill="#4a5158"><rect x="2.8" y="7.4" width="4.4" height="10.6"/><rect x="9.4" y="7.4" width="4.4" height="10.6"/><rect x="16" y="7.4" width="4.4" height="10.6"/></g>' +
    '<g fill="#5f6a74"><rect x="2.8" y="7.4" width="4.4" height="1.4"/><rect x="9.4" y="7.4" width="4.4" height="1.4"/><rect x="16" y="7.4" width="4.4" height="1.4"/></g>' +
    '<rect x="0" y="18" width="24" height="1.6" fill="#b0a894"/>' +
    '<g fill="#4f8f3f"><path d="M4,24q-1.6,-4 0,-5.4q1.6,1.4 0,5.4z"/><path d="M12,24q-1.6,-4 0,-5.4q1.6,1.4 0,5.4z"/><path d="M20,24q-1.6,-4 0,-5.4q1.6,1.4 0,5.4z"/></g>',

  /**
   * 熊本城の石垣。**割れ目と、番号を振られた石。**
   * 19pxでは割れ目が消えて灰色の山になったので、**割れ目を太い黒の稲妻**にし、
   * 番号札は白地に赤の1枚だけに絞った。
   */
  quakecrack:
    '<rect x="0" y="20.4" width="24" height="3.6" fill="#8f9478"/>' +
    '<path d="M1,20.4q1.6,-11.4 7.4,-15h7.2q5.8,3.6 7.4,15z" fill="#b5af99"/>' +
    '<g stroke="#847f6c" stroke-width="0.8" fill="none"><path d="M2.4,16.6q9,-3.4 19.2,0M3.6,12.4q7.4,-3 16.8,0M5.6,8.4q6,-2 12.8,0"/></g>' +
    // 崩れて空いた部分(右上)
    '<path d="M15.6,20.4q1.2,-8.4 4.6,-12l3.4,12z" fill="#8f9478"/>' +
    // 太い割れ目
    '<path d="M13.6,20.4l1.4,-5l-2.6,-2.6l2.6,-3.4l-1.6,-3.6" stroke="#3a332c" stroke-width="1.8" stroke-linejoin="round" fill="none"/>' +
    '<path d="M12.4,12.8l-3,1.4" stroke="#3a332c" stroke-width="1.4" fill="none"/>' +
    // 番号を振った札
    '<rect x="2.4" y="14.6" width="6" height="4.2" fill="#f6f2e6"/>' +
    '<rect x="3.2" y="15.6" width="4.4" height="1.2" fill="#c2453c"/>' +
    '<rect x="3.2" y="17.4" width="3" height="0.9" fill="#5f584c"/>',

  /** 化学工場(水俣・延岡)。**配管と煙突。** */
  chemicalplant:
    '<rect x="0" y="20.4" width="24" height="3.6" fill="#6f7468"/>' +
    '<rect x="1.4" y="12.4" width="13.4" height="8" fill="#8a8f8c"/>' +
    '<g fill="#4a5158"><rect x="2.8" y="14.4" width="2" height="2.2"/><rect x="6.2" y="14.4" width="2" height="2.2"/><rect x="9.6" y="14.4" width="2" height="2.2"/><rect x="13" y="14.4" width="1.4" height="2.2"/></g>' +
    '<path d="M2.6,4.4h2.6l0.7,8h-4z" fill="#a89c88"/>' +
    '<path d="M6.8,7h2.4l0.6,5.4h-3.6z" fill="#a89c88"/>' +
    '<g fill="#c2453c"><rect x="2.5" y="4.4" width="2.8" height="0.9"/><rect x="6.7" y="7" width="2.6" height="0.9"/></g>' +
    '<g fill="#9aa0a4"><rect x="16" y="8.6" width="3.4" height="6.4" rx="1.6"/><rect x="20.2" y="10.4" width="3" height="4.6" rx="1.4"/></g>' +
    '<g stroke="#7f858c" stroke-width="1.2" fill="none"><path d="M17.6,8.6v-2h5.6v4M21.6,10.4v-1.4"/></g>' +
    '<g stroke="#8a8f94" stroke-width="1.8" fill="none"><path d="M0,17.4h15.4l1.6,1.6h5"/></g>' +
    '<g stroke="#6b7076" stroke-width="0.7" fill="none"><path d="M4,16.6v1.6M9,16.6v1.6"/></g>' +
    '<rect x="20.6" y="18" width="3.4" height="2.4" fill="#2f3640"/>' +
    '<path d="M20.6,20.4q1.8,1.6 3.4,0z" fill="#7f8a7c"/>',

  /** い草(八代)。**刈り取って束ねた青い茎。** */
  igusa:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#a89e88"/>' +
    '<ellipse cx="12" cy="21.4" rx="8.4" ry="1.6" fill="#000" opacity=".18"/>' +
    '<g stroke="#5f9a46" stroke-width="1.1" stroke-linecap="round" fill="none">' +
    '<path d="M6.4,21.4L4.4,2.6M8.4,21.4L7.4,1.4M10.4,21.4L10.4,0.8M12,21.4L12.6,1.4M13.8,21.4L15,2M15.6,21.4L17.6,3.4M17.2,21.4L19.6,5.4M5.2,21.4L2.6,5"/>' +
    '</g>' +
    '<g stroke="#7fb44c" stroke-width="0.9" stroke-linecap="round" fill="none">' +
    '<path d="M7.4,21.4L6.2,3.6M11.2,21.4L11.4,1.6M14.6,21.4L16.2,3.6M16.4,21.4L18.6,5"/>' +
    '</g>' +
    '<path d="M3.4,12.4h17.2v3.6H3.4z" fill="#c9a05c"/>' +
    '<g stroke="#8a6a2c" stroke-width="0.8" fill="none"><path d="M3.4,13.6h17.2M3.4,15h17.2"/></g>' +
    '<path d="M3.4,17.4h17.2v2.6H3.4z" fill="#c9a05c"/>' +
    '<path d="M3.4,18.6h17.2" stroke="#8a6a2c" stroke-width="0.8" fill="none"/>',

  /** 人吉の浸水位(水位標)。**壁に残った、その日の水の高さ。** */
  watermark:
    '<rect x="0" y="21" width="24" height="3" fill="#8f8878"/>' +
    '<rect x="2.6" y="2.6" width="18.8" height="18.4" fill="#efe8d8"/>' +
    '<path d="M1.4,2.6h21.2l-2.6,-2.2H4z" fill="#55606b"/>' +
    '<g fill="#4a5a66"><rect x="4.6" y="5" width="4" height="4.4"/><rect x="15.4" y="5" width="4" height="4.4"/></g>' +
    '<rect x="10.2" y="14.4" width="3.6" height="6.6" fill="#6b4a30"/>' +
    '<path d="M2.6,12.4h18.8v1.8H2.6z" fill="#4f8fa8"/>' +
    '<path d="M2.6,12.4h18.8v0.7H2.6z" fill="#2f6b88"/>' +
    '<g fill="#8fbcd0" opacity=".55"><rect x="2.6" y="14.2" width="18.8" height="6.8"/></g>' +
    '<g stroke="#2f6b88" stroke-width="0.9" fill="none"><path d="M21.4,12.4h1.4M21.4,9.4h1.4M21.4,16h1.4"/></g>' +
    '<g fill="#c2453c"><path d="M20.4,10.6l2.6,1.8l-2.6,1.8z"/></g>',

  /** 阿蘇の野焼き。**草原を横切る炎の帯。** */
  grassburn:
    '<rect x="0" y="14.4" width="24" height="9.6" fill="#4a4438"/>' +
    '<g stroke="#5f584c" stroke-width="0.8" fill="none"><path d="M2.4,21.6v-2.6M7,22.4v-3M12,21.4v-2.6M17,22.4v-3M21.6,21.6v-2.6"/></g>' +
    '<rect x="0" y="8.6" width="24" height="6.4" fill="#7fa84c"/>' +
    '<g stroke="#5f8f42" stroke-width="0.8" fill="none"><path d="M2,12h4.4M9,10.6h6M17.6,12.4h4.6"/></g>' +
    '<rect x="0" y="4.6" width="24" height="4.4" fill="#6f9f52"/>' +
    '<path d="M0,15.6q2,-5 4,-1.6q0.6,-4.4 3,-1.6q1,-4.6 3.4,-1.4q0.8,-4.2 3.2,-1.2q1,-4.6 3.4,-1.2q1,-3.6 3,-1q1.6,2 4,1.4v6.6z" fill="#e8443f"/>' +
    '<path d="M0.6,15.6q1.6,-3.4 3.2,-1q0.6,-2.8 2.4,-1q0.8,-3 2.8,-0.8q0.6,-2.8 2.6,-0.8q0.8,-3 2.8,-0.8q0.8,-2.4 2.4,-0.6q1.6,1.4 3.2,1v4z" fill="#f5b31c"/>' +
    '<g fill="#c8c4bc" opacity=".7"><ellipse cx="6" cy="2.4" rx="4.4" ry="1.8"/><ellipse cx="16" cy="1.6" rx="5" ry="1.6"/></g>',

  /** 大分の病院。**十字を掲げた洋風の病棟。誰でも入れる階段。** */
  hospital:
    '<rect x="0" y="21.4" width="24" height="2.6" fill="#8a8272"/>' +
    '<rect x="2" y="7.4" width="20" height="12.4" fill="#f2ede0"/>' +
    '<path d="M0.6,7.4h22.8l-2.6,-3.4H3.2z" fill="#7a4438"/>' +
    '<g stroke="#d8d0bc" stroke-width="0.7" fill="none"><path d="M2,10h20M2,13h20M2,16h20M2,19h20"/></g>' +
    // 十字は建物の正面に大きく置く(19pxで屋根上の小さな十字は消えた)
    '<g fill="#c2453c"><rect x="10.4" y="8.6" width="3.2" height="9.6"/><rect x="7.2" y="11.8" width="9.6" height="3.2"/></g>' +
    '<g fill="#c9c0ac"><path d="M2.6,15.4v-4a1.7,1.7 0 0 1 3.4,0v4zM18,15.4v-4a1.7,1.7 0 0 1 3.4,0v4z"/></g>' +
    '<g fill="#3f5566"><path d="M3.2,15v-3.4a1.1,1.1 0 0 1 2.2,0v3.4zM18.6,15v-3.4a1.1,1.1 0 0 1 2.2,0v3.4z"/></g>' +
    '<path d="M10,19.8v-1.6h4v1.6z" fill="#5a4630"/>' +
    '<g fill="#b0a894"><rect x="7.4" y="19.8" width="9.2" height="0.8"/><rect x="6.2" y="20.6" width="11.6" height="0.8"/></g>',

  /** 咸宜園(日田)。**書物を積んだ講堂。身分は問わない。** */
  academy:
    '<rect x="0" y="21.6" width="24" height="2.4" fill="#9a9280"/>' +
    '<rect x="2.6" y="9" width="18.8" height="12.6" fill="#efe8d8"/>' +
    '<path d="M0.6,9h22.8l-3.4,-3.6H4z" fill="#55606b"/>' +
    '<rect x="0.6" y="8.4" width="22.8" height="1.2" fill="#3f4852"/>' +
    '<rect x="4" y="4" width="16" height="1.4" fill="#3f4852"/>' +
    '<g fill="#6b4a30"><rect x="3.6" y="11" width="6.4" height="6.4"/><rect x="14" y="11" width="6.4" height="6.4"/></g>' +
    '<g stroke="#9a7a4c" stroke-width="0.7" fill="none"><path d="M5.2,11v6.4M6.8,11v6.4M8.4,11v6.4M15.6,11v6.4M17.2,11v6.4M18.8,11v6.4"/></g>' +
    '<g fill="#c2453c"><rect x="4.2" y="18.6" width="7" height="1.4"/></g>' +
    '<g fill="#3f5aa0"><rect x="4.6" y="17.2" width="6.2" height="1.4"/></g>' +
    '<g fill="#f5b31c"><rect x="5" y="15.8" width="5.4" height="1.4"/></g>' +
    '<g fill="#4f8f3f"><rect x="13.6" y="18.6" width="6.6" height="1.4"/></g>' +
    '<g fill="#e8dfc0"><rect x="14" y="17.2" width="6" height="1.4"/></g>',

  /** 焼酎の蒸留器(都城)。**銅のポットスチル。** */
  distillery:
    '<rect x="0" y="21.6" width="24" height="2.4" fill="#8a8272"/>' +
    '<ellipse cx="10" cy="21.6" rx="8" ry="1.6" fill="#000" opacity=".18"/>' +
    '<path d="M3,21.6q-1.6,-6.6 2.4,-9.6h9.2q4,3 2.4,9.6z" fill="#c2853c"/>' +
    '<path d="M3,21.6q-1.6,-6.6 2.4,-9.6h4.6v9.6z" fill="#d89a4c"/>' +
    '<path d="M6.4,12V9.4h7.2V12z" fill="#b0762c"/>' +
    '<path d="M10,9.4V6.4q0,-2.6 4,-2.6h4.6" fill="none" stroke="#c2853c" stroke-width="2.2"/>' +
    '<path d="M18.6,3.8q3,0 3,3v10.6q0,3.2 -3,3.2" fill="none" stroke="#b0762c" stroke-width="2"/>' +
    '<path d="M18.4,17.6h-2.6" stroke="#b0762c" stroke-width="1.6" fill="none"/>' +
    '<g stroke="#8a5c1c" stroke-width="0.7" fill="none"><path d="M3.4,18h13.2M4.4,15h11.2"/></g>' +
    '<g fill="#f5b31c"><ellipse cx="10" cy="19.4" rx="3.4" ry="1.4"/></g>' +
    '<g fill="#e2ddd0" opacity=".7"><ellipse cx="21.4" cy="1.6" rx="2.4" ry="1.4"/></g>',

  /**
   * 飫肥の武家屋敷通り。**石垣沿いの塀に開いた、閉じた門。**
   * 19pxでは塀の目地が消えて灰色の帯になったので、**門を主役に大きく取り**、
   * 塀は左右に低く伸ばすだけにした。
   */
  samurairow:
    '<rect x="0" y="19.4" width="24" height="4.6" fill="#8f8878"/>' +
    '<path d="M0,21.6h24" stroke="#7f7869" stroke-width="0.8" fill="none"/>' +
    // 左右の塀(低く、石は大きく)
    '<g fill="#a5a08c"><rect x="0" y="12.6" width="4.6" height="6.8"/><rect x="19.4" y="12.6" width="4.6" height="6.8"/></g>' +
    '<g stroke="#5f5a4a" stroke-width="1" fill="none"><path d="M0,16h4.6M19.4,16h4.6M2.4,12.6v6.8M21.8,12.6v6.8"/></g>' +
    '<g fill="#5a636b"><rect x="0" y="11" width="5" height="1.8"/><rect x="19" y="11" width="5" height="1.8"/></g>' +
    // 門(主役)
    '<rect x="5.4" y="8.6" width="13.2" height="10.8" fill="#5a4630"/>' +
    '<path d="M3,8.6h18l-2.8,-3.4H5.8z" fill="#4a545e"/>' +
    '<rect x="3" y="7.8" width="18" height="1.4" fill="#39424b"/>' +
    '<rect x="6" y="3.6" width="12" height="1.6" fill="#4a545e"/>' +
    '<g fill="#3f3226"><rect x="6.6" y="10.4" width="4.8" height="9"/><rect x="12.6" y="10.4" width="4.8" height="9"/></g>' +
    '<g fill="#9a7a4c"><rect x="6.6" y="13.4" width="10.8" height="1.2"/></g>' +
    '<g fill="#c9a05c"><circle cx="9" cy="16.6" r="1.1"/><circle cx="15" cy="16.6" r="1.1"/></g>',

  /** 薩摩の留学生(鹿児島)。**偽名で夜の入江から船出する一団。** */
  students:
    '<path d="M0,16.4h24V24H0z" fill="#2a5f80"/>' +
    '<g stroke="#8fb8d0" stroke-width="0.9" opacity=".6" fill="none"><path d="M1.6,19h6M14,20.6h8M4,22.4h7"/></g>' +
    '<path d="M2,16.4q10,5.6 20,0l-1.6,-2.6H3.6z" fill="#5a4630"/>' +
    '<path d="M2.6,15h18.8" stroke="#8a6a44" stroke-width="1" fill="none"/>' +
    '<g fill="#3f4852">' +
    '<path d="M4.4,13.8V8.6a1.5,1.5 0 0 1 3,0v5.2z"/>' +
    '<path d="M8.6,13.8V7.4a1.5,1.5 0 0 1 3,0v6.4z"/>' +
    '<path d="M12.8,13.8V8.2a1.5,1.5 0 0 1 3,0v5.6z"/>' +
    '<path d="M17,13.8V7.8a1.5,1.5 0 0 1 3,0v6z"/>' +
    '</g>' +
    '<g fill="#2f3640"><circle cx="5.9" cy="7.4" r="1.5"/><circle cx="10.1" cy="6.2" r="1.5"/><circle cx="14.3" cy="7" r="1.5"/><circle cx="18.5" cy="6.6" r="1.5"/></g>' +
    '<rect x="11.4" y="0.6" width="1" height="7" fill="#6b5330"/>' +
    '<path d="M12.4,1h5.6l-1.4,1.6l1.4,1.6h-5.6z" fill="#8a8272"/>',

  /** 知覧。**散る一片の花びらと、遠い機影。** */
  cherryblossom:
    '<rect x="0" y="21.6" width="24" height="2.4" fill="#9a9484"/>' +
    '<g fill="#eec2d0">' +
    '<path d="M12,4q3.4,0.6 3.4,3.6T12,11.6Q8.6,10.2 8.6,7.6T12,4z"/>' +
    '<path d="M18.6,7.6q1.8,3 -0.4,5.2t-5.4,0.4q0.6,-3.6 2.8,-4.8z" transform="rotate(0 12 11)"/>' +
    '<path d="M5.4,7.6q-1.8,3 0.4,5.2t5.4,0.4q-0.6,-3.6 -2.8,-4.8z"/>' +
    '<path d="M16.4,17.4q-2.8,2 -5.2,0.4q0.4,-2.6 2,-3.6q2.4,-0.4 3.2,3.2z"/>' +
    '<path d="M7.6,17.4q2.8,2 5.2,0.4q-0.4,-2.6 -2,-3.6q-2.4,-0.4 -3.2,3.2z"/>' +
    '</g>' +
    '<circle cx="12" cy="11.6" r="2.4" fill="#f8e2e8"/>' +
    '<g fill="#e8809a"><circle cx="12" cy="11.6" r="1"/><path d="M12,10.6l0.6,-2.4M12,10.6l-2,-1.4" stroke="#e8809a" stroke-width="0.7" fill="none"/></g>' +
    '<path d="M2.4,20.6q1.4,-2.4 3.4,-1.4q-0.6,2.6 -3.4,1.4z" fill="#f2d2dc"/>' +
    '<g fill="#5f6a74"><path d="M18,1.4h4.8v0.9H18z"/><path d="M20.2,0.4h0.8v3h-0.8z"/><path d="M19.6,3q0.9,0.6 1.8,0" stroke="#5f6a74" stroke-width="0.6" fill="none"/></g>',

  /** 出水のナベヅル。**首を伸ばして飛ぶツル。** */
  cranes:
    '<rect x="0" y="19.4" width="24" height="4.6" fill="#8a9464"/>' +
    '<g stroke="#6f8a4c" stroke-width="0.8" fill="none"><path d="M2,22v-2M7,22.6v-2M13,22v-2M18,22.6v-2M22,22v-2"/></g>' +
    '<path d="M2.4,12.6q4.4,-1.4 8,0.6l4.8,1.4q1.6,0.4 1.6,1.6t-1.6,1.4l-6.4,0.4q-4.4,-0.4 -6.4,-3z" fill="#4a5158"/>' +
    '<path d="M15.2,14.6q3.4,-2.4 6.6,-8.2q0.6,-1.2 1.6,-0.6t0,1.8q-2.8,6.4 -6,8.8z" fill="#f2ede0"/>' +
    '<path d="M21.8,5.8q1.2,-0.6 1.6,0" stroke="#e8443f" stroke-width="1.1" fill="none"/>' +
    '<circle cx="21.6" cy="6.6" r="0.8" fill="#2f2a24"/>' +
    '<path d="M5.6,12.8q3.4,-4.6 8.4,-4.4q-1.6,4 -6,5.4z" fill="#c9c0ac"/>' +
    '<g stroke="#3a3d42" stroke-width="0.9" fill="none"><path d="M7.4,17.6l-2.4,3M10.2,17.8l-1.4,3.2"/></g>' +
    '<g fill="#4a5158" opacity=".8"><path d="M0.6,7.4q2.6,-1 4.8,0.4l2.6,0.8q1,0.2 1,1t-1,0.8l-3.6,0.2q-2.6,-0.2 -3.8,-1.8z"/><path d="M7.4,9.2q2,-1.4 3.8,-4.8q0.4,-0.7 1,-0.4t0,1q-1.6,3.8 -3.4,5.2z"/></g>',

  /**
   * 種子島の火縄銃。
   * 19pxでは茶色の塊になったので、**銃身を斜めに大きく通し**、
   * 台尻・火挟み・火のついた縄を、輪郭の出る大きさにした。
   */
  matchlock:
    '<rect x="0" y="20.6" width="24" height="3.4" fill="#8f8878"/>' +
    '<ellipse cx="12" cy="20.8" rx="9.4" ry="1.6" fill="#000" opacity=".18"/>' +
    // 銃身(斜め)
    '<path d="M6.4,18.4L21.6,5.6l1.8,2.2L8.2,20.6z" fill="#3a3d42"/>' +
    '<path d="M21.6,5.6l1.8,2.2l-1.6,1.4l-1.8,-2.2z" fill="#2f3640"/>' +
    // 台尻
    '<path d="M0.6,17.4q-0.4,-2.8 2.4,-3.6l5.8,3.4l-1.8,4.4q-4.6,0.4 -6.4,-4.2z" fill="#6b4a30"/>' +
    '<path d="M0.6,17.4q-0.4,-2.8 2.4,-3.6l2,1.2l-1.6,5.6q-2.2,-0.8 -2.8,-3.2z" fill="#8a6a44"/>' +
    // 火挟みと火縄
    '<path d="M10.6,15.2l3,-2.6l1.4,1.6l-3,2.6z" fill="#5f6a74"/>' +
    '<path d="M12.6,12.4q-1.4,-3.2 0.6,-5.4" stroke="#c9c0ac" stroke-width="1.2" fill="none"/>' +
    '<path d="M12.4,7.6q-0.8,-2.2 0.8,-4q0,1.4 1,2q1.4,0.8 0.2,2z" fill="#f5b31c"/>' +
    '<path d="M13,7.6q-0.4,-1.2 0.4,-2.2q0,0.8 0.6,1.1q0.7,0.4 0.1,1.1z" fill="#e8443f"/>' +
    '<circle cx="11.6" cy="16.4" r="1.2" fill="#c9c0ac"/>',
};
