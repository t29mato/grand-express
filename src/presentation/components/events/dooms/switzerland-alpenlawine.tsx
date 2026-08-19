/**
 * 雪崩が峠を埋める。安定して見えていた斜面がいっぺんに落ち、峠道は締まった雪と
 * 折れた松の下に数メートル埋もれた。対策班はその朝すでに予防発破をかけていた
 * ——だから誰も巻き込まれなかったが、道の再開通を待つ者の慰めにはならない。
 *
 * **ヨーロッパ盤の `lawine` と描き分ける。**あちらは昼の白い雪原に青い機関車が
 * 止まり、なめらかな雪の板が上から落ちてくる絵。こちらは
 *   ・列車を出さない(**峠の車道**の話にする)
 *   ・夕方の桃色の空と、青い影の雪にする
 *   ・雪をなめらかな板ではなく**角ばった塊の舌(デブリ)**にする
 *   ・**黒い舗装が、ある地点から先で雪の下に消えている**ことを構図の芯にする
 *   ・通行止めの遮断バーと橙の回転灯、折れた松、道路班2人を置く
 *   ・稜線に予防発破の煙を残す(「その朝すでに撃っていた」)
 *
 * 動くのは5つ: 雪煙、回転灯、破断面から続く二次的な雪の筋、折れた松、指さす腕。
 * 止めても「途中で消えている道路と、突き出した折れ松」で伝わる。
 */
