/**
 * 貨物船の甲板を手伝って、一区間ただで運んでもらう(増)。
 *
 *   - 舫い綱を手繰り、デッキブラシで甲板を洗い流す
 *   - バケツの水がはねて、板目に沿って流れていく
 *   - 一日の終わりに、手間賃の硬貨が跳ね上がる
 */
export function DeckPassage() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 海と空 */}
      <rect width="400" height="210" fill="#8fc4e8" />
      <rect y="52" width="400" height="60" fill="#2f7fa8" />
      <g stroke="#8fd0e8" strokeWidth="3" strokeLinecap="round" fill="none">
        <path className="dkp-swell" d="M24,70 q14,-6 28,0" />
        <path className="dkp-swell dkp-sw2" d="M172,84 q14,-6 28,0" />
        <path className="dkp-swell dkp-sw3" d="M298,64 q14,-6 28,0" />
      </g>
      <circle cx="336" cy="30" r="18" fill="#f5b31c" />

      {/* 手すり */}
      <rect y="104" width="400" height="8" fill="#8f9aa8" />
      <g fill="#7f8a99">
        <rect x="30" y="66" width="7" height="42" />
        <rect x="150" y="66" width="7" height="42" />
        <rect x="270" y="66" width="7" height="42" />
        <rect x="378" y="66" width="7" height="42" />
      </g>
      <rect y="70" width="400" height="5" fill="#8f9aa8" />

      {/* 甲板 */}
      <rect y="112" width="400" height="98" fill="#b5823f" />
      <g stroke="#8a6229" strokeWidth="2.5">
        <path d="M0,132 L400,132 M0,154 L400,154 M0,176 L400,176 M0,198 L400,198" />
      </g>
      <rect y="112" width="400" height="6" fill="#8a6229" />

      {/* ボラードと巻いた舫い綱 */}
      <g transform="translate(322,150)">
        <rect x="-11" y="-30" width="22" height="30" rx="4" fill="#5f6b7a" />
        <ellipse cx="0" cy="-32" rx="15" ry="6" fill="#7f8a99" />
        <g fill="none" stroke="#d8b06a" strokeWidth="5" strokeLinecap="round">
          <path className="dkp-rope" d="M-30,4 q30,-12 58,0" />
          <path d="M-26,16 q26,-10 52,0" />
        </g>
        <ellipse cx="0" cy="26" rx="34" ry="9" fill="none" stroke="#c9a04f" strokeWidth="5" />
      </g>

      {/* 甲板を洗う人 */}
      <g transform="translate(140,196)">
        <rect x="-14" y="-20" width="10" height="20" fill="#3b4a63" />
        <rect x="2" y="-20" width="10" height="20" fill="#3b4a63" />
        <rect x="-16" y="-58" width="30" height="40" rx="9" fill="#e8443f" />
        <circle cx="-1" cy="-68" r="12" fill="#f6efe2" />
        <path d="M-14,-71 a13,13 0 0 1 26,0z" fill="#f5b31c" />
        {/* 腕とデッキブラシ */}
        <g className="dkp-scrub">
          <rect x="8" y="-56" width="9" height="30" rx="4.5" fill="#f6efe2" />
          <path d="M14,-32 L54,-6" stroke="#8a6a3c" strokeWidth="6" strokeLinecap="round" />
          <rect x="46" y="-10" width="30" height="9" rx="3" fill="#5f6b7a" />
          <g stroke="#e8dfc8" strokeWidth="3">
            <path d="M50,-1 L50,6 M58,-1 L58,6 M66,-1 L66,6 M74,-1 L74,6" />
          </g>
        </g>
      </g>

      {/* はねる水 */}
      <g fill="#bfeef4">
        <ellipse className="dkp-splash" cx="216" cy="190" rx="7" ry="4" />
        <ellipse className="dkp-splash dkp-sp2" cx="236" cy="196" rx="6" ry="3.4" />
        <ellipse className="dkp-splash dkp-sp3" cx="200" cy="200" rx="5" ry="3" />
      </g>
      <ellipse cx="228" cy="202" rx="46" ry="7" fill="#8fd0e8" opacity="0.55" />

      {/* バケツ */}
      <g transform="translate(66,192)">
        <path d="M-15,-20 L15,-20 L11,0 L-11,0z" fill="#5b8fe8" />
        <ellipse cx="0" cy="-20" rx="15" ry="5" fill="#8fb8f0" />
        <path d="M-15,-22 a15,15 0 0 1 30,0" fill="none" stroke="#3d6fc4" strokeWidth="3" />
      </g>

      {/* 手間賃 */}
      <g fill="#f5b31c" stroke="#c07f0c" strokeWidth="2">
        <circle className="dkp-coin-a" cx="278" cy="76" r="8" />
        <circle className="dkp-coin-b" cx="300" cy="60" r="7" />
        <circle className="dkp-coin-c" cx="258" cy="58" r="6" />
      </g>

      <style>{`
        .dkp-swell {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: dkp-lap 3.6s ease-in-out infinite;
        }
        .dkp-sw2 { animation-delay: -1.2s; }
        .dkp-sw3 { animation-delay: -2.4s; }
        .dkp-scrub {
          transform-box: fill-box; transform-origin: 0 0;
          animation: dkp-push 1.8s ease-in-out infinite;
        }
        .dkp-rope {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: dkp-haul 4.4s ease-in-out infinite;
        }
        .dkp-splash {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: dkp-fly 1.8s ease-out infinite;
        }
        .dkp-sp2 { animation-delay: -0.6s; }
        .dkp-sp3 { animation-delay: -1.2s; }
        .dkp-coin-a { animation: dkp-pop 2.6s ease-out infinite; }
        .dkp-coin-b { animation: dkp-pop 2.6s ease-out infinite; animation-delay: -0.9s; }
        .dkp-coin-c { animation: dkp-pop 2.6s ease-out infinite; animation-delay: -1.8s; }
        @keyframes dkp-lap {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(11px); }
        }
        @keyframes dkp-push {
          0%, 100% { transform: rotate(0deg) translateX(0); }
          50% { transform: rotate(-7deg) translateX(-9px); }
        }
        @keyframes dkp-haul {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-6px); }
        }
        @keyframes dkp-fly {
          0% { transform: translate(0, 6px) scale(0.4); opacity: 0; }
          30% { opacity: 0.95; }
          100% { transform: translate(-26px, -18px) scale(1.2); opacity: 0; }
        }
        @keyframes dkp-pop {
          0%, 30% { transform: translate(0, 34px); opacity: 0; }
          52% { transform: translate(0, 0); opacity: 1; }
          82% { transform: translate(0, -8px); opacity: 1; }
          100% { transform: translate(0, -20px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .dkp-swell, .dkp-scrub, .dkp-rope, .dkp-splash,
          .dkp-coin-a, .dkp-coin-b, .dkp-coin-c { animation: none; }
        }
      `}</style>
    </svg>
  );
}
