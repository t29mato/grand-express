/**
 * ハイフェルトの雷雨で切通しが冠水する。晴れた朝から積乱雲が育ち、
 * 四時にはじけて20分で排水の設計量を超える——毎年繰り返す、既知の型の災難。
 *
 * 構図: **切通しの中を、正面から見ている。**左右に土の壁がそそり立ち、
 * その底の線路が茶色い水に沈んでいる。水位はもう車軸の高さで、
 * 保線用のトロリーが浸かって動かない。壁の排水口からは水が噴き出している。
 * 切通しの縁では、高視認ベストの保線員が検測棒で深さを測っている。
 * 上には、積乱雲の頭だけが白く光っている。
 *
 * 動くのは5つ: 降りしきる雨、稲光、水面のうねり、排水口の吐き出し、
 * 水に浮かんで回る枝。
 * 止めた状態でも「切通しの底が水に沈み、トロリーが浸かっている」で伝わる。
 *
 * (アフリカ大陸盤の洗掘とは別物にする: あちらは**川沿い・土手が抉れ・枕木が宙吊り**。
 *  こちらは**両側が壁の切通し・水が溜まって出口が無い**。人もいる)
 */
export function SouthafricaHighveldStormCutting() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 嵐の空。頭だけ白く光る積乱雲。 */}
      <rect width="400" height="210" fill="#4b5364" />
      <rect width="400" height="46" fill="#3d4453" />
      <g fill="#c8ccd2" opacity="0.9">
        <ellipse cx="150" cy="22" rx="62" ry="20" />
        <ellipse cx="238" cy="16" rx="48" ry="15" />
      </g>
      <g fill="#8f96a2" opacity="0.95">
        <ellipse cx="120" cy="42" rx="66" ry="20" />
        <ellipse cx="232" cy="46" rx="76" ry="22" />
        <ellipse cx="330" cy="38" rx="52" ry="18" />
        <ellipse cx="42" cy="48" rx="46" ry="16" />
      </g>
      {/* 嵐の前の黄緑がかった地平の光。 */}
      <rect y="62" width="400" height="12" fill="#a5a469" opacity="0.55" />

      {/* 稲光。ふだんは消えていて、ときどき走る。 */}
      <g className="sa-hs-bolt" opacity="0">
        <path d="M296,6 l-16,34 h13 l-12,30 l30,-40 h-14 l12,-24z" fill="#f6f2d8" />
        <rect width="400" height="210" fill="#f6f2d8" opacity="0.14" />
      </g>

      {/* ── 切通しの両壁。土と岩。手前ほど濃く。 */}
      <path d="M0,62 q46,10 76,44 q28,32 34,104 H0z" fill="#6f6248" />
      <path d="M400,62 q-46,10 -76,44 q-28,32 -34,104 h110z" fill="#77694e" />
      <path d="M0,86 q40,10 64,42 q24,30 30,82 H0z" fill="#5a4f3a" />
      <path d="M400,90 q-38,10 -62,40 q-24,30 -28,80 h90z" fill="#635840" />
      {/* 壁の層と、崩れかけた筋。 */}
      <g stroke="#4a4030" strokeWidth="2" fill="none" opacity="0.7">
        <path d="M6,104 q30,10 46,38 M14,132 q26,12 38,44 M394,108 q-30,10 -44,38 M386,138 q-24,12 -34,42" />
      </g>
      <g fill="#8a7a58" opacity="0.6">
        <ellipse cx="46" cy="122" rx="14" ry="6" transform="rotate(38 46 122)" />
        <ellipse cx="356" cy="128" rx="13" ry="6" transform="rotate(-36 356 128)" />
      </g>
      {/* 縁の草。 */}
      <g stroke="#7f8a4a" strokeWidth="2.2" strokeLinecap="round" fill="none">
        <path d="M20,70 v-8 M32,74 v-7 M48,82 v-8 M372,72 v-8 M358,78 v-7 M344,86 v-8" />
      </g>

      {/* 壁の排水口。処理しきれずに噴き出している。 */}
      <g>
        <rect x="74" y="128" width="18" height="12" rx="2" fill="#3f3a2c" />
        <rect x="72" y="126" width="22" height="4" fill="#8a7f62" />
        <g className="sa-hs-spout">
          <path d="M92,134 q22,4 30,26 q-14,-14 -32,-16z" fill="#9fb0a8" opacity="0.85" />
          <path d="M92,137 q18,4 24,20" stroke="#cfe0d8" strokeWidth="2.4" fill="none" />
        </g>
      </g>

      {/* ── 切通しの底。ここはもう水の下にある。 */}
      <rect x="88" y="150" width="224" height="60" fill="#4f4228" />
      {/* 水面より上に残っている、濡れた路盤の肩。 */}
      <path d="M88,164 q112,-10 224,2 v-14 H88z" fill="#6b5a38" />

      {/* 浸かって動けない保線トロリー。**このあとに水を重ねて沈める。** */}
      <g>
        <rect x="176" y="138" width="60" height="24" rx="3" fill="#c26a2c" />
        <rect x="176" y="138" width="60" height="5" fill="#e0873c" />
        <rect x="182" y="145" width="16" height="11" rx="2" fill="#2f3a3e" />
        <rect x="204" y="145" width="16" height="11" rx="2" fill="#2f3a3e" />
        <path d="M172,138 h68 l-6,-10 h-56z" fill="#8f4a1c" />
        <g stroke="#5f3a14" strokeWidth="2.6" fill="none">
          <path d="M180,128 v-12 M232,128 v-12 M180,116 h52" />
        </g>
        <circle cx="188" cy="164" r="6.4" fill="#2b2f26" />
        <circle cx="226" cy="164" r="6.4" fill="#2b2f26" />
      </g>

      {/* ── 溜まった水。**車軸の高さまで来ている。** */}
      <path d="M88,163 q112,-8 224,3 v44 H88z" fill="#6b5a38" opacity="0.94" />
      <path d="M88,163 q112,-8 224,3 v5 q-112,8 -224,-2z" fill="#93794a" />
      <path d="M88,178 q112,-8 224,4 v28 H88z" fill="#5c4c2c" />
      <path d="M88,196 q112,-8 224,5 v9 H88z" fill="#4d3f23" />
      {/* トロリーの映り込み。縦に伸びる筋にすると「水の上」だと分かる。 */}
      <g opacity="0.3">
        <rect x="176" y="166" width="60" height="18" fill="#c26a2c" />
        <rect x="182" y="170" width="16" height="8" fill="#2f3a3e" />
        <rect x="204" y="170" width="16" height="8" fill="#2f3a3e" />
      </g>
      {/* 水面のうねり。 */}
      <g className="sa-hs-wave-a" stroke="#a68d55" strokeWidth="2.4" fill="none" opacity="0.85">
        <path d="M100,172 q22,-4 44,0 t42,1 M236,174 q22,-4 44,0 t28,1" />
      </g>
      <g className="sa-hs-wave-b" stroke="#8a7346" strokeWidth="2.2" fill="none" opacity="0.75">
        <path d="M96,190 q26,-5 52,0 t52,1 t52,1" />
      </g>
      <g className="sa-hs-wave-a" stroke="#a68d55" strokeWidth="2" fill="none" opacity="0.6">
        <path d="M120,204 q28,-5 56,0 t56,1" />
      </g>
      {/* 水を切っているレールの頭。ここだけ金気が光る。 */}
      <g stroke="#9a9488" strokeWidth="2.2" fill="none" opacity="0.65">
        <path d="M128,168 q76,-5 152,3" />
      </g>

      {/* 水に浮かんで回っている枝。 */}
      <g className="sa-hs-debris">
        <path d="M252,186 q14,-4 26,2 q-13,4 -26,-2z" fill="#3f3524" />
        <path d="M260,186 l-4,-6 M270,187 l5,-5" stroke="#3f3524" strokeWidth="2" fill="none" />
      </g>
      {/* 浮いた枕木の端。 */}
      <g fill="#5f5238" opacity="0.9">
        <rect x="112" y="192" width="30" height="7" rx="1.6" transform="rotate(-7 127 195)" />
      </g>

      {/* ── 切通しの縁に立って、検測棒で深さを測る保線員。 */}
      <g>
        <path d="M330,150 V132" stroke="#3a4250" strokeWidth="10" strokeLinecap="round" fill="none" />
        <path d="M326,150 l-3,8 M334,150 l4,8" stroke="#2b3038" strokeWidth="4.6" strokeLinecap="round" fill="none" />
        <rect x="323" y="134" width="14" height="3.4" fill="#c8e04a" />
        <path d="M320,148 V133 q0,-7 8,-7 h5 q7,0 7,7 v15z" fill="#c8e04a" />
        <rect x="320" y="136" width="20" height="3.4" fill="#f2f6e0" />
        <circle cx="330" cy="118" r="7.6" fill="#6b4a34" />
        <path d="M322,115 q8,-8 16,-1 h-16z" fill="#f5b31c" />
        <path d="M330,133 q-14,2 -20,10" stroke="#6b4a34" strokeWidth="4.4" fill="none" strokeLinecap="round" />
        {/* 検測棒。目盛りの帯を紅白に。 */}
        <g>
          <rect x="304" y="126" width="4.6" height="66" fill="#e8e2d4" transform="rotate(14 306 160)" />
          <g fill="#c2453c">
            <rect x="304" y="140" width="4.6" height="11" transform="rotate(14 306 160)" />
            <rect x="304" y="162" width="4.6" height="11" transform="rotate(14 306 160)" />
            <rect x="304" y="184" width="4.6" height="8" transform="rotate(14 306 160)" />
          </g>
        </g>
      </g>

      {/* ── 雨。3枚を別々の速さで降らせる。 */}
      <g className="sa-hs-rain-a" stroke="#cfe0e8" strokeWidth="1.6" opacity="0.5" fill="none">
        <path d="M20,0 l-8,26 M76,-14 l-8,26 M140,4 l-8,26 M206,-10 l-8,26 M268,2 l-8,26 M330,-12 l-8,26 M384,6 l-8,26" />
        <path d="M46,60 l-8,26 M112,50 l-8,26 M178,64 l-8,26 M244,54 l-8,26 M308,62 l-8,26 M366,52 l-8,26" />
      </g>
      <g className="sa-hs-rain-b" stroke="#e0eef2" strokeWidth="1.3" opacity="0.42" fill="none">
        <path d="M8,-20 l-7,24 M62,10 l-7,24 M124,-16 l-7,24 M190,8 l-7,24 M252,-18 l-7,24 M316,6 l-7,24 M372,-14 l-7,24" />
        <path d="M32,86 l-7,24 M96,96 l-7,24 M160,84 l-7,24 M228,94 l-7,24 M292,86 l-7,24 M352,96 l-7,24" />
      </g>
      <g className="sa-hs-rain-c" stroke="#cfe0e8" strokeWidth="1.9" opacity="0.36" fill="none">
        <path d="M54,120 l-9,30 M148,110 l-9,30 M240,124 l-9,30 M336,114 l-9,30" />
      </g>

      <style>{`
        .sa-hs-rain-a { animation: sa-hs-fall 0.7s linear infinite; }
        .sa-hs-rain-b { animation: sa-hs-fall 0.52s linear infinite; }
        .sa-hs-rain-c { animation: sa-hs-fall 0.42s linear infinite; }
        @keyframes sa-hs-fall {
          0% { transform: translate(0, -30px); }
          100% { transform: translate(-10px, 30px); }
        }
        .sa-hs-bolt { animation: sa-hs-flash 5.2s linear infinite; }
        @keyframes sa-hs-flash {
          0%, 86%, 100% { opacity: 0; }
          88% { opacity: 1; }
          90% { opacity: 0.1; }
          92% { opacity: 0.9; }
          95% { opacity: 0; }
        }
        .sa-hs-wave-a { animation: sa-hs-swell 3.6s ease-in-out infinite; }
        .sa-hs-wave-b { animation: sa-hs-swell 4.6s ease-in-out -1.8s infinite; }
        @keyframes sa-hs-swell {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(9px, -2.5px); }
        }
        .sa-hs-spout {
          transform-box: fill-box;
          transform-origin: 0% 0%;
          animation: sa-hs-gush 1.4s ease-in-out infinite;
        }
        @keyframes sa-hs-gush {
          0%, 100% { transform: scale(1, 1); opacity: 0.85; }
          50% { transform: scale(1.14, 1.1); opacity: 1; }
        }
        .sa-hs-debris {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: sa-hs-turn 8s linear infinite;
        }
        @keyframes sa-hs-turn {
          0% { transform: rotate(0deg) translateX(0); }
          50% { transform: rotate(180deg) translateX(-8px); }
          100% { transform: rotate(360deg) translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .sa-hs-rain-a,
          .sa-hs-rain-b,
          .sa-hs-rain-c,
          .sa-hs-bolt,
          .sa-hs-wave-a,
          .sa-hs-wave-b,
          .sa-hs-spout,
          .sa-hs-debris { animation: none; }
        }
      `}</style>
    </svg>
  );
}
