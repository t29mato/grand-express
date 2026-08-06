/**
 * 標高3,600mで高山病(ソローチェ)にやられ、酸素とコカ茶に金を払う(ラパス)。
 *
 *   - すり鉢状の斜面にレンガの家が積み上がる
 *   - 頭を抱えて座り込み、こめかみで痛みが脈打つ
 *   - 隣には酸素ボンベと湯気の立つコカ茶、財布からは小銭が消えていく
 */
export function Soroche() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 高地の空と雪嶺 */}
      <rect width="400" height="210" fill="#3f6390" />
      <rect y="44" width="400" height="22" fill="#6d8fb4" />
      <path d="M186,68 L246,18 L306,68z" fill="#7d93ad" />
      <path d="M246,18 L268,36 L224,36z" fill="#f2f6f8" />
      <path d="M290,68 L338,30 L386,68z" fill="#6e83a0" />
      <path d="M338,30 L354,44 L322,44z" fill="#f2f6f8" />
      <path d="M0,68 L44,34 L92,68z" fill="#6e83a0" />
      <path d="M44,34 L58,46 L30,46z" fill="#f2f6f8" />

      {/* 斜面のレンガの家 */}
      <rect y="66" width="400" height="76" fill="#7a4a35" />
      <g fill="#9a5a3f">
        <rect x="6" y="70" width="34" height="24" />
        <rect x="48" y="76" width="30" height="22" />
        <rect x="88" y="68" width="36" height="26" />
        <rect x="134" y="78" width="30" height="20" />
        <rect x="172" y="72" width="34" height="24" />
        <rect x="216" y="80" width="30" height="20" />
        <rect x="256" y="70" width="34" height="24" />
        <rect x="300" y="78" width="30" height="22" />
        <rect x="340" y="72" width="36" height="24" />
        <rect x="16" y="102" width="32" height="26" />
        <rect x="58" y="106" width="34" height="24" />
        <rect x="104" y="100" width="30" height="28" />
        <rect x="146" y="108" width="34" height="22" />
        <rect x="192" y="102" width="30" height="26" />
        <rect x="232" y="106" width="34" height="24" />
        <rect x="278" y="100" width="30" height="28" />
        <rect x="320" y="106" width="34" height="24" />
        <rect x="364" y="102" width="30" height="26" />
      </g>
      <g fill="#3b2b24">
        <rect x="18" y="76" width="8" height="9" />
        <rect x="100" y="74" width="8" height="9" />
        <rect x="184" y="78" width="8" height="9" />
        <rect x="268" y="76" width="8" height="9" />
        <rect x="352" y="78" width="8" height="9" />
        <rect x="26" y="110" width="8" height="9" />
        <rect x="114" y="108" width="8" height="9" />
        <rect x="202" y="110" width="8" height="9" />
        <rect x="290" y="108" width="8" height="9" />
        <rect x="374" y="110" width="8" height="9" />
      </g>

      {/* 座り込む段と地面 */}
      <rect y="140" width="400" height="70" fill="#4f4237" />
      <rect x="52" y="152" width="176" height="34" fill="#6b5a4a" />
      <rect x="52" y="148" width="176" height="6" fill="#7d6a58" />
      <rect y="186" width="400" height="24" fill="#453a30" />

      {/* 頭を抱える旅人 */}
      <g transform="translate(126,148)">
        <rect x="-6" y="-15" width="38" height="16" rx="7" fill="#3b4a63" />
        <rect x="20" y="-6" width="13" height="32" rx="6" fill="#3b4a63" />
        <rect x="16" y="22" width="24" height="9" rx="4" fill="#2a2028" />
        <path d="M-12,-14 L-18,-44 L6,-50 L14,-18z" fill="#e8443f" />
        <circle cx="-6" cy="-60" r="14" fill="#f6efe2" />
        <path d="M-20,-62 a14,14 0 0 1 28,0 L6,-63 L-19,-62z" fill="#3b2f2a" />
        <path d="M-14,-56 q4,3 8,0" stroke="#2a2028" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M-2,-56 q4,3 8,0" stroke="#2a2028" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M-10,-48 q5,-4 10,0" stroke="#2a2028" strokeWidth="2" fill="none" strokeLinecap="round" />
        <rect x="-16" y="-46" width="10" height="26" rx="5" fill="#e8443f" transform="rotate(24 -11 -33)" />
        <rect x="-30" y="-78" width="24" height="9" rx="4" fill="#f6efe2" transform="rotate(14 -18 -74)" />
        <circle cx="-28" cy="-74" r="7" fill="#f6efe2" />
      </g>

      {/* こめかみの痛み */}
      <g fill="none" stroke="#f5b31c" strokeWidth="3" strokeLinecap="round">
        <path className="soro-ring soro-ring-a" d="M120,66 a22,22 0 0 1 0,44" />
        <path className="soro-ring soro-ring-b" d="M120,58 a30,30 0 0 1 0,60" />
        <path className="soro-ring soro-ring-c" d="M120,50 a38,38 0 0 1 0,76" />
      </g>

      {/* ザック */}
      <g transform="translate(72,182)">
        <rect x="-16" y="-26" width="32" height="26" rx="8" fill="#2f8f5b" />
        <rect x="-11" y="-20" width="22" height="10" rx="3" fill="#256f47" />
        <rect x="-16" y="-30" width="12" height="8" rx="4" fill="#256f47" />
      </g>

      {/* コカ茶 */}
      <g transform="translate(252,186)">
        <path d="M-14,-20 L14,-20 L11,0 L-11,0z" fill="#f6efe2" />
        <path d="M14,-16 a8,8 0 0 1 0,12" stroke="#f6efe2" strokeWidth="3" fill="none" />
        <rect x="-12" y="-17" width="24" height="6" fill="#8fb04a" />
        <path d="M-4,-18 C0,-24 8,-24 10,-18 C6,-14 0,-14 -4,-18z" fill="#4f9e4a" />
        <g stroke="#dbe8ef" strokeWidth="3" fill="none" strokeLinecap="round">
          <path className="soro-steam soro-steam-a" d="M-6,-28 C-10,-34 -2,-38 -6,-46" />
          <path className="soro-steam soro-steam-b" d="M6,-28 C2,-34 10,-38 6,-46" />
        </g>
      </g>

      {/* 酸素ボンベ */}
      <g transform="translate(330,186)">
        <ellipse cx="0" cy="2" rx="20" ry="5" fill="#3a3028" />
        <rect x="-15" y="-52" width="30" height="54" rx="12" fill="#5b8fe8" />
        <rect x="-15" y="-30" width="30" height="8" fill="#f6efe2" />
        <rect x="-7" y="-60" width="14" height="10" rx="3" fill="#c9ccd2" />
        <circle className="soro-gauge" cx="0" cy="-66" r="6" fill="#c9ccd2" />
        <path d="M-8,-62 C-26,-58 -34,-42 -32,-28" stroke="#c9ccd2" strokeWidth="4" fill="none" />
        <ellipse cx="-36" cy="-22" rx="12" ry="9" fill="#f6efe2" />
        <ellipse cx="-36" cy="-22" rx="6" ry="4" fill="#c9ccd2" />
      </g>

      {/* 出ていく小銭 */}
      <g fill="#f5b31c">
        <circle className="soro-coin-a" cx="288" cy="120" r="7" />
        <circle className="soro-coin-b" cx="306" cy="102" r="6" />
      </g>

      <style>{`
        .soro-ring { opacity: 0.7; }
        .soro-ring-a { animation: soro-throb 1.2s ease-out infinite; }
        .soro-ring-b { animation: soro-throb 1.2s ease-out infinite; animation-delay: 0.16s; }
        .soro-ring-c { animation: soro-throb 1.2s ease-out infinite; animation-delay: 0.32s; }
        .soro-steam { transform-box: fill-box; transform-origin: 50% 100%; }
        .soro-steam-a { animation: soro-waft 2.6s ease-out infinite; }
        .soro-steam-b { animation: soro-waft 2.6s ease-out infinite; animation-delay: -1.3s; }
        .soro-gauge { animation: soro-pulse 1.8s ease-in-out infinite; }
        .soro-coin-a { animation: soro-spend 2.4s ease-out infinite; }
        .soro-coin-b { animation: soro-spend 2.4s ease-out infinite; animation-delay: -1.2s; }
        @keyframes soro-throb {
          0% { opacity: 0.9; stroke-width: 4; }
          60%, 100% { opacity: 0.12; stroke-width: 2; }
        }
        @keyframes soro-waft {
          0% { transform: translateY(10px) scale(0.5); opacity: 0; }
          30% { opacity: 0.9; }
          100% { transform: translateY(-14px) scale(1.1); opacity: 0; }
        }
        @keyframes soro-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes soro-spend {
          0% { transform: translate(0, 40px); opacity: 0; }
          25% { opacity: 1; }
          100% { transform: translate(24px, -46px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .soro-ring-a, .soro-ring-b, .soro-ring-c, .soro-steam-a, .soro-steam-b,
          .soro-gauge, .soro-coin-a, .soro-coin-b { animation: none; }
        }
      `}</style>
    </svg>
  );
}
