/**
 * 嵐で沿岸航路が止まる。
 *
 * 波が船長の定める限界の高さに達し、その日の便が数時間前の通告だけで欠航になる。
 * 動くのは**防波堤に砕ける波・降りしきる雨・岸につながれたまま揺れる船**。
 * 止めた状態でも、波が防波堤を越え、船が舫われたまま傾いている構図で分かる。
 */
export function NorwayHavstorm() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 荒れた空。 */}
      <rect width="400" height="210" fill="#4a5a6a" />
      <rect y="0" width="400" height="72" fill="#3f4d5c" />
      <g fill="#2f3b48" opacity="0.75">
        <ellipse cx="70" cy="22" rx="66" ry="16" />
        <ellipse cx="230" cy="14" rx="80" ry="18" />
        <ellipse cx="352" cy="30" rx="56" ry="14" />
      </g>

      {/* 遠くの岬(中景)。 */}
      <path d="M0,104c40,-24 92,-30 140,-20l-10,20z" fill="#2f3f46" />
      <path d="M400,104c-38,-26 -90,-30 -136,-18l8,18z" fill="#2a3a42" />

      {/* 海。 */}
      <rect y="104" width="400" height="106" fill="#1f3a4c" />
      <g stroke="#3f6478" strokeWidth="3" fill="none" opacity="0.8">
        <path d="M0,124q40,-10 80,0t80,0 80,0 80,0 80,0" />
        <path d="M0,146q46,-12 92,0t92,0 92,0 92,0" />
      </g>

      {/* 防波堤と灯標(中景・右)。 */}
      <path d="M244,142h156v14H256z" fill="#6b7078" />
      <path d="M244,142l-14,14h28z" fill="#5f646e" />
      <rect x="238" y="118" width="12" height="24" fill="#c0453c" />
      <rect x="234" y="110" width="20" height="9" fill="#f0ece0" />
      <circle cx="244" cy="106" r="4" fill="#f5b31c" />

      {/* 舫われた渡船(左)。**ここが揺れる。** */}
      <g className="nhs-ferry">
        <path d="M18,150h150l-18,26H36z" fill="#2f4a5f" />
        <rect x="18" y="142" width="150" height="9" fill="#f0ece0" />
        <rect x="40" y="116" width="96" height="26" fill="#f0ece0" />
        <rect x="60" y="98" width="52" height="19" fill="#e8e4d8" />
        <g fill="#3f5f7a">
          <rect x="48" y="122" width="16" height="12" />
          <rect x="72" y="122" width="16" height="12" />
          <rect x="96" y="122" width="16" height="12" />
          <rect x="120" y="122" width="12" height="12" />
          <rect x="68" y="103" width="14" height="10" />
          <rect x="90" y="103" width="14" height="10" />
        </g>
        <rect x="82" y="76" width="4" height="24" fill="#4a4f58" />
        <rect x="72" y="72" width="24" height="7" rx="2" fill="#c0453c" />
        <circle cx="20" cy="146" r="4" fill="#f5b31c" />
      </g>
      {/* 舫い綱(揺れても岸から離れないことを示す)。 */}
      <g stroke="#c8b48a" strokeWidth="2.4" fill="none">
        <path d="M168,150q22,10 40,18" />
        <path d="M168,158q26,8 44,12" />
      </g>
      <g fill="#5f666e">
        <rect x="206" y="164" width="12" height="18" rx="3" />
      </g>

      {/* 防波堤に砕ける波。**ここが動く。** */}
      <g className="nhs-crash">
        {/* 巻き上がって崩れる波頭。防波堤を越えている。 */}
        <path
          d="M206,152c0,-40 26,-72 62,-80c-14,14 -20,30 -18,46c14,-16 34,-20 52,-10c-22,0 -36,12 -42,30c-8,24 -30,32 -54,14z"
          fill="#dfeef6"
        />
        <path d="M232,150c-2,-26 10,-46 32,-56c-10,12 -14,26 -12,40c-2,14 -10,20 -20,16z" fill="#f4fafc" />
        <g fill="#eef6fa">
          <ellipse cx="298" cy="102" rx="15" ry="9" opacity="0.8" />
          <ellipse cx="322" cy="90" rx="10" ry="6" opacity="0.6" />
          <ellipse cx="212" cy="96" rx="12" ry="8" opacity="0.65" />
          <ellipse cx="188" cy="82" rx="8" ry="5" opacity="0.5" />
        </g>
      </g>

      {/* 手前のうねり。**ここが上下する。** */}
      <g className="nhs-swell">
        <path d="M0,180q56,-26 112,-6t116,-2 172,-14v52H0z" fill="#2a5062" />
        <path d="M0,192q60,-20 120,-2t120,-4 160,-10v34H0z" fill="#1a3546" />
        <g fill="#dfeef6" opacity="0.75">
          <path d="M30,178q18,-10 36,-2q-18,6 -36,2z" />
          <path d="M156,180q20,-11 40,-2q-20,7 -40,2z" />
          <path d="M300,170q18,-10 36,-2q-18,7 -36,2z" />
        </g>
      </g>

      {/* 雨。 */}
      <g className="nhs-rain" stroke="#cfe0ea" strokeWidth="1.8" opacity="0.55" strokeLinecap="round" fill="none">
        <path d="M20,-16l-8,26M62,-30l-8,26M104,-8l-8,26M148,-26l-8,26M192,-14l-8,26M236,-32l-8,26M280,-10l-8,26M324,-28l-8,26M368,-18l-8,26" />
        <path d="M40,24l-8,26M84,10l-8,26M128,30l-8,26M172,14l-8,26M216,32l-8,26M260,12l-8,26M304,28l-8,26M348,16l-8,26M392,30l-8,26" />
        <path d="M10,66l-8,26M54,52l-8,26M98,72l-8,26M142,56l-8,26M186,74l-8,26M230,54l-8,26M274,70l-8,26M318,58l-8,26M362,72l-8,26" />
      </g>

      {/* 岸で見送る人(欠航を告げられた側)。 */}
      <g>
        <rect x="330" y="146" width="7" height="18" fill="#3f3428" />
        <rect x="340" y="146" width="7" height="18" fill="#3f3428" />
        <path d="M328,118h22l3,30h-28z" fill="#c0453c" />
        <circle cx="339" cy="112" r="7" fill="#e8c8a8" />
        <path d="M331,110a8,8 0 0 1 16,0z" fill="#3f4a56" />
        <path d="M350,124l14,-6" stroke="#c0453c" strokeWidth="4" strokeLinecap="round" fill="none" />
        <rect x="360" y="112" width="12" height="10" rx="2" fill="#5a4630" />
      </g>

      <style>{`
        .nhs-ferry {
          transform-box: fill-box;
          transform-origin: 50% 90%;
          animation: nhs-rock 3.4s ease-in-out infinite;
        }
        @keyframes nhs-rock {
          0%, 100% { transform: rotate(-5deg) translateY(0); }
          50%      { transform: rotate(5deg) translateY(-6px); }
        }
        .nhs-crash {
          transform-box: fill-box;
          transform-origin: 20% 100%;
          animation: nhs-break 2.8s ease-out infinite;
        }
        @keyframes nhs-break {
          0%, 100% { transform: scale(0.35) translateY(30px); opacity: 0; }
          30%      { transform: scale(1) translateY(0); opacity: 1; }
          70%      { transform: scale(1.25) translateY(-10px); opacity: 0.8; }
        }
        .nhs-swell {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: nhs-heave 3.4s ease-in-out infinite;
        }
        @keyframes nhs-heave {
          0%, 100% { transform: translateY(6px); }
          50%      { transform: translateY(-10px); }
        }
        .nhs-rain { animation: nhs-pour 0.8s linear infinite; }
        @keyframes nhs-pour {
          from { transform: translate(0, 0); }
          to   { transform: translate(-14px, 46px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .nhs-ferry, .nhs-crash, .nhs-swell, .nhs-rain { animation: none; }
          .nhs-ferry {
            transform: rotate(-5deg);
            transform-box: fill-box;
            transform-origin: 50% 90%;
          }
          .nhs-crash {
            transform: scale(1.1) translateY(-6px);
            transform-box: fill-box;
            transform-origin: 20% 100%;
          }
          .nhs-rain { transform: translate(-7px, 23px); }
        }
      `}</style>
    </svg>
  );
}
