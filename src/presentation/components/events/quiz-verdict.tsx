/**
 * クイズの正誤を見せる短い絵。
 *
 * これまでは ⭕ / ❌ の絵文字だけだった。正解したときの手応えと、
 * 外したときの「惜しい」が伝わるよう、印が描かれる動きを付ける。
 * 学ぶことが目的なので、外したときも責める調子にはしない
 * (×は静かに描かれ、周りに星は飛ばさない)。
 */
export function QuizVerdict({ correct }: { correct: boolean }) {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      <rect width="400" height="210" fill={correct ? "#1d3b2a" : "#33232c"} />

      {correct ? (
        <>
          {/* 広がる輪 */}
          <circle className="qv-ring" cx="200" cy="105" r="52" fill="none" stroke="#7bc86c" strokeWidth="6" />
          {/* 描かれる丸 */}
          <circle
            className="qv-circle"
            cx="200"
            cy="105"
            r="52"
            fill="none"
            stroke="#9ee68c"
            strokeWidth="12"
            strokeLinecap="round"
            transform="rotate(-90 200 105)"
          />
          {/* はじける光 */}
          <g className="qv-sparks" fill="#f5d06a">
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <rect key={deg} x="197" y="18" width="6" height="16" rx="3" transform={`rotate(${deg} 200 105)`} />
            ))}
          </g>
        </>
      ) : (
        <>
          {/* 描かれるバツ */}
          <path
            className="qv-x1"
            d="M162,67L238,143"
            stroke="#e8756f"
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
          />
          <path
            className="qv-x2"
            d="M238,67L162,143"
            stroke="#e8756f"
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
          />
        </>
      )}

      <style>{`
        .qv-circle { stroke-dasharray: 327; stroke-dashoffset: 327; animation: qv-draw 0.7s ease-out forwards; }
        .qv-ring { transform-box: fill-box; transform-origin: center; opacity: 0; animation: qv-burst 1.6s ease-out infinite; }
        .qv-sparks { transform-box: fill-box; transform-origin: center; opacity: 0; animation: qv-pop 1.6s ease-out infinite; }
        .qv-x1 { stroke-dasharray: 108; stroke-dashoffset: 108; animation: qv-draw 0.4s ease-out 0.05s forwards; }
        .qv-x2 { stroke-dasharray: 108; stroke-dashoffset: 108; animation: qv-draw 0.4s ease-out 0.3s forwards; }

        @keyframes qv-draw { to { stroke-dashoffset: 0; } }
        @keyframes qv-burst {
          0% { transform: scale(0.7); opacity: 0.9; }
          60%, 100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes qv-pop {
          0% { transform: scale(0.4); opacity: 0; }
          35% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1.35); opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .qv-ring, .qv-sparks { animation: none; opacity: 0; }
          /* 印は描き終えた状態で出す(止めても正誤が分かる必要がある)。 */
          .qv-circle, .qv-x1, .qv-x2 { animation: none; stroke-dashoffset: 0; }
        }
      `}</style>
    </svg>
  );
}
