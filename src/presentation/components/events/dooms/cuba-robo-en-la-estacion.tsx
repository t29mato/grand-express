/**
 * 駅のホームで盗みに遭う。
 *
 * 本文の芯は3つ。**遅れた列車を待つ家族連れでホームが混むこと・
 * 人混みが動いた隙に開いたバッグへ手が入ること・貨物のための駅に
 * 荷物を見張れる場所など無いこと。**
 *
 * 7枚の描き分けで、ここは**夕方の琥珀色のホーム**の担当。人がいちばん
 * 多い(6人)。貨車は出さない(paro と混ざる)——**来ない列車**を、
 * 空の線路と「停止」の腕木で見せる。
 *
 * 動くのは**開いたバッグへ入って財布を抜く手・遅れを見る人の首・
 * あおぐ帽子・子どもの落ち着かない足・ランプに寄る蛾**。
 * 止めた状態でも、抜かれた財布が手の中にある構図で分かる。
 */
export function CubaRoboEnLaEstacion() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夕方の空 */}
      <rect width="400" height="210" fill="#c88f5a" />
      <rect width="400" height="44" fill="#b87a4a" />
      <rect y="44" width="400" height="30" fill="#d8a468" />
      <circle cx="60" cy="40" r="13" fill="#f2c86a" />

      {/* 駅舎とホームの屋根 */}
      <rect x="230" y="58" width="170" height="76" fill="#a8764f" />
      <rect x="230" y="58" width="170" height="6" fill="#8a5a3a" />
      <g fill="#6b422a">
        <rect x="244" y="74" width="14" height="22" />
        <rect x="270" y="74" width="14" height="22" />
        <rect x="322" y="74" width="14" height="22" />
        <rect x="350" y="74" width="14" height="22" />
      </g>
      <g fill="#f2c86a" opacity="0.9">
        <rect x="296" y="74" width="16" height="22" />
      </g>
      {/* ホームの大屋根(貨物駅の鉄骨) */}
      <path d="M0,54h240l-8,-16H8z" fill="#5f4530" />
      <path d="M0,54h240v5H0z" fill="#4a3626" />
      <g fill="#5f4530">
        <rect x="26" y="59" width="5" height="76" />
        <rect x="126" y="59" width="5" height="76" />
        <rect x="216" y="59" width="5" height="76" />
      </g>
      <g stroke="#4a3626" strokeWidth="1.8" fill="none" opacity="0.8">
        <path d="M28,66l-20,-10M28,66l22,-10M128,66l-20,-10M128,66l22,-10M218,66l-20,-10M218,66l20,-10" />
      </g>

      {/* 吊りランプと蛾 */}
      <g transform="translate(76,64)">
        <path d="M0,-6v-4" stroke="#3a2c20" strokeWidth="1.8" fill="none" />
        <path d="M-6,0h12l-2,-6h-8z" fill="#3a2c20" />
        <circle cx="0" cy="3" r="4.6" fill="#f8dc8a" />
        <circle cx="0" cy="3" r="9" fill="#f8dc8a" opacity="0.25" />
        <g className="curo-moth">
          <path d="M0,0q-3,-2.6 -5,-1q1,2.6 5,1zM0,0q3,-2.6 5,-1q-1,2.6 -5,1z" fill="#e8dcc0" opacity="0.9" />
        </g>
      </g>

      {/* ホームの床 */}
      <rect y="134" width="400" height="42" fill="#b89468" />
      <rect y="134" width="400" height="6" fill="#cfa878" />
      <g stroke="#9a7a52" strokeWidth="1.3" opacity="0.6" fill="none">
        <path d="M0,150h400M0,164h400M60,140l-6,36M160,140l-2,36M260,140l2,36M350,140l6,36" />
      </g>

      {/* 空の線路(列車は来ていない)と「停止」の腕木 */}
      <rect y="176" width="400" height="34" fill="#6b5a44" />
      <g fill="#5a4a36">
        <rect x="8" y="184" width="12" height="6" />
        <rect x="42" y="184" width="12" height="6" />
        <rect x="76" y="184" width="12" height="6" />
        <rect x="110" y="184" width="12" height="6" />
        <rect x="144" y="184" width="12" height="6" />
        <rect x="178" y="184" width="12" height="6" />
        <rect x="212" y="184" width="12" height="6" />
        <rect x="246" y="184" width="12" height="6" />
        <rect x="280" y="184" width="12" height="6" />
        <rect x="314" y="184" width="12" height="6" />
        <rect x="348" y="184" width="12" height="6" />
        <rect x="382" y="184" width="12" height="6" />
      </g>
      <rect y="183" width="400" height="2.6" fill="#8a8f92" />
      <rect y="192" width="400" height="2.6" fill="#8a8f92" />
      <g transform="translate(388,134)">
        <rect x="-2" y="-56" width="4" height="56" fill="#5f5449" />
        <rect x="-16" y="-52" width="15" height="4.6" fill="#c8452f" />
        <rect x="-16" y="-52" width="4" height="4.6" fill="#f2ead8" />
      </g>

      {/* 群衆(左から:見張りのいない鞄の持ち主一家と、周りの待ち人) */}

      {/* 1人目:母親。子の手を引き、線路の先を見ている(赤茶ワンピース) */}
      <g transform="translate(58,120)">
        <path d="M-6,-4h12l3,26H-9z" fill="#b0523f" />
        <g className="curo-look">
          <circle cx="0" cy="-8.6" r="5.6" fill="#c98f5f" />
        </g>
        <path d="M-5,0l-7,6" stroke="#c98f5f" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M5,0l8,8" stroke="#c98f5f" strokeWidth="3" strokeLinecap="round" fill="none" />
      </g>
      {/* 2人目:子ども。落ち着かない(黄シャツ) */}
      <g transform="translate(78,134)">
        <g className="curo-kid">
          <rect x="-2.6" y="8" width="2.6" height="8" fill="#3f3428" />
          <rect x="0.6" y="8" width="2.6" height="8" fill="#3f3428" />
          <path d="M-4,-2h8l1,10h-10z" fill="#e8b81f" />
          <circle cx="0" cy="-5.6" r="4.2" fill="#c98f5f" />
        </g>
      </g>

      {/* 3人目:鞄の持ち主。ベンチに座り、進行方向だけを見ている(青シャツ) */}
      <g transform="translate(150,116)">
        <rect x="-20" y="18" width="52" height="4" fill="#6b4a2f" />
        <g fill="#4f3a26">
          <rect x="-17" y="22" width="4" height="12" />
          <rect x="25" y="22" width="4" height="12" />
        </g>
        <path d="M-6,-4h12l2,22H-8z" fill="#3f6b9a" />
        <g className="curo-look">
          <circle cx="0" cy="-8.6" r="5.6" fill="#b8794a" />
          <ellipse cx="0" cy="-12" rx="8.4" ry="2.4" fill="#d8bd7f" />
          <path d="M-4,-12q4,-5.4 8,0z" fill="#c8a95f" />
        </g>
        <path d="M-5,0l-8,5" stroke="#b8794a" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M5,0l7,7" stroke="#b8794a" strokeWidth="3" strokeLinecap="round" fill="none" />
      </g>

      {/* 開いたバッグ(持ち主の視線の外) */}
      <g transform="translate(186,132)">
        <path d="M-11,0q0,-10 11,-10q11,0 11,10z" fill="#8a5a3a" />
        <path d="M-11,0h22l-2,6H-9z" fill="#6b422a" />
        <path d="M-9,-8q9,-6 18,0" stroke="#4f3020" strokeWidth="2" fill="none" />
        {/* 中の財布(抜かれていく) */}
        <g className="curo-wallet">
          <rect x="-5" y="-8" width="10" height="7" rx="1.4" fill="#c8a13f" />
          <rect x="-5" y="-8" width="10" height="2.4" fill="#a8823f" />
        </g>
      </g>

      {/* 4人目:スリ。人垣の後ろから腕だけ伸びる(灰の上着・顔は俯き) */}
      <g transform="translate(216,120)">
        <rect x="-3.6" y="16" width="3.4" height="18" fill="#2c2620" />
        <rect x="0.6" y="16" width="3.4" height="18" fill="#2c2620" />
        <path d="M-6.4,-4h12l2,20H-8.4z" fill="#6f6a5e" />
        <circle cx="-1" cy="-7.6" r="5.2" fill="#c98f5f" />
        <path d="M-6.4,-10q5,-3.4 10.4,-1l-1,3q-4.4,-2 -9.4,-0.4z" fill="#4a4438" />
        <g className="curo-arm">
          <path d="M-5,0q-10,4 -18,10" stroke="#6f6a5e" strokeWidth="4" strokeLinecap="round" fill="none" />
          <circle cx="-24" cy="11" r="2.6" fill="#c98f5f" />
        </g>
      </g>

      {/* 5人目:帽子であおいで待つ人(緑シャツ) */}
      <g transform="translate(268,118)">
        <rect x="-3.6" y="16" width="3.4" height="18" fill="#3f3428" />
        <rect x="0.6" y="16" width="3.4" height="18" fill="#3f3428" />
        <path d="M-6,-4h12l1.6,20H-7.6z" fill="#4f8f6a" />
        <circle cx="0" cy="-8.6" r="5.6" fill="#c98f5f" />
        <g className="curo-fan">
          <path d="M5,-4l8,-2" stroke="#c98f5f" strokeWidth="3" strokeLinecap="round" fill="none" />
          <ellipse cx="16" cy="-8" rx="6.4" ry="2.8" fill="#d8bd7f" />
        </g>
        <path d="M-5,0l-6,6" stroke="#c98f5f" strokeWidth="3" strokeLinecap="round" fill="none" />
      </g>

      {/* 6人目:トランクに腰掛けて待つ人(紫シャツ) */}
      <g transform="translate(330,124)">
        <rect x="-14" y="12" width="30" height="14" rx="2" fill="#8a6b43" />
        <path d="M-14,17h30" stroke="#6b4a2f" strokeWidth="1.6" fill="none" />
        <path d="M-6,-4h12l2,18H-8z" fill="#8a5a9a" />
        <g className="curo-look">
          <circle cx="0" cy="-8.6" r="5.6" fill="#b8794a" />
        </g>
        <path d="M-5,0l-7,5M5,0l7,5" stroke="#b8794a" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M-4,14l-2,10M6,14l2,10" stroke="#3f3428" strokeWidth="3.4" strokeLinecap="round" fill="none" />
      </g>

      {/* 鳩(足元の細部) */}
      <g fill="#8a8f92">
        <ellipse cx="112" cy="168" rx="4" ry="2.6" />
        <circle cx="115.4" cy="165.4" r="1.6" />
        <ellipse cx="240" cy="170" rx="3.6" ry="2.4" />
        <circle cx="243" cy="167.6" r="1.4" />
      </g>

      <style>{`
        /* 財布はバッグから持ち上がり、スリの手の方へ消える */
        .curo-wallet { animation: curo-lift 4.2s ease-in-out infinite; }
        @keyframes curo-lift {
          0%, 18%  { transform: translate(0, 0); opacity: 1; }
          46%      { transform: translate(6px, -16px); opacity: 1; }
          62%      { transform: translate(16px, -14px); opacity: 0; }
          63%, 100% { transform: translate(0, 0); opacity: 0; }
        }
        .curo-arm {
          transform-box: fill-box;
          transform-origin: 100% 0%;
          animation: curo-reach 4.2s ease-in-out infinite;
        }
        @keyframes curo-reach {
          0%       { transform: rotate(14deg); }
          18%      { transform: rotate(0deg); }
          46%      { transform: rotate(-4deg); }
          70%, 100% { transform: rotate(14deg); }
        }
        /* 待つ人たちは線路の先(左)を見続け、時々視線を落とす */
        .curo-look {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: curo-crane 5.2s ease-in-out infinite;
        }
        @keyframes curo-crane {
          0%, 100% { transform: translateX(0); }
          40%      { transform: translateX(-2.4px); }
          60%      { transform: translateX(-2.4px); }
        }
        .curo-kid {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: curo-fidget 1.9s ease-in-out infinite;
        }
        @keyframes curo-fidget {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          30%      { transform: translateY(-2.6px) rotate(-3deg); }
          65%      { transform: translateY(0) rotate(3deg); }
        }
        .curo-fan {
          transform-box: fill-box;
          transform-origin: 0% 100%;
          animation: curo-wave 1.5s ease-in-out infinite;
        }
        @keyframes curo-wave {
          0%, 100% { transform: rotate(0deg); }
          50%      { transform: rotate(-16deg); }
        }
        .curo-moth { animation: curo-flit 3.4s ease-in-out infinite; }
        @keyframes curo-flit {
          0%, 100% { transform: translate(8px, -4px); }
          25%      { transform: translate(-7px, 2px); }
          55%      { transform: translate(5px, 8px); }
          80%      { transform: translate(-6px, -6px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .curo-wallet, .curo-arm, .curo-look, .curo-kid, .curo-fan, .curo-moth {
            animation: none;
          }
          /* 財布は持ち上げられた途中、腕はバッグに届いた角度で止める。 */
          .curo-wallet { transform: translate(6px, -16px); opacity: 1; }
          .curo-arm {
            transform: rotate(-4deg);
            transform-box: fill-box;
            transform-origin: 100% 0%;
          }
          .curo-moth { transform: translate(8px, -4px); }
        }
      `}</style>
    </svg>
  );
}
