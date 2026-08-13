/**
 * ヨーロッパの都市イラスト(まず5都市ぶん)。
 *
 * `EUROPE_MARKS` は24×24の座標系に描くシンボル、`EUROPE_BG` は400×210の
 * 座標系に描く背景シーン(いずれもSVG断片の文字列)。他の盤面と同じく
 * 最初から文字列として持つ。動きは含めない(アニメーションはReact側で重ねる)。
 *
 * 色は他の盤面と揃える。空 #8fc4e8〜#cfe4f0、顔・白 #f6efe2、
 * 強調 #f5b31c/#e8443f/#5b8fe8。
 *
 * 鍵は `cities.mjs` の `mark` / `bg` と一対一で対応する。
 * 増やすときは両方を揃えること。
 *
 * **背景SVGの中央25%(x=151〜249 / y=54〜152)は都市シンボルに隠れて
 * 見えない。** 見せたい細部は左右3分の1と手前(y>170)に置く。
 * `sky()` は必ず第3引数(次に来る塗りの開始y)を渡すこと。
 */

const W = 400;

/** 小数の桁を抑える(SVGを読みやすく保つため)。 */
const r1 = (v) => Math.round(v * 10) / 10;

function band(y, h, fill) {
  return `<rect x="0" y="${y}" width="${W}" height="${h}" fill="${fill}"/>`;
}

/** 空。**第3引数に「次に来る塗りの開始y」を渡すこと。** */
function sky(top, bottom, to) {
  return band(0, 92, top) + band(84, Math.max(0, to - 84), bottom);
}

function ground(y, fill) {
  return `<rect x="0" y="${y}" width="${W}" height="${210 - y}" fill="${fill}"/>`;
}

function cloud(cx, cy, scale = 1) {
  const e = (dx, rx, ry) =>
    `<ellipse cx="${r1(cx + dx * scale)}" cy="${cy}" rx="${r1(rx * scale)}" ry="${r1(ry * scale)}"/>`;
  return `<g opacity=".85" fill="#f6efe2">${e(0, 17, 6.5)}${e(-9, 10, 5)}${e(10, 12, 5)}</g>`;
}

function gull(cx, cy, scale = 1) {
  return `<path d="M${r1(cx - 8 * scale)},${cy}q8,${-7 * scale} 8,0q0,${-7 * scale} 8,0" stroke="#3a4a52" stroke-width="1.4" fill="none"/>`;
}

/** 遠景のなだらかな丘の連なり。 */
function hillsRow(y, fill, count = 4, opacity = 0.85) {
  const parts = [];
  for (let i = 0; i < count; i++) {
    const cx = 40 + (i * W) / count;
    parts.push(`<path d="M${r1(cx - 74)},${y}c22,-30 52,-30 74,0z" fill="${fill}"/>`);
  }
  return `<g opacity="${opacity}">${parts.join("")}</g>`;
}

/** 波の帯(横に連続する弧)。 */
function waves(y, color = "#254a70", rows = 3, gap = 8) {
  const parts = [];
  for (let i = 0; i < rows; i++) {
    parts.push(
      `<path d="M0,${y + i * gap}q20,-5 40,0t40,0t40,0t40,0t40,0t40,0t40,0t40,0t40,0" stroke="${color}" stroke-width="1.4" fill="none" opacity=".7"/>`,
    );
  }
  return parts.join("");
}

/** ギザギザの山並み。 */
function mountainPeak(cx, base, h, fill = "#8b8f98", snow = true) {
  const w = r1(h * 1.3);
  let s = `<path d="M${r1(cx - w / 2)},${base}L${r1(cx - w * 0.12)},${r1(base - h)}L${r1(cx + w * 0.1)},${r1(base - h * 0.62)}L${r1(cx + w / 2)},${base}z" fill="${fill}"/>`;
  if (snow) {
    s += `<path d="M${r1(cx - w * 0.12)},${r1(base - h)}L${r1(cx - w * 0.02)},${r1(base - h * 0.8)}L${r1(cx + w * 0.04)},${r1(base - h * 0.86)}z" fill="#f2f6f8"/>`;
  }
  return s;
}

/** 柵(境界フェンス)を横一列に。 */
function fenceRow(x0, y, count, gap, fill = "#7a7a80") {
  const parts = [`<path d="M${x0},${y - 10}L${x0 + (count - 1) * gap},${y - 10}M${x0},${y - 4}L${x0 + (count - 1) * gap},${y - 4}" stroke="#5c6a72" stroke-width="1.2"/>`];
  for (let i = 0; i < count; i++) {
    parts.push(`<rect x="${x0 + i * gap}" y="${y - 14}" width="2.4" height="14" fill="${fill}"/>`);
  }
  return parts.join("");
}

/** 小さな帆船・貨物船のシルエット。 */
function boat(cx, y, scale = 1, hull = "#8b8f98", cabin = "#e8443f") {
  const w = 40 * scale;
  return (
    `<path d="M${r1(cx - w / 2)},${y}L${r1(cx + w / 2)},${y}L${r1(cx + w / 2 - 8 * scale)},${r1(y + 11 * scale)}L${r1(cx - w / 2 + 3 * scale)},${r1(y + 11 * scale)}z" fill="${hull}"/>` +
    `<rect x="${r1(cx - 3 * scale)}" y="${r1(y - 15 * scale)}" width="${r1(6 * scale)}" height="${r1(15 * scale)}" fill="#4a4a52"/>` +
    `<rect x="${r1(cx - 9 * scale)}" y="${r1(y - 9 * scale)}" width="${r1(18 * scale)}" height="${r1(9 * scale)}" fill="${cabin}" opacity=".85"/>`
  );
}

/** 星形の小さな灯り(夜・トンネル内などのアクセント)。 */
function lightDot(cx, cy, r = 5, fill = "#f5b31c") {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" opacity=".85"/>`;
}

// ---------------------------------------------------------------------------
// マーク(24×24)
// ---------------------------------------------------------------------------

