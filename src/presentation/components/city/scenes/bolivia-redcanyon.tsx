/**
 * 南部の赤い峡谷(トゥピサ)に重ねる、陽炎と砂ぼこりとコンドル。
 *
 * 赤い岩の谷は昼のあいだ焼けていて、岩の足元が熱でゆらぐ。
 * 谷底を砂の帯が流れ、上空をハゲワシがゆっくり輪を描く。
 */
export function BoliviaRedcanyon() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 岩の足元の陽炎 */}
      <g fill="#f5dcb0">
        <ellipse className="bolred-heat-a" cx="70" cy="116" rx="58" ry="3.4" opacity="0.3" />
        <ellipse className="bolred-heat-b" cx="210" cy="112" rx="76" ry="3" opacity="0.26" />
        <ellipse className="bolred-heat-c" cx="340" cy="118" rx="52" ry="3.2" opacity="0.28" />
      </g>

      {/* 谷底を流れる砂ぼこり */}
      <g fill="#e8c79c">
        <ellipse className="bolred-dust-a" cx="110" cy="140" rx="60" ry="4.4" opacity="0.28" />
        <ellipse className="bolred-dust-b" cx="250" cy="168" rx="74" ry="5.4" opacity="0.24" />
        <ellipse className="bolred-dust-c" cx="160" cy="196" rx="66" ry="5" opacity="0.2" />
      </g>

      {/* 地面から巻き上がる砂の筋 */}
      <g fill="none" stroke="#e8c79c" strokeWidth="2" strokeLinecap="round">
        <g transform="translate(60,164)">
          <path className="bolred-wisp-a" d="M0,0 C14,-4 26,-2 40,-7" opacity="0.3" />
        </g>
        <g transform="translate(244,190)">
          <path className="bolred-wisp-b" d="M0,0 C16,-5 30,-3 46,-9" opacity="0.26" />
        </g>
        <g transform="translate(300,150)">
          <path className="bolred-wisp-a" d="M0,0 C12,-3 22,-2 34,-6" opacity="0.24" />
        </g>
      </g>

      {/* 輪を描くハゲワシ */}
      <g fill="#4a2a20">
        <g className="bolred-vulture-a">
          <path className="bolred-vwing-a" d="M-12,0 C-8,-5 -4,-5 0,-1.6 C4,-5 8,-5 12,0 C7,-1.6 3,-0.8 0,0.8 C-3,-0.8 -7,-1.6 -12,0z" />
        </g>
        <g className="bolred-vulture-b">
          <path className="bolred-vwing-b" d="M-8,0 C-5.4,-3.4 -2.6,-3.4 0,-1 C2.6,-3.4 5.4,-3.4 8,0 C4.6,-1 2,-0.5 0,0.5 C-2,-0.5 -4.6,-1 -8,0z" />
        </g>
      </g>

      <style>{`
        .bolred-heat-a, .bolred-heat-b, .bolred-heat-c,
        .bolred-dust-a, .bolred-dust-b, .bolred-dust-c,
        .bolred-vulture-a, .bolred-vulture-b {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .bolred-heat-a { animation: bolred-shimmer 3.6s ease-in-out infinite; }
        .bolred-heat-b { animation: bolred-shimmer 4.6s ease-in-out infinite; animation-delay: -1.5s; }
        .bolred-heat-c { animation: bolred-shimmer 4.1s ease-in-out infinite; animation-delay: -2.7s; }
        .bolred-dust-a { animation: bolred-blow 18s linear infinite; }
        .bolred-dust-b { animation: bolred-blow 24s linear infinite; animation-delay: -10s; }
        .bolred-dust-c { animation: bolred-blow 21s linear infinite; animation-delay: -15s; }
        .bolred-wisp-a, .bolred-wisp-b {
          transform-box: fill-box;
          transform-origin: 0% 100%;
        }
        .bolred-wisp-a { animation: bolred-lift 6.8s ease-out infinite; }
        .bolred-wisp-b { animation: bolred-lift 8.4s ease-out infinite; animation-delay: -3.6s; }
        .bolred-vulture-a { transform: translate(300px, 44px); animation: bolred-circle-a 24s linear infinite; }
        .bolred-vulture-b { transform: translate(96px, 72px); animation: bolred-circle-b 30s linear infinite; }
        .bolred-vwing-a, .bolred-vwing-b {
          transform-box: fill-box;
          transform-origin: 50% 100%;
        }
        .bolred-vwing-a { animation: bolred-tilt 7s ease-in-out infinite; }
        .bolred-vwing-b { animation: bolred-tilt 8.6s ease-in-out infinite; animation-delay: -3s; }
        @keyframes bolred-shimmer {
          0%, 100% { transform: skewX(0deg) scaleY(1); opacity: 0.28; }
          33% { transform: skewX(9deg) scaleY(1.5); opacity: 0.14; }
          66% { transform: skewX(-8deg) scaleY(0.7); opacity: 0.32; }
        }
        @keyframes bolred-blow {
          0% { transform: translateX(-200px) scaleX(0.7); opacity: 0; }
          16% { opacity: 0.28; }
          82% { opacity: 0.2; }
          100% { transform: translateX(320px) scaleX(1.3); opacity: 0; }
        }
        @keyframes bolred-lift {
          0% { transform: translate(0, 6px) scale(0.6); opacity: 0; }
          25% { opacity: 0.3; }
          100% { transform: translate(44px, -20px) scale(1.3); opacity: 0; }
        }
        @keyframes bolred-circle-a {
          0%, 100% { transform: translate(346px, 50px) scale(0.8); }
          25% { transform: translate(300px, 34px) scale(1); }
          50% { transform: translate(252px, 50px) scale(1.15); }
          75% { transform: translate(300px, 66px) scale(1); }
        }
        @keyframes bolred-circle-b {
          0%, 100% { transform: translate(56px, 76px) scale(0.9); }
          25% { transform: translate(96px, 62px) scale(1.1); }
          50% { transform: translate(138px, 76px) scale(0.85); }
          75% { transform: translate(96px, 90px) scale(0.7); }
        }
        @keyframes bolred-tilt {
          0%, 100% { transform: scaleY(1) rotate(-3deg); }
          50% { transform: scaleY(0.82) rotate(3deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .bolred-heat-a, .bolred-heat-b, .bolred-heat-c,
          .bolred-dust-a, .bolred-dust-b, .bolred-dust-c,
          .bolred-wisp-a, .bolred-wisp-b,
          .bolred-vulture-a, .bolred-vulture-b,
          .bolred-vwing-a, .bolred-vwing-b { animation: none; }
        }
      `}</style>
    </svg>
  );
}
