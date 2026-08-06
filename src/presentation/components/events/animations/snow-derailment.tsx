/** 一晩の大雪で線路が埋まり、路線が止まる。 */
export function SnowDerailment() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      <rect width="400" height="210" fill="#2b3550" />
      <rect width="400" height="96" fill="#3a4667" />
      {/* 雪をかぶった山 */}
      <path d="M0,96L70,44L140,96z" fill="#4e5a7d" />
      <path d="M100,96L180,36L262,96z" fill="#586489" />
      <path d="M0,60L70,44L92,72z" fill="#e8eef6" />
      <path d="M148,58L180,36L214,60z" fill="#e8eef6" />

      {/* 積もった雪 */}
      <rect y="96" width="400" height="114" fill="#26304a" />
      <path className="sd-drift" d="M0,150c60,-22 120,-6 190,-16c70,-10 140,-2 210,10v66H0z" fill="#eef3fa" />
      {/* 雪から頭だけ出した列車 */}
      <g className="sd-train">
        <rect x="120" y="118" width="130" height="34" rx="7" fill="#c9463f" />
        <g fill="#cfe4f0">
          <rect x="132" y="126" width="18" height="12" rx="2" />
          <rect x="158" y="126" width="18" height="12" rx="2" />
          <rect x="184" y="126" width="18" height="12" rx="2" />
        </g>
        <rect x="120" y="146" width="130" height="8" fill="#8a2420" />
      </g>
      {/* 動かないことを示す赤信号 */}
      <rect x="300" y="104" width="6" height="54" fill="#46506e" />
      <circle className="sd-signal" cx="303" cy="102" r="10" fill="#e05252" />

      {/* 降りしきる雪 */}
      <g className="sd-snow" fill="#f6fbff">
        {[24, 66, 108, 150, 192, 234, 276, 318, 360].map((x, i) => (
          <circle key={x} className={`sd-f sd-f${i % 4}`} cx={x} cy="-8" r={i % 3 === 0 ? 4 : 3} />
        ))}
      </g>

      <style>{`
        .sd-train { transform-box: fill-box; transform-origin: center; animation: sd-settle 3.4s ease-in-out infinite; }
        .sd-signal { transform-box: fill-box; transform-origin: center; animation: sd-blink 1.2s steps(1) infinite; }
        .sd-drift { transform-box: fill-box; transform-origin: 50% 100%; animation: sd-pile 5s ease-in-out infinite; }
        .sd-f { animation: sd-fall 4s linear infinite; }
        .sd-f1 { animation-delay: -1s; }
        .sd-f2 { animation-delay: -2s; }
        .sd-f3 { animation-delay: -3s; }

        @keyframes sd-fall {
          0% { transform: translate(0, 0); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translate(-22px, 226px); opacity: 1; }
        }
        @keyframes sd-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0.25; } }
        @keyframes sd-settle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(3px); } }
        @keyframes sd-pile { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(1.06); } }

        @media (prefers-reduced-motion: reduce) {
          .sd-train, .sd-signal, .sd-drift, .sd-f { animation: none; }
          .sd-f { transform: translate(-12px, 120px); }
        }
      `}</style>
    </svg>
  );
}
