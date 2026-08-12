/**
 * 政府機関の閉鎖で国立公園のビジターセンターが休館になる。木造の建物の前に
 * 遮断棒(バリケードアーム)が下り、南京錠つきの鎖が揺れる。
 *
 * 動くのは、遮断棒の上げ下げと鎖の揺れだけ。建物は壊さない。
 */
export function UsaGovernmentshutdown() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 山あいの曇り空。 */}
      <rect width="400" height="210" fill="#8fc4e8" />
      <rect y="0" width="400" height="90" fill="#cfe4f0" />
      <path d="M0,110c50,-30 110,-30 160,-8c70,-26 150,-10 240,-18v20H0z" fill="#7f8896" opacity="0.6" />

      {/* 地面。 */}
      <rect y="150" width="400" height="60" fill="#5f7f4a" />

      {/* ビジターセンターの建物(丸太小屋ふう)。 */}
      <g strokeLinejoin="round">
        <rect x="230" y="110" width="130" height="60" fill="#c9a877" stroke="#5a4630" strokeWidth="2" />
        <path d="M222,110l73,-30l73,30z" fill="#5a4630" />
        <rect x="270" y="130" width="30" height="40" fill="#3f5f7f" opacity="0.7" />
        <rect x="316" y="130" width="24" height="24" fill="#3f5f7f" opacity="0.7" />
      </g>

      {/* 遮断棒の支柱(固定)。 */}
      <rect x="96" y="120" width="8" height="60" fill="#e8dcc0" stroke="#20364a" strokeWidth="1.6" />

      {/* 遮断棒(赤白の縞、上下する)。 */}
      <g className="usa-gs-arm">
        <rect x="100" y="130" width="120" height="8" rx="3" fill="#f6efe2" stroke="#20364a" strokeWidth="1.6" />
        <g fill="#e8443f">
          <rect x="106" y="130" width="14" height="8" />
          <rect x="134" y="130" width="14" height="8" />
          <rect x="162" y="130" width="14" height="8" />
          <rect x="190" y="130" width="14" height="8" />
        </g>
      </g>

      {/* 揺れる南京錠つきの鎖。 */}
      <g className="usa-gs-lock">
        <line x1="60" y1="150" x2="60" y2="168" stroke="#8a92a0" strokeWidth="2" />
        <rect x="53" y="168" width="14" height="12" rx="2" fill="#f5b31c" stroke="#5a4630" strokeWidth="1.4" />
        <path d="M56,168v-6a4,4 0 0 1 8,0v6" fill="none" stroke="#8a92a0" strokeWidth="2" />
      </g>

      <style>{`
        .usa-gs-arm {
          transform-box: fill-box;
          transform-origin: 4% 50%;
          animation: usa-gs-lower 3.4s ease-in-out infinite;
        }
        @keyframes usa-gs-lower {
          0% { transform: rotate(-55deg); }
          35% { transform: rotate(0deg); }
          80% { transform: rotate(0deg); }
          100% { transform: rotate(-55deg); }
        }
        .usa-gs-lock {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: usa-gs-swing 2.6s ease-in-out infinite;
        }
        @keyframes usa-gs-swing {
          0%, 100% { transform: rotate(-4deg); }
          50% { transform: rotate(4deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .usa-gs-arm { animation: none; transform: rotate(0deg); }
          .usa-gs-lock { animation: none; }
        }
      `}</style>
    </svg>
  );
}
