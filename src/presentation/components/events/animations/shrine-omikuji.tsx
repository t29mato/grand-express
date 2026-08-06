/**
 * おみくじで大凶を引き、お守りを買って凶みくじを枝に結んでいく。
 *
 * 手から離れた紙片が枝まで飛んで結ばれ、賽銭箱には
 * お守り代の硬貨が落ちていく。
 */
export function ShrineOmikuji() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 暮れかけの境内 */}
      <rect width="400" height="210" fill="#20364a" />
      <rect y="162" width="400" height="48" fill="#2f4a33" />

      {/* 鳥居 */}
      <rect x="272" y="64" width="13" height="98" fill="#c0392b" />
      <rect x="344" y="64" width="13" height="98" fill="#c0392b" />
      <rect x="264" y="72" width="98" height="8" fill="#c0392b" />
      <rect x="256" y="50" width="114" height="10" rx="2" fill="#c0392b" />
      <rect x="256" y="45" width="114" height="6" rx="2" fill="#8f2a20" />

      {/* みくじを結ぶ枝 */}
      <path
        d="M0,58 C56,66 108,80 170,100"
        fill="none"
        stroke="#4a3524"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path
        d="M60,68 L52,50 M116,84 L112,64 M150,94 L158,78"
        fill="none"
        stroke="#4a3524"
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* 先に結ばれているみくじ */}
      <g transform="translate(20,61)">
        <rect className="so-slip so-slip-1" x="-3.5" y="0" width="7" height="18" rx="1" fill="#f6efe2" />
      </g>
      <g transform="translate(48,65)">
        <rect className="so-slip so-slip-2" x="-3.5" y="0" width="7" height="20" rx="1" fill="#f6efe2" />
      </g>
      <g transform="translate(78,71)">
        <rect className="so-slip so-slip-3" x="-3.5" y="0" width="7" height="17" rx="1" fill="#f6efe2" />
      </g>
      <g transform="translate(106,79)">
        <rect className="so-slip so-slip-4" x="-3.5" y="0" width="7" height="21" rx="1" fill="#f6efe2" />
      </g>
      <g transform="translate(162,99)">
        <rect className="so-slip so-slip-5" x="-3.5" y="0" width="7" height="18" rx="1" fill="#f6efe2" />
      </g>

      {/* 賽銭箱 */}
      <rect x="286" y="128" width="58" height="32" fill="#6d4526" />
      <rect x="282" y="121" width="66" height="8" fill="#4a3524" />
      <g fill="#16222e">
        <rect x="292" y="121" width="3" height="8" />
        <rect x="303" y="121" width="3" height="8" />
        <rect x="314" y="121" width="3" height="8" />
        <rect x="325" y="121" width="3" height="8" />
        <rect x="336" y="121" width="3" height="8" />
      </g>

      {/* 参拝者 */}
      <circle cx="196" cy="112" r="13" fill="#f6efe2" />
      <rect x="183" y="97" width="26" height="10" rx="5" fill="#3a2f28" />
      <rect x="182" y="124" width="30" height="34" rx="7" fill="#3f6b52" />
      <rect x="186" y="158" width="9" height="20" rx="4" fill="#20364a" />
      <rect x="200" y="158" width="9" height="20" rx="4" fill="#20364a" />
      <rect x="210" y="126" width="9" height="24" rx="4" fill="#3f6b52" />
      <g className="so-arm">
        <rect x="160" y="110" width="26" height="9" rx="4" fill="#3f6b52" />
        <circle cx="160" cy="114" r="5" fill="#f6efe2" />
      </g>

      {/* 買ったお守り */}
      <g transform="translate(215,150)">
        <g className="so-charm">
          <rect x="-1" y="-10" width="2" height="9" fill="#f5b31c" />
          <rect x="-7" y="-2" width="14" height="18" rx="2" fill="#c0392b" />
          <rect x="-7" y="2" width="14" height="3" fill="#f5b31c" />
        </g>
      </g>

      {/* 結びに飛んでいく大凶のみくじ */}
      <g className="so-fly">
        <g className="so-fly-spin">
          <rect x="-4" y="0" width="8" height="20" rx="1" fill="#f6efe2" />
          <rect x="-4" y="0" width="8" height="5" rx="1" fill="#c0392b" />
        </g>
      </g>

      {/* お守り代 */}
      <g className="so-coin">
        <circle r="6" fill="#f5b31c" />
        <circle r="3" fill="#c98f10" />
      </g>

      <style>{`
        .so-slip {
          transform-box: fill-box; transform-origin: 50% 0%;
          animation: so-sway 2.6s ease-in-out infinite;
        }
        .so-slip-2 { animation-delay: 0.3s; }
        .so-slip-3 { animation-delay: 0.6s; }
        .so-slip-4 { animation-delay: 0.15s; }
        .so-slip-5 { animation-delay: 0.45s; }
        .so-charm {
          transform-box: fill-box; transform-origin: 50% 0%;
          animation: so-sway 3.2s ease-in-out infinite;
        }
        .so-arm { transform-box: fill-box; transform-origin: 100% 50%; animation: so-reach 3.4s ease-in-out infinite; }
        .so-fly { transform: translate(134px, 86px); animation: so-tie 3.4s ease-in-out infinite; }
        .so-fly-spin { transform-box: fill-box; transform-origin: 50% 0%; animation: so-flutter 0.9s ease-in-out infinite; }
        .so-coin { transform: translate(315px, 104px); animation: so-offer 3.4s ease-in infinite; }
        @keyframes so-sway {
          0%, 100% { transform: rotate(9deg); }
          50% { transform: rotate(-9deg); }
        }
        @keyframes so-reach {
          0%, 100% { transform: rotate(6deg); }
          40% { transform: rotate(-14deg); }
        }
        @keyframes so-tie {
          0% { transform: translate(158px, 108px); opacity: 0; }
          10% { transform: translate(154px, 106px); opacity: 1; }
          45%, 88% { transform: translate(134px, 86px); opacity: 1; }
          100% { transform: translate(134px, 86px); opacity: 0; }
        }
        @keyframes so-flutter {
          0%, 100% { transform: rotate(-13deg); }
          50% { transform: rotate(13deg); }
        }
        @keyframes so-offer {
          0%, 20% { transform: translate(315px, 84px); opacity: 0; }
          32% { transform: translate(315px, 92px); opacity: 1; }
          62% { transform: translate(315px, 118px); opacity: 1; }
          72%, 100% { transform: translate(315px, 126px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .so-slip, .so-charm, .so-arm, .so-fly, .so-fly-spin, .so-coin { animation: none; }
        }
      `}</style>
    </svg>
  );
}
