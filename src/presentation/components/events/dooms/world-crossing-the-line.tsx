/**
 * 赤道祭。船が赤道を越え、初めての者は越えた者たちへ科料を払う。
 *
 * 樽の玉座にモップの髭と紙の冠のネプチューンが座り、
 * 手には物干し竿の三叉。初めての者は甲板にひざまずいて
 * 硬貨を差し出し、頭の上からは桶の水が来る。最後に証書が出る。
 *
 * 位置決めは外側の <g transform>、動きは内側のクラス。
 * CSSのtransformは属性のtransformを上書きするので、両方を同じ要素に付けない。
 */
export function WorldCrossingTheLine() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 熱帯の空と海 */}
      <rect width="400" height="210" fill="#2f5f7a" />
      <rect width="400" height="70" fill="#3f7a96" />
      <circle cx="344" cy="30" r="20" fill="#f5d033" opacity="0.75" />
      <rect y="70" width="400" height="34" fill="#256080" />
      <g fill="#2f7096">
        <rect
          className="wcl-sea-a"
          x="0"
          y="80"
          width="130"
          height="5"
          rx="2.5"
        />
        <rect
          className="wcl-sea-b"
          x="200"
          y="92"
          width="160"
          height="5"
          rx="2.5"
        />
      </g>

      {/* 舷側と手すり */}
      <rect y="104" width="400" height="106" fill="#8a6a44" />
      <rect y="104" width="400" height="7" fill="#9c7c52" />
      <g fill="#6b5233">
        <rect y="150" width="400" height="4" />
        <rect y="186" width="400" height="4" />
      </g>
      <g fill="#c9b28a">
        <rect x="18" y="66" width="7" height="42" />
        <rect x="374" y="66" width="7" height="42" />
      </g>
      <g stroke="#c9b28a" strokeWidth="4" fill="none">
        <path d="M22,74 L378,74" />
        <path d="M22,90 L378,90" />
      </g>

      {/* 樽の玉座のネプチューン */}
      <g transform="translate(288,168)">
        {/* 樽 */}
        <path d="M-34,-40 q10,-8 68,0 l-6,40 -56,0z" fill="#8d6b3c" />
        <g fill="#6b5233">
          <rect x="-33" y="-28" width="66" height="5" />
          <rect x="-31" y="-12" width="62" height="5" />
        </g>
        <g className="wcl-neptune">
          {/* 三叉(物干し竿) */}
          <rect x="-52" y="-118" width="6" height="86" fill="#a8814a" />
          <path
            d="M-58,-118 l0,-14 M-49,-118 l0,-20 M-40,-118 l0,-14"
            stroke="#c9b28a"
            strokeWidth="5"
            fill="none"
          />
          <rect x="-62" y="-122" width="26" height="6" fill="#c9b28a" />
          {/* 体 */}
          <path d="M-30,-46 q30,-30 60,0 l0,10 -60,0z" fill="#3f7a6b" />
          {/* 三叉を握る腕 */}
          <rect x="-52" y="-70" width="34" height="12" rx="6" fill="#3f7a6b" />
          <ellipse cx="-50" cy="-64" rx="10" ry="8" fill="#e8c9a8" />
          <circle cx="0" cy="-72" r="21" fill="#e8c9a8" />
          <circle cx="-7" cy="-77" r="2.7" fill="#2a1f18" />
          <circle cx="7" cy="-77" r="2.7" fill="#2a1f18" />
          {/* モップの髭 */}
          <path
            d="M-19,-66 q19,11 38,0 l7,15 q-7,32 -26,34 q-19,-2 -26,-34z"
            fill="#eae6dc"
          />
          <g stroke="#cdc8bb" strokeWidth="2.6" fill="none">
            <path d="M-11,-48 l-3,28" />
            <path d="M0,-46 l0,30" />
            <path d="M11,-48 l3,28" />
          </g>
          <path d="M-16,-66 q16,9 32,0 l0,7 q-16,9 -32,0z" fill="#dcd7cc" />
          {/* 紙の冠 */}
          <path
            d="M-22,-88 l6,-16 l7,10 l9,-16 l9,16 l7,-10 l6,16z"
            fill="#f5d033"
          />
        </g>
      </g>

      {/* 桶を持つ腕(舷側の先輩乗組員) */}
      <g transform="translate(150,62)">
        <rect x="-88" y="-9" width="90" height="18" rx="9" fill="#dfe6ee" />
        <g fill="#3f6b96">
          <rect x="-84" y="-9" width="10" height="18" />
          <rect x="-64" y="-9" width="10" height="18" />
          <rect x="-44" y="-9" width="10" height="18" />
        </g>
        <rect x="-22" y="-9" width="22" height="18" rx="6" fill="#c9d2dc" />
        <ellipse cx="0" cy="0" rx="12" ry="9" fill="#e8c9a8" />
      </g>

      {/* かぶせられる桶の水 */}
      <g transform="translate(150,74)">
        <g className="wcl-bucket">
          <path d="M-18,-12 l36,0 l-5,24 -26,0z" fill="#a8814a" />
          <rect x="-19" y="-14" width="38" height="6" rx="3" fill="#8d6b3c" />
        </g>
      </g>
      <g transform="translate(150,90)">
        <g className="wcl-splash">
          <path
            d="M-14,0 q14,-6 28,0 l10,54 q-24,10 -48,0z"
            fill="#8fc4e8"
            opacity="0.75"
          />
          <circle cx="-20" cy="52" r="5" fill="#bfe0f2" />
          <circle cx="24" cy="60" r="4" fill="#bfe0f2" />
        </g>
      </g>

      {/* ひざまずいて科料を払う者 */}
      <g transform="translate(146,182)">
        <g className="wcl-pollywog">
          <path d="M-30,0 q10,-30 34,-26 l14,26z" fill="#4a6a8a" />
          <rect x="-8" y="-44" width="24" height="22" rx="8" fill="#4a6a8a" />
          <circle cx="6" cy="-56" r="16" fill="#f0e2cf" />
          <path d="M-10,-60 a16,16 0 0 1 32,0 l0,3 -32,0z" fill="#3a2a1e" />
          <circle cx="12" cy="-56" r="2.7" fill="#2a1f18" />
          <path
            d="M14,-48 q6,3 0,6"
            stroke="#c98a6c"
            strokeWidth="2.6"
            fill="none"
          />
          {/* 差し出す手 */}
          <rect x="18" y="-40" width="34" height="10" rx="5" fill="#4a6a8a" />
          <ellipse cx="54" cy="-35" rx="10" ry="8" fill="#f0e2cf" />
        </g>
      </g>

      {/* 渡っていく硬貨 */}
      <g transform="translate(210,146)">
        <g className="wcl-coin-a">
          <circle r="8" fill="#f5b31c" />
          <circle r="3.5" fill="#c98a12" />
        </g>
      </g>
      <g transform="translate(206,152)">
        <g className="wcl-coin-b">
          <circle r="7" fill="#f5b31c" />
          <circle r="3" fill="#c98a12" />
        </g>
      </g>

      {/* 最後に出る証書 */}
      <g transform="translate(56,158)">
        <g className="wcl-cert">
          <rect x="-26" y="-32" width="52" height="64" rx="2" fill="#f6efe2" />
          <g fill="#a8a08e">
            <rect x="-18" y="-22" width="36" height="4" rx="2" />
            <rect x="-18" y="-12" width="36" height="4" rx="2" />
            <rect x="-18" y="-2" width="26" height="4" rx="2" />
          </g>
          <circle cx="10" cy="16" r="8" fill="#e05252" />
          <path d="M10,24 l-5,12 l5,-4 l5,4z" fill="#c04434" />
        </g>
      </g>

      <style>{`
        .wcl-neptune { transform-box: fill-box; transform-origin: 50% 100%; animation: wcl-hold 3.8s ease-in-out infinite; }
        .wcl-bucket { transform-box: fill-box; transform-origin: 50% 0; animation: wcl-tip 4.6s ease-in-out infinite; }
        .wcl-splash { transform-box: fill-box; transform-origin: 50% 0; animation: wcl-pour 4.6s ease-in infinite; }
        .wcl-pollywog { transform-box: fill-box; transform-origin: 50% 100%; animation: wcl-flinch 4.6s ease-in-out infinite; }
        .wcl-coin-a { transform-box: fill-box; transform-origin: center; opacity: 0; animation: wcl-pay 4.6s ease-in-out infinite; }
        .wcl-coin-b { transform-box: fill-box; transform-origin: center; opacity: 0; animation: wcl-pay 4.6s ease-in-out infinite; animation-delay: -0.5s; }
        .wcl-cert { transform-box: fill-box; transform-origin: 50% 100%; animation: wcl-wave 4.6s ease-in-out infinite; }
        .wcl-sea-a { transform-box: fill-box; transform-origin: center; animation: wcl-drift 6s linear infinite; }
        .wcl-sea-b { transform-box: fill-box; transform-origin: center; animation: wcl-drift 7.4s linear infinite; animation-delay: -2.5s; }
        @keyframes wcl-hold {
          0%, 100% { transform: rotate(-1.6deg); }
          50% { transform: rotate(1.6deg); }
        }
        @keyframes wcl-tip {
          0%, 24% { transform: rotate(0deg); }
          40%, 60% { transform: rotate(-104deg) translate(6px, 0); }
          78%, 100% { transform: rotate(0deg); }
        }
        @keyframes wcl-pour {
          0%, 34% { transform: scaleY(0); opacity: 0; }
          46% { transform: scaleY(0.5); opacity: 0.8; }
          62% { transform: scaleY(1); opacity: 0.8; }
          76%, 100% { transform: scaleY(1.15); opacity: 0; }
        }
        @keyframes wcl-flinch {
          0%, 40% { transform: rotate(0deg); }
          58% { transform: rotate(-7deg) translate(-4px, 3px); }
          84%, 100% { transform: rotate(0deg); }
        }
        @keyframes wcl-pay {
          0%, 12% { transform: translate(-46px, 8px) scale(0.7); opacity: 0; }
          26% { opacity: 1; }
          64% { transform: translate(40px, -8px) scale(1); opacity: 1; }
          82%, 100% { transform: translate(74px, 6px) scale(0.8); opacity: 0; }
        }
        @keyframes wcl-wave {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(4deg) translate(0, -3px); }
        }
        @keyframes wcl-drift {
          0% { transform: translate(-24px, 0); opacity: 0.4; }
          50% { opacity: 0.9; }
          100% { transform: translate(24px, 0); opacity: 0.4; }
        }
        @media (prefers-reduced-motion: reduce) {
          .wcl-neptune, .wcl-bucket, .wcl-splash, .wcl-pollywog,
          .wcl-coin-a, .wcl-coin-b, .wcl-cert, .wcl-sea-a, .wcl-sea-b { animation: none; }
          /* **規則そのものに opacity: 0 を書いている要素は、animation: none だけでは
             消えたままになる。**動きを減らす設定にしている人にだけ、
             出来事そのものが見えなくなる。差し出した硬貨。払ったことが止めた絵にも残るように。 */
          .wcl-coin-a, .wcl-coin-b { opacity: 1; }
        }
      `}</style>
    </svg>
  );
}
