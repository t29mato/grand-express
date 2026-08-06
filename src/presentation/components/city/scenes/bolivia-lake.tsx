/**
 * チチカカ湖畔の街に重ねる、湖面のさざなみ。
 *
 * コパカバーナの前に広がる湖は、いつも細かな波が立っている。
 * 光の筋が横に流れ、トトラ葦の舟がゆっくり揺れ、日の下に光の粒が散る。
 */
export function BoliviaLake() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 湖面を流れる波の筋 */}
      <g stroke="#a8e6f2" strokeWidth="2" strokeLinecap="round" fill="none">
        <path className="bollake-wave-a" d="M40,124 h46" opacity="0.4" />
        <path className="bollake-wave-b" d="M230,134 h58" opacity="0.34" />
        <path className="bollake-wave-c" d="M96,148 h64" opacity="0.42" />
        <path className="bollake-wave-d" d="M268,172 h70" opacity="0.36" />
        <path className="bollake-wave-e" d="M46,186 h80" opacity="0.3" />
        <path className="bollake-wave-f" d="M186,200 h74" opacity="0.28" />
      </g>

      {/* 太陽(322,38)の下に散る光の粒 */}
      <g fill="#f5e2a8">
        <ellipse className="bollake-glint-a" cx="322" cy="118" rx="9" ry="1.6" opacity="0.7" />
        <ellipse className="bollake-glint-b" cx="312" cy="128" rx="6" ry="1.4" opacity="0.55" />
        <ellipse className="bollake-glint-c" cx="330" cy="140" rx="7" ry="1.6" opacity="0.6" />
        <ellipse className="bollake-glint-d" cx="316" cy="154" rx="5" ry="1.3" opacity="0.45" />
        <ellipse className="bollake-glint-e" cx="334" cy="168" rx="6" ry="1.5" opacity="0.5" />
      </g>

      {/* 揺れるトトラ葦の舟 */}
      <g transform="translate(112,156)">
        <g className="bollake-boat">
          <path d="M-26,0 C-20,7 18,7 26,0 C18,3 -18,3 -26,0z" fill="#c9a877" />
          <path d="M-26,0 C-28,-5 -24,-8 -20,-9 C-23,-6 -24,-3 -23,0z" fill="#b8946a" />
          <path d="M26,0 C28,-5 24,-8 20,-9 C23,-6 24,-3 23,0z" fill="#b8946a" />
          <rect x="-2" y="-16" width="2.4" height="16" fill="#8a6f43" />
          <path d="M0.4,-16 L10,-11 L0.4,-6z" fill="#f6efe2" opacity="0.9" />
        </g>
      </g>

      {/* 舟のまわりに広がる波紋 */}
      <g fill="none" stroke="#9fdcea" strokeWidth="1.2">
        <ellipse className="bollake-ring-a" cx="112" cy="160" rx="18" ry="4" opacity="0.4" />
        <ellipse className="bollake-ring-b" cx="112" cy="160" rx="18" ry="4" opacity="0.3" />
      </g>

      {/* 湖の上を飛ぶ鳥 */}
      <g stroke="#3d5b6b" strokeWidth="1.5" fill="none" strokeLinecap="round">
        <g className="bollake-bird-a">
          <path className="bollake-wing-a" d="M-8,0 Q-4,-5 0,0 Q4,-5 8,0" />
        </g>
        <g className="bollake-bird-b">
          <path className="bollake-wing-b" d="M-5.5,0 Q-2.7,-3.6 0,0 Q2.7,-3.6 5.5,0" />
        </g>
      </g>

      <style>{`
        .bollake-wave-a, .bollake-wave-b, .bollake-wave-c,
        .bollake-wave-d, .bollake-wave-e, .bollake-wave-f,
        .bollake-glint-a, .bollake-glint-b, .bollake-glint-c,
        .bollake-glint-d, .bollake-glint-e,
        .bollake-ring-a, .bollake-ring-b,
        .bollake-bird-a, .bollake-bird-b {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .bollake-wave-a { animation: bollake-flow 13s linear infinite; }
        .bollake-wave-b { animation: bollake-flow 16s linear infinite; animation-delay: -6s; }
        .bollake-wave-c { animation: bollake-flow 11s linear infinite; animation-delay: -4s; }
        .bollake-wave-d { animation: bollake-flow 18s linear infinite; animation-delay: -9s; }
        .bollake-wave-e { animation: bollake-flow 15s linear infinite; animation-delay: -2s; }
        .bollake-wave-f { animation: bollake-flow 20s linear infinite; animation-delay: -12s; }
        .bollake-glint-a { animation: bollake-twinkle 2.6s ease-in-out infinite; }
        .bollake-glint-b { animation: bollake-twinkle 3.4s ease-in-out infinite; animation-delay: -1.2s; }
        .bollake-glint-c { animation: bollake-twinkle 2.9s ease-in-out infinite; animation-delay: -2s; }
        .bollake-glint-d { animation: bollake-twinkle 3.8s ease-in-out infinite; animation-delay: -0.6s; }
        .bollake-glint-e { animation: bollake-twinkle 3.1s ease-in-out infinite; animation-delay: -1.7s; }
        .bollake-boat {
          transform-box: fill-box;
          transform-origin: 50% 90%;
          animation: bollake-rock 5.4s ease-in-out infinite;
        }
        .bollake-ring-a { animation: bollake-spread 6.5s ease-out infinite; }
        .bollake-ring-b { animation: bollake-spread 6.5s ease-out infinite; animation-delay: -3.2s; }
        .bollake-bird-a { transform: translate(92px, 52px); animation: bollake-glide-a 29s linear infinite; }
        .bollake-bird-b { transform: translate(286px, 34px); animation: bollake-glide-b 37s linear infinite; }
        .bollake-wing-a, .bollake-wing-b {
          transform-box: fill-box;
          transform-origin: 50% 100%;
        }
        .bollake-wing-a { animation: bollake-flap 0.95s ease-in-out infinite; }
        .bollake-wing-b { animation: bollake-flap 1.25s ease-in-out infinite; animation-delay: -0.4s; }
        @keyframes bollake-flow {
          0% { transform: translateX(-120px) scaleX(0.6); opacity: 0; }
          20% { opacity: 0.4; }
          78% { opacity: 0.3; }
          100% { transform: translateX(180px) scaleX(1.2); opacity: 0; }
        }
        @keyframes bollake-twinkle {
          0%, 100% { transform: scaleX(1); opacity: 0.7; }
          50% { transform: scaleX(0.4); opacity: 0.16; }
        }
        @keyframes bollake-rock {
          0%, 100% { transform: translateY(0) rotate(-2.4deg); }
          50% { transform: translateY(-2.4px) rotate(2.4deg); }
        }
        @keyframes bollake-spread {
          0% { transform: scale(0.25); opacity: 0.45; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes bollake-glide-a {
          0% { transform: translate(-26px, 66px); }
          50% { transform: translate(190px, 44px); }
          100% { transform: translate(428px, 60px); }
        }
        @keyframes bollake-glide-b {
          0% { transform: translate(428px, 32px); }
          50% { transform: translate(200px, 52px); }
          100% { transform: translate(-26px, 30px); }
        }
        @keyframes bollake-flap {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.3); }
        }
        @media (prefers-reduced-motion: reduce) {
          .bollake-wave-a, .bollake-wave-b, .bollake-wave-c,
          .bollake-wave-d, .bollake-wave-e, .bollake-wave-f,
          .bollake-glint-a, .bollake-glint-b, .bollake-glint-c,
          .bollake-glint-d, .bollake-glint-e,
          .bollake-boat, .bollake-ring-a, .bollake-ring-b,
          .bollake-bird-a, .bollake-bird-b,
          .bollake-wing-a, .bollake-wing-b { animation: none; }
        }
      `}</style>
    </svg>
  );
}
