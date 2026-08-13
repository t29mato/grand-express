/**
 * 濃霧が登山道を呑み込む。稜線が真っ白な壁の向こうへ消え、頼れるのは
 * 岩に描かれたペンキ印だけになる。
 *
 * 崩落や滑落そのものは描かない。**霧に立ち止まり、道標を探して
 * 辺りを見回す人**だけで「迷いかけている」ことを示す
 * (`04-doom-animation-guide.md` の方針どおり)。動くのは、
 * 流れて濃さを変える霧の帯だけ。
 */
export function HyakumeizanKirimayoi() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 曇った空。 */}
      <rect width="400" height="210" fill="#8a949a" />
      <rect y="0" width="400" height="90" fill="#a4aeb2" />

      {/* かすむ稜線。 */}
      <path d="M0,120 L60,80 L120,104 L180,64 L240,100 L300,72 L360,96 L400,84 L400,210 L0,210z" fill="#6a747a" opacity="0.7" />

      {/* 手前の岩の地面。 */}
      <rect y="150" width="400" height="60" fill="#5a6268" />
      <g fill="#4c545a">
        <ellipse cx="70" cy="176" rx="26" ry="8" />
        <ellipse cx="330" cy="188" rx="30" ry="9" />
      </g>

      {/* 傾いた道標(ペンキ印の柱)。 */}
      <g strokeLinecap="round">
        <rect x="296" y="130" width="6" height="46" fill="#5a4630" />
        <rect x="292" y="140" width="14" height="7" fill="#e05252" opacity="0.9" />
      </g>

      {/* 立ち止まって辺りを見回す登山者。 */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <path d="M186,168 L182,198" stroke="#2f3a42" strokeWidth="9" fill="none" />
        <path d="M196,168 L202,198" stroke="#3a4650" strokeWidth="9" fill="none" />
        <path d="M190,140 L190,170" stroke="#4a5568" strokeWidth="20" fill="none" />
        <rect x="178" y="138" width="14" height="22" rx="3" fill="#8b6a44" />
        <circle cx="190" cy="126" r="11" fill="#d9a273" stroke="#2f3a42" strokeWidth="2" />
        <path d="M180,144 L166,132" stroke="#d9a273" strokeWidth="7" fill="none" />
        <path d="M200,144 L214,150" stroke="#d9a273" strokeWidth="7" fill="none" />
      </g>

      {/* 霧の帯。**ここだけが動く。** */}
      <g className="hkm-fog1" fill="#eef2f2">
        <ellipse cx="120" cy="120" rx="140" ry="30" />
      </g>
      <g className="hkm-fog2" fill="#eef2f2">
        <ellipse cx="280" cy="150" rx="160" ry="34" />
      </g>
      <g className="hkm-fog3" fill="#f4f6f6">
        <ellipse cx="200" cy="100" rx="200" ry="26" />
      </g>

      <style>{`
        .hkm-fog1, .hkm-fog2, .hkm-fog3 {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .hkm-fog1 { animation: hkm-drift1 5s ease-in-out infinite; }
        .hkm-fog2 { animation: hkm-drift2 6.5s ease-in-out infinite; }
        .hkm-fog3 { animation: hkm-drift3 4s ease-in-out infinite; }
        @keyframes hkm-drift1 {
          0%, 100% { transform: translateX(-30px); opacity: 0.55; }
          50% { transform: translateX(30px); opacity: 0.85; }
        }
        @keyframes hkm-drift2 {
          0%, 100% { transform: translateX(20px); opacity: 0.5; }
          50% { transform: translateX(-40px); opacity: 0.8; }
        }
        @keyframes hkm-drift3 {
          0%, 100% { transform: translateX(-10px); opacity: 0.4; }
          50% { transform: translateX(10px); opacity: 0.7; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hkm-fog1, .hkm-fog2, .hkm-fog3 { animation: none; opacity: 0.65; }
        }
      `}</style>
    </svg>
  );
}
