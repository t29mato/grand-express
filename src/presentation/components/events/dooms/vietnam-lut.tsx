/**
 * ルット。メコンデルタの増水期(「浮き水」)が押し寄せる。
 * 岸からゆっくりあふれて田を覆う。**農家はそれと戦うのではなく、その周期に合わせる。**
 * それでもいつもより高く速く来た年には、道路や市場、バイクが水浸しになる。
 *
 * 構図: 一面に広がった浅い水。**騒がしくない絵にする。**
 * 家は高床のまま水に浮かんで見え、人は舟で行き来している。
 * 手前の道は水没して、標識の足元だけが水から出ている。
 * 右手前で、水に浸かったバイクを2人が押している——ここだけが「今年は高い」の証拠。
 *
 * **逃げ惑う人も壊れた家も描かない。**毎年のことなので、みな淡々としている。
 *
 * 動くのは5つ: ゆっくり広がる波紋、進む小舟、水面に映る家の揺れ、
 * 浮かんだホテイアオイ、バイクを押す2人。
 * 止めても「水没した道と、舟で行き来する人」で伝わる。
 *
 * (アジア盤のモンスーンとは別物にする: あちらは路盤が流され、枕木が宙に浮く。
 *  こちらは**壊れていない。**ただ水が来ていて、暮らしがその上で続いている。)
 */
