/**
 * 火山灰が列車を止める。遠くの火山が灰を噴き上げ、
 * 灰色の粉が線路とホームに積もり、駅員が窓枠を拭く様子で伝える。
 * 噴火そのものの脅威(溶岩・噴石)は描かない。
 *
 * 動くのは、火山から立ちのぼる灰の帯と、拭く手だけ。
 */
export function NorthamericaCenizas() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 灰色がかった空。 */}
      <rect width="400" height="210" fill="#a8a090" />
      <rect y="0" width="400" height="90" fill="#bcb4a2" />

      {/* 遠景の火山。 */}
      <path d="M240,90 L300,20 L360,90z" fill="#7a7264" />
      <path d="M292,32 L300,20 L308,32z" fill="#e05252" opacity="0.7" />

      {/* 火山から立ちのぼる灰の帯。 */}
      <g className="cen-plume" fill="#8a8272" opacity="0.7">
        <ellipse cx="300" cy="16" rx="10" ry="8" />
        <ellipse cx="292" cy="0" rx="16" ry="10" />
        <ellipse cx="308" cy="-16" rx="22" ry="12" />
      </g>

      {/* 地面。灰が積もっている。 */}
      <rect y="130" width="400" height="80" fill="#948c7c" />
      <rect y="130" width="400" height="6" fill="#b8b0a0" />

      {/* ホームに止まった列車(簡略)。 */}
      <g strokeLinejoin="round">
        <rect x="20" y="150" width="150" height="30" rx="4" fill="#5b8fe8" stroke="#20364a" strokeWidth="2.5" />
        <rect x="32" y="156" width="30" height="16" fill="#e2ecef" stroke="#20364a" strokeWidth="1.6" />
        <rect x="72" y="156" width="30" height="16" fill="#e2ecef" stroke="#20364a" strokeWidth="1.6" />
        <circle cx="45" cy="182" r="8" fill="#20364a" />
        <circle cx="145" cy="182" r="8" fill="#20364a" />
        {/* 積もった灰。 */}
        <ellipse cx="95" cy="150" rx="76" ry="5" fill="#c8c0ac" opacity="0.85" />
      </g>

      {/* 窓枠を拭く手と布。 */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <rect x="230" y="140" width="34" height="24" rx="2" fill="#e2ecef" stroke="#20364a" strokeWidth="2" />
        <g className="cen-wipe">
          <path d="M228,150 L214,130" stroke="#d9a273" strokeWidth="9" fill="none" />
          <rect x="204" y="120" width="26" height="18" rx="3" fill="#f6efe2" stroke="#20364a" strokeWidth="2" />
        </g>
      </g>

      {/* 降り積もる灰粒。 */}
      <g className="cen-ash" fill="#c8c0ac" opacity="0.8">
        <circle cx="120" cy="40" r="2.4" />
        <circle cx="170" cy="60" r="2.4" />
        <circle cx="210" cy="30" r="2.4" />
        <circle cx="60" cy="70" r="2.4" />
      </g>

      <style>{`
        .cen-plume {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: cen-rise 3s ease-out infinite;
        }
        @keyframes cen-rise {
          0% { transform: translateY(20px) scale(0.6); opacity: 0.2; }
          60% { opacity: 0.75; }
          100% { transform: translateY(-40px) scale(1.4); opacity: 0; }
        }
        .cen-wipe {
          transform-box: fill-box;
          transform-origin: 100% 100%;
          animation: cen-swipe 1.3s ease-in-out infinite;
        }
        @keyframes cen-swipe {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(28px); }
        }
        .cen-ash {
          animation: cen-drift 2.4s linear infinite;
        }
        @keyframes cen-drift {
          0% { transform: translateY(-10px); opacity: 0; }
          30% { opacity: 0.8; }
          100% { transform: translateY(90px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cen-plume, .cen-wipe, .cen-ash { animation: none; }
        }
      `}</style>
    </svg>
  );
}
