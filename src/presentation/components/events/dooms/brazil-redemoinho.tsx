/**
 * 竜巻状のつむじ風で散らかる持ち物。乾いた道でどこからともなく小さな
 * 竜巻が巻き起こり、紙や帽子を巻き上げて三方に散らす。
 *
 * 人を描かず、**渦を巻く砂ぼこりと巻き上げられる帽子・紙**で
 * 「サシのいたずら」を表す。動くのは渦そのものと、舞い上がる小物だけ。
 */
export function BrazilRedemoinho() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 乾いた道の空。 */}
      <rect width="400" height="210" fill="#e8d090" />
      <rect y="0" width="400" height="90" fill="#f2ecd0" />
      <circle cx="60" cy="40" r="20" fill="#f5b31c" opacity="0.8" />

      {/* 乾いた地面。 */}
      <rect y="150" width="400" height="60" fill="#c8a060" />
      <rect y="150" width="400" height="4" fill="#b3915f" />
      <g stroke="#b3915f" strokeWidth="1.4" opacity="0.6">
        <path d="M20,170 h30M80,190 h26M320,175 h30M360,195 h26" />
      </g>

      {/* 竜巻(渦を巻く砂ぼこり)。 */}
      <g className="bra-whirl" transform="translate(200,140)">
        <ellipse cx="0" cy="60" rx="46" ry="10" fill="#c8a060" opacity="0.5" />
        <path d="M0,60 C-30,40 30,20 -20,0 C-45,-15 15,-35 -5,-55 C-20,-68 20,-80 5,-95"
          fill="none" stroke="#d9b878" strokeWidth="14" strokeLinecap="round" opacity="0.75" />
        <path d="M0,60 C-30,40 30,20 -20,0 C-45,-15 15,-35 -5,-55 C-20,-68 20,-80 5,-95"
          fill="none" stroke="#f2e0b0" strokeWidth="5" strokeLinecap="round" opacity="0.6" />
      </g>

      {/* 巻き上げられる帽子。 */}
      <g className="bra-hat">
        <ellipse cx="0" cy="0" rx="16" ry="5" fill="#e8443f" stroke="#20364a" strokeWidth="1.6" />
        <path d="M-8,0 a8,7 0 0 1 16,0z" fill="#e8443f" stroke="#20364a" strokeWidth="1.6" />
      </g>

      {/* 舞い上がる紙片。 */}
      <g className="bra-paper1">
        <rect x="-6" y="-4" width="12" height="8" fill="#f6efe2" stroke="#20364a" strokeWidth="1" />
      </g>
      <g className="bra-paper2">
        <rect x="-5" y="-4" width="10" height="7" fill="#bfe8f4" stroke="#20364a" strokeWidth="1" />
      </g>

      {/* 買い物袋(手前・地面に残る)。 */}
      <path d="M330,180 L326,206 L364,206 L360,180z" fill="#8a5a3a" stroke="#20364a" strokeWidth="2" strokeLinejoin="round" />

      <style>{`
        .bra-whirl {
          transform-box: fill-box;
          transform-origin: 200px 140px;
          animation: bra-whirl-spin 1.1s linear infinite;
        }
        @keyframes bra-whirl-spin {
          from { transform: translate(200px,140px) rotate(0deg); }
          to { transform: translate(200px,140px) rotate(360deg); }
        }
        .bra-hat {
          transform-box: fill-box;
          transform-origin: 0 0;
          animation: bra-hat-fly 2.4s ease-in-out infinite;
        }
        @keyframes bra-hat-fly {
          0% { transform: translate(150px,190px) rotate(0deg); }
          50% { transform: translate(220px,90px) rotate(200deg); }
          100% { transform: translate(150px,190px) rotate(360deg); }
        }
        .bra-paper1 {
          transform-box: fill-box;
          transform-origin: 0 0;
          animation: bra-paper1-fly 1.8s ease-in-out infinite;
        }
        .bra-paper2 {
          transform-box: fill-box;
          transform-origin: 0 0;
          animation: bra-paper2-fly 2.1s ease-in-out infinite;
        }
        @keyframes bra-paper1-fly {
          0% { transform: translate(180px,200px) rotate(0deg); }
          50% { transform: translate(260px,110px) rotate(260deg); }
          100% { transform: translate(180px,200px) rotate(520deg); }
        }
        @keyframes bra-paper2-fly {
          0% { transform: translate(240px,195px) rotate(0deg); }
          50% { transform: translate(160px,100px) rotate(-240deg); }
          100% { transform: translate(240px,195px) rotate(-480deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .bra-whirl, .bra-hat, .bra-paper1, .bra-paper2 { animation: none; }
        }
      `}</style>
    </svg>
  );
}
