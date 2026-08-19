/**
 * ファルーカ船頭の遠回り。今日は直行の水路が他の船でふさがっているのだと
 * 船頭は言い張り、川岸の余分な曲がり角を二つも回ってから対岸へ着く。
 * この遠回りは、外国からの客が乗っている日に限って起きるようだ。
 *
 * 構図: 対岸へ渡るだけの短い直線(点線)と、実際にたどっている**大きく膨らんだ航跡**を
 * 並べて置く。船頭は艫に立って「ふさがっている」と直行の側を指さし、
 * 客2人は日除け帽と写真機を持って、まだ着かない対岸を見ている。
 *
 * 左の葦の茂みには**ナダーハの気配**だけを置く。これは「呼ぶ女」の言い伝えで、
 * 姿を見た者は戻らないとされる話なので、**姿をはっきり描かない。**
 * 後ろ向きの淡い輪郭と、水面に広がる波紋だけにしてある。
 * 手を伸ばす・引き込むといった場面は描かない。
 *
 * 動くのは4つ: 帆の揺れ、船が航跡の上をゆっくり進む、葦の揺れ、
 * 葦のそばに広がる波紋。止めても「短い直線と、大きく遠回りした航跡」で伝わる。
 */
export function EgyptScenicroute() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 昼のナイル。 */}
      <rect width="400" height="210" fill="#3f7f9f" />
      <rect width="400" height="76" fill="#9fc8e4" />
      <rect width="400" height="30" fill="#c9dcea" />
      <circle cx="330" cy="26" r="16" fill="#f4dca6" />

      {/* 対岸。着くはずだった側。 */}
      <rect y="76" width="400" height="18" fill="#c9a877" />
      <rect y="76" width="400" height="6" fill="#d8bb8c" />
      <g fill="#a98a60">
        <rect x="250" y="62" width="26" height="14" />
        <rect x="282" y="66" width="20" height="10" />
      </g>
      <g stroke="#4f7a4a" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M320,76 v-16 M320,60 q-11,-5 -17,1 M320,60 q11,-5 17,1 M320,60 q-8,-10 -15,-9 M320,60 q8,-10 15,-9" />
      </g>
      <rect x="242" y="88" width="70" height="6" fill="#8a6a46" />

      {/* 手前の岸。ここから出た。 */}
      <rect y="188" width="400" height="22" fill="#c9a877" />
      <path d="M0,188 q90,-6 180,1 t220,-1 v6 H0z" fill="#d8bb8c" />
      <rect x="96" y="182" width="60" height="6" fill="#8a6a46" />

      {/* 川面。 */}
      <g stroke="#8fd0dc" strokeWidth="2" fill="none" opacity="0.4">
        <path d="M300,110 h70 M340,168 h54 M20,178 h44" />
      </g>

      {/* 本当ならこれで済んだ、真っ直ぐの短い道。 */}
      <g
        stroke="#dff0f4"
        strokeWidth="3"
        strokeDasharray="7 9"
        fill="none"
        opacity="0.75"
      >
        <path d="M126,182 L272,94" />
      </g>
      {/* 「ふさがっている」ことになっている一艘。 */}
      <g opacity="0.9">
        <path d="M196,132 h30 l-4,6 h-22z" fill="#5a4a38" />
        <rect x="209" y="120" width="2" height="12" fill="#6b5330" />
        <path d="M211,120 l10,12 h-10z" fill="#e2dac6" />
      </g>

      {/* 実際にたどっている遠回りの航跡。**止めても残る主役。** */}
      <path
        d="M126,184 q-96,-16 -100,-58 q-3,-38 74,-46 q76,-8 108,-4"
        fill="none"
        stroke="#dff0f4"
        strokeWidth="4"
        opacity="0.85"
        strokeLinecap="round"
      />
      <path d="M206,74 l14,3 -13,7z" fill="#dff0f4" opacity="0.85" />

      {/* 右手の葦の茂み。ナダーハの気配はここにだけ置く。
       **気配を先に描いて葦で半分隠す。**姿がはっきり見えないほうが、この話には合う。 */}
      <g opacity="0.28">
        <path
          d="M352,190 q-9,-22 -1,-32 q9,-6 16,2 q6,13 -1,30z"
          fill="#e8eef0"
        />
        <ellipse cx="359" cy="156" rx="7" ry="8" fill="#e8eef0" />
      </g>
      <g
        className="egypt-sc-reeds"
        stroke="#4f7a4a"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      >
        <path d="M332,192 q-5,-26 -1,-42 M346,194 q3,-28 9,-42 M362,192 q-4,-24 0,-38 M378,194 q5,-24 11,-36 M392,192 q-3,-22 1,-34" />
      </g>
      <g fill="#3f6a3f">
        <ellipse cx="331" cy="150" rx="3" ry="7" />
        <ellipse cx="355" cy="152" rx="3" ry="7" />
        <ellipse cx="389" cy="158" rx="2.6" ry="6" />
      </g>
      {/* 水面に広がる波紋。誰が立てたのかは描かない。 */}
      <g
        className="egypt-sc-ripple"
        fill="none"
        stroke="#dff0f4"
        strokeWidth="2"
      >
        <ellipse cx="358" cy="186" rx="16" ry="5" />
        <ellipse cx="358" cy="186" rx="28" ry="9" opacity="0.6" />
      </g>

      {/* 遠回り中のファルーカ。航跡のいちばん膨らんだあたりにいる。 */}
      <g className="egypt-sc-boat">
        <g transform="translate(52,0)">
          <path
            d="M-34,120 q34,14 68,0 q-8,12 -34,12 q-26,0 -34,-12z"
            fill="#5a4a38"
          />
          <rect x="-2" y="70" width="3" height="50" fill="#6b5330" />
          <g className="egypt-sc-sail">
            <path d="M1,70 L36,118 H1z" fill="#f2ece0" />
            <path d="M-2,76 L-26,118 h24z" fill="#e2dac6" />
          </g>
          {/* 客2人。日除け帽と写真機。 */}
          <g transform="translate(-18,0)">
            <circle cx="0" cy="106" r="6" fill="#7a5a3c" />
            <ellipse cx="0" cy="100" rx="10" ry="3" fill="#efe5cd" />
            <path d="M-5,112 q-2,7 -1,10 h11 q-2,-8 -2,-10z" fill="#c94f3c" />
          </g>
          <g transform="translate(-2,0)">
            <circle cx="0" cy="108" r="5.6" fill="#6d5238" />
            <path d="M-5,114 q-2,6 -1,9 h10 q-2,-7 -2,-9z" fill="#3f9f7f" />
            <rect x="3" y="106" width="8" height="6" rx="1.4" fill="#3a3a3e" />
          </g>
          {/* 船頭。艫に立って、直行の側を指さす。 */}
          <g transform="translate(24,0)">
            <circle cx="0" cy="98" r="6.4" fill="#6d5238" />
            <path d="M-6,106 q-3,12 -1,18 h13 q-3,-13 -3,-18z" fill="#f2ece0" />
            <path
              d="M4,110 q14,-4 22,-12"
              stroke="#6d5238"
              strokeWidth="4.4"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        </g>
      </g>

      <style>{`
        .egypt-sc-boat {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: egypt-sc-drift 7.5s ease-in-out infinite;
        }
        @keyframes egypt-sc-drift {
          0%, 100% { transform: translate(0, 0) rotate(-1.5deg); }
          50% { transform: translate(26px, -14px) rotate(1.5deg); }
        }
        .egypt-sc-sail {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: egypt-sc-luff 2.8s ease-in-out infinite;
        }
        @keyframes egypt-sc-luff {
          0%, 100% { transform: skewX(0deg); }
          50% { transform: skewX(-5deg) scaleX(0.94); }
        }
        .egypt-sc-reeds {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: egypt-sc-sway 3.2s ease-in-out infinite;
        }
        @keyframes egypt-sc-sway {
          0%, 100% { transform: skewX(0deg); }
          50% { transform: skewX(5deg); }
        }
        .egypt-sc-ripple {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: egypt-sc-spread 4.6s ease-out infinite;
        }
        @keyframes egypt-sc-spread {
          0% { transform: scale(0.35); opacity: 0.9; }
          100% { transform: scale(1.35); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .egypt-sc-boat,
          .egypt-sc-sail,
          .egypt-sc-reeds,
          .egypt-sc-ripple { animation: none; }
        }
      `}</style>
    </svg>
  );
}
