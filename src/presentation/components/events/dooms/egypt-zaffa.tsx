/**
 * 結婚式の行列(ザッファ)。太鼓とラッパを鳴らし、新郎新婦の後ろで踊る人々を
 * 従えた行列が通りの真ん中を進んでくる。車も無理に割り込まず、ただ止まる。
 * 歩行者も運転手も、通り過ぎる楽団員の手に小銭を握らせることになる。
 *
 * 構図: 夜の街路。両側に建て増しの集合住宅と電飾、真ん中を行列が来る。
 * 太鼓打ち・ラッパ吹き・新郎新婦・踊る人と、**5人それぞれ体つきも服も別**にしてある。
 * 手前右に、止まった車の窓から差し出された手と小銭。
 *
 * **7枚のうちでいちばん賑やかで暖かい絵。**災難ではあるが不機嫌な顔は描かない。
 *
 * 動くのは5つ: 電飾の明滅、太鼓を打つ腕、ラッパの上下、踊る人の跳ね、
 * 差し出された小銭のきらめき。止めても「通りを埋める行列と止まった車」で伝わる。
 */
export function EgyptZaffa() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜の街。地色は暖かい藍。 */}
      <rect width="400" height="210" fill="#26304a" />
      <rect width="400" height="80" fill="#1e2740" />

      {/* 両側の建て増しの集合住宅。窓の明かりだけで街を作る。 */}
      <g fill="#3a3348">
        <rect x="0" y="24" width="66" height="126" />
        <rect x="68" y="46" width="46" height="104" />
        <rect x="286" y="34" width="54" height="116" />
        <rect x="342" y="58" width="58" height="92" />
      </g>
      <g fill="#f2c96a" opacity="0.85">
        <rect x="10" y="38" width="12" height="13" />
        <rect x="30" y="38" width="12" height="13" />
        <rect x="10" y="62" width="12" height="13" />
        <rect x="46" y="62" width="12" height="13" />
        <rect x="30" y="86" width="12" height="13" />
        <rect x="78" y="60" width="11" height="12" />
        <rect x="96" y="84" width="11" height="12" />
        <rect x="296" y="48" width="12" height="13" />
        <rect x="318" y="48" width="12" height="13" />
        <rect x="296" y="74" width="12" height="13" />
        <rect x="354" y="72" width="12" height="13" />
        <rect x="376" y="96" width="12" height="13" />
      </g>

      {/* 通りを渡す電飾。**ここが明滅する。** */}
      <path
        d="M8,30 q96,34 190,30 q94,-4 194,-34"
        fill="none"
        stroke="#6a5f52"
        strokeWidth="1.6"
      />
      <g className="egypt-za-lights1" fill="#f5b31c">
        <circle cx="52" cy="45" r="4.4" />
        <circle cx="118" cy="56" r="4.4" />
        <circle cx="198" cy="60" r="4.4" />
        <circle cx="278" cy="56" r="4.4" />
        <circle cx="344" cy="44" r="4.4" />
      </g>
      <g className="egypt-za-lights2" fill="#e8574a">
        <circle cx="84" cy="51" r="4" />
        <circle cx="158" cy="59" r="4" />
        <circle cx="238" cy="59" r="4" />
        <circle cx="312" cy="51" r="4" />
      </g>

      {/* 路面。 */}
      <rect y="150" width="400" height="60" fill="#3d4258" />
      <rect y="150" width="400" height="6" fill="#4c5268" />
      <g
        stroke="#5a6076"
        strokeWidth="3"
        strokeDasharray="16 14"
        fill="none"
        opacity="0.6"
      >
        <path d="M0,200 h400" />
      </g>

      {/* 止まった車。ヘッドライトだけが行列を照らす。 */}
      <g>
        <rect x="316" y="164" width="64" height="22" rx="4" fill="#c94f3c" />
        <rect x="330" y="152" width="34" height="14" rx="3" fill="#c94f3c" />
        <rect x="334" y="155" width="26" height="9" fill="#8fc4d8" />
        <g fill="#20242e">
          <circle cx="332" cy="187" r="7" />
          <circle cx="366" cy="187" r="7" />
        </g>
        <circle cx="316" cy="176" r="5" fill="#f7e2a0" />
        <path
          d="M311,172 L272,164 v20 L311,180z"
          fill="#f7e2a0"
          opacity="0.13"
        />
      </g>

      {/* 行列。左から右へ、通りいっぱいに。5人それぞれ別の体つき・服。 */}
      {/* 太鼓打ち。 */}
      <g transform="translate(44,0)">
        <circle cx="0" cy="132" r="9" fill="#6d5238" />
        <path d="M-9,130 q9,-9 18,-1 l1,-5 q-9,-6 -19,1z" fill="#efe5cd" />
        <path d="M-8,142 q-4,22 -2,38 h20 q-5,-24 -5,-38z" fill="#c94f3c" />
        <path
          d="M-5,180 l-6,10 M9,180 l6,10"
          stroke="#3a3348"
          strokeWidth="5"
          fill="none"
        />
        <ellipse cx="14" cy="158" rx="12" ry="14" fill="#e8b21c" />
        <ellipse
          cx="14"
          cy="158"
          rx="12"
          ry="14"
          fill="none"
          stroke="#a8762c"
          strokeWidth="2.4"
        />
        <g className="egypt-za-beat">
          <path
            d="M6,148 q14,-10 24,-4"
            stroke="#6d5238"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      </g>
      {/* ラッパ吹き。 */}
      <g transform="translate(102,0)">
        <circle cx="0" cy="128" r="8.4" fill="#7a5a3c" />
        <path d="M-7,138 q-3,20 -1,34 h16 q-4,-22 -4,-34z" fill="#3f9f7f" />
        <path
          d="M-4,172 l-5,12 M8,172 l5,12"
          stroke="#3a3348"
          strokeWidth="4.6"
          fill="none"
        />
        <g className="egypt-za-horn">
          <path
            d="M4,126 L26,112"
            stroke="#f5b31c"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          <path d="M24,106 l12,-6 -2,16 -12,2z" fill="#f5b31c" />
        </g>
      </g>
      {/* 新婦と新郎。行列の真ん中。 */}
      <g transform="translate(174,0)">
        <circle cx="0" cy="126" r="8.6" fill="#6d5238" />
        <path
          d="M-10,124 q10,-10 20,-1 q0,-7 -10,-7 q-10,0 -10,8z"
          fill="#20242e"
        />
        <path d="M-9,136 q-4,26 -2,46 h22 q-5,-28 -5,-46z" fill="#f2ece0" />
        <g fill="#f2ece0" opacity="0.55">
          <path d="M-14,150 q14,-8 28,0 l4,32 h-36z" />
        </g>
      </g>
      <g transform="translate(210,0)">
        <circle cx="0" cy="128" r="8.2" fill="#7a5a3c" />
        <path d="M-8,138 q-3,24 -1,44 h18 q-4,-26 -4,-44z" fill="#2b3350" />
        <path d="M-2,138 v20" stroke="#efe5cd" strokeWidth="4" fill="none" />
        <path
          d="M-4,182 l-5,10 M8,182 l5,10"
          stroke="#20242e"
          strokeWidth="5"
          fill="none"
        />
      </g>
      {/* 踊る人2人。跳ねる。 */}
      <g transform="translate(252,0)">
        <g className="egypt-za-dance1">
          <circle cx="0" cy="134" r="7.6" fill="#6d5238" />
          <path d="M-7,142 q-3,20 -1,34 h15 q-3,-22 -3,-34z" fill="#e8b21c" />
          <path
            d="M-6,148 q-12,-8 -14,-20 M8,148 q12,-8 14,-20"
            stroke="#e8b21c"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      </g>
      <g transform="translate(288,0)">
        <g className="egypt-za-dance2">
          <circle cx="0" cy="138" r="7" fill="#7a5a3c" />
          <path d="M-6,146 q-2,17 -1,30 h13 q-3,-19 -3,-30z" fill="#7f6ac4" />
          <path
            d="M-5,152 q-11,-4 -15,-14 M7,152 q10,4 12,14"
            stroke="#7f6ac4"
            strokeWidth="4.6"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      </g>

      {/* 車の窓から差し出された手と小銭。 */}
      <g transform="translate(322,0)">
        <path
          d="M0,158 q-14,-2 -22,4"
          stroke="#7a5a3c"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        <g className="egypt-za-coin" fill="#f5d05a">
          <circle cx="-28" cy="158" r="4" />
          <circle cx="-36" cy="150" r="3" />
        </g>
      </g>

      <style>{`
        .egypt-za-lights1 {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: egypt-za-blink 1.4s ease-in-out infinite;
        }
        .egypt-za-lights2 {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: egypt-za-blink 1.4s ease-in-out -0.7s infinite;
        }
        @keyframes egypt-za-blink {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 1; }
        }
        .egypt-za-beat {
          transform-box: fill-box;
          transform-origin: 0% 100%;
          animation: egypt-za-hit 0.62s ease-in-out infinite;
        }
        @keyframes egypt-za-hit {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(22deg); }
        }
        .egypt-za-horn {
          transform-box: fill-box;
          transform-origin: 0% 100%;
          animation: egypt-za-blow 1.24s ease-in-out infinite;
        }
        @keyframes egypt-za-blow {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-9deg); }
        }
        .egypt-za-dance1 {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: egypt-za-hop 0.62s ease-in-out infinite;
        }
        .egypt-za-dance2 {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: egypt-za-hop 0.62s ease-in-out -0.31s infinite;
        }
        @keyframes egypt-za-hop {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50% { transform: translateY(-7px) rotate(3deg); }
        }
        .egypt-za-coin {
          transform-box: fill-box;
          transform-origin: 100% 100%;
          animation: egypt-za-toss 1.24s ease-in-out infinite;
        }
        @keyframes egypt-za-toss {
          0%, 100% { transform: translate(0, 0); opacity: 1; }
          50% { transform: translate(-8px, -9px); opacity: 0.55; }
        }
        @media (prefers-reduced-motion: reduce) {
          .egypt-za-lights1,
          .egypt-za-lights2,
          .egypt-za-beat,
          .egypt-za-horn,
          .egypt-za-dance1,
          .egypt-za-dance2,
          .egypt-za-coin { animation: none; }
        }
      `}</style>
    </svg>
  );
}
