/**
 * 雪解け水が谷底を洪水にする。急な暖気が一冬分の雪をいっぺんに溶かし、川が
 * 運びきれなくなった。畑と地下室は、それが流れ出てきた山と同じ色の茶色い水に
 * 浸かっている。
 *
 * 構図: 奥の山は**雪が斑に抜けて地肌が出ている**(溶けている最中)。
 * 手前は**壁の途中まで来ている茶色い水**——地下室の窓は半分沈み、柵は上半分しか
 * 出ていない。**長靴の農夫が戸口に立ち、水の中に足を入れたまま**眺めている。
 * 毎年のこととして保険料に織り込まれている顔で。
 *
 * **水を水として読ませるために**、家の壁に水位線を引き、水面に映り込みを落とし、
 * 明るい流れの筋を横に走らせてある(土の色と同じなので、これが無いと畑に見える)。
 *
 * 動くのは6つ: 水位、流れの筋、漂う木箱と板、屋根からの雫、水面の光。
 * 止めても「壁の途中まで来た水と、半分沈んだ柵」で伝わる。
 */
export function SwitzerlandSchneeschmelze() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 暖気の空。急に春が来た日の白っぽい水色。 */}
      <rect width="400" height="210" fill="#cfdce4" />
      <rect width="400" height="66" fill="#a8c4d8" />
      <circle cx="336" cy="30" r="16" fill="#f5d06a" />
      <circle cx="336" cy="30" r="26" fill="#f8e8b8" opacity="0.35" />
      <g fill="#e4ecf0" opacity="0.8">
        <ellipse cx="96" cy="26" rx="38" ry="8" />
        <ellipse cx="72" cy="34" rx="24" ry="6" />
      </g>

      {/* 山。**雪が斑に抜けて地肌が出ている。** */}
      <path d="M0,98L54,32L106,74L160,26L222,80L282,40L340,84L400,52V126H0z" fill="#7b8288" />
      <path d="M54,32l22,20l-9,-1l-6,4l-6,-4l-7,3zM160,26l26,24l-10,-2l-7,5l-7,-5l-8,4zM282,40l22,20l-9,-1l-6,4l-6,-4l-7,3z" fill="#f0f4f8" />
      <g fill="#eef2f6" opacity="0.9">
        <path d="M36,54q14,-4 22,4q-12,6 -24,2zM114,68q16,-6 26,2q-14,8 -28,2zM200,64q18,-6 28,4q-16,7 -30,0zM296,68q14,-5 24,3q-12,7 -26,1z" />
      </g>
      <g fill="#6b7278">
        <path d="M70,56q10,10 8,26q-12,-10 -12,-24zM182,54q12,10 10,28q-14,-12 -14,-26zM314,62q10,10 8,24q-12,-10 -12,-22z" />
      </g>

      {/* 雪解けの筋。山から谷へ何本も落ちている。 */}
      <g className="chm-melt" stroke="#b8d4e0" strokeWidth="2.6" opacity="0.85" fill="none">
        <path d="M56,54q6,28 -4,58M162,48q-8,30 2,60M286,60q8,26 0,54M222,80q-4,22 2,40" />
      </g>

      {/* 水に浸かっていない上の畑と、川へ落ちる斜面。 */}
      <path d="M0,118q100,-12 200,-2q100,10 200,-6v30H0z" fill="#6f7f56" />
      <path d="M0,130q110,-10 210,0q96,9 190,-6v18H0z" fill="#7f8f5f" />
      <g stroke="#66754c" strokeWidth="2" opacity="0.6" fill="none">
        <path d="M0,126q100,-8 200,0M0,138q110,-8 210,2" />
      </g>

      {/* 農家。**地下室の窓が半分沈んでいる。** */}
      <g>
        <rect x="250" y="86" width="120" height="94" fill="#e0d6bf" />
        <path d="M242,86h136l-16,-16H258z" fill="#8f4a38" />
        <rect x="242" y="86" width="136" height="4" fill="#7a3f30" />
        <g fill="#5f7f96">
          <rect x="264" y="100" width="20" height="18" />
          <rect x="302" y="100" width="20" height="18" />
          <rect x="340" y="100" width="20" height="18" />
        </g>
        <g fill="#c2453c">
          <rect x="260" y="100" width="4" height="18" />
          <rect x="284" y="100" width="4" height="18" />
          <rect x="298" y="100" width="4" height="18" />
          <rect x="322" y="100" width="4" height="18" />
        </g>
        <path d="M296,180v-46a16,16 0 0 1 32,0v46z" fill="#6b4423" />
        <path d="M296,134a16,16 0 0 1 32,0z" fill="#8a5a2c" />
        {/* 地下室の窓。**この高さまで水が来ている。** */}
        <rect x="262" y="140" width="24" height="18" fill="#3f3a30" />
        <rect x="340" y="140" width="24" height="18" fill="#3f3a30" />
        <rect x="376" y="110" width="14" height="70" fill="#a89e8c" />
      </g>

      {/* 半分沈んだ柵。 */}
      <g fill="#8a6a44">
        <rect x="18" y="130" width="5" height="46" />
        <rect x="66" y="132" width="5" height="46" />
        <rect x="114" y="134" width="5" height="46" />
        <rect x="162" y="136" width="5" height="46" />
      </g>
      <path d="M18,140h150" stroke="#8a6a44" strokeWidth="3.4" fill="none" />

      {/* **茶色い水。**山と同じ色。壁の途中で切れているのが分かるよう、水位線を明るくする。 */}
      <path d="M0,150q60,-5 120,0q70,6 140,-2q70,-6 140,2v60H0z" fill="#8a6f42" />
      <path d="M0,150q60,-5 120,0q70,6 140,-2q70,-6 140,2v5q-70,-7 -140,-1q-70,7 -140,1q-60,-5 -120,0z" fill="#b8985c" />
      <path d="M0,168q70,-5 140,2q76,7 140,-2q60,-8 120,0v42H0z" fill="#7a6038" />

      {/* 家と柵の映り込み。**水の上だと分かる手がかり。** */}
      <g fill="#6b5430" opacity="0.55">
        <rect x="250" y="155" width="120" height="26" />
        <rect x="18" y="152" width="5" height="18" />
        <rect x="66" y="152" width="5" height="18" />
        <rect x="114" y="152" width="5" height="18" />
      </g>

      {/* 流れの筋。**右へ流れ続ける。** */}
      <g className="chm-flow1" stroke="#c2a068" strokeWidth="3.4" opacity="0.85" fill="none">
        <path d="M10,164h68M150,160h72M282,170h84" />
      </g>
      <g className="chm-flow2" stroke="#5f4a28" strokeWidth="2.6" opacity="0.75" fill="none">
        <path d="M36,186h84M178,192h94M312,180h76" />
      </g>
      <g className="chm-glint" fill="#e0c890" opacity="0.55">
        <ellipse cx="120" cy="158" rx="36" ry="3" />
        <ellipse cx="306" cy="166" rx="42" ry="3.4" />
      </g>

      {/* 漂う木箱と板。**筋を遮ってから描く**ので、水の上にあると分かる。 */}
      <g className="chm-crate">
        <rect x="84" y="160" width="36" height="22" rx="2" fill="#a8763c" />
        <rect x="84" y="160" width="36" height="4" fill="#c9964a" />
        <g stroke="#6b4423" strokeWidth="2" fill="none">
          <path d="M84,171h36M100,160v22" />
        </g>
        <path d="M80,182h44l-4,5H84z" fill="#5f4a24" opacity="0.6" />
      </g>
      <g className="chm-plank">
        <rect x="182" y="180" width="52" height="8" rx="2" fill="#8a6a44" />
        <rect x="182" y="180" width="52" height="2.6" fill="#a8763c" />
      </g>

      {/* 屋根から落ちる雫。 */}
      <g className="chm-drip1" fill="#bfe0f0">
        <ellipse cx="252" cy="90" rx="2.4" ry="3.4" />
      </g>
      <g className="chm-drip2" fill="#bfe0f0">
        <ellipse cx="366" cy="90" rx="2.4" ry="3.4" />
      </g>

      {/* 戸口に立つ農夫。長靴のまま水の中。腕を組んでいる。 */}
      <g transform="translate(312,0)">
        <path d="M-7,158l-2,-20h18l-2,20z" fill="#3f4a38" />
        <ellipse cx="0" cy="152" rx="15" ry="4" fill="#a2854f" opacity="0.85" />
        <path d="M-11,138q0,-20 11,-20q11,0 11,20z" fill="#6b5330" />
        <path d="M-11,130h22" stroke="#4a3a24" strokeWidth="3" fill="none" />
        <path d="M-10,134q10,7 20,0" stroke="#c99a70" strokeWidth="4.6" fill="none" strokeLinecap="round" />
        <circle cx="0" cy="110" r="9" fill="#e0b48a" />
        <path d="M-10,108q1,-11 10,-11q9,0 10,11z" fill="#4a5f6b" />
        <path d="M-12,109h24" stroke="#3f5260" strokeWidth="2.6" fill="none" />
      </g>

      {/* いちばん手前の水面。**上下してみせる。** */}
      <g className="chm-rise">
        <path d="M0,196q60,-6 120,0q70,7 140,-2q70,-7 140,2v14H0z" fill="#6b5430" />
        <path d="M0,196q60,-6 120,0q70,7 140,-2q70,-7 140,2v4q-70,-8 -140,-1q-70,8 -140,1q-60,-6 -120,0z" fill="#a2854f" />
      </g>

      <style>{`
        .chm-flow1, .chm-flow2 {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .chm-flow1 { animation: chm-run 4.2s linear infinite; }
        .chm-flow2 { animation: chm-run 5.8s linear -2s infinite; }
        @keyframes chm-run {
          0%   { transform: translateX(-46px); opacity: 0.15; }
          50%  { opacity: 0.9; }
          100% { transform: translateX(46px); opacity: 0.15; }
        }
        .chm-melt {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: chm-trickle 3.4s linear infinite;
        }
        @keyframes chm-trickle {
          0%   { transform: translateY(-8px); opacity: 0.2; }
          40%  { opacity: 0.95; }
          100% { transform: translateY(14px); opacity: 0.2; }
        }
        .chm-crate {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: chm-bob 5s ease-in-out infinite;
        }
        @keyframes chm-bob {
          0%   { transform: translate(0, 0) rotate(-2deg); }
          50%  { transform: translate(24px, -4px) rotate(3deg); }
          100% { transform: translate(0, 0) rotate(-2deg); }
        }
        .chm-plank {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: chm-slide 6.4s ease-in-out infinite;
        }
        @keyframes chm-slide {
          0%   { transform: translate(0, 0) rotate(1deg); }
          50%  { transform: translate(-28px, 3px) rotate(-2deg); }
          100% { transform: translate(0, 0) rotate(1deg); }
        }
        .chm-glint {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: chm-shine 3.8s ease-in-out infinite;
        }
        @keyframes chm-shine {
          0%, 100% { opacity: 0.22; transform: scaleX(0.9); }
          50%      { opacity: 0.65; transform: scaleX(1.08); }
        }
        .chm-rise {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: chm-swell 6.6s ease-in-out infinite;
        }
        @keyframes chm-swell {
          0%, 100% { transform: translateY(3px); }
          50%      { transform: translateY(-4px); }
        }
        .chm-drip1, .chm-drip2 {
          transform-box: fill-box;
          transform-origin: 50% 0%;
        }
        .chm-drip1 { animation: chm-drop 2.2s ease-in infinite; }
        .chm-drip2 { animation: chm-drop 2.2s ease-in -1.1s infinite; }
        @keyframes chm-drop {
          0%   { transform: translateY(0); opacity: 0; }
          15%  { opacity: 1; }
          100% { transform: translateY(58px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .chm-flow1, .chm-flow2, .chm-melt, .chm-crate, .chm-plank,
          .chm-glint, .chm-rise, .chm-drip1, .chm-drip2 { animation: none; }
          .chm-crate { transform: translate(12px, -2px) rotate(2deg); }
          .chm-drip1 { transform: translateY(28px); }
          .chm-drip2 { transform: translateY(44px); }
        }
      `}</style>
    </svg>
  );
}
