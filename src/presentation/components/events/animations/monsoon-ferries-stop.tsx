/**
 * 最初の大雨から九月まで小舟は陸に上げられ、回り道は陸路になる(減)。
 *
 *   - 桟橋の入口に横木が渡され、渡し場が閉じている
 *   - 舟は伏せて陸へ上げられ、雨がその腹を叩いている
 *   - 遠くの道を、二倍の距離を行くバスが走っていく
 */
export function MonsoonFerriesStop() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 雨の空 */}
      <rect width="400" height="210" fill="#5a6b74" />
      <rect width="400" height="76" fill="#4d5c66" />
      <g fill="#42505a">
        <ellipse cx="88" cy="30" rx="60" ry="20" />
        <ellipse cx="140" cy="24" rx="40" ry="15" />
        <ellipse cx="300" cy="26" rx="56" ry="18" />
      </g>

      {/* 荒れた入り江 */}
      <rect y="76" width="400" height="58" fill="#4f6b6a" />
      <g stroke="#6f8b88" strokeWidth="3" strokeLinecap="round" fill="none">
        <path className="mfs-chop" d="M24,96 q13,-6 26,0" />
        <path className="mfs-chop mfs-c2" d="M150,110 q13,-6 26,0" />
        <path className="mfs-chop mfs-c3" d="M300,92 q13,-6 26,0" />
      </g>

      {/* 遠くの道と、回り道のバス */}
      <rect y="122" width="400" height="14" fill="#6b6b60" />
      <g className="mfs-bus">
        <rect x="20" y="104" width="56" height="20" rx="4" fill="#f5b31c" />
        <g fill="#cfe4f0">
          <rect x="26" y="108" width="12" height="8" />
          <rect x="42" y="108" width="12" height="8" />
          <rect x="58" y="108" width="12" height="8" />
        </g>
        <g fill="#2a2f38">
          <circle cx="34" cy="125" r="4.5" />
          <circle cx="64" cy="125" r="4.5" />
        </g>
      </g>

      {/* 岸 */}
      <rect y="136" width="400" height="74" fill="#6b6350" />
      <rect y="136" width="400" height="6" fill="#7f7660" />

      {/* 閉じた桟橋 */}
      <g>
        <rect x="230" y="150" width="170" height="12" fill="#7a5a34" />
        <g fill="#5a3d22">
          <rect x="252" y="162" width="9" height="30" />
          <rect x="312" y="162" width="9" height="30" />
          <rect x="372" y="162" width="9" height="30" />
        </g>
        {/* 通せんぼの横木 */}
        <rect x="222" y="126" width="10" height="46" fill="#8f9aa8" />
        <rect className="mfs-bar" x="222" y="136" width="120" height="11" rx="3" fill="#e8443f" />
        <g fill="#f6efe2">
          <rect x="248" y="138" width="14" height="7" />
          <rect x="284" y="138" width="14" height="7" />
          <rect x="320" y="138" width="14" height="7" />
        </g>
      </g>

      {/* 陸に上げた舟 */}
      <g transform="translate(96,184)">
        <path d="M-56,0 q56,-30 112,0z" fill="#8a5a2c" />
        <path d="M-48,-4 q48,-24 96,-4" fill="none" stroke="#5a3d22" strokeWidth="3" />
        <ellipse cx="0" cy="2" rx="60" ry="6" fill="#5c5546" />
      </g>
      <g transform="translate(196,196)">
        <path d="M-40,0 q40,-22 80,0z" fill="#7a5a34" />
        <path d="M-34,-3 q34,-18 68,-3" fill="none" stroke="#5a3d22" strokeWidth="2.6" />
        <ellipse cx="0" cy="2" rx="44" ry="5" fill="#5c5546" />
      </g>

      {/* 雨 */}
      <g stroke="#bcd0dd" strokeWidth="2" strokeLinecap="round" opacity="0.6">
        <path className="mfs-rain" d="M30,0 L20,20" />
        <path className="mfs-rain mfs-r2" d="M96,0 L86,20" />
        <path className="mfs-rain mfs-r3" d="M160,0 L150,20" />
        <path className="mfs-rain mfs-r4" d="M224,0 L214,20" />
        <path className="mfs-rain mfs-r5" d="M288,0 L278,20" />
        <path className="mfs-rain mfs-r6" d="M352,0 L342,20" />
        <path className="mfs-rain mfs-r7" d="M62,0 L52,20" />
        <path className="mfs-rain mfs-r8" d="M128,0 L118,20" />
        <path className="mfs-rain mfs-r9" d="M192,0 L182,20" />
        <path className="mfs-rain mfs-r10" d="M256,0 L246,20" />
        <path className="mfs-rain mfs-r11" d="M320,0 L310,20" />
        <path className="mfs-rain mfs-r12" d="M384,0 L374,20" />
      </g>

      {/* 余分にかかる運賃 */}
      <g fill="#f5b31c" stroke="#c07f0c" strokeWidth="2">
        <circle className="mfs-coin-a" cx="252" cy="96" r="8" />
        <circle className="mfs-coin-b" cx="252" cy="96" r="7" />
      </g>

      <style>{`
        .mfs-chop {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: mfs-lap 3.4s ease-in-out infinite;
        }
        .mfs-c2 { animation-delay: -1.1s; }
        .mfs-c3 { animation-delay: -2.2s; }
        .mfs-bus {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: mfs-detour 9s linear infinite;
        }
        .mfs-bar {
          transform-box: fill-box; transform-origin: 0 50%;
          animation: mfs-shut 5s ease-in-out infinite;
        }
        .mfs-rain {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: mfs-pour 1.1s linear infinite;
        }
        .mfs-r2 { animation-delay: -0.09s; }
        .mfs-r3 { animation-delay: -0.18s; }
        .mfs-r4 { animation-delay: -0.27s; }
        .mfs-r5 { animation-delay: -0.36s; }
        .mfs-r6 { animation-delay: -0.45s; }
        .mfs-r7 { animation-delay: -0.55s; }
        .mfs-r8 { animation-delay: -0.64s; }
        .mfs-r9 { animation-delay: -0.73s; }
        .mfs-r10 { animation-delay: -0.82s; }
        .mfs-r11 { animation-delay: -0.91s; }
        .mfs-r12 { animation-delay: -1s; }
        .mfs-coin-a { animation: mfs-spend 3.2s ease-in infinite; }
        .mfs-coin-b { animation: mfs-spend 3.2s ease-in infinite; animation-delay: -1.6s; }
        @keyframes mfs-lap {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(11px); }
        }
        @keyframes mfs-detour {
          0% { transform: translateX(-90px); }
          100% { transform: translateX(340px); }
        }
        @keyframes mfs-shut {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(2deg); }
        }
        @keyframes mfs-pour {
          0% { transform: translate(22px, -24px); opacity: 0; }
          16%, 84% { opacity: 0.6; }
          100% { transform: translate(-96px, 216px); opacity: 0; }
        }
        @keyframes mfs-spend {
          0% { transform: translate(0, 0) scale(1); opacity: 0; }
          18% { opacity: 1; }
          100% { transform: translate(-52px, 62px) scale(0.5); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .mfs-chop, .mfs-bus, .mfs-bar, .mfs-rain,
          .mfs-coin-a, .mfs-coin-b { animation: none; }
        }
      `}</style>
    </svg>
  );
}
