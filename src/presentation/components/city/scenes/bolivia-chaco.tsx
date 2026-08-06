/**
 * 乾いたチャコの平原の町(サンホセ・デ・チキートスなど)に重ねる動き。
 *
 * 地平の上で陽炎がゆらぎ、砂ぼこりが低く流れ、鷹が輪を描いて滑空する。
 * 背景(空・荒地・サボテン)は静止画が描いているので、ここでは何も塗りつぶさない。
 */
export function BoliviaChaco() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 輪を描く鷹 */}
      <g transform="translate(250,52)">
        <g className="bch-hawk">
          <g className="bch-bank">
            <ellipse cx="0" cy="0" rx="4" ry="2.4" fill="#4a3524" />
            <path className="bch-wing-l" d="M-2,-1 L-16,-6 L-19,-3 L-14,1 L-2,2 Z" fill="#5a4130" />
            <path className="bch-wing-r" d="M2,-1 L16,-6 L19,-3 L14,1 L2,2 Z" fill="#5a4130" />
            <path d="M-1,2 L0,8 L2,2 Z" fill="#4a3524" />
          </g>
        </g>
      </g>

      {/* 地平の陽炎 */}
      <g stroke="#fff2d0" strokeWidth="5" strokeLinecap="round" fill="none">
        <path className="bch-heat bch-t1" d="M20,112 h96" opacity="0.18" />
        <path className="bch-heat bch-t2" d="M136,116 h108" opacity="0.15" />
        <path className="bch-heat bch-t3" d="M258,111 h104" opacity="0.17" />
        <path className="bch-heat bch-t4" d="M70,122 h120" opacity="0.12" />
        <path className="bch-heat bch-t5" d="M230,124 h116" opacity="0.13" />
      </g>

      {/* 低く流れる砂ぼこり */}
      <g fill="#f0e0b4">
        <g transform="translate(140,168)">
          <ellipse className="bch-dust bch-d1" cx="0" cy="0" rx="54" ry="7" opacity="0.2" />
        </g>
        <g transform="translate(300,192)">
          <ellipse className="bch-dust bch-d2" cx="0" cy="0" rx="44" ry="6" opacity="0.16" />
        </g>
      </g>

      <style>{`
        .bch-hawk { animation: bch-circle 22s ease-in-out infinite; }
        .bch-bank { transform-box: fill-box; transform-origin: 50% 50%; animation: bch-tilt 22s ease-in-out infinite; }
        .bch-wing-l { transform-box: fill-box; transform-origin: 100% 60%; animation: bch-soar 5.5s ease-in-out infinite; }
        .bch-wing-r { transform-box: fill-box; transform-origin: 0% 60%; animation: bch-soar-r 5.5s ease-in-out infinite; }
        .bch-heat {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: bch-shimmer 6.5s ease-in-out infinite;
        }
        .bch-t2 { animation-duration: 8s; animation-delay: -1.8s; }
        .bch-t3 { animation-duration: 7.2s; animation-delay: -3.4s; }
        .bch-t4 { animation-duration: 9s; animation-delay: -5s; }
        .bch-t5 { animation-duration: 7.8s; animation-delay: -2.6s; }
        .bch-dust { animation: bch-blow 26s linear infinite; }
        .bch-d2 { animation-duration: 34s; animation-delay: -12s; }
        @keyframes bch-circle {
          0%, 100% { transform: translate(-70px, 0); }
          25% { transform: translate(0, -16px); }
          50% { transform: translate(70px, 0); }
          75% { transform: translate(0, 16px); }
        }
        @keyframes bch-tilt {
          0%, 100% { transform: rotate(-8deg); }
          50% { transform: rotate(8deg); }
        }
        @keyframes bch-soar {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(7deg); }
        }
        @keyframes bch-soar-r {
          0%, 100% { transform: rotate(5deg); }
          50% { transform: rotate(-7deg); }
        }
        @keyframes bch-shimmer {
          0%, 100% { transform: translate(-6px, 1px) scaleX(0.9); opacity: 0.06; }
          50% { transform: translate(6px, -1px) scaleX(1.1); opacity: 0.26; }
        }
        @keyframes bch-blow {
          0% { transform: translateX(-220px); opacity: 0; }
          20% { opacity: 0.22; }
          80% { opacity: 0.18; }
          100% { transform: translateX(240px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bch-hawk, .bch-bank, .bch-wing-l, .bch-wing-r,
          .bch-heat, .bch-dust { animation: none; }
        }
      `}</style>
    </svg>
  );
}
