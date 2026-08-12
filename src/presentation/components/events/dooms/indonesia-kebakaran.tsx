/**
 * 市場の火事があっという間に燃え広がる(クバカラン)。屋台の屋根から炎が
 * 立ち上がり、隣の屋台の屋根へ飛び移る。煙が立ちのぼる。
 *
 * 動くのは炎の揺らめきと、隣の屋台へ燃え移る動き、煙の立ちのぼりだけ。
 */
export function IndonesiaKebakaran() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夕暮れの空(火事の緊迫感を出す濃いめの色)。 */}
      <rect width="400" height="210" fill="#3a2f30" />
      <rect y="0" width="400" height="90" fill="#5a3f3a" />

      {/* 遠景の市場の屋根の列。 */}
      <path d="M0,110h50v-14h30v14h60v-10h40v10h60v-16h30v16h130v20H0z" fill="#4a3c30" opacity="0.8" />

      {/* 地面。 */}
      <rect y="140" width="400" height="70" fill="#5a4a38" />

      {/* 屋台1(すでに燃えている)。 */}
      <g strokeLinejoin="round">
        <rect x="60" y="120" width="60" height="30" fill="#c9a877" stroke="#3a2f24" strokeWidth="2" />
        <path d="M52,120l8,-18h44l8,18z" fill="#8a5a3a" stroke="#3a2f24" strokeWidth="2" />
      </g>

      {/* 屋台2(まだ無事、これから燃え移る)。 */}
      <g strokeLinejoin="round">
        <rect x="260" y="124" width="56" height="26" fill="#c9a877" stroke="#3a2f24" strokeWidth="2" />
        <path d="M252,124l8,-16h42l8,16z" fill="#8a5a3a" stroke="#3a2f24" strokeWidth="2" />
      </g>

      {/* 屋台1の炎。 */}
      <g className="idn-kb-flame1" fill="#f5b31c">
        <path d="M70,102c-2,-8 4,-12 2,-18c6,4 8,10 6,16c4,-4 4,-10 2,-14c6,6 6,14 2,18c8,-2 10,-8 8,-14c6,8 4,18 -6,20c-8,2 -18,-2 -14,-8z" />
      </g>
      <g className="idn-kb-flame1b" fill="#e8443f" opacity="0.85">
        <path d="M78,104c-1,-5 3,-8 1,-12c4,3 5,7 3,10c3,-2 3,-6 1,-9c4,4 4,9 1,12c5,-1 6,-5 5,-9c4,5 2,11 -4,12c-5,1 -11,-1 -9,-5z" />
      </g>

      {/* 屋台2へ飛び移る炎(小さく現れて育つ)。 */}
      <g className="idn-kb-flame2" fill="#f5b31c">
        <path d="M270,108c-1,-5 3,-7 2,-11c4,2 5,6 3,9c2,-2 2,-6 1,-8c4,3 4,8 1,11c5,-1 6,-4 5,-8c4,5 2,10 -4,11c-4,1 -9,-1 -8,-4z" />
      </g>

      {/* 煙(二つの屋台から立ちのぼる)。 */}
      <g className="idn-kb-smoke" fill="#6b6a68" opacity="0.75">
        <ellipse cx="85" cy="70" rx="14" ry="8" />
        <ellipse cx="70" cy="50" rx="18" ry="10" />
      </g>
      <g className="idn-kb-smoke2" fill="#6b6a68" opacity="0.6">
        <ellipse cx="280" cy="80" rx="10" ry="6" />
      </g>

      <style>{`
        .idn-kb-flame1, .idn-kb-flame1b {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: idn-kb-flicker 1.1s ease-in-out infinite;
        }
        .idn-kb-flame1b { animation-delay: 0.2s; }
        @keyframes idn-kb-flicker {
          0%, 100% { transform: scaleY(1) skewX(0deg); }
          50% { transform: scaleY(1.15) skewX(-4deg); }
        }
        .idn-kb-flame2 {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          opacity: 0;
          animation: idn-kb-catch 3.4s ease-in-out infinite;
        }
        @keyframes idn-kb-catch {
          0% { opacity: 0; transform: scale(0.3); }
          55% { opacity: 0; transform: scale(0.3); }
          75% { opacity: 1; transform: scale(1); }
          90% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1.1); }
        }
        .idn-kb-smoke {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: idn-kb-rise 2.4s ease-in-out infinite;
        }
        @keyframes idn-kb-rise {
          0% { transform: translateY(10px) scale(0.8); opacity: 0; }
          50% { opacity: 0.7; }
          100% { transform: translateY(-30px) scale(1.3); opacity: 0; }
        }
        .idn-kb-smoke2 {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          opacity: 0;
          animation: idn-kb-rise2 3.4s ease-in-out infinite;
        }
        @keyframes idn-kb-rise2 {
          0% { opacity: 0; transform: translateY(6px); }
          65% { opacity: 0; transform: translateY(6px); }
          85% { opacity: 0.6; transform: translateY(-10px); }
          100% { opacity: 0; transform: translateY(-24px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .idn-kb-flame1, .idn-kb-flame1b { animation: none; }
          .idn-kb-flame2 { animation: none; opacity: 1; }
          .idn-kb-smoke, .idn-kb-smoke2 { animation: none; opacity: 0.6; }
        }
      `}</style>
    </svg>
  );
}
