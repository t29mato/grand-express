/**
 * 嵐で沿岸航路が止まる。
 *
 * 本文の芯は「**岬と岬のあいだの外海だけが荒れる**」こと。
 * 毎年、欠航の大半が同じ区間で起きるので、地元の時刻表はそこに余裕を見込んでいる。
 * **全面を荒れた海にすると、この芯が消える。**
 *
 * そこで、左右の岬の陰は**平らな水面のまま**にし、そのあいだの外海だけを
 * 白く砕けさせた。動くのは**岬と岬のあいだの波と飛沫・雨・裏返った傘**だけで、
 * 手前の入江の水と繋がれた船は動かない。
 * 止めた状態でも、荒れているのは切れ目の一区間だけ・船は舫われたまま・
 * タラップに閉鎖の遮断棒、という構図で何が起きたか分かる。
 */
export function NorwayHavstorm() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 空。荒れているのは切れ目の上だけ。 */}
      <rect width="400" height="210" fill="#5f7182" />
      <rect y="0" width="400" height="64" fill="#4f606f" />
      <g fill="#8a9aa8" opacity="0.4">
        <ellipse cx="44" cy="18" rx="48" ry="12" />
        <ellipse cx="358" cy="16" rx="44" ry="11" />
      </g>
      {/* 切れ目の真上だけ、雲が低く垂れている。 */}
      <g fill="#2f3b48" opacity="0.85">
        <ellipse cx="150" cy="18" rx="46" ry="18" />
        <ellipse cx="196" cy="10" rx="52" ry="20" />
        <ellipse cx="238" cy="20" rx="42" ry="16" />
        <ellipse cx="196" cy="34" rx="70" ry="12" />
      </g>

      {/* 左の岬。手前まで張り出していて、その陰は静か。 */}
      <path d="M0,40c30,6 54,22 70,46c12,18 18,38 18,68H0z" fill="#28353c" />
      <path d="M0,56c22,6 42,20 56,40c10,16 14,32 14,58H0z" fill="#1f2b31" />
      <g fill="#2a4a36">
        <path d="M14,44l7,-16 7,16z" />
        <path d="M36,58l6,-14 6,14z" />
        <path d="M58,80l6,-13 6,13z" />
        <path d="M74,108l6,-12 6,12z" />
      </g>

      {/* 右の岬。 */}
      <path d="M400,34c-36,8 -68,26 -88,52c-14,20 -20,42 -20,68h108z" fill="#28353c" />
      <path d="M400,50c-28,8 -54,22 -70,44c-11,16 -16,34 -16,60h86z" fill="#1f2b31" />
      <g fill="#2a4a36">
        <path d="M376,38l7,-15 7,15z" />
        <path d="M352,54l6,-13 6,13z" />
        <path d="M328,78l6,-12 6,12z" />
        <path d="M310,106l6,-12 6,12z" />
      </g>
      {/* 岬の先の灯標。毎年ここが境目になる。 */}
      <g>
        <rect x="292" y="96" width="9" height="22" fill="#c0453c" />
        <rect x="288" y="88" width="17" height="8" fill="#f0ece0" />
        <circle cx="296.5" cy="84" r="4" fill="#f5b31c" />
        <circle cx="296.5" cy="84" r="10" fill="#f5b31c" opacity="0.18" />
      </g>

      {/* 岬と岬のあいだ = 荒れる外海。ここだけが白い。 */}
      <path d="M104,94h178v60H104z" fill="#3a5568" />
      <g className="nhs-open">
        {/* 崩れかけた波頭。とがらせず、頂を巻かせて水に見せる。 */}
        <path
          d="M104,152c0,-20 14,-34 34,-34c14,0 22,8 22,16c-6,-6 -14,-8 -22,-4c-10,5 -14,12 -14,22z"
          fill="#e4eff6"
        />
        <path
          d="M128,152c2,-16 14,-26 28,-24c-8,4 -12,10 -12,24z"
          fill="#f4fafc"
        />
        <path
          d="M164,152c0,-26 18,-44 44,-44c18,0 28,10 28,20c-8,-8 -18,-10 -30,-5c-14,6 -20,15 -20,29z"
          fill="#eef6fa"
        />
        <path
          d="M196,152c2,-20 16,-32 32,-30c-10,5 -14,13 -14,30z"
          fill="#f4fafc"
        />
        <path
          d="M238,152c0,-20 14,-32 32,-32c13,0 20,7 20,15c-6,-6 -13,-7 -21,-3c-9,5 -13,11 -13,20z"
          fill="#e4eff6"
        />
        <g fill="#f4fafc">
          <ellipse cx="150" cy="98" rx="16" ry="9" opacity="0.75" />
          <ellipse cx="204" cy="82" rx="20" ry="11" opacity="0.8" />
          <ellipse cx="256" cy="94" rx="15" ry="8" opacity="0.7" />
          <ellipse cx="178" cy="70" rx="11" ry="6" opacity="0.55" />
          <ellipse cx="232" cy="66" rx="9" ry="5" opacity="0.5" />
        </g>
      </g>
      {/* 切れ目の白波(手前寄り)。 */}
      <g className="nhs-open2" fill="#dfeef6">
        <path d="M110,158q22,-14 44,-4q-22,10 -44,4z" />
        <path d="M168,162q26,-16 52,-4q-26,11 -52,4z" />
        <path d="M234,158q22,-14 44,-4q-22,10 -44,4z" />
      </g>

      {/* 入江(手前)。岬の陰なので**平ら**。この対比が本文の芯。 */}
      <path d="M0,154h400v56H0z" fill="#22394a" />
      <path d="M0,154h400v6H0z" fill="#2f4a5f" />
      <g stroke="#33566e" strokeWidth="2" fill="none" opacity="0.9">
        <path d="M14,172h120M160,172h96M282,172h104" />
        <path d="M30,190h150M206,190h170" />
      </g>

      {/* 舫われた渡船。動かない(=出ない)。 */}
      <g>
        <path d="M22,160h164l-20,26H42z" fill="#2f4a5f" />
        <rect x="22" y="150" width="164" height="11" fill="#f0ece0" />
        <rect x="22" y="150" width="164" height="4" fill="#c0453c" />
        <rect x="44" y="126" width="106" height="24" fill="#f0ece0" />
        <rect x="64" y="110" width="58" height="17" fill="#e8e4d8" />
        <g fill="#3f5f7a">
          <rect x="52" y="131" width="17" height="12" />
          <rect x="77" y="131" width="17" height="12" />
          <rect x="102" y="131" width="17" height="12" />
          <rect x="127" y="131" width="15" height="12" />
          <rect x="72" y="114" width="15" height="9" />
          <rect x="96" y="114" width="15" height="9" />
        </g>
        <rect x="90" y="94" width="4" height="17" fill="#4a4f58" />
        <rect x="78" y="90" width="26" height="8" rx="2" fill="#c0453c" />
        {/* 舫い綱と繋柱。 */}
        <g stroke="#c8b48a" strokeWidth="2.6" fill="none">
          <path d="M186,162q20,8 34,14" />
          <path d="M186,170q24,6 38,10" />
        </g>
        <rect x="220" y="176" width="13" height="20" rx="3" fill="#5f666e" />
        {/* 映り込み(平らな水面であることを示す)。 */}
        <g fill="#f0ece0" opacity="0.16">
          <rect x="48" y="186" width="6" height="22" />
          <rect x="96" y="186" width="6" height="18" />
          <rect x="140" y="186" width="6" height="20" />
        </g>
      </g>

      {/* タラップに渡された閉鎖の遮断棒(=今日は乗れない)。 */}
      <g>
        <path d="M186,158l40,22" stroke="#8a5f3a" strokeWidth="7" fill="none" />
        <rect x="222" y="150" width="7" height="30" fill="#5f666e" />
        <rect x="264" y="150" width="7" height="30" fill="#5f666e" />
        <rect x="220" y="152" width="53" height="9" fill="#c0453c" />
        <g fill="#f0ece0">
          <rect x="231" y="152" width="10" height="9" />
          <rect x="252" y="152" width="10" height="9" />
        </g>
      </g>

      {/* 足止めされた人たち。**姿勢も色も別々にする。** */}
      <g>
        {/* 荷物に腰かけて待つ人。 */}
        <rect x="296" y="176" width="34" height="22" rx="3" fill="#7a5a3a" />
        <rect x="296" y="184" width="34" height="4" fill="#5a4028" />
        <path d="M300,176l4,-24h20l4,24z" fill="#3f6b8f" />
        <circle cx="314" cy="144" r="9" fill="#e8c8a8" />
        <path d="M305,143a9,9 0 0 1 18,0z" fill="#c0453c" />
        <path d="M300,162l-12,10" stroke="#3f6b8f" strokeWidth="5" strokeLinecap="round" fill="none" />
        <rect x="326" y="180" width="9" height="18" fill="#3f3428" />
      </g>
      <g>
        {/* 裏返った傘を持って立つ人。**傘だけが動く。** */}
        <rect x="356" y="178" width="7" height="20" fill="#2f3a48" />
        <rect x="366" y="178" width="7" height="20" fill="#3a4656" />
        <path d="M354,178l4,-28h18l4,28z" fill="#6b7a4a" />
        <circle cx="367" cy="142" r="9" fill="#c8a880" />
        <path d="M358,140a9,9 0 0 1 18,0z" fill="#4a4036" />
        <path d="M378,156l8,-16" stroke="#6b7a4a" strokeWidth="5" strokeLinecap="round" fill="none" />
        <g className="nhs-brolly">
          <path d="M386,142l-4,-24" stroke="#3a3228" strokeWidth="2.6" fill="none" />
          <path d="M366,118c6,-16 34,-16 40,0c-8,-4 -14,4 -20,4s-12,-8 -20,-4z" fill="#3a4450" />
          <g stroke="#2a3038" strokeWidth="1.6" fill="none">
            <path d="M376,116v6M386,118v6M396,116v6" />
          </g>
        </g>
      </g>

      {/* 雨。切れ目の側から吹き込む。 */}
      <g className="nhs-rain" stroke="#cfe0ea" strokeWidth="1.8" opacity="0.5" strokeLinecap="round" fill="none">
        <path d="M24,-18l-10,26M68,-32l-10,26M112,-10l-10,26M156,-28l-10,26M200,-16l-10,26M244,-34l-10,26M288,-12l-10,26M332,-30l-10,26M376,-20l-10,26" />
        <path d="M44,22l-10,26M88,8l-10,26M132,28l-10,26M176,12l-10,26M220,30l-10,26M264,10l-10,26M308,26l-10,26M352,14l-10,26M396,28l-10,26" />
        <path d="M14,64l-10,26M58,50l-10,26M102,70l-10,26M146,54l-10,26M190,72l-10,26M234,52l-10,26M278,68l-10,26M322,56l-10,26M366,70l-10,26" />
      </g>

      {/* 飛沫が切れ目から手前へ流されてくる。 */}
      <g className="nhs-spray" fill="#f4fafc">
        <ellipse cx="122" cy="146" rx="9" ry="5" opacity="0.6" />
        <ellipse cx="262" cy="142" rx="7" ry="4" opacity="0.5" />
        <ellipse cx="196" cy="136" rx="10" ry="5" opacity="0.55" />
      </g>

      <style>{`
        .nhs-open {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: nhs-break 2.6s ease-in-out infinite;
        }
        @keyframes nhs-break {
          0%, 100% { transform: scaleY(0.6) translateY(16px); opacity: 0.7; }
          46%      { transform: scaleY(1.12) translateY(-6px); opacity: 1; }
        }
        .nhs-open2 {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: nhs-break 2.6s ease-in-out infinite 0.35s;
        }
        .nhs-spray {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: nhs-blow 2.6s ease-out infinite;
        }
        @keyframes nhs-blow {
          0%, 30% { transform: translate(0, 8px) scale(0.4); opacity: 0; }
          60%     { transform: translate(-16px, -6px) scale(1); opacity: 0.9; }
          100%    { transform: translate(-34px, -16px) scale(1.4); opacity: 0; }
        }
        .nhs-brolly {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: nhs-flap 1.6s ease-in-out infinite;
        }
        @keyframes nhs-flap {
          0%, 100% { transform: rotate(-13deg) scaleX(1); }
          50%      { transform: rotate(9deg) scaleX(0.82); }
        }
        .nhs-rain { animation: nhs-pour 0.75s linear infinite; }
        @keyframes nhs-pour {
          from { transform: translate(0, 0); }
          to   { transform: translate(-16px, 42px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .nhs-open, .nhs-open2, .nhs-spray, .nhs-brolly, .nhs-rain { animation: none; }
          .nhs-open, .nhs-open2 {
            transform: scaleY(1.12) translateY(-6px);
            transform-box: fill-box;
            transform-origin: 50% 100%;
          }
          .nhs-spray {
            transform: translate(-16px, -6px);
            transform-box: fill-box;
            transform-origin: 50% 100%;
          }
          .nhs-brolly {
            transform: rotate(-13deg);
            transform-box: fill-box;
            transform-origin: 50% 100%;
          }
          .nhs-rain { transform: translate(-8px, 21px); }
        }
      `}</style>
    </svg>
  );
}
