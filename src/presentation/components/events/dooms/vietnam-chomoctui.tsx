/**
 * チョー・モック・トゥイ(市場ですりに遭う)。混み合う露店の合間で
 * 肩がぶつかった程度にしか感じなかったが、次の店に着いてはじめてポケットの軽さに気づいた。
 * 値切る声と買い物客の人混みの中で、近くの誰も何にも気づかなかった。
 *
 * 構図: 昼の市場。**混んでいることそのものを描く。**
 * 天秤棒で籠を担ぐ売り手、円錐の笠、積み上げた果物、日よけの布。
 * 中央左で**2人の肩がぶつかっていて**、その右で財布がもう別の手にある。
 * ほかの誰も、そちらを見ていない。
 *
 * **顔のある泥棒は描かない。**すれ違う2人はどちらも普通の買い物客に見え、
 * 見えるのは「離れていく手と財布」だけ。誰かを悪者の顔にしない。
 *
 * 動くのは5つ: ぶつかる肩の揺れ、離れていく財布、値切る声の輪、
 * 天秤棒のしなり、日よけ布のはためき。
 * 止めても「ぶつかった2人と、その先で持ち去られている財布」で伝わる。
 *
 * (アジア盤のすりとは別物にする: あちらは無人のバザールで、ポケットへ伸びる手だけ。
 *  ペルー盤とも別物にする: あちらはバスターミナルのベンチと、背後から伸びる腕。
 *  こちらは**すれ違いざまの肩**で、手はもう離れている。)
 */
