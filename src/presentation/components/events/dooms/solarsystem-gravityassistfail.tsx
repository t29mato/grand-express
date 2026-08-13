/**
 * 重力アシストの噴射がタイミングを逃す。惑星をかすめる予定の弧から
 * それてしまい、エンジンの炎がふらついたまま外れていく。
 *
 * 動くのは、外れて揺らぐエンジンの炎1つだけ。
 */
export function SolarsystemGravityassistfail() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 深宇宙。 */}
      <rect width="400" height="210" fill="#050a1c" />
      <g fill="#f0ead6" opacity="0.6">
        <circle cx="30" cy="30" r="1.2" />
        <circle cx="370" cy="20" r="1" />
        <circle cx="360" cy="180" r="1.2" />
      </g>

      {/* 惑星(木星ふう)。 */}
      <circle cx="120" cy="110" r="70" fill="#d8b878" />
      <g stroke="#b8905a" strokeWidth="7" opacity="0.8">
        <path d="M50,90 h140" />
        <path d="M50,115 h140" />
        <path d="M55,140 h130" />
      </g>

      {/* 予定していた通過の弧(点線)。 */}
      <path d="M120,20 A100,100 0 0,1 260,120" fill="none" stroke="#8fa0b4" strokeWidth="2" strokeDasharray="6,6" opacity="0.6" />

      {/* それてしまった探査機の船体。 */}
      <g strokeLinejoin="round" transform="translate(270,60) rotate(20)">
        <rect x="-16" y="-8" width="32" height="16" rx="4" fill="#c9d6f0" stroke="#20364a" strokeWidth="2" />
        <rect x="-30" y="-3" width="12" height="6" fill="#c8a850" />
        <rect x="18" y="-3" width="12" height="6" fill="#c8a850" />
      </g>

      {/* ふらつくエンジンの炎。**ここだけが動く。** */}
      <g className="ssg-flame">
        <path d="M0,0 q-14,6 -22,0 q8,-6 4,-14 q10,4 18,14z" fill="#ff8f3a" />
      </g>

      <style>{`
        .ssg-flame {
          transform-box: fill-box;
          transform-origin: 100% 50%;
          animation: ssg-wobble 0.7s ease-in-out infinite;
        }
        @keyframes ssg-wobble {
          0% { transform: translate(238px,72px) rotate(-8deg) scale(1); }
          50% { transform: translate(236px,76px) rotate(10deg) scale(0.8); }
          100% { transform: translate(238px,72px) rotate(-8deg) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ssg-flame { animation: none; }
        }
      `}</style>
    </svg>
  );
}
