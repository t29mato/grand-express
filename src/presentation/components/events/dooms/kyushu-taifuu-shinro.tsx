/**
 * 台風が夜のうちに進路を変える。予報進路は80kmも外れ、沖にとどまるはずだった側が
 * 上陸した。日本に来る台風の多くは九州に最初に上陸する。
 *
 * 夜。**上半分が進路図、下半分がその下の家**という俯瞰。人は出さない。
 * 動くのは、回る渦・進んでいく実際の進路・めくれる屋根。
 */
export function KyushuTaifuuShinro() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜の海と空。 */}
      <rect width="400" height="210" fill="#1e2a36" />
      <rect y="0" width="400" height="112" fill="#26364a" />
      <rect y="96" width="400" height="20" fill="#2c405a" />

      {/* 海の上の等圧線(進路図としての面)。 */}
      <g stroke="#3d5570" strokeWidth="1.6" fill="none" opacity="0.9">
        <path d="M-20,26q120,-16 240,0t200,10" />
        <path d="M-20,52q120,-16 240,0t200,10" />
        <path d="M-20,80q120,-16 240,0t200,10" />
      </g>

      {/* 九州の輪郭(俯瞰。海に浮かぶ島影として)。 */}
      <path
        d="M96,116q22,-26 62,-24q26,1 40,14q28,-8 48,10q18,16 6,40q-10,20 -36,26q-30,7 -62,-6q-34,-14 -50,-38q-12,-16 -8,-22z"
        fill="#2f4a3a"
      />
      <path
        d="M96,116q22,-26 62,-24q26,1 40,14q-46,-4 -76,12q-18,9 -26,-2z"
        fill="#3a5a45"
      />
      <g fill="#f5b31c" opacity="0.7">
        <circle cx="140" cy="126" r="1.8" />
        <circle cx="176" cy="140" r="1.6" />
        <circle cx="210" cy="128" r="1.7" />
        <circle cx="196" cy="164" r="1.6" />
        <circle cx="152" cy="156" r="1.5" />
      </g>

      {/* 予報していた進路(沖にそれるはずだった破線)。 */}
      <path
        d="M356,196q-40,-30 -52,-70q-10,-34 8,-70"
        stroke="#8fa8c4"
        strokeWidth="2.4"
        strokeDasharray="8 8"
        opacity="0.75"
        fill="none"
      />
      <g fill="#8fa8c4" opacity="0.6">
        <circle cx="336" cy="176" r="4" />
        <circle cx="312" cy="138" r="4" />
        <circle cx="302" cy="98" r="4" />
      </g>

      {/* 実際に来た進路(実線)。**破線が進んでいく。** */}
      <path
        d="M356,196q-58,-26 -102,-62q-42,-34 -72,-72"
        stroke="#e8443f"
        strokeWidth="3"
        fill="none"
        opacity="0.9"
      />
      <path
        className="kts-track"
        d="M356,196q-58,-26 -102,-62q-42,-34 -72,-72"
        stroke="#f8e2a0"
        strokeWidth="3"
        strokeDasharray="10 14"
        fill="none"
      />
      <g fill="#e8443f">
        <circle cx="312" cy="168" r="4.4" />
        <circle cx="256" cy="134" r="4.4" />
        <circle cx="212" cy="98" r="4.4" />
      </g>

      {/* 台風の渦。**回る。** */}
      <g className="kts-eye">
        <circle cx="182" cy="62" r="44" fill="#3d5570" opacity="0.55" />
        {/* 外側の雲の帯。渦が扇に見えないようにする。 */}
        <g fill="#8fa8c4" opacity="0.5">
          <ellipse cx="182" cy="24" rx="34" ry="10" />
          <ellipse cx="216" cy="88" rx="30" ry="9" />
          <ellipse cx="142" cy="94" rx="28" ry="9" />
          <ellipse cx="228" cy="38" rx="24" ry="8" />
        </g>
        <path
          d="M182,62q-6,-36 -32,-36q26,-10 42,14q10,-30 36,-22q-24,6 -22,32q28,-12 40,10q-24,-14 -44,4q22,20 4,40q10,-26 -16,-32q-8,32 -34,30q26,-8 26,-40z"
          fill="#c8d8e4"
          opacity="0.92"
        />
        <circle cx="182" cy="62" r="8" fill="#26364a" />
        <circle cx="182" cy="62" r="4.4" fill="#1e2a36" />
      </g>

      {/* 手前の家。夜、屋根がめくれている。 */}
      <rect y="150" width="400" height="60" fill="#26332a" />
      <rect y="150" width="400" height="6" fill="#2f402f" />
      <g fill="#c9c4b2">
        <rect x="16" y="168" width="76" height="42" />
        <rect x="296" y="176" width="70" height="34" />
      </g>
      <g fill="#39424b">
        <path d="M8,168h92l-14,-18H22z" />
        <path d="M288,176h86l-13,-16h-60z" />
      </g>
      <g fill="#f5b31c" opacity="0.85">
        <rect x="26" y="178" width="14" height="12" />
        <rect x="66" y="178" width="14" height="12" />
        <rect x="306" y="186" width="13" height="11" />
        <rect x="342" y="186" width="13" height="11" />
      </g>
      {/* めくれた屋根の一枚。**あおられる。** */}
      <g className="kts-roof">
        <path d="M84,150h34l-8,-14H80z" fill="#4a545e" />
        <path d="M84,150h34l-2,-3H82z" fill="#5f6a74" />
      </g>
      {/* 飛ばされた瓦。 */}
      <g className="kts-tile" fill="#4a545e">
        <rect x="0" y="0" width="14" height="5" rx="1.6" />
        <rect x="20" y="8" width="11" height="4" rx="1.4" />
      </g>

      {/* 傾いた木。 */}
      <g>
        <path
          d="M212,210q-6,-22 8,-34"
          stroke="#4a3a28"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />
        <g className="kts-tree" fill="#2f5a3a">
          <ellipse cx="228" cy="172" rx="20" ry="7" />
          <ellipse cx="214" cy="182" rx="15" ry="5.4" />
          <ellipse cx="242" cy="182" rx="14" ry="5" />
        </g>
      </g>

      {/* 吹きつける雨。 */}
      <g
        className="kts-rain"
        stroke="#8fa8c4"
        strokeWidth="1.6"
        opacity="0.5"
        strokeLinecap="round"
        fill="none"
      >
        <path d="M20,120l-16,18M70,112l-16,18M120,124l-16,18M170,116l-16,18M220,128l-16,18M270,118l-16,18M320,130l-16,18M370,120l-16,18" />
        <path d="M44,152l-16,18M94,144l-16,18M144,156l-16,18M194,148l-16,18M244,160l-16,18M294,150l-16,18M344,162l-16,18M394,152l-16,18" />
      </g>

      <style>{`
        .kts-eye {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: kts-spin 9s linear infinite;
        }
        @keyframes kts-spin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .kts-track { animation: kts-march 1.4s linear infinite; }
        @keyframes kts-march {
          0%   { stroke-dashoffset: 48; }
          100% { stroke-dashoffset: 0; }
        }
        .kts-roof {
          transform-box: fill-box;
          transform-origin: 0% 100%;
          animation: kts-lift 2.8s ease-in-out infinite;
        }
        @keyframes kts-lift {
          0%, 100% { transform: rotate(0deg); }
          45%      { transform: rotate(-16deg) translateY(-4px); }
        }
        .kts-tile {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: kts-fly 3.4s linear infinite;
        }
        @keyframes kts-fly {
          0%   { transform: translate(118px, 140px) rotate(0deg); opacity: 0; }
          15%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translate(268px, 96px) rotate(220deg); opacity: 0; }
        }
        .kts-tree {
          transform-box: fill-box;
          transform-origin: 0% 100%;
          animation: kts-bend 2.2s ease-in-out infinite;
        }
        @keyframes kts-bend {
          0%, 100% { transform: rotate(-4deg); }
          50%      { transform: rotate(10deg); }
        }
        .kts-rain {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: kts-blow 0.7s linear infinite;
        }
        @keyframes kts-blow {
          0%   { transform: translate(0, 0); }
          100% { transform: translate(-32px, 36px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .kts-eye, .kts-track, .kts-roof, .kts-tile, .kts-tree, .kts-rain { animation: none; }
          .kts-roof { transform: rotate(-14deg) translateY(-4px); transform-box: fill-box; transform-origin: 0% 100%; }
          .kts-tile { transform: translate(190px, 118px) rotate(120deg); transform-box: fill-box; opacity: 1; }
          .kts-tree { transform: rotate(9deg); transform-box: fill-box; transform-origin: 0% 100%; }
        }
      `}</style>
    </svg>
  );
}
