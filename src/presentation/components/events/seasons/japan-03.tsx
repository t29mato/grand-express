/**
 * 7月・夏祭り。
 *
 * 提灯の下で太鼓が打ち鳴らされ、浴衣の人だかりが見上げる先で花火が開く。
 */
export function Japan03() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夏の夜 */}
      <rect width="400" height="210" fill="#20364a" />
      <ellipse className="j03-glow" cx="200" cy="150" rx="190" ry="96" fill="#f5b31c" />

      {/* 花火 */}
      <g transform="translate(78,50)">
        <g className="j03-burst">
          <path
            d="M9,0 L28,0 M6.4,6.4 L19.8,19.8 M0,9 L0,28 M-6.4,6.4 L-19.8,19.8 M-9,0 L-28,0 M-6.4,-6.4 L-19.8,-19.8 M0,-9 L0,-28 M6.4,-6.4 L19.8,-19.8"
            stroke="#f5b31c"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <g fill="#fde9b0">
            <circle cx="33" cy="0" r="3" />
            <circle cx="23.3" cy="23.3" r="3" />
            <circle cx="0" cy="33" r="3" />
            <circle cx="-23.3" cy="23.3" r="3" />
            <circle cx="-33" cy="0" r="3" />
            <circle cx="-23.3" cy="-23.3" r="3" />
            <circle cx="0" cy="-33" r="3" />
            <circle cx="23.3" cy="-23.3" r="3" />
          </g>
        </g>
      </g>
      <g transform="translate(208,40) scale(1.3)">
        <g className="j03-burst j03-burst2">
          <path
            d="M9,0 L28,0 M6.4,6.4 L19.8,19.8 M0,9 L0,28 M-6.4,6.4 L-19.8,19.8 M-9,0 L-28,0 M-6.4,-6.4 L-19.8,-19.8 M0,-9 L0,-28 M6.4,-6.4 L19.8,-19.8"
            stroke="#e8443f"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <g fill="#ffc9bf">
            <circle cx="33" cy="0" r="3" />
            <circle cx="23.3" cy="23.3" r="3" />
            <circle cx="0" cy="33" r="3" />
            <circle cx="-23.3" cy="23.3" r="3" />
            <circle cx="-33" cy="0" r="3" />
            <circle cx="-23.3" cy="-23.3" r="3" />
            <circle cx="0" cy="-33" r="3" />
            <circle cx="23.3" cy="-23.3" r="3" />
          </g>
        </g>
      </g>
      <g transform="translate(328,58) scale(0.9)">
        <g className="j03-burst j03-burst3">
          <path
            d="M9,0 L28,0 M6.4,6.4 L19.8,19.8 M0,9 L0,28 M-6.4,6.4 L-19.8,19.8 M-9,0 L-28,0 M-6.4,-6.4 L-19.8,-19.8 M0,-9 L0,-28 M6.4,-6.4 L19.8,-19.8"
            stroke="#7fd6e8"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <g fill="#d5f3fa">
            <circle cx="33" cy="0" r="3" />
            <circle cx="23.3" cy="23.3" r="3" />
            <circle cx="0" cy="33" r="3" />
            <circle cx="-23.3" cy="23.3" r="3" />
            <circle cx="-33" cy="0" r="3" />
            <circle cx="-23.3" cy="-23.3" r="3" />
            <circle cx="0" cy="-33" r="3" />
            <circle cx="23.3" cy="-23.3" r="3" />
          </g>
        </g>
      </g>

      {/* 提灯 */}
      <path d="M0,12 Q34,26 68,16" fill="none" stroke="#4a3524" strokeWidth="2" />
      <path d="M332,16 Q366,26 400,12" fill="none" stroke="#4a3524" strokeWidth="2" />
      <g transform="translate(20,18)">
        <g className="j03-lantern">
          <rect x="-1" y="0" width="2" height="6" fill="#4a3524" />
          <rect x="-10" y="6" width="20" height="24" rx="9" fill="#e8443f" />
          <rect x="-7" y="4" width="14" height="4" rx="1" fill="#f5b31c" />
          <rect x="-7" y="27" width="14" height="4" rx="1" fill="#f5b31c" />
        </g>
      </g>
      <g transform="translate(56,22)">
        <g className="j03-lantern j03-lantern2">
          <rect x="-1" y="0" width="2" height="6" fill="#4a3524" />
          <rect x="-10" y="6" width="20" height="24" rx="9" fill="#e8443f" />
          <rect x="-7" y="4" width="14" height="4" rx="1" fill="#f5b31c" />
          <rect x="-7" y="27" width="14" height="4" rx="1" fill="#f5b31c" />
        </g>
      </g>
      <g transform="translate(348,22)">
        <g className="j03-lantern j03-lantern3">
          <rect x="-1" y="0" width="2" height="6" fill="#4a3524" />
          <rect x="-10" y="6" width="20" height="24" rx="9" fill="#e8443f" />
          <rect x="-7" y="4" width="14" height="4" rx="1" fill="#f5b31c" />
          <rect x="-7" y="27" width="14" height="4" rx="1" fill="#f5b31c" />
        </g>
      </g>
      <g transform="translate(384,18)">
        <g className="j03-lantern j03-lantern4">
          <rect x="-1" y="0" width="2" height="6" fill="#4a3524" />
          <rect x="-10" y="6" width="20" height="24" rx="9" fill="#e8443f" />
          <rect x="-7" y="4" width="14" height="4" rx="1" fill="#f5b31c" />
          <rect x="-7" y="27" width="14" height="4" rx="1" fill="#f5b31c" />
        </g>
      </g>

      {/* 通り */}
      <rect y="168" width="400" height="42" fill="#3a2f2a" />

      {/* 太鼓 */}
      <g>
        <path d="M172,158 L196,128 M228,158 L204,128" stroke="#a52f2b" strokeWidth="8" strokeLinecap="round" />
        <rect x="164" y="170" width="72" height="8" rx="3" fill="#8a3330" />
        <g className="j03-drum">
          <circle cx="200" cy="126" r="36" fill="#7a4c28" />
          <circle cx="200" cy="126" r="29" fill="#efdcb8" />
          <g fill="#f5b31c">
            <circle cx="200" cy="93" r="3" />
            <circle cx="223" cy="103" r="3" />
            <circle cx="233" cy="126" r="3" />
            <circle cx="223" cy="149" r="3" />
            <circle cx="200" cy="159" r="3" />
            <circle cx="177" cy="149" r="3" />
            <circle cx="167" cy="126" r="3" />
            <circle cx="177" cy="103" r="3" />
          </g>
          <circle className="j03-hit" cx="200" cy="126" r="16" fill="none" stroke="#c9a877" strokeWidth="3" />
        </g>
      </g>

      {/* 打ち手(左) */}
      <g transform="translate(122,178)">
        <rect x="-12" y="-26" width="9" height="26" rx="3" fill="#2f3a4a" />
        <rect x="3" y="-26" width="9" height="26" rx="3" fill="#2f3a4a" />
        <path d="M-16,-22 L-16,-56 Q0,-64 16,-56 L16,-22z" fill="#3d6fc4" />
        <rect x="-3" y="-58" width="6" height="36" fill="#f6efe2" />
        <rect x="-17" y="-34" width="34" height="6" fill="#f6efe2" />
        <circle cx="0" cy="-68" r="11" fill="#f6efe2" />
        <path d="M-11,-71 Q0,-82 11,-71z" fill="#2a2233" />
        <rect x="-13" y="-72" width="26" height="6" rx="2" fill="#e8443f" />
        <g transform="translate(12,-52)">
          <g className="j03-arm">
            <rect x="0" y="-4" width="28" height="8" rx="4" fill="#f6efe2" />
            <rect x="24" y="-3.5" width="30" height="7" rx="3.5" fill="#e0cba4" />
          </g>
        </g>
      </g>

      {/* 打ち手(右) */}
      <g transform="translate(278,178) scale(-1,1)">
        <rect x="-12" y="-26" width="9" height="26" rx="3" fill="#2f3a4a" />
        <rect x="3" y="-26" width="9" height="26" rx="3" fill="#2f3a4a" />
        <path d="M-16,-22 L-16,-56 Q0,-64 16,-56 L16,-22z" fill="#e8443f" />
        <rect x="-3" y="-58" width="6" height="36" fill="#f6efe2" />
        <rect x="-17" y="-34" width="34" height="6" fill="#f6efe2" />
        <circle cx="0" cy="-68" r="11" fill="#f6efe2" />
        <path d="M-11,-71 Q0,-82 11,-71z" fill="#2a2233" />
        <rect x="-13" y="-72" width="26" height="6" rx="2" fill="#f5b31c" />
        <g transform="translate(12,-52)">
          <g className="j03-arm j03-arm2">
            <rect x="0" y="-4" width="28" height="8" rx="4" fill="#f6efe2" />
            <rect x="24" y="-3.5" width="30" height="7" rx="3.5" fill="#e0cba4" />
          </g>
        </g>
      </g>

      {/* 浴衣の人だかり(後ろ姿) */}
      <g>
        <g className="j03-head">
          <circle cx="26" cy="192" r="13" fill="#241c2c" />
          <path d="M4,210 L4,204 Q26,194 48,204 L48,210z" fill="#3b3550" />
        </g>
        <g className="j03-head j03-head2">
          <circle cx="82" cy="196" r="12" fill="#241c2c" />
          <path d="M62,210 L62,206 Q82,197 102,206 L102,210z" fill="#4a3a5e" />
        </g>
        <g className="j03-head j03-head3">
          <circle cx="140" cy="193" r="13" fill="#241c2c" />
          <path d="M118,210 L118,205 Q140,195 162,205 L162,210z" fill="#33445a" />
        </g>
        <g className="j03-head j03-head4">
          <circle cx="238" cy="195" r="12" fill="#241c2c" />
          <path d="M218,210 L218,206 Q238,196 258,206 L258,210z" fill="#4a3a5e" />
        </g>
        <g className="j03-head j03-head5">
          <circle cx="300" cy="192" r="13" fill="#241c2c" />
          <path d="M278,210 L278,204 Q300,194 322,204 L322,210z" fill="#3b3550" />
        </g>
        <g className="j03-head j03-head6">
          <circle cx="360" cy="196" r="12" fill="#241c2c" />
          <path d="M340,210 L340,206 Q360,197 380,206 L380,210z" fill="#33445a" />
        </g>
      </g>

      <style>{`
        .j03-glow { opacity: 0.1; animation: j03-flicker 3s ease-in-out infinite; }
        .j03-burst {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: j03-boom 3s ease-out infinite;
        }
        .j03-burst2 { animation-delay: 1s; animation-duration: 3.4s; }
        .j03-burst3 { animation-delay: 2s; animation-duration: 2.6s; }
        .j03-lantern {
          transform-box: fill-box; transform-origin: 50% 0%;
          animation: j03-swing 2.6s ease-in-out infinite;
        }
        .j03-lantern2 { animation-delay: 0.3s; }
        .j03-lantern3 { animation-delay: 0.6s; }
        .j03-lantern4 { animation-delay: 0.9s; }
        .j03-drum {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: j03-thump 1.2s ease-out infinite;
        }
        .j03-hit {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: j03-ring 1.2s ease-out infinite;
        }
        .j03-arm {
          transform-box: fill-box; transform-origin: 0% 50%;
          animation: j03-strike 1.2s ease-in-out infinite;
        }
        .j03-arm2 { animation-delay: 0.6s; }
        .j03-head {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: j03-bob 1.2s ease-in-out infinite;
        }
        .j03-head2 { animation-delay: 0.15s; }
        .j03-head3 { animation-delay: 0.3s; }
        .j03-head4 { animation-delay: 0.45s; }
        .j03-head5 { animation-delay: 0.6s; }
        .j03-head6 { animation-delay: 0.75s; }
        @keyframes j03-flicker {
          0%, 100% { opacity: 0.07; }
          50% { opacity: 0.15; }
        }
        @keyframes j03-boom {
          0% { transform: scale(0.12); opacity: 0; }
          10% { opacity: 1; }
          55% { transform: scale(1.05); opacity: 1; }
          85% { transform: scale(1.2); opacity: 0; }
          100% { transform: scale(1.2); opacity: 0; }
        }
        @keyframes j03-swing {
          0%, 100% { transform: rotate(7deg); }
          50% { transform: rotate(-7deg); }
        }
        @keyframes j03-thump {
          0%, 100% { transform: scale(1); }
          8% { transform: scale(1.06); }
          24% { transform: scale(0.99); }
        }
        @keyframes j03-ring {
          0% { transform: scale(0.5); opacity: 0.9; }
          60%, 100% { transform: scale(1.7); opacity: 0; }
        }
        @keyframes j03-strike {
          0%, 100% { transform: rotate(4deg); }
          45% { transform: rotate(-42deg); }
        }
        @keyframes j03-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .j03-glow, .j03-burst, .j03-lantern, .j03-drum,
          .j03-hit, .j03-arm, .j03-head { animation: none; }
        }
      `}</style>
    </svg>
  );
}
