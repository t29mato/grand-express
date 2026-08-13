/**
 * 雪崩が峠を塞ぐ。斜面が動いて線路の手前で止まり、列車は足止めされる。
 * 埋もれた瓦礫は描かない。**慌てて手を挙げる運転士**と、動き続ける雪の帯で伝える。
 */
export function EuropeLawine() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 空。 */}
      <rect width="400" height="210" fill="#8fc4e8" />
      <rect y="0" width="400" height="70" fill="#cfe4f0" />

      {/* 山並み。 */}
      <path d="M0,110 L70,30 L130,90 L190,20 L260,95 L320,40 L400,100 L400,210 L0,210z" fill="#8b8f98" />
      <path d="M70,30 L85,50 L55,50z" fill="#f2f6f8" />
      <path d="M190,20 L206,42 L174,42z" fill="#f2f6f8" />
      <path d="M320,40 L334,58 L306,58z" fill="#f2f6f8" />

      {/* 地面と線路。 */}
      <rect y="150" width="400" height="60" fill="#dfe8ec" />
      <rect y="150" width="400" height="5" fill="#c3d3da" />
      <rect y="182" width="400" height="6" fill="#5c5248" />
      <g stroke="#3a332c" strokeWidth="3">
        <path d="M20,184 L380,184" />
        <path d="M30,178 L30,190M60,178 L60,190M90,178 L90,190M120,178 L120,190" />
      </g>

      {/* 足止めされた機関車。運転士が驚いて手を挙げる。 */}
      <g strokeLinejoin="round">
        <rect x="40" y="150" width="70" height="30" rx="4" fill="#5b8fe8" stroke="#20364a" strokeWidth="2.5" />
        <rect x="46" y="138" width="20" height="16" rx="2" fill="#5b8fe8" stroke="#20364a" strokeWidth="2.5" />
        <circle cx="58" cy="182" r="9" fill="#241a10" />
        <circle cx="94" cy="182" r="9" fill="#241a10" />
        <circle cx="82" cy="145" r="9" fill="#f6efe2" stroke="#20364a" strokeWidth="2" />
        <path d="M74,150 L70,132" stroke="#f6efe2" strokeWidth="6" strokeLinecap="round" />
      </g>

      {/* 動き続ける雪崩の帯。線路の手前で止まっている。 */}
      <g className="ela-slide">
        <path d="M150,60 L260,60 L300,150 L190,150z" fill="#f6f9fb" opacity="0.9" />
        <ellipse cx="230" cy="150" rx="60" ry="12" fill="#f6f9fb" opacity="0.85" />
      </g>

      <style>{`
        .ela-slide {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: ela-drop 2.6s ease-in-out infinite;
        }
        @keyframes ela-drop {
          0% { transform: translateY(-40px); opacity: 0.2; }
          55% { transform: translateY(0px); opacity: 0.95; }
          100% { transform: translateY(-40px); opacity: 0.2; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ela-slide { animation: none; transform: translateY(0px); opacity: 0.8; }
        }
      `}</style>
    </svg>
  );
}
