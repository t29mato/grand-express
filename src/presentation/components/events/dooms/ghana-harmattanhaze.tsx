/**
 * ハルマッタンの砂塵で足止めされる。滑走路に停まる旅客機が、
 * サハラから流れてきた薄茶色の霞にゆっくり飲み込まれていく。
 *
 * 動くのは、右から左へ流れてくる砂塵の帯1つだけ。
 */
export function GhanaHarmattanhaze() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* くすんだ空。 */}
      <rect width="400" height="210" fill="#e0c48a" />
      <rect y="0" width="400" height="90" fill="#eadcb0" />

      {/* 管制塔。 */}
      <g strokeLinejoin="round">
        <rect x="330" y="70" width="14" height="80" fill="#c9c4b6" stroke="#8a8378" strokeWidth="1.6" />
        <rect x="322" y="58" width="30" height="16" rx="2" fill="#e8e0cc" stroke="#8a8378" strokeWidth="1.6" />
      </g>

      {/* 滑走路。 */}
      <rect y="150" width="400" height="60" fill="#7a746a" />
      <g fill="#e8dcc0">
        <rect x="20" y="176" width="30" height="6" />
        <rect x="80" y="176" width="30" height="6" />
        <rect x="140" y="176" width="30" height="6" />
        <rect x="200" y="176" width="30" height="6" />
      </g>

      {/* 停まった旅客機。 */}
      <g strokeLinejoin="round">
        <path d="M60,150 h150 q14,0 14,-10 q0,-10 -14,-10 h-150 q-10,0 -10,10 q0,10 10,10z" fill="#e8e0cc" stroke="#4a4a52" strokeWidth="2" />
        <path d="M150,130 l30,-24 l10,4 l-18,20z" fill="#c9c4b6" stroke="#4a4a52" strokeWidth="1.6" />
        <path d="M170,150 l14,20 l-10,2 l-16,-22z" fill="#c9c4b6" stroke="#4a4a52" strokeWidth="1.6" />
        <circle cx="90" cy="140" r="3" fill="#5b8fe8" />
        <circle cx="110" cy="140" r="3" fill="#5b8fe8" />
        <circle cx="130" cy="140" r="3" fill="#5b8fe8" />
      </g>

      {/* サハラから流れる砂塵の帯。**ここだけが動く。** */}
      <g className="ghh-haze" fill="#d8b877" opacity="0.75">
        <rect x="-120" y="60" width="140" height="150" />
        <rect x="30" y="60" width="90" height="150" opacity="0.6" />
      </g>

      <style>{`
        .ghh-haze {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: ghh-drift 4s linear infinite;
        }
        @keyframes ghh-drift {
          0% { transform: translateX(0); }
          100% { transform: translateX(520px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ghh-haze { animation: none; transform: translateX(260px); }
        }
      `}</style>
    </svg>
  );
}
