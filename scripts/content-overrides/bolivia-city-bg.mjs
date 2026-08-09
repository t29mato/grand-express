/**
 * ボリビアの都市の背景の描き直し。
 *
 * legacy の背景は1枚あたり平均30要素で、空・遠景・地面の3層しかない。
 * `valley` は空・山2枚・地面・段々畑の線5本の**14要素**しかなく、
 * 同じ絵を6都市(サマイパタ・バジェグランデ・タリハ・タラブコ・アイキレ・
 * コチャバンバ)が共用している。フランス(平均98要素)と同じ密度まで上げる。
 * 手本は `scripts/countries/france/art.mjs` の `alps`。
 *
 * `legacy/grand-express.html` は凍結しているので、ここで `override.bg` として差し替える。
 *
 * ⚠ **中央 x=151〜249 / y=54〜152 は都市のシンボルに隠れる**
 *   (`city-art.tsx` が s=4.1 / gy=152 で描くため)。影の楕円も (200,155) rx=53 ry=14 に載る。
 *   見せたい細部は左右3分の1と、**y>170 の手前**に置くこと。
 *
 * ⚠ **空は「次に来る塗りの開始y」まで塗り下ろす。**噛み合っていないと横一文字に透ける。
 *   地形は下端(y=210)まで閉じた path で描き、上から順に塗り重ねる。
 *   `node scripts/check-city-backgrounds.mjs bolivia` で必ず実測すること。
 *
 * ⚠ **`Math.random()` を使わない。**抽出が2回評価して同一文字列かを検査する。
 *
 * 詳しくは docs/50-authoring/12-city-background-guide.md。
 */

const W = 400;

/** 小数の桁を抑える(SVGを読みやすく保つため)。 */
const r1 = (v) => Math.round(v * 10) / 10;

function band(y, h, fill) {
  return `<rect x="0" y="${y}" width="${W}" height="${h}" fill="${fill}"/>`;
}

/** 下端まで塗る地面。段のたわみで下が透けないよう、必ず先に敷いておく。 */
function ground(y, fill) {
  return `<rect x="0" y="${y}" width="${W}" height="${210 - y}" fill="${fill}"/>`;
}

/**
 * 空。`to` は塗り下ろす深さ(= 次に来る塗りの開始y)。
 *
 * **2枚だけ、色の差は小さく。**この絵の作りは平たい塗りなので、
 * 帯を増やしても階調にはならず、増やしたぶんだけ横縞が濃く見える。
 * 濃青から砂色まで6段に刻んで撮ったら、空ではなく**日よけの縞**になった。
 * 暖かさは空ではなく、稜線の根元の靄で出す。
 * (`scripts/countries/france/art.mjs` の `sky()` も2枚で、色幅は狭い)
 */
function sky(to, top, low, mid) {
  // 空と地平の色が近いときは2枚でよい。灼けた空のように青から生成りまで
  // 開きが大きいときだけ、あいだに1枚挟む(挟まないと境目が定規で引いた線になる)。
  if (!mid) return band(0, r1(to * 0.72), top) + band(r1(to * 0.66), r1(to * 0.34 + 2), low);
  return (
    band(0, r1(to * 0.56), top) +
    band(r1(to * 0.5), r1(to * 0.3), mid) +
    band(r1(to * 0.74), r1(to * 0.26 + 2), low)
  );
}

/** 接地の影。敷かないと物が浮く。 */
function shade(cx, cy, rx, ry, o = ".2") {
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#000" opacity="${o}"/>`;
}

/**
 * 段々畑(アンデネス)。**この絵の主役。**
 * 1段ごとに「石積みの土手」と「作物の面」を描く。土手を描かずに色帯だけ並べると
 * 縞模様になって畑に見えない(等間隔の格子が煉瓦塀に見えたのと同じ失敗)。
 * `sag` は中央がたわむ量。谷なので水平ではなく、ゆるく弧を描かせる。
 */
function terrace(yL, yR, h, crop, wall, sag = 24, riser = 7) {
  const cL = r1((yL + yR) / 2 + sag);
  const bL = r1(yL + h);
  const bR = r1(yR + h);
  const cB = r1(cL + h);
  return (
    // 作物の面
    `<path d="M0,${yL}Q200,${cL} 400,${yR}V${bR}Q200,${cB} 0,${bL}z" fill="${crop}"/>` +
    // 日の当たる段の縁。ここが無いと段差が見えない
    `<path d="M0,${yL}Q200,${cL} 400,${yR}" stroke="#f7ecc8" stroke-width="2" opacity=".55" fill="none"/>` +
    // 石積みの土手。**厚く暗く。**細い線だとただの縞になる
    `<path d="M0,${bL}Q200,${cB} 400,${bR}v${riser}Q200,${r1(cB + riser)} 0,${r1(bL + riser)}z" fill="${wall}"/>` +
    // 土手の下の影。段が「立っている」ことがこれで分かる
    `<path d="M0,${r1(bL + riser)}Q200,${r1(cB + riser)} 400,${r1(bR + riser)}v2Q200,${r1(cB + riser + 2)} 0,${r1(bL + riser + 2)}z" fill="#000" opacity=".18"/>`
  );
}

/** 土手の石。数個だけ不規則に置く。等間隔に並べると煉瓦塀になる。 */
function stones(y, sag, xs, color) {
  let out = "";
  for (const x of xs) {
    const t = x / 400;
    out += `<rect x="${x}" y="${r1(y + 4 * sag * t * (1 - t))}" width="5" height="3" rx="1" fill="${color}" opacity=".5"/>`;
  }
  return `<g>${out}</g>`;
}

/** 畑の畝。作物の面に方向を与える(のっぺりした緑の帯にしない)。 */
function furrows(y, sag, from, to, step, color, len = 7) {
  let out = "";
  for (let x = from; x <= to; x += step) {
    // 弧に沿ってy をずらす。中央ほど下がる。
    const t = (x - 0) / 400;
    const dy = r1(4 * sag * t * (1 - t));
    out += `M${x},${r1(y + dy)}v${len}`;
  }
  return `<path d="${out}" stroke="${color}" stroke-width="1.4" opacity=".5" fill="none"/>`;
}

/**
 * チョリータ。山高帽・太い二本のお下げ・広がったポジェラ(襞スカート)・
 * アワヨ(背負い布)で分かる。**帽子とスカートの広がりが無いと、ただの人になる。**
 */
function cholita(x, base, h, skirt, manta) {
  const hd = r1(h * 0.15);
  const head = r1(base - h + hd);
  const hip = r1(base - h * 0.42);
  return (
    `<g>` +
    // ポジェラ。裾を大きく広げる
    `<path d="M${r1(x - h * 0.13)},${hip}h${r1(h * 0.26)}l${r1(h * 0.16)},${r1(h * 0.42)}h${r1(-h * 0.58)}z" fill="${skirt}"/>` +
    `<path d="M${r1(x - h * 0.29)},${r1(base)}h${r1(h * 0.58)}v2h${r1(-h * 0.58)}z" fill="#2f2a22" opacity=".45"/>` +
    // 上衣とアワヨの包み(背中の右側にふくらみを付ける)
    `<path d="M${r1(x - h * 0.12)},${r1(head + hd)}h${r1(h * 0.24)}l${r1(h * 0.03)},${r1(h * 0.3)}h${r1(-h * 0.3)}z" fill="${manta}"/>` +
    `<ellipse cx="${r1(x + h * 0.19)}" cy="${r1(head + hd * 2.4)}" rx="${r1(h * 0.13)}" ry="${r1(h * 0.16)}" fill="${skirt}"/>` +
    // 顔と二本のお下げ
    `<circle cx="${x}" cy="${head}" r="${hd}" fill="#c98d5f"/>` +
    `<path d="M${r1(x - hd * 0.8)},${r1(head + hd * 0.6)}l${r1(-hd * 0.3)},${r1(hd * 2.6)}M${r1(x + hd * 0.8)},${r1(head + hd * 0.6)}l${r1(hd * 0.3)},${r1(hd * 2.6)}" stroke="#2b2119" stroke-width="1.6" stroke-linecap="round" fill="none"/>` +
    // 山高帽
    `<ellipse cx="${x}" cy="${r1(head - hd * 0.9)}" rx="${r1(hd * 1.9)}" ry="${r1(hd * 0.4)}" fill="#3a2f26"/>` +
    `<path d="M${r1(x - hd * 0.95)},${r1(head - hd * 0.95)}a${r1(hd * 0.95)},${r1(hd * 1.1)} 0 0 1 ${r1(hd * 1.9)},0z" fill="#4a3d31"/>` +
    `</g>`
  );
}

/**
 * リャマ。**首の角度と立った耳で決まる。**水平な首にすると羊か犬になる。
 * `dir` が -1 で左を向く。
 */
function llama(x, base, h, dir = 1, wool = "#d9c7a8") {
  const bw = r1(h * 0.62);
  const by = r1(base - h * 0.52);
  const nx = r1(x + dir * bw * 0.42);
  const ny = r1(base - h * 0.88);
  return (
    `<g>` +
    shade(x, r1(base + 1), r1(bw * 0.62), 2.6, ".18") +
    // 脚(前後で少しずらすと歩いて見える)
    `<g stroke="#b8a486" stroke-width="${r1(h * 0.07)}" stroke-linecap="round">` +
    `<path d="M${r1(x - bw * 0.3)},${by}v${r1(h * 0.5)}M${r1(x - bw * 0.12)},${by}v${r1(h * 0.48)}"/>` +
    `<path d="M${r1(x + bw * 0.16)},${by}v${r1(h * 0.5)}M${r1(x + bw * 0.34)},${by}v${r1(h * 0.47)}"/>` +
    `</g>` +
    `<ellipse cx="${x}" cy="${by}" rx="${r1(bw * 0.56)}" ry="${r1(h * 0.24)}" fill="${wool}"/>` +
    // 首。斜め上へ
    `<path d="M${nx},${r1(by - h * 0.06)}L${r1(nx + dir * h * 0.1)},${ny}" stroke="${wool}" stroke-width="${r1(h * 0.16)}" stroke-linecap="round" fill="none"/>` +
    `<ellipse cx="${r1(nx + dir * h * 0.13)}" cy="${r1(ny - h * 0.02)}" rx="${r1(h * 0.11)}" ry="${r1(h * 0.08)}" fill="${wool}"/>` +
    // 立った耳2本
    `<path d="M${r1(nx + dir * h * 0.07)},${r1(ny - h * 0.06)}l${r1(dir * h * 0.02)},${r1(-h * 0.1)}l${r1(dir * h * 0.04)},${r1(h * 0.08)}z" fill="${wool}"/>` +
    `<path d="M${r1(nx + dir * h * 0.15)},${r1(ny - h * 0.06)}l${r1(dir * h * 0.02)},${r1(-h * 0.09)}l${r1(dir * h * 0.04)},${r1(h * 0.07)}z" fill="${wool}"/>` +
    `<circle cx="${r1(nx + dir * h * 0.2)}" cy="${r1(ny - h * 0.01)}" r="1.3" fill="#2b2119"/>` +
    `</g>`
  );
}

/** 谷の村の日干し煉瓦の家。瓦は素焼きの赤茶。 */
function adobe(x, base, w, h, roof = "#b5643c") {
  return (
    `<g>` +
    `<rect x="${x}" y="${r1(base - h)}" width="${w}" height="${h}" fill="#d9c3a0"/>` +
    `<rect x="${x}" y="${r1(base - h * 0.34)}" width="${w}" height="${r1(h * 0.34)}" fill="#c9ad89"/>` +
    `<path d="M${r1(x - w * 0.14)},${r1(base - h)}h${r1(w * 1.28)}l${r1(-w * 0.14)},${r1(-h * 0.36)}h${r1(-w * 0.72)}z" fill="${roof}"/>` +
    `<rect x="${r1(x + w * 0.34)}" y="${r1(base - h * 0.62)}" width="${r1(w * 0.26)}" height="${r1(h * 0.34)}" fill="#5c4632"/>` +
    `</g>`
  );
}

/**
 * モジェ(コショウボク)。谷の村の広場にはたいていこれがある。
 * 枝垂れた細かい葉なので、輪郭を丸くせず**下に垂らす**。
 */
function molle(x, base, h, dark = false) {
  const a = dark ? "#2f4a2b" : "#3f6337";
  const b = dark ? "#3a5a33" : "#4d7742";
  return (
    `<g>` +
    `<path d="M${x},${base}v${r1(-h * 0.46)}" stroke="#5a4632" stroke-width="${r1(h * 0.07)}" stroke-linecap="round" fill="none"/>` +
    `<path d="M${x},${r1(base - h * 0.36)}l${r1(-h * 0.13)},${r1(-h * 0.14)}M${x},${r1(base - h * 0.4)}l${r1(h * 0.14)},${r1(-h * 0.12)}" stroke="#5a4632" stroke-width="${r1(h * 0.04)}" fill="none"/>` +
    `<ellipse cx="${x}" cy="${r1(base - h * 0.7)}" rx="${r1(h * 0.36)}" ry="${r1(h * 0.24)}" fill="${a}"/>` +
    `<ellipse cx="${r1(x - h * 0.2)}" cy="${r1(base - h * 0.58)}" rx="${r1(h * 0.2)}" ry="${r1(h * 0.15)}" fill="${b}"/>` +
    `<ellipse cx="${r1(x + h * 0.22)}" cy="${r1(base - h * 0.6)}" rx="${r1(h * 0.19)}" ry="${r1(h * 0.14)}" fill="${b}"/>` +
    `<ellipse cx="${r1(x + h * 0.04)}" cy="${r1(base - h * 0.86)}" rx="${r1(h * 0.22)}" ry="${r1(h * 0.15)}" fill="${b}"/>` +
    `</g>`
  );
}

/**
 * 密林の樹冠のひと塊。円を並べただけだと**泡の列**になるので、
 * 大小2つの塊をずらして重ね、下側に影を入れて厚みを出す。
 */
function crown(x, y, w, h, light, dark) {
  return (
    `<ellipse cx="${x}" cy="${y}" rx="${w}" ry="${h}" fill="${light}"/>` +
    `<ellipse cx="${r1(x - w * 0.34)}" cy="${r1(y + h * 0.34)}" rx="${r1(w * 0.62)}" ry="${r1(h * 0.72)}" fill="${dark}"/>` +
    `<ellipse cx="${r1(x + w * 0.42)}" cy="${r1(y + h * 0.26)}" rx="${r1(w * 0.5)}" ry="${r1(h * 0.62)}" fill="${dark}" opacity=".75"/>`
  );
}

/**
 * 樹冠を抜けて突き出す高木(エメルジェンテ)。
 * これが1本あるだけで「並木」ではなく「密林」になる。
 */
function emergent(x, base, h, crownFill = "#28583a") {
  return (
    `<g>` +
    `<path d="M${x},${base}v${-h}" stroke="#4a3a28" stroke-width="${r1(h * 0.045)}" fill="none"/>` +
    `<path d="M${x},${r1(base - h * 0.62)}l${r1(-h * 0.16)},${r1(-h * 0.1)}M${x},${r1(base - h * 0.7)}l${r1(h * 0.17)},${r1(-h * 0.08)}" stroke="#4a3a28" stroke-width="${r1(h * 0.028)}" fill="none"/>` +
    `<ellipse cx="${x}" cy="${r1(base - h * 0.92)}" rx="${r1(h * 0.34)}" ry="${r1(h * 0.16)}" fill="${crownFill}"/>` +
    `<ellipse cx="${r1(x - h * 0.2)}" cy="${r1(base - h * 0.82)}" rx="${r1(h * 0.2)}" ry="${r1(h * 0.11)}" fill="${crownFill}"/>` +
    `<ellipse cx="${r1(x + h * 0.21)}" cy="${r1(base - h * 0.84)}" rx="${r1(h * 0.19)}" ry="${r1(h * 0.1)}" fill="${crownFill}"/>` +
    `</g>`
  );
}

/**
 * 椰子。**羽の切れ込みで椰子と分かる。**
 * なめらかな輪郭1枚だとバナナの葉に、細い線を放射状に並べると針葉樹に見える
 * (ガイド 4.1 と同じ失敗を繰り返さないこと)。中肋を引き、小葉を1枚ずつ生やす。
 */
function palm(x, base, h, lean = 0) {
  const top = r1(base - h);
  const tx = r1(x + lean);
  let fronds = "";
  // 6方向へ中肋を伸ばし、それぞれに小葉を並べる。
  const dirs = [
    [-1, -0.55],
    [-1, -0.05],
    [-0.7, 0.35],
    [1, -0.55],
    [1, -0.05],
    [0.7, 0.35],
  ];
  for (const [dx, dy] of dirs) {
    const ex = r1(tx + dx * h * 0.42);
    const ey = r1(top + dy * h * 0.3);
    fronds += `<path d="M${tx},${top}Q${r1(tx + dx * h * 0.24)},${r1(top + dy * h * 0.24 - h * 0.06)} ${ex},${ey}" stroke="#2f6b3f" stroke-width="1.8" fill="none"/>`;
    for (let i = 1; i <= 4; i++) {
      const t = i / 5;
      const px = r1(tx + dx * h * 0.42 * t);
      const py = r1(top + dy * h * 0.3 * t - h * 0.05 * Math.sin(Math.PI * t));
      fronds += `<path d="M${px},${py}l${r1(dx * h * 0.04)},${r1(h * 0.07)}" stroke="#3f8046" stroke-width="1.5" stroke-linecap="round" fill="none"/>`;
    }
  }
  return (
    `<g>` +
    `<path d="M${x},${base}Q${r1(x + lean * 0.4)},${r1(base - h * 0.55)} ${tx},${top}" stroke="#6b5638" stroke-width="${r1(h * 0.055)}" fill="none"/>` +
    fronds +
    `</g>`
  );
}

/** バナナ。太い葉柄から大きな葉身を数枚。裂けた縁で椰子と区別する。 */
function banana(x, base, h) {
  let out = `<path d="M${x},${base}v${r1(-h * 0.34)}" stroke="#5f7f3a" stroke-width="${r1(h * 0.07)}" fill="none"/>`;
  const leaves = [
    [-1, -0.15],
    [-0.85, 0.2],
    [1, -0.2],
    [0.9, 0.18],
    [0.1, -0.55],
  ];
  for (const [dx, dy] of leaves) {
    const ex = r1(x + dx * h * 0.46);
    const ey = r1(base - h * 0.34 + dy * h * 0.5);
    out +=
      `<path d="M${x},${r1(base - h * 0.34)}Q${r1(x + dx * h * 0.3)},${r1(ey - h * 0.16)} ${ex},${ey}` +
      `Q${r1(x + dx * h * 0.28)},${r1(ey + h * 0.04)} ${x},${r1(base - h * 0.3)}z" fill="#4f8a3c"/>` +
      `<path d="M${x},${r1(base - h * 0.32)}Q${r1(x + dx * h * 0.3)},${r1(ey - h * 0.06)} ${ex},${ey}" stroke="#3a6b2c" stroke-width="1.2" fill="none"/>`;
  }
  return `<g>${out}</g>`;
}

