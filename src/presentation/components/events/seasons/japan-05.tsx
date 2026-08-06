/**
 * 9月・十五夜と稲刈り。
 *
 * 大きな月の下、黄金色になった田んぼを鎌で刈り、
 * 手前ではすすきが揺れ、三方に月見団子が積んである。
 */
export function Japan05() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 月夜 */}
      <rect width="400" height="210" fill="#2a3f66" />
      <circle className="j05-halo" cx="312" cy="54" r="56" fill="#f7f0cc" opacity="0.16" />
      <circle cx="312" cy="54" r="38" fill="#f7f0cc" />
      <g fill="#e6dcb4">
        <ellipse cx="300" cy="44" rx="9" ry="6" />
        <ellipse cx="324" cy="62" rx="7" ry="5" />
        <ellipse cx="304" cy="68" rx="5" ry="4" />
      </g>

      {/* 遠い山 */}
      <path
        d="M0,114 Q80,94 160,110 Q240,124 320,104 Q360,96 400,108 L400,132 L0,132z"
        fill="#1d3050"
      />

      {/* 黄金の田んぼ */}
      <rect y="126" width="400" height="84" fill="#ad8a1c" />
      <rect y="126" width="400" height="12" fill="#8f6f12" />

      {/* まだ立っている稲 */}
      <g fill="none" stroke="#e2c455" strokeWidth="3" strokeLinecap="round">
        <g transform="translate(20,152)">
          <g className="j05-rice">
            <path d="M0,0 q-4,-12 -9,-20 M0,0 q0,-13 -1,-22 M0,0 q4,-12 9,-20" />
            <g fill="#f2de92" stroke="none">
              <circle cx="-9" cy="-21" r="2.6" />
              <circle cx="-1" cy="-23" r="2.6" />
              <circle cx="9" cy="-21" r="2.6" />
            </g>
          </g>
        </g>
        <g transform="translate(62,154)">
          <g className="j05-rice j05-rice2">
            <path d="M0,0 q-4,-12 -9,-20 M0,0 q0,-13 -1,-22 M0,0 q4,-12 9,-20" />
            <g fill="#f2de92" stroke="none">
              <circle cx="-9" cy="-21" r="2.6" />
              <circle cx="-1" cy="-23" r="2.6" />
              <circle cx="9" cy="-21" r="2.6" />
            </g>
          </g>
        </g>
        <g transform="translate(104,151)">
          <g className="j05-rice j05-rice3">
            <path d="M0,0 q-4,-12 -9,-20 M0,0 q0,-13 -1,-22 M0,0 q4,-12 9,-20" />
            <g fill="#f2de92" stroke="none">
              <circle cx="-9" cy="-21" r="2.6" />
              <circle cx="-1" cy="-23" r="2.6" />
              <circle cx="9" cy="-21" r="2.6" />
            </g>
          </g>
        </g>
        <g transform="translate(146,154)">
          <g className="j05-rice j05-rice4">
            <path d="M0,0 q-4,-12 -9,-20 M0,0 q0,-13 -1,-22 M0,0 q4,-12 9,-20" />
            <g fill="#f2de92" stroke="none">
              <circle cx="-9" cy="-21" r="2.6" />
              <circle cx="-1" cy="-23" r="2.6" />
              <circle cx="9" cy="-21" r="2.6" />
            </g>
          </g>
        </g>
        <g transform="translate(188,152)">
          <g className="j05-rice j05-rice5">
            <path d="M0,0 q-4,-12 -9,-20 M0,0 q0,-13 -1,-22 M0,0 q4,-12 9,-20" />
            <g fill="#f2de92" stroke="none">
              <circle cx="-9" cy="-21" r="2.6" />
              <circle cx="-1" cy="-23" r="2.6" />
              <circle cx="9" cy="-21" r="2.6" />
            </g>
          </g>
        </g>
        <g transform="translate(230,155)">
          <g className="j05-rice j05-rice6">
            <path d="M0,0 q-4,-12 -9,-20 M0,0 q0,-13 -1,-22 M0,0 q4,-12 9,-20" />
            <g fill="#f2de92" stroke="none">
              <circle cx="-9" cy="-21" r="2.6" />
              <circle cx="-1" cy="-23" r="2.6" />
              <circle cx="9" cy="-21" r="2.6" />
            </g>
          </g>
        </g>
        <g transform="translate(272,151)">
          <g className="j05-rice j05-rice7">
            <path d="M0,0 q-4,-12 -9,-20 M0,0 q0,-13 -1,-22 M0,0 q4,-12 9,-20" />
            <g fill="#f2de92" stroke="none">
              <circle cx="-9" cy="-21" r="2.6" />
              <circle cx="-1" cy="-23" r="2.6" />
              <circle cx="9" cy="-21" r="2.6" />
            </g>
          </g>
        </g>
        <g transform="translate(314,154)">
          <g className="j05-rice j05-rice8">
            <path d="M0,0 q-4,-12 -9,-20 M0,0 q0,-13 -1,-22 M0,0 q4,-12 9,-20" />
            <g fill="#f2de92" stroke="none">
              <circle cx="-9" cy="-21" r="2.6" />
              <circle cx="-1" cy="-23" r="2.6" />
              <circle cx="9" cy="-21" r="2.6" />
            </g>
          </g>
        </g>
        <g transform="translate(358,152)">
          <g className="j05-rice j05-rice9">
            <path d="M0,0 q-4,-12 -9,-20 M0,0 q0,-13 -1,-22 M0,0 q4,-12 9,-20" />
            <g fill="#f2de92" stroke="none">
              <circle cx="-9" cy="-21" r="2.6" />
              <circle cx="-1" cy="-23" r="2.6" />
              <circle cx="9" cy="-21" r="2.6" />
            </g>
          </g>
        </g>
      </g>

      {/* 刈られた株 */}
      <rect y="160" width="400" height="50" fill="#9c7a16" />
      <g stroke="#7d6210" strokeWidth="3" strokeLinecap="round">
        <path d="M18,176 l0,-7 M46,182 l0,-7 M78,172 l0,-7 M112,186 l0,-7 M148,176 l0,-7 M186,190 l0,-7 M224,178 l0,-7 M262,192 l0,-7 M300,180 l0,-7 M338,194 l0,-7 M374,178 l0,-7 M60,200 l0,-7 M140,204 l0,-7 M232,202 l0,-7 M316,206 l0,-7" />
      </g>

      {/* 刈った稲束 */}
      <g fill="#d9b842">
        <path d="M244,186 L252,164 L262,186 L256,178 L250,178z" />
        <path d="M240,186 L268,186 L266,192 L242,192z" fill="#a8801a" />
        <path d="M272,190 L280,168 L290,190 L284,182 L278,182z" />
        <path d="M268,190 L296,190 L294,196 L270,196z" fill="#a8801a" />
        <path d="M300,196 L308,174 L318,196 L312,188 L306,188z" />
        <path d="M296,196 L324,196 L322,202 L298,202z" fill="#a8801a" />
      </g>

      {/* 稲を刈る人 */}
      <g transform="translate(196,200)">
        <rect x="-10" y="-20" width="9" height="20" rx="3" fill="#3b3550" />
        <rect x="4" y="-20" width="9" height="20" rx="3" fill="#3b3550" />
        <path d="M-14,-18 Q-19,-40 -2,-48 L15,-41 L13,-18 Z" fill="#33445a" />
        <path d="M-2,-48 L15,-41 L14,-34 L-3,-41 Z" fill="#f6efe2" />
        <circle cx="-20" cy="-49" r="10" fill="#f6efe2" />
        <circle cx="-25" cy="-47" r="1.8" fill="#2a2233" />
        <path d="M-42,-55 Q-20,-72 2,-55 Q-20,-50 -42,-55z" fill="#d9c48a" />
        <path d="M-42,-55 Q-20,-72 2,-55" fill="none" stroke="#b8a06a" strokeWidth="2" />
        <g transform="translate(-2,-38)">
          <g className="j05-cut">
            <path d="M0,0 L-24,14" stroke="#f6efe2" strokeWidth="9" strokeLinecap="round" fill="none" />
            <path d="M-22,17 l7,4" stroke="#8a5c33" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M-25,13 q-14,-2 -20,-13" stroke="#c9d0d6" strokeWidth="4" strokeLinecap="round" fill="none" />
          </g>
        </g>
      </g>

      {/* すすき */}
      <g transform="translate(52,208)">
        <g className="j05-susuki">
          <path d="M0,0 Q-6,-46 -22,-84" fill="none" stroke="#b9a978" strokeWidth="3" strokeLinecap="round" />
          <g transform="translate(-22,-84) rotate(-22)">
            <ellipse cx="0" cy="-12" rx="7" ry="15" fill="#e8dcc0" />
            <path d="M0,2 L0,-26 M-5,-4 L-8,-22 M5,-4 L8,-22" stroke="#f4ecd8" strokeWidth="1.6" strokeLinecap="round" fill="none" />
          </g>
        </g>
      </g>
      <g transform="translate(76,208)">
        <g className="j05-susuki j05-susuki2">
          <path d="M0,0 Q-2,-50 -8,-96" fill="none" stroke="#b9a978" strokeWidth="3" strokeLinecap="round" />
          <g transform="translate(-8,-96) rotate(-10)">
            <ellipse cx="0" cy="-13" rx="7" ry="17" fill="#e8dcc0" />
            <path d="M0,2 L0,-28 M-5,-4 L-8,-24 M5,-4 L8,-24" stroke="#f4ecd8" strokeWidth="1.6" strokeLinecap="round" fill="none" />
          </g>
        </g>
      </g>
      <g transform="translate(98,208)">
        <g className="j05-susuki j05-susuki3">
          <path d="M0,0 Q4,-42 12,-78" fill="none" stroke="#b9a978" strokeWidth="3" strokeLinecap="round" />
          <g transform="translate(12,-78) rotate(14)">
            <ellipse cx="0" cy="-11" rx="6" ry="14" fill="#e8dcc0" />
            <path d="M0,2 L0,-24 M-4,-4 L-7,-20 M4,-4 L7,-20" stroke="#f4ecd8" strokeWidth="1.6" strokeLinecap="round" fill="none" />
          </g>
        </g>
      </g>
      <g transform="translate(120,208)">
        <g className="j05-susuki j05-susuki4">
          <path d="M0,0 Q8,-44 20,-88" fill="none" stroke="#b9a978" strokeWidth="3" strokeLinecap="round" />
          <g transform="translate(20,-88) rotate(24)">
            <ellipse cx="0" cy="-12" rx="6" ry="15" fill="#e8dcc0" />
            <path d="M0,2 L0,-26 M-4,-4 L-7,-22 M4,-4 L7,-22" stroke="#f4ecd8" strokeWidth="1.6" strokeLinecap="round" fill="none" />
          </g>
        </g>
      </g>

      {/* 三方の月見団子 */}
      <g>
        <rect x="330" y="196" width="52" height="8" rx="2" fill="#c9a877" />
        <rect x="338" y="203" width="8" height="7" fill="#a8875a" />
        <rect x="366" y="203" width="8" height="7" fill="#a8875a" />
        <g className="j05-dango" fill="#f8f4ea">
          <circle cx="344" cy="189" r="7" />
          <circle cx="356" cy="189" r="7" />
          <circle cx="368" cy="189" r="7" />
          <circle cx="350" cy="178" r="7" />
          <circle cx="362" cy="178" r="7" />
          <circle cx="356" cy="167" r="7" />
        </g>
      </g>

      <style>{`
        .j05-halo {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: j05-breathe 5s ease-in-out infinite;
        }
        .j05-rice {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: j05-sway 3.6s ease-in-out infinite;
        }
        .j05-rice2 { animation-delay: 0.2s; }
        .j05-rice3 { animation-delay: 0.4s; }
        .j05-rice4 { animation-delay: 0.6s; }
        .j05-rice5 { animation-delay: 0.8s; }
        .j05-rice6 { animation-delay: 1s; }
        .j05-rice7 { animation-delay: 1.2s; }
        .j05-rice8 { animation-delay: 1.4s; }
        .j05-rice9 { animation-delay: 1.6s; }
        .j05-susuki {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: j05-lean 4.6s ease-in-out infinite;
        }
        .j05-susuki2 { animation-delay: 0.5s; animation-duration: 5.2s; }
        .j05-susuki3 { animation-delay: 1s; animation-duration: 4.2s; }
        .j05-susuki4 { animation-delay: 1.5s; animation-duration: 5.6s; }
        .j05-cut {
          transform-box: fill-box; transform-origin: 100% 0%;
          animation: j05-reap 2.4s ease-in-out infinite;
        }
        .j05-dango {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: j05-offer 4s ease-in-out infinite;
        }
        @keyframes j05-breathe {
          0%, 100% { opacity: 0.12; transform: scale(1); }
          50% { opacity: 0.24; transform: scale(1.06); }
        }
        @keyframes j05-sway {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes j05-lean {
          0%, 100% { transform: rotate(-4deg); }
          50% { transform: rotate(6deg); }
        }
        @keyframes j05-reap {
          0%, 100% { transform: rotate(0deg); }
          35% { transform: rotate(-34deg); }
          60% { transform: rotate(10deg); }
        }
        @keyframes j05-offer {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .j05-halo, .j05-rice, .j05-susuki, .j05-cut, .j05-dango { animation: none; }
        }
      `}</style>
    </svg>
  );
}
