/**
 * アジア大陸盤面の都市イラスト(いまは5都市の見本のみ)。
 *
 * `ASIA_MARKS` は24×24の座標系に描くシンボル、`ASIA_BG` は400×210の
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
 *
 * カンチャナブリ(泰緬鉄道)の背景は、橋・川・山の風景にとどめ、
 * 苦難そのものは描かない(厄災の絵の方針「痛みや破壊は描かない」を
 * 通常の都市背景にも準用した)。
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

// ---------------------------------------------------------------------------
// マーク(24×24)
// ---------------------------------------------------------------------------

export const ASIA_MARKS = {
  // イスタンブール: 海峡を渡るトンネル
  strait: `
    <path d="M2,8L10,8L10,20L2,20z" fill="#8fae63"/>
    <path d="M14,8L22,8L22,20L14,20z" fill="#8fae63"/>
    <path d="M2,18Q12,22 22,18" stroke="#1c3a5c" stroke-width="4" fill="none"/>
    <path d="M4,17L20,17" stroke="#5c6a72" stroke-width="1.6" stroke-dasharray="2,1.5"/>
  `,
  // サマルカンド: キャラバンとドーム
  caravan: `
    <path d="M4,20L4,10Q4,6 8,6Q12,6 12,10L12,20z" fill="#c8a35a"/>
    <circle cx="8" cy="4" r="2.4" fill="#3f8fc4"/>
    <path d="M14,20L14,14L20,14L20,20z" fill="#8b7040"/>
    <circle cx="15" cy="12" r="1.6" fill="#f6efe2"/>
    <path d="M2,20L22,20" stroke="#6b5330" stroke-width="1.6"/>
  `,
  // ドスティク: 軌間の履き替え
  gauge: `
    <rect x="3" y="16" width="18" height="2" fill="#5c6a72"/>
    <circle cx="7" cy="18.5" r="2.2" fill="#2a2a30"/>
    <circle cx="17" cy="18.5" r="2.2" fill="#2a2a30"/>
    <rect x="5" y="9" width="14" height="6" rx="1" fill="#8b8f98"/>
    <path d="M6,9L6,4M18,9L18,4" stroke="#f5b31c" stroke-width="2"/>
  `,
  // カンチャナブリ: 鉄橋
  bridge: `
    <path d="M2,18L22,18" stroke="#1c3a5c" stroke-width="3"/>
    <path d="M4,18L4,10L8,14L12,8L16,14L20,10L20,18" stroke="#5c6a72" stroke-width="2" fill="none"/>
    <rect x="3" y="16" width="18" height="2" fill="#4a4a52"/>
  `,
  // ウランバートル: ゲル(ユルト)
  yurt: `
    <path d="M4,20L4,13Q4,7 12,7Q20,7 20,13L20,20z" fill="#f6efe2" stroke="#8b7040" stroke-width="1.4"/>
    <path d="M12,7L12,3" stroke="#6b5330" stroke-width="1.4"/>
    <path d="M6,20L6,13Q6,9 12,9Q18,9 18,13L18,20" stroke="#c8a35a" stroke-width="1" fill="none"/>
    <rect x="10" y="15" width="4" height="5" fill="#6b5330"/>
  `,
  // ベイルート: ラック式(歯軌条)の登坂鉄道
  cograil: `
    <path d="M3,20L21,6" stroke="#5c6a72" stroke-width="2.4" fill="none"/>
    <path d="M6,17l3,-2M9,14l3,-2M12,11l3,-2M15,8l3,-2" stroke="#8b8f98" stroke-width="1.6"/>
    <circle cx="21" cy="6" r="2.4" fill="#8b8f98"/>
  `,
  // アンマン: ヒジャーズ鉄道の給水塔
  hejaz: `
    <rect x="10" y="10" width="4" height="10" fill="#5c6a72"/>
    <rect x="6" y="4" width="12" height="8" fill="#c9a26a"/>
    <path d="M6,4l6,-4l6,4z" fill="#7a4a2a"/>
    <rect x="2" y="20" width="20" height="2" fill="#6b5330"/>
  `,
  // トビリシ: 斜面のケーブルカー
  funicular: `
    <path d="M3,21L20,4" stroke="#5c6a72" stroke-width="2" fill="none"/>
    <rect x="12" y="9" width="7" height="6" rx="1" fill="#5b8fe8" transform="rotate(-45 15.5 12)"/>
    <path d="M20,4a2,2 0 1,1 0.1,0z" fill="#f4c430"/>
  `,
  // バトゥミ: 石油タンク貨車
  oilcar: `
    <rect x="3" y="10" width="18" height="8" rx="4" fill="#7a4a2a"/>
    <circle cx="8" cy="20" r="2.4" fill="#2a2a30"/>
    <circle cx="16" cy="20" r="2.4" fill="#2a2a30"/>
    <rect x="10" y="6" width="4" height="4" fill="#5c6a72"/>
  `,
  // エレバン: アララト山
  mountain: `
    <path d="M2,20L9,8L13,14L16,9L22,20z" fill="#8b8f98"/>
    <path d="M9,8L11,11L7,13z" fill="#f2f6f8"/>
    <path d="M16,9L17.5,11.5L14.5,12.5z" fill="#f2f6f8"/>
  `,
  // ギュムリ: 途切れた線路の車止め
  deadend: `
    <rect x="2" y="17" width="16" height="2" fill="#7a4a3a"/>
    <rect x="4" y="15" width="3" height="4" fill="#5a4a3a"/>
    <rect x="10" y="15" width="3" height="4" fill="#5a4a3a"/>
    <rect x="17" y="9" width="3" height="10" fill="#4a4a52"/>
    <rect x="15" y="7" width="7" height="3" fill="#e8443f"/>
  `,
  // バクー: 木造の掘削やぐら
  derrick: `
    <path d="M12,3L4,20M12,3L20,20M6,15L18,15M8,10L16,10" stroke="#5c6a72" stroke-width="1.6" fill="none"/>
    <rect x="2" y="20" width="20" height="2" fill="#4a4a52"/>
  `,
  // ジェッダ・マナーマ・クウェート・バスラ: ダウ船
  dhow: `
    <path d="M3,17q9,5 18,0l-3,-3l-12,0z" fill="#f6efe2"/>
    <rect x="11.2" y="4" width="1.6" height="13" fill="#6b5330"/>
    <path d="M13,4l8,4l-8,3z" fill="#c9a26a"/>
  `,
  // リヤド・ドバイ・ドーハ・テヘラン: 高層ビルの街並み
  skyline: `
    <rect x="2" y="10" width="5" height="11" fill="#8b8f98"/>
    <rect x="8" y="5" width="5" height="16" fill="#5c6a72"/>
    <rect x="14" y="12" width="4" height="9" fill="#8b8f98"/>
    <rect x="19" y="8" width="3" height="13" fill="#5c6a72"/>
  `,
  // ドバイ: 真珠
  pearl: `
    <circle cx="12" cy="13" r="7" fill="#f6efe2" stroke="#c9a26a" stroke-width="1"/>
    <path d="M9,10q3,-2 6,0" stroke="#e8e2d4" stroke-width="1" fill="none"/>
    <path d="M8,20q4,-6 8,0" stroke="#8b6a1a" stroke-width="1.4" fill="none"/>
  `,
  // マスカット: ポルトガル要塞
  fort: `
    <rect x="4" y="10" width="16" height="11" fill="#e8dcc0"/>
    <path d="M4,10h4v-3h-4zM10,10h4v-3h-4zM16,10h4v-3h-4z" fill="#e8dcc0"/>
    <rect x="9" y="14" width="6" height="7" fill="#7a4a2a"/>
  `,
  // アルマトイ: リンゴ
  apple: `
    <path d="M12,8c-5,0 -7,4 -7,8c0,4 3,6 7,6c4,0 7,-2 7,-6c0,-4 -2,-8 -7,-8z" fill="#c8443f"/>
    <path d="M12,8c0,-2 1,-3 2,-4" stroke="#5a4630" stroke-width="1.4" fill="none"/>
    <path d="M13,5q3,-1 3,2" stroke="#3f8f4f" stroke-width="1.4" fill="none"/>
  `,
  // アスタナ: 新首都のタワー
  capital: `
    <rect x="10" y="10" width="4" height="11" fill="#8b8f98"/>
    <circle cx="12" cy="7" r="4" fill="#f4c430"/>
    <rect x="4" y="18" width="16" height="3" fill="#5c6a72"/>
  `,
  // アシガバット: 白大理石のドーム建築
  marble: `
    <rect x="5" y="12" width="14" height="9" fill="#f2f6f8"/>
    <path d="M5,12a7,6 0 0,1 14,0z" fill="#f6efe2" stroke="#c9a26a" stroke-width="0.6"/>
    <circle cx="12" cy="6" r="1.6" fill="#f4c430"/>
  `,
  // イルクーツク: 凍った湖を渡る列車
  icerail: `
    <rect x="3" y="9" width="14" height="7" rx="2" fill="#5b8fe8"/>
    <circle cx="7" cy="17" r="2" fill="#2a2a30"/>
    <circle cx="13" cy="17" r="2" fill="#2a2a30"/>
    <path d="M2,20q10,-3 20,0" stroke="#bcd6e2" stroke-width="1.6" fill="none"/>
  `,
  // ウラン・ウデ: 路線の分岐点
  junction: `
    <path d="M12,21L12,13L4,4" stroke="#5c6a72" stroke-width="2.4" fill="none"/>
    <path d="M12,13L20,4" stroke="#5c6a72" stroke-width="2.4" fill="none"/>
    <circle cx="12" cy="13" r="2" fill="#f5b31c"/>
  `,
  // ウラジオストク: シベリア鉄道 終点標
  kmzero: `
    <rect x="11" y="6" width="2" height="15" fill="#4a4a52"/>
    <rect x="7" y="3" width="10" height="6" fill="#e8443f"/>
    <rect x="2" y="21" width="20" height="2" fill="#6b5330"/>
  `,
  // ナウシキ: 税関検査
  customs: `
    <rect x="5" y="5" width="14" height="14" rx="1" fill="none" stroke="#5c6a72" stroke-width="1.6"/>
    <path d="M8,12l3,3l6,-7" stroke="#e8443f" stroke-width="2" fill="none"/>
  `,
  // 北京: すべての路線が集まる結節点
  hub: `
    <circle cx="12" cy="12" r="2.6" fill="#f5b31c"/>
    <path d="M12,12L4,4M12,12L20,4M12,12L4,20M12,12L20,20M12,12L22,12" stroke="#5c6a72" stroke-width="1.6"/>
  `,
  // 香港: 国境の検問
  border: `
    <rect x="3" y="8" width="18" height="10" fill="none" stroke="#5c6a72" stroke-width="1.6"/>
    <rect x="10" y="4" width="4" height="17" fill="#e8443f"/>
    <rect x="10" y="4" width="4" height="4" fill="#f6efe2"/>
  `,
  // 釜山: 連絡フェリー
  ferry: `
    <path d="M3,17L21,17L18,21L6,21z" fill="#8b8f98"/>
    <rect x="10.5" y="6" width="3" height="11" fill="#4a4a52"/>
    <path d="M13.5,8l6,3l-6,2z" fill="#e8e2d4"/>
  `,
  // 下関: 海底トンネルの坑口
  tunnel: `
    <path d="M4,21L4,12a8,8 0 0,1 16,0L20,21" fill="none" stroke="#8b8f98" stroke-width="2.4"/>
    <ellipse cx="12" cy="21" rx="8" ry="2" fill="#141416"/>
  `,
  // ラホール: 「妥協」急行の国境ホーム
  friendship: `
    <path d="M2,14h9M13,14h9" stroke="#5c6a72" stroke-width="2.4"/>
    <circle cx="12" cy="14" r="2.6" fill="#f5b31c"/>
    <rect x="2" y="18" width="20" height="2" fill="#4a4a52"/>
  `,
  // ペシャワール: カイバル峠の折り返し鉄道
  khyber: `
    <path d="M3,20L9,20L9,13L15,13L15,6L21,6" fill="none" stroke="#5c6a72" stroke-width="2"/>
    <path d="M8,20a1,1 0 1,0 0.1,0zM14,13a1,1 0 1,0 0.1,0z" fill="#8b8f98"/>
  `,
  // カトマンズ: 仏塔(ストゥーパ)
  stupa: `
    <path d="M6,20L18,20L15,15L9,15z" fill="#e8e2d4"/>
    <circle cx="12" cy="11" r="4.5" fill="#f6efe2"/>
    <path d="M12,6.5L12,2" stroke="#f4c430" stroke-width="1.4"/>
    <circle cx="12" cy="11" r="1.4" fill="#1a4a8f"/>
  `,
  // ジャナクプル: 越境列車
  crossborder: `
    <rect x="3" y="10" width="18" height="8" rx="2" fill="#5b8fe8"/>
    <circle cx="8" cy="19" r="2" fill="#2a2a30"/>
    <circle cx="16" cy="19" r="2" fill="#2a2a30"/>
    <path d="M12,4L12,10" stroke="#e8443f" stroke-width="2" stroke-dasharray="2,1.5"/>
  `,
  // ティンプー: ゾン(城塞寺院)
  dzong: `
    <rect x="5" y="9" width="14" height="12" fill="#e8e2d4"/>
    <rect x="5" y="5" width="14" height="4" fill="#7a1c1c"/>
    <rect x="10" y="13" width="4" height="8" fill="#1a4a8f"/>
  `,
  // コロンボ: 途絶えた連絡船
  ferryboat: `
    <path d="M2,16L22,16L19,20L5,20z" fill="#c9a26a"/>
    <path d="M12,16L12,6" stroke="#6b5330" stroke-width="1.6"/>
    <path d="M12,8l8,4l-8,3z" fill="#f6efe2"/>
    <path d="M2,21q10,-3 20,0" stroke="#bfe8f4" stroke-width="1.4" fill="none"/>
  `,
  // ダッカ: 三角州の川筋
  delta: `
    <path d="M12,3L12,10M12,10L5,21M12,10L12,21M12,10L19,21" stroke="#5b8fe8" stroke-width="1.8" fill="none"/>
  `,
  // チッタゴン: 解体される船
  shipbreak: `
    <path d="M2,16q10,5 20,0l-3,-8l-14,0z" fill="#5c6a72"/>
    <path d="M12,8L12,3" stroke="#8b8f98" stroke-width="1.6"/>
    <path d="M8,16L8,10M16,16L16,10" stroke="#2a2a30" stroke-width="1.4" stroke-dasharray="1.5,1.5"/>
  `,
  // ビエンチャン: 中国-ラオス鉄道の新型車両
  modernrail: `
    <path d="M2,16Q2,10 10,10L21,10L21,16z" fill="#5b8fe8"/>
    <circle cx="8" cy="19" r="2.4" fill="#2a2a30"/>
    <circle cx="17" cy="19" r="2.4" fill="#2a2a30"/>
    <rect x="12" y="12" width="6" height="3" fill="#cfe4f0"/>
  `,
  // ルアンパバーン: 仏教寺院の重層屋根
  temple: `
    <path d="M4,20h16M6,20l6,-4l6,4M8,16l4,-3l4,3M10,13l2,-2l2,2" stroke="#7a1c1c" stroke-width="1.6" fill="none"/>
    <path d="M12,11L12,7" stroke="#f4c430" stroke-width="1.4"/>
  `,
  // ハノイ: 雲南鉄道の山岳橋
  yunnanline: `
    <path d="M2,18L22,18" stroke="#5c6a72" stroke-width="2"/>
    <path d="M6,18L6,10M12,18L12,6M18,18L18,10" stroke="#4a4a52" stroke-width="1.6"/>
    <path d="M2,10L22,10" stroke="#8b8f98" stroke-width="1.2" opacity=".7"/>
  `,
  // ホーチミン市: 統一鉄道
  reunify: `
    <rect x="2" y="10" width="9" height="8" rx="1" fill="#e8443f"/>
    <rect x="13" y="10" width="9" height="8" rx="1" fill="#5b8fe8"/>
    <circle cx="7" cy="19" r="2" fill="#2a2a30"/>
    <circle cx="18" cy="19" r="2" fill="#2a2a30"/>
  `,
  // ダナン: 海雲峠
  haivan: `
    <path d="M2,18Q10,6 22,18" fill="none" stroke="#5c6a72" stroke-width="2"/>
    <path d="M2,21q10,-3 20,0" stroke="#3f8fc4" stroke-width="2" fill="none"/>
  `,
  // プノンペン: 竹列車
  revival: `
    <rect x="4" y="12" width="16" height="4" fill="#c9a26a"/>
    <circle cx="8" cy="18" r="2.2" fill="#2a2a30"/>
    <circle cx="16" cy="18" r="2.2" fill="#2a2a30"/>
    <path d="M4,12L4,9M8,12L8,9M12,12L12,9M16,12L16,9M20,12L20,9" stroke="#8b6a1a" stroke-width="1"/>
  `,
  // シンガポール: かつて外国領だった駅の飛び地
  enclave: `
    <rect x="4" y="9" width="16" height="9" fill="#c9a26a"/>
    <path d="M4,9l8,-5l8,5z" fill="#7a4a2a"/>
    <rect x="1" y="6" width="2" height="15" fill="#5c6a72" stroke-dasharray="2,1"/>
    <rect x="21" y="6" width="2" height="15" fill="#5c6a72"/>
  `,
  // 昆明: メートル軌間と標準軌の分岐
  narrowgauge: `
    <path d="M2,20h9M2,15h9" stroke="#8b8f98" stroke-width="1.6"/>
    <path d="M13,20h9M13,14h9" stroke="#5c6a72" stroke-width="1.6"/>
    <circle cx="11" cy="17" r="1.6" fill="#f5b31c"/>
  `,
  // 丹東: 使える橋と、途切れたままの橋
  brokenbridge: `
    <path d="M2,18h9" stroke="#5c6a72" stroke-width="2.4"/>
    <path d="M3,18L3,9L7,13L11,7" stroke="#5c6a72" stroke-width="1.6" fill="none"/>
    <path d="M14,18L14,10M20,18L20,12" stroke="#8b6a1a" stroke-width="2.4"/>
    <path d="M2,21q10,-3 20,0" stroke="#245a82" stroke-width="1.8" fill="none"/>
  `,
  // レド: スティルウェル・ロードの起点
  roadhead: `
    <path d="M4,21L10,4L14,4L20,21" fill="none" stroke="#8b6a1a" stroke-width="2"/>
    <path d="M4,21h16" stroke="#5c6a72" stroke-width="2"/>
    <circle cx="12" cy="4" r="2.2" fill="#f5b31c"/>
  `,
  // アダナ: タウルス山脈のヴァルダ高架橋
  viaduct: `
    <path d="M2,17Q12,7 22,17" fill="none" stroke="#5c6a72" stroke-width="2.4"/>
    <path d="M2,20L2,17M8,20L8,15M16,20L16,15M22,20L22,17" stroke="#4a4a52" stroke-width="1.8"/>
    <path d="M2,20h20" stroke="#8b6a1a" stroke-width="1.6"/>
  `,
};

// ---------------------------------------------------------------------------
// 背景(400×210)
// ---------------------------------------------------------------------------

export const ASIA_BG = {
  /** イスタンブール: ボスポラス海峡とマルマライ海底トンネル。 */
  strait: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 100));
    parts.push(cloud(80, 30, 1), cloud(320, 40, 0.9));
    // 遠景のドームとミナレットのシルエット(一般化した街並み)
    parts.push(`<path d="M40,100a20,20 0 0,1 40,0z" fill="#8b8f98" opacity=".8"/>`);
    parts.push(`<rect x="86" y="60" width="4" height="40" fill="#8b8f98" opacity=".8"/>`);
    parts.push(`<rect x="30" y="90" width="4" height="10" fill="#8b8f98" opacity=".8"/>`);
    parts.push(`<path d="M320,100a16,16 0 0,1 32,0z" fill="#8b8f98" opacity=".8"/>`);
    parts.push(`<rect x="362" y="66" width="4" height="34" fill="#8b8f98" opacity=".8"/>`);
    parts.push(ground(100, "#1c3a5c"));
    parts.push(waves(120, "#254a70", 3, 9));
    // フェリー
    parts.push(`<path d="M150,150L210,150L200,170L160,170z" fill="#8b8f98"/>`);
    parts.push(`<rect x="172" y="136" width="6" height="16" fill="#4a4a52"/>`);
    parts.push(`<rect x="160" y="140" width="30" height="10" fill="#f6efe2"/>`);
    // マルマライ・トンネル坑口(海底)
    parts.push(`<path d="M240,180Q260,160 280,180" stroke="#8b8f98" stroke-width="5" fill="none"/>`);
    parts.push(`<ellipse cx="240" cy="182" rx="10" ry="7" fill="#141416"/>`);
    parts.push(`<ellipse cx="280" cy="182" rx="10" ry="7" fill="#141416"/>`);
    parts.push(`<circle cx="240" cy="182" r="3" fill="#f5b31c" opacity=".8"/>`);
    // カモメ
    for (let i = 0; i < 3; i++) parts.push(`<path d="M${300 + i * 14},${50 + (i % 2) * 8}q6,-6 12,0" stroke="#3a4a52" stroke-width="1.2" fill="none"/>`);
    // 手前の桟橋(密度を足す)
    parts.push(ground(196, "#4a4038"));
    parts.push(`<circle cx="30" cy="199" r="4" fill="#2a2a30"/>`, `<rect x="28" y="199" width="4" height="8" fill="#2a2a30"/>`);
    parts.push(`<circle cx="370" cy="199" r="4" fill="#2a2a30"/>`, `<rect x="368" y="199" width="4" height="8" fill="#2a2a30"/>`);
    parts.push(`<path d="M30,199Q200,210 370,199" stroke="#8b7040" stroke-width="1.4" fill="none"/>`);
    parts.push(`<path d="M90,178L108,178L100,190z" fill="#8b8f98"/>`);
    parts.push(`<path d="M96,168L96,178" stroke="#4a4a52" stroke-width="1.4"/>`);
    parts.push(`<path d="M2,135q30,-4 60,0" stroke="#3f6f9f" stroke-width="1.2" fill="none" opacity=".6"/>`);
    parts.push(`<circle cx="160" cy="60" r="9" fill="#f5b31c"/>`);
    parts.push(`<path d="M330,178l-8,14h16z" fill="#8b8f98"/>`);
    parts.push(`<circle cx="330" cy="172" r="3" fill="#e8e2d4"/>`);
    parts.push(`<path d="M340,60q6,-6 12,0" stroke="#3a4a52" stroke-width="1.2" fill="none"/>`);
    return parts.join("");
  })(),

  /** サマルカンド: レギスタン広場を思わせるドームとキャラバン。 */
  silkroad: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 110));
    parts.push(cloud(320, 30, 1));
    // ティムール朝風のドーム建築(一般化)。壁の裾(y=110)は下のground()の開始yと揃える
    // (揃えないと、あとから塗るground()が壁の下側を塗りつぶして消してしまう)
    parts.push(`<rect x="40" y="80" width="60" height="30" fill="#c8a35a"/>`);
    parts.push(`<path d="M40,80a30,26 0 0,1 60,0z" fill="#3f8fc4"/>`);
    parts.push(`<rect x="66" y="60" width="8" height="20" fill="#3f8fc4"/>`);
    parts.push(`<rect x="300" y="84" width="50" height="26" fill="#c8a35a"/>`);
    parts.push(`<path d="M300,84a25,22 0 0,1 50,0z" fill="#2f6f9f"/>`);
    // タイルの目地(ドームの装飾)
    parts.push(`<path d="M50,64Q60,54 70,64" stroke="#f4c430" stroke-width="1" fill="none" opacity=".7"/>`);
    parts.push(`<path d="M312,72Q325,62 338,72" stroke="#f4c430" stroke-width="1" fill="none" opacity=".7"/>`);
    parts.push(ground(110, "#d9c17f"));
    // 隊商宿の中庭(手前)
    parts.push(`<rect x="140" y="160" width="120" height="40" fill="#c8a35a" opacity=".5"/>`);
    // ラクダのキャラバン
    for (let i = 0; i < 4; i++) {
      const x = 60 + i * 30;
      parts.push(`<path d="M${x},190L${x},175Q${x},170 ${x + 5},170Q${x + 10},170 ${x + 10},175L${x + 10},190z" fill="#c8a35a"/>`);
      parts.push(`<path d="M${x + 2},170Q${x + 5},160 ${x + 8},170" stroke="#8b6a1a" stroke-width="2" fill="none"/>`);
      parts.push(`<circle cx="${x + 9}" cy="167" r="2.4" fill="#c8a35a"/>`);
    }
    // 市場の露店(手前左右)
    parts.push(`<rect x="20" y="185" width="18" height="14" fill="#8b6a1a"/>`, `<path d="M18,185L29,174L40,185z" fill="#c8443f"/>`);
    parts.push(`<rect x="345" y="188" width="16" height="12" fill="#8b6a1a"/>`, `<path d="M343,188L353,178L363,188z" fill="#2f6f9f"/>`);
    // 壺
    parts.push(`<ellipse cx="290" cy="200" rx="6" ry="5" fill="#8b6a1a"/>`);
    parts.push(`<ellipse cx="304" cy="203" rx="5" ry="4" fill="#c8a35a"/>`);
    parts.push(`<ellipse cx="316" cy="199" rx="6" ry="5" fill="#8b6a1a"/>`);
    // 上空の鳥
    parts.push(`<path d="M180,40q6,-6 12,0" stroke="#4a4a52" stroke-width="1.2" fill="none"/>`);
    parts.push(`<path d="M200,50q6,-6 12,0" stroke="#4a4a52" stroke-width="1.2" fill="none"/>`);
    // 砂丘の陰影
    parts.push(`<path d="M0,205c40,-10 80,-10 120,0c40,-8 80,-8 120,0c40,-8 80,-8 140,0v5H0z" fill="#c9a877" opacity=".6"/>`);
    parts.push(`<path d="M10,208q30,-6 60,0" stroke="#b3854f" stroke-width="1.2" fill="none" opacity=".6"/>`);
    parts.push(`<circle cx="360" cy="55" r="8" fill="#f5b31c" opacity=".8"/>`);
    parts.push(`<path d="M220,60q6,-6 12,0" stroke="#4a4a52" stroke-width="1.2" fill="none"/>`);
    return parts.join("");
  })(),

  /** ドスティク: 台車を履き替える国境の操車場。 */
  railyard: (() => {
    const parts = [];
    parts.push(sky("#c7cdd2", "#e6e9ea", 90));
    parts.push(mountainPeak(60, 90, 40, "#8b8f98"), mountainPeak(340, 90, 34, "#7a8790"));
    parts.push(ground(90, "#93ad68"));
    parts.push(band(150, 60, "#5c6a72"));
    // 2つの軌間のレール
    parts.push(`<rect x="0" y="176" width="400" height="3" fill="#2a2a30"/>`);
    parts.push(`<rect x="0" y="188" width="400" height="3" fill="#2a2a30"/>`);
    parts.push(`<rect x="0" y="196" width="400" height="3" fill="#2a2a30"/>`);
    // 持ち上がる貨車
    parts.push(`<rect x="150" y="130" width="90" height="30" rx="2" fill="#5b8fe8"/>`);
    for (let i = 0; i < 4; i++) parts.push(`<rect x="${158 + i * 20}" y="136" width="12" height="10" fill="#cfe4f0"/>`);
    for (let i = 0; i < 4; i++) {
      const x = 158 + i * 20;
      parts.push(`<rect x="${x}" y="160" width="6" height="16" fill="#f5b31c"/>`);
    }
    // 取り外された台車(広軌)
    parts.push(`<rect x="40" y="176" width="40" height="9" rx="1" fill="#7a7a80"/>`);
    parts.push(`<circle cx="48" cy="187" r="4" fill="#2a2a30"/>`);
    parts.push(`<circle cx="72" cy="187" r="4" fill="#2a2a30"/>`);
    // 待機する台車(標準軌)
    parts.push(`<rect x="290" y="176" width="34" height="9" rx="1" fill="#8b8f98"/>`);
    parts.push(`<circle cx="296" cy="187" r="4" fill="#2a2a30"/>`);
    parts.push(`<circle cx="318" cy="187" r="4" fill="#2a2a30"/>`);
    // 国境の標識柱
    parts.push(`<rect x="20" y="140" width="4" height="36" fill="#f6efe2"/>`);
    parts.push(`<rect x="16" y="140" width="12" height="6" fill="#e8443f"/>`);
    parts.push(`<path d="M28,140L38,144L28,148z" fill="#e8443f"/>`);
    // 側線わきの詰所
    parts.push(`<rect x="350" y="150" width="30" height="20" fill="#c8a35a"/>`);
    parts.push(`<path d="M348,150L365,138L382,150z" fill="#7a4a2a"/>`);
    parts.push(`<rect x="360" y="158" width="8" height="12" fill="#3a3d42"/>`);
    // 信号灯
    parts.push(`<rect x="120" y="155" width="3" height="21" fill="#4a4a52"/>`);
    parts.push(`<circle cx="121.5" cy="153" r="3.4" fill="#e8443f"/>`);
    // 積み荷の樽
    parts.push(`<ellipse cx="100" cy="203" rx="7" ry="6" fill="#7a4a2a"/>`);
    parts.push(`<ellipse cx="114" cy="205" rx="6" ry="5" fill="#8b6a1a"/>`);
    parts.push(`<ellipse cx="126" cy="202" rx="7" ry="6" fill="#7a4a2a"/>`);
    parts.push(`<circle cx="30" cy="45" r="9" fill="#f5b31c" opacity=".8"/>`);
    parts.push(`<path d="M280,60q6,-6 12,0" stroke="#3a4a52" stroke-width="1.2" fill="none"/>`);
    parts.push(`<rect x="200" y="196" width="14" height="10" fill="#7a4a2a"/>`);
    return parts.join("");
  })(),

  /** カンチャナブリ: クウェー川の鉄橋。橋と川と山の風景にとどめる。 */
  riverbridge: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 100));
    parts.push(cloud(80, 30, 1));
    // 遠くの山と密林
    parts.push(`<path d="M0,100c60,-30 120,-30 180,-6c60,-24 140,-24 220,0v10H0z" fill="#3f8f4f" opacity=".8"/>`);
    parts.push(ground(100, "#1c3a5c"));
    parts.push(waves(150, "#254a70", 2, 9));
    // 鋼鉄トラス橋
    parts.push(`<rect x="40" y="140" width="320" height="8" fill="#5c6a72"/>`);
    for (let i = 0; i < 8; i++) {
      const x = 50 + i * 40;
      parts.push(`<path d="M${x},148L${x + 20},110L${x + 40},148z" fill="none" stroke="#8b8f98" stroke-width="3"/>`);
    }
    for (let i = 0; i < 9; i++) parts.push(`<rect x="${48 + i * 40}" y="140" width="4" height="60" fill="#4a4a52"/>`);
    // 橋を渡る列車
    parts.push(`<rect x="150" y="120" width="70" height="20" rx="2" fill="#5b8fe8"/>`);
    for (let i = 0; i < 4; i++) parts.push(`<rect x="${157 + i * 16}" y="124" width="10" height="8" fill="#cfe4f0"/>`);
    parts.push(`<circle cx="162" cy="140" r="4" fill="#2a2a30"/>`);
    parts.push(`<circle cx="204" cy="140" r="4" fill="#2a2a30"/>`);
    // 岸辺の椰子と小舟
    parts.push(`<path d="M30,190L30,168" stroke="#6b5330" stroke-width="3" fill="none"/>`);
    parts.push(`<path d="M30,168q-14,-6 -20,2M30,168q14,-6 20,2" stroke="#3f8f4f" stroke-width="3" fill="none"/>`);
    parts.push(`<path d="M340,185L380,185L372,195L348,195z" fill="#6b5330"/>`);
    // もう一本の椰子と川面の鳥
    parts.push(`<path d="M368,192L368,172" stroke="#6b5330" stroke-width="2.4" fill="none"/>`);
    parts.push(`<path d="M368,172q-11,-5 -16,2M368,172q11,-5 16,2" stroke="#3f8f4f" stroke-width="2.4" fill="none"/>`);
    parts.push(`<path d="M60,60q6,-6 12,0" stroke="#3a4a52" stroke-width="1.2" fill="none"/>`);
    parts.push(`<path d="M80,50q6,-6 12,0" stroke="#3a4a52" stroke-width="1.2" fill="none"/>`);
    return parts.join("");
  })(),

  /** ウランバートル: 草原とゲル、ソ連式軌間の操車場。 */
  steppe: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 110));
    parts.push(cloud(90, 30, 1), cloud(320, 40, 0.9));
    parts.push(`<path d="M0,110c60,-16 140,-16 200,0c60,-14 140,-14 200,0v10H0z" fill="#b9c26a"/>`);
    parts.push(ground(110, "#b9c26a"));
    // ゲルの集落
    for (let i = 0; i < 3; i++) {
      const x = 40 + i * 30;
      parts.push(`<path d="M${x},170L${x},157Q${x},150 ${x + 10},150Q${x + 20},150 ${x + 20},157L${x + 20},170z" fill="#f6efe2" stroke="#8b7040" stroke-width="1.2"/>`);
      parts.push(`<path d="M${x + 10},150L${x + 10},144" stroke="#6b5330" stroke-width="1.2"/>`);
    }
    // 馬(脚の先を y=178 までに収める。下の操車場帯(y=180〜)が
    // あとから塗られるので、それより下まで描くと脚が塗りつぶされて消える)
    for (let i = 0; i < 3; i++) {
      const x = 260 + i * 20;
      parts.push(`<path d="M${x},178L${x + 4},163L${x + 12},163L${x + 16},178z" fill="#6b5330"/>`);
      parts.push(`<path d="M${x + 12},163L${x + 18},155" stroke="#4a3a2a" stroke-width="2" fill="none"/>`);
    }
    // ソ連式軌間の操車場(手前)
    parts.push(band(180, 30, "#5c6a72"));
    parts.push(`<rect x="0" y="196" width="400" height="3" fill="#2a2a30"/>`);
    parts.push(`<rect x="0" y="188" width="400" height="3" fill="#2a2a30"/>`);
    parts.push(`<rect x="150" y="182" width="90" height="16" rx="2" fill="#5b8fe8"/>`);
    for (let i = 0; i < 4; i++) parts.push(`<rect x="${158 + i * 20}" y="186" width="10" height="7" fill="#cfe4f0"/>`);
    // 草の束と羊、ゲルの煙
    parts.push(`<path d="M18,175l-2,-9M22,175l0,-11M26,175l2,-9" stroke="#8ea25a" stroke-width="1.6"/>`);
    parts.push(`<path d="M360,172l-2,-9M364,172l0,-11M368,172l2,-9" stroke="#8ea25a" stroke-width="1.6"/>`);
    parts.push(`<path d="M50,143q3,-8 0,-14" stroke="#e6e9ea" stroke-width="2" fill="none" opacity=".7"/>`);
    parts.push(`<ellipse cx="220" cy="172" rx="5" ry="4" fill="#f6efe2"/>`);
    parts.push(`<ellipse cx="232" cy="174" rx="5" ry="4" fill="#f6efe2"/>`);
    parts.push(`<ellipse cx="244" cy="171" rx="5" ry="4" fill="#f6efe2"/>`);
    parts.push(`<circle cx="30" cy="40" r="9" fill="#f5b31c"/>`);
    parts.push(`<path d="M300,50q6,-6 12,0" stroke="#3a4a52" stroke-width="1.2" fill="none"/>`);
    return parts.join("");
  })(),

  /** ギュムリ: 錆びて途切れた国境の線路。 */
  borderline: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 110));
    parts.push(cloud(300, 30, 1));
    parts.push(mountainPeak(40, 110, 34, "#8b8f98"), mountainPeak(360, 110, 30, "#7a8790"));
    parts.push(ground(110, "#93ad68"));
    // 錆びた線路(雑草に覆われる)
    parts.push(`<rect x="0" y="150" width="230" height="4" fill="#7a4a3a"/>`);
    for (let i = 0; i < 15; i++) parts.push(`<rect x="${i * 15}" y="148" width="8" height="8" fill="#5a4a3a"/>`);
    parts.push(`<g stroke="#8ea25a" stroke-width="1.6"><path d="M20,148l-2,-8M40,148l2,-8M70,150l-2,-9M100,150l2,-9M130,148l-2,-8M160,150l2,-9M190,148l-2,-8"/></g>`);
    // 車止め(この先には進めない)
    parts.push(`<rect x="222" y="140" width="8" height="14" fill="#4a4a52"/>`);
    parts.push(`<rect x="218" y="138" width="16" height="4" fill="#e8443f"/>`);
    // 国境の柵と有刺鉄線
    for (let i = 0; i < 6; i++) parts.push(`<rect x="${250 + i * 24}" y="130" width="3" height="30" fill="#5c5c60"/>`);
    parts.push(`<path d="M250,138h144M250,148h144M250,158h144" stroke="#8b8f98" stroke-width="1"/>`);
    for (let i = 0; i < 8; i++) parts.push(`<path d="M${252 + i * 18},134l6,-4M${252 + i * 18},134l-6,-4" stroke="#8b8f98" stroke-width="1"/>`);
    // 警告標識
    parts.push(`<rect x="270" y="164" width="3" height="20" fill="#4a4a52"/>`);
    parts.push(`<rect x="262" y="164" width="19" height="12" fill="#f5b31c"/>`);
    parts.push(`<path d="M264,174l15,-8" stroke="#2a2a30" stroke-width="1.6"/>`);
    parts.push(ground(184, "#8a9a5a"));
    // 手前の雑草
    parts.push(`<g stroke="#7f9a52" stroke-width="1.6" opacity=".85"><path d="M30,200l-2,-9M60,204l2,-10M100,200l-2,-9M340,202l2,-9M370,198l-2,-9"/></g>`);
    parts.push(`<circle cx="200" cy="60" r="12" fill="#f5b31c"/>`);
    return parts.join("");
  })(),

  /** ラホール・ハノイ: 英仏植民地時代の駅舎建築。 */
  colonialstation: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 118));
    parts.push(cloud(70, 30, 1), cloud(330, 26, 0.8));
    parts.push(ground(118, "#a9966a"));
    // 駅舎本体
    parts.push(`<rect x="120" y="118" width="160" height="52" fill="#c9a26a"/>`);
    parts.push(`<rect x="120" y="118" width="160" height="6" fill="#7a4a2a"/>`);
    // 時計塔
    parts.push(`<rect x="185" y="70" width="30" height="48" fill="#b3854f"/>`);
    parts.push(`<path d="M185,70L200,52L215,70z" fill="#7a4a2a"/>`);
    parts.push(`<circle cx="200" cy="90" r="10" fill="#f6efe2" stroke="#4a4a52" stroke-width="1.4"/>`);
    parts.push(`<line x1="200" y1="90" x2="200" y2="83" stroke="#2a2a30" stroke-width="1.4"/>`);
    parts.push(`<line x1="200" y1="90" x2="206" y2="90" stroke="#2a2a30" stroke-width="1.4"/>`);
    // アーチ窓
    for (let i = 0; i < 4; i++) {
      const x = 130 + i * 34;
      parts.push(`<path d="M${x},150L${x},130a8,8 0 0 1 16,0L${x + 16},150z" fill="#3f8fc4" opacity=".85"/>`);
    }
    // プラットフォームの庇
    parts.push(`<rect x="90" y="170" width="220" height="6" fill="#5c6a72"/>`);
    for (let i = 0; i < 6; i++) parts.push(`<rect x="${96 + i * 36}" y="170" width="4" height="30" fill="#4a4a52"/>`);
    parts.push(ground(200, "#9a9488"));
    // 蒸気機関車と客車
    parts.push(`<rect x="30" y="176" width="40" height="20" rx="3" fill="#4a4a52"/>`);
    parts.push(`<circle cx="34" cy="196" r="6" fill="#2a2a30"/>`, `<circle cx="62" cy="196" r="6" fill="#2a2a30"/>`);
    parts.push(`<rect x="70" y="180" width="34" height="16" fill="#8b6a1a"/>`);
    parts.push(`<circle cx="78" cy="196" r="5" fill="#2a2a30"/>`, `<circle cx="96" cy="196" r="5" fill="#2a2a30"/>`);
    // 手前の商人と荷物
    parts.push(`<ellipse cx="330" cy="196" rx="8" ry="6" fill="#c9a26a"/>`);
    parts.push(`<ellipse cx="348" cy="198" rx="7" ry="5" fill="#8b6a1a"/>`);
    parts.push(`<path d="M20,60q6,-6 12,0" stroke="#4a4a52" stroke-width="1.2" fill="none"/>`);
    parts.push(`<circle cx="370" cy="45" r="8" fill="#f5b31c" opacity=".8"/>`);
    return parts.join("");
  })(),

  /** アンマン: ヒジャーズ鉄道の砂漠の駅。 */
  desertstation: (() => {
    const parts = [];
    parts.push(sky("#e8c98f", "#f4dfb0", 120));
    parts.push(cloud(300, 24, 0.7));
    parts.push(`<circle cx="60" cy="40" r="22" fill="#f5b31c"/>`);
    parts.push(ground(120, "#d9c17f"));
    // 砂丘
    parts.push(`<path d="M0,120c40,-16 80,-16 120,0c40,-14 80,-14 120,0c40,-14 80,-14 160,0v6H0z" fill="#c9a877" opacity=".7"/>`);
    // 駅舎(石造り、平屋根)
    parts.push(`<rect x="140" y="130" width="120" height="40" fill="#e8dcc0"/>`);
    parts.push(`<rect x="140" y="126" width="120" height="6" fill="#b3854f"/>`);
    for (let i = 0; i < 3; i++) parts.push(`<rect x="${155 + i * 35}" y="140" width="14" height="24" fill="#7a4a2a"/>`);
    // 給水塔
    parts.push(`<rect x="60" y="150" width="6" height="30" fill="#5c6a72"/>`);
    parts.push(`<rect x="48" y="130" width="30" height="22" fill="#8b8f98"/>`);
    parts.push(`<path d="M48,130l15,-10l15,10z" fill="#5c6a72"/>`);
    // 狭軌の線路
    parts.push(`<rect x="0" y="182" width="400" height="3" fill="#5a4a3a"/>`);
    for (let i = 0; i < 20; i++) parts.push(`<rect x="${i * 20}" y="180" width="6" height="6" fill="#6b5330"/>`);
    parts.push(ground(190, "#c9a877"));
    // ラクダと隊商
    parts.push(`<path d="M320,200q0,-8 4,-9q1.6,-6 6,-4.8q0.8,-6.8 5.6,-6.8q4.8,0 4.8,5.2q4.8,-1.6 4.8,4.4q0,6 -4.8,6.8l0,4.4z" fill="#c9a26a"/>`);
    parts.push(`<rect x="322" y="196" width="2.4" height="7" fill="#c9a26a"/>`, `<rect x="336" y="196" width="2.4" height="7" fill="#c9a26a"/>`);
    parts.push(`<ellipse cx="90" cy="202" rx="9" ry="6" fill="#8b6a1a"/>`);
    return parts.join("");
  })(),

  /** 湾岸の港(ジェッダ・バクー・バトゥミ・マナーマ・クウェート・バスラ)。 */
  gulfport: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 104));
    parts.push(cloud(90, 28, 1), cloud(320, 34, 0.9));
    parts.push(ground(104, "#e8dcc0"));
    parts.push(band(104, 70, "#1e5a82"));
    parts.push(`<path d="M0,120q40,-8 80,0t80,0t80,0t80,0t80,0" fill="none" stroke="#2f7aa2" stroke-width="2" opacity=".7"/>`);
    parts.push(`<path d="M0,140q40,-8 80,0t80,0t80,0t80,0t80,0" fill="none" stroke="#2f7aa2" stroke-width="2" opacity=".7"/>`);
    // ダウ船
    parts.push(`<path d="M30,160q14,7 28,0l-4,-4l-20,0z" fill="#f6efe2"/>`);
    parts.push(`<rect x="42" y="146" width="2.4" height="14" fill="#6b5330"/>`);
    parts.push(`<path d="M44,146l16,6l-16,4z" fill="#e8e2d4"/>`);
    parts.push(`<path d="M250,168q16,8 32,0l-4,-4l-24,0z" fill="#f6efe2"/>`);
    parts.push(`<rect x="264" y="152" width="2.4" height="16" fill="#6b5330"/>`);
    parts.push(`<path d="M266,152l18,7l-18,4z" fill="#e8e2d4"/>`);
    // 起重機と埠頭
    parts.push(ground(174, "#8a8478"));
    parts.push(`<rect x="0" y="174" width="400" height="4" fill="#6b5330"/>`);
    parts.push(`<rect x="330" y="140" width="4" height="34" fill="#e8443f"/>`);
    parts.push(`<rect x="330" y="140" width="34" height="4" fill="#e8443f"/>`);
    parts.push(`<line x1="360" y1="144" x2="360" y2="164" stroke="#3a3d42" stroke-width="1.6"/>`);
    // タンク貨車と椰子
    parts.push(`<rect x="30" y="186" width="40" height="14" rx="4" fill="#7a4a2a"/>`);
    parts.push(`<circle cx="38" cy="200" r="4" fill="#2a2a30"/>`, `<circle cx="62" cy="200" r="4" fill="#2a2a30"/>`);
    parts.push(`<path d="M200,196L200,178" stroke="#6b5330" stroke-width="2.4" fill="none"/>`);
    parts.push(`<path d="M200,178q-11,-5 -16,2M200,178q11,-5 16,2" stroke="#3f8f4f" stroke-width="2.4" fill="none"/>`);
    parts.push(`<path d="M10,50q6,-6 12,0" stroke="#3a4a52" stroke-width="1.2" fill="none"/>`);
    // 積み荷の樽と、もう一羽の鳥
    parts.push(`<ellipse cx="90" cy="200" rx="6" ry="5" fill="#7a4a2a"/>`);
    parts.push(`<ellipse cx="104" cy="202" rx="5" ry="4" fill="#8b6a1a"/>`);
    parts.push(`<rect x="340" y="190" width="20" height="14" rx="2" fill="#5c6a72"/>`);
    parts.push(`<circle cx="346" cy="204" r="3" fill="#2a2a30"/>`, `<circle cx="356" cy="204" r="3" fill="#2a2a30"/>`);
    parts.push(`<path d="M370,50q6,-6 12,0" stroke="#3a4a52" stroke-width="1.2" fill="none"/>`);
    parts.push(`<path d="M60,208q8,-4 16,0" stroke="#245a82" stroke-width="1.4" fill="none" opacity=".6"/>`);
    parts.push(`<circle cx="200" cy="45" r="8" fill="#f5b31c" opacity=".8"/>`);
    parts.push(`<rect x="130" y="192" width="16" height="10" rx="2" fill="#7a4a2a"/>`);
    return parts.join("");
  })(),

  /** 港湾都市(マスカット・ウラジオストク・香港・釜山)。 */
  harborcity: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 96));
    parts.push(cloud(300, 26, 0.9));
    parts.push(mountainPeak(40, 96, 40, "#7a8790", false), mountainPeak(370, 96, 32, "#8b8f98", false));
    parts.push(ground(96, "#93ad68"));
    parts.push(band(120, 90, "#1c3a5c"));
    parts.push(`<path d="M0,136q40,-8 80,0t80,0t80,0t80,0t80,0" fill="none" stroke="#254a70" stroke-width="2" opacity=".7"/>`);
    // 港沿いのビル
    for (let i = 0; i < 6; i++) {
      const x = 60 + i * 24, h = 26 + (i % 3) * 12;
      parts.push(`<rect x="${x}" y="${120 - h}" width="18" height="${h}" fill="${i % 2 ? "#5c6a72" : "#8b8f98"}"/>`);
    }
    // 貨物船
    parts.push(`<rect x="260" y="150" width="60" height="14" rx="2" fill="#4a4a52"/>`);
    for (let i = 0; i < 4; i++) parts.push(`<rect x="${266 + i * 14}" y="142" width="10" height="8" fill="#e8443f"/>`);
    parts.push(ground(195, "#8a8478"));
    // 埠頭のクレーン
    parts.push(`<rect x="40" y="150" width="4" height="30" fill="#e8443f"/>`);
    parts.push(`<rect x="40" y="150" width="26" height="4" fill="#e8443f"/>`);
    parts.push(`<line x1="60" y1="154" x2="60" y2="170" stroke="#3a3d42" stroke-width="1.6"/>`);
    parts.push(`<rect x="0" y="205" width="400" height="5" fill="#6b5330"/>`);
    // 波間のブイと、もう一隻の船
    parts.push(`<circle cx="150" cy="168" r="4" fill="#e8443f"/>`);
    parts.push(`<circle cx="200" cy="172" r="4" fill="#f5b31c"/>`);
    parts.push(`<rect x="330" y="170" width="34" height="10" rx="2" fill="#8b8f98"/>`);
    parts.push(`<rect x="336" y="164" width="8" height="8" fill="#5c6a72"/>`);
    for (let i = 0; i < 3; i++) parts.push(`<path d="M${20 + i * 12},70q6,-6 12,0" stroke="#3a4a52" stroke-width="1.2" fill="none"/>`);
    parts.push(`<rect x="20" y="205" width="8" height="6" fill="#4a4038"/>`);
    parts.push(`<rect x="370" y="205" width="8" height="6" fill="#4a4038"/>`);
    parts.push(`<rect x="100" y="196" width="16" height="12" rx="2" fill="#7a4a2a"/>`);
    parts.push(`<circle cx="106" cy="208" r="3" fill="#2a2a30"/>`, `<circle cx="114" cy="208" r="3" fill="#2a2a30"/>`);
    parts.push(`<path d="M120,205q8,-4 16,0" stroke="#254a70" stroke-width="1.4" fill="none" opacity=".6"/>`);
    return parts.join("");
  })(),

  /** カトマンズ・ティンプー: ヒマラヤの高地の谷。 */
  highland: (() => {
    const parts = [];
    parts.push(sky("#7fb0e0", "#cfe4f0", 112));
    parts.push(cloud(70, 24, 0.8));
    parts.push(mountainPeak(90, 112, 56, "#8b8f98"), mountainPeak(150, 112, 44, "#9aa0a8"), mountainPeak(320, 112, 50, "#8b8f98"));
    parts.push(ground(112, "#7f9a5a"));
    // 段々畑
    for (let i = 0; i < 4; i++) parts.push(`<path d="M20,${140 + i * 12}h100" stroke="#5f7f4a" stroke-width="4" opacity=".7"/>`);
    // ゾン風の建物
    parts.push(`<rect x="230" y="130" width="50" height="40" fill="#e8e2d4"/>`);
    parts.push(`<rect x="230" y="122" width="50" height="10" fill="#7a1c1c"/>`);
    parts.push(`<path d="M230,122h50" stroke="#f4c430" stroke-width="2"/>`);
    for (let i = 0; i < 3; i++) parts.push(`<rect x="${240 + i * 12}" y="142" width="8" height="12" fill="#1a4a8f"/>`);
    parts.push(ground(180, "#7f9a5a"));
    // タルチョー(祈祷旗)
    parts.push(`<path d="M300,120L300,160" stroke="#8b8f98" stroke-width="1.6"/>`);
    parts.push(`<path d="M0,190L400,190" stroke="#8b8f98" stroke-width="0" opacity="0"/>`);
    for (let i = 0; i < 5; i++) {
      const colors = ["#1a4a8f", "#f6efe2", "#e8443f", "#8ea25a", "#f5b31c"];
      parts.push(`<rect x="${296 + i * 8}" y="125" width="6" height="6" fill="${colors[i]}"/>`);
    }
    // 手前の巡礼者の杖と旗
    parts.push(`<path d="M40,200L40,176" stroke="#6b5330" stroke-width="2.4" fill="none"/>`);
    parts.push(`<path d="M40,176h20" stroke="#e8443f" stroke-width="4"/>`);
    parts.push(`<circle cx="80" cy="60" r="10" fill="#f5b31c"/>`);
    // 遠くの棚田と鳥
    for (let i = 0; i < 3; i++) parts.push(`<path d="M340,${150 + i * 10}h40" stroke="#5f7f4a" stroke-width="3" opacity=".6"/>`);
    parts.push(`<path d="M110,50q6,-6 12,0" stroke="#3a4a52" stroke-width="1.2" fill="none"/>`);
    parts.push(`<circle cx="60" cy="176" r="4" fill="#f6efe2"/>`);
    parts.push(`<circle cx="70" cy="180" r="4" fill="#f6efe2"/>`);
    return parts.join("");
  })(),

  /** トビリシ・エレバン・ビシュケク・ドゥシャンベ: 丘に抱かれた旧市街。 */
  hillcity: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 108));
    parts.push(cloud(320, 28, 0.9));
    parts.push(mountainPeak(70, 108, 48, "#8b8f98"), mountainPeak(330, 108, 36, "#9aa0a8"));
    parts.push(`<path d="M0,108c30,-20 60,-20 90,0c30,-16 60,-16 90,0c30,-16 60,-16 90,0c30,-20 60,-20 130,0v4H0z" fill="#7f9a5a" opacity=".9"/>`);
    parts.push(ground(108, "#93ad68"));
    // 旧市街の家並み(段々に積み重なる)
    for (let i = 0; i < 6; i++) {
      const x = 120 + i * 26, h = 30 + (i % 3) * 10;
      parts.push(`<rect x="${x}" y="${170 - h}" width="20" height="${h}" fill="${i % 2 ? "#c9a26a" : "#b3854f"}"/>`);
      parts.push(`<path d="M${x - 2},${170 - h}h24l-12,-8z" fill="#7a4a2a"/>`);
    }
    parts.push(ground(170, "#8a8478"));
    // ケーブルカーの軌条(斜面を登る)
    parts.push(`<path d="M40,200L90,110" stroke="#5c6a72" stroke-width="3"/>`);
    parts.push(`<rect x="30" y="180" width="20" height="14" rx="2" fill="#5b8fe8"/>`);
    parts.push(`<rect x="70" y="130" width="16" height="12" rx="2" fill="#5b8fe8"/>`);
    parts.push(`<circle cx="350" cy="55" r="11" fill="#f5b31c"/>`);
    parts.push(`<path d="M330,190q40,-6 60,0" stroke="#7a4a2a" stroke-width="1.4" fill="none" opacity=".7"/>`);
    // 露店の壺と、干した反物
    parts.push(`<ellipse cx="200" cy="196" rx="7" ry="5" fill="#8b6a1a"/>`);
    parts.push(`<ellipse cx="214" cy="198" rx="6" ry="4" fill="#c9a26a"/>`);
    parts.push(`<rect x="240" y="184" width="30" height="8" fill="#c8102e" opacity=".8"/>`);
    parts.push(`<path d="M10,50q6,-6 12,0" stroke="#3a4a52" stroke-width="1.2" fill="none"/>`);
    // 段々畑の続きと、路地の街灯
    for (let i = 0; i < 3; i++) parts.push(`<path d="M340,${160 + i * 8}h40" stroke="#5f7f4a" stroke-width="3" opacity=".6"/>`);
    parts.push(`<rect x="110" y="176" width="3" height="24" fill="#4a4a52"/>`);
    parts.push(`<circle cx="111.5" cy="174" r="4" fill="#f5b31c" opacity=".8"/>`);
    parts.push(`<path d="M270,190q10,-4 20,0" stroke="#7a4a2a" stroke-width="1.6" fill="none"/>`);
    return parts.join("");
  })(),

  /** コロンボ: 途絶えた連絡船列車の島の港。 */
  islandport: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 100));
    parts.push(cloud(80, 30, 1));
    parts.push(ground(100, "#1c3a5c"));
    parts.push(waves(120, "#254a70", 3, 9));
    // 灯台
    parts.push(`<rect x="40" y="130" width="10" height="50" fill="#f6efe2"/>`);
    parts.push(`<rect x="40" y="130" width="10" height="10" fill="#e8443f"/>`);
    parts.push(`<path d="M38,130h14l-7,-10z" fill="#5c6a72"/>`);
    // 朽ちた桟橋(海に途切れる)
    parts.push(`<rect x="200" y="150" width="150" height="5" fill="#6b5330" opacity=".8"/>`);
    for (let i = 0; i < 6; i++) parts.push(`<rect x="${210 + i * 24}" y="150" width="4" height="${20 + (i % 2) * 8}" fill="#4a4038" opacity=".8"/>`);
    parts.push(`<rect x="330" y="140" width="6" height="12" fill="#4a4038" opacity=".6"/>`);
    parts.push(ground(178, "#c9a877"));
    // 椰子と漁船
    parts.push(`<path d="M70,196L70,176" stroke="#6b5330" stroke-width="2.6" fill="none"/>`);
    parts.push(`<path d="M70,176q-12,-6 -18,2M70,176q12,-6 18,2M70,176q-4,-13 2,-19M70,176q4,-13 -2,-19" stroke="#3f8f4f" stroke-width="2.6" fill="none"/>`);
    parts.push(`<path d="M280,196L310,196L302,206L288,206z" fill="#c9a26a"/>`);
    parts.push(`<rect x="292" y="182" width="2.4" height="14" fill="#6b5330"/>`);
    parts.push(`<path d="M294,182l14,5l-14,4z" fill="#f6efe2"/>`);
    parts.push(`<path d="M0,60q6,-6 12,0" stroke="#3a4a52" stroke-width="1.2" fill="none"/>`);
    // 錆びた継ぎ手のボルトと、もう一羽の鳥
    parts.push(`<circle cx="212" cy="152" r="2" fill="#8b6a1a"/>`);
    parts.push(`<circle cx="234" cy="150" r="2" fill="#8b6a1a"/>`);
    parts.push(`<path d="M20,50q6,-6 12,0" stroke="#3a4a52" stroke-width="1.2" fill="none"/>`);
    parts.push(`<path d="M100,140q10,-4 20,0" stroke="#bfe8f4" stroke-width="1.4" fill="none" opacity=".6"/>`);
    parts.push(`<ellipse cx="150" cy="198" rx="16" ry="4" fill="#c9a877" opacity=".6"/>`);
    // 岩と、貝殻、もう一つの浮きブイ
    parts.push(`<ellipse cx="180" cy="204" rx="10" ry="4" fill="#8a8478"/>`);
    parts.push(`<ellipse cx="250" cy="200" rx="4" ry="3" fill="#e8e2d4"/>`);
    parts.push(`<circle cx="260" cy="160" r="4" fill="#e8443f"/>`);
    parts.push(`<circle cx="20" cy="140" r="3" fill="#f5b31c"/>`);
    parts.push(`<path d="M0,178q10,-4 20,0" stroke="#bfe8f4" stroke-width="1.4" fill="none" opacity=".6"/>`);
    parts.push(`<rect x="336" y="140" width="6" height="4" fill="#4a4038" opacity=".6"/>`);
    parts.push(`<path d="M340,50q6,-6 12,0" stroke="#3a4a52" stroke-width="1.2" fill="none"/>`);
    return parts.join("");
  })(),

  /** ビエンチャン・ルアンパバーン・ダナン: 密林の山岳鉄道。 */
  junglerail: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 96));
    parts.push(cloud(300, 26, 0.9));
    // カルスト地形の峰
    parts.push(`<path d="M20,96c8,-30 18,-30 26,0z" fill="#3f6b3f"/>`);
    parts.push(`<path d="M60,96c10,-40 20,-40 30,0z" fill="#355c35"/>`);
    parts.push(`<path d="M340,96c8,-28 18,-28 26,0z" fill="#3f6b3f"/>`);
    parts.push(ground(96, "#3f6b3f"));
    // トンネルと橋
    parts.push(`<rect x="120" y="140" width="160" height="6" fill="#5c6a72"/>`);
    for (let i = 0; i < 5; i++) parts.push(`<rect x="${128 + i * 30}" y="146" width="4" height="30" fill="#4a4a52"/>`);
    parts.push(`<ellipse cx="120" cy="140" rx="10" ry="12" fill="#2a2a30"/>`);
    parts.push(`<rect x="105" y="128" width="30" height="18" fill="#8b8f98"/>`);
    // 列車
    parts.push(`<rect x="150" y="126" width="60" height="18" rx="2" fill="#5b8fe8"/>`);
    for (let i = 0; i < 3; i++) parts.push(`<rect x="${157 + i * 18}" y="130" width="10" height="8" fill="#cfe4f0"/>`);
    parts.push(ground(176, "#7f9a5a"));
    // 熱帯の葉
    parts.push(`<path d="M20,196q20,-20 40,0q-20,10 -40,0z" fill="#2f6b3a"/>`);
    parts.push(`<path d="M340,200q20,-20 40,0q-20,10 -40,0z" fill="#2f6b3a"/>`);
    parts.push(`<path d="M60,50q6,-6 12,0" stroke="#3a4a52" stroke-width="1.2" fill="none"/>`);
    // つる草と、もう一つの小さな峰
    parts.push(`<path d="M300,96c6,-20 14,-20 20,0z" fill="#355c35"/>`);
    parts.push(`<path d="M20,176q0,10 4,20" stroke="#2f6b3a" stroke-width="2" fill="none" opacity=".8"/>`);
    parts.push(`<path d="M380,178q0,10 4,20" stroke="#2f6b3a" stroke-width="2" fill="none" opacity=".8"/>`);
    parts.push(`<path d="M90,50q6,-6 12,0" stroke="#3a4a52" stroke-width="1.2" fill="none"/>`);
    parts.push(`<ellipse cx="200" cy="200" rx="14" ry="4" fill="#7f9a5a" opacity=".7"/>`);
    parts.push(`<circle cx="350" cy="45" r="10" fill="#f5b31c"/>`);
    // シダの茂みと、線路脇の標識
    parts.push(`<path d="M40,196q10,-16 0,-30" stroke="#2f6b3a" stroke-width="2" fill="none"/>`);
    parts.push(`<path d="M360,198q10,-16 0,-30" stroke="#2f6b3a" stroke-width="2" fill="none"/>`);
    parts.push(`<rect x="290" y="150" width="3" height="20" fill="#4a4a52"/>`);
    parts.push(`<path d="M284,150h18l-9,-8z" fill="#f5b31c"/>`);
    parts.push(`<path d="M240,60q6,-6 12,0" stroke="#3a4a52" stroke-width="1.2" fill="none"/>`);
    parts.push(`<ellipse cx="100" cy="198" rx="12" ry="4" fill="#7f9a5a" opacity=".7"/>`);
    parts.push(`<circle cx="120" cy="140" r="3" fill="#e8e2d4" opacity=".8"/>`);
    parts.push(`<circle cx="270" cy="145" r="3" fill="#e8e2d4" opacity=".8"/>`);
    return parts.join("");
  })(),

  /** リヤド・ドバイ・ドーハ・テヘラン・北京: 近代的な湾岸・大都市の高層街。 */
  modern: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 130));
    parts.push(cloud(80, 26, 0.9));
    parts.push(ground(130, "#a9966a"));
    // 高層ビル群
    const heights = [40, 70, 50, 90, 45, 65, 55];
    for (let i = 0; i < heights.length; i++) {
      const x = 40 + i * 24, h = heights[i];
      parts.push(`<rect x="${x}" y="${130 - h}" width="18" height="${h}" fill="${i % 2 ? "#5c6a72" : "#8b8f98"}"/>`);
      for (let j = 0; j < Math.floor(h / 14); j++) parts.push(`<rect x="${x + 3}" y="${130 - h + 4 + j * 14}" width="12" height="6" fill="#cfe4f0" opacity=".8"/>`);
    }
    parts.push(`<rect x="310" y="60" width="10" height="70" fill="#8b8f98"/>`);
    parts.push(`<circle cx="315" cy="55" r="8" fill="#5b8fe8"/>`);
    parts.push(ground(178, "#9a9488"));
    // 無人運転メトロ
    parts.push(`<rect x="0" y="178" width="400" height="5" fill="#5c6a72"/>`);
    parts.push(`<rect x="140" y="160" width="80" height="16" rx="3" fill="#5b8fe8"/>`);
    for (let i = 0; i < 4; i++) parts.push(`<rect x="${146 + i * 18}" y="164" width="10" height="8" fill="#cfe4f0"/>`);
    parts.push(`<rect x="0" y="150" width="400" height="4" fill="#8b8f98"/>`);
    for (let i = 0; i < 10; i++) parts.push(`<rect x="${20 + i * 40}" y="150" width="3" height="28" fill="#5c6a72"/>`);
    return parts.join("");
  })(),

  /** ベイルート・ペシャワール・昆明: 山越えの鉄道。 */
  mountainpass: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 100));
    parts.push(cloud(300, 26, 0.9));
    parts.push(mountainPeak(80, 100, 60, "#8b8f98"), mountainPeak(160, 100, 44, "#9aa0a8"), mountainPeak(320, 100, 52, "#8b8f98"));
    parts.push(ground(100, "#7f9a5a"));
    // 九十九折りの線路
    parts.push(`<path d="M40,196L100,150L60,120L140,80" fill="none" stroke="#5c6a72" stroke-width="4"/>`);
    for (let i = 0; i < 6; i++) {
      const t = i / 5;
      parts.push(`<rect x="${40 + t * 100 - 2}" y="${196 - t * 116}" width="4" height="6" fill="#4a4a52" transform="rotate(-40 ${40 + t * 100} ${196 - t * 116})"/>`);
    }
    // トンネル
    parts.push(`<ellipse cx="140" cy="80" rx="12" ry="10" fill="#2a2a30"/>`);
    parts.push(`<rect x="125" y="65" width="30" height="18" fill="#8b8f98"/>`);
    parts.push(ground(196, "#8a9a5a"));
    // ラックレールの歯型(簡略)
    for (let i = 0; i < 8; i++) parts.push(`<circle cx="${230 + i * 16}" cy="${190 - i * 3}" r="2" fill="#5c6a72"/>`);
    parts.push(`<circle cx="30" cy="50" r="11" fill="#f5b31c"/>`);
    // 沿線の松と、道しるべ
    parts.push(`<rect x="358" y="188" width="2" height="14" fill="#5a4630"/>`);
    parts.push(`<path d="M359,176l-8,14h16z" fill="#2f5f3f"/>`);
    parts.push(`<rect x="20" y="182" width="3" height="18" fill="#4a4a52"/>`);
    parts.push(`<path d="M14,182h18l-9,-8z" fill="#f5b31c"/>`);
    // 岩肌の亀裂と、遠くの鳥
    parts.push(`<path d="M70,120l10,20M280,110l-10,18" stroke="#5a6068" stroke-width="1.4" opacity=".6"/>`);
    parts.push(`<path d="M180,40q6,-6 12,0" stroke="#3a4a52" stroke-width="1.2" fill="none"/>`);
    parts.push(`<circle cx="370" cy="130" r="3" fill="#e8e2d4" opacity=".8"/>`);
    parts.push(`<rect x="330" y="185" width="20" height="4" fill="#4a4a52"/>`);
    return parts.join("");
  })(),

  /** ジャナクプル・ダッカ・ホーチミン市・プノンペン: メコン・ガンジスの田園。 */
  ricefield: (() => {
    const parts = [];
    parts.push(sky("#8fc4e8", "#cfe4f0", 106));
    parts.push(cloud(90, 26, 1), cloud(320, 22, 0.8));
    parts.push(ground(106, "#a8bd6a"));
    // 水田の畝
    for (let i = 0; i < 6; i++) parts.push(`<g stroke="#7fa8c4" stroke-width="2.4" opacity=".8"><path d="M20,${118 + i * 10}h360"/></g>`);
    // 水牛
    parts.push(`<path d="M60,178q0,-10 6,-11q2,-6 8,-4q2,-8 8,-6q2,4 -2,8l0,13z" fill="#4a4a52"/>`);
    parts.push(`<path d="M64,163q-4,-6 -8,-4" stroke="#2a2a30" stroke-width="2" fill="none"/>`);
    // 高床式の家
    parts.push(`<rect x="280" y="150" width="16" height="4" fill="#6b5330"/>`, `<rect x="330" y="150" width="16" height="4" fill="#6b5330"/>`);
    parts.push(`<rect x="278" y="130" width="70" height="20" fill="#c9a26a"/>`);
    parts.push(`<path d="M274,130l39,-16l39,16z" fill="#7a4a2a"/>`);
    parts.push(ground(193, "#a8bd6a"));
    // 小舟
    parts.push(`<path d="M120,198L160,198L152,206L128,206z" fill="#c9a26a"/>`);
    parts.push(`<path d="M140,198L140,186" stroke="#6b5330" stroke-width="1.6"/>`);
    // 田植えの人影(簡略な棒人)
    parts.push(`<path d="M40,196l0,-10M40,186l-5,4M40,186l5,4" stroke="#4a4a52" stroke-width="2" fill="none"/>`);
    parts.push(`<path d="M0,60q6,-6 12,0" stroke="#3a4a52" stroke-width="1.2" fill="none"/>`);
    // 水鳥と、もう一軒の高床式の家
    parts.push(`<path d="M180,140q6,-6 12,0" stroke="#4a4a52" stroke-width="1.2" fill="none"/>`);
    parts.push(`<rect x="20" y="160" width="10" height="3" fill="#6b5330"/>`);
    parts.push(`<rect x="18" y="146" width="40" height="14" fill="#b3854f"/>`);
    parts.push(`<path d="M16,146l22,-10l22,10z" fill="#5a4630"/>`);
    parts.push(`<circle cx="370" cy="45" r="9" fill="#f5b31c" opacity=".8"/>`);
    parts.push(`<path d="M100,110q6,-6 12,0" stroke="#3a4a52" stroke-width="1.2" fill="none"/>`);
    return parts.join("");
  })(),

  /** イルクーツク・ウラン・ウデ: シベリアのタイガと凍った湖。 */
  taiga: (() => {
    const parts = [];
    parts.push(sky("#a9c6de", "#e0eef4", 100));
    parts.push(cloud(300, 24, 0.8));
    parts.push(`<path d="M0,100c50,-14 100,-14 150,0c50,-12 100,-12 250,0v6H0z" fill="#355c35"/>`);
    parts.push(ground(100, "#e0eef4"));
    // 凍ったバイカル湖(氷のひび割れ)
    parts.push(`<path d="M0,120q60,-6 120,0t120,0t160,0" fill="none" stroke="#bcd6e2" stroke-width="2" opacity=".8"/>`);
    parts.push(`<path d="M40,110L60,150M180,105L200,155M320,112L340,152" stroke="#bcd6e2" stroke-width="1.6" opacity=".7"/>`);
    // 針葉樹の並び
    for (let i = 0; i < 5; i++) {
      const x = 20 + i * 18;
      parts.push(`<rect x="${x - 1}" y="172" width="2" height="10" fill="#5a4630"/>`);
      parts.push(`<path d="M${x},150L${x - 9},172h18z" fill="#2f5f3f"/>`);
      parts.push(`<path d="M${x},158L${x - 7},176h14z" fill="#355c35"/>`);
    }
    parts.push(ground(182, "#e0eef4"));
    // 商人の邸宅(木造)
    parts.push(`<rect x="300" y="150" width="70" height="32" fill="#8b6a1a"/>`);
    parts.push(`<path d="M296,150l39,-14l39,14z" fill="#5a4630"/>`);
    for (let i = 0; i < 3; i++) parts.push(`<rect x="${310 + i * 20}" y="160" width="10" height="14" fill="#3f8fc4"/>`);
    parts.push(`<circle cx="60" cy="40" r="10" fill="#f5b31c"/>`);
    // 煙突の煙と、湖畔の柵
    parts.push(`<path d="M320,150q-4,-10 0,-16" stroke="#e6e9ea" stroke-width="2.4" fill="none" opacity=".7"/>`);
    parts.push(`<rect x="70" y="176" width="3" height="10" fill="#5a4630"/>`);
    parts.push(`<rect x="90" y="176" width="3" height="10" fill="#5a4630"/>`);
    parts.push(`<line x1="70" y1="178" x2="93" y2="178" stroke="#5a4630" stroke-width="1.6"/>`);
    // 雪の吹きだまりと、遠くの鳥
    parts.push(`<ellipse cx="150" cy="200" rx="20" ry="5" fill="#f2f6f8" opacity=".8"/>`);
    parts.push(`<ellipse cx="250" cy="204" rx="16" ry="4" fill="#f2f6f8" opacity=".8"/>`);
    parts.push(`<path d="M200,55q6,-6 12,0" stroke="#4a4a52" stroke-width="1.2" fill="none"/>`);
    parts.push(`<rect x="10" y="190" width="3" height="16" fill="#5a4630"/>`);
    return parts.join("");
  })(),
};
