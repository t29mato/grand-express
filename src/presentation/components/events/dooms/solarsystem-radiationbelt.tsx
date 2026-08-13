/**
 * 放射線帯の通過で被曝する。惑星を取り巻く帯の中を突っ切るあいだ、
 * 線量計の針が振り切れる。
 *
 * 動くのは、振り切れる線量計の針1つだけ。
 */
export function SolarsystemRadiationbelt() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 深宇宙。 */}
      <rect width="400" height="210" fill="#050a1c" />
      <g fill="#f0ead6" opacity="0.6">
        <circle cx="30" cy="180" r="1.2" />
        <circle cx="370" cy="30" r="1" />
      </g>

      {/* 惑星と放射線帯(縞状)。 */}
      <circle cx="140" cy="105" r="60" fill="#d8b878" />
      <g fill="none" strokeLinecap="round">
        <ellipse cx="140" cy="105" rx="120" ry="40" stroke="#8fe07a" strokeWidth="6" opacity="0.55" />
        <ellipse cx="140" cy="105" rx="150" ry="55" stroke="#e8d84a" strokeWidth="6" opacity="0.5" />
        <ellipse cx="140" cy="105" rx="180" ry="70" stroke="#e85a3a" strokeWidth="6" opacity="0.4" />
      </g>

      {/* 探査機の船体(帯の中)。 */}
      <g strokeLinejoin="round">
        <rect x="300" y="90" width="60" height="26" rx="5" fill="#c9d6f0" stroke="#20364a" strokeWidth="2" />
        <rect x="278" y="98" width="20" height="6" fill="#c8a850" />
      </g>

      {/* 線量計。 */}
      <circle cx="60" cy="150" r="34" fill="#0c1830" stroke="#20364a" strokeWidth="3" />
      <path d="M40,150 A20,20 0 0 1 80,150" fill="none" stroke="#8a92a0" strokeWidth="2" />

      {/* 振り切れる針。**ここだけが動く。** */}
      <g className="ssr-needle" transform="translate(60,150)">
        <line x1="0" y1="0" x2="0" y2="-22" stroke="#ff5a3a" strokeWidth="3" strokeLinecap="round" />
      </g>

      <style>{`
        .ssr-needle {
          transform-box: fill-box;
          transform-origin: 60px 150px;
          animation: ssr-swing 0.4s ease-in-out infinite;
        }
        @keyframes ssr-swing {
          0% { transform: translate(60px,150px) rotate(-55deg); }
          50% { transform: translate(60px,150px) rotate(55deg); }
          100% { transform: translate(60px,150px) rotate(-55deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ssr-needle { animation: none; transform: translate(60px,150px) rotate(40deg); }
        }
      `}</style>
    </svg>
  );
}
