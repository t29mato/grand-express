/**
 * 季節外れのハリケーンが立ちサトウキビをなぎ倒す。
 *
 * 本文の芯は3つ。**あと一月立たせるはずだった畑を薙ぐこと・倒れた茎は
 * 機械でも鉈でももうきれいに刈れないこと・一季節の生育がひと午後で
 * 消えること。**
 *
 * 7枚の描き分けで、ここは**人も建物も出さない**担当。畑だけを水平の視点で
 * 見る。地色は暗い紫灰(tranca-de-rio の明るい真昼と対)。
 *
 * 動くのは**低く飛ぶ雲・斜めに走る雨の帯・波打って倒れていくキビの列・
 * ちぎれて飛ぶ葉・しなる大王ヤシ**。キビは「揺れる」のではなく
 * **倒れて戻らない**のを繰り返しで見せ、止めた状態では倒れきった姿にする。
 */
export function CubaCiclonDeLaZafra() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 嵐の空。夕暮れの紫灰 */}
      <rect width="400" height="210" fill="#4c4a5f" />
      <rect width="400" height="60" fill="#3d3b50" />
      <rect y="60" width="400" height="36" fill="#565468" />

      {/* 低く速い雲 */}
      <g className="cucz-cloud1" fill="#33323f" opacity="0.9">
        <ellipse cx="80" cy="24" rx="130" ry="17" />
        <ellipse cx="240" cy="16" rx="100" ry="13" />
      </g>
      <g className="cucz-cloud2" fill="#403e52" opacity="0.85">
        <ellipse cx="300" cy="52" rx="140" ry="14" />
        <ellipse cx="90" cy="60" rx="110" ry="12" />
      </g>

      {/* 遠景:しなる大王ヤシ(1本だけ。建物は無い) */}
      <g className="cucz-palm">
        <path d="M330,120q-4,-34 -14,-52h5q12,18 15,52z" fill="#8a8474" />
        <g fill="#3f5f46">
          <path d="M316,68q-24,-8 -38,2q20,-1 36,3z" />
          <path d="M316,68q-24,-18 -40,-16q20,6 36,20z" />
          <path d="M316,68q-12,-24 -28,-30q10,14 22,32z" />
          <path d="M316,68q4,-18 -4,-32q0,16 -2,30z" />
        </g>
      </g>

      {/* 畑の地面 */}
      <rect y="120" width="400" height="90" fill="#5a5f45" />
      <rect y="120" width="400" height="12" fill="#4f5440" />
      <rect y="170" width="400" height="40" fill="#63684a" />

      {/* すでに倒れきった列(手前。もう戻らない) */}
      <g stroke="#8a9750" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.9">
        <path d="M10,180q22,-8 44,-6M48,188q24,-9 48,-6M120,184q22,-8 44,-6M210,188q24,-8 48,-6M300,184q22,-8 44,-6M350,192q22,-8 44,-5" />
      </g>
      <g stroke="#6f7c42" strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0.8">
        <path d="M30,196q24,-7 46,-5M150,196q24,-7 46,-5M260,198q24,-7 46,-5" />
      </g>

      {/* 倒れていくキビの列(中景)。位置決めは外の g、倒れは内のクラス */}
      <g transform="translate(30,168)">
        <g className="cucz-cane1">
          <g stroke="#a8b85a" strokeWidth="3.4" fill="none" strokeLinecap="round">
            <path d="M0,0V-42M12,0V-46M24,0V-40" />
          </g>
          <g stroke="#8fae4a" strokeWidth="2.2" fill="none" strokeLinecap="round">
            <path d="M0,-42q6,-8 14,-10M0,-42q-7,-7 -13,-8M12,-46q7,-8 14,-9M12,-46q-7,-8 -14,-9M24,-40q7,-7 13,-8M24,-40q-6,-8 -12,-9" />
          </g>
        </g>
      </g>
      <g transform="translate(120,164)">
        <g className="cucz-cane2">
          <g stroke="#a8b85a" strokeWidth="3.4" fill="none" strokeLinecap="round">
            <path d="M0,0V-44M13,0V-40M26,0V-46" />
          </g>
          <g stroke="#8fae4a" strokeWidth="2.2" fill="none" strokeLinecap="round">
            <path d="M0,-44q6,-8 14,-9M0,-44q-7,-7 -13,-8M13,-40q7,-8 14,-9M26,-46q7,-7 13,-8M26,-46q-6,-8 -12,-9" />
          </g>
        </g>
      </g>
      <g transform="translate(212,166)">
        <g className="cucz-cane3">
          <g stroke="#a8b85a" strokeWidth="3.4" fill="none" strokeLinecap="round">
            <path d="M0,0V-40M12,0V-46M24,0V-42" />
          </g>
          <g stroke="#8fae4a" strokeWidth="2.2" fill="none" strokeLinecap="round">
            <path d="M0,-40q6,-8 14,-9M12,-46q7,-8 14,-9M12,-46q-7,-8 -14,-9M24,-42q7,-7 13,-8" />
          </g>
        </g>
      </g>
      <g transform="translate(302,168)">
        <g className="cucz-cane4">
          <g stroke="#a8b85a" strokeWidth="3.4" fill="none" strokeLinecap="round">
            <path d="M0,0V-42M13,0V-38M26,0V-44" />
          </g>
          <g stroke="#8fae4a" strokeWidth="2.2" fill="none" strokeLinecap="round">
            <path d="M0,-42q6,-8 14,-9M13,-38q7,-7 13,-8M26,-44q7,-8 13,-9M26,-44q-6,-8 -12,-9" />
          </g>
        </g>
      </g>

      {/* 奥の列(すでに斜めで固まっている) */}
      <g stroke="#96a452" strokeWidth="2.6" fill="none" strokeLinecap="round" opacity="0.85">
        <path d="M20,132l30,-16M60,134l30,-14M104,132l30,-15M150,134l30,-13M198,132l30,-15M246,134l30,-14M292,132l30,-15M340,134l30,-13" />
      </g>

      {/* 斜めの雨の帯(2層) */}
      <g className="cucz-rain1" stroke="#9aa4c2" strokeWidth="2" opacity="0.55" fill="none" strokeLinecap="round">
        <path d="M20,-30l-36,84M80,-30l-36,84M140,-30l-36,84M200,-30l-36,84M260,-30l-36,84M320,-30l-36,84M380,-30l-36,84M440,-30l-36,84" />
      </g>
      <g className="cucz-rain2" stroke="#b8c0d8" strokeWidth="1.4" opacity="0.45" fill="none" strokeLinecap="round">
        <path d="M50,-30l-30,70M110,-30l-30,70M170,-30l-30,70M230,-30l-30,70M290,-30l-30,70M350,-30l-30,70M410,-30l-30,70" />
      </g>

      {/* ちぎれて飛ぶ葉 */}
      <g className="cucz-leaf1">
        <path d="M0,0q6,-4 12,-1q-6,4 -12,1z" fill="#8fae4a" />
      </g>
      <g className="cucz-leaf2">
        <path d="M0,0q6,-4 12,-1q-6,4 -12,1z" fill="#a8b85a" />
      </g>
      <g className="cucz-leaf3">
        <path d="M0,0q5,-3.4 10,-1q-5,3.4 -10,1z" fill="#7f9a3f" />
      </g>

      <style>{`
        .cucz-cloud1 { animation: cucz-fly1 3.6s linear infinite; }
        @keyframes cucz-fly1 {
          from { transform: translateX(70px); }
          to   { transform: translateX(-70px); }
        }
        .cucz-cloud2 { animation: cucz-fly2 2.7s linear infinite; }
        @keyframes cucz-fly2 {
          from { transform: translateX(90px); }
          to   { transform: translateX(-90px); }
        }
        .cucz-palm {
          transform-box: fill-box;
          transform-origin: 60% 100%;
          animation: cucz-bend 2.2s ease-in-out infinite;
        }
        @keyframes cucz-bend {
          0%, 100% { transform: rotate(-4deg) skewX(-4deg); }
          50%      { transform: rotate(-11deg) skewX(-9deg); }
        }
        .cucz-cane1, .cucz-cane2, .cucz-cane3, .cucz-cane4 {
          transform-box: fill-box;
          transform-origin: 50% 100%;
        }
        /* 倒れて、戻らない。長い停止のあとにまた次の突風で倒れる */
        .cucz-cane1 { animation: cucz-flatten 7s ease-in infinite; }
        .cucz-cane2 { animation: cucz-flatten 7s ease-in 0.5s infinite; }
        .cucz-cane3 { animation: cucz-flatten 7s ease-in 1.1s infinite; }
        .cucz-cane4 { animation: cucz-flatten 7s ease-in 0.8s infinite; }
        @keyframes cucz-flatten {
          0%        { transform: rotate(-8deg); }
          10%       { transform: rotate(-16deg); }
          16%       { transform: rotate(-6deg); }
          30%       { transform: rotate(-62deg); }
          34%       { transform: rotate(-56deg); }
          38%, 96%  { transform: rotate(-64deg); }
          100%      { transform: rotate(-64deg); }
        }
        .cucz-rain1 { animation: cucz-pour1 0.9s linear infinite; }
        @keyframes cucz-pour1 {
          from { transform: translate(0, 0); }
          to   { transform: translate(-26px, 60px); }
        }
        .cucz-rain2 { animation: cucz-pour2 1.3s linear infinite; }
        @keyframes cucz-pour2 {
          from { transform: translate(0, 0); }
          to   { transform: translate(-24px, 56px); }
        }
        .cucz-leaf1 { animation: cucz-blow1 3.4s ease-in infinite; }
        .cucz-leaf2 { animation: cucz-blow2 4.2s ease-in 1.2s infinite; }
        .cucz-leaf3 { animation: cucz-blow3 3.8s ease-in 2.1s infinite; }
        @keyframes cucz-blow1 {
          0%   { transform: translate(392px, 128px) rotate(0deg); opacity: 0; }
          10%  { opacity: 1; }
          100% { transform: translate(-30px, 60px) rotate(-540deg); opacity: 0.9; }
        }
        @keyframes cucz-blow2 {
          0%   { transform: translate(396px, 100px) rotate(0deg); opacity: 0; }
          10%  { opacity: 1; }
          100% { transform: translate(-30px, 150px) rotate(-720deg); opacity: 0.9; }
        }
        @keyframes cucz-blow3 {
          0%   { transform: translate(388px, 150px) rotate(0deg); opacity: 0; }
          12%  { opacity: 1; }
          100% { transform: translate(-24px, 96px) rotate(-540deg); opacity: 0.9; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cucz-cloud1, .cucz-cloud2, .cucz-palm,
          .cucz-cane1, .cucz-cane2, .cucz-cane3, .cucz-cane4,
          .cucz-rain1, .cucz-rain2,
          .cucz-leaf1, .cucz-leaf2, .cucz-leaf3 {
            animation: none;
          }
          /* キビは倒れきった角度、ヤシはしなった角度で止める。 */
          .cucz-cane1, .cucz-cane2, .cucz-cane3, .cucz-cane4 {
            transform: rotate(-64deg);
            transform-box: fill-box;
            transform-origin: 50% 100%;
          }
          .cucz-palm {
            transform: rotate(-11deg) skewX(-9deg);
            transform-box: fill-box;
            transform-origin: 60% 100%;
          }
          .cucz-leaf1 { transform: translate(120px, 90px) rotate(-200deg); }
          .cucz-leaf2 { transform: translate(250px, 70px) rotate(-160deg); }
          .cucz-leaf3 { opacity: 0; }
        }
      `}</style>
    </svg>
  );
}
