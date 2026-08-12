/**
 * 満員のアンコットで財布をすられる(ディチョペット)。ミニバスの中、
 * 後ろから伸びた手がバッグの財布を抜き取り、そのまま闇へすり抜けていく。
 *
 * 動くのは手が伸びる動きと、財布が抜き取られて消える動きだけ。
 */
export function IndonesiaDicopet() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* ミニバス車内の薄暗い空気。 */}
      <rect width="400" height="210" fill="#3a3448" />
      <rect y="0" width="400" height="70" fill="#4a4458" />

      {/* 車内の窓(外の景色がうっすら流れる)。 */}
      <rect x="0" y="20" width="400" height="40" fill="#5f7a8a" opacity="0.6" />
      <g stroke="#8fc4e8" strokeWidth="2" opacity="0.5">
        <line x1="0" y1="40" x2="400" y2="40" />
      </g>

      {/* 手すりの棒。 */}
      <rect x="0" y="70" width="400" height="6" fill="#8a8f95" />

      {/* 乗客のシルエット(混み合う車内)。 */}
      <g fill="#20182c">
        <circle cx="60" cy="110" r="14" />
        <rect x="46" y="122" width="28" height="50" rx="6" />
        <circle cx="140" cy="106" r="15" />
        <rect x="124" y="119" width="32" height="56" rx="6" />
        <circle cx="330" cy="108" r="14" />
        <rect x="316" y="120" width="28" height="52" rx="6" />
      </g>

      {/* 被害者(バッグを提げて立つ)。 */}
      <g>
        <circle cx="230" cy="104" r="15" fill="#f6efe2" />
        <rect x="213" y="118" width="34" height="58" rx="6" fill="#e8443f" />
        {/* バッグ(肩から下げている)。 */}
        <rect x="248" y="140" width="20" height="24" rx="2" fill="#8a5a3a" stroke="#3a2f24" strokeWidth="1.6" />
      </g>

      {/* 財布(バッグから抜き取られて手のほうへ消えていく)。 */}
      <g className="idn-dc-wallet" strokeLinejoin="round">
        <rect x="0" y="0" width="14" height="10" rx="1.5" fill="#c9a877" stroke="#3a2f24" strokeWidth="1.4" />
      </g>

      {/* 後ろから伸びる手。 */}
      <g className="idn-dc-hand">
        <path d="M400,150 Q340,150 300,152" fill="none" stroke="#20182c" strokeWidth="10" strokeLinecap="round" />
        <circle cx="296" cy="152" r="7" fill="#20182c" />
      </g>

      <style>{`
        .idn-dc-hand {
          transform-box: fill-box;
          transform-origin: 100% 50%;
          animation: idn-dc-reach 3.2s ease-in-out infinite;
        }
        @keyframes idn-dc-reach {
          0% { transform: scaleX(0.3); opacity: 0; }
          25% { transform: scaleX(1); opacity: 1; }
          55% { transform: scaleX(1); opacity: 1; }
          80% { transform: scaleX(0.3); opacity: 0; }
          100% { transform: scaleX(0.3); opacity: 0; }
        }
        .idn-dc-wallet {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: idn-dc-steal 3.2s ease-in-out infinite;
        }
        @keyframes idn-dc-steal {
          0% { transform: translate(255px, 155px); opacity: 0; }
          35% { transform: translate(255px, 155px); opacity: 1; }
          65% { transform: translate(320px, 152px); opacity: 1; }
          85% { transform: translate(392px, 150px); opacity: 0; }
          100% { transform: translate(392px, 150px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .idn-dc-hand { animation: none; }
          .idn-dc-wallet { animation: none; opacity: 1; transform: translate(320px, 152px); }
        }
      `}</style>
    </svg>
  );
}
