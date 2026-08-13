/**
 * 「バカ」を全部負担する番が回ってくる。誕生日ケーキとピニャータの
 * 共同基金に三人ぶんの分担が届かず、幹事がその場で穴を埋める。
 *
 * 動くのは、瓶に落ち続ける硬貨だけ。
 */
export function VenezuelaVacaDeCumpleanos() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 部屋の壁と床。 */}
      <rect width="400" height="210" fill="#f0e4c8" />
      <rect y="150" width="400" height="60" fill="#c9a877" />

      {/* 風船。 */}
      <g strokeLinejoin="round">
        <circle cx="50" cy="50" r="20" fill="#e8443f" />
        <line x1="50" y1="70" x2="46" y2="110" stroke="#4a4436" strokeWidth="1.4" />
        <circle cx="340" cy="46" r="18" fill="#5b8fe8" />
        <line x1="340" y1="64" x2="344" y2="106" stroke="#4a4436" strokeWidth="1.4" />
      </g>

      {/* ピニャータ(星形)。 */}
      <g strokeLinejoin="round">
        <line x1="200" y1="0" x2="200" y2="40" stroke="#4a4436" strokeWidth="1.6" />
        <path
          d="M200,40 l8,20 l22,2 l-17,15 l6,22 l-19,-12 l-19,12 l6,-22 l-17,-15 l22,-2 z"
          fill="#f4c430"
          stroke="#20364a"
          strokeWidth="2"
        />
      </g>

      {/* テーブルとケーキ。 */}
      <rect x="60" y="150" width="180" height="10" fill="#8a4a2c" />
      <g strokeLinejoin="round">
        <rect x="110" y="126" width="70" height="24" fill="#f6efe2" stroke="#c8a06a" strokeWidth="2" />
        <rect x="110" y="120" width="70" height="8" fill="#e8a0b0" />
        <g fill="#f5b31c">
          <rect x="120" y="112" width="3" height="10" />
          <rect x="140" y="112" width="3" height="10" />
          <rect x="160" y="112" width="3" height="10" />
        </g>
        <g fill="#e8443f">
          <circle cx="121.5" cy="110" r="2.4" />
          <circle cx="141.5" cy="110" r="2.4" />
          <circle cx="161.5" cy="110" r="2.4" />
        </g>
      </g>

      {/* 瓶(バカ)。 */}
      <path d="M280,160 h50 v34 q0,8 -8,8 h-34 q-8,0 -8,-8 z" fill="none" stroke="#4a4a52" strokeWidth="3" />
      <rect x="286" y="188" width="38" height="10" fill="#f4c430" opacity="0.6" />

      {/* 落ち続ける硬貨。**ここだけが動く。** */}
      <g fill="#f4c430" stroke="#8a6a1c" strokeWidth="1">
        <circle className="vvc-coin vvc-coin-1" cx="305" cy="140" r="6" />
        <circle className="vvc-coin vvc-coin-2" cx="298" cy="132" r="5" />
        <circle className="vvc-coin vvc-coin-3" cx="312" cy="128" r="5.5" />
      </g>

      <style>{`
        .vvc-coin {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .vvc-coin-1 { animation: vvc-drop 1.6s ease-in infinite; }
        .vvc-coin-2 { animation: vvc-drop 1.6s ease-in infinite 0.5s; }
        .vvc-coin-3 { animation: vvc-drop 1.6s ease-in infinite 1s; }
        @keyframes vvc-drop {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          75% { transform: translateY(50px) rotate(200deg); opacity: 1; }
          85% { transform: translateY(56px) rotate(220deg) scaleY(0.3); opacity: 0.5; }
          90%, 100% { transform: translateY(0) rotate(0deg); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .vvc-coin { animation: none; opacity: 0; }
        }
      `}</style>
    </svg>
  );
}
