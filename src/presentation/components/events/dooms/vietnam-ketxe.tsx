/**
 * ケットセ(大渋滞)。一つの交差点で立ち往生したトラック一台だけで、
 * バイクが両方向に何キロも渋滞することがある。アイドリングとクラクションの川と化し、
 * もとの障害物が撤去されたあとも解消まで一時間かかることもある。
 *
 * 構図: **画面をバイクで埋める。**これがこの厄災の絵そのもの。
 * 交差点の真ん中に横向きで止まったトラック1台、その前後左右に
 * ヘルメットの色がばらばらのバイクが隙間なく詰まっている。
 * 歩道に押し出されたバイクもいる。奥は街路樹と黄土色の街並み。
 *
 * **怒っている顔は描かない。**みな待っているだけで、鳴っているのは音だけ。
 *
 * 動くのは5つ: クラクションの輪、前後にじりじり動くバイクの列(2群で位相をずらす)、
 * 排気のもや、トラックの方向指示灯、運転席から身を乗り出す人。
 * 止めても「横を向いたトラックと、隙間なく詰まったバイク」で伝わる。
 *
 * (ボリビア盤の封鎖とは別物にする: あちらは石とタイヤの山、旗、バスの列。
 *  こちらは**障害物は1台のトラックだけ**で、詰まっているのは小さなバイクの群れ。)
 */
