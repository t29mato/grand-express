/**
 * 首都(パリ)に重ねる動き。
 *
 * オスマン様式の窓に灯りがともり、エッフェル塔の頂の標識灯が明滅し、
 * 大通りを車のライトが流れて、屋根の上を薄い雲がわたっていく。
 * 建物・塔・並木は静止画が描いているので、ここでは何も塗りつぶさない。
 */
export function FranceCapital() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 流れる薄雲(静止画の雲 72,30 / 232,22 とは別の高さに置く) */}
      <g fill="#f6efe2">
        <g className="frcap-cloud-a" opacity="0.36">
          <ellipse cx="140" cy="46" rx="22" ry="5.4" />
          <ellipse cx="126" cy="49" rx="13" ry="3.6" />
          <ellipse cx="154" cy="49" rx="14" ry="3.6" />
        </g>
        <g className="frcap-cloud-b" opacity="0.28">
          <ellipse cx="300" cy="16" rx="17" ry="4" />
          <ellipse cx="290" cy="18" rx="10" ry="2.8" />
        </g>
      </g>

      {/* エッフェル塔の頂(300,27)の標識灯 */}
      <circle className="frcap-beacon" cx="300" cy="27" r="3.4" fill="#f5d06a" opacity="0.7" />

      {/* 窓の灯り(静止画の窓 9x12 の矩形に重ねる) */}
      <g fill="#ffd98a">
        <rect className="frcap-win frcap-a" x="7" y="105" width="9" height="12" opacity="0.5" />
        <rect className="frcap-win frcap-b" x="51.7" y="105" width="9" height="12" opacity="0.5" />
        <rect className="frcap-win frcap-c" x="101" y="97" width="9" height="12" opacity="0.5" />
        <rect className="frcap-win frcap-d" x="154" y="97" width="9" height="12" opacity="0.5" />
        <rect className="frcap-win frcap-e" x="127.5" y="115" width="9" height="12" opacity="0.5" />
        <rect className="frcap-win frcap-f" x="181" y="109" width="9" height="12" opacity="0.5" />
        <rect className="frcap-win frcap-g" x="232" y="109" width="9" height="12" opacity="0.5" />
        <rect className="frcap-win frcap-h" x="351" y="113" width="9" height="12" opacity="0.5" />
        <rect className="frcap-win frcap-i" x="388" y="113" width="9" height="12" opacity="0.5" />
      </g>

      {/* 大通りを流れる車のライト(車道は y=168〜210、中央線は y=189) */}
      <g strokeLinecap="round" fill="none">
        <path className="frcap-car frcap-r1" d="M0,180h16" stroke="#ffe6a8" strokeWidth="3.4" opacity="0.75" />
        <path className="frcap-car frcap-r2" d="M0,180h12" stroke="#ffe6a8" strokeWidth="3" opacity="0.6" />
        <path className="frcap-car frcap-l1" d="M0,200h16" stroke="#f0938a" strokeWidth="3.4" opacity="0.7" />
        <path className="frcap-car frcap-l2" d="M0,200h12" stroke="#f0938a" strokeWidth="3" opacity="0.55" />
      </g>

      {/* 屋根の上のハト */}
      <g transform="translate(210,66)">
        <g className="frcap-bird">
          <path
            className="frcap-flap"
            d="M-7,0 Q-3.5,-4.6 0,-0.7 Q3.5,-4.6 7,0"
            fill="none"
            stroke="#e8e2d4"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </g>
      </g>

      <style>{`
        .frcap-cloud-a, .frcap-cloud-b, .frcap-beacon, .frcap-win,
        .frcap-car, .frcap-flap {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .frcap-cloud-a { animation: frcap-drift 78s linear infinite; }
        .frcap-cloud-b { animation: frcap-drift 96s linear infinite; animation-delay: -40s; }
        .frcap-beacon { animation: frcap-beacon 3.4s ease-in-out infinite; }
        .frcap-win { animation: frcap-lamp 7s ease-in-out infinite; }
        .frcap-a { animation-duration: 6.2s; animation-delay: -1s; }
        .frcap-b { animation-duration: 8.4s; animation-delay: -3s; }
        .frcap-c { animation-duration: 7.6s; animation-delay: -5s; }
        .frcap-d { animation-duration: 9.2s; animation-delay: -2s; }
        .frcap-e { animation-duration: 6.8s; animation-delay: -6s; }
        .frcap-f { animation-duration: 8s; animation-delay: -4s; }
        .frcap-g { animation-duration: 7.2s; animation-delay: -7s; }
        .frcap-h { animation-duration: 9.6s; animation-delay: -2.5s; }
        .frcap-i { animation-duration: 6.5s; animation-delay: -5.5s; }
        .frcap-car { transform-origin: 0% 50%; }
        .frcap-r1 { animation: frcap-right 6.5s linear infinite; }
        .frcap-r2 { animation: frcap-right 9s linear infinite; animation-delay: -4s; }
        .frcap-l1 { animation: frcap-left 7.5s linear infinite; animation-delay: -2s; }
        .frcap-l2 { animation: frcap-left 10.5s linear infinite; animation-delay: -6s; }
        .frcap-bird { animation: frcap-cross 30s linear infinite; animation-delay: -11s; }
        .frcap-flap { transform-origin: 50% 100%; animation: frcap-flap 1.7s ease-in-out infinite; }
        @keyframes frcap-drift {
          0% { transform: translateX(-190px); }
          100% { transform: translateX(430px); }
        }
        @keyframes frcap-beacon {
          0%, 82%, 100% { opacity: 0.15; transform: scale(0.7); }
          90% { opacity: 0.95; transform: scale(1.3); }
        }
        @keyframes frcap-lamp {
          0%, 100% { opacity: 0.18; }
          50% { opacity: 0.6; }
        }
        @keyframes frcap-right {
          0% { transform: translateX(-30px); opacity: 0; }
          12%, 88% { opacity: 0.75; }
          100% { transform: translateX(420px); opacity: 0; }
        }
        @keyframes frcap-left {
          0% { transform: translateX(420px); opacity: 0; }
          12%, 88% { opacity: 0.7; }
          100% { transform: translateX(-30px); opacity: 0; }
        }
        @keyframes frcap-cross {
          0% { transform: translate(-230px, 8px); }
          100% { transform: translate(210px, -10px); }
        }
        @keyframes frcap-flap {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1.4); }
        }
        @media (prefers-reduced-motion: reduce) {
          .frcap-cloud-a, .frcap-cloud-b, .frcap-beacon, .frcap-win,
          .frcap-car, .frcap-bird, .frcap-flap { animation: none; }
        }
      `}</style>
    </svg>
  );
}
