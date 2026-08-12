/**
 * まったく違うバスに乗ってしまう(サラナイク)。よく似た二台のバスが並び、
 * 人影が右側のバスに乗り込む。ドアが閉まり、そのバスだけ走り去っていく。
 *
 * 動くのは人影が乗り込む動き、ドアの開閉、バスの発車だけ。
 */
export function IndonesiaSalahnaik() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 昼の空。 */}
      <rect width="400" height="210" fill="#8fc4e8" />
      <rect y="0" width="400" height="90" fill="#cfe4f0" />

      {/* 停留所の屋根。 */}
      <rect x="40" y="80" width="140" height="8" fill="#6b7060" />
      <g stroke="#4a4f42" strokeWidth="3">
        <line x1="50" y1="88" x2="50" y2="140" />
        <line x1="170" y1="88" x2="170" y2="140" />
      </g>

      {/* 地面。 */}
      <rect y="140" width="400" height="70" fill="#8a8f95" />
      <rect y="130" width="400" height="10" fill="#4a4a52" />

      {/* バス1(奥、左行き)。 */}
      <g strokeLinejoin="round">
        <rect x="30" y="96" width="120" height="44" rx="6" fill="#c9a877" stroke="#20364a" strokeWidth="2.4" />
        <rect x="40" y="104" width="24" height="18" fill="#bfe0f0" />
        <rect x="70" y="104" width="24" height="18" fill="#bfe0f0" />
        <rect x="100" y="104" width="24" height="18" fill="#bfe0f0" />
        <circle cx="50" cy="144" r="8" fill="#241a10" />
        <circle cx="130" cy="144" r="8" fill="#241a10" />
      </g>

      {/* バス2(手前、右行き)。 */}
      <g strokeLinejoin="round">
        <rect x="230" y="100" width="130" height="46" rx="6" fill="#5b8fe8" stroke="#20364a" strokeWidth="2.4" />
        <rect x="242" y="108" width="26" height="18" fill="#bfe0f0" />
        <rect x="274" y="108" width="26" height="18" fill="#bfe0f0" />
        <rect x="306" y="108" width="26" height="18" fill="#bfe0f0" />
        <circle cx="252" cy="150" r="8" fill="#241a10" />
        <circle cx="338" cy="150" r="8" fill="#241a10" />
        {/* ドア(開閉する)。 */}
        <rect className="idn-sn-door" x="228" y="112" width="8" height="30" fill="#3a5f8a" />
      </g>

      {/* 人影(歩いてバス2に乗り込む)。 */}
      <g className="idn-sn-person">
        <circle cx="0" cy="128" r="6" fill="#f6efe2" />
        <rect x="-4" y="134" width="8" height="16" rx="2" fill="#e8443f" />
        <rect x="-4" y="150" width="3" height="12" fill="#3a2f24" />
        <rect x="1" y="150" width="3" height="12" fill="#3a2f24" />
      </g>

      <style>{`
        .idn-sn-door {
          transform-box: fill-box;
          transform-origin: 0% 50%;
          animation: idn-sn-open 3.8s ease-in-out infinite;
        }
        @keyframes idn-sn-open {
          0%, 15% { transform: scaleX(1); }
          25%, 68% { transform: scaleX(0.15); }
          78%, 100% { transform: scaleX(1); }
        }
        .idn-sn-person {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: idn-sn-walk 3.8s ease-in-out infinite;
        }
        @keyframes idn-sn-walk {
          0% { transform: translateX(190px); opacity: 1; }
          25% { transform: translateX(238px); opacity: 1; }
          32% { transform: translateX(238px); opacity: 0; }
          100% { transform: translateX(238px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .idn-sn-door { animation: none; transform: scaleX(0.15); }
          .idn-sn-person { animation: none; opacity: 0; }
        }
      `}</style>
    </svg>
  );
}
