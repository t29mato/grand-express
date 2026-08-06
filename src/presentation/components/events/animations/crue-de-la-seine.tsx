/**
 * セーヌが増水する。河岸の道は封鎖され、船は止まり、大きく迂回することになる。
 *
 * パリの人はアルマ橋の石の兵士で水位を測る。足に水が来れば河岸は閉鎖、
 * 腰まで来れば川の航行が止まる。いまは腰まで来ている。
 *
 * 位置決めは外側の <g transform>、動きは内側のクラス。
 * CSSのtransformは属性のtransformを上書きするので、両方を同じ要素に付けない。
 */
export function CrueDeLaSeine() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 雨あがりの空 */}
      <rect width="400" height="210" fill="#6b7482" />
      <rect width="400" height="48" fill="#5c6572" />
      <g fill="#7a8390" opacity="0.7">
        <ellipse cx="80" cy="20" rx="76" ry="16" />
        <ellipse cx="290" cy="14" rx="88" ry="14" />
      </g>

      {/* 対岸の街 */}
      <g fill="#5f6774">
        <rect x="0" y="42" width="108" height="34" />
        <rect x="118" y="34" width="92" height="42" />
        <rect x="222" y="46" width="178" height="30" />
      </g>
      <g fill="#4c5460">
        <rect x="16" y="52" width="14" height="18" />
        <rect x="44" y="52" width="14" height="18" />
        <rect x="134" y="44" width="14" height="20" />
        <rect x="162" y="44" width="14" height="20" />
        <rect x="242" y="54" width="14" height="16" />
        <rect x="270" y="54" width="14" height="16" />
      </g>

      {/* 橋 */}
      <rect x="0" y="76" width="400" height="16" fill="#a8a08e" />
      <rect x="0" y="76" width="400" height="5" fill="#b8b09c" />
      <g fill="#8d8574">
        <rect x="0" y="66" width="400" height="6" />
        <rect x="30" y="60" width="6" height="10" />
        <rect x="90" y="60" width="6" height="10" />
        <rect x="150" y="60" width="6" height="10" />
        <rect x="210" y="60" width="6" height="10" />
        <rect x="270" y="60" width="6" height="10" />
        <rect x="330" y="60" width="6" height="10" />
      </g>
      {/* 橋脚 */}
      <path d="M146,92 l94,0 l0,50 q-47,16 -94,0z" fill="#b8b09c" />
      <path d="M146,92 l94,0 l0,8 -94,0z" fill="#c6bfab" />

      {/* 石の兵士(足で河岸閉鎖、腰で航行停止) */}
      <g transform="translate(193,130)">
        <rect x="-19" y="-6" width="13" height="34" rx="6" fill="#6b5236" />
        <rect x="6" y="-6" width="13" height="34" rx="6" fill="#6b5236" />
        <rect x="-24" y="-14" width="10" height="26" rx="5" fill="#6b5236" />
        <rect x="14" y="-14" width="10" height="26" rx="5" fill="#6b5236" />
        <path d="M-17,2 q17,-20 34,0 l-3,30 -28,0z" fill="#7d6142" />
        <path d="M-17,4 q17,10 34,0 l0,7 q-17,10 -34,0z" fill="#5f4a30" />
        <circle cx="0" cy="-22" r="11" fill="#8a6a44" />
        <rect x="-12" y="-42" width="24" height="12" rx="3" fill="#6b5236" />
        <path d="M-13,-31 q13,7 26,0 l0,4 q-13,7 -26,0z" fill="#5f4a30" />
      </g>

      {/* 濁った水(腰まで来ている) */}
      <rect y="130" width="400" height="52" fill="#7a6a4a" />
      <rect y="130" width="400" height="6" fill="#8d7c58" />
      <g fill="#8d7c58">
        <rect
          className="cse-flow-a"
          x="0"
          y="144"
          width="150"
          height="6"
          rx="3"
        />
        <rect
          className="cse-flow-b"
          x="200"
          y="158"
          width="170"
          height="6"
          rx="3"
        />
        <rect
          className="cse-flow-c"
          x="40"
          y="172"
          width="150"
          height="6"
          rx="3"
        />
      </g>
      {/* 流れてくる枝 */}
      <g transform="translate(300,150)">
        <g className="cse-branch">
          <rect x="-24" y="-3" width="48" height="6" rx="3" fill="#4a3a28" />
          <path
            d="M6,-2 l14,-10 M-8,2 l-12,8"
            stroke="#4a3a28"
            strokeWidth="4"
            fill="none"
          />
        </g>
      </g>

      {/* 封鎖された河岸の道 */}
      <rect y="182" width="400" height="28" fill="#9c968a" />
      <rect y="182" width="400" height="5" fill="#aca69a" />

      {/* 止められた船 */}
      <g transform="translate(78,150)">
        <g className="cse-boat">
          <path d="M-52,-8 l104,0 l-12,18 -80,0z" fill="#3f4a58" />
          <rect x="-52" y="-12" width="104" height="6" rx="3" fill="#4d5b6c" />
          <rect x="-22" y="-30" width="44" height="18" rx="3" fill="#d8d2c4" />
          <g fill="#2b3038">
            <rect x="-16" y="-26" width="11" height="9" rx="2" />
            <rect x="0" y="-26" width="11" height="9" rx="2" />
          </g>
          <rect x="24" y="-40" width="4" height="28" fill="#8d949c" />
        </g>
      </g>

      {/* 通行止めの柵 */}
      <g transform="translate(316,190)">
        <g className="cse-barrier">
          <rect x="-46" y="-10" width="92" height="10" rx="5" fill="#f6efe2" />
          <g fill="#e8443f">
            <rect x="-42" y="-10" width="16" height="10" />
            <rect x="-10" y="-10" width="16" height="10" />
            <rect x="22" y="-10" width="16" height="10" />
          </g>
          <rect x="-40" y="0" width="7" height="22" fill="#8d949c" />
          <rect x="32" y="0" width="7" height="22" fill="#8d949c" />
        </g>
      </g>

      {/* 迂回の矢 */}
      <g transform="translate(60,198)">
        <g className="cse-detour">
          <rect x="-30" y="-5" width="42" height="11" rx="4" fill="#e8443f" />
          <path d="M8,-16 L30,0 L8,16z" fill="#e8443f" />
        </g>
      </g>

      <style>{`
        .cse-boat { transform-box: fill-box; transform-origin: 50% 100%; animation: cse-moor 4.6s ease-in-out infinite; }
        .cse-flow-a { transform-box: fill-box; transform-origin: center; animation: cse-run 5.5s linear infinite; }
        .cse-flow-b { transform-box: fill-box; transform-origin: center; animation: cse-run 7s linear infinite; animation-delay: -2.4s; }
        .cse-flow-c { transform-box: fill-box; transform-origin: center; animation: cse-run 6.2s linear infinite; animation-delay: -3.6s; }
        .cse-branch { transform-box: fill-box; transform-origin: center; animation: cse-carry 6s linear infinite; }
        .cse-barrier { transform-box: fill-box; transform-origin: 50% 100%; animation: cse-shut 4.6s ease-in-out infinite; }
        .cse-detour { transform-box: fill-box; transform-origin: center; animation: cse-round 3s ease-in-out infinite; }
        @keyframes cse-moor {
          0%, 100% { transform: rotate(-1.8deg) translate(0, 0); }
          50% { transform: rotate(1.8deg) translate(0, -3px); }
        }
        @keyframes cse-run {
          0% { transform: translate(-40px, 0); opacity: 0.3; }
          50% { opacity: 0.9; }
          100% { transform: translate(40px, 0); opacity: 0.3; }
        }
        @keyframes cse-carry {
          0% { transform: translate(120px, 0) rotate(0deg); opacity: 0; }
          14% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translate(-330px, 14px) rotate(-160deg); opacity: 0; }
        }
        @keyframes cse-shut {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-1.6deg); }
        }
        @keyframes cse-round {
          0%, 100% { transform: translate(-6px, 0); opacity: 0.7; }
          50% { transform: translate(8px, 0); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cse-boat, .cse-flow-a, .cse-flow-b, .cse-flow-c,
          .cse-branch, .cse-barrier, .cse-detour { animation: none; }
        }
      `}</style>
    </svg>
  );
}
