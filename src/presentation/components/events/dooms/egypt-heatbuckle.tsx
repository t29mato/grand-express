/**
 * 猛暑でレールが反る。鋼が伸びて枕木から横へ張り出し、
 * 保線班が壊れる前に切って据え直すまで、列車は這うような速度で進む。
 *
 * 構図: 白く灼けた空の下、**左が畑の緑・右が砂漠**という盤面の芯をそのまま置く。
 * 手前でレールがS字に横へ膨らみ、屈んだ保線員が切断機で火花を上げている。
 * 奥では速度制限の標識のそばを、列車が這うように進んでいる。
 *
 * 動くのは4つ: 切断の火花、地面から立ちのぼる陽炎、じりじり進む列車、
 * 保線員の腕。止めても「横へ膨らんだレールと、その上に屈む人」で伝わる。
 *
 * (アジア盤の `railbuckle` と題材が同じなので、別物にしてある:
 *  あちらは無人・温度計・陽炎だけ。
 *  こちらは**人が直していて火花が出ており、列車が実際に徐行している**。)
 */
export function EgyptHeatbuckle() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 灼けて白茶けた空。 */}
      <rect width="400" height="210" fill="#e8cf9e" />
      <rect width="400" height="78" fill="#f2e3bb" />
      <circle cx="316" cy="36" r="26" fill="#f7d05a" />
      <circle cx="316" cy="36" r="38" fill="#f7d05a" opacity="0.28" />

      {/* 中景。左は畑の緑、右で唐突に砂漠に変わる。 */}
      <rect y="104" width="400" height="106" fill="#cfae76" />
      {/* 緑は途中でぷつりと終わり、そこから先はもう砂漠になる。
       **帯として置く。**手前まで垂らすと、線路が畑の上に載って見える。 */}
      <path d="M0,104 h146 q20,4 28,11 q10,8 24,11 v14 H0z" fill="#5f9f43" />
      <path d="M0,118 h136 q18,4 26,10 q8,5 18,7 v5 H0z" fill="#4f8b38" />
      <g stroke="#3f7530" strokeWidth="2.4" fill="none" opacity="0.7">
        <path d="M6,111 h136 M6,125 h140" />
      </g>
      <g stroke="#8f7448" strokeWidth="3.4" fill="none" strokeLinecap="round">
        <path d="M40,104 v-20 M40,84 q-12,-5 -20,1 M40,84 q12,-5 20,1 M40,84 q-9,-11 -17,-11 M40,84 q9,-11 17,-11" />
        <path d="M100,104 v-15 M100,89 q-10,-4 -16,1 M100,89 q10,-4 16,1 M100,89 q-7,-9 -14,-9 M100,89 q7,-9 14,-9" />
      </g>
      <path d="M204,122 q40,-14 92,-4 q56,10 104,-2 v18 H204z" fill="#dcbc86" />

      {/* 徐行している列車と、速度制限の標識。 */}
      <g className="egypt-hb-train">
        <rect x="270" y="96" width="70" height="26" rx="3" fill="#e2d8c2" />
        <rect x="270" y="96" width="70" height="7" fill="#c33f34" />
        <rect x="270" y="114" width="70" height="4" fill="#c33f34" />
        <g fill="#5c7080">
          <rect x="277" y="105" width="13" height="8" />
          <rect x="296" y="105" width="13" height="8" />
          <rect x="315" y="105" width="13" height="8" />
        </g>
        <rect x="268" y="122" width="74" height="4" fill="#4c4638" />
      </g>
      <g>
        <rect x="244" y="98" width="4" height="30" fill="#7a6444" />
        <circle
          cx="246"
          cy="94"
          r="10"
          fill="#efe7d4"
          stroke="#c33f34"
          strokeWidth="4"
        />
      </g>

      {/* 線路。手前でレールが横へS字に膨らむ。**止めても残る主役。** */}
      <g>
        <rect
          x="0"
          y="150"
          width="400"
          height="14"
          fill="#c09a62"
          opacity="0.5"
        />
        {Array.from({ length: 12 }).map((_, i) => (
          <rect
            key={i}
            x={4 + i * 34}
            y="150"
            width="15"
            height="9"
            fill="#75603f"
          />
        ))}
        {/* 奥のレールはまっすぐ。 */}
        <path d="M0,150 h400" stroke="#5a5346" strokeWidth="4" fill="none" />
        {/* 手前のレールが横へ逃げている。 */}
        <path
          d="M0,164 h96 q42,-26 84,0 q40,25 84,0 h136"
          stroke="#5a5346"
          strokeWidth="5"
          fill="none"
        />
        <path
          d="M96,164 q42,-26 84,0 q40,25 84,0"
          stroke="#8a7f68"
          strokeWidth="2"
          fill="none"
        />
        {/* 外れて浮いた犬釘。 */}
        <g fill="#6a6250">
          <rect x="122" y="156" width="4" height="7" />
          <rect x="214" y="170" width="4" height="7" />
        </g>
      </g>

      {/* 保線員。屈んで切断機を当てている。青い作業服に面体。 */}
      <g transform="translate(150,0)">
        <path d="M-14,196 q16,-8 34,0z" fill="#c09a62" />
        <g className="egypt-hb-worker">
          <circle cx="0" cy="150" r="8" fill="#6d5238" />
          <path d="M-8,148 q8,-9 16,-1 l1,-6 q-8,-6 -17,1z" fill="#8f949c" />
          <path d="M-8,158 q-5,18 -2,30 h18 q-4,-20 -4,-30z" fill="#2f6f9a" />
          <path
            d="M-6,188 l-8,10 M8,188 l8,10"
            stroke="#3f4a56"
            strokeWidth="5"
            fill="none"
          />
          <path
            d="M6,164 q14,4 20,12"
            stroke="#2f6f9a"
            strokeWidth="6"
            fill="none"
          />
          <rect x="22" y="170" width="16" height="9" rx="2" fill="#e8a41c" />
          <circle
            cx="40"
            cy="176"
            r="7"
            fill="none"
            stroke="#8f949c"
            strokeWidth="3"
          />
        </g>
        {/* 火花。 */}
        <g className="egypt-hb-spark" fill="#f7d05a">
          <circle cx="46" cy="180" r="3.4" />
          <circle cx="56" cy="172" r="2.2" />
          <circle cx="58" cy="188" r="2" />
          <circle cx="66" cy="180" r="1.6" />
        </g>
      </g>

      {/* 陽炎。地面すれすれで揺れる。 */}
      <g
        className="egypt-hb-heat"
        stroke="#f4e6c0"
        strokeWidth="3"
        fill="none"
        opacity="0.5"
        strokeLinecap="round"
      >
        <path d="M24,140 q10,-7 20,0 t20,0" />
        <path d="M290,142 q10,-7 20,0 t20,0" />
        <path d="M340,134 q10,-7 20,0" />
      </g>

      <style>{`
        .egypt-hb-spark {
          transform-box: fill-box;
          transform-origin: 0% 50%;
          animation: egypt-hb-fly 0.5s steps(3, end) infinite;
        }
        @keyframes egypt-hb-fly {
          0% { transform: scale(0.5); opacity: 1; }
          100% { transform: scale(1.35) translate(6px, -3px); opacity: 0; }
        }
        .egypt-hb-worker {
          transform-box: fill-box;
          transform-origin: 20% 95%;
          animation: egypt-hb-push 1.4s ease-in-out infinite;
        }
        @keyframes egypt-hb-push {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(4deg) translateX(2px); }
        }
        .egypt-hb-train {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: egypt-hb-crawl 9s linear infinite;
        }
        @keyframes egypt-hb-crawl {
          0% { transform: translateX(22px); }
          100% { transform: translateX(-26px); }
        }
        .egypt-hb-heat {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: egypt-hb-shimmer 2.6s ease-in-out infinite;
        }
        @keyframes egypt-hb-shimmer {
          0%, 100% { transform: translateY(0) scaleY(1); opacity: 0.28; }
          50% { transform: translateY(-6px) scaleY(1.3); opacity: 0.6; }
        }
        @media (prefers-reduced-motion: reduce) {
          .egypt-hb-spark,
          .egypt-hb-worker,
          .egypt-hb-train,
          .egypt-hb-heat { animation: none; }
        }
      `}</style>
    </svg>
  );
}
