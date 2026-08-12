/**
 * 沙塵暴が来る。ゴビ砂漠とモンゴル高原からの砂ぼこりが北方の街を覆い、
 * 空が薄茶に染まる。自転車の荷台にも窓にも細かい灰色の層が積もる。
 *
 * 動くのは、街を横切る砂ぼこりの帯1つだけ。
 */
export function ChinaShachenbao() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 黄ばんだ空。 */}
      <rect width="400" height="210" fill="#c8a860" />
      <rect y="0" width="400" height="86" fill="#d8bc7a" />
      <circle cx="60" cy="44" r="24" fill="#e8d090" opacity="0.7" />

      {/* かすんだ遠景の建物。 */}
      <g fill="#b89858" opacity="0.8">
        <rect x="300" y="64" width="26" height="58" />
        <rect x="330" y="46" width="22" height="76" />
        <rect x="356" y="70" width="24" height="52" />
      </g>

      {/* 地面。 */}
      <rect y="122" width="400" height="88" fill="#a88848" />
      <rect y="122" width="400" height="4" fill="#bc9c5c" />

      {/* 街路樹。砂を被って葉先が灰色に。 */}
      <g strokeLinejoin="round">
        <rect x="63" y="140" width="6" height="30" fill="#7a5f38" stroke="#20364a" strokeWidth="1.6" />
        <ellipse cx="66" cy="132" rx="20" ry="14" fill="#8a9060" stroke="#20364a" strokeWidth="1.6" />
        <ellipse cx="66" cy="128" rx="18" ry="9" fill="#c8a860" opacity="0.6" />
      </g>

      {/* 停めた自転車。荷台に砂ぼこりが積もっている。 */}
      <g strokeLinejoin="round" strokeLinecap="round">
        <circle cx="150" cy="176" r="16" fill="none" stroke="#20364a" strokeWidth="2.6" />
        <circle cx="206" cy="176" r="16" fill="none" stroke="#20364a" strokeWidth="2.6" />
        <path d="M150,176 L172,150 L206,176 M172,150 L184,150 L188,176" fill="none" stroke="#4a4a52" strokeWidth="2.6" />
        <rect x="176" y="140" width="20" height="8" rx="2" fill="#8a1f1f" stroke="#20364a" strokeWidth="1.8" />
        <ellipse cx="186" cy="146" rx="24" ry="5" fill="#c8a860" opacity="0.85" />
      </g>

      {/* マスクを着けた人の横顔(簡略)。 */}
      <g strokeLinejoin="round">
        <circle cx="300" cy="150" r="13" fill="#d9a273" stroke="#20364a" strokeWidth="2" />
        <path d="M290,152 a10,7 0 0 0 20,0z" fill="#f6efe2" stroke="#20364a" strokeWidth="2" />
        <rect x="288" y="163" width="24" height="34" rx="4" fill="#3f8f6f" stroke="#20364a" strokeWidth="2" />
      </g>

      {/* 風に流れる砂ぼこりの帯。**ここだけが動く。** */}
      <g className="csb-dust" fill="#e8d090" opacity="0.55">
        <ellipse cx="70" cy="96" rx="70" ry="10" />
        <ellipse cx="230" cy="82" rx="90" ry="12" />
        <ellipse cx="370" cy="98" rx="60" ry="9" />
      </g>

      <style>{`
        .csb-dust {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: csb-drift 3.6s linear infinite;
        }
        @keyframes csb-drift {
          0% { transform: translateX(-30px); opacity: 0.3; }
          50% { opacity: 0.6; }
          100% { transform: translateX(30px); opacity: 0.3; }
        }
        @media (prefers-reduced-motion: reduce) {
          .csb-dust { animation: none; }
        }
      `}</style>
    </svg>
  );
}
