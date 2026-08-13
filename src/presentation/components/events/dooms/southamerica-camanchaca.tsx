/**
 * カマンチャカの霧が海岸道路を閉ざす。フンボルト海流から立ち上る濃い海霧が
 * 沿岸道路の視界をほとんど奪い、日が高くなって焼き払うまでバスは
 * 動けない。
 *
 * 人を描かず、**止まったバスと、道を覆う霧の層**で表す。
 * 動くのは、道を覆っていく霧の帯1つだけ。
 */
export function SouthamericaCamanchaca() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 白んだ空。 */}
      <rect width="400" height="210" fill="#c4d4d8" />
      <rect y="0" width="400" height="90" fill="#d8e4e6" />

      {/* 砂丘のシルエット。 */}
      <path d="M0,100 Q80,70 160,100 Q240,72 320,100 Q360,86 400,100 L400,140 L0,140z" fill="#b3946a" opacity="0.7" />

      {/* 沿岸道路。 */}
      <rect y="140" width="400" height="70" fill="#7a7468" />
      <g stroke="#e2ddc8" strokeWidth="3" strokeDasharray="14 10" opacity="0.7">
        <line x1="0" y1="175" x2="400" y2="175" />
      </g>

      {/* 路肩に停まったバス。 */}
      <g strokeLinejoin="round">
        <rect x="140" y="150" width="120" height="34" rx="6" fill="#2f6ea8" stroke="#20364a" strokeWidth="2.5" />
        <rect x="150" y="158" width="20" height="14" rx="2" fill="#bfe0f0" />
        <rect x="176" y="158" width="20" height="14" rx="2" fill="#bfe0f0" />
        <rect x="202" y="158" width="20" height="14" rx="2" fill="#bfe0f0" />
        <circle cx="160" cy="188" r="9" fill="#241a10" />
        <circle cx="240" cy="188" r="9" fill="#241a10" />
      </g>

      {/* 遠くの海。 */}
      <rect y="130" width="400" height="10" fill="#3f7f9a" opacity="0.6" />

      {/* 道を覆っていく霧の層。**ここだけが動く。** */}
      <g className="sa-camanchaca-fog">
        <rect y="80" width="400" height="120" fill="#e8f2f2" opacity="0.55" />
        <ellipse cx="80" cy="150" rx="90" ry="30" fill="#f2f8f8" opacity="0.6" />
        <ellipse cx="300" cy="140" rx="110" ry="34" fill="#f2f8f8" opacity="0.6" />
      </g>

      <style>{`
        .sa-camanchaca-fog {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: sa-camanchaca-drift 5s ease-in-out infinite;
        }
        @keyframes sa-camanchaca-drift {
          0%   { transform: translateX(-30px); opacity: 0.4; }
          50%  { transform: translateX(30px); opacity: 0.85; }
          100% { transform: translateX(-30px); opacity: 0.4; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sa-camanchaca-fog {
            animation: none;
            opacity: 0.6;
          }
        }
      `}</style>
    </svg>
  );
}
