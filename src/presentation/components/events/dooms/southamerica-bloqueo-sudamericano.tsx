/**
 * 一夜にして道路が封鎖される。タイヤが燃やされ、手書きの立て札が立ち、
 * 収まるのを待つか長い迂回路を探すしかない。
 *
 * 人を描かず、**積み上げたタイヤと丸太のバリケード、無地の立て札**で
 * 表す(文字は描かない)。動くのは、燃えるタイヤから立ちのぼる煙1つだけ。
 */
export function SouthamericaBloqueoSudamericano() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 曇りがちな空。 */}
      <rect width="400" height="210" fill="#9aa8a4" />
      <rect y="0" width="400" height="80" fill="#b4c0bc" />

      {/* 遠景の丘。 */}
      <path d="M0,90 Q100,60 200,90 Q300,64 400,90 L400,110 L0,110z" fill="#8a9a4a" opacity="0.7" />

      {/* 道路。 */}
      <rect y="110" width="400" height="100" fill="#7a7468" />
      <g stroke="#e2ddc8" strokeWidth="3" strokeDasharray="12 8" opacity="0.5">
        <line x1="0" y1="150" x2="400" y2="150" />
      </g>

      {/* バリケード(丸太)。 */}
      <g strokeLinejoin="round">
        <rect x="30" y="150" width="340" height="14" fill="#6b5330" stroke="#3a3f46" strokeWidth="2" />
        <rect x="30" y="166" width="340" height="14" fill="#5a4428" stroke="#3a3f46" strokeWidth="2" />
      </g>

      {/* 積み上げたタイヤ。 */}
      <g fill="#241a10" stroke="#141a26" strokeWidth="2">
        <circle cx="120" cy="146" r="16" />
        <circle cx="120" cy="146" r="7" fill="#3a3f46" />
        <circle cx="152" cy="150" r="14" />
        <circle cx="152" cy="150" r="6" fill="#3a3f46" />
      </g>

      {/* 無地の立て札(文字は描かない)。 */}
      <g strokeLinejoin="round">
        <line x1="260" y1="196" x2="260" y2="140" stroke="#6b5330" strokeWidth="4" />
        <rect x="234" y="118" width="56" height="34" fill="#e2ddc8" stroke="#3a3f46" strokeWidth="2.5" transform="rotate(-4 262 135)" />
        <g stroke="#8a8478" strokeWidth="2" opacity="0.6" transform="rotate(-4 262 135)">
          <line x1="242" y1="128" x2="280" y2="128" />
          <line x1="242" y1="138" x2="272" y2="138" />
        </g>
      </g>

      {/* 燃えるタイヤの炎。 */}
      <g>
        <path d="M112,132 q6,-10 0,-18 q-8,6 -4,14 q-6,-6 -2,-14 q-6,10 6,18z" fill="#e8443f" opacity="0.9" />
        <path d="M112,132 q4,-6 0,-11 q-5,4 -2,9z" fill="#f5b31c" opacity="0.9" />
      </g>

      {/* 燃えるタイヤから立ちのぼる煙。**ここだけが動く。** */}
      <g className="sa-bloqueo-smoke" fill="#4a4a52">
        <ellipse cx="112" cy="108" rx="12" ry="8" opacity="0.5" />
        <ellipse cx="118" cy="86" rx="18" ry="11" opacity="0.4" />
        <ellipse cx="108" cy="62" rx="24" ry="14" opacity="0.3" />
      </g>

      <style>{`
        .sa-bloqueo-smoke {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: sa-bloqueo-rise 3s ease-out infinite;
        }
        @keyframes sa-bloqueo-rise {
          0%   { transform: translateY(20px) scale(0.7); opacity: 0.6; }
          70%  { transform: translateY(-30px) scale(1.1); opacity: 0.35; }
          100% { transform: translateY(-45px) scale(1.2); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sa-bloqueo-smoke {
            animation: none;
            opacity: 0.4;
          }
        }
      `}</style>
    </svg>
  );
}