/** 高床式の家。川辺の町は増水するので床を上げる。屋根はトタンか椰子葺き。 */
function stiltHouse(x, base, w, h, roof = "#8a5a3a") {
  const floor = r1(base - h * 0.32);
  return (
    `<g>` +
    `<g stroke="#5c4632" stroke-width="2">` +
    `<path d="M${r1(x + 2)},${floor}v${r1(h * 0.32)}M${r1(x + w - 2)},${floor}v${r1(h * 0.32)}M${r1(x + w * 0.5)},${floor}v${r1(h * 0.32)}"/>` +
    `</g>` +
    `<rect x="${x}" y="${r1(floor - h * 0.44)}" width="${w}" height="${r1(h * 0.44)}" fill="#e0cfae"/>` +
    `<path d="M${r1(x - w * 0.12)},${r1(floor - h * 0.44)}h${r1(w * 1.24)}l${r1(-w * 0.14)},${r1(-h * 0.26)}h${r1(-w * 0.96)}z" fill="${roof}"/>` +
    `<rect x="${r1(x + w * 0.36)}" y="${r1(floor - h * 0.3)}" width="${r1(w * 0.24)}" height="${r1(h * 0.3)}" fill="#5c4632"/>` +
    `</g>`
  );
}

/**
 * 川舟(ペケペケ)。細長い木の舟に日よけを載せる。
 *
 * **水の上の物か、水に空いた穴かは輪郭では区別できない。**
 * 効くのは(1)真下の短い映り込みと(2)さざ波の線を舟が遮ること。
 * さざ波は `ripples()` 側で舟の幅ぶん切ってある。
 */
function boat(x, y, w, hull = "#8a6a44", roof = "") {
  const h = r1(w * 0.13);
  return (
    `<g>` +
    // 映り込み。舟の真下に、少しにじませて短く
    `<path d="M${r1(x - w * 0.42)},${r1(y + h + 2)}q${r1(w * 0.42)},4 ${r1(w * 0.84)},0q${r1(-w * 0.42)},6 ${r1(-w * 0.84)},0z" fill="#3f3524" opacity=".28"/>` +
    (roof
      ? `<g><path d="M${r1(x - w * 0.3)},${r1(y - h * 2.6)}h${r1(w * 0.6)}l${r1(-w * 0.05)},${r1(-h * 0.9)}h${r1(-w * 0.5)}z" fill="${roof}"/>` +
        `<g stroke="#5c4632" stroke-width="1.4"><path d="M${r1(x - w * 0.26)},${r1(y - h * 2.6)}v${r1(h * 2.1)}M${r1(x + w * 0.26)},${r1(y - h * 2.6)}v${r1(h * 2.1)}"/></g></g>`
      : "") +
    `<path d="M${r1(x - w * 0.5)},${y}q${r1(w * 0.5)},${r1(h * 2.2)} ${w},0q${r1(-w * 0.5)},${r1(-h * 0.7)} ${-w},0z" fill="${hull}"/>` +
    // 舷の内側。ここが明るいと「板の切れ端」ではなく「中の空いた舟」になる
    `<path d="M${r1(x - w * 0.4)},${r1(y + h * 0.15)}q${r1(w * 0.4)},${r1(h * 0.9)} ${r1(w * 0.8)},0q${r1(-w * 0.4)},${r1(-h * 0.5)} ${r1(-w * 0.8)},0z" fill="#c9ab7c"/>` +
    `<path d="M${r1(x - w * 0.5)},${y}q${r1(w * 0.5)},${r1(-h * 0.7)} ${w},0" stroke="#4a3826" stroke-width="1.6" fill="none"/>` +
    `</g>`
  );
}

/**
 * 川面のさざ波。`gaps` に「舟がある x の範囲」を渡すと、そこだけ線を切る。
 * 切らずに舟の下を突き抜けさせると、舟が水に浮かず**水に開いた穴**に見える。
 */
function ripples(y, xs, color, opacity, gaps = []) {
  let d = "";
  for (const [x, len] of xs) {
    let segs = [[x, x + len]];
    for (const [gs, ge] of gaps) {
      const next = [];
      for (const [s, e] of segs) {
        if (ge <= s || gs >= e) next.push([s, e]);
        else {
          if (s < gs) next.push([s, gs]);
          if (ge < e) next.push([ge, e]);
        }
      }
      segs = next;
    }
    for (const [s, e] of segs) if (e - s > 3) d += `M${r1(s)},${y}h${r1(e - s)}`;
  }
  return `<path d="${d}" stroke="${color}" stroke-width="1.8" opacity="${opacity}" stroke-linecap="round" fill="none"/>`;
}

/**
 * イチュ草の株。高原の地面はこれで埋まっている。
 *
 * **点を打つのではなく、葉を放射状に生やす。**元の絵は同じ大きさの丸を
 * 26個、等間隔の格子に置いていて、草原ではなく方眼紙の模様に見えていた。
 * 株ごとに葉の本数・長さ・傾きを変える。
 */
function tuft(x, base, h, lean = 0, color = "#8a7440") {
  const blades = [-0.42, -0.16, 0.06, 0.3];
  let d = "";
  for (let i = 0; i < blades.length; i++) {
    const s = blades[i];
    // 長さを1本ずつ変える。全部同じだと扇に見える
    const len = r1(h * (0.72 + ((i * 7) % 5) * 0.09));
    d += `M${x},${base}q${r1(s * h * 0.3 + lean * 0.3)},${r1(-len * 0.6)} ${r1(s * h + lean)},${r1(-len)}`;
  }
  return `<path d="${d}" stroke="${color}" stroke-width="1.5" stroke-linecap="round" fill="none"/>`;
}

/** トラ(高原の低木)。灰緑の小さな塊。地面より2段暗くしないとしみに見える。 */
function tola(x, base, w, h, fill = "#6f7a4a") {
  return (
    `<g>` +
    `<ellipse cx="${x}" cy="${base}" rx="${w}" ry="${r1(h * 0.7)}" fill="${fill}"/>` +
    `<ellipse cx="${r1(x - w * 0.4)}" cy="${r1(base - h * 0.3)}" rx="${r1(w * 0.55)}" ry="${r1(h * 0.55)}" fill="${fill}"/>` +
    `<ellipse cx="${r1(x + w * 0.42)}" cy="${r1(base - h * 0.24)}" rx="${r1(w * 0.5)}" ry="${r1(h * 0.5)}" fill="${fill}"/>` +
    `</g>`
  );
}

/**
 * チュルパ(石積みの墓塔)。高原にぽつんと立っている。
 * 上がわずかに広がった円筒で、東を向いた小さな入口が1つ空く。
 */
function chullpa(x, base, w, h) {
  return (
    `<g>` +
    shade(x, r1(base + 1), r1(w * 0.8), 3, ".2") +
    `<path d="M${r1(x - w * 0.42)},${base}l${r1(w * 0.06)},${-h}h${r1(w * 0.72)}l${r1(w * 0.06)},${h}z" fill="#8a8272"/>` +
    `<path d="M${r1(x - w * 0.36)},${r1(base - h)}h${r1(w * 0.72)}v3h${r1(-w * 0.72)}z" fill="#6f6858"/>` +
    // 石の目地。横に数本だけ、長さを変えて
    `<g stroke="#6f6858" stroke-width="1" opacity=".7" fill="none"><path d="M${r1(x - w * 0.36)},${r1(base - h * 0.7)}h${r1(w * 0.6)}M${r1(x - w * 0.3)},${r1(base - h * 0.45)}h${r1(w * 0.66)}M${r1(x - w * 0.36)},${r1(base - h * 0.22)}h${r1(w * 0.5)}"/></g>` +
    `<path d="M${r1(x - w * 0.12)},${base}v${r1(-h * 0.34)}h${r1(w * 0.24)}v${r1(h * 0.34)}z" fill="#3f3a30"/>` +
    `</g>`
  );
}

/** カルドン(柱サボテン)。腕の本数と高さを変えないと、同じ判子が並ぶ。 */
function cardon(x, base, h, arms = [-1, 1], fill = "#5f7a45") {
  let out = `<path d="M${x},${base}v${-h}" stroke="${fill}" stroke-width="${r1(h * 0.16)}" stroke-linecap="round" fill="none"/>`;
  for (let i = 0; i < arms.length; i++) {
    const side = arms[i];
    const at = r1(base - h * (0.42 + i * 0.2));
    const up = r1(h * (0.3 + i * 0.08));
    out +=
      `<path d="M${x},${at}h${r1(side * h * 0.2)}v${-up}" stroke="${fill}" stroke-width="${r1(h * 0.12)}" ` +
      `stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
  }
  // 稜。縦線を入れると柱サボテンらしくなる
  out += `<path d="M${x},${r1(base - h * 0.9)}v${r1(h * 0.8)}" stroke="#4a6336" stroke-width="1" opacity=".6" fill="none"/>`;
  return `<g>${out}</g>`;
}

/**
 * ケブラチョ(チャコの乾いた硬木)。**丸い樹冠にしない。**
 * 水が無いので葉が薄く、枝が横へ広がって天辺が平たくなる。
 */
function quebracho(x, base, h, fill = "#6f7442", dark = "#565a32") {
  return (
    `<g>` +
    `<path d="M${x},${base}v${r1(-h * 0.52)}" stroke="#6b5638" stroke-width="${r1(h * 0.07)}" fill="none"/>` +
    `<path d="M${x},${r1(base - h * 0.42)}l${r1(-h * 0.2)},${r1(-h * 0.16)}M${x},${r1(base - h * 0.46)}l${r1(h * 0.21)},${r1(-h * 0.14)}" stroke="#6b5638" stroke-width="${r1(h * 0.04)}" fill="none"/>` +
    `<ellipse cx="${x}" cy="${r1(base - h * 0.66)}" rx="${r1(h * 0.42)}" ry="${r1(h * 0.14)}" fill="${fill}"/>` +
    `<ellipse cx="${r1(x - h * 0.24)}" cy="${r1(base - h * 0.56)}" rx="${r1(h * 0.24)}" ry="${r1(h * 0.1)}" fill="${dark}"/>` +
    `<ellipse cx="${r1(x + h * 0.26)}" cy="${r1(base - h * 0.58)}" rx="${r1(h * 0.22)}" ry="${r1(h * 0.09)}" fill="${dark}"/>` +
    `</g>`
  );
}

/**
 * トボロチ(トックリキワタ)。チャコの木でいちばん見分けがつく。
 * **胴がふくらんだ幹**と、葉の落ちた枝に咲く桃色の花で分かる。
 */
function toborochi(x, base, h) {
  const w = r1(h * 0.26);
  return (
    `<g>` +
    shade(x, r1(base + 1), r1(w * 1.2), 4, ".2") +
    // ふくらんだ幹。上下を細く、中ほどを太く
    `<path d="M${r1(x - w * 0.3)},${base}q${r1(-w * 0.7)},${r1(-h * 0.34)} ${r1(w * 0.1)},${r1(-h * 0.62)}` +
    `q${r1(w * 0.2)},${r1(-h * 0.16)} ${r1(w * 0.4)},0q${r1(w * 0.8)},${r1(h * 0.28)} ${r1(w * 0.1)},${r1(h * 0.62)}z" fill="#a8b47a"/>` +
    `<path d="M${r1(x - w * 0.1)},${r1(base - h * 0.2)}q${r1(-w * 0.3)},${r1(-h * 0.2)} ${r1(-w * 0.05)},${r1(-h * 0.4)}" stroke="#8a9660" stroke-width="1.4" fill="none"/>` +
    // 棘。幹に短い線を数本
    `<g stroke="#7a8654" stroke-width="1.2" fill="none"><path d="M${r1(x - w * 0.5)},${r1(base - h * 0.3)}l-3,-1M${r1(x + w * 0.5)},${r1(base - h * 0.36)}l3,-1M${r1(x - w * 0.45)},${r1(base - h * 0.46)}l-3,-1"/></g>` +
    // 葉の落ちた枝
    `<g stroke="#8a9660" stroke-width="${r1(h * 0.03)}" stroke-linecap="round" fill="none">` +
    `<path d="M${x},${r1(base - h * 0.62)}l${r1(-h * 0.2)},${r1(-h * 0.16)}M${x},${r1(base - h * 0.64)}l${r1(h * 0.22)},${r1(-h * 0.14)}M${x},${r1(base - h * 0.66)}l${r1(-h * 0.05)},${r1(-h * 0.22)}"/></g>` +
    // 桃色の花
    `<g fill="#e88fb0"><circle cx="${r1(x - h * 0.21)}" cy="${r1(base - h * 0.79)}" r="${r1(h * 0.05)}"/>` +
    `<circle cx="${r1(x + h * 0.23)}" cy="${r1(base - h * 0.79)}" r="${r1(h * 0.045)}"/>` +
    `<circle cx="${r1(x - h * 0.06)}" cy="${r1(base - h * 0.88)}" r="${r1(h * 0.05)}"/>` +
    `<circle cx="${r1(x + h * 0.08)}" cy="${r1(base - h * 0.72)}" r="${r1(h * 0.035)}"/></g>` +
    `</g>`
  );
}

/**
 * ペッカリー(クビワペッカリー)。チャコの藪にいる。
 *
 * **胴と脚をひと筆で描かない。**まとめて描くと四つ足の獣にしかならず、
 * 犬に見える(らくだが犬になったのと同じ原因)。見分けがつく特徴を
 * 別々の図形で置く: 低く構えた頭 / 短い脚 / 背の剛毛 / **肩の白い襟**。
 * 襟がこの動物の名前そのものなので、これを外すと別の獣になる。
 */
function peccary(x, base, h, dir = 1, body = "#4a4038") {
  const bw = r1(h * 1.15);
  const by = r1(base - h * 0.55);
  const hx = r1(x + dir * bw * 0.52);
  return (
    `<g>` +
    shade(x, r1(base + 1), r1(bw * 0.6), 2.4, ".2") +
    // 脚。**短い。**胴の下半分より下に出さない
    `<g stroke="${body}" stroke-width="${r1(h * 0.13)}" stroke-linecap="round">` +
    `<path d="M${r1(x - bw * 0.28)},${by}v${r1(h * 0.45)}M${r1(x - bw * 0.1)},${by}v${r1(h * 0.43)}"/>` +
    `<path d="M${r1(x + bw * 0.14)},${by}v${r1(h * 0.45)}M${r1(x + bw * 0.3)},${by}v${r1(h * 0.42)}"/>` +
    `</g>` +
    // ずんぐりした胴
    `<ellipse cx="${x}" cy="${by}" rx="${r1(bw * 0.5)}" ry="${r1(h * 0.3)}" fill="${body}"/>` +
    // 頭は低く前へ。鼻づらは角ばらせる
    `<path d="M${r1(hx - dir * bw * 0.1)},${r1(by - h * 0.16)}l${r1(dir * bw * 0.3)},${r1(h * 0.08)}l0,${r1(h * 0.24)}l${r1(-dir * bw * 0.28)},${r1(h * 0.04)}z" fill="${body}"/>` +
    `<rect x="${r1(dir > 0 ? hx + bw * 0.18 : hx - bw * 0.26)}" y="${r1(by - h * 0.04)}" width="${r1(bw * 0.08)}" height="${r1(h * 0.12)}" fill="#2f2823"/>` +
    // 耳。小さく立てる
    `<path d="M${r1(hx - dir * bw * 0.04)},${r1(by - h * 0.16)}l${r1(dir * h * 0.03)},${r1(-h * 0.12)}l${r1(dir * h * 0.09)},${r1(h * 0.08)}z" fill="${body}"/>` +
    // 背の剛毛
    `<g stroke="#2f2823" stroke-width="1.2" stroke-linecap="round" fill="none">` +
    `<path d="M${r1(x - bw * 0.24)},${r1(by - h * 0.28)}l0,${r1(-h * 0.1)}M${r1(x - bw * 0.06)},${r1(by - h * 0.3)}l0,${r1(-h * 0.11)}M${r1(x + bw * 0.14)},${r1(by - h * 0.28)}l0,${r1(-h * 0.09)}"/></g>` +
    // **肩の白い襟。**これがクビワペッカリーの名の由来で、外すと別の獣になる
    `<path d="M${r1(x + dir * bw * 0.2)},${r1(by - h * 0.28)}l${r1(dir * bw * 0.1)},${r1(h * 0.52)}l${r1(-dir * bw * 0.07)},0l${r1(-dir * bw * 0.1)},${r1(-h * 0.52)}z" fill="#c9bda8"/>` +
    `</g>`
  );
}

/**
 * コカの株。ユンガスの段の上はこれで埋まっている。
 * 明るい黄緑の小さな丸。**列にするが、間隔と大きさは揃えない。**
 */
function cocaRow(y, xs, r = 3.2, fill = "#6f9e4a") {
  let out = "";
  for (let i = 0; i < xs.length; i++) {
    const rr = r1(r * (0.78 + ((i * 3) % 4) * 0.14));
    out += `<circle cx="${xs[i]}" cy="${r1(y + ((i * 5) % 3))}" r="${rr}"/>`;
  }
  return `<g fill="${fill}">${out}</g>`;
}

/**
 * 斜面に切った段(タカナ)。ユンガスの段は谷が狭いので**短く、斜めに積み上がる**。
 * `valley` の段々畑は横に長く伸びるので、そこと作り分ける。
 */
function shelf(x, y, w, h, face, wall) {
  return (
    `<g>` +
    `<path d="M${x},${y}q${r1(w * 0.5)},${r1(h * 0.5)} ${w},${r1(-h * 0.2)}v${r1(h)}q${r1(-w * 0.5)},${r1(h * 0.2)} ${-w},${r1(-h * 0.5)}z" fill="${face}"/>` +
    `<path d="M${x},${r1(y + h)}q${r1(w * 0.5)},${r1(h * 0.5)} ${w},${r1(-h * 0.2)}v4q${r1(-w * 0.5)},${r1(h * 0.2)} ${-w},${r1(-h * 0.5)}z" fill="${wall}"/>` +
    `</g>`
  );
}

/** 滝。細い白糸と、落ち口の水しぶき。チュルマニは滝の町。 */
function waterfall(x, top, bottom, w = 3) {
  return (
    `<g>` +
    `<path d="M${x},${top}q${r1(-w * 0.6)},${r1((bottom - top) * 0.5)} ${r1(w * 0.2)},${bottom}` +
    `h${w}q${r1(w * 0.5)},${r1(-(bottom - top) * 0.5)} ${r1(-w * 0.2)},${-(bottom - top)}z" fill="#eaf6f4" opacity=".9"/>` +
    `<g fill="#f4fbfa"><ellipse cx="${r1(x + w * 0.3)}" cy="${bottom}" rx="${r1(w * 2.4)}" ry="${r1(w * 1.1)}" opacity=".75"/>` +
    `<ellipse cx="${r1(x + w * 0.3)}" cy="${r1(bottom - w * 1.4)}" rx="${r1(w * 1.4)}" ry="${r1(w * 0.7)}" opacity=".5"/></g>` +
    `</g>`
  );
}

