/**
 * 高速道路の出口を間違える。二股に分かれるランプの標識の下、車が
 * 誤ったほうの出口へ流れていってしまう。
 *
 * 動くのは、車が本線から誤った出口ランプへ逸れていく動きだけ。
 */
export function UsaWrongexit() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夕方の空。 */}
      <rect width="400" height="210" fill="#8fc4e8" />
      <rect y="0" width="400" height="100" fill="#cfe4f0" />
      <path d="M0,120c60,-18 130,-18 190,-4c70,-16 150,-4 210,-12v16H0z" fill="#8fae63" opacity="0.7" />

      {/* 本線と分岐するランプ。 */}
      <path d="M0,170h180" stroke="#4a4a52" strokeWidth="40" fill="none" />
      <path d="M180,170 C 240,170 260,190 320,196" stroke="#4a4a52" strokeWidth="30" fill="none" />
      <path d="M180,170 C 240,170 280,150 340,140" stroke="#4a4a52" strokeWidth="30" fill="none" />

      {/* 車線の破線。 */}
      <path d="M0,170h180" stroke="#e8dcc0" strokeWidth="3" strokeDasharray="20 16" fill="none" />

      {/* 緑の標識(方面板。文字は使わず、上下2枚の矢印だけで示す)。 */}
      <g strokeLinejoin="round">
        <rect x="230" y="60" width="70" height="46" rx="3" fill="#4f8f4f" stroke="#20364a" strokeWidth="2" />
        <path d="M245,78 L245,70 L265,70 L265,64 L280,78 L265,92 L265,86 L245,86z" fill="#f6efe2" />
        <line x1="230" y1="106" x2="300" y2="106" stroke="#20364a" strokeWidth="1" />
        <path d="M245,98 L280,98 L280,94 L290,100 L280,106 L280,102 L245,102z" fill="#f6efe2" opacity="0.9" />
      </g>
      <rect x="262" y="106" width="4" height="30" fill="#8a92a0" />

      {/* 車(本線から誤った下側のランプへ逸れていく)。 */}
      <g className="usa-we-car">
        <path d="M40,178 L54,164 L98,164 L112,178z" fill="#e8443f" stroke="#20364a" strokeWidth="2.4" strokeLinejoin="round" />
        <rect x="36" y="176" width="80" height="16" rx="3" fill="#c9302c" stroke="#20364a" strokeWidth="2.4" />
        <circle cx="56" cy="196" r="8" fill="#241a10" />
        <circle cx="98" cy="196" r="8" fill="#241a10" />
        <rect x="62" y="168" width="16" height="8" fill="#bfe0f0" opacity="0.9" />
      </g>

      <style>{`
        .usa-we-car {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: usa-we-drive 3.6s ease-in-out infinite;
        }
        @keyframes usa-we-drive {
          0% { transform: translate(0px, 0px) rotate(0deg); }
          55% { transform: translate(140px, 0px) rotate(0deg); }
          80% { transform: translate(200px, 22px) rotate(18deg); }
          100% { transform: translate(240px, 32px) rotate(18deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .usa-we-car { animation: none; transform: translate(200px, 22px) rotate(18deg); }
        }
      `}</style>
    </svg>
  );
}
