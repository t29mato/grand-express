/**
 * 鉄砲水が路地を浸す。一時間の激しい雨で通りが川になり、
 * 段ボール箱や屋台が水に浮く。
 *
 * 人を描かず、**降りしきる雨**と**水に浮いて漂う箱**、**上昇する水位**で
 * 「浸水した路地」を表す。動くのは雨脚と水面の揺れ、漂う箱だけ。
 */
export function BrazilEnchente() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 暗い雨雲の空。 */}
      <rect width="400" height="210" fill="#3f5a68" />
      <rect y="0" width="400" height="80" fill="#5f7f8f" />

      {/* 濡れた建物の壁。 */}
      <g strokeLinejoin="round">
        <rect x="20" y="60" width="90" height="90" fill="#8a8478" stroke="#20364a" strokeWidth="2.5" />
        <rect x="290" y="50" width="100" height="100" fill="#9a9488" stroke="#20364a" strokeWidth="2.5" />
        <rect x="40" y="80" width="16" height="20" fill="#3a5a64" />
        <rect x="70" y="80" width="16" height="20" fill="#3a5a64" />
        <rect x="310" y="70" width="16" height="20" fill="#3a5a64" />
        <rect x="350" y="70" width="16" height="20" fill="#3a5a64" />
      </g>

      {/* 浸水した通り。 */}
      <rect y="150" width="400" height="60" fill="#4a6f7f" />
      <g className="bra-water" stroke="#7fa8c4" strokeWidth="2.5" opacity="0.8" fill="none">
        <path d="M0,158 q20,-4 40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0" />
        <path d="M0,178 q20,4 40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0" />
      </g>

      {/* 漂う段ボール箱。 */}
      <g className="bra-crate1" strokeLinejoin="round">
        <rect x="130" y="168" width="30" height="22" fill="#c8a878" stroke="#20364a" strokeWidth="2" />
        <path d="M130,168 L145,178 L160,168" fill="none" stroke="#20364a" strokeWidth="1.6" />
      </g>
      <g className="bra-crate2" strokeLinejoin="round">
        <rect x="220" y="176" width="24" height="18" fill="#e8443f" stroke="#20364a" strokeWidth="2" />
      </g>

      {/* 屋台の日除け(半分水没)。 */}
      <g strokeLinejoin="round">
        <path d="M186,150 L214,150 L210,164 L190,164z" fill="#f5b31c" stroke="#20364a" strokeWidth="2" />
      </g>

      {/* 降りしきる雨。 */}
      <g className="bra-rain" stroke="#cfe4f0" strokeWidth="2" strokeLinecap="round" opacity="0.75">
        <path d="M40,20 L30,50" />
        <path d="M100,10 L88,44" />
        <path d="M170,24 L158,56" />
        <path d="M240,14 L228,48" />
        <path d="M300,26 L290,58" />
        <path d="M360,16 L348,50" />
      </g>

      <style>{`
        .bra-rain {
          transform-box: fill-box;
          animation: bra-rain-fall 0.5s linear infinite;
        }
        @keyframes bra-rain-fall {
          0% { transform: translateY(-10px); opacity: 0; }
          20% { opacity: 0.75; }
          100% { transform: translateY(60px); opacity: 0; }
        }
        .bra-water {
          animation: bra-water-shift 2.4s ease-in-out infinite;
        }
        @keyframes bra-water-shift {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(14px); }
        }
        .bra-crate1, .bra-crate2 {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: bra-crate-bob 2.6s ease-in-out infinite;
        }
        .bra-crate2 { animation-delay: 1.1s; }
        @keyframes bra-crate-bob {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50% { transform: translateY(-6px) rotate(3deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .bra-rain, .bra-water, .bra-crate1, .bra-crate2 { animation: none; }
        }
      `}</style>
    </svg>
  );
}
