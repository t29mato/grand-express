/**
 * 突然の切り下げが手持ちを蝕む(割合で失う)。
 *
 * 7枚の構図表でここは**朝・両替屋の店先・灰緑**の担当。
 * **赤は掲示板の矢印1本にしか使わない。**数字も文字も描かない——
 * 上がり続ける棒グラフと、手の中で薄くなる札束だけで語る。
 *
 * 動くのは**段々と伸びる棒グラフ・跳ね上がる赤い矢印・薄くなる札束・
 * こぼれて転がる硬貨**。止めた状態でも、棒が右肩上がりに伸び切り、
 * 札束が薄い状態で残る構図で分かる。
 */
export function ArgentinaMegadevaluacion() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 朝の街角。灰緑のビル面。 */}
      <rect width="400" height="210" fill="#7f8a80" />
      <rect width="400" height="52" fill="#a8b4a8" />
      <rect y="52" width="400" height="6" fill="#6b766b" />
      <rect y="168" width="400" height="42" fill="#5f6a60" />
      <rect y="164" width="400" height="6" fill="#4c564d" />

      {/* 奥の建物の窓(中景)。 */}
      <g fill="#96a196">
        <rect x="10" y="8" width="26" height="36" />
        <rect x="48" y="8" width="26" height="36" />
        <rect x="330" y="8" width="26" height="36" />
        <rect x="368" y="8" width="26" height="36" />
      </g>
      <g fill="#b8c2b8">
        <rect x="14" y="14" width="8" height="10" />
        <rect x="26" y="14" width="7" height="10" />
        <rect x="52" y="14" width="8" height="10" />
        <rect x="334" y="14" width="8" height="10" />
        <rect x="372" y="14" width="8" height="10" />
      </g>
      {/* 電線の鳩。朝はいつもどおり。 */}
      <path d="M0,30q200,18 400,-6" stroke="#4c564d" strokeWidth="1.6" fill="none" />
      <g fill="#3a423a">
        <ellipse cx="120" cy="39" rx="4" ry="3" />
        <ellipse cx="300" cy="34" rx="4" ry="3" />
      </g>

      {/* 両替屋の窓口(左)。シャッター半開き。 */}
      <rect x="18" y="70" width="96" height="94" fill="#5f6a60" />
      <rect x="24" y="76" width="84" height="46" fill="#3a423a" />
      <g stroke="#6b766b" strokeWidth="2" fill="none">
        <path d="M24,84h84M24,92h84M24,100h84" />
      </g>
      <rect x="24" y="108" width="84" height="30" fill="#c8beac" />
      <rect x="24" y="134" width="84" height="4" fill="#8f8a7c" />
      {/* 窓口の中の人影。首を横に振っている。 */}
      <g className="amd-teller">
        <circle cx="66" cy="120" r="8" fill="#8a6a4a" />
        <path d="M57,121a9,9 0 0 1 18,0z" fill="#4c564d" />
      </g>
      <path d="M50,138h32v-8h-32z" fill="#8f8a7c" />

      {/* 掲示板(右)。棒グラフが段々に伸びる。数字は描かない。 */}
      <rect x="252" y="64" width="130" height="86" rx="4" fill="#33383a" />
      <rect x="256" y="68" width="122" height="78" rx="3" fill="#1f2426" />
      <g fill="#8fae4a">
        <rect className="amd-bar amd-b1" x="266" y="118" width="14" height="22" />
        <rect className="amd-bar amd-b2" x="288" y="108" width="14" height="32" />
        <rect className="amd-bar amd-b3" x="310" y="96" width="14" height="44" />
        <rect className="amd-bar amd-b4" x="332" y="84" width="14" height="56" />
      </g>
      {/* 赤はこの矢印だけ。 */}
      <g className="amd-arrow">
        <path d="M262,128L352,80" stroke="#e8443f" strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d="M340,74l16,2l-8,14z" fill="#e8443f" />
      </g>
      <path d="M256,140h122" stroke="#4c564d" strokeWidth="2" />

      {/* 通行人(テラコッタの上着)。札束を確かめている。 */}
      <g>
        <ellipse cx="176" cy="202" rx="26" ry="5" fill="#000" opacity="0.22" />
        <g fill="#3a3430">
          <rect x="166" y="176" width="8" height="26" rx="3" />
          <rect x="180" y="176" width="8" height="26" rx="3" />
        </g>
        <path d="M162,180l5,-42h20l5,42z" fill="#b06a4a" />
        <path d="M162,180h30v5h-30z" fill="#8f5238" />
        <circle cx="177" cy="128" r="10" fill="#c98f5f" />
        <path d="M166,128a11,8 0 0 1 22,0z" fill="#4a3a2a" />
        {/* 両腕で札束を目の高さに。 */}
        <path d="M166,146l-16,14" stroke="#b06a4a" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M188,146l18,12" stroke="#b06a4a" strokeWidth="6" strokeLinecap="round" fill="none" />
      </g>
      {/* 札束。厚みがしぼんでいく。 */}
      <g className="amd-wad">
        <g fill="#9aa878">
          <rect x="132" y="150" width="34" height="20" rx="2" />
        </g>
        <rect x="132" y="150" width="34" height="6" rx="2" fill="#b0bd8c" />
        <ellipse cx="149" cy="160" rx="7" ry="4.6" fill="none" stroke="#77855c" strokeWidth="1.6" />
      </g>
      {/* こぼれて転がる硬貨。 */}
      <g className="amd-coin1" fill="#c8a13f">
        <circle cx="216" cy="176" r="5" />
      </g>
      <g className="amd-coin2" fill="#c8a13f">
        <circle cx="232" cy="188" r="4" />
      </g>
      <g fill="#c8a13f" opacity="0.9">
        <circle cx="248" cy="200" r="4" />
        <circle cx="120" cy="198" r="3.4" />
      </g>

      <style>{`
        .amd-bar {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: amd-grow 4.8s ease-out infinite;
        }
        .amd-b1 { animation-delay: 0s; }
        .amd-b2 { animation-delay: .5s; }
        .amd-b3 { animation-delay: 1s; }
        .amd-b4 { animation-delay: 1.5s; }
        @keyframes amd-grow {
          0%       { transform: scaleY(0.25); }
          35%, 88% { transform: scaleY(1); }
          100%     { transform: scaleY(1); }
        }
        .amd-arrow {
          transform-box: fill-box;
          transform-origin: 0% 100%;
          animation: amd-tilt 4.8s ease-in-out infinite;
        }
        @keyframes amd-tilt {
          0%        { transform: rotate(9deg); opacity: .4; }
          45%, 100% { transform: rotate(0deg); opacity: 1; }
        }
        .amd-wad {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: amd-shrink 4.8s ease-in-out infinite;
        }
        @keyframes amd-shrink {
          0%        { transform: scaleY(1); }
          60%, 100% { transform: scaleY(0.45); }
        }
        .amd-teller {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: amd-shake 2.4s ease-in-out infinite;
        }
        @keyframes amd-shake {
          0%, 100% { transform: translateX(0); }
          25%      { transform: translateX(-2.4px); }
          75%      { transform: translateX(2.4px); }
        }
        .amd-coin1 { animation: amd-roll1 4.8s ease-in infinite; }
        .amd-coin2 { animation: amd-roll2 4.8s ease-in infinite; }
        @keyframes amd-roll1 {
          0%, 55%  { transform: translate(-60px, -18px); opacity: 0; }
          65%      { opacity: 1; }
          100%     { transform: translate(0, 0); opacity: 1; }
        }
        @keyframes amd-roll2 {
          0%, 62%  { transform: translate(-76px, -28px); opacity: 0; }
          72%      { opacity: 1; }
          100%     { transform: translate(0, 0); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .amd-bar, .amd-arrow, .amd-wad, .amd-teller, .amd-coin1, .amd-coin2 {
            animation: none;
          }
          /* 棒は伸び切り、札束は薄くなった状態で止める。 */
          .amd-wad {
            transform: scaleY(0.45);
            transform-box: fill-box;
            transform-origin: 50% 100%;
          }
          /* 硬貨は床に落ちた位置で止める。 */
          .amd-coin1 { transform: translateY(22px); }
          .amd-coin2 { transform: translateY(11px); }
        }
      `}</style>
    </svg>
  );
}