export function VietnamChomoctui() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 市場の屋根の下。明るいが日陰。 */}
      <rect width="400" height="210" fill="#b8a882" />
      <rect width="400" height="60" fill="#8f8266" />
      <rect width="400" height="18" fill="#7a6f56" />
      <g stroke="#6a6048" strokeWidth="3" opacity="0.7" fill="none">
        <path d="M50,18v10M150,18v10M250,18v10M350,18v10" />
      </g>

      {/* 日よけの布。色ちがいで市場らしさを出す。 */}
      <g className="vietnam-cm-awning1">
        <path d="M-4,28h130l8,20H2z" fill="#da251d" />
        <path d="M2,48h132l-4,7H4z" fill="#b81f18" />
      </g>
      <g className="vietnam-cm-awning2">
        <path d="M150,30h124l8,20h-136z" fill="#2f8f8a" />
        <path d="M154,50h128l-4,7H156z" fill="#25736f" />
      </g>
      <g className="vietnam-cm-awning1">
        <path d="M296,26h110l6,20H290z" fill="#e8b21c" />
      </g>

      {/* 奥の露店の棚と、積んだ果物。 */}
      <g fill="#a8875a">
        <rect x="10" y="88" width="112" height="9" />
        <rect x="164" y="92" width="104" height="9" />
        <rect x="306" y="88" width="94" height="9" />
      </g>
      <g fill="#8a6a46">
        <rect x="16" y="97" width="6" height="22" />
        <rect x="110" y="97" width="6" height="22" />
        <rect x="170" y="101" width="6" height="20" />
        <rect x="256" y="101" width="6" height="20" />
        <rect x="312" y="97" width="6" height="22" />
        <rect x="388" y="97" width="6" height="22" />
      </g>
      <g fill="#e8901c">
        <circle cx="30" cy="82" r="7" />
        <circle cx="46" cy="82" r="7" />
        <circle cx="62" cy="82" r="7" />
        <circle cx="38" cy="72" r="7" />
        <circle cx="54" cy="72" r="7" />
      </g>
      <g fill="#5f9f43">
        <circle cx="88" cy="82" r="7.4" />
        <circle cx="104" cy="82" r="7.4" />
        <circle cx="96" cy="72" r="7.4" />
      </g>
      <g fill="#c8384f">
        <circle cx="330" cy="82" r="7" />
        <circle cx="346" cy="82" r="7" />
        <circle cx="362" cy="82" r="7" />
        <circle cx="338" cy="72" r="7" />
      </g>
      <g fill="#e8c84a">
        <ellipse cx="196" cy="86" rx="16" ry="7" />
        <ellipse cx="228" cy="86" rx="16" ry="7" />
      </g>

      {/* 市場の床。 */}
      <rect y="118" width="400" height="92" fill="#b8a882" />
      <rect y="118" width="400" height="5" fill="#c4b48e" />
      <g stroke="#a89878" strokeWidth="2" opacity="0.55" fill="none">
        <path d="M0,150h400M0,182h400M80,118v92M200,118v92M320,118v92" />
      </g>

      {/* 天秤棒で籠を担ぐ売り手(右)。 */}
      <g transform="translate(336,0)">
        <g className="vietnam-cm-pole">
          <path
            d="M-38,132h76"
            stroke="#a88a56"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M-34,132v10M34,132v10"
            stroke="#a88a56"
            strokeWidth="2"
            fill="none"
          />
          <path d="M-46,142h24l-4,16h-16z" fill="#c9a878" />
          <path d="M22,142h24l-4,16H26z" fill="#c9a878" />
          <g fill="#5f9f43">
            <circle cx="-34" cy="145" r="4" />
            <circle cx="34" cy="145" r="4" />
          </g>
        </g>
        <path d="M-9,196v-30q0,-8 9,-8q9,0 9,8v30z" fill="#2f8f8a" />
        <circle cx="0" cy="146" r="8.4" fill="#8a6a48" />
        <path d="M-14,144h28l-14,-13z" fill="#e0c890" />
        <path
          d="M-7,198l-4,10M7,198l4,10"
          stroke="#3f3a34"
          strokeWidth="4.4"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* 値切っている買い手と売り手(左)。**この2人は気づいていない。** */}
      <g transform="translate(44,0)">
        <path d="M-10,196v-28q0,-8 10,-8q10,0 10,8v28z" fill="#e8b21c" />
        <circle cx="0" cy="148" r="9" fill="#8a6a48" />
        <path d="M-14,146h28l-14,-13z" fill="#e0c890" />
        <path
          d="M8,164q14,-4 18,-14"
          stroke="#e8b21c"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M-7,198l-4,10M7,198l4,10"
          stroke="#3f3a34"
          strokeWidth="4.4"
          fill="none"
          strokeLinecap="round"
        />
      </g>
      <g
        className="vietnam-cm-haggle"
        fill="none"
        stroke="#f2ece0"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.8"
      >
        <path d="M74,136q9,-6 9,-16M84,140q13,-8 13,-22" />
      </g>

      {/* **すれ違いざまに肩がぶつかる2人。**どちらも普通の買い物客に見える。 */}
      <g transform="translate(160,0)">
        <g className="vietnam-cm-bump1">
          <path d="M-11,196v-30q0,-8 11,-8q11,0 11,8v30z" fill="#2f6fb0" />
          <circle cx="0" cy="146" r="9.4" fill="#8a6a48" />
          <path
            d="M-10,144q10,-11 20,0q0,-8 -10,-8q-10,0 -10,8z"
            fill="#3f3a34"
          />
          <path
            d="M10,166q10,2 14,10"
            stroke="#2f6fb0"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M-8,198l-4,10M8,198l4,10"
            stroke="#3f3a34"
            strokeWidth="4.4"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      </g>
      <g transform="translate(198,0)">
        <g className="vietnam-cm-bump2">
          <path d="M-11,196v-30q0,-8 11,-8q11,0 11,8v30z" fill="#7f5f9a" />
          <circle cx="0" cy="146" r="9.4" fill="#8a6a48" />
          <path d="M-11,144h22l-4,-7h-14z" fill="#5f4a34" />
          <path
            d="M-10,166q-10,2 -14,10"
            stroke="#7f5f9a"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M-8,198l-4,10M8,198l4,10"
            stroke="#3f3a34"
            strokeWidth="4.4"
            fill="none"
            strokeLinecap="round"
          />
        </g>
        {/* 離れていく手と財布。**見えるのはここだけ。** */}
        <g className="vietnam-cm-slip">
          <path
            d="M12,176q16,2 24,-4"
            stroke="#8a6a48"
            strokeWidth="7"
            fill="none"
            strokeLinecap="round"
          />
          <rect x="34" y="164" width="18" height="13" rx="2.4" fill="#8a4a2c" />
          <rect x="34" y="170" width="18" height="3" fill="#6b3a20" />
          <circle cx="48" cy="171" r="1.8" fill="#e8b21c" />
        </g>
      </g>

      {/* 手前に積んだ籠と菜。混雑の厚みを出す。 */}
      <g fill="#c9a878">
        <ellipse cx="90" cy="200" rx="26" ry="9" />
        <ellipse cx="128" cy="204" rx="20" ry="7" />
        <ellipse cx="286" cy="202" rx="24" ry="8" />
      </g>
      <g fill="#5f9f43">
        <circle cx="84" cy="194" r="6" />
        <circle cx="96" cy="196" r="5.4" />
        <circle cx="284" cy="196" r="6" />
      </g>
      <g fill="#da251d">
        <circle cx="126" cy="199" r="4.4" />
        <circle cx="294" cy="198" r="4" />
      </g>

      <style>{`
        .vietnam-cm-bump1 {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: vietnam-cm-jostle1 3.2s ease-in-out infinite;
        }
        @keyframes vietnam-cm-jostle1 {
          0%, 100% { transform: translateX(-4px) rotate(0deg); }
          45%, 60% { transform: translateX(4px) rotate(2deg); }
        }
        .vietnam-cm-bump2 {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: vietnam-cm-jostle2 3.2s ease-in-out infinite;
        }
        @keyframes vietnam-cm-jostle2 {
          0%, 100% { transform: translateX(4px) rotate(0deg); }
          45%, 60% { transform: translateX(-4px) rotate(-2deg); }
        }
        .vietnam-cm-slip {
          transform-box: fill-box;
          transform-origin: 0% 50%;
          animation: vietnam-cm-away 3.2s ease-in-out infinite;
        }
        @keyframes vietnam-cm-away {
          0%, 45% { transform: translateX(-16px); opacity: 0; }
          62% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(16px); opacity: 0.4; }
        }
        .vietnam-cm-haggle {
          transform-box: fill-box;
          transform-origin: 0% 100%;
          animation: vietnam-cm-voice 1.8s ease-out infinite;
        }
        @keyframes vietnam-cm-voice {
          0% { transform: scale(0.55); opacity: 0.9; }
          100% { transform: scale(1.25); opacity: 0; }
        }
        .vietnam-cm-pole {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: vietnam-cm-bounce 1.9s ease-in-out infinite;
        }
        @keyframes vietnam-cm-bounce {
          0%, 100% { transform: translateY(0) rotate(-1.4deg); }
          50% { transform: translateY(2.6px) rotate(1.4deg); }
        }
        .vietnam-cm-awning1 {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: vietnam-cm-ruffle 3.4s ease-in-out infinite;
        }
        .vietnam-cm-awning2 {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: vietnam-cm-ruffle 4.2s ease-in-out -1.4s infinite;
        }
        @keyframes vietnam-cm-ruffle {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.08) skewX(-2deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .vietnam-cm-bump1,
          .vietnam-cm-bump2,
          .vietnam-cm-slip,
          .vietnam-cm-haggle,
          .vietnam-cm-pole,
          .vietnam-cm-awning1,
          .vietnam-cm-awning2 { animation: none; }
        }
      `}</style>
    </svg>
  );
}
