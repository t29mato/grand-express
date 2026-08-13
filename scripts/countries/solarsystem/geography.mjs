/**
 * 太陽系の「地形」(天体を島に、宇宙を海に読み替えたもの)。
 *
 * この盤面には実際の緯度経度が無い。**経度は「太陽からの距離を対数尺で
 * 置いた場所」、緯度は「同じ天体系の中でどれだけ主星から離して描くか」**
 * として使う(実際の軌道傾斜角ではない)。詳しくは下の「対数尺の較正」を見よ。
 *
 * 天体は円形の島として描く。天体はもともと球なので、海岸線をごまかして
 * 曲げる必要が無い。岩石天体・小天体はわずかに歪ませてクレーターっぽさを
 * 出し、太陽・ガス惑星はほぼ完全な円のままにする。カイパーベルト・
 * オールトの雲は単体の天体ではなく無数の小天体の群れなので、歪みを
 * 大きくして「輪郭のはっきりしない群れ」に見えるようにしてある。
 *
 * 衛星は、親星と別の島にすると「陸路(同じ天体系の中)」が引けなくなる
 * (陸路なのに大半が宇宙空間=海の上を通ることになり、check-sea-routes.mjsで
 * 弾かれる)。そこで**衛星は親星と1枚の島に merge する**(凸包で包む)。
 * 冥王星以遠の準惑星やカイパーベルトの外側の天体は、親星というものが
 * 無いので、それぞれ独立した島のまま緯度をずらして散らしてある
 * (team-lead承認: 2026-08-13)。
 */

// ---------------------------------------------------------------------------
// 投影
// ---------------------------------------------------------------------------

/**
 * 太陽系盤面の投影。BW/BH・LON0/LON1・LAT0/LAT1 は team-lead の指示どおり固定。
 *
 * この投影は経度・緯度とも **1度=10px** になるように選んである
 * (BW/(LON1-LON0) = 3600/360 = 10、BH/(LAT0-LAT1) = 1000/100 = 10)。
 * 実際の地図の投影と違って cos(緯度) による横方向の圧縮は要らない
 * (緯度は単なる「上下の置き場所」であって現実の地理ではないため)。
 * このおかげで、天体の島を「半径pxを10で割った度数」の円として描けば、
 * 見た目もちゃんと円になる。
 *
 * `seg` は全路線(39本)の投影後距離を実測して決めた。分布は下の
 * `seg実測メモ` を参照。
 */
export const SOLARSYSTEM_PROJ = {
  BW: 3600,
  BH: 1000,
  LON0: 0,
  // **360ちょうどにしてはいけない。**経度の幅が360度以上ある盤面は
  // 「地球を一周する盤面」とみなされ、日付変更線をまたぐ折り返しが働く
  // (`use-board-layout.ts` の `wrapWidthOf`)。太陽系は一周しないのに、
  // 経度276のボイジャー1号が -84 に折り返されて **x=-837 に描かれていた。**
  // 幅を360未満にすれば折り返しは起きない。
  LON1: 358,
  LAT0: 50,
  LAT1: -50,
  seg: 70,
};

/** 1度あたりのピクセル数(経度・緯度で共通)。 */
const PX_PER_DEG = SOLARSYSTEM_PROJ.BW / (SOLARSYSTEM_PROJ.LON1 - SOLARSYSTEM_PROJ.LON0);

// ---------------------------------------------------------------------------
// 対数尺の較正
// ---------------------------------------------------------------------------

/**
 * 太陽からの実際の距離(AU、軌道長半径)。出典: 各天体の平均軌道半径
 * (NASA Planetary Fact Sheet等で広く確認できる値)。探査機・彗星・
 * オールトの雲のように「軌道長半径」が意味を持たない/変わり続けるものは
 * 個別に注記してある。
 */
