/**
 * 茨城の「水辺」の背景6種。
 *
 * `art.mjs`(田園・町の7種)とは別の担当が書くため、ファイルを分けている。
 * 取り込みは取りまとめ側が `art.mjs` 側で行う。**このファイルは新規追加だけ。**
 *
 * ## 6種を描き分ける
 *
 * 茨城は13種のうち**6種が水辺**で、そのまま描くと全部同じ「空・水・岸」になる。
 * 都市の `tag` が具体的なので、それぞれの決め手をそこから取った。
 *
 * | キー | 決め手 | 水の色 | 時間 |
 * |---|---|---|---|
 * | `seaside` | **海中の朱い鳥居**(大洗「波間に立つ鳥居」)と荒磯 | 外洋の濃紺 | 朝焼け |
 * | `coasttown` | **青い花の丘**(ひたちなか「五月に青くなる丘」) | 遠くに細く | 昼 |
 * | `harbourtown` | **防波堤と漁船、工場の煙突**(日立「製作所」) | 港内の灰青 | 夕方 |
 * | `riverport` | **土手と渡し舟**(取手「大河の手前の宿」) | 川の茶緑 | 昼 |
 * | `lakeport` | **帆引き船**(かすみがうら「風だけで曳く網」)と蓮田 | 湖の明るい水色 | 夕暮れ |
 * | `wetland` | **あやめと嫁入り舟**(潮来「舟で嫁ぐ町」) | 水路の苔緑 | 昼 |
 *
 * 水の色・水の形(広い水平線 / 崖下 / 港内 / 帯 / 湖面 / 細い水路)・時間の3つを
 * ずらしてあるので、並べても取り違えない。
 *
 * ⚠ **中央 x=151〜249 / y=54〜152 は都市のシンボルに隠れる。**
 *   帆引き船のような「その町の顔」は、ここに置くと何の絵か分からなくなる。
 *   `node scripts/check-city-backgrounds.mjs --hidden --src ibaraki-coast` で確認する。
 *
 * ⚠ **空は「次に来る塗りの開始y」まで塗り下ろす。**
 *   `node scripts/check-city-backgrounds.mjs --src ibaraki-coast`
 *
 * 茨城には動きの層(`city/scenes/ibaraki-*.tsx`)が無いので、
 * 他国のような「層が前提にしている座標」の制約はない。
 *
 * 詳しくは docs/50-authoring/12-city-background-guide.md。
 */

const W = 400;
const r1 = (v) => Math.round(v * 10) / 10;

function band(y, h, fill) {
  return `<rect x="0" y="${y}" width="${W}" height="${h}" fill="${fill}"/>`;
}

function ground(y, fill) {
  return `<rect x="0" y="${y}" width="${W}" height="${210 - y}" fill="${fill}"/>`;
}

/** 空を3枚重ねて階調にする。`to` は塗り下ろす深さ(= 次に来る塗りの開始y)。 */
function sky(to, top, mid, low) {
  return (
    band(0, r1(to * 0.5), top) +
    band(r1(to * 0.44), r1(to * 0.34), mid) +
    band(r1(to * 0.72), r1(to * 0.28 + 2), low)
  );
}

function sun(cx, cy, r, fill = "#f5b31c", halo = "#fdf0c8") {
  return `<circle cx="${cx}" cy="${cy}" r="${r1(r * 1.4)}" fill="${halo}" opacity=".18"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>`;
}

function shade(cx, cy, rx, ry, o = ".2") {
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#000" opacity="${o}"/>`;
}

function person(x, base, h, shirt, skin = "#e0b48a") {
  const hd = r1(h * 0.19);
  const top = r1(base - h + hd * 1.7);
  return (
    `<g><rect x="${r1(x - h * 0.09)}" y="${r1(base - h * 0.4)}" width="${r1(h * 0.08)}" height="${r1(h * 0.4)}" fill="#3f3428"/>` +
    `<rect x="${r1(x + h * 0.02)}" y="${r1(base - h * 0.4)}" width="${r1(h * 0.08)}" height="${r1(h * 0.4)}" fill="#3f3428"/>` +
    `<path d="M${r1(x - h * 0.16)},${top}h${r1(h * 0.32)}l${r1(h * 0.03)},${r1(h * 0.42)}h${r1(-h * 0.38)}z" fill="${shirt}"/>` +
    `<circle cx="${x}" cy="${r1(top - hd * 0.75)}" r="${hd}" fill="${skin}"/></g>`
  );
}

function arm(x, y, dx, dy, color = "#e0b48a", w = 3) {
  return `<path d="M${x},${y}l${dx},${dy}" stroke="${color}" stroke-width="${w}" stroke-linecap="round" fill="none"/>`;
}

/**
 * 水に浮かぶ舟。**さざ波を描いたあとに呼ぶこと。**
 * 平たい輪郭だけでは「水の上の物」か「水に空いた穴」かが決まらない。
 * 波を遮る(前後関係)/ 内側の面を見せる(容器)/ 映り込み(水の上)の3つで決まる。
 */