export function VietnamKetxe() {
  const bikes = [
    { x: 18, y: 150, body: "#da251d", helm: "#f2ece0", shirt: "#2f6fb0" },
    { x: 62, y: 154, body: "#2f8f8a", helm: "#da251d", shirt: "#e8b21c" },
    { x: 106, y: 150, body: "#e8b21c", helm: "#3f3a34", shirt: "#7f5f9a" },
    { x: 150, y: 156, body: "#5f6a72", helm: "#2f8f8a", shirt: "#da251d" },
    { x: 258, y: 152, body: "#7f5f9a", helm: "#f2ece0", shirt: "#3f9f5a" },
    { x: 302, y: 156, body: "#da251d", helm: "#e8b21c", shirt: "#5f6a72" },
    { x: 346, y: 150, body: "#3f9f5a", helm: "#2f6fb0", shirt: "#f2ece0" },
  ];
  const back = [
    { x: 34, y: 124, body: "#e8b21c", helm: "#da251d" },
    { x: 74, y: 126, body: "#2f6fb0", helm: "#f2ece0" },
    { x: 114, y: 124, body: "#da251d", helm: "#3f3a34" },
    { x: 276, y: 126, body: "#2f8f8a", helm: "#e8b21c" },
    { x: 318, y: 124, body: "#7f5f9a", helm: "#f2ece0" },
    { x: 358, y: 126, body: "#da251d", helm: "#2f6fb0" },
  ];
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 排気で霞んだ街。 */}
      <rect width="400" height="210" fill="#8f8878" />
      <rect width="400" height="88" fill="#c4bca4" />
      <rect width="400" height="34" fill="#d4ccb4" />

      {/* 黄土色の街並みと街路樹。 */}
      <g fill="#d8b878">
        <rect x="0" y="30" width="74" height="62" />
        <rect x="80" y="44" width="58" height="48" />
        <rect x="270" y="34" width="66" height="58" />
        <rect x="342" y="48" width="58" height="44" />
      </g>
      <g fill="#3f7a5a" opacity="0.85">
        <rect x="10" y="42" width="12" height="16" />
        <rect x="32" y="42" width="12" height="16" />
        <rect x="54" y="42" width="12" height="16" />
        <rect x="10" y="66" width="12" height="16" />
        <rect x="32" y="66" width="12" height="16" />
        <rect x="92" y="54" width="11" height="15" />
        <rect x="114" y="54" width="11" height="15" />
        <rect x="282" y="46" width="12" height="16" />
        <rect x="304" y="46" width="12" height="16" />
        <rect x="282" y="70" width="12" height="16" />
        <rect x="354" y="60" width="11" height="15" />
        <rect x="376" y="60" width="11" height="15" />
      </g>
      <g>
        <rect x="152" y="66" width="6" height="30" fill="#6b5330" />
        <ellipse cx="155" cy="62" rx="24" ry="15" fill="#3f7a4a" />
        <rect x="236" y="70" width="5" height="26" fill="#6b5330" />
        <ellipse cx="238" cy="66" rx="20" ry="13" fill="#4f8a52" />
      </g>

      {/* 交差点の路面。 */}
      <rect y="92" width="400" height="118" fill="#8a8478" />
      <rect y="92" width="400" height="5" fill="#9a9488" />
      <g
        stroke="#a29a8a"
        strokeWidth="3"
        strokeDasharray="14 14"
        opacity="0.5"
        fill="none"
      >
        <path d="M0,112h400" />
      </g>
      {/* 歩道 */}
      <rect y="196" width="400" height="14" fill="#a29a86" />
      <g stroke="#8f8878" strokeWidth="1.6" opacity="0.7" fill="none">
        <path d="M0,196h400M40,196v14M120,196v14M200,196v14M280,196v14M360,196v14" />
      </g>

      {/* 奥の列のバイク(小さい)。 */}
      <g className="vietnam-kx-back">
        {back.map((b, i) => (
          <g key={i} transform={`translate(${b.x},${b.y})`}>
            <g stroke="#3f3a38" strokeWidth="2" fill="none">
              <circle cx="-9" cy="8" r="6" />
              <circle cx="11" cy="8" r="6" />
            </g>
            <path d="M-9,8l7,-10h9l4,10z" fill={b.body} />
            <path d="M-4,-4v-9q0,-4 5,-4q5,0 5,4v9z" fill="#4a4438" />
            <circle cx="1" cy="-19" r="5" fill={b.helm} />
          </g>
        ))}
      </g>

      {/* **横を向いて止まったトラック。**渋滞の原因。 */}
      <g transform="translate(200,0)">
        <rect x="-74" y="104" width="104" height="40" rx="3" fill="#3f8f7a" />
        <rect x="30" y="112" width="44" height="32" rx="3" fill="#2f6f5f" />
        <rect x="40" y="118" width="26" height="14" rx="2" fill="#8fb0c4" />
        <g fill="#2f3238">
          <circle cx="-46" cy="146" r="9" />
          <circle cx="10" cy="146" r="9" />
          <circle cx="58" cy="146" r="9" />
        </g>
        <g fill="#5a5a52">
          <rect x="-74" y="100" width="104" height="5" />
        </g>
        <circle
          className="vietnam-kx-blink"
          cx="76"
          cy="126"
          r="4.4"
          fill="#f5a02a"
        />
        {/* 運転席から身を乗り出す人 */}
        <g className="vietnam-kx-lean">
          <circle cx="70" cy="110" r="6.4" fill="#8a6a48" />
          <path d="M64,116q6,-4 12,0v8H64z" fill="#f2ece0" />
          <path
            d="M76,116q8,2 10,8"
            stroke="#8a6a48"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      </g>

      {/* 手前の列のバイク。**画面を埋める。** */}
      <g className="vietnam-kx-front">
        {bikes.map((b, i) => (
          <g key={i} transform={`translate(${b.x},${b.y})`}>
            <g stroke="#3f3a38" strokeWidth="3" fill="none">
              <circle cx="-13" cy="26" r="9" />
              <circle cx="15" cy="26" r="9" />
            </g>
            <path d="M-13,26l10,-14h12l6,14z" fill={b.body} />
            <path
              d="M-3,12v-4h14"
              stroke="#5f5a52"
              strokeWidth="3"
              fill="none"
            />
            <path d="M-6,10v-16q0,-6 7,-6q7,0 7,6v16z" fill={b.shirt} />
            <circle cx="1" cy="-14" r="7" fill={b.helm} />
            <path d="M-6,-14h14" stroke="#3f3a34" strokeWidth="2" fill="none" />
          </g>
        ))}
      </g>

      {/* クラクションの輪。音だけが鳴っている。 */}
      <g
        className="vietnam-kx-horn1"
        fill="none"
        stroke="#f2ece0"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.8"
      >
        <path d="M66,120q9,-7 9,-17M76,124q13,-9 13,-24" />
      </g>
      <g
        className="vietnam-kx-horn2"
        fill="none"
        stroke="#f2ece0"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.8"
      >
        <path d="M330,118q-9,-7 -9,-17M320,122q-13,-9 -13,-24" />
      </g>

      {/* 排気のもや。 */}
      <g className="vietnam-kx-fume" fill="#cfc8b4" opacity="0.3">
        <ellipse cx="130" cy="186" rx="120" ry="8" />
        <ellipse cx="310" cy="176" rx="90" ry="7" />
      </g>

      <style>{`
        .vietnam-kx-front {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: vietnam-kx-inch 4.4s ease-in-out infinite;
        }
        .vietnam-kx-back {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: vietnam-kx-inch 4.4s ease-in-out -2.2s infinite;
        }
        @keyframes vietnam-kx-inch {
          0%, 100% { transform: translateX(0); }
          46% { transform: translateX(5px); }
          52% { transform: translateX(5px); }
        }
        .vietnam-kx-horn1 {
          transform-box: fill-box;
          transform-origin: 0% 100%;
          animation: vietnam-kx-honk 1.4s ease-out infinite;
        }
        .vietnam-kx-horn2 {
          transform-box: fill-box;
          transform-origin: 100% 100%;
          animation: vietnam-kx-honk 1.9s ease-out -0.7s infinite;
        }
        @keyframes vietnam-kx-honk {
          0% { transform: scale(0.55); opacity: 0.9; }
          100% { transform: scale(1.3); opacity: 0; }
        }
        .vietnam-kx-blink {
          animation: vietnam-kx-indicator 1s steps(1, end) infinite;
        }
        @keyframes vietnam-kx-indicator {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0.18; }
        }
        .vietnam-kx-lean {
          transform-box: fill-box;
          transform-origin: 0% 100%;
          animation: vietnam-kx-look 5s ease-in-out infinite;
        }
        @keyframes vietnam-kx-look {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }
        .vietnam-kx-fume {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: vietnam-kx-idle 6s ease-in-out infinite;
        }
        @keyframes vietnam-kx-idle {
          0%, 100% { transform: translateY(0) scaleY(1); opacity: 0.2; }
          50% { transform: translateY(-5px) scaleY(1.3); opacity: 0.4; }
        }
        @media (prefers-reduced-motion: reduce) {
          .vietnam-kx-front,
          .vietnam-kx-back,
          .vietnam-kx-horn1,
          .vietnam-kx-horn2,
          .vietnam-kx-blink,
          .vietnam-kx-lean,
          .vietnam-kx-fume { animation: none; }
        }
      `}</style>
    </svg>
  );
}
