/**
 * 市場ですりに遭う。混み合う露店のあいだから伸びた手が財布を抜き取り、
 * 気づかれず人混みへ消える様子で伝える。暴力や争いは描かない。
 *
 * 動くのは、伸びて戻る手と、逃げていく財布だけ。
 */
export function NorthamericaPickpocketMercado() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 昼の空。 */}
      <rect width="400" height="210" fill="#8fc4e8" />
      <rect y="70" width="400" height="6" fill="#cfe4f0" />

      {/* 市場の屋根と地面。 */}
      <rect y="76" width="400" height="134" fill="#c9a877" />
      <g fill="#e05252" opacity="0.9">
        <path d="M0,76 L40,50 L80,76z" />
        <path d="M80,76 L120,50 L160,76z" />
        <path d="M160,76 L200,50 L240,76z" />
        <path d="M240,76 L280,50 L320,76z" />
        <path d="M320,76 L360,50 L400,76z" />
      </g>

      {/* 露店の台と商品(繰り返しで混み合う印象)。 */}
      <g strokeLinejoin="round">
        <rect x="10" y="130" width="80" height="14" fill="#8a5a3a" stroke="#20364a" strokeWidth="2" />
        <rect x="140" y="130" width="80" height="14" fill="#8a5a3a" stroke="#20364a" strokeWidth="2" />
        <rect x="300" y="130" width="80" height="14" fill="#8a5a3a" stroke="#20364a" strokeWidth="2" />
      </g>
      <g fill="#f5b31c">
        <circle cx="24" cy="122" r="7" />
        <circle cx="42" cy="120" r="7" />
        <circle cx="60" cy="122" r="7" />
        <circle cx="154" cy="122" r="7" />
        <circle cx="172" cy="120" r="7" />
        <circle cx="314" cy="122" r="7" />
        <circle cx="332" cy="120" r="7" />
      </g>

      {/* 人混み(簡略な頭と肩、色を変えて重ねる)。 */}
      <g strokeLinejoin="round">
        <g>
          <circle cx="120" cy="160" r="10" fill="#d9a273" stroke="#20364a" strokeWidth="2" />
          <path d="M104,178 a16,14 0 0 1 32,0z" fill="#5b8fe8" stroke="#20364a" strokeWidth="2" />
        </g>
        <g>
          <circle cx="250" cy="164" r="10" fill="#c98a5e" stroke="#20364a" strokeWidth="2" />
          <path d="M234,182 a16,14 0 0 1 32,0z" fill="#2f7a44" stroke="#20364a" strokeWidth="2" />
        </g>
        <g>
          <circle cx="200" cy="150" r="10" fill="#d9a273" stroke="#20364a" strokeWidth="2" />
          <path d="M184,168 a16,14 0 0 1 32,0z" fill="#f5b31c" stroke="#20364a" strokeWidth="2" />
          {/* かばんの持ち手。財布はここから抜かれる。 */}
          <rect x="190" y="168" width="20" height="16" rx="2" fill="#8a5a3a" stroke="#20364a" strokeWidth="1.6" />
        </g>
      </g>

      {/* すりの頭(人混みに紛れる位置)。 */}
      <circle cx="300" cy="158" r="10" fill="#c98a5e" stroke="#20364a" strokeWidth="2" />

      {/* すりの手。**静止したときも、かばんに伸びた腕としてそのまま見える**
          位置に描き、アニメーションはそこからの小さな出し入れだけにする。 */}
      <g className="pick-arm" strokeLinecap="round">
        <line x1="284" y1="176" x2="205" y2="174" stroke="#c98a5e" strokeWidth="7" />
      </g>

      {/* 抜き取られかけの財布。**静止画でもかばんから半分出ているのが分かる**
          位置を既定にし、アニメーションでそこから逃げていく。 */}
      <g className="pick-wallet">
        <rect x="196" y="168" width="16" height="12" rx="2" fill="#4a3624" stroke="#20364a" strokeWidth="1.6" />
      </g>

      <style>{`
        .pick-arm {
          transform-box: fill-box;
          transform-origin: 100% 50%;
          animation: pick-reach 1.4s ease-in-out infinite;
        }
        @keyframes pick-reach {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-14px); }
        }
        .pick-wallet {
          transform-box: fill-box;
          transform-origin: 0 0;
          animation: pick-flee 1.4s ease-in infinite;
        }
        @keyframes pick-flee {
          0%, 40% { transform: translate(0, 0); opacity: 1; }
          100% { transform: translate(120px, 24px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pick-arm, .pick-wallet { animation: none; }
        }
      `}</style>
    </svg>
  );
}
