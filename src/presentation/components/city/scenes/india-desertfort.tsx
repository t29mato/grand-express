/**
 * 砂漠の城砦(グワリオル)に重ねる、城壁の旗と砂の帯。
 *
 * 岩山の上の城には旗が立っていて、乾いた風にずっとはためいている。
 * 足元の砂丘の上を細かい砂が流れ、地面のきわは熱でゆらぐ。
 */
export function IndiaDesertfort() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 城壁の旗(狭間のあいだに立つ) */}
      <g transform="translate(270,62)">
        <rect x="-0.9" y="-34" width="1.8" height="34" fill="#7a5a34" />
        <g className="indfort-flag">
          <path d="M0,-33 L22,-29 L22,-19 L0,-23z" fill="#f08a3c" />
          <path d="M0,-28 L22,-24 L22,-21 L0,-25z" fill="#e8443f" />
        </g>
        <circle cx="0" cy="-35" r="1.8" fill="#f5b31c" />
      </g>

      {/* 城の上を舞う鳥 */}
      <g fill="#4a3a26">
        <g className="indfort-bird-a">
          <path className="indfort-bwing-a" d="M-9,0 C-6,-4.4 -3,-4.4 0,-1.4 C3,-4.4 6,-4.4 9,0 C5,-1.4 2,-0.6 0,0.6 C-2,-0.6 -5,-1.4 -9,0z" />
        </g>
        <g className="indfort-bird-b">
          <path className="indfort-bwing-b" d="M-6,0 C-4,-3 -2,-3 0,-0.9 C2,-3 4,-3 6,0 C3.4,-0.9 1.4,-0.4 0,0.4 C-1.4,-0.4 -3.4,-0.9 -6,0z" />
        </g>
        <g className="indfort-bird-c">
          <path className="indfort-bwing-c" d="M-4.4,0 C-3,-2.2 -1.4,-2.2 0,-0.7 C1.4,-2.2 3,-2.2 4.4,0 C2.6,-0.7 1,-0.3 0,0.3 C-1,-0.3 -2.6,-0.7 -4.4,0z" />
        </g>
      </g>

      {/* 地面のきわの陽炎 */}
      <g fill="#f5e4bc">
        <ellipse className="indfort-heat-a" cx="90" cy="146" rx="76" ry="3.2" opacity="0.28" />
        <ellipse className="indfort-heat-b" cx="300" cy="150" rx="80" ry="3" opacity="0.24" />
      </g>

      {/* 砂丘を流れる砂 */}
      <g fill="#f0dcae">
        <ellipse className="indfort-sand-a" cx="120" cy="162" rx="64" ry="4" opacity="0.32" />
        <ellipse className="indfort-sand-b" cx="270" cy="182" rx="80" ry="5" opacity="0.26" />
        <ellipse className="indfort-sand-c" cx="170" cy="202" rx="72" ry="4.6" opacity="0.22" />
      </g>

      {/* 砂丘の稜線から巻き上がる砂 */}
      <g fill="none" stroke="#f0dcae" strokeWidth="2" strokeLinecap="round">
        <g transform="translate(48,158)">
          <path className="indfort-wisp-a" d="M0,0 C14,-4 26,-2 40,-7" opacity="0.3" />
        </g>
        <g transform="translate(232,150)">
          <path className="indfort-wisp-b" d="M0,0 C16,-5 30,-3 46,-8" opacity="0.26" />
        </g>
      </g>

      <style>{`
        .indfort-heat-a, .indfort-heat-b,
        .indfort-sand-a, .indfort-sand-b, .indfort-sand-c,
        .indfort-bird-a, .indfort-bird-b, .indfort-bird-c {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .indfort-flag {
          transform-box: fill-box;
          transform-origin: 0% 50%;
          animation: indfort-wave 2.6s ease-in-out infinite;
        }
        .indfort-heat-a { animation: indfort-shimmer 3.8s ease-in-out infinite; }
        .indfort-heat-b { animation: indfort-shimmer 4.7s ease-in-out infinite; animation-delay: -2s; }
        .indfort-sand-a { animation: indfort-blow 16s linear infinite; }
        .indfort-sand-b { animation: indfort-blow 21s linear infinite; animation-delay: -8s; }
        .indfort-sand-c { animation: indfort-blow 19s linear infinite; animation-delay: -13s; }
        .indfort-wisp-a, .indfort-wisp-b {
          transform-box: fill-box;
          transform-origin: 0% 100%;
        }
        .indfort-wisp-a { animation: indfort-lift 6.5s ease-out infinite; }
        .indfort-wisp-b { animation: indfort-lift 8s ease-out infinite; animation-delay: -3.5s; }
        .indfort-bird-a { transform: translate(96px, 38px); animation: indfort-soar-a 27s linear infinite; }
        .indfort-bird-b { transform: translate(322px, 30px); animation: indfort-soar-b 34s linear infinite; }
        .indfort-bird-c { transform: translate(60px, 58px); animation: indfort-soar-c 40s linear infinite; }
        .indfort-bwing-a, .indfort-bwing-b, .indfort-bwing-c {
          transform-box: fill-box;
          transform-origin: 50% 100%;
        }
        .indfort-bwing-a { animation: indfort-tilt 5.6s ease-in-out infinite; }
        .indfort-bwing-b { animation: indfort-tilt 7s ease-in-out infinite; animation-delay: -2.4s; }
        .indfort-bwing-c { animation: indfort-tilt 6.2s ease-in-out infinite; animation-delay: -4s; }
        @keyframes indfort-wave {
          0%, 100% { transform: skewY(0deg) scaleY(1); }
          30% { transform: skewY(-8deg) scaleY(1.12); }
          65% { transform: skewY(7deg) scaleY(0.9); }
        }
        @keyframes indfort-shimmer {
          0%, 100% { transform: skewX(0deg) scaleY(1); opacity: 0.26; }
          33% { transform: skewX(8deg) scaleY(1.45); opacity: 0.12; }
          66% { transform: skewX(-7deg) scaleY(0.72); opacity: 0.3; }
        }
        @keyframes indfort-blow {
          0% { transform: translateX(-200px) scaleX(0.7); opacity: 0; }
          16% { opacity: 0.3; }
          82% { opacity: 0.22; }
          100% { transform: translateX(320px) scaleX(1.3); opacity: 0; }
        }
        @keyframes indfort-lift {
          0% { transform: translate(0, 6px) scale(0.6); opacity: 0; }
          25% { opacity: 0.3; }
          100% { transform: translate(46px, -18px) scale(1.3); opacity: 0; }
        }
        @keyframes indfort-soar-a {
          0%, 100% { transform: translate(140px, 44px) scale(0.85); }
          25% { transform: translate(96px, 28px) scale(1.05); }
          50% { transform: translate(50px, 44px) scale(1.2); }
          75% { transform: translate(96px, 58px) scale(1); }
        }
        @keyframes indfort-soar-b {
          0%, 100% { transform: translate(288px, 34px) scale(0.9); }
          25% { transform: translate(326px, 20px) scale(1.1); }
          50% { transform: translate(366px, 34px) scale(0.85); }
          75% { transform: translate(326px, 48px) scale(0.7); }
        }
        @keyframes indfort-soar-c {
          0% { transform: translate(-24px, 62px) scale(0.8); }
          50% { transform: translate(200px, 48px) scale(1); }
          100% { transform: translate(424px, 58px) scale(0.8); }
        }
        @keyframes indfort-tilt {
          0%, 100% { transform: scaleY(1) rotate(-4deg); }
          50% { transform: scaleY(0.76) rotate(4deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .indfort-flag,
          .indfort-heat-a, .indfort-heat-b,
          .indfort-sand-a, .indfort-sand-b, .indfort-sand-c,
          .indfort-wisp-a, .indfort-wisp-b,
          .indfort-bird-a, .indfort-bird-b, .indfort-bird-c,
          .indfort-bwing-a, .indfort-bwing-b, .indfort-bwing-c { animation: none; }
        }
      `}</style>
    </svg>
  );
}
