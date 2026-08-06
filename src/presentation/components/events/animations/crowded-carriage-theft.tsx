/**
 * 混み合った一般車両で、背嚢の脇ポケットに手を入れられる。
 *
 * 天井扇が回り、窓の外を景色が流れる。旅人は反対を向いたまま、
 * 背後から伸びた手が財布を抜き出し、硬貨がこぼれ落ちる。
 */
export function CrowdedCarriageTheft() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      <defs>
        <clipPath id="carthef-window-clip">
          <rect x="34" y="44" width="102" height="50" />
        </clipPath>
      </defs>

      {/* 車内 */}
      <rect width="400" height="210" fill="#22323f" />
      <rect y="176" width="400" height="34" fill="#1a2731" />

      {/* 窓と流れる景色 */}
      <rect x="30" y="40" width="110" height="58" rx="6" fill="#4a5f70" />
      <rect x="34" y="44" width="102" height="50" fill="#3f6ea8" />
      <g clipPath="url(#carthef-window-clip)">
        <g className="carthef-scenery">
          <g>
            <path d="M34,94 L34,80 L58,66 L82,80 L82,94 z" fill="#2e5a80" />
            <rect x="46" y="60" width="4" height="34" fill="#26496b" />
            <path d="M48,60 l-12,-6 12,-2 12,2 z" fill="#2b6b4a" />
            <rect x="106" y="56" width="4" height="38" fill="#26496b" />
            <path d="M108,56 l-12,-6 12,-2 12,2 z" fill="#2b6b4a" />
          </g>
          <g transform="translate(102,0)">
            <path d="M34,94 L34,80 L58,66 L82,80 L82,94 z" fill="#2e5a80" />
            <rect x="46" y="60" width="4" height="34" fill="#26496b" />
            <path d="M48,60 l-12,-6 12,-2 12,2 z" fill="#2b6b4a" />
            <rect x="106" y="56" width="4" height="38" fill="#26496b" />
            <path d="M108,56 l-12,-6 12,-2 12,2 z" fill="#2b6b4a" />
          </g>
        </g>
      </g>
      <rect x="30" y="66" width="110" height="4" fill="#4a5f70" />

      {/* 天井扇 */}
      <rect x="248" y="0" width="5" height="16" fill="#5a6a78" />
      <g className="carthef-fan" fill="#8a9aa8">
        <ellipse cx="250" cy="20" rx="30" ry="6" />
        <ellipse cx="250" cy="20" rx="30" ry="6" transform="rotate(60 250 20)" />
        <ellipse cx="250" cy="20" rx="30" ry="6" transform="rotate(120 250 20)" />
      </g>
      <circle cx="250" cy="20" r="6" fill="#5a6a78" />

      {/* 立ち客でぎゅうぎゅう */}
      <g fill="#18242e">
        <g className="carthef-crowd-a">
          <circle cx="24" cy="118" r="14" />
          <rect x="4" y="134" width="40" height="60" rx="12" />
        </g>
        <g className="carthef-crowd-b">
          <circle cx="70" cy="126" r="13" />
          <rect x="52" y="140" width="38" height="56" rx="12" />
        </g>
        <g className="carthef-crowd-c">
          <circle cx="120" cy="120" r="14" />
          <rect x="100" y="136" width="42" height="60" rx="12" />
        </g>
        <g className="carthef-crowd-d">
          <circle cx="350" cy="112" r="15" />
          <rect x="328" y="128" width="46" height="66" rx="13" />
        </g>
      </g>
      {/* つかまり棒 */}
      <rect x="166" y="0" width="6" height="210" fill="#43555f" />
      <rect x="316" y="0" width="6" height="210" fill="#3a4a54" />

      {/* 反対を向いている旅人 */}
      <g className="carthef-victim">
        <rect x="192" y="96" width="62" height="86" rx="14" fill="#c9a877" />
        <circle cx="222" cy="74" r="22" fill="#f6efe2" />
        <path
          d="M200,74 a22,22 0 0 1 44,0 l0,10 -14,-8 -30,4 z"
          fill="#2a1f18"
        />
        <circle cx="206" cy="76" r="3.5" fill="#241a12" />
        <ellipse cx="200" cy="84" rx="4" ry="3" fill="#e3d4bb" />
      </g>

      {/* 背嚢と脇ポケット */}
      <g>
        <rect x="250" y="98" width="52" height="66" rx="12" fill="#3f6b4a" />
        <rect x="250" y="98" width="52" height="22" rx="11" fill="#356045" />
        <rect x="266" y="120" width="20" height="6" rx="3" fill="#2b4d38" />
        <rect x="296" y="118" width="26" height="40" rx="7" fill="#356045" />
        <path
          className="carthef-flap"
          d="M296,118 h26 v10 h-26 z"
          fill="#2b4d38"
        />
      </g>

      {/* 抜き取る手 */}
      <g className="carthef-hand">
        <rect x="330" y="122" width="86" height="16" rx="8" fill="#4a3a5a" />
        <ellipse cx="330" cy="130" rx="12" ry="10" fill="#d8a878" />
        <g className="carthef-wallet">
          <rect x="308" y="122" width="24" height="16" rx="2" fill="#8a4a2a" />
          <rect x="312" y="118" width="10" height="6" rx="1" fill="#f5b31c" />
        </g>
      </g>

      {/* こぼれた硬貨 */}
      <g transform="translate(316,146)">
        <g className="carthef-coin carthef-coin-a">
          <circle r="6" fill="#f5b31c" />
          <circle r="3" fill="#c98a12" />
        </g>
      </g>
      <g transform="translate(300,152)">
        <g className="carthef-coin carthef-coin-b">
          <circle r="5" fill="#f5b31c" />
          <circle r="2.5" fill="#c98a12" />
        </g>
      </g>

      <style>{`
        .carthef-scenery { animation: carthef-pass 2.4s linear infinite; }
        .carthef-fan { animation: carthef-spin 0.5s linear infinite; transform-origin: 250px 20px; }
        .carthef-crowd-a { animation: carthef-sway 2.1s ease-in-out infinite; }
        .carthef-crowd-b { animation: carthef-sway 2.5s ease-in-out infinite 0.2s; }
        .carthef-crowd-c { animation: carthef-sway 1.9s ease-in-out infinite 0.4s; }
        .carthef-crowd-d { animation: carthef-sway 2.3s ease-in-out infinite 0.6s; }
        .carthef-victim { animation: carthef-sway 2.2s ease-in-out infinite 0.1s; }
        .carthef-flap { animation: carthef-lift 3.2s ease-in-out infinite; transform-origin: 296px 118px; }
        .carthef-hand { transform: translate(-14px, 0); animation: carthef-reach 3.2s ease-in-out infinite; }
        .carthef-wallet { animation: carthef-take 3.2s steps(1, end) infinite; }
        .carthef-coin { animation: carthef-drop 3.2s ease-in infinite; }
        .carthef-coin-b { animation-delay: 0.3s; }
        @keyframes carthef-pass {
          from { transform: translate(0, 0); }
          to { transform: translate(-102px, 0); }
        }
        @keyframes carthef-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes carthef-sway {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-3px, 1px); }
        }
        @keyframes carthef-lift {
          0%, 14% { transform: rotate(0deg); }
          26%, 76% { transform: rotate(-38deg); }
          92%, 100% { transform: rotate(0deg); }
        }
        @keyframes carthef-reach {
          0% { transform: translate(34px, 0); }
          22%, 46% { transform: translate(-44px, 0); }
          74% { transform: translate(-14px, 0); }
          100% { transform: translate(34px, 0); }
        }
        @keyframes carthef-take {
          0%, 45% { opacity: 0; }
          46%, 100% { opacity: 1; }
        }
        @keyframes carthef-drop {
          0%, 58% { transform: translate(0, 0); opacity: 0; }
          62% { opacity: 1; }
          100% { transform: translate(-6px, 32px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .carthef-scenery, .carthef-fan, .carthef-crowd-a, .carthef-crowd-b,
          .carthef-crowd-c, .carthef-crowd-d, .carthef-victim, .carthef-flap,
          .carthef-hand, .carthef-wallet, .carthef-coin { animation: none; }
        }
      `}</style>
    </svg>
  );
}
