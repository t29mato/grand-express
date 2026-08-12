/**
 * イスタンブールの渋滞にはまる。三車線が理由もなく一車線に減り、
 * ドルムシュのラジオは同じ渋滞情報を繰り返す。
 *
 * 事故や怒りではなく、**動かない車の列と点滅するブレーキランプ**で
 * 足止めを表す。動くのは、点滅するブレーキランプ1つだけ。
 */
export function TurkeyTrafik() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夕暮れの空。 */}
      <rect width="400" height="210" fill="#e8a878" />
      <rect y="0" width="400" height="90" fill="#f5d4a8" />
      <circle cx="340" cy="50" r="20" fill="#f5b31c" opacity="0.8" />

      {/* 高架橋の遠景。 */}
      <g fill="#7f8896" opacity="0.7">
        <rect x="20" y="70" width="26" height="60" />
        <rect x="60" y="54" width="22" height="76" />
        <rect x="300" y="66" width="24" height="64" />
      </g>

      {/* 道路。 */}
      <rect y="130" width="400" height="80" fill="#5a5a5a" />
      <g stroke="#e8dcc0" strokeWidth="3" strokeDasharray="16 12" opacity="0.7">
        <path d="M0,150h400" />
        <path d="M0,190h400" />
      </g>

      {/* 動かない車の列(手前)。 */}
      <g strokeLinejoin="round">
        <rect x="20" y="160" width="60" height="24" rx="4" fill="#5b8fe8" stroke="#20364a" strokeWidth="2" />
        <rect x="30" y="152" width="40" height="12" rx="3" fill="#bfe0f0" stroke="#20364a" strokeWidth="1.6" />
        <circle cx="34" cy="184" r="6" fill="#241a10" />
        <circle cx="66" cy="184" r="6" fill="#241a10" />
      </g>
      <g strokeLinejoin="round">
        <rect x="110" y="158" width="70" height="26" rx="4" fill="#f5b31c" stroke="#20364a" strokeWidth="2" />
        <rect x="122" y="150" width="46" height="12" rx="3" fill="#bfe0f0" stroke="#20364a" strokeWidth="1.6" />
        <circle cx="126" cy="184" r="6.4" fill="#241a10" />
        <circle cx="164" cy="184" r="6.4" fill="#241a10" />
      </g>
      <g strokeLinejoin="round">
        <rect x="220" y="156" width="90" height="30" rx="4" fill="#f6efe2" stroke="#20364a" strokeWidth="2" />
        <rect x="228" y="148" width="20" height="12" fill="#bfe0f0" stroke="#20364a" strokeWidth="1.4" />
        <rect x="252" y="148" width="20" height="12" fill="#bfe0f0" stroke="#20364a" strokeWidth="1.4" />
        <rect x="276" y="148" width="20" height="12" fill="#bfe0f0" stroke="#20364a" strokeWidth="1.4" />
        <circle cx="240" cy="186" r="7" fill="#241a10" />
        <circle cx="290" cy="186" r="7" fill="#241a10" />
        {/* ドルムシュのアンテナ */}
        <line x1="230" y1="148" x2="226" y2="132" stroke="#20364a" strokeWidth="1.6" />
      </g>

      {/* 運転手、退屈して頬杖。 */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <circle cx="252" cy="140" r="8" fill="#d9a273" stroke="#20364a" strokeWidth="2" />
        <path d="M252,146 L246,156" stroke="#d9a273" strokeWidth="6" fill="none" />
      </g>

      {/* 点滅するブレーキランプ。**ここだけが動く。** */}
      <g className="trf-brake">
        <rect x="16" y="167" width="6" height="8" rx="1.4" fill="#e8443f" />
        <rect x="76" y="167" width="6" height="8" rx="1.4" fill="#e8443f" />
      </g>

      <style>{`
        .trf-brake {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: trf-blink 1.4s steps(2, jump-none) infinite;
        }
        @keyframes trf-blink {
          0%, 49%  { opacity: 1; }
          50%, 100% { opacity: 0.25; }
        }
        @media (prefers-reduced-motion: reduce) {
          .trf-brake { animation: none; opacity: 1; }
        }
      `}</style>
    </svg>
  );
}
