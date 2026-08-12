/**
 * 霧でフェリーが港に足止め。海霧が港の入口を隠すほど濃く立ち込め、
 * 視界が晴れるまで岸壁で待たされる。
 *
 * フェリーを壊さず、**流れる霧と汽笛の輪**で「先へ進めず待たされている」
 * ことを示す。動くのは、港をおおう霧の帯と、汽笛の音の輪。
 */
export function UkFogDelay() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 灰色にかすんだ空。 */}
      <rect width="400" height="210" fill="#8a949c" />
      <rect y="0" width="400" height="100" fill="#9aa4ac" />

      {/* 岸壁。 */}
      <rect y="150" width="400" height="14" fill="#8a8478" />
      <rect y="164" width="400" height="46" fill="#6b6558" />
      <rect x="60" y="130" width="8" height="20" fill="#4a4f56" />
      <rect x="330" y="130" width="8" height="20" fill="#4a4f56" />

      {/* 海。 */}
      <rect y="120" width="400" height="30" fill="#4a6f8f" />
      <g stroke="#7fa8c4" strokeWidth="1.6" opacity="0.6">
        <line x1="20" y1="128" x2="70" y2="128" />
        <line x1="120" y1="134" x2="180" y2="134" />
        <line x1="250" y1="126" x2="300" y2="126" />
      </g>

      {/* 待たされているフェリー(小さく上下に揺れる)。 */}
      <g className="ukg-ferry" strokeLinejoin="round">
        <rect x="140" y="108" width="110" height="26" rx="3" fill="#f6efe2" stroke="#3a3540" strokeWidth="2" />
        <rect x="165" y="90" width="60" height="18" fill="#5b8fe8" stroke="#3a3540" strokeWidth="1.8" />
        <rect x="180" y="76" width="10" height="16" fill="#e8443f" />
        <rect x="150" y="114" width="16" height="10" fill="#3f7fae" opacity="0.7" />
        <rect x="172" y="114" width="16" height="10" fill="#3f7fae" opacity="0.7" />
        <rect x="200" y="114" width="16" height="10" fill="#3f7fae" opacity="0.7" />
      </g>

      {/* 汽笛の音の輪。**ここが動く。** */}
      <g className="ukg-horn1" fill="none" stroke="#f6efe2" strokeWidth="1.6">
        <circle cx="190" cy="86" r="6" />
      </g>
      <g className="ukg-horn2" fill="none" stroke="#f6efe2" strokeWidth="1.4">
        <circle cx="190" cy="86" r="6" />
      </g>

      {/* 灯台(かすかに見える)。 */}
      <rect x="20" y="120" width="8" height="30" fill="#e8e2d0" opacity="0.6" />
      <circle cx="24" cy="118" r="4" fill="#f5b31c" opacity="0.6" />

      {/* 港を覆う霧の帯。**ここも動く。** */}
      <g className="ukg-fog1" fill="#dfe4e0" opacity="0.75">
        <ellipse cx="80" cy="110" rx="70" ry="16" />
      </g>
      <g className="ukg-fog2" fill="#e8ece8" opacity="0.7">
        <ellipse cx="260" cy="100" rx="90" ry="20" />
      </g>
      <g className="ukg-fog3" fill="#dfe4e0" opacity="0.65">
        <ellipse cx="180" cy="130" rx="100" ry="14" />
      </g>

      <style>{`
        .ukg-ferry {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: ukg-bob 3.2s ease-in-out infinite;
        }
        @keyframes ukg-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(3px); }
        }
        .ukg-horn1, .ukg-horn2 {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .ukg-horn1 { animation: ukg-ring 2.6s ease-out infinite; }
        .ukg-horn2 { animation: ukg-ring 2.6s ease-out infinite 1.3s; }
        @keyframes ukg-ring {
          0%   { transform: scale(0.4); opacity: 0.9; }
          100% { transform: scale(4.4); opacity: 0; }
        }
        .ukg-fog1 { transform-box: fill-box; animation: ukg-drift1 6s linear infinite; }
        .ukg-fog2 { transform-box: fill-box; animation: ukg-drift2 8s linear infinite; }
        .ukg-fog3 { transform-box: fill-box; animation: ukg-drift3 7s linear infinite; }
        @keyframes ukg-drift1 {
          0% { transform: translateX(-30px); }
          50% { transform: translateX(30px); }
          100% { transform: translateX(-30px); }
        }
        @keyframes ukg-drift2 {
          0% { transform: translateX(20px); }
          50% { transform: translateX(-40px); }
          100% { transform: translateX(20px); }
        }
        @keyframes ukg-drift3 {
          0% { transform: translateX(-40px); }
          50% { transform: translateX(20px); }
          100% { transform: translateX(-40px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ukg-ferry { animation: none; }
          .ukg-horn1, .ukg-horn2 { animation: none; opacity: 0; }
          .ukg-fog1, .ukg-fog2, .ukg-fog3 { animation: none; }
        }
      `}</style>
    </svg>
  );
}
