/**
 * 両替所でごまかされる。窓口に大きな紙幣を差し入れると、
 * 戻ってくるのは小さなコインの山だけ――という一連の動きだけで語る。
 * 数字・文字は使わず、紙幣とコインの**大きさの違い**だけで損を示す。
 */
export function RussiaObmennik() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 通りの空。 */}
      <rect width="400" height="210" fill="#8fc4e8" />
      <rect y="0" width="400" height="86" fill="#cfe4f0" />

      {/* 建物の壁。 */}
      <rect y="86" width="400" height="124" fill="#c9b896" />
      <rect y="86" width="400" height="6" fill="#b8a67e" />

      {/* 両替所のキオスク。 */}
      <g strokeLinejoin="round">
        <rect x="150" y="100" width="140" height="70" fill="#e8dcc0" stroke="#20364a" strokeWidth="2.4" />
        {/* 相場表(数字ではなく色帯だけで「良い数字/悪い数字」を示す)。 */}
        <rect x="164" y="112" width="46" height="14" rx="2" fill="#3fae5a" />
        <rect x="164" y="130" width="26" height="8" rx="2" fill="#e8443f" opacity="0.85" />
        {/* 窓口の穴。 */}
        <rect x="230" y="126" width="40" height="10" rx="3" fill="#20364a" />
      </g>

      {/* 手前のカウンター。 */}
      <rect x="140" y="170" width="160" height="14" fill="#8a7a5a" />

      {/* 紙幣(窓口へ滑り込む、大きい)。 */}
      <g className="ro-note">
        <rect x="0" y="0" width="44" height="22" rx="2" fill="#3fae5a" stroke="#20364a" strokeWidth="1.8" />
        <ellipse cx="22" cy="11" rx="10" ry="6" fill="#f6efe2" opacity="0.8" />
      </g>

      {/* 出てくるコインの山(小さい、紙幣より軽い実質)。 */}
      <g className="ro-coins" fill="#c8a860" stroke="#8a7530" strokeWidth="1.4">
        <circle cx="0" cy="4" r="7" />
        <circle cx="10" cy="6" r="7" />
        <circle cx="5" cy="-4" r="7" />
      </g>

      <style>{`
        .ro-note {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: ro-in 3.6s linear infinite;
        }
        @keyframes ro-in {
          0% { transform: translate(150px, 128px); opacity: 1; }
          28% { transform: translate(238px, 128px); opacity: 1; }
          34% { transform: translate(238px, 128px); opacity: 0; }
          100% { transform: translate(238px, 128px); opacity: 0; }
        }
        .ro-coins {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: ro-out 3.6s linear infinite;
        }
        @keyframes ro-out {
          0%, 40% { transform: translate(250px, 128px); opacity: 0; }
          52% { transform: translate(250px, 128px); opacity: 1; }
          80% { transform: translate(310px, 150px); opacity: 1; }
          100% { transform: translate(310px, 150px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ro-note { animation: none; opacity: 0; }
          .ro-coins { animation: none; transform: translate(310px, 150px); opacity: 1; }
        }
      `}</style>
    </svg>
  );
}
