/**
 * 幹線道路のブロケオ(封鎖)。
 *
 * 岩とタイヤの山で道が塞がれ、バスもトラックも数珠つなぎのまま動けない。
 *   - 積み石の前で人が旗を振り、タイヤの煙が空へ上がる
 *   - 列の先頭のバスはクラクションを鳴らしながら前後に揺れる
 *   - 誰も通れないので、旅人は手を上げて立ち尽くす
 */
export function BoliviaBloqueo() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 高原の夕暮れ */}
      <rect width="400" height="210" fill="#41576f" />
      <rect y="72" width="400" height="24" fill="#556d88" />
      <g fill="#33415a">
        <path d="M0,112 L44,64 L88,112z" />
        <path d="M74,112 L140,52 L206,112z" />
        <path d="M196,112 L252,70 L308,112z" />
        <path d="M298,112 L352,60 L400,112z" />
      </g>
      <g fill="#c7d6e2">
        <path d="M128,66 L140,52 L152,66 L144,62 L136,64z" />
        <path d="M342,74 L352,60 L364,74 L356,70 L348,72z" />
      </g>

      {/* 荒地 */}
      <rect y="110" width="400" height="100" fill="#6b5a44" />
      <g fill="#5c4d3a">
        <ellipse cx="42" cy="122" rx="26" ry="6" />
        <ellipse cx="238" cy="120" rx="30" ry="6" />
        <ellipse cx="366" cy="126" rx="24" ry="6" />
      </g>

      {/* 幹線道路 */}
      <rect y="132" width="400" height="52" fill="#41404a" />
      <rect y="132" width="400" height="3" fill="#565663" />
      <g fill="#c9c4b4">
        <rect x="10" y="140" width="30" height="4" />
        <rect x="66" y="140" width="30" height="4" />
        <rect x="122" y="140" width="30" height="4" />
        <rect x="178" y="140" width="30" height="4" />
        <rect x="234" y="140" width="30" height="4" />
        <rect x="290" y="140" width="30" height="4" />
        <rect x="346" y="140" width="30" height="4" />
      </g>
      <rect y="184" width="400" height="26" fill="#5c4d3a" />

      {/* 道をふさぐ岩 */}
      <g>
        <path d="M256,182 L254,156 L266,136 L286,142 L294,164 L292,182z" fill="#9a938a" />
        <path d="M290,182 L286,148 L300,116 L324,110 L344,130 L348,158 L344,182z" fill="#847c73" />
        <path d="M338,182 L336,150 L350,128 L372,136 L380,162 L376,182z" fill="#9a938a" />
        <path d="M370,182 L372,154 L388,142 L400,150 L400,182z" fill="#77706a" />
        <path d="M304,182 L300,166 L312,154 L328,160 L330,182z" fill="#6b655f" />
        <path d="M352,182 L350,170 L362,164 L372,172 L370,182z" fill="#6b655f" />
      </g>

      {/* 燃えるタイヤ */}
      <g>
        <ellipse cx="256" cy="180" rx="22" ry="5" fill="#33323a" />
        <circle cx="256" cy="166" r="16" fill="#232227" />
        <circle cx="256" cy="166" r="6" fill="#4a4f57" />
        <path
          className="blq-fire blq-fire-a"
          d="M256,124 C268,136 274,146 271,153 C268,160 262,163 256,163 C250,163 244,160 241,153 C238,146 244,136 256,124z"
          fill="#e05252"
        />
        <path
          className="blq-fire blq-fire-b"
          d="M256,138 C262,145 264,150 262,155 C260,159 252,159 250,155 C248,150 250,145 256,138z"
          fill="#f5b31c"
        />
      </g>
      <g fill="#5a5a5e">
        <g className="blq-smoke blq-smoke-a" opacity="0.75">
          <circle cx="258" cy="92" r="15" />
          <circle cx="274" cy="100" r="11" />
          <circle cx="244" cy="102" r="10" />
        </g>
        <g className="blq-smoke blq-smoke-b" opacity="0.6">
          <circle cx="248" cy="56" r="14" />
          <circle cx="264" cy="64" r="10" />
        </g>
        <g className="blq-smoke blq-smoke-c" opacity="0.45">
          <circle cx="266" cy="26" r="16" />
          <circle cx="286" cy="34" r="11" />
        </g>
      </g>

      {/* 封鎖している人たち */}
      <g transform="translate(306,180)">
        <rect x="-11" y="-16" width="22" height="16" rx="4" fill="#4a3f52" />
        <rect x="-10" y="-38" width="20" height="24" rx="6" fill="#3f6bb0" />
        <circle cx="0" cy="-46" r="10" fill="#c98a5e" />
        <path d="M-11,-48 a11,11 0 0 1 22,0z" fill="#2a2028" />
        <rect x="-15" y="-56" width="30" height="6" rx="3" fill="#2a2028" />
        <rect className="blq-arm" x="6" y="-42" width="9" height="24" rx="4" fill="#3f6bb0" />
      </g>
      <g transform="translate(348,180)">
        <rect x="-14" y="-18" width="28" height="18" rx="5" fill="#5e3f52" />
        <rect x="-10" y="-38" width="20" height="22" rx="6" fill="#8a4a3f" />
        <circle cx="0" cy="-46" r="10" fill="#c98a5e" />
        <path d="M-11,-48 a11,11 0 0 1 22,0z" fill="#2a2028" />
        <rect x="-14" y="-56" width="28" height="6" rx="3" fill="#2f8f5b" />
        <rect x="10" y="-96" width="4" height="80" fill="#6b5a44" />
        <g className="blq-flag">
          <rect x="14" y="-96" width="9" height="8" fill="#e05252" />
          <rect x="23" y="-96" width="9" height="8" fill="#e8802f" />
          <rect x="32" y="-96" width="9" height="8" fill="#f5b31c" />
          <rect x="14" y="-88" width="9" height="8" fill="#e8802f" />
          <rect x="23" y="-88" width="9" height="8" fill="#f5b31c" />
          <rect x="32" y="-88" width="9" height="8" fill="#f6efe2" />
          <rect x="14" y="-80" width="9" height="8" fill="#f5b31c" />
          <rect x="23" y="-80" width="9" height="8" fill="#f6efe2" />
          <rect x="32" y="-80" width="9" height="8" fill="#4f9e4a" />
        </g>
      </g>

      {/* 手を上げる旅人 */}
      <g transform="translate(226,180)">
        <rect x="-9" y="-18" width="7" height="18" rx="3" fill="#2e2a38" />
        <rect x="2" y="-18" width="7" height="18" rx="3" fill="#2e2a38" />
        <rect x="-10" y="-42" width="20" height="26" rx="6" fill="#f5b31c" />
        <circle cx="0" cy="-50" r="10" fill="#f6efe2" />
        <rect className="blq-shrug-l" x="-19" y="-56" width="8" height="18" rx="4" fill="#f5b31c" />
        <rect className="blq-shrug-r" x="11" y="-56" width="8" height="18" rx="4" fill="#f5b31c" />
      </g>

      {/* 先頭のバス */}
      <g className="blq-bus">
        <rect x="102" y="118" width="112" height="48" rx="7" fill="#e05252" />
        <rect x="102" y="150" width="112" height="7" fill="#b83f3f" />
        <g fill="#8fc4e8">
          <rect x="110" y="126" width="22" height="18" rx="2" />
          <rect x="137" y="126" width="22" height="18" rx="2" />
          <rect x="164" y="126" width="22" height="18" rx="2" />
          <rect x="191" y="126" width="17" height="18" rx="2" />
        </g>
        <rect x="102" y="112" width="112" height="8" rx="4" fill="#f6efe2" />
        <circle cx="209" cy="162" r="4" fill="#f5e08a" />
        <circle className="blq-brake" cx="106" cy="162" r="4" fill="#ff6b5e" />
        <circle cx="124" cy="170" r="11" fill="#1f1f24" />
        <circle cx="192" cy="170" r="11" fill="#1f1f24" />
        <circle cx="124" cy="170" r="4" fill="#4a4f57" />
        <circle cx="192" cy="170" r="4" fill="#4a4f57" />
      </g>

      {/* クラクション */}
      <g className="blq-honk" fill="none" stroke="#f5e08a" strokeWidth="3" strokeLinecap="round">
        <path className="blq-honk-a" d="M220,80 a12,12 0 0 1 0,20" />
        <path className="blq-honk-b" d="M226,74 a18,18 0 0 1 0,32" />
        <path className="blq-honk-c" d="M232,68 a24,24 0 0 1 0,44" />
      </g>

      {/* 後ろのトラック */}
      <g className="blq-truck">
        <rect x="2" y="122" width="46" height="42" fill="#a8916e" />
        <rect x="2" y="132" width="46" height="6" fill="#8f7a5a" />
        <rect x="48" y="134" width="34" height="30" rx="5" fill="#3f6bb0" />
        <rect x="54" y="140" width="20" height="14" rx="2" fill="#8fc4e8" />
        <circle cx="79" cy="160" r="3.5" fill="#f5e08a" />
        <circle className="blq-brake-b" cx="6" cy="158" r="3.5" fill="#ff6b5e" />
        <circle cx="20" cy="168" r="10" fill="#1f1f24" />
        <circle cx="66" cy="168" r="10" fill="#1f1f24" />
        <circle cx="20" cy="168" r="3.5" fill="#4a4f57" />
        <circle cx="66" cy="168" r="3.5" fill="#4a4f57" />
      </g>

      <style>{`
        .blq-bus { transform-box: fill-box; transform-origin: 50% 100%; animation: blq-idle 2.6s ease-in-out infinite; }
        .blq-truck { transform-box: fill-box; transform-origin: 50% 100%; animation: blq-idle 2.6s ease-in-out infinite; animation-delay: -1.1s; }
        .blq-brake { animation: blq-blink 1s steps(1, end) infinite; }
        .blq-brake-b { animation: blq-blink 1.4s steps(1, end) infinite; }
        .blq-honk-a { animation: blq-beep 1.6s ease-out infinite; }
        .blq-honk-b { animation: blq-beep 1.6s ease-out infinite; animation-delay: 0.14s; }
        .blq-honk-c { animation: blq-beep 1.6s ease-out infinite; animation-delay: 0.28s; }
        .blq-fire { transform-box: fill-box; transform-origin: 50% 100%; }
        .blq-fire-a { animation: blq-flare 0.5s ease-in-out infinite alternate; }
        .blq-fire-b { animation: blq-flare 0.34s ease-in-out infinite alternate; }
        .blq-smoke { transform-box: fill-box; transform-origin: 50% 100%; }
        .blq-smoke-a { animation: blq-rise 4s ease-out infinite; }
        .blq-smoke-b { animation: blq-rise 4s ease-out infinite; animation-delay: -1.4s; }
        .blq-smoke-c { animation: blq-rise 4s ease-out infinite; animation-delay: -2.7s; }
        .blq-flag { transform-box: fill-box; transform-origin: 0 50%; animation: blq-wave 1.7s ease-in-out infinite; }
        .blq-arm { transform-box: fill-box; transform-origin: 50% 0; animation: blq-halt 1.9s ease-in-out infinite; }
        .blq-shrug-l { transform-box: fill-box; transform-origin: 50% 100%; animation: blq-shrug 3s ease-in-out infinite; }
        .blq-shrug-r { transform-box: fill-box; transform-origin: 50% 100%; animation: blq-shrug 3s ease-in-out infinite reverse; }
        @keyframes blq-idle {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          40% { transform: translate(5px, 0) rotate(-0.6deg); }
          70% { transform: translate(-3px, 0) rotate(0.4deg); }
        }
        @keyframes blq-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0.25; }
        }
        @keyframes blq-beep {
          0% { opacity: 0; transform: translateX(-6px); }
          25% { opacity: 0.95; }
          100% { opacity: 0; transform: translateX(8px); }
        }
        @keyframes blq-flare {
          from { transform: scaleY(0.72) scaleX(1.1); }
          to { transform: scaleY(1.24) scaleX(0.9); }
        }
        @keyframes blq-rise {
          0% { transform: translateY(72px) scale(0.3); opacity: 0; }
          25% { opacity: 0.7; }
          100% { transform: translateY(-56px) scale(1.6); opacity: 0; }
        }
        @keyframes blq-wave {
          0%, 100% { transform: skewY(-5deg) scaleX(1); }
          50% { transform: skewY(6deg) scaleX(0.88); }
        }
        @keyframes blq-halt {
          0%, 100% { transform: rotate(-18deg); }
          50% { transform: rotate(-46deg); }
        }
        @keyframes blq-shrug {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(16deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .blq-bus, .blq-truck, .blq-brake, .blq-brake-b, .blq-honk-a, .blq-honk-b, .blq-honk-c,
          .blq-fire-a, .blq-fire-b, .blq-smoke-a, .blq-smoke-b, .blq-smoke-c, .blq-flag,
          .blq-arm, .blq-shrug-l, .blq-shrug-r { animation: none; }
        }
      `}</style>
    </svg>
  );
}
