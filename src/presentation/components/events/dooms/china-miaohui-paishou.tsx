/**
 * 廟会の人混みでスられる。香炉の周りは肩がぶつかるほどの人混みで、
 * 誰もが屋台と煙にばかり目をやり、互いを見ていない。
 *
 * 動くのは、財布へ伸びていく手1つだけ。
 */
export function ChinaMiaohuiPaishou() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夕方の空。 */}
      <rect width="400" height="210" fill="#e8c07a" />
      <rect y="0" width="400" height="80" fill="#f2d49a" />

      {/* 屋台の連なる街並み。 */}
      <g strokeLinejoin="round">
        <rect x="10" y="90" width="60" height="40" fill="#c9302c" stroke="#8a1f1f" strokeWidth="2" />
        <path d="M4,90 h72 l-8,-14 h-56 z" fill="#d4a017" stroke="#8a1f1f" strokeWidth="1.6" />
        <rect x="330" y="86" width="60" height="44" fill="#3f8f6f" stroke="#20364a" strokeWidth="2" />
        <path d="M324,86 h72 l-8,-14 h-56 z" fill="#d4a017" stroke="#20364a" strokeWidth="1.6" />
      </g>

      {/* 提灯の列。 */}
      <g fill="#c9302c" stroke="#8a1f1f" strokeWidth="1.4">
        <ellipse cx="120" cy="50" rx="12" ry="14" />
        <ellipse cx="160" cy="42" rx="12" ry="14" />
        <ellipse cx="200" cy="50" rx="12" ry="14" />
        <ellipse cx="240" cy="42" rx="12" ry="14" />
        <ellipse cx="280" cy="50" rx="12" ry="14" />
      </g>

      {/* 香炉と立ち上る煙。 */}
      <g strokeLinejoin="round">
        <path d="M186,170 h28 l-4,20 h-20 z" fill="#4a4436" stroke="#20364a" strokeWidth="2" />
        <rect x="182" y="164" width="36" height="8" rx="2" fill="#8a5a3a" stroke="#20364a" strokeWidth="1.6" />
      </g>
      <g stroke="#c8ccc4" strokeWidth="2" fill="none" opacity="0.6" strokeLinecap="round">
        <path d="M195,164 q-6,-14 2,-24 q8,-10 0,-22" />
        <path d="M208,164 q6,-12 -2,-22 q-8,-10 2,-20" />
      </g>

      {/* 人混み(簡略シルエット)。密に描いて雑踏を表す。 */}
      <g fill="#4a4a52">
        <circle cx="90" cy="150" r="8" />
        <rect x="81" y="158" width="18" height="30" rx="4" />
        <circle cx="130" cy="156" r="7" />
        <rect x="122" y="163" width="16" height="28" rx="4" fill="#3f8f6f" />
        <circle cx="270" cy="152" r="8" />
        <rect x="261" y="160" width="18" height="30" rx="4" fill="#c9302c" />
        <circle cx="310" cy="158" r="7" />
        <rect x="302" y="165" width="16" height="28" rx="4" />
      </g>

      {/* 狙われる側の肩掛け鞄。 */}
      <g strokeLinejoin="round">
        <rect x="255" y="172" width="16" height="14" rx="2" fill="#8a5a3a" stroke="#20364a" strokeWidth="1.6" />
        <path d="M263,172 L263,150" stroke="#5a3a20" strokeWidth="2" fill="none" />
      </g>

      {/* 財布へ伸びていく手。**ここだけが動く。** */}
      <g className="cmp-hand" strokeLinejoin="round" strokeLinecap="round">
        <path d="M340,190 L300,178" stroke="#d9a273" strokeWidth="8" fill="none" />
        <circle cx="296" cy="177" r="6" fill="#d9a273" stroke="#20364a" strokeWidth="1.4" />
      </g>

      <style>{`
        .cmp-hand {
          transform-box: fill-box;
          transform-origin: 100% 100%;
          animation: cmp-reach 1.8s ease-in-out infinite;
        }
        @keyframes cmp-reach {
          0%, 20% { transform: translate(10px, 6px); }
          55% { transform: translate(-14px, -2px); }
          80%, 100% { transform: translate(10px, 6px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .cmp-hand { animation: none; }
        }
      `}</style>
    </svg>
  );
}
