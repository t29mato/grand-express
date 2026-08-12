/**
 * 屋根付きの市場(スーク)で火事が起きる。日よけの布に火が回り、
 * 炎が揺らめき、煙が立ちのぼる。壊れた露店の品は描かず、
 * 炎と煙の動きだけで伝える。
 */
export function MoroccoHarika() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 屋根付きの市場、暗めの奥行き。 */}
      <rect width="400" height="210" fill="#3a3226" />
      <rect y="0" width="400" height="70" fill="#2a2418" />

      {/* 両側の露店(石壁)。 */}
      <rect x="0" y="70" width="90" height="140" fill="#c9a877" />
      <rect x="310" y="70" width="90" height="140" fill="#c9a877" />
      <rect x="0" y="70" width="90" height="20" fill="#9c7a52" />
      <rect x="310" y="70" width="90" height="20" fill="#9c7a52" />

      {/* 日よけの布(燃えている側)。 */}
      <path d="M90,110l60,-24l60,24z" fill="#8a4a2a" />
      <path className="mo-hrk-awning" d="M90,110l60,-24l60,24z" fill="none" stroke="#e8443f" strokeWidth="2" opacity="0.8" />

      {/* 炎。 */}
      <g className="mo-hrk-flame" transform="translate(150,96)">
        <path d="M0,20c-10,-6 -12,-16 -4,-24c1,6 4,8 6,4c1,6 6,8 6,14c0,6 -4,8 -8,6z" fill="#f5b31c" />
        <path d="M0,16c-6,-4 -7,-10 -2,-16c1,4 3,5 4,2c1,4 4,5 4,9c0,4 -3,5 -6,5z" fill="#e8443f" />
      </g>
      <g className="mo-hrk-flame mo-hrk-flame2" transform="translate(174,100)">
        <path d="M0,16c-8,-5 -9,-13 -3,-19c1,5 3,6 5,3c1,5 5,6 5,11c0,5 -3,6 -7,5z" fill="#f5b31c" />
        <path d="M0,12c-4,-3 -5,-7 -1,-11c1,3 2,3 3,1c1,3 3,3 3,6c0,3 -2,3 -5,4z" fill="#e8443f" />
      </g>
      <g className="mo-hrk-flame mo-hrk-flame3" transform="translate(126,102)">
        <path d="M0,14c-7,-4 -8,-11 -3,-16c1,4 3,5 4,2c1,4 4,5 4,9c0,4 -2,5 -5,5z" fill="#f5b31c" />
      </g>

      {/* 煙。 */}
      <g className="mo-hrk-smoke" fill="#6a6a62" opacity="0.7">
        <circle cx="150" cy="70" r="10" />
        <circle cx="160" cy="52" r="13" />
        <circle cx="146" cy="34" r="16" />
      </g>
      <g className="mo-hrk-smoke mo-hrk-smoke2" fill="#6a6a62" opacity="0.55">
        <circle cx="180" cy="76" r="8" />
        <circle cx="190" cy="58" r="11" />
      </g>

      {/* 手前、逃げる人影(シルエットのみ)。 */}
      <g fill="#20364a" opacity="0.9">
        <circle cx="60" cy="176" r="8" />
        <rect x="50" y="184" width="20" height="24" rx="6" />
      </g>

      <style>{`
        .mo-hrk-flame {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: mo-hrk-flicker 0.5s ease-in-out infinite;
        }
        .mo-hrk-flame2 { animation-duration: 0.42s; animation-delay: 0.1s; }
        .mo-hrk-flame3 { animation-duration: 0.6s; animation-delay: 0.2s; }
        @keyframes mo-hrk-flicker {
          0%, 100% { transform: scaleY(1) scaleX(1); }
          50% { transform: scaleY(1.18) scaleX(0.9); }
        }
        .mo-hrk-smoke {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: mo-hrk-rise 3s ease-in infinite;
        }
        .mo-hrk-smoke2 { animation-duration: 2.4s; animation-delay: 0.8s; }
        @keyframes mo-hrk-rise {
          0% { transform: translateY(10px) scale(0.7); opacity: 0; }
          20% { opacity: 0.7; }
          100% { transform: translateY(-40px) scale(1.3); opacity: 0; }
        }
        .mo-hrk-awning {
          animation: mo-hrk-glow 0.7s ease-in-out infinite;
        }
        @keyframes mo-hrk-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .mo-hrk-flame { animation: none; }
          .mo-hrk-smoke { animation: none; opacity: 0.6; transform: translateY(-10px); }
          .mo-hrk-awning { animation: none; opacity: 0.9; }
        }
      `}</style>
    </svg>
  );
}
