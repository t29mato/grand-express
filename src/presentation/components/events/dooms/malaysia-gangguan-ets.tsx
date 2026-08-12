/**
 * ETS(電化特急)が技術的な不具合で立ち往生する。停まった列車の下から
 * 煙がわずかに上がり、信号灯が赤く明滅する。乗客の姿は描かず、
 * 止まった列車と信号、煙だけで「動かない」ことを表す。
 *
 * 動くのは信号灯の明滅と、立ちのぼる煙だけ(列車自体は止まったまま)。
 */
export function MalaysiaGangguanEts() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 曇りがちな午後。 */}
      <rect width="400" height="210" fill="#8fc4e8" />
      <rect y="0" width="400" height="100" fill="#a8d4ec" />
      <g fill="#c9d0d4" opacity="0.8">
        <ellipse cx="80" cy="40" rx="60" ry="16" />
        <ellipse cx="300" cy="34" rx="70" ry="18" />
      </g>

      {/* 高架の複線。 */}
      <path d="M0,120c60,-16 340,-16 400,0v14H0z" fill="#7fae5a" opacity="0.85" />
      <rect y="134" width="400" height="76" fill="#9a8f78" />
      <g stroke="#5a4630" strokeWidth="2">
        <path d="M10,150h380M10,162h380" />
      </g>
      <g fill="#5a4630">
        <rect x="20" y="146" width="4" height="20" />
        <rect x="60" y="146" width="4" height="20" />
        <rect x="100" y="146" width="4" height="20" />
        <rect x="140" y="146" width="4" height="20" />
        <rect x="180" y="146" width="4" height="20" />
        <rect x="220" y="146" width="4" height="20" />
        <rect x="260" y="146" width="4" height="20" />
        <rect x="300" y="146" width="4" height="20" />
        <rect x="340" y="146" width="4" height="20" />
        <rect x="380" y="146" width="4" height="20" />
      </g>

      {/* 架線の柱。 */}
      <rect x="40" y="90" width="6" height="60" fill="#8a8478" />
      <rect x="340" y="90" width="6" height="60" fill="#8a8478" />
      <line x1="43" y1="94" x2="343" y2="94" stroke="#5a5a5a" strokeWidth="2" />

      {/* 停まったETS列車(1両ぶんを大きく)。 */}
      <g>
        <rect x="90" y="112" width="220" height="38" rx="8" fill="#e8443f" />
        <rect x="90" y="112" width="220" height="14" fill="#c9d4de" />
        <rect x="104" y="128" width="26" height="14" fill="#bfe0f0" />
        <rect x="140" y="128" width="26" height="14" fill="#bfe0f0" />
        <rect x="176" y="128" width="26" height="14" fill="#bfe0f0" />
        <rect x="212" y="128" width="26" height="14" fill="#bfe0f0" />
        <rect x="248" y="128" width="26" height="14" fill="#bfe0f0" />
        <circle cx="120" cy="152" r="8" fill="#3a3f4a" />
        <circle cx="200" cy="152" r="8" fill="#3a3f4a" />
        <circle cx="280" cy="152" r="8" fill="#3a3f4a" />
        {/* 集電装置(パンタグラフ) */}
        <path d="M180,112 L188,98 L212,98 L220,112" fill="none" stroke="#5a5a5a" strokeWidth="2.4" />
      </g>

      {/* わずかに立ちのぼる煙(車両下部)。 */}
      <g className="my-ge-smoke" fill="#c8c8c8" opacity="0.7">
        <circle cx="0" cy="0" r="7" />
        <circle cx="6" cy="-8" r="5" />
        <circle cx="-4" cy="-14" r="4" />
      </g>

      {/* 赤く明滅する信号灯。 */}
      <g>
        <rect x="360" y="120" width="4" height="30" fill="#5a5a5a" />
        <circle className="my-ge-signal" cx="362" cy="116" r="6" fill="#e8443f" />
      </g>

      <style>{`
        .my-ge-smoke {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          transform: translate(240px, 150px);
          animation: my-ge-puff 2.4s ease-out infinite;
        }
        @keyframes my-ge-puff {
          0% { transform: translate(240px, 150px) scale(0.6); opacity: 0; }
          20% { opacity: 0.7; }
          100% { transform: translate(240px, 118px) scale(1.3); opacity: 0; }
        }
        .my-ge-signal {
          animation: my-ge-blink 1s step-end infinite;
        }
        @keyframes my-ge-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0.25; }
        }
        @media (prefers-reduced-motion: reduce) {
          .my-ge-smoke { animation: none; opacity: 0; }
          .my-ge-signal { animation: none; opacity: 1; }
        }
      `}</style>
    </svg>
  );
}
