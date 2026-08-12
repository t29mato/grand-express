/**
 * 州警察のレーダーに速度違反で捕まる。中央分離帯に停まったパトカーの
 * 赤と青の警光灯が交互に光り、脇を走っていた車が速度を落として止まる。
 *
 * 動くのは、走っていた車の減速と、パトカーの警光灯の点滅だけ。
 */
export function UsaSpeedingticket() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 晴れた午後の空。 */}
      <rect width="400" height="210" fill="#8fc4e8" />
      <rect y="0" width="400" height="90" fill="#cfe4f0" />

      {/* 遠景の丘。 */}
      <path d="M0,120c60,-20 120,-20 180,-6c80,-18 160,-6 220,-14v20H0z" fill="#8fae63" opacity="0.85" />

      {/* 道路。 */}
      <rect y="130" width="400" height="80" fill="#4a4a52" />
      <g stroke="#e8dcc0" strokeWidth="4" strokeDasharray="26 20">
        <path d="M0,172h400" />
      </g>

      {/* 中央分離帯のパトカー(白黒、静止)。 */}
      <g strokeLinejoin="round">
        <path d="M250,150 L262,138 L296,138 L308,150z" fill="#f6efe2" stroke="#20364a" strokeWidth="2.4" />
        <rect x="246" y="148" width="66" height="16" rx="3" fill="#20364a" stroke="#20364a" strokeWidth="2" />
        <rect x="246" y="148" width="66" height="8" fill="#f6efe2" />
        <circle cx="262" cy="166" r="8" fill="#241a10" />
        <circle cx="296" cy="166" r="8" fill="#241a10" />
        {/* 屋根の警光灯バー。 */}
        <rect x="270" y="132" width="18" height="7" rx="1.5" fill="#3a2f22" />
      </g>
      <circle className="usa-st-lightred" cx="274" cy="135" r="4" fill="#e8443f" />
      <circle className="usa-st-lightblue" cx="284" cy="135" r="4" fill="#5b8fe8" />

      {/* 走っていた車(左から近づき、パトカーの手前で減速して止まる)。 */}
      <g className="usa-st-car">
        <path d="M40,168 L54,150 L106,150 L120,168z" fill="#5b8fe8" stroke="#20364a" strokeWidth="2.5" strokeLinejoin="round" />
        <rect x="36" y="166" width="88" height="18" rx="4" fill="#4a7bd0" stroke="#20364a" strokeWidth="2.5" />
        <circle cx="56" cy="186" r="9" fill="#241a10" />
        <circle cx="104" cy="186" r="9" fill="#241a10" />
        <rect x="62" y="154" width="18" height="10" fill="#bfe0f0" opacity="0.9" />
      </g>

      {/* 地面。 */}
      <rect y="196" width="400" height="14" fill="#2f4a33" />

      <style>{`
        .usa-st-car {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: usa-st-drive 3.6s ease-out infinite;
        }
        @keyframes usa-st-drive {
          0% { transform: translateX(-40px); }
          55% { transform: translateX(90px); }
          100% { transform: translateX(90px); }
        }
        .usa-st-lightred, .usa-st-lightblue {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: usa-st-blink 0.6s steps(1) infinite;
        }
        .usa-st-lightblue {
          animation-delay: 0.3s;
        }
        @keyframes usa-st-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0.15; }
        }
        @media (prefers-reduced-motion: reduce) {
          .usa-st-car { animation: none; transform: translateX(90px); }
          .usa-st-lightred, .usa-st-lightblue { animation: none; opacity: 1; }
        }
      `}</style>
    </svg>
  );
}
