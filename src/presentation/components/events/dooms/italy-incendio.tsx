/**
 * 丘の山火事が広がる。丘の稜線に炎が這い、煙が立ちのぼる。
 * 家からは荷物を抱えた人が離れていく(燃える家そのものは描かない)。
 *
 * 動くのは炎の揺らめきと煙、逃げる人の足だけ。
 */
export function ItalyIncendio() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夕暮れの空、煙でくすんでいる。 */}
      <rect width="400" height="210" fill="#8a7050" />
      <rect y="0" width="400" height="90" fill="#a8886a" />

      {/* 立ちのぼる煙。 */}
      <g fill="#c8ccc4" opacity="0.7">
        <circle className="ita-in-smoke ita-in-smoke-0" cx="140" cy="70" r="18" />
        <circle className="ita-in-smoke ita-in-smoke-1" cx="170" cy="55" r="22" />
        <circle className="ita-in-smoke ita-in-smoke-2" cx="200" cy="66" r="16" />
      </g>

      {/* 丘の稜線。 */}
      <path d="M0,140c60,-30 120,-40 180,-22c80,-24 160,-10 220,-20v42H0z" fill="#3a3028" />

      {/* 燃える稜線の炎。 */}
      <g>
        {[60, 100, 140, 180, 220, 260].map((x, i) => (
          <path
            key={x}
            className={`ita-in-flame ita-in-flame-${i % 3}`}
            d={`M${x},128 q6,-16 0,-24 q-6,8 -2,16 q-8,-4 -8,4 q0,10 10,10 q10,0 10,-8 q0,-8 -10,2z`}
            fill="#e8443f"
          />
        ))}
        {[60, 100, 140, 180, 220, 260].map((x, i) => (
          <circle key={`c${x}`} cx={x} cy={122} r="4" fill="#f5b31c" className={`ita-in-flame ita-in-flame-${(i + 1) % 3}`} />
        ))}
      </g>

      {/* 地面。 */}
      <rect y="150" width="400" height="60" fill="#7f9f5c" />

      {/* 小さな家(無事、燃えていない)。 */}
      <g>
        <rect x="40" y="160" width="46" height="34" fill="#e8dcc0" />
        <path d="M34,160h58l-9,-16h-40z" fill="#c9714a" />
      </g>

      {/* 荷物を抱えて家から離れる人(避難)。 */}
      <g className="ita-in-flee">
        <circle cx="150" cy="176" r="8" fill="#d9a273" />
        <rect x="141" y="184" width="18" height="22" fill="#5b8fe8" />
        <rect x="160" y="178" width="16" height="14" rx="2" fill="#8a5a3a" />
      </g>

      <style>{`
        .ita-in-smoke {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: ita-in-rise 3s ease-in infinite;
        }
        .ita-in-smoke-0 { animation-delay: 0s; }
        .ita-in-smoke-1 { animation-delay: 0.8s; }
        .ita-in-smoke-2 { animation-delay: 1.6s; }
        @keyframes ita-in-rise {
          0% { transform: translateY(0) scale(1); opacity: 0.7; }
          100% { transform: translateY(-40px) scale(1.5); opacity: 0; }
        }
        .ita-in-flame {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: ita-in-flicker 0.6s ease-in-out infinite;
        }
        .ita-in-flame-0 { animation-delay: 0s; }
        .ita-in-flame-1 { animation-delay: 0.2s; }
        .ita-in-flame-2 { animation-delay: 0.4s; }
        @keyframes ita-in-flicker {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.25); }
        }
        .ita-in-flee {
          animation: ita-in-walk 2.4s linear infinite;
        }
        @keyframes ita-in-walk {
          0% { transform: translateX(0); }
          100% { transform: translateX(160px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ita-in-smoke, .ita-in-flame, .ita-in-flee { animation: none; }
        }
      `}</style>
    </svg>
  );
}
