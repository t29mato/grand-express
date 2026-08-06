/**
 * 食事券の綴り。期限切れにするくらいなら、と使い残しを譲ってもらう。
 *
 * ビストロの卓に本日の皿とグラス。差し出された綴りからは
 * ミシン目の入った券が扇のように開き、受け取る手へ渡っていく。
 *
 * 位置決めは外側の <g transform>、動きは内側のクラス。
 * CSSのtransformは属性のtransformを上書きするので、両方を同じ要素に付けない。
 */
export function TitreRestaurant() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 昼のビストロ */}
      <rect width="400" height="210" fill="#5c4030" />
      <rect width="400" height="74" fill="#4a3326" />
      <rect x="0" y="16" width="400" height="6" fill="#6b4c38" />
      {/* 窓の外の明るさ */}
      <rect x="240" y="22" width="140" height="52" rx="4" fill="#7d5a42" />
      <rect x="248" y="28" width="124" height="40" fill="#a8cfe4" />
      <g fill="#8fb8d0">
        <rect x="256" y="36" width="28" height="32" />
        <rect x="296" y="42" width="24" height="26" />
        <rect x="332" y="34" width="28" height="34" />
      </g>
      {/* 壁の黒板 */}
      <g transform="translate(96,44)">
        <rect x="-58" y="-26" width="116" height="56" rx="3" fill="#2f3a30" />
        <rect
          x="-58"
          y="-26"
          width="116"
          height="56"
          rx="3"
          fill="none"
          stroke="#8d6b3c"
          strokeWidth="5"
        />
        <g fill="#cfd8c8" opacity="0.7">
          <rect x="-44" y="-14" width="56" height="4" rx="2" />
          <rect x="-44" y="-4" width="72" height="4" rx="2" />
          <rect x="-44" y="6" width="44" height="4" rx="2" />
          <rect x="-44" y="16" width="62" height="4" rx="2" />
        </g>
      </g>

      {/* 卓 */}
      <rect y="118" width="400" height="92" fill="#8d6b3c" />
      <rect y="118" width="400" height="8" fill="#a2804c" />
      <rect x="18" y="126" width="364" height="66" rx="4" fill="#c9bda4" />
      <g stroke="#b3a68c" strokeWidth="4" fill="none">
        <path d="M18,150 L382,150" />
        <path d="M120,126 L120,192 M280,126 L280,192" />
      </g>

      {/* 本日の皿 */}
      <g transform="translate(84,166)">
        <ellipse cx="0" cy="4" rx="46" ry="18" fill="#e8e2d4" />
        <ellipse cx="0" cy="0" rx="46" ry="18" fill="#f6efe2" />
        <ellipse cx="0" cy="0" rx="32" ry="12" fill="#e2dccb" />
        <g>
          <ellipse cx="-10" cy="-2" rx="15" ry="8" fill="#8a5a34" />
          <ellipse cx="10" cy="2" rx="12" ry="6" fill="#c98f4a" />
          <circle cx="14" cy="-5" r="5" fill="#5c8a3a" />
        </g>
        <g className="tresto-steam" fill="#f6efe2" opacity="0.5">
          <circle cx="-8" cy="-16" r="6" />
          <circle cx="8" cy="-22" r="5" />
        </g>
      </g>
      {/* グラスと刃物 */}
      <g transform="translate(154,158)">
        <path d="M-10,-26 l20,0 l-3,26 -14,0z" fill="#cfe3ee" opacity="0.55" />
        <path d="M-8,-10 l16,0 l-2,10 -12,0z" fill="#9c2f3a" />
        <ellipse cx="0" cy="2" rx="11" ry="4" fill="#b8ccd8" />
      </g>
      <g fill="#b8bcc4">
        <rect x="182" y="146" width="5" height="40" rx="2" />
        <rect x="194" y="146" width="5" height="40" rx="2" />
      </g>

      {/* 差し出される綴り */}
      <g transform="translate(300,150)">
        <g className="tresto-book">
          <g className="tresto-fan-c">
            <rect
              x="-34"
              y="-20"
              width="68"
              height="34"
              rx="3"
              fill="#e8c9a2"
            />
            <rect x="-34" y="-20" width="68" height="9" rx="3" fill="#d8b489" />
          </g>
          <g className="tresto-fan-b">
            <rect
              x="-34"
              y="-24"
              width="68"
              height="34"
              rx="3"
              fill="#f0dcbc"
            />
            <rect x="-34" y="-24" width="68" height="9" rx="3" fill="#dcc49c" />
            <circle cx="20" cy="-2" r="6" fill="#c9a877" />
          </g>
          <g className="tresto-fan-a">
            <rect
              x="-34"
              y="-28"
              width="68"
              height="34"
              rx="3"
              fill="#f6efe2"
            />
            <rect
              x="-34"
              y="-28"
              width="68"
              height="10"
              rx="3"
              fill="#5b8fe8"
            />
            <g fill="#9aa4ae">
              <rect x="-26" y="-12" width="34" height="4" rx="2" />
              <rect x="-26" y="-4" width="24" height="4" rx="2" />
            </g>
            <circle cx="20" cy="-4" r="7" fill="#f5b31c" />
            {/* ミシン目 */}
            <g fill="#c9bda4">
              <circle cx="-34" cy="-22" r="1.8" />
              <circle cx="-34" cy="-14" r="1.8" />
              <circle cx="-34" cy="-6" r="1.8" />
              <circle cx="-34" cy="2" r="1.8" />
            </g>
          </g>
        </g>
      </g>

      {/* 渡す手 */}
      <g transform="translate(378,178)">
        <g className="tresto-giver">
          <rect x="-14" y="-14" width="52" height="20" rx="10" fill="#4a5866" />
          <ellipse cx="-18" cy="-8" rx="15" ry="12" fill="#e8c9a8" />
          <rect x="-30" y="-14" width="14" height="8" rx="4" fill="#d8b48c" />
        </g>
      </g>
      {/* 受け取る手 */}
      <g transform="translate(246,186)">
        <g className="tresto-taker">
          <rect x="-52" y="-4" width="48" height="22" rx="11" fill="#5b6a7a" />
          <ellipse cx="0" cy="-2" rx="17" ry="13" fill="#f0e2cf" />
          <rect x="10" y="-9" width="15" height="9" rx="4" fill="#e0d2bf" />
        </g>
      </g>

      <style>{`
        .tresto-book { transform-box: fill-box; transform-origin: 100% 100%; animation: tresto-offer 3.6s ease-in-out infinite; }
        .tresto-fan-a { transform-box: fill-box; transform-origin: 100% 100%; animation: tresto-fan 3.6s ease-in-out infinite; }
        .tresto-fan-b { transform-box: fill-box; transform-origin: 100% 100%; animation: tresto-fan 3.6s ease-in-out infinite; animation-delay: -0.18s; }
        .tresto-fan-c { transform-box: fill-box; transform-origin: 100% 100%; animation: tresto-fan 3.6s ease-in-out infinite; animation-delay: -0.36s; }
        .tresto-giver { transform-box: fill-box; transform-origin: right center; animation: tresto-push 3.6s ease-in-out infinite; }
        .tresto-taker { transform-box: fill-box; transform-origin: 50% 100%; animation: tresto-reach 3.6s ease-in-out infinite; }
        .tresto-steam { transform-box: fill-box; transform-origin: 50% 100%; animation: tresto-rise 3s ease-out infinite; }
        @keyframes tresto-offer {
          0%, 16% { transform: translate(26px, 6px) rotate(6deg); }
          48%, 76% { transform: translate(-10px, 0) rotate(-4deg); }
          96%, 100% { transform: translate(26px, 6px) rotate(6deg); }
        }
        @keyframes tresto-fan {
          0%, 20% { transform: rotate(0deg); }
          52%, 74% { transform: rotate(-13deg); }
          94%, 100% { transform: rotate(0deg); }
        }
        @keyframes tresto-push {
          0%, 16% { transform: translate(14px, 4px); }
          48%, 76% { transform: translate(-14px, 0); }
          96%, 100% { transform: translate(14px, 4px); }
        }
        @keyframes tresto-reach {
          0%, 20% { transform: translate(-10px, 6px); }
          52%, 76% { transform: translate(8px, -4px); }
          96%, 100% { transform: translate(-10px, 6px); }
        }
        @keyframes tresto-rise {
          0% { transform: translate(0, 6px) scale(0.5); opacity: 0; }
          30% { opacity: 0.5; }
          100% { transform: translate(-10px, -30px) scale(1.4); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .tresto-book, .tresto-fan-a, .tresto-fan-b, .tresto-fan-c,
          .tresto-giver, .tresto-taker, .tresto-steam { animation: none; }
        }
      `}</style>
    </svg>
  );
}
