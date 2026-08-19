/**
 * バスターミナルで盗みに遭う。ターミナルは出発案内と物売りの声でうるさく、
 * 持ち主が待つ席を見つける前に、開いたままのバッグに手が忍び込んでいた。
 * ターミナルの警察は3か国語で警告を貼り出しているが、誰もそれを事が起きるまで読まない。
 *
 * 構図: 昼のバスターミナル。**騒がしさそのものを描く。**
 * 奥に停まったバス2台と出発案内板、右に盆を提げた物売り。
 * 中央左のベンチに口の開いたバッグ、その持ち主は案内板のほうを向いて立っている。
 * ベンチの後ろから伸びた腕が、バッグの中へ入っている。
 *
 * **顔のある泥棒は描かない。**見えるのは腕だけ。誰かを悪者の顔にしない。
 *
 * 動くのは5つ: 伸びて引っ込む腕、浮き上がる財布、案内板のめくれ、
 * 物売りの呼び声の輪、バスの方向指示灯。
 * 止めても「口の開いたバッグに入った手と、よそを向いた持ち主」で伝わる。
 *
 * (アジア盤のすりとは別物にする: あちらは無人のバザールで、伸びる手だけ。
 *  こちらは**昼の混雑した場所**で、持ち主も物売りもバスもいる。)
 */
