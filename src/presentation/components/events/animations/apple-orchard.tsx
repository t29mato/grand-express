/**
 * りんご園の収穫を手伝って日当をもらう(青森)。
 *
 * もいだりんごが次々と木箱へ落ちていき、脇では駄賃のコインが舞い上がる。
 */
export function AppleOrchard() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 空と丘 */}
      <rect width="400" height="210" fill="#8fc4e8" />
      <path d="M0,134 Q100,112 200,132 Q300,152 400,126 L400,210 L0,210z" fill="#4f7f45" />
      <rect y="168" width="400" height="42" fill="#3f6b3c" />

      {/* 奥のりんごの木 */}
      <g opacity="0.7">
        <rect x="330" y="102" width="9" height="46" fill="#5a3a22" />
        <circle cx="334" cy="92" r="26" fill="#256b34" />
        <circle cx="314" cy="102" r="17" fill="#2f7a3f" />
        <circle cx="356" cy="102" r="16" fill="#2f7a3f" />
      </g>

      {/* 手前のりんごの木 */}
      <rect x="88" y="92" width="14" height="80" fill="#5a3a22" />
      <path d="M95,116 L68,98 M95,108 L124,90" stroke="#5a3a22" strokeWidth="6" strokeLinecap="round" />
      <circle cx="95" cy="76" r="46" fill="#2f7a3f" />
      <circle cx="52" cy="92" r="25" fill="#256b34" />
      <circle cx="140" cy="90" r="27" fill="#256b34" />
      <g fill="#e8443f">
        <circle cx="60" cy="76" r="7" />
        <circle cx="120" cy="60" r="7" />
        <circle cx="86" cy="44" r="6" />
        <circle cx="146" cy="96" r="6" />
      </g>

      {/* 木箱(すでに半分ほど詰まっている) */}
      <ellipse cx="176" cy="196" rx="48" ry="7" fill="#2b4a2c" />
      <rect x="134" y="152" width="80" height="42" rx="3" fill="#b3803f" />
      <rect x="134" y="152" width="80" height="9" fill="#8a5f2c" />
      <g fill="#9c6c33">
        <rect x="140" y="168" width="68" height="4" />
        <rect x="140" y="180" width="68" height="4" />
      </g>
      <g fill="#e8443f">
        <circle cx="152" cy="150" r="7" />
        <circle cx="170" cy="147" r="7" />
        <circle cx="188" cy="150" r="7" />
        <circle cx="204" cy="148" r="6" />
      </g>

      {/* もぎ取られて落ちるりんご */}
      <g className="ao-drop">
        <circle cx="74" cy="124" r="8" fill="#e8443f" />
        <rect x="73" y="114" width="2" height="6" fill="#4a3a1e" />
      </g>
      <g className="ao-drop ao-d2">
        <circle cx="104" cy="130" r="8" fill="#d63a36" />
        <rect x="103" y="120" width="2" height="6" fill="#4a3a1e" />
      </g>
      <g className="ao-drop ao-d3">
        <circle cx="126" cy="120" r="7" fill="#e8443f" />
        <rect x="125" y="111" width="2" height="6" fill="#4a3a1e" />
      </g>

      {/* 手伝いに来た旅人 */}
      <g>
        <circle cx="258" cy="112" r="13" fill="#f6efe2" />
        <path d="M243,108 Q258,92 273,108 L273,102 Q258,90 243,102z" fill="#2a2233" />
        <rect x="246" y="126" width="24" height="38" rx="7" fill="#5b8fe8" />
        <rect x="248" y="164" width="8" height="22" rx="3" fill="#3b3550" />
        <rect x="260" y="164" width="8" height="22" rx="3" fill="#3b3550" />
        <rect className="ao-arm" x="216" y="126" width="34" height="9" rx="4" fill="#f6efe2" />
      </g>

      {/* 受け取る駄賃 */}
      <g className="ao-coin">
        <circle cx="300" cy="136" r="10" fill="#f5b31c" />
        <circle cx="300" cy="136" r="5" fill="#d8930d" />
      </g>
      <g className="ao-coin ao-c2">
        <circle cx="318" cy="150" r="8" fill="#f5b31c" />
        <circle cx="318" cy="150" r="4" fill="#d8930d" />
      </g>

      <style>{`
        .ao-drop { animation: ao-fall 2.4s cubic-bezier(0.5, 0, 0.9, 0.5) infinite; }
        .ao-d2 { animation-delay: 0.8s; }
        .ao-d3 { animation-delay: 1.6s; }
        .ao-arm { transform-origin: 250px 130px; animation: ao-pick 1.2s ease-in-out infinite; }
        .ao-coin { animation: ao-rise 2.2s ease-out infinite; }
        .ao-c2 { animation-delay: 1.1s; }
        @keyframes ao-fall {
          0% { transform: translate(0, 0); }
          70% { transform: translate(54px, 38px); opacity: 1; }
          82% { transform: translate(59px, 30px); opacity: 1; }
          96%, 100% { transform: translate(63px, 40px); opacity: 0; }
        }
        @keyframes ao-pick {
          0%, 100% { transform: rotate(6deg); }
          50% { transform: rotate(-26deg); }
        }
        @keyframes ao-rise {
          0% { transform: translate(0, 14px); opacity: 0; }
          25% { opacity: 1; }
          100% { transform: translate(-6px, -34px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ao-drop, .ao-arm, .ao-coin { animation: none; }
        }
      `}</style>
    </svg>
  );
}
