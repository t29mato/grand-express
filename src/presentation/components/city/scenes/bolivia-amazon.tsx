/**
 * アマゾンの川辺の町(コビハなど)に重ねる動き。
 *
 * 樹冠から朝もやが立ちのぼって流れ、川面が光り、鳥が森の上を渡る。
 * 背景(空・密林・川)は静止画が描いているので、ここでは何も塗りつぶさない。
 */
export function BoliviaAmazon() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 樹冠のもや */}
      <g fill="#ffffff">
        <ellipse className="bam-mist bam-m1" cx="60" cy="100" rx="30" ry="8" opacity="0.3" />
        <ellipse className="bam-mist bam-m2" cx="150" cy="92" rx="36" ry="9" opacity="0.26" />
        <ellipse className="bam-mist bam-m3" cx="248" cy="102" rx="32" ry="8" opacity="0.28" />
        <ellipse className="bam-mist bam-m4" cx="340" cy="94" rx="28" ry="7" opacity="0.24" />
      </g>

      {/* 森の上を渡る鳥 */}
      <g transform="translate(150,58)">
        <g className="bam-bird-a">
          <path className="bam-wing-a" d="M-10,0 q5,-7 10,0 q5,-7 10,0" stroke="#2f4a33" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        </g>
      </g>
      <g transform="translate(214,42)">
        <g className="bam-bird-b">
          <path className="bam-wing-b" d="M-8,0 q4,-6 8,0 q4,-6 8,0" stroke="#2f4a33" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
      </g>

      {/* 川面のきらめき */}
      <g stroke="#dbeeff" strokeWidth="2.2" strokeLinecap="round" fill="none">
        <path className="bam-glint bam-g1" d="M36,184 h26" opacity="0.5" />
        <path className="bam-glint bam-g2" d="M118,193 h32" opacity="0.44" />
        <path className="bam-glint bam-g3" d="M198,182 h28" opacity="0.48" />
        <path className="bam-glint bam-g4" d="M262,200 h34" opacity="0.4" />
        <path className="bam-glint bam-g5" d="M330,190 h26" opacity="0.46" />
      </g>

      <style>{`
        .bam-mist {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: bam-lift 16s ease-in-out infinite;
        }
        .bam-m2 { animation-duration: 19s; animation-delay: -4.5s; }
        .bam-m3 { animation-duration: 14s; animation-delay: -8s; }
        .bam-m4 { animation-duration: 21s; animation-delay: -12s; }
        .bam-bird-a { animation: bam-cross-a 32s linear infinite; }
        .bam-bird-b { animation: bam-cross-b 40s linear infinite; }
        .bam-wing-a, .bam-wing-b {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: bam-flap 1.6s ease-in-out infinite;
        }
        .bam-wing-b { animation-duration: 2.1s; }
        .bam-glint { animation: bam-shine 8s ease-in-out infinite; }
        .bam-g2 { animation-duration: 10s; animation-delay: -2.2s; }
        .bam-g3 { animation-duration: 7s; animation-delay: -4.4s; }
        .bam-g4 { animation-duration: 11s; animation-delay: -1.1s; }
        .bam-g5 { animation-duration: 9s; animation-delay: -6s; }
        @keyframes bam-lift {
          0%, 100% { transform: translate(-10px, 6px) scale(0.8); opacity: 0.1; }
          50% { transform: translate(10px, -8px) scale(1.15); opacity: 0.34; }
        }
        @keyframes bam-cross-a {
          0% { transform: translate(-200px, 16px); }
          100% { transform: translate(270px, -18px); }
        }
        @keyframes bam-cross-b {
          0% { transform: translate(-250px, -10px); }
          100% { transform: translate(210px, 18px); }
        }
        @keyframes bam-flap {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.35); }
        }
        @keyframes bam-shine {
          0%, 100% { transform: translateX(-7px); opacity: 0.1; }
          50% { transform: translateX(7px); opacity: 0.55; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bam-mist, .bam-bird-a, .bam-bird-b,
          .bam-wing-a, .bam-wing-b, .bam-glint { animation: none; }
        }
      `}</style>
    </svg>
  );
}