/** 濡れた大きな葉。雲霧林の最前景。中肋と側脈を入れないと、ただの緑の塊になる。 */
function wetLeaf(x, y, len, dx, dy, fill = "#2b4a34") {
  const ex = r1(x + dx * len);
  const ey = r1(y + dy * len);
  return (
    `<g>` +
    `<path d="M${x},${y}Q${r1(x + dx * len * 0.5 - dy * len * 0.34)},${r1(y + dy * len * 0.5 + dx * len * 0.34)} ${ex},${ey}` +
    `Q${r1(x + dx * len * 0.5 + dy * len * 0.3)},${r1(y + dy * len * 0.5 - dx * len * 0.3)} ${x},${y}z" fill="${fill}"/>` +
    `<path d="M${x},${y}L${ex},${ey}" stroke="#1f3a27" stroke-width="1.2" fill="none"/>` +
    `</g>`
  );
}

/**
 * ベニのコブ牛(セブー)。トリニダーは牛の町。
 *
 * **部品で組む。**胴と脚をひと筆で描くと四つ足の獣にしかならない。
 * 見分けがつくのは3つ: **肩のコブ**(背の線より上に出す)/ 垂れた大きな耳 /
 * 喉の垂れ肉。とくにコブは、胴の輪郭の中に描いても効かない。**背より上へ出す。**
 */
function zebu(x, base, h, dir = 1, hide = "#c9b48a") {
  const bw = r1(h * 1.5);
  const by = r1(base - h * 0.58);
  const hx = r1(x + dir * bw * 0.5);
  const hy = r1(base - h * 0.62);
  return (
    `<g>` +
    shade(x, r1(base + 1), r1(bw * 0.56), 2.6, ".18") +
    `<g stroke="${hide}" stroke-width="${r1(h * 0.1)}" stroke-linecap="round">` +
    `<path d="M${r1(x - bw * 0.3)},${by}v${r1(h * 0.5)}M${r1(x - bw * 0.14)},${by}v${r1(h * 0.48)}"/>` +
    `<path d="M${r1(x + bw * 0.16)},${by}v${r1(h * 0.5)}M${r1(x + bw * 0.3)},${by}v${r1(h * 0.47)}"/>` +
    `</g>` +
    `<ellipse cx="${x}" cy="${by}" rx="${r1(bw * 0.48)}" ry="${r1(h * 0.26)}" fill="${hide}"/>` +
    // **肩のコブ。**背の線をまたいで上へ出す
    `<ellipse cx="${r1(x + dir * bw * 0.22)}" cy="${r1(by - h * 0.24)}" rx="${r1(bw * 0.16)}" ry="${r1(h * 0.16)}" fill="${hide}"/>` +
    // 尾。房を先に付ける
    `<path d="M${r1(x - dir * bw * 0.46)},${r1(by - h * 0.1)}q${r1(-dir * h * 0.14)},${r1(h * 0.3)} ${r1(-dir * h * 0.04)},${r1(h * 0.46)}" stroke="${hide}" stroke-width="2" fill="none"/>` +
    `<ellipse cx="${r1(x - dir * bw * 0.5)}" cy="${r1(by + h * 0.38)}" rx="2.4" ry="3.4" fill="#8a6a48"/>` +
    // 頭は低く。鼻づらを前へ出す
    `<ellipse cx="${r1(hx + dir * h * 0.1)}" cy="${hy}" rx="${r1(h * 0.2)}" ry="${r1(h * 0.13)}" fill="${hide}"/>` +
    `<path d="M${r1(x + dir * bw * 0.3)},${r1(by - h * 0.16)}l${r1(dir * h * 0.24)},${r1(h * 0.06)}" stroke="${hide}" stroke-width="${r1(h * 0.16)}" stroke-linecap="round" fill="none"/>` +
    // 喉の垂れ肉
    `<path d="M${r1(hx - dir * h * 0.02)},${r1(hy + h * 0.1)}l${r1(-dir * h * 0.18)},${r1(h * 0.18)}l${r1(dir * h * 0.16)},${r1(-h * 0.04)}z" fill="${hide}"/>` +
    // 垂れた大きな耳
    `<path d="M${r1(hx + dir * h * 0.02)},${r1(hy - h * 0.06)}l${r1(-dir * h * 0.12)},${r1(h * 0.12)}l${r1(dir * h * 0.1)},${r1(h * 0.02)}z" fill="${hide}"/>` +
    // 角。短く前へ
    `<g stroke="#6b5638" stroke-width="1.6" stroke-linecap="round" fill="none">` +
    `<path d="M${r1(hx + dir * h * 0.06)},${r1(hy - h * 0.11)}l${r1(dir * h * 0.1)},${r1(-h * 0.06)}M${r1(hx + dir * h * 0.12)},${r1(hy - h * 0.09)}l${r1(dir * h * 0.08)},${r1(-h * 0.02)}"/></g>` +
    `<circle cx="${r1(hx + dir * h * 0.18)}" cy="${r1(hy - h * 0.02)}" r="1.2" fill="#2f2823"/>` +
    `</g>`
  );
}

/** シロアリ塚。ジャノス(氾濫原)にはこれが点々と立っている。 */
function termite(x, base, h) {
  return (
    `<path d="M${r1(x - h * 0.42)},${base}q${r1(h * 0.16)},${r1(-h * 0.7)} ${r1(h * 0.42)},${-h}` +
    `q${r1(h * 0.28)},${r1(h * 0.3)} ${r1(h * 0.42)},${h}z" fill="#9c7a4e"/>`
  );
}

/**
 * ビクーニャ。サハマの高地にいる。リャマより小さく、細く、荷を負わない。
 *
 * **部品で組む。**見分けどころは3つ: 細く長い首 / 長い脚 / **胸と腹の白**。
 * 白を落とすとただの鹿になる。
 * ⚠ **首と頭は背より上に出る**ので、中央に置くとシンボルの台座に食われる。
 */
function vicuna(x, base, h, dir = 1) {
  const bw = r1(h * 0.92);
  const by = r1(base - h * 0.56);
  const nx = r1(x + dir * bw * 0.4);
  const ny = r1(base - h * 0.95);
  const coat = "#c98a52";
  return (
    `<g>` +
    shade(x, r1(base + 1), r1(bw * 0.5), 2.2, ".18") +
    `<g stroke="${coat}" stroke-width="${r1(h * 0.06)}" stroke-linecap="round">` +
    `<path d="M${r1(x - bw * 0.3)},${by}v${r1(h * 0.5)}M${r1(x - bw * 0.14)},${by}v${r1(h * 0.48)}"/>` +
    `<path d="M${r1(x + bw * 0.16)},${by}v${r1(h * 0.5)}M${r1(x + bw * 0.3)},${by}v${r1(h * 0.47)}"/>` +
    `</g>` +
    `<ellipse cx="${x}" cy="${by}" rx="${r1(bw * 0.46)}" ry="${r1(h * 0.19)}" fill="${coat}"/>` +
    // 胸と腹の白。**これがビクーニャの印**
    `<path d="M${r1(x - bw * 0.34)},${r1(by + h * 0.06)}q${r1(bw * 0.34)},${r1(h * 0.14)} ${r1(bw * 0.7)},0q${r1(-bw * 0.34)},${r1(h * 0.08)} ${r1(-bw * 0.7)},0z" fill="#f0e6d2"/>` +
    `<path d="M${nx},${r1(by - h * 0.04)}l${r1(dir * h * 0.06)},${r1(-h * 0.2)}" stroke="#f0e6d2" stroke-width="${r1(h * 0.07)}" stroke-linecap="round" fill="none"/>` +
    // 細く長い首
    `<path d="M${nx},${r1(by - h * 0.06)}L${r1(nx + dir * h * 0.1)},${ny}" stroke="${coat}" stroke-width="${r1(h * 0.1)}" stroke-linecap="round" fill="none"/>` +
    `<ellipse cx="${r1(nx + dir * h * 0.14)}" cy="${r1(ny - h * 0.02)}" rx="${r1(h * 0.1)}" ry="${r1(h * 0.07)}" fill="${coat}"/>` +
    `<path d="M${r1(nx + dir * h * 0.09)},${r1(ny - h * 0.06)}l${r1(dir * h * 0.02)},${r1(-h * 0.09)}l${r1(dir * h * 0.04)},${r1(h * 0.07)}z" fill="${coat}"/>` +
    `<circle cx="${r1(nx + dir * h * 0.2)}" cy="${r1(ny - h * 0.01)}" r="1.1" fill="#2f2823"/>` +
    `</g>`
  );
}

/** アパチェータ(峠に積む石塚)。旅人が1つずつ石を足していく。 */
function apacheta(x, base, h) {
  const rocks = [
    [0, 0.94, 0.5],
    [-0.3, 0.7, 0.4],
    [0.32, 0.66, 0.38],
    [-0.1, 0.42, 0.34],
    [0.18, 0.28, 0.26],
    [-0.02, 0.1, 0.2],
  ];
  let out = shade(x, r1(base + 1), r1(h * 0.62), 3, ".22");
  for (const [dx, dy, rw] of rocks) {
    out +=
      `<ellipse cx="${r1(x + dx * h * 0.5)}" cy="${r1(base - dy * h * 0.5)}" ` +
      // 石はプナの礫地より明るく。雪の上なら逆に暗く落とすが、
      // ここは地面のほうが暗いので、同じ明度にすると塚が地面に溶ける。
      `rx="${r1(rw * h * 0.42)}" ry="${r1(rw * h * 0.3)}" fill="#9a8fa8"/>`;
  }
  return `<g>${out}</g>`;
}

/**
 * ケニュア(ポリレピス)。**世界でいちばん高いところに生える木。**サハマの林。
 * 赤茶の薄い樹皮がめくれた、ねじれた低木。まっすぐな幹にすると別の木になる。
 */
function quenua(x, base, h) {
  return (
    `<g>` +
    `<path d="M${x},${base}q${r1(-h * 0.16)},${r1(-h * 0.3)} ${r1(h * 0.06)},${r1(-h * 0.52)}" stroke="#8a4a32" stroke-width="${r1(h * 0.11)}" stroke-linecap="round" fill="none"/>` +
    `<path d="M${r1(x + h * 0.06)},${r1(base - h * 0.44)}l${r1(-h * 0.22)},${r1(-h * 0.16)}M${r1(x + h * 0.06)},${r1(base - h * 0.5)}l${r1(h * 0.24)},${r1(-h * 0.12)}" stroke="#8a4a32" stroke-width="${r1(h * 0.06)}" stroke-linecap="round" fill="none"/>` +
    `<ellipse cx="${r1(x - h * 0.14)}" cy="${r1(base - h * 0.66)}" rx="${r1(h * 0.24)}" ry="${r1(h * 0.15)}" fill="#5f7a4a"/>` +
    `<ellipse cx="${r1(x + h * 0.24)}" cy="${r1(base - h * 0.64)}" rx="${r1(h * 0.22)}" ry="${r1(h * 0.13)}" fill="#4f6a3e"/>` +
    `<ellipse cx="${r1(x + h * 0.04)}" cy="${r1(base - h * 0.8)}" rx="${r1(h * 0.2)}" ry="${r1(h * 0.12)}" fill="#5f7a4a"/>` +
    `</g>`
  );
}

/** トトラ(葦)の株。チチカカの岸とパンタナルの水際に生える。 */
function reeds(x, base, h, n = 5, fill = "#8a9a4a") {
  let d = "";
  for (let i = 0; i < n; i++) {
    const off = (i - (n - 1) / 2) * (h * 0.09);
    const len = r1(h * (0.7 + ((i * 3) % 4) * 0.11));
    d += `M${r1(x + off)},${base}q${r1(off * 0.5)},${r1(-len * 0.6)} ${r1(off * 1.4)},${-len}`;
  }
  return (
    `<path d="${d}" stroke="${fill}" stroke-width="2" stroke-linecap="round" fill="none"/>` +
    // 穂。先に小さな塊を付けると葦になる
    `<g fill="#b8a35e"><ellipse cx="${r1(x - h * 0.08)}" cy="${r1(base - h * 0.78)}" rx="1.8" ry="3.4"/>` +
    `<ellipse cx="${r1(x + h * 0.1)}" cy="${r1(base - h * 0.72)}" rx="1.6" ry="3"/></g>`
  );
}

/**
 * 塩原のひび割れ。**格子にしない。**
 * 元の絵は同じ菱形を 60px ちょうどの間隔で並べていて、塩の結晶ではなく
 * タイル張りの床に見えていた。行ごとにずらし、大きさも変える。
 */
function saltCrust(y, count, w, color, opacity) {
  let d = "";
  for (let i = 0; i < count; i++) {
    // 幅を1つずつ変える。同じにすると床のタイルになる
    const cw = r1(w * (0.72 + ((i * 7) % 5) * 0.14));
    const x = r1(i * w - (((i * 11) % 7) * w) / 16);
    const h = r1(cw * 0.3);
    d += `M${x},${y}l${r1(cw * 0.5)},${-h}l${r1(cw * 0.5)},${h}l${r1(-cw * 0.5)},${h}z`;
  }
  return `<path d="${d}" stroke="${color}" stroke-width="1.4" opacity="${opacity}" fill="none"/>`;
}

/**
 * 白い漆喰の家(スクレ)。
 * ⚠ **白い町は壁がいちばん明るい。**屋根・軒の影・開口部を思い切って暗くしないと、
 * 家が背景に溶けて形が出ない。中間の明度で描くと全部消える。
 */
function colonial(x, base, w, h, roof = "#a8462f") {
  return (
    `<g>` +
    `<rect x="${x}" y="${r1(base - h)}" width="${w}" height="${h}" fill="#f4efe4"/>` +
    // 軒の影。壁の上端をはっきり切る
    `<rect x="${x}" y="${r1(base - h)}" width="${w}" height="3" fill="#b8ac98"/>` +
    `<path d="M${r1(x - w * 0.1)},${r1(base - h)}h${r1(w * 1.2)}l${r1(-w * 0.1)},${r1(-h * 0.26)}h${r1(-w)}z" fill="${roof}"/>` +
    `<path d="M${r1(x - w * 0.1)},${r1(base - h)}h${r1(w * 1.2)}v2h${r1(-w * 1.2)}z" fill="#7a3222"/>` +
    // 開口部。**濃く。**白壁に薄い窓を開けても穴に見えない
    `<g fill="#4a3f36"><rect x="${r1(x + w * 0.16)}" y="${r1(base - h * 0.62)}" width="${r1(w * 0.18)}" height="${r1(h * 0.3)}"/>` +
    `<rect x="${r1(x + w * 0.62)}" y="${r1(base - h * 0.62)}" width="${r1(w * 0.18)}" height="${r1(h * 0.3)}"/>` +
    `<rect x="${r1(x + w * 0.38)}" y="${r1(base - h * 0.34)}" width="${r1(w * 0.22)}" height="${r1(h * 0.34)}"/></g>` +
    `</g>`
  );
}

/** 赤い岩の尖塔(トゥピサのケブラダ)。上を細く、根元を広く。 */
function spire(x, base, w, h, fill = "#a85436", dark = "#7f3a26") {
  return (
    `<g>` +
    `<path d="M${r1(x - w * 0.5)},${base}q${r1(w * 0.12)},${r1(-h * 0.5)} ${r1(w * 0.34)},${-h}` +
    `q${r1(w * 0.2)},${r1(h * 0.08)} ${r1(w * 0.32)},${h}z" fill="${fill}"/>` +
    `<path d="M${r1(x + w * 0.06)},${r1(base - h)}q${r1(w * 0.2)},${r1(h * 0.08)} ${r1(w * 0.32)},${h}h${r1(-w * 0.18)}q${r1(-w * 0.1)},${r1(-h * 0.5)} ${r1(-w * 0.14)},${-h}z" fill="${dark}"/>` +
    // 地層。横に数本、長さを変えて
    `<g stroke="${dark}" stroke-width="1.2" opacity=".6" fill="none">` +
    `<path d="M${r1(x - w * 0.36)},${r1(base - h * 0.3)}h${r1(w * 0.6)}M${r1(x - w * 0.28)},${r1(base - h * 0.55)}h${r1(w * 0.44)}M${r1(x - w * 0.2)},${r1(base - h * 0.75)}h${r1(w * 0.3)}"/></g>` +
    `</g>`
  );
}

