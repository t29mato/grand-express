/**
 * 遺跡(アテネ、ローマ、ルクソールなど)に重ねる動き。
 *
 * 石畳から陽炎が立ち、柱のあいだをツバメが抜けていき、
 * 乾いた草が風になびいて、大理石に日が当たっては翳る。
 * 神殿・石・糸杉は静止画が描いているので、ここでは何も塗りつぶさない。
 */
export function WorldRuins() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 大理石に差す日(柱 78/118/158/198/238 に順に当たる) */}
      <g fill="#fff6dc">
        <rect className="wrui-lit wrui-c1" x="78" y="70" width="18" height="68" rx="2" opacity="0.3" />
        <rect className="wrui-lit wrui-c2" x="118" y="70" width="18" height="68" rx="2" opacity="0.3" />
        <rect className="wrui-lit wrui-c3" x="158" y="70" width="18" height="68" rx="2" opacity="0.3" />
        <rect className="wrui-lit wrui-c4" x="198" y="70" width="18" height="68" rx="2" opacity="0.3" />
        <rect className="wrui-lit wrui-c5" x="238" y="70" width="18" height="68" rx="2" opacity="0.3" />
      </g>

      {/* 石畳の陽炎 */}
      <g fill="#dce8dc">
        <ellipse className="wrui-heat-a" cx="200" cy="132" rx="150" ry="3.6" opacity="0.26" />
        <ellipse className="wrui-heat-b" cx="130" cy="160" rx="110" ry="3" opacity="0.2" />
      </g>

      {/* 舞う土ぼこり */}
      <g fill="#c9b98c">
        <ellipse className="wrui-dust wrui-u1" cx="120" cy="182" rx="36" ry="3.4" opacity="0.34" />
        <ellipse className="wrui-dust wrui-u2" cx="290" cy="196" rx="44" ry="3.8" opacity="0.28" />
      </g>

      {/* 流れる雲 */}
      <g fill="#f6efe2">
        <g className="wrui-cloud" opacity="0.3">
          <ellipse cx="230" cy="20" rx="17" ry="4.4" />
          <ellipse cx="219" cy="22" rx="10" ry="3" />
          <ellipse cx="241" cy="22" rx="11" ry="3" />
        </g>
      </g>

      {/* 柱のあいだを抜けるツバメ */}
      <g transform="translate(180,100)">
        <g className="wrui-swift-a">
          <path className="wrui-flap-a" d="M-6.5,0 Q-3.2,-4.6 0,-0.7 Q3.2,-4.6 6.5,0" fill="none" stroke="#3a3428" strokeWidth="1.7" strokeLinecap="round" opacity="0.65" />
        </g>
      </g>
      <g transform="translate(300,84)">
        <g className="wrui-swift-b">
          <path className="wrui-flap-b" d="M-5.5,0 Q-2.7,-4 0,-0.6 Q2.7,-4 5.5,0" fill="none" stroke="#3a3428" strokeWidth="1.5" strokeLinecap="round" opacity="0.55" />
        </g>
      </g>

      {/* 石のあいだの枯れ草 */}
      <g stroke="#9a9a5c" strokeWidth="1.6" strokeLinecap="round" fill="none">
        <path className="wrui-blade wrui-b1" d="M52,178v-9" opacity="0.65" />
        <path className="wrui-blade wrui-b2" d="M330,190v-10" opacity="0.6" />
        <path className="wrui-blade wrui-b3" d="M368,200v-9" opacity="0.6" />
        <path className="wrui-blade wrui-b4" d="M40,196v-8" opacity="0.55" />
      </g>

      <style>{`
        .wrui-lit, .wrui-heat-a, .wrui-heat-b, .wrui-dust, .wrui-cloud,
        .wrui-blade, .wrui-flap-a, .wrui-flap-b {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .wrui-lit { animation: wrui-shine 12s ease-in-out infinite; }
        .wrui-c2 { animation-delay: -2.4s; }
        .wrui-c3 { animation-delay: -4.8s; }
        .wrui-c4 { animation-delay: -7.2s; }
        .wrui-c5 { animation-delay: -9.6s; }
        .wrui-heat-a { animation: wrui-heat 7.5s ease-in-out infinite; }
        .wrui-heat-b { animation: wrui-heat 9.5s ease-in-out infinite; animation-delay: -4s; }
        .wrui-dust { animation: wrui-blow 19s linear infinite; }
        .wrui-u2 { animation-duration: 25s; animation-delay: -11s; }
        .wrui-cloud { animation: wrui-drift 90s linear infinite; }
        .wrui-swift-a { animation: wrui-dart-a 13s ease-in-out infinite; }
        .wrui-swift-b { animation: wrui-dart-b 17s ease-in-out infinite; animation-delay: -6s; }
        .wrui-flap-a { transform-origin: 50% 100%; animation: wrui-flap 0.9s ease-in-out infinite; }
        .wrui-flap-b { transform-origin: 50% 100%; animation: wrui-flap 1.1s ease-in-out infinite; }
        .wrui-blade { transform-origin: 50% 100%; animation: wrui-bend 4.8s ease-in-out infinite; }
        .wrui-b2 { animation-duration: 5.6s; animation-delay: -1.6s; }
        .wrui-b3 { animation-duration: 4.2s; animation-delay: -2.8s; }
        .wrui-b4 { animation-duration: 5.2s; animation-delay: -0.9s; }
        @keyframes wrui-shine {
          0%, 100% { opacity: 0.08; }
          50% { opacity: 0.4; }
        }
        @keyframes wrui-heat {
          0%, 100% { transform: scaleY(1) translateY(0); opacity: 0.14; }
          50% { transform: scaleY(2) translateY(-2px); opacity: 0.32; }
        }
        @keyframes wrui-blow {
          0% { transform: translateX(-80px) scaleX(0.6); opacity: 0; }
          25% { opacity: 0.32; }
          75% { opacity: 0.22; }
          100% { transform: translateX(110px) scaleX(1.4); opacity: 0; }
        }
        @keyframes wrui-drift {
          0% { transform: translateX(-250px); }
          100% { transform: translateX(430px); }
        }
        @keyframes wrui-dart-a {
          0% { transform: translate(-170px, 20px); }
          40% { transform: translate(-20px, -18px); }
          70% { transform: translate(70px, 14px); }
          100% { transform: translate(210px, -20px); }
        }
        @keyframes wrui-dart-b {
          0% { transform: translate(90px, -14px); }
          45% { transform: translate(-60px, 22px); }
          100% { transform: translate(-290px, -16px); }
        }
        @keyframes wrui-flap {
          0%, 100% { transform: scaleY(0.45); }
          50% { transform: scaleY(1.45); }
        }
        @keyframes wrui-bend {
          0%, 100% { transform: skewX(0deg); }
          50% { transform: skewX(14deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .wrui-lit, .wrui-heat-a, .wrui-heat-b, .wrui-dust, .wrui-cloud,
          .wrui-swift-a, .wrui-swift-b, .wrui-flap-a, .wrui-flap-b, .wrui-blade { animation: none; }
        }
      `}</style>
    </svg>
  );
}
