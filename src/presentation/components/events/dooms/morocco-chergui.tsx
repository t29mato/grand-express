/**
 * サハラから吹くシェルギ(熱風)が果樹園を襲う。木が大きく揺れ、
 * 花と実がむしり取られて右へ吹き飛ばされる。土埃の筋が画面を横切る。
 *
 * 動くのは木の揺れ、飛ばされる葉と実、土埃の筋だけ。
 */
export function MoroccoChergui() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 熱を帯びた空。 */}
      <rect width="400" height="210" fill="#e8bfa0" />
      <rect y="0" width="400" height="90" fill="#f2ddc0" />
      <path d="M0,110c60,-16 120,-16 180,-4c80,-14 160,-4 220,-10v14H0z" fill="#c9a877" opacity="0.6" />

      {/* 地面。 */}
      <rect y="130" width="400" height="80" fill="#c9a877" />

      {/* 果樹(揺れる)。 */}
      <g className="mo-chg-tree" transform="translate(90,168)">
        <rect x="-3" y="-6" width="6" height="6" fill="#5a4630" />
        <circle cx="0" cy="-30" r="26" fill="#5a9a4a" />
        <g fill="#e8443f">
          <circle cx="-10" cy="-34" r="2.6" />
          <circle cx="8" cy="-40" r="2.6" />
          <circle cx="4" cy="-20" r="2.6" />
          <circle cx="-14" cy="-22" r="2.6" />
        </g>
      </g>
      <g className="mo-chg-tree mo-chg-tree2" transform="translate(150,172)">
        <rect x="-2.4" y="-5" width="5" height="5" fill="#5a4630" />
        <circle cx="0" cy="-24" r="20" fill="#6aaa5a" />
      </g>

      {/* 飛ばされる葉と実。 */}
      <g className="mo-chg-debris">
        <circle cx="120" cy="150" r="3" fill="#e8443f" />
        <circle cx="150" cy="130" r="2.4" fill="#5a9a4a" />
        <circle cx="180" cy="160" r="2.8" fill="#e8443f" />
        <ellipse cx="210" cy="140" rx="4" ry="2" fill="#7fae5a" />
      </g>
      <g className="mo-chg-debris mo-chg-debris2">
        <circle cx="90" cy="170" r="2.6" fill="#5a9a4a" />
        <circle cx="130" cy="180" r="2.4" fill="#e8443f" />
        <ellipse cx="170" cy="176" rx="4" ry="2" fill="#7fae5a" />
      </g>

      {/* 土埃の筋。 */}
      <g className="mo-chg-dust" stroke="#c9922f" strokeWidth="3" opacity="0.6" fill="none">
        <path d="M0,190q40,-8 80,0t80,0" />
        <path d="M0,204q40,-6 80,0t80,0" />
      </g>
      <g className="mo-chg-dust mo-chg-dust2" stroke="#c9922f" strokeWidth="2.4" opacity="0.5" fill="none">
        <path d="M0,120q40,-6 80,0t80,0" />
      </g>

      <style>{`
        .mo-chg-tree {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: mo-chg-sway 1.4s ease-in-out infinite;
        }
        .mo-chg-tree2 {
          animation-duration: 1.1s;
          animation-delay: 0.2s;
        }
        @keyframes mo-chg-sway {
          0%, 100% { transform: rotate(-10deg); }
          50% { transform: rotate(9deg); }
        }
        .mo-chg-debris {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: mo-chg-blow 2.2s linear infinite;
        }
        .mo-chg-debris2 {
          animation-duration: 2.6s;
          animation-delay: 0.6s;
        }
        @keyframes mo-chg-blow {
          0% { transform: translate(-40px, 0px); opacity: 0; }
          15% { opacity: 1; }
          100% { transform: translate(240px, -20px); opacity: 0; }
        }
        .mo-chg-dust {
          animation: mo-chg-stream 1.8s linear infinite;
        }
        .mo-chg-dust2 {
          animation-duration: 2.4s;
        }
        @keyframes mo-chg-stream {
          0% { transform: translateX(-60px); opacity: 0; }
          20% { opacity: 0.6; }
          100% { transform: translateX(60px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .mo-chg-tree { animation: none; transform: rotate(6deg); }
          .mo-chg-debris { animation: none; opacity: 0.9; transform: translate(140px,-10px); }
          .mo-chg-dust { animation: none; opacity: 0.5; }
        }
      `}</style>
    </svg>
  );
}