export const AU = {
  mercury: 0.387,
  venus: 0.723,
  earth: 1.0,
  mars: 1.524,
  // 小惑星帯は代表として最大2天体を採る(軌道長半径)。
  vesta: 2.36,
  ceres: 2.77,
  jupiter: 5.203,
  saturn: 9.537,
  uranus: 19.19,
  neptune: 30.07,
  pluto: 39.48,
  // カイパーベルト本体(古典的カイパーベルト、およそ30〜55AU)の代表値。
  // 冥王星(39.48AU)と重ならないよう、外寄りの値を採っている。
  kuiperBelt: 54,
  haumea: 43.13,
  makemake: 45.79,
  eris: 67.78,
  // ハレー彗星は近日点0.586AU・遠日点35.1AUと差が非常に大きいので、
  // 盤面には遠日点(いちばん長くその場所付近にいる側)で置く。
  halleyAphelion: 35.1,
  // 太陽圏界面(太陽風が星間物質に押し負ける境目)。ボイジャー1号が2012年、
  // 2号が2018年に実測して越えた距離のおよそ中間を代表値にする。
  heliopause: 120,
  // 探査機は軌道長半径を持たない(飛び去っていく片道の旅なので)。
  // 2026年時点のおおよその太陽距離。**この数字は日々変わる。**
  newHorizons2026: 60,
  voyager2_2026: 139,
  voyager1_2026: 167,
  // セドナ。軌道長半径506AU・遠日点937AU(近日点はわずか76AU)という
  // 太陽系でもっとも細長い軌道の一つ。盤面には軌道長半径で置く。
  sedna: 506,
  // オールトの雲の内縁のおおよその代表値。下の SUN_LON 付近のコメントに
  // 書いたとおり、この値をそのまま式に通すと盤面の外(経度360超)に出る。
  oortCloudInner: 2000,
};

/**
 * 距離(AU)を盤面の経度に変換する対数尺。
 * **実際の距離ではなく対数を取った値を線形に置いている。**そうしないと
 * 内惑星が1点に潰れる(逆に線形のままだと外惑星がほぼ描けない)。
 *
 * 較正点は2つ: 水星(0.387AU)を経度35、海王星(30.07AU)を経度205に置き、
 * その2点を通る対数直線を他の天体すべてに当てはめる。
 * (太陽だけは距離0で対数が取れないため、経度12に手で置く。下記参照)
 */
const ANCHOR_NEAR = { au: 0.387, lon: 35 };
const ANCHOR_FAR = { au: 30.07, lon: 205 };
const LOG_B =
  (ANCHOR_FAR.lon - ANCHOR_NEAR.lon) / (Math.log10(ANCHOR_FAR.au) - Math.log10(ANCHOR_NEAR.au));
const LOG_A = ANCHOR_NEAR.lon - LOG_B * Math.log10(ANCHOR_NEAR.au);

/** 太陽からの距離(AU)を対数尺で盤面の経度に変換する。 */
export function lonForAU(au) {
  return LOG_A + LOG_B * Math.log10(au);
}

/**
 * オールトの雲の内縁(2000AU)を上の式にそのまま通すと経度368.8になり、
 * 盤面(経度0〜360)の外に出る。**この「368.8」という数字自体を豆知識として
 * 使う**(対数尺でもなお収まらないほど遠い、という事実)。
 * 盤面上は右端に象徴として引き戻して置く(下のBODIESのoortcloud参照)。
 */
export const OORT_CLOUD_TRUE_LON = lonForAU(AU.oortCloudInner);

/**
 * 太陽の経度。距離0のため対数が取れず式に乗らない。**左端に手で置く**
 * (team-lead指示「太陽を左端、外側へ行くほど右」のとおり)。
 */
export const SUN_LON = 12;

/**
 * パーカー・ソーラー・プローブの経度も手で置く。近日点はおよそ0.046AUと
 * 太陽に極端に近く、式にそのまま通すと較正点(水星=経度35)より左、
 * つまり太陽より内側の経度になってしまう(この盤面の対数尺は水星より
 * 内側を描けるほど精密ではない)。**太陽のすぐ外側**に手で置く。
 */
