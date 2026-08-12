/**
 * 竜巻警報で全員が地下へ避難する。緑がかった空の下、漏斗雲が回転しながら
 * 地面に伸び、家の周りの木々が大きく揺れる。
 *
 * 動くのは、漏斗雲の回転と伸縮、木の揺れだけ。家そのものは壊れない
 * (子どもも遊ぶので、破壊そのものではなく「慌てて避難する」空気で見せる)。
 */
export function UsaTornado() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 竜巻特有の緑がかった曇り空。 */}
      <rect width="400" height="210" fill="#6a7f6a" />
      <rect y="0" width="400" height="100" fill="#8a9a7a" />
      <ellipse cx="90" cy="40" rx="60" ry="16" fill="#5a6f5a" opacity="0.8" />
      <ellipse cx="300" cy="30" rx="50" ry="14" fill="#5a6f5a" opacity="0.7" />

      {/* 地面。 */}
      <rect y="180" width="400" height="30" fill="#3a2f22" />
      <path d="M0,180c40,-10 80,-10 120,-2c60,-14 140,-2 180,-8c50,-8 70,4 100,0v10H0z" fill="#5f7f4a" />

      {/* 小さな家(避難先。壊さない)。 */}
      <g strokeLinejoin="round">
        <rect x="30" y="146" width="60" height="34" fill="#e8dcc0" stroke="#20364a" strokeWidth="2" />
        <path d="M24,146l36,-26l36,26z" fill="#a5432c" stroke="#20364a" strokeWidth="2" />
        <rect x="52" y="158" width="14" height="22" fill="#3f5f7f" />
      </g>

      {/* 揺れる木。 */}
      <g className="usa-tn-tree1">
        <rect x="330" y="150" width="4" height="26" fill="#5a4630" />
        <circle cx="332" cy="146" r="14" fill="#4f8f4f" />
      </g>
      <g className="usa-tn-tree2">
        <rect x="360" y="156" width="4" height="20" fill="#5a4630" />
        <circle cx="362" cy="152" r="11" fill="#4f8f4f" />
      </g>

      {/* 漏斗雲(回転・伸縮する)。 */}
      <g className="usa-tn-funnel">
        <path d="M180,40 C160,90 190,120 200,180 C210,120 240,90 220,40 Z" fill="#4a4a52" opacity="0.9" />
        <path d="M180,40 C160,90 190,120 200,180 C210,120 240,90 220,40 Z" fill="none" stroke="#2f2f36" strokeWidth="2" opacity="0.6" />
      </g>
      {/* 巻き上げられる瓦礫の点。 */}
      <g className="usa-tn-debris" fill="#8a8478">
        <circle cx="195" cy="150" r="3" />
        <circle cx="210" cy="130" r="2.4" />
        <circle cx="200" cy="100" r="2" />
        <circle cx="215" cy="75" r="2.6" />
      </g>

      <style>{`
        .usa-tn-funnel {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: usa-tn-sway 2.4s ease-in-out infinite, usa-tn-rock 0.5s linear infinite;
        }
        @keyframes usa-tn-sway {
          0%, 100% { transform: translateX(-6px) scaleY(1); }
          50% { transform: translateX(6px) scaleY(1.04); }
        }
        @keyframes usa-tn-rock {
          0% { filter: none; }
          50% { filter: brightness(1.08); }
          100% { filter: none; }
        }
        .usa-tn-debris {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: usa-tn-spin 1.2s linear infinite;
        }
        @keyframes usa-tn-spin {
          from { transform: rotate(0deg) translateY(0); }
          to { transform: rotate(360deg) translateY(-4px); }
        }
        .usa-tn-tree1, .usa-tn-tree2 {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: usa-tn-shake 0.35s ease-in-out infinite;
        }
        .usa-tn-tree2 {
          animation-delay: 0.15s;
        }
        @keyframes usa-tn-shake {
          0%, 100% { transform: rotate(-6deg); }
          50% { transform: rotate(6deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .usa-tn-funnel, .usa-tn-debris, .usa-tn-tree1, .usa-tn-tree2 { animation: none; }
        }
      `}</style>
    </svg>
  );
}
