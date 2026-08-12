/**
 * ファンタジーコフィンの葬列で道が塞がる。カカオの実の形をした棺が
 * 担ぎ手の肩の上でゆっくり上下しながら、交差点をふさいで進む。
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

      {/* 待つ車の列。 */}
      <g strokeLinejoin="round">
        <rect x="300" y="158" width="70" height="28" rx="6" fill="#5b8fe8" stroke="#20364a" strokeWidth="2" />
        <circle cx="316" cy="188" r="7" fill="#2a2a2a" />
        <circle cx="356" cy="188" r="7" fill="#2a2a2a" />
      </g>

      {/* ブラスバンドの人影。 */}
      <g fill="#4a4a52">
        <circle cx="60" cy="150" r="7" />
        <rect x="53" y="157" width="14" height="24" rx="3" />
        <path d="M67,168 q14,-4 20,4" fill="none" stroke="#f5b31c" strokeWidth="3" strokeLinecap="round" />
      </g>
      <g fill="#4a4a52">
        <circle cx="220" cy="150" r="7" />
        <rect x="213" y="157" width="14" height="24" rx="3" />
      </g>

      {/* 担がれるカカオの実の形の棺。**ここだけが動く。** */}
      <g className="gfc-coffin" strokeLinejoin="round">
        <path d="M110,140 q30,-24 60,0 q4,20 -30,26 q-34,-6 -30,-26z" fill="#a83a2a" stroke="#20364a" strokeWidth="2.4" />
        <path d="M118,140 q22,-14 44,0" fill="none" stroke="#7a2418" strokeWidth="2" />
        <rect x="90" y="176" width="16" height="24" fill="#6b5330" />
        <rect x="180" y="176" width="16" height="24" fill="#6b5330" />
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
