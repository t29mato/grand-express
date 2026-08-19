/**
 * トコロシュに化かされる。線路の土手沿いの帰り道が、どの曲がり角でも同じ景色に見え、
 * 真夜中を過ぎてようやく、同じ信号所を三度通り過ぎていたと分かる。
 *
 * トコロシュは**恐ろしい怪物ではなく、度の過ぎたいたずら者**として描く。
 * 小さく、毛深く、丸い目。牙も爪も描かない。懐中電灯の光が届くと、
 * にやりとしたまま次の信号所の陰へ隠れる——捕まらないことそのものが遊びなのである。
 *
 * 構図: **まったく同じ形の信号所が3つ、同じ大きさで並んでいる。**
 * 遠近をつけないことで「近づいたのではなく、同じ所へ戻ってきた」ことを出す。
 * 右奥の小屋の窓には、**脚を煉瓦で持ち上げた寝台**が影で見える——
 * トコロシュに手が届かないようにする、いまも残る用心である。
 *
 * 動くのは4つ: 左右に振られる懐中電灯の光、光を避けて跳ぶトコロシュ、
 * その目のまばたき、草むらのざわめき。
 * 止めた状態でも「同じ信号所が3つあり、光の縁に小さな影がいる」で伝わる。
 *
 * (カナダ盤の「堂々巡り」とは別物にする: あちらは**森・円を描く足跡・姿を見せない**。
 *  こちらは**線路沿い・同じ建物の反復・姿は見えるが捕まらない**)
 */
