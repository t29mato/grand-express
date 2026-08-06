/**
 * ぶどう畑(ボルドー、ブルゴーニュ、シャンパーニュなど)に重ねる動き。
 *
 * 畝の葉が風にそろってひるがえり、畑の上を雲の影が走り、
 * 実った房が重みで揺れて、収穫前の空気が陽に温まってゆらぐ。
 * 畝・農家・空は静止画が描いているので、ここでは何も塗りつぶさない。
 */
export function FranceVineyard() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 太陽(322,34)の光の脈 */}
      <circle className="frvin-sun" cx="322" cy="34" r="22" fill="#ffe9a8" opacity="0.18" />

      {/* 畑の上を走る雲の影 */}
      <g fill="#6b5a3a">
        <ellipse className="frvin-shade-a" cx="150" cy="136" rx="66" ry="9" opacity="0.13" />
        <ellipse className="frvin-shade-b" cx="300" cy="176" rx="84" ry="11" opacity="0.1" />
      </g>

      {/* 流れる雲 */}
      <g fill="#f6efe2">
        <g className="frvin-cloud" opacity="0.3">
          <ellipse cx="210" cy="48" rx="18" ry="4.6" />
          <ellipse cx="199" cy="50" rx="11" ry="3.2" />
          <ellipse cx="221" cy="50" rx="12" ry="3.2" />
        </g>
      </g>

      {/* 畝の葉がひるがえる(緑の小片を畝の列に沿って置く) */}
      <g fill="#5f8f4a">
        <ellipse className="frvin-leaf frvin-r1" cx="46" cy="115" rx="5" ry="2.6" opacity="0.55" />
        <ellipse className="frvin-leaf frvin-r2" cx="128" cy="117" rx="5.4" ry="2.8" opacity="0.5" />
        <ellipse className="frvin-leaf frvin-r3" cx="212" cy="114" rx="5" ry="2.6" opacity="0.55" />
        <ellipse className="frvin-leaf frvin-r4" cx="86" cy="146" rx="6.4" ry="3.2" opacity="0.5" />
        <ellipse className="frvin-leaf frvin-r5" cx="196" cy="149" rx="6.8" ry="3.4" opacity="0.45" />
        <ellipse className="frvin-leaf frvin-r6" cx="306" cy="146" rx="6.4" ry="3.2" opacity="0.5" />
        <ellipse className="frvin-leaf frvin-r7" cx="60" cy="184" rx="8" ry="4" opacity="0.45" />
        <ellipse className="frvin-leaf frvin-r8" cx="242" cy="188" rx="8.4" ry="4.2" opacity="0.42" />
      </g>

      {/* 重みで揺れる房 */}
      <g fill="#6f4f8f">
        <g className="frvin-bunch frvin-c1">
          <circle cx="11.4" cy="172.4" r="2.6" opacity="0.85" />
          <circle cx="16.6" cy="172.4" r="2.6" opacity="0.85" />
          <circle cx="14" cy="176.3" r="2.6" opacity="0.85" />
        </g>
        <g className="frvin-bunch frvin-c2">
          <circle cx="270" cy="196" r="2.4" opacity="0.8" />
          <circle cx="275" cy="196" r="2.4" opacity="0.8" />
          <circle cx="272.5" cy="199.6" r="2.4" opacity="0.8" />
        </g>
      </g>

      {/* 陽に温まった空気のゆらぎ */}
      <g fill="#f2e6c4">
        <ellipse className="frvin-heat-a" cx="200" cy="104" rx="110" ry="4" opacity="0.22" />
        <ellipse className="frvin-heat-b" cx="120" cy="126" rx="80" ry="3.4" opacity="0.16" />
      </g>

      <style>{`
        .frvin-sun, .frvin-shade-a, .frvin-shade-b, .frvin-cloud,
        .frvin-leaf, .frvin-bunch, .frvin-heat-a, .frvin-heat-b {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .frvin-sun { animation: frvin-pulse 9.5s ease-in-out infinite; }
        .frvin-shade-a { animation: frvin-sweep 48s linear infinite; }
        .frvin-shade-b { animation: frvin-sweep 64s linear infinite; animation-delay: -28s; }
        .frvin-cloud { animation: frvin-drift 88s linear infinite; }
        .frvin-leaf { animation: frvin-flip 5.4s ease-in-out infinite; }
        .frvin-r2 { animation-duration: 6.2s; animation-delay: -1.4s; }
        .frvin-r3 { animation-duration: 4.8s; animation-delay: -2.7s; }
        .frvin-r4 { animation-duration: 5.8s; animation-delay: -0.9s; }
        .frvin-r5 { animation-duration: 6.6s; animation-delay: -3.4s; }
        .frvin-r6 { animation-duration: 5.1s; animation-delay: -2s; }
        .frvin-r7 { animation-duration: 6s; animation-delay: -4.2s; }
        .frvin-r8 { animation-duration: 5.5s; animation-delay: -1.1s; }
        .frvin-bunch { transform-origin: 50% 0%; animation: frvin-swing 4.6s ease-in-out infinite; }
        .frvin-c2 { animation-duration: 5.4s; animation-delay: -2.2s; }
        .frvin-heat-a { animation: frvin-heat 8s ease-in-out infinite; }
        .frvin-heat-b { animation: frvin-heat 10s ease-in-out infinite; animation-delay: -4s; }
        @keyframes frvin-pulse {
          0%, 100% { transform: scale(0.84); opacity: 0.11; }
          50% { transform: scale(1.18); opacity: 0.28; }
        }
        @keyframes frvin-sweep {
          0% { transform: translateX(-280px) scaleX(0.85); }
          100% { transform: translateX(300px) scaleX(1.15); }
        }
        @keyframes frvin-drift {
          0% { transform: translateX(-240px); }
          100% { transform: translateX(430px); }
        }
        @keyframes frvin-flip {
          0%, 100% { transform: scaleY(1) rotate(0deg); opacity: 0.3; }
          50% { transform: scaleY(0.35) rotate(-12deg); opacity: 0.6; }
        }
        @keyframes frvin-swing {
          0%, 100% { transform: rotate(-7deg); }
          50% { transform: rotate(7deg); }
        }
        @keyframes frvin-heat {
          0%, 100% { transform: scaleY(1) translateY(0); opacity: 0.12; }
          50% { transform: scaleY(1.9) translateY(-2px); opacity: 0.28; }
        }
        @media (prefers-reduced-motion: reduce) {
          .frvin-sun, .frvin-shade-a, .frvin-shade-b, .frvin-cloud,
          .frvin-leaf, .frvin-bunch, .frvin-heat-a, .frvin-heat-b { animation: none; }
        }
      `}</style>
    </svg>
  );
}
