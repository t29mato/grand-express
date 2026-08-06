/** 屋根の雪を下ろしてもらう。落ちると危ないので業者に頼む。 */
export function RoofSnowClearing() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      <rect width="400" height="210" fill="#2d3a56" />
      <rect width="400" height="92" fill="#3d4b6d" />
      <rect y="92" width="400" height="118" fill="#e6edf7" />

      {/* 雪の重みでたわむ屋根の家 */}
      <g>
        <rect x="96" y="112" width="180" height="76" fill="#6b5a44" />
        <rect x="118" y="132" width="34" height="30" rx="3" fill="#f5d06a" />
        <rect x="222" y="132" width="34" height="30" rx="3" fill="#f5d06a" />
        <path d="M84,112L186,58L288,112z" fill="#4f4233" />
        {/* 分厚い積雪 */}
        <path className="sn-cap" d="M84,112L186,58L288,112c-30,-4 -60,-22 -102,-22s-72,18 -102,22z" fill="#f8fbff" />
      </g>

      {/* 屋根の上で雪を放る人 */}
      <g className="sn-worker" transform="translate(196,70)">
        <circle cy="-30" r="9" fill="#f6efe2" />
        <rect x="-8" y="-21" width="16" height="22" rx="5" fill="#e8443f" />
        <rect className="sn-shovel" x="6" y="-18" width="5" height="26" rx="2" fill="#8a6a3c" />
      </g>

      {/* 放られた雪の塊 */}
      <g className="sn-throw" fill="#f8fbff">
        <circle className="sn-c1" cx="230" cy="60" r="9" />
        <circle className="sn-c2" cx="230" cy="60" r="7" />
      </g>

      <style>{`
        .sn-cap { transform-box: fill-box; transform-origin: 50% 100%; animation: sn-sag 4s ease-in-out infinite; }
        .sn-worker { animation: sn-heave 1.4s ease-in-out infinite; }
        .sn-shovel { transform-box: fill-box; transform-origin: 50% 0; animation: sn-swing 1.4s ease-in-out infinite; }
        .sn-c1 { animation: sn-toss 1.4s ease-out infinite; }
        .sn-c2 { animation: sn-toss 1.4s ease-out infinite; animation-delay: -0.7s; }

        @keyframes sn-sag { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(1.07); } }
        @keyframes sn-heave { 0%, 100% { transform: translate(196px, 70px); } 50% { transform: translate(196px, 66px); } }
        @keyframes sn-swing { 0%, 100% { transform: rotate(-18deg); } 50% { transform: rotate(28deg); } }
        @keyframes sn-toss {
          0% { transform: translate(0, 0) scale(0.6); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translate(86px, 74px) scale(1); opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .sn-cap, .sn-worker, .sn-shovel, .sn-c1, .sn-c2 { animation: none; }
          .sn-c1 { transform: translate(50px, 40px); }
          .sn-c2 { transform: translate(76px, 64px); }
        }
      `}</style>
    </svg>
  );
}
