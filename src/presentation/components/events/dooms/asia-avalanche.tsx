/**
 * 雪崩が峠を閉ざす。夜のうちに崩れた雪の塊が線路を瓦礫の原の下に埋めた。
 *
 * 人を描かず、**山肌に残る崩落の跡と埋まった線路**で規模を表す。
 * 動くのは、斜面を落ち続ける雪煙の帯だけ。
 */
export function AsiaAvalanche() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 曇った冬空。 */}
      <rect width="400" height="210" fill="#a9c6de" />
      <rect y="0" width="400" height="70" fill="#c7dce8" />

      {/* 山の稜線。 */}
      <path d="M0,120 L90,20 L160,90 L230,10 L320,80 L400,40 L400,210 L0,210z" fill="#e0eef4" />
      <path d="M0,120 L90,20 L160,90 L230,10 L320,80 L400,40" fill="none" stroke="#8b8f98" strokeWidth="3" />

      {/* 崩落の跡(むき出しの岩肌)。 */}
      <path d="M150,60 L200,30 L220,70 L190,100 L160,90z" fill="#7a8790" opacity="0.85" />

      {/* 谷底の地面。 */}
      <rect y="150" width="400" height="60" fill="#e0eef4" />

      {/* 埋まった線路。手前だけがのぞく。 */}
      <g strokeLinecap="round">
        <rect x="40" y="182" width="90" height="4" fill="#5a4a3a" />
        {Array.from({ length: 5 }).map((_, i) => (
          <rect key={i} x={44 + i * 18} y="180" width="8" height="8" fill="#3a2f26" />
        ))}
        <rect x="310" y="182" width="70" height="4" fill="#5a4a3a" />
        {Array.from({ length: 4 }).map((_, i) => (
          <rect key={`r-${i}`} x={314 + i * 18} y="180" width="8" height="8" fill="#3a2f26" />
        ))}
      </g>

      {/* 瓦礫の雪の山(線路の中央を埋める)。 */}
      <path d="M120,160 q80,-40 160,0 q10,30 -10,40 l-140,0 q-20,-10 -10,-40z" fill="#f2f6f8" stroke="#bcd6e2" strokeWidth="2" />
      <circle cx="180" cy="175" r="10" fill="#bcd6e2" opacity="0.7" />
      <circle cx="230" cy="180" r="14" fill="#bcd6e2" opacity="0.6" />

      {/* 崩落を示す標識。 */}
      <g strokeLinejoin="round">
        <rect x="360" y="150" width="4" height="30" fill="#3a2f26" />
        <path d="M352,134 L372,134 L372,150 L352,150z" fill="#e8443f" stroke="#3a2f26" strokeWidth="2" />
      </g>

      {/* 落ち続ける雪煙。**ここだけが動く。** */}
      <g className="asia-snow-fall" fill="#f2f6f8" opacity="0.75">
        <ellipse cx="200" cy="60" rx="18" ry="10" />
        <ellipse cx="180" cy="80" rx="24" ry="12" />
        <ellipse cx="220" cy="100" rx="30" ry="14" />
      </g>

      <style>{`
        .asia-snow-fall {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: asia-snow-fall-move 1.6s ease-in infinite;
        }
        @keyframes asia-snow-fall-move {
          0% { transform: translateY(-30px) scale(0.6); opacity: 0.3; }
          60% { opacity: 0.8; }
          100% { transform: translateY(60px) scale(1.3); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .asia-snow-fall { animation: none; }
        }
      `}</style>
    </svg>
  );
}
