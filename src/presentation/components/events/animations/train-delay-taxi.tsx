/**
 * 信号確認で電車が止まり、ホームが人で埋まってタクシーに乗り換える。
 *
 * 赤信号が点滅したまま動かない電車と、混み合うホーム。
 * 手前の道路を、旅人を乗せたタクシーが走り去っていく。
 */
export function TrainDelayTaxi() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 夜の駅 */}
      <rect width="400" height="210" fill="#20364a" />

      {/* 止まったままの電車 */}
      <rect x="-6" y="54" width="242" height="68" rx="10" fill="#6f8496" />
      <rect x="4" y="64" width="222" height="22" fill="#16222e" />
      <rect x="-6" y="88" width="242" height="9" fill="#3f8f6f" />
      <g fill="#4f6373">
        <rect x="60" y="54" width="3" height="68" />
        <rect x="150" y="54" width="3" height="68" />
      </g>
      <circle cx="224" cy="112" r="5" fill="#c9a877" />

      {/* ホーム */}
      <rect y="122" width="252" height="18" fill="#4a5560" />
      <rect y="136" width="252" height="4" fill="#f5b31c" />

      {/* 電車を待つ人だかり */}
      <g fill="#16222e">
        <g className="tdt-head-a">
          <circle cx="16" cy="100" r="6" />
          <rect x="8" y="107" width="16" height="15" rx="5" />
        </g>
        <g className="tdt-head-b">
          <circle cx="42" cy="102" r="6" />
          <rect x="34" y="109" width="16" height="13" rx="5" />
        </g>
        <g className="tdt-head-c">
          <circle cx="68" cy="99" r="6" />
          <rect x="60" y="106" width="16" height="16" rx="5" />
        </g>
        <g className="tdt-head-d">
          <circle cx="94" cy="102" r="6" />
          <rect x="86" y="109" width="16" height="13" rx="5" />
        </g>
        <g className="tdt-head-e">
          <circle cx="120" cy="100" r="6" />
          <rect x="112" y="107" width="16" height="15" rx="5" />
        </g>
        <g className="tdt-head-f">
          <circle cx="146" cy="102" r="6" />
          <rect x="138" y="109" width="16" height="13" rx="5" />
        </g>
        <g className="tdt-head-g">
          <circle cx="172" cy="99" r="6" />
          <rect x="164" y="106" width="16" height="16" rx="5" />
        </g>
        <g className="tdt-head-h">
          <circle cx="198" cy="101" r="6" />
          <rect x="190" y="108" width="16" height="14" rx="5" />
        </g>
        <g className="tdt-head-i">
          <circle cx="224" cy="100" r="6" />
          <rect x="216" y="107" width="16" height="15" rx="5" />
        </g>
      </g>

      {/* 信号確認中の赤信号 */}
      <rect x="256" y="62" width="7" height="78" fill="#3a4550" />
      <rect x="246" y="40" width="27" height="30" rx="5" fill="#16222e" />
      <circle className="tdt-lamp" cx="259" cy="55" r="8" fill="#e8443f" />

      {/* 手前の道路 */}
      <rect y="140" width="400" height="70" fill="#2b3540" />
      <rect y="140" width="400" height="4" fill="#3d4a56" />

      {/* 払った運賃 */}
      <g className="tdt-fare-a">
        <circle r="6" fill="#f5b31c" />
        <circle r="3" fill="#c98f10" />
      </g>
      <g className="tdt-fare-b">
        <circle r="5" fill="#f5b31c" />
        <circle r="2.5" fill="#c98f10" />
      </g>

      {/* 乗り換えたタクシー */}
      <g className="tdt-taxi">
        <rect x="-8" y="-56" width="22" height="9" rx="2" fill="#f6efe2" />
        <path d="M-30,-30 L-20,-48 L24,-48 L36,-30 Z" fill="#f5b31c" />
        <path d="M-24,-33 L-16,-45 L-3,-45 L-3,-33 Z" fill="#20364a" />
        <path d="M2,-45 L19,-45 L29,-33 L2,-33 Z" fill="#20364a" />
        <circle cx="10" cy="-38" r="5" fill="#f6efe2" />
        <rect x="-52" y="-30" width="104" height="26" rx="7" fill="#f5b31c" />
        <rect x="-1" y="-30" width="2" height="26" fill="#c98f10" />
        <rect x="-52" y="-14" width="104" height="5" fill="#20364a" />
        <g transform="translate(-30,-2)">
          <g className="tdt-wheel-a">
            <circle r="10" fill="#16222e" />
            <circle r="4.5" fill="#6f8496" />
            <rect x="-9" y="-1.5" width="18" height="3" fill="#16222e" />
            <rect x="-1.5" y="-9" width="3" height="18" fill="#16222e" />
          </g>
        </g>
        <g transform="translate(32,-2)">
          <g className="tdt-wheel-b">
            <circle r="10" fill="#16222e" />
            <circle r="4.5" fill="#6f8496" />
            <rect x="-9" y="-1.5" width="18" height="3" fill="#16222e" />
            <rect x="-1.5" y="-9" width="3" height="18" fill="#16222e" />
          </g>
        </g>
      </g>

      <style>{`
        .tdt-lamp { animation: tdt-blink 1.2s steps(1, end) infinite; }
        .tdt-taxi { transform: translate(322px, 178px); animation: tdt-drive 3.2s linear infinite; }
        .tdt-wheel-a, .tdt-wheel-b {
          transform-box: fill-box; transform-origin: 50% 50%;
          animation: tdt-roll 0.6s linear infinite;
        }
        .tdt-fare-a { transform: translate(296px, 128px); animation: tdt-pay 3.2s ease-out infinite; }
        .tdt-fare-b { transform: translate(272px, 116px); animation: tdt-pay 3.2s ease-out 0.25s infinite; }
        .tdt-head-a, .tdt-head-b, .tdt-head-c, .tdt-head-d, .tdt-head-e,
        .tdt-head-f, .tdt-head-g, .tdt-head-h, .tdt-head-i {
          animation: tdt-wait 2.4s ease-in-out infinite;
        }
        .tdt-head-b { animation-delay: 0.5s; }
        .tdt-head-c { animation-delay: 1.1s; }
        .tdt-head-d { animation-delay: 0.2s; }
        .tdt-head-e { animation-delay: 0.8s; }
        .tdt-head-f { animation-delay: 1.4s; }
        .tdt-head-g { animation-delay: 0.35s; }
        .tdt-head-h { animation-delay: 0.95s; }
        .tdt-head-i { animation-delay: 1.6s; }
        @keyframes tdt-blink {
          0%, 55% { opacity: 1; }
          56%, 100% { opacity: 0.2; }
        }
        @keyframes tdt-drive {
          0% { transform: translate(250px, 178px); opacity: 0; }
          10% { transform: translate(266px, 178px); opacity: 1; }
          80% { transform: translate(392px, 178px); opacity: 1; }
          95%, 100% { transform: translate(430px, 178px); opacity: 0; }
        }
        @keyframes tdt-roll {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes tdt-pay {
          0%, 20% { transform: translate(296px, 150px); opacity: 0; }
          32% { transform: translate(292px, 138px); opacity: 1; }
          70% { transform: translate(276px, 116px); opacity: 0.9; }
          92%, 100% { transform: translate(264px, 104px); opacity: 0; }
        }
        @keyframes tdt-wait {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .tdt-lamp, .tdt-taxi, .tdt-wheel-a, .tdt-wheel-b,
          .tdt-fare-a, .tdt-fare-b,
          .tdt-head-a, .tdt-head-b, .tdt-head-c, .tdt-head-d, .tdt-head-e,
          .tdt-head-f, .tdt-head-g, .tdt-head-h, .tdt-head-i { animation: none; }
        }
      `}</style>
    </svg>
  );
}
