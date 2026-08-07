/**
 * インドの背景シーンの描き足し版(試作)。
 *
 * `art.mjs` の背景は平均28要素で、空・遠景・地面の3層しかない。同じ背景を
 * 最大11都市が共用しているため、その11都市がまったく同じ絵になる。
 * ここでは層を増やし(空の階調・遠景・中景・近景・最前景の5層)、人と生きものを
 * 置いて、フランス(平均98要素)と同じ密度まで持ち上げる。
 *
 * **中央 x=151〜249 / y=54〜152 には都市のシンボルが 4.1倍で重なる**
 * (`city-art.tsx` の `s=4.1` / `gy=152`)。影の楕円も (200,155) rx=53 に載る。
 * この帯には細かいものを置かない。
 *
 * 座標系は `art.mjs` と同じ 400×210。動きは含めない(React側で重ねる)。
 */

const W = 400;

/** 小数の桁を抑える(SVGを読みやすく保つため)。 */
const r1 = (v) => Math.round(v * 10) / 10;

function band(y, h, fill) {
  return `<rect x="0" y="${y}" width="${W}" height="${h}" fill="${fill}"/>`;
}

function ground(y, fill) {
  return `<rect x="0" y="${y}" width="${W}" height="${210 - y}" fill="${fill}"/>`;
}

/**
 * 空を3枚重ねて階調にする。`art.mjs` の `sky()` は2枚で y=118 までしか塗らず、
 * 地面の開始位置との間に**塗り残しの帯**ができていた(インドは13種中8種で発生。
 * gopuram では32px)。ここでは地面の開始位置 `to` まで必ず塗る。
 */
function skyTo(to, top, mid, low) {
  return band(0, r1(to * 0.52), top) + band(r1(to * 0.46), r1(to * 0.34), mid) + band(r1(to * 0.74), r1(to * 0.26 + 2), low);
}

/**
 * 太陽。にじみの輪は `r*1.7` / opacity .16 だと**もう1つの雲に見えた**ので、
 * 近く・薄くしてある。
 */
function sun(cx, cy, r, fill = "#f5b31c", halo = "#ffffff") {
  return `<circle cx="${cx}" cy="${cy}" r="${r1(r * 1.28)}" fill="${halo}" opacity=".1"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>`;
}

/** うろこ雲。低くたなびく細い雲を数枚。 */
function streakClouds(rows) {
  const parts = [];
  for (const [x, y, w, h, o] of rows) {
    parts.push(`<ellipse cx="${x}" cy="${y}" rx="${w}" ry="${h}" fill="#f6efe2" opacity="${o}"/>`);
  }
  return `<g>${parts.join("")}</g>`;
}

/** 人。棒ではなく塗りで、20px前後。腕の角度と持ちものだけ変える。 */
function person(x, base, h, shirt, skin = "#8a6440", lean = 0) {
  const hd = r1(h * 0.19);
  const bodyTop = r1(base - h + hd * 1.7);
  return (
    `<g transform="translate(${x},0) rotate(${lean},0,${base})">` +
    `<rect x="${r1(-h * 0.09)}" y="${r1(base - h * 0.42)}" width="${r1(h * 0.08)}" height="${r1(h * 0.42)}" fill="#3f3428"/>` +
    `<rect x="${r1(h * 0.02)}" y="${r1(base - h * 0.42)}" width="${r1(h * 0.08)}" height="${r1(h * 0.42)}" fill="#3f3428"/>` +
    `<path d="M${r1(-h * 0.16)},${bodyTop}h${r1(h * 0.32)}l${r1(h * 0.03)},${r1(h * 0.44)}h${r1(-h * 0.38)}z" fill="${shirt}"/>` +
    `<circle cx="0" cy="${r1(bodyTop - hd * 0.75)}" r="${hd}" fill="${skin}"/>` +
    `</g>`
  );
}

/** 腕。人とは別に描くと、引く・担ぐ・指すが作り分けられる。 */
function arm(x, y, dx, dy, color, wdt = 3) {
  return `<path d="M${x},${y}l${dx},${dy}" stroke="${color}" stroke-width="${wdt}" stroke-linecap="round" fill="none"/>`;
}

