/**
 * 寺の台所が座った者全員に食事を出し、金は受け取らない。
 *
 * ゴープラムの前でバナナの葉に飯が盛られ、桶からサンバルが注がれ続ける。
 * 差し出した硬貨は開いた掌に押し返されて、いつまでも受け取ってもらえない。
 */
export function TempleMeal() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 南インドの空と乾いた境内 */}
      <rect width="400" height="210" fill="#20364a" />
      <rect width="400" height="150" fill="#8fc4e8" />
      <circle cx="330" cy="42" r="20" fill="#f5e2a8" />
      <rect y="150" width="400" height="60" fill="#c9a877" />
      <rect y="150" width="400" height="5" fill="#a8834d" />

      {/* ゴープラム(塔門) */}
      <g fill="#e8d6b6">
        <path d="M24,150 L124,150 L116,128 L32,128z" />
        <path d="M32,128 L116,128 L108,108 L40,108z" />
        <path d="M40,108 L108,108 L101,90 L47,90z" />
        <path d="M47,90 L101,90 L94,74 L54,74z" />
        <path d="M54,74 L94,74 L88,60 L60,60z" />
        <path d="M60,60 Q74,38 88,60z" />
      </g>
      <g>
        <rect x="30" y="125" width="88" height="5" fill="#e8443f" />
        <rect x="38" y="105" width="72" height="5" fill="#3f7a5a" />
        <rect x="45" y="87" width="58" height="5" fill="#f5b31c" />
        <rect x="52" y="71" width="44" height="4" fill="#e8443f" />
        <rect x="64" y="128" width="20" height="22" fill="#5a4030" />
        <circle cx="67" cy="42" r="4" fill="#f5b31c" />
        <circle cx="74" cy="37" r="4.5" fill="#f5b31c" />
        <circle cx="81" cy="42" r="4" fill="#f5b31c" />
      </g>

      {/* 座って待つ旅人 */}
      <g transform="translate(146,190)">
        <path d="M-16,0 L18,0 Q22,-6 14,-8 L-14,-8 Q-20,-6 -16,0z" fill="#3b2f4a" />
        <rect x="-11" y="-34" width="24" height="27" rx="7" fill="#5b8fe8" />
        <rect className="tm-reach" x="10" y="-30" width="8" height="24" rx="4" fill="#f6efe2" />
        <circle cx="0" cy="-44" r="10" fill="#f6efe2" />
      </g>

      {/* バナナの葉と、その上の食事 */}
      <ellipse cx="252" cy="176" rx="88" ry="26" fill="#3f8a3f" />
      <path
        d="M166,176 L338,176 M196,162 L206,176 M232,160 L240,176 M272,160 L266,176 M306,163 L296,176"
        stroke="#2c5f2c"
        strokeWidth="2.5"
        fill="none"
      />
      <ellipse cx="240" cy="170" rx="30" ry="14" fill="#f6efe2" />
      <circle className="tm-dab-a" cx="192" cy="176" r="9" fill="#e8a03c" />
      <circle className="tm-dab-b" cx="204" cy="162" r="6.5" fill="#e8443f" />
      <circle className="tm-dab-c" cx="288" cy="172" r="9" fill="#3f7a5a" />
      <circle className="tm-dab-d" cx="308" cy="180" r="7" fill="#a83a2c" />
      <circle className="tm-dab-e" cx="320" cy="167" r="6" fill="#f5b31c" />

      {/* 注がれ続けるサンバル */}
      <path
        className="tm-stream"
        d="M226,86 Q219,122 215,158"
        stroke="#e8a03c"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
        strokeDasharray="14 9"
      />
      <g transform="translate(240,82)">
        <g className="tm-pot">
          <path d="M-20,-14 Q-25,10 0,13 Q25,10 20,-14z" fill="#8a6a4a" />
          <rect x="-23" y="-19" width="46" height="7" rx="3" fill="#a8834d" />
          <path d="M-14,-19 Q0,-34 14,-19" fill="none" stroke="#6a4f34" strokeWidth="3" />
        </g>
      </g>

      {/* 押し返される硬貨 */}
      <g transform="translate(304,138)">
        <circle className="tm-coin" r="9" fill="#f5b31c" stroke="#c07f0c" strokeWidth="2" />
      </g>
      <g transform="translate(348,132)">
        <g className="tm-palm">
          <rect x="8" y="-10" width="56" height="21" rx="10" fill="#e8d6b6" />
          <g fill="#f6efe2">
            <rect x="-12" y="-14" width="24" height="32" rx="10" />
            <rect x="-16" y="-11" width="9" height="9" rx="4" />
            <rect x="-11" y="-22" width="7" height="12" rx="3.5" />
            <rect x="-2" y="-24" width="7" height="14" rx="3.5" />
            <rect x="7" y="-22" width="7" height="12" rx="3.5" />
          </g>
        </g>
      </g>

      <style>{`
        .tm-pot { transform: rotate(-38deg); transform-origin: 12px -16px;
          animation: tm-tip 2.6s ease-in-out infinite; }
        .tm-stream { animation: tm-flow 0.8s linear infinite; }
        .tm-dab-a { transform-box: fill-box; transform-origin: center;
          animation: tm-plop 3.2s ease-out infinite; }
        .tm-dab-b { transform-box: fill-box; transform-origin: center;
          animation: tm-plop 3.2s ease-out infinite; animation-delay: 0.4s; }
        .tm-dab-c { transform-box: fill-box; transform-origin: center;
          animation: tm-plop 3.2s ease-out infinite; animation-delay: 0.8s; }
        .tm-dab-d { transform-box: fill-box; transform-origin: center;
          animation: tm-plop 3.2s ease-out infinite; animation-delay: 1.2s; }
        .tm-dab-e { transform-box: fill-box; transform-origin: center;
          animation: tm-plop 3.2s ease-out infinite; animation-delay: 1.6s; }
        .tm-coin { animation: tm-refuse 1.9s ease-in-out infinite; }
        .tm-palm { animation: tm-push 1.9s ease-in-out infinite; }
        .tm-reach {
          transform: rotate(-24deg);
          transform-origin: 14px -28px;
          animation: tm-offer 1.9s ease-in-out infinite;
        }
        @keyframes tm-tip {
          0%, 100% { transform: rotate(-38deg); }
          50% { transform: rotate(-46deg); }
        }
        @keyframes tm-flow {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -23; }
        }
        @keyframes tm-plop {
          0% { transform: scale(0); }
          14% { transform: scale(1.25); }
          24%, 100% { transform: scale(1); }
        }
        @keyframes tm-refuse {
          0%, 100% { transform: translate(-20px, 8px); }
          38% { transform: translate(9px, 0); }
          52% { transform: translate(-1px, -5px); }
        }
        @keyframes tm-push {
          0%, 30% { transform: translate(0, 0); }
          44% { transform: translate(-7px, 0); }
          64%, 100% { transform: translate(0, 0); }
        }
        @keyframes tm-offer {
          0%, 100% { transform: rotate(-24deg); }
          40% { transform: rotate(-48deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .tm-pot, .tm-stream, .tm-dab-a, .tm-dab-b, .tm-dab-c, .tm-dab-d, .tm-dab-e,
          .tm-coin, .tm-palm, .tm-reach { animation: none; }
        }
      `}</style>
    </svg>
  );
}
