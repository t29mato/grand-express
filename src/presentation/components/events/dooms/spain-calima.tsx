/**
 * カリマ(サハラの砂塵)。南風で空が橙色に煙り、外に干したものすべてに
 * 赤茶けた砂の膜が張る。目と喉をやられて足止め。
 *
 * 韓国の黄砂(車を拭く)と被らないよう、こちらは**洗濯物**で描く。
 * バルコニーの物干しロープに掛かったシーツが砂で赤茶け、
 * 住人がため息をつきながら振るって砂を落としている。
 *
 * 動き: 流れる砂塵の帯・シーツの揺れ・振るうたびに立つ砂ぼこり。
 */
export function SpainCalima() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 橙色に煙る空。太陽は輪郭だけ滲む */}
      <rect width="400" height="210" fill="#d99a52" />
      <rect width="400" height="80" fill="#e8b06a" />
      <circle cx="320" cy="44" r="20" fill="#f0cc8a" opacity="0.8" />
      <circle cx="320" cy="44" r="30" fill="#f0cc8a" opacity="0.3" />

      {/* かすんだ町並み(遠景) */}
      <g fill="#c2853f" opacity="0.7">
        <rect x="20" y="76" width="40" height="60" />
        <rect x="70" y="64" width="34" height="72" />
        <rect x="330" y="70" width="44" height="66" />
      </g>

      {/* 向かい合う2つのバルコニー */}
      <g>
        <rect x="0" y="60" width="70" height="150" fill="#e8cfa0" />
        <rect x="52" y="96" width="26" height="60" fill="#c98a5f" />
        <g stroke="#8a5a3a" strokeWidth="2.4" fill="none">
          <path d="M50,156 H82 M54,156 V126 M62,156 V126 M70,156 V126 M78,156 V126" />
        </g>
      </g>
      <g>
        <rect x="330" y="56" width="70" height="154" fill="#d9b98a" />
        <rect x="322" y="100" width="26" height="56" fill="#c98a5f" />
        <g stroke="#8a5a3a" strokeWidth="2.4" fill="none">
          <path d="M318,156 H350 M322,156 V126 M330,156 V126 M338,156 V126 M346,156 V126" />
        </g>
      </g>

      {/* 通りの路面。うっすら砂が積もる */}
      <rect y="176" width="400" height="34" fill="#b07a3f" />
      <path d="M0,176 H400 V182 Q200,190 0,182z" fill="#c2853f" />

      {/* 物干しロープ */}
      <path d="M70,108 Q200,124 330,110" stroke="#6b5330" strokeWidth="2" fill="none" />

      {/* 砂を被ったシーツ2枚(揺れる) */}
      <g transform="translate(150,112)">
        <g className="scal-sheet-a">
          <path d="M-22,0 h44 l-3,46 q-19,8 -38,0z" fill="#e8d5b8" />
          <path d="M-22,0 h44 l-1,14 q-21,7 -42,0z" fill="#c29a6a" opacity="0.85" />
          <path d="M-19,20 q19,6 38,0" stroke="#c29a6a" strokeWidth="3" fill="none" opacity="0.6" />
        </g>
      </g>
      <g transform="translate(236,116)">
        <g className="scal-sheet-b">
          <path d="M-18,0 h36 l-2,38 q-16,7 -32,0z" fill="#f0e2c8" />
          <path d="M-18,0 h36 l-1,11 q-17,6 -34,0z" fill="#c29a6a" opacity="0.8" />
        </g>
      </g>

      {/* シーツを振るう住人(左バルコニー) */}
      <g transform="translate(64,156)">
        <circle cx="0" cy="-42" r="11" fill="#c98a5f" />
        <path d="M-11,-44 a11,11 0 0 1 22,0 l0,1 -22,0z" fill="#241a10" />
        <circle cx="-4" cy="-41" r="2" fill="#241a10" />
        <circle cx="4" cy="-41" r="2" fill="#241a10" />
        <path d="M-3,-34 q3,-2 6,0" stroke="#8a4a2f" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M-11,-31 h22 l-2,26 h-18z" fill="#c8384f" />
        {/* 振るう腕と小さなシーツ */}
        <g className="scal-shake">
          <path d="M10,-28 L30,-34" stroke="#c98a5f" strokeWidth="6" strokeLinecap="round" />
          <path d="M28,-38 q20,-2 24,8 l-6,18 q-14,-6 -20,-16z" fill="#e8d5b8" />
          <path d="M30,-32 q14,0 18,8" stroke="#c29a6a" strokeWidth="3" fill="none" opacity="0.7" />
        </g>
        {/* 振るって立つ砂ぼこり */}
        <g className="scal-puff" fill="#d9a860">
          <circle cx="52" cy="-18" r="5" />
          <circle cx="60" cy="-10" r="4" />
          <circle cx="46" cy="-8" r="3.4" />
        </g>
      </g>

      {/* 咳き込んでハンカチを当てる通行人(右下) */}
      <g transform="translate(348,176)">
        <circle cx="0" cy="-46" r="12" fill="#e8b88a" />
        <path d="M-12,-48 a12,12 0 0 1 24,0 l0,-2 q-12,-8 -24,0z" fill="#6e553c" />
        <circle cx="-4" cy="-46" r="2" fill="#241a10" />
        <path d="M-14,-40 q-4,2 -4,6" stroke="#e8b88a" strokeWidth="4" strokeLinecap="round" fill="none" />
        <rect x="-6" y="-42" width="14" height="8" rx="3" fill="#f6efe2" />
        <path d="M-12,-34 h24 l-3,34 h-18z" fill="#3f6f8a" />
        <g className="scal-cough" stroke="#d9a860" strokeWidth="2" fill="none" opacity="0.7">
          <path d="M14,-48 q6,-2 8,-6" />
          <path d="M14,-42 q8,0 10,-4" />
        </g>
      </g>

      {/* 流れる砂塵の帯(主の動き) */}
      <g className="scal-dust-a" fill="#e8b06a" opacity="0.6">
        <ellipse cx="90" cy="70" rx="80" ry="10" />
        <ellipse cx="280" cy="52" rx="90" ry="12" />
      </g>
      <g className="scal-dust-b" fill="#d9a860" opacity="0.5">
        <ellipse cx="180" cy="96" rx="100" ry="9" />
        <ellipse cx="360" cy="130" rx="70" ry="8" />
      </g>

      <style>{`
        .scal-sheet-a { transform-box: fill-box; transform-origin: 50% 0%; animation: scal-wave 2.8s ease-in-out infinite; }
        .scal-sheet-b { transform-box: fill-box; transform-origin: 50% 0%; animation: scal-wave 2.8s ease-in-out infinite; animation-delay: -1.1s; }
        .scal-shake { transform-box: fill-box; transform-origin: 0% 50%; animation: scal-flap 1.1s ease-in-out infinite; }
        .scal-puff { animation: scal-rise 1.1s ease-out infinite; }
        .scal-cough { animation: scal-blink 1.6s ease-in-out infinite; }
        .scal-dust-a { animation: scal-drift 4s linear infinite; }
        .scal-dust-b { animation: scal-drift 4s linear infinite; animation-delay: -2s; }
        @keyframes scal-wave {
          0%, 100% { transform: skewX(0deg); }
          50% { transform: skewX(-6deg); }
        }
        @keyframes scal-flap {
          0%, 100% { transform: rotate(0deg); }
          40% { transform: rotate(-18deg); }
        }
        @keyframes scal-rise {
          0% { transform: translate(0, 4px); opacity: 0; }
          40% { opacity: 0.8; }
          100% { transform: translate(6px, -10px); opacity: 0; }
        }
        @keyframes scal-blink {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
        @keyframes scal-drift {
          0% { transform: translateX(-24px); opacity: 0.35; }
          50% { opacity: 0.65; }
          100% { transform: translateX(24px); opacity: 0.35; }
        }
        @media (prefers-reduced-motion: reduce) {
          .scal-sheet-a, .scal-sheet-b, .scal-shake, .scal-puff,
          .scal-cough, .scal-dust-a, .scal-dust-b { animation: none; }
        }
      `}</style>
    </svg>
  );
}
