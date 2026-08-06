/**
 * 夜明けの定置網の手伝いに入り、鮭と日銭を分けてもらう。
 *
 * 船縁から網をたぐり上げると鮭が跳ね、甲板には
 * 分け前の魚箱と小銭が積まれている。
 */
export function SalmonCatch() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜明けの海 */}
      <rect width="400" height="210" fill="#3f4e78" />
      <rect y="96" width="400" height="22" fill="#c76a5e" />
      <circle cx="330" cy="118" r="24" fill="#f5b31c" />
      <rect y="118" width="400" height="92" fill="#20364a" />
      <g className="sc-glitter" fill="#f5b31c">
        <ellipse cx="330" cy="128" rx="20" ry="2.5" />
        <ellipse cx="330" cy="140" rx="13" ry="2.5" />
        <ellipse cx="330" cy="152" rx="8" ry="2" />
      </g>
      <path
        d="M0,132 q18,-5 36,0 t36,0 M300,140 q18,-5 36,0 t36,0"
        fill="none"
        stroke="#2f4a63"
        strokeWidth="3"
      />

      {/* 跳ねる鮭 */}
      <g className="sc-jump">
        <g className="sc-jump-spin">
          <path d="M-13,0 L-23,-7 L-23,7 Z" fill="#b85a5f" />
          <ellipse rx="14" ry="6.5" fill="#c9737a" />
          <ellipse cy="2.5" rx="9" ry="2.5" fill="#f6efe2" />
          <circle cx="9" cy="-1.5" r="1.7" fill="#16222e" />
        </g>
      </g>

      {/* たぐり上げる網 */}
      <g className="sc-net">
        <path
          d="M240,138 L282,152 M252,140 L306,158"
          fill="none"
          stroke="#f6efe2"
          strokeWidth="2"
        />
        <clipPath id="sc-net-clip">
          <path d="M266,140 Q320,148 330,172 Q300,196 262,182 Q246,158 266,140 Z" />
        </clipPath>
        <path
          d="M266,140 Q320,148 330,172 Q300,196 262,182 Q246,158 266,140 Z"
          fill="#8fc4e8"
          fillOpacity="0.16"
          stroke="#f6efe2"
          strokeWidth="2"
        />
        <g transform="translate(288,158)">
          <g className="sc-fish sc-fish-1">
            <path d="M-11,0 L-19,-6 L-19,6 Z" fill="#b85a5f" />
            <ellipse rx="12" ry="5.5" fill="#c9737a" />
            <circle cx="8" cy="-1.4" r="1.5" fill="#16222e" />
          </g>
        </g>
        <g transform="translate(304,174)">
          <g className="sc-fish sc-fish-2">
            <path d="M-10,0 L-18,-6 L-18,6 Z" fill="#b85a5f" />
            <ellipse rx="11" ry="5" fill="#c9737a" />
            <circle cx="7" cy="-1.4" r="1.4" fill="#16222e" />
          </g>
        </g>
        <g transform="translate(278,178)">
          <g className="sc-fish sc-fish-3">
            <path d="M-10,0 L-18,-6 L-18,6 Z" fill="#b85a5f" />
            <ellipse rx="11" ry="5" fill="#c9737a" />
            <circle cx="7" cy="-1.4" r="1.4" fill="#16222e" />
          </g>
        </g>
        <g clipPath="url(#sc-net-clip)" stroke="#f6efe2" strokeWidth="1.2" opacity="0.6">
          <path d="M240,150 L300,210 M260,140 L320,200 M280,132 L340,192 M300,126 L360,186" />
          <path d="M340,150 L280,210 M320,140 L260,200 M300,132 L240,192" />
        </g>
      </g>

      {/* 定置網の船 */}
      <g className="sc-boat">
        <rect x="146" y="92" width="3" height="46" fill="#4a3524" />
        <path d="M149,92 L168,98 L149,104 Z" fill="#e8443f" />
        <rect x="92" y="110" width="46" height="28" rx="3" fill="#f6efe2" />
        <rect x="100" y="116" width="30" height="12" fill="#20364a" />

        {/* 網を引く二人 */}
        <g>
          <circle cx="206" cy="110" r="9" fill="#f6efe2" />
          <rect x="197" y="100" width="18" height="6" rx="3" fill="#e8443f" />
          <rect x="197" y="120" width="20" height="20" rx="6" fill="#3b4f7a" />
          <g className="sc-pull-a">
            <rect x="214" y="122" width="26" height="8" rx="4" fill="#3b4f7a" />
            <circle cx="240" cy="126" r="5" fill="#f6efe2" />
          </g>
        </g>
        <g>
          <circle cx="232" cy="106" r="9" fill="#f6efe2" />
          <rect x="223" y="96" width="18" height="6" rx="3" fill="#e8443f" />
          <rect x="223" y="116" width="20" height="22" rx="6" fill="#3b4f7a" />
          <g className="sc-pull-b">
            <rect x="240" y="118" width="12" height="8" rx="4" fill="#3b4f7a" />
            <circle cx="252" cy="122" r="5" fill="#f6efe2" />
          </g>
        </g>

        {/* 分け前 */}
        <path d="M160,120 L172,112 L176,120 Z" fill="#c9737a" />
        <path d="M178,120 L190,113 L193,120 Z" fill="#b85a5f" />
        <rect x="152" y="118" width="44" height="20" rx="2" fill="#6d4526" />
        <g fill="#4a3524">
          <rect x="152" y="125" width="44" height="3" />
          <rect x="172" y="118" width="3" height="20" />
        </g>
        <circle cx="72" cy="130" r="7" fill="#f5b31c" />
        <circle cx="72" cy="130" r="3.4" fill="#c98f10" />
        <circle cx="84" cy="133" r="7" fill="#f5b31c" />
        <circle cx="84" cy="133" r="3.4" fill="#c98f10" />

        <path d="M64,138 L252,138 L232,168 L86,168 Z" fill="#3a2f28" />
        <rect x="68" y="140" width="180" height="5" fill="#f6efe2" />
        <path className="sc-spark" d="M78,108 l4,9 l-4,9 l-4,-9 z" fill="#f5b31c" />
      </g>

      <style>{`
        .sc-boat { transform-box: fill-box; transform-origin: 50% 100%; animation: sc-roll 3.2s ease-in-out infinite; }
        .sc-net { transform: translateY(0); animation: sc-haul 1.6s ease-in-out infinite; }
        .sc-pull-a { transform-box: fill-box; transform-origin: 0% 50%; animation: sc-pull 1.6s ease-in-out infinite; }
        .sc-pull-b { transform-box: fill-box; transform-origin: 0% 50%; animation: sc-pull 1.6s ease-in-out 0.2s infinite; }
        .sc-fish { transform-box: fill-box; transform-origin: 50% 50%; animation: sc-flap 0.7s ease-in-out infinite; }
        .sc-fish-2 { animation-delay: 0.22s; }
        .sc-fish-3 { animation-delay: 0.44s; }
        .sc-jump { transform: translate(366px, 150px); animation: sc-leap 2.8s ease-in-out infinite; }
        .sc-jump-spin { transform-box: fill-box; transform-origin: 50% 50%; animation: sc-arc 2.8s ease-in-out infinite; }
        .sc-glitter { opacity: 0.35; animation: sc-shimmer 2.6s ease-in-out infinite; }
        .sc-spark { transform-box: fill-box; transform-origin: 50% 50%; animation: sc-shine 2.6s ease-out infinite; }
        @keyframes sc-roll {
          0%, 100% { transform: rotate(-1.6deg); }
          50% { transform: rotate(1.6deg); }
        }
        @keyframes sc-haul {
          0%, 100% { transform: translateY(14px); }
          55% { transform: translateY(0); }
        }
        @keyframes sc-pull {
          0%, 100% { transform: rotate(14deg); }
          55% { transform: rotate(-10deg); }
        }
        @keyframes sc-flap {
          0%, 100% { transform: rotate(-10deg); }
          50% { transform: rotate(10deg); }
        }
        @keyframes sc-leap {
          0%, 12% { transform: translate(344px, 196px); opacity: 0; }
          24% { transform: translate(352px, 172px); opacity: 1; }
          46% { transform: translate(368px, 140px); opacity: 1; }
          72% { transform: translate(384px, 172px); opacity: 1; }
          88%, 100% { transform: translate(392px, 200px); opacity: 0; }
        }
        @keyframes sc-arc {
          0%, 12% { transform: rotate(-58deg); }
          46% { transform: rotate(-8deg); }
          88%, 100% { transform: rotate(52deg); }
        }
        @keyframes sc-shimmer {
          0%, 100% { opacity: 0.24; }
          50% { opacity: 0.48; }
        }
        @keyframes sc-shine {
          0%, 58%, 100% { transform: scale(0.2); opacity: 0; }
          72% { transform: scale(1); opacity: 1; }
          86% { transform: scale(0.6); opacity: 0.4; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sc-boat, .sc-net, .sc-pull-a, .sc-pull-b, .sc-fish,
          .sc-jump, .sc-jump-spin, .sc-glitter, .sc-spark { animation: none; }
        }
      `}</style>
    </svg>
  );
}
