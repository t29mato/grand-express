/**
 * 南部の水路で天候によりフェリーが迂回する(teleport)。
 *
 * 本文の芯は「狭い水路の風とうねりで、船長は一晩別の入り江に避難した。
 * この海岸の時刻表は、まさにこのために余裕を大きく取って組まれている」。
 *
 * 構図表:夜(薄暮)/ 水路の遠景 / 主役は**折れ曲がる航路の点線と、
 * 別の入り江へ向かうフェリー** / 人0 / 地色は藍。7枚で唯一の海の絵。
 *
 * 動くのは**うねりに合わせて傾ぐフェリー・折れて伸びる航路の点線・
 * 流れる雲と白波**。止めた状態でも、予定の航路(まっすぐな薄い点線)から
 * 外れて入り江に入った船の位置で「迂回」と分かる。
 */
export function ChileBarcoDesviado() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 薄暮の水路。空の下端だけ残光。 */}
      <rect width="400" height="210" fill="#26304c" />
      <rect y="40" width="400" height="22" fill="#2f3a58" />
      <rect y="62" width="400" height="14" fill="#4a4a6a" />
      <rect y="76" width="400" height="8" fill="#8a6a72" />

      {/* 雲の切れ間の星 */}
      <g fill="#dfe4f0" opacity="0.7">
        <circle cx="216" cy="12" r="1.4" />
        <circle cx="244" cy="22" r="1.1" />
        <circle cx="196" cy="30" r="1" />
        <circle cx="380" cy="10" r="1.2" />
        <circle cx="20" cy="8" r="1.1" />
      </g>

      {/* ちぎれて流れる雲 */}
      <g className="cbd-cloud" fill="#1f2840" opacity="0.9">
        <ellipse cx="80" cy="26" rx="60" ry="10" />
        <ellipse cx="150" cy="18" rx="40" ry="8" />
        <ellipse cx="300" cy="34" rx="70" ry="11" />
      </g>

      {/* 両岸の黒い島影。水路の狭さを見せる。 */}
      <path d="M0,84l60,-26l52,20l30,-10l24,16H0z" fill="#1a2233" />
      <path d="M400,84l-52,-30l-44,22l-28,-8l-30,16z" fill="#1f2838" />
      {/* 右の島影の陰に入り江 */}
      <path d="M400,84v50l-90,-6q-18,-2 -24,-14q10,-18 34,-24q40,-10 80,-6z" fill="#243044" />

      {/* 海 */}
      <rect y="84" width="400" height="126" fill="#1f3a56" />
      <rect y="84" width="400" height="30" fill="#1a3049" />
      <rect y="150" width="400" height="60" fill="#24425f" />

      {/* 灯台の光(左の岬)。一定の間隔で回る。 */}
      <g>
        <path d="M28,66v-14" stroke="#33302c" strokeWidth="4" fill="none" />
        <rect x="24" y="48" width="8" height="6" fill="#e8443f" />
        <g className="cbd-beam" fill="#f2f0c8" opacity="0.35">
          <path d="M32,50l70,-12v18l-70,4z" />
        </g>
        <circle cx="28" cy="51" r="2.4" fill="#f5d34c" />
      </g>

      {/* 予定していた航路:まっすぐな薄い点線 */}
      <path
        d="M40,118q160,-8 340,-4"
        stroke="#6b86a8"
        strokeWidth="2"
        strokeDasharray="8 10"
        opacity="0.45"
        fill="none"
      />
      {/* 実際の航路:途中で折れて入り江へ。**引かれていく点線。** */}
      <path
        className="cbd-route"
        d="M40,118q80,-4 140,0q40,3 60,14q22,12 52,14q26,2 56,-8"
        stroke="#9fd4e4"
        strokeWidth="2.6"
        strokeDasharray="7 8"
        fill="none"
      />

      {/* 白波。風下へ走る。 */}
      <g className="cbd-caps" fill="#dfeef6" opacity="0.8">
        <path d="M60,132q8,-7 17,-2q-7,-1 -10,3q-3,3 -7,-1z" />
        <path d="M150,156q8,-7 17,-2q-7,-1 -10,3q-3,3 -7,-1z" />
        <path d="M96,176q8,-7 17,-2q-7,-1 -10,3q-3,3 -7,-1z" />
        <path d="M250,180q8,-7 17,-2q-7,-1 -10,3q-3,3 -7,-1z" />
        <path d="M210,120q7,-6 15,-2q-6,-1 -9,3q-3,2 -6,-1z" />
      </g>

      {/* フェリー。うねりで傾ぎながら入り江へ向かう。 */}
      <g className="cbd-ferry">
        <g className="cbd-pitch">
          {/* 船体 */}
          <path d="M-46,0h92l-10,14h-72z" fill="#3f6f9a" />
          <rect x="-46" y="-4" width="92" height="5" fill="#2f5578" />
          {/* 車両甲板の張り出しと操舵室 */}
          <rect x="-30" y="-16" width="52" height="12" fill="#d8d8cc" />
          <g fill="#2f3a48">
            <rect x="-24" y="-13" width="7" height="6" />
            <rect x="-12" y="-13" width="7" height="6" />
            <rect x="0" y="-13" width="7" height="6" />
            <rect x="12" y="-13" width="7" height="6" />
          </g>
          <rect x="22" y="-26" width="16" height="10" fill="#e8e4d8" />
          <rect x="25" y="-23" width="10" height="5" fill="#33424e" />
          <rect x="30" y="-34" width="6" height="8" fill="#c8452f" />
          <rect x="30" y="-34" width="6" height="2.6" fill="#33302c" />
          {/* 航海灯 */}
          <circle cx="-42" cy="-6" r="2" fill="#e8443f" />
          <circle cx="42" cy="-6" r="2" fill="#4f9a5f" />
          {/* 窓の灯り:夜通し走っている */}
          <g fill="#f5d34c" opacity="0.9">
            <rect x="-40" y="2" width="5" height="4" />
            <rect x="-28" y="2" width="5" height="4" />
            <rect x="-16" y="2" width="5" height="4" />
          </g>
        </g>
        {/* 航跡 */}
        <path className="cbd-wake" d="M-48,10q-20,4 -40,2" stroke="#7fb8c8" strokeWidth="3" opacity="0.5" fill="none" />
      </g>

      {/* 入り江の岸の小さな灯り。**避難先には人の暮らしがある。** */}
      <g fill="#f5d34c" opacity="0.85">
        <rect x="342" y="106" width="4" height="3" />
        <rect x="356" y="110" width="4" height="3" />
        <rect x="372" y="104" width="4" height="3" />
      </g>
      <path d="M344,120q2,8 0,16M358,122q2,7 0,13" stroke="#f5d34c" strokeWidth="1.2" opacity="0.3" fill="none" />

      {/* 傾いた航路ブイ。海の荒れを岸からも見せる。 */}
      <g className="cbd-buoy">
        <path d="M0,0l4,-12" stroke="#c8452f" strokeWidth="3.4" fill="none" />
        <circle cx="5" cy="-13" r="2.6" fill="#f5b31c" />
        <path d="M-6,2q6,3 13,0" stroke="#7fb8c8" strokeWidth="2" opacity="0.6" fill="none" />
      </g>

      {/* 手前の岩礁 */}
      <path d="M0,196l30,-12l36,10l22,-6l30,12v10H0z" fill="#141c2c" />
      <path d="M330,204l24,-10l30,8l16,-4v12h-70z" fill="#182234" />

      <style>{`
        .cbd-ferry { animation: cbd-sail 7s ease-in-out infinite; }
        @keyframes cbd-sail {
          0% { transform: translate(96px, 108px); }
          40% { transform: translate(196px, 118px); }
          75%, 100% { transform: translate(300px, 132px); }
        }
        .cbd-pitch {
          transform-box: fill-box;
          transform-origin: 50% 60%;
          animation: cbd-roll 2.4s ease-in-out infinite;
        }
        @keyframes cbd-roll {
          0%, 100% { transform: rotate(-4deg) translateY(0); }
          50% { transform: rotate(3deg) translateY(-3px); }
        }
        .cbd-route {
          stroke-dashoffset: 210;
          animation: cbd-draw 7s linear infinite;
        }
        @keyframes cbd-draw {
          0% { stroke-dashoffset: 210; }
          75%, 100% { stroke-dashoffset: 0; }
        }
        .cbd-caps { animation: cbd-scud 2.4s ease-in-out infinite; }
        @keyframes cbd-scud {
          0%, 100% { transform: translateX(0); opacity: 0.8; }
          50% { transform: translateX(-10px); opacity: 0.5; }
        }
        .cbd-cloud { animation: cbd-wind 5s linear infinite; }
        @keyframes cbd-wind {
          0% { transform: translateX(0); }
          100% { transform: translateX(-24px); }
        }
        .cbd-beam {
          transform-box: fill-box;
          transform-origin: 0% 50%;
          animation: cbd-sweep 4.2s ease-in-out infinite;
        }
        @keyframes cbd-sweep {
          0%, 100% { opacity: 0.1; transform: rotate(6deg); }
          50% { opacity: 0.4; transform: rotate(-4deg); }
        }
        .cbd-wake { animation: cbd-fade 2.4s ease-in-out infinite; }
        @keyframes cbd-fade {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.2; }
        }
        .cbd-buoy {
          transform-box: fill-box;
          transform-origin: 30% 90%;
          animation: cbd-bob 2.4s ease-in-out infinite;
        }
        @keyframes cbd-bob {
          0%, 100% { transform: translate(60px, 160px) rotate(-10deg); }
          50% { transform: translate(60px, 156px) rotate(12deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .cbd-ferry, .cbd-pitch, .cbd-route, .cbd-caps, .cbd-cloud, .cbd-beam, .cbd-wake, .cbd-buoy {
            animation: none;
          }
          /* 船は入り江に入った位置、航路の点線は引ききった状態で止める。 */
          .cbd-ferry { transform: translate(300px, 132px); }
          .cbd-route { stroke-dashoffset: 0; }
          .cbd-buoy {
            transform: translate(60px, 160px) rotate(-10deg);
            transform-box: fill-box;
            transform-origin: 30% 90%;
          }
        }
      `}</style>
    </svg>
  );
}
