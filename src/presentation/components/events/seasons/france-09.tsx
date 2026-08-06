/**
 * 1月・王様のガレット。
 *
 * その月、パン屋はほとんどこれしか売らない。切り分けられたガレットの
 * 一切れが持ち上がり、焼き込まれた小さな陶器が光る。卓の上には紙の王冠。
 * いちばん年下の者が卓の下に潜り、どの一切れが誰のものかを言う。
 */
export function France09() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 冬の室内。窓の外は白い */}
      <rect width="400" height="210" fill="#8a5f4a" />
      <rect y="0" width="400" height="112" fill="#a8735a" />
      <rect y="106" width="400" height="8" fill="#7a5240" />

      {/* 窓 */}
      <g transform="translate(322,58)">
        <rect x="-44" y="-40" width="88" height="76" rx="3" fill="#cfe0ea" />
        <rect x="-44" y="-40" width="88" height="76" rx="3" fill="none" stroke="#6b4636" strokeWidth="5" />
        <path d="M0,-40 v76 M-44,-2 h88" stroke="#6b4636" strokeWidth="4" />
        <g fill="#f2f6fa">
          <circle className="f09-flake" cx="-24" cy="-24" r="2.4" />
          <circle className="f09-flake f09-f2" cx="20" cy="-30" r="2.2" />
          <circle className="f09-flake f09-f3" cx="-14" cy="8" r="2.4" />
          <circle className="f09-flake f09-f4" cx="26" cy="4" r="2.2" />
        </g>
      </g>

      {/* 壁の灯り */}
      <g transform="translate(70,44)">
        <rect x="-3" y="-20" width="6" height="20" fill="#6b4636" />
        <path d="M-18,0 L18,0 L12,22 L-12,22z" fill="#f2c86a" />
        <ellipse className="f09-lamp" cx="0" cy="22" rx="30" ry="9" fill="#f5d98c" opacity="0.4" />
      </g>

      {/* 卓 */}
      <rect y="114" width="400" height="96" fill="#7a5240" />
      <g transform="translate(200,150)">
        <rect x="-190" y="-8" width="380" height="16" rx="3" fill="#b8896a" />
        {/* 卓布。真ん中だけ、子どもが潜るために左右へめくってある */}
        <path d="M-150,8 L-78,8 L-70,52 L-150,52z" fill="#f4f1e8" />
        <path d="M-12,8 L150,8 L150,52 L-4,52z" fill="#f4f1e8" />
        {/* めくった内側の暗がり */}
        <path d="M-78,8 L-12,8 L-4,52 L-70,52z" fill="#40291c" />
        {/* 布の縁 */}
        <path d="M-150,8 L-78,8 L-78,15 L-150,15z" fill="#e0dbcd" />
        <path d="M-12,8 L150,8 L150,15 L-12,15z" fill="#e0dbcd" />
        <path d="M-78,8 L-70,52 L-86,50z" fill="#fdfbf4" />
        <path d="M-12,8 L-4,52 L12,50z" fill="#fdfbf4" />
      </g>

      {/* 卓の下からのぞく、いちばん年下の子 */}
      <g transform="translate(155,193)">
        <g className="f09-child">
          <circle cx="0" cy="-18" r="15" fill="#f6efe2" />
          <path d="M-15,-20 q15,-15 30,-2 q-4,-14 -16,-14 q-13,0 -14,16z" fill="#5a3a22" />
          <path className="f09-point" d="M13,-14 q9,-3 11,-10" stroke="#f6efe2" strokeWidth="6" strokeLinecap="round" fill="none" />
        </g>
      </g>

      {/* ガレット。切り分けてある */}
      <g transform="translate(252,126)">
        <ellipse cx="0" cy="4" rx="62" ry="17" fill="#e6dfd0" />
        <ellipse cx="0" cy="0" rx="58" ry="15" fill="#d9a349" />
        <ellipse cx="0" cy="-3" rx="58" ry="15" fill="#e8b95c" />
        {/* 焼き目の筋 */}
        <g stroke="#c48c2e" strokeWidth="2" fill="none" strokeLinecap="round">
          <path d="M-40,-6 q10,-6 22,-2 M-6,-9 q12,-5 22,0 M20,-6 q10,-5 20,-1" />
        </g>
        {/* 切れ目 */}
        <g stroke="#c48c2e" strokeWidth="2">
          <path d="M0,-3 L-42,-9 M0,-3 L42,-9 M0,-3 L-24,8 M0,-3 L26,8" />
        </g>
        {/* 持ち上がる一切れ。中の陶器が光る */}
        <g className="f09-slice">
          <path d="M0,-3 L-44,-10 q-14,6 -2,13 L0,-3z" fill="#e8b95c" />
          <path d="M0,-3 L-44,-10 q-14,6 -2,13 L0,-3z" fill="none" stroke="#c48c2e" strokeWidth="2" />
          <g className="f09-feve">
            <circle cx="-24" cy="0" r="6" fill="#fdfbf4" />
            <circle cx="-24" cy="0" r="2.8" fill="#c9d8e4" />
          </g>
        </g>
      </g>

      {/* 紙の王冠 */}
      <g transform="translate(112,140)">
        <g className="f09-crown">
          <path d="M-26,4 L-26,-10 L-16,-2 L-8,-16 L0,-2 L8,-16 L16,-2 L26,-10 L26,4z" fill="#f5b31c" />
          <rect x="-26" y="0" width="52" height="6" rx="2" fill="#d99a10" />
          <circle cx="-8" cy="-18" r="2.6" fill="#e8443f" />
          <circle cx="8" cy="-18" r="2.6" fill="#5b8fe8" />
        </g>
      </g>

      {/* 皿と切り分け用のナイフ */}
      <g transform="translate(340,152)">
        <ellipse cx="0" cy="0" rx="26" ry="7" fill="#f4f1e8" />
        <ellipse cx="0" cy="-2" rx="20" ry="5" fill="#e0dbcd" />
      </g>

      <style>{`
        .f09-lamp { animation: f09-flicker 5s ease-in-out infinite; }
        .f09-flake {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: f09-drift 6s linear infinite backwards;
        }
        .f09-f2 { animation-delay: 1.5s; animation-duration: 7s; }
        .f09-f3 { animation-delay: 3s; animation-duration: 5.4s; }
        .f09-f4 { animation-delay: 4.5s; animation-duration: 6.6s; }
        .f09-child {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: f09-peek 6s ease-in-out infinite;
        }
        .f09-point {
          transform-box: fill-box; transform-origin: 0 100%;
          animation: f09-call 6s ease-in-out infinite;
        }
        .f09-slice {
          transform-box: fill-box; transform-origin: 100% 100%;
          animation: f09-serve 6s ease-in-out infinite;
        }
        .f09-feve { animation: f09-shine 6s ease-in-out infinite; }
        .f09-crown {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: f09-tilt 6s ease-in-out infinite;
        }
        @keyframes f09-flicker {
          0%, 100% { opacity: 0.28; }
          50% { opacity: 0.5; }
        }
        @keyframes f09-drift {
          0% { transform: translate(6px, -18px); opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { transform: translate(-10px, 46px); opacity: 0; }
        }
        @keyframes f09-peek {
          0%, 26% { transform: translateY(16px); }
          46%, 70% { transform: translateY(0); }
          92%, 100% { transform: translateY(16px); }
        }
        @keyframes f09-call {
          0%, 46% { transform: rotate(24deg); }
          58% { transform: rotate(-8deg); }
          70%, 100% { transform: rotate(24deg); }
        }
        @keyframes f09-serve {
          0%, 40% { transform: translate(0, 0) rotate(0deg); }
          62% { transform: translate(-10px, -22px) rotate(-9deg); }
          82% { transform: translate(-10px, -22px) rotate(-9deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        @keyframes f09-shine {
          0%, 58% { opacity: 0.35; }
          70% { opacity: 1; }
          84% { opacity: 0.6; }
          100% { opacity: 0.35; }
        }
        @keyframes f09-tilt {
          0%, 100% { transform: rotate(-4deg); }
          50% { transform: rotate(4deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .f09-lamp, .f09-flake, .f09-child, .f09-point,
          .f09-slice, .f09-feve, .f09-crown { animation: none; }
        }
      `}</style>
    </svg>
  );
}
