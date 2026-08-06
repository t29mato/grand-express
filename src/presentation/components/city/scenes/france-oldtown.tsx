/**
 * 旧市街(コルマール、トゥルーズ、ディジョンなど)に重ねる動き。
 *
 * 木組みの家の窓に灯りがともり、窓辺のゼラニウムが風に揺れ、
 * 屋根の上をハトがわたって、屋根裏窓に日が差し込む。
 * 家・敷石・看板は静止画が描いているので、ここでは何も塗りつぶさない。
 */
export function FranceOldtown() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 窓の灯り(静止画の窓 10x14 に重ねる) */}
      <g fill="#ffd98a">
        <rect className="frold-win frold-w1" x="17.7" y="135.6" width="10" height="14" opacity="0.45" />
        <rect className="frold-win frold-w2" x="46.3" y="135.6" width="10" height="14" opacity="0.45" />
        <rect className="frold-win frold-w3" x="84.7" y="129.1" width="10" height="14" opacity="0.45" />
        <rect className="frold-win frold-w4" x="111.3" y="129.1" width="10" height="14" opacity="0.45" />
        <rect className="frold-win frold-w5" x="345.2" y="131.3" width="10" height="14" opacity="0.45" />
        <rect className="frold-win frold-w6" x="372.8" y="131.3" width="10" height="14" opacity="0.45" />
      </g>

      {/* 屋根裏窓(33,81.6 と 99,66.7)の反射 */}
      <g fill="#eaf4ff">
        <rect className="frold-attic-a" x="33" y="81.6" width="8" height="9" opacity="0.35" />
        <rect className="frold-attic-b" x="99" y="66.7" width="8" height="9" opacity="0.3" />
      </g>

      {/* 窓辺のゼラニウム(静止画の花 r=2 に重ねて揺らす) */}
      <g fill="#e8443f">
        <circle className="frold-bloom frold-b1" cx="22.7" cy="150.6" r="2.2" opacity="0.9" />
        <circle className="frold-bloom frold-b2" cx="51.3" cy="150.6" r="2.2" opacity="0.9" />
        <circle className="frold-bloom frold-b3" cx="89.7" cy="144.1" r="2.2" opacity="0.9" />
        <circle className="frold-bloom frold-b4" cx="350.2" cy="146.3" r="2.2" opacity="0.9" />
        <circle className="frold-bloom frold-b5" cx="377.8" cy="146.3" r="2.2" opacity="0.9" />
      </g>

      {/* 揺れる看板(196,140 の腕木に吊るされた板) */}
      <g className="frold-sign">
        <path d="M170,138h28v12h-28z" fill="#f5b31c" opacity="0.9" />
        <circle cx="184" cy="144" r="3.4" fill="#8a5a2c" />
      </g>

      {/* 流れる雲 */}
      <g fill="#f6efe2">
        <g className="frold-cloud" opacity="0.28">
          <ellipse cx="180" cy="20" rx="15" ry="4" />
          <ellipse cx="171" cy="22" rx="9" ry="2.8" />
          <ellipse cx="190" cy="22" rx="10" ry="2.8" />
        </g>
      </g>

      {/* 屋根の上のハト */}
      <g transform="translate(200,44)">
        <g className="frold-bird">
          <path className="frold-flap" d="M-7,0 Q-3.5,-4.6 0,-0.7 Q3.5,-4.6 7,0" fill="none" stroke="#e8e2d4" strokeWidth="1.7" strokeLinecap="round" />
        </g>
      </g>

      <style>{`
        .frold-win, .frold-attic-a, .frold-attic-b, .frold-bloom,
        .frold-sign, .frold-cloud, .frold-flap {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .frold-win { animation: frold-lamp 7.5s ease-in-out infinite; }
        .frold-w2 { animation-duration: 6.4s; animation-delay: -2s; }
        .frold-w3 { animation-duration: 8.6s; animation-delay: -4s; }
        .frold-w4 { animation-duration: 7s; animation-delay: -5.5s; }
        .frold-w5 { animation-duration: 9.2s; animation-delay: -1.5s; }
        .frold-w6 { animation-duration: 6.8s; animation-delay: -3.5s; }
        .frold-attic-a { animation: frold-shine 11s ease-in-out infinite; }
        .frold-attic-b { animation: frold-shine 14s ease-in-out infinite; animation-delay: -6s; }
        .frold-bloom { transform-origin: 50% 100%; animation: frold-sway 4.2s ease-in-out infinite; }
        .frold-b2 { animation-duration: 5s; animation-delay: -1.3s; }
        .frold-b3 { animation-duration: 3.8s; animation-delay: -2.4s; }
        .frold-b4 { animation-duration: 5.4s; animation-delay: -0.8s; }
        .frold-b5 { animation-duration: 4.6s; animation-delay: -3.1s; }
        .frold-sign { transform-box: fill-box; transform-origin: 100% 0%; animation: frold-creak 6s ease-in-out infinite; }
        .frold-cloud { animation: frold-drift 96s linear infinite; }
        .frold-bird { animation: frold-cross 29s linear infinite; animation-delay: -12s; }
        .frold-flap { transform-origin: 50% 100%; animation: frold-flap 1.6s ease-in-out infinite; }
        @keyframes frold-lamp {
          0%, 100% { opacity: 0.16; }
          50% { opacity: 0.55; }
        }
        @keyframes frold-shine {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.45; }
        }
        @keyframes frold-sway {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(1.4px, -0.8px); }
        }
        @keyframes frold-creak {
          0%, 100% { transform: rotate(-3.5deg); }
          50% { transform: rotate(3.5deg); }
        }
        @keyframes frold-drift {
          0% { transform: translateX(-210px); }
          100% { transform: translateX(430px); }
        }
        @keyframes frold-cross {
          0% { transform: translate(-220px, 10px); }
          100% { transform: translate(220px, -12px); }
        }
        @keyframes frold-flap {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1.4); }
        }
        @media (prefers-reduced-motion: reduce) {
          .frold-win, .frold-attic-a, .frold-attic-b, .frold-bloom,
          .frold-sign, .frold-cloud, .frold-bird, .frold-flap { animation: none; }
        }
      `}</style>
    </svg>
  );
}
