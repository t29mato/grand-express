/**
 * 軌道デブリが船体に穴を開ける。塗料のかけらほどの小片が、
 * 軌道速度のままハッチの窓を斜めに突き抜けていく。
 *
 * 動くのは、飛んでくるデブリの小片1つだけ。
 */
export function SolarsystemDebris() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 深宇宙。 */}
      <rect width="400" height="210" fill="#050a1c" />
      <g fill="#f0ead6" opacity="0.7">
        <circle cx="60" cy="40" r="1.2" />
        <circle cx="140" cy="20" r="1" />
        <circle cx="340" cy="50" r="1.4" />
        <circle cx="30" cy="170" r="1" />
        <circle cx="200" cy="30" r="1.2" />
      </g>

      {/* 船体。 */}
      <g strokeLinejoin="round">
        <rect x="90" y="60" width="220" height="90" rx="14" fill="#c9d6f0" stroke="#20364a" strokeWidth="2.4" />
        <rect x="50" y="90" width="40" height="30" fill="#8a92a0" stroke="#20364a" strokeWidth="1.6" />
        <rect x="310" y="90" width="40" height="30" fill="#8a92a0" stroke="#20364a" strokeWidth="1.6" />
      </g>

      {/* 窓(観測ドーム)とひび。 */}
      <circle cx="200" cy="105" r="30" fill="#20364a" stroke="#0c1830" strokeWidth="3" />
      <circle cx="200" cy="105" r="30" fill="none" stroke="#0c1830" strokeWidth="3" />
      <path d="M200,105 l-14,-10 M200,105 l16,6 M200,105 l-6,16 M200,105 l10,14" stroke="#8fa0b4" strokeWidth="1.6" opacity="0.85" />

      {/* 飛来するデブリ片。**ここだけが動く。** */}
      <g className="ssd-chip">
        <rect x="-6" y="-2" width="12" height="4" fill="#c9c4bc" transform="rotate(30)" />
      </g>

      <style>{`
        .ssd-chip {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: ssd-fly 1.1s linear infinite;
        }
        @keyframes ssd-fly {
          0% { transform: translate(370px, 10px); opacity: 1; }
          70% { transform: translate(205px, 100px); opacity: 1; }
          72% { transform: translate(205px, 100px); opacity: 0; }
          100% { transform: translate(370px, 10px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ssd-chip { animation: none; opacity: 0; }
        }
      `}</style>
    </svg>
  );
}
