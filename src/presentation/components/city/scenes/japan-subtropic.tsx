/**
 * 亜熱帯の海辺の町(那覇など)に重ねる動き。
 *
 * 白い波頭が沖から寄せ、汀の泡がふくらんでは引く。
 * 手前の椰子の葉が風に揺れ、アジサシが海の上を渡る。
 * 背景(空・海・砂浜・椰子)は静止画が描いているので、ここでは何も塗りつぶさない。
 */
export function JapanSubtropic() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 沖の波頭 */}
      <g stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" fill="none">
        <path className="jsu-crest jsu-c1" d="M30,116 q10,-3 20,0" opacity="0.5" />
        <path className="jsu-crest jsu-c2" d="M140,120 q12,-3 24,0" opacity="0.45" />
        <path className="jsu-crest jsu-c3" d="M250,114 q11,-3 22,0" opacity="0.5" />
        <path className="jsu-crest jsu-c4" d="M60,132 q14,-4 28,0" opacity="0.42" />
        <path className="jsu-crest jsu-c5" d="M200,138 q15,-4 30,0" opacity="0.4" />
        <path className="jsu-crest jsu-c6" d="M320,130 q13,-4 26,0" opacity="0.44" />
      </g>

      {/* 汀の泡 */}
      <g fill="#ffffff">
        <ellipse className="jsu-foam jsu-f1" cx="70" cy="147" rx="52" ry="4" opacity="0.4" />
        <ellipse className="jsu-foam jsu-f2" cx="200" cy="148" rx="58" ry="4" opacity="0.36" />
        <ellipse className="jsu-foam jsu-f3" cx="330" cy="147" rx="50" ry="4" opacity="0.4" />
      </g>

      {/* アジサシ */}
      <g transform="translate(180,60)">
        <g className="jsu-bird-a">
          <path className="jsu-wing-a" d="M-9,0 q5,-6 9,0 q4,-6 9,0" stroke="#f6efe2" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        </g>
      </g>
      <g transform="translate(232,44)">
        <g className="jsu-bird-b">
          <path className="jsu-wing-b" d="M-7,0 q4,-5 7,0 q3,-5 7,0" stroke="#f6efe2" strokeWidth="1.9" fill="none" strokeLinecap="round" />
        </g>
      </g>

      {/* 手前の椰子の葉 */}
      <g transform="translate(-4,-2)">
        <g className="jsu-frond">
          <path d="M0,0 Q40,18 84,46" stroke="#2f8f4a" strokeWidth="3.4" fill="none" strokeLinecap="round" />
          <g stroke="#3aa257" strokeWidth="3.6" strokeLinecap="round">
            <path d="M14,6 L4,20" />
            <path d="M28,13 L17,28" />
            <path d="M43,21 L31,36" />
            <path d="M58,29 L46,44" />
            <path d="M72,38 L61,52" />
            <path d="M16,7 L27,-5" />
            <path d="M31,14 L43,3" />
            <path d="M46,22 L59,12" />
            <path d="M61,31 L74,22" />
          </g>
        </g>
      </g>

      <style>{`
        .jsu-crest { animation: jsu-swell 9s ease-in-out infinite; }
        .jsu-c2 { animation-duration: 11s; animation-delay: -2.4s; }
        .jsu-c3 { animation-duration: 8s; animation-delay: -4.1s; }
        .jsu-c4 { animation-duration: 12s; animation-delay: -1.2s; }
        .jsu-c5 { animation-duration: 10s; animation-delay: -5.6s; }
        .jsu-c6 { animation-duration: 13s; animation-delay: -3.3s; }
        .jsu-foam {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: jsu-wash 8s ease-in-out infinite;
        }
        .jsu-f2 { animation-duration: 9.6s; animation-delay: -3s; }
        .jsu-f3 { animation-duration: 7.2s; animation-delay: -5s; }
        .jsu-bird-a { animation: jsu-cross-a 30s linear infinite; }
        .jsu-bird-b { animation: jsu-cross-b 38s linear infinite; }
        .jsu-wing-a, .jsu-wing-b {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: jsu-flap 1.8s ease-in-out infinite;
        }
        .jsu-wing-b { animation-duration: 2.3s; }
        .jsu-frond {
          transform-box: fill-box; transform-origin: 0 0;
          animation: jsu-breeze 7s ease-in-out infinite;
        }
        @keyframes jsu-swell {
          0%, 100% { transform: translateX(-8px); opacity: 0.08; }
          50% { transform: translateX(8px); opacity: 0.55; }
        }
        @keyframes jsu-wash {
          0%, 100% { transform: translateY(2px) scaleX(0.88); opacity: 0.16; }
          50% { transform: translateY(-2px) scaleX(1.06); opacity: 0.5; }
        }
        @keyframes jsu-cross-a {
          0% { transform: translate(-210px, 12px); }
          100% { transform: translate(240px, -14px); }
        }
        @keyframes jsu-cross-b {
          0% { transform: translate(-260px, -6px); }
          100% { transform: translate(190px, 16px); }
        }
        @keyframes jsu-flap {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.4); }
        }
        @keyframes jsu-breeze {
          0%, 100% { transform: rotate(-2.5deg); }
          50% { transform: rotate(3deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .jsu-crest, .jsu-foam, .jsu-bird-a, .jsu-bird-b,
          .jsu-wing-a, .jsu-wing-b, .jsu-frond { animation: none; }
        }
      `}</style>
    </svg>
  );
}
