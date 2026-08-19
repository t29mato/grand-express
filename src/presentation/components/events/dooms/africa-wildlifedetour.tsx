/**
 * 保護区の迂回。夜のサバンナでゾウの家族が線路を渡り、
 * 夜行列車は手前で停まって迂回線へ逸れるほかない。
 *
 * 動くのは3つ: ゆっくり線路を渡るゾウの家族、機関車の前照灯の明滅、
 * またたく星。止めても「線路上のゾウと停まった列車」で伝わる。
 * 動物は伝承ではなく実景として、脅かさず静かに描く。
 */
export function AfricaWildlifedetour() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜のサバンナの空と月。 */}
      <rect width="400" height="210" fill="#2a3050" />
      <rect width="400" height="84" fill="#20263f" />
      <circle cx="70" cy="40" r="15" fill="#e8e4d0" />
      <circle cx="64" cy="36" r="3.4" fill="#cfc9b4" opacity="0.6" />
      <g className="africa-wd-stars" fill="#e8e4d0">
        <circle cx="140" cy="26" r="1.5" />
        <circle cx="210" cy="44" r="1.2" />
        <circle cx="266" cy="20" r="1.6" />
        <circle cx="330" cy="38" r="1.3" />
        <circle cx="376" cy="60" r="1.2" />
        <circle cx="106" cy="60" r="1.2" />
      </g>

      {/* 中景: 平頂アカシアの影絵と草原の起伏。 */}
      <path d="M0,120 q100,-14 200,-6 q110,8 200,-4 v20 H0z" fill="#232840" />
      <g fill="#171c30">
        <path d="M52,116 q0,-10 -3,-15 M52,116 q2,-11 5,-15" stroke="#171c30" strokeWidth="3" fill="none" />
        <path d="M36,102 q16,-11 32,0 q-6,6 -16,6 t-16,-6z" />
        <path d="M348,112 q0,-8 -2,-12 M348,112 q1,-9 4,-12" stroke="#171c30" strokeWidth="2.6" fill="none" />
        <path d="M336,100 q12,-9 26,0 q-5,5 -13,5 t-13,-5z" />
      </g>

      {/* 地面と本線・迂回線。 */}
      <rect y="132" width="400" height="78" fill="#39324a" />
      <path d="M0,168 h400 v10 H0z" fill="#443c54" opacity="0.8" />
      {Array.from({ length: 14 }).map((_, i) => (
        <rect key={i} x={6 + i * 29} y="169" width="12" height="7" fill="#2c2438" />
      ))}
      <rect y="166" width="400" height="3.6" fill="#5f5870" />
      {/* 迂回線が右奥へ逸れる。 */}
      <path d="M240,167 q70,-8 140,-26" stroke="#5f5870" strokeWidth="3" fill="none" />
      <path d="M252,172 q70,-10 136,-24" stroke="#5f5870" strokeWidth="2.4" fill="none" opacity="0.8" />
      {/* 分岐標識。 */}
      <g>
        <rect x="236" y="140" width="3.4" height="28" fill="#8a8478" />
        <path d="M239,141 l16,5 -16,5z" fill="#f5b31c" />
      </g>

      {/* 停まった夜行列車(左)。前照灯だけが明るい。 */}
      <g>
        <rect x="0" y="126" width="112" height="40" rx="4" fill="#3f4a6b" />
        <rect x="0" y="126" width="112" height="7" fill="#8a94b8" />
        <g fill="#f5d06a" opacity="0.9">
          <rect x="12" y="138" width="13" height="10" rx="1.5" />
          <rect x="34" y="138" width="13" height="10" rx="1.5" />
          <rect x="56" y="138" width="13" height="10" rx="1.5" />
        </g>
        <path d="M112,126 q9,14 7,40 h-7z" fill="#3f4a6b" />
        <circle cx="24" cy="168" r="6" fill="#1c2026" />
        <circle cx="56" cy="168" r="6" fill="#1c2026" />
        <circle cx="92" cy="168" r="6" fill="#1c2026" />
        <g className="africa-wd-light">
          <circle cx="115" cy="150" r="4.4" fill="#f5d06a" />
          <path d="M119,145 L188,136 L188,164 L119,156z" fill="#f5d06a" opacity="0.2" />
        </g>
      </g>

      {/* 線路を渡るゾウの家族。**ここが主に動く。** */}
      <g className="africa-wd-herd">
        {/* 母ゾウ。 */}
        <g fill="#4a4258">
          <ellipse cx="240" cy="146" rx="24" ry="15" />
          <circle cx="264" cy="138" r="10" />
          <path d="M272,142 q6,10 2,20 q-4,1 -5,-2 q3,-8 -1,-16z" />
          <path d="M262,130 q-8,-8 -18,-4 q8,-2 12,4z" />
          <path d="M226,158 v14 M236,160 v13 M248,159 v14 M256,156 v14" stroke="#4a4258" strokeWidth="6" />
          <path d="M216,146 q-6,4 -4,10" stroke="#4a4258" strokeWidth="3" fill="none" />
        </g>
        <path d="M270,136 l3,4" stroke="#e8e4d0" strokeWidth="2.2" />
        {/* 仔ゾウ(後ろをついていく)。 */}
        <g fill="#554c64">
          <ellipse cx="192" cy="154" rx="13" ry="8.5" />
          <circle cx="205" cy="150" r="6" />
          <path d="M210,152 q3,6 1,11 q-2,1 -3,-1 q2,-5 0,-8z" />
          <path d="M184,161 v10 M191,162 v10 M199,161 v10" stroke="#554c64" strokeWidth="4.4" />
        </g>
      </g>

      {/* 手前の草の影。 */}
      <g stroke="#2c2438" strokeWidth="2.4" fill="none">
        <path d="M30,204 q-2,-9 -6,-12 M36,204 q0,-11 2,-14 M44,204 q3,-8 7,-10" />
        <path d="M330,206 q-2,-8 -5,-11 M337,206 q1,-10 3,-13 M345,206 q3,-7 6,-9" />
      </g>

      <style>{`
        .africa-wd-herd {
          animation: africa-wd-cross 9s linear infinite;
        }
        @keyframes africa-wd-cross {
          0% { transform: translateX(60px); opacity: 0; }
          8% { opacity: 1; }
          46% { transform: translateX(-26px) translateY(2px); }
          92% { opacity: 1; }
          100% { transform: translateX(-120px); opacity: 0; }
        }
        .africa-wd-light {
          animation: africa-wd-pulse 2.4s ease-in-out infinite;
        }
        @keyframes africa-wd-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.45; }
        }
        .africa-wd-stars {
          animation: africa-wd-twinkle 3.6s ease-in-out infinite;
        }
        @keyframes africa-wd-twinkle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.45; }
        }
        @media (prefers-reduced-motion: reduce) {
          .africa-wd-herd,
          .africa-wd-light,
          .africa-wd-stars { animation: none; }
        }
      `}</style>
    </svg>
  );
}
