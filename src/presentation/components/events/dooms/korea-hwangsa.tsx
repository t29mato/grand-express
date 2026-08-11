/**
 * 黄砂が降る。空が薄い茶の色になり、外に出したものすべてに灰色の膜が張る。
 * マスクと空気清浄機のフィルターとフロントガラスの洗浄が、いっぺんに物入りになった。
 *
 * 人を描かず、**窓を拭く手とマスク**で「黄砂のせいで増えた仕事」を表す。
 * 動くのは、風に流れる砂ぼこりの帯1つだけ。
 */
export function KoreaHwangsa() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 黄ばんだ空。 */}
      <rect width="400" height="210" fill="#c8a860" />
      <rect y="0" width="400" height="90" fill="#d8bc7a" />
      <circle cx="330" cy="46" r="26" fill="#e8d090" opacity="0.7" />

      {/* かすんだ遠景の建物。 */}
      <g fill="#b89858" opacity="0.8">
        <rect x="30" y="70" width="26" height="60" />
        <rect x="64" y="54" width="22" height="76" />
        <rect x="300" y="66" width="24" height="64" />
      </g>

      {/* 地面。 */}
      <rect y="130" width="400" height="80" fill="#a88848" />
      <rect y="130" width="400" height="4" fill="#bc9c5c" />

      {/* 駐車した車。ボンネットに砂ぼこりが積もっている。 */}
      <g strokeLinejoin="round">
        <path d="M110,168 L124,144 L196,144 L214,168z" fill="#5b8fe8" stroke="#20364a" strokeWidth="2.5" />
        <rect x="108" y="166" width="110" height="20" rx="4" fill="#4a7bd0" stroke="#20364a" strokeWidth="2.5" />
        <circle cx="130" cy="188" r="10" fill="#241a10" />
        <circle cx="198" cy="188" r="10" fill="#241a10" />
        {/* 積もった砂ぼこり。 */}
        <ellipse cx="160" cy="150" rx="46" ry="6" fill="#c8a860" opacity="0.85" />
      </g>

      {/* 窓を拭く手と布。 */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <path d="M250,120 L268,150" stroke="#d9a273" strokeWidth="9" fill="none" />
        <rect x="252" y="112" width="30" height="20" rx="3" fill="#f6efe2" stroke="#20364a" strokeWidth="2" />
      </g>

      {/* マスクを着けた人の横顔(簡略)。 */}
      <g strokeLinejoin="round">
        <circle cx="320" cy="150" r="13" fill="#d9a273" stroke="#20364a" strokeWidth="2" />
        <path d="M310,152 a10,7 0 0 0 20,0z" fill="#f6efe2" stroke="#20364a" strokeWidth="2" />
        <rect x="308" y="163" width="24" height="34" rx="4" fill="#5b8fe8" stroke="#20364a" strokeWidth="2" />
      </g>

      {/* 風に流れる砂ぼこりの帯。**ここだけが動く。** */}
      <g className="khwa-dust" fill="#e8d090" opacity="0.55">
        <ellipse cx="60" cy="100" rx="70" ry="10" />
        <ellipse cx="220" cy="88" rx="90" ry="12" />
        <ellipse cx="360" cy="104" rx="60" ry="9" />
      </g>

      <style>{`
        .khwa-dust {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: khwa-drift 3.6s linear infinite;
        }
        @keyframes khwa-drift {
          0% { transform: translateX(-30px); opacity: 0.3; }
          50% { opacity: 0.6; }
          100% { transform: translateX(30px); opacity: 0.3; }
        }
        @media (prefers-reduced-motion: reduce) {
          .khwa-dust { animation: none; }
        }
      `}</style>
    </svg>
  );
}
