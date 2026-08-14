/**
 * 砂嵐が砂漠の線路を埋める。銅色に染まった空の下、線路の半分がすでに
 * 砂の吹きだまりに沈んでいる。
 *
 * 人を描かず、**埋もれかけた線路とシャベル**で「これから片付ける仕事」を表す。
 * 動くのは、右から左へ流れる砂の帯だけ。
 */
export function AsiaSandstorm() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 銅色の空。 */}
      <rect width="400" height="210" fill="#c9884a" />
      <rect y="0" width="400" height="90" fill="#d9a35f" />
      <circle cx="70" cy="50" r="24" fill="#e8c07a" opacity="0.7" />

      {/* 遠景の給水塔と駅舎(かすんで見える)。 */}
      <g fill="#b3703a" opacity="0.75">
        <rect x="300" y="80" width="8" height="40" />
        <rect x="288" y="66" width="32" height="20" />
        <rect x="330" y="96" width="50" height="30" />
      </g>

      {/* 砂丘の地面。 */}
      <rect y="126" width="400" height="84" fill="#b3703a" />
      <path d="M0,126 q60,-14 120,0 t120,0 t160,0 v6 H0z" fill="#c9884a" />

      {/* 半分埋もれた線路。 */}
      <g strokeLinecap="round">
        <rect x="40" y="160" width="220" height="4" fill="#5a4a3a" />
        {Array.from({ length: 12 }).map((_, i) => (
          <rect key={i} x={44 + i * 18} y="158" width="8" height="8" fill="#3a2f26" />
        ))}
        {/* 右半分は砂に沈む。 */}
        <path d="M220,150 q40,-4 60,10 v20 q-30,10 -60,4z" fill="#c9884a" opacity="0.92" />
      </g>

      {/* 立てかけたシャベル。 */}
      <g strokeLinejoin="round">
        <path d="M300,200 L330,150" stroke="#8b6a1a" strokeWidth="5" fill="none" />
        <path d="M322,150 L338,150 L332,166 L316,166z" fill="#8b8f98" stroke="#3a2f26" strokeWidth="2" />
      </g>

      {/* 警告標識。 */}
      <g strokeLinejoin="round">
        <rect x="60" y="140" width="4" height="26" fill="#3a2f26" />
        <path d="M52,124 L72,124 L72,140 L52,140z" fill="#e8b020" stroke="#3a2f26" strokeWidth="2" />
      </g>

      {/* 流れる砂の帯。**ここだけが動く。** */}
      <g className="asia-sand-drift" fill="#e8c07a" opacity="0.5">
        <ellipse cx="340" cy="70" rx="80" ry="14" />
        <ellipse cx="180" cy="100" rx="100" ry="16" />
        <ellipse cx="60" cy="86" rx="70" ry="12" />
      </g>

      <style>{`
        .asia-sand-drift {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: asia-sand-drift-move 3.2s linear infinite;
        }
        @keyframes asia-sand-drift-move {
          0% { transform: translateX(40px); opacity: 0.3; }
          50% { opacity: 0.6; }
          100% { transform: translateX(-40px); opacity: 0.3; }
        }
        @media (prefers-reduced-motion: reduce) {
          .asia-sand-drift { animation: none; }
        }
      `}</style>
    </svg>
  );
}
