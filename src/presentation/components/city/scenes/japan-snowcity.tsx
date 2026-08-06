/**
 * 雪の街(札幌など)に重ねる動き。
 *
 * ぼたん雪がゆっくり降りつづけ、二棟の屋根からは暖房の湯気が立ちのぼる。
 * 空・雪原・ビルは静止画が描いているので、ここでは何も塗りつぶさない。
 */
export function JapanSnowcity() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 屋根から立ちのぼる湯気(左のビル) */}
      <g transform="translate(69,106)">
        <g fill="#ffffff" opacity="0.78">
          <ellipse className="jsc-steam jsc-steam-a" cx="0" cy="0" rx="6" ry="4" />
          <ellipse className="jsc-steam jsc-steam-b" cx="-4" cy="-12" rx="7.5" ry="5" />
          <ellipse className="jsc-steam jsc-steam-c" cx="-9" cy="-24" rx="9" ry="5.8" />
        </g>
      </g>

      {/* 屋根から立ちのぼる湯気(右のビル) */}
      <g transform="translate(299,101)">
        <g fill="#ffffff" opacity="0.68">
          <ellipse className="jsc-steam jsc-steam-b" cx="0" cy="0" rx="5.4" ry="3.6" />
          <ellipse className="jsc-steam jsc-steam-c" cx="-4" cy="-11" rx="6.8" ry="4.5" />
          <ellipse className="jsc-steam jsc-steam-a" cx="-8" cy="-22" rx="8" ry="5.2" />
        </g>
      </g>

      {/* 降りしきる雪 */}
      <g fill="#ffffff">
        <circle className="jsc-flake jsc-f1" cx="24" cy="30" r="2.4" opacity="0.85" />
        <circle className="jsc-flake jsc-f2" cx="72" cy="96" r="1.8" opacity="0.7" />
        <circle className="jsc-flake jsc-f3" cx="118" cy="16" r="2.6" opacity="0.8" />
        <circle className="jsc-flake jsc-f4" cx="146" cy="142" r="1.6" opacity="0.6" />
        <circle className="jsc-flake jsc-f5" cx="186" cy="62" r="2.2" opacity="0.75" />
        <circle className="jsc-flake jsc-f6" cx="212" cy="176" r="1.9" opacity="0.65" />
        <circle className="jsc-flake jsc-f7" cx="248" cy="34" r="2.5" opacity="0.85" />
        <circle className="jsc-flake jsc-f8" cx="286" cy="120" r="1.7" opacity="0.6" />
        <circle className="jsc-flake jsc-f9" cx="322" cy="72" r="2.3" opacity="0.8" />
        <circle className="jsc-flake jsc-f10" cx="358" cy="150" r="2" opacity="0.7" />
        <circle className="jsc-flake jsc-f11" cx="392" cy="42" r="2.4" opacity="0.8" />
        <circle className="jsc-flake jsc-f12" cx="52" cy="188" r="2.1" opacity="0.65" />
        <circle className="jsc-flake jsc-f13" cx="96" cy="58" r="1.5" opacity="0.55" />
        <circle className="jsc-flake jsc-f14" cx="168" cy="104" r="2.2" opacity="0.7" />
        <circle className="jsc-flake jsc-f15" cx="266" cy="196" r="2.6" opacity="0.8" />
        <circle className="jsc-flake jsc-f16" cx="338" cy="12" r="1.8" opacity="0.6" />
      </g>

      <style>{`
        .jsc-flake {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: jsc-fall 17s linear infinite;
        }
        .jsc-f2 { animation-duration: 21s; animation-delay: -3s; }
        .jsc-f3 { animation-duration: 15s; animation-delay: -9s; }
        .jsc-f4 { animation-duration: 24s; animation-delay: -6s; }
        .jsc-f5 { animation-duration: 19s; animation-delay: -13s; }
        .jsc-f6 { animation-duration: 22s; animation-delay: -2s; }
        .jsc-f7 { animation-duration: 16s; animation-delay: -11s; }
        .jsc-f8 { animation-duration: 25s; animation-delay: -17s; }
        .jsc-f9 { animation-duration: 18s; animation-delay: -5s; }
        .jsc-f10 { animation-duration: 20s; animation-delay: -14s; }
        .jsc-f11 { animation-duration: 23s; animation-delay: -8s; }
        .jsc-f12 { animation-duration: 17s; animation-delay: -15s; }
        .jsc-f13 { animation-duration: 26s; animation-delay: -4s; }
        .jsc-f14 { animation-duration: 19s; animation-delay: -18s; }
        .jsc-f15 { animation-duration: 21s; animation-delay: -10s; }
        .jsc-f16 { animation-duration: 24s; animation-delay: -20s; }
        .jsc-steam {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: jsc-rise 7s ease-out infinite;
        }
        .jsc-steam-b { animation-delay: -2.4s; }
        .jsc-steam-c { animation-delay: -4.8s; }
        @keyframes jsc-fall {
          0% { transform: translate(6px, -110px); }
          50% { transform: translate(-6px, 0); }
          100% { transform: translate(6px, 110px); }
        }
        @keyframes jsc-rise {
          0% { transform: translate(0, 14px) scale(0.5); opacity: 0; }
          35% { opacity: 1; }
          100% { transform: translate(-14px, -26px) scale(1.6); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .jsc-flake, .jsc-steam { animation: none; }
        }
      `}</style>
    </svg>
  );
}
