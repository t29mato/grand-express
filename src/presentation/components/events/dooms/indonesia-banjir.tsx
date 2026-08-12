/**
 * 季節の洪水で荷物が水浸しになる(バンジール)。駅のホームに積まれた荷箱が、
 * じわじわ上がってくる水位に呑まれていく。水面には波紋が揺れる。
 *
 * 動くのは水位の上昇と波紋だけ。荷箱自体は壊れない(浸水であって崩落ではない)。
 */
export function IndonesiaBanjir() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 雨模様の空。 */}
      <rect width="400" height="210" fill="#5f7a8a" />
      <rect y="0" width="400" height="70" fill="#7f96a4" />
      <g stroke="#cfe4f0" strokeWidth="2" opacity="0.6">
        <line x1="40" y1="10" x2="30" y2="40" />
        <line x1="120" y1="14" x2="110" y2="44" />
        <line x1="260" y1="8" x2="250" y2="38" />
        <line x1="340" y1="16" x2="330" y2="46" />
      </g>

      {/* ホームの屋根。 */}
      <rect x="0" y="70" width="400" height="10" fill="#6b7060" />
      <g stroke="#4a4f42" strokeWidth="3">
        <line x1="40" y1="80" x2="40" y2="140" />
        <line x1="360" y1="80" x2="360" y2="140" />
      </g>

      {/* ホームの床。 */}
      <rect y="140" width="400" height="70" fill="#8a8f95" />

      {/* 積まれた荷箱。 */}
      <g strokeLinejoin="round">
        <rect x="70" y="110" width="40" height="30" fill="#c9a877" stroke="#5a4a30" strokeWidth="2" />
        <rect x="110" y="122" width="34" height="18" fill="#a87f4a" stroke="#5a4a30" strokeWidth="2" />
        <rect x="260" y="116" width="36" height="24" fill="#c9a877" stroke="#5a4a30" strokeWidth="2" />
        <rect x="296" y="128" width="30" height="12" fill="#a87f4a" stroke="#5a4a30" strokeWidth="2" />
      </g>

      {/* 上がってくる水(高さがアニメーションする)。 */}
      <rect className="idn-bj-water" x="0" y="140" width="400" height="70" fill="#3f8fc4" opacity="0.85" />
      <g className="idn-bj-ripple" stroke="#bfe8f4" strokeWidth="2" fill="none" opacity="0.8">
        <path d="M20,0h60M150,10h70M260,4h60" />
      </g>

      <style>{`
        .idn-bj-water {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: idn-bj-rise 3.6s ease-in-out infinite;
        }
        @keyframes idn-bj-rise {
          0% { transform: scaleY(0.05); }
          60% { transform: scaleY(0.55); }
          100% { transform: scaleY(0.55); }
        }
        .idn-bj-ripple {
          transform-box: fill-box;
          animation: idn-bj-float 3.6s ease-in-out infinite;
        }
        @keyframes idn-bj-float {
          0% { transform: translateY(70px); opacity: 0; }
          60% { transform: translateY(163px); opacity: 0.9; }
          80% { transform: translateY(158px); opacity: 0.9; }
          100% { transform: translateY(158px); opacity: 0.9; }
        }
        @media (prefers-reduced-motion: reduce) {
          .idn-bj-water { animation: none; transform: scaleY(0.55); }
          .idn-bj-ripple { animation: none; transform: translateY(158px); opacity: 0.9; }
        }
      `}</style>
    </svg>
  );
}