function boat(x, y, w, hull = "#6b4a2c", rim = "#c99a5c", trim = "#a8814c") {
  const h = r1(w * 0.18);
  return (
    `<g fill="${hull}" opacity=".2"><path d="M${r1(x - w * 0.36)},${r1(y + h + 1)}q${r1(w * 0.36)},${r1(h * 2.2)} ${r1(w * 0.72)},0z"/></g>` +
    `<path d="M${r1(x - w / 2)},${y}c${r1(w * 0.24)},${r1(-h * 0.7)} ${r1(w * 0.76)},${r1(-h * 0.7)} ${w},0c${r1(-w * 0.15)},${r1(h * 1.05)} ${r1(-w * 0.85)},${r1(h * 1.05)} ${-w},0z" fill="${hull}"/>` +
    `<path d="M${r1(x - w * 0.455)},${r1(y - 0.6)}c${r1(w * 0.22)},${r1(-h * 0.5)} ${r1(w * 0.69)},${r1(-h * 0.5)} ${r1(w * 0.91)},0c${r1(-w * 0.16)},${r1(h * 0.5)} ${r1(-w * 0.75)},${r1(h * 0.5)} ${r1(-w * 0.91)},0z" fill="${trim}"/>` +
    `<path d="M${r1(x - w / 2)},${y}c${r1(w * 0.24)},${r1(-h * 0.7)} ${r1(w * 0.76)},${r1(-h * 0.7)} ${w},0" stroke="${rim}" stroke-width="2" fill="none"/>`
  );
}

/** 朱の鳥居。海中に立てるので、脚を水面より下まで伸ばす。 */
function torii(x, base, w, h, fill = "#c2453c") {
  return (
    `<g fill="${fill}"><rect x="${r1(x - w / 2)}" y="${r1(base - h)}" width="${r1(w * 0.1)}" height="${h}"/>` +
    `<rect x="${r1(x + w / 2 - w * 0.1)}" y="${r1(base - h)}" width="${r1(w * 0.1)}" height="${h}"/>` +
    `<rect x="${r1(x - w / 2 - w * 0.1)}" y="${r1(base - h)}" width="${r1(w * 1.2)}" height="${r1(h * 0.12)}"/>` +
    `<rect x="${r1(x - w / 2)}" y="${r1(base - h * 0.76)}" width="${w}" height="${r1(h * 0.09)}"/></g>` +
    `<rect x="${r1(x - w / 2 - w * 0.13)}" y="${r1(base - h - h * 0.07)}" width="${r1(w * 1.26)}" height="${r1(h * 0.07)}" fill="#8f2f28"/>`
  );
}

/** 松。海辺の茨城はどこにでも生えている。平たい葉の塊を段に重ねる。 */
function pine(x, base, h, lean = 0, dark = false) {
  const a = dark ? "#27503a" : "#316642";
  const b = dark ? "#1d3f2d" : "#25523a";
  const parts = [
    `<path d="M${r1(x - 2.4)},${base}q${r1(lean * 0.3)},${r1(-h * 0.5)} ${r1(lean + 0.3)},${r1(-h * 0.94)}h3.4q${r1(-lean * 0.42)},${r1(h * 0.46)} ${r1(-lean * 0.04 + 1.6)},${r1(h * 0.94)}z" fill="#5f4628"/>`,
  ];
  for (const [t, off, rxf, ryf, fill] of [
    [0.52, -0.19, 0.32, 0.105, b],
    [0.68, 0.16, 0.26, 0.092, a],
    [0.83, -0.12, 0.2, 0.075, b],
    [0.96, 0.04, 0.13, 0.055, a],
  ]) {
    const cx = r1(x + lean * t + h * off);
    const cy = r1(base - h * t);
    const rx = h * rxf;
    const ry = h * ryf;
    parts.push(
      `<path d="M${r1(x + lean * t)},${cy}L${cx},${r1(cy + ry * 0.3)}" stroke="#5f4628" stroke-width="1.8" stroke-linecap="round" fill="none"/>`,
      `<path d="M${r1(cx - rx)},${cy}Q${r1(cx - rx * 0.62)},${r1(cy - ry * 1.9)} ${r1(cx - rx * 0.08)},${r1(cy - ry * 1.05)}` +
        `Q${r1(cx + rx * 0.44)},${r1(cy - ry * 2)} ${r1(cx + rx * 0.86)},${r1(cy - ry * 0.45)}` +
        `Q${r1(cx + rx * 1.06)},${r1(cy + ry * 0.62)} ${r1(cx + rx * 0.38)},${r1(cy + ry * 1)}` +
        `Q${r1(cx - rx * 0.42)},${r1(cy + ry * 1.35)} ${r1(cx - rx)},${cy}z" fill="${fill}"/>`,
    );
  }
  return parts.join("");
}

/** 白壁の蔵(河岸の町)。 */
function kura(x, base, w, h) {
  const top = r1(base - h);
  return (
    `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="#f0ece0"/>` +
    `<path d="M${r1(x - 6)},${top}h${r1(w + 12)}l${-5},${r1(-h * 0.26)}h${r1(-w - 2)}z" fill="#4a4438"/>` +
    `<rect x="${r1(x - 6)}" y="${top}" width="${r1(w + 12)}" height="3" fill="#33302a"/>` +
    `<rect x="${x}" y="${r1(base - h * 0.28)}" width="${w}" height="${r1(h * 0.28)}" fill="#3f3a32"/>` +
    `<rect x="${r1(x + w * 0.34)}" y="${r1(top + h * 0.3)}" width="${r1(w * 0.32)}" height="${r1(h * 0.3)}" fill="#6b6558"/>`
  );
}

/**
 * 花の株。**小さな花の頭を撒いて作る。**
 *
 * なめらかな楕円に明るい楕円と白点を載せる描き方を先に試したが、
 * **睡蓮の葉が浮いた水面**にしか見えなかった。「楕円 + 内側の明るい面 + 白い点」は
 * 水と反射の記号なので、花には使えない。
 * 粒を花の大きさまで小さくし、輪郭を崩すと草地になる。
 *
 * 散らし方は黄金角。決定性が要るので乱数は使わない。
 */
