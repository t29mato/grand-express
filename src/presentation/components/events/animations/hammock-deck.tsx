/**
 * 川船の積み込みを手伝い、甲板の乗船と手間賃をもらう(増)。
 *
 *   - 麻袋とガスボンベを午後いっぱい積み込む
 *   - 屋根の下にはハンモックがずらりと並び、川の揺れに合わせて一緒に揺れる
 *   - 触れ合うほどの間隔で、そのあいだに自分の一張りを吊る
 */
export function HammockDeck() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 空・森・川 */}
      <rect width="400" height="210" fill="#8fc4e8" />
      <rect y="44" width="400" height="30" fill="#3f7a44" />
      <g fill="#2f6b38">
        <ellipse cx="40" cy="46" rx="34" ry="15" />
        <ellipse cx="120" cy="42" rx="40" ry="17" />
        <ellipse cx="230" cy="46" rx="36" ry="14" />
        <ellipse cx="330" cy="42" rx="42" ry="17" />
      </g>
      <rect y="74" width="400" height="136" fill="#7a6b3c" />
      <g stroke="#9a8b58" strokeWidth="3" strokeLinecap="round" fill="none">
        <path className="hmk-ripple" d="M28,88 q13,-5 26,0" />
        <path className="hmk-ripple hmk-r2" d="M210,96 q13,-5 26,0" />
        <path className="hmk-ripple hmk-r3" d="M320,84 q13,-5 26,0" />
      </g>

      {/* 船の屋根 */}
      <rect y="100" width="400" height="11" fill="#c93a3a" />
      <rect y="111" width="400" height="6" fill="#8a2f2f" />

      {/* 柱 */}
      <g fill="#8a5a2c">
        <rect x="24" y="117" width="9" height="56" />
        <rect x="130" y="117" width="9" height="56" />
        <rect x="236" y="117" width="9" height="56" />
        <rect x="342" y="117" width="9" height="56" />
      </g>

      {/* 並んだハンモック */}
      <g>
        <g className="hmk-swing">
          <path d="M30,126 q42,38 106,0" fill="none" stroke="#5b8fe8" strokeWidth="11" strokeLinecap="round" />
          <circle cx="83" cy="142" r="9" fill="#f6efe2" />
        </g>
        <g className="hmk-swing hmk-s2">
          <path d="M136,126 q42,38 106,0" fill="none" stroke="#f5b31c" strokeWidth="11" strokeLinecap="round" />
          <circle cx="189" cy="142" r="9" fill="#f6efe2" />
        </g>
        <g className="hmk-swing hmk-s3">
          <path d="M242,126 q42,38 106,0" fill="none" stroke="#3f8f7a" strokeWidth="11" strokeLinecap="round" />
        </g>
      </g>

      {/* 甲板と船体 */}
      <rect y="173" width="400" height="12" fill="#a8813c" />
      <rect y="173" width="400" height="5" fill="#c9a877" />
      <rect y="185" width="400" height="25" fill="#7a5a34" />
      <path d="M0,185 L400,185 L400,196 L0,196z" fill="#8a5a2c" />

      {/* 麻袋を抱えて運ぶ人 */}
      <g className="hmk-porter">
        <g transform="translate(298,173)">
          <rect x="-12" y="-18" width="9" height="18" fill="#3b2f4a" />
          <rect x="2" y="-18" width="9" height="18" fill="#3b2f4a" />
          <rect x="-15" y="-48" width="30" height="32" rx="9" fill="#e8443f" />
          <circle cx="0" cy="-58" r="12" fill="#f6efe2" />
          <path d="M-12,-62 a12,12 0 0 1 24,0z" fill="#3b2f2a" />
          {/* 胸に抱えた麻袋 */}
          <path d="M-24,-44 q24,-9 48,0 q4,20 -24,22 q-28,-2 -24,-22z" fill="#c9a877" />
          <path d="M-24,-44 q24,-9 48,0" fill="none" stroke="#8a6a3c" strokeWidth="3" />
          <g fill="#f6efe2">
            <rect x="-30" y="-38" width="10" height="20" rx="5" />
            <rect x="20" y="-38" width="10" height="20" rx="5" />
          </g>
        </g>
      </g>

      {/* 積み荷 */}
      <g transform="translate(56,173)">
        <rect x="-16" y="-30" width="32" height="30" rx="6" fill="#5b8fe8" />
        <rect x="-16" y="-24" width="32" height="6" fill="#3d6fc4" />
        <rect x="-7" y="-36" width="14" height="8" rx="4" fill="#3d6fc4" />
      </g>
      <g transform="translate(112,173)">
        <path d="M-22,0 q22,-14 44,0z" fill="#c9a877" />
        <path d="M-16,-10 q16,-12 32,0z" fill="#a8813c" />
      </g>

      {/* 手間賃 */}
      <g fill="#f5b31c" stroke="#c07f0c" strokeWidth="2">
        <circle className="hmk-coin-a" cx="300" cy="86" r="8" />
        <circle className="hmk-coin-b" cx="324" cy="72" r="7" />
        <circle className="hmk-coin-c" cx="278" cy="72" r="6" />
      </g>

      <style>{`
        .hmk-ripple {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: hmk-lap 3.8s ease-in-out infinite;
        }
        .hmk-r2 { animation-delay: -1.3s; }
        .hmk-r3 { animation-delay: -2.6s; }
        .hmk-swing {
          transform-box: fill-box; transform-origin: 50% 0;
          animation: hmk-rock 4.2s ease-in-out infinite;
        }
        .hmk-s2 { animation-delay: -1.4s; }
        .hmk-s3 { animation-delay: -2.8s; }
        .hmk-porter {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: hmk-load 5.4s ease-in-out infinite;
        }
        .hmk-coin-a { animation: hmk-pop 2.8s ease-out infinite; }
        .hmk-coin-b { animation: hmk-pop 2.8s ease-out infinite; animation-delay: -0.9s; }
        .hmk-coin-c { animation: hmk-pop 2.8s ease-out infinite; animation-delay: -1.9s; }
        @keyframes hmk-lap {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(11px); }
        }
        @keyframes hmk-rock {
          0%, 100% { transform: rotate(-1.8deg); }
          50% { transform: rotate(1.8deg); }
        }
        @keyframes hmk-load {
          0% { transform: translateX(74px); opacity: 0; }
          14% { opacity: 1; }
          84% { transform: translateX(-92px); opacity: 1; }
          96%, 100% { transform: translateX(-106px); opacity: 0; }
        }
        @keyframes hmk-pop {
          0%, 32% { transform: translate(0, 30px); opacity: 0; }
          54% { transform: translate(0, 0); opacity: 1; }
          84% { transform: translate(0, -8px); opacity: 1; }
          100% { transform: translate(0, -20px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hmk-ripple, .hmk-swing, .hmk-porter,
          .hmk-coin-a, .hmk-coin-b, .hmk-coin-c { animation: none; opacity: 1; }
        }
      `}</style>
    </svg>
  );
}
