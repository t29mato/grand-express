/**
 * 検問の袖の下。州境の検問所で、サングラスの係官が手のひらを上に向け、
 * 旅人の財布から硬貨が弧を描いて渡っていく。
 *
 * 動くのは3つ: 弧を描いて飛ぶ硬貨(2枚ずらし)、係官の催促の手つき、
 * 旅人の肩の小さなため息。止めても「差し出された手と財布」で伝わる。
 */
export function AfricaCheckpoint() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夕方前の乾いた道。 */}
      <rect width="400" height="210" fill="#b8925a" />
      <rect width="400" height="90" fill="#e8c890" />
      <circle cx="60" cy="40" r="16" fill="#f5d06a" opacity="0.9" />

      {/* 中景: 丘とトタン屋根の売店、待つミニバス。 */}
      <path d="M0,90 q90,-16 200,-6 q110,10 200,-6 v16 H0z" fill="#a8845a" />
      <g>
        <rect x="18" y="72" width="44" height="22" fill="#c9a877" />
        <path d="M14,72 h52 l-8,-9 h-36z" fill="#8a8478" />
        <rect x="32" y="80" width="12" height="14" fill="#4a3a2c" />
      </g>
      <g>
        <rect x="300" y="96" width="76" height="26" rx="4" fill="#f5b31c" />
        <rect x="300" y="105" width="76" height="4" fill="#20364a" />
        <g fill="#8fd0dc">
          <rect x="308" y="99" width="12" height="7" />
          <rect x="326" y="99" width="12" height="7" />
          <rect x="344" y="99" width="12" height="7" />
        </g>
        <circle cx="316" cy="122" r="5.5" fill="#2e2a26" />
        <circle cx="358" cy="122" r="5.5" fill="#2e2a26" />
      </g>

      {/* 地面と検問のゲート。 */}
      <rect y="104" width="400" height="106" fill="#b8925a" />
      <path d="M0,150 h400 v22 H0z" fill="#a8845a" />
      <g>
        <rect x="60" y="98" width="8" height="52" fill="#5a5f52" />
        <rect x="64" y="102" width="140" height="7" rx="3.5" fill="#f6efe2" />
        <g fill="#e8443f">
          <rect x="76" y="102" width="16" height="7" />
          <rect x="108" y="102" width="16" height="7" />
          <rect x="140" y="102" width="16" height="7" />
          <rect x="172" y="102" width="16" height="7" />
        </g>
        {/* ドラム缶の車止め(二人のあいだ、手前寄り)。 */}
        <g>
          <rect x="184" y="152" width="18" height="24" rx="2" fill="#c8384f" />
          <ellipse cx="193" cy="152" rx="9" ry="3" fill="#e06a80" />
          <path d="M184,160 h18 M184,168 h18" stroke="#8a2436" strokeWidth="2" />
        </g>
      </g>

      {/* 係官。紺の制服・制帽・サングラス。手のひらを上へ。 */}
      <g transform="translate(272,0)">
        <circle cx="0" cy="118" r="8.5" fill="#5a4232" />
        <path d="M-9,113 q9,-8 18,0 l-2,-6 q-7,-5 -14,0z" fill="#2e3a50" />
        <rect x="-9" y="111" width="18" height="3" fill="#1c2434" />
        <path d="M-6,118 h5 M1,118 h5" stroke="#1c2026" strokeWidth="3.4" />
        <path d="M0,127 q-4,16 -3,36" stroke="#2e3a50" strokeWidth="12" fill="none" />
        <path d="M-4,162 l-6,22 M-2,162 l6,22" stroke="#1c2434" strokeWidth="6" fill="none" />
        <g className="africa-cp-hand">
          <path d="M-4,134 q-16,2 -26,10" stroke="#2e3a50" strokeWidth="6" fill="none" />
          <path d="M-30,142 q-6,2 -8,1 l1,4 q5,1 9,-2z" fill="#5a4232" />
        </g>
        <rect x="-6" y="140" width="12" height="4" fill="#f5b31c" />
      </g>

      {/* 旅人。柄物のチュニックと帽子、開いた財布。 */}
      <g transform="translate(120,0)">
        <g className="africa-cp-traveler">
          <circle cx="0" cy="116" r="8" fill="#6b4a34" />
          <path d="M-8,110 a8,4.4 0 0 1 16,0z" fill="#c96f2a" />
          <path d="M0,124 q3,16 2,38" stroke="#e8944a" strokeWidth="12" fill="none" />
          <g fill="#8a4a1c">
            <circle cx="-2" cy="132" r="1.6" />
            <circle cx="3" cy="140" r="1.6" />
            <circle cx="0" cy="149" r="1.6" />
          </g>
          <path d="M0,162 l-5,22 M2,162 l5,22" stroke="#5a3a26" strokeWidth="6" fill="none" />
          <path d="M3,128 q13,0 22,6" stroke="#e8944a" strokeWidth="6" fill="none" />
          {/* 開いた財布。 */}
          <path d="M22,132 l14,-2 1,9 -14,2z" fill="#8a5a3a" />
          <path d="M22,132 l15,7" stroke="#5a3a26" strokeWidth="1.6" />
        </g>
      </g>

      {/* 弧を描く硬貨。**ここが主に動く。** */}
      <g className="africa-cp-coin1">
        <circle cx="158" cy="130" r="5" fill="#f5b31c" />
        <circle cx="158" cy="130" r="2.4" fill="none" stroke="#c98a14" strokeWidth="1.4" />
      </g>
      <g className="africa-cp-coin2">
        <circle cx="158" cy="130" r="4.4" fill="#f5b31c" />
        <circle cx="158" cy="130" r="2" fill="none" stroke="#c98a14" strokeWidth="1.2" />
      </g>

      <style>{`
        .africa-cp-coin1 { animation: africa-cp-arc 2.4s ease-in-out infinite; }
        .africa-cp-coin2 { animation: africa-cp-arc 2.4s ease-in-out -1.2s infinite; }
        @keyframes africa-cp-arc {
          0% { transform: translate(0, 0); opacity: 0; }
          10% { opacity: 1; }
          35% { transform: translate(38px, -26px); }
          70% { transform: translate(76px, 6px); opacity: 1; }
          80% { transform: translate(80px, 12px); opacity: 0; }
          100% { transform: translate(80px, 12px); opacity: 0; }
        }
        .africa-cp-hand {
          transform-box: fill-box;
          transform-origin: 100% 20%;
          animation: africa-cp-beckon 2.4s ease-in-out infinite;
        }
        @keyframes africa-cp-beckon {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-7deg) translateY(-2px); }
        }
        .africa-cp-traveler {
          transform-box: fill-box;
          transform-origin: 50% 90%;
          animation: africa-cp-sigh 2.4s ease-in-out infinite;
        }
        @keyframes africa-cp-sigh {
          0%, 100% { transform: translateY(0); }
          20% { transform: translateY(-2.4px); }
          40% { transform: translateY(0.6px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .africa-cp-coin1,
          .africa-cp-coin2,
          .africa-cp-hand,
          .africa-cp-traveler { animation: none; }
        }
      `}</style>
    </svg>
  );
}
