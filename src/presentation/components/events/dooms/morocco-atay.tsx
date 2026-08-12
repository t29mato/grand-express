/**
 * ドミノに負けて、テーブル全員分のミントティーをおごる羽目になる。
 * ポットから高い位置で注がれる茶の弧と、散らばるドミノ牌が動く。
 */
export function MoroccoAtay() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* カフェの店内。 */}
      <rect width="400" height="210" fill="#c9a877" />
      <rect y="0" width="400" height="80" fill="#e8dcc0" />
      <rect y="150" width="400" height="60" fill="#9c7a52" />

      {/* テーブル。 */}
      <rect x="60" y="150" width="280" height="10" fill="#5a4630" />
      <rect x="70" y="160" width="4" height="30" fill="#5a4630" />
      <rect x="326" y="160" width="4" height="30" fill="#5a4630" />

      {/* 散らばるドミノ牌。 */}
      <g className="mo-atay-domino">
        <rect x="100" y="128" width="14" height="24" rx="2" fill="#f6efe2" stroke="#20364a" strokeWidth="1.4" />
        <circle cx="107" cy="135" r="1.6" fill="#20364a" />
        <circle cx="107" cy="145" r="1.6" fill="#20364a" />
      </g>
      <g className="mo-atay-domino mo-atay-domino2">
        <rect x="140" y="132" width="14" height="24" rx="2" fill="#f6efe2" stroke="#20364a" strokeWidth="1.4" transform="rotate(18 147 144)" />
      </g>
      <g className="mo-atay-domino mo-atay-domino3">
        <rect x="180" y="126" width="14" height="24" rx="2" fill="#f6efe2" stroke="#20364a" strokeWidth="1.4" transform="rotate(-24 187 138)" />
      </g>

      {/* 茶器のポット(注ぐ側、高い位置)。 */}
      <g transform="translate(270,90)">
        <path d="M-14,0h28v18a14,14 0 0 1 -28,0z" fill="#c9922f" />
        <rect x="-3" y="-8" width="6" height="8" fill="#c9922f" />
        <path d="M14,4c10,-2 10,10 0,10" fill="none" stroke="#c9922f" strokeWidth="4" />
      </g>

      {/* 注がれる茶の弧。 */}
      <path className="mo-atay-pour" d="M270,110C266,150 250,168 246,176" fill="none" stroke="#8a9a3f" strokeWidth="3" strokeLinecap="round" />

      {/* 受けるグラス(泡付き)。 */}
      <g transform="translate(240,180)">
        <path d="M-8,0h16l-3,20h-10z" fill="#bfe0f0" opacity="0.85" />
        <ellipse className="mo-atay-foam" cx="0" cy="0" rx="8" ry="3" fill="#e8dcc0" />
      </g>

      {/* 困った顔の人影(単純化)。 */}
      <g>
        <circle cx="90" cy="176" r="9" fill="#f6efe2" />
        <rect x="78" y="186" width="24" height="22" rx="7" fill="#5b8fe8" />
      </g>

      <style>{`
        .mo-atay-domino {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: mo-atay-fall 2.6s ease-in infinite;
        }
        .mo-atay-domino2 { animation-delay: 0.25s; }
        .mo-atay-domino3 { animation-delay: 0.5s; }
        @keyframes mo-atay-fall {
          0% { transform: translateY(0px) rotate(0deg); }
          40% { transform: translateY(4px) rotate(30deg); }
          100% { transform: translateY(4px) rotate(30deg); }
        }
        .mo-atay-pour {
          stroke-dasharray: 60;
          animation: mo-atay-stream 1.4s linear infinite;
        }
        @keyframes mo-atay-stream {
          0% { stroke-dashoffset: 60; opacity: 0; }
          15% { opacity: 1; }
          70% { stroke-dashoffset: 0; opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        .mo-atay-foam {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: mo-atay-bubble 1.4s linear infinite;
        }
        @keyframes mo-atay-bubble {
          0%, 60% { opacity: 0; transform: scale(0.6); }
          75% { opacity: 0.9; transform: scale(1.1); }
          100% { opacity: 0.9; transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .mo-atay-domino { animation: none; transform: translateY(4px) rotate(30deg); }
          .mo-atay-pour { animation: none; stroke-dashoffset: 0; opacity: 0.9; }
          .mo-atay-foam { animation: none; opacity: 0.9; }
        }
      `}</style>
    </svg>
  );
}
