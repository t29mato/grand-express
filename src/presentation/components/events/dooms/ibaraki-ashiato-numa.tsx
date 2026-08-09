/**
 * 足跡が水を溜める。昨日渡った畑が、今朝は池になっている。迂回する道はない。
 *
 * この盤面の厄災の神は**ダイダラボウ**——足跡が湖や沼になったという巨人。
 * 盤面の絵文字が 👣 なのもそのため。**巨人そのものは描かず、足跡だけを描く。**
 * 姿を出すと怖い絵になるうえ、伝承の見せかたとしても足跡のほうが強い。
 *
 * ## 描き直しでやったこと
 *
 * **足跡と切れた道はそのまま。**そこは効いていた。直したのは人と背景である。
 *
 * - 人が7枚とも同じ赤いシャツの立ち姿だったので、**天秤棒で荷を担いだ人**にした。
 *   肩を横切る棒と、両端に下がった籠で、遠目にも他と見分けがつく
 * - 空と地面だけだった背景に、竹林・遠くの家並み・電柱・畝・道標を入れた
 * - **鷺を一羽、池に立たせた。**ひと晩でできた池にもう鳥が来ている、という形で
 *   「これはもう元に戻らない」を出す
 *
 * **動くものは1つだけ**——足跡に溜まった水に波紋が広がる。
 */
