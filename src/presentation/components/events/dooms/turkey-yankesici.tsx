/**
 * グランドバザールですりに遭う。絨毯売りが値段を叫び合う通路で
 * 肩がぶつかった程度にしか感じず、二つ角を曲がってから財布の軽さに気づく。
 *
 * 暴力ではなく、**伸びる手と飛んでいく財布**ですりを表す。
 * 動くのは、抜き取られて飛んでいく財布1つだけ。
 */
export function TurkeyYankesici() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 屋根付き市場の天井。 */}
      <rect width="400" height="210" fill="#9a8a6a" />
      <path d="M0,60a200,50 0 0 1 400,0z" fill="#8a7a5c" />
      <g stroke="#7a6a4a" strokeWidth="1.4" opacity="0.7">
        <path d="M60,20L60,60M140,10L140,60M260,10L260,60M340,20L340,60" />
      </g>

      {/* 天窓からの光。 */}
      <g fill="#f5e0b8" opacity="0.5">
        <ellipse cx="100" cy="40" rx="16" ry="8" />
        <ellipse cx="300" cy="36" rx="16" ry="8" />
      </g>

      {/* 通路の床。 */}
      <rect y="150" width="400" height="60" fill="#c9a877" />
      <g stroke="#b3915c" strokeWidth="1.2" opacity="0.6">
        <path d="M0,164h400M0,182h400" />
      </g>

      {/* 提灯。 */}
      <g fill="#f5b31c">
        <circle cx="80" cy="72" r="4" />
        <circle cx="180" cy="66" r="4" />
        <circle cx="280" cy="70" r="4" />
        <circle cx="340" cy="76" r="4" />
      </g>
      <g stroke="#6b5330" strokeWidth="1">
        <path d="M80,60v12M180,54v12M280,58v12M340,64v12" />
      </g>

      {/* 絨毯売りの店先。 */}
      <g>
        <rect x="20" y="120" width="60" height="40" fill="#8a1f2b" />
        <rect x="20" y="120" width="60" height="10" fill="#c9a227" />
        <rect x="20" y="140" width="60" height="10" fill="#1a5276" />
        <rect x="300" y="118" width="70" height="42" fill="#1a5276" />
        <rect x="300" y="118" width="70" height="10" fill="#3f6f34" />
        <rect x="300" y="138" width="70" height="10" fill="#c9a227" />
      </g>

      {/* 観光客(すられる本人)。 */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <circle cx="180" cy="128" r="9" fill="#d9a273" stroke="#20364a" strokeWidth="2" />
        <rect x="170" y="136" width="20" height="30" rx="3" fill="#5b8fe8" stroke="#20364a" strokeWidth="2" />
        <rect x="168" y="150" width="10" height="14" rx="2" fill="#8a6a3a" stroke="#20364a" strokeWidth="1.6" />
      </g>

      {/* すりの人影(すれ違いざま)。 */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <circle cx="212" cy="130" r="9" fill="#c98a5a" stroke="#20364a" strokeWidth="2" />
        <rect x="202" y="138" width="20" height="30" rx="3" fill="#3a3a40" stroke="#20364a" strokeWidth="2" />
      </g>

      {/* 買い物客たち(背景の人混み)。 */}
      <g strokeLinecap="round" strokeLinejoin="round" opacity="0.85">
        <circle cx="60" cy="132" r="7" fill="#d9a273" stroke="#20364a" strokeWidth="1.6" />
        <rect x="53" y="138" width="14" height="22" rx="2" fill="#3f6f34" stroke="#20364a" strokeWidth="1.4" />
        <circle cx="340" cy="130" r="7" fill="#c98a5a" stroke="#20364a" strokeWidth="1.6" />
        <rect x="333" y="136" width="14" height="22" rx="2" fill="#8a1f2b" stroke="#20364a" strokeWidth="1.4" />
      </g>

      {/* すりの伸びる手。 */}
      <path d="M202,148 Q188,152 178,158" stroke="#c98a5a" strokeWidth="6" fill="none" strokeLinecap="round" />

      {/* 飛んでいく財布。**ここだけが動く。** */}
      <g className="ykc-wallet">
        <rect x="-8" y="-6" width="16" height="12" rx="2" fill="#6b5330" stroke="#3a2e1c" strokeWidth="1.4" />
        <rect x="-6" y="-2" width="12" height="2" fill="#c9a227" />
      </g>

      <style>{`
        .ykc-wallet {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: ykc-snatch 2.4s ease-in infinite;
        }
        @keyframes ykc-snatch {
          0%   { transform: translate(178px, 158px) rotate(0deg); opacity: 1; }
          70%  { transform: translate(210px, 132px) rotate(200deg); opacity: 1; }
          100% { transform: translate(230px, 118px) rotate(260deg); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ykc-wallet {
            animation: none;
            transform: translate(210px, 132px) rotate(200deg);
            transform-box: fill-box;
          }
        }
      `}</style>
    </svg>
  );
}
