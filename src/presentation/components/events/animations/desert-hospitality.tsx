/**
 * タール砂漠のラクダ飼いに一晩泊めてもらい、雑穀パンとバターミルクをもらう。
 *
 * 砂丘の小屋の前でラクダが口を動かすかたわら、ターバンの主が椀とパンを
 * 差し出し、旅人が受け取る。足元には持たされた包み。
 */
export function DesertHospitality() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 砂漠の空 */}
      <rect width="400" height="210" fill="#7fb8dd" />
      <circle className="deshos-sun" cx="54" cy="40" r="19" fill="#f5b31c" />

      {/* 砂丘 */}
      <path d="M0,132 Q80,104 176,128 Q272,152 400,118 L400,210 L0,210 z" fill="#e2c68e" />
      <path d="M0,158 Q110,136 218,160 Q310,180 400,152 L400,210 L0,210 z" fill="#d1ad78" />

      {/* 土の小屋 */}
      <g>
        <rect x="320" y="124" width="48" height="28" fill="#c99a6a" />
        <path d="M312,124 L344,98 L376,124 z" fill="#a8814a" />
        <rect x="338" y="136" width="13" height="16" fill="#6b4a2a" />
      </g>

      {/* ラクダ */}
      <g>
        <g fill="#b8834a">
          <rect className="deshos-leg-a" x="250" y="152" width="7" height="26" rx="3" />
          <rect x="264" y="152" width="7" height="26" rx="3" />
          <rect x="296" y="152" width="7" height="26" rx="3" />
          <rect className="deshos-leg-b" x="308" y="152" width="7" height="26" rx="3" />
        </g>
        <path
          className="deshos-tail"
          d="M318,140 q10,8 6,20"
          fill="none"
          stroke="#b8834a"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <ellipse cx="282" cy="146" rx="38" ry="20" fill="#c9945a" />
        <path d="M262,132 Q282,108 302,132 z" fill="#c9945a" />
        <path d="M250,150 Q234,122 240,98 L254,98 Q250,126 264,148 z" fill="#c9945a" />
        <g className="deshos-chew">
          <ellipse cx="240" cy="94" rx="16" ry="10" fill="#c9945a" />
          <ellipse cx="226" cy="97" rx="7" ry="6" fill="#e0b47c" />
          <circle cx="238" cy="89" r="2.2" fill="#241a12" />
          <path d="M248,86 l4,-9 5,8 z" fill="#b8834a" />
        </g>
        <rect x="266" y="126" width="36" height="14" fill="#e8443f" />
        <g fill="#f5b31c">
          <rect x="266" y="140" width="4" height="7" />
          <rect x="276" y="140" width="4" height="7" />
          <rect x="286" y="140" width="4" height="7" />
          <rect x="296" y="140" width="4" height="7" />
        </g>
      </g>

      {/* 前の砂丘 */}
      <path d="M0,188 Q120,174 240,190 Q330,202 400,186 L400,210 L0,210 z" fill="#c09a63" />

      {/* ラクダ飼い */}
      <g>
        <path d="M185,190 L190,146 L212,146 L217,190 z" fill="#f6efe2" />
        <rect x="184" y="116" width="30" height="34" rx="6" fill="#f0e6d2" />
        <circle cx="199" cy="106" r="12" fill="#c08a5a" />
        <path d="M186,104 q0,-18 13,-18 q13,0 13,18 z" fill="#e8443f" />
        <rect x="186" y="99" width="26" height="4" fill="#f5b31c" />
        {/* 差し出す腕と椀 */}
        <g className="deshos-offer">
          <rect x="152" y="130" width="36" height="10" rx="5" fill="#c08a5a" />
          <path d="M144,134 L172,134 L168,150 L148,150 z" fill="#f0e6d2" />
          <rect x="144" y="134" width="28" height="4" fill="#f8f4ea" />
          <g fill="#d9b47e">
            <ellipse cx="158" cy="124" rx="15" ry="4" />
            <ellipse cx="158" cy="118" rx="14" ry="4" />
            <ellipse cx="158" cy="112" rx="13" ry="4" />
          </g>
          <g
            className="deshos-steam"
            fill="none"
            stroke="#f6efe2"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path className="deshos-steam-a" d="M150,104 q-4,-8 0,-15" />
            <path className="deshos-steam-b" d="M166,104 q4,-8 0,-15" />
          </g>
        </g>
      </g>

      {/* 受け取る旅人 */}
      <g className="deshos-guest">
        <rect x="94" y="176" width="9" height="18" fill="#3a3348" />
        <rect x="108" y="176" width="9" height="18" fill="#3a3348" />
        <rect x="90" y="136" width="30" height="44" rx="8" fill="#5b8fe8" />
        <circle cx="105" cy="122" r="13" fill="#f6efe2" />
        <path d="M92,121 a13,13 0 0 1 26,0 z" fill="#2a1f18" />
        <rect x="118" y="134" width="30" height="9" rx="4.5" fill="#f6efe2" />
        <rect x="118" y="146" width="26" height="9" rx="4.5" fill="#f6efe2" />
        <rect x="62" y="164" width="26" height="30" rx="7" fill="#3f6b4a" />
      </g>

      {/* 持たされた包み */}
      <g>
        <circle cx="134" cy="186" r="14" fill="#e8443f" />
        <rect x="126" y="180" width="16" height="5" fill="#f5b31c" />
        <path d="M128,174 l6,-10 6,10 z" fill="#c93a52" />
      </g>

      {/* 得をした分の硬貨 */}
      <g transform="translate(134,160)">
        <g className="deshos-coin deshos-coin-a">
          <circle r="7" fill="#f5b31c" />
          <circle r="3.5" fill="#c98a12" />
        </g>
      </g>
      <g transform="translate(152,154)">
        <g className="deshos-coin deshos-coin-b">
          <circle r="6" fill="#f5b31c" />
          <circle r="3" fill="#c98a12" />
        </g>
      </g>
      <g transform="translate(118,152)">
        <g className="deshos-coin deshos-coin-c">
          <circle r="5" fill="#f5b31c" />
          <circle r="2.5" fill="#c98a12" />
        </g>
      </g>

      <style>{`
        .deshos-sun { animation: deshos-blaze 4s ease-in-out infinite; transform-origin: 54px 40px; }
        .deshos-chew { animation: deshos-munch 1.1s ease-in-out infinite; transform-origin: 256px 100px; }
        .deshos-tail { animation: deshos-swish 2.4s ease-in-out infinite; transform-origin: 318px 140px; }
        .deshos-leg-a { animation: deshos-shift 3.4s ease-in-out infinite; transform-origin: 253px 152px; }
        .deshos-leg-b { animation: deshos-shift 3.4s ease-in-out infinite 1.7s; transform-origin: 311px 152px; }
        .deshos-offer { animation: deshos-hand 2.6s ease-in-out infinite; }
        .deshos-steam-a { animation: deshos-waft 2.6s ease-out infinite; }
        .deshos-steam-b { animation: deshos-waft 2.6s ease-out infinite 1.3s; }
        .deshos-guest { animation: deshos-lean 2.6s ease-in-out infinite; transform-origin: 105px 194px; }
        .deshos-coin { animation: deshos-rise 2.4s ease-out infinite; }
        .deshos-coin-b { animation-delay: 0.6s; }
        .deshos-coin-c { animation-delay: 1.2s; }
        @keyframes deshos-blaze {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        @keyframes deshos-munch {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes deshos-swish {
          0%, 100% { transform: rotate(-9deg); }
          50% { transform: rotate(9deg); }
        }
        @keyframes deshos-shift {
          0%, 82%, 100% { transform: rotate(0deg); }
          90% { transform: rotate(-10deg); }
        }
        @keyframes deshos-hand {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-9px, 2px); }
        }
        @keyframes deshos-waft {
          0% { transform: translate(0, 0); opacity: 0; }
          25% { opacity: 0.9; }
          100% { transform: translate(-4px, -20px); opacity: 0; }
        }
        @keyframes deshos-lean {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes deshos-rise {
          0% { transform: translate(0, 0); opacity: 1; }
          70% { opacity: 1; }
          100% { transform: translate(0, -42px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .deshos-sun, .deshos-chew, .deshos-tail, .deshos-leg-a, .deshos-leg-b,
          .deshos-offer, .deshos-steam-a, .deshos-steam-b, .deshos-guest,
          .deshos-coin { animation: none; }
        }
      `}</style>
    </svg>
  );
}