const PARKER_LON = 24;

// ---------------------------------------------------------------------------
// 天体テーブル
// ---------------------------------------------------------------------------

/** 経度・緯度とも度数を計算するための共通ヘルパー。 */
const lat0 = 0;
/** 親星からのオフセット(px)を度数のオフセットに変換する。dyPxは画面下向きが正。 */
function offsetDeg(dxPx, dyPx) {
  return [dxPx / PX_PER_DEG, -dyPx / PX_PER_DEG];
}

/**
 * 40天体。`parent` を持つものは衛星(親星の島に合体する)。
 * `dyOffPx` は独立した天体(準惑星・彗星・探査機・領域)を主系列から
 * 上下にずらす量(px、下向きが正)。0なら主系列(緯度0)のまま。
 *
 * 順番は経度の昇順に**しない**(読みやすさのため天体系ごとにまとめてある)。
 * 経度は距離から計算されるので、配置は距離の順に自動で決まる。
 */
/**
 * **2026-08-13、team-lead実測で盤面の縦83%が空いていると指摘された**
 * (天体が y=415〜590 の帯にほぼ一直線に並び、名札も密集していた)。
 * ここから下の `dyOffPx`(独立した天体)・`dyPx`(衛星、親星からの相対値)は、
 * 経度(距離の対数尺)の意味を壊さずに縦を大きく使うよう、主系列を
 * 上下に振ったジグザグへ描き直したもの。振れ幅・衛星の展開ともに、
 * この変更のあとで自己検算(陸の上・重なり・航路)をやり直して確認している。
 */
