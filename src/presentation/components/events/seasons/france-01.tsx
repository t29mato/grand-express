/**
 * 5月・スズランと連休。
 *
 * 一日は誰でも街角でスズランを売ってよい日。折りたたみの台に鈴蘭の束が並び、
 * 通りがかりの人が一束買っていく。壁の暦では祝日の三日が金色に光り、
 * そこから週末へ板が一枚渡してある(「橋渡し」する連休)。
 */
export function France01() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 五月の空 */}
      <rect width="400" height="210" fill="#bcdcf2" />
      <g fill="#e6f2fb">
        <ellipse className="f01-cloud" cx="96" cy="24" rx="46" ry="13" />
        <ellipse className="f01-cloud f01-cloud2" cx="300" cy="18" rx="40" ry="12" />
      </g>

      {/* 通りの建物 */}
      <rect y="34" width="400" height="130" fill="#e0d4bd" />
      <rect y="34" width="400" height="7" fill="#c0b298" />
      <g fill="#9fb7cb">
        <rect x="24" y="56" width="30" height="42" rx="3" />
        <rect x="96" y="56" width="30" height="42" rx="3" />
        <rect x="272" y="56" width="30" height="42" rx="3" />
        <rect x="344" y="56" width="30" height="42" rx="3" />
      </g>
      <g fill="#7a8fa3">
        <rect x="24" y="56" width="30" height="8" rx="3" />
        <rect x="96" y="56" width="30" height="8" rx="3" />
        <rect x="272" y="56" width="30" height="8" rx="3" />
        <rect x="344" y="56" width="30" height="8" rx="3" />
      </g>

      {/* 壁に貼られた暦。祝日が三つ金色、そこから週末へ板が渡してある */}
      <g transform="translate(196,52)">
        <rect x="-56" y="-4" width="112" height="74" rx="4" fill="#fdf8ec" />
        <rect x="-56" y="-4" width="112" height="12" rx="4" fill="#b9c9d6" />
        <g fill="#dfe6ec">
          <rect x="-50" y="12" width="14" height="12" rx="2" />
          <rect x="-33" y="12" width="14" height="12" rx="2" />
          <rect x="-16" y="12" width="14" height="12" rx="2" />
          <rect x="1" y="12" width="14" height="12" rx="2" />
          <rect x="18" y="12" width="14" height="12" rx="2" />
          <rect x="35" y="12" width="14" height="12" rx="2" />
          <rect x="-50" y="28" width="14" height="12" rx="2" />
          <rect x="-16" y="28" width="14" height="12" rx="2" />
          <rect x="1" y="28" width="14" height="12" rx="2" />
          <rect x="35" y="28" width="14" height="12" rx="2" />
          <rect x="-50" y="44" width="14" height="12" rx="2" />
          <rect x="-33" y="44" width="14" height="12" rx="2" />
          <rect x="-16" y="44" width="14" height="12" rx="2" />
          <rect x="18" y="44" width="14" height="12" rx="2" />
        </g>
        {/* 祝日 */}
        <g className="f01-holiday" fill="#f5b31c">
          <rect x="-33" y="28" width="14" height="12" rx="2" />
          <rect x="18" y="28" width="14" height="12" rx="2" />
          <rect x="1" y="44" width="14" height="12" rx="2" />
        </g>
        {/* 週末 */}
        <rect x="35" y="44" width="14" height="12" rx="2" fill="#e8443f" />
        {/* 祝日から週末へ渡した板 */}
        <g className="f01-plank">
          <rect x="18" y="38" width="31" height="6" rx="2" fill="#a97a32" />
          <rect x="18" y="38" width="31" height="2" rx="1" fill="#c9954a" />
        </g>
      </g>

      {/* 歩道 */}
      <rect y="162" width="400" height="48" fill="#b9b0a0" />
      <rect y="162" width="400" height="5" fill="#8f8779" />

      {/* スズラン売りの台 */}
      <g transform="translate(122,196)">
        <rect x="-46" y="-22" width="92" height="7" rx="2" fill="#a97a32" />
        <path d="M-38,-15 L-32,0 M38,-15 L32,0" stroke="#8a6128" strokeWidth="5" strokeLinecap="round" />
        {/* 鈴蘭の束。葉と、うつむいた白い鈴 */}
        <g className="f01-bunch">
          <path d="M-34,-22 q-10,-16 -3,-30" stroke="#4f8a3c" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M-34,-22 q-14,-14 -20,-24 q12,0 20,24z" fill="#5f9c47" />
          <g fill="#fdfcf6">
            <circle cx="-38" cy="-40" r="4" />
            <circle cx="-33" cy="-46" r="3.5" />
            <circle cx="-40" cy="-31" r="3.5" />
          </g>
        </g>
        <g className="f01-bunch f01-bunch2">
          <path d="M-6,-22 q-6,-18 2,-32" stroke="#4f8a3c" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M-6,-22 q-16,-12 -22,-22 q13,-1 22,22z" fill="#4f8a3c" />
          <g fill="#fdfcf6">
            <circle cx="-9" cy="-42" r="4.5" />
            <circle cx="-3" cy="-49" r="3.5" />
            <circle cx="-11" cy="-33" r="3.5" />
          </g>
        </g>
        <g className="f01-bunch f01-bunch3">
          <path d="M24,-22 q-8,-16 0,-30" stroke="#4f8a3c" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M24,-22 q-14,-13 -19,-23 q12,0 19,23z" fill="#5f9c47" />
          <g fill="#fdfcf6">
            <circle cx="21" cy="-40" r="4" />
            <circle cx="26" cy="-47" r="3.5" />
            <circle cx="19" cy="-31" r="3.5" />
          </g>
        </g>
      </g>

      {/* 売り子 */}
      <g transform="translate(52,196)">
        <g className="f01-seller">
          <path d="M-13,0 L-11,-28 L11,-28 L13,0z" fill="#e8443f" />
          <circle cx="0" cy="-38" r="11" fill="#f6efe2" />
          <path d="M-11,-40 q6,-12 16,-6 q4,3 6,6 q-3,-12 -12,-12 q-9,0 -10,12z" fill="#3b2f24" />
          <path d="M9,-25 q7,2 8,7" stroke="#f6efe2" strokeWidth="5" strokeLinecap="round" fill="none" />
        </g>
      </g>

      {/* 一束買って歩き出す人 */}
      <g transform="translate(300,198)">
        <g className="f01-buyer">
          <path d="M-13,0 L-11,-28 L11,-28 L13,0z" fill="#5b8fe8" />
          <circle cx="0" cy="-38" r="11" fill="#f6efe2" />
          <path d="M-11,-41 q11,-10 22,-1 q-3,-10 -11,-10 q-10,0 -11,11z" fill="#6b4326" />
          <path d="M-10,-25 q-6,3 -7,8" stroke="#f6efe2" strokeWidth="5" strokeLinecap="round" fill="none" />
          <g transform="translate(-25,-16)">
            <path d="M0,0 q-4,-12 2,-20" stroke="#4f8a3c" strokeWidth="3" fill="none" strokeLinecap="round" />
            <g fill="#fdfcf6">
              <circle cx="-1" cy="-20" r="3.5" />
              <circle cx="4" cy="-25" r="3" />
            </g>
          </g>
        </g>
      </g>

      <style>{`
        .f01-cloud { animation: f01-drift 15s ease-in-out infinite; }
        .f01-cloud2 { animation-delay: 3s; animation-duration: 12s; }
        .f01-holiday { animation: f01-glow 3.2s ease-in-out infinite; }
        .f01-plank {
          transform-box: fill-box; transform-origin: 0 100%;
          animation: f01-lay 4.4s ease-in-out infinite;
        }
        .f01-bunch {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: f01-nod 3.6s ease-in-out infinite;
        }
        .f01-bunch2 { animation-delay: 0.7s; animation-duration: 4.2s; }
        .f01-bunch3 { animation-delay: 1.4s; animation-duration: 3.2s; }
        .f01-seller {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: f01-call 2.8s ease-in-out infinite;
        }
        .f01-buyer {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: f01-stroll 5.2s ease-in-out infinite;
        }
        @keyframes f01-drift {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(22px); }
        }
        @keyframes f01-glow {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 1; }
        }
        @keyframes f01-lay {
          0%, 18% { transform: rotate(-72deg); }
          38%, 88% { transform: rotate(0deg); }
          100% { transform: rotate(-72deg); }
        }
        @keyframes f01-nod {
          0%, 100% { transform: rotate(-4deg); }
          50% { transform: rotate(4deg); }
        }
        @keyframes f01-call {
          0%, 100% { transform: rotate(-3deg) translateY(0); }
          50% { transform: rotate(3deg) translateY(-2px); }
        }
        @keyframes f01-stroll {
          0% { transform: translateX(0) rotate(-2deg); }
          50% { transform: translateX(46px) rotate(2deg); }
          100% { transform: translateX(92px) rotate(-2deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .f01-cloud, .f01-holiday, .f01-plank, .f01-bunch,
          .f01-seller, .f01-buyer { animation: none; }
        }
      `}</style>
    </svg>
  );
}
