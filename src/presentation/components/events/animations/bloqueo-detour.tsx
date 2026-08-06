/**
 * 抗議のブロケオ(道路封鎖)。石とタイヤで幹線が塞がれ、長い迂回路の分だけ出費が増える。
 *
 *   - 前方は石積みとタイヤの煙、ウィパラを掲げた人たち
 *   - こちらの車は進めずに前後に揺れる
 *   - 点線の迂回路が右下へ延々と続く
 */
export function BloqueoDetour() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夕方の高原 */}
      <rect width="400" height="210" fill="#3b5068" />
      <path d="M0,96 L46,52 L92,96z" fill="#33415a" />
      <path d="M46,52 L60,66 L32,66z" fill="#adc0d2" />
      <path d="M120,96 L196,40 L272,96z" fill="#2c394f" />
      <path d="M196,40 L214,58 L178,58z" fill="#adc0d2" />
      <path d="M280,96 L340,58 L400,96z" fill="#33415a" />
      <rect y="94" width="400" height="116" fill="#5f5140" />

      {/* 幹線道路 */}
      <path d="M0,124 L400,116 L400,168 L0,180z" fill="#41404a" />
      <g fill="#c9c4b4">
        <rect x="18" y="147" width="26" height="4" />
        <rect x="72" y="145" width="26" height="4" />
        <rect x="126" y="143" width="26" height="4" />
        <rect x="180" y="141" width="26" height="4" />
      </g>

      {/* 迂回路 */}
      <path
        className="bloq-detour"
        d="M150,168 C182,200 246,206 302,192 C340,182 372,178 398,170"
        stroke="#e8c98a"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="12 11"
        fill="none"
      />

      {/* 封鎖する人たち */}
      <g transform="translate(266,124)">
        <rect x="-8" y="-30" width="16" height="30" rx="5" fill="#3f6bb0" />
        <circle cx="0" cy="-38" r="9" fill="#c98a5e" />
        <path d="M-9,-40 a9,9 0 0 1 18,0z" fill="#2a2028" />
        <rect x="6" y="-56" width="4" height="56" fill="#6b5a44" />
        <g className="bloq-flag">
          <rect x="10" y="-56" width="10" height="9" fill="#e8443f" />
          <rect x="20" y="-56" width="10" height="9" fill="#e8802f" />
          <rect x="30" y="-56" width="10" height="9" fill="#f5b31c" />
          <rect x="10" y="-47" width="10" height="9" fill="#e8802f" />
          <rect x="20" y="-47" width="10" height="9" fill="#f5b31c" />
          <rect x="30" y="-47" width="10" height="9" fill="#f6efe2" />
          <rect x="10" y="-38" width="10" height="9" fill="#f5b31c" />
          <rect x="20" y="-38" width="10" height="9" fill="#f6efe2" />
          <rect x="30" y="-38" width="10" height="9" fill="#4f9e4a" />
        </g>
      </g>
      <g transform="translate(332,126)">
        <rect x="-8" y="-30" width="16" height="30" rx="5" fill="#8a4a3f" />
        <circle cx="0" cy="-38" r="9" fill="#c98a5e" />
        <rect x="-11" y="-46" width="22" height="7" rx="3" fill="#2f8f5b" />
        <rect x="-16" y="-34" width="12" height="6" rx="3" fill="#c98a5e" />
      </g>

      {/* 積み上げた石とタイヤ */}
      <g>
        <path d="M228,170 L246,136 L268,170z" fill="#8a8279" />
        <path d="M256,170 L278,126 L302,170z" fill="#756e67" />
        <path d="M296,170 L314,138 L334,170z" fill="#8a8279" />
        <path d="M326,168 L344,130 L364,168z" fill="#6e6760" />
        <path d="M356,168 L372,142 L392,168z" fill="#8a8279" />
        <circle cx="300" cy="162" r="16" fill="#232227" />
        <circle cx="300" cy="162" r="6" fill="#4a4f57" />
      </g>

      {/* タイヤの炎と煙 */}
      <g>
        <path className="bloq-fire" d="M290,148 C292,134 308,134 310,148 C306,142 294,142 290,148z" fill="#e8443f" />
        <path className="bloq-fire bloq-fire-b" d="M295,146 C297,136 303,136 305,146z" fill="#f5b31c" />
        <circle className="bloq-smoke bloq-smoke-a" cx="306" cy="54" r="12" fill="#5a5a5e" />
        <circle className="bloq-smoke bloq-smoke-b" cx="292" cy="32" r="11" fill="#6b6b6f" />
        <circle className="bloq-smoke bloq-smoke-c" cx="312" cy="12" r="12" fill="#4f4f53" />
      </g>

      {/* 立ち往生した車 */}
      <g transform="translate(104,150)">
        <g className="bloq-van">
          <ellipse cx="0" cy="12" rx="46" ry="5" fill="#37363f" />
          <rect x="-44" y="-34" width="88" height="34" rx="7" fill="#5b8fe8" />
          <rect x="-44" y="-38" width="88" height="8" rx="4" fill="#f6efe2" />
          <rect x="10" y="-30" width="16" height="13" rx="2" fill="#2b3a4a" />
          <rect x="28" y="-30" width="14" height="13" rx="2" fill="#2b3a4a" />
          <rect x="-40" y="-30" width="16" height="13" rx="2" fill="#2b3a4a" />
          <rect x="-20" y="-30" width="16" height="13" rx="2" fill="#2b3a4a" />
          <circle cx="41" cy="-8" r="4" fill="#f5e08a" />
          <circle className="bloq-brake" cx="-42" cy="-8" r="4" fill="#e8443f" />
          <circle cx="-26" cy="2" r="9" fill="#20242b" />
          <circle cx="26" cy="2" r="9" fill="#20242b" />
          <circle cx="-26" cy="2" r="3.5" fill="#4a4f57" />
          <circle cx="26" cy="2" r="3.5" fill="#4a4f57" />
        </g>
        <g fill="#a8916e" opacity="0.5">
          <circle className="bloq-dust bloq-dust-a" cx="-46" cy="6" r="8" />
          <circle className="bloq-dust bloq-dust-b" cx="-60" cy="2" r="6" />
        </g>
      </g>

      <style>{`
        .bloq-detour { animation: bloq-march 1.4s linear infinite; }
        .bloq-van { animation: bloq-stuck 2.4s ease-in-out infinite; }
        .bloq-brake { animation: bloq-blink 1s steps(1, end) infinite; }
        .bloq-dust { transform-box: fill-box; transform-origin: 50% 50%; }
        .bloq-dust-a { animation: bloq-puff 1.8s ease-out infinite; }
        .bloq-dust-b { animation: bloq-puff 1.8s ease-out infinite; animation-delay: -0.9s; }
        .bloq-flag { transform-box: fill-box; transform-origin: 0 50%; animation: bloq-wave 1.6s ease-in-out infinite; }
        .bloq-fire { transform-box: fill-box; transform-origin: 50% 100%; animation: bloq-flare 0.5s ease-in-out infinite alternate; }
        .bloq-fire-b { animation-duration: 0.35s; }
        .bloq-smoke { transform-box: fill-box; transform-origin: 50% 100%; }
        .bloq-smoke-a { animation: bloq-rise 3.4s ease-out infinite; }
        .bloq-smoke-b { animation: bloq-rise 3.4s ease-out infinite; animation-delay: -1.2s; }
        .bloq-smoke-c { animation: bloq-rise 3.4s ease-out infinite; animation-delay: -2.3s; }
        @keyframes bloq-march {
          0% { stroke-dashoffset: 46; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes bloq-stuck {
          0%, 100% { transform: translateX(0); }
          30% { transform: translateX(9px); }
          70% { transform: translateX(-8px); }
        }
        @keyframes bloq-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0.25; }
        }
        @keyframes bloq-puff {
          0% { transform: translate(6px, 4px) scale(0.3); opacity: 0.9; }
          100% { transform: translate(-16px, -8px) scale(1.5); opacity: 0; }
        }
        @keyframes bloq-wave {
          0%, 100% { transform: skewY(-4deg) scaleX(1); }
          50% { transform: skewY(5deg) scaleX(0.9); }
        }
        @keyframes bloq-flare {
          from { transform: scaleY(0.7) scaleX(1.1); }
          to { transform: scaleY(1.25) scaleX(0.9); }
        }
        @keyframes bloq-rise {
          0% { transform: translateY(34px) scale(0.3); opacity: 0.1; }
          35% { opacity: 0.8; }
          100% { transform: translateY(-34px) scale(1.5); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bloq-detour, .bloq-van, .bloq-brake, .bloq-dust-a, .bloq-dust-b,
          .bloq-flag, .bloq-fire, .bloq-fire-b, .bloq-smoke-a, .bloq-smoke-b,
          .bloq-smoke-c { animation: none; }
        }
      `}</style>
    </svg>
  );
}