/** 接地の影。物の下に敷くと浮かなくなる。 */
function shade(cx, cy, rx, ry, o = ".22") {
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#000" opacity="${o}"/>`;
}

/**
 * 椰子の葉。**中肋に小葉(羽)を1枚ずつ生やす**。
 *
 * 2回外している。細い線を放射状に並べたら針葉樹の枝に見え、
 * なめらかな輪郭の葉身1枚にしたらバナナの葉に見えた。
 * 椰子だと分かるのは羽の切れ込みなので、小葉を実際に別々の図形として置く。
 */
function frond(x, y, dir, scale, fill = "#2f7d3f", shadow = "#1f5f34") {
  const s = scale;
  const d = dir;
  const L = 82 * s;
  /** 中肋上の点(先へ行くほど垂れる)。 */
  const spine = (t) => [L * d * t, 34 * s * t * t - 9 * s * t];
  const parts = [];
  const [ex, ey] = spine(1);
  const [mx, my] = spine(0.5);
  parts.push(
    `<path d="M0,0Q${r1(mx)},${r1(my - 5 * s)} ${r1(ex)},${r1(ey)}" stroke="${shadow}" stroke-width="${r1(2.4 * s)}" fill="none" stroke-linecap="round"/>`,
  );
  for (let i = 0; i < 9; i++) {
    const t = 0.06 + i * 0.108;
    const [px, py] = spine(t);
    const [nx, ny] = spine(Math.min(1, t + 0.06));
    // 中肋の向き(小葉はここから後ろへ 50度ほど倒す)
    const ang = Math.atan2(ny - py, nx - px);
    const ln = (23 - 12 * t) * s;
    const wd = (4.6 - 1.8 * t) * s;
    for (const side of [-1, 1]) {
      const a = ang + side * 0.92 * d;
      const tx = px + Math.cos(a) * ln;
      const ty = py + Math.sin(a) * ln;
      // 小葉を紡錘形に(付け根から先へ、片側だけ膨らませる)
      const bx = px + Math.cos(a + side * 1.4) * wd;
      const by = py + Math.sin(a + side * 1.4) * wd;
      const cx = px + Math.cos(a) * ln * 0.55 + Math.cos(a + side * 1.57) * wd * 1.5;
      const cy = py + Math.sin(a) * ln * 0.55 + Math.sin(a + side * 1.57) * wd * 1.5;
      parts.push(
        `<path d="M${r1(px)},${r1(py)}Q${r1(cx)},${r1(cy)} ${r1(tx)},${r1(ty)}L${r1(bx)},${r1(by)}z" fill="${side === -1 ? fill : shadow}"/>`,
      );
    }
  }
  return `<g transform="translate(${x},${y})">${parts.join("")}</g>`;
}

/** 椰子の木(しなった幹・葉6枚・実)。 */
function palm(x, base, h, lean = 0, fill = "#2f7d3f") {
  const top = r1(base - h);
  const tx = r1(x + lean);
  const parts = [
    `<path d="M${r1(x - 5)},${base}q${r1(lean * 0.35)},${r1(-h * 0.55)} ${r1(lean - 1)},${r1(-h)}h7q${r1(-lean * 0.5 + 1)},${r1(h * 0.45)} ${r1(-lean * 0.08 + 3)},${h}z" fill="#7a5f38"/>`,
    `<g stroke="#5f4a2c" stroke-width="1.2" opacity=".6" fill="none"><path d="M${r1(x - 4)},${r1(base - h * 0.2)}h7M${r1(x - 3)},${r1(base - h * 0.4)}h7M${r1(x - 2)},${r1(base - h * 0.6)}h7M${r1(x - 1)},${r1(base - h * 0.8)}h6"/></g>`,
  ];
  const s = h / 150;
  // 葉を左右で `dir` を替えて生やしたら樹冠が片寄った。すべて `dir=1` のまま
  // 回転だけで一周ぶん配るほうが、まんべんなく開いた樹冠になる。
  for (const rot of [-152, -112, -72, -32, 12, 52]) {
    parts.push(`<g transform="rotate(${rot},${tx},${top})">${frond(tx, top, 1, s, fill)}</g>`);
  }
  // 実は小さく、樹冠の下に隠す。大きく3つ並べたら幹の上の顔に見えた。
  parts.push(
    `<g fill="#8a6a3c"><circle cx="${r1(tx - 4)}" cy="${r1(top + 5)}" r="2.4"/><circle cx="${r1(tx + 3)}" cy="${r1(top + 6)}" r="2.1"/></g>`,
    `<circle cx="${tx}" cy="${top}" r="${r1(h * 0.024 + 1.6)}" fill="#6b5330"/>`,
  );
  return parts.join("");
}

