/**
 * 8月。赤道の無風帯。
 *
 * 帆が垂れ、海は硝子になり、船影がそのまま水に映っている。
 * 遠くの幽霊船も同じように動けない。動きは最小限にしてある。
 */
export function World04() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 熱で白んだ空 */}
      <rect width="400" height="210" fill="#cfd8d0" />
      <rect width="400" height="70" fill="#c2cfc8" />
      <circle cx="200" cy="40" r="26" fill="#f2ede0" />
      <circle cx="200" cy="40" r="40" fill="#f2ede0" opacity="0.35" />

      {/* かすんだ積雲。ほとんど動かない */}
      <g className="w04-haze" fill="#dfe6df" opacity="0.85">
        <ellipse cx="80" cy="54" rx="30" ry="10" />
        <ellipse cx="58" cy="58" rx="18" ry="7" />
        <ellipse cx="106" cy="58" rx="20" ry="7" />
      </g>
      <g className="w04-haze w04-h2" fill="#dfe6df" opacity="0.7">
        <ellipse cx="322" cy="44" rx="26" ry="9" />
        <ellipse cx="302" cy="48" rx="16" ry="6" />
      </g>

      {/* 鏡のような海 */}
      <rect y="112" width="400" height="98" fill="#6f9aa8" />
      <rect y="112" width="400" height="6" fill="#8fb4bc" />
      <g stroke="#8fb4bc" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.8">
        <path className="w04-glass" d="M40,150 h56" />
        <path className="w04-glass w04-g2" d="M226,166 h74" />
        <path className="w04-glass w04-g3" d="M120,182 h60" />
      </g>

      {/* 遠くの幽霊船。こちらも止まっている */}
      <g opacity="0.4">
        <path d="M60,112 L104,112 L98,120 L66,120z" fill="#4a5566" />
        <path d="M74,112 L74,74 L94,112z" fill="#8f9aa8" />
        <path d="M82,112 L82,80 L66,112z" fill="#a8b2bc" />
        <rect x="80.5" y="70" width="3" height="44" fill="#4a5566" />
      </g>

      {/* 帆船。帆が完全に垂れている(位置決めは外側、動きは内側) */}
      <g transform="translate(-52,0)">
      <g className="w04-hull">
        <path d="M236,158 L346,158 L332,178 L250,178z" fill="#6b4a2a" />
        <path d="M240,164 L342,164 L338,170 L244,170z" fill="#8a5a2c" />
        <rect x="288" y="66" width="5" height="94" fill="#5a3d22" />
        <path d="M262,86 L288,86 L288,88 L262,88z" fill="#5a3d22" />
        <path d="M268,66 L316,66 L316,68 L268,68z" fill="#5a3d22" />
        {/* 垂れた帆 */}
        <g className="w04-sail" fill="#f2ede0">
          <path d="M290,88 q-16,4 -20,26 q10,-8 20,-6z" />
          <path d="M291,68 q18,4 22,30 q-12,-10 -22,-8z" />
          <path d="M290,110 q-13,6 -16,24 q9,-8 16,-7z" />
        </g>
        {/* 力なく垂れた旗 */}
        <path className="w04-flag" d="M293,66 q10,3 9,14 q-5,-6 -9,-5z" fill="#e8443f" />
      </g>
      </g>

      {/* 水面に映る船影 */}
      <g transform="translate(-52,0)" opacity="0.32">
        <g className="w04-mirror">
          <path d="M236,180 L346,180 L332,196 L250,196z" fill="#3f5f4a" />
          <rect x="288" y="180" width="5" height="28" fill="#3f5f4a" />
          <rect x="262" y="192" width="52" height="3" fill="#3f5f4a" />
        </g>
      </g>

      {/* 帆桁にとまった鳥。ときどき首を回すだけ */}
      <g transform="translate(-52,0)">
        <g className="w04-bird">
          <path d="M266,62 q10,-6 16,-1 q-5,4 -16,1z" fill="#3a3f48" />
          <ellipse cx="270" cy="59" rx="7" ry="5" fill="#3a3f48" />
          <circle cx="264" cy="55" r="3.6" fill="#3a3f48" />
          <path d="M261,55 l-5,1 l5,1.4z" fill="#f5b31c" />
          <ellipse cx="271" cy="60" rx="3.4" ry="2.2" fill="#6b737e" />
        </g>
      </g>

      {/* 一枚だけ落ちる羽根 */}
      <path className="w04-feather" d="M186,90 q7,7 2,16 q-7,-6 -2,-16z" fill="#f2ede0" />

      <style>{`
        .w04-haze {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: w04-crawl 26s linear infinite;
        }
        .w04-h2 { animation-duration: 34s; animation-delay: -12s; }
        .w04-glass {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: w04-breathe 9s ease-in-out infinite;
        }
        .w04-g2 { animation-delay: -3s; }
        .w04-g3 { animation-delay: -6s; }
        .w04-hull {
          transform-box: fill-box; transform-origin: 50% 100%;
          animation: w04-roll 12s ease-in-out infinite;
        }
        .w04-mirror {
          transform-box: fill-box; transform-origin: 50% 0;
          animation: w04-wobble 9s ease-in-out infinite;
        }
        .w04-sail {
          transform-box: fill-box; transform-origin: 50% 0;
          animation: w04-slack 12s ease-in-out infinite;
        }
        .w04-flag {
          transform-box: fill-box; transform-origin: 0 0;
          animation: w04-limp 12s ease-in-out infinite;
        }
        .w04-bird {
          transform-box: fill-box; transform-origin: 80% 50%;
          animation: w04-look 8s ease-in-out infinite;
        }
        .w04-feather {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: w04-sink 14s ease-in-out infinite;
        }
        @keyframes w04-crawl {
          0% { transform: translateX(-26px); }
          100% { transform: translateX(26px); }
        }
        @keyframes w04-breathe {
          0%, 100% { transform: scaleX(1); opacity: 0.55; }
          50% { transform: scaleX(1.1); opacity: 0.85; }
        }
        @keyframes w04-roll {
          0%, 100% { transform: rotate(-0.7deg); }
          50% { transform: rotate(0.7deg); }
        }
        @keyframes w04-wobble {
          0%, 100% { transform: skewX(-2deg) scaleY(1); }
          50% { transform: skewX(2deg) scaleY(1.05); }
        }
        @keyframes w04-slack {
          0%, 100% { transform: scaleX(1); }
          50% { transform: scaleX(1.04); }
        }
        @keyframes w04-limp {
          0%, 100% { transform: rotate(0deg); }
          46% { transform: rotate(4deg); }
        }
        @keyframes w04-look {
          0%, 62%, 100% { transform: rotate(0deg); }
          70% { transform: rotate(-18deg); }
          82% { transform: rotate(10deg); }
        }
        @keyframes w04-sink {
          0% { transform: translate(0, -18px) rotate(0deg); opacity: 0; }
          14%, 74% { opacity: 1; }
          100% { transform: translate(-16px, 78px) rotate(48deg); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .w04-haze, .w04-glass, .w04-hull, .w04-mirror, .w04-sail,
          .w04-flag, .w04-bird, .w04-feather { animation: none; }
        }
      `}</style>
    </svg>
  );
}
