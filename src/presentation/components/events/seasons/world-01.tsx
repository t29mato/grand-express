/**
 * 5月。氷が解けて北の航路が開く。
 *
 * 岸に張りついていた氷が割れて流れ出し、その氷に立てた三脚が傾く。
 * 三脚から岸の時計へ紐が張ってあり、氷が動くと針が止まる(氷割れ賭け)。
 * 開いた水路を、その年最初の船が上っていく。
 */
export function World01() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 高緯度の淡い空 */}
      <rect width="400" height="210" fill="#bcd6e8" />
      <rect width="400" height="44" fill="#a8c8e0" />

      {/* 遠くの雪山 */}
      <path d="M0,92 L46,54 L84,92 L134,48 L188,92 L236,60 L286,92 L340,56 L400,92 L400,108 L0,108z" fill="#8fa4b8" />
      <path d="M46,54 L64,72 L28,72z M134,48 L156,70 L112,70z M340,56 L360,76 L320,76z" fill="#f2f7fb" />

      {/* 岸(雪と針葉樹) */}
      <rect y="100" width="400" height="26" fill="#e6eef4" />
      <g fill="#2f5f3f">
        <path d="M18,100 L28,74 L38,100z" />
        <path d="M44,100 L52,80 L60,100z" />
        <path d="M330,100 L340,76 L350,100z" />
        <path d="M356,100 L364,82 L372,100z" />
      </g>

      {/* 開いた水路 */}
      <rect y="126" width="400" height="84" fill="#2f6382" />
      <g stroke="#5b93b8" strokeWidth="3" strokeLinecap="round" fill="none">
        <path className="w01-wave" d="M30,196 q14,-6 28,0" />
        <path className="w01-wave w01-w2" d="M170,204 q14,-6 28,0" />
        <path className="w01-wave w01-w3" d="M296,192 q14,-6 28,0" />
      </g>

      {/* 岸に残った氷 */}
      <path d="M0,126 L400,126 L400,140 L318,140 L300,132 L214,138 L196,130 L104,136 L86,130 L0,134z" fill="#f2f7fb" />

      {/* 割れて流れだした氷 */}
      <g fill="#f2f7fb">
        <path className="w01-floe" d="M24,142 L138,138 L152,158 L118,176 L28,172 L12,156z" />
        <path className="w01-slab w01-s2" d="M232,146 L322,142 L334,160 L306,174 L240,170 L224,158z" />
        <path className="w01-slab w01-s3" d="M166,180 L212,176 L220,190 L184,198 L160,190z" />
        <path className="w01-slab w01-s4" d="M340,182 L384,178 L392,192 L356,200 L334,192z" />
      </g>
      <g fill="#cfe0ea">
        <path d="M24,164 L136,160 L118,176 L28,172z" />
        <path d="M228,162 L330,158 L306,174 L240,170z" />
      </g>

      {/* 流氷の上の三脚。氷が動くと傾く */}
      <g className="w01-tripod">
        <path d="M74,110 L58,148 M74,110 L92,148 M74,110 L74,150" stroke="#8a5a2c" strokeWidth="4" strokeLinecap="round" fill="none" />
        <rect x="66" y="98" width="16" height="12" fill="#e8443f" />
      </g>

      {/* 岸の時計へ張った紐 */}
      <path className="w01-line" d="M74,102 L188,88" stroke="#f6efe2" strokeWidth="2" fill="none" />

      {/* 岸の時計。針が回り、氷が動いたところで止まる */}
      <rect x="184" y="88" width="10" height="30" fill="#6b5330" />
      <circle cx="189" cy="80" r="17" fill="#f6efe2" />
      <circle cx="189" cy="80" r="17" fill="none" stroke="#6b5330" strokeWidth="3" />
      <g className="w01-hand" stroke="#3a3f48" strokeWidth="3" strokeLinecap="round">
        <path d="M189,80 L189,67" />
      </g>
      <circle cx="189" cy="80" r="2.6" fill="#3a3f48" />

      {/* 水路を上ってくる、その年最初の船 */}
      <g className="w01-ship">
        <g className="w01-smoke" fill="#e6eef4">
          <circle cx="292" cy="176" r="5" />
          <circle cx="300" cy="166" r="6.5" />
          <circle cx="310" cy="154" r="8" />
        </g>
        <rect x="286" y="184" width="10" height="12" fill="#e8443f" />
        <rect x="286" y="184" width="10" height="4" fill="#2a2f38" />
        <rect x="272" y="192" width="34" height="12" fill="#f2ede0" />
        <path d="M256,202 L326,202 L316,210 L266,210z" fill="#3a4453" />
      </g>

      <style>{`
        .w01-floe {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: w01-break 10s ease-in-out infinite;
        }
        .w01-slab {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: w01-drift 12s linear infinite;
        }
        .w01-s2 { animation-duration: 14s; animation-delay: -4s; }
        .w01-s3 { animation-duration: 9s; animation-delay: -2s; }
        .w01-s4 { animation-duration: 11s; animation-delay: -6s; }
        .w01-tripod {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: w01-lean 10s ease-in-out infinite;
        }
        .w01-line {
          transform-box: fill-box; transform-origin: 100% 50%;
          animation: w01-slack 10s ease-in-out infinite;
        }
        .w01-hand {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: w01-tick 10s cubic-bezier(0.25, 0, 0.15, 1) infinite;
        }
        .w01-ship {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: w01-sail 16s linear infinite;
        }
        .w01-smoke {
          transform-box: fill-box; transform-origin: 0 100%;
          animation: w01-puff 3.4s ease-out infinite;
        }
        .w01-wave {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: w01-lap 4s ease-in-out infinite;
        }
        .w01-w2 { animation-delay: -1.3s; }
        .w01-w3 { animation-delay: -2.6s; }
        @keyframes w01-break {
          0%, 18% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(-30px, 18px) rotate(-4deg); }
        }
        @keyframes w01-drift {
          0% { transform: translate(40px, -8px) rotate(4deg); }
          100% { transform: translate(-90px, 14px) rotate(-10deg); }
        }
        @keyframes w01-lean {
          0%, 18% { transform: rotate(0deg) translate(0, 0); }
          58% { transform: rotate(-8deg) translate(-14px, 8px); }
          100% { transform: rotate(-16deg) translate(-30px, 18px); }
        }
        @keyframes w01-slack {
          0%, 18% { transform: rotate(0deg) scaleX(1); }
          100% { transform: rotate(3.5deg) scaleX(1.05); }
        }
        @keyframes w01-tick {
          0% { transform: rotate(0deg); }
          6% { transform: rotate(72deg); }
          12% { transform: rotate(144deg); }
          18%, 100% { transform: rotate(206deg); }
        }
        @keyframes w01-sail {
          0% { transform: translate(120px, 4px); }
          100% { transform: translate(-320px, -6px); }
        }
        @keyframes w01-puff {
          0% { transform: translate(0, 6px) scale(0.5); opacity: 0.9; }
          100% { transform: translate(-20px, -30px) scale(1.3); opacity: 0; }
        }
        @keyframes w01-lap {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(12px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .w01-floe, .w01-slab, .w01-tripod, .w01-line,
          .w01-hand, .w01-ship, .w01-smoke, .w01-wave { animation: none; }
        }
      `}</style>
    </svg>
  );
}
