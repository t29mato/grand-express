/**
 * 日本の都市の背景の描き直し。
 *
 * legacy の背景は1枚あたり平均36要素で、空・遠景・地面の3層しかない。
 * 同じ背景を最大9都市が共用しているので、その9都市がまったく同じ絵になる。
 * フランス(平均98要素)と同じ密度まで持ち上げる。
 * 手本は `scripts/countries/france/art.mjs` の `alps`。
 *
 * `legacy/grand-express.html` は凍結しているので、ここで `override.bg` として差し替える。
 *
 * ⚠ **中央 x=151〜249 / y=54〜152 は都市のシンボルに隠れる**
 *   (`city-art.tsx` が s=4.1 / gy=152 で描くため)。影の楕円も (200,155) rx=53 に載る。
 *   細部は左右3分の1と、y>170 の手前に置くこと。
 *
 * ⚠ **空は「次に来る塗りの開始y」まで塗り下ろす。**噛み合っていないと横一文字に透ける。
 *   `node scripts/check-city-backgrounds.mjs` で必ず実測すること。
 *
 * 詳しくは docs/50-authoring/12-city-background-guide.md。
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

/** 空を3枚重ねて階調にする。`to` は塗り下ろす深さ(= 次に来る塗りの開始y)。 */
function sky(to, top, mid, low) {
  return (
    band(0, r1(to * 0.5), top) +
    band(r1(to * 0.44), r1(to * 0.34), mid) +
    band(r1(to * 0.72), r1(to * 0.28 + 2), low)
  );
}

/** 接地の影。物の下に敷かないと浮く。 */
function shade(cx, cy, rx, ry, o = ".2") {
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#000" opacity="${o}"/>`;
}

/** 人。20px前後。腕は別に描いて作業の内容を出す。 */
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
 * 黒松。日本の海岸の絵はこれが要る(白砂青松)。
 * 丸い樹冠にすると洋風の並木になってしまうので、**平たい葉の塊を段に重ねる**。
 * 幹は海風で傾いた形にする。
 */
function pine(x, base, h, lean = 0, dark = false) {
  const a = dark ? "#27503a" : "#316642";
  const b = dark ? "#1d3f2d" : "#25523a";
  const parts = [
    // 幹。細く、上へ行くほど絞る
    `<path d="M${r1(x - 2.4)},${base}q${r1(lean * 0.3)},${r1(-h * 0.5)} ${r1(lean + 0.3)},${r1(-h * 0.94)}h3.4q${r1(-lean * 0.42)},${r1(h * 0.46)} ${r1(-lean * 0.04 + 1.6)},${r1(h * 0.94)}z" fill="#5f4628"/>`,
  ];
  /**
   * 葉の塊。**きれいな楕円を等間隔に積むと、串に刺したパンケーキに見える。**
   * 実際そうなった。輪郭を崩し、上下を重ね、左右へ振り分け、枝でつなぐ。
   */
  const pads = [
    [0.52, -0.19, 0.32, 0.105, b],
    [0.66, 0.16, 0.27, 0.095, a],
    [0.79, -0.13, 0.23, 0.082, b],
    [0.9, 0.1, 0.17, 0.068, a],
    [0.99, -0.02, 0.11, 0.052, b],
  ];
  for (const [t, off, rxf, ryf, fill] of pads) {
    const cx = r1(x + lean * t + h * off);
    const cy = r1(base - h * t);
    const rx = h * rxf;
    const ry = h * ryf;
    // 枝(幹から塊へ)。これが無いと塊が宙に浮く
    parts.push(
      `<path d="M${r1(x + lean * t)},${cy}L${cx},${r1(cy + ry * 0.3)}" stroke="#5f4628" stroke-width="1.8" stroke-linecap="round" fill="none"/>`,
    );
    parts.push(
      `<path d="M${r1(cx - rx)},${cy}` +
        `Q${r1(cx - rx * 0.62)},${r1(cy - ry * 1.9)} ${r1(cx - rx * 0.08)},${r1(cy - ry * 1.05)}` +
        `Q${r1(cx + rx * 0.44)},${r1(cy - ry * 2)} ${r1(cx + rx * 0.86)},${r1(cy - ry * 0.45)}` +
        `Q${r1(cx + rx * 1.06)},${r1(cy + ry * 0.62)} ${r1(cx + rx * 0.38)},${r1(cy + ry * 1)}` +
        `Q${r1(cx - rx * 0.42)},${r1(cy + ry * 1.35)} ${r1(cx - rx)},${cy}z" fill="${fill}"/>`,
    );
  }
  return parts.join("");
}