export const EUROPE_MARKS = {
  // レイキャヴィク: 港の採石場鉄道の機関車(記念碑として今も港に立つ)
  quarry_loco: `
    <rect x="4" y="12" width="14" height="6" rx="1" fill="#4a4a52"/>
    <rect x="6" y="8" width="6" height="4" fill="#4a4a52"/>
    <circle cx="7" cy="19" r="2.4" fill="#2a2a30"/>
    <circle cx="15" cy="19" r="2.4" fill="#2a2a30"/>
    <rect x="2" y="18" width="20" height="1.6" fill="#7a7a80"/>
    <circle cx="17" cy="10" r="1.4" fill="#e8443f"/>
  `,
  // コペンハーゲン: 橋がそのまま海へ潜る形
  bridge_dive: `
    <path d="M3,14L21,14" stroke="#5b8fe8" stroke-width="2"/>
    <path d="M8,6L8,14M16,6L16,14" stroke="#5b8fe8" stroke-width="1.6"/>
    <path d="M8,3L4,14M16,3L20,14" stroke="#3a6bc0" stroke-width="1.2"/>
    <path d="M14,14Q17,18 21,21" stroke="#3a6bc0" stroke-width="2" fill="none"/>
    <path d="M2,18Q12,15 22,20" stroke="#8fc4e8" stroke-width="1.4" fill="none" opacity=".8"/>
  `,
  // ブレスト: ジャッキで持ち上がる台車(軌間の履き替え)
  bogie_jack: `
    <rect x="3" y="16" width="18" height="2" fill="#4a4a52"/>
    <circle cx="7" cy="18.5" r="2.2" fill="#2a2a30"/>
    <circle cx="17" cy="18.5" r="2.2" fill="#2a2a30"/>
    <rect x="5" y="9" width="14" height="6" rx="1" fill="#8b8f98"/>
    <path d="M6,9L6,4M18,9L18,4" stroke="#f5b31c" stroke-width="2"/>
    <path d="M4,4L8,4M16,4L20,4" stroke="#f5b31c" stroke-width="2"/>
  `,
  // ショプロン: 開いた国境フェンスの門
  fence_gate: `
    <path d="M2,20L2,6M22,20L22,6" stroke="#6b5330" stroke-width="2"/>
    <path d="M2,8L10,4M2,14L10,10" stroke="#8b8f98" stroke-width="1.2"/>
    <path d="M22,8L14,4M22,14L14,10" stroke="#8b8f98" stroke-width="1.2" opacity=".5"/>
    <circle cx="9" cy="17" r="1.6" fill="#e8443f"/>
    <circle cx="13" cy="18.5" r="1.4" fill="#f5b31c"/>
    <path d="M2,20L22,20" stroke="#5f7f4a" stroke-width="2"/>
  `,
  // パリ: ワゴン・リの寝台車
  sleeper_car: `
    <rect x="2" y="8" width="20" height="8" rx="1.4" fill="#1a4a8f"/>
    <rect x="4" y="10" width="3" height="3" fill="#cfe4f0"/>
    <rect x="9" y="10" width="3" height="3" fill="#cfe4f0"/>
    <rect x="14" y="10" width="3" height="3" fill="#cfe4f0"/>
    <rect x="19" y="10" width="2" height="3" fill="#cfe4f0"/>
    <circle cx="7" cy="18" r="2" fill="#2a2a30"/>
    <circle cx="17" cy="18" r="2" fill="#2a2a30"/>
    <rect x="2" y="6" width="20" height="2" fill="#f4c430"/>
  `,

  // レズビュハウン: フェリーに乗り込む貨車
  ferry_wagon: `
    <path d="M2,18L22,18L19,22L5,22z" fill="#8b8f98"/>
    <rect x="6" y="9" width="12" height="9" rx="1" fill="#1a4a8f"/>
    <rect x="8" y="11" width="3" height="3" fill="#cfe4f0"/>
    <rect x="13" y="11" width="3" height="3" fill="#cfe4f0"/>
    <path d="M2,20q5,-2 10,0t10,0" stroke="#3a6bc0" stroke-width="1.4" fill="none"/>
  `,
  // トースハウン: 海底のロータリー
  sea_roundabout: `
    <circle cx="12" cy="12" r="7" fill="none" stroke="#5c6a72" stroke-width="2"/>
    <circle cx="12" cy="12" r="2.4" fill="#f5b31c"/>
    <path d="M12,3L12,7M12,17L12,21M3,12L7,12M17,12L21,12" stroke="#5c6a72" stroke-width="1.6"/>
  `,
  // ナルヴィク: 鉄鉱石を積んだ無蓋車
  ore_wagon: `
    <rect x="3" y="13" width="18" height="7" rx="1" fill="#7a7a80"/>
    <path d="M5,13L9,7L15,7L19,13z" fill="#5c4a3a"/>
    <circle cx="8" cy="20" r="2.2" fill="#2a2a30"/>
    <circle cx="16" cy="20" r="2.2" fill="#2a2a30"/>
  `,
  // キルナ: トレーラーで移設される教会
  moving_church: `
    <path d="M9,16L9,8L12,4L15,8L15,16z" fill="#6b5330"/>
    <rect x="11" y="2" width="2" height="3" fill="#4a3a2a"/>
    <rect x="3" y="16" width="18" height="3" fill="#8b8f98"/>
    <circle cx="7" cy="21" r="2" fill="#2a2a30"/>
    <circle cx="17" cy="21" r="2" fill="#2a2a30"/>
  `,
  // マルメ: 通勤電車の先頭
  commuter_car: `
    <path d="M2,17L2,10Q2,8 5,8L18,8Q22,8 22,13L22,17z" fill="#5b8fe8"/>
    <rect x="6" y="10" width="6" height="4" fill="#cfe4f0"/>
    <rect x="2" y="16" width="20" height="2" fill="#f4c430"/>
    <circle cx="7" cy="20" r="2" fill="#2a2a30"/>
    <circle cx="17" cy="20" r="2" fill="#2a2a30"/>
  `,
  // ヴィスビュー: ハンザの市壁
  town_wall: `
    <rect x="2" y="14" width="20" height="7" fill="#8b8f98"/>
    <path d="M2,14h3v-3h3v3h3v-3h3v3h3v-3h3v3h3" fill="none" stroke="#8b8f98" stroke-width="2.4"/>
    <rect x="9" y="4" width="6" height="10" fill="#6b6b70"/>
    <path d="M9,4L12,1L15,4z" fill="#4a4a52"/>
  `,
  // ヘルシンキ: 花崗岩の駅舎
  granite_station: `
    <rect x="3" y="12" width="18" height="9" fill="#8b8f98"/>
    <path d="M3,12Q12,4 21,12z" fill="#7a7a80"/>
    <circle cx="12" cy="10" r="2.4" fill="#f6efe2" stroke="#2a2a30" stroke-width=".8"/>
    <rect x="6" y="15" width="4" height="6" fill="#2a2a30"/>
    <rect x="14" y="15" width="4" height="6" fill="#2a2a30"/>
  `,
  // ロンドン: ユーロスターの先頭
  eurostar_nose: `
    <path d="M2,18L2,11Q2,8 8,8L17,8Q22,9 22,15L22,18z" fill="#f6efe2"/>
    <path d="M2,18L2,15Q6,10 14,10L22,15L22,18z" fill="#5b8fe8"/>
    <rect x="0" y="17" width="24" height="2" fill="#f5b31c"/>
    <circle cx="7" cy="21" r="2" fill="#2a2a30"/>
    <circle cx="17" cy="21" r="2" fill="#2a2a30"/>
  `,
  // ダブリン: 広軌の客車
  broad_gauge_car: `
    <rect x="1" y="9" width="22" height="9" rx="1.4" fill="#5f7f4a"/>
    <rect x="4" y="11" width="4" height="4" fill="#cfe4f0"/>
    <rect x="10" y="11" width="4" height="4" fill="#cfe4f0"/>
    <rect x="16" y="11" width="4" height="4" fill="#cfe4f0"/>
    <circle cx="4" cy="20" r="2.2" fill="#2a2a30"/>
    <circle cx="20" cy="20" r="2.2" fill="#2a2a30"/>
  `,
  // サンティアゴ: 巡礼の杖とホタテ貝
  pilgrim_staff: `
    <path d="M6,22L18,4" stroke="#6b5330" stroke-width="2"/>
    <path d="M18,4l3,2" stroke="#6b5330" stroke-width="2"/>
    <path d="M12,13a4,3 0 0,1 8,0a4,3 0 0,1 -8,0z" fill="#f4c430"/>
    <path d="M13,13L16,10L19,13" stroke="#8b6a1a" stroke-width="1"/>
  `,
  // イルン: 自動で幅の変わる車軸
  talgo_axle: `
    <rect x="3" y="15" width="18" height="2" fill="#5c6a72"/>
    <circle cx="6" cy="16" r="2.2" fill="#2a2a30"/>
    <circle cx="18" cy="16" r="2.2" fill="#2a2a30"/>
    <path d="M6,16L18,16" stroke="#f5b31c" stroke-width="1.4"/>
    <path d="M9,10l-3,3M15,10l3,3" stroke="#e8443f" stroke-width="1.6"/>
  `,
  // バルセロナ: AVEの先頭
  ave_train: `
    <path d="M2,18L2,12Q2,8 9,8L16,8Q22,10 22,15L22,18z" fill="#e8443f"/>
    <path d="M2,18L2,15Q8,11 15,11L22,15L22,18z" fill="#f6efe2"/>
    <circle cx="7" cy="21" r="2" fill="#2a2a30"/>
    <circle cx="17" cy="21" r="2" fill="#2a2a30"/>
  `,
  // リスボン: アズレージョのホーム
  azulejo_platform: `
    <rect x="2" y="4" width="20" height="14" fill="#3a6bc0"/>
    <path d="M2,8h20M2,12h20M2,16h20M6,4v14M12,4v14M18,4v14" stroke="#cfe4f0" stroke-width=".8"/>
    <rect x="2" y="18" width="20" height="3" fill="#8b8f98"/>
  `,
  // カレー: 貫通の瞬間の握手
  tunnel_handshake: `
    <circle cx="12" cy="12" r="9" fill="none" stroke="#5c6a72" stroke-width="2.4"/>
    <path d="M7,12L11,10L13,12L17,10" stroke="#f6efe2" stroke-width="2" fill="none"/>
    <circle cx="7" cy="12" r="1.6" fill="#5b8fe8"/>
    <circle cx="17" cy="10" r="1.6" fill="#e8443f"/>
  `,
  // ブリュッセル: 放射状に伸びる路線の要衝
  capital_hub: `
    <circle cx="12" cy="12" r="3" fill="#f5b31c"/>
    <path d="M12,12L4,4M12,12L20,4M12,12L4,20M12,12L20,20M12,12L2,12M12,12L22,12" stroke="#5c6a72" stroke-width="1.4"/>
  `,
  // ロッテルダム: ガントリークレーン
  gantry_crane: `
    <path d="M4,20L4,6L20,6L20,20" stroke="#f5b31c" stroke-width="2" fill="none"/>
    <path d="M2,6L22,6" stroke="#f5b31c" stroke-width="2.4"/>
    <rect x="10" y="10" width="4" height="5" fill="#5c6a72"/>
    <rect x="2" y="20" width="20" height="2" fill="#2a2a30"/>
  `,
  // ルクセンブルク: 無料のトラム
  free_tram: `
    <rect x="2" y="9" width="20" height="8" rx="2" fill="#5f7f4a"/>
    <rect x="5" y="11" width="4" height="4" fill="#cfe4f0"/>
    <rect x="11" y="11" width="4" height="4" fill="#cfe4f0"/>
    <rect x="17" y="11" width="3" height="4" fill="#cfe4f0"/>
    <circle cx="6" cy="19" r="2" fill="#2a2a30"/>
    <circle cx="18" cy="19" r="2" fill="#2a2a30"/>
    <path d="M2,6L22,6" stroke="#5c6a72" stroke-width="1"/>
  `,
  // ベルリン: 封印された国境通過列車
  sealed_train: `
    <rect x="2" y="9" width="20" height="9" rx="1" fill="#4a4a52"/>
    <rect x="6" y="11" width="4" height="4" fill="#2a2a30" opacity=".6"/>
    <rect x="14" y="11" width="4" height="4" fill="#2a2a30" opacity=".6"/>
    <path d="M10,15a2,2 0 0,1 4,0v2h-4z" fill="#f5b31c"/>
    <rect x="11" y="13" width="2" height="2" fill="#f5b31c"/>
  `,
  // ベリンツォーナ: 山を貫くトンネル
  mountain_bore: `
    <path d="M2,20L9,6L15,6L22,20z" fill="#8b8f98"/>
    <ellipse cx="12" cy="20" rx="4" ry="4" fill="#141416"/>
    <path d="M9,6L11,3L13,6z" fill="#f2f6f8"/>
  `,
  // ウィーン: 名を変える川
  danube_names: `
    <path d="M2,8q5,4 10,0t10,0" stroke="#3a6bc0" stroke-width="2.2" fill="none"/>
    <path d="M2,14q5,4 10,0t10,0" stroke="#5b8fe8" stroke-width="2.2" fill="none"/>
    <path d="M2,20q5,4 10,0t10,0" stroke="#8fc4e8" stroke-width="2.2" fill="none"/>
  `,
  // インスブルック: ブレンナー峠
  brenner_pass: `
    <path d="M2,20L8,10L12,14L16,6L22,20z" fill="#7a8f6a"/>
    <path d="M2,20L22,20" stroke="#5c6a72" stroke-width="2"/>
    <path d="M6,20L8,15L12,17L16,10L20,20" stroke="#f5b31c" stroke-width="1.2" fill="none"/>
  `,
  // クラクフ: 織物会館のアーケード
  cloth_hall: `
    <rect x="2" y="12" width="20" height="9" fill="#c8a35a"/>
    <path d="M3,12a2,2 0 0,1 4,0M9,12a2,2 0 0,1 4,0M15,12a2,2 0 0,1 4,0" fill="none" stroke="#8b6a1a" stroke-width="1.6"/>
    <rect x="2" y="9" width="20" height="3" fill="#a8843f"/>
    <path d="M2,9L12,3L22,9z" fill="#6b5330"/>
  `,
  // グダニスク: 琥珀の露店
  amber_stall: `
    <rect x="3" y="14" width="18" height="7" fill="#6b5330"/>
    <path d="M3,14L21,14L18,8L6,8z" fill="#8b6a3a"/>
    <circle cx="9" cy="17" r="2" fill="#f4c430"/>
    <circle cx="14" cy="18" r="1.6" fill="#e8a020"/>
    <circle cx="17" cy="16" r="1.4" fill="#f4c430"/>
  `,
  // プラハ: ファンタ・ホールのアーチと時計
  fanta_hall: `
    <path d="M2,18L2,10Q12,2 22,10L22,18z" fill="#8b8f98"/>
    <circle cx="12" cy="10" r="3" fill="#f6efe2" stroke="#2a2a30" stroke-width=".8"/>
    <path d="M12,10L12,8M12,10L14,11" stroke="#2a2a30" stroke-width="1"/>
    <rect x="2" y="18" width="20" height="3" fill="#5c6a72"/>
  `,
  // ブラチスラヴァ: 双子の首都
  twin_capitals: `
    <rect x="2" y="12" width="6" height="9" fill="#8b8f98"/>
    <path d="M2,12L5,8L8,12z" fill="#5c6a72"/>
    <rect x="16" y="12" width="6" height="9" fill="#8b8f98"/>
    <path d="M16,12L19,8L22,12z" fill="#5c6a72"/>
    <path d="M8,17L16,17" stroke="#f5b31c" stroke-width="1.6" stroke-dasharray="2,2"/>
  `,
  // ブダペスト: 鉄とガラスの駅舎
  iron_train_shed: `
    <path d="M2,16L2,9Q12,1 22,9L22,16z" fill="#f6efe2" opacity=".3"/>
    <path d="M2,16L2,9Q12,1 22,9L22,16" fill="none" stroke="#4a4a52" stroke-width="1.6"/>
    <path d="M12,1L12,16M6,4L6,16M18,4L18,16" stroke="#4a4a52" stroke-width="1"/>
    <rect x="2" y="16" width="20" height="4" fill="#5c6a72"/>
  `,
  // リュブリャナ: 鍾乳洞の観光列車
  cave_railcar: `
    <path d="M2,20a10,14 0 0,1 20,0z" fill="#3a3a40"/>
    <rect x="8" y="15" width="8" height="5" rx="1" fill="#e8443f"/>
    <circle cx="10" cy="21" r="1.6" fill="#2a2a30"/>
    <circle cx="14" cy="21" r="1.6" fill="#2a2a30"/>
    <circle cx="12" cy="7" r="2" fill="#f5b31c" opacity=".8"/>
  `,
  // リエカ: 変わり続けた港の旗
  harbour_flags: `
    <rect x="6" y="3" width="2" height="18" fill="#6b5330"/>
    <path d="M8,4L18,7L8,10z" fill="#e8443f"/>
    <path d="M2,21L22,21" stroke="#5c6a72" stroke-width="2"/>
    <path d="M2,18q5,-3 10,0t10,0" stroke="#3a6bc0" stroke-width="1.4" fill="none"/>
  `,
  // モクラ・ゴラ: 8の字にループする狭軌線
  figure_eight_track: `
    <path d="M12,4a4,4 0 1,1 -0.1,0zM12,12a4,4 0 1,1 -0.1,0z" fill="none" stroke="#5c6a72" stroke-width="1.8"/>
    <path d="M12,20a4,4 0 1,1 -0.1,0z" fill="none" stroke="#5c6a72" stroke-width="1.8"/>
    <circle cx="12" cy="12" r="1.6" fill="#f5b31c"/>
  `,
  // サラエヴォ: 橋のたもと
  assassination_corner: `
    <path d="M2,16L22,16" stroke="#8b8f98" stroke-width="3"/>
    <path d="M4,16L4,10M9,16L9,10M14,16L14,10M19,16L19,10" stroke="#5c6a72" stroke-width="1.2"/>
    <rect x="2" y="16" width="20" height="2" fill="#4a4a52"/>
    <path d="M2,21q10,-4 20,0" stroke="#3a6bc0" stroke-width="1.4" fill="none"/>
  `,
  // バール: 高い高架橋
  high_viaduct: `
    <path d="M2,21L2,11L5,11L5,21M9,21L9,7L12,7L12,21M16,21L16,11L19,11L19,21" fill="#8b8f98"/>
    <path d="M2,11L22,11" stroke="#5c6a72" stroke-width="2"/>
  `,
  // ルセ: フェリーの連絡
  danube_ferry_relay: `
    <path d="M2,17L22,17L19,21L5,21z" fill="#8b8f98"/>
    <rect x="8" y="9" width="8" height="8" fill="#3a6bc0"/>
    <path d="M2,15q5,-2 10,0t10,0" stroke="#5b8fe8" stroke-width="1.4" fill="none"/>
  `,
  // ジュルジュ: 1883年当時の線路の終点
  railhead_1883: `
    <rect x="3" y="17" width="18" height="2" fill="#5c6a72"/>
    <rect x="9" y="10" width="6" height="8" fill="#8b8f98"/>
    <path d="M6,10L18,10" stroke="#f5b31c" stroke-width="2"/>
    <circle cx="12" cy="8" r="1.6" fill="#e8443f"/>
  `,
  // テッサロニキ: ラディノ語の市場
  ladino_market: `
    <path d="M3,10L21,10L19,8L5,8z" fill="#e8443f" opacity=".85"/>
    <rect x="4" y="10" width="16" height="9" fill="#6b5330"/>
    <circle cx="9" cy="15" r="1.6" fill="#f4c430"/>
    <circle cx="15" cy="15" r="1.6" fill="#8fae63"/>
  `,
  // タリン: ギルドの城壁
  guild_wall: `
    <rect x="3" y="13" width="18" height="8" fill="#8b8f98"/>
    <path d="M3,13h2v-3h2v3h2v-3h2v3h2v-3h2v3h2v-3h2v3h2" fill="none" stroke="#8b8f98" stroke-width="2"/>
    <rect x="15" y="3" width="5" height="10" fill="#6b6b70"/>
    <path d="M15,3L17.5,0L20,3z" fill="#4a4a52"/>
  `,
  // リガ: アール・ヌーヴォーの装飾
  art_nouveau_facade: `
    <rect x="3" y="6" width="18" height="15" fill="#c8a35a"/>
    <path d="M12,6a5,5 0 0,1 5,5L7,11a5,5 0 0,1 5,-5z" fill="#8b6a1a"/>
    <rect x="9" y="14" width="6" height="7" fill="#3a6bc0"/>
  `,
  // ヴィリニュス: スヴァウキ・ギャップ
  suwalki_gap: `
    <rect x="2" y="6" width="8" height="15" fill="#8b8f98"/>
    <rect x="14" y="6" width="8" height="15" fill="#7a7a80"/>
    <path d="M10,18L14,18" stroke="#f5b31c" stroke-width="2"/>
    <path d="M10,13L14,13" stroke="#e8443f" stroke-width="1.4" stroke-dasharray="1.4,1.4"/>
  `,
  // リヴィウ: 1904年建築の壮麗な駅
  grand_1904_station: `
    <rect x="2" y="12" width="20" height="9" fill="#8b8f98"/>
    <path d="M2,12Q12,0 22,12z" fill="#7a7a80"/>
    <circle cx="12" cy="6" r="2" fill="#f4c430"/>
    <rect x="5" y="15" width="4" height="6" fill="#2a2a30"/>
    <rect x="15" y="15" width="4" height="6" fill="#2a2a30"/>
  `,
  // カリーニングラード: 広軌の飛び地
  broad_gauge_island: `
    <ellipse cx="12" cy="12" rx="10" ry="8" fill="#5f7f4a" opacity=".4"/>
    <path d="M3,16L21,16M3,20L21,20" stroke="#4a4a52" stroke-width="1.6"/>
    <path d="M6,16L6,20M12,16L12,20M18,16L18,20" stroke="#4a4a52" stroke-width="1"/>
  `,
  // キーウ: 地下深くの地下鉄
  deep_metro: `
    <path d="M4,2L4,10L20,10L20,2" stroke="#5c6a72" stroke-width="1.4" fill="none"/>
    <path d="M12,2L12,20" stroke="#5c6a72" stroke-width="1" stroke-dasharray="2,2"/>
    <rect x="7" y="16" width="10" height="6" rx="1" fill="#5b8fe8"/>
    <path d="M9,22l3,-4l3,4" fill="#f5b31c"/>
  `,
  // モナコ: 国境検査の無い鉄道
  borderless_rail: `
    <path d="M2,16L22,16" stroke="#5c6a72" stroke-width="2.2"/>
    <path d="M12,2L12,22" stroke="#e8443f" stroke-width="1.2" stroke-dasharray="2,2" opacity=".7"/>
    <circle cx="8" cy="16" r="2" fill="#2a2a30"/>
    <circle cx="16" cy="16" r="2" fill="#2a2a30"/>
    <rect x="6" y="11" width="12" height="5" rx="1" fill="#f4c430"/>
  `,
  // ヴァレッタ: 廃線になった鉄道
  closed_railway: `
    <path d="M2,17L22,17" stroke="#5c6a72" stroke-width="2"/>
    <path d="M4,15L4,19M9,15L9,19M14,15L14,19M19,15L19,19" stroke="#4a4a52" stroke-width="1.2"/>
    <path d="M6,12q3,-4 6,0t6,0" stroke="#8fae63" stroke-width="1.6" fill="none"/>
    <path d="M4,10L20,20M20,10L4,20" stroke="#e8443f" stroke-width="1" opacity=".6"/>
  `,
  // スコピエ: 止まった時計
  stopped_clock: `
    <circle cx="12" cy="12" r="9" fill="#f6efe2" stroke="#2a2a30" stroke-width="1.4"/>
    <path d="M12,12L12,6M12,12L16,13" stroke="#e8443f" stroke-width="1.6"/>
    <circle cx="12" cy="12" r="1.2" fill="#2a2a30"/>
  `,
  // ドゥラス: ヴィア・エグナティアの里程標
  via_egnatia_stone: `
    <path d="M8,21L8,7Q8,3 12,3Q16,3 16,7L16,21z" fill="#8b8f98"/>
    <path d="M2,21L22,21" stroke="#5c6a72" stroke-width="2"/>
    <circle cx="12" cy="9" r="1.6" fill="#f4c430"/>
  `,
  // キシナウ: ウンゲニの積み替え
  ungheni_transfer: `
    <rect x="3" y="14" width="18" height="4" fill="#5c6a72"/>
    <circle cx="8" cy="20" r="2.2" fill="#2a2a30"/>
    <circle cx="16" cy="20" r="2.2" fill="#2a2a30"/>
    <path d="M8,20L8,10M16,20L16,10" stroke="#f5b31c" stroke-width="1.6"/>
    <path d="M5,10L11,10M13,10L19,10" stroke="#e8443f" stroke-width="1.4"/>
  `,
  // ホーリーヘッド: アイリッシュ・メイルの郵便汽船
  mail_steamer: `
    <path d="M2,16L22,16L18,20L6,20z" fill="#8b8f98"/>
    <rect x="9" y="6" width="6" height="10" fill="#f6efe2"/>
    <rect x="7" y="4" width="10" height="3" fill="#e8443f"/>
    <path d="M4,16L4,10L20,10L20,16" stroke="#4a4a52" stroke-width="1.4" fill="none"/>
  `,
};

