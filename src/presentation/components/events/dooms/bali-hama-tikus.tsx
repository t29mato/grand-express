/**
 * 鼠が実りかけの田に入る。夜の水田に鼠の群れが入り込み、稲穂をかじって
 * 倒していく。動くのは鼠の出入りと、かじられた稲が傾く動きだけ。
 */
export function BaliHamaTikus() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜の空。 */}
      <rect width="400" height="210" fill="#20304a" />
      <rect y="0" width="400" height="70" fill="#2c3d5c" />
      <circle cx="330" cy="36" r="20" fill="#e8e2d2" opacity="0.9" />

      {/* 水田(空を映す暗い水面)。 */}
      <rect y="70" width="400" height="140" fill="#2f4a5c" />
      <g stroke="#40607a" strokeWidth="2" opacity="0.6">
        <path d="M0,90h400M0,110h400M0,130h400M0,150h400M0,170h400M0,190h400" />
      </g>

      {/* 稲の列(奥から手前へ)。かじられた株は className で傾ける。 */}
      <g>
        {[40, 90, 140, 190, 240, 290, 340].map((x, i) => (
          <g key={x} className={i % 3 === 1 ? "bht-lean" : undefined} transform={`translate(${x},170)`}>
            <path
              d="M-3,0 Q-6,-24 -2,-40 M0,0 Q0,-26 0,-42 M3,0 Q6,-24 2,-40"
              stroke="#c9b968"
              strokeWidth="2.6"
              fill="none"
              strokeLinecap="round"
            />
            <ellipse cx="0" cy="-40" rx="6" ry="3" fill="#d8c878" />
          </g>
        ))}
      </g>

      {/* 鼠(左右へ出入りする)。 */}
      <g className="bht-rat1">
        <ellipse cx="0" cy="0" rx="14" ry="7" fill="#5a5348" />
        <circle cx="12" cy="-2" r="6" fill="#5a5348" />
        <path d="M-14,2q-10,-4 -16,2" stroke="#5a5348" strokeWidth="2" fill="none" />
        <circle cx="15" cy="-4" r="1.4" fill="#20364a" />
      </g>
      <g className="bht-rat2">
        <ellipse cx="0" cy="0" rx="12" ry="6" fill="#6b6355" />
        <circle cx="10" cy="-2" r="5" fill="#6b6355" />
        <path d="M-12,2q-9,-3 -14,2" stroke="#6b6355" strokeWidth="1.8" fill="none" />
        <circle cx="13" cy="-3.4" r="1.2" fill="#20364a" />
      </g>

      <style>{`
        .bht-lean {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: bht-fall 2.6s ease-in-out infinite;
        }
        @keyframes bht-fall {
          0%, 40% { transform: rotate(0deg); }
          70%, 100% { transform: rotate(22deg); }
        }
        .bht-rat1 {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: bht-scurry1 2.6s ease-in-out infinite;
        }
        @keyframes bht-scurry1 {
          0% { transform: translate(30px,182px) scaleX(1); }
          45% { transform: translate(200px,190px) scaleX(1); }
          50% { transform: translate(200px,190px) scaleX(-1); }
          95% { transform: translate(30px,182px) scaleX(-1); }
          100% { transform: translate(30px,182px) scaleX(1); }
        }
        .bht-rat2 {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: bht-scurry2 2.2s ease-in-out infinite;
        }
        @keyframes bht-scurry2 {
          0% { transform: translate(360px,196px) scaleX(-1); }
          45% { transform: translate(220px,204px) scaleX(-1); }
          50% { transform: translate(220px,204px) scaleX(1); }
          95% { transform: translate(360px,196px) scaleX(1); }
          100% { transform: translate(360px,196px) scaleX(-1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .bht-lean { animation: none; transform: rotate(22deg); }
          .bht-rat1 { animation: none; transform: translate(150px,188px); }
          .bht-rat2 { animation: none; transform: translate(260px,198px) scaleX(-1); }
        }
      `}</style>
    </svg>
  );
}
