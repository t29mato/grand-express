/**
 * ハムシーン。春に五十日ほど吹くサハラの熱風が、空を薄い茶の色に変え、
 * 剥き出しの線路を吹き溜まりで埋める。作業班がシャベルで掘り出すまで列車は動けない。
 *
 * 構図: 左に霞んだ椰子と村(ナイル沿い)、右に停まった赤白の機関車。
 * そのあいだの線路を、砂の吹き溜まりが斜めに横切って埋めている。
 * 掘っているのは2人で、**服も体つきも別**にしてある(長衣と頭巾/蛍光ベストとヘルメット)。
 *
 * 動くのは4つ: 手前と奥を流れる砂の帯、2人の掘る動き(速さを変えてある)、
 * 風に流れる椰子の葉。止めても「斜めに埋まった線路・止まった機関車・掘る2人」で伝わる。
 *
 * (アフリカ盤のハルマッタン、アジア盤の砂嵐とは別物にする:
 *  あちらは白茶けた霞/銅色の空。こちらは**薄い茶**の空で、
 *  機関車が実際に止まっていて、掘り手が2人いる。)
 */
export function EgyptKhamsin() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 薄い茶に濁った空。太陽は輪郭だけ残る。 */}
      <rect width="400" height="210" fill="#bf9b66" />
      <rect width="400" height="104" fill="#d0b083" />
      <circle cx="308" cy="44" r="21" fill="#dcc59a" />

      {/* 中景: 霞に沈むナイル沿いの村と椰子。左3分の1に寄せる。 */}
      <g fill="#a3835a" opacity="0.9">
        <rect x="16" y="102" width="32" height="26" />
        <rect x="54" y="108" width="24" height="20" />
        <rect x="84" y="104" width="28" height="24" />
        <rect x="66" y="82" width="9" height="26" />
        <rect x="63" y="92" width="15" height="3" />
        <path d="M64,82 h13 l-6.5,-8z" />
      </g>
      <g
        className="egypt-kh-palm"
        stroke="#8f7448"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      >
        <path d="M126,128 v-30" />
        <path d="M126,98 q-16,-6 -26,2 M126,98 q16,-6 26,2 M126,98 q-12,-14 -22,-14 M126,98 q12,-14 22,-14" />
      </g>

      {/* 地面。乾いた砂礫。 */}
      <rect y="128" width="400" height="82" fill="#c39c66" />
      <path d="M0,128 q90,-7 180,1 t220,-1 v10 H0z" fill="#cfab77" />

      {/* 線路。中央から右へ、吹き溜まりに斜めに呑まれていく。 */}
      <g>
        <rect
          x="0"
          y="168"
          width="400"
          height="11"
          fill="#b28d58"
          opacity="0.55"
        />
        {Array.from({ length: 13 }).map((_, i) => (
          <rect
            key={i}
            x={6 + i * 31}
            y="168"
            width="13"
            height="7"
            fill="#75603f"
          />
        ))}
        <rect x="0" y="166" width="400" height="4" fill="#57503f" />
        <rect x="0" y="176" width="400" height="3" fill="#57503f" />
      </g>

      {/* 吹き溜まり。線路を斜めに横切って埋める。**動きを止めても残る主役。** */}
      <path
        d="M138,182 q34,-34 92,-30 q58,4 96,20 q40,14 74,10 v20 H138z"
        fill="#d4b27c"
      />
      <path
        d="M170,166 q46,-10 96,4"
        stroke="#c29e66"
        strokeWidth="3"
        fill="none"
      />
      <path
        d="M262,176 q44,-6 78,2"
        stroke="#c29e66"
        strokeWidth="2.4"
        fill="none"
      />

      {/* 停まった機関車。砂の手前で足を止めている。 */}
      <g>
        <rect x="300" y="126" width="88" height="40" rx="4" fill="#e2d8c2" />
        <rect x="300" y="126" width="88" height="11" fill="#c33f34" />
        <rect x="300" y="152" width="88" height="6" fill="#c33f34" />
        <g fill="#5c7080">
          <rect x="310" y="140" width="17" height="10" />
          <rect x="333" y="140" width="17" height="10" />
          <rect x="356" y="140" width="17" height="10" />
        </g>
        <circle cx="306" cy="160" r="4.6" fill="#f5cf72" />
        <rect x="296" y="162" width="96" height="6" fill="#4c4638" />
      </g>

      {/* 掘り手その1。長衣に頭巾。腰を落として深く掘る。 */}
      <g transform="translate(64,0)">
        <g className="egypt-kh-dig1">
          <circle cx="0" cy="126" r="8" fill="#6d5238" />
          <path d="M-8,124 q8,-8 16,-1 l1,-5 q-8,-6 -17,0z" fill="#efe5cd" />
          <path d="M-6,134 q-3,22 -1,34 h16 q-3,-24 -3,-34z" fill="#e8dcbe" />
          <path
            d="M4,140 q13,6 20,15"
            stroke="#e8dcbe"
            strokeWidth="6"
            fill="none"
          />
          <path
            d="M22,155 L38,170"
            stroke="#8b6a2a"
            strokeWidth="4"
            fill="none"
          />
          <path d="M34,166 l10,9 -7,7 -9,-10z" fill="#8f949c" />
        </g>
        <path d="M30,182 q11,-9 24,0z" fill="#b28d58" />
      </g>

      {/* 掘り手その2。蛍光ベストとヘルメット。立ったまま浅く掻き出す。 */}
      <g transform="translate(178,0)">
        <g className="egypt-kh-dig2">
          <circle cx="0" cy="120" r="7.4" fill="#75563a" />
          <path d="M-9,118 q9,-9 18,0 q0,-4 -9,-4 q-9,0 -9,4z" fill="#f0a32a" />
          <path d="M-6,127 q-2,17 -1,26 h14 q-2,-18 -2,-26z" fill="#f0a32a" />
          <path
            d="M-5,153 l-5,16 M6,153 l5,16"
            stroke="#4f5a6a"
            strokeWidth="5"
            fill="none"
          />
          <path
            d="M6,132 q12,3 17,10"
            stroke="#f0a32a"
            strokeWidth="5"
            fill="none"
          />
          <path
            d="M21,142 L34,156"
            stroke="#8b6a2a"
            strokeWidth="3.6"
            fill="none"
          />
          <path d="M30,152 l9,8 -6,6 -8,-8z" fill="#8f949c" />
        </g>
      </g>

      {/* 流れる砂塵。**ここが主に動く。** */}
      <g className="egypt-kh-dust1" fill="#dfc292" opacity="0.5">
        <ellipse cx="300" cy="72" rx="100" ry="13" />
        <ellipse cx="120" cy="100" rx="118" ry="15" />
      </g>
      <g className="egypt-kh-dust2" fill="#eeddb6" opacity="0.42">
        <ellipse cx="230" cy="150" rx="128" ry="12" />
        <ellipse cx="54" cy="60" rx="76" ry="10" />
        <ellipse cx="330" cy="196" rx="96" ry="9" />
      </g>

      <style>{`
        .egypt-kh-dust1 {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: egypt-kh-drift 3.1s linear infinite;
        }
        .egypt-kh-dust2 {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: egypt-kh-drift 4.4s linear -1.8s infinite;
        }
        @keyframes egypt-kh-drift {
          0% { transform: translateX(54px); opacity: 0.2; }
          50% { opacity: 0.58; }
          100% { transform: translateX(-54px); opacity: 0.2; }
        }
        .egypt-kh-dig1 {
          transform-box: fill-box;
          transform-origin: 28% 92%;
          animation: egypt-kh-dig 1.5s ease-in-out infinite;
        }
        .egypt-kh-dig2 {
          transform-box: fill-box;
          transform-origin: 26% 92%;
          animation: egypt-kh-dig 1.9s ease-in-out -0.6s infinite;
        }
        @keyframes egypt-kh-dig {
          0%, 100% { transform: rotate(0deg); }
          45% { transform: rotate(10deg) translateY(3px); }
        }
        .egypt-kh-palm {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: egypt-kh-bend 2.4s ease-in-out infinite;
        }
        @keyframes egypt-kh-bend {
          0%, 100% { transform: skewX(0deg); }
          50% { transform: skewX(-7deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .egypt-kh-dust1,
          .egypt-kh-dust2,
          .egypt-kh-dig1,
          .egypt-kh-dig2,
          .egypt-kh-palm { animation: none; }
        }
      `}</style>
    </svg>
  );
}