export function SouthafricaTokolosheAstray() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 真夜中の空。 */}
      <rect width="400" height="210" fill="#1b2440" />
      <rect width="400" height="72" fill="#161e36" />
      <g fill="#e8e4d0">
        <circle cx="30" cy="26" r="1.5" opacity="0.9" />
        <circle cx="88" cy="14" r="1.2" opacity="0.7" />
        <circle cx="146" cy="34" r="1.4" opacity="0.85" />
        <circle cx="212" cy="18" r="1.2" opacity="0.7" />
        <circle cx="268" cy="40" r="1.5" opacity="0.9" />
        <circle cx="336" cy="22" r="1.2" opacity="0.75" />
        <circle cx="380" cy="48" r="1.4" opacity="0.8" />
        <circle cx="118" cy="58" r="1.1" opacity="0.6" />
      </g>
      <circle cx="62" cy="44" r="11" fill="#e8e4d0" opacity="0.9" />
      <circle cx="58" cy="41" r="3" fill="#cbc7b2" opacity="0.5" />

      {/* 遠くの丘と、ひとつだけ灯る町の明かり。 */}
      <path d="M0,86 q80,-16 164,-6 q92,12 236,-8 v24 H0z" fill="#212b48" />
      <g fill="#f5b31c" opacity="0.55">
        <circle cx="106" cy="84" r="1.6" />
        <circle cx="122" cy="87" r="1.2" />
        <circle cx="286" cy="82" r="1.4" />
      </g>

      {/* ── 線路の土手。上に線路が走り、その脇に小道がある。 */}
      <rect y="96" width="400" height="114" fill="#1e2a2a" />
      <path d="M0,110 q100,-10 200,0 q100,10 200,-4 v18 H0z" fill="#27332f" />
      <rect y="112" width="400" height="10" fill="#2b2f26" />
      <g fill="#3a3a2e">
        <rect x="6" y="113" width="12" height="5" />
        <rect x="42" y="113" width="12" height="5" />
        <rect x="78" y="113" width="12" height="5" />
        <rect x="114" y="113" width="12" height="5" />
        <rect x="150" y="113" width="12" height="5" />
        <rect x="186" y="113" width="12" height="5" />
        <rect x="222" y="113" width="12" height="5" />
        <rect x="258" y="113" width="12" height="5" />
        <rect x="294" y="113" width="12" height="5" />
        <rect x="330" y="113" width="12" height="5" />
        <rect x="366" y="113" width="12" height="5" />
      </g>
      <rect y="110" width="400" height="2.6" fill="#4f5248" />
      <rect y="120" width="400" height="2.2" fill="#454838" />
      {/* 土手の斜面と小道。 */}
      <path d="M0,124 q100,8 200,2 q100,-6 200,4 v22 H0z" fill="#232f2c" />
      <path d="M0,150 q100,10 200,2 q100,-8 200,6 v52 H0z" fill="#2c3a30" />
      <path d="M0,168 q100,10 200,0 q100,-10 200,4 v10 q-100,-12 -200,-2 q-100,10 -200,-2z" fill="#3d4a38" opacity="0.85" />

      {/* ── まったく同じ信号所が3つ。**大きさも形も同じ。** */}
      <g>
        <rect x="34" y="88" width="42" height="30" fill="#2f3a44" />
        <path d="M30,88 h50 l-6,-9 h-38z" fill="#3f4a52" />
        <rect x="42" y="95" width="12" height="10" fill="#4f5f4a" />
        <rect x="58" y="95" width="10" height="10" fill="#4f5f4a" />
        <rect x="48" y="108" width="12" height="10" fill="#1e2429" />
        <circle cx="80" cy="84" r="3.4" fill="#c9a83c" opacity="0.8" />
        <rect x="79" y="84" width="2" height="34" fill="#39424a" />
      </g>
      <g>
        <rect x="164" y="88" width="42" height="30" fill="#2f3a44" />
        <path d="M160,88 h50 l-6,-9 h-38z" fill="#3f4a52" />
        <rect x="172" y="95" width="12" height="10" fill="#4f5f4a" />
        <rect x="188" y="95" width="10" height="10" fill="#4f5f4a" />
        <rect x="178" y="108" width="12" height="10" fill="#1e2429" />
        <circle cx="210" cy="84" r="3.4" fill="#c9a83c" opacity="0.8" />
        <rect x="209" y="84" width="2" height="34" fill="#39424a" />
      </g>
      <g>
        <rect x="294" y="88" width="42" height="30" fill="#2f3a44" />
        <path d="M290,88 h50 l-6,-9 h-38z" fill="#3f4a52" />
        <rect x="302" y="95" width="12" height="10" fill="#4f5f4a" />
        <rect x="318" y="95" width="10" height="10" fill="#4f5f4a" />
        <rect x="308" y="108" width="12" height="10" fill="#1e2429" />
        <circle cx="340" cy="84" r="3.4" fill="#c9a83c" opacity="0.8" />
        <rect x="339" y="84" width="2" height="34" fill="#39424a" />
      </g>

      {/* ── 右奥の小屋。窓に、**脚を煉瓦で持ち上げた寝台**の影。 */}
      <g>
        <rect x="336" y="116" width="64" height="42" fill="#232c34" />
        <path d="M332,116 h72 l-10,-12 h-52z" fill="#2f3a44" />
        <rect x="344" y="124" width="48" height="30" fill="#f2c869" />
        <rect x="344" y="124" width="48" height="3" fill="#c99f3c" />
        <g fill="#3a2f22">
          {/* 寝台。**脚の下に煉瓦を噛ませて持ち上げてある。** */}
          <rect x="350" y="136" width="36" height="5" />
          <rect x="350" y="131" width="36" height="5" rx="2" />
          <rect x="350" y="127" width="8" height="6" rx="2" />
          <rect x="352" y="141" width="4.4" height="6" />
          <rect x="380" y="141" width="4.4" height="6" />
        </g>
        <g fill="#8a4a34">
          <rect x="349" y="147" width="11" height="5" />
          <rect x="377" y="147" width="11" height="5" />
        </g>
        <g stroke="#6b3a28" strokeWidth="0.9" fill="none">
          <path d="M354.5,147 v5 M382.5,147 v5" />
        </g>
      </g>

      {/* ── 帰り道の人。背中を向けて立ち、懐中電灯を持っている。 */}
      <g>
        <g fill="#20242e">
          <rect x="176" y="182" width="6" height="20" />
          <rect x="187" y="182" width="6" height="20" />
        </g>
        <path d="M173,158 h23 l3,26 h-29z" fill="#4a5f7a" />
        <circle cx="185" cy="150" r="8.4" fill="#4a352a" />
        <path d="M176,148 q9,-9 18,-1 h-18z" fill="#2f3a44" />
        {/* 荷物を提げた左手。 */}
        <path d="M174,166 q-8,4 -9,12" stroke="#4a352a" strokeWidth="4.6" fill="none" strokeLinecap="round" />
        <rect x="158" y="178" width="14" height="11" rx="2" fill="#5f4a2c" />
        {/* 懐中電灯を持った右手。**光はここから出る。** */}
        <path d="M196,166 q10,1 13,7" stroke="#4a352a" strokeWidth="4.6" fill="none" strokeLinecap="round" />
        <rect x="207" y="170" width="11" height="6" rx="1.6" fill="#8a8578" />
      </g>

      {/* ── 懐中電灯の光。左右にゆっくり振られる。 */}
      <g className="sa-tk-beam">
        <path d="M216,173 L332,128 L340,168z" fill="#f8e6a8" opacity="0.2" />
        <path d="M216,173 L330,142 L334,164z" fill="#fbf0c8" opacity="0.22" />
      </g>

      {/* ── トコロシュ。小さく、毛深く、丸い目。牙も爪も描かない。
           光が来ると三つ目の信号所の陰へ隠れ、また顔を出す。 */}
      <g className="sa-tk-toko">
        <ellipse cx="286" cy="140" rx="14" ry="4" fill="#000" opacity="0.3" />
        {/* もじゃもじゃの体。輪郭をぎざぎざにして毛深さを出す。 */}
        <path d="M274,138 q-3,-10 3,-16 q-4,-4 1,-6 q2,-6 8,-6 q6,0 8,6 q5,2 1,6 q6,6 3,16z" fill="#5f4a34" />
        <path d="M275,124 l-4,-3 l5,-1 M297,124 l4,-3 l-5,-1 M279,113 l-3,-4 l5,0 M293,113 l3,-4 l-5,0" fill="none" stroke="#5f4a34" strokeWidth="2" strokeLinecap="round" />
        <path d="M278,138 q8,-5 16,0z" fill="#4a3a28" />
        {/* 短い腕と足。 */}
        <path d="M275,128 q-6,3 -6,8" stroke="#5f4a34" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M297,128 q6,3 6,8" stroke="#5f4a34" strokeWidth="4" fill="none" strokeLinecap="round" />
        {/* 顔。丸い目と、いたずらの笑み。 */}
        <ellipse cx="286" cy="120" rx="9" ry="8" fill="#7a5f42" />
        <g className="sa-tk-eyes" fill="#f6efe2">
          <circle cx="282.4" cy="119" r="3" />
          <circle cx="289.6" cy="119" r="3" />
        </g>
        <g fill="#20242e">
          <circle cx="283" cy="119.4" r="1.4" />
          <circle cx="290.2" cy="119.4" r="1.4" />
        </g>
        <path d="M282,125 q4,3.4 8,0" stroke="#3f2f20" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      </g>

      {/* ── 小道わきの草むら。風でざわめく。 */}
      <g className="sa-tk-grass-a" stroke="#3f5240" strokeWidth="2.4" strokeLinecap="round" fill="none">
        <path d="M22,196 v-16 M34,198 v-12 M46,194 v-18 M104,200 v-14 M116,196 v-18" />
      </g>
      <g className="sa-tk-grass-b" stroke="#374a38" strokeWidth="2.2" strokeLinecap="round" fill="none">
        <path d="M244,200 v-15 M256,196 v-19 M268,202 v-13 M330,198 v-16 M344,202 v-12 M356,196 v-18" />
      </g>

      {/* 手前の足跡。同じところを何度も踏んだ跡。 */}
      <g fill="#20291f" opacity="0.55">
        <ellipse cx="150" cy="206" rx="6" ry="3.4" />
        <ellipse cx="166" cy="200" rx="6" ry="3.4" />
        <ellipse cx="182" cy="206" rx="6" ry="3.4" />
        <ellipse cx="198" cy="200" rx="6" ry="3.4" />
        <ellipse cx="214" cy="206" rx="6" ry="3.4" />
      </g>

      <style>{`
        .sa-tk-beam {
          transform-box: fill-box;
          transform-origin: 0% 100%;
          animation: sa-tk-sweep 6s ease-in-out infinite;
        }
        @keyframes sa-tk-sweep {
          0%, 100% { transform: rotate(10deg); }
          50% { transform: rotate(-14deg); }
        }
        .sa-tk-toko {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: sa-tk-duck 6s ease-in-out infinite;
        }
        @keyframes sa-tk-duck {
          0%, 100% { transform: translate(0, 0); opacity: 1; }
          34% { transform: translate(2px, 0); opacity: 1; }
          46% { transform: translate(16px, 12px); opacity: 0.15; }
          62% { transform: translate(16px, 12px); opacity: 0.15; }
          76% { transform: translate(-4px, -2px); opacity: 1; }
        }
        .sa-tk-eyes { animation: sa-tk-blink 4.2s linear infinite; }
        @keyframes sa-tk-blink {
          0%, 92%, 100% { opacity: 1; }
          95% { opacity: 0.05; }
        }
        .sa-tk-grass-a, .sa-tk-grass-b {
          transform-box: fill-box;
          transform-origin: 50% 100%;
        }
        .sa-tk-grass-a { animation: sa-tk-rustle 3.4s ease-in-out infinite; }
        .sa-tk-grass-b { animation: sa-tk-rustle 4.2s ease-in-out -1.6s infinite; }
        @keyframes sa-tk-rustle {
          0%, 100% { transform: skewX(-5deg); }
          50% { transform: skewX(7deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .sa-tk-beam,
          .sa-tk-toko,
          .sa-tk-eyes,
          .sa-tk-grass-a,
          .sa-tk-grass-b { animation: none; }
        }
      `}</style>
    </svg>
  );
}
