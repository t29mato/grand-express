/**
 * リヴィエラ(ニース、カンヌ、サントロペなど)に重ねる動き。
 *
 * 地中海の細かい波がきらめき、浜にヨットが揺れ、
 * 陽射しに空気がゆらぎ、カモメが二羽わたっていく。
 * 浜・パラソル・松は静止画が描いているので、ここでは何も塗りつぶさない。
 */
export function FranceRiviera() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 海のきらめき(海は y=108〜162) */}
      <g stroke="#d6f4f4" strokeWidth="2" strokeLinecap="round" fill="none">
        <path className="frriv-glint frriv-g1" d="M36,118h52" opacity="0.6" />
        <path className="frriv-glint frriv-g2" d="M188,130h60" opacity="0.5" />
        <path className="frriv-glint frriv-g3" d="M292,120h64" opacity="0.55" />
        <path className="frriv-glint frriv-g4" d="M108,144h58" opacity="0.5" />
        <path className="frriv-glint frriv-g5" d="M296,146h62" opacity="0.45" />
      </g>

      {/* 波打ちぎわの泡(浅瀬 y=150〜162 と砂の境) */}
      <g fill="#eafcfc">
        <ellipse className="frriv-foam-a" cx="110" cy="161" rx="66" ry="3" opacity="0.5" />
        <ellipse className="frriv-foam-b" cx="298" cy="162" rx="76" ry="2.6" opacity="0.42" />
      </g>

      {/* 白いヨット(静止画の船 188〜232 に重ねて揺らす) */}
      <g transform="translate(210,146)">
        <g className="frriv-yacht-a">
          <path d="M-22,0c10,-4 34,-4 44,0c-6,6 -38,6 -44,0z" fill="#f6efe2" />
          <path d="M0,-2V-30l16,28z" fill="#f2ede0" />
          <path d="M-2,-2V-26l-13,24z" fill="#5b8fe8" />
        </g>
      </g>

      {/* 赤帆のヨット(静止画の船 282〜313 に重ねて揺らす) */}
      <g transform="translate(297.5,130)">
        <g className="frriv-yacht-b">
          <path d="M-15.5,0c7,-3 24,-3 31,0c-4,4 -27,4 -31,0z" fill="#f6efe2" />
          <path d="M0.5,-2V-22l11,20z" fill="#e8443f" />
        </g>
      </g>

      {/* 陽射しの空気のゆらぎ */}
      <g fill="#fff3d0">
        <ellipse className="frriv-haze-a" cx="322" cy="32" rx="22" ry="22" opacity="0.16" />
        <ellipse className="frriv-haze-b" cx="200" cy="176" rx="90" ry="10" opacity="0.1" />
      </g>

      {/* わたるカモメ */}
      <g transform="translate(180,48)">
        <g className="frriv-gull-a">
          <path className="frriv-flap-a" d="M-9,0 Q-4.5,-6 0,-0.9 Q4.5,-6 9,0" fill="none" stroke="#f6efe2" strokeWidth="2" strokeLinecap="round" />
        </g>
      </g>
      <g transform="translate(250,66)">
        <g className="frriv-gull-b">
          <path className="frriv-flap-b" d="M-6.5,0 Q-3.2,-4.4 0,-0.7 Q3.2,-4.4 6.5,0" fill="none" stroke="#f6efe2" strokeWidth="1.6" strokeLinecap="round" />
        </g>
      </g>

      <style>{`
        .frriv-glint, .frriv-foam-a, .frriv-foam-b,
        .frriv-yacht-a, .frriv-yacht-b,
        .frriv-haze-a, .frriv-haze-b, .frriv-flap-a, .frriv-flap-b {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .frriv-glint { animation: frriv-slide 15s linear infinite; }
        .frriv-g2 { animation-duration: 19s; animation-delay: -6s; }
        .frriv-g3 { animation-duration: 13s; animation-delay: -9s; }
        .frriv-g4 { animation-duration: 17s; animation-delay: -4s; }
        .frriv-g5 { animation-duration: 12s; animation-delay: -7s; }
        .frriv-foam-a { animation: frriv-wash 9s ease-in-out infinite; }
        .frriv-foam-b { animation: frriv-wash 11.5s ease-in-out infinite; animation-delay: -5s; }
        .frriv-yacht-a { transform-origin: 50% 100%; animation: frriv-heel 6.2s ease-in-out infinite; }
        .frriv-yacht-b { transform-origin: 50% 100%; animation: frriv-heel 4.8s ease-in-out infinite; animation-delay: -2s; }
        .frriv-haze-a { animation: frriv-pulse 8s ease-in-out infinite; }
        .frriv-haze-b { animation: frriv-shimmer 7s ease-in-out infinite; }
        .frriv-gull-a { animation: frriv-cross-a 27s linear infinite; animation-delay: -10s; }
        .frriv-gull-b { animation: frriv-cross-b 35s linear infinite; animation-delay: -18s; }
        .frriv-flap-a { transform-origin: 50% 100%; animation: frriv-flap 2s ease-in-out infinite; }
        .frriv-flap-b { transform-origin: 50% 100%; animation: frriv-flap 2.5s ease-in-out infinite; }
        @keyframes frriv-slide {
          0% { transform: translateX(-28px); opacity: 0; }
          30%, 70% { opacity: 0.6; }
          100% { transform: translateX(28px); opacity: 0; }
        }
        @keyframes frriv-wash {
          0%, 100% { transform: translateY(0) scaleX(1); opacity: 0.24; }
          50% { transform: translateY(2px) scaleX(1.08); opacity: 0.55; }
        }
        @keyframes frriv-heel {
          0%, 100% { transform: rotate(-4deg); }
          50% { transform: rotate(4deg); }
        }
        @keyframes frriv-pulse {
          0%, 100% { transform: scale(0.85); opacity: 0.1; }
          50% { transform: scale(1.2); opacity: 0.24; }
        }
        @keyframes frriv-shimmer {
          0%, 100% { transform: scaleY(1); opacity: 0.06; }
          50% { transform: scaleY(1.5); opacity: 0.16; }
        }
        @keyframes frriv-cross-a {
          0% { transform: translate(-220px, 10px); }
          100% { transform: translate(240px, -12px); }
        }
        @keyframes frriv-cross-b {
          0% { transform: translate(180px, -8px); }
          100% { transform: translate(-290px, 12px); }
        }
        @keyframes frriv-flap {
          0%, 100% { transform: scaleY(0.55); }
          50% { transform: scaleY(1.35); }
        }
        @media (prefers-reduced-motion: reduce) {
          .frriv-glint, .frriv-foam-a, .frriv-foam-b,
          .frriv-yacht-a, .frriv-yacht-b, .frriv-haze-a, .frriv-haze-b,
          .frriv-gull-a, .frriv-gull-b, .frriv-flap-a, .frriv-flap-b { animation: none; }
        }
      `}</style>
    </svg>
  );
}
