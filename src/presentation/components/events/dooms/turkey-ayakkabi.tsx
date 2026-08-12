/**
 * 靴磨きのブラシが目の前に落ちる。拾って返すと、頼んでもいない靴磨きの
 * 契約が成立してしまい、法外な値段を吹っかけられる。
 *
 * 人を傷つける絵ではなく、**滑っていくブラシと、驚いて伸びる手**で
 * 「うっかり乗ってしまった」様子を表す。動くのは、滑るブラシ1つだけ。
 */
export function TurkeyAyakkabi() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 街の空。 */}
      <rect width="400" height="210" fill="#8fc4e8" />
      <rect y="0" width="400" height="90" fill="#cfe4f0" />

      {/* 石畳の広場。 */}
      <rect y="120" width="400" height="90" fill="#c9bda0" />
      <g stroke="#b3a888" strokeWidth="1.4" opacity="0.6">
        <path d="M0,140h400M0,160h400M0,180h400" />
      </g>

      {/* 靴磨きの木箱(手前左)。 */}
      <g strokeLinejoin="round">
        <rect x="40" y="150" width="46" height="26" rx="2" fill="#6b5330" stroke="#3a2e1c" strokeWidth="2" />
        <rect x="52" y="140" width="10" height="12" fill="#5a4630" stroke="#3a2e1c" strokeWidth="1.6" />
        <rect x="46" y="156" width="10" height="4" fill="#c9a227" />
        <rect x="70" y="156" width="10" height="4" fill="#e8443f" />
      </g>

      {/* 靴磨き職人(座って待つ)。 */}
      <g strokeLinejoin="round">
        <rect x="95" y="150" width="18" height="26" rx="3" fill="#5b8fe8" stroke="#20364a" strokeWidth="2" />
        <circle cx="104" cy="140" r="9" fill="#d9a273" stroke="#20364a" strokeWidth="2" />
        <path d="M97,133a9,5 0 0 1 14,0z" fill="#3a2e1c" />
      </g>

      {/* 立ち止まって驚く旅行者。 */}
      <g strokeLinejoin="round" strokeLinecap="round">
        <rect x="230" y="146" width="20" height="30" rx="3" fill="#f6efe2" stroke="#20364a" strokeWidth="2" />
        <circle cx="240" cy="136" r="9.4" fill="#d9a273" stroke="#20364a" strokeWidth="2" />
        {/* 驚いて伸びる腕。 */}
        <path d="M232,158 Q210,158 198,168" stroke="#d9a273" strokeWidth="8" fill="none" />
        <path d="M248,158 L262,172" stroke="#d9a273" strokeWidth="8" fill="none" />
        <rect x="228" y="174" width="9" height="20" fill="#3d3a42" />
        <rect x="243" y="174" width="9" height="20" fill="#2f2c34" />
      </g>

      {/* 手押し車の露店(背景)。 */}
      <g opacity="0.85">
        <rect x="300" y="150" width="60" height="24" rx="2" fill="#e8dcc0" stroke="#8a6a3a" strokeWidth="2" />
        <path d="M296,150h68l-8,-10h-52z" fill="#c9a877" />
      </g>

      {/* 滑っていくブラシ。**ここだけが動く。** */}
      <g className="ayk-brush">
        <rect x="-10" y="-3" width="20" height="6" rx="2" fill="#6b5330" stroke="#3a2e1c" strokeWidth="1.4" />
        <rect x="-8" y="2" width="16" height="3" fill="#3a2e1c" />
      </g>

      <style>{`
        .ayk-brush {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: ayk-slide 2.8s ease-out infinite;
        }
        @keyframes ayk-slide {
          0%   { transform: translate(120px, 176px) rotate(0deg); opacity: 1; }
          60%  { transform: translate(196px, 172px) rotate(160deg); opacity: 1; }
          100% { transform: translate(196px, 172px) rotate(160deg); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ayk-brush {
            animation: none;
            transform: translate(196px, 172px) rotate(160deg);
            transform-box: fill-box;
          }
        }
      `}</style>
    </svg>
  );
}
