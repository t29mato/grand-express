/**
 * キンセアニェーラの代母/代父に指名される。十五歳の祝いの会場で
 * 「ケーキはあなたが」と拍手で指名され、グアヤベラ姿のおじが
 * 苦笑いしながら札を出す。災難ではあるが、ほほえましい種類。
 *
 * 7枚の中でこれだけは**明るい祝いの絵**にする。動くのは、
 * 舞う紙吹雪・手から舞っていく札・拍手する親族の腕・主役のドレスの揺れ。
 * 止めても「祝いの席で費用を持たされた」(札+ケーキ+拍手)が分かる。
 */
export function MexicoPadrino() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 明るい会場。 */}
      <rect width="400" height="210" fill="#f4dfc8" />
      <rect width="400" height="70" fill="#f8ead8" />
      <rect y="180" width="400" height="30" fill="#c8a878" />

      {/* パペルピカド(切り紙の万国旗)を2本渡す。 */}
      <path d="M0,22 Q100,40 200,26 Q300,14 400,30" stroke="#8a6a44" strokeWidth="1.6" fill="none" />
      <g>
        <path d="M28,28 h12 l-6,10 z" fill="#e8443f" />
        <path d="M70,33 h12 l-6,10 z" fill="#5b8fe8" />
        <path d="M112,34 h12 l-6,10 z" fill="#f4c430" />
        <path d="M154,30 h12 l-6,10 z" fill="#3f8f4f" />
        <path d="M196,26 h12 l-6,10 z" fill="#c86a8a" />
        <path d="M238,22 h12 l-6,10 z" fill="#f4c430" />
        <path d="M280,20 h12 l-6,10 z" fill="#e8443f" />
        <path d="M322,22 h12 l-6,10 z" fill="#5b8fe8" />
        <path d="M362,26 h12 l-6,10 z" fill="#3f8f4f" />
      </g>
      <path d="M0,54 Q120,68 240,56 Q320,50 400,60" stroke="#8a6a44" strokeWidth="1.4" fill="none" opacity="0.8" />
      <g opacity="0.9">
        <path d="M50,60 h10 l-5,8 z" fill="#c86a8a" />
        <path d="M120,65 h10 l-5,8 z" fill="#3f8f4f" />
        <path d="M190,61 h10 l-5,8 z" fill="#f4c430" />
        <path d="M260,55 h10 l-5,8 z" fill="#e8443f" />
        <path d="M330,55 h10 l-5,8 z" fill="#5b8fe8" />
      </g>

      {/* ケーキの卓(中央)。3段のケーキ。 */}
      <g>
        <rect x="160" y="150" width="90" height="10" fill="#a8744a" />
        <rect x="166" y="160" width="8" height="30" fill="#8a5a3a" />
        <rect x="236" y="160" width="8" height="30" fill="#8a5a3a" />
        <path d="M158,150 h94 l-4,8 h-86 z" fill="#f6efe2" />
        <rect x="176" y="126" width="58" height="24" rx="3" fill="#f8dce4" />
        <rect x="184" y="106" width="42" height="20" rx="3" fill="#f6efe2" />
        <rect x="192" y="90" width="26" height="16" rx="3" fill="#f8dce4" />
        <g stroke="#e8a8bc" strokeWidth="2" fill="none">
          <path d="M176,134 q7,5 14,0 t14,0 t14,0 t14,0" />
          <path d="M184,112 q7,5 14,0 t14,0" />
        </g>
        <path d="M203,84 l4,-7 l4,7" stroke="#f5b31c" strokeWidth="2.4" fill="none" />
        <circle cx="207" cy="83" r="2" fill="#e8443f" />
      </g>

      {/* 主役の少女(大きなピンクのドレス+ティアラ)。 */}
      <g transform="translate(120,0)">
        <g className="mxpa-quince">
          <path d="M-24,196 Q-20,150 0,146 Q20,150 24,196 q-24,6 -48,0 z" fill="#e88aa8" />
          <path d="M-18,196 Q-14,160 0,156 M18,196 Q14,160 0,156" stroke="#d46a8e" strokeWidth="2" fill="none" />
          <path d="M-8,132 L8,132 L10,150 L-10,150 z" fill="#e88aa8" />
          <circle cx="0" cy="122" r="9.5" fill="#b5835a" />
          <path d="M-9,119 a9.5,9.5 0 0 1 19,0 l-2,5 l-3,-6 l-11,1 z" fill="#2a1a10" />
          <path d="M-6,112 l2,-5 l4,3 l4,-3 l2,5" stroke="#f5b31c" strokeWidth="2" fill="none" />
          <circle cx="-3.4" cy="122" r="1.2" fill="#2a1a10" />
          <circle cx="3.4" cy="122" r="1.2" fill="#2a1a10" />
          <path d="M-4,128 q4,3 8,0" stroke="#2a1a10" strokeWidth="1.3" fill="none" />
          {/* ケーキとおじを指す腕。 */}
          <path d="M8,138 Q26,132 40,124" stroke="#b5835a" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M-8,138 Q-16,146 -14,154" stroke="#b5835a" strokeWidth="5" strokeLinecap="round" fill="none" />
        </g>
      </g>

      {/* 指名されたおじ(白いグアヤベラ+口ひげ)。苦笑いで札を出す。 */}
      <g transform="translate(302,0)">
        <ellipse cx="0" cy="200" rx="15" ry="3.4" fill="#8a6a44" opacity="0.35" />
        <path d="M-5,172 L-7,198" stroke="#4a4a54" strokeWidth="7" strokeLinecap="round" fill="none" />
        <path d="M5,172 L7,198" stroke="#5a5a66" strokeWidth="7" strokeLinecap="round" fill="none" />
        {/* グアヤベラ(前立ての縦じま)。 */}
        <path d="M-11,136 L11,136 L14,176 L-14,176 z" fill="#f6efe2" />
        <path d="M-5,138 v34 M0,138 v36 M5,138 v34" stroke="#d8d0bc" strokeWidth="1.6" />
        <circle cx="0" cy="125" r="9.5" fill="#c98a5f" />
        <path d="M-7,121 a9.5,9.5 0 0 1 14,-2" stroke="#4a4038" strokeWidth="3" fill="none" />
        <path d="M-5,129 q5,-2.4 10,0" stroke="#4a4038" strokeWidth="2.4" fill="none" />
        <circle cx="-3.4" cy="124" r="1.2" fill="#2a1a10" />
        <circle cx="3.4" cy="124" r="1.2" fill="#2a1a10" />
        <path d="M-3,133 q3,2 6,1" stroke="#2a1a10" strokeWidth="1.2" fill="none" />
        {/* 片手は額に(参ったなあ)。 */}
        <path d="M8,142 Q16,132 8,124" stroke="#c98a5f" strokeWidth="5" strokeLinecap="round" fill="none" />
        {/* 札入れを差し出す腕。 */}
        <path d="M-10,144 Q-26,142 -34,138" stroke="#c98a5f" strokeWidth="5.5" strokeLinecap="round" fill="none" />
        <rect x="-44" y="132" width="14" height="10" rx="2" fill="#8a5a3a" />
      </g>
      {/* 手から舞っていく札。 */}
      <g className="mxpa-bill1">
        <rect x="-7" y="-4" width="14" height="8" rx="1.4" fill="#7fae8a" />
        <circle cx="0" cy="0" r="2" fill="#5a8a66" />
      </g>
      <g className="mxpa-bill2">
        <rect x="-7" y="-4" width="14" height="8" rx="1.4" fill="#7fae8a" />
        <circle cx="0" cy="0" r="2" fill="#5a8a66" />
      </g>

      {/* 拍手する親族(左)。 */}
      <g transform="translate(38,0)">
        <path d="M-4,172 L-6,198" stroke="#5a3a42" strokeWidth="6.5" strokeLinecap="round" fill="none" />
        <path d="M4,172 L6,198" stroke="#6b4550" strokeWidth="6.5" strokeLinecap="round" fill="none" />
        <path d="M-10,140 L10,140 L13,176 L-13,176 z" fill="#8a4a8a" />
        <circle cx="0" cy="129" r="9" fill="#b5835a" />
        <path d="M-9,126 a9,9 0 0 1 18,0 l0,5 l-3,-6 l-12,0 z" fill="#4a4038" />
        <path d="M-4,135 q4,2.6 8,0" stroke="#2a1a10" strokeWidth="1.3" fill="none" />
        <g className="mxpa-clap1">
          <path d="M-8,148 Q-18,140 -14,130" stroke="#b5835a" strokeWidth="4.6" strokeLinecap="round" fill="none" />
          <path d="M8,148 Q18,140 14,130" stroke="#b5835a" strokeWidth="4.6" strokeLinecap="round" fill="none" />
        </g>
      </g>
      <g transform="translate(75,0)">
        <path d="M-4,176 L-5,200" stroke="#3a4a5a" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M4,176 L5,200" stroke="#46586b" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M-9,148 L9,148 L11,180 L-11,180 z" fill="#2f6ea8" />
        <circle cx="0" cy="138" r="8.4" fill="#c98a5f" />
        <path d="M-8,135 a8.4,8.4 0 0 1 16,0" stroke="#2a1a10" strokeWidth="3" fill="none" />
        <path d="M-3.6,143 q3.6,2.4 7.2,0" stroke="#2a1a10" strokeWidth="1.2" fill="none" />
        <g className="mxpa-clap2">
          <path d="M-7,156 Q-16,148 -12,140" stroke="#c98a5f" strokeWidth="4.4" strokeLinecap="round" fill="none" />
          <path d="M7,156 Q16,148 12,140" stroke="#c98a5f" strokeWidth="4.4" strokeLinecap="round" fill="none" />
        </g>
      </g>

      {/* 舞う紙吹雪(2層)。 */}
      <g className="mxpa-confetti1">
        <rect x="40" y="-10" width="5" height="5" fill="#e8443f" transform="rotate(20 42 -8)" />
        <rect x="110" y="-24" width="5" height="5" fill="#f4c430" transform="rotate(-15 112 -22)" />
        <rect x="180" y="-8" width="5" height="5" fill="#5b8fe8" transform="rotate(40 182 -6)" />
        <rect x="250" y="-20" width="5" height="5" fill="#3f8f4f" transform="rotate(-30 252 -18)" />
        <rect x="320" y="-12" width="5" height="5" fill="#c86a8a" transform="rotate(10 322 -10)" />
        <rect x="368" y="-26" width="5" height="5" fill="#f4c430" transform="rotate(-40 370 -24)" />
      </g>
      <g className="mxpa-confetti2">
        <rect x="70" y="-16" width="5" height="5" fill="#c86a8a" transform="rotate(-25 72 -14)" />
        <rect x="140" y="-6" width="5" height="5" fill="#3f8f4f" transform="rotate(35 142 -4)" />
        <rect x="215" y="-22" width="5" height="5" fill="#e8443f" transform="rotate(-10 217 -20)" />
        <rect x="285" y="-10" width="5" height="5" fill="#f4c430" transform="rotate(25 287 -8)" />
        <rect x="352" y="-18" width="5" height="5" fill="#5b8fe8" transform="rotate(-35 354 -16)" />
      </g>

      <style>{`
        .mxpa-confetti1 { animation: mxpa-fall 4.6s linear infinite; }
        .mxpa-confetti2 { animation: mxpa-fall 4.6s linear infinite; animation-delay: -2.3s; }
        @keyframes mxpa-fall {
          from { transform: translate(0, -20px) ; }
          to   { transform: translate(-14px, 230px); }
        }
        .mxpa-bill1 { animation: mxpa-float1 3s ease-in-out infinite; }
        @keyframes mxpa-float1 {
          0%, 15% { transform: translate(264px, 136px) rotate(0deg); opacity: 0; }
          25%  { transform: translate(262px, 132px) rotate(-10deg); opacity: 1; }
          70%  { transform: translate(240px, 150px) rotate(-160deg); opacity: 1; }
          100% { transform: translate(228px, 146px) rotate(-200deg); opacity: 0; }
        }
        .mxpa-bill2 { animation: mxpa-float2 3s ease-in-out infinite; animation-delay: -1.5s; }
        @keyframes mxpa-float2 {
          0%, 15% { transform: translate(264px, 138px) rotate(0deg); opacity: 0; }
          30%  { transform: translate(258px, 130px) rotate(20deg); opacity: 1; }
          70%  { transform: translate(238px, 142px) rotate(150deg); opacity: 1; }
          100% { transform: translate(226px, 150px) rotate(190deg); opacity: 0; }
        }
        .mxpa-clap1, .mxpa-clap2 {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: mxpa-clap 0.6s ease-in-out infinite;
        }
        .mxpa-clap2 { animation-delay: -0.3s; }
        @keyframes mxpa-clap {
          0%, 100% { transform: scaleX(1); }
          50%      { transform: scaleX(0.72); }
        }
        .mxpa-quince {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: mxpa-sway 2.4s ease-in-out infinite;
        }
        @keyframes mxpa-sway {
          0%, 100% { transform: rotate(-2deg); }
          50%      { transform: rotate(2deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .mxpa-confetti1, .mxpa-confetti2, .mxpa-bill1, .mxpa-bill2,
          .mxpa-clap1, .mxpa-clap2, .mxpa-quince {
            animation: none;
          }
          /* 止まっていても分かるように: 札は手とケーキのあいだ、紙吹雪は宙。 */
          .mxpa-bill1 { transform: translate(248px, 140px) rotate(-30deg); }
          .mxpa-bill2 { transform: translate(238px, 146px) rotate(30deg); }
          .mxpa-confetti1 { transform: translate(-6px, 90px); }
          .mxpa-confetti2 { transform: translate(-10px, 150px); }
        }
      `}</style>
    </svg>
  );
}
