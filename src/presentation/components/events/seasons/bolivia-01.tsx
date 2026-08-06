/**
 * 5月 — 乾季のはじまり(ボリビア)。
 *
 * 雲ひとつない濃い青空。山腹に切られた坑道口からトロッコが次々と出て、
 * 巻き上げやぐらは回りっぱなし。乾いた道をトラックが土ぼこりを上げて走る。
 */
export function Bolivia01() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 澄みきった高地の空 */}
      <rect width="400" height="210" fill="#2f7fc4" />
      <rect y="66" width="400" height="36" fill="#4a95d2" />
      <rect y="102" width="400" height="34" fill="#7fb6df" />

      {/* 高く舞う鳥 */}
      <g className="b01-bird b01-bird-a" fill="none" stroke="#1e5b91" strokeWidth="2.4" strokeLinecap="round">
        <path d="M0,0 q5,-6 10,0 q5,-6 10,0" />
      </g>
      <g className="b01-bird b01-bird-b" fill="none" stroke="#1e5b91" strokeWidth="2" strokeLinecap="round">
        <path d="M0,0 q4,-5 8,0 q4,-5 8,0" />
      </g>

      {/* 鉱山の山 */}
      <path d="M0,136 L62,64 L142,136 Z" fill="#8f6a58" />
      <path d="M132,136 L258,20 L384,136 Z" fill="#a8583c" />
      <path d="M258,20 L384,136 L300,136 Z" fill="#8c4630" />
      <g fill="#c47a52">
        <path d="M226,136 L248,72 L256,76 L240,136 Z" />
        <path d="M300,136 L316,92 L324,98 L310,136 Z" />
      </g>
      <path d="M356,136 L400,96 L400,136 Z" fill="#8f6a58" />

      {/* 山腹に切られた鉱山の段 */}
      <rect x="176" y="114" width="168" height="6" fill="#8c4630" />
      <rect x="176" y="100" width="168" height="14" fill="#8a6b40" />
      <rect x="176" y="100" width="168" height="3" fill="#a68048" />

      {/* ズリの流れ落ちる斜面 */}
      <path d="M176,112 L206,112 L184,152 L136,152 Z" fill="#7a6a5c" />
      <path d="M180,116 L198,116 L182,148 L154,148 Z" fill="#665a4e" />

      {/* トロッコの軌道 */}
      <rect x="182" y="104" width="118" height="2.2" fill="#5f5346" />
      <rect x="182" y="109" width="118" height="2.2" fill="#5f5346" />
      <g fill="#6b4a33">
        <rect x="186" y="103" width="3.4" height="9" />
        <rect x="206" y="103" width="3.4" height="9" />
        <rect x="226" y="103" width="3.4" height="9" />
        <rect x="246" y="103" width="3.4" height="9" />
        <rect x="266" y="103" width="3.4" height="9" />
        <rect x="286" y="103" width="3.4" height="9" />
      </g>

      {/* 坑口 */}
      <rect x="240" y="66" width="62" height="7" rx="2" fill="#8a5f3f" />
      <rect x="244" y="73" width="54" height="7" fill="#6b4a33" />
      <rect x="244" y="73" width="9" height="41" fill="#6b4a33" />
      <rect x="289" y="73" width="9" height="41" fill="#6b4a33" />
      <path d="M253,114 L253,96 A18,18 0 0 1 289,96 L289,114 Z" fill="#231c2a" />

      {/* 巻き上げやぐら */}
      <g>
        <path d="M310,114 L326,50 L332,50 L320,114 Z" fill="#7d818f" />
        <path d="M354,114 L338,50 L332,50 L344,114 Z" fill="#6a6e7c" />
        <rect x="320" y="72" width="24" height="4" fill="#7d818f" />
        <rect x="316" y="92" width="32" height="4" fill="#7d818f" />
        <path d="M325,50 L339,50 L337,40 L327,40 Z" fill="#8a8e9c" />
        <rect x="330" y="44" width="3" height="70" fill="#3f4552" />
        <g className="b01-hoist">
          <circle cx="332" cy="34" r="12" fill="#57606f" />
          <g fill="#c3c8d4">
            <rect x="330.6" y="24" width="2.8" height="20" />
            <rect x="322" y="32.6" width="20" height="2.8" />
            <rect x="323.4" y="25.4" width="2.8" height="17" transform="rotate(45 324.8 33.9)" />
            <rect x="338.6" y="25.4" width="2.8" height="17" transform="rotate(-45 340 33.9)" />
          </g>
          <circle cx="332" cy="34" r="4" fill="#e2e6ee" />
        </g>
      </g>

      {/* 坑口から出てくるトロッコ */}
      <g className="b01-cart b01-cart-a">
        <path d="M-11,-14 L11,-14 L9,-3 L-9,-3 Z" fill="#5f6673" />
        <rect x="-11" y="-16" width="22" height="3" fill="#7d848f" />
        <g fill="#4a4038">
          <circle cx="-4" cy="-16" r="3.4" />
          <circle cx="3" cy="-17" r="4" />
          <circle cx="8" cy="-15" r="3" />
        </g>
        <circle cx="-5" cy="0" r="3.4" fill="#2b2436" />
        <circle cx="5" cy="0" r="3.4" fill="#2b2436" />
      </g>
      <g className="b01-cart b01-cart-b">
        <path d="M-11,-14 L11,-14 L9,-3 L-9,-3 Z" fill="#5f6673" />
        <rect x="-11" y="-16" width="22" height="3" fill="#7d848f" />
        <g fill="#4a4038">
          <circle cx="-3" cy="-16" r="3.8" />
          <circle cx="5" cy="-16" r="3.2" />
        </g>
        <circle cx="-5" cy="0" r="3.4" fill="#2b2436" />
        <circle cx="5" cy="0" r="3.4" fill="#2b2436" />
      </g>

      {/* 高原の地面と乾いた道 */}
      <rect y="136" width="400" height="22" fill="#b8935f" />
      <rect y="136" width="400" height="4" fill="#9c7a48" />
      <rect y="158" width="400" height="34" fill="#c9a877" />
      <rect y="158" width="400" height="4" fill="#a8875a" />
      <rect y="192" width="400" height="18" fill="#a8874f" />
      <g fill="#8f7040">
        <rect x="16" y="197" width="52" height="3" />
        <rect x="96" y="203" width="70" height="3" />
        <rect x="204" y="196" width="60" height="3" />
        <rect x="298" y="204" width="74" height="3" />
      </g>

      {/* 土ぼこりを上げて走るトラック */}
      <g className="b01-truck">
        <g fill="#e5d3ac">
          <ellipse className="b01-dust b01-dust-a" cx="-4" cy="186" rx="13" ry="11" />
          <ellipse className="b01-dust b01-dust-b" cx="-22" cy="182" rx="11" ry="9" />
          <ellipse className="b01-dust b01-dust-c" cx="-40" cy="188" rx="9" ry="8" />
        </g>
        <rect x="8" y="140" width="70" height="26" fill="#8a6b40" />
        <rect x="8" y="140" width="70" height="5" fill="#a8875a" />
        <g fill="#ddd0b0">
          <ellipse cx="24" cy="136" rx="13" ry="8" />
          <ellipse cx="48" cy="133" rx="13" ry="8" />
          <ellipse cx="70" cy="136" rx="11" ry="7" />
        </g>
        <path d="M80,132 L106,132 L114,150 L114,166 L80,166 Z" fill="#e8443f" />
        <rect x="86" y="136" width="22" height="14" rx="2" fill="#b8dcf0" />
        <rect x="4" y="166" width="114" height="7" fill="#4a3524" />
        <circle cx="30" cy="180" r="11" fill="#2b2436" />
        <circle cx="30" cy="180" r="4.5" fill="#8f8f9c" />
        <circle cx="98" cy="180" r="11" fill="#2b2436" />
        <circle cx="98" cy="180" r="4.5" fill="#8f8f9c" />
      </g>

      <style>{`
        .b01-bird-a { transform: translate(120px, 40px); animation: b01-glide-a 17s linear infinite; }
        .b01-bird-b { transform: translate(250px, 26px); animation: b01-glide-b 22s linear -8s infinite; }
        .b01-hoist { transform-box: fill-box; transform-origin: 50% 50%; animation: b01-spin 1.6s linear infinite; }
        .b01-cart { transform-box: fill-box; transform-origin: 50% 50%; }
        .b01-cart-a { transform: translate(244px, 114px); animation: b01-haul 5s linear infinite; }
        .b01-cart-b { transform: translate(206px, 114px); animation: b01-haul 5s linear -2.5s infinite; }
        .b01-truck { transform: translateX(120px); animation: b01-drive 9s linear infinite; }
        .b01-dust { transform-box: fill-box; transform-origin: 50% 100%; }
        .b01-dust-a { animation: b01-puff 1.4s ease-out infinite; }
        .b01-dust-b { animation: b01-puff 1.4s ease-out -0.45s infinite; }
        .b01-dust-c { animation: b01-puff 1.4s ease-out -0.9s infinite; }
        @keyframes b01-glide-a {
          from { transform: translate(-40px, 44px); }
          to { transform: translate(430px, 28px); }
        }
        @keyframes b01-glide-b {
          from { transform: translate(-40px, 22px); }
          to { transform: translate(430px, 40px); }
        }
        @keyframes b01-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes b01-haul {
          0% { transform: translate(288px, 114px); opacity: 0; }
          10% { transform: translate(280px, 114px); opacity: 1; }
          80% { transform: translate(196px, 114px); opacity: 1; }
          94% { transform: translate(182px, 116px); opacity: 0; }
          100% { transform: translate(182px, 116px); opacity: 0; }
        }
        @keyframes b01-drive {
          from { transform: translateX(-160px); }
          to { transform: translateX(410px); }
        }
        @keyframes b01-puff {
          0% { transform: translateY(4px) scale(0.3); opacity: 0.85; }
          100% { transform: translateY(-14px) scale(1.5); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .b01-bird-a, .b01-bird-b, .b01-hoist, .b01-cart-a, .b01-cart-b,
          .b01-truck, .b01-dust-a, .b01-dust-b, .b01-dust-c { animation: none; }
        }
      `}</style>
    </svg>
  );
}