export function VietnamLut() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 増水期の空。雨の合間の明るい灰。 */}
      <rect width="400" height="210" fill="#9aa08a" />
      <rect width="400" height="86" fill="#c4c8bc" />
      <rect width="400" height="36" fill="#d8d8c8" />
      <g fill="#b0b8ac" opacity="0.85">
        <ellipse cx="90" cy="24" rx="70" ry="12" />
        <ellipse cx="300" cy="18" rx="80" ry="13" />
      </g>

      {/* 遠くの椰子と水面から出た木の列。 */}
      <g stroke="#3f7a4a" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M28,96V72M28,72q-12,-4 -17,3M28,72q12,-4 17,3M28,72q-9,-11 -18,-10M28,72q9,-11 18,-10" />
        <path d="M362,98V76M362,76q-11,-4 -15,3M362,76q11,-4 15,3M362,76q-8,-10 -16,-9" />
      </g>
      <g fill="#4f8a52">
        <ellipse cx="110" cy="92" rx="26" ry="9" />
        <ellipse cx="180" cy="90" rx="22" ry="8" />
        <ellipse cx="286" cy="92" rx="28" ry="9" />
      </g>
      <rect y="96" width="400" height="8" fill="#5f8f5a" />

      {/* 水。**画面の大半が水。**穏やかな面にする。 */}
      <rect y="104" width="400" height="106" fill="#8f9578" />
      <rect y="104" width="400" height="12" fill="#9aa082" />
      <g stroke="#a8ae90" strokeWidth="2" opacity="0.6" fill="none">
        <path d="M0,128h400M0,158h400M0,190h400" />
      </g>

      {/* 水面から出ている稲の先だけ。田はもう水の下。 */}
      <g
        stroke="#6f9f4a"
        strokeWidth="2"
        opacity="0.8"
        strokeLinecap="round"
        fill="none"
      >
        <path d="M18,134v-8M30,136v-9M44,133v-7M120,140v-8M134,142v-9M148,139v-7M300,146v-8M314,148v-9M328,145v-7" />
      </g>

      {/* 高床の家。水に浮かんで見える。 */}
      <g>
        <g fill="#8a6a46">
          <rect x="34" y="128" width="5" height="22" />
          <rect x="104" y="128" width="5" height="22" />
        </g>
        <rect x="28" y="104" width="88" height="24" fill="#c9a878" />
        <path d="M20,104h104l-12,-14H32z" fill="#8f8266" />
        <rect x="62" y="112" width="18" height="16" fill="#5f4a34" />
        <g stroke="#a8875a" strokeWidth="1.6" opacity="0.7" fill="none">
          <path d="M28,114h88M28,121h88" />
        </g>
      </g>
      <g className="vietnam-lut-reflect" fill="#c9a878" opacity="0.28">
        <rect x="28" y="150" width="88" height="20" />
      </g>

      {/* 水没した道路標識。足元だけが水から出ている。 */}
      <g>
        <rect x="196" y="120" width="5" height="34" fill="#8f8878" />
        <circle
          cx="198.5"
          cy="114"
          r="11"
          fill="#efe7d4"
          stroke="#da251d"
          strokeWidth="4"
        />
        <rect x="192" y="112" width="13" height="4" fill="#da251d" />
      </g>

      {/* 小舟。売り物を積んで行き来している。 */}
      <g className="vietnam-lut-boat">
        <path d="M212,166h84q-6,12 -22,12h-40q-16,-2 -22,-12z" fill="#7a5a3c" />
        <path
          d="M212,166q42,-10 84,0"
          fill="none"
          stroke="#5f4428"
          strokeWidth="2.4"
        />
        <g fill="#e8901c">
          <ellipse cx="240" cy="160" rx="12" ry="6" />
        </g>
        <g fill="#5f9f43">
          <ellipse cx="264" cy="160" rx="11" ry="5.4" />
        </g>
        {/* 竿で漕ぐ人。円錐の笠。 */}
        <g transform="translate(288,0)">
          <path d="M-7,166v-20q0,-5 7,-5q7,0 7,5v20z" fill="#2f8f8a" />
          <circle cx="0" cy="134" r="7" fill="#8a6a48" />
          <path d="M-12,132h24l-12,-11z" fill="#e0c890" />
          <path
            d="M4,146q10,-6 12,-16"
            stroke="#2f8f8a"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M18,124L6,182"
            stroke="#a88a56"
            strokeWidth="3"
            fill="none"
          />
        </g>
      </g>

      {/* 浮かんだホテイアオイ。デルタの増水期の風物。 */}
      <g className="vietnam-lut-hyacinth" fill="#4f8a52">
        <ellipse cx="60" cy="186" rx="13" ry="6" />
        <ellipse cx="84" cy="192" rx="10" ry="5" />
        <ellipse cx="150" cy="180" rx="11" ry="5" />
      </g>
      <g className="vietnam-lut-hyacinth" fill="#7f5f9a">
        <circle cx="60" cy="180" r="3" />
        <circle cx="150" cy="175" r="2.6" />
      </g>

      {/* 水に浸かったバイクを押す2人(右手前)。 */}
      <g transform="translate(330,0)">
        <g className="vietnam-lut-push">
          <g stroke="#3f3a38" strokeWidth="3" fill="none">
            <circle cx="-16" cy="188" r="10" />
            <circle cx="20" cy="188" r="10" />
            <path d="M-16,188l12,-18h16l8,18M-4,170v-8h12" />
          </g>
          <path d="M-6,178h22v6h-22z" fill="#da251d" />
          <g transform="translate(-40,0)">
            <path d="M-8,190v-24q0,-6 8,-6q8,0 8,6v24z" fill="#e8b21c" />
            <circle cx="0" cy="152" r="8" fill="#8a6a48" />
            <path d="M-13,150h26l-13,-12z" fill="#e0c890" />
            <path
              d="M7,168q12,0 18,6"
              stroke="#e8b21c"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
            />
          </g>
          <g transform="translate(44,0)">
            <path d="M-7,190v-22q0,-5 7,-5q7,0 7,5v22z" fill="#2f6fb0" />
            <circle cx="0" cy="156" r="7.4" fill="#8a6a48" />
            <path d="M-9,154q9,-9 18,0q0,-7 -9,-7q-9,0 -9,7z" fill="#3f3a34" />
            <path
              d="M-7,170q-12,0 -18,6"
              stroke="#2f6fb0"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        </g>
      </g>

      {/* ゆっくり広がる波紋。 */}
      <g
        className="vietnam-lut-ripple"
        fill="none"
        stroke="#b0b694"
        strokeWidth="2"
      >
        <ellipse cx="200" cy="196" rx="30" ry="8" />
        <ellipse cx="200" cy="196" rx="52" ry="13" opacity="0.6" />
      </g>

      <style>{`
        .vietnam-lut-boat {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: vietnam-lut-glide 9s ease-in-out infinite;
        }
        @keyframes vietnam-lut-glide {
          0%, 100% { transform: translate(-22px, 0) ; }
          50% { transform: translate(22px, -3px); }
        }
        .vietnam-lut-reflect {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: vietnam-lut-waver 4.4s ease-in-out infinite;
        }
        @keyframes vietnam-lut-waver {
          0%, 100% { transform: scaleY(1) skewX(0deg); opacity: 0.2; }
          50% { transform: scaleY(1.2) skewX(4deg); opacity: 0.36; }
        }
        .vietnam-lut-hyacinth {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: vietnam-lut-float 7s ease-in-out infinite;
        }
        @keyframes vietnam-lut-float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(14px, -3px); }
        }
        .vietnam-lut-push {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: vietnam-lut-wade 2.4s ease-in-out infinite;
        }
        @keyframes vietnam-lut-wade {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          50% { transform: translateX(-3px) rotate(-1.2deg); }
        }
        .vietnam-lut-ripple {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: vietnam-lut-spread 5s ease-out infinite;
        }
        @keyframes vietnam-lut-spread {
          0% { transform: scale(0.4); opacity: 0.8; }
          100% { transform: scale(1.3); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .vietnam-lut-boat,
          .vietnam-lut-reflect,
          .vietnam-lut-hyacinth,
          .vietnam-lut-push,
          .vietnam-lut-ripple { animation: none; }
        }
      `}</style>
    </svg>
  );
}
