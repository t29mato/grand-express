/**
 * 搾り場で一日働く。木を揺すり、落ちた実を掻き集め、搾り機に積み込む。
 *
 * 螺子を回すたびに果汁が受け桶へ落ちていく。帰りには現金と瓶が二本。
 * 林檎の木は牛の放牧地に立っていて、その実はそのまま齧るには渋すぎる。
 *
 * 位置決めは外側の <g transform>、動きは内側のクラス。
 * CSSのtransformは属性のtransformを上書きするので、両方を同じ要素に付けない。
 */
export function CidreAuPressoir() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 秋のノルマンディ */}
      <rect width="400" height="210" fill="#a8cfe4" />
      <rect width="400" height="40" fill="#bcdcee" />
      <path
        d="M0,84 q70,-18 148,-6 q86,14 172,-10 l80,0 0,40 -400,0z"
        fill="#7ba05c"
      />

      {/* 林檎の木と牛 */}
      <g transform="translate(66,96)">
        <rect x="-6" y="-18" width="12" height="24" fill="#5c4632" />
        <g className="cidre-tree">
          <circle cx="0" cy="-42" r="30" fill="#4f7f42" />
          <circle cx="-20" cy="-30" r="20" fill="#437438" />
          <circle cx="22" cy="-32" r="19" fill="#5c8f4c" />
          <g fill="#e8443f">
            <circle cx="-14" cy="-46" r="5" />
            <circle cx="10" cy="-52" r="5" />
            <circle cx="20" cy="-28" r="5" />
            <circle cx="-24" cy="-24" r="5" />
          </g>
        </g>
      </g>
      <g transform="translate(148,104)">
        <g className="cidre-cow">
          <ellipse cx="0" cy="-10" rx="26" ry="15" fill="#f6efe2" />
          <path d="M-16,-20 q10,-8 18,2 q-8,8 -18,-2z" fill="#4a3a2a" />
          <path d="M8,-4 q12,-4 14,6 q-12,4 -14,-6z" fill="#4a3a2a" />
          <circle cx="-24" cy="-18" r="9" fill="#f6efe2" />
          <ellipse cx="-30" cy="-15" rx="5" ry="4" fill="#d8b0a8" />
          <circle cx="-27" cy="-21" r="1.8" fill="#2a1f18" />
          <path
            d="M-31,-25 q-4,-6 2,-6 M-19,-25 q4,-6 -2,-6"
            stroke="#c9a877"
            strokeWidth="3"
            fill="none"
          />
          <g fill="#4a3a2a">
            <rect x="-14" y="2" width="5" height="12" rx="2" />
            <rect x="10" y="2" width="5" height="12" rx="2" />
          </g>
        </g>
      </g>

      {/* 落ちた実の下の草地 */}
      <rect y="118" width="400" height="92" fill="#6b8f4a" />
      <rect y="118" width="400" height="6" fill="#7ba05c" />

      {/* 搾り機 */}
      <g transform="translate(276,164)">
        {/* 枠 */}
        <rect x="-54" y="-96" width="12" height="96" fill="#8d6b3c" />
        <rect x="42" y="-96" width="12" height="96" fill="#8d6b3c" />
        <rect x="-54" y="-96" width="108" height="13" rx="3" fill="#a8814a" />
        {/* 螺子 */}
        <rect x="-5" y="-92" width="10" height="46" fill="#c9b28a" />
        <g className="cidre-screw">
          <rect x="-30" y="-96" width="60" height="9" rx="4" fill="#6b5233" />
          <circle cx="-32" cy="-92" r="6" fill="#5c4632" />
          <circle cx="32" cy="-92" r="6" fill="#5c4632" />
        </g>
        {/* 圧盤と搾り粕 */}
        <g className="cidre-plate">
          <rect x="-42" y="-52" width="84" height="12" rx="3" fill="#a8814a" />
        </g>
        <rect x="-40" y="-40" width="80" height="26" rx="3" fill="#c9a05c" />
        <g stroke="#a8814a" strokeWidth="3" fill="none">
          <path d="M-38,-32 L38,-32" />
          <path d="M-38,-24 L38,-24" />
        </g>
        <rect x="-46" y="-14" width="92" height="10" rx="3" fill="#8d6b3c" />
        {/* 受け桶 */}
        <path d="M-34,-4 l68,0 l-8,26 -52,0z" fill="#7d6140" />
        <ellipse cx="0" cy="12" rx="24" ry="6" fill="#c9922c" />
      </g>
      {/* 落ちる果汁 */}
      <g transform="translate(276,158)">
        <g className="cidre-drip-a">
          <ellipse rx="4" ry="6" fill="#e0a836" />
        </g>
      </g>
      <g transform="translate(268,158)">
        <g className="cidre-drip-b">
          <ellipse rx="3.5" ry="5" fill="#e0a836" />
        </g>
      </g>

      {/* 林檎の籠 */}
      <g transform="translate(158,192)">
        <path d="M-32,-22 l64,0 l-8,22 -48,0z" fill="#c9a877" />
        <g stroke="#a8895c" strokeWidth="3" fill="none">
          <path d="M-28,-14 L28,-14" />
          <path d="M-26,-6 L26,-6" />
        </g>
        <ellipse cx="0" cy="-22" rx="32" ry="7" fill="#b89a6c" />
        <g fill="#c0362f">
          <circle cx="-16" cy="-26" r="8" />
          <circle cx="0" cy="-29" r="8" />
          <circle cx="16" cy="-26" r="8" />
        </g>
        <g fill="#7ba05c">
          <rect x="-14" y="-34" width="3" height="6" rx="1.5" />
          <rect x="2" y="-37" width="3" height="6" rx="1.5" />
        </g>
      </g>

      {/* 現金と瓶二本 */}
      <g transform="translate(58,190)">
        <g className="cidre-bottle">
          <rect x="-22" y="-40" width="16" height="40" rx="4" fill="#4a6b3a" />
          <rect x="-18" y="-52" width="8" height="14" rx="3" fill="#3d5a30" />
          <rect x="-22" y="-26" width="16" height="10" fill="#e8dfc8" />
          <rect x="6" y="-36" width="16" height="36" rx="4" fill="#4a6b3a" />
          <rect x="10" y="-48" width="8" height="14" rx="3" fill="#3d5a30" />
          <rect x="6" y="-24" width="16" height="9" fill="#e8dfc8" />
        </g>
        <g className="cidre-coin">
          <circle cx="40" cy="-8" r="9" fill="#f5b31c" />
          <circle cx="40" cy="-8" r="4" fill="#c98f10" />
          <circle cx="54" cy="-2" r="8" fill="#f5b31c" />
          <circle cx="54" cy="-2" r="3.5" fill="#c98f10" />
        </g>
      </g>

      <style>{`
        .cidre-tree { transform-box: fill-box; transform-origin: 50% 100%; animation: cidre-shake 2.8s ease-in-out infinite; }
        .cidre-cow { transform-box: fill-box; transform-origin: 50% 100%; animation: cidre-graze 4.6s ease-in-out infinite; }
        .cidre-screw { transform-box: fill-box; transform-origin: center; animation: cidre-turn 3.4s ease-in-out infinite; }
        .cidre-plate { transform-box: fill-box; transform-origin: 50% 0; animation: cidre-press 3.4s ease-in-out infinite; }
        .cidre-drip-a { transform-box: fill-box; transform-origin: center; opacity: 0; animation: cidre-fall 1.7s ease-in infinite; }
        .cidre-drip-b { transform-box: fill-box; transform-origin: center; opacity: 0; animation: cidre-fall 1.7s ease-in infinite; animation-delay: -0.85s; }
        .cidre-bottle { transform-box: fill-box; transform-origin: 50% 100%; animation: cidre-lift 3.4s ease-in-out infinite; }
        .cidre-coin { transform-box: fill-box; transform-origin: center; animation: cidre-shine 3.4s ease-in-out infinite; }
        @keyframes cidre-shake {
          0%, 100% { transform: rotate(0deg); }
          20% { transform: rotate(-4deg); }
          44% { transform: rotate(3.4deg); }
          68% { transform: rotate(-1.6deg); }
        }
        @keyframes cidre-graze {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-4deg) translate(0, 2px); }
        }
        @keyframes cidre-turn {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(38deg); }
        }
        @keyframes cidre-press {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(0, 7px); }
        }
        @keyframes cidre-fall {
          0% { transform: translate(0, -6px) scaleY(0.5); opacity: 0; }
          18% { opacity: 1; }
          78% { opacity: 1; }
          100% { transform: translate(0, 34px) scaleY(1.4); opacity: 0; }
        }
        @keyframes cidre-lift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(0, -4px); }
        }
        @keyframes cidre-shine {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .cidre-tree, .cidre-cow, .cidre-screw, .cidre-plate,
          .cidre-drip-a, .cidre-drip-b, .cidre-bottle, .cidre-coin { animation: none; }
        }
      `}</style>
    </svg>
  );
}
