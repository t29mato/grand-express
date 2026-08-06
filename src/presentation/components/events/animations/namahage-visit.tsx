/**
 * 蓑をまとったナマハゲが戸を開け放って押し入り、
 * 家は酒と料理でもてなす羽目になる。
 *
 * 障子が左右に開いて雪が吹き込み、面をつけた二人が土間に踏み込む。
 * 家人は平伏し、膳が押し出されて銭が飛んでいく。
 */
export function NamahageVisit() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      {/* 家の中 */}
      <rect width="400" height="210" fill="#332b40" />
      <rect y="150" width="400" height="60" fill="#7a7a4a" />
      <rect y="150" width="400" height="4" fill="#4a4a2e" />
      <g fill="#5f6039">
        <rect x="132" y="154" width="3" height="56" />
        <rect x="266" y="154" width="3" height="56" />
      </g>

      {/* 開け放たれた戸口 */}
      <rect x="196" y="30" width="172" height="120" fill="#16222e" />
      <clipPath id="nv-door-clip">
        <rect x="196" y="30" width="172" height="120" />
      </clipPath>
      <g clipPath="url(#nv-door-clip)">
        <g className="nv-panel-l">
          <rect x="196" y="30" width="86" height="120" fill="#f6efe2" />
          <g fill="#b9ae95">
            <rect x="196" y="68" width="86" height="3" />
            <rect x="196" y="108" width="86" height="3" />
            <rect x="236" y="30" width="3" height="120" />
          </g>
        </g>
        <g className="nv-panel-r">
          <rect x="282" y="30" width="86" height="120" fill="#f6efe2" />
          <g fill="#b9ae95">
            <rect x="282" y="68" width="86" height="3" />
            <rect x="282" y="108" width="86" height="3" />
            <rect x="322" y="30" width="3" height="120" />
          </g>
        </g>
      </g>
      <rect
        x="196"
        y="30"
        width="172"
        height="120"
        fill="none"
        stroke="#4a3524"
        strokeWidth="6"
      />

      {/* 吹き込む雪 */}
      <circle className="nv-snow-1" cx="0" cy="0" r="3" fill="#f6efe2" />
      <circle className="nv-snow-2" cx="0" cy="0" r="2.2" fill="#f6efe2" />
      <circle className="nv-snow-3" cx="0" cy="0" r="2.6" fill="#f6efe2" />

      {/* 赤面のナマハゲ(出刃を掲げている) */}
      <g className="nv-oni-a">
        <g fill="#3a2f28">
          <rect x="-14" y="-26" width="11" height="26" />
          <rect x="4" y="-26" width="11" height="26" />
        </g>
        <rect x="-28" y="-78" width="10" height="26" rx="5" fill="#c9a877" />
        <path d="M-26,-26 L-18,-84 L18,-84 L26,-26 Z" fill="#c9a877" />
        <g fill="#a98a5e">
          <rect x="-15" y="-78" width="2.5" height="50" />
          <rect x="-2" y="-80" width="2.5" height="52" />
          <rect x="11" y="-78" width="2.5" height="50" />
        </g>
        <path
          d="M-26,-26 L-22,-13 L-18,-26 L-14,-13 L-10,-26 L-6,-13 L-2,-26 L2,-13 L6,-26 L10,-13 L14,-26 L18,-13 L22,-26 L26,-26 Z"
          fill="#c9a877"
        />
        <g fill="#c9a877">
          <rect x="-17" y="-28" width="15" height="10" rx="2" />
          <rect x="2" y="-28" width="15" height="10" rx="2" />
        </g>
        <path
          d="M-19,-104 L-26,-121 L-12,-110 L-8,-125 L0,-112 L8,-125 L12,-110 L26,-121 L19,-104 Z"
          fill="#2a1a2a"
        />
        <circle cx="0" cy="-98" r="19" fill="#e8443f" />
        <path d="M-13,-112 L-19,-132 L-4,-118 Z" fill="#e8dcc2" />
        <path d="M13,-112 L19,-132 L4,-118 Z" fill="#e8dcc2" />
        <circle cx="-7" cy="-102" r="6" fill="#f5b31c" />
        <circle cx="7" cy="-102" r="6" fill="#f5b31c" />
        <circle cx="-7" cy="-102" r="2.6" fill="#16222e" />
        <circle cx="7" cy="-102" r="2.6" fill="#16222e" />
        <path d="M-11,-92 Q0,-79 11,-92 Z" fill="#16222e" />
        <path d="M-7,-91 L-4,-85 L-1,-91 Z" fill="#f6efe2" />
        <path d="M2,-91 L5,-85 L8,-91 Z" fill="#f6efe2" />
        <g className="nv-knife">
          <rect x="26" y="-138" width="11" height="36" rx="1" fill="#e8dcc2" />
          <rect x="33" y="-138" width="4" height="36" fill="#b9ae95" />
          <rect x="24" y="-107" width="15" height="13" rx="2" fill="#4a3524" />
          <rect x="25" y="-98" width="11" height="26" rx="5" fill="#c9a877" />
          <circle cx="30" cy="-98" r="6" fill="#f6efe2" />
        </g>
      </g>

      {/* 青面のナマハゲ */}
      <g className="nv-oni-b">
        <g fill="#3a2f28">
          <rect x="-13" y="-24" width="10" height="24" />
          <rect x="4" y="-24" width="10" height="24" />
        </g>
        <path d="M-24,-24 L-16,-78 L16,-78 L24,-24 Z" fill="#c9a877" />
        <g fill="#a98a5e">
          <rect x="-13" y="-72" width="2.5" height="46" />
          <rect x="-1" y="-74" width="2.5" height="48" />
          <rect x="10" y="-72" width="2.5" height="46" />
        </g>
        <path
          d="M-24,-24 L-20,-12 L-16,-24 L-12,-12 L-8,-24 L-4,-12 L0,-24 L4,-12 L8,-24 L12,-12 L16,-24 L20,-12 L24,-24 Z"
          fill="#c9a877"
        />
        <g fill="#c9a877">
          <rect x="-16" y="-26" width="14" height="9" rx="2" />
          <rect x="2" y="-26" width="14" height="9" rx="2" />
        </g>
        <g className="nv-hand">
          <rect x="16" y="-90" width="9" height="24" rx="4.5" fill="#c9a877" />
          <circle cx="20" cy="-92" r="7" fill="#f6efe2" />
        </g>
        <rect x="-25" y="-72" width="9" height="24" rx="4.5" fill="#c9a877" />
        <path
          d="M-18,-97 L-24,-113 L-11,-103 L-7,-117 L0,-105 L7,-117 L11,-103 L24,-113 L18,-97 Z"
          fill="#2a1a2a"
        />
        <circle cx="0" cy="-92" r="18" fill="#3b6fa8" />
        <path d="M-12,-105 L-18,-124 L-4,-111 Z" fill="#e8dcc2" />
        <path d="M12,-105 L18,-124 L4,-111 Z" fill="#e8dcc2" />
        <circle cx="-7" cy="-96" r="5.5" fill="#f5b31c" />
        <circle cx="7" cy="-96" r="5.5" fill="#f5b31c" />
        <circle cx="-7" cy="-96" r="2.4" fill="#16222e" />
        <circle cx="7" cy="-96" r="2.4" fill="#16222e" />
        <path d="M-10,-86 Q0,-74 10,-86 Z" fill="#16222e" />
        <path d="M-6,-85 L-3,-79 L0,-85 Z" fill="#f6efe2" />
        <path d="M3,-85 L6,-79 L9,-85 Z" fill="#f6efe2" />
      </g>

      {/* 平伏する家人 */}
      <g className="nv-bow">
        <circle cx="100" cy="138" r="11" fill="#f6efe2" />
        <rect x="89" y="125" width="22" height="8" rx="4" fill="#3a2f28" />
        <path d="M88,150 L112,150 L118,178 L82,178 Z" fill="#3f6b52" />
        <rect x="104" y="154" width="24" height="8" rx="4" fill="#3f6b52" />
      </g>

      {/* 差し出す膳 */}
      <g className="nv-table">
        <rect x="140" y="122" width="5" height="9" fill="#f6efe2" />
        <rect x="134" y="130" width="16" height="18" rx="5" fill="#f6efe2" />
        <ellipse cx="170" cy="143" rx="8" ry="4" fill="#e8443f" />
        <ellipse cx="170" cy="146" rx="13" ry="4" fill="#f6efe2" />
        <rect x="126" y="148" width="62" height="7" rx="2" fill="#8a5c33" />
        <rect x="132" y="155" width="6" height="17" fill="#6d4526" />
        <rect x="176" y="155" width="6" height="17" fill="#6d4526" />
      </g>

      {/* 出ていく物入り */}
      <g className="nv-coin-a">
        <circle r="6" fill="#f5b31c" />
        <circle r="3" fill="#c98f10" />
      </g>
      <g className="nv-coin-b">
        <circle r="5" fill="#f5b31c" />
        <circle r="2.5" fill="#c98f10" />
      </g>

      <style>{`
        .nv-panel-l { transform: translateX(-86px); animation: nv-slide-l 3.4s ease-out infinite; }
        .nv-panel-r { transform: translateX(86px); animation: nv-slide-r 3.4s ease-out infinite; }
        .nv-oni-a { transform: translate(246px, 186px); animation: nv-stomp 0.9s ease-in-out infinite; }
        .nv-oni-b { transform: translate(318px, 182px); animation: nv-stomp-b 0.9s ease-in-out 0.45s infinite; }
        .nv-knife { transform-box: fill-box; transform-origin: 50% 100%; animation: nv-shake 0.45s ease-in-out infinite; }
        .nv-hand { transform-box: fill-box; transform-origin: 50% 100%; animation: nv-shake 0.6s ease-in-out infinite; }
        .nv-bow { transform-box: fill-box; transform-origin: 50% 100%; animation: nv-kowtow 1.8s ease-in-out infinite; }
        .nv-table { transform: translateX(6px); animation: nv-offer 1.8s ease-in-out infinite; }
        .nv-coin-a { transform: translate(206px, 118px); animation: nv-lose 1.8s ease-out infinite; }
        .nv-coin-b { transform: translate(224px, 106px); animation: nv-lose 1.8s ease-out 0.5s infinite; }
        .nv-snow-1 { transform: translate(250px, 90px); animation: nv-blow-1 2.6s linear infinite; }
        .nv-snow-2 { transform: translate(290px, 60px); animation: nv-blow-2 3.2s linear -1s infinite; }
        .nv-snow-3 { transform: translate(330px, 110px); animation: nv-blow-3 2.9s linear -2s infinite; }
        @keyframes nv-slide-l {
          0%, 6% { transform: translateX(0); }
          22%, 100% { transform: translateX(-86px); }
        }
        @keyframes nv-slide-r {
          0%, 6% { transform: translateX(0); }
          22%, 100% { transform: translateX(86px); }
        }
        @keyframes nv-stomp {
          0%, 100% { transform: translate(246px, 186px); }
          40% { transform: translate(243px, 178px); }
        }
        @keyframes nv-stomp-b {
          0%, 100% { transform: translate(318px, 182px); }
          40% { transform: translate(314px, 175px); }
        }
        @keyframes nv-shake {
          0%, 100% { transform: rotate(-11deg); }
          50% { transform: rotate(11deg); }
        }
        @keyframes nv-kowtow {
          0%, 100% { transform: rotate(0deg); }
          45% { transform: rotate(-13deg); }
        }
        @keyframes nv-offer {
          0%, 100% { transform: translateX(0); }
          45% { transform: translateX(12px); }
        }
        @keyframes nv-lose {
          0%, 15% { transform: translate(190px, 138px); opacity: 0; }
          30% { transform: translate(200px, 126px); opacity: 1; }
          70% { transform: translate(216px, 110px); opacity: 0.9; }
          92%, 100% { transform: translate(230px, 96px); opacity: 0; }
        }
        @keyframes nv-blow-1 {
          from { transform: translate(300px, 40px); opacity: 0; }
          30% { opacity: 1; }
          to { transform: translate(180px, 140px); opacity: 0; }
        }
        @keyframes nv-blow-2 {
          from { transform: translate(340px, 34px); opacity: 0; }
          30% { opacity: 1; }
          to { transform: translate(232px, 128px); opacity: 0; }
        }
        @keyframes nv-blow-3 {
          from { transform: translate(360px, 60px); opacity: 0; }
          30% { opacity: 1; }
          to { transform: translate(268px, 152px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .nv-panel-l, .nv-panel-r, .nv-oni-a, .nv-oni-b, .nv-knife, .nv-hand,
          .nv-bow, .nv-table, .nv-coin-a, .nv-coin-b,
          .nv-snow-1, .nv-snow-2, .nv-snow-3 { animation: none; }
        }
      `}</style>
    </svg>
  );
}
