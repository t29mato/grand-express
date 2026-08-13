/**
 * 天狗に化かされる。一時間まるまる歩いたはずが、なぜか先ほど通った
 * 同じ岩に戻ってしまう。
 *
 * この盤面の厄災の神は**天狗**。ここでは姿を出さず、**円を描く足あとと、
 * 渦を巻いて舞う木の葉**だけで「化かされている」ことを示す
 * (`04-doom-animation-guide.md` の方針どおり。韓国のトッケビの絵と同じ
 * 考え方だが、山の風を思わせる葉で違いを付けている)。動くのは、
 * 渦を巻く木の葉だけ。
 */
export function HyakumeizanTengukakushi() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 薄暗い森。 */}
      <rect width="400" height="210" fill="#2a2438" />
      <rect y="0" width="400" height="90" fill="#362e46" />

      {/* 木立のシルエット。 */}
      <g fill="#1c1826">
        <rect x="30" y="60" width="12" height="120" />
        <ellipse cx="36" cy="56" rx="30" ry="40" />
        <rect x="340" y="50" width="14" height="130" />
        <ellipse cx="347" cy="46" rx="34" ry="44" />
      </g>

      {/* 地面。 */}
      <rect y="150" width="400" height="60" fill="#332c42" />

      {/* 堂々巡りした足あと。輪になっている。 */}
      <g fill="#1c1826" opacity="0.9">
        <ellipse cx="170" cy="172" rx="7" ry="4" />
        <ellipse cx="196" cy="156" rx="7" ry="4" />
        <ellipse cx="224" cy="150" rx="7" ry="4" />
        <ellipse cx="250" cy="162" rx="7" ry="4" />
        <ellipse cx="252" cy="188" rx="7" ry="4" />
        <ellipse cx="228" cy="200" rx="7" ry="4" />
        <ellipse cx="198" cy="200" rx="7" ry="4" />
        <ellipse cx="172" cy="192" rx="7" ry="4" />
      </g>

      {/* 見覚えのある苔むした岩。 */}
      <ellipse cx="212" cy="176" rx="26" ry="14" fill="#4a4438" />
      <ellipse cx="204" cy="170" rx="8" ry="5" fill="#5a6a44" opacity="0.8" />

      {/* 首をかしげて立ち止まる登山者。 */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <path d="M126,168 L120,198" stroke="#242034" strokeWidth="9" fill="none" />
        <path d="M136,168 L142,198" stroke="#2e2840" strokeWidth="9" fill="none" />
        <path d="M130,140 L130,170" stroke="#4a5568" strokeWidth="20" fill="none" />
        <rect x="118" y="138" width="14" height="22" rx="3" fill="#8b6a44" />
        <circle cx="132" cy="126" r="11" fill="#d9a273" stroke="#1c1826" strokeWidth="2" transform="rotate(14 132 126)" />
        <path d="M122,140 L108,150" stroke="#d9a273" strokeWidth="7" fill="none" />
      </g>

      {/* 渦を巻いて舞う木の葉。**ここだけが動く。** */}
      <g className="hkt-leaf1" fill="#8a6a3a">
        <ellipse rx="5" ry="3" />
      </g>
      <g className="hkt-leaf2" fill="#a4823c">
        <ellipse rx="4" ry="2.6" />
      </g>
      <g className="hkt-leaf3" fill="#7a5a2e">
        <ellipse rx="4.4" ry="2.8" />
      </g>

      <style>{`
        .hkt-leaf1, .hkt-leaf2, .hkt-leaf3 {
          transform-box: fill-box;
          transform-origin: 0 0;
        }
        .hkt-leaf1 { animation: hkt-swirl1 3.2s linear infinite; }
        .hkt-leaf2 { animation: hkt-swirl2 3.2s linear infinite; animation-delay: 1s; }
        .hkt-leaf3 { animation: hkt-swirl3 3.2s linear infinite; animation-delay: 2s; }
        @keyframes hkt-swirl1 {
          0%   { transform: translate(280px, 130px) rotate(0deg); }
          25%  { transform: translate(310px, 110px) rotate(90deg); }
          50%  { transform: translate(300px, 84px) rotate(180deg); }
          75%  { transform: translate(268px, 100px) rotate(270deg); }
          100% { transform: translate(280px, 130px) rotate(360deg); }
        }
        @keyframes hkt-swirl2 {
          0%   { transform: translate(280px, 130px) rotate(0deg); }
          25%  { transform: translate(310px, 110px) rotate(90deg); }
          50%  { transform: translate(300px, 84px) rotate(180deg); }
          75%  { transform: translate(268px, 100px) rotate(270deg); }
          100% { transform: translate(280px, 130px) rotate(360deg); }
        }
        @keyframes hkt-swirl3 {
          0%   { transform: translate(280px, 130px) rotate(0deg); }
          25%  { transform: translate(310px, 110px) rotate(90deg); }
          50%  { transform: translate(300px, 84px) rotate(180deg); }
          75%  { transform: translate(268px, 100px) rotate(270deg); }
          100% { transform: translate(280px, 130px) rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hkt-leaf1, .hkt-leaf2, .hkt-leaf3 { animation: none; transform: translate(290px, 108px); }
        }
      `}</style>
    </svg>
  );
}
