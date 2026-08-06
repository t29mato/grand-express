/**
 * 9月。ガネーシャを海へ送る。
 *
 * 家一軒ほどの土のガネーシャが担がれて波打ちぎわまで来て、水に入っていく。
 * 花びらが降り、腕が上がり、うしろでは雨がだんだん細くなる。
 */
export function India05() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 雨の細くなった空 */}
      <rect width="400" height="210" fill="#8fb6cf" />
      <ellipse cx="330" cy="34" rx="72" ry="34" fill="#b9d6e6" />
      <circle cx="332" cy="32" r="20" fill="#f3e2a4" />
      <g fill="#7ba3bd">
        <ellipse cx="40" cy="20" rx="66" ry="24" />
        <ellipse cx="150" cy="14" rx="72" ry="22" />
      </g>

      {/* 遠くの町と椰子 */}
      <g fill="#4a6b7a">
        <rect y="118" width="400" height="10" />
        <rect x="8" y="96" width="34" height="24" />
        <rect x="46" y="104" width="26" height="16" />
        <rect x="330" y="100" width="30" height="20" />
        <rect x="364" y="108" width="24" height="12" />
        <rect x="96" y="86" width="6" height="34" />
        <ellipse cx="86" cy="86" rx="16" ry="5" />
        <ellipse cx="112" cy="86" rx="16" ry="5" />
        <ellipse cx="99" cy="80" rx="6" ry="12" />
        <rect x="290" y="90" width="6" height="30" />
        <ellipse cx="280" cy="90" rx="15" ry="5" />
        <ellipse cx="306" cy="90" rx="15" ry="5" />
      </g>

      {/* 濡れた砂と海 */}
      <rect y="128" width="400" height="38" fill="#c9a877" />
      <rect y="166" width="400" height="44" fill="#3f7f9c" />

      {/* 見送る人びと */}
      <g className="i05-crowd-l" fill="#3a5566">
        <rect x="40" y="134" width="15" height="30" rx="6" />
        <circle cx="47" cy="128" r="8" />
        <rect x="30" y="110" width="6" height="26" rx="3" />
        <rect x="59" y="110" width="6" height="26" rx="3" />
        <rect x="68" y="138" width="14" height="26" rx="6" />
        <circle cx="75" cy="132" r="7" />
        <rect x="84" y="116" width="6" height="24" rx="3" />
      </g>
      <g className="i05-crowd-r" fill="#3a5566">
        <rect x="322" y="134" width="15" height="30" rx="6" />
        <circle cx="329" cy="128" r="8" />
        <rect x="312" y="110" width="6" height="26" rx="3" />
        <rect x="341" y="110" width="6" height="26" rx="3" />
        <rect x="350" y="138" width="14" height="26" rx="6" />
        <circle cx="357" cy="132" r="7" />
        <rect x="366" y="116" width="6" height="24" rx="3" />
      </g>

      {/* 水に入っていく担ぎ手 */}
      <g className="i05-bearers" fill="#2e4756">
        <rect x="128" y="130" width="6" height="28" rx="3" />
        <rect x="150" y="130" width="6" height="28" rx="3" />
        <circle cx="142" cy="148" r="10" />
        <rect x="133" y="154" width="18" height="42" rx="7" />
        <rect x="160" y="130" width="6" height="28" rx="3" />
        <rect x="182" y="130" width="6" height="28" rx="3" />
        <circle cx="174" cy="148" r="10" />
        <rect x="165" y="154" width="18" height="42" rx="7" />
        <rect x="192" y="130" width="6" height="28" rx="3" />
        <rect x="214" y="130" width="6" height="28" rx="3" />
        <circle cx="206" cy="148" r="10" />
        <rect x="197" y="154" width="18" height="42" rx="7" />
        <rect x="224" y="130" width="6" height="28" rx="3" />
        <rect x="246" y="130" width="6" height="28" rx="3" />
        <circle cx="238" cy="148" r="10" />
        <rect x="229" y="154" width="18" height="42" rx="7" />
      </g>

      {/* 水面 */}
      <rect y="166" width="400" height="44" fill="#3f7f9c" opacity="0.6" />
      <rect y="164" width="400" height="5" fill="#8fc4d8" />
      <g fill="#6fb0c8">
        <rect className="i05-wave-a" x="10" y="180" width="96" height="5" rx="2.5" />
        <rect className="i05-wave-b" x="150" y="196" width="120" height="5" rx="2.5" />
        <rect className="i05-wave-c" x="280" y="174" width="88" height="4" rx="2" />
      </g>
      <g fill="none" stroke="#a8dcec" strokeWidth="2.5">
        <ellipse className="i05-ring-a" cx="146" cy="184" rx="18" ry="6" />
        <ellipse className="i05-ring-b" cx="240" cy="180" rx="18" ry="6" />
      </g>

      {/* 神輿と土のガネーシャ */}
      <g className="i05-idol">
        <rect x="126" y="116" width="144" height="14" rx="3" fill="#b5342f" />
        <rect x="126" y="116" width="144" height="5" fill="#f5b31c" />
        <g stroke="#d18f4e" strokeWidth="11" strokeLinecap="round" fill="none">
          <path d="M164,88 L142,68" />
          <path d="M216,88 L238,68" />
        </g>
        <circle cx="138" cy="64" r="8" fill="#e2a464" />
        <circle cx="242" cy="64" r="8" fill="#e2a464" />
        <ellipse cx="190" cy="92" rx="42" ry="26" fill="#e2a464" />
        <path d="M150,100 q40,18 80,0 l0,16 -80,0 z" fill="#e8443f" />
        <ellipse cx="158" cy="52" rx="15" ry="20" fill="#d18f4e" />
        <ellipse cx="222" cy="52" rx="15" ry="20" fill="#d18f4e" />
        <circle cx="190" cy="52" r="25" fill="#e2a464" />
        <path d="M175,64 L182,82 L169,78 z" fill="#f6efe2" />
        <path d="M205,64 L211,78 L198,82 z" fill="#f6efe2" />
        <path
          className="i05-trunk"
          d="M190,66 C190,88 184,100 176,106 C168,112 161,104 169,99"
          fill="none"
          stroke="#d18f4e"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <circle cx="181" cy="48" r="3" fill="#3a2a1a" />
        <circle cx="199" cy="48" r="3" fill="#3a2a1a" />
        <path d="M171,28 Q190,-2 209,28 z" fill="#f5b31c" />
        <circle cx="190" cy="8" r="5" fill="#f5b31c" />
        <rect x="168" y="26" width="44" height="6" rx="3" fill="#e09a10" />
        <g className="i05-garland" fill="#f5931c">
          <circle cx="154" cy="82" r="4" />
          <circle cx="152" cy="96" r="4" />
          <circle cx="157" cy="108" r="4" />
          <circle cx="223" cy="108" r="4" />
          <circle cx="228" cy="96" r="4" />
          <circle cx="226" cy="82" r="4" />
        </g>
      </g>

      {/* 舞う花びら */}
      <g fill="#f5b31c">
        <circle className="i05-petal-a" cx="120" cy="40" r="4" />
        <circle className="i05-petal-b" cx="260" cy="30" r="4" />
        <circle className="i05-petal-c" cx="200" cy="20" r="3.5" />
        <circle className="i05-petal-d" cx="300" cy="60" r="4" />
        <circle className="i05-petal-e" cx="70" cy="60" r="3.5" />
      </g>
      <g fill="#e8443f">
        <circle className="i05-petal-f" cx="160" cy="26" r="3.5" />
        <circle className="i05-petal-g" cx="238" cy="52" r="3.5" />
      </g>

      {/* 細くなった雨 */}
      <g stroke="#dcecf4" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.4">
        <path className="i05-rain-a" d="M30,12 l-5,20" />
        <path className="i05-rain-b" d="M110,60 l-5,20" />
        <path className="i05-rain-c" d="M280,16 l-5,20" />
        <path className="i05-rain-d" d="M366,72 l-5,20" />
      </g>

      <style>{`
        .i05-idol { transform-box: fill-box; transform-origin: 50% 100%; animation: i05-carry 2.4s ease-in-out infinite; }
        .i05-bearers { animation: i05-step 1.2s ease-in-out infinite; }
        .i05-trunk { transform-box: fill-box; transform-origin: 100% 0; animation: i05-swing 3.4s ease-in-out infinite; }
        .i05-garland { transform-box: fill-box; transform-origin: 50% 0; animation: i05-swing 2.8s ease-in-out infinite; }
        .i05-crowd-l { transform-box: fill-box; transform-origin: 50% 100%; animation: i05-cheer 1.6s ease-in-out infinite; }
        .i05-crowd-r { transform-box: fill-box; transform-origin: 50% 100%; animation: i05-cheer 1.6s ease-in-out infinite; animation-delay: -0.8s; }
        .i05-wave-a { animation: i05-flow 6.2s linear infinite; }
        .i05-wave-b { animation: i05-flow 7.4s linear infinite; animation-delay: -2.4s; }
        .i05-wave-c { animation: i05-flow 5.6s linear infinite; animation-delay: -3.8s; }
        .i05-ring-a, .i05-ring-b {
          transform-box: fill-box;
          transform-origin: center;
          animation: i05-splash 2s ease-out infinite;
        }
        .i05-ring-b { animation-delay: -1s; }
        .i05-petal-a { animation: i05-drop 4.2s linear infinite; }
        .i05-petal-b { animation: i05-drop 5s linear infinite; animation-delay: -1.6s; }
        .i05-petal-c { animation: i05-drop 4.6s linear infinite; animation-delay: -2.8s; }
        .i05-petal-d { animation: i05-drop 5.4s linear infinite; animation-delay: -0.9s; }
        .i05-petal-e { animation: i05-drop 4.8s linear infinite; animation-delay: -3.4s; }
        .i05-petal-f { animation: i05-drop 5.2s linear infinite; animation-delay: -2.1s; }
        .i05-petal-g { animation: i05-drop 4.4s linear infinite; animation-delay: -3.8s; }
        .i05-rain-a { animation: i05-fall 1s linear infinite; }
        .i05-rain-b { animation: i05-fall 1.2s linear infinite; animation-delay: -0.4s; }
        .i05-rain-c { animation: i05-fall 0.9s linear infinite; animation-delay: -0.7s; }
        .i05-rain-d { animation: i05-fall 1.1s linear infinite; animation-delay: -0.2s; }
        @keyframes i05-carry {
          0%, 100% { transform: translate(0, 0) rotate(-1.2deg); }
          50% { transform: translate(6px, -4px) rotate(1.2deg); }
        }
        @keyframes i05-step {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(4px, -3px); }
        }
        @keyframes i05-swing {
          0%, 100% { transform: rotate(-4deg); }
          50% { transform: rotate(4deg); }
        }
        @keyframes i05-cheer {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(0, -4px); }
        }
        @keyframes i05-flow {
          0% { transform: translate(70px, 0); opacity: 0; }
          22%, 74% { opacity: 0.9; }
          100% { transform: translate(-100px, 0); opacity: 0; }
        }
        @keyframes i05-splash {
          0% { transform: scale(0.3); opacity: 0.9; }
          100% { transform: scale(2); opacity: 0; }
        }
        @keyframes i05-drop {
          0% { transform: translate(0, -30px) rotate(0deg); opacity: 0; }
          14%, 84% { opacity: 1; }
          100% { transform: translate(-26px, 120px) rotate(200deg); opacity: 0; }
        }
        @keyframes i05-fall {
          0% { transform: translate(12px, -50px); opacity: 0; }
          18%, 82% { opacity: 0.45; }
          100% { transform: translate(-10px, 56px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .i05-idol, .i05-bearers, .i05-trunk, .i05-garland,
          .i05-crowd-l, .i05-crowd-r,
          .i05-wave-a, .i05-wave-b, .i05-wave-c, .i05-ring-a, .i05-ring-b,
          .i05-petal-a, .i05-petal-b, .i05-petal-c, .i05-petal-d,
          .i05-petal-e, .i05-petal-f, .i05-petal-g,
          .i05-rain-a, .i05-rain-b, .i05-rain-c, .i05-rain-d { animation: none; }
        }
      `}</style>
    </svg>
  );
}
