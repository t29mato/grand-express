/**
 * 鉱夫市場で坑夫への手みやげを買う。コカの葉、炭酸飲料、そしてダイナマイトが
 * 同じ棚に普通に並んでいる。
 *
 * **動くものは1つだけ**——屋台に吊るしたランプが揺れる。
 * 減る話なので地色は暗くし、ランプの明かりだけが動く。
 *
 * 「ダイナマイトが普通に並ぶ」ことが話の芯なので、棚は**中央にいちばん大きく**
 * 置き、束ねた赤い筒と導火線を静物として見せる。
 */
export function MineGifts() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 坑口ちかくの通り。減る話なので暗い。 */}
      <rect width="400" height="210" fill="#2f2a33" />
      <path d="M0,84 L70,36 L140,84z" fill="#3d3540" />
      <path d="M120,84 L206,28 L292,84z" fill="#453b48" />
      <path d="M270,84 L338,42 L400,84z" fill="#3d3540" />
      {/* 坑口 */}
      <path d="M188,84 L188,58 a18,18 0 0 1 36,0 L224,84z" fill="#17141b" />
      <rect x="184" y="80" width="44" height="6" fill="#6b5a44" />
      <rect y="84" width="400" height="126" fill="#4a4038" />
      <rect y="84" width="400" height="4" fill="#5c5044" />

      {/* 屋台の骨組みと日よけ */}
      <rect x="70" y="72" width="6" height="80" fill="#6b4630" />
      <rect x="300" y="72" width="6" height="80" fill="#6b4630" />
      <rect x="60" y="60" width="256" height="10" fill="#8a5c38" />
      <rect x="60" y="70" width="256" height="6" fill="#6b4630" />

      {/* 品物の棚。手みやげの3種を並べる。 */}
      <rect x="96" y="150" width="196" height="10" fill="#8a5c38" />
      <rect x="96" y="160" width="196" height="30" fill="#6b4630" />
      <rect x="96" y="118" width="196" height="8" fill="#8a5c38" />

      {/* コカの葉の束 */}
      <g stroke="#2a2028" strokeWidth="2" strokeLinejoin="round">
        <path d="M110,150 q-8,-18 8,-24 q16,6 8,24z" fill="#4f9e4a" />
        <path d="M132,150 q-8,-16 7,-22 q15,6 7,22z" fill="#3f8a3c" />
      </g>
      {/* 炭酸飲料の瓶 */}
      <g stroke="#2a2028" strokeWidth="2" strokeLinejoin="round">
        <path d="M164,150 L164,132 L167,126 L173,126 L176,132 L176,150z" fill="#e8802f" />
        <rect x="166" y="122" width="8" height="5" fill="#b9c2cc" />
        <path d="M182,150 L182,132 L185,126 L191,126 L194,132 L194,150z" fill="#5b8fe8" />
        <rect x="184" y="122" width="8" height="5" fill="#b9c2cc" />
      </g>
      {/* ダイナマイトの束。この絵の芯。 */}
      <g stroke="#2a2028" strokeWidth="2" strokeLinejoin="round">
        <rect x="216" y="126" width="13" height="24" rx="2" fill="#c2443a" />
        <rect x="232" y="126" width="13" height="24" rx="2" fill="#d4544a" />
        <rect x="248" y="126" width="13" height="24" rx="2" fill="#c2443a" />
        <rect x="264" y="126" width="13" height="24" rx="2" fill="#d4544a" />
        <rect x="212" y="134" width="69" height="6" fill="#8a6a44" />
      </g>
      <g fill="none" stroke="#d8c9a8" strokeWidth="2.5" strokeLinecap="round">
        <path d="M222,126 q3,-12 12,-14" />
        <path d="M254,126 q4,-12 13,-13" />
      </g>

      {/* 売り子。棚の向こう側。**動かさない。** */}
      <g stroke="#2a2028" strokeWidth="2.5" strokeLinejoin="round">
        <rect x="112" y="92" width="46" height="58" rx="12" fill="#c2447a" />
        <rect x="118" y="112" width="34" height="38" rx="6" fill="#e8443f" />
        <circle cx="135" cy="76" r="15" fill="#d9a273" />
        <path d="M120,74 a15,15 0 0 1 30,0z" fill="#241c1a" />
        <ellipse cx="135" cy="64" rx="23" ry="5" fill="#3f3540" />
        <rect x="123" y="52" width="24" height="14" rx="3" fill="#3f3540" />
      </g>

      {/* 手みやげを選ぶ人。棚の手前。**動かさない。** */}
      <g stroke="#2a2028" strokeWidth="2.5" strokeLinejoin="round">
        <ellipse cx="332" cy="200" rx="30" ry="6" fill="#3d352e" stroke="none" />
        <rect x="318" y="160" width="13" height="40" rx="6" fill="#2f3b4f" />
        <rect x="336" y="160" width="13" height="40" rx="6" fill="#2f3b4f" />
        <rect x="312" y="104" width="44" height="62" rx="12" fill="#3b4a63" />
        <circle cx="334" cy="88" r="16" fill="#e8c39e" />
        <path d="M318,86 a16,16 0 0 1 32,0z" fill="#3b2f2a" />
        {/* 棚へ伸ばした腕 */}
        <g transform="translate(312,120) rotate(168)">
          <rect x="0" y="-7" width="42" height="14" rx="7" fill="#e8c39e" />
        </g>
        <circle cx="272" cy="128" r="8" fill="#e8c39e" />
      </g>

      {/* 吊りランプ。**ここだけが動く。**
          振り子なので、留め具のある上端を回転の中心にする。 */}
      <g className="mgft-lamp">
        <rect x="197" y="70" width="2.5" height="26" fill="#8a8279" />
        <path d="M188,96 L210,96 L206,116 L192,116z" fill="#6b5a44" stroke="#2a2028" strokeWidth="2" />
        <circle cx="199" cy="112" r="9" fill="#f5b31c" />
        <circle cx="199" cy="112" r="16" fill="#f5b31c" opacity="0.22" />
      </g>

      <style>{`
        .mgft-lamp {
          transform-box: fill-box;
          transform-origin: 50% 0;
          animation: mgft-swing 3s ease-in-out infinite alternate;
        }
        @keyframes mgft-swing {
          from { transform: rotate(-7deg); }
          to   { transform: rotate(7deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .mgft-lamp { animation: none; }
        }
      `}</style>
    </svg>
  );
}
