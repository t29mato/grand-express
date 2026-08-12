/**
 * 誤って桃花源に迷い込む。陶淵明の物語そのままに、川をたどるうちに
 * 桃の花の林が尽きて崖の裂け目が現れ、光る奥へと引き込まれていく。
 *
 * 動くのは、川をたどって崖の裂け目へ吸い込まれていく小舟1つだけ。
 */
export function ChinaWuruTaohuayuan() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 空。 */}
      <rect width="400" height="210" fill="#cfe4f0" />
      <rect y="0" width="400" height="70" fill="#e4f0e0" />

      {/* 両岸の桃の花林。 */}
      <g strokeLinejoin="round">
        <rect x="20" y="90" width="8" height="60" fill="#6b5330" />
        <circle cx="24" cy="80" r="22" fill="#f0a8c0" />
        <circle cx="8" cy="94" r="14" fill="#e890b0" />
        <circle cx="40" cy="94" r="14" fill="#e890b0" />
        <rect x="365" y="80" width="8" height="60" fill="#6b5330" />
        <circle cx="369" cy="70" r="24" fill="#f0a8c0" />
        <circle cx="352" cy="86" r="15" fill="#e890b0" />
        <circle cx="386" cy="86" r="15" fill="#e890b0" />
      </g>

      {/* 崖。裂け目の奥が光る。 */}
      <path d="M150,0 L150,210 L120,210 Q100,140 130,70 Q140,30 150,0 Z" fill="#7f8f8a" />
      <path d="M250,0 L250,210 L280,210 Q300,140 270,70 Q260,30 250,0 Z" fill="#8f9f9a" />
      <path d="M150,60 Q200,50 250,60 L246,160 Q200,175 154,160 Z" fill="#f4e0a0" opacity="0.9" />
      <path d="M150,60 Q200,50 250,60 L246,110 Q200,120 154,110 Z" fill="#fff6d8" opacity="0.7" />

      {/* 川。 */}
      <rect y="160" width="400" height="50" fill="#3f8fc4" />
      <g stroke="#bfe8f4" strokeWidth="2" opacity="0.7" fill="none">
        <path d="M10,172 h60 M300,180 h70 M120,196 h50" />
      </g>

      {/* 花びらが舞う。 */}
      <g fill="#f0a8c0" opacity="0.85">
        <circle cx="80" cy="110" r="3" />
        <circle cx="110" cy="90" r="2.4" />
        <circle cx="300" cy="100" r="3" />
        <circle cx="330" cy="120" r="2.4" />
      </g>

      {/* 川をたどり、光る裂け目へ吸い込まれていく小舟。**ここだけが動く。** */}
      <g className="cwt-boat" strokeLinejoin="round">
        <path d="M0,184 c6,7 26,7 32,0 l-3,7 h-26 z" fill="#6b5330" stroke="#20364a" strokeWidth="2" />
        <circle cx="16" cy="176" r="5" fill="#d9a273" stroke="#20364a" strokeWidth="1.6" />
        <path d="M9,184 v-6" stroke="#4a4436" strokeWidth="2" />
      </g>

      <style>{`
        .cwt-boat {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: cwt-drift 3.2s ease-in infinite;
        }
        @keyframes cwt-drift {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          70% { transform: translate(180px, -8px) scale(0.7); opacity: 1; }
          100% { transform: translate(210px, -10px) scale(0.3); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cwt-boat { animation: none; }
        }
      `}</style>
    </svg>
  );
}
