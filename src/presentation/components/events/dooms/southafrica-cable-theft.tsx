/**
 * 銅線の盗難で信号が切れる。**盗まれたのは架線ではなく、線路脇の信号ケーブル。**
 * 盗んだ人は夜のうちに去っていて、絵に描くのは**朝の後始末**のほうである。
 *
 * 構図: 明るい冬の朝。線路脇のコンクリートの溝(ケーブルトラフ)の蓋が
 * 外されて散らばり、中身が一区間まるごと空になっている。切られた銅線の端だけが
 * 両側に残る。信号は灯が消えたまま、係員が赤旗で列車を通している。
 * 左では新しいケーブルのドラムを繰り出して継ぎ足しにかかっている。
 * 列車は徒歩並みの速さでじりじり進む。
 *
 * 動くのは5つ: 切られた線の端のふるえ、ケーブルドラムの回転、
 * 赤旗、継ぎ足す人の腕、そして**ほとんど動かない列車**。
 * 止めた状態でも「蓋が外れ、溝が空で、信号が消えている」で伝わる。
 *
 * (アフリカ大陸盤の銅線盗難とは正面から別物にする:
 *  あちらは**夜・架線・コイルを担いで去る泥棒**。
 *  こちらは**朝・地上の溝・直している人**。色も藍ではなく枯草と白い空)
 */
