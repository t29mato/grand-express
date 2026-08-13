/**
 * パブ全員におごる羽目になる。暴力的な要素は無く、
 * カウンターに並ぶグラスと、財布からこぼれる硬貨だけで示す。
 */
export function AustraliaShout() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 薄暗いパブの店内。 */}
      <rect width="400" height="210" fill="#3a2e28" />
      <rect y="0" width="400" height="60" fill="#4a3a30" />
      <g fill="#f5b31c" opacity="0.5">
        <circle cx="80" cy="30" r="14" />
        <circle cx="320" cy="24" r="16" />
      </g>

      {/* 木のカウンター。 */}
      <rect y="150" width="400" height="60" fill="#5a4630" />
      <rect y="146" width="400" height="8" fill="#6b5330" />

      {/* カウンターの奥の棚。 */}
      <g fill="#241c14">
        <rect x="20" y="70" width="360" height="76" />
      </g>
      <g fill="#8fc4e8" opacity="0.8">
        <rect x="40" y="82" width="10" height="26" />
        <rect x="60" y="86" width="10" height="22" />
        <rect x="330" y="82" width="10" height="26" />
        <rect x="350" y="86" width="10" height="22" />
      </g>

      {/* ずらりと並ぶグラス。左から順に一つずつ現れる。 */}
      <g>
        {[100, 140, 180, 220, 260, 300].map((x, i) => (
          <g key={x} className="ash-glass" style={{ transformOrigin: `${x}px 148px`, animationDelay: `${i * 0.25}s` }}>
            <rect x={x - 8} y="126" width="16" height="22" fill="#f0c419" opacity="0.85" />
            <rect x={x - 9} y="122" width="18" height="6" fill="#f6efe2" opacity="0.9" />
          </g>
        ))}
      </g>

      {/* 財布からこぼれる硬貨。 */}
      <g>
        <rect x="60" y="176" width="24" height="16" rx="2" fill="#4a4436" stroke="#8a7a5c" strokeWidth="1.4" />
        <circle className="ash-coin" cx="72" cy="176" r="4" fill="#f5b31c" style={{ animationDelay: "0s" }} />
        <circle className="ash-coin" cx="72" cy="176" r="4" fill="#f5b31c" style={{ animationDelay: "0.5s" }} />
        <circle className="ash-coin" cx="72" cy="176" r="4" fill="#f5b31c" style={{ animationDelay: "1s" }} />
      </g>

      <style>{`
        .ash-glass {
          transform-box: fill-box;
          animation: ash-pour 3s ease-in-out infinite;
        }
        @keyframes ash-pour {
          0%   { transform: scale(0); opacity: 0; }
          20%  { transform: scale(1.15); opacity: 1; }
          30%  { transform: scale(1); opacity: 1; }
          85%  { transform: scale(1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .ash-coin {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: ash-drop 1.5s ease-in infinite;
        }
        @keyframes ash-drop {
          0%   { transform: translate(0, 0) scale(1); opacity: 1; }
          70%  { transform: translate(18px, 22px) scale(0.8); opacity: 1; }
          100% { transform: translate(24px, 26px) scale(0.6); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ash-glass, .ash-coin {
            animation: none;
          }
          .ash-glass { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </svg>
  );
}
