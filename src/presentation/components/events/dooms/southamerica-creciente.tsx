/**
 * アマゾン川が桟橋を越えて増水する。クレシエンテ(増水期)の川が川港や
 * 低い桟橋を一時的に水没させ、船はいつもの船着場ではなく残った高台に
 * もやわれる。
 *
 * 人を描かず、**水位が上がっていく川面と、半ば沈んだ桟橋**で表す。
 * 動くのは、じわじわ上がっていく水面1つだけ。
 */
export function SouthamericaCreciente() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 曇り空。 */}
      <rect width="400" height="210" fill="#7fa0a8" />
      <rect y="0" width="400" height="70" fill="#9cbcc0" />

      {/* 密林の岸。 */}
      <circle cx="40" cy="60" r="26" fill="#3f7f4a" opacity="0.9" />
      <circle cx="70" cy="50" r="20" fill="#2f6b3a" opacity="0.9" />
      <circle cx="350" cy="56" r="26" fill="#3f7f4a" opacity="0.9" />
      <circle cx="320" cy="46" r="18" fill="#2f6b3a" opacity="0.9" />
      <rect y="60" width="400" height="30" fill="#4f6f4a" />

      {/* 川面(下層、常に水位いっぱい)。 */}
      <rect y="90" width="400" height="120" fill="#3f6f8a" />

      {/* 半ば沈んだ桟橋。 */}
      <g strokeLinecap="round">
        <line x1="120" y1="150" x2="120" y2="200" stroke="#6b5330" strokeWidth="6" />
        <line x1="160" y1="150" x2="160" y2="200" stroke="#6b5330" strokeWidth="6" />
        <line x1="200" y1="150" x2="200" y2="200" stroke="#6b5330" strokeWidth="6" />
        <rect x="112" y="140" width="96" height="12" fill="#8a6a3c" />
      </g>

      {/* 高台にもやった小舟。 */}
      <g strokeLinejoin="round">
        <path d="M280,150 L288,166 L340,166 L344,150z" fill="#c8bda0" stroke="#3a3f46" strokeWidth="2" />
        <line x1="312" y1="150" x2="312" y2="128" stroke="#6b5330" strokeWidth="3" />
      </g>
      <rect x="270" y="146" width="90" height="6" fill="#5f7a4a" />

      {/* 木にはっきり残る、これまでの水位の跡。 */}
      <g stroke="#e8c890" strokeWidth="2" strokeDasharray="6 5" opacity="0.8">
        <line x1="0" y1="110" x2="400" y2="110" />
        <line x1="0" y1="128" x2="400" y2="128" />
      </g>

      {/* 上がっていく水面。**ここだけが動く。** */}
      <g className="sa-creciente-rise">
        <rect y="0" width="400" height="210" fill="#3f6f8a" opacity="0.55" />
        <path d="M0,4 Q50,0 100,4 Q150,8 200,4 Q250,0 300,4 Q350,8 400,4 L400,20 L0,20z" fill="#bfe0ee" opacity="0.7" />
      </g>

      <style>{`
        .sa-creciente-rise {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: sa-creciente-flood 4.5s ease-in-out infinite;
        }
        @keyframes sa-creciente-flood {
          0%   { transform: translateY(120px); }
          50%  { transform: translateY(40px); }
          100% { transform: translateY(120px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .sa-creciente-rise {
            animation: none;
            transform: translateY(70px);
            transform-box: fill-box;
          }
        }
      `}</style>
    </svg>
  );
}
