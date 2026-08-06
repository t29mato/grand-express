/**
 * アルプス(シャモニー、アヌシーなど)に重ねる動き。
 *
 * 粉雪がゆっくり落ち、稜線からは風に飛ばされた雪煙が流れ、
 * 谷のシャレーの窓には暖炉の灯りが揺れて、屋根から薄い煙が立ちのぼる。
 * 山・ロープウェイ・松は静止画が描いているので、ここでは何も塗りつぶさない。
 */
export function FranceAlps() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 稜線から風下へ流れる雪煙(背景の峰 124,48 と 216,76 の頂の上) */}
      <g fill="#f8fbfd">
        <ellipse className="fralp-spindrift-a" cx="134" cy="46" rx="20" ry="3" opacity="0.5" />
        <ellipse className="fralp-spindrift-b" cx="228" cy="74" rx="16" ry="2.6" opacity="0.42" />
        <ellipse className="fralp-spindrift-c" cx="60" cy="64" rx="13" ry="2.2" opacity="0.38" />
      </g>

      {/* シャレーの屋根から立ちのぼる煙(屋根の頂は 284,110) */}
      <g fill="#e6ecef">
        <circle className="fralp-smoke fralp-s1" cx="300" cy="112" r="4" opacity="0.4" />
        <circle className="fralp-smoke fralp-s2" cx="300" cy="112" r="5" opacity="0.34" />
        <circle className="fralp-smoke fralp-s3" cx="300" cy="112" r="3.4" opacity="0.44" />
      </g>

      {/* 窓の灯り(静止画の窓 258,156 と 296,156 に重ねる) */}
      <g fill="#ffd98a">
        <rect className="fralp-glow-a" x="258" y="156" width="14" height="12" opacity="0.5" />
        <rect className="fralp-glow-b" x="296" y="156" width="14" height="12" opacity="0.42" />
      </g>

      {/* 降る粉雪 */}
      <g fill="#f8fbfd">
        <circle className="fralp-flake fralp-f1" cx="34" cy="0" r="1.8" opacity="0.85" />
        <circle className="fralp-flake fralp-f2" cx="88" cy="0" r="1.4" opacity="0.7" />
        <circle className="fralp-flake fralp-f3" cx="142" cy="0" r="2" opacity="0.8" />
        <circle className="fralp-flake fralp-f4" cx="196" cy="0" r="1.5" opacity="0.75" />
        <circle className="fralp-flake fralp-f5" cx="248" cy="0" r="1.9" opacity="0.8" />
        <circle className="fralp-flake fralp-f6" cx="304" cy="0" r="1.4" opacity="0.7" />
        <circle className="fralp-flake fralp-f7" cx="358" cy="0" r="1.8" opacity="0.8" />
        <circle className="fralp-flake fralp-f8" cx="62" cy="0" r="1.2" opacity="0.6" />
        <circle className="fralp-flake fralp-f9" cx="222" cy="0" r="1.2" opacity="0.6" />
        <circle className="fralp-flake fralp-f10" cx="330" cy="0" r="1.6" opacity="0.7" />
      </g>

      <style>{`
        .fralp-spindrift-a, .fralp-spindrift-b, .fralp-spindrift-c,
        .fralp-smoke, .fralp-glow-a, .fralp-glow-b, .fralp-flake {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .fralp-spindrift-a { animation: fralp-drift 13s ease-in-out infinite; }
        .fralp-spindrift-b { animation: fralp-drift 17s ease-in-out infinite; animation-delay: -6s; }
        .fralp-spindrift-c { animation: fralp-drift 15s ease-in-out infinite; animation-delay: -9s; }
        .fralp-smoke { animation: fralp-rise 9s linear infinite; }
        .fralp-s2 { animation-duration: 11s; animation-delay: -4s; }
        .fralp-s3 { animation-duration: 7.5s; animation-delay: -6s; }
        .fralp-glow-a { animation: fralp-lamp 6.5s ease-in-out infinite; }
        .fralp-glow-b { animation: fralp-lamp 8.2s ease-in-out infinite; animation-delay: -3s; }
        .fralp-flake { animation: fralp-fall 11s linear infinite; }
        .fralp-f1 { animation-duration: 13s; animation-delay: -2s; }
        .fralp-f2 { animation-duration: 16s; animation-delay: -7s; }
        .fralp-f3 { animation-duration: 12s; animation-delay: -11s; }
        .fralp-f4 { animation-duration: 15s; animation-delay: -4s; }
        .fralp-f5 { animation-duration: 10.5s; animation-delay: -9s; }
        .fralp-f6 { animation-duration: 17s; animation-delay: -13s; }
        .fralp-f7 { animation-duration: 12.5s; animation-delay: -6s; }
        .fralp-f8 { animation-duration: 18s; animation-delay: -15s; }
        .fralp-f9 { animation-duration: 14s; animation-delay: -3s; }
        .fralp-f10 { animation-duration: 11.5s; animation-delay: -8s; }
        @keyframes fralp-drift {
          0%, 100% { transform: translateX(0) scaleX(1); opacity: 0.18; }
          50% { transform: translateX(16px) scaleX(1.5); opacity: 0.5; }
        }
        @keyframes fralp-rise {
          0% { transform: translate(0, 0) scale(0.4); opacity: 0; }
          25% { opacity: 0.38; }
          100% { transform: translate(-16px, -46px) scale(1.8); opacity: 0; }
        }
        @keyframes fralp-lamp {
          0%, 100% { opacity: 0.24; }
          50% { opacity: 0.62; }
        }
        @keyframes fralp-fall {
          0% { transform: translate(0, -6px); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.7; }
          100% { transform: translate(-22px, 216px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .fralp-spindrift-a, .fralp-spindrift-b, .fralp-spindrift-c,
          .fralp-smoke, .fralp-glow-a, .fralp-glow-b, .fralp-flake { animation: none; }
        }
      `}</style>
    </svg>
  );
}
