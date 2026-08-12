/**
 * 旧正月の麻雀卓で負け続け、コインが対戦相手へ滑っていく。牌は
 * 文字のない筒子(丸の模様)だけで描き、負けの表現はコインの移動と
 * 牌が伏せられる動きだけにする。
 *
 * 動くのは滑っていくコインと、伏せられる牌だけ。
 */
export function MalaysiaKalahMahjong() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 居間の明かり。 */}
      <rect width="400" height="210" fill="#3a3242" />
      <rect y="0" width="400" height="60" fill="#4a4252" />
      <g fill="#f4c430" opacity="0.5">
        <circle cx="200" cy="20" r="16" />
      </g>

      {/* 卓。 */}
      <rect x="10" y="70" width="380" height="130" rx="10" fill="#3f6a3f" />
      <rect x="10" y="70" width="380" height="130" rx="10" fill="none" stroke="#2f4a2f" strokeWidth="4" />

      {/* 自分側の伏せられた牌の列(丸模様=筒子、文字は使わない)。 */}
      <g>
        {[60, 100, 140, 180, 220, 260, 300, 340].map((x, i) => (
          <g key={x}>
            <rect x={x} y="150" width="26" height="34" rx="3" fill="#f6efe2" stroke="#c9c0a8" strokeWidth="1.2" />
            {i % 2 === 0 && (
              <g fill="#5b8fe8" opacity="0.85">
                <circle cx={x + 13} cy="160" r="3" />
                <circle cx={x + 13} cy="170" r="3" />
              </g>
            )}
          </g>
        ))}
      </g>

      {/* 対戦相手側の牌(伏せ牌)。 */}
      <g fill="#2f4a2f">
        <rect x="60" y="82" width="26" height="34" rx="3" />
        <rect x="100" y="82" width="26" height="34" rx="3" />
        <rect x="140" y="82" width="26" height="34" rx="3" />
        <rect x="180" y="82" width="26" height="34" rx="3" />
      </g>

      {/* 中央に積まれた牌山。 */}
      <g fill="#f6efe2" stroke="#c9c0a8" strokeWidth="1">
        <rect x="240" y="94" width="20" height="26" rx="2" />
        <rect x="262" y="94" width="20" height="26" rx="2" />
        <rect x="284" y="94" width="20" height="26" rx="2" />
      </g>

      {/* 崩れて伏せられる牌(手前で1枚倒れる)。 */}
      <g className="my-km-fallen">
        <rect x="-13" y="-17" width="26" height="34" rx="3" fill="#f6efe2" stroke="#c9c0a8" strokeWidth="1.2" />
        <g fill="#e8443f" opacity="0.85">
          <circle cx="-4" cy="-8" r="3" />
          <circle cx="4" cy="-8" r="3" />
          <circle cx="-4" cy="0" r="3" />
          <circle cx="4" cy="0" r="3" />
        </g>
      </g>

      {/* 対戦相手へ滑っていくコイン。 */}
      <g className="my-km-coin-1" fill="#f4c430" stroke="#c9a020" strokeWidth="1.2">
        <circle cx="0" cy="0" r="8" />
      </g>
      <g className="my-km-coin-2" fill="#f4c430" stroke="#c9a020" strokeWidth="1.2">
        <circle cx="0" cy="0" r="7" />
      </g>
      <g className="my-km-coin-3" fill="#f4c430" stroke="#c9a020" strokeWidth="1.2">
        <circle cx="0" cy="0" r="6" />
      </g>

      <style>{`
        .my-km-fallen {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          transform: translate(200px, 185px) rotate(0deg);
          animation: my-km-topple 2.6s ease-in-out infinite;
        }
        @keyframes my-km-topple {
          0%, 60% { transform: translate(200px, 185px) rotate(0deg); }
          80%, 100% { transform: translate(200px, 178px) rotate(88deg); }
        }
        .my-km-coin-1 {
          animation: my-km-slide 2.6s ease-in infinite;
        }
        .my-km-coin-2 {
          animation: my-km-slide 2.6s ease-in infinite 0.3s;
        }
        .my-km-coin-3 {
          animation: my-km-slide 2.6s ease-in infinite 0.6s;
        }
        @keyframes my-km-slide {
          0%, 55% { transform: translate(150px, 168px); opacity: 1; }
          100% { transform: translate(150px, 100px); opacity: 0.9; }
        }
        @media (prefers-reduced-motion: reduce) {
          .my-km-fallen { animation: none; transform: translate(200px, 178px) rotate(88deg); }
          .my-km-coin-1, .my-km-coin-2, .my-km-coin-3 { animation: none; transform: translate(150px, 100px); }
        }
      `}</style>
    </svg>
  );
}
