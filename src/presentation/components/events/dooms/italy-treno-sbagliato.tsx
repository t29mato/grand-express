/**
 * 違う地方電車に乗ってしまう。向かい合う二つのホームにそれぞれ逆方向の
 * 列車が停まっており、乗客は片方に乗り込んだあと、進行方向を示す矢印が
 * 思っていたのと逆だったと気づいて振り返る。
 *
 * 動くのは列車の発車と、振り返る乗客の頭だけ。
 */
export function ItalyTrenoSbagliato() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 駅の空。 */}
      <rect width="400" height="210" fill="#7f8896" />
      <rect y="0" width="400" height="70" fill="#9aa0a8" />

      {/* 駅の屋根の柱。 */}
      <g fill="#4a4f42">
        <rect x="10" y="30" width="8" height="40" />
        <rect x="196" y="30" width="8" height="40" />
        <rect x="382" y="30" width="8" height="40" />
      </g>
      <rect x="0" y="24" width="400" height="8" fill="#4a4f42" />

      {/* 中央のホーム。 */}
      <rect x="150" y="120" width="100" height="90" fill="#9a9484" />
      <rect x="150" y="120" width="100" height="6" fill="#e8dcc0" />

      {/* 左の線路、右向きの案内矢印。 */}
      <rect y="140" width="150" height="50" fill="#4a4a52" />
      <path className="ita-ts-arrow-l" d="M40,165 h50 l-14,-10 M90,165 l-14,10" fill="none" stroke="#f5b31c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

      {/* 右の線路、左向きの案内矢印。 */}
      <rect x="250" y="140" width="150" height="50" fill="#4a4a52" />
      <path className="ita-ts-arrow-r" d="M360,165 h-50 l14,-10 M310,165 l14,10" fill="none" stroke="#f5b31c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

      {/* 左の列車(乗ってしまった方、発車していく)。 */}
      <g className="ita-ts-train-l" strokeLinejoin="round">
        <rect x="10" y="120" width="120" height="36" rx="5" fill="#e8443f" stroke="#7a0a1e" strokeWidth="2" />
        <g fill="#bfe0f0">
          <rect x="24" y="130" width="18" height="14" />
          <rect x="50" y="130" width="18" height="14" />
          <rect x="76" y="130" width="18" height="14" />
        </g>
      </g>

      {/* 右の列車(乗るはずだった方、そのまま停まっている)。 */}
      <g strokeLinejoin="round">
        <rect x="270" y="120" width="120" height="36" rx="5" fill="#5b8fe8" stroke="#20364a" strokeWidth="2" />
        <g fill="#bfe0f0">
          <rect x="284" y="130" width="18" height="14" />
          <rect x="310" y="130" width="18" height="14" />
          <rect x="336" y="130" width="18" height="14" />
        </g>
      </g>

      {/* 窓ごしに振り返る乗客(左の列車の中)。 */}
      <g className="ita-ts-rider">
        <circle cx="42" cy="137" r="6" fill="#d9a273" />
      </g>

      <style>{`
        .ita-ts-train-l {
          animation: ita-ts-depart 3.2s ease-in infinite;
        }
        @keyframes ita-ts-depart {
          0%, 30% { transform: translateX(0); }
          100% { transform: translateX(-140px); }
        }
        .ita-ts-rider {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: ita-ts-turn 1.6s ease-in-out infinite;
        }
        @keyframes ita-ts-turn {
          0%, 100% { transform: scaleX(1); }
          50% { transform: scaleX(-1); }
        }
        .ita-ts-arrow-l, .ita-ts-arrow-r {
          animation: ita-ts-point 1.4s ease-in-out infinite;
        }
        @keyframes ita-ts-point {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ita-ts-train-l { animation: none; transform: translateX(-140px); }
          .ita-ts-rider, .ita-ts-arrow-l, .ita-ts-arrow-r { animation: none; }
        }
      `}</style>
    </svg>
  );
}