function flowerClump(cx, cy, rx, ry, n = 16, dark = "#5f82cc", light = "#93b2e8", tip = "#e2ecfb") {
  const parts = [];
  for (let i = 0; i < n; i++) {
    const a = i * 2.399963;
    const t = Math.sqrt((i + 0.6) / n);
    const x = r1(cx + Math.cos(a) * rx * t);
    const y = r1(cy + Math.sin(a) * ry * t);
    const r = r1(3.6 - t * 1.3);
    parts.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="${i % 3 === 0 ? light : dark}"/>`);
    if (i % 4 === 0) parts.push(`<circle cx="${x}" cy="${r1(y - r * 0.3)}" r="${r1(r * 0.42)}" fill="${tip}"/>`);
  }
  return parts.join("");
}

/** 水鳥(サギ)。長い脚と首。 */
function heron(x, base, s = 1) {
  const p = (v) => r1(v * s);
  return (
    `<g stroke="#c9a877" stroke-width="${p(1.4)}" fill="none" stroke-linecap="round"><path d="M${x - p(2)},${base}v${-p(9)}M${x + p(3)},${base}v${-p(9)}"/></g>` +
    `<ellipse cx="${x}" cy="${base - p(12)}" rx="${p(9)}" ry="${p(4.4)}" fill="#f6efe2"/>` +
    `<path d="M${x + p(6)},${base - p(14)}q${p(4)},${-p(8)} ${p(5)},${-p(13)}l${p(3)},${p(1)}q${-p(2)},${p(7)} ${-p(5)},${p(14)}z" fill="#f6efe2"/>` +
    `<path d="M${x + p(11)},${base - p(27)}l${p(6)},${p(1.6)}l${-p(6)},${p(2)}z" fill="#f0a83c"/>` +
    `<circle cx="${x + p(11)}" cy="${base - p(27)}" r="${p(0.9)}" fill="#3f3428"/>`
  );
}

// ---------------------------------------------------------------------------

export const IBARAKI_COAST_BG = {
  /**
   * 太平洋の外洋。**3都市が共用。**(大洗・北茨城・神栖)
   *
   * 決め手は**波間に立つ朱い鳥居**(大洗磯前神社)。日の出が名物なので朝焼けにする。
   * 岩の上の朱い堂(北茨城の六角堂)と、遠くの風車(神栖)も入れる。
   */
  seaside:
    sky(96, "#e8845a", "#f5b07a", "#fadcb0") +
    sun(304, 46, 16, "#f8703c") +
    `<g fill="#fadcb0" opacity=".5"><ellipse cx="96" cy="24" rx="34" ry="4.4"/><ellipse cx="70" cy="31" rx="21" ry="3.2"/><ellipse cx="212" cy="18" rx="26" ry="4"/></g>` +
    // 風車(神栖)。遠景の右に小さく
    `<g stroke="#d8cfc0" stroke-width="2.4" fill="none"><path d="M356,96V64M386,96V70"/></g>` +
    `<g stroke="#d8cfc0" stroke-width="2" fill="none" stroke-linecap="round"><path d="M356,64l-11,-7M356,64l12,-5M356,64l-1,13M386,70l-9,-6M386,70l10,-4M386,70l-1,11"/></g>` +
    // ── 海。外洋なので濃い
    band(96, 18, "#1f4f74") +
    band(112, 18, "#2a6b95") +
    band(128, 20, "#3585ab") +
    `<g stroke="#cfeaf6" stroke-width="2" opacity=".5" fill="none"><path d="M18,102h46M264,104h58M40,118h48M300,120h64M22,134h56M240,138h64"/></g>` +
    `<g stroke="#8fc4dc" stroke-width="2.6" opacity=".45" fill="none"><path d="M0,110q40,-5 80,0t80,0M232,126q40,-5 80,0t80,0"/></g>` +
    // ── 波間に立つ朱い鳥居(大洗)。**左に寄せる**
    `<path d="M56,150q14,-16 34,-16q22,0 36,16z" fill="#4f4a42"/>` +
    `<path d="M64,142q12,-10 26,-10q16,0 28,10z" fill="#6b6558"/>` +
    torii(92, 140, 54, 46) +
    `<g fill="#f2fafd" opacity=".8"><ellipse cx="60" cy="146" rx="14" ry="4.4"/><ellipse cx="126" cy="148" rx="12" ry="4"/></g>` +
    // ── 荒磯(右)と岩の上の朱い堂(北茨城の六角堂)
    `<path d="M288,152q12,-24 30,-22q12,1 18,12q14,-10 26,2q12,11 16,24z" fill="#5f5a50"/>` +
    `<path d="M298,152q10,-16 24,-14q10,1 16,9q10,-6 20,3z" fill="#7f7a70"/>` +
    `<g fill="#c2453c"><path d="M316,130h28l-14,-12z"/><rect x="320" y="130" width="20" height="12"/></g>` +
    `<rect x="318" y="129" width="24" height="3" fill="#8f2f28"/>` +
    `<g fill="#f2fafd" opacity=".85"><ellipse cx="284" cy="148" rx="13" ry="4.4"/><ellipse cx="376" cy="152" rx="11" ry="3.6"/></g>` +
    // ── 砂浜
    ground(148, "#dcc9a4") +
    `<path d="M0,150q40,-5 82,0q46,6 90,-2q48,-7 96,1q42,7 132,-3v8H0z" fill="#f2ede0" opacity=".8"/>` +
    `<path d="M0,164q56,-6 108,2q56,8 110,-2q54,-8 112,3q36,6 70,-1v10H0z" fill="#c9b083"/>` +
    `<g fill="#bda474"><ellipse cx="86" cy="192" rx="72" ry="9"/><ellipse cx="320" cy="202" rx="76" ry="9"/></g>` +
    pine(24, 170, 34, 5, true) +
    pine(56, 166, 26, 4) +
    // 沖の漁船(小さく、遠く)
    `<g fill="#3f5f6a"><rect x="248" y="106" width="34" height="6"/><rect x="262" y="99" width="7" height="7"/></g>` +
    `<rect x="248" y="104" width="34" height="2.4" fill="#8a4436"/>` +
    // 消波ブロックと防砂柵(茨城の海岸の顔)
    `<g fill="#9a958c"><path d="M112,150l8,-12h10l8,12zM136,152l7,-11h9l7,11zM252,150l8,-12h10l8,12z"/></g>` +
    `<g stroke="#8a6a44" stroke-width="2" fill="none" stroke-linecap="round">${[300, 312, 324, 336, 348]
      .map((x) => `<path d="M${x},172v-14"/>`)
      .join("")}</g>` +
    `<g stroke="#8a6a44" stroke-width="1.6" fill="none"><path d="M298,164h54M298,170h54"/></g>` +
    // 砂の足跡と貝
    `<g fill="#c9b083" opacity=".8">${[[96, 186], [108, 192], [120, 186], [132, 192], [144, 186]]
      .map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="4" ry="2.4"/>`)
      .join("")}</g>` +
    `<g fill="#f0e6d2"><ellipse cx="316" cy="192" rx="4.4" ry="2.6"/><ellipse cx="328" cy="196" rx="3.6" ry="2.2"/><ellipse cx="70" cy="200" rx="4" ry="2.4"/></g>` +
    // 波しぶき(磯にあたる)
    `<g fill="#f2fafd" opacity=".7"><ellipse cx="304" cy="142" rx="16" ry="5"/><ellipse cx="296" cy="136" rx="9" ry="3.4"/><ellipse cx="352" cy="146" rx="12" ry="4"/></g>` +
    // ── 磯の釣り人と、貝を拾う人。y>170 の中央は隠れない
    shade(196, 198, 11, 3, ".18") +
    person(194, 198, 21, "#5b8fe8") +
    arm(194, 185, 13, -7) +
    `<path d="M208,177l26,-12" stroke="#8a8578" stroke-width="1.2" fill="none"/>` +
    shade(248, 202, 10, 2.8, ".18") +
    person(246, 202, 19, "#e8443f") +
    arm(246, 191, 8, 8) +
    `<g fill="#f0e6d2"><ellipse cx="258" cy="203" rx="4" ry="2.4"/><ellipse cx="268" cy="206" rx="3.4" ry="2"/></g>` +
    `<g stroke="#4f7a4a" stroke-width="1.8" fill="none" stroke-linecap="round"><path d="M60,206v-10M67,207v-8M74,205v-11"/></g>`,

  /**
   * 五月に青くなる丘。**1都市専用。**(ひたちなか)
   *
   * ひたち海浜公園のネモフィラ。**空と同じ青が地面にもある**という珍しい配色が決め手で、
   * ほかの水辺5種とはっきり違う絵になる。海は丘の向こうに細く見せるだけ。
   */
  coasttown:
    // 丘の上端が y=104 まで下がるので、そこまで塗り下ろす
    sky(104, "#5f9fd8", "#93c6e6", "#cfe6f0") +
    `<circle cx="330" cy="26" r="15" fill="#f5b31c"/>` +
    `<g fill="#f6efe2" opacity=".6"><ellipse cx="110" cy="22" rx="34" ry="4.6"/><ellipse cx="84" cy="29" rx="21" ry="3.4"/><ellipse cx="240" cy="18" rx="26" ry="4"/></g>` +
    // 海(丘の向こうに細く)
    band(78, 14, "#2f7fa8") +
    `<g stroke="#bfe0f0" stroke-width="1.8" opacity=".5" fill="none"><path d="M20,84h48M280,86h58"/></g>` +
    // ── 青い花の丘。
    // **一面を青く塗ったら、水面にしか見えなかった。**平たい塗りの大きな青は水になる。
    // 直したのは3つ:
    //   ・**緑の地面を見せる**(花の塊のあいだに必ず green を通す)
    //   ・**粒を花の大きさにする**(大きな楕円をやめ、小さな塊を重ねる)
    //   ・**丘の稜線を青の上に出す**(斜面だと分かる)
    ground(92, "#6f9e5c") +
    `<path d="M0,104q60,-20 130,-12q66,8 130,-4q56,-11 140,10v112H0z" fill="#7fae66"/>` +
    `<path d="M0,150q70,-16 140,-4q66,11 132,-6q56,-14 128,14v56H0z" fill="#6f9e5c"/>` +
    // 花の株。**緑を必ず通しながら**撒く
    `<g>${[[20, 116, 26, 11], [58, 110, 22, 9], [96, 116, 24, 10], [132, 110, 20, 8], [272, 114, 24, 10], [308, 108, 22, 9], [346, 114, 26, 11], [384, 120, 20, 8]]
      .map(([x, y, rx, ry]) => flowerClump(x, y, rx, ry, 10))
      .join("")}</g>` +
    `<g>${[[12, 140, 28, 12], [52, 134, 24, 10], [92, 140, 26, 11], [130, 134, 22, 9], [278, 138, 26, 11], [318, 132, 24, 10], [358, 140, 26, 11]]
      .map(([x, y, rx, ry]) => flowerClump(x, y, rx, ry, 12))
      .join("")}</g>` +
    `<g>${[[30, 166, 30, 13], [76, 172, 26, 11], [292, 168, 28, 12], [346, 174, 26, 11]]
      .map(([x, y, rx, ry]) => flowerClump(x, y, rx, ry, 13))
      .join("")}</g>` +
    // 丘を分ける小径(斜面だと分かる手がかり)
    `<path d="M126,210q30,-46 62,-62q22,-11 48,-16l16,6q-34,10 -56,24q-30,20 -44,48z" fill="#dfd2b0"/>` +
    `<g stroke="#c9bda0" stroke-width="1.2" opacity=".7" fill="none"><path d="M150,210q26,-40 56,-56"/></g>` +
    // 手前の大きな株。緑の葉を下に敷いてから花を撒く
    `<g fill="#4f8544">${[[24, 200, 36], [76, 205, 32], [300, 203, 34], [358, 197, 30]]
      .map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r1(r * 0.4)}"/>`)
      .join("")}</g>` +
    `<g>${[[22, 196, 32, 13], [74, 201, 28, 11], [298, 199, 30, 12], [356, 193, 27, 11]]
      .map(([x, y, rx, ry]) => flowerClump(x, y, rx, ry, 16))
      .join("")}</g>` +
    // 花のあいだの草(緑を必ず通す)
    `<g stroke="#4f8544" stroke-width="1.6" fill="none" stroke-linecap="round">${[40, 110, 150, 258, 330, 372]
      .map((x, i) => `<path d="M${x},${128 + (i % 3) * 22}v${-8 - (i % 2) * 4}"/>`)
      .join("")}</g>` +
    // ── 丘を歩く人。**y>170 の中央は隠れない**
    shade(196, 190, 11, 3, ".16") +
    person(194, 190, 21, "#f0e6d2") +
    arm(194, 177, 12, -5) +
    shade(224, 196, 10, 2.8, ".16") +
    person(222, 196, 19, "#e8443f") +
    shade(146, 176, 9, 2.4, ".14") +
    person(145, 176, 17, "#f5b31c") +
    // 丘の上の木
    pine(346, 116, 26, -4) +
    pine(52, 112, 22, 3, true),

  /**
   * 漁港と工場の街。**2都市が共用。**(東海・日立)
   *
   * 決め手は**防波堤と漁船**、そして**工場の煙突と送電線**(日立「製作所」)。
   * 夕方にして、ほかの水辺と時間でも分ける。
   */
  harbourtown:
    sky(96, "#e2915a", "#f0b87a", "#f6d8ae") +
    sun(320, 40, 16, "#f2803c") +
    `<g fill="#f8dcb0" opacity=".45"><ellipse cx="120" cy="22" rx="32" ry="4.2"/><ellipse cx="96" cy="28" rx="20" ry="3"/></g>` +
    // ── 工場(遠景)。煙突・ガスタンク・送電線
    `<g fill="#6f6a62"><rect x="16" y="62" width="9" height="34"/><rect x="40" y="54" width="9" height="42"/><rect x="286" y="58" width="9" height="38"/></g>` +
    `<g fill="#c2453c"><rect x="16" y="66" width="9" height="5"/><rect x="40" y="58" width="9" height="5"/><rect x="286" y="62" width="9" height="5"/></g>` +
    `<g fill="#8a857c"><rect x="60" y="76" width="52" height="20"/><rect x="252" y="80" width="30" height="16"/></g>` +
    `<g fill="#9a958c"><ellipse cx="132" cy="84" rx="16" ry="12"/><ellipse cx="306" cy="86" rx="13" ry="10"/></g>` +
    `<g fill="#6f6a62"><rect x="116" y="84" width="32" height="12"/><rect x="293" y="86" width="26" height="10"/></g>` +
    // 送電線
    `<g stroke="#6f6a62" stroke-width="2" fill="none"><path d="M172,96V50M340,96V56"/></g>` +
    `<g stroke="#6f6a62" stroke-width="1.4" fill="none"><path d="M162,58h20M164,66h16M330,64h20M332,72h16"/></g>` +
    `<g stroke="#6f6a62" stroke-width="1" fill="none"><path d="M172,54q84,14 168,4M172,62q84,14 168,4"/></g>` +
    // ── 港内の水(灰青)。外洋より暗く、静か
    band(96, 16, "#35596e") +
    band(112, 18, "#3f6a80") +
    band(130, 14, "#4a7a90") +
    `<g stroke="#bfd8e4" stroke-width="2" opacity=".4" fill="none"><path d="M24,102h44M300,104h56M60,120h40M320,124h58"/></g>` +
    `<g fill="#f0b87a" opacity=".25"><rect x="292" y="96" width="56" height="48"/></g>` +
    // ── 防波堤(赤白の小灯台つき)
    `<path d="M0,132h150v10H0z" fill="#8a857c"/>` +
    `<path d="M0,142h144v6H0z" fill="#6f6a62"/>` +
    `<g fill="#7f7a72">${[10, 40, 70, 100, 130].map((x) => `<rect x="${x}" y="126" width="12" height="7"/>`).join("")}</g>` +
    `<rect x="136" y="106" width="10" height="26" fill="#f2ede0"/>` +
    `<g fill="#e8443f"><rect x="136" y="112" width="10" height="6"/><rect x="136" y="124" width="10" height="6"/></g>` +
    `<path d="M134,106h14l-3,-6h-8z" fill="#3a4453"/>` +
    // ── 岸壁
    ground(144, "#7f7a72") +
    `<rect x="0" y="144" width="400" height="6" fill="#9a958c"/>` +
    `<rect x="0" y="150" width="400" height="3" fill="#6f6a62"/>` +
    `<g fill="#5f5a52">${[30, 96, 168, 240, 306, 372].map((x) => `<rect x="${x}" y="138" width="8" height="6" rx="3"/>`).join("")}</g>` +
    // ── 漁船(係留)。**さざ波の後に描いて、波を遮らせる**
    boat(60, 132, 56, "#2f3a48", "#d8b06a", "#8a5a3c") +
    `<rect x="52" y="116" width="16" height="12" fill="#f0e6d2"/>` +
    `<rect x="58" y="104" width="4" height="12" fill="#e8443f"/>` +
    `<g stroke="#8a8578" stroke-width="1" fill="none"><path d="M60,104v-4M44,132l-8,-6M76,132l8,-6"/></g>` +
    boat(310, 136, 44, "#2f3a48", "#d8b06a", "#8a5a3c") +
    `<rect x="304" y="124" width="13" height="10" fill="#f0e6d2"/>` +
    `<rect x="308" y="114" width="3.4" height="10" fill="#5b8fe8"/>` +
    // ── 干物の棚と網(漁港の顔)
    `<g stroke="#6b5330" stroke-width="3" fill="none" stroke-linecap="round"><path d="M292,196v-30M356,196v-30M290,166h68"/></g>` +
    `<g fill="#e8c47a">${[298, 310, 322, 334, 346].map((x, i) => `<path d="M${x},168q5,10 0,20q-5,-10 0,-20z" opacity="${i % 2 ? ".9" : "1"}"/>`).join("")}</g>` +
    `<path d="M16,196h64v-22q-32,-8 -64,0z" fill="#5f8a72" opacity=".55"/>` +
    `<g stroke="#3f6a54" stroke-width="1" opacity=".8" fill="none"><path d="M28,174v22M44,172v24M60,174v22M16,182h64M16,190h64"/></g>` +
    // ── 荷揚げの人と魚箱。**y>170 の中央は隠れない**
    `<g fill="#8fa8bc"><rect x="150" y="188" width="30" height="12"/><rect x="154" y="178" width="24" height="10"/><rect x="186" y="190" width="28" height="11"/></g>` +
    `<g stroke="#5f7a8c" stroke-width="1.2" fill="none"><path d="M150,194h30M154,183h24M186,196h28"/></g>` +
    shade(228, 200, 11, 3, ".2") +
    person(226, 200, 22, "#e8443f") +
    arm(226, 186, -12, 4) +
    shade(120, 198, 10, 2.8, ".2") +
    person(118, 198, 20, "#f0e6d2") +
    arm(118, 187, 11, 5) +
    // かもめ
    `<g stroke="#5f5548" stroke-width="1.6" fill="none" stroke-linecap="round"><path d="M196,44q5,-5 10,0q5,-5 10,0M236,32q4,-4 8,0q4,-4 8,0"/></g>`,

  /**
   * 利根川の河岸。**3都市が共用。**(取手・常総・境)
   *
   * 決め手は**緑の土手と渡し舟**。「大河の手前の宿」「川の荷が折り返した河岸」なので、
   * 川に沿って白壁の蔵を並べる。水は川の茶緑。海のシーンとは水の形(帯)で分ける。
   */
  riverport:
    // 遠景の稜線が y=96 まで下がる
    sky(100, "#6aa8dc", "#9ccbe8", "#d4e6ec") +
    `<circle cx="330" cy="26" r="14" fill="#f5b31c"/>` +
    `<g fill="#f6efe2" opacity=".55"><ellipse cx="104" cy="22" rx="32" ry="4.4"/><ellipse cx="80" cy="28" rx="20" ry="3.2"/></g>` +
    // 筑波山(茨城の遠景といえばこれ)
    `<path d="M226,92L272,50L286,58L300,50L346,92z" fill="#8fa4b8"/>` +
    `<path d="M272,50L286,58L300,50L312,64q-26,8 -52,0z" fill="#7f93a8"/>` +
    `<path d="M0,96L40,74L88,90L136,72L184,94L226,80L268,94L320,78L368,92L400,84V110H0z" fill="#6f8a76" opacity=".8"/>` +
    // 鉄橋(遠景)
    `<g stroke="#8a857c" stroke-width="2.4" fill="none"><path d="M0,104h150"/></g>` +
    `<g stroke="#8a857c" stroke-width="1.6" fill="none"><path d="M10,104l14,-12l14,12l14,-12l14,12l14,-12l14,12l14,-12l14,12"/></g>` +
    `<g fill="#6f6a62"><rect x="36" y="104" width="5" height="16"/><rect x="106" y="104" width="5" height="16"/></g>` +
    // ── 土手(緑の堤防が横に長く)
    ground(96, "#7fa464") +
    `<path d="M0,116q70,-14 140,-2q66,11 132,-4q56,-13 128,6v20H0z" fill="#6f9e5c"/>` +
    // ── 川(帯。茶緑)
    band(134, 16, "#5f7a58") +
    band(148, 18, "#6b8760") +
    `<g stroke="#a8c49a" stroke-width="2" opacity=".5" fill="none"><path d="M22,140h48M280,142h58M60,154h44M300,158h60"/></g>` +
    // 葦原(川べり)
    `<g stroke="#8a9a52" stroke-width="1.8" fill="none" stroke-linecap="round">${[8, 16, 24, 32, 40, 356, 364, 372, 380, 388]
      .map((x, i) => `<path d="M${x},136v${-10 - (i % 3) * 4}"/>`)
      .join("")}</g>` +
    // ── 河岸の蔵(白壁)
    kura(20, 134, 44, 30) +
    kura(74, 134, 34, 24) +
    kura(318, 134, 38, 27) +
    kura(364, 134, 30, 22) +
    // 荷揚げの石段
    `<path d="M118,150h48l-6,-16h-36z" fill="#9a968c"/>` +
    `<g stroke="#8a8880" stroke-width="1.2" opacity=".7" fill="none"><path d="M122,144h40M126,138h32"/></g>` +
    // ── 渡し舟。**さざ波の後に描く**。
    // x=210 に置いたら **100%シンボルに隠れていた**(`--hidden` が拾った)。
    // 川の絵で舟が消えるのは致命的なので右へ寄せる。
    boat(274, 152, 62, "#5f4227", "#d8b06a") +
    `<path d="M274,150v-16" stroke="#4a3a24" stroke-width="2" fill="none"/>` +
    `<path d="M276,136l12,14h-12z" fill="#f0e6d2"/>` +
    person(256, 150, 17, "#5b8fe8") +
    arm(256, 140, 13, -7) +
    // ── 手前の河川敷
    ground(166, "#6f9e5c") +
    `<path d="M0,176q70,-10 138,2q66,12 132,-4q54,-12 130,4v32H0z" fill="#5f8a52"/>` +
    `<g fill="#4f7a44"><ellipse cx="30" cy="200" rx="30" ry="9"/><ellipse cx="368" cy="198" rx="28" ry="9"/></g>` +
    // 土手を歩く人と自転車。**y>170 の中央は隠れない**
    shade(196, 194, 11, 3, ".16") +
    person(194, 194, 21, "#e8443f") +
    arm(194, 181, 12, 4) +
    shade(232, 198, 10, 2.8, ".16") +
    person(230, 198, 19, "#f0e6d2") +
    `<g stroke="#3f3428" stroke-width="1.6" fill="none"><circle cx="120" cy="196" r="6"/><circle cx="142" cy="196" r="6"/><path d="M120,196l10,-9h8l4,9M130,187v-5h6"/></g>` +
    `<g stroke="#8a9a52" stroke-width="1.8" fill="none" stroke-linecap="round"><path d="M292,204v-10M299,205v-8M306,203v-11"/></g>`,

  /**
   * 霞ヶ浦。**2都市が共用。**(土浦・かすみがうら)
   *
   * 決め手は**帆引き船**(「風だけで曳く網」)。霞ヶ浦の顔なので、
   * **中央に置くとシンボルに隠れて何の絵か分からなくなる。左に大きく寄せる。**
   * 湖なので水は明るく穏やかにし、夕暮れにして海のシーンと分ける。蓮田も入れる。
   */
  lakeport:
    sky(92, "#e8a878", "#f2c894", "#f8e0bc") +
    sun(318, 44, 18, "#f2803c") +
    `<g fill="#fae8c8" opacity=".45"><ellipse cx="104" cy="22" rx="34" ry="4.4"/><ellipse cx="78" cy="29" rx="21" ry="3.2"/></g>` +
    // 対岸(低く、霞ませる)
    `<path d="M0,92q60,-8 124,-2q66,7 134,-3q58,-9 142,3v10H0z" fill="#8a8f9a" opacity=".7"/>` +
    // ── 湖面(明るく、穏やか)。夕日の帯を落とす
    band(92, 18, "#4f92b0") +
    band(108, 20, "#5fa4bc") +
    band(126, 24, "#6fb4c8") +
    `<g fill="#f2c894" opacity=".3"><path d="M296,92h44v58h-44z"/></g>` +
    `<g stroke="#cfeaf2" stroke-width="2" opacity=".45" fill="none"><path d="M20,100h48M256,102h58M44,116h44M300,120h64M24,136h56M240,140h64"/></g>` +
    // ── 帆引き船。**左に大きく1隻、右に小さく1隻**(中央は隠れる)
    boat(80, 146, 76, "#5f4227", "#d8b06a") +
    `<path d="M80,142V78" stroke="#4a3a24" stroke-width="2.6" fill="none"/>` +
    `<path d="M46,80h68v56q-34,8 -68,0z" fill="#f6f2e6"/>` +
    `<g stroke="#d8d0bc" stroke-width="1.2" opacity=".9" fill="none"><path d="M60,80v54M76,80v56M92,80v55M108,80v53"/></g>` +
    `<path d="M46,80h68v5H46z" fill="#c9bda0"/>` +
    `<g fill="#4f4436" opacity=".22"><path d="M46,150q34,10 68,0v6q-34,9 -68,0z"/></g>` +
    boat(316, 138, 40, "#5f4227", "#d8b06a") +
    `<path d="M316,136V104" stroke="#4a3a24" stroke-width="1.8" fill="none"/>` +
    `<path d="M298,106h36v28q-18,5 -36,0z" fill="#f6f2e6"/>` +
    `<g stroke="#d8d0bc" stroke-width="1" opacity=".9" fill="none"><path d="M308,106v28M320,106v28"/></g>` +
    // 杭とワカサギの網
    `<g stroke="#6b5330" stroke-width="2.4" fill="none" stroke-linecap="round"><path d="M148,150v-16M168,152v-14M256,148v-16M276,150v-14"/></g>` +
    `<g stroke="#8a9a72" stroke-width="1" opacity=".7" fill="none"><path d="M148,138h20M256,134h20"/></g>` +
    // ── 岸と蓮田
    ground(150, "#6f9e5c") +
    `<path d="M0,160q70,-8 138,2q66,10 132,-4q54,-10 130,4v48H0z" fill="#5f8a52"/>` +
    `<g fill="#3f7a4a">${[[22, 178], [56, 184], [90, 180], [124, 186], [286, 182], [320, 188], [354, 182], [386, 190], [40, 200], [80, 204], [300, 202], [340, 206]]
      .map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="17" ry="7"/>`)
      .join("")}</g>` +
    `<g fill="#4f9060">${[[18, 175], [52, 181], [86, 177], [282, 179], [316, 185], [350, 179]]
      .map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="7" ry="3"/>`)
      .join("")}</g>` +
    `<g fill="#f0a0bc"><ellipse cx="64" cy="176" rx="4" ry="6"/><ellipse cx="330" cy="180" rx="3.6" ry="5.4"/></g>` +
    // ── 岸の人。**y>170 の中央は隠れない**
    shade(200, 196, 11, 3, ".18") +
    person(198, 196, 21, "#f0e6d2") +
    arm(198, 183, 13, -6) +
    shade(232, 200, 10, 2.8, ".18") +
    person(230, 200, 19, "#5b8fe8") +
    heron(158, 190, 0.9),

  /**
   * 水郷のあやめ。**2都市が共用。**(潮来・稲敷)
   *
   * 決め手は**あやめと嫁入り舟**(「舟で嫁ぐ町」)。水は細い水路にして、
   * 広い水面の5種と形で分ける。水の色も苔緑にする。
   */
  wetland:
    // 遠景の林は y=88 から上へ14まで振れる。振れ幅ぶん下まで敷く
    sky(106, "#7fb8dc", "#a8cfe4", "#dcecec") +
    `<circle cx="336" cy="24" r="14" fill="#f5b31c"/>` +
    `<g fill="#f6efe2" opacity=".55"><ellipse cx="110" cy="20" rx="32" ry="4.4"/><ellipse cx="86" cy="26" rx="20" ry="3.2"/></g>` +
    // 遠景の低い林
    `<path d="M0,88q40,-14 84,-6q46,8 92,-4q48,-12 96,2q46,13 128,-2v22H0z" fill="#5f8a5c"/>` +
    `<g fill="#4f7a4c">${[26, 70, 118, 166, 214, 262, 310, 358]
      .map((x, i) => `<ellipse cx="${x}" cy="${84 + (i % 3) * 4}" rx="24" ry="10"/>`)
      .join("")}</g>` +
    // 柳(水郷の木)
    `<path d="M46,140v-42" stroke="#6b5330" stroke-width="3.4" stroke-linecap="round" fill="none"/>` +
    `<g fill="#6f9e5c"><ellipse cx="46" cy="94" rx="26" ry="11"/></g>` +
    `<g stroke="#7fae62" stroke-width="1.6" fill="none" stroke-linecap="round">${[26, 34, 42, 50, 58, 66]
      .map((x, i) => `<path d="M${x},98q-2,14 1,${22 + (i % 3) * 6}"/>`)
      .join("")}</g>` +
    // ── 岸(葦と草地)
    ground(104, "#6f9e5c") +
    `<path d="M0,120q70,-10 138,2q66,11 132,-4q54,-12 130,4v30H0z" fill="#5f8a52"/>` +
    // ── 細い水路(蛇行させる。ここが海・湖との違い)
    `<path d="M0,152q56,10 112,2q60,-9 118,4q58,12 170,0v22q-112,12 -170,0q-58,-12 -118,-3q-56,8 -112,-3z" fill="#4f7a5c"/>` +
    `<path d="M0,156q56,9 112,1q60,-8 118,4q58,11 170,0v10q-112,11 -170,0q-58,-11 -118,-3q-56,7 -112,-2z" fill="#5f8f6a"/>` +
    `<g stroke="#a8c8a4" stroke-width="1.6" opacity=".55" fill="none"><path d="M22,160h44M292,164h58"/></g>` +
    // ── あやめの群生(紫)
    `<g stroke="#4f8544" stroke-width="1.8" fill="none" stroke-linecap="round">${[10, 20, 30, 40, 50, 60, 70, 330, 340, 350, 360, 370, 380, 390]
      .map((x, i) => `<path d="M${x},150v${-16 - (i % 3) * 5}"/>`)
      .join("")}</g>` +
    `<g fill="#7a5aa8">${[14, 26, 38, 50, 62, 334, 346, 358, 370, 382]
      .map((x, i) => `<path d="M${x},${132 - (i % 3) * 4}q5,-8 10,0q-5,5 -10,0z"/>`)
      .join("")}</g>` +
    `<g fill="#f5b31c">${[19, 31, 43, 55, 339, 351, 363, 375].map((x, i) => `<circle cx="${x}" cy="${131 - (i % 3) * 4}" r="1.6"/>`).join("")}</g>` +
    // ── 木の橋
    `<path d="M96,146q52,-14 104,0v5q-52,-12 -104,0z" fill="#8a6a44"/>` +
    `<g stroke="#6b5330" stroke-width="2" fill="none"><path d="M104,150v14M188,150v14"/></g>` +
    `<g stroke="#a8813c" stroke-width="1.4" fill="none"><path d="M100,140q50,-13 100,0"/></g>` +
    // ── 嫁入り舟。**y>170 の中央は隠れないので、ここを主役にする**
    boat(196, 194, 78, "#5f4227", "#d8b06a") +
    `<g fill="#f6f2e6"><path d="M176,188q10,-14 22,0l2,6h-26z"/></g>` +
    `<circle cx="187" cy="176" r="5.4" fill="#e0b48a"/>` +
    `<path d="M180,174q7,-8 14,0q-7,3 -14,0z" fill="#f6f2e6"/>` +
    `<g fill="#c2453c"><path d="M182,190h12l1,4h-14z"/></g>` +
    person(224, 190, 20, "#3f5f8c") +
    `<path d="M224,178l14,-16" stroke="#8a6a44" stroke-width="2" stroke-linecap="round" fill="none"/>` +
    shade(196, 200, 40, 5, ".14") +
    // ── 水鳥と手前の葦
    heron(288, 172, 1) +
    heron(120, 180, 0.75) +
    `<g stroke="#6f9e5c" stroke-width="2" fill="none" stroke-linecap="round">${[16, 26, 36, 356, 366, 376]
      .map((x, i) => `<path d="M${x},208v${-14 - (i % 3) * 6}"/>`)
      .join("")}</g>` +
    `<g fill="#8a9a52">${[16, 26, 36, 356, 366, 376].map((x, i) => `<ellipse cx="${x}" cy="${192 - (i % 3) * 6}" rx="2.4" ry="6"/>`).join("")}</g>`,
};