/** 杉。日本の山肌はこれが並ぶ。細くまっすぐ、先が尖る。 */
function cedar(x, base, h, fill = "#2f5f3f") {
  const w = r1(h * 0.3);
  return (
    `<rect x="${r1(x - 1.2)}" y="${r1(base - 4)}" width="2.4" height="4" fill="#5a4630"/>` +
    `<path d="M${r1(x - w / 2)},${r1(base - 2)}L${x},${r1(base - h)}L${r1(x + w / 2)},${r1(base - 2)}z" fill="${fill}"/>`
  );
}

/** 瓦屋根の農家。妻壁・下見板・格子窓まで入れる。 */
function farmhouse(x, base, w, h, roof = "#4a5568", wall = "#efe8d8") {
  const top = r1(base - h);
  const cx = r1(x + w / 2);
  const eave = r1(h * 0.52);
  return (
    `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="${wall}"/>` +
    `<path d="M${r1(x - 8)},${top}L${cx},${r1(top - eave)}L${r1(x + w + 8)},${top}z" fill="${roof}"/>` +
    `<path d="M${r1(x - 8)},${top}h${r1(w + 16)}v3h${r1(-w - 16)}z" fill="#3a4453"/>` +
    `<g stroke="#3a4453" stroke-width="1" opacity=".5" fill="none"><path d="M${cx},${r1(top - eave)}L${r1(x - 4)},${r1(top - 1)}M${cx},${r1(top - eave)}L${r1(x + w + 4)},${r1(top - 1)}"/></g>` +
    `<rect x="${x}" y="${r1(base - h * 0.34)}" width="${w}" height="${r1(h * 0.34)}" fill="#8a6a44"/>` +
    `<g stroke="#6b5330" stroke-width="1" opacity=".7" fill="none"><path d="M${x},${r1(base - h * 0.22)}h${w}M${x},${r1(base - h * 0.1)}h${w}"/></g>` +
    `<g fill="#f5d38a"><rect x="${r1(x + w * 0.16)}" y="${r1(top + h * 0.2)}" width="${r1(w * 0.24)}" height="${r1(h * 0.26)}"/><rect x="${r1(x + w * 0.6)}" y="${r1(top + h * 0.2)}" width="${r1(w * 0.24)}" height="${r1(h * 0.26)}"/></g>` +
    `<g stroke="#8a6a44" stroke-width="1"><path d="M${r1(x + w * 0.28)},${r1(top + h * 0.2)}v${r1(h * 0.26)}M${r1(x + w * 0.72)},${r1(top + h * 0.2)}v${r1(h * 0.26)}"/></g>`
  );
}

// ---------------------------------------------------------------------------