export const BODIES = [
  // --- 太陽 ------------------------------------------------------------
  { id: "sun", lon: SUN_LON, lat: lat0, radiusPx: 58, jitter: 0.03, freq: 9, seed: 0, region: "core", color: "#f5b31c" },
  { id: "parkersolarprobe", lon: PARKER_LON, dyOffPx: -70, radiusPx: 14, jitter: 0.04, freq: 5, seed: 1, region: "probe", color: "#d8d0c0" },

  // --- 地球型惑星と衛星 --------------------------------------------------
  { id: "mercury", au: AU.mercury, dyOffPx: -260, radiusPx: 22, jitter: 0.06, freq: 6, seed: 2, region: "inner", color: "#9a8f7a" },
  { id: "venus", au: AU.venus, dyOffPx: 260, radiusPx: 26, jitter: 0.02, freq: 5, seed: 3, region: "inner", color: "#d8c078" },
  { id: "earth", au: AU.earth, dyOffPx: -220, radiusPx: 30, jitter: 0.02, freq: 6, seed: 4, region: "inner", color: "#2f6fb0" },
  { id: "moon", parent: "earth", dxPx: 0, dyPx: -85, radiusPx: 17, jitter: 0.05, freq: 6, seed: 5, region: "inner", color: "#b8b0a0" },
  { id: "mars", au: AU.mars, dyOffPx: 210, radiusPx: 27, jitter: 0.05, freq: 7, seed: 6, region: "inner", color: "#b5502a" },
  { id: "phobos", parent: "mars", dxPx: -16, dyPx: 48, radiusPx: 10, jitter: 0.1, freq: 5, seed: 7, region: "inner", color: "#6a6258" },
  { id: "deimos", parent: "mars", dxPx: 16, dyPx: 56, radiusPx: 9, jitter: 0.1, freq: 4, seed: 8, region: "inner", color: "#7a7268" },

  // --- 小惑星帯 ----------------------------------------------------------
  { id: "vesta", au: AU.vesta, dyOffPx: 380, radiusPx: 19, jitter: 0.06, freq: 5, seed: 9, region: "belt", color: "#a89880" },
  { id: "ceres", au: AU.ceres, dyOffPx: -280, radiusPx: 20, jitter: 0.05, freq: 5, seed: 10, region: "belt", color: "#8f8878" },

  // --- 木星と衛星 ---------------------------------------------------------
  { id: "jupiter", au: AU.jupiter, dyOffPx: -50, radiusPx: 48, jitter: 0, freq: 0, seed: 11, region: "outer", color: "#d8b878" },
  { id: "io", parent: "jupiter", dxPx: -28, dyPx: -42, radiusPx: 16, jitter: 0.04, freq: 6, seed: 12, region: "outer", color: "#e8c840" },
  { id: "europa", parent: "jupiter", dxPx: -12, dyPx: -78, radiusPx: 15, jitter: 0.03, freq: 5, seed: 13, region: "outer", color: "#d8ccb0" },
  { id: "ganymede", parent: "jupiter", dxPx: 14, dyPx: 52, radiusPx: 18, jitter: 0.05, freq: 7, seed: 14, region: "outer", color: "#9a9080" },
  { id: "callisto", parent: "jupiter", dxPx: 32, dyPx: 74, radiusPx: 17, jitter: 0.05, freq: 6, seed: 15, region: "outer", color: "#7a7060" },

  // --- 土星と衛星 ---------------------------------------------------------
  { id: "saturn", au: AU.saturn, dyOffPx: -80, radiusPx: 46, jitter: 0, freq: 0, seed: 16, region: "outer", color: "#e8d8a0" },
  { id: "titan", parent: "saturn", dxPx: -25, dyPx: -55, radiusPx: 17, jitter: 0.02, freq: 5, seed: 17, region: "outer", color: "#d89850" },
  { id: "enceladus", parent: "saturn", dxPx: -9, dyPx: 60, radiusPx: 12, jitter: 0.03, freq: 6, seed: 18, region: "outer", color: "#f0f0e8" },
  { id: "mimas", parent: "saturn", dxPx: 6, dyPx: -88, radiusPx: 10, jitter: 0.04, freq: 5, seed: 19, region: "outer", color: "#c8c0b0" },
  { id: "iapetus", parent: "saturn", dxPx: 21, dyPx: 95, radiusPx: 13, jitter: 0.03, freq: 6, seed: 20, region: "outer", color: "#d8d4c8" },
  { id: "rhea", parent: "saturn", dxPx: 0, dyPx: -118, radiusPx: 13, jitter: 0.03, freq: 4, seed: 21, region: "outer", color: "#d8d4c8" },

  // --- 天王星と衛星 -------------------------------------------------------
  { id: "uranus", au: AU.uranus, dyOffPx: -60, radiusPx: 38, jitter: 0, freq: 0, seed: 22, region: "outer", color: "#a8d8d0" },
  { id: "miranda", parent: "uranus", dxPx: -16, dyPx: -50, radiusPx: 11, jitter: 0.08, freq: 6, seed: 23, region: "outer", color: "#b0a898" },
  { id: "titania", parent: "uranus", dxPx: 16, dyPx: 56, radiusPx: 13, jitter: 0.04, freq: 5, seed: 24, region: "outer", color: "#a89e90" },

  // --- 海王星と衛星 -------------------------------------------------------
  { id: "neptune", au: AU.neptune, dyOffPx: -80, radiusPx: 34, jitter: 0, freq: 0, seed: 25, region: "outer", color: "#3f5fc0" },
  { id: "triton", parent: "neptune", dxPx: 0, dyPx: -110, radiusPx: 24, jitter: 0.04, freq: 5, seed: 26, region: "outer", color: "#d8c8c0" },

  // --- ハレー彗星(海王星のそばに支線で吊るす) -------------------------------
  { id: "halley", lon: lonForAU(AU.halleyAphelion), dyOffPx: -150, radiusPx: 15, jitter: 0.12, freq: 8, seed: 27, region: "deep", color: "#2a2620" },

  // --- 冥王星以遠 ---------------------------------------------------------
  { id: "pluto", au: AU.pluto, dyOffPx: -140, radiusPx: 24, jitter: 0.05, freq: 6, seed: 28, region: "tno", color: "#d8b088" },
  { id: "charon", parent: "pluto", dxPx: 0, dyPx: -48, radiusPx: 14, jitter: 0.04, freq: 5, seed: 29, region: "tno", color: "#9a9488" },
  { id: "newhorizons", lon: lonForAU(AU.pluto) + 6.5, dyOffPx: 300, radiusPx: 12, jitter: 0.03, freq: 4, seed: 30, region: "probe", color: "#c8a850" },
  { id: "kuiperbelt", au: AU.kuiperBelt, dyOffPx: 60, radiusPx: 24, jitter: 0.2, freq: 12, seed: 31, region: "tno", color: "#8898a8" },
  { id: "haumea", lon: lonForAU(AU.kuiperBelt) - 6, dyOffPx: -260, radiusPx: 17, jitter: 0.04, freq: 6, seed: 32, region: "tno", color: "#e8e4d8" },
  { id: "makemake", lon: lonForAU(AU.kuiperBelt) + 6, dyOffPx: 340, radiusPx: 19, jitter: 0.03, freq: 5, seed: 33, region: "tno", color: "#a85838" },
  { id: "eris", au: AU.eris, dyOffPx: -220, radiusPx: 22, jitter: 0.03, freq: 5, seed: 34, region: "tno", color: "#e8e0d0" },

  // --- 太陽系のさらに外へ ---------------------------------------------------
  { id: "heliopause", au: AU.heliopause, dyOffPx: 170, radiusPx: 20, jitter: 0.2, freq: 10, seed: 35, region: "deep", color: "#6878b0" },
  // voyager2/voyager1/sedna は当初12〜16pxだったが、押し離しの上限
  // (seg=60 → 60*0.55*0.34≒11.2px)+印の半径9.5pxを満たさず海に浮いた
  // (team-lead実測)。32pxまで広げてある(voyager2は同じ半径だったので
  // 同じ穴を踏む前に合わせて広げた)。
  { id: "voyager2", lon: lonForAU(AU.voyager2_2026) + 2, dyOffPx: -210, radiusPx: 32, jitter: 0.03, freq: 4, seed: 36, region: "probe", color: "#c8a850" },
  { id: "voyager1", lon: lonForAU(AU.voyager1_2026) + 4, dyOffPx: 130, radiusPx: 32, jitter: 0.03, freq: 4, seed: 37, region: "probe", color: "#c8a850" },
  { id: "sedna", au: AU.sedna, dyOffPx: -230, radiusPx: 32, jitter: 0.05, freq: 6, seed: 38, region: "deep", color: "#8a3838" },
  // オールトの雲は本来の経度(368.8、盤面の外)を象徴的に引き戻して置く。
  // 当初は経度352(右端まで80px)にあり、名札が置けず範囲外に出ていた
  // (team-lead実測)。経度330(右端まで300px)まで内側へ寄せた。
  { id: "oortcloud", lon: 330, dyOffPx: 100, radiusPx: 34, jitter: 0.24, freq: 14, seed: 39, region: "deep", color: "#7888a0" },
];

