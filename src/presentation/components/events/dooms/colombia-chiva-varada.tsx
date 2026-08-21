/**
 * 山道のカーブでチバが立ち往生する(コロンビア盤の厄災 1/7・fine)。
 *
 * 7枚の構図表(描き始める前に固定):
 *
 * | id        | 時刻     | 視点       | 主役           | 人数 | 地色      | この1枚では使わない |
 * |-----------|----------|------------|----------------|------|-----------|----------------------|
 * | chiva     | 午後の昼 | 山腹の道・横 | 湯気を上げるチバ | 2    | 緑山+土道 | 雨・水               |
 * | roya      | 湿った曇り | 畝の中・接写 | 葉の橙斑       | 1    | 深緑      | 晴れの青             |
 * | creciente | 雨上がりの鉛色 | 川岸・横 | 茶色の急流     | 1+騾馬 | 茶+灰   | 緑                   |
 * | via       | 朝の白い光 | 家の正面   | 杭と点線ルート | 2    | 土+灰     | 橙以外の強調色       |
 * | tejo      | 夜・屋内  | コート正面 | 的と金の火花   | 3    | 藍+赤茶   | 屋外・空             |
 * | vuelo     | 雲の中    | 空         | 旋回する機体   | 0    | 白+藍     | 地上・人             |
 * | raponazo  | 真昼の強光 | 街路・横   | 走る影と電話   | 3    | 暖色      | 犯人の色(無彩色に) |
 *
 * この絵はつづら折りの山腹で、色とりどりのチバ(乗合バス)がボンネットを開けて
 * 湯気を吹いている。運転手は道具箱を前に腕を組み、屋根の乗客は荷のあいだで待つ。
 * 動くのは**湯気・運転手の首の傾き・屋根の乗客の足・遠くの鳥**。
 * 止めた状態でも、開いたボンネット+立ちのぼる湯気で「故障」と分かる。
 */