export function IbarakiAshiatoNuma() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜明けの平野。災難なので低く暗い空。 */}
      <rect width="400" height="210" fill="#3a4258" />
      <rect y="30" width="400" height="20" fill="#454d64" />
      <rect y="50" width="400" height="16" fill="#565a6c" />
      <circle cx="332" cy="40" r="17" fill="#e8dcc0" opacity="0.6" />

      {/* 遠くの林と家並み。 */}
      <rect y="66" width="400" height="6" fill="#2c3a2a" />
      <g fill="#35402f">
        <ellipse cx="150" cy="65" rx="26" ry="8" />
        <ellipse cx="236" cy="64" rx="22" ry="7" />
        <ellipse cx="352" cy="65" rx="24" ry="8" />
      </g>
      <g fill="#2e3444">
        <path d="M188,66 L200,56 L212,66z" />
        <rect x="192" y="62" width="16" height="4" />
        <path d="M292,66 L302,57 L312,66z" />
      </g>
      {/* 電柱の列。 */}
      <g stroke="#4c4534" strokeWidth="2.5" strokeLinecap="round">
        <path d="M366,74 L366,44" />
        <path d="M358,50 L374,50" />
        <path d="M312,78 L312,52" />
        <path d="M306,57 L318,57" />
      </g>

      {/* 竹林。この平野に多い。細い縦の線が入ると、平らな帯でなくなる。 */}
      <g stroke="#4a6b3c" strokeWidth="2.5" strokeLinecap="round" fill="none">
        <path d="M10,90 L14,20" />
        <path d="M26,90 L28,28" />
        <path d="M42,90 L40,16" />
        <path d="M56,90 L60,32" />
      </g>
      {/* 葉は**小さく細く、竿に沿って何枚も。**大きな丸を頂に載せたら、
          竹ではなく傘のような木に見えた。 */}
      <g stroke="#3f5c34" strokeWidth="2.5" strokeLinecap="round" fill="none">
        <path d="M14,24 l-11,-7 M14,30 l-12,-4 M14,26 l11,-8 M14,34 l12,-5" />
        <path d="M28,32 l-10,-6 M28,38 l-11,-3 M28,34 l10,-7 M28,42 l11,-4" />
        <path d="M40,20 l-11,-7 M40,26 l-12,-3 M40,22 l11,-8 M40,30 l12,-4" />
        <path d="M60,36 l-10,-6 M60,42 l-11,-3 M60,38 l10,-7 M60,46 l11,-4" />
        <path d="M20,52 l-11,-5 M20,58 l-10,-2 M34,58 l10,-5 M34,64 l11,-3" />
      </g>

      {/* 平野。 */}
      <rect y="72" width="400" height="138" fill="#4a5a3c" />
      <rect y="72" width="400" height="4" fill="#5a6b48" />
      <g stroke="#3f4d33" strokeWidth="3" fill="none">
        <path d="M0,102 L400,96" />
        <path d="M0,122 L400,114" />
        <path d="M0,198 L400,186" />
      </g>

      {/* 昨日まで通れた道。池のふちで切れている。 */}
      <path d="M0,168 L108,156 L120,182 L0,196z" fill="#8a7a58" />
      <path d="M0,170 L106,159 L107,163 L0,174z" fill="#9c8c66" />
      {/* 道標。ここが道だったと示す静物。 */}
      <g stroke="#241f18" strokeWidth="2" strokeLinejoin="round">
        <path d="M118,148 L130,146 L131,170 L119,172z" fill="#8a8f99" />
        <path d="M118,148 L130,146 L124,140z" fill="#9aa0a8" />
      </g>

      {/* ダイダラボウの足跡。ひと晩で池になった。 */}
      <g stroke="#2b3348" strokeWidth="3" strokeLinejoin="round">
        <path
          d="M124,158 C112,132 132,112 160,110 C196,108 236,116 262,130 C288,144 286,172 258,182 C222,194 156,190 124,158z"
          fill="#41556b"
        />
        {/* 指のあと。5つ並べると足跡だと分かる。 */}
        <ellipse cx="176" cy="102" rx="12" ry="9" fill="#41556b" />
        <ellipse cx="204" cy="97" rx="11" ry="8" fill="#41556b" />
        <ellipse cx="230" cy="98" rx="10" ry="8" fill="#41556b" />
        <ellipse cx="252" cy="104" rx="9" ry="7" fill="#41556b" />
        <ellipse cx="270" cy="114" rx="8" ry="6" fill="#41556b" />
      </g>
      {/* 空を映す水面。静物。 */}
      <ellipse cx="196" cy="150" rx="58" ry="20" fill="#54708a" opacity="0.55" />

      {/* もう来ている鷺。**ひと晩でできた池が、もう戻らない**ことを静物で示す。 */}
      <g strokeLinejoin="round" strokeLinecap="round">
        <ellipse cx="272" cy="176" rx="14" ry="3" fill="#33455a" />
        <path d="M268,174 L269,156" stroke="#c8ae6a" strokeWidth="2.5" fill="none" />
        <path d="M275,174 L274,156" stroke="#c8ae6a" strokeWidth="2.5" fill="none" />
        <ellipse cx="272" cy="150" rx="13" ry="7" fill="#e0dcd0" />
        <path d="M278,146 L284,126" stroke="#e0dcd0" strokeWidth="4" fill="none" />
        <circle cx="285" cy="124" r="4.5" fill="#e0dcd0" />
        <path d="M289,123 L300,126 L289,128z" fill="#c8ae6a" />
      </g>

      {/* 天秤棒で荷を担いで来て、道が切れているところで止まった人。
          **肩を横切る棒**が他の6枚に無い形なので、遠目でも見分けがつく。 */}
      <g strokeLinejoin="round" strokeLinecap="round">
        <ellipse cx="104" cy="192" rx="28" ry="6" fill="#3f4d33" />
        <path d="M98,166 L94,190" stroke="#3d3a42" strokeWidth="10" fill="none" />
        <path d="M110,166 L116,190" stroke="#2f2c34" strokeWidth="10" fill="none" />
        <path d="M104,134 L104,168" stroke="#8a5f3c" strokeWidth="24" fill="none" />
        <path d="M94,146 L116,148 L114,166 L92,164z" fill="#6f4a2c" />
        <circle cx="104" cy="118" r="11" fill="#d9a273" stroke="#3a3228" strokeWidth="2" />
        {/* 頬かむり。**帯ではなく、頭の上半分を覆う形にする。**
            この絵の人には目を描いていないので、顔を横切る白い帯は目隠しに見えた。 */}
        <path d="M93,119 a11,11 0 0 1 22,0z" fill="#e0dcd0" stroke="#3a3228" strokeWidth="2" />
        <path d="M113,116 l7,4 l-7,3z" fill="#e0dcd0" stroke="#3a3228" strokeWidth="2" />
        {/* 天秤棒と、下がった籠。 */}
        <path d="M64,128 L146,122" stroke="#6b5238" strokeWidth="5" fill="none" />
        <g stroke="#4a3c2c" strokeWidth="2" fill="none">
          <path d="M70,127 L70,146" />
          <path d="M140,123 L140,142" />
        </g>
        <g stroke="#241f18" strokeWidth="2.5">
          <path d="M58,146 L84,146 L79,166 L63,166z" fill="#a8875a" />
          <path d="M128,142 L154,142 L149,162 L133,162z" fill="#96784c" />
          <path d="M60,154 L82,154" stroke="#8a6f42" />
          <path d="M130,150 L152,150" stroke="#7a5f3a" />
        </g>
        {/* 棒に掛けた手。 */}
        <path d="M100,132 L88,126" stroke="#d9a273" strokeWidth="8" fill="none" />
        <circle cx="86" cy="125" r="5.5" fill="#d9a273" />
      </g>

      {/* 広がる波紋。**ここだけが動く。** */}
      <ellipse
        className="iasn-ripple"
        cx="196"
        cy="150"
        rx="26"
        ry="9"
        fill="none"
        stroke="#a8c4d8"
        strokeWidth="2.5"
      />

      <style>{`
        .iasn-ripple {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: iasn-spread 3.2s ease-out infinite;
        }
        @keyframes iasn-spread {
          0%   { transform: scale(0.25); opacity: 0.9; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .iasn-ripple { animation: none; }
        }
      `}</style>
    </svg>
  );
}
