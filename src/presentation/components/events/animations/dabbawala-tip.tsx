/**
 * ダッバーワーラーの荷から滑り落ちた弁当箱を受け止め、駄賃をもらう。
 *
 * 荷車の棚の右上が一つ空いていて、そこから飛び出した弁当箱が弧を描く。
 * 受け止めた両手の上で弾み、脇から駄賃の硬貨が跳ね上がる。
 */
export function DabbawalaTip() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 朝の街と駅前の地面 */}
      <rect width="400" height="210" fill="#20364a" />
      <rect width="400" height="168" fill="#8fc4e8" />
      <g fill="#5c86a6">
        <rect x="0" y="72" width="54" height="96" />
        <rect x="62" y="96" width="42" height="72" />
        <rect x="188" y="60" width="48" height="108" />
        <rect x="246" y="88" width="38" height="80" />
        <rect x="330" y="66" width="70" height="102" />
      </g>
      <g fill="#8fc4e8" opacity="0.5">
        <rect x="10" y="84" width="10" height="12" />
        <rect x="30" y="84" width="10" height="12" />
        <rect x="198" y="74" width="10" height="12" />
        <rect x="218" y="74" width="10" height="12" />
        <rect x="344" y="80" width="12" height="14" />
      </g>
      <rect y="168" width="400" height="42" fill="#8a7355" />
      <rect y="168" width="400" height="5" fill="#6f5c46" />

      {/* 弁当箱を積んだ荷車 */}
      <g>
        <path d="M58,164 L36,150" stroke="#8a5a34" strokeWidth="5" strokeLinecap="round" />
        <rect x="58" y="160" width="104" height="9" rx="2" fill="#8a5a34" />
        <rect
          x="58"
          y="114"
          width="104"
          height="50"
          rx="3"
          fill="none"
          stroke="#8a5a34"
          strokeWidth="4"
        />
        <circle cx="76" cy="182" r="11" fill="#2f2a24" />
        <circle cx="76" cy="182" r="4" fill="#8a7355" />
        <circle cx="144" cy="182" r="11" fill="#2f2a24" />
        <circle cx="144" cy="182" r="4" fill="#8a7355" />
      </g>
      <g className="dbw-rack">
        {/* 下の段は満杯、上の段は右端が空いている */}
        <g transform="translate(74,150)">
          <circle r="9.5" fill="#cdd4dc" />
          <rect x="-9.5" y="-11" width="19" height="4" rx="1.5" fill="#9aa4b0" />
          <path d="M-6,-11 Q0,-19 6,-11" fill="none" stroke="#8f98a3" strokeWidth="2" />
        </g>
        <g transform="translate(98,150)">
          <circle r="9.5" fill="#cdd4dc" />
          <rect x="-9.5" y="-11" width="19" height="4" rx="1.5" fill="#9aa4b0" />
          <path d="M-6,-11 Q0,-19 6,-11" fill="none" stroke="#8f98a3" strokeWidth="2" />
        </g>
        <g transform="translate(122,150)">
          <circle r="9.5" fill="#cdd4dc" />
          <rect x="-9.5" y="-11" width="19" height="4" rx="1.5" fill="#9aa4b0" />
          <path d="M-6,-11 Q0,-19 6,-11" fill="none" stroke="#8f98a3" strokeWidth="2" />
        </g>
        <g transform="translate(146,150)">
          <circle r="9.5" fill="#cdd4dc" />
          <rect x="-9.5" y="-11" width="19" height="4" rx="1.5" fill="#9aa4b0" />
          <path d="M-6,-11 Q0,-19 6,-11" fill="none" stroke="#8f98a3" strokeWidth="2" />
        </g>
        <g transform="translate(86,128)">
          <circle r="9.5" fill="#cdd4dc" />
          <rect x="-9.5" y="-11" width="19" height="4" rx="1.5" fill="#9aa4b0" />
          <path d="M-6,-11 Q0,-19 6,-11" fill="none" stroke="#8f98a3" strokeWidth="2" />
        </g>
        <g transform="translate(110,128)">
          <circle r="9.5" fill="#cdd4dc" />
          <rect x="-9.5" y="-11" width="19" height="4" rx="1.5" fill="#9aa4b0" />
          <path d="M-6,-11 Q0,-19 6,-11" fill="none" stroke="#8f98a3" strokeWidth="2" />
        </g>
        <g transform="translate(134,128)">
          <circle r="9.5" fill="#cdd4dc" />
          <rect x="-9.5" y="-11" width="19" height="4" rx="1.5" fill="#9aa4b0" />
          <path d="M-6,-11 Q0,-19 6,-11" fill="none" stroke="#8f98a3" strokeWidth="2" />
        </g>
      </g>

      {/* 運び手(白い帽子と白いクルター) */}
      <g transform="translate(30,192)">
        <rect x="-11" y="-14" width="9" height="14" fill="#c08a5c" />
        <rect x="2" y="-14" width="9" height="14" fill="#c08a5c" />
        <rect x="-12" y="-44" width="24" height="32" rx="7" fill="#f4f1ea" />
        <rect
          className="dbw-carrier-arm"
          x="8"
          y="-42"
          width="8"
          height="26"
          rx="4"
          fill="#f4f1ea"
        />
        <circle cx="0" cy="-53" r="10" fill="#c08a5c" />
        <path d="M-11,-59 Q0,-70 11,-59z" fill="#f4f1ea" />
        <rect x="-12" y="-61" width="24" height="4" rx="2" fill="#f4f1ea" />
      </g>

      {/* 受け止める旅人 */}
      <g transform="translate(272,192)">
        <rect x="-10" y="-14" width="8" height="14" rx="2" fill="#3b2f4a" />
        <rect x="2" y="-14" width="8" height="14" rx="2" fill="#3b2f4a" />
        <rect x="-12" y="-46" width="24" height="33" rx="7" fill="#5b8fe8" />
        <circle cx="0" cy="-57" r="11" fill="#f6efe2" />
        <g className="dbw-arms" fill="#f6efe2">
          <rect x="-15" y="-72" width="8" height="30" rx="4" transform="rotate(-18,-11,-42)" />
          <rect x="7" y="-78" width="8" height="36" rx="4" transform="rotate(-21,11,-42)" />
          <circle cx="-20" cy="-71" r="5.5" />
          <circle cx="-3" cy="-76" r="5.5" />
        </g>
      </g>

      {/* 滑り落ちた弁当箱 */}
      <g className="dbw-tin">
        <circle r="9.5" fill="#cdd4dc" />
        <rect x="-9.5" y="-11" width="19" height="4" rx="1.5" fill="#9aa4b0" />
        <path d="M-6,-11 Q0,-19 6,-11" fill="none" stroke="#8f98a3" strokeWidth="2" />
      </g>

      {/* 駄賃 */}
      <g fill="#f5b31c" stroke="#c07f0c" strokeWidth="2">
        <circle className="dbw-coin-a" cx="306" cy="98" r="8" />
        <circle className="dbw-coin-b" cx="324" cy="76" r="7" />
        <circle className="dbw-coin-c" cx="292" cy="66" r="6" />
      </g>

      <style>{`
        .dbw-tin {
          transform: translate(256px, 116px) rotate(258deg);
          animation: dbw-drop 2.6s ease-in-out infinite;
        }
        .dbw-arms {
          transform-origin: 0px -46px;
          animation: dbw-catch 2.6s ease-in-out infinite;
        }
        .dbw-rack { transform-origin: 110px 150px; animation: dbw-jolt 2.6s ease-in-out infinite; }
        .dbw-carrier-arm {
          transform-origin: 12px -40px;
          animation: dbw-point 2.6s ease-in-out infinite;
        }
        .dbw-coin-a { animation: dbw-pop 2.6s ease-out infinite; animation-delay: 1.25s; }
        .dbw-coin-b { animation: dbw-pop 2.6s ease-out infinite; animation-delay: 1.45s; }
        .dbw-coin-c { animation: dbw-pop 2.6s ease-out infinite; animation-delay: 1.65s; }
        @keyframes dbw-drop {
          0% { transform: translate(148px, 126px) rotate(0deg); opacity: 0; }
          7% { transform: translate(168px, 104px) rotate(60deg); opacity: 1; }
          26% { transform: translate(208px, 84px) rotate(150deg); opacity: 1; }
          48% { transform: translate(256px, 116px) rotate(250deg); opacity: 1; }
          56% { transform: translate(256px, 107px) rotate(266deg); opacity: 1; }
          64%, 92% { transform: translate(256px, 116px) rotate(258deg); opacity: 1; }
          100% { transform: translate(256px, 116px) rotate(258deg); opacity: 0; }
        }
        @keyframes dbw-catch {
          0%, 40% { transform: rotate(0deg); }
          50% { transform: rotate(9deg); }
          64%, 100% { transform: rotate(0deg); }
        }
        @keyframes dbw-jolt {
          0%, 100% { transform: rotate(0deg); }
          4% { transform: rotate(-3deg); }
          12% { transform: rotate(2deg); }
          20% { transform: rotate(0deg); }
        }
        @keyframes dbw-point {
          0%, 30% { transform: rotate(0deg); }
          55% { transform: rotate(-38deg); }
          85%, 100% { transform: rotate(0deg); }
        }
        @keyframes dbw-pop {
          0%, 40% { transform: translate(0, 26px); opacity: 0; }
          60% { transform: translate(0, -4px); opacity: 1; }
          85% { transform: translate(0, -10px); opacity: 1; }
          100% { transform: translate(0, -18px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .dbw-tin, .dbw-arms, .dbw-rack, .dbw-carrier-arm,
          .dbw-coin-a, .dbw-coin-b, .dbw-coin-c { animation: none; }
        }
      `}</style>
    </svg>
  );
}
