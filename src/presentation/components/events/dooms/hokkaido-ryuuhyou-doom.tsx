/**
 * 流氷が港を閉ざす。
 *
 * 本文の芯は3つ。**一夜で港口が氷で塞がること・水路を開ける砕氷船は
 * 観光客で埋まっていること・風が変わるまで船は何も動かないこと。**
 *
 * 雪の絵3枚の描き分けでは、ここは **白い「板」と垂直の縁・橙の船** を担当する
 * (`fubuki` は白一色で水平、`kion-ranteika` は茶色)。
 * 白い氷が淡い空に溶けないよう、**氷の縁に必ず濃い青の影**を入れている。
 *
 * 動くのは**押し合う氷板2枚・砕氷船の揺れと煙・繋いだ漁船の上下・
 * 岸壁の漁師の吐く息**だけ。止めた状態でも、港口を氷が埋め、漁船が繋がれたまま、
 * 沖の砕氷船だけが人を乗せている構図で分かる。
 */
export function HokkaidoRyuuhyouDoom() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 朝の低い光。空は薄い水色から橙へ。 */}
      <rect width="400" height="210" fill="#9fc0d4" />
      <rect width="400" height="52" fill="#8fb4cc" />
      <rect y="52" width="400" height="30" fill="#c8d8dc" />
      <circle cx="330" cy="46" r="15" fill="#f8d488" opacity="0.85" />
      <circle cx="330" cy="46" r="30" fill="#f8d488" opacity="0.18" />

      {/* 対岸の岬(中景)。 */}
      <path d="M0,82q46,-16 96,-8q54,8 104,-4q56,-12 116,2q46,6 84,-2v14H0z" fill="#5f7382" />
      <g fill="#eef4f8" opacity="0.8">
        <path d="M92,76q22,-5 44,2q-24,3 -44,-2z" />
        <path d="M244,72q26,-6 52,3q-28,3 -52,-3z" />
      </g>

      {/* 海。**氷の下にちゃんと暗い水がある**ことを見せるため、まず濃紺を敷く。 */}
      <rect y="96" width="400" height="114" fill="#1f4c6e" />
      <g stroke="#3f7799" strokeWidth="2.4" fill="none" opacity="0.7">
        <path d="M186,104h70M300,110h84" />
      </g>

      {/* 沖の砕氷船。**観光客を乗せて、港口ではない場所にいる。** */}
      <g className="hkr-ship">
        <path d="M256,96h104l-12,20H268z" fill="#c8532c" />
        <path d="M256,96h104v-5H256z" fill="#e8663c" />
        <rect x="286" y="76" width="46" height="20" fill="#f0ece0" />
        <rect x="292" y="80" width="34" height="9" fill="#3f5f7a" />
        <rect x="300" y="62" width="10" height="14" fill="#f0ece0" />
        <rect x="336" y="66" width="4" height="30" fill="#8a8578" />
        {/* 甲板の観光客。**点で十分。** */}
        <g fill="#3a4650">
          <circle cx="266" cy="92" r="2.4" />
          <circle cx="274" cy="91" r="2.4" />
          <circle cx="282" cy="92" r="2.4" />
          <circle cx="342" cy="92" r="2.4" />
          <circle cx="350" cy="91" r="2.4" />
        </g>
        <g fill="#d8443c">
          <circle cx="270" cy="87" r="2" />
          <circle cx="346" cy="87" r="2" />
        </g>
      </g>
      <g className="hkr-smoke" fill="#dfe6ea" opacity="0.75">
        <ellipse cx="338" cy="54" rx="9" ry="5" />
        <ellipse cx="348" cy="42" rx="12" ry="6.4" />
        <ellipse cx="360" cy="30" rx="9" ry="5" />
      </g>

      {/* 流氷。**手前へ来るほど大きく、縁に濃い影を置いて板の厚みを出す。** */}
      <g className="hkr-floe-far">
        <g fill="#eef6fa">
          <path d="M170,104l40,-6 34,7 -30,8 -38,-3z" />
          <path d="M232,116l46,-7 34,8 -34,8 -40,-4z" />
          <path d="M296,102l38,-5 30,7 -30,7 -34,-4z" />
          <path d="M126,118l40,-6 30,7 -30,8 -36,-4z" />
        </g>
        <g fill="#a8c4d8">
          <path d="M204,113l30,-8 10,2 -30,8z" />
          <path d="M266,125l34,-8 12,2 -34,8z" />
          <path d="M330,111l30,-7 4,2 -30,7z" />
        </g>
      </g>
      <g className="hkr-floe-near">
        <g fill="#f4fafd">
          <path d="M150,140l58,-10 46,11 -44,13 -54,-6z" />
          <path d="M244,156l64,-11 50,12 -48,14 -58,-6z" />
          <path d="M88,160l60,-10 44,12 -46,13 -52,-6z" />
          <path d="M300,134l52,-9 48,10 -44,12 -50,-5z" />
          <path d="M186,182l70,-11 54,13 -52,15 -64,-7z" />
        </g>
        <g fill="#b4cede">
          <path d="M210,153l44,-13 14,3 -44,13z" />
          <path d="M306,170l50,-14 12,3 -50,14z" />
          <path d="M148,175l46,-13 12,3 -46,13z" />
          <path d="M258,197l52,-15 12,3 -52,15z" />
        </g>
        <g fill="#dfeaf2">
          <path d="M166,136l24,-4 16,4 -18,4z" />
          <path d="M320,130l22,-4 18,4 -18,4z" />
        </g>
      </g>

      {/* 岸壁。手前を横切る。 */}
      <path d="M0,150h150l-8,60H0z" fill="#7a7a70" />
      <path d="M0,150h150l-2,10H0z" fill="#9a9a8e" />
      <g fill="#5f5f57">
        <rect x="0" y="176" width="140" height="5" />
        <rect x="0" y="196" width="128" height="5" />
      </g>
      {/* 係船柱と、繋いだままの綱。 */}
      <g fill="#4a4f58">
        <rect x="118" y="136" width="12" height="16" rx="3" />
        <rect x="114" y="132" width="20" height="6" rx="3" />
      </g>

      {/* 動けない漁船。**綱で繋がれたまま氷に囲まれている。** */}
      <g>
        <g className="hkr-boat">
          <path d="M140,150h96l-14,22h-70z" fill="#2f4a5f" />
          <path d="M140,150h96v-5h-96z" fill="#f0ece0" />
          <rect x="196" y="128" width="30" height="22" fill="#f0ece0" />
          <rect x="202" y="133" width="19" height="10" fill="#3f5f7a" />
          <rect x="160" y="104" width="3" height="46" fill="#8a5a3a" />
          <path d="M161,106l58,22" stroke="#8a5a3a" strokeWidth="1.4" fill="none" />
          <g fill="#d8443c">
            <rect x="150" y="152" width="76" height="4" />
          </g>
        </g>
        <path d="M128,140q18,4 22,12" stroke="#e8e0cc" strokeWidth="2.6" fill="none" />
      </g>

      {/* 岸壁に立つ漁師。**赤い上着・腕組み・待つだけ。** */}
      <g>
        <path d="M46,206h9l3,-24h-9z" fill="#2f3a48" />
        <path d="M60,206h9l1,-24h-9z" fill="#39455a" />
        <path d="M42,182l5,-30h22l5,30z" fill="#c0453c" />
        <path d="M44,166h26v6H44z" fill="#8f312b" />
        <circle cx="58" cy="144" r="9" fill="#e8c8a8" />
        <path d="M49,143a9,9 0 0 1 18,0z" fill="#2f3a48" />
        <path d="M47,140h22v3H47z" fill="#22303f" />
      </g>
      <g className="hkr-breath" fill="#f0f6fa" opacity="0.8">
        <ellipse cx="72" cy="142" rx="7" ry="4" />
        <ellipse cx="84" cy="136" rx="5" ry="3" />
      </g>

      {/* かもめ。氷の上で待っている。 */}
      <g fill="#f4f8fa">
        <ellipse cx="286" cy="128" rx="6" ry="3.4" />
        <path d="M291,126l4,-6h1.6l-2,6z" />
      </g>
      <g fill="#3f434a">
        <rect x="284" y="131" width="1.6" height="4" />
        <rect x="288" y="131" width="1.6" height="4" />
      </g>

      <style>{`
        .hkr-floe-near {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: hkr-press 5s ease-in-out infinite;
        }
        @keyframes hkr-press {
          0%, 100% { transform: translate(0, 0); }
          50%      { transform: translate(-10px, -3px); }
        }
        .hkr-floe-far {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: hkr-press-far 7s ease-in-out infinite;
        }
        @keyframes hkr-press-far {
          0%, 100% { transform: translateX(0); }
          50%      { transform: translateX(9px); }
        }
        .hkr-ship {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: hkr-roll 4.4s ease-in-out infinite;
        }
        @keyframes hkr-roll {
          0%, 100% { transform: rotate(-1.4deg); }
          50%      { transform: rotate(1.4deg); }
        }
        .hkr-boat {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: hkr-bob 3.6s ease-in-out infinite;
        }
        @keyframes hkr-bob {
          0%, 100% { transform: translateY(0) rotate(-0.8deg); }
          50%      { transform: translateY(-3px) rotate(0.8deg); }
        }
        .hkr-smoke {
          transform-box: fill-box;
          transform-origin: 0% 100%;
          animation: hkr-puff 3.4s ease-out infinite;
        }
        @keyframes hkr-puff {
          0%   { transform: translate(0, 6px) scale(0.7); opacity: 0.8; }
          100% { transform: translate(22px, -18px) scale(1.3); opacity: 0; }
        }
        .hkr-breath {
          transform-box: fill-box;
          transform-origin: 0% 50%;
          animation: hkr-exhale 3.2s ease-out infinite;
        }
        @keyframes hkr-exhale {
          0%   { transform: translateX(-6px) scale(0.5); opacity: 0.9; }
          70%  { transform: translateX(10px) scale(1.2); opacity: 0.35; }
          100% { transform: translateX(18px) scale(1.4); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hkr-floe-near, .hkr-floe-far, .hkr-ship, .hkr-boat,
          .hkr-smoke, .hkr-breath { animation: none; }
          .hkr-smoke { opacity: 0.6; }
          .hkr-breath { opacity: 0.55; }
        }
      `}</style>
    </svg>
  );
}
