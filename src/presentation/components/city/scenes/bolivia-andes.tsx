/**
 * アンデスの高峰に重ねる、稜線の雪煙とコンドル。
 *
 * ポトシの背後にそびえる山は、頂から絶えず雪を吹き飛ばされている。
 * 雪煙が風下へ尾を引き、その上をコンドルが一羽、ゆっくり横切る。
 * 背景の空・稜線・雪冠は静止画のものをそのまま使う。
 */
export function BoliviaAndes() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 山頂から風下へ流れる雪煙(背景の雪冠 70,42 と 210,30 から) */}
      <g fill="#f6efe2">
        <g transform="translate(74,44)">
          <path className="bolande-plume-a" d="M0,0 C14,-2.6 28,-3.4 44,-7 C30,-2 14,1.4 1,2.6z" opacity="0.32" />
        </g>
        <g transform="translate(74,48)">
          <path className="bolande-plume-b" d="M0,0 C11,-1.4 22,-1.4 34,-3.4 C22,0.6 11,2 1,2z" opacity="0.2" />
        </g>
        <g transform="translate(214,32)">
          <path className="bolande-plume-c" d="M0,0 C16,-3 32,-4 50,-8.4 C34,-2.4 16,1.6 1,3z" opacity="0.34" />
        </g>
        <g transform="translate(214,37)">
          <path className="bolande-plume-d" d="M0,0 C12,-1.4 24,-1.6 38,-4 C24,0.6 12,2 1,2z" opacity="0.2" />
        </g>
      </g>

      {/* 稜線をなでる薄い雲 */}
      <g fill="#dfe6f2">
        <g className="bolande-cloud-a" opacity="0.28">
          <ellipse cx="140" cy="84" rx="58" ry="4.6" />
          <ellipse cx="184" cy="88" rx="30" ry="3" />
        </g>
        <g className="bolande-cloud-b" opacity="0.2">
          <ellipse cx="290" cy="66" rx="44" ry="3.6" />
        </g>
      </g>

      {/* 舞い落ちる細かな雪 */}
      <g fill="#f6efe2">
        <circle className="bolande-flake-a" cx="96" cy="70" r="1.6" opacity="0.6" />
        <circle className="bolande-flake-b" cx="168" cy="56" r="1.3" opacity="0.5" />
        <circle className="bolande-flake-c" cx="242" cy="62" r="1.8" opacity="0.55" />
        <circle className="bolande-flake-d" cx="308" cy="86" r="1.4" opacity="0.45" />
        <circle className="bolande-flake-e" cx="52" cy="92" r="1.5" opacity="0.5" />
        <circle className="bolande-flake-f" cx="356" cy="72" r="1.2" opacity="0.42" />
      </g>

      {/* 谷を旋回するコンドル */}
      <g className="bolande-condor">
        <g fill="#241f30">
          <path className="bolande-wings" d="M-15,0 C-10,-6 -5,-6 0,-2 C5,-6 10,-6 15,0 C9,-2 4,-1 0,1 C-4,-1 -9,-2 -15,0z" />
          <ellipse cx="0" cy="-0.6" rx="2.6" ry="1.6" />
        </g>
        <g fill="#f6efe2" opacity="0.8">
          <path d="M-3.4,-2.4 h6.8 v1.4 h-6.8z" />
        </g>
      </g>

      <style>{`
        .bolande-plume-a, .bolande-plume-b, .bolande-plume-c, .bolande-plume-d {
          transform-box: fill-box;
          transform-origin: 0% 100%;
        }
        .bolande-plume-a { animation: bolande-spindrift 7.5s ease-out infinite; }
        .bolande-plume-b { animation: bolande-spindrift 9.2s ease-out infinite; animation-delay: -3.4s; }
        .bolande-plume-c { animation: bolande-spindrift 8.4s ease-out infinite; animation-delay: -1.8s; }
        .bolande-plume-d { animation: bolande-spindrift 10.6s ease-out infinite; animation-delay: -5.2s; }
        .bolande-cloud-a, .bolande-cloud-b {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .bolande-cloud-a { animation: bolande-drift 58s linear infinite; }
        .bolande-cloud-b { animation: bolande-drift 74s linear infinite; animation-delay: -26s; }
        .bolande-flake-a, .bolande-flake-b, .bolande-flake-c,
        .bolande-flake-d, .bolande-flake-e, .bolande-flake-f {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .bolande-flake-a { animation: bolande-fall 11s linear infinite; }
        .bolande-flake-b { animation: bolande-fall 14s linear infinite; animation-delay: -5s; }
        .bolande-flake-c { animation: bolande-fall 9.5s linear infinite; animation-delay: -7s; }
        .bolande-flake-d { animation: bolande-fall 13s linear infinite; animation-delay: -2.5s; }
        .bolande-flake-e { animation: bolande-fall 12s linear infinite; animation-delay: -8.5s; }
        .bolande-flake-f { animation: bolande-fall 15s linear infinite; animation-delay: -4s; }
        .bolande-condor {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          transform: translate(104px, 76px);
          animation: bolande-soar 30s ease-in-out infinite;
          animation-delay: -12s;
        }
        .bolande-wings {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: bolande-tilt 6s ease-in-out infinite;
        }
        @keyframes bolande-spindrift {
          0% { transform: translateX(0) scaleX(0.5); opacity: 0; }
          25% { opacity: 0.42; }
          100% { transform: translateX(40px) scaleX(1.35); opacity: 0; }
        }
        @keyframes bolande-drift {
          0% { transform: translateX(-260px); }
          100% { transform: translateX(300px); }
        }
        @keyframes bolande-fall {
          0% { transform: translate(0, -26px); opacity: 0; }
          20% { opacity: 0.55; }
          80% { opacity: 0.4; }
          100% { transform: translate(38px, 48px); opacity: 0; }
        }
        @keyframes bolande-soar {
          0% { transform: translate(-34px, 96px); }
          30% { transform: translate(120px, 70px); }
          62% { transform: translate(258px, 84px); }
          100% { transform: translate(436px, 60px); }
        }
        @keyframes bolande-tilt {
          0%, 100% { transform: scaleY(1) rotate(-3deg); }
          50% { transform: scaleY(0.8) rotate(3deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .bolande-plume-a, .bolande-plume-b, .bolande-plume-c, .bolande-plume-d,
          .bolande-cloud-a, .bolande-cloud-b,
          .bolande-flake-a, .bolande-flake-b, .bolande-flake-c,
          .bolande-flake-d, .bolande-flake-e, .bolande-flake-f,
          .bolande-condor, .bolande-wings { animation: none; }
        }
      `}</style>
    </svg>
  );
}
