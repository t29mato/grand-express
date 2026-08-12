/**
 * 違う行き先の大型タクシー(グラン・タクシー)に乗ってしまう。
 * ベージュのメルセデスが走り出したあと、道しるべの矢が示す方向と
 * 車の向きが食い違っていることに気づく。
 *
 * 動くのは車の走行と、道しるべの矢が指す向きだけ。
 */
export function MoroccoGrandtaxi() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 道路。 */}
      <rect width="400" height="210" fill="#8fc4e8" />
      <rect y="0" width="400" height="80" fill="#cfe4f0" />
      <path d="M0,100c60,-14 120,-14 180,-4c80,-12 160,-4 220,-8v12H0z" fill="#c9a877" opacity="0.7" />
      <rect y="108" width="400" height="102" fill="#4a4a52" />
      <g stroke="#e8dcc0" strokeWidth="4" strokeDasharray="26 20">
        <path d="M0,158h400" />
      </g>

      {/* 分岐の道しるべ(手前、二方向)。 */}
      <g transform="translate(320,120)">
        <rect x="-2" y="0" width="4" height="40" fill="#5a4630" />
        <path className="mo-gt-signA" d="M0,4h34v10h-34l6,-5z" fill="#c9a877" stroke="#5a4630" strokeWidth="1.4" />
        <path className="mo-gt-signB" d="M0,18h-30v10h30l-6,-5z" fill="#e0bb70" stroke="#5a4630" strokeWidth="1.4" />
      </g>

      {/* 走るベージュのメルセデス(大型タクシー)。 */}
      <g className="mo-gt-car">
        <path d="M40,178 L58,150 L120,150 L138,178z" fill="#e0d0a0" stroke="#20364a" strokeWidth="2.5" strokeLinejoin="round" />
        <rect x="36" y="176" width="106" height="20" rx="4" fill="#d0c090" stroke="#20364a" strokeWidth="2.5" />
        <circle cx="58" cy="198" r="10" fill="#241a10" />
        <circle cx="120" cy="198" r="10" fill="#241a10" />
        <rect x="68" y="156" width="20" height="12" fill="#bfe0f0" opacity="0.9" />
        <rect x="94" y="156" width="20" height="12" fill="#bfe0f0" opacity="0.9" />
      </g>

      {/* 車内の乗客の驚いた顔(小さな丸)。 */}
      <circle className="mo-gt-face" cx="78" cy="163" r="4" fill="#f6efe2" />

      <style>{`
        .mo-gt-car {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: mo-gt-drive 3.6s linear infinite;
        }
        @keyframes mo-gt-drive {
          0% { transform: translateX(-30px); }
          60% { transform: translateX(260px); }
          100% { transform: translateX(260px); }
        }
        .mo-gt-signA, .mo-gt-signB {
          transform-box: fill-box;
          transform-origin: 0% 50%;
          animation: mo-gt-point 3.6s linear infinite;
        }
        .mo-gt-signB {
          animation-delay: 0.1s;
        }
        @keyframes mo-gt-point {
          0%, 55% { transform: rotate(0deg); }
          65% { transform: rotate(-8deg); }
          75% { transform: rotate(6deg); }
          85%, 100% { transform: rotate(0deg); }
        }
        .mo-gt-face {
          animation: mo-gt-worry 3.6s linear infinite;
        }
        @keyframes mo-gt-worry {
          0%, 60% { opacity: 0; }
          65% { opacity: 1; }
          100% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .mo-gt-car { animation: none; transform: translateX(220px); }
          .mo-gt-signA, .mo-gt-signB { animation: none; }
          .mo-gt-face { animation: none; opacity: 1; }
        }
      `}</style>
    </svg>
  );
}
