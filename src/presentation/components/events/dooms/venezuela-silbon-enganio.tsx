/**
 * エル・シルボンの口笛に惑わされる。かすかな口笛は近い証拠なのに遠いと
 * 思わせ、一時間歩いても同じ野原を回っているだけだった。
 *
 * 動くのは、地平線から広がって消える口笛の波紋と、堂々巡りに歩く
 * 旅人の足取りだけ。
 */
export function VenezuelaSilbonEnganio() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜のラノス。 */}
      <rect width="400" height="210" fill="#182238" />
      <rect y="0" width="400" height="70" fill="#22304f" />
      <circle cx="330" cy="40" r="20" fill="#e8dcc0" opacity="0.9" />

      {/* 平原の地平線。 */}
      <path d="M0,140 Q100,132 200,138 T400,134 V210 H0 z" fill="#232f22" />

      {/* 一本の木。 */}
      <g strokeLinejoin="round">
        <rect x="330" y="120" width="4" height="24" fill="#1a2416" />
        <path d="M332,120 q-18,-4 -26,-16 M332,120 q18,-6 24,-18 M332,120 q-4,-14 6,-22" stroke="#1a2416" strokeWidth="2.4" fill="none" />
      </g>

      {/* 遠くの、袋を背負ったシルエット(彼自身は動かない)。 */}
      <g fill="#0d1526" opacity="0.85">
        <circle cx="90" cy="118" r="7" />
        <path d="M84,124 q-4,10 0,20 h14 q4,-10 0,-20 z" />
        <ellipse cx="76" cy="132" rx="7" ry="9" />
      </g>

      {/* 口笛の波紋。**動く要素その1。** */}
      <g stroke="#f6efe2" fill="none" strokeWidth="1.6" opacity="0.7">
        <circle className="vse-wave vse-wave-1" cx="90" cy="120" r="10" />
        <circle className="vse-wave vse-wave-2" cx="90" cy="120" r="10" />
        <circle className="vse-wave vse-wave-3" cx="90" cy="120" r="10" />
      </g>

      {/* 迷う旅人。**動く要素その2(左右にさまよう)。** */}
      <g className="vse-walker">
        <circle cx="220" cy="168" r="7" fill="#f6efe2" />
        <rect x="215" y="175" width="10" height="18" rx="3" fill="#5b8fe8" />
        <g stroke="#20364a" strokeWidth="2">
          <line x1="217" y1="193" x2="214" y2="204" />
          <line x1="223" y1="193" x2="227" y2="204" />
        </g>
      </g>

      <style>{`
        .vse-wave {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: vse-ripple 2.4s ease-out infinite;
        }
        .vse-wave-2 { animation-delay: 0.8s; }
        .vse-wave-3 { animation-delay: 1.6s; }
        @keyframes vse-ripple {
          0% { transform: scale(0.3); opacity: 0.8; }
          100% { transform: scale(3.4); opacity: 0; }
        }
        .vse-walker {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: vse-wander 3.2s ease-in-out infinite;
        }
        @keyframes vse-wander {
          0% { transform: translateX(0); }
          25% { transform: translateX(40px); }
          50% { transform: translateX(10px); }
          75% { transform: translateX(-30px); }
          100% { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .vse-wave { animation: none; opacity: 0; }
          .vse-walker { animation: none; }
        }
      `}</style>
    </svg>
  );
}
