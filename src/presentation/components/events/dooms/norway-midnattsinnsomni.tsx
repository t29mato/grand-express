/**
 * 白夜に眠りを奪われる。
 *
 * 本来いちばん暗いはずの時刻に遮光カーテンの端から日が漏れ込み、
 * 夜じゅうが長い午後のようになる。しまったはずの切符や領収書が見つからない。
 * 動くのは**カーテンの隙間から差す光の帯・時計の針・寝床で起き上がった人の頭**だけ。
 * 止めた状態でも、外が明るいまま人が起きている構図で分かる。
 */
export function NorwayMidnattsinnsomni() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 部屋。夜のはずなのに壁が明るい。 */}
      <rect width="400" height="210" fill="#6b5f56" />
      <rect y="0" width="400" height="150" fill="#8a7a6c" />
      <rect y="150" width="400" height="60" fill="#5a4a3c" />
      <g stroke="#4f4034" strokeWidth="2" opacity="0.7" fill="none">
        <path d="M0,168h400M0,188h400" />
      </g>
      <rect y="144" width="400" height="8" fill="#4f4034" />

      {/* 壁板の目地。 */}
      <g stroke="#7a6a5c" strokeWidth="1.6" opacity="0.7" fill="none">
        <path d="M0,26h400M0,58h400M0,90h400M0,122h400" />
      </g>

      {/* 窓と遮光カーテン(中景・左)。外はまだ明るい。 */}
      <rect x="26" y="22" width="128" height="98" fill="#3f3428" />
      <rect x="32" y="28" width="116" height="86" fill="#f5d89a" />
      <circle cx="66" cy="72" r="20" fill="#f5b31c" />
      <path d="M32,96c22,-14 48,-16 72,-6l44,10v14H32z" fill="#c8a05a" />
      <g fill="#a88a58">
        <path d="M96,90c14,-10 32,-10 46,0l6,6H90z" />
      </g>
      <g stroke="#3f3428" strokeWidth="3" fill="none">
        <path d="M90,28v86M32,70h116" />
      </g>
      {/* カーテン。右側だけ少し開いている。 */}
      <path d="M20,16h50v106H20z" fill="#3a4450" />
      <path d="M112,16h58v106h-58z" fill="#3a4450" />
      <g fill="#2f3844">
        <path d="M20,16h10v106H20zM44,16h9v106h-9zM120,16h9v106h-9zM148,16h10v106h-10z" />
      </g>
      <rect x="14" y="12" width="162" height="7" rx="3" fill="#5a4630" />

      {/* 漏れ込む光の帯。**ここが動く。** */}
      <g className="nmi-beam">
        <path d="M70,20L112,20L286,196H176z" fill="#f8dc90" opacity="0.42" />
        <path d="M80,20L102,20L240,196H196z" fill="#f8e8b8" opacity="0.5" />
      </g>

      {/* 寝床(手前・右)。 */}
      <g>
        <rect x="196" y="118" width="200" height="14" rx="4" fill="#6b4a30" />
        <rect x="200" y="132" width="192" height="46" fill="#e8e0d0" />
        <path d="M200,146h192v32H200z" fill="#5f7f96" />
        <g stroke="#4a6b82" strokeWidth="2.4" opacity="0.8" fill="none">
          <path d="M200,158h192M200,170h192" />
        </g>
        <rect x="192" y="132" width="14" height="64" fill="#5a3f28" />
        <rect x="386" y="132" width="14" height="64" fill="#5a3f28" />
        <rect x="206" y="122" width="58" height="22" rx="5" fill="#f4f2ea" />
      </g>

      {/* 起き上がった人(主役)。**頭だけが動く。** */}
      <g>
        <path d="M244,146h48l6,32h-58z" fill="#c8ccd4" />
        <path d="M250,146h36l4,32h-44z" fill="#dfe4ea" />
        <g className="nmi-head">
          <circle cx="268" cy="126" r="15" fill="#e8c8a8" />
          <path d="M254,120a15,15 0 0 1 28,0z" fill="#8a6f4a" />
          <g fill="#3a3228">
            <ellipse cx="262" cy="127" rx="1.8" ry="1.2" />
            <ellipse cx="275" cy="127" rx="1.8" ry="1.2" />
          </g>
          <path d="M262,135q6,4 12,0" stroke="#3a3228" strokeWidth="1.6" fill="none" />
        </g>
        <path d="M244,152l-24,10" stroke="#e8c8a8" strokeWidth="8" strokeLinecap="round" fill="none" />
        <path d="M292,152l20,12" stroke="#e8c8a8" strokeWidth="8" strokeLinecap="round" fill="none" />
      </g>

      {/* 枕元の小机。切符と領収書が散らばっている(どこにしまったか分からない)。 */}
      <g>
        <rect x="300" y="152" width="72" height="8" fill="#6b4a30" />
        <rect x="306" y="160" width="6" height="34" fill="#5a3f28" />
        <rect x="360" y="160" width="6" height="34" fill="#5a3f28" />
        <g fill="#f4f2ea">
          <rect x="308" y="142" width="22" height="11" transform="rotate(-9 319 148)" />
          <rect x="332" y="144" width="20" height="10" transform="rotate(7 342 149)" />
          <rect x="346" y="140" width="18" height="10" transform="rotate(-4 355 145)" />
        </g>
        <g fill="#c0453c">
          <rect x="310" y="145" width="18" height="2.4" transform="rotate(-9 319 146)" />
          <rect x="334" y="147" width="16" height="2.2" transform="rotate(7 342 148)" />
        </g>
        {/* 目覚まし時計。針だけが動く。 */}
        <circle cx="336" cy="128" r="14" fill="#e8e4d8" />
        <circle cx="336" cy="128" r="11" fill="#f4f2ea" />
        <g fill="#c0453c">
          <circle cx="327" cy="115" r="4" />
          <circle cx="345" cy="115" r="4" />
        </g>
        <g className="nmi-hand">
          <rect x="335" y="118" width="2.4" height="11" fill="#3a3228" />
        </g>
        <circle cx="336" cy="128" r="2" fill="#3a3228" />
      </g>

      {/* 床に落ちた切符。 */}
      <g fill="#f4f2ea">
        <rect x="76" y="186" width="26" height="12" transform="rotate(-12 89 192)" />
        <rect x="118" y="192" width="22" height="10" transform="rotate(9 129 197)" />
      </g>

      <style>{`
        .nmi-beam {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: nmi-leak 4.4s ease-in-out infinite;
        }
        @keyframes nmi-leak {
          0%, 100% { opacity: 0.6; transform: skewX(-2deg); }
          50%      { opacity: 1; transform: skewX(2deg); }
        }
        .nmi-head {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: nmi-turn 5.2s ease-in-out infinite;
        }
        @keyframes nmi-turn {
          0%, 44%, 100% { transform: rotate(0deg); }
          20%           { transform: rotate(-11deg); }
          70%           { transform: rotate(9deg); }
        }
        .nmi-hand {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: nmi-tick 6s linear infinite;
        }
        @keyframes nmi-tick {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .nmi-beam, .nmi-head, .nmi-hand { animation: none; }
          .nmi-beam { opacity: 1; }
          .nmi-hand {
            transform: rotate(200deg);
            transform-box: fill-box;
            transform-origin: 50% 100%;
          }
        }
      `}</style>
    </svg>
  );
}
