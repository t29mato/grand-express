/**
 * 大雨のあと斜面が崩れる。何日も降り続いた雨が斜面を染み込ませ、
 * 泥が下にあったものを押し流す。
 *
 * 人を描かず、**崩れる泥と巻き込まれる家**で被害を表す。
 * 動くのは、斜面を流れ落ち続ける泥流と落ちていく瓦礫だけ。
 */
export function BrazilDeslizamento() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 雨雲の空。 */}
      <rect width="400" height="210" fill="#5f7080" />
      <rect y="0" width="400" height="80" fill="#7a8a94" />

      {/* 斜面。 */}
      <path d="M0,60 L220,60 L400,210 L0,210z" fill="#4a5a3a" />
      <path d="M0,60 L220,60 L260,110 L0,110z" fill="#5f7a4a" />

      {/* 斜面の上に建つ家(傾いている)。 */}
      <g strokeLinejoin="round" transform="translate(110,58) rotate(8)">
        <rect x="0" y="0" width="46" height="34" fill="#e8dcc0" stroke="#20364a" strokeWidth="2" />
        <path d="M-4,0 L23,-16 L50,0z" fill="#8a4a3a" stroke="#20364a" strokeWidth="2" />
        <rect x="10" y="14" width="10" height="14" fill="#3a5a64" />
      </g>

      {/* 崩れ落ちる泥流。 */}
      <g className="bra-mud1">
        <ellipse cx="260" cy="130" rx="46" ry="16" fill="#5a3a24" />
      </g>
      <g className="bra-mud2">
        <ellipse cx="300" cy="160" rx="60" ry="20" fill="#6b4a2f" />
      </g>
      <g className="bra-mud3">
        <ellipse cx="330" cy="192" rx="80" ry="22" fill="#7a5a3a" />
      </g>

      {/* 流されていく瓦礫。 */}
      <g className="bra-debris1" strokeLinejoin="round">
        <rect x="0" y="0" width="18" height="12" fill="#9a9488" stroke="#20364a" strokeWidth="1.6" />
      </g>
      <g className="bra-debris2" strokeLinejoin="round">
        <rect x="0" y="0" width="14" height="10" fill="#8a5a3a" stroke="#20364a" strokeWidth="1.6" />
      </g>

      {/* 手前の地面(下流)。 */}
      <rect y="196" width="400" height="14" fill="#4a3a24" />

      <style>{`
        .bra-mud1, .bra-mud2, .bra-mud3 {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: bra-mud-flow 2.2s ease-in infinite;
        }
        .bra-mud2 { animation-delay: 0.5s; }
        .bra-mud3 { animation-delay: 1s; }
        @keyframes bra-mud-flow {
          0% { transform: scale(0.4); opacity: 0; }
          30% { opacity: 0.95; }
          100% { transform: scale(1.15); opacity: 0; }
        }
        .bra-debris1 {
          transform-box: fill-box;
          animation: bra-debris-slide-a 2.4s linear infinite;
        }
        .bra-debris2 {
          transform-box: fill-box;
          animation: bra-debris-slide-b 2.4s linear infinite;
          animation-delay: 1.1s;
        }
        @keyframes bra-debris-slide-a {
          0% { transform: translate(150px,70px) rotate(0deg); opacity: 0; }
          15% { opacity: 1; }
          100% { transform: translate(300px,180px) rotate(240deg); opacity: 0; }
        }
        @keyframes bra-debris-slide-b {
          0% { transform: translate(170px,80px) rotate(0deg); opacity: 0; }
          15% { opacity: 1; }
          100% { transform: translate(330px,190px) rotate(-200deg); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bra-mud1, .bra-mud2, .bra-mud3, .bra-debris1, .bra-debris2 { animation: none; }
          .bra-mud1, .bra-mud2, .bra-mud3 { opacity: 0.9; transform: none; }
        }
      `}</style>
    </svg>
  );
}
