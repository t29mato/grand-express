/**
 * 台風が海岸を渡る。広東から浙江までの沿岸で毎年何度か直撃を受ける、
 * 上陸の一週間前から進路を追われた嵐。日よけをちぎり、木々の葉をむしる。
 *
 * 動くのは、斜めに吹きつける雨脚1つだけ。
 */
export function ChinaTaifeng() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 荒れた空。 */}
      <rect width="400" height="210" fill="#5f7080" />
      <rect y="0" width="400" height="80" fill="#7a8a98" />
      <g fill="#8f9aa4" opacity="0.85">
        <ellipse cx="80" cy="40" rx="60" ry="16" />
        <ellipse cx="260" cy="26" rx="80" ry="18" />
        <ellipse cx="360" cy="52" rx="50" ry="14" />
      </g>

      {/* 海。 */}
      <rect y="150" width="400" height="60" fill="#2f5f7a" />
      <g stroke="#4f7f9a" strokeWidth="2" opacity="0.8" fill="none">
        <path d="M10,160 q20,-8 40,0 t40,0 t40,0 t40,0" />
        <path d="M220,172 q20,-8 40,0 t40,0 t40,0" />
      </g>

      {/* 埠頭と傾いだ帆船。 */}
      <rect x="0" y="140" width="120" height="12" fill="#8a8478" />
      <g strokeLinejoin="round" transform="rotate(-8 60 158)">
        <path d="M40,166 c4,7 32,7 40,0 l-4,8 h-32 z" fill="#6b5330" stroke="#20364a" strokeWidth="2" />
        <rect x="58" y="120" width="2.4" height="46" fill="#4a4436" />
        <path d="M60,124 h20 l-3,10 h-17 z" fill="#c9a877" stroke="#20364a" strokeWidth="1.6" />
      </g>

      {/* ちぎれかけた店先の日よけ(骨組みだけ残る)。 */}
      <g strokeLinejoin="round" strokeLinecap="round">
        <rect x="280" y="120" width="70" height="34" fill="#c9302c" stroke="#20364a" strokeWidth="2" opacity="0.9" />
        <path d="M280,120 l-14,26 M300,120 l-8,30 M320,120 l4,32 M340,120 l16,28" stroke="#8a1f1f" strokeWidth="2" fill="none" />
      </g>

      {/* 葉をむしられた街路樹。 */}
      <g strokeLinejoin="round">
        <rect x="196" y="150" width="6" height="40" fill="#6b5330" stroke="#20364a" strokeWidth="1.6" />
        <path d="M199,150 q-16,-14 -26,-6 M199,150 q18,-10 28,0 M199,150 q-6,-20 4,-28" stroke="#3f5f3f" strokeWidth="2.4" fill="none" />
      </g>

      {/* 斜めに吹きつける雨脚。**ここだけが動く。** */}
      <g className="ctf-rain" stroke="#dfe8ee" strokeWidth="2" strokeLinecap="round" opacity="0.75">
        <path d="M40,0 L10,50" />
        <path d="M120,-10 L90,40" />
        <path d="M200,10 L170,60" />
        <path d="M280,-6 L250,44" />
        <path d="M360,4 L330,54" />
      </g>

      <style>{`
        .ctf-rain {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: ctf-fall 0.6s linear infinite;
        }
        @keyframes ctf-fall {
          0% { transform: translate(30px, -20px); }
          100% { transform: translate(-10px, 220px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ctf-rain { animation: none; opacity: 0.4; }
        }
      `}</style>
    </svg>
  );
}
