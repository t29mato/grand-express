/**
 * 一夜で相場が変わる。懐の紙幣は昨日と同じ紙幣で、
 * 違っているのは窓口の後ろの掲示板だけ。
 *
 * 掲示板の数字の桁が一段ずつ落ちていき、両替所の前には列が伸びる。
 * 手に持った札はそのままなのに、買えるものが減っていく。
 *
 * 位置決めは外側の <g transform>、動きは内側のクラス。
 * CSSのtransformは属性のtransformを上書きするので、両方を同じ要素に付けない。
 */
export function WorldDevaluation() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜の通り */}
      <rect width="400" height="210" fill="#2b2f3a" />
      <rect width="400" height="40" fill="#22252e" />
      <rect y="150" width="400" height="60" fill="#3a3f4a" />
      <rect y="150" width="400" height="5" fill="#464c58" />

      {/* 建物 */}
      <rect x="196" y="18" width="204" height="132" fill="#3d4350" />
      <rect x="196" y="18" width="204" height="8" fill="#4a5160" />
      <rect x="0" y="30" width="188" height="120" fill="#353a46" />
      <g fill="#262a34">
        <rect x="18" y="46" width="26" height="30" rx="3" />
        <rect x="56" y="46" width="26" height="30" rx="3" />
        <rect x="94" y="46" width="26" height="30" rx="3" />
        <rect x="132" y="46" width="26" height="30" rx="3" />
      </g>

      {/* 両替所の窓口 */}
      <rect x="212" y="40" width="172" height="110" fill="#1f232c" />
      <rect
        x="222"
        y="50"
        width="152"
        height="90"
        fill="#f5b31c"
        opacity="0.16"
      />
      <rect x="212" y="132" width="172" height="18" fill="#5c4632" />
      <rect x="212" y="132" width="172" height="5" fill="#6e553c" />

      {/* 窓口の人影 */}
      <g fill="#1a1e26">
        <circle cx="362" cy="104" r="15" />
        <rect x="340" y="120" width="44" height="18" rx="9" />
      </g>

      {/* 相場の掲示板 */}
      <g>
        <rect x="230" y="56" width="112" height="70" rx="3" fill="#171a21" />
        <rect x="230" y="56" width="112" height="8" rx="3" fill="#232833" />
        <g fill="#5b6673">
          <rect x="238" y="72" width="22" height="6" rx="3" />
          <rect x="238" y="88" width="22" height="6" rx="3" />
          <rect x="238" y="104" width="22" height="6" rx="3" />
        </g>
        {/* 落ちていく数字の桁 */}
        <g transform="translate(268,72)">
          <g className="wdv-row-a">
            <rect x="0" y="0" width="60" height="7" rx="3" fill="#f5b31c" />
          </g>
        </g>
        <g transform="translate(268,88)">
          <g className="wdv-row-b">
            <rect x="0" y="0" width="48" height="7" rx="3" fill="#f5b31c" />
          </g>
        </g>
        <g transform="translate(268,104)">
          <g className="wdv-row-c">
            <rect x="0" y="0" width="66" height="7" rx="3" fill="#f5b31c" />
          </g>
        </g>
      </g>

      {/* 下向きの矢 */}
      <g transform="translate(360,74)">
        <g className="wdv-arrow">
          <rect x="-6" y="-22" width="12" height="30" rx="3" fill="#e05252" />
          <path d="M-16,4 L0,24 L16,4z" fill="#e05252" />
        </g>
      </g>

      {/* 窓口へ伸びる列 */}
      <g fill="#1c202a">
        <g className="wdv-queue-a">
          <circle cx="196" cy="118" r="14" />
          <rect x="176" y="134" width="40" height="52" rx="13" />
        </g>
        <g className="wdv-queue-b">
          <circle cx="152" cy="122" r="13" />
          <rect x="134" y="137" width="37" height="49" rx="12" />
        </g>
        <g className="wdv-queue-c">
          <circle cx="112" cy="119" r="13" />
          <rect x="94" y="134" width="37" height="52" rx="12" />
        </g>
        <g className="wdv-queue-d">
          <circle cx="74" cy="123" r="12" />
          <rect x="58" y="137" width="34" height="49" rx="12" />
        </g>
        <g className="wdv-queue-e">
          <circle cx="40" cy="120" r="12" />
          <rect x="24" y="134" width="34" height="52" rx="12" />
        </g>
      </g>

      {/* 昨日と同じ紙幣 */}
      <g transform="translate(74,178)">
        <g className="wdv-note">
          <ellipse cx="-30" cy="8" rx="15" ry="12" fill="#e8c9a8" />
          <rect x="-58" y="12" width="30" height="26" rx="9" fill="#4a5866" />
          <rect x="-32" y="-16" width="64" height="32" rx="3" fill="#8fae7b" />
          <rect x="-32" y="-16" width="64" height="7" rx="3" fill="#a2c08d" />
          <circle cx="-14" cy="2" r="8" fill="#6f8f5c" />
          <rect x="0" y="-4" width="24" height="4" rx="2" fill="#6f8f5c" />
          <rect x="0" y="4" width="16" height="4" rx="2" fill="#6f8f5c" />
        </g>
      </g>

      <style>{`
        .wdv-row-a { transform-box: fill-box; transform-origin: left center; animation: wdv-slip 3.2s steps(1, end) infinite; }
        .wdv-row-b { transform-box: fill-box; transform-origin: left center; animation: wdv-slip 3.2s steps(1, end) infinite; animation-delay: -1.1s; }
        .wdv-row-c { transform-box: fill-box; transform-origin: left center; animation: wdv-slip 3.2s steps(1, end) infinite; animation-delay: -2.2s; }
        .wdv-arrow { transform-box: fill-box; transform-origin: center; animation: wdv-sink 3.2s ease-in-out infinite; }
        .wdv-queue-a { transform-box: fill-box; transform-origin: 50% 100%; animation: wdv-shift 2.8s ease-in-out infinite; }
        .wdv-queue-b { transform-box: fill-box; transform-origin: 50% 100%; animation: wdv-shift 2.8s ease-in-out infinite; animation-delay: -0.4s; }
        .wdv-queue-c { transform-box: fill-box; transform-origin: 50% 100%; animation: wdv-shift 2.8s ease-in-out infinite; animation-delay: -0.8s; }
        .wdv-queue-d { transform-box: fill-box; transform-origin: 50% 100%; animation: wdv-shift 2.8s ease-in-out infinite; animation-delay: -1.2s; }
        .wdv-queue-e { transform-box: fill-box; transform-origin: 50% 100%; animation: wdv-shift 2.8s ease-in-out infinite; animation-delay: -1.6s; }
        .wdv-note { transform-box: fill-box; transform-origin: 50% 100%; animation: wdv-hold 3.2s ease-in-out infinite; }
        @keyframes wdv-slip {
          0%, 32% { transform: scaleX(1); }
          33%, 65% { transform: scaleX(0.62); }
          66%, 100% { transform: scaleX(0.34); }
        }
        @keyframes wdv-sink {
          0%, 100% { transform: translate(0, -8px); opacity: 0.7; }
          50% { transform: translate(0, 10px); opacity: 1; }
        }
        @keyframes wdv-shift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(4px, -3px); }
        }
        @keyframes wdv-hold {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .wdv-row-a, .wdv-row-b, .wdv-row-c, .wdv-arrow,
          .wdv-queue-a, .wdv-queue-b, .wdv-queue-c, .wdv-queue-d, .wdv-queue-e,
          .wdv-note { animation: none; }
        }
      `}</style>
    </svg>
  );
}
