/**
 * 12月・クリスマスの市。
 *
 * 東部の大聖堂のまわりに木の小屋が並び、ホットワインの湯気が
 * 通りの端まで届く。もみの木には灯りが入り、雪が落ちてくる。
 * 手前の卓には、南部の十三のデザートが並べたままにしてある。
 */
export function France08() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 冬の夜空 */}
      <rect width="400" height="210" fill="#1b2a44" />
      <g fill="#f6efe2">
        <circle className="f08-star" cx="46" cy="16" r="1.5" />
        <circle className="f08-star f08-star2" cx="146" cy="10" r="1.3" />
        <circle className="f08-star f08-star3" cx="324" cy="14" r="1.5" />
      </g>

      {/* 大聖堂。塔が一本だけ高い */}
      <g transform="translate(214,138)">
        <rect x="-54" y="-72" width="108" height="72" fill="#2f4166" />
        <path d="M-54,-72 L54,-72 L40,-84 L-40,-84z" fill="#28385a" />
        <rect x="-52" y="-108" width="30" height="36" fill="#2f4166" />
        <path d="M-52,-108 L-22,-108 L-37,-132z" fill="#28385a" />
        <g fill="#f2c86a" opacity="0.85">
          <circle className="f08-rose" cx="0" cy="-44" r="13" />
        </g>
        <g fill="#3a4f7a">
          <path d="M-30,-30 q0,-16 10,-16 q10,0 10,16z" />
          <path d="M10,-30 q0,-16 10,-16 q10,0 10,16z" />
          <path d="M-43,-88 q0,-11 6,-11 q6,0 6,11z" />
        </g>
      </g>

      {/* もみの木。灯りがまたたく */}
      <g transform="translate(52,152)">
        <rect x="-4" y="-10" width="8" height="10" fill="#5a3f28" />
        <path d="M0,-84 L-24,-42 L24,-42z" fill="#1f4a33" />
        <path d="M0,-66 L-30,-20 L30,-20z" fill="#265a3d" />
        <path d="M0,-46 L-34,-8 L34,-8z" fill="#2d6b48" />
        <g>
          <circle className="f08-bulb" cx="-14" cy="-30" r="3.4" fill="#f5b31c" />
          <circle className="f08-bulb f08-bulb2" cx="12" cy="-36" r="3.4" fill="#e8443f" />
          <circle className="f08-bulb f08-bulb3" cx="-4" cy="-52" r="3.4" fill="#5b8fe8" />
          <circle className="f08-bulb f08-bulb4" cx="20" cy="-18" r="3.4" fill="#f5b31c" />
          <circle className="f08-bulb f08-bulb5" cx="-24" cy="-14" r="3.4" fill="#7bc86c" />
          <circle className="f08-bulb f08-bulb6" cx="4" cy="-68" r="3.4" fill="#e8443f" />
        </g>
      </g>

      {/* 雪の積もった地面 */}
      <rect y="152" width="400" height="58" fill="#3a4f78" />
      <rect y="152" width="400" height="8" fill="#e8eef6" />

      {/* 木の小屋。窓に灯りが入っている */}
      <g transform="translate(126,152)">
        <rect x="-40" y="-44" width="80" height="44" fill="#8a5f36" />
        <path d="M-48,-44 L48,-44 L36,-62 L-36,-62z" fill="#a8734a" />
        <path d="M-48,-44 L48,-44 L48,-38 L-48,-38z" fill="#f2f6fa" />
        <rect x="-28" y="-32" width="56" height="24" rx="2" fill="#f5cf6a" />
        <rect x="-28" y="-32" width="56" height="24" rx="2" fill="none" stroke="#6b4526" strokeWidth="3" />
        <g fill="#2d6b48">
          <circle cx="-30" cy="-46" r="4" />
          <circle cx="-14" cy="-48" r="4" />
          <circle cx="2" cy="-49" r="4" />
          <circle cx="18" cy="-48" r="4" />
          <circle cx="32" cy="-46" r="4" />
        </g>
      </g>
      <g transform="translate(320,152)">
        <rect x="-36" y="-40" width="72" height="40" fill="#8a5f36" />
        <path d="M-44,-40 L44,-40 L33,-57 L-33,-57z" fill="#a8734a" />
        <path d="M-44,-40 L44,-40 L44,-34 L-44,-34z" fill="#f2f6fa" />
        <rect x="-24" y="-30" width="48" height="22" rx="2" fill="#f5cf6a" />
        <rect x="-24" y="-30" width="48" height="22" rx="2" fill="none" stroke="#6b4526" strokeWidth="3" />
      </g>

      {/* ホットワインの大鍋と湯気 */}
      <g transform="translate(214,196)">
        <rect x="-30" y="-10" width="60" height="10" rx="2" fill="#8a5f36" />
        <path d="M-20,-10 q0,-22 20,-22 q20,0 20,22z" fill="#7a2b3a" />
        <ellipse cx="0" cy="-31" rx="20" ry="5" fill="#a33f52" />
        <path d="M-22,-24 q-8,-2 -8,-8" stroke="#5a1f2a" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M22,-24 q8,-2 8,-8" stroke="#5a1f2a" strokeWidth="3" fill="none" strokeLinecap="round" />
        <g fill="none" stroke="#e8eef6" strokeWidth="3" strokeLinecap="round" opacity="0.75">
          <path className="f08-steam" d="M-8,-36 q-6,-10 0,-18 q6,-8 1,-16" />
          <path className="f08-steam f08-steam2" d="M8,-36 q6,-10 0,-18 q-6,-8 -1,-16" />
        </g>
      </g>

      {/* 十三のデザートを並べた卓 */}
      <g transform="translate(66,200)">
        <rect x="-46" y="-10" width="92" height="7" rx="2" fill="#8a5f36" />
        <rect x="-46" y="-14" width="92" height="4" rx="2" fill="#f2f6fa" />
        <g>
          <circle cx="-38" cy="-18" r="4" fill="#e8c247" />
          <circle cx="-28" cy="-18" r="4" fill="#a8734a" />
          <circle cx="-18" cy="-18" r="4" fill="#e8443f" />
          <circle cx="-8" cy="-18" r="4" fill="#f5b31c" />
          <circle cx="2" cy="-18" r="4" fill="#7a4a2a" />
          <circle cx="12" cy="-18" r="4" fill="#e8c247" />
          <circle cx="22" cy="-18" r="4" fill="#c98fd0" />
          <circle cx="32" cy="-18" r="4" fill="#a8734a" />
          <circle cx="-33" cy="-27" r="4" fill="#f5b31c" />
          <circle cx="-23" cy="-27" r="4" fill="#e8443f" />
          <circle cx="-13" cy="-27" r="4" fill="#7bc86c" />
          <circle cx="-3" cy="-27" r="4" fill="#e8c247" />
          <circle cx="7" cy="-27" r="4" fill="#a8734a" />
        </g>
      </g>

      {/* 雪 */}
      <g fill="#f2f6fa">
        <circle className="f08-snow" cx="30" cy="0" r="2.6" />
        <circle className="f08-snow f08-s2" cx="86" cy="0" r="2.2" />
        <circle className="f08-snow f08-s3" cx="142" cy="0" r="2.8" />
        <circle className="f08-snow f08-s4" cx="196" cy="0" r="2.2" />
        <circle className="f08-snow f08-s5" cx="248" cy="0" r="2.6" />
        <circle className="f08-snow f08-s6" cx="300" cy="0" r="2.4" />
        <circle className="f08-snow f08-s7" cx="352" cy="0" r="2.8" />
        <circle className="f08-snow f08-s8" cx="382" cy="0" r="2.2" />
        <circle className="f08-snow f08-s9" cx="58" cy="0" r="2.4" />
        <circle className="f08-snow f08-s10" cx="170" cy="0" r="2.6" />
        <circle className="f08-snow f08-s11" cx="274" cy="0" r="2.2" />
        <circle className="f08-snow f08-s12" cx="118" cy="0" r="2.4" />
      </g>

      <style>{`
        .f08-star { animation: f08-twinkle 3.4s ease-in-out infinite; }
        .f08-star2 { animation-delay: 1.1s; }
        .f08-star3 { animation-delay: 2.2s; }
        .f08-rose { animation: f08-glow 4.4s ease-in-out infinite; }
        .f08-bulb { animation: f08-blink 2.6s ease-in-out infinite; }
        .f08-bulb2 { animation-delay: 0.42s; }
        .f08-bulb3 { animation-delay: 0.84s; }
        .f08-bulb4 { animation-delay: 1.26s; }
        .f08-bulb5 { animation-delay: 1.68s; }
        .f08-bulb6 { animation-delay: 2.1s; }
        .f08-steam {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: f08-rise 3.6s ease-in-out infinite;
        }
        .f08-steam2 { animation-delay: 1.2s; animation-duration: 4.2s; }
        .f08-snow {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: f08-fall 7s linear infinite backwards;
        }
        .f08-s2 { animation-delay: 0.6s; animation-duration: 8.2s; }
        .f08-s3 { animation-delay: 1.2s; animation-duration: 6.4s; }
        .f08-s4 { animation-delay: 1.8s; animation-duration: 7.6s; }
        .f08-s5 { animation-delay: 2.4s; animation-duration: 6.8s; }
        .f08-s6 { animation-delay: 3s; animation-duration: 8s; }
        .f08-s7 { animation-delay: 3.6s; animation-duration: 7.2s; }
        .f08-s8 { animation-delay: 4.2s; animation-duration: 6.6s; }
        .f08-s9 { animation-delay: 4.8s; animation-duration: 7.8s; }
        .f08-s10 { animation-delay: 5.4s; animation-duration: 6.2s; }
        .f08-s11 { animation-delay: 6s; animation-duration: 8.4s; }
        .f08-s12 { animation-delay: 2.1s; animation-duration: 7.4s; }
        @keyframes f08-twinkle {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 1; }
        }
        @keyframes f08-glow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes f08-blink {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes f08-rise {
          0% { transform: translateY(6px) scaleY(0.7); opacity: 0; }
          25% { opacity: 0.75; }
          75% { opacity: 0.4; }
          100% { transform: translateY(-12px) scaleY(1.25); opacity: 0; }
        }
        @keyframes f08-fall {
          0% { transform: translate(0, -14px); opacity: 0; }
          10% { opacity: 0.95; }
          85% { opacity: 0.95; }
          100% { transform: translate(-30px, 176px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .f08-star, .f08-rose, .f08-bulb, .f08-steam, .f08-snow { animation: none; }
        }
      `}</style>
    </svg>
  );
}