/**
 * seg実測メモ(2026-08-13、cities.mjs で39路線を組んだあとに実測)。
 *
 * 対数尺のせいで、この盤面は「内側は詰まり、外側でも(対数を取っているため)
 * 極端には伸びない」という他国と違う分布になる。指示値の130で試したところ
 * 39路線中31本が1マスに丸まり、9マスに達する路線は0本(逆に短すぎて
 * マス数の変化がほとんど付かない)。60まで下げて実測し直すと1マス17・
 * 2マス11・3マス3・4マス5・5マス1・6マス1・7マス1本となり、
 * 9マスへの張り付きが無いままマス数に変化が付くので、いったん60にした。
 *
 * その後、team-lead指摘で盤面の縦を大きく使うよう天体を上下に散らした
 * (BODIESのコメント参照)ところ、距離が伸びて9マスに張り付く路線が
 * 3本(ベスタ—ケレス659px・水星—金星572px・ボイジャー1号—セドナ533px)
 * 出た。**70まで上げ直して再実測**し、9マスに張り付くのがベスタ—ケレスの
 * 1本だけ(1マス15・2マス4・3マス4・4マス3・5マス5・6マス3・7マス2・
 * 8マス2・9マス1)になったところで確定した。
 */

// ---------------------------------------------------------------------------
// 位置の解決(親星＋オフセット → 経度緯度)
// ---------------------------------------------------------------------------

