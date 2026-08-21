/**
 * 大潮が唯一の滑走路を水没させる。
 *
 * 本文の芯は3つ。**夜明け前であること・護岸を越えた水が、環礁で唯一の舗装面
 * である滑走路をくるぶしの深さで覆うこと・水が引くのを待つあいだ、その日の
 * たった一便が欠航すること。**
 *
 * 欠航の3枚(ここ・`ashfallground`・`islandhopperfog`)の描き分けで、
 * ここは **薄明の藍と桃** の担当。**雨は1滴も降らせない。**
 * 空は晴れていて、水は静かに横から入ってくる——それが大潮の怖さなので。
 *
 * 動くのは**滑走路の上をゆっくり広がって引く水・波紋・懐中電灯の光・
 * 護岸を越える一枚の波・水面に映る滑走路灯**。止めた状態でも、
 * 白い破線が水の下に沈み、二人が長靴で立っている構図で分かる。
 */
export function OceaniaKingtideflood() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜明け前。上は藍、水平線だけが桃色に明るい。 */}
      <rect width="400" height="210" fill="#2f3f5f" />
      <rect width="400" height="44" fill="#26304c" />
      <rect y="44" width="400" height="24" fill="#3a4668" />
      <rect y="68" width="400" height="18" fill="#6b6480" />
      <rect y="86" width="400" height="14" fill="#b0808a" />
      <rect y="100" width="400" height="10" fill="#e8a898" />

      {/* まだ残っている星。 */}
      <g fill="#dfe4f0" opacity="0.75">
        <circle cx="42" cy="18" r="1.6" />
        <circle cx="96" cy="30" r="1.2" />
        <circle cx="164" cy="14" r="1.4" />
        <circle cx="246" cy="26" r="1.1" />
        <circle cx="312" cy="12" r="1.5" />
        <circle cx="368" cy="34" r="1.2" />
      </g>

      {/* 環礁の縁と椰子の影。**逆光なので真っ黒に近い。** */}
      <path d="M0,110q70,-6 140,-2q80,4 260,-4v8H0z" fill="#26303c" />
      <g fill="#1f2833">
        <path d="M28,110V88" stroke="#1f2833" strokeWidth="3" />
        <path d="M28,88q-16,-3 -25,5q13,-2 24,1zM28,88q-14,-11 -27,-9q13,3 25,11zM28,88q4,-13 -1,-21q-1,11 -4,20zM28,88q16,-4 26,3q-14,-2 -25,0z" />
        <path d="M348,110V92" stroke="#1f2833" strokeWidth="3" />
        <path d="M348,92q-14,-3 -22,4q11,-2 21,1zM348,92q-12,-10 -24,-8q12,3 22,10zM348,92q3,-11 -1,-18q-1,9 -3,17zM348,92q14,-4 23,3q-12,-2 -22,0z" />
      </g>

      {/* 護岸のブロック。**この上を水が越えてくる。** */}
      <g fill="#4a5260">
        <rect x="0" y="116" width="30" height="12" rx="2" />
        <rect x="32" y="116" width="30" height="12" rx="2" />
        <rect x="64" y="116" width="30" height="12" rx="2" />
        <rect x="96" y="116" width="30" height="12" rx="2" />
        <rect x="128" y="116" width="30" height="12" rx="2" />
        <rect x="160" y="116" width="30" height="12" rx="2" />
        <rect x="192" y="116" width="30" height="12" rx="2" />
        <rect x="224" y="116" width="30" height="12" rx="2" />
        <rect x="256" y="116" width="30" height="12" rx="2" />
        <rect x="288" y="116" width="30" height="12" rx="2" />
        <rect x="320" y="116" width="30" height="12" rx="2" />
        <rect x="352" y="116" width="48" height="12" rx="2" />
      </g>
      <rect y="114" width="400" height="4" fill="#5f6874" />

      {/* 護岸を越える一枚の波。 */}
      <g className="okt-overtop" fill="#9ec0cf" opacity="0.9">
        <path d="M0,0q40,-9 82,-2q-22,10 -50,10q-26,0 -32,-8z" />
      </g>

      {/* 滑走路。**環礁で唯一の舗装面。** */}
      <rect y="128" width="400" height="82" fill="#585f66" />
      <rect y="128" width="400" height="5" fill="#6e757c" />
      <g fill="#dfe4e8" opacity="0.9">
        <rect x="8" y="156" width="34" height="6" />
        <rect x="62" y="156" width="34" height="6" />
        <rect x="116" y="156" width="34" height="6" />
        <rect x="170" y="156" width="34" height="6" />
        <rect x="224" y="156" width="34" height="6" />
        <rect x="278" y="156" width="34" height="6" />
        <rect x="332" y="156" width="34" height="6" />
      </g>
      <g fill="#c8cdd2" opacity="0.75">
        <rect x="0" y="196" width="400" height="4" />
      </g>
      <g stroke="#474d54" strokeWidth="2" opacity="0.8" fill="none">
        <path d="M0,142h400M0,178h400M90,128v82M300,128v82" />
      </g>

      {/* 滑走路灯。水に映って伸びる。 */}
      <g fill="#8fd8f0">
        <circle cx="46" cy="136" r="3.4" />
        <circle cx="146" cy="136" r="3.4" />
        <circle cx="246" cy="136" r="3.4" />
        <circle cx="346" cy="136" r="3.4" />
      </g>

      {/* **滑走路を覆う水。**ゆっくり広がって、少しだけ引く。 */}
      <g className="okt-sheet">
        <path d="M0,134h400v76H0z" fill="#7fa8bc" opacity="0.62" />
        <path d="M0,134q64,7 132,3q78,-5 150,3q60,7 118,-2v6H0z" fill="#a8ccdc" opacity="0.7" />
      </g>
      {/* 水に映る滑走路灯。 */}
      <g className="okt-sheet" fill="#8fd8f0" opacity="0.5">
        <ellipse cx="46" cy="152" rx="3" ry="10" />
        <ellipse cx="146" cy="152" rx="3" ry="10" />
        <ellipse cx="246" cy="152" rx="3" ry="10" />
        <ellipse cx="346" cy="152" rx="3" ry="10" />
      </g>
      {/* 水に映る夜明けの色。 */}
      <g className="okt-sheet" fill="#e8a898" opacity="0.28">
        <ellipse cx="200" cy="170" rx="180" ry="14" />
      </g>

      {/* 波紋。 */}
      <g className="okt-ring1" fill="none" stroke="#dfeef6" strokeWidth="2" opacity="0.7">
        <ellipse cx="86" cy="188" rx="18" ry="6" />
      </g>
      <g className="okt-ring2" fill="none" stroke="#dfeef6" strokeWidth="2" opacity="0.6">
        <ellipse cx="312" cy="176" rx="16" ry="5" />
      </g>

      {/* 地上係員2人。**長靴。片方が水位を懐中電灯で見ている。** */}
      <g>
        {/* 左の人:黄色いレインコート、水位を測る棒 */}
        <ellipse cx="106" cy="196" rx="17" ry="4" fill="#1f3a48" opacity="0.4" />
        <g fill="#3a4a3a">
          <rect x="99" y="180" width="6" height="16" rx="2" />
          <rect x="108" y="180" width="6" height="16" rx="2" />
        </g>
        <path d="M96,182l4,-30h14l4,30z" fill="#f5b31c" />
        <path d="M96,182h22v4H96z" fill="#d09410" />
        <circle cx="107" cy="146" r="8" fill="#c98f5f" />
        <path d="M98,147a9,9 0 0 1 18,0z" fill="#f5b31c" />
        <path d="M117,158l14,26" stroke="#f5b31c" strokeWidth="5.4" strokeLinecap="round" fill="none" />
        {/* 水位を測る白黒の棒 */}
        <g>
          <rect x="130" y="150" width="5" height="46" fill="#efe8d4" />
          <g fill="#33302c">
            <rect x="130" y="156" width="5" height="6" />
            <rect x="130" y="168" width="5" height="6" />
            <rect x="130" y="180" width="5" height="6" />
            <rect x="130" y="192" width="5" height="4" />
          </g>
        </g>
      </g>
      <g>
        {/* 右の人:青いシャツ。懐中電灯を水面に向ける。 */}
        <ellipse cx="288" cy="202" rx="18" ry="4" fill="#1f3a48" opacity="0.4" />
        <g fill="#2f3a48">
          <rect x="281" y="186" width="6" height="16" rx="2" />
          <rect x="290" y="186" width="6" height="16" rx="2" />
        </g>
        <path d="M278,188l4,-30h14l4,30z" fill="#3f6f9a" />
        <circle cx="289" cy="152" r="8" fill="#8a6a4a" />
        <path d="M280,152a9,9 0 0 1 18,0z" fill="#e8e0cc" />
        <path d="M279,164l-18,14" stroke="#3f6f9a" strokeWidth="5.4" strokeLinecap="round" fill="none" />
        <rect x="252" y="174" width="12" height="6" rx="2" fill="#5f6874" transform="rotate(28 258 177)" />
      </g>
      {/* 懐中電灯の光。**水面だけを照らす。** */}
      <g className="okt-beam" fill="#f2f0c8" opacity="0.3">
        <path d="M252,180l-52,26l6,10l54,-24z" />
      </g>

      {/* 手前の水。**くるぶしの深さ。** */}
      <g fill="#a8ccdc" opacity="0.35">
        <ellipse cx="70" cy="206" rx="86" ry="7" />
        <ellipse cx="330" cy="200" rx="76" ry="6" />
      </g>

      <style>{`
        .okt-sheet {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: okt-creep 6.4s ease-in-out infinite;
        }
        @keyframes okt-creep {
          0%, 100% { transform: translateY(22px); }
          55%      { transform: translateY(0); }
        }
        .okt-overtop {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: okt-spill 6.4s ease-in-out infinite;
        }
        @keyframes okt-spill {
          0%   { transform: translate(190px, 128px) scaleY(0.2); opacity: 0; }
          22%  { transform: translate(190px, 122px) scaleY(1); opacity: 0.9; }
          60%  { transform: translate(190px, 140px) scaleY(0.6); opacity: 0.5; }
          100% { transform: translate(190px, 150px) scaleY(0.2); opacity: 0; }
        }
        .okt-ring1 {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: okt-ripple 3.2s ease-out infinite;
        }
        .okt-ring2 {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: okt-ripple 3.2s ease-out 1.6s infinite;
        }
        @keyframes okt-ripple {
          0%   { transform: scale(0.2); opacity: 0; }
          25%  { opacity: 0.75; }
          100% { transform: scale(1.7); opacity: 0; }
        }
        .okt-beam { animation: okt-sweep 4.2s ease-in-out infinite; }
        @keyframes okt-sweep {
          0%, 100% { opacity: 0.16; transform: rotate(0deg); }
          50%      { opacity: 0.38; transform: rotate(-5deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .okt-sheet, .okt-overtop, .okt-ring1, .okt-ring2, .okt-beam {
            animation: none;
          }
          /* 水は滑走路を覆いきった位置で止める。 */
          .okt-overtop {
            transform: translate(190px, 122px);
            transform-box: fill-box;
            transform-origin: 50% 100%;
          }
        }
      `}</style>
    </svg>
  );
}
