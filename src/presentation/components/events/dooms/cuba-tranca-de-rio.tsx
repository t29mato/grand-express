/**
 * グイヘが渡し場の手押し車をひっくり返す。
 *
 * 本文の芯は3つ。**さっきまで無かった石に車輪が引っかかること・
 * 道具と農産物の半分が浅瀬に落ちること・橋の無い川では渡し場が
 * いまも横断を引き受けていること。**
 *
 * グイヘは先住とアフリカ双方に根を持つ水の伝承なので、**姿・顔では描かない。**
 * 「さっきまで無かった石」と、そこから広がり続ける波紋だけで居させる。
 * 神秘化(光る・浮く)もしない。
 *
 * 7枚の描き分けで、ここは**真昼の明るい川**の担当(desvio-del-guije は
 * 朝もやの暗い緑で対にする)。動くのは**広がる波紋・流されていく収穫物・
 * 空転する車輪・拾おうと手を伸ばす人・水面のきらめき**。
 * 止めた状態でも、倒れた手押し車と水中の石、散った荷で分かる。
 */
export function CubaTrancaDeRio() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 真昼の空と岸の緑 */}
      <rect width="400" height="210" fill="#9fd0e4" />
      <rect y="46" width="400" height="34" fill="#7fa858" />
      <path d="M0,46q80,-10 180,-4q120,7 220,-3v14H0z" fill="#8fba64" />

      {/* 奥の岸:王立ヤシと茂み */}
      <path d="M52,46q1,-26 2,-30h3q1,4 2,30z" fill="#cfc7b4" />
      <g fill="#2f7f4a">
        <ellipse cx="55" cy="12" rx="15" ry="5" />
        <ellipse cx="47" cy="17" rx="9" ry="3.6" />
        <ellipse cx="64" cy="16" rx="9" ry="3.6" />
      </g>
      <g fill="#4f8f52">
        <ellipse cx="330" cy="42" rx="30" ry="12" />
        <ellipse cx="368" cy="46" rx="22" ry="9" />
        <ellipse cx="130" cy="44" rx="24" ry="9" />
      </g>

      {/* 川。澄んだ浅瀬 */}
      <rect y="80" width="400" height="86" fill="#57b8c8" />
      <rect y="80" width="400" height="18" fill="#3f9ab0" />
      <rect y="152" width="400" height="14" fill="#6bc8cc" />

      {/* 流れの筋(ずっと右へ流れている) */}
      <g className="cutr-flow" stroke="#bfe8f0" strokeWidth="2" opacity="0.6" fill="none" strokeLinecap="round">
        <path d="M-30,96q10,-3 20,0M60,110q10,-3 20,0M170,92q10,-3 20,0M300,116q10,-3 20,0M110,132q12,-4 24,0M250,140q12,-4 24,0M20,148q12,-4 24,0M350,100q10,-3 20,0" />
      </g>

      {/* 渡し場の石(左右から並ぶ。真ん中の1つだけ色が違う=さっきまで無かった石) */}
      <g fill="#c2b494">
        <ellipse cx="40" cy="122" rx="16" ry="6.4" />
        <ellipse cx="86" cy="126" rx="15" ry="6" />
        <ellipse cx="252" cy="126" rx="15" ry="6" />
        <ellipse cx="300" cy="122" rx="16" ry="6.4" />
        <ellipse cx="348" cy="126" rx="14" ry="5.6" />
      </g>
      <g fill="#a89a74" opacity="0.8">
        <ellipse cx="40" cy="124.5" rx="16" ry="3.4" />
        <ellipse cx="86" cy="128.4" rx="15" ry="3" />
        <ellipse cx="252" cy="128.4" rx="15" ry="3" />
        <ellipse cx="300" cy="124.5" rx="16" ry="3.4" />
      </g>
      {/* さっきまで無かった石。暗く、濡れて、車輪の真下にある */}
      <ellipse cx="168" cy="130" rx="13" ry="5.6" fill="#4f5f52" />
      <ellipse cx="168" cy="128.4" rx="13" ry="4.6" fill="#5f7362" />

      {/* 石から広がり続ける波紋(グイヘの居場所) */}
      <g className="cutr-ring1" stroke="#eafaf6" strokeWidth="1.8" fill="none">
        <ellipse cx="168" cy="130" rx="16" ry="6" />
      </g>
      <g className="cutr-ring2" stroke="#eafaf6" strokeWidth="1.6" fill="none">
        <ellipse cx="168" cy="130" rx="16" ry="6" />
      </g>
      <g className="cutr-ring3" stroke="#d8f4ec" strokeWidth="1.4" fill="none">
        <ellipse cx="168" cy="130" rx="16" ry="6" />
      </g>

      {/* ひっくり返った手押し車(荷台が石に乗り上げ、車輪が宙で空転) */}
      <g transform="translate(150,96) rotate(-24)">
        <rect x="0" y="0" width="52" height="9" rx="2" fill="#8a6b43" />
        <rect x="0" y="0" width="52" height="2.6" fill="#a8865a" />
        <path d="M-14,4.5L0,0v9z" fill="#7a5c3a" />
        <path d="M52,0l14,-4v4l-14,4.5z" fill="#7a5c3a" />
      </g>
      {/* 空転する車輪(車軸ごと持ち上がっている) */}
      <g transform="translate(196,86)">
        <g className="cutr-wheel">
          <circle r="12" fill="none" stroke="#5f4526" strokeWidth="3.4" />
          <path d="M0,-12V12M-12,0H12M-8.5,-8.5L8.5,8.5M8.5,-8.5L-8.5,8.5" stroke="#5f4526" strokeWidth="2" fill="none" />
        </g>
        <circle r="2.6" fill="#3f2f1c" />
      </g>

      {/* 水に落ちて流されていく荷(マンゴー・鉈・袋) */}
      <g className="cutr-drift1">
        <circle cx="0" cy="0" r="6" fill="#f5b31c" />
        <path d="M-2,-5q2,-3 5,-2" stroke="#c88f14" strokeWidth="1.4" fill="none" />
      </g>
      <g className="cutr-drift2">
        <circle cx="0" cy="0" r="5.4" fill="#e8a24f" />
      </g>
      <g className="cutr-drift3">
        <ellipse cx="0" cy="0" rx="9" ry="5" fill="#ddcfae" />
        <path d="M-7,0q7,2.6 14,0" stroke="#a8996f" strokeWidth="1.1" fill="none" />
      </g>
      <g className="cutr-drift4">
        <path d="M-8,2l12,-5l4,2l-12,5z" fill="#8a8f92" />
        <rect x="-12" y="1" width="6" height="3" rx="1.2" fill="#6b4a2f" />
      </g>

      {/* まだ荷台に残っている荷(半分は助かっている) */}
      <g transform="translate(150,96) rotate(-24)">
        <circle cx="12" cy="-4" r="5.4" fill="#f5b31c" />
        <circle cx="24" cy="-4.6" r="5" fill="#e8a24f" />
        <ellipse cx="40" cy="-4" rx="8" ry="4.6" fill="#ddcfae" />
      </g>

      {/* 拾おうと手を伸ばす人(麦わら帽・膝まで水) */}
      <g transform="translate(236,102)">
        <rect x="-3.4" y="14" width="7.4" height="12" fill="#3f6b8a" />
        <path d="M-5,-4h10l1.4,19h-12.8z" fill="#5b8fe8" />
        <circle cx="0" cy="-8.4" r="5.4" fill="#c98f5f" />
        <ellipse cx="0" cy="-11.4" rx="8.4" ry="2.4" fill="#d8bd7f" />
        <path d="M-4,-11.4q4,-5.4 8,0z" fill="#c8a95f" />
        <g className="cutr-reach">
          <path d="M-4,-1l-16,9" stroke="#c98f5f" strokeWidth="3.4" strokeLinecap="round" fill="none" />
        </g>
        <path d="M4,-1l8,7" stroke="#c98f5f" strokeWidth="3.4" strokeLinecap="round" fill="none" />
      </g>
      {/* 人の腰まわりの波 */}
      <path d="M224,126q12,4 26,0" stroke="#eafaf6" strokeWidth="2" fill="none" opacity="0.8" />

      {/* 手前の岸 */}
      <path d="M0,166q90,-8 200,-2q110,6 200,-4v50H0z" fill="#8fba64" />
      <path d="M0,196h400v14H0z" fill="#7fa858" />
      <g stroke="#6f9a4f" strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M30,196q3,-7 1,-12M70,202q3,-7 1,-12M330,198q3,-7 1,-12M370,204q3,-7 1,-12M200,200q3,-7 1,-12" />
      </g>
      {/* 岸に引き上げてあった荷(まだ濡れていない側) */}
      <ellipse cx="120" cy="192" rx="11" ry="5.6" fill="#ddcfae" />
      <path d="M112,192q8,3 16,0" stroke="#a8996f" strokeWidth="1.2" fill="none" />
      <circle cx="142" cy="192" r="6" fill="#f5b31c" />

      {/* 水面のきらめき */}
      <g className="cutr-glint" fill="#f2fcfa" opacity="0.8">
        <circle cx="60" cy="104" r="1.8" />
        <circle cx="310" cy="140" r="1.8" />
        <circle cx="120" cy="146" r="1.6" />
        <circle cx="360" cy="112" r="1.6" />
      </g>

      <style>{`
        .cutr-flow { animation: cutr-stream 3.2s linear infinite; }
        @keyframes cutr-stream {
          from { transform: translateX(0); }
          to   { transform: translateX(46px); }
        }
        .cutr-ring1, .cutr-ring2, .cutr-ring3 {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .cutr-ring1 { animation: cutr-ripple 2.6s ease-out infinite; }
        .cutr-ring2 { animation: cutr-ripple 2.6s ease-out 0.85s infinite; }
        .cutr-ring3 { animation: cutr-ripple 2.6s ease-out 1.7s infinite; }
        @keyframes cutr-ripple {
          0%   { transform: scale(0.5); opacity: 0.9; }
          80%  { transform: scale(2.6); opacity: 0; }
          100% { transform: scale(2.6); opacity: 0; }
        }
        .cutr-wheel {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: cutr-spin 2.2s linear infinite;
        }
        @keyframes cutr-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        .cutr-drift1 { animation: cutr-float1 5.2s linear infinite; }
        .cutr-drift2 { animation: cutr-float2 6s linear 0.8s infinite; }
        .cutr-drift3 { animation: cutr-float3 6.8s linear 0.3s infinite; }
        .cutr-drift4 { animation: cutr-float4 7.4s linear 1.4s infinite; }
        @keyframes cutr-float1 {
          0%   { transform: translate(176px, 122px); opacity: 0; }
          8%   { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translate(392px, 136px); opacity: 0; }
        }
        @keyframes cutr-float2 {
          0%   { transform: translate(180px, 132px); opacity: 0; }
          8%   { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translate(388px, 146px); opacity: 0; }
        }
        @keyframes cutr-float3 {
          0%   { transform: translate(172px, 142px); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translate(378px, 152px); opacity: 0; }
        }
        @keyframes cutr-float4 {
          0%   { transform: translate(184px, 116px); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translate(390px, 126px); opacity: 0; }
        }
        .cutr-reach {
          transform-box: fill-box;
          transform-origin: 100% 0%;
          animation: cutr-grab 1.8s ease-in-out infinite;
        }
        @keyframes cutr-grab {
          0%, 100% { transform: rotate(0deg); }
          50%      { transform: rotate(14deg); }
        }
        .cutr-glint { animation: cutr-blink 2.4s ease-in-out infinite; }
        @keyframes cutr-blink {
          0%, 100% { opacity: 0.25; }
          50%      { opacity: 0.9; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cutr-flow, .cutr-ring1, .cutr-ring2, .cutr-ring3, .cutr-wheel,
          .cutr-drift1, .cutr-drift2, .cutr-drift3, .cutr-drift4,
          .cutr-reach, .cutr-glint {
            animation: none;
          }
          /* 荷は川面に散った位置で、波紋は開いた途中で止める。 */
          .cutr-drift1 { transform: translate(230px, 128px); }
          .cutr-drift2 { transform: translate(268px, 138px); }
          .cutr-drift3 { transform: translate(210px, 146px); }
          .cutr-drift4 { transform: translate(300px, 122px); }
          .cutr-ring1 {
            transform: scale(1.4);
            transform-box: fill-box;
            transform-origin: 50% 50%;
            opacity: 0.7;
          }
          .cutr-ring2 {
            transform: scale(2);
            transform-box: fill-box;
            transform-origin: 50% 50%;
            opacity: 0.4;
          }
          .cutr-ring3 { opacity: 0; }
        }
      `}</style>
    </svg>
  );
}