export function PeruRoboTerminal() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* ターミナルの屋根の下。 */}
      <rect width="400" height="210" fill="#b8ab90" />
      <rect width="400" height="86" fill="#8f9298" />
      <rect width="400" height="22" fill="#7a7e84" />
      <g stroke="#6f7278" strokeWidth="3" opacity="0.6" fill="none">
        <path d="M60,22v14M200,22v14M340,22v14" />
      </g>

      {/* 出発案内板。数字も文字も描かない。めくれる札だけ。 */}
      <g transform="translate(250,0)">
        <rect x="-56" y="26" width="112" height="44" rx="3" fill="#2f3a44" />
        <g fill="#c9d4dc">
          <rect x="-48" y="32" width="34" height="7" />
          <rect x="-8" y="32" width="26" height="7" />
          <rect x="26" y="32" width="22" height="7" />
          <rect x="-48" y="44" width="30" height="7" />
          <rect x="-8" y="44" width="30" height="7" />
          <rect x="-48" y="56" width="26" height="7" />
        </g>
        <g className="peru-rt-flip" fill="#e8b21c">
          <rect x="26" y="44" width="22" height="7" />
          <rect x="26" y="56" width="18" height="7" />
        </g>
        <rect x="-4" y="70" width="8" height="16" fill="#6f7278" />
      </g>

      {/* 停まったバス2台(奥)。 */}
      <g>
        <rect x="6" y="52" width="112" height="42" rx="4" fill="#c8102e" />
        <rect x="6" y="52" width="112" height="9" fill="#e8b21c" />
        <g fill="#5c7080">
          <rect x="14" y="66" width="20" height="14" />
          <rect x="38" y="66" width="20" height="14" />
          <rect x="62" y="66" width="20" height="14" />
          <rect x="86" y="66" width="24" height="14" />
        </g>
        <g fill="#2f3238">
          <circle cx="28" cy="96" r="7" />
          <circle cx="98" cy="96" r="7" />
        </g>
        <circle
          className="peru-rt-blink"
          cx="118"
          cy="72"
          r="4.4"
          fill="#f5a02a"
        />
      </g>
      <g>
        <rect x="136" y="60" width="86" height="34" rx="4" fill="#3f8f7a" />
        <rect x="136" y="60" width="86" height="7" fill="#efe7d4" />
        <g fill="#5c7080">
          <rect x="142" y="72" width="17" height="11" />
          <rect x="163" y="72" width="17" height="11" />
          <rect x="184" y="72" width="17" height="11" />
        </g>
        <g fill="#2f3238">
          <circle cx="152" cy="96" r="6" />
          <circle cx="206" cy="96" r="6" />
        </g>
      </g>

      {/* 床。 */}
      <rect y="100" width="400" height="110" fill="#b8ab90" />
      <rect y="100" width="400" height="5" fill="#a2957c" />
      <g stroke="#a2957c" strokeWidth="2" opacity="0.55" fill="none">
        <path d="M0,132h400M0,164h400M0,196h400M70,100v110M170,100v110M270,100v110M370,100v110" />
      </g>

      {/* ベンチと、口の開いたバッグ。**止めても残る主役。** */}
      <g transform="translate(96,0)">
        <rect x="-56" y="148" width="126" height="9" fill="#8a6a46" />
        <rect x="-56" y="130" width="126" height="8" fill="#8a6a46" />
        <g fill="#6b5330">
          <rect x="-50" y="157" width="7" height="26" />
          <rect x="56" y="157" width="7" height="26" />
        </g>
        {/* バッグ。口が開いている */}
        <path d="M-24,148v-20q0,-9 12,-9h20q12,0 12,9v20z" fill="#3f6a8a" />
        <path d="M-24,132h44v6h-44z" fill="#2f5470" />
        <path
          d="M-20,128q10,-8 22,-2q10,5 14,2q-2,-9 -14,-11q-14,-2 -22,11z"
          fill="#8fb0c4"
        />
        <path
          d="M-8,119v-7a10,7 0 0 1 20,0v7"
          fill="none"
          stroke="#2f5470"
          strokeWidth="3"
        />
      </g>

      {/* ベンチの後ろから伸びた腕。**見えるのはここだけ。顔は描かない。**
          袖を暗い色にして、肌との境目で「別の誰かの腕」だと分かるようにする。 */}
      <g className="peru-rt-arm">
        <path
          d="M10,118q30,-8 52,6"
          fill="none"
          stroke="#3f3a4a"
          strokeWidth="13"
          strokeLinecap="round"
        />
        <path
          d="M52,120q12,2 20,8"
          fill="none"
          stroke="#7a5a3c"
          strokeWidth="11"
          strokeLinecap="round"
        />
        <ellipse cx="76" cy="130" rx="10" ry="7.6" fill="#8a6a48" />
        <path
          d="M72,134q6,4 12,0"
          fill="none"
          stroke="#7a5a3c"
          strokeWidth="2"
        />
      </g>
      {/* 浮き上がる財布。 */}
      <g className="peru-rt-purse">
        <rect x="80" y="112" width="20" height="14" rx="2.4" fill="#8a4a2c" />
        <rect x="80" y="118" width="20" height="3" fill="#6b3a20" />
        <circle cx="96" cy="119" r="2" fill="#e8b21c" />
      </g>

      {/* 持ち主。案内板のほうを向いて立っている。**気づいていない。** */}
      <g transform="translate(178,0)">
        <path d="M-10,196q0,-30 10,-30q10,0 10,30z" fill="#7f4a8a" />
        <circle cx="0" cy="154" r="10" fill="#8a6a48" />
        <path
          d="M-10,152q10,-11 20,-1q1,-8 -10,-8q-11,0 -10,9z"
          fill="#3f3a34"
        />
        <path
          d="M6,150h6"
          stroke="#8a6a48"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M-8,196l-5,12M8,196l5,12"
          stroke="#3f3a34"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M10,172q14,-6 22,-18"
          stroke="#7f4a8a"
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* 物売り。盆を提げて呼んでいる。 */}
      <g transform="translate(332,0)">
        <path d="M-12,198q0,-32 12,-32q12,0 12,32z" fill="#c8102e" />
        <path d="M-10,178h24" stroke="#e8b21c" strokeWidth="4" fill="none" />
        <circle cx="0" cy="154" r="10" fill="#8a6a48" />
        <path d="M-11,150h22l-4,-6h-14z" fill="#e8b21c" />
        <path d="M-9,164h18" stroke="#8a6a46" strokeWidth="2" fill="none" />
        <rect x="-26" y="164" width="52" height="7" rx="2" fill="#c9b48e" />
        <g fill="#e8901c">
          <circle cx="-14" cy="161" r="4" />
          <circle cx="-2" cy="161" r="4" />
          <circle cx="10" cy="161" r="4" />
        </g>
        <path
          d="M-8,198l-5,12M8,198l5,12"
          stroke="#3f3a34"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />
        {/* 呼び声 */}
        <g
          className="peru-rt-call"
          fill="none"
          stroke="#efe7d4"
          strokeWidth="2.2"
          strokeLinecap="round"
        >
          <path d="M14,142q7,-5 7,-13M20,146q11,-7 11,-19" />
        </g>
      </g>

      <style>{`
        .peru-rt-arm {
          transform-box: fill-box;
          transform-origin: 0% 50%;
          animation: peru-rt-reach 3.6s ease-in-out infinite;
        }
        @keyframes peru-rt-reach {
          0%, 100% { transform: translateX(-14px); opacity: 0.85; }
          40%, 62% { transform: translateX(0); opacity: 1; }
        }
        .peru-rt-purse {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: peru-rt-lift 3.6s ease-in-out infinite;
        }
        @keyframes peru-rt-lift {
          0%, 45% { transform: translateY(14px); opacity: 0; }
          62% { transform: translateY(0); opacity: 1; }
          88%, 100% { transform: translate(-16px, -8px); opacity: 0; }
        }
        .peru-rt-flip {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: peru-rt-turnover 1.9s steps(2, end) infinite;
        }
        @keyframes peru-rt-turnover {
          0%, 100% { transform: scaleY(1); opacity: 1; }
          50% { transform: scaleY(0.15); opacity: 0.5; }
        }
        .peru-rt-call {
          transform-box: fill-box;
          transform-origin: 0% 100%;
          animation: peru-rt-shout 1.5s ease-out infinite;
        }
        @keyframes peru-rt-shout {
          0% { transform: scale(0.6); opacity: 0.9; }
          100% { transform: scale(1.25); opacity: 0; }
        }
        .peru-rt-blink {
          animation: peru-rt-indicator 1.1s steps(1, end) infinite;
        }
        @keyframes peru-rt-indicator {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0.2; }
        }
        @media (prefers-reduced-motion: reduce) {
          .peru-rt-arm,
          .peru-rt-purse,
          .peru-rt-flip,
          .peru-rt-call,
          .peru-rt-blink { animation: none; }
        }
      `}</style>
    </svg>
  );
}