const byId = Object.fromEntries(BODIES.map((b) => [b.id, b]));

function resolvePos(b) {
  if (b.parent) {
    const p = byId[b.parent];
    const [plon, plat] = resolvePos(p);
    const [dlon, dlat] = offsetDeg(b.dxPx ?? 0, b.dyPx ?? 0);
    return [plon + dlon, plat + dlat];
  }
  const lon = b.lon ?? lonForAU(b.au);
  const [, dlat] = offsetDeg(0, b.dyOffPx ?? 0);
  return [lon, lat0 + dlat];
}

/** id → [経度, 緯度]。cities.mjs から都市の座標として直接使う
 * (島の中心=都市の座標にすることで、都市が島の外に出ることが原理的に無くなる)。 */
export const BODY_POS = Object.fromEntries(BODIES.map((b) => [b.id, resolvePos(b)]));

// ---------------------------------------------------------------------------
// 島の生成
// ---------------------------------------------------------------------------

/**
 * 円形(やや歪んだ円)の島を作る。半径pxを10(PX_PER_DEG)で割って度数にする。
 * `jitter` で周期的になめらかに歪ませ、完全な円と区別できるようにする。
 */
function circle(lonC, latC, radiusPx, { points = 28, jitter = 0, freq = 6, seed = 0 } = {}) {
  const rDeg = radiusPx / PX_PER_DEG;
  const pts = [];
  for (let i = 0; i < points; i++) {
    const theta = (i / points) * Math.PI * 2;
    const wobble = 1 + jitter * Math.sin(theta * freq + seed);
    const r = rDeg * wobble;
    pts.push([
      Math.round((lonC + r * Math.cos(theta)) * 1000) / 1000,
      Math.round((latC + r * Math.sin(theta)) * 1000) / 1000,
    ]);
  }
  pts.push(pts[0]);
  return pts;
}

/** 凸包(Andrew's monotone chain)。点は [x,y] の配列。 */
function convexHull(points) {
  const pts = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lower = [];
  for (const p of pts) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop();
    lower.push(p);
  }
  const upper = [];
  for (let i = pts.length - 1; i >= 0; i--) {
    const p = pts[i];
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop();
    upper.push(p);
  }
  lower.pop();
  upper.pop();
  return lower.concat(upper);
}

/**
 * 親星+衛星をまとめて1つの島にする。各天体を「半径pxぶんの円周上の点」に
 * 展開し、それを全部まとめて凸包を取る。**各天体の中心は必ず自分の円の
 * 内側にある**ので、凸包の中にも必ず入る(中心が島の外に出ることは無い)。
 */
function clusterIsland(members) {
  const boundaryPts = [];
  for (const [lon, lat, rPx] of members) {
    const rDeg = rPx / PX_PER_DEG;
    for (let i = 0; i < 14; i++) {
      const theta = (i / 14) * Math.PI * 2;
      boundaryPts.push([lon + rDeg * Math.cos(theta), lat + rDeg * Math.sin(theta)]);
    }
  }
  const hull = convexHull(boundaryPts);
  hull.push(hull[0]);
  return hull;
}

