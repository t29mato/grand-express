/**
 * 7月・花火と消防士の舞踏会。
 *
 * 十三日は消防署が門を開けて、消防車のあいだで人が踊る。十四日には
 * 町役場の上で空が上がる。遠くの丘では自転車の大会が登っていて、
 * 路面には村の人が描いた矢印が残っている。
 */
export function France03() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜空 */}
      <rect width="400" height="210" fill="#1b2340" />
      <g fill="#fdf6e6">
        <circle className="f03-star" cx="34" cy="18" r="1.6" />
        <circle className="f03-star f03-star2" cx="128" cy="10" r="1.4" />
        <circle className="f03-star f03-star3" cx="286" cy="14" r="1.6" />
        <circle className="f03-star f03-star4" cx="374" cy="26" r="1.4" />
      </g>

      {/* 花火。三色で上がる */}
      <g transform="translate(96,52)">
        <g className="f03-burst">
          <g stroke="#5b8fe8" strokeWidth="2.5" strokeLinecap="round">
            <path d="M0,0 L0,-26 M0,0 L18,-18 M0,0 L26,0 M0,0 L18,18 M0,0 L0,26 M0,0 L-18,18 M0,0 L-26,0 M0,0 L-18,-18" />
          </g>
          <g stroke="#5b8fe8" strokeWidth="2" strokeLinecap="round" opacity="0.7" transform="rotate(22.5)">
            <path d="M0,0 L0,-17 M0,0 L12,-12 M0,0 L17,0 M0,0 L12,12 M0,0 L0,17 M0,0 L-12,12 M0,0 L-17,0 M0,0 L-12,-12" />
          </g>
          <circle r="3.5" fill="#dceafd" />
          <g fill="#9fc4f5">
            <circle cx="0" cy="-28" r="2.6" />
            <circle cx="20" cy="-20" r="2.6" />
            <circle cx="28" cy="0" r="2.6" />
            <circle cx="20" cy="20" r="2.6" />
            <circle cx="0" cy="28" r="2.6" />
            <circle cx="-20" cy="20" r="2.6" />
            <circle cx="-28" cy="0" r="2.6" />
            <circle cx="-20" cy="-20" r="2.6" />
          </g>
        </g>
      </g>
      <g transform="translate(196,34)">
        <g className="f03-burst f03-burst2">
          <g stroke="#fdf6e6" strokeWidth="2.5" strokeLinecap="round">
            <path d="M0,0 L0,-30 M0,0 L21,-21 M0,0 L30,0 M0,0 L21,21 M0,0 L0,30 M0,0 L-21,21 M0,0 L-30,0 M0,0 L-21,-21" />
          </g>
          <g stroke="#fdf6e6" strokeWidth="2" strokeLinecap="round" opacity="0.7" transform="rotate(22.5)">
            <path d="M0,0 L0,-19 M0,0 L13,-13 M0,0 L19,0 M0,0 L13,13 M0,0 L0,19 M0,0 L-13,13 M0,0 L-19,0 M0,0 L-13,-13" />
          </g>
          <circle r="4" fill="#ffffff" />
          <g fill="#ffffff">
            <circle cx="0" cy="-32" r="2.8" />
            <circle cx="23" cy="-23" r="2.8" />
            <circle cx="32" cy="0" r="2.8" />
            <circle cx="23" cy="23" r="2.8" />
            <circle cx="0" cy="32" r="2.8" />
            <circle cx="-23" cy="23" r="2.8" />
            <circle cx="-32" cy="0" r="2.8" />
            <circle cx="-23" cy="-23" r="2.8" />
          </g>
        </g>
      </g>
      <g transform="translate(292,58)">
        <g className="f03-burst f03-burst3">
          <g stroke="#e8443f" strokeWidth="2.5" strokeLinecap="round">
            <path d="M0,0 L0,-24 M0,0 L17,-17 M0,0 L24,0 M0,0 L17,17 M0,0 L0,24 M0,0 L-17,17 M0,0 L-24,0 M0,0 L-17,-17" />
          </g>
          <g stroke="#e8443f" strokeWidth="2" strokeLinecap="round" opacity="0.7" transform="rotate(22.5)">
            <path d="M0,0 L0,-16 M0,0 L11,-11 M0,0 L16,0 M0,0 L11,11 M0,0 L0,16 M0,0 L-11,11 M0,0 L-16,0 M0,0 L-11,-11" />
          </g>
          <circle r="3.5" fill="#ffd9d7" />
          <g fill="#f5908c">
            <circle cx="0" cy="-26" r="2.5" />
            <circle cx="18" cy="-18" r="2.5" />
            <circle cx="26" cy="0" r="2.5" />
            <circle cx="18" cy="18" r="2.5" />
            <circle cx="0" cy="26" r="2.5" />
            <circle cx="-18" cy="18" r="2.5" />
            <circle cx="-26" cy="0" r="2.5" />
            <circle cx="-18" cy="-18" r="2.5" />
          </g>
        </g>
      </g>

      {/* 遠くの丘と、そこを登る自転車の大会。
          消防署と町役場のあいだの空きに置いて、隠れないようにする。 */}
      <path d="M148,150 Q182,100 216,112 Q246,122 268,150z" fill="#31406a" />
      {/* 九十九折の坂道 */}
      <path d="M156,148 q30,-6 44,-14 q-28,-3 -20,-11 q22,-6 34,-8" stroke="#c9c2b0" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* 村人が路面に描いた矢印 */}
      <g stroke="#f5b31c" strokeWidth="2" strokeLinecap="round" opacity="0.95">
        <path d="M168,145 l5,-3 l-5,-3 M188,138 l5,-3 l-5,-3 M196,122 l5,3 l-5,3" />
      </g>
      <g className="f03-riders">
        <g>
          <circle cx="0" cy="-6" r="3.4" fill="#e8443f" />
          <circle cx="-4" cy="-1" r="2.8" fill="none" stroke="#e0dac8" strokeWidth="1.5" />
          <circle cx="4" cy="-1" r="2.8" fill="none" stroke="#e0dac8" strokeWidth="1.5" />
        </g>
        <g transform="translate(-14,5)">
          <circle cx="0" cy="-6" r="3.4" fill="#f5b31c" />
          <circle cx="-4" cy="-1" r="2.8" fill="none" stroke="#e0dac8" strokeWidth="1.5" />
          <circle cx="4" cy="-1" r="2.8" fill="none" stroke="#e0dac8" strokeWidth="1.5" />
        </g>
      </g>

      {/* 町役場と三色旗 */}
      <g transform="translate(324,150)">
        <rect x="-56" y="-62" width="112" height="62" fill="#3d4668" />
        <path d="M-62,-62 L62,-62 L0,-88z" fill="#2e3654" />
        <g fill="#f5cf6a">
          <rect className="f03-win" x="-42" y="-48" width="16" height="22" rx="2" />
          <rect className="f03-win f03-win2" x="-16" y="-48" width="16" height="22" rx="2" />
          <rect className="f03-win f03-win3" x="10" y="-48" width="16" height="22" rx="2" />
          <rect className="f03-win f03-win4" x="34" y="-48" width="16" height="22" rx="2" />
        </g>
        <rect x="-10" y="-24" width="20" height="24" rx="2" fill="#2a3150" />
        <rect x="-1.5" y="-116" width="3" height="30" fill="#c9c2b0" />
        <g className="f03-flag">
          <rect x="1.5" y="-114" width="11" height="18" fill="#2f4fa8" />
          <rect x="12.5" y="-114" width="11" height="18" fill="#f4f1e8" />
          <rect x="23.5" y="-114" width="11" height="18" fill="#d0342c" />
        </g>
      </g>

      {/* 地面 */}
      <rect y="150" width="400" height="60" fill="#2a3150" />
      <rect y="150" width="400" height="4" fill="#3a4468" />

      {/* 門を開けた消防署 */}
      <g transform="translate(74,150)">
        <rect x="-70" y="-70" width="140" height="70" fill="#4a3550" />
        <rect x="-70" y="-70" width="140" height="7" fill="#5c4364" />
        <rect x="-52" y="-52" width="46" height="52" rx="3" fill="#f5cf6a" />
        <rect x="6" y="-52" width="46" height="52" rx="3" fill="#f5cf6a" />
        <rect x="-52" y="-52" width="46" height="52" rx="3" fill="none" stroke="#6b5175" strokeWidth="3" />
        <rect x="6" y="-52" width="46" height="52" rx="3" fill="none" stroke="#6b5175" strokeWidth="3" />
      </g>

      {/* 消防車 */}
      <g transform="translate(120,196)">
        <rect x="-46" y="-34" width="60" height="26" rx="3" fill="#d0342c" />
        <rect x="14" y="-26" width="26" height="18" rx="3" fill="#e8443f" />
        <rect x="20" y="-22" width="14" height="10" rx="2" fill="#9fc4f5" />
        <rect x="-44" y="-40" width="52" height="5" rx="2" fill="#b9b0a0" />
        <rect x="-40" y="-44" width="44" height="4" rx="2" fill="#c9c2b0" />
        <g className="f03-beacon">
          <rect x="-8" y="-40" width="10" height="6" rx="3" fill="#5b8fe8" />
        </g>
        <circle cx="-30" cy="-6" r="7" fill="#22283f" />
        <circle cx="-30" cy="-6" r="3" fill="#4a5578" />
        <circle cx="26" cy="-6" r="7" fill="#22283f" />
        <circle cx="26" cy="-6" r="3" fill="#4a5578" />
      </g>

      {/* 消防車のあいだで踊る人 */}
      <g transform="translate(216,202)">
        <g className="f03-pair">
          <g className="f03-dancer">
            <path d="M-13,0 L-11,-26 L5,-26 L7,0z" fill="#e8443f" />
            <circle cx="-3" cy="-36" r="10" fill="#f6efe2" />
            <path d="M-13,-38 q10,-10 20,-1 q-3,-9 -10,-9 q-9,0 -10,10z" fill="#3b2f24" />
          </g>
          <g className="f03-dancer f03-dancer-b">
            <path d="M17,0 L15,-26 L31,-26 L33,0z" fill="#f4f1e8" />
            <circle cx="24" cy="-36" r="10" fill="#f6efe2" />
            <path d="M14,-39 q10,-9 20,0 q-2,-10 -10,-10 q-9,0 -10,10z" fill="#6b4326" />
          </g>
          <path d="M6,-24 q7,-4 13,0" stroke="#f6efe2" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        </g>
      </g>
      <g transform="translate(300,204) scale(0.88)">
        <g className="f03-pair f03-pair2">
          <g className="f03-dancer f03-dancer-c">
            <path d="M-13,0 L-11,-26 L5,-26 L7,0z" fill="#5b8fe8" />
            <circle cx="-3" cy="-36" r="10" fill="#f6efe2" />
            <path d="M-13,-38 q10,-10 20,-1 q-3,-9 -10,-9 q-9,0 -10,10z" fill="#5a3a22" />
          </g>
          <g className="f03-dancer f03-dancer-d">
            <path d="M17,0 L15,-26 L31,-26 L33,0z" fill="#f5b31c" />
            <circle cx="24" cy="-36" r="10" fill="#f6efe2" />
            <path d="M14,-39 q10,-9 20,0 q-2,-10 -10,-10 q-9,0 -10,10z" fill="#2a2233" />
          </g>
          <path d="M6,-24 q7,-4 13,0" stroke="#f6efe2" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        </g>
      </g>

      <style>{`
        .f03-star { animation: f03-twinkle 3s ease-in-out infinite; }
        .f03-star2 { animation-delay: 1s; }
        .f03-star3 { animation-delay: 2s; }
        .f03-star4 { animation-delay: 1.5s; }
        .f03-burst {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: f03-bloom 3.6s ease-out infinite backwards;
        }
        .f03-burst2 { animation-delay: 1.2s; animation-duration: 4.2s; }
        .f03-burst3 { animation-delay: 2.4s; animation-duration: 3.2s; }
        .f03-riders {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: f03-climb 8s linear infinite;
        }
        .f03-win { animation: f03-lamp 4.4s ease-in-out infinite; }
        .f03-win2 { animation-delay: 0.6s; }
        .f03-win3 { animation-delay: 1.2s; }
        .f03-win4 { animation-delay: 1.8s; }
        .f03-flag {
          transform-box: fill-box; transform-origin: 0 50%;
          animation: f03-wave 3s ease-in-out infinite;
        }
        .f03-beacon { animation: f03-flash 0.85s steps(2, end) infinite; }
        .f03-pair {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: f03-turn 2.4s ease-in-out infinite;
        }
        .f03-pair2 { animation-delay: 0.8s; animation-duration: 2.8s; }
        .f03-dancer {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: f03-step 1.2s ease-in-out infinite;
        }
        .f03-dancer-b { animation-delay: 0.6s; }
        .f03-dancer-c { animation-delay: 0.3s; }
        .f03-dancer-d { animation-delay: 0.9s; }
        @keyframes f03-twinkle {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 1; }
        }
        @keyframes f03-bloom {
          0% { transform: scale(0.08); opacity: 0; }
          10% { opacity: 1; }
          55% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1.35); opacity: 0; }
        }
        @keyframes f03-climb {
          0% { transform: translate(162px, 146px); opacity: 0; }
          10% { opacity: 1; }
          85% { opacity: 1; }
          100% { transform: translate(232px, 108px); opacity: 0; }
        }
        @keyframes f03-lamp {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        @keyframes f03-wave {
          0%, 100% { transform: skewY(-4deg) scaleX(1); }
          50% { transform: skewY(5deg) scaleX(0.9); }
        }
        @keyframes f03-flash {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0.25; }
        }
        @keyframes f03-turn {
          0%, 100% { transform: translateX(0) rotate(-3deg); }
          50% { transform: translateX(-10px) rotate(3deg); }
        }
        @keyframes f03-step {
          0%, 100% { transform: translateY(0) rotate(-4deg); }
          50% { transform: translateY(-5px) rotate(4deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .f03-star, .f03-burst, .f03-riders, .f03-win, .f03-flag,
          .f03-beacon, .f03-pair, .f03-dancer { animation: none; }
        }
      `}</style>
    </svg>
  );
}
