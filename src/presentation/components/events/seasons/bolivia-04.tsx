/**
 * 8月 — パチャママの月(ボリビア)。
 *
 * 昼の高原。家族が石の炉で供物を焚き、
 * 飲みものの最初のひとしずくを口をつける前に大地へ注ぐ(チャリャ)。
 * 注いだところの土が濃く染まり、紙テープが風に舞う。
 */
export function Bolivia04() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 高原の昼空 */}
      <rect width="400" height="210" fill="#8fc4e8" />
      <rect y="70" width="400" height="30" fill="#b8d8ea" />
      <g fill="#f6fbfe">
        <ellipse className="b04-cloud b04-cloud-a" cx="80" cy="24" rx="34" ry="10" />
        <ellipse className="b04-cloud b04-cloud-b" cx="300" cy="18" rx="40" ry="9" />
      </g>

      {/* 遠くの峰 */}
      <path d="M0,100 L54,54 L112,100 Z" fill="#7f93a8" />
      <path d="M54,54 L70,68 L38,68 Z" fill="#eaf2fa" />
      <path d="M96,100 L172,46 L248,100 Z" fill="#6f8398" />
      <path d="M172,46 L190,62 L154,62 Z" fill="#eaf2fa" />
      <path d="M226,100 L296,58 L366,100 Z" fill="#7f93a8" />
      <path d="M338,100 L384,66 L400,100 Z" fill="#6f8398" />

      {/* 大地 */}
      <rect y="100" width="400" height="110" fill="#c39a63" />
      <rect y="140" width="400" height="70" fill="#b8905a" />
      <rect y="180" width="400" height="30" fill="#a8834e" />
      <g fill="#9c7a48">
        <ellipse cx="46" cy="164" rx="26" ry="4" />
        <ellipse cx="336" cy="152" rx="22" ry="3.5" />
        <ellipse cx="196" cy="200" rx="34" ry="4.5" />
      </g>

      {/* リャマ */}
      <g transform="translate(52,150)">
        <rect x="-20" y="-18" width="6" height="18" rx="2.5" fill="#d8c9a8" />
        <rect x="-10" y="-18" width="6" height="18" rx="2.5" fill="#c8b593" />
        <rect x="6" y="-18" width="6" height="18" rx="2.5" fill="#d8c9a8" />
        <rect x="16" y="-18" width="6" height="18" rx="2.5" fill="#c8b593" />
        <rect x="-24" y="-38" width="50" height="24" rx="11" fill="#e6d9bd" />
        <path d="M16,-36 L28,-34 L26,-24 L18,-26 Z" fill="#c0392b" />
        <path d="M14,-40 L28,-38 L28,-33 L14,-35 Z" fill="#4f9e4a" />
        <g className="b04-llama-head">
          <rect x="-30" y="-64" width="9" height="30" rx="4" fill="#e6d9bd" />
          <ellipse cx="-30" cy="-66" rx="10" ry="7" fill="#e6d9bd" />
          <ellipse cx="-37" cy="-64" rx="5" ry="4" fill="#d5c5a4" />
          <path d="M-32,-73 L-30,-82 L-27,-72 Z" fill="#e6d9bd" />
          <path d="M-25,-73 L-22,-82 L-20,-72 Z" fill="#e6d9bd" />
          <circle cx="-33" cy="-67" r="1.8" fill="#3a2b22" />
        </g>
      </g>

      {/* 石の炉と燃える供物 */}
      <g>
        <ellipse cx="186" cy="176" rx="38" ry="11" fill="#8a6b40" />
        <g fill="#7d756a">
          <ellipse cx="154" cy="176" rx="12" ry="8" />
          <ellipse cx="176" cy="181" rx="13" ry="8" />
          <ellipse cx="198" cy="181" rx="13" ry="8" />
          <ellipse cx="219" cy="176" rx="12" ry="8" />
        </g>
        <ellipse cx="186" cy="172" rx="27" ry="8" fill="#4a3f30" />
        <g fill="#e8dcc4">
          <circle cx="176" cy="170" r="5" />
          <circle cx="196" cy="171" r="4.5" />
        </g>
        <circle cx="186" cy="169" r="4.5" fill="#e8a2b8" />
        <path className="b04-flame b04-flame-a" d="M168,172 C168,154 182,148 180,128 C194,142 200,158 194,172 Z" fill="#e8443f" />
        <path className="b04-flame b04-flame-b" d="M178,172 C178,158 190,152 188,138 C197,150 199,162 194,172 Z" fill="#f5b31c" />
        <path className="b04-flame b04-flame-c" d="M198,172 C196,162 206,156 205,146 C213,157 213,166 209,172 Z" fill="#e8802f" />
      </g>
      <g fill="#b6ab9c">
        <circle className="b04-smoke b04-smoke-a" cx="0" cy="0" r="12" />
        <circle className="b04-smoke b04-smoke-b" cx="0" cy="0" r="10" />
        <circle className="b04-smoke b04-smoke-c" cx="0" cy="0" r="13" />
      </g>

      {/* 炉を囲む子ども */}
      <g transform="translate(92,186)">
        <ellipse cx="0" cy="2" rx="17" ry="4.5" fill="#96733f" />
        <rect x="-9" y="-16" width="7" height="17" rx="3" fill="#3a3244" />
        <rect x="2" y="-16" width="7" height="17" rx="3" fill="#3a3244" />
        <path d="M-12,-42 L12,-42 L15,-14 L-15,-14 Z" fill="#4f9e4a" />
        <rect x="-13" y="-30" width="27" height="5" fill="#f5b31c" />
        <circle cx="0" cy="-51" r="10" fill="#c98a5e" />
        <path d="M-10,-53 a10,10 0 0 1 20,0 L9,-48 L-9,-48 Z" fill="#2b2436" />
        <rect x="-13" y="-59" width="26" height="4" rx="2" fill="#8a3f5e" />
        <rect x="-8" y="-67" width="16" height="9" rx="2" fill="#8a3f5e" />
        <g className="b04-child-arm">
          <rect x="10" y="-40" width="24" height="7" rx="3.5" fill="#4f9e4a" />
          <circle cx="34" cy="-36" r="5" fill="#c98a5e" />
        </g>
      </g>

      {/* 座って見守る母 */}
      <g transform="translate(134,196)">
        <path d="M-30,2 L-22,-24 L20,-24 L28,2 Z" fill="#b0384f" />
        <path d="M-27,-8 L25,-8 L26,-2 L-28,-2 Z" fill="#8e2a3e" />
        <rect x="-14" y="-50" width="28" height="27" rx="6" fill="#3b6fa8" />
        <path d="M-15,-48 L-29,-32 L-22,-24 L-13,-38 Z" fill="#f5b31c" />
        <path d="M-29,-38 L-15,-44 L-13,-36 L-27,-30 Z" fill="#4f9e4a" />
        <circle cx="2" cy="-59" r="10" fill="#c98a5e" />
        <path d="M-6,-52 L-9,-34 L-4,-34 L-1,-51 Z" fill="#2b2436" />
        <path d="M-8,-61 a10,10 0 0 1 20,0 L10,-57 L-8,-57 Z" fill="#2b2436" />
        <rect x="-13" y="-68" width="30" height="4" rx="2" fill="#3a3244" />
        <rect x="-8" y="-77" width="20" height="10" rx="3" fill="#3a3244" />
      </g>

      {/* 大地に染みこむひとしずく */}
      <ellipse className="b04-wet" cx="252" cy="194" rx="16" ry="5.5" fill="#6b4a26" />
      <path className="b04-pour" d="M247,146 L253,146 L256,191 L249,191 Z" fill="#dcecf5" />

      {/* 最初のひとしずくを注ぐ人 */}
      <g transform="translate(306,204)">
        <ellipse cx="-4" cy="2" rx="30" ry="6" fill="#96733f" />
        <path d="M-24,2 L-17,-36 L17,-36 L24,2 Z" fill="#4a2f52" />
        <path d="M-21,-14 L21,-14 L22,-8 L-22,-8 Z" fill="#382340" />
        <rect x="-16" y="-64" width="32" height="30" rx="6" fill="#c9713a" />
        <path d="M-17,-62 L-33,-44 L-25,-36 L-15,-52 Z" fill="#e8443f" />
        <path d="M-33,-50 L-17,-58 L-15,-49 L-31,-42 Z" fill="#f5b31c" />
        <circle cx="0" cy="-74" r="11" fill="#c98a5e" />
        <path d="M-8,-67 L-11,-42 L-5,-42 L-2,-66 Z" fill="#2b2436" />
        <path d="M8,-67 L11,-42 L5,-42 L2,-66 Z" fill="#2b2436" />
        <path d="M-11,-76 a11,11 0 0 1 22,0 L9,-71 L-9,-71 Z" fill="#2b2436" />
        <rect x="-15" y="-84" width="32" height="4" rx="2" fill="#3a3244" />
        <rect x="-9" y="-93" width="20" height="10" rx="3" fill="#3a3244" />
        <g className="b04-arm">
          <rect x="-44" y="-62" width="32" height="8" rx="4" fill="#c9713a" />
          <path d="M-62,-60 L-44,-60 L-47,-42 L-59,-42 Z" fill="#a85a2c" />
          <rect x="-63" y="-63" width="20" height="5" rx="2.5" fill="#d98a4c" />
          <circle cx="-44" cy="-54" r="6" fill="#c98a5e" />
        </g>
      </g>

      {/* 舞う紙テープと紙ふぶき */}
      <g fill="none" strokeWidth="3" strokeLinecap="round">
        <path className="b04-tape b04-tape-a" d="M0,0 q7,7 0,14 q-7,7 0,14" stroke="#e8443f" />
        <path className="b04-tape b04-tape-b" d="M0,0 q6,6 0,12 q-6,6 0,12" stroke="#f5d21c" />
        <path className="b04-tape b04-tape-c" d="M0,0 q7,7 0,14 q-7,7 0,14" stroke="#4f9e4a" />
        <path className="b04-tape b04-tape-d" d="M0,0 q6,6 0,12 q-6,6 0,12" stroke="#e8a2b8" />
      </g>

      <style>{`
        .b04-cloud-a { animation: b04-drift 30s ease-in-out infinite; }
        .b04-cloud-b { animation: b04-drift 38s ease-in-out -15s infinite; }
        .b04-llama-head { transform-box: fill-box; transform-origin: 60% 100%; animation: b04-graze 4.4s ease-in-out infinite; }
        .b04-flame { transform-box: fill-box; transform-origin: 50% 100%; }
        .b04-flame-a { animation: b04-lick 0.72s ease-in-out infinite alternate; }
        .b04-flame-b { animation: b04-lick 0.52s ease-in-out infinite alternate-reverse; }
        .b04-flame-c { animation: b04-lick 0.62s ease-in-out infinite alternate; }
        .b04-smoke-a { transform: translate(186px, 130px); animation: b04-rise 4.4s ease-out infinite; }
        .b04-smoke-b { transform: translate(180px, 108px); animation: b04-rise-b 4.4s ease-out -1.5s infinite; }
        .b04-smoke-c { transform: translate(194px, 88px); animation: b04-rise-c 4.4s ease-out -3s infinite; }
        .b04-child-arm { transform-box: fill-box; transform-origin: 4% 50%; transform: rotate(-8deg); animation: b04-reach 3.4s ease-in-out infinite; }
        .b04-arm { transform-box: fill-box; transform-origin: 100% 46%; transform: rotate(16deg); animation: b04-tip 3.4s ease-in-out infinite; }
        .b04-pour { transform-box: fill-box; transform-origin: 50% 0; animation: b04-stream 3.4s ease-in infinite; }
        .b04-wet { transform-box: fill-box; transform-origin: 50% 50%; animation: b04-soak 3.4s ease-out infinite; }
        .b04-tape { transform-box: fill-box; transform-origin: 50% 50%; }
        .b04-tape-a { transform: translate(70px, 60px); animation: b04-flutter-a 6s linear infinite; }
        .b04-tape-b { transform: translate(250px, 40px); animation: b04-flutter-b 7.4s linear -3s infinite; }
        .b04-tape-c { transform: translate(340px, 70px); animation: b04-flutter-c 6.8s linear -4.5s infinite; }
        .b04-tape-d { transform: translate(150px, 30px); animation: b04-flutter-d 8s linear -1.5s infinite; }
        @keyframes b04-drift {
          0%, 100% { transform: translateX(-18px); }
          50% { transform: translateX(18px); }
        }
        @keyframes b04-graze {
          0%, 100% { transform: rotate(0deg); }
          40% { transform: rotate(16deg); }
          60% { transform: rotate(14deg); }
        }
        @keyframes b04-lick {
          from { transform: scaleY(0.82) skewX(6deg); }
          to { transform: scaleY(1.2) skewX(-7deg); }
        }
        @keyframes b04-rise {
          0% { transform: translate(186px, 158px) scale(0.25); opacity: 0.1; }
          25% { opacity: 0.7; }
          100% { transform: translate(168px, 62px) scale(1.7); opacity: 0; }
        }
        @keyframes b04-rise-b {
          0% { transform: translate(186px, 158px) scale(0.25); opacity: 0.1; }
          25% { opacity: 0.7; }
          100% { transform: translate(202px, 58px) scale(1.7); opacity: 0; }
        }
        @keyframes b04-rise-c {
          0% { transform: translate(186px, 158px) scale(0.25); opacity: 0.1; }
          25% { opacity: 0.7; }
          100% { transform: translate(176px, 50px) scale(1.8); opacity: 0; }
        }
        @keyframes b04-reach {
          0%, 100% { transform: rotate(-8deg); }
          50% { transform: rotate(-24deg); }
        }
        @keyframes b04-tip {
          0%, 20% { transform: rotate(6deg); }
          45%, 78% { transform: rotate(24deg); }
          100% { transform: rotate(6deg); }
        }
        @keyframes b04-stream {
          0%, 22% { transform: scaleY(0); opacity: 0; }
          32% { transform: scaleY(1); opacity: 1; }
          72% { transform: scaleY(1); opacity: 1; }
          82%, 100% { transform: scaleY(1); opacity: 0; }
        }
        @keyframes b04-soak {
          0%, 34% { transform: scale(0.2); opacity: 0; }
          48% { transform: scale(1); opacity: 0.9; }
          88% { transform: scale(1.5); opacity: 0.45; }
          100% { transform: scale(1.7); opacity: 0; }
        }
        @keyframes b04-flutter-a {
          0% { transform: translate(70px, 18px) rotate(0deg); opacity: 0; }
          15% { opacity: 1; }
          100% { transform: translate(40px, 132px) rotate(180deg); opacity: 0; }
        }
        @keyframes b04-flutter-b {
          0% { transform: translate(250px, 8px) rotate(0deg); opacity: 0; }
          15% { opacity: 1; }
          100% { transform: translate(286px, 118px) rotate(-200deg); opacity: 0; }
        }
        @keyframes b04-flutter-c {
          0% { transform: translate(340px, 14px) rotate(0deg); opacity: 0; }
          15% { opacity: 1; }
          100% { transform: translate(310px, 126px) rotate(160deg); opacity: 0; }
        }
        @keyframes b04-flutter-d {
          0% { transform: translate(150px, 4px) rotate(0deg); opacity: 0; }
          15% { opacity: 1; }
          100% { transform: translate(118px, 110px) rotate(-170deg); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .b04-cloud-a, .b04-cloud-b, .b04-llama-head,
          .b04-flame-a, .b04-flame-b, .b04-flame-c,
          .b04-smoke-a, .b04-smoke-b, .b04-smoke-c,
          .b04-child-arm, .b04-arm, .b04-pour, .b04-wet,
          .b04-tape-a, .b04-tape-b, .b04-tape-c, .b04-tape-d { animation: none; }
        }
      `}</style>
    </svg>
  );
}
