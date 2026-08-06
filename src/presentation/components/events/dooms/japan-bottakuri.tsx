/**
 * ぼったくり。
 *
 * 路地裏の赤提灯。頼んでいない品が並んだ伝票が、床に届くまで伸びていく。
 * 客は冷や汗、店主は手のひらを差し出したまま。
 */
export function JapanBottakuri() {
  return (
    <svg viewBox="0 0 400 210" role="img" aria-hidden="true">
      <defs>
        <clipPath id="jb-bill-clip">
          <rect x="160" y="96" width="80" height="118" />
        </clipPath>
      </defs>

      {/* 路地裏の店内 */}
      <rect width="400" height="210" fill="#241a26" />
      <rect y="24" width="400" height="6" fill="#3a2a34" />

      {/* 赤提灯 */}
      <g className="jb-lantern">
        <rect x="46" y="0" width="3" height="18" fill="#3a2a34" />
        <ellipse cx="47.5" cy="42" rx="24" ry="26" fill="#e05252" />
        <g stroke="#a83a3a" strokeWidth="2" fill="none">
          <path d="M25,34 q22,6 45,0 M24,42 q23,7 47,0 M25,50 q22,6 45,0" />
        </g>
        <rect x="34" y="14" width="27" height="6" rx="2" fill="#2b1f18" />
        <rect x="34" y="64" width="27" height="6" rx="2" fill="#2b1f18" />
      </g>

      {/* 棚の酒瓶 */}
      <g>
        <rect x="300" y="62" width="96" height="5" fill="#4a3527" />
        <rect x="308" y="34" width="13" height="28" rx="3" fill="#3f6b4a" />
        <rect x="326" y="40" width="12" height="22" rx="3" fill="#6b4b32" />
        <rect x="344" y="30" width="14" height="32" rx="3" fill="#2f4a5a" />
        <rect x="364" y="42" width="12" height="20" rx="3" fill="#7a5c3a" />
      </g>

      {/* 驚く客 */}
      <g className="jb-guest">
        <path d="M42,166 q6,-40 32,-40 q26,0 32,40 z" fill="#5b8fe8" />
        <circle cx="74" cy="106" r="18" fill="#f6efe2" />
        <path d="M56,104 a18,18 0 0 1 36,0 l-7,-7 -13,4 -16,3 z" fill="#2a1f18" />
        <g fill="#2a1f18">
          <ellipse cx="67" cy="106" rx="2.8" ry="4" />
          <ellipse cx="82" cy="106" rx="2.8" ry="4" />
          <rect x="61" y="97" width="10" height="2.6" rx="1.3" transform="rotate(-16 66 98)" />
          <rect x="78" y="97" width="10" height="2.6" rx="1.3" transform="rotate(16 83 98)" />
        </g>
        <ellipse className="jb-mouth" cx="74" cy="118" rx="6" ry="5" fill="#8a3a3a" />
      </g>
      {/* 冷や汗 */}
      <g fill="#a8cfe4">
        <path className="jb-sweat-a" d="M0,0 q4,6 0,9 q-4,-3 0,-9 z" />
        <path className="jb-sweat-b" d="M0,0 q4,6 0,9 q-4,-3 0,-9 z" />
        <path className="jb-sweat-c" d="M0,0 q3,5 0,8 q-3,-3 0,-8 z" />
      </g>

      {/* 手のひらを出す店主 */}
      <g>
        <path d="M286,164 q6,-42 34,-42 q28,0 34,42 z" fill="#2f3b4a" />
        <rect x="304" y="128" width="32" height="36" fill="#e8e2d2" />
        <circle cx="320" cy="102" r="17" fill="#f6efe2" />
        <path d="M303,100 a17,17 0 0 1 34,0 l-6,-6 -12,3 -16,3 z" fill="#2a1f18" />
        <rect x="301" y="88" width="38" height="7" rx="3.5" fill="#eef3f7" />
        <g fill="#2a1f18">
          <path d="M310,101 q4,-4 8,0" stroke="#2a1f18" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M323,101 q4,-4 8,0" stroke="#2a1f18" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M313,110 q7,6 14,0" stroke="#2a1f18" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </g>
        <g className="jb-palm">
          <rect x="256" y="132" width="42" height="11" rx="5.5" fill="#2f3b4a" />
          <ellipse cx="254" cy="138" rx="13" ry="11" fill="#f6efe2" />
        </g>
      </g>

      {/* カウンター */}
      <rect y="164" width="400" height="12" fill="#6b4b32" />
      <rect y="176" width="400" height="34" fill="#4a3527" />
      <rect y="164" width="400" height="3" fill="#8a6440" />

      {/* 伸びていく伝票 */}
      <g clipPath="url(#jb-bill-clip)">
        <g className="jb-bill">
          <rect x="168" y="94" width="64" height="122" fill="#f2ece0" />
          <g fill="#8a8078">
            <rect x="175" y="104" width="34" height="4" rx="2" />
            <rect x="175" y="114" width="46" height="4" rx="2" />
            <rect x="175" y="124" width="28" height="4" rx="2" />
            <rect x="175" y="134" width="42" height="4" rx="2" />
            <rect x="175" y="144" width="36" height="4" rx="2" />
            <rect x="175" y="154" width="48" height="4" rx="2" />
            <rect x="175" y="164" width="30" height="4" rx="2" />
            <rect x="175" y="174" width="44" height="4" rx="2" />
          </g>
          <rect x="175" y="186" width="50" height="3" fill="#3a3128" />
          <rect className="jb-total" x="175" y="193" width="50" height="12" rx="2" fill="#e05252" />
          <path d="M168,216 l8,-6 l8,6 l8,-6 l8,6 l8,-6 l8,6 l8,-6 l8,6 z" fill="#241a26" />
        </g>
      </g>
      {/* 伝票ばさみ */}
      <g>
        <rect x="158" y="86" width="84" height="11" rx="3" fill="#6b4b32" />
        <rect x="158" y="86" width="84" height="4" rx="2" fill="#8a6440" />
        <rect x="192" y="76" width="16" height="12" rx="3" fill="#4a3527" />
      </g>

      {/* 飛んでいく硬貨 */}
      <g>
        <g className="jb-coin-a">
          <circle r="7" fill="#f5b31c" />
          <circle r="3" fill="#c98a12" />
        </g>
        <g className="jb-coin-b">
          <circle r="6" fill="#f5b31c" />
          <circle r="2.5" fill="#c98a12" />
        </g>
      </g>

      <style>{`
        .jb-lantern {
          transform-box: fill-box;
          transform-origin: 50% 0;
          animation: jb-sway 3.4s ease-in-out infinite;
        }
        .jb-guest {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: jb-recoil 3.6s ease-in-out infinite;
        }
        .jb-mouth {
          transform-box: fill-box;
          transform-origin: center;
          animation: jb-gasp 3.6s ease-in-out infinite;
        }
        .jb-sweat-a { transform: translate(96px, 96px); animation: jb-drip 1.5s ease-in infinite; }
        .jb-sweat-b { transform: translate(52px, 100px); animation: jb-drip-l 1.5s ease-in infinite; animation-delay: -0.7s; }
        .jb-sweat-c { transform: translate(94px, 110px); animation: jb-drip 1.8s ease-in infinite; animation-delay: -1.1s; }
        .jb-palm {
          transform-box: fill-box;
          transform-origin: 100% 50%;
          animation: jb-demand 1.7s ease-in-out infinite;
        }
        .jb-bill { animation: jb-unroll 4.4s cubic-bezier(0.3, 0.8, 0.4, 1) infinite; }
        .jb-total { animation: jb-shout 0.7s steps(1, end) infinite; }
        .jb-coin-a { transform: translate(120px, 150px); animation: jb-pay 2.2s ease-in-out infinite; }
        .jb-coin-b { transform: translate(120px, 150px); animation: jb-pay 2.2s ease-in-out infinite; animation-delay: -1.1s; }
        @keyframes jb-sway {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes jb-recoil {
          0%, 40% { transform: translate(0, 0); }
          52% { transform: translate(-7px, 3px); }
          70%, 100% { transform: translate(-2px, 0); }
        }
        @keyframes jb-gasp {
          0%, 40% { transform: scale(1); }
          55%, 88% { transform: scale(1.5, 1.7); }
          100% { transform: scale(1); }
        }
        @keyframes jb-drip {
          0% { transform: translate(96px, 92px) scale(0.5); opacity: 0; }
          25% { opacity: 1; }
          100% { transform: translate(112px, 128px) scale(1); opacity: 0; }
        }
        @keyframes jb-drip-l {
          0% { transform: translate(52px, 96px) scale(0.5); opacity: 0; }
          25% { opacity: 1; }
          100% { transform: translate(36px, 132px) scale(1); opacity: 0; }
        }
        @keyframes jb-demand {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-9px, 0) rotate(-5deg); }
        }
        @keyframes jb-unroll {
          0%, 8% { transform: translate(0, -122px); }
          62%, 100% { transform: translate(0, 0); }
        }
        @keyframes jb-shout {
          0%, 55% { opacity: 1; }
          56%, 100% { opacity: 0.35; }
        }
        @keyframes jb-pay {
          0% { transform: translate(118px, 152px) scale(0.7); opacity: 0; }
          20% { opacity: 1; }
          50% { transform: translate(190px, 118px) scale(1.1); }
          85% { opacity: 1; }
          100% { transform: translate(252px, 140px) scale(0.7); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .jb-lantern, .jb-guest, .jb-mouth, .jb-sweat-a, .jb-sweat-b, .jb-sweat-c,
          .jb-palm, .jb-bill, .jb-total, .jb-coin-a, .jb-coin-b { animation: none; }
        }
      `}</style>
    </svg>
  );
}
