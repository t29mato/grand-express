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
function sky(to, top, low) {
  return band(0, r1(to * 0.72), top) + band(r1(to * 0.66), r1(to * 0.34 + 2), low);
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
};
