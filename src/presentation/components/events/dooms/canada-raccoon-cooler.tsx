/**
 * アライグマがキャンプのクーラーボックスを開けてしまう。器用な両手が
 * 留め金をこじ開け続け、やがて蓋が跳ね上がって食料が散らばる。
 *
 * 動くのはアライグマの両手と、跳ね上がる蓋・散らばる食料だけ。
 */
export function CanadaRaccoonCooler() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜の焚き火跡のキャンプサイト。 */}
      <rect width="400" height="210" fill="#1c2430" />
      <rect y="0" width="400" height="120" fill="#243040" />
      <circle cx="330" cy="40" r="18" fill="#e8e0c8" opacity="0.85" />
      <rect y="150" width="400" height="60" fill="#161c26" />

      {/* テントのシルエット(奥)。 */}
      <path d="M40,150 L80,100 L120,150 Z" fill="#2f3a48" />
      <path d="M300,150 L340,110 L380,150 Z" fill="#2f3a48" />

      {/* 消えかけた焚き火。 */}
      <ellipse cx="200" cy="170" rx="26" ry="6" fill="#3a3020" />
      <g fill="#e8443f" opacity="0.6"><path d="M195,168l3,-8l3,8z" /><path d="M203,168l3,-6l3,6z" /></g>

      {/* クーラーボックス本体(常に見える)。 */}
      <rect x="150" y="150" width="90" height="46" rx="4" fill="#5b8fe8" stroke="#20364a" strokeWidth="2.5" />
      <rect x="150" y="150" width="90" height="8" fill="#4a7bd0" />

      {/* 跳ね上がる蓋。ここが動く。 */}
      <g className="crc-lid" transform="translate(150,150)">
        <rect x="0" y="0" width="90" height="10" rx="3" fill="#4a7bd0" stroke="#20364a" strokeWidth="2" />
      </g>

      {/* 散らばる食料。ここも動く。 */}
      <g className="crc-food" fill="#f5b31c">
        <circle cx="130" cy="150" r="6" />
        <rect x="255" y="150" width="14" height="9" rx="2" fill="#e8443f" />
      </g>

      {/* アライグマの頭と両手。ここが動く。 */}
      <g className="crc-paws" transform="translate(195,168)">
        <circle cx="0" cy="0" r="12" fill="#4a4a52" stroke="#20364a" strokeWidth="2" />
        <path d="M-8,-4 a4,3 0 0 1 8,0z" fill="#20232a" />
        <path d="M0,-4 a4,3 0 0 1 8,0z" fill="#20232a" />
        <circle cx="-4" cy="-2" r="1.6" fill="#f6efe2" />
        <circle cx="4" cy="-2" r="1.6" fill="#f6efe2" />
        <g className="crc-hands" fill="#4a4a52" stroke="#20364a" strokeWidth="1.5">
          <ellipse cx="-14" cy="6" rx="5" ry="4" />
          <ellipse cx="14" cy="6" rx="5" ry="4" />
        </g>
      </g>

      <style>{`
        .crc-lid {
          transform-box: fill-box;
          transform-origin: 0% 100%;
          animation: crc-pop 2.6s ease-in infinite;
        }
        @keyframes crc-pop {
          0%, 55% { transform: rotate(0deg); }
          70% { transform: rotate(-70deg) translate(-4px, -2px); }
          100% { transform: rotate(-70deg) translate(-4px, -2px); }
        }
        .crc-hands {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: crc-pry 0.7s ease-in-out infinite;
        }
        @keyframes crc-pry {
          0%, 100% { transform: translateX(-2px) rotate(-6deg); }
          50% { transform: translateX(2px) rotate(6deg); }
        }
        .crc-food {
          opacity: 0;
          animation: crc-scatter 2.6s ease-out infinite;
        }
        @keyframes crc-scatter {
          0%, 55% { opacity: 0; transform: translate(0,0); }
          70%, 100% { opacity: 1; transform: translate(0,10px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .crc-lid, .crc-hands, .crc-food { animation: none; }
          .crc-lid { transform: rotate(-70deg) translate(-4px, -2px); }
          .crc-food { opacity: 1; transform: translate(0,10px); }
        }
      `}</style>
    </svg>
  );
}
