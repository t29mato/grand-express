/**
 * 6月。同じ太陽、二つの至。
 *
 * 左は北極圏の白夜。太陽が沈まずに水平線の上を横へ滑っていく。
 * 右はクスコの冬至。日の落ちた段々畑で火を焚き、金の円盤を掲げる。
 */
export function World02() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 左=真夜中の白い空 / 右=冬至の暮れた空 */}
      <rect width="200" height="210" fill="#cfe0ea" />
      <rect width="200" height="94" fill="#f0d8b0" />
      <rect x="200" width="200" height="210" fill="#2b3358" />
      <rect x="200" width="200" height="70" fill="#1d2340" />
      <g fill="#f6efe2" opacity="0.85">
        <circle cx="222" cy="26" r="1.8" />
        <circle cx="258" cy="44" r="1.2" />
        <circle cx="286" cy="18" r="1.6" />
        <circle cx="318" cy="52" r="1.2" />
        <circle cx="344" cy="28" r="1.8" />
        <circle cx="378" cy="60" r="1.4" />
        <circle cx="236" cy="70" r="1.2" />
        <circle cx="300" cy="80" r="1.6" />
        <circle cx="392" cy="34" r="1.2" />
      </g>

      {/* 沈まない太陽。水平線の上を横へ滑るだけで、沈まない */}
      <circle className="w02-sun w02-glow" cx="70" cy="84" r="30" fill="#f5b31c" opacity="0.28" />
      <circle className="w02-sun" cx="70" cy="84" r="18" fill="#f5b31c" />

      {/* 真夜中の海鳥 */}
      <g className="w02-gull" fill="none" stroke="#8a8f98" strokeWidth="2.6" strokeLinecap="round">
        <path d="M118,44 q7,-6 14,0 q7,-6 14,0" />
      </g>
      <g className="w02-gull w02-g2" fill="none" stroke="#8a8f98" strokeWidth="2.2" strokeLinecap="round">
        <path d="M40,62 q6,-5 12,0 q6,-5 12,0" />
      </g>

      {/* 北の海と岸 */}
      <rect y="112" width="200" height="98" fill="#5f93bd" />
      <g stroke="#93bdd8" strokeWidth="3" strokeLinecap="round" fill="none">
        <path className="w02-shimmer" d="M18,132 q13,-5 26,0" />
        <path className="w02-shimmer w02-s2" d="M104,148 q13,-5 26,0" />
        <path className="w02-shimmer w02-s3" d="M150,168 q13,-5 26,0" />
      </g>
      {/* 真夜中でも出ている小舟 */}
      <g className="w02-boat">
        <path d="M104,138 c14,-6 44,-6 58,0 c-8,8 -50,8 -58,0z" fill="#6b5330" />
        <rect x="130" y="120" width="3" height="18" fill="#5a4630" />
        <circle cx="120" cy="132" r="4.5" fill="#f6efe2" />
      </g>

      <path d="M0,166 L74,166 L96,180 L0,180z" fill="#4f7a52" />
      <rect y="178" width="200" height="32" fill="#3f6342" />

      {/* 真夜中でも外にいる人と、干した網 */}
      <g className="w02-figure">
        <circle cx="36" cy="156" r="7" fill="#f6efe2" />
        <path d="M27,178 L27,164 Q36,156 45,164 L45,178z" fill="#e8443f" />
      </g>
      <g className="w02-figure w02-f2">
        <circle cx="60" cy="158" r="6" fill="#f6efe2" />
        <path d="M52,178 L52,166 Q60,159 68,166 L68,178z" fill="#5b8fe8" />
      </g>
      <g stroke="#8a6a3c" strokeWidth="3" fill="none">
        <path d="M120,180 L120,152 M164,180 L164,152 M120,156 L164,156" />
        <path d="M122,158 q10,10 20,0 q10,10 20,0" stroke="#c9a877" strokeWidth="2" />
        <path d="M122,166 q10,10 20,0 q10,10 20,0" stroke="#c9a877" strokeWidth="2" />
      </g>

      {/* 南の段々畑 */}
      <g fill="#4a4a3a">
        <path d="M200,138 L400,138 L400,152 L200,152z" />
        <path d="M200,160 L400,160 L400,176 L200,176z" />
        <path d="M200,184 L400,184 L400,210 L200,210z" />
      </g>
      <g fill="#5c5c46">
        <rect x="200" y="152" width="200" height="8" />
        <rect x="200" y="176" width="200" height="8" />
      </g>
      <path d="M200,138 L246,110 L300,138z" fill="#3f4436" />
      <path d="M300,138 L348,104 L400,138z" fill="#4a4f3e" />

      {/* 冬至の焚き火 */}
      <ellipse cx="300" cy="182" rx="30" ry="8" fill="#3a3020" />
      <g stroke="#7a5a34" strokeWidth="5" strokeLinecap="round">
        <path d="M286,182 L308,166 M314,182 L292,166" />
      </g>
      <g className="w02-fire">
        <path d="M300,168 q14,-14 8,-32 q16,14 12,32z" fill="#e8443f" />
        <path d="M298,168 q-10,-12 -4,-24 q12,10 12,24z" fill="#f5b31c" />
      </g>
      <g className="w02-fire w02-f-inner">
        <path d="M300,166 q6,-8 4,-16 q8,8 6,16z" fill="#fdf0c0" />
      </g>

      {/* 掲げられた金の円盤 */}
      <g className="w02-disc">
        <circle cx="356" cy="122" r="15" fill="#f5b31c" />
        <circle cx="356" cy="122" r="8" fill="#e09a10" />
        <g stroke="#f5b31c" strokeWidth="3" strokeLinecap="round">
          <path d="M356,102 L356,96 M376,122 L382,122 M336,122 L330,122 M370,108 L375,103 M342,108 L337,103" />
        </g>
      </g>
      <path d="M348,164 L348,186 L342,206 L370,206 L364,186 L364,164z" fill="#c93a3a" />
      <circle cx="356" cy="158" r="8" fill="#f6efe2" />
      <g className="w02-arms" stroke="#c93a3a" strokeWidth="6" strokeLinecap="round">
        <path d="M350,168 L346,140 M362,168 L366,140" />
      </g>

      {/* 火の粉 */}
      <g fill="#f5b31c">
        <circle className="w02-spark" cx="296" cy="150" r="2.4" />
        <circle className="w02-spark w02-sp2" cx="308" cy="146" r="2" />
        <circle className="w02-spark w02-sp3" cx="288" cy="142" r="2.2" />
      </g>

      {/* 半球の境目 */}
      <rect x="197" width="6" height="210" fill="#f6efe2" opacity="0.3" />
      <path d="M200,0 L200,210" stroke="#f6efe2" strokeWidth="2" strokeDasharray="10 9" opacity="0.7" />

      <style>{`
        .w02-sun {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: w02-skim 12s ease-in-out infinite;
        }
        .w02-glow { animation-name: w02-skim-glow; }
        .w02-gull {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: w02-glide 10s linear infinite;
        }
        .w02-g2 { animation-delay: -4.6s; animation-duration: 13s; }
        .w02-arms {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: w02-raise 5.4s ease-in-out infinite;
        }
        .w02-shimmer {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: w02-lap 4.2s ease-in-out infinite;
        }
        .w02-s2 { animation-delay: -1.4s; }
        .w02-s3 { animation-delay: -2.8s; }
        .w02-figure {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: w02-sway 4.6s ease-in-out infinite;
        }
        .w02-f2 { animation-delay: -1.7s; }
        .w02-boat {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: w02-bob 6.4s ease-in-out infinite;
        }
        .w02-fire {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: w02-burn 1.6s ease-in-out infinite;
        }
        .w02-f-inner { animation-duration: 1.1s; animation-delay: -0.4s; }
        .w02-disc {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: w02-raise 5.4s ease-in-out infinite;
        }
        .w02-spark {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: w02-rise 3.4s ease-out infinite;
        }
        .w02-sp2 { animation-delay: -1.2s; animation-duration: 4s; }
        .w02-sp3 { animation-delay: -2.4s; animation-duration: 3s; }
        @keyframes w02-skim {
          0%, 100% { transform: translate(-44px, 6px); }
          50% { transform: translate(64px, -4px); }
        }
        @keyframes w02-skim-glow {
          0%, 100% { transform: translate(-44px, 6px) scale(1); opacity: 0.28; }
          50% { transform: translate(64px, -4px) scale(1.12); opacity: 0.34; }
        }
        @keyframes w02-lap {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(11px); }
        }
        @keyframes w02-sway {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        @keyframes w02-burn {
          0%, 100% { transform: scale(1, 1); }
          50% { transform: scale(0.82, 1.2); }
        }
        @keyframes w02-raise {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50% { transform: translateY(-9px) rotate(3deg); }
        }
        @keyframes w02-rise {
          0% { transform: translate(0, 10px); opacity: 0; }
          25% { opacity: 1; }
          100% { transform: translate(-16px, -52px); opacity: 0; }
        }
        @keyframes w02-glide {
          0% { transform: translate(-140px, 10px); }
          100% { transform: translate(110px, -18px); }
        }
        @keyframes w02-bob {
          0%, 100% { transform: translateY(0) rotate(-1.4deg); }
          50% { transform: translateY(-3px) rotate(1.4deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .w02-sun, .w02-glow, .w02-shimmer, .w02-figure, .w02-fire,
          .w02-disc, .w02-spark, .w02-gull, .w02-arms, .w02-boat { animation: none; }
        }
      `}</style>
    </svg>
  );
}
