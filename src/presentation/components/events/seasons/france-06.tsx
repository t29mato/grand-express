/**
 * 10月・ぶどうの収穫。
 *
 * 夜明けの畝に人が入り、日が落ちるまで鋏を動かす。切られた房は
 * 背負い籠から木箱へ移され、箱はみるみる埋まっていく。
 * 丘の上には白い聖堂と、その北斜面の小さな畑(パリも自前のぶどうを穫る)。
 */
export function France06() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 明けたばかりの空 */}
      <defs>
        <linearGradient id="f06-dawn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6e86b8" />
          <stop offset="55%" stopColor="#d9a98c" />
          <stop offset="100%" stopColor="#f4d19a" />
        </linearGradient>
      </defs>
      <rect width="400" height="210" fill="url(#f06-dawn)" />
      <circle className="f06-sun" cx="330" cy="72" r="18" fill="#fbe4a8" />

      {/* 朝靄 */}
      <g fill="#f6e6d4" opacity="0.5">
        <ellipse className="f06-mist" cx="120" cy="102" rx="86" ry="10" />
        <ellipse className="f06-mist f06-mist2" cx="290" cy="110" rx="72" ry="9" />
      </g>

      {/* 丘の上の白い聖堂と、その北斜面のぶどう畑 */}
      <path d="M40,116 Q104,62 172,116z" fill="#7f8a5e" />
      <g transform="translate(106,80)">
        <rect x="-16" y="-6" width="32" height="24" fill="#f4f1e8" />
        <circle cx="0" cy="-12" r="12" fill="#faf8f2" />
        <circle cx="-16" cy="-2" r="7" fill="#f4f1e8" />
        <circle cx="16" cy="-2" r="7" fill="#f4f1e8" />
        <rect x="-1.5" y="-30" width="3" height="8" fill="#d8d2c4" />
      </g>
      <g stroke="#5e7040" strokeWidth="2.5" strokeLinecap="round">
        <path d="M58,112 l6,-9 M72,110 l6,-9 M86,110 l6,-9 M126,110 l6,-9 M140,110 l6,-9 M154,112 l6,-9" />
      </g>

      {/* 畑の地面 */}
      <rect y="114" width="400" height="96" fill="#8a7448" />
      <rect y="114" width="400" height="6" fill="#6f5c37" />

      {/* ぶどうの株。幹・葉・房のひと組を並べて畝にする。
          奥の列は小さく、手前の列は大きく置いて遠近をつける。 */}
      <defs>
        <g id="f06-vine">
          <rect x="-3" y="-18" width="6" height="18" fill="#5a3f28" />
          <path d="M0,-14 l-11,-6 M0,-11 l11,-7" stroke="#5a3f28" strokeWidth="3" strokeLinecap="round" />
          <circle cx="-10" cy="-28" r="10" fill="#4f7a34" />
          <circle cx="10" cy="-27" r="10" fill="#5f8c3e" />
          <circle cx="0" cy="-35" r="11" fill="#6b9c46" />
          <path d="M-13,-21 l5,13 l5,-13z" fill="#5a3369" />
          <path d="M5,-19 l5,12 l5,-12z" fill="#6d4682" />
        </g>
      </defs>

      {/* 奥の列 */}
      <g transform="translate(24,136) scale(0.6)">
        <use href="#f06-vine" />
      </g>
      <g transform="translate(76,136) scale(0.6)">
        <use href="#f06-vine" />
      </g>
      <g transform="translate(128,136) scale(0.6)">
        <use href="#f06-vine" />
      </g>
      <g transform="translate(180,136) scale(0.6)">
        <use href="#f06-vine" />
      </g>
      <g transform="translate(232,136) scale(0.6)">
        <use href="#f06-vine" />
      </g>
      <g transform="translate(284,136) scale(0.6)">
        <use href="#f06-vine" />
      </g>
      <g transform="translate(336,136) scale(0.6)">
        <use href="#f06-vine" />
      </g>
      <g transform="translate(388,136) scale(0.6)">
        <use href="#f06-vine" />
      </g>

      {/* 畝のあいだの土 */}
      <rect y="140" width="400" height="16" fill="#7d6840" />

      {/* 手前の列 */}
      <g transform="translate(16,172) scale(0.86)">
        <use href="#f06-vine" />
      </g>
      <g transform="translate(78,172) scale(0.86)">
        <use href="#f06-vine" />
      </g>
      <g transform="translate(140,172) scale(0.86)">
        <use href="#f06-vine" />
      </g>
      <g transform="translate(262,172) scale(0.86)">
        <use href="#f06-vine" />
      </g>
      <g transform="translate(324,172) scale(0.86)">
        <use href="#f06-vine" />
      </g>
      <g transform="translate(386,172) scale(0.86)">
        <use href="#f06-vine" />
      </g>

      {/* 摘み手。腰をかがめて鋏を動かす */}
      <g transform="translate(96,196)">
        <g className="f06-picker">
          <path d="M-14,0 L-11,-26 L11,-26 L14,0z" fill="#5b8fe8" />
          <circle cx="0" cy="-36" r="11" fill="#f6efe2" />
          <path d="M-12,-38 q12,-11 24,-1 q-3,-11 -12,-11 q-11,0 -12,12z" fill="#3b2f24" />
          <path className="f06-cut" d="M-10,-22 q-6,4 -7,9" stroke="#f6efe2" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M10,-22 q6,1 8,-6" stroke="#f6efe2" strokeWidth="5" strokeLinecap="round" fill="none" />
        </g>
        {/* 背負い籠 */}
        <g transform="translate(24,-36)">
          <path d="M-10,0 q0,20 10,20 q10,0 10,-20z" fill="#b98a3e" />
          <rect x="-11" y="-4" width="22" height="5" rx="2" fill="#9a6f2c" />
          <g fill="#5f3a72">
            <circle cx="-3" cy="2" r="4" />
            <circle cx="4" cy="4" r="4" />
          </g>
        </g>
      </g>
      <g transform="translate(214,200) scale(0.92)">
        <g className="f06-picker f06-picker2">
          <path d="M-14,0 L-11,-25 L11,-25 L14,0z" fill="#e8443f" />
          <circle cx="0" cy="-35" r="10.5" fill="#f6efe2" />
          <path d="M-11,-37 q11,-10 22,-1 q-3,-10 -11,-10 q-10,0 -11,11z" fill="#6b4326" />
          <path className="f06-cut f06-cut2" d="M-10,-21 q-6,4 -7,9" stroke="#f6efe2" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M10,-21 q6,1 7,-5" stroke="#f6efe2" strokeWidth="5" strokeLinecap="round" fill="none" />
        </g>
      </g>

      {/* 木箱。房が落ちてきて埋まっていく */}
      <g transform="translate(324,200)">
        <rect x="-32" y="-22" width="64" height="22" rx="2" fill="#b98a3e" />
        <rect x="-32" y="-22" width="64" height="5" rx="2" fill="#9a6f2c" />
        <g stroke="#9a6f2c" strokeWidth="2">
          <path d="M-16,-17 v17 M0,-17 v17 M16,-17 v17" />
        </g>
        <g fill="#5f3a72">
          <path d="M-26,-26 l8,12 l8,-12z" />
          <path d="M-8,-26 l8,12 l8,-12z" />
          <path className="f06-fall" d="M10,-26 l8,12 l8,-12z" />
          <path className="f06-fall f06-fall2" d="M-18,-36 l8,12 l8,-12z" />
        </g>
      </g>

      <style>{`
        .f06-sun {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: f06-rise 12s ease-in-out infinite;
        }
        .f06-mist { animation: f06-roll 14s ease-in-out infinite; }
        .f06-mist2 { animation-delay: 3.5s; animation-duration: 11s; }
        .f06-picker {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: f06-stoop 3.2s ease-in-out infinite;
        }
        .f06-picker2 { animation-delay: 0.9s; animation-duration: 3.8s; }
        .f06-cut {
          transform-box: fill-box; transform-origin: 100% 0;
          animation: f06-snip 0.8s ease-in-out infinite;
        }
        .f06-cut2 { animation-delay: 0.35s; animation-duration: 0.95s; }
        .f06-fall {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: f06-tumble 4.4s ease-in infinite backwards;
        }
        .f06-fall2 { animation-delay: 2.2s; animation-duration: 5s; }
        @keyframes f06-rise {
          0%, 100% { transform: translateY(6px); opacity: 0.8; }
          50% { transform: translateY(-8px); opacity: 1; }
        }
        @keyframes f06-roll {
          0%, 100% { transform: translateX(0); opacity: 0.35; }
          50% { transform: translateX(34px); opacity: 0.6; }
        }
        @keyframes f06-stoop {
          0%, 100% { transform: rotate(-6deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes f06-snip {
          0%, 100% { transform: rotate(-10deg); }
          50% { transform: rotate(14deg); }
        }
        @keyframes f06-tumble {
          0% { transform: translate(-13px, -26px) rotate(-40deg); opacity: 0; }
          14% { opacity: 1; }
          70% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .f06-sun, .f06-mist, .f06-picker, .f06-cut, .f06-fall { animation: none; }
        }
      `}</style>
    </svg>
  );
}
