/**
 * 夕方の灯明祭。舟を漕ぐのを手伝い、船頭と実入りを分ける。
 *
 * ガートの上では司祭が大きな灯明を振り、川面には灯明の葉舟が流れる。
 * 手前の舟で旅人が櫂を漕ぎ、客から受け取った硬貨が舞い上がる。
 */
export function GhatBoatman() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 暮れかけの空と川 */}
      <rect width="400" height="210" fill="#2c3f60" />
      <rect y="62" width="400" height="26" fill="#7a4a52" />
      <rect y="88" width="400" height="14" fill="#a8583e" />

      {/* 岸のお堂 */}
      <g fill="#5a4030">
        <path d="M336,102 L336,64 Q350,36 364,64 L364,102 z" />
        <rect x="344" y="30" width="12" height="10" />
        <path d="M376,102 L376,72 Q386,52 396,72 L396,102 z" />
      </g>
      <circle cx="350" cy="28" r="5" fill="#f5b31c" />

      {/* ガートの石段 */}
      <g>
        <rect x="330" y="88" width="70" height="14" fill="#c9a877" />
        <rect x="314" y="102" width="86" height="10" fill="#b8956a" />
        <rect x="298" y="112" width="102" height="10" fill="#c9a877" />
        <rect x="282" y="122" width="118" height="10" fill="#b8956a" />
        <rect x="266" y="132" width="134" height="10" fill="#c9a877" />
        <rect x="250" y="142" width="150" height="10" fill="#a8865c" />
      </g>

      {/* 灯明を振る司祭 */}
      <g>
        <path d="M348,88 L352,62 L366,62 L370,88 z" fill="#f0e6d2" />
        <circle cx="359" cy="54" r="9" fill="#c08a5a" />
        <rect x="332" y="66" width="24" height="8" rx="4" fill="#f0e6d2" />
      </g>
      <g className="ghatbm-aarti" transform="translate(332,70)">
        <rect x="-2" y="0" width="4" height="14" fill="#c98a12" />
        <rect x="-15" y="-8" width="30" height="5" rx="2" fill="#f5b31c" />
        <rect x="-11" y="-17" width="22" height="5" rx="2" fill="#f5b31c" />
        <rect x="-7" y="-26" width="14" height="5" rx="2" fill="#f5b31c" />
        <g className="ghatbm-blaze" fill="#ffd873">
          <ellipse cx="-11" cy="-12" rx="3" ry="5" />
          <ellipse cx="0" cy="-12" rx="3" ry="5" />
          <ellipse cx="11" cy="-12" rx="3" ry="5" />
          <ellipse cx="-7" cy="-21" rx="3" ry="5" />
          <ellipse cx="7" cy="-21" rx="3" ry="5" />
          <ellipse cx="0" cy="-30" rx="3.5" ry="6" />
        </g>
      </g>

      {/* 川面 */}
      <rect y="152" width="400" height="58" fill="#1c3450" />
      <g className="ghatbm-ripple" stroke="#2f5478" strokeWidth="2.5" strokeLinecap="round">
        <path d="M18,164 q10,-4 20,0" fill="none" />
        <path d="M232,170 q10,-4 20,0" fill="none" />
        <path d="M300,182 q10,-4 20,0" fill="none" />
        <path d="M96,198 q10,-4 20,0" fill="none" />
        <path d="M348,196 q10,-4 20,0" fill="none" />
      </g>

      {/* 流れる灯明の葉舟 */}
      <g transform="translate(24,172)">
        <g className="ghatbm-diya ghatbm-diya-a">
          <ellipse rx="9" ry="4" fill="#3a7a4a" />
          <ellipse className="ghatbm-flame" cy="-6" rx="3" ry="5" fill="#f5b31c" />
        </g>
      </g>
      <g transform="translate(126,190)">
        <g className="ghatbm-diya ghatbm-diya-b">
          <ellipse rx="10" ry="4.5" fill="#3a7a4a" />
          <ellipse className="ghatbm-flame" cy="-7" rx="3.5" ry="5.5" fill="#f5b31c" />
        </g>
      </g>
      <g transform="translate(246,164)">
        <g className="ghatbm-diya ghatbm-diya-c">
          <ellipse rx="8" ry="3.5" fill="#3a7a4a" />
          <ellipse className="ghatbm-flame" cy="-6" rx="2.5" ry="4.5" fill="#f5b31c" />
        </g>
      </g>
      <g transform="translate(320,200)">
        <g className="ghatbm-diya ghatbm-diya-d">
          <ellipse rx="10" ry="4.5" fill="#3a7a4a" />
          <ellipse className="ghatbm-flame" cy="-7" rx="3.5" ry="5.5" fill="#f5b31c" />
        </g>
      </g>

      {/* 手漕ぎの舟 */}
      <g className="ghatbm-boat">
        {/* 櫂 */}
        <g className="ghatbm-oar" transform="translate(102,152)">
          <rect x="-56" y="-3" width="60" height="6" rx="3" fill="#7a5a3a" />
          <ellipse cx="-58" cy="0" rx="9" ry="7" fill="#6b4a2a" />
        </g>
        {/* 客 */}
        <g>
          <rect x="132" y="150" width="18" height="16" rx="4" fill="#e8443f" />
          <circle cx="141" cy="142" r="9" fill="#f6efe2" />
          <rect x="152" y="150" width="18" height="16" rx="4" fill="#f5b31c" />
          <circle cx="161" cy="142" r="9" fill="#f6efe2" />
          <rect x="172" y="150" width="18" height="16" rx="4" fill="#e0d3ba" />
          <circle cx="181" cy="142" r="9" fill="#f6efe2" />
        </g>
        {/* 漕ぎ手(旅人) */}
        <g>
          <rect x="90" y="146" width="22" height="20" rx="5" fill="#5b8fe8" />
          <circle cx="101" cy="136" r="10" fill="#f6efe2" />
          <path d="M91,135 a10,10 0 0 1 20,0 z" fill="#2a1f18" />
          <rect x="86" y="148" width="20" height="8" rx="4" fill="#f6efe2" />
        </g>
        {/* 舟 */}
        <rect x="60" y="160" width="146" height="7" rx="3.5" fill="#a8703a" />
        <path d="M60,166 L206,166 Q133,196 60,166 z" fill="#8a5a2a" />
      </g>

      {/* 分け前の硬貨 */}
      <g transform="translate(120,128)">
        <g className="ghatbm-coin ghatbm-coin-a">
          <circle r="7" fill="#f5b31c" />
          <circle r="3.5" fill="#c98a12" />
        </g>
      </g>
      <g transform="translate(140,120)">
        <g className="ghatbm-coin ghatbm-coin-b">
          <circle r="6" fill="#f5b31c" />
          <circle r="3" fill="#c98a12" />
        </g>
      </g>
      <g transform="translate(104,116)">
        <g className="ghatbm-coin ghatbm-coin-c">
          <circle r="5" fill="#f5b31c" />
          <circle r="2.5" fill="#c98a12" />
        </g>
      </g>

      <style>{`
        .ghatbm-aarti { animation: ghatbm-swing 2.6s ease-in-out infinite; transform-origin: 332px 70px; }
        .ghatbm-blaze { animation: ghatbm-flicker 0.5s ease-in-out infinite alternate; }
        .ghatbm-flame { animation: ghatbm-flicker 0.7s ease-in-out infinite alternate; transform-box: fill-box; transform-origin: 50% 100%; }
        .ghatbm-boat { animation: ghatbm-bob 3s ease-in-out infinite; }
        .ghatbm-oar { animation: ghatbm-row 1.8s ease-in-out infinite; transform-origin: 102px 152px; }
        .ghatbm-ripple { animation: ghatbm-lap 2.8s ease-in-out infinite; }
        .ghatbm-diya { animation: ghatbm-drift 6s linear infinite; }
        .ghatbm-diya-b { animation-delay: 1.5s; }
        .ghatbm-diya-c { animation-delay: 3s; }
        .ghatbm-diya-d { animation-delay: 4.5s; }
        .ghatbm-coin { animation: ghatbm-share 2.4s ease-out infinite; }
        .ghatbm-coin-b { animation-delay: 0.6s; }
        .ghatbm-coin-c { animation-delay: 1.2s; }
        @keyframes ghatbm-swing {
          0%, 100% { transform: rotate(-21deg); }
          50% { transform: rotate(21deg); }
        }
        @keyframes ghatbm-flicker {
          from { transform: scaleY(1); opacity: 1; }
          to { transform: scaleY(0.74); opacity: 0.78; }
        }
        @keyframes ghatbm-bob {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(0, -4px) rotate(-1.2deg); }
        }
        @keyframes ghatbm-row {
          0%, 100% { transform: rotate(-15deg); }
          50% { transform: rotate(17deg); }
        }
        @keyframes ghatbm-lap {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(6px, -2px); }
        }
        @keyframes ghatbm-drift {
          0% { transform: translate(0, 0); }
          50% { transform: translate(22px, -3px); }
          100% { transform: translate(44px, 0); }
        }
        @keyframes ghatbm-share {
          0% { transform: translate(0, 0); opacity: 1; }
          70% { opacity: 1; }
          100% { transform: translate(0, -40px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ghatbm-aarti, .ghatbm-blaze, .ghatbm-flame, .ghatbm-boat, .ghatbm-oar,
          .ghatbm-ripple, .ghatbm-diya, .ghatbm-coin { animation: none; }
        }
      `}</style>
    </svg>
  );
}
