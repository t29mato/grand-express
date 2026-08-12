/**
 * モッラ(数当ての手遊び)の勝負に負ける。バールのテーブルで両手が交互に
 * 突き出され、負けた側がうなだれ、勝った側の周りにグラスが並ぶ。
 *
 * 動くのは突き出す手と、負けた人のうなだれた頭だけ。
 */
export function ItalyMorra() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* バールの店内、暖色の壁。 */}
      <rect width="400" height="210" fill="#5a4a3a" />
      <rect y="0" width="400" height="70" fill="#6b5848" />

      {/* 棚とボトル(奥)。 */}
      <rect x="0" y="20" width="400" height="8" fill="#4a3c30" />
      <g fill="#3f8f4f" opacity="0.9">
        <rect x="30" y="26" width="10" height="28" rx="2" />
        <rect x="46" y="30" width="10" height="24" rx="2" />
        <rect x="330" y="26" width="10" height="28" rx="2" />
        <rect x="346" y="30" width="10" height="24" rx="2" />
      </g>

      {/* テーブル。 */}
      <rect y="150" width="400" height="60" fill="#8a5a3a" />
      <rect y="150" width="400" height="6" fill="#a8703f" />

      {/* 負けた人(左、うなだれる)。 */}
      <g className="ita-mo-loser">
        <circle cx="120" cy="118" r="16" fill="#d9a273" />
        <rect x="100" y="132" width="40" height="30" rx="4" fill="#4a4436" />
      </g>
      {/* 負けた人の手(開いた5本指のまま止まっている)。 */}
      <g fill="#d9a273" stroke="#8a5a3a" strokeWidth="1">
        <path d="M150,140 l4,-14 l4,12 l4,-16 l4,14 l4,-10 l4,12 l-6,10z" />
      </g>

      {/* 勝った人(右)。 */}
      <g>
        <circle cx="280" cy="112" r="16" fill="#d9a273" />
        <rect x="260" y="126" width="40" height="34" rx="4" fill="#e8443f" />
      </g>
      {/* 勝った人の突き出す手(数字を叫ぶジェスチャー、動く)。 */}
      <g className="ita-mo-fist" fill="#d9a273" stroke="#8a5a3a" strokeWidth="1">
        <ellipse cx="238" cy="140" rx="12" ry="9" />
        <rect x="222" y="134" width="10" height="8" rx="3" />
      </g>

      {/* テーブルの上のグラス(負けた側が払う品)。 */}
      <g fill="#bfe0f0" opacity="0.9" stroke="#8fa8b8" strokeWidth="1">
        <path d="M180,150 l3,20 h14 l3,-20 z" />
        <path d="M205,150 l3,20 h14 l3,-20 z" />
        <path d="M230,150 l3,20 h14 l3,-20 z" />
      </g>

      <style>{`
        .ita-mo-fist {
          transform-box: fill-box;
          transform-origin: 100% 50%;
          animation: ita-mo-throw 0.7s ease-in-out infinite;
        }
        @keyframes ita-mo-throw {
          0%, 100% { transform: translateX(0) scale(1); }
          40% { transform: translateX(-14px) scale(1.08); }
        }
        .ita-mo-loser {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: ita-mo-slump 2.4s ease-in-out infinite;
        }
        @keyframes ita-mo-slump {
          0%, 15% { transform: rotate(0deg) translateY(0); }
          30%, 100% { transform: rotate(5deg) translateY(4px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ita-mo-fist, .ita-mo-loser { animation: none; }
        }
      `}</style>
    </svg>
  );
}