export const JAPAN_RICH_BG = {
  /**
   * 日本海側・島の海辺の町。**9都市が共用する、日本で最多の背景。**
   * (金沢・鳥取・高松・萩・佐渡・隠岐・五島・種子島・稚内)
   *
   * 元は22要素で、空・海・砂と、等間隔に並んだ同じ低木が5つだけだった。
   *
   * 層: 空(3階調)/ 遠くの島影 / 沖と手前で色を分けた海 / 磯と波しぶき /
   * 漁港の堤防と赤灯台 / 砂丘の起伏 / 風で傾いた黒松 / 網を繕う漁師と干し網 /
   * 最前景の砂の稜線とハマヒルガオ。
   */
  seaside:
    sky(98, "#6aa8dc", "#9ccbe8", "#dbe8ea") +
    `<circle cx="330" cy="30" r="15" fill="#f5b31c"/>` +
    `<g fill="#f6efe2"><ellipse cx="96" cy="24" rx="30" ry="5.4" opacity=".8"/><ellipse cx="74" cy="31" rx="19" ry="3.6" opacity=".62"/><ellipse cx="196" cy="18" rx="24" ry="4.2" opacity=".55"/><ellipse cx="268" cy="44" rx="28" ry="4" opacity=".45"/></g>` +
    // とんび。海辺の町にはたいてい鳶がいる
    `<g stroke="#5f5240" stroke-width="1.6" fill="none" stroke-linecap="round"><path d="M136,44q5,-5 10,0q5,-5 10,0M172,32q4,-4 8,0q4,-4 8,0"/></g>` +
    // ── 遠景の島影(大小2つ。水平線に厚みが出る)
    `<path d="M248,98q14,-20 34,-24q24,-5 42,8q16,10 24,16z" fill="#7f96a8"/>` +
    `<path d="M262,98q12,-14 28,-17q18,-3 32,7z" fill="#6b8496" opacity=".7"/>` +
    `<path d="M40,98q10,-11 26,-13q18,-2 30,13z" fill="#8fa4b4" opacity=".85"/>` +
    // ── 海(沖は濃く、岸へ向かって明るく)
    band(98, 20, "#2a6b95") +
    band(116, 18, "#3585ab") +
    band(132, 20, "#4f9ec2") +
    `<g stroke="#cfeaf6" stroke-width="2" opacity=".5" fill="none"><path d="M14,106h58M96,103h38M254,107h60M338,104h50M52,116h48M164,118h56M286,120h74M22,128h62M120,131h46M240,129h56M344,133h46M70,141h54M280,144h74"/></g>` +
    `<g stroke="#8fcae0" stroke-width="2.4" opacity=".45" fill="none"><path d="M0,113q38,-5 76,0t76,0M232,124q40,-5 80,0t80,0"/></g>` +
    // ── 磯(岩礁と波しぶき)。海と砂だけだと絵が平らになる
    `<path d="M256,152q9,-18 24,-16q9,1 14,9q11,-7 20,2q9,8 13,18z" fill="#6b6a62"/>` +
    `<path d="M265,152q7,-12 18,-11q9,1 13,7q9,-4 16,3z" fill="#8a8880"/>` +
    `<g fill="#f2fafd" opacity=".85"><ellipse cx="252" cy="147" rx="11" ry="4"/><ellipse cx="322" cy="151" rx="9" ry="3.4"/></g>` +
    // ── 漁港の堤防と赤灯台
    `<path d="M0,148h122v6H0z" fill="#9a968c"/>` +
    `<path d="M0,154h116v8H0z" fill="#7f7b72"/>` +
    `<g fill="#8a8880"><rect x="98" y="140" width="14" height="9"/><rect x="76" y="143" width="12" height="6"/></g>` +
    `<rect x="34" y="106" width="13" height="42" fill="#f6efe2"/>` +
    `<g fill="#e8443f"><rect x="34" y="114" width="13" height="7"/><rect x="34" y="128" width="13" height="7"/><rect x="34" y="141" width="13" height="7"/></g>` +
    `<path d="M31,106h19l-3,-7h-13z" fill="#4a5568"/>` +
    `<rect x="37" y="96" width="7" height="5" fill="#f5b31c"/>` +
    // 係留した漁船
    shade(146, 152, 22, 4, ".16") +
    `<path d="M126,150c10,-5 34,-5 44,0c-7,6 -37,6 -44,0z" fill="#f0e6d2"/>` +
    `<rect x="140" y="136" width="12" height="10" fill="#e8443f"/>` +
    `<path d="M148,136v-10" stroke="#4a3a24" stroke-width="2" fill="none"/>` +
    // ── 砂浜(濡れた砂 → 乾いた砂 → 砂丘の起伏)
    ground(152, "#e0c9a0") +
    `<path d="M0,154q40,-5 82,0q46,6 90,-2q48,-8 96,1q42,8 132,-3v8H0z" fill="#f2ede0" opacity=".8"/>` +
    `<path d="M0,166q56,-6 108,2q56,8 110,-2q54,-9 112,3q36,7 70,-1v10H0z" fill="#cdb083"/>` +
    `<g fill="#c2a476"><ellipse cx="86" cy="196" rx="76" ry="10"/><ellipse cx="322" cy="204" rx="82" ry="10"/></g>` +
    // ── 黒松の防砂林。**右にまとめる。**
    // 左右6本に散らしたら灯台も磯も松に埋もれた(アラビア海の椰子と同じ失敗)。
    // 左は漁港、右は松林、中央はシンボル、と役割で分ける。大きさと傾きはばらす。
    pine(330, 168, 44, -5) +
    pine(364, 172, 56, -8, true) +
    pine(392, 166, 38, -4) +
    // ── 干し網の櫓。**シンボルの真下(y>170)は空いているので、ここを使う**
    `<g stroke="#6b5330" stroke-width="3" fill="none" stroke-linecap="round"><path d="M150,200v-28M214,200v-28M148,172h68"/></g>` +
    // 網は塗りを薄くして格子を見せる。opacity .6 の塗りだと緑の板に見えた
    `<path d="M150,174h64v20q-32,7 -64,0z" fill="#5f8a72" opacity=".26"/>` +
    `<g stroke="#3f6a54" stroke-width="1" opacity=".85" fill="none"><path d="M158,174v21M166,174v22M174,174v22M182,174v23M190,174v22M198,174v22M206,174v21M150,180h64M150,186h64M150,192h63"/></g>` +
    // ── 網を繕う漁師
    shade(72, 196, 20, 4) +
    person(64, 196, 22, "#5b8fe8") +
    arm(64, 182, 13, 4) +
    person(86, 193, 20, "#e8443f") +
    shade(90, 193, 15, 3.4) +
    arm(86, 181, -11, 3) +
    `<path d="M74,186q6,4 3,10" stroke="#8a8578" stroke-width="1.4" fill="none"/>` +
    // 浜に上げた木箱と浮き玉
    `<g fill="#a8813c"><rect x="252" y="184" width="26" height="12"/><rect x="257" y="176" width="18" height="8"/></g>` +
    `<g stroke="#7a5a34" stroke-width="1.2" fill="none"><path d="M252,190h26M257,180h18"/></g>` +
    `<g fill="#4f9ec2"><circle cx="288" cy="194" r="6"/><circle cx="299" cy="198" r="4.6"/></g>` +
    // ── 最前景: 砂丘の稜線とハマヒルガオ
    `<path d="M0,210v-16q60,-12 128,-2q64,9 130,-4q56,-11 142,2v20z" fill="#d6bd92"/>` +
    `<g stroke="#4f7a4a" stroke-width="2" fill="none" stroke-linecap="round"><path d="M22,208v-10M30,209v-8M38,207v-11M354,209v-9M362,207v-11M370,208v-8"/></g>` +
    `<g fill="#e8a0c0"><circle cx="30" cy="197" r="3"/><circle cx="362" cy="196" r="2.6"/></g>`,

  /**
   * 山あいの盆地の町。**7都市が共用。**(盛岡・会津若松・山形・草津・福井・富良野・北見)
   *
   * 元は15要素で、緑の三角が2つと、等間隔の曲線が5本だけだった。日本でいちばん薄い絵。
   *
   * 層: 空(3階調)/ 残雪の奥羽の峰 / 杉山 / 谷底の集落(茅葺きの農家と白壁の蔵)/
   * 川と橋 / 段の色を変えた畑 / 稲架掛けと農作業 / 最前景の畝と柿の木。
   */
  valley2:
    // 空は**遠景の稜線がいちばん下がる位置**まで塗り下ろす。
    // 74 にしたら、x=0 で稜線が y=104 まで下がっているぶんが横一文字に透けた。
    // 見えている空の高さではなく、後ろに回り込む深さで決める。
    sky(120, "#6aa8dc", "#9ccbe8", "#d4e4ea") +
    `<circle cx="326" cy="26" r="15" fill="#f5b31c"/>` +
    `<g fill="#f6efe2"><ellipse cx="84" cy="22" rx="28" ry="5" opacity=".8"/><ellipse cx="62" cy="28" rx="17" ry="3.4" opacity=".6"/><ellipse cx="236" cy="16" rx="22" ry="4" opacity=".5"/></g>` +
    // ── 遠景: 残雪の峰(奥羽山脈)。中央はシンボルに隠れるので左右に高い峰を置く
    `<path d="M0,104L42,50L74,78L118,44L162,86L214,58L268,92L318,52L360,80L400,60V120H0z" fill="#8f9db4"/>` +
    `<path d="M42,50l16,20q-8,5 -16,0q-8,5 -16,0zM118,44l17,22q-9,5 -17,0q-8,5 -17,0zM318,52l16,20q-8,5 -16,0q-8,5 -16,0z" fill="#f4f8fb"/>` +
    `<path d="M0,116L36,84L78,104L120,80L166,108L212,88L262,112L310,86L354,106L400,88V140H0z" fill="#6f8a76"/>` +
    // ── 中景: 杉山。稜線に沿って生やすと日本の山になる
    `<path d="M0,132L48,104L104,124L150,106L206,128L258,110L312,126L360,104L400,120V150H0z" fill="#4f7a54"/>` +
    `<g>${[[16, 134, 20], [34, 137, 15], [58, 124, 22], [78, 130, 17], [104, 136, 19], [126, 126, 21], [274, 128, 20], [296, 134, 16], [318, 128, 22], [342, 122, 18], [364, 128, 21], [386, 132, 16]]
      .map(([x, b, h]) => cedar(x, b, h, "#2f5f3f"))
      .join("")}</g>` +
    // ── 谷底(集落が乗る面)。
    // 高さ14(=152まで)だと、川がうねって上へ出る所と畑の始まり(160)のあいだが
    // 透けた。川や畑を波打たせるときは、その振れ幅ぶん下まで敷いておく。
    band(138, 22, "#7fa464") +
    // 白壁の蔵と茅葺きの農家。人の暮らしがここに集まる
    shade(96, 140, 40, 5, ".16") +
    farmhouse(64, 140, 58, 26) +
    farmhouse(126, 140, 34, 18, "#5a6678", "#e6dfcd") +
    `<rect x="300" y="120" width="40" height="20" fill="#f4f0e4"/>` +
    `<path d="M294,120h52l-26,-13z" fill="#3a4453"/>` +
    `<rect x="294" y="120" width="52" height="3" fill="#2f3644"/>` +
    `<rect x="312" y="128" width="12" height="12" fill="#5a4630"/>` +
    shade(320, 141, 26, 4, ".16") +
    // 軽トラ(山の集落にはたいてい一台いる)。
    // x=212 に置いたらシンボル(x=151〜249)の後ろで白い切れ端しか見えなかった
    `<g fill="#f0e6d2"><rect x="256" y="128" width="15" height="11" rx="2"/><rect x="270" y="131" width="19" height="8"/></g>` +
    `<rect x="259" y="130" width="9" height="6" fill="#8fb8d0"/>` +
    `<g fill="#3f3428"><circle cx="264" cy="140" r="3"/><circle cx="284" cy="140" r="3"/></g>` +
    // ── 川と石橋
    `<path d="M0,152q60,6 120,-2q64,-9 128,3q60,10 152,1v10q-92,9 -152,-1q-64,-11 -128,-2q-60,8 -120,2z" fill="#5f9ec4"/>` +
    `<g stroke="#bfe8f4" stroke-width="1.6" opacity=".6" fill="none"><path d="M24,156h44M300,157h56"/></g>` +
    `<path d="M76,158q14,-12 28,0v5q-14,-9 -28,0z" fill="#9a968c"/>` +
    `<rect x="74" y="150" width="32" height="3" fill="#8a8578"/>` +
    // ── 段の色を変えた畑。同じ緑で全部塗ると畝が平board になる
    ground(160, "#7fae6a") +
    `<path d="M0,160q100,-6 200,2t200,-2v14q-100,8 -200,0t-200,2z" fill="#8fbe72"/>` +
    `<path d="M0,176q100,-6 200,2t200,-2v16q-100,8 -200,0t-200,2z" fill="#c2a86a"/>` +
    `<path d="M0,194q100,-6 200,2t200,-2v16H0z" fill="#6f9e5c"/>` +
    `<g stroke="#5d8a54" stroke-width="1.6" opacity=".65" fill="none"><path d="M-6,168q104,-8 206,0t206,-2M-6,184q104,-8 206,0t206,-2M-6,202q104,-8 206,0t206,-2"/></g>` +
    // 畝の苗
    `<g fill="#4f7a4a">${[16, 44, 72, 100, 128, 272, 300, 328, 356, 384]
      .map((x) => `<path d="M${x},172v-7M${x - 3},172v-5M${x + 3},172v-5" stroke="#4f7a4a" stroke-width="1.4" fill="none"/>`)
      .join("")}</g>` +
    // ── 稲架掛け(はさがけ)。刈った稲を横木に掛けて干す。
    // 細い縦棒を等間隔に並べたら**柵**に見えたので、束を太く・重ねて垂らす。
    `<g stroke="#8a6a44" stroke-width="3" fill="none" stroke-linecap="round"><path d="M290,198v-24M358,198v-24"/></g>` +
    `<g fill="#d8c078">${[296, 308, 320, 332, 344, 354]
      .map((x, i) => `<path d="M${x - 8},176q8,-4 16,0q3,12 -1,20q-7,3 -14,0q-4,-9 -1,-20z" opacity="${i % 2 ? ".92" : "1"}"/>`)
      .join("")}</g>` +
    `<g stroke="#b89a52" stroke-width="1" opacity=".7" fill="none">${[296, 308, 320, 332, 344, 354]
      .map((x) => `<path d="M${x - 4},180v13M${x + 2},180v13"/>`)
      .join("")}</g>` +
    `<path d="M288,176h72" stroke="#8a6a44" stroke-width="2.6" stroke-linecap="round" fill="none"/>` +
    // ── 農作業の2人
    shade(112, 192, 16, 3.6) +
    person(108, 192, 21, "#5b8fe8") +
    arm(108, 179, 10, 6) +
    `<path d="M118,185l6,7" stroke="#8a6a44" stroke-width="2" stroke-linecap="round" fill="none"/>` +
    person(132, 195, 19, "#e8443f") +
    shade(136, 195, 14, 3.2) +
    `<ellipse cx="132" cy="178" rx="7" ry="2.6" fill="#d8c078"/>` +
    // ── 最前景: 手前の畝と柿の木(実がなると日本の秋になる)
    `<path d="M0,210v-12q60,-8 128,0q64,7 130,-2q56,-8 142,2v12z" fill="#5f8a52"/>` +
    `<path d="M376,206v-34" stroke="#5a4630" stroke-width="4" fill="none" stroke-linecap="round"/>` +
    `<path d="M376,182l-11,-9M376,188l10,-8" stroke="#5a4630" stroke-width="2.4" fill="none" stroke-linecap="round"/>` +
    `<g fill="#3f7a44"><ellipse cx="366" cy="170" rx="14" ry="10"/><ellipse cx="386" cy="176" rx="12" ry="9"/><ellipse cx="376" cy="163" rx="13" ry="9"/></g>` +
    `<g fill="#e8843c"><circle cx="364" cy="176" r="3.4"/><circle cx="384" cy="182" r="3"/><circle cx="374" cy="170" r="2.8"/></g>`,
};
