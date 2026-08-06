/**
 * 1月。真夜中が世界を一周する。
 *
 * 地球の上を夜と昼の境が右から左へ渡っていき、通り過ぎた土地から順に
 * 花火が上がる。UTC+14の島で始まり、最後の海に届くまで26時間かかる。
 */
export function World09() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 宇宙 */}
      <rect width="400" height="210" fill="#141a30" />
      <g fill="#f6efe2" opacity="0.85">
        <circle cx="26" cy="26" r="1.6" />
        <circle cx="72" cy="52" r="1.2" />
        <circle cx="118" cy="18" r="1.4" />
        <circle cx="44" cy="92" r="1.2" />
        <circle cx="352" cy="30" r="1.8" />
        <circle cx="316" cy="66" r="1.2" />
        <circle cx="380" cy="102" r="1.4" />
        <circle cx="286" cy="20" r="1.2" />
        <circle cx="24" cy="150" r="1.4" />
        <circle cx="368" cy="164" r="1.6" />
        <circle cx="200" cy="14" r="1.2" />
        <circle cx="96" cy="182" r="1.2" />
        <circle cx="304" cy="192" r="1.4" />
      </g>

      {/* 地球 */}
      <circle cx="200" cy="112" r="88" fill="#2f6f9f" />
      <g fill="#3f8f5f">
        <path d="M138,66 c22,-8 40,-2 46,10 c-14,10 -34,12 -52,4z" />
        <path d="M150,96 c18,6 24,26 14,44 c-16,-6 -26,-26 -14,-44z" />
        <path d="M214,72 c26,-6 44,4 46,18 c-18,8 -40,6 -54,-4z" />
        <path d="M232,104 c22,0 34,16 30,36 c-20,2 -38,-14 -30,-36z" />
        <path d="M266,132 c14,-2 24,6 22,18 c-12,4 -24,-4 -22,-18z" />
        <path d="M126,120 c10,4 12,16 4,26 c-10,-4 -14,-18 -4,-26z" />
      </g>
      {/* 経線と緯線 */}
      <g fill="none" stroke="#8fc4e8" strokeWidth="1.4" opacity="0.45">
        <path d="M200,24 q-34,88 0,176 q34,-88 0,-176" />
        <path d="M200,24 q-64,88 0,176 q64,-88 0,-176" />
        <ellipse cx="200" cy="112" rx="88" ry="30" />
        <ellipse cx="200" cy="112" rx="76" ry="62" />
      </g>
      <path d="M112,112 L288,112" stroke="#f6efe2" strokeWidth="1.6" strokeDasharray="8 7" opacity="0.5" fill="none" />

      {/* 夜と昼の境。右から左へ渡っていく */}
      <clipPath id="w09-globe">
        <circle cx="200" cy="112" r="88" />
      </clipPath>
      <g clipPath="url(#w09-globe)">
        {/* 線の左側はまだ年が明けていない。線が渡るにつれて暗がりが引いていく */}
        <g className="w09-terminator">
          <rect x="-4" y="24" width="200" height="176" fill="#141a30" opacity="0.55" />
          <rect x="196" y="24" width="8" height="176" fill="#f5b31c" opacity="0.5" />
        </g>
      </g>

      {/* 通り過ぎたところから順に上がる花火 */}
      <g className="w09-firework w09-fw1" stroke="#f5b31c" strokeWidth="2.6" strokeLinecap="round" fill="none">
        <path d="M330,58 l0,-14 M330,58 l10,-10 M330,58 l14,0 M330,58 l10,10 M330,58 l0,14 M330,58 l-10,10 M330,58 l-14,0 M330,58 l-10,-10" />
      </g>
      <g className="w09-firework w09-fw2" stroke="#e8447a" strokeWidth="2.6" strokeLinecap="round" fill="none">
        <path d="M264,40 l0,-14 M264,40 l10,-10 M264,40 l14,0 M264,40 l10,10 M264,40 l0,14 M264,40 l-10,10 M264,40 l-14,0 M264,40 l-10,-10" />
      </g>
      <g className="w09-firework w09-fw3" stroke="#8fe8c8" strokeWidth="2.6" strokeLinecap="round" fill="none">
        <path d="M196,30 l0,-14 M196,30 l10,-10 M196,30 l14,0 M196,30 l10,10 M196,30 l0,14 M196,30 l-10,10 M196,30 l-14,0 M196,30 l-10,-10" />
      </g>
      <g className="w09-firework w09-fw4" stroke="#5b8fe8" strokeWidth="2.6" strokeLinecap="round" fill="none">
        <path d="M124,42 l0,-14 M124,42 l10,-10 M124,42 l14,0 M124,42 l10,10 M124,42 l0,14 M124,42 l-10,10 M124,42 l-14,0 M124,42 l-10,-10" />
      </g>
      <g className="w09-firework w09-fw5" stroke="#f6efe2" strokeWidth="2.6" strokeLinecap="round" fill="none">
        <path d="M64,64 l0,-12 M64,64 l9,-9 M64,64 l12,0 M64,64 l9,9 M64,64 l0,12 M64,64 l-9,9 M64,64 l-12,0 M64,64 l-9,-9" />
      </g>

      {/* 真っ先に年が明ける低い島 */}
      <g className="w09-island">
        <ellipse cx="336" cy="176" rx="34" ry="9" fill="#3f8f5f" />
        <path d="M332,176 c0,-9 1,-15 4,-20 l3,1 c-2,5 -3,11 -3,19z" fill="#6b5330" />
        <path d="M338,156 c-9,-3 -13,2 -14,7 c5,-5 9,-5 14,-2 c5,-3 10,-3 14,2 c-1,-5 -5,-10 -14,-7z" fill="#2f7d3f" />
        <ellipse cx="336" cy="186" rx="46" ry="7" fill="#2f6f9f" opacity="0.7" />
      </g>

      {/* 誰もが受け取る包み */}
      <g className="w09-gift">
        <rect x="46" y="164" width="34" height="26" rx="2" fill="#c93a3a" />
        <rect x="46" y="164" width="34" height="7" fill="#e8443f" />
        <rect x="59" y="164" width="8" height="26" fill="#f5b31c" />
        <path d="M63,164 c-8,-10 -16,-2 -6,4 M63,164 c8,-10 16,-2 6,4" stroke="#f5b31c" strokeWidth="3" fill="none" />
      </g>
      <g className="w09-gift w09-gf2">
        <rect x="94" y="176" width="26" height="20" rx="2" fill="#3f8f7a" />
        <rect x="94" y="176" width="26" height="6" fill="#4fa88f" />
        <rect x="104" y="176" width="6" height="20" fill="#f6efe2" />
      </g>

      <style>{`
        .w09-terminator {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: w09-sweep 12s linear infinite;
        }
        .w09-firework {
          transform-box: fill-box; transform-origin: center;
          animation: w09-pop 12s ease-out infinite;
          opacity: 0;
        }
        /* 境の線がその経度を通り過ぎた瞬間に上がるよう、遅延を位置に合わせてある */
        .w09-fw1 { animation-delay: -11.8s; }
        .w09-fw2 { animation-delay: -10.7s; }
        .w09-fw3 { animation-delay: -8s; }
        .w09-fw4 { animation-delay: -5s; }
        .w09-fw5 { animation-delay: -2.6s; }
        .w09-island {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: w09-bob 6s ease-in-out infinite;
        }
        .w09-gift {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: w09-shake 4.4s ease-in-out infinite;
        }
        .w09-gf2 { animation-delay: -2.2s; }
        @keyframes w09-sweep {
          0% { transform: translateX(96px); }
          100% { transform: translateX(-200px); }
        }
        @keyframes w09-pop {
          0% { transform: scale(0.2); opacity: 0; }
          3% { opacity: 1; }
          14% { opacity: 0.9; }
          22% { transform: scale(1.6); opacity: 0; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes w09-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes w09-shake {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .w09-terminator, .w09-firework, .w09-island, .w09-gift { animation: none; }
          .w09-firework { opacity: 1; }
        }
      `}</style>
    </svg>
  );
}