export function ColombiaChivaVarada() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 午後の明るい空と遠い山並み */}
      <rect width="400" height="210" fill="#9fc8e0" />
      <rect y="60" width="400" height="30" fill="#c2d8e0" />
      <path d="M0,90 L60,44 L120,84 L180,52 L250,88 L310,58 L400,86 V210 H0 Z" fill="#5f7a70" />
      <path d="M0,110 L80,74 L150,104 L230,78 L320,108 L400,84 V210 H0 Z" fill="#4f7048" />
      <g fill="#f6efe2" opacity="0.8">
        <ellipse cx="70" cy="30" rx="20" ry="7" />
        <ellipse cx="86" cy="34" rx="13" ry="5" />
        <ellipse cx="320" cy="24" rx="17" ry="6" />
      </g>

      {/* 谷側の中景:下の段のつづら折りと林 */}
      <path d="M0,150 q90,-18 190,-8 q110,10 210,-16 V210 H0 Z" fill="#457a44" />
      <path d="M0,196 q60,-14 120,-10 q-40,-8 -80,-6 q50,-12 96,-8" stroke="#c2ab72" strokeWidth="5" fill="none" opacity="0.85" />
      <g fill="#2d5f3f">
        <ellipse cx="330" cy="166" rx="16" ry="11" />
        <ellipse cx="362" cy="176" rx="18" ry="12" />
        <ellipse cx="304" cy="180" rx="14" ry="10" />
        <ellipse cx="20" cy="168" rx="14" ry="10" />
      </g>

      {/* 山腹の道(手前) */}
      <path d="M0,138 L400,118 v34 L0,176 Z" fill="#c2ab72" />
      <path d="M0,144 L400,124" stroke="#a8925f" strokeWidth="3" fill="none" opacity="0.7" />
      <path d="M0,170 L400,146" stroke="#a8925f" strokeWidth="2" fill="none" opacity="0.5" />
      {/* 道端の白い縁石(崖側) */}
      <g fill="#e8e4d4">
        <rect x="18" y="164" width="10" height="7" transform="rotate(-3 23 167)" />
        <rect x="66" y="161" width="10" height="7" transform="rotate(-3 71 164)" />
        <rect x="304" y="148" width="10" height="7" transform="rotate(-3 309 151)" />
        <rect x="352" y="146" width="10" height="7" transform="rotate(-3 357 149)" />
      </g>

      {/* チバ本体(中央より右。左向き=登り) */}
      <g>
        <ellipse cx="212" cy="160" rx="72" ry="8" fill="#000" opacity="0.18" />
        {/* 車体:黄色地に赤と青の縞 */}
        <rect x="150" y="108" width="124" height="46" rx="6" fill="#f5b31c" />
        <rect x="150" y="118" width="124" height="8" fill="#c8452f" />
        <rect x="150" y="132" width="124" height="8" fill="#3f6f9a" />
        {/* 開いた窓の列(壁が無い開放側面) */}
        <g fill="#7a5c30">
          <rect x="160" y="112" width="18" height="16" rx="2" />
          <rect x="184" y="112" width="18" height="16" rx="2" />
          <rect x="208" y="112" width="18" height="16" rx="2" />
          <rect x="232" y="112" width="18" height="16" rx="2" />
        </g>
        <g stroke="#5f4526" strokeWidth="2" fill="none">
          <path d="M160,128 h90" opacity="0.7" />
        </g>
        {/* 屋根と荷 */}
        <rect x="146" y="100" width="132" height="10" rx="4" fill="#c8452f" />
        <rect x="158" y="90" width="26" height="12" rx="2" fill="#b08a4f" />
        <rect x="190" y="86" width="30" height="16" rx="2" fill="#8a6b3a" />
        <path d="M228,102 v-9 q0,-3 3,-3 h8 q3,0 3,3 v9 z" fill="#c8a86a" />
        <path d="M231,90 q3.5,-3 7,0" stroke="#8a6b3a" strokeWidth="1.6" fill="none" />
        {/* 前部(左):開いたボンネット */}
        <path d="M150,154 v-32 q0,-8 -14,-8 h-14 q-8,0 -8,10 v30 z" fill="#f5b31c" />
        <rect x="114" y="140" width="36" height="8" fill="#c8452f" />
        <circle cx="121" cy="128" r="4.4" fill="#e8e4d4" />
        {/* ボンネットのふた(開いて立つ) */}
        <path d="M116,116 l26,-14 l6,5 l-26,12 z" fill="#e0a416" />
        <path d="M116,116 l26,-14" stroke="#8a6b3a" strokeWidth="1.6" fill="none" />
        {/* 車輪 */}
        <g fill="#33302c">
          <circle cx="170" cy="156" r="11" />
          <circle cx="248" cy="152" r="11" />
          <circle cx="128" cy="158" r="10" />
        </g>
        <g fill="#8a8f92">
          <circle cx="170" cy="156" r="4" />
          <circle cx="248" cy="152" r="4" />
          <circle cx="128" cy="158" r="3.6" />
        </g>
      </g>

      {/* エンジンからの湯気(主役)。**止めても見える=基準が「出ている」状態** */}
      <g className="cvr-steam" fill="#e8eee8">
        <ellipse cx="122" cy="104" rx="7" ry="5" opacity="0.9" />
        <ellipse cx="128" cy="92" rx="9" ry="6" opacity="0.8" />
        <ellipse cx="122" cy="79" rx="12" ry="8" opacity="0.7" />
        <ellipse cx="130" cy="64" rx="15" ry="9" opacity="0.55" />
      </g>
      <g className="cvr-steam2" fill="#e8eee8">
        <ellipse cx="112" cy="98" rx="5" ry="4" opacity="0.8" />
        <ellipse cx="108" cy="86" rx="8" ry="5" opacity="0.6" />
        <ellipse cx="112" cy="72" rx="10" ry="7" opacity="0.45" />
      </g>

      {/* 運転手:青シャツ+帽子。道具箱を前に、首をかしげる */}
      <g transform="translate(92,0)">
        <ellipse cx="0" cy="171" rx="12" ry="3.4" fill="#000" opacity="0.18" />
        <rect x="-4.4" y="150" width="4" height="20" fill="#3f3428" />
        <rect x="0.8" y="150" width="4" height="20" fill="#3f3428" />
        <path d="M-7,132 h14 l2,20 h-18 z" fill="#3f6f9a" />
        <g className="cvr-head">
          <circle cx="0" cy="126" r="7.4" fill="#c98f5f" />
          <path d="M-8,123 a8,8 0 0 1 16,0 z" fill="#e8e4d4" />
          <rect x="-9" y="121" width="18" height="2.6" rx="1.2" fill="#e8e4d4" />
        </g>
        {/* 腕組み */}
        <path d="M-7,138 q7,5 14,0" stroke="#3f6f9a" strokeWidth="5" fill="none" strokeLinecap="round" />
        {/* 道具箱と転がるレンチ */}
        <rect x="-24" y="162" width="16" height="9" rx="1.6" fill="#8a4a30" />
        <path d="M-22,162 v-3 h12 v3" stroke="#5f3320" strokeWidth="2" fill="none" />
        <path d="M-34,170 h9 M-34,170 a2.4,2.4 0 1 0 -0.1,0.1 M-25,170 a2.4,2.4 0 1 1 0.1,0.1" stroke="#8a8f92" strokeWidth="2" fill="none" />
      </g>

      {/* 屋根の上で待つ乗客:赤いルアナ。足をぶらぶら */}
      <g transform="translate(206,72)">
        <circle cx="0" cy="0" r="6.6" fill="#8a6a4a" />
        <path d="M-7,-2.6 a7,7 0 0 1 14,0 z" fill="#5a4630" />
        <path d="M-9,6 h18 l3,12 h-24 z" fill="#c8452f" />
        <path d="M-9,10 h21" stroke="#8a2f24" strokeWidth="1.6" />
        <g className="cvr-legs">
          <rect x="-6" y="17" width="4.4" height="12" rx="2" fill="#3f3428" />
          <rect x="2" y="17" width="4.4" height="12" rx="2" fill="#3f3428" />
        </g>
      </g>

      {/* 崖側に立つ距離標柱 */}
      <rect x="330" y="128" width="4" height="18" fill="#e8e4d4" transform="rotate(-3 332 137)" />
      <rect x="329" y="126" width="6" height="5" fill="#c8452f" transform="rotate(-3 332 128)" />

      {/* 遠くの鳥 */}
      <g className="cvr-bird" stroke="#3a3a34" strokeWidth="1.6" fill="none" strokeLinecap="round">
        <path d="M46,52 q3.5,-4.5 7,0 q3.5,-4.5 7,0" />
      </g>

      <style>{`
        .cvr-steam {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: cvr-puff 3.6s ease-in-out infinite;
        }
        .cvr-steam2 {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: cvr-puff 3.6s ease-in-out 1.4s infinite;
        }
        @keyframes cvr-puff {
          0%, 100% { transform: translateY(0) scale(1); opacity: 1; }
          45%      { transform: translateY(-7px) scale(1.08); opacity: 0.75; }
        }
        .cvr-head {
          transform-box: fill-box;
          transform-origin: 50% 90%;
          animation: cvr-tilt 4.2s ease-in-out infinite;
        }
        @keyframes cvr-tilt {
          0%, 100% { transform: rotate(0deg); }
          55%      { transform: rotate(-9deg); }
        }
        .cvr-legs {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: cvr-swing 2.6s ease-in-out infinite;
        }
        @keyframes cvr-swing {
          0%, 100% { transform: rotate(4deg); }
          50%      { transform: rotate(-4deg); }
        }
        .cvr-bird { animation: cvr-glide 9s linear infinite; }
        @keyframes cvr-glide {
          0%   { transform: translate(0, 0); }
          50%  { transform: translate(150px, -8px); }
          100% { transform: translate(300px, 2px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cvr-steam, .cvr-steam2, .cvr-head, .cvr-legs, .cvr-bird {
            animation: none;
          }
        }
      `}</style>
    </svg>
  );
}
