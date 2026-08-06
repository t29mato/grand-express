/**
 * チキートスのミッション教会でバロックを弾く。
 *
 * 木の柱が並ぶ伝道所の教会堂で、一人足りない合奏団に加わってヴァイオリンを弾く。
 */
export function MissionConcert() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜の伝道所 */}
      <rect width="400" height="210" fill="#3a2a1c" />

      {/* 教会堂の壁 */}
      <rect y="46" width="400" height="126" fill="#e0c294" />
      <path d="M0,46 L400,46 L400,26 L0,32z" fill="#b5563c" />
      <rect y="44" width="400" height="5" fill="#8a5a30" />
      <g fill="#c98b3f">
        <rect y="58" width="400" height="6" />
        <rect y="150" width="400" height="6" />
        <path d="M96,72 q14,-10 28,0 q-14,10 -28,0z" />
        <path d="M292,72 q14,-10 28,0 q-14,10 -28,0z" />
        <circle cx="200" cy="76" r="7" />
        <path d="M188,140 q12,-8 24,0 q-12,8 -24,0z" />
      </g>
      {/* 入口のアーチ */}
      <path d="M176,172 L176,110 A24,24 0 0,1 224,110 L224,172z" fill="#4a3423" />
      <path d="M182,172 L182,112 A18,18 0 0,1 218,112 L218,172z" fill="#2b1c11" />

      {/* 回廊のろくろ柱 */}
      <g fill="#8a5a30">
        <rect x="60" y="44" width="12" height="128" />
        <rect x="132" y="44" width="12" height="128" />
        <rect x="256" y="44" width="12" height="128" />
        <rect x="332" y="44" width="12" height="128" />
      </g>
      <g fill="#6b4629">
        <circle cx="66" cy="96" r="8" />
        <circle cx="138" cy="96" r="8" />
        <circle cx="262" cy="96" r="8" />
        <circle cx="338" cy="96" r="8" />
        <rect x="56" y="60" width="20" height="6" />
        <rect x="128" y="60" width="20" height="6" />
        <rect x="252" y="60" width="20" height="6" />
        <rect x="328" y="60" width="20" height="6" />
      </g>

      {/* 鐘楼 */}
      <g transform="translate(24,0)">
        <rect x="-16" y="60" width="8" height="112" fill="#6b4629" />
        <rect x="8" y="60" width="8" height="112" fill="#6b4629" />
        <rect x="-20" y="52" width="40" height="9" fill="#8a5a30" />
        <path d="M-26,52 L0,26 L26,52z" fill="#b5563c" />
        <path d="M-6,66 A6,6 0 0,1 6,66 L8,76 L-8,76z" fill="#f5b31c" />
        <circle cx="0" cy="78" r="2.5" fill="#f5b31c" />
      </g>

      {/* 床 */}
      <rect y="170" width="400" height="40" fill="#6b4a30" />
      <rect y="170" width="400" height="4" fill="#8a5a30" />

      {/* 空いたままの椅子と譜面台 */}
      <g transform="translate(104,186)">
        <rect x="-16" y="-14" width="32" height="6" fill="#8a5a30" />
        <rect x="10" y="-40" width="6" height="26" fill="#8a5a30" />
        <rect x="-14" y="-40" width="28" height="5" fill="#8a5a30" />
        <rect x="-14" y="-8" width="5" height="8" fill="#6b4629" />
        <rect x="9" y="-8" width="5" height="8" fill="#6b4629" />
      </g>

      {/* 譜面台 */}
      <g transform="translate(196,188)">
        <path d="M-12,0 L0,-6 L12,0" stroke="#4a4f57" strokeWidth="3" fill="none" />
        <rect x="-2" y="-58" width="4" height="54" fill="#4a4f57" />
        <g transform="translate(0,-64) rotate(-14)">
          <rect x="-24" y="-17" width="48" height="34" rx="2" fill="#f0e2c4" />
          <g stroke="#8a8f96" strokeWidth="1">
            <path d="M-18,-10 h36 M-18,-5 h36 M-18,0 h36 M-18,5 h36 M-18,10 h36" />
          </g>
          <g fill="#3a2a1c">
            <circle cx="-12" cy="-5" r="2.4" />
            <circle cx="-2" cy="5" r="2.4" />
            <circle cx="8" cy="0" r="2.4" />
            <circle cx="16" cy="-10" r="2.4" />
          </g>
        </g>
      </g>

      {/* 弾き手 */}
      <g transform="translate(280,186)">
        <ellipse cx="0" cy="2" rx="20" ry="6" fill="#22252b" opacity="0.3" />
        <rect x="-11" y="-30" width="9" height="30" fill="#2b2338" />
        <rect x="3" y="-30" width="9" height="30" fill="#2b2338" />
        <path d="M-16,-64 L16,-64 L20,-26 L-20,-26z" fill="#3b2f4a" />
        <path d="M-16,-64 L0,-42 L16,-64z" fill="#f0e2c4" />
        <circle cx="-2" cy="-76" r="12" fill="#f6efe2" />
        <path d="M-14,-78 Q-2,-94 10,-78 Q-2,-86 -14,-78z" fill="#3b2f4a" />
        {/* 楽器を支える腕 */}
        <path d="M-14,-60 L-34,-52" stroke="#3b2f4a" strokeWidth="8" strokeLinecap="round" fill="none" />
        <circle cx="-37" cy="-51" r="5" fill="#f6efe2" />
        {/* ヴァイオリンと弓 */}
        <g transform="translate(-18,-66) rotate(-16)">
          <ellipse cx="0" cy="0" rx="9" ry="7.5" fill="#8a4b22" />
          <ellipse cx="-13" cy="0" rx="11" ry="9" fill="#8a4b22" />
          <rect x="-6" y="-7" width="10" height="14" fill="#8a4b22" />
          <rect x="-32" y="-2.5" width="14" height="5" rx="1" fill="#6b3a18" />
          <circle cx="-34" cy="0" r="4" fill="#6b3a18" />
          <path d="M-30,-1 L6,-1" stroke="#f0e2c4" strokeWidth="1" />
          <g fill="#4a2a11">
            <rect x="-9" y="-5" width="2" height="10" rx="1" />
            <rect x="-2" y="-5" width="2" height="10" rx="1" />
          </g>
          <g transform="translate(-8,1) rotate(66)">
            <g className="ms-bow">
              <rect x="-28" y="-2" width="56" height="3" rx="1.5" fill="#6b4629" />
              <rect x="-28" y="1" width="56" height="1.6" fill="#f0e2c4" />
              <rect x="24" y="-5" width="7" height="9" rx="2" fill="#3a2a1c" />
            </g>
          </g>
        </g>
        {/* 弓を持つ腕 */}
        <g className="ms-arm">
          <path d="M0,0 L26,10" stroke="#3b2f4a" strokeWidth="8" strokeLinecap="round" fill="none" />
          <circle cx="28" cy="11" r="5" fill="#f6efe2" />
        </g>
      </g>

      {/* 立ちのぼる音符 */}
      <g transform="translate(232,108)">
        <g className="ms-note-a">
          <ellipse cx="0" cy="0" rx="5" ry="3.6" fill="#f5b31c" transform="rotate(-20)" />
          <rect x="3.4" y="-16" width="2" height="16" fill="#f5b31c" />
          <path d="M5.4,-16 q8,3 5,11 q4,-10 -5,-15z" fill="#f5b31c" />
        </g>
        <g className="ms-note-b">
          <ellipse cx="0" cy="0" rx="4.4" ry="3.2" fill="#f5b31c" transform="rotate(-20)" />
          <rect x="3" y="-14" width="1.8" height="14" fill="#f5b31c" />
          <rect x="3" y="-14" width="11" height="2" fill="#f5b31c" />
          <ellipse cx="11" cy="2" rx="4.4" ry="3.2" fill="#f5b31c" transform="rotate(-20)" />
          <rect x="12.2" y="-12" width="1.8" height="14" fill="#f5b31c" />
        </g>
        <g className="ms-note-c">
          <ellipse cx="0" cy="0" rx="5" ry="3.6" fill="#f5b31c" transform="rotate(-20)" />
          <rect x="3.4" y="-15" width="2" height="15" fill="#f5b31c" />
        </g>
      </g>

      {/* 蝋燭 */}
      <g transform="translate(34,178)">
        <ellipse cx="0" cy="0" rx="10" ry="3" fill="#8a5a30" />
        <rect x="-4" y="-20" width="8" height="20" fill="#f0e2c4" />
        <path className="ms-flame-a" d="M0,-34 q6,7 0,13 q-6,-6 0,-13z" fill="#f5b31c" />
      </g>
      <g transform="translate(370,178)">
        <ellipse cx="0" cy="0" rx="10" ry="3" fill="#8a5a30" />
        <rect x="-4" y="-20" width="8" height="20" fill="#f0e2c4" />
        <path className="ms-flame-b" d="M0,-34 q6,7 0,13 q-6,-6 0,-13z" fill="#f5b31c" />
      </g>

      <style>{`
        .ms-bow {
          transform: translate(-4px, 0);
          animation: ms-stroke 2.2s ease-in-out infinite;
        }
        .ms-arm {
          transform-box: fill-box;
          transform-origin: 0% 0%;
          transform: translate(14px, -60px) rotate(-4deg);
          animation: ms-elbow 2.2s ease-in-out infinite;
        }
        .ms-note-a, .ms-note-b, .ms-note-c {
          transform: translate(-8px, -18px);
          opacity: 0.85;
          animation: ms-float 3.6s ease-out infinite;
        }
        .ms-note-b { animation-delay: 1.2s; }
        .ms-note-c { animation-delay: 2.4s; }
        .ms-flame-a, .ms-flame-b {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: ms-flicker 1.3s ease-in-out infinite;
        }
        .ms-flame-b { animation-delay: 0.45s; }
        @keyframes ms-stroke {
          0%, 100% { transform: translate(-16px, 0); }
          50% { transform: translate(14px, 0); }
        }
        @keyframes ms-elbow {
          0%, 100% { transform: translate(14px, -60px) rotate(-9deg); }
          50% { transform: translate(14px, -60px) rotate(3deg); }
        }
        @keyframes ms-float {
          0% { transform: translate(0, 0) rotate(-6deg); opacity: 0; }
          20% { opacity: 0.95; }
          100% { transform: translate(-26px, -70px) rotate(10deg); opacity: 0; }
        }
        @keyframes ms-flicker {
          0%, 100% { transform: scale(1, 1); opacity: 0.9; }
          50% { transform: scale(0.82, 1.15); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ms-bow, .ms-arm, .ms-note-a, .ms-note-b, .ms-note-c,
          .ms-flame-a, .ms-flame-b { animation: none; }
        }
      `}</style>
    </svg>
  );
}
