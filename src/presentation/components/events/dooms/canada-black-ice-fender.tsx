/**
 * ブラックアイスで滑ってフェンダーをへこます。街灯の下では濡れているだけに
 * 見えた路面で急に横滑りし、縁石に車体をぶつける。
 *
 * 動くのは横滑りする車と、ぶつかった瞬間の衝撃線だけ。
 */
export function CanadaBlackIceFender() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜の凍った道路。 */}
      <rect width="400" height="210" fill="#141a24" />
      <rect y="0" width="400" height="120" fill="#1c2634" />
      <rect y="120" width="400" height="90" fill="#232a34" />

      {/* 街灯。 */}
      <rect x="60" y="40" width="4" height="90" fill="#4a4f5a" />
      <circle cx="62" cy="38" r="10" fill="#f5e8c0" opacity="0.9" />
      <ellipse cx="62" cy="128" rx="40" ry="10" fill="#f5e8c0" opacity="0.15" />

      {/* 路面のブラックアイス(かすかな光沢)。 */}
      <ellipse cx="200" cy="170" rx="150" ry="14" fill="#3a4a58" opacity="0.5" />

      {/* 縁石。 */}
      <rect x="0" y="185" width="400" height="12" fill="#5a5f68" />

      {/* 横滑りするタイヤ痕(常に見える)。 */}
      <path d="M100,170 Q200,150 300,180" fill="none" stroke="#0f141c" strokeWidth="4" opacity="0.6" />

      {/* 車。ここが動く(左右に滑る)。 */}
      <g className="cif-car" strokeLinejoin="round">
        <path d="M170,168 L184,150 L246,150 L262,168z" fill="#5b8fe8" stroke="#0f141c" strokeWidth="2.5" />
        <rect x="168" y="166" width="100" height="18" rx="4" fill="#4a7bd0" stroke="#0f141c" strokeWidth="2.5" />
        <circle cx="188" cy="186" r="9" fill="#0f141c" />
        <circle cx="248" cy="186" r="9" fill="#0f141c" />
        <rect x="192" y="155" width="20" height="10" fill="#bfe0f0" opacity="0.7" />
        <circle cx="264" cy="172" r="3" fill="#f5e8c0" />
      </g>

      {/* 衝突の衝撃線。ここも動く。 */}
      <g className="cif-impact" stroke="#f5b31c" strokeWidth="2.5">
        <path d="M290,178l14,-8M292,186l16,0M290,194l14,8" />
      </g>

      <style>{`
        .cif-car {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: cif-skid 2.4s ease-in-out infinite;
        }
        @keyframes cif-skid {
          0% { transform: translateX(-70px) rotate(0deg); }
          55% { transform: translateX(20px) rotate(6deg); }
          70% { transform: translateX(30px) rotate(9deg); }
          72%, 100% { transform: translateX(30px) rotate(9deg); }
        }
        .cif-impact {
          opacity: 0;
          animation: cif-flash 2.4s steps(1) infinite;
        }
        @keyframes cif-flash {
          0%, 68% { opacity: 0; }
          72%, 88% { opacity: 1; }
          89%, 100% { opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cif-car, .cif-impact { animation: none; }
          .cif-car { transform: translateX(30px) rotate(9deg); }
          .cif-impact { opacity: 1; }
        }
      `}</style>
    </svg>
  );
}