export function SwitzerlandAlpenlawine() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夕方の空。ヨーロッパ盤の昼の青と変える。 */}
      <rect width="400" height="210" fill="#e8a888" />
      <rect width="400" height="80" fill="#8a90b0" />
      <rect width="400" height="40" fill="#6d7396" />
      <circle cx="46" cy="66" r="14" fill="#f5c07a" opacity="0.9" />
      <g fill="#c98f86" opacity="0.5">
        <ellipse cx="150" cy="34" rx="54" ry="7" />
        <ellipse cx="310" cy="26" rx="44" ry="6" />
      </g>

      {/* 稜線。**雪が抜けた破断面**が上に残っている。 */}
      <path d="M0,116L60,54L112,90L178,38L248,88L314,48L400,104V210H0z" fill="#6a7186" />
      <path d="M178,38l38,32l-13,-2l-10,6l-9,-7l-10,5z" fill="#e6ecf2" />
      <path d="M60,54l24,22l-9,-1l-7,5l-6,-5l-8,4z" fill="#e6ecf2" />
      <path d="M314,48l28,26l-10,-2l-8,5l-7,-5l-9,4z" fill="#e6ecf2" />
      <path d="M140,74q60,-18 128,10" stroke="#f4f8fc" strokeWidth="5" fill="none" />
      <path d="M140,74q60,-18 128,10" stroke="#8f96ac" strokeWidth="1.6" fill="none" />

      {/* 予防発破の名残の煙。 */}
      <g className="cha-shot" fill="#e2d8e0" opacity="0.5">
        <ellipse cx="272" cy="62" rx="15" ry="7" />
        <ellipse cx="288" cy="52" rx="10" ry="5" />
      </g>

      {/* 上の雪原と、破断面から流れ続ける二次的な筋。 */}
      <path d="M0,116q80,-14 168,0q92,15 232,-12v34H0z" fill="#dfe6f2" />
      <g className="cha-trickle" stroke="#f6fafd" strokeWidth="3" opacity="0.9" fill="none">
        <path d="M186,86q10,20 6,36M234,90q6,18 14,32M158,88q-4,18 -2,32" />
      </g>

      {/* 峠の車道。**黒い舗装。**ここが構図の芯。 */}
      <rect y="170" width="400" height="24" fill="#4a4f52" />
      <rect y="168" width="400" height="4" fill="#5f6568" />
      <rect y="194" width="400" height="16" fill="#6b6f66" />
      <g stroke="#e8e2c8" strokeWidth="3" strokeDasharray="15 13" opacity="0.85" fill="none">
        <path d="M0,182h132" />
      </g>
      <g fill="#8f8a7c">
        <rect x="10" y="164" width="4" height="8" />
        <rect x="52" y="164" width="4" height="8" />
        <rect x="94" y="164" width="4" height="8" />
      </g>

      {/* **雪崩のデブリの舌。**右上から流れ落ち、道を途中から呑み込んでいる。 */}
      <path d="M126,196q6,-34 46,-52q52,-24 100,-42q56,-20 128,-32v126z" fill="#e8eef8" />
      <path d="M126,196q6,-34 46,-52q52,-24 100,-42q56,-20 128,-32v14q-70,12 -122,32q-52,20 -98,44q-34,18 -38,36z" fill="#f6fafd" />
      <g fill="#cbd6e8">
        <path d="M176,142l26,-10l14,16l-26,12z" />
        <path d="M234,116l28,-10l12,16l-28,12z" />
        <path d="M296,92l26,-8l12,14l-28,12z" />
        <path d="M152,176l24,-10l12,14l-26,12z" />
        <path d="M348,74l24,-6l10,12l-26,10z" />
      </g>
      <g fill="#f8fbfe">
        <path d="M202,132l20,-8l10,12l-22,10z" />
        <path d="M262,106l20,-8l10,12l-22,10z" />
        <path d="M176,166l18,-8l10,12l-20,10z" />
        <path d="M322,82l18,-6l10,12l-20,8z" />
      </g>
      {/* 舗装の上へこぼれた塊。**道はここから先が無い。** */}
      <g fill="#f2f6fd">
        <path d="M112,196l14,-16l16,10l-6,16l-24,2z" />
        <path d="M96,200l12,-10l12,8l-4,12h-20z" />
        <path d="M132,178l14,-10l12,10l-8,12l-18,-2z" />
      </g>
      <g fill="#b8c4da">
        <path d="M126,180l16,10l-6,16l-10,-4zM108,190l12,8l-4,12l-8,-2z" />
      </g>

      {/* 折れた松。デブリから斜めに突き出している。 */}
      <g className="cha-pine">
        <path d="M148,176l40,-40l8,7l-40,40z" fill="#5a4630" />
        <path d="M186,144l-8,-14l14,2l-6,-14l14,8l-2,-14l14,18z" fill="#25402f" />
        <path d="M170,160l-16,-4l6,12l-16,0l10,10l-14,4l20,4z" fill="#25402f" />
      </g>
      <g>
        <path d="M296,132l30,-20l6,8l-30,20z" fill="#6b5330" />
        <path d="M324,116l14,-8l-2,13l13,-5l-6,14l-19,-6z" fill="#25402f" />
      </g>

      {/* 通行止めの遮断バーと回転灯。舗装が残っている側に立っている。 */}
      <g>
        <rect x="56" y="132" width="6" height="42" fill="#3f454c" />
        <rect x="44" y="172" width="30" height="6" rx="2" fill="#3f454c" />
        <path d="M62,140h76v11H62z" fill="#f2ede0" />
        <g fill="#c2453c">
          <path d="M62,140h19v11H62zM100,140h19v11h-19z" />
        </g>
        <rect x="52" y="122" width="14" height="10" rx="3" fill="#4a4f56" />
        <circle className="cha-beacon" cx="59" cy="126" r="5" fill="#f5a11c" />
      </g>

      {/* 道路班2人。青い作業着。ひとりが雪崩探査棒で埋まった先を指す。 */}
      <g transform="translate(22,0)">
        <ellipse cx="0" cy="180" rx="12" ry="3.6" fill="#000" opacity="0.24" />
        <path d="M-5,180l-2,-20h13l-2,20z" fill="#2f3648" />
        <path d="M-9,160q0,-17 9,-17q9,0 9,17z" fill="#2f4a7a" />
        <path d="M-9,152h18" stroke="#f5a11c" strokeWidth="3.4" fill="none" />
        <circle cx="0" cy="136" r="8" fill="#e0b48a" />
        <path d="M-9,134q1,-10 9,-10q8,0 9,10z" fill="#c2453c" />
        <g className="cha-point">
          <path d="M2,148l16,-6" stroke="#e0b48a" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M14,144l44,-16" stroke="#d8d4c8" strokeWidth="3" strokeLinecap="round" fill="none" />
        </g>
      </g>
      <g transform="translate(84,0)">
        <ellipse cx="0" cy="186" rx="11" ry="3.4" fill="#000" opacity="0.24" />
        <path d="M-5,186l-2,-18h12l-2,18z" fill="#2f3648" />
        <path d="M-8,168q-1,-16 8,-16q9,0 8,16z" fill="#3f5f8f" />
        <circle cx="0" cy="144" r="7.4" fill="#c99a70" />
        <path d="M-8,143q1,-9 8,-9q7,0 8,9z" fill="#f5a11c" />
        <path d="M-3,156l-12,4" stroke="#c99a70" strokeWidth="4.4" strokeLinecap="round" fill="none" />
        <path d="M3,156l10,6" stroke="#c99a70" strokeWidth="4.4" strokeLinecap="round" fill="none" />
      </g>

      {/* デブリの舌の上に立つ雪煙。**まだ落ち着いていない。** */}
      <g className="cha-plume" fill="#f6fafe" opacity="0.5">
        <ellipse cx="230" cy="112" rx="70" ry="14" />
        <ellipse cx="330" cy="86" rx="54" ry="11" />
        <ellipse cx="168" cy="146" rx="46" ry="10" />
      </g>

      <style>{`
        .cha-plume {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: cha-billow 5.4s ease-in-out infinite;
        }
        @keyframes cha-billow {
          0%, 100% { transform: translate(0, 6px) scale(0.86, 0.7); opacity: 0.18; }
          45%      { transform: translate(-12px, -10px) scale(1.08, 1.14); opacity: 0.55; }
        }
        .cha-trickle {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: cha-run 3.2s linear infinite;
        }
        @keyframes cha-run {
          0%   { transform: translateY(-14px); opacity: 0; }
          30%  { opacity: 0.9; }
          100% { transform: translateY(44px); opacity: 0; }
        }
        .cha-shot {
          transform-box: fill-box;
          transform-origin: 0% 100%;
          animation: cha-drift 7s ease-out infinite;
        }
        @keyframes cha-drift {
          0%   { transform: translate(0, 0) scale(0.7); opacity: 0.55; }
          100% { transform: translate(26px, -16px) scale(1.3); opacity: 0; }
        }
        .cha-beacon { animation: cha-flash 1.1s steps(1, end) infinite; }
        @keyframes cha-flash {
          0%, 45%   { opacity: 1; }
          46%, 100% { opacity: 0.25; }
        }
        .cha-pine {
          transform-box: fill-box;
          transform-origin: 8% 100%;
          animation: cha-lean 4.6s ease-in-out infinite;
        }
        @keyframes cha-lean {
          0%, 100% { transform: rotate(0deg); }
          50%      { transform: rotate(2.6deg); }
        }
        .cha-point {
          transform-box: fill-box;
          transform-origin: 0% 80%;
          animation: cha-aim 4s ease-in-out infinite;
        }
        @keyframes cha-aim {
          0%, 100% { transform: rotate(0deg); }
          50%      { transform: rotate(-7deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .cha-plume, .cha-trickle, .cha-shot,
          .cha-beacon, .cha-pine, .cha-point { animation: none; }
          .cha-plume { transform: translate(-8px, -6px); opacity: 0.4; }
          .cha-shot { opacity: 0.4; }
        }
      `}</style>
    </svg>
  );
}
