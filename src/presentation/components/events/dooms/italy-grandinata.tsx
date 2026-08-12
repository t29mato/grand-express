/**
 * 雹(グランディナータ)が収穫を台無しにする。ぶどう畑の上に暗い雲があり、
 * 白い雹の粒が降り注ぐ。ぶどうの房と葉が雹に打たれて揺れる。
 *
 * 動くのは降ってくる雹と、打たれて震える葉・房だけ。
 */
export function ItalyGrandinata() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 暗い午後の空。 */}
      <rect width="400" height="210" fill="#5a6270" />
      <rect y="0" width="400" height="80" fill="#6f7888" />

      {/* 雨雲。 */}
      <g fill="#4a5058" opacity="0.9">
        <ellipse cx="120" cy="40" rx="90" ry="26" />
        <ellipse cx="260" cy="34" rx="100" ry="30" />
      </g>

      {/* 遠景の丘。 */}
      <path d="M0,120c60,-16 120,-16 180,-4c80,-14 160,-4 220,-10v14H0z" fill="#5f7f4a" opacity="0.85" />

      {/* 畑の地面。 */}
      <rect y="130" width="400" height="80" fill="#8ba85a" />

      {/* ぶどうの畝(3列)。房と葉が揺れる。 */}
      {[70, 200, 330].map((x, i) => (
        <g key={x} transform={`translate(${x},150)`}>
          <g className={`ita-gr-vine ita-gr-vine-${i % 2}`}>
            <line x1="-40" y1="0" x2="40" y2="0" stroke="#6b5330" strokeWidth="4" />
            <path d="M-30,0 Q-30,-20 -20,-24" fill="none" stroke="#5f7f3a" strokeWidth="3" />
            <path d="M0,0 Q0,-20 10,-24" fill="none" stroke="#5f7f3a" strokeWidth="3" />
            <path d="M28,0 Q28,-20 18,-24" fill="none" stroke="#5f7f3a" strokeWidth="3" />
            <g fill="#5f3f6f" stroke="#3f2a4a" strokeWidth="1">
              <circle cx="-24" cy="-24" r="4" />
              <circle cx="-18" cy="-20" r="4" />
              <circle cx="6" cy="-24" r="4" />
              <circle cx="12" cy="-20" r="4" />
              <circle cx="14" cy="-26" r="4" />
            </g>
            <g fill="#3f8f4f">
              <ellipse cx="-32" cy="-26" rx="7" ry="5" />
              <ellipse cx="4" cy="-27" rx="7" ry="5" />
              <ellipse cx="22" cy="-25" rx="7" ry="5" />
            </g>
          </g>
        </g>
      ))}

      {/* 降り注ぐ雹の粒。 */}
      <g fill="#f6efe2" stroke="#c8ccc4" strokeWidth="1">
        {[30, 80, 130, 180, 230, 280, 330, 370, 55, 105, 155, 205, 255, 305, 355].map((x, i) => (
          <circle
            key={x}
            className={`ita-gr-hail ita-gr-hail-${i % 3}`}
            cx={x}
            cy={-10}
            r={i % 3 === 0 ? 5 : 3.5}
          />
        ))}
      </g>

      <style>{`
        .ita-gr-hail {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: ita-gr-fall 1.1s linear infinite;
        }
        .ita-gr-hail-0 { animation-delay: 0s; }
        .ita-gr-hail-1 { animation-delay: 0.35s; }
        .ita-gr-hail-2 { animation-delay: 0.7s; }
        @keyframes ita-gr-fall {
          0% { transform: translateY(0); opacity: 1; }
          85% { transform: translateY(220px); opacity: 1; }
          100% { transform: translateY(230px); opacity: 0; }
        }
        .ita-gr-vine {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: ita-gr-shake 0.5s ease-in-out infinite;
        }
        .ita-gr-vine-0 { animation-delay: 0s; }
        .ita-gr-vine-1 { animation-delay: 0.18s; }
        @keyframes ita-gr-shake {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(2.5deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ita-gr-hail { animation: none; opacity: 0.9; }
          .ita-gr-vine { animation: none; }
        }
      `}</style>
    </svg>
  );
}
