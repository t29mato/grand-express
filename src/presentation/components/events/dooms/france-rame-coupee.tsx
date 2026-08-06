/**
 * 編成が切られる。二編成は分岐まで連結して走り、そこで片方は先へ、
 * 片方は別の線へ行く。何号車かの案内は、トンネルの中で一度だけ流れていた。
 *
 * 転轍機の先で連結が外れ、あいだの隙間が広がっていく。
 * 前の半分は本線を右へ、乗ってしまった後ろの半分は分岐へ左下へ。
 * 窓から顔を出した旅人が、離れていく前半分を見送っている。
 *
 * 位置決めは外側の <g transform>、動きは内側のクラス。
 * CSSのtransformは属性のtransformを上書きするので、両方を同じ要素に付けない。
 */
export function FranceRameCoupee() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜の切り通し */}
      <rect width="400" height="210" fill="#232f3d" />
      <rect width="400" height="70" fill="#1b2531" />
      <path
        d="M0,86 q70,-22 150,-8 q96,18 250,-12 l0,34 -400,0z"
        fill="#2b3a2c"
      />

      {/* 架線柱 */}
      <g fill="#3c4a58">
        <rect x="40" y="22" width="6" height="80" />
        <rect x="212" y="16" width="6" height="86" />
        <rect x="352" y="24" width="6" height="78" />
        <rect x="34" y="22" width="30" height="5" />
        <rect x="206" y="16" width="30" height="5" />
        <rect x="346" y="24" width="30" height="5" />
      </g>

      {/* 信号機(分岐の手前) */}
      <g transform="translate(190,104)">
        <rect x="-3" y="-56" width="6" height="56" fill="#3c4a58" />
        <rect x="-11" y="-72" width="22" height="24" rx="5" fill="#1b2531" />
        <circle className="frc-signal" cx="0" cy="-64" r="6" fill="#e05252" />
        <circle cx="0" cy="-54" r="5" fill="#26313d" />
      </g>

      {/* 道床 */}
      <rect y="102" width="400" height="108" fill="#4a4034" />
      <rect y="102" width="400" height="6" fill="#5a5040" />

      {/* 本線のレール */}
      <g fill="#7d848c">
        <rect y="126" width="400" height="5" />
        <rect y="150" width="400" height="5" />
      </g>
      {/* 分岐して下りていく線 */}
      <g fill="#6b727a">
        <path d="M196,126 q-100,26 -196,54 l0,6 q98,-30 196,-54z" />
        <path d="M196,150 q-100,26 -196,52 l0,6 q98,-28 196,-52z" />
      </g>
      {/* 枕木 */}
      <g fill="#3a322a">
        <rect x="230" y="120" width="10" height="40" />
        <rect x="272" y="120" width="10" height="40" />
        <rect x="314" y="120" width="10" height="40" />
        <rect x="356" y="120" width="10" height="40" />
        <rect
          x="20"
          y="168"
          width="10"
          height="34"
          transform="rotate(-14 25 185)"
        />
        <rect
          x="72"
          y="156"
          width="10"
          height="34"
          transform="rotate(-14 77 173)"
        />
        <rect
          x="124"
          y="144"
          width="10"
          height="34"
          transform="rotate(-14 129 161)"
        />
      </g>
      {/* 転轍機 */}
      <g transform="translate(198,138)">
        <rect x="-16" y="-4" width="32" height="8" rx="3" fill="#8d949c" />
        <circle cx="0" cy="0" r="7" fill="#e05252" />
        <rect x="-3" y="-22" width="6" height="20" fill="#5b6673" />
      </g>

      {/* 先へ行く前半分 */}
      <g className="frc-front">
        <rect x="222" y="66" width="200" height="58" rx="9" fill="#4a5a6b" />
        <rect x="222" y="66" width="200" height="10" rx="5" fill="#5b6d80" />
        <rect x="222" y="104" width="200" height="7" fill="#e05252" />
        <g fill="#16222e">
          <rect x="238" y="80" width="34" height="18" rx="3" />
          <rect x="284" y="80" width="34" height="18" rx="3" />
          <rect x="330" y="80" width="34" height="18" rx="3" />
          <rect x="376" y="80" width="34" height="18" rx="3" />
        </g>
        <rect x="216" y="86" width="8" height="14" rx="3" fill="#8d949c" />
        <g fill="#2b3540">
          <circle cx="252" cy="126" r="8" />
          <circle cx="300" cy="126" r="8" />
          <circle cx="360" cy="126" r="8" />
        </g>
      </g>

      {/* 分岐へ入ってしまった後ろ半分 */}
      <g className="frc-rear">
        <g transform="rotate(-13 190 110)">
          <rect x="-30" y="72" width="210" height="58" rx="9" fill="#3f5468" />
          <rect x="-30" y="72" width="210" height="10" rx="5" fill="#4d6579" />
          <rect x="-30" y="110" width="210" height="7" fill="#e05252" />
          <g fill="#16222e">
            <rect x="-14" y="86" width="34" height="18" rx="3" />
            <rect x="32" y="86" width="34" height="18" rx="3" />
            <rect x="132" y="86" width="30" height="18" rx="3" />
          </g>
          {/* 顔を出した窓 */}
          <rect x="72" y="78" width="52" height="32" rx="3" fill="#0f1a24" />
          <g className="frc-lean">
            <circle cx="98" cy="96" r="16" fill="#f6efe2" />
            <path d="M82,92 a16,16 0 0 1 32,0 l0,2 -32,0z" fill="#3a2a1e" />
            <circle cx="92" cy="97" r="3" fill="#2a1f18" />
            <circle cx="105" cy="97" r="3" fill="#2a1f18" />
            <ellipse cx="98" cy="106" rx="4" ry="4.6" fill="#a8503a" />
          </g>
          <rect x="180" y="92" width="8" height="14" rx="3" fill="#8d949c" />
          <g fill="#2b3540">
            <circle cx="0" cy="132" r="8" />
            <circle cx="60" cy="132" r="8" />
            <circle cx="140" cy="132" r="8" />
          </g>
        </g>
      </g>

      {/* 外れた連結器 */}
      <g transform="translate(206,112)">
        <g className="frc-hook">
          <rect x="-14" y="-4" width="28" height="9" rx="4" fill="#8d949c" />
          <circle cx="14" cy="0" r="5" fill="#6b727a" />
        </g>
      </g>

      {/* 気づいた印 */}
      <g transform="translate(150,52)">
        <g className="frc-burst">
          <path
            d="M0,-20 L5,-7 L18,-11 L10,-1 L20,7 L6,6 L7,20 L0,9 L-7,19 L-7,5 L-20,7 L-11,-1 L-19,-10 L-6,-7z"
            fill="#f5b31c"
          />
        </g>
      </g>

      <style>{`
        .frc-front { transform-box: fill-box; transform-origin: center; animation: frc-goon 4.8s ease-in infinite; }
        .frc-rear { transform-box: fill-box; transform-origin: center; animation: frc-veer 4.8s ease-in infinite; }
        .frc-hook { transform-box: fill-box; transform-origin: center; animation: frc-part 4.8s ease-in infinite; }
        .frc-lean { transform-box: fill-box; transform-origin: 50% 100%; animation: frc-look 4.8s ease-in-out infinite; }
        .frc-signal { transform-box: fill-box; transform-origin: center; animation: frc-blink 1.6s steps(1, end) infinite; }
        .frc-burst { transform-box: fill-box; transform-origin: center; animation: frc-pop 4.8s ease-out infinite; }
        @keyframes frc-goon {
          0%, 14% { transform: translate(0, 0); }
          100% { transform: translate(96px, 0); }
        }
        @keyframes frc-veer {
          0%, 14% { transform: translate(0, 0); }
          100% { transform: translate(-64px, 20px); }
        }
        @keyframes frc-part {
          0%, 14% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          46% { transform: translate(-14px, 8px) rotate(-18deg); opacity: 1; }
          100% { transform: translate(-40px, 22px) rotate(-40deg); opacity: 0; }
        }
        @keyframes frc-look {
          0%, 22% { transform: rotate(0deg); }
          46%, 100% { transform: rotate(-12deg) translate(-3px, 0); }
        }
        @keyframes frc-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0.25; }
        }
        @keyframes frc-pop {
          0%, 28% { transform: scale(0); opacity: 0; }
          38% { transform: scale(1.25); opacity: 1; }
          48% { transform: scale(1); opacity: 1; }
          86% { transform: scale(1); opacity: 1; }
          100% { transform: scale(0.9); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .frc-front, .frc-rear, .frc-hook, .frc-lean, .frc-signal, .frc-burst { animation: none; }
        }
      `}</style>
    </svg>
  );
}
