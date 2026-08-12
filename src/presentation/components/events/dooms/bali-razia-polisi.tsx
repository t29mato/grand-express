/**
 * 検問(ラジア)に止められる。バリケードが下り、警官が手を挙げてバイクを
 * 止める。ライダーは免許証を差し出す。
 *
 * 動くのは、バイクの接近と停止、バリケードの上下だけ。
 */
export function BaliRaziaPolisi() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夕方の空。 */}
      <rect width="400" height="210" fill="#e8a94a" />
      <rect y="0" width="400" height="90" fill="#f0c07a" />

      {/* 道路。 */}
      <rect y="120" width="400" height="90" fill="#4a4a52" />
      <g stroke="#e8dcc0" strokeWidth="4" strokeDasharray="26 20">
        <path d="M0,164h400" />
      </g>

      {/* 警官(道端、右寄り)。手を挙げて止める。 */}
      <g strokeLinejoin="round">
        <ellipse cx="330" cy="196" rx="12" ry="3" fill="#000" opacity="0.16" />
        <path d="M323,192q7,-3.4 14,0l-2,-18q-5,-2.6 -10,0z" fill="#4a5f3a" />
        <circle cx="330" cy="168" r="6" fill="#a8763a" />
        <path d="M324,164q6,-4 12,0" fill="#20364a" />
        <rect x="325.6" y="192" width="3.6" height="6" fill="#3a3446" />
        <rect x="331" y="192" width="3.6" height="6" fill="#3a3446" />
        {/* 挙げた腕。 */}
        <path d="M336,180l12,-14" stroke="#a8763a" strokeWidth="4" strokeLinecap="round" />
      </g>

      {/* バリケード(縞模様の腕木、上下する)。位置決めは外側の g、回転は内側のクラスで分ける。 */}
      <g transform="translate(280,150)">
        <rect x="-4" y="-4" width="8" height="30" fill="#6b6b74" />
        <g className="bri-gate">
          <rect x="-70" y="-8" width="76" height="10" fill="#e8443f" />
          <g fill="#f6efe2">
            <rect x="-64" y="-8" width="10" height="10" />
            <rect x="-44" y="-8" width="10" height="10" />
            <rect x="-24" y="-8" width="10" height="10" />
            <rect x="-4" y="-8" width="10" height="10" />
          </g>
        </g>
      </g>

      {/* バイクとライダー(左から近づき、手前で止まる)。 */}
      <g className="bri-bike">
        <circle cx="60" cy="196" r="12" fill="#241a10" />
        <circle cx="110" cy="196" r="12" fill="#241a10" />
        <rect x="58" y="176" width="54" height="6" fill="#4a7bd0" />
        <path d="M58,182l-10,14M112,182l8,14" stroke="#20364a" strokeWidth="3" fill="none" />
        <ellipse cx="86" cy="204" rx="16" ry="3" fill="#000" opacity="0.16" />
        {/* ライダー。 */}
        <path d="M78,176q8,-4 16,0l-2,-18q-6,-3 -12,0z" fill="#e8443f" />
        <circle cx="86" cy="150" r="7" fill="#3a3446" />
        <rect x="82" y="144" width="8" height="5" rx="2" fill="#20364a" />
      </g>

      <style>{`
        .bri-bike {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: bri-approach 3.4s ease-in-out infinite;
        }
        @keyframes bri-approach {
          0% { transform: translateX(-30px); }
          55% { transform: translateX(70px); }
          100% { transform: translateX(70px); }
        }
        .bri-gate {
          transform-box: fill-box;
          transform-origin: 100% 100%;
          animation: bri-gate-up 3.4s ease-in-out infinite;
        }
        @keyframes bri-gate-up {
          0% { transform: translate(280px,150px) rotate(-55deg); }
          40% { transform: translate(280px,150px) rotate(-55deg); }
          60% { transform: translate(280px,150px) rotate(0deg); }
          100% { transform: translate(280px,150px) rotate(0deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .bri-bike { animation: none; transform: translateX(70px); }
          .bri-gate { animation: none; transform: translate(280px,150px) rotate(0deg); }
        }
      `}</style>
    </svg>
  );
}
