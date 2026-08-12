/**
 * 漁師の葬列に道を譲る。生涯乗ってきた船をかたどった魚形の棺が、
 * 担ぎ手の肩の上でゆっくり上下しながら、交差点をふさいで進んでいく。
 *
 * 動くのは、担がれて上下に揺れる棺1つだけ。
 */
export function GhanaFantasycoffin() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 昼の空。 */}
      <rect width="400" height="210" fill="#8fc4e8" />
      <rect y="90" width="400" height="30" fill="#cfe4f0" />

      {/* 道路。 */}
      <rect y="150" width="400" height="60" fill="#7a746a" />
      <g fill="#e8dcc0">
        <rect x="20" y="176" width="26" height="6" />
        <rect x="70" y="176" width="26" height="6" />
      </g>

      {/* 道を譲って待つ車。 */}
      <g strokeLinejoin="round">
        <rect x="300" y="158" width="70" height="28" rx="6" fill="#5b8fe8" stroke="#20364a" strokeWidth="2" />
        <circle cx="316" cy="188" r="7" fill="#2a2a2a" />
        <circle cx="356" cy="188" r="7" fill="#2a2a2a" />
      </g>

      {/* ブラスバンドの人影。 */}
      <g fill="#4a4a52">
        <circle cx="50" cy="150" r="7" />
        <rect x="43" y="157" width="14" height="24" rx="3" />
        <path d="M57,168 q14,-4 20,4" fill="none" stroke="#f5b31c" strokeWidth="3" strokeLinecap="round" />
      </g>
      <g fill="#4a4a52">
        <circle cx="245" cy="152" r="7" />
        <rect x="238" y="159" width="14" height="24" rx="3" />
      </g>

      {/* 棺を担ぐ4人の担ぎ手。棺と一緒に上下する。 */}
      <g className="gfc-coffin">
        <g fill="#f6efe2">
          <circle cx="105" cy="176" r="6" />
          <circle cx="150" cy="176" r="6" />
          <circle cx="185" cy="176" r="6" />
          <circle cx="220" cy="176" r="6" />
        </g>
        <g fill="#2f6b3a">
          <rect x="99" y="182" width="12" height="22" rx="2" />
          <rect x="144" y="182" width="12" height="22" rx="2" />
          <rect x="179" y="182" width="12" height="22" rx="2" />
          <rect x="214" y="182" width="12" height="22" rx="2" />
        </g>

        {/* 生涯乗ってきた船をかたどった魚形の棺。 */}
        <g strokeLinejoin="round">
          <path d="M95,150 q35,-22 95,0 q10,10 -10,20 h-75 q-20,-10 -10,-20z" fill="#8fa8b8" stroke="#20364a" strokeWidth="2.4" />
          <path d="M190,150 l16,-10 l0,20 l-16,-10z" fill="#8fa8b8" stroke="#20364a" strokeWidth="2" />
          <path d="M150,146 l0,-10 l-14,10z" fill="#5b8fe8" stroke="#20364a" strokeWidth="1.6" />
          <path d="M100,152 q45,-8 90,0" fill="none" stroke="#5b7f92" strokeWidth="2" />
          <circle cx="112" cy="154" r="2.6" fill="#20364a" />
        </g>
      </g>

      <style>{`
        .gfc-coffin {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: gfc-bob 1s ease-in-out infinite;
        }
        @keyframes gfc-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .gfc-coffin { animation: none; }
        }
      `}</style>
    </svg>
  );
}
