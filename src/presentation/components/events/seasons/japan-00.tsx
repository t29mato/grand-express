/**
 * 4月・桜前線。
 *
 * 川べりの桜並木が左から順にほころんでいき(前線が北上する)、
 * 花びらが舞い、土手のブルーシートではビールに花びらが落ちる。
 */
export function Japan00() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 春の空と霞んだ山 */}
      <rect width="400" height="210" fill="#a9d3ee" />
      <path
        d="M0,120 L54,84 L108,120 L180,74 L250,120 L316,88 L370,120 L400,104 L400,138 L0,138z"
        fill="#8cadc4"
      />

      {/* 向こう岸の土手 */}
      <rect y="118" width="400" height="20" fill="#5f8a4c" />

      {/* 川 */}
      <rect y="136" width="400" height="34" fill="#5f93bd" />
      <g fill="none" stroke="#84b4d8" strokeWidth="3" strokeLinecap="round">
        <path className="j00-wave" d="M24,146 q12,-5 24,0" />
        <path className="j00-wave j00-w2" d="M118,154 q12,-5 24,0" />
        <path className="j00-wave j00-w3" d="M212,144 q12,-5 24,0" />
        <path className="j00-wave j00-w4" d="M300,158 q12,-5 24,0" />
        <path className="j00-wave j00-w5" d="M356,148 q12,-5 24,0" />
      </g>

      {/* 手前の土手 */}
      <rect y="168" width="400" height="42" fill="#4a7342" />

      {/* 桜並木。左から順に咲きひらく */}
      <g>
        <g>
          <rect x="23" y="104" width="7" height="32" fill="#5a3a22" />
          <path d="M26,114 L12,104 M26,110 L40,100" stroke="#5a3a22" strokeWidth="4" strokeLinecap="round" />
          <g className="j00-bloom">
            <circle cx="26" cy="92" r="21" fill="#f7b8cf" />
            <circle cx="10" cy="101" r="13" fill="#f0a9c4" />
            <circle cx="42" cy="99" r="14" fill="#f0a9c4" />
            <circle cx="29" cy="76" r="12" fill="#fbd0e0" />
          </g>
        </g>
        <g>
          <rect x="89" y="104" width="7" height="32" fill="#5a3a22" />
          <path d="M92,114 L78,104 M92,110 L106,100" stroke="#5a3a22" strokeWidth="4" strokeLinecap="round" />
          <g className="j00-bloom j00-b2">
            <circle cx="92" cy="92" r="21" fill="#f7b8cf" />
            <circle cx="76" cy="101" r="13" fill="#f0a9c4" />
            <circle cx="108" cy="99" r="14" fill="#f0a9c4" />
            <circle cx="95" cy="76" r="12" fill="#fbd0e0" />
          </g>
        </g>
        <g>
          <rect x="155" y="104" width="7" height="32" fill="#5a3a22" />
          <path d="M158,114 L144,104 M158,110 L172,100" stroke="#5a3a22" strokeWidth="4" strokeLinecap="round" />
          <g className="j00-bloom j00-b3">
            <circle cx="158" cy="92" r="21" fill="#f7b8cf" />
            <circle cx="142" cy="101" r="13" fill="#f0a9c4" />
            <circle cx="174" cy="99" r="14" fill="#f0a9c4" />
            <circle cx="161" cy="76" r="12" fill="#fbd0e0" />
          </g>
        </g>
        <g>
          <rect x="221" y="104" width="7" height="32" fill="#5a3a22" />
          <path d="M224,114 L210,104 M224,110 L238,100" stroke="#5a3a22" strokeWidth="4" strokeLinecap="round" />
          <g className="j00-bloom j00-b4">
            <circle cx="224" cy="92" r="21" fill="#f7b8cf" />
            <circle cx="208" cy="101" r="13" fill="#f0a9c4" />
            <circle cx="240" cy="99" r="14" fill="#f0a9c4" />
            <circle cx="227" cy="76" r="12" fill="#fbd0e0" />
          </g>
        </g>
        <g>
          <rect x="287" y="104" width="7" height="32" fill="#5a3a22" />
          <path d="M290,114 L276,104 M290,110 L304,100" stroke="#5a3a22" strokeWidth="4" strokeLinecap="round" />
          <g className="j00-bloom j00-b5">
            <circle cx="290" cy="92" r="21" fill="#f7b8cf" />
            <circle cx="274" cy="101" r="13" fill="#f0a9c4" />
            <circle cx="306" cy="99" r="14" fill="#f0a9c4" />
            <circle cx="293" cy="76" r="12" fill="#fbd0e0" />
          </g>
        </g>
        <g>
          <rect x="353" y="104" width="7" height="32" fill="#5a3a22" />
          <path d="M356,114 L342,104 M356,110 L370,100" stroke="#5a3a22" strokeWidth="4" strokeLinecap="round" />
          <g className="j00-bloom j00-b6">
            <circle cx="356" cy="92" r="21" fill="#f7b8cf" />
            <circle cx="340" cy="101" r="13" fill="#f0a9c4" />
            <circle cx="372" cy="99" r="14" fill="#f0a9c4" />
            <circle cx="359" cy="76" r="12" fill="#fbd0e0" />
          </g>
        </g>
      </g>

      {/* 土手のブルーシート */}
      <path d="M38,208 L58,176 L236,176 L224,208z" fill="#5b8fe8" />
      <path d="M38,208 L58,176 L236,176 L224,208z" fill="none" stroke="#3d6fc4" strokeWidth="3" />

      {/* 花見客(後ろ姿) */}
      <g className="j00-sitter">
        <circle cx="88" cy="158" r="12" fill="#2a2233" />
        <path d="M74,196 L74,176 Q88,164 102,176 L102,196z" fill="#e8443f" />
      </g>
      <g className="j00-sitter j00-s2">
        <circle cx="140" cy="160" r="12" fill="#3b2f4a" />
        <path d="M126,198 L126,178 Q140,166 154,178 L154,198z" fill="#f5b31c" />
      </g>

      {/* ビール。花びらが落ちてくる */}
      <g>
        <rect x="188" y="172" width="26" height="32" rx="3" fill="#e8a11c" />
        <rect x="186" y="164" width="30" height="11" rx="4" fill="#fdf6e6" />
        <rect x="188" y="172" width="26" height="32" rx="3" fill="none" stroke="#c9820c" strokeWidth="2" />
        <ellipse className="j00-drop" cx="201" cy="132" rx="6" ry="4" fill="#fbd0e0" />
      </g>

      {/* 舞う花びら */}
      <g fill="#fbd0e0">
        <ellipse className="j00-petal" cx="66" cy="40" rx="6" ry="4" />
        <ellipse className="j00-petal j00-p2" cx="132" cy="24" rx="5" ry="3.5" />
        <ellipse className="j00-petal j00-p3" cx="196" cy="52" rx="6" ry="4" />
        <ellipse className="j00-petal j00-p4" cx="262" cy="30" rx="5" ry="3.5" />
        <ellipse className="j00-petal j00-p5" cx="322" cy="46" rx="6" ry="4" />
        <ellipse className="j00-petal j00-p6" cx="376" cy="34" rx="5" ry="3.5" />
        <ellipse className="j00-petal j00-p7" cx="104" cy="60" rx="5" ry="3.5" />
        <ellipse className="j00-petal j00-p8" cx="290" cy="62" rx="6" ry="4" />
      </g>

      <style>{`
        .j00-bloom {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: j00-open 6s ease-in-out infinite;
        }
        .j00-b2 { animation-delay: 0.4s; }
        .j00-b3 { animation-delay: 0.8s; }
        .j00-b4 { animation-delay: 1.2s; }
        .j00-b5 { animation-delay: 1.6s; }
        .j00-b6 { animation-delay: 2s; }
        .j00-petal {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: j00-fall 5.4s linear infinite;
        }
        .j00-p2 { animation-delay: 0.8s; animation-duration: 6.2s; }
        .j00-p3 { animation-delay: 1.6s; animation-duration: 4.8s; }
        .j00-p4 { animation-delay: 2.4s; animation-duration: 5.8s; }
        .j00-p5 { animation-delay: 3.2s; animation-duration: 5s; }
        .j00-p6 { animation-delay: 4s; animation-duration: 6.6s; }
        .j00-p7 { animation-delay: 4.8s; animation-duration: 5.2s; }
        .j00-p8 { animation-delay: 2s; animation-duration: 6s; }
        .j00-drop {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: j00-into-beer 4s ease-in infinite;
        }
        .j00-wave {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: j00-drift 3.6s ease-in-out infinite;
        }
        .j00-w2 { animation-delay: 0.6s; }
        .j00-w3 { animation-delay: 1.2s; }
        .j00-w4 { animation-delay: 1.8s; }
        .j00-w5 { animation-delay: 2.4s; }
        .j00-sitter {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: j00-sway 3.8s ease-in-out infinite;
        }
        .j00-s2 { animation-delay: 0.9s; }
        @keyframes j00-open {
          0% { transform: scale(0.45); }
          8% { transform: scale(1.1); }
          15%, 88% { transform: scale(1); }
          100% { transform: scale(0.45); }
        }
        @keyframes j00-fall {
          0% { transform: translate(0, -30px) rotate(0deg); opacity: 0; }
          12% { opacity: 1; }
          88% { opacity: 1; }
          100% { transform: translate(-58px, 160px) rotate(340deg); opacity: 0; }
        }
        @keyframes j00-into-beer {
          0% { transform: translate(0, -34px) rotate(0deg); opacity: 0; }
          20% { opacity: 1; }
          70% { transform: translate(-2px, 36px) rotate(200deg); opacity: 1; }
          80%, 100% { transform: translate(-2px, 40px) rotate(210deg); opacity: 0; }
        }
        @keyframes j00-drift {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(10px); }
        }
        @keyframes j00-sway {
          0%, 100% { transform: rotate(-2.5deg); }
          50% { transform: rotate(2.5deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .j00-bloom, .j00-petal, .j00-drop, .j00-wave, .j00-sitter { animation: none; }
        }
      `}</style>
    </svg>
  );
}
