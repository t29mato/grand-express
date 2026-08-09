/**
 * 足跡が水を溜める。昨日渡った畑が、今朝は池になっている。迂回する道はない。
 *
 * この盤面の厄災の神は**ダイダラボウ**——足跡が湖や沼になったという巨人。
 * 盤面の絵文字が 👣 なのもそのため。**巨人そのものは描かず、足跡だけを描く。**
 * 姿を出すと怖い絵になるうえ、伝承の見せかたとしても足跡のほうが強い。
 *
 * **動くものは1つだけ**——足跡に溜まった水に波紋が広がる。
 */
export function IbarakiAshiatoNuma() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜明けの平野。災難なので低く暗い空。 */}
      <rect width="400" height="210" fill="#3a4258" />
      <rect y="46" width="400" height="26" fill="#4a5266" />
      <circle cx="330" cy="44" r="18" fill="#e8dcc0" opacity="0.5" />
      <rect y="86" width="400" height="124" fill="#4a5a3c" />
      <rect y="86" width="400" height="4" fill="#5a6b48" />

      {/* 畑の畝。静物。 */}
      <g stroke="#3f4d33" strokeWidth="3">
        <line x1="0" y1="112" x2="400" y2="108" />
        <line x1="0" y1="132" x2="400" y2="126" />
        <line x1="0" y1="196" x2="400" y2="188" />
      </g>

      {/* 昨日まで通れた道。池のふちで切れている。 */}
      <path d="M0,168 L108,156 L120,182 L0,196z" fill="#8a7a58" />

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

      {/* 立ち尽くす人。道が消えている側に立たせる。 */}
      <g stroke="#232b3a" strokeWidth="2.5" strokeLinejoin="round">
        <ellipse cx="66" cy="186" rx="24" ry="5" fill="#3f4d33" stroke="none" />
        <rect x="56" y="158" width="10" height="28" rx="5" fill="#2f3b4f" />
        <rect x="68" y="158" width="10" height="28" rx="5" fill="#2f3b4f" />
        <rect x="52" y="122" width="30" height="40" rx="9" fill="#e05252" />
        <circle cx="67" cy="110" r="12" fill="#d9a273" />
        <path d="M55,108 a12,12 0 0 1 24,0z" fill="#241c1a" />
        {/* 池のほうへ差し出した手 */}
        <g transform="translate(80,132) rotate(-14)">
          <rect x="0" y="-5" width="30" height="10" rx="5" fill="#d9a273" />
        </g>
        <circle cx="111" cy="139" r="6" fill="#d9a273" />
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
