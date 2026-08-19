/**
 * ゴタ・フリア(DANA)。地中海側特有の秋の急な豪雨で川が増水し、
 * 線路が冠水して運休する。
 *
 * 暗い空から強い雨。ホームの屋根の下で黄色い雨合羽の駅員が
 * 冠水した線路を見下ろし、水面はレールを呑んでうねっている。
 *
 * 動き: 降りしきる雨・うねる水面・跳ねる水しぶき・明滅する運休表示灯。
 */
export function SpainDana() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 鉛色の空と雨雲 */}
      <rect width="400" height="210" fill="#3f4a5a" />
      <rect width="400" height="70" fill="#33404f" />
      <g fill="#2a3543">
        <ellipse cx="70" cy="34" rx="60" ry="18" />
        <ellipse cx="180" cy="24" rx="70" ry="20" />
        <ellipse cx="320" cy="36" rx="66" ry="18" />
      </g>

      {/* ホームと屋根(左) */}
      <g>
        <rect x="0" y="96" width="150" height="10" fill="#5a6673" />
        <rect x="0" y="60" width="150" height="10" fill="#4a5460" />
        <rect x="14" y="70" width="8" height="60" fill="#4a5460" />
        <rect x="110" y="70" width="8" height="60" fill="#4a5460" />
        <rect x="0" y="106" width="150" height="24" fill="#6e7a88" />
        <rect x="0" y="106" width="150" height="4" fill="#8a96a4" />
      </g>

      {/* 運休表示(赤い明滅灯。文字は描かない) */}
      <g transform="translate(70,84)">
        <rect x="-26" y="-8" width="52" height="16" rx="3" fill="#20364a" />
        <circle className="sdan-lamp" cx="-14" cy="0" r="4" fill="#e8443f" />
        <rect x="-4" y="-3" width="24" height="6" rx="3" fill="#5a6673" />
      </g>

      {/* 雨合羽の駅員(ホームの端から水を見下ろす) */}
      <g transform="translate(118,106)">
        <g className="sdan-watch">
          <circle cx="0" cy="-32" r="10" fill="#d9a273" />
          <path d="M-12,-34 a12,11 0 0 1 24,0 l2,4 h-28z" fill="#f5b31c" />
          <circle cx="4" cy="-31" r="2" fill="#241a10" />
          <path d="M-10,-24 h20 l-2,24 h-16z" fill="#f5b31c" />
          <path d="M-10,-16 h20" stroke="#c9922f" strokeWidth="2" />
          {/* 手に持つ信号灯 */}
          <path d="M10,-14 L20,-8" stroke="#d9a273" strokeWidth="5" strokeLinecap="round" />
          <rect x="18" y="-12" width="8" height="10" rx="2" fill="#e8443f" />
        </g>
      </g>

      {/* 冠水した線路。水面下にレールがかすかに見える */}
      <rect y="130" width="400" height="80" fill="#4a6a7a" />
      <g stroke="#3a5563" strokeWidth="4" opacity="0.8">
        <path d="M160,148 H400 M160,170 H400" />
      </g>
      <g fill="#3a5563" opacity="0.7">
        <rect x="180" y="140" width="8" height="36" />
        <rect x="230" y="140" width="8" height="36" />
        <rect x="280" y="140" width="8" height="36" />
        <rect x="330" y="140" width="8" height="36" />
      </g>
      {/* うねる水面 */}
      <g className="sdan-swell">
        <path d="M-20,132 q40,-8 80,0 t80,0 t80,0 t80,0 t80,0 v14 h-400z" fill="#5f8a9a" />
        <path d="M-20,138 q40,-6 80,0 t80,0 t80,0 t80,0 t80,0" stroke="#9fc4cc" strokeWidth="2.4" fill="none" opacity="0.8" />
      </g>
      {/* 浮かんで流れる枝 */}
      <g className="sdan-branch">
        <path d="M300,150 q14,-4 26,2 M312,148 l4,-6" stroke="#6b5330" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      </g>
      {/* 水しぶき */}
      <g className="sdan-splash" fill="#9fc4cc">
        <circle cx="180" cy="128" r="2.5" />
        <circle cx="252" cy="126" r="2" />
        <circle cx="338" cy="128" r="2.5" />
      </g>

      {/* 降りしきる雨(2層) */}
      <g className="sdan-rain-a" stroke="#8fb4c4" strokeWidth="2" strokeLinecap="round" opacity="0.75">
        <path d="M30,10 l-6,18 M90,0 l-6,18 M150,14 l-6,18 M210,4 l-6,18 M270,12 l-6,18 M330,2 l-6,18 M390,10 l-6,18" />
        <path d="M60,50 l-6,18 M120,42 l-6,18 M180,54 l-6,18 M240,44 l-6,18 M300,52 l-6,18 M360,44 l-6,18" />
      </g>
      <g className="sdan-rain-b" stroke="#a8ccd8" strokeWidth="1.6" strokeLinecap="round" opacity="0.6">
        <path d="M45,26 l-5,15 M105,20 l-5,15 M165,30 l-5,15 M225,22 l-5,15 M285,28 l-5,15 M345,18 l-5,15" />
        <path d="M75,70 l-5,15 M195,72 l-5,15 M315,68 l-5,15 M375,74 l-5,15" />
      </g>

      <style>{`
        .sdan-lamp { animation: sdan-blink 1.4s step-end infinite; }
        .sdan-watch { transform-box: fill-box; transform-origin: 50% 100%; animation: sdan-lean 3.4s ease-in-out infinite; }
        .sdan-swell { animation: sdan-heave 3s ease-in-out infinite; }
        .sdan-branch { animation: sdan-flow 4.5s linear infinite; }
        .sdan-splash { animation: sdan-pop 1s ease-out infinite; }
        .sdan-rain-a { animation: sdan-fall 0.8s linear infinite; }
        .sdan-rain-b { animation: sdan-fall 0.8s linear infinite; animation-delay: -0.4s; }
        @keyframes sdan-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
        @keyframes sdan-lean {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(4deg); }
        }
        @keyframes sdan-heave {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-14px, 3px); }
        }
        @keyframes sdan-flow {
          0% { transform: translateX(30px); }
          100% { transform: translateX(-90px); }
        }
        @keyframes sdan-pop {
          0% { transform: translateY(0); opacity: 0; }
          40% { opacity: 0.9; }
          100% { transform: translateY(-8px); opacity: 0; }
        }
        @keyframes sdan-fall {
          0% { transform: translate(6px, -18px); }
          100% { transform: translate(-6px, 18px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .sdan-lamp, .sdan-watch, .sdan-swell, .sdan-branch,
          .sdan-splash, .sdan-rain-a, .sdan-rain-b { animation: none; }
        }
      `}</style>
    </svg>
  );
}
