/**
 * 増水による洗掘。川沿いの土手が崩れ、線路が宙に浮き、
 * 線路脇の小屋が濁流へ傾いている。
 *
 * 動くのは3つ: 降りしきる雨、うねる濁流の筋、宙吊りの枕木のゆれ。
 * 止めても「土手が抉れて線路が浮き、小屋が傾いた」構図で伝わる。人は描かない。
 */
export function AfricaWashout() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 嵐の空。 */}
      <rect width="400" height="210" fill="#5f6f6e" />
      <rect width="400" height="80" fill="#4f5c60" />
      <g fill="#6f7f7c" opacity="0.9">
        <ellipse cx="90" cy="38" rx="60" ry="14" />
        <ellipse cx="230" cy="26" rx="70" ry="15" />
        <ellipse cx="340" cy="44" rx="55" ry="12" />
      </g>

      {/* 中景: 雨にかすむ木立。 */}
      <g fill="#4a5a4c" opacity="0.85">
        <ellipse cx="40" cy="92" rx="26" ry="14" />
        <ellipse cx="86" cy="88" rx="20" ry="12" />
        <ellipse cx="350" cy="90" rx="28" ry="13" />
        <rect x="36" y="98" width="6" height="16" />
        <rect x="346" y="98" width="6" height="16" />
      </g>

      {/* 残った土手(左右)。中央が抉れている。 */}
      <path d="M0,112 h160 q-14,26 -8,54 L140,210 H0z" fill="#6b5a3c" />
      <path d="M400,112 h-136 q10,26 2,56 l14,42 h120z" fill="#6b5a3c" />
      <path d="M0,112 h160 q-6,10 -8,20 L0,132z" fill="#7a9a4a" />
      <path d="M400,112 h-136 q4,10 4,22 l132,-4z" fill="#7a9a4a" />

      {/* 濁流。土手の裂け目を満たして手前へ。 */}
      <rect y="166" width="400" height="44" fill="#8a6a3a" />
      <path d="M152,112 q28,-6 56,0 l56,2 q-10,30 -4,52 l6,44 H140 q-6,-50 12,-98z" fill="#96743e" />
      <g className="africa-wo-torrent" stroke="#b8935f" strokeWidth="3" fill="none" opacity="0.85">
        <path d="M160,132 q22,6 44,0 t44,4" />
        <path d="M150,158 q30,8 60,0 t56,6" />
        <path d="M20,180 q40,8 80,0 t90,4 t90,-2 t80,2" />
        <path d="M60,196 q50,8 100,0 t120,4" />
      </g>
      <g fill="#e8dcc4" opacity="0.7">
        <circle cx="180" cy="140" r="2.6" />
        <circle cx="226" cy="150" r="2.2" />
        <circle cx="196" cy="172" r="2.8" />
        <circle cx="298" cy="186" r="2.4" />
      </g>

      {/* 線路。裂け目の上で宙に浮く。 */}
      <g>
        <g fill="#5a4a3a">
          <rect x="6" y="106" width="12" height="7" />
          <rect x="36" y="106" width="12" height="7" />
          <rect x="66" y="106" width="12" height="7" />
          <rect x="96" y="106" width="12" height="7" />
          <rect x="126" y="106" width="12" height="7" />
          <rect x="272" y="106" width="12" height="7" />
          <rect x="302" y="106" width="12" height="7" />
          <rect x="332" y="106" width="12" height="7" />
          <rect x="362" y="106" width="12" height="7" />
        </g>
        {/* 浮いた区間の枕木は間隔が乱れてぶら下がる。 */}
        <rect x="168" y="108" width="12" height="7" fill="#5a4a3a" transform="rotate(14 174 111)" />
        <rect x="226" y="108" width="12" height="7" fill="#5a4a3a" transform="rotate(-10 232 111)" />
        <g className="africa-wo-dangle">
          <path d="M198,108 v0 l-2,16 h9 l-2,-16z" fill="#5a4a3a" />
        </g>
        <path d="M0,104 h150 q50,6 100,0 h150" stroke="#4a4640" strokeWidth="4" fill="none" />
        <path d="M0,112 h146 M258,112 h142" stroke="#4a4640" strokeWidth="3" fill="none" />
      </g>

      {/* 傾いて水に浸かる線路脇の小屋(失う物件)。 */}
      <g transform="rotate(-14 300 150)">
        <rect x="282" y="128" width="40" height="26" fill="#c9b088" />
        <path d="M277,128 h50 l-8,-13 h-34z" fill="#8a4a3a" />
        <rect x="296" y="138" width="12" height="16" fill="#3a2f26" />
      </g>
      <path d="M270,158 q20,8 60,4 l0,10 q-36,4 -62,-4z" fill="#96743e" />

      {/* 雨。**ここが主に動く。** */}
      <g className="africa-wo-rain" stroke="#bcd0d4" strokeWidth="1.6" opacity="0.7">
        <path d="M20,0 l-8,22 M60,10 l-8,22 M100,-6 l-8,22 M140,8 l-8,22 M180,-2 l-8,22 M220,10 l-8,22 M260,-4 l-8,22 M300,6 l-8,22 M340,-2 l-8,22 M380,8 l-8,22" />
      </g>
      <g className="africa-wo-rain2" stroke="#bcd0d4" strokeWidth="1.4" opacity="0.55">
        <path d="M40,40 l-8,22 M84,52 l-8,22 M128,38 l-8,22 M172,54 l-8,22 M216,42 l-8,22 M262,52 l-8,22 M306,40 l-8,22 M352,54 l-8,22" />
      </g>

      <style>{`
        .africa-wo-rain {
          animation: africa-wo-fall 0.9s linear infinite;
        }
        .africa-wo-rain2 {
          animation: africa-wo-fall 0.9s linear -0.45s infinite;
        }
        @keyframes africa-wo-fall {
          0% { transform: translate(14px, -36px); }
          100% { transform: translate(-14px, 36px); }
        }
        .africa-wo-torrent {
          animation: africa-wo-surge 2.2s ease-in-out infinite;
        }
        @keyframes africa-wo-surge {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-14px); }
        }
        .africa-wo-dangle {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: africa-wo-sway 2s ease-in-out infinite;
        }
        @keyframes africa-wo-sway {
          0%, 100% { transform: rotate(7deg); }
          50% { transform: rotate(-7deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .africa-wo-rain,
          .africa-wo-rain2,
          .africa-wo-torrent,
          .africa-wo-dangle { animation: none; }
        }
      `}</style>
    </svg>
  );
}