const PARENTS = new Set(BODIES.filter((b) => BODIES.some((m) => m.parent === b.id)).map((b) => b.id));
const MEMBERS_OF = (parentId) => BODIES.filter((b) => b.parent === parentId);

export const SOLARSYSTEM_LAND = [];
for (const b of BODIES) {
  if (b.parent) continue; // 衛星は親星の島にまとめて含める(単独では land を作らない)
  if (PARENTS.has(b.id)) {
    const [plon, plat] = BODY_POS[b.id];
    const members = [[plon, plat, b.radiusPx], ...MEMBERS_OF(b.id).map((m) => [...BODY_POS[m.id], m.radiusPx])];
    SOLARSYSTEM_LAND.push(clusterIsland(members));
  } else {
    const [lon, lat] = BODY_POS[b.id];
    SOLARSYSTEM_LAND.push(circle(lon, lat, b.radiusPx, { jitter: b.jitter, freq: b.freq, seed: b.seed }));
  }
}

/**
 * 地形帯。天体ごとの色分けに使う。`landBase` は全天体共通の下地(中立の岩肌グレー)
 * なので、そのままだと太陽も土星もグレーの丸になる。**ここでほぼ同じ大きさの
 * 円をもう一枚、天体固有の色で重ねて塗る**(韓国が地方色を地形帯で塗り分けたのと
 * 同じ仕組み)。衛星も同じ方式で、それぞれの色の円を親星の島の中に重ねる。
 */
function bodyPatch(id, scale = 0.94, opts = {}) {
  const b = byId[id];
  const [lon, lat] = BODY_POS[id];
  return [b.color, circle(lon, lat, b.radiusPx * scale, { jitter: b.jitter, freq: b.freq, seed: b.seed, ...opts })];
}

export const SOLARSYSTEM_TERRAIN = [
  ...BODIES.map((b) => bodyPatch(b.id)),
  // 太陽 黒点2つ
  ["#c97f12", circle(SUN_LON - 3, 2.5, 12, { points: 10 })],
  ["#c97f12", circle(SUN_LON + 4, -3.5, 8, { points: 10 })],
  // 地球 大陸2つ(緑)
  ["#3f8f4f", circle(lonForAU(AU.earth) - 1.6, 1.2, 16, { points: 10, jitter: 0.15, freq: 4 })],
  ["#3f8f4f", circle(lonForAU(AU.earth) + 1.8, -1.6, 12, { points: 10, jitter: 0.15, freq: 5 })],
  // 火星 マリネリス峡谷(暗い筋)
  ["#7a3418", [
    [lonForAU(AU.mars) - 3.2, 0.6],
    [lonForAU(AU.mars) - 0.4, 1.0],
    [lonForAU(AU.mars) + 2.6, 0.3],
    [lonForAU(AU.mars) + 2.2, -0.4],
    [lonForAU(AU.mars) - 0.6, 0.1],
    [lonForAU(AU.mars) - 3.0, -0.3],
  ]],
  // 木星 縞と大赤斑
  ["#b8905a", circle(lonForAU(AU.jupiter), -3.2, 83 * 0.32, { points: 20 })],
  ["#b8905a", circle(lonForAU(AU.jupiter), 3.4, 83 * 0.28, { points: 20 })],
  ["#c85a3a", circle(lonForAU(AU.jupiter) + 2.6, -1.4, 14, { points: 14 })],
  // 土星 六角形の嵐(北極、模式的に六角形で)
  ["#c8a870", [
    [lonForAU(AU.saturn) - 2.2, -3.4],
    [lonForAU(AU.saturn), -4.4],
    [lonForAU(AU.saturn) + 2.2, -3.4],
    [lonForAU(AU.saturn) + 2.2, -1.6],
    [lonForAU(AU.saturn), -0.6],
    [lonForAU(AU.saturn) - 2.2, -1.6],
  ]],
  // イアペトゥス 二色性(半分だけ暗い)
  ["#3a362e", circle(BODY_POS.iapetus[0] + 0.8, BODY_POS.iapetus[1], byId.iapetus.radiusPx * 0.55, { points: 10 })],
  // 冥王星 トンボー地域(ハート形、簡略化した明るい斑)
  ["#f0dcc0", circle(BODY_POS.pluto[0] - 0.6, BODY_POS.pluto[1] + 0.4, byId.pluto.radiusPx * 0.4, { points: 10 })],
  // カロン モルドール斑(北極の赤黒い帽子)
  ["#7a3a3a", circle(BODY_POS.charon[0], BODY_POS.charon[1] - byId.charon.radiusPx / PX_PER_DEG * 0.55, byId.charon.radiusPx * 0.32, { points: 8 })],
];

