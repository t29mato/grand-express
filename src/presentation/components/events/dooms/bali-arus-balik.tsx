/**
 * 離岸流に引かれる。旗の脇から、渦を巻く帯が沖へまっすぐ伸びていて、
 * その上を人影が速く流されていく。動くのは人影の移動と、渦の帯だけ。
 */
export function BaliArusBalik() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 空。 */}
      <rect width="400" height="210" fill="#8fc4e8" />
      <rect y="0" width="400" height="60" fill="#cfe4f0" />

      {/* 海。 */}
      <rect y="60" width="400" height="120" fill="#1a5f8a" />
      <g stroke="#2f89ac" strokeWidth="2" opacity="0.7" fill="none">
        <path d="M0,80q40,-10 80,0t80,0t80,0t80,0t80,0" />
        <path d="M0,150q40,10 80,0t80,0t80,0t80,0t80,0" />
      </g>

      {/* 浜。 */}
      <rect y="180" width="400" height="30" fill="#e8d8bf" />

      {/* 離岸流の帯(暗い筋、沖へまっすぐ)。 */}
      <path d="M60,180 Q120,120 340,70 L360,80 Q140,130 80,190z" fill="#123f5c" opacity="0.8" />
      <g className="bab-swirl" stroke="#0e304a" strokeWidth="2" opacity="0.6" fill="none">
        <path d="M90,175q10,-8 4,-16M150,150q10,-6 4,-14M210,125q10,-6 4,-12M270,100q8,-6 4,-12" />
      </g>

      {/* 警告旗。 */}
      <rect x="46" y="150" width="2.4" height="34" fill="#5a4630" />
      <path d="M48.4,150h20l-6,7l6,7h-20z" fill="#e8443f" />

      {/* 流される人。 */}
      <g className="bab-person">
        <ellipse cx="0" cy="3" rx="9" ry="3" fill="#123f5c" opacity="0.5" />
        <circle cx="0" cy="0" r="6" fill="#a8763a" />
        <path d="M-8,4q8,4 16,0" stroke="#e8443f" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M-6,-2l-6,-4M6,-2l6,-4" stroke="#a8763a" strokeWidth="2.4" strokeLinecap="round" />
      </g>

      <style>{`
        .bab-swirl {
          animation: bab-churn 1.2s linear infinite;
        }
        @keyframes bab-churn {
          0% { opacity: 0.4; }
          50% { opacity: 0.8; }
          100% { opacity: 0.4; }
        }
        .bab-person {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: bab-sweep 2.8s ease-in infinite;
        }
        @keyframes bab-sweep {
          0% { transform: translate(90px,178px) scale(1); }
          70% { transform: translate(300px,78px) scale(0.7); }
          100% { transform: translate(300px,78px) scale(0.7); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bab-swirl { animation: none; opacity: 0.6; }
          .bab-person { animation: none; transform: translate(220px,120px) scale(0.85); }
        }
      `}</style>
    </svg>
  );
}
