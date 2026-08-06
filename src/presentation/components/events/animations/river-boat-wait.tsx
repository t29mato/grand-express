/**
 * 川船が荷物の集まるのを待っていて出航しない。
 *
 * 岸につながれたままの二層の川船。荷はまだ積み込み中で、ハンマックでもう二晩過ごす。
 */
export function RiverBoatWait() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 暮れた空 */}
      <rect width="400" height="210" fill="#22364d" />
      <rect y="86" width="400" height="30" fill="#5c4457" />
      <circle cx="58" cy="114" r="18" fill="#b8663f" />
      <g fill="#f6efe2">
        <circle className="rv-star-a" cx="46" cy="26" r="2" />
        <circle className="rv-star-b" cx="126" cy="16" r="1.6" />
        <circle className="rv-star-c" cx="212" cy="34" r="2" />
        <circle className="rv-star-a" cx="298" cy="20" r="1.6" />
        <circle className="rv-star-b" cx="356" cy="44" r="2" />
        <circle className="rv-star-c" cx="176" cy="60" r="1.6" />
      </g>

      {/* 岸のジャングル */}
      <g fill="#16281f">
        <ellipse cx="20" cy="106" rx="34" ry="18" />
        <ellipse cx="78" cy="100" rx="30" ry="20" />
        <ellipse cx="136" cy="106" rx="34" ry="16" />
        <ellipse cx="200" cy="98" rx="32" ry="20" />
        <ellipse cx="262" cy="106" rx="30" ry="17" />
        <ellipse cx="322" cy="100" rx="34" ry="19" />
        <ellipse cx="384" cy="106" rx="30" ry="17" />
        <rect y="104" width="400" height="16" />
      </g>

      {/* 川面 */}
      <rect y="118" width="400" height="92" fill="#1e4256" />
      <ellipse cx="200" cy="166" rx="150" ry="14" fill="#16303f" />
      <g stroke="#37637c" strokeWidth="3" strokeLinecap="round">
        <path className="rv-ripple-a" d="M20,182 h30 M96,190 h24 M210,184 h28 M320,192 h26" />
        <path className="rv-ripple-b" d="M56,198 h26 M150,202 h30 M262,196 h24 M348,204 h22" />
      </g>

      {/* 舫い杭とロープ */}
      <rect x="16" y="140" width="7" height="26" rx="2" fill="#6b4629" />
      <path d="M20,142 Q42,158 62,140" stroke="#d8b98a" strokeWidth="2.5" fill="none" />

      {/* 停まったままの川船 */}
      <g transform="translate(206,158)">
        <g className="rv-boat">
          {/* 船体 */}
          <path d="M-142,-28 L130,-28 L152,-12 L120,6 L-130,6 L-142,-16z" fill="#7a4f2c" />
          <rect x="-142" y="-22" width="290" height="6" fill="#b8663f" />
          {/* 下段の甲板 */}
          <rect x="-138" y="-34" width="284" height="6" fill="#c9a877" />
          <g fill="#7a4f2c">
            <rect x="-134" y="-76" width="6" height="42" />
            <rect x="-72" y="-76" width="6" height="42" />
            <rect x="-8" y="-76" width="6" height="42" />
            <rect x="56" y="-76" width="6" height="42" />
            <rect x="120" y="-76" width="6" height="42" />
          </g>
          <rect x="-140" y="-80" width="288" height="6" fill="#c9a877" />
          {/* 上段 */}
          <g fill="#7a4f2c">
            <rect x="-120" y="-114" width="6" height="34" />
            <rect x="-52" y="-114" width="6" height="34" />
            <rect x="20" y="-114" width="6" height="34" />
            <rect x="92" y="-114" width="6" height="34" />
          </g>
          <rect x="-126" y="-122" width="266" height="9" rx="3" fill="#b8663f" />
          <rect x="-116" y="-100" width="228" height="3" fill="#9b7a4e" />
          {/* 操舵室 */}
          <rect x="96" y="-110" width="44" height="30" fill="#c9a877" />
          <rect x="104" y="-104" width="28" height="14" fill="#22364d" />
          {/* 灯り */}
          <circle cx="-84" cy="-84" r="4" fill="#f5b31c" />
          <circle cx="66" cy="-84" r="4" fill="#f5b31c" />
          {/* 積み終わらない貨物 */}
          <g>
            <rect x="-116" y="-54" width="26" height="20" fill="#a97c46" />
            <path d="M-116,-54 L-90,-34 M-90,-54 L-116,-34" stroke="#6b4629" strokeWidth="2" />
            <rect x="-88" y="-54" width="26" height="20" fill="#a97c46" />
            <path d="M-88,-54 L-62,-34 M-62,-54 L-88,-34" stroke="#6b4629" strokeWidth="2" />
            <rect x="-104" y="-74" width="26" height="20" fill="#8e6636" />
            <path d="M-104,-74 L-78,-54 M-78,-74 L-104,-54" stroke="#6b4629" strokeWidth="2" />
          </g>
          {/* 吊り下ろされる荷 */}
          <rect className="rv-rope" x="63" y="-80" width="2.5" height="28" fill="#d8b98a" />
          <g className="rv-crate">
            <rect x="50" y="-52" width="28" height="20" fill="#a97c46" />
            <path d="M50,-52 L78,-32 M78,-52 L50,-32" stroke="#6b4629" strokeWidth="2" />
          </g>
          {/* ハンモックの二晩目 */}
          <g className="rv-hammock">
            <path d="M-6,-72 Q28,-34 62,-72" stroke="#d8b98a" strokeWidth="4" fill="none" />
            <ellipse cx="28" cy="-48" rx="28" ry="10" fill="#5b8fe8" />
            <circle cx="0" cy="-58" r="8" fill="#f6efe2" />
            <path d="M-8,-60 Q0,-70 8,-60 Q0,-64 -8,-60z" fill="#3b2f4a" />
          </g>
        </g>
      </g>

      <style>{`
        .rv-boat {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: rv-bob 5s ease-in-out infinite;
        }
        .rv-hammock {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          transform: rotate(2deg);
          animation: rv-swing 3.6s ease-in-out infinite;
        }
        .rv-crate {
          transform: translate(0, -12px);
          animation: rv-lower 5.5s ease-in-out infinite;
        }
        .rv-rope {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          transform: scaleY(0.55);
          animation: rv-payout 5.5s ease-in-out infinite;
        }
        .rv-ripple-a, .rv-ripple-b {
          opacity: 0.6;
          animation: rv-flow 6s linear infinite;
        }
        .rv-ripple-b { animation-duration: 8s; animation-direction: reverse; }
        .rv-star-a, .rv-star-b, .rv-star-c {
          animation: rv-twinkle 3s ease-in-out infinite;
        }
        .rv-star-b { animation-delay: 1s; }
        .rv-star-c { animation-delay: 2s; }
        @keyframes rv-bob {
          0%, 100% { transform: translate(0, 0) rotate(-0.5deg); }
          50% { transform: translate(0, -3px) rotate(0.5deg); }
        }
        @keyframes rv-swing {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes rv-lower {
          0% { transform: translate(0, -24px); opacity: 0; }
          8% { transform: translate(0, -22px); opacity: 1; }
          62% { transform: translate(0, 0); opacity: 1; }
          86% { transform: translate(0, 0); opacity: 1; }
          94% { transform: translate(0, 0); opacity: 0; }
          100% { transform: translate(0, -24px); opacity: 0; }
        }
        @keyframes rv-payout {
          0% { transform: scaleY(0.1); opacity: 0; }
          8% { transform: scaleY(0.18); opacity: 1; }
          62% { transform: scaleY(1); opacity: 1; }
          86% { transform: scaleY(1); opacity: 1; }
          94% { transform: scaleY(1); opacity: 0; }
          100% { transform: scaleY(0.1); opacity: 0; }
        }
        @keyframes rv-flow {
          0% { transform: translate(-16px, 0); opacity: 0.25; }
          50% { opacity: 0.7; }
          100% { transform: translate(16px, 0); opacity: 0.25; }
        }
        @keyframes rv-twinkle {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .rv-boat, .rv-hammock, .rv-crate, .rv-rope,
          .rv-ripple-a, .rv-ripple-b,
          .rv-star-a, .rv-star-b, .rv-star-c { animation: none; }
        }
      `}</style>
    </svg>
  );
}
