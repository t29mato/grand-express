/**
 * 夏の雷雨が十分でぶどうを裸にし、前金をもらってあった収穫を持っていく(南西部)。
 *
 *   - 黒い雲から雹が降り、地面で跳ねる
 *   - 打たれた葉が畝から飛び、房が枝から落ちる
 *   - 畝のあいだの発生器がヨウ化銀を焚き上げるが、間に合わない
 */
export function OrageDeGrele() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 昼なのに暗い空 */}
      <rect width="400" height="210" fill="#3b4552" />
      <rect y="46" width="400" height="22" fill="#47525f" />

      {/* 低くたれた雹雲 */}
      <g fill="#2c343f">
        <ellipse className="orgr-cloud orgr-cl1" cx="120" cy="42" rx="96" ry="30" />
        <ellipse className="orgr-cloud orgr-cl2" cx="286" cy="34" rx="86" ry="26" />
        <ellipse cx="200" cy="20" rx="120" ry="24" />
      </g>
      <g fill="#232a34">
        <ellipse cx="88" cy="56" rx="52" ry="14" />
        <ellipse cx="256" cy="52" rx="58" ry="13" />
      </g>
      {/* 稲光 */}
      <path className="orgr-bolt" d="M214,58 L200,88 L214,86 L202,116 L232,80 L216,82 L228,58z" fill="#f5d06a" />

      {/* 畑 */}
      <rect y="120" width="400" height="90" fill="#5f5340" />
      <path d="M0,146 Q110,136 220,148 Q320,158 400,144 L400,210 L0,210z" fill="#544936" />
      <rect y="186" width="400" height="24" fill="#483f30" />

      {/* 裸にされた畝 */}
      <g>
        <g stroke="#6b5330" strokeWidth="5" strokeLinecap="round" fill="none">
          <path d="M52,178 v-26" />
          <path d="M126,182 v-28" />
          <path d="M200,178 v-26" />
          <path d="M274,184 v-28" />
          <path d="M348,180 v-26" />
        </g>
        <g stroke="#6b5330" strokeWidth="3" strokeLinecap="round" fill="none">
          <path d="M52,158 l-14,-9M52,158 l14,-9M126,160 l-14,-9M126,160 l14,-9M200,158 l-14,-9M200,158 l14,-9M274,162 l-14,-9M274,162 l14,-9M348,158 l-14,-9M348,158 l14,-9" />
        </g>
        {/* 針金 */}
        <g stroke="#4a4436" strokeWidth="1.6" opacity="0.8" fill="none">
          <path d="M0,156h400M0,168h400" />
        </g>
        {/* まだ残っている葉 */}
        <g fill="#3f6b3a">
          <ellipse className="orgr-leaf orgr-v1" cx="66" cy="152" rx="8" ry="5" />
          <ellipse className="orgr-leaf orgr-v2" cx="188" cy="150" rx="7" ry="4.4" />
          <ellipse className="orgr-leaf orgr-v3" cx="336" cy="152" rx="7.6" ry="4.8" />
        </g>
      </g>

      {/* 枝から落ちる房 */}
      <g fill="#6f4f8f">
        <g className="orgr-bunch orgr-b1">
          <circle cx="122" cy="164" r="3.4" />
          <circle cx="129" cy="164" r="3.4" />
          <circle cx="125.5" cy="169" r="3.4" />
        </g>
        <g className="orgr-bunch orgr-b2">
          <circle cx="270" cy="168" r="3" />
          <circle cx="276" cy="168" r="3" />
          <circle cx="273" cy="172.4" r="3" />
        </g>
      </g>

      {/* 対抗の発生器(ヨウ化銀を焚き上げる) */}
      <g transform="translate(378,190)">
        <rect x="-9" y="-30" width="18" height="30" rx="3" fill="#7d8a96" />
        <rect x="-13" y="-34" width="26" height="6" rx="2" fill="#5f6b78" />
        <rect x="-3" y="-46" width="6" height="14" fill="#5f6b78" />
        <g fill="#c9d6e0">
          <circle className="orgr-puff orgr-p1" cx="0" cy="-50" r="5" opacity="0.55" />
          <circle className="orgr-puff orgr-p2" cx="0" cy="-50" r="6.4" opacity="0.4" />
        </g>
      </g>

      {/* 降る雹 */}
      <g fill="#e8f2f8">
        <circle className="orgr-hail orgr-h1" cx="30" cy="0" r="4" />
        <circle className="orgr-hail orgr-h2" cx="86" cy="0" r="3.4" />
        <circle className="orgr-hail orgr-h3" cx="146" cy="0" r="4.4" />
        <circle className="orgr-hail orgr-h4" cx="206" cy="0" r="3.6" />
        <circle className="orgr-hail orgr-h5" cx="262" cy="0" r="4.2" />
        <circle className="orgr-hail orgr-h6" cx="318" cy="0" r="3.4" />
        <circle className="orgr-hail orgr-h7" cx="366" cy="0" r="4" />
        <circle className="orgr-hail orgr-h8" cx="58" cy="0" r="3" />
        <circle className="orgr-hail orgr-h9" cx="176" cy="0" r="3.2" />
        <circle className="orgr-hail orgr-h10" cx="292" cy="0" r="3.6" />
      </g>

      {/* 地面で跳ねた雹 */}
      <g fill="#e8f2f8">
        <circle className="orgr-bounce orgr-n1" cx="96" cy="192" r="3" />
        <circle className="orgr-bounce orgr-n2" cx="228" cy="198" r="2.6" />
        <circle className="orgr-bounce orgr-n3" cx="312" cy="190" r="2.8" />
      </g>

      {/* 消えていく前金 */}
      <g className="orgr-coin orgr-c1">
        <circle cx="150" cy="118" r="9" fill="#f5b31c" />
        <circle cx="150" cy="118" r="4.5" fill="#c98a0d" />
      </g>
      <g className="orgr-coin orgr-c2">
        <circle cx="172" cy="104" r="7.4" fill="#f5b31c" />
        <circle cx="172" cy="104" r="3.6" fill="#c98a0d" />
      </g>

      <style>{`
        .orgr-cloud, .orgr-bolt, .orgr-leaf, .orgr-bunch,
        .orgr-puff, .orgr-hail, .orgr-bounce, .orgr-coin {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .orgr-cl1 { animation: orgr-roll 12s ease-in-out infinite; }
        .orgr-cl2 { animation: orgr-roll 15s ease-in-out infinite; animation-delay: -6s; }
        .orgr-bolt { animation: orgr-flash 4.5s steps(1, end) infinite; }
        .orgr-leaf { transform-origin: 0% 100%; animation: orgr-strip 3.2s ease-in infinite; }
        .orgr-v2 { animation-duration: 4s; animation-delay: -1.4s; }
        .orgr-v3 { animation-duration: 3.6s; animation-delay: -2.6s; }
        .orgr-bunch { animation: orgr-drop 3.8s ease-in infinite; }
        .orgr-b2 { animation-duration: 4.6s; animation-delay: -2.2s; }
        .orgr-puff { animation: orgr-smoke 4s linear infinite; }
        .orgr-p2 { animation-duration: 5.2s; animation-delay: -2.4s; }
        .orgr-hail { animation: orgr-fall 1.1s linear infinite; }
        .orgr-h1 { animation-duration: 1.2s; animation-delay: -0.2s; }
        .orgr-h2 { animation-duration: 1s; animation-delay: -0.5s; }
        .orgr-h3 { animation-duration: 1.3s; animation-delay: -0.8s; }
        .orgr-h4 { animation-duration: 1.05s; animation-delay: -0.3s; }
        .orgr-h5 { animation-duration: 1.25s; animation-delay: -0.65s; }
        .orgr-h6 { animation-duration: 0.95s; animation-delay: -0.15s; }
        .orgr-h7 { animation-duration: 1.15s; animation-delay: -0.9s; }
        .orgr-h8 { animation-duration: 1.35s; animation-delay: -0.45s; }
        .orgr-h9 { animation-duration: 1.1s; animation-delay: -0.75s; }
        .orgr-h10 { animation-duration: 1.2s; animation-delay: -1s; }
        .orgr-bounce { animation: orgr-hop 1.1s ease-out infinite; }
        .orgr-n2 { animation-duration: 1.3s; animation-delay: -0.5s; }
        .orgr-n3 { animation-duration: 0.95s; animation-delay: -0.8s; }
        .orgr-coin { animation: orgr-lost 2.8s ease-in infinite; }
        .orgr-c2 { animation-delay: -1.4s; }
        @keyframes orgr-roll {
          0%, 100% { transform: translateX(-10px) scaleX(1); }
          50% { transform: translateX(10px) scaleX(1.06); }
        }
        @keyframes orgr-flash {
          0%, 6% { opacity: 0.9; }
          7%, 11% { opacity: 0.15; }
          12%, 16% { opacity: 0.8; }
          17%, 100% { opacity: 0; }
        }
        @keyframes orgr-strip {
          0%, 40% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate(-46px, -22px) rotate(-260deg); opacity: 0; }
        }
        @keyframes orgr-drop {
          0%, 45% { transform: translateY(0); opacity: 1; }
          92% { transform: translateY(26px); opacity: 1; }
          100% { transform: translateY(28px); opacity: 0; }
        }
        @keyframes orgr-smoke {
          0% { transform: translate(0, 0) scale(0.4); opacity: 0; }
          25% { opacity: 0.5; }
          100% { transform: translate(-22px, -40px) scale(2); opacity: 0; }
        }
        @keyframes orgr-fall {
          0% { transform: translate(0, -8px); opacity: 0; }
          12% { opacity: 1; }
          88% { opacity: 1; }
          100% { transform: translate(-16px, 216px); opacity: 0; }
        }
        @keyframes orgr-hop {
          0% { transform: translate(0, 0) scale(1); opacity: 0; }
          10% { opacity: 1; }
          55% { transform: translate(7px, -16px) scale(0.9); opacity: 1; }
          100% { transform: translate(15px, 2px) scale(0.8); opacity: 0; }
        }
        @keyframes orgr-lost {
          0% { transform: translate(0, 0); opacity: 0; }
          25% { opacity: 1; }
          100% { transform: translate(-46px, 56px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .orgr-cloud, .orgr-bolt, .orgr-leaf, .orgr-bunch,
          .orgr-puff, .orgr-hail, .orgr-bounce, .orgr-coin { animation: none; }
        }
      `}</style>
    </svg>
  );
}