// ---------------------------------------------------------------------------

export const INDIA_BG_RICH = {
  /**
   * アラビア海側の港町(ケーララ〜ゴア)。**11都市が共用する、game内で最多の背景。**
   *
   * 層: 空(3階調)/ 対岸の岬と丘の教会 / 沖の貨物船 / 海(2階調)/ 中華網の櫓 /
   * ダウ船 / 波打ち際 / 浜の人と魚市 / 最前景の椰子。
   */
  arabianport:
    // ── 空(朝の海風。水平線ぎわが白ばむ)
    skyTo(104, "#5f9fd0", "#93c6e6", "#dbe6e4") +
    sun(330, 30, 15) +
    streakClouds([
      [88, 26, 30, 5, ".85"],
      [66, 33, 20, 3.4, ".7"],
      [150, 20, 24, 4, ".6"],
      [268, 44, 34, 4.6, ".55"],
      [212, 34, 18, 3, ".5"],
    ]) +
    // ── 遠景: 対岸の岬。丘の上にゴアの白い教会
    `<path d="M0,104V86q22,-10 46,-6q26,4 40,10q18,7 30,14z" fill="#5f7a5c"/>` +
    `<path d="M0,104V93q20,-8 42,-5q24,3 36,9z" fill="#6f8a66" opacity=".8"/>` +
    `<g fill="#f2ede0"><rect x="30" y="70" width="17" height="16"/><path d="M27,70h23l-11.5,-11z"/><rect x="36.5" y="53" width="4" height="7"/></g>` +
    `<rect x="35" y="76" width="4" height="10" fill="#8a7f66"/>` +
    `<path d="M400,104V90q-30,-8 -58,-4q-26,4 -42,10q-12,4 -20,8z" fill="#5f7a5c"/>` +
    `<g fill="#4f6a4c"><ellipse cx="352" cy="90" rx="10" ry="6"/><ellipse cx="372" cy="93" rx="8" ry="5"/></g>` +
    // ── 沖の貨物船(小さく、遠く)。
    // 最初 x=176 に置いたらシンボル(x=151〜249)の真後ろで完全に消えたので右へ寄せた
    `<g fill="#4a5566" opacity=".7"><rect x="252" y="96" width="46" height="7"/><rect x="272" y="88" width="8" height="8"/><rect x="258" y="91" width="7" height="5"/><rect x="284" y="91" width="7" height="5"/></g>` +
    // ── 海(沖は濃く、手前は明るく)
    band(104, 20, "#1f6f95") +
    band(122, 20, "#2b85a8") +
    band(140, 16, "#3f9bbc") +
    `<g stroke="#bfe8f4" stroke-width="2" opacity=".55" fill="none"><path d="M18,112h56M104,109h40M258,113h64M340,110h44M60,120h50M180,122h58M292,124h72M24,131h68M126,134h44M246,132h58M348,136h40M74,143h56M282,146h70"/></g>` +
    `<g stroke="#7fc4dc" stroke-width="2.4" opacity=".5" fill="none"><path d="M0,117q40,-5 80,0t80,0M240,127q40,-5 80,0t80,0"/></g>` +
    // ── 浜(波打ち際の泡 → 濡れた砂 → 乾いた砂)
    ground(154, "#e2caa0") +
    `<path d="M0,156q34,-6 70,-1q40,6 78,-2q42,-8 84,1q44,8 84,-2q26,-6 84,1v9H0z" fill="#f2ede0" opacity=".85"/>` +
    `<path d="M0,166q50,-5 96,2q52,8 104,-2q52,-9 104,2q42,8 96,0v10H0z" fill="#d8bd8e"/>` +
    `<g fill="#cdb083"><ellipse cx="120" cy="196" rx="70" ry="9"/><ellipse cx="330" cy="204" rx="76" ry="9"/></g>` +
    // ── 中華網(4本脚の櫓・腕木・吊り錘・網・渡し板)
    `<g stroke="#4a3a24" stroke-width="3.4" fill="none" stroke-linecap="round"><path d="M46,150v-52M74,150v-46M32,150l14,-52M92,150l-18,-46"/></g>` +
    `<path d="M46,98l-40,30M46,98l52,32" stroke="#4a3a24" stroke-width="3" fill="none" stroke-linecap="round"/>` +
    `<path d="M46,98v-16" stroke="#4a3a24" stroke-width="3" fill="none"/>` +
    `<path d="M6,128h92l-46,26z" fill="#7fa88f" opacity=".62"/>` +
    `<g stroke="#5f8a72" stroke-width="1" opacity=".8" fill="none"><path d="M14,132l32,20M30,128l18,25M62,128l-14,25M80,130l-30,22M20,136h58M34,144h30"/></g>` +
    `<g fill="#5a4630"><circle cx="46" cy="86" r="4.4"/><circle cx="38" cy="80" r="3.6"/><circle cx="54" cy="80" r="3.6"/></g>` +
    `<g fill="#8a6a3c"><rect x="18" y="150" width="86" height="4"/><rect x="24" y="154" width="4" height="12"/><rect x="94" y="154" width="4" height="12"/></g>` +
    // 網を巻く人(櫓の上の板に立つ)
    person(70, 150, 20, "#e0dbcd") +
    arm(70, 138, -9, -6, "#8a6440", 3) +
    // ── ダウ船(三角帆)。帆の重なりで奥行きを出す
    shade(310, 150, 40, 5, ".18") +
    `<path d="M266,138h84l-10,14h-64z" fill="#6b4a2c"/>` +
    `<path d="M270,138h76l-4,6h-68z" fill="#8a6440"/>` +
    `<path d="M300,138V88" stroke="#4a3a24" stroke-width="3" fill="none"/>` +
    `<path d="M302,92l30,44h-30z" fill="#f6efe2"/>` +
    `<path d="M298,100l-24,36h24z" fill="#e2d8c2"/>` +
    `<path d="M300,88l12,4l-12,4z" fill="#e8443f"/>` +
    person(284, 138, 16, "#5b8fe8") +
    // 中景の小舟(小さく、奥に)
    `<path d="M108,146c11,-5 37,-5 46,0c-7,7 -39,7 -46,0z" fill="#7a5a34"/>` +
    `<path d="M130,145v-16l14,16z" fill="#e2d8c2"/>` +
    // ── 浜の暮らし(左: 荷、右: 魚市)
    shade(112, 176, 20, 4) +
    `<g fill="#a8813c"><rect x="96" y="164" width="30" height="9"/><rect x="100" y="156" width="24" height="8"/><rect x="104" y="149" width="17" height="7"/></g>` +
    `<g stroke="#7a5a34" stroke-width="1.2" fill="none"><path d="M96,168h30M100,160h24"/></g>` +
    person(80, 178, 22, "#e8443f") +
    arm(80, 165, 12, -3, "#8a6440", 3.2) +
    person(58, 182, 21, "#f5b31c") +
    arm(58, 169, 11, 4, "#8a6440", 3.2) +
    `<path d="M69,166q10,6 -1,17" stroke="#8a8578" stroke-width="1.4" fill="none"/>` +
    // 右: 魚を並べた台と売り手、犬
    shade(310, 186, 34, 5) +
    `<g fill="#a8813c"><rect x="278" y="172" width="64" height="6"/><rect x="282" y="178" width="5" height="10"/><rect x="333" y="178" width="5" height="10"/></g>` +
    `<g fill="#c8d8e0"><ellipse cx="290" cy="170" rx="9" ry="3.4"/><ellipse cx="306" cy="169" rx="8" ry="3.2"/><ellipse cx="322" cy="170" rx="9" ry="3.4"/></g>` +
    `<g fill="#e8443f" opacity=".8"><path d="M299,170l4,-2v4zM315,169l4,-2v4zM331,170l4,-2v4z"/></g>` +
    person(352, 190, 24, "#f0e6d2") +
    arm(352, 175, -8, -8, "#8a6440", 3.2) +
    `<ellipse cx="349" cy="164" rx="11" ry="4.6" fill="#a8813c"/>` +
    `<path d="M340,164h18l-2,-5h-14z" fill="#c99a4c"/>` +
    // 犬。魚の台のすぐ下に置いたら台の脚とつぶれて読めなかったので、砂の空きへ移した
    shade(163, 203, 15, 3, ".16") +
    `<g fill="#c9a877"><path d="M152,203c0,-6 4,-9 9,-9h10c5,0 8,3 8,8v5h-4l-2,-4h-14l-2,4h-5z"/><path d="M152,195l-5,-5l2,-3l6,5z"/><path d="M179,197l6,-6l2,3l-5,5z"/></g>` +
    // ── 最前景の椰子。**1本だけ**。
    // 左右2本と隅からの葉4枚も試したが、画面の左1/3と右1/4が葉で埋まり、
    // 中華網が完全に隠れた。額縁は右の1本と、左上隅の葉1枚に留める。
    palm(366, 210, 126, -14, "#276b38") +
    `<g transform="rotate(38,-4,-6)">${frond(-4, -6, 1, 1.3, "#276b38", "#18512c")}</g>`,

  /**
   * 石窟寺院(アジャンタ・エローラ)。**元は17要素で、game内で最も薄い背景。**
   * 空すら見えず、茶色い壁に穴が1つ開いているだけだった。
   *
   * 層: 夕空 / 岩山の稜線 / 柱状の岩肌と地層 / 窟の列(大1・小4)/ 石段 /
   * 参拝者と灯明 / 最前景の岩と枯木。
   */
  cavetemple:
    // ── 夕方の空(石窟は西を向いて彫られている)。
    // `skyTo(62)` にしたら、稜線がいちばん下がる x=0(y=74)との間に
    // **10pxの塗り残し**ができた。空は稜線の最下点より下まで塗る。
    skyTo(78, "#e09a56", "#f0bd7c", "#f8dcae") +
    sun(322, 40, 17, "#f0803c") +
    streakClouds([
      [110, 20, 40, 4.6, ".5"],
      [70, 30, 26, 3.4, ".4"],
      [250, 16, 32, 4, ".42"],
    ]) +
    // 岩壁の上を舞う鳥
    `<g stroke="#5f5240" stroke-width="1.6" fill="none" stroke-linecap="round"><path d="M96,34q4,-4 8,0q4,-4 8,0M132,22q3.4,-3.4 7,0q3.4,-3.4 7,0M78,48q3,-3 6,0q3,-3 6,0"/></g>` +
    // ── 岩山の稜線(空を残すことで「崖」だと分かる)
    `<path d="M0,74L38,52L74,66L118,44L166,62L214,40L268,60L318,46L360,64L400,50V210H0z" fill="#a08d68"/>` +
    // 陽の当たる面と、陰の面を塗り分ける
    `<path d="M0,74L38,52L74,66L118,44L166,62L214,40L268,60L318,46L360,64L400,50v14L358,78L316,62L266,76L212,56L164,78L116,60L72,82L36,68L0,88z" fill="#c2a878"/>` +
    `<rect x="0" y="88" width="400" height="84" fill="#8a7f66"/>` +
    `<path d="M0,88q60,-6 118,2q64,9 130,-2q60,-10 152,2v10H0z" fill="#9a8a6c"/>` +
    // 岩の面。**格子にしない。**
    // 等間隔の縦の節理 + 画面いっぱいの横縞を引いたら、岩ではなく煉瓦塀に見えた。
    // 大きな面を斜めに切って明暗を分け、割れ目は不規則な長さ・角度で数本だけ入れる。
    `<g fill="#9a8a6c"><path d="M0,92l118,6l-8,74H0z"/><path d="M400,94l-96,4l10,74h86z"/></g>` +
    `<g fill="#7a7058" opacity=".5"><path d="M110,98l38,4l-6,70h-30z"/><path d="M290,96l-40,4l8,72h28z"/></g>` +
    `<g stroke="#6f6550" stroke-width="1.6" opacity=".6" fill="none" stroke-linecap="round"><path d="M22,100l6,42M44,120l-5,34M70,96l4,30M96,132l6,28M312,104l-6,38M336,124l5,32M362,98l-4,34M382,140l5,24"/></g>` +
    `<g stroke="#b09c74" stroke-width="1.4" opacity=".45" fill="none" stroke-linecap="round"><path d="M8,116l16,3M56,106l14,4M84,150l18,2M326,112l16,-3M300,146l-14,3M356,160l18,-2"/></g>` +
    // 岩の窪みに溜まった影
    `<g fill="#6f6550" opacity=".45"><ellipse cx="60" cy="108" rx="18" ry="6"/><ellipse cx="348" cy="112" rx="20" ry="6"/><ellipse cx="118" cy="150" rx="14" ry="5"/></g>` +
    // 夕日の当たり(右)と、落ちる陰(左)。
    // 岩を1色で塗ったら全体がのっぺりして「茶色い壁」に戻ってしまった。
    // 光源が右にあるので、右肩を暖色で起こし、左を沈める。
    `<path d="M400,88v92l-58,-8l-30,-84z" fill="#e0b878" opacity=".3"/>` +
    `<path d="M0,88v94l72,-10l24,-86z" fill="#4f4736" opacity=".26"/>` +
    // ── 窟の列。中央の大窟の左右に小窟を並べ、「連なり」を見せる
    // 左の小窟2つ
    `<path d="M40,158v-30a16,16 0 0 1 32,0v30z" fill="#3f3a2e"/>` +
    `<path d="M46,158v-28a10,10 0 0 1 20,0v28z" fill="#241f18"/>` +
    `<rect x="36" y="120" width="40" height="5" fill="#b09c74"/>` +
    `<path d="M84,158v-24a13,13 0 0 1 26,0v24z" fill="#3f3a2e"/>` +
    `<path d="M89,158v-22a8,8 0 0 1 16,0v22z" fill="#241f18"/>` +
    `<rect x="80" y="128" width="34" height="4.6" fill="#b09c74"/>` +
    // 右の小窟2つ
    `<path d="M292,158v-24a13,13 0 0 1 26,0v24z" fill="#3f3a2e"/>` +
    `<path d="M297,158v-22a8,8 0 0 1 16,0v22z" fill="#241f18"/>` +
    `<rect x="288" y="128" width="34" height="4.6" fill="#b09c74"/>` +
    `<path d="M330,158v-30a16,16 0 0 1 32,0v30z" fill="#3f3a2e"/>` +
    `<path d="M336,158v-28a10,10 0 0 1 20,0v28z" fill="#241f18"/>` +
    `<rect x="326" y="120" width="40" height="5" fill="#b09c74"/>` +
    // 仏龕(壁のくぼみに小さな坐像)
    `<g fill="#6f6550"><path d="M126,140v-14a7,7 0 0 1 14,0v14z"/><path d="M262,140v-14a7,7 0 0 1 14,0v14z"/></g>` +
    `<g fill="#c2a878"><path d="M129,140v-6a4,4 0 0 1 8,0v6z"/><path d="M265,140v-6a4,4 0 0 1 8,0v6z"/></g>` +
    // 中央の大窟(シンボルはこの前に立つ)
    `<path d="M146,158V96a54,54 0 0 1 108,0v62z" fill="#4a4436"/>` +
    `<path d="M152,158V98a48,48 0 0 1 96,0v60z" fill="#2f2a20"/>` +
    `<path d="M160,158V100a40,40 0 0 1 80,0v58z" fill="#1e1a13"/>` +
    // チャイティヤ窓(馬蹄形の明かり取り)。
    // **中央の窟の上にも置いてあるが、そこはシンボルの真後ろで完全に隠れる。**
    // 石窟寺院だと分かる一番の特徴なので、左右の窟の上にも出しておく。
    `<path d="M180,86a20,20 0 0 1 40,0v6h-40z" fill="#5f5240"/>` +
    `<path d="M186,88a14,14 0 0 1 28,0v4h-28z" fill="#f0b45c" opacity=".85"/>` +
    `<g fill="#5f5240"><path d="M46,118a10,10 0 0 1 20,0v4H46z"/><path d="M336,118a10,10 0 0 1 20,0v4h-20z"/></g>` +
    `<g fill="#f0b45c" opacity=".8"><path d="M50,119a6,6 0 0 1 12,0v3H50z"/><path d="M340,119a6,6 0 0 1 12,0v3h-12z"/></g>` +
    `<rect x="140" y="92" width="120" height="6" fill="#b09c74"/>` +
    `<g fill="#9a8a6c"><rect x="146" y="82" width="108" height="5"/></g>` +
    // 入口の柱(柱頭つき)
    `<g fill="#a89873"><rect x="166" y="112" width="11" height="46"/><rect x="223" y="112" width="11" height="46"/></g>` +
    `<g fill="#c2a878"><rect x="163" y="107" width="17" height="6"/><rect x="220" y="107" width="17" height="6"/><rect x="164" y="153" width="15" height="5"/><rect x="221" y="153" width="15" height="5"/></g>` +
    // ── 岩を削り出した石段(下へ広がる)
    ground(158, "#9a8f70") +
    `<g fill="#8a7f66"><path d="M120,158h160v8H120z"/><path d="M108,166h184v9H108z"/><path d="M94,175h212v9H94z"/><path d="M78,184h244v10H78z"/><path d="M60,194h280v16H60z"/></g>` +
    `<g stroke="#6f6550" stroke-width="1.4" opacity=".7" fill="none"><path d="M120,166h160M108,175h184M94,184h212M78,194h244"/></g>` +
    `<g stroke="#b09c74" stroke-width="1.2" opacity=".5" fill="none"><path d="M120,159h160M108,167h184M94,176h212M78,185h244"/></g>` +
    // 段の左右の地面(乾いた土)
    `<g fill="#8a7f66"><path d="M0,158h120l-60,52H0z"/><path d="M400,158H280l60,52h60z"/></g>` +
    `<g fill="#7a7058" opacity=".55"><ellipse cx="34" cy="192" rx="30" ry="8"/><ellipse cx="366" cy="198" rx="32" ry="8"/></g>` +
    // ── 参拝者(石段を上る2人と、灯明を掲げる1人)
    shade(88, 186, 12, 3.4) +
    person(84, 186, 21, "#e8443f") +
    arm(84, 173, 9, -5, "#8a6440", 3.2) +
    person(97, 189, 19, "#f5b31c") +
    shade(101, 189, 11, 3.2) +
    shade(312, 180, 12, 3.4) +
    person(312, 180, 22, "#f0e6d2") +
    arm(312, 166, 10, -9, "#8a6440", 3.2) +
    `<circle cx="323" cy="156" r="3.6" fill="#f5b31c"/>` +
    `<circle cx="323" cy="153.5" r="2.2" fill="#f8dcae"/>` +
    // ── 最前景: 岩の張り出しと枯木(近景があると崖が高く見える)。
    // 地面と同系色で描いたら岩に見えず、地面のしみになった。地面より2段暗くする。
    `<path d="M0,210v-36q24,-9 44,2q22,11 28,34z" fill="#544c3c"/>` +
    `<path d="M0,210v-25q19,-6 36,3q17,8 23,22z" fill="#453f31"/>` +
    `<path d="M400,210v-30q-28,-11 -50,2q-19,10 -26,28z" fill="#544c3c"/>` +
    `<path d="M400,210v-19q-21,-7 -38,3q-14,8 -19,16z" fill="#453f31"/>` +
    `<g stroke="#5a4630" stroke-width="3.4" fill="none" stroke-linecap="round"><path d="M370,190v-34"/><path d="M370,168l-14,-13M370,174l13,-11M370,160l-9,-11"/></g>` +
    `<g fill="#4f7a3c" opacity=".9"><ellipse cx="356" cy="154" rx="6" ry="3.4"/><ellipse cx="384" cy="162" rx="5" ry="3"/></g>` +
    `<g stroke="#6f7a4c" stroke-width="2" fill="none" stroke-linecap="round"><path d="M52,206v-11M58,207v-9M64,206v-12M336,208v-10M342,209v-8"/></g>`,
};
