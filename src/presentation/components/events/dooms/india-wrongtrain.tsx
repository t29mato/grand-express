/**
 * 乗る列車を間違えた。一つのホームに二本、決めるのに三十秒。
 *
 * 飛び乗ったほうが動きだしてから、隣に残ったほうが正解だったと分かる。
 * 手前の列車は左へ流れ、旅人はドアから身を乗り出して振り返る。
 *
 * 位置決めは外側の <g transform>、動きは内側のクラス。
 * CSSのtransformは属性のtransformを上書きするので、両方を同じ要素に付けない。
 */
export function IndiaWrongtrain() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 駅の上屋 */}
      <rect width="400" height="210" fill="#22303f" />
      <rect width="400" height="26" fill="#2b3a4a" />
      <g fill="#1b2733">
        <rect y="26" width="400" height="5" />
        <rect x="40" y="0" width="7" height="44" />
        <rect x="196" y="0" width="7" height="40" />
        <rect x="336" y="0" width="7" height="44" />
      </g>
      <g fill="#f5b31c" opacity="0.6">
        <circle cx="100" cy="30" r="5" />
        <circle cx="266" cy="30" r="5" />
      </g>

      {/* 向こう側に残っている「正しい」列車 */}
      <g>
        <rect y="42" width="400" height="52" rx="4" fill="#8a4238" />
        <rect y="42" width="400" height="9" fill="#9a5044" />
        <rect y="66" width="400" height="6" fill="#e8d9b8" />
        <g fill="#1f2c38">
          <rect x="16" y="50" width="34" height="15" rx="2" />
          <rect x="64" y="50" width="34" height="15" rx="2" />
          <rect x="112" y="50" width="34" height="15" rx="2" />
          <rect x="212" y="50" width="34" height="15" rx="2" />
          <rect x="260" y="50" width="34" height="15" rx="2" />
          <rect x="308" y="50" width="34" height="15" rx="2" />
          <rect x="356" y="50" width="34" height="15" rx="2" />
          <rect x="164" y="46" width="36" height="48" rx="2" />
        </g>
        {/* 行先板(緑) */}
        <rect x="216" y="74" width="46" height="14" rx="2" fill="#2f8a5a" />
        <rect x="222" y="79" width="34" height="4" rx="2" fill="#bde8cf" />
        <rect y="90" width="400" height="6" fill="#6b332c" />
      </g>

      {/* ホーム */}
      <rect y="96" width="400" height="38" fill="#8a7d68" />
      <rect y="96" width="400" height="6" fill="#9a8d78" />
      <rect y="126" width="400" height="8" fill="#f5b31c" />
      <rect y="134" width="400" height="6" fill="#5c5245" />

      {/* うっかり乗ってしまった手前の列車 */}
      <g className="iwt-train">
        <rect x="-40" y="140" width="480" height="62" rx="5" fill="#2f5f8a" />
        <rect x="-40" y="140" width="480" height="10" fill="#3a7099" />
        <rect x="-40" y="168" width="480" height="7" fill="#e8d9b8" />
        <g fill="#16222e">
          <rect x="-24" y="150" width="42" height="17" rx="2" />
          <rect x="34" y="150" width="42" height="17" rx="2" />
          <rect x="92" y="150" width="42" height="17" rx="2" />
          <rect x="290" y="150" width="42" height="17" rx="2" />
          <rect x="348" y="150" width="42" height="17" rx="2" />
          <rect x="398" y="150" width="42" height="17" rx="2" />
        </g>
        {/* 行先板(赤) */}
        <rect x="92" y="178" width="46" height="14" rx="2" fill="#c04434" />
        <rect x="98" y="183" width="34" height="4" rx="2" fill="#f6d8d8" />

        {/* 開いたドアと身を乗り出す旅人 */}
        <rect x="176" y="140" width="94" height="62" fill="#16222e" />
        <rect x="176" y="140" width="8" height="62" fill="#24485f" />
        <rect x="262" y="140" width="8" height="62" fill="#24485f" />
        <g transform="translate(226,190)">
          <g className="iwt-lean">
            <rect x="-15" y="-26" width="30" height="38" rx="9" fill="#e8a44a" />
            <rect x="-38" y="-20" width="26" height="9" rx="4" fill="#e8a44a" />
            <circle cx="-40" cy="-16" r="6" fill="#f6efe2" />
            <circle cx="0" cy="-36" r="12" fill="#f6efe2" />
            <path d="M-12,-38 a12,12 0 0 1 24,0 l0,4 -7,-6 -17,4z" fill="#2a1f18" />
            <circle cx="-6" cy="-36" r="2.6" fill="#241a12" />
            <circle cx="5" cy="-36" r="2.6" fill="#241a12" />
            <ellipse cx="0" cy="-28" rx="4" ry="3.4" fill="#c9563a" />
          </g>
        </g>
      </g>

      {/* 流れる速度線 */}
      <g fill="#a8cfe4" opacity="0.45">
        <rect className="iwt-speed-a" x="300" y="146" width="70" height="4" rx="2" />
        <rect className="iwt-speed-b" x="300" y="186" width="90" height="4" rx="2" />
        <rect className="iwt-speed-c" x="300" y="166" width="56" height="4" rx="2" />
      </g>

      {/* 振り返って気づく */}
      <g transform="translate(166,122)">
        <g className="iwt-burst">
          <path
            d="M0,-22 L6,-8 L20,-12 L11,-1 L22,8 L7,7 L8,22 L0,10 L-8,21 L-8,6 L-22,8 L-12,-1 L-21,-11 L-7,-8z"
            fill="#f5b31c"
          />
        </g>
      </g>
      <g transform="translate(302,116) rotate(-90)">
        <g className="iwt-arrow">
          <rect x="-24" y="-5" width="32" height="11" rx="3" fill="#e05252" />
          <path d="M4,-15 L23,0 L4,15z" fill="#e05252" />
        </g>
      </g>
      <g transform="translate(216,140)">
        <g className="iwt-drop">
          <path d="M0,-9 q7,7 7,11 a7,7 0 0 1 -14,0 q0,-4 7,-11z" fill="#8fc4e8" />
        </g>
      </g>

      <style>{`
        .iwt-train {
          transform-box: fill-box;
          transform-origin: center;
          transform: translate(-26px, 0);
          animation: iwt-depart 4.6s ease-in infinite;
        }
        .iwt-lean {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          transform: rotate(-9deg);
          animation: iwt-look 4.6s ease-in-out infinite;
        }
        .iwt-speed-a { transform-box: fill-box; transform-origin: center; animation: iwt-streak 0.9s linear infinite; }
        .iwt-speed-b { transform-box: fill-box; transform-origin: center; animation: iwt-streak 1.1s linear infinite; animation-delay: -0.4s; }
        .iwt-speed-c { transform-box: fill-box; transform-origin: center; animation: iwt-streak 0.8s linear infinite; animation-delay: -0.6s; }
        .iwt-burst {
          transform-box: fill-box;
          transform-origin: center;
          animation: iwt-pop 4.6s ease-out infinite;
        }
        .iwt-arrow {
          transform-box: fill-box;
          transform-origin: center;
          animation: iwt-point 4.6s ease-in-out infinite;
        }
        .iwt-drop {
          transform-box: fill-box;
          transform-origin: top center;
          opacity: 0;
          animation: iwt-bead 4.6s ease-in infinite;
        }
        @keyframes iwt-depart {
          0%, 16% { transform: translate(0, 0); }
          100% { transform: translate(-88px, 0); }
        }
        @keyframes iwt-look {
          0%, 20% { transform: rotate(0deg); }
          40%, 100% { transform: rotate(-11deg); }
        }
        @keyframes iwt-streak {
          0% { transform: translate(120px, 0) scaleX(0.4); opacity: 0; }
          30%, 70% { opacity: 0.45; }
          100% { transform: translate(-260px, 0) scaleX(1.4); opacity: 0; }
        }
        @keyframes iwt-pop {
          0%, 26% { transform: scale(0); opacity: 0; }
          36% { transform: scale(1.25); opacity: 1; }
          46% { transform: scale(1); opacity: 1; }
          86% { transform: scale(1); opacity: 1; }
          100% { transform: scale(0.9); opacity: 0; }
        }
        @keyframes iwt-point {
          0%, 30% { transform: translate(-14px, 0); opacity: 0; }
          44% { transform: translate(0, 0); opacity: 1; }
          62% { transform: translate(8px, 0); opacity: 1; }
          80% { transform: translate(0, 0); opacity: 1; }
          100% { transform: translate(-14px, 0); opacity: 0; }
        }
        @keyframes iwt-bead {
          0%, 44% { transform: translate(0, -6px) scale(0.4); opacity: 0; }
          56% { transform: translate(0, 0) scale(1); opacity: 0.9; }
          88%, 100% { transform: translate(-4px, 26px) scale(1); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .iwt-train, .iwt-lean, .iwt-speed-a, .iwt-speed-b, .iwt-speed-c,
          .iwt-burst, .iwt-arrow, .iwt-drop { animation: none; }
        }
      `}</style>
    </svg>
  );
}
