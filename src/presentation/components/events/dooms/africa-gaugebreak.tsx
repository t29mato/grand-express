/**
 * 軌間の壁。幅の違う線路が向かい合って途切れ、貨物は渡し板を
 * すべって積み替えられる。落ちて割れた木箱から果実が転がり、荷が傷む。
 *
 * 動くのは3つ: 渡し板をすべる木箱、押す作業員の前後の動き、
 * 割れ箱の上を回る虫。止めても「二つの貨車・渡し板・割れた箱」で伝わる。
 */
export function AfricaGaugebreak() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 昼下がりの操車場。 */}
      <rect width="400" height="210" fill="#c4a878" />
      <rect width="400" height="86" fill="#a8ccd8" />
      <g fill="#e6eee8" opacity="0.85">
        <ellipse cx="120" cy="30" rx="34" ry="9" />
        <ellipse cx="330" cy="42" rx="26" ry="7" />
      </g>

      {/* 中景: 倉庫と給水塔。 */}
      <rect x="20" y="52" width="90" height="34" fill="#8a7a62" />
      <path d="M14,52 h102 l-14,-14 h-74z" fill="#6b5f4a" />
      <rect x="52" y="66" width="22" height="20" fill="#4a4436" />
      <g stroke="#6b5a44" strokeWidth="3" fill="none">
        <path d="M348,86 l4,-26 M372,86 l-4,-26 M350,74 h20" />
      </g>
      <path d="M342,60 h36 v-16 h-36z" fill="#c9a877" />
      <path d="M339,44 h42 l-21,-9z" fill="#8a6a42" />

      {/* 左: 広軌の線路と高い貨車。 */}
      <g>
        <rect x="0" y="140" width="150" height="10" fill="#a08a58" opacity="0.7" />
        {Array.from({ length: 5 }).map((_, i) => (
          <rect key={i} x={4 + i * 30} y="141" width="15" height="7" fill="#6b5a44" />
        ))}
        <rect x="0" y="138" width="146" height="4" fill="#4a4640" />
        <path d="M146,152 l10,-14" stroke="#8a4a3a" strokeWidth="4" fill="none" />
        <rect x="20" y="94" width="104" height="44" fill="#5f7f5a" />
        <rect x="20" y="94" width="104" height="5" fill="#3a4a38" />
        <rect x="96" y="100" width="28" height="38" fill="#4a6448" />
        <circle cx="44" cy="140" r="6" fill="#2e2a26" />
        <circle cx="100" cy="140" r="6" fill="#2e2a26" />
      </g>

      {/* 右: 狭軌の線路と低い貨車。 */}
      <g>
        <rect x="250" y="164" width="150" height="9" fill="#a08a58" opacity="0.7" />
        {Array.from({ length: 5 }).map((_, i) => (
          <rect key={i} x={256 + i * 30} y="165" width="10" height="6" fill="#6b5a44" />
        ))}
        <rect x="254" y="162" width="146" height="3.6" fill="#4a4640" />
        <path d="M254,176 l-10,-14" stroke="#8a4a3a" strokeWidth="4" fill="none" />
        <rect x="276" y="126" width="100" height="36" fill="#8a4a3a" />
        <rect x="276" y="126" width="100" height="5" fill="#5a3026" />
        <rect x="276" y="132" width="26" height="30" fill="#6b3a2c" />
        <circle cx="300" cy="164" r="5.5" fill="#2e2a26" />
        <circle cx="352" cy="164" r="5.5" fill="#2e2a26" />
      </g>

      {/* 渡し板と、すべり降りる木箱。 */}
      <path d="M124,112 L278,140 l-2,7 L122,119z" fill="#c9a877" />
      <path d="M124,112 L278,140" stroke="#8a6a42" strokeWidth="2" fill="none" />
      <g className="africa-gb-crate">
        <g transform="rotate(10 176 112)">
          <rect x="162" y="100" width="28" height="22" fill="#d8b070" />
          <path d="M162,100 l28,22 M190,100 l-28,22" stroke="#8a6a42" strokeWidth="2" />
          <rect x="162" y="100" width="28" height="22" fill="none" stroke="#8a6a42" strokeWidth="2.4" />
        </g>
      </g>

      {/* 作業員。黄シャツに緑の帽子、箱を送り出す。 */}
      <g transform="translate(140,0)">
        <g className="africa-gb-porter">
          <circle cx="0" cy="84" r="7.5" fill="#4a3424" />
          <path d="M-7,80 a7,4 0 0 1 14,0z" fill="#3f8f5a" />
          <path d="M0,92 q-2,13 -1,26" stroke="#e8b020" strokeWidth="10" fill="none" />
          <path d="M-2,118 l-6,18 M0,118 l6,17" stroke="#5a4a3a" strokeWidth="5" fill="none" />
          <path d="M2,96 q11,3 20,10" stroke="#e8b020" strokeWidth="5" fill="none" />
        </g>
      </g>

      {/* 落ちて割れた箱と転がる果実、傷んだ荷にたかる虫。 */}
      <g transform="translate(196,0)">
        <path d="M-16,186 l14,-12 16,4 2,12 -18,6z" fill="#c9a877" />
        <path d="M-10,180 l20,2" stroke="#8a6a42" strokeWidth="2" />
        <path d="M6,174 l12,-8 6,10 -8,8z" fill="#b8935f" />
        <g fill="#e8944a">
          <circle cx="-24" cy="196" r="5" />
          <circle cx="-8" cy="200" r="5" />
          <circle cx="10" cy="197" r="5" />
          <circle cx="24" cy="203" r="5" />
        </g>
        <g fill="#c96f2a">
          <path d="M-26,193 q2,-3 4,0z" />
          <path d="M8,194 q2,-3 4,0z" />
        </g>
        <g className="africa-gb-fly">
          <circle cx="-2" cy="184" r="1.8" fill="#2e2a26" />
        </g>
      </g>

      <style>{`
        .africa-gb-crate {
          animation: africa-gb-slide 3.4s ease-in infinite;
        }
        @keyframes africa-gb-slide {
          0% { transform: translate(0, 0); opacity: 0; }
          12% { opacity: 1; }
          70% { transform: translate(96px, 18px); opacity: 1; }
          82% { transform: translate(112px, 22px); opacity: 0; }
          100% { transform: translate(112px, 22px); opacity: 0; }
        }
        .africa-gb-porter {
          transform-box: fill-box;
          transform-origin: 40% 92%;
          animation: africa-gb-push 3.4s ease-in-out infinite;
        }
        @keyframes africa-gb-push {
          0%, 100% { transform: rotate(0deg); }
          12% { transform: rotate(10deg) translateX(3px); }
          30% { transform: rotate(2deg); }
        }
        .africa-gb-fly {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: africa-gb-buzz 2.2s linear infinite;
        }
        @keyframes africa-gb-buzz {
          0% { transform: translate(0, 0); }
          25% { transform: translate(8px, -7px); }
          50% { transform: translate(-3px, -12px); }
          75% { transform: translate(-9px, -5px); }
          100% { transform: translate(0, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .africa-gb-crate,
          .africa-gb-porter,
          .africa-gb-fly { animation: none; }
        }
      `}</style>
    </svg>
  );
}