export const BOLIVIA_RICH_BG = {
  /**
   * アンデスの谷(バジェス)。**6都市が共用する。**
   * (サマイパタ・バジェグランデ・タリハ・タラブコ・アイキレ・コチャバンバ)
   *
   * 元は14要素で、空・三角の山2つ・緑の地面・等間隔の曲線5本だけだった。
   * 曲線は段々畑のつもりだが、土手が無いので**ただの縞**に見えていた。
   *
   * 層: 夕方の空(3階調)/ 遠いアンデスの峰と雪 / 靄の帯 / 中景の乾いた尾根 /
   * 谷の村(教会と日干し煉瓦の家)/ 段々畑6段(作物の色と畝を段ごとに変える)/
   * 土の道とトゥルフィ(乗合バン)/ 荷を積んだリャマ2頭とチョリータ /
   * 最前景のモジェとリュウゼツラン。
   *
   * 時間は**夕方**にした。真昼の緑一色より、斜めの光で段々畑の段差が出る。
   */
  valley:
    // ── 空。細かく刻んで階調にする。y=118 まで塗り下ろす
    sky(118, "#5b9bd0", "#a7cbe0") +
    `<circle cx="332" cy="42" r="15" fill="#f7cf6a" opacity=".95"/>` +
    `<circle cx="332" cy="42" r="27" fill="#f7cf6a" opacity=".14"/>` +
    // 高い巻雲。動きの層の雲(y=42)とぶつからないよう上と下に散らす
    `<g fill="#f6efe2"><ellipse cx="88" cy="18" rx="34" ry="4.6" opacity=".62"/><ellipse cx="60" cy="25" rx="20" ry="3.2" opacity=".44"/><ellipse cx="252" cy="14" rx="26" ry="3.8" opacity=".5"/><ellipse cx="146" cy="66" rx="32" ry="3.2" opacity=".3"/></g>` +
    // ── 遠いアンデスの峰。**高さも幅もばらす。**
    // 等間隔の三角を並べたら、山ではなく旗の連なりに見えた。
    `<path d="M0,126L36,74L62,102L96,50L138,98L176,86L204,110L246,58L288,96L318,82L352,108L400,88V210H0z" fill="#94a2b8"/>` +
    `<g fill="#eef2f6" opacity=".92"><path d="M96,50l17,21h-34z"/><path d="M246,58l15,19h-30z"/></g>` +
    // 手前の峰(重ねると奥行きが出る)
    `<path d="M0,132L52,96L88,118L128,88L182,120L232,100L270,122L322,98L364,120L400,106V210H0z" fill="#7d8ba6"/>` +
    `<g fill="#e4ebf2" opacity=".8"><path d="M128,88l12,15h-24z"/><path d="M322,98l11,14h-22z"/></g>` +
    // 峰の陰(西日なので稜線の右側が暗い)
    `<path d="M128,88l54,32l-22,0z" fill="#6b7890" opacity=".55"/>` +
    `<path d="M322,98l42,22l-18,2z" fill="#6b7890" opacity=".5"/>` +
    // ── 靄。**帯を敷かない。**不透明の矩形を渡したら山を横切る一本線になった。
    // 薄く広い楕円を2つ重ねて、稜線の根元だけを白ませる。
    `<g fill="#e8eef2"><ellipse cx="120" cy="124" rx="190" ry="16" opacity=".38"/><ellipse cx="316" cy="128" rx="150" ry="13" opacity=".32"/></g>` +
    // ── 中景の乾いた尾根(バジェスは緑一色ではなく、褐色の斜面が混じる)
    `<path d="M0,148L58,128L112,144L168,126L226,146L282,130L336,148L400,134V210H0z" fill="#a08f63"/>` +
    `<path d="M0,154L58,138L112,152L168,136L226,154L282,142L336,156L400,144V210H0z" fill="#7d8a52"/>` +
    // 尾根の襞。斜めの短い線で乾いた斜面の質感を出す
    `<g stroke="#68753f" stroke-width="1.3" opacity=".5" fill="none"><path d="M24,158l9,-15M54,152l8,-13M300,158l9,-14M334,162l8,-13M370,154l8,-12"/></g>` +
    // ── 谷の村。**左3分の1に寄せる**(中央はシンボルに隠れるため)
    shade(72, 156, 62, 6, ".12") +
    adobe(16, 154, 26, 16) +
    adobe(48, 153, 22, 13, "#a85838") +
    adobe(98, 155, 24, 14) +
    // 教会(鐘楼のある白い正面。谷の村はこれで一気にボリビアになる)
    `<rect x="66" y="136" width="26" height="20" fill="#f2ece0"/>` +
    `<path d="M64,136h30l-4,-7h-22z" fill="#b5643c"/>` +
    `<rect x="72" y="122" width="14" height="15" fill="#f2ece0"/>` +
    `<path d="M70,122h18l-3,-6h-12z" fill="#b5643c"/>` +
    `<path d="M75,126h8v6h-8z" fill="#5c4632"/>` +
    `<path d="M79,116v-5M76.5,113h5" stroke="#5c4632" stroke-width="1.6" fill="none"/>` +
    `<rect x="75" y="146" width="8" height="10" fill="#5c4632"/>` +
    // ── 段々畑(アンデネス)。**この絵の主役。**
    // 作物の色を段ごとに変える。同じ緑を並べると1枚の斜面に見えるので、
    // 緑・麦の黄・耕した土を混ぜる。左右で高さを変えて、水平な帯にしない。
    // 下地。段が中央でたわむぶん、下に必ず地面を敷いておく(塗り残し対策)。
    ground(150, "#7aa768") +
    // 段は2段だけ。**次の段は「土手の下」から始める。**
    // 段の高さぶんしか空けずに並べたら、土手が次の段に上書きされて
    // 段差が1本も見えず、ただの色帯3本になった。
    // 左右で高さを変えて傾け、たわみも大きくする。ゆるい弧だと等高線に見えず、
    // ただの横縞になる(ゆるい弧で撮ったら色帯が3本並んだだけだった)。
    terrace(146, 158, 13, "#8cb872", "#3f4a26", 22) +
    terrace(168, 178, 13, "#c8a95f", "#6b5424", 20) +
    furrows(151, 22, 14, 386, 17, "#4f7a45") +
    furrows(173, 20, 22, 378, 21, "#9c8038") +
    stones(159, 22, [28, 96, 168, 252, 330], "#252d16") +
    stones(181, 20, [56, 132, 214, 296, 366], "#4a3a1c") +
    // 谷底。段々畑の下は平らな畑地にして、人と車を置く場所をつくる
    `<path d="M0,193q104,-8 200,0q96,8 200,-4v21H0z" fill="#6f9e63"/>` +
    // ── 土の道。**y>170 の中央は空いているので、ここを使う**
    `<path d="M0,204q100,-9 200,-1q100,8 200,-5v12q-100,13 -200,5q-100,-8 -200,1z" fill="#c2a06a"/>` +
    `<path d="M0,202q100,-9 200,-1q100,8 200,-5" stroke="#a8875a" stroke-width="1.6" fill="none" opacity=".7"/>` +
    // トゥルフィ(乗合バン)。屋根に荷物を積んでいるのがボリビアらしい
    shade(292, 190, 22, 3.4, ".2") +
    `<path d="M268,190v-14q0,-4 5,-4h30q4,0 6,4l5,8v6z" fill="#e8e2d4"/>` +
    `<rect x="268" y="182" width="46" height="4" fill="#2f7fb8"/>` +
    `<g fill="#a8cfe4"><rect x="273" y="175" width="12" height="7"/><rect x="288" y="175" width="11" height="7"/></g>` +
    `<g fill="#5b4a34"><rect x="272" y="168" width="18" height="5" rx="1"/><rect x="293" y="169" width="13" height="4" rx="1"/></g>` +
    `<g fill="#33302b"><circle cx="278" cy="190" r="4"/><circle cx="306" cy="190" r="4"/></g>` +
    // ── 荷を積んだリャマ。畑の縁を右から左へ
    llama(348, 196, 26, -1) +
    `<rect x="341" y="176" width="15" height="7" rx="2" fill="#c4452f"/>` +
    llama(376, 200, 22, -1, "#c8b193") +
    // チョリータ。道ばたに2人(市の帰り)
    cholita(118, 200, 26, "#c4452f", "#2f6b7f") +
    cholita(140, 197, 23, "#2f6b7f", "#d4a017") +
    // 畑で屈んで働く人。段々畑の大きさが伝わる。
    // 影の楕円(200,155 rx53)に重なる中央は避けて、左の段に置く。
    `<g><ellipse cx="86" cy="180" rx="6" ry="4" fill="#7f4a2f"/><circle cx="91" cy="175" r="3.4" fill="#c98d5f"/><path d="M88,172h7v2h-7z" fill="#4a3d31"/></g>` +
    // ── 最前景。**隅だけ。**中央に置くと主役のシンボルを飲み込む
    molle(28, 208, 46, true) +
    `<g fill="#4a6b3a"><path d="M382,210l-8,-26l6,1z"/><path d="M388,210l-2,-30l5,3z"/><path d="M394,210l6,-27l2,4z"/><path d="M377,210l-12,-19l6,-1z"/></g>` +
    // 手前の土手。地面より2段暗くして、しみにならないようにする
    `<path d="M0,210v-9q54,-6 108,2q56,8 112,-3q54,-10 110,4q36,5 70,-2v8z" fill="#4a3a26"/>`,

  /**
   * アマゾンの川辺の町(ベニ・パンド)。**6都市が共用する。**
   * (コビハ・リベラルタ・グアヤラメリン・ルレナバケ・サンイグナシオ・ビジャトゥナリ)
   *
   * 元は21要素で、空・同じ大きさの円を11個並べた「森」・緑の地面・青い川の帯だけ。
   * 円の列は森ではなく**泡の列**に見えていた。川も水色で、アマゾンの濁った川ではない。
   *
   * **動きの層に合わせる位置が決まっている**(`bolivia-amazon.tsx`):
   *   もやが y=92〜102 に湧く → 樹冠をその高さに置く
   *   川面のきらめきが y=182〜200 に走る → 川をそこに通す
   *
   * 層: 朝の空 / 遠い森の壁と靄 / 樹冠(大小の塊)と突き出す高木 / 椰子 /
   * 高床の家と船着き場 / 濁った川(3段)とさざ波 / 川舟2艘と映り込み /
   * 手前の泥の土手・カスターニャの麻袋・荷を積む人・モトタクシー / 最前景のバナナ。
   *
   * 時間は**朝**。もやが立つのは朝で、動きの層がそれを描いている。
   */
  amazon:
    // ── 空。湿った朝なので、青は浅く白っぽい
    sky(104, "#9fc9dc", "#dbe6dc") +
    `<circle cx="316" cy="34" r="13" fill="#f7e9b0" opacity=".8"/>` +
    `<circle cx="316" cy="34" r="24" fill="#f7e9b0" opacity=".18"/>` +
    `<g fill="#f6efe2"><ellipse cx="96" cy="24" rx="36" ry="5" opacity=".55"/><ellipse cx="66" cy="31" rx="22" ry="3.4" opacity=".4"/><ellipse cx="286" cy="20" rx="28" ry="4" opacity=".45"/></g>` +
    // ── 遠い森の壁。輪郭を細かく波打たせる(三角に切ると山になってしまう)
    `<path d="M0,118q22,-14 44,-6q20,8 40,-4q22,-13 46,-2q24,10 44,-6q22,-16 46,-4q24,12 46,-2q22,-13 46,-4q22,9 44,-2q18,-9 44,-4V210H0z" fill="#7f9e88"/>` +
    // 靄。**薄く。**遠景を明るくしすぎると、森の中ほどに白い帯が1本通って見える。
    // 動きの層(bam-mist)がこの高さに白いもやを足すので、下地は控えめでよい。
    `<g fill="#e8f0ea"><ellipse cx="130" cy="121" rx="180" ry="11" opacity=".26"/><ellipse cx="320" cy="125" rx="140" ry="9" opacity=".22"/></g>` +
    // ── 樹冠。もや(y=92〜102)が載る高さに、大小をずらして並べる
    crown(28, 112, 34, 17, "#4a8a52", "#31693e") +
    crown(96, 104, 40, 20, "#3f8046", "#2b5f39") +
    crown(168, 110, 36, 18, "#4a8a52", "#31693e") +
    crown(240, 102, 42, 21, "#3f8046", "#2b5f39") +
    crown(308, 110, 34, 17, "#4a8a52", "#31693e") +
    crown(372, 106, 38, 19, "#3f8046", "#2b5f39") +
    // 突き出す高木。**これが無いと並木に見える。**中央はシンボルに隠れるので左右へ
    emergent(58, 128, 52) +
    emergent(126, 124, 44) +
    emergent(330, 126, 48) +
    emergent(388, 130, 40) +
    // 椰子。羽の切れ込みで椰子と分かる(輪郭だけだとバナナの葉になる)
    palm(20, 150, 44, 4) +
    palm(356, 152, 38, -5) +
    // 樹冠の下側の陰。森に厚みが出る
    `<path d="M0,132q40,10 84,4q46,-6 92,6q48,10 96,-4q44,-12 88,4q22,6 40,2V210H0z" fill="#2b5f39"/>` +
    // ── 川辺の町。**左3分の1に寄せる**(中央はシンボルに隠れるため)
    `<path d="M0,150q54,-6 108,2q52,8 104,-2v18H0z" fill="#6f8a4e"/>` +
    stiltHouse(16, 152, 30, 26) +
    stiltHouse(56, 154, 26, 22, "#7a7f84") +
    stiltHouse(96, 153, 28, 24) +
    // 船着き場の桟橋。川へ差し出す
    `<path d="M52,166h58v4H52z" fill="#8a6a44"/>` +
    `<g stroke="#5c4632" stroke-width="2"><path d="M60,170v8M84,170v9M106,170v8"/></g>` +
    // ── 濁った川。**水色にはしないが、土と同じ色にもしない。**
    // 最初に泥と同じ茶で塗ったら、川ではなく地面に見え、舟が地面に置かれた
    // 木片になった。空を映すぶんだけ明るく、わずかに灰色へ振って土と分ける。
    // **水は岸より暗くする。**岸より明るく塗ったら、川ではなく砂地に見えた。
    // 暗い水面に明るいさざ波が走る形にすると、一目で水と分かる。
    `<path d="M0,166q100,-5 200,1q100,6 200,-3v46H0z" fill="#7d7a5c"/>` +
    // 対岸の森の映り込み。水際のこの帯がいちばん強い手がかりになる
    `<path d="M0,166q100,-5 200,1q100,6 200,-3v10q-100,8 -200,2q-100,-6 -200,1z" fill="#41563d" opacity=".8"/>` +
    `<path d="M0,182q104,-4 202,2q98,6 198,-3v29H0z" fill="#6e6b4f"/>` +
    `<path d="M0,197q106,-3 204,2q96,5 196,-2v13H0z" fill="#5f5d44"/>` +
    // 空を映している明るい面。泥の川でも、ところどころ空の色を拾う
    `<g fill="#aebfbc" opacity=".22"><ellipse cx="86" cy="186" rx="70" ry="7"/><ellipse cx="300" cy="196" rx="84" ry="8"/></g>` +
    // さざ波。**舟のある x では線を切る**(切らないと舟が水に開いた穴に見える)
    ripples(176, [[18, 46], [96, 40], [186, 52], [268, 44], [340, 44]], "#e2d6ac", ".7", [[126, 176]]) +
    ripples(188, [[8, 40], [72, 46], [150, 44], [232, 50], [318, 52]], "#dccfa2", ".6", [[126, 176], [252, 306]]) +
    ripples(200, [[26, 44], [104, 48], [190, 46], [274, 42], [348, 40]], "#d2c496", ".52", [[252, 306]]) +
    // ── 川舟2艘。日よけを載せた大きいものと、小さい丸木舟
    boat(151, 176, 50, "#8a6a44", "#c9a86a") +
    // 舟をこぐ人(艫に立つ)
    `<g><rect x="170" y="163" width="4" height="10" fill="#2f6b7f"/><circle cx="172" cy="160" r="3.2" fill="#c98d5f"/><path d="M175,162l10,-9" stroke="#8a6a44" stroke-width="1.8" stroke-linecap="round" fill="none"/></g>` +
    boat(279, 190, 54, "#7a5c3c") +
    `<g><rect x="292" y="177" width="4" height="10" fill="#c4452f"/><circle cx="294" cy="174" r="3.2" fill="#c98d5f"/><path d="M290,176l-11,-8" stroke="#8a6a44" stroke-width="1.8" stroke-linecap="round" fill="none"/></g>` +
    // ── 手前の泥の土手。**bottom-left の隅だけ。**川全面を残さないと
    // きらめき(y=182〜200)が土に載ってしまう
    `<path d="M0,210v-40q30,4 54,14q26,10 40,26z" fill="#9c8258"/>` +
    `<path d="M0,210v-28q26,4 46,14q20,10 30,14z" fill="#7a6442"/>` +
    // カスターニャ(ブラジルナッツ)の麻袋。リベラルタは世界一の集散地
    `<g fill="#c9b48a"><ellipse cx="26" cy="192" rx="10" ry="7"/><ellipse cx="44" cy="198" rx="9" ry="6.5"/><ellipse cx="16" cy="202" rx="9" ry="6"/></g>` +
    `<g stroke="#9c8258" stroke-width="1.2" fill="none"><path d="M20,187q6,-3 12,0M38,193q6,-3 11,0M10,197q6,-3 11,0"/></g>` +
    // 袋を担ぐ人。**そこで人が何をしている土地なのかを出す**
    `<g><rect x="62" y="188" width="5" height="14" fill="#3f5f2f"/><rect x="69" y="188" width="5" height="14" fill="#3f5f2f"/>` +
    `<path d="M60,180h16l2,10h-20z" fill="#e8dcc0"/><circle cx="68" cy="175" r="5" fill="#c98d5f"/>` +
    `<ellipse cx="68" cy="168" rx="9" ry="4" fill="#c9b48a"/></g>` +
    // モトタクシー。アマゾンの町はこれで動いている
    shade(112, 204, 16, 3, ".22") +
    `<g><circle cx="102" cy="200" r="6" fill="#33302b"/><circle cx="124" cy="200" r="6" fill="#33302b"/>` +
    `<path d="M100,200l8,-12h12l6,12z" fill="#c4452f"/>` +
    `<path d="M108,188l-4,-7" stroke="#5c4632" stroke-width="2" stroke-linecap="round" fill="none"/>` +
    `<rect x="110" y="176" width="5" height="12" fill="#2f6b7f"/><circle cx="112" cy="172" r="4.2" fill="#c98d5f"/></g>` +
    // ── 最前景。**隅だけ。**中央に置くと主役のシンボルを飲み込む
    banana(364, 210, 50) +
    `<path d="M0,210q18,-14 12,-30q22,10 26,30z" fill="#2b5f39"/>`,

  /**
   * 4000mの高原(アルティプラーノ)。**5都市が共用する。**
   * (ビジャソン・オルロ・エルアルト・ティワナク・チャジャパタ)
   *
   * 元は42要素。空・三角の山1つ・地面2枚と、**同じ大きさの丸を26個、
   * 等間隔の格子に並べたもの**だけだった。草原ではなく方眼紙の模様に見えていた。
   *
   * **動きの層に合わせる位置が決まっている**(`bolivia-altiplano.tsx`):
   *   薄雲 y=16/52/74、鳥 y=34〜74 → 空を空けておく
   *   砂ぼこりが y=150/173/197 を横切る → その高さは開けた平地にする
   *   **イチュ草が (34,200) (126,190) (232,204) (318,186) (378,199) で揺れる**
   *   → 静止の株はそこを避けて置く(重ねると1株が二重に見える)
   *
   * 層: 高地の濃い空 / 遠いコルディリェラと雪 / 靄 / 干上がった塩の面と浅い水 /
   * イチュ草の平原(3段)/ 村とチュルパ(石の墓塔)/ 放牧のリャマとアイマラの羊飼い /
   * 散らしたイチュ草の株 / 最前景のトラと石。
   *
   * 塩の面を入れたのは、この高原が「水が海に届かず、運ばれた塩が残る」土地だから。
   * ただし**難破船は描かない。**それはチャジャパタのシンボル(boat)の仕事で、
   * 背景に描くと他の4都市で意味が合わなくなる。
   */
  altiplano:
    // ── 空。4000mなので青が濃い。雲と鳥が通るので上半分は空けておく。
    // **塗り下ろす深さは稜線のいちばん低いところ(y=128)に合わせる。**
    // 見えている高さ(102)で止めたら、稜線の外側が下地のまま黒く抜けた。
    sky(134, "#3f7fc4", "#8fb8d8") +
    `<circle cx="322" cy="34" r="14" fill="#f7e3a0" opacity=".9"/>` +
    `<circle cx="322" cy="34" r="25" fill="#f7e3a0" opacity=".13"/>` +
    // ── 遠いコルディリェラ。高さも幅もばらす
    `<path d="M0,128L30,92L58,112L92,76L126,108L158,88L196,116L228,82L262,110L296,94L330,116L364,98L400,120V210H0z" fill="#9a95c4"/>` +
    `<g fill="#f2f4f8" opacity=".95"><path d="M92,76l15,19h-30z"/><path d="M228,82l14,18h-28z"/><path d="M296,94l12,15h-24z"/></g>` +
    // 手前の連なり(重ねると奥行きが出る)
    `<path d="M0,134L44,110L84,126L124,104L170,128L214,108L258,128L302,112L348,130L400,116V210H0z" fill="#8f8bbf"/>` +
    `<path d="M124,104l46,24l-20,0z" fill="#7d79a8" opacity=".6"/>` +
    `<path d="M302,112l46,18l-18,2z" fill="#7d79a8" opacity=".55"/>` +
    // 靄。**帯を敷かない。**薄い楕円で稜線の根元だけ白ませる
    `<g fill="#dfe6ee"><ellipse cx="120" cy="132" rx="180" ry="11" opacity=".4"/><ellipse cx="320" cy="136" rx="140" ry="9" opacity=".34"/></g>` +
    // ── 干上がった塩の面と、残った浅い水。高原の白い帯
    `<path d="M0,140q98,-6 196,0q102,6 204,-3v18H0z" fill="#e4e0d2"/>` +
    `<path d="M22,148q60,-5 122,1q56,5 108,-2v6q-56,7 -110,2q-60,-5 -120,1z" fill="#aac4d4" opacity=".85"/>` +
    `<g stroke="#f4f2ea" stroke-width="1.4" opacity=".7" fill="none"><path d="M40,145h44M120,150h52M232,146h40M300,149h56"/></g>` +
    // ── イチュ草の平原。3段に分けて、手前ほど暗く
    ground(154, "#cbae78") +
    `<path d="M0,170q100,-6 200,1q100,6 200,-4v45H0z" fill="#b8975c"/>` +
    `<path d="M0,192q104,-5 204,2q96,6 196,-4v22H0z" fill="#a3844c"/>` +
    // ── 村とチュルパ。**左3分の1に寄せる**(中央はシンボルに隠れるため)
    shade(72, 154, 60, 5, ".12") +
    adobe(14, 154, 26, 15, "#8a9098") +
    adobe(46, 153, 22, 13, "#9aa0a6") +
    adobe(92, 155, 24, 14, "#8a9098") +
    `<rect x="72" y="140" width="16" height="14" fill="#e8dcc0"/>` +
    `<path d="M70,140h20l-3,-6h-14z" fill="#8a9098"/>` +
    `<path d="M80,134v-5M77.5,131h5" stroke="#5c4632" stroke-width="1.4" fill="none"/>` +
    // チュルパ2基。高原にぽつんと立つ石の墓塔
    chullpa(126, 162, 13, 22) +
    chullpa(146, 164, 10, 16) +
    // ── 放牧のリャマ。**右3分の1にまとめる**
    llama(286, 180, 26, -1) +
    llama(316, 186, 22, -1, "#c8b193") +
    llama(348, 178, 24, 1, "#e0d2b8") +
    // アイマラの羊飼い。糸を紡ぎながら群れを見ている
    cholita(252, 188, 25, "#2f6b7f", "#c4452f") +
    `<path d="M258,176l9,4" stroke="#c98d5f" stroke-width="2" stroke-linecap="round" fill="none"/>` +
    `<circle cx="269" cy="182" r="3" fill="#d9c7a8"/>` +
    // ── 散らしたイチュ草。**格子に置かない。**位置も大きさも不揃いにする。
    // 動きの層が (34,200)(126,190)(232,204)(318,186)(378,199) で揺らすので、そこは空ける
    tuft(14, 196, 15, -1) +
    tuft(52, 187, 12, 1) +
    tuft(74, 203, 17, -2) +
    tuft(96, 181, 11, 0) +
    tuft(150, 199, 14, 1) +
    tuft(172, 191, 10, -1) +
    tuft(198, 205, 16, 2) +
    tuft(216, 185, 12, 0) +
    tuft(258, 197, 15, -1) +
    tuft(280, 206, 13, 1) +
    tuft(298, 190, 11, 0) +
    tuft(340, 201, 16, -2) +
    tuft(360, 189, 12, 1) +
    tuft(392, 183, 10, 0) +
    // 中景の小さい株。手前より短くして距離を出す
    tuft(24, 167, 8, 0, "#a08a56") +
    tuft(64, 161, 7, 1, "#a08a56") +
    tuft(108, 172, 8, -1, "#a08a56") +
    tuft(292, 165, 7, 0, "#a08a56") +
    tuft(332, 173, 8, 1, "#a08a56") +
    tuft(372, 160, 7, -1, "#a08a56") +
    // ── 最前景。**隅だけ。**地面より2段暗くしないと、ただのしみになる
    tola(22, 208, 18, 11) +
    tola(58, 210, 13, 8) +
    tola(374, 207, 17, 10) +
    `<g fill="#8a8272"><ellipse cx="104" cy="207" rx="11" ry="5"/><ellipse cx="118" cy="209" rx="7" ry="3.4"/><ellipse cx="330" cy="209" rx="9" ry="4"/></g>` +
    `<path d="M0,210v-7q56,-5 112,2q58,7 116,-3q56,-9 114,3q32,4 58,-1v6z" fill="#8f7340"/>`,

  /**
   * グラン・チャコの乾いた森。**3都市が共用する。**
   * (サンホセ・デ・チキートス・ビジャモンテス・ヤクイバ)
   *
   * 元は12要素。空2枚・太陽・地面2枚と、**同じ形のサボテンを 58px ちょうどの
   * 等間隔で7本**並べただけだった。判子を押した列に見えていた。
   *
   * **動きの層に合わせる位置が決まっている**(`bolivia-chaco.tsx`):
   *   陽炎が y=111〜124 でゆらぐ → **地平線をその高さに置く**
   *   鷹が y=36〜68 で輪を描く → 空を空けておく
   *   砂ぼこりが (140,168) と (300,192) を流れる → その高さは開けた地面にする
   *
   * 層: 灼けた空 / 遠い藪の帯と陽炎の逃げ水 / 棘の森(ケブラチョ)/ 乾いた大地(3段)/
   * 鉄道の終点(ヤクイバ)/ トボロチとカルドン / ペッカリー2頭 / 積み込む人 /
   * 最前景の棘の藪と白化した倒木。
   *
   * **中央の隠れる帯には、繰り返しの、失っても惜しくないものを置く。**
   * ここではケブラチョの並木がそれで、左右の端だけが見えればよい作りにしてある。
   */
  chaco:
    // ── 空。南米でいちばん暑い土地なので、青を抜いて白っぽく灼く。
    // **塗り下ろす深さは地平のいちばん低いところ(y=128)に合わせる。**
    sky(130, "#7fa8c8", "#f0e0bc", "#bcc8c2") +
    `<circle cx="316" cy="40" r="17" fill="#fff2cc" opacity=".85"/>` +
    `<circle cx="316" cy="40" r="30" fill="#fff2cc" opacity=".2"/>` +
    // ── 遠い藪の帯。低く平たく(山にすると土地が変わってしまう)
    `<path d="M0,122q26,-8 52,-3q24,5 48,-4q26,-9 52,-2q24,7 48,-5q26,-9 52,-1q24,6 48,-4q24,-8 48,-2q22,5 52,-1V210H0z" fill="#a89a68"/>` +
    // 逃げ水。地平の際だけ白ませる(帯を敷くと横一文字の線になる)
    `<g fill="#fff4d6"><ellipse cx="130" cy="126" rx="170" ry="7" opacity=".45"/><ellipse cx="316" cy="129" rx="120" ry="6" opacity=".38"/></g>` +
    // ── 棘の森。**中央の隠れる帯を、この繰り返しで埋める。**
    // 高さと間隔を1本ずつ変える(等間隔に置くと判子の列になる)
    quebracho(18, 146, 30) +
    quebracho(52, 143, 22) +
    quebracho(88, 148, 34) +
    quebracho(132, 144, 26) +
    quebracho(178, 149, 31) +
    quebracho(226, 145, 24) +
    quebracho(268, 148, 33) +
    quebracho(310, 143, 27) +
    quebracho(352, 147, 30) +
    quebracho(388, 144, 23) +
    // ── 乾いた大地。3段に分けて、手前ほど赤茶を強く
    ground(146, "#c2a86a") +
    `<path d="M0,166q100,-6 200,1q100,6 200,-4v47H0z" fill="#b09656"/>` +
    `<path d="M0,190q104,-5 204,2q96,6 196,-4v22H0z" fill="#9c8248"/>` +
    // ひび割れ。**等間隔の格子にしない。**長さも角度もばらす
    `<g stroke="#8a7040" stroke-width="1.2" opacity=".55" fill="none">` +
    `<path d="M22,176l14,5l-6,7M64,196l18,-4M108,184l9,8l12,-2M186,200l16,3M262,180l11,7M306,198l15,-5l8,4M356,186l13,6"/></g>` +
    // ── 鉄道の終点。ヤクイバは線路がここで終わる町
    `<path d="M0,172h124v3H0z" fill="#8a7a5c"/>` +
    `<g fill="#6b5638"><rect x="6" y="169" width="5" height="9"/><rect x="26" y="169" width="5" height="9"/><rect x="46" y="169" width="5" height="9"/><rect x="66" y="169" width="5" height="9"/><rect x="86" y="169" width="5" height="9"/><rect x="106" y="169" width="5" height="9"/></g>` +
    `<g stroke="#9a9a92" stroke-width="1.6" fill="none"><path d="M0,171h122M0,176h122"/></g>` +
    // 車止め。**ここで線路が終わる**ことがこの町の由来
    `<path d="M120,168h6v12h-6z" fill="#8a5a3a"/>` +
    `<path d="M118,166h10v4h-10z" fill="#c4452f"/>` +
    // 小屋
    adobe(30, 168, 28, 16, "#8a9098") +
    // 積み込む人。麻袋を線路際へ運んでいる
    `<g><rect x="72" y="158" width="4" height="11" fill="#3f5f2f"/><rect x="78" y="158" width="4" height="11" fill="#3f5f2f"/>` +
    `<path d="M70,151h14l2,8h-18z" fill="#e8dcc0"/><circle cx="77" cy="147" r="4.4" fill="#c98d5f"/>` +
    `<ellipse cx="77" cy="141" rx="8" ry="3.4" fill="#c9b48a"/></g>` +
    `<g fill="#c9b48a"><ellipse cx="96" cy="166" rx="9" ry="6"/><ellipse cx="110" cy="169" rx="8" ry="5.4"/></g>` +
    // ── トボロチとカルドン。**右3分の1にまとめる**
    toborochi(348, 196, 62) +
    cardon(296, 194, 34, [-1, 1]) +
    cardon(320, 200, 26, [1]) +
    cardon(266, 198, 22, [-1]) +
    // ── ペッカリー2頭。藪から出てきたところ
    peccary(186, 196, 20, -1) +
    peccary(214, 202, 16, -1, "#554a40") +
    // ── 最前景。**隅だけ。**地面より2段暗くする
    tola(24, 208, 17, 10, "#6f6a3a") +
    tola(58, 210, 12, 7, "#6f6a3a") +
    tola(384, 209, 15, 9, "#6f6a3a") +
    // 白化した倒木。乾いた土地の手前にこれがあると暑さが出る
    `<path d="M96,204q34,-6 68,1q-32,7 -68,-1z" fill="#d8cdb0"/>` +
    `<path d="M150,203l14,-6M138,205l10,5" stroke="#d8cdb0" stroke-width="3" stroke-linecap="round" fill="none"/>` +
    `<path d="M0,210v-6q58,-4 116,2q56,6 112,-2q54,-8 112,3q30,3 60,-1v4z" fill="#8a7040"/>`,

  /**
   * ユンガス(雲霧林)の斜面。**2都市が共用する。**(コロイコ・チュルマニ)
   *
   * 元は24要素。`valley` と同じ「乾いた広い谷」に見えていたが、ここは
   * アンデスとアマゾンのあいだの**濡れた狭い谷**で、別の土地。
   * 作り分けの軸は3つ: 緑を濃く湿らせる / 霧の層を重ねる / 段を短く斜めに積む。
   *
   * **動きの層に合わせる位置が決まっている**(`bolivia-yungas.tsx`):
   *   霧の帯が y=96〜101 / 122〜127 / 140〜144 を流れる → その高さに山肌を置く
   *   谷から湧く霧が (150,150) (320,156) → そこは開けておく
   *   **自転車が道を下る。経路が決まっている**:
   *     (414,150)→(341,154)→(250,160)→(181,166)→(120,164)→(59,162)→(-14,168)
   *     → **道はこの線の上に敷く。**ずれると自転車が宙を走る
   *
   * 層: 曇った空 / 霧に消える尾根 / 山肌(3段の緑)/ タカナの段とコカ畑 /
   * 崖に切った道と石積みの擁壁 / 滝 / 道ばたに広げたコカの天日干しと人 /
   * 最前景の濡れた葉。
   */
  yungas:
    // ── 空。雲霧林なので晴れさせない。**尾根のいちばん低いところまで塗り下ろす。**
    sky(106, "#b8ccce", "#e4ecea") +
    // ── 霧に消える遠い尾根。輪郭を薄くして、奥にあることを見せる
    // 峰の高さも幅もばらす。等間隔の三角を並べると、山ではなく旗の連なりになる
    `<path d="M0,92L26,70L58,88L104,52L142,84L188,72L226,94L268,58L318,86L352,74L400,96V210H0z" fill="#7d968e"/>` +
    `<g fill="#e8f2f0"><ellipse cx="120" cy="98" rx="180" ry="9" opacity=".38"/><ellipse cx="320" cy="94" rx="130" ry="8" opacity=".32"/></g>` +
    // ── 山肌。**横に寝かせない。**なだらかな波で描いたら、深い谷ではなく
    // 丘陵地に見えた。左右から急な尾根を下ろし、あいだを谷にする。
    // 霧の帯(y=96/122/140)が載る高さに肌を置く。
    // **谷底を下げすぎない。**深いVに切ったら、あいだから遠景の淡い色が
    // 70px ぶん覗いて、中ほどが白く抜けたようになった。
    `<path d="M0,100L74,114L128,126L180,132L236,128L300,114L358,102L400,96V210H0z" fill="#4a6b52"/>` +
    `<path d="M0,120L66,136L124,148L184,156L242,150L306,134L364,118L400,112V210H0z" fill="#3a5c42"/>` +
    // 尾根筋の襞。**斜面の向きに沿って倒す。**垂直に立てると崖に見えない
    `<g stroke="#2f4d37" stroke-width="1.4" opacity=".5" fill="none">` +
    `<path d="M34,124l14,-10M78,140l15,-9M126,154l16,-8M310,140l14,-11M352,122l13,-10M378,114l12,-9"/></g>` +
    // ── タカナの段とコカ畑。**短い段を斜めに積む**(横に長い段は valley の絵)
    shelf(24, 124, 74, 7, "#5f8a58", "#4a5f3a") +
    shelf(16, 138, 88, 7, "#6b9560", "#4a5f3a") +
    shelf(268, 128, 82, 7, "#5f8a58", "#4a5f3a") +
    shelf(280, 142, 92, 7, "#6b9560", "#4a5f3a") +
    shelf(30, 110, 66, 6, "#547d4e", "#43552f") +
    shelf(262, 114, 74, 6, "#547d4e", "#43552f") +
    cocaRow(112, [36, 49, 61, 74, 86], 2.8) +
    cocaRow(126, [30, 42, 55, 66, 80, 92], 3.2) +
    cocaRow(140, [22, 36, 48, 62, 74, 88, 99], 3.4) +
    cocaRow(116, [268, 281, 294, 307, 320, 331], 2.8) +
    cocaRow(130, [274, 288, 300, 314, 327, 340], 3.2) +
    cocaRow(144, [286, 299, 312, 326, 338, 352, 364], 3.4) +
    // 尾根の上の集落。コロイコは尾根の背に乗っている町
    shade(146, 122, 34, 4, ".14") +
    adobe(122, 122, 20, 11, "#a85838") +
    adobe(146, 121, 17, 10, "#8a9098") +
    adobe(166, 123, 19, 10, "#a85838") +
    `<rect x="140" y="110" width="11" height="11" fill="#f2ece0"/>` +
    `<path d="M138,110h15l-2,-5h-11z" fill="#a85838"/>` +
    `<path d="M145.5,105v-4M143.5,102.5h4" stroke="#5c4632" stroke-width="1.2" fill="none"/>` +
    // 雲霧林の木。斜面に点々と。**等間隔に置かない**
    crown(56, 150, 17, 9, "#3f6b46", "#2b5236") +
    crown(96, 158, 14, 7, "#46744c", "#31593b") +
    crown(206, 148, 16, 8, "#3f6b46", "#2b5236") +
    crown(248, 156, 13, 7, "#46744c", "#31593b") +
    crown(330, 152, 15, 8, "#3f6b46", "#2b5236") +
    // ── 手前の山肌。道の下は谷へ落ちる
    `<path d="M0,150L60,142L130,154L200,146L270,158L340,148L400,156V210H0z" fill="#2b4a34"/>` +
    // ── 崖に切った道。**自転車の経路の上に敷く。**
    // 上の切り通しの肌 → 路面 → 下の石積みの擁壁、の順で重ねる
    // 切り通しの肌(道の上)。自転車の経路をそのまま辿る
    `<path d="M-14,168L59,162L120,164L181,166L250,160L341,154L414,150v-9L341,145L250,151L181,157L120,155L59,153L-14,159z" fill="#6b6558"/>` +
    // 路面。**細くする。**幅を20px取ったら山道ではなく海辺の広い道路に見えた
    `<path d="M-14,168L59,162L120,164L181,166L250,160L341,154L414,150v7L341,161L250,167L181,173L120,171L59,169L-14,175z" fill="#a8926a"/>` +
    `<path d="M-14,171L59,165L120,167L181,169L250,163L341,157L414,153" stroke="#8f7a56" stroke-width="1.2" fill="none" opacity=".8"/>` +
    // 擁壁の石。等間隔に置かない
    `<g fill="#5f5a4e" opacity=".8"><rect x="18" y="172" width="9" height="5" rx="1"/><rect x="52" y="171" width="7" height="4" rx="1"/><rect x="96" y="170" width="10" height="5" rx="1"/><rect x="152" y="169" width="8" height="4" rx="1"/><rect x="214" y="164" width="9" height="5" rx="1"/><rect x="286" y="160" width="8" height="4" rx="1"/><rect x="342" y="156" width="9" height="5" rx="1"/></g>` +
    // 谷側のガードの杭。**低く、まばらに。**「世界で最も危険な道」なので柵は頼りない
    `<g stroke="#5c4632" stroke-width="2" stroke-linecap="round" fill="none"><path d="M36,176v7M110,174v7M198,170v7M300,162v7M368,158v7"/></g>` +
    // ── 滝。チュルマニの側。右の壁を落ちる
    waterfall(370, 108, 150, 3.4) +
    // ── 道ばたのコカの天日干し。**y>170 の中央は空いているので、ここを使う**
    `<path d="M150,188q46,-6 92,0q-46,7 -92,0z" fill="#8fae5a"/>` +
    `<path d="M158,188q38,-4 76,0q-38,5 -76,0z" fill="#a8c46a"/>` +
    cocaRow(186, [162, 176, 190, 204, 218, 230], 2.6, "#7aa84e") +
    // 葉を広げる人。しゃがんで手を伸ばしている
    `<g><rect x="126" y="182" width="4" height="12" fill="#3f5f2f"/><rect x="132" y="182" width="4" height="12" fill="#3f5f2f"/>` +
    `<path d="M124,174h14l2,9h-18z" fill="#c4452f"/><circle cx="131" cy="169" r="4.4" fill="#c98d5f"/>` +
    `<path d="M139,177l12,6" stroke="#c98d5f" stroke-width="2.2" stroke-linecap="round" fill="none"/></g>` +
    // 麻袋。乾いた葉を詰めて運ぶ
    `<g fill="#c9b48a"><ellipse cx="258" cy="192" rx="9" ry="6.4"/><ellipse cx="272" cy="196" rx="8" ry="5.6"/></g>` +
    // ── 谷から湧く霧の受け皿。動きの層が (150,150) (320,156) から立ちのぼるので、
    // その下は暗く落として、霧が浮き上がって見えるようにする
    `<path d="M0,210v-16q60,-8 122,2q64,10 128,-4q62,-14 150,2v16z" fill="#20382a"/>` +
    // ── 最前景の濡れた葉。**隅だけ。**中央に置くと主役のシンボルを飲み込む
    wetLeaf(6, 206, 44, 0.72, -0.7) +
    wetLeaf(2, 210, 38, 0.94, -0.34) +
    wetLeaf(30, 210, 34, 0.3, -0.95, "#35583f") +
    wetLeaf(398, 204, 46, -0.7, -0.72) +
    wetLeaf(400, 210, 36, -0.95, -0.3, "#35583f") +
    wetLeaf(372, 210, 32, -0.24, -0.97),

  /**
   * ベニの大サバンナ(ジャノス・デ・モホス)。**2都市が共用する。**
   * (トリニダー・コンセプシオン)
   *
   * 元は18要素。空・雲2つ・太陽・地面2枚と、水色の曲線2本だけ。
   *
   * ⚠ **水路の位置は動かせない。**`bolivia-savanna.tsx` のきらめきが
   *   (44,138)(176,142)(328,135) と (56,184)(198,186)(346,178) にあり、
   *   **元の絵の曲線2本をそのままなぞっている。**構図を変えて水を動かすと、
   *   草の上で水が光る(日本の `port` で小舟が岸壁に乗ったのと同じ壊れ方)。
   *   → 曲線の通り道は1pxも変えず、幅と岸だけを足してある。
   *   白鷺は y=92〜110 を渡るので、地平はその高さに置く。
   *
   * 層: 熱帯の空 / 森の島(ジャノス特有の丸い林)/ 草原(3段)/ 水路2本と泥の岸 /
   * シロアリ塚 / コブ牛の群れとバケーロ / モタクー椰子 / 最前景の高い草と柵。
   */
  savanna:
    // ── 空。**地平のいちばん低いところまで塗り下ろす**(森の島の根元は y=120)
    sky(124, "#7cc0e8", "#c8e4f0") +
    `<circle cx="52" cy="38" r="16" fill="#fff2cc" opacity=".9"/>` +
    `<circle cx="52" cy="38" r="28" fill="#fff2cc" opacity=".16"/>` +
    // ── 森の島。ジャノスは平らな草原に丸い林が点々と浮かぶ。**大きさをばらす**
    crown(30, 108, 30, 13, "#5f8a52", "#47693d") +
    crown(92, 112, 22, 10, "#6b9558", "#4f7343") +
    crown(146, 106, 26, 11, "#5f8a52", "#47693d") +
    crown(214, 111, 20, 9, "#6b9558", "#4f7343") +
    crown(272, 105, 28, 12, "#5f8a52", "#47693d") +
    crown(340, 110, 24, 10, "#6b9558", "#4f7343") +
    `<g fill="#dcecec"><ellipse cx="140" cy="119" rx="180" ry="7" opacity=".35"/><ellipse cx="330" cy="121" rx="120" ry="6" opacity=".3"/></g>` +
    // ── 草原。3段に分けて、手前ほど濃く
    ground(118, "#8fbf62") +
    `<path d="M0,148q100,-6 200,1q100,6 200,-4v65H0z" fill="#7cae52"/>` +
    `<path d="M0,192q104,-5 204,2q96,6 196,-4v20H0z" fill="#6b9a46"/>` +
    // ── 水路2本。**通り道は元の絵のまま。**泥の岸を足して幅を出す
    `<path d="M-10,140C80,132 160,150 250,138C310,130 370,140 410,134" stroke="#9c8a5e" stroke-width="13" fill="none" opacity=".9"/>` +
    `<path d="M-10,186C90,178 180,194 280,182C340,174 380,182 410,178" stroke="#9c8a5e" stroke-width="15" fill="none" opacity=".9"/>` +
    `<path d="M-10,140C80,132 160,150 250,138C310,130 370,140 410,134" stroke="#5b9fe0" stroke-width="7" fill="none"/>` +
    `<path d="M-10,186C90,178 180,194 280,182C340,174 380,182 410,178" stroke="#5b9fe0" stroke-width="9" fill="none"/>` +
    // 岸に映る空。水際を明るくすると水らしくなる
    `<path d="M-10,138C80,130 160,148 250,136C310,128 370,138 410,132" stroke="#8fc8ec" stroke-width="2" fill="none" opacity=".6"/>` +
    `<path d="M-10,183C90,175 180,191 280,179C340,171 380,179 410,175" stroke="#8fc8ec" stroke-width="2.4" fill="none" opacity=".55"/>` +
    // ── シロアリ塚。**等間隔に置かない**
    termite(64, 168, 9) +
    termite(118, 174, 7) +
    termite(292, 170, 8) +
    termite(336, 176, 6) +
    termite(382, 166, 7) +
    // ── モタクー椰子。ジャノスの島にはこれが立つ
    palm(20, 152, 34, 3) +
    palm(366, 156, 30, -4) +
    // ── コブ牛の群れ。**左右に振る**(中央はシンボルに隠れる)
    zebu(76, 200, 20, 1) +
    zebu(112, 206, 17, 1, "#a8845c") +
    zebu(300, 198, 19, -1) +
    zebu(340, 204, 16, -1, "#e0d2b8") +
    // バケーロ。馬から降りて群れを見ている(トリニダーは牛の町)
    `<g><rect x="176" y="192" width="4" height="12" fill="#3f5f2f"/><rect x="183" y="192" width="4" height="12" fill="#3f5f2f"/>` +
    `<path d="M174,180h15l2,12h-19z" fill="#e8dcc0"/><circle cx="181" cy="175" r="4.6" fill="#c98d5f"/>` +
    `<ellipse cx="181" cy="170" rx="10" ry="3" fill="#8a6a48"/>` +
    `<path d="M190,184l10,-8" stroke="#8a6a48" stroke-width="1.8" stroke-linecap="round" fill="none"/></g>` +
    // ── 最前景。**隅だけ。**地面より2段暗くする
    tuft(16, 208, 18, -2, "#4f7a3a") +
    tuft(44, 210, 15, 1, "#4f7a3a") +
    tuft(238, 209, 16, -1, "#4f7a3a") +
    tuft(392, 207, 17, 2, "#4f7a3a") +
    // 牧場の柵。牛の町であることを手前でもう一度出す
    `<g stroke="#8a6a48" stroke-width="2.4" stroke-linecap="round" fill="none"><path d="M258,206v-13M286,204v-13M314,203v-12"/></g>` +
    `<g stroke="#8a6a48" stroke-width="1.6" fill="none"><path d="M256,196q30,-2 60,-3M256,201q30,-2 60,-3"/></g>` +
    `<path d="M0,210v-7q56,-5 112,2q58,7 116,-3q56,-9 114,3q32,4 58,-1v6z" fill="#4f7a3a"/>`,

  /**
   * アンデスの高峰。**2都市が共用する。**(ポトシ・サハマ)
   *
   * 元は8要素。空2枚・月・稜線1枚・雪冠2つ・地面2枚だけ。
   *
   * ⚠ **山頂を動かせない。**`bolivia-andes.tsx` は雪煙を (74,44) と (214,32) から
   *   吹かせていて、コメントに「背景の雪冠 70,42 と 210,30 から」と書いてある。
   *   **この2つの頂と雪冠は元の位置のまま。**動かすと雪煙が空から湧く
   *   (日本の `port` で小舟が岸壁に乗ったのと同じ壊れ方)。
   *   コンドルは y=60〜96 を横切り、雪は y=56〜92 から降る。
   *
   * 層: 高地の濃い空 / 遠い峰 / 主稜線(頂は据え置き)と雪冠・雪渓 / 岩肌の襞 /
   * プナの礫地(3段)/ ケニュアの林 / ビクーニャ / アパチェータ / 石積みの囲い。
   *
   * ⚠ **雪の上に置くものは思い切って暗くする。**雪原がこの絵でいちばん明るいので、
   *   中間の明度は溶けて消える。岩も獣も、平地に置くときより2段落としてある。
   */
  andes:
    // ── 空。**稜線の裾(y=132)まで塗り下ろす**
    sky(138, "#3a5a9c", "#7d97cc") +
    `<circle cx="320" cy="36" r="15" fill="#f6efe2" opacity=".92"/>` +
    `<circle cx="320" cy="36" r="26" fill="#f6efe2" opacity=".12"/>` +
    // ── 遠い峰。主稜線より淡く、後ろに置く
    `<path d="M0,120L44,86L82,108L128,74L172,104L218,80L266,110L310,84L352,106L400,90V210H0z" fill="#7d72b0"/>` +
    `<g fill="#dfe2f2" opacity=".8"><path d="M128,74l13,17h-26z"/><path d="M310,84l11,14h-22z"/></g>` +
    // ── 主稜線。**頂 (70,42) と (210,30) は動かさない**(雪煙の吹き出し口)
    `<path d="M-20,132L28,86L70,42L106,84L140,100L176,62L210,30L248,72L300,110L344,74L400,50L420,132z" fill="#6e5fa8"/>` +
    // 岩肌の陰。稜線の風下側を落とす
    `<path d="M70,42L106,84L140,100L118,102z" fill="#584a8c" opacity=".7"/>` +
    `<path d="M210,30L248,72L300,110L268,108z" fill="#584a8c" opacity=".65"/>` +
    `<path d="M400,50L344,74L372,116L400,110z" fill="#584a8c" opacity=".5"/>` +
    // 雪冠。**元の形をそのまま置く**
    `<polygon points="52,66 70,42 90,68 76,64 70,56 62,64" fill="#f6efe2"/>` +
    `<polygon points="188,54 210,30 234,60 218,56 210,46 200,56" fill="#f6efe2"/>` +
    // 雪渓。谷筋に残る雪。**稜線から下へ細く伸ばす。**
    // 独立した菱形で置いたら、斜面に貼りついた雪ではなく宙に浮いた宝石に見えた。
    `<g fill="#f6efe2">` +
    `<path d="M74,58l9,3l6,34l-4,6l-6,-34z" opacity=".92"/>` +
    `<path d="M214,46l10,3l7,38l-5,6l-7,-38z" opacity=".92"/>` +
    `<path d="M174,68l7,2l-5,28l-4,3l3,-28z" opacity=".85"/>` +
    `<path d="M346,80l8,2l5,26l-4,4l-5,-26z" opacity=".85"/>` +
    `</g>` +
    // 影の側は青く落とす。日向の雪との差で凹凸が出る
    `<g fill="#cdd2e8">` +
    `<path d="M83,61l5,2l5,32l-3,4l-5,-32z" opacity=".8"/>` +
    `<path d="M224,49l6,2l6,36l-4,4l-6,-36z" opacity=".78"/>` +
    `</g>` +
    // 岩の襞。稜線に沿って倒す
    `<g stroke="#584a8c" stroke-width="1.4" opacity=".55" fill="none">` +
    `<path d="M44,96l12,-14M84,104l11,-13M156,92l12,-14M282,102l12,-14M326,94l11,-12M376,80l10,-11"/></g>` +
    // ── プナの礫地。3段。高地なので緑にしない
    ground(128, "#7a6a8f") +
    `<path d="M0,152q100,-6 200,1q100,6 200,-4v61H0z" fill="#6b5c80"/>` +
    `<path d="M0,186q104,-5 204,2q96,6 196,-4v26H0z" fill="#5e5072"/>` +
    // 礫。**等間隔に置かない。**雪原より暗く落とす
    `<g fill="#4f4460"><ellipse cx="46" cy="176" rx="8" ry="4"/><ellipse cx="118" cy="184" rx="6" ry="3.2"/><ellipse cx="268" cy="180" rx="7" ry="3.6"/><ellipse cx="342" cy="190" rx="9" ry="4.4"/><ellipse cx="196" cy="196" rx="7" ry="3.4"/></g>` +
    // ── ケニュアの林。**世界でいちばん高いところに生える木**(サハマ)
    quenua(28, 168, 26) +
    quenua(58, 174, 20) +
    quenua(92, 166, 23) +
    quenua(330, 170, 24) +
    quenua(364, 178, 19) +
    // ── ビクーニャ。**首が背より高いので中央には置かない**
    vicuna(126, 196, 24, 1) +
    vicuna(296, 202, 20, -1) +
    // ── アパチェータ。峠に旅人が積む石塚
    apacheta(212, 200, 30) +
    // 高地の石積みの小屋。屋根はイチュ草を葺く。**地面より明るく**しないと溶ける
    `<g>` +
    shade(66, 191, 26, 4, ".22") +
    `<path d="M48,191h36v-13h-36z" fill="#8a8098"/>` +
    `<path d="M44,178h44l-6,-11h-32z" fill="#a08a56"/>` +
    `<g stroke="#6b6278" stroke-width="1" opacity=".8" fill="none"><path d="M48,184h36M56,178v13M70,178v13"/></g>` +
    `<rect x="62" y="182" width="8" height="9" fill="#3f3648"/>` +
    `</g>` +
    // 石積みの囲い(高地の家畜囲い)。低く、途切れさせる
    `<g stroke="#4f4460" stroke-width="4" stroke-linecap="round" fill="none"><path d="M20,200h44M92,204h30M140,198h30"/></g>` +
    // 崩れた礫。斜面の裾に散らす
    `<g fill="#584d68"><ellipse cx="150" cy="166" rx="9" ry="4"/><ellipse cx="228" cy="170" rx="7" ry="3.4"/><ellipse cx="308" cy="164" rx="8" ry="3.8"/><ellipse cx="86" cy="162" rx="7" ry="3.2"/><ellipse cx="372" cy="172" rx="9" ry="4.2"/></g>` +
    quenua(122, 174, 18) +
    quenua(266, 176, 21) +
    quenua(392, 170, 17) +
    // ── イチュ草。礫のあいだにまばらに
    tuft(16, 206, 13, -1, "#8a7a56") +
    tuft(70, 200, 10, 1, "#8a7a56") +
    tuft(160, 208, 14, 0, "#8a7a56") +
    tuft(248, 202, 11, -1, "#8a7a56") +
    tuft(316, 208, 13, 1, "#8a7a56") +
    tuft(384, 200, 10, 0, "#8a7a56") +
    `<path d="M0,210v-6q56,-5 112,2q58,7 116,-3q56,-9 114,3q32,4 58,-1v5z" fill="#4a3f5c"/>`,

  /**
   * チチカカ湖(コパカバーナ)。
   *
   * ⚠ **画面の下 2/3 はぜんぶ水。**`bolivia-lake.tsx` は
   *   波を y=124/134/148/172/186/200(x は 40〜338 に散る)、
   *   きらめきを x=312〜334 の y=118〜168、**トトラの葦舟を (112,156)** に描く。
   *   → **岸を手前に作らない。**下端まで水にして、葦は左右の端だけに置く。
   *   (日本の `port` で、岸壁を手前にしたら小舟が陸に乗った件と同じ形)
   *
   * 層: 高地の空 / 対岸のコルディリェラ・レアルと雪 / 太陽の道 / 湖(3段)/
   * 太陽の島の影 / 岸の集落(水際より上)/ 端のトトラ / 葦舟と漁師。
   */
  lake:
    // ── 空。**水際(y=108)まで塗り下ろす**
    sky(112, "#4a86c4", "#a8cfe0") +
    `<circle cx="322" cy="38" r="18" fill="#f7e3a0" opacity=".92"/>` +
    `<circle cx="322" cy="38" r="30" fill="#f7e3a0" opacity=".15"/>` +
    `<g fill="#f6efe2"><ellipse cx="104" cy="28" rx="30" ry="4.4" opacity=".6"/><ellipse cx="78" cy="34" rx="18" ry="3" opacity=".45"/><ellipse cx="228" cy="22" rx="24" ry="3.6" opacity=".5"/></g>` +
    // ── 対岸のコルディリェラ・レアル。チチカカの向こうは雪の壁
    `<path d="M0,108L34,80L68,98L110,66L152,96L196,74L240,100L284,70L330,96L370,78L400,94V210H0z" fill="#7d8ba6"/>` +
    `<g fill="#eef2f6" opacity=".92"><path d="M110,66l14,18h-28z"/><path d="M284,70l13,17h-26z"/></g>` +
    `<path d="M110,66l42,30l-18,0z" fill="#6b7890" opacity=".55"/>` +
    // 太陽の島(イスラ・デル・ソル)。湖に浮かぶ低い島影
    `<path d="M28,110q26,-11 58,-4q22,5 40,4z" fill="#5f6f88"/>` +
    `<path d="M250,110q24,-9 52,-3q20,4 36,3z" fill="#54637a"/>` +
    // ── 湖。**下端まで水。**沖は明るく、手前を濃く
    ground(108, "#3f9fbc") +
    `<path d="M0,142q100,-5 200,1q100,6 200,-4v71H0z" fill="#2f8fae"/>` +
    `<path d="M0,180q104,-4 204,2q96,5 196,-4v32H0z" fill="#257e9c"/>` +
    // 太陽の道。きらめき(x=312〜334)の下に敷いて、光る筋の理由を作る
    `<path d="M300,112q28,44 18,96h30q10,-52 -14,-96z" fill="#f7e3a0" opacity=".2"/>` +
    // 対岸の映り込み。水際のこの帯がいちばん強い「水だ」の手がかり
    `<path d="M0,108q100,-4 200,1q100,5 200,-3v8q-100,8 -200,3q-100,-5 -200,1z" fill="#5f6f88" opacity=".45"/>` +
    // さざ波。**動きの層の波が走る帯を避けずに、その下地として敷く**
    ripples(130, [[24, 40], [130, 46], [212, 40], [300, 36]], "#8fd8ea", ".45") +
    ripples(158, [[16, 44], [176, 42], [246, 38], [330, 40]], "#7fcde0", ".4") +
    ripples(192, [[36, 48], [140, 40], [284, 44], [352, 36]], "#6fc2d8", ".34") +
    // ── 岸の集落。**水際より上**(y<108)に置く
    shade(60, 106, 44, 4, ".12") +
    adobe(24, 106, 22, 12, "#a85838") +
    adobe(52, 105, 18, 10, "#8a9098") +
    adobe(78, 107, 20, 11, "#a85838") +
    `<rect x="46" y="94" width="12" height="12" fill="#f2ece0"/>` +
    `<path d="M44,94h16l-2,-5h-12z" fill="#a85838"/>` +
    // 舫った葦舟(岸側の小さいもの)
    `<path d="M96,110q12,6 24,0q-12,4 -24,0z" fill="#c9a877"/>` +
    // 太陽の島の段々畑。チチカカの島は斜面まで耕されている
    `<g>` +
    `<path d="M34,106q26,-4 54,-1" stroke="#7a8a6a" stroke-width="2.4" fill="none"/>` +
    `<path d="M40,102q22,-4 44,-1" stroke="#7a8a6a" stroke-width="2.2" fill="none"/>` +
    `<path d="M46,98q18,-3 34,-1" stroke="#7a8a6a" stroke-width="2" fill="none"/>` +
    `<path d="M256,106q22,-3 46,-1" stroke="#6f7f60" stroke-width="2.2" fill="none"/>` +
    `<path d="M262,102q18,-3 36,-1" stroke="#6f7f60" stroke-width="2" fill="none"/>` +
    `</g>` +
    // ── トトラ。**左右の端だけ。**波と葦舟の通る中央には置かない
    reeds(10, 200, 34, 5) +
    reeds(26, 208, 28, 4) +
    reeds(384, 202, 32, 5) +
    reeds(396, 210, 26, 4) +
    reeds(4, 186, 26, 4) +
    reeds(392, 188, 24, 4) +
    // 水鳥。チチカカにはカイツブリとバンが浮かぶ
    `<g fill="#3f4a52">` +
    `<ellipse cx="66" cy="150" rx="6" ry="2.6"/><path d="M71,148q4,-4 6,-1l-5,2z"/>` +
    `<ellipse cx="86" cy="158" rx="5" ry="2.2"/><path d="M90,156q3,-3 5,-1l-4,2z"/>` +
    `<ellipse cx="236" cy="186" rx="6.4" ry="2.8"/><path d="M241,184q4,-4 6,-1l-5,2z"/>` +
    `<ellipse cx="330" cy="196" rx="5.4" ry="2.4"/><path d="M334,194q3,-3 5,-1l-4,2z"/>` +
    `</g>` +
    `<g fill="#f6efe2" opacity=".7"><ellipse cx="66" cy="154" rx="7" ry="1.6"/><ellipse cx="236" cy="190" rx="7" ry="1.6"/></g>` +
    // 岸に干した網
    `<g stroke="#8a7a4a" stroke-width="1.6" fill="none"><path d="M120,106v-10M136,106v-10M152,106v-10"/>` +
    `<path d="M118,98h36M118,102h36"/></g>` +
    // 沖の葦舟(動きの層の舟とは別の、小さな2艘目)。漁師が網を上げている
    `<g><path d="M280,150q16,7 32,0q-16,5 -32,0z" fill="#c9a877"/>` +
    `<rect x="294" y="140" width="4" height="10" fill="#2f6b7f"/><circle cx="296" cy="137" r="3" fill="#c98d5f"/>` +
    `<path d="M299,141l9,-6" stroke="#8a7a4a" stroke-width="1.6" stroke-linecap="round" fill="none"/></g>`,

  /**
   * パンタナル(プエルト・スアレス)。世界最大の湿地。
   *
   * ⚠ `bolivia-pantanal.tsx` は水の照りを y=132/152/172(x=184〜364 の中央〜右)、
   *   **葦を x=104/120/136 に、下端 y=206 から生やす。**
   *   → 水は中央〜右に通し、**左下は葦が生える湿った岸**にしておく。
   *   コウノトリの群れは y=38〜60 を渡るので、空を空ける。
   *
   * 層: 夕方の空 / 遠い森 / 水路と浮き草 / 湿った岸 / 睡蓮 / カピバラとワニ /
   * ヤシ / 最前景の葦と流木。時間は**夕方**(パンタナルは夕焼けの土地)。
   */
  pantanal:
    // ── 夕方の空。**水際(y=118)まで塗り下ろす**
    sky(122, "#e8834a", "#f7d8a0", "#f0a85e") +
    `<circle cx="300" cy="88" r="24" fill="#f9e0a8" opacity=".9"/>` +
    `<circle cx="300" cy="88" r="38" fill="#f9e0a8" opacity=".18"/>` +
    `<g fill="#f9dcb0"><ellipse cx="96" cy="30" rx="34" ry="4.6" opacity=".55"/><ellipse cx="66" cy="37" rx="20" ry="3.2" opacity=".4"/><ellipse cx="252" cy="24" rx="26" ry="3.8" opacity=".45"/></g>` +
    // ── 遠い森。低く、夕日に沈めて紫がかった影に
    `<path d="M0,120q24,-10 48,-4q22,6 44,-5q24,-11 48,-3q22,8 46,-6q24,-12 48,-3q22,7 46,-5q22,-10 46,-3q20,6 40,-2V210H0z" fill="#7a5a52"/>` +
    `<g fill="#f7d8a0"><ellipse cx="130" cy="122" rx="170" ry="6" opacity=".35"/><ellipse cx="320" cy="124" rx="120" ry="5" opacity=".3"/></g>` +
    // ── 湿った岸。**左下は葦の生える岸**(動きの層が x=104〜136 に葦を生やす)
    ground(120, "#8a7a46") +
    `<path d="M0,140q60,-6 120,2q56,8 110,-2v70H0z" fill="#7a6c3e"/>` +
    // ── 水。**中央から右に通す**(照りが y=132/152/172 の x=184〜364 に走る)
    `<path d="M96,128q80,-6 158,2q76,8 146,-6v86H120q-14,-40 -24,-82z" fill="#8f7a52"/>` +
    `<path d="M110,146q76,-5 150,2q72,7 140,-5v67H128q-10,-32 -18,-64z" fill="#7d6a46"/>` +
    `<path d="M124,168q72,-4 144,2q68,6 132,-4v44H136q-6,-21 -12,-42z" fill="#6b5a3c"/>` +
    // 夕日を映す面。パンタナルの水は空の色を返す
    `<g fill="#f7d8a0" opacity=".28"><ellipse cx="262" cy="140" rx="90" ry="7"/><ellipse cx="318" cy="176" rx="72" ry="6"/></g>` +
    ripples(136, [[190, 40], [268, 44], [340, 40]], "#f0d8a8", ".5") +
    ripples(158, [[168, 42], [252, 46], [332, 38]], "#e8cc98", ".44") +
    ripples(180, [[204, 44], [288, 42], [352, 34]], "#dcc088", ".38") +
    // 睡蓮。水面に平たく浮かべる
    `<g fill="#4f7a3a"><ellipse cx="186" cy="150" rx="9" ry="3.4"/><ellipse cx="206" cy="158" rx="7" ry="2.8"/><ellipse cx="298" cy="166" rx="8" ry="3.2"/><ellipse cx="330" cy="184" rx="10" ry="3.6"/><ellipse cx="252" cy="176" rx="7" ry="2.8"/></g>` +
    `<g fill="#e8a0c0"><circle cx="208" cy="156" r="2.4"/><circle cx="332" cy="182" r="2.2"/></g>` +
    // ── ワニ(ヤカレ)。水際に半分沈めて、背だけ出す
    `<g fill="#4a4436"><path d="M150,196q26,-5 52,0q-26,4 -52,0z"/><path d="M196,194l10,-3l-2,5z"/>` +
    `<g><ellipse cx="160" cy="194" rx="2" ry="1.4"/><ellipse cx="172" cy="193.6" rx="1.8" ry="1.2"/></g></g>` +
    `<circle cx="203" cy="194" r="1" fill="#f7d8a0"/>` +
    // カピバラ。岸で寝そべっている
    `<g fill="#8a6a48">` +
    shade(60, 178, 16, 3, ".2") +
    `<ellipse cx="60" cy="172" rx="15" ry="7"/><ellipse cx="74" cy="167" rx="7" ry="5.4"/>` +
    `<path d="M78,164l3,-3l2,4z"/><rect x="50" y="176" width="4" height="4"/><rect x="66" y="176" width="4" height="4"/></g>` +
    `<circle cx="78" cy="166" r="1" fill="#2f2823"/>` +
    // ── ヤシ。岸の縁に
    palm(24, 150, 34, 3) +
    palm(376, 146, 30, -4) +
    // ── 最前景。**左下の葦は動きの層が描くので、こちらは根元の湿地だけ**
    reeds(44, 208, 30, 5, "#5f6b34") +
    reeds(168, 210, 26, 4, "#5f6b34") +
    `<path d="M0,210v-14q54,-6 108,2q56,8 112,-3q54,-9 112,3q30,3 68,-2v14z" fill="#5a4c30"/>` +
    // 流木
    `<path d="M232,204q30,-5 60,1q-30,6 -60,-1z" fill="#8a7a5c"/>`,

  /**
   * ウユニ塩湖。
   *
   * ⚠ `bolivia-salar.tsx` は**雲の映り込みを y=98〜106 に置く**
   *   ((150,104)(130,101)(172,101)(300,100)(284,98)(80,106)(250,102) など)。
   *   空の雲(y=46〜65)を鏡像にしたもの。**水鏡はこの高さに置く。**
   *   太陽の道は (320,112) と (320,126)。
   *
   * ⚠ **白い地面がこの絵でいちばん明るい。**普通の明度のものは全部溶ける。
   *   置くものは思い切って暗く落としてある(車・人・塩の山・遠い火山)。
   *
   * 層: 濃い空 / トゥヌパ火山 / 水鏡(雲を映す)/ 乾いた塩の甲羅(不揃いな多角形)/
   * 塩の採取の山 / 四駆と人 / 最前景の塩の畝。
   */
  salar:
    // ── 空。高地なので濃い。**水鏡(y=94)まで塗り下ろす**
    sky(98, "#3f74c0", "#8fb8dc") +
    `<circle cx="320" cy="28" r="15" fill="#fff2cc" opacity=".95"/>` +
    `<circle cx="320" cy="28" r="27" fill="#fff2cc" opacity=".16"/>` +
    `<g fill="#f6efe2" opacity=".85"><ellipse cx="150" cy="46" rx="34" ry="6"/><ellipse cx="130" cy="50" rx="20" ry="4"/><ellipse cx="172" cy="50" rx="22" ry="4"/>` +
    `<ellipse cx="300" cy="62" rx="26" ry="4.4"/><ellipse cx="284" cy="65" rx="16" ry="3"/>` +
    `<ellipse cx="80" cy="58" rx="24" ry="4"/><ellipse cx="250" cy="52" rx="20" ry="3.4"/></g>` +
    // ── トゥヌパ火山。**遠くても暗く。**塩原が明るいので、淡くすると消える
    `<path d="M0,94L38,78L74,88L118,62L166,86L214,72L262,90L310,76L356,88L400,80V210H0z" fill="#5f5a70"/>` +
    `<g fill="#e8ecf2" opacity=".9"><path d="M118,62l11,14h-22z"/><path d="M310,76l9,11h-18z"/></g>` +
    // ── 水鏡。**雲の映り込み(y=98〜106)が載る面**
    `<rect x="0" y="94" width="400" height="44" fill="#cfd8de"/>` +
    // 空の色を返す。鏡は地の白より少し青い
    `<rect x="0" y="94" width="400" height="24" fill="#a8bfd0" opacity=".7"/>` +
    // 山の映り込み。**上下を反転させた形**を薄く敷く
    `<path d="M0,94L38,110L74,100L118,126L166,102L214,116L262,98L310,112L356,100L400,108V94z" fill="#5f5a70" opacity=".3"/>` +
    // 太陽の道(きらめきが x=320 の y=112/126 に走る)
    `<path d="M306,96q18,26 12,46h26q6,-24 -12,-46z" fill="#f5d68a" opacity=".22"/>` +
    // ── 乾いた塩の甲羅。**格子にしない**(元の絵は 60px 等間隔の菱形だった)
    `<rect x="0" y="134" width="400" height="76" fill="#f6efe2"/>` +
    `<path d="M0,134q100,-4 200,2q100,6 200,-4v10q-100,10 -200,4q-100,-6 -200,2z" fill="#e8e0d0"/>` +
    saltCrust(146, 9, 46, "#cfc6b0", ".9") +
    saltCrust(164, 8, 52, "#c9bfa8", ".85") +
    saltCrust(184, 7, 60, "#c2b8a0", ".8") +
    saltCrust(204, 6, 68, "#b8ae96", ".75") +
    // ── インカワシ島(サボテンの島)。塩原にぽつんと浮かぶ岩の島
    `<g>` +
    `<path d="M186,134q18,-13 40,-8q18,4 30,8z" fill="#7a6a5c"/>` +
    `<path d="M198,132q12,-8 26,-5q12,3 20,5z" fill="#8f7f6e"/>` +
    cardon(200, 128, 14, [-1], "#4a6336") +
    cardon(212, 126, 17, [1, -1], "#4a6336") +
    cardon(226, 129, 12, [-1], "#4a6336") +
    cardon(238, 127, 15, [1], "#4a6336") +
    `</g>` +
    // ── フラミンゴ。塩湖の浅瀬に来る。**白の上なので濃く。**脚と首は細いので
    // 淡い桃色にすると消える
    `<g>` +
    `<g stroke="#b8506a" stroke-width="1.6" fill="none"><path d="M96,124v10M100,124v10M148,127v9M152,127v9M290,122v10M294,122v10"/></g>` +
    `<ellipse cx="98" cy="120" rx="8" ry="4.4" fill="#e0708c"/>` +
    `<path d="M104,118q6,-8 2,-13" stroke="#e0708c" stroke-width="2.4" fill="none"/>` +
    `<path d="M106,105l5,2l-5,2z" fill="#3f3630"/>` +
    `<ellipse cx="150" cy="123" rx="7" ry="4" fill="#d8657f"/>` +
    `<path d="M155,121q5,-7 2,-11" stroke="#d8657f" stroke-width="2.2" fill="none"/>` +
    `<path d="M157,110l4,2l-4,2z" fill="#3f3630"/>` +
    `<ellipse cx="292" cy="118" rx="7.4" ry="4.2" fill="#e0708c"/>` +
    `<path d="M298,116q5,-7 2,-12" stroke="#e0708c" stroke-width="2.2" fill="none"/>` +
    `<path d="M300,104l5,2l-5,2z" fill="#3f3630"/>` +
    `</g>` +
    // 塩の煉瓦の小屋。塩原の建物は塩で建てる
    `<g>` +
    shade(348, 158, 20, 3, ".16") +
    `<rect x="330" y="140" width="36" height="18" fill="#e2d8c4"/>` +
    `<path d="M328,140h40l-5,-8h-30z" fill="#b8ac94"/>` +
    `<g stroke="#c9bfa8" stroke-width="1" fill="none"><path d="M330,146h36M330,152h36M342,140v18M354,140v18"/></g>` +
    `<rect x="342" y="148" width="9" height="10" fill="#6b6252"/>` +
    `</g>` +
    // 轍。四駆が同じ道を通るので、塩原には轍が残る
    `<g stroke="#d8cfba" stroke-width="2" opacity=".8" fill="none">` +
    `<path d="M120,210q40,-32 96,-52q52,-19 118,-24M136,210q42,-32 98,-52q52,-19 118,-24"/></g>` +
    // ── 塩の採取の山(モンティクロ)。**白の上なので影で形を出す**
    `<g><path d="M62,164l14,-22l14,22z" fill="#e2d8c4"/><path d="M76,142l14,22h-8l-9,-16z" fill="#b8ac94"/>` +
    shade(76, 165, 17, 3, ".18") + `</g>` +
    `<g><path d="M108,160l11,-17l11,17z" fill="#e2d8c4"/><path d="M119,143l11,17h-6l-7,-13z" fill="#b8ac94"/>` +
    shade(119, 161, 13, 2.4, ".16") + `</g>` +
    `<g><path d="M320,170l13,-20l13,20z" fill="#e2d8c4"/><path d="M333,150l13,20h-7l-8,-15z" fill="#b8ac94"/>` +
    shade(333, 171, 15, 2.8, ".18") + `</g>` +
    // ── 四駆と人。**思い切って暗く。**中間の明度は塩原に溶ける
    shade(246, 186, 26, 4, ".22") +
    `<path d="M218,186v-15q0,-3 4,-3h34q4,0 6,4l6,8v6z" fill="#3f4a52"/>` +
    `<rect x="218" y="178" width="50" height="4" fill="#2b333a"/>` +
    `<g fill="#8fb0c4"><rect x="223" y="171" width="13" height="7"/><rect x="239" y="171" width="12" height="7"/></g>` +
    `<g fill="#1f262b"><circle cx="229" cy="186" r="4.4"/><circle cx="259" cy="186" r="4.4"/></g>` +
    // 写真を撮る人。塩原ではみんなこれをやっている
    `<g><rect x="176" y="184" width="4" height="12" fill="#2b333a"/><rect x="183" y="184" width="4" height="12" fill="#2b333a"/>` +
    `<path d="M174,172h15l2,12h-19z" fill="#8a3a2c"/><circle cx="181" cy="167" r="4.4" fill="#8a6a4a"/>` +
    `<path d="M190,176l10,-5" stroke="#8a6a4a" stroke-width="2" stroke-linecap="round" fill="none"/>` +
    `<rect x="198" y="167" width="8" height="6" rx="1" fill="#2b333a"/></g>` +
    shade(181, 197, 11, 2.4, ".2") +
    // ── 最前景。塩の畝。地の白より2段落とす
    `<path d="M0,210v-9q56,-6 112,2q58,8 116,-3q56,-10 114,3q32,4 58,-2v9z" fill="#cdc2a8"/>` +
    `<g stroke="#b8ac94" stroke-width="1.4" opacity=".7" fill="none"><path d="M14,206l10,-5M96,208l11,-5M186,204l10,-5M282,206l11,-5M356,203l10,-4"/></g>`,

  /**
   * 白い町スクレ。
   *
   * ⚠ `bolivia-whitecity.tsx` は**旗を (98,72) に立てる**(旗は y=43〜56 に翻る)。
   *   → x=98 に、屋上 y=72 の建物と旗竿を置く。無いと旗が空中に浮く。
   *   鳩は町の上を舞い、雲は y=16〜52。
   *
   * ⚠ **白い漆喰の町は、壁がいちばん明るい。**屋根・軒の影・開口部を思っているより
   *   ずっと暗くしないと、家が背景に溶けて形が出ない(雪国と同じ話)。
   *
   * 層: 空 / スクレの谷を囲む乾いた丘 / 白い町並み(3列)/ 旗竿のある建物 /
   * 鐘楼 / ハカランダ / 広場の人 / 最前景の瓦屋根。
   */
  whitecity:
    // ── 空。**丘の裾(y=116)まで塗り下ろす**
    sky(120, "#6aa8dc", "#c8dfea") +
    `<circle cx="326" cy="34" r="15" fill="#f7e3a0" opacity=".9"/>` +
    `<circle cx="326" cy="34" r="26" fill="#f7e3a0" opacity=".14"/>` +
    // ── スクレを囲む乾いた丘
    `<path d="M0,116L46,92L92,108L140,86L192,110L242,90L292,112L340,94L400,110V210H0z" fill="#9a8f6a"/>` +
    `<path d="M0,124L54,106L108,120L164,102L218,122L272,106L326,124L400,112V210H0z" fill="#8a8256"/>` +
    `<g stroke="#77703f" stroke-width="1.3" opacity=".5" fill="none"><path d="M28,126l9,-13M86,132l8,-12M304,130l9,-12M356,126l8,-11"/></g>` +
    // ── 町。**白壁の列。**屋根と影で形を出す
    ground(130, "#b8a882") +
    colonial(10, 152, 30, 20) +
    colonial(46, 150, 26, 18) +
    colonial(78, 153, 28, 19) +
    colonial(112, 151, 24, 17) +
    colonial(288, 152, 28, 19) +
    colonial(322, 150, 26, 18) +
    colonial(354, 153, 30, 20) +
    // 奥の列。少し小さく、屋根だけ見せる
    `<g><path d="M22,132h30l-3,-7h-24z" fill="#8f3b28"/><path d="M60,130h26l-3,-6h-20z" fill="#a8462f"/>` +
    `<path d="M96,133h28l-3,-7h-22z" fill="#8f3b28"/><path d="M300,131h28l-3,-6h-22z" fill="#a8462f"/>` +
    `<path d="M340,133h30l-3,-7h-24z" fill="#8f3b28"/></g>` +
    // ── 旗竿のある建物。**屋上を y=72 に合わせる**(動きの層の旗がここに翻る)
    `<g>` +
    `<rect x="84" y="72" width="30" height="80" fill="#f4efe4"/>` +
    `<rect x="84" y="72" width="30" height="3" fill="#b8ac98"/>` +
    `<path d="M80,72h38l-4,-9h-30z" fill="#8f3b28"/>` +
    `<g fill="#4a3f36"><rect x="90" y="88" width="7" height="12"/><rect x="102" y="88" width="7" height="12"/><rect x="90" y="110" width="7" height="12"/><rect x="102" y="110" width="7" height="12"/><rect x="94" y="132" width="10" height="20"/></g>` +
    // 旗竿。ここから旗が出る
    `<path d="M98,72v-34" stroke="#6b6258" stroke-width="2" fill="none"/>` +
    `</g>` +
    // ── 鐘楼。白い町の輪郭をつくる(スクレの空はこれが並ぶ)
    `<g>` +
    `<rect x="336" y="96" width="22" height="56" fill="#f4efe4"/>` +
    `<rect x="336" y="96" width="22" height="3" fill="#b8ac98"/>` +
    `<path d="M332,96h30l-4,-8h-22z" fill="#8f3b28"/>` +
    `<path d="M340,88h14l-7,-12z" fill="#8f3b28"/>` +
    `<g fill="#4a3f36"><path d="M341,104h12v14a6,6 0 0 0 -12,0z"/><rect x="343" y="130" width="8" height="22"/></g>` +
    `</g>` +
    // ── ハカランダ。スクレの広場は紫の花が咲く
    `<g><path d="M204,178v-16" stroke="#5a4632" stroke-width="4" fill="none"/>` +
    `<ellipse cx="204" cy="156" rx="19" ry="11" fill="#8a7ab8"/><ellipse cx="192" cy="163" rx="12" ry="7" fill="#7a6aa8"/>` +
    `<ellipse cx="216" cy="162" rx="11" ry="6.4" fill="#7a6aa8"/></g>` +
    `<g><path d="M262,182v-14" stroke="#5a4632" stroke-width="3.4" fill="none"/>` +
    `<ellipse cx="262" cy="162" rx="16" ry="9" fill="#8a7ab8"/><ellipse cx="252" cy="168" rx="10" ry="6" fill="#7a6aa8"/></g>` +
    // ── 石畳の広場と人。**y>170 の中央は空いている**
    `<path d="M0,168q100,-6 200,1q100,6 200,-4v45H0z" fill="#c2b494"/>` +
    `<g stroke="#a89a7c" stroke-width="1.2" opacity=".7" fill="none"><path d="M30,182h44M120,190h50M228,186h46M320,194h50M70,200h56M256,202h48"/></g>` +
    cholita(148, 200, 24, "#2f6b7f", "#c4452f") +
    `<g><rect x="176" y="188" width="4" height="12" fill="#3f3a30"/><rect x="183" y="188" width="4" height="12" fill="#3f3a30"/>` +
    `<path d="M174,176h15l2,12h-19z" fill="#f4efe4"/><circle cx="181" cy="171" r="4.4" fill="#c98d5f"/>` +
    `<path d="M190,180l9,5" stroke="#c98d5f" stroke-width="2" stroke-linecap="round" fill="none"/></g>` +
    // ── 最前景の瓦屋根。手前に置くと町の奥行きが出る
    `<path d="M0,210v-22h96l8,22z" fill="#8f3b28"/>` +
    `<g stroke="#6f2c1e" stroke-width="1.4" fill="none"><path d="M12,188v22M28,188v22M44,188v22M60,188v22M76,188v22M92,188v22"/></g>` +
    `<path d="M0,188h100v4H0z" fill="#6f2c1e"/>`,

  /**
   * 熱帯の大都市(サンタクルス)。
   *
   * ⚠ `bolivia-tropicalcity.tsx` は**雲の影を (140,158) と (300,186) に落とす**
   *   → その高さは開けた地面にしておく。インコの群れは y=86〜102 を渡る。
   *
   * 層: 熱帯の空 / 遠いビル群 / 街路樹と椰子 / 低い町並み / 広場と噴水 /
   * バイクと露店 / 最前景の並木。
   */
  tropicalcity:
    sky(118, "#6ab8e0", "#cfe6ee") +
    `<circle cx="60" cy="34" r="16" fill="#fff2cc" opacity=".85"/>` +
    `<circle cx="60" cy="34" r="28" fill="#fff2cc" opacity=".16"/>` +
    // ── 遠いビル群。サンタクルスは平地に伸びた町。**低く、まばらに**
    `<g fill="#8f9aa8">` +
    `<rect x="16" y="88" width="18" height="34"/><rect x="42" y="76" width="14" height="46"/><rect x="64" y="94" width="20" height="28"/>` +
    `<rect x="252" y="82" width="16" height="40"/><rect x="276" y="92" width="22" height="30"/><rect x="306" y="72" width="14" height="50"/><rect x="328" y="90" width="18" height="32"/></g>` +
    `<g fill="#b8c2cc" opacity=".8">` +
    `<rect x="20" y="94" width="4" height="4"/><rect x="28" y="94" width="4" height="4"/><rect x="46" y="82" width="4" height="4"/><rect x="46" y="92" width="4" height="4"/>` +
    `<rect x="256" y="88" width="4" height="4"/><rect x="310" y="78" width="4" height="4"/><rect x="310" y="90" width="4" height="4"/><rect x="332" y="96" width="4" height="4"/></g>` +
    `<g fill="#dfe8ee"><ellipse cx="140" cy="120" rx="170" ry="7" opacity=".4"/><ellipse cx="330" cy="122" rx="120" ry="6" opacity=".34"/></g>` +
    // ── 町。低い建物を並べる(中央は隠れるので、繰り返しでよい)
    ground(122, "#8fa87a") +
    `<g>` +
    `<rect x="0" y="126" width="34" height="26" fill="#e8dcc0"/><path d="M-2,126h38v-5h-38z" fill="#a8562f"/>` +
    `<rect x="40" y="130" width="30" height="22" fill="#dccfae"/><path d="M38,130h34v-4h-34z" fill="#8f4a28"/>` +
    `<rect x="78" y="127" width="32" height="25" fill="#e8dcc0"/><path d="M76,127h36v-5h-36z" fill="#a8562f"/>` +
    `<rect x="118" y="131" width="28" height="21" fill="#d8cba8"/><path d="M116,131h32v-4h-32z" fill="#8f4a28"/>` +
    `<rect x="252" y="129" width="30" height="23" fill="#e8dcc0"/><path d="M250,129h34v-4h-34z" fill="#a8562f"/>` +
    `<rect x="290" y="126" width="34" height="26" fill="#dccfae"/><path d="M288,126h38v-5h-38z" fill="#8f4a28"/>` +
    `<rect x="332" y="130" width="30" height="22" fill="#e8dcc0"/><path d="M330,130h34v-4h-34z" fill="#a8562f"/>` +
    `<rect x="370" y="127" width="30" height="25" fill="#d8cba8"/><path d="M368,127h34v-4h-34z" fill="#8f4a28"/>` +
    `</g>` +
    `<g fill="#5f5548"><rect x="10" y="138" width="8" height="14"/><rect x="88" y="139" width="8" height="13"/><rect x="262" y="141" width="8" height="11"/><rect x="300" y="138" width="9" height="14"/><rect x="342" y="141" width="8" height="11"/><rect x="380" y="139" width="8" height="13"/></g>` +
    // ── 広場。**雲の影が落ちる (140,158) と (300,186) は開けておく**
    `<path d="M0,152q100,-5 200,2q100,6 200,-5v61H0z" fill="#b8ae90"/>` +
    `<path d="M0,190q104,-4 204,2q96,6 196,-4v22H0z" fill="#a89e80"/>` +
    // 噴水。広場の要
    `<g><ellipse cx="196" cy="180" rx="26" ry="8" fill="#8fc4d8"/><ellipse cx="196" cy="180" rx="26" ry="8" fill="none" stroke="#9a9078" stroke-width="3"/>` +
    `<rect x="192" y="164" width="8" height="14" fill="#c9bfa0"/><ellipse cx="196" cy="163" rx="10" ry="3" fill="#c9bfa0"/>` +
    `<g stroke="#bfe0ee" stroke-width="1.6" fill="none" opacity=".8"><path d="M196,160q-8,6 -10,14M196,160q8,6 10,14"/></g></g>` +
    // ── 街路樹と椰子
    palm(30, 172, 40, 4) +
    palm(368, 176, 36, -5) +
    crown(72, 158, 18, 10, "#4f8a46", "#3a6b36") +
    crown(258, 160, 16, 9, "#4f8a46", "#3a6b36") +
    crown(330, 164, 17, 9, "#569150", "#3f7340") +
    // ── バイクと露店。熱帯の町はこれで動いている
    shade(112, 196, 16, 3, ".2") +
    `<g><circle cx="102" cy="192" r="6" fill="#33302b"/><circle cx="124" cy="192" r="6" fill="#33302b"/>` +
    `<path d="M100,192l8,-12h12l6,12z" fill="#2f7fb8"/>` +
    `<path d="M108,180l-4,-7" stroke="#5c4632" stroke-width="2" stroke-linecap="round" fill="none"/>` +
    `<rect x="110" y="168" width="5" height="12" fill="#c4452f"/><circle cx="112" cy="164" r="4.2" fill="#c98d5f"/></g>` +
    `<g><path d="M282,190h48v-4h-48z" fill="#c9b48a"/><path d="M278,186h56l-6,-10h-44z" fill="#e8443f"/>` +
    `<g stroke="#8a6a48" stroke-width="2" fill="none"><path d="M284,190v12M328,190v12"/></g>` +
    `<g fill="#f5b31c"><circle cx="292" cy="183" r="2.6"/><circle cx="302" cy="183" r="2.6"/><circle cx="312" cy="183" r="2.6"/><circle cx="322" cy="183" r="2.6"/></g></g>` +
    // ── 最前景
    `<path d="M0,210v-8q56,-5 112,2q58,7 116,-3q56,-9 114,3q32,4 58,-1v7z" fill="#7f7660"/>` +
    crown(16, 202, 22, 12, "#3f7340", "#2f5a30") +
    crown(390, 206, 20, 11, "#3f7340", "#2f5a30"),

  /**
   * 赤い峡谷(トゥピサ)。
   *
   * ⚠ `bolivia-redcanyon.tsx` は**陽炎を y=112〜118 に引く**ので、地平をその高さに。
   *   砂ぼこりは y=140/168/196、砂の筋は (60,164)(244,190)(300,150)、
   *   コンドルは (300,44) と (96,72) を旋回する。
   *
   * 層: 灼けた空 / 遠い赤壁 / 尖塔の列 / 乾いた河床(3段)/ サボテン /
   * 馬に乗った人 / 最前景の岩と灌木。
   */
  redcanyon:
    // ── 空。**赤壁の裾(y=126)まで塗り下ろす**
    sky(130, "#7fa8c8", "#f0d8b4", "#c8c4b8") +
    `<circle cx="70" cy="38" r="16" fill="#fff2cc" opacity=".8"/>` +
    `<circle cx="70" cy="38" r="28" fill="#fff2cc" opacity=".18"/>` +
    // ── 遠い赤壁。トゥピサは赤い岩に囲まれた町
    `<path d="M0,126L34,84L66,104L104,72L142,100L184,80L224,106L266,76L306,102L344,82L400,104V210H0z" fill="#b8654a"/>` +
    `<path d="M104,72l38,28l-16,2z" fill="#964a34" opacity=".7"/>` +
    `<path d="M266,76l40,26l-16,2z" fill="#964a34" opacity=".65"/>` +
    // 逃げ水。地平の際だけ白ませる
    `<g fill="#f7e8cc"><ellipse cx="120" cy="122" rx="170" ry="7" opacity=".4"/><ellipse cx="320" cy="125" rx="120" ry="6" opacity=".34"/></g>` +
    // ── 尖塔の列。**高さも太さもばらす**
    spire(28, 156, 26, 52) +
    spire(58, 158, 18, 34) +
    spire(92, 154, 30, 60) +
    spire(128, 158, 20, 38) +
    spire(276, 156, 24, 50) +
    spire(310, 159, 17, 32) +
    spire(344, 154, 28, 56) +
    spire(378, 158, 19, 36) +
    // ── 乾いた河床。3段
    ground(150, "#c98a5e") +
    `<path d="M0,170q100,-6 200,1q100,6 200,-4v45H0z" fill="#b87a50"/>` +
    `<path d="M0,192q104,-5 204,2q96,6 196,-4v22H0z" fill="#a56a44"/>` +
    // 水の涸れた筋。**等間隔にしない**
    `<g stroke="#96593a" stroke-width="1.4" opacity=".55" fill="none">` +
    `<path d="M22,180l16,6l-6,8M84,196l20,-5M148,186l11,7l14,-2M232,200l18,4M296,184l13,7M348,198l16,-6"/></g>` +
    // ── サボテン
    cardon(160, 194, 30, [-1, 1]) +
    cardon(184, 200, 22, [1]) +
    cardon(246, 196, 26, [-1, 1]) +
    // ── 馬に乗った人。トゥピサは馬で峡谷を行く土地。
    // **中央に置かない。**最初 x=206 に置いたら、乗り手の頭(y=148)が
    // シンボルの影の楕円(200,155 rx53 ry14)に食われ、胴だけの赤い塊になった。
    // 馬より高い位置に頭が来るものは、隠れる帯の外へ出す。
    `<g>` +
    shade(300, 202, 22, 3.4, ".22") +
    `<g stroke="#6b4a32" stroke-width="3" stroke-linecap="round"><path d="M288,202v-12M296,202v-12M306,202v-12M314,202v-12"/></g>` +
    `<ellipse cx="301" cy="186" rx="18" ry="7.4" fill="#7a5238"/>` +
    `<path d="M316,184l8,-8" stroke="#7a5238" stroke-width="5" stroke-linecap="round" fill="none"/>` +
    `<ellipse cx="326" cy="174" rx="6" ry="4" fill="#7a5238"/>` +
    `<path d="M323,171l2,-6l3,5z" fill="#7a5238"/>` +
    `<path d="M283,184q-6,6 -4,14" stroke="#5a3826" stroke-width="2.4" fill="none"/>` +
    // 鞍と鞍敷き。人は乗せない
    `<path d="M294,181h16l-2,-6h-12z" fill="#c4452f"/>` +
    `</g>` +
    // 馬を曳く人。**またがらせない。**乗せてみたら、馬の上の小さな人は
    // 部品が潰れて赤い塊にしかならなかった。横に立たせると、他の絵と同じ大きさで描ける
    `<g>` +
    shade(266, 203, 9, 2.4, ".2") +
    `<rect x="262" y="190" width="4" height="13" fill="#3f5f2f"/><rect x="269" y="190" width="4" height="13" fill="#3f5f2f"/>` +
    `<path d="M260,176h15l2,14h-19z" fill="#c4452f"/>` +
    `<circle cx="267" cy="171" r="4.6" fill="#c98d5f"/>` +
    `<ellipse cx="267" cy="166" rx="11" ry="3.4" fill="#8a6a48"/>` +
    // 手綱。馬の口までつなぐ
    `<path d="M276,180q14,-4 24,-2" stroke="#5a3826" stroke-width="1.6" fill="none"/>` +
    `</g>` +
    // ── 最前景の岩と灌木。地面より2段暗く
    `<g fill="#8a4a34"><ellipse cx="42" cy="204" rx="14" ry="6"/><ellipse cx="64" cy="208" rx="10" ry="4.4"/><ellipse cx="330" cy="206" rx="13" ry="5.4"/></g>` +
    tola(96, 208, 15, 9, "#7a6a3a") +
    tola(366, 207, 13, 8, "#7a6a3a") +
    `<path d="M0,210v-6q56,-5 112,2q58,7 116,-3q56,-9 114,3q32,4 58,-1v5z" fill="#8a5636"/>`,
};
