/**
 * バオ(台風)が中部沿岸を通る。沿岸で縛っていなかったものは何もかもなぎ倒す。
 * 統一急行は、ハイヴァン峠周辺の吹きさらしの区間で危険を冒すより、
 * 運休が明けるのを待つこともある。
 *
 * 構図: 海に迫る峠の斜面。**待っている列車**を中景に置くのがこの厄災の要点で、
 * 壊れた線路ではなく「今日は行かない」という判断を描く。
 * 左手前で2人が屋根に重しを載せ、右手前に浜へ引き上げた小舟。
 *
 * **壊れた建物も飛ばされる人も描かない。**傾いても折れない椰子と、
 * 縛りつけている手で伝える。
 *
 * 動くのは5つ: 横殴りの雨、しなる椰子、はためく防水布、
 * 波しぶき、待っている列車の窓明かり。
 * 止めても「峠で停まった列車と、屋根を押さえる人」で伝わる。
 *
 * (オーストラリア盤のサイクロンとは別物にする: あちらは無人で、渦雲と
 *  しなるユーカリだけ。こちらは**人が備えていて、列車が待っている。**)
 */
export function VietnamBao() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 荒れた空。低く垂れ込めた雲。 */}
      <rect width="400" height="210" fill="#5f6f70" />
      <rect width="400" height="96" fill="#6f7f80" />
      <rect width="400" height="40" fill="#7f8c8c" />
      <g fill="#59696a" opacity="0.9">
        <ellipse cx="70" cy="26" rx="88" ry="20" />
        <ellipse cx="250" cy="18" rx="110" ry="22" />
        <ellipse cx="370" cy="34" rx="70" ry="17" />
      </g>

      {/* 峠の斜面。海へ落ちている。 */}
      <path d="M0,96q90,-16 168,10q78,26 232,-6v110H0z" fill="#3f5f4a" />
      <path d="M0,116q86,-12 160,10q74,22 240,-4v88H0z" fill="#4f7050" />

      {/* 荒れた海(右下)。 */}
      <path d="M236,210q6,-46 34,-64q40,-26 130,-24v88z" fill="#3f5a62" />
      <g
        className="vietnam-bao-surf"
        fill="none"
        stroke="#dfe8e6"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.8"
      >
        <path d="M262,162q22,-9 44,0M300,184q26,-10 52,0" />
      </g>

      {/* 峠の線路と、待っている統一急行。 */}
      <g>
        <path
          d="M0,150q80,-10 150,6q70,16 130,4"
          fill="none"
          stroke="#4a4a44"
          strokeWidth="7"
        />
        <path
          d="M0,150q80,-10 150,6q70,16 130,4"
          fill="none"
          stroke="#6f6f66"
          strokeWidth="2.4"
        />
      </g>
      <g transform="translate(120,0)">
        <rect x="-58" y="120" width="118" height="30" rx="4" fill="#c8b48a" />
        <rect x="-58" y="120" width="118" height="7" fill="#da251d" />
        <rect x="-58" y="140" width="118" height="4" fill="#da251d" />
        <g className="vietnam-bao-lit" fill="#f5d98a">
          <rect x="-50" y="130" width="16" height="9" />
          <rect x="-28" y="130" width="16" height="9" />
          <rect x="-6" y="130" width="16" height="9" />
          <rect x="16" y="130" width="16" height="9" />
          <rect x="38" y="130" width="16" height="9" />
        </g>
        <g fill="#2f3238">
          <circle cx="-40" cy="152" r="5" />
          <circle cx="42" cy="152" r="5" />
        </g>
      </g>

      {/* しなる椰子。折れない。 */}
      <g
        className="vietnam-bao-palm1"
        stroke="#6b5330"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      >
        <path d="M40,178q-6,-26 -2,-44" />
      </g>
      <g
        className="vietnam-bao-palm1"
        stroke="#3f7a4a"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      >
        <path d="M38,134q-22,-4 -32,6M38,134q-20,-14 -34,-12M38,134q16,-8 30,-2M38,134q12,-14 26,-16" />
      </g>
      <g
        className="vietnam-bao-palm2"
        stroke="#6b5330"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      >
        <path d="M348,150q-6,-22 -2,-36" />
      </g>
      <g
        className="vietnam-bao-palm2"
        stroke="#3f7a4a"
        strokeWidth="3.4"
        fill="none"
        strokeLinecap="round"
      >
        <path d="M346,114q-18,-3 -26,5M346,114q14,-7 26,-2M346,114q10,-12 22,-13" />
      </g>

      {/* 屋根に重しを載せる2人(左手前)。 */}
      <g>
        <path d="M-6,210v-32h108v32z" fill="#c9a878" />
        <path d="M-10,178h116l-14,-18H4z" fill="#8f9298" />
        <g fill="#6f7278">
          <rect x="8" y="164" width="18" height="7" rx="2" />
          <rect x="38" y="162" width="18" height="7" rx="2" />
          <rect x="68" y="166" width="18" height="7" rx="2" />
        </g>
        {/* 梯子の上の人 */}
        <g transform="translate(96,0)">
          <g className="vietnam-bao-tie">
            <path d="M-8,182q0,-22 8,-22q8,0 8,22z" fill="#e8b21c" />
            <circle cx="0" cy="150" r="8" fill="#8a6a48" />
            <path d="M-9,148q9,-9 18,0q0,-8 -9,-8q-9,0 -9,8z" fill="#da251d" />
            <path
              d="M-6,164q-14,-6 -18,-14"
              stroke="#e8b21c"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
            />
          </g>
          <g stroke="#8a6a46" strokeWidth="3" fill="none">
            <path d="M6,210V172M20,210V172M6,204h14M6,194h14M6,184h14" />
          </g>
        </g>
        {/* 下で支える人 */}
        <g transform="translate(52,0)">
          <path d="M-9,210v-26q0,-6 9,-6q9,0 9,6v26z" fill="#2f8f8a" />
          <circle cx="0" cy="168" r="8.4" fill="#8a6a48" />
          <path d="M-10,166h20l-4,-6h-12z" fill="#e0c890" />
          <path
            d="M6,180q14,-6 20,-16"
            stroke="#2f8f8a"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      </g>

      {/* 屋根に張った防水布。端がはためいている。 */}
      <g className="vietnam-bao-tarp">
        <path d="M118,172h62l4,26q-16,6 -34,2q-18,-4 -32,2z" fill="#2f6fb0" />
        <path d="M118,172h62l1,6h-64z" fill="#255e98" />
        <g stroke="#1f4f80" strokeWidth="1.6" opacity="0.7" fill="none">
          <path d="M138,172v26M158,172v26" />
        </g>
        <g fill="#e0d8c0">
          <circle cx="122" cy="176" r="2.4" />
          <circle cx="176" cy="176" r="2.4" />
        </g>
      </g>
      <g stroke="#c9b48e" strokeWidth="2" fill="none">
        <path d="M122,176l-16,10M176,176l18,8" />
      </g>

      {/* 浜へ引き上げた小舟(右手前)。 */}
      <g transform="translate(320,0)">
        <path d="M-34,196h68l-10,12h-48z" fill="#da251d" />
        <path
          d="M-30,196q30,-10 60,0"
          fill="none"
          stroke="#a81c16"
          strokeWidth="3"
        />
        <g fill="#8a6a46">
          <rect x="-24" y="190" width="4" height="8" />
          <rect x="20" y="190" width="4" height="8" />
        </g>
      </g>

      {/* 横殴りの雨。**ここが主に動く。** */}
      <g
        className="vietnam-bao-rain1"
        stroke="#c8dce0"
        strokeWidth="2"
        opacity="0.55"
        strokeLinecap="round"
        fill="none"
      >
        <path d="M20,0l-16,34M80,0L64,34M140,0l-16,34M200,0l-16,34M260,0l-16,34M320,0l-16,34M380,0l-16,34" />
      </g>
      <g
        className="vietnam-bao-rain2"
        stroke="#dfeaec"
        strokeWidth="1.6"
        opacity="0.45"
        strokeLinecap="round"
        fill="none"
      >
        <path d="M50,0L34,34M110,0L94,34M170,0l-16,34M230,0l-16,34M290,0l-16,34M350,0l-16,34" />
      </g>

      <style>{`
        .vietnam-bao-rain1 {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: vietnam-bao-fall 0.7s linear infinite;
        }
        .vietnam-bao-rain2 {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: vietnam-bao-fall 0.5s linear -0.25s infinite;
        }
        @keyframes vietnam-bao-fall {
          0% { transform: translate(24px, -36px); }
          100% { transform: translate(-24px, 216px); }
        }
        .vietnam-bao-palm1 {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: vietnam-bao-bend 1.7s ease-in-out infinite;
        }
        .vietnam-bao-palm2 {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: vietnam-bao-bend 2.1s ease-in-out -0.6s infinite;
        }
        @keyframes vietnam-bao-bend {
          0%, 100% { transform: skewX(-6deg); }
          50% { transform: skewX(-18deg); }
        }
        .vietnam-bao-tarp {
          transform-box: fill-box;
          transform-origin: 0% 50%;
          animation: vietnam-bao-flap 0.9s ease-in-out infinite;
        }
        @keyframes vietnam-bao-flap {
          0%, 100% { transform: scaleY(1) rotate(0deg); }
          50% { transform: scaleY(0.6) rotate(-7deg); }
        }
        .vietnam-bao-tie {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: vietnam-bao-hold 1.7s ease-in-out infinite;
        }
        @keyframes vietnam-bao-hold {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-5deg); }
        }
        .vietnam-bao-surf {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: vietnam-bao-break 1.5s ease-out infinite;
        }
        @keyframes vietnam-bao-break {
          0% { transform: scale(0.6); opacity: 0.3; }
          55% { transform: scale(1.2); opacity: 0.85; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .vietnam-bao-lit {
          animation: vietnam-bao-wait 3.4s ease-in-out infinite;
        }
        @keyframes vietnam-bao-wait {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.62; }
        }
        @media (prefers-reduced-motion: reduce) {
          .vietnam-bao-rain1,
          .vietnam-bao-rain2,
          .vietnam-bao-palm1,
          .vietnam-bao-palm2,
          .vietnam-bao-tarp,
          .vietnam-bao-tie,
          .vietnam-bao-surf,
          .vietnam-bao-lit { animation: none; }
        }
      `}</style>
    </svg>
  );
}
