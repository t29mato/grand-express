/**
 * 2月 — 豪雪と雪まつり。
 *
 * 日本海側では雪の壁が一階を埋め、人が雪かきをしている。
 * 右手では札幌の雪像の城が、内側から色を変えて光る。降りしきる雪。
 */
export function Japan10() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 雪雲の空 */}
      <rect width="400" height="210" fill="#1f3050" />
      <g fill="#2c4166">
        <ellipse className="j10-cloud j10-cloud-a" cx="70" cy="20" rx="76" ry="22" />
        <ellipse className="j10-cloud j10-cloud-b" cx="240" cy="12" rx="90" ry="20" />
        <ellipse className="j10-cloud j10-cloud-c" cx="368" cy="26" rx="66" ry="18" />
      </g>

      {/* 雪原 */}
      <rect y="164" width="400" height="46" fill="#c3d6e8" />
      <rect y="182" width="400" height="28" fill="#eaf2fa" />

      {/* 雪に埋もれた家 */}
      <path d="M4,96 L80,42 L156,96 Z" fill="#eaf2fa" />
      <path d="M18,96 L80,58 L142,96 Z" fill="#3a3040" />
      <rect x="26" y="96" width="108" height="98" fill="#5d4a3a" />
      <rect x="38" y="100" width="30" height="24" fill="#2a2436" />
      <rect className="j10-win j10-win-a" x="41" y="103" width="24" height="18" fill="#f5b31c" />
      <rect x="90" y="100" width="30" height="24" fill="#2a2436" />
      <rect className="j10-win j10-win-b" x="93" y="103" width="24" height="18" fill="#f5b31c" />

      {/* 一階を埋める雪の壁 */}
      <path d="M0,210 L0,140 C26,116 60,110 100,119 C134,127 158,143 174,166 L178,210 Z" fill="#eaf2fa" />
      <path d="M0,210 L0,156 C30,138 66,136 102,146 C132,155 154,172 166,192 L168,210 Z" fill="#cfe0ee" />

      {/* 屋根に積もった雪 */}
      <path d="M12,98 C30,88 48,72 80,50 C112,72 130,88 148,98 C126,94 106,86 80,64 C54,86 34,94 12,98 Z" fill="#eaf2fa" />

      {/* 雪像の城 */}
      <g>
        {/* 側塔 */}
        <path d="M212,72 L228,42 L244,72 Z" fill="#eaf2fa" />
        <rect x="212" y="72" width="32" height="104" fill="#eaf2fa" />
        <rect x="236" y="72" width="8" height="104" fill="#cfe0ee" />
        <path d="M358,72 L374,42 L390,72 Z" fill="#eaf2fa" />
        <rect x="358" y="72" width="32" height="104" fill="#eaf2fa" />
        <rect x="382" y="72" width="8" height="104" fill="#cfe0ee" />
        {/* 本体 */}
        <path d="M242,88 L301,50 L360,88 Z" fill="#eaf2fa" />
        <rect x="242" y="88" width="118" height="88" fill="#eaf2fa" />
        <g fill="#cfe0ee">
          <rect x="242" y="112" width="118" height="3" />
          <rect x="242" y="134" width="118" height="3" />
          <rect x="242" y="156" width="118" height="3" />
          <rect x="284" y="88" width="4" height="88" />
          <rect x="330" y="88" width="4" height="88" />
        </g>
        {/* 銃眼 */}
        <g fill="#eaf2fa">
          <rect x="240" y="80" width="14" height="10" />
          <rect x="262" y="80" width="14" height="10" />
          <rect x="284" y="80" width="14" height="10" />
          <rect x="306" y="80" width="14" height="10" />
          <rect x="328" y="80" width="14" height="10" />
          <rect x="348" y="80" width="14" height="10" />
        </g>
        {/* 内側から光る門 */}
        <path d="M280,176 L280,138 A21,21 0 0 1 322,138 L322,176 Z" fill="#2a3f5e" />
        <path className="j10-lit j10-lit-a" d="M285,176 L285,139 A16,16 0 0 1 317,139 L317,176 Z" fill="#f5b31c" />
        {/* 内側から光る窓 */}
        <g fill="#2a3f5e">
          <rect x="252" y="120" width="18" height="24" rx="9" />
          <rect x="332" y="120" width="18" height="24" rx="9" />
          <rect x="220" y="96" width="16" height="22" rx="8" />
          <rect x="366" y="96" width="16" height="22" rx="8" />
        </g>
        <rect className="j10-lit j10-lit-b" x="255" y="124" width="12" height="20" rx="6" fill="#5b8fe8" />
        <rect className="j10-lit j10-lit-c" x="335" y="124" width="12" height="20" rx="6" fill="#e8443f" />
        <rect className="j10-lit j10-lit-d" x="223" y="100" width="10" height="18" rx="5" fill="#e8443f" />
        <rect className="j10-lit j10-lit-e" x="369" y="100" width="10" height="18" rx="5" fill="#5b8fe8" />
        {/* 雪の階段 */}
        <path d="M266,176 L336,176 L346,190 L256,190 Z" fill="#cfe0ee" />
      </g>

      {/* 城を見上げる人だかり */}
      <g fill="#2b3550">
        <g transform="translate(232,194)">
          <circle cx="0" cy="-19" r="5" />
          <rect x="-6" y="-14" width="12" height="15" rx="4" />
        </g>
        <g transform="translate(252,196)">
          <circle cx="0" cy="-18" r="4.5" />
          <rect x="-5.5" y="-13" width="11" height="14" rx="4" />
        </g>
        <g transform="translate(348,194)">
          <circle cx="0" cy="-19" r="5" />
          <rect x="-6" y="-14" width="12" height="15" rx="4" />
        </g>
        <g transform="translate(368,197)">
          <circle cx="0" cy="-17" r="4.5" />
          <rect x="-5.5" y="-12" width="11" height="13" rx="4" />
        </g>
      </g>

      {/* 雪かきをする人と、放り上げられた雪 */}
      <g transform="translate(196,200)">
        <ellipse cx="0" cy="2" rx="18" ry="5" fill="#a9c2d8" />
        <rect x="-9" y="-20" width="8" height="21" rx="4" fill="#2b3550" />
        <rect x="2" y="-20" width="8" height="21" rx="4" fill="#2b3550" />
        <g className="j10-shovel">
          <rect x="-6" y="-50" width="30" height="7" rx="3.5" fill="#e8443f" />
          <rect x="16" y="-49" width="28" height="5" rx="2.5" fill="#8a5a34" />
          <path d="M40,-54 L58,-51 L55,-36 L38,-41 Z" fill="#3d5170" />
          <path d="M40,-54 L58,-51 L57,-46 L40,-49 Z" fill="#6d84a0" />
        </g>
        <rect x="-13" y="-50" width="26" height="32" rx="6" fill="#e8443f" />
        <circle cx="0" cy="-60" r="11" fill="#f6efe2" />
        <path d="M-11,-62 a11,11 0 0 1 22,0 L9,-58 L-9,-58 Z" fill="#3b5c96" />
        <circle cx="0" cy="-71" r="4" fill="#f5b31c" />
      </g>
      <g fill="#eaf2fa" stroke="#b6cbdd" strokeWidth="1">
        <circle className="j10-scoop j10-scoop-a" cx="0" cy="0" r="6" />
        <circle className="j10-scoop j10-scoop-b" cx="0" cy="0" r="4.5" />
        <circle className="j10-scoop j10-scoop-c" cx="0" cy="0" r="3.5" />
      </g>

      {/* 降りしきる雪 */}
      <g fill="#f6efe2">
        <circle className="j10-flake j10-flake-a" cx="40" cy="34" r="3" />
        <circle className="j10-flake j10-flake-b" cx="110" cy="72" r="2.2" />
        <circle className="j10-flake j10-flake-c" cx="176" cy="18" r="3.4" />
        <circle className="j10-flake j10-flake-d" cx="238" cy="52" r="2.4" />
        <circle className="j10-flake j10-flake-e" cx="300" cy="46" r="3.2" />
        <circle className="j10-flake j10-flake-f" cx="356" cy="8" r="2.6" />
        <circle className="j10-flake j10-flake-g" cx="72" cy="60" r="2.4" />
        <circle className="j10-flake j10-flake-h" cx="272" cy="24" r="2" />
        <circle className="j10-flake j10-flake-i" cx="146" cy="84" r="2.8" />
      </g>

      <style>{`
        .j10-cloud-a { animation: j10-drift 26s linear infinite; }
        .j10-cloud-b { animation: j10-drift 34s linear -12s infinite; }
        .j10-cloud-c { animation: j10-drift 30s linear -20s infinite; }
        .j10-win-a { animation: j10-flicker 4.4s ease-in-out infinite; }
        .j10-win-b { animation: j10-flicker 4.4s ease-in-out -2.2s infinite; }
        .j10-shovel { transform-box: fill-box; transform-origin: 8% 50%; transform: rotate(26deg); animation: j10-dig 2.4s ease-in-out infinite; }
        .j10-scoop-a { transform: translate(228px, 160px); animation: j10-toss 2.4s ease-out infinite; }
        .j10-scoop-b { transform: translate(214px, 146px); animation: j10-toss 2.4s ease-out -0.12s infinite; }
        .j10-scoop-c { transform: translate(200px, 134px); animation: j10-toss 2.4s ease-out -0.24s infinite; }
        .j10-lit-a { animation: j10-hue 4.5s steps(1, end) infinite; }
        .j10-lit-b { animation: j10-hue 4.5s steps(1, end) -0.9s infinite; }
        .j10-lit-c { animation: j10-hue 4.5s steps(1, end) -1.8s infinite; }
        .j10-lit-d { animation: j10-hue 4.5s steps(1, end) -2.7s infinite; }
        .j10-lit-e { animation: j10-hue 4.5s steps(1, end) -3.6s infinite; }
        .j10-flake-a { animation: j10-fall 6s linear infinite; }
        .j10-flake-b { animation: j10-fall 8s linear -3s infinite; }
        .j10-flake-c { animation: j10-fall 5.4s linear -1.5s infinite; }
        .j10-flake-d { animation: j10-fall 7.2s linear -5s infinite; }
        .j10-flake-e { animation: j10-fall 6.4s linear -2.4s infinite; }
        .j10-flake-f { animation: j10-fall 9s linear -6s infinite; }
        .j10-flake-g { animation: j10-fall 7.6s linear -4.2s infinite; }
        .j10-flake-h { animation: j10-fall 5.8s linear -0.8s infinite; }
        .j10-flake-i { animation: j10-fall 8.6s linear -7s infinite; }
        @keyframes j10-drift {
          from { transform: translateX(-40px); }
          to { transform: translateX(40px); }
        }
        @keyframes j10-flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.72; }
        }
        @keyframes j10-dig {
          0%, 100% { transform: rotate(36deg); }
          42% { transform: rotate(4deg); }
          64% { transform: rotate(9deg); }
        }
        @keyframes j10-toss {
          0%, 34% { transform: translate(240px, 182px) scale(0.4); opacity: 0; }
          44% { transform: translate(232px, 166px) scale(1); opacity: 1; }
          72% { transform: translate(200px, 128px) scale(1); opacity: 1; }
          100% { transform: translate(168px, 122px) scale(0.7); opacity: 0; }
        }
        @keyframes j10-hue {
          0%, 100% { fill: #f5b31c; }
          33% { fill: #5b8fe8; }
          66% { fill: #e8443f; }
        }
        @keyframes j10-fall {
          from { transform: translate(30px, -20px); }
          to { transform: translate(-30px, 220px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .j10-cloud-a, .j10-cloud-b, .j10-cloud-c,
          .j10-win-a, .j10-win-b, .j10-shovel,
          .j10-scoop-a, .j10-scoop-b, .j10-scoop-c,
          .j10-lit-a, .j10-lit-b, .j10-lit-c, .j10-lit-d, .j10-lit-e,
          .j10-flake-a, .j10-flake-b, .j10-flake-c, .j10-flake-d, .j10-flake-e,
          .j10-flake-f, .j10-flake-g, .j10-flake-h, .j10-flake-i { animation: none; }
        }
      `}</style>
    </svg>
  );
}
