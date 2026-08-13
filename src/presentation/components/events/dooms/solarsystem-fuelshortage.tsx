/**
 * 姿勢制御用の燃料計がゼロを指す。タンクが空になり、
 * 船体がゆっくり向きを失って回り出す。
 *
 * 動くのは、ゆっくり回転していく船体1つだけ。
 */
export function SolarsystemFuelshortage() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 深宇宙。 */}
      <rect width="400" height="210" fill="#050a1c" />
      <g fill="#f0ead6" opacity="0.6">
        <circle cx="40" cy="40" r="1.2" />
        <circle cx="360" cy="30" r="1" />
        <circle cx="330" cy="180" r="1.2" />
        <circle cx="30" cy="160" r="1" />
      </g>

      {/* 燃料タンクの断面と空のゲージ(左)。 */}
      <g strokeLinejoin="round">
        <rect x="40" y="70" width="50" height="90" rx="8" fill="#0c1830" stroke="#20364a" strokeWidth="3" />
        <rect x="46" y="150" width="38" height="4" fill="#5a4030" opacity="0.6" />
      </g>
      <path d="M40,160 h50" stroke="#ff5a3a" strokeWidth="3" />

      {/* 姿勢を失って回る船体。**ここだけが動く。** */}
      <g className="sfs-hull">
        <rect x="-40" y="-16" width="80" height="32" rx="8" fill="#c9d6f0" stroke="#20364a" strokeWidth="2.4" />
        <rect x="-62" y="-6" width="18" height="12" fill="#c8a850" />
        <rect x="44" y="-6" width="18" height="12" fill="#c8a850" />
        <rect x="-8" y="-30" width="16" height="16" fill="#8a92a0" stroke="#20364a" strokeWidth="1.6" />
      </g>

      <style>{`
        .sfs-hull {
          transform-box: fill-box;
          transform-origin: 250px 110px;
          animation: sfs-tumble 4s linear infinite;
        }
        @keyframes sfs-tumble {
          0% { transform: translate(250px,110px) rotate(0deg); }
          100% { transform: translate(250px,110px) rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .sfs-hull { animation: none; transform: translate(250px,110px) rotate(25deg); }
        }
      `}</style>
    </svg>
  );
}
