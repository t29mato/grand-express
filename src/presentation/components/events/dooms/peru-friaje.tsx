/**
 * フリアヘ。遥か南から冷たい空気の塊が上がってきて、一夜のうちに
 * アマゾン低地の気温を10度以上下げる。暖房も無く、寒さをしのぐのは
 * ハンモックだけの家々は不意を突かれる。余分な毛布にくるまってやり過ごすほかない。
 *
 * 構図: 泥色の川に面した高床の家。**熱帯の緑の上に、冷たい灰青をかぶせる。**
 * これがこの厄災の要点で、色そのものが災難になっている。
 * 左の家の下でハンモックにくるまった2人、手前に焚き火、川面から冷気が這う。
 *
 * 動くのは4つ: 左から這ってくる冷気の帯、焚き火の炎、ハンモックの揺れ、白い息。
 * 止めても「毛布にくるまった人と、緑にかぶさった冷たい霧」で伝わる。
 */
export function PeruFriaje() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 冷えた明け方の空。熱帯なのに青灰色。 */}
      <rect width="400" height="210" fill="#8fa0ac" />
      <rect width="400" height="104" fill="#a8b8c0" />
      <rect width="400" height="46" fill="#c0cbd0" />

      {/* 奥の密林。冷気で色が沈んでいる。 */}
      <rect y="96" width="400" height="24" fill="#3f6f4a" />
      <g fill="#4f7f52">
        <ellipse cx="40" cy="96" rx="44" ry="16" />
        <ellipse cx="130" cy="92" rx="48" ry="17" />
        <ellipse cx="230" cy="96" rx="46" ry="16" />
        <ellipse cx="330" cy="92" rx="50" ry="17" />
      </g>
      <g stroke="#5f8f5a" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M66,112V88M66,88q-11,-4 -15,3M66,88q11,-4 15,3M66,88q-8,-11 -16,-10M66,88q8,-11 16,-10" />
        <path d="M300,112V86M300,86q-11,-4 -15,3M300,86q11,-4 15,3M300,86q-8,-11 -16,-10M300,86q8,-11 16,-10" />
      </g>

      {/* 泥の川。 */}
      <rect y="120" width="400" height="90" fill="#7a6f52" />
      <rect y="120" width="400" height="8" fill="#8a7f5e" />
      <g stroke="#93885f" strokeWidth="2" opacity="0.5" fill="none">
        <path d="M240,138h110M280,178h100M20,196h70" />
      </g>

      {/* 高床の家(左)。柱の下がそのまま暮らしの場所。 */}
      <g>
        <g fill="#6b5330">
          <rect x="16" y="150" width="6" height="34" />
          <rect x="118" y="150" width="6" height="34" />
          <rect x="66" y="150" width="5" height="34" />
        </g>
        <rect x="10" y="120" width="120" height="30" fill="#a8875a" />
        <path d="M2,120h136l-16,-14H18z" fill="#7f8a84" />
        <rect x="54" y="128" width="20" height="22" fill="#4a4034" />
        <g stroke="#8f7448" strokeWidth="1.6" opacity="0.7" fill="none">
          <path d="M10,132h120M10,140h120" />
        </g>
      </g>

      {/* ハンモックで毛布にくるまった2人。柄を変えてある。 */}
      <g className="peru-fr-hammock1">
        <path
          d="M22,158q28,20 46,0"
          fill="none"
          stroke="#8a7a52"
          strokeWidth="2.4"
        />
        <path
          d="M26,160q22,16 38,0q-4,12 -19,12q-15,0 -19,-12z"
          fill="#c8102e"
        />
        <g fill="#e8b21c">
          <path d="M30,166q15,7 28,0l-2,4q-12,5 -24,0z" />
        </g>
        <circle cx="64" cy="160" r="6" fill="#8a6a48" />
        <path d="M58,158q6,-7 12,0q0,-6 -6,-6q-6,0 -6,6z" fill="#3f3a34" />
      </g>
      <g className="peru-fr-hammock2">
        <path
          d="M72,166q26,18 44,0"
          fill="none"
          stroke="#8a7a52"
          strokeWidth="2.4"
        />
        <path
          d="M76,168q20,14 36,0q-4,11 -18,11q-14,0 -18,-11z"
          fill="#4f6a9a"
        />
        <g fill="#dfe8ee">
          <path d="M80,173q14,6 26,0l-2,3q-11,4 -22,0z" />
        </g>
        <circle cx="112" cy="168" r="5.4" fill="#7a5a3c" />
      </g>

      {/* 手前の焚き火。この寒さでは、これしかない。 */}
      <g transform="translate(268,0)">
        <ellipse cx="0" cy="192" rx="30" ry="8" fill="#6b6048" />
        <g fill="#6b5330">
          <path d="M-18,190l36,-8 2,4 -36,8z" />
          <path d="M-16,182l34,10 -2,4 -34,-10z" />
        </g>
        <g className="peru-fr-fire">
          <path d="M0,182q-13,-12 0,-28q13,16 0,28z" fill="#e8702c" />
          <path d="M0,182q-7,-8 0,-18q7,10 0,18z" fill="#f5b31c" />
          <path d="M0,180q-3,-4 0,-9q3,5 0,9z" fill="#f7e2a0" />
        </g>
        <ellipse
          cx="0"
          cy="178"
          rx="42"
          ry="20"
          fill="#f5b31c"
          opacity="0.09"
        />
      </g>

      {/* 白い息。寒いことの証拠。 */}
      <g className="peru-fr-breath" fill="#e8eef2" opacity="0.75">
        <ellipse cx="76" cy="156" rx="7" ry="4" />
        <ellipse cx="122" cy="164" rx="6" ry="3.4" />
      </g>

      {/* 南から這ってくる冷気。**ここが主に動く。**
          薄く広く何層にも重ねること。濃い楕円を数枚置くと、水たまりに見える。 */}
      <g className="peru-fr-chill1" fill="#dfe8ee" opacity="0.3">
        <ellipse cx="120" cy="114" rx="150" ry="7" />
        <ellipse cx="300" cy="140" rx="130" ry="6" />
      </g>
      <g className="peru-fr-chill2" fill="#eef4f6" opacity="0.26">
        <ellipse cx="260" cy="100" rx="140" ry="6" />
        <ellipse cx="90" cy="192" rx="150" ry="7" />
      </g>

      <style>{`
        .peru-fr-chill1 {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: peru-fr-creep 5.4s linear infinite;
        }
        .peru-fr-chill2 {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: peru-fr-creep 7.6s linear -3s infinite;
        }
        @keyframes peru-fr-creep {
          0% { transform: translateX(-46px); opacity: 0.16; }
          50% { opacity: 0.6; }
          100% { transform: translateX(46px); opacity: 0.16; }
        }
        .peru-fr-fire {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: peru-fr-flicker 1.3s ease-in-out infinite;
        }
        @keyframes peru-fr-flicker {
          0%, 100% { transform: scale(1) skewX(0deg); }
          35% { transform: scale(0.86, 1.14) skewX(7deg); }
          70% { transform: scale(1.1, 0.9) skewX(-6deg); }
        }
        .peru-fr-hammock1 {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: peru-fr-swing 3.6s ease-in-out infinite;
        }
        .peru-fr-hammock2 {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: peru-fr-swing 4.4s ease-in-out -1.4s infinite;
        }
        @keyframes peru-fr-swing {
          0%, 100% { transform: rotate(-1.6deg); }
          50% { transform: rotate(1.6deg); }
        }
        .peru-fr-breath {
          transform-box: fill-box;
          transform-origin: 0% 50%;
          animation: peru-fr-puff 3.2s ease-in-out infinite;
        }
        @keyframes peru-fr-puff {
          0%, 100% { transform: scale(0.5); opacity: 0; }
          40% { transform: scale(1); opacity: 0.8; }
          80% { transform: scale(1.5) translateX(6px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .peru-fr-chill1,
          .peru-fr-chill2,
          .peru-fr-fire,
          .peru-fr-hammock1,
          .peru-fr-hammock2,
          .peru-fr-breath { animation: none; }
        }
      `}</style>
    </svg>
  );
}
