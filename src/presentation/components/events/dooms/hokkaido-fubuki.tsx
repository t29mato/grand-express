/**
 * 地吹雪でホワイトアウト。
 *
 * 本文の芯は3つ。**積もった雪が舞い上がること・道と側溝と空が同じ色になること・
 * 地元の運転手は白線を信じず路肩に停めて待つこと。**
 *
 * 同じ盤面の雪の絵が3枚あるので、ここは **白一色・動きは水平・人は外に出ない**
 * に振り分けた(`ryuuhyou-doom` は白い板と橙の船、`kion-ranteika` は茶色)。
 *
 * 白と淡い青しか無い画面なので、**北海道の道路の赤い矢羽根(固定式視線誘導柱)**
 * で輪郭を作っている。これが無いと、止めた状態でただの白い長方形になる。
 *
 * 動くのは**横に流れる雪の層3枚・ハザードランプ・矢羽根の先で巻く雪**だけ。
 * 止めた状態でも、路肩に寄って停まった車と、道を消しかけている雪で分かる。
 */
export function HokkaidoFubuki() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 空と道と側溝が同じ色になる。**帯の境目をわざと曖昧にする。** */}
      <rect width="400" height="210" fill="#e8eef3" />
      <rect width="400" height="96" fill="#dde5ec" />
      <rect y="96" width="400" height="26" fill="#e2e9ef" />

      {/* 中景。防雪林と電柱が、かろうじて残る。**低い明度差でしか描かない。** */}
      <g fill="#c6d3dc" opacity="0.75">
        <path d="M18,120l7,-22 7,22z" />
        <path d="M40,120l6,-18 6,18z" />
        <path d="M62,120l7,-21 7,21z" />
        <path d="M300,120l6,-17 6,17z" />
        <path d="M322,120l7,-22 7,22z" />
        <path d="M346,120l6,-19 6,19z" />
        <path d="M370,120l7,-21 7,21z" />
      </g>
      <g fill="#cfdae2">
        <rect x="112" y="86" width="4" height="36" />
        <rect x="104" y="90" width="20" height="2.6" />
        <rect x="256" y="94" width="3.4" height="28" />
        <rect x="249" y="97" width="17" height="2.2" />
      </g>

      {/* 路面。白線はもう見えない(かろうじて跡だけ)。 */}
      <rect y="122" width="400" height="88" fill="#e4ebf1" />
      <path d="M0,140h400v6H0z" fill="#dae3ea" />
      <g fill="#eef4f8" opacity="0.7">
        <rect x="24" y="168" width="34" height="4" />
        <rect x="96" y="168" width="34" height="4" />
        <rect x="168" y="168" width="34" height="4" />
        <rect x="240" y="168" width="34" height="4" />
        <rect x="312" y="168" width="34" height="4" />
      </g>

      {/* 側溝との境。**吹きだまりが道を食べ始めている。** */}
      <path d="M0,146q54,-9 108,-2q66,9 128,1q78,-8 164,3v12H0z" fill="#dde6ed" />
      <path d="M0,196q70,-12 148,-3q84,10 252,-5v22H0z" fill="#eff5f9" />

      {/* 矢羽根(固定式視線誘導柱)。**この絵で唯一の強い色。** */}
      <g>
        <g fill="#cfd8e0">
          <rect x="46" y="104" width="4" height="48" />
          <rect x="150" y="100" width="4.4" height="52" />
          <rect x="286" y="98" width="4.6" height="56" />
          <rect x="378" y="96" width="5" height="60" />
        </g>
        <g fill="#d8443c">
          <path d="M38,106h20l-10,9z" />
          <path d="M38,116h20l-10,9z" />
          <path d="M141,102h22l-11,10z" />
          <path d="M141,113h22l-11,10z" />
          <path d="M276,100h24l-12,11z" />
          <path d="M276,112h24l-12,11z" />
          <path d="M367,98h26l-13,12z" />
          <path d="M367,111h26l-13,12z" />
        </g>
      </g>

      {/* 路肩に寄せて停めた車。**エンジンは掛かったまま、人は降りない。** */}
      <g>
        <ellipse cx="196" cy="186" rx="76" ry="8" fill="#8fa2b0" opacity="0.35" />
        <path d="M132,176V158q0,-6 8,-6h20l14,-18h44l10,18h18q8,0 8,7v17z" fill="#2f4256" />
        <path d="M132,176v-8h122v8z" fill="#22303f" />
        <path d="M162,152l12,-15h34l8,15z" fill="#9fb4c4" />
        <path d="M176,150l8,-11h20l6,11z" fill="#5f7386" />
        {/* 運転席の人影。**外には出ない。** */}
        <path d="M186,150v-7a5,5 0 0 1 10,0v7z" fill="#33404e" />
        <circle cx="191" cy="141" r="4" fill="#33404e" />
        <g fill="#1c2733">
          <circle cx="156" cy="176" r="9" />
          <circle cx="232" cy="176" r="9" />
        </g>
        <g fill="#7a8794">
          <circle cx="156" cy="176" r="3.4" />
          <circle cx="232" cy="176" r="3.4" />
        </g>
        {/* 車の風下側に付く雪。 */}
        <path d="M132,176q-14,-4 -20,4h20z" fill="#f2f7fa" />
        <path d="M254,176q16,-3 24,4h-24z" fill="#f2f7fa" />
      </g>

      {/* ハザード。**左右が交互に光る。** */}
      <g className="hkf-hazard-l">
        <rect x="128" y="160" width="9" height="7" rx="2" fill="#f5a81c" />
        <circle cx="132" cy="163" r="12" fill="#f5a81c" opacity="0.22" />
      </g>
      <g className="hkf-hazard-r">
        <rect x="250" y="160" width="9" height="7" rx="2" fill="#f5a81c" />
        <circle cx="254" cy="163" r="12" fill="#f5a81c" opacity="0.22" />
      </g>

      {/* 地吹雪。**3層を別々の速さで横に流す。**手前ほど速く濃い。 */}
      <g className="hkf-blow1" fill="#f6fafc" opacity="0.85">
        <path d="M-60,132h84l-16,5h-84z" />
        <path d="M60,120h64l-13,4H47z" />
        <path d="M200,138h96l-18,5h-96z" />
        <path d="M330,126h70l-14,4h-70z" />
        <path d="M-20,150h58l-11,4h-58z" />
      </g>
      <g className="hkf-blow2" fill="#ffffff" opacity="0.95">
        <path d="M-40,164h110l-20,6H-60z" />
        <path d="M120,180h130l-24,7H96z" />
        <path d="M280,158h120l-22,6H258z" />
        <path d="M40,198h150l-28,8H12z" />
      </g>
      <g className="hkf-blow3" fill="#ffffff">
        <ellipse cx="60" cy="190" rx="60" ry="7" opacity="0.9" />
        <ellipse cx="230" cy="204" rx="80" ry="8" opacity="0.85" />
        <ellipse cx="350" cy="176" rx="52" ry="6" opacity="0.8" />
      </g>

      {/* 矢羽根の先で巻き上がる雪。**風向きが見える。** */}
      <g className="hkf-curl" fill="#ffffff" opacity="0.9">
        <path d="M300,116q16,-8 30,-2q-14,2 -30,2z" />
        <path d="M164,118q14,-7 26,-2q-12,2 -26,2z" />
      </g>

      <style>{`
        .hkf-blow1 { animation: hkf-drift1 2.6s linear infinite; }
        @keyframes hkf-drift1 {
          from { transform: translateX(0); }
          to   { transform: translateX(120px); }
        }
        .hkf-blow2 { animation: hkf-drift2 1.7s linear infinite; }
        @keyframes hkf-drift2 {
          from { transform: translateX(0); }
          to   { transform: translateX(160px); }
        }
        .hkf-blow3 { animation: hkf-drift3 1.1s linear infinite; }
        @keyframes hkf-drift3 {
          0%   { transform: translateX(-40px) scaleY(0.8); opacity: 0.5; }
          50%  { transform: translateX(40px) scaleY(1.15); opacity: 1; }
          100% { transform: translateX(120px) scaleY(0.8); opacity: 0.4; }
        }
        .hkf-curl {
          transform-box: fill-box;
          transform-origin: 0% 100%;
          animation: hkf-swirl 2.2s ease-in-out infinite;
        }
        @keyframes hkf-swirl {
          0%, 100% { transform: translateX(0) scaleX(0.7); opacity: 0.5; }
          50%      { transform: translateX(18px) scaleX(1.2); opacity: 1; }
        }
        .hkf-hazard-l { animation: hkf-blink 1.1s steps(1, end) infinite; }
        .hkf-hazard-r { animation: hkf-blink 1.1s steps(1, end) infinite; }
        @keyframes hkf-blink {
          0%, 49%   { opacity: 1; }
          50%, 100% { opacity: 0.28; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hkf-blow1, .hkf-blow2, .hkf-blow3, .hkf-curl,
          .hkf-hazard-l, .hkf-hazard-r { animation: none; }
          .hkf-blow3 { transform: translateX(40px); }
          .hkf-hazard-r { opacity: 0.28; }
        }
      `}</style>
    </svg>
  );
}
