/**
 * 旅立ちの絵(出発のモーダル)。
 *
 * これから何が始まるのかを一枚で伝える。夜明けの駅から列車が動き出し、
 * 送る人が手を振り、線路が地平へ延びていく。
 */
export function DepartureScene() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜明けの空 */}
      <rect width="400" height="210" fill="#2b2547" />
      <rect width="400" height="104" fill="#4a3a63" />
      <circle className="dp-sun" cx="300" cy="104" r="30" fill="#f5b31c" opacity="0.9" />
      <g className="dp-clouds" fill="#5d4b7a" opacity="0.7">
        <ellipse cx="90" cy="40" rx="46" ry="12" />
        <ellipse cx="250" cy="28" rx="38" ry="10" />
      </g>

      {/* 遠くの山なみ */}
      <path d="M0,104L60,58L108,104z" fill="#39305c" />
      <path d="M90,104L150,44L214,104z" fill="#332b52" />
      <path d="M200,104L262,62L330,104z" fill="#39305c" />

      {/* ホームと線路 */}
      <rect y="104" width="400" height="34" fill="#3a3050" />
      <rect y="138" width="400" height="72" fill="#241f3c" />
      <rect y="150" width="400" height="6" fill="#5a4a70" />
      <g className="dp-sleepers" fill="#463a5e">
        {[0, 50, 100, 150, 200, 250, 300, 350].map((x) => (
          <rect key={x} x={x} y="158" width="30" height="7" rx="2" />
        ))}
      </g>

      {/* 見送る人 */}
      <g className="dp-waver">
        <circle cx="52" cy="86" r="9" fill="#f6efe2" />
        <rect x="44" y="95" width="16" height="22" rx="5" fill="#37b3a4" />
        <rect className="dp-arm" x="60" y="92" width="6" height="16" rx="3" fill="#f6efe2" />
      </g>

      {/* 走り出す列車 */}
      <g className="dp-train">
        <rect x="0" y="104" width="120" height="42" rx="8" fill="#e8443f" />
        <rect x="120" y="112" width="54" height="34" rx="6" fill="#c2352f" />
        <g fill="#cfe4f0">
          <rect x="12" y="114" width="20" height="15" rx="3" />
          <rect x="40" y="114" width="20" height="15" rx="3" />
          <rect x="68" y="114" width="20" height="15" rx="3" />
          <rect x="130" y="120" width="18" height="13" rx="3" />
        </g>
        <rect x="0" y="142" width="174" height="7" fill="#8a2420" />
        <g fill="#241a33">
          <circle cx="24" cy="152" r="7" />
          <circle cx="62" cy="152" r="7" />
          <circle cx="110" cy="152" r="7" />
          <circle cx="150" cy="152" r="7" />
        </g>
        <rect x="26" y="90" width="12" height="14" rx="2" fill="#241a33" />
      </g>

      {/* 煙 */}
      <g className="dp-smoke" fill="#c9c0dd">
        <circle className="dp-p1" cx="32" cy="86" r="9" />
        <circle className="dp-p2" cx="32" cy="86" r="11" />
        <circle className="dp-p3" cx="32" cy="86" r="13" />
      </g>

      <style>{`
        .dp-train { animation: dp-roll 5s ease-in infinite; }
        .dp-smoke { animation: dp-roll 5s ease-in infinite; }
        .dp-sleepers { animation: dp-slide 1.6s linear infinite; }
        .dp-clouds { animation: dp-drift 22s linear infinite; }
        .dp-sun { transform-box: fill-box; transform-origin: center; animation: dp-glow 4s ease-in-out infinite; }
        .dp-arm { transform-box: fill-box; transform-origin: 50% 0; animation: dp-wave 0.5s ease-in-out infinite; }
        .dp-p1 { animation: dp-puff 1.8s ease-out infinite; }
        .dp-p2 { animation: dp-puff 1.8s ease-out infinite; animation-delay: -0.6s; }
        .dp-p3 { animation: dp-puff 1.8s ease-out infinite; animation-delay: -1.2s; }

        @keyframes dp-roll {
          0% { transform: translateX(60px); }
          100% { transform: translateX(340px); }
        }
        @keyframes dp-slide { to { transform: translateX(-50px); } }
        @keyframes dp-drift { to { transform: translateX(-120px); } }
        @keyframes dp-glow { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.08); } }
        @keyframes dp-wave { 0%, 100% { transform: rotate(-24deg); } 50% { transform: rotate(24deg); } }
        @keyframes dp-puff {
          0% { transform: translate(0, 0) scale(0.5); opacity: 0.8; }
          100% { transform: translate(-46px, -46px) scale(1.7); opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .dp-train, .dp-smoke, .dp-sleepers, .dp-clouds, .dp-sun, .dp-arm,
          .dp-p1, .dp-p2, .dp-p3 { animation: none; }
          /* 止めても「これから出発する場面」として読めるところに置く。 */
          .dp-train, .dp-smoke { transform: translateX(120px); }
        }
      `}</style>
    </svg>
  );
}
