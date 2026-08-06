/**
 * ユンガスの旧道(デス・ロード)を下りきって、焼けたブレーキを交換する。
 *
 * 崖に貼りついた砂利道をマウンテンバイクが下り、後輪のディスクが真っ赤に焼けて
 * 煙を上げている。すり減ったパッドが谷へ落ちていく。
 */
export function DeathRoadBrakes() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 霧の谷 */}
      <rect width="400" height="210" fill="#9db3b3" />
      <path d="M0,72 L64,38 L138,64 L214,30 L292,58 L352,38 L400,60 L400,120 L0,120z" fill="#4a6b5e" />
      <g fill="#cfdbdb" opacity="0.75">
        <ellipse cx="70" cy="98" rx="52" ry="14" />
        <ellipse cx="196" cy="88" rx="60" ry="13" />
        <ellipse cx="330" cy="100" rx="56" ry="15" />
      </g>

      {/* 崖 */}
      <path d="M0,20 L30,26 L96,8 L170,30 L250,18 L330,44 L400,58 L400,152 L0,104z" fill="#25402f" />
      <g fill="#1b3123">
        <path d="M0,52 L60,64 L52,78 L0,66z" />
        <path d="M140,58 L212,74 L206,88 L134,72z" />
        <path d="M290,86 L360,102 L356,114 L286,98z" />
      </g>

      {/* 砂利道 */}
      <path d="M0,104 L400,152 L400,182 L0,132z" fill="#b9a27a" />
      <path d="M0,104 L400,152 L400,159 L0,111z" fill="#9c8763" />
      <g fill="#6f6350">
        <circle cx="60" cy="126" r="3" />
        <circle cx="136" cy="140" r="2.5" />
        <circle cx="286" cy="162" r="3" />
        <circle cx="352" cy="172" r="2.5" />
      </g>

      {/* 落ちたら戻れない外側 */}
      <path d="M0,130 L400,180 L400,186 L0,136z" fill="#6b5b44" />
      <path d="M0,136 L400,186 L400,210 L0,210z" fill="#1b2c33" />
      <g stroke="#14222a" strokeWidth="6" strokeLinecap="round">
        <path d="M36,142 L30,210 M92,150 L100,210 M160,158 L152,210 M232,166 L242,210 M304,176 L296,210 M366,182 L374,210" />
      </g>
      <g fill="#cfdbdb" opacity="0.3">
        <ellipse cx="76" cy="200" rx="46" ry="8" />
        <ellipse cx="220" cy="206" rx="52" ry="9" />
        <ellipse cx="356" cy="198" rx="44" ry="8" />
      </g>
      <g fill="#6f6350">
        <ellipse cx="106" cy="140" rx="7" ry="4" />
        <ellipse cx="330" cy="176" rx="8" ry="4" />
      </g>

      {/* 下ってきた自転車 */}
      <g transform="translate(200,134) rotate(7)">
        <g className="dr-dash">
          <rect x="66" y="16" width="22" height="3" rx="1.5" fill="#f6efe2" opacity="0.5" />
          <rect x="96" y="24" width="16" height="3" rx="1.5" fill="#f6efe2" opacity="0.35" />
        </g>
        <circle cx="-32" cy="0" r="15" fill="none" stroke="#22252b" strokeWidth="5" />
        <circle cx="32" cy="0" r="15" fill="none" stroke="#22252b" strokeWidth="5" />
        <path
          className="dr-spin-a"
          d="M-45,0 H-19 M-38.5,-11.3 L-25.5,11.3 M-25.5,-11.3 L-38.5,11.3"
          stroke="#8a9099"
          strokeWidth="1.8"
        />
        <path
          className="dr-spin-b"
          d="M19,0 H45 M25.5,-11.3 L38.5,11.3 M38.5,-11.3 L25.5,11.3"
          stroke="#8a9099"
          strokeWidth="1.8"
        />
        <path
          d="M0,-2 L-10,-26 L18,-26 L0,-2 M-32,0 L0,-2 M-32,0 L-10,-26 M18,-26 L32,0"
          stroke="#7c8189"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        <path d="M18,-26 L21,-35 M13,-35 L29,-35" stroke="#22252b" strokeWidth="3.5" strokeLinecap="round" />
        <rect x="-17" y="-31" width="15" height="5" rx="2" fill="#22252b" />
        <circle cx="0" cy="-2" r="4" fill="#22252b" />
        {/* 乗り手 */}
        <path d="M0,-2 L-5,-26 L-4,-42" stroke="#3b2f4a" strokeWidth="7" fill="none" strokeLinecap="round" />
        <path d="M-4,-42 L14,-52" stroke="#e8443f" strokeWidth="13" fill="none" strokeLinecap="round" />
        <path d="M14,-52 L21,-36" stroke="#f6efe2" strokeWidth="5" fill="none" strokeLinecap="round" />
        <circle cx="22" cy="-58" r="8" fill="#f6efe2" />
        <path d="M13,-59 A9,9 0 0,1 31,-61 L31,-57 L13,-56z" fill="#f5b31c" />
        {/* 焼けた後輪ブレーキ */}
        <rect x="-38" y="-16" width="7" height="12" rx="2" fill="#4a4f57" />
        <circle className="dr-halo" cx="-32" cy="0" r="13" fill="#f5b31c" opacity="0.4" />
        <circle className="dr-disc" cx="-32" cy="0" r="8" fill="#e8443f" />
        <circle cx="-32" cy="0" r="3" fill="#f5b31c" />
      </g>

      {/* 立ちのぼる煙 */}
      <g transform="translate(168,124)">
        <circle className="dr-smoke-a" cx="0" cy="0" r="8" fill="#e4e9e7" />
        <circle className="dr-smoke-b" cx="0" cy="0" r="6" fill="#e4e9e7" />
        <circle className="dr-smoke-c" cx="0" cy="0" r="7" fill="#e4e9e7" />
      </g>

      {/* すり減って落ちるブレーキパッド */}
      <g transform="translate(180,142)">
        <g className="dr-pad">
          <rect x="-7" y="-4" width="14" height="5" rx="1" fill="#4a4f57" />
          <rect x="-7" y="1" width="14" height="3" rx="1" fill="#22252b" />
        </g>
      </g>

      <style>{`
        .dr-spin-a, .dr-spin-b {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: dr-roll 0.5s linear infinite;
        }
        .dr-spin-b { animation-duration: 0.52s; }
        .dr-dash {
          transform: translate(0, 0);
          animation: dr-past 0.8s linear infinite;
        }
        .dr-disc {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: dr-heat 1.1s ease-in-out infinite;
        }
        .dr-halo {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: dr-flare 1.1s ease-in-out infinite;
        }
        .dr-smoke-a, .dr-smoke-b, .dr-smoke-c {
          animation: dr-rise 2.2s ease-out infinite;
        }
        .dr-smoke-a { transform: translate(-6px, -8px) scale(0.8); opacity: 0.7; }
        .dr-smoke-b { transform: translate(-20px, -26px) scale(1.2); opacity: 0.45; animation-delay: 0.75s; }
        .dr-smoke-c { transform: translate(-32px, -42px) scale(1.6); opacity: 0.22; animation-delay: 1.5s; }
        .dr-pad {
          transform: translate(10px, 20px) rotate(40deg);
          animation: dr-drop 2.6s ease-in infinite;
        }
        @keyframes dr-roll {
          to { transform: rotate(360deg); }
        }
        @keyframes dr-past {
          0% { transform: translate(-46px, -6px); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translate(30px, 4px); opacity: 0; }
        }
        @keyframes dr-heat {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.12); opacity: 1; }
        }
        @keyframes dr-flare {
          0%, 100% { transform: scale(0.9); opacity: 0.28; }
          50% { transform: scale(1.2); opacity: 0.5; }
        }
        @keyframes dr-rise {
          0% { transform: translate(0, 0) scale(0.5); opacity: 0.75; }
          70% { transform: translate(-22px, -30px) scale(1.3); opacity: 0.35; }
          100% { transform: translate(-34px, -44px) scale(1.7); opacity: 0; }
        }
        @keyframes dr-drop {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          15% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translate(26px, 62px) rotate(200deg); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .dr-spin-a, .dr-spin-b, .dr-dash, .dr-disc, .dr-halo,
          .dr-smoke-a, .dr-smoke-b, .dr-smoke-c, .dr-pad { animation: none; }
        }
      `}</style>
    </svg>
  );
}
