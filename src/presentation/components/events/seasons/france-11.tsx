/**
 * 3月・椅子が外に出る。
 *
 * 最初の暖かい午後、四時にはどのテラスも埋まっている。椅子は向かい合わせではなく、
 * みな通りのほうを向いて並んでいる。そこへ三月の俄雨が抜けていき、
 * 二十分ほどみな中へ避難する。
 */
export function France11() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 早春の空 */}
      <rect width="400" height="210" fill="#a9cfe8" />
      <circle cx="66" cy="30" r="20" fill="#fbe4a8" opacity="0.5" />
      <circle cx="66" cy="30" r="12" fill="#fdf0c4" />

      {/* 通り過ぎる俄雨の雲 */}
      <g transform="translate(0,34)">
        <g className="f11-shower">
          <g fill="#7f92a4">
            <ellipse cx="0" cy="0" rx="46" ry="17" />
            <ellipse cx="-28" cy="6" rx="28" ry="13" />
            <ellipse cx="26" cy="5" rx="30" ry="13" />
          </g>
          <g stroke="#b9d2e2" strokeWidth="2.5" strokeLinecap="round" opacity="0.85">
            <path className="f11-rain" d="M-30,16 l-3,14" />
            <path className="f11-rain f11-r2" d="M-14,18 l-3,14" />
            <path className="f11-rain f11-r3" d="M2,16 l-3,14" />
            <path className="f11-rain f11-r4" d="M18,18 l-3,14" />
            <path className="f11-rain f11-r5" d="M32,15 l-3,14" />
          </g>
        </g>
      </g>

      {/* カフェの正面 */}
      <rect y="56" width="400" height="94" fill="#c66a3f" />
      <rect y="56" width="400" height="9" fill="#a3512c" />
      <g fill="#f2e3c8">
        <rect x="24" y="76" width="58" height="52" rx="3" />
        <rect x="106" y="76" width="58" height="52" rx="3" />
        <rect x="236" y="76" width="58" height="52" rx="3" />
        <rect x="318" y="76" width="58" height="52" rx="3" />
      </g>
      <g fill="#d8c7a4">
        <rect x="24" y="76" width="58" height="8" rx="3" />
        <rect x="106" y="76" width="58" height="8" rx="3" />
        <rect x="236" y="76" width="58" height="8" rx="3" />
        <rect x="318" y="76" width="58" height="8" rx="3" />
      </g>
      {/* 入口 */}
      <rect x="184" y="86" width="34" height="64" rx="2" fill="#6b3a1f" />

      {/* 日除け */}
      <g transform="translate(200,150)">
        <path d="M-200,-16 L200,-16 L200,-34 L-200,-34z" fill="#c0392b" />
        <path d="M-200,-16 q10,9 20,0 q10,9 20,0 q10,9 20,0 q10,9 20,0 q10,9 20,0 q10,9 20,0 q10,9 20,0 q10,9 20,0 q10,9 20,0 q10,9 20,0 q10,9 20,0 q10,9 20,0 q10,9 20,0 q10,9 20,0 q10,9 20,0 q10,9 20,0 q10,9 20,0 q10,9 20,0 q10,9 20,0 q10,9 20,0" fill="#f4f1e8" />
      </g>

      {/* 舗道 */}
      <rect y="150" width="400" height="60" fill="#c0b7a4" />
      <rect y="150" width="400" height="5" fill="#9d9481" />

      {/* テラスの椅子。どれも通りのほうを向いている */}
      <g transform="translate(48,196)">
        <g className="f11-set">
          <path d="M-15,0 L-13,-18 L13,-18 L15,0z" fill="#b8873f" />
          <rect x="-16" y="-30" width="32" height="13" rx="4" fill="#d0a054" />
          <g stroke="#a8722a" strokeWidth="2">
            <path d="M-8,-29 v11 M0,-29 v11 M8,-29 v11" />
          </g>
        </g>
      </g>
      <g transform="translate(112,196)">
        <g className="f11-set f11-set2">
          <path d="M-15,0 L-13,-18 L13,-18 L15,0z" fill="#b8873f" />
          <rect x="-16" y="-30" width="32" height="13" rx="4" fill="#d0a054" />
          <circle cx="0" cy="-49" r="12" fill="#f6efe2" />
          <path d="M-12,-52 q12,-11 24,-1 q-3,-11 -12,-11 q-11,0 -12,12z" fill="#3b2f24" />
          <path d="M-13,-30 L-11,-40 L11,-40 L13,-30z" fill="#5b8fe8" />
          <path d="M11,-37 q7,2 8,6" stroke="#f6efe2" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <g transform="translate(26,-30)">
            <path d="M-7,-8 q0,11 7,11 q7,0 7,-11z" fill="#fdfbf4" />
            <ellipse cx="0" cy="-8" rx="7" ry="2.4" fill="#e0dbcd" />
            <path d="M7,-5 q6,0 6,4 q0,4 -6,3.5" stroke="#fdfbf4" strokeWidth="2.4" fill="none" />
            <ellipse cx="0" cy="4" rx="9" ry="2.4" fill="#e0dbcd" />
            <g className="f11-steam" stroke="#f4f1e8" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.8">
              <path d="M0,-10 q-4,-6 0,-11" />
            </g>
          </g>
        </g>
      </g>
      <g transform="translate(258,196)">
        <g className="f11-set f11-set3">
          <path d="M-15,0 L-13,-18 L13,-18 L15,0z" fill="#b8873f" />
          <rect x="-16" y="-30" width="32" height="13" rx="4" fill="#d0a054" />
          <circle cx="0" cy="-49" r="12" fill="#f6efe2" />
          <path d="M-12,-51 q12,-12 24,-2 q-3,-11 -12,-11 q-11,0 -12,13z" fill="#6b4326" />
          <path d="M-13,-30 L-11,-40 L11,-40 L13,-30z" fill="#7bc86c" />
          <path d="M-11,-37 q-7,2 -8,6" stroke="#f6efe2" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        </g>
      </g>
      <g transform="translate(322,196)">
        <g className="f11-set f11-set4">
          <path d="M-15,0 L-13,-18 L13,-18 L15,0z" fill="#b8873f" />
          <rect x="-16" y="-30" width="32" height="13" rx="4" fill="#d0a054" />
          <g stroke="#a8722a" strokeWidth="2">
            <path d="M-8,-29 v11 M0,-29 v11 M8,-29 v11" />
          </g>
        </g>
      </g>

      {/* 小さな丸卓 */}
      <g transform="translate(186,196)">
        <ellipse cx="0" cy="-32" rx="16" ry="5" fill="#e0dbcd" />
        <rect x="-2" y="-32" width="4" height="32" fill="#8a6b3e" />
        <ellipse cx="0" cy="0" rx="12" ry="4" fill="#8a6b3e" />
      </g>

      {/* 芽吹きはじめた鉢植え */}
      <g transform="translate(378,196)">
        <path d="M-9,0 L-7,-13 L7,-13 L9,0z" fill="#b3663a" />
        <g className="f11-sprout">
          <path d="M0,-13 q-2,-12 -8,-16" stroke="#4f8a3c" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M0,-13 q2,-10 9,-13" stroke="#5f9c47" strokeWidth="3" fill="none" strokeLinecap="round" />
          <circle cx="-8" cy="-30" r="4" fill="#7bc86c" />
          <circle cx="9" cy="-27" r="4" fill="#7bc86c" />
        </g>
      </g>

      <style>{`
        .f11-shower {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: f11-pass 14s linear infinite;
        }
        .f11-rain { animation: f11-drop 0.9s linear infinite; }
        .f11-r2 { animation-delay: 0.15s; animation-duration: 1.05s; }
        .f11-r3 { animation-delay: 0.3s; animation-duration: 0.82s; }
        .f11-r4 { animation-delay: 0.45s; animation-duration: 0.98s; }
        .f11-r5 { animation-delay: 0.6s; animation-duration: 0.9s; }
        .f11-set {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: f11-settle 5.6s ease-in-out infinite;
        }
        .f11-set2 { animation-delay: 0.8s; animation-duration: 6.4s; }
        .f11-set3 { animation-delay: 1.6s; animation-duration: 5s; }
        .f11-set4 { animation-delay: 2.4s; animation-duration: 6s; }
        .f11-steam {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: f11-waft 3.2s ease-in-out infinite;
        }
        .f11-sprout {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: f11-grow 5.4s ease-in-out infinite;
        }
        @keyframes f11-pass {
          0% { transform: translate(-70px, 0); }
          100% { transform: translate(470px, 0); }
        }
        @keyframes f11-drop {
          0% { transform: translateY(-8px); opacity: 0; }
          20% { opacity: 0.85; }
          80% { opacity: 0.85; }
          100% { transform: translateY(30px); opacity: 0; }
        }
        @keyframes f11-settle {
          0%, 100% { transform: rotate(-1.5deg); }
          50% { transform: rotate(1.5deg); }
        }
        @keyframes f11-waft {
          0% { transform: translateY(4px) scaleY(0.6); opacity: 0; }
          30% { opacity: 0.8; }
          100% { transform: translateY(-10px) scaleY(1.3); opacity: 0; }
        }
        @keyframes f11-grow {
          0%, 100% { transform: rotate(-3deg) scaleY(0.96); }
          50% { transform: rotate(3deg) scaleY(1.04); }
        }
        @media (prefers-reduced-motion: reduce) {
          .f11-shower, .f11-rain, .f11-set, .f11-steam, .f11-sprout { animation: none; }
        }
      `}</style>
    </svg>
  );
}
