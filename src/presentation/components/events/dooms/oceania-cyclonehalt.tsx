/**
 * サイクロンがすべての港を一斉に閉ざす。
 *
 * 本文の芯は3つ。**気圧計が午後じゅう下がること・港長が日暮れ前に暴風警戒標識を
 * 掲げること・地域全体の島間の便が警報解除まで止まること。**
 *
 * 7枚の描き分けで、ここは **人を1人も出さない** 担当。
 * 港に誰もいないこと自体が「閉ざされた」の意味になる。**滑走路も飛行機も出さない**
 * (欠航の3枚と混ざるため)。地色は暗い灰青で、明るい色は警戒標識の黒と白波だけ。
 *
 * 動くのは**低く速い雲・信号柱を上がる二つの黒い標識・密集した係留船の揺れ・
 * しなる椰子・岸壁を越える飛沫**。止めた状態でも、標識が上がりきり、
 * 誰もいない岸壁に船だけが押し合っている構図で分かる。
 */
export function OceaniaCyclonehalt() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 日暮れ前の空。低いところまで雲が下りている。 */}
      <rect width="400" height="210" fill="#41576a" />
      <rect width="400" height="52" fill="#37485a" />
      <rect y="52" width="400" height="30" fill="#4a5f70" />

      {/* 低く速い雲。3枚を別々の速さで流す。 */}
      <g className="ocy-cloud1" fill="#2f3d4c" opacity="0.9">
        <ellipse cx="90" cy="20" rx="120" ry="16" />
        <ellipse cx="230" cy="14" rx="90" ry="12" />
      </g>
      <g className="ocy-cloud2" fill="#3a4a5c" opacity="0.85">
        <ellipse cx="300" cy="40" rx="130" ry="13" />
        <ellipse cx="120" cy="46" rx="100" ry="11" />
      </g>
      <g className="ocy-cloud3" fill="#46596c" opacity="0.8">
        <ellipse cx="200" cy="66" rx="150" ry="10" />
      </g>

      {/* 対岸の島影。 */}
      <path d="M0,86q46,-24 104,-18q60,6 96,18z" fill="#2c3f3e" />
      <path d="M400,88q-52,-26 -114,-18q-52,8 -76,18z" fill="#26383a" />

      {/* 荒れた湾。 */}
      <rect y="86" width="400" height="124" fill="#3f5f70" />
      <rect y="86" width="400" height="26" fill="#33505f" />
      <rect y="112" width="400" height="30" fill="#456a7c" />
      <rect y="142" width="400" height="68" fill="#527f90" />

      {/* 白い頭。 */}
      <g className="ocy-caps" fill="#dfeaee" opacity="0.85">
        <path d="M28,102q10,-9 21,-2q-8,-2 -12,4q-4,4 -9,-2z" />
        <path d="M148,120q10,-9 21,-2q-8,-2 -12,4q-4,4 -9,-2z" />
        <path d="M292,108q10,-9 21,-2q-8,-2 -12,4q-4,4 -9,-2z" />
        <path d="M76,138q11,-10 23,-2q-9,-2 -13,4q-5,4 -10,-2z" />
        <path d="M330,146q11,-10 23,-2q-9,-2 -13,4q-5,4 -10,-2z" />
      </g>

      {/* **信号柱と、上がった暴風警戒標識。**この絵の主役。 */}
      <g>
        <rect x="46" y="30" width="7" height="122" fill="#5f6a70" />
        <rect x="46" y="30" width="7" height="5" fill="#8a949a" />
        <path d="M32,152h35l-5,-14H37z" fill="#4a545a" />
        <rect x="30" y="150" width="39" height="6" fill="#5f6a70" />
        {/* 横木と索 */}
        <rect x="30" y="36" width="39" height="4" fill="#5f6a70" />
        <path d="M34,40v96M65,40v96" stroke="#39424a" strokeWidth="1.6" fill="none" />
        {/* 上がった二つの円錐(頂点を下に向けた形が「暴風」) */}
        <g className="ocy-cone1">
          <path d="M22,44h24l-12,26z" fill="#1f2429" />
          <path d="M22,44h24v4H22z" fill="#3a4148" />
        </g>
        <g className="ocy-cone2">
          <path d="M53,52h24l-12,26z" fill="#1f2429" />
          <path d="M53,52h24v4H53z" fill="#3a4148" />
        </g>
        {/* 索の先で鳴っている鐘 */}
        <path d="M70,40v10" stroke="#39424a" strokeWidth="1.4" fill="none" />
        <g className="ocy-bell">
          <path d="M64,58a6,6 0 0 1 12,0v4H64z" fill="#a8823f" />
          <rect x="68" y="62" width="4" height="3" fill="#8a6a2c" />
        </g>
      </g>

      {/* 気圧計。**午後じゅう下がり続けた針。** */}
      <g>
        <rect x="294" y="96" width="6" height="56" fill="#4a545a" />
        <circle cx="297" cy="86" r="19" fill="#dfd8c8" />
        <circle cx="297" cy="86" r="19" fill="none" stroke="#8a8f8a" strokeWidth="3" />
        <circle cx="297" cy="86" r="14" fill="#f2ece0" />
        <g stroke="#8a8f8a" strokeWidth="1.4" fill="none">
          <path d="M297,74v3M309,86h-3M297,98v-3M285,86h3M288,77l2,2M306,77l-2,2" />
        </g>
        <g className="ocy-needle">
          <path d="M297,86l-9,-8" stroke="#c8452f" strokeWidth="2.6" strokeLinecap="round" fill="none" />
        </g>
        <circle cx="297" cy="86" r="2.4" fill="#4a545a" />
      </g>

      {/* 岸壁。**誰もいない。** */}
      <path d="M0,168h400v42H0z" fill="#6b7076" />
      <path d="M0,168h400v5H0z" fill="#868c92" />
      <g fill="#565b60">
        <rect x="18" y="176" width="14" height="10" rx="5" />
        <rect x="196" y="176" width="14" height="10" rx="5" />
        <rect x="352" y="176" width="14" height="10" rx="5" />
      </g>
      <g stroke="#565b60" strokeWidth="2" fill="none" opacity="0.8">
        <path d="M0,192h400M60,168v42M160,168v42M260,168v42M340,168v42" />
      </g>

      {/* 密集して係留された船。**逃げ場を求めて押し合っている。** */}
      {/* 位置決めは外側の g、揺れは内側のクラス(重ねると原点へ飛ぶ)。 */}
      <g transform="translate(0,-15)">
        <g className="ocy-boatA">
          <path d="M96,164q26,12 54,0q-26,-7 -54,0z" fill="#c8452f" />
          <path d="M104,162h38v-3h-38z" fill="#e8e0cc" />
          <rect x="124" y="150" width="12" height="10" fill="#e8e0cc" />
          <path d="M118,150v-26" stroke="#4a4438" strokeWidth="2.4" fill="none" />
        </g>
      </g>
      <g transform="translate(0,-15)">
        <g className="ocy-boatB">
          <path d="M158,158q22,11 46,0q-22,-6 -46,-0z" fill="#3f6f9a" />
          <path d="M166,156h30v-3h-30z" fill="#dfe4dc" />
          <path d="M188,153v-24" stroke="#4a4438" strokeWidth="2.2" fill="none" />
          <rect x="170" y="146" width="10" height="8" fill="#dfe4dc" />
        </g>
      </g>
      <g transform="translate(0,-15)">
        <g className="ocy-boatC">
          <path d="M226,166q24,12 50,0q-24,-7 -50,0z" fill="#4f7f6a" />
          <path d="M234,164h34v-3h-34z" fill="#efe8d0" />
          <path d="M256,161v-27" stroke="#4a4438" strokeWidth="2.4" fill="none" />
          <rect x="238" y="153" width="11" height="9" fill="#efe8d0" />
        </g>
      </g>
      <g transform="translate(0,-15)">
        <g className="ocy-boatD">
          <path d="M292,158q20,10 42,0q-20,-6 -42,0z" fill="#c2a13f" />
          <path d="M300,156h26v-3h-26z" fill="#e8e0cc" />
          <path d="M318,153v-21" stroke="#4a4438" strokeWidth="2" fill="none" />
        </g>
      </g>
      {/* 係留索 */}
      <g stroke="#3a4148" strokeWidth="1.8" fill="none" opacity="0.9">
        <path d="M25,178q42,-10 80,-26M203,178q24,-12 44,-26M359,178q-16,-12 -32,-28" />
      </g>

      {/* 風でしなる椰子。**右端で、幹ごと傾く。** */}
      <g className="ocy-palm">
        <path d="M382,168q-6,-24 -18,-40h6q14,16 18,40z" fill="#5a4a38" />
        <g fill="#3f6b44">
          <path d="M364,128q-22,-4 -34,6q18,-2 32,0z" />
          <path d="M364,128q-20,-14 -36,-12q18,4 32,14z" />
          <path d="M364,128q-14,-20 -30,-24q12,12 24,26z" />
          <path d="M364,128q6,-16 0,-28q-2,14 -6,26z" />
        </g>
      </g>

      {/* 岸壁を越える飛沫。 */}
      <g className="ocy-spray" fill="#e8f0f2" opacity="0.9">
        <ellipse cx="0" cy="0" rx="14" ry="7" />
        <ellipse cx="-16" cy="-8" rx="8" ry="5" />
        <ellipse cx="16" cy="-6" rx="9" ry="5" />
        <circle cx="4" cy="-18" r="4" />
      </g>
      <g className="ocy-spray2" fill="#e8f0f2" opacity="0.8">
        <ellipse cx="0" cy="0" rx="11" ry="6" />
        <ellipse cx="-12" cy="-6" rx="7" ry="4" />
        <circle cx="8" cy="-14" r="3.4" />
      </g>

      {/* 手前の水たまり。 */}
      <g fill="#8fa8b4" opacity="0.6">
        <ellipse cx="70" cy="202" rx="52" ry="6" />
        <ellipse cx="308" cy="206" rx="58" ry="6" />
      </g>

      <style>{`
        .ocy-cloud1 { animation: ocy-drift1 9s linear infinite; }
        @keyframes ocy-drift1 {
          from { transform: translateX(-60px); }
          to   { transform: translateX(60px); }
        }
        .ocy-cloud2 { animation: ocy-drift2 6.5s linear infinite; }
        @keyframes ocy-drift2 {
          from { transform: translateX(70px); }
          to   { transform: translateX(-70px); }
        }
        .ocy-cloud3 { animation: ocy-drift3 5s linear infinite; }
        @keyframes ocy-drift3 {
          from { transform: translateX(-80px); }
          to   { transform: translateX(80px); }
        }
        .ocy-cone1 {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: ocy-hoist 5s ease-out infinite;
        }
        .ocy-cone2 {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: ocy-hoist 5s ease-out 0.6s infinite;
        }
        @keyframes ocy-hoist {
          0%       { transform: translateY(84px); opacity: 0; }
          16%      { transform: translateY(84px); opacity: 1; }
          40%,100% { transform: translateY(0); opacity: 1; }
        }
        .ocy-bell {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: ocy-ring 1.1s ease-in-out infinite;
        }
        @keyframes ocy-ring {
          0%, 100% { transform: rotate(-13deg); }
          50%      { transform: rotate(13deg); }
        }
        .ocy-needle {
          transform-box: fill-box;
          transform-origin: 100% 100%;
          animation: ocy-fall 5s ease-in-out infinite;
        }
        @keyframes ocy-fall {
          0%   { transform: rotate(52deg); }
          80%, 100% { transform: rotate(0deg); }
        }
        .ocy-boatA {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: ocy-rock 2.6s ease-in-out infinite;
        }
        .ocy-boatB {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: ocy-rock 2.1s ease-in-out 0.4s infinite;
        }
        .ocy-boatC {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: ocy-rock 3s ease-in-out 0.8s infinite;
        }
        .ocy-boatD {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: ocy-rock 2.3s ease-in-out 1.2s infinite;
        }
        @keyframes ocy-rock {
          0%, 100% { transform: rotate(-7deg) translateY(0); }
          50%      { transform: rotate(7deg) translateY(-3px); }
        }
        .ocy-caps {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: ocy-swell 2.4s ease-in-out infinite;
        }
        @keyframes ocy-swell {
          0%, 100% { transform: translateY(0); opacity: 0.85; }
          50%      { transform: translateY(-5px); opacity: 1; }
        }
        .ocy-palm {
          transform-box: fill-box;
          transform-origin: 100% 100%;
          animation: ocy-bend 2.8s ease-in-out infinite;
        }
        @keyframes ocy-bend {
          0%, 100% { transform: rotate(0deg) skewX(0deg); }
          50%      { transform: rotate(9deg) skewX(6deg); }
        }
        .ocy-spray {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: ocy-burst 2.6s ease-out infinite;
        }
        .ocy-spray2 {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: ocy-burst2 3.4s ease-out 1.1s infinite;
        }
        @keyframes ocy-burst {
          0%   { transform: translate(40px, 186px) scale(0.3); opacity: 0; }
          30%  { transform: translate(40px, 168px) scale(1); opacity: 1; }
          100% { transform: translate(54px, 202px) scale(1.3); opacity: 0; }
        }
        @keyframes ocy-burst2 {
          0%   { transform: translate(300px, 190px) scale(0.3); opacity: 0; }
          30%  { transform: translate(300px, 172px) scale(1); opacity: 1; }
          100% { transform: translate(288px, 204px) scale(1.2); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ocy-cloud1, .ocy-cloud2, .ocy-cloud3, .ocy-cone1, .ocy-cone2,
          .ocy-bell, .ocy-needle, .ocy-boatA, .ocy-boatB, .ocy-boatC,
          .ocy-boatD, .ocy-caps, .ocy-palm, .ocy-spray, .ocy-spray2 {
            animation: none;
          }
          /* 標識は上がりきった位置、針は下がりきった位置で止める。 */
          .ocy-boatA, .ocy-boatC {
            transform: rotate(-6deg);
            transform-box: fill-box;
            transform-origin: 50% 100%;
          }
          .ocy-boatB, .ocy-boatD {
            transform: rotate(6deg);
            transform-box: fill-box;
            transform-origin: 50% 100%;
          }
          .ocy-palm {
            transform: rotate(9deg) skewX(6deg);
            transform-box: fill-box;
            transform-origin: 100% 100%;
          }
          /* 飛沫は岸壁を越えたところで止める(船の上に重ねない)。 */
          .ocy-spray {
            transform: translate(40px, 172px) scale(1);
            transform-box: fill-box;
            transform-origin: 50% 50%;
          }
          .ocy-spray2 {
            transform: translate(300px, 176px) scale(1);
            transform-box: fill-box;
            transform-origin: 50% 50%;
          }
        }
      `}</style>
    </svg>
  );
}
