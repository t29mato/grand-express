/**
 * 混み合う市場ですりに遭う。露店のあいだで肩がぶつかった程度にしか
 * 感じなかったが、次の店でお釣りを探すとポケットの軽さに気づく。
 *
 * 動くのは、背後からポケットへ伸びて財布を抜き去る手だけ。
 */
export function VenezuelaCarteristaMercado() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 市場の空と日よけ。 */}
      <rect width="400" height="210" fill="#f0e4c8" />
      <g strokeLinejoin="round">
        <path d="M0,50 L60,20 L120,50 z" fill="#e8443f" />
        <path d="M120,50 L190,18 L260,50 z" fill="#f4c430" />
        <path d="M260,50 L330,20 L400,50 z" fill="#5b8fe8" />
      </g>
      <rect y="50" width="400" height="12" fill="#8a4a2c" />

      {/* 露店の台と商品。 */}
      <rect x="20" y="130" width="90" height="14" fill="#8a4a2c" />
      <g fill="#5f8a4a">
        <circle cx="36" cy="122" r="8" />
        <circle cx="54" cy="120" r="8" />
        <circle cx="72" cy="122" r="8" />
      </g>
      <rect x="290" y="130" width="90" height="14" fill="#8a4a2c" />
      <g fill="#e8443f">
        <circle cx="306" cy="122" r="7" />
        <circle cx="322" cy="120" r="7" />
        <circle cx="340" cy="122" r="7" />
        <circle cx="356" cy="120" r="7" />
      </g>

      {/* 混み合う人々のシルエット。 */}
      <g fill="#4a4436" opacity="0.9">
        <circle cx="130" cy="112" r="9" />
        <path d="M118,120 q12,-8 24,0 v34 h-24 z" />
        <circle cx="170" cy="118" r="8" />
        <path d="M160,126 q10,-7 20,0 v30 h-20 z" />
        <circle cx="260" cy="114" r="9" />
        <path d="M248,122 q12,-8 24,0 v34 h-24 z" />
      </g>

      {/* 被害者(中央、リュックを背負う)。 */}
      <g strokeLinejoin="round">
        <circle cx="205" cy="108" r="10" fill="#f6efe2" />
        <path d="M191,120 q14,-10 28,0 v50 h-28 z" fill="#5b8fe8" stroke="#20364a" strokeWidth="2" />
        <rect x="188" y="126" width="14" height="24" rx="3" fill="#8a4a2c" stroke="#20364a" strokeWidth="1.6" />
      </g>

      {/* 財布を抜き去る手。**ここだけが動く。** */}
      <g className="vcm-hand">
        <path
          d="M182,140 q-14,2 -20,10 q-2,4 2,6 q10,-2 20,-8 z"
          fill="#c8946a"
          stroke="#8a5a36"
          strokeWidth="1.4"
        />
        <rect x="176" y="140" width="10" height="7" rx="1.5" fill="#8a4a2c" />
      </g>

      <style>{`
        .vcm-hand {
          transform-box: fill-box;
          transform-origin: 100% 50%;
          animation: vcm-snatch 2.4s ease-in-out infinite;
        }
        @keyframes vcm-snatch {
          0%, 15% { transform: translate(6px, 0) scale(0.7); opacity: 0; }
          35% { transform: translate(0, 0) scale(1); opacity: 1; }
          55% { transform: translate(0, 0) scale(1); opacity: 1; }
          80% { transform: translate(-40px, 10px) scale(1); opacity: 1; }
          100% { transform: translate(-60px, 14px) scale(0.8); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .vcm-hand { animation: none; opacity: 1; transform: translate(0,0) scale(1); }
        }
      `}</style>
    </svg>
  );
}
