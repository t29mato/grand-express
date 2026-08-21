/**
 * 鉄砲水が唯一の渡し場を閉ざす(コロンビア盤の厄災 3/7・skipTurn)。
 *
 * 構図表の担当:**雨上がりの鉛色・川岸を横から・茶色の急流が主役・人1+騾馬。
 * 緑はほぼ使わない**(上流の雨のあとなので、岸も泥をかぶっている)。
 *
 * 昨日はくるぶしまでだった浅瀬が、渦巻く茶色の激流に変わっている。
 * 渡し場の標柱は水に半ば沈み、対岸への道は水の向こう。
 * 動くのは**流れの筋・流されていく流木・立つ白波・水位標のまわりの渦**。
 * 止めた状態でも、沈んだ標柱と岸で待つ人+騾馬で「渡れない」と分かる。
 */
export function ColombiaCrecienteCierraPaso() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 鉛色の空。雨は上がったが雲は低い */}
      <rect width="400" height="210" fill="#8a9298" />
      <g fill="#6f787e" opacity="0.9">
        <ellipse cx="80" cy="26" rx="70" ry="12" />
        <ellipse cx="220" cy="18" rx="80" ry="13" />
        <ellipse cx="340" cy="30" rx="60" ry="10" />
      </g>
      <g fill="#a0a8ac" opacity="0.8">
        <ellipse cx="150" cy="40" rx="60" ry="8" />
        <ellipse cx="310" cy="46" rx="50" ry="7" />
      </g>

      {/* 対岸:泥をかぶった土手と、水の向こうに続く道 */}
      <rect y="62" width="400" height="26" fill="#8f7a5e" />
      <path d="M0,62 q100,-6 200,-2 q100,4 200,-4 v8 q-100,6 -200,2 Q100,64 0,70 Z" fill="#7a6650" />
      <path d="M252,62 q10,-14 26,-22 l14,4 q-14,10 -22,20 z" fill="#a8925f" />
      <path d="M258,62 q10,-12 22,-19" stroke="#8f7a4e" strokeWidth="2.4" fill="none" opacity="0.7" />
      {/* 対岸の渡し場の標柱(対になっている) */}
      <rect x="286" y="44" width="5" height="20" fill="#e8e4d4" />
      <rect x="285" y="42" width="7" height="5" fill="#c8452f" />

      {/* 川:渦巻く茶色の激流(画面の主役、幅広く) */}
      <rect y="88" width="400" height="88" fill="#8a6f46" />
      <rect y="88" width="400" height="26" fill="#75603c" />
      {/* 流れの筋(層になって流れる) */}
      <g className="crc-flow1" stroke="#a8905f" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.8">
        <path d="M-60,102 q30,-6 60,0 t60,0 t60,0 t60,0 t60,0 t60,0 t60,0" />
      </g>
      <g className="crc-flow2" stroke="#5f4c2c" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.7">
        <path d="M-60,128 q30,8 60,0 t60,0 t60,0 t60,0 t60,0 t60,0 t60,0" />
      </g>
      <g className="crc-flow3" stroke="#c2ab72" strokeWidth="3.4" fill="none" strokeLinecap="round" opacity="0.75">
        <path d="M-60,152 q30,-7 60,0 t60,0 t60,0 t60,0 t60,0 t60,0 t60,0" />
      </g>
      {/* 立つ白波(急流の芯) */}
      <g className="crc-chop" fill="#e8dcc0">
        <path d="M60,116 q8,-12 16,0 q-4,8 -16,0 z" />
        <path d="M180,138 q9,-13 18,0 q-5,9 -18,0 z" />
        <path d="M300,118 q8,-12 16,0 q-4,8 -16,0 z" />
        <path d="M120,158 q8,-11 16,0 q-4,8 -16,0 z" />
      </g>
      {/* 渦 */}
      <g stroke="#c2ab72" strokeWidth="2.4" fill="none" opacity="0.8">
        <path className="crc-swirl" d="M236,124 a10,6 0 1 1 -2,-8 a6,4 0 1 0 -1,6" />
      </g>

      {/* 流されていく流木(ループ) */}
      <g className="crc-log">
        <path d="M-40,120 q20,-5 42,-2 l-5,7 q-20,3 -37,-5 z" fill="#4a3a26" />
        <path d="M-36,118 l8,-8 M-20,117 l6,-7" stroke="#4a3a26" strokeWidth="3" strokeLinecap="round" fill="none" />
      </g>
      <g className="crc-log2">
        <path d="M-30,148 q14,-4 30,-1 l-4,6 q-14,2 -26,-5 z" fill="#5f4830" />
      </g>

      {/* 手前の岸:泥の色。渡し場の水位標が半ば沈む */}
      <path d="M0,176 q80,-10 170,-4 q120,8 230,-6 V210 H0 Z" fill="#9a8562" />
      <path d="M0,184 q80,-9 168,-4 q120,7 232,-7 v6 q-110,12 -232,6 Q80,180 0,190 Z" fill="#b09a6e" opacity="0.7" />
      {/* 手前の水位標(白黒)— 水がここまで来ている */}
      <g>
        <rect x="96" y="128" width="6" height="52" fill="#efe8d4" />
        <g fill="#33302c">
          <rect x="96" y="132" width="6" height="7" />
          <rect x="96" y="146" width="6" height="7" />
          <rect x="96" y="160" width="6" height="7" />
        </g>
        <g className="crc-lap" fill="#c2ab72" opacity="0.9">
          <ellipse cx="99" cy="170" rx="14" ry="4.4" />
        </g>
      </g>

      {/* 待つ人:赤いポンチョ+つば広帽。荷を積んだ騾馬と岸に立つ */}
      <g transform="translate(300,0)">
        <ellipse cx="0" cy="196" rx="14" ry="4" fill="#000" opacity="0.2" />
        <rect x="-5" y="172" width="4.6" height="24" fill="#3f3428" />
        <rect x="1" y="172" width="4.6" height="24" fill="#3f3428" />
        <path d="M-11,144 h22 l4,16 h-30 z" fill="#c8452f" />
        <path d="M-13,152 h26" stroke="#8a2f24" strokeWidth="2" />
        <path d="M-7,160 h14 l2,14 h-18 z" fill="#a83a28" />
        <circle cx="0" cy="136" r="7.6" fill="#c98f5f" />
        <path d="M-11,134 h22 l-3,-3 h-5.4 a7.4,7.4 0 0 0 -7.2,-4.6 a7.4,7.4 0 0 0 -6.4,7.6 z" fill="#8a7350" />
        {/* 川を指す腕 */}
        <path d="M-9,150 l-16,-8" stroke="#c8452f" strokeWidth="5" strokeLinecap="round" fill="none" />
      </g>
      {/* 騾馬(荷を積んだまま待つ) */}
      <g transform="translate(352,0)">
        <ellipse cx="0" cy="198" rx="17" ry="4" fill="#000" opacity="0.18" />
        <ellipse cx="0" cy="184" rx="15" ry="8.4" fill="#6f6050" />
        <rect x="-19" y="170" width="6.4" height="14" rx="2.6" fill="#6f6050" />
        <rect x="-23" y="167" width="9" height="5.4" rx="2.4" fill="#6f6050" />
        <g stroke="#6f6050" strokeWidth="2.2" strokeLinecap="round" fill="none">
          <path d="M-20,166 l-2.6,-5.4 M-16,166 l1.4,-5.4" />
        </g>
        <g fill="#6f6050">
          <rect x="-10" y="190" width="3.4" height="8.4" />
          <rect x="-3.6" y="190" width="3.4" height="8.4" />
          <rect x="3.4" y="190" width="3.4" height="8.4" />
          <rect x="9.4" y="190" width="3.4" height="8.4" />
        </g>
        <rect x="-7" y="170" width="15" height="9" rx="2.6" fill="#b08a4f" />
        <path d="M-7,174.6 h15" stroke="#8a6b3a" strokeWidth="1.6" />
        <path d="M14,180 q4,5 2,12" stroke="#6f6050" strokeWidth="2" fill="none" className="crc-tail" />
      </g>

      <style>{`
        .crc-flow1 { animation: crc-run 3.2s linear infinite; }
        .crc-flow2 { animation: crc-run 2.6s linear infinite; }
        .crc-flow3 { animation: crc-run 3.8s linear infinite; }
        @keyframes crc-run {
          0%   { transform: translateX(0); }
          100% { transform: translateX(120px); }
        }
        .crc-chop {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: crc-stand 1.8s ease-in-out infinite;
        }
        @keyframes crc-stand {
          0%, 100% { transform: scaleY(1); }
          50%      { transform: scaleY(0.72); }
        }
        .crc-swirl {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: crc-spin 4.4s linear infinite;
        }
        @keyframes crc-spin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .crc-log  { animation: crc-float 7s linear infinite; }
        .crc-log2 { animation: crc-float 9s linear 3s infinite; }
        @keyframes crc-float {
          0%   { transform: translate(0, 0) rotate(0deg); }
          50%  { transform: translate(240px, 10px) rotate(-6deg); }
          100% { transform: translate(480px, 0) rotate(4deg); }
        }
        .crc-lap {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: crc-lapmove 2.2s ease-in-out infinite;
        }
        @keyframes crc-lapmove {
          0%, 100% { transform: translateY(0) scaleX(1); }
          50%      { transform: translateY(-4px) scaleX(1.15); }
        }
        .crc-tail {
          transform-box: fill-box;
          transform-origin: 0% 0%;
          animation: crc-swish 3.4s ease-in-out infinite;
        }
        @keyframes crc-swish {
          0%, 100% { transform: rotate(0deg); }
          50%      { transform: rotate(10deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .crc-flow1, .crc-flow2, .crc-flow3, .crc-chop, .crc-swirl,
          .crc-log, .crc-log2, .crc-lap, .crc-tail {
            animation: none;
          }
          /* 流木は川の真ん中で止める(流されている最中と分かる位置) */
          .crc-log  { transform: translate(200px, 8px) rotate(-5deg); }
          .crc-log2 { transform: translate(260px, 4px) rotate(3deg); }
        }
      `}</style>
    </svg>
  );
}
