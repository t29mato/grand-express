/**
 * 焼き畑「チャケオ」の煙で滑走路が閉じ、予定に無い宿代がかさむ。
 *
 * **動くものは1つだけ**——地平の火からひと筋の煙がのぼる。
 *
 * 減る話なので空を煙で濁らせた。飛べない小型機と、荷物を置いて待つ旅人、
 * 閉鎖の柵を静物で置いて「足止め」を作っている。
 */
export function ChaqueoSmoke() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 煙で濁った空。上から下へ色を変えて霞ませる。 */}
      <rect width="400" height="210" fill="#a8763c" />
      <rect y="40" width="400" height="34" fill="#b8843f" opacity="0.7" />
      <circle cx="316" cy="52" r="22" fill="#e8a24a" />
      {/* 地平で燃えている畑。静物。 */}
      <rect y="104" width="400" height="106" fill="#8a6a45" />
      <rect y="104" width="400" height="4" fill="#9c7a50" />
      {/* 焼けた畑。画面いっぱいに帯を敷くと道に見えたので、火のまわりだけにする。 */}
      <path d="M0,104 L136,104 L124,92 L0,92z" fill="#3f342a" />
      {/* 燃えている火。小さいと虹や傘に見えるので、舌を3つ重ねて大きく出す。 */}
      <g stroke="#2a2028" strokeWidth="2" strokeLinejoin="round">
        <path d="M18,96 C20,58 62,54 70,96 C60,74 30,74 18,96z" fill="#c2443a" />
        <path d="M28,96 C30,66 56,64 62,96 C54,78 36,78 28,96z" fill="#e8802f" />
        <path d="M38,96 C39,74 52,74 54,96z" fill="#f5b31c" />
      </g>

      {/* 滑走路。閉じている。 */}
      <path d="M0,150 L400,138 L400,178 L0,192z" fill="#4a4750" />
      <g fill="#c9c4b4">
        <rect x="40" y="167" width="30" height="5" />
        <rect x="110" y="164" width="30" height="5" />
        <rect x="180" y="162" width="30" height="5" />
        <rect x="250" y="159" width="30" height="5" />
      </g>
      {/* 閉鎖の柵。静物。 */}
      <g stroke="#2a2028" strokeWidth="2.5" strokeLinejoin="round">
        <rect x="96" y="150" width="8" height="44" fill="#8a8279" />
        <rect x="216" y="147" width="8" height="44" fill="#8a8279" />
        <rect x="96" y="152" width="128" height="11" fill="#e8443f" />
        <rect x="122" y="152" width="14" height="11" fill="#f6efe2" />
        <rect x="158" y="152" width="14" height="11" fill="#f6efe2" />
        <rect x="194" y="152" width="14" height="11" fill="#f6efe2" />
      </g>

      {/* 飛べない小型機。柵の向こうに止まっている。静物。 */}
      <g stroke="#2a2028" strokeWidth="2.5" strokeLinejoin="round">
        {/* 胴。機首を左にして、尾へ細くする。 */}
        <path d="M254,122 q14,-14 46,-14 L344,108 q22,2 22,14 q0,12 -22,14 L300,136 q-32,0 -46,-14z" fill="#e8ddc4" />
        {/* 尾翼。胴の後ろ上に立てる。 */}
        <path d="M344,110 L372,76 L380,110z" fill="#dcd0b4" />
        <path d="M352,122 L378,122 L370,132z" fill="#c9bda0" />
        {/* 主翼。胴の下へ斜めに出す。 */}
        <path d="M292,126 L268,152 L318,146 L322,128z" fill="#c9bda0" />
        {/* 操縦席の窓。丸を2つ並べると目に見えるので、front を四角にする。 */}
        <path d="M262,118 L280,116 L280,126 L262,126z" fill="#5b8fe8" />
        <rect x="300" y="116" width="9" height="8" rx="2" fill="#5b8fe8" />
        <rect x="316" y="115" width="9" height="8" rx="2" fill="#5b8fe8" />
        {/* 脚 */}
        <rect x="276" y="134" width="4" height="12" fill="#8a8279" />
        <circle cx="278" cy="150" r="6" fill="#3d3a42" />
        <rect x="330" y="132" width="4" height="12" fill="#8a8279" />
        <circle cx="332" cy="148" r="6" fill="#3d3a42" />
      </g>

      {/* 荷物を置いて待つ旅人。**動かさない。** */}
      <g stroke="#2a2028" strokeWidth="2.5" strokeLinejoin="round">
        <ellipse cx="146" cy="200" rx="34" ry="6" fill="#6b5033" stroke="none" />
        <rect x="132" y="164" width="13" height="36" rx="6" fill="#2f3b4f" />
        <rect x="149" y="164" width="13" height="36" rx="6" fill="#2f3b4f" />
        <rect x="126" y="112" width="44" height="58" rx="12" fill="#3b4a63" />
        <circle cx="148" cy="96" r="16" fill="#e8c39e" />
        <path d="M132,94 a16,16 0 0 1 32,0z" fill="#3b2f2a" />
        {/* 荷物の柄に置いた腕 */}
        <g transform="translate(126,126) rotate(150)">
          <rect x="0" y="-7" width="34" height="14" rx="7" fill="#e8c39e" />
        </g>
        <circle cx="98" cy="142" r="8" fill="#e8c39e" />
        {/* 旅行鞄 */}
        <rect x="72" y="152" width="46" height="38" rx="4" fill="#8a5c38" />
        <rect x="72" y="166" width="46" height="6" fill="#6b4630" />
        <path d="M86,152 L86,144 L104,144 L104,152" fill="none" stroke="#2a2028" strokeWidth="3" />
      </g>

      {/* 立ちのぼる煙。**ここだけが動く。** */}
      <ellipse
        className="chqo-smoke"
        cx="44"
        cy="58"
        rx="15"
        ry="12"
        fill="#7a6a5e"
        opacity="0.85"
      />

      <style>{`
        .chqo-smoke {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: chqo-rise 3.4s ease-out infinite;
        }
        @keyframes chqo-rise {
          0%   { transform: translate(0, 20px) scale(0.28); opacity: 0.15; }
          30%  { opacity: 0.8; }
          100% { transform: translate(28px, -76px) scale(1.9); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .chqo-smoke { animation: none; }
        }
      `}</style>
    </svg>
  );
}
