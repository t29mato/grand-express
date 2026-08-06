/**
 * すり鉢状の谷に広がる街(ラパス)に重ねる、夜の灯りとテレフェリコ。
 *
 * 斜面を埋めるレンガの家に、ひとつ、またひとつと窓の灯りがともる。
 * 谷の上ではロープウェイのゴンドラが一台、ゆっくり渡っていく。
 * 家そのものは背景が描いているので、ここでは灯りとゴンドラだけを重ねる。
 */
export function BoliviaCanyon() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 家々にともる窓の灯り(背景のレンガ家の中に収まる位置) */}
      <g fill="#f5d38a">
        <rect className="bolcany-win-a" x="57" y="185" width="3" height="3" opacity="0.85" />
        <rect className="bolcany-win-b" x="103" y="169" width="3" height="3" opacity="0.85" />
        <rect className="bolcany-win-c" x="149" y="151" width="3" height="3" opacity="0.85" />
        <rect className="bolcany-win-d" x="196" y="135" width="3" height="3" opacity="0.85" />
        <rect className="bolcany-win-e" x="242" y="196" width="3" height="3" opacity="0.85" />
        <rect className="bolcany-win-f" x="288" y="178" width="3" height="3" opacity="0.85" />
        <rect className="bolcany-win-g" x="334" y="162" width="3" height="3" opacity="0.85" />
        <rect className="bolcany-win-h" x="41" y="127" width="3" height="3" opacity="0.85" />
        <rect className="bolcany-win-a" x="87" y="189" width="3" height="3" opacity="0.85" />
        <rect className="bolcany-win-c" x="133" y="171" width="3" height="3" opacity="0.85" />
        <rect className="bolcany-win-e" x="180" y="155" width="3" height="3" opacity="0.85" />
        <rect className="bolcany-win-g" x="226" y="138" width="3" height="3" opacity="0.85" />
        <rect className="bolcany-win-b" x="272" y="198" width="3" height="3" opacity="0.85" />
        <rect className="bolcany-win-d" x="318" y="182" width="3" height="3" opacity="0.85" />
        <rect className="bolcany-win-f" x="369" y="129" width="3" height="3" opacity="0.85" />
        <rect className="bolcany-win-h" x="25" y="147" width="3" height="3" opacity="0.85" />
        <rect className="bolcany-win-b" x="71" y="131" width="3" height="3" opacity="0.85" />
        <rect className="bolcany-win-d" x="117" y="191" width="3" height="3" opacity="0.85" />
        <rect className="bolcany-win-f" x="164" y="175" width="3" height="3" opacity="0.85" />
        <rect className="bolcany-win-h" x="210" y="158" width="3" height="3" opacity="0.85" />
        <rect className="bolcany-win-a" x="256" y="140" width="3" height="3" opacity="0.85" />
        <rect className="bolcany-win-c" x="302" y="202" width="3" height="3" opacity="0.85" />
        <rect className="bolcany-win-e" x="353" y="149" width="3" height="3" opacity="0.85" />
      </g>

      {/* 灯りのにじみ */}
      <g fill="#f5b31c">
        <circle className="bolcany-halo-a" cx="50.5" cy="184.5" r="5.5" opacity="0.18" />
        <circle className="bolcany-halo-b" cx="145" cy="150.5" r="5.5" opacity="0.18" />
        <circle className="bolcany-halo-c" cx="238.5" cy="194.5" r="5.5" opacity="0.18" />
        <circle className="bolcany-halo-a" cx="332.5" cy="160.5" r="5.5" opacity="0.18" />
        <circle className="bolcany-halo-b" cx="34.5" cy="126.5" r="5.5" opacity="0.18" />
        <circle className="bolcany-halo-c" cx="221" cy="134.5" r="5.5" opacity="0.18" />
      </g>

      {/* 谷を渡るロープウェイ */}
      <path d="M8,80 Q200,104 392,72" stroke="#b8b0c8" strokeWidth="1" fill="none" opacity="0.5" />
      <g className="bolcany-gondola">
        <rect x="-0.7" y="-9" width="1.4" height="7" fill="#b8b0c8" />
        <rect x="-3" y="-10.5" width="6" height="2" rx="1" fill="#cfc4b0" />
        <rect x="-7" y="-2" width="14" height="10" rx="3" fill="#e8443f" />
        <rect x="-5" y="0" width="10" height="4" rx="1.5" fill="#f5d38a" opacity="0.9" />
      </g>

      {/* 谷にたまる夜霧 */}
      <g fill="#8a7fb0">
        <ellipse className="bolcany-haze-a" cx="140" cy="150" rx="90" ry="7" opacity="0.14" />
        <ellipse className="bolcany-haze-b" cx="280" cy="176" rx="104" ry="8" opacity="0.12" />
      </g>

      <style>{`
        .bolcany-win-a, .bolcany-win-b, .bolcany-win-c, .bolcany-win-d,
        .bolcany-win-e, .bolcany-win-f, .bolcany-win-g, .bolcany-win-h,
        .bolcany-halo-a, .bolcany-halo-b, .bolcany-halo-c,
        .bolcany-haze-a, .bolcany-haze-b {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .bolcany-win-a { animation: bolcany-lamp 6.4s ease-in-out infinite; }
        .bolcany-win-b { animation: bolcany-lamp 8.2s ease-in-out infinite; animation-delay: -2.1s; }
        .bolcany-win-c { animation: bolcany-lamp 5.6s ease-in-out infinite; animation-delay: -3.4s; }
        .bolcany-win-d { animation: bolcany-lamp 9.1s ease-in-out infinite; animation-delay: -1.2s; }
        .bolcany-win-e { animation: bolcany-lamp 7.3s ease-in-out infinite; animation-delay: -4.6s; }
        .bolcany-win-f { animation: bolcany-lamp 6.8s ease-in-out infinite; animation-delay: -5.5s; }
        .bolcany-win-g { animation: bolcany-lamp 8.7s ease-in-out infinite; animation-delay: -0.7s; }
        .bolcany-win-h { animation: bolcany-lamp 5.9s ease-in-out infinite; animation-delay: -3.9s; }
        .bolcany-halo-a { animation: bolcany-halo 6.4s ease-in-out infinite; }
        .bolcany-halo-b { animation: bolcany-halo 8.2s ease-in-out infinite; animation-delay: -2.6s; }
        .bolcany-halo-c { animation: bolcany-halo 7.1s ease-in-out infinite; animation-delay: -4.3s; }
        .bolcany-gondola {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          transform: translate(104px, 88.5px);
          animation: bolcany-ride 26s linear infinite;
        }
        .bolcany-haze-a { animation: bolcany-haze 34s ease-in-out infinite; }
        .bolcany-haze-b { animation: bolcany-haze 44s ease-in-out infinite; animation-delay: -18s; }
        @keyframes bolcany-lamp {
          0%, 100% { opacity: 0.85; }
          38% { opacity: 0.12; }
          64% { opacity: 1; }
        }
        @keyframes bolcany-halo {
          0%, 100% { opacity: 0.16; transform: scale(1); }
          45% { opacity: 0.04; transform: scale(0.8); }
        }
        @keyframes bolcany-ride {
          0% { transform: translate(8px, 80px); }
          25% { transform: translate(104px, 88.5px); }
          50% { transform: translate(200px, 90px); }
          75% { transform: translate(296px, 84.5px); }
          100% { transform: translate(392px, 72px); }
        }
        @keyframes bolcany-haze {
          0%, 100% { transform: translateX(-30px) scaleX(1); opacity: 0.1; }
          50% { transform: translateX(34px) scaleX(1.18); opacity: 0.18; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bolcany-win-a, .bolcany-win-b, .bolcany-win-c, .bolcany-win-d,
          .bolcany-win-e, .bolcany-win-f, .bolcany-win-g, .bolcany-win-h,
          .bolcany-halo-a, .bolcany-halo-b, .bolcany-halo-c,
          .bolcany-gondola, .bolcany-haze-a, .bolcany-haze-b { animation: none; }
        }
      `}</style>
    </svg>
  );
}