export function SouthafricaCableTheft() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 冬の朝の白っぽい空。 */}
      <rect width="400" height="210" fill="#cfd8d4" />
      <rect width="400" height="62" fill="#bccdd4" />
      <rect y="60" width="400" height="36" fill="#dcd8c2" />
      <circle cx="66" cy="34" r="15" fill="#f2e8c0" opacity="0.8" />
      <circle cx="66" cy="34" r="24" fill="#f2e8c0" opacity="0.25" />

      {/* 遠くのコッピー(平頂の丘)。 */}
      <path d="M0,96 L44,72 h58 l30,24z" fill="#8f9285" />
      <path d="M232,96 L266,78 h44 l26,18z" fill="#9a9c8e" />
      <path d="M0,96 q90,-10 180,-2 q106,10 220,-6 v14 H0z" fill="#7f8a6a" />

      {/* 枯草の高原。 */}
      <rect y="104" width="400" height="106" fill="#b3a066" />
      <path d="M0,118 q100,-8 200,2 q100,10 200,-6 v96 H0z" fill="#a2904f" />
      <g stroke="#c2b075" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.8">
        <path d="M18,118 v-7 M26,118 v-5 M300,116 v-7 M310,116 v-5 M348,114 v-6" />
      </g>

      {/* 線路。 */}
      <rect y="140" width="400" height="14" fill="#8a7f5c" />
      <g fill="#5f5238">
        <rect x="2" y="142" width="13" height="6" />
        <rect x="36" y="142" width="13" height="6" />
        <rect x="70" y="142" width="13" height="6" />
        <rect x="104" y="142" width="13" height="6" />
        <rect x="138" y="142" width="13" height="6" />
        <rect x="172" y="142" width="13" height="6" />
        <rect x="206" y="142" width="13" height="6" />
        <rect x="240" y="142" width="13" height="6" />
        <rect x="274" y="142" width="13" height="6" />
        <rect x="308" y="142" width="13" height="6" />
        <rect x="342" y="142" width="13" height="6" />
        <rect x="376" y="142" width="13" height="6" />
      </g>
      <rect y="139" width="400" height="3" fill="#a8a294" />
      <rect y="150" width="400" height="2.6" fill="#8f8a7c" />

      {/* 徒歩並みの速さでにじり進む列車(左から)。**ほとんど止まって見える。** */}
      <g className="sa-ct-train">
        <rect x="-104" y="98" width="150" height="42" rx="5" fill="#5a6f52" />
        <rect x="-104" y="98" width="150" height="8" fill="#c9a83c" />
        <rect x="-104" y="132" width="150" height="4" fill="#3f5039" />
        <g fill="#2c3a3e">
          <rect x="-92" y="110" width="19" height="14" rx="2" />
          <rect x="-66" y="110" width="19" height="14" rx="2" />
          <rect x="-40" y="110" width="19" height="14" rx="2" />
          <rect x="-14" y="110" width="19" height="14" rx="2" />
          <rect x="12" y="110" width="19" height="14" rx="2" />
        </g>
        <path d="M46,98 q12,16 10,42 h-10z" fill="#5a6f52" />
        <circle cx="50" cy="124" r="4" fill="#f5b31c" />
        <g fill="#20242a">
          <circle cx="-74" cy="140" r="6" />
          <circle cx="-46" cy="140" r="6" />
          <circle cx="18" cy="140" r="6" />
          <circle cx="34" cy="140" r="6" />
        </g>
      </g>

      {/* 灯の消えた信号機。レンズは3つとも灰色。 */}
      <g>
        <rect x="286" y="98" width="7" height="72" fill="#6f7266" />
        <rect x="278" y="88" width="23" height="34" rx="4" fill="#3a3f38" />
        <circle cx="289.5" cy="97" r="4.4" fill="#5f6459" />
        <circle cx="289.5" cy="106" r="4.4" fill="#5f6459" />
        <circle cx="289.5" cy="115" r="4.4" fill="#5f6459" />
        <path d="M274,88 h31 l-4,-6 h-23z" fill="#2f342e" />
        <rect x="278" y="158" width="23" height="12" rx="2" fill="#6f7266" />
      </g>

      {/* ── ケーブルトラフ。蓋が外され、中身が一区間まるごと無い。 */}
      {/* 蓋が載っている区間(左端と右端)。継ぎ目と天端の照りで「載っている」を出す。 */}
      <g>
        <rect x="0" y="166" width="130" height="11" fill="#b8b6a6" />
        <rect x="0" y="166" width="130" height="3" fill="#d2d0c0" />
        <rect x="318" y="166" width="82" height="11" fill="#b8b6a6" />
        <rect x="318" y="166" width="82" height="3" fill="#d2d0c0" />
        <g stroke="#8f8d80" strokeWidth="1.6" fill="none">
          <path d="M32,166 v11 M64,166 v11 M96,166 v11 M350,166 v11 M382,166 v11" />
        </g>
        <rect x="0" y="177" width="130" height="7" fill="#9a9889" />
        <rect x="318" y="177" width="82" height="7" fill="#9a9889" />
      </g>
      {/* 蓋の外れた区間。**溝が深く、中は空。** */}
      <rect x="130" y="166" width="188" height="18" fill="#9a9889" />
      <rect x="130" y="166" width="188" height="4" fill="#b8b6a6" />
      <rect x="134" y="170" width="180" height="12" fill="#2f302a" />
      <rect x="134" y="170" width="180" height="3.4" fill="#1e1f1b" />
      <rect x="130" y="182" width="188" height="4" fill="#8a8879" />
      {/* 溝の中に残った、切り残しの結束帯だけ。 */}
      <g fill="#4a4b42">
        <rect x="150" y="176" width="4" height="6" />
        <rect x="196" y="176" width="4" height="6" />
        <rect x="244" y="176" width="4" height="6" />
        <rect x="290" y="176" width="4" height="6" />
      </g>
      {/* 外して放り出された蓋。傾いて草の上に転がっている。 */}
      <g fill="#c2c0b0" stroke="#8f8d80" strokeWidth="1.4">
        <rect x="146" y="192" width="32" height="8" rx="1.4" transform="rotate(-9 162 196)" />
        <rect x="196" y="197" width="32" height="8" rx="1.4" transform="rotate(6 212 201)" />
        <rect x="248" y="190" width="32" height="8" rx="1.4" transform="rotate(-14 264 194)" />
      </g>
      {/* 切られた銅線の端。両側に残る。ここが小さくふるえる。 */}
      <g className="sa-ct-end-l">
        <path d="M134,176 q-9,-3 -13,-12" stroke="#d98a3c" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M134,179 q-8,1 -12,7" stroke="#b8702c" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
      <g className="sa-ct-end-r">
        <path d="M314,176 q10,-3 14,-13" stroke="#d98a3c" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M314,179 q9,1 13,8" stroke="#b8702c" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
      {/* 剥いだ被覆を焼いた跡と、切り落とされた黒い皮。 */}
      <ellipse cx="300" cy="200" rx="24" ry="6.4" fill="#3f3a30" opacity="0.75" />
      <g stroke="#22201c" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M288,199 q9,-5 17,-1 M302,203 q10,-4 18,0" />
      </g>

      {/* ── 新しいケーブルのドラム。ゆっくり回りながら繰り出される。 */}
      <g>
        <rect x="18" y="182" width="52" height="4" rx="2" fill="#5f5238" />
        <g className="sa-ct-drum">
          <circle cx="44" cy="162" r="21" fill="#7a5a34" />
          <circle cx="44" cy="162" r="15" fill="#d98a3c" />
          <circle cx="44" cy="162" r="9" fill="#b8702c" />
          <g stroke="#5f4224" strokeWidth="2.4" fill="none">
            <path d="M44,141 V183 M23,162 H65 M29,147 L59,177 M59,147 L29,177" />
          </g>
          <circle cx="44" cy="162" r="3.4" fill="#4a3620" />
        </g>
        {/* 繰り出された線。溝の口へ向かう。 */}
        <path d="M60,174 q30,14 66,4" stroke="#d98a3c" strokeWidth="3" fill="none" />
      </g>

      {/* しゃがんで継ぎ足す作業員(高視認ベスト)。膝を折り、溝へ身を乗り出す。 */}
      <g>
        <path d="M96,204 q-2,-9 4,-12 h12" stroke="#3a4250" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M92,192 V180 q0,-7 8,-7 h5 q7,0 7,7 v12z" fill="#c8e04a" />
        <rect x="92" y="182" width="20" height="3.4" fill="#f2f6e0" />
        <circle cx="104" cy="165" r="7.4" fill="#8a5a3c" />
        <path d="M96,162 q8,-8 16,-1 h-16z" fill="#f5b31c" />
        <g className="sa-ct-hand">
          <path d="M110,181 q12,3 18,-4" stroke="#8a5a3c" strokeWidth="4.6" fill="none" strokeLinecap="round" />
        </g>
        <rect x="66" y="196" width="22" height="8" rx="1.6" fill="#4a4f46" />
        <rect x="69" y="192" width="8" height="4.4" rx="1" fill="#c96f2a" />
      </g>

      {/* 赤旗で列車を通している係員。信号が死んでいるあいだの手信号。 */}
      <g>
        <path d="M362,206 V188" stroke="#3a4250" strokeWidth="10" strokeLinecap="round" fill="none" />
        <path d="M358,206 l-4,4 M366,206 l4,4" stroke="#2b3038" strokeWidth="4.6" strokeLinecap="round" fill="none" />
        <rect x="355" y="190" width="15" height="4" fill="#c8e04a" />
        <circle cx="362" cy="178" r="7.4" fill="#6b4a34" />
        <path d="M355,175 q7,-7 15,-1 h-15z" fill="#f5b31c" />
        <path d="M362,189 q-13,-4 -17,-14" stroke="#6b4a34" strokeWidth="4.4" fill="none" strokeLinecap="round" />
        <g className="sa-ct-flag">
          <path d="M345,175 v-22" stroke="#6f5a3a" strokeWidth="2.4" fill="none" />
          <path d="M345,153 h24 l-6,7 l6,7 h-24z" fill="#c2453c" />
        </g>
      </g>

      {/* 手前の草。 */}
      <g stroke="#8a7a44" strokeWidth="2" strokeLinecap="round" fill="none">
        <path d="M12,210 v-13 M22,210 v-9 M104,210 v-11 M114,210 v-8 M212,210 v-10 M366,210 v-12 M378,210 v-8" />
      </g>

      <style>{`
        .sa-ct-end-l, .sa-ct-end-r {
          transform-box: fill-box;
          transform-origin: 100% 50%;
        }
        .sa-ct-end-r { transform-origin: 0% 50%; }
        .sa-ct-end-l { animation: sa-ct-quiver 2.4s ease-in-out infinite; }
        .sa-ct-end-r { animation: sa-ct-quiver 2.4s ease-in-out -1.2s infinite; }
        @keyframes sa-ct-quiver {
          0%, 100% { transform: rotate(-4deg); }
          50% { transform: rotate(5deg); }
        }
        .sa-ct-drum {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: sa-ct-spin 9s linear infinite;
        }
        @keyframes sa-ct-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .sa-ct-flag {
          transform-box: fill-box;
          transform-origin: 0% 100%;
          animation: sa-ct-swing 2s ease-in-out infinite;
        }
        @keyframes sa-ct-swing {
          0%, 100% { transform: rotate(-10deg); }
          50% { transform: rotate(12deg); }
        }
        .sa-ct-hand {
          transform-box: fill-box;
          transform-origin: 0% 0%;
          animation: sa-ct-splice 1.6s ease-in-out infinite;
        }
        @keyframes sa-ct-splice {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(14deg); }
        }
        .sa-ct-train {
          animation: sa-ct-crawl 14s linear infinite;
        }
        @keyframes sa-ct-crawl {
          0% { transform: translateX(0); }
          100% { transform: translateX(26px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .sa-ct-end-l,
          .sa-ct-end-r,
          .sa-ct-drum,
          .sa-ct-flag,
          .sa-ct-hand,
          .sa-ct-train { animation: none; }
        }
      `}</style>
    </svg>
  );
}
