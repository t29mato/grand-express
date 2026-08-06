/**
 * 広場のある町(メキシコシティ、カルタヘナ、リマなど)に重ねる動き。
 *
 * 中央の噴水が水を上げてしずくが落ち、鉢に波紋が広がり、
 * 回廊の日陰がゆっくり動いて、ハトが敷石から飛び立つ。
 * 鐘楼・回廊・噴水は静止画が描いているので、ここでは何も塗りつぶさない。
 */
export function WorldPlaza() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 噴水の水柱(静止画の鉢 204,158 の上) */}
      <g fill="#bfe8f4">
        <ellipse className="wplz-jet-a" cx="204" cy="148" rx="2.8" ry="9" opacity="0.6" />
        <ellipse className="wplz-jet-b" cx="204" cy="143" rx="2.1" ry="6.5" opacity="0.45" />
      </g>

      {/* 鉢からこぼれるしずく */}
      <g fill="#bfe8f4">
        <circle className="wplz-drop wplz-p1" cx="194" cy="160" r="1.5" opacity="0.7" />
        <circle className="wplz-drop wplz-p2" cx="214" cy="160" r="1.4" opacity="0.65" />
        <circle className="wplz-drop wplz-p3" cx="188" cy="163" r="1.2" opacity="0.6" />
        <circle className="wplz-drop wplz-p4" cx="220" cy="163" r="1.3" opacity="0.6" />
      </g>

      {/* 鉢の波紋(静止画の水面 204,182) */}
      <g fill="none" stroke="#dff4fa" strokeWidth="1.3">
        <ellipse className="wplz-ripple-a" cx="204" cy="182" rx="15" ry="4" opacity="0.55" />
        <ellipse className="wplz-ripple-b" cx="204" cy="182" rx="15" ry="4" opacity="0.45" />
      </g>

      {/* 回廊のアーチに落ちる日陰(112〜376 の柱間) */}
      <g fill="#8a5a2c">
        <rect className="wplz-shade" x="112" y="150" width="264" height="10" opacity="0.12" />
      </g>

      {/* 太陽(58,34)の光の脈 */}
      <circle className="wplz-sun" cx="58" cy="34" r="21" fill="#ffe9a8" opacity="0.2" />

      {/* やしの葉(静止画の葉 344,112 に重ねてそよがせる) */}
      <path
        className="wplz-frond"
        d="M344,112c-15,-4 -20,3 -22,10c8,-7 15,-7 22,-2c7,-5 14,-5 22,2c-2,-7 -7,-14 -22,-10z"
        fill="#2f7d3f"
      />

      {/* 敷石から飛び立つハト */}
      <g transform="translate(120,168)">
        <g className="wplz-dove-a">
          <path className="wplz-flap-a" d="M-7,0 Q-3.5,-4.8 0,-0.7 Q3.5,-4.8 7,0" fill="none" stroke="#e8e2d4" strokeWidth="1.8" strokeLinecap="round" />
        </g>
      </g>
      <g transform="translate(300,176)">
        <g className="wplz-dove-b">
          <path className="wplz-flap-b" d="M-6,0 Q-3,-4.2 0,-0.6 Q3,-4.2 6,0" fill="none" stroke="#e8e2d4" strokeWidth="1.6" strokeLinecap="round" />
        </g>
      </g>

      <style>{`
        .wplz-jet-a, .wplz-jet-b, .wplz-drop,
        .wplz-ripple-a, .wplz-ripple-b, .wplz-shade, .wplz-sun,
        .wplz-frond, .wplz-flap-a, .wplz-flap-b {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .wplz-jet-a { transform-origin: 50% 100%; animation: wplz-spurt 3.6s ease-in-out infinite; }
        .wplz-jet-b { transform-origin: 50% 100%; animation: wplz-spurt 3.6s ease-in-out infinite; animation-delay: -0.6s; }
        .wplz-drop { animation: wplz-fall 2.8s ease-in infinite; }
        .wplz-p2 { animation-duration: 3.2s; animation-delay: -1.1s; }
        .wplz-p3 { animation-duration: 2.4s; animation-delay: -1.8s; }
        .wplz-p4 { animation-duration: 3s; animation-delay: -0.7s; }
        .wplz-ripple-a { animation: wplz-ripple 4.8s ease-out infinite; }
        .wplz-ripple-b { animation: wplz-ripple 4.8s ease-out infinite; animation-delay: -2.4s; }
        .wplz-shade { transform-origin: 50% 0%; animation: wplz-shade 24s ease-in-out infinite; }
        .wplz-sun { animation: wplz-pulse 9s ease-in-out infinite; }
        .wplz-frond { transform-origin: 50% 100%; animation: wplz-sway 6s ease-in-out infinite; }
        .wplz-dove-a { animation: wplz-liftoff-a 20s ease-in-out infinite; }
        .wplz-dove-b { animation: wplz-liftoff-b 26s ease-in-out infinite; animation-delay: -9s; }
        .wplz-flap-a { transform-origin: 50% 100%; animation: wplz-flap 1.3s ease-in-out infinite; }
        .wplz-flap-b { transform-origin: 50% 100%; animation: wplz-flap 1.6s ease-in-out infinite; }
        @keyframes wplz-spurt {
          0%, 100% { transform: scaleY(0.7); opacity: 0.3; }
          50% { transform: scaleY(1.35); opacity: 0.7; }
        }
        @keyframes wplz-fall {
          0% { transform: translate(0, -10px); opacity: 0; }
          25% { opacity: 0.7; }
          100% { transform: translate(0, 26px); opacity: 0; }
        }
        @keyframes wplz-ripple {
          0% { transform: scale(0.2); opacity: 0.55; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes wplz-shade {
          0%, 100% { transform: scaleY(0.6) translateX(-6px); opacity: 0.06; }
          50% { transform: scaleY(1.5) translateX(6px); opacity: 0.16; }
        }
        @keyframes wplz-pulse {
          0%, 100% { transform: scale(0.84); opacity: 0.12; }
          50% { transform: scale(1.18); opacity: 0.3; }
        }
        @keyframes wplz-sway {
          0%, 100% { transform: rotate(-4deg) scaleX(1); }
          50% { transform: rotate(4deg) scaleX(0.94); }
        }
        @keyframes wplz-liftoff-a {
          0% { transform: translate(-60px, 30px); opacity: 0; }
          10% { opacity: 0.9; }
          85% { opacity: 0.9; }
          100% { transform: translate(170px, -120px); opacity: 0; }
        }
        @keyframes wplz-liftoff-b {
          0% { transform: translate(50px, 24px); opacity: 0; }
          12% { opacity: 0.85; }
          85% { opacity: 0.85; }
          100% { transform: translate(-190px, -130px); opacity: 0; }
        }
        @keyframes wplz-flap {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1.4); }
        }
        @media (prefers-reduced-motion: reduce) {
          .wplz-jet-a, .wplz-jet-b, .wplz-drop, .wplz-ripple-a, .wplz-ripple-b,
          .wplz-shade, .wplz-sun, .wplz-frond, .wplz-dove-a, .wplz-dove-b,
          .wplz-flap-a, .wplz-flap-b { animation: none; }
        }
      `}</style>
    </svg>
  );
}
