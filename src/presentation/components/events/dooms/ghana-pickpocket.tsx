/**
 * 市場の人混みでスリに遭う。肩掛け鞄が二度かすめられても、
 * いつもの土曜の雑踏としか思わなかった。
 *
 * 動くのは、鞄へ伸びて財布を抜き取り引っ込む手1つだけ。
 */
export function GhanaPickpocket() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 市場の空。 */}
      <rect width="400" height="210" fill="#8fc4e8" />
      <rect y="70" width="400" height="30" fill="#cfe4f0" />

      {/* 縞の日除け。 */}
      <g strokeLinejoin="round">
        <path d="M20,100 L60,60 L100,100z" fill="#e8443f" stroke="#20364a" strokeWidth="2" />
        <path d="M300,100 L340,60 L380,100z" fill="#2f6b3a" stroke="#20364a" strokeWidth="2" />
      </g>

      {/* 地面と人混み。 */}
      <rect y="150" width="400" height="60" fill="#c9a877" />
      <g fill="#4a4a52" opacity="0.8">
        <circle cx="60" cy="150" r="7" />
        <rect x="53" y="157" width="14" height="24" rx="3" />
        <circle cx="330" cy="148" r="7" />
        <rect x="323" y="155" width="14" height="24" rx="3" />
        <circle cx="290" cy="156" r="6" />
        <rect x="284" y="162" width="12" height="20" rx="3" />
      </g>

      {/* 狙われている買い物客と肩掛け鞄。 */}
      <g fill="#4a4a52">
        <circle cx="180" cy="140" r="9" />
        <rect x="169" y="149" width="22" height="34" rx="4" />
      </g>
      <rect x="186" y="162" width="16" height="18" rx="3" fill="#a83a2a" stroke="#20364a" strokeWidth="1.6" />

      {/* 鞄へ伸びる手。**ここだけが動く。** */}
      <g className="gpp-hand">
        <path d="M240,180 q-24,-6 -34,-8" fill="none" stroke="#f6efe2" strokeWidth="8" strokeLinecap="round" />
        <rect x="196" y="168" width="10" height="7" rx="1.6" fill="#f5b31c" />
      </g>

      <style>{`
        .gpp-hand {
          transform-box: fill-box;
          transform-origin: 100% 100%;
          animation: gpp-reach 1.6s ease-in-out infinite;
        }
        @keyframes gpp-reach {
          0% { transform: translateX(60px); opacity: 0; }
          30% { transform: translateX(0); opacity: 1; }
          60% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(70px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .gpp-hand { animation: none; transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </svg>
  );
}