export const SOLARSYSTEM_LAKES = [];
export const SOLARSYSTEM_RIVERS = [];

function t(source) {
  const parts = source.split("|");
  if (parts.length !== 4) {
    throw new Error(`4言語(en|es|fr|ja)で書いてください: ${source.slice(0, 60)}…`);
  }
  const [en, es, fr, ja] = parts;
  return { en, es, fr, ja };
}

/** ゾーン名の地名ラベル。 */
export const SOLARSYSTEM_LABELS = [
  [(lonForAU(AU.earth) + lonForAU(AU.mars)) / 2, -20, t("INNER SYSTEM|SISTEMA INTERIOR|SYSTÈME INTERNE|太陽系内側"), 0],
  [(AU_MID(AU.vesta, AU.ceres)), -22, t("ASTEROID BELT|CINTURÓN DE ASTEROIDES|CEINTURE D'ASTÉROÏDES|小惑星帯"), 0],
  [(lonForAU(AU.jupiter) + lonForAU(AU.saturn)) / 2, -20, t("GAS GIANTS|GIGANTES GASEOSOS|GÉANTES GAZEUSES|巨大ガス惑星"), 0],
  [(lonForAU(AU.pluto) + lonForAU(AU.kuiperBelt)) / 2, 22, t("KUIPER BELT|CINTURÓN DE KUIPER|CEINTURE DE KUIPER|カイパーベルト"), 0],
  [(lonForAU(AU.heliopause) + lonForAU(AU.voyager1_2026)) / 2, -20, t("EDGE OF THE HELIOSPHERE|BORDE DE LA HELIOSFERA|BORD DE L'HÉLIOSPHÈRE|太陽圏の縁"), 0],
];

function AU_MID(a, b) {
  return (lonForAU(a) + lonForAU(b)) / 2;
}

/**
 * 盤面装飾(星空)。太陽系ぜんぶに薄く散らす星の点描。決定的な擬似乱数で
 * 再現可能にする。
 */
function mulberry32(seed) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let x = Math.imul(a ^ (a >>> 15), 1 | a);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

export function renderSolarsystemDecor(px, py) {
  const rand = mulberry32(20260813);
  const parts = [];
  for (let i = 0; i < 900; i++) {
    const lon = rand() * 360;
    const lat = -48 + rand() * 96;
    const x = px(lon);
    const y = py(lat);
    const r = rand() < 0.12 ? 1.6 : 0.9;
    const op = 0.3 + rand() * 0.5;
    parts.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="#f0ead6" opacity="${op.toFixed(2)}"/>`);
  }
  return parts.join("");
}

export const SOLARSYSTEM_COLORS = {
  // 宇宙の色は深い紺。seaWaveは海の色に近づけて、波模様が目立ちすぎないようにする
  // (team-lead指示。恒星間空間に「波」があるのはおかしいので、ほぼ見えない程度に抑える)。
  sea: "#050a1c",
  seaWave: "#0a1030",
  // 天体ごとの色は terrainPolygons で塗り分けるので、下地は中立な岩肌グレー。
  landBase: "#6b6f78",
  // 縁取りは恒星光を受けた縁のような淡い色にする。
  coast: "#cfd8e8",
};
