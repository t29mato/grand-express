/**
 * 納期に追われた工房で一日手を貸し、日当をもらう(近畿・京都)。
 *
 * ろくろの弾み車が回り続け、両手のあいだで壺が立ち上がり、脇に礼金が積まれていく。
 */
export function CraftCommission() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 工房の中 */}
      <rect width="400" height="210" fill="#3a2a24" />
      <rect y="150" width="400" height="60" fill="#6b4629" />
      <g fill="#5a3a22">
        <rect y="150" width="400" height="4" />
        <rect x="60" y="154" width="4" height="56" />
        <rect x="200" y="154" width="4" height="56" />
        <rect x="330" y="154" width="4" height="56" />
      </g>

      {/* 障子から差す明かり */}
      <rect x="22" y="24" width="104" height="82" fill="#5a4436" />
      <rect x="27" y="29" width="94" height="72" fill="#f0dca8" />
      <g stroke="#5a4436" strokeWidth="4">
        <path d="M74,29 L74,101" />
        <path d="M27,53 L121,53" />
        <path d="M27,77 L121,77" />
      </g>

      {/* 焼き上がりを並べた棚 */}
      <rect x="248" y="70" width="140" height="7" fill="#5a3a22" />
      <g fill="#a86c3c">
        <path d="M264,70 Q256,54 268,44 L284,44 Q296,54 288,70z" />
        <path d="M306,70 Q300,58 310,50 L322,50 Q332,58 326,70z" />
        <ellipse cx="356" cy="60" rx="16" ry="11" />
      </g>
      <rect x="340" y="49" width="32" height="5" fill="#8a5530" />

      {/* ろくろ */}
      <rect x="160" y="128" width="16" height="52" fill="#4a4038" />
      <ellipse cx="168" cy="126" rx="44" ry="13" fill="#8a7a68" />
      <ellipse cx="168" cy="123" rx="44" ry="13" fill="#a3927c" />
      <g className="cc-flywheel">
        <circle cx="168" cy="180" r="30" fill="#4a4038" />
        <g stroke="#7a6b5c" strokeWidth="5" strokeLinecap="round">
          <path d="M148,163 L188,197" />
          <path d="M188,163 L148,197" />
          <path d="M168,150 L168,210" />
          <path d="M138,180 L198,180" />
        </g>
        <circle cx="168" cy="180" r="8" fill="#8a7a68" />
      </g>

      {/* 挽かれている壺 */}
      <g className="cc-pot">
        <path d="M152,122 Q140,104 158,90 Q148,82 155,74 L181,74 Q188,82 178,90 Q196,104 184,122z" fill="#b3803f" />
        <path d="M155,74 L181,74 L181,80 L155,80z" fill="#8a5f2c" />
        <path d="M146,106 Q168,114 190,106 L190,112 Q168,120 146,112z" fill="#9c6c33" />
      </g>

      {/* 形をつくる両手 */}
      <g fill="#f6efe2">
        <g className="cc-hand-l">
          <rect x="106" y="92" width="42" height="12" rx="6" transform="rotate(9 148 98)" />
          <circle cx="148" cy="98" r="10" />
          <rect x="142" y="86" width="8" height="12" rx="4" />
        </g>
        <g className="cc-hand-r">
          <rect x="188" y="98" width="42" height="12" rx="6" transform="rotate(-9 188 104)" />
          <circle cx="188" cy="104" r="10" />
          <rect x="186" y="92" width="8" height="12" rx="4" />
        </g>
      </g>

      {/* 積み上がる礼金 */}
      <g>
        <rect x="288" y="150" width="88" height="34" fill="#5a3a22" />
        <rect x="284" y="144" width="96" height="8" fill="#7a5230" />
        <g fill="#f5b31c">
          <ellipse cx="332" cy="138" rx="20" ry="7" />
          <ellipse cx="332" cy="130" rx="20" ry="7" />
        </g>
        <g fill="#d8930d">
          <ellipse cx="332" cy="134" rx="20" ry="4" />
          <ellipse cx="332" cy="126" rx="20" ry="4" />
        </g>
      </g>
      <g className="cc-coin">
        <ellipse cx="332" cy="92" rx="20" ry="7" fill="#f5b31c" />
        <ellipse cx="332" cy="94" rx="9" ry="3" fill="#d8930d" />
      </g>

      <style>{`
        .cc-flywheel { transform-origin: 168px 180px; animation: cc-spin 1.1s linear infinite; }
        .cc-pot { transform-origin: 168px 122px; animation: cc-throw 3.2s ease-in-out infinite; }
        .cc-hand-l { transform-origin: 148px 100px; animation: cc-shape-l 3.2s ease-in-out infinite; }
        .cc-hand-r { transform-origin: 188px 100px; animation: cc-shape-r 3.2s ease-in-out infinite; }
        .cc-coin { animation: cc-pay 2.6s ease-in infinite; }
        @keyframes cc-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes cc-throw {
          0%, 100% { transform: scale(1.04, 0.86); }
          50% { transform: scale(0.94, 1.06); }
        }
        @keyframes cc-shape-l {
          0%, 100% { transform: translate(4px, 6px); }
          50% { transform: translate(-2px, -6px); }
        }
        @keyframes cc-shape-r {
          0%, 100% { transform: translate(-4px, 6px); }
          50% { transform: translate(2px, -6px); }
        }
        @keyframes cc-pay {
          0% { transform: translate(0, -46px); opacity: 0; }
          20% { opacity: 1; }
          70% { transform: translate(0, 30px); opacity: 1; }
          82% { transform: translate(0, 24px); }
          94%, 100% { transform: translate(0, 30px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cc-flywheel, .cc-pot, .cc-hand-l, .cc-hand-r, .cc-coin { animation: none; }
        }
      `}</style>
    </svg>
  );
}
