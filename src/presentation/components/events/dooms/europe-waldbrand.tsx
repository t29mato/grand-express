/**
 * 山火事が線路まで達する。丘の上に煙と炎が上がり、
 * 乗客は線路づたいに歩いて避難する。燃える人や建物は描かない。
 * **上がる煙と揺れる炎**、歩いて逃げる人影で伝える。
 */
export function EuropeWaldbrand() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 空。煙で色がくすむ。 */}
      <rect width="400" height="210" fill="#b8a888" />
      <rect y="0" width="400" height="80" fill="#cdbfa2" />

      {/* 丘の稜線。 */}
      <path d="M0,110 c60,-30 140,-30 200,-6 c60,-24 140,-24 200,0 v10 H0z" fill="#5f7f4a" />
      <path d="M0,110 c60,-30 140,-30 200,-6 c60,-24 140,-24 200,0" fill="none" stroke="#3f5a30" strokeWidth="2" />

      {/* 地面と線路。 */}
      <rect y="150" width="400" height="60" fill="#c9a877" />
      <rect y="150" width="400" height="5" fill="#dabb8c" />
      <rect y="182" width="400" height="6" fill="#3a332c" />
      <g stroke="#241a10" strokeWidth="3">
        <path d="M20,184 L380,184" />
        <path d="M50,178 L50,190M100,178 L100,190M150,178 L150,190M200,178 L200,190M250,178 L250,190M300,178 L300,190" />
      </g>

      {/* 線路づたいに歩いて逃げる人影。 */}
      <g strokeLinejoin="round">
        <circle cx="90" cy="160" r="8" fill="#f6efe2" stroke="#20364a" strokeWidth="2" />
        <rect x="82" y="168" width="16" height="22" rx="3" fill="#5b8fe8" stroke="#20364a" strokeWidth="2" />
        <circle cx="118" cy="162" r="7" fill="#d9a273" stroke="#20364a" strokeWidth="2" />
        <rect x="111" y="169" width="14" height="20" rx="3" fill="#f5b31c" stroke="#20364a" strokeWidth="2" />
      </g>

      {/* 丘の上の炎。揺れる。 */}
      <g className="ewb-flame">
        <path d="M270,110 q-8,-18 0,-30 q10,14 4,22 q10,-8 6,-24 q14,16 4,32z" fill="#e8443f" />
        <path d="M300,112 q-6,-14 0,-24 q8,10 3,17 q8,-6 5,-19 q11,13 3,26z" fill="#f5b31c" />
      </g>

      {/* 立ちのぼる煙。 */}
      <g className="ewb-smoke" fill="#7a726a" opacity="0.6">
        <ellipse cx="285" cy="80" rx="26" ry="16" />
        <ellipse cx="300" cy="55" rx="34" ry="20" />
        <ellipse cx="270" cy="35" rx="40" ry="22" />
      </g>

      <style>{`
        .ewb-flame {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: ewb-flicker 0.9s ease-in-out infinite;
        }
        @keyframes ewb-flicker {
          0% { transform: scaleY(1) skewX(0deg); }
          50% { transform: scaleY(1.15) skewX(4deg); }
          100% { transform: scaleY(1) skewX(0deg); }
        }
        .ewb-smoke {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: ewb-rise 3.4s ease-in-out infinite;
        }
        @keyframes ewb-rise {
          0% { transform: translateY(10px); opacity: 0.3; }
          60% { opacity: 0.6; }
          100% { transform: translateY(-16px); opacity: 0.1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ewb-flame, .ewb-smoke { animation: none; }
        }
      `}</style>
    </svg>
  );
}
