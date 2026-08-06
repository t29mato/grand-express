/**
 * 首都(デリー)に重ねる、幹線道路の車の流れ。
 *
 * 門の前の道はいつも詰まっている。オートリクシャーとバスが列をなして走り、
 * 平原にたまった霞が門をぼかし、その上をトビが輪を描く。
 */
export function IndiaCapital() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 平原にたまる霞 */}
      <g fill="#f2e6cf">
        <g className="indcap-haze-a" opacity="0.16">
          <ellipse cx="70" cy="122" rx="60" ry="5" />
          <ellipse cx="150" cy="118" rx="70" ry="6" />
          <ellipse cx="228" cy="123" rx="54" ry="4.6" />
          <ellipse cx="278" cy="119" rx="28" ry="3" />
        </g>
        <g className="indcap-haze-b" opacity="0.13">
          <ellipse cx="190" cy="130" rx="56" ry="4.4" />
          <ellipse cx="270" cy="127" rx="70" ry="5.4" />
          <ellipse cx="348" cy="131" rx="52" ry="4.4" />
        </g>
      </g>

      {/* 門の上を舞うトビ */}
      <g fill="#3a3226">
        <g className="indcap-kite-a">
          <path className="indcap-kwing-a" d="M-9,0 C-6,-4 -3,-4 0,-1.2 C3,-4 6,-4 9,0 C5,-1.4 2,-0.6 0,0.6 C-2,-0.6 -5,-1.4 -9,0z" />
        </g>
        <g className="indcap-kite-b">
          <path className="indcap-kwing-b" d="M-6,0 C-4,-2.8 -2,-2.8 0,-0.8 C2,-2.8 4,-2.8 6,0 C3.4,-0.9 1.4,-0.4 0,0.4 C-1.4,-0.4 -3.4,-0.9 -6,0z" />
        </g>
      </g>

      {/* 奥の車線(左から右へ) */}
      <g className="indcap-lane-far">
        <g className="indcap-car-a">
          {/* バス */}
          <rect x="-12" y="-13" width="24" height="11" rx="2" fill="#e8d8b0" />
          <rect x="-12" y="-13" width="24" height="4" rx="2" fill="#5b8fe8" />
          <rect x="-10" y="-8" width="4" height="3" fill="#3a4a5a" />
          <rect x="-4" y="-8" width="4" height="3" fill="#3a4a5a" />
          <rect x="2" y="-8" width="4" height="3" fill="#3a4a5a" />
          <circle cx="-7" cy="-1.6" r="2" fill="#241a10" />
          <circle cx="7" cy="-1.6" r="2" fill="#241a10" />
        </g>
        <g className="indcap-car-b">
          {/* オートリクシャー */}
          <rect x="-6" y="-9" width="12" height="7" rx="2.4" fill="#3f8a4a" />
          <rect x="-6" y="-12.5" width="12" height="4" rx="1.8" fill="#f5d24a" />
          <circle cx="-4" cy="-1.6" r="1.8" fill="#241a10" />
          <circle cx="4" cy="-1.6" r="1.8" fill="#241a10" />
        </g>
        <g className="indcap-car-c">
          {/* 乗用車 */}
          <rect x="-8" y="-6.5" width="16" height="5" rx="2" fill="#e8443f" />
          <rect x="-4.5" y="-10" width="9" height="4" rx="1.6" fill="#f0a09c" />
          <circle cx="-4.6" cy="-1.4" r="1.7" fill="#241a10" />
          <circle cx="4.6" cy="-1.4" r="1.7" fill="#241a10" />
        </g>
      </g>

      {/* 手前の車線(右から左へ) */}
      <g className="indcap-lane-near">
        <g className="indcap-car-d">
          {/* オートリクシャー */}
          <rect x="-7" y="-10" width="14" height="8" rx="2.8" fill="#3f8a4a" />
          <rect x="-7" y="-14" width="14" height="4.6" rx="2" fill="#f5d24a" />
          <circle cx="-4.6" cy="-1.8" r="2.1" fill="#241a10" />
          <circle cx="4.6" cy="-1.8" r="2.1" fill="#241a10" />
        </g>
        <g className="indcap-car-e">
          {/* 荷を積んだトラック */}
          <rect x="-13" y="-12" width="18" height="10" rx="1.6" fill="#c9683c" />
          <rect x="5" y="-8.4" width="8" height="6.4" rx="1.6" fill="#5b8fe8" />
          <rect x="-13" y="-14.6" width="18" height="2.8" rx="1.2" fill="#f5b31c" />
          <circle cx="-8" cy="-1.8" r="2.1" fill="#241a10" />
          <circle cx="8" cy="-1.8" r="2.1" fill="#241a10" />
        </g>
        <g className="indcap-car-f">
          {/* バイク */}
          <circle cx="-4" cy="-2" r="2" fill="#241a10" />
          <circle cx="4" cy="-2" r="2" fill="#241a10" />
          <path d="M-4,-2 L0,-6 L4,-2 M0,-6 L2.4,-8" stroke="#3a3226" strokeWidth="1.4" fill="none" />
          <circle cx="-1" cy="-10" r="2.6" fill="#5b8fe8" />
        </g>
      </g>

      <style>{`
        .indcap-haze-a, .indcap-haze-b,
        .indcap-kite-a, .indcap-kite-b,
        .indcap-car-a, .indcap-car-b, .indcap-car-c,
        .indcap-car-d, .indcap-car-e, .indcap-car-f {
          transform-box: fill-box;
          transform-origin: 50% 100%;
        }
        .indcap-haze-a { animation: indcap-haze 38s ease-in-out infinite; }
        .indcap-haze-b { animation: indcap-haze 48s ease-in-out infinite; animation-delay: -20s; }
        .indcap-kite-a { transform: translate(78px, 40px); animation: indcap-soar-a 26s linear infinite; }
        .indcap-kite-b { transform: translate(320px, 56px); animation: indcap-soar-b 33s linear infinite; }
        .indcap-kwing-a, .indcap-kwing-b {
          transform-box: fill-box;
          transform-origin: 50% 100%;
        }
        .indcap-kwing-a { animation: indcap-tilt 6.4s ease-in-out infinite; }
        .indcap-kwing-b { animation: indcap-tilt 7.8s ease-in-out infinite; animation-delay: -2.6s; }
        .indcap-car-a { transform: translate(60px, 182px); animation: indcap-east 21s linear infinite; }
        .indcap-car-b { transform: translate(180px, 182px); animation: indcap-east 16s linear infinite; animation-delay: -7s; }
        .indcap-car-c { transform: translate(300px, 182px); animation: indcap-east 18s linear infinite; animation-delay: -13s; }
        .indcap-car-d { transform: translate(300px, 206px); animation: indcap-west 17s linear infinite; }
        .indcap-car-e { transform: translate(160px, 206px); animation: indcap-west 23s linear infinite; animation-delay: -9s; }
        .indcap-car-f { transform: translate(60px, 206px); animation: indcap-west 14s linear infinite; animation-delay: -5s; }
        @keyframes indcap-haze {
          0%, 100% { transform: translateX(-24px) scaleX(1); opacity: 0.1; }
          50% { transform: translateX(28px) scaleX(1.12); opacity: 0.2; }
        }
        @keyframes indcap-soar-a {
          0%, 100% { transform: translate(120px, 46px) scale(0.85); }
          25% { transform: translate(78px, 30px) scale(1.05); }
          50% { transform: translate(34px, 46px) scale(1.2); }
          75% { transform: translate(78px, 60px) scale(1); }
        }
        @keyframes indcap-soar-b {
          0%, 100% { transform: translate(284px, 60px) scale(0.9); }
          25% { transform: translate(322px, 44px) scale(1.1); }
          50% { transform: translate(362px, 58px) scale(0.85); }
          75% { transform: translate(322px, 72px) scale(0.7); }
        }
        @keyframes indcap-east {
          0% { transform: translate(-32px, 182px); }
          100% { transform: translate(434px, 182px); }
        }
        @keyframes indcap-west {
          0% { transform: translate(434px, 206px); }
          100% { transform: translate(-32px, 206px); }
        }
        @keyframes indcap-tilt {
          0%, 100% { transform: scaleY(1) rotate(-4deg); }
          50% { transform: scaleY(0.78) rotate(4deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .indcap-haze-a, .indcap-haze-b,
          .indcap-kite-a, .indcap-kite-b,
          .indcap-kwing-a, .indcap-kwing-b,
          .indcap-car-a, .indcap-car-b, .indcap-car-c,
          .indcap-car-d, .indcap-car-e, .indcap-car-f { animation: none; }
        }
      `}</style>
    </svg>
  );
}
