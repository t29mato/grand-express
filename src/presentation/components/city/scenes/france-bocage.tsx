/**
 * ボカージュ(ノルマンディー、ブルターニュの生垣の農地)に重ねる動き。
 *
 * 生垣の上を雲の影がわたり、りんごの実が枝から落ち、
 * 牛が尻尾を振って、モンシロチョウが牧草の上を舞う。
 * 生垣・農家・牛は静止画が描いているので、ここでは何も塗りつぶさない。
 */
export function FranceBocage() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 牧草地をわたる雲の影 */}
      <g fill="#4a5f3a">
        <ellipse className="frboc-shade-a" cx="140" cy="142" rx="60" ry="9" opacity="0.13" />
        <ellipse className="frboc-shade-b" cx="290" cy="176" rx="76" ry="11" opacity="0.1" />
      </g>

      {/* 流れる雲 */}
      <g fill="#f6efe2">
        <g className="frboc-cloud" opacity="0.3">
          <ellipse cx="200" cy="52" rx="19" ry="4.8" />
          <ellipse cx="188" cy="54" rx="11" ry="3.2" />
          <ellipse cx="212" cy="54" rx="12" ry="3.2" />
        </g>
      </g>

      {/* 揺れるりんごの木の実(静止画の実の位置に重ねる) */}
      <g fill="#e8443f">
        <circle className="frboc-apple frboc-a1" cx="142.8" cy="114.8" r="2.4" opacity="0.9" />
        <circle className="frboc-apple frboc-a2" cx="158" cy="121.2" r="2.4" opacity="0.9" />
        <circle className="frboc-apple frboc-a3" cx="190.2" cy="125.4" r="2.4" opacity="0.9" />
        <circle className="frboc-apple frboc-a4" cx="245.5" cy="121" r="2.4" opacity="0.9" />
        <circle className="frboc-apple frboc-a5" cx="355" cy="126.8" r="2.4" opacity="0.9" />
      </g>

      {/* 枝から落ちるりんご */}
      <g fill="#e8443f">
        <circle className="frboc-drop frboc-d1" cx="150" cy="128" r="2.2" opacity="0.85" />
        <circle className="frboc-drop frboc-d2" cx="238" cy="130" r="2.2" opacity="0.8" />
      </g>

      {/* 牛(196〜272)の尻尾 */}
      <path
        className="frboc-tail"
        d="M196,162c-6,-2 -9,2 -7,8c1,4 4,5 6,3z"
        fill="#f6efe2"
      />

      {/* 牧草の上のモンシロチョウ */}
      <g transform="translate(110,168)">
        <g className="frboc-fly-a">
          <path className="frboc-wing-a" d="M-3,0q3,-4 3,0q0,-4 3,0q-3,3 -3,0q0,3 -3,0z" fill="#f6efe2" opacity="0.9" />
        </g>
      </g>
      <g transform="translate(320,190)">
        <g className="frboc-fly-b">
          <path className="frboc-wing-b" d="M-2.6,0q2.6,-3.4 2.6,0q0,-3.4 2.6,0q-2.6,2.6 -2.6,0q0,2.6 -2.6,0z" fill="#f6efe2" opacity="0.85" />
        </g>
      </g>

      <style>{`
        .frboc-shade-a, .frboc-shade-b, .frboc-cloud,
        .frboc-apple, .frboc-drop, .frboc-tail,
        .frboc-wing-a, .frboc-wing-b {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .frboc-shade-a { animation: frboc-sweep 52s linear infinite; }
        .frboc-shade-b { animation: frboc-sweep 68s linear infinite; animation-delay: -30s; }
        .frboc-cloud { animation: frboc-drift 84s linear infinite; }
        .frboc-apple { transform-origin: 50% 0%; animation: frboc-swing 4.4s ease-in-out infinite; }
        .frboc-a2 { animation-duration: 5.2s; animation-delay: -1.4s; }
        .frboc-a3 { animation-duration: 4s; animation-delay: -2.6s; }
        .frboc-a4 { animation-duration: 5.6s; animation-delay: -0.9s; }
        .frboc-a5 { animation-duration: 4.8s; animation-delay: -3.2s; }
        .frboc-drop { animation: frboc-fall 13s ease-in infinite; }
        .frboc-d2 { animation-duration: 17s; animation-delay: -8s; }
        .frboc-tail { transform-origin: 100% 0%; animation: frboc-swish 3.6s ease-in-out infinite; }
        .frboc-fly-a { animation: frboc-flit-a 18s ease-in-out infinite; }
        .frboc-fly-b { animation: frboc-flit-b 23s ease-in-out infinite; animation-delay: -8s; }
        .frboc-wing-a { animation: frboc-wing 0.42s ease-in-out infinite; }
        .frboc-wing-b { animation: frboc-wing 0.52s ease-in-out infinite; }
        @keyframes frboc-sweep {
          0% { transform: translateX(-260px) scaleX(0.85); }
          100% { transform: translateX(300px) scaleX(1.15); }
        }
        @keyframes frboc-drift {
          0% { transform: translateX(-260px); }
          100% { transform: translateX(420px); }
        }
        @keyframes frboc-swing {
          0%, 100% { transform: rotate(-6deg); }
          50% { transform: rotate(6deg); }
        }
        @keyframes frboc-fall {
          0%, 62% { transform: translateY(0); opacity: 0; }
          64% { opacity: 0.9; }
          96% { transform: translateY(46px); opacity: 0.9; }
          100% { transform: translateY(48px); opacity: 0; }
        }
        @keyframes frboc-swish {
          0%, 100% { transform: rotate(-9deg); }
          50% { transform: rotate(9deg); }
        }
        @keyframes frboc-flit-a {
          0%, 100% { transform: translate(-60px, 6px); }
          25% { transform: translate(-14px, -14px); }
          50% { transform: translate(36px, 8px); }
          75% { transform: translate(84px, -10px); }
        }
        @keyframes frboc-flit-b {
          0%, 100% { transform: translate(40px, -8px); }
          30% { transform: translate(-16px, 8px); }
          60% { transform: translate(-70px, -6px); }
        }
        @keyframes frboc-wing {
          0%, 100% { transform: scaleX(1); }
          50% { transform: scaleX(0.4); }
        }
        @media (prefers-reduced-motion: reduce) {
          .frboc-shade-a, .frboc-shade-b, .frboc-cloud,
          .frboc-apple, .frboc-drop, .frboc-tail,
          .frboc-fly-a, .frboc-fly-b, .frboc-wing-a, .frboc-wing-b { animation: none; }
        }
      `}</style>
    </svg>
  );
}
