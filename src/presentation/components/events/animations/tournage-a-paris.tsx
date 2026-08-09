/**
 * 通りが撮影に貸し出された。雨戸を閉め、歩道を空けてほしいという。
 *
 * 撮影隊が照明とカメラを据え、柵で歩道を仕切っている。
 * 住人には午前ぶんの謝礼が封筒で配られ、終われば通りは元通りに戻される。
 *
 * 位置決めは外側の <g transform>、動きは内側のクラス。
 * CSSのtransformは属性のtransformを上書きするので、両方を同じ要素に付けない。
 */
export function TournageAParis() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 朝のパリ */}
      <rect width="400" height="210" fill="#a8cfe4" />
      <rect width="400" height="34" fill="#bcdcee" />

      {/* オスマン様式の正面と、閉じられた雨戸 */}
      <rect x="0" y="14" width="400" height="112" fill="#cfc3a8" />
      <rect x="0" y="14" width="400" height="8" fill="#dcd2ba" />
      <rect x="0" y="60" width="400" height="6" fill="#b8ab90" />
      <g>
        <rect x="18" y="28" width="34" height="26" rx="2" fill="#6b7f6b" />
        <rect x="33" y="28" width="4" height="26" fill="#556655" />
        <rect x="78" y="28" width="34" height="26" rx="2" fill="#6b7f6b" />
        <rect x="93" y="28" width="4" height="26" fill="#556655" />
        <rect x="138" y="28" width="34" height="26" rx="2" fill="#6b7f6b" />
        <rect x="153" y="28" width="4" height="26" fill="#556655" />
        <rect x="18" y="76" width="34" height="30" rx="2" fill="#6b7f6b" />
        <rect x="33" y="76" width="4" height="30" fill="#556655" />
        <rect x="78" y="76" width="34" height="30" rx="2" fill="#6b7f6b" />
        <rect x="93" y="76" width="4" height="30" fill="#556655" />
      </g>
      {/* 玄関 */}
      <rect x="136" y="74" width="46" height="52" rx="3" fill="#4a3a2a" />
      <rect x="136" y="74" width="46" height="7" rx="3" fill="#5c4836" />
      <circle cx="176" cy="102" r="3.5" fill="#c9a877" />

      {/* 歩道と車道 */}
      <rect y="126" width="400" height="84" fill="#9c968a" />
      <rect y="126" width="400" height="6" fill="#aca69a" />
      <rect y="152" width="400" height="58" fill="#5c5c60" />
      <rect y="152" width="400" height="5" fill="#6b6b70" />

      {/* 仕切りの柵 */}
      <g>
        <g fill="#f6efe2">
          <rect x="18" y="130" width="6" height="30" />
          <rect x="32" y="130" width="6" height="30" />
          <rect x="46" y="130" width="6" height="30" />
        </g>
        <g fill="#e8443f">
          <rect x="6" y="128" width="62" height="7" rx="3" />
          <rect x="6" y="154" width="62" height="7" rx="3" />
          <rect x="6" y="128" width="7" height="40" rx="2" />
          <rect x="61" y="128" width="7" height="40" rx="2" />
        </g>
      </g>

      {/* 照明 */}
      <g transform="translate(320,150)">
        <rect x="-4" y="-46" width="8" height="58" fill="#4a4d55" />
        <path d="M-22,12 L22,12 L14,20 -14,20z" fill="#3f4248" />
        <g className="tap-lamp">
          <path d="M-26,-72 l52,0 l8,30 -68,0z" fill="#5f6875" />
          <rect x="-24" y="-44" width="48" height="8" rx="3" fill="#4a4d55" />
          <ellipse cx="0" cy="-58" rx="18" ry="10" fill="#f5e6a8" />
        </g>
        <g className="tap-beam">
          <path
            d="M-16,-46 l32,0 l58,64 -148,0z"
            fill="#f5e6a8"
            opacity="0.28"
          />
        </g>
      </g>

      {/* カメラ */}
      <g transform="translate(236,168)">
        <path d="M-24,10 L24,10 L16,20 -16,20z" fill="#3f4248" />
        <rect x="-4" y="-22" width="8" height="34" fill="#4a4d55" />
        <g className="tap-camera">
          <rect x="-30" y="-44" width="52" height="26" rx="4" fill="#2f333a" />
          <rect x="22" y="-38" width="18" height="14" rx="4" fill="#1f2229" />
          <circle cx="-14" cy="-52" r="9" fill="#3f4248" />
          <circle cx="8" cy="-52" r="9" fill="#3f4248" />
          <circle cx="43" cy="-31" r="5" fill="#8fc4e8" />
        </g>
      </g>

      {/* カチンコ */}
      <g transform="translate(160,182)">
        <g className="tap-clap">
          <rect x="-22" y="-14" width="44" height="28" rx="2" fill="#2f333a" />
          <g fill="#f6efe2">
            <rect x="-18" y="-4" width="36" height="4" rx="2" />
            <rect x="-18" y="4" width="26" height="4" rx="2" />
          </g>
          <g className="tap-clap-arm">
            <rect x="-22" y="-24" width="44" height="9" rx="2" fill="#2f333a" />
            <g fill="#f6efe2">
              <rect x="-18" y="-24" width="9" height="9" />
              <rect x="0" y="-24" width="9" height="9" />
            </g>
          </g>
        </g>
      </g>

      {/* 謝礼を配る係と受け取る住人 */}
      <g transform="translate(100,190)">
        <g className="tap-crew">
          <rect x="-15" y="-30" width="30" height="34" rx="9" fill="#3f4a58" />
          <path d="M-18,4 q18,-16 36,0z" fill="#33404f" />
          <circle cx="0" cy="-42" r="13" fill="#e8c9a8" />
          <path d="M-14,-46 a14,10 0 0 1 28,0 l4,2 -36,0z" fill="#2f333a" />
          <g className="tap-give">
            <rect x="12" y="-26" width="30" height="10" rx="4" fill="#3f4a58" />
            <ellipse cx="44" cy="-21" rx="10" ry="8" fill="#e8c9a8" />
          </g>
        </g>
      </g>
      <g transform="translate(160,132)">
        <g className="tap-envelope">
          <rect x="-17" y="-11" width="34" height="22" rx="2" fill="#f6efe2" />
          <path d="M-17,-11 l17,13 l17,-13z" fill="#e2dccb" />
          <rect x="-6" y="2" width="16" height="7" rx="3" fill="#f5b31c" />
        </g>
      </g>

      <style>{`
        .tap-lamp { transform-box: fill-box; transform-origin: 50% 100%; animation: tap-tilt 5s ease-in-out infinite; }
        .tap-beam { transform-box: fill-box; transform-origin: 50% 0; animation: tap-glow 5s ease-in-out infinite; }
        .tap-camera { transform-box: fill-box; transform-origin: 50% 100%; animation: tap-pan 5s ease-in-out infinite; }
        .tap-clap-arm { transform-box: fill-box; transform-origin: left bottom; animation: tap-snap 2.5s ease-in-out infinite; }
        .tap-crew { transform-box: fill-box; transform-origin: 50% 100%; animation: tap-step 5s ease-in-out infinite; }
        .tap-give { transform-box: fill-box; transform-origin: left center; animation: tap-hand 5s ease-in-out infinite; }
        .tap-envelope { transform-box: fill-box; transform-origin: center; opacity: 0; animation: tap-pass 5s ease-in-out infinite; }
        @keyframes tap-tilt {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes tap-glow {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        @keyframes tap-pan {
          0%, 100% { transform: rotate(-4deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes tap-snap {
          0%, 30% { transform: rotate(-28deg); }
          42%, 100% { transform: rotate(0deg); }
        }
        @keyframes tap-step {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(0, -3px); }
        }
        @keyframes tap-hand {
          0%, 20% { transform: rotate(0deg); }
          48%, 72% { transform: rotate(-22deg); }
          94%, 100% { transform: rotate(0deg); }
        }
        @keyframes tap-pass {
          0%, 24% { transform: translate(-56px, 34px) scale(0.7); opacity: 0; }
          40% { transform: translate(-24px, 16px) scale(1); opacity: 1; }
          72% { transform: translate(0, 0) scale(1); opacity: 1; }
          92%, 100% { transform: translate(16px, -8px) scale(0.9); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .tap-lamp, .tap-beam, .tap-camera, .tap-clap-arm, .tap-crew,
          .tap-give, .tap-envelope { animation: none; }
          /* **規則そのものに opacity: 0 を書いている要素は、animation: none だけでは
             消えたままになる。**動きを減らす設定にしている人にだけ、
             出来事そのものが見えなくなる。受け取った封筒。渡されたことが止めた絵にも残るように。 */
          .tap-envelope { opacity: 1; }
        }
      `}</style>
    </svg>
  );
}
