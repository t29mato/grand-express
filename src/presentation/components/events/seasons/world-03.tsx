/**
 * 7月。北半球が休みに入り、東アフリカは大移動。
 *
 * 左は北の浜。パラソルが並び、寄せる波の前で人が寝転んでいる。
 * 右はマラ川の渡り。ヌーの列が土埃を上げて川へ入っていく。
 */
export function World03() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 左=真夏の北 / 右=乾季のサバンナ */}
      <rect width="200" height="210" fill="#8fc4e8" />
      <rect x="200" width="200" height="210" fill="#e8c88a" />
      <circle cx="44" cy="34" r="19" fill="#f5b31c" />
      <circle cx="356" cy="36" r="21" fill="#f0a83c" />

      {/* 北の海 */}
      <rect y="96" width="200" height="52" fill="#2f8fb8" />
      <rect y="132" width="200" height="20" fill="#4fb0c8" />
      <g stroke="#bfeef4" strokeWidth="3" strokeLinecap="round" fill="none">
        <path className="w03-surf" d="M14,116 q16,-6 32,0" />
        <path className="w03-surf w03-s2" d="M96,126 q16,-6 32,0" />
        <path className="w03-surf w03-s3" d="M154,110 q16,-6 32,0" />
      </g>
      <path className="w03-foam" d="M0,148 q30,-9 60,0 q30,9 60,0 q30,-9 60,0 q10,3 20,1 L200,158 L0,158z" fill="#eaf6fa" />

      {/* 浜 */}
      <rect y="154" width="200" height="56" fill="#f0e0b8" />

      {/* パラソルの列 */}
      <g className="w03-brolly">
        <rect x="34" y="150" width="4" height="42" fill="#8a6a3c" />
        <path d="M6,152 q30,-30 60,0z" fill="#e8443f" />
        <path d="M6,152 q15,-15 30,0 q15,-15 30,0z" fill="#f6efe2" />
      </g>
      <g className="w03-brolly w03-b2">
        <rect x="112" y="146" width="4" height="46" fill="#8a6a3c" />
        <path d="M84,148 q30,-30 60,0z" fill="#f5b31c" />
        <path d="M84,148 q15,-15 30,0 q15,-15 30,0z" fill="#f6efe2" />
      </g>
      <g className="w03-brolly w03-b3">
        <rect x="176" y="152" width="4" height="42" fill="#8a6a3c" />
        <path d="M150,154 q28,-28 56,0z" fill="#5b8fe8" />
      </g>

      {/* 寝そべる人 */}
      <g className="w03-lounger">
        <rect x="52" y="188" width="52" height="8" rx="4" fill="#c9603c" />
        <circle cx="50" cy="184" r="8" fill="#f6efe2" />
        <rect x="60" y="180" width="40" height="9" rx="4.5" fill="#f5d0b0" />
      </g>

      {/* サバンナ側。半球の境をまたがないよう切り抜く */}
      <clipPath id="w03-south">
        <rect x="200" width="200" height="210" />
      </clipPath>
      <g clipPath="url(#w03-south)">
        <rect x="200" y="118" width="200" height="92" fill="#d8bc72" />
        <path d="M200,118 L246,96 L292,118z M300,118 L340,100 L382,118z" fill="#a89873" />
        <rect x="200" y="118" width="200" height="6" fill="#b89a5c" />

        {/* アカシア */}
        <path d="M232,120 c0,-13 -3,-15 -3,-21 h9 c0,6 -2,8 -2,21z" fill="#6b5330" />
        <path d="M206,100 c6,-11 54,-11 60,0 c-13,4 -47,4 -60,0z" fill="#4d7a44" />

        {/* 川(マラ川) */}
        <rect x="200" y="158" width="200" height="30" fill="#5f7f6a" />
        <g stroke="#8fae98" strokeWidth="3" strokeLinecap="round" fill="none">
          <path className="w03-ripple" d="M214,170 q13,-5 26,0" />
          <path className="w03-ripple w03-r2" d="M300,180 q13,-5 26,0" />
          <path className="w03-ripple w03-r3" d="M356,168 q13,-5 26,0" />
        </g>

        {/* 舞い上がる土埃 */}
        <g fill="#e0cfa0" opacity="0.7">
          <ellipse className="w03-dust" cx="322" cy="152" rx="20" ry="8" />
          <ellipse className="w03-dust w03-d2" cx="272" cy="158" rx="17" ry="7" />
          <ellipse className="w03-dust w03-d3" cx="368" cy="148" rx="22" ry="9" />
        </g>

        {/* ヌーの列。右から来て川へ入っていく */}
        <g fill="#4a4038">
          <g className="w03-gnu">
            <rect x="356" y="140" width="4" height="14" />
            <rect x="364" y="140" width="4" height="14" />
            <rect x="378" y="140" width="4" height="14" />
            <rect x="386" y="140" width="4" height="14" />
            <rect x="352" y="124" width="42" height="18" rx="7" />
            <circle cx="360" cy="124" r="8" />
            <path d="M356,126 L344,114 L352,110 L364,128z" />
            <path d="M344,114 L330,111 L330,119 L346,121z" />
            <path d="M338,120 L342,128 L346,120z" />
            <path d="M394,128 L400,138" stroke="#4a4038" strokeWidth="2.4" />
            <g stroke="#2f2924" strokeWidth="2.6" fill="none" strokeLinecap="round">
              <path d="M340,110 q-6,-5 -11,-2" />
              <path d="M346,109 q2,-7 9,-6" />
            </g>
          </g>
          <g className="w03-gnu w03-g2">
            <rect x="306" y="146" width="4" height="14" />
            <rect x="314" y="146" width="4" height="14" />
            <rect x="328" y="146" width="4" height="14" />
            <rect x="336" y="146" width="4" height="14" />
            <rect x="302" y="130" width="42" height="18" rx="7" />
            <circle cx="310" cy="130" r="8" />
            <path d="M306,132 L294,120 L302,116 L314,134z" />
            <path d="M294,120 L280,117 L280,125 L296,127z" />
            <path d="M288,126 L292,134 L296,126z" />
            <g stroke="#2f2924" strokeWidth="2.6" fill="none" strokeLinecap="round">
              <path d="M290,116 q-6,-5 -11,-2" />
              <path d="M296,115 q2,-7 9,-6" />
            </g>
          </g>
          <g transform="translate(26,0)">
          <g className="w03-gnu w03-g3">
            <rect x="258" y="154" width="4" height="14" />
            <rect x="266" y="154" width="4" height="14" />
            <rect x="280" y="154" width="4" height="14" />
            <rect x="288" y="154" width="4" height="14" />
            <rect x="254" y="138" width="42" height="18" rx="7" />
            <circle cx="262" cy="138" r="8" />
            <path d="M258,140 L246,128 L254,124 L266,142z" />
            <path d="M246,128 L232,125 L232,133 L248,135z" />
            <path d="M240,134 L244,142 L248,134z" />
            <g stroke="#2f2924" strokeWidth="2.6" fill="none" strokeLinecap="round">
              <path d="M242,124 q-6,-5 -11,-2" />
              <path d="M248,123 q2,-7 9,-6" />
            </g>
          </g>
          </g>
        </g>
      </g>

      {/* 半球の境目 */}
      <rect x="197" width="6" height="210" fill="#f6efe2" opacity="0.3" />
      <path d="M200,0 L200,210" stroke="#f6efe2" strokeWidth="2" strokeDasharray="10 9" opacity="0.7" />

      <style>{`
        .w03-surf {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: w03-lap 3.6s ease-in-out infinite;
        }
        .w03-s2 { animation-delay: -1.2s; }
        .w03-s3 { animation-delay: -2.4s; }
        .w03-foam {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: w03-wash 5s ease-in-out infinite;
        }
        .w03-brolly {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: w03-tilt 4.8s ease-in-out infinite;
        }
        .w03-b2 { animation-delay: -1.6s; }
        .w03-b3 { animation-delay: -3.2s; }
        .w03-lounger {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: w03-doze 6s ease-in-out infinite;
        }
        .w03-ripple {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: w03-lap 4.2s ease-in-out infinite;
        }
        .w03-r2 { animation-delay: -1.4s; }
        .w03-r3 { animation-delay: -2.8s; }
        .w03-gnu {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: w03-march 7s linear infinite;
        }
        .w03-g2 { animation-delay: -2.4s; }
        .w03-g3 { animation-delay: -4.7s; }
        .w03-dust {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: w03-puff 4.4s ease-out infinite;
        }
        .w03-d2 { animation-delay: -1.5s; }
        .w03-d3 { animation-delay: -3s; }
        @keyframes w03-lap {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(12px); }
        }
        @keyframes w03-wash {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-7px); }
        }
        @keyframes w03-tilt {
          0%, 100% { transform: rotate(-2.5deg); }
          50% { transform: rotate(2.5deg); }
        }
        @keyframes w03-doze {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2.5px); }
        }
        @keyframes w03-march {
          0% { transform: translate(56px, -9px); }
          100% { transform: translate(-46px, 11px); }
        }
        @keyframes w03-puff {
          0% { transform: translate(0, 6px) scale(0.4); opacity: 0; }
          30% { opacity: 0.75; }
          100% { transform: translate(-26px, -20px) scale(1.5); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .w03-surf, .w03-foam, .w03-brolly, .w03-lounger,
          .w03-ripple, .w03-gnu, .w03-dust { animation: none; }
        }
      `}</style>
    </svg>
  );
}
