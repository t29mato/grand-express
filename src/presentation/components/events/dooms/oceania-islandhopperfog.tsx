/**
 * 霧がその週唯一の便を欠航させる。
 *
 * 本文の芯は3つ。**朝じゅう低い雲が滑走路を覆うこと・すでに三つの島を経由して
 * きた便が、着陸を試みる代わりに迂回すること・次にこの便に乗れるのは、
 * まる一週間先だということ。**
 *
 * 欠航の3枚の描き分けで、ここは **乳白色で埋める** 担当。
 * (`kingtideflood` は薄明の藍と桃、`ashfallground` は灰。)
 * **暗くしない。**見えないことを、暗さではなく**白さ**で描く。
 *
 * 動くのは**何層にも流れる霧・霧の奥を左から右へ通り過ぎて消える機影・
 * 上を見上げて待つ3人・揺れる吹き流しと草・回り続ける回転灯**。
 * 止めた状態でも、機影が霧に半分隠れて滑走路の上を行き過ぎ、
 * 3人が荷物と一緒に待っている構図で分かる。
 */
export function OceaniaIslandhopperfog() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 朝の乳白。空と地面の境がほとんど無い。 */}
      <rect width="400" height="210" fill="#cfd8ce" />
      <rect width="400" height="72" fill="#dfe6e4" />
      <rect y="72" width="400" height="34" fill="#d6dedb" />

      {/* 霧に沈んだ椰子の列(奥)。**輪郭だけ。** */}
      <g fill="#9aae9e" opacity="0.55">
        <path d="M30,112V86" stroke="#9aae9e" strokeWidth="3" />
        <path d="M30,86q-16,-3 -25,5q13,-2 24,1zM30,86q-14,-11 -27,-9q13,3 25,11zM30,86q4,-13 -1,-21q-1,11 -4,20zM30,86q16,-4 26,3q-14,-2 -25,0z" />
        <path d="M96,114V92" stroke="#9aae9e" strokeWidth="3" />
        <path d="M96,92q-14,-3 -22,4q11,-2 21,1zM96,92q-12,-10 -24,-8q12,3 22,10zM96,92q3,-11 -1,-18q-1,9 -3,17zM96,92q14,-4 23,3q-12,-2 -22,0z" />
        <path d="M300,110V84" stroke="#9aae9e" strokeWidth="3" />
        <path d="M300,84q-16,-3 -25,5q13,-2 24,1zM300,84q-14,-11 -27,-9q13,3 25,11zM300,84q4,-13 -1,-21q-1,11 -4,20zM300,84q16,-4 26,3q-14,-2 -25,0z" />
        <path d="M366,116V96" stroke="#9aae9e" strokeWidth="3" />
        <path d="M366,96q-13,-3 -20,4q10,-2 19,1zM366,96q-11,-9 -22,-7q11,3 20,9zM366,96q3,-10 -1,-16q-1,8 -3,15zM366,96q13,-4 21,3q-11,-2 -20,0z" />
      </g>

      {/* **霧の奥を行き過ぎる機影。**着陸せずに迂回する。 */}
      <g className="oif-plane" opacity="0.5">
        <path d="M0,0q7,-9 24,-9h30q16,0 20,8q-6,8 -22,8H6z" fill="#7f8f92" />
        <path d="M18,-9L10,-28h10l14,19z" fill="#7f8f92" />
        <path d="M44,-9L62,-26h9l-8,17z" fill="#94a2a4" />
        <path d="M10,7L0,20h8l12,-13z" fill="#94a2a4" />
        <g fill="#dfe6e4">
          <circle cx="30" cy="-1" r="2.4" />
          <circle cx="40" cy="-1" r="2.4" />
          <circle cx="50" cy="-1" r="2.4" />
        </g>
      </g>

      {/* 滑走路。**端だけが霧から出ている。** */}
      <rect y="128" width="400" height="82" fill="#8f9a8a" />
      <path d="M0,128q92,-8 190,2q100,10 210,-6v12H0z" fill="#9fa89a" />
      <rect y="140" width="400" height="46" fill="#8a8f88" />
      <path d="M0,140q94,-6 196,2q98,8 204,-4v4H0z" fill="#a0a49c" />
      <g fill="#f2f6f2" opacity="0.95">
        <rect x="14" y="160" width="38" height="6" />
        <rect x="74" y="160" width="38" height="6" />
        <rect x="134" y="160" width="38" height="6" />
        <rect x="194" y="160" width="38" height="6" />
        <rect x="254" y="160" width="38" height="6" />
        <rect x="314" y="160" width="38" height="6" />
      </g>
      <rect y="186" width="400" height="24" fill="#6f8f5f" />
      <path d="M0,186q96,-5 200,3q96,8 200,-5v6H0z" fill="#7f9f66" />

      {/* 回転灯と、風向を示す吹き流し。 */}
      <g>
        <rect x="352" y="120" width="5" height="34" fill="#6b7068" />
        <rect x="344" y="112" width="21" height="10" rx="3" fill="#8a8f88" />
        <g className="oif-beacon">
          <rect x="346" y="114" width="17" height="6" rx="2" fill="#f0c33a" />
        </g>
      </g>
      <g>
        <rect x="58" y="112" width="4" height="46" fill="#6b7068" />
        <g className="oif-sock">
          <path d="M62,116q22,-4 38,6q-16,10 -38,6z" fill="#e8443f" />
          <path d="M74,117q10,0 16,3q-9,5 -16,5z" fill="#f2ece0" />
          <path d="M62,116q4,-1 8,-1v12q-4,0 -8,-1z" fill="#f2ece0" />
        </g>
      </g>

      {/* **待つ3人。**同じ姿勢にしない。荷物も別々。 */}
      <g>
        {/* 立って空を見上げる人(黄) */}
        <ellipse cx="122" cy="200" rx="16" ry="4" fill="#4f6b44" opacity="0.3" />
        <g fill="#3a4048">
          <rect x="115" y="184" width="6" height="16" rx="2" />
          <rect x="124" y="184" width="6" height="16" rx="2" />
        </g>
        <path d="M112,186l4,-30h14l4,30z" fill="#f5b31c" />
        <g className="oif-look1">
          <circle cx="123" cy="148" r="8.4" fill="#8a6a4a" />
          <path d="M114,148a9,9 0 0 1 18,0z" fill="#3a3228" />
        </g>
        <path d="M112,166l-10,14" stroke="#f5b31c" strokeWidth="5" strokeLinecap="round" fill="none" />
        {/* 段ボール箱 */}
        <rect x="88" y="180" width="22" height="20" fill="#b08a4f" />
        <rect x="88" y="180" width="22" height="4" fill="#c49a58" />
        <path d="M88,184l22,16M110,184l-22,16" stroke="#7f6234" strokeWidth="1.4" fill="none" />
      </g>
      <g>
        {/* しゃがんで荷物に腰かける人(赤) */}
        <ellipse cx="188" cy="202" rx="20" ry="4" fill="#4f6b44" opacity="0.3" />
        <rect x="170" y="184" width="36" height="18" rx="3" fill="#4f7f6a" />
        <rect x="170" y="184" width="36" height="4" rx="2" fill="#69987f" />
        <g fill="#3a4048">
          <rect x="180" y="196" width="6" height="6" rx="2" />
          <rect x="190" y="196" width="6" height="6" rx="2" />
        </g>
        <path d="M176,186l4,-24h14l4,24z" fill="#c8452f" />
        <g className="oif-look2">
          <circle cx="187" cy="154" r="8" fill="#c98f5f" />
          <path d="M179,153a8.4,8.4 0 0 1 17,1z" fill="#e8e0cc" />
        </g>
        <path d="M196,168l10,-6" stroke="#c8452f" strokeWidth="4.6" strokeLinecap="round" fill="none" />
      </g>
      <g>
        {/* 傘を差して立つ人(青)。**霧は雨ではないが、朝露で濡れる。** */}
        <ellipse cx="266" cy="200" rx="16" ry="4" fill="#4f6b44" opacity="0.3" />
        <g fill="#2f3a48">
          <rect x="259" y="184" width="6" height="16" rx="2" />
          <rect x="268" y="184" width="6" height="16" rx="2" />
        </g>
        <path d="M256,186l4,-30h14l4,30z" fill="#3f6f9a" />
        <circle cx="267" cy="148" r="8.4" fill="#a8764c" />
        <path d="M258,147a9,9 0 0 1 18,0z" fill="#3a3228" />
        <path d="M276,162l8,-24" stroke="#3f6f9a" strokeWidth="5" strokeLinecap="round" fill="none" />
        <g className="oif-brolly">
          <path d="M284,138v-20" stroke="#6b6458" strokeWidth="2.4" fill="none" />
          <path d="M260,120q24,-24 48,0q-24,-9 -48,0z" fill="#4f7f6a" />
          <path d="M260,120q24,-9 48,0q-12,4 -24,4q-12,0 -24,-4z" fill="#3f6b58" />
        </g>
      </g>

      {/* 手前を流れる霧。**主役の足元まで白で埋める。** */}
      <g className="oif-fog1" fill="#eef2ef" opacity="0.7">
        <ellipse cx="90" cy="120" rx="150" ry="16" />
        <ellipse cx="300" cy="112" rx="130" ry="13" />
      </g>
      <g className="oif-fog2" fill="#f2f6f3" opacity="0.6">
        <ellipse cx="280" cy="150" rx="160" ry="14" />
        <ellipse cx="80" cy="158" rx="140" ry="12" />
      </g>
      <g className="oif-fog3" fill="#f6f9f6" opacity="0.55">
        <ellipse cx="140" cy="192" rx="180" ry="15" />
        <ellipse cx="340" cy="200" rx="120" ry="12" />
      </g>
      <g className="oif-fog4" fill="#eef2ef" opacity="0.45">
        <ellipse cx="200" cy="88" rx="200" ry="18" />
      </g>

      {/* 濡れた草。 */}
      <g className="oif-grass" stroke="#5f8f4a" strokeWidth="2" strokeLinecap="round" fill="none">
        <path d="M18,206q-2,-7 -5,-11M26,206q1,-7 4,-11M34,208q-2,-7 -4,-10M368,204q-2,-7 -5,-11M378,206q2,-7 5,-11M388,208q-2,-7 -4,-10" />
      </g>

      <style>{`
        .oif-plane {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: oif-pass 7s ease-in-out infinite;
        }
        @keyframes oif-pass {
          0%   { transform: translate(-60px, 96px); opacity: 0; }
          22%  { opacity: 0.55; }
          58%  { opacity: 0.4; }
          80%  { transform: translate(380px, 74px); opacity: 0; }
          100% { transform: translate(440px, 68px); opacity: 0; }
        }
        .oif-fog1 { animation: oif-roll1 13s linear infinite; }
        @keyframes oif-roll1 {
          from { transform: translateX(-80px); }
          to   { transform: translateX(80px); }
        }
        .oif-fog2 { animation: oif-roll2 10s linear infinite; }
        @keyframes oif-roll2 {
          from { transform: translateX(90px); }
          to   { transform: translateX(-90px); }
        }
        .oif-fog3 { animation: oif-roll3 16s linear infinite; }
        @keyframes oif-roll3 {
          from { transform: translateX(-70px); }
          to   { transform: translateX(70px); }
        }
        .oif-fog4 { animation: oif-breathe 8s ease-in-out infinite; }
        @keyframes oif-breathe {
          0%, 100% { opacity: 0.3; transform: translateY(0); }
          50%      { opacity: 0.6; transform: translateY(8px); }
        }
        .oif-look1 {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: oif-tilt 7s ease-in-out infinite;
        }
        .oif-look2 {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: oif-tilt 7s ease-in-out 0.5s infinite;
        }
        @keyframes oif-tilt {
          0%, 12%, 100% { transform: rotate(0deg); }
          30%, 62%      { transform: rotate(-14deg); }
        }
        .oif-brolly {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: oif-tip 4.6s ease-in-out infinite;
        }
        @keyframes oif-tip {
          0%, 100% { transform: rotate(-3deg); }
          50%      { transform: rotate(4deg); }
        }
        .oif-sock {
          transform-box: fill-box;
          transform-origin: 0% 50%;
          animation: oif-limp 4s ease-in-out infinite;
        }
        @keyframes oif-limp {
          0%, 100% { transform: rotate(6deg) scaleX(0.92); }
          50%      { transform: rotate(-4deg) scaleX(1); }
        }
        .oif-beacon { animation: oif-flash 1.8s steps(1, end) infinite; }
        @keyframes oif-flash {
          0%, 40%   { opacity: 1; }
          41%, 100% { opacity: 0.25; }
        }
        .oif-grass {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: oif-nod 4.4s ease-in-out infinite;
        }
        @keyframes oif-nod {
          0%, 100% { transform: skewX(-3deg); }
          50%      { transform: skewX(4deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .oif-plane, .oif-fog1, .oif-fog2, .oif-fog3, .oif-fog4,
          .oif-look1, .oif-look2, .oif-brolly, .oif-sock, .oif-beacon,
          .oif-grass { animation: none; }
          /* 機影は滑走路の上を行き過ぎている途中、二人は見上げた姿勢で止める。 */
          .oif-plane {
            transform: translate(212px, 84px);
            opacity: 0.48;
            transform-box: fill-box;
            transform-origin: 50% 50%;
          }
          .oif-look1, .oif-look2 {
            transform: rotate(-14deg);
            transform-box: fill-box;
            transform-origin: 50% 100%;
          }
          .oif-fog4 { opacity: 0.45; }
        }
      `}</style>
    </svg>
  );
}
