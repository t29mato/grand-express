/**
 * 担ぎ手が足りない祭りに誘われ、神輿を担いで現金とビールを受け取る。
 *
 * 提灯の下で神輿が「わっしょい」と上下し、地面には
 * 御礼のビールと祝儀袋が置かれている。
 */
export function MatsuriHelp() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜の祭り */}
      <rect width="400" height="210" fill="#20364a" />
      <ellipse className="mh-glow" cx="200" cy="110" rx="176" ry="112" fill="#f5b31c" />
      <rect y="172" width="400" height="38" fill="#3a2f2a" />

      {/* 提灯の列 */}
      <path d="M0,8 Q200,26 400,8" fill="none" stroke="#4a3524" strokeWidth="2" />
      <g transform="translate(40,11)">
        <g className="mh-lantern mh-lantern-1">
          <rect x="-1" y="0" width="2" height="6" fill="#4a3524" />
          <rect x="-9" y="6" width="18" height="22" rx="8" fill="#e8443f" />
          <rect x="-6" y="4" width="12" height="4" rx="1" fill="#f5b31c" />
          <rect x="-6" y="25" width="12" height="4" rx="1" fill="#f5b31c" />
        </g>
      </g>
      <g transform="translate(100,15)">
        <g className="mh-lantern mh-lantern-2">
          <rect x="-1" y="0" width="2" height="6" fill="#4a3524" />
          <rect x="-9" y="6" width="18" height="22" rx="8" fill="#e8443f" />
          <rect x="-6" y="4" width="12" height="4" rx="1" fill="#f5b31c" />
          <rect x="-6" y="25" width="12" height="4" rx="1" fill="#f5b31c" />
        </g>
      </g>
      <g transform="translate(160,17)">
        <g className="mh-lantern mh-lantern-3">
          <rect x="-1" y="0" width="2" height="6" fill="#4a3524" />
          <rect x="-9" y="6" width="18" height="22" rx="8" fill="#e8443f" />
          <rect x="-6" y="4" width="12" height="4" rx="1" fill="#f5b31c" />
          <rect x="-6" y="25" width="12" height="4" rx="1" fill="#f5b31c" />
        </g>
      </g>
      <g transform="translate(240,17)">
        <g className="mh-lantern mh-lantern-4">
          <rect x="-1" y="0" width="2" height="6" fill="#4a3524" />
          <rect x="-9" y="6" width="18" height="22" rx="8" fill="#e8443f" />
          <rect x="-6" y="4" width="12" height="4" rx="1" fill="#f5b31c" />
          <rect x="-6" y="25" width="12" height="4" rx="1" fill="#f5b31c" />
        </g>
      </g>
      <g transform="translate(300,15)">
        <g className="mh-lantern mh-lantern-5">
          <rect x="-1" y="0" width="2" height="6" fill="#4a3524" />
          <rect x="-9" y="6" width="18" height="22" rx="8" fill="#e8443f" />
          <rect x="-6" y="4" width="12" height="4" rx="1" fill="#f5b31c" />
          <rect x="-6" y="25" width="12" height="4" rx="1" fill="#f5b31c" />
        </g>
      </g>
      <g transform="translate(360,11)">
        <g className="mh-lantern mh-lantern-6">
          <rect x="-1" y="0" width="2" height="6" fill="#4a3524" />
          <rect x="-9" y="6" width="18" height="22" rx="8" fill="#e8443f" />
          <rect x="-6" y="4" width="12" height="4" rx="1" fill="#f5b31c" />
          <rect x="-6" y="25" width="12" height="4" rx="1" fill="#f5b31c" />
        </g>
      </g>

      {/* 担ぎ手たち */}
      <g fill="#5b8fe8">
        <g className="mh-crew mh-crew-1">
          <circle cx="98" cy="112" r="10" fill="#f6efe2" />
          <rect x="88" y="103" width="20" height="5" rx="2" fill="#e8443f" />
          <rect x="82" y="122" width="7" height="16" rx="3" />
          <rect x="107" y="122" width="7" height="16" rx="3" />
          <rect x="85" y="126" width="26" height="34" rx="5" />
          <rect x="96" y="126" width="4" height="34" fill="#f6efe2" />
          <rect x="89" y="160" width="8" height="30" rx="4" fill="#f6efe2" />
          <rect x="99" y="160" width="8" height="30" rx="4" fill="#f6efe2" />
        </g>
        <g className="mh-crew mh-crew-2">
          <circle cx="152" cy="112" r="10" fill="#f6efe2" />
          <rect x="142" y="103" width="20" height="5" rx="2" fill="#e8443f" />
          <rect x="136" y="122" width="7" height="16" rx="3" />
          <rect x="161" y="122" width="7" height="16" rx="3" />
          <rect x="139" y="126" width="26" height="34" rx="5" />
          <rect x="150" y="126" width="4" height="34" fill="#f6efe2" />
          <rect x="143" y="160" width="8" height="30" rx="4" fill="#f6efe2" />
          <rect x="153" y="160" width="8" height="30" rx="4" fill="#f6efe2" />
        </g>
        <g className="mh-crew mh-crew-3">
          <circle cx="248" cy="112" r="10" fill="#f6efe2" />
          <rect x="238" y="103" width="20" height="5" rx="2" fill="#e8443f" />
          <rect x="232" y="122" width="7" height="16" rx="3" />
          <rect x="257" y="122" width="7" height="16" rx="3" />
          <rect x="235" y="126" width="26" height="34" rx="5" />
          <rect x="246" y="126" width="4" height="34" fill="#f6efe2" />
          <rect x="239" y="160" width="8" height="30" rx="4" fill="#f6efe2" />
          <rect x="249" y="160" width="8" height="30" rx="4" fill="#f6efe2" />
        </g>
        <g className="mh-crew mh-crew-4">
          <circle cx="302" cy="112" r="10" fill="#f6efe2" />
          <rect x="292" y="103" width="20" height="5" rx="2" fill="#e8443f" />
          <rect x="286" y="122" width="7" height="16" rx="3" />
          <rect x="311" y="122" width="7" height="16" rx="3" />
          <rect x="289" y="126" width="26" height="34" rx="5" />
          <rect x="300" y="126" width="4" height="34" fill="#f6efe2" />
          <rect x="293" y="160" width="8" height="30" rx="4" fill="#f6efe2" />
          <rect x="303" y="160" width="8" height="30" rx="4" fill="#f6efe2" />
        </g>
      </g>

      {/* 神輿 */}
      <g className="mh-shrine">
        <rect x="60" y="124" width="280" height="7" rx="3" fill="#8a5c33" />
        <rect x="60" y="134" width="280" height="7" rx="3" fill="#6d4526" />
        <rect x="162" y="86" width="76" height="38" rx="2" fill="#f5b31c" />
        <rect x="186" y="96" width="28" height="28" fill="#c0392b" />
        <path d="M142,86 L166,58 L234,58 L258,86 Z" fill="#2f3a4a" />
        <rect x="138" y="82" width="124" height="7" rx="3" fill="#20364a" />
        <path d="M191,47 L178,39 L184,49 L176,53 Z" fill="#f5b31c" />
        <ellipse cx="200" cy="48" rx="9" ry="5.5" fill="#f5b31c" />
        <circle cx="208" cy="42" r="3.5" fill="#f5b31c" />
      </g>

      {/* 御礼のビールと祝儀 */}
      <rect x="345" y="149" width="8" height="4" rx="1" fill="#f5b31c" />
      <rect x="346" y="152" width="6" height="12" fill="#4a3524" />
      <rect x="342" y="162" width="14" height="30" rx="3" fill="#4a3524" />
      <rect x="342" y="172" width="14" height="10" fill="#f6efe2" />
      <rect x="364" y="170" width="22" height="22" rx="1" fill="#f6efe2" />
      <rect x="364" y="177" width="22" height="4" fill="#c0392b" />
      <circle cx="375" cy="179" r="3" fill="#f5b31c" />
      <path className="mh-spark" d="M358,140 l4,8 l-4,8 l-4,-8 z" fill="#f5b31c" />

      <style>{`
        .mh-glow { opacity: 0.1; animation: mh-flicker 2.8s ease-in-out infinite; }
        .mh-shrine { transform: translateY(0); animation: mh-heave 0.9s ease-in-out infinite; }
        .mh-crew { transform: translateY(0); animation: mh-heave-low 0.9s ease-in-out infinite; }
        .mh-crew-2 { animation-delay: 0.08s; }
        .mh-crew-3 { animation-delay: 0.04s; }
        .mh-crew-4 { animation-delay: 0.12s; }
        .mh-lantern {
          transform-box: fill-box; transform-origin: 50% 0%;
          animation: mh-swing 2.4s ease-in-out infinite;
        }
        .mh-lantern-2 { animation-delay: 0.2s; }
        .mh-lantern-3 { animation-delay: 0.4s; }
        .mh-lantern-4 { animation-delay: 0.6s; }
        .mh-lantern-5 { animation-delay: 0.8s; }
        .mh-lantern-6 { animation-delay: 1s; }
        .mh-spark {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: mh-shine 2.4s ease-out infinite;
        }
        @keyframes mh-flicker {
          0%, 100% { opacity: 0.08; }
          50% { opacity: 0.16; }
        }
        @keyframes mh-heave {
          0%, 100% { transform: translateY(0); }
          45% { transform: translateY(-10px); }
        }
        @keyframes mh-heave-low {
          0%, 100% { transform: translateY(0); }
          45% { transform: translateY(-5px); }
        }
        @keyframes mh-swing {
          0%, 100% { transform: rotate(7deg); }
          50% { transform: rotate(-7deg); }
        }
        @keyframes mh-shine {
          0%, 55%, 100% { transform: scale(0.2); opacity: 0; }
          70% { transform: scale(1); opacity: 1; }
          85% { transform: scale(0.6); opacity: 0.4; }
        }
        @media (prefers-reduced-motion: reduce) {
          .mh-glow, .mh-shrine, .mh-crew, .mh-lantern, .mh-spark { animation: none; }
        }
      `}</style>
    </svg>
  );
}
