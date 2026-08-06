/**
 * 旧世界の街(リスボン、イスタンブール、サンティアゴなど)に重ねる動き。
 *
 * 広場の噴水が水を上げてしずくが落ち、鉢の水面に波紋が広がり、
 * 白壁の窓に灯りがともって、時計塔のまわりをハトがまわる。
 * 家並み・時計塔・噴水は静止画が描いているので、ここでは何も塗りつぶさない。
 */
export function WorldOldworld() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 噴水の水柱(静止画の噴出口 200,158 の上) */}
      <g fill="#bfe8f4">
        <ellipse className="wold-jet-a" cx="200" cy="150" rx="2.6" ry="8" opacity="0.6" />
        <ellipse className="wold-jet-b" cx="200" cy="146" rx="2" ry="6" opacity="0.45" />
      </g>

      {/* 落ちるしずく */}
      <g fill="#bfe8f4">
        <circle className="wold-drop wold-p1" cx="192" cy="156" r="1.5" opacity="0.7" />
        <circle className="wold-drop wold-p2" cx="208" cy="156" r="1.4" opacity="0.65" />
        <circle className="wold-drop wold-p3" cx="186" cy="160" r="1.2" opacity="0.6" />
        <circle className="wold-drop wold-p4" cx="214" cy="160" r="1.3" opacity="0.6" />
      </g>

      {/* 鉢の波紋(静止画の水面 200,186) */}
      <g fill="none" stroke="#dff4fa" strokeWidth="1.2">
        <ellipse className="wold-ripple-a" cx="200" cy="186" rx="14" ry="3.6" opacity="0.55" />
        <ellipse className="wold-ripple-b" cx="200" cy="186" rx="14" ry="3.6" opacity="0.45" />
      </g>

      {/* 白壁の窓の灯り(静止画の窓 10x12 に重ねる) */}
      <g fill="#ffd98a">
        <rect className="wold-win wold-w1" x="24" y="116" width="10" height="12" opacity="0.42" />
        <rect className="wold-win wold-w2" x="78" y="108" width="10" height="12" opacity="0.42" />
        <rect className="wold-win wold-w3" x="132" y="122" width="10" height="12" opacity="0.42" />
        <rect className="wold-win wold-w4" x="240" y="118" width="10" height="12" opacity="0.42" />
        <rect className="wold-win wold-w5" x="294" y="110" width="10" height="12" opacity="0.42" />
        <rect className="wold-win wold-w6" x="348" y="120" width="10" height="12" opacity="0.42" />
      </g>

      {/* 時計塔をまわるハト */}
      <g transform="translate(150,60)">
        <g className="wold-dove-a">
          <path className="wold-flap-a" d="M-7,0 Q-3.5,-4.8 0,-0.7 Q3.5,-4.8 7,0" fill="none" stroke="#e8e2d4" strokeWidth="1.8" strokeLinecap="round" />
        </g>
      </g>
      <g transform="translate(250,44)">
        <g className="wold-dove-b">
          <path className="wold-flap-b" d="M-5.5,0 Q-2.7,-4 0,-0.6 Q2.7,-4 5.5,0" fill="none" stroke="#e8e2d4" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </g>

      {/* 流れる雲 */}
      <g fill="#f6efe2">
        <g className="wold-cloud" opacity="0.3">
          <ellipse cx="120" cy="18" rx="16" ry="4.2" />
          <ellipse cx="110" cy="20" rx="9.6" ry="2.9" />
          <ellipse cx="130" cy="20" rx="10.4" ry="2.9" />
        </g>
      </g>

      <style>{`
        .wold-jet-a, .wold-jet-b, .wold-drop,
        .wold-ripple-a, .wold-ripple-b, .wold-win,
        .wold-cloud, .wold-flap-a, .wold-flap-b {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .wold-jet-a { transform-origin: 50% 100%; animation: wold-spurt 3.4s ease-in-out infinite; }
        .wold-jet-b { transform-origin: 50% 100%; animation: wold-spurt 3.4s ease-in-out infinite; animation-delay: -0.5s; }
        .wold-drop { animation: wold-fall 2.6s ease-in infinite; }
        .wold-p2 { animation-duration: 3s; animation-delay: -1s; }
        .wold-p3 { animation-duration: 2.2s; animation-delay: -1.6s; }
        .wold-p4 { animation-duration: 2.8s; animation-delay: -0.6s; }
        .wold-ripple-a { animation: wold-ripple 4.4s ease-out infinite; }
        .wold-ripple-b { animation: wold-ripple 4.4s ease-out infinite; animation-delay: -2.2s; }
        .wold-win { animation: wold-lamp 8s ease-in-out infinite; }
        .wold-w2 { animation-duration: 6.6s; animation-delay: -2s; }
        .wold-w3 { animation-duration: 9.2s; animation-delay: -4s; }
        .wold-w4 { animation-duration: 7.2s; animation-delay: -5.5s; }
        .wold-w5 { animation-duration: 8.6s; animation-delay: -1.5s; }
        .wold-w6 { animation-duration: 6.9s; animation-delay: -3.5s; }
        .wold-dove-a { animation: wold-round-a 22s ease-in-out infinite; }
        .wold-dove-b { animation: wold-round-b 28s ease-in-out infinite; animation-delay: -11s; }
        .wold-flap-a { transform-origin: 50% 100%; animation: wold-flap 1.4s ease-in-out infinite; }
        .wold-flap-b { transform-origin: 50% 100%; animation: wold-flap 1.7s ease-in-out infinite; }
        .wold-cloud { animation: wold-drift 86s linear infinite; }
        @keyframes wold-spurt {
          0%, 100% { transform: scaleY(0.7); opacity: 0.3; }
          50% { transform: scaleY(1.35); opacity: 0.7; }
        }
        @keyframes wold-fall {
          0% { transform: translate(0, -10px); opacity: 0; }
          25% { opacity: 0.7; }
          100% { transform: translate(0, 28px); opacity: 0; }
        }
        @keyframes wold-ripple {
          0% { transform: scale(0.2); opacity: 0.55; }
          100% { transform: scale(2.6); opacity: 0; }
        }
        @keyframes wold-lamp {
          0%, 100% { opacity: 0.14; }
          50% { opacity: 0.5; }
        }
        @keyframes wold-round-a {
          0%, 100% { transform: translate(-60px, 4px) scaleX(1); }
          25% { transform: translate(0, 18px) scaleX(0.5); }
          50% { transform: translate(70px, 0) scaleX(1); }
          75% { transform: translate(0, -14px) scaleX(0.5); }
        }
        @keyframes wold-round-b {
          0%, 100% { transform: translate(60px, -6px) scaleX(1); }
          30% { transform: translate(-10px, 12px) scaleX(0.5); }
          65% { transform: translate(-80px, -4px) scaleX(1); }
        }
        @keyframes wold-flap {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1.4); }
        }
        @keyframes wold-drift {
          0% { transform: translateX(-160px); }
          100% { transform: translateX(430px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .wold-jet-a, .wold-jet-b, .wold-drop, .wold-ripple-a, .wold-ripple-b,
          .wold-win, .wold-dove-a, .wold-dove-b, .wold-flap-a, .wold-flap-b,
          .wold-cloud { animation: none; }
        }
      `}</style>
    </svg>
  );
}
