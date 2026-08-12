/**
 * 噴煙からの灰が屋根に積もる。遠くの山が煙を上げ、灰の粒が
 * ゆっくり降り積もって屋根と畑の色を変えていく。
 * 動くのは灰の粒の落下と、噴煙のわずかな広がりだけ。
 */
export function BaliAbuVulkanik() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 曇った空。 */}
      <rect width="400" height="210" fill="#9fa8a8" />
      <rect y="0" width="400" height="80" fill="#c0c4bc" />

      {/* 遠くの山と噴煙。 */}
      <path d="M40,110L96,40L152,110z" fill="#5c5044" />
      <g className="bav-plume">
        <ellipse cx="96" cy="30" rx="14" ry="9" fill="#8f948c" opacity="0.85" />
        <ellipse cx="110" cy="16" rx="18" ry="11" fill="#a8aca4" opacity="0.8" />
        <ellipse cx="128" cy="4" rx="22" ry="12" fill="#b8bcb4" opacity="0.75" />
      </g>

      {/* 地面、屋根、畑。 */}
      <rect y="110" width="400" height="100" fill="#7fae5a" />
      <rect x="240" y="140" width="90" height="40" fill="#c9a877" />
      <path d="M232,140h106l-16,-18h-74z" className="bav-roof" fill="#5a4630" />
      <g stroke="#4f8f42" strokeWidth="2.4" opacity="0.8">
        <path d="M20,190h60M20,198h60M100,190h60M100,198h60" />
      </g>

      {/* 灰の粒(繰り返し降る)。 */}
      <g className="bav-ash" fill="#c9c8bc" opacity="0.9">
        <circle cx="60" cy="0" r="2.4" />
        <circle cx="140" cy="20" r="2" />
        <circle cx="220" cy="-10" r="2.6" />
        <circle cx="280" cy="10" r="2.2" />
        <circle cx="340" cy="-6" r="2.4" />
        <circle cx="20" cy="40" r="1.8" />
        <circle cx="180" cy="50" r="2" />
        <circle cx="300" cy="36" r="2.2" />
      </g>

      {/* 屋根に積もった灰(だんだん濃くなる)。 */}
      <path className="bav-dust" d="M232,140h106l-16,-18h-74z" fill="#c9c8bc" opacity="0" />

      <style>{`
        .bav-plume {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: bav-puff 4s ease-in-out infinite;
        }
        @keyframes bav-puff {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.15); opacity: 1; }
        }
        .bav-ash {
          animation: bav-fall 3.4s linear infinite;
        }
        @keyframes bav-fall {
          0% { transform: translateY(0); opacity: 0.9; }
          90% { opacity: 0.9; }
          100% { transform: translateY(170px); opacity: 0.2; }
        }
        .bav-dust {
          animation: bav-settle 3.4s linear infinite;
        }
        @keyframes bav-settle {
          0%, 60% { opacity: 0; }
          100% { opacity: 0.55; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bav-plume { animation: none; }
          .bav-ash { animation: none; opacity: 0.4; }
          .bav-dust { animation: none; opacity: 0.55; }
        }
      `}</style>
    </svg>
  );
}