// ---------------------------------------------------------------------------
// 背景(400×210)
// ---------------------------------------------------------------------------

export const EUROPE_BG = {
  /** レイキャヴィク: 港の防波堤・採石場鉄道の記念機関車・地熱の湯気。 */
  iceland_harbour: (() => {
    const parts = [];
    parts.push(sky("#a9d4e8", "#dcecf2", 128));
    parts.push(`<circle cx="330" cy="46" r="20" fill="#f6efe2" opacity=".9"/>`);
    parts.push(cloud(60, 40, 1.1), cloud(300, 30, 0.9), cloud(120, 55, 0.8));
    // エッサ山(平頂の火山)
    parts.push(`<path d="M40,128L95,72L150,80L200,72L250,128z" fill="#5c6a72"/>`);
    parts.push(`<path d="M95,72L115,66L150,80z" fill="#f2f6f8"/>`);
    parts.push(gull(70, 44), gull(90, 58), gull(280, 40), gull(250, 66));
    parts.push(ground(128, "#1c3a5c")); // 海
    parts.push(band(160, 50, "#0f2438")); // 波打ち際の暗い帯
    parts.push(band(178, 32, "#2a2a30")); // 黒砂の浜
    // 桟橋
    for (let i = 0; i < 5; i++) {
      const x = 200 + i * 16;
      parts.push(`<rect x="${x}" y="150" width="4" height="30" fill="#4a3a2a"/>`);
    }
    parts.push(`<rect x="196" y="146" width="60" height="4" fill="#6b5330"/>`);
    // 記念機関車(左)ふたつ、旧採石場の線路の上
    parts.push(`<rect x="28" y="184" width="34" height="2" fill="#7a7a80"/>`);
    parts.push(`<rect x="30" y="172" width="14" height="8" rx="1" fill="#4a4a52"/>`);
    parts.push(`<circle cx="34" cy="184" r="3" fill="#2a2a30"/>`);
    parts.push(`<circle cx="42" cy="184" r="3" fill="#2a2a30"/>`);
    parts.push(`<rect x="46" y="176" width="10" height="6" rx="1" fill="#4a4a52"/>`);
    parts.push(`<circle cx="49" cy="184" r="3" fill="#2a2a30"/>`);
    parts.push(`<circle cx="55" cy="184" r="3" fill="#2a2a30"/>`);
    // 漁船
    parts.push(`<path d="M285,155L340,155L332,166L293,166z" fill="#8b8f98"/>`);
    parts.push(`<rect x="305" y="140" width="6" height="15" fill="#4a4a52"/>`);
    parts.push(`<rect x="298" y="146" width="18" height="9" fill="#e8443f" opacity=".85"/>`);
    // 玄武岩の柱状節理(右端)
    for (let i = 0; i < 4; i++) {
      const x = 360 + i * 9;
      parts.push(`<path d="M${x},210L${x + 3},130L${x + 6},130L${x + 9},210z" fill="#2f3a3f"/>`);
    }
    // ニシンの樽(手前左)
    for (let i = 0; i < 3; i++) {
      const x = 66 + i * 13;
      parts.push(`<rect x="${x}" y="188" width="10" height="12" rx="2" fill="#6b5330"/>`);
      parts.push(`<rect x="${x}" y="192" width="10" height="1.6" fill="#4a3a2a"/>`);
    }
    // 地熱の湯気(右手前)
    parts.push(`<ellipse cx="340" cy="196" rx="7" ry="5" fill="#f6efe2" opacity=".5"/>`);
    parts.push(`<ellipse cx="352" cy="188" rx="5" ry="4" fill="#f6efe2" opacity=".45"/>`);
    parts.push(`<ellipse cx="330" cy="184" rx="4" ry="3" fill="#f6efe2" opacity=".4"/>`);
    // 黒砂の粒感
    for (let i = 0; i < 6; i++) {
      parts.push(`<circle cx="${20 + i * 10}" cy="${196 + (i % 2) * 6}" r="1.2" fill="#141416" opacity=".6"/>`);
    }
    return parts.join("");
  })(),

  /** コペンハーゲン: エーレスンド橋が人工島を経てトンネルへ潜る。 */
  oresund: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 118));
    parts.push(cloud(70, 34, 1), cloud(330, 44, 0.9), cloud(200, 60, 0.7));
    parts.push(gull(50, 50), gull(65, 60), gull(320, 55));
    // 遠くの灯台(コースト)
    parts.push(`<rect x="14" y="98" width="6" height="24" fill="#f6efe2"/>`);
    parts.push(`<path d="M14,98L20,98L17,88z" fill="#e8443f"/>`);
    parts.push(ground(118, "#1c3a5c"));
    // 橋の橋脚とケーブル(左の橋脚)
    parts.push(`<rect x="72" y="90" width="6" height="60" fill="#8b8f98"/>`);
    parts.push(`<rect x="66" y="86" width="18" height="6" fill="#8b8f98"/>`);
    parts.push(`<path d="M75,92L40,132M75,92L110,132" stroke="#cfd8dc" stroke-width="1.2"/>`);
    // 橋の橋脚(右の橋脚)
    parts.push(`<rect x="300" y="94" width="6" height="56" fill="#8b8f98"/>`);
    parts.push(`<rect x="294" y="90" width="18" height="6" fill="#8b8f98"/>`);
    parts.push(`<path d="M303,96L270,134M303,96L336,134" stroke="#cfd8dc" stroke-width="1.2"/>`);
    // 橋桁(一直線)
    parts.push(`<rect x="10" y="132" width="380" height="5" fill="#5b8fe8"/>`);
    // ペーベルホルム島(人工島)
    parts.push(`<ellipse cx="330" cy="150" rx="34" ry="10" fill="#93ad68"/>`);
    parts.push(`<path d="M312,148l3,-6M320,149l2,-7M328,148l3,-6M336,149l2,-7" stroke="#5f7f4a" stroke-width="1.4"/>`);
    // トンネル坑口(橋が海へ潜る場所)
    parts.push(`<path d="M356,150Q372,150 372,166L372,180L390,180L390,150z" fill="#141416"/>`);
    parts.push(`<rect x="356" y="146" width="34" height="6" fill="#8b8f98"/>`);
    // 波の帯
    for (let i = 0; i < 6; i++) {
      const y = 160 + i * 8;
      parts.push(`<path d="M0,${y}q20,-5 40,0t40,0t40,0t40,0t40,0t40,0" stroke="#254a70" stroke-width="1.4" fill="none" opacity=".7"/>`);
    }
    // 海峡を渡る船
    parts.push(`<path d="M40,150L86,150L78,160L48,160z" fill="#8b8f98"/>`);
    parts.push(`<rect x="58" y="138" width="6" height="12" fill="#4a4a52"/>`);
    parts.push(`<rect x="52" y="142" width="18" height="4" fill="#e8443f" opacity=".8"/>`);
    // 岸辺の岩
    parts.push(`<ellipse cx="20" cy="190" rx="14" ry="6" fill="#5c6a72"/>`);
    parts.push(`<ellipse cx="40" cy="196" rx="10" ry="5" fill="#5c6a72"/>`);
    return parts.join("");
  })(),

  /** ブレスト: 軌間が変わる建屋で台車を履き替える。 */
  gauge_shed: (() => {
    const parts = [];
    parts.push(sky("#c7cdd2", "#e6e9ea", 60));
    // 屋根トラス(採光窓のある鉄骨屋根)
    for (let i = 0; i < 4; i++) {
      const x = 20 + i * 100;
      parts.push(`<path d="M${x},60L${x + 50},30L${x + 100},60z" fill="#5c6a72" opacity=".9"/>`);
      parts.push(`<path d="M${x + 30},55L${x + 50},40L${x + 70},55z" fill="#dcecf2" opacity=".6"/>`);
    }
    parts.push(ground(60, "#8b8f98")); // 建屋内の壁と床の下地
    parts.push(band(150, 60, "#3a3a40")); // 床
    // 吊り下げランプ
    parts.push(`<rect x="45" y="60" width="2" height="20" fill="#2a2a30"/>`);
    parts.push(`<circle cx="46" cy="82" r="5" fill="#f5b31c" opacity=".85"/>`);
    parts.push(`<rect x="355" y="60" width="2" height="20" fill="#2a2a30"/>`);
    parts.push(`<circle cx="356" cy="82" r="5" fill="#f5b31c" opacity=".85"/>`);
    parts.push(`<rect x="200" y="60" width="2" height="16" fill="#2a2a30"/>`);
    parts.push(`<circle cx="201" cy="78" r="5" fill="#f5b31c" opacity=".85"/>`);
    // 2つの軌間のレール(標準軌1435mmとロシア軌間1520mm、幅の違いを見せる)
    parts.push(`<rect x="0" y="176" width="400" height="3" fill="#2a2a30"/>`);
    parts.push(`<rect x="0" y="188" width="400" height="3" fill="#2a2a30"/>`);
    parts.push(`<rect x="0" y="196" width="400" height="3" fill="#2a2a30"/>`);
    // ジャッキで持ち上がる客車(中央やや右、都市シンボルの帯を避けて右寄りに)
    parts.push(`<rect x="255" y="130" width="90" height="34" rx="2" fill="#1a4a8f"/>`);
    parts.push(`<rect x="262" y="136" width="12" height="10" fill="#cfe4f0"/>`);
    parts.push(`<rect x="280" y="136" width="12" height="10" fill="#cfe4f0"/>`);
    parts.push(`<rect x="298" y="136" width="12" height="10" fill="#cfe4f0"/>`);
    parts.push(`<rect x="316" y="136" width="12" height="10" fill="#cfe4f0"/>`);
    // 車体を支えるジャッキ4本
    for (let i = 0; i < 4; i++) {
      const x = 262 + i * 22;
      parts.push(`<rect x="${x}" y="164" width="6" height="18" fill="#f5b31c"/>`);
      parts.push(`<rect x="${x - 4}" y="180" width="14" height="5" fill="#4a4a52"/>`);
    }
    // 取り外された標準軌の台車(左)
    parts.push(`<rect x="60" y="172" width="34" height="10" rx="1" fill="#8b8f98"/>`);
    parts.push(`<circle cx="68" cy="184" r="4" fill="#2a2a30"/>`);
    parts.push(`<circle cx="86" cy="184" r="4" fill="#2a2a30"/>`);
    // 待機するロシア軌間の台車(左、幅広)
    parts.push(`<rect x="110" y="174" width="42" height="9" rx="1" fill="#7a7a80"/>`);
    parts.push(`<circle cx="118" cy="185" r="4" fill="#2a2a30"/>`);
    parts.push(`<circle cx="144" cy="185" r="4" fill="#2a2a30"/>`);
    // 木箱
    parts.push(`<rect x="20" y="190" width="16" height="14" fill="#6b5330"/>`);
    parts.push(`<rect x="38" y="194" width="16" height="10" fill="#6b5330"/>`);
    // 保線員(簡略なシルエット、旗や制服の記号は入れない)
    parts.push(`<circle cx="175" cy="168" r="4" fill="#f6efe2"/>`);
    parts.push(`<rect x="171" y="172" width="8" height="16" rx="2" fill="#4a4a52"/>`);
    parts.push(`<circle cx="360" cy="168" r="4" fill="#f6efe2"/>`);
    parts.push(`<rect x="356" y="172" width="8" height="16" rx="2" fill="#4a4a52"/>`);
    // 工具
    parts.push(`<rect x="200" y="196" width="14" height="4" fill="#8b8f98"/>`);
    parts.push(`<rect x="220" y="198" width="10" height="3" fill="#8b8f98"/>`);
    return parts.join("");
  })(),

  /** ショプロン: 国境フェンスの開いた門(汎ヨーロッパ・ピクニック)。 */
  iron_curtain: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 132));
    parts.push(cloud(60, 36, 1), cloud(320, 30, 0.85));
    // 遠くのショプロンの火の見塔(現地のランドマーク)のシルエット
    parts.push(`<rect x="358" y="82" width="8" height="40" fill="#8b8f98" opacity=".8"/>`);
    parts.push(`<path d="M356,82L370,82L363,68z" fill="#8b8f98" opacity=".8"/>`);
    // 遠景の丘
    parts.push(`<path d="M0,132c60,-24 140,-24 200,0c60,-20 140,-20 200,0v10H0z" fill="#7a8f6a" opacity=".85"/>`);
    parts.push(ground(132, "#8fae63")); // 草地
    // 国境フェンス(左右に伸び、中央手前が開いた門)
    for (let i = 0; i < 4; i++) {
      const x = 20 + i * 24;
      parts.push(`<rect x="${x}" y="140" width="3" height="34" fill="#7a7a80"/>`);
    }
    parts.push(`<path d="M20,148L110,148M20,158L110,158M20,168L110,168" stroke="#5c6a72" stroke-width="1.2"/>`);
    for (let i = 0; i < 4; i++) {
      const x = 300 + i * 24;
      parts.push(`<rect x="${x}" y="140" width="3" height="34" fill="#7a7a80"/>`);
    }
    parts.push(`<path d="M300,148L390,148M300,158L390,158M300,168L390,168" stroke="#5c6a72" stroke-width="1.2"/>`);
    // 開いた門(片開き、支柱から斜めに開く)
    parts.push(`<rect x="150" y="140" width="3" height="40" fill="#4a4a52"/>`);
    parts.push(`<path d="M153,148L120,160M153,158L120,166M153,168L120,172" stroke="#5c6a72" stroke-width="1.2"/>`);
    // 監視塔(遠く、いまは役目を終えた姿として小さく)
    parts.push(`<rect x="250" y="96" width="4" height="30" fill="#5c6a72" opacity=".7"/>`);
    parts.push(`<rect x="244" y="90" width="16" height="10" fill="#5c6a72" opacity=".7"/>`);
    // 有刺鉄線の巻き(手前、フェンスの根元に残されたまま)
    for (let i = 0; i < 3; i++) {
      parts.push(`<circle cx="${170 + i * 10}" cy="188" r="7" fill="none" stroke="#4a4a52" stroke-width="1.4" opacity=".7"/>`);
    }
    // ピクニックの敷物と籠(手前左)
    parts.push(`<rect x="40" y="185" width="50" height="18" rx="2" fill="#e8443f" opacity=".8"/>`);
    parts.push(`<path d="M40,190L90,190M40,196L90,196" stroke="#f6efe2" stroke-width="1.4"/>`);
    parts.push(`<rect x="96" y="180" width="14" height="10" rx="2" fill="#6b5330"/>`);
    parts.push(`<rect x="94" y="176" width="18" height="4" fill="#6b5330"/>`);
    parts.push(`<circle cx="60" cy="182" r="3" fill="#f6efe2"/>`);
    parts.push(`<circle cx="72" cy="183" r="3" fill="#f6efe2"/>`);
    // 門を歩いて越える二人(小さなシルエット)
    parts.push(`<circle cx="130" cy="164" r="3.5" fill="#f6efe2"/>`);
    parts.push(`<rect x="127" y="168" width="7" height="14" rx="2" fill="#5b8fe8"/>`);
    parts.push(`<circle cx="140" cy="168" r="3.5" fill="#f6efe2"/>`);
    parts.push(`<rect x="137" y="172" width="7" height="14" rx="2" fill="#f5b31c"/>`);
    // 野の花
    for (let i = 0; i < 6; i++) {
      const x = 310 + i * 12;
      parts.push(`<circle cx="${x}" cy="${192 + (i % 2) * 6}" r="2.4" fill="#f6efe2"/>`);
      parts.push(`<rect x="${x - 0.5}" y="${194 + (i % 2) * 6}" width="1" height="8" fill="#5f7f4a"/>`);
    }
    // 蝶
    parts.push(`<path d="M355,175q-4,-4 0,-6q4,2 0,6M355,175q4,-4 0,-6q-4,2 0,6" fill="#f5b31c" opacity=".8"/>`);
    return parts.join("");
  })(),

  /** パリ: ガール・ド・レストとオリエント急行の出発ホーム。 */
  orient_express: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 60));
    // ガラス屋根のアーチ(駅構内)
    for (let i = 0; i < 4; i++) {
      const x = 10 + i * 100;
      parts.push(`<path d="M${x},70Q${x + 50},10 ${x + 100},70" stroke="#5c6a72" stroke-width="3" fill="none"/>`);
      parts.push(`<rect x="${x + 20}" y="34" width="60" height="4" fill="#cfe4f0" opacity=".5"/>`);
    }
    parts.push(ground(70, "#8b8f98")); // 駅構内の壁と床の下地
    parts.push(band(150, 60, "#5c6a72")); // ホームの床
    // 発車案内板(枠のみ、文字は入れない)
    parts.push(`<rect x="330" y="78" width="56" height="30" rx="2" fill="#2a2a30"/>`);
    parts.push(`<rect x="336" y="84" width="44" height="4" fill="#f5b31c" opacity=".7"/>`);
    parts.push(`<rect x="336" y="92" width="44" height="4" fill="#f5b31c" opacity=".5"/>`);
    parts.push(`<rect x="336" y="100" width="44" height="4" fill="#f5b31c" opacity=".3"/>`);
    // 駅の大時計(針のみ、数字は入れない)
    parts.push(`<circle cx="30" cy="90" r="16" fill="#f6efe2" stroke="#2a2a30" stroke-width="2"/>`);
    parts.push(`<path d="M30,90L30,80M30,90L38,92" stroke="#2a2a30" stroke-width="2"/>`);
    // ワゴン・リの機関車と客車
    parts.push(`<rect x="60" y="140" width="60" height="26" rx="2" fill="#2a2a30"/>`);
    parts.push(`<rect x="66" y="128" width="16" height="14" fill="#2a2a30"/>`);
    parts.push(`<circle cx="72" cy="168" r="6" fill="#141416"/>`);
    parts.push(`<circle cx="96" cy="168" r="6" fill="#141416"/>`);
    parts.push(`<circle cx="112" cy="168" r="6" fill="#141416"/>`);
    parts.push(`<rect x="130" y="140" width="80" height="26" rx="2" fill="#1a4a8f"/>`);
    parts.push(`<rect x="138" y="146" width="12" height="10" fill="#cfe4f0"/>`);
    parts.push(`<rect x="156" y="146" width="12" height="10" fill="#cfe4f0"/>`);
    parts.push(`<rect x="174" y="146" width="12" height="10" fill="#cfe4f0"/>`);
    parts.push(`<rect x="192" y="146" width="12" height="10" fill="#cfe4f0"/>`);
    parts.push(`<rect x="130" y="138" width="80" height="3" fill="#f4c430"/>`);
    parts.push(`<circle cx="140" cy="168" r="6" fill="#141416"/>`);
    parts.push(`<circle cx="200" cy="168" r="6" fill="#141416"/>`);
    // 蒸気
    parts.push(`<ellipse cx="70" cy="120" rx="10" ry="6" fill="#f6efe2" opacity=".7"/>`);
    parts.push(`<ellipse cx="85" cy="108" rx="8" ry="5" fill="#f6efe2" opacity=".55"/>`);
    // プラットホームのランプ
    parts.push(`<rect x="300" y="130" width="3" height="40" fill="#2a2a30"/>`);
    parts.push(`<circle cx="301" cy="126" r="5" fill="#f5b31c" opacity=".85"/>`);
    // 手荷物トロリーとトランク
    parts.push(`<rect x="240" y="176" width="40" height="4" fill="#4a4a52"/>`);
    parts.push(`<circle cx="246" cy="184" r="3" fill="#2a2a30"/>`);
    parts.push(`<circle cx="274" cy="184" r="3" fill="#2a2a30"/>`);
    parts.push(`<rect x="244" y="160" width="16" height="16" fill="#6b5330"/>`);
    parts.push(`<rect x="262" y="164" width="14" height="12" fill="#8b6a3a"/>`);
    // 鳩
    parts.push(`<ellipse cx="230" cy="196" rx="5" ry="3" fill="#8b8f98"/>`);
    parts.push(`<ellipse cx="245" cy="200" rx="5" ry="3" fill="#8b8f98"/>`);
    parts.push(`<ellipse cx="355" cy="198" rx="5" ry="3" fill="#8b8f98"/>`);
    return parts.join("");
  })(),

  /** レズビュハウン: 列車ごと乗り込むフェリー、渡り鳥の道。 */
  train_ferry: (() => {
    const parts = [];
    parts.push(sky("#a9d4e8", "#dcecf2", 120));
    parts.push(cloud(70, 30, 1), cloud(320, 40, 0.9));
    for (let i = 0; i < 6; i++) parts.push(gull(50 + i * 14, 40 + (i % 2) * 10, 0.8));
    parts.push(ground(120, "#1c3a5c"));
    parts.push(waves(150, "#254a70", 3, 9));
    // フェリー船体とデッキの貨車
    parts.push(`<path d="M40,150L360,150L340,180L60,180z" fill="#8b8f98"/>`);
    parts.push(`<rect x="80" y="130" width="50" height="20" rx="2" fill="#1a4a8f"/>`);
    parts.push(`<rect x="140" y="130" width="50" height="20" rx="2" fill="#1a4a8f"/>`);
    parts.push(`<rect x="200" y="130" width="50" height="20" rx="2" fill="#1a4a8f"/>`);
    for (let i = 0; i < 3; i++) {
      parts.push(`<circle cx="${95 + i * 60}" cy="150" r="3" fill="#2a2a30"/>`);
      parts.push(`<circle cx="${115 + i * 60}" cy="150" r="3" fill="#2a2a30"/>`);
    }
    parts.push(`<rect x="270" y="135" width="10" height="20" fill="#4a4a52"/>`);
    // 建設中の沈埋トンネルの現場(右手前)
    parts.push(`<rect x="330" y="160" width="8" height="30" fill="#f5b31c"/>`);
    parts.push(`<path d="M320,190L360,190L355,200L325,200z" fill="#5c6a72"/>`);
    return parts.join("");
  })(),

  /** トースハウン: 海底道路トンネルのロータリー。 */
  faroe_tunnel: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 96));
    parts.push(cloud(80, 30, 1));
    parts.push(`<path d="M0,96L60,50L130,70L200,40L270,66L340,45L400,80L400,96z" fill="#5c6a72"/>`);
    parts.push(ground(96, "#141416"));
    // 海底トンネル断面とロータリー
    parts.push(`<path d="M0,150Q200,110 400,150L400,210L0,210z" fill="#1c3a5c"/>`);
    parts.push(`<ellipse cx="200" cy="180" rx="70" ry="22" fill="#2a2a30" stroke="#5c6a72" stroke-width="2"/>`);
    parts.push(lightDot(140, 180, 6, "#e8443f"), lightDot(200, 168, 6, "#f5b31c"), lightDot(260, 180, 6, "#5b8fe8"));
    parts.push(`<path d="M40,180L140,180M260,180L360,180" stroke="#8b8f98" stroke-width="6"/>`);
    parts.push(`<rect x="60" y="176" width="16" height="8" rx="2" fill="#f6efe2"/>`);
    parts.push(`<rect x="300" y="176" width="16" height="8" rx="2" fill="#f6efe2"/>`);
    // 断崖の海鳥(ニシツノメドリ)
    for (let i = 0; i < 3; i++) {
      parts.push(`<ellipse cx="${30 + i * 12}" cy="${60 + i * 5}" rx="4" ry="3" fill="#2a2a30"/>`);
      parts.push(`<path d="M${26 + i * 12},${60 + i * 5} l-3,-1" stroke="#f5b31c" stroke-width="1.4"/>`);
    }
    return parts.join("");
  })(),

  /** ナルヴィク: 凍らない港と鉄鉱石の積み出し。 */
  arctic_port: (() => {
    const parts = [];
    parts.push(sky("#7fb0d8", "#c8dce8", 110));
    parts.push(mountainPeak(60, 110, 60, "#8b8f98"), mountainPeak(340, 110, 70, "#7a8790"));
    parts.push(cloud(200, 40, 1));
    parts.push(ground(110, "#1c3a5c"));
    parts.push(waves(140, "#254a70", 2, 10));
    // 積み出し埠頭とオレ鉱石の山
    parts.push(`<rect x="140" y="150" width="120" height="8" fill="#5c6a72"/>`);
    parts.push(`<path d="M150,150L170,130L190,150z" fill="#5c4a3a"/>`);
    parts.push(`<path d="M195,150L215,125L235,150z" fill="#6b5a45"/>`);
    parts.push(boat(90, 170, 1.1, "#7a7a80", "#e8443f"));
    parts.push(boat(320, 165, 0.9, "#8b8f98", "#f5b31c"));
    // 貨車の連なり
    for (let i = 0; i < 4; i++) {
      parts.push(`<rect x="${20 + i * 22}" y="185" width="18" height="10" fill="#5c4a3a"/>`);
      parts.push(`<circle cx="${25 + i * 22}" cy="196" r="2" fill="#2a2a30"/>`);
      parts.push(`<circle cx="${33 + i * 22}" cy="196" r="2" fill="#2a2a30"/>`);
    }
    return parts.join("");
  })(),

  /** キルナ: 鉱山の真上から移設される町。 */
  mine_town: (() => {
    const parts = [];
    parts.push(sky("#a9d4e8", "#dcecf2", 118));
    parts.push(cloud(60, 30, 0.9), cloud(330, 40, 1));
    parts.push(hillsRow(118, "#87957a", 4, 0.8));
    parts.push(ground(118, "#93ad68"));
    // 鉱山の立坑櫓(右)
    parts.push(`<rect x="330" y="120" width="6" height="60" fill="#4a4a52"/>`);
    parts.push(`<path d="M320,130L346,130L336,110L330,110z" fill="#5c6a72"/>`);
    parts.push(`<rect x="315" y="180" width="55" height="10" fill="#2a2a30"/>`);
    // 地割れ
    parts.push(`<path d="M60,180L100,160L90,190L140,175" stroke="#4a3a2a" stroke-width="3" fill="none"/>`);
    // トレーラーで運ばれる木造教会
    parts.push(`<rect x="150" y="185" width="60" height="8" fill="#5c6a72"/>`);
    parts.push(`<circle cx="160" cy="196" r="4" fill="#2a2a30"/>`);
    parts.push(`<circle cx="200" cy="196" r="4" fill="#2a2a30"/>`);
    parts.push(`<path d="M165,185L165,160L175,148L185,160L185,185z" fill="#6b5330"/>`);
    parts.push(`<rect x="173" y="144" width="4" height="6" fill="#4a3a2a"/>`);
    return parts.join("");
  })(),

  /** マルメ: シティ・トンネルから出てくる通勤電車。 */
  city_tunnel: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 110));
    parts.push(cloud(90, 30, 1));
    // ターニング・トルソ(ねじれた高層ビル)
    parts.push(`<path d="M320,110L332,40L344,105L356,50L360,110z" fill="#8b8f98"/>`);
    parts.push(`<rect x="318" y="110" width="46" height="4" fill="#5c6a72"/>`);
    // 遠くのエーレスンド橋
    parts.push(`<path d="M40,105L200,90L360,108" stroke="#5b8fe8" stroke-width="2" fill="none" opacity=".7"/>`);
    parts.push(ground(110, "#93ad68"));
    parts.push(band(150, 60, "#5c6a72"));
    // トンネル坑口
    parts.push(`<path d="M120,150Q140,130 160,150z" fill="#141416"/>`);
    parts.push(`<rect x="118" y="146" width="44" height="6" fill="#8b8f98"/>`);
    // 通勤電車
    parts.push(`<rect x="170" y="150" width="90" height="22" rx="3" fill="#5b8fe8"/>`);
    parts.push(`<rect x="178" y="155" width="10" height="8" fill="#cfe4f0"/>`);
    parts.push(`<rect x="194" y="155" width="10" height="8" fill="#cfe4f0"/>`);
    parts.push(`<rect x="210" y="155" width="10" height="8" fill="#cfe4f0"/>`);
    parts.push(`<rect x="226" y="155" width="10" height="8" fill="#cfe4f0"/>`);
    parts.push(`<circle cx="180" cy="174" r="4" fill="#2a2a30"/>`);
    parts.push(`<circle cx="250" cy="174" r="4" fill="#2a2a30"/>`);
    return parts.join("");
  })(),

  /** ヴィスビュー: ハンザの市壁と市場。 */
  hanseatic_wall: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 110));
    parts.push(cloud(70, 30, 1), cloud(330, 40, 0.9));
    parts.push(ground(110, "#1c3a5c"));
    parts.push(waves(130, "#254a70", 2, 9));
    // 市壁と塔(左寄り)
    parts.push(`<rect x="20" y="150" width="180" height="30" fill="#c8b088"/>`);
    for (let i = 0; i < 8; i++) {
      const x = 20 + i * 22;
      parts.push(`<rect x="${x}" y="140" width="10" height="10" fill="#c8b088"/>`);
    }
    parts.push(`<rect x="60" y="120" width="16" height="40" fill="#a8905f"/>`);
    parts.push(`<path d="M60,120L68,108L76,120z" fill="#6b5330"/>`);
    parts.push(`<rect x="140" y="115" width="16" height="45" fill="#a8905f"/>`);
    parts.push(`<path d="M140,115L148,103L156,115z" fill="#6b5330"/>`);
    // 港のハンザ船
    parts.push(boat(280, 155, 1, "#8b8f98", "#e8443f"));
    parts.push(boat(340, 165, 0.7, "#7a7a80", "#f5b31c"));
    // 市場の露店(手前)
    parts.push(`<rect x="30" y="188" width="20" height="14" fill="#6b5330"/>`);
    parts.push(`<path d="M28,188L52,188L48,180L32,180z" fill="#e8443f" opacity=".8"/>`);
    return parts.join("");
  })(),

  /** ヘルシンキ: 花崗岩の駅とマーケット広場。 */
  granite_hall: (() => {
    const parts = [];
    parts.push(sky("#a9d4e8", "#dcecf2", 110));
    parts.push(cloud(300, 30, 1));
    // 花崗岩の駅舎
    parts.push(`<rect x="40" y="70" width="140" height="40" fill="#8b8f98"/>`);
    parts.push(`<path d="M40,70Q110,20 180,70z" fill="#7a7a80"/>`);
    parts.push(`<circle cx="110" cy="60" r="7" fill="#f6efe2" stroke="#2a2a30" stroke-width="1"/>`);
    parts.push(`<rect x="60" y="90" width="14" height="20" fill="#2a2a30"/>`);
    parts.push(`<rect x="146" y="90" width="14" height="20" fill="#2a2a30"/>`);
    parts.push(ground(110, "#5c6a72"));
    // 海と港
    parts.push(band(150, 60, "#1c3a5c"));
    parts.push(waves(165, "#254a70", 2, 8));
    parts.push(boat(300, 175, 1, "#8b8f98", "#5b8fe8"));
    // マーケット広場のニシン屋台
    parts.push(`<rect x="220" y="150" width="60" height="10" fill="#6b5330"/>`);
    parts.push(`<path d="M215,150L285,150L278,138L222,138z" fill="#e8443f" opacity=".8"/>`);
    parts.push(`<circle cx="235" cy="155" r="2" fill="#cfe4f0"/>`);
    parts.push(`<circle cx="250" cy="155" r="2" fill="#cfe4f0"/>`);
    parts.push(`<circle cx="265" cy="155" r="2" fill="#cfe4f0"/>`);
    return parts.join("");
  })(),

  /** ロンドン: セント・パンクラス駅とユーロスター。 */
  channel_tunnel: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 70));
    // ガラス屋根のアーチ
    for (let i = 0; i < 3; i++) {
      const x = 20 + i * 130;
      parts.push(`<path d="M${x},70Q${x + 65},15 ${x + 130},70" stroke="#4a4a52" stroke-width="3" fill="none"/>`);
    }
    // 時計塔のシルエット(遠景)
    parts.push(`<rect x="350" y="30" width="10" height="50" fill="#5c6a72"/>`);
    parts.push(`<circle cx="355" cy="40" r="6" fill="#f6efe2" stroke="#2a2a30" stroke-width="1"/>`);
    parts.push(ground(70, "#8b8f98"));
    parts.push(band(150, 60, "#5c6a72"));
    // ユーロスター
    parts.push(`<rect x="60" y="140" width="220" height="26" rx="4" fill="#f6efe2"/>`);
    parts.push(`<path d="M60,166L60,150Q70,140 90,140L280,140L280,166z" fill="#5b8fe8"/>`);
    parts.push(`<rect x="0" y="164" width="400" height="3" fill="#f5b31c"/>`);
    for (let i = 0; i < 5; i++) parts.push(`<rect x="${95 + i * 34}" y="148" width="14" height="10" fill="#cfe4f0"/>`);
    // 荷物とプラットホーム灯
    parts.push(`<rect x="20" y="176" width="14" height="14" fill="#6b5330"/>`);
    parts.push(lightDot(340, 90, 5), lightDot(320, 100, 4));
    return parts.join("");
  })(),

  /** ダブリン: フェリーターミナルと広軌の客車。 */
  ferry_terminal: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 110));
    parts.push(cloud(90, 30, 1), cloud(300, 40, 0.8));
    parts.push(ground(110, "#93ad68"));
    parts.push(band(150, 60, "#1c3a5c"));
    parts.push(waves(165, "#254a70", 2, 9));
    // フェリー
    parts.push(`<path d="M240,150L380,150L365,178L255,178z" fill="#8b8f98"/>`);
    parts.push(`<rect x="290" y="130" width="14" height="20" fill="#4a4a52"/>`);
    parts.push(`<rect x="270" y="140" width="60" height="10" fill="#f6efe2"/>`);
    // 広軌の客車(手前)
    parts.push(`<rect x="20" y="165" width="90" height="24" rx="2" fill="#5f7f4a"/>`);
    parts.push(`<rect x="28" y="170" width="12" height="10" fill="#cfe4f0"/>`);
    parts.push(`<rect x="46" y="170" width="12" height="10" fill="#cfe4f0"/>`);
    parts.push(`<rect x="64" y="170" width="12" height="10" fill="#cfe4f0"/>`);
    parts.push(`<circle cx="30" cy="192" r="4" fill="#2a2a30"/>`);
    parts.push(`<circle cx="100" cy="192" r="4" fill="#2a2a30"/>`);
    // カラフルなジョージ王朝様式のドア(ダブリンらしさ)
    for (let i = 0; i < 4; i++) {
      const colors = ["#e8443f", "#f5b31c", "#5b8fe8", "#8fae63"];
      parts.push(`<rect x="${130 + i * 16}" y="185" width="12" height="18" fill="${colors[i]}"/>`);
    }
    return parts.join("");
  })(),

  /** サンティアゴ・デ・コンポステーラ: 巡礼路が集まる大聖堂広場。 */
  cathedral_square: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 120));
    parts.push(cloud(320, 30, 1));
    parts.push(`<rect x="30" y="60" width="26" height="60" fill="#8b8f98"/>`);
    parts.push(`<path d="M30,60L43,40L56,60z" fill="#7a7a80"/>`);
    parts.push(`<rect x="330" y="55" width="26" height="65" fill="#8b8f98"/>`);
    parts.push(`<path d="M330,55L343,35L356,55z" fill="#7a7a80"/>`);
    parts.push(`<rect x="90" y="80" width="220" height="40" fill="#a89878"/>`);
    parts.push(ground(120, "#c8b89a"));
    // 巡礼者たち(杖とホタテ貝)
    for (let i = 0; i < 3; i++) {
      const x = 60 + i * 40;
      parts.push(`<circle cx="${x}" cy="${175 - i * 3}" r="4" fill="#f6efe2"/>`);
      parts.push(`<rect x="${x - 3}" y="${179 - i * 3}" width="6" height="16" rx="2" fill="#6b5330"/>`);
      parts.push(`<path d="M${x + 4},${175 - i * 3}L${x + 12},${160 - i * 3}" stroke="#8b6a3a" stroke-width="1.4"/>`);
    }
    // バグパイプ奏者(手前右)
    parts.push(`<circle cx="330" cy="180" r="4" fill="#f6efe2"/>`);
    parts.push(`<rect x="326" y="184" width="8" height="16" rx="2" fill="#5f7f4a"/>`);
    parts.push(`<ellipse cx="340" cy="182" rx="6" ry="8" fill="#e8443f" opacity=".8"/>`);
    // 貝の道しるべ
    for (let i = 0; i < 4; i++) {
      parts.push(`<path d="M${100 + i * 50},198a3,2 0 0,1 6,0" fill="#f4c430"/>`);
    }
    return parts.join("");
  })(),

  /** イルン: 軌間を自動で変える装置とビダソア川。 */
  gauge_changer: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 110));
    parts.push(cloud(80, 30, 1));
    parts.push(ground(110, "#8fae63"));
    parts.push(band(150, 60, "#5c6a72"));
    // 川と税関
    parts.push(`<path d="M0,110L60,120L20,210L0,210z" fill="#1c3a5c"/>`);
    parts.push(`<rect x="10" y="90" width="30" height="24" fill="#a8905f"/>`);
    parts.push(`<path d="M10,90L25,78L40,90z" fill="#6b5330"/>`);
    // レールと切り替え装置
    parts.push(`<rect x="80" y="176" width="300" height="4" fill="#2a2a30"/>`);
    parts.push(`<rect x="160" y="160" width="70" height="8" rx="2" fill="#8b8f98"/>`);
    parts.push(`<path d="M170,168L170,176M220,168L220,176" stroke="#f5b31c" stroke-width="2"/>`);
    // タルゴ列車
    parts.push(`<rect x="240" y="150" width="120" height="24" rx="3" fill="#e8443f"/>`);
    for (let i = 0; i < 4; i++) parts.push(`<rect x="${248 + i * 26}" y="156" width="14" height="10" fill="#f6efe2"/>`);
    parts.push(`<circle cx="255" cy="180" r="5" fill="#2a2a30"/>`);
    parts.push(`<circle cx="345" cy="180" r="5" fill="#2a2a30"/>`);
    return parts.join("");
  })(),

  /** バルセロナ: AVE標準軌ホームと旧広軌地下鉄。 */
  standard_gauge_yard: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 96));
    parts.push(cloud(300, 30, 1));
    // 遠くの尖塔(教会風の飾り塔、固有名詞なしの一般化した形)
    parts.push(`<path d="M330,96L336,50L342,96zM348,96L354,40L360,96z" fill="#c8b088"/>`);
    parts.push(ground(96, "#8b8f98"));
    parts.push(band(150, 60, "#5c6a72"));
    // AVEホーム
    parts.push(`<rect x="30" y="140" width="200" height="26" rx="3" fill="#e8443f"/>`);
    for (let i = 0; i < 5; i++) parts.push(`<rect x="${38 + i * 34}" y="146" width="16" height="10" fill="#f6efe2"/>`);
    parts.push(`<circle cx="45" cy="170" r="5" fill="#2a2a30"/>`);
    parts.push(`<circle cx="215" cy="170" r="5" fill="#2a2a30"/>`);
    // 地下の旧広軌地下鉄(断面図風、手前下)
    parts.push(`<rect x="250" y="180" width="130" height="24" fill="#3a3a40"/>`);
    parts.push(`<rect x="260" y="185" width="40" height="14" rx="2" fill="#5f7f4a"/>`);
    parts.push(`<circle cx="268" cy="201" r="3" fill="#2a2a30"/>`);
    parts.push(`<circle cx="292" cy="201" r="3" fill="#2a2a30"/>`);
    return parts.join("");
  })(),

  /** リスボン: 4月25日橋の鉄道桁とアズレージョ。 */
  tagus_bridge: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 100));
    parts.push(cloud(80, 30, 1));
    parts.push(ground(100, "#1c3a5c"));
    parts.push(waves(130, "#254a70", 2, 9));
    // 吊り橋(4月25日橋のような赤い橋)
    parts.push(`<rect x="100" y="40" width="6" height="80" fill="#e8443f"/>`);
    parts.push(`<rect x="300" y="40" width="6" height="80" fill="#e8443f"/>`);
    parts.push(`<path d="M20,100Q200,60 380,100" stroke="#e8443f" stroke-width="2.4" fill="none"/>`);
    parts.push(`<path d="M40,100L100,60M160,100L103,45M200,100L303,45M360,100L300,60" stroke="#c8443f" stroke-width="1"/>`);
    // 下段の鉄道桁
    parts.push(`<rect x="20" y="112" width="360" height="8" fill="#8b8f98"/>`);
    // アズレージョ(タイル)模様の壁(手前)
    parts.push(`<rect x="20" y="160" width="120" height="40" fill="#3a6bc0"/>`);
    for (let x = 20; x < 140; x += 15) parts.push(`<path d="M${x},160L${x},200" stroke="#cfe4f0" stroke-width=".8"/>`);
    for (let y = 160; y < 200; y += 13) parts.push(`<path d="M20,${y}L140,${y}" stroke="#cfe4f0" stroke-width=".8"/>`);
    // 路面電車
    parts.push(`<rect x="200" y="170" width="60" height="20" rx="3" fill="#f5b31c"/>`);
    parts.push(`<rect x="206" y="175" width="10" height="8" fill="#cfe4f0"/>`);
    parts.push(`<rect x="222" y="175" width="10" height="8" fill="#cfe4f0"/>`);
    parts.push(`<circle cx="212" cy="192" r="3" fill="#2a2a30"/>`);
    parts.push(`<circle cx="248" cy="192" r="3" fill="#2a2a30"/>`);
    return parts.join("");
  })(),

  /** カレー: トンネル貫通の瞬間。 */
  undersea_bore: (() => {
    const parts = [];
    parts.push(sky("#c7cdd2", "#e6e9ea", 70));
    // 白亜の断崖
    parts.push(`<path d="M0,70L400,70L400,90L0,110z" fill="#f2f6f8"/>`);
    parts.push(ground(90, "#3a3a40"));
    // トンネル坑口(左右から掘り進む)
    parts.push(`<path d="M20,150Q60,120 100,150L100,200L20,200z" fill="#141416"/>`);
    parts.push(`<path d="M380,150Q340,120 300,150L300,200L380,200z" fill="#141416"/>`);
    parts.push(`<rect x="20" y="146" width="80" height="6" fill="#5c6a72"/>`);
    parts.push(`<rect x="300" y="146" width="80" height="6" fill="#5c6a72"/>`);
    // 貫通の瞬間の作業坑と握手
    parts.push(`<ellipse cx="200" cy="170" rx="30" ry="24" fill="#141416"/>`);
    parts.push(`<path d="M170,170L190,166L200,170L210,166L230,170" stroke="#f6efe2" stroke-width="2" fill="none"/>`);
    parts.push(lightDot(150, 165, 5, "#e8443f"), lightDot(250, 165, 5, "#5b8fe8"));
    // トンネル掘削機(TBM)の刃先
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      parts.push(`<circle cx="${r1(120 + Math.cos(a) * 18)}" cy="${r1(180 + Math.sin(a) * 18)}" r="2" fill="#8b8f98"/>`);
    }
    return parts.join("");
  })(),

  /** ブリュッセル: 中央駅と首都どうしを結ぶ路線網。 */
  central_station: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 90));
    parts.push(cloud(320, 30, 1));
    parts.push(`<rect x="60" y="60" width="280" height="30" fill="#8b8f98"/>`);
    parts.push(`<path d="M60,60Q200,20 340,60z" fill="#7a7a80"/>`);
    for (let i = 0; i < 6; i++) parts.push(`<rect x="${75 + i * 42}" y="66" width="20" height="18" fill="#cfe4f0" opacity=".6"/>`);
    parts.push(ground(90, "#5c6a72"));
    parts.push(band(150, 60, "#4a4a52"));
    // 放射状に伸びる路線を示す線
    parts.push(`<path d="M200,150L40,200M200,150L120,205M200,150L280,205M200,150L360,200" stroke="#f5b31c" stroke-width="1.6" opacity=".7"/>`);
    // サンドイッチ屋台(手前)
    parts.push(`<rect x="30" y="185" width="26" height="14" fill="#6b5330"/>`);
    parts.push(`<path d="M28,185L58,185L54,176L32,176z" fill="#8fae63"/>`);
    // 換気口
    parts.push(`<rect x="320" y="188" width="16" height="8" fill="#2a2a30"/>`);
    parts.push(`<path d="M320,188L336,188" stroke="#5c6a72" stroke-width="1"/>`);
    return parts.join("");
  })(),

  /** ロッテルダム: コンテナ港のガントリークレーン。 */
  freight_port: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 100));
    parts.push(cloud(80, 30, 1));
    parts.push(ground(100, "#1c3a5c"));
    parts.push(waves(125, "#254a70", 2, 8));
    // ガントリークレーン2基
    for (const cx of [90, 260]) {
      parts.push(`<path d="M${cx - 30},190L${cx - 30},130L${cx + 30},130L${cx + 30},190" stroke="#f5b31c" stroke-width="3" fill="none"/>`);
      parts.push(`<path d="M${cx - 50},130L${cx + 50},130" stroke="#f5b31c" stroke-width="4"/>`);
      parts.push(`<rect x="${cx - 6}" y="145" width="12" height="16" fill="#5c6a72"/>`);
    }
    // コンテナの積み重ね
    const colors = ["#e8443f", "#5b8fe8", "#f5b31c", "#8fae63"];
    for (let i = 0; i < 8; i++) {
      const x = 150 + (i % 4) * 20;
      const y = 180 - Math.floor(i / 4) * 14;
      parts.push(`<rect x="${x}" y="${y}" width="18" height="12" fill="${colors[i % 4]}"/>`);
    }
    // 貨物船
    parts.push(boat(340, 165, 1, "#8b8f98", "#4a4a52"));
    return parts.join("");
  })(),

  /** ルクセンブルク: ペトリュス高架橋と無料のトラム。 */
  petrusse_viaduct: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 100));
    parts.push(cloud(300, 30, 1));
    parts.push(hillsRow(100, "#7a8f6a", 3, 0.8));
    parts.push(ground(100, "#93ad68"));
    // 谷と高架橋のアーチ
    parts.push(`<path d="M0,100L400,100L400,150L0,190z" fill="#5c6a72" opacity=".3"/>`);
    parts.push(`<rect x="40" y="120" width="320" height="10" fill="#c8b088"/>`);
    for (let i = 0; i < 7; i++) {
      const x = 50 + i * 45;
      parts.push(`<path d="M${x},130a15,20 0 0,0 30,0z" fill="#5c6a72"/>`);
    }
    // 旧市街の建物(崖の上)
    parts.push(`<rect x="60" y="95" width="20" height="26" fill="#a8905f"/>`);
    parts.push(`<path d="M60,95L70,85L80,95z" fill="#6b5330"/>`);
    parts.push(`<rect x="90" y="90" width="18" height="31" fill="#c8b088"/>`);
    // トラム(手前)
    parts.push(`<rect x="180" y="185" width="60" height="18" rx="3" fill="#5f7f4a"/>`);
    parts.push(`<rect x="186" y="189" width="10" height="8" fill="#cfe4f0"/>`);
    parts.push(`<rect x="202" y="189" width="10" height="8" fill="#cfe4f0"/>`);
    parts.push(`<circle cx="192" cy="205" r="3" fill="#2a2a30"/>`);
    parts.push(`<circle cx="228" cy="205" r="3" fill="#2a2a30"/>`);
    return parts.join("");
  })(),

  /** ベルリン: 誰もいない幽霊駅を通過する列車。 */
  ghost_station: (() => {
    const parts = [];
    parts.push(sky("#6b7580", "#9aa6ac", 60));
    parts.push(ground(60, "#4a4a52"));
    parts.push(band(150, 60, "#2a2a30"));
    // 地下駅のタイル壁
    for (let x = 0; x < 400; x += 30) parts.push(`<rect x="${x}" y="70" width="26" height="60" fill="#5c6a72" opacity=".5"/>`);
    // 封印されて通過するだけの列車
    parts.push(`<rect x="20" y="150" width="360" height="24" rx="2" fill="#4a4a52"/>`);
    for (let i = 0; i < 9; i++) parts.push(`<rect x="${28 + i * 40}" y="155" width="16" height="10" fill="#2a2a30" opacity=".7"/>`);
    parts.push(`<rect x="0" y="172" width="400" height="3" fill="#8b8f98"/>`);
    // 誰もいないホームに立つ衛兵の見張り灯
    parts.push(lightDot(60, 100, 5, "#f5b31c"));
    parts.push(lightDot(340, 100, 5, "#f5b31c"));
    parts.push(`<rect x="55" y="105" width="10" height="30" fill="#2a2a30"/>`);
    parts.push(`<rect x="335" y="105" width="10" height="30" fill="#2a2a30"/>`);
    // ホームの立入禁止線
    parts.push(`<path d="M20,182L380,182" stroke="#f5b31c" stroke-width="2" stroke-dasharray="6,4"/>`);
    return parts.join("");
  })(),

  /** ベリンツォーナ: 三つの城とゴッタルドの坑口。 */
  castle_toll: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 100));
    parts.push(mountainPeak(340, 100, 55, "#8b8f98"));
    parts.push(cloud(90, 30, 1));
    parts.push(ground(100, "#7a8f6a"));
    // 三つの城
    parts.push(`<rect x="40" y="70" width="24" height="30" fill="#a8905f"/>`);
    parts.push(`<rect x="36" y="64" width="6" height="10" fill="#8b7040"/>`);
    parts.push(`<rect x="60" y="64" width="6" height="10" fill="#8b7040"/>`);
    parts.push(`<rect x="130" y="55" width="20" height="45" fill="#9a8050"/>`);
    parts.push(`<rect x="126" y="49" width="5" height="9" fill="#8b7040"/>`);
    parts.push(`<rect x="145" y="49" width="5" height="9" fill="#8b7040"/>`);
    parts.push(`<rect x="200" y="45" width="16" height="55" fill="#8a7550"/>`);
    parts.push(`<rect x="197" y="40" width="4" height="8" fill="#8b7040"/>`);
    parts.push(`<rect x="209" y="40" width="4" height="8" fill="#8b7040"/>`);
    parts.push(band(150, 60, "#5c6a72"));
    // 山を貫くトンネル坑口
    parts.push(`<ellipse cx="300" cy="175" rx="35" ry="24" fill="#141416"/>`);
    parts.push(`<rect x="270" y="170" width="60" height="6" fill="#8b8f98"/>`);
    // かつて税を課したラバの隊列(小さく)
    for (let i = 0; i < 3; i++) parts.push(`<circle cx="${50 + i * 12}" cy="190" r="3" fill="#6b5330"/>`);
    return parts.join("");
  })(),

  /** ウィーン: 帝国の駅と名を変えるドナウ川。 */
  imperial_terminus: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 90));
    parts.push(cloud(320, 30, 1));
    parts.push(`<rect x="50" y="60" width="300" height="30" fill="#c8b088"/>`);
    for (let i = 0; i < 7; i++) parts.push(`<rect x="${60 + i * 40}" y="66" width="20" height="18" fill="#3a6bc0" opacity=".5"/>`);
    parts.push(`<path d="M180,60L200,40L220,60z" fill="#8b7040"/>`);
    parts.push(ground(90, "#5c6a72"));
    // ドナウ川と艀
    parts.push(band(150, 60, "#1c3a5c"));
    parts.push(waves(165, "#254a70", 3, 8));
    parts.push(boat(120, 185, 1.1, "#7a7a80", "#f5b31c"));
    parts.push(boat(300, 178, 0.9, "#8b8f98", "#5b8fe8"));
    // 各国の色を示す小さな旗(名を変える川の比喩、文字は使わない)
    for (let i = 0; i < 4; i++) {
      const colors = ["#e8443f", "#f5b31c", "#5b8fe8", "#8fae63"];
      parts.push(`<path d="M${40 + i * 8},150L${40 + i * 8},140L${48 + i * 8},144z" fill="${colors[i]}"/>`);
    }
    return parts.join("");
  })(),

  /** インスブルック: 建設中のベーストンネルとブレンナー峠。 */
  base_tunnel_site: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 110));
    parts.push(mountainPeak(80, 110, 65, "#8b8f98"), mountainPeak(320, 110, 58, "#7a8790"));
    parts.push(cloud(200, 30, 1));
    parts.push(ground(110, "#7a8f6a"));
    parts.push(band(160, 50, "#5c6a72"));
    // 峠道(ジグザグ)
    parts.push(`<path d="M60,110L90,130L70,150L100,165" stroke="#c8b088" stroke-width="4" fill="none"/>`);
    // ベーストンネルの建設現場
    parts.push(`<ellipse cx="240" cy="185" rx="40" ry="20" fill="#141416"/>`);
    parts.push(`<rect x="205" y="180" width="70" height="6" fill="#8b8f98"/>`);
    parts.push(`<rect x="290" y="160" width="10" height="30" fill="#f5b31c"/>`);
    parts.push(`<path d="M280,160L310,160L305,150L285,150z" fill="#5c6a72"/>`);
    // 掘削の土砂運搬車
    for (let i = 0; i < 3; i++) parts.push(`<rect x="${30 + i * 20}" y="195" width="16" height="8" fill="#6b5330"/>`);
    return parts.join("");
  })(),

  /** クラクフ: 織物会館と旧市街広場。 */
  oldtown_square: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 100));
    parts.push(cloud(320, 30, 1));
    // 城のシルエット(遠景、一般化した形)
    parts.push(`<rect x="30" y="70" width="60" height="30" fill="#a8905f"/>`);
    parts.push(`<rect x="35" y="60" width="10" height="14" fill="#8b7040"/>`);
    parts.push(`<rect x="70" y="55" width="12" height="19" fill="#8b7040"/>`);
    parts.push(ground(100, "#c8b89a"));
    // 織物会館(アーケード)
    parts.push(`<rect x="120" y="110" width="220" height="50" fill="#c8a35a"/>`);
    for (let i = 0; i < 8; i++) parts.push(`<path d="M${130 + i * 27},160a5,10 0 0,1 10,0z" fill="#8b6a1a"/>`);
    parts.push(`<path d="M120,110L230,80L340,110z" fill="#6b5330"/>`);
    parts.push(band(160, 50, "#c8b89a"));
    // 露店(琥珀)
    for (let i = 0; i < 4; i++) {
      const x = 20 + i * 20;
      parts.push(`<rect x="${x}" y="185" width="14" height="12" fill="#6b5330"/>`);
      parts.push(`<circle cx="${x + 7}" cy="182" r="2.4" fill="#f4c430"/>`);
    }
    return parts.join("");
  })(),

  /** グダニスク: 琥珀の浜辺と自由都市時代の港。 */
  baltic_port: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 110));
    parts.push(cloud(80, 30, 1));
    parts.push(ground(110, "#1c3a5c"));
    parts.push(waves(135, "#254a70", 2, 9));
    // 港のクレーン(旧式の木造クレーン、グダニスクの名物)
    parts.push(`<rect x="60" y="90" width="30" height="60" fill="#6b5330"/>`);
    parts.push(`<path d="M60,100L30,120L40,125L60,110z" fill="#8b6a3a"/>`);
    parts.push(`<rect x="66" y="95" width="18" height="14" fill="#a8905f"/>`);
    // 穀物倉庫の並び
    for (let i = 0; i < 3; i++) parts.push(`<rect x="${120 + i * 30}" y="100" width="24" height="50" fill="#c8b088"/>`);
    parts.push(boat(280, 170, 1.1, "#8b8f98", "#e8443f"));
    // 浜辺の琥珀の粒
    parts.push(band(170, 40, "#d8c8a0"));
    for (let i = 0; i < 6; i++) parts.push(`<circle cx="${30 + i * 15}" cy="${185 + (i % 2) * 8}" r="2.4" fill="#f4c430"/>`);
    return parts.join("");
  })(),

  /** プラハ: 放射状の路線とヴルタヴァ川。 */
  radial_rails: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 110));
    parts.push(cloud(320, 30, 1));
    parts.push(`<path d="M100,90L100,50Q140,20 180,50L180,90z" fill="#f6efe2" opacity=".4"/>`);
    parts.push(`<rect x="60" y="90" width="160" height="20" fill="#8b8f98"/>`);
    parts.push(`<circle cx="140" cy="60" r="6" fill="#f4c430"/>`);
    parts.push(ground(110, "#5c6a72"));
    // 放射状の線路
    parts.push(`<path d="M140,150L20,200M140,150L80,205M140,150L200,205M140,150L260,200" stroke="#f5b31c" stroke-width="1.6" opacity=".7"/>`);
    // ヴルタヴァ川岸のビアガーデン
    parts.push(band(160, 50, "#1c3a5c"));
    parts.push(waves(170, "#254a70", 2, 8));
    parts.push(`<rect x="280" y="160" width="90" height="10" fill="#8b8f98"/>`);
    for (let i = 0; i < 4; i++) {
      parts.push(`<rect x="${290 + i * 18}" y="150" width="12" height="10" fill="#f5b31c" opacity=".8"/>`);
    }
    return parts.join("");
  })(),

  /** ブラチスラヴァ: モラヴァ川を挟む双子の首都。 */
  morava_border: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 110));
    parts.push(cloud(90, 30, 1), cloud(320, 40, 0.9));
    // 左岸(ブラチスラヴァ)と右岸(ウィーン方面)のスカイライン
    parts.push(`<rect x="20" y="90" width="16" height="20" fill="#8b8f98"/>`);
    parts.push(`<rect x="40" y="80" width="14" height="30" fill="#7a7a80"/>`);
    parts.push(`<path d="M40,80L47,68L54,80z" fill="#5c6a72"/>`);
    parts.push(`<rect x="330" y="88" width="16" height="22" fill="#8b8f98"/>`);
    parts.push(`<rect x="350" y="78" width="14" height="32" fill="#7a7a80"/>`);
    parts.push(ground(110, "#7a8f6a"));
    // 国境の川
    parts.push(band(150, 60, "#1c3a5c"));
    parts.push(waves(165, "#254a70", 2, 8));
    // 通勤電車が渡る
    parts.push(`<rect x="120" y="155" width="160" height="18" rx="2" fill="#5b8fe8"/>`);
    for (let i = 0; i < 6; i++) parts.push(`<rect x="${128 + i * 24}" y="159" width="10" height="8" fill="#cfe4f0"/>`);
    parts.push(`<circle cx="135" cy="177" r="3" fill="#2a2a30"/>`);
    parts.push(`<circle cx="265" cy="177" r="3" fill="#2a2a30"/>`);
    return parts.join("");
  })(),

  /** ブダペスト: 西駅の鉄骨と地下鉄の千年祭。 */
  millennium_metro: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 90));
    parts.push(cloud(320, 30, 1));
    // 西駅の鉄とガラス
    parts.push(`<path d="M50,90L50,50Q150,10 250,50L250,90z" fill="#f6efe2" opacity=".35"/>`);
    parts.push(`<path d="M50,90L50,50Q150,10 250,50L250,90" fill="none" stroke="#4a4a52" stroke-width="1.6"/>`);
    parts.push(`<path d="M150,10L150,90M100,25L100,90M200,25L200,90" stroke="#4a4a52" stroke-width="1"/>`);
    parts.push(ground(90, "#5c6a72"));
    // ドナウ川
    parts.push(band(150, 30, "#1c3a5c"));
    parts.push(waves(158, "#254a70", 1, 8));
    // 地下鉄の入口(M1)
    parts.push(band(180, 30, "#4a4a52"));
    parts.push(`<path d="M300,180L360,180L355,160L305,160z" fill="#f5b31c"/>`);
    parts.push(`<rect x="315" y="185" width="30" height="20" fill="#2a2a30"/>`);
    parts.push(`<circle cx="330" cy="195" r="4" fill="#f6efe2"/>`);
    // 川辺のボート、鳩
    parts.push(boat(70, 165, 0.9, "#8b8f98", "#e8443f"));
    parts.push(`<ellipse cx="240" cy="200" rx="5" ry="3" fill="#8b8f98"/>`);
    parts.push(`<ellipse cx="260" cy="203" rx="5" ry="3" fill="#8b8f98"/>`);
    // 駅前の街灯
    parts.push(lightDot(40, 96, 4));
    parts.push(lightDot(230, 96, 4));
    return parts.join("");
  })(),

  /** リュブリャナ: 鍾乳洞鉄道とアルプス・バルカンの分岐駅。 */
  alpine_junction: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 100));
    parts.push(mountainPeak(70, 100, 50, "#8b8f98"), mountainPeak(330, 100, 40, "#7a8f6a", false));
    parts.push(cloud(200, 30, 1));
    parts.push(ground(100, "#7a8f6a"));
    // 洞窟の入口と観光列車
    parts.push(`<path d="M20,190a30,40 0 0,1 60,0z" fill="#141416"/>`);
    parts.push(`<rect x="35" y="175" width="30" height="14" rx="2" fill="#e8443f"/>`);
    parts.push(`<circle cx="42" cy="190" r="3" fill="#2a2a30"/>`);
    parts.push(`<circle cx="58" cy="190" r="3" fill="#2a2a30"/>`);
    // 地下に消える川
    parts.push(`<path d="M100,110Q120,150 90,190" stroke="#3a6bc0" stroke-width="4" fill="none"/>`);
    // 分岐駅の信号所
    parts.push(`<rect x="220" y="150" width="30" height="30" fill="#8b8f98"/>`);
    parts.push(`<rect x="215" y="145" width="40" height="8" fill="#5c6a72"/>`);
    parts.push(`<path d="M150,180L400,180M150,180L380,160M150,180L380,200" stroke="#f5b31c" stroke-width="1.4" opacity=".7"/>`);
    return parts.join("");
  })(),

  /** リエカ: 旗が幾度も変わった港。 */
  changing_port: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 100));
    parts.push(cloud(320, 30, 1));
    parts.push(ground(100, "#7a8f6a"));
    parts.push(band(150, 60, "#1c3a5c"));
    parts.push(waves(165, "#254a70", 2, 8));
    // コルプス・セパラトゥムの港湾事務所
    parts.push(`<rect x="40" y="110" width="60" height="40" fill="#c8b088"/>`);
    parts.push(`<path d="M40,110L70,90L100,110z" fill="#8b7040"/>`);
    // 何度も変わった旗(積み重なるポール)
    for (let i = 0; i < 4; i++) {
      const colors = ["#e8443f", "#5b8fe8", "#f5b31c", "#8fae63"];
      parts.push(`<rect x="${150 + i * 12}" y="90" width="2" height="40" fill="#4a4a52"/>`);
      parts.push(`<path d="M${152 + i * 12},92L${164 + i * 12},96L${152 + i * 12},100z" fill="${colors[i]}"/>`);
    }
    parts.push(boat(300, 170, 1.1, "#8b8f98", "#e8443f"));
    parts.push(boat(340, 178, 0.7, "#7a7a80", "#5b8fe8"));
    return parts.join("");
  })(),

  /** モクラ・ゴラ: 8の字にループする狭軌線。 */
  narrow_gauge_shed: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 100));
    parts.push(mountainPeak(60, 100, 60, "#5f7f4a", false), mountainPeak(340, 100, 50, "#6f8a5c", false));
    parts.push(cloud(200, 30, 1));
    parts.push(ground(100, "#5f7f4a"));
    // 8の字ループの高架橋
    parts.push(`<path d="M120,190a30,20 0 1,1 -0.1,0zM120,150a30,20 0 1,1 -0.1,0z" fill="none" stroke="#8b8f98" stroke-width="3"/>`);
    for (let i = 0; i < 6; i++) {
      const x = 90 + i * 10;
      parts.push(`<rect x="${x}" y="195" width="4" height="14" fill="#6b5330"/>`);
    }
    // 狭軌機関庫
    parts.push(`<rect x="250" y="150" width="90" height="40" fill="#6b5330"/>`);
    parts.push(`<path d="M250,150L295,125L340,150z" fill="#4a3a2a"/>`);
    parts.push(`<rect x="270" y="165" width="20" height="25" fill="#2a2a30"/>`);
    parts.push(`<circle cx="278" cy="195" r="3" fill="#4a4a52"/>`);
    return parts.join("");
  })(),

  /** サラエヴォ: ラテン橋のたもとと再建された路面電車車庫。 */
  rebuilt_tram_depot: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 100));
    parts.push(mountainPeak(50, 100, 40, "#7a8f6a", false), mountainPeak(350, 100, 45, "#87957a", false));
    parts.push(cloud(200, 30, 1));
    parts.push(ground(100, "#c8b89a"));
    // 川と橋
    parts.push(band(150, 30, "#1c3a5c"));
    parts.push(`<path d="M100,150L100,120L140,120L140,150" stroke="#8b8f98" stroke-width="3" fill="none"/>`);
    parts.push(`<path d="M60,150L180,150" stroke="#a8905f" stroke-width="6"/>`);
    // 再建された路面電車車庫
    parts.push(band(180, 30, "#5c6a72"));
    parts.push(`<rect x="230" y="150" width="120" height="35" fill="#c8b088"/>`);
    parts.push(`<rect x="245" y="160" width="25" height="25" fill="#2a2a30"/>`);
    parts.push(`<rect x="280" y="160" width="25" height="25" fill="#2a2a30"/>`);
    parts.push(`<rect x="240" y="185" width="70" height="16" rx="2" fill="#5f7f4a"/>`);
    parts.push(`<circle cx="250" cy="203" r="3" fill="#2a2a30"/>`);
    parts.push(`<circle cx="295" cy="203" r="3" fill="#2a2a30"/>`);
    return parts.join("");
  })(),

  /** バール: 254のトンネルを抜ける高架橋とアドリア海の終着港。 */
  adriatic_terminus: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 100));
    parts.push(mountainPeak(90, 100, 55, "#8b8f98"));
    parts.push(cloud(300, 30, 1));
    parts.push(ground(100, "#7a8f6a"));
    // 高い高架橋
    parts.push(`<path d="M60,190L60,110L80,110L80,190M110,190L110,90L130,90L130,190M160,190L160,110L180,110L180,190" fill="#8b8f98"/>`);
    parts.push(`<path d="M60,110L180,100" stroke="#5c6a72" stroke-width="2"/>`);
    // アドリア海と終着港
    parts.push(band(160, 50, "#1c3a5c"));
    parts.push(waves(172, "#254a70", 2, 8));
    parts.push(`<rect x="260" y="160" width="100" height="10" fill="#5c6a72"/>`);
    parts.push(boat(310, 155, 0.9, "#8b8f98", "#e8443f"));
    return parts.join("");
  })(),

  /** ルセ: ドナウ川のフェリー中継から友好橋へ。 */
  friendship_bridge: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 100));
    parts.push(cloud(80, 30, 1));
    parts.push(ground(100, "#c8b89a"));
    parts.push(band(150, 60, "#1c3a5c"));
    parts.push(waves(165, "#254a70", 2, 8));
    // 友好橋(道路+鉄道)
    parts.push(`<path d="M20,150Q200,110 380,150" stroke="#8b8f98" stroke-width="8" fill="none"/>`);
    for (let i = 0; i < 6; i++) parts.push(`<rect x="${40 + i * 60}" y="148" width="4" height="30" fill="#5c6a72"/>`);
    // 廃止された旧フェリー乗り場
    parts.push(`<rect x="40" y="180" width="40" height="6" fill="#6b5330" opacity=".7"/>`);
    parts.push(`<rect x="30" y="170" width="14" height="16" fill="#4a3a2a" opacity=".6"/>`);
    // 料金所
    parts.push(`<rect x="300" y="185" width="20" height="14" fill="#f5b31c"/>`);
    return parts.join("");
  })(),

  /** ジュルジュ: 1883年当時の線路の終点とドナウの鉄橋。 */
  danube_railbridge: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 100));
    parts.push(cloud(320, 30, 1));
    parts.push(ground(100, "#c8b89a"));
    parts.push(band(150, 60, "#1c3a5c"));
    parts.push(waves(165, "#254a70", 2, 8));
    // 橋(対岸のルセと同じ橋を逆側から)
    parts.push(`<path d="M20,150Q200,110 380,150" stroke="#8b8f98" stroke-width="8" fill="none"/>`);
    for (let i = 0; i < 6; i++) parts.push(`<rect x="${40 + i * 60}" y="148" width="4" height="30" fill="#5c6a72"/>`);
    // 穀物サイロ
    for (let i = 0; i < 3; i++) parts.push(`<rect x="${40 + i * 22}" y="120" width="18" height="30" rx="3" fill="#c8b088"/>`);
    // 旧フェリー埠頭の倉庫
    parts.push(`<rect x="300" y="170" width="50" height="24" fill="#6b5330"/>`);
    parts.push(`<path d="M300,170L325,158L350,170z" fill="#4a3a2a"/>`);
    return parts.join("");
  })(),

  /** テッサロニキ: 白い塔とラディノ語の市場。 */
  seafront_tower: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 100));
    parts.push(cloud(300, 30, 1));
    parts.push(ground(100, "#c8b89a"));
    parts.push(band(150, 60, "#1c3a5c"));
    parts.push(waves(165, "#254a70", 2, 8));
    // 白い塔
    parts.push(`<rect x="60" y="90" width="30" height="60" rx="4" fill="#f6efe2"/>`);
    parts.push(`<circle cx="75" cy="86" r="6" fill="#f6efe2"/>`);
    parts.push(`<rect x="66" y="105" width="6" height="8" fill="#8b8f98" opacity=".5"/>`);
    parts.push(`<rect x="78" y="105" width="6" height="8" fill="#8b8f98" opacity=".5"/>`);
    // 市場の露店
    for (let i = 0; i < 4; i++) {
      const x = 180 + i * 40;
      parts.push(`<rect x="${x}" y="160" width="30" height="14" fill="#6b5330"/>`);
      parts.push(`<path d="M${x - 2},160L${x + 32},160L${x + 28},150L${x + 2},150z" fill="#e8443f" opacity=".8"/>`);
    }
    return parts.join("");
  })(),

  /** タリン: ギルドの城壁とレイル・バルティカの建設現場。 */
  rail_baltica_site: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 120));
    parts.push(cloud(320, 30, 1));
    // 旧市街の市壁と塔
    parts.push(`<rect x="20" y="100" width="140" height="20" fill="#8b8f98"/>`);
    for (let i = 0; i < 5; i++) parts.push(`<rect x="${20 + i * 28}" y="92" width="10" height="10" fill="#8b8f98"/>`);
    parts.push(`<rect x="60" y="70" width="18" height="45" fill="#6b6b70"/>`);
    parts.push(`<path d="M60,70L69,58L78,70z" fill="#4a4a52"/>`);
    parts.push(ground(120, "#c8b89a"));
    parts.push(band(160, 50, "#5c6a72"));
    // 新線の建設現場(クレーンと線路)
    parts.push(`<rect x="280" y="150" width="6" height="50" fill="#f5b31c"/>`);
    parts.push(`<path d="M283,150L340,150" stroke="#f5b31c" stroke-width="3"/>`);
    parts.push(`<rect x="240" y="185" width="140" height="4" fill="#2a2a30"/>`);
    parts.push(`<rect x="250" y="192" width="16" height="8" fill="#8b8f98"/>`);
    parts.push(`<rect x="280" y="192" width="16" height="8" fill="#8b8f98"/>`);
    return parts.join("");
  })(),

  /** リガ: ツェッペリン格納庫の市場とアール・ヌーヴォー街区。 */
  zeppelin_market: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 120));
    parts.push(cloud(320, 30, 1));
    // アール・ヌーヴォーの装飾建築(手前でなく左に)
    parts.push(`<rect x="30" y="80" width="60" height="40" fill="#c8a35a"/>`);
    parts.push(`<path d="M60,80a15,15 0 0,1 15,15L45,95a15,15 0 0,1 15,-15z" fill="#8b6a1a"/>`);
    parts.push(ground(120, "#c8b89a"));
    // ツェッペリン格納庫(半円アーチ×3、市場)
    for (let i = 0; i < 3; i++) {
      const x = 150 + i * 80;
      parts.push(`<path d="M${x},190L${x},150Q${x + 40},110 ${x + 80},150L${x + 80},190z" fill="#8b8f98" opacity=".9"/>`);
      parts.push(`<rect x="${x + 10}" y="175" width="60" height="12" fill="#6b5330"/>`);
      parts.push(`<circle cx="${x + 20}" cy="181" r="2" fill="#8fae63"/>`);
      parts.push(`<circle cx="${x + 40}" cy="181" r="2" fill="#e8443f"/>`);
      parts.push(`<circle cx="${x + 60}" cy="181" r="2" fill="#f4c430"/>`);
    }
    parts.push(cloud(90, 20, 0.8));
    // アール・ヌーヴォー建築の窓の飾り
    parts.push(`<circle cx="60" cy="100" r="7" fill="#3a6bc0"/>`);
    parts.push(`<rect x="35" y="112" width="10" height="8" fill="#3a6bc0" opacity=".7"/>`);
    parts.push(`<rect x="75" y="112" width="10" height="8" fill="#3a6bc0" opacity=".7"/>`);
    // 手前の通り
    parts.push(`<rect x="0" y="195" width="400" height="4" fill="#8b8f98" opacity=".6"/>`);
    parts.push(`<circle cx="110" cy="198" r="2" fill="#5c6a72"/>`);
    parts.push(`<circle cx="260" cy="198" r="2" fill="#5c6a72"/>`);
    return parts.join("");
  })(),

  /** ヴィリニュス: スヴァウキ・ギャップの国境哨所。 */
  soviet_gauge_siding: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 110));
    parts.push(cloud(90, 30, 1));
    parts.push(ground(110, "#7a8f6a"));
    // 森
    for (let i = 0; i < 5; i++) {
      const x = 20 + i * 30;
      parts.push(`<path d="M${x},120l-8,14h16z" fill="#2f6b3a"/>`);
      parts.push(`<rect x="${x - 1.5}" y="130" width="3" height="10" fill="#4a3a2a"/>`);
    }
    parts.push(band(150, 60, "#5c6a72"));
    // 国境哨所
    parts.push(`<rect x="200" y="140" width="24" height="30" fill="#8b8f98"/>`);
    parts.push(`<path d="M195,140L229,140L212,125z" fill="#5c6a72"/>`);
    // ソ連軌間の貨物側線
    parts.push(`<rect x="20" y="185" width="200" height="4" fill="#2a2a30"/>`);
    for (let i = 0; i < 5; i++) parts.push(`<rect x="${40 + i * 40}" y="180" width="20" height="10" fill="#5c4a3a"/>`);
    parts.push(fenceRow(260, 175, 5, 20));
    return parts.join("");
  })(),

  /** リヴィウ: 1904年建築の壮麗な駅と軌間積み替え小屋。 */
  transfer_shed: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 100));
    parts.push(cloud(320, 30, 1));
    parts.push(`<rect x="50" y="70" width="220" height="30" fill="#c8b088"/>`);
    parts.push(`<path d="M50,70Q160,20 270,70z" fill="#a8905f"/>`);
    parts.push(`<circle cx="160" cy="55" r="8" fill="#f4c430"/>`);
    for (let i = 0; i < 5; i++) parts.push(`<rect x="${65 + i * 40}" y="76" width="20" height="18" fill="#3a6bc0" opacity=".5"/>`);
    parts.push(ground(100, "#5c6a72"));
    parts.push(band(150, 60, "#4a4a52"));
    // 積み替え小屋
    parts.push(`<rect x="300" y="150" width="80" height="35" fill="#6b5330"/>`);
    parts.push(`<path d="M300,150L340,130L380,150z" fill="#4a3a2a"/>`);
    parts.push(`<rect x="315" y="165" width="16" height="20" fill="#2a2a30"/>`);
    parts.push(`<rect x="345" y="165" width="16" height="20" fill="#2a2a30"/>`);
    return parts.join("");
  })(),

  /** カリーニングラード: 再建されたソ連時代の街並みと通過列車。 */
  rebuilt_city_blocks: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 130));
    parts.push(cloud(320, 30, 1));
    // ソ連様式の集合住宅
    for (let i = 0; i < 5; i++) {
      const x = 30 + i * 65;
      parts.push(`<rect x="${x}" y="80" width="50" height="50" fill="#8b8f98"/>`);
      for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) {
        parts.push(`<rect x="${x + 6 + c * 14}" y="${86 + r * 11}" width="8" height="7" fill="#cfe4f0" opacity=".5"/>`);
      }
    }
    parts.push(ground(130, "#5c6a72"));
    parts.push(band(160, 50, "#4a4a52"));
    // 広軌の通過列車
    parts.push(`<rect x="30" y="170" width="200" height="20" rx="2" fill="#7a7a80"/>`);
    for (let i = 0; i < 5; i++) parts.push(`<rect x="${38 + i * 38}" y="175" width="16" height="9" fill="#cfe4f0" opacity=".7"/>`);
    parts.push(`<circle cx="45" cy="192" r="4" fill="#2a2a30"/>`);
    parts.push(`<circle cx="210" cy="192" r="4" fill="#2a2a30"/>`);
    return parts.join("");
  })(),

  /** キーウ: 深い地下鉄と避難列車の発車案内。 */
  evacuation_platform: (() => {
    const parts = [];
    parts.push(sky("#6b7580", "#9aa6ac", 60));
    parts.push(ground(60, "#4a4a52"));
    parts.push(band(150, 60, "#2a2a30"));
    // 深い地下鉄の坑道(縦のシャフト)
    parts.push(`<path d="M170,0L170,60M230,0L230,60" stroke="#5c6a72" stroke-width="3" stroke-dasharray="4,4"/>`);
    for (let i = 0; i < 6; i++) parts.push(`<rect x="0" y="${10 + i * 15}" width="400" height="2" fill="#3a3a40" opacity=".5"/>`);
    // 避難列車
    parts.push(`<rect x="30" y="150" width="340" height="22" rx="2" fill="#5b8fe8"/>`);
    for (let i = 0; i < 8; i++) parts.push(`<rect x="${38 + i * 40}" y="155" width="16" height="10" fill="#cfe4f0"/>`);
    parts.push(`<circle cx="45" cy="174" r="4" fill="#2a2a30"/>`);
    parts.push(`<circle cx="355" cy="174" r="4" fill="#2a2a30"/>`);
    // 発車案内板(枠のみ)
    parts.push(`<rect x="150" y="80" width="100" height="40" rx="2" fill="#2a2a30"/>`);
    parts.push(`<rect x="158" y="88" width="84" height="6" fill="#f5b31c" opacity=".7"/>`);
    parts.push(`<rect x="158" y="98" width="84" height="6" fill="#f5b31c" opacity=".5"/>`);
    parts.push(`<rect x="158" y="108" width="84" height="6" fill="#f5b31c" opacity=".3"/>`);
    // 待つ人々のシルエット(手前、控えめに)
    for (let i = 0; i < 4; i++) {
      const x = 60 + i * 16;
      parts.push(`<circle cx="${x}" cy="184" r="3" fill="#f6efe2" opacity=".8"/>`);
      parts.push(`<rect x="${x - 2.5}" y="187" width="5" height="10" fill="#5c6a72" opacity=".8"/>`);
    }
    return parts.join("");
  })(),

  /** モナコ: 地下駅と宮殿を望むホーム。 */
  underground_platform: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 70));
    // 宮殿(丘の上)
    parts.push(`<rect x="150" y="30" width="100" height="30" fill="#f6efe2"/>`);
    parts.push(`<rect x="160" y="20" width="10" height="14" fill="#e8443f"/>`);
    parts.push(`<rect x="230" y="20" width="10" height="14" fill="#e8443f"/>`);
    parts.push(ground(70, "#93ad68"));
    parts.push(band(150, 60, "#5c6a72"));
    // 地下駅のホーム
    parts.push(`<rect x="20" y="150" width="360" height="30" fill="#3a3a40"/>`);
    for (let i = 0; i < 4; i++) parts.push(lightDot(60 + i * 100, 155, 5));
    // カジノへの出口(黄金の輝き)
    parts.push(`<rect x="320" y="130" width="40" height="50" fill="#f4c430" opacity=".85"/>`);
    parts.push(`<circle cx="340" cy="150" r="10" fill="#f6efe2" opacity=".6"/>`);
    parts.push(cloud(80, 30, 0.9), cloud(300, 20, 0.8));
    // 宮殿の窓と旗
    for (let i = 0; i < 5; i++) parts.push(`<rect x="${158 + i * 18}" y="36" width="8" height="10" fill="#3a6bc0" opacity=".6"/>`);
    parts.push(`<rect x="198" y="12" width="2" height="10" fill="#4a4a52"/>`);
    parts.push(`<path d="M200,12L212,15L200,18z" fill="#e8443f"/>`);
    // 地下駅の柱
    for (let i = 0; i < 6; i++) parts.push(`<rect x="${30 + i * 60}" y="150" width="6" height="30" fill="#2a2a30"/>`);
    // 停まった車両の縁
    parts.push(`<rect x="20" y="176" width="200" height="3" fill="#8b8f98"/>`);
    parts.push(`<circle cx="40" cy="195" r="3" fill="#2a2a30"/>`);
    parts.push(`<circle cx="200" cy="195" r="3" fill="#2a2a30"/>`);
    return parts.join("");
  })(),

  /** ヴァレッタ: グランドハーバーと廃線になった鉄道。 */
  grand_harbour: (() => {
    const parts = [];
    parts.push(sky("#a9d4e8", "#dcecf2", 100));
    parts.push(cloud(300, 30, 1));
    // 稜堡(城塞都市の壁)
    parts.push(`<path d="M30,100L30,70L70,70L70,55L110,55L110,100z" fill="#d8c8a0"/>`);
    parts.push(ground(100, "#c8b89a"));
    parts.push(band(150, 60, "#1c3a5c"));
    parts.push(waves(165, "#254a70", 2, 8));
    parts.push(boat(280, 175, 1, "#8b8f98", "#5b8fe8"));
    parts.push(boat(330, 165, 0.7, "#7a7a80", "#f5b31c"));
    // 廃駅の跡
    parts.push(`<rect x="60" y="185" width="60" height="4" fill="#5c6a72" opacity=".6"/>`);
    parts.push(`<path d="M60,185L120,185" stroke="#8fae63" stroke-width="2"/>`);
    parts.push(`<rect x="70" y="165" width="30" height="20" fill="#c8b89a" opacity=".7"/>`);
    return parts.join("");
  })(),

  /** スコピエ: 地震の瞬間で止まった時計と再建された街。 */
  rebuilt_skyline: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 130));
    parts.push(cloud(320, 30, 1));
    // 再建されたモダニズムの街並み
    for (let i = 0; i < 4; i++) {
      const x = 150 + i * 55;
      parts.push(`<rect x="${x}" y="${70 + (i % 2) * 15}" width="40" height="${60 - (i % 2) * 15}" fill="#8b8f98"/>`);
      for (let r = 0; r < 3; r++) for (let c = 0; c < 2; c++) {
        parts.push(`<rect x="${x + 6 + c * 18}" y="${76 + (i % 2) * 15 + r * 14}" width="10" height="8" fill="#cfe4f0" opacity=".5"/>`);
      }
    }
    parts.push(ground(130, "#c8b89a"));
    parts.push(band(160, 50, "#5c6a72"));
    // 止まった時計の記念碑
    parts.push(`<rect x="40" y="150" width="6" height="40" fill="#4a4a52"/>`);
    parts.push(`<circle cx="43" cy="145" r="14" fill="#f6efe2" stroke="#2a2a30" stroke-width="1.4"/>`);
    parts.push(`<path d="M43,145L43,136M43,145L50,148" stroke="#e8443f" stroke-width="1.6"/>`);
    parts.push(`<rect x="30" y="190" width="26" height="4" fill="#5c6a72"/>`);
    // 70か国からの支援を示す小さな旗の列(手前)
    for (let i = 0; i < 5; i++) {
      const colors = ["#e8443f", "#5b8fe8", "#f5b31c", "#8fae63", "#f6efe2"];
      parts.push(`<rect x="${100 + i * 14}" y="192" width="2" height="12" fill="#4a4a52"/>`);
      parts.push(`<path d="M${102 + i * 14},193L${110 + i * 14},196L${102 + i * 14},199z" fill="${colors[i]}"/>`);
    }
    return parts.join("");
  })(),

  /** ドゥラス: ヴィア・エグナティアの里程標と孤立していた鉄道。 */
  isolated_rail: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 100));
    parts.push(cloud(300, 30, 1));
    parts.push(ground(100, "#c8b89a"));
    parts.push(band(150, 60, "#1c3a5c"));
    parts.push(waves(165, "#254a70", 2, 8));
    // ローマ街道の里程標
    parts.push(`<path d="M50,150L50,110Q50,100 60,100Q70,100 70,110L70,150z" fill="#8b8f98"/>`);
    parts.push(`<circle cx="60" cy="118" r="3" fill="#f4c430"/>`);
    // かつて孤立していた鉄道(途切れた線路)
    parts.push(`<rect x="150" y="185" width="90" height="4" fill="#2a2a30"/>`);
    parts.push(`<rect x="250" y="185" width="90" height="4" fill="#2a2a30" opacity=".3"/>`);
    parts.push(boat(310, 170, 0.9, "#8b8f98", "#e8443f"));
    return parts.join("");
  })(),

  /** キシナウ: ウンゲニの積み替え線と再建された駅。 */
  eastward_rails: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 120));
    parts.push(cloud(320, 30, 1));
    parts.push(`<rect x="60" y="90" width="160" height="30" fill="#c8b89a"/>`);
    parts.push(`<path d="M60,90L140,65L220,90z" fill="#a8905f"/>`);
    parts.push(`<rect x="130" y="100" width="20" height="20" fill="#2a2a30"/>`);
    parts.push(ground(120, "#c8b89a"));
    parts.push(band(160, 50, "#5c6a72"));
    // ウンゲニ国境積み替え線
    parts.push(`<rect x="250" y="185" width="130" height="4" fill="#2a2a30"/>`);
    parts.push(`<rect x="260" y="170" width="30" height="15" fill="#8b8f98"/>`);
    parts.push(`<rect x="300" y="170" width="30" height="15" fill="#7a7a80"/>`);
    parts.push(`<path d="M270,170L270,160M320,170L320,160" stroke="#f5b31c" stroke-width="1.6"/>`);
    // 再建された駅舎の窓
    for (let i = 0; i < 3; i++) parts.push(`<rect x="${75 + i * 45}" y="98" width="20" height="16" fill="#3a6bc0" opacity=".5"/>`);
    parts.push(cloud(70, 20, 0.8));
    // 東へ向かう線路の続き(手前)
    parts.push(`<rect x="20" y="193" width="220" height="3" fill="#2a2a30"/>`);
    for (let i = 0; i < 6; i++) parts.push(`<rect x="${28 + i * 34}" y="197" width="20" height="6" fill="#5c4a3a"/>`);
    return parts.join("");
  })(),

  /** ホーリーヘッド: アイリッシュ・メイルの船と鉄道が落ち合う波止場。 */
  boat_train_quay: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 100));
    parts.push(cloud(80, 30, 1));
    parts.push(ground(100, "#c8b89a"));
    parts.push(band(150, 60, "#1c3a5c"));
    parts.push(waves(165, "#254a70", 2, 8));
    // 防波堤(遠景)
    parts.push(`<path d="M0,150L120,150L140,158L360,158" stroke="#8b8f98" stroke-width="6" fill="none"/>`);
    parts.push(`<rect x="350" y="146" width="10" height="14" fill="#f6efe2"/>`);
    parts.push(`<path d="M350,146L355,138L360,146z" fill="#e8443f"/>`);
    // 郵便汽船
    parts.push(`<path d="M50,150L220,150L200,180L70,180z" fill="#8b8f98"/>`);
    parts.push(`<rect x="110" y="120" width="30" height="30" fill="#f6efe2"/>`);
    parts.push(`<rect x="95" y="126" width="10" height="24" fill="#f6efe2"/>`);
    parts.push(`<rect x="100" y="105" width="10" height="24" fill="#4a4a52"/>`);
    parts.push(`<ellipse cx="105" cy="102" rx="7" ry="3" fill="#7a7a80" opacity=".6"/>`);
    // 波止場に停まる連絡列車
    parts.push(`<rect x="230" y="160" width="120" height="20" rx="2" fill="#5b8fe8"/>`);
    for (let i = 0; i < 5; i++) parts.push(`<rect x="${238 + i * 22}" y="165" width="12" height="9" fill="#cfe4f0"/>`);
    parts.push(`<circle cx="245" cy="182" r="4" fill="#2a2a30"/>`);
    parts.push(`<circle cx="335" cy="182" r="4" fill="#2a2a30"/>`);
    // 積み込む郵便袋
    for (let i = 0; i < 3; i++) parts.push(`<ellipse cx="${30 + i * 14}" cy="192" rx="8" ry="6" fill="#a8905f"/>`);
    return parts.join("");
  })(),
};
