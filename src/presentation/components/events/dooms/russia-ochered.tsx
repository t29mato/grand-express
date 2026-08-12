/**
 * お役所の行列に午後がまるごと消える。窓口はシャッターの縞模様で
 * 開いたり閉じたりを繰り返し、壁の時計の針だけが速く回って
 * 「時間が過ぎるのに列は動かない」ことを示す。人物は静止したまま。
 */
export function RussiaOchered() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 室内の空気(やや暗い蛍光灯色)。 */}
      <rect width="400" height="210" fill="#8f96a0" />
      <rect y="0" width="400" height="150" fill="#a8aeb6" />

      {/* 床。 */}
      <rect y="150" width="400" height="60" fill="#7f8896" />
      <rect y="150" width="400" height="4" fill="#6f7680" />

      {/* 窓口の壁と受付口。 */}
      <g strokeLinejoin="round">
        <rect x="60" y="40" width="120" height="90" fill="#c9b896" stroke="#20364a" strokeWidth="2.4" />
        <rect x="90" y="80" width="60" height="14" rx="2" fill="#20364a" />
      </g>
      {/* シャッター(縞模様。開閉する)。 */}
      <g className="roc-shutter">
        <rect x="60" y="40" width="120" height="46" fill="#e8443f" opacity="0.9" />
        <g stroke="#f6efe2" strokeWidth="4" opacity="0.7">
          <path d="M66,44v42M84,44v42M102,44v42M120,44v42M138,44v42M156,44v42M174,44v42" />
        </g>
      </g>

      {/* 壁の時計。 */}
      <circle cx="300" cy="60" r="22" fill="#f6efe2" stroke="#20364a" strokeWidth="2.4" />
      <line x1="300" y1="60" x2="300" y2="45" stroke="#20364a" strokeWidth="2" strokeLinecap="round" />
      <line className="roc-hand" x1="300" y1="60" x2="314" y2="60" stroke="#e8443f" strokeWidth="2" strokeLinecap="round" />

      {/* 並ぶ人々(動かない列)。 */}
      <g strokeLinejoin="round" strokeLinecap="round">
        {[70, 100, 130, 160].map((x, i) => (
          <g key={x}>
            <circle cx={x} cy="176" r="9" fill={i % 2 === 0 ? "#d9a273" : "#c98f5f"} stroke="#20364a" strokeWidth="1.8" />
            <rect x={x - 10} y="184" width="20" height="24" rx="4" fill={i % 2 === 0 ? "#5b8fe8" : "#3f8f6f"} stroke="#20364a" strokeWidth="1.8" />
          </g>
        ))}
      </g>

      <style>{`
        .roc-hand {
          transform-box: fill-box;
          transform-origin: 300px 60px;
          animation: roc-spin 2.2s linear infinite;
        }
        @keyframes roc-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .roc-shutter {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: roc-blind 4s ease-in-out infinite;
        }
        @keyframes roc-blind {
          0%, 20% { transform: scaleY(1); }
          45%, 55% { transform: scaleY(0.15); }
          80%, 100% { transform: scaleY(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .roc-hand { animation: none; }
          .roc-shutter { animation: none; transform: scaleY(0.15); }
        }
      `}</style>
    </svg>
  );
}
