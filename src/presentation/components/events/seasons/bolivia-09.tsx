/**
 * ボリビア 1月 — アラシータ(ミニチュアの市)。
 *
 * 1月24日、ラパスは小さな家・小さなトラック・小さな卒業証書・小さな札束で埋まる。
 * 正午に一斉に祝福されるので、香炉の煙と花びらが台の上に降りかかる。
 * 大きな手のひらに家が乗っていることで、それが「ミニチュア」だと分かる。
 */
export function Bolivia09() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* アルティプラーノの空 */}
      <rect width="400" height="210" fill="#5aa6dc" />
      <rect width="400" height="46" fill="#4a94cf" />

      {/* 真上の太陽 */}
      <g className="alasitas-rays" stroke="#f5e2a8" strokeWidth="4" strokeLinecap="round">
        <path d="M200,2 L200,14" />
        <path d="M222,10 L216,20" />
        <path d="M178,10 L184,20" />
        <path d="M240,26 L228,30" />
        <path d="M160,26 L172,30" />
      </g>
      <circle cx="200" cy="30" r="15" fill="#f5e2a8" />

      {/* イリマニ */}
      <g>
        <path d="M236,104 L300,32 L366,104z" fill="#7f93b0" />
        <path d="M330,104 L376,50 L400,104z" fill="#6e819e" />
        <path d="M278,60 L300,32 L322,60 L310,52 L296,64 L288,54z" fill="#f2f6fa" />
        <path d="M362,66 L376,50 L392,68 L382,60 L372,72z" fill="#f2f6fa" />
      </g>

      {/* ラパスの斜面の家々 */}
      <g fill="#a85f42">
        <rect x="0" y="86" width="34" height="40" />
        <rect x="36" y="94" width="30" height="32" />
        <rect x="70" y="78" width="36" height="48" />
        <rect x="110" y="98" width="28" height="28" />
        <rect x="142" y="88" width="34" height="38" />
        <rect x="180" y="100" width="30" height="26" />
        <rect x="214" y="84" width="36" height="42" />
        <rect x="254" y="96" width="28" height="30" />
        <rect x="286" y="90" width="34" height="36" />
        <rect x="324" y="102" width="30" height="24" />
        <rect x="358" y="88" width="42" height="38" />
      </g>
      <g fill="#8c4c34">
        <rect x="36" y="94" width="30" height="5" />
        <rect x="110" y="98" width="28" height="5" />
        <rect x="180" y="100" width="30" height="5" />
        <rect x="254" y="96" width="28" height="5" />
        <rect x="324" y="102" width="30" height="5" />
      </g>
      <g fill="#5f3a2a">
        <rect x="10" y="98" width="7" height="9" />
        <rect x="22" y="98" width="7" height="9" />
        <rect x="80" y="90" width="7" height="9" />
        <rect x="92" y="90" width="7" height="9" />
        <rect x="152" y="100" width="7" height="9" />
        <rect x="224" y="96" width="7" height="9" />
        <rect x="236" y="96" width="7" height="9" />
        <rect x="296" y="102" width="7" height="9" />
        <rect x="368" y="100" width="7" height="9" />
        <rect x="382" y="100" width="7" height="9" />
      </g>

      {/* 通り */}
      <rect y="124" width="400" height="26" fill="#6f6355" />

      {/* 屋台の台 */}
      <rect y="144" width="400" height="8" fill="#8a6a48" />
      <rect y="152" width="400" height="58" fill="#c0392b" />
      <rect y="162" width="400" height="9" fill="#f5b31c" />
      <rect y="176" width="400" height="9" fill="#2f7a4a" />
      <rect y="190" width="400" height="9" fill="#f6efe2" />
      <rect y="199" width="400" height="11" fill="#3b4a8a" />

      {/* 小さな家 */}
      <g className="alasitas-house">
        <rect x="14" y="120" width="34" height="24" fill="#f0e4cc" />
        <path d="M8,120 L31,104 L54,120z" fill="#c0563a" />
        <rect x="26" y="130" width="10" height="14" fill="#8a5c38" />
        <rect x="18" y="126" width="7" height="7" fill="#5b8fe8" />
        <rect x="38" y="126" width="7" height="7" fill="#5b8fe8" />
      </g>

      {/* 小さなトラック */}
      <g className="alasitas-lorry">
        <rect x="64" y="122" width="26" height="16" rx="2" fill="#4f9e4a" />
        <path d="M90,126 L104,126 L110,132 L110,138 L90,138z" fill="#3f8a3c" />
        <rect x="94" y="128" width="10" height="7" fill="#a8d8ee" />
        <circle cx="76" cy="140" r="5" fill="#2a2028" />
        <circle cx="102" cy="140" r="5" fill="#2a2028" />
        <circle cx="76" cy="140" r="2" fill="#7a7080" />
        <circle cx="102" cy="140" r="2" fill="#7a7080" />
      </g>

      {/* 小さな卒業証書 */}
      <g className="alasitas-diploma">
        <rect x="124" y="112" width="12" height="32" rx="6" fill="#f6efe2" />
        <rect x="121" y="110" width="18" height="6" rx="3" fill="#e2d8c2" />
        <rect x="121" y="140" width="18" height="6" rx="3" fill="#e2d8c2" />
        <rect x="119" y="124" width="22" height="6" fill="#c0392b" />
        <path d="M130,130 L124,142 L130,138 L136,142z" fill="#c0392b" />
      </g>

      {/* 小さな札束 */}
      <g className="alasitas-notes">
        <rect x="150" y="131" width="38" height="13" rx="1.5" fill="#6fbc92" />
        <rect x="150" y="131" width="38" height="9" rx="1.5" fill="#9ad9b6" />
        <rect x="162" y="131" width="8" height="13" fill="#c0392b" />
        <rect x="154" y="119" width="38" height="13" rx="1.5" fill="#6fbc92" />
        <rect x="154" y="119" width="38" height="9" rx="1.5" fill="#c8e8d6" />
        <rect x="166" y="119" width="8" height="13" fill="#c0392b" />
        <rect x="152" y="107" width="38" height="13" rx="1.5" fill="#6fbc92" />
        <rect x="152" y="107" width="38" height="9" rx="1.5" fill="#9ad9b6" />
        <rect x="164" y="107" width="8" height="13" fill="#c0392b" />
      </g>

      {/* エケコの人形 */}
      <g className="alasitas-ekeko">
        <ellipse cx="224" cy="130" rx="17" ry="15" fill="#4f7ac0" />
        <rect x="206" y="138" width="8" height="8" rx="3" fill="#3b2f4a" />
        <rect x="234" y="138" width="8" height="8" rx="3" fill="#3b2f4a" />
        <circle cx="224" cy="110" r="12" fill="#d99b6e" />
        <path d="M212,108 a12,12 0 0 1 24,0z" fill="#c0392b" />
        <rect x="206" y="102" width="36" height="4" rx="2" fill="#c0392b" />
        <circle cx="220" cy="110" r="1.8" fill="#2a2028" />
        <circle cx="229" cy="110" r="1.8" fill="#2a2028" />
        <path d="M217,116 q7,4 14,0" stroke="#2a2028" strokeWidth="2" fill="none" strokeLinecap="round" />
        <rect x="240" y="120" width="12" height="10" rx="2" fill="#f5b31c" />
        <rect x="196" y="122" width="12" height="10" rx="2" fill="#4f9e4a" />
      </g>

      {/* 香炉と煙 */}
      <g>
        <path d="M256,144 L260,134 L280,134 L284,144z" fill="#8a6a3c" />
        <rect x="258" y="130" width="24" height="5" rx="2" fill="#b8935c" />
        <ellipse cx="270" cy="132" rx="9" ry="3" fill="#e8443f" />
      </g>
      <g fill="#e2e6ea" opacity="0.65">
        <circle className="alasitas-smoke-a" cx="270" cy="124" r="6" />
        <circle className="alasitas-smoke-b" cx="272" cy="110" r="7" />
        <circle className="alasitas-smoke-c" cx="266" cy="96" r="8" />
      </g>

      {/* 手のひらに乗った小さな家 */}
      <g className="alasitas-hand">
        <rect x="342" y="140" width="74" height="30" rx="15" fill="#c98a5e" />
        <ellipse cx="342" cy="154" rx="30" ry="17" fill="#d99b6e" />
        <g fill="#d99b6e">
          <rect x="300" y="140" width="32" height="8" rx="4" />
          <rect x="298" y="150" width="34" height="8" rx="4" />
          <rect x="302" y="160" width="30" height="8" rx="4" />
        </g>
        <rect x="318" y="130" width="26" height="9" rx="4.5" fill="#c98a5e" transform="rotate(-14 331 134)" />
        <g>
          <rect x="328" y="126" width="26" height="16" fill="#f0e4cc" />
          <path d="M323,126 L341,113 L359,126z" fill="#c0563a" />
          <rect x="337" y="132" width="8" height="10" fill="#8a5c38" />
        </g>
      </g>

      {/* 祝福の花びら */}
      <g>
        <ellipse className="alasitas-petal-a" cx="40" cy="60" rx="5" ry="3.4" fill="#f2a0c0" />
        <ellipse className="alasitas-petal-b" cx="96" cy="40" rx="4.4" ry="3" fill="#f6efe2" />
        <ellipse className="alasitas-petal-c" cx="148" cy="66" rx="5" ry="3.4" fill="#f5b31c" />
        <ellipse className="alasitas-petal-d" cx="204" cy="46" rx="4.6" ry="3.2" fill="#f2a0c0" />
        <ellipse className="alasitas-petal-e" cx="256" cy="62" rx="5" ry="3.4" fill="#f6efe2" />
        <ellipse className="alasitas-petal-f" cx="312" cy="44" rx="4.4" ry="3" fill="#f5b31c" />
        <ellipse className="alasitas-petal-g" cx="364" cy="64" rx="5" ry="3.4" fill="#f2a0c0" />
        <ellipse className="alasitas-petal-h" cx="68" cy="80" rx="4.4" ry="3" fill="#f5b31c" />
        <ellipse className="alasitas-petal-i" cx="180" cy="82" rx="4.6" ry="3.2" fill="#f6efe2" />
      </g>

      <style>{`
        .alasitas-rays {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: alasitas-noon 6s ease-in-out infinite;
        }
        .alasitas-house {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: alasitas-bob 3.2s ease-in-out infinite;
        }
        .alasitas-lorry {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: alasitas-rock 2.4s ease-in-out infinite;
        }
        .alasitas-diploma {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: alasitas-bob 3.8s ease-in-out infinite;
          animation-delay: -1.2s;
        }
        .alasitas-notes {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: alasitas-bob 2.8s ease-in-out infinite;
          animation-delay: -0.7s;
        }
        .alasitas-ekeko {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: alasitas-rock 3s ease-in-out infinite;
          animation-delay: -1.5s;
        }
        .alasitas-hand {
          transform-box: fill-box;
          transform-origin: 100% 50%;
          animation: alasitas-offer 4s ease-in-out infinite;
        }
        .alasitas-smoke-a { animation: alasitas-curl 3.6s ease-out infinite; }
        .alasitas-smoke-b { animation: alasitas-curl 3.6s ease-out infinite; animation-delay: -1.2s; }
        .alasitas-smoke-c { animation: alasitas-curl 3.6s ease-out infinite; animation-delay: -2.4s; }
        .alasitas-petal-a, .alasitas-petal-b, .alasitas-petal-c, .alasitas-petal-d,
        .alasitas-petal-e, .alasitas-petal-f, .alasitas-petal-g, .alasitas-petal-h,
        .alasitas-petal-i {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .alasitas-petal-a { animation: alasitas-fall 4.4s linear infinite; }
        .alasitas-petal-b { animation: alasitas-fall 5.2s linear infinite; animation-delay: -1.4s; }
        .alasitas-petal-c { animation: alasitas-fall 4.8s linear infinite; animation-delay: -2.6s; }
        .alasitas-petal-d { animation: alasitas-fall 5.6s linear infinite; animation-delay: -0.8s; }
        .alasitas-petal-e { animation: alasitas-fall 4.2s linear infinite; animation-delay: -3.1s; }
        .alasitas-petal-f { animation: alasitas-fall 5s linear infinite; animation-delay: -1.9s; }
        .alasitas-petal-g { animation: alasitas-fall 4.6s linear infinite; animation-delay: -3.7s; }
        .alasitas-petal-h { animation: alasitas-fall 5.4s linear infinite; animation-delay: -2.2s; }
        .alasitas-petal-i { animation: alasitas-fall 4.9s linear infinite; animation-delay: -0.4s; }
        @keyframes alasitas-noon {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.18); opacity: 1; }
        }
        @keyframes alasitas-bob {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-5px) scale(1.04); }
        }
        @keyframes alasitas-rock {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes alasitas-offer {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-8px, -7px) rotate(-4deg); }
        }
        @keyframes alasitas-curl {
          0% { transform: translate(0, 16px) scale(0.3); opacity: 0; }
          25% { opacity: 0.7; }
          100% { transform: translate(-20px, -56px) scale(1.7); opacity: 0; }
        }
        @keyframes alasitas-fall {
          0% { transform: translate(10px, -70px) rotate(0deg); opacity: 0; }
          14%, 82% { opacity: 1; }
          100% { transform: translate(-24px, 92px) rotate(340deg); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .alasitas-rays, .alasitas-house, .alasitas-lorry, .alasitas-diploma,
          .alasitas-notes, .alasitas-ekeko, .alasitas-hand,
          .alasitas-smoke-a, .alasitas-smoke-b, .alasitas-smoke-c,
          .alasitas-petal-a, .alasitas-petal-b, .alasitas-petal-c, .alasitas-petal-d,
          .alasitas-petal-e, .alasitas-petal-f, .alasitas-petal-g, .alasitas-petal-h,
          .alasitas-petal-i { animation: none; }
        }
      `}</style>
    </svg>
  );
}
