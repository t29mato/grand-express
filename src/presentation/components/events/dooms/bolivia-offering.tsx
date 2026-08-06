/**
 * エル・ティーオが供物を要求する。
 *
 * セロ・リコの坑道。粘土のエル・ティーオ像から伸びた大きな手が鉱車を掴んで離さず、
 * 足元にタバコ・コカの葉・純アルコールが並ぶまで何も動かない。
 *   - 鉱車が転がってきて、手が下りてきて掴む
 *   - そのあと供物が1つずつ足元に置かれる
 *   - ロウソクとタバコの火はずっと揺れている
 */
export function BoliviaOffering() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 坑道の岩肌 */}
      <rect width="400" height="210" fill="#221a20" />
      <path
        d="M0,0 L400,0 L400,40 L358,52 L316,36 L266,56 L212,38 L158,58 L106,40 L56,56 L0,42z"
        fill="#3a2b33"
      />
      <path d="M0,42 L0,170 L26,170 L18,120 L34,86 L14,60z" fill="#2f2430" />
      <path d="M400,40 L400,170 L376,170 L384,118 L370,88 L392,62z" fill="#2f2430" />

      {/* 奥へ続く坑口と枠 */}
      <path d="M16,172 L16,116 A31,31 0 0 1 78,116 L78,172z" fill="#150f16" />
      <g fill="#6b4f34">
        <rect x="6" y="106" width="11" height="66" />
        <rect x="77" y="106" width="11" height="66" />
        <rect x="2" y="96" width="90" height="12" />
      </g>

      {/* 坑道の床とレール */}
      <rect y="168" width="400" height="42" fill="#46362c" />
      <rect y="168" width="400" height="4" fill="#5b4736" />
      <g fill="#5a4636">
        <rect x="8" y="180" width="15" height="17" />
        <rect x="52" y="180" width="15" height="17" />
        <rect x="96" y="180" width="15" height="17" />
        <rect x="140" y="180" width="15" height="17" />
        <rect x="184" y="180" width="15" height="17" />
      </g>
      <g fill="#8f8a80">
        <rect y="180" width="236" height="3" />
        <rect y="194" width="236" height="3" />
      </g>
      <rect x="228" y="174" width="9" height="24" fill="#565159" />

      {/* 掴まれた鉱車 */}
      <g className="offer-cart">
        <ellipse cx="155" cy="192" rx="38" ry="5" fill="#2b2119" />
        <g fill="#f5b31c">
          <circle cx="128" cy="130" r="6" />
          <circle cx="142" cy="126" r="5" />
          <circle cx="118" cy="134" r="4.5" />
        </g>
        <g fill="#8a8279">
          <circle cx="152" cy="130" r="8" />
          <circle cx="168" cy="132" r="6" />
        </g>
        <rect x="118" y="134" width="74" height="8" rx="2" fill="#565159" />
        <path d="M121,142 L189,142 L182,178 L128,178z" fill="#6f6a72" />
        <rect x="128" y="152" width="54" height="5" fill="#565159" />
        <circle cx="136" cy="182" r="9" fill="#2b262e" />
        <circle cx="176" cy="182" r="9" fill="#2b262e" />
        <circle cx="136" cy="182" r="3.5" fill="#4a4550" />
        <circle cx="176" cy="182" r="3.5" fill="#4a4550" />
      </g>

      {/* 岩の壁のくぼみ */}
      <path d="M238,176 L238,94 A66,52 0 0 1 370,94 L370,176z" fill="#43303f" />

      {/* エル・ティーオ */}
      <g>
        <rect x="266" y="148" width="72" height="28" rx="8" fill="#a04a38" />
        <rect x="262" y="166" width="24" height="12" rx="5" fill="#8a3f30" />
        <rect x="322" y="166" width="24" height="12" rx="5" fill="#8a3f30" />
        <rect x="276" y="104" width="52" height="52" rx="12" fill="#b0553f" />
        <g fill="#f5b31c">
          <rect x="278" y="112" width="12" height="7" />
          <rect x="292" y="112" width="12" height="7" fill="#4f9e4a" />
          <rect x="306" y="112" width="12" height="7" fill="#5b8fe8" />
          <rect x="316" y="112" width="10" height="7" fill="#e05252" />
        </g>
        <rect x="330" y="118" width="14" height="36" rx="7" fill="#a04a38" />
        <path d="M288,76 L281,56 L297,72z" fill="#e8c98a" />
        <path d="M318,76 L325,56 L309,72z" fill="#e8c98a" />
        <circle cx="303" cy="88" r="21" fill="#c26248" />
        <circle cx="295" cy="85" r="6.5" fill="#f6efe2" />
        <circle cx="312" cy="85" r="6.5" fill="#f6efe2" />
        <circle cx="296" cy="86" r="3" fill="#2a2028" />
        <circle cx="313" cy="86" r="3" fill="#2a2028" />
        <path
          d="M292,98 q11,10 22,0"
          stroke="#7d3527"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        {/* くわえタバコ */}
        <rect x="312" y="99" width="20" height="5" rx="2" fill="#f6efe2" />
        <circle className="offer-ember" cx="334" cy="101" r="3.5" fill="#e05252" />
        <g fill="#7a6f78">
          <circle className="offer-smoke offer-smoke-a" cx="340" cy="88" r="5" />
          <circle className="offer-smoke offer-smoke-b" cx="346" cy="80" r="6" />
        </g>
      </g>

      {/* 鉱車を掴む石の手 */}
      <g className="offer-grip">
        <path d="M218,114 L260,98 L288,110 L286,136 L244,154 L214,144z" fill="#8a3f30" />
        <rect x="158" y="110" width="74" height="34" rx="15" fill="#b0553f" />
        <g fill="#b0553f">
          <rect x="162" y="136" width="15" height="34" rx="7" />
          <rect x="182" y="138" width="15" height="34" rx="7" />
          <rect x="202" y="136" width="15" height="32" rx="7" />
          <rect className="offer-thumb" x="146" y="122" width="15" height="28" rx="7" />
        </g>
      </g>

      {/* 足元の供物 */}
      <g className="offer-gift offer-gift-a">
        <rect x="248" y="172" width="17" height="26" rx="3" fill="#cfe2ea" />
        <rect x="253" y="162" width="7" height="12" fill="#cfe2ea" />
        <rect x="248" y="180" width="17" height="8" fill="#e05252" />
      </g>
      <g className="offer-gift offer-gift-b" fill="#f6efe2">
        <rect x="278" y="184" width="22" height="6" rx="3" />
        <rect x="282" y="192" width="22" height="6" rx="3" />
        <rect x="276" y="176" width="22" height="6" rx="3" transform="rotate(-12 287 179)" />
      </g>
      <g className="offer-gift offer-gift-c">
        <ellipse cx="330" cy="192" rx="24" ry="8" fill="#3f7a3a" />
        <path d="M312,188 C318,178 332,178 336,188 C328,192 318,192 312,188z" fill="#4f9e4a" />
        <path d="M328,184 C334,174 348,176 350,186 C342,190 332,189 328,184z" fill="#5fb04a" />
      </g>

      {/* ロウソク */}
      <g>
        <rect x="222" y="180" width="8" height="18" fill="#f6efe2" />
        <path className="offer-flame offer-flame-a" d="M226,178 C221,170 231,166 226,158 C233,164 233,174 226,178z" fill="#f5b31c" />
        <rect x="368" y="180" width="8" height="18" fill="#f6efe2" />
        <path className="offer-flame offer-flame-b" d="M372,178 C367,170 377,166 372,158 C379,164 379,174 372,178z" fill="#f5b31c" />
      </g>

      <style>{`
        .offer-cart { transform-box: fill-box; transform-origin: 50% 100%; animation: offer-roll 5s ease-out infinite; }
        .offer-grip { transform-box: fill-box; transform-origin: 100% 20%; animation: offer-clamp 5s ease-in-out infinite; }
        .offer-thumb { transform-box: fill-box; transform-origin: 50% 0; animation: offer-pinch 5s ease-in-out infinite; }
        .offer-ember { animation: offer-glow 1.3s ease-in-out infinite; }
        .offer-smoke { transform-box: fill-box; transform-origin: 50% 100%; }
        .offer-smoke-a { animation: offer-waft 3.2s ease-out infinite; }
        .offer-smoke-b { animation: offer-waft 3.2s ease-out infinite; animation-delay: -1.6s; }
        .offer-flame { transform-box: fill-box; transform-origin: 50% 100%; }
        .offer-flame-a { animation: offer-flicker 0.6s ease-in-out infinite alternate; }
        .offer-flame-b { animation: offer-flicker 0.45s ease-in-out infinite alternate; }
        .offer-gift { transform-box: fill-box; transform-origin: 50% 100%; }
        .offer-gift-a { animation: offer-lay 5s ease-out infinite; animation-delay: -0.7s; }
        .offer-gift-b { animation: offer-lay 5s ease-out infinite; animation-delay: -0.35s; }
        .offer-gift-c { animation: offer-lay 5s ease-out infinite; }
        @keyframes offer-roll {
          0% { transform: translateX(-46px); }
          14% { transform: translateX(0); }
          20% { transform: translateX(4px); }
          26%, 100% { transform: translateX(0); }
        }
        @keyframes offer-clamp {
          0%, 8% { transform: translate(16px, -30px) rotate(-13deg); }
          22% { transform: translate(0, 4px) rotate(2deg); }
          30%, 100% { transform: translate(0, 0) rotate(0deg); }
        }
        @keyframes offer-pinch {
          0%, 12% { transform: rotate(-26deg); }
          26%, 100% { transform: rotate(0deg); }
        }
        @keyframes offer-lay {
          0%, 44% { transform: translateY(-10px) scale(0.1); opacity: 0; }
          54% { transform: translateY(0) scale(1.12); opacity: 1; }
          60%, 92% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(0) scale(0.9); opacity: 0; }
        }
        @keyframes offer-glow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
        @keyframes offer-waft {
          0% { transform: translate(0, 12px) scale(0.3); opacity: 0; }
          30% { opacity: 0.7; }
          100% { transform: translate(14px, -34px) scale(1.5); opacity: 0; }
        }
        @keyframes offer-flicker {
          from { transform: scaleY(0.78) scaleX(1.1); }
          to { transform: scaleY(1.15) scaleX(0.9); }
        }
        @media (prefers-reduced-motion: reduce) {
          .offer-cart, .offer-grip, .offer-thumb, .offer-ember, .offer-smoke-a, .offer-smoke-b,
          .offer-flame-a, .offer-flame-b, .offer-gift-a, .offer-gift-b, .offer-gift-c { animation: none; }
        }
      `}</style>
    </svg>
  );
}
