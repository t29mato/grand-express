/**
 * 山道が地滑りで塞がれる。一週間の雨で緩んだ斜面が夜のうちに崩れ、
 * 二車線の道路の一区間が土砂に埋まる。バスは立ち往生し、小石はまだ
 * ぱらぱらと転がり落ち続けている。
 *
 * 動くのは、斜面を転がり落ち続ける小石(数個のループ)だけ。
 */
export function VenezuelaDerrumbeAndino() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 空。 */}
      <rect width="400" height="210" fill="#8fa8b8" />
      <rect y="0" width="400" height="70" fill="#a8bcc8" />
      <g fill="#c4d0d4" opacity="0.85">
        <ellipse cx="70" cy="34" rx="46" ry="12" />
        <ellipse cx="320" cy="24" rx="56" ry="14" />
      </g>

      {/* 斜面(左が山、右が谷)。 */}
      <path d="M0,60 L170,60 L120,210 L0,210 z" fill="#5f6a4a" />
      <path d="M170,60 L400,20 L400,210 L120,210 z" fill="#8a8478" />

      {/* 道路。 */}
      <path d="M0,150 L400,90 L400,120 L0,180 z" fill="#6b6a60" />
      <g stroke="#e2c48a" strokeWidth="2" strokeDasharray="14 10">
        <path d="M0,165 L400,105" fill="none" />
      </g>

      {/* 立ち往生したバス。 */}
      <g strokeLinejoin="round">
        <rect x="20" y="128" width="80" height="34" rx="4" fill="#5b8fe8" stroke="#20364a" strokeWidth="2" />
        <rect x="28" y="134" width="18" height="14" fill="#cfe4f0" />
        <rect x="50" y="134" width="18" height="14" fill="#cfe4f0" />
        <rect x="72" y="134" width="18" height="14" fill="#cfe4f0" />
        <circle cx="36" cy="164" r="7" fill="#20364a" />
        <circle cx="86" cy="164" r="7" fill="#20364a" />
      </g>

      {/* 土砂の山(道路をふさぐ)。 */}
      <path
        d="M150,180 Q190,80 250,70 Q300,64 320,110 Q340,150 300,180 Q220,200 150,180 z"
        fill="#8a6a4c"
        stroke="#5f4a36"
        strokeWidth="2"
      />
      <g fill="#5f4a36" opacity="0.6">
        <ellipse cx="210" cy="150" rx="18" ry="8" />
        <ellipse cx="260" cy="160" rx="22" ry="9" />
      </g>

      {/* 倒れた木。 */}
      <rect x="230" y="96" width="90" height="10" rx="3" fill="#6b5330" transform="rotate(-8 275 101)" />

      {/* 転がり落ちる小石。**ここだけが動く。** */}
      <g fill="#4a4a52">
        <circle className="vda-rock vda-rock-1" cx="220" cy="70" r="4" />
        <circle className="vda-rock vda-rock-2" cx="245" cy="65" r="3.4" />
        <circle className="vda-rock vda-rock-3" cx="270" cy="75" r="5" />
      </g>

      <style>{`
        .vda-rock {
          transform-box: fill-box;
          transform-origin: 50% 0%;
        }
        .vda-rock-1 { animation: vda-fall1 1.8s linear infinite; }
        .vda-rock-2 { animation: vda-fall2 2.2s linear infinite 0.4s; }
        .vda-rock-3 { animation: vda-fall3 1.5s linear infinite 0.9s; }
        @keyframes vda-fall1 {
          0% { transform: translate(0, 0); opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(-16px, 90px); opacity: 0; }
        }
        @keyframes vda-fall2 {
          0% { transform: translate(0, 0); opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(10px, 100px); opacity: 0; }
        }
        @keyframes vda-fall3 {
          0% { transform: translate(0, 0); opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(-8px, 80px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .vda-rock { animation: none; }
        }
      `}</style>
    </svg>
  );
}
