/**
 * 11月。灯りと死者。
 *
 * 左は戸口にずらりと並ぶ灯明と、空にあがる花火。
 * 右は墓地の夜。切り紙の旗の下に蝋燭とマリーゴールドを並べて、家族が座っている。
 * どちらも火を灯して過ごす夜であることが、並べると分かる。
 */
export function World07() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* どちらも夜。左は少し暖かく、右は少し青い */}
      <rect width="200" height="210" fill="#2a1f38" />
      <rect x="200" width="200" height="210" fill="#1f2740" />

      {/* 花火(左) */}
      <g className="w07-burst" stroke="#f5b31c" strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M64,40 l0,-20 M64,40 l14,-14 M64,40 l20,0 M64,40 l14,14 M64,40 l0,20 M64,40 l-14,14 M64,40 l-20,0 M64,40 l-14,-14" />
      </g>
      <g className="w07-burst w07-b2" stroke="#e8447a" strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M148,28 l0,-18 M148,28 l13,-13 M148,28 l18,0 M148,28 l13,13 M148,28 l0,18 M148,28 l-13,13 M148,28 l-18,0 M148,28 l-13,-13" />
      </g>

      {/* 家の正面と戸口(左) */}
      <rect y="96" width="200" height="10" fill="#4a2f20" />
      <rect y="106" width="200" height="76" fill="#7a4f32" />
      <path d="M62,182 L62,132 Q100,102 138,132 L138,182z" fill="#4a2f20" />
      <path d="M70,182 L70,136 Q100,110 130,136 L130,182z" fill="#f5e2a8" />
      <path d="M80,182 L80,140 Q100,120 120,140 L120,182z" fill="#f5b31c" />
      <g fill="#4a2f20">
        <rect x="16" y="122" width="30" height="26" rx="3" />
        <rect x="154" y="122" width="30" height="26" rx="3" />
      </g>
      <g fill="#f5e2a8" opacity="0.85">
        <rect x="21" y="127" width="20" height="16" />
        <rect x="159" y="127" width="20" height="16" />
      </g>

      {/* 灯明の列(左) */}
      <rect y="182" width="200" height="28" fill="#2f2434" />
      <g fill="#b5632f">
        <ellipse cx="26" cy="186" rx="8" ry="4" />
        <ellipse cx="56" cy="186" rx="8" ry="4" />
        <ellipse cx="100" cy="186" rx="8" ry="4" />
        <ellipse cx="144" cy="186" rx="8" ry="4" />
        <ellipse cx="174" cy="186" rx="8" ry="4" />
      </g>
      <g fill="#f5e2a8">
        <ellipse className="w07-flame" cx="26" cy="178" rx="3.2" ry="6.5" />
        <ellipse className="w07-flame w07-f2" cx="56" cy="178" rx="3.2" ry="6.5" />
        <ellipse className="w07-flame w07-f3" cx="100" cy="178" rx="3.2" ry="6.5" />
        <ellipse className="w07-flame w07-f4" cx="144" cy="178" rx="3.2" ry="6.5" />
        <ellipse className="w07-flame w07-f5" cx="174" cy="178" rx="3.2" ry="6.5" />
      </g>

      {/* 切り紙の旗(右) */}
      <path d="M204,30 Q300,52 396,30" fill="none" stroke="#6b5a7a" strokeWidth="2" />
      <g className="w07-papel">
        <rect x="212" y="36" width="24" height="18" fill="#e8447a" />
        <rect x="244" y="42" width="24" height="18" fill="#f5b31c" />
        <rect x="276" y="45" width="24" height="18" fill="#5b8fe8" />
        <rect x="308" y="43" width="24" height="18" fill="#3f8f7a" />
        <rect x="340" y="38" width="24" height="18" fill="#e8443f" />
        <g fill="#1f2740">
          <circle cx="224" cy="45" r="4" />
          <circle cx="256" cy="51" r="4" />
          <circle cx="288" cy="54" r="4" />
          <circle cx="320" cy="52" r="4" />
          <circle cx="352" cy="47" r="4" />
        </g>
      </g>

      {/* 墓地(右) */}
      <rect x="200" y="150" width="200" height="60" fill="#2a3048" />
      <rect x="200" y="150" width="200" height="7" fill="#39405c" />
      <g fill="#8f96a8">
        <path d="M218,150 L218,116 a11,11 0 0 1 22,0 L240,150z" />
        <path d="M296,150 L296,110 a12,12 0 0 1 24,0 L320,150z" />
        <path d="M356,150 L356,122 a10,10 0 0 1 20,0 L376,150z" />
      </g>
      <g fill="#6f778c">
        <rect x="222" y="126" width="14" height="3" />
        <rect x="301" y="120" width="14" height="3" />
        <rect x="359" y="132" width="14" height="3" />
      </g>

      {/* マリーゴールドの道 */}
      <g fill="#f0902c">
        <circle className="w07-marigold" cx="222" cy="166" r="5" />
        <circle className="w07-marigold w07-m2" cx="240" cy="170" r="5.5" />
        <circle className="w07-marigold w07-m3" cx="258" cy="166" r="5" />
        <circle className="w07-marigold w07-m4" cx="276" cy="172" r="5.5" />
        <circle className="w07-marigold w07-m5" cx="296" cy="167" r="5" />
        <circle className="w07-marigold w07-m6" cx="316" cy="172" r="5.5" />
        <circle className="w07-marigold w07-m7" cx="336" cy="167" r="5" />
        <circle className="w07-marigold w07-m8" cx="356" cy="172" r="5.5" />
        <circle className="w07-marigold w07-m9" cx="376" cy="167" r="5" />
      </g>
      <g fill="#f5b31c">
        <circle cx="222" cy="166" r="2" />
        <circle cx="258" cy="166" r="2" />
        <circle cx="296" cy="167" r="2" />
        <circle cx="336" cy="167" r="2" />
        <circle cx="376" cy="167" r="2" />
      </g>

      {/* 墓前の蝋燭 */}
      <g fill="#e0dbcd">
        <rect x="264" y="132" width="7" height="18" />
        <rect x="330" y="136" width="7" height="14" />
      </g>
      <g fill="#f5e2a8">
        <ellipse className="w07-flame w07-f6" cx="267.5" cy="126" rx="3" ry="6" />
        <ellipse className="w07-flame w07-f7" cx="333.5" cy="130" rx="3" ry="6" />
      </g>

      {/* 夜どおし座っている家族 */}
      <g className="w07-vigil">
        <circle cx="248" cy="186" r="9" fill="#f6efe2" />
        <path d="M236,210 L236,192 Q248,182 260,192 L260,210z" fill="#c93a3a" />
      </g>
      <g className="w07-vigil w07-v2">
        <circle cx="272" cy="190" r="8" fill="#f6efe2" />
        <path d="M262,210 L262,196 Q272,187 282,196 L282,210z" fill="#5b8fe8" />
      </g>

      {/* 火の粉(左) */}
      <g fill="#f5b31c">
        <circle className="w07-spark" cx="92" cy="80" r="2.4" />
        <circle className="w07-spark w07-s2" cx="34" cy="70" r="2" />
        <circle className="w07-spark w07-s3" cx="168" cy="86" r="2.2" />
      </g>

      {/* 半球の境目 */}
      <rect x="197" width="6" height="210" fill="#f6efe2" opacity="0.22" />
      <path d="M200,0 L200,210" stroke="#f6efe2" strokeWidth="2" strokeDasharray="10 9" opacity="0.55" />

      <style>{`
        .w07-burst {
          transform-box: fill-box; transform-origin: center;
          animation: w07-pop 3s ease-out infinite;
        }
        .w07-b2 { animation-duration: 3.6s; animation-delay: -1.4s; }
        .w07-flame {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: w07-burn 1.3s ease-in-out infinite;
        }
        .w07-f2 { animation-delay: -0.2s; }
        .w07-f3 { animation-delay: -0.4s; }
        .w07-f4 { animation-delay: -0.6s; }
        .w07-f5 { animation-delay: -0.8s; }
        .w07-f6 { animation-delay: -1s; animation-duration: 1.6s; }
        .w07-f7 { animation-delay: -0.5s; animation-duration: 1.5s; }
        .w07-papel {
          transform-box: fill-box; transform-origin: 50% 0;
          animation: w07-flutter 4.4s ease-in-out infinite;
        }
        .w07-marigold {
          transform-box: fill-box; transform-origin: center;
          animation: w07-glow 3.2s ease-in-out infinite;
        }
        .w07-m2 { animation-delay: -0.35s; }
        .w07-m3 { animation-delay: -0.7s; }
        .w07-m4 { animation-delay: -1.05s; }
        .w07-m5 { animation-delay: -1.4s; }
        .w07-m6 { animation-delay: -1.75s; }
        .w07-m7 { animation-delay: -2.1s; }
        .w07-m8 { animation-delay: -2.45s; }
        .w07-m9 { animation-delay: -2.8s; }
        .w07-vigil {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: w07-sway 5.2s ease-in-out infinite;
        }
        .w07-v2 { animation-delay: -2.1s; }
        .w07-spark {
          transform-box: fill-box; transform-origin: center;
          animation: w07-drift 4.6s linear infinite;
        }
        .w07-s2 { animation-delay: -1.8s; animation-duration: 5.4s; }
        .w07-s3 { animation-delay: -3.2s; animation-duration: 5s; }
        @keyframes w07-pop {
          0% { transform: scale(0.2); opacity: 0; }
          16% { opacity: 1; }
          70% { opacity: 0.85; }
          100% { transform: scale(1.7); opacity: 0; }
        }
        @keyframes w07-burn {
          0%, 100% { transform: scale(1, 1); }
          50% { transform: scale(0.76, 1.24); }
        }
        @keyframes w07-flutter {
          0%, 100% { transform: rotate(-1.2deg); }
          50% { transform: rotate(1.2deg); }
        }
        @keyframes w07-glow {
          0%, 100% { transform: scale(0.86); opacity: 0.8; }
          50% { transform: scale(1.14); opacity: 1; }
        }
        @keyframes w07-sway {
          0%, 100% { transform: rotate(-1.8deg); }
          50% { transform: rotate(1.8deg); }
        }
        @keyframes w07-drift {
          0% { transform: translate(0, 14px); opacity: 0; }
          22%, 70% { opacity: 1; }
          100% { transform: translate(-16px, -58px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .w07-burst, .w07-flame, .w07-papel, .w07-marigold,
          .w07-vigil, .w07-spark { animation: none; }
        }
      `}</style>
    </svg>
  );
}
