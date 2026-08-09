/**
 * 部屋代より多い請求。精算のとき、一人一泊あたりの見覚えのない項目が足されている。
 *
 * 帳場の卓に明細が伸びていき、下の一行だけが赤い。宿泊税は市町村が課すもので、
 * 窓の外に立っている案内板を建てた観光局へ入る。
 *
 * 位置決めは外側の <g transform>、動きは内側のクラス。
 * CSSのtransformは属性のtransformを上書きするので、両方を同じ要素に付けない。
 */
export function TaxeDeSejour() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 宿の帳場 */}
      <rect width="400" height="210" fill="#453a44" />
      <rect width="400" height="30" fill="#3a3038" />

      {/* 鍵箱 */}
      <g transform="translate(80,64)">
        <rect x="-64" y="-30" width="128" height="66" rx="3" fill="#5c4636" />
        <rect x="-64" y="-30" width="128" height="7" rx="3" fill="#6e553f" />
        <g fill="#3f3228">
          <rect x="-56" y="-18" width="26" height="20" />
          <rect x="-22" y="-18" width="26" height="20" />
          <rect x="12" y="-18" width="26" height="20" />
          <rect x="-56" y="8" width="26" height="20" />
          <rect x="-22" y="8" width="26" height="20" />
          <rect x="12" y="8" width="26" height="20" />
        </g>
        <g fill="#c9a877">
          <rect x="-48" y="-14" width="5" height="13" />
          <rect x="-14" y="-14" width="5" height="13" />
          <rect x="-48" y="12" width="5" height="13" />
          <rect x="20" y="12" width="5" height="13" />
        </g>
      </g>

      {/* 窓と、観光局が建てた案内板 */}
      <g transform="translate(300,66)">
        <rect x="-56" y="-38" width="112" height="76" rx="4" fill="#5c4636" />
        <rect x="-48" y="-30" width="96" height="60" fill="#6b7f92" />
        <g fill="#586b7d">
          <rect x="-40" y="-16" width="26" height="46" />
          <rect x="2" y="-8" width="24" height="38" />
        </g>
        {/* 案内板 */}
        <rect x="-6" y="-14" width="5" height="44" fill="#4a5866" />
        <g className="tds-sign">
          <rect x="-30" y="-24" width="52" height="16" rx="2" fill="#3f6b4a" />
          <rect x="-24" y="-19" width="26" height="5" rx="2.5" fill="#cfe3d4" />
          <path d="M22,-24 l10,8 -10,8z" fill="#3f6b4a" />
        </g>
      </g>

      {/* 帳場の卓 */}
      <rect y="106" width="400" height="104" fill="#6b5233" />
      <rect y="106" width="400" height="9" fill="#7d6140" />
      <rect y="115" width="400" height="10" fill="#4a3826" />

      {/* 呼び鈴 */}
      <g transform="translate(56,148)">
        <ellipse cx="0" cy="18" rx="26" ry="7" fill="#8d949c" />
        <path d="M-22,18 a22,20 0 0 1 44,0z" fill="#c9a877" />
        <g className="tds-bell">
          <rect x="-3" y="-12" width="6" height="12" rx="3" fill="#a8895c" />
          <circle cx="0" cy="-16" r="6" fill="#c9a877" />
        </g>
      </g>

      {/* 伸びていく明細 */}
      <g transform="translate(216,112)">
        <g className="tds-bill">
          <rect x="-52" y="0" width="104" height="86" rx="2" fill="#f6efe2" />
          <rect x="-52" y="0" width="104" height="11" rx="2" fill="#dcd5c6" />
          <g fill="#9aa4ae">
            <rect x="-42" y="20" width="52" height="5" rx="2.5" />
            <rect x="22" y="20" width="20" height="5" rx="2.5" />
            <rect x="-42" y="34" width="44" height="5" rx="2.5" />
            <rect x="22" y="34" width="20" height="5" rx="2.5" />
            <rect x="-42" y="48" width="56" height="5" rx="2.5" />
            <rect x="22" y="48" width="20" height="5" rx="2.5" />
          </g>
          {/* 足された一行 */}
          <g className="tds-extra">
            <rect x="-46" y="60" width="92" height="18" rx="3" fill="#f6d8d8" />
            <rect x="-42" y="66" width="48" height="6" rx="3" fill="#e8443f" />
            <rect x="20" y="66" width="22" height="6" rx="3" fill="#e8443f" />
          </g>
          <path
            d="M-52,86 l14,7 l14,-7 l14,7 l14,-7 l14,7 l14,-7 l14,7 l6,-3 0,-4 -104,0z"
            fill="#f6efe2"
          />
        </g>
      </g>

      {/* 出ていく硬貨 */}
      <g transform="translate(140,178)">
        <g className="tds-coin-a">
          <circle r="8" fill="#f5b31c" />
          <circle r="3.5" fill="#c98f10" />
        </g>
      </g>
      <g transform="translate(152,186)">
        <g className="tds-coin-b">
          <circle r="7" fill="#f5b31c" />
          <circle r="3" fill="#c98f10" />
        </g>
      </g>

      {/* 明細を指す帳場の手 */}
      <g transform="translate(316,150)">
        <g className="tds-point">
          <rect x="0" y="-9" width="70" height="19" rx="9" fill="#3f4a58" />
          <ellipse cx="-4" cy="0" rx="15" ry="12" fill="#e8c9a8" />
          <rect x="-24" y="-4" width="22" height="7" rx="3.5" fill="#d8b48c" />
        </g>
      </g>

      <style>{`
        .tds-bill { transform-box: fill-box; transform-origin: 50% 0; animation: tds-unroll 4.4s ease-out infinite; }
        .tds-extra { transform-box: fill-box; transform-origin: 50% 0; opacity: 0; animation: tds-add 4.4s ease-out infinite; }
        .tds-point { transform-box: fill-box; transform-origin: right center; animation: tds-jab 4.4s ease-in-out infinite; }
        .tds-coin-a { transform-box: fill-box; transform-origin: center; opacity: 0; animation: tds-pay 4.4s ease-in infinite; }
        .tds-coin-b { transform-box: fill-box; transform-origin: center; opacity: 0; animation: tds-pay 4.4s ease-in infinite; animation-delay: -0.5s; }
        .tds-bell { transform-box: fill-box; transform-origin: 50% 100%; animation: tds-ding 4.4s ease-out infinite; }
        .tds-sign { transform-box: fill-box; transform-origin: 50% 100%; animation: tds-lean 5.2s ease-in-out infinite; }
        @keyframes tds-unroll {
          0% { transform: scaleY(0.42); }
          26%, 100% { transform: scaleY(1); }
        }
        @keyframes tds-add {
          0%, 24% { transform: scaleY(0); opacity: 0; }
          36% { transform: scaleY(1.15); opacity: 1; }
          44%, 100% { transform: scaleY(1); opacity: 1; }
        }
        @keyframes tds-jab {
          0%, 26% { transform: translate(30px, 0); }
          46%, 68% { transform: translate(-6px, 4px); }
          92%, 100% { transform: translate(30px, 0); }
        }
        @keyframes tds-pay {
          0%, 56% { transform: translate(0, 0); opacity: 0; }
          64% { transform: translate(0, 0); opacity: 1; }
          94%, 100% { transform: translate(-56px, 18px); opacity: 0; }
        }
        @keyframes tds-ding {
          0%, 8% { transform: translate(0, 0); }
          14% { transform: translate(0, -5px); }
          22%, 100% { transform: translate(0, 0); }
        }
        @keyframes tds-lean {
          0%, 100% { transform: rotate(-1.5deg); }
          50% { transform: rotate(2deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .tds-bill, .tds-extra, .tds-point, .tds-coin-a, .tds-coin-b,
          .tds-bell, .tds-sign { animation: none; }
          /* **規則そのものに opacity: 0 を書いている要素は、animation: none だけでは
             消えたままになる。**動きを減らす設定にしている人にだけ、
             出来事そのものが見えなくなる。伝票に足された一行。**これが出来事そのもの**である。 */
          .tds-extra { opacity: 1; }
        }
      `}</style>
    </svg>
  );
}
