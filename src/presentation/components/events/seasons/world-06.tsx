/**
 * 10月。片や紅葉、片やジャカランダ。
 *
 * 左は北の森が色を変え、橙の葉が落ちる。右は南の街路が紫になり、
 * 同じように花が落ちて舗道に敷きつまる。落ちるものの色だけが違う。
 */
export function World06() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 左=北の秋 / 右=南の春 */}
      <rect width="200" height="210" fill="#bcd4e2" />
      <rect x="200" width="200" height="210" fill="#8fc4e8" />

      {/* 北の丘と森 */}
      <path d="M0,110 L46,86 L96,110 L146,84 L200,110 L200,126 L0,126z" fill="#8f9a86" />
      <rect y="122" width="200" height="88" fill="#7a7f56" />
      <rect y="122" width="200" height="8" fill="#6b7048" />

      {/* 紅葉した木立 */}
      <g>
        <rect x="34" y="106" width="8" height="34" fill="#5a3a22" />
        <circle className="w06-crown" cx="38" cy="92" r="25" fill="#d8622c" />
        <circle className="w06-crown w06-c2" cx="20" cy="102" r="15" fill="#c94a28" />
      </g>
      <g>
        <rect x="104" y="112" width="7" height="28" fill="#5a3a22" />
        <circle className="w06-crown w06-c3" cx="107" cy="98" r="21" fill="#e8a03c" />
      </g>
      <g>
        <rect x="164" y="108" width="8" height="32" fill="#5a3a22" />
        <circle className="w06-crown w06-c4" cx="168" cy="94" r="23" fill="#c94a28" />
        <circle className="w06-crown w06-c5" cx="186" cy="104" r="14" fill="#d8622c" />
      </g>

      {/* 敷きつまった落ち葉 */}
      <g fill="#c9702c" opacity="0.75">
        <ellipse cx="42" cy="150" rx="44" ry="7" />
        <ellipse cx="112" cy="154" rx="38" ry="6" />
        <ellipse cx="170" cy="150" rx="40" ry="7" />
        <ellipse cx="86" cy="196" rx="70" ry="9" />
      </g>

      {/* 見に来た人を運ぶ乗合バス */}
      <g className="w06-coach">
        <rect x="16" y="140" width="88" height="30" rx="6" fill="#5b8fe8" />
        <g fill="#cfe4f0">
          <rect x="24" y="146" width="18" height="11" />
          <rect x="46" y="146" width="18" height="11" />
          <rect x="68" y="146" width="18" height="11" />
        </g>
        <g fill="#2a2f38">
          <circle cx="34" cy="172" r="6" />
          <circle cx="88" cy="172" r="6" />
        </g>
      </g>

      {/* 落ちる紅葉 */}
      <g fill="#e07a2c">
        <path className="w06-leaf" d="M64,44 q9,5 0,13 q-9,-8 0,-13z" />
        <path className="w06-leaf w06-l2" d="M128,28 q8,5 0,12 q-8,-7 0,-12z" fill="#c94a28" />
        <path className="w06-leaf w06-l3" d="M22,60 q9,5 0,13 q-9,-8 0,-13z" fill="#e8a03c" />
        <path className="w06-leaf w06-l4" d="M176,40 q8,5 0,12 q-8,-7 0,-12z" />
        <path className="w06-leaf w06-l5" d="M96,66 q8,5 0,12 q-8,-7 0,-12z" fill="#c94a28" />
      </g>

      {/* 南の街路 */}
      <rect x="200" y="126" width="200" height="84" fill="#a89e8c" />
      <rect x="200" y="126" width="200" height="8" fill="#8f8677" />
      <rect x="200" y="164" width="200" height="46" fill="#6f6a5e" />
      <g stroke="#f6efe2" strokeWidth="3" strokeDasharray="16 14" opacity="0.7" fill="none">
        <path d="M200,188 L400,188" />
      </g>

      {/* 街路のジャカランダ */}
      <g>
        <rect x="236" y="104" width="8" height="42" fill="#5a4630" />
        <circle className="w06-crown w06-c6" cx="240" cy="88" r="26" fill="#8a7ab8" />
        <circle className="w06-crown w06-c7" cx="220" cy="100" r="15" fill="#9c8cc8" />
      </g>
      <g>
        <rect x="322" y="110" width="7" height="36" fill="#5a4630" />
        <circle className="w06-crown w06-c8" cx="326" cy="94" r="22" fill="#9c8cc8" />
        <circle className="w06-crown w06-c9" cx="346" cy="104" r="14" fill="#8a7ab8" />
      </g>

      {/* 紫に染まった舗道 */}
      <g fill="#8a7ab8" opacity="0.75">
        <ellipse cx="242" cy="152" rx="46" ry="7" />
        <ellipse cx="330" cy="156" rx="42" ry="6" />
        <ellipse cx="300" cy="200" rx="66" ry="8" />
      </g>

      {/* 落ちるジャカランダの花 */}
      <g fill="#9c8cc8">
        <path className="w06-leaf w06-l6" d="M270,42 q8,5 0,12 q-8,-7 0,-12z" />
        <path className="w06-leaf w06-l7" d="M356,30 q8,5 0,12 q-8,-7 0,-12z" fill="#8a7ab8" />
        <path className="w06-leaf w06-l8" d="M222,56 q8,5 0,12 q-8,-7 0,-12z" />
        <path className="w06-leaf w06-l9" d="M310,68 q8,5 0,12 q-8,-7 0,-12z" fill="#8a7ab8" />
        <path className="w06-leaf w06-l10" d="M386,50 q8,5 0,12 q-8,-7 0,-12z" />
      </g>

      {/* 半球の境目 */}
      <rect x="197" width="6" height="210" fill="#f6efe2" opacity="0.3" />
      <path d="M200,0 L200,210" stroke="#f6efe2" strokeWidth="2" strokeDasharray="10 9" opacity="0.7" />

      <style>{`
        .w06-crown {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: w06-breathe 6.4s ease-in-out infinite;
        }
        .w06-c2 { animation-delay: -0.8s; }
        .w06-c3 { animation-delay: -1.6s; }
        .w06-c4 { animation-delay: -2.4s; }
        .w06-c5 { animation-delay: -3.2s; }
        .w06-c6 { animation-delay: -0.4s; }
        .w06-c7 { animation-delay: -1.2s; }
        .w06-c8 { animation-delay: -2s; }
        .w06-c9 { animation-delay: -2.8s; }
        .w06-leaf {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: w06-fall 6s linear infinite;
        }
        .w06-l2 { animation-delay: -1.2s; animation-duration: 7s; }
        .w06-l3 { animation-delay: -2.4s; animation-duration: 5.4s; }
        .w06-l4 { animation-delay: -3.6s; animation-duration: 6.6s; }
        .w06-l5 { animation-delay: -4.8s; animation-duration: 5.8s; }
        .w06-l6 { animation-delay: -0.6s; animation-duration: 6.2s; }
        .w06-l7 { animation-delay: -1.8s; animation-duration: 7.2s; }
        .w06-l8 { animation-delay: -3s; animation-duration: 5.6s; }
        .w06-l9 { animation-delay: -4.2s; animation-duration: 6.8s; }
        .w06-l10 { animation-delay: -5.4s; animation-duration: 6s; }
        .w06-coach {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: w06-roll 11s linear infinite;
        }
        @keyframes w06-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.045); }
        }
        @keyframes w06-fall {
          0% { transform: translate(0, -34px) rotate(0deg); opacity: 0; }
          12%, 84% { opacity: 1; }
          100% { transform: translate(-40px, 138px) rotate(300deg); opacity: 0; }
        }
        @keyframes w06-roll {
          0% { transform: translateX(0); }
          100% { transform: translateX(88px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .w06-crown, .w06-leaf, .w06-coach { animation: none; }
        }
      `}</style>
    </svg>
  );
}
