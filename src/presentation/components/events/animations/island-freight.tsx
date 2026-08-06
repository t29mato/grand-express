/**
 * 小さな島では何もかも船で来るので、缶詰ひとつが本土の三倍する(減)。
 *
 *   - 棚は同じ順に空いていき、残った品はぽつぽつと間隔があく
 *   - 戸口の向こうの水平線に、まだ船影はない
 *   - 一つ買うのに、硬貨が三枚出ていく
 */
export function IslandFreight() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 店の中 */}
      <rect width="400" height="210" fill="#6b5f4a" />
      <rect width="400" height="150" fill="#7a6d54" />

      {/* 戸口の外。水平線の彼方に、まだ遠い船 */}
      <rect x="306" y="26" width="84" height="128" fill="#8fc4e8" />
      <rect x="306" y="96" width="84" height="58" fill="#2f7fa8" />
      <rect x="306" y="96" width="84" height="5" fill="#5fa8c8" />
      <g stroke="#8fd0e8" strokeWidth="3" strokeLinecap="round" fill="none">
        <path className="isf-wave" d="M314,118 q11,-5 22,0" />
        <path className="isf-wave isf-w2" d="M352,134 q11,-5 22,0" />
      </g>
      <g className="isf-ship">
        <path d="M354,90 L374,90 L371,96 L357,96z" fill="#4a5566" />
        <rect x="361" y="83" width="5" height="7" fill="#4a5566" />
      </g>
      <rect x="300" y="20" width="96" height="10" fill="#5a4630" />
      <g fill="#5a4630">
        <rect x="300" y="20" width="10" height="134" />
        <rect x="386" y="20" width="10" height="134" />
      </g>

      {/* 空きの目立つ棚 */}
      <g fill="#5a4a34">
        <rect x="14" y="46" width="204" height="8" />
        <rect x="14" y="96" width="204" height="8" />
        <rect x="14" y="146" width="204" height="8" />
      </g>
      <g fill="#3f3628">
        <rect x="14" y="20" width="204" height="26" opacity="0.5" />
      </g>
      {/* まばらに残った品 */}
      <g>
        <rect x="26" y="26" width="20" height="20" rx="2" fill="#c93a3a" />
        <rect x="26" y="30" width="20" height="5" fill="#e8dfc8" />
        <rect x="176" y="26" width="20" height="20" rx="2" fill="#3f8f7a" />
        <rect x="176" y="30" width="20" height="5" fill="#e8dfc8" />
        <rect x="96" y="78" width="20" height="18" rx="2" fill="#5b8fe8" />
        <rect x="96" y="82" width="20" height="5" fill="#e8dfc8" />
        <rect x="30" y="128" width="20" height="18" rx="2" fill="#f5b31c" />
        <rect x="30" y="132" width="20" height="5" fill="#e8dfc8" />
        <rect x="188" y="128" width="20" height="18" rx="2" fill="#c93a3a" />
        <rect x="188" y="132" width="20" height="5" fill="#e8dfc8" />
      </g>

      {/* 帳場 */}
      <rect y="154" width="400" height="56" fill="#8a6a3c" />
      <rect y="154" width="400" height="8" fill="#a8813c" />

      {/* 水平線を見ている店主 */}
      <g transform="translate(258,154)">
        <rect x="-20" y="-42" width="40" height="42" rx="11" fill="#3f6b8a" />
        <circle cx="0" cy="-53" r="13" fill="#f6efe2" />
        <path d="M-13,-57 a13,13 0 0 1 26,0z" fill="#5c5546" />
      </g>

      {/* 買う一つと、出ていく三枚 */}
      <g transform="translate(122,182)">
        <rect x="-14" y="-26" width="28" height="26" rx="2" fill="#c93a3a" />
        <rect x="-14" y="-20" width="28" height="6" fill="#e8dfc8" />
        <ellipse cx="0" cy="-26" rx="14" ry="4" fill="#e0554f" />
      </g>
      <g fill="#f5b31c" stroke="#c07f0c" strokeWidth="2">
        <circle className="isf-coin-a" cx="176" cy="176" r="9" />
        <circle className="isf-coin-b" cx="176" cy="176" r="9" />
        <circle className="isf-coin-c" cx="176" cy="176" r="9" />
      </g>

      <style>{`
        .isf-wave {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: isf-lap 4s ease-in-out infinite;
        }
        .isf-w2 { animation-delay: -1.6s; }
        .isf-ship {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: isf-await 12s ease-in-out infinite;
        }
        .isf-coin-a { animation: isf-spend 3.6s ease-in infinite; }
        .isf-coin-b { animation: isf-spend 3.6s ease-in infinite; animation-delay: -0.5s; }
        .isf-coin-c { animation: isf-spend 3.6s ease-in infinite; animation-delay: -1s; }
        @keyframes isf-lap {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(9px); }
        }
        @keyframes isf-await {
          0%, 100% { transform: translateX(0); opacity: 0.25; }
          50% { transform: translateX(-10px); opacity: 0.5; }
        }
        @keyframes isf-spend {
          0% { transform: translate(0, 0) scale(1); opacity: 0; }
          14% { opacity: 1; }
          100% { transform: translate(84px, -26px) scale(0.5); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .isf-wave, .isf-ship, .isf-coin-a, .isf-coin-b, .isf-coin-c { animation: none; opacity: 1; }
        }
      `}</style>
    </svg>
  );
}
